import fs from 'node:fs';
import path from 'node:path';
import vm from 'node:vm';

import { parseTaskBlocks } from '../../../scripts/docs/format-canonical-task.mjs';
import { createUiValidatorHarness } from './validator-harness.mjs';

const {
  packageRoot,
  repoRoot,
  requireFromRepo,
  assert,
  includesAll,
  excludesAll,
  sha256,
  assertGitUnchanged,
} = createUiValidatorHarness(import.meta.url);
const ownerPath = path.join(
  repoRoot,
  'docs',
  'plan-canonico',
  'modular',
  'bloques',
  'H_FUNDACION_COMPARTIDA',
  '07_COMPONENTES_WEB_COMPARTIDOS.md',
);
const componentPath = path.join(packageRoot, 'src', 'InterruptedProcessState.tsx');
const cssPath = path.join(packageRoot, 'src', 'interrupted-process-state.css');
const readmePath = path.join(packageRoot, 'README.md');
const packagePath = path.join(packageRoot, 'package.json');
const SOURCE_CONTRACT_SHA256 = '5e6be08a6b380f0e9c8bd6e1e5be601bfc550b330ee8cbf5d639d70732d0752b';
const STATUSES = [
  'NO_CHECKPOINT',
  'DRAFT_ONLY',
  'CHECKPOINT_AVAILABLE',
  'VALIDATING',
  'RESUMABLE',
  'RESUMABLE_WITH_REVIEW',
  'WAITING_FOR_DEPENDENCY',
  'HANDOFF_REQUIRED',
  'REASSIGNMENT_REQUIRED',
  'CONFLICT',
  'RESULT_UNKNOWN',
  'REAUTH_REQUIRED',
  'RECONCILIATION_REQUIRED',
  'SUPERSEDED',
  'COMPLETED',
  'EXPIRED',
  'INVALID',
];
const SUMMARY_FIELDS = [
  'lastProgress',
  'preservedWork',
  'changesSinceInterruption',
  'pendingOrUnknownResults',
  'claimAndCustodySummary',
  'expiryOrDependencySummary',
];
const SLOTS = [
  'PERSISTENT_CONTEXT',
  'BLOCKING_STATE',
  'WORK_IDENTITY',
  'STEP_CONTENT',
  'PRIMARY_ACTION',
  'SECONDARY_SUPPORT',
  'RESULT_AND_RECEIPT',
];

function count(source, value) {
  return source.split(value).length - 1;
}

function statusLiterals(source) {
  const match = source.match(/export type InterruptedProcessStatus =([\s\S]*?);/u);
  assert(match, 'InterruptedProcessStatus declaration not found');
  return [...match[1].matchAll(/'([A-Z_]+)'/gu)].map((entry) => entry[1]);
}

function loadRuntime(source) {
  const ts = requireFromRepo('typescript');
  const compiled = ts.transpileModule(source, {
    compilerOptions: {
      target: ts.ScriptTarget.ES2022,
      module: ts.ModuleKind.CommonJS,
      jsx: ts.JsxEmit.ReactJSX,
      esModuleInterop: true,
    },
    fileName: componentPath,
    reportDiagnostics: true,
  });
  const errors = (compiled.diagnostics ?? []).filter(
    (entry) => entry.category === ts.DiagnosticCategory.Error,
  );
  assert(errors.length === 0, 'InterruptedProcessState transpile diagnostics contain errors');
  const runtimeModule = { exports: {} };
  const localRequire = (specifier) => {
    if (specifier === './interrupted-process-state.css') return {};
    return requireFromRepo(specifier);
  };
  const wrapper = vm.runInThisContext(
    `(function(require,module,exports){${compiled.outputText}\n})`,
    { filename: 'InterruptedProcessState.runtime.cjs' },
  );
  wrapper(localRequire, runtimeModule, runtimeModule.exports);
  return runtimeModule.exports;
}

