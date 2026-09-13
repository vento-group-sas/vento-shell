import assert from 'node:assert/strict';
import test from 'node:test';

import {
  describePendingTask,
  describeTaskScope,
  orderPendingTasksByRoute,
  operationalActionSummary,
  parseTaskScopeContracts,
  pendingTaskExecutionContext,
  physicalLaneSummary,
  physicalOperationalProjection,
  renderDualLaneOverview,
  renderOperationalActionCenter,
  validationProfileForTask,
} from './sync-pending-task-context.mjs';

test('describe tareas pendientes con una acción breve y legible', () => {
  assert.equal(
    describePendingTask('Migrar consumidores de autorización'),
    'Migra consumidores de autorización al destino canónico, comprueba paridad y conserva rollback.',
  );
  assert.equal(
    describePendingTask('Verificar accesibilidad y movimiento reducido'),
    'Verifica accesibilidad y movimiento reducido, registra brechas y deja evidencia del resultado.',
  );
  assert.equal(
    describePendingTask('Retirar copias legacy y certificar adopción'),
    'Retira copias legacy y certifica adopción solo después de verificar el reemplazo y el rollback.',
  );
  assert.equal(
    describePendingTask('Ejecutar y resolver el checklist aprobado'),
    'Ejecuta y resuelve el checklist aprobado de forma controlada y registra resultado, fallos y evidencia.',
  );
  assert.equal(
    describePendingTask('Los fallos parciales permiten recuperación'),
    'Convierte «Los fallos parciales permiten recuperación» en una condición verificable, con responsable, evidencia y criterio de cierre.',
  );
});

const task = (id, state = 'NO INICIADA') => ({
  id,
  title: `Título ${id}`,
  state,
  relativePath: 'task.md',
});

test('ordena las pendientes por etapa y selector, no por orden físico del manifiesto', () => {
  const tasks = [
    task('TEST-B-002'),
    task('TEST-A-002'),
    task('TEST-B-001', 'APROBADA'),
    task('TEST-A-001', 'APROBADA'),
  ];
  const route = {
    stages: [
      {
        sequence_id: 'PHASE-01-TEST-A',
        block_code: 'A',
        block_title: 'Primera',
        selectors: [{ prefix: 'TEST-A' }],
      },
      {
        sequence_id: 'PHASE-02-TEST-B',
        block_code: 'B',
        block_title: 'Segunda',
        selectors: [{ prefix: 'TEST-B' }],
      },
    ],
  };

  const result = orderPendingTasksByRoute(tasks, route);
  assert.deepEqual(result.map(({ id }) => id), ['TEST-A-002', 'TEST-B-002']);
  assert.deepEqual(result.map(({ canonicalOrder }) => canonicalOrder), [2, 4]);
  assert.deepEqual(result.map(({ stageOrder }) => stageOrder), [1, 2]);
  assert.deepEqual(result.map(({ routePredecessorId }) => routePredecessorId), ['TEST-A-001', 'TEST-B-001']);
});

test('expone dependencias, TREQ y cierre declarados sin inferir contenido canónico', () => {
  const context = pendingTaskExecutionContext({
    ...task('TEST-A-002'),
    title: 'Migrar consumidores legacy',
    routePredecessorId: 'TEST-A-001',
    block: `### [ ] TEST-A-002 — Migrar consumidores legacy

**Dependencias:** \`TEST-A-001\`; \`TEST-SEC-004\`.

#### 1. Requisitos de prueba derivados

- \`TREQ-UX-2001\`
- \`TREQ-SEC-2002\`

**Puerta de cierre:** paridad aprobada y rollback reproducible.`,
  });

  assert.equal(context.dependencyKind, 'DECLARADAS');
  assert.equal(context.dependencies, '`TEST-A-001`; `TEST-SEC-004`.');
  assert.match(context.tests, /`TREQ-UX-2001`, `TREQ-SEC-2002`/u);
  assert.match(context.tests, /paridad contractual y operativa/u);
  assert.equal(context.closure, 'paridad aprobada y rollback reproducible.');
});

