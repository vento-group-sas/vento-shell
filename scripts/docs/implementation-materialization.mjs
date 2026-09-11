import crypto from 'node:crypto';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

import { loadImplementationControl, validateImplementationControl } from './implementation-control.mjs';
import { scanPackageReadiness } from './package-readiness-scanner.mjs';
import { resolveTaskWorkTopology } from './task-work-topology.mjs';

export const IMPLEMENTATION_MATERIALIZATION_MAP_PATH =
  'docs/plan-canonico/modular/implementation-materialization-map.json';
export const IMPLEMENTATION_MATERIALIZATION_MAP_ID =
  'CANONICAL-IMPLEMENTATION-MATERIALIZATION-001';

const COMPLETION_RULES = new Set(['ALL_REQUIRED', 'ANY_ACCEPTABLE']);
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

const ACTIVE_PHYSICAL_STATUSES = new Set([
  'AUTHORIZED',
  'IN_PROGRESS',
  'IMPLEMENTED',
]);
const SINGLETON_PHYSICAL_MODES = new Set([
  'GLOBAL_ENABLE_ONCE',
  'GLOBAL_FINAL',
]);

export const TASK_PHYSICAL_STATE_CODES = Object.freeze({
  DOCUMENTARY_PENDING: 'DOCUMENTARY_PENDING',
  UNMAPPED: 'UNMAPPED',
  MAPPED: 'MAPPED',
  IN_IMPLEMENTATION: 'IN_IMPLEMENTATION',
  PARTIAL: 'PARTIAL',
  MATERIALIZED: 'MATERIALIZED',
});

export const ADOPTION_RECONCILIATION_CLASSIFICATION_CODES = Object.freeze([
  'EXISTING_NEEDS_ADOPTION_EVIDENCE',
  'PARTIAL_DELTA',
  'NOT_IMPLEMENTED',
  'CONTRADICTION',
  'REUSE_VERIFIED',
]);
const ADOPTION_RECONCILIATION_CLASSIFICATION_SET = new Set(
  ADOPTION_RECONCILIATION_CLASSIFICATION_CODES,
);

function fail(message) {
  throw new Error(message);
}

function stableJson(value) {
  if (Array.isArray(value)) return `[${value.map((entry) => stableJson(entry)).join(',')}]`;
  if (value && typeof value === 'object') {
    return `{${Object.keys(value).sort().map((key) => `${JSON.stringify(key)}:${stableJson(value[key])}`).join(',')}}`;
  }
  return JSON.stringify(value);
}

function sha256(value) {
  return crypto.createHash('sha256').update(String(value ?? ''), 'utf8').digest('hex');
}

function uniqueSorted(values) {
  return [...new Set((values ?? []).map((value) => String(value ?? '').trim()).filter(Boolean))]
    .sort((left, right) => left.localeCompare(right, 'en'));
}

function approvedTask(task) {
  const marker = String(task?.marker ?? '').trim();
  const state = String(task?.state ?? '').trim().toUpperCase();
  return marker === '✅' || marker === '[x]' || state === 'APROBADA' || state === 'APROBADO';
}

export function normalizeMaterializationUnitId(value) {
  const raw = String(value ?? '').trim();
  if (!raw || NON_UNIT_VALUES.has(raw.toUpperCase())) return null;
  if (!/^[A-Za-z0-9][A-Za-z0-9._-]*$/u.test(raw)) return null;
  return raw;
}

