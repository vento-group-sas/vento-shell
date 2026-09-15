import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { spawnSync } from 'node:child_process';

import { scanPackageReadiness } from './package-readiness-scanner.mjs';
import {
  assertNoFuturePackageArtifacts,
  assertPackageMutationAllowed,
  readPackageExecutionPolicy,
} from './package-execution-control.mjs';
import { loadValidatedCorrectionControl } from './correction-control.mjs';
import {
  instanceRecordRelativePath,
  loadImplementationControl,
  pendingInstanceRecord,
} from './implementation-control.mjs';
import {
  parsePorcelainPaths,
  resolveNpmInvocation,
} from './task-branch-lifecycle.mjs';
import {
  assertPackageGateRecordsValid,
  assessPackageGateRecord,
  packageGateRecordRelativePath,
  readPackageGatePolicy,
} from './package-gate-control.mjs';

function fail(message) { throw new Error(message); }
function abs(root, relativePath) { return path.join(root, ...relativePath.split('/')); }
function stableJson(value) { return `${JSON.stringify(value, null, 2)}\n`; }

const DEFAULT_BRANCH = 'main';
const PACKAGE_GATE_BRANCH_PREFIX = 'infra/package-gate-';

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
  });
  if (result.error) {
    if (allowFailure) return { status: 1, stdout: '', stderr: result.error.message };
    fail(`${command} no disponible: ${result.error.message}`);
  }
  const status = Number.isInteger(result.status) ? result.status : 1;
  const stdout = inherit ? '' : String(result.stdout ?? '').trimEnd();
  const stderr = inherit ? '' : String(result.stderr ?? '').trimEnd();
  if (status !== 0 && !allowFailure) {
    fail(stderr || stdout || `${command} ${args.join(' ')} fallo.`);
  }
  return { status, stdout, stderr };
}

function git(args, options = {}) {
  return run('git', args, options);
}

function npm(args, options = {}) {
  const invocation = resolveNpmInvocation();
  return run(invocation.command, [...invocation.prefixArgs, ...args], options);
}

function currentBranch(root) {
  return git(['branch', '--show-current'], { cwd: root }).stdout.trim();
}

function worktreePaths(root) {
  return parsePorcelainPaths(
    git(['status', '--porcelain=v1', '--untracked-files=all'], { cwd: root }).stdout,
  );
}

function localBranchExists(root, branch) {
  return git(['show-ref', '--verify', '--quiet', `refs/heads/${branch}`], {
    cwd: root,
    allowFailure: true,
  }).status === 0;
}

function remoteBranchExists(root, branch) {
  return git(['ls-remote', '--exit-code', '--heads', 'origin', `refs/heads/${branch}`], {
    cwd: root,
    allowFailure: true,
  }).status === 0;
}

function syncCounts(root, left, right) {
  const raw = git(['rev-list', '--left-right', '--count', `${left}...${right}`], {
    cwd: root,
  }).stdout.trim();
  const [behind, ahead] = raw.split(/\s+/u).map(Number);
  return { behind: Number(behind), ahead: Number(ahead), raw };
}

function normalizePackageId(value) {
  const packageId = String(value ?? '').trim().toUpperCase();
  if (!/^GAP-PKG-\d{3}$/u.test(packageId)) {
    fail(`package_id invalido: ${value ?? 'EMPTY'}.`);
  }
  return packageId;
}

export function packageGateBranchName(packageId) {
  const id = normalizePackageId(packageId);
  return `${PACKAGE_GATE_BRANCH_PREFIX}${id.toLowerCase()}`;
}

function ensureMainSynchronized(root) {
  if (currentBranch(root) !== DEFAULT_BRANCH) {
    fail(`PACKAGE_START debe comenzar desde ${DEFAULT_BRANCH}.`);
  }
  git(['fetch', 'origin', DEFAULT_BRANCH, '--quiet'], { cwd: root });
  git(['pull', '--ff-only', 'origin', DEFAULT_BRANCH], { cwd: root });
  const sync = syncCounts(root, `origin/${DEFAULT_BRANCH}`, 'HEAD');
  if (sync.behind !== 0 || sync.ahead !== 0) {
    fail(`main no quedo sincronizado 0/0: ${sync.raw}.`);
  }
}

