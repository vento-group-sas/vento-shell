import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

import { resolveTaskWorkTopology } from './task-work-topology.mjs';
import { scanPackageReadiness } from './package-readiness-scanner.mjs';
import { assessImplementationStateIntegrity, IMPLEMENTATION_MUTATING_ENTRYPOINT } from './implementation-state-integrity.mjs';

const CONTROL_PATH = 'docs/plan-canonico/modular/implementation-control.json';
const INSTANCE_RECORDS_DIRECTORY = 'docs/plan-canonico/modular/implementation-instances';
const OUTPUT_PATH = '.delivery/current-work-directive.md';
const STATUS_OUTPUT_PATH = '.delivery/implementation-control-status.json';
const EXPLICIT_STATUSES = new Set([
  'PENDING_AUTHORIZATION',
  'AUTHORIZED',
  'IN_PROGRESS',
  'BLOCKED',
  'IMPLEMENTED',
  'VERIFIED',
  'DEFERRED',
]);
const AUTHORIZED_LIFECYCLE_STATUSES = new Set([
  'AUTHORIZED',
  'IN_PROGRESS',
  'IMPLEMENTED',
  'VERIFIED',
]);

function fail(errors) {
  throw new Error(`implementation-control.json inválido:\n- ${errors.join('\n- ')}`);
}

function stateFromMarker(marker) {
  if (marker === '[ ]') return 'NO INICIADA';
  if (marker === '[~]' || marker === '🟡') return 'PROPUESTA PARA APROBACIÓN';
  if (marker === '❌') return 'RECHAZADA';
  return 'APROBADA';
}

function markdown(value) {
  return String(value ?? '—').replaceAll('|', '\\|').replace(/\s+/gu, ' ').trim() || '—';
}

function completeTargetEnvironments(values) {
  return Array.isArray(values)
    && values.length > 0
    && values.every((value) => (
      value
      && typeof value === 'object'
      && !Array.isArray(value)
      && String(value.environment_role ?? '').trim()
      && String(value.target_type ?? '').trim()
      && String(value.target_id ?? '').trim()
      && String(value.owner ?? '').trim()
    ));
}

function expectedInstancePattern(taskId, lifecycle) {
  if (lifecycle.mode === 'GLOBAL_ENABLE_ONCE') return `${taskId}::GLOBAL`;
  if (lifecycle.mode === 'GLOBAL_FINAL') return `${taskId}::GLOBAL-FINAL`;
  return null;
}

export function derivePackageLifecycleCandidate({
  packageExecution,
  executionEntry = null,
  workTopology,
  explicitById,
}) {
  const entry = executionEntry ?? packageExecution?.current ?? null;
  const action = entry?.next_action ?? null;
  if (action?.type !== 'CONTINUE_PHYSICAL_LIFECYCLE') return null;

  const instanceId = String(action.target ?? '').trim();
  const match = /^(SHELL-CI-02[1-4])::(GAP-PKG-\d{3})$/u.exec(instanceId);
  if (!match) return null;

  const taskId = match[1];
  const packageId = match[2];
  if (String(entry?.package_id ?? '').trim() !== packageId) {
    fail([`${instanceId} no pertenece al package proyectado ${entry?.package_id ?? 'NONE'}.`]);
  }

  const task = workTopology.inventory.get(taskId) ?? null;
  const lifecycle = workTopology.topology.get(taskId) ?? null;
  if (!task || stateFromMarker(task.marker) !== 'APROBADA') {
    fail([`${taskId} debe existir y estar APROBADA para derivar ${instanceId}.`]);
  }
  if (!['TEMPLATE_PER_PACKAGE', 'PER_IMPLEMENTATION_UNIT'].includes(lifecycle?.mode)) {
    fail([`${taskId} debe conservar topología por package/unidad; actual ${lifecycle?.mode ?? 'NONE'}.`]);
  }

  const explicit = explicitById.get(instanceId) ?? null;
  return {
    instanceId,
    recordPath: instanceRecordRelativePath(instanceId),
    taskId,
    taskTitle: task.title,
    lifecycleMode: lifecycle.mode,
    status: explicit?.status ?? 'READY_FOR_AUTHORIZATION',
    source: explicit ? 'EXPLICIT' : 'DERIVED_FROM_APPROVED_CONTRACT',
    record: explicit,
    targetRepositories: explicit?.target_repositories ?? [],
    authorizedChanges: explicit?.authorized_changes ?? [],
    validationCommands: explicit?.validation_commands ?? [],
    targetEnvironments: explicit?.target_environments ?? [],
    evidence: explicit?.evidence ?? [],
    blocker: explicit?.blocker ?? null,
    packageId,
  };
}

export function instanceRecordRelativePath(instanceId) {
  const normalized = String(instanceId ?? '').trim();
  if (!normalized || !/^[A-Za-z0-9._:-]+$/u.test(normalized)) {
    throw new Error(`instance_id no puede convertirse en ruta segura: ${instanceId ?? 'VACÍO'}.`);
  }
  return `${INSTANCE_RECORDS_DIRECTORY}/${normalized.replaceAll('::', '__')}.json`;
}

export function pendingInstanceRecord(instance) {
  return {
    instance_id: instance.instanceId,
    task_id: instance.taskId,
    status: 'PENDING_AUTHORIZATION',
    target_repositories: [],
    authorized_changes: [],
    validation_commands: [],
    authorization: null,
    evidence: [],
  };
}