function validateStaticMap(map) {
  const errors = [];
  if (!map || typeof map !== 'object' || Array.isArray(map)) {
    return ['implementation-materialization-map debe ser un objeto JSON.'];
  }
  if (map.schema_version !== 1) errors.push('schema_version debe ser 1.');
  if (map.map_id !== IMPLEMENTATION_MATERIALIZATION_MAP_ID) {
    errors.push(`map_id debe ser ${IMPLEMENTATION_MATERIALIZATION_MAP_ID}.`);
  }

  const semantics = map.semantics;
  if (!semantics || typeof semantics !== 'object' || Array.isArray(semantics)) {
    errors.push('semantics debe ser un objeto.');
  } else {
    if (semantics.task_marker_scope !== 'DOCUMENTARY_CONTRACT_ONLY') {
      errors.push('semantics.task_marker_scope debe ser DOCUMENTARY_CONTRACT_ONLY.');
    }
    if (semantics.materialization_scope !== 'PHYSICAL_PRODUCT_RESULT') {
      errors.push('semantics.materialization_scope debe ser PHYSICAL_PRODUCT_RESULT.');
    }
    if (semantics.package_reference_is_materialization !== false) {
      errors.push('semantics.package_reference_is_materialization debe ser false.');
    }
    if (semantics.verified_requires_evidence !== true) {
      errors.push('semantics.verified_requires_evidence debe ser true.');
    }
    if (semantics.unknown_relation_behavior !== 'FAIL_CLOSED_AS_UNMAPPED') {
      errors.push('semantics.unknown_relation_behavior debe ser FAIL_CLOSED_AS_UNMAPPED.');
    }
    if (semantics.direct_instance_materializes_own_task !== true) {
      errors.push('semantics.direct_instance_materializes_own_task debe ser true.');
    }
  }

  if (!Array.isArray(map.relations)) errors.push('relations debe ser un arreglo.');
  return errors;
}

export function buildAdoptionReconciliationIndex(map, topologyResult = null) {
  const config = map?.adoption_reconciliation ?? null;
  const byTask = new Map();
  const counts = Object.fromEntries(
    ADOPTION_RECONCILIATION_CLASSIFICATION_CODES.map((code) => [code, 0]),
  );

  if (config === null) {
    return { config: null, byTask, counts, classified_tasks: 0 };
  }
  if (!config || typeof config !== 'object' || Array.isArray(config)) {
    fail('adoption_reconciliation debe ser un objeto.');
  }
  if (config.schema_version !== 1) fail('adoption_reconciliation.schema_version debe ser 1.');
  if (config.authority !== 'STEP_GLOBAL_04') fail('adoption_reconciliation.authority debe ser STEP_GLOBAL_04.');
  if (config.scope !== 'PRE_MATERIALIZATION_RECONCILIATION') {
    fail('adoption_reconciliation.scope debe ser PRE_MATERIALIZATION_RECONCILIATION.');
  }
  if (config.classification_is_materialization_claim !== false) {
    fail('adoption_reconciliation no puede declarar materialización.');
  }
  if (config.classification_is_task_to_unit_relation !== false) {
    fail('adoption_reconciliation no puede declarar relaciones TASK -> UNIT.');
  }
  if (config.unknown_classification_behavior !== 'UNCLASSIFIED') {
    fail('adoption_reconciliation.unknown_classification_behavior debe ser UNCLASSIFIED.');
  }
  const evidenceSources = Array.isArray(config.evidence_sources) ? config.evidence_sources : [];
  const evidenceSourceIds = new Set();
  for (const source of evidenceSources) {
    const sourceId = String(source?.source_id ?? '').trim();
    const reportFile = String(source?.report_file ?? '').trim();
    const reportSha = String(source?.report_sha256 ?? '').trim();
    if (!sourceId || evidenceSourceIds.has(sourceId)) {
      fail('adoption_reconciliation.evidence_sources contiene source_id vacío o duplicado.');
    }
    if (!reportFile || !/^[a-f0-9]{64}$/u.test(reportSha)) {
      fail(`adoption_reconciliation.evidence_sources inválida: ${sourceId}.`);
    }
    evidenceSourceIds.add(sourceId);
  }

  const classifications = Array.isArray(config.classifications) ? config.classifications : [];
  for (const row of classifications) {
    const taskId = String(row?.task_id ?? '').trim();
    const classification = String(row?.classification ?? '').trim();
    if (!/^[A-Z][A-Z0-9]*(?:-[A-Z0-9]+)+-\d{3}$/u.test(taskId)) {
      fail(`adoption_reconciliation contiene task_id inválida: ${taskId || 'EMPTY'}.`);
    }
    if (byTask.has(taskId)) fail(`adoption_reconciliation duplica ${taskId}.`);
    if (!ADOPTION_RECONCILIATION_CLASSIFICATION_SET.has(classification)) {
      fail(`adoption_reconciliation clasifica ${taskId} con valor inválido: ${classification || 'EMPTY'}.`);
    }
    const sourceRefs = uniqueSorted(row?.source_refs ?? []);
    if (sourceRefs.length === 0 || sourceRefs.some((ref) => !evidenceSourceIds.has(ref))) {
      fail(`adoption_reconciliation.source_refs inválida para ${taskId}.`);
    }
    const task = topologyResult?.inventory?.get(taskId) ?? null;
    if (topologyResult && !task) fail(`adoption_reconciliation referencia tarea inexistente: ${taskId}.`);
    if (task && !approvedTask(task)) fail(`adoption_reconciliation no puede clasificar tarea no aprobada: ${taskId}.`);
    const topology = topologyResult?.topology?.get(taskId) ?? null;
    if (topology && topology.mode !== 'PER_IMPLEMENTATION_UNIT') {
      fail(`adoption_reconciliation solo admite PER_IMPLEMENTATION_UNIT: ${taskId} usa ${topology.mode}.`);
    }
    byTask.set(taskId, { classification, source_refs: sourceRefs });
    counts[classification] += 1;
  }

  return {
    config,
    byTask,
    counts,
    classified_tasks: byTask.size,
  };
}