function openOrderCorrections(root) {
  const executionPolicy = readPackageExecutionPolicy(root);
  const control = loadValidatedCorrectionControl({ root });
  return control.records
    .map(({ record }) => record)
    .filter((record) => (
      record.task_id === executionPolicy.source_task
      && record.status !== 'VERIFIED'
    ))
    .map((record) => record.correction_id)
    .sort((left, right) => left.localeCompare(right, 'en'));
}

function scanPackageContext(root, packageId) {
  const id = normalizePackageId(packageId);
  const result = scanPackageReadiness({
    root,
    check: false,
    trigger: 'package-gate-lifecycle',
    supplied: { skipDerivedReports: true },
  });
  const pkg = result.registry.packages.find(({ package_id: candidate }) => candidate === id);
  if (!pkg || pkg.source_kind !== 'CANONICAL_GAP_PACKAGE') {
    fail(`Package canonico no encontrado: ${id}.`);
  }
  return { id, pkg, result };
}

function synchronizePackageReadiness(root, trigger) {
  return scanPackageReadiness({
    root,
    write: true,
    trigger,
    supplied: { skipDerivedReports: true },
  });
}

function assertPackageMutationScope(root, packageId, operation) {
  const context = scanPackageContext(root, packageId);
  assertPackageMutationAllowed({
    execution: context.result.registry.package_execution,
    packageId: context.id,
    operation,
    openOrderCorrections: openOrderCorrections(root),
  });
  return context;
}

function assertPackageBranch(root, packageId, operation) {
  const expected = packageGateBranchName(packageId);
  const actual = currentBranch(root);
  if (actual !== expected) {
    fail(
      `${operation} debe ejecutarse desde ${expected}; rama actual: `
      + `${actual || 'DETACHED'}. Use docs:package:start.`,
    );
  }
  return expected;
}

function checkoutPackageBranch(root, branch) {
  const remote = remoteBranchExists(root, branch);
  const local = localBranchExists(root, branch);

  if (remote) {
    git(['fetch', 'origin', branch, '--quiet'], { cwd: root });
    if (local) {
      git(['switch', branch], { cwd: root });
      git(['branch', '--set-upstream-to', `origin/${branch}`, branch], { cwd: root });
      git(['pull', '--ff-only', 'origin', branch], { cwd: root });
    } else {
      git(['switch', '-c', branch, '--track', `origin/${branch}`], { cwd: root });
    }
    return 'RESUMED_REMOTE';
  }

  if (local) {
    git(['switch', branch], { cwd: root });
    git(['push', '-u', 'origin', branch], { cwd: root });
    return 'RESUMED_LOCAL';
  }

  git(['switch', '-c', branch], { cwd: root });
  git(['push', '-u', 'origin', branch], { cwd: root });
  return 'CREATED';
}

function reconcileMainIntoPackageBranch(root) {
  git(['fetch', 'origin', DEFAULT_BRANCH, '--quiet'], { cwd: root });
  const ancestor = git(
    ['merge-base', '--is-ancestor', `origin/${DEFAULT_BRANCH}`, 'HEAD'],
    { cwd: root, allowFailure: true },
  );
  if (ancestor.status === 0) return false;

  const merged = git(['merge', '--no-edit', `origin/${DEFAULT_BRANCH}`], {
    cwd: root,
    allowFailure: true,
  });
  if (merged.status !== 0) {
    git(['merge', '--abort'], { cwd: root, allowFailure: true });
    fail(
      'No se pudo reconciliar origin/main automaticamente. '
      + (merged.stderr || merged.stdout || 'MERGE_FAILED'),
    );
  }
  return true;
}

function assertLinearArtifacts(root, scan) {
  const implementation = loadImplementationControl({ root });
  assertNoFuturePackageArtifacts({
    execution: scan.registry.package_execution,
    packageGateIds: [...scan.packageGateRecords.records.keys()],
    implementationInstanceIds: implementation.instances.map(({ instance_id: instanceId }) => instanceId),
  });
}

