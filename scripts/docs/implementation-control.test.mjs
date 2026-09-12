import assert from 'node:assert/strict';
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import test from 'node:test';

import {
  deriveImplementationControl,
  ensurePendingImplementationRecord,
  pendingInstanceRecord,
  renderCurrentWorkDirective,
} from './implementation-control.mjs';

const baseControl = {
  schema_version: 1,
  authorization_mode: 'EXPLICIT_PER_INSTANCE',
  automatic_authorization: false,
  single_primary_action: false,
  instance_storage_mode: 'ONE_FILE_PER_INSTANCE',
  instance_records_directory: 'docs/plan-canonico/modular/implementation-instances',
  instance_history_mode: 'APPEND_ONLY_LEDGER',
  verified_instances_immutable: true,
  execution_operator_policy: {
    default_operator: 'HUMAN_USER',
    interaction_mode: 'CONTINUOUS_BATCH_UNTIL_EVIDENCE_GATE',
    assistant_repository_writes: false,
    assistant_validation_execution: false,
    assistant_git_operations: false,
    assistant_remote_mutations: false,
    assistant_read_only_audit: true,
    pause_only_when_next_step_depends_on_evidence: true,
    evidence_reply_prefix: 'RESULTADO DEL PASO ',
    assisted_execution_authorization_prefix: 'AUTORIZO EJECUCION ASISTIDA DEL PASO ',
  },
  instance_statuses: [
    'PENDING_AUTHORIZATION',
    'AUTHORIZED',
    'IN_PROGRESS',
    'BLOCKED',
    'IMPLEMENTED',
    'VERIFIED',
    'DEFERRED',
  ],
  instances: [],
};

function topology() {
  const tasks = [
    { id: 'SHELL-CI-001', title: 'Crear pruebas', marker: '✅', relativePath: 'ci.md' },
    { id: 'SHELL-CI-002', title: 'Crear build', marker: '✅', relativePath: 'ci.md' },
    { id: 'SHELL-CI-003', title: 'Crear releases', marker: '[ ]', relativePath: 'ci.md' },
  ];
  return {
    ordered: tasks,
    inventory: new Map(tasks.map((task) => [task.id, task])),
    topology: new Map(tasks.map((task) => [task.id, {
      taskId: task.id,
      mode: 'GLOBAL_ENABLE_ONCE',
      instancePattern: '<task_id>::GLOBAL',
    }])),
    currentId: 'SHELL-CI-003',
  };
}

function scope(status, taskId = 'SHELL-CI-001') {
  const entry = {
    instance_id: `${taskId}::GLOBAL`,
    task_id: taskId,
    status,
    target_repositories: ['vento-shell'],
    authorized_changes: ['scripts de CI del habilitador'],
    validation_commands: ['npm test'],
    evidence: ['evidence.json'],
  };
  return {
    ...entry,
    authorization: {
      decision: 'APPROVED',
      approved_by: 'VENTO_OWNER',
      approved_at: '2026-08-17',
      timezone: 'America/Bogota',
      approval_statement: 'Apruebo exclusivamente el alcance declarado por esta instancia.',
      source_contract_sha256: 'a'.repeat(64),
    },
  };
}

test('elige una sola autorización física y mantiene activo el carril documental', () => {
  const result = deriveImplementationControl({
    control: baseControl,
    workTopology: topology(),
  });
  assert.equal(result.primaryAction.type, 'AUTORIZAR_IMPLEMENTACION');
  assert.equal(result.primaryAction.target, 'SHELL-CI-001::GLOBAL');
  assert.equal(result.implementationAuthorized, false);
  assert.equal(result.documentary.taskId, 'SHELL-CI-003');
  assert.equal(result.documentary.state, 'ACTIVO');
  assert.equal(result.documentary.parallelWithPhysical, true);
  assert.equal(result.coordination.mode, 'CONTROLLED_DUAL_LANE');
  assert.equal(result.coordination.documentaryConcurrency, 'ONE_ACTIVE_TASK');
  assert.equal(result.coordination.physicalConcurrency, 'GOVERNED_ACTIVE_SET');
  assert.equal(result.coordination.separateCheckoutsRequired, true);
  assert.equal(result.coordination.mergePolicy, 'SERIALIZED_CLOSE');
  assert.equal(result.coordination.latestMainReconciliationRequired, true);
  assert.equal(result.coordination.physicalContractFreeze, 'SOURCE_CONTRACT_SHA256');
  assert.equal(result.physical.instances[1].status, 'WAITING_FOR_PREVIOUS_INSTANCE');
});

