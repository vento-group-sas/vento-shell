import fs from 'node:fs';
import path from 'node:path';
import {
  serializeActiveSequence,
} from './continuity-route.mjs';
import { readAndResolveExecutionRoute } from './execution-route.mjs';
import { deriveImplementationControl } from './implementation-control.mjs';
import {
  buildImplementationMaterializationIndex,
  buildPhysicalMaterializationSummary,
} from './implementation-materialization.mjs';

const TASK_REGEX = /^###\s+(?<marker>\[[ x~]\]|[✅🟡❌])\s+(?<id>[A-Z][A-Z0-9]*(?:-[A-Z0-9]+)+-\d{3})\b(?:\s+[—-]\s+(?<title>[^\n]+))?$/gmu;

const REGISTRY_OUTPUT = '.generated/REGISTRO_GLOBAL_DE_TAREAS.md';
const ACTIVE_SEQUENCE_CONFIG = 'active-sequence.json';

function fail(message) {
  throw new Error(message);
}

function escapeRegex(value) {
  return value.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

function maskFencedCode(text) {
  let insideFence = false;

  return text
    .split('\n')
    .map((line) => {
      if (/^\s*```/.test(line)) {
        insideFence = !insideFence;
        return '';
      }
      return insideFence ? '' : line;
    })
    .join('\n');
}

export function expandSequenceSegments(segments) {
  if (!Array.isArray(segments) || segments.length === 0) {
    fail('active-sequence.json no contiene segmentos válidos.');
  }

  const ids = segments.flatMap((segment) => {
    const { prefix, from, to } = segment ?? {};
    if (
      typeof prefix !== 'string'
      || !Number.isInteger(from)
      || !Number.isInteger(to)
      || from < 1
      || to < from
    ) {
      fail('active-sequence.json contiene un segmento inválido.');
    }

    return Array.from(
      { length: to - from + 1 },
      (_, index) => `${prefix}-${String(from + index).padStart(3, '0')}`
    );
  });

  if (new Set(ids).size !== ids.length) {
    fail('active-sequence.json genera tareas duplicadas.');
  }
  return ids;
}

export function readActiveSequenceConfig(baseDir) {
  const configPath = path.join(baseDir, ACTIVE_SEQUENCE_CONFIG);
  if (!fs.existsSync(configPath)) {
    fail(`no existe ${path.relative(baseDir, configPath)}; debe definirse el bloque activo.`);
  }

  const config = JSON.parse(fs.readFileSync(configPath, 'utf8'));
  if (![1, 2].includes(config.schema_version)) {
    fail('active-sequence.json utiliza una versión no soportada.');
  }
  if (typeof config.sequence_id !== 'string') fail('active-sequence.json no define sequence_id.');
  if (typeof config.block_code !== 'string') fail('active-sequence.json no define block_code.');
  if (typeof config.block_title !== 'string') fail('active-sequence.json no define block_title.');
  if (typeof config.previous_task_id !== 'string') fail('active-sequence.json no define previous_task_id.');
  if (config.handoff_task_id !== null && typeof config.handoff_task_id !== 'string') {
    fail('active-sequence.json contiene handoff_task_id inválido.');
  }
  if (config.handoff_sequence_id !== null && typeof config.handoff_sequence_id !== 'string') {
    fail('active-sequence.json contiene handoff_sequence_id inválido.');
  }
  if ((config.handoff_task_id === null) !== (config.handoff_sequence_id === null)) {
    fail('active-sequence.json debe declarar ambos campos de handoff o dejar ambos en null.');
  }

  const taskIds = Array.isArray(config.task_ids)
    ? config.task_ids
    : expandSequenceSegments(config.segments);
  if (taskIds.length === 0 || taskIds.some((id) => typeof id !== 'string')) {
    fail('active-sequence.json no contiene tareas activas válidas.');
  }
  return { ...config, taskIds };
}

export function buildExecutionSequence(activeConfig) {
  return [activeConfig.previous_task_id, ...activeConfig.taskIds];
}

function stateFromMarker(marker) {
  if (marker === '✅' || marker === '[x]') return 'APROBADA';
  if (marker === '🟡' || marker === '[~]') return 'PROPUESTA PARA APROBACIÓN';
  if (marker === '[ ]') return 'NO INICIADA';
  if (marker === '❌') return 'RECHAZADA';
  fail(`marcador de tarea no reconocido: ${marker || 'VACÍO'}.`);
}

function stateIcon(state) {
  if (state === 'APROBADA') return '✅';
  if (state === 'PROPUESTA PARA APROBACIÓN') return '🟡';
  if (state === 'NO INICIADA') return '⬜';
  if (state === 'RECHAZADA') return '❌';
  return '⚠️';
}

export function readGlobalTaskRegistry(baseDir, manifest) {
  const taskMap = new Map();
  const missingTitles = [];

  manifest.files.forEach((relativePath, fileIndex) => {
    const fullPath = path.join(baseDir, relativePath);
    if (!fs.existsSync(fullPath) || !fs.statSync(fullPath).isFile()) return;

    const source = fs.readFileSync(fullPath, 'utf8').replace(/\r\n?/g, '\n');
    const text = maskFencedCode(source);
    const matches = [...text.matchAll(TASK_REGEX)];

    matches.forEach((match, taskIndex) => {
      const id = match.groups?.id;
      if (!id) return;
      if (taskMap.has(id)) {
        const previous = taskMap.get(id);
        fail(`la tarea ${id} aparece en más de un fragmento: ${previous.relativePath} y ${relativePath}.`);
      }

      const marker = match.groups?.marker ?? '';
      const rawTitle = (match.groups?.title ?? '').trim();
      const title = rawTitle || '(sin título canónico)';
      if (!rawTitle) missingTitles.push(`${id} en ${relativePath}`);

      taskMap.set(id, {
        id,
        title,
        marker,
        state: stateFromMarker(marker),
        relativePath,
        fileIndex,
        taskIndex,
      });
    });
  });

  if (taskMap.size === 0) {
    fail('no se detectaron tareas con marcador canónico.');
  }

  if (missingTitles.length > 0) {
    console.warn(`ADVERTENCIA: tareas sin título canónico: ${missingTitles.join(', ')}.`);
  }

  return taskMap;
}

export function calculateCompletionPercentage(approved, total) {
  if (!Number.isInteger(approved) || !Number.isInteger(total) || approved < 0 || total < 0) {
    fail('los conteos de completamiento deben ser enteros no negativos.');
  }
  if (approved > total) fail('las tareas aprobadas no pueden superar el total canónico.');
  if (total === 0) return 0;
  return Number(((approved / total) * 100).toFixed(2));
}

export function summarizeRegistry(taskMap) {
  const tasks = [...taskMap.values()];
  const count = (state) => tasks.filter((task) => task.state === state).length;
  const approved = count('APROBADA');

  return {
    total: tasks.length,
    auth: tasks.filter((task) => task.id.startsWith('AUTH-')).length,
    approved,
    proposed: count('PROPUESTA PARA APROBACIÓN'),
    notStarted: count('NO INICIADA'),
    rejected: count('RECHAZADA'),
    completionPercentage: calculateCompletionPercentage(approved, tasks.length),
  };
}

export function resolveContinuity(taskMap, sequenceIds) {
  const tasks = sequenceIds.map((id) => {
    const task = taskMap.get(id);
    if (!task) fail(`no se encontró la tarea requerida por la secuencia activa: ${id}.`);
    if (task.title === '(sin título canónico)') fail(`la tarea activa ${id} no tiene título canónico.`);
    return task;
  });

  const currentIndex = tasks.findIndex((task) => task.state !== 'APROBADA');

  if (currentIndex < 0) {
    return {
      sequence: tasks,
      lastApproved: tasks.at(-1),
      current: null,
      next: null,
      isComplete: true,
    };
  }
  if (currentIndex === 0) {
    fail(`la secuencia activa no tiene una tarea aprobada anterior a ${tasks[0].id}.`);
  }

  const approvalsOutOfOrder = tasks
    .slice(currentIndex + 1)
    .filter((task) => task.state === 'APROBADA');
  if (approvalsOutOfOrder.length > 0) {
    fail(`existen aprobaciones fuera de orden después de ${tasks[currentIndex].id}: ${approvalsOutOfOrder.map((task) => task.id).join(', ')}.`);
  }

  const proposals = tasks.filter((task) => task.state === 'PROPUESTA PARA APROBACIÓN');
  if (proposals.length > 1) {
    fail(`existe más de una tarea en propuesta dentro de la secuencia activa: ${proposals.map((task) => task.id).join(', ')}.`);
  }

  return {
    sequence: tasks,
    lastApproved: tasks[currentIndex - 1],
    current: tasks[currentIndex],
    next: tasks[currentIndex + 1] ?? null,
    isComplete: false,
  };
}

export function resolveHandoff(taskMap, activeConfig, sequenceIds) {
  const { handoff_task_id: handoffId, handoff_sequence_id: handoffSequenceId } = activeConfig;
  if (handoffId === null && handoffSequenceId === null) return null;
  if (sequenceIds.includes(handoffId)) {
    fail(`la tarea de handoff ${handoffId} no puede pertenecer a la secuencia activa que cierra.`);
  }
  const task = taskMap.get(handoffId);
  if (!task) fail(`no se encontró la tarea de handoff declarada: ${handoffId}.`);
  if (task.state !== 'NO INICIADA') {
    fail(`la tarea de handoff ${handoffId} debe permanecer NO INICIADA hasta activar ${handoffSequenceId}.`);
  }
  return { ...task, handoffSequenceId };
}

function replaceRow(text, label, value) {
  const pattern = new RegExp(`^\\|\\s*${escapeRegex(label)}\\s*\\|[^\\n]*\\|$`, 'm');
  if (!pattern.test(text)) fail(`no se encontró la fila de cabecera "${label}".`);
  return text.replace(pattern, `| ${label} | ${value} |`);
}

function replaceSection(text, heading, updater) {
  const start = text.indexOf(heading);
  if (start < 0) fail(`no se encontró la sección ${heading}.`);
  const nextHeading = text.indexOf('\n## ', start + heading.length);
  const end = nextHeading < 0 ? text.length : nextHeading;
  return text.slice(0, start) + updater(text.slice(start, end)) + text.slice(end);
}

function replaceRegistrySummaryRows(header, stats) {
  const labels = [
    'Tareas canónicas con marcador',
    'Tareas `AUTH` únicas',
    'Tareas aprobadas',
    'Tareas en propuesta',
    'Tareas no iniciadas',
    'Tareas rechazadas',
    'Porcentaje de completamiento',
  ];

  let updated = header;
  for (const label of labels) {
    const pattern = new RegExp(`^\\|\\s*${escapeRegex(label)}\\s*\\|[^\\n]*\\|\\n?`, 'm');
    updated = updated.replace(pattern, '');
  }

  const anchorPattern = /^\|\s*Fragmentos canónicos\s*\|[^\n]*\|$/m;
  const anchor = updated.match(anchorPattern)?.[0];
  if (!anchor) fail('no se encontró la fila Fragmentos canónicos para insertar el registro global.');

  const rows = [
    `| Tareas canónicas con marcador | **${stats.total}** |`,
    `| Tareas \`AUTH\` únicas | **${stats.auth}** |`,
    `| Tareas aprobadas | **${stats.approved}** |`,
    `| Tareas en propuesta | **${stats.proposed}** |`,
    `| Tareas no iniciadas | **${stats.notStarted}** |`,
    `| Tareas rechazadas | **${stats.rejected}** |`,
    `| Porcentaje de completamiento | **${stats.completionPercentage.toFixed(2)}% (${stats.approved}/${stats.total})** |`,
  ].join('\n');

  return updated.replace(anchorPattern, `${anchor}\n${rows}`);
}

function ensureRegistryNavigationLink(header) {
  const link = '- [Registro global de tareas](./.generated/REGISTRO_GLOBAL_DE_TAREAS.md)';
  if (header.includes(link)) return header;

  const navigationHeading = '## Navegación principal';
  if (!header.includes(navigationHeading)) fail('no se encontró la sección de navegación principal.');
  return header.replace(navigationHeading, `${navigationHeading}\n\n${link}`);
}

function formatTask(task, code = false) {
  const id = code ? `\`${task.id}\`` : task.id;
  return `${id} — ${task.title}`;
}

function progressStatus(task) {
  if (task.state === 'PROPUESTA PARA APROBACIÓN') return 'en propuesta';
  if (task.state === 'RECHAZADA') return 'requiere corrección';
  return 'pendiente';
}

function readBlockProgress(activeConfig) {
  const progress = activeConfig.block_progress;
  const values = [progress?.total_tasks, progress?.approved_tasks, progress?.pending_tasks];
  if (values.some((value) => !Number.isInteger(value) || value < 0)) {
    fail('active-sequence.json no contiene un block_progress válido.');
  }
  if (progress.approved_tasks + progress.pending_tasks !== progress.total_tasks) {
    fail('active-sequence.json contiene un block_progress incoherente.');
  }
  return progress;
}

export function buildProgressSummary(continuity, activeConfig) {
  const progress = readBlockProgress(activeConfig);
  if (continuity.isComplete) {
    return `${activeConfig.block_code}: ${progress.approved_tasks} de ${progress.total_tasks} aprobadas; secuencia documental completa`;
  }
  return `${activeConfig.block_code}: ${progress.approved_tasks} de ${progress.total_tasks} aprobadas; ${continuity.current.id} ${progressStatus(continuity.current)}`;
}

function pluralState(state, count) {
  if (count === 1) return state;
  if (state === 'APROBADA') return 'APROBADAS';
  if (state === 'NO INICIADA') return 'NO INICIADAS';
  if (state === 'RECHAZADA') return 'RECHAZADAS';
  return state;
}

function buildCtxProgressRows(taskMap) {
  const tasks = Array.from(
    { length: 30 },
    (_, index) => taskMap.get(`AUTH-CTX-${String(index + 1).padStart(3, '0')}`)
  );
  const groups = [];

  for (const task of tasks) {
    const number = Number(task.id.slice(-3));
    const previous = groups.at(-1);
    if (previous && previous.state === task.state && previous.end + 1 === number) {
      previous.end = number;
    } else {
      groups.push({ start: number, end: number, state: task.state });
    }
  }

  return groups.map((group) => {
    const startId = `AUTH-CTX-${String(group.start).padStart(3, '0')}`;
    const endId = `AUTH-CTX-${String(group.end).padStart(3, '0')}`;
    const label = group.start === group.end
      ? `\`${startId}\``
      : `\`${startId}\` a \`${endId}\``;
    return `| ${label} | **${pluralState(group.state, group.end - group.start + 1)}** |`;
  });
}

function updateProgressSection(section, taskMap, continuity, activeConfig, implementationControl) {
  const gate = taskMap.get('AUTH-MOD-021');
  const gateValue = gate.state === 'APROBADA'
    ? '**APROBADA — PUERTA SUPERADA**'
    : `**${gate.state} — PUERTA ANTES DE AUTH-CTX-028**`;

  let updated = replaceRow(section, '`AUTH-MOD-021`', gateValue);
  const firstCtxRow = updated.search(/^\|\s*`AUTH-CTX-\d{3}`/m);
  const implementationRow = updated.search(/^\|\s*Implementación física\s*\|/m);
  if (firstCtxRow < 0 || implementationRow <= firstCtxRow) {
    fail('no se pudo localizar el bloque de progreso AUTH-CTX.');
  }

  const rows = `${buildCtxProgressRows(taskMap).join('\n')}\n`;
  updated = updated.slice(0, firstCtxRow) + rows + updated.slice(implementationRow);

  const activePattern = /^\|\s*(?:CONTINUIDAD ACTIVA|BLOQUE E3|BLOQUE H2?|CARRIL [^|]+)\s*\|[^\n]*\|\n?/gmu;
  updated = updated.replace(activePattern, '');

  const progress = readBlockProgress(activeConfig);
  const activeStatus = continuity.isComplete
    ? `${progress.approved_tasks} DE ${progress.total_tasks} APROBADAS — SECUENCIA DOCUMENTAL COMPLETA`
    : `${progress.approved_tasks} DE ${progress.total_tasks} APROBADAS — ACTUAL ${continuity.current.id}`;
  const activeRow = `| CONTINUIDAD ACTIVA | **${activeConfig.block_code}: ${activeStatus}** |`;
  const implementationPattern = /^\|\s*Implementación física\s*\|[^\n]*\|$/m;
  if (!implementationPattern.test(updated)) fail('no se encontró la fila Implementación física.');
  const physical = implementationControl.physical.active
    ? `**${implementationControl.physical.active.instanceId} — ${implementationControl.physical.active.status}**`
    : '**SIN INSTANCIA FÍSICA ACTIVA**';
  return updated.replace(implementationPattern, `${activeRow}\n| Implementación física | ${physical} |`);
}

function buildControlBlock(continuity, activeConfig) {
  const progress = readBlockProgress(activeConfig);
  const lines = [
    '## Control de continuidad',
    '',
    '```text',
    'ÚLTIMA TAREA APROBADA',
    formatTask(continuity.lastApproved),
    '        ↓',
  ];

  if (continuity.isComplete) {
    lines.push('SECUENCIA DOCUMENTAL COMPLETA');
  } else {
    lines.push('TAREA ACTUAL', formatTask(continuity.current));
  }

  const reservedNext = continuity.next ?? continuity.handoff;
  if (reservedNext) {
    lines.push('        ↓', 'SIGUIENTE TAREA RESERVADA', formatTask(reservedNext));
  }

  lines.push(
    '        ↓',
    'CONTINUIDAD DEL BLOQUE',
    `${activeConfig.block_code} — ${progress.approved_tasks} de ${progress.total_tasks} tareas aprobadas`,
    '```'
  );
  return lines.join('\n');
}

function updateHeader(header, manifest, taskMap, stats, continuity, activeConfig, implementationControl) {
  const originalEol = header.includes('\r\n') ? '\r\n' : '\n';
  let updated = header.replace(/\r\n?/g, '\n');
  updated = replaceRow(updated, 'Fragmentos canónicos', `**${manifest.files.length}**`);
  updated = replaceRegistrySummaryRows(updated, stats);
  updated = replaceRow(updated, 'Última tarea aprobada', `**${formatTask(continuity.lastApproved)}**`);
  updated = replaceRow(
    updated,
    'Tarea actual',
    continuity.isComplete ? '**NINGUNA — SECUENCIA DOCUMENTAL COMPLETA**' : `**${formatTask(continuity.current)}**`
  );
  updated = replaceRow(
    updated,
    'Estado de la tarea actual',
    continuity.isComplete ? '**SECUENCIA DOCUMENTAL COMPLETA**' : `**${continuity.current.state}**`
  );
  updated = replaceRow(updated, 'Bloque actual', `**${activeConfig.block_code} — ${activeConfig.block_title}**`);
  updated = replaceRow(
    updated,
    'Siguiente tarea',
    continuity.next || continuity.handoff
      ? `**${formatTask(continuity.next ?? continuity.handoff)}**`
      : '**NINGUNA — CIERRE SIN HANDOFF DECLARADO**'
  );
  updated = replaceRow(updated, 'Progreso del bloque', `**${buildProgressSummary(continuity, activeConfig)}**`);
  updated = replaceRow(updated, 'Estado de implementación', `**${implementationControl.mode}**`);
  updated = replaceRow(
    updated,
    'Acción principal obligatoria',
    `**${implementationControl.primaryAction.type} — ${implementationControl.primaryAction.target}**`,
  );
  updated = replaceRow(
    updated,
    'Carril documental',
    `**${implementationControl.documentary.state} — ${implementationControl.documentary.taskId}**`,
  );
  updated = replaceRow(
    updated,
    'Carril físico',
    implementationControl.physical.active
      ? `**${implementationControl.physical.active.status} — ${implementationControl.physical.active.instanceId}**`
      : '**SIN INSTANCIA FÍSICA ACTIVA**',
  );
  updated = replaceRow(
    updated,
    'Alcance físico autorizado',
    implementationControl.physical.authorized.length > 0
      ? `**${implementationControl.physical.authorized.map(({ instanceId }) => instanceId).join(', ')}**`
      : '**NINGUNO**',
  );

  updated = replaceSection(updated, '### Continuidad inmediata', (section) => {
    let result = section;
    result = replaceRow(result, 'Última aprobada', formatTask(continuity.lastApproved, true));
    result = replaceRow(
      result,
      'Tarea actual',
      continuity.isComplete
        ? 'NINGUNA — **SECUENCIA DOCUMENTAL COMPLETA**'
        : `${formatTask(continuity.current, true)} — **${continuity.current.state}**`
    );
    result = replaceRow(
      result,
      'Siguiente tarea',
      continuity.next || continuity.handoff
        ? formatTask(continuity.next ?? continuity.handoff, true)
        : 'NINGUNA — CIERRE SIN HANDOFF DECLARADO'
    );
    result = replaceRow(
      result,
      'Restricción',
      '**NO EJECUTAR CÓDIGO, DATOS, SUPABASE NI DESPLIEGUES SIN UNA INSTANCIA EXPLÍCITAMENTE AUTORIZADA**',
    );
    return result;
  });

  updated = replaceSection(
    updated,
    '## Progreso documental aprobado',
    (section) => updateProgressSection(section, taskMap, continuity, activeConfig, implementationControl)
  );

  const controlPattern = /## Control de continuidad\n\n```text\n[\s\S]*?\n```/;
  if (!controlPattern.test(updated)) fail('no se encontró el bloque Control de continuidad.');
  updated = updated.replace(controlPattern, buildControlBlock(continuity, activeConfig));
  updated = ensureRegistryNavigationLink(updated);
  return originalEol === '\n' ? updated : updated.replace(/\n/g, '\r\n');
}

function escapeMarkdownCell(value) {
  return String(value).replaceAll('|', '\\|').replaceAll('\n', ' ');
}

export function buildRegistryMarkdown(taskMap, stats, continuity, materializationReport) {
  const tasks = [...taskMap.values()].sort(
    (a, b) => a.fileIndex - b.fileIndex || a.taskIndex - b.taskIndex
  );
  const physical = buildPhysicalMaterializationSummary(materializationReport);
  const adoptionCounts = {
    EXISTING_NEEDS_ADOPTION_EVIDENCE: 0,
    PARTIAL_DELTA: 0,
    NOT_IMPLEMENTED: 0,
    CONTRADICTION: 0,
    REUSE_VERIFIED: 0,
  };
  for (const row of physical.rows) {
    if (row.adoption_classification && Object.hasOwn(adoptionCounts, row.adoption_classification)) {
      adoptionCounts[row.adoption_classification] += 1;
    }
  }
  const adoptionClassified = Object.values(adoptionCounts).reduce((total, count) => total + count, 0);
  const unitDagSummary = materializationReport?.unit_dag_reconciliation?.summary ?? null;

  if (physical.rows.length !== tasks.length) {
    fail(
      `materialization report no cubre el registro global: `
      + `${physical.rows.length}/${tasks.length} tareas.`,
    );
  }

  const documentaryNotApproved = stats.total - stats.approved;
  if (physical.counts.DOCUMENTARY_PENDING !== documentaryNotApproved) {
    fail(
      `estado físico NO_EVALUADA desalineado con estado documental: `
      + `${physical.counts.DOCUMENTARY_PENDING} físico(s) vs `
      + `${documentaryNotApproved} tarea(s) no aprobada(s).`,
    );
  }

  const lines = [
    '# REGISTRO GLOBAL DE TAREAS — VENTO OS',
    '',
    '> Archivo derivado. No editar manualmente.',
    '>',
    '> El estado documental deriva exclusivamente del marcador del encabezado de cada tarea.',
    '>',
    '> El estado físico deriva de `CANONICAL-IMPLEMENTATION-MATERIALIZATION-001`; `SIN_TRAZABILIDAD_FISICA` no equivale a `NO IMPLEMENTADA`.',
    '>',
    '> La clasificación de adopción deriva de la reconciliación explícita de `STEP_GLOBAL_04`; no declara materialización ni crea relaciones TASK -> UNIT.',
    '',
    '## Resumen global',
    '',
    '| Métrica | Cantidad |',
    '| --- | ---: |',
    `| Tareas con marcador | **${stats.total}** |`,
    `| Tareas \`AUTH\` | **${stats.auth}** |`,
    `| Aprobadas | **${stats.approved}** |`,
    `| En propuesta | **${stats.proposed}** |`,
    `| No iniciadas | **${stats.notStarted}** |`,
    `| Rechazadas | **${stats.rejected}** |`,
    `| Porcentaje de completamiento | **${stats.completionPercentage.toFixed(2)}% (${stats.approved}/${stats.total})** |`,
    '',
    '## Resumen de materialización física',
    '',
    '| Estado físico | Tareas |',
    '| --- | ---: |',
    `| ⏸ NO_EVALUADA | **${physical.counts.DOCUMENTARY_PENDING}** |`,
    `| ⚠️ SIN_TRAZABILIDAD_FISICA | **${physical.counts.UNMAPPED}** |`,
    `| 🧩 MAPEADA | **${physical.counts.MAPPED}** |`,
    `| 🟡 EN_IMPLEMENTACION | **${physical.counts.IN_IMPLEMENTATION}** |`,
    `| 🟠 PARCIAL | **${physical.counts.PARTIAL}** |`,
    `| ✅ MATERIALIZADA | **${physical.counts.MATERIALIZED}** |`,
    '| ➖ NO_APLICA_FISICO | **0 — clasificación reservada para reconciliación explícita** |',
    '',
    '> `MATERIALIZADA` solo se declara automáticamente para obligaciones singleton con instancia `VERIFIED` y evidencia. Las cardinalidades abiertas permanecen `PARCIAL` hasta que una relación explícita permita demostrar cobertura completa.',
    '',
    '## Resumen de reconciliación de adopción',
    '',
    '| Clasificación | Tareas |',
    '| --- | ---: |',
    `| EXISTING_NEEDS_ADOPTION_EVIDENCE | **${adoptionCounts.EXISTING_NEEDS_ADOPTION_EVIDENCE}** |`,
    `| PARTIAL_DELTA | **${adoptionCounts.PARTIAL_DELTA}** |`,
    `| NOT_IMPLEMENTED | **${adoptionCounts.NOT_IMPLEMENTED}** |`,
    `| CONTRADICTION | **${adoptionCounts.CONTRADICTION}** |`,
    `| REUSE_VERIFIED | **${adoptionCounts.REUSE_VERIFIED}** |`,
    `| Clasificadas por STEP_GLOBAL_04 | **${adoptionClassified}** |`,
    ...(unitDagSummary ? [
      '',
      '## Resumen de UNIT DAG candidato',
      '',
      '> Artefacto canónico de planificación de STEP_GLOBAL_05. Las candidate keys NO son `implementation_unit_id`, no crean relaciones TASK -> UNIT y no autorizan implementación física.',
      '',
      '| Métrica | Cantidad |',
      '| --- | ---: |',
      `| Tareas del cohort de adopción | **${unitDagSummary.adoption_tasks}** |`,
      `| Tareas con candidate key | **${unitDagSummary.candidate_tasks}** |`,
      `| Clusters candidatos | **${unitDagSummary.candidate_nodes}** |`,
      `| Clusters compartidos | **${unitDagSummary.shared_candidate_clusters}** |`,
      `| Dependencias candidatas | **${unitDagSummary.candidate_edges}** |`,
      `| Componentes cíclicos | **${unitDagSummary.cycle_components}** |`,
      `| Tareas NOT_IMPLEMENTED excluidas | **${unitDagSummary.not_implemented_tasks}** |`,
      `| Unidades canónicas observadas | **${unitDagSummary.known_canonical_units_observed}** |`,
      `| Matches exactos candidate -> unidad canónica | **${unitDagSummary.known_unit_evidence_matches}** |`,
    ] : []),
    '',
    '## Continuidad activa',
    '',
    '| Relación | Tarea | Estado |',
    '| --- | --- | --- |',
    `| Última aprobada | \`${continuity.lastApproved.id}\` — ${escapeMarkdownCell(continuity.lastApproved.title)} | ✅ APROBADA |`,
  ];

  if (continuity.isComplete) {
    lines.push('| Estado de secuencia | NINGUNA TAREA ACTUAL | ✅ SECUENCIA DOCUMENTAL COMPLETA |');
  } else {
    lines.push(`| Tarea actual | \`${continuity.current.id}\` — ${escapeMarkdownCell(continuity.current.title)} | ${stateIcon(continuity.current.state)} ${continuity.current.state} |`);
  }

  const reservedNext = continuity.next ?? continuity.handoff;
  if (reservedNext) {
    lines.push(`| Siguiente reservada | \`${reservedNext.id}\` — ${escapeMarkdownCell(reservedNext.title)} | ${stateIcon(reservedNext.state)} ${reservedNext.state} |`);
  }

  lines.push(
    '',
    '## Registro completo',
    '',
    '| Estado documental | Estado físico | Clasificación de adopción | Identificador | Título | Materializada por | Evidencia física | Fragmento fuente |',
    '| --- | --- | --- | --- | --- | --- | --- | --- |'
  );

  for (const task of tasks) {
    const physicalTask = physical.byTask.get(task.id);
    if (!physicalTask) fail(`falta proyección física para ${task.id}.`);
    const materializerRefs = physicalTask.materializer_refs.length > 0
      ? physicalTask.materializer_refs.map((value) => `\`${escapeMarkdownCell(value)}\``).join('<br>')
      : '—';
    const evidenceRefs = physicalTask.evidence_refs.length > 0
      ? physicalTask.evidence_refs.map((value) => `\`${escapeMarkdownCell(value)}\``).join('<br>')
      : '—';

    lines.push(
      `| ${stateIcon(task.state)} ${task.state} | ${escapeMarkdownCell(physicalTask.display)} | ${escapeMarkdownCell(physicalTask.adoption_classification ?? '—')} | \`${task.id}\` | ${escapeMarkdownCell(task.title)} | ${materializerRefs} | ${evidenceRefs} | \`${escapeMarkdownCell(task.relativePath)}\` |`
    );
  }

  lines.push('');
  return lines.join('\n');
}

export function syncPlanContinuity({ root = process.cwd(), checkOnly = false } = {}) {
  const baseDir = path.resolve(root, 'docs/plan-canonico/modular');
  const manifestPath = path.join(baseDir, 'manifest.json');
  const headerPath = path.join(baseDir, '00_CABECERA_Y_ESTADO.md');
  const registryPath = path.join(baseDir, REGISTRY_OUTPUT);
  const activeSequencePath = path.join(baseDir, ACTIVE_SEQUENCE_CONFIG);

  if (!fs.existsSync(manifestPath)) fail(`no existe ${path.relative(root, manifestPath)}.`);
  if (!fs.existsSync(headerPath)) fail(`no existe ${path.relative(root, headerPath)}.`);

  const manifest = JSON.parse(fs.readFileSync(manifestPath, 'utf8'));
  if (!Array.isArray(manifest.files) || manifest.files.length === 0) {
    fail('manifest.json no contiene una lista válida de archivos.');
  }

  const taskMap = readGlobalTaskRegistry(baseDir, manifest);
  const stats = summarizeRegistry(taskMap);
  const resolvedActiveConfig = readAndResolveExecutionRoute(baseDir, taskMap);
  const nextActiveSequence = serializeActiveSequence(resolvedActiveConfig);
  const currentActiveSequence = fs.existsSync(activeSequencePath)
    ? fs.readFileSync(activeSequencePath, 'utf8').replace(/\r\n?/gu, '\n')
    : '';
  const activeSequenceChanged = currentActiveSequence !== nextActiveSequence;

  if (checkOnly && activeSequenceChanged) {
    fail(
      `active-sequence.json está desactualizado; ejecute docs:plan:build. `
      + `La ruta resolvió ${resolvedActiveConfig.sequence_id}.`,
    );
  }
  if (!checkOnly && activeSequenceChanged) {
    fs.writeFileSync(activeSequencePath, nextActiveSequence, 'utf8');
  }

  const activeConfig = readActiveSequenceConfig(baseDir);
  const continuityTaskMap = new Map(taskMap);
  for (const task of activeConfig.virtual_tasks ?? []) {
    if (!task?.id || continuityTaskMap.has(task.id)) {
      fail(`active-sequence.json contiene una tarea virtual inválida o duplicada: ${task?.id ?? 'VACÍA'}.`);
    }
    continuityTaskMap.set(task.id, task);
  }
  const sequenceIds = buildExecutionSequence(activeConfig);
  const continuity = resolveContinuity(continuityTaskMap, sequenceIds);
  continuity.handoff = resolveHandoff(continuityTaskMap, activeConfig, sequenceIds);
  const implementationControl = deriveImplementationControl({ root });
  const materializationReport = buildImplementationMaterializationIndex({ root });

  const currentHeader = fs.readFileSync(headerPath, 'utf8');
  const nextHeader = updateHeader(
    currentHeader,
    manifest,
    taskMap,
    stats,
    continuity,
    activeConfig,
    implementationControl,
  );
  const nextRegistry = buildRegistryMarkdown(
    taskMap,
    stats,
    continuity,
    materializationReport,
  );
  const headerChanged = nextHeader !== currentHeader;
  const registryChanged = !fs.existsSync(registryPath) || fs.readFileSync(registryPath, 'utf8') !== nextRegistry;

  if (checkOnly && (headerChanged || registryChanged)) {
    const pending = [
      headerChanged ? 'cabecera' : null,
      registryChanged ? 'registro global' : null,
    ].filter(Boolean).join(' y ');
    fail(`${pending} desactualizado(s). Estado derivado: última ${continuity.lastApproved.id}; actual ${continuity.current?.id ?? 'NINGUNA'}; siguiente ${(continuity.next ?? continuity.handoff)?.id ?? 'NINGUNA'}.`);
  }

  if (!checkOnly) {
    if (headerChanged) fs.writeFileSync(headerPath, nextHeader, 'utf8');
    if (registryChanged) {
      fs.mkdirSync(path.dirname(registryPath), { recursive: true });
      fs.writeFileSync(registryPath, nextRegistry, 'utf8');
    }
  }

  const action = activeSequenceChanged || headerChanged || registryChanged ? 'sincronizados' : 'vigentes';
  console.log(
    `OK: continuidad y registro global ${action}; ${stats.total} tareas; ${stats.approved} aprobadas; ${stats.proposed} en propuesta; ${stats.notStarted} no iniciadas; ${stats.rejected} rechazadas.`
  );
  console.log(
    `OK: secuencia activa; última ${continuity.lastApproved.id}; actual ${continuity.current?.id ?? 'NINGUNA'}; siguiente ${(continuity.next ?? continuity.handoff)?.id ?? 'NINGUNA'}.`
  );

  return {
    changed: activeSequenceChanged || headerChanged || registryChanged,
    activeSequenceChanged,
    stats,
    taskMap,
    activeConfig,
    implementationControl,
    materializationReport,
    ...continuity,
  };
}
