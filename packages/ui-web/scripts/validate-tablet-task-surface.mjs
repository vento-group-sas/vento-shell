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
const componentPath = path.join(packageRoot, 'src', 'TabletTaskSurface.tsx');
const cssPath = path.join(packageRoot, 'src', 'tablet-task-surface.css');
const readmePath = path.join(packageRoot, 'README.md');
const packagePath = path.join(packageRoot, 'package.json');
const SOURCE_CONTRACT_SHA256 = '76f675796b7051b69abf7539c0703917a0cb658f0e64cd28c385a3aeaf61aa4a';
const SURFACE_CLASSES = ['PERSONAL_TABLET', 'SHARED_TABLET'];
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
  assert(errors.length === 0, 'TabletTaskSurface transpile diagnostics contain errors');
  const runtimeModule = { exports: {} };
  const localRequire = (specifier) => {
    if (specifier === './tablet-task-surface.css') return {};
    return requireFromRepo(specifier);
  };
  const wrapper = vm.runInThisContext(
    `(function(require,module,exports){${compiled.outputText}\n})`,
    { filename: 'TabletTaskSurface.runtime.cjs' },
  );
  wrapper(localRequire, runtimeModule, runtimeModule.exports);
  return runtimeModule.exports;
}

function render(api, overrides = {}) {
  const React = requireFromRepo('react');
  const { renderToStaticMarkup } = requireFromRepo('react-dom/server');
  const props = {
    surfaceClass: 'PERSONAL_TABLET',
    ariaLabel: 'Preparacion de pedido',
    persistentContext: React.createElement('p', null, 'Actor y contexto confirmados'),
    workIdentity: React.createElement('h2', null, 'Pedido 184'),
    stepContent: React.createElement('div', null, 'Verifica cantidades'),
    ...overrides,
  };
  return renderToStaticMarkup(React.createElement(api.TabletTaskSurface, props));
}

function renderAllSlots(api, surfaceClass = 'PERSONAL_TABLET') {
  const React = requireFromRepo('react');
  return render(api, {
    surfaceClass,
    blockingState: React.createElement('p', null, 'Bloqueo material'),
    primaryAction: React.createElement('button', { type: 'button' }, 'Confirmar'),
    secondarySupport: React.createElement('a', { href: '/support' }, 'Ayuda'),
    resultAndReceipt: React.createElement('p', null, 'Resultado confirmado'),
  });
}

function assertSlotOrder(html) {
  let previous = -1;
  for (const slot of SLOTS) {
    const index = html.indexOf(`data-tablet-slot="${slot}"`);
    assert(index > previous, `semantic slot order mismatch at ${slot}`);
    previous = index;
  }
}