test('el borrador automático conserva identidad sin inferir autorización ni alcance', () => {
  const draft = pendingInstanceRecord({
    instanceId: 'SHELL-CI-001::GLOBAL',
    taskId: 'SHELL-CI-001',
  });
  assert.deepEqual(draft, {
    instance_id: 'SHELL-CI-001::GLOBAL',
    task_id: 'SHELL-CI-001',
    status: 'PENDING_AUTHORIZATION',
    target_repositories: [],
    authorized_changes: [],
    validation_commands: [],
    authorization: null,
    evidence: [],
  });
  const result = deriveImplementationControl({
    control: { ...baseControl, instances: [draft] },
    workTopology: topology(),
  });
  assert.equal(result.primaryAction.type, 'AUTORIZAR_IMPLEMENTACION');
  assert.equal(result.implementationAuthorized, false);
  assert.equal(result.physical.active.record.status, 'PENDING_AUTHORIZATION');
});

test('materializa automáticamente el archivo pendiente exacto una sola vez', () => {
  const root = fs.mkdtempSync(path.join(os.tmpdir(), 'vento-implementation-instance-'));
  const recordPath = 'docs/plan-canonico/modular/implementation-instances/SHELL-CI-001__GLOBAL.json';
  const control = {
    primaryAction: { type: 'AUTORIZAR_IMPLEMENTACION' },
    physical: {
      active: {
        instanceId: 'SHELL-CI-001::GLOBAL',
        taskId: 'SHELL-CI-001',
        recordPath,
        source: 'DERIVED_FROM_APPROVED_CONTRACT',
      },
    },
  };
  try {
    assert.equal(ensurePendingImplementationRecord({ root, control }), true);
    const materialized = JSON.parse(fs.readFileSync(path.join(root, recordPath), 'utf8'));
    assert.equal(materialized.status, 'PENDING_AUTHORIZATION');
    assert.deepEqual(materialized.target_repositories, []);
    assert.equal(materialized.authorization, null);
    const original = fs.readFileSync(path.join(root, recordPath), 'utf8');
    assert.equal(ensurePendingImplementationRecord({ root, control }), true);
    assert.equal(fs.readFileSync(path.join(root, recordPath), 'utf8'), original);
  } finally {
    fs.rmSync(root, { recursive: true, force: true });
  }
});

// C6_CONTROL_ADVANCE_ONLY_LEGACY_EXPECTATION_ALIGNED
test('AUTHORIZED, IN_PROGRESS e IMPLEMENTED comparten una sola entrada mutante por advance', () => {
  for (const status of ['AUTHORIZED', 'IN_PROGRESS', 'IMPLEMENTED']) {
    const result = deriveImplementationControl({
      control: { ...baseControl, instances: [scope(status)] },
      workTopology: topology(),
    });
    assert.equal(result.primaryAction.type, 'EJECUTAR_IMPLEMENTACION');
    assert.equal(result.primaryAction.target, 'SHELL-CI-001::GLOBAL');
    assert.equal(result.implementationAuthorized, true);
    assert.equal(
      result.primaryAction.command,
      'npm run docs:implementation:advance -- --instance-id SHELL-CI-001::GLOBAL',
    );
    assert.match(result.primaryAction.instruction, /exclusivamente mediante docs:implementation:advance/u);
    assert.match(result.primaryAction.instruction, /coordinador resuelve internamente start, preverify, repair y finish/u);
  }
});

