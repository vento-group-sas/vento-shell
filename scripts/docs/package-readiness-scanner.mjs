import crypto from 'node:crypto';
import fs from 'node:fs';
import path from 'node:path';
import { spawnSync } from 'node:child_process';
import { fileURLToPath } from 'node:url';

import { readCanonicalTaskInventory } from './task-semantic-contract.mjs';
import {
  assertPackageGateRecordsValid,
  assessPackageGateRecord,
  loadPackageGateRecords,
  packageGateRecordRelativePath,
  readPackageGatePolicy,
} from './package-gate-control.mjs';
import {
  deriveLinearPackageExecution,
  readPackageExecutionPolicy,
} from './package-execution-control.mjs';
import { resolveNpmInvocation } from './task-branch-lifecycle.mjs';

export const READINESS_PATHS = Object.freeze({
  contract: 'scripts/docs/package-readiness/package-readiness-contract.json',
  capabilityIndex: 'scripts/docs/package-readiness/implementation-capability-index.json',
  packageRegistry: 'scripts/docs/package-readiness/implementation-package-registry.json',
  priorityLanes: 'docs/plan-canonico/modular/priority-delivery-lanes.json',
  activeSequence: 'docs/plan-canonico/modular/active-sequence.json',
  implementationOrder: 'docs/plan-canonico/modular/90_ORDEN_DE_IMPLEMENTACION.md',
  taskRoot: 'docs/plan-canonico/modular/bloques',
  implementationInstances: 'docs/plan-canonico/modular/implementation-instances',
  packageGatePolicy: 'docs/plan-canonico/modular/package-gate-policy.json',
  packageGateInstances: 'docs/plan-canonico/modular/package-gate-instances',
  packageExecutionPolicy: 'docs/plan-canonico/modular/package-execution-policy.json',
  canonicalPackageSource: 'docs/plan-canonico/modular/bloques/E5_PLANIFICACION_DE_IMPLEMENTACION/02_PAQUETES_DE_IMPLEMENTACION.md',
  gapRoutingSource: 'docs/plan-canonico/modular/bloques/E1_DESCUBRIMIENTO_OPERATIVO/07_REGISTRO_CANONICO_DE_BRECHAS.md',
  reportJson: '.delivery/package-readiness-scan.json',
  reportMarkdown: '.delivery/package-readiness-scan.md',
});

const TASK_HEADING = /^###\s+(?<marker>✅|🟡|❌|\[[^\]]+\])\s+(?<id>[A-Z0-9]+(?:-[A-Z0-9]+)*-\d{3,4})\s+—\s+(?<title>[^\n]+)$/gmu;
const APPROVED_STATES = new Set(['APROBADA', 'APROBADO', 'CERRADA', 'CERRADO']);
const PHYSICAL_ACTIVE = new Set(['AUTHORIZED', 'IN_PROGRESS', 'IMPLEMENTED']);
const BLOCKING_LANE_STATES = new Set(['SUSPENDED', 'BLOCKED', 'RETIRED']);
const PASS_WORDS = new Set(['PASS', 'APROBADO', 'APROBADA', 'READY', 'IMPLEMENTATION_READY']);
const TASK_ID_PATTERN = /\b[A-Z][A-Z0-9]*(?:-[A-Z0-9]+)*-\d{3,4}\b/gu;
const FOUNDATION_EVIDENCE_PRODUCER = 'docs:package:foundation:record';
const FOUNDATION_REQUIRED_CHECKS = Object.freeze({
  'MRP015-000': [
    'SUPABASE_LOCK_PROVENANCE',
    'SUPABASE_CLI_VERSION',
    'SUPABASE_CLI_HELP',
    'SUPABASE_FUNCTIONS_HELP',
    'SUPABASE_DB_HELP',
    'SUPABASE_DB_LINT_HELP',
    'DOCKER_SERVER',
    'SUPABASE_DB_HARNESS_TEST',
    'SUPABASE_DRIFT_TEST',
    'SUPABASE_CLEAN_REPLAY',
    'CHANGELOG_REVIEW_ATTESTATION',
    'TOOLCHAIN_FREEZE_ATTESTATION',
  ],
  'MRP015-010': [
    'ENVIRONMENT_BINDINGS',
    'STAGING_REMOTE_DRIFT',
    'PRODUCTION_REMOTE_DRIFT',
  ],
  'MRP015-020': [
    'MIGRATION_MANIFEST',
    'STAGING_HISTORY_DRIFT',
    'PRODUCTION_HISTORY_DRIFT',
  ],
  'MRP015-030': ['CLEAN_REPLAY'],
  'MRP015-040': [
    'MIGRATION_MANIFEST',
    'EXPECTED_RESOURCE_MANIFEST',
    'STAGING_HOSTED_RESOURCE_PARITY',
  ],
});

function fail(message) {
  throw new Error(message);
}

function rel(root, relativePath) {
  return path.join(root, ...String(relativePath).split('/'));
}

function readJson(root, relativePath, { optional = false, fallback = null } = {}) {
  const filePath = rel(root, relativePath);
  if (!fs.existsSync(filePath)) {
    if (optional) return fallback;
    fail(`No existe ${relativePath}.`);
  }
  try {
    return JSON.parse(fs.readFileSync(filePath, 'utf8'));
  } catch (error) {
    fail(`${relativePath} no contiene JSON valido: ${error instanceof Error ? error.message : String(error)}`);
  }
}

function sha256(value) {
  return crypto.createHash('sha256').update(String(value), 'utf8').digest('hex');
}

function canonicalJson(value) {
  if (Array.isArray(value)) return `[${value.map((entry) => canonicalJson(entry)).join(',')}]`;
  if (value && typeof value === 'object') {
    return `{${Object.keys(value).sort().map((key) => `${JSON.stringify(key)}:${canonicalJson(value[key])}`).join(',')}}`;
  }
  return JSON.stringify(value);
}

export function requiredFoundationCheckIds(foundationId) {
  return [...(FOUNDATION_REQUIRED_CHECKS[String(foundationId ?? '').trim()] ?? [])];
}

export function buildFoundationEvidenceRef({ gate, checks, recordedAt = new Date().toISOString() } = {}) {
  const required = requiredFoundationCheckIds(gate?.foundation_id);
  if (required.length === 0) fail(`Foundation desconocida: ${gate?.foundation_id ?? 'EMPTY'}.`);
  const byId = new Map((checks ?? []).map((check) => [check.id, check]));
  const missing = required.filter((id) => !byId.has(id));
  if (missing.length > 0) fail(`${gate.foundation_id}: faltan checks ${missing.join(', ')}.`);
  const normalizedChecks = required.map((id) => byId.get(id));
  if (normalizedChecks.some((check) => check.status !== 'PASS' || check.exit_code !== 0)) {
    fail(`${gate.foundation_id}: no puede materializar evidencia con checks no PASS.`);
  }
  const payload = {
    schema_version: 1,
    foundation_id: gate.foundation_id,
    gate_id: gate.gate_id,
    owner_task: gate.owner_task,
    producer: FOUNDATION_EVIDENCE_PRODUCER,
    recorded_at: recordedAt,
    status: 'PASS',
    checks: normalizedChecks,
  };
  return { ...payload, payload_sha256: sha256(canonicalJson(payload)) };
}

export function validateFoundationEvidenceRef(gate, evidenceRef) {
  if (evidenceRef === null || evidenceRef === undefined) {
    return { status: 'UNKNOWN', detail: `Gate ${gate.gate_id} no conserva evidence_ref materializada.` };
  }
  if (!evidenceRef || typeof evidenceRef !== 'object' || Array.isArray(evidenceRef)) {
    return { status: 'FAIL', detail: `Gate ${gate.gate_id} rechaza evidence_ref libre; se requiere evidencia estructurada del productor canónico.` };
  }
  const expectedIdentity = {
    schema_version: 1,
    foundation_id: gate.foundation_id,
    gate_id: gate.gate_id,
    owner_task: gate.owner_task,
    producer: FOUNDATION_EVIDENCE_PRODUCER,
    status: 'PASS',
  };
  for (const [key, value] of Object.entries(expectedIdentity)) {
    if (evidenceRef[key] !== value) {
      return { status: 'FAIL', detail: `Gate ${gate.gate_id} conserva evidencia con ${key} inválido.` };
    }
  }
  if (!/^\d{4}-\d{2}-\d{2}T/u.test(String(evidenceRef.recorded_at ?? ''))) {
    return { status: 'FAIL', detail: `Gate ${gate.gate_id} no conserva recorded_at ISO.` };
  }
  const required = requiredFoundationCheckIds(gate.foundation_id);
  const checks = Array.isArray(evidenceRef.checks) ? evidenceRef.checks : [];
  const byId = new Map(checks.map((check) => [check?.id, check]));
  for (const id of required) {
    const check = byId.get(id);
    if (!check || check.status !== 'PASS' || check.exit_code !== 0) {
      return { status: 'FAIL', detail: `Gate ${gate.gate_id} no conserva check PASS obligatorio ${id}.` };
    }
    if (!/^[a-f0-9]{64}$/u.test(String(check.stdout_sha256 ?? '')) || !/^[a-f0-9]{64}$/u.test(String(check.stderr_sha256 ?? ''))) {
      return { status: 'FAIL', detail: `Gate ${gate.gate_id} conserva digest inválido en ${id}.` };
    }
  }
  const { payload_sha256: digest, ...payload } = evidenceRef;
  if (!/^[a-f0-9]{64}$/u.test(String(digest ?? '')) || sha256(canonicalJson(payload)) !== digest) {
    return { status: 'FAIL', detail: `Gate ${gate.gate_id} conserva evidencia con integridad SHA-256 inválida.` };
  }
  return { status: 'PASS', detail: `Gate ${gate.gate_id} conserva evidencia estructurada e íntegra de ${FOUNDATION_EVIDENCE_PRODUCER}.` };
}

const IN_PACKAGE_CANDIDATE_EVIDENCE_TYPE = 'MRP015_050_CANDIDATE_READY';
const SHELL_REPOSITORY = 'vento-group-sas/vento-shell';

function repositoryHeadSha(root) {
  const result = spawnSync('git', ['rev-parse', 'HEAD'], {
    cwd: root,
    encoding: 'utf8',
    windowsHide: true,
    stdio: ['ignore', 'pipe', 'pipe'],
  });
  if (result.error || result.status !== 0) {
    fail(`No se pudo resolver HEAD para MRP015-050: ${result.error?.message ?? result.stderr ?? result.stdout}.`);
  }
  const value = String(result.stdout ?? '').trim().toLowerCase();
  if (!/^[a-f0-9]{40}$/u.test(value)) fail(`HEAD inválido para MRP015-050: ${value || 'EMPTY'}.`);
  return value;
}

function candidateLedgerPath(instanceId) {
  return `${READINESS_PATHS.implementationInstances}/${String(instanceId).replaceAll('::', '__')}.json`;
}

function candidateScopeRows({ root, instance, foundation }) {
  const ownLedger = candidateLedgerPath(instance.instance_id);
  const rows = (instance.authorized_changes ?? [])
    .filter((entry) => String(entry?.repo ?? '').trim() === SHELL_REPOSITORY)
    .map((entry) => ({
      path: normalizedTargetPath(entry?.path),
      change: String(entry?.change ?? '').trim().toUpperCase(),
    }))
    .filter((entry) => entry.path
      && entry.path !== ownLedger
      && entry.change !== 'EXECUTE_ONLY'
      && targetRequiresSupabaseFoundation(entry.path, foundation))
    .sort((left, right) => left.path.localeCompare(right.path, 'en') || left.change.localeCompare(right.change, 'en'));

  if (rows.length === 0) {
    fail(`MRP015-050 no aplica: ${instance.instance_id} no declara superficies Supabase mutables en ${SHELL_REPOSITORY}.`);
  }

  const files = rows.map((entry) => {
    const absolute = rel(root, entry.path);
    const exists = fs.existsSync(absolute) && fs.statSync(absolute).isFile();
    if (['CREATE', 'MODIFY'].includes(entry.change) && !exists) {
      fail(`MRP015-050: ${entry.change} exige archivo materializado ${entry.path}.`);
    }
    if (entry.change === 'DELETE' && exists) {
      fail(`MRP015-050: DELETE aún conserva ${entry.path}.`);
    }
    return {
      ...entry,
      exists,
      content_sha256: exists ? sha256(fs.readFileSync(absolute, 'utf8')) : null,
    };
  });

  return { rows, files };
}

function candidateDigests({ root, instance, foundation }) {
  const snapshot = candidateScopeRows({ root, instance, foundation });
  return {
    authorized_scope_sha256: sha256(canonicalJson(snapshot.rows)),
    candidate_scope_sha256: sha256(canonicalJson(snapshot.files)),
    files: snapshot.files,
  };
}

export function buildInPackageCandidateEvidence({
  root = process.cwd(),
  packageId,
  instance,
  gate,
  candidateHeadSha = null,
  recordedAt = new Date().toISOString(),
} = {}) {
  const normalizedPackageId = String(packageId ?? '').trim().toUpperCase();
  if (!/^GAP-PKG-\d{3}$/u.test(normalizedPackageId)) fail(`MRP015-050 package inválido: ${packageId ?? 'EMPTY'}.`);
  const expectedInstanceId = `SHELL-CI-020::${normalizedPackageId}`;
  if (instance?.instance_id !== expectedInstanceId || instance?.task_id !== 'SHELL-CI-020') {
    fail(`MRP015-050 exige ${expectedInstanceId}.`);
  }
  if (
    gate?.foundation_id !== 'MRP015-050'
    || gate?.gate_id !== 'CANDIDATE_READY'
    || gate?.owner_task !== 'SUPA-TRANS-015'
    || gate?.phase !== 'AFTER_LOCAL_MATERIALIZATION_BEFORE_REMOTE_DEPLOY'
  ) {
    fail('MRP015-050 conserva contrato de gate inválido.');
  }

  const contract = readJson(root, READINESS_PATHS.contract);
  const foundation = contract?.physical_dependencies?.supabase_pre_e5_foundation ?? null;
  const digests = candidateDigests({ root, instance, foundation });
  const head = candidateHeadSha ?? repositoryHeadSha(root);
  if (!/^[a-f0-9]{40}$/u.test(String(head))) fail(`MRP015-050 candidate_head_sha inválido: ${head ?? 'EMPTY'}.`);

  const payload = {
    schema_version: 1,
    evidence_type: IN_PACKAGE_CANDIDATE_EVIDENCE_TYPE,
    foundation_id: 'MRP015-050',
    gate_id: 'CANDIDATE_READY',
    owner_task: 'SUPA-TRANS-015',
    phase: 'AFTER_LOCAL_MATERIALIZATION_BEFORE_REMOTE_DEPLOY',
    package_id: normalizedPackageId,
    instance_id: expectedInstanceId,
    recorded_at: recordedAt,
    candidate_head_sha: String(head).toLowerCase(),
    authorized_scope_sha256: digests.authorized_scope_sha256,
    candidate_scope_sha256: digests.candidate_scope_sha256,
    candidate_file_count: digests.files.length,
    status: 'PASS',
    remote_mutations: false,
    secret_values_in_evidence: false,
  };
  return { ...payload, payload_sha256: sha256(canonicalJson(payload)) };
}

export function validateInPackageCandidateEvidence({
  root = process.cwd(),
  packageId,
  instance,
  gate,
  currentHeadSha = null,
} = {}) {
  const normalizedPackageId = String(packageId ?? '').trim().toUpperCase();
  const expectedInstanceId = `SHELL-CI-020::${normalizedPackageId}`;
  const evidence = [...(Array.isArray(instance?.evidence) ? instance.evidence : [])]
    .reverse()
    .find((entry) => entry && typeof entry === 'object'
      && !Array.isArray(entry)
      && entry.evidence_type === IN_PACKAGE_CANDIDATE_EVIDENCE_TYPE) ?? null;
  if (!evidence) return { status: 'UNKNOWN', detail: 'No existe evidencia package-scoped MRP015-050.' };

  const identity = {
    schema_version: 1,
    evidence_type: IN_PACKAGE_CANDIDATE_EVIDENCE_TYPE,
    foundation_id: 'MRP015-050',
    gate_id: 'CANDIDATE_READY',
    owner_task: 'SUPA-TRANS-015',
    phase: 'AFTER_LOCAL_MATERIALIZATION_BEFORE_REMOTE_DEPLOY',
    package_id: normalizedPackageId,
    instance_id: expectedInstanceId,
    status: 'PASS',
    remote_mutations: false,
    secret_values_in_evidence: false,
  };
  for (const [key, value] of Object.entries(identity)) {
    if (evidence[key] !== value) return { status: 'FAIL', detail: `MRP015-050 ${key} inválido.` };
  }
  if (instance?.instance_id !== expectedInstanceId || instance?.task_id !== 'SHELL-CI-020') {
    return { status: 'FAIL', detail: 'MRP015-050 no pertenece al ledger CI020 esperado.' };
  }
  if (!/^\d{4}-\d{2}-\d{2}T/u.test(String(evidence.recorded_at ?? ''))) {
    return { status: 'FAIL', detail: 'MRP015-050 recorded_at inválido.' };
  }
  const { payload_sha256: digest, ...payload } = evidence;
  if (!/^[a-f0-9]{64}$/u.test(String(digest ?? '')) || sha256(canonicalJson(payload)) !== digest) {
    return { status: 'FAIL', detail: 'MRP015-050 payload_sha256 inválido.' };
  }

  try {
    const contract = readJson(root, READINESS_PATHS.contract);
    const foundation = contract?.physical_dependencies?.supabase_pre_e5_foundation ?? null;
    const digests = candidateDigests({ root, instance, foundation });
    const head = currentHeadSha ?? repositoryHeadSha(root);
    if (evidence.candidate_head_sha !== String(head).toLowerCase()) {
      return { status: 'FAIL', detail: 'MRP015-050 quedó stale porque HEAD cambió.' };
    }
    if (evidence.authorized_scope_sha256 !== digests.authorized_scope_sha256) {
      return { status: 'FAIL', detail: 'MRP015-050 quedó stale porque cambió authorized_changes.' };
    }
    if (evidence.candidate_scope_sha256 !== digests.candidate_scope_sha256) {
      return { status: 'FAIL', detail: 'MRP015-050 quedó stale porque cambió el candidato materializado.' };
    }
    if (evidence.candidate_file_count !== digests.files.length) {
      return { status: 'FAIL', detail: 'MRP015-050 candidate_file_count inconsistente.' };
    }
  } catch (error) {
    return { status: 'FAIL', detail: error instanceof Error ? error.message : String(error) };
  }

  if (
    gate?.foundation_id !== 'MRP015-050'
    || gate?.gate_id !== 'CANDIDATE_READY'
    || gate?.owner_task !== 'SUPA-TRANS-015'
  ) {
    return { status: 'FAIL', detail: 'MRP015-050 gate identity inválida.' };
  }
  return { status: 'PASS', detail: `MRP015-050 válido para ${normalizedPackageId} y ${expectedInstanceId}.`, evidence };
}

export function recordInPackageCandidateEvidence({ root = process.cwd(), packageId } = {}) {
  const normalizedPackageId = String(packageId ?? '').trim().toUpperCase();
  if (!/^GAP-PKG-\d{3}$/u.test(normalizedPackageId)) fail(`MRP015-050 package inválido: ${packageId ?? 'EMPTY'}.`);
  const contract = readJson(root, READINESS_PATHS.contract);
  const foundation = contract?.physical_dependencies?.supabase_pre_e5_foundation ?? null;
  const gate = foundation?.in_package_candidate_gate ?? null;
  const instanceId = `SHELL-CI-020::${normalizedPackageId}`;
  const instances = readImplementationInstances(root);
  const instance = instances.get(instanceId) ?? null;
  if (!instance) fail(`MRP015-050 no encuentra ${instanceId}.`);
  if (!['IN_PROGRESS', 'IMPLEMENTED'].includes(instance.status)) {
    fail(`MRP015-050 exige ${instanceId} IN_PROGRESS o IMPLEMENTED; actual ${instance.status ?? 'UNKNOWN'}.`);
  }

  const evidence = buildInPackageCandidateEvidence({ root, packageId: normalizedPackageId, instance, gate });
  const next = {
    ...instance,
    evidence: [...(Array.isArray(instance.evidence) ? instance.evidence : []), evidence],
  };
  fs.writeFileSync(rel(root, candidateLedgerPath(instanceId)), stableJson(next), 'utf8');
  return { status: 'PASS', packageId: normalizedPackageId, instanceId, evidence };
}

function processEvidence(id, result) {
  const stdout = String(result.stdout ?? '');
  const stderr = String(result.stderr ?? '');
  return {
    id,
    status: result.status === 0 ? 'PASS' : 'FAIL',
    exit_code: result.status,
    stdout_sha256: sha256(stdout),
    stderr_sha256: sha256(stderr),
  };
}

function runEvidenceCommand(id, command, args, { root = process.cwd(), env = process.env } = {}) {
  const result = spawnSync(command, args, {
    cwd: root,
    encoding: 'utf8',
    windowsHide: true,
    env,
    stdio: ['ignore', 'pipe', 'pipe'],
  });
  if (result.error) {
    return processEvidence(id, { status: 1, stdout: '', stderr: result.error.message });
  }
  return processEvidence(id, {
    status: Number.isInteger(result.status) ? result.status : 1,
    stdout: result.stdout,
    stderr: result.stderr,
  });
}

function runNpmEvidence(id, args, options = {}) {
  const invocation = resolveNpmInvocation();
  return runEvidenceCommand(id, invocation.command, [...invocation.prefixArgs, ...args], options);
}

function staticEvidence(id, pass, detail) {
  const text = String(detail ?? '');
  return {
    id,
    status: pass ? 'PASS' : 'FAIL',
    exit_code: pass ? 0 : 1,
    stdout_sha256: sha256(text),
    stderr_sha256: sha256(pass ? '' : text),
  };
}

function supabaseLockProvenance(root) {
  const lock = readJson(root, 'package-lock.json');
  const entry = lock?.packages?.['node_modules/supabase'];
  const version = String(entry?.version ?? '').trim();
  const integrity = String(entry?.integrity ?? '').trim();
  const pass = /^\d+\.\d+\.\d+$/u.test(version) && /^sha512-/u.test(integrity);
  return { pass, version, integrity };
}

