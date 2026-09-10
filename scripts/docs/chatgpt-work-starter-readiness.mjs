import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

import { scanPackageReadiness } from './package-readiness-scanner.mjs';
import { coordinateImplementationStatus } from './implementation-readiness-coordinator.mjs';
import { buildChatgptWorkStarter as buildBaseChatgptWorkStarter } from './chatgpt-work-starter.mjs';

const TEMPLATE_PATH = 'docs/plan-canonico/modular/chatgpt-work-starter-template.txt';
const SLOT = '{{CURRENT_WORK}}';

export const CHATGPT_STARTER_PATHS = Object.freeze({
  selector: 'INICIADOR_VENTO_ACTUAL.txt',
  documentation: '.delivery/INICIADOR_VENTO_DOCUMENTACION.txt',
  implementation: '.delivery/INICIADOR_VENTO_IMPLEMENTACION.txt',
});

function firstReady(registry) {
  const execution = registry?.package_execution ?? null;
  const authorization = execution?.authorization_frontier?.[0] ?? null;
  const current = execution?.current ?? null;
  const candidate = authorization
    ?? (current?.next_action?.type === 'AUTHORIZE_PHYSICAL_IMPLEMENTATION' ? current : null);
  if (!candidate) return null;

  return registry?.implementation_ready_queue?.find(
    ({ package_id: packageId }) => packageId === candidate.package_id,
  ) ?? null;
}

function queueLines(registry) {
  const execution = registry?.package_execution ?? null;
  const current = execution?.current ?? null;
  const active = execution?.active_physical ?? [];
  const authorization = execution?.authorization_frontier ?? [];
  const waiting = execution?.waiting ?? [];

  if (!current) {
    return `- PRIMARY: NONE
- ACTIVE_PHYSICAL: ${active.length}
- AUTHORIZATION_FRONTIER: ${authorization.length}
- WAITING: ${waiting.length}`;
  }

  const work = execution.current_work ?? current.current_work ?? {
    kind: 'PACKAGE',
    id: current.package_id,
  };

  return `- PRIMARY ${current.position}/${execution.sequence.length}: ${current.package_id} -> ${current.next_action.type} -> ${current.next_action.target} | CURRENT_EXECUTABLE_WORK=${work.kind}:${work.id}
- FRONTIER: ${execution.frontier?.length ?? 0}
- SCHEDULABLE_FRONTIER: ${execution.schedulable_frontier?.length ?? 0}
- AUTHORIZATION_FRONTIER: ${authorization.length}
- ACTIVE_PHYSICAL: ${active.length}
- WAITING: ${waiting.length}
${active.map((entry) => `- ACTIVE ${entry.package_id}: ${entry.phase ?? 'UNKNOWN'} -> ${entry.next_action?.target ?? 'NONE'} | LOCKS=${entry.resource_locks?.length ?? 0}`).join('\n') || '- ACTIVE_ITEMS: NONE'}`;
}

