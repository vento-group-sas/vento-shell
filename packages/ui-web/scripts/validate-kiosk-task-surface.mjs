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
const componentPath = path.join(packageRoot, 'src', 'KioskTaskSurface.tsx');
const cssPath = path.join(packageRoot, 'src', 'kiosk-task-surface.css');
const readmePath = path.join(packageRoot, 'README.md');
const packagePath = path.join(packageRoot, 'package.json');
const SOURCE_CONTRACT_SHA256 = '28f2fbb6d9dac0ea9eb83ab222847b551c73ccc6884b9750744018005cc0f3dd';
const SURFACE_CLASS = 'FIXED_KIOSK';
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
  assert(errors.length === 0, 'KioskTaskSurface transpile diagnostics contain errors');
  const runtimeModule = { exports: {} };
  const localRequire = (specifier) => {
    if (specifier === './kiosk-task-surface.css') return {};
    return requireFromRepo(specifier);
  };
  const wrapper = vm.runInThisContext(
    `(function(require,module,exports){${compiled.outputText}\n})`,
    { filename: 'KioskTaskSurface.runtime.cjs' },
  );
  wrapper(localRequire, runtimeModule, runtimeModule.exports);
  return runtimeModule.exports;
}

function render(api, overrides = {}) {
  const React = requireFromRepo('react');
  const { renderToStaticMarkup } = requireFromRepo('react-dom/server');
  const props = {
    surfaceClass: 'FIXED_KIOSK',
    ariaLabel: 'Preparacion en estacion fija',
    persistentContext: React.createElement('p', null, 'Estacion, actor y contexto confirmados'),
    workIdentity: React.createElement('h2', null, 'Trabajo 184'),
    stepContent: React.createElement('div', null, 'Verifica el paso actual'),
    ...overrides,
  };
  return renderToStaticMarkup(React.createElement(api.KioskTaskSurface, props));
}

function renderAllSlots(api) {
  const React = requireFromRepo('react');
  return render(api, {
    blockingState: React.createElement('p', null, 'Bloqueo material'),
    primaryAction: React.createElement('button', { type: 'button' }, 'Confirmar'),
    secondarySupport: React.createElement('a', { href: '/support' }, 'Ayuda'),
    resultAndReceipt: React.createElement('p', null, 'Resultado confirmado'),
  });
}

function assertSlotOrder(html) {
  let previous = -1;
  for (const slot of SLOTS) {
    const index = html.indexOf(`data-kiosk-slot="${slot}"`);
    assert(index > previous, `semantic slot order mismatch at ${slot}`);
    previous = index;
  }
}

