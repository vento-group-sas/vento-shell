import assert from 'node:assert/strict';
import test from 'node:test';

import {
  createImplementationIntegrationIdentity,
  markImplementationIntegrationChecksPass,
  refreshImplementationIntegrationContext,
} from './implementation-integration-model.mjs';
import {
  IMPLEMENTATION_INTEGRATION_LOOP_MODEL_ID,
  assertImplementationIntegrationMergeReady,
  resolveImplementationIntegrationLoopStep,
} from './implementation-integration-loop.mjs';

const SHA = {
  candidate: 'a'.repeat(40),
  lifecycle: 'b'.repeat(40),
  base1: 'c'.repeat(40),
  base2: 'd'.repeat(40),
  integration1: 'e'.repeat(40),
  integration2: 'f'.repeat(40),
};

function readyIdentity() {
  const base = createImplementationIntegrationIdentity({
    instanceId: 'SHELL-CI-020::GAP-PKG-018',
    candidateSha: SHA.candidate,
    lifecycleHeadSha: SHA.lifecycle,
    integrationBaseSha: SHA.base1,
  });
  const ready = refreshImplementationIntegrationContext(base, {
    integrationBaseSha: SHA.base1,
    integrationSha: SHA.integration1,
  });
  return markImplementationIntegrationChecksPass(ready, {
    integrationSha: SHA.integration1,
  });
}

function stableRuntime(overrides = {}) {
  return {
    identity: readyIdentity(),
    originMainSha: SHA.base1,
    branchHeadSha: SHA.integration1,
    prHeadSha: SHA.integration1,
    mainContainedInBranch: true,
    checksRegistered: true,
    checksComplete: true,
    checksPassed: true,
    checksHeadSha: SHA.integration1,
    ...overrides,
  };
}

test('contexto estable con checks del SHA exacto permite merge exacto', () => {
  const step = resolveImplementationIntegrationLoopStep(stableRuntime());
  assert.equal(step.loop_model_id, IMPLEMENTATION_INTEGRATION_LOOP_MODEL_ID);
  assert.equal(step.action, 'MERGE_EXACT_SHA');
  assert.equal(step.integration_sha, SHA.integration1);
  assert.equal(step.candidate_sha, SHA.candidate);
});

test('si main avanza despues de checks se reintegra y no se mergea el SHA viejo', () => {
  const step = resolveImplementationIntegrationLoopStep(stableRuntime({
    originMainSha: SHA.base2,
  }));
  assert.equal(step.action, 'REINTEGRATE_MAIN');
  assert.equal(step.reason, 'MAIN_ADVANCED');
  assert.equal(step.candidate_sha, SHA.candidate);
});

test('si main no es ancestro del integration head se reintegra', () => {
  const step = resolveImplementationIntegrationLoopStep(stableRuntime({
    mainContainedInBranch: false,
  }));
  assert.equal(step.action, 'REINTEGRATE_MAIN');
  assert.equal(step.reason, 'MAIN_NOT_ANCESTOR_OF_INTEGRATION_HEAD');
});

test('integration SHA ausente o branch head distinto exige construir integracion', () => {
  const base = createImplementationIntegrationIdentity({
    instanceId: 'SHELL-CI-020::GAP-PKG-018',
    candidateSha: SHA.candidate,
    lifecycleHeadSha: SHA.lifecycle,
    integrationBaseSha: SHA.base1,
  });
  assert.equal(resolveImplementationIntegrationLoopStep({
    identity: base,
    originMainSha: SHA.base1,
  }).action, 'BUILD_INTEGRATION');

  assert.equal(resolveImplementationIntegrationLoopStep(stableRuntime({
    branchHeadSha: SHA.integration2,
  })).action, 'BUILD_INTEGRATION');
});

test('PR debe apuntar al integration SHA antes de consultar checks', () => {
  const step = resolveImplementationIntegrationLoopStep(stableRuntime({
    prHeadSha: SHA.integration2,
  }));
  assert.equal(step.action, 'REFRESH_PR_HEAD');
});

test('checks quedan ligados al integration SHA y al estado actual', () => {
  assert.equal(resolveImplementationIntegrationLoopStep(stableRuntime({
    checksRegistered: false,
    checksComplete: false,
    checksPassed: false,
    checksHeadSha: null,
  })).action, 'WAIT_CHECK_REGISTRATION');

  assert.equal(resolveImplementationIntegrationLoopStep(stableRuntime({
    checksHeadSha: SHA.integration2,
  })).action, 'WAIT_CHECKS_CURRENT_SHA');

  assert.equal(resolveImplementationIntegrationLoopStep(stableRuntime({
    checksComplete: false,
    checksPassed: false,
  })).action, 'WAIT_CHECKS');

  assert.equal(resolveImplementationIntegrationLoopStep(stableRuntime({
    checksPassed: false,
  })).action, 'STOP_CHECKS_FAILED');
});

test('checks PASS no autorizan merge hasta sellar INTEGRATION_CHECKS_PASS', () => {
  const base = createImplementationIntegrationIdentity({
    instanceId: 'SHELL-CI-020::GAP-PKG-018',
    candidateSha: SHA.candidate,
    lifecycleHeadSha: SHA.lifecycle,
    integrationBaseSha: SHA.base1,
  });
  const ready = refreshImplementationIntegrationContext(base, {
    integrationBaseSha: SHA.base1,
    integrationSha: SHA.integration1,
  });
  const step = resolveImplementationIntegrationLoopStep(stableRuntime({
    identity: ready,
  }));
  assert.equal(step.action, 'CONFIRM_MERGE');
  assert.equal(step.reason, 'IDENTITY_NOT_SEALED_AS_CHECKS_PASS');
});

test('assert de merge falla cerrado cuando main cambia', () => {
  assert.equal(
    assertImplementationIntegrationMergeReady(stableRuntime()).action,
    'MERGE_EXACT_SHA',
  );
  assert.throws(
    () => assertImplementationIntegrationMergeReady(stableRuntime({
      originMainSha: SHA.base2,
    })),
    /INTEGRATION_NOT_READY_FOR_MERGE:REINTEGRATE_MAIN/u,
  );
});

test('merge confirmado lleva a cleanup y cleanup completado a done', () => {
  const merged = resolveImplementationIntegrationLoopStep(stableRuntime({
    merged: true,
    mergedHeadSha: SHA.integration1,
  }));
  assert.equal(merged.action, 'CLEANUP');

  const identity = {
    ...readyIdentity(),
    phase: 'MERGED',
    merged_sha: '1'.repeat(40),
  };
  const done = resolveImplementationIntegrationLoopStep(stableRuntime({
    identity,
    merged: true,
    mergedHeadSha: SHA.integration1,
    cleanupComplete: true,
  }));
  assert.equal(done.action, 'DONE');
});
