import fs from 'node:fs';
import path from 'node:path';
import os from 'node:os';
import { spawnSync } from 'node:child_process';

import {
  correctionBranchName,
  correctionRecordRelativePath,
  loadValidatedCorrectionControl,
  normalizeCorrectionId,
  openCorrections,
} from './correction-control.mjs';
import { resolveNpmInvocation } from './task-branch-lifecycle.mjs';

const DEFAULT_BRANCH = 'main';
const RESULT_START = '=== RESULTADO PARA CHATGPT ===';
const RESULT_END = '=== FIN RESULTADO PARA CHATGPT ===';

function fail(message, code = 1) {
  const error = new Error(message);
  error.exitCode = code;
  throw error;
}

function run(command, args, {
  cwd = process.cwd(),
  allowFailure = false,
  inherit = false,
} = {}) {
  const result = spawnSync(command, args, {
    cwd,
    encoding: 'utf8',
    windowsHide: true,
    stdio: inherit ? 'inherit' : ['ignore', 'pipe', 'pipe'],
    maxBuffer: 64 * 1024 * 1024,
  });

  if (result.error) {
    if (allowFailure) {
      return { status: 1, stdout: '', stderr: result.error.message };
    }
    fail(`${command} no disponible: ${result.error.message}`);
  }

  const status = Number.isInteger(result.status) ? result.status : 1;
  const stdout = inherit ? '' : String(result.stdout ?? '').trimEnd();
  const stderr = inherit ? '' : String(result.stderr ?? '').trimEnd();

  if (status !== 0 && !allowFailure) {
    fail(stderr || stdout || `${command} ${args.join(' ')} falló.`, status);
  }

  return { status, stdout, stderr };
}

function git(args, options = {}) {
  return run('git', args, options);
}

function gh(args, options = {}) {
  return run('gh', args, options);
}

function npm(args, options = {}) {
  const invocation = resolveNpmInvocation();
  return run(invocation.command, [...invocation.prefixArgs, ...args], options);
}

function sleep(ms) {
  Atomics.wait(new Int32Array(new SharedArrayBuffer(4)), 0, 0, ms);
}

function ensureRepositoryRoot() {
  const root = git(['rev-parse', '--show-toplevel']).stdout.trim();
  if (!root) fail('No se pudo resolver la raíz Git.');
  return root;
}

function currentBranch(root) {
  return git(['branch', '--show-current'], { cwd: root }).stdout.trim();
}

function currentHead(root) {
  return git(['rev-parse', 'HEAD'], { cwd: root }).stdout.trim();
}

function syncCounts(root, left, right) {
  const raw = git(
    ['rev-list', '--left-right', '--count', `${left}...${right}`],
    { cwd: root },
  ).stdout.trim();
  const [behind, ahead] = raw.split(/\s+/u).map(Number);
  return { behind, ahead, raw };
}

function worktreePaths(root) {
  return git(
    ['status', '--porcelain=v1', '--untracked-files=all'],
    { cwd: root },
  ).stdout.split(/\r?\n/u).filter(Boolean);
}

function localBranchExists(root, branch) {
  return git(
    ['show-ref', '--verify', '--quiet', `refs/heads/${branch}`],
    { cwd: root, allowFailure: true },
  ).status === 0;
}

function remoteBranchExists(root, branch) {
  return git(
    ['ls-remote', '--exit-code', '--heads', 'origin', `refs/heads/${branch}`],
    { cwd: root, allowFailure: true },
  ).status === 0;
}

function parseJson(text, label) {
  const value = String(text ?? '').trim();
  if (!value) fail(`${label}: salida JSON vacía.`);
  try {
    return JSON.parse(value);
  } catch {
    fail(`${label}: JSON inválido.`);
  }
}

