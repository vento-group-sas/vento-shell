import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { spawn, spawnSync } from 'node:child_process';

import {
  classifyPrChecksProbe,
  isTransientPrChecksFailure,
  parsePorcelainPaths,
  resolveNpmInvocation,
  waitForPrChecksToComplete,
} from './task-branch-lifecycle.mjs';
import {
  instanceRecordRelativePath,
  loadImplementationControl,
  pendingInstanceRecord,
  validateImplementationControl,
} from './implementation-control.mjs';
import { resolveTaskWorkTopology } from './task-work-topology.mjs';
import { syncLocalDerivedArtifacts } from './sync-local-derived-artifacts.mjs';
import {
  assertPackagePhysicalDependenciesReady,
  scanPackageReadiness,
  validateInPackageCandidateEvidence,
} from './package-readiness-scanner.mjs';

const DEFAULT_BRANCH = 'main';
const IMPLEMENTATION_PREFIX = 'implementation/';
const RESULT_START = '=== RESULTADO PARA CHATGPT ===';
const RESULT_END = '=== FIN RESULTADO PARA CHATGPT ===';
const CHECK_REGISTRATION_ATTEMPTS = 60;
const CHECK_REGISTRATION_INTERVAL_MS = 2000;
const MERGE_CONFIRM_ATTEMPTS = 60;
const MERGE_CONFIRM_INTERVAL_MS = 2000;
const GITHUB_TRANSPORT_ATTEMPTS = 20;
const GITHUB_TRANSPORT_INTERVAL_MS = 2000;
const GITHUB_TRANSIENT_MARKER = 'GITHUB_TRANSIENT_UNAVAILABLE';
const SHELL_REPOSITORY = 'vento-group-sas/vento-shell';
const DERIVED_IMPLEMENTATION_PROJECTIONS = new Set([
  'docs/plan-canonico/modular/00_CABECERA_Y_ESTADO.md',
  'docs/plan-canonico/modular/active-sequence.json',
  'docs/plan-canonico/modular/.generated/REGISTRO_GLOBAL_DE_TAREAS.md',
  'docs/plan-canonico/modular/.generated/REGISTRO_DE_TAREAS_PENDIENTES_CON_CONTEXTO.md',
  'scripts/docs/package-readiness/implementation-package-registry.json',
]);

function fail(message, code = 1) {
  const error = new Error(message);
  error.exitCode = code;
  throw error;
}

export function normalizeInstanceId(value) {
  const raw = String(value ?? '').trim();
  const match = /^([A-Za-z0-9]+(?:-[A-Za-z0-9]+)*-[0-9]{3,4})::([A-Za-z0-9][A-Za-z0-9._-]*)$/u.exec(raw);
  if (!match) {
    fail(`INSTANCE_ID invalido: ${raw || 'VACIO'}.`);
  }
  return `${match[1].toUpperCase()}::${match[2]}`;
}