export function readImplementationMaterializationMap(root = process.cwd()) {
  const filePath = path.join(root, ...IMPLEMENTATION_MATERIALIZATION_MAP_PATH.split('/'));
  if (!fs.existsSync(filePath)) {
    fail(`No existe ${IMPLEMENTATION_MATERIALIZATION_MAP_PATH}.`);
  }
  let map;
  try {
    map = JSON.parse(fs.readFileSync(filePath, 'utf8'));
  } catch (error) {
    fail(
      `${IMPLEMENTATION_MATERIALIZATION_MAP_PATH} contiene JSON inválido: `
      + `${error instanceof Error ? error.message : String(error)}.`,
    );
  }
  const errors = validateStaticMap(map);
  if (errors.length > 0) {
    fail(`implementation-materialization-map inválido:\n- ${errors.join('\n- ')}`);
  }
  return map;
}

function unitIdFromInstance(instance, topologyEntry) {
  if (topologyEntry?.mode !== 'PER_IMPLEMENTATION_UNIT') return null;
  const prefix = `${instance.task_id}::`;
  if (!String(instance.instance_id ?? '').startsWith(prefix)) return null;
  return normalizeMaterializationUnitId(String(instance.instance_id).slice(prefix.length));
}

export function collectKnownImplementationUnits({
  topologyResult,
  implementationControl,
  readiness,
}) {
  const units = new Map();

  const add = (value, source, repository = null) => {
    const unitId = normalizeMaterializationUnitId(value);
    if (!unitId) return;
    const current = units.get(unitId) ?? {
      unit_id: unitId,
      sources: new Set(),
      repositories: new Set(),
    };
    current.sources.add(source);
    if (String(repository ?? '').trim()) current.repositories.add(String(repository).trim());
    units.set(unitId, current);
  };

  for (const pkg of readiness?.registry?.packages ?? []) {
    add(
      pkg?.canonical_prerequisites?.implementation_unit_id,
      `PACKAGE_REGISTRY:${pkg.package_id}`,
      pkg?.repository_owner ?? null,
    );
  }

  for (const [packageId, gate] of readiness?.packageGateRecords?.records ?? new Map()) {
    for (const unit of gate?.implementation_units ?? []) {
      add(unit?.unit_id, `PACKAGE_GATE:${packageId}`, unit?.repository ?? null);
    }
  }

  for (const instance of implementationControl?.instances ?? []) {
    const topologyEntry = topologyResult?.topology?.get(instance.task_id) ?? null;
    const unitId = unitIdFromInstance(instance, topologyEntry);
    if (!unitId) continue;
    for (const repository of instance.target_repositories ?? []) {
      add(unitId, `IMPLEMENTATION_INSTANCE:${instance.instance_id}`, repository);
    }
    add(unitId, `IMPLEMENTATION_INSTANCE:${instance.instance_id}`);
  }

  return new Map(
    [...units.entries()]
      .sort(([left], [right]) => left.localeCompare(right, 'en'))
      .map(([unitId, row]) => [
        unitId,
        {
          unit_id: unitId,
          sources: uniqueSorted([...row.sources]),
          repositories: uniqueSorted([...row.repositories]),
        },
      ]),
  );
}