function main() {
  const owner = fs.readFileSync(ownerPath, 'utf8');
  const task = parseTaskBlocks(owner).find((entry) => entry.id === 'SHELL-UI-017');
  const packageJson = JSON.parse(fs.readFileSync(packagePath, 'utf8'));
  const source = fs.readFileSync(componentPath, 'utf8');
  const css = fs.readFileSync(cssPath, 'utf8');
  const readme = fs.readFileSync(readmePath, 'utf8');
  const api = loadRuntime(source);

  assert(task, 'canonical task SHELL-UI-017 not found');
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
      'export function TabletTaskSurface',
      'export type TabletTaskSurfaceProps',
      'export type TabletSurfaceClass',
      "'PERSONAL_TABLET'",
      "'SHARED_TABLET'",
      'surfaceClass: TabletSurfaceClass',
      'ariaLabel: string',
      'persistentContext: ReactNode',
      'blockingState?: ReactNode',
      'workIdentity: ReactNode',
      'stepContent: ReactNode',
      'primaryAction?: ReactNode',
      'secondarySupport?: ReactNode',
      'resultAndReceipt?: ReactNode',
      "import './tablet-task-surface.css';",
    ],
    'TabletTaskSurface source',
  );

  const covered = new Set();
  const cover = (number, assertion) => {
    assertion();
    covered.add(number);
  };

  cover(1, () => includesAll(render(api), ['data-surface-class="PERSONAL_TABLET"'], 'personal tablet'));
  cover(2, () => includesAll(render(api, { surfaceClass: 'SHARED_TABLET' }), ['data-surface-class="SHARED_TABLET"'], 'shared tablet'));
  cover(3, () => excludesAll(source, ["'FIXED_KIOSK'", 'FIXED_KIOSK'], 'kiosk class boundary'));
  cover(4, () => excludesAll(source, ['userAgent', 'navigator.', 'maxTouchPoints', 'ontouchstart'], 'device detection boundary'));
  cover(5, () => excludesAll(source, ['viewportWidth', 'breakpoint', 'innerWidth', 'matchMedia(', 'permissionCode'], 'viewport authority boundary'));
  cover(6, () => includesAll(render(api), ['data-tablet-slot="PERSISTENT_CONTEXT"', 'Actor y contexto confirmados'], 'persistent context'));
  cover(7, () => includesAll(render(api), ['data-tablet-slot="WORK_IDENTITY"', 'Pedido 184'], 'work identity'));
  cover(8, () => includesAll(render(api), ['data-tablet-slot="STEP_CONTENT"', 'Verifica cantidades'], 'step content'));
  cover(9, () => assert(count(renderAllSlots(api), 'data-tablet-slot="PRIMARY_ACTION"') === 1, 'primary action must render at most once'));
  cover(10, () => assert(!render(api).includes('data-tablet-slot="PRIMARY_ACTION"'), 'primary action must be absent when not supplied'));
  cover(11, () => assertSlotOrder(renderAllSlots(api)));
  cover(12, () => includesAll(css, ['grid-template-columns: minmax(0, 1fr);', '@media (max-width: 639px)'], 'portrait/narrow flow'));
  cover(13, () => includesAll(css, ['@media (min-width: 960px)', 'grid-template-columns: minmax(0, 2fr) minmax(18rem, 1fr);'], 'landscape/wide flow'));
  cover(14, () => excludesAll(source, ['useState(', 'useReducer(', 'localStorage', 'sessionStorage'], 'draft ownership boundary'));
  cover(15, () => assert(count(source, 'data-tablet-slot="PRIMARY_ACTION"') === 1, 'source must not duplicate primary action slot'));
  cover(16, () => {
    includesAll(css, ['min-width: 0;', 'max-width: 100%;', 'overflow-wrap: anywhere;'], 'reflow CSS');
    excludesAll(css, ['overflow-x: auto;', 'overflow-x: scroll;'], 'horizontal scroll boundary');
  });
  cover(17, () => excludesAll(css, ['display: none;', 'visibility: hidden;'], 'context compacting boundary'));
  cover(18, () => assert(css.includes('ui-tablet-task-surface__blocking-state'), 'blocking state must remain structurally addressable'));
  cover(19, () => excludesAll(css, ['position: fixed;', 'position: sticky;'], 'overlay bar boundary'));
  cover(20, () => includesAll(css, [':focus-visible', 'scroll-margin-block: 1rem;'], 'virtual keyboard reachability support'));
  cover(21, () => includesAll(css, ['input, select, textarea, button, a[href]'], 'focused control support'));
  cover(22, () => includesAll(css, ['min-inline-size: max(3rem, 48px);', 'min-block-size: max(3rem, 48px);'], 'preferred touch target'));
  cover(23, () => assert(count(css, '48px') >= 2, 'preferred touch target must preserve a 48px floor'));
  cover(24, () => includesAll(css, ['gap: 0.75rem;'], 'separated touch targets'));
  cover(25, () => assert(css.includes('ui-tablet-task-surface__action-rail'), 'primary and secondary actions need a separated action rail'));
  cover(26, () => excludesAll(css, ['transition:', 'animation:', '@keyframes'], 'under-finger stability boundary'));
  cover(27, () => excludesAll(source, ['onDoubleClick', 'onClick', 'execute(', 'mutate('], 'business duplication boundary'));
  cover(28, () => excludesAll(source, ['loading', 'success', 'confirmed', 'receiptId'], 'feedback/result ownership boundary'));
  cover(29, () => assert(!css.includes(':hover'), 'hover must not be required'));
  cover(30, () => excludesAll(source, ['swipe', 'touchmove', 'touchstart', 'touchend'], 'swipe boundary'));
  cover(31, () => excludesAll(source, ['draggable', 'onDrag', 'dragstart'], 'precise drag boundary'));
  cover(32, () => excludesAll(source, ['onLongPress', 'longPress', 'pinch', 'gesture'], 'hidden gesture boundary'));
  cover(33, () => excludesAll(source, ['onKeyDown', 'onKeyUp', 'tabIndex={0}', 'role="application"'], 'custom keyboard trap boundary'));
  cover(34, () => excludesAll(source, ['pointerType', 'stylus', 'penOnly', 'mouseOnly'], 'input modality discrimination boundary'));
  cover(35, () => includesAll(render(api), ['<section', 'aria-label="Preparacion de pedido"'], 'screen reader surface naming'));
  cover(36, () => excludesAll(css, ['outline: none;', 'outline: 0;'], 'focus visibility boundary'));
  cover(37, () => excludesAll(source, ['autoFocus', '.focus(', 'activeElement'], 'orientation focus boundary'));
  cover(38, () => excludesAll(css, ['overflow: hidden;', 'white-space: nowrap;', 'text-overflow: ellipsis;', 'height: 100vh;'], 'zoom and clipping boundary'));
  cover(39, () => assert(renderAllSlots(api).includes('Bloqueo material'), 'material state meaning remains textual and consumer supplied'));
  cover(40, () => excludesAll(source, ['vibrate(', 'Audio(', 'play()', 'beep'], 'sound and vibration boundary'));
  cover(41, () => excludesAll(source, ['convertUnit', 'unitConversion', 'precision', 'decimalPlaces'], 'quantity conversion boundary'));
  cover(42, () => excludesAll(source, ['Number(', 'parseFloat(', 'parseInt(', 'isNaN('], 'zero and empty interpretation boundary'));
  cover(43, () => excludesAll(source, ['scanner', 'camera', 'printer', 'scale', 'dataphone', 'driver'], 'peripheral ownership boundary'));
  cover(44, () => excludesAll(source, ['setTimeout(', 'setInterval(', 'retry(', 'retryPolicy', 'canRetry'], 'timeout and retry boundary'));
  cover(45, () => excludesAll(source, ['isAuthorized', 'canOperate', 'canExecute', 'permissionCode', 'roleCode'], 'personal tablet authority boundary'));
  cover(46, () => includesAll(source, ['persistentContext: ReactNode'], 'shared actor/context presentation slot'));
  cover(47, () => excludesAll(source, ['deviceId', 'actorId'], 'device and actor identity boundary'));
  cover(48, () => excludesAll(source, ['draft', 'claim', 'takeover', 'transferSession'], 'actor change state transfer boundary'));
  cover(49, () => excludesAll(source, ['previousActor', 'previousUser', 'email', 'phone', 'documentNumber'], 'previous actor privacy boundary'));
  cover(50, () => excludesAll(source, ['isOffline', 'offline', 'ONLINE_REQUIRED', 'OFFLINE_QUEUE_ALLOWED'], 'connectivity policy boundary'));
  cover(51, () => excludesAll(source, ['STALE_READ_ONLY', 'staleReadOnly', 'readOnlyBecauseStale'], 'stale policy boundary'));
  cover(52, () => assert(source.includes('resultAndReceipt?: ReactNode'), 'pending/result presentation remains externally composable'));
  cover(53, () => excludesAll(source, ['reconnect', 'online', 'addEventListener(', 'removeEventListener('], 'reconnection boundary'));
  cover(54, () => assert(!source.includes("from './EmptyState'"), 'EmptyState must remain externally composed'));
  cover(55, () => assert(!source.includes("from './RecoverableErrorState'"), 'RecoverableErrorState must remain externally composed'));
  cover(56, () => assert(!source.includes("from './ContextDiagnostic'"), 'ContextDiagnostic must remain externally composed'));
  cover(57, () => assert(!source.includes("from './SensitiveActionConfirmation'"), 'sensitive confirmation remains externally composed'));
  cover(58, () => assert(!source.includes("from './SimulatedRoleNotice'"), 'simulation notice remains externally composed'));
  cover(59, () => assert(!source.includes("from './AppShell'"), 'AppShell remains chrome owner'));
  cover(60, () => includesAll(readme, ['SHELL-UI-018', 'FIXED_KIOSK', 'fuera de UI017'], 'kiosk ownership boundary'));
  cover(61, () => includesAll(readme, ['SHELL-UI-019', 'checkpoint', 'reanudacion'], 'interrupted process boundary'));
  cover(62, () => includesAll(readme, ['SHELL-UI-020', 'handoff', 'cross-app'], 'cross-app handoff boundary'));
  cover(63, () => excludesAll(source, ['@vento/supabase', '@supabase/', '.from(', '.rpc(', '.storage', '.auth'], 'Supabase boundary'));
  cover(64, () => {
    assert(!/^[\s]*['"]use client['"];?/mu.test(source), 'component must remain server-safe');
    assert(renderAllSlots(api).includes('Resultado confirmado'), 'server render failed');
  });
  cover(65, () => includesAll(readme, ['SHELL', 'NEXO', 'FOGO', 'ORIGO', 'VISO', 'PULSO', 'NUMERA', '7/7'], 'seven consumer decisions'));
  cover(66, () => includesAll(readme, ['Faltantes: 0', 'Duplicados: 0'], 'consumer matrix completeness'));
  cover(67, () => includesAll(readme, ['migracion', 'reversible', 'rollback'], 'reversible migration handoff'));
  cover(68, () => includesAll(readme, ['dispositivo representativo', 'antes de despliegue amplio'], 'physical device validation handoff'));

  includesAll(source, SURFACE_CLASSES.map((value) => `'${value}'`), 'surface classes');
  includesAll(source, SLOTS.map((slot) => `data-tablet-slot="${slot}"`), 'semantic slots');
  excludesAll(
    source,
    [
      'deviceId',
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
      'isOffline',
      'orientation',
      'breakpoint',
      'viewportWidth',
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
      'SHELL-UI-017::GLOBAL',
      'TabletTaskSurface',
      'TABLET-TASK-SURFACE-CONTRACT-001',
      'PERSONAL_TABLET',
      'SHARED_TABLET',
      'PERSISTENT_CONTEXT',
      'BLOCKING_STATE',
      'WORK_IDENTITY',
      'STEP_CONTENT',
      'PRIMARY_ACTION',
      'SECONDARY_SUPPORT',
      'RESULT_AND_RECEIPT',
      'ELEGIBILIDAD_TABLET_CONDICIONADA_A_SUPERFICIE_Y_PERFIL',
      'CANDIDATO_OPERATIVO_TABLET',
      'CANDIDATO_TABLET_ACOTADO_SIN_CONVERTIR_BACKOFFICE_DENSO',
      'Consumidores migrados por UI017: 0/7',
      'Cambios Supabase por UI017: 0',
    ],
    'README UI017 materialization',
  );

  assert(covered.size === 68, `expected 68 covered scenarios; got ${covered.size}`);

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
    'src/components/ui',
    'templates/app-shell-standard',
    'packages/contracts',
    'packages/os-context',
    'packages/supabase',
  ]);

  console.log(
    'PASS: SHELL-UI-017 TabletTaskSurface validated; '
      + 'scenarios=68 classes=2 slots=7 ssr=SAFE authority=NONE '
      + 'device_detection=NONE consumers=0/7 exports=DEFERRED',
  );
}

main();
