import assert from 'node:assert/strict';
import test from 'node:test';

import {
  activeDocumentaryTaskId,
  developmentDependencyOrderErrors,
  executionDependencyGateErrors,
  resolveTaskWorkTopology,
  taskDependencies,
} from './task-work-topology.mjs';

test('resuelve la tarea documental actual desde una priority lane', () => {
  assert.equal(
    activeDocumentaryTaskId({
      route_id: 'PASS-LOYALTY-001',
      task_ids: ['PASS-UX-001', 'PASS-UX-002'],
    }),
    'PASS-UX-001',
  );
});

test('priority lane avanza al primer task_id no aprobado del stage', () => {
  const inventory = new Map([
    ['PASS-UX-001', { marker: '✅' }],
    ['PASS-UX-002', { marker: '[ ]' }],
    ['PASS-UX-003', { marker: '[ ]' }],
  ]);
  assert.equal(
    activeDocumentaryTaskId({
      route_id: 'PASS-LOYALTY-001',
      task_ids: ['PASS-UX-001', 'PASS-UX-002', 'PASS-UX-003'],
    }, inventory),
    'PASS-UX-002',
  );
});

test('priority lane devuelve null cuando el stage documental ya quedó aprobado', () => {
  const inventory = new Map([
    ['PASS-UX-001', { marker: '✅' }],
    ['PASS-UX-002', { marker: '✅' }],
  ]);
  assert.equal(
    activeDocumentaryTaskId({
      route_id: 'PASS-LOYALTY-001',
      task_ids: ['PASS-UX-001', 'PASS-UX-002'],
    }, inventory),
    null,
  );
});

test('conserva la resolución documental por segments en el flujo normal', () => {
  assert.equal(
    activeDocumentaryTaskId({
      route_id: 'NORMAL-CANONICAL-FLOW-001',
      segments: [{ prefix: 'ORIGO-AUTH', from: 11, to: 15 }],
    }),
    'ORIGO-AUTH-011',
  );
});

test('clasifica todas las tareas y separa definición, unidad, paquete y cierre global', () => {
  const result = resolveTaskWorkTopology();
  assert.equal(result.topology.size, result.ordered.length);
  assert.equal(Object.values(result.counts).reduce((sum, value) => sum + value, 0), result.ordered.length);
  assert.equal(result.topology.get('SHELL-MIG-007').mode, 'TEMPLATE_PER_PACKAGE');
  assert.equal(result.topology.get('SHELL-CI-001').mode, 'GLOBAL_ENABLE_ONCE');
  assert.equal(result.topology.get('SHELL-CI-020').mode, 'TEMPLATE_PER_PACKAGE');
  assert.equal(result.topology.get('AUTH-QA-001').mode, 'PER_PACKAGE_AND_GLOBAL_FINAL');
  assert.equal(result.topology.get('AUTH-DB-030').mode, 'GLOBAL_FINAL');
});

test('separa dependencias para desarrollar de bloqueos futuros de ejecución', () => {
  const knownIds = new Set([
    'SHELL-MIG-005',
    'SHELL-MIG-006',
    'SHELL-CI-001',
    ...Array.from({ length: 7 }, (_, index) => `SHELL-CI-${String(index + 7).padStart(3, '0')}`),
    'E5-GATE-008',
    'SHELL-CI-020',
  ]);
  const task = {
    id: 'SHELL-MIG-007',
    block: `### [ ] SHELL-MIG-007 — Definir contrato

**Dependencias para desarrollar:** \`SHELL-MIG-005\`; \`SHELL-MIG-006\`.
**Dependencias para ejecutar cada instancia:** \`SHELL-CI-001\`; \`SHELL-CI-007\` a \`SHELL-CI-013\`; \`E5-GATE-008::<package_id>\`; \`SHELL-CI-020::<package_id>\`.`,
  };
  const result = taskDependencies(task, knownIds);
  assert.deepEqual(result.development, ['SHELL-MIG-005', 'SHELL-MIG-006']);
  assert.deepEqual(result.execution, [
    'SHELL-CI-001',
    'SHELL-CI-007',
    'SHELL-CI-013',
    'E5-GATE-008',
    'SHELL-CI-020',
    'SHELL-CI-008',
    'SHELL-CI-009',
    'SHELL-CI-010',
    'SHELL-CI-011',
    'SHELL-CI-012',
  ]);
});

