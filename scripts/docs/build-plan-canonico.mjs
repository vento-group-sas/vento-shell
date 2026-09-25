function terminalSafeText(value) {
  const replacements = new Map([
    ['\u279c', '->'],
    ['\u2192', '->'],
    ['\u2705', 'PASS'],
    ['\u274c', 'FAIL'],
    ['\u23f3', 'WAIT'],
    ['\u21bb', 'RETRY'],
    ['\u25b6', '>'],
    ['\u2014', '-'],
    ['\u2013', '-'],
    ['\u201c', '"'],
    ['\u201d', '"'],
    ['\u2018', "'"],
    ['\u2019', "'"],
  ]);
  let source = String(value ?? '');
  for (const [symbol, replacement] of replacements) {
    source = source.replaceAll(symbol, replacement);
  }
  return source
    .normalize('NFKD')
    .replace(/\p{M}/gu, '')
    .replace(/[^\x09\x0A\x0D\x20-\x7E]/gu, '?');
}

function installTerminalSafeConsole() {
  for (const level of ['log', 'warn', 'error']) {
    const original = console[level].bind(console);
    console[level] = (...args) => original(
      ...args.map((value) => typeof value === 'string' ? terminalSafeText(value) : value),
    );
  }
}

installTerminalSafeConsole();

const root = process.cwd();

try {
  const { syncPlanContinuity } = await import('./plan-continuity-final-newline.mjs');
  const {
    deriveImplementationControl,
    ensurePendingImplementationRecord,
  } = await import('./implementation-control.mjs');
  syncPlanContinuity({ root, checkOnly: false });
  const preBuildControl = deriveImplementationControl({ root });
  ensurePendingImplementationRecord({ root, control: preBuildControl });
} catch (error) {
  console.error('[PLAN CAN\u00d3NICO] Preparaci\u00f3n f\u00edsica previa a compilaci\u00f3n bloqueada:');
  console.error(error instanceof Error ? error.message : String(error));
  process.exit(1);
}

try {
  await import('./safe-build-plan-canonico.mjs');
} catch (error) {
  console.error('[PLAN CAN\u00d3NICO] Validaci\u00f3n bloqueada:');
  console.error(error instanceof Error ? error.message : String(error));
  process.exit(1);
}

const { syncPendingTaskContext } = await import('./sync-pending-task-context.mjs');
syncPendingTaskContext();

let readinessResult;
let implementationControl;
try {
  const { scanPackageReadiness } = await import('./package-readiness-scanner.mjs');
  const { writeImplementationControlArtifacts } = await import('./implementation-control.mjs');
  const { writeReadinessChatgptWorkStarter: writeChatgptWorkStarter } = await import('./chatgpt-work-starter-readiness.mjs');
  const { writeCorrectionStarter } = await import('./correction-starter.mjs');

  readinessResult = scanPackageReadiness({ root, write: true, trigger: 'plan-build' });
  implementationControl = writeImplementationControlArtifacts({ root }).control;
  writeChatgptWorkStarter({ root, readinessResult });
  writeCorrectionStarter({ root });
} catch (error) {
  console.error('[PACKAGE READINESS] Compilaci\u00f3n bloqueada:');
  console.error(error instanceof Error ? error.message : String(error));
  process.exit(1);
}

try {
  const path = await import('node:path');
  const { derivePreflight } = await import('./canonical-task-preflight.mjs');
  const { prepareImplementationReadinessArtifacts } = await import('./implementation-readiness-artifacts.mjs');
  const { writeCurrentTaskDevelopmentArtifacts } = await import('./task-development-artifacts.mjs');
  const { writePlanWatchStatus } = await import('./plan-watch-runtime.mjs');
  const completedAt = new Date().toISOString();

  writePlanWatchStatus(path.join(root, '.delivery', 'plan-status.md'), {
    state: 'COMPILACI\u00d3N COMPLETADA',
    pid: null,
    startedAt: completedAt,
    updatedAt: completedAt,
    result: 'OK',
    reason: 'docs:plan:build',
    message: 'Fuentes can\u00f3nicas compiladas, contexto pendiente sincronizado y PACKAGE READINESS SCAN actualizado.',
    preflight: derivePreflight({ root }),
    implementationControl,
  });
  writeCurrentTaskDevelopmentArtifacts({ root, buildSucceeded: true });
  prepareImplementationReadinessArtifacts({ root, write: true });
  console.log(
    `[PLAN CAN\u00d3NICO] \u279c ACCI\u00d3N PRINCIPAL: ${implementationControl.primaryAction.type} `
    + `${implementationControl.primaryAction.target}`,
  );
  console.log(`[PACKAGE READINESS] packages listos: ${readinessResult.registry.implementation_ready_queue.length}.`);
  if (readinessResult.registry.implementation_ready_queue.length > 0) {
    const first = readinessResult.registry.implementation_ready_queue[0];
    console.log(`[PACKAGE READINESS] siguiente candidato: ${first.next_execution}; autorizacion fisica requerida.`);
  }
  console.log('[PLAN CAN\u00d3NICO]   Iniciador documental: .delivery/INICIADOR_VENTO_DOCUMENTACION.txt');
  console.log('[PLAN CAN\u00d3NICO]   Iniciador implementaci\u00f3n: .delivery/INICIADOR_VENTO_IMPLEMENTACION.txt');
  console.log('[PLAN CAN\u00d3NICO]   Iniciador correcci\u00f3n: .delivery/INICIADOR_VENTO_CORRECCION.txt');
  console.log('[PLAN CAN\u00d3NICO]   Selector legacy: INICIADOR_VENTO_ACTUAL.txt');
} catch (error) {
  console.warn(
    `[PLAN CAN\u00d3NICO] No se pudieron actualizar todos los artefactos locales no cr\u00edticos: ${error instanceof Error ? error.message : String(error)}`,
  );
}
