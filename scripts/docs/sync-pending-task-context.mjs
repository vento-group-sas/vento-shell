import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

import { parseTaskBlocks } from './format-canonical-task.mjs';
import { resolveTaskWorkTopology } from './task-work-topology.mjs';
import { deriveImplementationControl } from './implementation-control.mjs';
import {
  loadValidatedCorrectionControl,
  openCorrections,
} from './correction-control.mjs';
import { scanPackageReadiness } from './package-readiness-scanner.mjs';

const TASK_ID_PATTERN = '[A-Z][A-Z0-9]*(?:-[A-Z0-9]+)+-\\d{3}';
const TASK_REFERENCE = new RegExp(`\\b${TASK_ID_PATTERN}(?!\\d)`, 'gu');
const TREQ_REFERENCE = /\bTREQ-[A-Z]+-\d{3,}\b/gu;
const SCOPE_START = '<!-- TASK-SCOPE-CONTRACT:START -->';
const SCOPE_END = '<!-- TASK-SCOPE-CONTRACT:END -->';
const OUTPUT = '.generated/REGISTRO_DE_TAREAS_PENDIENTES_CON_CONTEXTO.md';

function maskFencedCode(text) {
  let insideFence = false;
  return text.split('\n').map((line) => {
    if (/^\s*```/u.test(line)) {
      insideFence = !insideFence;
      return '';
    }
    return insideFence ? '' : line;
  }).join('\n');
}

function stateFromMarker(marker) {
  if (marker === '[ ]') return 'NO INICIADA';
  if (marker === '[~]' || marker === '🟡') return 'PROPUESTA PARA APROBACIÓN';
  if (marker === '❌') return 'RECHAZADA';
  return 'APROBADA';
}

function normalizeSubject(title) {
  return title.trim().replace(/[.!?]+$/u, '');
}

function conjugateCoordinatedActions(value) {
  const conjugations = new Map([
    ['aprobar', 'aprueba'],
    ['certificar', 'certifica'],
    ['configurar', 'configura'],
    ['corregir', 'corrige'],
    ['desplegar', 'despliega'],
    ['documentar', 'documenta'],
    ['estabilizar', 'estabiliza'],
    ['ejecutar', 'ejecuta'],
    ['habilitar', 'habilita'],
    ['migrar', 'migra'],
    ['probar', 'prueba'],
    ['proteger', 'protege'],
    ['publicar', 'publica'],
    ['reconciliar', 'reconcilia'],
    ['recuperar', 'recupera'],
    ['registrar', 'registra'],
    ['resolver', 'resuelve'],
    ['retirar', 'retira'],
    ['validar', 'valida'],
    ['verificar', 'verifica'],
  ]);
  let result = value;
  for (const [infinitive, conjugated] of conjugations) {
    result = result.replace(new RegExp(`\\by ${infinitive}\\b`, 'giu'), `y ${conjugated}`);
  }
  return result;
}

export function describePendingTask(title) {
  const subject = normalizeSubject(title || 'tarea sin título');
  const rules = [
    [/^Definir\s+/iu, (rest) => `Define ${rest} con reglas, responsables, excepciones y criterios verificables.`],
    [/^Diseñar\s+/iu, (rest) => `Diseña ${rest}, incluyendo arquitectura, flujo, componentes y límites.`],
    [/^Implementar y desplegar\s+/iu, (rest) => `Implementa y despliega ${rest} de forma controlada, con pruebas y rollback.`],
    [/^Implementar\s+/iu, (rest) => `Implementa ${rest} y verifica integración, compatibilidad y rollback.`],
    [/^Crear\s+/iu, (rest) => `Crea ${rest} como artefacto verificable, con relaciones y aceptación claras.`],
    [/^Validar\s+/iu, (rest) => `Valida ${rest} contra los contratos y escenarios aprobados y registra evidencia.`],
    [/^Verificar\s+/iu, (rest) => `Verifica ${rest}, registra brechas y deja evidencia del resultado.`],
    [/^Probar\s+/iu, (rest) => `Prueba ${rest} en escenarios representativos y registra resultados y defectos reales.`],
    [/^Ejecutar\s+/iu, (rest) => `Ejecuta ${rest} de forma controlada y registra resultado, fallos y evidencia.`],
    [/^Registrar\s+/iu, (rest) => `Registra ${rest} de forma trazable, con decisiones y evidencia.`],
    [/^Aprobar\s+/iu, (rest) => `Aprueba ${rest} solo después de revisar evidencia y bloqueos.`],
    [/^Auditar\s+/iu, (rest) => `Audita ${rest}, identifica brechas y decide cada hallazgo.`],
    [/^Inventariar\s+/iu, (rest) => `Inventaría ${rest} y reconcilia faltantes, duplicados e identidades.`],
    [/^Clasificar\s+/iu, (rest) => `Clasifica ${rest} con una decisión explícita por elemento y excepción.`],
    [/^Documentar\s+/iu, (rest) => `Documenta ${rest} con fuentes, decisiones, límites y evidencia.`],
    [/^Resolver\s+/iu, (rest) => `Resuelve ${rest}, cierra bloqueos y deja una salida verificable.`],
    [/^Preparar\s+/iu, (rest) => `Prepara ${rest} para su ejecución posterior, con dependencias y puertas claras.`],
    [/^Migrar\s+/iu, (rest) => `Migra ${rest} al destino canónico, comprueba paridad y conserva rollback.`],
    [/^Retirar\s+/iu, (rest) => `Retira ${rest} solo después de verificar el reemplazo y el rollback.`],
    [/^Sustituir\s+/iu, (rest) => `Sustituye ${rest} por su alternativa canónica sin romper consumidores.`],
    [/^Consolidar\s+/iu, (rest) => `Consolida ${rest}; establece una fuente canónica y elimina responsabilidades competidoras.`],
    [/^Compartir\s+/iu, (rest) => `Comparte ${rest} mediante una API reutilizable y un propietario claro.`],
    [/^Mantener\s+/iu, (rest) => `Mantiene ${rest} y documenta la frontera que evita acoplamientos.`],
    [/^Permitir\s+/iu, (rest) => `Permite ${rest} bajo condiciones, límites y controles verificables.`],
    [/^Evitar\s+/iu, (rest) => `Evita ${rest} mediante una regla comprobable y una respuesta segura.`],
    [/^Estandarizar\s+/iu, (rest) => `Estandariza ${rest} con una forma común y verificable.`],
    [/^Publicar\s+/iu, (rest) => `Publica ${rest} con versión, trazabilidad y evidencia de entrega.`],
    [/^Configurar\s+/iu, (rest) => `Configura ${rest} con valores, propietarios, validaciones y rollback.`],
    [/^Integrar\s+/iu, (rest) => `Integra ${rest} con sus consumidores y verifica contratos y compatibilidad.`],
    [/^Proteger\s+/iu, (rest) => `Protege ${rest} y verifica denegación segura, auditoría y recuperación.`],
    [/^Certificar\s+/iu, (rest) => `Certifica ${rest} con evidencia de paridad y cumplimiento.`],
    [/^Reconciliar\s+/iu, (rest) => `Reconcilia ${rest} con sus fuentes canónicas y resuelve cada diferencia.`],
    [/^Medir\s+/iu, (rest) => `Mide ${rest} con criterios reproducibles y registra resultados reales.`],
    [/^Revisar\s+/iu, (rest) => `Revisa ${rest}, identifica diferencias y deja decisiones trazables.`],
  ];
  for (const [pattern, formatter] of rules) {
    const match = subject.match(pattern);
    if (match) return formatter(conjugateCoordinatedActions(subject.slice(match[0].length)));
  }
  return `Convierte «${subject}» en una condición verificable, con responsable, evidencia y criterio de cierre.`;
}

function countOccurrences(source, token) {
  return source.split(token).length - 1;
}

export function parseTaskScopeContracts(source, relativePath = '(fuente desconocida)') {
  const startCount = countOccurrences(source, SCOPE_START);
  const endCount = countOccurrences(source, SCOPE_END);
  if (startCount !== endCount) {
    throw new Error(`Contrato de alcance sin cierre válido en ${relativePath}.`);
  }

  const contracts = new Map();
  const blockPattern = new RegExp(`${SCOPE_START}([\\s\\S]*?)${SCOPE_END}`, 'gu');
  const scopeRowStartPattern = new RegExp('^\\|\\s*`' + TASK_ID_PATTERN + '`', 'u');
  const rowPattern = new RegExp(
    '^\\|\\s*`(?<id>' + TASK_ID_PATTERN + ')`\\s*\\|\\s*(?<decides>[^|]+?)\\s*\\|\\s*(?<excludes>[^|]+?)\\s*\\|\\s*(?<handoff>[^|]+?)\\s*\\|\\s*$',
    'u',
  );

  for (const block of source.matchAll(blockPattern)) {
    let rows = 0;
    for (const line of block[1].split('\n')) {
      if (!scopeRowStartPattern.test(line)) continue;
      const match = line.match(rowPattern);
      if (!match?.groups) {
        throw new Error(`Fila de alcance inválida en ${relativePath}: ${line.trim()}`);
      }
      const { id, decides, excludes, handoff } = match.groups;
      if (contracts.has(id)) throw new Error(`Contrato de alcance duplicado para ${id}.`);
      contracts.set(id, {
        decides: decides.trim(),
        excludes: excludes.trim(),
        handoff: handoff.trim(),
      });
      rows += 1;
    }
    if (rows === 0) throw new Error(`Contrato de alcance vacío en ${relativePath}.`);
  }

  return contracts;
}

export function describeTaskScope(task) {
  if (!task.scope) return describePendingTask(task.title);
  return task.scope.decides;
}

function inlineField(block, labels) {
  const pattern = new RegExp(
    `^\\*\\*(?:${labels.join('|')}):\\*\\*\\s*(?<value>.+?)\\s*$`,
    'imu',
  );
  return block.match(pattern)?.groups?.value?.trim() ?? null;
}

function sectionSource(block, titlePattern) {
  const normalized = String(block ?? '').replace(/\r\n?/gu, '\n');
  const headings = [...normalized.matchAll(/^####(?:\s+\d+\.)?\s+(?<title>.+)$/gmu)];
  const index = headings.findIndex((heading) => titlePattern.test(heading.groups.title));
  if (index < 0) return null;
  const start = headings[index].index + headings[index][0].length;
  const end = headings[index + 1]?.index ?? normalized.length;
  return normalized.slice(start, end).trim();
}

function compactText(value, limit = 190) {
  const normalized = String(value ?? '')
    .replace(/[`*_]/gu, '')
    .replace(/^[-+]\s+/gmu, '')
    .replace(/\s+/gu, ' ')
    .trim();
  if (!normalized) return null;
  return normalized.length <= limit ? normalized : `${normalized.slice(0, limit - 1).trimEnd()}…`;
}

function compactMarkdown(value, limit = 190) {
  const normalized = String(value ?? '')
    .replace(/\*\*/gu, '')
    .replace(/^[-+]\s+/gmu, '')
    .replace(/\s+/gu, ' ')
    .trim();
  if (!normalized) return null;
  return normalized.length <= limit ? normalized : `${normalized.slice(0, limit - 1).trimEnd()}…`;
}

function taskReferences(value, selfId) {
  return [...new Set(String(value ?? '').match(TASK_REFERENCE) ?? [])]
    .filter((id) => id !== selfId && !id.startsWith('TREQ-'));
}

function summarizedReferences(references, limit = 6) {
  if (references.length <= limit) return references.map((id) => `\`${id}\``).join(', ');
  return `${references.slice(0, limit).map((id) => `\`${id}\``).join(', ')} (+${references.length - limit})`;
}

export function validationProfileForTask(task) {
  const id = task.id;
  const title = task.title;
  if (/-MIG-/u.test(id) || /\b(?:migrar|retirar|adopci[oó]n|paridad)\b/iu.test(title)) {
    return 'paridad contractual y operativa, build por consumidor, regresión y rollback';
  }
  if (/(?:^|-)(?:AUTH|SEC|RLS)(?:-|$)/u.test(id) || /\b(?:autorizaci[oó]n|permiso|credencial|seguridad|guard)\b/iu.test(title)) {
    return 'contrato, integración, denegaciones, seguridad/RLS y regresión';
  }
  if (/(?:^|-)(?:DB|SUPA)(?:-|$)/u.test(id) || /\b(?:SQL|RPC|base de datos|esquema)\b/iu.test(title)) {
    return 'lint y migración, contratos SQL/RPC, RLS, integración y rollback';
  }
  if (/(?:^|-)(?:UI|UX|SCREEN)(?:-|$)/u.test(id) || /\b(?:pantalla|componente|accesibilidad|responsive|visual|navegaci[oó]n)\b/iu.test(title)) {
    return 'unitarias/render, accesibilidad, regresión visual e integración del flujo';
  }
  if (/(?:^|-)CTX(?:-|$)/u.test(id) || /\b(?:contexto|turno|check-in|frescura|cach[eé]|single-flight)\b/iu.test(title)) {
    return 'contrato contextual, integración, frescura/invalidación, fallos seguros y regresión';
  }
  if (/(?:^|-)(?:NATIVE|CON)(?:-|$)/u.test(id) || /\b(?:contrato|token|tipo|validador|SDK|adapter)\b/iu.test(title)) {
    return 'unitarias y contractuales, compatibilidad, serialización y consumo multiplataforma';
  }
  if (/(?:^|-)CI(?:-|$)/u.test(id) || /\b(?:lint|m[eé]trica|gate|automatizaci[oó]n|pipeline)\b/iu.test(title)) {
    return 'automatización, casos positivos/negativos, build reproducible y regresión del gate';
  }
  if (/(?:^|-)INT(?:-|$)/u.test(id) || /\b(?:evento|webhook|integraci[oó]n|cola|retry|idempotencia)\b/iu.test(title)) {
    return 'contrato, integración, idempotencia/reintentos, fallos parciales y E2E';
  }
  return 'consistencia documental, TREQ y validación funcional proporcional al materializar';
}

export function pendingTaskExecutionContext(task, lifecycle = null, parsedDependencies = null) {
  const dependencyField = inlineField(task.block, [
    'Dependencias para desarrollar',
    'Dependencias de desarrollo',
  ]) ?? inlineField(task.block, ['Dependencias?', 'Prerrequisitos?']);
  const dependencySection = sectionSource(task.block, /Dependencias?|Prerrequisitos?/iu);
  const dependencySource = dependencyField ?? dependencySection;
  const declaredDependencies = parsedDependencies?.development
    ?? taskReferences(dependencySource, task.id);
  let dependencies;
  let dependencyKind;
  if (declaredDependencies.length > 0) {
    dependencies = compactMarkdown(dependencySource) ?? summarizedReferences(declaredDependencies);
    dependencyKind = 'DECLARADAS';
  } else if (dependencySource) {
    dependencies = compactText(dependencySource) ?? 'Declaración sin referencias de tarea.';
    dependencyKind = 'DECLARADAS';
  } else if (task.routePredecessorId) {
    dependencies = `Precedencia de ruta: \`${task.routePredecessorId}\``;
    dependencyKind = 'PRECEDENCIA_DE_RUTA';
  } else {
    dependencies = 'Entrada de la ruta; sin dependencia de tarea declarada todavía.';
    dependencyKind = 'NO_DECLARADA';
  }

  const executionDependencySource = inlineField(task.block, [
    'Dependencias para ejecutar(?: cada instancia)?',
    'Dependencias de ejecución',
  ]);
  const executionDependencies = executionDependencySource
    ? compactMarkdown(executionDependencySource)
    : lifecycle?.executionDependencies ?? 'No hay un ciclo de ejecución posterior declarado.';

  const testSection = sectionSource(task.block, /Requisitos de prueba derivados|Pruebas requeridas|Plan de pruebas/iu);
  const treq = [...new Set(String(testSection ?? '').match(TREQ_REFERENCE) ?? [])];
  const declaredTreqCount = inlineField(task.block, ['Requisitos de prueba creados o modificados']);
  const profile = validationProfileForTask(task);
  let tests;
  if (treq.length > 0) tests = `${summarizedReferences(treq, 4)} · ${profile}`;
  else if (/NO GENERA REQUISITOS DE PRUEBA/iu.test(testSection ?? '') || declaredTreqCount === '0') {
    tests = `Sin TREQ nuevos · ${profile}`;
  } else if (testSection) tests = `Sección canónica de pruebas definida · ${profile}`;
  else tests = `Por definir al desarrollar · perfil previsto: ${profile}`;

  const closureField = inlineField(task.block, [
    'Puerta de cierre del marcador global',
    'Puerta de cierre',
    'Condici[oó]n de cierre',
  ]);
  const instanceClosure = compactText(inlineField(task.block, ['Puerta de cierre de cada instancia']));
  const acceptanceSection = sectionSource(task.block, /Criterios de aceptación|Puerta de cierre|Condici[oó]n de cierre/iu);
  const acceptanceLine = acceptanceSection?.split('\n')
    .map((line) => line.trim())
    .find((line) => line && !/^\||^---|^```/u.test(line));
  const closure = compactText(closureField ?? acceptanceLine)
    ?? 'Se concreta al desarrollar; requiere evidencia real de las pruebas aplicables.';

  return {
    dependencies,
    dependencyKind,
    executionDependencies,
    tests,
    treq,
    closure,
    instanceClosure,
    lifecycleMode: lifecycle?.mode ?? 'SIN_CLASIFICAR',
    lifecycleLabel: lifecycle?.label ?? 'Sin clasificación de ciclo',
    canonicalWork: lifecycle?.canonicalWork ?? 'Desarrollar el contrato canónico una sola vez.',
    executionRule: lifecycle?.executionRule ?? 'No se declaró una regla de repetición.',
    instancePattern: lifecycle?.instancePattern ?? null,
  };
}

function readCanonicalTasks(baseDir) {
  const manifest = JSON.parse(fs.readFileSync(path.join(baseDir, 'manifest.json'), 'utf8'));
  const tasks = [];
  for (const relativePath of manifest.files) {
    const fullPath = path.join(baseDir, relativePath);
    if (!fs.existsSync(fullPath) || !fs.statSync(fullPath).isFile()) continue;
    const rawSource = fs.readFileSync(fullPath, 'utf8').replace(/\r\n?/gu, '\n');
    const source = maskFencedCode(rawSource);
    const scopes = parseTaskScopeContracts(source, relativePath);
    const fileTaskIds = new Set();
    for (const task of parseTaskBlocks(rawSource)) {
      const state = stateFromMarker(task.marker);
      fileTaskIds.add(task.id);
      tasks.push({
        id: task.id,
        title: (task.title || '(sin título canónico)').trim(),
        state,
        relativePath,
        scope: scopes.get(task.id) ?? null,
        block: task.block,
      });
    }
    const orphanScopes = [...scopes.keys()].filter((id) => !fileTaskIds.has(id));
    if (orphanScopes.length > 0) {
      throw new Error(`Contratos de alcance sin tarea canónica en ${relativePath}: ${orphanScopes.join(', ')}.`);
    }
  }
  const ids = tasks.map(({ id }) => id);
  if (new Set(ids).size !== ids.length) throw new Error('Existen tareas canónicas duplicadas.');
  return tasks;
}

function taskIdentity(id) {
  const match = id.match(/^(?<prefix>[A-Z][A-Z0-9]*(?:-[A-Z0-9]+)+)-(?<number>\d{3})$/u);
  if (!match) throw new Error(`Identificador canónico inválido: ${id}.`);
  return { prefix: match.groups.prefix, number: Number(match.groups.number) };
}

export function orderPendingTasksByRoute(tasks, route) {
  const byId = new Map(tasks.map((task) => [task.id, task]));
  const ordered = [];
  const seen = new Set();
  const canonicalOrderById = new Map();
  let canonicalOrder = 0;

  const expandStage = (stage) => {
    const stageTasks = [];
    for (const selector of stage.selectors) {
      let selected;
      if (typeof selector.prefix === 'string') {
        const from = selector.from ?? 1;
        const to = selector.to ?? Number.MAX_SAFE_INTEGER;
        selected = tasks
          .filter(({ id }) => taskIdentity(id).prefix === selector.prefix)
          .filter(({ id }) => {
            const { number } = taskIdentity(id);
            return number >= from && number <= to;
          })
          .sort((left, right) => taskIdentity(left.id).number - taskIdentity(right.id).number);
      } else if (Array.isArray(selector.task_ids)) {
        selected = selector.task_ids.map((id) => {
          const task = byId.get(id);
          if (!task) throw new Error(`La guía referencia una tarea inexistente: ${id}.`);
          return task;
        });
      } else {
        throw new Error(`Selector inválido en ${stage.sequence_id}.`);
      }
      stageTasks.push(...selected);
    }

    return stageTasks;
  };

  const expandedStages = route.stages.map((stage, stageIndex) => ({
    ...stage,
    stageOrder: stageIndex + 1,
    tasks: expandStage(stage),
  }));

  for (const stage of expandedStages) {
    for (const task of stage.tasks) {
      if (canonicalOrderById.has(task.id)) throw new Error(`La guía asigna dos veces ${task.id}.`);
      canonicalOrder += 1;
      canonicalOrderById.set(task.id, canonicalOrder);
    }
  }

  const executionStages = [
    ...expandedStages.filter((stage) => stage.activation_state !== 'DEFERRED'),
    ...expandedStages.filter((stage) => stage.activation_state === 'DEFERRED'),
  ];

  let routePredecessorId = null;
  for (const stage of executionStages) {
    for (const task of stage.tasks) {
      if (seen.has(task.id)) throw new Error(`La guía asigna dos veces ${task.id}.`);
      seen.add(task.id);
      if (task.state !== 'APROBADA') {
        ordered.push({
          ...task,
          routePredecessorId,
          canonicalOrder: canonicalOrderById.get(task.id),
          stageOrder: stage.stageOrder,
          sequenceId: stage.sequence_id,
          blockCode: stage.block_code,
          blockTitle: stage.block_title,
          activationState: stage.activation_state ?? 'ACTIVE',
        });
      }
      routePredecessorId = task.id;
    }
  }

  const missing = tasks.filter(({ id }) => !seen.has(id));
  if (missing.length > 0) {
    throw new Error(`La guía no ubica tareas canónicas: ${missing.map(({ id }) => id).join(', ')}.`);
  }
  return ordered;
}

export function physicalLaneSummary(implementationControl, { limit = 12 } = {}) {
  const instances = Array.isArray(implementationControl?.physical?.instances)
    ? implementationControl.physical.instances
    : [];
  const terminal = new Set(['VERIFIED', 'DEFERRED']);
  const pending = instances.filter(({ status }) => !terminal.has(status));
  const selected = implementationControl?.physical?.active ?? null;
  const queue = selected
    ? [selected, ...pending.filter(({ instanceId }) => instanceId !== selected.instanceId)]
    : pending;
  const counts = {};
  for (const instance of instances) {
    counts[instance.status] = (counts[instance.status] ?? 0) + 1;
  }
  return {
    total: instances.length,
    verified: counts.VERIFIED ?? 0,
    deferred: counts.DEFERRED ?? 0,
    waiting: counts.WAITING_FOR_PREVIOUS_INSTANCE ?? 0,
    remaining: pending.length,
    current: queue[0] ?? null,
    next: queue[1] ?? null,
    queue: queue.slice(0, Math.max(1, Number(limit) || 12)),
    counts,
  };
}

function documentaryLaneSummary(tasks, implementationControl) {
  const currentId = implementationControl?.documentary?.taskId ?? tasks[0]?.id ?? null;
  const currentIndex = tasks.findIndex(({ id }) => id === currentId);
  const current = currentIndex >= 0 ? tasks[currentIndex] : tasks[0] ?? null;
  const next = currentIndex >= 0 ? tasks[currentIndex + 1] ?? null : tasks[1] ?? null;
  return { current, next };
}

function laneCell(value) {
  return String(value ?? '—').replaceAll('|', '\\|').replaceAll('\n', ' ');
}

const CORRECTION_STATUS_PRIORITY = new Map([
  ['IN_PROGRESS', 0],
  ['IMPLEMENTED', 1],
  ['AUTHORIZED', 2],
  ['BLOCKED', 3],
  ['PENDING_AUTHORIZATION', 4],
  ['DEFERRED', 5],
]);

function correctionAction(record) {
  const command = `npm run docs:correction:start -- --correction-id ${record.correction_id}`;
  const finishCommand = `npm run docs:correction:finish -- --correction-id ${record.correction_id}`;
  if (record.status === 'PENDING_AUTHORIZATION') {
    return {
      heading: 'Decide la corrección propuesta',
      action: 'DECIDIR_AUTORIZACIÓN_DE_CORRECCIÓN',
      instruction: 'Revisar el alcance propuesto y aprobarlo o rechazarlo explícitamente; todavía no editar.',
      command: 'NINGUNO_HASTA_APROBADO',
    };
  }
  if (record.status === 'AUTHORIZED') {
    return {
      heading: 'Inicia la corrección autorizada',
      action: 'INICIAR_CORRECCIÓN',
      instruction: 'Abrir la rama gobernada de corrección antes de materializar cualquier cambio.',
      command,
    };
  }
  if (record.status === 'IN_PROGRESS') {
    return {
      heading: 'Termina la corrección abierta',
      action: 'CONTINUAR_CORRECCIÓN',
      instruction: 'Materializar únicamente los cambios autorizados, ejecutar las validaciones en orden y cerrar el lifecycle.',
      command: finishCommand,
    };
  }
  if (record.status === 'IMPLEMENTED') {
    return {
      heading: 'Valida y cierra la corrección implementada',
      action: 'VALIDAR_Y_CERRAR_CORRECCIÓN',
      instruction: 'Ejecutar las validaciones declaradas en orden fail-fast y cerrar solo si todas pasan.',
      command: finishCommand,
    };
  }
  if (record.status === 'BLOCKED') {
    return {
      heading: 'Resuelve la corrección bloqueada',
      action: 'RESOLVER_BLOQUEO_DE_CORRECCIÓN',
      instruction: 'Resolver el bloqueo registrado sin ampliar el alcance autorizado.',
      command: 'SEGÚN_BLOQUEO_REGISTRADO',
    };
  }
  return {
    heading: 'Conserva diferida la corrección',
    action: 'CORRECCIÓN_DIFERIDA',
    instruction: 'No ejecutar hasta que una decisión explícita reactive la corrección.',
    command: 'NINGUNO',
  };
}

export function operationalActionSummary({
  tasks,
  implementationControl,
  correctionControl,
  readiness,
}) {
  const corrections = openCorrections(correctionControl)
    .sort((left, right) => (
      (CORRECTION_STATUS_PRIORITY.get(left.status) ?? Number.MAX_SAFE_INTEGER)
      - (CORRECTION_STATUS_PRIORITY.get(right.status) ?? Number.MAX_SAFE_INTEGER)
      || String(left.opened_at ?? '').localeCompare(String(right.opened_at ?? ''), 'en')
      || left.correction_id.localeCompare(right.correction_id, 'en')
    ));
  const correction = corrections[0] ?? null;
  const documentary = documentaryLaneSummary(tasks, implementationControl).current;
  const packageExecution = readiness?.registry?.package_execution ?? null;
  const packageCurrent = packageExecution?.current ?? null;
  const packageRecord = packageCurrent
    ? readiness.registry.packages.find(({ package_id: packageId }) => packageId === packageCurrent.package_id) ?? null
    : null;
  return {
    correction: correction ? { ...correction, ...correctionAction(correction) } : null,
    openCorrectionCount: corrections.length,
    documentary,
    packageExecution,
    packageCurrent,
    packageRecord,
    physical: physicalLaneSummary(implementationControl).current,
  };
}

function renderCorrectionAction(action) {
  if (!action.correction) {
    return [
      '### 1. Correcciones canónicas',
      '',
      '- **Acción:** ninguna corrección abierta.',
    ];
  }
  const correction = action.correction;
  const authorizedPaths = correction.authorized_changes.length > 0
    ? correction.authorized_changes.map(({ path: authorizedPath, change }) => `  - \`${change}\` \`${authorizedPath}\``)
    : ['  - Ningún cambio autorizado todavía.'];
  const validations = correction.validation_commands.length > 0
    ? correction.validation_commands.map((command) => `  ${correction.validation_commands.indexOf(command) + 1}. \`${command}\``)
    : ['  1. Ninguna validación autorizada todavía.'];
  return [
    `### 1. ${correction.heading} — \`${correction.correction_id}\``,
    '',
    `- **Estado:** \`${correction.status}\``,
    `- **Acción exacta:** \`${correction.action}\``,
    `- **Haz ahora:** ${correction.instruction}`,
    `- **Contrato autorizado:** ${laneCell(correction.authorization?.approval_statement ?? 'PENDIENTE_DE_APROBACIÓN')}`,
    '- **Edita solamente:**',
    ...authorizedPaths,
    '- **Valida, en este orden:**',
    ...validations,
    `- **Comando de lifecycle:** \`${correction.command}\``,
    '- **Regla:** no mezclar esta corrección con documentación nueva, preparación de packages ni código físico en el mismo checkout.',
  ];
}