test('acepta dependencias desarrolladas como secciones con listas', () => {
  const knownIds = new Set([
    'SHELL-MIG-005',
    'SHELL-MIG-006',
    'SHELL-CI-001',
    'E5-GATE-008',
    'SHELL-CI-020',
  ]);
  const result = taskDependencies({
    id: 'SHELL-MIG-007',
    block: `### ✅ SHELL-MIG-007 — Definir contrato

Dependencias para desarrollar el marcador global:

- \`SHELL-MIG-005\`;
- \`SHELL-MIG-006\`.

Dependencias para ejecutar una instancia:

- \`SHELL-CI-001\`;
- \`E5-GATE-008::<package_id>\`;
- \`SHELL-CI-020::<package_id>\`.`,
  }, knownIds);
  assert.deepEqual(result.development, ['SHELL-MIG-005', 'SHELL-MIG-006']);
  assert.deepEqual(result.execution, ['SHELL-CI-001', 'E5-GATE-008', 'SHELL-CI-020']);
});

test('rechaza una dependencia de desarrollo hacia una tarea futura', () => {
  const ordered = [{ id: 'TEST-A-001' }, { id: 'TEST-A-002' }];
  const dependencies = new Map([
    ['TEST-A-001', { development: ['TEST-A-002'] }],
    ['TEST-A-002', { development: [] }],
  ]);
  assert.deepEqual(
    developmentDependencyOrderErrors(ordered, dependencies),
    ['TEST-A-001 tiene una dependencia de desarrollo futura: TEST-A-002.'],
  );
});

test('rechaza ciclos físicos PRE_E5 que dependan de trabajo POST_E5', () => {
  const topology = new Map([
    ['AUTH-DB-033', { executionGate: 'PRE_E5_FOUNDATION' }],
    ['SHELL-AUTH-001', { executionGate: 'POST_E5_PACKAGE' }],
  ]);
  const dependencies = new Map([
    ['AUTH-DB-033', { execution: ['SHELL-AUTH-001'] }],
    ['SHELL-AUTH-001', { execution: [] }],
  ]);
  assert.deepEqual(executionDependencyGateErrors(topology, dependencies), [
    'AUTH-DB-033 es PRE_E5_FOUNDATION y no puede depender físicamente de SHELL-AUTH-001, que es POST_E5_PACKAGE.',
  ]);
});

test('AUTH-DB-033 depende solo de fundación PRE_E5 y contratos documentales', () => {
  const result = resolveTaskWorkTopology();
  const execution = result.dependencies.get('AUTH-DB-033').execution;
  assert.ok(execution.includes('AUTH-DB-019'));
  assert.ok(execution.includes('SHELL-CON-001'));
  assert.ok(execution.includes('SHELL-CON-008'));
  assert.ok(!execution.includes('SHELL-AUTH-001'));
  assert.ok(!execution.includes('SHELL-CTX-001'));
});

test('ubica el inventario PULSO antes de la definición física que lo consume', () => {
  const result = resolveTaskWorkTopology();
  const ids = result.ordered.map(({ id }) => id);
  assert.ok(ids.indexOf('PULSO-UX-001') < ids.indexOf('OPS-POS-001'));
  assert.ok(ids.indexOf('OPS-POS-001') < ids.indexOf('PULSO-UX-002'));
});

