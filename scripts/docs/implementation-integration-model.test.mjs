import assert from 'node:assert/strict';
import test from 'node:test';

import {
  IMPLEMENTATION_CANDIDATE_LIFECYCLE_MODEL_ID,
  IMPLEMENTATION_INTEGRATION_MODEL_ID,
  assessImplementationCandidateLifecycleDelta,
  createImplementationIntegrationIdentity,
  resolveValidationCandidateAnchor,
  implementationIntegrationDrift,
  markImplementationIntegrationChecksPass,
  markImplementationIntegrationCleaned,
  markImplementationIntegrationMerged,
  refreshImplementationIntegrationContext,
} from './implementation-integration-model.mjs';

const SHA = {
  candidate: 'a'.repeat(40),
  lifecycle: 'b'.repeat(40),
  base1: 'c'.repeat(40),
  base2: 'd'.repeat(40),
  integration1: 'e'.repeat(40),
  integration2: 'f'.repeat(40),
  merged: '1'.repeat(40),
};

function baseline() {
  return createImplementationIntegrationIdentity({
    instanceId: 'SHELL-CI-020::GAP-PKG-018',
    candidateSha: SHA.candidate,
    lifecycleHeadSha: SHA.lifecycle,
    integrationBaseSha: SHA.base1,
  });
}

test('separa candidato fisico, head lifecycle, base de integracion, integration SHA y merge SHA', () => {
  const identity = baseline();
  assert.equal(identity.model_id, IMPLEMENTATION_INTEGRATION_MODEL_ID);
  assert.equal(identity.phase, 'INTEGRATION_BASE_RESOLVED');
  assert.equal(identity.candidate_sha, SHA.candidate);
  assert.equal(identity.lifecycle_head_sha, SHA.lifecycle);
  assert.equal(identity.integration_base_sha, SHA.base1);
  assert.equal(identity.integration_sha, null);
  assert.equal(identity.merged_sha, null);
});

test('refrescar main conserva candidato y lifecycle head inmutables', () => {
  const first = refreshImplementationIntegrationContext(baseline(), {
    integrationBaseSha: SHA.base1,
    integrationSha: SHA.integration1,
  });
  const second = refreshImplementationIntegrationContext(first, {
    integrationBaseSha: SHA.base2,
    integrationSha: SHA.integration2,
  });

  assert.equal(second.phase, 'INTEGRATION_READY');
  assert.equal(second.candidate_sha, SHA.candidate);
  assert.equal(second.lifecycle_head_sha, SHA.lifecycle);
  assert.equal(second.integration_base_sha, SHA.base2);
  assert.equal(second.integration_sha, SHA.integration2);
  assert.equal(second.merged_sha, null);
});

test('avance de main invalida solo el contexto de integracion', () => {
  const ready = refreshImplementationIntegrationContext(baseline(), {
    integrationBaseSha: SHA.base1,
    integrationSha: SHA.integration1,
  });
  const drift = implementationIntegrationDrift(ready, {
    currentBaseSha: SHA.base2,
    currentIntegrationSha: SHA.integration1,
  });

  assert.equal(drift.base_changed, true);
  assert.equal(drift.integration_changed, false);
  assert.equal(drift.requires_reintegration, true);
  assert.equal(drift.candidate_sha, SHA.candidate);
  assert.equal(drift.lifecycle_head_sha, SHA.lifecycle);
});

test('checks quedan ligados al integration SHA exacto', () => {
  const ready = refreshImplementationIntegrationContext(baseline(), {
    integrationBaseSha: SHA.base1,
    integrationSha: SHA.integration1,
  });
  const checked = markImplementationIntegrationChecksPass(ready, {
    integrationSha: SHA.integration1,
  });

  assert.equal(checked.phase, 'INTEGRATION_CHECKS_PASS');
  assert.throws(
    () => markImplementationIntegrationChecksPass(ready, {
      integrationSha: SHA.integration2,
    }),
    /INTEGRATION_CHECKS_SHA_MISMATCH/u,
  );
});

test('merge solo puede sellarse despues de checks del integration SHA', () => {
  const ready = refreshImplementationIntegrationContext(baseline(), {
    integrationBaseSha: SHA.base1,
    integrationSha: SHA.integration1,
  });
  assert.throws(
    () => markImplementationIntegrationMerged(ready, { mergedSha: SHA.merged }),
    /INTEGRATION_MERGE_PHASE_INVALID/u,
  );

  const checked = markImplementationIntegrationChecksPass(ready, {
    integrationSha: SHA.integration1,
  });
  const merged = markImplementationIntegrationMerged(checked, {
    mergedSha: SHA.merged,
  });
  assert.equal(merged.phase, 'MERGED');
  assert.equal(merged.merged_sha, SHA.merged);

  const cleaned = markImplementationIntegrationCleaned(merged);
  assert.equal(cleaned.phase, 'CLEANED');
  assert.equal(cleaned.candidate_sha, SHA.candidate);
  assert.equal(cleaned.integration_sha, SHA.integration1);
  assert.equal(cleaned.merged_sha, SHA.merged);
});