export function loadImplementationControl({ root = process.cwd() } = {}) {
  const controlPath = path.join(root, CONTROL_PATH);
  const policy = JSON.parse(fs.readFileSync(controlPath, 'utf8'));
  const errors = [];
  if (Object.hasOwn(policy, 'instances')) {
    errors.push('instances no debe almacenarse dentro de implementation-control.json; use un archivo por instancia.');
  }
  if (policy.instance_storage_mode !== 'ONE_FILE_PER_INSTANCE') {
    errors.push('instance_storage_mode debe ser ONE_FILE_PER_INSTANCE.');
  }
  if (policy.instance_records_directory !== INSTANCE_RECORDS_DIRECTORY) {
    errors.push(`instance_records_directory debe ser ${INSTANCE_RECORDS_DIRECTORY}.`);
  }
  if (errors.length > 0) fail(errors);

  const directoryPath = path.join(root, INSTANCE_RECORDS_DIRECTORY);
  const files = fs.existsSync(directoryPath)
    ? fs.readdirSync(directoryPath, { withFileTypes: true })
      .filter((entry) => entry.isFile() && entry.name.endsWith('.json'))
      .map((entry) => entry.name)
      .sort((left, right) => left.localeCompare(right, 'en'))
    : [];
  const instances = files.map((filename) => {
    const record = JSON.parse(fs.readFileSync(path.join(directoryPath, filename), 'utf8'));
    const expectedPath = instanceRecordRelativePath(record.instance_id);
    const actualPath = `${INSTANCE_RECORDS_DIRECTORY}/${filename}`;
    if (actualPath !== expectedPath) {
      fail([`${actualPath} debe llamarse ${expectedPath} según instance_id.`]);
    }
    return record;
  });
  return { ...policy, instances };
}

function matchesLifecycle(instanceId, taskId, lifecycle) {
  const escaped = taskId.replace(/[.*+?^${}()|[\]\\]/gu, '\\$&');
  if (lifecycle.mode === 'GLOBAL_ENABLE_ONCE') return instanceId === `${taskId}::GLOBAL`;
  if (lifecycle.mode === 'GLOBAL_FINAL') return instanceId === `${taskId}::GLOBAL-FINAL`;
  if (lifecycle.mode === 'TEMPLATE_PER_PACKAGE' || lifecycle.mode === 'PER_IMPLEMENTATION_UNIT') {
    return new RegExp(`^${escaped}::(?!GLOBAL(?:-FINAL)?$)[A-Za-z0-9][A-Za-z0-9._-]*$`, 'u').test(instanceId);
  }
  if (lifecycle.mode === 'PER_PACKAGE_AND_GLOBAL_FINAL') {
    return instanceId === `${taskId}::GLOBAL-FINAL`
      || new RegExp(`^${escaped}::(?!GLOBAL$)[A-Za-z0-9][A-Za-z0-9._-]*$`, 'u').test(instanceId);
  }
  return false;
}