test('distingue precedencia y perfil previsto cuando la tarea sigue vacía', () => {
  const context = pendingTaskExecutionContext({
    ...task('TEST-UI-002'),
    title: 'Implementar componente accesible',
    routePredecessorId: 'TEST-UI-001',
    block: '### [ ] TEST-UI-002 — Implementar componente accesible',
  });

  assert.equal(context.dependencyKind, 'PRECEDENCIA_DE_RUTA');
  assert.equal(context.dependencies, 'Precedencia de ruta: `TEST-UI-001`');
  assert.match(context.tests, /^Por definir al desarrollar/u);
  assert.match(context.tests, /accesibilidad/u);
  assert.match(context.closure, /Se concreta al desarrollar/u);
});

test('selecciona perfiles de validación proporcionales por naturaleza', () => {
  assert.match(validationProfileForTask({ ...task('TEST-AUTH-001'), title: 'Proteger permisos' }), /denegaciones/u);
  assert.match(validationProfileForTask({ ...task('TEST-INT-001'), title: 'Integrar webhook idempotente' }), /reintentos/u);
});

test('rechaza cualquier tarea canónica que quede fuera de la guía', () => {
  assert.throws(
    () => orderPendingTasksByRoute(
      [task('TEST-A-001'), task('TEST-B-001')],
      {
        stages: [{
          sequence_id: 'PHASE-01-TEST-A',
          block_code: 'A',
          block_title: 'Primera',
          selectors: [{ prefix: 'TEST-A' }],
        }],
      },
    ),
    /no ubica tareas canónicas: TEST-B-001/u,
  );
});

test('conserva las tareas diferidas sin ponerlas delante de la continuidad activa', () => {
  const result = orderPendingTasksByRoute(
    [task('TEST-DEFERRED-001'), task('TEST-ACTIVE-001')],
    {
      stages: [
        {
          sequence_id: 'PHASE-01-DEFERRED',
          block_code: 'D',
          block_title: 'Diferida',
          activation_state: 'DEFERRED',
          selectors: [{ prefix: 'TEST-DEFERRED' }],
        },
        {
          sequence_id: 'PHASE-02-ACTIVE',
          block_code: 'A',
          block_title: 'Activa',
          selectors: [{ prefix: 'TEST-ACTIVE' }],
        },
      ],
    },
  );
  assert.deepEqual(result.map(({ id }) => id), ['TEST-ACTIVE-001', 'TEST-DEFERRED-001']);
  assert.deepEqual(result.map(({ canonicalOrder }) => canonicalOrder), [2, 1]);
});

test('extrae el alcance canónico sin alterar el título de la tarea', () => {
  const scopes = parseTaskScopeContracts(`
<!-- TASK-SCOPE-CONTRACT:START -->
| Tarea | Decide | No decide ni ejecuta | Entrega a |
| --- | --- | --- | --- |
| \`TEST-A-001\` | Arquitectura y versiones compatibles. | Instalación física. | \`TEST-A-002\`. |
<!-- TASK-SCOPE-CONTRACT:END -->
`, 'test.md');

  const scope = scopes.get('TEST-A-001');
  assert.deepEqual(scope, {
    decides: 'Arquitectura y versiones compatibles.',
    excludes: 'Instalación física.',
    handoff: '`TEST-A-002`.',
  });
  assert.equal(
    describeTaskScope({ ...task('TEST-A-001'), scope }),
    'Arquitectura y versiones compatibles.',
  );
});

test('rechaza contratos de alcance ambiguos o incompletos', () => {
  assert.throws(
    () => parseTaskScopeContracts(`
<!-- TASK-SCOPE-CONTRACT:START -->
| \`TEST-A-001\` | Solo dos columnas. |
<!-- TASK-SCOPE-CONTRACT:END -->
`, 'test.md'),
    /Fila de alcance inválida/u,
  );

  assert.throws(
    () => parseTaskScopeContracts('<!-- TASK-SCOPE-CONTRACT:START -->', 'test.md'),
    /sin cierre válido/u,
  );
});

