import assert from 'node:assert/strict';
import test from 'node:test';

import {
  applyNormalRouteSelection,
  applyPriorityReturnPolicy,
  resolvePriorityRoute,
} from './execution-route.mjs';

function task(id, state) {
  return { id, title: `Título ${id}`, state, marker: state === 'APROBADA' ? '✅' : '[ ]', relativePath: 'task.md' };
}

const selector = {
  selected_route_id: 'TEST-LANE-001',
  latest_treq_task_id: 'PRE-TEST-001',
  priority_entry_task_id: 'ENTRY-TEST-001',
  return_policy: 'RETURN_TO_NORMAL_AFTER_PRIORITY_CERTIFICATION',
};
const lane = {
  lane_id: 'TEST-LANE-001',
  title: 'Carril de prueba',
  owner_application: 'test',
  required_task_artifacts: [
    { artifact_group_id: 'BASE', task_refs: ['BASE-TEST-001'] },
    { artifact_group_id: 'NEXT', task_refs: ['NEXT-TEST-001'] },
  ],
  conditional_artifacts: [
    { artifact_group_id: 'OPTIONAL_DESIGN', task_refs: ['COND-TEST-001'] },
  ],
  conditional_implementation_artifacts: [
    { artifact_group_id: 'OPTIONAL_IMPL', task_refs: ['IMPL-TEST-001'] },
  ],
  package_definition_tasks: ['PKG-TEST-001'],
  ordered_execution_stages: [
    { order: 1, stage_id: 'BASE', task_source: 'required_task_artifacts.BASE' },
    { order: 2, stage_id: 'NEXT', task_source: 'required_task_artifacts.NEXT' },
    { order: 3, stage_id: 'CONDITIONAL_DESIGN_ARTIFACTS', task_source: 'conditional_artifacts' },
    { order: 4, stage_id: 'PACKAGE_DEFINITION', task_source: 'package_definition_tasks' },
    { order: 5, stage_id: 'CONDITIONAL_IMPLEMENTATION_SCOPE', task_source: 'conditional_implementation_scope' },
    { order: 6, stage_id: 'CONDITIONAL_IMPLEMENTATION_EXECUTION', task_source: 'conditional_implementation_artifacts' },
  ],
};

function progress() {
  return {
    schema_version: 1,
    route_id: 'TEST-LANE-001',
    conditional_scopes: {
      CONDITIONAL_DESIGN_ARTIFACTS: {
        decision_state: 'NO INICIADA', applicable_groups: [], not_applicable_groups: [],
      },
      CONDITIONAL_IMPLEMENTATION_SCOPE: {
        decision_state: 'NO INICIADA', applicable_groups: [], not_applicable_groups: [],
      },
    },
    stage_controls: { CONDITIONAL_IMPLEMENTATION_EXECUTION: 'NO INICIADA' },
    instance_states: {},
  };
}

function taskMap(nextState = 'NO INICIADA') {
  return new Map([
    ['ENTRY-TEST-001', task('ENTRY-TEST-001', 'APROBADA')],
    ['BASE-TEST-001', task('BASE-TEST-001', 'APROBADA')],
    ['NEXT-TEST-001', task('NEXT-TEST-001', nextState)],
    ['COND-TEST-001', task('COND-TEST-001', 'APROBADA')],
    ['PKG-TEST-001', task('PKG-TEST-001', 'NO INICIADA')],
    ['IMPL-TEST-001', task('IMPL-TEST-001', 'NO INICIADA')],
  ]);
}

test('proyecta como activa la primera etapa pendiente del carril', () => {
  const active = resolvePriorityRoute({ selector, lanes: { lanes: [lane] }, progress: progress(), taskMap: taskMap() });
  assert.equal(active.route_id, 'TEST-LANE-001');
  assert.equal(active.priority_stage.order, 2);
  assert.deepEqual(active.task_ids, ['NEXT-TEST-001']);
  assert.equal(active.previous_task_id, 'BASE-TEST-001');
  assert.deepEqual(active.block_progress, {
    total_tasks: 1,
    approved_tasks: 0,
    pending_tasks: 1,
  });
});

test('detiene el carril en una decisión condicional explícita', () => {
  const active = resolvePriorityRoute({ selector, lanes: { lanes: [lane] }, progress: progress(), taskMap: taskMap('APROBADA') });
  assert.equal(active.priority_stage.stage_id, 'CONDITIONAL_DESIGN_ARTIFACTS');
  assert.deepEqual(active.task_ids, ['TEST-LANE-001::CONDITIONAL_DESIGN_ARTIFACTS']);
});