test('la autorización explícita conserva operador humano y pausa solo por evidencia necesaria', () => {
  const result = deriveImplementationControl({
    control: { ...baseControl, instances: [scope('AUTHORIZED')] },
    workTopology: topology(),
  });
  assert.equal(result.primaryAction.type, 'EJECUTAR_IMPLEMENTACION');
  assert.equal(result.executionOperatorPolicy.defaultOperator, 'HUMAN_USER');
  assert.equal(result.executionOperatorPolicy.assistantRepositoryWrites, false);
  assert.equal(result.executionOperatorPolicy.pauseOnlyWhenNextStepDependsOnEvidence, true);
  assert.equal(result.executionOperatorPolicy.evidenceReplyPrefix, 'RESULTADO DEL PASO ');
  assert.deepEqual(result.physical.authorized.map(({ instanceId }) => instanceId), ['SHELL-CI-001::GLOBAL']);
  assert.equal(result.documentary.state, 'ACTIVO');
  assert.equal(result.documentary.parallelWithPhysical, true);
});

test('la directiva conserva IMPLEMENTED hasta completar evidencia remota', () => {
  const result = deriveImplementationControl({
    control: { ...baseControl, instances: [scope('AUTHORIZED')] },
    workTopology: topology(),
  });
  const source = renderCurrentWorkDirective(result);
  assert.match(source, /evidencia remota/u);
  assert.match(source, /commit\/push de materialización/u);
  assert.match(source, /antes de VERIFIED/u);
  assert.match(source, /CONTROLLED_DUAL_LANE/u);
  assert.match(source, /checkout independiente/u);
  assert.match(source, /Cierre:\*\* serializado/u);
  assert.match(source, /reconciliar el `main` más reciente/u);
});

test('rechaza habilitar escrituras automáticas del asistente por inferencia', () => {
  assert.throws(() => deriveImplementationControl({
    control: {
      ...baseControl,
      execution_operator_policy: {
        ...baseControl.execution_operator_policy,
        assistant_repository_writes: true,
      },
    },
    workTopology: topology(),
  }), /assistant_repository_writes debe ser false/u);
});

test('rechaza autorizar una instancia sin evidencia humana completa', () => {
  const entry = scope('AUTHORIZED');
  delete entry.authorization;
  assert.throws(() => deriveImplementationControl({
    control: { ...baseControl, instances: [entry] },
    workTopology: topology(),
  }), /debe conservar authorization como evidencia humana/u);
});

test('acepta la autorización sin obligar al usuario a calcular un hash del alcance', () => {
  const entry = scope('AUTHORIZED');
  const result = deriveImplementationControl({
    control: { ...baseControl, instances: [entry] },
    workTopology: topology(),
  });
  assert.equal(result.primaryAction.type, 'EJECUTAR_IMPLEMENTACION');
});

test('la segunda instancia global solo queda elegible después de verificar la primera', () => {
  const result = deriveImplementationControl({
    control: { ...baseControl, instances: [scope('VERIFIED')] },
    workTopology: topology(),
  });
  assert.equal(result.primaryAction.type, 'AUTORIZAR_IMPLEMENTACION');
  assert.equal(result.primaryAction.target, 'SHELL-CI-002::GLOBAL');
  assert.equal(
    result.physical.active.recordPath,
    'docs/plan-canonico/modular/implementation-instances/SHELL-CI-002__GLOBAL.json',
  );
  assert.deepEqual(
    result.physical.recordedInstances.map(({ instance_id: instanceId }) => instanceId),
    ['SHELL-CI-001::GLOBAL'],
  );
});

