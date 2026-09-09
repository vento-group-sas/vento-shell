import crypto from 'node:crypto';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

import { loadImplementationControl, validateImplementationControl } from './implementation-control.mjs';
import { loadPackageApplicationClosure } from './package-application-closure.mjs';
import { scanPackageReadiness } from './package-readiness-scanner.mjs';
import { resolveTaskWorkTopology } from './task-work-topology.mjs';

export const PLAN_OBLIGATION_CLOSURE_MODEL_ID = 'VENTO-PLAN-OBLIGATION-CLOSURE-V1';
const STRATEGIC_DELIVERY = 'ENTREGA 1 - HACER DEMOSTRABLE QUE FALTA PARA TERMINAR';
const BLOCK_U_SEQUENCE = 'PHASE-13-U-INTEGRAL-CERTIFICATION';
const REPORT_JSON = '.delivery/plan-obligation-closure.json';
const REPORT_MARKDOWN = '.delivery/plan-obligation-closure.md';
const NON_UNIT_VALUES = new Set([
  '',
  'NONE',
  'NO_APLICA',
  'NOT_APPLICABLE',
  'PENDIENTE',
  'BLOQUEADO',
  'UNRESOLVED',
  'NO_MATERIALIZADO',
  'NO MATERIALIZADO',
]);

function fail(message) {
  throw new Error(message);
}

function sha256(value) {
  return crypto.createHash('sha256').update(String(value ?? ''), 'utf8').digest('hex');
}

function stableJson(value) {
  if (Array.isArray(value)) return `[${value.map((entry) => stableJson(entry)).join(',')}]`;
  if (value && typeof value === 'object') {
    return `{${Object.keys(value).sort().map((key) => `${JSON.stringify(key)}:${stableJson(value[key])}`).join(',')}}`;
  }
  return JSON.stringify(value);
}

function uniqueSorted(values) {
  return [...new Set((values ?? []).map((value) => String(value ?? '').trim()).filter(Boolean))]
    .sort((left, right) => left.localeCompare(right, 'en'));
}

function taskState(task) {
  const direct = String(task?.state ?? '').trim();
  if (direct) return direct;
  const marker = String(task?.marker ?? '').trim();
  if (marker === '[ ]') return 'NO INICIADA';
  if (marker === '[~]' || marker === '🟡') return 'PROPUESTA PARA APROBACION';
  if (marker === '❌') return 'RECHAZADA';
  return 'APROBADA';
}

function isApproved(state) {
  return ['APROBADA', 'APROBADO', 'CERRADA', 'CERRADO'].includes(String(state ?? '').toUpperCase());
}

export function normalizeImplementationUnit(value) {
  const raw = String(value ?? '').trim();
  if (NON_UNIT_VALUES.has(raw.toUpperCase())) return null;
  return raw || null;
}

function evidenceCount(instance) {
  return Array.isArray(instance?.evidence) ? instance.evidence.length : 0;
}

function summarizeInstance(instance) {
  return {
    instance_id: instance.instance_id,
    task_id: instance.task_id,
    status: instance.status,
    evidence_count: evidenceCount(instance),
    has_authorization: Boolean(instance.authorization),
    target_repositories: uniqueSorted(instance.target_repositories),
  };
}

function addPackageRef(map, taskId, pkg, role) {
  if (!taskId) return;
  let byPackage = map.get(taskId);
  if (!byPackage) {
    byPackage = new Map();
    map.set(taskId, byPackage);
  }
  let row = byPackage.get(pkg.package_id);
  if (!row) {
    row = {
      package_id: pkg.package_id,
      source_kind: pkg.source_kind,
      status: pkg.status,
      roles: new Set(),
      implementation_unit_id: normalizeImplementationUnit(
        pkg?.canonical_prerequisites?.implementation_unit_id,
      ),
    };
    byPackage.set(pkg.package_id, row);
  }
  row.roles.add(role);
}