export function implementationBranchName(instanceId) {
  const normalized = normalizeInstanceId(instanceId);
  const separator = normalized.indexOf('::');
  const taskId = normalized.slice(0, separator).toLowerCase();
  const instanceKey = normalized.slice(separator + 2).toLowerCase();
  return `${IMPLEMENTATION_PREFIX}${taskId}/${instanceKey}`;
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

function runAsync(command, args, {
  cwd = process.cwd(),
  env = process.env,
} = {}) {
  return new Promise((resolve, reject) => {
    const child = spawn(command, args, {
      cwd,
      windowsHide: true,
      env,
      stdio: ['ignore', 'pipe', 'pipe'],
    });

    let stdout = '';
    let stderr = '';

    child.stdout.setEncoding('utf8');
    child.stderr.setEncoding('utf8');
    child.stdout.on('data', (chunk) => {
      stdout += chunk;
    });
    child.stderr.on('data', (chunk) => {
      stderr += chunk;
    });

    child.on('error', (error) => {
      const next = new Error(`${command} no disponible: ${error.message}`);
      next.exitCode = 1;
      reject(next);
    });

    child.on('close', (code) => {
      const status = Number.isInteger(code) ? code : 1;
      const normalizedStdout = stdout.trimEnd();
      const normalizedStderr = stderr.trimEnd();

      if (status !== 0) {
        const error = new Error(
          normalizedStderr || normalizedStdout || `${command} ${args.join(' ')} fallo.`,
        );
        error.exitCode = status;
        reject(error);
        return;
      }

      resolve({ status, stdout: normalizedStdout, stderr: normalizedStderr });
    });
  });
}

function git(args, options = {}) {
  return run('git', args, options);
}

function gh(args, options = {}) {
  const {
    transportAttempts = GITHUB_TRANSPORT_ATTEMPTS,
    transportIntervalMs = GITHUB_TRANSPORT_INTERVAL_MS,
    ...runOptions
  } = options;
  const callerAllowsFailure = runOptions.allowFailure === true;
  let last = {
    status: 1,
    stdout: '',
    stderr: GITHUB_TRANSIENT_MARKER,
  };

  for (let attempt = 1; attempt <= transportAttempts; attempt += 1) {
    const result = run('gh', args, {
      ...runOptions,
      allowFailure: true,
    });

    if (result.status === 0) return result;

    if (!isTransientPrChecksFailure(result)) {
      if (callerAllowsFailure) return result;
      fail(
        result.stderr
        || result.stdout
        || `gh ${args.join(' ')} fallo.`,
        result.status,
      );
    }

    last = result;

    if (attempt < transportAttempts) {
      sleep(transportIntervalMs);
    }
  }

  if (callerAllowsFailure) {
    return {
      status: last.status || 1,
      stdout: '',
      stderr: GITHUB_TRANSIENT_MARKER,
    };
  }

  fail(
    `GitHub temporalmente no disponible despues de ${transportAttempts} intentos.`,
    last.status || 1,
  );
}

function npm(args, options = {}) {
  const invocation = resolveNpmInvocation();
  return run(invocation.command, [...invocation.prefixArgs, ...args], options);
}

function npmAsync(args, options = {}) {
  const invocation = resolveNpmInvocation();
  return runAsync(invocation.command, [...invocation.prefixArgs, ...args], options);
}

function sleep(milliseconds) {
  const delay = Number(milliseconds);
  if (!Number.isFinite(delay) || delay <= 0) return;
  Atomics.wait(new Int32Array(new SharedArrayBuffer(4)), 0, 0, delay);
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

function worktreePaths(root) {
  return parsePorcelainPaths(
    git(['status', '--porcelain=v1', '--untracked-files=all'], { cwd: root }).stdout,
  );
}

function syncCounts(root, left, right) {
  const raw = git(['rev-list', '--left-right', '--count', `${left}...${right}`], { cwd: root }).stdout.trim();
  const [behind, ahead] = raw.split(/\s+/u).map(Number);
  return { behind: Number(behind), ahead: Number(ahead), raw };
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

function printResult(fields) {
  console.log('');
  console.log(RESULT_START);
  for (const [key, value] of Object.entries(fields)) {
    console.log(`${key}: ${value}`);
  }
  console.log(RESULT_END);
}

function loadValidatedControl(root) {
  const topology = resolveTaskWorkTopology({ root });
  return validateImplementationControl(loadImplementationControl({ root }), topology);
}

function resolveInstance(root, instanceId) {
  const id = normalizeInstanceId(instanceId);
  const control = loadValidatedControl(root);
  const instance = control.instances.find((entry) => entry.instance_id === id) ?? null;
  if (!instance) fail(`${id} no existe en implementation-instances.`);
  return { id, instance, control };
}

export function assertInstanceCanStart(instance) {
  if (!instance || typeof instance !== 'object') fail('Instancia fisica invalida.');
  if (instance.status !== 'AUTHORIZED') {
    fail(`${instance.instance_id ?? 'INSTANCIA'} debe estar AUTHORIZED antes de docs:implementation:start; estado actual: ${instance.status ?? 'DESCONOCIDO'}.`);
  }
  if (!instance.authorization || instance.authorization.decision !== 'APPROVED') {
    fail(`${instance.instance_id} no conserva authorization APPROVED.`);
  }
  return true;
}

export function assertInstanceCanFinish(instance) {
  if (!instance || typeof instance !== 'object') fail('Instancia fisica invalida.');
  if (instance.status !== 'VERIFIED') {
    fail(`${instance.instance_id ?? 'INSTANCIA'} debe estar VERIFIED antes de docs:implementation:finish; estado actual: ${instance.status ?? 'DESCONOCIDO'}.`);
  }
  if (!Array.isArray(instance.evidence) || instance.evidence.length === 0) {
    fail(`${instance.instance_id} no puede cerrarse sin evidence consolidada.`);
  }
  return true;
}

export function assertCi020PhysicalPrerequisitesForFinish({
  instance,
  readiness,
  root = process.cwd(),
} = {}) {
  if (!instance || typeof instance !== 'object') {
    throw new Error('instancia física inválida para validar prerrequisitos de cierre.');
  }

  const match = /^SHELL-CI-020::(GAP-PKG-\d{3})$/u.exec(String(instance.instance_id ?? ''));
  if (instance.task_id !== 'SHELL-CI-020' || !match) return true;

  const packageId = match[1];
  assertPackagePhysicalDependenciesReady({
    registry: readiness?.registry,
    packageId,
    operation: 'IMPLEMENTATION_FINISH_PREREQUISITES',
  });

  const pkg = readiness?.registry?.packages?.find(({ package_id: id }) => id === packageId) ?? null;
  if (pkg?.execution_requirements?.supabase_mutation_required === true) {
    const gate = readiness?.contract?.physical_dependencies
      ?.supabase_pre_e5_foundation?.in_package_candidate_gate ?? null;
    const candidate = validateInPackageCandidateEvidence({
      root,
      packageId,
      instance,
      gate,
    });
    if (candidate.status !== 'PASS') {
      fail(`IMPLEMENTATION_FINISH_PREREQUISITES: ${packageId} bloqueado por MRP015-050/CANDIDATE_READY; ${candidate.detail}`);
    }
  }

  return true;
}

function normalizeRepoPath(value) {
  return String(value ?? '').replaceAll('\\', '/').replace(/^\.\//u, '');
}

function authorizedImplementationScope(instance) {
  const writable = new Set();
  const executeOnly = new Set();
  for (const entry of instance?.authorized_changes ?? []) {
    if (String(entry?.repo ?? '').trim() !== SHELL_REPOSITORY) continue;
    const relativePath = normalizeRepoPath(entry?.path);
    if (!relativePath) continue;
    const change = String(entry?.change ?? '').trim().toUpperCase();
    if (change === 'EXECUTE_ONLY') executeOnly.add(relativePath);
    else writable.add(relativePath);
  }
  return { writable, executeOnly };
}

export function isPristinePendingInstanceRecord(record, filePath) {
  if (!record || typeof record !== 'object' || Array.isArray(record)) return false;
  const expectedKeys = [
    'instance_id',
    'task_id',
    'status',
    'target_repositories',
    'authorized_changes',
    'validation_commands',
    'authorization',
    'evidence',
  ].sort();
  const actualKeys = Object.keys(record).sort();
  if (JSON.stringify(actualKeys) !== JSON.stringify(expectedKeys)) return false;
  if (!String(record.instance_id ?? '').trim() || !String(record.task_id ?? '').trim()) return false;
  if (record.status !== 'PENDING_AUTHORIZATION') return false;
  if (!Array.isArray(record.target_repositories) || record.target_repositories.length !== 0) return false;
  if (!Array.isArray(record.authorized_changes) || record.authorized_changes.length !== 0) return false;
  if (!Array.isArray(record.validation_commands) || record.validation_commands.length !== 0) return false;
  if (record.authorization !== null) return false;
  if (!Array.isArray(record.evidence) || record.evidence.length !== 0) return false;

  let expectedPath;
  try {
    expectedPath = instanceRecordRelativePath(record.instance_id);
  } catch {
    return false;
  }
  if (normalizeRepoPath(filePath) !== expectedPath) return false;

  const expected = pendingInstanceRecord({
    instanceId: record.instance_id,
    taskId: record.task_id,
  });
  return record.instance_id === expected.instance_id
    && record.task_id === expected.task_id
    && record.status === expected.status;
}

function pendingInstanceCandidate(root, relativePath, baseRef) {
  const normalized = normalizeRepoPath(relativePath);
  const prefix = 'docs/plan-canonico/modular/implementation-instances/';
  if (!normalized.startsWith(prefix) || !normalized.endsWith('.json')) return null;

  const baseProbe = git(['cat-file', '-e', `${baseRef}:${normalized}`], {
    cwd: root,
    allowFailure: true,
  });
  if (baseProbe.status === 0) return null;

  const absolute = path.join(root, ...normalized.split('/'));
  if (!fs.existsSync(absolute) || !fs.statSync(absolute).isFile()) return null;
  try {
    return JSON.parse(fs.readFileSync(absolute, 'utf8'));
  } catch {
    return null;
  }
}

export function classifyImplementationPath(filePath, instance, {
  root = null,
  baseRef = `origin/${DEFAULT_BRANCH}`,
} = {}) {
  const normalized = normalizeRepoPath(filePath);
  if (!normalized) return 'OTHER';
  if (normalized.startsWith('docs/plan-canonico/modular/') && /(?:^|\/)04A_/u.test(normalized)) {
    return 'TREQ_REGISTRY';
  }

  const ownRecordPath = instanceRecordRelativePath(instance?.instance_id);
  if (normalized === ownRecordPath) return 'OWN_INSTANCE_LEDGER';

  const scope = authorizedImplementationScope(instance);
  if (scope.writable.has(normalized)) return 'AUTHORIZED';
  if (scope.executeOnly.has(normalized)) return 'EXECUTE_ONLY';
  if (DERIVED_IMPLEMENTATION_PROJECTIONS.has(normalized)) return 'DERIVED_PROJECTION';

  if (root) {
    const candidate = pendingInstanceCandidate(root, normalized, baseRef);
    if (candidate && isPristinePendingInstanceRecord(candidate, normalized)) {
      return 'DERIVED_PENDING_INSTANCE';
    }
  }
  return 'OTHER';
}

export function assertImplementationPaths(paths, instance, options = {}) {
  if (!instance || typeof instance !== 'object') fail('Instancia fisica invalida para validar alcance.');
  const normalized = [...new Set((paths ?? []).map(normalizeRepoPath).filter(Boolean))].sort();
  const classified = normalized.map((relativePath) => ({
    path: relativePath,
    kind: classifyImplementationPath(relativePath, instance, options),
  }));

  const treqPaths = classified.filter((entry) => entry.kind === 'TREQ_REGISTRY').map((entry) => entry.path);
  if (treqPaths.length > 0) {
    fail(`El cierre fisico no puede modificar el registro 04A/TREQ: ${treqPaths.join(', ')}.`);
  }

  const executeOnly = classified.filter((entry) => entry.kind === 'EXECUTE_ONLY').map((entry) => entry.path);
  if (executeOnly.length > 0) {
    fail(`La instancia declara EXECUTE_ONLY y no autoriza escritura sobre: ${executeOnly.join(', ')}.`);
  }

  const derivedPending = classified.filter((entry) => entry.kind === 'DERIVED_PENDING_INSTANCE').map((entry) => entry.path);
  if (derivedPending.length > 1) {
    fail(`El lifecycle solo admite un nuevo registro PENDING_AUTHORIZATION derivado por cierre: ${derivedPending.join(', ')}.`);
  }

  const unknown = classified.filter((entry) => entry.kind === 'OTHER').map((entry) => entry.path);
  if (unknown.length > 0) {
    fail(`Hay archivos fuera de authorized_changes y de las proyecciones propias del lifecycle: ${unknown.join(', ')}.`);
  }
  return classified;
}

export function assertStartWorktree(paths, recordPath) {
  const normalized = [...new Set((paths ?? []).map((entry) => String(entry).replaceAll('\\', '/')))].sort();
  if (normalized.length !== 1 || normalized[0] !== recordPath) {
    fail(
      `docs:implementation:start exige que el unico cambio local sea ${recordPath}; cambios actuales: ${normalized.join(', ') || 'NINGUNO'}.`,
    );
  }
  return true;
}

export function resolveImplementationFinishMode({
  dirtyPaths = [],
  branchCommits = 0,
} = {}) {
  const dirty = [...new Set(
    (dirtyPaths ?? []).map((entry) => String(entry).replaceAll('\\', '/')).filter(Boolean),
  )];
  if (dirty.length > 0) return 'CREATE_COMMIT';

  const commits = Number(branchCommits);
  if (Number.isFinite(commits) && commits > 0) return 'RESUME_POST_COMMIT';

  fail(
    'IMPLEMENTATION_FINISH no encontro cambios locales ni un commit de implementacion existente para reanudar.',
  );
}

function writeInstanceStatus(root, instanceId, status) {
  const { instance } = resolveInstance(root, instanceId);
  const recordPath = instanceRecordRelativePath(instanceId);
  const absolute = path.join(root, ...recordPath.split('/'));
  const next = { ...instance, status };
  fs.writeFileSync(absolute, `${JSON.stringify(next, null, 2)}\n`, 'utf8');
  return next;
}

export function isDocumentaryOnlyPhysicalBlocker(entry) {
  const value = String(entry ?? '').trim();
  return value === 'active-sequence.json requiere regeneración.'
    || value.startsWith('formato de tarea: ');
}

export function physicalLaneBlockers(report, instanceId, {
  allowAuthorizedStatus = false,
} = {}) {
  const blockers = Array.isArray(report?.blockers) ? report.blockers : [];
  const expectedPrefix = `${instanceId} debe estar IN_PROGRESS para ejecutar el preflight fisico;`;
  return blockers.filter((entry) => {
    if (isDocumentaryOnlyPhysicalBlocker(entry)) return false;
    if (
      allowAuthorizedStatus
      && entry.startsWith(expectedPrefix)
      && entry.endsWith('estado actual: AUTHORIZED.')
    ) {
      return false;
    }
    return true;
  });
}

function physicalPreflight(root, instanceId) {
  const result = npm([
    'run', '--silent', 'docs:task:preflight', '--',
    '--instance-id', instanceId,
    '--json',
    '--strict',
  ], { cwd: root, allowFailure: true });

  const report = result.stdout.trim()
    ? parseJsonOutput(result.stdout, 'docs:task:preflight')
    : null;

  if (!report) {
    fail(result.stderr || result.stdout || 'Preflight fisico fallo.', result.status || 1);
  }
  if (!report.instance || report.instance.id !== instanceId || report.instance.status !== 'IN_PROGRESS') {
    fail(`Preflight no confirmo ${instanceId} en IN_PROGRESS.`);
  }

  const blockers = physicalLaneBlockers(report, instanceId);
  if (blockers.length > 0) {
    fail(`Preflight fisico bloqueado: ${blockers.join(' | ')}.`, result.status || 1);
  }
  if (result.status !== 0 && blockers.length === 0) {
    return report;
  }
  return report;
}

export function readinessBlockers(report, instanceId) {
  return physicalLaneBlockers(report, instanceId, { allowAuthorizedStatus: true });
}

function physicalReadiness(root, instanceId) {
  const result = npm([
    'run', '--silent', 'docs:task:preflight', '--',
    '--instance-id', instanceId,
    '--json',
  ], { cwd: root, allowFailure: true });

  const report = result.stdout.trim()
    ? parseJsonOutput(result.stdout, 'docs:task:preflight readiness')
    : null;

  if (result.status !== 0) {
    const detail = result.stderr || result.stdout || 'Readiness fisica previa a la rama fallo.';
    fail(detail, result.status);
  }
  if (!report?.instance || report.instance.id !== instanceId || report.instance.status !== 'AUTHORIZED') {
    fail(`Readiness no confirmo ${instanceId} en AUTHORIZED.`);
  }

  const blockers = readinessBlockers(report, instanceId);
  if (blockers.length > 0) {
    fail(`Readiness fisica bloqueada antes de crear la rama: ${blockers.join(' | ')}.`);
  }
  return report;
}

function ensureBranchReadyForStart(root, branch) {
  const startingBranch = currentBranch(root);
  if (![DEFAULT_BRANCH, branch].includes(startingBranch)) {
    fail(`IMPLEMENTATION_START debe ejecutarse desde ${DEFAULT_BRANCH} o ${branch}; rama actual: ${startingBranch || 'DETACHED'}.`);
  }

  if (startingBranch === DEFAULT_BRANCH) {
    const mainSync = syncCounts(root, `origin/${DEFAULT_BRANCH}`, 'HEAD');
    if (mainSync.behind !== 0 || mainSync.ahead !== 0) {
      fail(`main debe estar sincronizado 0/0 antes de iniciar implementacion: ${mainSync.raw}.`);
    }

    const remoteExists = remoteBranchExists(root, branch);
    const localExists = localBranchExists(root, branch);

    if (remoteExists) {
      git(['fetch', 'origin', branch, '--quiet'], { cwd: root });
      if (localExists) {
        git(['switch', branch], { cwd: root });
        git(['branch', '--set-upstream-to', `origin/${branch}`, branch], { cwd: root });
      } else {
        git(['switch', '-c', branch, '--track', `origin/${branch}`], { cwd: root });
      }
      const sync = syncCounts(root, `origin/${branch}`, 'HEAD');
      if (sync.behind !== 0 || sync.ahead !== 0) {
        fail(`La rama existente ${branch} no esta sincronizada 0/0: ${sync.raw}.`);
      }
      return 'RESUMED_REMOTE';
    }

    if (localExists) {
      git(['switch', branch], { cwd: root });
      git(['push', '-u', 'origin', branch], { cwd: root });
      return 'RESUMED_LOCAL';
    }

    git(['switch', '-c', branch], { cwd: root });
    git(['push', '-u', 'origin', branch], { cwd: root });
    return 'CREATED';
  }

  if (!remoteBranchExists(root, branch)) {
    git(['push', '-u', 'origin', branch], { cwd: root });
    return 'RESUMED_LOCAL';
  }

  const sync = syncCounts(root, `origin/${branch}`, 'HEAD');
  if (sync.behind !== 0 || sync.ahead !== 0) {
    fail(`La rama ${branch} no esta sincronizada 0/0 antes del preflight: ${sync.raw}.`);
  }
  return 'RESUMED';
}

export function startImplementation({ instanceId, root = ensureRepositoryRoot() }) {
  const { id, instance } = resolveInstance(root, instanceId);
  assertInstanceCanStart(instance);

  const recordPath = instanceRecordRelativePath(id);
  const branch = implementationBranchName(id);

  ensureGhReady(root);
  git(['fetch', 'origin', DEFAULT_BRANCH, '--quiet'], { cwd: root });
  assertStartWorktree(worktreePaths(root), recordPath);

  const readiness = physicalReadiness(root, id);
  const branchMode = ensureBranchReadyForStart(root, branch);
  assertStartWorktree(worktreePaths(root), recordPath);

  writeInstanceStatus(root, id, 'IN_PROGRESS');
  const report = physicalPreflight(root, id);

  npm(['run', '--silent', 'docs:plan:build'], { cwd: root });
  npm(['run', '--silent', 'docs:plan:check'], { cwd: root });
  git(['diff', '--check'], { cwd: root });

  printResult({
    ESTADO: 'PASS',
    OPERACION: 'IMPLEMENTATION_START',
    INSTANCE_ID: id,
    TASK_ID: instance.task_id,
    BRANCH: branch,
    BRANCH_MODE: branchMode,
    PRE_BRANCH_READINESS: readinessBlockers(readiness, id).length === 0 ? 'PASS' : 'FAIL',
    INSTANCE_STATUS: 'IN_PROGRESS',
    PREFLIGHT: 'PASS',
    START_DOCS_PLAN_BUILD: 'PASS_ONCE',
    START_DOCS_PLAN_CHECK: 'PASS',
    DOCUMENTARY_LANE_FOR_PHYSICAL: 'ADVISORY_ONLY',
    VALIDATION_COMMANDS: Array.isArray(instance.validation_commands) ? instance.validation_commands.length : 0,
    REMOTE_BRANCH: 'PUBLISHED',
    SYNC_REMOTE: '0/0',
    DOCUMENTAL_CURRENT_TASK: report.continuity?.current ?? 'NINGUNA',
    READY_TO_IMPLEMENT: 'SI',
  });
}

function waitForPrChecksToRegister(root, prNumber) {
  for (let attempt = 1; attempt <= CHECK_REGISTRATION_ATTEMPTS; attempt += 1) {
    const probe = gh([
      'pr', 'checks', String(prNumber),
      '--json', 'name,state,bucket,link',
    ], { cwd: root, allowFailure: true });
    const classification = classifyPrChecksProbe(probe);
    if (classification.state === 'REGISTERED') return classification.count;
    if (classification.state === 'ERROR') {
      fail(`No se pudieron consultar checks de PR #${prNumber}: ${classification.detail}`, probe.status);
    }
    if (attempt < CHECK_REGISTRATION_ATTEMPTS) sleep(CHECK_REGISTRATION_INTERVAL_MS);
  }
  fail(`PR #${prNumber} no registro checks; cierre detenido antes del merge.`);
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

function waitForPrMerged(root, prNumber, headSha) {
  for (let attempt = 1; attempt <= MERGE_CONFIRM_ATTEMPTS; attempt += 1) {
    const state = parseJsonOutput(
      gh([
        'pr', 'view', String(prNumber),
        '--json', 'state,mergedAt,mergeCommit,headRefOid',
      ], { cwd: root }).stdout,
      'gh pr view merged',
    );

    if (state.headRefOid !== headSha) {
      fail(`PR #${prNumber} cambio de HEAD durante el merge.`);
    }
    if (state.state === 'MERGED') {
      const mergeCommitSha = String(state.mergeCommit?.oid ?? '').trim();
      if (!state.mergedAt || !mergeCommitSha) fail(`PR #${prNumber} figura MERGED sin evidencia completa.`);
      return { ...state, mergeCommitSha };
    }
    if (state.state === 'CLOSED') fail(`PR #${prNumber} fue cerrado sin merge.`);
    if (attempt < MERGE_CONFIRM_ATTEMPTS) sleep(MERGE_CONFIRM_INTERVAL_MS);
  }
  fail(`PR #${prNumber} no confirmo estado MERGED.`);
}

function findMergedPrForBranch(root, branch) {
  const list = gh([
    'pr', 'list',
    '--head', branch,
    '--base', DEFAULT_BRANCH,
    '--state', 'closed',
    '--json', 'number,state,mergedAt,headRefOid,baseRefName',
    '--limit', '10',
  ], { cwd: root, allowFailure: true });
  if (list.status !== 0) return null;
  const rows = parseJsonOutput(list.stdout || '[]', 'gh pr list merged');
  if (!Array.isArray(rows)) return null;
  const row = rows.find((entry) => entry?.mergedAt || String(entry?.state ?? '').toUpperCase() === 'MERGED');
  if (!row) return null;

  return parseJsonOutput(
    gh([
      'pr', 'view', String(row.number),
      '--json', 'number,state,mergedAt,mergeCommit,headRefOid,baseRefName',
    ], { cwd: root }).stdout,
    'gh pr view merged resume',
  );
}

function ensureFinishBranch(root, branch) {
  const startingBranch = currentBranch(root);
  if (startingBranch === branch) return 'CURRENT';
  if (startingBranch !== DEFAULT_BRANCH) {
    fail(`IMPLEMENTATION_FINISH debe ejecutarse desde ${DEFAULT_BRANCH} o ${branch}; rama actual: ${startingBranch || 'DETACHED'}.`);
  }
  if (worktreePaths(root).length > 0) fail('IMPLEMENTATION_FINISH no puede recuperar rama desde main con worktree sucio.');

  const localExists = localBranchExists(root, branch);
  const remoteExists = remoteBranchExists(root, branch);
  if (remoteExists) {
    git(['fetch', 'origin', branch, '--quiet'], { cwd: root });
    if (localExists) {
      git(['switch', branch], { cwd: root });
      git(['branch', '--set-upstream-to', `origin/${branch}`, branch], { cwd: root });
    } else {
      git(['switch', '-c', branch, '--track', `origin/${branch}`], { cwd: root });
    }
    return 'RESUMED_REMOTE';
  }
  if (localExists) {
    git(['switch', branch], { cwd: root });
    return 'RESUMED_LOCAL';
  }
  fail(`No existe ${branch} local ni remota para reanudar IMPLEMENTATION_FINISH.`);
}

function finalizeMergedImplementation({ root, id, instance, branch, mergedPr }) {
  const headSha = String(mergedPr?.headRefOid ?? '').trim();
  const mergeCommitSha = String(mergedPr?.mergeCommit?.oid ?? '').trim();
  const prNumber = Number(mergedPr?.number);
  if (!headSha || !mergeCommitSha || !Number.isFinite(prNumber)) {
    fail('PR merged previo no conserva identidad suficiente para reanudar el cierre.');
  }

  if (currentBranch(root) !== DEFAULT_BRANCH) {
    if (worktreePaths(root).length > 0) fail('No se puede finalizar merge previo con worktree sucio.');
    git(['switch', DEFAULT_BRANCH], { cwd: root });
  }
  git(['pull', '--ff-only', 'origin', DEFAULT_BRANCH], { cwd: root });
  syncLocalDerivedArtifacts({ root, quiet: true });

  if (worktreePaths(root).length > 0) fail('main no quedo limpio al reanudar un merge ya completado.');
  const mainSync = syncCounts(root, `origin/${DEFAULT_BRANCH}`, 'HEAD');
  if (mainSync.behind !== 0 || mainSync.ahead !== 0) fail(`main no quedo sincronizado 0/0: ${mainSync.raw}.`);

  if (git(['merge-base', '--is-ancestor', headSha, 'HEAD'], { cwd: root, allowFailure: true }).status !== 0) {
    fail(`El HEAD previamente mergeado ${headSha} no esta contenido en main.`);
  }
  if (git(['merge-base', '--is-ancestor', mergeCommitSha, 'HEAD'], { cwd: root, allowFailure: true }).status !== 0) {
    fail(`El merge commit previo ${mergeCommitSha} no esta contenido en main.`);
  }

  const cleanup = cleanupBranch(root, branch);
  const finalSync = syncCounts(root, `origin/${DEFAULT_BRANCH}`, 'HEAD');
  if (finalSync.behind !== 0 || finalSync.ahead !== 0) fail(`main perdio sincronizacion al final: ${finalSync.raw}.`);

  printResult({
    ESTADO: 'PASS',
    OPERACION: 'IMPLEMENTATION_FINISH',
    INSTANCE_ID: id,
    TASK_ID: instance.task_id,
    BRANCH: branch,
    BRANCH_MODE: 'RESUME_POST_MERGE',
    FINISH_MODE: 'RESUME_POST_MERGE',
    FILES: 'ALREADY_MERGED',
    PHYSICAL_VALIDATIONS: 'REUSED_FROM_VERIFIED_EVIDENCE',
    HEAD_VALIDATED: headSha,
    PR: prNumber,
    CHECKS_REGISTERED: 'ALREADY_MERGED',
    CHECKS_COMPLETED: 'ALREADY_MERGED',
    REQUIRED_CHECKS: 'PASS',
    MERGE: 'PASS',
    MERGE_COMMIT: mergeCommitSha,
    MAIN_HEAD: currentHead(root),
    SYNC_MAIN: '0/0',
    WORKTREE: 'CLEAN',
    LOCAL_BRANCH: cleanup.local,
    REMOTE_BRANCH: cleanup.remote,
    READY_TO_RESTART_WATCHER: 'SI',
  });
}

export function buildImplementationPrBody(instanceId, changedPaths) {
  const id = normalizeInstanceId(instanceId);
  const paths = [...new Set((changedPaths ?? []).map((entry) => String(entry).replaceAll('\\', '/')))].sort();
  return [
    'VENTO-TREQ-AFFECTED: NONE',
    `VENTO-TREQ-ZERO-REASON: ${id} cierra una instancia fisica ya gobernada por requisitos TREQ y este lifecycle bloquea cambios directos al registro 04A.`,
    '',
    '## Instancia fisica',
    '',
    id,
    '',
    '## Archivos',
    '',
    ...paths.map((entry) => `- ${entry}`),
    '',
  ].join('\n');
}

function createOrUpdatePr(root, instanceId, branch, changedPaths) {
  const list = gh([
    'pr', 'list',
    '--head', branch,
    '--base', DEFAULT_BRANCH,
    '--state', 'open',
    '--json', 'number,url,headRefOid',
    '--limit', '1',
  ], { cwd: root });
  const existing = parseJsonOutput(list.stdout || '[]', 'gh pr list');

  const tempDir = fs.mkdtempSync(path.join(os.tmpdir(), 'vento-implementation-pr-'));
  const bodyPath = path.join(tempDir, 'body.md');
  fs.writeFileSync(bodyPath, buildImplementationPrBody(instanceId, changedPaths), 'utf8');

  try {
    if (Array.isArray(existing) && existing.length > 0) {
      const pr = existing[0];
      gh([
        'pr', 'edit', String(pr.number),
        '--title', `${instanceId}: cierre de implementacion`,
        '--body-file', bodyPath,
      ], { cwd: root });
      return Number(pr.number);
    }

    gh([
      'pr', 'create',
      '--base', DEFAULT_BRANCH,
      '--head', branch,
      '--title', `${instanceId}: cierre de implementacion`,
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
    fail(`No se pudo limpiar ${branch}: local=${localRemaining}, remote=${remoteRemaining}.`);
  }
  return { local: 'DELETED', remote: 'DELETED' };
}

export function preverifyImplementation({ instanceId, root = ensureRepositoryRoot() }) {
  const { id, instance } = resolveInstance(root, instanceId);
  if (instance.status !== 'IMPLEMENTED' || instance.authorization?.decision !== 'APPROVED') {
    fail(`${id}: PREVERIFY exige IMPLEMENTED y autorización APPROVED; no modifica el estado.`);
  }
  if (currentBranch(root) !== implementationBranchName(id)) fail(`${id}: rama física incorrecta para PREVERIFY.`);
  git(['fetch', 'origin', DEFAULT_BRANCH, '--quiet'], { cwd: root });
  const base = git(['merge-base', `origin/${DEFAULT_BRANCH}`, 'HEAD'], { cwd: root }).stdout.trim();
  const paths = git(['diff', '--name-only', base], { cwd: root }).stdout.split(/\r?\n/u).filter(Boolean);
  assertImplementationPaths([...new Set([...paths, ...worktreePaths(root)])], instance, { root, baseRef: `origin/${DEFAULT_BRANCH}` });
  npm(['run', '--silent', 'quality:lint:ratchet', '--', '--base', `origin/${DEFAULT_BRANCH}`], { cwd: root });
  printResult({
    ESTADO: 'PASS', OPERACION: 'IMPLEMENTATION_PREVERIFY', INSTANCE_ID: id,
    QUALITY_BASE: base, LINT_SCOPE: 'FULL_PR_AND_WORKTREE',
    STATUS: 'IMPLEMENTED', READY_TO_CONSOLIDATE_VERIFIED_EVIDENCE: 'SI',
  });
}

export async function finishImplementation({ instanceId, root = ensureRepositoryRoot() }) {
  const { id, instance } = resolveInstance(root, instanceId);
  assertInstanceCanFinish(instance);

  if (
    instance.task_id === 'SHELL-CI-020'
    && /^SHELL-CI-020::GAP-PKG-\d{3}$/u.test(id)
  ) {
    const readiness = scanPackageReadiness({
      root,
      check: true,
      trigger: 'implementation-finish-prerequisites',
      supplied: { skipDerivedReports: true },
    });
    assertCi020PhysicalPrerequisitesForFinish({ instance, readiness, root });
  }

  const branch = implementationBranchName(id);

  ensureGhReady(root);
  git(['fetch', 'origin', DEFAULT_BRANCH, '--quiet'], { cwd: root });

  const mergedPr = findMergedPrForBranch(root, branch);
  if (mergedPr) {
    finalizeMergedImplementation({ root, id, instance, branch, mergedPr });
    return;
  }

  const branchMode = ensureFinishBranch(root, branch);

  npm(['run', '--silent', 'docs:plan:build'], { cwd: root });
  npm(['run', '--silent', 'docs:plan:check'], { cwd: root });

  await Promise.all([
    npmAsync(['run', '--silent', 'docs:plan:test'], { cwd: root }),
    npmAsync(['run', '--silent', 'docs:treq:check'], { cwd: root }),
    npmAsync(['run', '--silent', 'docs:treq:test'], { cwd: root }),
    npmAsync(['run', '--silent', 'quality:lint:ratchet', '--', '--base', `origin/${DEFAULT_BRANCH}`], { cwd: root }),
  ]);

  const dirty = worktreePaths(root);
  const preCommitBranchCommits = Number(
    git(['rev-list', '--count', `origin/${DEFAULT_BRANCH}..HEAD`], { cwd: root }).stdout.trim(),
  );
  const finishMode = resolveImplementationFinishMode({
    dirtyPaths: dirty,
    branchCommits: preCommitBranchCommits,
  });

  if (finishMode === 'CREATE_COMMIT') {
    assertImplementationPaths(dirty, instance, { root, baseRef: `origin/${DEFAULT_BRANCH}` });

    git(['diff', '--check'], { cwd: root });
    git(['add', '--', ...dirty], { cwd: root });
    npm(['run', '--silent', 'docs:commit-scope:check', '--', '--staged', '--instance-id', id], { cwd: root });
    git(['diff', '--cached', '--check'], { cwd: root });

    const staged = git(['diff', '--cached', '--name-only', '--diff-filter=ACMRD'], { cwd: root })
      .stdout.split(/\r?\n/u).map((entry) => entry.trim()).filter(Boolean);
    assertImplementationPaths(staged, instance, { root, baseRef: `origin/${DEFAULT_BRANCH}` });
    if (staged.length === 0) fail('No hay archivos staged para cerrar la implementacion.');

    git(['commit', '-m', `implementation(${id}): verify`], { cwd: root });
  }

  const branchCommits = Number(
    git(['rev-list', '--count', `origin/${DEFAULT_BRANCH}..HEAD`], { cwd: root }).stdout.trim(),
  );
  if (!Number.isFinite(branchCommits) || branchCommits <= 0) {
    fail(`${branch} no contiene commits nuevos respecto de origin/${DEFAULT_BRANCH}.`);
  }

  const changedPaths = git(['diff', '--name-only', `origin/${DEFAULT_BRANCH}...HEAD`], { cwd: root })
    .stdout.split(/\r?\n/u).map((entry) => entry.trim()).filter(Boolean);
  assertImplementationPaths(changedPaths, instance, { root, baseRef: `origin/${DEFAULT_BRANCH}` });

  if (remoteBranchExists(root, branch)) {
    git(['fetch', 'origin', branch, '--quiet'], { cwd: root });
    const remoteSync = syncCounts(root, `origin/${branch}`, 'HEAD');
    if (remoteSync.behind !== 0) {
      fail(`origin/${branch} contiene commits que el HEAD local no tiene; cierre detenido sin force-push: ${remoteSync.raw}.`);
    }
  }

  git(['push', '-u', 'origin', branch], { cwd: root });
  const branchSync = syncCounts(root, `origin/${branch}`, 'HEAD');
  if (branchSync.behind !== 0 || branchSync.ahead !== 0) {
    fail(`Push incompleto de ${branch}: ${branchSync.raw}.`);
  }

  const headSha = currentHead(root);
  const prNumber = createOrUpdatePr(root, id, branch, changedPaths);

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
  syncLocalDerivedArtifacts({ root, quiet: true });

  if (worktreePaths(root).length > 0) fail('main no quedo limpio despues del merge.');
  const mainSync = syncCounts(root, `origin/${DEFAULT_BRANCH}`, 'HEAD');
  if (mainSync.behind !== 0 || mainSync.ahead !== 0) {
    fail(`main no quedo sincronizado 0/0: ${mainSync.raw}.`);
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
  if (worktreePaths(root).length > 0) fail('El worktree final no quedo limpio.');

  const finalSync = syncCounts(root, `origin/${DEFAULT_BRANCH}`, 'HEAD');
  if (finalSync.behind !== 0 || finalSync.ahead !== 0) {
    fail(`main perdio sincronizacion al final: ${finalSync.raw}.`);
  }

  printResult({
    ESTADO: 'PASS',
    OPERACION: 'IMPLEMENTATION_FINISH',
    INSTANCE_ID: id,
    TASK_ID: instance.task_id,
    BRANCH: branch,
    BRANCH_MODE: branchMode,
    FINISH_MODE: finishMode,
    FILES: changedPaths.length,
    PHYSICAL_VALIDATIONS: 'REUSED_FROM_VERIFIED_EVIDENCE',
    DOCS_PLAN_BUILD: 'PASS_ONCE',
    DOCS_PLAN_CHECK: 'PASS_LOCAL_BEFORE_COMMIT',
    DOCS_PLAN_TEST: 'PASS_LOCAL_BEFORE_COMMIT',
    DOCS_TREQ_CHECK: 'PASS_LOCAL_BEFORE_COMMIT',
    DOCS_TREQ_TEST: 'PASS_LOCAL_BEFORE_COMMIT',
    LINT_RATCHET: 'PASS_LOCAL_BEFORE_COMMIT',
    LOCAL_DERIVED_SYNC: 'PASS_AFTER_MERGE',
    HEAD_VALIDATED: headSha,
    PR: prNumber,
    CHECKS_REGISTERED: registeredCheckCount,
    CHECKS_COMPLETED: completedCheckCount,
    REQUIRED_CHECKS: 'PASS',
    MERGE: 'PASS',
    MERGE_COMMIT: merged.mergeCommitSha,
    MAIN_HEAD: currentHead(root),
    SYNC_MAIN: '0/0',
    WORKTREE: 'CLEAN',
    LOCAL_BRANCH: cleanup.local,
    REMOTE_BRANCH: cleanup.remote,
    READY_TO_RESTART_WATCHER: 'SI',
  });
}

function parseArgs(argv) {
  const args = { mode: null, instanceId: null, help: false };
  if (argv.length > 0 && !argv[0].startsWith('--')) {
    args.mode = argv[0];
    argv = argv.slice(1);
  }
  for (let index = 0; index < argv.length; index += 1) {
    const token = argv[index];
    if (token === '--help' || token === '-h') args.help = true;
    else if (token === '--instance-id') {
      const value = argv[index + 1];
      if (!value || value.startsWith('--')) fail('Falta valor de --instance-id.');
      args.instanceId = value;
      index += 1;
    } else fail(`Argumento desconocido: ${token}.`);
  }
  return args;
}

function usage() {
  console.log('Uso:');
  console.log('  npm run docs:implementation:start -- --instance-id SHELL-CON-001::GLOBAL');
  console.log('  npm run docs:implementation:finish -- --instance-id SHELL-CON-001::GLOBAL');
  console.log('  npm run docs:implementation:preverify -- --instance-id SHELL-CON-001::GLOBAL');
  console.log('');
  console.log('START exige registro AUTHORIZED, trata continuidad/formato documentales historicos como advisory, crea o recupera implementation/<task-id>/<instance-key>, cambia a IN_PROGRESS, ejecuta el preflight fisico estricto una sola vez y reconcilia derivados con docs:plan:build + docs:plan:check antes de permitir codigo.');
  console.log('FINISH exige VERIFIED, valida alcance exacto desde authorized_changes, admite solo proyecciones derivadas controladas, reanuda post-commit/post-PR/post-merge sin force-push, espera CI, mergea, sincroniza main y limpia la rama.');
}

async function main() {
  const args = parseArgs(process.argv.slice(2));
  if (args.help) {
    usage();
    return;
  }
  if (!['start', 'preverify', 'finish'].includes(args.mode)) fail('Modo requerido: start, preverify o finish.');
  if (!args.instanceId) fail('Falta --instance-id.');

  if (args.mode === 'start') startImplementation({ instanceId: args.instanceId });
  else if (args.mode === 'preverify') preverifyImplementation({ instanceId: args.instanceId });
  else await finishImplementation({ instanceId: args.instanceId });
}

const isCli = process.argv[1]
  && path.resolve(process.argv[1]) === path.resolve(fileURLToPath(import.meta.url));

if (isCli) {
  try {
    await main();
  } catch (error) {
    const message = error instanceof Error ? error.message : String(error);
    const code = Number.isInteger(error?.exitCode) ? error.exitCode : 1;
    const mode = process.argv[2];
    const instanceArgIndex = process.argv.indexOf('--instance-id');
    const instanceId = instanceArgIndex >= 0 ? process.argv[instanceArgIndex + 1] : 'DESCONOCIDA';
    printResult({
      ESTADO: 'FAIL',
      OPERACION: `IMPLEMENTATION_${String(mode).toUpperCase()}`,
      INSTANCE_ID: instanceId || 'DESCONOCIDA',
      ERROR: message.replace(/\s+/gu, ' ').trim(),
      WORKTREE_PRESERVED: 'SI',
      TERMINAL_REMAINS_OPEN: 'SI',
    });
    process.exitCode = code;
  }
}