test('un PENDING_AUTHORIZATION posterior espera cuando aparece una instancia global previa sin verificar', () => {
  const pendingSecond = pendingInstanceRecord({
    instanceId: 'SHELL-CI-002::GLOBAL',
    taskId: 'SHELL-CI-002',
  });

  const result = deriveImplementationControl({
    control: {
      ...baseControl,
      instances: [pendingSecond],
    },
    workTopology: topology(),
  });

  assert.equal(result.primaryAction.type, 'AUTORIZAR_IMPLEMENTACION');
  assert.equal(result.primaryAction.target, 'SHELL-CI-001::GLOBAL');

  const second = result.physical.instances.find(
    ({ instanceId }) => instanceId === 'SHELL-CI-002::GLOBAL',
  );

  assert.ok(second);
  assert.equal(second.status, 'WAITING_FOR_PREVIOUS_INSTANCE');
  assert.equal(second.record.status, 'PENDING_AUTHORIZATION');
  assert.match(second.blocker, /SHELL-CI-001::GLOBAL/u);
});

test('el historial físico exige almacenamiento acumulativo por archivo', () => {
  assert.throws(() => deriveImplementationControl({
    control: {
      ...baseControl,
      instance_history_mode: 'REPLACE_CURRENT',
    },
    workTopology: topology(),
  }), /instance_history_mode debe ser APPEND_ONLY_LEDGER/u);
});

test('bloquea autorización paralela que salte una instancia global previa', () => {
  assert.throws(() => deriveImplementationControl({
    control: { ...baseControl, instances: [scope('AUTHORIZED', 'SHELL-CI-002')] },
    workTopology: topology(),
  }), /no puede estar AUTHORIZED antes de verificar SHELL-CI-001::GLOBAL/u);
});

test('una instancia por unidad no puede autorizarse sin evidencia de sus gates', () => {
  const workTopology = topology();
  workTopology.topology.set('SHELL-CI-001', {
    taskId: 'SHELL-CI-001',
    mode: 'PER_IMPLEMENTATION_UNIT',
    instancePattern: '<task_id>::<implementation_unit_id>',
  });
  assert.throws(() => deriveImplementationControl({
    control: {
      ...baseControl,
      instances: [{
        ...scope('AUTHORIZED'),
        instance_id: 'SHELL-CI-001::UNIT-001',
      }],
    },
    workTopology,
  }), /debe declarar prerequisite_evidence/u);
});

test('foundation pendiente prevalece sobre PENDING_AUTHORIZATION de SHELL-CI-020', () => {
  const task = { id: 'SHELL-CI-020', title: 'Implementar package', marker: '✅', relativePath: 'ci.md' };
  const workTopology = {
    ordered: [task],
    inventory: new Map([[task.id, task]]),
    topology: new Map([[task.id, {
      taskId: task.id,
      mode: 'PER_IMPLEMENTATION_UNIT',
      instancePattern: '<task_id>::<implementation_unit_id>',
    }]]),
    currentId: task.id,
  };
  const pending = {
    instance_id: 'SHELL-CI-020::GAP-PKG-001',
    task_id: 'SHELL-CI-020',
    status: 'PENDING_AUTHORIZATION',
    target_repositories: [],
    authorized_changes: [],
    validation_commands: [],
    authorization: null,
    evidence: [],
  };
  const packageExecution = {
    current_work: {
      kind: 'FOUNDATION_GATE',
      id: 'MRP015-000',
      gate_id: 'TOOLCHAIN_READY',
      owner_task: 'SUPA-TRANS-015',
      consumer_package_id: 'GAP-PKG-001',
      status: 'UNKNOWN',
    },
    current: {
      next_action: {
        type: 'WAIT_FOR_FOUNDATION_PREREQUISITE',
        target: 'MRP015-000',
        command: 'npm run docs:package:readiness:check -- --package GAP-PKG-001',
        reason: 'GAP-PKG-001 conserva el turno hasta cerrar TOOLCHAIN_READY.',
      },
    },
  };

  const result = deriveImplementationControl({
    control: { ...baseControl, instances: [pending] },
    workTopology,
    packageExecution,
  });

  assert.equal(result.primaryAction.type, 'WAIT_FOR_FOUNDATION_PREREQUISITE');
  assert.equal(result.primaryAction.target, 'MRP015-000');
  assert.equal(result.physical.active, null);
  const projected = result.physical.instances.find(({ instanceId }) => instanceId === pending.instance_id);
  assert.equal(projected.status, 'WAITING_FOR_FOUNDATION_PREREQUISITE');
  assert.equal(projected.record.status, 'PENDING_AUTHORIZATION');
  assert.equal(result.physical.blockedCount, 1);
});