function buildPackageReferenceMap(packages) {
  const refs = new Map();
  for (const pkg of packages) {
    for (const taskId of pkg.primary_task_ids ?? []) addPackageRef(refs, taskId, pkg, 'PRIMARY_TASK');
    for (const taskId of pkg.support_task_ids ?? []) addPackageRef(refs, taskId, pkg, 'SUPPORT_TASK');
    if (pkg.dominant_task_id) addPackageRef(refs, pkg.dominant_task_id, pkg, 'DOMINANT_TASK');
    for (const task of pkg?.task_prerequisites?.tasks ?? []) {
      if (task?.task_id) addPackageRef(refs, task.task_id, pkg, 'READINESS_PREREQUISITE');
    }
  }
  return refs;
}

function finalizePackageRefs(refMap, taskId) {
  return [...(refMap.get(taskId)?.values() ?? [])]
    .map((entry) => ({ ...entry, roles: uniqueSorted([...entry.roles]) }))
    .sort((left, right) => left.package_id.localeCompare(right.package_id, 'en'));
}

function buildReverseDependencies(dependencies) {
  const execution = new Map();
  const development = new Map();
  const add = (map, dependencyId, consumerId) => {
    const rows = map.get(dependencyId) ?? [];
    rows.push(consumerId);
    map.set(dependencyId, uniqueSorted(rows));
  };
  for (const [consumerId, parsed] of dependencies) {
    for (const dependencyId of parsed?.execution ?? []) add(execution, dependencyId, consumerId);
    for (const dependencyId of parsed?.development ?? []) add(development, dependencyId, consumerId);
  }
  return { execution, development };
}

function buildPackageApplicationMap(applicationClosure, readiness) {
  const map = new Map();
  const add = (packageId, appId, source) => {
    const normalized = String(appId ?? '').trim().toLowerCase();
    if (!packageId || !normalized) return;
    const row = map.get(packageId) ?? new Map();
    const sources = row.get(normalized) ?? new Set();
    sources.add(source);
    row.set(normalized, sources);
    map.set(packageId, row);
  };

  for (const pkg of applicationClosure?.packages ?? []) {
    if (pkg.owner_application) add(pkg.package_id, pkg.owner_application, 'PACKAGE_OWNER');
    for (const relation of pkg?.relations?.CONSUMIDO_POR ?? []) {
      add(pkg.package_id, relation.application_id, 'PACKAGE_CONSUMER');
    }
  }

  for (const capability of Object.values(readiness?.capabilityIndex?.capabilities ?? {})) {
    const packageId = capability?.canonical_package_id;
    if (packageId && capability?.owner_application) {
      add(packageId, capability.owner_application, 'SPECIAL_CAPABILITY_OWNER');
    }
  }
  return map;
}

function appsForPackageRefs(packageRefs, packageAppMap) {
  const apps = new Map();
  for (const ref of packageRefs) {
    for (const [appId, sources] of packageAppMap.get(ref.package_id) ?? []) {
      const current = apps.get(appId) ?? new Set();
      for (const source of sources) current.add(`${ref.package_id}:${source}`);
      apps.set(appId, current);
    }
  }
  return apps;
}

function mergeAppMaps(...maps) {
  const result = new Map();
  for (const map of maps) {
    for (const [appId, sources] of map) {
      const current = result.get(appId) ?? new Set();
      for (const source of sources) current.add(source);
      result.set(appId, current);
    }
  }
  return result;
}

export function treatmentClass(mode) {
  const byMode = {
    DEFINE_ONCE: 'DEFINITION_CONSUMPTION',
    GLOBAL_ENABLE_ONCE: 'GLOBAL_FOUNDATION',
    TEMPLATE_PER_PACKAGE: 'PACKAGE_OBLIGATION',
    PER_IMPLEMENTATION_UNIT: 'IMPLEMENTATION_UNIT',
    PER_PACKAGE_AND_GLOBAL_FINAL: 'PACKAGE_AND_GLOBAL_CERTIFICATION',
    GLOBAL_FINAL: 'GLOBAL_FINAL_CERTIFICATION',
  };
  return byMode[mode] ?? 'UNKNOWN';
}

