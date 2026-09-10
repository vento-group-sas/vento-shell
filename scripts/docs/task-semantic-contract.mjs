import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

import { derivePreflight } from './canonical-task-preflight.mjs';
import { parseTaskBlocks, validateTaskPresentation } from './format-canonical-task.mjs';

const TASK_REFERENCE = /\b[A-Z][A-Z0-9]*(?:-[A-Z0-9]+)+-\d{3}(?!\d)\b/gu;
const METADATA = /^\*\*(?<label>[^*\n]+):\*\*\s*(?<value>.*)$/u;
const SECTION = /^####(?:\s+\d+\.)?\s+(?<title>.+)$/gmu;
const FINDING_CODES = new Set([
  'EMPTY_DRAFT',
  'PRESENTATION',
  'HEADER_FIELD_MISSING',
  'OWNER_FILE_MISMATCH',
  'OWNER_REPOSITORY_MISSING',
  'PHYSICAL_SCOPE_CONTRADICTION',
  'SECTION_MISSING',
  'UNRESOLVED_PLACEHOLDER',
  'UNKNOWN_TASK_REFERENCE',
  'EVIDENCE_STATUS_INVALID',
  'EVIDENCE_MISSING',
  'EVIDENCE_CLASS_CARDINALITY',
  'TREQ_COUNT_CONTRADICTION',
]);

function stripInline(value) {
  return String(value ?? '').trim().replace(/^`|`$/gu, '');
}

export function metadataFromTaskBlock(block) {
  const metadata = new Map();
  for (const line of block.replace(/\r\n?/gu, '\n').split('\n').slice(1)) {
    if (line.trim() === '') continue;
    if (line.trim() === '---') break;
    const match = line.match(METADATA);
    if (!match) break;
    metadata.set(match.groups.label.trim(), stripInline(match.groups.value));
  }
  return metadata;
}

export function taskSectionTitles(block) {
  return [...block.matchAll(SECTION)].map((match) => match.groups.title.trim());
}

function sectionSource(block, titlePattern) {
  const normalized = block.replace(/\r\n?/gu, '\n');
  const matches = [...normalized.matchAll(SECTION)];
  const targetIndex = matches.findIndex((match) => titlePattern.test(match.groups.title));
  if (targetIndex < 0) return null;
  const start = matches[targetIndex].index + matches[targetIndex][0].length;
  const end = matches[targetIndex + 1]?.index ?? normalized.length;
  return normalized.slice(start, end).trim();
}

export function extractValidationEvidence(block) {
  const source = sectionSource(block, /Evidencia de validación/iu);
  if (!source) return [];
  const rows = [];
  for (const line of source.split('\n')) {
    if (!/^\s*\|/u.test(line)) continue;
    const cells = line.split('|').slice(1, -1).map((cell) => stripInline(cell));
    if (cells.length < 3 || cells[0] === 'Clase' || /^-+$/u.test(cells[0])) continue;
    rows.push({ class: cells[0], status: cells[1], evidence: cells.slice(2).join(' | ') });
  }
  return rows;
}

export function readCanonicalTaskInventory(root = process.cwd()) {
  const baseDir = path.join(root, 'docs', 'plan-canonico', 'modular');
  const manifest = JSON.parse(fs.readFileSync(path.join(baseDir, 'manifest.json'), 'utf8'));
  const inventory = new Map();

  const addFile = (relativePath, { preserveCanonical = false } = {}) => {
    const filePath = path.join(baseDir, relativePath);
    if (!fs.existsSync(filePath) || !relativePath.endsWith('.md')) return;
    const source = fs.readFileSync(filePath, 'utf8');
    for (const task of parseTaskBlocks(source)) {
      if (preserveCanonical && inventory.has(task.id)) continue;
      inventory.set(task.id, {
        ...task,
        relativePath: relativePath.replaceAll('\\', '/'),
        filePath,
      });
    }
  };

  for (const relativePath of manifest.files ?? []) addFile(relativePath);
  for (const relativePath of manifest.auxiliary_files ?? []) {
    addFile(relativePath, { preserveCanonical: true });
  }

  return inventory;
}

