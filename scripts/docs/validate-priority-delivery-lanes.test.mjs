import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import test from 'node:test';
import {
  validatePriorityDeliveryLaneData as validatePriorityDeliveryLaneDataRaw,
} from './validate-priority-delivery-lanes.mjs';

const normalExecutionRouteSource = JSON.stringify({
  selected_route_id: 'NORMAL-CANONICAL-FLOW-001',
  normal_route_id: 'NORMAL-CANONICAL-FLOW-001',
  selected_explicitly: true,
});
const validatePriorityDeliveryLaneData = (args) =>
  validatePriorityDeliveryLaneDataRaw({
    executionRouteSource: normalExecutionRouteSource,
    ...args,
  });

const canonicalData = JSON.parse(
  fs.readFileSync(
    new URL('../../docs/plan-canonico/modular/priority-delivery-lanes.json', import.meta.url),
    'utf8',
  ),
);
const canonicalLane = canonicalData.lanes[0];
const taskHeading =
  /^###\s+(?:\[[ x~]\]|✅|🟡|❌)\s+(?<id>[A-Z][A-Z0-9]*(?:-[A-Z0-9]+)+-\d{3})\b/gmu;
function readCanonicalTaskIds(directory) {
  const ids = new Set();
  const pending = [directory];
  while (pending.length > 0) {
    const current = pending.pop();
    for (const entry of fs.readdirSync(current, { withFileTypes: true })) {
      const fullPath = path.join(current, entry.name);
      if (entry.isDirectory()) pending.push(fullPath);
      if (entry.isFile() && entry.name.endsWith('.md')) {
        const source = fs.readFileSync(fullPath, 'utf8');
        for (const match of source.matchAll(taskHeading)) ids.add(match.groups.id);
      }
    }
  }
  return ids;
}
const expandRanges = (ranges = []) =>
  ranges.flatMap(({ prefix, from, to }) =>
    Array.from(
      { length: to - from + 1 },
      (_, index) => `${prefix}-${String(from + index).padStart(3, '0')}`,
    ));
const artifactRefs = (artifact) => [
  ...(artifact.task_refs ?? []),
  ...expandRanges(artifact.task_ranges),
];
const allArtifactCollections = [
  canonicalLane.required_task_artifacts,
  canonicalLane.conditional_artifacts,
  canonicalLane.conditional_implementation_artifacts,
  canonicalLane.execution_prerequisite_artifacts,
  canonicalLane.implementation_artifacts,
  canonicalLane.post_package_artifacts,
  canonicalLane.post_implementation_artifacts,
  canonicalLane.deferred_but_preserved,
];
const taskIds = new Set([
  ...readCanonicalTaskIds(fileURLToPath(new URL(
    '../../docs/plan-canonico/modular/bloques/',
    import.meta.url,
  ))),
  ...allArtifactCollections.flatMap((collection) =>
    collection.flatMap(artifactRefs)),
  ...canonicalLane.package_definition_tasks,
  canonicalLane.package_gate,
  ...canonicalLane.execution_cycle,
  canonicalLane.completion_task,
]);
const documents = {
  order:
    '<!-- PRIORITY-DELIVERY-LANES:START --> NEXO-REMISSIONS-001 canonical_sequence_unchanged = true ¿LA PRIORIDAD DE IMPLEMENTACIÓN ACTIVA ES REMISIONES NEXO? execution-route.json Registro histórico inactivo de NEXO-REMISSIONS-001 desde la etapa 1 hasta la 44 NEXO_INVENTORY_CLASSIFICATION CONDITIONAL_IMPLEMENTATION_SCOPE Los habilitadores PRE_E5_FOUNDATION aplicables pueden materializarse antes de E5 con autorización física explícita y evidencia propia. Ninguna migración o cambio físico POST_E5_PACKAGE perteneciente al paquete comienza antes CI_FOUNDATION R2_NEXO_DATABASE_PACKAGE E5_READINESS_PLAN U_AUTHORIZATION_CERTIFICATION SHELL-CI-024::NEXO-REMISSIONS-001',
  protocol:
    '<!-- PRIORITY-PACKAGE-PROTOCOL:START --> global_task_partial_approval_forbidden E5-GATE-008::<package_id> NORMAL_CANONICAL_FLOW execution-route.json ordered_execution_stages deberá completar todo BLOQUE H',
  principles:
    'Aplicación incremental sin aprobación parcial NEXO-REMISSIONS-001',
  gate: 'Instancia de puerta por paquete E5-GATE-008::<package_id>',
  delivery:
    'SHELL-CI-020::<package_id> SHELL-CI-024::<package_id> no modifica el estado de la tarea canónica',
  nexo:
    'Carril histórico suspendido NEXO-REMISSIONS-001 no es una tarea nueva',
};

function validData() {
  return structuredClone(canonicalData);
}

function group(data, collection, groupId) {
  return data.lanes[0][collection].find(
    ({ artifact_group_id: candidate }) => candidate === groupId,
  );
}