function resolvedEnvironmentBindings(foundation) {
  const bindings = foundation?.remote_environment_identity?.bindings ?? {};
  const staging = bindings.STAGING ?? {};
  const production = bindings.PRODUCTION ?? {};
  const pass = staging.classification === 'STAGING'
    && production.classification === 'PRODUCTION'
    && String(staging.project_ref ?? '').trim()
    && String(production.project_ref ?? '').trim()
    && String(staging.owner ?? '').trim()
    && String(production.owner ?? '').trim()
    && staging.project_ref !== production.project_ref;
  return { pass: Boolean(pass), staging, production };
}

export function remoteDriftArgs(binding, role, scope) {
  const normalizedScope = String(scope ?? '').trim().toLowerCase();
  if (!['environment', 'history', 'full'].includes(normalizedScope)) {
    fail(`Remote drift scope invalido: ${scope ?? 'EMPTY'}.`);
  }
  return [
    'run', '--silent', 'supabase:drift:remote', '--',
    '--environment-role', String(role).toLowerCase(),
    '--project-ref', String(binding.project_ref),
    '--owner', String(binding.owner),
    '--scope', normalizedScope,
    '--strict',
  ];
}

function runRemoteDrift(id, binding, role, scope, root) {
  return runNpmEvidence(id, remoteDriftArgs(binding, role, scope), { root });
}

function foundationChecks(root, foundation, gate, options) {
  const checks = [];
  const id = gate.foundation_id;
  if (id === 'MRP015-000') {
    const provenance = supabaseLockProvenance(root);
    checks.push(staticEvidence('SUPABASE_LOCK_PROVENANCE', provenance.pass, `version=${provenance.version};integrity=${provenance.integrity}`));
    const versionCheck = runNpmEvidence('SUPABASE_CLI_VERSION', ['exec', '--', 'supabase', '--version'], { root });
    checks.push(versionCheck);
    const cliHelp = runNpmEvidence('SUPABASE_CLI_HELP', ['exec', '--', 'supabase', '--help'], { root });
    checks.push(cliHelp);
    checks.push(runNpmEvidence('SUPABASE_FUNCTIONS_HELP', ['exec', '--', 'supabase', 'functions', '--help'], { root }));
    checks.push(runNpmEvidence('SUPABASE_DB_HELP', ['exec', '--', 'supabase', 'db', '--help'], { root }));
    checks.push(runNpmEvidence('SUPABASE_DB_LINT_HELP', ['exec', '--', 'supabase', 'db', 'lint', '--help'], { root }));
    checks.push(runEvidenceCommand('DOCKER_SERVER', 'docker', ['version', '--format', '{{.Server.Version}}'], { root }));
    checks.push(runNpmEvidence('SUPABASE_DB_HARNESS_TEST', ['run', '--silent', 'supabase:db:harness:test'], { root }));
    checks.push(runNpmEvidence('SUPABASE_DRIFT_TEST', ['run', '--silent', 'supabase:drift:test'], { root }));
    checks.push(runNpmEvidence('SUPABASE_CLEAN_REPLAY', ['run', '--silent', 'supabase:db:test:clean'], { root }));
    checks.push(staticEvidence('CHANGELOG_REVIEW_ATTESTATION', Boolean(options.changelogRef), options.changelogRef || 'MISSING_CHANGELOG_REF'));
    checks.push(staticEvidence('TOOLCHAIN_FREEZE_ATTESTATION', Boolean(options.toolchainFreezeRef), options.toolchainFreezeRef || 'MISSING_TOOLCHAIN_FREEZE_REF'));
    return checks;
  }

  const bindings = resolvedEnvironmentBindings(foundation);
  if (id === 'MRP015-010') {
    checks.push(staticEvidence('ENVIRONMENT_BINDINGS', bindings.pass, bindings.pass ? 'STAGING_AND_PRODUCTION_BOUND' : 'UNRESOLVED_BINDINGS'));
    if (bindings.pass) {
      checks.push(runRemoteDrift('STAGING_REMOTE_DRIFT', bindings.staging, 'STAGING', 'environment', root));
      checks.push(runRemoteDrift('PRODUCTION_REMOTE_DRIFT', bindings.production, 'PRODUCTION', 'environment', root));
    }
    return checks;
  }
  if (id === 'MRP015-020') {
    checks.push(runNpmEvidence('MIGRATION_MANIFEST', ['run', '--silent', 'supabase:migrations:manifest:check'], { root }));
    if (bindings.pass) {
      checks.push(runRemoteDrift('STAGING_HISTORY_DRIFT', bindings.staging, 'STAGING', 'history', root));
      checks.push(runRemoteDrift('PRODUCTION_HISTORY_DRIFT', bindings.production, 'PRODUCTION', 'history', root));
    }
    return checks;
  }
  if (id === 'MRP015-030') {
    checks.push(runNpmEvidence('CLEAN_REPLAY', ['run', '--silent', 'supabase:db:test:clean'], { root }));
    return checks;
  }
  if (id === 'MRP015-040') {
    checks.push(runNpmEvidence('MIGRATION_MANIFEST', ['run', '--silent', 'supabase:migrations:manifest:check'], { root }));
    checks.push(runNpmEvidence('EXPECTED_RESOURCE_MANIFEST', ['run', '--silent', 'supabase:drift:expected', '--', '--strict'], { root }));
    if (bindings.pass) {
      checks.push(runRemoteDrift(
        'STAGING_HOSTED_RESOURCE_PARITY',
        bindings.staging,
        'STAGING',
        'full',
        root,
      ));
    }
    return checks;
  }
  fail(`Foundation desconocida: ${id}.`);
}

export function recordSupabaseFoundationEvidence({
  root = process.cwd(),
  foundationId,
  changelogRef = null,
  toolchainFreezeRef = null,
} = {}) {
  const contract = readJson(root, READINESS_PATHS.contract);
  const foundation = contract?.physical_dependencies?.supabase_pre_e5_foundation;
  const gates = foundation?.ordered_foundation_gates ?? [];
  const index = gates.findIndex((gate) => gate.foundation_id === foundationId);
  if (index < 0) fail(`Foundation no encontrada: ${foundationId ?? 'EMPTY'}.`);

  for (const previous of gates.slice(0, index)) {
    const validated = validateFoundationEvidenceRef(previous, previous.evidence_ref);
    if (validated.status !== 'PASS') {
      fail(`${foundationId} no puede ejecutarse antes de ${previous.foundation_id}; estado ${validated.status}.`);
    }
  }

  const gate = gates[index];
  const checks = foundationChecks(root, foundation, gate, { changelogRef, toolchainFreezeRef });
  const required = requiredFoundationCheckIds(foundationId);
  const byId = new Map(checks.map((check) => [check.id, check]));
  const failed = required.filter((id) => byId.get(id)?.status !== 'PASS');
  if (failed.length > 0) {
    return { status: 'FAIL', foundationId, failed, checks, evidence: null };
  }

  const evidence = buildFoundationEvidenceRef({ gate, checks });
  gate.evidence_ref = evidence;
  fs.writeFileSync(rel(root, READINESS_PATHS.contract), stableJson(contract), 'utf8');
  return { status: 'PASS', foundationId, failed: [], checks, evidence };
}

function stableJson(value) {
  return `${JSON.stringify(value, null, 2)}\n`;
}

function normalizeScalar(value) {
  return String(value ?? '')
    .trim()
    .replace(/^`|`$/gu, '')
    .replace(/<br\s*\/?>/giu, ' ')
    .replace(/\s+/gu, ' ')
    .trim();
}

function normalizeHeader(value) {
  return normalizeScalar(value)
    .normalize('NFKD')
    .replace(/\p{M}/gu, '')
    .toLowerCase()
    .replace(/[^a-z0-9_]+/gu, ' ')
    .trim();
}

function escapeRegex(value) {
  return String(value).replace(/[.*+?^${}()|[\]\\]/gu, '\\$&');
}

function parseMarkdownRow(line) {
  const raw = String(line ?? '').trim();
  if (!raw.startsWith('|') || !raw.endsWith('|')) return null;

  const body = raw.slice(1, -1);
  const cells = [];
  let current = '';
  let codeFenceLength = 0;

  const nextSpacedDelimiter = (from) => {
    const match = /\s\|\s/u.exec(body.slice(from));
    return match ? from + match.index + match[0].indexOf('|') : -1;
  };

  for (let index = 0; index < body.length; index += 1) {
    const character = body[index];

    // A pipe escaped in Markdown belongs to the current cell and is not a delimiter.
    if (character === '\\' && body[index + 1] === '|') {
      current += '\\|';
      index += 1;
      continue;
    }

    // CommonMark only opens an inline-code span when a matching fence exists.
    // Treating an unmatched backtick as an opening fence would swallow every
    // remaining table delimiter in truncated audit excerpts.
    if (character === '`') {
      let end = index + 1;
      while (body[end] === '`') end += 1;
      const fence = body.slice(index, end);
      const closingFence = codeFenceLength === 0
        ? body.indexOf('`'.repeat(fence.length), end)
        : -1;
      const cellDelimiter = codeFenceLength === 0 ? nextSpacedDelimiter(end) : -1;
      if (codeFenceLength === 0 && closingFence >= 0 && (cellDelimiter < 0 || closingFence < cellDelimiter)) {
        codeFenceLength = fence.length;
      }
      else if (codeFenceLength === fence.length) codeFenceLength = 0;
      current += fence;
      index = end - 1;
      continue;
    }

    if (character === '|' && codeFenceLength === 0) {
      cells.push(normalizeScalar(current));
      current = '';
      continue;
    }

    current += character;
  }

  cells.push(normalizeScalar(current));
  return cells;
}

function separatorRow(cells) {
  return Array.isArray(cells)
    && cells.length > 0
    && cells.every((cell) => /^:?-{3,}:?$/u.test(cell.replace(/\s+/gu, '')));
}

export function parseTaskInventoryFromSource(source, relativePath = 'fixture.md') {
  const matches = [...String(source).matchAll(TASK_HEADING)];
  const tasks = [];
  for (let index = 0; index < matches.length; index += 1) {
    const match = matches[index];
    const next = matches[index + 1];
    const block = String(source).slice(match.index, next?.index ?? String(source).length);
    const explicitState = block.match(/^\*\*Estado:\*\*\s*([^\n]+)$/imu)?.[1]?.trim() ?? null;
    const marker = match.groups.marker;
    const markerState = marker === '✅'
      ? 'APROBADA'
      : marker === '❌'
        ? 'RECHAZADA'
        : marker === '🟡' || marker === '[~]'
          ? 'PROPUESTA'
          : 'NO_INICIADA';
    tasks.push({
      id: match.groups.id,
      title: match.groups.title.trim(),
      marker,
      state: (explicitState ?? markerState).toUpperCase(),
      relativePath,
      block,
    });
  }
  return tasks;
}

export function readTaskInventory(root = process.cwd()) {
  const canonical = readCanonicalTaskInventory(root);
  if (!(canonical instanceof Map) || canonical.size === 0) {
    fail('El inventario canónico de tareas quedó vacío o no pudo resolverse.');
  }
  return new Map([...canonical.entries()].map(([taskId, task]) => {
    const markerState = task.marker === '✅'
      ? 'APROBADA'
      : task.marker === '❌'
        ? 'RECHAZADA'
        : task.marker === '🟡' || task.marker === '[~]'
          ? 'PROPUESTA'
          : 'NO_INICIADA';
    return [taskId, {
      ...task,
      id: task.id ?? taskId,
      state: String(task.state ?? markerState).toUpperCase(),
      relativePath: task.relativePath ?? task.owner ?? 'No declarado.',
    }];
  }));
}

function isApprovedTask(task) {
  return Boolean(task)
    && (task.marker === '✅' || [...APPROVED_STATES].some((state) => task.state.startsWith(state)));
}

function taskEvidence(taskId, inventory) {
  const task = inventory.get(taskId);
  if (!task) {
    return { source: taskId, status: 'UNKNOWN', detail: 'Tarea canónica no encontrada.' };
  }
  if (isApprovedTask(task)) {
    return { source: taskId, status: 'PASS', detail: `${task.relativePath} — ${task.state}` };
  }
  return { source: taskId, status: 'FAIL', detail: `${task.relativePath} — ${task.state}` };
}

function rangeTaskIds({ prefix, from, to }) {
  const width = Math.max(3, String(to).length, String(from).length);
  return Array.from({ length: to - from + 1 }, (_, index) => (
    `${prefix}-${String(from + index).padStart(width, '0')}`
  ));
}

export function resolveSelector(selector, inventory, root = process.cwd()) {
  if (!selector || typeof selector !== 'object' || Array.isArray(selector)) {
    return [{ source: 'INVALID_SELECTOR', status: 'UNKNOWN', detail: 'Selector inválido.' }];
  }
  if (Array.isArray(selector.task_refs)) {
    return selector.task_refs.map((taskId) => taskEvidence(taskId, inventory));
  }
  if (selector.task_range && typeof selector.task_range === 'object') {
    const { prefix, from, to } = selector.task_range;
    if (!prefix || !Number.isInteger(from) || !Number.isInteger(to) || to < from) {
      return [{ source: 'INVALID_TASK_RANGE', status: 'UNKNOWN', detail: JSON.stringify(selector.task_range) }];
    }
    return rangeTaskIds({ prefix, from, to }).map((taskId) => taskEvidence(taskId, inventory));
  }
  if (typeof selector.prefix === 'string' && selector.prefix.trim()) {
    const prefix = `${selector.prefix.trim()}-`;
    const matching = [...inventory.values()]
      .filter((task) => task.id.startsWith(prefix))
      .sort((left, right) => left.id.localeCompare(right.id, 'en'));
    if (matching.length === 0) {
      return [{ source: `${selector.prefix}-*`, status: 'UNKNOWN', detail: 'No existe ninguna tarea canónica con este prefijo.' }];
    }
    return matching.map((task) => taskEvidence(task.id, inventory));
  }
  if (typeof selector.file === 'string' && selector.file.trim()) {
    const relativePath = selector.file.replaceAll('\\', '/');
    const filePath = rel(root, relativePath);
    if (!fs.existsSync(filePath) || !fs.statSync(filePath).isFile()) {
      return [{ source: relativePath, status: 'UNKNOWN', detail: 'Archivo de evidencia no encontrado.' }];
    }
    const source = fs.readFileSync(filePath, 'utf8');
    const patterns = Array.isArray(selector.contains) ? selector.contains : [];
    const missing = patterns.filter((pattern) => !source.includes(String(pattern)));
    return [{
      source: relativePath,
      status: missing.length === 0 ? 'PASS' : 'FAIL',
      detail: missing.length === 0
        ? `Archivo presente${patterns.length ? ' y patrones requeridos encontrados' : ''}.`
        : `Faltan patrones: ${missing.join(', ')}`,
    }];
  }
  return [{ source: 'UNSUPPORTED_SELECTOR', status: 'UNKNOWN', detail: JSON.stringify(selector) }];
}

function aggregateEvidence(evidence) {
  if (evidence.some(({ status }) => status === 'FAIL')) return 'FAIL';
  if (evidence.some(({ status }) => status === 'UNKNOWN')) return 'UNKNOWN';
  if (evidence.length === 0) return 'UNKNOWN';
  return 'PASS';
}

export function evaluateContributorGroup({ capability, group, allowNotApplicable, inventory, root = process.cwd() }) {
  const notApplicable = new Set(capability.not_applicable ?? []);
  if (notApplicable.has(group)) {
    if (!allowNotApplicable) {
      return {
        status: 'FAIL',
        evidence: [{ source: `not_applicable:${group}`, status: 'FAIL', detail: 'El contrato no permite N/A para esta condición.' }],
      };
    }
    return {
      status: 'NOT_APPLICABLE',
      evidence: [{ source: `not_applicable:${group}`, status: 'NOT_APPLICABLE', detail: 'N/A declarado explícitamente en implementation-capability-index.json.' }],
    };
  }
  const selectors = capability.contributors?.[group] ?? [];
  if (!Array.isArray(selectors) || selectors.length === 0) {
    return {
      status: 'UNKNOWN',
      evidence: [{ source: `contributors.${group}`, status: 'UNKNOWN', detail: 'No existe evidencia declarada para este grupo.' }],
    };
  }
  const evidence = selectors.flatMap((selector) => resolveSelector(selector, inventory, root));
  return { status: aggregateEvidence(evidence), evidence };
}

function laneDecisionEvidence(capability, priorityLanes) {
  const laneId = capability.priority_lane_id;
  if (!laneId) return null;
  const lane = (priorityLanes?.lanes ?? []).find((entry) => entry.lane_id === laneId);
  if (!lane) {
    return { source: `priority-delivery-lanes:${laneId}`, status: 'UNKNOWN', detail: 'Carril declarado no encontrado.' };
  }
  const status = String(lane.status ?? '').toUpperCase();
  if (lane.active === false || BLOCKING_LANE_STATES.has(status)) {
    return {
      source: `priority-delivery-lanes:${laneId}`,
      status: 'FAIL',
      detail: lane.suspension_reason || `Carril ${status || 'INACTIVO'}.`,
    };
  }
  return { source: `priority-delivery-lanes:${laneId}`, status: 'PASS', detail: `Carril ${status || 'ACTIVO'}.` };
}

export function evaluateCapability({ capabilityId, capability, contract, inventory, priorityLanes = null, root = process.cwd() }) {
  const conditions = contract.capability_conditions.map((condition) => {
    const result = evaluateContributorGroup({
      capability,
      group: condition.group,
      allowNotApplicable: condition.allow_not_applicable === true,
      inventory,
      root,
    });
    const evidence = [...result.evidence];
    let status = result.status;
    if (condition.id === 'NO_OPEN_CRITICAL_DECISIONS') {
      const laneEvidence = laneDecisionEvidence(capability, priorityLanes);
      if (laneEvidence) {
        evidence.push(laneEvidence);
        status = aggregateEvidence(evidence.filter(({ status: itemStatus }) => itemStatus !== 'NOT_APPLICABLE'));
      }
    }
    return { id: condition.id, label: condition.label, status, evidence };
  });
  const blockers = conditions
    .filter(({ status }) => status === 'FAIL' || status === 'UNKNOWN')
    .map(({ id, status, evidence }) => ({
      id,
      status,
      missing_or_failed_sources: evidence
        .filter(({ status: itemStatus }) => itemStatus === 'FAIL' || itemStatus === 'UNKNOWN')
        .map(({ source }) => source),
    }));
  const ready = blockers.length === 0;
  return {
    capability_id: capabilityId,
    objective: capability.objective,
    owner_application: capability.owner_application,
    status: ready ? 'READY_FOR_COMPILATION' : 'BLOCKED',
    capability_ready: ready,
    conditions,
    blockers,
  };
}

function validateSupabasePreE5Foundation(contract, errors) {
  const foundation = contract?.physical_dependencies?.supabase_pre_e5_foundation;
  const expectedR0 = [
    'AUTH-DB-015::GLOBAL',
    'AUTH-DB-027::GLOBAL',
    'AUTH-DB-028::GLOBAL',
    'AUTH-DB-029::GLOBAL',
    'AUTH-DB-001::GLOBAL',
    'AUTH-DB-002::GLOBAL',
    'AUTH-DB-003::GLOBAL',
    'AUTH-DB-004::GLOBAL',
    'AUTH-DB-005::GLOBAL',
  ];
  const expectedPreEntry = [
    ['MRP015-000', 'TOOLCHAIN_READY'],
    ['MRP015-010', 'ENVIRONMENT_READY'],
    ['MRP015-020', 'HISTORY_PASS'],
    ['MRP015-030', 'CLEAN_REPLAY_PASS'],
    ['MRP015-040', 'RESOURCE_MANIFEST_PASS'],
  ];

  if (!foundation || typeof foundation !== 'object' || Array.isArray(foundation)) {
    errors.push('physical_dependencies.supabase_pre_e5_foundation es obligatorio.');
    return;
  }

  if (foundation.owner_task !== 'SUPA-TRANS-015') {
    errors.push('supabase_pre_e5_foundation.owner_task debe ser SUPA-TRANS-015.');
  }

  if (JSON.stringify(foundation.required_verified_instances) !== JSON.stringify(expectedR0)) {
    errors.push('supabase_pre_e5_foundation.required_verified_instances debe conservar R0 completo y ordenado.');
  }

  const actualPreEntry = (foundation.ordered_foundation_gates ?? [])
    .map((entry) => [entry.foundation_id, entry.gate_id]);

  if (JSON.stringify(actualPreEntry) !== JSON.stringify(expectedPreEntry)) {
    errors.push('supabase_pre_e5_foundation.ordered_foundation_gates debe conservar MRP015-000/010/020/030/040 en orden.');
  }

  const evidenceContract = foundation.evidence_contract;
  if (
    evidenceContract?.schema_version !== 1
    || evidenceContract?.producer !== FOUNDATION_EVIDENCE_PRODUCER
    || evidenceContract?.status_required !== 'PASS'
    || evidenceContract?.integrity !== 'SHA256_CANONICAL_JSON_V1'
    || evidenceContract?.fail_closed !== true
    || evidenceContract?.secret_values_forbidden !== true
  ) {
    errors.push('supabase_pre_e5_foundation.evidence_contract no coincide con el contrato estructurado fail-closed.');
  }

  for (const gate of foundation.ordered_foundation_gates ?? []) {
    if (gate.owner_task !== 'SUPA-TRANS-015') {
      errors.push(`${gate.foundation_id}: owner_task debe ser SUPA-TRANS-015.`);
    }
    if (gate.evidence_ref !== null && (!gate.evidence_ref || typeof gate.evidence_ref !== 'object' || Array.isArray(gate.evidence_ref))) {
      errors.push(`${gate.foundation_id}: evidence_ref debe ser null o evidencia estructurada; referencias libres están prohibidas.`);
    }
  }

  const candidate = foundation.in_package_candidate_gate;
  if (
    candidate?.foundation_id !== 'MRP015-050'
    || candidate?.gate_id !== 'CANDIDATE_READY'
    || candidate?.owner_task !== 'SUPA-TRANS-015'
    || candidate?.phase !== 'AFTER_LOCAL_MATERIALIZATION_BEFORE_REMOTE_DEPLOY'
  ) {
    errors.push('supabase_pre_e5_foundation.in_package_candidate_gate debe ser MRP015-050/CANDIDATE_READY de SUPA-TRANS-015 en fase AFTER_LOCAL_MATERIALIZATION_BEFORE_REMOTE_DEPLOY.');
  }
  const candidateBinding = candidate?.evidence_binding;
  if (
    candidateBinding?.storage !== 'SHELL_CI_020_INSTANCE_EVIDENCE'
    || candidateBinding?.evidence_type !== IN_PACKAGE_CANDIDATE_EVIDENCE_TYPE
    || candidateBinding?.producer !== 'package-readiness-scanner::recordInPackageCandidateEvidence'
    || candidateBinding?.package_scoped !== true
    || candidateBinding?.instance_task !== 'SHELL-CI-020'
    || candidateBinding?.candidate_head_sha_required !== true
    || candidateBinding?.authorized_scope_sha256_required !== true
    || candidateBinding?.candidate_scope_sha256_required !== true
    || candidateBinding?.cross_package_reuse_forbidden !== true
    || candidateBinding?.stale_after_candidate_change !== true
    || candidateBinding?.secret_values_forbidden !== true
  ) {
    errors.push('MRP015-050.evidence_binding no conserva binding package-scoped fail-closed sobre el ledger SHELL-CI-020.');
  }

  const remote = foundation.remote_environment_identity;
  if (remote?.do_not_infer_from_project_name !== true) {
    errors.push('remote_environment_identity.do_not_infer_from_project_name debe ser true.');
  }

  if (JSON.stringify(remote?.required_environment_roles) !== JSON.stringify(['STAGING', 'PRODUCTION'])) {
    errors.push('remote_environment_identity.required_environment_roles debe ser [STAGING,PRODUCTION].');
  }

  for (const role of ['STAGING', 'PRODUCTION']) {
    const binding = remote?.bindings?.[role];

    if (!binding || typeof binding !== 'object' || Array.isArray(binding)) {
      errors.push(`remote_environment_identity.bindings.${role} es obligatorio.`);
      continue;
    }

    const classification = String(binding.classification ?? '').trim();

    if (!['UNRESOLVED_BLOCKING', role].includes(classification)) {
      errors.push(`${role}: classification solo admite UNRESOLVED_BLOCKING o ${role}.`);
      continue;
    }

    if (classification === 'UNRESOLVED_BLOCKING') {
      if (binding.project_ref !== null || binding.owner !== null) {
        errors.push(`${role}: UNRESOLVED_BLOCKING exige project_ref=null y owner=null.`);
      }
      continue;
    }

    if (!String(binding.project_ref ?? '').trim()) {
      errors.push(`${role}: clasificación resuelta exige project_ref.`);
    }

    if (!String(binding.owner ?? '').trim()) {
      errors.push(`${role}: clasificación resuelta exige owner.`);
    }
  }
}

