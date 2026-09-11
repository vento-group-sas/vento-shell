import assert from 'node:assert/strict';
import fs from 'node:fs';
import test from 'node:test';

import {
  buildProgressSummary,
  buildRegistryMarkdown,
  calculateCompletionPercentage,
  expandSequenceSegments,
  resolveHandoff,
  resolveContinuity,
} from './plan-continuity-global.mjs';
import { resolveContinuityRoute } from './continuity-route.mjs';
import { buildUnitDagReconciliationIndex } from './implementation-materialization.mjs';

function task(id, state) {
  return {
    id,
    title: `Título ${id}`,
    state,
    marker: state === 'APROBADA' ? '✅' : '[ ]',
    relativePath: 'fragmento.md',
  };
}

test('avanza automáticamente a la primera tarea no aprobada', () => {
  const taskMap = new Map([
    ['PROC-CAT-020', task('PROC-CAT-020', 'APROBADA')],
    ['PROC-ACTOR-010', task('PROC-ACTOR-010', 'APROBADA')],
    ['UX-STATION-001', task('UX-STATION-001', 'NO INICIADA')],
    ['OPS-CAN-001', task('OPS-CAN-001', 'NO INICIADA')],
  ]);

  const result = resolveContinuity(taskMap, [
    'PROC-CAT-020',
    'PROC-ACTOR-010',
    'UX-STATION-001',
    'OPS-CAN-001',
  ]);

  assert.equal(result.isComplete, false);
  assert.equal(result.lastApproved.id, 'PROC-ACTOR-010');
  assert.equal(result.current.id, 'UX-STATION-001');
  assert.equal(result.next.id, 'OPS-CAN-001');
});

test('acepta una secuencia totalmente aprobada como estado terminal', () => {
  const taskMap = new Map([
    ['PROC-CAT-020', task('PROC-CAT-020', 'APROBADA')],
    ['PROC-ACTOR-010', task('PROC-ACTOR-010', 'APROBADA')],
    ['UX-STATION-001', task('UX-STATION-001', 'APROBADA')],
  ]);

  const result = resolveContinuity(taskMap, [
    'PROC-CAT-020',
    'PROC-ACTOR-010',
    'UX-STATION-001',
  ]);

  assert.equal(result.isComplete, true);
  assert.equal(result.lastApproved.id, 'UX-STATION-001');
  assert.equal(result.current, null);
  assert.equal(result.next, null);
});

test('mantiene un handoff reservado fuera de la secuencia que cierra', () => {
  const taskMap = new Map([
    ['SUPA-TRANS-016', task('SUPA-TRANS-016', 'PROPUESTA PARA APROBACIÓN')],
    ['SHELL-AUD-001', task('SHELL-AUD-001', 'NO INICIADA')],
  ]);
  const handoff = resolveHandoff(taskMap, {
    handoff_task_id: 'SHELL-AUD-001',
    handoff_sequence_id: 'H-SHARED-AUDIT-001',
  }, ['SUPA-TRANS-016']);

  assert.equal(handoff.id, 'SHELL-AUD-001');
  assert.equal(handoff.handoffSequenceId, 'H-SHARED-AUDIT-001');
});

test('rechaza iniciar el handoff antes de activar su secuencia', () => {
  const taskMap = new Map([
    ['SUPA-TRANS-016', task('SUPA-TRANS-016', 'APROBADA')],
    ['SHELL-AUD-001', task('SHELL-AUD-001', 'PROPUESTA PARA APROBACIÓN')],
  ]);

  assert.throws(
    () => resolveHandoff(taskMap, {
      handoff_task_id: 'SHELL-AUD-001',
      handoff_sequence_id: 'H-SHARED-AUDIT-001',
    }, ['SUPA-TRANS-016']),
    /debe permanecer NO INICIADA/
  );
});

test('rechaza aprobaciones fuera del orden declarado', () => {
  const taskMap = new Map([
    ['PROC-CAT-020', task('PROC-CAT-020', 'APROBADA')],
    ['UX-STATION-001', task('UX-STATION-001', 'NO INICIADA')],
    ['OPS-CAN-001', task('OPS-CAN-001', 'APROBADA')],
  ]);

  assert.throws(
    () => resolveContinuity(taskMap, [
      'PROC-CAT-020',
      'UX-STATION-001',
      'OPS-CAN-001',
    ]),
    /aprobaciones fuera de orden/
  );
});