function renderPackageAction(action) {
  const current = action.packageCurrent;

  if (!current) {
    return [
      '### 2. Preparación de implementación por package',
      '',
      '- **Acción:** la línea de packages está completa o no tiene turno materializado.',
    ];
  }

  const record = action.packageRecord;
  const gates = record?.readiness_progress?.gates ?? null;
  const gateStatus = record?.package_gate?.status
    ?? (record?.source_kind === 'CANONICAL_GAP_PACKAGE' ? 'NOT_PREPARED' : 'N/A');
  const work = current.current_work ?? {
    kind: 'PACKAGE',
    id: current.package_id,
    consumer_package_id: current.package_id,
  };

  if (work.kind === 'FOUNDATION_GATE') {
    return [
      `### 2. Resuelve la fundación que tiene precedencia — \`${work.id}\``,
      '',
      `- **CURRENT_EXECUTABLE_WORK:** \`${work.id}\``,
      `- **Gate:** \`${work.gate_id ?? 'UNKNOWN'}\``,
      `- **Owner canónico:** \`${work.owner_task ?? 'UNKNOWN'}\``,
      `- **Estado:** \`${work.status ?? 'UNKNOWN'}\``,
      `- **Package consumidor bloqueado:** \`${current.package_id}\` — posición **${current.position}/${action.packageExecution.sequence.length}**.`,
      `- **Acción exacta:** \`${current.next_action.type}\``,
      `- **Comando de comprobación:** \`${current.next_action.command}\``,
      `- **Por qué:** ${laneCell(current.next_action.reason)}`,
      '- **Regla:** no autorizar, iniciar, desplegar ni cerrar el package consumidor hasta que esta fundación y las anteriores queden satisfechas.',
    ];
  }

  if (work.kind === 'PHYSICAL_PREREQUISITE') {
    return [
      `### 2. Resuelve el prerrequisito físico que tiene precedencia — \`${work.id}\``,
      '',
      `- **CURRENT_EXECUTABLE_WORK:** \`${work.id}\``,
      `- **Estado:** \`${work.status ?? 'UNKNOWN'}\``,
      `- **Package consumidor bloqueado:** \`${current.package_id}\`.`,
      `- **Acción exacta:** \`${current.next_action.type}\``,
      `- **Comando exacto:** \`${current.next_action.command}\``,
      `- **Por qué:** ${laneCell(current.next_action.reason)}`,
    ];
  }

  return [
    `### 2. Ejecuta el primary de la governed frontier — \`${current.package_id}\``,
    '',
    `- **CURRENT_EXECUTABLE_WORK:** \`${work.id}\``,
    `- **Posición topológica:** **${current.position}/${action.packageExecution.sequence.length}**; prioridad derivada, sin selección humana.`,
    `- **Estado efectivo:** \`${record?.status ?? current.status ?? 'UNKNOWN'}\``,
    `- **Acción exacta:** \`${current.next_action.type}\``,
    `- **Objetivo exacto:** \`${current.next_action.target}\``,
    `- **Comando exacto:** \`${current.next_action.command}\``,
    `- **Expediente package-gate:** \`${record?.package_gate?.relative_path ?? `docs/plan-canonico/modular/package-gate-instances/${current.package_id}.json`}\` — \`${gateStatus}\``,
    `- **Gates:** **${gates?.passed ?? 0}/${gates?.total ?? 0} PASS**; faltan **${gates?.remaining ?? 0}**.`,
    `- **Por qué:** ${laneCell(current.next_action.reason)}`,
    '- **Regla:** preparar o aprobar el expediente no autoriza todavía código, migraciones, despliegues ni cambios remotos.',
  ];
}

