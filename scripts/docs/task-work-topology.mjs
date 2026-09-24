import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

import { readCanonicalTaskInventory } from './task-semantic-contract.mjs';

const TASK_ID = '[A-Z][A-Z0-9]*(?:-[A-Z0-9]+)+-\\d{3}';
const TASK_REFERENCE = new RegExp(`\\b${TASK_ID}(?!\\d)`, 'gu');
const RANGE_REFERENCE = new RegExp(
  `(?<from>${TASK_ID})\`?\\s+(?:a|hasta|\\.\\.)\\s+\`?(?<to>${TASK_ID})`,
  'giu',
);

function taskIdentity(id) {
  const match = id.match(/^(?<prefix>[A-Z][A-Z0-9]*(?:-[A-Z0-9]+)+)-(?<number>\d{3})$/u);
  if (!match) throw new Error(`identificador canónico inválido: ${id}.`);
  return { prefix: match.groups.prefix, number: Number(match.groups.number) };
}

function matchesSelector(task, selector) {
  if (Array.isArray(selector.task_ids)) return selector.task_ids.includes(task.id);
  if (typeof selector.prefix !== 'string') throw new Error('selector de topología inválido.');
  const identity = taskIdentity(task.id);
  return identity.prefix === selector.prefix
    && identity.number >= (selector.from ?? 1)
    && identity.number <= (selector.to ?? Number.MAX_SAFE_INTEGER);
}

function expandSelectors(tasks, selectors) {
  const selected = [];
  for (const selector of selectors) {
    for (const task of tasks) {
      if (matchesSelector(task, selector) && !selected.includes(task.id)) selected.push(task.id);
    }
  }
  return selected;
}

function stateFromMarker(marker) {
  if (marker === '[ ]') return 'NO INICIADA';
  if (marker === '[~]' || marker === '🟡') return 'PROPUESTA PARA APROBACIÓN';
  if (marker === '❌') return 'RECHAZADA';
  return 'APROBADA';
}

function inlineField(block, labels) {
  const pattern = new RegExp(`^\\*\\*(?:${labels.join('|')}):\\*\\*\\s*(?<value>.+?)\\s*$`, 'imu');
  return block.match(pattern)?.groups?.value?.trim() ?? null;
}

function listedField(block, labels) {
  const pattern = new RegExp(
    `^(?:${labels.join('|')}):[ \\t]*\\r?\\n[ \\t]*\\r?\\n(?<value>(?:[ \\t]*[-*][ \\t]+[^\\r\\n]+(?:\\r?\\n|$))+)`,
    'imu',
  );
  return block.match(pattern)?.groups?.value?.trim() ?? null;
}

function expandReferences(value, knownIds) {
  const references = new Set(String(value ?? '').match(TASK_REFERENCE) ?? []);
  for (const match of String(value ?? '').matchAll(RANGE_REFERENCE)) {
    const from = taskIdentity(match.groups.from);
    const to = taskIdentity(match.groups.to);
    if (from.prefix !== to.prefix || from.number > to.number) continue;
    for (let number = from.number; number <= to.number; number += 1) {
      const id = `${from.prefix}-${String(number).padStart(3, '0')}`;
      if (knownIds.has(id)) references.add(id);
    }
  }
  return [...references];
}

export function taskDependencies(task, knownIds) {
  const developmentLabels = [
    'Dependencias para desarrollar(?: el marcador global)?',
    'Dependencias de desarrollo',
  ];
  const executionLabels = [
    'Dependencias para ejecutar(?: cada instancia| una instancia)?',
    'Dependencias de ejecución',
  ];
  const developmentSource = inlineField(task.block, developmentLabels)
    ?? listedField(task.block, developmentLabels)
    ?? inlineField(task.block, ['Dependencias?']);
  const executionSource = inlineField(task.block, executionLabels)
    ?? listedField(task.block, executionLabels);
  return {
    developmentSource,
    development: expandReferences(developmentSource, knownIds).filter((id) => id !== task.id),
    executionSource,
    execution: expandReferences(executionSource, knownIds).filter((id) => id !== task.id),
  };
}

function orderedRouteTasks(tasks, route) {
  const byId = new Map(tasks.map((task) => [task.id, task]));
  const result = [];
  const stageByTask = new Map();
  for (const stage of route.stages) {
    for (const id of expandSelectors(tasks, stage.selectors)) {
      if (!byId.has(id)) throw new Error(`${stage.sequence_id} referencia la tarea inexistente ${id}.`);
      if (stageByTask.has(id)) throw new Error(`${id} aparece en más de una etapa de continuidad.`);
      stageByTask.set(id, stage.sequence_id);
      result.push(byId.get(id));
    }
  }
  const missing = tasks.filter((task) => !stageByTask.has(task.id));
  if (missing.length > 0) throw new Error(`tareas sin etapa de continuidad: ${missing.map(({ id }) => id).join(', ')}.`);
  return { ordered: result, stageByTask };
}