test('calcula el porcentaje de completamiento con dos decimales', () => {
  assert.equal(calculateCompletionPercentage(340, 1575), 21.59);
  assert.equal(calculateCompletionPercentage(0, 0), 0);
  assert.equal(calculateCompletionPercentage(1575, 1575), 100);
});

test('deriva la etapa activa y el handoff sin rangos configurados manualmente', () => {
  const taskMap = new Map([
    ['PRE-TEST-001', task('PRE-TEST-001', 'APROBADA')],
    ['TEST-A-001', task('TEST-A-001', 'APROBADA')],
    ['TEST-A-002', task('TEST-A-002', 'APROBADA')],
    ['TEST-B-001', task('TEST-B-001', 'NO INICIADA')],
    ['TEST-B-002', task('TEST-B-002', 'NO INICIADA')],
  ]);
  const route = {
    schema_version: 1,
    route_id: 'TEST-ROUTE-001',
    entry_task_id: 'PRE-TEST-001',
    latest_treq_task_id: 'PRE-TEST-001',
    stages: [
      {
        sequence_id: 'TEST-A-SEQUENCE-001',
        block_code: 'BLOQUE A',
        block_title: 'A',
        selectors: [{ prefix: 'TEST-A' }],
      },
      {
        sequence_id: 'TEST-B-SEQUENCE-001',
        block_code: 'BLOQUE B',
        block_title: 'B',
        selectors: [{ prefix: 'TEST-B' }],
      },
    ],
  };

  const active = resolveContinuityRoute(route, taskMap);

  assert.equal(active.sequence_id, 'TEST-B-SEQUENCE-001');
  assert.equal(active.previous_task_id, 'TEST-A-002');
  assert.equal(active.handoff_task_id, null);
  assert.deepEqual(expandSequenceSegments(active.segments), ['TEST-B-001', 'TEST-B-002']);
});

test('incorpora una tarea nueva al prefijo y reabre automáticamente su etapa', () => {
  const taskMap = new Map([
    ['PRE-TEST-001', task('PRE-TEST-001', 'APROBADA')],
    ['TEST-A-001', task('TEST-A-001', 'APROBADA')],
    ['TEST-A-002', task('TEST-A-002', 'APROBADA')],
    ['TEST-A-003', task('TEST-A-003', 'NO INICIADA')],
    ['TEST-B-001', task('TEST-B-001', 'NO INICIADA')],
  ]);
  const active = resolveContinuityRoute({
    schema_version: 1,
    route_id: 'TEST-ROUTE-001',
    entry_task_id: 'PRE-TEST-001',
    latest_treq_task_id: 'PRE-TEST-001',
    stages: [
      {
        sequence_id: 'TEST-A-SEQUENCE-001',
        block_code: 'BLOQUE A',
        block_title: 'A',
        selectors: [{ prefix: 'TEST-A' }],
      },
      {
        sequence_id: 'TEST-B-SEQUENCE-001',
        block_code: 'BLOQUE B',
        block_title: 'B',
        selectors: [{ prefix: 'TEST-B' }],
      },
    ],
  }, taskMap);

  assert.equal(active.sequence_id, 'TEST-A-SEQUENCE-001');
  assert.equal(active.handoff_task_id, 'TEST-B-001');
  assert.deepEqual(expandSequenceSegments(active.segments), [
    'TEST-A-001',
    'TEST-A-002',
    'TEST-A-003',
  ]);
});

