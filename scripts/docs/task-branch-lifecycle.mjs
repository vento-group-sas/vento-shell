import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { spawnSync } from 'node:child_process';

const DEFAULT_BRANCH = 'main';
const TASK_PREFIX = 'task/';
const INFRA_PREFIX = 'infra/';
const OPS_PREFIX = 'ops/';
const RESULT_START = '=== RESULTADO PARA CHATGPT ===';
const RESULT_END = '=== FIN RESULTADO PARA CHATGPT ===';
const CHECK_REGISTRATION_ATTEMPTS = 24;
const CHECK_REGISTRATION_INTERVAL_MS = 5000;
const CHECK_COMPLETION_ATTEMPTS = 720;
const CHECK_COMPLETION_INTERVAL_MS = 5000;
const MERGE_CONFIRM_ATTEMPTS = 24;
const MERGE_CONFIRM_INTERVAL_MS = 5000;

function fail(message, code = 1) {
  const error = new Error(message);
  error.exitCode = code;
  throw error;
}

function normalizeTaskId(value) {
  const taskId = String(value ?? '').trim().toUpperCase();
  if (!/^[A-Z0-9]+(?:-[A-Z0-9]+)*-[0-9]{3,4}$/u.test(taskId)) {
    fail(`TASK_ID invalido: ${value || 'VACIO'}.`);
  }
  return taskId;
}

export function taskBranchName(taskId) {
  return `${TASK_PREFIX}${normalizeTaskId(taskId).toLowerCase()}`;
}

export function activeSequenceTaskIds(config) {
  if (Array.isArray(config?.task_ids)) {
    return config.task_ids.filter(
      (id) => typeof id === 'string' && id.trim().length > 0,
    );
  }

  if (!Array.isArray(config?.segments)) return [];

  const ids = [];
  for (const segment of config.segments) {
    const prefix = String(segment?.prefix ?? '').trim();
    const from = Number(segment?.from);
    const to = Number(segment?.to);

    if (
      !prefix
      || !Number.isInteger(from)
      || !Number.isInteger(to)
      || from < 1
      || to < from
    ) {
      return [];
    }

    ids.push(
      ...Array.from(
        { length: to - from + 1 },
        (_, index) => `${prefix}-${String(from + index).padStart(3, '0')}`,
      ),
    );
  }

  return ids;
}

export function classifyTaskFinishContinuity({
  taskId,
  taskState,
  continuityPrevious,
  continuityCurrent,
  activeSequenceCurrent,
  baseActiveSequence,
}) {
  if (String(taskState ?? '').toUpperCase() !== 'APROBADA') {
    return { allowed: false, mode: 'TASK_NOT_APPROVED' };
  }

  if (continuityPrevious === taskId) {
    return { allowed: true, mode: 'STANDARD' };
  }

  const baseCurrentTaskId = activeSequenceTaskIds(baseActiveSequence)[0] ?? null;
  const baseHandoffTaskId = String(baseActiveSequence?.handoff_task_id ?? '').trim();
  const terminalStageTransition = (
    activeSequenceCurrent === true
    && baseCurrentTaskId === taskId
    && baseHandoffTaskId.length > 0
    && continuityCurrent === baseHandoffTaskId
  );

  if (terminalStageTransition) {
    return { allowed: true, mode: 'TERMINAL_STAGE_TRANSITION' };
  }

  return { allowed: false, mode: 'CONTINUITY_MISMATCH' };
}

export function normalizeInfraChangeId(value) {
  const changeId = String(value ?? '').trim().toLowerCase();
  if (!/^[a-z0-9]+(?:-[a-z0-9]+)*$/u.test(changeId)) {
    fail(`CHANGE_ID invalido: ${value || 'VACIO'}. Use minusculas, numeros y guiones.`);
  }
  return changeId;
}

export function infraBranchName(changeId) {
  return `${INFRA_PREFIX}${normalizeInfraChangeId(changeId)}`;
}

export function opsBranchName(changeId) {
  return `${OPS_PREFIX}${normalizeInfraChangeId(changeId)}`;
}

function run(command, args, {
  cwd = process.cwd(),
  allowFailure = false,
  inherit = false,
  env = process.env,
} = {}) {
  const result = spawnSync(command, args, {
    cwd,
    encoding: 'utf8',
    windowsHide: true,
    env,
    stdio: inherit ? 'inherit' : ['ignore', 'pipe', 'pipe'],
  });

  if (result.error) {
    if (allowFailure) return { status: 1, stdout: '', stderr: result.error.message };
    fail(`${command} no disponible: ${result.error.message}`);
  }

  const status = Number.isInteger(result.status) ? result.status : 1;
  const stdout = inherit ? '' : String(result.stdout ?? '').trimEnd();
  const stderr = inherit ? '' : String(result.stderr ?? '').trimEnd();

  if (status !== 0 && !allowFailure) {
    fail(stderr || stdout || `${command} ${args.join(' ')} fallo.`, status);
  }

  return { status, stdout, stderr };
}

function git(args, options = {}) {
  return run('git', args, options);
}

function readJsonAtRef(root, ref, relativePath, label) {
  const result = git(['show', `${ref}:${relativePath}`], {
    cwd: root,
    allowFailure: true,
  });

  if (result.status !== 0) {
    fail(
      `No se pudo leer ${label} desde ${ref}: `
      + `${result.stderr || result.stdout || 'ERROR_DESCONOCIDO'}.`,
    );
  }

  try {
    return JSON.parse(result.stdout);
  } catch {
    fail(`${label} en ${ref} no contiene JSON valido.`);
  }
}

function gh(args, options = {}) {
  return run('gh', args, options);
}

function sleep(milliseconds) {
  const delay = Number(milliseconds);
  if (!Number.isFinite(delay) || delay <= 0) return;
  Atomics.wait(new Int32Array(new SharedArrayBuffer(4)), 0, 0, delay);
}

export function isTransientPrChecksFailure({ stdout, stderr }) {
  const combined = [stdout, stderr]
    .map((entry) => String(entry ?? '').trim())
    .filter(Boolean)
    .join('\n');
  if (!combined) return false;
  return /(?:HTTP\s+(?:408|425|429|499|500|502|503|504)\b|ECONNRESET|ECONNREFUSED|ETIMEDOUT|EAI_AGAIN|ENETUNREACH|socket hang up|connection reset|temporarily unavailable|timed?\s*out|Something went wrong while executing your query)/iu.test(combined);
}

export function classifyPrChecksProbe({ status, stdout, stderr }) {
  const rawStdout = String(stdout ?? '').trim();
  const rawStderr = String(stderr ?? '').trim();
  const combined = [rawStdout, rawStderr].filter(Boolean).join('\n');

  if (isTransientPrChecksFailure({ stdout: rawStdout, stderr: rawStderr })) {
    return { state: 'RETRY', count: 0, detail: combined };
  }

  if (rawStdout.startsWith('[')) {
    try {
      const rows = JSON.parse(rawStdout);
      if (Array.isArray(rows) && rows.length > 0) {
        return { state: 'REGISTERED', count: rows.length, detail: '' };
      }
      if (Array.isArray(rows)) {
        return { state: 'WAIT', count: 0, detail: '' };
      }
    } catch {
      // handled below
    }
  }

  if (/no checks reported/iu.test(combined)) {
    return { state: 'WAIT', count: 0, detail: combined };
  }

  if (Number(status) === 0 && !combined) {
    return { state: 'WAIT', count: 0, detail: '' };
  }

  return {
    state: 'ERROR',
    count: 0,
    detail: combined || `gh pr checks termino con codigo ${status}.`,
  };
}