function packageGateLifecycleBlock(readiness) {
  const packages = readiness?.registry?.packages ?? [];
  const execution = readiness?.registry?.package_execution ?? null;
  const current = execution?.current ?? null;
  const work = execution?.current_work ?? current?.current_work ?? null;
  const focused = current
    ? packages.find(({ package_id: packageId }) => packageId === current.package_id) ?? null
    : null;
  const packageId = current?.package_id ?? 'NONE';
  const gate = focused?.package_gate ?? null;
  const file = gate?.relative_path ?? (packageId === 'NONE'
    ? 'NONE'
    : `docs/plan-canonico/modular/package-gate-instances/${packageId}.json`);
  const next = current?.next_action?.command ?? 'NONE';
  const admission = (execution?.physical_admission ?? [])
    .find(({ package_id: candidateId }) => candidateId === packageId) ?? null;

  return `PACKAGE GATE LIFECYCLE — VALIDACIÓN OBLIGATORIA

Cada package canónico usa un expediente autogenerado y versionado. El ingreso normal es docs:package:start, que abre o reanuda la rama exacta del primary derivado; no cree el JSON manualmente.
Los gates EVIDENCE_023, PHYSICAL_IDENTITY, IMPLEMENTATION_UNIT y FINAL_DECISION_025 solo pasan cuando el expediente está completo y contiene APROBADO humano explícito.
La aprobación del expediente no autoriza implementación física. docs:package:finish puede publicar un gate ya madurado; el handoff PENDING_AUTHORIZATION solo se materializa cuando la admisión física es ADMISSIBLE.
La prioridad se deriva automáticamente de dependencias explícitas, capa y package_id. Un WAITING conserva posición y evidencia, pero no monopoliza roots independientes.
Los packages en ACTIVE_PHYSICAL conservan su lifecycle y resource locks aplicables. CI020/CI021 retienen locks de transición; CI022/CI023/CI024 conservan locks exactos sin convertir piloto/hypercare en mutex global.
Si el orden o las dependencias contradicen un contrato aprobado, abra una corrección de DELIV-PKG-015. Mientras esa corrección bloqueante no quede VERIFIED en main, las mutaciones de package permanecen bloqueadas.

- Modo: ${execution?.mode ?? 'NOT_EVALUATED'}
- Selección humana de package: FALSE
- Estado frontier: ${execution?.state ?? 'NOT_EVALUATED'}
- Primary package: ${packageId}
- CURRENT_EXECUTABLE_WORK: ${work?.id ?? packageId}
- CURRENT_EXECUTABLE_WORK_KIND: ${work?.kind ?? 'PACKAGE'}
- BLOCKED_CONSUMER_PACKAGE: ${work?.kind && work.kind !== 'PACKAGE' ? packageId : 'NONE'}
- PHYSICAL_ADMISSION: ${admission?.status ?? 'UNKNOWN'}
- FOUNDATION_GATE: ${work?.gate_id ?? 'N/A'}
- FOUNDATION_OWNER: ${work?.owner_task ?? 'N/A'}
- FRONTIER_COUNT: ${execution?.frontier?.length ?? 0}
- SCHEDULABLE_FRONTIER_COUNT: ${execution?.schedulable_frontier?.length ?? 0}
- AUTHORIZATION_FRONTIER_COUNT: ${execution?.authorization_frontier?.length ?? 0}
- ACTIVE_PHYSICAL_COUNT: ${execution?.active_physical?.length ?? 0}
- WAITING_COUNT: ${execution?.waiting?.length ?? 0}
- Posición topológica primary: ${current ? `${current.position}/${execution.sequence.length}` : 'NONE'}
- Acción exacta: ${current?.next_action?.type ?? 'NONE'}
- Objetivo exacto: ${current?.next_action?.target ?? 'NONE'}
- Expediente exacto: ${file}
- Estado del expediente: ${gate?.status ?? 'NOT_PREPARED'}
- Siguiente comando: ${next}

Comprobaciones obligatorias:
- npm run docs:package:gate:check
- npm run docs:package:execution:check
- npm run docs:plan:build
- npm run docs:plan:check
- npm run docs:plan:test

Nunca ejecute docs:package:gate:approve por inferencia. La aprobación exige APROBADO explícito, dueño competente y evidencia trazable; ningún package se elige manualmente.`;
}

export function stableReadinessStarterProjection(block) {
  return String(block ?? '').replace(/^TRIGGER: .*$/mu, 'TRIGGER: STARTER_PROJECTION');
}

export function renderReadinessStarterBlock({ readiness, lane, coordinated = null }) {
  const candidate = firstReady(readiness.registry);
  const laneRule = lane === 'DOCUMENTATION'
    ? 'Conservar esta conversación en DOCUMENTATION. NO cambiar de carril; informar primary, waiting y active physical.'
    : lane === 'PHYSICAL_IMPLEMENTATION'
      ? 'Ejecutar únicamente el primary derivado o una instancia exacta ya ACTIVE_PHYSICAL/AUTHORIZED; IMPLEMENTATION_READY no equivale a AUTHORIZED.'
      : 'Nunca elegir packages por intuición: consumir primary, authorization frontier y active physical set derivados.';
  const candidateBlock = candidate
    ? `\nPACKAGE IMPLEMENTABLE DETECTED
- Package: ${candidate.package_id}
- Gate: ${candidate.gate_id} = PASS
- Blockers: 0
- Next execution: ${candidate.next_execution}
- Physical authorization required: TRUE`
    : '';
  const coordinatedBlock = coordinated?.readinessCandidate
    ? `\nCOORDINATED PHYSICAL CANDIDATE
- Status: READY_FOR_AUTHORIZATION
- Instance: ${coordinated.readinessCandidate.instanceId}
- Source: PACKAGE_EXECUTION_GOVERNED_FRONTIER
- Authorization required: TRUE
- No implementation instance is authorized by this projection.`
    : '';
  const readinessProjection = stableReadinessStarterProjection(readiness.block);

  return `PACKAGE READINESS SCANNER — OBLIGATORIO

Antes de determinar la siguiente acción y después del cierre de cada tarea, el estado debe haber pasado por PACKAGE READINESS SCAN.
Toda condición PASS exige evidencia trazable. Evidencia ausente produce UNKNOWN para el gate afectado; no autoriza ejecución ni concede un bypass.
DELIV-PKG-001..025 y E5-GATE-008 son contratos globales reutilizables; no se reejecutan cronológicamente por cada package.
IMPLEMENTATION_READY requiere package_id, dossier DELIV-PKG, E5-GATE-008::<package_id>, cero bloqueadores y dependencias físicas disponibles.
La governed frontier mantiene dependencias duras, prioridad determinista y admisión física fail-closed; los waits locales no monopolizan roots independientes.
${laneRule}

${packageGateLifecycleBlock(readiness)}

PACKAGE_EXECUTION_GOVERNED_FRONTIER — PRIMARY + ACTIVE SET:
${queueLines(readiness.registry)}${candidateBlock}${coordinatedBlock}

${readinessProjection}`;
}