test('proyecta solo pendientes y conserva el orden después de adelantos aprobados', () => {
  const taskMap = new Map([
    ['PRE-TEST-001', task('PRE-TEST-001', 'APROBADA')],
    ['TEST-A-001', task('TEST-A-001', 'APROBADA')],
    ['TEST-A-002', task('TEST-A-002', 'NO INICIADA')],
    ['TEST-A-003', task('TEST-A-003', 'APROBADA')],
    ['TEST-A-004', task('TEST-A-004', 'NO INICIADA')],
  ]);

  const active = resolveContinuityRoute({
    schema_version: 1,
    route_id: 'TEST-ROUTE-001',
    entry_task_id: 'PRE-TEST-001',
    latest_treq_task_id: 'PRE-TEST-001',
    coverage_policy: 'ALL_CANONICAL_TASKS_EXACTLY_ONCE',
    projection_policy: 'PENDING_TASKS_ONLY',
    stages: [{
      sequence_id: 'TEST-A-SEQUENCE-001',
      block_code: 'BLOQUE A',
      block_title: 'A',
      selectors: [
        { task_ids: ['PRE-TEST-001'] },
        { prefix: 'TEST-A', from: 1, to: 4 },
      ],
    }],
  }, taskMap);

  assert.equal(active.previous_task_id, 'TEST-A-001');
  assert.deepEqual(expandSequenceSegments(active.segments), ['TEST-A-002', 'TEST-A-004']);
  assert.deepEqual(active.route_progress, {
    covered_tasks: 5,
    pending_tasks: 2,
    deferred_pending_tasks: 0,
    total_stages: 1,
    active_stage: 1,
  });
  assert.deepEqual(active.block_progress, {
    total_tasks: 5,
    approved_tasks: 3,
    pending_tasks: 2,
  });

  const continuity = resolveContinuity(taskMap, [
    active.previous_task_id,
    ...expandSequenceSegments(active.segments),
  ]);
  assert.equal(
    buildProgressSummary(continuity, active),
    'BLOQUE A: 3 de 5 aprobadas; TEST-A-002 pendiente',
  );
});

test('conserva etapas condicionales diferidas sin bloquear el handoff normal', () => {
  const taskMap = new Map([
    ['PRE-TEST-001', task('PRE-TEST-001', 'APROBADA')],
    ['OPTIONAL-TEST-001', task('OPTIONAL-TEST-001', 'NO INICIADA')],
    ['MAIN-TEST-001', task('MAIN-TEST-001', 'NO INICIADA')],
  ]);
  const active = resolveContinuityRoute({
    schema_version: 1,
    route_id: 'TEST-ROUTE-001',
    entry_task_id: 'PRE-TEST-001',
    latest_treq_task_id: 'PRE-TEST-001',
    coverage_policy: 'ALL_CANONICAL_TASKS_EXACTLY_ONCE',
    projection_policy: 'PENDING_TASKS_ONLY',
    stages: [
      {
        sequence_id: 'OPTIONAL-SEQUENCE-001',
        block_code: 'OPCIONAL',
        block_title: 'Condicional',
        activation_state: 'DEFERRED',
        selectors: [{ prefix: 'OPTIONAL-TEST' }],
      },
      {
        sequence_id: 'MAIN-SEQUENCE-001',
        block_code: 'PRINCIPAL',
        block_title: 'Principal',
        selectors: [{ task_ids: ['PRE-TEST-001', 'MAIN-TEST-001'] }],
      },
    ],
  }, taskMap);

  assert.equal(active.sequence_id, 'MAIN-SEQUENCE-001');
  assert.deepEqual(expandSequenceSegments(active.segments), ['MAIN-TEST-001']);
  assert.equal(active.route_progress.deferred_pending_tasks, 1);
});

test('usa como predecesora la última tarea ejecutable y omite una etapa diferida intermedia', () => {
  const taskMap = new Map([
    ['PRE-TEST-001', task('PRE-TEST-001', 'APROBADA')],
    ['DONE-TEST-001', task('DONE-TEST-001', 'APROBADA')],
    ['OPTIONAL-TEST-001', task('OPTIONAL-TEST-001', 'NO INICIADA')],
    ['MAIN-TEST-001', task('MAIN-TEST-001', 'NO INICIADA')],
  ]);
  const active = resolveContinuityRoute({
    schema_version: 1,
    route_id: 'TEST-ROUTE-001',
    entry_task_id: 'PRE-TEST-001',
    latest_treq_task_id: 'PRE-TEST-001',
    coverage_policy: 'ALL_CANONICAL_TASKS_EXACTLY_ONCE',
    projection_policy: 'PENDING_TASKS_ONLY',
    stages: [
      {
        sequence_id: 'DONE-SEQUENCE-001',
        block_code: 'TERMINADO',
        block_title: 'Terminado',
        selectors: [{ task_ids: ['PRE-TEST-001', 'DONE-TEST-001'] }],
      },
      {
        sequence_id: 'OPTIONAL-SEQUENCE-001',
        block_code: 'OPCIONAL',
        block_title: 'Condicional',
        activation_state: 'DEFERRED',
        selectors: [{ prefix: 'OPTIONAL-TEST' }],
      },
      {
        sequence_id: 'MAIN-SEQUENCE-001',
        block_code: 'PRINCIPAL',
        block_title: 'Principal',
        selectors: [{ prefix: 'MAIN-TEST' }],
      },
    ],
  }, taskMap);

  assert.equal(active.sequence_id, 'MAIN-SEQUENCE-001');
  assert.equal(active.previous_task_id, 'DONE-TEST-001');
  assert.notEqual(active.previous_task_id, 'OPTIONAL-TEST-001');
});