function validateContract(contract) {
  const errors = [];
  if (contract?.schema_version !== 1) errors.push('schema_version debe ser 1.');
  if (!Array.isArray(contract?.capability_conditions) || contract.capability_conditions.length !== 14) {
    errors.push('capability_conditions debe contener exactamente 14 condiciones.');
  }
  const conditionIds = (contract?.capability_conditions ?? []).map(({ id }) => id);
  if (new Set(conditionIds).size !== conditionIds.length) errors.push('capability_conditions contiene IDs duplicados.');
  if (!Array.isArray(contract?.dossier_conditions) || contract.dossier_conditions.length === 0) {
    errors.push('dossier_conditions debe ser no vacío.');
  }
  const delivRefs = (contract?.dossier_conditions ?? []).flatMap(({ deliv_pkg_refs }) => deliv_pkg_refs ?? []);
  const expectedDeliv = Array.from({ length: 25 }, (_, index) => `DELIV-PKG-${String(index + 1).padStart(3, '0')}`);
  if (JSON.stringify([...new Set(delivRefs)].sort()) !== JSON.stringify(expectedDeliv.sort())) {
    errors.push('dossier_conditions debe cubrir DELIV-PKG-001..025 exactamente como autoridad contractual.');
  }
  if (contract?.gate?.task_id !== 'E5-GATE-008') errors.push('gate.task_id debe ser E5-GATE-008.');
  if (contract?.implementation_entry_task !== 'SHELL-CI-020') errors.push('implementation_entry_task debe ser SHELL-CI-020.');
  if (contract?.unknown_blocks !== true) errors.push('unknown_blocks debe ser true.');

  const catalog = contract?.canonical_package_catalog;
  if (!catalog || typeof catalog !== 'object' || Array.isArray(catalog)) {
    errors.push('canonical_package_catalog es obligatorio.');
  } else {
    if (!String(catalog.source_file ?? '').trim()) errors.push('canonical_package_catalog.source_file es obligatorio.');
    if (catalog.identity_task !== 'DELIV-PKG-001') errors.push('canonical_package_catalog.identity_task debe ser DELIV-PKG-001.');
    if (catalog.relation_task !== 'DELIV-PKG-002') errors.push('canonical_package_catalog.relation_task debe ser DELIV-PKG-002.');
    if (catalog.final_decision_task !== 'DELIV-PKG-025') errors.push('canonical_package_catalog.final_decision_task debe ser DELIV-PKG-025.');
    if (catalog.package_prefix !== 'GAP-PKG') errors.push('canonical_package_catalog.package_prefix debe ser GAP-PKG.');
    if (!Number.isInteger(catalog.from) || !Number.isInteger(catalog.to) || catalog.to < catalog.from) {
      errors.push('canonical_package_catalog.from/to inválidos.');
    }
    if (catalog.expected_count !== 207) errors.push('canonical_package_catalog.expected_count debe ser 207.');
    if (catalog.expected_gap_memberships !== 820) errors.push('canonical_package_catalog.expected_gap_memberships debe ser 820.');
    if (catalog.expected_historical_gap_memberships !== 814) errors.push('canonical_package_catalog.expected_historical_gap_memberships debe ser 814.');
    if (catalog.expected_append_only_gap_memberships !== 6) errors.push('canonical_package_catalog.expected_append_only_gap_memberships debe ser 6.');
  }
  const queuePolicy = contract?.queue_policy;
  if (!queuePolicy || queuePolicy.implementation_ready_diagnostic_only !== true) {
    errors.push('queue_policy.implementation_ready_diagnostic_only debe ser true.');
  }
  if (queuePolicy?.linear_execution_source !== 'DELIV-PKG-015') {
    errors.push('queue_policy.linear_execution_source debe ser DELIV-PKG-015.');
  }

  validateSupabasePreE5Foundation(contract, errors);

  if (errors.length) fail(`package-readiness-contract.json inválido:\n- ${errors.join('\n- ')}`);
  return contract;
}

function validateCapabilityIndex(index, contract) {
  const errors = [];
  if (index?.schema_version !== 1) errors.push('schema_version debe ser 1.');
  if (index?.discovery_mode !== 'EXPLICIT_CANONICAL_MAPPINGS_ONLY') {
    errors.push('discovery_mode debe ser EXPLICIT_CANONICAL_MAPPINGS_ONLY.');
  }
  if (!index?.capabilities || typeof index.capabilities !== 'object' || Array.isArray(index.capabilities)) {
    errors.push('capabilities debe ser un objeto.');
  }
  for (const [capabilityId, capability] of Object.entries(index?.capabilities ?? {})) {
    if (!/^[A-Z][A-Z0-9_]+$/u.test(capabilityId)) errors.push(`${capabilityId} no usa una identidad de capacidad válida.`);
    if (!String(capability.objective ?? '').trim()) errors.push(`${capabilityId} no declara objective.`);
    if (!/^[a-z][a-z0-9-]*$/u.test(String(capability.owner_application ?? ''))) errors.push(`${capabilityId} no declara owner_application válido.`);
    if (!/^[A-Z0-9]+(?:-[A-Z0-9]+)*$/u.test(String(capability.package_slug ?? ''))) errors.push(`${capabilityId} no declara package_slug válido.`);
    for (const condition of contract.capability_conditions) {
      const group = condition.group;
      const isNa = (capability.not_applicable ?? []).includes(group);
      if (!Object.hasOwn(capability.contributors ?? {}, group) && !isNa) {
        errors.push(`${capabilityId} no declara contributors.${group} ni N/A.`);
      }
      if (isNa && condition.allow_not_applicable !== true) {
        errors.push(`${capabilityId} declara N/A no permitido en ${group}.`);
      }
    }
  }
  if (errors.length) fail(`implementation-capability-index.json inválido:\n- ${errors.join('\n- ')}`);
  return index;
}

function normalizeRegistry(registry) {
  if (!registry || registry.schema_version !== 1 || !Array.isArray(registry.packages)) {
    fail('implementation-package-registry.json inválido: schema_version=1 y packages[] son obligatorios.');
  }
  const seenPackage = new Set();
  const seenSpecialCapability = new Set();
  for (const pkg of registry.packages) {
    if (!pkg?.package_id) fail('Cada package debe declarar package_id.');
    if (seenPackage.has(pkg.package_id)) fail(`package_id duplicado: ${pkg.package_id}.`);
    seenPackage.add(pkg.package_id);
    const sourceKind = pkg.source_kind ?? 'SPECIAL_CAPABILITY';
    if (sourceKind === 'SPECIAL_CAPABILITY') {
      if (!pkg.capability_id) fail(`${pkg.package_id} SPECIAL_CAPABILITY debe declarar capability_id.`);
      if (seenSpecialCapability.has(pkg.capability_id)) fail(`capability_id duplicado en registry: ${pkg.capability_id}.`);
      seenSpecialCapability.add(pkg.capability_id);
    }
  }
  return {
    schema_version: 1,
    registry_id: registry.registry_id ?? 'VENTO-IMPLEMENTATION-PACKAGE-REGISTRY-001',
    status_scope: 'DOCUMENTARY_READINESS',
    physical_status_projection: READINESS_PATHS.reportJson,
    packages: registry.packages,
  };
}

function nextPackageId(capability, packages) {
  if (capability.canonical_package_id) return capability.canonical_package_id;
  const base = capability.package_slug;
  const used = packages
    .map(({ package_id: packageId }) => String(packageId))
    .map((packageId) => new RegExp(`^${escapeRegex(base)}-(\\d+)$`, 'u').exec(packageId))
    .filter(Boolean)
    .map((match) => Number(match[1]))
    .filter(Number.isFinite);
  const next = (used.length ? Math.max(...used) : 0) + 1;
  return `${base}-${String(next).padStart(3, '0')}`;
}

function packageEvidenceFromRegistry(previous, evidenceId) {
  const entries = previous?.package_evidence?.[evidenceId];
  if (!Array.isArray(entries) || entries.length === 0) {
    return [{ source: `package_evidence.${evidenceId}`, status: 'UNKNOWN', detail: 'El package no conserva evidencia específica para esta sección DELIV-PKG.' }];
  }
  return entries.map((entry) => {
    if (!entry || typeof entry !== 'object' || Array.isArray(entry)) {
      return { source: `package_evidence.${evidenceId}`, status: 'UNKNOWN', detail: 'Entrada de evidencia inválida.' };
    }
    const source = String(entry.source ?? '').trim();
    const status = String(entry.status ?? '').toUpperCase();
    if (!source) return { source: `package_evidence.${evidenceId}`, status: 'UNKNOWN', detail: 'La evidencia no declara source.' };
    if (!['PASS', 'FAIL', 'UNKNOWN', 'NOT_APPLICABLE'].includes(status)) {
      return { source, status: 'UNKNOWN', detail: `Estado de evidencia no permitido: ${status || 'VACIO'}.` };
    }
    if (status === 'PASS' && !String(entry.detail ?? entry.sha256 ?? entry.artifact ?? '').trim()) {
      return { source, status: 'UNKNOWN', detail: 'PASS sin detalle, artefacto o hash trazable; degradado a UNKNOWN.' };
    }
    return { source, status, detail: String(entry.detail ?? entry.artifact ?? entry.sha256 ?? '').trim() || 'Sin detalle.' };
  });
}

export function evaluateDossier({ previousPackage, contract, inventory }) {
  const checks = contract.dossier_conditions.map((condition) => {
    const templateEvidence = condition.deliv_pkg_refs.map((taskId) => taskEvidence(taskId, inventory));
    const templateStatus = aggregateEvidence(templateEvidence);
    const evidence = packageEvidenceFromRegistry(previousPackage, condition.id);
    const nonNaEvidence = evidence.filter(({ status: itemStatus }) => itemStatus !== 'NOT_APPLICABLE');
    const allNa = evidence.length > 0 && evidence.every(({ status: itemStatus }) => itemStatus === 'NOT_APPLICABLE');
    const packageStatus = allNa ? 'NOT_APPLICABLE' : aggregateEvidence(nonNaEvidence);
    const status = templateStatus === 'PASS' ? packageStatus : templateStatus;
    return {
      id: condition.id,
      label: condition.label,
      contract_sources: condition.deliv_pkg_refs,
      contract_template_status: templateStatus,
      contract_template_evidence: templateEvidence,
      package_status: packageStatus,
      status,
      evidence,
    };
  });
  const blockers = checks.filter(({ status }) => status === 'FAIL' || status === 'UNKNOWN');
  const contractReady = checks.every(({ contract_template_status: status }) => status === 'PASS');
  const complete = contractReady && blockers.length === 0;
  return {
    status: complete ? 'PASS' : 'BLOCKED',
    contract_ready: contractReady,
    complete,
    checks,
    blockers: blockers.map(({ id, status }) => `${id}:${status}`),
  };
}

function extractTaskBlock(source, taskId) {
  const text = String(source ?? '');
  const pattern = new RegExp(`^###\\s+(?:✅|🟡|❌|\\[[^\\]]+\\])\\s+${escapeRegex(taskId)}\\b.*$`, 'mu');
  const match = pattern.exec(text);
  if (!match) fail(`No se encontró ${taskId} en la fuente canónica de packages.`);
  const start = match.index;
  const tail = text.slice(start + match[0].length);
  const next = /^###\s+(?:✅|🟡|❌|\[[^\]]+\])\s+[A-Z0-9]+(?:-[A-Z0-9]+)*-\d{3,4}\b.*$/mu.exec(tail);
  const end = next ? start + match[0].length + next.index : text.length;
  return text.slice(start, end);
}

function findTable(block, requiredHeaders) {
  const lines = String(block).split(/\r?\n/gu);
  for (let index = 0; index < lines.length; index += 1) {
    const header = parseMarkdownRow(lines[index]);
    if (!header) continue;
    const normalized = header.map(normalizeHeader);
    const hasAll = requiredHeaders.every((required) => normalized.some((cell) => cell.includes(required)));
    if (!hasAll) continue;
    const separator = parseMarkdownRow(lines[index + 1]);
    if (!separatorRow(separator)) continue;
    const rows = [];
    for (let rowIndex = index + 2; rowIndex < lines.length; rowIndex += 1) {
      const cells = parseMarkdownRow(lines[rowIndex]);
      if (!cells) break;
      if (separatorRow(cells)) continue;
      rows.push(cells);
    }
    return { header, normalizedHeader: normalized, rows };
  }
  return null;
}

function headerIndex(table, candidates) {
  for (const candidate of candidates) {
    const index = table.normalizedHeader.findIndex((header) => header === candidate || header.includes(candidate));
    if (index >= 0) return index;
  }
  return -1;
}

function tableValue(row, table, candidates) {
  const index = headerIndex(table, candidates);
  return index >= 0 ? normalizeScalar(row[index]) : '';
}

function canonicalIdSequence(config) {
  const width = Math.max(3, String(config.to).length);
  return Array.from({ length: config.to - config.from + 1 }, (_, offset) => (
    `${config.package_prefix}-${String(config.from + offset).padStart(width, '0')}`
  ));
}

function parseRepositoryProjection(source) {
  let block;
  try {
    block = extractTaskBlock(source, 'DELIV-PKG-017');
  } catch {
    return new Map();
  }
  const table = findTable(block, ['paquete', 'repositorio propietario', 'runtime']);
  if (!table) return new Map();
  const result = new Map();
  for (const row of table.rows) {
    const packageId = tableValue(row, table, ['paquete', 'package_id']);
    if (!/^GAP-PKG-\d{3}$/u.test(packageId)) continue;
    result.set(packageId, {
      repository_owner: tableValue(row, table, ['repositorio propietario']),
      runtime_profile: tableValue(row, table, ['runtime']),
      test_profile_016: tableValue(row, table, ['perfil 016']),
      decision_owner: tableValue(row, table, ['responsable de decision']),
      observability_017: tableValue(row, table, ['resultado 017']),
      inherited_gate_017: tableValue(row, table, ['gate heredado']),
    });
  }
  return result;
}

export function parseDeploymentEnvironmentProjection(source) {
  let block;
  try {
    block = extractTaskBlock(source, 'DELIV-PKG-019');
  } catch {
    return new Map();
  }
  const table = findTable(block, ['package_id', 'perfil ambiente', 'resultado 019']);
  if (!table) return new Map();
  const result = new Map();
  for (const row of table.rows) {
    const packageId = tableValue(row, table, ['package_id', 'paquete']);
    if (!/^GAP-PKG-\d{3}$/u.test(packageId)) continue;
    const profileCell = tableValue(row, table, ['perfil ambiente']);
    const rolloutProfile = /\bTP-[A-Z]+-\d{3}\b/u.exec(profileCell)?.[0] ?? null;
    const environmentProfile = /\bENV-[A-Z0-9-]+\b/u.exec(profileCell)?.[0] ?? null;
    result.set(packageId, {
      rollout_profile_019: rolloutProfile,
      deployment_environment_profile_019: environmentProfile,
      rollout_result_019: tableValue(row, table, ['resultado 019']),
    });
  }
  return result;
}

function extractTaskIds(value) {
  return [...new Set([...String(value ?? '').matchAll(TASK_ID_PATTERN)].map((match) => match[0]))]
    .sort((left, right) => left.localeCompare(right, 'en'));
}

function addTaskRole(map, taskId, role) {
  if (!taskId) return;
  const entry = map.get(taskId) ?? new Set();
  entry.add(role);
  map.set(taskId, entry);
}

export function parsePackageTaskRouting(source) {
  const lines = String(source ?? '').split(/\r?\n/gu);
  const packages = new Map();
  for (let index = 0; index < lines.length; index += 1) {
    const header = parseMarkdownRow(lines[index]);
    if (!header) continue;
    const normalized = header.map(normalizeHeader);
    const packageIndex = normalized.findIndex((cell) => cell === 'paquete' || cell === 'package_id');
    const primaryIndex = normalized.findIndex((cell) => cell.includes('tarea primaria'));
    const supportIndex = normalized.findIndex((cell) => cell.includes('tareas de soporte') || cell.includes('tareas de apoyo'));
    if (packageIndex < 0 || primaryIndex < 0 || supportIndex < 0) continue;
    const separator = parseMarkdownRow(lines[index + 1]);
    if (!separatorRow(separator)) continue;
    for (let rowIndex = index + 2; rowIndex < lines.length; rowIndex += 1) {
      const row = parseMarkdownRow(lines[rowIndex]);
      if (!row) break;
      if (separatorRow(row)) continue;
      const packageId = normalizeScalar(row[packageIndex]);
      if (!/^GAP-PKG-\d{3}$/u.test(packageId)) continue;
      const entry = packages.get(packageId) ?? {
        primary_task_ids: new Set(),
        support_task_ids: new Set(),
      };
      for (const taskId of extractTaskIds(row[primaryIndex])) entry.primary_task_ids.add(taskId);
      for (const taskId of extractTaskIds(row[supportIndex])) entry.support_task_ids.add(taskId);
      packages.set(packageId, entry);
    }
  }
  return new Map([...packages.entries()].map(([packageId, entry]) => [packageId, {
    primary_task_ids: [...entry.primary_task_ids].sort((left, right) => left.localeCompare(right, 'en')),
    support_task_ids: [...entry.support_task_ids].sort((left, right) => left.localeCompare(right, 'en')),
  }]));
}