test('resume el carril fisico sin mezclar instancias terminales con la cola pendiente', () => {
  const summary = physicalLaneSummary({
    primaryAction: { type: 'AUTORIZAR_IMPLEMENTACION', target: 'SHELL-CON-008::GLOBAL' },
    physical: {
      active: {
        instanceId: 'SHELL-CON-008::GLOBAL',
        taskTitle: 'Centralizar códigos de error',
        status: 'PENDING_AUTHORIZATION',
      },
      instances: [
        { instanceId: 'SHELL-CON-007::GLOBAL', taskTitle: 'Anterior', status: 'VERIFIED' },
        { instanceId: 'SHELL-CON-008::GLOBAL', taskTitle: 'Centralizar códigos de error', status: 'PENDING_AUTHORIZATION' },
        { instanceId: 'SHELL-CON-009::GLOBAL', taskTitle: 'Siguiente', status: 'WAITING_FOR_PREVIOUS_INSTANCE', blocker: 'Debe verificarse primero SHELL-CON-008::GLOBAL.' },
      ],
    },
  });
  assert.equal(summary.total, 3);
  assert.equal(summary.verified, 1);
  assert.equal(summary.remaining, 2);
  assert.equal(summary.current.instanceId, 'SHELL-CON-008::GLOBAL');
  assert.equal(summary.next.instanceId, 'SHELL-CON-009::GLOBAL');
  assert.deepEqual(summary.queue.map(({ instanceId }) => instanceId), [
    'SHELL-CON-008::GLOBAL',
    'SHELL-CON-009::GLOBAL',
  ]);
});

test('prioriza una corrección activa y publica el primary gobernado sin inventar autorización física', () => {
  const documentaryTasks = [
    {
      ...task('VISO-AUTH-018'),
      title: 'Auditar cambios de seguridad',
      relativePath: 'bloques/G_VISO/01_GOBIERNO_DE_ACCESO_Y_SEGURIDAD.md',
    },
  ];
  const implementationControl = {
    documentary: { state: 'ACTIVO', taskId: 'VISO-AUTH-018' },
    physical: { active: null, instances: [] },
  };
  const correctionControl = {
    records: [{
      record: {
        correction_id: 'GAP-CTRL-006::CORR-001',
        status: 'IN_PROGRESS',
        opened_at: '2026-09-03T01:50:28.755Z',
        authorized_changes: [{
          change: 'MODIFY',
          path: 'docs/plan-canonico/modular/bloques/E1/07_REGISTRO.md',
        }],
        validation_commands: ['npm run docs:plan:check'],
        authorization: { approval_statement: 'Corregir el enrutamiento aprobado sin inventar identidades físicas.' },
      },
    }],
  };
  const readiness = {
    registry: {
      package_execution: {
        sequence: [{ package_id: 'GAP-PKG-001' }],
        current: {
          package_id: 'GAP-PKG-001',
          position: 1,
          status: 'COMPILED',
          next_action: {
            type: 'PREPARE_PACKAGE_GATE',
            target: 'GAP-PKG-001',
            command: 'npm run docs:package:start -- --package-id GAP-PKG-001',
            reason: 'El package actual todavía no tiene expediente package-gate.',
          },
        },
      },
      packages: [{
        package_id: 'GAP-PKG-001',
        source_kind: 'CANONICAL_GAP_PACKAGE',
        status: 'COMPILED',
        package_gate: { status: 'NOT_PREPARED', relative_path: 'package-gate/GAP-PKG-001.json' },
        readiness_progress: { gates: { passed: 2, total: 6, remaining: 4 } },
      }],
    },
  };

  const summary = operationalActionSummary({
    tasks: documentaryTasks,
    implementationControl,
    correctionControl,
    readiness,
  });
  assert.equal(summary.correction.correction_id, 'GAP-CTRL-006::CORR-001');
  assert.equal(summary.packageCurrent.package_id, 'GAP-PKG-001');
  assert.equal(summary.documentary.id, 'VISO-AUTH-018');
  assert.equal(summary.physical, null);

  const source = renderOperationalActionCenter(
    documentaryTasks,
    implementationControl,
    correctionControl,
    readiness,
  ).join('\n');
  assert.match(source, /QUÉ HACER AHORA — SIN INTERPRETAR NI ELEGIR/u);
  assert.match(source, /Termina la corrección abierta — `GAP-CTRL-006::CORR-001`/u);
  assert.match(source, /Ejecuta el primary de la governed frontier — `GAP-PKG-001`/u);
  assert.match(source, /npm run docs:package:start -- --package-id GAP-PKG-001/u);
  assert.match(source, /Continúa la documentación — `VISO-AUTH-018`/u);
  assert.match(source, /`NO_INICIAR_IMPLEMENTACIÓN_FÍSICA`/u);
});