function renderDocumentaryAction(action) {
  const documentary = action.documentary;
  if (!documentary) {
    return [
      '### 3. Continúa la documentación canónica',
      '',
      '- **Acción:** la ruta documental está completa.',
    ];
  }
  return [
    `### 3. Continúa la documentación — \`${documentary.id}\``,
    '',
    `- **Tarea exacta:** \`${documentary.id}\` — ${laneCell(documentary.title)}`,
    `- **Haz ahora:** ${laneCell(describeTaskScope(documentary))}`,
    `- **Archivo propietario:** \`${documentary.relativePath}\``,
    '- **Regla:** si corre en paralelo con una corrección o un package, usar checkout independiente y serializar los cierres.',
  ];
}

function renderPhysicalAction(action) {
  if (!action.physical) {
    return [
      '### 4. Implementación física',
      '',
      '- **Acción ahora:** `NO_INICIAR_IMPLEMENTACIÓN_FÍSICA`.',
      '- **Motivo:** no existe una instancia física no terminal registrada por `implementation-control`.',
      '- **Se desbloquea cuando:** el primary frontier package complete su gate, materialice el handoff físico y el usuario apruebe explícitamente la instancia exacta.',
    ];
  }
  return [
    `### 4. Ejecuta la instancia física autorizada — \`${action.physical.instanceId}\``,
    '',
    `- **Estado:** \`${action.physical.status}\``,
    `- **Contrato:** ${laneCell(action.physical.taskTitle)}`,
    `- **Acción exacta del control:** \`${implementationActionLabel(action.physical.status)}\``,
    `- **Registro:** \`${action.physical.recordPath}\``,
  ];
}

