import assert from 'node:assert/strict';
import fs from 'node:fs';
import test from 'node:test';

import {
    assertImplementationDeploymentEnvironment,
    assertImplementationPackageReadiness,
    assertImplementationTargetsNotBlocked,
    implementationCorrectionTargets,
} from './implementation-correction-guard.mjs';

test('guard evalúa tanto instance_id como task_id', () => {
    assert.deepEqual(
        implementationCorrectionTargets({ instance_id: 'AUTH-DB-035::GLOBAL', task_id: 'AUTH-DB-035' }),
        ['AUTH-DB-035::GLOBAL', 'AUTH-DB-035'],
    );
});

test('guard bloquea únicamente cuando CORR declara la instancia o la tarea', () => {
    const corrections = {
        records: [{
            record: {
                correction_id: 'AUTH-DB-033::CORR-001',
                status: 'PENDING_AUTHORIZATION',
                blocking: true,
                blocked_targets: ['AUTH-DB-035::GLOBAL'],
            }
        }],
    };
    assert.throws(
        () => assertImplementationTargetsNotBlocked(corrections, {
            instance_id: 'AUTH-DB-035::GLOBAL',
            task_id: 'AUTH-DB-035',
        }),
        /AUTH-DB-033::CORR-001/u,
    );
    assert.equal(
        assertImplementationTargetsNotBlocked(corrections, {
            instance_id: 'AUTH-DB-034::GLOBAL',
            task_id: 'AUTH-DB-034',
        }),
        true,
    );
});

test('package.json enruta docs:implementation:start por el guard de correcciones', () => {
    const manifest = JSON.parse(fs.readFileSync('package.json', 'utf8'));
    assert.equal(
        manifest.scripts['docs:implementation:start'],
        'node scripts/docs/implementation-correction-guard.mjs start',
    );
});

test('SHELL-CI-020 no puede iniciar mientras CURRENT_EXECUTABLE_WORK sea una fundación', () => {
    const instance = {
        instance_id: 'SHELL-CI-020::GAP-PKG-001',
        task_id: 'SHELL-CI-020',
        target_environments: [{ environment_role: 'STAGING', target_type: 'SUPABASE_PROJECT_REF', target_id: 'rcrxixmqhrndcervbllp', owner: 'SUPA-TRANS-015' }],
    };
    const blocked = { registry: { package_execution: {
        current_work: { kind: 'FOUNDATION_GATE', id: 'MRP015-000' },
        current: { package_id: 'GAP-PKG-001', current_work: { kind: 'FOUNDATION_GATE', id: 'MRP015-000' }, next_action: { type: 'WAIT_FOR_FOUNDATION_PREREQUISITE', target: 'MRP015-000' } },
    } } };

    assert.throws(
        () => assertImplementationPackageReadiness({ instance, readiness: blocked }),
        /CURRENT_EXECUTABLE_WORK=MRP015-000/u,
    );

    const ready = { registry: {
        package_execution: {
            current: { package_id: 'GAP-PKG-001', next_action: { type: 'CONTINUE_PHYSICAL_LIFECYCLE', target: 'SHELL-CI-020::GAP-PKG-001' } },
        },
        packages: [{
            package_id: 'GAP-PKG-001',
            deployment_environment: { status: 'PASS', detail: 'PASS' },
            package_gate: {
                deployment_environment: {
                    targets: [{ environment_role: 'STAGING', target_type: 'SUPABASE_PROJECT_REF', target_id: 'rcrxixmqhrndcervbllp', owner: 'SUPA-TRANS-015' }],
                    production_authorized: false,
                },
            },
        }],
    } };
    assert.equal(assertImplementationPackageReadiness({ instance, readiness: ready }), true);
});

test('guard rechaza target_environments distinto del package-gate', () => {
    const instance = {
        instance_id: 'SHELL-CI-020::GAP-PKG-001',
        task_id: 'SHELL-CI-020',
        target_environments: [{ environment_role: 'STAGING', target_type: 'SUPABASE_PROJECT_REF', target_id: 'otro-proyecto', owner: 'SUPA-TRANS-015' }],
    };
    const pkg = {
        deployment_environment: { status: 'PASS', detail: 'PASS' },
        package_gate: {
            deployment_environment: {
                targets: [{ environment_role: 'STAGING', target_type: 'SUPABASE_PROJECT_REF', target_id: 'rcrxixmqhrndcervbllp', owner: 'SUPA-TRANS-015' }],
                production_authorized: false,
            },
        },
    };
    assert.throws(
        () => assertImplementationDeploymentEnvironment({ instance, pkg }),
        /IMPLEMENTATION_ENVIRONMENT_MISMATCH/u,
    );
});

// CORR-010 PACKAGE STAGE GUARD
test('guard solo admite la etapa física exacta CI020..CI024 del package actual', () => {
  for (const taskId of ['SHELL-CI-021', 'SHELL-CI-022', 'SHELL-CI-023', 'SHELL-CI-024']) {
    const instance = {
      instance_id: `${taskId}::GAP-PKG-001`,
      task_id: taskId,
    };
    const readiness = { registry: { package_execution: {
      current: {
        package_id: 'GAP-PKG-001',
        next_action: { type: 'CONTINUE_PHYSICAL_LIFECYCLE', target: instance.instance_id },
      },
    } } };
    assert.equal(assertImplementationPackageReadiness({ instance, readiness }), true);
  }

  assert.throws(
    () => assertImplementationPackageReadiness({
      instance: { instance_id: 'SHELL-CI-023::GAP-PKG-001', task_id: 'SHELL-CI-023' },
      readiness: { registry: { package_execution: { current: {
        package_id: 'GAP-PKG-001',
        next_action: { type: 'CONTINUE_PHYSICAL_LIFECYCLE', target: 'SHELL-CI-021::GAP-PKG-001' },
      } } } },
    }),
    /IMPLEMENTATION_START_NOT_READY/u,
  );
});

test('package activo puede continuar aunque ya no sea primary frontier member', () => {
  const instance = {
    instance_id: 'SHELL-CI-022::GAP-PKG-001',
    task_id: 'SHELL-CI-022',
  };
  const readiness = {
    registry: {
      package_execution: {
        current: {
          package_id: 'GAP-PKG-002',
          next_action: { type: 'PREPARE_PACKAGE_GATE', target: 'GAP-PKG-002' },
        },
        active_physical: [{
          package_id: 'GAP-PKG-001',
          status: 'DEPLOYED',
          next_action: {
            type: 'CONTINUE_PHYSICAL_LIFECYCLE',
            target: 'SHELL-CI-022::GAP-PKG-001',
          },
        }],
      },
      packages: [],
    },
  };
  assert.doesNotThrow(() => assertImplementationPackageReadiness({ instance, readiness }));
});