export function validateImplementationControl(control, workTopology) {
  const errors = [];
  if (control?.schema_version !== 1) errors.push('schema_version debe ser 1.');
  if (control?.authorization_mode !== 'EXPLICIT_PER_INSTANCE') {
    errors.push('authorization_mode debe ser EXPLICIT_PER_INSTANCE.');
  }
  if (control?.automatic_authorization !== false) errors.push('automatic_authorization debe ser false.');
  if (control?.single_primary_action !== false) errors.push('single_primary_action debe ser false.');
  if (control?.instance_storage_mode !== 'ONE_FILE_PER_INSTANCE') {
    errors.push('instance_storage_mode debe ser ONE_FILE_PER_INSTANCE.');
  }
  if (control?.instance_records_directory !== INSTANCE_RECORDS_DIRECTORY) {
    errors.push(`instance_records_directory debe ser ${INSTANCE_RECORDS_DIRECTORY}.`);
  }
  if (control?.instance_history_mode !== 'APPEND_ONLY_LEDGER') {
    errors.push('instance_history_mode debe ser APPEND_ONLY_LEDGER.');
  }
  if (control?.verified_instances_immutable !== true) {
    errors.push('verified_instances_immutable debe ser true.');
  }
  const operatorPolicy = control?.execution_operator_policy;
  if (!operatorPolicy || typeof operatorPolicy !== 'object' || Array.isArray(operatorPolicy)) {
    errors.push('execution_operator_policy debe ser un objeto.');
  } else {
    if (operatorPolicy.default_operator !== 'HUMAN_USER') {
      errors.push('execution_operator_policy.default_operator debe ser HUMAN_USER.');
    }
    if (operatorPolicy.interaction_mode !== 'CONTINUOUS_BATCH_UNTIL_EVIDENCE_GATE') {
      errors.push(
        'execution_operator_policy.interaction_mode debe ser CONTINUOUS_BATCH_UNTIL_EVIDENCE_GATE.',
      );
    }
    for (const field of [
      'assistant_repository_writes',
      'assistant_validation_execution',
      'assistant_git_operations',
      'assistant_remote_mutations',
    ]) {
      if (operatorPolicy[field] !== false) {
        errors.push(`execution_operator_policy.${field} debe ser false.`);
      }
    }
    if (operatorPolicy.assistant_read_only_audit !== true) {
      errors.push('execution_operator_policy.assistant_read_only_audit debe ser true.');
    }
    if (operatorPolicy.pause_only_when_next_step_depends_on_evidence !== true) {
      errors.push(
        'execution_operator_policy.pause_only_when_next_step_depends_on_evidence debe ser true.',
      );
    }
    if (operatorPolicy.evidence_reply_prefix !== 'RESULTADO DEL PASO ') {
      errors.push('execution_operator_policy.evidence_reply_prefix no coincide con el contrato.');
    }
    if (operatorPolicy.assisted_execution_authorization_prefix
      !== 'AUTORIZO EJECUCION ASISTIDA DEL PASO ') {
      errors.push(
        'execution_operator_policy.assisted_execution_authorization_prefix no coincide con el contrato.',
      );
    }
  }
  if (!Array.isArray(control?.instance_statuses) || control.instance_statuses.length === 0) {
    errors.push('instance_statuses debe ser un arreglo no vacío.');
  }
  const configuredStatuses = new Set(control?.instance_statuses ?? []);
  for (const status of EXPLICIT_STATUSES) {
    if (!configuredStatuses.has(status)) errors.push(`falta el estado explícito ${status}.`);
  }
  if (!Array.isArray(control?.instances)) errors.push('instances debe ser un arreglo.');

  const seen = new Set();
  for (const entry of control?.instances ?? []) {
    if (!entry || typeof entry !== 'object') {
      errors.push('cada instancia debe ser un objeto.');
      continue;
    }
    if (typeof entry.instance_id !== 'string' || entry.instance_id.length === 0) {
      errors.push('cada instancia debe declarar instance_id.');
      continue;
    }
    if (seen.has(entry.instance_id)) errors.push(`${entry.instance_id} está duplicada.`);
    seen.add(entry.instance_id);
    const task = workTopology.inventory.get(entry.task_id);
    const lifecycle = workTopology.topology.get(entry.task_id);
    if (!task || !lifecycle) {
      errors.push(`${entry.instance_id} referencia la tarea desconocida ${entry.task_id ?? 'VACÍA'}.`);
      continue;
    }
    if (stateFromMarker(task.marker) !== 'APROBADA') {
      errors.push(`${entry.instance_id} no puede existir físicamente porque ${entry.task_id} no está aprobada.`);
    }
    if (!matchesLifecycle(entry.instance_id, entry.task_id, lifecycle)) {
      errors.push(`${entry.instance_id} no coincide con la topología ${lifecycle.mode} de ${entry.task_id}.`);
    }
    if (!configuredStatuses.has(entry.status)) {
      errors.push(`${entry.instance_id} usa el estado no permitido ${entry.status ?? 'VACÍO'}.`);
    }
    if (AUTHORIZED_LIFECYCLE_STATUSES.has(entry.status)) {
      if (!Array.isArray(entry.target_repositories) || entry.target_repositories.length === 0) {
        errors.push(`${entry.instance_id} debe declarar target_repositories antes de ${entry.status}.`);
      }
      if (!Array.isArray(entry.authorized_changes) || entry.authorized_changes.length === 0) {
        errors.push(`${entry.instance_id} debe declarar authorized_changes antes de ${entry.status}.`);
      }
      if (!Array.isArray(entry.validation_commands) || entry.validation_commands.length === 0) {
        errors.push(`${entry.instance_id} debe declarar validation_commands antes de ${entry.status}.`);
      }
      if (
        entry.task_id === 'SHELL-CI-020'
        && /^SHELL-CI-020::GAP-PKG-\d{3}$/u.test(entry.instance_id)
        && !completeTargetEnvironments(entry.target_environments)
      ) {
        errors.push(`${entry.instance_id} debe declarar target_environments completos antes de ${entry.status}.`);
      }
      const authorization = entry.authorization;
      if (!authorization || typeof authorization !== 'object' || Array.isArray(authorization)) {
        errors.push(`${entry.instance_id} debe conservar authorization como evidencia humana antes de ${entry.status}.`);
      } else {
        if (authorization.decision !== 'APPROVED') {
          errors.push(`${entry.instance_id} debe declarar authorization.decision = APPROVED.`);
        }
        if (!String(authorization.approved_by ?? '').trim()) {
          errors.push(`${entry.instance_id} debe declarar authorization.approved_by.`);
        }
        if (!/^\d{4}-\d{2}-\d{2}(?:T\d{2}:\d{2}(?::\d{2}(?:\.\d{3})?)?(?:Z|[+-]\d{2}:\d{2})?)?$/u.test(
          String(authorization.approved_at ?? ''),
        )) {
          errors.push(`${entry.instance_id} debe declarar authorization.approved_at como fecha ISO concreta.`);
        }
        if (!String(authorization.timezone ?? '').trim()) {
          errors.push(`${entry.instance_id} debe declarar authorization.timezone.`);
        }
        if (!String(authorization.approval_statement ?? '').trim()) {
          errors.push(`${entry.instance_id} debe declarar authorization.approval_statement.`);
        }
        if (!/^[a-f0-9]{64}$/iu.test(String(authorization.source_contract_sha256 ?? ''))) {
          errors.push(`${entry.instance_id} debe declarar authorization.source_contract_sha256 válido.`);
        }
        if (authorization.proposal_response_sha256 !== undefined
          && !/^[a-f0-9]{64}$/iu.test(String(authorization.proposal_response_sha256))) {
          errors.push(`${entry.instance_id} declara authorization.proposal_response_sha256 inválido.`);
        }
      }
      if (!Array.isArray(entry.evidence)) {
        errors.push(`${entry.instance_id} debe declarar evidence como arreglo antes de ${entry.status}.`);
      }
      if (lifecycle.mode !== 'GLOBAL_ENABLE_ONCE'
        && (!Array.isArray(entry.prerequisite_evidence) || entry.prerequisite_evidence.length === 0)) {
        errors.push(`${entry.instance_id} debe declarar prerequisite_evidence para demostrar sus gates antes de ${entry.status}.`);
      }
    }
    if (entry.status === 'BLOCKED' && !String(entry.blocker ?? '').trim()) {
      errors.push(`${entry.instance_id} está BLOCKED sin blocker concreto.`);
    }
    if (['IMPLEMENTED', 'VERIFIED'].includes(entry.status)
      && (!Array.isArray(entry.evidence) || entry.evidence.length === 0)) {
      errors.push(`${entry.instance_id} declara ${entry.status} sin evidencia.`);
    }
  }
  if (errors.length > 0) fail(errors);
  return control;
}

// C6_EFFECTIVE_STATE_PROJECTION
const EFFECTIVE_STATE_PROJECTABLE_STATUSES = new Set([
  'PENDING_AUTHORIZATION',
  'AUTHORIZED',
  'IN_PROGRESS',
  'IMPLEMENTED',
  'VERIFIED',
]);