test('acepta un carril que separa diseño, puerta e implementación física', () => {
  const data = validData();
  data.lanes[0].status = 'DESIGNATED_NOT_READY';
  data.lanes[0].active = true;
  const activeDocuments = {
    ...documents,
    order: documents.order.replace(
      'Registro histórico inactivo de NEXO-REMISSIONS-001',
      'Orden ejecutable de NEXO-REMISSIONS-001',
    ),
    nexo: documents.nexo.replace(
      'Carril histórico suspendido',
      'Primer paquete vertical designado',
    ),
  };
  const stats = validatePriorityDeliveryLaneData({
    data,
    taskIds,
    documents: activeDocuments,
  });
  assert.equal(stats.lanes, 2);
  assert.equal(stats.designated, 2);
});

test('acepta conservar el carril como registro histórico mientras gobierna el flujo normal', () => {
  const data = validData();
  data.lanes[0].status = 'SUSPENDED';
  data.lanes[0].active = false;
  data.lanes[0].historical_evidence_only = true;
  const historicalDocuments = {
    ...documents,
    order: documents.order.replace(
      'Orden ejecutable de NEXO-REMISSIONS-001',
      'Registro histórico inactivo de NEXO-REMISSIONS-001',
    ),
    nexo: documents.nexo.replace(
      'Primer paquete vertical designado',
      'Carril histórico suspendido',
    ),
  };
  const stats = validatePriorityDeliveryLaneData({
    data,
    taskIds,
    documents: historicalDocuments,
  });
  assert.equal(stats.designated, 1);
});

test('rechaza habilitar aprobación parcial de tareas globales', () => {
  const data = validData();
  data.global_task_partial_approval_forbidden = false;
  assert.throws(
    () => validatePriorityDeliveryLaneData({ data, taskIds, documents }),
    /global_task_partial_approval_forbidden/,
  );
});

test('rechaza cambiar el repositorio propietario de Supabase', () => {
  const data = validData();
  data.lanes[0].supabase_repository = 'vento-nexo';
  assert.throws(
    () => validatePriorityDeliveryLaneData({ data, taskIds, documents }),
    /Supabase deberá permanecer en vento-shell/,
  );
});

test('rechaza omitir auditoría o arquitectura de normalización en E3', () => {
  const data = validData();
  group(data, 'required_task_artifacts', 'SUPABASE_AUDIT')
    .task_ranges[1].to = 6;
  group(data, 'required_task_artifacts', 'SUPABASE_ARCHITECTURE')
    .task_ranges[1].to = 11;
  assert.throws(
    () => validatePriorityDeliveryLaneData({ data, taskIds, documents }),
    /SUPABASE_AUDIT omite tareas|SUPABASE_ARCHITECTURE omite tareas/,
  );
});

test('rechaza aprobar SUPA-TRANS-016 sin transición de normalización', () => {
  const data = validData();
  group(data, 'required_task_artifacts', 'SUPABASE_TRANSITION')
    .task_ranges.splice(1, 1);
  assert.throws(
    () => validatePriorityDeliveryLaneData({ data, taskIds, documents }),
    /SUPABASE_TRANSITION omite tareas/,
  );
});

test('rechaza omitir la clasificación base de inventario NEXO', () => {
  const data = validData();
  group(data, 'required_task_artifacts', 'NEXO_INVENTORY_CLASSIFICATION')
    .task_refs.length = 0;
  assert.throws(
    () => validatePriorityDeliveryLaneData({ data, taskIds, documents }),
    /NEXO_INVENTORY_CLASSIFICATION omite tareas/,
  );
});

test('rechaza omitir una tarea de implementación obligatoria', () => {
  const data = validData();
  group(data, 'implementation_artifacts', 'R2_NEXO_DATABASE_PACKAGE')
    .task_refs.pop();
  assert.throws(
    () => validatePriorityDeliveryLaneData({ data, taskIds, documents }),
    /R2_NEXO_DATABASE_PACKAGE omite tareas/,
  );
});

test('incluye automáticamente una tarea nueva de una familia declarada', () => {
  const expandedTaskIds = new Set(taskIds);
  expandedTaskIds.add('SHELL-PKG-009');

  assert.doesNotThrow(() => validatePriorityDeliveryLaneData({
    data: validData(),
    taskIds: expandedTaskIds,
    documents,
  }));
});

test('rechaza volver a congelar manualmente el rango de una familia adaptativa', () => {
  const data = validData();
  const distribution = group(
    data,
    'required_task_artifacts',
    'H_SHARED_DISTRIBUTION',
  );
  delete distribution.task_family_refs;
  distribution.task_ranges = [{ prefix: 'SHELL-PKG', from: 1, to: 8 }];
  const expandedTaskIds = new Set(taskIds);
  expandedTaskIds.add('SHELL-PKG-009');

  assert.throws(
    () => validatePriorityDeliveryLaneData({
      data,
      taskIds: expandedTaskIds,
      documents,
    }),
    /H_SHARED_DISTRIBUTION omite tareas/,
  );
});