test('renderiza un tablero dual legible sin perder la identidad documental ni fisica', () => {
  const documentaryTasks = [
    { ...task('AUTH-DB-015'), title: 'Documentar migraciones' },
    { ...task('AUTH-DB-027'), title: 'Crear harness de pruebas' },
  ];
  const source = renderDualLaneOverview(
    documentaryTasks,
    { coverage_policy: 'ALL_CANONICAL_TASKS_EXACTLY_ONCE' },
    {
      route_id: 'NORMAL-CANONICAL-FLOW-001',
      sequence_id: 'PHASE-03-R-DATABASE-IMPLEMENTATION',
      block_title: 'Fundación física',
      handoff_sequence_id: 'PHASE-04-F-ANIMA',
      segments: [{ prefix: 'AUTH-DB', from: 15 }],
    },
    {
      ordered: [
        { marker: '✅' },
        { marker: '[ ]' },
        { marker: '[ ]' },
      ],
    },
    {
      primaryAction: { type: 'AUTORIZAR_IMPLEMENTACION', target: 'SHELL-CON-008::GLOBAL' },
      coordination: { mode: 'CONTROLLED_DUAL_LANE' },
      documentary: { state: 'ACTIVO', taskId: 'AUTH-DB-015' },
      physical: {
        active: {
          instanceId: 'SHELL-CON-008::GLOBAL',
          taskTitle: 'Centralizar códigos de error',
          status: 'PENDING_AUTHORIZATION',
        },
        instances: [
          { instanceId: 'SHELL-CON-007::GLOBAL', taskTitle: 'Anterior', status: 'VERIFIED' },
          { instanceId: 'SHELL-CON-008::GLOBAL', taskTitle: 'Centralizar códigos de error', status: 'PENDING_AUTHORIZATION' },
          { instanceId: 'SHELL-CON-009::GLOBAL', taskTitle: 'Siguiente', status: 'WAITING_FOR_PREVIOUS_INSTANCE', blocker: 'Debe verificarse primero SHELL-CON-008::GLOBAL.' },
        ],
      },
    },
  ).join('\n');

  assert.match(source, /Panel de control — dos carriles/u);
  assert.ok(source.includes('🟦 **DOCUMENTACIÓN**'));
  assert.match(source, /AUTH-DB-015/u);
  assert.match(source, /AUTH-DB-027/u);
  assert.ok(source.includes('🟧 **IMPLEMENTACIÓN FÍSICA**'));
  assert.match(source, /SHELL-CON-008::GLOBAL/u);
  assert.match(source, /SHELL-CON-009::GLOBAL/u);
  assert.match(source, /CONTROLLED_DUAL_LANE/u);
  assert.match(source, /Cola física visible/u);
});

test('registro de pendientes prioriza la fundación sobre el package consumidor', () => {
  const readiness = { registry: {
    package_execution: {
      sequence: [{ package_id: 'GAP-PKG-001' }],
      current: {
        package_id: 'GAP-PKG-001',
        position: 1,
        status: 'READY_FOR_GATE',
        current_work: { kind: 'FOUNDATION_GATE', id: 'MRP015-000', gate_id: 'TOOLCHAIN_READY', owner_task: 'SUPA-TRANS-015', status: 'UNKNOWN', consumer_package_id: 'GAP-PKG-001' },
        next_action: { type: 'WAIT_FOR_FOUNDATION_PREREQUISITE', target: 'MRP015-000', command: 'npm run docs:package:readiness:check -- --package GAP-PKG-001', reason: 'Toolchain pendiente.' },
      },
    },
    packages: [{ package_id: 'GAP-PKG-001', source_kind: 'CANONICAL_GAP_PACKAGE', status: 'READY_FOR_GATE', package_gate: { status: 'APPROVED_FOR_IMPLEMENTATION' }, readiness_progress: { gates: { passed: 5, total: 6, remaining: 1 } } }],
  } };

  const tasks = [{ ...task('TEST-A-001'), title: 'Tarea documental' }];
  const implementationControl = { documentary: { taskId: 'TEST-A-001' }, physical: { active: null, instances: [] } };
  const source = renderOperationalActionCenter(tasks, implementationControl, { records: [] }, readiness).join("\n");
  assert.match(source, /Resuelve la fundación que tiene precedencia — `MRP015-000`/u);
  assert.match(source, /Package consumidor bloqueado:.*`GAP-PKG-001`/u);
  assert.doesNotMatch(source, /Ejecuta el primary de la governed frontier — `GAP-PKG-001`/u);
});