function materializePendingPhysicalHandoff(root, packageId, scan) {
  const id = normalizePackageId(packageId);
  const current = scan.registry.package_execution?.current ?? null;
  if (current?.package_id !== id) {
    fail(`No se puede materializar handoff para ${id}; package actual: ${current?.package_id ?? 'NONE'}.`);
  }
  if (current.next_action.type !== 'MATERIALIZE_PHYSICAL_HANDOFF') return null;

  const expectedInstanceId = `SHELL-CI-020::${id}`;
  if (current.next_action.target !== expectedInstanceId) {
    fail(
      `Handoff inconsistente: esperado ${expectedInstanceId}; `
      + `recibido ${current.next_action.target}.`,
    );
  }

  const relativePath = instanceRecordRelativePath(expectedInstanceId);
  const filePath = abs(root, relativePath);

  if (fs.existsSync(filePath)) {
    const existing = JSON.parse(fs.readFileSync(filePath, 'utf8'));
    if (
      existing.instance_id !== expectedInstanceId
      || existing.task_id !== 'SHELL-CI-020'
    ) {
      fail(`${relativePath} existe con identidad incompatible.`);
    }
    return { relativePath, record: existing, created: false };
  }

  const record = pendingInstanceRecord({
    instanceId: expectedInstanceId,
    taskId: 'SHELL-CI-020',
  });
  fs.mkdirSync(path.dirname(filePath), { recursive: true });
  fs.writeFileSync(filePath, stableJson(record), 'utf8');
  return { relativePath, record, created: true };
}

function parseArgs(argv) {
  const command = argv[0];
  const values = {};
  for (let i = 1; i < argv.length; i += 1) {
    const token = argv[i];
    if (!token.startsWith('--')) fail(`Argumento desconocido: ${token}.`);
    const key = token.slice(2).replaceAll('-', '_');
    const value = argv[i + 1];
    if (!value || value.startsWith('--')) fail(`Falta valor de ${token}.`);
    values[key] = value;
    i += 1;
  }
  if (!['start', 'prepare', 'status', 'check', 'approve', 'finish', 'handoff'].includes(command)) {
    fail('Use start, prepare, status, check, approve, finish o handoff.');
  }
  return { command, ...values };
}

function packageFromScan(root, packageId) {
  return scanPackageContext(root, packageId).pkg;
}

function newRecord(pkg, now) {
  return {
    schema_version: 1,
    package_id: pkg.package_id,
    status: pkg.task_prerequisites.remaining > 0 ? 'WAITING_DOCUMENTATION' : 'MATURATION_DRAFT',
    created_at: now,
    updated_at: now,
    canonical_snapshot: {
      repository_owner: pkg.repository_owner,
      runtime_profile: pkg.runtime_profile,
      dominant_task_id: pkg.dominant_task_id,
      task_ids: pkg.task_prerequisites.tasks.map(({ task_id: taskId }) => taskId),
      missing_task_ids: pkg.task_prerequisites.missing_task_ids,
    },
    physical_identity: { targets: [] },
    implementation_units: [],
    evidence_plan: { tests: [], observability: [], acceptance_criteria: [], rollback_steps: [] },
    authorization: {
      decision: 'PENDING', approved_by: null, approved_at: null, approval_ref: null, approval_statement: null,
    },
  };
}