function extractHeadingSection(source, headingPattern) {
  const lines = String(source ?? '').split(/\r?\n/gu);
  const start = lines.findIndex((line) => headingPattern.test(line));
  if (start < 0) return '';
  const level = /^#+/u.exec(lines[start])?.[0].length ?? 6;
  let end = lines.length;
  for (let index = start + 1; index < lines.length; index += 1) {
    const heading = /^(#+)\s/u.exec(lines[index]);
    if (heading && heading[1].length <= level) {
      end = index;
      break;
    }
  }
  return lines.slice(start, end).join('\n');
}

function membershipRows(table, gapHeaders) {
  const memberships = [];
  for (const row of table?.rows ?? []) {
    const packageId = tableValue(row, table, ['paquete', 'package_id']);
    const gapId = tableValue(row, table, gapHeaders);
    if (!/^GAP-PKG-\d{3}$/u.test(packageId) || !gapId) continue;
    memberships.push({ gap_id: gapId, package_id: packageId });
  }
  return memberships;
}

function parseGapMembershipAudit(source, config) {
  const historicalSection = extractHeadingSection(source, /^####\s+9\.\s+Matriz completa brecha/u);
  const appendOnlySection = extractHeadingSection(source, /^###\s+B\.\s+Nuevas brechas canónicas/u);
  const historicalTable = findTable(historicalSection, ['registro', 'referencia representativa', 'tarea primaria', 'paquete', 'confianza']);
  const appendOnlyTable = findTable(appendOnlySection, ['gap id', 'tarea primaria', 'paquete']);
  if (!historicalTable) fail('GAP-CTRL-006 no contiene la matriz histórica propietaria de membresías.');
  if (!appendOnlyTable) fail('PROC-COVER-010 no contiene la tabla append-only de nuevas brechas.');
  const historical = membershipRows(historicalTable, ['registro']);
  const appendOnly = membershipRows(appendOnlyTable, ['gap id']);
  if (historical.length !== config.expected_historical_gap_memberships) {
    fail(`Membresías históricas inválidas: esperadas ${config.expected_historical_gap_memberships} y encontradas ${historical.length}.`);
  }
  if (appendOnly.length !== config.expected_append_only_gap_memberships) {
    fail(`Membresías append-only inválidas: esperadas ${config.expected_append_only_gap_memberships} y encontradas ${appendOnly.length}.`);
  }
  const memberships = [...historical, ...appendOnly];
  const seenGaps = new Map();
  for (const membership of memberships) {
    if (seenGaps.has(membership.gap_id)) {
      fail(`gap_id duplicado en membresías: ${membership.gap_id} (${seenGaps.get(membership.gap_id)} y ${membership.package_id}).`);
    }
    seenGaps.set(membership.gap_id, membership.package_id);
  }
  if (memberships.length !== config.expected_gap_memberships) {
    fail(`Membresías totales inválidas: esperadas ${config.expected_gap_memberships} y encontradas ${memberships.length}.`);
  }
  const byPackage = new Map();
  for (const { package_id: packageId } of memberships) byPackage.set(packageId, (byPackage.get(packageId) ?? 0) + 1);
  const expectedPackages = canonicalIdSequence(config);
  const packagesWithoutMembership = expectedPackages.filter((packageId) => !byPackage.has(packageId));
  if (packagesWithoutMembership.length > 0) {
    fail(`Packages sin membresía de brecha: ${packagesWithoutMembership.join(', ')}.`);
  }
  return {
    total: memberships.length,
    historical: historical.length,
    append_only: appendOnly.length,
    unique_gap_ids: seenGaps.size,
    packages_covered: byPackage.size,
    by_package: byPackage,
  };
}

function parseDominantTaskProjection(source) {
  let block;
  try {
    block = extractTaskBlock(source, 'DELIV-PKG-007');
  } catch {
    return new Map();
  }
  const table = findTable(block, ['package_id', 'tarea dominante', 'runtime_profile']);
  if (!table) return new Map();
  const result = new Map();
  for (const row of table.rows) {
    const packageId = tableValue(row, table, ['package_id']);
    if (!/^GAP-PKG-\d{3}$/u.test(packageId)) continue;
    const dominantTaskId = extractTaskIds(tableValue(row, table, ['tarea dominante']))[0] ?? null;
    result.set(packageId, {
      dominant_task_id: dominantTaskId,
      runtime_profile_007: tableValue(row, table, ['runtime_profile']),
      runtime_state_007: tableValue(row, table, ['estado']),
    });
  }
  return result;
}

function evaluateTaskPrerequisites(taskRelations, inventory) {
  const roleMap = new Map();
  for (const taskId of taskRelations?.primary_task_ids ?? []) addTaskRole(roleMap, taskId, 'PRIMARY');
  for (const taskId of taskRelations?.support_task_ids ?? []) addTaskRole(roleMap, taskId, 'SUPPORT');
  addTaskRole(roleMap, taskRelations?.dominant_task_id ?? null, 'DOMINANT');
  const tasks = [...roleMap.entries()]
    .map(([taskId, roles]) => {
      const task = inventory.get(taskId) ?? null;
      const status = task ? (isApprovedTask(task) ? 'PASS' : 'FAIL') : 'UNKNOWN';
      return {
        task_id: taskId,
        title: task?.title ?? null,
        state: task?.state ?? 'NOT_FOUND',
        status,
        roles: [...roles].sort((left, right) => left.localeCompare(right, 'en')),
        source: task?.relativePath ?? null,
      };
    })
    .sort((left, right) => left.task_id.localeCompare(right.task_id, 'en'));
  const approved = tasks.filter(({ status }) => status === 'PASS').length;
  const unknown = tasks.filter(({ status }) => status === 'UNKNOWN').length;
  const remaining = tasks.length - approved;
  return {
    total: tasks.length,
    approved,
    remaining,
    unknown,
    progress_percent: tasks.length === 0 ? 100 : Number(((approved / tasks.length) * 100).toFixed(2)),
    complete: remaining === 0,
    missing_task_ids: tasks.filter(({ status }) => status !== 'PASS').map(({ task_id: taskId }) => taskId),
    tasks,
  };
}

function capabilityTaskPrerequisites(capabilityResult, inventory) {
  const taskIds = new Set();
  for (const condition of capabilityResult?.conditions ?? []) {
    for (const evidence of condition.evidence ?? []) {
      if (inventory.has(evidence.source)) taskIds.add(evidence.source);
    }
  }
  return evaluateTaskPrerequisites({
    primary_task_ids: [...taskIds],
    support_task_ids: [],
    dominant_task_id: null,
  }, inventory);
}

function parseProcessProjection(source) {
  let block;
  try {
    block = extractTaskBlock(source, 'DELIV-PKG-002');
  } catch {
    return new Map();
  }
  const lines = block.split(/\r?\n/gu);
  const result = new Map();
  for (let index = 0; index < lines.length; index += 1) {
    const header = parseMarkdownRow(lines[index]);
    if (!header) continue;
    const normalized = header.map(normalizeHeader);
    if (!normalized.some((cell) => cell.includes('package_id'))) continue;
    if (!normalized.some((cell) => cell.includes('process_id') || cell.includes('proceso de contexto'))) continue;
    const separator = parseMarkdownRow(lines[index + 1]);
    if (!separatorRow(separator)) continue;
    const table = { header, normalizedHeader: normalized, rows: [] };
    for (let rowIndex = index + 2; rowIndex < lines.length; rowIndex += 1) {
      const cells = parseMarkdownRow(lines[rowIndex]);
      if (!cells) break;
      if (separatorRow(cells)) continue;
      table.rows.push(cells);
    }
    for (const row of table.rows) {
      const packageId = tableValue(row, table, ['package_id']);
      if (!/^GAP-PKG-\d{3}$/u.test(packageId)) continue;
      const entry = result.get(packageId) ?? { capability_ids: new Set(), process_ids: new Set(), gap_ids: new Set() };
      const capabilityId = tableValue(row, table, ['capability_id']);
      const processId = tableValue(row, table, ['process_id', 'proceso de contexto']);
      const gapId = tableValue(row, table, ['gap_id estable e1', 'gap_id', 'brecha fuente confirmada']);
      if (/^CAP-/u.test(capabilityId)) entry.capability_ids.add(capabilityId);
      if (/^VPROC-/u.test(processId)) entry.process_ids.add(processId);
      if (gapId && !/^N\/A$/iu.test(gapId)) entry.gap_ids.add(gapId);
      result.set(packageId, entry);
    }
  }
  return new Map([...result.entries()].map(([packageId, entry]) => [packageId, {
    capability_ids: [...entry.capability_ids].sort((left, right) => left.localeCompare(right, 'en')),
    process_ids: [...entry.process_ids].sort((left, right) => left.localeCompare(right, 'en')),
    gap_ids_sampled_from_deliv_pkg_002: [...entry.gap_ids].sort((left, right) => left.localeCompare(right, 'en')),
  }]));
}

export function parsePackageExecutionProjection(source) {
  const block = extractTaskBlock(source, 'DELIV-PKG-015');
  const table = findTable(block, ['package_id', 'dependencia entre paquetes', 'orden posterior al gate']);
  if (!table) {
    fail('DELIV-PKG-015 no contiene la matriz canónica de dependencias y orden de package.');
  }

  const projection = new Map();
  const dependencyCells = new Map();
  for (const row of table.rows) {
    const packageId = tableValue(row, table, ['package_id']);
    if (!/^GAP-PKG-\d{3}$/u.test(packageId)) continue;
    if (projection.has(packageId)) fail(`DELIV-PKG-015 duplica el orden de ${packageId}.`);
    const orderCurrent = tableValue(row, table, ['orden actual']);
    const orderAfterGate = tableValue(row, table, ['orden posterior al gate']);
    const layerMatch = orderAfterGate.match(/\bCapa\s+([0-4])\b/iu);
    const deferred = /^NO_EJECUTABLE$/iu.test(orderCurrent)
      || /\bSin orden f[ií]sico\b/iu.test(orderAfterGate)
      || !layerMatch;
    projection.set(packageId, {
      layer: layerMatch ? Number(layerMatch[1]) : null,
      depends_on_package_ids: [],
      order_current: orderCurrent,
      order_after_gate: orderAfterGate,
      deferred,
      deferred_reason: deferred ? `${orderCurrent || 'SIN_ORDEN_ACTUAL'}: ${orderAfterGate || 'SIN_ORDEN_POSTERIOR'}` : null,
    });
    dependencyCells.set(packageId, tableValue(row, table, ['dependencia entre paquetes']));
  }

  const dependenciesByPackage = new Map([...projection.keys()].map((packageId) => [packageId, new Set()]));
  for (const dependencyCell of dependencyCells.values()) {
    for (const match of dependencyCell.matchAll(/(GAP-PKG-\d{3})\s*(?:→|->)\s*(GAP-PKG-\d{3})/gu)) {
      const [, predecessorId, dependentId] = match;
      if (!projection.has(predecessorId) || !projection.has(dependentId)) {
        fail(`DELIV-PKG-015 contiene arista hacia package desconocido: ${predecessorId} → ${dependentId}.`);
      }
      dependenciesByPackage.get(dependentId).add(predecessorId);
    }
  }
  for (const [packageId, dependencies] of dependenciesByPackage) {
    projection.get(packageId).depends_on_package_ids = [...dependencies]
      .sort((left, right) => left.localeCompare(right, 'en'));
  }
  return projection;
}

export function parseCanonicalPackageCatalogFromSource(source, contract, gapRoutingSource = '') {
  const config = contract.canonical_package_catalog;
  const block = extractTaskBlock(source, config.final_decision_task);
  const table = findTable(block, ['package_id', 'decision final 025', 'condicion de salida']);
  if (!table) {
    fail(`${config.final_decision_task} no contiene la matriz final esperada de package_id y condiciones de salida.`);
  }
  const repositoryProjection = parseRepositoryProjection(source);
  const processProjection = parseProcessProjection(source);
  const taskRouting = parsePackageTaskRouting(gapRoutingSource);
  const membershipAudit = parseGapMembershipAudit(gapRoutingSource, config);
  const dominantProjection = parseDominantTaskProjection(source);
  const executionProjection = parsePackageExecutionProjection(source);
  const deploymentEnvironmentProjection = parseDeploymentEnvironmentProjection(source);
  const packages = [];
  const seen = new Set();
  for (const row of table.rows) {
    const packageId = tableValue(row, table, ['paquete', 'package_id']);
    if (!new RegExp(`^${escapeRegex(config.package_prefix)}-\\d{3}$`, 'u').test(packageId)) continue;
    if (seen.has(packageId)) fail(`Package canónico duplicado en ${config.final_decision_task}: ${packageId}.`);
    seen.add(packageId);
    packages.push({
      package_id: packageId,
      source_kind: 'CANONICAL_GAP_PACKAGE',
      disposition_025: tableValue(row, table, ['disposicion 025']),
      state_023: tableValue(row, table, ['estado 023 heredado', 'estado 023']),
      physical_state: tableValue(row, table, ['estado fisico heredado', 'estado fisico']),
      implementation_unit_id: tableValue(row, table, ['implementation_unit_id']),
      final_decision_025: tableValue(row, table, ['decision final 025']),
      exit_owner: tableValue(row, table, ['propietario de salida']),
      exit_condition: tableValue(row, table, ['condicion de salida']),
      ...(repositoryProjection.get(packageId) ?? {}),
      ...(processProjection.get(packageId) ?? { capability_ids: [], process_ids: [], gap_ids_sampled_from_deliv_pkg_002: [] }),
      ...(taskRouting.get(packageId) ?? { primary_task_ids: [], support_task_ids: [] }),
      ...(dominantProjection.get(packageId) ?? { dominant_task_id: null, runtime_profile_007: null, runtime_state_007: null }),
      execution: executionProjection.get(packageId) ?? null,
      ...(deploymentEnvironmentProjection.get(packageId) ?? {
        rollout_profile_019: null,
        deployment_environment_profile_019: null,
        rollout_result_019: null,
      }),
      gap_membership_count: membershipAudit.by_package.get(packageId) ?? 0,
    });
  }
  const expectedIds = canonicalIdSequence(config);
  const actualIds = packages.map(({ package_id: packageId }) => packageId).sort((left, right) => left.localeCompare(right, 'en'));
  if (actualIds.length !== config.expected_count) {
    fail(`Catálogo canónico incompleto: esperados ${config.expected_count} packages y encontrados ${actualIds.length}.`);
  }
  if (JSON.stringify(actualIds) !== JSON.stringify(expectedIds)) {
    const missing = expectedIds.filter((packageId) => !seen.has(packageId));
    const unexpected = actualIds.filter((packageId) => !expectedIds.includes(packageId));
    fail(`Catálogo GAP-PKG no contiguo. Faltantes: ${missing.join(', ') || 'NONE'}. Inesperados: ${unexpected.join(', ') || 'NONE'}.`);
  }
  const unrouted = packages.filter(({ primary_task_ids: primary = [] }) => primary.length === 0);
  if (unrouted.length > 0) {
    fail(`GAP-CTRL-006 no resolvió tarea primaria para ${unrouted.length} package(s): ${unrouted.slice(0, 10).map(({ package_id: packageId }) => packageId).join(', ')}${unrouted.length > 10 ? ', ...' : ''}.`);
  }
  const withoutDominant = packages.filter(({ dominant_task_id: dominant }) => !dominant);
  if (withoutDominant.length > 0) {
    fail(`DELIV-PKG-007 no resolvió tarea dominante para ${withoutDominant.length} package(s): ${withoutDominant.slice(0, 10).map(({ package_id: packageId }) => packageId).join(', ')}${withoutDominant.length > 10 ? ', ...' : ''}.`);
  }
  const withoutExecutionOrder = packages.filter(({ execution }) => !execution);
  if (withoutExecutionOrder.length > 0) {
    fail(`DELIV-PKG-015 no resolvió orden para ${withoutExecutionOrder.length} package(s): ${withoutExecutionOrder.slice(0, 10).map(({ package_id: packageId }) => packageId).join(', ')}${withoutExecutionOrder.length > 10 ? ', ...' : ''}.`);
  }
  const withoutDeploymentEnvironment = packages.filter(({ rollout_profile_019: rollout, deployment_environment_profile_019: environment }) => (
    !rollout || !environment
  ));
  if (withoutDeploymentEnvironment.length > 0) {
    fail(`DELIV-PKG-019 no resolvió rollout/ambiente para ${withoutDeploymentEnvironment.length} package(s): ${withoutDeploymentEnvironment.slice(0, 10).map(({ package_id: packageId }) => packageId).join(', ')}${withoutDeploymentEnvironment.length > 10 ? ', ...' : ''}.`);
  }
  return {
    catalog_id: config.catalog_id,
    source_file: config.source_file,
    identity_task: config.identity_task,
    relation_task: config.relation_task,
    owner_task: config.owner_task,
    final_decision_task: config.final_decision_task,
    expected_count: config.expected_count,
    expected_gap_memberships: config.expected_gap_memberships,
    membership_audit: {
      total: membershipAudit.total,
      historical: membershipAudit.historical,
      append_only: membershipAudit.append_only,
      unique_gap_ids: membershipAudit.unique_gap_ids,
      packages_covered: membershipAudit.packages_covered,
    },
    packages,
  };
}

function finalDecisionPass(value, contract) {
  const configured = new Set((contract.canonical_package_catalog.final_pass_values ?? []).map((entry) => String(entry).toUpperCase()));
  const normalized = normalizeScalar(value).toUpperCase();
  return configured.has(normalized) || PASS_WORDS.has(normalized);
}

function implementationUnitSatisfied(value) {
  const normalized = normalizeScalar(value).toUpperCase();
  if (!normalized) return false;
  return !/(?:NO_MATERIALIZADO|PENDIENTE|UNKNOWN|DESCONOCIDO|N\/A|NO_APLICA)/u.test(normalized);
}

function canonicalPackageBlockers(entry, contract, packageGate = null, deploymentEnvironment = null) {
  const blockers = [];
  if (deploymentEnvironment && deploymentEnvironment.status !== 'PASS') {
    blockers.push(`DEPLOYMENT_ENVIRONMENT:${deploymentEnvironment.status}:${deploymentEnvironment.detail}`);
  }
  if (packageGate?.approval_complete) return blockers;
  if (!finalDecisionPass(entry.state_023, contract)) blockers.push(`CANONICAL_EVIDENCE_STATE:${entry.state_023 || 'UNKNOWN'}`);
  if (!finalDecisionPass(entry.physical_state, contract)) blockers.push(`CANONICAL_PHYSICAL_STATE:${entry.physical_state || 'UNKNOWN'}`);
  if (!implementationUnitSatisfied(entry.implementation_unit_id)) blockers.push(`IMPLEMENTATION_UNIT:${entry.implementation_unit_id || 'UNKNOWN'}`);
  if (!finalDecisionPass(entry.final_decision_025, contract)) blockers.push(`CANONICAL_FINAL_DECISION:${entry.final_decision_025 || 'UNKNOWN'}`);
  blockers.push(`PACKAGE_GATE_INSTANCE:${packageGate?.status ?? 'NOT_PREPARED'}`);
  return [...new Set(blockers)];
}

function taskPrerequisiteBlockers(taskPrerequisites) {
  return (taskPrerequisites?.tasks ?? [])
    .filter(({ status }) => status !== 'PASS')
    .map(({ task_id: taskId, status }) => `TASK_PREREQUISITE:${taskId}:${status}`);
}

function canonicalDocumentaryGate({ entry, contract, inventory, taskPrerequisites, packageGate = null, deploymentEnvironment = null }) {
  const pass = packageGate?.approval_complete === true && deploymentEnvironment?.status === 'PASS';
  const template = taskEvidence(contract.gate.task_id, inventory);
  const blockers = [...canonicalPackageBlockers(entry, contract, packageGate, deploymentEnvironment), ...taskPrerequisiteBlockers(taskPrerequisites)];
  const checks = [
    {
      id: 'PACKAGE_ID_EXISTS',
      status: 'PASS',
      evidence: [{ source: entry.package_id, status: 'PASS', detail: `Identidad canónica ${entry.package_id} materializada por ${contract.canonical_package_catalog.identity_task}.` }],
    },
    {
      id: 'DELIV_PKG_DOSSIER_COMPLETE',
      status: pass ? 'PASS' : 'FAIL',
      evidence: [{
        source: packageGate?.relative_path ?? `${contract.canonical_package_catalog.final_decision_task}:${entry.package_id}`,
        status: pass ? 'PASS' : 'FAIL',
        detail: pass
          ? 'Expediente por package completo y APROBADO explícitamente.'
          : `Expediente ${packageGate?.status ?? 'NOT_PREPARED'}; salida: ${entry.exit_owner || 'UNKNOWN'}; condición: ${entry.exit_condition || 'UNKNOWN'}.`,
      }],
    },
    { id: 'E5_GATE_TEMPLATE_APPROVED', status: template.status, evidence: [template] },
    {
      id: 'ZERO_BLOCKERS',
      status: blockers.length === 0 ? 'PASS' : 'FAIL',
      evidence: blockers.length === 0
        ? [{ source: 'blockers', status: 'PASS', detail: '0 bloqueadores documentales.' }]
        : blockers.map((blocker) => ({ source: blocker, status: 'FAIL', detail: blocker })),
    },
  ];
  const status = aggregateEvidence(checks.map(({ status: checkStatus }) => ({ status: checkStatus })));
  return {
    gate_id: `${contract.gate.task_id}::${entry.package_id}`,
    status,
    pass: status === 'PASS',
    scope: 'DOCUMENTARY_GATE',
    checks,
  };
}

function canonicalPackageDossier(entry, contract, inventory, packageGate = null, deploymentEnvironment = null) {
  const pass = packageGate?.approval_complete === true && deploymentEnvironment?.status === 'PASS';
  const templates = contract.dossier_conditions.flatMap(({ deliv_pkg_refs: refs }) => refs.map((taskId) => taskEvidence(taskId, inventory)));
  const contractReady = templates.every(({ status }) => status === 'PASS');
  return {
    status: contractReady && pass ? 'PASS' : 'BLOCKED',
    contract_ready: contractReady,
    complete: contractReady && pass,
    checks: [{
      id: 'CANONICAL_DELIV_PKG_025_DECISION',
      label: 'Decisión final canónica DELIV-PKG-025',
      contract_sources: [contract.canonical_package_catalog.final_decision_task],
      contract_template_status: contractReady ? 'PASS' : 'FAIL',
      contract_template_evidence: templates,
      package_status: pass ? 'PASS' : 'FAIL',
      status: contractReady && pass ? 'PASS' : 'FAIL',
      evidence: [{
        source: packageGate?.relative_path ?? `${contract.canonical_package_catalog.final_decision_task}:${entry.package_id}`,
        status: pass ? 'PASS' : 'FAIL',
        detail: entry.exit_condition || entry.final_decision_025 || 'Sin detalle.',
      }],
    }],
    blockers: pass ? [] : [`CANONICAL_DELIV_PKG_025:${entry.final_decision_025 || 'UNKNOWN'}`],
  };
}

function canonicalGateProgress(pkg) {
  const canonical = pkg.canonical_prerequisites ?? null;
  const checks = [];
  if (canonical) {
    const gate = pkg.package_gate;
    checks.push({ id: 'EVIDENCE_023', status: gate?.gates?.EVIDENCE_023 ? 'PASS' : 'FAIL', detail: gate?.status ?? canonical.state_023 ?? 'NOT_PREPARED' });
    checks.push({ id: 'PHYSICAL_IDENTITY', status: gate?.gates?.PHYSICAL_IDENTITY ? 'PASS' : 'FAIL', detail: gate?.status ?? canonical.physical_state ?? 'NOT_PREPARED' });
    checks.push({ id: 'IMPLEMENTATION_UNIT', status: gate?.gates?.IMPLEMENTATION_UNIT ? 'PASS' : 'FAIL', detail: gate?.status ?? canonical.implementation_unit_id ?? 'NOT_PREPARED' });
    checks.push({ id: 'FINAL_DECISION_025', status: gate?.gates?.FINAL_DECISION_025 ? 'PASS' : 'FAIL', detail: gate?.status ?? canonical.final_decision_025 ?? 'NOT_PREPARED' });
  }
  const templateCheck = pkg.gate_documentary?.checks?.find(({ id }) => id === 'E5_GATE_TEMPLATE_APPROVED');
  if (templateCheck) checks.push({ id: 'E5_GATE_TEMPLATE', status: templateCheck.status, detail: templateCheck.evidence?.[0]?.detail ?? templateCheck.status });
  if (pkg.physical_dependencies) {
    checks.push({
      id: 'PHYSICAL_DEPENDENCIES',
      status: pkg.physical_dependencies.status,
      detail: pkg.physical_dependencies.status === 'PASS'
        ? 'Todas las instancias físicas requeridas están VERIFIED.'
        : `${pkg.physical_dependencies.evidence.filter(({ status }) => status !== 'PASS').length} dependencia(s) física(s) no VERIFIED.`,
    });
  }
  const passed = checks.filter(({ status }) => status === 'PASS').length;
  return {
    total: checks.length,
    passed,
    remaining: checks.length - passed,
    complete: checks.length > 0 && passed === checks.length,
    checks,
    missing: checks.filter(({ status }) => status !== 'PASS'),
  };
}

function packageReadinessProgress(pkg) {
  const tasks = pkg.task_prerequisites ?? { total: 0, approved: 0, remaining: 0, progress_percent: 100, complete: true, tasks: [], missing_task_ids: [] };
  const gates = canonicalGateProgress(pkg);
  return {
    task_prerequisites: tasks,
    gates,
    remaining_obligations: tasks.remaining + gates.remaining,
    implementation_ready: pkg.status === 'IMPLEMENTATION_READY' && (pkg.blockers ?? []).length === 0,
  };
}

export function auditPackageRegistry({ registry, canonicalCatalog = null }) {
  const packages = registry?.packages ?? [];
  const canonical = packages.filter(({ source_kind: sourceKind }) => sourceKind === 'CANONICAL_GAP_PACKAGE');
  const special = packages.filter(({ source_kind: sourceKind }) => sourceKind === 'SPECIAL_CAPABILITY');
  const errors = [];
  const warnings = [];
  const ids = packages.map(({ package_id: packageId }) => packageId);
  const duplicateIds = [...new Set(ids.filter((packageId, index) => ids.indexOf(packageId) !== index))];
  if (duplicateIds.length > 0) errors.push(`package_id duplicados: ${duplicateIds.join(', ')}.`);
  if (canonicalCatalog && canonical.length !== canonicalCatalog.expected_count) {
    errors.push(`catálogo efectivo ${canonical.length}/${canonicalCatalog.expected_count}.`);
  }
  const canonicalMemberships = canonical.reduce((total, pkg) => total + (pkg.gap_membership_count ?? 0), 0);
  if (canonicalCatalog && canonicalMemberships !== canonicalCatalog.expected_gap_memberships) {
    errors.push(`membresías efectivas ${canonicalMemberships}/${canonicalCatalog.expected_gap_memberships}.`);
  }

  const unknownTaskIds = new Set();
  for (const pkg of packages) {
    const tasks = pkg.task_prerequisites;
    if (!tasks || !Array.isArray(tasks.tasks)) {
      errors.push(`${pkg.package_id}: task_prerequisites ausente o inválido.`);
      continue;
    }
    const approved = tasks.tasks.filter(({ status }) => status === 'PASS').length;
    const remaining = tasks.tasks.length - approved;
    const missing = tasks.tasks.filter(({ status }) => status !== 'PASS').map(({ task_id: taskId }) => taskId);
    for (const task of tasks.tasks.filter(({ status }) => status === 'UNKNOWN')) unknownTaskIds.add(task.task_id);
    if (tasks.total !== tasks.tasks.length || tasks.approved !== approved || tasks.remaining !== remaining) {
      errors.push(`${pkg.package_id}: resumen de tareas inconsistente.`);
    }
    if (JSON.stringify(tasks.missing_task_ids ?? []) !== JSON.stringify(missing)) {
      errors.push(`${pkg.package_id}: missing_task_ids no coincide con las tareas no aprobadas.`);
    }
    const progress = pkg.readiness_progress;
    if (!progress || progress.remaining_obligations !== tasks.remaining + (progress.gates?.remaining ?? 0)) {
      errors.push(`${pkg.package_id}: remaining_obligations inconsistente.`);
    }
    if (pkg.status === 'IMPLEMENTATION_READY' && (pkg.blockers ?? []).length > 0) {
      errors.push(`${pkg.package_id}: IMPLEMENTATION_READY conserva bloqueadores.`);
    }
  }

  for (const pkg of canonical) {
    if (!Array.isArray(pkg.primary_task_ids) || pkg.primary_task_ids.length === 0) errors.push(`${pkg.package_id}: sin tarea primaria.`);
    if (!pkg.dominant_task_id) errors.push(`${pkg.package_id}: sin tarea dominante.`);
    if (!normalizeScalar(pkg.repository_owner)) errors.push(`${pkg.package_id}: sin repositorio propietario.`);
    if (!normalizeScalar(pkg.runtime_profile)) errors.push(`${pkg.package_id}: sin runtime_profile.`);
    if (!normalizeScalar(pkg.canonical_prerequisites?.exit_owner)) errors.push(`${pkg.package_id}: sin propietario de salida.`);
    if (!normalizeScalar(pkg.canonical_prerequisites?.exit_condition)) errors.push(`${pkg.package_id}: sin condición de salida.`);
    if (!Number.isInteger(pkg.gap_membership_count) || pkg.gap_membership_count < 1) errors.push(`${pkg.package_id}: sin membresía de brecha.`);
  }

  const queueIds = registry?.implementation_ready_queue?.map(({ package_id: packageId }) => packageId) ?? [];
  if (new Set(queueIds).size !== queueIds.length) errors.push('implementation_ready_queue contiene duplicados.');
  for (const packageId of queueIds) {
    const pkg = packages.find(({ package_id: id }) => id === packageId);
    if (!pkg || pkg.status !== 'IMPLEMENTATION_READY' || (pkg.blockers ?? []).length > 0) {
      errors.push(`${packageId}: entrada inválida en implementation_ready_queue.`);
    }
  }
  if (unknownTaskIds.size > 0) errors.push(`referencias de tarea desconocidas: ${[...unknownTaskIds].join(', ')}.`);

  const repositoryUnconfirmed = canonical.filter(({ repository_owner: owner }) => normalizeScalar(owner).toUpperCase() === 'NO_CONFIRMADO').length;
  if (repositoryUnconfirmed > 0) {
    warnings.push(`${repositoryUnconfirmed} package(s) conservan repositorio NO_CONFIRMADO por decisión canónica.`);
  }
  return {
    status: errors.length === 0 ? 'PASS' : 'FAIL',
    errors,
    warnings,
    metrics: {
      total_packages: packages.length,
      canonical_packages: canonical.length,
      special_packages: special.length,
      unique_package_ids: new Set(ids).size,
      canonical_with_primary_task: canonical.filter(({ primary_task_ids: taskIds }) => taskIds?.length > 0).length,
      canonical_with_dominant_task: canonical.filter(({ dominant_task_id: taskId }) => Boolean(taskId)).length,
      canonical_with_repository: canonical.filter(({ repository_owner: owner }) => Boolean(normalizeScalar(owner))).length,
      canonical_repository_unconfirmed: repositoryUnconfirmed,
      canonical_gap_memberships: canonical.reduce((total, pkg) => total + (pkg.gap_membership_count ?? 0), 0),
      task_links_total: packages.reduce((total, pkg) => total + (pkg.task_prerequisites?.total ?? 0), 0),
      task_links_approved: packages.reduce((total, pkg) => total + (pkg.task_prerequisites?.approved ?? 0), 0),
      task_links_remaining: packages.reduce((total, pkg) => total + (pkg.task_prerequisites?.remaining ?? 0), 0),
      unknown_task_references: unknownTaskIds.size,
    },
  };
}

function readImplementationInstances(root) {
  const directory = rel(root, READINESS_PATHS.implementationInstances);
  const instances = new Map();
  if (!fs.existsSync(directory)) return instances;
  for (const entry of fs.readdirSync(directory, { withFileTypes: true })) {
    if (!entry.isFile() || !entry.name.endsWith('.json')) continue;
    const filePath = path.join(directory, entry.name);
    let record;
    try {
      record = JSON.parse(fs.readFileSync(filePath, 'utf8'));
    } catch {
      fail(`${path.relative(root, filePath)} contiene JSON inválido.`);
    }
    if (record?.instance_id) instances.set(record.instance_id, record);
  }
  return instances;
}

function normalizedTargetPath(value) {
  return String(value ?? '')
    .replaceAll('\\', '/')
    .replace(/^\.\/+/u, '')
    .trim();
}

function targetRequiresSupabaseFoundation(relativePath, foundation) {
  const normalized = normalizedTargetPath(relativePath);
  if (!normalized) return false;

  const excluded = foundation?.excluded_target_path_prefixes ?? [];
  if (excluded.some((prefix) => normalized.startsWith(String(prefix)))) return false;

  const exact = foundation?.applies_to_exact_target_paths ?? [];
  if (exact.includes(normalized)) return true;

  return (foundation?.applies_to_target_path_prefixes ?? [])
    .some((prefix) => normalized.startsWith(String(prefix)));
}

export function derivePackageExecutionRequirements({ contract, packageGate = null } = {}) {
  const foundation = contract?.physical_dependencies?.supabase_pre_e5_foundation ?? null;
  const targets = Array.isArray(packageGate?.physical_identity?.targets)
    ? packageGate.physical_identity.targets
    : [];

  const targetPaths = targets
    .map((target) => normalizedTargetPath(target?.path))
    .filter(Boolean);

  const supabaseMutationRequired = Boolean(foundation)
    && targetPaths.some((relativePath) => targetRequiresSupabaseFoundation(relativePath, foundation));

  if (!supabaseMutationRequired) {
    return {
      supabase_mutation_required: false,
      target_paths: targetPaths,
      required_verified_instance_refs: [],
      pre_entry_foundation_gates: [],
      remote_environment_identity: null,
      in_package_candidate_gate: null,
    };
  }

  return {
    supabase_mutation_required: true,
    target_paths: targetPaths,
    required_verified_instance_refs: [...(foundation.required_verified_instances ?? [])],
    pre_entry_foundation_gates: (foundation.ordered_foundation_gates ?? []).map((gate) => ({ ...gate })),
    remote_environment_identity: foundation.remote_environment_identity
      ? structuredClone(foundation.remote_environment_identity)
      : null,
    in_package_candidate_gate: foundation.in_package_candidate_gate
      ? { ...foundation.in_package_candidate_gate }
      : null,
  };
}

export function evaluatePackageDeploymentEnvironment({ entry, packageGate = null, executionRequirements = null } = {}) {
  const declared = packageGate?.deployment_environment ?? null;
  const expectedRollout = String(entry?.rollout_profile_019 ?? '').trim();
  const expectedEnvironment = String(entry?.deployment_environment_profile_019 ?? '').trim();
  const problems = [];

  if (!declared) {
    problems.push('DECLARATION_MISSING');
  } else {
    if (declared.canonical_task_id !== 'DELIV-PKG-019') problems.push('CANONICAL_TASK_MISMATCH');
    if (String(declared.rollout_profile ?? '').trim() !== expectedRollout) problems.push('ROLLOUT_PROFILE_MISMATCH');
    if (String(declared.environment_profile ?? '').trim() !== expectedEnvironment) problems.push('ENVIRONMENT_PROFILE_MISMATCH');
  }

  if (declared && expectedEnvironment === 'ENV-SUPABASE-LOCAL-CI-STAGING') {
    if (executionRequirements?.supabase_mutation_required !== true) {
      problems.push('SUPABASE_FOUNDATION_NOT_APPLICABLE');
    }
    const binding = executionRequirements?.remote_environment_identity?.bindings?.STAGING ?? null;
    const targets = Array.isArray(declared.targets) ? declared.targets : [];
    const stagingTargets = targets.filter((target) => String(target?.environment_role ?? '').trim().toUpperCase() === 'STAGING');
    const productionTargets = targets.filter((target) => String(target?.environment_role ?? '').trim().toUpperCase() === 'PRODUCTION');
    if (!binding) problems.push('STAGING_BINDING_MISSING');
    if (stagingTargets.length !== 1) problems.push(`STAGING_TARGET_COUNT_${stagingTargets.length}`);
    if (declared.production_authorized !== false) problems.push('PRODUCTION_MUST_REMAIN_UNAUTHORIZED');
    if (productionTargets.length > 0) problems.push('PRODUCTION_TARGET_FORBIDDEN');
    if (binding && stagingTargets.length === 1) {
      const target = stagingTargets[0];
      if (String(target.target_type ?? '').trim().toUpperCase() !== 'SUPABASE_PROJECT_REF') problems.push('STAGING_TARGET_TYPE_MISMATCH');
      if (String(target.target_id ?? '').trim() !== String(binding.project_ref ?? '').trim()) problems.push('STAGING_PROJECT_REF_MISMATCH');
      if (String(target.owner ?? '').trim() !== String(binding.owner ?? '').trim()) problems.push('STAGING_OWNER_MISMATCH');
    }
  }

  return {
    status: problems.length === 0 ? 'PASS' : 'FAIL',
    expected_rollout_profile: expectedRollout || null,
    expected_environment_profile: expectedEnvironment || null,
    declared,
    problems,
    detail: problems.length === 0
      ? `DELIV-PKG-019 coincide con ${expectedRollout}/${expectedEnvironment}.`
      : problems.join(', '),
  };
}

function physicalDependencyInstanceIds(contract, capability, executionRequirements = null) {
  const ids = [];

  for (const range of contract.physical_dependencies?.global_verified_ranges ?? []) {
    ids.push(...rangeTaskIds(range).map((taskId) => `${taskId}::GLOBAL`));
  }

  for (const selector of capability?.physical_dependencies ?? []) {
    if (Array.isArray(selector.global_task_refs)) {
      ids.push(...selector.global_task_refs.map((taskId) => `${taskId}::GLOBAL`));
    }
    if (selector.global_task_range) {
      ids.push(...rangeTaskIds(selector.global_task_range).map((taskId) => `${taskId}::GLOBAL`));
    }
    if (Array.isArray(selector.instance_refs)) ids.push(...selector.instance_refs);
  }

  ids.push(...(executionRequirements?.required_verified_instance_refs ?? []));

  return [...new Set(ids)];
}

function remoteEnvironmentProblems(identity) {
  if (!identity) return ['remote_environment_identity ausente.'];

  const roles = identity.required_environment_roles ?? [];
  const problems = [];
  const refs = [];

  for (const role of roles) {
    const binding = identity.bindings?.[role] ?? null;

    if (!binding) {
      problems.push(`${role}=BINDING_MISSING`);
      continue;
    }

    const classification = String(binding.classification ?? '').trim();

    if (classification === 'UNRESOLVED_BLOCKING') {
      problems.push(`${role}=UNRESOLVED_BLOCKING`);
      continue;
    }

    if (classification !== role) {
      problems.push(`${role}=CLASSIFICATION_${classification || 'MISSING'}`);
      continue;
    }

    const projectRef = String(binding.project_ref ?? '').trim();
    const owner = String(binding.owner ?? '').trim();

    if (!projectRef) problems.push(`${role}=PROJECT_REF_MISSING`);
    if (!owner) problems.push(`${role}=OWNER_MISSING`);

    if (projectRef) refs.push(projectRef);
  }

  if (refs.length !== new Set(refs).size) {
    problems.push('STAGING_PRODUCTION_PROJECT_REF_NOT_DISTINCT');
  }

  return problems;
}

function evaluateFoundationGate(gate, executionRequirements) {
  const validated = validateFoundationEvidenceRef(gate, gate?.evidence_ref);
  let { status, detail } = validated;

  if (gate?.foundation_id === 'MRP015-010') {
    const problems = remoteEnvironmentProblems(executionRequirements?.remote_environment_identity);
    if (problems.length > 0) {
      status = gate?.evidence_ref ? 'FAIL' : 'UNKNOWN';
      detail = `ENVIRONMENT_READY pendiente o contradictorio; ${problems.join(', ')}.`;
    }
  }

  return {
    source: `${gate.foundation_id}::${gate.gate_id}`,
    kind: 'FOUNDATION_GATE',
    foundation_id: gate.foundation_id,
    gate_id: gate.gate_id,
    owner_task: gate.owner_task,
    status,
    detail,
  };
}

export function evaluatePhysicalDependencies({
  contract,
  instances,
  capability = null,
  executionRequirements = null,
}) {
  const evidence = [];

  for (const instanceId of physicalDependencyInstanceIds(
    contract,
    capability,
    executionRequirements,
  )) {
    const record = instances.get(instanceId);

    if (!record) {
      evidence.push({
        source: instanceId,
        kind: 'IMPLEMENTATION_INSTANCE',
        status: 'UNKNOWN',
        detail: 'Instancia física requerida no encontrada.',
      });
    } else if (record.status === 'VERIFIED') {
      evidence.push({
        source: instanceId,
        kind: 'IMPLEMENTATION_INSTANCE',
        status: 'PASS',
        detail: 'VERIFIED.',
      });
    } else {
      evidence.push({
        source: instanceId,
        kind: 'IMPLEMENTATION_INSTANCE',
        status: 'FAIL',
        detail: `Estado ${record.status ?? 'DESCONOCIDO'}; se requiere VERIFIED.`,
      });
    }
  }

  for (const gate of executionRequirements?.pre_entry_foundation_gates ?? []) {
    evidence.push(evaluateFoundationGate(gate, executionRequirements));
  }

  return {
    status: aggregateEvidence(evidence),
    available: evidence.length > 0 && evidence.every(({ status }) => status === 'PASS'),
    evidence,
  };
}

export function assertPackagePhysicalDependenciesReady({
  registry,
  packageId,
  operation = 'PACKAGE_PHYSICAL_OPERATION',
} = {}) {
  const normalized = String(packageId ?? '').trim().toUpperCase();
  const pkg = registry?.packages?.find(({ package_id: id }) => id === normalized) ?? null;

  if (!pkg) {
    throw new Error(`${operation}: package inexistente ${normalized || 'EMPTY'}.`);
  }

  const blocker = (pkg.physical_dependencies?.evidence ?? [])
    .find(({ status }) => status !== 'PASS') ?? null;

  if (blocker) {
    throw new Error(
      `${operation}: ${normalized} bloqueado por ${blocker.source} `
      + `(${blocker.status}); ${blocker.detail}`,
    );
  }

  if (pkg.physical_dependencies?.status !== 'PASS') {
    throw new Error(`${operation}: ${normalized} no conserva physical_dependencies=PASS.`);
  }

  return true;
}



function blockersStatus(blockers) {
  if (blockers.length === 0) return 'PASS';
  if (blockers.some((blocker) => /:FAIL(?:$|:)/u.test(blocker) || blocker.startsWith('BUSINESS_DECISION:'))) return 'FAIL';
  if (blockers.some((blocker) => /:UNKNOWN(?:$|:)/u.test(blocker))) return 'UNKNOWN';
  return 'FAIL';
}

function dossierGateStatus(dossier) {
  if (dossier.complete) return 'PASS';
  if (dossier.checks.some(({ status }) => status === 'FAIL')) return 'FAIL';
  return 'UNKNOWN';
}

function evaluateDocumentaryGate({ packageId, dossier, contract, inventory, blockers }) {
  const template = taskEvidence(contract.gate.task_id, inventory);
  const zeroBlockersStatus = blockersStatus(blockers);
  const checks = [
    { id: 'PACKAGE_ID_EXISTS', status: packageId ? 'PASS' : 'FAIL', evidence: [{ source: packageId || 'package_id', status: packageId ? 'PASS' : 'FAIL', detail: packageId ? 'Identidad exacta disponible.' : 'Falta package_id.' }] },
    { id: 'DELIV_PKG_DOSSIER_COMPLETE', status: dossierGateStatus(dossier), evidence: dossier.checks.flatMap(({ evidence, contract_template_evidence: templateEvidence }) => [...(templateEvidence ?? []), ...(evidence ?? [])]) },
    { id: 'E5_GATE_TEMPLATE_APPROVED', status: template.status, evidence: [template] },
    { id: 'ZERO_BLOCKERS', status: zeroBlockersStatus, evidence: blockers.length === 0 ? [{ source: 'blockers', status: 'PASS', detail: '0 bloqueadores documentales.' }] : blockers.map((blocker) => ({ source: blocker, status: zeroBlockersStatus, detail: blocker })) },
  ];
  const status = aggregateEvidence(checks.map((check) => ({ status: check.status })));
  return { gate_id: `${contract.gate.task_id}::${packageId}`, status, pass: status === 'PASS', scope: 'DOCUMENTARY_GATE', checks };
}

function evaluateEffectiveGate(documentaryGate, physicalDependencies) {
  const physicalCheck = { id: 'PHYSICAL_DEPENDENCIES_AVAILABLE', status: physicalDependencies.status, evidence: physicalDependencies.evidence };
  const checks = [...documentaryGate.checks, physicalCheck];
  const status = aggregateEvidence(checks.map((check) => ({ status: check.status })));
  return { gate_id: documentaryGate.gate_id, status, pass: status === 'PASS', scope: 'EFFECTIVE_PACKAGE_GATE', checks };
}

export function physicalLifecycleStatus(packageId, instances, contract) {
  const taskIds = [
    contract.implementation_entry_task,
    'SHELL-CI-021',
    'SHELL-CI-022',
    'SHELL-CI-023',
    'SHELL-CI-024',
  ];
  const instanceIds = taskIds.map((taskId) => `${taskId}::${packageId}`);
  const records = instanceIds.map((instanceId) => instances.get(instanceId) ?? null);
  const firstUnverified = records.findIndex((record) => record?.status !== 'VERIFIED');

  if (firstUnverified < 0) {
    const last = records.at(-1);
    return { status: 'CLOSED', source: last.instance_id, nextExecution: null };
  }

  const future = records
    .slice(firstUnverified + 1)
    .filter(Boolean)
    .map((record) => `${record.instance_id}:${record.status ?? 'UNKNOWN'}`);
  if (future.length > 0) {
    fail(
      `PHYSICAL_STAGE_SEQUENCE_VIOLATION: ${packageId} espera ${instanceIds[firstUnverified]}; `
      + `etapas futuras materializadas: ${future.join(', ')}.`,
    );
  }

  const current = records[firstUnverified];
  if (firstUnverified === 0) {
    if (current && PHYSICAL_ACTIVE.has(current.status)) {
      return { status: 'IMPLEMENTING', source: current.instance_id, nextExecution: current.instance_id };
    }
    return null;
  }

  const previous = records[firstUnverified - 1];
  return {
    status: 'DEPLOYED',
    source: current?.instance_id ?? previous.instance_id,
    nextExecution: instanceIds[firstUnverified],
  };
}

function compactPackageForPersistence(pkg) {
  const sourceKind = pkg.source_kind ?? 'SPECIAL_CAPABILITY';
  const compact = {
    package_id: pkg.package_id,
    source_kind: sourceKind,
    status: pkg.status,
    status_scope: 'DOCUMENTARY_READINESS',
    detected_at: pkg.detected_at ?? null,
    ready_for_gate_at: pkg.ready_for_gate_at ?? null,
    last_status_change_at: pkg.last_status_change_at ?? pkg.detected_at ?? null,
    updated_at: pkg.updated_at ?? null,
  };

  if (sourceKind === 'SPECIAL_CAPABILITY') {
    compact.capability_id = pkg.capability_id;
    compact.status_history = Array.isArray(pkg.status_history) ? pkg.status_history : [];
    compact.package_evidence = pkg.package_evidence ?? {};
    compact.compiled_at = pkg.compiled_at ?? null;
  }

  return compact;
}

export function compactRegistryForPersistence(registry) {
  return {
    schema_version: 1,
    registry_id: registry.registry_id ?? 'VENTO-IMPLEMENTATION-PACKAGE-REGISTRY-001',
    status_scope: 'DOCUMENTARY_READINESS',
    physical_status_projection: READINESS_PATHS.reportJson,
    packages: (registry.packages ?? []).map(compactPackageForPersistence),
  };
}

function semanticPackageSnapshot(pkg) {
  const snapshot = compactPackageForPersistence(pkg);
  delete snapshot.updated_at;
  return snapshot;
}

function sameSemanticPackage(left, right) {
  return JSON.stringify(semanticPackageSnapshot(left)) === JSON.stringify(semanticPackageSnapshot(right));
}

function initialStatusHistory(status, contract, timestamp) {
  const sequence = contract.package_statuses ?? [];
  const target = sequence.indexOf(status);
  if (target < 0) return [{ status, at: timestamp, reason: 'AUTO_RECONCILE' }];
  const allowedBootstrap = new Set(['DISCOVERED', 'READY_FOR_COMPILATION', 'COMPILED', 'READY_FOR_GATE', 'IMPLEMENTATION_READY']);
  const history = sequence
    .slice(0, target + 1)
    .filter((candidate) => allowedBootstrap.has(candidate))
    .map((candidate) => ({ status: candidate, at: timestamp, reason: 'AUTO_RECONCILE' }));
  if (history.at(-1)?.status !== status) history.push({ status, at: timestamp, reason: 'AUTO_RECONCILE' });
  return history;
}

function reconcileStatusHistory(previous, status, contract, timestamp) {
  if (!previous) return initialStatusHistory(status, contract, timestamp);
  const history = Array.isArray(previous.status_history) ? [...previous.status_history] : [];
  if (history.length === 0) history.push({ status: previous.status ?? 'DISCOVERED', at: previous.detected_at ?? timestamp, reason: 'IMPORTED' });
  if (previous.status !== status) history.push({ status, at: timestamp, reason: 'RECONCILED' });
  return history;
}

function reconcileSpecialRegistry({ registry, capabilityResults, capabilityIndex, contract, inventory, priorityLanes, now }) {
  const previousByCapability = new Map(
    registry.packages
      .filter((pkg) => (pkg.source_kind ?? 'SPECIAL_CAPABILITY') === 'SPECIAL_CAPABILITY' && pkg.capability_id)
      .map((pkg) => [pkg.capability_id, pkg]),
  );
  const packages = [];
  for (const capabilityResult of capabilityResults) {
    const capability = capabilityIndex.capabilities[capabilityResult.capability_id];
    const previous = previousByCapability.get(capabilityResult.capability_id) ?? null;
    if (!previous && !capabilityResult.capability_ready && !capability.canonical_package_id) continue;
    const timestamp = now();
    const packageId = previous?.package_id ?? nextPackageId(capability, registry.packages);
    const dossier = evaluateDossier({ previousPackage: previous, contract, inventory });
    const businessBlockers = [];
    const laneEvidence = laneDecisionEvidence(capability, priorityLanes);
    if (laneEvidence?.status === 'FAIL') businessBlockers.push(`BUSINESS_DECISION:${laneEvidence.source}:${laneEvidence.detail}`);
    if (laneEvidence?.status === 'UNKNOWN') businessBlockers.push(`BUSINESS_DECISION:${laneEvidence.source}:UNKNOWN`);
    const taskPrerequisites = capabilityTaskPrerequisites(capabilityResult, inventory);
    const capabilityBlockers = capabilityResult.blockers.map(({ id, status }) => `CAPABILITY:${id}:${status}`);
    const dossierBlockers = dossier.blockers.map((blocker) => `DOSSIER:${blocker}`);
    const documentaryBlockers = [...businessBlockers, ...capabilityBlockers, ...dossierBlockers];
    const documentaryGate = evaluateDocumentaryGate({ packageId, dossier, contract, inventory, blockers: documentaryBlockers });
    let status = 'READY_FOR_COMPILATION';
    if (!capabilityResult.capability_ready) status = 'MATURING';
    else if (!dossier.contract_ready) status = 'READY_FOR_COMPILATION';
    else if (!dossier.complete) status = 'COMPILED';
    else status = 'READY_FOR_GATE';
    const blockers = [...documentaryBlockers, ...documentaryGate.checks
      .filter(({ status: checkStatus }) => checkStatus === 'FAIL' || checkStatus === 'UNKNOWN')
      .map(({ id, status: checkStatus }) => `GATE_DOCUMENTARY:${id}:${checkStatus}`)];
    const draft = {
      package_id: packageId,
      source_kind: 'SPECIAL_CAPABILITY',
      capability_id: capabilityResult.capability_id,
      objective: capability.objective,
      owner_application: capability.owner_application,
      execution: capability.execution ?? {
        layer: null,
        depends_on_package_ids: [],
        deferred: true,
        deferred_reason: 'NO_CANONICAL_EXECUTION_ORDER',
      },
      priority_lane_id: capability.priority_lane_id ?? null,
      status,
      status_scope: 'DOCUMENTARY_READINESS',
      capability_status: capabilityResult.status,
      task_prerequisites: taskPrerequisites,
      status_history: reconcileStatusHistory(previous, status, contract, timestamp),
      dossier,
      gate_documentary: documentaryGate,
      blockers: [...new Set(blockers)],
      package_evidence: previous?.package_evidence ?? {},
      detected_at: previous?.detected_at ?? timestamp,
      compiled_at: dossier.contract_ready ? previous?.compiled_at ?? timestamp : previous?.compiled_at ?? null,
      ready_for_gate_at: status === 'READY_FOR_GATE' ? previous?.ready_for_gate_at ?? timestamp : previous?.ready_for_gate_at ?? null,
      last_status_change_at: previous?.status === status ? previous?.last_status_change_at ?? previous?.detected_at ?? timestamp : timestamp,
      updated_at: previous?.updated_at ?? timestamp,
    };
    if (previous && sameSemanticPackage(previous, draft)) draft.updated_at = previous.updated_at;
    else if (previous) draft.updated_at = timestamp;
    packages.push(draft);
  }
  return packages;
}

function reconcileCanonicalRegistry({ registry, catalog, contract, inventory, packageGateRecords, packageGatePolicy, now }) {
  const previousById = new Map(registry.packages.map((pkg) => [pkg.package_id, pkg]));
  return catalog.packages.map((entry) => {
    const previous = previousById.get(entry.package_id) ?? null;
    const timestamp = now();
    const taskPrerequisites = evaluateTaskPrerequisites(entry, inventory);
    const gateRecord = packageGateRecords?.get(entry.package_id) ?? null;
    const packageGate = gateRecord
      ? assessPackageGateRecord(gateRecord, {
        taskPrerequisites,
        policy: packageGatePolicy,
        relativePath: packageGateRecordRelativePath(entry.package_id, packageGatePolicy),
      })
      : null;
    const executionRequirements = derivePackageExecutionRequirements({ contract, packageGate: gateRecord });
    const deploymentEnvironment = evaluatePackageDeploymentEnvironment({
      entry,
      packageGate,
      executionRequirements,
    });
    const canonicalBlockers = canonicalPackageBlockers(entry, contract, packageGate, deploymentEnvironment);
    const taskBlockers = taskPrerequisiteBlockers(taskPrerequisites);
    const blockers = [...new Set([...canonicalBlockers, ...taskBlockers])];
    const status = blockers.length === 0 ? 'READY_FOR_GATE' : 'COMPILED';
    const dossier = canonicalPackageDossier(entry, contract, inventory, packageGate, deploymentEnvironment);
    const documentaryGate = canonicalDocumentaryGate({
      entry,
      contract,
      inventory,
      taskPrerequisites,
      packageGate,
      deploymentEnvironment,
    });
    const draft = {
      package_id: entry.package_id,
      source_kind: 'CANONICAL_GAP_PACKAGE',
      capability_id: null,
      capability_ids: entry.capability_ids ?? [],
      process_ids: entry.process_ids ?? [],
      gap_membership_count: entry.gap_membership_count ?? 0,
      objective: `Paquete canónico ${entry.package_id} materializado por E5`,
      owner_application: null,
      repository_owner: entry.repository_owner ?? null,
      runtime_profile: entry.runtime_profile ?? null,
      execution: entry.execution,
      execution_requirements: executionRequirements,
      deployment_environment: deploymentEnvironment,
      status,
      status_scope: 'DOCUMENTARY_READINESS',
      capability_status: 'CANONICAL_E5_PACKAGE',
      task_prerequisites: taskPrerequisites,
      dominant_task_id: entry.dominant_task_id ?? null,
      primary_task_ids: entry.primary_task_ids ?? [],
      support_task_ids: entry.support_task_ids ?? [],
      status_history: reconcileStatusHistory(previous, status, contract, timestamp),
      canonical_prerequisites: {
        disposition_025: entry.disposition_025,
        state_023: entry.state_023,
        physical_state: entry.physical_state,
        implementation_unit_id: entry.implementation_unit_id,
        final_decision_025: entry.final_decision_025,
        exit_owner: entry.exit_owner,
        exit_condition: entry.exit_condition,
        inherited_gate_017: entry.inherited_gate_017 ?? null,
        test_profile_016: entry.test_profile_016 ?? null,
        observability_017: entry.observability_017 ?? null,
        rollout_profile_019: entry.rollout_profile_019 ?? null,
        deployment_environment_profile_019: entry.deployment_environment_profile_019 ?? null,
        rollout_result_019: entry.rollout_result_019 ?? null,
      },
      dossier,
      gate_documentary: documentaryGate,
      package_gate: packageGate,
      blockers,
      package_evidence: previous?.package_evidence ?? {},
      detected_at: previous?.detected_at ?? timestamp,
      compiled_at: previous?.compiled_at ?? timestamp,
      ready_for_gate_at: status === 'READY_FOR_GATE' ? previous?.ready_for_gate_at ?? timestamp : previous?.ready_for_gate_at ?? null,
      last_status_change_at: previous?.status === status ? previous?.last_status_change_at ?? previous?.detected_at ?? timestamp : timestamp,
      updated_at: previous?.updated_at ?? timestamp,
    };
    if (previous && sameSemanticPackage(previous, draft)) draft.updated_at = previous.updated_at;
    else if (previous) draft.updated_at = timestamp;
    return draft;
  });
}

export function reconcileRegistry({
  registry,
  capabilityResults,
  capabilityIndex,
  contract,
  inventory,
  priorityLanes,
  canonicalCatalog = null,
  packageGateRecords = new Map(),
  packageGatePolicy = null,
  now = () => new Date().toISOString(),
}) {
  const specialPackages = reconcileSpecialRegistry({
    registry,
    capabilityResults,
    capabilityIndex,
    contract,
    inventory,
    priorityLanes,
    now,
  });
  const canonicalPackages = canonicalCatalog
    ? reconcileCanonicalRegistry({ registry, catalog: canonicalCatalog, contract, inventory, packageGateRecords, packageGatePolicy, now })
    : [];
  const activeIds = new Set([...canonicalPackages, ...specialPackages].map(({ package_id: packageId }) => packageId));
  const orphaned = registry.packages
    .filter((pkg) => !activeIds.has(pkg.package_id))
    .map((pkg) => ({ ...pkg, blockers: [...new Set([...(pkg.blockers ?? []), 'PACKAGE_REMOVED_FROM_ACTIVE_SOURCES'])] }));
  const packages = [...canonicalPackages, ...specialPackages, ...orphaned]
    .sort((left, right) => left.package_id.localeCompare(right.package_id, 'en'));
  return {
    schema_version: 1,
    registry_id: registry.registry_id ?? 'VENTO-IMPLEMENTATION-PACKAGE-REGISTRY-001',
    status_scope: 'DOCUMENTARY_READINESS',
    physical_status_projection: READINESS_PATHS.reportJson,
    packages,
  };
}

function activePriorityLane(packageId, priorityLanes) {
  const lane = (priorityLanes?.lanes ?? []).find(({ lane_id: laneId }) => laneId === packageId);
  if (!lane) return false;
  const status = String(lane.status ?? '').toUpperCase();
  return lane.active !== false && !BLOCKING_LANE_STATES.has(status);
}

export function prioritizeImplementationReadyQueue(queue) {
  return [...queue].sort((left, right) => left.package_id.localeCompare(right.package_id, 'en'));
}

function nearestToReady(packages, contract) {
  const limit = Number.isInteger(contract.queue_policy?.nearest_to_ready_limit)
    ? contract.queue_policy.nearest_to_ready_limit
    : 10;
  return packages
    .filter((pkg) => !['IMPLEMENTATION_READY', 'IMPLEMENTING', 'DEPLOYED', 'CLOSED'].includes(pkg.status))
    .filter((pkg) => pkg.canonical_prerequisites?.physical_state !== 'FUERA_DE_LINEA_ACTUAL')
    .map((pkg) => {
      const progress = pkg.readiness_progress ?? packageReadinessProgress(pkg);
      return {
        package_id: pkg.package_id,
        source_kind: pkg.source_kind,
        status: pkg.status,
        remaining_obligations: progress.remaining_obligations,
        task_progress: {
          approved: progress.task_prerequisites.approved,
          total: progress.task_prerequisites.total,
          remaining: progress.task_prerequisites.remaining,
          progress_percent: progress.task_prerequisites.progress_percent,
          missing_task_ids: progress.task_prerequisites.missing_task_ids,
        },
        gate_progress: {
          passed: progress.gates.passed,
          total: progress.gates.total,
          remaining: progress.gates.remaining,
          missing: progress.gates.missing,
        },
        blockers: pkg.blockers ?? [],
        exit_owner: pkg.canonical_prerequisites?.exit_owner ?? null,
        exit_condition: pkg.canonical_prerequisites?.exit_condition ?? null,
      };
    })
    .sort((left, right) => left.remaining_obligations - right.remaining_obligations
      || left.task_progress.remaining - right.task_progress.remaining
      || left.package_id.localeCompare(right.package_id, 'en'))
    .slice(0, limit);
}

export function applyPhysicalOverlay({ registry, contract, instances, capabilityIndex, priorityLanes = { lanes: [] } }) {
  const packages = registry.packages.map((persisted) => {
    const capability = persisted.source_kind === 'SPECIAL_CAPABILITY'
      ? capabilityIndex.capabilities[persisted.capability_id] ?? null
      : null;
    const physicalDependencies = evaluatePhysicalDependencies({
      contract,
      instances,
      capability,
      executionRequirements: persisted.execution_requirements ?? null,
    });
    const effectiveGate = evaluateEffectiveGate(persisted.gate_documentary, physicalDependencies);
    const physical = physicalLifecycleStatus(persisted.package_id, instances, contract);
    const physicalEntryInstance = instances.get(
      `${contract.implementation_entry_task}::${persisted.package_id}`,
    ) ?? null;
    let status = persisted.status;
    if (physical) status = physical.status;
    else if (persisted.status === 'READY_FOR_GATE' && effectiveGate.pass) status = 'IMPLEMENTATION_READY';
    const history = [...(persisted.status_history ?? [])];
    if (history.at(-1)?.status !== status) history.push({ status, at: null, reason: 'EFFECTIVE_RUNTIME_PROJECTION' });
    const physicalBlockers = physicalDependencies.status === 'PASS' ? [] : [`PHYSICAL_DEPENDENCIES:${physicalDependencies.status}`];
    const templateBlockers = effectiveGate.checks
      .filter(({ id, status: checkStatus }) => id === 'E5_GATE_TEMPLATE_APPROVED' && checkStatus !== 'PASS')
      .map(({ status: checkStatus }) => `GATE_TEMPLATE:${checkStatus}`);
    const effectiveBlockers = status === 'IMPLEMENTATION_READY'
      ? []
      : [...(persisted.blockers ?? []), ...physicalBlockers, ...templateBlockers];
    const packageGateNext = persisted.source_kind === 'CANONICAL_GAP_PACKAGE'
      ? persisted.package_gate
        ? `npm run docs:package:gate:status -- --package-id ${persisted.package_id}`
        : `npm run docs:package:start -- --package-id ${persisted.package_id}`
      : null;
    const projected = {
      ...persisted,
      status,
      status_scope: 'EFFECTIVE_RUNTIME',
      persisted_status: persisted.status,
      status_history: history,
      gate: effectiveGate,
      physical_dependencies: physicalDependencies,
      physical_entry_instance: physicalEntryInstance
        ? {
          instance_id: physicalEntryInstance.instance_id,
          status: physicalEntryInstance.status,
        }
        : null,
      blockers: [...new Set(effectiveBlockers)],
      next_execution: status === 'IMPLEMENTATION_READY'
        ? `${contract.implementation_entry_task}::${persisted.package_id}`
        : physical?.nextExecution ?? packageGateNext,
    };
    projected.readiness_progress = packageReadinessProgress(projected);
    return projected;
  });

  const unsortedQueue = packages
    .filter(({ status, blockers }) => status === 'IMPLEMENTATION_READY' && blockers.length === 0)
    .map((pkg) => ({
      package_id: pkg.package_id,
      capability_id: pkg.capability_id,
      capability_ids: pkg.capability_ids ?? [],
      owner_application: pkg.owner_application,
      repository_owner: pkg.repository_owner ?? null,
      source_kind: pkg.source_kind,
      status: 'READY',
      gate_id: pkg.gate.gate_id,
      next_execution: pkg.next_execution,
      ready_for_gate_at: pkg.ready_for_gate_at ?? null,
      explicit_priority_lane: activePriorityLane(pkg.package_id, priorityLanes),
      physical_authorization_required: true,
    }));
  const implementationReadyQueue = prioritizeImplementationReadyQueue(unsortedQueue);
  const nearest = nearestToReady(packages, contract);
  return {
    ...registry,
    status_scope: 'EFFECTIVE_RUNTIME',
    packages,
    implementation_ready_queue: implementationReadyQueue,
    nearest_to_ready_queue: nearest,
  };
}

export function discoverCanonicalPackageIds(root = process.cwd(), priorityLanes = { lanes: [] }) {
  const ids = new Set(
    (priorityLanes?.lanes ?? [])
      .map(({ lane_id: laneId }) => String(laneId ?? '').trim())
      .filter((laneId) => /^[A-Z][A-Z0-9-]*-\d{3,4}$/u.test(laneId)),
  );
  const orderPath = rel(root, READINESS_PATHS.implementationOrder);
  if (fs.existsSync(orderPath) && fs.statSync(orderPath).isFile()) {
    const source = fs.readFileSync(orderPath, 'utf8');
    for (const match of source.matchAll(/(?:E5-GATE-008|SHELL-CI-020)::([A-Z][A-Z0-9-]*-\d{3,4})/gu)) ids.add(match[1]);
  }
  return [...ids].sort((left, right) => left.localeCompare(right, 'en'));
}

export function auditCapabilityIndexCoverage(capabilityIndex, canonicalPackageIds) {
  const mapped = new Set(
    Object.values(capabilityIndex.capabilities ?? {})
      .map(({ canonical_package_id: packageId }) => String(packageId ?? '').trim())
      .filter(Boolean),
  );
  const unmapped = canonicalPackageIds.filter((packageId) => !mapped.has(packageId));
  return {
    canonical_package_ids: canonicalPackageIds,
    mapped_package_ids: [...mapped].sort((left, right) => left.localeCompare(right, 'en')),
    unmapped_package_ids: unmapped,
    complete: unmapped.length === 0,
  };
}

function documentationCurrent(activeSequence) {
  if (!activeSequence || typeof activeSequence !== 'object') return null;
  if (Array.isArray(activeSequence.task_ids) && activeSequence.task_ids.length > 0) return activeSequence.task_ids[0];
  if (Array.isArray(activeSequence.segments)) {
    const first = activeSequence.segments[0];
    if (first?.prefix && Number.isInteger(first?.from)) return `${first.prefix}-${String(first.from).padStart(3, '0')}`;
  }
  return null;
}

function catalogSummary(canonicalCatalog) {
  if (!canonicalCatalog) return 'DISABLED_FOR_SUPPLIED_FIXTURE';
  return `${canonicalCatalog.packages.length}/${canonicalCatalog.expected_count}`;
}

function countBy(items, selector) {
  const counts = new Map();
  for (const item of items) {
    const key = String(selector(item) ?? 'UNKNOWN');
    counts.set(key, (counts.get(key) ?? 0) + 1);
  }
  return [...counts.entries()].sort((left, right) => right[1] - left[1] || left[0].localeCompare(right[0], 'en'));
}

function summaryLines(entries) {
  return entries.length > 0
    ? entries.map(([key, count]) => `- ${key}: ${count}`).join('\n')
    : '- NONE';
}

function blockerFamily(blocker) {
  const value = String(blocker ?? 'UNKNOWN');
  const first = value.indexOf(':');
  return first >= 0 ? value.slice(0, first) : value;
}

export function renderReadinessBlock({ capabilityResults, registry, activeSequence, trigger, indexCoverage, canonicalCatalog }) {
  const readyCaps = capabilityResults.filter(({ status }) => status === 'READY_FOR_COMPILATION');
  const blockedCaps = capabilityResults.filter(({ status }) => status === 'BLOCKED');
  const unmapped = indexCoverage?.unmapped_package_ids ?? [];
  const execution = registry.package_execution ?? null;
  const current = execution?.current ?? null;
  const currentPackage = current
    ? registry.packages.find(({ package_id: packageId }) => packageId === current.package_id) ?? null
    : null;
  const action = current?.next_action ?? null;
  const packageStatusSummary = summaryLines(countBy(registry.packages, (pkg) => pkg.status));
  const sourceSummary = summaryLines(countBy(registry.packages, (pkg) => pkg.source_kind));
  const blockerSummary = summaryLines(countBy(
    registry.packages.flatMap((pkg) => pkg.blockers ?? []),
    blockerFamily,
  ).slice(0, 10));
  const blockedPackageCount = registry.packages.filter((pkg) => (pkg.blockers ?? []).length > 0).length;
  return `=== PACKAGE READINESS SUMMARY ===\n\nTRIGGER: ${trigger}\nCANONICAL GAP PACKAGE CATALOG: ${catalogSummary(canonicalCatalog)}\nTOTAL PACKAGES EVALUATED: ${registry.packages.length}\nBLOCKED PACKAGES: ${blockedPackageCount}\nIMPLEMENTATION_READY: ${registry.implementation_ready_queue.length}\n\nLINEAR EXECUTION:\n- MODE: ${execution?.mode ?? 'NOT_EVALUATED'}\n- HUMAN PACKAGE SELECTION: FALSE\n- STATE: ${execution?.state ?? 'NOT_EVALUATED'}\n- CURRENT PACKAGE: ${current?.package_id ?? 'NONE'}\n- POSITION: ${current ? `${current.position}/${execution.sequence.length}` : `0/${execution?.sequence.length ?? 0}`}\n- LAYER: ${current?.layer ?? 'NONE'}\n- STATUS: ${currentPackage?.status ?? 'NONE'}\n- ACTION: ${action?.type ?? 'NONE'}\n- TARGET: ${action?.target ?? 'NONE'}\n- REASON: ${action?.reason ?? 'NONE'}\n- COMMAND: ${action?.command ?? 'NONE'}\n- DEFERRED OUTSIDE ACTIVE LINE: ${execution?.deferred.length ?? 0}\n- RULE: a blocked current package retains its turn; later ready packages never bypass it\n\nPACKAGE SOURCES:\n${sourceSummary}\n\nSTATUS SUMMARY:\n${packageStatusSummary}\n\nSPECIAL CAPABILITIES:\n- detected: ${capabilityResults.length}\n- blocked/maturing: ${blockedCaps.length}\n- ready_for_compilation: ${readyCaps.length}\n- unmapped: ${unmapped.length}\n\nTOP BLOCKER FAMILIES:\n${blockerSummary}\n\nNEXT DOCUMENTATION WORK:\n${documentationCurrent(activeSequence) ?? 'EMPTY'}\n\nPERSISTENT REGISTRY:\n- ${READINESS_PATHS.packageRegistry}\n- compact state only; do not use it as the detailed dossier\n\nDERIVED DETAIL:\n- ${READINESS_PATHS.reportJson}\n- ${READINESS_PATHS.reportMarkdown}\n- regenerable; full package diagnostics live here\n\n=== END PACKAGE READINESS SUMMARY ===`;
}

function markdownCell(value) {
  return String(value ?? '—')
    .replace(/\|/gu, '\\|')
    .replace(/\r?\n/gu, '<br>')
    .trim() || '—';
}

function statusIcon(status) {
  const normalized = String(status ?? '').toUpperCase();
  if (['PASS', 'READY', 'IMPLEMENTATION_READY', 'VERIFIED', 'CLOSED'].includes(normalized)) return '✅';
  if (['FAIL', 'BLOCKED', 'SUSPENDED'].includes(normalized)) return '⛔';
  if (['UNKNOWN', 'NOT_FOUND'].includes(normalized)) return '❓';
  return '🟡';
}

function progressBar(percent) {
  const normalized = Math.max(0, Math.min(100, Number(percent) || 0));
  const filled = Math.round(normalized / 10);
  return `${'█'.repeat(filled)}${'░'.repeat(10 - filled)} ${normalized}%`;
}

function packageAnchor(packageId) {
  return `package-${String(packageId).toLowerCase()}`;
}

function packageLink(packageId) {
  return `[\`${packageId}\`](#${packageAnchor(packageId)})`;
}

function dominantTaskLabel(pkg) {
  const task = (pkg.task_prerequisites?.tasks ?? []).find(({ task_id: taskId }) => taskId === pkg.dominant_task_id);
  return task ? `${task.task_id} — ${task.title}` : pkg.objective;
}

function renderExecutionSequence(result) {
  const execution = result.registry.package_execution;
  if (!execution) return '_La ejecución lineal no fue evaluada en este fixture._';
  const rows = execution.sequence.map((entry) => {
    const marker = entry.current ? '**ACTUAL**' : entry.status === 'CLOSED' ? 'CERRADO' : 'PENDIENTE';
    return `| ${entry.position} | ${packageLink(entry.package_id)} | ${entry.layer} | ${statusIcon(entry.status)} ${entry.status} | ${marker} | ${markdownCell(entry.depends_on_package_ids.join(', ') || 'ninguna explícita')} |`;
  });
  return `| Posición | Package | Capa | Estado | Turno | Depende de |\n| -: | --- | -: | --- | --- | --- |\n${rows.join('\n')}`;
}

function renderRepositorySummary(packages) {
  const groups = new Map();
  for (const pkg of packages) {
    const owner = pkg.repository_owner ?? pkg.owner_application ?? 'NO_CONFIRMADO';
    const current = groups.get(owner) ?? { packages: 0, approved: 0, tasks: 0, remaining: 0, ready: 0 };
    current.packages += 1;
    current.approved += pkg.task_prerequisites?.approved ?? 0;
    current.tasks += pkg.task_prerequisites?.total ?? 0;
    current.remaining += pkg.readiness_progress?.remaining_obligations ?? 0;
    if (pkg.status === 'IMPLEMENTATION_READY') current.ready += 1;
    groups.set(owner, current);
  }
  return [...groups.entries()]
    .sort((left, right) => right[1].packages - left[1].packages || left[0].localeCompare(right[0], 'en'))
    .map(([owner, summary]) => `| ${markdownCell(owner)} | ${summary.packages} | ${summary.approved}/${summary.tasks} | ${summary.remaining} | ${summary.ready} |`)
    .join('\n');
}

function renderCatalogTable(packages) {
  return packages.map((pkg) => {
    const progress = pkg.readiness_progress;
    return `| ${packageLink(pkg.package_id)} | ${markdownCell(dominantTaskLabel(pkg))} | ${markdownCell(pkg.repository_owner ?? pkg.owner_application)} | ${markdownCell(pkg.runtime_profile ?? 'SPECIAL_CAPABILITY')} | ${pkg.gap_membership_count ?? 'N/A'} | ${statusIcon(pkg.status)} ${pkg.status} | ${progress.task_prerequisites.approved}/${progress.task_prerequisites.total} | ${progress.gates.passed}/${progress.gates.total} | **${progress.remaining_obligations}** |`;
  }).join('\n');
}

function renderPackageCard(pkg) {
  const progress = pkg.readiness_progress;
  const missingTasks = progress.task_prerequisites.tasks.filter(({ status }) => status !== 'PASS');
  const taskRows = missingTasks.length > 0
    ? `| Tarea | Estado | Rol | Descripción |\n| --- | --- | --- | --- |\n${missingTasks.map((task) => `| \`${task.task_id}\` | ${statusIcon(task.status)} ${markdownCell(task.state)} | ${markdownCell(task.roles.join(' + '))} | ${markdownCell(task.title)} |`).join('\n')}`
    : '✅ Todas las tareas prerrequisito de este package están aprobadas.';
  const missingGates = progress.gates.missing;
  const gateRows = missingGates.length > 0
    ? `| Gate pendiente | Estado | Evidencia actual |\n| --- | --- | --- |\n${missingGates.map((gate) => `| \`${gate.id}\` | ${statusIcon(gate.status)} ${gate.status} | ${markdownCell(gate.detail)} |`).join('\n')}`
    : '✅ Todos los gates no documentales están satisfechos.';
  const canonical = pkg.canonical_prerequisites;
  const canonicalRows = canonical
    ? `| Evidencia 023 | Identidad física | Unidad de implementación | Decisión 025 |\n| --- | --- | --- | --- |\n| ${markdownCell(canonical.state_023)} | ${markdownCell(canonical.physical_state)} | ${markdownCell(canonical.implementation_unit_id)} | ${markdownCell(canonical.final_decision_025)} |`
    : `| Capacidad | Aplicación propietaria |\n| --- | --- |\n| ${markdownCell(pkg.capability_id)} | ${markdownCell(pkg.owner_application)} |`;
  const packageGate = pkg.package_gate;
  const packageGateRows = pkg.source_kind === 'CANONICAL_GAP_PACKAGE'
    ? `### Expediente package-gate\n\n- **Archivo:** \`${packageGate?.relative_path ?? `${READINESS_PATHS.packageGateInstances}/${pkg.package_id}.json`}\`\n- **Estado:** \`${packageGate?.status ?? 'NOT_PREPARED'}\`\n- **Identidad física:** ${packageGate?.sections?.physical_identity ? 'PASS' : 'PENDING'}\n- **Unidades de implementación:** ${packageGate?.sections?.implementation_units ? 'PASS' : 'PENDING'}\n- **Plan de evidencia:** ${packageGate?.sections?.evidence_plan ? 'PASS' : 'PENDING'}\n- **Aprobación explícita:** ${packageGate?.approval_complete ? 'APROBADO' : 'PENDING'}\n`
    : '';
  return `<a id="${packageAnchor(pkg.package_id)}"></a>\n<details>\n<summary><strong>${pkg.package_id}</strong> — ${statusIcon(pkg.status)} ${pkg.status} · tareas ${progress.task_prerequisites.approved}/${progress.task_prerequisites.total} · gates ${progress.gates.passed}/${progress.gates.total} · faltan ${progress.remaining_obligations}</summary>\n\n**Qué resuelve:** ${markdownCell(dominantTaskLabel(pkg))}  \n**Repositorio / aplicación:** ${markdownCell(pkg.repository_owner ?? pkg.owner_application)}  \n**Runtime:** ${markdownCell(pkg.runtime_profile ?? 'SPECIAL_CAPABILITY')}  \n**Progreso de tareas:** ${progressBar(progress.task_prerequisites.progress_percent)}\n\n${canonicalRows}\n\n${packageGateRows}\n### Tareas faltantes\n\n${taskRows}\n\n### Gates faltantes\n\n${gateRows}\n\n**Responsable de salida:** ${markdownCell(canonical?.exit_owner ?? pkg.owner_application)}  \n**Condición de salida:** ${markdownCell(canonical?.exit_condition ?? pkg.objective)}  \n**Siguiente ejecución:** \`${pkg.next_execution ?? 'NONE'}\`\n\nConsulta puntual: \`npm run docs:package:readiness -- --package ${pkg.package_id}\`\n\n</details>`;
}

export function renderReadinessMarkdown(result) {
  const packages = result.registry.packages;
  const canonical = packages.filter(({ source_kind: sourceKind }) => sourceKind === 'CANONICAL_GAP_PACKAGE');
  const special = packages.filter(({ source_kind: sourceKind }) => sourceKind === 'SPECIAL_CAPABILITY');
  const metrics = result.integrityAudit.metrics;
  const statusRows = countBy(packages, (pkg) => pkg.status)
    .map(([status, count]) => `| ${statusIcon(status)} ${status} | ${count} |`).join('\n');
  const warningRows = result.integrityAudit.warnings.length > 0
    ? result.integrityAudit.warnings.map((warning) => `- 🟡 ${warning}`).join('\n')
    : '- ✅ Sin advertencias estructurales.';
  const execution = result.registry.package_execution ?? null;
  const current = execution?.current ?? null;
  const currentWork = execution?.current_work ?? current?.current_work ?? null;
  const currentPackage = current
    ? packages.find(({ package_id: packageId }) => packageId === current.package_id) ?? null
    : null;
  const currentTasks = currentPackage?.readiness_progress?.task_prerequisites ?? null;
  const currentGates = currentPackage?.readiness_progress?.gates ?? null;
  const currentPackageGate = currentPackage?.package_gate?.status
    ?? (currentPackage?.source_kind === 'CANONICAL_GAP_PACKAGE' ? 'NOT_PREPARED' : 'N/A');
  const readyMessage = current
    ? `El turno único corresponde a **${current.package_id}** (${current.position}/${execution.sequence.length}). Su acción exacta es **${current.next_action.type}** sobre **${current.next_action.target}**. Aunque otro package llegue a IMPLEMENTATION_READY, no puede adelantarlo.`
    : 'La línea ejecutable está completa o no fue evaluada. No existe una selección humana pendiente.';
  const layerGroups = new Map();
  for (const entry of execution?.sequence ?? []) {
    const group = layerGroups.get(entry.layer) ?? [];
    group.push(entry);
    layerGroups.set(entry.layer, group);
  }
  const layerRows = [...layerGroups.entries()]
    .sort(([left], [right]) => Number(left) - Number(right))
    .map(([layer, entries]) => {
      const closed = entries.filter(({ status }) => status === 'CLOSED').length;
      const layerCurrent = entries.find(({ current: isCurrent }) => isCurrent)?.package_id ?? '—';
      return `| ${layer} | ${entries.length} | ${closed} | ${entries.length - closed} | ${markdownCell(layerCurrent)} |`;
    }).join('\n');
  const layerTable = layerRows
    ? `| Capa | Packages | Cerrados | Restantes | Package actual |\n| -: | ---: | ---: | ---: | --- |\n${layerRows}`
    : '_No hay packages en la línea ejecutable._';
  const deferredTable = execution?.deferred?.length > 0
    ? `| Package | Estado | Motivo de diferimiento |\n| --- | --- | --- |\n${execution.deferred.map((entry) => `| ${packageLink(entry.package_id)} | ${statusIcon(entry.status)} ${entry.status} | ${markdownCell(entry.reason)} |`).join('\n')}`
    : '✅ No hay packages diferidos fuera de la línea activa.';
  const specialTable = special.length > 0
    ? `| Package especial | Objetivo | Estado | Tareas | Gates | Faltan |\n| --- | --- | --- | ---: | ---: | ---: |\n${special.map((pkg) => `| ${packageLink(pkg.package_id)} | ${markdownCell(pkg.objective)} | ${statusIcon(pkg.status)} ${pkg.status} | ${pkg.readiness_progress.task_prerequisites.approved}/${pkg.readiness_progress.task_prerequisites.total} | ${pkg.readiness_progress.gates.passed}/${pkg.readiness_progress.gates.total} | **${pkg.readiness_progress.remaining_obligations}** |`).join('\n')}`
    : '_No hay capacidades especiales declaradas._';

  return `# VENTO OS — GUÍA VIVA DE EJECUCIÓN LINEAL Y READINESS DE PACKAGES

> [!IMPORTANT]
> Este archivo es **autogenerado y regenerable**. No lo edites manualmente ni lo uses como fuente canónica. Se reconstruye con \`npm run docs:package:readiness\` y durante el build del plan.
>
> Está diseñado como vista humana para Preview Markdown. La autoridad estructural continúa en \`DELIV-PKG-015\`, \`${READINESS_PATHS.packageExecutionPolicy}\`, los expedientes package-gate y el control de implementación física.

**Generado:** ${result.scannedAt}<br>
**Trigger:** \`${result.trigger}\`<br>
**Carril documental actual:** \`${documentationCurrent(result.activeSequence) ?? 'EMPTY'}\`<br>
**Auditoría lógica:** ${statusIcon(result.integrityAudit.status)} **${result.integrityAudit.status}**

## Panel de control

| Concepto | Estado |
| --- | --- |
| Política | \`${execution?.policy_id ?? 'NOT_EVALUATED'}\` |
| Modo | \`${execution?.mode ?? 'NOT_EVALUATED'}\` |
| Siguiente automático | **${execution?.automatic_next === true ? 'SÍ' : 'NO'}** |
| Selección humana de package | **${execution?.human_package_selection === false ? 'NO' : 'NO EVALUADO'}** |
| Estado de la línea | **${execution?.state ?? 'NOT_EVALUATED'}** |
| Package actual | **${current?.package_id ?? 'NONE'}** |
| CURRENT_EXECUTABLE_WORK | **${currentWork ? `${currentWork.kind}:${currentWork.id}` : 'NONE'}** |
| Package consumidor bloqueado | **${currentWork?.kind && currentWork.kind !== 'PACKAGE' ? current?.package_id ?? 'NONE' : 'NONE'}** |
| Posición actual | **${current ? `${current.position}/${execution.sequence.length}` : `0/${execution?.sequence.length ?? 0}`}** |
| Acción exacta | **${current?.next_action.type ?? 'NONE'}** |
| Objetivo | ${markdownCell(current?.next_action.target ?? 'NONE')} |
| Packages diferidos | **${execution?.deferred.length ?? 0}** |
| Autorización física | **Siempre separada y explícita** |

## Cómo funciona la línea

\`\`\`text
DELIV-PKG-015
     |
     v
DEPENDENCIAS EXPLICITAS ENTRE PACKAGES
     |
     v
CAPA DE IMPLEMENTACION (0 -> 4)
     |
     v
PACKAGE_ID COMO DESEMPATE ESTABLE
     |
     v
PRIMER PACKAGE NO CERRADO = TURNO ACTUAL
     |
     v
PRIMER PRERREQUISITO / FUNDACION INCUMPLIDO = CURRENT_EXECUTABLE_WORK
     |
     +--> EXISTE -----------> BLOQUEA AL PACKAGE CONSUMIDOR
     |
     +--> NO EXISTE --------> PACKAGE PUEDE CONTINUAR
     |
     +--> GATE COMPLETO ----> IMPLEMENTATION_READY
                                  |
                                  v
                         AUTORIZACION FISICA HUMANA
                                  |
                                  v
                         IMPLEMENTACION / CIERRE
                                  |
                                  v
                         SIGUIENTE PACKAGE AUTOMATICO
\`\`\`

### Reglas inmutables

1. **Existe una sola línea ejecutable.** No hay una lista de candidatos entre los cuales escoger manualmente.
2. **Las dependencias explícitas mandan primero.** La fuente es \`DELIV-PKG-015\`.
3. **La capa de implementación ordena después de las dependencias.** Las capas válidas son 0 a 4.
4. **\`package_id\` solo desempata de forma estable.** No crea prioridad empresarial nueva.
5. **El primer package no \`CLOSED\` conserva el turno aunque esté bloqueado.** Ningún package posterior puede adelantarlo.
6. **\`CURRENT_EXECUTABLE_WORK\` es el primer prerrequisito o fundación incumplida; el package actual queda como consumidor bloqueado hasta cerrarlo.**
7. **\`IMPLEMENTATION_READY\` no equivale a \`AUTHORIZED\`.** La autorización física humana sigue siendo obligatoria.
7. **Los packages sin orden físico canónico quedan diferidos fuera de la línea activa.** No bloquean la secuencia hasta que su fuente propietaria materialice un orden válido.

## Package actual

${readyMessage}

${current ? `| Campo | Valor |\n| --- | --- |\n| Package | ${packageLink(current.package_id)} |\n| Posición | **${current.position}/${execution.sequence.length}** |\n| Capa | **${current.layer}** |\n| Estado efectivo | ${statusIcon(current.status)} **${current.status}** |\n| Dependencias explícitas | ${markdownCell(current.depends_on_package_ids.join(', ') || 'ninguna')} |\n| Tareas prerrequisito | ${currentTasks ? `**${currentTasks.approved}/${currentTasks.total}**` : 'N/A'} |\n| Gates de readiness | ${currentGates ? `**${currentGates.passed}/${currentGates.total}**` : 'N/A'} |\n| Package gate | **${markdownCell(currentPackageGate)}** |\n| CURRENT_EXECUTABLE_WORK | **${markdownCell(currentWork ? `${currentWork.kind}:${currentWork.id}` : current.package_id)}** |\n| Gate de fundación | ${markdownCell(currentWork?.gate_id ?? "N/A")} |\n| Owner de fundación | ${markdownCell(currentWork?.owner_task ?? "N/A")} |\n| Acción exacta | **${markdownCell(current.next_action.type)}** |\n| Objetivo | ${markdownCell(current.next_action.target)} |\n| Comando | \`${current.next_action.command}\` |\n| Autorización física | **REQUERIDA; este reporte no la concede** |\n\n**Por qué conserva el turno:** ${markdownCell(current.next_action.reason)}` : '✅ No existe un package actual pendiente.'}

## Progreso por capa

> Esta tabla resume la secuencia ejecutable. Un package posterior puede estar técnicamente listo y aun así permanecer pendiente porque el turno es lineal.

${layerTable}

## Lista lineal completa

> **Lectura:** \`ACTUAL\` es el único package que puede avanzar. \`PENDIENTE\` significa esperar turno, incluso cuando el readiness técnico sea favorable.

${renderExecutionSequence(result)}

## Packages diferidos fuera de la línea activa

${deferredTable}

## Diagnóstico de readiness

| Indicador | Resultado |
| --- | ---: |
| Catálogo GAP-PKG exacto | **${canonical.length}/${result.canonicalCatalog?.expected_count ?? canonical.length}** |
| Membresías brecha → package | **${metrics.canonical_gap_memberships}/${result.canonicalCatalog?.expected_gap_memberships ?? metrics.canonical_gap_memberships}** |
| Packages especiales | **${special.length}** |
| Identidades únicas | **${metrics.unique_package_ids}/${metrics.total_packages}** |
| Packages con tarea primaria | **${metrics.canonical_with_primary_task}/${metrics.canonical_packages}** |
| Packages con tarea dominante | **${metrics.canonical_with_dominant_task}/${metrics.canonical_packages}** |
| Referencias de tarea válidas | **${metrics.task_links_total - metrics.unknown_task_references}/${metrics.task_links_total}** |
| Vínculos de tarea aprobados | **${metrics.task_links_approved}/${metrics.task_links_total}** |
| Vínculos de tarea pendientes | **${metrics.task_links_remaining}** |
| Packages IMPLEMENTATION_READY | **${result.registry.implementation_ready_queue.length}** |

### Estados actuales

| Estado | Packages |
| --- | ---: |
${statusRows}

### Auditoría de coherencia

- ✅ Sin IDs duplicados.
- ✅ Los 207 GAP-PKG tienen tarea primaria, tarea dominante, runtime, repositorio o estado explícito, propietario y condición de salida.
- ✅ No existen referencias a tareas desconocidas.
- ✅ Los contadores de tareas, gates y obligaciones restantes cuadran package por package.
- ✅ La línea consume dependencias explícitas de DELIV-PKG-015, luego capa y finalmente package_id como desempate estable.
- ✅ Un package bloqueado conserva el turno; ningún package posterior puede adelantarlo.
${warningRows}

## Capacidades especiales

${specialTable}

## Vista por repositorio

| Repositorio / aplicación | Packages | Tareas aprobadas | Obligaciones restantes | Ready |
| --- | ---: | ---: | ---: | ---: |
${renderRepositorySummary(packages)}

## Catálogo completo

| Package | Resultado principal | Repositorio | Runtime | Brechas | Estado | Tareas | Gates | Faltan |
| --- | --- | --- | --- | ---: | --- | ---: | ---: | ---: |
${renderCatalogTable(packages)}

## Detalle funcional por package

Cada ficha muestra exclusivamente información derivada: descripción, estado, tareas faltantes con su rol, gates pendientes, responsable y condición de salida.

${packages.map(renderPackageCard).join('\n\n')}

## Corrección excepcional del orden

La línea no admite selección humana ni bypass del package actual.

Si el orden derivado contradice una decisión canónica ya aprobada, se corrige la fuente \`DELIV-PKG-015\` mediante el lifecycle de correcciones. Mientras exista una corrección de esa tarea que todavía no esté \`VERIFIED\`, las mutaciones de package permanecen bloqueadas.

La apertura controlada de esa corrección se inicia con:

\`\`\`powershell
npm run docs:correction:prepare -- --task-id DELIV-PKG-015 --type DOCUMENTARY --reason-code DOCUMENTARY_CONTRADICTION --block-target SHELL-CI-020
\`\`\`

Una corrección restaura conformidad con contratos ya aprobados. No puede utilizarse para repriorizar packages por conveniencia ni para introducir una dependencia nueva no aprobada.
## Fuentes canónicas y responsabilidad

| Función | Fuente / control |
| --- | --- |
| Dependencias, capas y orden posterior al gate | \`DELIV-PKG-015\` |
| Política de ejecución lineal | \`${READINESS_PATHS.packageExecutionPolicy}\` |
| Política de gate por package | \`${READINESS_PATHS.packageGatePolicy}\` |
| Expedientes package-gate | \`${READINESS_PATHS.packageGateInstances}/\` |
| Readiness y proyección humana | \`scripts/docs/package-readiness-scanner.mjs\` |
| Implementación física | \`${READINESS_PATHS.implementationInstances}/\` |
| Registro persistente mínimo | \`${READINESS_PATHS.packageRegistry}\` |

> Esta guía **no decide el orden, no concede gates y no autoriza implementación**. Solo proyecta de forma legible el estado derivado de las fuentes anteriores.

## Uso operativo

\`\`\`powershell
npm run docs:package:execution:status
npm run docs:package:start -- --package-id GAP-PKG-001
npm run docs:chatgpt:starter
npm run docs:package:gate:status -- --package-id GAP-PKG-001
npm run docs:package:finish -- --package-id GAP-PKG-001
npm run docs:package:handoff -- --package-id GAP-PKG-001
npm run docs:implementation:status
\`\`\`

Artefactos derivados:

- \`${READINESS_PATHS.reportMarkdown}\` — guía viva y tablero humano navegable.
- \`${READINESS_PATHS.reportJson}\` — detalle estructurado para automatización.
- \`${READINESS_PATHS.packageRegistry}\` — estado persistente mínimo, no dossier detallado.
`;
}