export function classifyTaskTreatment({
  task,
  topologyEntry,
  instances = [],
  packageRefs = [],
  reverseExecutionConsumers = [],
  appRelationState = 'UNRESOLVED',
}) {
  const state = taskState(task);
  const approved = isApproved(state);
  const mode = topologyEntry.mode;
  const packageIds = uniqueSorted(packageRefs.map((entry) => entry.package_id));
  const unitIds = uniqueSorted(packageRefs.map((entry) => entry.implementation_unit_id));
  const incidences = [];
  let treatmentStatus = approved ? 'TRACEABLE' : 'TRACEABLE_CANONICAL_PENDING';
  let expectedInstanceIds = [];

  if (mode === 'DEFINE_ONCE') {
    if (approved && packageIds.length === 0 && reverseExecutionConsumers.length === 0) {
      incidences.push('DEFINE_ONCE_WITHOUT_EXPLICIT_CONSUMER_RELATION');
      treatmentStatus = 'INCIDENCE';
    }
  } else if (mode === 'GLOBAL_ENABLE_ONCE') {
    expectedInstanceIds = [`${task.id}::GLOBAL`];
  } else if (mode === 'GLOBAL_FINAL') {
    expectedInstanceIds = [`${task.id}::GLOBAL-FINAL`];
  } else if (mode === 'PER_IMPLEMENTATION_UNIT') {
    if (approved && topologyEntry.executionGate !== 'UNREVIEWED' && unitIds.length === 0 && instances.length === 0) {
      incidences.push('NO_EXPLICIT_IMPLEMENTATION_UNIT_RELATION');
      treatmentStatus = 'INCIDENCE';
    }
  } else if (mode === 'TEMPLATE_PER_PACKAGE') {
    if (approved && topologyEntry.executionGate !== 'UNREVIEWED' && packageIds.length === 0 && instances.length === 0) {
      incidences.push('NO_EXPLICIT_PACKAGE_APPLICABILITY_RELATION');
      treatmentStatus = 'INCIDENCE';
    }
  } else if (mode === 'PER_PACKAGE_AND_GLOBAL_FINAL') {
    expectedInstanceIds = [`${task.id}::GLOBAL-FINAL`];
    const packageInstances = instances.filter((entry) => entry.instance_id !== `${task.id}::GLOBAL-FINAL`);
    if (approved && topologyEntry.executionGate !== 'UNREVIEWED'
      && packageIds.length === 0 && packageInstances.length === 0) {
      incidences.push('NO_EXPLICIT_PACKAGE_APPLICABILITY_RELATION');
      treatmentStatus = 'INCIDENCE';
    }
  } else {
    incidences.push('UNKNOWN_TOPOLOGY_MODE');
    treatmentStatus = 'INCIDENCE';
  }

  const globallyScoped = ['GLOBAL_ENABLE_ONCE', 'GLOBAL_FINAL'].includes(mode);
  if (approved && !globallyScoped && appRelationState === 'UNRESOLVED') {
    incidences.push('NO_EXPLICIT_APPLICATION_RELATION');
    treatmentStatus = 'INCIDENCE';
  }

  const verifiedWithEvidence = instances.filter(
    (entry) => entry.status === 'VERIFIED' && evidenceCount(entry) > 0,
  );

  return {
    treatment_class: treatmentClass(mode),
    treatment_status: treatmentStatus,
    expected_instance_ids: expectedInstanceIds,
    package_ids: packageIds,
    implementation_unit_ids: unitIds,
    explicit_instance_count: instances.length,
    verified_with_evidence_count: verifiedWithEvidence.length,
    incidences: uniqueSorted(incidences),
  };
}

function countValues(values) {
  const counts = {};
  for (const value of values) counts[value] = (counts[value] ?? 0) + 1;
  return counts;
}

