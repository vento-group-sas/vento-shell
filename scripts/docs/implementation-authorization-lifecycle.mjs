import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { spawnSync } from 'node:child_process';

import { computeBaselineAtRef, assertTargetNotBlocked, loadValidatedCorrectionControl } from './correction-control.mjs';
import { instanceRecordRelativePath, loadImplementationControl, validateImplementationControl } from './implementation-control.mjs';
import { assessPackageGateRecord, packageGateRecordRelativePath, readPackageGatePolicy } from './package-gate-control.mjs';
import { scanPackageReadiness } from './package-readiness-scanner.mjs';
import { parsePorcelainPaths } from './task-branch-lifecycle.mjs';
import { resolveTaskWorkTopology } from './task-work-topology.mjs';

const DEFAULT_BRANCH = 'main';
const RESULT_START = '=== RESULTADO PARA CHATGPT ===';
const RESULT_END = '=== FIN RESULTADO PARA CHATGPT ===';

function fail(message) { throw new Error(message); }
function abs(root, relativePath) { return path.join(root, ...relativePath.split('/')); }
function stableJson(value) { return `${JSON.stringify(value, null, 2)}
`; }

function run(command, args, { cwd = process.cwd(), allowFailure = false } = {}) {
  const result = spawnSync(command, args, { cwd, encoding: 'utf8', windowsHide: true, stdio: ['ignore', 'pipe', 'pipe'] });
  if (result.error) {
    if (allowFailure) return { status: 1, stdout: '', stderr: result.error.message };
    fail(`${command} no disponible: ${result.error.message}`);
  }
  const status = Number.isInteger(result.status) ? result.status : 1;
  const stdout = String(result.stdout ?? '').trimEnd();
  const stderr = String(result.stderr ?? '').trimEnd();
  if (status !== 0 && !allowFailure) fail(stderr || stdout || `${command} ${args.join(' ')} fallo.`);
  return { status, stdout, stderr };
}

function git(args, options = {}) { return run('git', args, options); }
function currentBranch(root) { return git(['branch', '--show-current'], { cwd: root }).stdout.trim(); }
function worktreePaths(root) { return parsePorcelainPaths(git(['status', '--porcelain=v1', '--untracked-files=all'], { cwd: root }).stdout); }
function syncCounts(root, left, right) {
  const raw = git(['rev-list', '--left-right', '--count', `${left}...${right}`], { cwd: root }).stdout.trim();
  const [behind, ahead] = raw.split(/\s+/u).map(Number);
  return { behind, ahead, raw };
}

function normalizeIdentity(instanceId) {
  const match = /^(SHELL-CI-02[0-4])::(GAP-PKG-\d{3})$/u.exec(String(instanceId ?? '').trim());
  if (!match) fail(`INSTANCE_ID_NOT_PACKAGE_LIFECYCLE: ${instanceId ?? 'EMPTY'}.`);
  return { instanceId: String(instanceId).trim(), taskId: match[1], packageId: match[2] };
}

export function mapPhysicalOperation(operation) {
  const value = String(operation ?? '').trim().toUpperCase();
  if (['CREAR', 'CREATE'].includes(value)) return 'CREATE';
  if (['MODIFICAR', 'MODIFY'].includes(value)) return 'MODIFY';
  if (['ELIMINAR', 'DELETE'].includes(value)) return 'DELETE';
  if (['ADOPTAR_SIN_MODIFICAR', 'ADOPT_WITHOUT_MODIFY', 'ADOPTAR', 'READ_ONLY'].includes(value)) return 'EXECUTE_ONLY';
  fail(`PHYSICAL_OPERATION_UNSUPPORTED: ${operation}.`);
}

function dedupeChanges(changes) {
  const byKey = new Map();
  for (const entry of changes) {
    const key = `${entry.repo}|${entry.path}`;
    const previous = byKey.get(key);
    if (!previous) {
      byKey.set(key, entry);
      continue;
    }
    if (previous.change === entry.change) continue;
    if (entry.change === 'EXECUTE_ONLY' && previous.change !== 'EXECUTE_ONLY') continue;
    if (previous.change === 'EXECUTE_ONLY' && entry.change !== 'EXECUTE_ONLY') {
      byKey.set(key, entry);
      continue;
    }
    fail(`AUTHORIZED_CHANGE_CONFLICT: ${key} ${previous.change} != ${entry.change}.`);
  }
  return [...byKey.values()];
}