export function validateImplementationMaterializationRelations(map, {
  topologyResult,
  knownUnits = new Map(),
} = {}) {
  const errors = [...validateStaticMap(map)];
  if (errors.length > 0) return errors;

  const seenTasks = new Set();
  for (const [index, relation] of map.relations.entries()) {
    const label = `relations[${index}]`;
    if (!relation || typeof relation !== 'object' || Array.isArray(relation)) {
      errors.push(`${label} debe ser un objeto.`);
      continue;
    }

    const taskId = String(relation.task_id ?? '').trim();
    if (!/^[A-Z][A-Z0-9]*(?:-[A-Z0-9]+)+-\d{3}$/u.test(taskId)) {
      errors.push(`${label}.task_id inválido: ${taskId || 'EMPTY'}.`);
      continue;
    }
    if (seenTasks.has(taskId)) errors.push(`${taskId} tiene más de una relación explícita.`);
    seenTasks.add(taskId);

    const task = topologyResult?.inventory?.get(taskId) ?? null;
    if (!task) {
      errors.push(`${taskId} no existe en el inventario canónico.`);
    } else if (!approvedTask(task)) {
      errors.push(`${taskId} no puede mapearse físicamente antes de estar APROBADA.`);
    }

    if (!COMPLETION_RULES.has(relation.completion_rule)) {
      errors.push(
        `${taskId}: completion_rule debe ser ALL_REQUIRED o ANY_ACCEPTABLE.`,
      );
    }

    const units = Array.isArray(relation.implementation_unit_ids)
      ? relation.implementation_unit_ids
      : [];
    if (units.length === 0) {
      errors.push(`${taskId}: implementation_unit_ids debe contener al menos una unit.`);
    }
    const normalized = units.map(normalizeMaterializationUnitId);
    if (normalized.some((value) => value === null)) {
      errors.push(`${taskId}: implementation_unit_ids contiene identidades inválidas o sentinelas.`);
    }
    const validUnits = normalized.filter(Boolean);
    if (new Set(validUnits).size !== validUnits.length) {
      errors.push(`${taskId}: implementation_unit_ids contiene duplicados.`);
    }
    for (const unitId of validUnits) {
      if (!knownUnits.has(unitId)) {
        errors.push(
          `${taskId}: ${unitId} no es una implementation_unit conocida por package, gate o instancia.`,
        );
      }
    }

    const sourceRefs = Array.isArray(relation.source_refs) ? relation.source_refs : [];
    if (
      sourceRefs.length === 0
      || sourceRefs.some((value) => typeof value !== 'string' || !value.trim())
    ) {
      errors.push(`${taskId}: source_refs debe contener evidencia canónica explícita.`);
    }
    if (new Set(sourceRefs.map((value) => String(value).trim())).size !== sourceRefs.length) {
      errors.push(`${taskId}: source_refs contiene duplicados.`);
    }
  }
  return errors;
}