// CORR-013 GOVERNED ACTIVE SET
test('mantiene varias instancias fisicas EN CURSO sin colapsarlas a una sola ACTUAL', () => {
  const ci020 = { instanceId: 'SHELL-CI-020::GAP-PKG-018', taskTitle: 'Implementar package', status: 'PENDING_AUTHORIZATION', recordPath: 'ci020.json' };
  const ci022 = { instanceId: 'SHELL-CI-022::GAP-PKG-001', taskTitle: 'Ejecutar piloto', status: 'PENDING_AUTHORIZATION', recordPath: 'ci022.json' };
  const summary = physicalLaneSummary({
    primaryAction: { type: 'AUTORIZAR_IMPLEMENTACION', target: ci020.instanceId },
    physical: {
      active: ci020,
      actionableSet: [ci020, ci022],
      instances: [ci022, ci020],
    },
  });
  assert.deepEqual(summary.actionable.map(({ instanceId }) => instanceId), [ci020.instanceId, ci022.instanceId]);
  assert.deepEqual(summary.queue.map(({ instanceId }) => instanceId), [ci020.instanceId, ci022.instanceId]);
  assert.equal(summary.current.instanceId, ci020.instanceId);
  assert.equal(summary.next.instanceId, ci022.instanceId);
});

// C6_PENDING_CONTEXT_EFFECTIVE_PROJECTION_TEST
test('contexto pendiente distingue estado declarado, efectivo y recovery sin comando mutante inválido', () => {
  const invalid = {
    instanceId: 'SHELL-CI-022::GAP-PKG-001',
    taskTitle: 'Validar despliegue',
    recordPath: 'instance.json',
    status: 'IN_PROGRESS',
    declaredStatus: 'VERIFIED',
    effectiveStatus: 'IN_PROGRESS',
    stateIntegrityRecoveryRequired: true,
    recoveryAction: 'RECONCILE_DECLARED_STATUS_TO_IN_PROGRESS',
    stateIntegrity: { status_valid: false },
  };
  const projection = physicalOperationalProjection(invalid);
  assert.equal(projection.declaredStatus, 'VERIFIED');
  assert.equal(projection.effectiveStatus, 'IN_PROGRESS');
  assert.equal(projection.integrityValid, false);
  assert.equal(projection.mutationCommand, null);

  const implementationControl = {
    documentary: { state: 'ACTIVO', taskId: 'DOC-001' },
    primaryAction: { type: 'RECONCILE_IMPLEMENTATION_STATE_INTEGRITY', target: invalid.instanceId },
    physical: { active: invalid, actionableSet: [invalid], instances: [invalid] },
  };
  const source = renderOperationalActionCenter(
    [{ id: 'DOC-001', title: 'Documento', relativePath: 'doc.md' }],
    implementationControl,
    { records: [] },
    { registry: { package_execution: null, packages: [] } },
  ).join('\n');
  assert.match(source, /declared=`VERIFIED`/u);
  assert.match(source, /effective=`IN_PROGRESS`/u);
  assert.match(source, /RECONCILIAR_INTEGRIDAD_DE_ESTADO/u);
  assert.match(source, /NONE_UNTIL_INTEGRITY_RECONCILED/u);
  assert.doesNotMatch(source, /npm run docs:implementation:(?:start|preverify|finish)/u);
});