export function classifyPrChecksCompletionProbe({ status, stdout, stderr }) {
  const registration = classifyPrChecksProbe({ status, stdout, stderr });
  if (registration.state === 'RETRY') return registration;
  if (registration.state === 'WAIT') return registration;
  if (registration.state === 'ERROR') return registration;

  let rows;
  try {
    rows = JSON.parse(String(stdout ?? '').trim());
  } catch {
    return {
      state: 'ERROR',
      count: 0,
      detail: 'gh pr checks devolvio JSON invalido durante la espera de CI.',
    };
  }

  if (!Array.isArray(rows) || rows.length === 0) {
    return { state: 'WAIT', count: 0, detail: '' };
  }

  const failed = [];
  let pending = false;
  for (const row of rows) {
    const bucket = String(row?.bucket ?? '').trim().toLowerCase();
    const state = String(row?.state ?? '').trim().toUpperCase();
    const name = String(row?.name ?? 'CHECK_DESCONOCIDO').trim();

    if (
      ['fail', 'cancel'].includes(bucket)
      || ['FAILURE', 'ERROR', 'CANCELLED', 'TIMED_OUT', 'ACTION_REQUIRED', 'STALE', 'STARTUP_FAILURE'].includes(state)
    ) {
      failed.push(`${name}:${state || bucket}`);
      continue;
    }

    if (
      bucket === 'pending'
      || ['PENDING', 'QUEUED', 'IN_PROGRESS', 'WAITING', 'REQUESTED', 'EXPECTED'].includes(state)
    ) {
      pending = true;
      continue;
    }

    if (
      ['pass', 'skipping'].includes(bucket)
      || ['SUCCESS', 'SKIPPED', 'NEUTRAL'].includes(state)
    ) {
      continue;
    }

    return {
      state: 'ERROR',
      count: rows.length,
      detail: `Estado de check no reconocido: ${name}:${state || bucket || 'VACIO'}.`,
    };
  }

  if (failed.length > 0) {
    return { state: 'FAIL', count: rows.length, detail: failed.join(', ') };
  }
  if (pending) return { state: 'WAIT', count: rows.length, detail: '' };
  return { state: 'PASS', count: rows.length, detail: '' };
}

function waitForPrChecksToRegister(root, prNumber, {
  attempts = CHECK_REGISTRATION_ATTEMPTS,
  intervalMs = CHECK_REGISTRATION_INTERVAL_MS,
} = {}) {
  for (let attempt = 1; attempt <= attempts; attempt += 1) {
    const probe = gh([
      'pr', 'checks', String(prNumber),
      '--json', 'name,state,bucket,link',
    ], { cwd: root, allowFailure: true });

    const classification = classifyPrChecksProbe(probe);
    if (classification.state === 'REGISTERED') return classification.count;
    if (classification.state === 'ERROR') {
      fail(`No se pudieron consultar checks de PR #${prNumber}: ${classification.detail}`, probe.status);
    }

    if (attempt < attempts) sleep(intervalMs);
  }

  fail(
    `PR #${prNumber} no registro checks despues de ${attempts} intentos; cierre detenido antes del merge.`,
  );
}

export function waitForPrChecksToComplete(root, prNumber, {
  attempts = CHECK_COMPLETION_ATTEMPTS,
  intervalMs = CHECK_COMPLETION_INTERVAL_MS,
} = {}) {
  for (let attempt = 1; attempt <= attempts; attempt += 1) {
    const probe = gh([
      'pr', 'checks', String(prNumber),
      '--json', 'name,state,bucket,link',
    ], { cwd: root, allowFailure: true });
    const classification = classifyPrChecksCompletionProbe(probe);

    if (classification.state === 'PASS') return classification.count;
    if (classification.state === 'FAIL') {
      fail(`Checks de PR #${prNumber} fallaron: ${classification.detail}`, probe.status || 1);
    }
    if (classification.state === 'ERROR') {
      fail(`No se pudieron consultar checks de PR #${prNumber}: ${classification.detail}`, probe.status || 1);
    }
    if (classification.state === 'RETRY') {
      console.warn(`[CHECKS] PR #${prNumber} transient query failure; retrying (${attempt}/${attempts}).`);
    } else if (classification.state === 'WAIT' && (attempt === 1 || attempt % 12 === 0)) {
      console.log(`[CHECKS] PR #${prNumber} pending (${attempt}/${attempts}).`);
    }
    if (attempt < attempts) sleep(intervalMs);
  }

  fail(`PR #${prNumber} no completo checks despues de ${attempts} intentos; cierre detenido antes del merge.`);
}

function readOpenPrState(root, prNumber) {
  return parseJsonOutput(
    gh([
      'pr', 'view', String(prNumber),
      '--json', 'number,state,isDraft,mergeable,headRefOid,baseRefName',
    ], { cwd: root }).stdout,
    'gh pr view',
  );
}

function ensureOpenPrIdentity(prState, prNumber, headSha) {
  if (prState.state !== 'OPEN') fail(`PR #${prNumber} no esta OPEN; estado: ${prState.state}.`);
  if (prState.isDraft) fail(`PR #${prNumber} sigue en draft.`);
  if (prState.baseRefName !== DEFAULT_BRANCH) fail(`PR #${prNumber} no apunta a ${DEFAULT_BRANCH}.`);
  if (prState.headRefOid !== headSha) fail(`PR #${prNumber} no apunta al HEAD validado ${headSha}.`);
  if (!['MERGEABLE', 'UNKNOWN'].includes(String(prState.mergeable ?? '').toUpperCase())) {
    fail(`PR #${prNumber} no es mergeable: ${prState.mergeable}.`);
  }
}

function waitForPrMerged(root, prNumber, headSha, {
  attempts = MERGE_CONFIRM_ATTEMPTS,
  intervalMs = MERGE_CONFIRM_INTERVAL_MS,
} = {}) {
  for (let attempt = 1; attempt <= attempts; attempt += 1) {
    const state = parseJsonOutput(
      gh([
        'pr', 'view', String(prNumber),
        '--json', 'state,mergedAt,mergeCommit,headRefOid',
      ], { cwd: root }).stdout,
      'gh pr view merged',
    );

    if (state.headRefOid !== headSha) {
      fail(`PR #${prNumber} cambio de HEAD durante el merge: ${state.headRefOid ?? 'DESCONOCIDO'}.`);
    }

    if (state.state === 'MERGED') {
      const mergeCommitSha = String(state.mergeCommit?.oid ?? '').trim();
      if (!state.mergedAt) fail(`PR #${prNumber} figura MERGED sin mergedAt.`);
      if (!mergeCommitSha) fail(`PR #${prNumber} figura MERGED sin mergeCommit.`);
      return { ...state, mergeCommitSha };
    }

    if (state.state === 'CLOSED') {
      fail(`PR #${prNumber} fue cerrado sin merge.`);
    }

    if (attempt < attempts) sleep(intervalMs);
  }

  fail(`PR #${prNumber} no confirmo estado MERGED despues de ${attempts} intentos.`);
}

export function resolveNpmInvocation({
  platform = process.platform,
  execPath = process.execPath,
  npmExecPath = process.env.npm_execpath,
  comspec = process.env.ComSpec || process.env.COMSPEC || 'cmd.exe',
} = {}) {
  const cliPath = String(npmExecPath ?? '').trim();

  if (cliPath) {
    return {
      command: execPath,
      prefixArgs: [cliPath],
    };
  }

  if (platform === 'win32') {
    return {
      command: comspec,
      prefixArgs: ['/d', '/s', '/c', 'npm.cmd'],
    };
  }

  return {
    command: 'npm',
    prefixArgs: [],
  };
}