export function preparePackageGate({ root = process.cwd(), packageId, now = new Date().toISOString() }) {
  const id = normalizePackageId(packageId);
  assertPackageBranch(root, id, 'PACKAGE_PREPARE');
  const { pkg } = assertPackageMutationScope(root, id, 'PACKAGE_PREPARE');
  const policy = readPackageGatePolicy(root);
  const relativePath = packageGateRecordRelativePath(id, policy);
  const filePath = abs(root, relativePath);
  let record = fs.existsSync(filePath) ? JSON.parse(fs.readFileSync(filePath, 'utf8')) : newRecord(pkg, now);
  const assessment = assessPackageGateRecord(record, { taskPrerequisites: pkg.task_prerequisites, policy, relativePath });
  record = {
    ...record,
    status: assessment.status,
    updated_at: now,
    canonical_snapshot: {
      repository_owner: pkg.repository_owner,
      runtime_profile: pkg.runtime_profile,
      dominant_task_id: pkg.dominant_task_id,
      task_ids: pkg.task_prerequisites.tasks.map(({ task_id: taskId }) => taskId),
      missing_task_ids: pkg.task_prerequisites.missing_task_ids,
    },
  };
  fs.mkdirSync(path.dirname(filePath), { recursive: true });
  fs.writeFileSync(filePath, stableJson(record), 'utf8');
  return { relativePath, record, assessment: assessPackageGateRecord(record, { taskPrerequisites: pkg.task_prerequisites, policy, relativePath }) };
}

export function inspectPackageGate({ root = process.cwd(), packageId }) {
  const id = normalizePackageId(packageId);
  const policy = readPackageGatePolicy(root);
  const pkg = packageFromScan(root, id);
  const relativePath = packageGateRecordRelativePath(id, policy);
  const filePath = abs(root, relativePath);
  if (!fs.existsSync(filePath)) fail(`${relativePath} no existe; ejecute docs:package:start.`);
  const record = JSON.parse(fs.readFileSync(filePath, 'utf8'));
  return { relativePath, record, assessment: assessPackageGateRecord(record, { taskPrerequisites: pkg.task_prerequisites, policy, relativePath }) };
}

export function approvePackageGate({ root = process.cwd(), packageId, approvedBy, approvalRef, statement, now = new Date().toISOString() }) {
  const id = normalizePackageId(packageId);
  if (!approvedBy || !approvalRef || !statement?.includes('APROBADO')) fail('approve exige --approved-by, --approval-ref y --statement con APROBADO explícito.');
  assertPackageBranch(root, id, 'PACKAGE_APPROVE');
  assertPackageMutationScope(root, id, 'PACKAGE_APPROVE');
  const current = inspectPackageGate({ root, packageId: id });
  const policy = readPackageGatePolicy(root);
  if (!current.assessment.tasks_complete) fail('Existen tareas prerrequisito pendientes; aprobación bloqueada.');
  const preApproval = assessPackageGateRecord({ ...current.record, authorization: { decision: 'PENDING' } }, { policy });
  if (!preApproval.dossier_complete) fail('El expediente no está completo; aprobación bloqueada.');
  const record = {
    ...current.record,
    status: 'APPROVED_FOR_IMPLEMENTATION',
    updated_at: now,
    authorization: {
      decision: 'APROBADO', approved_by: approvedBy, approved_at: now, approval_ref: approvalRef, approval_statement: statement,
    },
  };
  fs.writeFileSync(abs(root, current.relativePath), stableJson(record), 'utf8');
  synchronizePackageReadiness(root, 'package-gate-approve');
  return { ...current, record, assessment: assessPackageGateRecord(record, { policy, relativePath: current.relativePath }) };
}


export function startPackageGate({
  root = process.cwd(),
  packageId,
  now = new Date().toISOString(),
} = {}) {
  const id = normalizePackageId(packageId);
  if (currentBranch(root) !== DEFAULT_BRANCH) {
    fail(`PACKAGE_START debe comenzar desde ${DEFAULT_BRANCH}.`);
  }
  if (worktreePaths(root).length > 0) {
    fail('PACKAGE_START exige worktree limpio.');
  }

  ensureMainSynchronized(root);
  assertPackageMutationScope(root, id, 'PACKAGE_START');

  const branch = packageGateBranchName(id);
  const branchMode = checkoutPackageBranch(root, branch);
  const reconciled = reconcileMainIntoPackageBranch(root);
  if (reconciled) git(['push', 'origin', branch], { cwd: root });

  assertPackageMutationScope(root, id, 'PACKAGE_START_POST_SYNC');
  const prepared = preparePackageGate({ root, packageId: id, now });

  return {
    ...prepared,
    branch,
    branchMode,
  };
}