function main() {
  const owner = fs.readFileSync(ownerPath, 'utf8');
  const task = parseTaskBlocks(owner).find((entry) => entry.id === 'SHELL-UI-018');
  const packageJson = JSON.parse(fs.readFileSync(packagePath, 'utf8'));
  const source = fs.readFileSync(componentPath, 'utf8');
  const css = fs.readFileSync(cssPath, 'utf8');
  const readme = fs.readFileSync(readmePath, 'utf8');
  const api = loadRuntime(source);

  assert(task, 'canonical task SHELL-UI-018 not found');
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
      'export function KioskTaskSurface',
      'export type KioskTaskSurfaceProps',
      "surfaceClass: 'FIXED_KIOSK'",
      'ariaLabel: string',
      'persistentContext: ReactNode',
      'blockingState?: ReactNode',
      'workIdentity: ReactNode',
      'stepContent: ReactNode',
      'primaryAction?: ReactNode',
      'secondarySupport?: ReactNode',
      'resultAndReceipt?: ReactNode',
      "import './kiosk-task-surface.css';",
    ],
    'KioskTaskSurface source',
  );

  const covered = new Set();
  const cover = (number, assertion) => {
    assertion();
    covered.add(number);
  };

  cover(1, () => includesAll(render(api), ['data-surface-class="FIXED_KIOSK"'], 'fixed kiosk'));
  cover(2, () => excludesAll(source, ["'PERSONAL_TABLET'", "'SHARED_TABLET'"], 'tablet class boundary'));
  cover(3, () => excludesAll(source, ['userAgent', 'navigator.', 'maxTouchPoints', 'ontouchstart'], 'device detection boundary'));
  cover(4, () => {
    excludesAll(source, ['requestFullscreen', 'fullscreenElement', 'webkitRequestFullscreen'], 'fullscreen security boundary');
    includesAll(readme, ['Fullscreen no es una frontera de seguridad'], 'fullscreen documentation');
  });
  cover(5, () => {
    excludesAll(source, ['display-mode', 'standalone', 'navigator.standalone'], 'PWA security boundary');
    includesAll(readme, ['PWA standalone no es modo kiosco seguro'], 'PWA documentation');
  });
  cover(6, () => assertSlotOrder(renderAllSlots(api)));
  cover(7, () => includesAll(render(api), ['data-kiosk-slot="PERSISTENT_CONTEXT"', 'Estacion, actor y contexto confirmados'], 'persistent context'));
  cover(8, () => includesAll(render(api), ['data-kiosk-slot="WORK_IDENTITY"', 'Trabajo 184'], 'work identity'));
  cover(9, () => includesAll(render(api), ['data-kiosk-slot="STEP_CONTENT"', 'Verifica el paso actual'], 'step content'));
  cover(10, () => assert(count(renderAllSlots(api), 'data-kiosk-slot="PRIMARY_ACTION"') === 1, 'primary action must render at most once'));
  cover(11, () => assert(!render(api).includes('data-kiosk-slot="PRIMARY_ACTION"'), 'primary action must be absent when not supplied'));
  cover(12, () => includesAll(render(api), ['Estacion, actor y contexto confirmados'], 'human station context'));
  cover(13, () => {
    excludesAll(source, ['deviceId', 'stationId', 'actorId'], 'device and human actor separation');
    includesAll(readme, ['`FIXED_KIOSK` identifica una clase de superficie ya resuelta y no un actor humano'], 'actor separation documentation');
  });
  cover(14, () => includesAll(readme, ['sede fijada al dispositivo no se convierte en sede activa', 'area permitida no se convierte en contexto operativo'], 'station restriction boundary'));
  cover(15, () => includesAll(readme, ['una aplicacion permitida no equivale a permiso empresarial'], 'allowed application boundary'));
  cover(16, () => includesAll(readme, ['Cuando una mutacion exige actor humano', 'actor valido'], 'human actor requirement'));
  cover(17, () => includesAll(readme, ['sesion vigente y revalidacion de servidor'], 'standard actor session revalidation'));
  cover(18, () => includesAll(readme, ['un PIN ligero no satisface reautenticacion fuerte'], 'strong reauth boundary'));
  cover(19, () => includesAll(readme, ['`NOT_ALLOWED` no se degrada a lectura parcial'], 'not allowed boundary'));
  cover(20, () => includesAll(readme, ['El cambio de actor no hereda autoridad'], 'actor authority cleanup'));
  cover(21, () => includesAll(readme, ['borrador personal'], 'actor draft cleanup'));
  cover(22, () => includesAll(readme, ['limpiar datos del actor anterior'], 'previous actor privacy cleanup'));
  cover(23, () => excludesAll(source, ['password', 'otp', 'accessToken', 'refreshToken', 'credential'], 'credential API boundary'));
  cover(24, () => excludesAll(source, ['maintenancePin', 'adminToken', 'maintenanceSecret'], 'maintenance secret boundary'));
  cover(25, () => {
    excludesAll(source, ['wifi', 'enrollment', 'certificate', 'debugConsole', 'mdm'], 'technical administration boundary');
    includesAll(readme, ['no administra el sistema operativo'], 'technical administration documentation');
  });
  cover(26, () => includesAll(readme, ['La arquitectura host conserva una via autorizada de mantenimiento'], 'maintenance architecture'));
  cover(27, () => includesAll(readme, ['fuera de `PRIMARY_ACTION`'], 'maintenance primary action boundary'));
  cover(28, () => includesAll(readme, ['fuera de `SECONDARY_SUPPORT` ordinario'], 'maintenance secondary support boundary'));
  cover(29, () => includesAll(readme, ['No depende de una URL libre'], 'maintenance URL boundary'));
  cover(30, () => includesAll(readme, ['un secreto embebido'], 'embedded maintenance secret boundary'));
  cover(31, () => includesAll(readme, ['El tecnico permanece separado del actor empresarial'], 'technician actor boundary'));
  cover(32, () => includesAll(readme, ['heredar autoridad administrativa'], 'maintenance return boundary'));
  cover(33, () => includesAll(readme, ['Las aplicaciones permitidas se limitan externamente'], 'allowed applications external policy'));
  cover(34, () => {
    excludesAll(source, ['history.back', 'location.assign', 'window.open', 'launchApp'], 'system navigation boundary');
    includesAll(readme, ['La navegacion del sistema'], 'system navigation documentation');
  });
  cover(35, () => includesAll(readme, ['allowlist de enlaces externos'], 'external link allowlist'));
  cover(36, () => includesAll(readme, ['Una navegacion externa no declara trabajo completado'], 'external navigation result boundary'));
  cover(37, () => excludesAll(source, ['showSaveFilePicker', 'FileSystemHandle', 'downloadEnabled', 'createObjectURL'], 'local file persistence boundary'));
  cover(38, () => includesAll(readme, ['exportar permanece separado de visualizar o persistir localmente'], 'export boundary'));
  cover(39, () => {
    excludesAll(source, ['clipboardEnabled', 'navigator.clipboard'], 'clipboard API boundary');
    includesAll(readme, ['portapapeles', 'Credenciales, tokens y secretos'], 'clipboard and secret documentation');
  });
  cover(40, () => includesAll(readme, ['`D0_FOCUSED` o `D1_CONTEXTUAL`'], 'ordinary kiosk density'));
  cover(41, () => includesAll(readme, ['`D2_COMPARATIVE` es excepcional y limitado'], 'comparative density'));
  cover(42, () => includesAll(readme, ['`D3_ANALYTICAL` y `D4_SPECIALIZED` permanecen fuera'], 'dense administration boundary'));
  cover(43, () => includesAll(css, ['min-inline-size: max(3rem, 48px);', 'min-block-size: max(3rem, 48px);'], 'preferred touch target'));
  cover(44, () => {
    assert(count(css, '48px') >= 2, 'touch target must preserve a 48px floor');
    includesAll(readme, ['piso web de 24 x 24 CSS px'], 'web touch floor documentation');
  });
  cover(45, () => includesAll(css, ['gap: 1rem;'], 'non-overlapping hit area spacing'));
  cover(46, () => includesAll(readme, ['acciones incompatibles conservan distancia suficiente'], 'incompatible action separation'));
  cover(47, () => excludesAll(css, ['transition:', 'animation:', '@keyframes'], 'under-finger stability boundary'));
  cover(48, () => excludesAll(source, ['onDoubleClick', 'execute(', 'mutate(', 'submitMutation'], 'business duplicate activation boundary'));
  cover(49, () => excludesAll(source, ['orientation', 'screen.orientation', 'matchMedia('], 'orientation authority boundary'));
  cover(50, () => {
    includesAll(css, ['min-width: 0;', 'max-width: 100%;', 'overflow-wrap: anywhere;'], 'reflow CSS');
    excludesAll(css, ['overflow: hidden;', 'white-space: nowrap;', 'text-overflow: ellipsis;', 'height: 100vh;'], 'zoom clipping boundary');
  });
  cover(51, () => excludesAll(css, ['overflow-x: auto;', 'overflow-x: scroll;'], 'horizontal scroll boundary'));
  cover(52, () => assert(!css.includes(':hover'), 'hover must not be required'));
  cover(53, () => excludesAll(source, ['swipe', 'touchmove', 'touchstart', 'touchend', 'onLongPress', 'pinch', 'gesture'], 'hidden gesture boundary'));
  cover(54, () => {
    includesAll(render(api), ['<section', 'aria-label="Preparacion en estacion fija"'], 'screen reader surface naming');
    includesAll(css, [':focus-visible', 'scroll-margin-block: 1rem;'], 'focus reachability');
  });
  cover(55, () => includesAll(readme, ['la contencion del sistema nunca se simula rompiendo accesibilidad'], 'kiosk accessibility boundary'));
  cover(56, () => includesAll(readme, ['La captura favorece valores estructurados'], 'structured capture'));
  cover(57, () => includesAll(readme, ['El host mantiene estado y alternativa'], 'peripheral state and alternative'));
  cover(58, () => includesAll(readme, ['Capacidad, comando, recepcion, ejecucion fisica y resultado verificado'], 'peripheral command/result separation'));
  cover(59, () => {
    excludesAll(source, ['setTimeout(', 'setInterval(', 'retry(', 'retryPolicy', 'canRetry'], 'blind retry boundary');
    includesAll(readme, ['un timeout de periferico no autoriza retry ciego'], 'peripheral timeout documentation');
  });
  cover(60, () => includesAll(readme, ['Conectividad, frescura y ultimo punto confirmado', 'permanecen perceptibles'], 'connectivity presentation'));
  cover(61, () => includesAll(readme, ['no se ejecutan mutaciones empresariales sin conectividad verificable'], 'shared device connectivity mutation boundary'));
  cover(62, () => includesAll(readme, ['cache no es autorizacion'], 'cache authority boundary'));
  cover(63, () => includesAll(readme, ['stale no se presenta como actual'], 'stale freshness boundary'));
  cover(64, () => {
    excludesAll(source, ['addEventListener(', 'removeEventListener(', 'reconnect', 'navigator.onLine'], 'reconnection ownership boundary');
    includesAll(readme, ['reconectar exige revalidacion propietaria'], 'reconnection documentation');
  });
  cover(65, () => includesAll(readme, ['Un borrador local no se presenta como confirmacion de servidor'], 'local draft result boundary'));
  cover(66, () => includesAll(readme, ['dispositivo esta revocado, inactivo o incompatible', 'mutaciones ordinarias permanecen bloqueadas'], 'device blocking'));
  cover(67, () => assert(!source.includes("from './ContextDiagnostic'"), 'ContextDiagnostic must remain externally composed'));
  cover(68, () => assert(!source.includes("from './RecoverableErrorState'"), 'RecoverableErrorState must remain externally composed'));
  cover(69, () => assert(!source.includes("from './EmptyState'"), 'EmptyState must remain externally composed'));
  cover(70, () => {
    assert(!source.includes("from './Alert'"), 'Alert must remain externally composed');
    includesAll(readme, ['`Alert`', 'conservan sus contratos propietarios'], 'alert composition boundary');
  });
  cover(71, () => {
    assert(!source.includes("from './SensitiveActionConfirmation'"), 'SensitiveActionConfirmation must remain externally composed');
    includesAll(css, ['ui-kiosk-task-surface__action-rail', 'gap: 1rem;'], 'sensitive action ergonomic separation');
  });
  cover(72, () => {
    assert(!source.includes("from './SimulatedRoleNotice'"), 'SimulatedRoleNotice must remain externally composed');
    includesAll(readme, ['`SimulatedRoleNotice`'], 'simulation composition boundary');
  });
  cover(73, () => includesAll(readme, ['La privacidad frente a terceros se resuelve mediante minimizacion'], 'shared screen privacy'));
  cover(74, () => includesAll(readme, ['La inactividad detiene nuevas mutaciones', 'sin borrar silenciosamente trabajo'], 'inactivity boundary'));
  cover(75, () => includesAll(readme, ['`SHELL-UI-019` conserva checkpoint, reconstruccion y reanudacion'], 'interrupted process boundary'));
  cover(76, () => includesAll(readme, ['`SHELL-UI-020` conserva handoff cross-app'], 'cross-app handoff boundary'));
  cover(77, () => excludesAll(source, ['@vento/supabase', '@supabase/', '.from(', '.rpc(', '.storage', '.auth'], 'Supabase boundary'));
  cover(78, () => {
    assert(!/^[\s]*['"]use client['"];?/mu.test(source), 'component must remain server-safe');
    assert(renderAllSlots(api).includes('Resultado confirmado'), 'server render failed');
  });
  cover(79, () => includesAll(readme, ['SHELL', 'NEXO', 'FOGO', 'ORIGO', 'VISO', 'PULSO', 'NUMERA', '7/7'], 'seven consumer decisions'));
  cover(80, () => includesAll(readme, ['Faltantes: 0', 'Duplicados: 0'], 'consumer matrix completeness'));
  cover(81, () => includesAll(readme, ['migracion posterior permanece reversible', 'rollback'], 'reversible migration handoff'));
  cover(82, () => includesAll(readme, ['estacion representativa del kiosco real', 'antes de despliegue amplio'], 'representative physical station validation'));

  includesAll(source, [`surfaceClass: '${SURFACE_CLASS}'`], 'surface class');
  includesAll(source, SLOTS.map((slot) => `data-kiosk-slot="${slot}"`), 'semantic slots');
  excludesAll(
    source,
    [
      'deviceId',
      'stationId',
      'actorId',
      'permissionCode',
      'roleCode',
      'siteId',
      'areaId',
      'shiftId',
      'checkinId',
      'canOperate',
      'canExecute',
      'isAuthorized',
      'isKioskMode',
      'isManaged',
      'isLockedDown',
      'allowedApps',
      'allowedDomains',
      'clipboardEnabled',
      'downloadEnabled',
      'maintenancePin',
      'adminToken',
      'userAgent',
      'window.',
      'document.',
      'localStorage',
      'sessionStorage',
      'fetch(',
      'XMLHttpRequest',
      'WebSocket',
    ],
    'forbidden ownership surface',
  );

  includesAll(
    readme,
    [
      'SHELL-UI-018::GLOBAL',
      'KioskTaskSurface',
      'KIOSK-TASK-SURFACE-CONTRACT-001',
      'FIXED_KIOSK',
      'PERSISTENT_CONTEXT',
      'BLOCKING_STATE',
      'WORK_IDENTITY',
      'STEP_CONTENT',
      'PRIMARY_ACTION',
      'SECONDARY_SUPPORT',
      'RESULT_AND_RECEIPT',
      'ELEGIBILIDAD_KIOSCO_CONDICIONADA_A_SUPERFICIE_Y_HOST_GOBERNADOS',
      'CANDIDATO_KIOSCO_BODEGA',
      'ELEGIBILIDAD_KIOSCO_CONDICIONADA_A_PROCESO_ESTACION_Y_SEGURIDAD',
      'ELEGIBILIDAD_KIOSCO_SOLO_PARA_SUPERFICIE_D0_D1_APROBADA',
      'ELEGIBILIDAD_KIOSCO_CONDICIONADA_A_PRIVACIDAD_PERIFERICOS_Y_PROCESO',
      'Consumidores migrados por UI018: 0/7',
      'Cambios Supabase por UI018: 0',
    ],
    'README UI018 materialization',
  );

  assert(covered.size === 82, `expected 82 covered scenarios; got ${covered.size}`);

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
    'src/components/ui',
    'templates/app-shell-standard',
    'packages/contracts',
    'packages/os-context',
    'packages/supabase',
  ]);

  console.log(
    'PASS: SHELL-UI-018 KioskTaskSurface validated; '
      + 'scenarios=82 classes=1 slots=7 ssr=SAFE authority=NONE '
      + 'device_detection=NONE maintenance=EXTERNAL consumers=0/7 exports=DEFERRED',
  );
}

main();