test('SHELL-CI-020 AUTHORIZED exige target_environments completos', () => {
  const task = { id: 'SHELL-CI-020', title: 'Implementar package', marker: '✅', relativePath: 'ci.md' };
  const workTopology = {
    ordered: [task],
    inventory: new Map([[task.id, task]]),
    topology: new Map([[task.id, {
      taskId: task.id,
      mode: 'PER_IMPLEMENTATION_UNIT',
      instancePattern: '<task_id>::<implementation_unit_id>',
    }]]),
    currentId: task.id,
  };
  const entry = {
    instance_id: 'SHELL-CI-020::GAP-PKG-001',
    task_id: 'SHELL-CI-020',
    status: 'AUTHORIZED',
    target_repositories: ['vento-group-sas/vento-shell'],
    authorized_changes: ['supabase/functions/shift-runtime-processor/index.ts'],
    validation_commands: ['npm test'],
    prerequisite_evidence: ['E5-GATE-008::GAP-PKG-001'],
    authorization: {
      decision: 'APPROVED',
      approved_by: 'VENTO_OWNER',
      approved_at: '2026-09-05T14:00:00-05:00',
      timezone: 'America/Bogota',
      approval_statement: 'APROBADO.',
      source_contract_sha256: 'a'.repeat(64),
    },
    evidence: [],
  };
  assert.throws(() => deriveImplementationControl({
    control: { ...baseControl, instances: [entry] },
    workTopology,
    packageExecution: null,
    preflight: { task: { id: task.id, title: task.title, owner: task.relativePath } },
  }), /target_environments completos/u);

  const valid = {
    ...entry,
    target_environments: [{
      environment_role: 'STAGING',
      target_type: 'SUPABASE_PROJECT_REF',
      target_id: 'rcrxixmqhrndcervbllp',
      owner: 'SUPA-TRANS-015',
    }],
  };
  const result = deriveImplementationControl({
    control: { ...baseControl, instances: [valid] },
    workTopology,
    packageExecution: null,
    preflight: { task: { id: task.id, title: task.title, owner: task.relativePath } },
  });
  assert.equal(result.primaryAction.type, 'EJECUTAR_IMPLEMENTACION');
  assert.deepEqual(result.physical.active.targetEnvironments, valid.target_environments);
});

// CORR-010 PACKAGE CANDIDATE DERIVATION
test('deriva y materializa únicamente la siguiente TEMPLATE_PER_PACKAGE indicada por package_execution', () => {
  const tasks = ['SHELL-CI-021', 'SHELL-CI-022', 'SHELL-CI-023', 'SHELL-CI-024']
    .map((id) => ({ id, title: id, marker: '✅', relativePath: 'ci.md' }));
  const workTopology = {
    ordered: tasks,
    inventory: new Map(tasks.map((task) => [task.id, task])),
    topology: new Map(tasks.map((task) => [task.id, {
      taskId: task.id,
      mode: 'TEMPLATE_PER_PACKAGE',
      instancePattern: '<task_id>::<package_id>',
    }])),
    currentId: 'SHELL-CI-021',
  };
  const packageExecution = {
    current: {
      package_id: 'GAP-PKG-001',
      next_action: {
        type: 'CONTINUE_PHYSICAL_LIFECYCLE',
        target: 'SHELL-CI-021::GAP-PKG-001',
      },
    },
  };
  const result = deriveImplementationControl({
    control: { ...baseControl, instances: [] },
    workTopology,
    packageExecution,
    preflight: { task: { id: 'SHELL-CI-021', title: 'SHELL-CI-021', owner: 'ci.md' } },
  });
  assert.equal(result.primaryAction.type, 'AUTORIZAR_IMPLEMENTACION');
  assert.equal(result.primaryAction.target, 'SHELL-CI-021::GAP-PKG-001');
  assert.equal(result.physical.active.source, 'DERIVED_FROM_APPROVED_CONTRACT');
  assert.equal(result.physical.active.lifecycleMode, 'TEMPLATE_PER_PACKAGE');
});