function sortedCountEntries(counts) {
  return Object.entries(counts)
    .sort((left, right) => right[1] - left[1] || left[0].localeCompare(right[0], 'en'));
}

export function buildPlanObligationClosure({ root = process.cwd() } = {}) {
  const topologyResult = resolveTaskWorkTopology({ root });
  const control = loadImplementationControl({ root });
  const controlErrors = validateImplementationControl(control, topologyResult);
  if (controlErrors.length > 0) fail(`IMPLEMENTATION_CONTROL_INVALID: ${controlErrors.join(' | ')}`);

  const readiness = scanPackageReadiness({
    root,
    check: true,
    trigger: 'plan-obligation-closure',
    supplied: { skipDerivedReports: true },
  });
  const applicationClosure = loadPackageApplicationClosure({ root, registry: readiness.registry });

  const instancesByTask = new Map();
  for (const instance of control.instances ?? []) {
    const rows = instancesByTask.get(instance.task_id) ?? [];
    rows.push(instance);
    instancesByTask.set(instance.task_id, rows);
  }
  for (const rows of instancesByTask.values()) {
    rows.sort((left, right) => left.instance_id.localeCompare(right.instance_id, 'en'));
  }

  const packageRefMap = buildPackageReferenceMap(readiness.registry.packages ?? []);
  const packageAppMap = buildPackageApplicationMap(applicationClosure, readiness);
  const reverse = buildReverseDependencies(topologyResult.dependencies);
  const tasks = [];

  for (const task of topologyResult.ordered) {
    const topologyEntry = topologyResult.topology.get(task.id);
    const instances = instancesByTask.get(task.id) ?? [];
    const packageRefs = finalizePackageRefs(packageRefMap, task.id);
    const reverseExecutionConsumers = reverse.execution.get(task.id) ?? [];
    const reverseDevelopmentConsumers = reverse.development.get(task.id) ?? [];

    const directApps = appsForPackageRefs(packageRefs, packageAppMap);
    const consumerApps = mergeAppMaps(...reverseExecutionConsumers.map((consumerTaskId) => (
      appsForPackageRefs(finalizePackageRefs(packageRefMap, consumerTaskId), packageAppMap)
    )));
    const appMap = mergeAppMaps(directApps, consumerApps);
    const explicitApps = [...appMap.entries()]
      .map(([applicationId, sources]) => ({
        application_id: applicationId,
        sources: uniqueSorted([...sources]),
      }))
      .sort((left, right) => left.application_id.localeCompare(right.application_id, 'en'));
    const globallyScoped = ['GLOBAL_ENABLE_ONCE', 'GLOBAL_FINAL'].includes(topologyEntry.mode);
    const appRelationState = explicitApps.length > 0
      ? 'EXPLICIT'
      : globallyScoped
        ? 'GLOBAL_TRANSVERSAL'
        : 'UNRESOLVED';

    const treatment = classifyTaskTreatment({
      task,
      topologyEntry,
      instances,
      packageRefs,
      reverseExecutionConsumers,
      appRelationState,
    });

    tasks.push({
      task_id: task.id,
      title: task.title,
      task_state: taskState(task),
      source_path: task.relativePath ?? null,
      sequence_id: topologyEntry.sequenceId,
      mode: topologyEntry.mode,
      execution_gate: topologyEntry.executionGate,
      treatment,
      explicit_instances: instances.map(summarizeInstance),
      package_references: packageRefs,
      reverse_execution_consumers: reverseExecutionConsumers,
      reverse_development_consumers: reverseDevelopmentConsumers,
      application_relation_state: appRelationState,
      applications: explicitApps,
    });
  }

  const incidences = tasks.flatMap((row) => row.treatment.incidences.map((code) => ({
    task_id: row.task_id,
    sequence_id: row.sequence_id,
    mode: row.mode,
    application_relation_state: row.application_relation_state,
    code,
  })));

  const expectedSpecialIds = uniqueSorted(readiness?.contract?.canonical_package_catalog?.special_package_ids);
  const observedSpecials = (readiness.registry.packages ?? [])
    .filter((pkg) => pkg.source_kind === 'SPECIAL_CAPABILITY')
    .map((pkg) => ({
      package_id: pkg.package_id,
      source_kind: pkg.source_kind,
      status: pkg.status,
      blockers: pkg.blockers ?? [],
      owner_application: Object.values(readiness?.capabilityIndex?.capabilities ?? {})
        .find((capability) => capability?.canonical_package_id === pkg.package_id)?.owner_application ?? null,
    }))
    .sort((left, right) => left.package_id.localeCompare(right.package_id, 'en'));
  const observedSpecialIds = observedSpecials.map((row) => row.package_id);
  const missingSpecialIds = expectedSpecialIds.filter((id) => !observedSpecialIds.includes(id));
  const unexpectedSpecialIds = observedSpecialIds.filter((id) => !expectedSpecialIds.includes(id));

  const blockUTasks = tasks.filter((row) => row.sequence_id === BLOCK_U_SEQUENCE);
  const globalFinalTasks = tasks.filter((row) => row.mode === 'GLOBAL_FINAL');
  const packageAndGlobalTasks = tasks.filter((row) => row.mode === 'PER_PACKAGE_AND_GLOBAL_FINAL');
  const foundations = tasks.filter((row) => row.mode === 'GLOBAL_ENABLE_ONCE');
  const modeCounts = countValues(tasks.map((row) => row.mode));
  const taskStateCounts = countValues(tasks.map((row) => row.task_state));
  const treatmentCounts = countValues(tasks.map((row) => row.treatment.treatment_status));
  const incidenceCodeCounts = countValues(incidences.map((row) => row.code));

  const applications = (applicationClosure.applications ?? []).map((app) => {
    const relatedTasks = tasks.filter((row) => (
      row.applications.some(({ application_id: id }) => id === app.application_id)
    ));
    return {
      application_id: app.application_id,
      package_scope: {
        owned_package_ids: app.owned_package_ids,
        consumed_package_ids: app.consumed_package_ids,
        related_package_ids: app.related_package_ids,
        closed_package_ids: app.closed_package_ids,
        open_package_ids: app.open_package_ids,
        package_completion_state: app.completion_state,
      },
      task_obligation_ids: relatedTasks.map((row) => row.task_id),
      task_obligation_count: relatedTasks.length,
      task_incidence_ids: relatedTasks
        .filter((row) => row.treatment.incidences.length > 0)
        .map((row) => row.task_id),
    };
  }).sort((left, right) => left.application_id.localeCompare(right.application_id, 'en'));

  const metrics = {
    canonical_task_obligations: tasks.length,
    classified_task_obligations: tasks.filter((row) => row.treatment.treatment_class !== 'UNKNOWN').length,
    mode_counts: modeCounts,
    task_state_counts: taskStateCounts,
    treatment_status_counts: treatmentCounts,
    incidence_code_counts: incidenceCodeCounts,
    physical_instances: (control.instances ?? []).length,
    verified_physical_instances: (control.instances ?? []).filter((instance) => instance.status === 'VERIFIED').length,
    verified_instances_with_evidence: (control.instances ?? [])
      .filter((instance) => instance.status === 'VERIFIED' && evidenceCount(instance) > 0).length,
    tasks_with_explicit_instance: tasks.filter((row) => row.explicit_instances.length > 0).length,
    tasks_with_package_reference: tasks.filter((row) => row.package_references.length > 0).length,
    tasks_with_explicit_application_relation: tasks
      .filter((row) => row.application_relation_state === 'EXPLICIT').length,
    tasks_with_unresolved_application_relation: tasks
      .filter((row) => row.application_relation_state === 'UNRESOLVED').length,
    global_transversal_tasks: tasks
      .filter((row) => row.application_relation_state === 'GLOBAL_TRANSVERSAL').length,
    incidence_tasks: tasks.filter((row) => row.treatment.incidences.length > 0).length,
    incidence_relations: incidences.length,
    foundations_total: foundations.length,
    foundations_verified_with_evidence: foundations.filter((row) => row.explicit_instances.some(
      (instance) => instance.status === 'VERIFIED' && instance.evidence_count > 0,
    )).length,
    special_records_expected: expectedSpecialIds.length,
    special_records_observed: observedSpecialIds.length,
    block_u_tasks: blockUTasks.length,
    global_final_tasks: globalFinalTasks.length,
    package_and_global_final_tasks: packageAndGlobalTasks.length,
    global_final_instances_present: globalFinalTasks.filter((row) => row.explicit_instances.some(
      (instance) => instance.instance_id === `${row.task_id}::GLOBAL-FINAL`,
    )).length,
    package_and_global_final_certifications_present: packageAndGlobalTasks.filter((row) => (
      row.explicit_instances.some((instance) => instance.instance_id === `${row.task_id}::GLOBAL-FINAL`)
    )).length,
    package_application_closure: applicationClosure.metrics,
  };

  const structuralCoverage = {
    all_tasks_classified: tasks.length === topologyResult.topology.size
      && tasks.every((row) => row.treatment.treatment_class !== 'UNKNOWN'),
    every_incidence_has_concrete_code: incidences.every((row) => row.task_id && row.code),
    every_task_has_traceable_treatment_or_incidence: tasks.every((row) => (
      row.treatment.treatment_status !== 'INCIDENCE' || row.treatment.incidences.length > 0
    )),
    special_identity_set_matches_contract: missingSpecialIds.length === 0 && unexpectedSpecialIds.length === 0,
    product_completion_claim: false,
  };

  const report = {
    schema_version: 1,
    model_id: PLAN_OBLIGATION_CLOSURE_MODEL_ID,
    strategic_delivery: STRATEGIC_DELIVERY,
    generated_at: new Date().toISOString(),
    repository: {
      head: null,
      origin_main: null,
      branch: null,
    },
    invariants: {
      no_prefix_application_inference: true,
      package_reference_is_not_implementation_relation: true,
      implementation_relation_requires_explicit_unit_or_instance: true,
      unresolved_application_relation_remains_visible: true,
      incidence_is_not_product_completion: true,
      product_completion_claim: false,
    },
    metrics,
    special_capability_records: {
      expected_ids: expectedSpecialIds,
      observed: observedSpecials,
      missing_ids: missingSpecialIds,
      unexpected_ids: unexpectedSpecialIds,
    },
    block_u: blockUTasks.map((row) => ({
      task_id: row.task_id,
      mode: row.mode,
      task_state: row.task_state,
      treatment_status: row.treatment.treatment_status,
      incidences: row.treatment.incidences,
    })),
    global_final: {
      tasks: globalFinalTasks.map((row) => ({
        task_id: row.task_id,
        task_state: row.task_state,
        expected_instance_ids: row.treatment.expected_instance_ids,
        explicit_instances: row.explicit_instances,
        incidences: row.treatment.incidences,
      })),
      package_and_global_final_tasks: packageAndGlobalTasks.map((row) => ({
        task_id: row.task_id,
        task_state: row.task_state,
        package_ids: row.treatment.package_ids,
        expected_global_final_instance_id: `${row.task_id}::GLOBAL-FINAL`,
        global_final_instance: row.explicit_instances
          .find((instance) => instance.instance_id === `${row.task_id}::GLOBAL-FINAL`) ?? null,
        incidences: row.treatment.incidences,
      })),
    },
    applications,
    incidences,
    tasks,
    unresolved_application_task_ids: tasks
      .filter((row) => row.application_relation_state === 'UNRESOLVED')
      .map((row) => row.task_id),
    global_transversal_task_ids: tasks
      .filter((row) => row.application_relation_state === 'GLOBAL_TRANSVERSAL')
      .map((row) => row.task_id),
    structural_coverage: structuralCoverage,
  };

  report.fingerprint_sha256 = sha256(stableJson({
    model_id: report.model_id,
    invariants: report.invariants,
    metrics: report.metrics,
    special_capability_records: report.special_capability_records,
    block_u: report.block_u,
    global_final: report.global_final,
    applications: report.applications,
    incidences: report.incidences,
    tasks: report.tasks,
    structural_coverage: report.structural_coverage,
  }));
  return report;
}

