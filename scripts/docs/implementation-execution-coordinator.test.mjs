import assert from 'node:assert/strict';
import test from 'node:test';

import {
  classifyExecutionState,
  resolveExecutorInstanceId,
  validateExecutionEvidenceReceipt,
} from './implementation-execution-coordinator.mjs';

test('clasifica estados físicos en gates deterministas', () => {
  const cases = new Map([
    ['PENDING_AUTHORIZATION', 'AUTHORIZATION_GATE'],
    ['AUTHORIZED', 'START'],
    ['IN_PROGRESS', 'MATERIALIZATION_GATE'],
    ['BLOCKED', 'BLOCKED'],
    ['IMPLEMENTED', 'EVIDENCE_GATE'],
    ['VERIFIED', 'FINISH'],
    ['DEFERRED', 'DEFERRED'],
  ]);
  for (const [status, expected] of cases) {
    assert.equal(classifyExecutionState({ status }), expected);
  }
});

test('resuelve instance_id explícito o desde la acción coordinada', () => {
  assert.equal(
    resolveExecutorInstanceId({ explicitInstanceId: 'shell-ci-021::GAP-PKG-001' }),
    'SHELL-CI-021::GAP-PKG-001',
  );
  assert.equal(
    resolveExecutorInstanceId({
      coordinatedStatus: {
        coordinatedPrimaryAction: { target: 'SHELL-CI-022::GAP-PKG-001' },
      },
    }),
    'SHELL-CI-022::GAP-PKG-001',
  );
  assert.equal(
    resolveExecutorInstanceId({
      coordinatedStatus: {
        coordinatedPrimaryAction: { target: 'GAP-PKG-001' },
      },
    }),
    null,
  );
});

test('evidence receipt exige candidato, comandos y ambiente exactos', () => {
  const instance = {
    instance_id: 'SHELL-CI-021::GAP-PKG-001',
    validation_commands: ['npm test'],
    target_environments: [
      {
        environment_role: 'STAGING',
        target_type: 'SUPABASE_PROJECT_REF',
        target_id: 'project',
        owner: 'OWNER',
      },
    ],
  };
  const candidateCommit = 'a'.repeat(40);
  const receipt = {
    schema_version: 1,
    instance_id: instance.instance_id,
    candidate_commit: candidateCommit,
    observed_at: '2026-09-07T20:00:00Z',
    validation_commands: ['npm test'],
    results: [{ command: 'npm test', status: 'PASS' }],
    target_environments: instance.target_environments,
    environment_results: [
      {
        ...instance.target_environments[0],
        status: 'PASS',
        evidence: ['remote PASS'],
      },
    ],
    operational_evidence: ['readiness PASS'],
  };

  assert.equal(
    validateExecutionEvidenceReceipt({ instance, receipt, candidateCommit }),
    true,
  );

  assert.throws(
    () => validateExecutionEvidenceReceipt({
      instance,
      receipt: { ...receipt, candidate_commit: 'b'.repeat(40) },
      candidateCommit,
    }),
    /no corresponde al candidato/u,
  );

  assert.throws(
    () => validateExecutionEvidenceReceipt({
      instance,
      receipt: {
        ...receipt,
        environment_results: [{ ...receipt.environment_results[0], status: 'FAIL' }],
      },
      candidateCommit,
    }),
    /no esta PASS/u,
  );
});