test('rechaza mezclar normalización física con diseño condicional', () => {
  const data = validData();
  const physical = data.lanes[0].conditional_implementation_artifacts.shift();
  data.lanes[0].conditional_artifacts.push(physical);
  assert.throws(
    () => validatePriorityDeliveryLaneData({ data, taskIds, documents }),
    /grupos condicionales de diseño|grupos condicionales de implementación|artifact_group_id/,
  );
});

test('rechaza duplicar autorización de producción entre grupos', () => {
  const data = validData();
  group(data, 'implementation_artifacts', 'NEXO_AUTHORIZATION')
    .task_refs = ['NEXO-AUTH-007'];
  assert.throws(
    () => validatePriorityDeliveryLaneData({ data, taskIds, documents }),
    /NEXO-AUTH-007 aparece en más de un grupo|NEXO_AUTHORIZATION omite tareas/,
  );
});

test('rechaza iniciar implementación antes de CI o alterar su orden interno', () => {
  const data = validData();
  data.lanes[0].implementation_execution_order = [
    'R2_NEXO_DATABASE_PACKAGE',
    ...data.lanes[0].implementation_execution_order.slice(1),
  ];
  data.lanes[0].ordered_execution_stages[23].task_source =
    'implementation_artifacts.R2_NEXO_DATABASE_PACKAGE';
  assert.throws(
    () => validatePriorityDeliveryLaneData({ data, taskIds, documents }),
    /implementation_execution_order|orden ejecutable|fuera de orden/,
  );
});

test('rechaza omitir planes E5 o certificación posterior', () => {
  const data = validData();
  group(data, 'post_package_artifacts', 'E5_READINESS_PLAN')
    .task_ranges[0].to = 14;
  group(data, 'post_implementation_artifacts', 'U_AUTHORIZATION_CERTIFICATION')
    .task_ranges[0].to = 29;
  assert.throws(
    () => validatePriorityDeliveryLaneData({ data, taskIds, documents }),
    /E5_READINESS_PLAN omite tareas|U_AUTHORIZATION_CERTIFICATION omite tareas/,
  );
});

test('rechaza una ruta ambigua o un carril usado como secuencia documental', () => {
  const data = validData();
  data.implementation_route_policy.default_route = 'PRIORITY_BY_DEFAULT';
  assert.throws(
    () => validatePriorityDeliveryLaneData({
      data,
      taskIds,
      documents,
      activeSequenceSource: 'NEXO-REMISSIONS-001',
    }),
    /NORMAL_CANONICAL_FLOW|no puede reemplazar active-sequence/,
  );
});

test('exige que active-sequence proyecte el carril seleccionado explícitamente', () => {
  const prioritySelector = JSON.stringify({
    selected_route_id: 'NEXO-REMISSIONS-001',
    normal_route_id: 'NORMAL-CANONICAL-FLOW-001',
    selected_explicitly: true,
  });
  assert.throws(
    () => validatePriorityDeliveryLaneDataRaw({
      data: validData(),
      taskIds,
      documents,
      executionRouteSource: prioritySelector,
      activeSequenceSource: '{"route_id":"NORMAL-CANONICAL-FLOW-001"}',
    }),
    /no proyecta el carril seleccionado/,
  );
  assert.doesNotThrow(() => validatePriorityDeliveryLaneDataRaw({
    data: validData(),
    taskIds,
    documents,
    executionRouteSource: prioritySelector,
    activeSequenceSource: '{"route_id": "NEXO-REMISSIONS-001"}',
  }));
});

test('R0 y R1 son prerrequisitos físicos anteriores a E5', () => {
  const lane = canonicalLane;

  const prerequisiteIds = new Set(
    lane.execution_prerequisite_artifacts.map(
      ({ artifact_group_id: id }) => id,
    ),
  );

  const implementationIds = new Set(
    lane.implementation_artifacts.map(
      ({ artifact_group_id: id }) => id,
    ),
  );

  for (const groupId of [
    'R0_DATABASE_SAFETY',
    'R1_AUTH_PHYSICAL_CORE',
  ]) {
    assert.equal(
      prerequisiteIds.has(groupId),
      true,
      `${groupId} debe ser execution prerequisite`,
    );

    assert.equal(
      implementationIds.has(groupId),
      false,
      `${groupId} no debe permanecer en implementation_artifacts`,
    );

    assert.equal(
      lane.implementation_execution_order.includes(groupId),
      false,
      `${groupId} no debe permanecer en implementation_execution_order`,
    );
  }

  const ciIndex = lane.execution_prerequisite_artifacts.findIndex(
    ({ artifact_group_id: id }) => id === 'CI_FOUNDATION',
  );

  const r0Index = lane.execution_prerequisite_artifacts.findIndex(
    ({ artifact_group_id: id }) => id === 'R0_DATABASE_SAFETY',
  );

  const r1Index = lane.execution_prerequisite_artifacts.findIndex(
    ({ artifact_group_id: id }) => id === 'R1_AUTH_PHYSICAL_CORE',
  );

  assert.ok(ciIndex >= 0);
  assert.ok(ciIndex < r0Index);
  assert.ok(r0Index < r1Index);
});