function waitForChecks(root, prNumber) {
  for (let attempt = 1; attempt <= 120; attempt += 1) {
    const probe = gh(
      ['pr', 'checks', String(prNumber), '--json', 'name,state,bucket,link'],
      { cwd: root, allowFailure: true },
    );

    if (probe.status !== 0) {
      if (attempt < 120) {
        sleep(3000);
        continue;
      }
      fail(probe.stderr || probe.stdout || `No se pudieron consultar checks de PR #${prNumber}.`);
    }

    const rows = parseJson(probe.stdout || '[]', `gh pr checks #${prNumber}`);
    if (!Array.isArray(rows) || rows.length === 0) {
      if (attempt < 120) {
        sleep(3000);
        continue;
      }
      fail(`PR #${prNumber} no registró checks.`);
    }

    const failed = rows.filter((row) =>
      ['fail', 'cancel', 'skipping'].includes(String(row.bucket ?? '').toLowerCase()),
    );
    if (failed.length > 0) {
      fail(
        `PR #${prNumber} tiene checks no aprobados: `
        + failed.map((row) => `${row.name}:${row.bucket}`).join(', '),
      );
    }

    const pending = rows.filter((row) =>
      !['pass'].includes(String(row.bucket ?? '').toLowerCase()),
    );
    if (pending.length === 0) return rows.length;

    sleep(3000);
  }

  fail(`PR #${prNumber} no completó checks en la ventana permitida.`);
}

function printResult(fields) {
  console.log('');
  console.log(RESULT_START);
  for (const [key, value] of Object.entries(fields)) {
    console.log(`${key}: ${value}`);
  }
  console.log(RESULT_END);
}

function parseArgs(argv) {
  const args = { correctionId: null, reason: null, help: false };

  for (let index = 0; index < argv.length; index += 1) {
    const token = argv[index];
    if (token === '--help' || token === '-h') args.help = true;
    else if (token === '--correction-id') {
      const value = argv[index + 1];
      if (!value || value.startsWith('--')) fail('Falta valor de --correction-id.');
      args.correctionId = value;
      index += 1;
    } else if (token === '--reason') {
      const value = argv[index + 1];
      if (!value || value.startsWith('--')) fail('Falta valor de --reason.');
      args.reason = value;
      index += 1;
    } else {
      fail(`Argumento desconocido: ${token}.`);
    }
  }

  return args;
}

function usage() {
  console.log(
    'Uso: npm run docs:correction:cancel -- '
    + '--correction-id DELIV-PKG-014::CORR-001 '
    + '--reason FALSE_CORRECTION_CLASSIFICATION',
  );
}