function writeDerivedReports(root, result) {
  const jsonPath = rel(root, READINESS_PATHS.reportJson);
  const markdownPath = rel(root, READINESS_PATHS.reportMarkdown);
  fs.mkdirSync(path.dirname(jsonPath), { recursive: true });
  fs.writeFileSync(jsonPath, stableJson({
    artifact_kind: 'DERIVED_PACKAGE_READINESS_DIAGNOSTIC',
    canonical_source: false,
    editable: false,
    trigger: result.trigger,
    scanned_at: result.scannedAt,
    canonical_catalog: result.canonicalCatalog ? {
      catalog_id: result.canonicalCatalog.catalog_id,
      source_file: result.canonicalCatalog.source_file,
      package_count: result.canonicalCatalog.packages.length,
      expected_count: result.canonicalCatalog.expected_count,
      expected_gap_memberships: result.canonicalCatalog.expected_gap_memberships,
      membership_audit: result.canonicalCatalog.membership_audit,
    } : null,
    integrity_audit: result.integrityAudit,
    capabilities: result.capabilityResults,
    index_coverage: result.indexCoverage,
    packages: result.registry.packages,
    implementation_ready_queue: result.registry.implementation_ready_queue,
    package_execution: result.registry.package_execution,
    current_package: result.registry.current_package,
    nearest_to_ready_queue: result.registry.nearest_to_ready_queue,
    documentation_current: documentationCurrent(result.activeSequence),
  }), 'utf8');
  fs.writeFileSync(markdownPath, renderReadinessMarkdown(result), 'utf8');
}