export function projectImplementationControlEffectiveState({
  root = process.cwd(),
  instance,
  stateIntegrityAssessor = assessImplementationStateIntegrity,
} = {}) {
  if (!instance || typeof instance !== 'object') return instance;
  const record = instance.record ?? null;
  const declaredStatus = String(record?.status ?? instance.status ?? '').trim().toUpperCase();
  const fallbackStatus = String(instance.status ?? declaredStatus).trim().toUpperCase();
  if (!record || !EFFECTIVE_STATE_PROJECTABLE_STATUSES.has(declaredStatus)
    || typeof stateIntegrityAssessor !== 'function') {
    return {
      ...instance,
      declaredStatus,
      effectiveStatus: fallbackStatus,
      stateIntegrity: null,
      stateIntegrityRecoveryRequired: false,
      recoveryAction: null,
    };
  }
  const integrity = stateIntegrityAssessor({ root, instance: record });
  const effectiveStatus = integrity.status_valid
    ? integrity.declared_status
    : integrity.highest_valid_status;
  return {
    ...instance,
    status: effectiveStatus,
    declaredStatus: integrity.declared_status,
    effectiveStatus,
    stateIntegrity: integrity,
    stateIntegrityRecoveryRequired: integrity.status_valid === false,
    recoveryAction: integrity.recovery_action ?? null,
  };
}

