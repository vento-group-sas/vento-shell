import assert from 'node:assert/strict';
import test from 'node:test';

import {
  coordinateImplementationStatus,
  deriveCoordinatedImplementationStatus,
} from './implementation-readiness-coordinator.mjs';
import { createImplementationValidationContext } from './implementation-validation-engine.mjs';

function baseControl(active = null) {
  return {
    primaryAction: active
      ? { type: 'EJECUTAR_IMPLEMENTACION', target: active.instanceId, title: 'Base active' }
      : { type: 'DOCUMENTAR_TAREA', target: 'DOC-001', title: 'Documentar' },
    physical: { active },
    documentary: { taskId: 'DOC-001' },
  };
}

const readyRegistry = {
  package_execution: {
    mode: 'DETERMINISTIC_GOVERNED_FRONTIER',
    state: 'READY_FOR_AUTHORIZATION',
    sequence: [{ package_id: 'NEXO-PACKAGE-001' }],
    current: {
      position: 1,
      package_id: 'NEXO-PACKAGE-001',
      next_action: {
        type: 'AUTHORIZE_PHYSICAL_IMPLEMENTATION',
        target: 'SHELL-CI-020::NEXO-PACKAGE-001',
        command: 'npm run docs:implementation:status',
        reason: 'Gate completo; falta autorización física humana.',
      },
    },
  },
  implementation_ready_queue: [{
    package_id: 'NEXO-PACKAGE-001',
    capability_id: 'NEXO_PACKAGE',
    owner_application: 'nexo',
    gate_id: 'E5-GATE-008::NEXO-PACKAGE-001',
    next_execution: 'SHELL-CI-020::NEXO-PACKAGE-001',
  }],
};

test('una instancia física ya activa conserva prioridad sobre la cola de packages', () => {
  const active = { instanceId: 'SHELL-CI-010::GLOBAL', status: 'IN_PROGRESS' };
  const result = coordinateImplementationStatus({ baseControl: baseControl(active), registry: readyRegistry });
  assert.equal(result.coordinationSource, 'IMPLEMENTATION_CONTROL_ACTIVE_INSTANCE');
  assert.equal(result.coordinatedPrimaryAction.target, active.instanceId);
  assert.equal(result.readinessCandidate.packageId, 'NEXO-PACKAGE-001');
});

test('sin instancia activa, el package actual ready produce candidato READY_FOR_AUTHORIZATION', () => {
  const result = coordinateImplementationStatus({ baseControl: baseControl(), registry: readyRegistry });
  assert.equal(result.coordinationSource, 'PACKAGE_EXECUTION_GOVERNED_FRONTIER');
  assert.equal(result.coordinatedPrimaryAction.type, 'AUTHORIZE_PHYSICAL_IMPLEMENTATION');
  assert.equal(result.coordinatedPrimaryAction.target, 'SHELL-CI-020::NEXO-PACKAGE-001');
  assert.equal(result.readinessCandidate.status, 'READY_FOR_AUTHORIZATION');
  assert.equal(result.readinessCandidate.authorizationRequired, true);
  assert.equal(result.implementationAuthorized, undefined);
});

test('línea completa conserva la acción documental base', () => {
  const base = baseControl();
  const result = coordinateImplementationStatus({
    baseControl: base,
    registry: { implementation_ready_queue: [], package_execution: { current: null, sequence: [] } },
  });
  assert.equal(result.coordinationSource, 'PACKAGE_EXECUTION_COMPLETE');
  assert.equal(result.coordinatedPrimaryAction, base.primaryAction);
  assert.equal(result.readinessCandidate, null);
});

