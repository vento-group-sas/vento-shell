import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

import { resolveTaskWorkTopology } from './task-work-topology.mjs';
import { scanPackageReadiness } from './package-readiness-scanner.mjs';

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

export function derivePackageLifecycleCandidate({ packageExecution, workTopology, explicitById }) {
  const action = packageExecution?.current?.next_action ?? null;
  if (action?.type !== 'CONTINUE_PHYSICAL_LIFECYCLE') return null;

  const instanceId = String(action.target ?? '').trim();
  const match = /^(SHELL-CI-02[1-4])::(GAP-PKG-\d{3})$/u.exec(instanceId);
  if (!match) return null;

  const taskId = match[1];
  const packageId = match[2];
  if (String(packageExecution?.current?.package_id ?? '').trim() !== packageId) {
    fail([`${instanceId} no pertenece al package actual ${packageExecution?.current?.package_id ?? 'NONE'}.`]);
  }

  const task = workTopology.inventory.get(taskId) ?? null;
  const lifecycle = workTopology.topology.get(taskId) ?? null;
  if (!task || stateFromMarker(task.marker) !== 'APROBADA') {
    fail([`${taskId} debe existir y estar APROBADA para derivar ${instanceId}.`]);
  }
  if (lifecycle?.mode !== 'TEMPLATE_PER_PACKAGE') {
    fail([`${taskId} debe conservar topología TEMPLATE_PER_PACKAGE; actual ${lifecycle?.mode ?? 'NONE'}.`]);
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
  if (control?.single_primary_action !== true) errors.push('single_primary_action debe ser true.');
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

export function deriveImplementationControl({
  root = process.cwd(),
  control: suppliedControl = null,
  workTopology: suppliedTopology = null,
  preflight: suppliedPreflight = null,
  packageExecution: suppliedPackageExecution = undefined,
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

  const packageCandidate = derivePackageLifecycleCandidate({
    packageExecution,
    workTopology,
    explicitById,
  });
  const packageCandidates = packageCandidate ? [packageCandidate] : [];
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
  const currentPackageWork = packageExecution?.current_work ?? packageExecution?.current?.current_work ?? null;
  let packagePrerequisiteAction = null;

  if (['FOUNDATION_GATE', 'PHYSICAL_PREREQUISITE'].includes(currentPackageWork?.kind)) {
    const consumerPackageId = String(currentPackageWork.consumer_package_id ?? '').trim();
    const consumerInstanceId = consumerPackageId ? `SHELL-CI-020::${consumerPackageId}` : null;
    const consumerInstance = consumerInstanceId
      ? instances.find(({ instanceId }) => instanceId === consumerInstanceId) ?? null
      : null;

    if (consumerInstance && ['AUTHORIZED', 'IN_PROGRESS', 'IMPLEMENTED'].includes(consumerInstance.status)) {
      fail([`${consumerInstanceId} no puede estar ${consumerInstance.status} mientras ${currentPackageWork.id} sigue pendiente.`]);
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
    fail(illegalParallel.map((instance) => (
      `${instance.instanceId} no puede estar ${instance.status} antes de verificar ${unfinishedGlobal.instanceId}.`
    )));
  }

  const priority = [
    ['IN_PROGRESS', 'EJECUTAR_IMPLEMENTACION'],
    ['IMPLEMENTED', 'EJECUTAR_IMPLEMENTACION'],
    ['AUTHORIZED', 'EJECUTAR_IMPLEMENTACION'],
    ['PENDING_AUTHORIZATION', 'AUTORIZAR_IMPLEMENTACION'],
    ['READY_FOR_AUTHORIZATION', 'AUTORIZAR_IMPLEMENTACION'],
    ['BLOCKED', 'RESOLVER_BLOQUEO'],
  ];
  let selected = null;
  let actionType = null;
  for (const [status, action] of priority) {
    selected = instances.find((instance) => instance.status === status) ?? null;
    if (selected) {
      actionType = action;
      break;
    }
  }

  const documentary = {
    taskId: preflight.task.id,
    taskTitle: preflight.task.title,
    actionType: 'DOCUMENTAR_TAREA',
    state: 'ACTIVO',
    parallelWithPhysical: Boolean(selected),
    owner: preflight.task.owner,
  };
  const primaryAction = packagePrerequisiteAction ?? (selected ? {
    type: actionType,
    target: selected.instanceId,
    title: selected.taskTitle,
    instruction: actionType === 'AUTORIZAR_IMPLEMENTACION'
      ? `Definir y aprobar el alcance físico exacto de ${selected.instanceId}; la misma entrega puede dejar preparado el lote físico condicionado a guardar primero la autorización.`
      : actionType === 'EJECUTAR_IMPLEMENTACION'
        ? `Ejecutar la transacción humana continua de ${selected.instanceId} desde ${selected.status} hasta VERIFIED; detenerse solo ante bloqueo real o fallo.`
        : `Guiar la resolución humana del bloqueo de ${selected.instanceId} sin ampliar el alcance.`,
    why: selected.blocker ?? `${selected.taskId} tiene contrato aprobado y es la primera instancia física global sin verificar.`,
  } : {
    type: documentary.actionType,
    target: documentary.taskId,
    title: documentary.taskTitle,
    instruction: `Desarrollar únicamente el contrato documental de ${documentary.taskId}; no iniciar su instancia física por inferencia.`,
    why: 'No existe una instancia física autorizada, activa, pendiente de validación o lista para autorización.',
  });

  const modeByStatus = {
    IN_PROGRESS: 'GLOBAL_IMPLEMENTATION_ACTIVE',
    AUTHORIZED: 'GLOBAL_IMPLEMENTATION_AUTHORIZED',
    IMPLEMENTED: 'GLOBAL_VALIDATION_REQUIRED',
    BLOCKED: 'IMPLEMENTATION_BLOCKED',
  };
  const mode = packagePrerequisiteAction
    ? 'IMPLEMENTATION_BLOCKED'
    : selected ? modeByStatus[selected.status] ?? 'GLOBAL_IMPLEMENTATION_READY' : 'DOCUMENTATION_ONLY';
  const authorized = instances.filter(({ status }) => (
    ['AUTHORIZED', 'IN_PROGRESS', 'IMPLEMENTED'].includes(status)
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
    coordination: {
      mode: 'CONTROLLED_DUAL_LANE',
      documentaryConcurrency: 'ONE_ACTIVE_TASK',
      physicalConcurrency: 'ONE_ACTIVE_INSTANCE',
      separateCheckoutsRequired: Boolean(selected),
      mergePolicy: 'SERIALIZED_CLOSE',
      latestMainReconciliationRequired: Boolean(selected),
      physicalContractFreeze: 'SOURCE_CONTRACT_SHA256',
    },
    documentary,
    physical: {
      active: selected,
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
  const physicalRows = control.physical.instances.length > 0
    ? control.physical.instances.map((instance) => (
      `| \`${instance.instanceId}\` | ${markdown(instance.taskTitle)} | ${instance.status} | ${markdown(instance.blocker)} |`
    )).join('\n')
    : '| — | — | SIN_INSTANCIAS | — |';
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
- **Implementación física autorizada ahora:** ${allowed}

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

| Instancia | Contrato | Estado | Bloqueo o condición |
| --- | --- | --- | --- |
${physicalRows}

## Coordinación de carriles

- **Modo:** \`${control.coordination.mode}\`
- **Documentación:** máximo una tarea activa
- **Implementación física:** máximo una instancia activa
- **Checkouts separados cuando ambos carriles están activos:** ${control.coordination.separateCheckoutsRequired ? 'SÍ' : 'NO NECESARIO'}
- **Cierre:** serializado; solo un carril mergea a la vez
- **Segundo carril en cerrar:** debe reconciliar el \`main\` más reciente antes de su validación y cierre final
- **Contrato físico en vuelo:** congelado por \`source_contract_sha256\`

## Regla operativa

1. El carril documental y el carril físico pueden avanzar en paralelo; cada carril conserva como máximo una unidad activa y usa un checkout independiente cuando ambos están activos.
2. Aprobar un marcador documental crea elegibilidad, nunca autorización física automática.
3. Código, migraciones, Supabase, despliegues o cambios remotos requieren una instancia explícitamente \`AUTHORIZED\`.
4. \`AUTHORIZED\` habilita el trabajo físico, pero no concede al asistente permiso para escribirlo.
5. La entrega reúne todos los artefactos deterministas y un lote local continuo; el usuario ejecuta primero el preflight estricto y solo aplica el código si ese preflight termina correctamente.
6. Un preflight estricto con código de salida 0 no crea un gate conversacional. Un fallo sí detiene el lote y exige evidencia antes de continuar.
7. Después de materializar todos los cambios, se usa una sola transacción final fail-fast. Antes de consolidar VERIFIED, ejecutar docs:implementation:preverify con --instance-id para comprobar lint sobre todo el PR y el worktree, incluso después del commit. Si toda la evidencia exigida es local, PASS permite consolidar evidence y pasar a VERIFIED. Si el contrato exige evidencia remota sobre código publicado, la instancia permanece IMPLEMENTED mientras se realiza el commit/push de materialización y se valida el SHA remoto; solo con PASS remoto puede pasar a VERIFIED.
8. La siguiente instancia global espera la verificación de la anterior; no se concilia trabajo duplicado al final.
9. Los cierres y merges de los dos carriles se serializan. El segundo carril debe incorporar el \`main\` resultante del primero y repetir las validaciones finales sobre esa base.
10. “Haz la acción principal” inicia la guía manual continua del carril correspondiente; nunca autoriza escrituras automáticas ni suspende el otro carril.
`;
}

export function ensurePendingImplementationRecord({ root, control, check = false }) {
  const missingPendingRecord = control.primaryAction.type === 'AUTORIZAR_IMPLEMENTACION'
    && control.physical.active?.source === 'DERIVED_FROM_APPROVED_CONTRACT';
  if (!missingPendingRecord) return false;

  const active = control.physical.active;
  const recordPath = path.join(root, active.recordPath);
  if (fs.existsSync(recordPath)) return true;
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