export function injectReadinessIntoSources({ baseResult, readiness, coordinated }) {
  const selectorBlock = renderReadinessStarterBlock({ readiness, lane: 'SELECTOR', coordinated });
  const documentationBlock = renderReadinessStarterBlock({ readiness, lane: 'DOCUMENTATION', coordinated });
  const implementationBlock = renderReadinessStarterBlock({ readiness, lane: 'PHYSICAL_IMPLEMENTATION', coordinated });
  const append = (source, block) => `${source.replace(/\n*$/u, '')}\n\n${block}\n`;
  const afterLaneLock = (source, block) => {
    const marker = 'DO_NOT_SWITCH_LANES: TRUE';
    const index = source.indexOf(marker);
    if (index < 0) return append(source, block);
    const insertion = index + marker.length;
    return `${source.slice(0, insertion)}\n\n${block}${source.slice(insertion)}`.replace(/\n*$/u, '\n');
  };

  const source = append(baseResult.source, selectorBlock);
  const documentationSource = afterLaneLock(baseResult.documentationSource, documentationBlock);
  const implementationSource = afterLaneLock(baseResult.implementationSource, implementationBlock);

  return {
    ...baseResult,
    source,
    documentationSource,
    implementationSource,
    readiness,
    coordinated,
    outputs: Object.freeze([
      { key: 'selector', relativePath: CHATGPT_STARTER_PATHS.selector, source },
      {
        key: 'documentation',
        relativePath: CHATGPT_STARTER_PATHS.documentation,
        source: documentationSource,
      },
      {
        key: 'implementation',
        relativePath: CHATGPT_STARTER_PATHS.implementation,
        source: implementationSource,
      },
    ]),
  };
}

function renderFromTemplate(template, currentWork, intent) {
  const documentationOnlyPattern = /<!-- DOCUMENTATION_ONLY:START -->([\s\S]*?)<!-- DOCUMENTATION_ONLY:END -->/u;
  const scopedTemplate = intent === 'DOCUMENTATION'
    ? template.replace(documentationOnlyPattern, '$1')
    : template.replace(documentationOnlyPattern, '');
  return scopedTemplate.replace(SLOT, currentWork).replace(/\n*$/u, '\n');
}

function terminalFallback({ root, readiness }) {
  const execution = readiness.registry?.package_execution ?? null;
  const current = execution?.current ?? null;
  const currentWork = execution?.current_work ?? current?.current_work ?? null;
  const candidate = firstReady(readiness.registry);
  const active = execution?.active_physical ?? [];

  if (!current && active.length === 0) {
    throw new Error(
      'No existe continuidad documental, primary package ni active physical set para construir un iniciador terminal.',
    );
  }

  const template = fs.readFileSync(
    path.join(root, ...TEMPLATE_PATH.split('/')),
    'utf8',
  ).replace(/\r\n?/gu, '\n');
  if (template.split(SLOT).length !== 2) {
    throw new Error(`${TEMPLATE_PATH} debe contener exactamente una ranura ${SLOT}.`);
  }

  const selector = `VENTO OS — SELECTOR DE INICIADOR POR INTENCIÓN

DOCUMENTATION_QUEUE: EMPTY
PACKAGE_EXECUTION_PRIMARY: ${current?.package_id ?? 'NONE'}
CURRENT_EXECUTABLE_WORK: ${currentWork?.id ?? current?.package_id ?? 'NONE'}
CURRENT_EXECUTABLE_WORK_KIND: ${currentWork?.kind ?? 'PACKAGE'}
ACTIVE_PHYSICAL_COUNT: ${active.length}
PACKAGE_EXECUTION_ACTION: ${current?.next_action?.type ?? 'NONE'}
NEXT: ${current?.next_action?.target ?? 'NONE'}
HUMAN_PACKAGE_SELECTION: FALSE
`;

  const documentationCurrent = `INTENT_LOCK: DOCUMENTATION
CONVERSATION_LANE: DOCUMENTARY
DO_NOT_SWITCH_LANES: TRUE

DOCUMENTATION_QUEUE = EMPTY

No inventes una tarea documental ni elijas packages. El estado físico se deriva de la governed frontier.

${renderReadinessStarterBlock({ readiness, lane: 'DOCUMENTATION' })}`;

  const implementationCurrent = `INTENT_LOCK: PHYSICAL_IMPLEMENTATION
CONVERSATION_LANE: PHYSICAL
DO_NOT_SWITCH_LANES: TRUE

PACKAGE EXECUTION GOVERNED FRONTIER
- Primary package: ${current?.package_id ?? 'NONE'}
- Position: ${current ? `${current.position}/${execution.sequence.length}` : 'NONE'}
- Action: ${current?.next_action?.type ?? 'NONE'}
- Target: ${current?.next_action?.target ?? 'NONE'}
- Command: ${current?.next_action?.command ?? 'NONE'}
- Active physical count: ${active.length}
- Authorization frontier count: ${execution?.authorization_frontier?.length ?? 0}
- PHYSICAL_AUTHORIZATION_REQUIRED: ${candidate ? 'TRUE' : 'AS_PROJECTED_PER_INSTANCE'}

${candidate
    ? 'No ejecutes docs:implementation:start ni crees AUTHORIZED hasta APROBADO humano del alcance exacto.'
    : 'No selecciones packages manualmente. Sigue el primary o la instancia física exacta proyectada.'}

${renderReadinessStarterBlock({ readiness, lane: 'PHYSICAL_IMPLEMENTATION' })}`;

  return {
    control: null,
    source: selector,
    documentationSource: renderFromTemplate(template, documentationCurrent, 'DOCUMENTATION'),
    implementationSource: renderFromTemplate(
      template,
      implementationCurrent,
      'PHYSICAL_IMPLEMENTATION',
    ),
  };
}

