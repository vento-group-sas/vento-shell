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