// CORR-013 MULTI ACTIVE PHYSICAL PIPELINE
test('expone multiples instancias fisicas gobernadas y conserva primaryAction solo como compatibilidad', () => {
  const tasks = [
    { id: 'SHELL-CI-020', title: 'Implementar package', marker: '✅', relativePath: 'ci.md' },
    { id: 'SHELL-CI-022', title: 'Ejecutar piloto', marker: '✅', relativePath: 'ci.md' },
  ];
  const workTopology = {
    ordered: tasks,
    inventory: new Map(tasks.map((task) => [task.id, task])),
    topology: new Map([
      ['SHELL-CI-020', { taskId: 'SHELL-CI-020', mode: 'PER_IMPLEMENTATION_UNIT', instancePattern: '<task_id>::<implementation_unit_id>' }],
      ['SHELL-CI-022', { taskId: 'SHELL-CI-022', mode: 'TEMPLATE_PER_PACKAGE', instancePattern: '<task_id>::<package_id>' }],
    ]),
    currentId: 'SHELL-CI-020',
  };
  const ci020 = {
    instance_id: 'SHELL-CI-020::GAP-PKG-018',
    task_id: 'SHELL-CI-020',
    status: 'PENDING_AUTHORIZATION',
    target_repositories: [],
    authorized_changes: [],
    validation_commands: [],
    authorization: null,
    evidence: [],
  };
  const ci022 = {
    instance_id: 'SHELL-CI-022::GAP-PKG-001',
    task_id: 'SHELL-CI-022',
    status: 'PENDING_AUTHORIZATION',
    target_repositories: [],
    authorized_changes: [],
    validation_commands: [],
    authorization: null,
    evidence: [],
  };
  const result = deriveImplementationControl({
    control: { ...baseControl, instances: [ci022, ci020] },
    workTopology,
    packageExecution: {
      active_physical: [{
        package_id: 'GAP-PKG-001',
        status: 'PILOT_RUNNING',
        next_action: { type: 'CONTINUE_PHYSICAL_LIFECYCLE', target: 'SHELL-CI-022::GAP-PKG-001' },
      }],
      current: {
        package_id: 'GAP-PKG-018',
        next_action: { type: 'CONTINUE_PHYSICAL_LIFECYCLE', target: 'SHELL-CI-020::GAP-PKG-018' },
      },
    },
    preflight: { task: { id: 'SHELL-CI-020', title: 'Implementar package', owner: 'ci.md' } },
  });

  assert.deepEqual(result.physical.actionableSet.map(({ instanceId }) => instanceId), [
    'SHELL-CI-020::GAP-PKG-018',
    'SHELL-CI-022::GAP-PKG-001',
  ]);
  assert.deepEqual(result.primaryActions.map(({ target }) => target), [
    'SHELL-CI-020::GAP-PKG-018',
    'SHELL-CI-022::GAP-PKG-001',
  ]);
  assert.equal(result.primaryAction.target, 'SHELL-CI-020::GAP-PKG-018');
  assert.equal(result.physical.active.instanceId, 'SHELL-CI-020::GAP-PKG-018');
  assert.equal(result.coordination.physicalConcurrency, 'GOVERNED_ACTIVE_SET');
  assert.equal(result.mode, 'GOVERNED_ACTIVE_SET');
});

