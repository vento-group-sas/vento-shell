import {
  isImplementationDerivedProjection,
  normalizeImplementationPath,
} from './implementation-path-policy.mjs';

export const IMPLEMENTATION_INTEGRATION_MODEL_ID = 'VENTO-IMPLEMENTATION-INTEGRATION-V1';

export const IMPLEMENTATION_INTEGRATION_PHASES = Object.freeze([
  'EVIDENCE_SEALED',
  'INTEGRATION_BASE_RESOLVED',
  'INTEGRATION_READY',
  'INTEGRATION_CHECKS_PASS',
  'MERGED',
  'CLEANED',
]);

const SHA_PATTERN = /^[0-9a-f]{40}$/u;

export const IMPLEMENTATION_CANDIDATE_LIFECYCLE_MODEL_ID =
  'VENTO-IMPLEMENTATION-CANDIDATE-LIFECYCLE-V1';

const IMPLEMENTATION_INSTANCE_DIRECTORY =
  'docs/plan-canonico/modular/implementation-instances/';
const LOCAL_VALIDATION_EVIDENCE_PATTERN =
  /^LOCAL_VALIDATION candidate=([0-9a-f]{40}) command=(.*) status=(PASS|NOT_APPLICABLE)$/u;

function normalizeLifecyclePath(value) {
  return normalizeImplementationPath(value);
}

function candidateLifecycleLedgerPath(instanceId) {
  const [taskId, instanceKey] = String(instanceId ?? '').trim().split('::');
  if (!taskId || !instanceKey) return null;
  return `docs/plan-canonico/modular/implementation-instances/${taskId}__${instanceKey}.json`;
}

function candidateLifecycleContract(record) {
  if (!record || typeof record !== 'object' || Array.isArray(record)) return null;
  const keys = Object.keys(record)
    .filter((key) => key !== 'status' && key !== 'evidence')
    .sort();
  return JSON.stringify(Object.fromEntries(keys.map((key) => [key, record[key]])));
}

export function resolveValidationCandidateAnchor(instance) {
  const commands = Array.isArray(instance?.validation_commands)
    ? instance.validation_commands.map((entry) => String(entry ?? '').trim()).filter(Boolean)
    : [];
  if (commands.length === 0) {
    return Object.freeze({
      status: 'MISS',
      candidate_sha: null,
      reason: 'VALIDATION_COMMANDS_EMPTY',
      missing_commands: [],
      mixed_commands: [],
    });
  }

  const candidatesByCommand = new Map(commands.map((command) => [command, new Set()]));
  for (const entry of instance?.evidence ?? []) {
    if (typeof entry !== 'string') continue;
    const match = LOCAL_VALIDATION_EVIDENCE_PATTERN.exec(entry.trim());
    if (!match) continue;
    const [, candidateSha, command] = match;
    if (!candidatesByCommand.has(command)) continue;
    candidatesByCommand.get(command).add(candidateSha);
  }

  const missingCommands = commands.filter(
    (command) => (candidatesByCommand.get(command)?.size ?? 0) === 0,
  );
  const mixedCommands = commands.filter(
    (command) => (candidatesByCommand.get(command)?.size ?? 0) > 1,
  );
  if (missingCommands.length > 0) {
    return Object.freeze({
      status: 'MISS',
      candidate_sha: null,
      reason: 'LOCAL_VALIDATION_INCOMPLETE',
      missing_commands: Object.freeze(missingCommands),
      mixed_commands: Object.freeze(mixedCommands),
    });
  }
  if (mixedCommands.length > 0) {
    return Object.freeze({
      status: 'INVALID',
      candidate_sha: null,
      reason: 'LOCAL_VALIDATION_MIXED_CANDIDATES_PER_COMMAND',
      missing_commands: Object.freeze([]),
      mixed_commands: Object.freeze(mixedCommands),
    });
  }

  const candidateShas = [...new Set(
    commands.flatMap((command) => [...(candidatesByCommand.get(command) ?? [])]),
  )].sort();
  if (candidateShas.length !== 1 || !SHA_PATTERN.test(candidateShas[0])) {
    return Object.freeze({
      status: 'INVALID',
      candidate_sha: null,
      reason: 'LOCAL_VALIDATION_MIXED_CANDIDATES',
      missing_commands: Object.freeze([]),
      mixed_commands: Object.freeze([]),
    });
  }

  return Object.freeze({
    status: 'PASS',
    candidate_sha: candidateShas[0],
    reason: 'LOCAL_VALIDATION_SINGLE_CANDIDATE',
    missing_commands: Object.freeze([]),
    mixed_commands: Object.freeze([]),
  });
}