test('un package actual bloqueado conserva el turno aunque otro esté ready', () => {
  const result = coordinateImplementationStatus({
    baseControl: baseControl(),
    registry: {
      package_execution: {
        state: 'BLOCKED_ON_CURRENT',
        sequence: [{ package_id: 'GAP-PKG-001' }, { package_id: 'GAP-PKG-061' }],
        current: {
          position: 1,
          package_id: 'GAP-PKG-001',
          next_action: {
            type: 'PREPARE_PACKAGE_GATE',
            target: 'GAP-PKG-001',
            command: 'npm run docs:package:prepare -- --package-id GAP-PKG-001',
            reason: 'Falta expediente.',
          },
        },
      },
      implementation_ready_queue: [{
        package_id: 'GAP-PKG-061',
        next_execution: 'SHELL-CI-020::GAP-PKG-061',
      }],
    },
  });
  assert.equal(result.coordinationSource, 'PACKAGE_EXECUTION_GOVERNED_FRONTIER');
  assert.equal(result.coordinatedPrimaryAction.type, 'PREPARE_PACKAGE_GATE');
  assert.equal(result.coordinatedPrimaryAction.target, 'GAP-PKG-001');
  assert.equal(result.readinessCandidate, null);
});

test('coordinador proyecta primero la fundación y conserva el package como consumidor', () => {
  const registry = {
    implementation_ready_queue: [],
    package_execution: {
      state: 'BLOCKED_ON_CURRENT',
      current_work: { kind: 'FOUNDATION_GATE', id: 'MRP015-000', gate_id: 'TOOLCHAIN_READY', owner_task: 'SUPA-TRANS-015', consumer_package_id: 'GAP-PKG-001' },
      sequence: [{ package_id: 'GAP-PKG-001' }],
      current: {
        position: 1,
        package_id: 'GAP-PKG-001',
        current_work: { kind: 'FOUNDATION_GATE', id: 'MRP015-000', gate_id: 'TOOLCHAIN_READY', owner_task: 'SUPA-TRANS-015', consumer_package_id: 'GAP-PKG-001' },
        next_action: { type: 'WAIT_FOR_FOUNDATION_PREREQUISITE', target: 'MRP015-000', command: 'npm run docs:package:readiness:check -- --package GAP-PKG-001', reason: 'Fundación pendiente.' },
      },
    },
  };

  const result = coordinateImplementationStatus({ baseControl: baseControl(), registry });
  assert.equal(result.coordinatedPrimaryAction.type, 'WAIT_FOR_FOUNDATION_PREREQUISITE');
  assert.equal(result.coordinatedPrimaryAction.target, 'MRP015-000');
  assert.equal(result.coordinatedPrimaryAction.currentWork.id, 'MRP015-000');
  assert.equal(result.readinessCandidate, null);
});

// CORR-010 COORDINATOR CI021
test('coordinador conserva la autorización derivada de CI021 aunque package_execution proyecte CONTINUE', () => {
  const instanceId = 'SHELL-CI-021::GAP-PKG-001';
  const base = {
    primaryAction: { type: 'AUTORIZAR_IMPLEMENTACION', target: instanceId, title: 'Readiness package' },
    physical: { active: { instanceId, status: 'PENDING_AUTHORIZATION' } },
    documentary: { taskId: 'DOC-001' },
  };
  const registry = {
    implementation_ready_queue: [],
    package_execution: {
      sequence: [{
        position: 1,
        package_id: 'GAP-PKG-001',
      }],
      current: {
        position: 1,
        package_id: 'GAP-PKG-001',
        next_action: {
          type: 'CONTINUE_PHYSICAL_LIFECYCLE',
          target: instanceId,
          command: 'npm run docs:implementation:status',
          reason: 'Continuar lifecycle físico.',
        },
      },
    },
  };
  const result = coordinateImplementationStatus({ baseControl: base, registry });
  assert.equal(result.coordinationSource, 'IMPLEMENTATION_CONTROL_ACTIVE_INSTANCE');
  assert.equal(result.coordinatedPrimaryAction.type, 'AUTORIZAR_IMPLEMENTACION');
  assert.equal(result.coordinatedPrimaryAction.target, instanceId);
});