function standardExecuteOnlyChanges() {
  return [
    'scripts/docs/implementation-execution-coordinator.mjs',
    'scripts/docs/implementation-correction-guard.mjs',
    'scripts/docs/implementation-branch-lifecycle.mjs',
    'scripts/docs/canonical-task-preflight.mjs',
    'scripts/docs/package-gate-lifecycle.mjs',
    'scripts/docs/package-readiness-scanner.mjs',
    'scripts/docs/package-execution-control.mjs',
    'scripts/docs/implementation-readiness-artifacts.mjs',
    'scripts/docs/repair-working-copy.mjs',
    'scripts/docs/commit-scope.mjs',
  ].map((scriptPath) => ({
    repo: 'vento-group-sas/vento-shell',
    path: scriptPath,
    change: 'EXECUTE_ONLY',
    scope: 'Use the canonical governed implementation lifecycle without modifying this tooling.',
  }));
}

function normalizedTargets(gate) {
  return (gate?.deployment_environment?.targets ?? []).map((target) => ({
    environment_role: String(target.environment_role).trim().toUpperCase(),
    target_type: String(target.target_type).trim().toUpperCase(),
    target_id: String(target.target_id).trim(),
    owner: String(target.owner).trim(),
  }));
}

function previousTaskId(taskId) {
  const number = Number(taskId.slice(-3));
  return number <= 20 ? null : `SHELL-CI-${String(number - 1).padStart(3, '0')}`;
}

function evidenceContainsPilotApproval(previous) {
  return JSON.stringify(previous?.evidence ?? []).includes('APROBAR_ENTRADA');
}

export function buildAuthorizedInstanceRecord({ instance, gate, identity, previous = null, approval, sourceContractSha256 }) {
  if (!instance || instance.status !== 'PENDING_AUTHORIZATION') fail('AUTHORIZATION_REQUIRES_PENDING_INSTANCE.');
  if (!gate || gate.status !== 'APPROVED_FOR_IMPLEMENTATION') fail('AUTHORIZATION_REQUIRES_APPROVED_PACKAGE_GATE.');
  const ledgerPath = instanceRecordRelativePath(identity.instanceId);
  const targetEnvironments = normalizedTargets(gate);
  if (targetEnvironments.length === 0) fail('AUTHORIZATION_REQUIRES_TARGET_ENVIRONMENTS.');

  let authorizedChanges;
  let validationCommands;
  const prerequisiteEvidence = [
    `PACKAGE_GATE ${identity.packageId} APPROVED_FOR_IMPLEMENTATION`,
    `PACKAGE_GATE_AUTHORIZATION ${gate.authorization?.approval_statement ?? gate.authorization?.approval_ref ?? 'APROBADO'}`,
  ];

  if (identity.taskId === 'SHELL-CI-020') {
    if (gate.physical_discovery?.status !== 'COMPLETE'
      || !Array.isArray(gate.physical_discovery?.unresolved_findings)
      || gate.physical_discovery.unresolved_findings.length !== 0) {
      fail('CI020_AUTHORIZATION_REQUIRES_EXPLICIT_PHYSICAL_DISCOVERY_COMPLETE.');
    }
    const physical = gate.physical_identity?.targets ?? [];
    if (physical.length === 0) fail('CI020_AUTHORIZATION_REQUIRES_PHYSICAL_TARGETS.');
    authorizedChanges = physical.map((target) => ({
      repo: String(target.repository).trim(),
      path: String(target.path).trim().split(String.fromCharCode(92)).join('/'),
      change: mapPhysicalOperation(target.operation),
      scope: `Package-gate physical target: ${String(target.symbol_or_surface).trim()}; operation=${String(target.operation).trim()}`,
    }));
    validationCommands = (gate.evidence_plan?.tests ?? []).map(({ command }) => String(command).trim()).filter(Boolean);
    if (validationCommands.length === 0) fail('CI020_AUTHORIZATION_REQUIRES_VALIDATION_COMMANDS.');
    prerequisiteEvidence.push(
      `PHYSICAL_DISCOVERY COMPLETE searches=${gate.physical_discovery.searches?.length ?? 0} findings=${gate.physical_discovery.findings?.length ?? 0} unresolved=0`,
      `PHYSICAL_IDENTITY targets=${physical.length}`,
      `IMPLEMENTATION_UNITS count=${gate.implementation_units?.length ?? 0}`,
      `ENV_PROFILE ${gate.deployment_environment?.environment_profile ?? 'UNKNOWN'}`,
    );
  } else {
    const previousId = previousTaskId(identity.taskId);
    if (!previousId || !previous || previous.instance_id !== `${previousId}::${identity.packageId}` || previous.status !== 'VERIFIED') {
      fail(`${identity.taskId} authorization requires previous lifecycle stage VERIFIED.`);
    }
    if (identity.taskId === 'SHELL-CI-022' && !evidenceContainsPilotApproval(previous)) {
      fail('CI022_AUTHORIZATION_REQUIRES_CI021_PILOT_ENTRY_APROBAR_ENTRADA.');
    }
    authorizedChanges = [];
    validationCommands = [
      `npm run docs:package:gate:check -- --package-id ${identity.packageId}`,
      `npm run docs:package:readiness:check -- --package ${identity.packageId}`,
      'npm run docs:package:execution:check',
      'npm run docs:implementation:check',
    ];
    prerequisiteEvidence.push(
      `${previous.instance_id} VERIFIED`,
      `TARGET_ENVIRONMENT_COUNT ${targetEnvironments.length}`,
    );
  }

  authorizedChanges.push({
    repo: 'vento-group-sas/vento-shell',
    path: ledgerPath,
    change: 'MODIFY',
    scope: `Record only authorization, lifecycle state and evidence for ${identity.instanceId}.`,
  });
  authorizedChanges.push(...standardExecuteOnlyChanges());
  const deduped = dedupeChanges(authorizedChanges);
  const repositories = [...new Set(deduped.map(({ repo }) => repo))].sort((a, b) => a.localeCompare(b, 'en'));

  return {
    ...instance,
    status: 'AUTHORIZED',
    target_repositories: repositories,
    authorized_changes: deduped,
    validation_commands: validationCommands,
    target_environments: targetEnvironments,
    prerequisite_evidence: prerequisiteEvidence,
    authorization: {
      decision: 'APPROVED',
      approved_by: approval.approvedBy,
      approved_at: approval.approvedAt,
      timezone: approval.timezone,
      approval_statement: approval.approvalStatement,
      source_contract_sha256: sourceContractSha256,
    },
    evidence: [],
  };
}