export function buildReadinessChatgptWorkStarter({
  root = process.cwd(),
  readinessResult = null,
  baseResult = null,
  baseControl = null,
} = {}) {
  const repositoryRoot = path.resolve(root);
  const readiness = readinessResult ?? scanPackageReadiness({
    root: repositoryRoot,
    check: true,
    trigger: 'chatgpt-starter',
  });

  let resolvedBase = baseResult;
  if (!resolvedBase) {
    try {
      resolvedBase = buildBaseChatgptWorkStarter({ root: repositoryRoot });
    } catch (error) {
      const execution = readiness.registry?.package_execution ?? null;
      if (!execution?.current && (execution?.active_physical?.length ?? 0) === 0) throw error;
      resolvedBase = terminalFallback({ root: repositoryRoot, readiness });
    }
  }

  const control = baseControl ?? resolvedBase.control ?? {
    primaryAction: {
      type: 'DOCUMENTAR_TAREA',
      target: 'NONE',
      title: 'Sin tarea documental',
      instruction: '',
      why: '',
    },
    physical: { active: null, activeSet: [] },
  };
  const coordinated = coordinateImplementationStatus({
    baseControl: control,
    registry: readiness.registry,
  });

  return injectReadinessIntoSources({
    baseResult: resolvedBase,
    readiness,
    coordinated,
  });
}

export function writeReadinessChatgptWorkStarter({
  root = process.cwd(),
  check = false,
  readinessResult = null,
} = {}) {
  const repositoryRoot = path.resolve(root);
  const result = buildReadinessChatgptWorkStarter({
    root: repositoryRoot,
    readinessResult,
  });
  const changes = [];

  for (const output of result.outputs) {
    const outputPath = path.join(repositoryRoot, ...output.relativePath.split('/'));
    const current = fs.existsSync(outputPath) ? fs.readFileSync(outputPath, 'utf8') : '';
    const changed = current !== output.source;
    changes.push({ ...output, outputPath, changed });

    if (check && changed && fs.existsSync(outputPath)) {
      throw new Error(
        `${output.relativePath} está desactualizado; ejecute npm run docs:chatgpt:starter.`,
      );
    }
    if (!check && changed) {
      fs.mkdirSync(path.dirname(outputPath), { recursive: true });
      fs.writeFileSync(outputPath, output.source, 'utf8');
    }
  }

  return {
    ...result,
    changed: changes.some((entry) => entry.changed),
    changes,
  };
}

function main() {
  const unknown = process.argv.slice(2).filter((argument) => argument !== '--check');
  if (unknown.length > 0) {
    throw new Error(`argumentos desconocidos: ${unknown.join(', ')}.`);
  }

  const result = writeReadinessChatgptWorkStarter({
    check: process.argv.includes('--check'),
  });
  console.log(
    `OK: iniciadores ChatGPT + package readiness ${result.changed ? 'actualizados' : 'vigentes'}.`,
  );
  console.log(`DOCUMENTATION: ${CHATGPT_STARTER_PATHS.documentation}`);
  console.log(`PHYSICAL_IMPLEMENTATION: ${CHATGPT_STARTER_PATHS.implementation}`);
  console.log(`SELECTOR_LEGACY: ${CHATGPT_STARTER_PATHS.selector}`);
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