export function deriveImplementationControl({
  root = process.cwd(),
  control: suppliedControl = null,
  workTopology: suppliedTopology = null,
  preflight: suppliedPreflight = null,
  packageExecution: suppliedPackageExecution = undefined,
  stateIntegrityAssessor: suppliedStateIntegrityAssessor = undefined,
} = {}) {
  const workTopology = suppliedTopology ?? resolveTaskWorkTopology({ root });
  const control = validateImplementationControl(
    suppliedControl ?? loadImplementationControl({ root }),
    workTopology,
  );
  const packageExecution = suppliedPackageExecution !== undefined
    ? suppliedPackageExecution
    : suppliedControl
      ? null
      : scanPackageReadiness({
        root,
        trigger: 'implementation-control',
        supplied: { skipDerivedReports: true },
      }).registry.package_execution;
  const operatorPolicy = control.execution_operator_policy;
  const currentTask = workTopology.inventory.get(workTopology.currentId);
  if (!suppliedPreflight && !currentTask) {
    throw new Error('no se pudo resolver la tarea documental actual para el control de implementación.');
  }
  const preflight = suppliedPreflight ?? {
    task: {
      id: currentTask.id,
      title: currentTask.title,
      owner: currentTask.relativePath,
    },
  };
  const explicitById = new Map(control.instances.map((entry) => [entry.instance_id, entry]));
  const globalCandidates = workTopology.ordered
    .filter((task) => stateFromMarker(task.marker) === 'APROBADA')
    .map((task) => ({ task, lifecycle: workTopology.topology.get(task.id) }))
    .filter(({ lifecycle }) => lifecycle?.mode === 'GLOBAL_ENABLE_ONCE')
    .map(({ task, lifecycle }) => {
      const instanceId = expectedInstancePattern(task.id, lifecycle);
      const explicit = explicitById.get(instanceId);
      return {
        instanceId,
        recordPath: instanceRecordRelativePath(instanceId),
        taskId: task.id,
        taskTitle: task.title,
        lifecycleMode: lifecycle.mode,
        status: explicit?.status ?? 'READY_FOR_AUTHORIZATION',
        source: explicit ? 'EXPLICIT' : 'DERIVED_FROM_APPROVED_CONTRACT',
        record: explicit ?? null,
        targetRepositories: explicit?.target_repositories ?? [],
        authorizedChanges: explicit?.authorized_changes ?? [],
        validationCommands: explicit?.validation_commands ?? [],
        targetEnvironments: explicit?.target_environments ?? [],
        evidence: explicit?.evidence ?? [],
        blocker: explicit?.blocker ?? null,
      };
    });

  const packageExecutionEntries = [
    ...(packageExecution?.active_physical ?? []),
    ...(packageExecution?.current?.next_action?.type === 'CONTINUE_PHYSICAL_LIFECYCLE'
      ? [packageExecution.current]
      : []),
  ];
  const seenPackageEntries = new Set();
  const packageCandidates = packageExecutionEntries
    .filter((entry) => {
      const key = `${entry?.package_id ?? ''}::${entry?.next_action?.target ?? ''}`;
      if (!entry || seenPackageEntries.has(key)) return false;
      seenPackageEntries.add(key);
      return true;
    })
    .map((executionEntry) => derivePackageLifecycleCandidate({
      packageExecution,
      executionEntry,
      workTopology,
      explicitById,
    }))
    .filter(Boolean);
  const candidateIds = new Set(
    [...globalCandidates, ...packageCandidates].map(({ instanceId }) => instanceId),
  );
  const explicitOther = control.instances
    .filter((entry) => !candidateIds.has(entry.instance_id))
    .map((entry) => {
      const task = workTopology.inventory.get(entry.task_id);
      const lifecycle = workTopology.topology.get(entry.task_id);
      return {
        instanceId: entry.instance_id,
        recordPath: instanceRecordRelativePath(entry.instance_id),
        taskId: entry.task_id,
        taskTitle: task.title,
        lifecycleMode: lifecycle.mode,
        status: entry.status,
        source: 'EXPLICIT',
        record: entry,
        targetRepositories: entry.target_repositories ?? [],
        authorizedChanges: entry.authorized_changes ?? [],
        validationCommands: entry.validation_commands ?? [],
        targetEnvironments: entry.target_environments ?? [],
        evidence: entry.evidence ?? [],
        blocker: entry.blocker ?? null,
      };
    });
  const instances = [...globalCandidates, ...packageCandidates, ...explicitOther];
  const stateIntegrityAssessor = suppliedStateIntegrityAssessor === null
    ? null
    : suppliedStateIntegrityAssessor
      ?? (suppliedControl ? null : assessImplementationStateIntegrity);
  for (const instance of instances) {
    Object.assign(instance, projectImplementationControlEffectiveState({
      root,
      instance,
      stateIntegrityAssessor,
    }));
  }
  const currentPackageWork = packageExecution?.current_work ?? packageExecution?.current?.current_work ?? null;
  let packagePrerequisiteAction = null;

  if (['FOUNDATION_GATE', 'PHYSICAL_PREREQUISITE'].includes(currentPackageWork?.kind)) {
    const consumerPackageId = String(currentPackageWork.consumer_package_id ?? '').trim();
    const consumerInstanceId = consumerPackageId ? `SHELL-CI-020::${consumerPackageId}` : null;
    const consumerInstance = consumerInstanceId
      ? instances.find(({ instanceId }) => instanceId === consumerInstanceId) ?? null
      : null;

    // C6_PERSISTED_TOPOLOGICAL_INTEGRITY_RECOVERY
    if (consumerInstance && ['AUTHORIZED', 'IN_PROGRESS', 'IMPLEMENTED'].includes(consumerInstance.status)) {
      const blockedStatus = currentPackageWork.kind === 'FOUNDATION_GATE'
        ? 'WAITING_FOR_FOUNDATION_PREREQUISITE'
        : 'WAITING_FOR_PHYSICAL_PREREQUISITE';
      const blocker = `${consumerPackageId} debe cerrar primero ${currentPackageWork.id}${currentPackageWork.gate_id ? ` / ${currentPackageWork.gate_id}` : ''}.`;
      if (suppliedControl) {
        fail([`${consumerInstanceId} no puede estar ${consumerInstance.status} mientras ${currentPackageWork.id} sigue pendiente.`]);
      }
      const recoveryAction = `WAIT_FOR_${currentPackageWork.kind}:${currentPackageWork.id}`;
      consumerInstance.declaredStatus = consumerInstance.declaredStatus
        ?? consumerInstance.record?.status
        ?? consumerInstance.status;
      consumerInstance.status = blockedStatus;
      consumerInstance.effectiveStatus = blockedStatus;
      consumerInstance.stateIntegrityRecoveryRequired = true;
      consumerInstance.recoveryAction = recoveryAction;
      consumerInstance.blocker = blocker;
      consumerInstance.stateIntegrity = {
        ...(consumerInstance.stateIntegrity ?? {}),
        status_valid: false,
        topology_valid: false,
        topology_blocker: currentPackageWork.id,
        recovery_action: recoveryAction,
      };
    }

    if (consumerInstance && ['PENDING_AUTHORIZATION', 'READY_FOR_AUTHORIZATION'].includes(consumerInstance.status)) {
      consumerInstance.status = currentPackageWork.kind === 'FOUNDATION_GATE'
        ? 'WAITING_FOR_FOUNDATION_PREREQUISITE'
        : 'WAITING_FOR_PHYSICAL_PREREQUISITE';
      consumerInstance.blocker = `${consumerPackageId} debe cerrar primero ${currentPackageWork.id}${currentPackageWork.gate_id ? ` / ${currentPackageWork.gate_id}` : ''}.`;
    }

    const packageAction = packageExecution?.current?.next_action ?? null;
    packagePrerequisiteAction = {
      type: currentPackageWork.kind === 'FOUNDATION_GATE'
        ? 'WAIT_FOR_FOUNDATION_PREREQUISITE'
        : 'WAIT_FOR_PHYSICAL_PREREQUISITE',
      target: currentPackageWork.id,
      title: currentPackageWork.gate_id
        ? `${currentPackageWork.gate_id} — ${currentPackageWork.owner_task ?? currentPackageWork.id}`
        : currentPackageWork.id,
      instruction: packageAction?.command
        ? `Resolver ${currentPackageWork.id} antes de autorizar ${consumerInstanceId ?? consumerPackageId}; comprobar con ${packageAction.command}.`
        : `Resolver ${currentPackageWork.id} antes de autorizar ${consumerInstanceId ?? consumerPackageId}.`,
      why: packageAction?.reason
        ?? `${consumerPackageId || 'El package consumidor'} conserva el turno, pero su primer prerrequisito físico no está PASS.`,
    };
  }

  let unfinishedGlobal = null;
  for (const instance of globalCandidates) {
    if (
      unfinishedGlobal
      && ['READY_FOR_AUTHORIZATION', 'PENDING_AUTHORIZATION'].includes(instance.status)
    ) {
      instance.status = 'WAITING_FOR_PREVIOUS_INSTANCE';
      instance.blocker = `Debe verificarse primero ${unfinishedGlobal.instanceId}.`;
    }
    if (!['VERIFIED', 'DEFERRED'].includes(instance.status) && !unfinishedGlobal) unfinishedGlobal = instance;
  }

  const illegalParallel = globalCandidates.filter((instance) => (
    ['AUTHORIZED', 'IN_PROGRESS', 'IMPLEMENTED'].includes(instance.status)
    && unfinishedGlobal
    && instance.instanceId !== unfinishedGlobal.instanceId
  ));
  if (illegalParallel.length > 0) {
    if (suppliedControl) {
      fail(illegalParallel.map((instance) => (
        `${instance.instanceId} no puede estar ${instance.status} antes de verificar ${unfinishedGlobal.instanceId}.`
      )));
    }
    for (const instance of illegalParallel) {
      const blocker = `Debe verificarse primero ${unfinishedGlobal.instanceId}.`;
      const recoveryAction = `WAIT_FOR_PREVIOUS_INSTANCE:${unfinishedGlobal.instanceId}`;
      instance.declaredStatus = instance.declaredStatus ?? instance.record?.status ?? instance.status;
      instance.status = 'WAITING_FOR_PREVIOUS_INSTANCE';
      instance.effectiveStatus = 'WAITING_FOR_PREVIOUS_INSTANCE';
      instance.stateIntegrityRecoveryRequired = true;
      instance.recoveryAction = recoveryAction;
      instance.blocker = blocker;
      instance.stateIntegrity = {
        ...(instance.stateIntegrity ?? {}),
        status_valid: false,
        topology_valid: false,
        topology_blocker: unfinishedGlobal.instanceId,
        recovery_action: recoveryAction,
      };
    }
  }

  const actionByStatus = new Map([
    ['IN_PROGRESS', 'EJECUTAR_IMPLEMENTACION'],
    ['IMPLEMENTED', 'EJECUTAR_IMPLEMENTACION'],
    ['AUTHORIZED', 'EJECUTAR_IMPLEMENTACION'],
    ['PENDING_AUTHORIZATION', 'AUTORIZAR_IMPLEMENTACION'],
    ['READY_FOR_AUTHORIZATION', 'AUTORIZAR_IMPLEMENTACION'],
    ['BLOCKED', 'RESOLVER_BLOQUEO'],
  ]);
  const statusRank = new Map([
    ['IN_PROGRESS', 0],
    ['IMPLEMENTED', 1],
    ['AUTHORIZED', 2],
    ['PENDING_AUTHORIZATION', 3],
    ['READY_FOR_AUTHORIZATION', 4],
    ['BLOCKED', 5],
  ]);
  const physicalStageRank = (instance) => {
    const match = /^SHELL-CI-(02[0-4])::/u.exec(String(instance?.instanceId ?? ''));
    return match ? Number(match[1]) - 20 : 100;
  };
  const actionableSet = instances
    .filter((instance) => instance.stateIntegrityRecoveryRequired || actionByStatus.has(instance.status))
    .sort((left, right) => (
      Number(right.stateIntegrityRecoveryRequired) - Number(left.stateIntegrityRecoveryRequired)
      || physicalStageRank(left) - physicalStageRank(right)
      || (statusRank.get(left.status) ?? 99) - (statusRank.get(right.status) ?? 99)
      || left.instanceId.localeCompare(right.instanceId, 'en')
    ));
  const actionForInstance = (instance) => {
    const integrityRecovery = instance.stateIntegrityRecoveryRequired === true;
    const type = integrityRecovery
      ? 'RECONCILE_IMPLEMENTATION_STATE_INTEGRITY'
      : actionByStatus.get(instance.status);
    return {
      type,
      target: instance.instanceId,
      title: instance.taskTitle,
      instruction: integrityRecovery
        ? `El ledger declara ${instance.declaredStatus}, pero la evidencia efectiva solo soporta ${instance.effectiveStatus}. Reconciliar según ${instance.recoveryAction ?? 'MANUAL_RECONCILIATION_REQUIRED'} antes de cualquier mutación.`
        : type === 'AUTORIZAR_IMPLEMENTACION'
          ? `Definir y aprobar el alcance físico exacto de ${instance.instanceId}; la misma entrega puede dejar preparado el lote físico condicionado a guardar primero la autorización.`
          : type === 'EJECUTAR_IMPLEMENTACION'
            ? `Reanudar ${instance.instanceId} desde ${instance.status} exclusivamente mediante ${IMPLEMENTATION_MUTATING_ENTRYPOINT}; el coordinador resuelve internamente start, preverify, repair y finish.`
            : `Guiar la resolución humana del bloqueo de ${instance.instanceId} sin ampliar el alcance.`,
      why: integrityRecovery
        ? `STATE_INTEGRITY_VIOLATION: declared=${instance.declaredStatus}; effective=${instance.effectiveStatus}.`
        : instance.blocker ?? `${instance.taskId} tiene contrato aprobado y pertenece al governed active set físico.`,
      command: integrityRecovery || type !== 'EJECUTAR_IMPLEMENTACION'
        ? null
        : `npm run ${IMPLEMENTATION_MUTATING_ENTRYPOINT} -- --instance-id ${instance.instanceId}`,
    };
  };
  const primaryActions = actionableSet.map(actionForInstance);
  const compatibilitySelected = actionableSet[0] ?? null;
  const documentary = {
    taskId: preflight.task.id,
    taskTitle: preflight.task.title,
    actionType: 'DOCUMENTAR_TAREA',
    state: 'ACTIVO',
    parallelWithPhysical: actionableSet.length > 0,
    owner: preflight.task.owner,
  };
  const primaryAction = primaryActions[0] ?? packagePrerequisiteAction ?? {
    type: documentary.actionType,
    target: documentary.taskId,
    title: documentary.taskTitle,
    instruction: `Desarrollar únicamente el contrato documental de ${documentary.taskId}; no iniciar su instancia física por inferencia.`,
    why: 'No existe una instancia física gobernada autorizada, activa, pendiente de validación o lista para autorización.',
  };
  const modeByStatus = {
    IN_PROGRESS: 'GLOBAL_IMPLEMENTATION_ACTIVE',
    AUTHORIZED: 'GLOBAL_IMPLEMENTATION_AUTHORIZED',
    IMPLEMENTED: 'GLOBAL_VALIDATION_REQUIRED',
    BLOCKED: 'IMPLEMENTATION_BLOCKED',
  };
  const mode = compatibilitySelected
    ? (compatibilitySelected.stateIntegrityRecoveryRequired
      ? 'STATE_INTEGRITY_RECOVERY_REQUIRED'
      : actionableSet.length > 1 ? 'GOVERNED_ACTIVE_SET' : modeByStatus[compatibilitySelected.status] ?? 'GLOBAL_IMPLEMENTATION_READY')
    : packagePrerequisiteAction
      ? 'IMPLEMENTATION_BLOCKED'
      : 'DOCUMENTATION_ONLY';
  const authorized = instances.filter((instance) => (
    instance.stateIntegrityRecoveryRequired !== true
    && ['AUTHORIZED', 'IN_PROGRESS', 'IMPLEMENTED'].includes(instance.status)
  ));

  return {
    schemaVersion: 1,
    mode,
    authorizationMode: control.authorization_mode,
    executionOperatorPolicy: {
      defaultOperator: operatorPolicy.default_operator,
      interactionMode: operatorPolicy.interaction_mode,
      assistantRepositoryWrites: operatorPolicy.assistant_repository_writes,
      assistantValidationExecution: operatorPolicy.assistant_validation_execution,
      assistantGitOperations: operatorPolicy.assistant_git_operations,
      assistantRemoteMutations: operatorPolicy.assistant_remote_mutations,
      assistantReadOnlyAudit: operatorPolicy.assistant_read_only_audit,
      pauseOnlyWhenNextStepDependsOnEvidence:
        operatorPolicy.pause_only_when_next_step_depends_on_evidence,
      evidenceReplyPrefix: operatorPolicy.evidence_reply_prefix,
      assistedExecutionAuthorizationPrefix: operatorPolicy.assisted_execution_authorization_prefix,
    },
    implementationAuthorized: authorized.length > 0,
    primaryAction,
    primaryActions,
    coordination: {
      mode: 'CONTROLLED_DUAL_LANE',
      documentaryConcurrency: 'ONE_ACTIVE_TASK',
      physicalConcurrency: 'GOVERNED_ACTIVE_SET',
      separateCheckoutsRequired: actionableSet.length > 0,
      mergePolicy: 'SERIALIZED_CLOSE',
      latestMainReconciliationRequired: actionableSet.length > 0,
      physicalContractFreeze: 'SOURCE_CONTRACT_SHA256',
    },
    documentary,
    physical: {
      active: compatibilitySelected,
      actionableSet,
      activeSet: instances.filter(({ status }) => ['AUTHORIZED', 'IN_PROGRESS', 'IMPLEMENTED'].includes(status)),
      activePackageSet: (packageExecution?.active_physical ?? []).map((entry) => ({
        packageId: entry.package_id,
        status: entry.status,
        nextAction: entry.next_action,
        resourceLocks: entry.resource_locks ?? [],
      })),
      instances,
      recordedInstances: control.instances,
      recordDirectory: control.instance_records_directory,
      historyMode: control.instance_history_mode,
      verifiedInstancesImmutable: control.verified_instances_immutable,
      authorized,
      readyCount: instances.filter(({ status }) => status === 'READY_FOR_AUTHORIZATION').length,
      blockedCount: instances.filter(({ status }) => (
        status === 'BLOCKED'
        || status === 'WAITING_FOR_PREVIOUS_INSTANCE'
        || status === 'WAITING_FOR_FOUNDATION_PREREQUISITE'
        || status === 'WAITING_FOR_PHYSICAL_PREREQUISITE'
      )).length,
    },
  };
}

