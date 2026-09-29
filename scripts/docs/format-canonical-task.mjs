import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

import { readPendingTaskTitleAuthority } from './pending-task-title-authority.mjs';

const TASK_HEADING = /^###\s+(?<marker>\[[ x~]\]|[✅🟡❌])\s+(?<id>[A-Z][A-Z0-9]*(?:-[A-Z0-9]+)+-\d{3})\b(?:\s+[—-]\s+(?<title>[^\n]+))?$/u;
const SECTION_HEADING = /^####(?:\s+\d+\.)?\s+\S.*$/u;
const METADATA = /^\*\*(?<label>[^*\n]+):\*\*\s*(?<value>.*)$/u;
const CONTINUITY_LABELS = [
  'ÚLTIMA TAREA APROBADA',
  'TAREA ACTUAL APROBADA',
  'SIGUIENTE TAREA RESERVADA',
];
const IDENTITY_METADATA_LABELS = [
  'Tarea anterior',
  'Dependencia anterior',
  'Tarea siguiente',
  'Continuidad reservada',
];

const METADATA_ORDER = [
  'Estado',
  'Tarea anterior',
  'Dependencia anterior',
  'Tarea siguiente',
  'Continuidad reservada',
  'Tipo de tarea',
  'Tipo',
  'Bloque',
  'Repositorio propietario',
  'Archivo propietario',
  'Estado físico resultante',
  'Cambios físicos autorizados',
  'Requisitos de prueba creados o modificados',
  'Fecha de corte',
];

const SCAFFOLD_SECTIONS = [
  'Propósito',
  'Alcance y límites',
  'Resultado canónico',
  'Decisiones',
  'Requisitos de prueba derivados',
  'Evidencia de validación',
  'Criterios de aceptación',
  'Continuidad',
];

function fail(message) {
  throw new Error(message);
}

function normalizeSource(source) {
  return source.replace(/^\uFEFF/u, '').replace(/\r\n?/gu, '\n');
}

function detectEol(source) {
  return source.includes('\r\n') ? '\r\n' : '\n';
}

function isFence(line) {
  return /^\s*```/u.test(line);
}

function metadataRank(line, fallback) {
  const match = line.match(METADATA);
  if (!match) return Number.MAX_SAFE_INTEGER + fallback;
  const rank = METADATA_ORDER.indexOf(match.groups.label.trim());
  return rank < 0 ? METADATA_ORDER.length + fallback : rank;
}

function metadataEntries(lines) {
  const entries = lines.map((line, index) => {
    const match = line.match(METADATA);
    if (!match) fail(`línea de metadata inválida: ${line}`);
    return {
      label: match.groups.label.trim(),
      value: match.groups.value.trim(),
      line,
      index,
    };
  });
  const labels = entries.map(({ label }) => label.toLocaleLowerCase('es'));
  if (new Set(labels).size !== labels.length) {
    fail('la tarea contiene etiquetas de metadata duplicadas.');
  }
  return entries;
}

function normalizeMetadataLine(line) {
  const match = line.match(METADATA);
  if (!match) return line;
  const label = match.groups.label.trim();
  let value = match.groups.value.trim();
  if (['Tarea anterior', 'Dependencia anterior', 'Tarea siguiente', 'Continuidad reservada'].includes(label)) {
    const inlineCode = value.match(/^`([^`]+)`$/u);
    if (inlineCode) value = inlineCode[1];
  }
  return `**${label}:**${value ? ` ${value}` : ''}`;
}

function escapeRegex(value) {
  return value.replace(/[.*+?^${}()|[\]\\]/gu, '\\$&');
}

function canonicalIdentity(value, canonicalTitles) {
  const normalized = String(value ?? '').trim().replace(/^`|`$/gu, '');
  const match = normalized.match(/^(?<id>[A-Z][A-Z0-9]*(?:-[A-Z0-9]+)+-\d{3})(?:\s+[—-]\s+.*)?$/u);
  if (!match) return normalized;
  const title = canonicalTitles.get(match.groups.id);
  return title ? `${match.groups.id} — ${title}` : normalized;
}

