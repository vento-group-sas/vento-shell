import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { spawnSync } from 'node:child_process';

import {
  assertImplementationPaths,
  implementationBranchName,
  normalizeInstanceId,
} from './implementation-branch-lifecycle.mjs';
import {
  instanceRecordRelativePath,
  loadImplementationControl,
  validateImplementationControl,
} from './implementation-control.mjs';
import { deriveCoordinatedImplementationStatus } from './implementation-readiness-coordinator.mjs';
import {
  recordInPackageCandidateEvidence,
  scanPackageReadiness,
  validateInPackageCandidateEvidence,
} from './package-readiness-scanner.mjs';
import { resolveTaskWorkTopology } from './task-work-topology.mjs';
import {
  parsePorcelainPaths,
  resolveNpmInvocation,
} from './task-branch-lifecycle.mjs';

const DEFAULT_BRANCH = 'main';
const SHELL_REPOSITORY = 'vento-group-sas/vento-shell';
const RESULT_START = '=== RESULTADO PARA CHATGPT ===';
const RESULT_END = '=== FIN RESULTADO PARA CHATGPT ===';
const EVIDENCE_REQUEST_PATH = '.delivery/implementation-evidence-request.json';
const DERIVED_PROJECTIONS = new Set([
  'docs/plan-canonico/modular/00_CABECERA_Y_ESTADO.md',
  'docs/plan-canonico/modular/active-sequence.json',
  'docs/plan-canonico/modular/.generated/REGISTRO_GLOBAL_DE_TAREAS.md',
  'docs/plan-canonico/modular/.generated/REGISTRO_DE_TAREAS_PENDIENTES_CON_CONTEXTO.md',
  'scripts/docs/package-readiness/implementation-package-registry.json',
]);
const TRANSIENT_NETWORK_PATTERN = /(?:unexpected EOF|HTTP\s+(?:408|425|429|499|500|502|503|504)\b|ECONNRESET|ECONNREFUSED|ETIMEDOUT|EAI_AGAIN|ENETUNREACH|socket hang up|connection reset|temporarily unavailable|timed?\s*out|Something went wrong while executing your query)/iu;