test('rechaza una ruta total cuando aparece una tarea canónica sin ubicar', () => {
  const taskMap = new Map([
    ['PRE-TEST-001', task('PRE-TEST-001', 'APROBADA')],
    ['TEST-A-001', task('TEST-A-001', 'NO INICIADA')],
  ]);

  assert.throws(() => resolveContinuityRoute({
    schema_version: 1,
    route_id: 'TEST-ROUTE-001',
    entry_task_id: 'PRE-TEST-001',
    latest_treq_task_id: 'PRE-TEST-001',
    coverage_policy: 'ALL_CANONICAL_TASKS_EXACTLY_ONCE',
    stages: [{
      sequence_id: 'TEST-A-SEQUENCE-001',
      block_code: 'BLOQUE A',
      block_title: 'A',
      selectors: [{ task_ids: ['PRE-TEST-001'] }],
    }],
  }, taskMap), /faltan TEST-A-001/);
});

test('acepta una ruta terminal sin handoff', () => {
  const taskMap = new Map([
    ['PRE-001', task('PRE-001', 'APROBADA')],
    ['TEST-A-001', task('TEST-A-001', 'APROBADA')],
  ]);

  assert.equal(resolveHandoff(taskMap, {
    handoff_task_id: null,
    handoff_sequence_id: null,
  }, ['PRE-001', 'TEST-A-001']), null);
});

test('registro global separa estado documental y estado físico sin convertir UNMAPPED en NO IMPLEMENTADA', () => {
  const approved = {
    ...task('TEST-MAT-001', 'APROBADA'),
    fileIndex: 0,
    taskIndex: 0,
  };
  const pending = {
    ...task('TEST-MAT-002', 'NO INICIADA'),
    fileIndex: 0,
    taskIndex: 1,
  };
  const taskMap = new Map([
    [approved.id, approved],
    [pending.id, pending],
  ]);
  const materialization = {
    tasks: [
      {
        task_id: approved.id,
        task_state: 'APROBADA',
        mode: 'DEFINE_ONCE',
        relation_state: 'UNMAPPED',
        explicit_materialization: null,
        materializing_unit_ids: [],
        direct_instances: [],
      },
      {
        task_id: pending.id,
        task_state: 'NO_APROBADA',
        mode: 'DEFINE_ONCE',
        relation_state: 'UNMAPPED',
        explicit_materialization: null,
        materializing_unit_ids: [],
        direct_instances: [],
      },
    ],
  };
  const stats = {
    total: 2,
    auth: 0,
    approved: 1,
    proposed: 0,
    notStarted: 1,
    rejected: 0,
    completionPercentage: 50,
  };
  const markdown = buildRegistryMarkdown(
    taskMap,
    stats,
    {
      lastApproved: approved,
      current: pending,
      next: null,
      handoff: null,
      isComplete: false,
    },
    materialization,
  );

  assert.match(markdown, /Estado documental \| Estado físico/u);
  assert.match(markdown, /⚠️ SIN_TRAZABILIDAD_FISICA/u);
  assert.match(markdown, /⏸ NO_EVALUADA/u);
  assert.match(markdown, /SIN_TRAZABILIDAD_FISICA.*no equivale.*NO IMPLEMENTADA/u);
});

test('registro global falla cerrado si NO_EVALUADA no coincide con las tareas documentales no aprobadas', () => {
  const approved = {
    ...task('TEST-MAT-101', 'APROBADA'),
    fileIndex: 0,
    taskIndex: 0,
  };
  const pending = {
    ...task('TEST-MAT-102', 'NO INICIADA'),
    fileIndex: 0,
    taskIndex: 1,
  };
  const taskMap = new Map([
    [approved.id, approved],
    [pending.id, pending],
  ]);

  assert.throws(
    () => buildRegistryMarkdown(
      taskMap,
      {
        total: 2,
        auth: 0,
        approved: 1,
        proposed: 0,
        notStarted: 1,
        rejected: 0,
        completionPercentage: 50,
      },
      {
        lastApproved: approved,
        current: pending,
        next: null,
        handoff: null,
        isComplete: false,
      },
      {
        tasks: [
          {
            task_id: approved.id,
            task_state: 'NO_APROBADA',
            mode: 'DEFINE_ONCE',
            relation_state: 'UNMAPPED',
            explicit_materialization: null,
            materializing_unit_ids: [],
            direct_instances: [],
          },
          {
            task_id: pending.id,
            task_state: 'NO_APROBADA',
            mode: 'DEFINE_ONCE',
            relation_state: 'UNMAPPED',
            explicit_materialization: null,
            materializing_unit_ids: [],
            direct_instances: [],
          },
        ],
      },
    ),
    /NO_EVALUADA desalineado con estado documental/u,
  );
});