function canonicalPrefix(taskId) {
  return taskId.replace(/-\d{3}$/u, '');
}

function physicalContradiction(metadata) {
  const state = metadata.get('Estado físico resultante') ?? '';
  const changes = metadata.get('Cambios físicos autorizados') ?? '';
  const normalizedChanges = changes.replaceAll('`', '').trim();
  const noPhysicalChanges = /^(?:0|cero|ninguno)(?:\s+(?:durante|en)\s+(?:(?:el|este)\s+marcador(?:\s+global)?|(?:esta|la)\s+tarea))?(?:\s*[.;]|$)/iu
    .test(normalizedChanges)
    || /^sin\s+(?:cambios?|modificaciones?)\s+físic[oa]s?(?:\s+autorizad[oa]s?)?(?:\s*[.;]|$)/iu
      .test(normalizedChanges);
  return /NO_MATERIALIZADO|NO MATERIALIZADO/iu.test(state) && !noPhysicalChanges;
}

function passEvidenceIsMissing(evidence) {
  const value = String(evidence ?? '').trim();
  if (!value) return true;
  return /^(?:`?not(?:[_\s.-]+)?executed`?|(?:la\s+)?evidencia\s+pendiente)(?:\b|[.:;-])/iu.test(value)
    || /\b(?:evidencia|validación|verificación|ejecución|prueba)\s+(?:aún\s+)?pendiente\b/iu.test(value)
    || /\bpendiente\s+de\s+(?:ejecutar|ejecución|validar|validación|verificar|verificación|confirmar|obtener|capturar|aportar)\b/iu.test(value)
    || /\b(?:sin|no\s+se\s+ha)\s+(?:ejecutar|ejecutado|validar|validado|verificar|verificado)\b/iu.test(value);
}

export function validateTaskDevelopmentPolicy(policy) {
  const errors = [];
  if (policy?.schema_version !== 1) errors.push('schema_version debe ser 1.');
  if (!/^[A-Z][A-Z0-9]*(?:-[A-Z0-9]+)+-\d{3}$/u.test(policy?.effective_from_task_id ?? '')) {
    errors.push('effective_from_task_id debe ser un ID canónico válido.');
  }
  if (policy?.historical_policy !== 'PRESERVE_BEFORE_BOUNDARY') {
    errors.push('historical_policy debe preservar las tareas anteriores.');
  }
  if (policy?.draft_enforcement !== 'WARNING' || policy?.approved_enforcement !== 'ERROR') {
    errors.push('la política debe advertir en borrador y bloquear únicamente aprobaciones.');
  }
  for (const key of [
    'required_header_fields',
    'required_section_groups',
    'required_evidence_classes',
    'allowed_evidence_statuses',
    'blocking_codes',
  ]) {
    if (!Array.isArray(policy?.[key]) || policy[key].length === 0) errors.push(`${key} debe ser un arreglo no vacío.`);
  }
  const unknownBlockingCodes = (policy?.blocking_codes ?? []).filter((code) => !FINDING_CODES.has(code));
  if (unknownBlockingCodes.length > 0) {
    errors.push(`blocking_codes contiene códigos desconocidos: ${unknownBlockingCodes.join(', ')}.`);
  }
  if (typeof policy?.forbidden_placeholder_pattern !== 'string') {
    errors.push('forbidden_placeholder_pattern debe ser un string.');
  } else {
    try {
      new RegExp(policy.forbidden_placeholder_pattern, 'u');
    } catch {
      errors.push('forbidden_placeholder_pattern no es una expresión regular válida.');
    }
  }
  for (const selector of policy?.historical_approved_exemptions ?? []) {
    const exactIds = Array.isArray(selector?.task_ids) && selector.task_ids.length > 0;
    const range = typeof selector?.prefix === 'string'
      && Number.isInteger(selector?.from)
      && Number.isInteger(selector?.to)
      && selector.from > 0
      && selector.to >= selector.from;
    if (exactIds === range) {
      errors.push('historical_approved_exemptions debe usar task_ids o un rango prefix/from/to, pero no ambos.');
    }
  }
  return errors;
}