function normalizeCanonicalIdentityTitles(block, canonicalTitles) {
  if (!(canonicalTitles instanceof Map) || canonicalTitles.size === 0) return block;
  const lines = normalizeSource(block).split('\n');
  const heading = lines[0]?.match(TASK_HEADING);
  if (heading) {
    const title = canonicalTitles.get(heading.groups.id);
    if (title) lines[0] = `### ${heading.groups.marker} ${heading.groups.id} — ${title}`;
  }

  for (let index = 1; index < lines.length; index += 1) {
    const metadata = lines[index].match(METADATA);
    if (!metadata) continue;
    const label = metadata.groups.label.trim();
    if (!IDENTITY_METADATA_LABELS.includes(label)) continue;
    lines[index] = `**${label}:** ${canonicalIdentity(metadata.groups.value, canonicalTitles)}`;
  }

  let candidate = lines.join('\n');
  for (const label of CONTINUITY_LABELS) {
    const pattern = new RegExp(`(\\*\\*${escapeRegex(label)}:?\\*\\*\\s*\\n+\\s*\\x60)([^\\n\\x60]+)(\\x60)`, 'u');
    candidate = candidate.replace(pattern, (full, prefix, value, suffix) => (
      `${prefix}${canonicalIdentity(value, canonicalTitles)}${suffix}`
    ));
  }
  return candidate;
}

function continuityLabel(line) {
  for (const label of CONTINUITY_LABELS) {
    const escaped = escapeRegex(label);
    if (new RegExp(`^(?:\\*\\*${escaped}:?\\*\\*|#{1,6}\\s+${escaped})\\s*$`, 'u').test(line.trim())) {
      return label;
    }
  }
  return null;
}

function withoutLegacyContinuityTriplet(section) {
  const lines = normalizeSource(section).split('\n');
  const preserved = [];
  for (let index = 0; index < lines.length;) {
    if (!continuityLabel(lines[index])) {
      preserved.push(lines[index]);
      index += 1;
      continue;
    }

    index += 1;
    while (lines[index]?.trim() === '') index += 1;
    if (/^```(?:text)?\s*$/u.test(lines[index]?.trim() ?? '')) {
      index += 1;
      while (index < lines.length && !/^```\s*$/u.test(lines[index].trim())) index += 1;
      if (index < lines.length) index += 1;
    } else if (index < lines.length) {
      index += 1;
    }
    while (lines[index]?.trim() === '') index += 1;
  }
  return preserved
    .filter((line) => !/No se inicia|permanece reservada y no se desarrolla/iu.test(line))
    .join('\n')
    .trim();
}