export function renderCurrentWorkDirective(control) {
  const action = control.primaryAction;
  const governedActionRows = (control.primaryActions ?? []).length > 0
    ? control.primaryActions.map((entry) => (
      `- \`${entry.type}\` -> \`${entry.target}\` — ${markdown(entry.title)} — COMMAND=\`${entry.command ?? 'NONE'}\``
    )).join('\n')
    : '- NINGUNA';
  const physicalRows = control.physical.instances.length > 0
    ? control.physical.instances.map((instance) => (
      `| \`${instance.instanceId}\` | ${markdown(instance.taskTitle)} | ${instance.declaredStatus ?? instance.record?.status ?? instance.status} | ${instance.effectiveStatus ?? instance.status} | ${instance.stateIntegrity ? (instance.stateIntegrity.status_valid ? 'VALID' : 'INVALID') : 'N/A'} | ${markdown(instance.recoveryAction ?? instance.blocker)} |`
    )).join('\n')
    : '| — | — | — | SIN_INSTANCIAS | N/A | — |';
  const allowed = control.physical.authorized.length > 0
    ? control.physical.authorized.map(({ instanceId }) => `\`${instanceId}\``).join(', ')
    : 'NINGUNO';
  return `# QUÉ TOCA HACER AHORA — VENTO OS

> Derivado automáticamente de la continuidad, la topología y las autorizaciones
> explícitas. No edites este archivo ni ejecutes una instancia distinta de la indicada.

## Acción principal obligatoria

- **Acción:** \`${action.type}\`
- **Objetivo exacto:** \`${action.target}\` — ${action.title}
- **Instrucción:** ${action.instruction}
- **Por qué:** ${action.why}
- **Entrada mutante normal:** \`${IMPLEMENTATION_MUTATING_ENTRYPOINT}\`
- **Comando exacto:** \`${action.command ?? 'NINGUNO_HASTA_RECONCILIAR_O_AUTORIZAR'}\`
- **Direct lifecycle entrypoints:** \`DISABLED_AS_NORMAL_ENTRYPOINTS\`
- **Implementación física autorizada ahora:** ${allowed}\n- **Acciones físicas gobernadas:**\n${governedActionRows}

## Operador de ejecución

- **Operador predeterminado:** USUARIO HUMANO
- **Modo:** TRANSACCIÓN CONTINUA HASTA BLOQUEO REAL
- **Escrituras del asistente:** PROHIBIDAS POR DEFECTO
- **Ejecución de validaciones por el asistente:** PROHIBIDA POR DEFECTO
- **Git, GitHub y mutaciones remotas del asistente:** PROHIBIDAS POR DEFECTO
- **Pausa:** solo cuando un comando fail-fast falla, existe una contradicción real o el siguiente paso requiere una decisión o permiso todavía desconocido
- **Preflight PASS:** continúa localmente; no requiere volver al chat
- **Batería final PASS:** continúa dentro de la misma transacción; si el contrato exige evidencia remota, completa commit/push de materialización y validación remota antes de VERIFIED
- **Respuesta en una pausa real:** \`RESULTADO DEL PASO N\` seguida de la evidencia solicitada
- **Excepción limitada:** solo \`AUTORIZO EJECUCION ASISTIDA DEL PASO N\` autoriza ese paso numerado; después vuelve el modo manual.

## Carril documental

- **Estado:** ${control.documentary.state}
- **Tarea:** \`${control.documentary.taskId}\` — ${control.documentary.taskTitle}
- **Archivo propietario:** \`${control.documentary.owner}\`
- **Paralelismo con carril físico:** ${control.documentary.parallelWithPhysical ? 'ACTIVO — usar checkout independiente' : 'NO NECESARIO'}

## Carril físico

| Instancia | Contrato | Estado declarado | Estado efectivo | Integridad | Recovery / bloqueo |
| --- | --- | --- | --- | --- | --- |
${physicalRows}

## Coordinación de carriles

- **Modo:** \`${control.coordination.mode}\`
- **Documentación:** máximo una tarea activa
- **Implementación física:** governed active set; varias instancias independientes pueden permanecer en curso cuando sus dependencias y resource locks lo permiten
- **Checkouts separados cuando ambos carriles están activos:** ${control.coordination.separateCheckoutsRequired ? 'SÍ' : 'NO NECESARIO'}
- **Cierre:** serializado; solo un carril mergea a la vez
- **Segundo carril en cerrar:** debe reconciliar el \`main\` más reciente antes de su validación y cierre final
- **Contrato físico en vuelo:** congelado por \`source_contract_sha256\`

## Regla operativa

1. El carril documental conserva una sola tarea activa; el carril físico puede mantener un governed active set de instancias independientes, cada una en su checkout, sujeto a dependencias, autorización y resource locks.
2. Aprobar un marcador documental crea elegibilidad, nunca autorización física automática.
3. Código, migraciones, Supabase, despliegues o cambios remotos requieren una instancia explícitamente \`AUTHORIZED\`.
4. \`AUTHORIZED\` habilita el trabajo físico, pero no concede al asistente permiso para escribirlo.
5. La única entrada mutante normal del carril físico es \`docs:implementation:advance\`; el coordinador abre o reanuda el lifecycle según el estado efectivo y nunca por el status bruto imposible.
6. Un PASS local continúa por el mismo coordinador; solo FAIL, autorización humana pendiente o evidencia externa real producen una pausa.
7. \`start\`, \`preverify\` y \`finish\` permanecen fail-closed como entradas directas normales y solo pueden ser invocados internamente por el coordinador; repair y validación se sellan por fingerprint exacto del candidato.
8. La siguiente instancia global espera la verificación de la anterior; no se concilia trabajo duplicado al final.
9. Los cierres y merges de los dos carriles se serializan. El segundo carril debe incorporar el \`main\` resultante del primero y repetir las validaciones finales sobre esa base.
10. “Haz la acción principal” inicia la guía manual continua del carril correspondiente; nunca autoriza escrituras automáticas ni suspende el otro carril.
`;
}

