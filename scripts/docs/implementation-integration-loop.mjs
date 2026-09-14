import {
  IMPLEMENTATION_INTEGRATION_MODEL_ID,
} from './implementation-integration-model.mjs';

export const IMPLEMENTATION_INTEGRATION_LOOP_MODEL_ID = 'VENTO-IMPLEMENTATION-INTEGRATION-LOOP-V1';

export const IMPLEMENTATION_INTEGRATION_ACTIONS = Object.freeze([
  'BUILD_INTEGRATION',
  'REINTEGRATE_MAIN',
  'REFRESH_PR_HEAD',
  'WAIT_CHECK_REGISTRATION',
  'WAIT_CHECKS_CURRENT_SHA',
  'WAIT_CHECKS',
  'STOP_CHECKS_FAILED',
  'MERGE_EXACT_SHA',
  'CONFIRM_MERGE',
  'CLEANUP',
  'DONE',
]);

const ACTION_SET = new Set(IMPLEMENTATION_INTEGRATION_ACTIONS);
const SHA_PATTERN = /^[0-9a-f]{40}$/u;

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

function normalizeIdentity(identity) {
  if (!identity || identity.model_id !== IMPLEMENTATION_INTEGRATION_MODEL_ID) {
    fail('INTEGRATION_LOOP_IDENTITY_INVALID');
  }
  return identity;
}

function action(name, detail = {}) {
  if (!ACTION_SET.has(name)) fail(`INTEGRATION_LOOP_ACTION_INVALID:${name}`);
  return Object.freeze({
    loop_model_id: IMPLEMENTATION_INTEGRATION_LOOP_MODEL_ID,
    action: name,
    ...detail,
  });
}

export function resolveImplementationIntegrationLoopStep({
  identity,
  originMainSha,
  branchHeadSha = null,
  prHeadSha = null,
  mainContainedInBranch = false,
  checksRegistered = false,
  checksComplete = false,
  checksPassed = false,
  checksHeadSha = null,
  merged = false,
  mergedHeadSha = null,
  cleanupComplete = false,
} = {}) {
  const current = normalizeIdentity(identity);
  const mainSha = normalizeSha(originMainSha, 'ORIGIN_MAIN_SHA');
  const branchSha = normalizeSha(branchHeadSha, 'BRANCH_HEAD_SHA', { required: false });
  const prSha = normalizeSha(prHeadSha, 'PR_HEAD_SHA', { required: false });
  const checkSha = normalizeSha(checksHeadSha, 'CHECKS_HEAD_SHA', { required: false });
  const mergedHead = normalizeSha(mergedHeadSha, 'MERGED_HEAD_SHA', { required: false });

  if (cleanupComplete) {
    if (!merged) fail('INTEGRATION_CLEANUP_WITHOUT_MERGE');
    if (!current.merged_sha) fail('INTEGRATION_CLEANUP_WITHOUT_MERGED_SHA');
    return action('DONE', {
      candidate_sha: current.candidate_sha,
      integration_sha: current.integration_sha,
      merged_sha: current.merged_sha,
    });
  }

  if (merged) {
    if (!current.integration_sha) fail('INTEGRATION_MERGED_WITHOUT_INTEGRATION_SHA');
    if (mergedHead && mergedHead !== current.integration_sha) {
      fail(
        `INTEGRATION_MERGED_HEAD_MISMATCH:expected=${current.integration_sha};actual=${mergedHead}`,
      );
    }
    return action('CLEANUP', {
      candidate_sha: current.candidate_sha,
      integration_sha: current.integration_sha,
      merged_sha: current.merged_sha,
    });
  }

  if (mainSha !== current.integration_base_sha) {
    return action('REINTEGRATE_MAIN', {
      reason: 'MAIN_ADVANCED',
      previous_base_sha: current.integration_base_sha,
      current_base_sha: mainSha,
      candidate_sha: current.candidate_sha,
    });
  }

  if (!current.integration_sha || current.phase === 'INTEGRATION_BASE_RESOLVED') {
    return action('BUILD_INTEGRATION', {
      integration_base_sha: mainSha,
      candidate_sha: current.candidate_sha,
      lifecycle_head_sha: current.lifecycle_head_sha,
    });
  }

  if (!branchSha || branchSha !== current.integration_sha) {
    return action('BUILD_INTEGRATION', {
      reason: 'BRANCH_HEAD_NOT_INTEGRATION_SHA',
      expected_integration_sha: current.integration_sha,
      branch_head_sha: branchSha,
    });
  }

  if (!mainContainedInBranch) {
    return action('REINTEGRATE_MAIN', {
      reason: 'MAIN_NOT_ANCESTOR_OF_INTEGRATION_HEAD',
      integration_base_sha: mainSha,
      integration_sha: current.integration_sha,
    });
  }

  if (!prSha || prSha !== current.integration_sha) {
    return action('REFRESH_PR_HEAD', {
      expected_integration_sha: current.integration_sha,
      pr_head_sha: prSha,
    });
  }

  if (!checksRegistered) {
    return action('WAIT_CHECK_REGISTRATION', {
      integration_sha: current.integration_sha,
    });
  }

  if (!checkSha || checkSha !== current.integration_sha) {
    return action('WAIT_CHECKS_CURRENT_SHA', {
      expected_integration_sha: current.integration_sha,
      checks_head_sha: checkSha,
    });
  }

  if (!checksComplete) {
    return action('WAIT_CHECKS', {
      integration_sha: current.integration_sha,
    });
  }

  if (!checksPassed) {
    return action('STOP_CHECKS_FAILED', {
      integration_sha: current.integration_sha,
    });
  }

  if (current.phase !== 'INTEGRATION_CHECKS_PASS') {
    return action('CONFIRM_MERGE', {
      reason: 'IDENTITY_NOT_SEALED_AS_CHECKS_PASS',
      integration_sha: current.integration_sha,
      phase: current.phase,
    });
  }

  return action('MERGE_EXACT_SHA', {
    integration_base_sha: current.integration_base_sha,
    integration_sha: current.integration_sha,
    candidate_sha: current.candidate_sha,
  });
}

export function assertImplementationIntegrationMergeReady(runtime) {
  const step = resolveImplementationIntegrationLoopStep(runtime);
  if (step.action !== 'MERGE_EXACT_SHA') {
    fail(`INTEGRATION_NOT_READY_FOR_MERGE:${step.action}`);
  }
  return step;
}