function implementationActionLabel(status) {
  if (status === 'PENDING_AUTHORIZATION' || status === 'READY_FOR_AUTHORIZATION') return 'AUTORIZAR_IMPLEMENTACIÓN';
  if (status === 'BLOCKED' || status === 'WAITING_FOR_PREVIOUS_INSTANCE') return 'RESOLVER_BLOQUEO';
  return 'EJECUTAR_IMPLEMENTACIÓN';
}

export function renderOperationalActionCenter(tasks, implementationControl, correctionControl, readiness) {
  const action = operationalActionSummary({
    tasks,
    implementationControl,
    correctionControl,
    readiness,
  });
  const checkoutPriority = action.correction
    ? `terminar \`${action.correction.correction_id}\`; este checkout ya pertenece a esa corrección.`
    : action.packageCurrent
      ? `ejecutar \`${action.packageCurrent.next_action.type}\` sobre \`${action.packageCurrent.next_action.target}\`.`
      : action.documentary
        ? `desarrollar \`${action.documentary.id}\`.`
        : 'no existe trabajo pendiente materializado.';
  return [
    '## 🚦 QUÉ HACER AHORA — SIN INTERPRETAR NI ELEGIR',
    '',
    `> **Prioridad del checkout actual:** ${checkoutPriority}`,
    '>',
    '> Las secciones siguientes son las únicas colas vigentes. Corrección, documentación, preparación de package e implementación física son estados distintos; una no autoriza silenciosamente a la otra.',
    '',
    ...renderCorrectionAction(action),
    '',
    ...renderPackageAction(action),
    '',
    ...renderDocumentaryAction(action),
    '',
    ...renderPhysicalAction(action),
  ];
}