export function deriveTaskPhysicalProjection(task) {
  const approved = String(task?.task_state ?? '').trim() === 'APROBADA';
  const adoptionClassification = String(task?.adoption_classification ?? '').trim() || null;
  const directInstances = Array.isArray(task?.direct_instances) ? task.direct_instances : [];
  const verifiedWithEvidence = directInstances.filter(
    (instance) => instance.status === 'VERIFIED' && Number(instance.evidence_count ?? 0) > 0,
  );
  const activeInstances = directInstances.filter(
    (instance) => ACTIVE_PHYSICAL_STATUSES.has(instance.status),
  );
  const explicit = task?.explicit_materialization ?? null;
  const unitIds = uniqueSorted(task?.materializing_unit_ids ?? []);
  const directIds = uniqueSorted(directInstances.map((instance) => instance.instance_id));
  const materializerRefs = unitIds.length > 0 ? unitIds : directIds;
  const evidenceRefs = uniqueSorted(
    verifiedWithEvidence.map((instance) => instance.instance_id),
  );

  const result = (code, display, detail) => ({
    code,
    display,
    detail,
    materializer_refs: materializerRefs,
    evidence_refs: evidenceRefs,
    source_refs: uniqueSorted(explicit?.source_refs ?? []),
    adoption_classification: adoptionClassification,
  });

  if (!approved) {
    return result(
      TASK_PHYSICAL_STATE_CODES.DOCUMENTARY_PENDING,
      '⏸ NO_EVALUADA',
      'La tarea todavía no está APROBADA documentalmente; no se reclama estado físico.',
    );
  }

  if (task?.relation_state === 'UNMAPPED') {
    return result(
      TASK_PHYSICAL_STATE_CODES.UNMAPPED,
      '⚠️ SIN_TRAZABILIDAD_FISICA',
      'Contrato aprobado sin relación física demostrada todavía.',
    );
  }

  if (directInstances.length === 0) {
    return result(
      TASK_PHYSICAL_STATE_CODES.MAPPED,
      '🧩 MAPEADA',
      explicit
        ? 'La relación explícita con unit(s) existe; la evidencia de ejecución se resolverá en la frontier física.'
        : 'Existe relación física, pero todavía no hay instancia directa observable.',
    );
  }

  if (
    SINGLETON_PHYSICAL_MODES.has(task?.mode)
    && verifiedWithEvidence.length === directInstances.length
  ) {
    return result(
      TASK_PHYSICAL_STATE_CODES.MATERIALIZED,
      '✅ MATERIALIZADA',
      String(verifiedWithEvidence.length) + '/' + String(directInstances.length)
        + ' instancia(s) singleton VERIFIED con evidencia.',
    );
  }

  if (verifiedWithEvidence.length > 0) {
    const completeObserved = verifiedWithEvidence.length === directInstances.length;
    return result(
      TASK_PHYSICAL_STATE_CODES.PARTIAL,
      completeObserved
        ? '🟠 PARCIAL — COBERTURA ABIERTA'
        : '🟠 PARCIAL ' + String(verifiedWithEvidence.length) + '/' + String(directInstances.length),
      completeObserved
        ? 'Todas las instancias observadas están VERIFIED con evidencia, pero la cardinalidad no permite afirmar cobertura física global sin relación explícita completa.'
        : String(verifiedWithEvidence.length) + '/' + String(directInstances.length)
          + ' instancia(s) observadas están VERIFIED con evidencia.',
    );
  }

  if (activeInstances.length > 0) {
    return result(
      TASK_PHYSICAL_STATE_CODES.IN_IMPLEMENTATION,
      '🟡 EN_IMPLEMENTACION',
      String(activeInstances.length) + '/' + String(directInstances.length)
        + ' instancia(s) están en lifecycle físico activo.',
    );
  }

  return result(
    TASK_PHYSICAL_STATE_CODES.MAPPED,
    '🧩 MAPEADA',
    'La relación física existe, pero ninguna instancia observada está VERIFIED con evidencia.',
  );
}

export function buildPhysicalMaterializationSummary(materializationReport) {
  const rows = (materializationReport?.tasks ?? []).map((task) => ({
    task_id: task.task_id,
    ...deriveTaskPhysicalProjection(task),
  }));
  const byTask = new Map(rows.map((row) => [row.task_id, row]));
  const counts = {
    DOCUMENTARY_PENDING: 0,
    UNMAPPED: 0,
    MAPPED: 0,
    IN_IMPLEMENTATION: 0,
    PARTIAL: 0,
    MATERIALIZED: 0,
  };
  for (const row of rows) {
    if (!Object.hasOwn(counts, row.code)) {
      throw new Error(`estado físico desconocido: ${row.code ?? 'EMPTY'}.`);
    }
    counts[row.code] += 1;
  }
  return { rows, byTask, counts };
}