export function developmentDependencyOrderErrors(ordered, dependencies) {
  const errors = [];
  const position = new Map(ordered.map((task, index) => [task.id, index]));
  for (const task of ordered) {
    for (const dependency of dependencies.get(task.id)?.development ?? []) {
      if (!position.has(dependency)) errors.push(`${task.id} depende de la tarea desconocida ${dependency}.`);
      else if (position.get(dependency) >= position.get(task.id)) {
        errors.push(`${task.id} tiene una dependencia de desarrollo futura: ${dependency}.`);
      }
    }
  }
  return errors;
}

export function executionDependencyGateErrors(topology, dependencies) {
  const errors = [];
  for (const [taskId, parsed] of dependencies) {
    const taskGate = topology.get(taskId)?.executionGate;
    if (taskGate !== 'PRE_E5_FOUNDATION') continue;
    for (const dependency of parsed.execution ?? []) {
      const dependencyGate = topology.get(dependency)?.executionGate;
      if (dependencyGate === 'POST_E5_PACKAGE') {
        errors.push(
          `${taskId} es PRE_E5_FOUNDATION y no puede depender físicamente de ${dependency}, que es POST_E5_PACKAGE.`,
        );
      }
    }
  }
  return errors;
}

export function activeDocumentaryTaskId(active, inventory = null) {
  const priorityTaskIds = active?.route_id !== 'NORMAL-CANONICAL-FLOW-001'
    ? (active?.task_ids ?? []).filter(
      (id) => typeof id === 'string' && !id.includes('::'),
    )
    : [];
  if (priorityTaskIds.length > 0) {
    if (inventory instanceof Map) {
      for (const id of priorityTaskIds) {
        const task = inventory.get(id);
        if (!task) throw new Error('La priority lane referencia una tarea documental inexistente: ' + id + '.');
        if (stateFromMarker(task.marker) !== 'APROBADA') return id;
      }
      return null;
    }
    return priorityTaskIds[0] ?? null;
  }
  const segment = active?.segments?.[0];
  return segment
    ? `${segment.prefix}-${String(segment.from).padStart(3, '0')}`
    : null;
}