function render(api, overrides = {}) {
  const React = requireFromRepo('react');
  const { renderToStaticMarkup } = requireFromRepo('react-dom/server');
  const props = {
    status: 'RESUMABLE_WITH_REVIEW',
    ariaLabel: 'Continuidad de trabajo interrumpido',
    persistentContext: React.createElement('p', null, 'Actor y contexto actuales confirmados'),
    workIdentity: React.createElement('h2', null, 'Recepcion OC-2026-00418'),
    interruptionSummary: {
      lastProgress: React.createElement('p', null, 'Ultimo avance confirmado'),
      preservedWork: React.createElement('p', null, 'Trabajo guardado'),
      changesSinceInterruption: React.createElement('p', null, 'Cambios desde la interrupcion'),
      pendingOrUnknownResults: React.createElement('p', null, 'Resultado pendiente'),
      claimAndCustodySummary: React.createElement('p', null, 'Claim y custodia revisados'),
      expiryOrDependencySummary: React.createElement('p', null, 'Vigencia y dependencia revisadas'),
    },
    ...overrides,
  };
  return renderToStaticMarkup(React.createElement(api.InterruptedProcessState, props));
}

function renderAllSlots(api, status = 'RESUMABLE_WITH_REVIEW') {
  const React = requireFromRepo('react');
  return render(api, {
    status,
    blockingState: React.createElement('p', null, 'Bloqueo material'),
    primaryAction: React.createElement('button', { type: 'button' }, 'Revisar antes de continuar'),
    secondarySupport: React.createElement('a', { href: '/support' }, 'Ayuda'),
    resultAndReceipt: React.createElement('p', null, 'Resultado confirmado'),
  });
}

function assertSlotOrder(html) {
  let previous = -1;
  for (const slot of SLOTS) {
    const index = html.indexOf(`data-interrupted-process-slot="${slot}"`);
    assert(index > previous, `semantic slot order mismatch at ${slot}`);
    previous = index;
  }
}

