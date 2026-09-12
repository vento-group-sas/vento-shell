import assert from 'node:assert/strict';
import test from 'node:test';

import {
  IMPLEMENTATION_WORK_PACKAGE_MODEL_ID,
  buildImplementationWorkPackage,
  renderImplementationWorkPackageMarkdown,
} from './implementation-work-package.mjs';

function coordinated({ targetStatus = 'PENDING_AUTHORIZATION', targetValidationCommands = [] } = {}) {
  const targetRecord = {
    instance_id: 'SHELL-CI-022::GAP-PKG-001',
    task_id: 'SHELL-CI-022',
    status: targetStatus,
    target_repositories: targetStatus === 'PENDING_AUTHORIZATION' ? [] : ['vento-group-sas/vento-shell'],
    authorized_changes: targetStatus === 'PENDING_AUTHORIZATION' ? [] : [{
      repo: 'vento-group-sas/vento-shell',
      path: 'tests/packages/GAP-PKG-001/example.test.ts',
      change: 'MODIFY',
      scope: 'Solo alcance de prueba.',
    }],
    validation_commands: targetValidationCommands,
    target_environments: [],
    evidence: [],
    authorization: targetStatus === 'PENDING_AUTHORIZATION' ? null : {
      decision: 'APPROVED',
    },
  };
  const reference = {
    instance_id: 'SHELL-CI-020::GAP-PKG-001',
    task_id: 'SHELL-CI-020',
    status: 'VERIFIED',
    target_repositories: ['vento-group-sas/vento-shell'],
    authorized_changes: [
      { repo: 'vento-group-sas/vento-shell', path: 'a.ts', change: 'MODIFY', scope: 'A' },
      { repo: 'vento-group-sas/vento-shell', path: 'runner.mjs', change: 'EXECUTE_ONLY', scope: 'B' },
    ],
    validation_commands: Array.from({ length: 7 }, (_, index) => `validation-${index + 1}`),
    target_environments: [{ environment_role: 'STAGING' }],
    evidence: [
      'PRE_VALIDATION_ATTEMPT probe PASS',
      'VALIDATION one PASS',
      'VALIDATION two PASS',
      'REMOTE_TARGET staging',
      { type: 'STRUCTURED' },
    ],
    authorization: { decision: 'APPROVED' },
  };
  return {
    coordinationSource: 'IMPLEMENTATION_CONTROL_ACTIVE_INSTANCE',
    readinessCurrent: { package_id: 'GAP-PKG-001' },
    executionOperatorPolicy: {
      assistantRepositoryWrites: false,
      assistantValidationExecution: false,
      assistantGitOperations: false,
      assistantRemoteMutations: false,
    },
    validationEngine: {
      policy: {
        failClosed: true,
        fullFallback: true,
        candidateReceiptReuse: 'EXACT_CANDIDATE_FINGERPRINT_ONLY',
        remoteReuse: 'NEVER_REUSE',
        authorizationReuse: 'NEVER_REUSE',
        prMergeReuse: 'NEVER_REUSE',
      },
    },
    physical: {
      active: {
        instanceId: targetRecord.instance_id,
        taskId: targetRecord.task_id,
        status: targetRecord.status,
        record: targetRecord,
      },
      instances: [{
        instanceId: targetRecord.instance_id,
        taskId: targetRecord.task_id,
        status: targetRecord.status,
        record: targetRecord,
      }],
      recordedInstances: [reference, targetRecord],
    },
  };
}

test('PENDING_AUTHORIZATION no expone comando mutante ejecutable y conserva referencia real', () => {
  const model = buildImplementationWorkPackage({ coordinatedStatus: coordinated() });
  assert.equal(model.model_id, IMPLEMENTATION_WORK_PACKAGE_MODEL_ID);
  assert.equal(model.target.instance_id, 'SHELL-CI-022::GAP-PKG-001');
  assert.equal(model.target.status, 'PENDING_AUTHORIZATION');
  assert.equal(model.target.mutation_authorized, false);
  assert.equal(model.operator_block.authorization_required, true);
  assert.deepEqual(model.operator_block.commands_executable_now, []);
  assert.equal(model.historical_reference.instance_id, 'SHELL-CI-020::GAP-PKG-001');
  assert.equal(model.efficiency_baseline.reference_validation_command_count, 7);
  assert.equal(model.efficiency_baseline.reference_evidence_entry_count, 5);
  assert.equal(model.efficiency_baseline.comparison_status, 'PENDING_EXPLICIT_INSTANCE_AUTHORIZATION');
  assert.equal(model.efficiency_baseline.validation_time_comparison_status, 'PENDING_MEASURED_ACCELERATOR_RUN');
  assert.equal(model.control_equivalence.automatic_authorization, false);
  assert.equal(model.control_equivalence.automatic_evidence_fabrication, false);
  assert.match(model.fingerprint_sha256, /^[a-f0-9]{64}$/u);
});

