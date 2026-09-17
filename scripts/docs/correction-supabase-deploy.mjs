import crypto from 'node:crypto';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { spawnSync } from 'node:child_process';

import {
  DERIVED_CORRECTION_PROJECTIONS,
  correctionRecord,
  correctionRecordRelativePath,
  loadValidatedCorrectionControl,
  normalizeCorrectionId,
} from './correction-control.mjs';
import { checkpointCorrection } from './correction-branch-lifecycle.mjs';
import { resolveNpmInvocation } from './task-branch-lifecycle.mjs';

const SHELL_REPOSITORY = 'vento-group-sas/vento-shell';
const RESULT_START = '=== RESULTADO PARA CHATGPT ===';
const RESULT_END = '=== FIN RESULTADO PARA CHATGPT ===';
const DEPLOY_EVIDENCE_TYPE = 'CORRECTION_SUPABASE_DEPLOY_V1';
const DRIFT_EVIDENCE_TYPE = 'CORRECTION_REMOTE_DRIFT_V1';
const QUALITY_REPAIR_EVIDENCE_TYPE = 'CORRECTION_QUALITY_REPAIR_V1';
const QUALITY_REPAIR_GOVERNANCE_COMMIT = '061ce3707f24028184955505456cd3b4b64c0085';
const LEGACY_QUALITY_ADOPTION_MODEL = 'VENTO-CORRECTION-QUALITY-REPAIR-LEGACY-ADOPTION-V1';
const MIGRATION_PATTERN = /\b\d{14}_[A-Za-z0-9._-]+\.sql\b/gu;

function fail(message, code = 1) {
  const error = new Error(message);
  error.exitCode = code;
  throw error;
}