function fail(message, code = 1) {
  const error = new Error(message);
  error.exitCode = code;
  throw error;
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

function npm(args, options = {}) {
  const invocation = resolveNpmInvocation();
  return run(invocation.command, [...invocation.prefixArgs, ...args], options);
}

function sleep(milliseconds) {
  const delay = Number(milliseconds);
  if (!Number.isFinite(delay) || delay <= 0) return;
  Atomics.wait(new Int32Array(new SharedArrayBuffer(4)), 0, 0, delay);
}

function printResult(fields) {
  console.log('');
  console.log(RESULT_START);
  for (const [key, value] of Object.entries(fields)) {
    console.log(`${key}: ${value}`);
  }
  console.log(RESULT_END);
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

function loadValidatedControl(root) {
  const topology = resolveTaskWorkTopology({ root });
  return validateImplementationControl(loadImplementationControl({ root }), topology);
}

function resolveInstance(root, instanceId) {
  const id = normalizeInstanceId(instanceId);
  const control = loadValidatedControl(root);
  const instance = control.instances.find((entry) => entry.instance_id === id) ?? null;
  if (!instance) fail(`${id} no existe en implementation-instances.`);
  return { id, instance };
}

function writeInstance(root, instance) {
  const relativePath = instanceRecordRelativePath(instance.instance_id);
  const absolutePath = path.join(root, ...relativePath.split('/'));
  fs.writeFileSync(absolutePath, `${JSON.stringify(instance, null, 2)}\n`, 'utf8');
  return relativePath;
}

function branchChangedPaths(root) {
  return git(['diff', '--name-only', `origin/${DEFAULT_BRANCH}...HEAD`], { cwd: root })
    .stdout.split(/\r?\n/u)
    .map((entry) => entry.trim())
    .filter(Boolean);
}

function branchCommitCount(root) {
  return Number(
    git(['rev-list', '--count', `origin/${DEFAULT_BRANCH}..HEAD`], { cwd: root })
      .stdout.trim(),
  );
}

function writablePhysicalPaths(instance) {
  const ownLedger = instanceRecordRelativePath(instance.instance_id);
  return new Set(
    (instance.authorized_changes ?? [])
      .filter((entry) => (
        String(entry?.repo ?? '').trim() === SHELL_REPOSITORY
        && String(entry?.change ?? '').trim().toUpperCase() !== 'EXECUTE_ONLY'
      ))
      .map((entry) => String(entry?.path ?? '').replaceAll('\\', '/').trim())
      .filter((entry) => entry && entry !== ownLedger),
  );
}

function runCanonicalLifecycle(root, scriptName, instanceId) {
  npm([
    'run', '--silent', scriptName, '--', '--instance-id', instanceId,
  ], { cwd: root, inherit: true });
}

function runValidationCommand(root, command) {
  console.log('');
  console.log(`[VALIDATION] ${command}`);
  const result = spawnSync(command, {
    cwd: root,
    encoding: 'utf8',
    windowsHide: true,
    shell: true,
    stdio: 'inherit',
  });
  if (result.error) fail(`No se pudo ejecutar validation_command: ${command}; ${result.error.message}`);
  const status = Number.isInteger(result.status) ? result.status : 1;
  if (status !== 0) fail(`validation_command fallo: ${command}`, status);
}

function retryTransient(label, operation, { attempts = 4, intervalMs = 2500 } = {}) {
  let last = null;
  for (let attempt = 1; attempt <= attempts; attempt += 1) {
    const result = operation();
    if (result.status === 0) return result;
    last = result;
    const detail = [result.stdout, result.stderr].filter(Boolean).join('\n');
    if (!TRANSIENT_NETWORK_PATTERN.test(detail) || attempt === attempts) break;
    console.warn(`[ACCELERATOR] ${label}: fallo transitorio; retry ${attempt}/${attempts}.`);
    sleep(intervalMs);
  }
  fail(
    `${label} fallo: ${last?.stderr || last?.stdout || 'ERROR_DESCONOCIDO'}`,
    last?.status || 1,
  );
}

function ensureImplementationBranch(root, instanceId) {
  const branch = implementationBranchName(instanceId);
  const current = currentBranch(root);
  if (current === branch) return branch;
  if (current !== DEFAULT_BRANCH) {
    fail(`${instanceId}: rama actual ${current || 'DETACHED'}; se esperaba ${DEFAULT_BRANCH} o ${branch}.`);
  }
  if (worktreePaths(root).length > 0) {
    fail(`${instanceId}: main debe estar limpio para recuperar ${branch}.`);
  }

  if (remoteBranchExists(root, branch)) {
    git(['fetch', 'origin', branch, '--quiet'], { cwd: root });
    if (localBranchExists(root, branch)) {
      git(['switch', branch], { cwd: root });
      git(['branch', '--set-upstream-to', `origin/${branch}`, branch], { cwd: root });
    } else {
      git(['switch', '-c', branch, '--track', `origin/${branch}`], { cwd: root });
    }
    return branch;
  }

  if (localBranchExists(root, branch)) {
    git(['switch', branch], { cwd: root });
    return branch;
  }

  fail(`${instanceId}: no existe la rama fisica ${branch} para reanudar.`);
}

function autoResolveDerivedMergeConflicts(root) {
  const conflicts = git(['diff', '--name-only', '--diff-filter=U'], { cwd: root })
    .stdout.split(/\r?\n/u)
    .map((entry) => entry.trim())
    .filter(Boolean);
  if (conflicts.length === 0) return false;
  const real = conflicts.filter((entry) => !DERIVED_PROJECTIONS.has(entry));
  if (real.length > 0) {
    fail(`MERGE_CONFLICT real: ${real.join(', ')}. Worktree preservado.`);
  }
  git(['checkout', '--theirs', '--', ...conflicts], { cwd: root });
  git(['add', '--', ...conflicts], { cwd: root });
  git(['commit', '--no-edit'], { cwd: root });
  return true;
}

function ensureCurrentMainContained(root, instance) {
  git(['fetch', 'origin', DEFAULT_BRANCH, '--quiet'], { cwd: root });
  const contained = git(['merge-base', '--is-ancestor', `origin/${DEFAULT_BRANCH}`, 'HEAD'], {
    cwd: root,
    allowFailure: true,
  });
  if (contained.status === 0) return 'CURRENT';

  const dirty = worktreePaths(root);
  assertImplementationPaths(dirty, instance, { root, baseRef: `origin/${DEFAULT_BRANCH}` });

  let stashed = false;
  if (dirty.length > 0) {
    git(['stash', 'push', '--include-untracked', '-m', `accelerator-rebaseline:${instance.instance_id}`, '--', ...dirty], { cwd: root });
    stashed = true;
  }

  const merge = git(['merge', '--no-edit', `origin/${DEFAULT_BRANCH}`], {
    cwd: root,
    allowFailure: true,
  });
  if (merge.status !== 0) {
    const resolved = autoResolveDerivedMergeConflicts(root);
    if (!resolved) {
      fail(`No se pudo integrar origin/${DEFAULT_BRANCH} en ${instance.instance_id}. Worktree preservado.`);
    }
  }

  if (stashed) {
    const applied = git(['stash', 'pop'], { cwd: root, allowFailure: true });
    if (applied.status !== 0) {
      fail(`STASH_REAPPLY_CONFLICT para ${instance.instance_id}. Worktree y stash preservados.`);
    }
  }

  npm(['run', '--silent', 'docs:plan:build'], { cwd: root });
  npm(['run', '--silent', 'docs:plan:check'], { cwd: root });
  git(['diff', '--check'], { cwd: root });
  return 'REBASELINED';
}

function pushCandidate(root, branch) {
  if (remoteBranchExists(root, branch)) {
    git(['fetch', 'origin', branch, '--quiet'], { cwd: root });
    const remoteAhead = Number(
      git(['rev-list', '--count', `HEAD..origin/${branch}`], { cwd: root }).stdout.trim(),
    );
    if (remoteAhead > 0) {
      fail(`${branch}: origin contiene commits ausentes localmente; no se usa force-push.`);
    }
  }

  retryTransient(
    `git push ${branch}`,
    () => git(['push', '-u', 'origin', branch], { cwd: root, allowFailure: true }),
  );

  git(['fetch', 'origin', branch, '--quiet'], { cwd: root });
  const local = currentHead(root);
  const remote = git(['rev-parse', `origin/${branch}`], { cwd: root }).stdout.trim();
  if (local !== remote) fail(`${branch}: push no dejo remoto en ${local}; actual ${remote}.`);
}

function localValidationEvidence(instance, candidateCommit) {
  return (instance.validation_commands ?? []).map(
    (command) => `LOCAL_VALIDATION candidate=${candidateCommit} command=${command} status=PASS`,
  );
}

function replaceLocalValidationEvidence(evidence, next) {
  return [
    ...(evidence ?? []).filter((entry) => !(
      typeof entry === 'string' && entry.startsWith('LOCAL_VALIDATION candidate=')
    )),
    ...next,
  ];
}

function maybeRecordCi020Candidate(root, instance) {
  const match = /^SHELL-CI-020::(GAP-PKG-\d{3})$/u.exec(instance.instance_id);
  if (!match) return 'NO_APLICA';

  const packageId = match[1];
  const readiness = scanPackageReadiness({
    root,
    check: true,
    trigger: 'implementation-accelerator-candidate',
    supplied: { skipDerivedReports: true },
  });
  const pkg = readiness.registry.packages.find(({ package_id: id }) => id === packageId) ?? null;
  if (pkg?.execution_requirements?.supabase_mutation_required !== true) return 'NO_APLICA';

  const gate = readiness.contract?.physical_dependencies
    ?.supabase_pre_e5_foundation?.in_package_candidate_gate ?? null;
  const current = validateInPackageCandidateEvidence({
    root,
    packageId,
    instance,
    gate,
  });
  if (current.status === 'PASS') return 'REUSED';

  recordInPackageCandidateEvidence({ root, packageId });
  const refreshed = resolveInstance(root, instance.instance_id).instance;
  const validation = validateInPackageCandidateEvidence({
    root,
    packageId,
    instance: refreshed,
    gate,
  });
  if (validation.status !== 'PASS') fail(`MRP015-050 no quedo PASS: ${validation.detail}`);
  return 'RECORDED';
}

function writeEvidenceRequest(root, instance, candidateCommit) {
  const absolute = path.join(root, ...EVIDENCE_REQUEST_PATH.split('/'));
  fs.mkdirSync(path.dirname(absolute), { recursive: true });
  const request = {
    schema_version: 1,
    instance_id: instance.instance_id,
    candidate_commit: candidateCommit,
    observed_at: null,
    validation_commands: [...(instance.validation_commands ?? [])],
    results: (instance.validation_commands ?? []).map((command) => ({ command, status: 'PASS' })),
    target_environments: [...(instance.target_environments ?? [])],
    environment_results: (instance.target_environments ?? []).map((target) => ({
      ...target,
      status: 'PENDING_EVIDENCE',
      evidence: [],
    })),
    operational_evidence: [],
  };
  fs.writeFileSync(absolute, `${JSON.stringify(request, null, 2)}\n`, 'utf8');
  return EVIDENCE_REQUEST_PATH;
}

export function classifyExecutionState(instance) {
  switch (instance?.status) {
    case 'PENDING_AUTHORIZATION': return 'AUTHORIZATION_GATE';
    case 'AUTHORIZED': return 'START';
    case 'IN_PROGRESS': return 'MATERIALIZATION_GATE';
    case 'BLOCKED': return 'BLOCKED';
    case 'IMPLEMENTED': return 'EVIDENCE_GATE';
    case 'VERIFIED': return 'FINISH';
    case 'DEFERRED': return 'DEFERRED';
    default: return 'UNKNOWN';
  }
}

export function resolveExecutorInstanceId({ explicitInstanceId = null, coordinatedStatus = null } = {}) {
  if (explicitInstanceId) return normalizeInstanceId(explicitInstanceId);
  const candidates = [
    coordinatedStatus?.coordinatedPrimaryAction?.target,
    coordinatedStatus?.readinessCandidate?.instanceId,
  ];
  for (const value of candidates) {
    const candidate = String(value ?? '').trim();
    if (/^[A-Za-z0-9]+(?:-[A-Za-z0-9]+)*-\d{3,4}::[A-Za-z0-9][A-Za-z0-9._-]*$/u.test(candidate)) {
      return normalizeInstanceId(candidate);
    }
  }
  return null;
}

export function validateExecutionEvidenceReceipt({ instance, receipt, candidateCommit } = {}) {
  if (!instance || typeof instance !== 'object') fail('Instancia obligatoria para validar evidencia.');
  if (!receipt || typeof receipt !== 'object' || Array.isArray(receipt)) fail('Evidence receipt debe ser un objeto JSON.');
  if (receipt.schema_version !== 1) fail('Evidence receipt schema_version debe ser 1.');
  if (receipt.instance_id !== instance.instance_id) {
    fail(`Evidence receipt pertenece a ${receipt.instance_id ?? 'NONE'}, no a ${instance.instance_id}.`);
  }
  if (!/^[a-f0-9]{40}$/u.test(String(candidateCommit ?? ''))) fail('candidateCommit invalido.');
  if (receipt.candidate_commit !== candidateCommit) {
    fail(`Evidence receipt no corresponde al candidato ${candidateCommit}.`);
  }
  if (!String(receipt.observed_at ?? '').trim() || !Number.isFinite(Date.parse(receipt.observed_at))) {
    fail('Evidence receipt exige observed_at ISO concreto.');
  }

  const commands = instance.validation_commands ?? [];
  if (JSON.stringify(receipt.validation_commands ?? []) !== JSON.stringify(commands)) {
    fail('Evidence receipt validation_commands no coincide con la instancia.');
  }
  const results = receipt.results ?? [];
  if (results.length !== commands.length || results.some((result, index) => (
    result?.command !== commands[index] || result?.status !== 'PASS'
  ))) {
    fail('Evidence receipt no conserva PASS exacto para cada validation_command.');
  }

  const targets = instance.target_environments ?? [];
  if (JSON.stringify(receipt.target_environments ?? []) !== JSON.stringify(targets)) {
    fail('Evidence receipt target_environments no coincide con la instancia.');
  }
  const environmentResults = receipt.environment_results ?? [];
  if (targets.length !== environmentResults.length) {
    fail('Evidence receipt environment_results no coincide en cardinalidad con target_environments.');
  }
  for (let index = 0; index < targets.length; index += 1) {
    const expected = targets[index];
    const actual = environmentResults[index];
    for (const key of ['environment_role', 'target_type', 'target_id', 'owner']) {
      if (actual?.[key] !== expected?.[key]) {
        fail(`Evidence receipt environment_results[${index}].${key} no coincide.`);
      }
    }
    if (actual?.status !== 'PASS') fail(`Evidence receipt environment_results[${index}] no esta PASS.`);
    if (!Array.isArray(actual?.evidence) || actual.evidence.length === 0
      || actual.evidence.some((entry) => !String(entry ?? '').trim())) {
      fail(`Evidence receipt environment_results[${index}] no contiene evidencia.`);
    }
  }
  if (!Array.isArray(receipt.operational_evidence) || receipt.operational_evidence.length === 0
    || receipt.operational_evidence.some((entry) => !String(entry ?? '').trim())) {
    fail('Evidence receipt exige operational_evidence no vacio.');
  }
  return true;
}

async function materializeImplementation({ root, id, instance }) {
  const branch = ensureImplementationBranch(root, id);
  const rebaseline = ensureCurrentMainContained(root, instance);
  const refreshedBefore = resolveInstance(root, id).instance;

  assertImplementationPaths(
    [...new Set([...branchChangedPaths(root), ...worktreePaths(root)])],
    refreshedBefore,
    { root, baseRef: `origin/${DEFAULT_BRANCH}` },
  );

  for (const command of refreshedBefore.validation_commands ?? []) {
    runValidationCommand(root, command);
  }

  const refreshedAfterValidation = resolveInstance(root, id).instance;
  const dirty = worktreePaths(root);
  assertImplementationPaths(
    [...new Set([...branchChangedPaths(root), ...dirty])],
    refreshedAfterValidation,
    { root, baseRef: `origin/${DEFAULT_BRANCH}` },
  );

  const writable = writablePhysicalPaths(refreshedAfterValidation);
  const physicalDirty = dirty.filter((entry) => writable.has(entry));
  if (physicalDirty.length > 0) {
    git(['add', '--', ...physicalDirty], { cwd: root });
    npm([
      'run', '--silent', 'docs:commit-scope:check', '--',
      '--staged', '--instance-id', id,
    ], { cwd: root });
    git(['diff', '--cached', '--check'], { cwd: root });
    git(['commit', '-m', `implementation(${id}): materialize`], { cwd: root });
  }

  const commits = branchCommitCount(root);
  if (physicalDirty.length === 0 && commits === 0) {
    console.log(`[ACCELERATOR] ${id}: etapa sin delta fisico; candidato = HEAD base.`);
  }

  const candidateCommit = currentHead(root);
  assertImplementationPaths(
    [...new Set([...branchChangedPaths(root), ...worktreePaths(root)])],
    resolveInstance(root, id).instance,
    { root, baseRef: `origin/${DEFAULT_BRANCH}` },
  );

  pushCandidate(root, branch);
  const mrpStatus = maybeRecordCi020Candidate(root, resolveInstance(root, id).instance);
  const refreshed = resolveInstance(root, id).instance;
  const next = {
    ...refreshed,
    status: 'IMPLEMENTED',
    evidence: replaceLocalValidationEvidence(
      refreshed.evidence,
      localValidationEvidence(refreshed, candidateCommit),
    ),
  };
  writeInstance(root, next);

  npm(['run', '--silent', 'docs:plan:build'], { cwd: root });
  npm(['run', '--silent', 'docs:plan:check'], { cwd: root });
  git(['diff', '--check'], { cwd: root });

  return {
    instance: resolveInstance(root, id).instance,
    candidateCommit,
    mrpStatus,
    rebaseline,
  };
}

async function sealVerifiedEvidence({ root, id, evidenceFile }) {
  ensureImplementationBranch(root, id);
  const instance = resolveInstance(root, id).instance;
  if (instance.status !== 'IMPLEMENTED') fail(`${id}: --evidence-file exige IMPLEMENTED.`);

  ensureCurrentMainContained(root, instance);
  runCanonicalLifecycle(root, 'docs:implementation:preverify', id);

  const candidateCommit = currentHead(root);
  const absoluteEvidence = path.resolve(root, evidenceFile);
  if (!fs.existsSync(absoluteEvidence)) fail(`No existe evidence-file: ${evidenceFile}`);

  let receipt;
  try {
    receipt = JSON.parse(fs.readFileSync(absoluteEvidence, 'utf8'));
  } catch (error) {
    fail(`Evidence receipt JSON invalido: ${error instanceof Error ? error.message : String(error)}`);
  }

  const refreshed = resolveInstance(root, id).instance;
  validateExecutionEvidenceReceipt({ instance: refreshed, receipt, candidateCommit });

  const evidenceReceipt = {
    type: 'IMPLEMENTATION_EXECUTION_EVIDENCE_V1',
    ...receipt,
  };
  const next = {
    ...refreshed,
    status: 'VERIFIED',
    evidence: [
      ...(refreshed.evidence ?? []).filter((entry) => !(
        entry && typeof entry === 'object' && !Array.isArray(entry)
        && entry.type === 'IMPLEMENTATION_EXECUTION_EVIDENCE_V1'
      )),
      evidenceReceipt,
    ],
  };
  writeInstance(root, next);
  npm(['run', '--silent', 'docs:plan:build'], { cwd: root });
  npm(['run', '--silent', 'docs:plan:check'], { cwd: root });
  git(['diff', '--check'], { cwd: root });
  return candidateCommit;
}

async function printStatus({ root, explicitInstanceId }) {
  const coordinatedStatus = await deriveCoordinatedImplementationStatus({ root });
  const instanceId = resolveExecutorInstanceId({ explicitInstanceId, coordinatedStatus });
  if (!instanceId) {
    const action = coordinatedStatus.coordinatedPrimaryAction;
    printResult({
      ESTADO: 'PASS',
      OPERACION: 'IMPLEMENTATION_ACCELERATOR_STATUS',
      INSTANCE_ID: 'NONE',
      NEXT_ACTION: action?.type ?? 'NONE',
      TARGET: action?.target ?? 'NONE',
      COMMAND: action?.command ?? 'NONE',
      MUTATIONS: 'NO',
    });
    return;
  }

  const { instance } = resolveInstance(root, instanceId);
  printResult({
    ESTADO: 'PASS',
    OPERACION: 'IMPLEMENTATION_ACCELERATOR_STATUS',
    INSTANCE_ID: instanceId,
    STATUS: instance.status,
    EXECUTOR_STATE: classifyExecutionState(instance),
    EXPECTED_BRANCH: implementationBranchName(instanceId),
    VALIDATION_COMMANDS: (instance.validation_commands ?? []).length,
    TARGET_ENVIRONMENTS: (instance.target_environments ?? []).length,
    MUTATIONS: 'NO',
  });
}

async function advance({ root, explicitInstanceId, materialized, evidenceFile }) {
  const coordinatedStatus = await deriveCoordinatedImplementationStatus({ root });
  const instanceId = resolveExecutorInstanceId({ explicitInstanceId, coordinatedStatus });

  if (!instanceId) {
    const action = coordinatedStatus.coordinatedPrimaryAction;
    printResult({
      ESTADO: 'PASS',
      OPERACION: 'IMPLEMENTATION_ACCELERATOR',
      INSTANCE_ID: 'NONE',
      EXECUTOR_STATE: 'PACKAGE_GATE',
      NEXT_ACTION: action?.type ?? 'NONE',
      TARGET: action?.target ?? 'NONE',
      COMMAND: action?.command ?? 'NONE',
      HUMAN_GATE: 'SI',
      RESUMABLE: 'SI',
    });
    return;
  }

  let { instance } = resolveInstance(root, instanceId);
  let state = classifyExecutionState(instance);

  if (state === 'AUTHORIZATION_GATE') {
    printResult({
      ESTADO: 'PASS',
      OPERACION: 'IMPLEMENTATION_ACCELERATOR',
      INSTANCE_ID: instanceId,
      STATUS: instance.status,
      EXECUTOR_STATE: state,
      NEXT_GATE: 'EXPLICIT_PHYSICAL_AUTHORIZATION',
      HUMAN_GATE: 'SI',
      MUTATIONS: 'NO',
      RESUMABLE: 'SI',
    });
    return;
  }

  if (state === 'START') {
    runCanonicalLifecycle(root, 'docs:implementation:start', instanceId);
    instance = resolveInstance(root, instanceId).instance;
    state = classifyExecutionState(instance);
  }

  let materializedResult = null;
  if (state === 'MATERIALIZATION_GATE') {
    if (!materialized) {
      printResult({
        ESTADO: 'PASS',
        OPERACION: 'IMPLEMENTATION_ACCELERATOR',
        INSTANCE_ID: instanceId,
        STATUS: instance.status,
        EXECUTOR_STATE: state,
        EXPECTED_BRANCH: implementationBranchName(instanceId),
        NEXT_GATE: 'MATERIALIZATION',
        HUMAN_GATE: 'SI',
        RESUMABLE: 'SI',
      });
      return;
    }

    materializedResult = await materializeImplementation({
      root,
      id: instanceId,
      instance,
    });
    instance = materializedResult.instance;
    state = classifyExecutionState(instance);
  }

  if (state === 'EVIDENCE_GATE') {
    ensureImplementationBranch(root, instanceId);
    ensureCurrentMainContained(root, instance);

    if (!evidenceFile) {
      runCanonicalLifecycle(root, 'docs:implementation:preverify', instanceId);
      const candidateCommit = currentHead(root);
      const requestPath = writeEvidenceRequest(root, resolveInstance(root, instanceId).instance, candidateCommit);
      printResult({
        ESTADO: 'PASS',
        OPERACION: 'IMPLEMENTATION_ACCELERATOR',
        INSTANCE_ID: instanceId,
        STATUS: 'IMPLEMENTED',
        EXECUTOR_STATE: state,
        CANDIDATE_SHA: candidateCommit,
        REBASELINE: materializedResult?.rebaseline ?? 'CURRENT',
        MRP015_050: materializedResult?.mrpStatus ?? 'PRESERVED_OR_NO_APLICA',
        PREVERIFY: 'PASS',
        EVIDENCE_REQUEST: requestPath,
        NEXT_GATE: 'EXTERNAL_EVIDENCE',
        HUMAN_GATE: 'SI',
        RESUMABLE: 'SI',
      });
      return;
    }

    const candidateCommit = await sealVerifiedEvidence({
      root,
      id: instanceId,
      evidenceFile,
    });
    runCanonicalLifecycle(root, 'docs:implementation:finish', instanceId);
    printResult({
      ESTADO: 'PASS',
      OPERACION: 'IMPLEMENTATION_ACCELERATOR_COMPLETE',
      INSTANCE_ID: instanceId,
      CANDIDATE_SHA: candidateCommit,
      EVIDENCE_RECEIPT: 'PASS',
      VERIFIED: 'SI',
      FINISH: 'PASS',
      MAIN_SYNC: '0/0',
      WORKTREE: 'CLEAN',
      RESUMABLE: 'NO_NECESARIO',
    });
    return;
  }

  if (state === 'FINISH') {
    runCanonicalLifecycle(root, 'docs:implementation:finish', instanceId);
    printResult({
      ESTADO: 'PASS',
      OPERACION: 'IMPLEMENTATION_ACCELERATOR_COMPLETE',
      INSTANCE_ID: instanceId,
      VERIFIED: 'SI',
      FINISH: 'PASS',
      RESUMABLE: 'NO_NECESARIO',
    });
    return;
  }

  if (state === 'BLOCKED' || state === 'DEFERRED') {
    printResult({
      ESTADO: 'PASS',
      OPERACION: 'IMPLEMENTATION_ACCELERATOR',
      INSTANCE_ID: instanceId,
      STATUS: instance.status,
      EXECUTOR_STATE: state,
      BLOCKER: instance.blocker ?? 'NONE',
      MUTATIONS: 'NO',
      RESUMABLE: 'SI',
    });
    return;
  }

  fail(`${instanceId}: estado no soportado por accelerator: ${instance.status}`);
}

function parseArgs(argv) {
  const args = {
    mode: 'status',
    instanceId: null,
    materialized: false,
    evidenceFile: null,
  };
  const tokens = [...argv];
  if (tokens[0] && !tokens[0].startsWith('--')) args.mode = tokens.shift();
  for (let index = 0; index < tokens.length; index += 1) {
    const token = tokens[index];
    if (token === '--instance-id') {
      const value = tokens[index + 1];
      if (!value || value.startsWith('--')) fail('Falta valor de --instance-id.');
      args.instanceId = value;
      index += 1;
    } else if (token === '--materialized') {
      args.materialized = true;
    } else if (token === '--evidence-file') {
      const value = tokens[index + 1];
      if (!value || value.startsWith('--')) fail('Falta valor de --evidence-file.');
      args.evidenceFile = value;
      index += 1;
    } else {
      fail(`Argumento desconocido: ${token}.`);
    }
  }
  if (!['status', 'advance'].includes(args.mode)) {
    fail(`Modo desconocido: ${args.mode}. Use status o advance.`);
  }
  return args;
}

async function main() {
  const root = ensureRepositoryRoot();
  const args = parseArgs(process.argv.slice(2));
  if (args.mode === 'status') {
    await printStatus({ root, explicitInstanceId: args.instanceId });
    return;
  }
  await advance({
    root,
    explicitInstanceId: args.instanceId,
    materialized: args.materialized,
    evidenceFile: args.evidenceFile,
  });
}

const isCli = process.argv[1]
  && path.resolve(process.argv[1]) === path.resolve(fileURLToPath(import.meta.url));

if (isCli) {
  try {
    await main();
  } catch (error) {
    const message = error instanceof Error ? error.message : String(error);
    printResult({
      ESTADO: 'FAIL',
      OPERACION: 'IMPLEMENTATION_ACCELERATOR',
      STEP: 'AUTO_DETECTED',
      CAUSE: message.replace(/\s+/gu, ' ').trim(),
      RESUMABLE: 'SI',
      WORKTREE_PRESERVED: 'SI',
    });
    process.exitCode = Number.isInteger(error?.exitCode) ? error.exitCode : 1;
  }
}