test('reconciliacion B001-200 separa cardinalidad y gate temporal', () => {
  const result = resolveTaskWorkTopology();
  const block = result.implementationAuditTasks.slice(0, 200);

  assert.equal(result.topology.size, result.ordered.length);
  assert.equal(result.implementationAuditTasks.length, 975);
  assert.equal(block.length, 200);
  assert.equal(block[0].id, 'DELIV-PKG-001');
  assert.equal(block.at(-1).id, 'SHELL-CI-023');

  const modeCounts = {};
  const gateCounts = {};

  for (const task of block) {
    const lifecycle = result.topology.get(task.id);

    modeCounts[lifecycle.mode] =
      (modeCounts[lifecycle.mode] ?? 0) + 1;

    gateCounts[lifecycle.executionGate] =
      (gateCounts[lifecycle.executionGate] ?? 0) + 1;

    assert.notEqual(
      lifecycle.executionGate,
      'UNREVIEWED',
      task.id,
    );
  }

  assert.deepEqual(modeCounts, {
    TEMPLATE_PER_PACKAGE: 79,
    DEFINE_ONCE: 32,
    GLOBAL_ENABLE_ONCE: 75,
    PER_IMPLEMENTATION_UNIT: 14,
  });

  assert.deepEqual(gateCounts, {
    PRE_E5_PLANNING: 68,
    NO_PHYSICAL_INSTANCE: 32,
    PRE_E5_FOUNDATION: 75,
    POST_E5_PACKAGE: 25,
  });

  const expected = new Map([
    ['DELIV-PKG-001', ['TEMPLATE_PER_PACKAGE', 'PRE_E5_PLANNING']],
    ['E5-GATE-008', ['TEMPLATE_PER_PACKAGE', 'PRE_E5_PLANNING']],
    ['SHELL-AUD-001', ['DEFINE_ONCE', 'NO_PHYSICAL_INSTANCE']],
    ['SHELL-PKG-001', ['DEFINE_ONCE', 'NO_PHYSICAL_INSTANCE']],
    ['SHELL-CON-001', ['GLOBAL_ENABLE_ONCE', 'PRE_E5_FOUNDATION']],
    ['SHELL-CON-024', ['GLOBAL_ENABLE_ONCE', 'PRE_E5_FOUNDATION']],
    ['SHELL-NORM-001', ['GLOBAL_ENABLE_ONCE', 'PRE_E5_FOUNDATION']],
    ['SHELL-DB-001', ['GLOBAL_ENABLE_ONCE', 'PRE_E5_FOUNDATION']],
    ['SHELL-DB-002', ['DEFINE_ONCE', 'NO_PHYSICAL_INSTANCE']],
    ['SHELL-DB-003', ['TEMPLATE_PER_PACKAGE', 'POST_E5_PACKAGE']],
    ['SHELL-UI-001', ['GLOBAL_ENABLE_ONCE', 'PRE_E5_FOUNDATION']],
    ['SHELL-MIG-003', ['TEMPLATE_PER_PACKAGE', 'POST_E5_PACKAGE']],
    ['SHELL-NATIVE-001', ['PER_IMPLEMENTATION_UNIT', 'POST_E5_PACKAGE']],
    ['SHELL-AUTH-001', ['PER_IMPLEMENTATION_UNIT', 'POST_E5_PACKAGE']],
    ['SHELL-CTX-001', ['PER_IMPLEMENTATION_UNIT', 'POST_E5_PACKAGE']],
    ['SHELL-CI-001', ['GLOBAL_ENABLE_ONCE', 'PRE_E5_FOUNDATION']],
    ['SHELL-CI-020', ['TEMPLATE_PER_PACKAGE', 'POST_E5_PACKAGE']],
    ['SHELL-CI-023', ['TEMPLATE_PER_PACKAGE', 'POST_E5_PACKAGE']],
  ]);

  for (const [taskId, values] of expected) {
    const lifecycle = result.topology.get(taskId);

    assert.equal(
      lifecycle.mode,
      values[0],
      taskId + ' mode',
    );

    assert.equal(
      lifecycle.executionGate,
      values[1],
      taskId + ' gate',
    );
  }

  assert.equal(
    result.policy.reconciliation_progress.source_audit_sha256,
    '27d00bfb84e1bbe323d6ae0addc9895fccf3ad704ba5fcf37f3e28e6e24b219f',
  );

  assert.ok(
    result.policy.reconciliation_progress.reviewed_count >= 200,
  );
});
test('reconciliacion B201-400 conserva cardinalidad y clasifica R0 R1 R2', () => {
  const result = resolveTaskWorkTopology();
  const block = result.implementationAuditTasks.slice(200, 400);
  assert.equal(block.length, 200);
  assert.equal(block[0].id, 'SHELL-CI-024');
  assert.equal(block.at(-1).id, 'AUTH-DEV-013');
  assert.equal(result.implementationAuditTasks[400].id, 'AUTH-DEV-014');
  const modeCounts = {};
  const gateCounts = {};
  for (const task of block) {
    const lifecycle = result.topology.get(task.id);
    modeCounts[lifecycle.mode] = (modeCounts[lifecycle.mode] ?? 0) + 1;
    gateCounts[lifecycle.executionGate] = (gateCounts[lifecycle.executionGate] ?? 0) + 1;
    assert.notEqual(lifecycle.executionGate, 'UNREVIEWED', task.id);
  }
  assert.deepEqual(modeCounts, {
    TEMPLATE_PER_PACKAGE: 32,
    PER_IMPLEMENTATION_UNIT: 101,
    GLOBAL_ENABLE_ONCE: 21,
    DEFINE_ONCE: 46
  });
  assert.deepEqual(gateCounts, {
    NO_PHYSICAL_INSTANCE: 46,
    PRE_E5_FOUNDATION: 21,
    POST_E5_PACKAGE: 133,
  });
  const expected = new Map([
    ['ANIMA-AUTH-001', ['PER_IMPLEMENTATION_UNIT', 'POST_E5_PACKAGE']],
    ['ANIMA-UX-001', ['DEFINE_ONCE', 'NO_PHYSICAL_INSTANCE']],
    ['ANIMA-UX-017', ['DEFINE_ONCE', 'NO_PHYSICAL_INSTANCE']],
    ['VISO-AUTH-001', ['PER_IMPLEMENTATION_UNIT', 'POST_E5_PACKAGE']],
    ['VISO-CORE-001', ['DEFINE_ONCE', 'NO_PHYSICAL_INSTANCE']],
    ['VISO-CORE-002', ['DEFINE_ONCE', 'NO_PHYSICAL_INSTANCE']],
    ['VISO-CORE-003', ['PER_IMPLEMENTATION_UNIT', 'POST_E5_PACKAGE']],
    ['VISO-CORE-005', ['PER_IMPLEMENTATION_UNIT', 'POST_E5_PACKAGE']],
    ['VISO-CORE-006', ['DEFINE_ONCE', 'NO_PHYSICAL_INSTANCE']],
    ['AUTH-DEV-001', ['DEFINE_ONCE', 'NO_PHYSICAL_INSTANCE']],
    ['AUTH-DEV-014', ['PER_IMPLEMENTATION_UNIT', 'POST_E5_PACKAGE']],
    ['AUTH-DB-036', ['GLOBAL_ENABLE_ONCE', 'PRE_E5_FOUNDATION']],
  ]);
  for (const [taskId, values] of expected) {
    const lifecycle = result.topology.get(taskId);
    assert.equal(lifecycle.mode, values[0], taskId + ' mode');
    assert.equal(lifecycle.executionGate, values[1], taskId + ' gate');
  }
  assert.ok(result.policy.reconciliation_progress.reviewed_count >= 400);
  assert.equal(result.policy.reconciliation_progress.source_audit_sha256, '27d00bfb84e1bbe323d6ae0addc9895fccf3ad704ba5fcf37f3e28e6e24b219f');
});