function npm(args, options = {}) {
  const invocation = resolveNpmInvocation();
  return run(
    invocation.command,
    [...invocation.prefixArgs, ...args],
    options,
  );
}

function ensureRepositoryRoot() {
  const root = git(['rev-parse', '--show-toplevel']).stdout.trim();
  if (!root) fail('No se pudo resolver la raiz Git.');
  return root;
}

function currentBranch(root) {
  return git(['branch', '--show-current'], { cwd: root }).stdout.trim();
}

function currentHead(root) {
  return git(['rev-parse', 'HEAD'], { cwd: root }).stdout.trim();
}

export function parsePorcelainPaths(source) {
  const paths = [];
  for (const line of String(source ?? '').split(/\r?\n/u)) {
    if (!line.trim()) continue;
    const payload = line.length >= 4 ? line.slice(3).trim() : line.trim();
    const candidate = payload.includes(' -> ') ? payload.split(' -> ').at(-1) : payload;
    const normalized = String(candidate ?? '').replace(/^"|"$/gu, '').replaceAll('\\', '/');
    if (normalized) paths.push(normalized);
  }
  return [...new Set(paths)].sort((left, right) => left.localeCompare(right, 'en'));
}

function worktreePaths(root) {
  return parsePorcelainPaths(
    git(['status', '--porcelain=v1', '--untracked-files=all'], { cwd: root }).stdout,
  );
}

function ensureClean(root, label) {
  const paths = worktreePaths(root);
  if (paths.length > 0) {
    fail(`${label}: worktree no limpio: ${paths.join(', ')}`);
  }
}

function ensureGhReady(root) {
  const version = gh(['--version'], { cwd: root, allowFailure: true });
  if (version.status !== 0) fail('GitHub CLI gh no esta disponible en PATH.');
  const auth = gh(['auth', 'status'], { cwd: root, allowFailure: true });
  if (auth.status !== 0) fail(auth.stderr || auth.stdout || 'gh no esta autenticado.');
}

function remoteBranchExists(root, branch) {
  return git(['ls-remote', '--exit-code', '--heads', 'origin', `refs/heads/${branch}`], {
    cwd: root,
    allowFailure: true,
  }).status === 0;
}

function localBranchExists(root, branch) {
  return git(['show-ref', '--verify', '--quiet', `refs/heads/${branch}`], {
    cwd: root,
    allowFailure: true,
  }).status === 0;
}

function parseJsonOutput(source, label) {
  const text = String(source ?? '').trim();
  if (!text) fail(`${label}: salida JSON vacia.`);
  try {
    return JSON.parse(text);
  } catch {
    const start = text.indexOf('{');
    const end = text.lastIndexOf('}');
    if (start >= 0 && end > start) {
      try {
        return JSON.parse(text.slice(start, end + 1));
      } catch {
        // handled below
      }
    }
    fail(`${label}: no se pudo interpretar JSON.`);
  }
}

function taskPreflight(root, taskId, { strict = false } = {}) {
  const args = [
    'run', '--silent', 'docs:task:preflight', '--',
    '--task-id', taskId,
    '--json',
  ];
  if (strict) args.push('--strict');
  const result = npm(args, { cwd: root, allowFailure: !strict });
  if (strict && result.status !== 0) fail(result.stderr || result.stdout || 'Preflight fallo.', result.status);
  const report = parseJsonOutput(result.stdout, 'docs:task:preflight');
  return { report, status: result.status };
}

function ensureTaskCanStart(root, taskId) {
  const { report, status } = taskPreflight(root, taskId, { strict: true });
  if (status !== 0) fail(`Preflight de ${taskId} fallo.`, status);
  if (report?.task?.id !== taskId || report?.task?.current !== true) {
    fail(`${taskId} no es la tarea documental actual.`);
  }
  if (Array.isArray(report.blockers) && report.blockers.length > 0) {
    fail(`Preflight bloqueado: ${report.blockers.join(' | ')}`);
  }
  return report;
}

function ensureTaskCanFinish(root, taskId) {
  const { report } = taskPreflight(root, taskId, { strict: false });
  if (report?.task?.id !== taskId) fail(`No se pudo resolver ${taskId}.`);
  if (String(report?.task?.state ?? '').toUpperCase() !== 'APROBADA') {
    fail(`${taskId} debe estar APROBADA antes de finish; estado: ${report?.task?.state ?? 'DESCONOCIDO'}.`);
  }
  if (report?.continuity?.active_sequence_current !== true) {
    fail('active-sequence.json no esta sincronizado; ejecute el cierre documental antes de finish.');
  }

  const baseActiveSequence = readJsonAtRef(
    root,
    `origin/${DEFAULT_BRANCH}`,
    'docs/plan-canonico/modular/active-sequence.json',
    'active-sequence.json base',
  );
  const continuity = classifyTaskFinishContinuity({
    taskId,
    taskState: report.task.state,
    continuityPrevious: report.continuity.previous,
    continuityCurrent: report.continuity.current,
    activeSequenceCurrent: report.continuity.active_sequence_current,
    baseActiveSequence,
  });

  if (!continuity.allowed) {
    fail(`La continuidad no reconoce ${taskId} como ultima tarea aprobada.`);
  }

  return {
    ...report,
    finish_continuity_mode: continuity.mode,
  };
}