export function buildImplementationMaterializationIndex({ root = process.cwd() } = {}) {
  const topologyResult = resolveTaskWorkTopology({ root });
  const implementationControl = loadImplementationControl({ root });
  const implementationErrors = validateImplementationControl(
    implementationControl,
    topologyResult,
  );
  if (implementationErrors?.length > 0) {
    fail(`implementation-control inválido:\n- ${implementationErrors.join('\n- ')}`);
  }

  const readiness = scanPackageReadiness({
    root,
    check: false,
    trigger: 'implementation-materialization',
    supplied: { skipDerivedReports: true },
  });
  const map = readImplementationMaterializationMap(root);
  const knownUnits = collectKnownImplementationUnits({
    topologyResult,
    implementationControl,
    readiness,
  });
  const relationErrors = validateImplementationMaterializationRelations(map, {
    topologyResult,
    knownUnits,
  });
  if (relationErrors.length > 0) {
    fail(`implementation-materialization-map inválido:\n- ${relationErrors.join('\n- ')}`);
  }
  const adoptionReconciliation = buildAdoptionReconciliationIndex(map, topologyResult);

  const explicitByTask = new Map(map.relations.map((relation) => [
    relation.task_id,
    {
      task_id: relation.task_id,
      completion_rule: relation.completion_rule,
      implementation_unit_ids: uniqueSorted(relation.implementation_unit_ids),
      source_refs: uniqueSorted(relation.source_refs),
    },
  ]));

  const directInstancesByTask = new Map();
  for (const instance of implementationControl.instances ?? []) {
    const rows = directInstancesByTask.get(instance.task_id) ?? [];
    rows.push({
      instance_id: instance.instance_id,
      status: instance.status,
      evidence_count: Array.isArray(instance.evidence) ? instance.evidence.length : 0,
      implementation_unit_id: unitIdFromInstance(
        instance,
        topologyResult.topology.get(instance.task_id),
      ),
    });
    directInstancesByTask.set(instance.task_id, rows);
  }

  const tasks = topologyResult.ordered.map((task) => {
    const explicit = explicitByTask.get(task.id) ?? null;
    const directInstances = (directInstancesByTask.get(task.id) ?? [])
      .sort((left, right) => left.instance_id.localeCompare(right.instance_id, 'en'));
    const directUnitIds = uniqueSorted(
      directInstances.map((instance) => instance.implementation_unit_id).filter(Boolean),
    );
    return {
      task_id: task.id,
      title: task.title,
      task_state: approvedTask(task) ? 'APROBADA' : 'NO_APROBADA',
      adoption_classification: adoptionReconciliation.byTask.get(task.id)?.classification ?? null,
      adoption_source_refs: adoptionReconciliation.byTask.get(task.id)?.source_refs ?? [],
      mode: topologyResult.topology.get(task.id)?.mode ?? null,
      execution_gate: topologyResult.topology.get(task.id)?.executionGate ?? null,
      explicit_materialization: explicit,
      direct_instances: directInstances,
      direct_instance_ids: directInstances.map((instance) => instance.instance_id),
      direct_verified_instance_ids: directInstances
        .filter((instance) => instance.status === 'VERIFIED')
        .map((instance) => instance.instance_id),
      direct_verified_with_evidence_instance_ids: directInstances
        .filter((instance) => instance.status === 'VERIFIED' && instance.evidence_count > 0)
        .map((instance) => instance.instance_id),
      materializing_unit_ids: uniqueSorted([
        ...directUnitIds,
        ...(explicit?.implementation_unit_ids ?? []),
      ]),
      relation_state: explicit
        ? 'EXPLICIT_SHARED_OR_CROSS_TASK'
        : directInstances.length > 0
          ? 'DIRECT_INSTANCE_ONLY'
          : 'UNMAPPED',
    };
  });

  const metrics = {
    canonical_tasks: tasks.length,
    known_implementation_units: knownUnits.size,
    explicit_task_relations: map.relations.length,
    tasks_with_direct_instance_relation: tasks
      .filter((task) => task.direct_instance_ids.length > 0).length,
    tasks_with_any_materialization_relation: tasks
      .filter((task) => task.relation_state !== 'UNMAPPED').length,
    explicit_relation_unit_references: map.relations
      .reduce((total, relation) => total + relation.implementation_unit_ids.length, 0),
    adoption_classified_tasks: adoptionReconciliation.classified_tasks,
    adoption_classification_counts: adoptionReconciliation.counts,
  };

  const report = {
    schema_version: 1,
    model_id: IMPLEMENTATION_MATERIALIZATION_MAP_ID,
    generated_at: new Date().toISOString(),
    invariants: {
      documentary_marker_is_not_materialization_state: true,
      package_reference_is_not_materialization_relation: true,
      direct_instance_materializes_own_task: true,
      explicit_cross_task_relation_requires_known_unit: true,
      explicit_cross_task_relation_requires_approved_task: true,
      verified_materialization_will_require_evidence: true,
      materialization_completion_claim: false,
      adoption_classification_is_not_materialization_claim: true,
      adoption_classification_is_not_task_to_unit_relation: true,
    },
    metrics,
    adoption_reconciliation: adoptionReconciliation.config,
    known_units: [...knownUnits.values()],
    explicit_relations: map.relations,
    tasks,
  };

  report.fingerprint_sha256 = sha256(stableJson({
    model_id: report.model_id,
    invariants: report.invariants,
    metrics: report.metrics,
    adoption_reconciliation: report.adoption_reconciliation,
    known_units: report.known_units,
    explicit_relations: report.explicit_relations,
    tasks: report.tasks,
  }));
  return report;
}