test('reconciliacion B401-600 separa contratos transversales y materializacion post E5', () => {
  const result = resolveTaskWorkTopology();
  const block = result.implementationAuditTasks.slice(400, 600);
  assert.equal(block.length, 200);
  assert.equal(block[0].id, 'AUTH-DEV-014');
  assert.equal(block.at(-1).id, 'NEXO-AUTH-030');
  assert.equal(result.implementationAuditTasks[600].id, 'NEXO-AUTH-031');
  const modeCounts = {};
  const gateCounts = {};
  for (const task of block) {
    const lifecycle = result.topology.get(task.id);
    modeCounts[lifecycle.mode] = (modeCounts[lifecycle.mode] ?? 0) + 1;
    gateCounts[lifecycle.executionGate] = (gateCounts[lifecycle.executionGate] ?? 0) + 1;
    assert.notEqual(lifecycle.executionGate, 'UNREVIEWED', task.id);
  }
  assert.deepEqual(modeCounts, { PER_IMPLEMENTATION_UNIT: 40, DEFINE_ONCE: 160 });
  assert.deepEqual(gateCounts, { POST_E5_PACKAGE: 40, NO_PHYSICAL_INSTANCE: 160 });
  const expected = new Map([
    ['AUTH-SIM-001', ['DEFINE_ONCE', 'NO_PHYSICAL_INSTANCE']],
    ['AUTH-SIM-007', ['PER_IMPLEMENTATION_UNIT', 'POST_E5_PACKAGE']],
    ['NEXO-DOM-001', ['DEFINE_ONCE', 'NO_PHYSICAL_INSTANCE']],
    ['NEXO-DOM-038', ['DEFINE_ONCE', 'NO_PHYSICAL_INSTANCE']],
    ['NEXO-AUTH-020', ['PER_IMPLEMENTATION_UNIT', 'POST_E5_PACKAGE']],
    ['NEXO-AUTH-021', ['DEFINE_ONCE', 'NO_PHYSICAL_INSTANCE']],
    ['NEXO-AUTH-022', ['PER_IMPLEMENTATION_UNIT', 'POST_E5_PACKAGE']],
    ['NEXO-AUTH-031', ['PER_IMPLEMENTATION_UNIT', 'POST_E5_PACKAGE']],
  ]);
  for (const [taskId, values] of expected) {
    const lifecycle = result.topology.get(taskId);
    assert.equal(lifecycle.mode, values[0], taskId + ' mode');
    assert.equal(lifecycle.executionGate, values[1], taskId + ' gate');
  }
  assert.ok(result.policy.reconciliation_progress.reviewed_count >= 600);
  assert.equal(result.policy.reconciliation_progress.source_audit_sha256, '27d00bfb84e1bbe323d6ae0addc9895fccf3ad704ba5fcf37f3e28e6e24b219f');
});