export function renderDualLaneOverview(tasks, route, active, workTopology, implementationControl) {
  const documentary = documentaryLaneSummary(tasks, implementationControl);
  const physical = physicalLaneSummary(implementationControl);
  const totalTasks = Array.isArray(workTopology?.ordered) ? workTopology.ordered.length : tasks.length;
  const approvedTasks = Math.max(0, totalTasks - tasks.length);
  const proposedTasks = tasks.filter(({ state }) => state === 'PROPUESTA PARA APROBACIÓN').length;
  const rejectedTasks = tasks.filter(({ state }) => state === 'RECHAZADA').length;
  const activeTaskId = active.segments?.[0]
    ? `${active.segments[0].prefix}-${String(active.segments[0].from).padStart(3, '0')}`
    : implementationControl?.documentary?.taskId ?? 'NINGUNA';
  const physicalCurrent = physical.current;
  const physicalNext = physical.next;
  const documentaryCurrent = documentary.current;
  const documentaryNext = documentary.next;
  const coordination = implementationControl?.coordination ?? {};
  const physicalRows = physical.queue.length > 0
    ? physical.queue.map((instance, index) => {
      const isCurrent = index === 0 && physicalCurrent?.instanceId === instance.instanceId;
      const condition = isCurrent
        ? `ACTUAL — ${implementationControl.primaryAction.type}`
        : instance.blocker ?? (instance.status === 'READY_FOR_AUTHORIZATION'
          ? 'Elegible cuando corresponda'
          : 'Sin bloqueo adicional declarado');
      return `| ${index + 1} | ${isCurrent ? '**ACTUAL**' : 'PENDIENTE'} | \`${laneCell(instance.instanceId)}\` | ${laneCell(instance.taskTitle)} | \`${laneCell(instance.status)}\` | ${laneCell(condition)} |`;
    })
    : ['| — | — | — | Sin instancia física pendiente conocida | — | — |'];
  return [
    '## Panel de control — dos carriles',
    '',
    '| Carril | Estado | Trabajo actual | Siguiente | Regla |',
    '| --- | --- | --- | --- | --- |',
    `| 🟦 **DOCUMENTACIÓN** | \`${laneCell(implementationControl.documentary.state)}\` | ${documentaryCurrent ? `\`${laneCell(documentaryCurrent.id)}\` — ${laneCell(documentaryCurrent.title)}` : '—'} | ${documentaryNext ? `\`${laneCell(documentaryNext.id)}\` — ${laneCell(documentaryNext.title)}` : 'FIN DE RUTA'} | Una tarea documental activa |`,
    `| 🟧 **IMPLEMENTACIÓN FÍSICA** | ${physicalCurrent ? `\`${laneCell(physicalCurrent.status)}\`` : '`SIN_INSTANCIA_ACTIVA`'} | ${physicalCurrent ? `\`${laneCell(physicalCurrent.instanceId)}\` — ${laneCell(physicalCurrent.taskTitle)}` : '—'} | ${physicalNext ? `\`${laneCell(physicalNext.instanceId)}\`` : 'SIN SIGUIENTE PROYECTADA'} | Una instancia física activa |`,
    '',
    `> Coordinación: \`${laneCell(coordination.mode ?? 'CONTROLLED_DUAL_LANE')}\`. Los carriles pueden avanzar en paralelo en checkouts independientes; los cierres se serializan y el segundo carril reconcilia el \`main\` más reciente antes de cerrar.`,
    '',
    '## Progreso por carril',
    '',
    '| Carril | Completado | Pendiente / restante | Actual |',
    '| --- | ---: | ---: | --- |',
    `| 🟦 **Documentación** | **${approvedTasks}/${totalTasks} aprobadas** | **${tasks.length}** no aprobadas (${proposedTasks} propuesta, ${rejectedTasks} rechazadas) | \`${laneCell(activeTaskId)}\` |`,
    `| 🟧 **Implementación física conocida** | **${physical.verified}/${physical.total} VERIFIED** | **${physical.remaining}** no terminales | ${physicalCurrent ? `\`${laneCell(physicalCurrent.instanceId)}\`` : '—'} |`,
    '',
    `- **Ruta documental activa:** \`${laneCell(active.route_id)}\``,
    `- **Etapa documental:** \`${laneCell(active.sequence_id)}\` — ${laneCell(active.block_title)}`,
    `- **Siguiente etapa documental:** \`${laneCell(active.handoff_sequence_id ?? 'NINGUNA')}\``,
    `- **Acción primaria del control de instancias:** \`${laneCell(implementationControl.primaryAction.type)}\` — \`${laneCell(implementationControl.primaryAction.target)}\``,
    `- **Instancias físicas en espera de predecesora:** **${physical.waiting}**`,
    `- **Cobertura documental de la ruta:** **${route.coverage_policy === 'ALL_CANONICAL_TASKS_EXACTLY_ONCE' ? 'todas las tareas, exactamente una vez' : laneCell(route.coverage_policy)}**`,
    '',
    '### 🟧 Cola física visible',
    '',
    '> Muestra hasta 12 instancias físicas no terminales conocidas por el control. No crea autorizaciones ni materializa instancias futuras por inferencia.',
    '',
    '| # | Posición | Instancia | Contrato | Estado | Condición |',
    '| ---: | --- | --- | --- | --- | --- |',
    ...physicalRows,
  ];
}