export function assertImplementationMaterializationIndex(report) {
  const failures = [];
  if (report?.model_id !== IMPLEMENTATION_MATERIALIZATION_MAP_ID) failures.push('MODEL_ID');
  if (report?.invariants?.documentary_marker_is_not_materialization_state !== true) {
    failures.push('DOCUMENTARY_VS_PHYSICAL_STATE');
  }
  if (report?.invariants?.package_reference_is_not_materialization_relation !== true) {
    failures.push('PACKAGE_REFERENCE_NOT_MATERIALIZATION');
  }
  if (report?.invariants?.materialization_completion_claim !== false) {
    failures.push('NO_COMPLETION_CLAIM');
  }
  if (report?.invariants?.adoption_classification_is_not_materialization_claim !== true) {
    failures.push('ADOPTION_NOT_MATERIALIZATION');
  }
  if (report?.invariants?.adoption_classification_is_not_task_to_unit_relation !== true) {
    failures.push('ADOPTION_NOT_TASK_TO_UNIT');
  }
  if (report?.metrics?.canonical_tasks !== report?.tasks?.length) {
    failures.push('TASK_COVERAGE');
  }
  if (failures.length > 0) {
    fail(`IMPLEMENTATION_MATERIALIZATION_FAILED: ${failures.join(', ')}`);
  }
  return true;
}

function printSummary(report) {
  console.log('IMPLEMENTATION_MATERIALIZATION: PASS');
  console.log(`MODEL_ID: ${report.model_id}`);
  console.log(`TASKS: ${report.metrics.canonical_tasks}`);
  console.log(`KNOWN_UNITS: ${report.metrics.known_implementation_units}`);
  console.log(`EXPLICIT_TASK_RELATIONS: ${report.metrics.explicit_task_relations}`);
  console.log(
    `DIRECT_INSTANCE_RELATIONS: ${report.metrics.tasks_with_direct_instance_relation}`,
  );
  console.log(
    `TASKS_WITH_ANY_RELATION: ${report.metrics.tasks_with_any_materialization_relation}`,
  );
  console.log(`ADOPTION_CLASSIFIED_TASKS: ${report.metrics.adoption_classified_tasks}`);
  console.log(`ADOPTION_CLASSIFICATION_COUNTS: ${JSON.stringify(report.metrics.adoption_classification_counts)}`);
  console.log('MATERIALIZATION_COMPLETION_CLAIM: NO');
  console.log(`FINGERPRINT_SHA256: ${report.fingerprint_sha256}`);
}

function main() {
  const args = process.argv.slice(2);
  if (args.length > 1 || (args.length === 1 && args[0] !== '--check')) {
    fail('Use sin argumentos o con --check.');
  }
  const report = buildImplementationMaterializationIndex({ root: process.cwd() });
  assertImplementationMaterializationIndex(report);
  printSummary(report);
}

const isCli = process.argv[1]
  && path.resolve(process.argv[1]) === path.resolve(fileURLToPath(import.meta.url));

if (isCli) {
  try {
    main();
  } catch (error) {
    console.error(`ERROR: ${error instanceof Error ? error.message : String(error)}`);
    process.exitCode = 1;
  }
}