test('reconciliacion B601-800 separa diseño vertical y materializacion de autorización', () => {
  const result = resolveTaskWorkTopology();
  const block = result.implementationAuditTasks.slice(600, 800);
  assert.equal(block.length, 200);
  assert.equal(block[0].id, 'NEXO-AUTH-031');
  assert.equal(block.at(-1).id, 'NUMERA-AUTH-007');
  assert.equal(result.implementationAuditTasks[800].id, 'NUMERA-AUTH-008');
  const modeCounts = {};
  const gateCounts = {};
  for (const task of block) {
    const lifecycle = result.topology.get(task.id);
    modeCounts[lifecycle.mode] = (modeCounts[lifecycle.mode] ?? 0) + 1;
    gateCounts[lifecycle.executionGate] = (gateCounts[lifecycle.executionGate] ?? 0) + 1;
    assert.notEqual(lifecycle.executionGate, 'UNREVIEWED', task.id);
  }
  assert.deepEqual(modeCounts, { PER_IMPLEMENTATION_UNIT: 30, DEFINE_ONCE: 170 });
  assert.deepEqual(gateCounts, { POST_E5_PACKAGE: 30, NO_PHYSICAL_INSTANCE: 170 });
  const expected = new Map([
    ['NEXO-AUTH-032', ['PER_IMPLEMENTATION_UNIT', 'POST_E5_PACKAGE']],
    ['NEXO-UX-001', ['DEFINE_ONCE', 'NO_PHYSICAL_INSTANCE']],
    ['NEXO-UX-048', ['DEFINE_ONCE', 'NO_PHYSICAL_INSTANCE']],
    ['AUTH-UI-052', ['DEFINE_ONCE', 'NO_PHYSICAL_INSTANCE']],
    ['AUTH-UI-060', ['DEFINE_ONCE', 'NO_PHYSICAL_INSTANCE']],
    ['OPS-REC-001', ['DEFINE_ONCE', 'NO_PHYSICAL_INSTANCE']],
    ['FOGO-AUTH-001', ['DEFINE_ONCE', 'NO_PHYSICAL_INSTANCE']],
    ['FOGO-AUTH-003', ['PER_IMPLEMENTATION_UNIT', 'POST_E5_PACKAGE']],
    ['FOGO-AUTH-008', ['DEFINE_ONCE', 'NO_PHYSICAL_INSTANCE']],
    ['FOGO-AUTH-009', ['PER_IMPLEMENTATION_UNIT', 'POST_E5_PACKAGE']],
    ['FOGO-UX-015', ['DEFINE_ONCE', 'NO_PHYSICAL_INSTANCE']],
    ['ORIGO-AUTH-001', ['DEFINE_ONCE', 'NO_PHYSICAL_INSTANCE']],
    ['ORIGO-AUTH-008', ['DEFINE_ONCE', 'NO_PHYSICAL_INSTANCE']],
    ['ORIGO-AUTH-009', ['PER_IMPLEMENTATION_UNIT', 'POST_E5_PACKAGE']],
    ['ORIGO-UX-016', ['DEFINE_ONCE', 'NO_PHYSICAL_INSTANCE']],
    ['OPS-POS-001', ['DEFINE_ONCE', 'NO_PHYSICAL_INSTANCE']],
    ['PULSO-AUTH-008', ['DEFINE_ONCE', 'NO_PHYSICAL_INSTANCE']],
    ['PULSO-AUTH-009', ['PER_IMPLEMENTATION_UNIT', 'POST_E5_PACKAGE']],
    ['PULSO-UX-021', ['DEFINE_ONCE', 'NO_PHYSICAL_INSTANCE']],
    ['NUMERA-AUD-012', ['DEFINE_ONCE', 'NO_PHYSICAL_INSTANCE']],
    ['OPS-CST-001', ['DEFINE_ONCE', 'NO_PHYSICAL_INSTANCE']],
    ['NUMERA-DOM-018', ['DEFINE_ONCE', 'NO_PHYSICAL_INSTANCE']],
    ['NUMERA-AUTH-007', ['DEFINE_ONCE', 'NO_PHYSICAL_INSTANCE']],
    ['NUMERA-AUTH-008', ['PER_IMPLEMENTATION_UNIT', 'POST_E5_PACKAGE']],
  ]);
  for (const [taskId, values] of expected) {
    const lifecycle = result.topology.get(taskId);
    assert.equal(lifecycle.mode, values[0], taskId + ' mode');
    assert.equal(lifecycle.executionGate, values[1], taskId + ' gate');
  }
  assert.ok(result.policy.reconciliation_progress.reviewed_count >= 800);
  assert.equal(result.policy.reconciliation_progress.source_audit_sha256, '27d00bfb84e1bbe323d6ae0addc9895fccf3ad704ba5fcf37f3e28e6e24b219f');
});