export function ensurePendingImplementationRecord({ root, control, check = false }) {
  const actionableSet = Array.isArray(control.physical?.actionableSet)
    && control.physical.actionableSet.length > 0
    ? control.physical.actionableSet
    : control.physical?.active ? [control.physical.active] : [];
  const candidates = actionableSet.filter((instance) => (
    instance?.source === 'DERIVED_FROM_APPROVED_CONTRACT'
    && (instance.status === 'READY_FOR_AUTHORIZATION'
      || (!instance.status && control.primaryAction?.type === 'AUTORIZAR_IMPLEMENTACION'))
  ));
  if (candidates.length === 0) return false;
  for (const active of candidates) {
    const recordPath = path.join(root, active.recordPath);
    if (fs.existsSync(recordPath)) continue;
    if (check) {
      throw new Error(
        `${active.recordPath} falta; ejecute docs:plan:build para crear automáticamente el borrador.`,
      );
    }
    fs.mkdirSync(path.dirname(recordPath), { recursive: true });
    fs.writeFileSync(
      recordPath,
      `${JSON.stringify(pendingInstanceRecord(active), null, 2)}\n`,
      { encoding: 'utf8', flag: 'wx' },
    );
    console.log(`[PLAN CANÓNICO] Borrador de instancia creado automáticamente: ${active.recordPath}.`);
  }
  return true;
}
export function writeImplementationControlArtifacts({
  root = process.cwd(),
  check = false,
  materializePendingRecord = true,
} = {}) {
  let control = deriveImplementationControl({ root });
  if (
    materializePendingRecord
    && ensurePendingImplementationRecord({ root, control, check })
  ) {
    control = deriveImplementationControl({ root });
  }
  const markdown = renderCurrentWorkDirective(control);
  const status = `${JSON.stringify(control, null, 2)}\n`;
  const outputs = [
    [path.join(root, OUTPUT_PATH), markdown],
    [path.join(root, STATUS_OUTPUT_PATH), status],
  ];
  const changed = outputs.filter(([filePath, source]) => (
    !fs.existsSync(filePath) || fs.readFileSync(filePath, 'utf8') !== source
  ));
  const staleExisting = changed.filter(([filePath]) => fs.existsSync(filePath));
  if (check && staleExisting.length > 0) {
    throw new Error(`artefactos de control desactualizados: ${staleExisting.map(([filePath]) => path.relative(root, filePath)).join(', ')}.`);
  }
  if (!check) {
    for (const [filePath, source] of changed) {
      fs.mkdirSync(path.dirname(filePath), { recursive: true });
      fs.writeFileSync(filePath, source, 'utf8');
    }
  }
  return { control, changed: changed.length > 0 };
}

function main() {
  const unknown = process.argv.slice(2).filter((argument) => argument !== '--check');
  if (unknown.length > 0) throw new Error(`argumentos desconocidos: ${unknown.join(', ')}.`);
  const result = writeImplementationControlArtifacts({ check: process.argv.includes('--check') });
  console.log(
    `OK: control de implementación ${result.changed ? 'actualizado' : 'vigente'}; `
    + `${result.control.primaryAction.type} ${result.control.primaryAction.target}.`,
  );
}

const isCli = process.argv[1]
  && path.resolve(process.argv[1]) === path.resolve(fileURLToPath(import.meta.url));

if (isCli) {
  try {
    main();
  } catch (error) {
    console.error(`ERROR: ${error instanceof Error ? error.message : String(error)}`);
    process.exit(1);
  }
}