test('STEP_GLOBAL_04 proyecta clasificación de adopción en el registro global', () => {
  const approved = {
    ...task('TEST-ADOPT-001', 'APROBADA'),
    fileIndex: 0,
    taskIndex: 0,
  };
  const pending = {
    ...task('TEST-ADOPT-002', 'NO INICIADA'),
    fileIndex: 0,
    taskIndex: 1,
  };
  const taskMap = new Map([
    [approved.id, approved],
    [pending.id, pending],
  ]);
  const materialization = {
    tasks: [
      {
        task_id: approved.id,
        task_state: 'APROBADA',
        adoption_classification: 'PARTIAL_DELTA',
        mode: 'DEFINE_ONCE',
        relation_state: 'UNMAPPED',
        explicit_materialization: null,
        materializing_unit_ids: [],
        direct_instances: [],
      },
      {
        task_id: pending.id,
        task_state: 'NO_APROBADA',
        adoption_classification: null,
        mode: 'DEFINE_ONCE',
        relation_state: 'UNMAPPED',
        explicit_materialization: null,
        materializing_unit_ids: [],
        direct_instances: [],
      },
    ],
  };
  const stats = {
    total: 2,
    auth: 0,
    approved: 1,
    proposed: 0,
    notStarted: 1,
    rejected: 0,
    completionPercentage: 50,
  };
  const markdown = buildRegistryMarkdown(
    taskMap,
    stats,
    {
      lastApproved: approved,
      current: pending,
      next: null,
      handoff: null,
      isComplete: false,
    },
    materialization,
  );

  assert.match(markdown, /Estado documental \| Estado físico \| Clasificación de adopción/u);
  assert.match(markdown, /Resumen de reconciliación de adopción/u);
  assert.match(markdown, /PARTIAL_DELTA \| \*\*1\*\*/u);
  assert.match(markdown, /⚠️ SIN_TRAZABILIDAD_FISICA \| PARTIAL_DELTA/u);
});