function render(tasks, route, active, workTopology, implementationControl, correctionControl, readiness) {
  const stageIds = new Set();
  const stages = tasks.filter((task) => {
    if (stageIds.has(task.sequenceId)) return false;
    stageIds.add(task.sequenceId);
    return true;
  });
  const quickTasks = tasks.slice(0, 12);
  const modeRows = Object.entries(workTopology.counts)
    .sort(([left], [right]) => left.localeCompare(right))
    .map(([mode, count]) => {
      const definition = workTopology.policy.mode_definitions[mode];
      return `| \`${mode}\` | ${definition.label} | ${count} | ${definition.execution_rule} |`;
    });
  const lines = [
    '# VENTO OS — MAPA MAESTRO DE TRABAJO Y CONTINUIDAD',
    '',
    '> Archivo derivado. No editar manualmente.',
    '>',
    '> Vista humana coordinada de correcciones, documentación canónica, preparación por governed frontier de packages e implementación física. El detalle exhaustivo inferior conserva la autoridad estructural utilizada por los validadores.',
    '>',
    '> El marcador documental define contratos; las instancias físicas materializan únicamente lo autorizado. Ningún carril reabre ni sustituye silenciosamente al otro.',
    '',
    ...renderOperationalActionCenter(tasks, implementationControl, correctionControl, readiness),
    '',
    ...renderDualLaneOverview(tasks, route, active, workTopology, implementationControl),
    '',
    '## Modos de trabajo y materialización',
    '',
    '> La topología determina si una definición queda solo como contrato o genera trabajo físico global, por paquete, por unidad o de cierre final. La tabla siguiente sigue siendo descriptiva; la autorización física continúa gobernada por implementation-control.',
    '',
    '| Modo | Significado | Tareas en el plan | Regla contra repetición |',
    '| --- | --- | ---: | --- |',
    ...modeRows,
    '',
    '## 🟦 Carril documental — próximas tareas',
    '',
    '> Esta es la línea documental inmediata. Orienta la lectura sin iniciar ni ampliar tareas; el contrato y el fragmento propietario siguen siendo la autoridad.',
    '',
    '| # | Estado | Tarea | Qué hace |',
    '| ---: | --- | --- | --- |',
    ...quickTasks.map((task, index) => `| ${index + 1} | ${task.id === implementationControl.documentary.taskId ? '**ACTUAL**' : 'PENDIENTE'} | \`${task.id}\` — ${task.title.replaceAll('|', '\\|')} | ${describeTaskScope(task).replaceAll('|', '\\|').replaceAll('\n', ' ')} |`),
    '',
    '## 🟦 Preparación documental — próximas tareas',
    '',
    '> Dependencias, pruebas y cierre se leen de la tarea cuando ya están declarados. "Precedencia de ruta" y "perfil previsto" son ayudas derivadas y no amplían el contrato canónico.',
    '',
    ...quickTasks.flatMap((task, index) => {
      const context = pendingTaskExecutionContext(
        task,
        workTopology.topology.get(task.id),
        workTopology.dependencies.get(task.id),
      );
      return [
        `### ${index + 1}. \`${task.id}\` — ${task.title}`,
        '',
        `- **Qué hace:** ${describeTaskScope(task)}`,
        `- **Trabajo canónico ahora:** ${context.canonicalWork}`,
        `- **Ciclo:** ${context.lifecycleLabel}${context.instancePattern ? ` — \`${context.instancePattern}\`` : ''}`,
        `- **Dependencias para desarrollar:** ${context.dependencies}`,
        `- **Se ejecuta después de:** ${context.executionDependencies}`,
        `- **Regla de repetición:** ${context.executionRule}`,
        `- **Pruebas:** ${context.tests}`,
        `- **Cierre del marcador global:** ${context.closure}`,
        ...(context.instanceClosure ? [`- **Cierre de cada instancia:** ${context.instanceClosure}`] : []),
        `- **Fuente:** \`${task.relativePath}\``,
        '',
      ];
    }),
    '',
    '## Contrato obligatorio para ejecutar cada tarea',
    '',
    'Antes de desarrollar:',
    '',
    '1. consultar la rama canónica vigente y verificar que la fila continúa siendo la tarea actual;',
    '2. leer completa la sección propietaria, sus TREQ, decisiones, dependencias y consumidores;',
    '3. reconciliar el alcance contra el código vigente de todos los repositorios afectados;',
    '4. enumerar cada superficie afectada y asignarle disposición `CREAR`, `MODIFICAR`, `REUTILIZAR`, `RETIRAR`, `SIN_CAMBIO_JUSTIFICADO` o `DIFERIR_A_<TASK-ID>`;',
    '5. declarar archivos exactos, funciones/símbolos, contratos, datos, permisos, integraciones, pruebas y evidencia esperada.',
    '',
    'No puede quedar sin revisar ninguna categoría aplicable:',
    '',
    '- aplicaciones, rutas, layouts, pantallas, componentes, formularios y navegación;',
    '- acciones de usuario, hooks, servicios, adaptadores, consultas, estado local y utilidades;',
    '- Server Actions, API/route handlers, RPC, funciones SQL, triggers, Edge Functions, jobs, cron, colas y webhooks;',
    '- tablas, vistas, relaciones, constraints, RLS, grants, Storage, Realtime, tipos y migraciones;',
    '- eventos, productores, consumidores, idempotencia, retry, compensación y conciliación;',
    '- configuración, variables, secretos, feature flags, observabilidad, logs y alertas;',
    '- pruebas unitarias, contractuales, integración, seguridad, E2E, regresión, dispositivo y operación;',
    '- documentación, capacitación, rollout, rollback, piloto, evidencia y soporte.',
    '',
    'Para cerrar:',
    '',
    '1. cada superficie descubierta debe estar resuelta por esta tarea o vinculada a otra tarea canónica exacta;',
    '2. toda exclusión o diferimiento debe tener justificación, propietario y momento de resolución;',
    '3. deben ejecutarse las validaciones proporcionales y registrarse resultados reales, incluidos los fallos;',
    '4. el compilador, el registro TREQ y la continuidad deben quedar consistentes;',
    '5. el estado solo cambia mediante aprobación explícita; la siguiente fila no se inicia por inferencia.',
    '',
    '**Regla de cero omisiones:** una función, archivo, ruta, objeto de datos o consumidor descubierto sin tarea propietaria bloquea el cierre. Debe incorporarse al alcance actual o asignarse expresamente a una tarea posterior existente; si ninguna existe, se crea primero la tarea canónica faltante y se regenera esta guía.',
    '',
    '## 🟦 Etapas documentales pendientes',
    '',
    '| Orden | Etapa | Bloque | Activación | Primera tarea pendiente |',
    '| ---: | --- | --- | --- | --- |',
    ...stages.map((stage) => `| ${stage.stageOrder} | \`${stage.sequenceId}\` | ${stage.blockCode} — ${stage.blockTitle} | ${stage.activationState} | \`${stage.id}\` |`),
    '',
    '## 🟦 Secuencia documental pendiente exacta — autoridad machine-readable',
    '',
    '> Esta tabla conserva deliberadamente las columnas `Identificador` y `Título canónico`: otros validadores la consumen como autoridad machine-readable. Las etapas `ACTIVE` aparecen primero; las `DEFERRED` permanecen al final sin perderse.',
    '',
    '| Pendiente # | Orden canónico | Etapa | Estado | Identificador | Título canónico | Qué hace | Ciclo | Dependencias para desarrollar | Ejecución posterior | Pruebas / TREQ | Cierre global | Fragmento propietario |',
    '| ---: | ---: | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |',
  ];
  for (const [pendingIndex, task] of tasks.entries()) {
    const esc = (value) => String(value).replaceAll('|', '\\|').replaceAll('\n', ' ');
    const context = pendingTaskExecutionContext(
      task,
      workTopology.topology.get(task.id),
      workTopology.dependencies.get(task.id),
    );
    const cycle = `${context.lifecycleLabel}${context.instancePattern ? ` — \`${context.instancePattern}\`` : ''}`;
    lines.push(`| ${pendingIndex + 1} | ${task.canonicalOrder} | \`${task.sequenceId}\` | ${task.state} | \`${task.id}\` | ${esc(task.title)} | ${esc(describeTaskScope(task))} | ${esc(cycle)} | ${esc(context.dependencies)} | ${esc(context.executionDependencies)} | ${esc(context.tests)} | ${esc(context.closure)} | \`${esc(task.relativePath)}\` |`);
  }
  lines.push('');
  return lines.join('\n');
}

