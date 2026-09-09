import crypto from 'node:crypto';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

export const APPLICATION_CLOSURE_MODEL_ID = 'VENTO-PACKAGE-APPLICATION-CLOSURE-V1';
export const CONSUMER_SOURCE = 'docs/plan-canonico/modular/bloques/E1_DESCUBRIMIENTO_OPERATIVO/03_02_PROPIEDAD_CONSUMIDORES_Y_ACTORES.md';
export const PACKAGE_GATE_DIR = 'docs/plan-canonico/modular/package-gate-instances';
export const IMPLEMENTATION_INSTANCE_DIR = 'docs/plan-canonico/modular/implementation-instances';

const CANONICAL_PACKAGE_COUNT = 207;
const EXPECTED_APPLICATION_CODES = [
  'anima',
  'aura',
  'fogo',
  'nexo',
  'numera',
  'origo',
  'pass',
  'pulso',
  'shell',
  'viso',
];
const PHYSICAL_STAGE_IDS = [
  'SHELL-CI-020',
  'SHELL-CI-021',
  'SHELL-CI-022',
  'SHELL-CI-023',
  'SHELL-CI-024',
];
const UNRESOLVED_CONSUMER_PATTERN = /\b(?:aplicaci[oó]n|aplicaciones|medio|medios|pantalla|trabajador|trabajadores|consumidor|consumidores|propietaria|propietario|dependiente|dependientes|afectada|afectadas|afectado|afectados|operativa|operativas|laboral|laborales|origen|hecho)\b/iu;
const NON_UNIT_VALUES = new Set([
  '',
  'NONE',
  'NO_APLICA',
  'NOT_APPLICABLE',
  'PENDIENTE',
  'BLOQUEADO',
  'UNRESOLVED',
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

function normalizeScalar(value) {
  return String(value ?? '')
    .trim()
    .replace(/^`|`$/gu, '')
    .replace(/<br\s*\/?>/giu, ' ')
    .replace(/\s+/gu, ' ')
    .trim();
}

function normalizeHeader(value) {
  return normalizeScalar(value)
    .normalize('NFKD')
    .replace(/\p{M}/gu, '')
    .toLowerCase()
    .replace(/[^a-z0-9_]+/gu, ' ')
    .trim();
}

function uniqueSorted(values) {
  return [...new Set(
    (Array.isArray(values) ? values : [])
      .map((entry) => String(entry ?? '').trim())
      .filter(Boolean),
  )].sort((left, right) => left.localeCompare(right, 'en'));
}

function parseMarkdownRow(line) {
  const raw = String(line ?? '').trim();
  if (!raw.startsWith('|') || !raw.endsWith('|')) return null;
  const body = raw.slice(1, -1);
  const cells = [];
  let current = '';
  let codeFenceLength = 0;

  for (let index = 0; index < body.length; index += 1) {
    const character = body[index];
    if (character === '\\' && body[index + 1] === '|') {
      current += '\\|';
      index += 1;
      continue;
    }
    if (character === '`') {
      let end = index + 1;
      while (body[end] === '`') end += 1;
      const fenceLength = end - index;
      if (codeFenceLength === 0) codeFenceLength = fenceLength;
      else if (codeFenceLength === fenceLength) codeFenceLength = 0;
      current += body.slice(index, end);
      index = end - 1;
      continue;
    }
    if (character === '|' && codeFenceLength === 0) {
      cells.push(normalizeScalar(current));
      current = '';
      continue;
    }
    current += character;
  }
  cells.push(normalizeScalar(current));
  return cells;
}

function separatorRow(cells) {
  return Array.isArray(cells)
    && cells.length > 0
    && cells.every((cell) => /^:?-{3,}:?$/u.test(String(cell).trim()));
}

function extractTaskSection(source, taskId) {
  const lines = String(source ?? '').replace(/\r\n/gu, '\n').split('\n');
  const escaped = taskId.replace(/[.*+?^${}()|[\]\\]/gu, '\\$&');
  const startPattern = new RegExp(`^###\\s+(?:\\[[ x~]\\]|✅|🟡|❌)?\\s*${escaped}\\b`, 'u');
  const start = lines.findIndex((line) => startPattern.test(line));
  if (start < 0) fail(`${taskId} no existe en ${CONSUMER_SOURCE}.`);
  let end = lines.length;
  for (let index = start + 1; index < lines.length; index += 1) {
    if (/^###\s/u.test(lines[index])) {
      end = index;
      break;
    }
  }
  return lines.slice(start, end);
}

function scanTables(lines) {
  const tables = [];
  for (let index = 0; index < lines.length - 1; index += 1) {
    const header = parseMarkdownRow(lines[index]);
    const separator = parseMarkdownRow(lines[index + 1]);
    if (!header || !separatorRow(separator)) continue;
    const rows = [];
    let cursor = index + 2;
    for (; cursor < lines.length; cursor += 1) {
      const cells = parseMarkdownRow(lines[cursor]);
      if (!cells) break;
      if (!separatorRow(cells)) rows.push(cells);
    }
    tables.push({
      header,
      normalized_header: header.map((entry) => normalizeHeader(entry)),
      rows,
    });
    index = Math.max(index, cursor - 1);
  }
  return tables;
}

function headerIndex(table, candidates) {
  for (const candidate of candidates) {
    const expected = normalizeHeader(candidate);
    const index = table.normalized_header.findIndex(
      (entry) => entry === expected || entry.includes(expected),
    );
    if (index >= 0) return index;
  }
  return -1;
}

function tableValue(row, table, candidates) {
  const index = headerIndex(table, candidates);
  return index >= 0 ? normalizeScalar(row[index]) : '';
}

function extractApplicationCodes(value, appSet) {
  const tokens = String(value ?? '').toLowerCase().match(/[a-z][a-z0-9_-]*/gu) ?? [];
  return uniqueSorted(tokens.filter((entry) => appSet.has(entry)));
}

function genericConsumerResidue(value, exactApps) {
  const original = String(value ?? '');
  const colonIndex = original.indexOf(':');
  const suffix = colonIndex >= 0 ? original.slice(colonIndex + 1) : '';
  const suffixLower = suffix.toLowerCase();
  const explicitListedAfterColon = colonIndex >= 0
    && exactApps.length > 0
    && exactApps.every((app) => suffixLower.includes(app));
  let residual = explicitListedAfterColon ? suffix : original;
  for (const app of exactApps) {
    residual = residual.replace(new RegExp(`(?:^|[^a-z0-9_-])${app}(?=$|[^a-z0-9_-])`, 'giu'), ' ');
  }
  residual = residual
    .replace(/\b(?:y|o|cuando|aplique|seg[uú]n|para|del|de|la|el|los|las)\b/giu, ' ')
    .replace(/[;,/]+/gu, ' ')
    .replace(/\s+/gu, ' ')
    .trim();
  return UNRESOLVED_CONSUMER_PATTERN.test(residual) ? normalizeScalar(value) : null;
}

function parseCapabilitySpec(spec) {
  const text = String(spec ?? '').replaceAll('`', ' ');
  const ids = [...text.matchAll(/\bCAP-(\d{2})\.(\d{2})\b/gu)]
    .map((match) => ({ id: match[0], family: match[1], number: Number(match[2]) }));
  if (ids.length === 0) return { ids: new Set(), ranges: [] };

  const explicit = new Set(ids.map(({ id }) => id));
  const ranges = [];
  const rangePattern = /CAP-(\d{2})\.(\d{2})\s+a\s+CAP-(\d{2})\.(\d{2})/giu;
  for (const match of text.matchAll(rangePattern)) {
    if (match[1] !== match[3]) continue;
    ranges.push({
      family: match[1],
      from: Number(match[2]),
      to: Number(match[4]),
    });
  }
  return { ids: explicit, ranges };
}

function capabilitySpecMatches(parsed, capabilityId) {
  if (parsed.ids.has(capabilityId)) return true;
  const match = /^CAP-(\d{2})\.(\d{2})$/u.exec(String(capabilityId ?? ''));
  if (!match) return false;
  const family = match[1];
  const number = Number(match[2]);
  return parsed.ranges.some((range) => (
    range.family === family && number >= range.from && number <= range.to
  ));
}

export function parseCapabilityConsumerProjection(source) {
  const section = extractTaskSection(source, 'CAP-MAP-005');
  const tables = scanTables(section);
  const appCatalogTable = tables.find((table) => (
    headerIndex(table, ['codigo']) >= 0
    && headerIndex(table, ['aplicacion']) >= 0
  ));
  if (!appCatalogTable) fail('CAP-MAP-005 no contiene catálogo de aplicaciones VENTO.');

  const applications = uniqueSorted(
    appCatalogTable.rows
      .map((row) => tableValue(row, appCatalogTable, ['codigo']).toLowerCase())
      .filter((entry) => /^[a-z][a-z0-9_-]*$/u.test(entry)),
  );
  const expected = [...EXPECTED_APPLICATION_CODES].sort((a, b) => a.localeCompare(b, 'en'));
  if (JSON.stringify(applications) !== JSON.stringify(expected)) {
    fail(`CAP-MAP-005 catálogo VENTO inesperado: ${applications.join(', ') || 'NONE'}.`);
  }
  const appSet = new Set(applications);

  const familyTable = tables.find((table) => (
    headerIndex(table, ['familia']) >= 0
    && headerIndex(table, ['consumidores vento candidatos']) >= 0
  ));
  if (!familyTable) fail('CAP-MAP-005 no contiene mapa base de consumidores por familia.');

  const families = new Map();
  for (const row of familyTable.rows) {
    const familyCell = tableValue(row, familyTable, ['familia']);
    const familyMatch = /\bCAP-(\d{2})\b/u.exec(familyCell);
    if (!familyMatch) continue;
    const familyId = `CAP-${familyMatch[1]}`;
    const consumerCell = tableValue(row, familyTable, ['consumidores vento candidatos']);
    const exactApps = extractApplicationCodes(consumerCell, appSet);
    families.set(familyId, {
      family_id: familyId,
      explicit_application_ids: exactApps,
      unresolved_consumer: genericConsumerResidue(consumerCell, exactApps),
      source_text: consumerCell,
    });
  }
  if (families.size !== 18) {
    fail(`CAP-MAP-005 exige 18 familias consumidoras; observadas=${families.size}.`);
  }

  const exceptions = [];
  for (const table of tables) {
    if (
      headerIndex(table, ['subcapacidades', 'subcapacidad']) < 0
      || headerIndex(table, ['consumidor']) < 0
    ) continue;

    for (const row of table.rows) {
      const capabilitySpec = tableValue(row, table, ['subcapacidades', 'subcapacidad']);
      if (!/CAP-\d{2}\.\d{2}/u.test(capabilitySpec)) continue;
      const consumerCell = tableValue(row, table, ['consumidor']);
      const exactApps = extractApplicationCodes(consumerCell, appSet);
      exceptions.push({
        capability_spec: capabilitySpec,
        parsed_spec: parseCapabilitySpec(capabilitySpec),
        explicit_application_ids: exactApps,
        unresolved_consumer: genericConsumerResidue(consumerCell, exactApps),
        source_text: consumerCell,
      });
    }
  }

  return {
    model_id: APPLICATION_CLOSURE_MODEL_ID,
    applications,
    families,
    exceptions,
  };
}

export function resolveCapabilityConsumers(capabilityId, projection) {
  const match = /^CAP-(\d{2})\.\d{2}$/u.exec(String(capabilityId ?? ''));
  if (!match) {
    return {
      capability_id: capabilityId,
      explicit_application_ids: [],
      unresolved_consumers: [`CAPABILITY_ID_INVALID:${capabilityId}`],
      sources: [],
    };
  }

  const familyId = `CAP-${match[1]}`;
  const family = projection.families.get(familyId) ?? null;
  if (!family) {
    return {
      capability_id: capabilityId,
      explicit_application_ids: [],
      unresolved_consumers: [`FAMILY_NOT_FOUND:${familyId}`],
      sources: [],
    };
  }

  const matchingExceptions = projection.exceptions.filter((entry) => (
    capabilitySpecMatches(entry.parsed_spec, capabilityId)
  ));
  const explicit = uniqueSorted([
    ...family.explicit_application_ids,
    ...matchingExceptions.flatMap((entry) => entry.explicit_application_ids),
  ]);
  const unresolved = uniqueSorted([
    family.unresolved_consumer,
    ...matchingExceptions.map((entry) => entry.unresolved_consumer),
  ].filter(Boolean));

  return {
    capability_id: capabilityId,
    explicit_application_ids: explicit,
    unresolved_consumers: unresolved,
    sources: [
      { kind: 'CAP-MAP-005_FAMILY', ref: familyId, text: family.source_text },
      ...matchingExceptions.map((entry) => ({
        kind: 'CAP-MAP-005_EXCEPTION',
        ref: entry.capability_spec,
        text: entry.source_text,
      })),
    ],
  };
}

function readJsonDirectory(root, relativeDir) {
  const absoluteDir = path.join(root, ...relativeDir.split('/'));
  if (!fs.existsSync(absoluteDir)) return [];
  return fs.readdirSync(absoluteDir, { withFileTypes: true })
    .filter((entry) => entry.isFile() && entry.name.endsWith('.json'))
    .sort((left, right) => left.name.localeCompare(right.name, 'en'))
    .map((entry) => {
      const relativePath = `${relativeDir}/${entry.name}`;
      const absolutePath = path.join(absoluteDir, entry.name);
      try {
        return {
          relative_path: relativePath,
          record: JSON.parse(fs.readFileSync(absolutePath, 'utf8')),
        };
      } catch (error) {
        fail(`${relativePath} contiene JSON inválido: ${error instanceof Error ? error.message : String(error)}`);
      }
    });
}

function packageIdFromInstance(record) {
  const match = /::(GAP-PKG-\d{3})$/u.exec(String(record?.instance_id ?? ''));
  return match?.[1] ?? null;
}

function normalizeOwnerApplication(value, appSet) {
  const normalized = String(value ?? '').trim().toLowerCase();
  return appSet.has(normalized) ? normalized : null;
}

function normalizeImplementationUnit(value) {
  const normalized = String(value ?? '').trim();
  if (NON_UNIT_VALUES.has(normalized.toUpperCase())) return null;
  return normalized || null;
}

function evidenceReferences(record, relativePath) {
  const evidence = Array.isArray(record?.evidence) ? record.evidence : [];
  return evidence.map((entry, index) => ({
    instance_id: record.instance_id,
    task_id: record.task_id,
    instance_status: record.status,
    source_path: relativePath,
    evidence_index: index,
    evidence_type: entry && typeof entry === 'object'
      ? (entry.evidence_type ?? entry.type ?? null)
      : null,
    evidence_sha256: sha256(stableJson(entry)),
  }));
}

function explicitTreqPasses(record) {
  if (record?.status !== 'VERIFIED') return [];
  const evidence = Array.isArray(record?.evidence) ? record.evidence : [];
  const result = [];
  for (const entry of evidence) {
    if (typeof entry !== 'string') continue;
    const match = /^TREQ\s+(TREQ-[A-Z0-9-]+)\s+PASS\.?$/u.exec(entry.trim());
    if (match) result.push(match[1]);
  }
  return uniqueSorted(result);
}

function implementationRelations(pkg, packageGate) {
  const byUnit = new Map();
  const add = (unitId, source, repository = null) => {
    const normalized = normalizeImplementationUnit(unitId);
    if (!normalized) return;
    const current = byUnit.get(normalized) ?? {
      package_id: pkg.package_id,
      implementation_unit_id: normalized,
      repositories: [],
      sources: [],
    };
    current.sources = uniqueSorted([...current.sources, source]);
    current.repositories = uniqueSorted([...current.repositories, repository]);
    byUnit.set(normalized, current);
  };

  add(
    pkg?.canonical_prerequisites?.implementation_unit_id,
    'DELIV-PKG-025',
    pkg?.repository_owner ?? null,
  );

  for (const unit of packageGate?.implementation_units ?? []) {
    add(unit?.unit_id, 'PACKAGE_GATE', unit?.repository ?? null);
  }

  return [...byUnit.values()].sort((left, right) => (
    left.implementation_unit_id.localeCompare(right.implementation_unit_id, 'en')
  ));
}

function consumerRelations(pkg, projection) {
  const byApp = new Map();
  const unresolved = [];
  const capabilities = uniqueSorted(pkg?.capability_ids);

  for (const capabilityId of capabilities) {
    const resolved = resolveCapabilityConsumers(capabilityId, projection);
    for (const applicationId of resolved.explicit_application_ids) {
      const current = byApp.get(applicationId) ?? {
        package_id: pkg.package_id,
        application_id: applicationId,
        capability_ids: [],
        source: 'CAP-MAP-005',
      };
      current.capability_ids.push(capabilityId);
      current.capability_ids = uniqueSorted(current.capability_ids);
      byApp.set(applicationId, current);
    }
    for (const text of resolved.unresolved_consumers) {
      unresolved.push({
        package_id: pkg.package_id,
        capability_id: capabilityId,
        unresolved_consumer: text,
        source: 'CAP-MAP-005',
      });
    }
  }

  return {
    explicit: [...byApp.values()].sort((left, right) => left.application_id.localeCompare(right.application_id, 'en')),
    unresolved: unresolved.sort((left, right) => (
      left.capability_id.localeCompare(right.capability_id, 'en')
      || left.unresolved_consumer.localeCompare(right.unresolved_consumer, 'en')
    )),
  };
}

function criterionProjection(packageId, packageGate, verifiedTreqEvidence) {
  const criteria = Array.isArray(packageGate?.evidence_plan?.acceptance_criteria)
    ? packageGate.evidence_plan.acceptance_criteria
    : [];
  const closedRelations = [];

  const rows = criteria.map((criterion, index) => {
    const text = String(criterion ?? '').trim();
    const treqIds = uniqueSorted(text.match(/\bTREQ-[A-Z0-9-]+\b/gu) ?? []);
    const evidence = treqIds.map((treqId) => verifiedTreqEvidence.get(treqId) ?? []);
    const allExplicitPass = treqIds.length > 0 && evidence.every((refs) => refs.length > 0);
    const state = allExplicitPass ? 'PASS' : 'UNKNOWN';
    const reason = allExplicitPass
      ? 'ALL_EXPLICIT_TREQ_PASS'
      : treqIds.length === 0
        ? 'NO_EXPLICIT_TREQ_LINK'
        : 'MISSING_EXPLICIT_TREQ_PASS';
    const criterionId = `${packageId}::AC-${String(index + 1).padStart(3, '0')}`;
    const evidenceRefs = evidence.flat().sort((left, right) => (
      left.instance_id.localeCompare(right.instance_id, 'en')
      || left.treq_id.localeCompare(right.treq_id, 'en')
    ));

    if (allExplicitPass) {
      closedRelations.push({
        package_id: packageId,
        criterion_id: criterionId,
        criterion_sha256: sha256(text),
        treq_ids: treqIds,
        evidence_refs: evidenceRefs,
        state: 'PASS',
        source: 'EXPLICIT_TREQ_PASS',
      });
    }

    return {
      criterion_id: criterionId,
      criterion_sha256: sha256(text),
      text,
      treq_ids: treqIds,
      state,
      reason,
      evidence_refs: evidenceRefs,
    };
  });

  return {
    criteria: rows,
    closed_relations: closedRelations,
    total: rows.length,
    explicitly_closed: rows.filter(({ state }) => state === 'PASS').length,
    unknown: rows.filter(({ state }) => state === 'UNKNOWN').length,
  };
}

function lifecycleProjection(packageId, instances) {
  const byTask = new Map(
    instances.map((entry) => [entry.record?.task_id, entry]),
  );
  const stages = Object.fromEntries(PHYSICAL_STAGE_IDS.map((taskId) => [
    taskId,
    byTask.get(taskId)?.record?.status ?? 'NOT_MATERIALIZED',
  ]));
  const closureEntry = byTask.get('SHELL-CI-024') ?? null;
  const closureEvidence = Array.isArray(closureEntry?.record?.evidence)
    ? closureEntry.record.evidence
    : [];
  const closed = closureEntry?.record?.status === 'VERIFIED' && closureEvidence.length > 0;

  return {
    package_id: packageId,
    stages,
    closure_state: closed ? 'CLOSED' : 'OPEN',
    closure_instance_id: closureEntry?.record?.instance_id ?? `SHELL-CI-024::${packageId}`,
    closure_evidence_count: closureEvidence.length,
    closure_source_path: closureEntry?.relative_path ?? null,
  };
}

export function buildPackageApplicationClosure({
  registry,
  consumerProjection,
  packageGates = [],
  implementationInstances = [],
} = {}) {
  const packages = (registry?.packages ?? [])
    .filter(({ source_kind: sourceKind }) => sourceKind === 'CANONICAL_GAP_PACKAGE')
    .sort((left, right) => String(left.package_id).localeCompare(String(right.package_id), 'en'));
  if (packages.length !== CANONICAL_PACKAGE_COUNT) {
    fail(`PACKAGE APPLICATION CLOSURE exige ${CANONICAL_PACKAGE_COUNT} GAP-PKG; observados=${packages.length}.`);
  }
  if (!consumerProjection) fail('consumerProjection es obligatorio.');

  const appSet = new Set(consumerProjection.applications);
  const gateByPackage = new Map(
    packageGates
      .filter(({ record }) => /^GAP-PKG-\d{3}$/u.test(String(record?.package_id ?? '')))
      .map((entry) => [entry.record.package_id, entry.record]),
  );
  const instancesByPackage = new Map();
  for (const entry of implementationInstances) {
    const packageId = packageIdFromInstance(entry.record);
    if (!packageId) continue;
    const rows = instancesByPackage.get(packageId) ?? [];
    rows.push(entry);
    instancesByPackage.set(packageId, rows);
  }
  for (const rows of instancesByPackage.values()) {
    rows.sort((left, right) => String(left.record?.task_id ?? '').localeCompare(String(right.record?.task_id ?? ''), 'en'));
  }

  const packageRows = packages.map((pkg) => {
    const packageId = pkg.package_id;
    const gate = gateByPackage.get(packageId) ?? null;
    const instances = instancesByPackage.get(packageId) ?? [];
    const ownerApplication = normalizeOwnerApplication(pkg.owner_application, appSet);
    const consumers = consumerRelations(pkg, consumerProjection);
    const evidenceRelations = instances.flatMap((entry) => evidenceReferences(entry.record, entry.relative_path));
    const verifiedTreqEvidence = new Map();

    for (const entry of instances) {
      for (const treqId of explicitTreqPasses(entry.record)) {
        const refs = verifiedTreqEvidence.get(treqId) ?? [];
        refs.push({
          treq_id: treqId,
          instance_id: entry.record.instance_id,
          source_path: entry.relative_path,
        });
        verifiedTreqEvidence.set(treqId, refs);
      }
    }

    const criteria = criterionProjection(packageId, gate, verifiedTreqEvidence);
    const lifecycle = lifecycleProjection(packageId, instances);
    const prerequisites = uniqueSorted(pkg?.execution?.depends_on_package_ids).map((prerequisitePackageId) => ({
      package_id: packageId,
      prerequisite_package_id: prerequisitePackageId,
      source: 'PACKAGE_EXECUTION_POLICY',
    }));

    return {
      package_id: packageId,
      owner_application: ownerApplication,
      owner_application_raw: pkg.owner_application ?? null,
      domain_owner: pkg.domain_owner ?? null,
      repository_owner: pkg.repository_owner ?? null,
      implementation_unit_id_e5: normalizeImplementationUnit(pkg?.canonical_prerequisites?.implementation_unit_id),
      relations: {
        PRERREQUISITO_DE: prerequisites,
        IMPLEMENTADO_POR: implementationRelations(pkg, gate),
        CONSUMIDO_POR: consumers.explicit,
        EVIDENCIADO_POR: evidenceRelations,
        CIERRA_CRITERIO_DE: criteria.closed_relations,
      },
      unresolved_consumers: consumers.unresolved,
      acceptance_criteria: criteria.criteria,
      closure: {
        ...lifecycle,
        acceptance_criteria_total: criteria.total,
        acceptance_criteria_explicitly_closed: criteria.explicitly_closed,
        acceptance_criteria_unknown: criteria.unknown,
      },
    };
  });

  const byPackage = new Map(packageRows.map((entry) => [entry.package_id, entry]));
  const applications = consumerProjection.applications.map((applicationId) => {
    const owned = packageRows.filter(({ owner_application: owner }) => owner === applicationId).map(({ package_id: id }) => id);
    const consumed = packageRows
      .filter(({ relations }) => relations.CONSUMIDO_POR.some(({ application_id: app }) => app === applicationId))
      .map(({ package_id: id }) => id);
    const related = uniqueSorted([...owned, ...consumed]);
    const relatedRows = related.map((packageId) => byPackage.get(packageId));
    const closed = relatedRows.filter(({ closure }) => closure.closure_state === 'CLOSED').map(({ package_id: id }) => id);
    const open = relatedRows.filter(({ closure }) => closure.closure_state !== 'CLOSED').map(({ package_id: id }) => id);
    const criteriaTotal = relatedRows.reduce((sum, row) => sum + row.closure.acceptance_criteria_total, 0);
    const criteriaClosed = relatedRows.reduce((sum, row) => sum + row.closure.acceptance_criteria_explicitly_closed, 0);
    const criteriaUnknown = relatedRows.reduce((sum, row) => sum + row.closure.acceptance_criteria_unknown, 0);
    const completionState = related.length === 0
      ? 'NO_EXPLICIT_SCOPE'
      : open.length > 0
        ? 'INCOMPLETE'
        : criteriaUnknown > 0
          ? 'UNKNOWN_CRITERIA_TRACEABILITY'
          : 'COMPLETE_EXPLICIT_SCOPE';

    return {
      application_id: applicationId,
      owned_package_ids: uniqueSorted(owned),
      consumed_package_ids: uniqueSorted(consumed),
      related_package_ids: related,
      closed_package_ids: uniqueSorted(closed),
      open_package_ids: uniqueSorted(open),
      acceptance_criteria_total: criteriaTotal,
      acceptance_criteria_explicitly_closed: criteriaClosed,
      acceptance_criteria_unknown: criteriaUnknown,
      completion_state: completionState,
    };
  });

  const relationshipCounts = {
    PRERREQUISITO_DE: packageRows.reduce((sum, row) => sum + row.relations.PRERREQUISITO_DE.length, 0),
    IMPLEMENTADO_POR: packageRows.reduce((sum, row) => sum + row.relations.IMPLEMENTADO_POR.length, 0),
    CONSUMIDO_POR: packageRows.reduce((sum, row) => sum + row.relations.CONSUMIDO_POR.length, 0),
    EVIDENCIADO_POR: packageRows.reduce((sum, row) => sum + row.relations.EVIDENCIADO_POR.length, 0),
    CIERRA_CRITERIO_DE: packageRows.reduce((sum, row) => sum + row.relations.CIERRA_CRITERIO_DE.length, 0),
  };
  const closureCounts = {
    CLOSED: packageRows.filter(({ closure }) => closure.closure_state === 'CLOSED').length,
    OPEN: packageRows.filter(({ closure }) => closure.closure_state === 'OPEN').length,
  };

  const result = {
    schema_version: 1,
    model_id: APPLICATION_CLOSURE_MODEL_ID,
    source_semantics: {
      consumer_source: CONSUMER_SOURCE,
      package_count_required: CANONICAL_PACKAGE_COUNT,
      package_closure_authority: 'SHELL-CI-024::<package_id> VERIFIED WITH EVIDENCE',
      generic_consumer_policy: 'UNKNOWN_NOT_INFERRED',
      criterion_closure_policy: 'EXPLICIT_TREQ_PASS_ONLY',
    },
    applications,
    packages: packageRows,
    metrics: {
      canonical_packages: packageRows.length,
      applications: applications.length,
      package_closure_counts: closureCounts,
      relationship_counts: relationshipCounts,
      packages_with_unresolved_consumers: packageRows.filter(({ unresolved_consumers: unresolved }) => unresolved.length > 0).length,
      acceptance_criteria_total: packageRows.reduce((sum, row) => sum + row.closure.acceptance_criteria_total, 0),
      acceptance_criteria_explicitly_closed: packageRows.reduce((sum, row) => sum + row.closure.acceptance_criteria_explicitly_closed, 0),
      acceptance_criteria_unknown: packageRows.reduce((sum, row) => sum + row.closure.acceptance_criteria_unknown, 0),
    },
  };
  return {
    ...result,
    fingerprint_sha256: sha256(stableJson(result)),
  };
}

export function loadPackageApplicationClosure({ root = process.cwd(), registry } = {}) {
  if (!registry) fail('registry es obligatorio.');
  const consumerPath = path.join(root, ...CONSUMER_SOURCE.split('/'));
  if (!fs.existsSync(consumerPath)) fail(`No existe ${CONSUMER_SOURCE}.`);
  const consumerProjection = parseCapabilityConsumerProjection(fs.readFileSync(consumerPath, 'utf8'));
  return buildPackageApplicationClosure({
    registry,
    consumerProjection,
    packageGates: readJsonDirectory(root, PACKAGE_GATE_DIR),
    implementationInstances: readJsonDirectory(root, IMPLEMENTATION_INSTANCE_DIR),
  });
}

function printStatus(model) {
  console.log('=== PACKAGE APPLICATION CLOSURE ===');
  console.log(`MODEL_ID: ${model.model_id}`);
  console.log(`CANONICAL_PACKAGES: ${model.metrics.canonical_packages}`);
  console.log(`APPLICATIONS: ${model.metrics.applications}`);
  console.log(`PACKAGES_CLOSED: ${model.metrics.package_closure_counts.CLOSED}`);
  console.log(`PACKAGES_OPEN: ${model.metrics.package_closure_counts.OPEN}`);
  console.log(`PACKAGES_WITH_UNRESOLVED_CONSUMERS: ${model.metrics.packages_with_unresolved_consumers}`);
  console.log(`ACCEPTANCE_CRITERIA_TOTAL: ${model.metrics.acceptance_criteria_total}`);
  console.log(`ACCEPTANCE_CRITERIA_EXPLICITLY_CLOSED: ${model.metrics.acceptance_criteria_explicitly_closed}`);
  console.log(`ACCEPTANCE_CRITERIA_UNKNOWN: ${model.metrics.acceptance_criteria_unknown}`);
  console.log(`RELATIONSHIP_COUNTS: ${JSON.stringify(model.metrics.relationship_counts)}`);
  console.log(`FINGERPRINT_SHA256: ${model.fingerprint_sha256}`);
  console.log('CANONICAL_MUTATIONS: NO');
}

async function main() {
  const args = process.argv.slice(2);
  const allowed = new Set(['--check', '--json']);
  const unknown = args.filter((entry) => !allowed.has(entry));
  if (unknown.length > 0) fail(`argumentos desconocidos: ${unknown.join(', ')}.`);
  const { scanPackageReadiness } = await import('./package-readiness-scanner.mjs');
  const registry = scanPackageReadiness({
    root: process.cwd(),
    check: true,
    trigger: 'package-application-closure',
    supplied: { skipDerivedReports: true },
  }).registry;
  const model = loadPackageApplicationClosure({ root: process.cwd(), registry });
  if (args.includes('--json')) console.log(JSON.stringify(model, null, 2));
  else printStatus(model);
}

const isCli = process.argv[1]
  && path.resolve(process.argv[1]) === path.resolve(fileURLToPath(import.meta.url));

if (isCli) {
  main().catch((error) => {
    console.error(`ERROR: ${error instanceof Error ? error.message : String(error)}`);
    throw error;
  });
}
