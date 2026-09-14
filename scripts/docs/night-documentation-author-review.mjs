import crypto from 'node:crypto';
import fs from 'node:fs';
import path from 'node:path';
import { pathToFileURL } from 'node:url';

import { extractValidationEvidence } from './task-semantic-contract.mjs';

const RESPONSES_URL = 'https://api.openai.com/v1/responses';
const MAX_MODEL_CALLS = 3;
const TREQ_COLUMNS = [
  'id',
  'dominio',
  'regla_protegida',
  'origen',
  'riesgo_prioridad',
  'tipo_modalidad',
  'tarea_responsable',
  'paquete',
  'repositorio_ambiente',
  'estado',
  'artefacto',
  'ultimo_resultado',
  'evidencia',
  'relacion',
];

function fail(message) {
  throw new Error(message);
}

export function sha256(value) {
  return crypto.createHash('sha256').update(value).digest('hex');
}

function readJson(filePath, label) {
  if (!fs.existsSync(filePath)) fail(`no existe ${label}: ${filePath}.`);
  return JSON.parse(fs.readFileSync(filePath, 'utf8'));
}

function writeJson(filePath, value) {
  fs.mkdirSync(path.dirname(filePath), { recursive: true });
  fs.writeFileSync(filePath, `${JSON.stringify(value, null, 2)}\n`, 'utf8');
}

export function selectModels(complexity) {
  if (complexity === 'ROUTINE') {
    return {
      author: { model: 'gpt-5.6-luna', reasoning: 'high' },
      reviewer1: { model: 'gpt-5.6-luna', reasoning: 'high' },
      reviewer2: { model: 'gpt-5.6-terra', reasoning: 'medium' },
    };
  }
  if (complexity === 'COMPLEX') {
    return {
      author: { model: 'gpt-5.6-sol', reasoning: 'high' },
      reviewer1: { model: 'gpt-5.6-terra', reasoning: 'high' },
      reviewer2: { model: 'gpt-5.6-sol', reasoning: 'high' },
    };
  }
  return {
    author: { model: 'gpt-5.6-terra', reasoning: 'high' },
    reviewer1: { model: 'gpt-5.6-luna', reasoning: 'high' },
    reviewer2: { model: 'gpt-5.6-terra', reasoning: 'high' },
  };
}

function escapeRegExp(value) {
  return String(value).replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

function nullableStringSchema() {
  return { type: ['string', 'null'] };
}

function treqRowSchema() {
  const properties = Object.fromEntries(TREQ_COLUMNS.map((key) => [key, { type: 'string' }]));
  return {
    type: 'object',
    additionalProperties: false,
    properties,
    required: [...TREQ_COLUMNS],
  };
}

export function authorSchema() {
  return {
    type: 'object',
    additionalProperties: false,
    properties: {
      status: { type: 'string', enum: ['CANDIDATE', 'STOP'] },
      stop_reason: nullableStringSchema(),
      task_markdown: { type: 'string' },
      affected_treq_ids: { type: 'array', items: { type: 'string' } },
      treq_changes: {
        type: 'array',
        items: {
          type: 'object',
          additionalProperties: false,
          properties: {
            operation: { type: 'string', enum: ['CREATE', 'MODIFY'] },
            id: { type: 'string' },
            row: treqRowSchema(),
          },
          required: ['operation', 'id', 'row'],
        },
      },
      evidence_summary: { type: 'array', items: { type: 'string' } },
    },
    required: [
      'status',
      'stop_reason',
      'task_markdown',
      'affected_treq_ids',
      'treq_changes',
      'evidence_summary',
    ],
  };
}

export function reviewerSchema() {
  return {
    type: 'object',
    additionalProperties: false,
    properties: {
      verdict: { type: 'string', enum: ['PASS', 'FAIL', 'STOP'] },
      candidate_sha256: { type: 'string' },
      summary: { type: 'string' },
      findings: {
        type: 'array',
        items: {
          type: 'object',
          additionalProperties: false,
          properties: {
            severity: { type: 'string', enum: ['BLOCKER', 'WARNING', 'INFO'] },
            code: { type: 'string' },
            message: { type: 'string' },
          },
          required: ['severity', 'code', 'message'],
        },
      },
    },
    required: ['verdict', 'candidate_sha256', 'summary', 'findings'],
  };
}

function extractOutputText(response) {
  for (const item of response?.output ?? []) {
    if (item?.type !== 'message') continue;
    for (const content of item?.content ?? []) {
      if (content?.type === 'output_text' && typeof content.text === 'string') return content.text;
      if (content?.type === 'refusal') fail(`modelo rechazó la solicitud: ${content.refusal || 'REFUSAL'}.`);
    }
  }
  fail(`Responses API no devolvió output_text; status=${response?.status ?? 'UNKNOWN'}.`);
}

function usageRecord(response, role, model) {
  return {
    role,
    model,
    response_id: response?.id ?? null,
    status: response?.status ?? null,
    input_tokens: response?.usage?.input_tokens ?? null,
    output_tokens: response?.usage?.output_tokens ?? null,
    reasoning_tokens: response?.usage?.output_tokens_details?.reasoning_tokens ?? null,
    total_tokens: response?.usage?.total_tokens ?? null,
  };
}

async function callStructured({ apiKey, model, reasoning, instructions, input, schemaName, schema, maxOutputTokens }) {
  if (!apiKey) fail('OPENAI_API_KEY es obligatorio para FASE 2 author/review.');
  const response = await fetch(RESPONSES_URL, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${apiKey}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      model,
      instructions,
      input,
      reasoning: { effort: reasoning },
      max_output_tokens: maxOutputTokens,
      store: false,
      text: {
        format: {
          type: 'json_schema',
          name: schemaName,
          strict: true,
          schema,
        },
      },
    }),
    signal: AbortSignal.timeout(180000),
  });
  const raw = await response.text();
  let payload = null;
  try {
    payload = JSON.parse(raw);
  } catch {
    fail(`Responses API devolvió cuerpo no JSON con HTTP ${response.status}.`);
  }
  if (!response.ok) {
    fail(`Responses API HTTP ${response.status}: ${payload?.error?.message ?? raw.slice(0, 500)}.`);
  }
  if (payload?.status !== 'completed') {
    fail(`Responses API terminó con status ${payload?.status ?? 'UNKNOWN'}.`);
  }
  const text = extractOutputText(payload);
  try {
    return { parsed: JSON.parse(text), response: payload };
  } catch {
    fail(`Structured Output no pudo parsearse como JSON: ${text.slice(0, 500)}.`);
  }
}