function readCanonicalCatalogSource(root, contract, supplied) {
  if (Object.hasOwn(supplied, 'canonicalCatalogSource')) {
    if (supplied.canonicalCatalogSource === null || supplied.canonicalCatalogSource === false) return null;
    return String(supplied.canonicalCatalogSource);
  }
  // Existing unit fixtures provide canonicalPackageIds explicitly. Keep those fixtures isolated
  // from the 207-package production catalog unless they opt in with canonicalCatalogSource.
  if (Object.hasOwn(supplied, 'canonicalPackageIds')) return null;
  const relativePath = contract.canonical_package_catalog.source_file || READINESS_PATHS.canonicalPackageSource;
  const filePath = rel(root, relativePath);
  if (!fs.existsSync(filePath)) fail(`No existe catálogo canónico de packages: ${relativePath}.`);
  return fs.readFileSync(filePath, 'utf8');
}

function readGapRoutingSource(root, supplied, canonicalSource) {
  if (!canonicalSource) return null;
  if (Object.hasOwn(supplied, 'gapRoutingSource')) {
    if (supplied.gapRoutingSource === null || supplied.gapRoutingSource === false) return null;
    return String(supplied.gapRoutingSource);
  }
  const filePath = rel(root, READINESS_PATHS.gapRoutingSource);
  if (!fs.existsSync(filePath)) fail(`No existe matriz canónica de tareas por package: ${READINESS_PATHS.gapRoutingSource}.`);
  return fs.readFileSync(filePath, 'utf8');
}