function normalizeContinuitySection(block) {
  const match = block.match(/^####(?:\s+\d+\.)?\s+Continuidad\s*$/mu);
  if (!match || match.index === undefined) return block;
  const before = block.slice(0, match.index);
  const sectionBody = block.slice(match.index + match[0].length);
  const identity = taskIdentityFromBlock(block);
  const values = [identity?.previous, identity?.current, identity?.next];
  if (values.some((value) => !value)) return block;
  const preserved = withoutLegacyContinuityTriplet(sectionBody);

  const heading = match[0].trim();
  const rendered = [heading, ''];
  CONTINUITY_LABELS.forEach((label, index) => {
    rendered.push(`**${label}**`, `\`${values[index]}\``);
    if (index < CONTINUITY_LABELS.length - 1) rendered.push('');
  });
  if (!preserved) return `${before}${rendered.join('\n')}`;

  const previousBody = before.replace(/\n*---\s*\n*$/u, '\n\n').replace(/\n+$/u, '');
  return `${previousBody}\n\n${preserved}\n\n---\n\n${rendered.join('\n')}`;
}

function semanticFingerprint(block) {
  const lines = normalizeSource(block).split('\n');
  const heading = lines.shift()?.replace(/\s+/gu, ' ').trim() ?? '';
  while (lines[0] === '') lines.shift();
  const metadataLines = [];
  while (lines.length > 0) {
    if (lines[0]?.match(METADATA)) {
      metadataLines.push(normalizeMetadataLine(lines.shift()));
      continue;
    }
    if (lines[0]?.trim() === '' && lines.slice(1).find((line) => line.trim() !== '')?.match(METADATA)) {
      lines.shift();
      continue;
    }
    break;
  }
  const metadata = metadataEntries(metadataLines)
    .map(({ label, value }) => `${label.replace(/\s+/gu, ' ')}:${value.replace(/\s+/gu, ' ')}`)
    .sort((left, right) => left.localeCompare(right, 'es'));
  const body = lines.join('\n').replace(/\s+/gu, '');
  return JSON.stringify({ heading, metadata, body });
}

function taskIdentityFromBlock(block) {
  const [heading] = parseTaskBlocks(block);
  if (!heading) return null;
  const metadata = new Map();
  for (const line of normalizeSource(block).split('\n').slice(1)) {
    const match = line.match(METADATA);
    if (match) metadata.set(match.groups.label.trim(), match.groups.value.trim().replace(/^`|`$/gu, ''));
    else if (line.trim() === '' || metadata.size === 0) continue;
    else break;
  }
  return {
    current: `${heading.id} — ${heading.title}`,
    previous: metadata.get('Tarea anterior') ?? metadata.get('Dependencia anterior') ?? null,
    next: metadata.get('Tarea siguiente') ?? metadata.get('Continuidad reservada') ?? null,
  };
}

function ensureContinuitySection(block) {
  if (/^####(?:\s+\d+\.)?\s+Continuidad\s*$/mu.test(block)) return block;
  if (!/^####\s+/mu.test(block)) return block;
  const identity = taskIdentityFromBlock(block);
  if (!identity?.previous || !identity.next) return block;
  const numbers = [...block.matchAll(/^####\s+(\d+)\./gmu)].map((match) => Number(match[1]));
  const nextNumber = numbers.length > 0 ? Math.max(...numbers) + 1 : 1;
  const continuity = [
    `#### ${nextNumber}. Continuidad`,
    '',
    '**ÚLTIMA TAREA APROBADA**',
    `\`${identity.previous}\``,
    '',
    '**TAREA ACTUAL APROBADA**',
    `\`${identity.current}\``,
    '',
    '**SIGUIENTE TAREA RESERVADA**',
    `\`${identity.next}\``,
  ].join('\n');
  return `${block.replace(/\n+$/u, '')}\n\n---\n\n${continuity}\n`;
}

function ensureHeaderSeparator(block) {
  const lines = normalizeSource(block).split('\n');
  let index = 1;
  while (lines[index]?.trim() === '') index += 1;
  let metadataFound = false;
  while (index < lines.length) {
    if (lines[index]?.match(METADATA)) {
      metadataFound = true;
      index += 1;
      continue;
    }
    if (lines[index]?.trim() === '') {
      index += 1;
      continue;
    }
    break;
  }
  if (!metadataFound || lines[index]?.trim() === '---' || !/^####\s+/u.test(lines[index] ?? '')) {
    return block;
  }
  lines.splice(index, 0, '---', '');
  return lines.join('\n');
}

function normalizeStructuralSpacing(lines) {
  const output = [];
  let fenced = false;

  for (let index = 0; index < lines.length; index += 1) {
    const raw = lines[index];
    const trimmed = raw.trim();
    if (isFence(raw)) {
      fenced = !fenced;
      output.push(raw);
      continue;
    }
    if (fenced) {
      output.push(raw);
      continue;
    }

    const structural = trimmed === '---' || SECTION_HEADING.test(trimmed);
    if (!structural) {
      output.push(raw.trim().length === 0 ? '' : raw);
      continue;
    }

    while (output.at(-1) === '') output.pop();
    if (output.length > 0) output.push('');
    output.push(trimmed);
    output.push('');
    while (lines[index + 1]?.trim() === '') index += 1;
  }

  while (output[0] === '') output.shift();
  while (output.at(-1) === '') output.pop();
  return output;
}

function addScaffold(block, task) {
  if (task.marker !== '[ ]') {
    fail(`--scaffold solo puede utilizarse con una tarea NO INICIADA; ${task.id} usa ${task.marker}.`);
  }
  if (/^####\s+/mu.test(block)) {
    fail(`--scaffold no puede utilizarse: ${task.id} ya contiene secciones desarrolladas.`);
  }

  const lines = normalizeSource(block).split('\n');
  while (lines.at(-1)?.trim() === '') lines.pop();
  if (!lines.slice(1).some((line) => line.match(METADATA))) {
    lines.push(
      '',
      '**Estado:** NO INICIADA',
      '**Tarea anterior:** [PENDIENTE_DE_DEFINIR]',
      '**Tarea siguiente:** [PENDIENTE_DE_DEFINIR]',
      '**Tipo de tarea:** [PENDIENTE_DE_DEFINIR]',
      '**Bloque:** [PENDIENTE_DE_DEFINIR]',
      '**Repositorio propietario:** `vento-group-sas/vento-shell`',
      '**Archivo propietario:** [PENDIENTE_DE_DEFINIR]',
      '**Estado físico resultante:** `ESPECIFICADO_NO_MATERIALIZADO`',
      '**Cambios físicos autorizados:** ninguno',
      '**Requisitos de prueba creados o modificados:** [PENDIENTE_DE_CLASIFICAR]',
    );
  }
  lines.push('', '---');
  for (const [index, title] of SCAFFOLD_SECTIONS.entries()) {
    lines.push('', `#### ${index + 1}. ${title}`, '');
    if (title === 'Requisitos de prueba derivados') {
      lines.push('**Resultado:** [PENDIENTE_DE_CLASIFICAR]');
    } else if (title === 'Evidencia de validación') {
      lines.push(
        '| Clase | Estado | Evidencia |',
        '| --- | --- | --- |',
        '| BUILD | NOT_EXECUTED | [PENDIENTE_DE_EVIDENCIA] |',
        '| LOCAL | NOT_EXECUTED | [PENDIENTE_DE_EVIDENCIA] |',
        '| REMOTA | NOT_EXECUTED | [PENDIENTE_DE_EVIDENCIA] |',
        '| OPERATIVA | NOT_EXECUTED | [PENDIENTE_DE_EVIDENCIA] |',
        '| FÍSICA | NOT_EXECUTED | [PENDIENTE_DE_EVIDENCIA] |',
      );
    } else if (title === 'Continuidad') {
      lines.push(
        '**ÚLTIMA TAREA APROBADA**',
        '`[PENDIENTE_DE_DEFINIR]`',
        '',
        '**TAREA ACTUAL APROBADA**',
        '`[PENDIENTE_DE_DEFINIR]`',
        '',
        '**SIGUIENTE TAREA RESERVADA**',
        '`[PENDIENTE_DE_DEFINIR]`',
      );
    } else {
      lines.push('[PENDIENTE_DE_DESARROLLO]');
    }
    if (index < SCAFFOLD_SECTIONS.length - 1) lines.push('', '---');
  }
  return lines.join('\n');
}

export function parseTaskBlocks(source) {
  const normalized = normalizeSource(source);
  const lines = normalized.split('\n');
  const starts = [];
  let fenced = false;

  lines.forEach((line, index) => {
    if (isFence(line)) {
      fenced = !fenced;
      return;
    }
    if (fenced) return;
    const match = line.match(TASK_HEADING);
    if (match) {
      starts.push({
        index,
        id: match.groups.id,
        marker: match.groups.marker,
        title: (match.groups.title ?? '').trim(),
      });
    }
  });

  return starts.map((task, index) => ({
    ...task,
    endIndex: starts[index + 1]?.index ?? lines.length,
    block: lines.slice(task.index, starts[index + 1]?.index ?? lines.length).join('\n'),
  }));
}

export function formatTaskBlock(block, { scaffold = false, canonicalTitles = new Map() } = {}) {
  let candidate = normalizeSource(block).replace(/[ \t]+(?=\n|$)/gu, '');
  const parsed = parseTaskBlocks(candidate);
  if (parsed.length !== 1 || parsed[0].index !== 0) {
    fail('el bloque debe contener exactamente una tarea canónica desde su primera línea.');
  }
  const task = parsed[0];
  if (scaffold) candidate = addScaffold(candidate, task);
  candidate = normalizeCanonicalIdentityTitles(candidate, canonicalTitles);
  candidate = ensureHeaderSeparator(candidate);
  candidate = ensureContinuitySection(candidate);
  candidate = normalizeContinuitySection(candidate);
  candidate = normalizeCanonicalIdentityTitles(candidate, canonicalTitles);

  const beforeFingerprint = semanticFingerprint(candidate);
  const lines = candidate.split('\n');
  const heading = lines.shift().trim();
  while (lines[0]?.trim() === '') lines.shift();

  const metadataLines = [];
  while (lines.length > 0) {
    if (lines[0]?.match(METADATA)) {
      metadataLines.push(normalizeMetadataLine(lines.shift()));
      continue;
    }
    if (lines[0]?.trim() === '' && lines.slice(1).find((line) => line.trim() !== '')?.match(METADATA)) {
      lines.shift();
      continue;
    }
    break;
  }
  const metadata = metadataEntries(metadataLines)
    .sort((left, right) => {
      const rankDelta = metadataRank(left.line, left.index) - metadataRank(right.line, right.index);
      return rankDelta || left.index - right.index;
    })
    .map(({ line }) => line);

  while (lines[0]?.trim() === '') lines.shift();
  const body = normalizeStructuralSpacing(lines);
  const formatted = [
    heading,
    ...(metadata.length > 0 ? ['', ...metadata] : []),
    ...(body.length > 0 ? ['', ...body] : []),
  ].join('\n');

  if (semanticFingerprint(formatted) !== beforeFingerprint) {
    fail(`el formateo de ${task.id} intentó cambiar contenido no estructural.`);
  }
  return formatted;
}

export function validateTaskPresentation(block, { canonicalTitles = new Map() } = {}) {
  const errors = [];
  const normalized = normalizeSource(block).replace(/\n+$/u, '');
  const tasks = parseTaskBlocks(normalized);
  if (tasks.length !== 1 || tasks[0].index !== 0) {
    return ['el bloque debe contener exactamente una tarea canónica.'];
  }
  const lines = normalized.split('\n');
  let index = 1;
  if (lines[index] !== '') errors.push('la cabecera requiere una línea vacía después del título.');
  while (lines[index] === '') index += 1;

  const metadata = new Map();
  let metadataEnded = false;
  for (; index < lines.length; index += 1) {
    const line = lines[index];
    const match = line.match(METADATA);
    if (match && !metadataEnded) {
      const label = match.groups.label.trim();
      const value = match.groups.value.trim();
      metadata.set(label, value);
      if (['Tarea anterior', 'Dependencia anterior', 'Tarea siguiente', 'Continuidad reservada'].includes(label)
        && /^`.*`$/u.test(value)) {
        errors.push(`${label} debe usar texto directo como SHELL-UI-005, no código inline.`);
      }
      continue;
    }
    if (line === '') {
      const laterMetadata = lines.slice(index + 1).find((candidate) => candidate.trim() !== '');
      if (laterMetadata?.match(METADATA)) {
        errors.push('la metadata de cabecera debe ser compacta, sin líneas vacías entre campos.');
      }
    }
    metadataEnded = true;
    if (line.trim() !== '') break;
  }

  for (const label of ['Estado', 'Tarea anterior', 'Tarea siguiente', 'Tipo de tarea', 'Bloque']) {
    if (!metadata.has(label)) errors.push(`falta el campo obligatorio de cabecera: ${label}.`);
  }
  if (lines[index]?.trim() !== '---') errors.push('la cabecera debe cerrar con un separador --- como SHELL-UI-005.');

  const continuityMatch = normalized.match(/^####(?:\s+\d+\.)?\s+Continuidad\s*$/gmu) ?? [];
  if (continuityMatch.length !== 1) {
    errors.push(`debe existir exactamente una sección Continuidad; encontradas ${continuityMatch.length}.`);
    return errors;
  }
  const continuityIndex = normalized.search(/^####(?:\s+\d+\.)?\s+Continuidad\s*$/mu);
  const continuity = normalized.slice(continuityIndex);
  if (/```text/u.test(continuity)) errors.push('Continuidad no puede usar bloques fenced text.');
  if (/No se inicia|permanece reservada y no se desarrolla/iu.test(continuity)) {
    errors.push('Continuidad no debe repetir una frase de no inicio después de SIGUIENTE TAREA RESERVADA.');
  }

  const values = new Map();
  for (const label of CONTINUITY_LABELS) {
    const pattern = new RegExp(`\\*\\*${escapeRegex(label)}\\*\\*\\n\\x60([^\\n\\x60]+)\\x60`, 'u');
    const match = continuity.match(pattern);
    if (!match) errors.push(`${label} debe ocupar una línea y su valor la siguiente en código inline.`);
    else values.set(label, match[1].trim());
  }

  const identity = taskIdentityFromBlock(normalized);
  const expectedCurrent = canonicalIdentity(identity?.current, canonicalTitles);
  const expectedPrevious = canonicalIdentity(identity?.previous, canonicalTitles);
  const expectedNext = canonicalIdentity(identity?.next, canonicalTitles);
  if (identity?.current !== expectedCurrent) {
    errors.push(`el título de ${tasks[0].id} no coincide con la guía de tareas pendientes.`);
  }
  if (identity?.previous !== expectedPrevious) {
    errors.push('Tarea anterior no coincide con el título de la guía de tareas pendientes.');
  }
  if (identity?.next !== expectedNext) {
    errors.push('Tarea siguiente no coincide con el título de la guía de tareas pendientes.');
  }
  if (values.get('TAREA ACTUAL APROBADA') !== identity?.current) {
    errors.push('TAREA ACTUAL APROBADA no coincide con el encabezado de la tarea.');
  }
  if (values.get('ÚLTIMA TAREA APROBADA') !== identity?.previous) {
    errors.push('ÚLTIMA TAREA APROBADA no coincide con Tarea anterior.');
  }
  if (values.get('SIGUIENTE TAREA RESERVADA') !== identity?.next) {
    errors.push('SIGUIENTE TAREA RESERVADA no coincide con Tarea siguiente.');
  }
  const finalValue = values.get('SIGUIENTE TAREA RESERVADA');
  if (finalValue) {
    const finalPattern = new RegExp(
      `\\*\\*SIGUIENTE TAREA RESERVADA\\*\\*\\n\\x60${escapeRegex(finalValue)}\\x60`,
      'u',
    );
    const finalMatch = finalPattern.exec(continuity);
    const trailing = finalMatch
      ? continuity.slice((finalMatch.index ?? 0) + finalMatch[0].length).trim()
      : '';
    if (trailing) errors.push('Continuidad debe terminar después de SIGUIENTE TAREA RESERVADA.');
  }
  return errors;
}

export function formatTaskFileSource(source, {
  taskId = null,
  all = false,
  scaffold = false,
  canonicalTitles = new Map(),
} = {}) {
  const normalized = normalizeSource(source);
  const tasks = parseTaskBlocks(normalized);
  if (tasks.length === 0) fail('el archivo no contiene tareas canónicas.');
  if (all && taskId) fail('--all y --task-id son mutuamente excluyentes.');
  if (scaffold && all) fail('--scaffold exige una tarea explícita; no se permite junto con --all.');

  let selected;
  if (all) {
    selected = tasks;
  } else if (taskId) {
    selected = tasks.filter((task) => task.id === taskId);
    if (selected.length !== 1) fail(`se esperaba una sola tarea ${taskId}; encontradas ${selected.length}.`);
  } else if (tasks.length === 1) {
    selected = tasks;
  } else {
    fail('el archivo contiene varias tareas; use --task-id <ID> o --all.');
  }

  const selectedIds = new Set(selected.map(({ id }) => id));
  const lines = normalized.split('\n');
  const output = [];
  const changedTaskIds = [];
  let cursor = 0;

  for (const task of tasks) {
    output.push(...lines.slice(cursor, task.index));
    if (!selectedIds.has(task.id)) {
      output.push(...lines.slice(task.index, task.endIndex));
    } else {
      const formatted = formatTaskBlock(task.block, { scaffold, canonicalTitles });
      const trailing = task.block.match(/\n+$/u)?.[0] ?? '';
      const formattedWithTrailing = `${formatted}${trailing}`;
      if (formattedWithTrailing !== task.block) changedTaskIds.push(task.id);
      output.push(...formattedWithTrailing.split('\n'));
    }
    cursor = task.endIndex;
  }
  output.push(...lines.slice(cursor));

  return {
    source: `${output.join('\n').replace(/\n+$/u, '')}\n`,
    taskIds: selected.map(({ id }) => id),
    changedTaskIds,
  };
}

function parseArgs(argv) {
  const args = { file: null, taskId: null, all: false, write: false, scaffold: false, help: false };
  for (let index = 0; index < argv.length; index += 1) {
    const token = argv[index];
    if (token === '--help' || token === '-h') args.help = true;
    else if (token === '--all') args.all = true;
    else if (token === '--write') args.write = true;
    else if (token === '--check') args.write = false;
    else if (token === '--scaffold') args.scaffold = true;
    else if (token === '--file' || token === '--task-id') {
      const value = argv[index + 1];
      if (!value || value.startsWith('--')) fail(`falta el valor de ${token}.`);
      args[token === '--file' ? 'file' : 'taskId'] = value;
      index += 1;
    } else fail(`argumento desconocido: ${token}.`);
  }
  return args;
}

function printUsage() {
  console.log(`Uso:
  npm run docs:task:format -- --file <ruta.md> [--task-id <ID> | --all] [--check | --write]
  npm run docs:task:format -- --file <ruta.md> --task-id <ID> --scaffold --write

El modo predeterminado es --check. --write modifica únicamente los bloques seleccionados.
--scaffold solo prepara una tarea NO INICIADA sin secciones y nunca se aplica en masa.`);
}

export function main(argv = process.argv.slice(2)) {
  const args = parseArgs(argv);
  if (args.help) return printUsage();
  if (!args.file) fail('debe indicarse --file <ruta.md>.');

  const filePath = path.resolve(args.file);
  if (!fs.existsSync(filePath)) fail(`no existe ${filePath}.`);
  const raw = fs.readFileSync(filePath, 'utf8');
  const eol = detectEol(raw);
  const canonicalTitles = readPendingTaskTitleAuthority(process.cwd());
  const result = formatTaskFileSource(raw, { ...args, canonicalTitles });
  const next = eol === '\n' ? result.source : result.source.replace(/\n/gu, '\r\n');

  if (result.changedTaskIds.length === 0) {
    console.log(`OK: formato canónico vigente; ${result.taskIds.join(', ')}.`);
    return result;
  }
  if (!args.write) {
    fail(`requieren formato canónico: ${result.changedTaskIds.join(', ')}. Use --write para aplicarlo.`);
  }

  fs.writeFileSync(filePath, next, 'utf8');
  console.log(`OK: formato canónico aplicado a ${result.changedTaskIds.join(', ')}.`);
  return result;
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