function sectionBody(markdown, headingPattern) {
  const normalized = String(markdown ?? '').replace(/\r\n?/gu, '\n');
  const match = headingPattern.exec(normalized);
  if (!match) return '';
  const start = match.index + match[0].length;
  const rest = normalized.slice(start);
  const end = rest.search(/^####\s+/mu);
  return (end >= 0 ? rest.slice(0, end) : rest).trim();
}

function normalizeContinuityLabels(markdown) {
  const lines = String(markdown ?? '').replace(/\r\n?/gu, '\n').split('\n');
  let inContinuity = false;

  return lines.map((line) => {
    if (/^####\s+(?:\d+\.\s*)?Continuidad\b/iu.test(line)) {
      inContinuity = true;
      return line;
    }
    if (inContinuity && /^####\s+/u.test(line)) {
      inContinuity = false;
    }
    if (!inContinuity) return line;

    return line
      .replace(/Última(?:\s+tarea)?\s+aprobada/iu, 'ÚLTIMA TAREA APROBADA')
      .replace(/(?:Tarea\s+)?actual\s+aprobada/iu, 'TAREA ACTUAL APROBADA')
      .replace(/Siguiente(?:\s+tarea)?\s+reservada/iu, 'SIGUIENTE TAREA RESERVADA');
  }).join('\n');
}

function normalizeZeroTreqDerivedReferences(markdown, existingIds) {
  const normalized = String(markdown ?? '').replace(/\r\n?/gu, '\n');
  const headingPattern = /^####\s+(?:\d+\.\s*)?Requisitos de prueba derivados.*$/imu;
  const heading = headingPattern.exec(normalized);
  if (!heading) return normalized;

  const bodyStart = heading.index + heading[0].length;
  const rest = normalized.slice(bodyStart);
  const nextHeadingOffset = rest.search(/^####\s+/mu);
  const sectionEnd = nextHeadingOffset >= 0
    ? bodyStart + nextHeadingOffset
    : normalized.length;

  const body = normalized.slice(bodyStart, sectionEnd).trim();
  const paragraphs = body
    .split(/\n{2,}/u)
    .map((entry) => entry.trim())
    .filter(Boolean);

  const referenceParagraphs = paragraphs.filter(
    (entry) => /\bTREQ-[A-Z]+-\d{3,}\b/u.test(entry),
  );
  if (referenceParagraphs.length === 0) return normalized;

  const referencedIds = [...new Set(
    referenceParagraphs.flatMap(
      (entry) => entry.match(/\bTREQ-[A-Z]+-\d{3,}\b/gu) ?? [],
    ),
  )].sort();

  const unknown = referencedIds.filter((id) => !existingIds.has(id));
  if (unknown.length > 0) {
    fail(
      'referencia TREQ histórica no autorizada en Requisitos de prueba derivados: '
      + unknown.join(', '),
    );
  }

  const keptParagraphs = paragraphs.filter(
    (entry) => !/\bTREQ-[A-Z]+-\d{3,}\b/u.test(entry),
  );

  if (
    !keptParagraphs.some(
      (entry) => /NO GENERA REQUISITOS DE PRUEBA/iu.test(entry),
    )
  ) {
    keptParagraphs.unshift('NO GENERA REQUISITOS DE PRUEBA');
  }

  let prefix = normalized.slice(0, heading.index).replace(/\s+$/u, '');
  const separator = /\n---$/u.test(prefix);
  if (separator) {
    prefix = prefix.replace(/\n---$/u, '').replace(/\s+$/u, '');
  }

  const historicalBlock = [
    '**Referencias históricas no modificadas:**',
    '',
    ...referenceParagraphs,
  ].join('\n');

  const beforeDerived = [
    prefix,
    historicalBlock,
    separator ? '---' : null,
  ].filter(Boolean).join('\n\n');

  const suffix = normalized.slice(sectionEnd).replace(/^\s*/u, '');
  const rebuilt = [
    beforeDerived,
    heading[0],
    '',
    keptParagraphs.join('\n\n'),
    suffix,
  ].filter((entry) => entry !== '').join('\n');

  return `${rebuilt.replace(/\s+$/u, '')}\n`;
}

function tableCells(line) {
  return String(line ?? '')
    .split('|')
    .slice(1, -1)
    .map((cell) => cell.trim().replace(/^`|`$/gu, ''));
}

function escapeTableCell(value) {
  return String(value ?? '')
    .replace(/\r?\n/gu, ' ')
    .replaceAll('|', '\\|')
    .replace(/\s+/gu, ' ')
    .trim();
}

function normalizeCandidateWhitespace(markdown) {
  return String(markdown ?? '')
    .replace(/\r\n?/gu, '\n')
    .split('\n')
    .map((line) => line.replace(/[ \t]+$/gu, ''))
    .join('\n');
}

export function normalizeValidationEvidenceTable(markdown) {
  const normalized = String(markdown ?? '').replace(/\r\n?/gu, '\n');
  const headingPattern = /^####\s+(?:\d+\.\s*)?Evidencia de validación.*$/imu;
  const heading = headingPattern.exec(normalized);
  if (!heading) return normalized;

  const bodyStart = heading.index + heading[0].length;
  const rest = normalized.slice(bodyStart);
  const nextHeadingOffset = rest.search(/^####\s+/mu);
  const sectionEnd = nextHeadingOffset >= 0
    ? bodyStart + nextHeadingOffset
    : normalized.length;

  const section = normalized.slice(bodyStart, sectionEnd);
  const lines = section.split('\n');
  const headerIndex = lines.findIndex((line) => /^\s*\|/u.test(line) && tableCells(line)[0] === 'Clase');
  if (headerIndex < 0) return normalized;

  const headers = tableCells(lines[headerIndex]);
  const classIndex = headers.indexOf('Clase');
  const statusIndex = headers.indexOf('Estado');
  const evidenceIndex = headers.indexOf('Evidencia');

  if (classIndex < 0 || statusIndex < 0 || evidenceIndex < 0) {
    return normalized;
  }

  let lastTableIndex = headerIndex + 1;
  while (lastTableIndex + 1 < lines.length && /^\s*\|/u.test(lines[lastTableIndex + 1])) {
    lastTableIndex += 1;
  }

  const canonicalRows = [
    '| Clase | Estado | Evidencia |',
    '| --- | --- | --- |',
  ];

  for (let index = headerIndex + 2; index <= lastTableIndex; index += 1) {
    const cells = tableCells(lines[index]);
    if (cells.length < headers.length || /^-+$/u.test(cells[classIndex] ?? '')) continue;

    const evidenceParts = [];
    headers.forEach((label, cellIndex) => {
      if ([classIndex, statusIndex, evidenceIndex].includes(cellIndex)) return;
      const value = cells[cellIndex]?.trim();
      if (value) evidenceParts.push(`${label}: ${value}`);
    });

    const directEvidence = cells[evidenceIndex]?.trim();
    if (directEvidence) evidenceParts.push(directEvidence);

    canonicalRows.push(
      `| ${escapeTableCell(cells[classIndex])} | ${escapeTableCell(cells[statusIndex])} | ${escapeTableCell(evidenceParts.join(' — '))} |`,
    );
  }

  const rebuiltSection = [
    ...lines.slice(0, headerIndex),
    ...canonicalRows,
    ...lines.slice(lastTableIndex + 1),
  ].join('\n');

  return normalized.slice(0, bodyStart) + rebuiltSection + normalized.slice(sectionEnd);
}

export function validateCanonicalEvidenceTable(markdown, capsule) {
  const source = sectionBody(
    markdown,
    /^####\s+(?:\d+\.\s*)?Evidencia de validación.*$/imu,
  );

  if (!source) fail('candidato carece de Evidencia de validación.');

  if (!/^\|\s*Clase\s*\|\s*Estado\s*\|\s*Evidencia\s*\|\s*$/mu.test(source)) {
    fail('EVIDENCE_TABLE_CONTRACT_INVALID: la tabla debe usar exactamente Clase | Estado | Evidencia.');
  }

  const policy = capsule?.drafting_contract?.task_development_policy ?? {};
  const requiredClasses = policy.required_evidence_classes ?? [
    'BUILD',
    'LOCAL',
    'REMOTA',
    'OPERATIVA',
    'FÍSICA',
  ];
  const allowedStatuses = new Set(
    policy.allowed_evidence_statuses ?? [
      'PASS',
      'FAIL',
      'NOT_EXECUTED',
      'NOT_APPLICABLE',
    ],
  );

  const rows = extractValidationEvidence(markdown);
  if (rows.length !== requiredClasses.length) {
    fail(
      `EVIDENCE_TABLE_CONTRACT_INVALID: se esperaban ${requiredClasses.length} filas y se resolvieron ${rows.length}.`,
    );
  }

  const byClass = new Map();
  for (const row of rows) {
    if (!requiredClasses.includes(row.class)) {
      fail(`EVIDENCE_TABLE_CONTRACT_INVALID: clase no permitida ${row.class}.`);
    }
    if (byClass.has(row.class)) {
      fail(`EVIDENCE_TABLE_CONTRACT_INVALID: clase duplicada ${row.class}.`);
    }
    if (!allowedStatuses.has(row.status)) {
      fail(`EVIDENCE_TABLE_CONTRACT_INVALID: ${row.class} usa estado ${row.status}.`);
    }
    if (!['NOT_EXECUTED', 'NOT_APPLICABLE'].includes(row.status)) {
      fail(
        `EVIDENCE_TABLE_CONTRACT_INVALID: FASE 2 read-only no puede declarar ${row.status} en ${row.class}.`,
      );
    }
    if (!String(row.evidence ?? '').trim()) {
      fail(`EVIDENCE_TABLE_CONTRACT_INVALID: ${row.class} carece de evidencia explicativa.`);
    }
    byClass.set(row.class, row);
  }

  for (const evidenceClass of requiredClasses) {
    if (!byClass.has(evidenceClass)) {
      fail(`EVIDENCE_TABLE_CONTRACT_INVALID: falta ${evidenceClass}.`);
    }
  }

  return rows;
}

export function candidateStructuralMetrics(markdown) {
  const normalized = String(markdown ?? '').replace(/\r\n?/gu, '\n').trim();
  const lines = normalized ? normalized.split('\n') : [];
  const headings = [...normalized.matchAll(/^####\s+(.+)$/gmu)]
    .map((match) => match[1].trim());
  const fenceCount = lines.filter((line) => line.trimStart().startsWith('```')).length;
  return {
    section_count: headings.length,
    character_count: normalized.length,
    line_count: lines.length,
    table_row_count: lines.filter((line) => /^\s*\|.*\|\s*$/u.test(line)).length,
    code_block_count: Math.floor(fenceCount / 2),
    section_titles: headings,
  };
}

export function validateStructuralParity(markdown, capsule) {
  const metrics = candidateStructuralMetrics(markdown);
  const baseline = capsule?.structural_baseline;

  if (!baseline?.enforced || !baseline?.quality_floor) {
    return metrics;
  }

  const floor = baseline.quality_floor;
  const failures = [];

  if (metrics.section_count < Number(floor.min_section_count ?? 0)) {
    failures.push(
      'sections ' + metrics.section_count + ' < ' + floor.min_section_count,
    );
  }

  if (metrics.character_count < Number(floor.min_character_count ?? 0)) {
    failures.push(
      'characters ' + metrics.character_count + ' < ' + floor.min_character_count,
    );
  }

  if (failures.length > 0) {
    const refs = (baseline.references ?? [])
      .map(
        ({ id, section_count, character_count }) =>
          id + ':' + section_count + 's/' + character_count + 'c',
      )
      .join(', ');

    fail(
      'STRUCTURAL_PARITY_FAIL: '
      + failures.join('; ')
      + '. Baseline same-owner: '
      + (refs || 'SIN_REFERENCIAS')
      + '. Los grupos mínimos de secciones no sustituyen la profundidad canónica.',
    );
  }

  return metrics;
}

export function validateCandidate(author, capsule) {
  if (author?.status === 'STOP') {
    if (!String(author.stop_reason ?? '').trim()) fail('autor devolvió STOP sin stop_reason.');
    return { stopped: true, reason: author.stop_reason };
  }
  if (author?.status !== 'CANDIDATE') fail(`estado de autor inválido: ${author?.status ?? 'VACÍO'}.`);

  const changes = Array.isArray(author.treq_changes) ? author.treq_changes : [];
  const affected = Array.isArray(author.affected_treq_ids) ? author.affected_treq_ids : [];
  const existingIds = new Set(
    (capsule.registry.relevant_rows ?? [])
      .map((row) => row.match(/`(TREQ-[A-Z]+-\d{3,})`/u)?.[1])
      .filter(Boolean),
  );

  const continuityNormalized = normalizeContinuityLabels(author.task_markdown);
  const treqNormalized = (
    changes.length === 0
      ? normalizeZeroTreqDerivedReferences(continuityNormalized, existingIds)
      : continuityNormalized
  );
  const markdown = normalizeCandidateWhitespace(
    normalizeValidationEvidenceTable(treqNormalized),
  ).trim();
  if (/[ \t]+$/mu.test(markdown)) fail('CANDIDATE_TRAILING_WHITESPACE: normalización incompleta.');
  const taskId = capsule.current.id;
  const exactHeading = `### ✅ ${taskId} — ${capsule.current.title}`;
  if (!markdown.startsWith(exactHeading)) fail(`candidato no inicia con el título canónico exacto: ${exactHeading}.`);

  const requiredMetadata = [
    ['Estado', 'APROBADA'],
    ['Tarea anterior', capsule.current.previous_id],
    ['Tarea siguiente', capsule.current.next_id],
    ['Tipo de tarea', null],
    ['Bloque', capsule.current.block_code],
    ['Repositorio propietario', null],
    ['Archivo propietario', capsule.current.owner],
    ['Estado físico resultante', null],
    ['Cambios físicos autorizados', null],
    ['Requisitos de prueba creados o modificados', null],
  ];
  for (const [label, expected] of requiredMetadata) {
    const pattern = new RegExp(`^\\*\\*${escapeRegExp(label)}:\\*\\*\\s*(.+)$`, 'mu');
    const value = markdown.match(pattern)?.[1]?.trim() ?? '';
    if (!value) fail(`candidato carece de metadata obligatoria: ${label}.`);
    if (expected && !value.includes(expected)) fail(`${label} no contiene ${expected}.`);
  }
  if (!/^\*\*Cambios fisicos autorizados:\*\*.*\bningun/imu.test(markdown.normalize('NFD').replace(/\p{M}/gu, ''))) {
    fail('Cambios físicos autorizados debe declarar ninguno.');
  }

  const requiredSections = [
    /^(?:####\s+(?:\d+\.\s*)?(?:Propósito|Objetivo).*)$/imu,
    /^(?:####\s+(?:\d+\.\s*)?Requisitos de prueba derivados.*)$/imu,
    /^(?:####\s+(?:\d+\.\s*)?Evidencia de validación.*)$/imu,
    /^(?:####\s+(?:\d+\.\s*)?Criterios de aceptación.*)$/imu,
    /^(?:####\s+(?:\d+\.\s*)?Límites.*)$/imu,
    /^(?:####\s+(?:\d+\.\s*)?Continuidad.*)$/imu,
  ];
  for (const pattern of requiredSections) if (!pattern.test(markdown)) fail(`candidato carece de sección obligatoria: ${pattern}.`);

  validateCanonicalEvidenceTable(markdown, capsule);
  for (const label of ['ÚLTIMA TAREA APROBADA', 'TAREA ACTUAL APROBADA', 'SIGUIENTE TAREA RESERVADA']) {
    if (!markdown.includes(label)) fail(`Continuidad carece de ${label}.`);
  }
  if (!markdown.includes(capsule.current.previous_id) || !markdown.includes(taskId) || !markdown.includes(capsule.current.next_id)) {
    fail('Continuidad no contiene anterior, actual y siguiente exactos.');
  }

  const changeIds = changes.map(({ id }) => id);
  if (JSON.stringify([...new Set(affected)].sort()) !== JSON.stringify([...new Set(changeIds)].sort())) {
    fail('affected_treq_ids no coincide con los IDs de treq_changes.');
  }
  let nextCreate = Number(capsule.registry.max_numeric_id) + 1;
  for (const change of changes) {
    if (change.id !== change.row?.id) fail(`TREQ ${change.id} no coincide con row.id.`);
    for (const column of TREQ_COLUMNS) {
      if (typeof change.row?.[column] !== 'string' || change.row[column].trim() === '') {
        fail(`TREQ ${change.id} carece de columna ${column}.`);
      }
    }
    if (change.operation === 'CREATE') {
      const expectedId = `TREQ-${capsule.registry.domain}-${String(nextCreate).padStart(3, '0')}`;
      if (change.id !== expectedId) fail(`CREATE TREQ debe usar secuencia exacta ${expectedId}, no ${change.id}.`);
      nextCreate += 1;
    } else if (change.operation === 'MODIFY') {
      if (!existingIds.has(change.id)) fail(`MODIFY ${change.id} no está presente en el contexto autorizado.`);
    }
  }

  if (changes.length === 0) {
    const derived = sectionBody(markdown, /^####\s+(?:\d+\.\s*)?Requisitos de prueba derivados.*$/imu);
    if (!/NO GENERA REQUISITOS DE PRUEBA/iu.test(derived)) {
      fail('tarea con cero cambios TREQ debe declarar literalmente NO GENERA REQUISITOS DE PRUEBA.');
    }
    const referencedIds = [...new Set(derived.match(/\bTREQ-[A-Z]+-\d{3,}\b/gu) ?? [])];
    if (referencedIds.length > 0) {
      fail(
        'tarea con cero cambios TREQ no puede incluir IDs TREQ dentro de Requisitos de prueba derivados; '
        + `mueva cobertura histórica fuera de esa sección: ${referencedIds.join(', ')}.`,
      );
    }
  }

  const structuralMetrics = validateStructuralParity(markdown, capsule);
  const candidateSha = sha256(`${markdown}\n`);
  return {
    stopped: false,
    markdown: `${markdown}\n`,
    candidateSha,
    affectedTreqIds: affected,
    treqChanges: changes,
    structuralMetrics,
  };
}

function authorInstructions() {
  return [
    'Eres el autor documental canónico de VENTO OS para UNA sola tarea.',
    'Trabaja exclusivamente con la cápsula suministrada; no uses conocimiento externo ni inventes hechos.',
    'Desarrolla la tarea de forma sustantiva, completa, verificable y coherente con contratos aprobados relacionados.',
    'Los required_section_groups son apenas el mínimo sintáctico. Nunca reduzcas una tarea sustantiva a ese scaffold.',
    'Usa structural_baseline como referencia obligatoria de profundidad: compara outlines, métricas y excerpts de los predecesores aprobados del mismo owner antes de redactar.',
    'Para tareas SUBSTANTIVE o COMPLEX cubre con detalle todas las dimensiones aplicables soportadas por la cápsula: resultado material o contrato, invariantes, matrices o escenarios, estados y transiciones, fallos y edge cases, idempotencia, concurrencia, offline, autorización, auditoría, AS-IS, brechas, riesgos, handoffs, criterios, límites y continuidad. Si no existe soporte canónico suficiente para alcanzar la profundidad exigida sin inventar, devuelve STOP.',
    'El artefacto debe quedar preformateado como APROBADA, pero esta salida sigue siendo un candidato y no modifica el repositorio.',
    'No autorices ni describas como ejecutados cambios físicos, migraciones, Supabase, código o despliegues.',
    'Si una decisión necesaria no está soportada por la cápsula, devuelve status STOP con la contradicción o carencia exacta.',
    'Si la tarea necesita crear/modificar TREQ, entrega cada fila semántica completa con las catorce columnas. Nunca alteres requisitos históricos por estilo.',
    'Si treq_changes queda vacío, la sección Requisitos de prueba derivados debe declarar literalmente NO GENERA REQUISITOS DE PRUEBA y no debe contener ningún ID TREQ. Si necesitas citar cobertura histórica existente, hazlo fuera de esa sección y aclara que no se modifica.',
    'No incluyas instrucciones de descarga, reemplazo, terminal, rutas locales ni mensajes dirigidos al usuario dentro de task_markdown.',
    'En la sección Continuidad usa literalmente los rótulos ÚLTIMA TAREA APROBADA, TAREA ACTUAL APROBADA y SIGUIENTE TAREA RESERVADA; no los abrevies ni parafrasees.',
    'En Evidencia de validación usa exactamente una tabla Markdown de tres columnas: Clase | Estado | Evidencia; no insertes columnas entre Clase y Estado.',
    'En Evidencia de validación usa únicamente estados NOT_EXECUTED/NOT_APPLICABLE salvo evidencia real explícita en la cápsula.',
    'No uses espacios ni tabs al final de ninguna línea; el candidato debe ser compatible con git diff --check antes de calcular su SHA.',
  ].join('\n');
}

function reviewerInstructions(kind) {
  const common = [
    'Eres un revisor independiente y read-only de un candidato documental de VENTO OS.',
    'No reescribas el candidato. No propongas texto alternativo salvo señalar un hallazgo concreto.',
    'Evalúa únicamente contra la cápsula canónica y el candidato recibidos.',
    'PASS exige ausencia de BLOCKER. Si falta evidencia para decidir, usa STOP; no inventes.',
    'Debes devolver exactamente el candidate_sha256 suministrado.',
    'Compara obligatoriamente el candidato contra capsule.structural_baseline. PASS está prohibido si el candidato es materialmente más superficial que los predecesores aprobados comparables del mismo owner sin una justificación canónica explícita.',
    'Los required_section_groups son un mínimo de integridad, no una señal de completitud documental.',
    'La tabla Evidencia de validación debe cumplir exactamente Clase | Estado | Evidencia; cualquier columna insertada antes de Estado es BLOCKER.',
  ];
  if (kind === 1) {
    common.push('Prioridad: fidelidad canónica, cobertura del propósito, formato, ownership, continuidad, TREQ y criterios verificables.');
  } else {
    common.push('Prioridad adversarial: omisiones, scope creep, contradicciones, doble significado, identidad, estados, idempotencia, trazabilidad, fronteras físicas y responsabilidades sin propietario.');
  }
  return common.join('\n');
}

function reviewerInput(capsule, candidate, author, candidateSha) {
  return JSON.stringify({
    capsule,
    candidate_sha256: candidateSha,
    task_markdown: candidate,
    treq_changes: author.treq_changes,
  });
}

function assertReview(review, candidateSha, label) {
  if (review?.candidate_sha256 !== candidateSha) {
    fail(`${label} revisó SHA ${review?.candidate_sha256 || 'VACÍO'} y se esperaba ${candidateSha}.`);
  }
  if (review?.verdict !== 'PASS') {
    const blockers = (review?.findings ?? []).filter(({ severity }) => severity === 'BLOCKER');
    fail(`${label} terminó ${review?.verdict ?? 'UNKNOWN'}: ${blockers.map(({ code, message }) => `${code}:${message}`).join(' | ') || review?.summary || 'SIN_DETALLE'}.`);
  }
}

export async function runAuthorReview({ capsule, apiKey, outputDir, call = callStructured } = {}) {
  if (!capsule?.current?.id) fail('cápsula inválida: falta current.id.');
  if (!outputDir) fail('NIGHT_PHASE2_OUTPUT_DIR es obligatorio.');
  fs.mkdirSync(outputDir, { recursive: true });
  writeJson(path.join(outputDir, 'context-capsule.json'), capsule);

  const models = selectModels(capsule.complexity);
  const usage = [];
  let modelCalls = 0;

  modelCalls += 1;
  const authorCall = await call({
    apiKey,
    model: models.author.model,
    reasoning: models.author.reasoning,
    instructions: authorInstructions(),
    input: JSON.stringify(capsule),
    schemaName: 'vento_documentation_candidate_v1',
    schema: authorSchema(),
    maxOutputTokens: 32000,
  });
  usage.push(usageRecord(authorCall.response, 'AUTHOR', models.author.model));
  writeJson(path.join(outputDir, 'author-response.json'), authorCall.parsed);

  const validated = validateCandidate(authorCall.parsed, capsule);
  if (validated.stopped) {
    writeJson(path.join(outputDir, 'phase2-summary.json'), {
      status: 'STOP',
      task_id: capsule.current.id,
      reason: validated.reason,
      model_calls: modelCalls,
      max_model_calls: MAX_MODEL_CALLS,
      models,
      usage,
      repository_mutation: false,
      physical_authorization: 'NONE',
    });
    fail(`AUTHOR_STOP: ${validated.reason}`);
  }

  const candidatePath = path.join(outputDir, `${capsule.current.id}_APROBADA_PARA_REEMPLAZAR.md`);
  fs.writeFileSync(candidatePath, validated.markdown, 'utf8');
  writeJson(path.join(outputDir, 'treq-changes.json'), {
    task_id: capsule.current.id,
    affected_treq_ids: validated.affectedTreqIds,
    changes: validated.treqChanges,
  });

  const reviewPayload = reviewerInput(capsule, validated.markdown, authorCall.parsed, validated.candidateSha);
  modelCalls += 2;
  if (modelCalls > MAX_MODEL_CALLS) fail(`presupuesto de modelo excedido: ${modelCalls}/${MAX_MODEL_CALLS}.`);
  const [review1Call, review2Call] = await Promise.all([
    call({
      apiKey,
      model: models.reviewer1.model,
      reasoning: models.reviewer1.reasoning,
      instructions: reviewerInstructions(1),
      input: reviewPayload,
      schemaName: 'vento_documentation_reviewer1_v1',
      schema: reviewerSchema(),
      maxOutputTokens: 10000,
    }),
    call({
      apiKey,
      model: models.reviewer2.model,
      reasoning: models.reviewer2.reasoning,
      instructions: reviewerInstructions(2),
      input: reviewPayload,
      schemaName: 'vento_documentation_reviewer2_v1',
      schema: reviewerSchema(),
      maxOutputTokens: 10000,
    }),
  ]);
  usage.push(usageRecord(review1Call.response, 'REVIEWER_1', models.reviewer1.model));
  usage.push(usageRecord(review2Call.response, 'REVIEWER_2', models.reviewer2.model));
  writeJson(path.join(outputDir, 'reviewer-1.json'), review1Call.parsed);
  writeJson(path.join(outputDir, 'reviewer-2.json'), review2Call.parsed);

  assertReview(review1Call.parsed, validated.candidateSha, 'REVIEWER_1');
  assertReview(review2Call.parsed, validated.candidateSha, 'REVIEWER_2');

  const totals = usage.reduce((acc, record) => ({
    input_tokens: acc.input_tokens + (record.input_tokens ?? 0),
    output_tokens: acc.output_tokens + (record.output_tokens ?? 0),
    reasoning_tokens: acc.reasoning_tokens + (record.reasoning_tokens ?? 0),
    total_tokens: acc.total_tokens + (record.total_tokens ?? 0),
  }), { input_tokens: 0, output_tokens: 0, reasoning_tokens: 0, total_tokens: 0 });

  const summary = {
    status: 'PASS',
    task_id: capsule.current.id,
    complexity: capsule.complexity,
    context_sha256: capsule.capsule_sha256,
    candidate_sha256: validated.candidateSha,
    reviewer_1: 'PASS',
    reviewer_2: 'PASS',
    same_candidate_sha: true,
    model_calls: modelCalls,
    max_model_calls: MAX_MODEL_CALLS,
    models,
    usage,
    totals,
    affected_treq_ids: validated.affectedTreqIds,
    structural_metrics: validated.structuralMetrics,
    structural_baseline_policy: capsule.structural_baseline?.policy ?? null,
    structural_parity_enforced: capsule.structural_baseline?.enforced === true,
    repository_mutation: false,
    task_execution_enabled: false,
    physical_authorization: 'NONE',
  };
  writeJson(path.join(outputDir, 'phase2-summary.json'), summary);
  return summary;
}

function inferFailureStage(outputDir, taskId) {
  const author = path.join(outputDir, 'author-response.json');
  const candidate = path.join(outputDir, `${taskId}_APROBADA_PARA_REEMPLAZAR.md`);
  const reviewer1 = path.join(outputDir, 'reviewer-1.json');
  const reviewer2 = path.join(outputDir, 'reviewer-2.json');

  if (!fs.existsSync(author)) return 'AUTHOR_CALL';
  if (!fs.existsSync(candidate)) return 'AUTHOR_LOCAL_VALIDATION';
  if (!fs.existsSync(reviewer1) || !fs.existsSync(reviewer2)) return 'REVIEW_CALL';
  return 'REVIEW_VALIDATION';
}

function materializeUnhandledFailureSummary(error) {
  const contextPath = String(process.env.NIGHT_CONTEXT_PATH ?? '').trim();
  const outputDir = String(process.env.NIGHT_PHASE2_OUTPUT_DIR ?? '').trim();
  if (!contextPath || !outputDir || !fs.existsSync(contextPath)) return;

  const summaryPath = path.join(outputDir, 'phase2-summary.json');
  if (fs.existsSync(summaryPath)) return;

  const capsule = readJson(contextPath, 'context-capsule.json');
  const models = selectModels(capsule.complexity);
  const stage = inferFailureStage(outputDir, capsule.current.id);
  const modelCalls = stage === 'AUTHOR_CALL' || stage === 'AUTHOR_LOCAL_VALIDATION' ? 1 : 3;

  writeJson(summaryPath, {
    status: 'FAIL',
    stage,
    task_id: capsule.current.id,
    complexity: capsule.complexity,
    context_sha256: capsule.capsule_sha256,
    reason: error instanceof Error ? error.message : String(error),
    model_calls: modelCalls,
    max_model_calls: MAX_MODEL_CALLS,
    models,
    repository_mutation: false,
    task_execution_enabled: false,
    physical_authorization: 'NONE',
  });
}

async function main() {
  const contextPath = String(process.env.NIGHT_CONTEXT_PATH ?? '').trim();
  const outputDir = String(process.env.NIGHT_PHASE2_OUTPUT_DIR ?? '').trim();
  const apiKey = String(process.env.OPENAI_API_KEY ?? '').trim();
  const capsule = readJson(contextPath, 'context-capsule.json');
  const summary = await runAuthorReview({ capsule, apiKey, outputDir });

  console.log('=== RESULTADO PARA CHATGPT ===');
  console.log('ESTADO: PASS');
  console.log('OPERACION: NIGHT_DOCUMENTATION_AUTHOR_REVIEW');
  console.log(`TASK_ID: ${summary.task_id}`);
  console.log(`COMPLEXITY: ${summary.complexity}`);
  console.log(`CONTEXT_SHA256: ${summary.context_sha256}`);
  console.log(`CANDIDATE_SHA256: ${summary.candidate_sha256}`);
  console.log(`AUTHOR_MODEL: ${summary.models.author.model}`);
  console.log(`REVIEWER_1_MODEL: ${summary.models.reviewer1.model}`);
  console.log(`REVIEWER_2_MODEL: ${summary.models.reviewer2.model}`);
  console.log(`MODEL_CALLS: ${summary.model_calls}`);
  console.log(`INPUT_TOKENS: ${summary.totals.input_tokens}`);
  console.log(`OUTPUT_TOKENS: ${summary.totals.output_tokens}`);
  console.log(`TOTAL_TOKENS: ${summary.totals.total_tokens}`);
  console.log('REVIEWER_1: PASS');
  console.log('REVIEWER_2: PASS');
  console.log('SAME_CANDIDATE_SHA: SI');
  console.log('REPOSITORY_MUTATION: NO');
  console.log('TASK_EXECUTION_ENABLED: NO');
  console.log('PHYSICAL_AUTHORIZATION: NONE');
  console.log('FASE_2_AUTHOR_REVIEW: PASS');
  console.log('=== FIN RESULTADO PARA CHATGPT ===');
}

const invokedDirectly = process.argv[1]
  && import.meta.url === pathToFileURL(path.resolve(process.argv[1])).href;

if (invokedDirectly) {
  main().catch((error) => {
    try {
      materializeUnhandledFailureSummary(error);
    } catch (summaryError) {
      console.error(`FAILURE_SUMMARY_ERROR: ${summaryError instanceof Error ? summaryError.message : String(summaryError)}`);
    }
    console.error('=== RESULTADO PARA CHATGPT ===');
    console.error('ESTADO: FAIL');
    console.error('OPERACION: NIGHT_DOCUMENTATION_AUTHOR_REVIEW');
    console.error(`ERROR: ${error instanceof Error ? error.message : String(error)}`);
    console.error('REPOSITORY_MUTATION: NO');
    console.error('TASK_EXECUTION_ENABLED: NO');
    console.error('PHYSICAL_AUTHORIZATION: NONE');
    console.error('=== FIN RESULTADO PARA CHATGPT ===');
    process.exitCode = 1;
  });
}