function run(command, args, {
  cwd = process.cwd(),
  allowFailure = false,
  input = undefined,
  env = process.env,
} = {}) {
  const result = spawnSync(command, args, {
    cwd,
    encoding: 'utf8',
    windowsHide: true,
    env,
    input,
    stdio: input === undefined ? ['ignore', 'pipe', 'pipe'] : ['pipe', 'pipe', 'pipe'],
    maxBuffer: 64 * 1024 * 1024,
  });
  if (result.error) {
    if (allowFailure) return { status: 1, stdout: '', stderr: result.error.message };
    fail(`${command} no disponible: ${result.error.message}`);
  }
  const status = Number.isInteger(result.status) ? result.status : 1;
  const stdout = String(result.stdout ?? '').trimEnd();
  const stderr = String(result.stderr ?? '').trimEnd();
  if (status !== 0 && !allowFailure) {
    fail(stderr || stdout || `${command} ${args.join(' ')} falló.`, status);
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

function printResult(fields) {
  console.log('');
  console.log(RESULT_START);
  for (const [key, value] of Object.entries(fields)) console.log(`${key}: ${value}`);
  console.log(RESULT_END);
}

function ensureRepositoryRoot() {
  const root = git(['rev-parse', '--show-toplevel']).stdout.trim();
  if (!root) fail('No se pudo resolver la raíz Git.');
  return root;
}

function readRecord(root, correctionId) {
  const control = loadValidatedCorrectionControl({ root });
  const entry = correctionRecord(control, correctionId);
  if (!entry) fail(`${correctionId} no existe en correction-instances.`);
  return entry.record;
}

function writeRecord(root, record) {
  const relativePath = correctionRecordRelativePath(record.correction_id);
  const absolutePath = path.join(root, ...relativePath.split('/'));
  fs.writeFileSync(absolutePath, `${JSON.stringify(record, null, 2)}\n`, 'utf8');
  return relativePath;
}

function sha256(value) {
  return crypto.createHash('sha256').update(value).digest('hex');
}

function outputText(result) {
  return [result.stdout, result.stderr].filter(Boolean).join('\n');
}

function normalizeRepoPath(value) {
  return String(value ?? '').replaceAll('\\', '/').replace(/^\.\//u, '');
}

function evidenceTypeOf(entry) {
  return String(entry?.evidence_type ?? entry?.type ?? '').trim();
}

function evidenceByType(record, evidenceType) {
  return (record.evidence ?? []).find((entry) => evidenceTypeOf(entry) === evidenceType) ?? null;
}

export function parsePendingMigrations(source) {
  return [...new Set(String(source ?? '').match(MIGRATION_PATTERN) ?? [])].sort();
}

export function classifyDryRun({ pendingMigrations = [], expectedMigration } = {}) {
  const expected = String(expectedMigration ?? '').trim();
  if (!/^\d{14}_[A-Za-z0-9._-]+\.sql$/u.test(expected)) {
    fail(`MIGRATION_ID_INVALID:${expected || 'EMPTY'}`);
  }
  const pending = [...new Set((pendingMigrations ?? []).map((entry) => String(entry).trim()).filter(Boolean))].sort();
  if (pending.length === 0) {
    return Object.freeze({ action: 'ALREADY_APPLIED', pending: Object.freeze([]) });
  }
  if (pending.length === 1 && pending[0] === expected) {
    return Object.freeze({ action: 'APPLY', pending: Object.freeze(pending) });
  }
  fail(`PENDING_MIGRATION_SET_MISMATCH:${pending.join(',') || 'NONE'}`);
}

export function assertNonProductionEnvironment(environmentRole) {
  const role = String(environmentRole ?? '').trim().toUpperCase();
  if (!role) fail('ENVIRONMENT_ROLE_REQUIRED');
  if (role === 'PRODUCTION') fail('PRODUCTION_REMOTE_MUTATION_FORBIDDEN');
  return role;
}

export function replaceEvidence(record, evidence) {
  const evidenceType = evidenceTypeOf(evidence);
  if (!evidenceType) fail('EVIDENCE_TYPE_REQUIRED');
  return {
    ...record,
    evidence: [
      ...(record.evidence ?? []).filter((entry) => evidenceTypeOf(entry) !== evidenceType),
      evidence,
    ],
  };
}

export function classifyLegacyQualityRepairAdoption({
  record,
  baselinePredatesGovernance = false,
  changedPaths = [],
  allowedMetadataPaths = [],
} = {}) {
  if (!record || typeof record !== 'object' || Array.isArray(record)) {
    fail('LEGACY_QUALITY_REPAIR_RECORD_INVALID');
  }

  const existing = evidenceByType(record, QUALITY_REPAIR_EVIDENCE_TYPE);
  if (existing?.status === 'PASS') {
    return Object.freeze({ action: 'REUSE_EXISTING_PASS', evidence: existing });
  }
  if (existing) {
    fail(`QUALITY_REPAIR_PREVIOUS_${String(existing.status ?? 'UNKNOWN').toUpperCase()}`);
  }

  if (!baselinePredatesGovernance) {
    return Object.freeze({ action: 'NOT_APPLICABLE_GOVERNED_BASELINE' });
  }

  if (record.status !== 'IN_PROGRESS') {
    fail(`LEGACY_QUALITY_REPAIR_STATUS_INVALID:${record.status ?? 'UNKNOWN'}`);
  }
  if (!['PHYSICAL', 'DOCUMENTARY_AND_PHYSICAL'].includes(record.correction_type)) {
    fail(`LEGACY_QUALITY_REPAIR_TYPE_INVALID:${record.correction_type ?? 'UNKNOWN'}`);
  }
  if (record.authorization?.decision !== 'APPROVED') {
    fail('LEGACY_QUALITY_REPAIR_AUTHORIZATION_NOT_APPROVED');
  }

  const nonExecuteOnly = (record.authorized_changes ?? []).filter(
    (entry) => String(entry.change ?? '').trim().toUpperCase() !== 'EXECUTE_ONLY',
  );
  if (nonExecuteOnly.length > 0) {
    fail(`LEGACY_QUALITY_REPAIR_REQUIRES_EXECUTE_ONLY:${nonExecuteOnly.map((entry) => entry.path).join(',')}`);
  }

  const allowed = new Set((allowedMetadataPaths ?? []).map(normalizeRepoPath));
  const unexpected = (changedPaths ?? [])
    .map(normalizeRepoPath)
    .filter(Boolean)
    .filter((entry) => !allowed.has(entry));
  if (unexpected.length > 0) {
    fail(`LEGACY_QUALITY_REPAIR_ADOPTION_SCOPE_UNSAFE:${unexpected.join(',')}`);
  }

  const deployment = evidenceByType(record, DEPLOY_EVIDENCE_TYPE);
  const drift = evidenceByType(record, DRIFT_EVIDENCE_TYPE);
  if (deployment?.status !== 'PASS') fail('LEGACY_QUALITY_REPAIR_DEPLOY_EVIDENCE_NOT_PASS');
  if (drift?.status !== 'PASS') fail('LEGACY_QUALITY_REPAIR_DRIFT_EVIDENCE_NOT_PASS');
  if (deployment.post_push_remote_up_to_date !== true) {
    fail('LEGACY_QUALITY_REPAIR_REMOTE_UP_TO_DATE_NOT_CONFIRMED');
  }
  if (deployment.production_mutations !== false || drift.production_mutations !== false) {
    fail('LEGACY_QUALITY_REPAIR_PRODUCTION_MUTATION_DETECTED');
  }
  if (drift.remote_mutations_during_drift !== false) {
    fail('LEGACY_QUALITY_REPAIR_DRIFT_MUTATION_DETECTED');
  }

  return Object.freeze({
    action: 'ADOPT_LEGACY_PASS',
    deployment,
    drift,
  });
}

function authorizedEntry(record, relativePath, change) {
  return (record.authorized_changes ?? []).some((entry) => (
    String(entry.repo ?? '').trim() === SHELL_REPOSITORY
    && String(entry.path ?? '').replaceAll('\\', '/') === relativePath
    && String(entry.change ?? '').trim().toUpperCase() === change
  ));
}

function assertDeployAuthorization(record, migrationRelativePath) {
  if (!['PHYSICAL', 'DOCUMENTARY_AND_PHYSICAL'].includes(record.correction_type)) {
    fail(`${record.correction_id}:SUPABASE_DEPLOY_REQUIRES_PHYSICAL_CORRECTION`);
  }
  if (!['IN_PROGRESS', 'IMPLEMENTED'].includes(record.status)) {
    fail(`${record.correction_id}:SUPABASE_DEPLOY_STATUS_INVALID:${record.status}`);
  }
  if (!(record.target_repositories ?? []).includes(SHELL_REPOSITORY)) {
    fail(`${record.correction_id}:SHELL_REPOSITORY_NOT_AUTHORIZED`);
  }
  if (!authorizedEntry(record, migrationRelativePath, 'EXECUTE_ONLY')) {
    fail(`${record.correction_id}:MIGRATION_NOT_EXECUTE_ONLY:${migrationRelativePath}`);
  }
  if (!authorizedEntry(record, 'scripts/supabase/environment-drift.mjs', 'EXECUTE_ONLY')) {
    fail(`${record.correction_id}:ENVIRONMENT_DRIFT_NOT_EXECUTE_ONLY`);
  }
}

function parseArgs(argv) {
  const args = {
    correctionId: null,
    migration: null,
    environmentRole: null,
    projectRef: null,
    owner: null,
    scope: 'full',
    adoptLegacyQualityOnly: false,
  };
  const tokens = [...argv];
  for (let index = 0; index < tokens.length; index += 1) {
    const token = tokens[index];
    const value = tokens[index + 1];
    if (token === '--correction-id') {
      if (!value) fail('falta valor de --correction-id.');
      args.correctionId = value;
      index += 1;
    } else if (token === '--migration') {
      if (!value) fail('falta valor de --migration.');
      args.migration = value;
      index += 1;
    } else if (token === '--environment-role') {
      if (!value) fail('falta valor de --environment-role.');
      args.environmentRole = value;
      index += 1;
    } else if (token === '--project-ref') {
      if (!value) fail('falta valor de --project-ref.');
      args.projectRef = value;
      index += 1;
    } else if (token === '--owner') {
      if (!value) fail('falta valor de --owner.');
      args.owner = value;
      index += 1;
    } else if (token === '--scope') {
      if (!value) fail('falta valor de --scope.');
      args.scope = value;
      index += 1;
    } else if (token === '--adopt-legacy-quality-only') {
      args.adoptLegacyQualityOnly = true;
    } else {
      fail(`argumento desconocido: ${token}.`);
    }
  }
  if (args.adoptLegacyQualityOnly) {
    if (!String(args.correctionId ?? '').trim()) {
      fail('argumento obligatorio ausente: correctionId.');
    }
    return args;
  }
  for (const [key, value] of Object.entries(args)) {
    if (key === 'scope' || key === 'adoptLegacyQualityOnly') continue;
    if (!String(value ?? '').trim()) fail(`argumento obligatorio ausente: ${key}.`);
  }
  return args;
}

function baselinePredatesQualityRepairGovernance(root, record) {
  const baseline = String(record.baseline?.main_commit ?? '').trim();
  if (!/^[0-9a-f]{40}$/u.test(baseline)) fail('LEGACY_QUALITY_REPAIR_BASELINE_INVALID');

  const governanceInMain = git(
    ['merge-base', '--is-ancestor', QUALITY_REPAIR_GOVERNANCE_COMMIT, 'origin/main'],
    { cwd: root, allowFailure: true },
  );
  if (governanceInMain.status !== 0) {
    fail('QUALITY_REPAIR_GOVERNANCE_COMMIT_NOT_IN_ORIGIN_MAIN');
  }
  if (baseline === QUALITY_REPAIR_GOVERNANCE_COMMIT) return false;

  return git(
    ['merge-base', '--is-ancestor', baseline, QUALITY_REPAIR_GOVERNANCE_COMMIT],
    { cwd: root, allowFailure: true },
  ).status === 0;
}

function correctionBranchChangedPaths(root) {
  git(['fetch', 'origin', 'main', '--quiet'], { cwd: root });
  return git([
    'diff',
    '--name-only',
    '--diff-filter=ACMR',
    'origin/main...HEAD',
  ], { cwd: root }).stdout
    .split(/\r?\n/u)
    .map(normalizeRepoPath)
    .filter(Boolean);
}

function maybeAdoptLegacyQualityRepair(root, correctionId, checkpointHead) {
  const record = readRecord(root, correctionId);
  const recordPath = correctionRecordRelativePath(correctionId);
  const classification = classifyLegacyQualityRepairAdoption({
    record,
    baselinePredatesGovernance: baselinePredatesQualityRepairGovernance(root, record),
    changedPaths: correctionBranchChangedPaths(root),
    allowedMetadataPaths: [recordPath, ...DERIVED_CORRECTION_PROJECTIONS],
  });

  if (classification.action !== 'ADOPT_LEGACY_PASS') {
    return Object.freeze({
      action: classification.action,
      checkpointHead,
      evidence: classification.evidence ?? null,
    });
  }

  const sourceEvidence = [classification.deployment, classification.drift];
  const adoptionEvidence = {
    evidence_type: QUALITY_REPAIR_EVIDENCE_TYPE,
    status: 'PASS',
    command: 'npm run quality:repair',
    execution_mode: 'LEGACY_EQUIVALENCE_ADOPTION',
    executed_during_adoption: false,
    automatic_retry_forbidden: true,
    adopted_at: new Date().toISOString(),
    adopted_candidate_head: checkpointHead,
    adoption_model: LEGACY_QUALITY_ADOPTION_MODEL,
    adoption_reason: 'PRE_GOVERNANCE_EXECUTE_ONLY_CORRECTION_WITH_CERTIFIED_PHYSICAL_EVIDENCE',
    legacy_baseline_main_commit: record.baseline.main_commit,
    governance_introduction_commit: QUALITY_REPAIR_GOVERNANCE_COMMIT,
    source_evidence_types: [DEPLOY_EVIDENCE_TYPE, DRIFT_EVIDENCE_TYPE],
    source_evidence_sha256: sha256(JSON.stringify(sourceEvidence)),
  };

  writeRecord(root, replaceEvidence(record, adoptionEvidence));
  const adoptedCheckpoint = checkpointCorrection({
    root,
    correctionId,
    label: 'adopt legacy quality repair evidence',
  });

  return Object.freeze({
    action: 'ADOPTED_LEGACY_PASS',
    checkpointHead: adoptedCheckpoint.head,
    evidence: adoptionEvidence,
  });
}

export function adoptLegacyQualityRepairOnly({
  root = ensureRepositoryRoot(),
  correctionId,
} = {}) {
  const id = normalizeCorrectionId(correctionId);
  const record = readRecord(root, id);
  if (record.status !== 'IN_PROGRESS') {
    fail(`${id}:LEGACY_QUALITY_ADOPTION_STATUS_INVALID:${record.status}`);
  }

  const checkpoint = checkpointCorrection({
    root,
    correctionId: id,
    label: 'checkpoint before legacy quality repair adoption',
  });
  const qualityRepairGate = maybeAdoptLegacyQualityRepair(root, id, checkpoint.head);
  if (!['ADOPTED_LEGACY_PASS', 'REUSE_EXISTING_PASS'].includes(qualityRepairGate.action)) {
    fail(`LEGACY_QUALITY_REPAIR_ADOPTION_NOT_APPLICABLE:${qualityRepairGate.action}`);
  }

  printResult({
    ESTADO: 'PASS',
    OPERACION: 'CORRECTION_LEGACY_QUALITY_REPAIR_ADOPTION',
    CORRECTION_ID: id,
    QUALITY_REPAIR_GATE: qualityRepairGate.action,
    QUALITY_REPAIR_REEXECUTED: 'NO',
    LIFECYCLE_HEAD: qualityRepairGate.checkpointHead,
    WORKTREE: 'CLEAN',
  });

  return Object.freeze({
    correctionId: id,
    qualityRepairGate,
    lifecycleHead: qualityRepairGate.checkpointHead,
  });
}

export function deployCorrectionSupabase({
  root = ensureRepositoryRoot(),
  correctionId,
  migration,
  environmentRole,
  projectRef,
  owner,
  scope = 'full',
} = {}) {
  const id = normalizeCorrectionId(correctionId);
  const role = assertNonProductionEnvironment(environmentRole);
  const migrationName = String(migration ?? '').trim();
  const migrationRelativePath = `supabase/migrations/${migrationName}`;
  let record = readRecord(root, id);
  assertDeployAuthorization(record, migrationRelativePath);

  const before = checkpointCorrection({
    root,
    correctionId: id,
    label: 'checkpoint before Supabase deploy',
  });

  const dryRun = npm(['exec', '--', 'supabase', 'db', 'push', '--linked', '--dry-run'], { cwd: root });
  const dryRunText = outputText(dryRun);
  const classification = classifyDryRun({
    pendingMigrations: parsePendingMigrations(dryRunText),
    expectedMigration: migrationName,
  });

  let remoteMutation = false;
  if (classification.action === 'APPLY') {
    npm(['exec', '--', 'supabase', 'db', 'push', '--linked'], {
      cwd: root,
      input: 'y\n',
    });
    remoteMutation = true;
  }

  const postDryRun = npm(['exec', '--', 'supabase', 'db', 'push', '--linked', '--dry-run'], { cwd: root });
  const postDryRunText = outputText(postDryRun);
  const postPending = parsePendingMigrations(postDryRunText);
  if (postPending.length > 0) fail(`POST_PUSH_PENDING_MIGRATIONS:${postPending.join(',')}`);
  if (!/Remote database is up to date\./iu.test(postDryRunText)) {
    fail('POST_PUSH_REMOTE_UP_TO_DATE_NOT_CONFIRMED');
  }

  const deploymentEvidence = {
    evidence_type: DEPLOY_EVIDENCE_TYPE,
    status: 'PASS',
    observed_at: new Date().toISOString(),
    correction_id: id,
    environment_role: role,
    project_ref: projectRef,
    owner,
    scope,
    migration: migrationName,
    pre_deploy_candidate_head: before.head,
    preflight_action: classification.action,
    remote_mutation_performed: remoteMutation,
    post_push_remote_up_to_date: true,
    preflight_output_sha256: sha256(dryRunText),
    postflight_output_sha256: sha256(postDryRunText),
    production_mutations: false,
  };
  record = replaceEvidence(readRecord(root, id), deploymentEvidence);
  writeRecord(root, record);

  const deployed = checkpointCorrection({
    root,
    correctionId: id,
    label: 'record Supabase deployment evidence',
  });

  const evidenceFile = `.delivery/${id.replaceAll('::', '__')}__${role.toLowerCase()}-drift.json`;
  const drift = npm([
    'run',
    'supabase:drift:remote',
    '--',
    '--environment-role', role,
    '--project-ref', projectRef,
    '--owner', owner,
    '--scope', scope,
    '--output', evidenceFile,
    '--strict',
  ], { cwd: root, allowFailure: true });

  if (drift.status !== 0) {
    fail(`REMOTE_DRIFT_FAILED:${outputText(drift).replace(/[\r\n]+/gu, ' | ')}`, drift.status);
  }

  const driftPayloadPath = path.join(root, ...evidenceFile.split('/'));
  const driftPayload = fs.existsSync(driftPayloadPath)
    ? fs.readFileSync(driftPayloadPath, 'utf8')
    : '';

  const driftEvidence = {
    evidence_type: DRIFT_EVIDENCE_TYPE,
    status: 'PASS',
    observed_at: new Date().toISOString(),
    correction_id: id,
    environment_role: role,
    project_ref: projectRef,
    owner,
    scope,
    certified_candidate_head: deployed.head,
    lifecycle_model: 'VENTO-CORRECTION-CANDIDATE-LIFECYCLE-V1',
    lifecycle_decision: 'REUSE_PHYSICAL_EVIDENCE',
    lifecycle_reason: 'SAFE_CORRECTION_METADATA_ONLY',
    evidence_file: evidenceFile,
    evidence_file_sha256: driftPayload ? sha256(driftPayload) : null,
    remote_mutations_during_drift: false,
    production_mutations: false,
  };

  writeRecord(root, replaceEvidence(readRecord(root, id), driftEvidence));

  let finalCheckpoint = checkpointCorrection({
    root,
    correctionId: id,
    label: 'record remote drift evidence',
  });

  const qualityRepairGate = maybeAdoptLegacyQualityRepair(root, id, finalCheckpoint.head);
  if (qualityRepairGate.checkpointHead !== finalCheckpoint.head) {
    finalCheckpoint = { ...finalCheckpoint, head: qualityRepairGate.checkpointHead };
  }

  printResult({
    ESTADO: 'PASS',
    OPERACION: 'CORRECTION_SUPABASE_DEPLOY',
    CORRECTION_ID: id,
    ENVIRONMENT_ROLE: role,
    PROJECT_REF: projectRef,
    MIGRATION: migrationName,
    PREFLIGHT: classification.action,
    REMOTE_MUTATION_PERFORMED: remoteMutation ? 'SI' : 'NO_ALREADY_APPLIED',
    POST_PUSH_REMOTE_UP_TO_DATE: 'SI',
    CERTIFIED_CANDIDATE_HEAD: deployed.head,
    LIFECYCLE_HEAD: finalCheckpoint.head,
    EVIDENCE_REUSE: 'SAFE_CORRECTION_METADATA_ONLY',
    REMOTE_DRIFT: 'PASS',
    QUALITY_REPAIR_GATE: qualityRepairGate.action,
    QUALITY_REPAIR_REEXECUTED: 'NO',
    WORKTREE: 'CLEAN',
    PRODUCTION_MUTATIONS: 0,
  });

  return Object.freeze({
    correctionId: id,
    deploymentEvidence,
    driftEvidence,
    qualityRepairGate,
    certifiedCandidateHead: deployed.head,
    lifecycleHead: finalCheckpoint.head,
  });
}

export function main(argv = process.argv.slice(2)) {
  const args = parseArgs(argv);
  if (args.adoptLegacyQualityOnly) {
    return adoptLegacyQualityRepairOnly({
      correctionId: args.correctionId,
    });
  }
  return deployCorrectionSupabase({
    correctionId: args.correctionId,
    migration: args.migration,
    environmentRole: args.environmentRole,
    projectRef: args.projectRef,
    owner: args.owner,
    scope: args.scope,
  });
}

const isCli = process.argv[1]
  && path.resolve(process.argv[1]) === path.resolve(fileURLToPath(import.meta.url));

if (isCli) {
  try {
    main();
  } catch (error) {
    printResult({
      ESTADO: 'FAIL',
      OPERACION: 'CORRECTION_SUPABASE_DEPLOY',
      COMPROBACION_FALLIDA: (error instanceof Error ? error.message : String(error)).replace(/[\r\n]+/gu, ' | '),
      EXIT_CODE_REPORTADO: Number.isInteger(error?.exitCode) ? error.exitCode : 1,
    });
    process.exit(Number.isInteger(error?.exitCode) ? error.exitCode : 1);
  }
}
