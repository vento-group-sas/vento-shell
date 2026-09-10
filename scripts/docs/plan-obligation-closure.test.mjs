import assert from 'node:assert/strict';
import test from 'node:test';

import {
  PLAN_OBLIGATION_CLOSURE_MODEL_ID,
  assertPlanObligationClosure,
  buildPlanObligationClosure,
  classifyTaskTreatment,
  normalizeImplementationUnit,
  treatmentClass,
} from './plan-obligation-closure.mjs';

import {
  IMPLEMENTATION_MATERIALIZATION_MAP_ID,
  assertImplementationMaterializationIndex,
  buildImplementationMaterializationIndex,
  normalizeMaterializationUnitId,
  validateImplementationMaterializationRelations,
} from './implementation-materialization.mjs';

const MODES = {
  DEFINE_ONCE: 'DEFINITION_CONSUMPTION',
  GLOBAL_ENABLE_ONCE: 'GLOBAL_FOUNDATION',
  TEMPLATE_PER_PACKAGE: 'PACKAGE_OBLIGATION',
  PER_IMPLEMENTATION_UNIT: 'IMPLEMENTATION_UNIT',
  PER_PACKAGE_AND_GLOBAL_FINAL: 'PACKAGE_AND_GLOBAL_CERTIFICATION',
  GLOBAL_FINAL: 'GLOBAL_FINAL_CERTIFICATION',
};

function task(id = 'TEST-TASK-001', marker = '✅') {
  return { id, marker, state: 'APROBADA' };
}

function topology(mode, executionGate = 'POST_E5_PACKAGE') {
  return { mode, executionGate };
}

test('clasifica las seis modalidades canónicas sin UNKNOWN', () => {
  assert.equal(PLAN_OBLIGATION_CLOSURE_MODEL_ID, 'VENTO-PLAN-OBLIGATION-CLOSURE-V1');
  for (const [mode, expected] of Object.entries(MODES)) {
    assert.equal(treatmentClass(mode), expected);
  }
  assert.equal(treatmentClass('NO_EXISTE'), 'UNKNOWN');
});

test('sentinelas de E5 no se convierten en implementation_unit_id', () => {
  for (const value of ['NO_MATERIALIZADO', 'NO MATERIALIZADO', 'NO_APLICA', 'PENDIENTE']) {
    assert.equal(normalizeImplementationUnit(value), null);
  }
  assert.equal(normalizeImplementationUnit('unit-real-001'), 'unit-real-001');
});

test('DEFINE_ONCE aprobado sin consumidor explícito queda como incidencia concreta', () => {
  const result = classifyTaskTreatment({
    task: task(),
    topologyEntry: topology('DEFINE_ONCE', 'NO_PHYSICAL_INSTANCE'),
    appRelationState: 'UNRESOLVED',
  });
  assert.equal(result.treatment_status, 'INCIDENCE');
  assert.ok(result.incidences.includes('DEFINE_ONCE_WITHOUT_EXPLICIT_CONSUMER_RELATION'));
  assert.ok(result.incidences.includes('NO_EXPLICIT_APPLICATION_RELATION'));
});

test('GLOBAL_ENABLE_ONCE usa identidad GLOBAL sin exigir aplicación concreta', () => {
  const result = classifyTaskTreatment({
    task: task('TEST-TASK-002'),
    topologyEntry: topology('GLOBAL_ENABLE_ONCE', 'PRE_E5_FOUNDATION'),
    appRelationState: 'GLOBAL_TRANSVERSAL',
  });
  assert.equal(result.treatment_status, 'TRACEABLE');
  assert.deepEqual(result.expected_instance_ids, ['TEST-TASK-002::GLOBAL']);
  assert.deepEqual(result.incidences, []);
});

test('PER_IMPLEMENTATION_UNIT aprobado sin unidad ni instancia queda visible', () => {
  const result = classifyTaskTreatment({
    task: task('TEST-TASK-003'),
    topologyEntry: topology('PER_IMPLEMENTATION_UNIT'),
    appRelationState: 'EXPLICIT',
  });
  assert.equal(result.treatment_status, 'INCIDENCE');
  assert.deepEqual(result.incidences, ['NO_EXPLICIT_IMPLEMENTATION_UNIT_RELATION']);
});

test('TEMPLATE_PER_PACKAGE con package y aplicación explícitos es trazable sin inventar implementación', () => {
  const result = classifyTaskTreatment({
    task: task('TEST-TASK-004'),
    topologyEntry: topology('TEMPLATE_PER_PACKAGE'),
    packageRefs: [{ package_id: 'GAP-PKG-001', implementation_unit_id: null }],
    appRelationState: 'EXPLICIT',
  });
  assert.equal(result.treatment_status, 'TRACEABLE');
  assert.deepEqual(result.package_ids, ['GAP-PKG-001']);
  assert.deepEqual(result.implementation_unit_ids, []);
  assert.deepEqual(result.incidences, []);
});