function main() {
  const owner = fs.readFileSync(ownerPath, 'utf8');
  const task = parseTaskBlocks(owner).find((entry) => entry.id === 'SHELL-UI-019');
  const packageJson = JSON.parse(fs.readFileSync(packagePath, 'utf8'));
  const source = fs.readFileSync(componentPath, 'utf8');
  const css = fs.readFileSync(cssPath, 'utf8');
  const readme = fs.readFileSync(readmePath, 'utf8');
  const api = loadRuntime(source);

  assert(task, 'canonical task SHELL-UI-019 not found');
  assert(sha256(task.block) === SOURCE_CONTRACT_SHA256, 'source contract SHA256 mismatch');
  assert(
    packageJson.name === '@vento/ui-web' && packageJson.private === true,
    'private package identity mismatch',
  );
  for (const key of [
    'version',
    'main',
    'types',
    'exports',
    'dependencies',
    'devDependencies',
    'peerDependencies',
    'scripts',
  ]) {
    assert(!(key in packageJson), `package public surface must remain deferred: ${key}`);
  }

  includesAll(
    source,
    [
      'export function InterruptedProcessState',
      'export type InterruptedProcessStateProps',
      'export type InterruptedProcessStatus',
      'export interface InterruptedProcessSummary',
      'status: InterruptedProcessStatus',
      'ariaLabel: string',
      'persistentContext: ReactNode',
      'workIdentity: ReactNode',
      'interruptionSummary: InterruptedProcessSummary',
      'blockingState?: ReactNode',
      'primaryAction?: ReactNode',
      'secondarySupport?: ReactNode',
      'resultAndReceipt?: ReactNode',
      "import './interrupted-process-state.css';",
    ],
    'InterruptedProcessState source',
  );
  assert(
    JSON.stringify(statusLiterals(source)) === JSON.stringify(STATUSES),
    'InterruptedProcessStatus must contain exactly the seventeen canonical statuses in canonical order',
  );
  includesAll(source, SUMMARY_FIELDS, 'InterruptedProcessSummary fields');

  const covered = new Set();
  const cover = (number, assertion) => {
    assertion();
    covered.add(number);
  };

  cover(1, () => {
    for (const status of STATUSES) {
      includesAll(render(api, { status }), [`data-interrupted-process-status="${status}"`], `status ${status}`);
    }
  });
  cover(2, () => excludesAll(source, ['READY_TO_RESUME', 'PAUSED', 'RESTORABLE', 'STALE_DRAFT', 'AUTO_RESUME', 'RETRYABLE_INTERRUPTION'], 'invented status boundary'));
  cover(3, () => excludesAll(source, ['resumeUrl', 'returnTo', 'location.', 'pathname', 'searchParams'], 'URL authority boundary'));
  cover(4, () => excludesAll(source, ['history.', 'popstate', 'pushState', 'replaceState'], 'browser history authority boundary'));
  cover(5, () => excludesAll(source, ['useState(', 'useReducer(', 'useRef(', 'useEffect(', 'useLayoutEffect('], 'React state authority boundary'));
  cover(6, () => excludesAll(source, ['ProcessCheckpoint', 'checkpointId', 'processInstanceId'], 'raw checkpoint boundary'));
  cover(7, () => includesAll(readme, ['BORRADOR != CHECKPOINT != OPERACION PENDIENTE != RECEIPT != ESTADO EMPRESARIAL'], 'state category separation'));
  cover(8, () => includesAll(render(api), ['data-interrupted-process-slot="PERSISTENT_CONTEXT"', 'Actor y contexto actuales confirmados'], 'current persistent context'));
  cover(9, () => includesAll(render(api), ['data-interrupted-process-slot="WORK_IDENTITY"', 'Recepcion OC-2026-00418'], 'work identity'));
  cover(10, () => includesAll(render(api), ['data-interrupted-process-slot="STEP_CONTENT"', 'Ultimo avance confirmado'], 'interruption summary'));
  cover(11, () => {
    const html = renderAllSlots(api);
    assert(count(html, 'data-interrupted-process-slot="PRIMARY_ACTION"') === 1, 'primary action must render at most once');
    assertSlotOrder(html);
  });
  cover(12, () => {
    assert(!render(api, { status: 'VALIDATING' }).includes('data-interrupted-process-slot="PRIMARY_ACTION"'), 'VALIDATING must not manufacture a continuation action');
    includesAll(readme, ['`VALIDATING` mantiene la continuacion empresarial ausente'], 'VALIDATING documentation');
  });
  cover(13, () => {
    assert(!render(api, { status: 'CHECKPOINT_AVAILABLE' }).includes('data-interrupted-process-slot="PRIMARY_ACTION"'), 'CHECKPOINT_AVAILABLE must not manufacture a continuation action');
    includesAll(readme, ['`CHECKPOINT_AVAILABLE` informa un punto todavia no validado'], 'CHECKPOINT_AVAILABLE documentation');
  });
  cover(14, () => includesAll(readme, ['`RESUMABLE` solo llega despues de elegibilidad externa completa'], 'RESUMABLE eligibility'));
  cover(15, () => {
    includesAll(render(api, { status: 'RESUMABLE_WITH_REVIEW' }), ['data-interrupted-summary-field="CHANGES_SINCE_INTERRUPTION"', 'Cambios desde la interrupcion'], 'review changes');
    includesAll(readme, ['`RESUMABLE_WITH_REVIEW` conserva cambios visibles'], 'review documentation');
  });
  cover(16, () => includesAll(readme, ['no aplica `last write wins`'], 'last write wins boundary'));
  cover(17, () => includesAll(readme, ['`WAITING_FOR_DEPENDENCY`'], 'dependency presentation'));
  cover(18, () => includesAll(readme, ['Un handoff requerido no equivale a handoff aceptado'], 'handoff ownership'));
  cover(19, () => includesAll(readme, ['`REASSIGNMENT_REQUIRED`'], 'reassignment presentation'));
  cover(20, () => includesAll(readme, ['`CONFLICT`'], 'conflict presentation'));
  cover(21, () => {
    excludesAll(source, ['retry(', 'retryPolicy', 'canRetry', 'setTimeout(', 'setInterval('], 'blind retry boundary');
    includesAll(readme, ['`RESULT_UNKNOWN` bloquea retry ciego'], 'unknown result documentation');
  });
  cover(22, () => includesAll(readme, ['`REAUTH_REQUIRED`', 'reautorizacion'], 'reauth boundary'));
  cover(23, () => includesAll(readme, ['`RECONCILIATION_REQUIRED`'], 'reconciliation presentation'));
  cover(24, () => includesAll(readme, ['`SUPERSEDED`', 'no convierten el punto anterior en reanudable'], 'superseded boundary'));
  cover(25, () => includesAll(readme, ['`COMPLETED`', 'no convierten el punto anterior en reanudable'], 'completed boundary'));
  cover(26, () => includesAll(readme, ['`EXPIRED`', 'no convierten el punto anterior en reanudable'], 'expired boundary'));
  cover(27, () => includesAll(readme, ['`INVALID`', 'fallback visual'], 'invalid fallback boundary'));
  cover(28, () => includesAll(render(api), ['data-interrupted-summary-field="LAST_PROGRESS"', 'Ultimo avance confirmado'], 'last progress'));
  cover(29, () => includesAll(render(api), ['data-interrupted-summary-field="PRESERVED_WORK"', 'Trabajo guardado'], 'preserved work'));
  cover(30, () => includesAll(readme, ['El copy ordinario usa lenguaje humano de trabajo'], 'human changes language'));
  cover(31, () => includesAll(readme, ['UI019 no renueva, libera, toma ni fuerza ownership'], 'claim validity boundary'));
  cover(32, () => includesAll(readme, ['La custodia no se infiere de una pantalla abierta'], 'custody inference boundary'));
  cover(33, () => includesAll(readme, ['Cambiar actor no transfiere borrador'], 'actor draft boundary'));
  cover(34, () => includesAll(readme, ['Cambiar actor no transfiere borrador, claim'], 'actor claim boundary'));
  cover(35, () => includesAll(readme, ['Cambiar actor no transfiere borrador, claim, custodia ni autoridad'], 'actor authority boundary'));
  cover(36, () => includesAll(readme, ['Cambiar sede, area, turno, check-in', 'exige una resolucion externa nueva'], 'context change boundary'));
  cover(37, () => includesAll(readme, ['cambio de dispositivo no promete disponibilidad de datos local-only'], 'device change boundary'));
  cover(38, () => includesAll(readme, ['reinicio, background, recarga o actualizacion no ejecuta operaciones pendientes automaticamente'], 'restart pending operation boundary'));
  cover(39, () => includesAll(readme, ['ni restaura autoridad stale'], 'update stale authority boundary'));
  cover(40, () => includesAll(readme, ['Acciones sensibles vuelven a validar estado actual y reautorizacion'], 'sensitive action reauthorization'));
  cover(41, () => {
    assert(!source.includes("from './SensitiveActionConfirmation'"), 'SensitiveActionConfirmation must remain externally composed');
    includesAll(readme, ['`SensitiveActionConfirmation` conserva confirmacion proporcional'], 'sensitive confirmation boundary');
  });
  cover(42, () => includesAll(readme, ['`RESULT_UNKNOWN` bloquea retry ciego'], 'unknown result owner'));
  cover(43, () => {
    assert(!source.includes("from './RecoverableErrorState'"), 'RecoverableErrorState must remain externally composed');
    includesAll(readme, ['`RecoverableErrorState` recuperacion de fallos observados'], 'recoverable error boundary');
  });
  cover(44, () => {
    assert(!source.includes("from './ContextDiagnostic'"), 'ContextDiagnostic must remain externally composed');
    includesAll(readme, ['`ContextDiagnostic` conserva diagnostico contextual'], 'context diagnostic boundary');
  });
  cover(45, () => assert(!source.includes("from './TaskNavigation'"), 'TaskNavigation must remain externally composed'));
  cover(46, () => assert(!source.includes("from './ProcessStatusLine'"), 'ProcessStatusLine must remain externally composed'));
  cover(47, () => assert(!source.includes("from './TabletTaskSurface'"), 'TabletTaskSurface must remain externally composed'));
  cover(48, () => assert(!source.includes("from './KioskTaskSurface'"), 'KioskTaskSurface must remain externally composed'));
  cover(49, () => includesAll(readme, ['`SHELL-UI-020` conserva handoff cross-app'], 'cross-app handoff boundary'));
  cover(50, () => {
    excludesAll(source, ['deepLink', 'deep-link', 'resumeUrl', 'returnTo'], 'deep link authority boundary');
    includesAll(readme, ['UI019 no crea deep links ni transporta autoridad entre aplicaciones'], 'deep link documentation');
  });
  cover(51, () => includesAll(readme, ['Un archivo local no equivale a evidencia vinculada'], 'local file evidence separation'));
  cover(52, () => includesAll(readme, ['comando de periferico no equivale a ejecucion fisica confirmada'], 'peripheral command separation'));
  cover(53, () => includesAll(readme, ['lotes reconstruidos no vuelven a promover elementos ya confirmados como pendientes'], 'batch reconstruction boundary'));
  cover(54, () => includesAll(readme, ['En dispositivo compartido la lista recuperable se filtra por actor'], 'shared device privacy'));
  cover(55, () => includesAll(readme, ['datos privados del actor anterior'], 'previous actor checkpoint privacy'));
  cover(56, () => {
    excludesAll(source, ['setTimeout(', 'setInterval(', 'Date.now(', 'expiresAt'], 'authoritative timer boundary');
    includesAll(readme, ['UI019 no usa timers autoritativos'], 'retention timer boundary');
  });
  cover(57, () => includesAll(readme, ['Cerrar la superficie no descarta trabajo'], 'close without discard'));
  cover(58, () => includesAll(readme, ['guardar para despues no congela autoridad'], 'save later authority boundary'));
  cover(59, () => {
    excludesAll(source, ['HTTP 409', 'stale cache', 'idempotency lookup', 'lease heartbeat timeout'], 'infrastructure copy boundary');
    includesAll(readme, ['lenguaje humano de trabajo y no codigos de infraestructura'], 'human language documentation');
  });
  cover(60, () => excludesAll(source, ['role="application"', "role: 'application'"], 'role application boundary'));
  cover(61, () => excludesAll(source, ['aria-live', 'ariaLive'], 'universal live region boundary'));
  cover(62, () => {
    excludesAll(source, ['autoFocus', '.focus(', 'activeElement'], 'focus stealing boundary');
    includesAll(css, [':focus-visible', 'scroll-margin-block: 1rem;'], 'focus reachability');
  });
  cover(63, () => excludesAll(source, ['onKeyDown', 'onKeyUp', 'tabIndex={0}', 'focusTrap'], 'keyboard trap boundary'));
  cover(64, () => includesAll(css, ['min-inline-size: max(3rem, 48px);', 'min-block-size: max(3rem, 48px);'], 'touch target'));
  cover(65, () => includesAll(render(api), ['<section', 'aria-label="Continuidad de trabajo interrumpido"'], 'screen reader naming'));
  cover(66, () => {
    includesAll(css, ['min-width: 0;', 'max-width: 100%;', 'overflow-wrap: anywhere;'], 'reflow CSS');
    excludesAll(css, ['overflow: hidden;', 'white-space: nowrap;', 'text-overflow: ellipsis;', 'height: 100vh;'], 'zoom clipping boundary');
  });
  cover(67, () => excludesAll(css, ['overflow-x: auto;', 'overflow-x: scroll;'], 'horizontal scroll boundary'));
  cover(68, () => excludesAll(source, ['@vento/supabase', '@supabase/', '.from(', '.rpc(', '.storage', '.auth'], 'Supabase boundary'));
  cover(69, () => excludesAll(source, ['localStorage', 'sessionStorage', 'indexedDB', 'ServiceWorker', 'serviceWorker', 'queue', 'Queue'], 'storage queue service worker boundary'));
  cover(70, () => {
    assert(!/^[\s]*['"]use client['"];?/mu.test(source), 'component must remain server-safe');
    assert(renderAllSlots(api).includes('Resultado confirmado'), 'server render failed');
  });
  cover(71, () => includesAll(readme, ['SHELL', 'NEXO', 'FOGO', 'ORIGO', 'VISO', 'PULSO', 'NUMERA', '7/7'], 'seven consumer decisions'));
  cover(72, () => includesAll(readme, ['Faltantes: 0', 'Duplicados: 0'], 'consumer matrix completeness'));
  cover(73, () => includesAll(readme, ['migracion posterior permanece reversible', 'rollback'], 'reversible migration'));
  cover(74, () => includesAll(readme, ['recarga, background, reinicio, perdida de energia'], 'reload background restart power tests'));
  cover(75, () => includesAll(readme, ['expiracion, revocacion, cambio de actor'], 'expiry revocation actor tests'));
  cover(76, () => includesAll(readme, ['cambio de area, cambio de dispositivo'], 'area device tests'));
  cover(77, () => includesAll(readme, ['claim tomado, recurso cambiado'], 'claim resource tests'));
  cover(78, () => includesAll(readme, ['resultado desconocido'], 'unknown result tests'));
  cover(79, () => includesAll(readme, ['esquema anterior'], 'previous schema tests'));
  cover(80, () => includesAll(readme, ['archivo local, periferico incierto'], 'file peripheral tests'));
  cover(81, () => includesAll(readme, ['handoff, custodia'], 'handoff custody tests'));
  cover(82, () => includesAll(readme, ['lotes parciales, concurrencia entre dispositivos'], 'partial batch concurrency tests'));
  cover(83, () => includesAll(readme, ['accesibilidad y privacidad'], 'accessibility privacy tests'));

  includesAll(source, SLOTS.map((slot) => `data-interrupted-process-slot="${slot}"`), 'semantic slots');
  includesAll(source, [
    'data-interrupted-summary-field={field}',
    "['LAST_PROGRESS', 'lastProgress']",
    "['PRESERVED_WORK', 'preservedWork']",
    "['CHANGES_SINCE_INTERRUPTION', 'changesSinceInterruption']",
    "['PENDING_OR_UNKNOWN_RESULTS', 'pendingOrUnknownResults']",
    "['CLAIM_AND_CUSTODY', 'claimAndCustodySummary']",
    "['EXPIRY_OR_DEPENDENCY', 'expiryOrDependencySummary']",
  ], 'summary projection');
  excludesAll(
    source,
    [
      'checkpointId',
      'processInstanceId',
      'actorId',
      'principalId',
      'deviceId',
      'contextId',
      'siteId',
      'areaId',
      'shiftId',
      'checkinId',
      'claimId',
      'custodyRef',
      'draftRef',
      'pendingOperationIds',
      'permissionCode',
      'roleCode',
      'idempotencyKey',
      'receiptId',
      'resourceVersion',
      'canResume',
      'isAuthorized',
      'resumeUrl',
      'returnTo',
      'window.',
      'document.',
      'localStorage',
      'sessionStorage',
      'fetch(',
      'XMLHttpRequest',
      'WebSocket',
      'navigator.',
    ],
    'forbidden ownership surface',
  );
  excludesAll(css, ['transition:', 'animation:', '@keyframes', ':hover'], 'motion and hover boundary');

  includesAll(
    readme,
    [
      'SHELL-UI-019::GLOBAL',
      'InterruptedProcessState',
      'INTERRUPTED-PROCESS-PRESENTATION-CONTRACT-001',
      ...STATUSES.map((status) => `\`${status}\``),
      ...SUMMARY_FIELDS.map((field) => `\`${field}\``),
      'PERSISTENT_CONTEXT',
      'BLOCKING_STATE',
      'WORK_IDENTITY',
      'STEP_CONTENT',
      'PRIMARY_ACTION',
      'SECONDARY_SUPPORT',
      'RESULT_AND_RECEIPT',
      'ELEGIBILIDAD_CONDICIONADA_A_REANUDACION_RESUELTA',
      'CANDIDATO_OPERATIVO_PARA_REANUDACION',
      'CANDIDATO_ADMINISTRATIVO_PARA_REANUDACION_CONTROLADA',
      'Consumidores migrados por UI019: 0/7',
      'Cambios Supabase por UI019: 0',
      'TAREA ACTUAL APROBADA: `SHELL-UI-019`',
      'SIGUIENTE TAREA RESERVADA: `SHELL-UI-020`',
    ],
    'README UI019 materialization',
  );

  assert(covered.size === 83, `expected 83 covered scenarios; got ${covered.size}`);

  assertGitUnchanged([
    'package.json',
    'package-lock.json',
    'packages/ui-web/package.json',
    'packages/ui-web/src/Alert.tsx',
    'packages/ui-web/src/alert.css',
    'packages/ui-web/src/Button.tsx',
    'packages/ui-web/src/button.css',
    'packages/ui-web/src/Card.tsx',
    'packages/ui-web/src/card.css',
    'packages/ui-web/src/EmptyState.tsx',
    'packages/ui-web/src/empty-state.css',
    'packages/ui-web/src/ContextIndicator.tsx',
    'packages/ui-web/src/context-indicator.css',
    'packages/ui-web/src/SiteSelector.tsx',
    'packages/ui-web/src/site-selector.css',
    'packages/ui-web/src/AreaSelector.tsx',
    'packages/ui-web/src/area-selector.css',
    'packages/ui-web/src/SimulatedRoleNotice.tsx',
    'packages/ui-web/src/simulated-role-notice.css',
    'packages/ui-web/src/AppShell.tsx',
    'packages/ui-web/src/app-shell.css',
    'packages/ui-web/src/TaskNavigation.tsx',
    'packages/ui-web/src/task-navigation.css',
    'packages/ui-web/src/ProcessStatusLine.tsx',
    'packages/ui-web/src/process-status-line.css',
    'packages/ui-web/src/PrimaryActionPanel.tsx',
    'packages/ui-web/src/primary-action-panel.css',
    'packages/ui-web/src/SensitiveActionConfirmation.tsx',
    'packages/ui-web/src/sensitive-action-confirmation.css',
    'packages/ui-web/src/ContextDiagnostic.tsx',
    'packages/ui-web/src/context-diagnostic.css',
    'packages/ui-web/src/RecoverableErrorState.tsx',
    'packages/ui-web/src/recoverable-error-state.css',
    'packages/ui-web/scripts/validate-recoverable-error-state.mjs',
    'packages/ui-web/src/TabletTaskSurface.tsx',
    'packages/ui-web/src/tablet-task-surface.css',
    'packages/ui-web/scripts/validate-tablet-task-surface.mjs',
    'packages/ui-web/src/KioskTaskSurface.tsx',
    'packages/ui-web/src/kiosk-task-surface.css',
    'packages/ui-web/scripts/validate-kiosk-task-surface.mjs',
    'src/components/ui',
    'templates/app-shell-standard',
    'packages/contracts',
    'packages/os-context',
    'packages/supabase',
  ]);

  console.log(
    'PASS: SHELL-UI-019 InterruptedProcessState validated; '
      + 'scenarios=83 statuses=17 summaries=6 slots=7 ssr=SAFE authority=NONE '
      + 'checkpoint=EXTERNAL retry=EXTERNAL consumers=0/7 exports=DEFERRED',
  );
}

main();
