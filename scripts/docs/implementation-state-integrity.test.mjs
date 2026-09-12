import assert from 'node:assert/strict';
import fs from 'node:fs';
import test from 'node:test';

import {
  IMPLEMENTATION_STATE_INTEGRITY_MODEL_ID,
  evaluateImplementationStateIntegrity,
} from './implementation-state-integrity.mjs';

const baseInstance = (status) => ({
  instance_id: 'SHELL-CI-020::GAP-PKG-018',
  task_id: 'SHELL-CI-020',
  status,
  target_repositories: ['vento-group-sas/vento-shell'],
  authorized_changes: [{ repo: 'vento-group-sas/vento-shell', path: 'x', change: 'MODIFY' }],
  validation_commands: ['node --test x.test.mjs'],
  authorization: { decision: 'APPROVED' },
  evidence: [],
});

const validFacts = () => ({
  authorization_valid: true,
  implementation_branch_present: true,
  local_validation_complete: true,
  local_validation_missing: [],
  candidate_gate_pass: true,
  candidate_gate_detail: 'PASS',
  verification_evidence_present: true,
  verification_receipt_valid: true,
  grandfathered_verified: false,
  stale_evidence: [],
  verification_missing: [],
});

test('expone el modelo y exactamente los ocho campos canonicos', () => {
  assert.equal(IMPLEMENTATION_STATE_INTEGRITY_MODEL_ID, 'VENTO-IMPLEMENTATION-STATE-INTEGRITY-V1');
  const result = evaluateImplementationStateIntegrity({
    instance: baseInstance('AUTHORIZED'),
    facts: validFacts(),
  });
  assert.deepEqual(Object.keys(result), [
    'declared_status',
    'highest_valid_status',
    'status_valid',
    'missing_prerequisites',
    'stale_evidence',
    'next_legal_transition',
    'recoverable',
    'recovery_action',
  ]);
});

test('VERIFIED moderno valido conserva cierre como siguiente transicion', () => {
  const result = evaluateImplementationStateIntegrity({
    instance: baseInstance('VERIFIED'),
    facts: validFacts(),
  });
  assert.equal(result.highest_valid_status, 'VERIFIED');
  assert.equal(result.status_valid, true);
  assert.equal(result.next_legal_transition, 'FINISH');
});

test('VERIFIED imposible degrada logicamente a IN_PROGRESS sin reescribir el ledger', () => {
  const facts = validFacts();
  facts.local_validation_complete = false;
  facts.local_validation_missing = ['LOCAL_VALIDATION_MISSING:node --test x.test.mjs'];
  facts.verification_evidence_present = false;
  facts.verification_receipt_valid = false;
  facts.verification_missing = ['VERIFICATION_EVIDENCE_MISSING'];
  const instance = baseInstance('VERIFIED');
  const before = JSON.stringify(instance);
  const result = evaluateImplementationStateIntegrity({ instance, facts });
  assert.equal(result.highest_valid_status, 'IN_PROGRESS');
  assert.equal(result.status_valid, false);
  assert.equal(result.recoverable, true);
  assert.equal(
    result.recovery_action,
    'RECONCILE_DECLARED_STATUS_TO_IN_PROGRESS_THEN_MATERIALIZE_VALIDATE_AND_SEAL_CANDIDATE',
  );
  assert.equal(JSON.stringify(instance), before);
});

test('separa evidencia stale de prerrequisitos faltantes', () => {
  const facts = validFacts();
  facts.local_validation_complete = false;
  facts.local_validation_missing = ['LOCAL_VALIDATION_MISSING:node --test x.test.mjs'];
  facts.stale_evidence = ['LOCAL_VALIDATION_CANDIDATE_MISMATCH:node --test x.test.mjs'];
  const result = evaluateImplementationStateIntegrity({
    instance: baseInstance('IMPLEMENTED'),
    facts,
  });
  assert.deepEqual(result.stale_evidence, [
    'LOCAL_VALIDATION_CANDIDATE_MISMATCH:node --test x.test.mjs',
  ]);
  assert.ok(result.missing_prerequisites.includes('LOCAL_VALIDATION_MISSING:node --test x.test.mjs'));
});

test('VERIFIED historico inmutable puede conservarse por grandfathering', () => {
  const facts = validFacts();
  facts.verification_evidence_present = false;
  facts.verification_receipt_valid = false;
  facts.grandfathered_verified = true;
  const result = evaluateImplementationStateIntegrity({
    instance: baseInstance('VERIFIED'),
    facts,
  });
  assert.equal(result.highest_valid_status, 'VERIFIED');
  assert.equal(result.status_valid, true);
});

test('evidencia posterior no salta la transicion del estado declarado', () => {
  const result = evaluateImplementationStateIntegrity({
    instance: baseInstance('AUTHORIZED'),
    facts: validFacts(),
  });
  assert.equal(result.highest_valid_status, 'VERIFIED');
  assert.equal(result.status_valid, true);
  assert.equal(result.next_legal_transition, 'START');
});

test('estado desconocido falla cerrado', () => {
  const result = evaluateImplementationStateIntegrity({
    instance: baseInstance('MAGIC_DONE'),
    facts: validFacts(),
  });
  assert.equal(result.status_valid, false);
  assert.equal(result.recoverable, false);
  assert.equal(result.next_legal_transition, 'NONE');
  assert.deepEqual(result.missing_prerequisites, ['DECLARED_STATUS_UNKNOWN']);
});

test('coordinador y lifecycle imponen integridad antes de transiciones mutantes', () => {
  const coordinator = fs.readFileSync('scripts/docs/implementation-execution-coordinator.mjs', 'utf8');
  const lifecycle = fs.readFileSync('scripts/docs/implementation-branch-lifecycle.mjs', 'utf8');

  assert.match(coordinator, /assessImplementationStateIntegrity/u);
  assert.match(coordinator, /function assertCoordinatorStateIntegrity/u);
  assert.match(coordinator, /STATE_INTEGRITY_VIOLATION/u);
  const advanceIndex = coordinator.indexOf('async function advance');
  const integrityIndex = coordinator.indexOf('assertCoordinatorStateIntegrity', advanceIndex);
  const classifyIndex = coordinator.indexOf('classifyExecutionState(instance)', advanceIndex);
  assert.ok(advanceIndex >= 0 && integrityIndex > advanceIndex && classifyIndex > integrityIndex);

  assert.match(lifecycle, /assessImplementationStateIntegrity/u);
  assert.match(lifecycle, /function assertLifecycleStateIntegrity/u);
  assert.match(lifecycle, /assertLifecycleStateIntegrity\(root, instance, 'AUTHORIZED'\)/u);
  assert.match(lifecycle, /assertLifecycleStateIntegrity\(root, instance, 'IMPLEMENTED'\)/u);
  assert.match(lifecycle, /assertLifecycleStateIntegrity\(root, instance, 'VERIFIED'\)/u);
});
