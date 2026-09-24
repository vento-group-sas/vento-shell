import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import {
  syncPriorityLaneOrderDocument,
} from './sync-priority-delivery-lanes-doc.mjs';

const EXPECTED_CYCLE = [
  'SHELL-CI-020',
  'SHELL-CI-021',
  'SHELL-CI-022',
  'SHELL-CI-023',
  'SHELL-CI-024',
];
const EXPECTED_PACKAGE_TASKS = Array.from(
  { length: 25 },
  (_, index) => `DELIV-PKG-${String(index + 1).padStart(3, '0')}`,
);
const range = (prefix, from, to) =>
  Array.from(
    { length: to - from + 1 },
    (_, index) => `${prefix}-${String(from + index).padStart(3, '0')}`,
  );

const EXPECTED_REQUIRED_GROUPS = new Map([
  ['EVENT_CONTRACTS', range('INT-APP', 1, 10)],
  ['SUPABASE_AUDIT', [
    ...range('SUPA-AUD', 1, 24),
    ...range('DATA-NORM-AUD', 1, 7),
  ]],
  ['SUPABASE_ARCHITECTURE', [
    ...range('SUPA-ARC', 1, 24),
    ...range('DATA-NORM-ARC', 1, 12),
    'SUPA-ARC-025',
  ]],
  ['SUPABASE_TRANSITION', [
    ...range('SUPA-TRANS', 1, 15),
    ...range('DATA-NORM-TRANS', 1, 9),
    'SUPA-TRANS-016',
  ]],
  ['H_SHARED_AUDIT', range('SHELL-AUD', 1, 11)],
  ['H_SHARED_DISTRIBUTION', range('SHELL-PKG', 1, 8)],
  ['TRANSVERSE_SERVICE_CATALOG', range('TSVC-CAT', 1, 10)],
  ['AUTH_UI_CONTRACT', range('AUTH-UI', 30, 39)],
  ['SHARED_DEVICE_CONTRACT', range('AUTH-DEV', 1, 6)],
  ['SIMULATION_CONTRACT', range('AUTH-SIM', 1, 6)],
  ['AUTHORIZATION_ERRORS', range('AUTH-ERR', 1, 20)],
  ['NEXO_INVENTORY_CLASSIFICATION', ['NEXO-DOM-001']],
  ['NEXO_FUNCTIONAL_UX', range('NEXO-UX', 1, 25)],
  ['NEXO_UI_VALIDATION', range('AUTH-UI', 52, 60)],
]);

const EXPECTED_EXECUTION_PREREQUISITES = new Map([
  ['CI_FOUNDATION', range('SHELL-CI', 1, 19)],
  ['R0_DATABASE_SAFETY', [
    'AUTH-DB-015',
    ...range('AUTH-DB', 27, 29),
    ...range('AUTH-DB', 1, 5),
  ]],
  ['R1_AUTH_PHYSICAL_CORE', [
    'AUTH-DB-016',
    'AUTH-DB-018',
    'AUTH-DB-017',
    'AUTH-DB-019',
    'AUTH-DB-033',
    'AUTH-DB-035',
    'AUTH-DB-034',
    'AUTH-DB-032',
    ...range('AUTH-DB', 12, 14),
  ]],
]);

const EXPECTED_IMPLEMENTATION_GROUPS = new Map([
  ['H_SHARED_CONTRACTS', range('SHELL-CON', 1, 24)],
  ['H_AUTH_CONTEXT_BASE', ['SHELL-AUTH-001', 'SHELL-CTX-001']],
  ['H_AUTH_CONTEXT_CONVERGENCE', [
    ...range('SHELL-CTX', 2, 6),
    ...range('SHELL-AUTH', 2, 4),
  ]],
  ['H_SHARED_REMAINING', [
    ...range('SHELL-NORM', 1, 9),
    ...range('SHELL-DB', 1, 5),
    ...range('SHELL-UI', 1, 20),
    ...range('SHELL-MIG', 1, 8),
    ...range('SHELL-NATIVE', 1, 3),
    ...range('SHELL-APP', 1, 21),
  ]],
  ['R2_NEXO_DATABASE_PACKAGE', [
    'AUTH-DB-020',
    ...range('AUTH-DB', 6, 10),
    'AUTH-DB-021',
    'AUTH-DB-011',
    ...range('AUTH-DB', 22, 26),
  ]],
  ['SERVER_ACTIONS_COMPLETE', range('AUTH-SRV', 1, 18)],
  ['SHARED_DEVICE_IMPLEMENTATION', range('AUTH-DEV', 7, 14)],
  ['SIMULATION_IMPLEMENTATION', range('AUTH-SIM', 7, 14)],
  ['NEXO_AUTHORIZATION', [
    ...range('NEXO-AUTH', 1, 6),
    ...range('NEXO-AUTH', 8, 20),
  ]],
  ['AUTH_UI_ENFORCEMENT', range('AUTH-UI', 40, 51)],
  ['H_FINAL_AUTH_ADOPTION', ['SHELL-AUTH-005']],
]);