test('STEP_GLOBAL_05 valida candidate DAG sin promover candidate keys a implementation_unit_id', () => {
  const candidateA = 'V5_ANCHOR_BUNDLE:' + 'a'.repeat(64);
  const candidateB = 'V6_STRUCTURAL_PATHSET:' + 'b'.repeat(64);
  const adoptionReconciliation = {
    byTask: new Map([
      ['TEST-UNIT-001', { classification: 'EXISTING_NEEDS_ADOPTION_EVIDENCE' }],
      ['TEST-UNIT-002', { classification: 'PARTIAL_DELTA' }],
    ]),
  };
  const knownUnits = new Map([['physical-unit-001', { unit_id: 'physical-unit-001' }]]);
  const map = {
    unit_dag_reconciliation: {
      schema_version: 1,
      authority: 'STEP_GLOBAL_05',
      scope: 'FROZEN_STEP_GLOBAL_04_ADOPTION_COHORT_CANDIDATE_DAG',
      candidate_keys_are_implementation_unit_ids: false,
      candidate_dag_is_materialization_claim: false,
      candidate_dag_is_task_to_unit_relation: false,
      candidate_keys_can_populate_relations: false,
      physical_implementation_authorized: false,
      physical_implementation_requires_known_canonical_unit: true,
      known_unit_match_policy: 'EXACT_GATE_TARGET_PATH_OVERLAP_ONLY',
      source_report: {
        source_id: 'STEP_GLOBAL_05_V2',
        operation: 'STEP_GLOBAL_05_UNIT_CANDIDATE_SYNTHESIS_READ_ONLY_V2',
        report_file: 'report.txt',
        report_sha256: 'c'.repeat(64),
        shell_head: 'd'.repeat(40),
      },
      summary: {
        adoption_tasks: 2,
        candidate_tasks: 2,
        candidate_nodes: 2,
        candidate_edges: 1,
        shared_candidate_clusters: 0,
        cycle_components: 0,
        unresolved_candidate_tasks: 0,
        not_implemented_tasks: 0,
        known_canonical_units_observed: 1,
        known_unit_evidence_matches: 0,
      },
      known_canonical_units_observed: [{ unit_id: 'physical-unit-001' }],
      known_unit_evidence_matches: [],
      excluded_not_implemented_task_ids: [],
      candidate_nodes: [
        { candidate_key: candidateA, candidate_key_is_implementation_unit_id: false, task_ids: ['TEST-UNIT-001'], evidence_paths: ['vento-shell:a.ts'], known_unit_evidence_matches: [] },
        { candidate_key: candidateB, candidate_key_is_implementation_unit_id: false, task_ids: ['TEST-UNIT-002'], evidence_paths: ['vento-shell:b.ts'], known_unit_evidence_matches: [] },
      ],
      candidate_edges: [{ from: candidateA, to: candidateB, task_edges: ['TEST-UNIT-001->TEST-UNIT-002'] }],
      task_candidate_assignments: [
        { task_id: 'TEST-UNIT-001', classification: 'EXISTING_NEEDS_ADOPTION_EVIDENCE', candidate_key: candidateA, candidate_key_is_implementation_unit_id: false },
        { task_id: 'TEST-UNIT-002', classification: 'PARTIAL_DELTA', candidate_key: candidateB, candidate_key_is_implementation_unit_id: false },
      ],
    },
  };

  const result = buildUnitDagReconciliationIndex(map, { adoptionReconciliation, knownUnits });
  assert.equal(result.metrics.candidate_nodes, 2);
  assert.equal(result.metrics.candidate_edges, 1);
  assert.equal(result.metrics.cycle_components, 0);

  map.unit_dag_reconciliation.candidate_keys_are_implementation_unit_ids = true;
  assert.throws(
    () => buildUnitDagReconciliationIndex(map, { adoptionReconciliation, knownUnits }),
    /candidate_keys_are_implementation_unit_ids debe ser false/u,
  );
});

test('STEP_GLOBAL_05 proyecta resumen del candidate DAG en el registro global', () => {
  const approved = {
    ...task('TEST-DAG-001', 'APROBADA'),
    fileIndex: 0,
    taskIndex: 0,
  };
  const pending = {
    ...task('TEST-DAG-002', 'NO INICIADA'),
    fileIndex: 0,
    taskIndex: 1,
  };
  const markdown = buildRegistryMarkdown(
    new Map([[approved.id, approved], [pending.id, pending]]),
    { total: 2, auth: 0, approved: 1, proposed: 0, notStarted: 1, rejected: 0, completionPercentage: 50 },
    { lastApproved: approved, current: pending, next: null, handoff: null, isComplete: false },
    {
      unit_dag_reconciliation: {
        summary: {
          adoption_tasks: 122, candidate_tasks: 121, candidate_nodes: 103, candidate_edges: 8,
          shared_candidate_clusters: 9, cycle_components: 0, not_implemented_tasks: 1,
          known_canonical_units_observed: 1, known_unit_evidence_matches: 0,
        },
      },
      tasks: [
        { task_id: approved.id, task_state: 'APROBADA', mode: 'DEFINE_ONCE', relation_state: 'UNMAPPED', explicit_materialization: null, materializing_unit_ids: [], direct_instances: [] },
        { task_id: pending.id, task_state: 'NO_APROBADA', mode: 'DEFINE_ONCE', relation_state: 'UNMAPPED', explicit_materialization: null, materializing_unit_ids: [], direct_instances: [] },
      ],
    },
  );
  assert.match(markdown, /Resumen de UNIT DAG candidato/u);
  assert.ok(markdown.includes('| Clusters candidatos | **103** |'));
  assert.ok(markdown.includes('| Dependencias candidatas | **8** |'));
  assert.ok(markdown.includes('candidate keys NO son ') && markdown.includes('implementation_unit_id'));
});

// CORR-013 CONTINUITY MULTI ACTIVE
test('la continuidad proyecta el governed active set fisico y conserva primaryAction como compatibilidad', () => {
  const source = fs.readFileSync('scripts/docs/plan-continuity-global.mjs', 'utf8');
  assert.match(source, /physical.actionableSet/u);
  assert.match(source, /physicalSet.map/u);
  assert.match(source, /primaryAction.type/u);
});