test('validation context clona y congela package_execution y la cola compartida', () => {
  const source = structuredClone(readyRegistry);
  const context = createImplementationValidationContext({ registry: source });

  assert.equal(context.immutable, true);
  assert.equal(Object.isFrozen(context), true);
  assert.equal(Object.isFrozen(context.packageExecution), true);
  assert.equal(Object.isFrozen(context.registryProjection), true);
  assert.notEqual(context.packageExecution, source.package_execution);
  assert.equal(context.packageExecution.current.package_id, 'NEXO-PACKAGE-001');
  assert.match(context.fingerprintSha256, /^[a-f0-9]{64}$/u);

  source.package_execution.current.package_id = 'MUTATED-AFTER-CONTEXT';
  assert.equal(context.packageExecution.current.package_id, 'NEXO-PACKAGE-001');
  assert.throws(() => {
    context.packageExecution.current.package_id = 'MUTATED-INSIDE-CONTEXT';
  }, TypeError);
});

test('validation engine ejecuta readiness una vez e inyecta el mismo package_execution al control', async () => {
  let readinessScans = 0;
  let suppliedPackageExecution = null;
  const ticks = [0, 1, 5, 6, 8, 10];
  let tickIndex = 0;

  const result = await deriveCoordinatedImplementationStatus({
    root: '/repo',
    validationDependencies: {
      scanPackageReadiness: ({ root, check, trigger }) => {
        readinessScans += 1;
        assert.equal(root, '/repo');
        assert.equal(check, true);
        assert.equal(trigger, 'implementation-status');
        return { registry: structuredClone(readyRegistry) };
      },
      deriveImplementationControl: ({ root, packageExecution }) => {
        assert.equal(root, '/repo');
        suppliedPackageExecution = packageExecution;
        return baseControl();
      },
      now: () => ticks[tickIndex++],
    },
  });

  assert.equal(readinessScans, 1);
  assert.equal(suppliedPackageExecution.current.package_id, 'NEXO-PACKAGE-001');
  assert.equal(Object.isFrozen(suppliedPackageExecution), true);
  assert.equal(result.coordinationSource, 'PACKAGE_EXECUTION_GOVERNED_FRONTIER');
  assert.equal(result.coordinatedPrimaryAction.target, 'SHELL-CI-020::NEXO-PACKAGE-001');
  assert.equal(result.validationEngine.engineId, 'VENTO-IMPLEMENTATION-VALIDATION-ENGINE-V1');
  assert.deepEqual(result.validationEngine.phases, [
    'F1_OBSERVABILITY',
    'F2_SHARED_IMMUTABLE_CONTEXT',
    'F3_DEDUPLICATION_CANDIDATE_RECEIPTS',
    'F4_SHADOW_IMPACT_SELECTION',
    'F5_SAFE_SELECTIVE_VALIDATION',
  ]);
  assert.equal(result.validationEngine.observability.packageReadinessScans, 1);
  assert.equal(result.validationEngine.observability.packageExecutionReuses, 1);
  assert.equal(result.validationEngine.observability.duplicateReadinessScansAvoided, 1);
  assert.equal(result.validationEngine.observability.validationGatesSkipped, 0);
  assert.equal(result.validationEngine.policy.validationGatesSkipped, 0);
  assert.equal(result.validationEngine.policy.semantics, 'PRESERVED');
  assert.equal(result.validationEngine.policy.candidateReceiptReuse, 'EXACT_CANDIDATE_FINGERPRINT_ONLY');
  assert.equal(result.validationEngine.policy.remoteReuse, 'NEVER_REUSE');
  assert.equal(result.validationEngine.policy.authorizationReuse, 'NEVER_REUSE');
  assert.equal(result.validationEngine.policy.prMergeReuse, 'NEVER_REUSE');
  assert.equal(result.validationEngine.policy.shadowImpactMode, 'ACTIVE_GUARD');
  assert.equal(result.validationEngine.policy.selectiveExecution, 'GUARDED_PENDING_REAL_SHADOW_CERTIFICATION');
  assert.equal(result.validationEngine.policy.safeSelectivePolicy, 'PACKAGE_LOCAL_CLOSED_SCOPE_V1');
  assert.equal(result.validationEngine.policy.safeSelectiveCertification, 'PENDING_REAL_SHADOW_EVIDENCE');
  assert.equal(result.validationEngine.policy.safeSelectiveMinimumOmissionBearingSamples, 5);
  assert.equal(result.validationEngine.policy.safeSelectiveMinimumDistinctPackages, 3);
  assert.equal(result.validationEngine.policy.fullValidationRequired, true);
  assert.equal(result.validationEngine.policy.fullValidationFallback, true);
  assert.equal(result.validationEngine.phaseStatus.F4_SHADOW_IMPACT_SELECTION, 'ACTIVE');
  assert.equal(result.validationEngine.phaseStatus.F5_SAFE_SELECTIVE_VALIDATION, 'ACTIVE_GUARDED');
  assert.equal(result.validationEngine.safeSelectiveCertification.status, 'PENDING_REAL_SHADOW_EVIDENCE');
  assert.equal(result.validationEngine.safeSelectiveCertification.observedOmissionBearingSamples, 0);
  assert.equal(result.validationEngine.safeSelectiveCertification.observedDistinctPackages, 0);
  assert.match(result.validationEngine.safeSelectiveCertification.certificationSha256, /^[a-f0-9]{64}$/u);
  assert.equal(result.validationEngine.context.immutable, true);
  assert.equal(result.validationEngine.observability.packageReadinessMs, 4);
  assert.equal(result.validationEngine.observability.implementationControlMs, 2);
  assert.equal(result.validationEngine.observability.totalMs, 10);
});