const EXPECTED_IMPLEMENTATION_ORDER = [
  'H_SHARED_CONTRACTS',
  'H_AUTH_CONTEXT_BASE',
  'H_AUTH_CONTEXT_CONVERGENCE',
  'H_SHARED_REMAINING',
  'CONDITIONAL_IMPLEMENTATION_ARTIFACTS',
  'R2_NEXO_DATABASE_PACKAGE',
  'SERVER_ACTIONS_COMPLETE',
  'SHARED_DEVICE_IMPLEMENTATION',
  'SIMULATION_IMPLEMENTATION',
  'NEXO_AUTHORIZATION',
  'AUTH_UI_ENFORCEMENT',
  'H_FINAL_AUTH_ADOPTION',
];

const EXPECTED_CONDITIONAL_DESIGN_GROUP_IDS = [
  'PRODUCTION_CONDITIONAL',
  'PRINTING_CONDITIONAL',
  'EVIDENCE_CONDITIONAL',
  'QUEUE_CONDITIONAL',
  'NOTIFICATIONS_CONDITIONAL',
  'TECHNOLOGY_SUPPORT_CONDITIONAL',
  'INFORMATION_GOVERNANCE_CONDITIONAL',
  'MASTER_DATA_ANALYTICS_CONDITIONAL',
  'CONTINUITY_CONDITIONAL',
];
const EXPECTED_CONDITIONAL_DESIGN_GROUPS = new Map([
  ['PRODUCTION_CONDITIONAL', ['INT-PROD-005']],
  ['PRINTING_CONDITIONAL', range('PRINT-ARC', 1, 20)],
  ['EVIDENCE_CONDITIONAL', range('EVID-ARC', 1, 10)],
  ['QUEUE_CONDITIONAL', range('QUEUE-ARC', 1, 12)],
  ['NOTIFICATIONS_CONDITIONAL', range('NOTIFY-ARC', 1, 10)],
  ['TECHNOLOGY_SUPPORT_CONDITIONAL', [
    ...range('TI-DOM', 1, 13),
    ...range('TI-AUTH', 1, 4),
    ...range('TI-UX', 1, 6),
    ...range('TI-INT', 1, 3),
  ]],
  ['INFORMATION_GOVERNANCE_CONDITIONAL', [
    ...range('INFO-DOM', 1, 13),
    ...range('INFO-AUTH', 1, 4),
    ...range('INFO-UX', 1, 6),
    ...range('INFO-INT', 1, 3),
  ]],
  ['MASTER_DATA_ANALYTICS_CONDITIONAL', [
    ...range('DATA-DOM', 1, 17),
    ...range('DATA-AUTH', 1, 4),
    ...range('DATA-UX', 1, 8),
    ...range('DATA-INT', 1, 4),
  ]],
  ['CONTINUITY_CONDITIONAL', [
    ...range('CONT-DOM', 1, 15),
    ...range('CONT-AUTH', 1, 4),
    ...range('CONT-UX', 1, 7),
    ...range('CONT-INT', 1, 4),
  ]],
]);

const EXPECTED_CONDITIONAL_IMPLEMENTATION_GROUP_IDS = [
  'PRODUCTION_LINK_IMPLEMENTATION',
  'PHYSICAL_NORMALIZATION_CONDITIONAL',
  'EXTERNAL_INTEGRATION_CONDITIONAL',
];
const EXPECTED_CONDITIONAL_IMPLEMENTATION_GROUPS = new Map([
  ['PRODUCTION_LINK_IMPLEMENTATION', ['NEXO-AUTH-007']],
  ['PHYSICAL_NORMALIZATION_CONDITIONAL', range('DATA-NORM-DB', 1, 10)],
  ['EXTERNAL_INTEGRATION_CONDITIONAL', range('INT-DB', 1, 8)],
]);

const EXPECTED_POST_PACKAGE_GROUPS = new Map([
  ['E5_READINESS_PLAN', range('READY-GATE', 1, 15)],
  ['E5_CUTOVER_PLAN', range('CUTOVER-OPS', 1, 10)],
  ['E5_HYPERCARE_PLAN', range('HYPERCARE-OPS', 1, 10)],
  ['E5_ENTRY_GATES', range('E5-GATE', 1, 7)],
]);
const EXPECTED_POST_IMPLEMENTATION_GROUPS = new Map([
  ['U_AUTHORIZATION_CERTIFICATION', range('AUTH-QA', 1, 30)],
  ['U_NEXO_EXPERIENCE_CERTIFICATION', [
    ...range('UX-QA', 1, 20),
    'UX-QA-024',
  ]],
]);

