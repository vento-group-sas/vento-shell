import crypto from 'node:crypto';
import fs from 'node:fs';
import path from 'node:path';
import { pathToFileURL } from 'node:url';

import { derivePreflight } from './canonical-task-preflight.mjs';
import { readCanonicalTaskInventory } from './task-semantic-contract.mjs';
import { resolveTaskWorkTopology } from './task-work-topology.mjs';

const BASE_DIR = 'docs/plan-canonico/modular';
const CONTRACT_PATH = `${BASE_DIR}/delivery-contract.json`;
const FORMAT_POLICY_PATH = `${BASE_DIR}/task-format-policy.json`;
const DEVELOPMENT_POLICY_PATH = `${BASE_DIR}/task-development-policy.json`;
const ACTIVE_SEQUENCE_PATH = `${BASE_DIR}/active-sequence.json`;
const REGISTRY_DIR = `${BASE_DIR}/bloques/E1_DESCUBRIMIENTO_OPERATIVO`;
const CAPSULE_SCHEMA_VERSION = 1;
const MAX_CAPSULE_CHARS = 115000;
const MAX_RELATED_TASKS = 6;
const MAX_TASK_EXCERPT_CHARS = 6000;
const STRUCTURAL_REFERENCE_COUNT = 3;
const STRUCTURAL_REFERENCE_EXCERPT_CHARS = 4500;
const STRUCTURAL_SECTION_RATIO = 0.65;
const STRUCTURAL_CHARACTER_RATIO = 0.50;
const STRUCTURAL_MIN_SECTIONS = 20;
const STRUCTURAL_MIN_CHARACTERS = 18000;
const STOP_WORDS = new Set([
  'a','al','con','como','cuando','de','del','e','el','en','entre','es','la','las','lo','los','o','para','por','que','se','sin','su','sus','un','una','y',
  'definir','separar','integrar','vincular','resolver','prohibir','emitir','todo','toda','todos','todas',
]);

function fail(message) {
  throw new Error(message);
}

export function sha256(value) {
  return crypto.createHash('sha256').update(value).digest('hex');
}

function readJson(root, relativePath, label = relativePath) {
  const filePath = path.join(root, ...relativePath.split('/'));
  if (!fs.existsSync(filePath)) fail(`no existe ${label}: ${relativePath}.`);
  return JSON.parse(fs.readFileSync(filePath, 'utf8'));
}

function normalizeText(value) {
  return String(value ?? '')
    .normalize('NFD')
    .replace(/\p{M}/gu, '')
    .toLowerCase();
}

export function titleKeywords(title) {
  return [...new Set(
    normalizeText(title)
      .replace(/[^a-z0-9]+/gu, ' ')
      .split(/\s+/u)
      .filter((token) => token.length >= 3 && !STOP_WORDS.has(token) && !/^\d+$/u.test(token)),
  )];
}

function taskStateApproved(task) {
  return task?.state === 'APROBADA' || task?.marker === '✅';
}