test('integración real clasifica todo el inventario y conserva incidencias como datos', () => {
  const report = buildPlanObligationClosure({ root: process.cwd() });
  assert.equal(report.model_id, PLAN_OBLIGATION_CLOSURE_MODEL_ID);
  assert.equal(assertPlanObligationClosure(report), true);
  assert.equal(
    report.metrics.classified_task_obligations,
    report.metrics.canonical_task_obligations,
  );
  assert.equal(
    Object.values(report.metrics.mode_counts).reduce((total, count) => total + count, 0),
    report.metrics.canonical_task_obligations,
  );
  assert.ok(report.metrics.canonical_task_obligations > 0);
  assert.ok(report.metrics.incidence_tasks > 0);
  assert.ok(report.metrics.incidence_relations >= report.metrics.incidence_tasks);
  assert.equal(report.structural_coverage.product_completion_claim, false);
  assert.equal(report.invariants.product_completion_claim, false);
});

const MATERIALIZATION_TEST_SEMANTICS = {
  task_marker_scope: 'DOCUMENTARY_CONTRACT_ONLY',
  materialization_scope: 'PHYSICAL_PRODUCT_RESULT',
  package_reference_is_materialization: false,
  verified_requires_evidence: true,
  unknown_relation_behavior: 'FAIL_CLOSED_AS_UNMAPPED',
  direct_instance_materializes_own_task: true,
};

test('materialization normaliza sentinelas y conserva unit IDs reales', () => {
  assert.equal(normalizeMaterializationUnitId('NO_MATERIALIZADO'), null);
  assert.equal(normalizeMaterializationUnitId('unit-real-001'), 'unit-real-001');
});

test('una implementation unit conocida puede materializar varios contratos aprobados', () => {
  const inventory = new Map([
    ['ANIMA-UX-003', { id: 'ANIMA-UX-003', marker: '✅' }],
    ['ANIMA-UX-004', { id: 'ANIMA-UX-004', marker: '✅' }],
  ]);
  const knownUnits = new Map([['unit-real-001', { unit_id: 'unit-real-001' }]]);
  const map = {
    schema_version: 1,
    map_id: IMPLEMENTATION_MATERIALIZATION_MAP_ID,
    semantics: MATERIALIZATION_TEST_SEMANTICS,
    relations: [
      {
        task_id: 'ANIMA-UX-003',
        completion_rule: 'ALL_REQUIRED',
        implementation_unit_ids: ['unit-real-001'],
        source_refs: ['TEST:ANIMA-UX-003'],
      },
      {
        task_id: 'ANIMA-UX-004',
        completion_rule: 'ALL_REQUIRED',
        implementation_unit_ids: ['unit-real-001'],
        source_refs: ['TEST:ANIMA-UX-004'],
      },
    ],
  };

  assert.deepEqual(
    validateImplementationMaterializationRelations(
      map,
      { topologyResult: { inventory }, knownUnits },
    ),
    [],
  );
});

test('materialization falla cerrado ante una implementation unit inventada', () => {
  const inventory = new Map([
    ['ANIMA-UX-003', { id: 'ANIMA-UX-003', marker: '✅' }],
  ]);
  const map = {
    schema_version: 1,
    map_id: IMPLEMENTATION_MATERIALIZATION_MAP_ID,
    semantics: MATERIALIZATION_TEST_SEMANTICS,
    relations: [
      {
        task_id: 'ANIMA-UX-003',
        completion_rule: 'ALL_REQUIRED',
        implementation_unit_ids: ['unit-no-conocida'],
        source_refs: ['TEST:UNKNOWN'],
      },
    ],
  };

  const errors = validateImplementationMaterializationRelations(
    map,
    { topologyResult: { inventory }, knownUnits: new Map() },
  );
  assert.match(errors.join('\n'), /no es una implementation_unit conocida/u);
});

test('integración real construye índice task a materializadores sin reclamar cierre físico', () => {
  const materialization = buildImplementationMaterializationIndex({ root: process.cwd() });
  assert.equal(materialization.model_id, IMPLEMENTATION_MATERIALIZATION_MAP_ID);
  assert.equal(assertImplementationMaterializationIndex(materialization), true);
  assert.equal(
    materialization.metrics.canonical_tasks,
    buildPlanObligationClosure({ root: process.cwd() }).metrics.canonical_task_obligations,
  );
  assert.equal(materialization.invariants.package_reference_is_not_materialization_relation, true);
  assert.equal(materialization.invariants.materialization_completion_claim, false);
});