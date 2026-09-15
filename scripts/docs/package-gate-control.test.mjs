import assert from 'node:assert/strict';
import test from 'node:test';

import {
  assessPackageGateRecord,
  packageGateRecordRelativePath,
} from './package-gate-control.mjs';

const policy = {
  instance_directory: 'docs/plan-canonico/modular/package-gate-instances',
  approval_word: 'APROBADO',
  statuses: ['WAITING_DOCUMENTATION', 'MATURATION_DRAFT', 'READY_FOR_APPROVAL', 'APPROVED_FOR_IMPLEMENTATION'],
};

function record(overrides = {}) {
  return {
    schema_version: 1,
    package_id: 'GAP-PKG-061',
    status: 'MATURATION_DRAFT',
    created_at: '2026-08-30T00:00:00.000Z',
    updated_at: '2026-08-30T00:00:00.000Z',
    physical_identity: { targets: [] },
    implementation_units: [],
    evidence_plan: { tests: [], observability: [], acceptance_criteria: [], rollback_steps: [] },
    authorization: { decision: 'PENDING', approved_by: null, approved_at: null, approval_ref: null, approval_statement: null },
    ...overrides,
  };
}

function completeRecord(overrides = {}) {
  return record({
    status: 'READY_FOR_APPROVAL',
    physical_identity: { targets: [{ repository: 'vento-pass', path: 'src/profile.ts', symbol_or_surface: 'Profile', operation: 'create' }] },
    implementation_units: [{ unit_id: 'PASS-PROFILE-001', repository: 'vento-pass', change: 'Materializar perfil del cliente.' }],
    deployment_environment: {
      canonical_task_id: 'DELIV-PKG-019',
      rollout_profile: 'TP-UI-001',
      environment_profile: 'ENV-WEB-CI-STAGING',
      targets: [{ environment_role: 'STAGING', target_type: 'WEB_ENVIRONMENT', target_id: 'staging', owner: 'VENTO_OWNER' }],
      production_authorized: false,
    },
    evidence_plan: {
      tests: [{ command: 'npm test', expected_result: 'PASS' }],
      observability: [{ signal: 'profile.created', expected_result: 'Evento emitido.' }],
      acceptance_criteria: ['El perfil se crea y consulta.'],
      rollback_steps: ['Revertir la unidad y conservar datos compatibles.'],
    },
    ...overrides,
  });
}

test('la ruta es determinista y rechaza identidades no canónicas', () => {
  assert.equal(packageGateRecordRelativePath('GAP-PKG-061', policy), 'docs/plan-canonico/modular/package-gate-instances/GAP-PKG-061.json');
  assert.throws(() => packageGateRecordRelativePath('NEXO-001', policy), /package_id inválido/u);
});

test('un expediente vacío queda en maduración y no pasa ningún gate', () => {
  const assessment = assessPackageGateRecord(record(), { policy, taskPrerequisites: { remaining: 0 } });
  assert.equal(assessment.status, 'MATURATION_DRAFT');
  assert.equal(assessment.dossier_complete, false);
  assert.deepEqual(Object.values(assessment.gates), [false, false, false, false]);
});

test('un expediente completo sin APROBADO queda listo para revisión pero bloqueado', () => {
  const assessment = assessPackageGateRecord(completeRecord(), { policy, taskPrerequisites: { remaining: 0 } });
  assert.equal(assessment.status, 'READY_FOR_APPROVAL');
  assert.equal(assessment.approval_complete, false);
  assert.deepEqual(Object.values(assessment.gates), [false, false, false, false]);
});

test('solo la aprobación humana completa permite pasar los cuatro gates', () => {
  const approved = completeRecord({
    status: 'APPROVED_FOR_IMPLEMENTATION',
    authorization: {
      decision: 'APROBADO',
      approved_by: 'usuario',
      approved_at: '2026-08-30T01:00:00.000Z',
      approval_ref: 'chat:package-gap-061',
      approval_statement: 'APROBADO GAP-PKG-061 con este alcance exacto.',
    },
  });
  const assessment = assessPackageGateRecord(approved, { policy, taskPrerequisites: { remaining: 0 } });
  assert.equal(assessment.status, 'APPROVED_FOR_IMPLEMENTATION');
  assert.equal(assessment.valid, true);
  assert.deepEqual(Object.values(assessment.gates), [true, true, true, true]);
});

test('una aprobación no puede saltarse tareas documentales pendientes', () => {
  const approved = completeRecord({
    status: 'APPROVED_FOR_IMPLEMENTATION',
    authorization: {
      decision: 'APROBADO', approved_by: 'usuario', approved_at: '2026-08-30T01:00:00.000Z', approval_ref: 'ref', approval_statement: 'APROBADO.',
    },
  });
  const assessment = assessPackageGateRecord(approved, { policy, taskPrerequisites: { remaining: 1 } });
  assert.equal(assessment.valid, false);
  assert.match(assessment.errors.join(' '), /tareas prerrequisito pendientes/u);
});

test('deployment_environment es parte obligatoria del dossier antes de aprobación', () => {
  const incomplete = completeRecord({ deployment_environment: null });
  const assessment = assessPackageGateRecord(incomplete, { policy, taskPrerequisites: { remaining: 0 } });
  assert.equal(assessment.status, 'MATURATION_DRAFT');
  assert.equal(assessment.sections.deployment_environment, false);
  assert.equal(assessment.dossier_complete, false);
});

test('production_authorized=false rechaza un destino PRODUCTION', () => {
  const invalid = completeRecord({
    deployment_environment: {
      canonical_task_id: 'DELIV-PKG-019',
      rollout_profile: 'TP-DB-001',
      environment_profile: 'ENV-SUPABASE-LOCAL-CI-STAGING',
      targets: [{ environment_role: 'PRODUCTION', target_type: 'SUPABASE_PROJECT_REF', target_id: 'prod-ref', owner: 'SUPA-TRANS-015' }],
      production_authorized: false,
    },
  });
  const assessment = assessPackageGateRecord(invalid, { policy, taskPrerequisites: { remaining: 0 } });
  assert.equal(assessment.valid, false);
  assert.match(assessment.errors.join(' '), /production_authorized=false/u);
});