export function assessImplementationCandidateLifecycleDelta({
  instance,
  candidateLedger,
  lifecycleLedger,
  changedPaths = [],
  pristinePendingInstancePaths = [],
  candidateIsAncestor = true,
} = {}) {
  const instanceId = normalizeInstanceId(instance?.instance_id);
  const ownLedger = candidateLifecycleLedgerPath(instanceId);
  const changed = [...new Set(
    (Array.isArray(changedPaths) ? changedPaths : [])
      .map(normalizeLifecyclePath)
      .filter(Boolean),
  )].sort();
  const pristinePending = new Set(
    (Array.isArray(pristinePendingInstancePaths) ? pristinePendingInstancePaths : [])
      .map(normalizeLifecyclePath)
      .filter(Boolean),
  );

  const safePaths = [];
  const materialPaths = [];
  const reasons = [];

  if (candidateIsAncestor !== true) reasons.push('CANDIDATE_NOT_ANCESTOR_OF_LIFECYCLE_HEAD');
  if (!candidateLedger || typeof candidateLedger !== 'object' || Array.isArray(candidateLedger)) {
    reasons.push('CANDIDATE_LEDGER_MISSING');
  }
  if (!lifecycleLedger || typeof lifecycleLedger !== 'object' || Array.isArray(lifecycleLedger)) {
    reasons.push('LIFECYCLE_LEDGER_MISSING');
  }

  const candidateContract = candidateLifecycleContract(candidateLedger);
  const lifecycleContract = candidateLifecycleContract(lifecycleLedger);
  if (candidateContract && lifecycleContract && candidateContract !== lifecycleContract) {
    reasons.push('LIFECYCLE_CONTRACT_CHANGED');
  }
  if (lifecycleLedger && JSON.stringify(lifecycleLedger) !== JSON.stringify(instance)) {
    reasons.push('LIFECYCLE_LEDGER_NOT_CURRENT_INSTANCE');
  }

  for (const relativePath of changed) {
    if (relativePath === ownLedger || isImplementationDerivedProjection(relativePath)) {
      safePaths.push(relativePath);
    } else if (
      relativePath.startsWith(IMPLEMENTATION_INSTANCE_DIRECTORY)
      && pristinePending.has(relativePath)
    ) {
      safePaths.push(relativePath);
    } else {
      materialPaths.push(relativePath);
    }
  }
  if (materialPaths.length > 0) reasons.push('MATERIAL_PATH_CHANGED');

  const decision = reasons.length === 0
    ? 'REUSE_PHYSICAL_EVIDENCE'
    : 'REVALIDATE_PHYSICAL';

  return Object.freeze({
    model_id: IMPLEMENTATION_CANDIDATE_LIFECYCLE_MODEL_ID,
    instance_id: instanceId,
    decision,
    reason: reasons.join(',') || 'SAFE_LIFECYCLE_METADATA_ONLY',
    candidate_is_ancestor: candidateIsAncestor === true,
    changed_paths: Object.freeze(changed),
    safe_paths: Object.freeze(safePaths.sort()),
    material_paths: Object.freeze(materialPaths.sort()),
  });
}

const PHASE_RANK = new Map(
  IMPLEMENTATION_INTEGRATION_PHASES.map((phase, index) => [phase, index]),
);

function fail(message) {
  throw new Error(message);
}

function normalizeSha(value, label, { required = true } = {}) {
  const normalized = String(value ?? '').trim().toLowerCase();
  if (!normalized) {
    if (required) fail(`${label}_MISSING`);
    return null;
  }
  if (!SHA_PATTERN.test(normalized)) fail(`${label}_INVALID:${normalized}`);
  return normalized;
}

function normalizePhase(value) {
  const phase = String(value ?? '').trim().toUpperCase();
  if (!PHASE_RANK.has(phase)) fail(`INTEGRATION_PHASE_INVALID:${phase || 'EMPTY'}`);
  return phase;
}

function normalizeInstanceId(value) {
  const instanceId = String(value ?? '').trim();
  if (!/^[A-Z0-9]+(?:-[A-Z0-9]+)*-[0-9]{3,4}::[A-Za-z0-9][A-Za-z0-9._-]*$/u.test(instanceId)) {
    fail(`INTEGRATION_INSTANCE_ID_INVALID:${instanceId || 'EMPTY'}`);
  }
  return instanceId;
}

function rank(phase) {
  return PHASE_RANK.get(phase);
}

export function createImplementationIntegrationIdentity({
  instanceId,
  candidateSha,
  lifecycleHeadSha,
  integrationBaseSha,
  integrationSha = null,
  mergedSha = null,
  phase = 'INTEGRATION_BASE_RESOLVED',
} = {}) {
  const normalizedPhase = normalizePhase(phase);
  const normalizedIntegration = normalizeSha(
    integrationSha,
    'INTEGRATION_SHA',
    { required: rank(normalizedPhase) >= rank('INTEGRATION_READY') },
  );
  const normalizedMerged = normalizeSha(
    mergedSha,
    'MERGED_SHA',
    { required: rank(normalizedPhase) >= rank('MERGED') },
  );

  if (rank(normalizedPhase) < rank('INTEGRATION_READY') && normalizedIntegration) {
    fail(`INTEGRATION_SHA_PREMATURE:${normalizedPhase}`);
  }
  if (rank(normalizedPhase) < rank('MERGED') && normalizedMerged) {
    fail(`MERGED_SHA_PREMATURE:${normalizedPhase}`);
  }

  return Object.freeze({
    model_id: IMPLEMENTATION_INTEGRATION_MODEL_ID,
    instance_id: normalizeInstanceId(instanceId),
    phase: normalizedPhase,
    candidate_sha: normalizeSha(candidateSha, 'CANDIDATE_SHA'),
    lifecycle_head_sha: normalizeSha(lifecycleHeadSha, 'LIFECYCLE_HEAD_SHA'),
    integration_base_sha: normalizeSha(integrationBaseSha, 'INTEGRATION_BASE_SHA'),
    integration_sha: normalizedIntegration,
    merged_sha: normalizedMerged,
  });
}