export function isHistoricalApprovedExemption(taskId, policy) {
  for (const selector of policy?.historical_approved_exemptions ?? []) {
    if (selector.task_ids?.includes(taskId)) return true;
    if (typeof selector.prefix !== 'string') continue;
    const match = taskId.match(/^(?<prefix>[A-Z][A-Z0-9]*(?:-[A-Z0-9]+)+)-(?<number>\d{3})$/u);
    if (!match || match.groups.prefix !== selector.prefix) continue;
    const number = Number(match.groups.number);
    if (number >= selector.from && number <= selector.to) return true;
  }
  return false;
}

export function validateTaskSemanticContract({
  block,
  task,
  ownerRelativePath,
  inventory,
  policy,
  root = process.cwd(),
}) {
  const findings = [];
  const approved = task.state === 'APROBADA';
  const blockingCodes = new Set(policy.blocking_codes ?? []);
  const add = (code, message) => findings.push({
    severity: approved && blockingCodes.has(code) ? 'ERROR' : 'WARNING',
    code,
    message,
  });
  const sections = taskSectionTitles(block);
  if (sections.length === 0) {
    add('EMPTY_DRAFT', 'la tarea continúa como borrador vacío; no se inicia automáticamente.');
    return {
      errors: findings.filter(({ severity }) => severity === 'ERROR'),
      warnings: findings.filter(({ severity }) => severity === 'WARNING'),
      evidence: [],
    };
  }

  for (const message of validateTaskPresentation(block)) add('PRESENTATION', message);
  const metadata = metadataFromTaskBlock(block);
  for (const label of policy.required_header_fields ?? []) {
    if (!metadata.get(label)) add('HEADER_FIELD_MISSING', `falta el campo de cabecera ${label}.`);
  }
  const declaredOwner = metadata.get('Archivo propietario');
  if (declaredOwner && declaredOwner.replaceAll('\\', '/') !== `docs/plan-canonico/modular/${ownerRelativePath}`) {
    add('OWNER_FILE_MISMATCH', `Archivo propietario no coincide con ${ownerRelativePath}.`);
  }
  const repositoryOwner = metadata.get('Repositorio propietario');
  if (repositoryOwner?.startsWith('vento-group-sas/')) {
    const repositoryName = repositoryOwner.split('/').at(-1);
    const repositoryPath = path.join(path.dirname(root), repositoryName);
    if (!fs.existsSync(repositoryPath)) add('OWNER_REPOSITORY_MISSING', `no existe el repositorio propietario ${repositoryOwner}.`);
  }
  if (physicalContradiction(metadata)) {
    add(
      'PHYSICAL_SCOPE_CONTRADICTION',
      `Estado físico resultante declara "${metadata.get('Estado físico resultante')}", pero Cambios físicos autorizados declara "${metadata.get('Cambios físicos autorizados')}".`,
    );
  }

  for (const required of policy.required_section_groups ?? []) {
    const pattern = new RegExp(required.pattern, 'iu');
    if (!sections.some((title) => pattern.test(title))) {
      add('SECTION_MISSING', `falta una sección de ${required.label}.`);
    }
  }
  const placeholderPattern = new RegExp(policy.forbidden_placeholder_pattern, 'gu');
  const unresolvedPlaceholders = [...block.matchAll(placeholderPattern)].map((match) => ({
    value: match[0],
    line: block.slice(0, match.index).split(/\r?\n/u).length,
  }));
  if (unresolvedPlaceholders.length > 0) {
    add(
      'UNRESOLVED_PLACEHOLDER',
      `persisten placeholders sin resolver: ${unresolvedPlaceholders.map(({ value, line }) => `${value} (línea ${line})`).join(', ')}.`,
    );
  }

  const knownIds = new Set(inventory.keys());
  const knownPrefixes = new Set([...knownIds].map(canonicalPrefix));
  const unknownReferences = [...new Set(block.match(TASK_REFERENCE) ?? [])]
    .filter((id) => !id.startsWith('TREQ-'))
    .filter((id) => knownPrefixes.has(canonicalPrefix(id)) && !knownIds.has(id));
  if (unknownReferences.length > 0) {
    add('UNKNOWN_TASK_REFERENCE', `referencias canónicas inexistentes: ${unknownReferences.join(', ')}.`);
  }

  const evidence = extractValidationEvidence(block);
  const allowedStatuses = new Set(policy.allowed_evidence_statuses ?? []);
  const rowsByClass = new Map();
  for (const row of evidence) {
    if (!rowsByClass.has(row.class)) rowsByClass.set(row.class, []);
    rowsByClass.get(row.class).push(row);
    if (!allowedStatuses.has(row.status)) {
      add('EVIDENCE_STATUS_INVALID', `${row.class} usa el estado no permitido ${row.status}.`);
    }
    if (row.status === 'PASS' && passEvidenceIsMissing(row.evidence)) {
      add('EVIDENCE_MISSING', `${row.class} declara PASS sin evidencia concreta.`);
    }
  }
  for (const evidenceClass of policy.required_evidence_classes ?? []) {
    const rows = rowsByClass.get(evidenceClass) ?? [];
    if (rows.length !== 1) add('EVIDENCE_CLASS_CARDINALITY', `${evidenceClass} debe aparecer exactamente una vez.`);
  }

  const treqCountSource = metadata.get('Requisitos de prueba creados o modificados');
  const treqCount = treqCountSource !== undefined && /^\d+$/u.test(treqCountSource)
    ? Number(treqCountSource)
    : null;
  const testSection = sectionSource(block, /Requisitos de prueba derivados/iu) ?? '';
  if (/NO GENERA REQUISITOS DE PRUEBA/iu.test(testSection) && treqCount !== null && treqCount !== 0) {
    add('TREQ_COUNT_CONTRADICTION', 'la cabecera declara TREQ modificados, pero la sección declara que no genera requisitos.');
  }
  if (/GENERA REQUISITOS DE PRUEBA/iu.test(testSection) && !/NO GENERA/iu.test(testSection) && treqCount !== null && treqCount === 0) {
    add('TREQ_COUNT_CONTRADICTION', 'la sección genera TREQ, pero la cabecera declara cero.');
  }

  return {
    errors: findings.filter(({ severity }) => severity === 'ERROR'),
    warnings: findings.filter(({ severity }) => severity === 'WARNING'),
    evidence,
  };
}