test('reconciliacion B801-975 completa la clasificacion de las 975 tareas', () => {
  const result = resolveTaskWorkTopology();
  const block = result.implementationAuditTasks.slice(800, 975);

  assert.equal(result.implementationAuditTasks.length, 975);
  assert.equal(block.length, 175);
  assert.equal(block[0].id, 'NUMERA-AUTH-008');
  assert.equal(result.implementationAuditTasks[975], undefined);

  const modeCounts = {};
  const gateCounts = {};

  for (const task of block) {
    const lifecycle = result.topology.get(task.id);

    modeCounts[lifecycle.mode] =
      (modeCounts[lifecycle.mode] ?? 0) + 1;

    gateCounts[lifecycle.executionGate] =
      (gateCounts[lifecycle.executionGate] ?? 0) + 1;

    assert.notEqual(
      lifecycle.executionGate,
      'UNREVIEWED',
      task.id,
    );
  }

  assert.deepEqual(modeCounts, {
    DEFINE_ONCE: 80,
    PER_IMPLEMENTATION_UNIT: 33,
    PER_PACKAGE_AND_GLOBAL_FINAL: 60,
    GLOBAL_FINAL: 2,
  });

  assert.deepEqual(gateCounts, {
    NO_PHYSICAL_INSTANCE: 80,
    POST_E5_PACKAGE: 95,
  });

  const expected = new Map([
    ['NUMERA-AUTH-009', ['PER_IMPLEMENTATION_UNIT', 'POST_E5_PACKAGE']],
    ['NUMERA-AUTH-013', ['PER_IMPLEMENTATION_UNIT', 'POST_E5_PACKAGE']],
    ['NUMERA-AUTH-014', ['DEFINE_ONCE', 'NO_PHYSICAL_INSTANCE']],
    ['NUMERA-AUTH-015', ['DEFINE_ONCE', 'NO_PHYSICAL_INSTANCE']],

    ['NUMERA-UX-001', ['DEFINE_ONCE', 'NO_PHYSICAL_INSTANCE']],
    ['NUMERA-UX-028', ['DEFINE_ONCE', 'NO_PHYSICAL_INSTANCE']],

    ['VISO-UX-001', ['PER_IMPLEMENTATION_UNIT', 'POST_E5_PACKAGE']],
    ['VISO-UX-020', ['PER_IMPLEMENTATION_UNIT', 'POST_E5_PACKAGE']],

    ['PASS-UX-001', ['DEFINE_ONCE', 'NO_PHYSICAL_INSTANCE']],
    ['PASS-UX-013', ['DEFINE_ONCE', 'NO_PHYSICAL_INSTANCE']],
    ['PASS-INT-001', ['DEFINE_ONCE', 'NO_PHYSICAL_INSTANCE']],
    ['PASS-INT-005', ['DEFINE_ONCE', 'NO_PHYSICAL_INSTANCE']],
    ['PASS-QA-001', ['PER_IMPLEMENTATION_UNIT', 'POST_E5_PACKAGE']],
    ['PASS-QA-002', ['PER_IMPLEMENTATION_UNIT', 'POST_E5_PACKAGE']],

    ['AURA-AUD-001', ['DEFINE_ONCE', 'NO_PHYSICAL_INSTANCE']],
    ['AURA-AUD-012', ['DEFINE_ONCE', 'NO_PHYSICAL_INSTANCE']],
    ['WEB-FRM-011', ['PER_IMPLEMENTATION_UNIT', 'POST_E5_PACKAGE']],
    ['AURA-DOM-001', ['DEFINE_ONCE', 'NO_PHYSICAL_INSTANCE']],
    ['AURA-DOM-010', ['DEFINE_ONCE', 'NO_PHYSICAL_INSTANCE']],
    ['AURA-AUTH-001', ['PER_IMPLEMENTATION_UNIT', 'POST_E5_PACKAGE']],
    ['AURA-AUTH-004', ['PER_IMPLEMENTATION_UNIT', 'POST_E5_PACKAGE']],
    ['AURA-UX-001', ['DEFINE_ONCE', 'NO_PHYSICAL_INSTANCE']],
    ['AURA-UX-008', ['DEFINE_ONCE', 'NO_PHYSICAL_INSTANCE']],
    ['AURA-INT-001', ['DEFINE_ONCE', 'NO_PHYSICAL_INSTANCE']],
    ['AURA-INT-002', ['DEFINE_ONCE', 'NO_PHYSICAL_INSTANCE']],

    ['AUTH-QA-001', ['PER_PACKAGE_AND_GLOBAL_FINAL', 'POST_E5_PACKAGE']],
    ['AUTH-QA-030', ['PER_PACKAGE_AND_GLOBAL_FINAL', 'POST_E5_PACKAGE']],
    ['UX-QA-001', ['PER_PACKAGE_AND_GLOBAL_FINAL', 'POST_E5_PACKAGE']],
    ['UX-QA-030', ['PER_PACKAGE_AND_GLOBAL_FINAL', 'POST_E5_PACKAGE']],

    ['AUTH-DB-030', ['GLOBAL_FINAL', 'POST_E5_PACKAGE']],
    ['AUTH-DB-031', ['GLOBAL_FINAL', 'POST_E5_PACKAGE']],
  ]);

  for (const [taskId, values] of expected) {
    const lifecycle = result.topology.get(taskId);

    assert.equal(
      lifecycle.mode,
      values[0],
      taskId + ' mode',
    );

    assert.equal(
      lifecycle.executionGate,
      values[1],
      taskId + ' gate',
    );
  }

  const progress =
    result.policy.reconciliation_progress;

  assert.equal(progress.reviewed_count, 975);
  assert.equal(progress.unreviewed_count, 0);
  assert.equal(progress.next_position, 976);
  assert.equal(progress.status, 'PARTIAL_REVIEW_IN_PROGRESS');
  assert.equal(progress.source_audit_sha256, '27d00bfb84e1bbe323d6ae0addc9895fccf3ad704ba5fcf37f3e28e6e24b219f');
});