export function scanPackageReadiness({
  root = process.cwd(),
  write = false,
  check = false,
  trigger = 'manual',
  now = () => new Date().toISOString(),
  supplied = {},
} = {}) {
  const contract = validateContract(supplied.contract ?? readJson(root, READINESS_PATHS.contract));
  const capabilityIndex = validateCapabilityIndex(
    supplied.capabilityIndex ?? readJson(root, READINESS_PATHS.capabilityIndex),
    contract,
  );
  const registry = normalizeRegistry(supplied.registry ?? readJson(root, READINESS_PATHS.packageRegistry));
  const inventory = supplied.inventory ?? readTaskInventory(root);
  const priorityLanes = supplied.priorityLanes ?? readJson(root, READINESS_PATHS.priorityLanes, { optional: true, fallback: { lanes: [] } });
  const activeSequence = supplied.activeSequence ?? readJson(root, READINESS_PATHS.activeSequence, { optional: true, fallback: null });
  const instances = supplied.instances ?? readImplementationInstances(root);

  const canonicalSource = readCanonicalCatalogSource(root, contract, supplied);
  const gapRoutingSource = readGapRoutingSource(root, supplied, canonicalSource);
  const canonicalCatalog = canonicalSource ? parseCanonicalPackageCatalogFromSource(canonicalSource, contract, gapRoutingSource ?? '') : null;
  const packageGatePolicy = supplied.packageGatePolicy ?? readPackageGatePolicy(root);
  const taskPrerequisitesById = new Map((canonicalCatalog?.packages ?? []).map((entry) => [
    entry.package_id,
    evaluateTaskPrerequisites(entry, inventory),
  ]));
  const packageGateResult = supplied.packageGateRecords
    ? { policy: packageGatePolicy, records: supplied.packageGateRecords, assessments: new Map(), errors: [] }
    : loadPackageGateRecords({ root, policy: packageGatePolicy, taskPrerequisitesById });
  assertPackageGateRecordsValid(packageGateResult);

  // This coverage audit is intentionally limited to special package identities outside GAP-PKG-001..207.
  const specialCanonicalPackageIds = supplied.canonicalPackageIds
    ?? [...new Set([
      ...(contract.canonical_package_catalog.special_package_ids ?? []),
      ...discoverCanonicalPackageIds(root, priorityLanes)
        .filter((packageId) => !/^GAP-PKG-\d{3}$/u.test(packageId)),
    ])].sort((left, right) => left.localeCompare(right, 'en'));
  const indexCoverage = auditCapabilityIndexCoverage(capabilityIndex, specialCanonicalPackageIds);
  if ((write || check) && !indexCoverage.complete) {
    fail(`implementation-capability-index.json no cubre package_id canónicos especiales: ${indexCoverage.unmapped_package_ids.join(', ')}.`);
  }

  const capabilityResults = Object.entries(capabilityIndex.capabilities)
    .map(([capabilityId, capability]) => evaluateCapability({
      capabilityId,
      capability,
      contract,
      inventory,
      priorityLanes,
      root,
    }));

  const documentaryRegistry = reconcileRegistry({
    registry,
    capabilityResults,
    capabilityIndex,
    contract,
    inventory,
    priorityLanes,
    canonicalCatalog,
    packageGateRecords: packageGateResult.records,
    packageGatePolicy,
    now,
  });
  const nextPersistentRegistry = compactRegistryForPersistence(documentaryRegistry);
  const physicalRegistry = applyPhysicalOverlay({
    registry: documentaryRegistry,
    contract,
    instances,
    capabilityIndex,
    priorityLanes,
  });
  const packageExecutionPolicy = supplied.skipPackageExecution || supplied.skipPackageSelection
    ? null
    : supplied.packageExecutionPolicy ?? readPackageExecutionPolicy(root);
  const packageExecution = packageExecutionPolicy
    ? deriveLinearPackageExecution(physicalRegistry, packageExecutionPolicy)
    : null;
  const effectiveRegistry = packageExecution
    ? {
      ...physicalRegistry,
      package_execution: packageExecution,
      current_package: packageExecution.current,
    }
    : physicalRegistry;
  const integrityAudit = auditPackageRegistry({ registry: effectiveRegistry, canonicalCatalog });
  if (integrityAudit.status !== 'PASS') {
    fail(`Auditoría lógica de packages falló:\n- ${integrityAudit.errors.join('\n- ')}`);
  }

  const expectedSource = stableJson(nextPersistentRegistry);
  const currentSource = stableJson(registry);
  const registryChanged = expectedSource !== currentSource;
  if (check && registryChanged) {
    fail(`${READINESS_PATHS.packageRegistry} está desactualizado; ejecute npm run docs:package:readiness antes de continuar.`);
  }
  if (write && registryChanged) fs.writeFileSync(rel(root, READINESS_PATHS.packageRegistry), expectedSource, 'utf8');

  const result = {
    trigger,
    scannedAt: now(),
    contract,
    capabilityIndex,
    canonicalCatalog,
    packageGatePolicy,
    packageExecutionPolicy,
    packageGateRecords: packageGateResult,
    capabilityResults,
    indexCoverage,
    registry: effectiveRegistry,
    integrityAudit,
    persistentRegistry: nextPersistentRegistry,
    registryChanged,
    activeSequence,
  };
  result.block = renderReadinessBlock(result);
  if (!supplied.skipDerivedReports) writeDerivedReports(root, result);
  return result;
}