test('AUTHORIZED prepara secuencia de tres invocaciones sobre el accelerator existente', () => {
  const model = buildImplementationWorkPackage({
    coordinatedStatus: coordinated({
      targetStatus: 'AUTHORIZED',
      targetValidationCommands: ['npm test --silent', 'npm run docs:plan:check'],
    }),
  });
  assert.equal(model.target.mutation_authorized, true);
  assert.equal(model.operator_block.commands_executable_now.length, 1);
  assert.equal(
    model.operator_block.commands_executable_now[0].command,
    'npm run docs:implementation:advance -- --instance-id SHELL-CI-022::GAP-PKG-001',
  );
  assert.equal(model.operator_block.post_authorization_sequence.length, 3);
  assert.equal(
    model.operator_block.post_authorization_sequence[1].command,
    'npm run docs:implementation:advance -- --instance-id SHELL-CI-022::GAP-PKG-001 --materialized',
  );
  assert.equal(
    model.operator_block.post_authorization_sequence[2].command,
    'npm run docs:implementation:advance -- --instance-id SHELL-CI-022::GAP-PKG-001 --evidence-file .delivery/implementation-evidence-request.json',
  );
  assert.equal(model.efficiency_baseline.accelerated_cli_invocations_from_authorized_to_verified, 3);
  assert.equal(model.efficiency_baseline.semantic_human_gate_count_before, 3);
  assert.equal(model.efficiency_baseline.semantic_human_gate_count_after, 3);
  assert.equal(model.efficiency_baseline.semantic_human_gates_omitted, 0);
  assert.equal(model.efficiency_baseline.validation_gates_skipped, 0);
  assert.equal(model.efficiency_baseline.comparison_status, 'READY_FOR_MEASURED_ACCELERATOR_RUN');
});

test('markdown no introduce rutas ficticias ni afirma cierre de Entrega 2', () => {
  const model = buildImplementationWorkPackage({ coordinatedStatus: coordinated() });
  const markdown = renderImplementationWorkPackageMarkdown(model);
  assert.match(markdown, /SHELL-CI-022::GAP-PKG-001/u);
  assert.match(markdown, /SHELL-CI-020::GAP-PKG-001/u);
  assert.doesNotMatch(markdown, /\bRUTA\b|carpeta\/de\/ejemplo|C:\\ejemplo/iu);
  assert.doesNotMatch(markdown, /ENTREGA 2.*COMPLETA/iu);
});

// C5_WORK_PACKAGE_EFFECTIVE_STATE_RECOVERY
test('work package no expone comandos mutantes cuando el ledger declarado excede el estado efectivo', () => {
  const snapshot = coordinated({
    targetStatus: 'VERIFIED',
    targetValidationCommands: ['npm test --silent'],
  });
  const integrity = {
    declared_status: 'VERIFIED',
    highest_valid_status: 'IN_PROGRESS',
    status_valid: false,
    missing_prerequisites: ['LOCAL_VALIDATION_EVIDENCE_INCOMPLETE'],
    stale_evidence: [],
    next_legal_transition: 'MATERIALIZE_AND_VALIDATE',
    recoverable: true,
    recovery_action: 'RECONCILE_DECLARED_STATUS_TO_IN_PROGRESS_THEN_MATERIALIZE_VALIDATE_AND_SEAL_CANDIDATE',
  };
  snapshot.physical.active = {
    ...snapshot.physical.active,
    status: 'IN_PROGRESS',
    declaredStatus: 'VERIFIED',
    effectiveStatus: 'IN_PROGRESS',
    stateIntegrity: integrity,
  };
  snapshot.physical.instances[0] = snapshot.physical.active;
  snapshot.operationalContract = {
    mutatingEntrypoint: 'docs:implementation:advance',
    directLifecycleEntrypointsEnabled: false,
  };

  const model = buildImplementationWorkPackage({ coordinatedStatus: snapshot });
  assert.equal(model.target.declared_status, 'VERIFIED');
  assert.equal(model.target.status, 'IN_PROGRESS');
  assert.equal(model.target.status_valid, false);
  assert.equal(model.target.mutation_authorized, false);
  assert.equal(model.operator_block.state_integrity_recovery_required, true);
  assert.deepEqual(model.operator_block.commands_executable_now, []);
  assert.equal(model.efficiency_baseline.comparison_status, 'STATE_INTEGRITY_RECOVERY_REQUIRED');
  assert.equal(model.control_equivalence.mutating_entrypoint, 'docs:implementation:advance');
  assert.equal(model.control_equivalence.direct_lifecycle_entrypoints_enabled, false);
});