export function assertPlanObligationClosure(report) {
  const coverage = report?.structural_coverage ?? {};
  const failures = [];
  if (!coverage.all_tasks_classified) failures.push('ALL_TASKS_CLASSIFIED');
  if (!coverage.every_incidence_has_concrete_code) failures.push('CONCRETE_INCIDENCE_CODES');
  if (!coverage.every_task_has_traceable_treatment_or_incidence) {
    failures.push('TRACEABLE_TREATMENT_OR_INCIDENCE');
  }
  if (!coverage.special_identity_set_matches_contract) failures.push('SPECIAL_IDENTITY_SET');
  if (coverage.product_completion_claim !== false) failures.push('PRODUCT_COMPLETION_CLAIM');
  if (failures.length > 0) fail(`PLAN_OBLIGATION_CLOSURE_FAILED: ${failures.join(', ')}`);
  return true;
}

function markdownCell(value) {
  return String(value ?? '—')
    .replaceAll('|', '\\|')
    .replace(/\r?\n/gu, '<br>')
    .trim() || '—';
}

export function renderPlanObligationClosureMarkdown(report) {
  const modeRows = sortedCountEntries(report.metrics.mode_counts)
    .map(([mode, count]) => `| \`${mode}\` | ${count} |`)
    .join('\n');
  const treatmentRows = sortedCountEntries(report.metrics.treatment_status_counts)
    .map(([status, count]) => `| \`${status}\` | ${count} |`)
    .join('\n');
  const incidenceRows = sortedCountEntries(report.metrics.incidence_code_counts)
    .map(([code, count]) => `| \`${code}\` | ${count} |`)
    .join('\n');
  const applicationRows = report.applications.map((app) => (
    `| \`${app.application_id}\` | ${app.task_obligation_count} | ${app.task_incidence_ids.length} | `
      + `${app.package_scope.open_package_ids.length} | \`${app.package_scope.package_completion_state}\` |`
  )).join('\n');
  const taskIncidenceRows = report.tasks
    .filter((row) => row.treatment.incidences.length > 0)
    .map((row) => (
      `| \`${row.task_id}\` | \`${row.mode}\` | \`${row.task_state}\` | `
      + `\`${row.application_relation_state}\` | ${markdownCell(row.treatment.incidences.join(', '))} |`
    )).join('\n');

  return `# VENTO — Cierre derivado de obligaciones del plan\n\n`
    + `> Artefacto derivado. No es fuente canónica ni afirma que el producto esté terminado.\n\n`
    + `## Integridad\n\n`
    + `- Modelo: \`${report.model_id}\`\n`
    + `- Fingerprint: \`${report.fingerprint_sha256}\`\n`
    + `- Obligaciones clasificadas: **${report.metrics.classified_task_obligations}/${report.metrics.canonical_task_obligations}**\n`
    + `- Tareas con incidencias: **${report.metrics.incidence_tasks}**\n`
    + `- Relaciones de incidencia: **${report.metrics.incidence_relations}**\n`
    + `- Relaciones de aplicación no resueltas: **${report.metrics.tasks_with_unresolved_application_relation}**\n`
    + `- Claim de producto terminado: **NO**\n\n`
    + `## Modalidades de tratamiento\n\n| Modalidad | Tareas |\n| --- | ---: |\n${modeRows}\n\n`
    + `## Estados de tratamiento\n\n| Estado | Tareas |\n| --- | ---: |\n${treatmentRows}\n\n`
    + `## Incidencias por código\n\n| Incidencia | Relaciones |\n| --- | ---: |\n${incidenceRows || '| `NONE` | 0 |'}\n\n`
    + `## Aplicaciones\n\n| Aplicación | Obligaciones relacionadas | Tareas con incidencia | Packages abiertos | Estado package |\n`
    + `| --- | ---: | ---: | ---: | --- |\n${applicationRows}\n\n`
    + `## Cobertura especial y certificaciones\n\n`
    + `- Fundaciones: ${report.metrics.foundations_verified_with_evidence}/${report.metrics.foundations_total} verificadas con evidencia.\n`
    + `- Packages especiales: ${report.metrics.special_records_observed}/${report.metrics.special_records_expected}.\n`
    + `- BLOQUE U: ${report.metrics.block_u_tasks} tareas.\n`
    + `- GLOBAL_FINAL: ${report.metrics.global_final_tasks} tareas; ${report.metrics.global_final_instances_present} instancias presentes.\n`
    + `- PER_PACKAGE_AND_GLOBAL_FINAL: ${report.metrics.package_and_global_final_tasks} tareas; `
    + `${report.metrics.package_and_global_final_certifications_present} certificaciones GLOBAL-FINAL presentes.\n\n`
    + `## Tareas con incidencias trazables\n\n`
    + `| Tarea | Modalidad | Estado canónico | Relación de aplicación | Incidencias |\n`
    + `| --- | --- | --- | --- | --- |\n${taskIncidenceRows || '| — | — | — | — | — |'}\n`;
}