function parseArgs(argv) {
  const args = {
    write: false,
    check: false,
    trigger: 'manual',
    json: false,
    packageId: null,
    recordFoundationId: null,
    recordCandidatePackageId: null,
    foundationStatus: false,
    changelogRef: null,
    toolchainFreezeRef: null,
  };
  for (let index = 0; index < argv.length; index += 1) {
    const token = argv[index];
    if (token === '--write') args.write = true;
    else if (token === '--check') args.check = true;
    else if (token === '--json') args.json = true;
    else if (token === '--foundation-status') args.foundationStatus = true;
    else if (token === '--record-candidate') {
      args.recordCandidatePackageId = argv[index + 1];
      if (!args.recordCandidatePackageId) fail('Falta package_id después de --record-candidate.');
      index += 1;
    } else if (token === '--record-foundation') {
      args.recordFoundationId = argv[index + 1];
      if (!args.recordFoundationId) fail('Falta foundation_id después de --record-foundation.');
      index += 1;
    } else if (token === '--changelog-ref') {
      args.changelogRef = argv[index + 1];
      if (!args.changelogRef) fail('Falta valor de --changelog-ref.');
      index += 1;
    } else if (token === '--toolchain-freeze-ref') {
      args.toolchainFreezeRef = argv[index + 1];
      if (!args.toolchainFreezeRef) fail('Falta valor de --toolchain-freeze-ref.');
      index += 1;
    } else if (token === '--package') {
      args.packageId = argv[index + 1];
      if (!args.packageId) fail('Falta valor de --package.');
      index += 1;
    } else if (token === '--trigger') {
      args.trigger = argv[index + 1];
      if (!args.trigger) fail('Falta valor de --trigger.');
      index += 1;
    } else fail(`Argumento desconocido: ${token}.`);
  }
  if (args.write && args.check) fail('--write y --check son mutuamente excluyentes.');
  if (args.recordFoundationId && (args.write || args.check || args.foundationStatus || args.packageId || args.json || args.recordCandidatePackageId)) {
    fail('--record-foundation no puede combinarse con modos de scan/status/candidate.');
  }
  if (args.recordCandidatePackageId && (args.write || args.check || args.foundationStatus || args.packageId || args.json || args.recordFoundationId)) {
    fail('--record-candidate no puede combinarse con modos de scan/status/foundation.');
  }
  return args;
}

export function renderPackageDetail(pkg) {
  const progress = pkg.readiness_progress ?? { task_prerequisites: { tasks: [], total: 0, approved: 0, remaining: 0, progress_percent: 100, missing_task_ids: [] }, gates: { checks: [], total: 0, passed: 0, remaining: 0, missing: [] }, remaining_obligations: 0 };
  const taskLines = progress.task_prerequisites.tasks.length > 0
    ? progress.task_prerequisites.tasks.map((task) => `- [${task.status === 'PASS' ? 'OK' : task.status}] ${task.task_id}${task.title ? ` — ${task.title}` : ''}\n  ROLE: ${task.roles.join('+')}\n  STATE: ${task.state}`).join('\n')
    : '- NONE';
  const missingGateLines = progress.gates.missing.length > 0
    ? progress.gates.missing.map((gate) => `- ${gate.id}: ${gate.status} — ${gate.detail}`).join('\n')
    : '- NONE';
  const physicalMissing = (pkg.physical_dependencies?.evidence ?? []).filter(({ status }) => status !== 'PASS');
  const physicalLines = physicalMissing.length > 0
    ? physicalMissing.map((entry) => `- ${entry.source}: ${entry.status} — ${entry.detail}`).join('\n')
    : '- NONE';
  return `=== PACKAGE READINESS DETAIL ===\n\nPACKAGE: ${pkg.package_id}\nSOURCE: ${pkg.source_kind}\nSTATUS: ${pkg.status}\nIMPLEMENTATION_READY: ${pkg.status === 'IMPLEMENTATION_READY' && (pkg.blockers ?? []).length === 0 ? 'YES' : 'NO'}\n\nTASK PREREQUISITES:\n- APPROVED: ${progress.task_prerequisites.approved}/${progress.task_prerequisites.total}\n- REMAINING: ${progress.task_prerequisites.remaining}\n- PROGRESS: ${progress.task_prerequisites.progress_percent}%\n\nTASKS:\n${taskLines}\n\nNON-TASK GATES:\n- PASSED: ${progress.gates.passed}/${progress.gates.total}\n- REMAINING: ${progress.gates.remaining}\n\nMISSING GATES:\n${missingGateLines}\n\nPHYSICAL DEPENDENCIES NOT VERIFIED:\n${physicalLines}\n\nTOTAL REMAINING OBLIGATIONS: ${progress.remaining_obligations}\n\nEXIT OWNER: ${pkg.canonical_prerequisites?.exit_owner ?? 'N/A'}\nEXIT CONDITION: ${pkg.canonical_prerequisites?.exit_condition ?? 'N/A'}\nNEXT EXECUTION: ${pkg.next_execution ?? 'NONE'}\n\n=== END PACKAGE READINESS DETAIL ===`;
}

function printCliResult(result, { json = false, packageId = null } = {}) {
  if (packageId) {
    const pkg = result.registry.packages.find(({ package_id: id }) => id === packageId);
    if (!pkg) fail(`Package no encontrado: ${packageId}.`);
    if (json) {
      console.log(JSON.stringify(pkg, null, 2));
      return;
    }
    console.log(renderPackageDetail(pkg));
    return;
  }
  if (json) {
    console.log(JSON.stringify({
      trigger: result.trigger,
      canonical_catalog: result.canonicalCatalog ? {
        package_count: result.canonicalCatalog.packages.length,
        expected_count: result.canonicalCatalog.expected_count,
      } : null,
      integrity_audit: result.integrityAudit,
      capability_results: result.capabilityResults,
      packages: result.registry.packages,
      implementation_ready_queue: result.registry.implementation_ready_queue,
      package_execution: result.registry.package_execution,
      current_package: result.registry.current_package,
      nearest_to_ready_queue: result.registry.nearest_to_ready_queue,
      registry_changed: result.registryChanged,
    }, null, 2));
    return;
  }
  console.log(result.block);
  const current = result.registry.package_execution?.current ?? null;
  if (current?.next_action.type === 'AUTHORIZE_PHYSICAL_IMPLEMENTATION') {
    console.log('');
    console.log('PACKAGE IMPLEMENTABLE DETECTED');
    console.log(current.package_id);
    console.log('BLOCKERS: 0');
    console.log(`NEXT EXECUTION: ${current.next_action.target}`);
    console.log('PHYSICAL AUTHORIZATION: REQUIRED');
  }
}

function printFoundationStatus(root) {
  const contract = readJson(root, READINESS_PATHS.contract);
  const foundation = contract.physical_dependencies.supabase_pre_e5_foundation;
  console.log('=== RESULTADO PARA CHATGPT ===');
  console.log('ESTADO: PASS');
  console.log('OPERACION: FOUNDATION_STATUS');
  for (const gate of foundation.ordered_foundation_gates) {
    const result = validateFoundationEvidenceRef(gate, gate.evidence_ref);
    console.log(`${gate.foundation_id}: ${result.status} | ${gate.gate_id}`);
  }
  console.log('=== FIN RESULTADO PARA CHATGPT ===');
}

function main() {
  const args = parseArgs(process.argv.slice(2));
  if (args.recordCandidatePackageId) {
    const result = recordInPackageCandidateEvidence({
      root: process.cwd(),
      packageId: args.recordCandidatePackageId,
    });
    console.log('=== RESULTADO PARA CHATGPT ===');
    console.log('ESTADO: PASS');
    console.log('OPERACION: IN_PACKAGE_CANDIDATE_RECORD');
    console.log(`PACKAGE_ID: ${result.packageId}`);
    console.log(`INSTANCE_ID: ${result.instanceId}`);
    console.log('FOUNDATION_ID: MRP015-050');
    console.log('GATE_ID: CANDIDATE_READY');
    console.log(`CANDIDATE_HEAD_SHA: ${result.evidence.candidate_head_sha}`);
    console.log(`AUTHORIZED_SCOPE_SHA256: ${result.evidence.authorized_scope_sha256}`);
    console.log(`CANDIDATE_SCOPE_SHA256: ${result.evidence.candidate_scope_sha256}`);
    console.log('REMOTE_MUTATIONS: NO');
    console.log('SECRET_VALUES_IN_EVIDENCE: NO');
    console.log('=== FIN RESULTADO PARA CHATGPT ===');
    return;
  }
  if (args.recordFoundationId) {
    const result = recordSupabaseFoundationEvidence({
      root: process.cwd(),
      foundationId: args.recordFoundationId,
      changelogRef: args.changelogRef,
      toolchainFreezeRef: args.toolchainFreezeRef,
    });
    console.log('=== RESULTADO PARA CHATGPT ===');
    console.log(`ESTADO: ${result.status}`);
    console.log('OPERACION: FOUNDATION_RECORD');
    console.log(`FOUNDATION_ID: ${result.foundationId}`);
    console.log(`FAILED_CHECKS: ${result.failed.join(',') || 'NONE'}`);
    console.log(`EVIDENCE_WRITTEN: ${result.status === 'PASS' ? 'SI' : 'NO'}`);
    console.log('SECRET_VALUES_IN_EVIDENCE: NO');
    console.log('=== FIN RESULTADO PARA CHATGPT ===');
    if (result.status !== 'PASS') process.exitCode = 1;
    return;
  }
  if (args.foundationStatus) {
    printFoundationStatus(process.cwd());
    return;
  }
  const result = scanPackageReadiness(args);
  printCliResult(result, args);
}

const isCli = process.argv[1]
  && path.resolve(process.argv[1]) === path.resolve(fileURLToPath(import.meta.url));

if (isCli) {
  try {
    main();
  } catch (error) {
    console.error(`ERROR: ${error instanceof Error ? error.message : String(error)}`);
    process.exitCode = 1;
  }
}