export function validateProspectiveTaskSemantics({ root = process.cwd(), taskId = null } = {}) {
  const preflight = derivePreflight({ root, requestedTaskId: taskId });
  const policyPath = path.join(root, 'docs', 'plan-canonico', 'modular', 'task-development-policy.json');
  const policy = JSON.parse(fs.readFileSync(policyPath, 'utf8'));
  const policyErrors = validateTaskDevelopmentPolicy(policy);
  if (policyErrors.length > 0) {
    throw new Error(`task-development-policy.json inválida:\n- ${policyErrors.join('\n- ')}`);
  }
  const boundary = derivePreflight({ root, requestedTaskId: policy.effective_from_task_id });
  if (preflight.task.canonical_order < boundary.task.canonical_order) {
    return { skipped: true, errors: [], warnings: [], evidence: [], preflight };
  }
  const inventory = readCanonicalTaskInventory(root);
  const task = inventory.get(preflight.task.id);
  if (!task) throw new Error(`no se pudo aislar ${preflight.task.id}.`);
  const result = validateTaskSemanticContract({
    block: task.block,
    task: preflight.task,
    ownerRelativePath: task.relativePath,
    inventory,
    policy,
    root,
  });
  return { ...result, skipped: false, preflight, task, policy };
}

function main() {
  const result = validateProspectiveTaskSemantics();
  if (result.skipped) {
    console.log('OK: tarea anterior a la frontera semántica; preservada.');
    return;
  }
  for (const warning of result.warnings) console.warn(`[TASK QUALITY] ${warning.code}: ${warning.message}`);
  if (result.errors.length > 0) {
    throw new Error(result.errors.map(({ code, message }) => `${code}: ${message}`).join('\n'));
  }
  console.log(`OK: contrato semántico ${result.preflight.task.id}; ${result.warnings.length} advertencia(s).`);
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