export function resolveTaskWorkTopology({ root = process.cwd() } = {}) {
  const baseDir = path.join(root, 'docs', 'plan-canonico', 'modular');
  const policy = JSON.parse(fs.readFileSync(path.join(baseDir, 'task-work-topology.json'), 'utf8'));
  const route = JSON.parse(fs.readFileSync(path.join(baseDir, 'continuity-route.json'), 'utf8'));
  const inventory = readCanonicalTaskInventory(root);
  const tasks = [...inventory.values()].filter((task) => route.stages.some((stage) => (
    stage.selectors.some((selector) => matchesSelector(task, selector))
  )));
  const errors = [];

  if (policy.schema_version !== 2) errors.push('schema_version debe ser 2.');
  if (policy.canonical_marker_semantics !== 'DEFINE_CONTRACT_ONCE') {
    errors.push('canonical_marker_semantics debe ser DEFINE_CONTRACT_ONCE.');
  }
  if (policy.coverage_policy !== 'ALL_CONTINUITY_TASKS_EXACTLY_ONCE') {
    errors.push('coverage_policy debe cubrir todas las tareas exactamente una vez.');
  }
  const modes = new Set(Object.keys(policy.mode_definitions ?? {}));
  const executionGateDefinitions = policy.execution_gate_definitions ?? {};
  const executionGates = new Set(Object.keys(executionGateDefinitions));
  if (!executionGates.has('NO_PHYSICAL_INSTANCE')) {
    errors.push('execution_gate_definitions debe incluir NO_PHYSICAL_INSTANCE.');
  }
  if (!executionGates.has('UNREVIEWED')) {
    errors.push('execution_gate_definitions debe incluir UNREVIEWED.');
  }
  if (!executionGates.has(policy.execution_gate_default)) {
    errors.push(`execution_gate_default usa el gate desconocido ${policy.execution_gate_default ?? 'VACÍO'}.`);
  }
  const routeStageIds = route.stages.map(({ sequence_id }) => sequence_id);
  const defaults = new Map((policy.stage_defaults ?? []).map((item) => [item.sequence_id, item.mode]));
  const duplicateDefaults = (policy.stage_defaults ?? [])
    .filter((item, index, all) => all.findIndex(({ sequence_id }) => sequence_id === item.sequence_id) !== index);
  if (duplicateDefaults.length > 0) errors.push('stage_defaults contiene etapas duplicadas.');
  for (const stageId of routeStageIds) if (!defaults.has(stageId)) errors.push(`falta modo por defecto para ${stageId}.`);
  for (const stageId of defaults.keys()) if (!routeStageIds.includes(stageId)) errors.push(`modo para etapa inexistente ${stageId}.`);
  for (const [stageId, mode] of defaults) if (!modes.has(mode)) errors.push(`${stageId} usa el modo desconocido ${mode}.`);

  let ordered = [];
  let stageByTask = new Map();
  try {
    ({ ordered, stageByTask } = orderedRouteTasks(tasks, route));
  } catch (error) {
    errors.push(error instanceof Error ? error.message : String(error));
  }

  const overridesByTask = new Map();
  for (const override of policy.overrides ?? []) {
    if (!modes.has(override.mode)) errors.push(`override usa el modo desconocido ${override.mode}.`);
    const selected = expandSelectors(tasks, override.selectors ?? []);
    if (selected.length === 0) errors.push(`override ${override.mode} no selecciona tareas.`);
    for (const id of selected) {
      if (overridesByTask.has(id)) errors.push(`${id} recibe más de un override de topología.`);
      overridesByTask.set(id, override);
    }
  }

  const executionGateOverridesByTask = new Map();
  for (const override of policy.execution_gate_overrides ?? []) {
    if (!executionGates.has(override.execution_gate)) {
      errors.push(`execution_gate override usa el gate desconocido ${override.execution_gate ?? 'VACÍO'}.`);
    }
    const selected = expandSelectors(tasks, override.selectors ?? []);
    if (selected.length === 0) {
      errors.push(`execution_gate override ${override.execution_gate ?? 'VACÍO'} no selecciona tareas.`);
    }
    for (const id of selected) {
      if (executionGateOverridesByTask.has(id)) {
        errors.push(`${id} recibe más de un override de execution_gate.`);
      }
      executionGateOverridesByTask.set(id, override);
    }
  }

  const topology = new Map();
  for (const task of ordered) {
    const stageId = stageByTask.get(task.id);
    const override = overridesByTask.get(task.id);
    const mode = override?.mode ?? defaults.get(stageId);
    const definition = policy.mode_definitions?.[mode];
    if (!definition) continue;

    const gateOverride = executionGateOverridesByTask.get(task.id);
    const executionGate = mode === 'DEFINE_ONCE'
      ? 'NO_PHYSICAL_INSTANCE'
      : gateOverride?.execution_gate ?? policy.execution_gate_default;
    const executionGateDefinition = executionGateDefinitions[executionGate];

    if (!executionGateDefinition) {
      errors.push(`${task.id} usa el execution_gate desconocido ${executionGate ?? 'VACÍO'}.`);
      continue;
    }

    if (mode === 'DEFINE_ONCE' && gateOverride
      && gateOverride.execution_gate !== 'NO_PHYSICAL_INSTANCE') {
      errors.push(`${task.id} es DEFINE_ONCE y no puede recibir ${gateOverride.execution_gate}.`);
    }

    topology.set(task.id, {
      taskId: task.id,
      sequenceId: stageId,
      mode,
      label: definition.label,
      canonicalWork: override?.canonical_work ?? definition.canonical_work,
      executionDependencies: override?.execution_dependencies ?? definition.execution_dependencies,
      executionRule: override?.execution_rule ?? definition.execution_rule,
      instancePattern: override?.instance_pattern ?? definition.instance_pattern,
      executionGate,
      executionGateLabel: executionGateDefinition.label,
      executionGateRule: executionGateDefinition.rule,
    });
  }
  if (topology.size !== ordered.length) errors.push(`topología incompleta: ${topology.size} de ${ordered.length} tareas.`);

  const implementationAuditTasks = ordered.filter((task) => {
    const sequenceId = topology.get(task.id)?.sequenceId ?? '';
    return sequenceId === 'PHASE-02-E5-IMPLEMENTATION-PLANNING'
      || /^PHASE-(?:03|04|05|06|07|08|09|10|11|12|13)-/u.test(sequenceId);
  });

  const progress = policy.reconciliation_progress ?? {};
  if (implementationAuditTasks.length !== progress.implementation_task_total) {
    errors.push(
      `reconciliation_progress espera ${progress.implementation_task_total ?? 'VACÍO'} tareas y el inventario contiene ${implementationAuditTasks.length}.`,
    );
  }

  const reviewedPositions = new Set();
  for (const range of progress.reviewed_ranges ?? []) {
    const from = Number(range.from_position);
    const to = Number(range.to_position);
    if (!Number.isInteger(from) || !Number.isInteger(to) || from < 1 || to < from
      || to > implementationAuditTasks.length) {
      errors.push(`reviewed_ranges contiene un rango inválido: ${JSON.stringify(range)}.`);
      continue;
    }
    for (let positionIndex = from; positionIndex <= to; positionIndex += 1) {
      if (reviewedPositions.has(positionIndex)) {
        errors.push(`reviewed_ranges duplica la posición ${positionIndex}.`);
      }
      reviewedPositions.add(positionIndex);
    }
  }

  if (reviewedPositions.size !== progress.reviewed_count) {
    errors.push(
      `reviewed_count=${progress.reviewed_count ?? 'VACÍO'} pero reviewed_ranges cubre ${reviewedPositions.size} posiciones.`,
    );
  }

  if (implementationAuditTasks.length - reviewedPositions.size !== progress.unreviewed_count) {
    errors.push(
      `unreviewed_count=${progress.unreviewed_count ?? 'VACÍO'} no coincide con ${implementationAuditTasks.length - reviewedPositions.size}.`,
    );
  }

  for (let index = 0; index < implementationAuditTasks.length; index += 1) {
    const task = implementationAuditTasks[index];
    const auditPosition = index + 1;
    const gate = topology.get(task.id)?.executionGate;
    const shouldBeReviewed = reviewedPositions.has(auditPosition);

    if (shouldBeReviewed && gate === 'UNREVIEWED') {
      errors.push(`posición ${auditPosition} / ${task.id} está declarada revisada pero conserva UNREVIEWED.`);
    }

    if (!shouldBeReviewed && gate !== 'UNREVIEWED') {
      errors.push(`posición ${auditPosition} / ${task.id} todavía no está revisada pero usa ${gate}.`);
    }
  }

  const expectedNext = reviewedPositions.size + 1;
  if (progress.next_position !== expectedNext) {
    errors.push(
      `next_position debe ser ${expectedNext} y es ${progress.next_position ?? 'VACÍO'}.`,
    );
  }

  if (progress.status !== 'PARTIAL_REVIEW_IN_PROGRESS') {
    errors.push('reconciliation_progress.status debe ser PARTIAL_REVIEW_IN_PROGRESS durante esta fase.');
  }

  const position = new Map(ordered.map((task, index) => [task.id, index]));
  const knownIds = new Set(position.keys());
  const dependencies = new Map();
  for (const task of ordered) {
    const parsed = taskDependencies(task, knownIds);
    dependencies.set(task.id, parsed);
  }
  errors.push(...developmentDependencyOrderErrors(ordered, dependencies));
  errors.push(...executionDependencyGateErrors(topology, dependencies));

  const active = JSON.parse(fs.readFileSync(path.join(baseDir, 'active-sequence.json'), 'utf8'));
  const currentId = activeDocumentaryTaskId(active, inventory);
  if (currentId && dependencies.has(currentId)) {
    for (const dependency of dependencies.get(currentId).development) {
      const owner = inventory.get(dependency);
      if (owner && stateFromMarker(owner.marker) !== 'APROBADA') {
        errors.push(`${currentId} no puede ser actual: su dependencia de desarrollo ${dependency} no está aprobada.`);
      }
    }
  }

  if (errors.length > 0) throw new Error(`task-work-topology.json o su grafo son inválidos:\n- ${errors.join('\n- ')}`);
  const counts = {};
  for (const item of topology.values()) counts[item.mode] = (counts[item.mode] ?? 0) + 1;

  const executionGateCounts = {};
  for (const task of implementationAuditTasks) {
    const gate = topology.get(task.id).executionGate;
    executionGateCounts[gate] = (executionGateCounts[gate] ?? 0) + 1;
  }

  return {
    policy,
    route,
    inventory,
    ordered,
    topology,
    dependencies,
    counts,
    executionGateCounts,
    implementationAuditTasks,
    currentId,
  };
}

function main() {
  const result = resolveTaskWorkTopology();
  console.log(
    `OK: topología de trabajo; ${result.topology.size} tareas; `
    + `${Object.entries(result.counts).map(([mode, count]) => `${mode}=${count}`).join('; ')}.`,
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