export function finishPackageGate({
  root = process.cwd(),
  packageId,
} = {}) {
  const id = normalizePackageId(packageId);
  const branch = assertPackageBranch(root, id, 'PACKAGE_FINISH');

  reconcileMainIntoPackageBranch(root);
  assertPackageMutationScope(root, id, 'PACKAGE_FINISH');
  const gate = inspectPackageGate({ root, packageId: id });

  if (!gate.assessment.valid) {
    fail(`PACKAGE_FINISH: expediente invalido: ${gate.assessment.errors.join('; ')}`);
  }
  if (gate.assessment.status !== 'APPROVED_FOR_IMPLEMENTATION') {
    fail(
      `PACKAGE_FINISH exige APPROVED_FOR_IMPLEMENTATION; estado actual: `
      + `${gate.assessment.status}.`,
    );
  }

  const synchronized = synchronizePackageReadiness(root, 'package-finish-precheck');
  const execution = synchronized.registry.package_execution ?? null;
  const admission = (execution?.physical_admission ?? [])
    .find(({ package_id: packageId }) => packageId === id) ?? null;
  const primary = execution?.current ?? null;
  const handoff = (
    admission?.status === 'ADMISSIBLE'
    && primary?.package_id === id
    && primary?.next_action?.type === 'MATERIALIZE_PHYSICAL_HANDOFF'
  )
    ? materializePendingPhysicalHandoff(root, id, synchronized)
    : null;

  npm(['run', 'docs:package:gate:check'], { cwd: root, inherit: true });
  npm(['run', 'docs:package:execution:check'], { cwd: root, inherit: true });
  npm(['run', 'docs:plan:build'], { cwd: root, inherit: true });
  npm(['run', 'docs:plan:check'], { cwd: root, inherit: true });
  npm(['run', 'docs:plan:test'], { cwd: root, inherit: true });
  npm(['run', 'docs:treq:check'], { cwd: root, inherit: true });
  npm(['run', 'docs:treq:test'], { cwd: root, inherit: true });

  const changeId = `package-gate-${id.toLowerCase()}`;
  npm([
    'run',
    'docs:infra:publish',
    '--',
    '--change-id',
    changeId,
  ], { cwd: root, inherit: true });

  console.log('');
  console.log('PACKAGE_FINISH: PASS');
  console.log(`PACKAGE: ${id}`);
  console.log(`BRANCH: ${branch}`);
  console.log(`HANDOFF_CREATED: ${handoff?.created === true ? 'YES' : 'NO'}`);
  console.log(`HANDOFF_DEFERRED_BY_FRONTIER: ${handoff ? 'NO' : 'YES'}`);
  console.log('NEXT: npm run docs:package:execution:status');

  npm(['run', 'docs:package:execution:status'], { cwd: root, inherit: true });
  return true;
}