export function cancelCorrection({
  root = ensureRepositoryRoot(),
  correctionId,
  reason,
  cancelledBy = 'VENTO_OWNER',
} = {}) {
  const id = normalizeCorrectionId(correctionId);
  const cancellationReason = String(reason ?? '').trim();
  if (cancellationReason.length < 20) {
    fail('La cancelación exige --reason concreto de al menos 20 caracteres.');
  }

  if (gh(['--version'], { cwd: root, allowFailure: true }).status !== 0) {
    fail('GitHub CLI gh no está disponible.');
  }
  if (gh(['auth', 'status'], { cwd: root, allowFailure: true }).status !== 0) {
    fail('gh no está autenticado.');
  }

  if (worktreePaths(root).length > 0) {
    fail('CORRECTION_CANCEL exige worktree limpio.');
  }

  git(['fetch', 'origin', DEFAULT_BRANCH, '--quiet'], { cwd: root });
  if (currentBranch(root) !== DEFAULT_BRANCH) {
    git(['switch', DEFAULT_BRANCH], { cwd: root });
  }
  git(['pull', '--ff-only', 'origin', DEFAULT_BRANCH], { cwd: root });

  const sync = syncCounts(root, `origin/${DEFAULT_BRANCH}`, 'HEAD');
  if (sync.behind !== 0 || sync.ahead !== 0) {
    fail(`main no está sincronizado 0/0: ${sync.raw}.`);
  }

  const control = loadValidatedCorrectionControl({ root });
  const entry = control.records.find((candidate) => candidate.record.correction_id === id);
  if (!entry) fail(`No existe ${id}.`);

  const record = entry.record;

  if (record.status === 'CANCELLED') {
    printResult({
      ESTADO: 'PASS',
      OPERACION: 'CORRECTION_CANCEL',
      CORRECTION_ID: id,
      STATUS: 'CANCELLED',
      MODE: 'ALREADY_CANCELLED',
      OPEN_CORRECTION: 'NO',
      MAIN_HEAD: currentHead(root),
    });
    return record;
  }

  if (record.status !== 'PENDING_AUTHORIZATION') {
    fail(`${id}: solo PENDING_AUTHORIZATION puede cancelarse sin trabajo correctivo; actual=${record.status}.`);
  }
  if (record.blocking !== false) fail(`${id}: cancelación V1 exige blocking=false.`);
  if (!Array.isArray(record.blocked_targets) || record.blocked_targets.length !== 0) {
    fail(`${id}: cancelación V1 exige blocked_targets vacío.`);
  }
  if (record.authorization !== null) fail(`${id}: cancelación V1 exige authorization=null.`);
  if (!Array.isArray(record.authorized_changes) || record.authorized_changes.length !== 0) {
    fail(`${id}: cancelación V1 exige authorized_changes vacío.`);
  }
  if (!Array.isArray(record.validation_commands) || record.validation_commands.length !== 0) {
    fail(`${id}: cancelación V1 exige validation_commands vacío.`);
  }
  if (!Array.isArray(record.evidence) || record.evidence.length !== 0) {
    fail(`${id}: cancelación V1 exige evidence vacío.`);
  }

  const branch = correctionBranchName(id);

  if (localBranchExists(root, branch) || remoteBranchExists(root, branch)) {
    fail(`${branch} ya existe; limpie primero la rama abandonada antes de cancelar.`);
  }

  git(['switch', '-c', branch], { cwd: root });

  const recordPath = correctionRecordRelativePath(id);
  const recordAbs = path.join(root, ...recordPath.split('/'));

  const cancelled = {
    ...record,
    status: 'CANCELLED',
    blocking: false,
    blocked_targets: [],
    target_repositories: [],
    authorized_changes: [],
    validation_commands: [],
    affected_treq_ids: [],
    zero_treq_reason:
      'Cancelación de registro creado por clasificación falsa; no hubo TREQ ni trabajo correctivo autorizado.',
    authorization: null,
    evidence: [],
    cancelled_at: new Date().toISOString(),
    cancelled_by: String(cancelledBy).trim() || 'VENTO_OWNER',
    cancellation_reason: cancellationReason,
  };

  fs.writeFileSync(recordAbs, `${JSON.stringify(cancelled, null, 2)}\n`, 'utf8');

  loadValidatedCorrectionControl({ root });

  git(['add', '--', recordPath], { cwd: root });
  npm(['run', '--silent', 'docs:commit-scope:check', '--', '--staged'], { cwd: root });
  git(['diff', '--cached', '--check'], { cwd: root });

  git(
    ['commit', '-m', `docs(${id}): cancel false correction registration`],
    { cwd: root },
  );

  const head = currentHead(root);
  git(['push', '-u', 'origin', branch], { cwd: root });

  const bodyPath = path.join(
    fs.mkdtempSync(path.join(os.tmpdir(), 'vento-correction-cancel-')),
    'body.md',
  );

  fs.writeFileSync(
    bodyPath,
    [
      'VENTO-TREQ-AFFECTED: NONE',
      'VENTO-TREQ-ZERO-REASON: cancelación de registro falso; no hubo cambio funcional ni trabajo correctivo.',
      '',
      '## Cancelación de corrección',
      '',
      id,
      '',
      `Razón: ${cancellationReason}`,
      '',
      'El ledger permanece append-only: el registro no se elimina; pasa a estado terminal CANCELLED.',
      '',
    ].join('\n'),
    'utf8',
  );

  try {
    gh(
      [
        'pr', 'create',
        '--base', DEFAULT_BRANCH,
        '--head', branch,
        '--title', `docs(${id}): cancelar registro de corrección falso`,
        '--body-file', bodyPath,
      ],
      { cwd: root },
    );
  } finally {
    fs.rmSync(path.dirname(bodyPath), { recursive: true, force: true });
  }

  const prRows = parseJson(
    gh(
      [
        'pr', 'list',
        '--head', branch,
        '--base', DEFAULT_BRANCH,
        '--state', 'open',
        '--json', 'number,headRefOid',
        '--limit', '1',
      ],
      { cwd: root },
    ).stdout || '[]',
    'gh pr list',
  );

  if (!Array.isArray(prRows) || prRows.length !== 1) {
    fail('No se pudo resolver el PR de cancelación.');
  }

  const prNumber = Number(prRows[0].number);
  if (String(prRows[0].headRefOid ?? '') !== head) {
    fail(`PR #${prNumber} no apunta al HEAD validado ${head}.`);
  }

  const checks = waitForChecks(root, prNumber);

  gh(
    [
      'pr', 'merge', String(prNumber),
      '--merge',
      '--match-head-commit', head,
    ],
    { cwd: root },
  );

  git(['fetch', 'origin', DEFAULT_BRANCH, '--quiet'], { cwd: root });
  git(['switch', DEFAULT_BRANCH], { cwd: root });
  git(['pull', '--ff-only', 'origin', DEFAULT_BRANCH], { cwd: root });

  const finalControl = loadValidatedCorrectionControl({ root });
  const finalRecord = finalControl.records
    .find((candidate) => candidate.record.correction_id === id)?.record ?? null;

  if (!finalRecord || finalRecord.status !== 'CANCELLED') {
    fail(`${id} no quedó CANCELLED en main.`);
  }

  if (openCorrections(finalControl).some((candidate) => candidate.correction_id === id)) {
    fail(`${id} continúa apareciendo como corrección abierta.`);
  }

  if (remoteBranchExists(root, branch)) {
    git(['push', 'origin', '--delete', branch], { cwd: root, allowFailure: true });
  }
  if (localBranchExists(root, branch)) {
    git(['branch', '-d', branch], { cwd: root, allowFailure: true });
  }

  printResult({
    ESTADO: 'PASS',
    OPERACION: 'CORRECTION_CANCEL',
    CORRECTION_ID: id,
    STATUS: 'CANCELLED',
    PR: prNumber,
    CHECKS_COMPLETED: checks,
    MERGE: 'PASS',
    OPEN_CORRECTION: 'NO',
    MAIN_HEAD: currentHead(root),
    WORKTREE: worktreePaths(root).length === 0 ? 'CLEAN' : 'DIRTY',
  });

  return finalRecord;
}

function main() {
  const args = parseArgs(process.argv.slice(2));
  if (args.help) {
    usage();
    return;
  }
  if (!args.correctionId) fail('Falta --correction-id.');
  if (!args.reason) fail('Falta --reason.');

  cancelCorrection({
    correctionId: args.correctionId,
    reason: args.reason,
  });
}

const isCli = process.argv[1]
  && path.resolve(process.argv[1]) === path.resolve(new URL(import.meta.url).pathname);

if (isCli) {
  try {
    main();
  } catch (error) {
    printResult({
      ESTADO: 'FAIL',
      OPERACION: 'CORRECTION_CANCEL',
      COMPROBACION_FALLIDA:
        String(error?.message ?? error).replace(/[\r\n]+/gu, ' | '),
      EXIT_CODE_REPORTADO:
        Number.isInteger(error?.exitCode) ? error.exitCode : 1,
    });
    process.exitCode =
      Number.isInteger(error?.exitCode) ? error.exitCode : 1;
  }
}