function parseArgs(argv) {
  const args = { instanceId: null, approvedBy: null, approvalStatement: null, timezone: null };
  for (let index = 0; index < argv.length; index += 1) {
    const token = argv[index];
    const value = argv[index + 1];
    if (token === '--instance-id') args.instanceId = value;
    else if (token === '--approved-by') args.approvedBy = value;
    else if (token === '--approval-statement') args.approvalStatement = value;
    else if (token === '--timezone') args.timezone = value;
    else fail(`argumento desconocido: ${token}.`);
    if (!value || value.startsWith('--')) fail(`falta valor de ${token}.`);
    index += 1;
  }
  if (!args.instanceId || !args.approvedBy || !args.approvalStatement || !args.timezone) {
    fail('authorize exige --instance-id, --approved-by, --approval-statement y --timezone.');
  }
  if (!args.approvalStatement.includes('APROBADO')) fail('--approval-statement debe contener APROBADO explícito.');
  return args;
}

export function authorizeImplementationInstance({ root = process.cwd(), ...input } = {}) {
  const identity = normalizeIdentity(input.instanceId);
  if (currentBranch(root) !== DEFAULT_BRANCH) fail('IMPLEMENTATION_AUTHORIZE debe comenzar desde main.');
  if (worktreePaths(root).length > 0) fail('IMPLEMENTATION_AUTHORIZE exige worktree limpio.');
  git(['fetch', 'origin', DEFAULT_BRANCH, '--quiet'], { cwd: root });
  git(['pull', '--ff-only', 'origin', DEFAULT_BRANCH], { cwd: root });
  const sync = syncCounts(root, `origin/${DEFAULT_BRANCH}`, 'HEAD');
  if (sync.behind !== 0 || sync.ahead !== 0) fail(`main debe quedar 0/0 antes de autorizar: ${sync.raw}.`);

  const corrections = loadValidatedCorrectionControl({ root });
  assertTargetNotBlocked(corrections, identity.instanceId);
  assertTargetNotBlocked(corrections, identity.taskId);

  const instancePath = instanceRecordRelativePath(identity.instanceId);
  const instance = JSON.parse(fs.readFileSync(abs(root, instancePath), 'utf8'));
  if (instance.instance_id !== identity.instanceId || instance.task_id !== identity.taskId || instance.status !== 'PENDING_AUTHORIZATION') {
    fail(`INSTANCE_NOT_PRISTINE_PENDING: ${identity.instanceId}.`);
  }

  const gatePolicy = readPackageGatePolicy(root);
  const gatePath = packageGateRecordRelativePath(identity.packageId, gatePolicy);
  const gate = JSON.parse(fs.readFileSync(abs(root, gatePath), 'utf8'));
  const gateAssessment = assessPackageGateRecord(gate, { policy: gatePolicy, relativePath: gatePath });
  if (!gateAssessment.valid || gateAssessment.status !== 'APPROVED_FOR_IMPLEMENTATION') {
    fail(`PACKAGE_GATE_NOT_APPROVED: ${identity.packageId} ${gateAssessment.errors.join('; ')}`);
  }

  const readiness = scanPackageReadiness({ root, check: false, trigger: 'implementation-authorize', supplied: { skipDerivedReports: true } });
  const execution = readiness.registry.package_execution ?? null;
  const projected = [
    execution?.current,
    ...(execution?.authorization_frontier ?? []),
    ...(execution?.active_physical ?? []),
  ].filter(Boolean).find((entry) => entry.next_action?.target === identity.instanceId) ?? null;
  if (!projected) fail(`INSTANCE_OUTSIDE_GOVERNED_FRONTIER: ${identity.instanceId}.`);

  const previousId = previousTaskId(identity.taskId);
  const previous = previousId
    ? JSON.parse(fs.readFileSync(abs(root, instanceRecordRelativePath(`${previousId}::${identity.packageId}`)), 'utf8'))
    : null;
  const sourceContractSha256 = computeBaselineAtRef({ root, ref: 'HEAD', taskId: identity.taskId }).target_task_sha256;
  const next = buildAuthorizedInstanceRecord({
    instance,
    gate,
    identity,
    previous,
    sourceContractSha256,
    approval: {
      approvedBy: input.approvedBy,
      approvalStatement: input.approvalStatement,
      timezone: input.timezone,
      approvedAt: input.approvedAt ?? new Date().toISOString(),
    },
  });
  fs.writeFileSync(abs(root, instancePath), stableJson(next), 'utf8');

  const topology = resolveTaskWorkTopology({ root });
  validateImplementationControl(loadImplementationControl({ root }), topology);
  const dirty = worktreePaths(root);
  if (JSON.stringify(dirty) !== JSON.stringify([instancePath])) {
    fail(`IMPLEMENTATION_AUTHORIZE_SCOPE_INVALID: ${dirty.join(', ') || 'NONE'}.`);
  }
  git(['diff', '--check'], { cwd: root });
  return { identity, next, sourceContractSha256, gatePath };
}