function normalizeIdentity(identity) {
  if (!identity || identity.model_id !== IMPLEMENTATION_INTEGRATION_MODEL_ID) {
    fail('INTEGRATION_IDENTITY_MODEL_INVALID');
  }
  return createImplementationIntegrationIdentity({
    instanceId: identity.instance_id,
    candidateSha: identity.candidate_sha,
    lifecycleHeadSha: identity.lifecycle_head_sha,
    integrationBaseSha: identity.integration_base_sha,
    integrationSha: identity.integration_sha,
    mergedSha: identity.merged_sha,
    phase: identity.phase,
  });
}

export function refreshImplementationIntegrationContext(identity, {
  integrationBaseSha,
  integrationSha = null,
} = {}) {
  const current = normalizeIdentity(identity);
  const normalizedIntegration = normalizeSha(
    integrationSha,
    'INTEGRATION_SHA',
    { required: false },
  );
  return createImplementationIntegrationIdentity({
    instanceId: current.instance_id,
    candidateSha: current.candidate_sha,
    lifecycleHeadSha: current.lifecycle_head_sha,
    integrationBaseSha,
    integrationSha: normalizedIntegration,
    mergedSha: null,
    phase: normalizedIntegration ? 'INTEGRATION_READY' : 'INTEGRATION_BASE_RESOLVED',
  });
}

export function markImplementationIntegrationChecksPass(identity, {
  integrationSha,
} = {}) {
  const current = normalizeIdentity(identity);
  if (!['INTEGRATION_READY', 'INTEGRATION_CHECKS_PASS'].includes(current.phase)) {
    fail(`INTEGRATION_CHECKS_PHASE_INVALID:${current.phase}`);
  }
  const validatedSha = normalizeSha(integrationSha, 'INTEGRATION_SHA');
  if (validatedSha !== current.integration_sha) {
    fail(
      `INTEGRATION_CHECKS_SHA_MISMATCH:expected=${current.integration_sha};actual=${validatedSha}`,
    );
  }
  return createImplementationIntegrationIdentity({
    instanceId: current.instance_id,
    candidateSha: current.candidate_sha,
    lifecycleHeadSha: current.lifecycle_head_sha,
    integrationBaseSha: current.integration_base_sha,
    integrationSha: current.integration_sha,
    mergedSha: null,
    phase: 'INTEGRATION_CHECKS_PASS',
  });
}

export function markImplementationIntegrationMerged(identity, {
  mergedSha,
} = {}) {
  const current = normalizeIdentity(identity);
  if (current.phase !== 'INTEGRATION_CHECKS_PASS') {
    fail(`INTEGRATION_MERGE_PHASE_INVALID:${current.phase}`);
  }
  return createImplementationIntegrationIdentity({
    instanceId: current.instance_id,
    candidateSha: current.candidate_sha,
    lifecycleHeadSha: current.lifecycle_head_sha,
    integrationBaseSha: current.integration_base_sha,
    integrationSha: current.integration_sha,
    mergedSha,
    phase: 'MERGED',
  });
}

export function markImplementationIntegrationCleaned(identity) {
  const current = normalizeIdentity(identity);
  if (!['MERGED', 'CLEANED'].includes(current.phase)) {
    fail(`INTEGRATION_CLEANUP_PHASE_INVALID:${current.phase}`);
  }
  return createImplementationIntegrationIdentity({
    instanceId: current.instance_id,
    candidateSha: current.candidate_sha,
    lifecycleHeadSha: current.lifecycle_head_sha,
    integrationBaseSha: current.integration_base_sha,
    integrationSha: current.integration_sha,
    mergedSha: current.merged_sha,
    phase: 'CLEANED',
  });
}

export function implementationIntegrationDrift(identity, {
  currentBaseSha,
  currentIntegrationSha = null,
} = {}) {
  const current = normalizeIdentity(identity);
  const base = normalizeSha(currentBaseSha, 'CURRENT_INTEGRATION_BASE_SHA');
  const integration = normalizeSha(
    currentIntegrationSha,
    'CURRENT_INTEGRATION_SHA',
    { required: false },
  );
  const baseChanged = base !== current.integration_base_sha;
  const integrationChanged = integration !== current.integration_sha;
  return Object.freeze({
    base_changed: baseChanged,
    integration_changed: integrationChanged,
    requires_reintegration: baseChanged || integrationChanged,
    candidate_sha: current.candidate_sha,
    lifecycle_head_sha: current.lifecycle_head_sha,
  });
}