export function handoffPackageImplementation({
  root = process.cwd(),
  packageId,
} = {}) {
  const id = normalizePackageId(packageId);

  if (currentBranch(root) !== DEFAULT_BRANCH) {
    fail('PACKAGE_HANDOFF debe comenzar desde main.');
  }
  if (worktreePaths(root).length > 0) {
    fail('PACKAGE_HANDOFF exige worktree limpio.');
  }

  ensureMainSynchronized(root);
  assertPackageMutationScope(root, id, 'PACKAGE_HANDOFF');
  const synchronized = synchronizePackageReadiness(root, 'package-handoff-precheck');
  const action = synchronized.registry.package_execution?.current?.next_action ?? null;

  if (action?.type === 'AUTHORIZE_PHYSICAL_IMPLEMENTATION') {
    console.log(`PACKAGE_HANDOFF: ALREADY_MATERIALIZED ${action.target}`);
    npm(['run', 'docs:implementation:status'], { cwd: root, inherit: true });
    return true;
  }

  if (action?.type !== 'MATERIALIZE_PHYSICAL_HANDOFF') {
    fail(
      `PACKAGE_HANDOFF no aplica todavía; acción actual: `
      + `${action?.type ?? 'NONE'} -> ${action?.target ?? 'NONE'}.`,
    );
  }

  const handoff = materializePendingPhysicalHandoff(root, id, synchronized);
  const refreshed = scanPackageReadiness({
    root,
    check: false,
    trigger: 'package-handoff-validation',
    supplied: { skipDerivedReports: true },
  });
  assertLinearArtifacts(root, refreshed);

  npm(['run', 'docs:package:gate:check'], { cwd: root, inherit: true });
  npm(['run', 'docs:package:execution:check'], { cwd: root, inherit: true });
  npm(['run', 'docs:plan:build'], { cwd: root, inherit: true });
  npm(['run', 'docs:plan:check'], { cwd: root, inherit: true });
  npm(['run', 'docs:plan:test'], { cwd: root, inherit: true });

  const changeId = `package-handoff-${id.toLowerCase()}`;
  npm([
    'run',
    'docs:infra:publish',
    '--',
    '--change-id',
    changeId,
  ], { cwd: root, inherit: true });

  console.log('');
  console.log('PACKAGE_HANDOFF: PASS');
  console.log(`PACKAGE: ${id}`);
  console.log(`INSTANCE: ${handoff.record.instance_id}`);
  console.log('STATUS: PENDING_AUTHORIZATION');
  console.log('NEXT: npm run docs:implementation:status');

  npm(['run', 'docs:implementation:status'], { cwd: root, inherit: true });
  return true;
}

function print(result) {
  console.log(`PACKAGE: ${result.record.package_id}`);
  console.log(`FILE: ${result.relativePath}`);
  console.log(`STATUS: ${result.assessment.status}`);
  console.log(`TASKS_COMPLETE: ${result.assessment.tasks_complete ? 'YES' : 'NO'}`);
  console.log(`DOSSIER_COMPLETE: ${result.assessment.dossier_complete ? 'YES' : 'NO'}`);
  console.log(`APPROVAL_COMPLETE: ${result.assessment.approval_complete ? 'YES' : 'NO'}`);
  console.log(`VALID: ${result.assessment.valid ? 'YES' : 'NO'}`);
}

function main() {
  const args = parseArgs(process.argv.slice(2));
  if (args.command === 'check' && !args.package_id) {
    const root = process.cwd();
    const scan = scanPackageReadiness({
      root,
      check: false,
      trigger: 'package-gate-check',
      supplied: { skipDerivedReports: true },
    });
    const result = assertPackageGateRecordsValid(scan.packageGateRecords);
    assertLinearArtifacts(root, scan);
    console.log(`PACKAGE_GATE_CHECK: PASS (${result.records.size} expediente(s)).`);
    return;
  }

  if (!args.package_id) fail('--package-id es obligatorio.');

  if (args.command === 'start') {
    const result = startPackageGate({ packageId: args.package_id });
    print(result);
    console.log(`BRANCH: ${result.branch}`);
    console.log(`BRANCH_MODE: ${result.branchMode}`);
    console.log('NEXT: npm run docs:chatgpt:starter');
    return;
  }

  if (args.command === 'prepare') {
    print(preparePackageGate({ packageId: args.package_id }));
    return;
  }

  if (args.command === 'status' || args.command === 'check') {
    const result = inspectPackageGate({ packageId: args.package_id });
    print(result);
    if (!result.assessment.valid) fail(result.assessment.errors.join('; '));
    return;
  }

  if (args.command === 'approve') {
    print(approvePackageGate({
      packageId: args.package_id,
      approvedBy: args.approved_by,
      approvalRef: args.approval_ref,
      statement: args.statement,
    }));
    return;
  }

  if (args.command === 'finish') {
    finishPackageGate({ packageId: args.package_id });
    return;
  }

  if (args.command === 'handoff') {
    handoffPackageImplementation({ packageId: args.package_id });
  }
}

const isCli = process.argv[1] && path.resolve(process.argv[1]) === path.resolve(fileURLToPath(import.meta.url));
if (isCli) {
  try { main(); } catch (error) { console.error(`ERROR: ${error instanceof Error ? error.message : String(error)}`); process.exitCode = 1; }
}