const ALLOWED_STATUSES = new Set([
  'DESIGNATED_NOT_READY',
  'READY_FOR_E5',
  'APPROVED_FOR_IMPLEMENTATION',
  'IMPLEMENTING',
  'READINESS',
  'PILOT',
  'HYPERCARE',
  'CERTIFIED',
  'SUSPENDED',
  'REJECTED',
]);
const TASK_HEADING =
  /^###\s+(?:\[[ x~]\]|✅|🟡|❌)\s+(?<id>[A-Z][A-Z0-9]*(?:-[A-Z0-9]+)+-\d{3})\b/gmu;

function equalArray(left, right) {
  return left.length === right.length
    && left.every((value, index) => value === right[index]);
}

function expandTaskRanges(taskRanges = []) {
  return taskRanges.flatMap(({ prefix, from, to }) => {
    if (!prefix || !Number.isInteger(from) || !Number.isInteger(to) || to < from) {
      return [];
    }
    return range(prefix, from, to);
  });
}

function expandTaskFamilies(taskFamilies = [], taskIds = new Set()) {
  return taskFamilies.flatMap((prefix) => {
    const ids = [...taskIds]
      .filter((id) => id.startsWith(`${prefix}-`))
      .sort((left, right) => left.localeCompare(right, 'en'));
    return ids;
  });
}

function artifactTaskRefs(artifact = {}, taskIds = new Set()) {
  return [
    ...(artifact.task_refs ?? []),
    ...expandTaskRanges(artifact.task_ranges),
    ...expandTaskFamilies(artifact.task_family_refs, taskIds),
  ];
}

function allTaskRefs(lane, taskIds) {
  return [
    ...(lane.required_task_artifacts ?? []).flatMap((item) => artifactTaskRefs(item, taskIds)),
    ...(lane.conditional_artifacts ?? []).flatMap((item) => artifactTaskRefs(item, taskIds)),
    ...(lane.conditional_implementation_artifacts ?? []).flatMap(
      (item) => artifactTaskRefs(item, taskIds),
    ),
    ...(lane.execution_prerequisite_artifacts ?? []).flatMap((item) => artifactTaskRefs(item, taskIds)),
    ...(lane.implementation_artifacts ?? []).flatMap((item) => artifactTaskRefs(item, taskIds)),
    ...(lane.post_package_artifacts ?? []).flatMap((item) => artifactTaskRefs(item, taskIds)),
    ...(lane.post_implementation_artifacts ?? []).flatMap((item) => artifactTaskRefs(item, taskIds)),
    ...(lane.deferred_but_preserved ?? []).flatMap((item) => artifactTaskRefs(item, taskIds)),
    ...(lane.package_definition_tasks ?? []),
    lane.package_gate,
    ...(lane.execution_cycle ?? []),
    lane.completion_task,
  ].filter(Boolean);
}

function groupIds(artifacts = []) {
  return artifacts.map((artifact) => artifact.artifact_group_id);
}

function validateExactGroups({
  laneId,
  artifacts,
  expected,
  errors,
  label,
  taskIds,
}) {
  const actualIds = groupIds(artifacts);
  if (!equalArray(actualIds, [...expected.keys()])) {
    errors.push(`${laneId}: faltan ${label} o están fuera del orden auditado.`);
  }
  for (const [groupId, expectedTasks] of expected) {
    const artifact = artifacts.find(
      ({ artifact_group_id: candidate }) => candidate === groupId,
    );
    const actualTasks = artifact ? artifactTaskRefs(artifact, taskIds) : [];
    if (!equalArray(actualTasks, expectedTasks)) {
      errors.push(`${laneId}: ${groupId} omite tareas o altera su orden.`);
    }
  }
}

function adaptiveExpectedGroups(expected, taskIds, familyGroups) {
  const result = new Map(expected);
  for (const [groupId, families] of familyGroups) {
    result.set(groupId, expandTaskFamilies(families, taskIds));
  }
  return result;
}