test('validation engine falla cerrado si readiness no entrega package_execution', async () => {
  await assert.rejects(
    deriveCoordinatedImplementationStatus({
      root: '/repo',
      validationDependencies: {
        scanPackageReadiness: () => ({ registry: { implementation_ready_queue: [] } }),
        deriveImplementationControl: () => baseControl(),
        now: () => 0,
      },
    }),
    /registry\.package_execution/u,
  );
});

test('un package físico activo no monopoliza un primary independiente de la governed frontier', () => {
  const active = {
    instanceId: 'SHELL-CI-022::GAP-PKG-001',
    status: 'IN_PROGRESS',
  };
  const registry = {
    implementation_ready_queue: [],
    package_execution: {
      mode: 'DETERMINISTIC_GOVERNED_FRONTIER',
      state: 'FRONTIER_READY',
      sequence: [
        { position: 1, package_id: 'GAP-PKG-001' },
        { position: 2, package_id: 'GAP-PKG-002' },
      ],
      active_physical: [{
        position: 1,
        package_id: 'GAP-PKG-001',
        status: 'DEPLOYED',
        next_action: {
          type: 'CONTINUE_PHYSICAL_LIFECYCLE',
          target: 'SHELL-CI-022::GAP-PKG-001',
          command: 'npm run docs:implementation:status',
          reason: 'Pilot observation.',
        },
      }],
      current: {
        position: 2,
        package_id: 'GAP-PKG-002',
        next_action: {
          type: 'PREPARE_PACKAGE_GATE',
          target: 'GAP-PKG-002',
          command: 'npm run docs:package:start -- --package-id GAP-PKG-002',
          reason: 'Independent root.',
        },
      },
    },
  };

  const result = coordinateImplementationStatus({
    baseControl: baseControl(active),
    registry,
  });
  assert.equal(result.coordinationSource, 'PACKAGE_EXECUTION_GOVERNED_FRONTIER_WITH_ACTIVE_SET');
  assert.equal(result.coordinatedPrimaryAction.target, 'GAP-PKG-002');
  assert.equal(result.coordinatedPrimaryAction.type, 'PREPARE_PACKAGE_GATE');
});