export function classifyTaskPath(filePath) {
  const normalized = String(filePath ?? '').replaceAll('\\', '/').replace(/^\.\//u, '');
  if (!normalized) return 'OTHER';
  if (
    normalized === 'AGENTS.md'
    || normalized === 'package.json'
    || normalized === 'package-lock.json'
    || normalized.startsWith('scripts/docs/')
    || normalized.startsWith('scripts/quality/')
    || normalized.startsWith('quality/')
    || normalized.startsWith('.github/')
    || normalized.startsWith('.vscode/')
    || normalized.startsWith('docs/plan-canonico/modular/')
    || normalized.startsWith('src/')
    || normalized.startsWith('packages/')
    || normalized.startsWith('supabase/')
    || normalized.startsWith('templates/')
  ) return 'ALLOWED';
  return 'OTHER';
}

export function classifyInfraPath(filePath) {
  const normalized = String(filePath ?? '').replaceAll('\\', '/').replace(/^\.\//u, '');
  if (!normalized) return 'OTHER';
  if (
    normalized === '.gitattributes'
    || normalized === '.editorconfig'
    || normalized === 'AGENTS.md'
    || normalized === 'package.json'
    || normalized === 'package-lock.json'
    || normalized === 'packages/contracts/README.md'
    || normalized === 'packages/contracts/authorization/README.md'
    || normalized === 'docs/plan-canonico/modular/chatgpt-work-starter-template.txt'
    || normalized === 'docs/plan-canonico/modular/01_PROTOCOLO.md'
    || normalized === 'docs/plan-canonico/modular/package-gate-policy.json'
    || normalized === 'docs/plan-canonico/modular/00_CABECERA_Y_ESTADO.md'
    || normalized === 'docs/plan-canonico/modular/active-sequence.json'
    || normalized === 'docs/plan-canonico/modular/.generated/REGISTRO_GLOBAL_DE_TAREAS.md'
    || normalized === 'docs/plan-canonico/modular/.generated/REGISTRO_DE_TAREAS_PENDIENTES_CON_CONTEXTO.md'
    || normalized.startsWith('scripts/docs/')
    || normalized.startsWith('scripts/quality/')
    || normalized.startsWith('scripts/supabase/')
    || normalized.startsWith('quality/')
    || normalized.startsWith('.github/')
    || normalized.startsWith('.vscode/')
    || normalized.startsWith('templates/')
    || normalized.startsWith('docs/plan-canonico/modular/package-gate-instances/')
    || normalized.startsWith('docs/plan-canonico/modular/implementation-instances/')
  ) return 'ALLOWED';
  return 'OTHER';
}

export function classifyOpsPath(filePath) {
  const normalized = String(filePath ?? '').replaceAll('\\', '/').replace(/^\.\//u, '');
  if (!normalized) return 'OTHER';
  if (/^docs\/[^/]+\.md$/u.test(normalized)) return 'ALLOWED';
  return 'OTHER';
}

function ensureInfraPaths(paths) {
  const disallowed = paths.filter((entry) => classifyInfraPath(entry) === 'OTHER');
  if (disallowed.length > 0) {
    fail(
      `docs:infra:publish solo admite infraestructura transversal; rutas no permitidas: ${disallowed.join(', ')}`,
    );
  }
}

function ensureOpsPaths(paths) {
  const disallowed = paths.filter((entry) => classifyOpsPath(entry) === 'OTHER');
  if (disallowed.length > 0) {
    fail(
      `docs:ops:publish solo admite Markdown operativo ubicado directamente en docs/; rutas no permitidas: ${disallowed.join(', ')}`,
    );
  }
}

function ensureNoUnknownPaths(paths) {
  const unknown = paths.filter((entry) => classifyTaskPath(entry) === 'OTHER');
  if (unknown.length > 0) {
    fail(`Hay archivos fuera del alcance automatizable: ${unknown.join(', ')}`);
  }
}

function escapeRegex(value) {
  return String(value).replace(/[.*+?^${}()|[\]\\]/gu, '\\$&');
}

export function parseTaskTreqDeclaration(ownerSource, taskId) {
  const escaped = escapeRegex(normalizeTaskId(taskId));
  const startPattern = new RegExp(
    `^###\\s+(?:✅|\\[[^\\]]+\\])\\s+${escaped}\\s+—[^\\n]*$`,
    'mu',
  );
  const start = startPattern.exec(ownerSource);
  if (!start) fail(`No se encontro el bloque de ${taskId}.`);

  const afterStart = ownerSource.slice(start.index + start[0].length);
  const next = /^###\s+(?:✅|\[[^\]]+\])\s+[A-Z0-9]+(?:-[A-Z0-9]+)+\s+—[^\n]*$/mu.exec(afterStart);
  const block = next ? afterStart.slice(0, next.index) : afterStart;

  const metadata = block.match(/^\*\*Requisitos de prueba creados o modificados:\*\*\s*(\d+)\s*$/imu);
  if (!metadata) fail(`${taskId}: falta metadata de requisitos de prueba creados o modificados.`);
  const declaredCount = Number(metadata[1]);

  const section = block.match(
    /^####\s+\d+\.\s+Requisitos de prueba derivados\s*$([\s\S]*?)(?=^####\s+\d+\.|(?![\s\S]))/imu,
  )?.[1] ?? '';
  const ids = [...new Set(section.match(/\bTREQ-[A-Z0-9-]+\b/gu) ?? [])].sort();

  if (declaredCount === 0 && ids.length > 0) {
    fail(`${taskId}: declara 0 TREQ pero la seccion derivada contiene ${ids.join(', ')}.`);
  }
  if (declaredCount > 0 && ids.length === 0) {
    fail(`${taskId}: declara ${declaredCount} TREQ pero no hay IDs en la seccion derivada.`);
  }
  if (declaredCount > 0 && ids.length !== declaredCount) {
    fail(`${taskId}: declara ${declaredCount} TREQ pero se resolvieron ${ids.length}: ${ids.join(', ')}.`);
  }

  return { declaredCount, ids };
}

export function buildPrBody(taskId, treqDeclaration) {
  const id = normalizeTaskId(taskId);
  if (treqDeclaration.ids.length === 0) {
    return [
      'VENTO-TREQ-AFFECTED: NONE',
      `VENTO-TREQ-ZERO-REASON: ${id} declara 0 requisitos TREQ creados o modificados y no altera el registro canonico.`,
      '',
      '## Tarea',
      '',
      id,
      '',
      'Cierre automatizado por docs:task:finish despues de validacion local y antes de avanzar a la siguiente tarea.',
      '',
    ].join('\n');
  }

  return [
    `VENTO-TREQ-AFFECTED: ${treqDeclaration.ids.join(',')}`,
    '',
    '## Tarea',
    '',
    id,
    '',
    'Cierre automatizado por docs:task:finish despues de validacion local y antes de avanzar a la siguiente tarea.',
    '',
  ].join('\n');
}

export function resolveCanonicalOwnerRelativePath(owner) {
  const raw = String(owner ?? '').trim().replaceAll('\\', '/').replace(/^\.\/+/u, '');
  if (!raw) fail('El preflight no devolvio archivo propietario.');

  const prefix = 'docs/plan-canonico/modular/';
  const relative = raw.startsWith(prefix) ? raw.slice(prefix.length) : raw;
  const normalized = path.posix.normalize(relative);

  if (
    !normalized
    || normalized === '.'
    || normalized === '..'
    || normalized.startsWith('../')
    || path.posix.isAbsolute(normalized)
  ) {
    fail(`Ruta de archivo propietario invalida: ${owner}.`);
  }

  return `${prefix}${normalized}`;
}

function readTreqDeclaration(root, report, taskId) {
  const owner = report?.task?.owner;
  if (!owner) fail(`${taskId}: preflight no devolvio archivo propietario.`);
  const ownerRelativePath = resolveCanonicalOwnerRelativePath(owner);
  const ownerPath = path.join(root, ...ownerRelativePath.split('/'));
  if (!fs.existsSync(ownerPath)) {
    fail(`No existe archivo propietario: ${ownerRelativePath}.`);
  }
  return parseTaskTreqDeclaration(fs.readFileSync(ownerPath, 'utf8'), taskId);
}

function syncCounts(root, left, right) {
  const raw = git(['rev-list', '--left-right', '--count', `${left}...${right}`], { cwd: root }).stdout.trim();
  const [behind, ahead] = raw.split(/\s+/u).map(Number);
  return { behind: Number(behind), ahead: Number(ahead), raw };
}

function createOrUpdateBranchPr(root, { branch, title, body }) {
  const list = gh([
    'pr', 'list',
    '--head', branch,
    '--base', DEFAULT_BRANCH,
    '--state', 'open',
    '--json', 'number,url,headRefOid',
    '--limit', '1',
  ], { cwd: root });
  const existing = parseJsonOutput(list.stdout || '[]', 'gh pr list');

  const tempDir = fs.mkdtempSync(path.join(os.tmpdir(), 'vento-pr-'));
  const bodyPath = path.join(tempDir, 'body.md');
  fs.writeFileSync(bodyPath, body, 'utf8');

  try {
    if (Array.isArray(existing) && existing.length > 0) {
      const pr = existing[0];
      gh([
        'pr', 'edit', String(pr.number),
        '--title', title,
        '--body-file', bodyPath,
      ], { cwd: root });
      return Number(pr.number);
    }

    gh([
      'pr', 'create',
      '--base', DEFAULT_BRANCH,
      '--head', branch,
      '--title', title,
      '--body-file', bodyPath,
    ], { cwd: root });

    const created = gh([
      'pr', 'list',
      '--head', branch,
      '--base', DEFAULT_BRANCH,
      '--state', 'open',
      '--json', 'number,url,headRefOid',
      '--limit', '1',
    ], { cwd: root });
    const rows = parseJsonOutput(created.stdout || '[]', 'gh pr list post-create');
    if (!Array.isArray(rows) || rows.length !== 1) fail('No se pudo resolver el PR creado.');
    return Number(rows[0].number);
  } finally {
    fs.rmSync(tempDir, { recursive: true, force: true });
  }
}

function createOrUpdatePr(root, taskId, branch, body) {
  return createOrUpdateBranchPr(root, {
    branch,
    title: `${taskId}: cierre de tarea`,
    body,
  });
}

export function buildInfraPrBody(changeId, paths) {
  const id = normalizeInfraChangeId(changeId);
  const normalizedPaths = [...new Set(paths.map((entry) => String(entry).replaceAll('\\', '/')))].sort();
  ensureInfraPaths(normalizedPaths);
  return [
    'VENTO-TREQ-AFFECTED: NONE',
    `VENTO-TREQ-ZERO-REASON: ${id} es un cambio transversal de infraestructura y este comando bloquea archivos canonicos de tarea.`,
    '',
    '## Cambio transversal de infraestructura',
    '',
    id,
    '',
    '## Archivos',
    '',
    ...normalizedPaths.map((entry) => `- ${entry}`),
    '',
  ].join('\n');
}

export function buildOpsPrBody(changeId, paths) {
  const id = normalizeInfraChangeId(changeId);
  const normalizedPaths = [...new Set(paths.map((entry) => String(entry).replaceAll('\\', '/')))].sort();
  ensureOpsPaths(normalizedPaths);
  return [
    'VENTO-TREQ-AFFECTED: NONE',
    `VENTO-TREQ-ZERO-REASON: ${id} publica documentacion operativa no canonica y este comando bloquea el Plan Canonico, codigo de aplicacion e infraestructura.`,
    '',
    '## Documentacion operativa',
    '',
    id,
    '',
    '## Archivos',
    '',
    ...normalizedPaths.map((entry) => `- ${entry}`),
    '',
  ].join('\n');
}

function cleanupBranch(root, branch) {
  if (remoteBranchExists(root, branch)) {
    git(['push', 'origin', '--delete', branch], { cwd: root, allowFailure: true });
  }
  if (localBranchExists(root, branch)) {
    git(['branch', '-d', branch], { cwd: root, allowFailure: true });
  }

  const remoteRemaining = remoteBranchExists(root, branch);
  const localRemaining = localBranchExists(root, branch);
  if (remoteRemaining || localRemaining) {
    fail(
      `No se pudo cerrar completamente ${branch}: local=${localRemaining ? 'PRESENTE' : 'AUSENTE'}, remote=${remoteRemaining ? 'PRESENTE' : 'AUSENTE'}.`,
    );
  }

  return { remote: 'DELETED', local: 'DELETED' };
}

function printResult(fields) {
  console.log('');
  console.log(RESULT_START);
  for (const [key, value] of Object.entries(fields)) {
    console.log(`${key}: ${value}`);
  }
  console.log(RESULT_END);
}

export function startTask({ taskId, root = ensureRepositoryRoot() }) {
  const id = normalizeTaskId(taskId);
  const branch = taskBranchName(id);

  ensureGhReady(root);
  ensureClean(root, 'START');

  git(['fetch', 'origin', DEFAULT_BRANCH, '--quiet'], { cwd: root });
  git(['switch', DEFAULT_BRANCH], { cwd: root });
  git(['pull', '--ff-only', 'origin', DEFAULT_BRANCH], { cwd: root });
  ensureClean(root, 'START MAIN');

  const preflight = ensureTaskCanStart(root, id);
  let mode = 'CREATED';

  const remoteExists = remoteBranchExists(root, branch);
  const localExists = localBranchExists(root, branch);

  if (remoteExists) {
    mode = 'RESUMED';
    git(['fetch', 'origin', branch, '--quiet'], { cwd: root });
    if (localExists) {
      git(['switch', branch], { cwd: root });
      git(['branch', '--set-upstream-to', `origin/${branch}`, branch], { cwd: root });
      git(['pull', '--ff-only', 'origin', branch], { cwd: root });
    } else {
      git(['switch', '-c', branch, '--track', `origin/${branch}`], { cwd: root });
    }
  } else if (localExists) {
    mode = 'RESUMED_LOCAL';
    git(['switch', branch], { cwd: root });
    git(['push', '-u', 'origin', branch], { cwd: root });
  } else {
    git(['switch', '-c', branch], { cwd: root });
    git(['push', '-u', 'origin', branch], { cwd: root });
  }

  ensureClean(root, 'START BRANCH');
  const sync = syncCounts(root, `origin/${branch}`, 'HEAD');
  if (sync.behind !== 0 || sync.ahead !== 0) {
    fail(`La rama no quedo sincronizada con origin/${branch}: ${sync.raw}.`);
  }

  printResult({
    ESTADO: 'PASS',
    OPERACION: 'TASK_START',
    TASK_ID: id,
    BRANCH: branch,
    BRANCH_MODE: mode,
    BASE: DEFAULT_BRANCH,
    PREFLIGHT: 'PASS',
    CURRENT_TASK: preflight.task.id,
    REMOTE_BRANCH: 'PUBLISHED',
    SYNC_REMOTE: '0/0',
    WORKTREE: 'CLEAN',
    READY_TO_WORK: 'SI',
  });
}

export function finishTask({ taskId, root = ensureRepositoryRoot() }) {
  const id = normalizeTaskId(taskId);
  const branch = taskBranchName(id);

  ensureGhReady(root);
  if (currentBranch(root) !== branch) {
    fail(`FINISH debe ejecutarse desde ${branch}; rama actual: ${currentBranch(root) || 'DETACHED'}.`);
  }

  git(['fetch', 'origin', DEFAULT_BRANCH, '--quiet'], { cwd: root });
  const report = ensureTaskCanFinish(root, id);
  const treq = readTreqDeclaration(root, report, id);

  const dirty = worktreePaths(root);
  if (dirty.length > 0) {
    ensureNoUnknownPaths(dirty);
    git(['diff', '--check'], { cwd: root });
    git(['add', '--', ...dirty], { cwd: root });
    npm(['run', '--silent', 'docs:commit-scope:check', '--', '--staged'], { cwd: root });
    git(['diff', '--cached', '--check'], { cwd: root });

    const staged = git(['diff', '--cached', '--name-only', '--diff-filter=ACMRD'], { cwd: root }).stdout.trim();
    if (staged) {
      git(['commit', '-m', `task(${id}): close`], { cwd: root });
    }
  }

  const branchCommits = Number(
    git(['rev-list', '--count', `origin/${DEFAULT_BRANCH}..HEAD`], { cwd: root }).stdout.trim(),
  );
  if (!Number.isFinite(branchCommits) || branchCommits <= 0) {
    fail(`${branch} no contiene commits nuevos respecto de origin/${DEFAULT_BRANCH}.`);
  }

  git(['push', '-u', 'origin', branch], { cwd: root });
  const branchSync = syncCounts(root, `origin/${branch}`, 'HEAD');
  if (branchSync.behind !== 0 || branchSync.ahead !== 0) {
    fail(`Push incompleto de ${branch}: ${branchSync.raw}.`);
  }

  const headSha = currentHead(root);
  const prBody = buildPrBody(id, treq);
  const prNumber = createOrUpdatePr(root, id, branch, prBody);

  let prState = readOpenPrState(root, prNumber);
  ensureOpenPrIdentity(prState, prNumber, headSha);

  const registeredCheckCount = waitForPrChecksToRegister(root, prNumber);
  const completedCheckCount = waitForPrChecksToComplete(root, prNumber);

  prState = readOpenPrState(root, prNumber);
  ensureOpenPrIdentity(prState, prNumber, headSha);

  gh([
    'pr', 'merge', String(prNumber),
    '--merge',
    '--match-head-commit', headSha,
  ], { cwd: root });

  const merged = waitForPrMerged(root, prNumber, headSha);

  git(['fetch', 'origin', DEFAULT_BRANCH, '--quiet'], { cwd: root });
  git(['switch', DEFAULT_BRANCH], { cwd: root });
  git(['pull', '--ff-only', 'origin', DEFAULT_BRANCH], { cwd: root });
  ensureClean(root, 'FINISH MAIN');

  if (currentBranch(root) !== DEFAULT_BRANCH) {
    fail(`FINISH no termino en ${DEFAULT_BRANCH}; rama actual: ${currentBranch(root) || 'DETACHED'}.`);
  }

  const mainSync = syncCounts(root, `origin/${DEFAULT_BRANCH}`, 'HEAD');
  if (mainSync.behind !== 0 || mainSync.ahead !== 0) {
    fail(`main no quedo sincronizado: ${mainSync.raw}.`);
  }

  const validatedHeadInMain = git(
    ['merge-base', '--is-ancestor', headSha, 'HEAD'],
    { cwd: root, allowFailure: true },
  );
  if (validatedHeadInMain.status !== 0) {
    fail(`El HEAD validado ${headSha} no quedo contenido en main.`);
  }

  const mergeCommitInMain = git(
    ['merge-base', '--is-ancestor', merged.mergeCommitSha, 'HEAD'],
    { cwd: root, allowFailure: true },
  );
  if (mergeCommitInMain.status !== 0) {
    fail(`El merge commit ${merged.mergeCommitSha} no quedo contenido en main.`);
  }

  const cleanup = cleanupBranch(root, branch);
  ensureClean(root, 'FINISH FINAL');

  const finalMainSync = syncCounts(root, `origin/${DEFAULT_BRANCH}`, 'HEAD');
  if (finalMainSync.behind !== 0 || finalMainSync.ahead !== 0) {
    fail(`main perdio sincronizacion al final: ${finalMainSync.raw}.`);
  }

  printResult({
    ESTADO: 'PASS',
    OPERACION: 'TASK_FINISH',
    TASK_ID: id,
    BRANCH: branch,
    HEAD_VALIDATED: headSha,
    PR: prNumber,
    CHECKS_REGISTERED: registeredCheckCount,
    CHECKS_COMPLETED: completedCheckCount,
    REQUIRED_CHECKS: 'PASS',
    MERGE: 'PASS',
    MERGE_COMMIT: merged.mergeCommitSha,
    MAIN_HEAD: currentHead(root),
    HEAD_VALIDATED_IN_MAIN: 'SI',
    SYNC_MAIN: '0/0',
    WORKTREE: 'CLEAN',
    LOCAL_BRANCH: cleanup.local,
    REMOTE_BRANCH: cleanup.remote,
    NEXT_TASK_ALLOWED: 'SI',
  });
}


function runInfraLocalValidation(root, paths) {
  git(['diff', '--check'], { cwd: root });

  const checkable = paths.filter(
    (entry) => /\.(?:cjs|js|mjs)$/u.test(entry) && fs.existsSync(path.join(root, ...entry.split('/'))),
  );
  for (const entry of checkable) {
    run(process.execPath, ['--check', entry], { cwd: root });
  }

  const testFiles = paths.filter(
    (entry) => /\.test\.mjs$/u.test(entry) && fs.existsSync(path.join(root, ...entry.split('/'))),
  );
  for (const entry of testFiles) {
    run(process.execPath, ['--test', entry], { cwd: root });
  }

  npm(['run', '--silent', 'docs:plan:test'], { cwd: root });
}

export function publishInfraChange({ changeId, root = ensureRepositoryRoot() }) {
  const id = normalizeInfraChangeId(changeId);
  const branch = infraBranchName(id);

  ensureGhReady(root);
  git(['fetch', 'origin', DEFAULT_BRANCH, '--quiet'], { cwd: root });

  const startingBranch = currentBranch(root);
  if (startingBranch === DEFAULT_BRANCH) {
    const mainSync = syncCounts(root, `origin/${DEFAULT_BRANCH}`, 'HEAD');
    if (mainSync.behind !== 0 || mainSync.ahead !== 0) {
      fail(`main debe estar sincronizado 0/0 antes del cambio transversal: ${mainSync.raw}.`);
    }

    const initialDirty = worktreePaths(root);
    if (initialDirty.length === 0) {
      fail('No hay cambios pendientes para publicar como infraestructura transversal.');
    }
    ensureInfraPaths(initialDirty);

    if (localBranchExists(root, branch) || remoteBranchExists(root, branch)) {
      fail(`La rama ${branch} ya existe; cambie a esa rama para reanudar o use otro --change-id.`);
    }

    git(['switch', '-c', branch], { cwd: root });
  } else if (startingBranch !== branch) {
    fail(`INFRA_PUBLISH debe ejecutarse desde ${DEFAULT_BRANCH} o ${branch}; rama actual: ${startingBranch || 'DETACHED'}.`);
  }

  const dirty = worktreePaths(root);
  if (dirty.length > 0) {
    ensureInfraPaths(dirty);
    runInfraLocalValidation(root, dirty);
    git(['add', '--', ...dirty], { cwd: root });
    npm(['run', '--silent', 'docs:commit-scope:check', '--', '--staged'], { cwd: root });
    git(['diff', '--cached', '--check'], { cwd: root });

    const staged = parsePorcelainPaths(
      git(['status', '--porcelain=v1', '--untracked-files=all'], { cwd: root }).stdout,
    );
    ensureInfraPaths(staged);

    const stagedNames = git(
      ['diff', '--cached', '--name-only', '--diff-filter=ACMRD'],
      { cwd: root },
    ).stdout.trim();
    if (stagedNames) {
      git(['commit', '-m', `infra(${id}): publish transversal change`], { cwd: root });
    }
  }

  ensureClean(root, 'INFRA PRE-PUSH');

  const branchCommits = Number(
    git(['rev-list', '--count', `origin/${DEFAULT_BRANCH}..HEAD`], { cwd: root }).stdout.trim(),
  );
  if (!Number.isFinite(branchCommits) || branchCommits <= 0) {
    fail(`${branch} no contiene commits nuevos respecto de origin/${DEFAULT_BRANCH}.`);
  }

  const changedPaths = git(
    ['diff', '--name-only', `origin/${DEFAULT_BRANCH}...HEAD`],
    { cwd: root },
  ).stdout.split(/\r?\n/u).map((entry) => entry.trim()).filter(Boolean);
  ensureInfraPaths(changedPaths);

  git(['push', '-u', 'origin', branch], { cwd: root });
  const branchSync = syncCounts(root, `origin/${branch}`, 'HEAD');
  if (branchSync.behind !== 0 || branchSync.ahead !== 0) {
    fail(`Push incompleto de ${branch}: ${branchSync.raw}.`);
  }

  const headSha = currentHead(root);
  const prNumber = createOrUpdateBranchPr(root, {
    branch,
    title: `infra(${id}): cambio transversal`,
    body: buildInfraPrBody(id, changedPaths),
  });

  let prState = readOpenPrState(root, prNumber);
  ensureOpenPrIdentity(prState, prNumber, headSha);

  const registeredCheckCount = waitForPrChecksToRegister(root, prNumber);
  const completedCheckCount = waitForPrChecksToComplete(root, prNumber);

  prState = readOpenPrState(root, prNumber);
  ensureOpenPrIdentity(prState, prNumber, headSha);

  gh([
    'pr', 'merge', String(prNumber),
    '--merge',
    '--match-head-commit', headSha,
  ], { cwd: root });

  const merged = waitForPrMerged(root, prNumber, headSha);

  git(['fetch', 'origin', DEFAULT_BRANCH, '--quiet'], { cwd: root });
  git(['switch', DEFAULT_BRANCH], { cwd: root });
  git(['pull', '--ff-only', 'origin', DEFAULT_BRANCH], { cwd: root });
  ensureClean(root, 'INFRA MAIN');

  const mainSync = syncCounts(root, `origin/${DEFAULT_BRANCH}`, 'HEAD');
  if (mainSync.behind !== 0 || mainSync.ahead !== 0) {
    fail(`main no quedo sincronizado: ${mainSync.raw}.`);
  }

  const validatedHeadInMain = git(
    ['merge-base', '--is-ancestor', headSha, 'HEAD'],
    { cwd: root, allowFailure: true },
  );
  if (validatedHeadInMain.status !== 0) {
    fail(`El HEAD validado ${headSha} no quedo contenido en main.`);
  }

  const mergeCommitInMain = git(
    ['merge-base', '--is-ancestor', merged.mergeCommitSha, 'HEAD'],
    { cwd: root, allowFailure: true },
  );
  if (mergeCommitInMain.status !== 0) {
    fail(`El merge commit ${merged.mergeCommitSha} no quedo contenido en main.`);
  }

  const cleanup = cleanupBranch(root, branch);
  ensureClean(root, 'INFRA FINAL');

  const finalMainSync = syncCounts(root, `origin/${DEFAULT_BRANCH}`, 'HEAD');
  if (finalMainSync.behind !== 0 || finalMainSync.ahead !== 0) {
    fail(`main perdio sincronizacion al final: ${finalMainSync.raw}.`);
  }

  printResult({
    ESTADO: 'PASS',
    OPERACION: 'INFRA_PUBLISH',
    CHANGE_ID: id,
    BRANCH: branch,
    FILES: changedPaths.length,
    HEAD_VALIDATED: headSha,
    PR: prNumber,
    CHECKS_REGISTERED: registeredCheckCount,
    CHECKS_COMPLETED: completedCheckCount,
    REQUIRED_CHECKS: 'PASS',
    MERGE: 'PASS',
    MERGE_COMMIT: merged.mergeCommitSha,
    MAIN_HEAD: currentHead(root),
    HEAD_VALIDATED_IN_MAIN: 'SI',
    SYNC_MAIN: '0/0',
    WORKTREE: 'CLEAN',
    LOCAL_BRANCH: cleanup.local,
    REMOTE_BRANCH: cleanup.remote,
    READY_FOR_NEXT_TASK: 'SI',
  });
}


export function validateOperationalGuideResilience(source) {
  const text = String(source ?? '');
  const required = [
    'RESILIENCIA DEL LIFECYCLE Y GATES',
    'authorized_changes',
    'docs:implementation:finish',
    'docs:plan:local-sync',
    'github.event.before',
    'resolveNpmInvocation',
    'HTTP 499',
    'CRLF',
    'force-push',
    'recovery ad hoc',
    'docs:delivery-exec:check',
    'stdin-commonjs',
    'Illegal return statement',
    'IMPLEMENTATION_PROTOCOL',
    'plantilla compartida contiene solo reglas comunes',
    'LC-015',
    'test contractual propietario',
    'diagnostico exacto',
    'LC-016',
    'ranura estructural de trabajo',
    'token reservado',
  ];
  const missing = required.filter((marker) => !text.includes(marker));
  if (missing.length > 0) {
    fail(`La guia operativa perdio invariantes de resiliencia: ${missing.join(', ')}.`);
  }
  if (text.includes('docs:plan:sync-local')) {
    fail('La guia operativa contiene el nombre inexistente docs:plan:sync-local.');
  }
  return true;
}

function runOpsLocalValidation(root, paths) {
  git(['diff', '--check'], { cwd: root });

  for (const entry of paths) {
    const absolute = path.join(root, ...entry.split('/'));
    if (!fs.existsSync(absolute)) continue;
    const source = fs.readFileSync(absolute, 'utf8');
    if (!source.trim()) fail(`Documento operativo vacio: ${entry}.`);
    if (entry === 'docs/VENTO_OS_GUIA_OPERATIVA_DE_COMANDOS.md') {
      validateOperationalGuideResilience(source);
    }
  }

  npm(['run', '--silent', 'docs:plan:test'], { cwd: root });
}

export function publishOpsChange({ changeId, root = ensureRepositoryRoot() }) {
  const id = normalizeInfraChangeId(changeId);
  const branch = opsBranchName(id);

  ensureGhReady(root);
  git(['fetch', 'origin', DEFAULT_BRANCH, '--quiet'], { cwd: root });

  const startingBranch = currentBranch(root);
  if (startingBranch === DEFAULT_BRANCH) {
    const mainSync = syncCounts(root, `origin/${DEFAULT_BRANCH}`, 'HEAD');
    if (mainSync.behind !== 0 || mainSync.ahead !== 0) {
      fail(`main debe estar sincronizado 0/0 antes de publicar documentacion operativa: ${mainSync.raw}.`);
    }

    const initialDirty = worktreePaths(root);
    if (initialDirty.length === 0) {
      fail('No hay cambios pendientes para publicar como documentacion operativa.');
    }
    ensureOpsPaths(initialDirty);

    if (localBranchExists(root, branch) || remoteBranchExists(root, branch)) {
      fail(`La rama ${branch} ya existe; cambie a esa rama para reanudar o use otro --change-id.`);
    }

    git(['switch', '-c', branch], { cwd: root });
  } else if (startingBranch !== branch) {
    fail(`OPS_PUBLISH debe ejecutarse desde ${DEFAULT_BRANCH} o ${branch}; rama actual: ${startingBranch || 'DETACHED'}.`);
  }

  const dirty = worktreePaths(root);
  if (dirty.length > 0) {
    ensureOpsPaths(dirty);
    runOpsLocalValidation(root, dirty);
    git(['add', '--', ...dirty], { cwd: root });
    npm(['run', '--silent', 'docs:commit-scope:check', '--', '--staged'], { cwd: root });
    git(['diff', '--cached', '--check'], { cwd: root });

    const staged = parsePorcelainPaths(
      git(['status', '--porcelain=v1', '--untracked-files=all'], { cwd: root }).stdout,
    );
    ensureOpsPaths(staged);

    const stagedNames = git(
      ['diff', '--cached', '--name-only', '--diff-filter=ACMRD'],
      { cwd: root },
    ).stdout.trim();
    if (stagedNames) {
      git(['commit', '-m', `docs(${id}): publish operational documentation`], { cwd: root });
    }
  }

  ensureClean(root, 'OPS PRE-PUSH');

  const branchCommits = Number(
    git(['rev-list', '--count', `origin/${DEFAULT_BRANCH}..HEAD`], { cwd: root }).stdout.trim(),
  );
  if (!Number.isFinite(branchCommits) || branchCommits <= 0) {
    fail(`${branch} no contiene commits nuevos respecto de origin/${DEFAULT_BRANCH}.`);
  }

  const changedPaths = git(
    ['diff', '--name-only', `origin/${DEFAULT_BRANCH}...HEAD`],
    { cwd: root },
  ).stdout.split(/\r?\n/u).map((entry) => entry.trim()).filter(Boolean);
  ensureOpsPaths(changedPaths);

  git(['push', '-u', 'origin', branch], { cwd: root });
  const branchSync = syncCounts(root, `origin/${branch}`, 'HEAD');
  if (branchSync.behind !== 0 || branchSync.ahead !== 0) {
    fail(`Push incompleto de ${branch}: ${branchSync.raw}.`);
  }

  const headSha = currentHead(root);
  const prNumber = createOrUpdateBranchPr(root, {
    branch,
    title: `docs(${id}): documentacion operativa`,
    body: buildOpsPrBody(id, changedPaths),
  });

  let prState = readOpenPrState(root, prNumber);
  ensureOpenPrIdentity(prState, prNumber, headSha);

  const registeredCheckCount = waitForPrChecksToRegister(root, prNumber);
  const completedCheckCount = waitForPrChecksToComplete(root, prNumber);

  prState = readOpenPrState(root, prNumber);
  ensureOpenPrIdentity(prState, prNumber, headSha);

  gh([
    'pr', 'merge', String(prNumber),
    '--merge',
    '--match-head-commit', headSha,
  ], { cwd: root });

  const merged = waitForPrMerged(root, prNumber, headSha);

  git(['fetch', 'origin', DEFAULT_BRANCH, '--quiet'], { cwd: root });
  git(['switch', DEFAULT_BRANCH], { cwd: root });
  git(['pull', '--ff-only', 'origin', DEFAULT_BRANCH], { cwd: root });
  ensureClean(root, 'OPS MAIN');

  const mainSync = syncCounts(root, `origin/${DEFAULT_BRANCH}`, 'HEAD');
  if (mainSync.behind !== 0 || mainSync.ahead !== 0) {
    fail(`main no quedo sincronizado: ${mainSync.raw}.`);
  }

  const validatedHeadInMain = git(
    ['merge-base', '--is-ancestor', headSha, 'HEAD'],
    { cwd: root, allowFailure: true },
  );
  if (validatedHeadInMain.status !== 0) {
    fail(`El HEAD validado ${headSha} no quedo contenido en main.`);
  }

  const mergeCommitInMain = git(
    ['merge-base', '--is-ancestor', merged.mergeCommitSha, 'HEAD'],
    { cwd: root, allowFailure: true },
  );
  if (mergeCommitInMain.status !== 0) {
    fail(`El merge commit ${merged.mergeCommitSha} no quedo contenido en main.`);
  }

  const cleanup = cleanupBranch(root, branch);
  ensureClean(root, 'OPS FINAL');

  const finalMainSync = syncCounts(root, `origin/${DEFAULT_BRANCH}`, 'HEAD');
  if (finalMainSync.behind !== 0 || finalMainSync.ahead !== 0) {
    fail(`main perdio sincronizacion al final: ${finalMainSync.raw}.`);
  }

  printResult({
    ESTADO: 'PASS',
    OPERACION: 'OPS_PUBLISH',
    CHANGE_ID: id,
    BRANCH: branch,
    FILES: changedPaths.length,
    HEAD_VALIDATED: headSha,
    PR: prNumber,
    CHECKS_REGISTERED: registeredCheckCount,
    CHECKS_COMPLETED: completedCheckCount,
    REQUIRED_CHECKS: 'PASS',
    MERGE: 'PASS',
    MERGE_COMMIT: merged.mergeCommitSha,
    MAIN_HEAD: currentHead(root),
    HEAD_VALIDATED_IN_MAIN: 'SI',
    SYNC_MAIN: '0/0',
    WORKTREE: 'CLEAN',
    LOCAL_BRANCH: cleanup.local,
    REMOTE_BRANCH: cleanup.remote,
    READY_FOR_NEXT_TASK: 'SI',
  });
}

function parseArgs(argv) {
  const args = { mode: null, taskId: null, changeId: null, help: false };
  if (argv.length > 0 && !argv[0].startsWith('--')) {
    args.mode = argv[0];
    argv = argv.slice(1);
  }
  for (let index = 0; index < argv.length; index += 1) {
    const token = argv[index];
    if (token === '--help' || token === '-h') args.help = true;
    else if (token === '--task-id') {
      const value = argv[index + 1];
      if (!value || value.startsWith('--')) fail('Falta valor de --task-id.');
      args.taskId = value;
      index += 1;
    } else if (token === '--change-id') {
      const value = argv[index + 1];
      if (!value || value.startsWith('--')) fail('Falta valor de --change-id.');
      args.changeId = value;
      index += 1;
    } else fail(`Argumento desconocido: ${token}.`);
  }
  return args;
}

function usage() {
  console.log('Uso:');
  console.log('  npm run docs:task:start -- --task-id AUTH-SRV-001');
  console.log('  npm run docs:task:finish -- --task-id AUTH-SRV-001');
  console.log('  npm run docs:infra:publish -- --change-id task-lifecycle-finish-verification');
  console.log('  npm run docs:ops:publish -- --change-id guia-operativa-comandos');
  console.log('');
  console.log('docs:infra:publish se usa desde main con cambios locales de infraestructura permitidos.');
  console.log('Crea infra/<change-id>, valida, hace commit/push/PR, espera checks, mergea, limpia y verifica main 0/0.');
  console.log('docs:ops:publish se usa desde main con Markdown operativo ubicado directamente en docs/.');
  console.log('Crea ops/<change-id>, valida, hace commit/push/PR, espera checks, mergea, limpia y verifica main 0/0.');
}

function main() {
  const args = parseArgs(process.argv.slice(2));
  if (args.help) {
    usage();
    return;
  }
  if (!['start', 'finish', 'infra', 'ops'].includes(args.mode)) fail('Modo requerido: start, finish, infra u ops.');

  if (args.mode === 'infra') {
    if (!args.changeId) fail('Falta --change-id.');
    publishInfraChange({ changeId: args.changeId });
    return;
  }

  if (args.mode === 'ops') {
    if (!args.changeId) fail('Falta --change-id.');
    publishOpsChange({ changeId: args.changeId });
    return;
  }

  if (!args.taskId) fail('Falta --task-id.');
  if (args.mode === 'start') startTask({ taskId: args.taskId });
  else finishTask({ taskId: args.taskId });
}

const isCli = process.argv[1] && path.resolve(process.argv[1]) === path.resolve(fileURLToPath(import.meta.url));

if (isCli) {
  try {
    main();
  } catch (error) {
    const message = error instanceof Error ? error.message : String(error);
    const code = Number.isInteger(error?.exitCode) ? error.exitCode : 1;
    const mode = process.argv[2];
    printResult({
      ESTADO: 'FAIL',
      OPERACION: mode === 'finish' ? 'TASK_FINISH' : mode === 'infra' ? 'INFRA_PUBLISH' : mode === 'ops' ? 'OPS_PUBLISH' : 'TASK_START',
      COMPROBACION_FALLIDA: message.replace(/[\r\n]+/gu, ' | '),
      EXIT_CODE_REPORTADO: code,
      ...(['infra', 'ops'].includes(mode) ? { READY_FOR_NEXT_TASK: 'NO' } : { NEXT_TASK_ALLOWED: 'NO' }),
    });
    process.exitCode = code;
  }
}