export function writePlanObligationClosure({ root = process.cwd(), report = null } = {}) {
  const effective = report ?? buildPlanObligationClosure({ root });
  assertPlanObligationClosure(effective);
  const jsonPath = path.join(root, REPORT_JSON);
  const markdownPath = path.join(root, REPORT_MARKDOWN);
  fs.mkdirSync(path.dirname(jsonPath), { recursive: true });
  fs.writeFileSync(jsonPath, `${JSON.stringify(effective, null, 2)}\n`, 'utf8');
  fs.writeFileSync(markdownPath, renderPlanObligationClosureMarkdown(effective), 'utf8');
  return { report: effective, jsonPath, markdownPath };
}

function parseArgs(argv) {
  const allowed = new Set(['--check', '--write']);
  const unknown = argv.filter((arg) => !allowed.has(arg));
  if (unknown.length > 0) fail(`argumentos desconocidos: ${unknown.join(', ')}`);
  if (argv.includes('--check') && argv.includes('--write')) fail('--check y --write son mutuamente excluyentes.');
  return { write: argv.includes('--write') };
}

function printSummary(report, paths = null) {
  console.log('PLAN_OBLIGATION_CLOSURE: PASS');
  console.log(`MODEL_ID: ${report.model_id}`);
  console.log(`TASKS: ${report.metrics.canonical_task_obligations}`);
  console.log(`CLASSIFIED: ${report.metrics.classified_task_obligations}`);
  console.log(`INCIDENCE_TASKS: ${report.metrics.incidence_tasks}`);
  console.log(`INCIDENCE_RELATIONS: ${report.metrics.incidence_relations}`);
  console.log(`UNRESOLVED_APPLICATION_RELATIONS: ${report.metrics.tasks_with_unresolved_application_relation}`);
  console.log(`SPECIAL_RECORDS: ${report.metrics.special_records_observed}/${report.metrics.special_records_expected}`);
  console.log(`PRODUCT_COMPLETION_CLAIM: NO`);
  console.log(`FINGERPRINT_SHA256: ${report.fingerprint_sha256}`);
  if (paths) {
    console.log(`REPORT_JSON: ${paths.jsonPath}`);
    console.log(`REPORT_MARKDOWN: ${paths.markdownPath}`);
  }
}

function main() {
  const args = parseArgs(process.argv.slice(2));
  const root = process.cwd();
  const report = buildPlanObligationClosure({ root });
  assertPlanObligationClosure(report);
  if (args.write) {
    const written = writePlanObligationClosure({ root, report });
    printSummary(report, written);
    return;
  }
  printSummary(report);
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