test('mantiene el progreso package_id separado del marcador global', () => {
  const routeProgress = progress();
  routeProgress.conditional_scopes.CONDITIONAL_DESIGN_ARTIFACTS = {
    decision_state: 'APROBADA', applicable_groups: ['OPTIONAL_DESIGN'], not_applicable_groups: [],
  };
  let active = resolvePriorityRoute({ selector, lanes: { lanes: [lane] }, progress: routeProgress, taskMap: taskMap('APROBADA') });
  assert.equal(active.priority_stage.stage_id, 'PACKAGE_DEFINITION');
  assert.deepEqual(active.task_ids, ['PKG-TEST-001::TEST-LANE-001']);

  routeProgress.instance_states['PKG-TEST-001::TEST-LANE-001'] = 'APROBADA';
  active = resolvePriorityRoute({ selector, lanes: { lanes: [lane] }, progress: routeProgress, taskMap: taskMap('APROBADA') });
  assert.equal(active.priority_stage.stage_id, 'CONDITIONAL_IMPLEMENTATION_SCOPE');
  assert.equal(taskMap('APROBADA').get('PKG-TEST-001').state, 'NO INICIADA');
});

test('rechaza aprobar una decisión condicional sin clasificar todos los grupos', () => {
  const routeProgress = progress();
  routeProgress.conditional_scopes.CONDITIONAL_DESIGN_ARTIFACTS.decision_state = 'APROBADA';
  assert.throws(
    () => resolvePriorityRoute({ selector, lanes: { lanes: [lane] }, progress: routeProgress, taskMap: taskMap('APROBADA') }),
    /clasificación incompleta/,
  );
});

test('retorna al flujo normal únicamente después de certificar todo el carril', () => {
  const normalConfig = {
    route_id: 'NORMAL-CANONICAL-FLOW-001',
    sequence_id: 'NORMAL-NEXT',
    segments: [{ prefix: 'NEXT-TEST', from: 1, to: 2 }],
    route_progress: { covered_tasks: 8, pending_tasks: 2 },
  };
  const incomplete = applyPriorityReturnPolicy(
    selector,
    { route_id: 'TEST-LANE-001', priority_route_complete: false },
    normalConfig,
  );
  assert.equal(incomplete.route_id, 'TEST-LANE-001');
  assert.equal(incomplete.post_priority_route.first_pending_task_id, 'NEXT-TEST-001');
  assert.equal(incomplete.post_priority_route.covered_tasks, 8);

  const resumed = applyPriorityReturnPolicy(
    selector,
    { route_id: 'TEST-LANE-001', priority_route_complete: true },
    normalConfig,
  );
  assert.equal(resumed.route_id, 'NORMAL-CANONICAL-FLOW-001');
  assert.equal(resumed.resumed_after_priority_route_id, 'TEST-LANE-001');
});

test('retorna al flujo normal al completar una priority lane documental', () => {
  const normalConfig = {
    route_id: 'NORMAL-CANONICAL-FLOW-001',
    sequence_id: 'NORMAL-NEXT',
    segments: [{ prefix: 'NEXT-TEST', from: 1, to: 2 }],
    route_progress: { covered_tasks: 8, pending_tasks: 2 },
  };
  const resumed = applyPriorityReturnPolicy(
    {
      ...selector,
      return_policy: 'RETURN_TO_NORMAL_AFTER_PRIORITY_COMPLETION',
    },
    { route_id: 'TEST-LANE-001', priority_route_complete: true },
    normalConfig,
  );
  assert.equal(resumed.route_id, 'NORMAL-CANONICAL-FLOW-001');
  assert.equal(resumed.resumed_after_priority_route_id, 'TEST-LANE-001');
});

test('execution-route conserva la autoridad única sobre latest_treq_task_id en el flujo normal', () => {
  const selected = applyNormalRouteSelection(
    {
      normal_route_id: 'NORMAL-CANONICAL-FLOW-001',
      latest_treq_task_id: 'NEXO-UX-025',
    },
    {
      route_id: 'NORMAL-CANONICAL-FLOW-001',
      latest_treq_task_id: 'SUPA-TRANS-006',
    },
  );

  assert.equal(selected.generated_from, 'execution-route.json');
  assert.equal(selected.latest_treq_task_id, 'NEXO-UX-025');
});