function printResult(result) {
  console.log('');
  console.log(RESULT_START);
  console.log('ESTADO: PASS');
  console.log('OPERACION: IMPLEMENTATION_AUTHORIZE');
  console.log(`INSTANCE_ID: ${result.identity.instanceId}`);
  console.log('STATUS: AUTHORIZED');
  console.log(`PACKAGE_ID: ${result.identity.packageId}`);
  console.log(`SOURCE_CONTRACT_SHA256: ${result.sourceContractSha256}`);
  console.log(`AUTHORIZED_CHANGES: ${result.next.authorized_changes.length}`);
  console.log(`VALIDATION_COMMANDS: ${result.next.validation_commands.length}`);
  console.log(`TARGET_ENVIRONMENTS: ${result.next.target_environments.length}`);
  console.log('HUMAN_GATE: APPROVED');
  console.log('READY_FOR_ADVANCE: SI');
  console.log(RESULT_END);
}

function main() {
  const args = parseArgs(process.argv.slice(2));
  printResult(authorizeImplementationInstance({ root: process.cwd(), ...args }));
}

const isCli = process.argv[1] && path.resolve(process.argv[1]) === path.resolve(fileURLToPath(import.meta.url));
if (isCli) {
  try { main(); }
  catch (error) {
    console.error(`ERROR: ${error instanceof Error ? error.message : String(error)}`);
    process.exitCode = 1;
  }
}