export function validatePriorityDeliveryLaneData({
  data,
  taskIds,
  documents,
  activeSequenceSource = '',
  executionRouteSource = '',
}) {
  const errors = [];

  if (data?.schema_version !== 1) errors.push('schema_version debe ser 1.');
  if (data?.canonical_sequence_unchanged !== true) {
    errors.push('canonical_sequence_unchanged debe permanecer en true.');
  }
  if (data?.global_task_partial_approval_forbidden !== true) {
    errors.push('global_task_partial_approval_forbidden debe permanecer en true.');
  }

  const routePolicy = data?.implementation_route_policy;
  if (routePolicy?.default_route !== 'NORMAL_CANONICAL_FLOW') {
    errors.push('la ruta por defecto debe ser NORMAL_CANONICAL_FLOW.');
  }
  if (routePolicy?.normal_route_source !== 'continuity-route.json') {
    errors.push('el flujo normal debe derivarse de continuity-route.json.');
  }
  if (routePolicy?.route_selection_source !== 'execution-route.json') {
    errors.push('la selección de ruta debe derivarse de execution-route.json.');
  }
  if (typeof routePolicy?.priority_route_id !== 'string' || !routePolicy.priority_route_id) {
    errors.push('priority_route_id debe identificar un carril prioritario registrado.');
  }
  if (routePolicy?.canonical_documentation_continues !== true
    || routePolicy?.final_plan_scope_unchanged !== true) {
    errors.push('la ruta prioritaria debe conservar continuidad y alcance final.');
  }
  if (!Array.isArray(data?.lanes) || data.lanes.length === 0) {
    errors.push('debe existir al menos un carril prioritario.');
  }

  const laneIds = new Set();
  for (const lane of data?.lanes ?? []) {
    if (!lane.lane_id || laneIds.has(lane.lane_id)) {
      errors.push(`lane_id ausente o duplicado: ${lane.lane_id ?? '(vacío)'}.`);
      continue;
    }
    laneIds.add(lane.lane_id);

    if (taskIds.has(lane.lane_id)) {
      errors.push(`${lane.lane_id} no puede materializarse como tarea canónica.`);
    }
    if (!ALLOWED_STATUSES.has(lane.status)) {
      errors.push(`${lane.lane_id}: estado no permitido ${lane.status}.`);
    }
    if (lane.supabase_repository !== 'vento-shell') {
      errors.push(`${lane.lane_id}: Supabase deberá permanecer en vento-shell.`);
    }
    const routeMode = lane.route_mode ?? 'FULL_PACKAGE';
    if (!['FULL_PACKAGE', 'DOCUMENTATION_PRIORITY'].includes(routeMode)) {
      errors.push(`${lane.lane_id}: route_mode no permitido ${routeMode}.`);
    }
    if (routeMode === 'FULL_PACKAGE') {
    if (lane.package_gate !== 'E5-GATE-008') {
      errors.push(`${lane.lane_id}: package_gate debe ser E5-GATE-008.`);
    }
    if (!equalArray(lane.execution_cycle ?? [], EXPECTED_CYCLE)) {
      errors.push(`${lane.lane_id}: ciclo SHELL-CI-020 a SHELL-CI-024 incompleto o desordenado.`);
    }
    if (lane.completion_task !== 'SHELL-CI-024') {
      errors.push(`${lane.lane_id}: completion_task debe ser SHELL-CI-024.`);
    }
    if (!equalArray(lane.package_definition_tasks ?? [], EXPECTED_PACKAGE_TASKS)) {
      errors.push(`${lane.lane_id}: debe conservar DELIV-PKG-001 a DELIV-PKG-025.`);
    }

    } else {
      if ((lane.package_definition_tasks ?? []).length > 0
        || lane.package_gate != null
        || (lane.execution_cycle ?? []).length > 0
        || lane.completion_task != null
        || (lane.implementation_execution_order ?? []).length > 0) {
        errors.push(`${lane.lane_id}: DOCUMENTATION_PRIORITY no puede declarar package gate, execution cycle, completion task ni implementation order.`);
      }
    }
    if (!Array.isArray(lane.excluded_from_closure)
      || lane.excluded_from_closure.length === 0) {
      errors.push(`${lane.lane_id}: debe declarar exclusiones de cierre.`);
    }
    if (!Array.isArray(lane.invariants) || lane.invariants.length < 12) {
      errors.push(`${lane.lane_id}: debe conservar al menos doce invariantes.`);
    }

    const requiredIds = groupIds(lane.required_task_artifacts);
    const conditionalDesignIds = groupIds(lane.conditional_artifacts);
    const conditionalImplementationIds = groupIds(
      lane.conditional_implementation_artifacts,
    );
    const prerequisiteIds = groupIds(lane.execution_prerequisite_artifacts);
    const implementationIds = groupIds(lane.implementation_artifacts);
    const postPackageIds = groupIds(lane.post_package_artifacts);
    const postImplementationIds = groupIds(lane.post_implementation_artifacts);
    const allGroupIds = [
      ...requiredIds,
      ...conditionalDesignIds,
      ...conditionalImplementationIds,
      ...prerequisiteIds,
      ...implementationIds,
      ...postPackageIds,
      ...postImplementationIds,
    ];
    if (allGroupIds.some((groupId) => !groupId)
      || new Set(allGroupIds).size !== allGroupIds.length) {
      errors.push(`${lane.lane_id}: artifact_group_id ausente o duplicado.`);
    }

    const artifactCollections = [
      lane.required_task_artifacts ?? [],
      lane.conditional_artifacts ?? [],
      lane.conditional_implementation_artifacts ?? [],
      lane.execution_prerequisite_artifacts ?? [],
      lane.implementation_artifacts ?? [],
      lane.post_package_artifacts ?? [],
      lane.post_implementation_artifacts ?? [],
      lane.deferred_but_preserved ?? [],
    ];
    const taskOwners = new Map();
    for (const artifact of artifactCollections.flat()) {
      for (const family of artifact.task_family_refs ?? []) {
        const familyTasks = expandTaskFamilies([family], taskIds);
        if (familyTasks.length === 0) {
          errors.push(
            `${lane.lane_id}: ${artifact.artifact_group_id} referencia una familia vacía: ${family}.`,
          );
        }
      }
      for (const taskId of artifactTaskRefs(artifact, taskIds)) {
        const previous = taskOwners.get(taskId);
        if (previous) {
          errors.push(
            `${lane.lane_id}: ${taskId} aparece en más de un grupo (${previous} y ${artifact.artifact_group_id}).`,
          );
        } else {
          taskOwners.set(taskId, artifact.artifact_group_id);
        }
      }
    }

    if (routeMode === 'FULL_PACKAGE') {
    if (!equalArray(
      lane.implementation_execution_order ?? [],
      EXPECTED_IMPLEMENTATION_ORDER,
    )) {
      errors.push(`${lane.lane_id}: implementation_execution_order incompleto o desordenado.`);
    }

    const entryGateId = 'E5_ENTRY_GATES';
    const postPackageBeforeEntryGate = postPackageIds.filter(
      (id) => id !== entryGateId,
    );
    const expectedStageSources = [
      ...requiredIds.map((id) => `required_task_artifacts.${id}`),
      'conditional_artifacts',
      'conditional_implementation_scope',
      'package_definition_tasks',
      ...postPackageBeforeEntryGate.map(
        (id) => `post_package_artifacts.${id}`,
      ),
      ...prerequisiteIds.map(
        (id) => `execution_prerequisite_artifacts.${id}`,
      ),
      ...(postPackageIds.includes(entryGateId)
        ? [`post_package_artifacts.${entryGateId}`]
        : []),
      'package_gate',
      `execution_cycle.${EXPECTED_CYCLE[0]}`,
      ...(lane.implementation_execution_order ?? []).map((id) =>
        id === 'CONDITIONAL_IMPLEMENTATION_ARTIFACTS'
          ? 'conditional_implementation_artifacts'
          : `implementation_artifacts.${id}`),
      ...postImplementationIds.map(
        (id) => `post_implementation_artifacts.${id}`,
      ),
      ...EXPECTED_CYCLE.slice(1).map((id) => `execution_cycle.${id}`),
    ];
    const stages = lane.ordered_execution_stages ?? [];
    const expectedOrders = expectedStageSources.map((_, index) => index + 1);
    if (!equalArray(stages.map((stage) => stage.order), expectedOrders)) {
      errors.push(
        `${lane.lane_id}: las etapas deben estar numeradas de 1 a ${expectedOrders.length}.`,
      );
    }
    if (!equalArray(
      stages.map((stage) => stage.task_source),
      expectedStageSources,
    )) {
      errors.push(`${lane.lane_id}: el orden ejecutable está incompleto o desordenado.`);
    }
    if (stages.some((stage) => !stage.stage_id || !stage.rule)) {
      errors.push(`${lane.lane_id}: cada etapa debe declarar stage_id y rule.`);
    }

    const gateIndex = expectedStageSources.indexOf('package_gate');
    const ciFoundationIndex = expectedStageSources.indexOf(
      'execution_prerequisite_artifacts.CI_FOUNDATION',
    );
    const implementationStartIndex = expectedStageSources.indexOf(
      'execution_cycle.SHELL-CI-020',
    );
    const firstPhysicalIndex = expectedStageSources.findIndex(
      (source) => source.startsWith('implementation_artifacts.')
        || source === 'conditional_implementation_artifacts',
    );
    const entryGatesIndex = expectedStageSources.indexOf(
      'post_package_artifacts.E5_ENTRY_GATES',
    );
    if (!(ciFoundationIndex < entryGatesIndex
      && entryGatesIndex < gateIndex
      && gateIndex < implementationStartIndex
      && implementationStartIndex < firstPhysicalIndex)) {
      errors.push(
        `${lane.lane_id}: CI, E5-GATE-001..008, SHELL-CI-020 e implementación están fuera de orden.`,
      );
    }


    } else {
      const forbiddenCollections = [
        lane.conditional_artifacts ?? [],
        lane.conditional_implementation_artifacts ?? [],
        lane.execution_prerequisite_artifacts ?? [],
        lane.implementation_artifacts ?? [],
        lane.post_package_artifacts ?? [],
        lane.post_implementation_artifacts ?? [],
      ];
      if (forbiddenCollections.some((collection) => collection.length > 0)) {
        errors.push(`${lane.lane_id}: DOCUMENTATION_PRIORITY solo admite required_task_artifacts y deferred_but_preserved.`);
      }
      const expectedStageSources = requiredIds.map(
        (id) => `required_task_artifacts.${id}`,
      );
      const stages = lane.ordered_execution_stages ?? [];
      const expectedOrders = expectedStageSources.map((_, index) => index + 1);
      if (!equalArray(stages.map((stage) => stage.order), expectedOrders)) {
        errors.push(`${lane.lane_id}: DOCUMENTATION_PRIORITY debe numerar sus etapas desde 1 sin huecos.`);
      }
      if (!equalArray(stages.map((stage) => stage.task_source), expectedStageSources)) {
        errors.push(`${lane.lane_id}: DOCUMENTATION_PRIORITY debe seguir exactamente sus required_task_artifacts.`);
      }
      if (stages.some((stage) => !stage.stage_id || !stage.rule)) {
        errors.push(`${lane.lane_id}: cada etapa documental debe declarar stage_id y rule.`);
      }
    }

    if (lane.lane_id === 'NEXO-REMISSIONS-001') {
      validateExactGroups({
        laneId: lane.lane_id,
        artifacts: lane.required_task_artifacts ?? [],
        expected: adaptiveExpectedGroups(EXPECTED_REQUIRED_GROUPS, taskIds, new Map([
          ['H_SHARED_AUDIT', ['SHELL-AUD']],
          ['H_SHARED_DISTRIBUTION', ['SHELL-PKG']],
        ])),
        errors,
        label: 'grupos obligatorios de diseño',
        taskIds,
      });
      validateExactGroups({
        laneId: lane.lane_id,
        artifacts: lane.execution_prerequisite_artifacts ?? [],
        expected: EXPECTED_EXECUTION_PREREQUISITES,
        errors,
        label: 'prerrequisitos de ejecución',
        taskIds,
      });
      validateExactGroups({
        laneId: lane.lane_id,
        artifacts: lane.implementation_artifacts ?? [],
        expected: adaptiveExpectedGroups(EXPECTED_IMPLEMENTATION_GROUPS, taskIds, new Map([
          ['H_SHARED_CONTRACTS', ['SHELL-CON']],
          ['H_SHARED_REMAINING', [
            'SHELL-NORM',
            'SHELL-DB',
            'SHELL-UI',
            'SHELL-MIG',
            'SHELL-NATIVE',
            'SHELL-APP',
          ]],
        ])),
        errors,
        label: 'grupos obligatorios de implementación',
        taskIds,
      });
      if (!equalArray(
        conditionalDesignIds,
        EXPECTED_CONDITIONAL_DESIGN_GROUP_IDS,
      )) {
        errors.push(
          `${lane.lane_id}: faltan grupos condicionales de diseño o están fuera del orden auditado.`,
        );
      }
      for (const [groupId, expectedTasks] of EXPECTED_CONDITIONAL_DESIGN_GROUPS) {
        const artifact = (lane.conditional_artifacts ?? []).find(
          ({ artifact_group_id: candidate }) => candidate === groupId,
        );
        if (!equalArray(artifact ? artifactTaskRefs(artifact, taskIds) : [], expectedTasks)) {
          errors.push(`${lane.lane_id}: ${groupId} omite tareas o altera su orden.`);
        }
      }
      if (!equalArray(
        conditionalImplementationIds,
        EXPECTED_CONDITIONAL_IMPLEMENTATION_GROUP_IDS,
      )) {
        errors.push(
          `${lane.lane_id}: faltan grupos condicionales de implementación o están fuera del orden auditado.`,
        );
      }
      for (
        const [groupId, expectedTasks]
        of EXPECTED_CONDITIONAL_IMPLEMENTATION_GROUPS
      ) {
        const artifact = (
          lane.conditional_implementation_artifacts ?? []
        ).find(({ artifact_group_id: candidate }) => candidate === groupId);
        if (!equalArray(artifact ? artifactTaskRefs(artifact, taskIds) : [], expectedTasks)) {
          errors.push(`${lane.lane_id}: ${groupId} omite tareas o altera su orden.`);
        }
      }
      validateExactGroups({
        laneId: lane.lane_id,
        artifacts: lane.post_package_artifacts ?? [],
        expected: EXPECTED_POST_PACKAGE_GROUPS,
        errors,
        label: 'planes o gates E5 posteriores al paquete',
        taskIds,
      });
      validateExactGroups({
        laneId: lane.lane_id,
        artifacts: lane.post_implementation_artifacts ?? [],
        expected: EXPECTED_POST_IMPLEMENTATION_GROUPS,
        errors,
        label: 'certificaciones posteriores a la implementación',
        taskIds,
      });

      const deferred = new Set(
        (lane.deferred_but_preserved ?? []).flatMap((item) => artifactTaskRefs(item, taskIds)),
      );
      for (const taskId of [
        'AUTH-DB-030',
        'AUTH-DB-031',
        'AUTH-DEV-015',
        'AUTH-DEV-016',
        ...range('NEXO-DOM', 2, 38),
        ...range('NEXO-AUTH', 21, 32),
        ...range('NEXO-UX', 26, 48),
      ]) {
        if (!deferred.has(taskId)) {
          errors.push(`${lane.lane_id}: ${taskId} debe quedar preservada como posterior.`);
        }
      }
    }

    const unknownTasks = [...new Set(allTaskRefs(lane, taskIds))]
      .filter((taskId) => !taskIds.has(taskId));
    if (unknownTasks.length) {
      errors.push(`${lane.lane_id}: tareas inexistentes: ${unknownTasks.join(', ')}.`);
    }
  }

  const configuredPriorityLane = (data.lanes ?? []).find(
    (lane) => lane.lane_id === routePolicy?.priority_route_id,
  );
  if (!configuredPriorityLane) {
    errors.push('implementation_route_policy.priority_route_id debe existir en lanes.');
  } else if (configuredPriorityLane.active !== true || configuredPriorityLane.status === 'SUSPENDED') {
    errors.push(`${configuredPriorityLane.lane_id} debe estar activo mientras figure como priority_route_id.`);
  }

  const retiredLane = (data.lanes ?? []).find(
    (lane) => lane.lane_id === 'NEXO-REMISSIONS-001',
  );
  const laneIsActive = retiredLane?.active !== false
    && retiredLane?.status !== 'SUSPENDED';
  const requiredFragments = {
    order: [
      '<!-- PRIORITY-DELIVERY-LANES:START -->',
      'NEXO-REMISSIONS-001',
      'canonical_sequence_unchanged = true',
      '¿LA PRIORIDAD DE IMPLEMENTACIÓN ACTIVA ES REMISIONES NEXO?',
      laneIsActive
        ? 'Orden ejecutable de NEXO-REMISSIONS-001'
        : 'Registro histórico inactivo de NEXO-REMISSIONS-001',
      'desde la etapa 1 hasta la 44',
      'NEXO_INVENTORY_CLASSIFICATION',
      'CONDITIONAL_IMPLEMENTATION_SCOPE',
      'Los habilitadores PRE_E5_FOUNDATION aplicables pueden materializarse antes de E5 con autorización física explícita y evidencia propia.',
      'Ninguna migración o cambio físico POST_E5_PACKAGE perteneciente al paquete comienza antes',
      'CI_FOUNDATION',
      'R2_NEXO_DATABASE_PACKAGE',
      'E5_READINESS_PLAN',
      'U_AUTHORIZATION_CERTIFICATION',
      'SHELL-CI-024::NEXO-REMISSIONS-001',
      'execution-route.json',
    ],
    protocol: [
      '<!-- PRIORITY-PACKAGE-PROTOCOL:START -->',
      'global_task_partial_approval_forbidden',
      'E5-GATE-008::<package_id>',
      'NORMAL_CANONICAL_FLOW',
      'ordered_execution_stages',
      'deberá completar todo BLOQUE H',
      'execution-route.json',
    ],
    principles: [
      'Aplicación incremental sin aprobación parcial',
      'NEXO-REMISSIONS-001',
    ],
    gate: [
      'Instancia de puerta por paquete',
      'E5-GATE-008::<package_id>',
    ],
    delivery: [
      'SHELL-CI-020::<package_id>',
      'SHELL-CI-024::<package_id>',
      'no modifica el estado de la tarea canónica',
    ],
    nexo: laneIsActive
      ? ['Primer paquete vertical designado', 'NEXO-REMISSIONS-001', 'no es una tarea nueva']
      : ['Carril histórico suspendido', 'NEXO-REMISSIONS-001', 'no es una tarea nueva'],
  };

  for (const [documentId, fragments] of Object.entries(requiredFragments)) {
    const source = documents[documentId] ?? '';
    for (const fragment of fragments) {
      if (!source.includes(fragment)) {
        errors.push(`${documentId}: falta el contrato "${fragment}".`);
      }
    }
  }

  let executionRoute;
  try {
    executionRoute = JSON.parse(executionRouteSource);
  } catch {
    errors.push('execution-route.json no contiene JSON válido.');
  }
  if (executionRoute) {
    const selected = executionRoute.selected_route_id;
    const validRoutes = new Set([
      executionRoute.normal_route_id,
      ...laneIds,
    ]);
    if (executionRoute.selected_explicitly !== true || !validRoutes.has(selected)) {
      errors.push('execution-route.json no contiene una selección explícita reconocida.');
    }
    const projectsSelectedLane = activeSequenceSource.includes(`\"route_id\": \"${selected}\"`)
      || activeSequenceSource.includes(`\"resumed_after_priority_route_id\": \"${selected}\"`);
    if (laneIds.has(selected) && !projectsSelectedLane) {
      errors.push(`${selected}: active-sequence.json no proyecta el carril seleccionado.`);
    }
  }

  if (errors.length) {
    throw new Error(errors.join('\n- '));
  }

  return {
    lanes: laneIds.size,
    designated: (data.lanes ?? []).filter(
      (lane) => lane.status === 'DESIGNATED_NOT_READY',
    ).length,
    referencedTasks: new Set(
      (data.lanes ?? []).flatMap((lane) => allTaskRefs(lane, taskIds)),
    ).size,
  };
}