function escapeRegExp(value) {
  return String(value).replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

function scoreText(source, keywords) {
  const normalized = normalizeText(source);
  let score = 0;
  for (const keyword of keywords) {
    const matches = normalized.match(new RegExp(`\\b${escapeRegExp(keyword)}\\b`, 'gu'));
    score += (matches?.length ?? 0);
  }
  return score;
}

function metadataHead(block) {
  const normalized = String(block ?? '').replace(/\r\n?/gu, '\n');
  const separator = normalized.indexOf('\n---\n');
  if (separator >= 0) return normalized.slice(0, separator + 5);
  return normalized.split('\n').slice(0, 18).join('\n');
}

function keywordWindows(block, keywords) {
  const lines = String(block ?? '').replace(/\r\n?/gu, '\n').split('\n');
  const picked = new Set();
  for (let index = 0; index < lines.length; index += 1) {
    const normalized = normalizeText(lines[index]);
    if (!keywords.some((keyword) => normalized.includes(keyword))) continue;
    for (let offset = Math.max(0, index - 2); offset <= Math.min(lines.length - 1, index + 3); offset += 1) {
      picked.add(offset);
    }
  }
  return [...picked].sort((a, b) => a - b).map((index) => lines[index]).join('\n');
}

function selectedSections(block) {
  const normalized = String(block ?? '').replace(/\r\n?/gu, '\n');
  const sections = normalized.split(/(?=^####\s+)/gmu);
  const keep = /prop[oó]sito|objetivo|decisi[oó]n|regla|contrato|invariante|l[ií]mite|criterio|continuidad|requisito|identidad|lpn|contenedor/iu;
  return sections
    .filter((section) => keep.test(section.split('\n')[0] ?? ''))
    .slice(0, 8)
    .join('\n');
}

export function compactTaskBlock(block, keywords, maxChars = MAX_TASK_EXCERPT_CHARS) {
  const parts = [metadataHead(block), selectedSections(block), keywordWindows(block, keywords)]
    .map((entry) => entry.trim())
    .filter(Boolean);
  const combined = [...new Set(parts)].join('\n\n').trim();
  if (combined.length <= maxChars) return combined;
  return `${combined.slice(0, maxChars)}\n...[EXCERPT_TRUNCATED]`;
}

function sectionTitles(block) {
  return [...String(block ?? '').replace(/\r\n?/gu, '\n').matchAll(/^####\s+(.+)$/gmu)]
    .map((match) => match[1].trim());
}

function median(values) {
  const sorted = [...values].filter(Number.isFinite).sort((a, b) => a - b);
  if (sorted.length === 0) return 0;
  const middle = Math.floor(sorted.length / 2);
  return sorted.length % 2 === 1
    ? sorted[middle]
    : (sorted[middle - 1] + sorted[middle]) / 2;
}

function structuralReferenceExcerpt(block, maxChars = STRUCTURAL_REFERENCE_EXCERPT_CHARS) {
  const normalized = String(block ?? '').replace(/\r\n?/gu, '\n');
  const sections = normalized.split(/(?=^####\s+)/gmu);
  const keep = /resultado|artefact|matriz|escenario|contrato|regla|invariante|estado remoto|snapshot|as-is|legacy|brecha|reconciliaci[oó]n|riesgo|handoff|pendiente|propietario|auditor[ií]a|autorizaci[oó]n|idempotencia|concurrencia|offline|criterio|l[ií]mite|continuidad/iu;
  const selected = sections
    .filter((section) => keep.test(section.split('\n')[0] ?? ''))
    .slice(0, 14)
    .join('\n');
  const combined = [metadataHead(normalized), selected]
    .map((entry) => entry.trim())
    .filter(Boolean)
    .join('\n\n');
  if (combined.length <= maxChars) return combined;
  return combined.slice(0, maxChars) + '\n...[STRUCTURAL_REFERENCE_TRUNCATED]';
}

export function taskStructureProfile(task) {
  const block = String(task?.block ?? '').replace(/\r\n?/gu, '\n').trim();
  const lines = block ? block.split('\n') : [];
  const headings = sectionTitles(block);
  const fenceCount = lines.filter((line) => line.trimStart().startsWith('```')).length;
  return {
    id: task?.id ?? null,
    title: task?.title ?? null,
    owner: task?.relativePath ?? null,
    section_count: headings.length,
    character_count: block.length,
    line_count: lines.length,
    table_row_count: lines.filter((line) => /^\s*\|.*\|\s*$/u.test(line)).length,
    code_block_count: Math.floor(fenceCount / 2),
    section_titles: headings,
    excerpt: structuralReferenceExcerpt(block),
  };
}

export function buildStructuralBaseline(inventory, current, { complexity = 'SUBSTANTIVE' } = {}) {
  const ordered = [...inventory.values()];
  const currentIndex = ordered.findIndex((task) => task.id === current.id);
  if (currentIndex < 0) {
    return {
      enforced: false,
      reason: 'CURRENT_NOT_IN_CANONICAL_INVENTORY',
      references: [],
      quality_floor: null,
    };
  }

  const references = [];
  for (
    let index = currentIndex - 1;
    index >= 0 && references.length < STRUCTURAL_REFERENCE_COUNT;
    index -= 1
  ) {
    const task = ordered[index];
    if (task.relativePath !== current.relativePath) continue;
    if (!taskStateApproved(task)) continue;
    references.push(taskStructureProfile(task));
  }

  const enforced = complexity !== 'ROUTINE' && references.length >= 2;
  const sectionMedian = median(references.map(({ section_count }) => section_count));
  const characterMedian = median(references.map(({ character_count }) => character_count));

  return {
    enforced,
    policy: 'DYNAMIC_SAME_OWNER_PREDECESSOR_PARITY',
    reference_count: references.length,
    references,
    medians: {
      section_count: sectionMedian,
      character_count: characterMedian,
    },
    quality_floor: enforced ? {
      min_section_count: Math.max(
        STRUCTURAL_MIN_SECTIONS,
        Math.floor(sectionMedian * STRUCTURAL_SECTION_RATIO),
      ),
      min_character_count: Math.max(
        STRUCTURAL_MIN_CHARACTERS,
        Math.floor(characterMedian * STRUCTURAL_CHARACTER_RATIO),
      ),
      section_ratio: STRUCTURAL_SECTION_RATIO,
      character_ratio: STRUCTURAL_CHARACTER_RATIO,
    } : null,
    rule: enforced
      ? 'El candidato no puede ser materialmente mas superficial que sus predecesores aprobados del mismo owner sin devolver STOP.'
      : 'Baseline informativo; no hay suficientes predecesores comparables para enforcement.',
  };
}

export function classifyComplexity({ task, relatedCount = 0 } = {}) {
  const haystack = normalizeText(`${task?.id ?? ''} ${task?.title ?? ''} ${task?.relativePath ?? ''}`);
  const complex = [
    'supabase','rls','migracion','migration','cutover','backfill','seguridad','security','credencial','secreto','deploy','despliegue','auth','autorizacion','concurrencia','idempotencia','reconciliacion','ledger','financ','integracion','transicion',
  ];
  if (complex.some((token) => haystack.includes(token))) return 'COMPLEX';
  if (/\b(inventariar|enumerar|listar|registrar|catalogar)\b/iu.test(task?.title ?? '') && relatedCount <= 3) {
    return 'ROUTINE';
  }
  return 'SUBSTANTIVE';
}

function resolveRegistryFragment(root, taskId) {
  const domain = String(taskId).split('-')[0];
  const directory = path.join(root, ...REGISTRY_DIR.split('/'));
  const matches = fs.readdirSync(directory)
    .filter((name) => new RegExp(`^04A_\\d+_${domain}\\.md$`, 'u').test(name));
  if (matches.length !== 1) {
    fail(`se esperaba exactamente un fragmento 04A para dominio ${domain}; encontrados: ${matches.join(', ') || 'NINGUNO'}.`);
  }
  return `${REGISTRY_DIR}/${matches[0]}`;
}

function parseRegistryRows(source) {
  return String(source ?? '')
    .replace(/\r\n?/gu, '\n')
    .split('\n')
    .filter((line) => /^\| `TREQ-[A-Z]+-\d{3,}` \|/u.test(line));
}

function registryContext(source, taskId, keywords) {
  const rows = parseRegistryRows(source);
  const domain = String(taskId).split('-')[0];
  const idPattern = new RegExp(`TREQ-${domain}-(\\d{3,})`, 'u');
  let maxNumber = 0;
  for (const row of rows) {
    const match = row.match(idPattern);
    if (match) maxNumber = Math.max(maxNumber, Number(match[1]));
  }
  const scored = rows
    .map((row) => ({ row, score: scoreText(row, keywords) + (row.includes(taskId) ? 20 : 0) }))
    .filter(({ score }) => score > 0)
    .sort((left, right) => right.score - left.score || left.row.localeCompare(right.row, 'en'))
    .slice(0, 10)
    .map(({ row }) => row);
  const tail = rows.slice(-3);
  return {
    domain,
    requirement_count: rows.length,
    max_numeric_id: maxNumber,
    next_candidate_id: `TREQ-${domain}-${String(maxNumber + 1).padStart(3, '0')}`,
    relevant_rows: [...new Set([...scored, ...tail])],
  };
}

function incomingReferences(inventory, taskId, limit = 12) {
  const found = [];
  for (const task of inventory.values()) {
    if (task.id === taskId) continue;
    if (String(task.block ?? '').includes(taskId)) {
      found.push({ id: task.id, title: task.title, state: task.state, owner: task.relativePath });
    }
  }
  return found.slice(0, limit);
}

function relatedApprovedTasks(inventory, current, keywords) {
  return [...inventory.values()]
    .filter((task) => task.id !== current.id && taskStateApproved(task))
    .map((task) => {
      const sameOwner = task.relativePath === current.relativePath ? 6 : 0;
      const titleScore = scoreText(task.title, keywords) * 5;
      const blockScore = Math.min(8, scoreText(task.block, keywords));
      const predecessor = current.id && String(current.block ?? '').includes(task.id) ? 12 : 0;
      return { task, score: sameOwner + titleScore + blockScore + predecessor };
    })
    .filter(({ score }) => score > 0)
    .sort((left, right) => right.score - left.score || left.task.id.localeCompare(right.task.id, 'en'))
    .slice(0, MAX_RELATED_TASKS);
}

export function validateAuthorizationForPhase2({ authorization, preflight, activeSequence, now = new Date() } = {}) {
  if (authorization?.status !== 'AUTHORIZED' || authorization?.lane !== 'DOCUMENTATION') {
    fail('autorización nocturna inválida o fuera del carril DOCUMENTATION.');
  }
  if (authorization?.physical_authorization?.granted !== false || authorization?.physical_authorization?.scope !== 'NONE') {
    fail('FASE 2 exige physical_authorization NONE.');
  }
  if (authorization?.phase_2_capabilities?.author_review_enabled !== true) {
    fail('la autorización no habilita FASE 2 author/review.');
  }
  if (authorization?.phase_2_capabilities?.repository_mutation_enabled !== false) {
    fail('FASE 2 no puede autorizar mutación del repositorio.');
  }
  const cutoff = new Date(authorization?.limits?.cutoff_utc ?? '');
  if (Number.isNaN(cutoff.getTime()) || cutoff.getTime() <= now.getTime()) {
    fail('la autorización nocturna está vencida o no tiene cutoff válido.');
  }
  if (preflight?.task?.current !== true || !preflight?.task?.id) {
    fail('preflight no resolvió una tarea documental actual.');
  }
  if (
    preflight?.continuity?.route !== authorization?.start_scope?.route_id
    || preflight?.continuity?.sequence !== authorization?.start_scope?.sequence_id
  ) {
    fail('la unidad actual salió de la ruta/secuencia autorizada.');
  }
  if (activeSequence?.block_code !== authorization?.start_scope?.block_code) {
    fail('la unidad actual cruzó de bloque; FASE 2 V1 prohíbe block crossing.');
  }
  const blockers = Array.isArray(preflight?.blockers) ? preflight.blockers : [];
  if (blockers.length > 0) fail(`preflight documental bloqueado: ${blockers.join(' | ')}`);
  return true;
}

export function buildContextCapsule({ root = process.cwd(), authorization, now = new Date() } = {}) {
  const preflight = derivePreflight({ root });
  const activeSequence = readJson(root, ACTIVE_SEQUENCE_PATH, 'active-sequence.json');
  validateAuthorizationForPhase2({ authorization, preflight, activeSequence, now });

  const inventory = readCanonicalTaskInventory(root);
  const current = inventory.get(preflight.task.id);
  if (!current) fail(`no se pudo leer la tarea actual ${preflight.task.id}.`);

  const topologyResult = resolveTaskWorkTopology({ root });
  if (Array.isArray(topologyResult.errors) && topologyResult.errors.length > 0) {
    fail(`topología inválida: ${topologyResult.errors.join(' | ')}`);
  }
  const topology = topologyResult.topology?.get?.(current.id) ?? topologyResult.get?.(current.id) ?? null;
  if (!topology) fail(`no se resolvió topología para ${current.id}.`);
  if (topology.mode !== 'DEFINE_ONCE' || topology.executionGate !== 'NO_PHYSICAL_INSTANCE') {
    fail(`${current.id} no es una unidad documental DEFINE_ONCE/NO_PHYSICAL_INSTANCE apta para FASE 2.`);
  }

  const keywords = titleKeywords(current.title);
  const related = relatedApprovedTasks(inventory, current, keywords);
  const registryPath = resolveRegistryFragment(root, current.id);
  const registrySource = fs.readFileSync(path.join(root, ...registryPath.split('/')), 'utf8');
  const contract = readJson(root, CONTRACT_PATH);
  const formatPolicy = readJson(root, FORMAT_POLICY_PATH);
  const developmentPolicy = readJson(root, DEVELOPMENT_POLICY_PATH);
  const complexity = classifyComplexity({ task: current, relatedCount: related.length });
  const structuralBaseline = buildStructuralBaseline(inventory, current, { complexity });

  const capsule = {
    schema_version: CAPSULE_SCHEMA_VERSION,
    generated_at: now.toISOString(),
    authorization: {
      identity: authorization.authorization_identity,
      sha256: authorization.authorization_sha256,
      route_id: authorization.start_scope.route_id,
      sequence_id: authorization.start_scope.sequence_id,
      block_code: authorization.start_scope.block_code,
      cutoff_utc: authorization.limits.cutoff_utc,
      max_tasks: authorization.limits.max_tasks,
      main_snapshot_policy: 'EVIDENCE_ONLY_NOT_PINNED',
    },
    current: {
      id: current.id,
      title: current.title,
      state: current.state,
      owner: `docs/plan-canonico/modular/${current.relativePath}`,
      marker_source: current.block,
      previous_id: preflight.continuity.previous,
      next_id: preflight.continuity.next,
      route_id: preflight.continuity.route,
      sequence_id: preflight.continuity.sequence,
      block_code: activeSequence.block_code,
      block_title: activeSequence.block_title ?? null,
      topology: {
        mode: topology.mode,
        execution_gate: topology.executionGate,
        canonical_work: topology.canonicalWork,
        execution_rule: topology.executionRule,
      },
      validators: preflight.validators,
    },
    complexity,
    structural_baseline: structuralBaseline,
    drafting_contract: {
      task_artifact: contract.task_artifact,
      registry_artifact: contract.registry_artifact,
      task_format_policy: formatPolicy,
      task_development_policy: developmentPolicy,
      hard_rules: [
        'No inventar identificadores, títulos, rutas, paquetes, repositorios, relaciones TREQ ni resultados de validación.',
        'El candidato debe contener exactamente una tarea completa y estar preformateado como APROBADA.',
        'No ejecutar ni autorizar cambios físicos.',
        'Si faltan hechos canónicos necesarios para una decisión, devolver STOP en vez de inferir.',
        'Los cambios TREQ deben expresarse como filas semánticas completas de catorce columnas; nunca modificar historial ajeno.',
        'La continuidad debe conservar última aprobada, actual aprobada y siguiente reservada.',
        'Los required_section_groups son un mínimo sintáctico, no un objetivo de profundidad; structural_baseline gobierna la paridad mínima con tareas aprobadas vecinas del mismo owner.',
      ],
    },
    related_approved_tasks: related.map(({ task, score }) => ({
      id: task.id,
      title: task.title,
      owner: task.relativePath,
      relevance_score: score,
      excerpt: compactTaskBlock(task.block, keywords),
    })),
    incoming_references: incomingReferences(inventory, current.id),
    registry: {
      path: registryPath,
      ...registryContext(registrySource, current.id, keywords),
      columns: [
        'ID','Dominio','Regla protegida','Origen','Riesgo / prioridad','Tipo / modalidad','Tarea responsable','Paquete','Repositorio / ambiente','Estado','Artefacto','Último resultado','Evidencia','Relación',
      ],
    },
  };

  const serialized = JSON.stringify(capsule);
  if (serialized.length > MAX_CAPSULE_CHARS) {
    fail(`cápsula excede el presupuesto de ${MAX_CAPSULE_CHARS} caracteres: ${serialized.length}.`);
  }
  return {
    ...capsule,
    capsule_sha256: sha256(serialized),
    capsule_characters: serialized.length,
  };
}

export function writeContextCapsule({ root = process.cwd(), authorizationPath, outputPath, now = new Date() } = {}) {
  if (!authorizationPath) fail('NIGHT_AUTHORIZATION_PATH es obligatorio.');
  if (!outputPath) fail('NIGHT_CONTEXT_OUTPUT es obligatorio.');
  if (!fs.existsSync(authorizationPath)) fail(`no existe authorization.json: ${authorizationPath}.`);
  const authorization = JSON.parse(fs.readFileSync(authorizationPath, 'utf8'));
  const capsule = buildContextCapsule({ root, authorization, now });
  fs.mkdirSync(path.dirname(outputPath), { recursive: true });
  fs.writeFileSync(outputPath, `${JSON.stringify(capsule, null, 2)}\n`, 'utf8');
  return capsule;
}

async function main() {
  const root = process.cwd();
  const authorizationPath = String(process.env.NIGHT_AUTHORIZATION_PATH ?? '').trim();
  const outputPath = String(process.env.NIGHT_CONTEXT_OUTPUT ?? '').trim();
  const capsule = writeContextCapsule({ root, authorizationPath, outputPath });
  console.log('=== RESULTADO PARA CHATGPT ===');
  console.log('ESTADO: PASS');
  console.log('OPERACION: NIGHT_DOCUMENTATION_CONTEXT');
  console.log(`TASK_ID: ${capsule.current.id}`);
  console.log(`COMPLEXITY: ${capsule.complexity}`);
  console.log(`CONTEXT_SHA256: ${capsule.capsule_sha256}`);
  console.log(`CONTEXT_CHARACTERS: ${capsule.capsule_characters}`);
  console.log(`RELATED_TASKS: ${capsule.related_approved_tasks.length}`);
  console.log(`REGISTRY_NEXT_CANDIDATE_ID: ${capsule.registry.next_candidate_id}`);
  console.log('REPOSITORY_MUTATION: NO');
  console.log('PHYSICAL_AUTHORIZATION: NONE');
  console.log('=== FIN RESULTADO PARA CHATGPT ===');
}

const invokedDirectly = process.argv[1]
  && import.meta.url === pathToFileURL(path.resolve(process.argv[1])).href;

if (invokedDirectly) {
  main().catch((error) => {
    console.error('=== RESULTADO PARA CHATGPT ===');
    console.error('ESTADO: FAIL');
    console.error('OPERACION: NIGHT_DOCUMENTATION_CONTEXT');
    console.error(`ERROR: ${error instanceof Error ? error.message : String(error)}`);
    console.error('REPOSITORY_MUTATION: NO');
    console.error('PHYSICAL_AUTHORIZATION: NONE');
    console.error('=== FIN RESULTADO PARA CHATGPT ===');
    process.exitCode = 1;
  });
}