test('modelo falla cerrado ante hashes o fases invalidas', () => {
  assert.throws(
    () => createImplementationIntegrationIdentity({
      instanceId: 'SHELL-CI-020::GAP-PKG-018',
      candidateSha: 'bad',
      lifecycleHeadSha: SHA.lifecycle,
      integrationBaseSha: SHA.base1,
    }),
    /CANDIDATE_SHA_INVALID/u,
  );

  assert.throws(
    () => createImplementationIntegrationIdentity({
      instanceId: 'SHELL-CI-020::GAP-PKG-018',
      candidateSha: SHA.candidate,
      lifecycleHeadSha: SHA.lifecycle,
      integrationBaseSha: SHA.base1,
      phase: 'MERGED',
      integrationSha: SHA.integration1,
    }),
    /MERGED_SHA_MISSING/u,
  );
});

test('candidate/lifecycle resuelve un unico candidato desde todas las validaciones', () => {
  const candidate = '2'.repeat(40);
  const instance = {
    instance_id: 'SHELL-CI-021::GAP-PKG-018',
    validation_commands: ['check:a', 'check:b'],
    evidence: [
      `LOCAL_VALIDATION candidate=${candidate} command=check:a status=PASS`,
      `LOCAL_VALIDATION candidate=${candidate} command=check:b status=NOT_APPLICABLE`,
    ],
  };
  assert.deepEqual(resolveValidationCandidateAnchor(instance), {
    status: 'PASS',
    candidate_sha: candidate,
    reason: 'LOCAL_VALIDATION_SINGLE_CANDIDATE',
    missing_commands: [],
    mixed_commands: [],
  });

  const mixed = structuredClone(instance);
  mixed.evidence[1] = `LOCAL_VALIDATION candidate=${'3'.repeat(40)} command=check:b status=PASS`;
  assert.equal(resolveValidationCandidateAnchor(mixed).status, 'INVALID');
});

test('candidate/lifecycle permite checkpoint de metadata y bloquea delta fisico', () => {
  const candidateLedger = {
    instance_id: 'SHELL-CI-021::GAP-PKG-018',
    task_id: 'SHELL-CI-021',
    status: 'IN_PROGRESS',
    validation_commands: ['check:a'],
    authorized_changes: [{ path: 'ledger', change: 'MODIFY' }],
    target_environments: [{ environment_role: 'STAGING', target_id: 'staging' }],
    evidence: [],
  };
  const lifecycleLedger = {
    ...candidateLedger,
    status: 'IMPLEMENTED',
    evidence: [`LOCAL_VALIDATION candidate=${'2'.repeat(40)} command=check:a status=PASS`],
  };

  const safe = assessImplementationCandidateLifecycleDelta({
    instance: lifecycleLedger,
    candidateLedger,
    lifecycleLedger,
    changedPaths: [
      'docs/plan-canonico/modular/implementation-instances/SHELL-CI-021__GAP-PKG-018.json',
      'docs/plan-canonico/modular/00_CABECERA_Y_ESTADO.md',
    ],
    candidateIsAncestor: true,
  });
  assert.equal(safe.model_id, IMPLEMENTATION_CANDIDATE_LIFECYCLE_MODEL_ID);
  assert.equal(safe.decision, 'REUSE_PHYSICAL_EVIDENCE');

  const physical = assessImplementationCandidateLifecycleDelta({
    instance: lifecycleLedger,
    candidateLedger,
    lifecycleLedger,
    changedPaths: ['src/product.ts'],
    candidateIsAncestor: true,
  });
  assert.equal(physical.decision, 'REVALIDATE_PHYSICAL');

  const changedCommands = structuredClone(lifecycleLedger);
  changedCommands.validation_commands = ['check:a', 'check:new'];
  const contract = assessImplementationCandidateLifecycleDelta({
    instance: changedCommands,
    candidateLedger,
    lifecycleLedger: changedCommands,
    changedPaths: [
      'docs/plan-canonico/modular/implementation-instances/SHELL-CI-021__GAP-PKG-018.json',
    ],
    candidateIsAncestor: true,
  });
  assert.equal(contract.decision, 'REVALIDATE_PHYSICAL');
  assert.match(contract.reason, /LIFECYCLE_CONTRACT_CHANGED/u);
});

test('candidate/lifecycle acepta pending pristino solo con certificacion explicita', () => {
  const candidateLedger = {
    instance_id: 'SHELL-CI-021::GAP-PKG-018',
    task_id: 'SHELL-CI-021',
    status: 'IN_PROGRESS',
    validation_commands: ['check:a'],
    authorized_changes: [{ path: 'ledger', change: 'MODIFY' }],
    target_environments: [{ environment_role: 'STAGING', target_id: 'staging' }],
    evidence: [],
  };
  const lifecycleLedger = {
    ...candidateLedger,
    status: 'VERIFIED',
    evidence: [
      `LOCAL_VALIDATION candidate=${'2'.repeat(40)} command=check:a status=PASS`,
    ],
  };
  const pendingPath =
    'docs/plan-canonico/modular/implementation-instances/SHELL-CI-022__GAP-PKG-018.json';

  const blocked = assessImplementationCandidateLifecycleDelta({
    instance: lifecycleLedger,
    candidateLedger,
    lifecycleLedger,
    changedPaths: [pendingPath],
    candidateIsAncestor: true,
  });
  assert.equal(blocked.decision, 'REVALIDATE_PHYSICAL');

  const safe = assessImplementationCandidateLifecycleDelta({
    instance: lifecycleLedger,
    candidateLedger,
    lifecycleLedger,
    changedPaths: [pendingPath],
    pristinePendingInstancePaths: [pendingPath],
    candidateIsAncestor: true,
  });
  assert.equal(safe.decision, 'REUSE_PHYSICAL_EVIDENCE');
  assert.deepEqual(safe.material_paths, []);
});