function readTaskIds(blocksRoot) {
  const taskIds = new Set();
  const pending = [blocksRoot];
  while (pending.length) {
    const current = pending.pop();
    for (const entry of fs.readdirSync(current, { withFileTypes: true })) {
      const fullPath = path.join(current, entry.name);
      if (entry.isDirectory()) {
        pending.push(fullPath);
      } else if (entry.isFile() && entry.name.endsWith('.md')) {
        const source = fs.readFileSync(fullPath, 'utf8');
        for (const match of source.matchAll(TASK_HEADING)) {
          taskIds.add(match.groups.id);
        }
      }
    }
  }
  return taskIds;
}

export function validatePriorityDeliveryLanes({ root = process.cwd() } = {}) {
  syncPriorityLaneOrderDocument({ root, check: true });
  const modularRoot = path.join(root, 'docs', 'plan-canonico', 'modular');
  const read = (relativePath) =>
    fs.readFileSync(path.join(modularRoot, relativePath), 'utf8');

  return validatePriorityDeliveryLaneData({
    data: JSON.parse(read('priority-delivery-lanes.json')),
    taskIds: readTaskIds(path.join(modularRoot, 'bloques')),
    activeSequenceSource: read('active-sequence.json'),
    executionRouteSource: read('execution-route.json'),
    documents: {
      order: read('90_ORDEN_DE_IMPLEMENTACION.md'),
      protocol: read('01_PROTOCOLO.md'),
      principles: read(
        'bloques/E5_PLANIFICACION_DE_IMPLEMENTACION/01_PRINCIPIOS_OBLIGATORIOS.md',
      ),
      gate: read(
        'bloques/E5_PLANIFICACION_DE_IMPLEMENTACION/06_PUERTA_DE_SALIDA_DE_E5.md',
      ),
      delivery: read(
        'bloques/T_CALIDAD_Y_DESPLIEGUE/04_DESPLIEGUE_PILOTO_Y_ESTABILIZACION.md',
      ),
      nexo: read('bloques/K_NEXO/00_INTRO.md'),
    },
  });
}

const isCli =
  process.argv[1]
  && path.resolve(process.argv[1]) === fileURLToPath(import.meta.url);
if (isCli) {
  try {
    const stats = validatePriorityDeliveryLanes();
    console.log(
      `OK: carriles prioritarios; ${stats.lanes} registrado(s); `
      + `${stats.designated} designado(s) no listo(s); `
      + `${stats.referencedTasks} tareas referenciadas.`,
    );
  } catch (error) {
    console.error(
      `ERROR: carriles prioritarios inválidos:\n- ${
        error instanceof Error ? error.message : String(error)
      }`,
    );
    process.exit(1);
  }
}