export function syncPendingTaskContext({
  root = process.cwd(),
  check = false,
  readinessResult = null,
} = {}) {
  const baseDir = path.join(root, 'docs/plan-canonico/modular');
  const outputPath = path.join(baseDir, OUTPUT);
  const route = JSON.parse(fs.readFileSync(path.join(baseDir, 'continuity-route.json'), 'utf8'));
  const active = JSON.parse(fs.readFileSync(path.join(baseDir, 'active-sequence.json'), 'utf8'));
  const tasks = orderPendingTasksByRoute(readCanonicalTasks(baseDir), route);
  const workTopology = resolveTaskWorkTopology({ root });
  const implementationControl = deriveImplementationControl({ root, workTopology });
  const correctionControl = loadValidatedCorrectionControl({ root });
  const readiness = readinessResult ?? scanPackageReadiness({
    root,
    check,
    trigger: check ? 'pending-task-context-check' : 'pending-task-context',
    supplied: { skipDerivedReports: true },
  });
  const expected = render(
    tasks,
    route,
    active,
    workTopology,
    implementationControl,
    correctionControl,
    readiness,
  );
  const current = fs.existsSync(outputPath) ? fs.readFileSync(outputPath, 'utf8') : '';
  if (current === expected) return { changed: false };
  if (check) throw new Error('El registro de tareas pendientes con contexto está desactualizado.');
  fs.mkdirSync(path.dirname(outputPath), { recursive: true });
  fs.writeFileSync(outputPath, expected, 'utf8');
  return { changed: true };
}

const isCli = process.argv[1] && path.resolve(process.argv[1]) === fileURLToPath(import.meta.url);
if (isCli) {
  try {
    const result = syncPendingTaskContext({ check: process.argv.includes('--check') });
    console.log(result.changed ? 'OK: contexto de tareas pendientes actualizado.' : 'OK: contexto de tareas pendientes vigente.');
  } catch (error) {
    console.error(`ERROR: ${error.message}`);
    process.exit(1);
  }
}