// CORR-013 V1R3 PENDING RECORD COMPATIBILITY
test('materializa todos los borradores derived del actionableSet y conserva compatibilidad idempotente', () => {
  const root = fs.mkdtempSync(path.join(os.tmpdir(), 'vento-implementation-multi-instance-'));
  const firstPath = 'docs/plan-canonico/modular/implementation-instances/SHELL-CI-020__GAP-PKG-018.json';
  const secondPath = 'docs/plan-canonico/modular/implementation-instances/SHELL-CI-022__GAP-PKG-001.json';
  const control = {
    primaryAction: { type: 'AUTORIZAR_IMPLEMENTACION' },
    physical: {
      active: null,
      actionableSet: [
        { instanceId: 'SHELL-CI-020::GAP-PKG-018', taskId: 'SHELL-CI-020', status: 'READY_FOR_AUTHORIZATION', recordPath: firstPath, source: 'DERIVED_FROM_APPROVED_CONTRACT' },
        { instanceId: 'SHELL-CI-022::GAP-PKG-001', taskId: 'SHELL-CI-022', status: 'READY_FOR_AUTHORIZATION', recordPath: secondPath, source: 'DERIVED_FROM_APPROVED_CONTRACT' },
      ],
    },
  };
  try {
    assert.equal(ensurePendingImplementationRecord({ root, control }), true);
    assert.equal(fs.existsSync(path.join(root, firstPath)), true);
    assert.equal(fs.existsSync(path.join(root, secondPath)), true);
    assert.equal(ensurePendingImplementationRecord({ root, control }), true);
  } finally {
    fs.rmSync(root, { recursive: true, force: true });
  }
});

// C6_CONTROL_EFFECTIVE_STATE_RECOVERY
test('control proyecta estado efectivo y suprime mutaciones cuando el ledger excede la evidencia', () => {
  const invalid = scope('VERIFIED');
  const result = deriveImplementationControl({
    root: '/repo',
    control: { ...baseControl, instances: [invalid] },
    workTopology: topology(),
    stateIntegrityAssessor: () => ({
      declared_status: 'VERIFIED',
      highest_valid_status: 'IN_PROGRESS',
      status_valid: false,
      missing_prerequisites: ['LOCAL_VALIDATION_EVIDENCE_INCOMPLETE'],
      stale_evidence: [],
      next_legal_transition: 'MATERIALIZE_AND_VALIDATE',
      recoverable: true,
      recovery_action: 'RECONCILE_DECLARED_STATUS_TO_IN_PROGRESS_THEN_MATERIALIZE_VALIDATE_AND_SEAL_CANDIDATE',
    }),
  });

  assert.equal(result.physical.active.declaredStatus, 'VERIFIED');
  assert.equal(result.physical.active.status, 'IN_PROGRESS');
  assert.equal(result.physical.active.effectiveStatus, 'IN_PROGRESS');
  assert.equal(result.physical.active.stateIntegrityRecoveryRequired, true);
  assert.equal(result.primaryAction.type, 'RECONCILE_IMPLEMENTATION_STATE_INTEGRITY');
  assert.equal(result.primaryAction.command, null);
  assert.equal(result.implementationAuthorized, false);
  assert.deepEqual(result.physical.authorized, []);

  const directive = renderCurrentWorkDirective(result);
  assert.match(directive, /Estado declarado/u);
  assert.match(directive, /Estado efectivo/u);
  assert.match(directive, /docs:implementation:advance/u);
  assert.match(directive, /NINGUNO_HASTA_RECONCILIAR_O_AUTORIZAR/u);
  assert.doesNotMatch(directive, /npm run docs:implementation:(?:start|preverify|finish)/u);
});
