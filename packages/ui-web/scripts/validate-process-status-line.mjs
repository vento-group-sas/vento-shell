import fs from 'node:fs';
import path from 'node:path';
import vm from 'node:vm';
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
const packagePath = path.join(packageRoot, 'package.json');
const readmePath = path.join(packageRoot, 'README.md');
const componentPath = path.join(packageRoot, 'src', 'ProcessStatusLine.tsx');
const cssPath = path.join(packageRoot, 'src', 'process-status-line.css');

const SOURCE_CONTRACT_SHA256 = '569a18962615f050186b9f6f516aefe10a473cc7fe7c16d5427d68ee4aa597ae';

function countMatches(source, pattern) {
  return [...source.matchAll(pattern)].length;
}

function normalizeSource(source) {
  return source.replace(/^\uFEFF/u, '').replace(/\r\n?/gu, '\n');
}

function canonicalTaskBlock(owner, taskId) {
  const lines = normalizeSource(owner).split('\n');
  let fenced = false;
  let start = -1;
  let end = lines.length;
  const taskHeading = /^###\s+.*\b[A-Z]+(?:-[A-Z]+)+-\d{3}\b.*$/u;

  for (let index = 0; index < lines.length; index += 1) {
    const line = lines[index];
    if (/^\s*```/u.test(line)) {
      fenced = !fenced;
      continue;
    }
    if (fenced || !taskHeading.test(line)) continue;
    if (start === -1 && line.includes(taskId)) {
      start = index;
      continue;
    }
    if (start !== -1) {
      end = index;
      break;
    }
  }

  assert(start !== -1, `canonical task ${taskId} not found`);
  return lines.slice(start, end).join('\n');
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

  const blockingDiagnostics = (compiled.diagnostics ?? []).filter(
    (entry) => entry.category === ts.DiagnosticCategory.Error,
  );
  assert(blockingDiagnostics.length === 0, 'ProcessStatusLine transpile diagnostics contain errors');

  const runtimeModule = { exports: {} };
  const localRequire = (specifier) => {
    if (specifier === './process-status-line.css') return {};
    return requireFromRepo(specifier);
  };
  const wrapper = vm.runInThisContext(
    `(function(require,module,exports){${compiled.outputText}\n})`,
    { filename: 'ProcessStatusLine.runtime.cjs' },
  );
  wrapper(localRequire, runtimeModule, runtimeModule.exports);
  return runtimeModule.exports;
}

function sampleSteps() {
  return [
    {
      stepId: 'requested',
      label: 'Solicitud recibida',
      description: 'La solicitud ya fue registrada',
      state: 'REACHED',
    },
    {
      stepId: 'preparing',
      label: 'Preparacion',
      description: 'La instancia se encuentra en preparacion',
      state: 'CURRENT',
    },
    {
      stepId: 'dispatch',
      label: 'Despacho',
      state: 'NOT_REACHED',
    },
  ];
}

function render(api, props) {
  const React = requireFromRepo('react');
  const { renderToStaticMarkup } = requireFromRepo('react-dom/server');
  return renderToStaticMarkup(React.createElement(api.ProcessStatusLine, props));
}

let scenarios = 0;
function cover(index, test) {
  assert(index === scenarios + 1, `scenario sequence mismatch at ${index}`);
  test();
  scenarios = index;
}

function main() {
  const owner = fs.readFileSync(ownerPath, 'utf8');
  const packageSource = fs.readFileSync(packagePath, 'utf8');
  const readme = fs.readFileSync(readmePath, 'utf8');
  const source = fs.readFileSync(componentPath, 'utf8');
  const css = fs.readFileSync(cssPath, 'utf8');
  const taskBlock = canonicalTaskBlock(owner, 'SHELL-UI-012');
  const api = loadRuntime(source);
  const steps = sampleSteps();
  const markup = render(api, { ariaLabel: 'Estado del proceso', steps });
  const noDescriptionMarkup = render(api, {
    ariaLabel: 'Estado simple',
    steps: [{ stepId: 'only', label: 'Unico paso', state: 'CURRENT' }],
  });
  const emptyMarkup = render(api, { ariaLabel: 'Sin proyeccion', steps: [] });

  cover(1, () => assert(sha256(taskBlock) === SOURCE_CONTRACT_SHA256, 'source contract SHA256 mismatch'));
  cover(2, () => includesAll(taskBlock, ['ProcessStatusLine', 'REACHED', 'CURRENT', 'NOT_REACHED'], 'owner contract'));
  cover(3, () => assert(fs.existsSync(componentPath), 'ProcessStatusLine.tsx missing'));
  cover(4, () => assert(fs.existsSync(cssPath) && fs.existsSync(readmePath), 'ProcessStatusLine CSS or README missing'));
  cover(5, () => includesAll(source, ["export type ProcessStatusLineStepState = 'REACHED' | 'CURRENT' | 'NOT_REACHED';"], 'state union'));
  cover(6, () => includesAll(source, ['ariaLabel: string;', 'steps: readonly ProcessStatusLineStep[];'], 'props contract'));
  cover(7, () => includesAll(source, ['stepId: string;', 'label: string;', 'description?: string;', 'state: ProcessStatusLineStepState;'], 'step contract'));
  cover(8, () => includesAll(source, ['<ol', '<li', 'aria-label={ariaLabel}'], 'ordered-list semantics'));
  cover(9, () => assert(source.includes('steps.map((step) =>') && !source.includes('.sort('), 'received order must be preserved'));
  cover(10, () => assert(source.includes('data-state={step.state}'), 'step state must be supplied explicitly'));
  cover(11, () => assert(source.includes("aria-current={step.state === 'CURRENT' ? 'step' : undefined}"), 'CURRENT must expose aria-current=step'));
  cover(12, () => excludesAll(source, ['map((step, index)', 'map((step,index)', 'findIndex(', 'indexOf('], 'index inference'));
  cover(13, () => assert(!source.includes('>{step.state}<'), 'raw state codes must not be primary copy'));
  cover(14, () => excludesAll(source, ['currentIndex', 'currentStepIndex', 'lastReached'], 'CURRENT calculation'));
  cover(15, () => excludesAll(source, ['usePathname', 'useSearchParams', 'location.pathname', 'window.location'], 'route inference'));
  cover(16, () => excludesAll(source, ['timestamp', 'createdAt', 'updatedAt', 'Date.now'], 'timestamp inference'));
  cover(17, () => assert(!source.includes('style={{ color:'), 'component must not infer state from inline color'));
  cover(18, () => excludesAll(source, ['transitionRegistry', 'transitions:', 'allowedTransitions', 'sourceState', 'targetState'], 'transition registry'));
  cover(19, () => excludesAll(source, ['nextAllowedStates', 'nextState', 'allowedStates'], 'next-state contract'));
  cover(20, () => excludesAll(source, ['onAdvance', 'onBack', 'onStepClick', 'onTransition', 'onComplete', 'onRetry', 'onApprove', 'onReject'], 'business callbacks'));
  cover(21, () => excludesAll(source, ['useState', 'useReducer', 'setState', 'dispatch('], 'state writes'));
  cover(22, () => excludesAll(source, ['supabase', 'rpc(', 'fetch(', 'XMLHttpRequest', 'WebSocket'], 'data access'));
  cover(23, () => excludesAll(source, ['auth', 'session', 'getUser', 'getSession'], 'authentication'));
  cover(24, () => excludesAll(source, ['permission', 'requiredPermissions', 'canAccess', 'canExecute'], 'permissions'));
  cover(25, () => excludesAll(source, ['role:', 'role?', 'canOperate', 'AuthorizationDecision'], 'role authority'));
  cover(26, () => excludesAll(source, ['href', 'next/link', 'next/navigation', 'router'], 'navigation'));
  cover(27, () => excludesAll(source, ['localStorage', 'sessionStorage', 'indexedDB'], 'storage'));
  cover(28, () => excludesAll(source, ['setTimeout', 'setInterval', 'requestAnimationFrame'], 'timers'));
  cover(29, () => excludesAll(source, ["'OFFLINE'", "'QUEUED'", "'SYNCING'", "'CONFLICT'"], 'sync state taxonomy'));
  cover(30, () => excludesAll(source, ["'BLOCKED'", "'WAITING'", "'DENIED'", "'ERROR'", "'STALE'"], 'transverse condition taxonomy'));
  cover(31, () => excludesAll(source, ['<button', '<a ', 'role="button"', 'role="link"'], 'interactive controls'));
  cover(32, () => excludesAll(source, ['tabIndex', 'autofocus', 'autoFocus'], 'artificial focus'));
  cover(33, () => excludesAll(source, ["'use client'", '"use client"', 'window.', 'document.', 'useEffect', 'useLayoutEffect'], 'server-safe boundary'));
  cover(34, () => includesAll(markup, ['<ol', 'aria-label="Estado del proceso"', '<li'], 'runtime list semantics'));
  cover(35, () => assert(markup.indexOf('Solicitud recibida') < markup.indexOf('Preparacion') && markup.indexOf('Preparacion') < markup.indexOf('Despacho'), 'runtime order changed'));
  cover(36, () => assert(countMatches(markup, /aria-current="step"/gu) === 1 && markup.includes('Preparacion'), 'valid projection must expose one CURRENT'));
  cover(37, () => assert(markup.includes('data-state="REACHED"') && markup.includes('Solicitud recibida'), 'REACHED must remain explicit'));
  cover(38, () => assert(markup.includes('data-state="NOT_REACHED"') && markup.includes('Despacho'), 'NOT_REACHED must remain explicit'));
  cover(39, () => assert(markup.includes('La instancia se encuentra en preparacion'), 'description must render when supplied'));
  cover(40, () => assert(!noDescriptionMarkup.includes('ui-process-status-line__description'), 'description must remain optional'));
  cover(41, () => assert(emptyMarkup.includes('<ol') && !emptyMarkup.includes('<li'), 'component must not fabricate steps'));
  cover(42, () => includesAll(css, ['.ui-process-status-line__step:not(:last-child)::after', 'pointer-events: none;'], 'decorative connectors'));
  cover(43, () => includesAll(css, ["[data-state='REACHED'] .ui-process-status-line__marker", 'border-style: solid;', 'background: var(--ui-primary);'], 'REACHED non-color structure'));
  cover(44, () => includesAll(css, ["[data-state='CURRENT'] .ui-process-status-line__marker", 'border: 4px double var(--ui-primary);'], 'CURRENT non-color structure'));
  cover(45, () => includesAll(css, ["[data-state='NOT_REACHED'] .ui-process-status-line__marker", 'border-style: dashed;'], 'NOT_REACHED non-color structure'));
  cover(46, () => includesAll(css, ["[data-state='CURRENT'] .ui-process-status-line__label", 'font-weight: 700;'], 'CURRENT text distinction'));
  cover(47, () => {
    const tokens = [...css.matchAll(/var\((--ui-[a-z0-9-]+)\)/gu)].map((match) => match[1]);
    const allowed = new Set(['--ui-border', '--ui-primary', '--ui-surface', '--ui-text', '--ui-muted']);
    assert(tokens.length > 0 && tokens.every((token) => allowed.has(token)), 'CSS must use existing ui tokens only');
  });
  cover(48, () => assert(!/(?:#[0-9a-f]{3,8}\b|rgba?\(|hsla?\()/iu.test(css), 'hardcoded CSS colors are forbidden'));
  cover(49, () => excludesAll(css, ['transition:', 'animation:', '@keyframes'], 'motion'));
  cover(50, () => assert(css.includes('@media (max-width: 767px)'), 'narrow viewport reflow missing'));
  cover(51, () => includesAll(css, ['.ui-process-status-line {', 'display: flex;'], 'wide horizontal layout'));
  cover(52, () => includesAll(css, ['grid-template-columns: minmax(0, 1fr);', 'border-left: 2px solid var(--ui-border);'], 'narrow vertical layout'));
  cover(53, () => includesAll(css, ['min-width: 0;', 'overflow-wrap: anywhere;'], 'zoom and text reflow'));
  cover(54, () => excludesAll(css, ['overflow-x: auto', 'overflow-x: scroll', 'overflow-x: hidden', 'white-space: nowrap'], 'structural horizontal overflow'));
  cover(55, () => excludesAll(source, ['role="tablist"', 'role="progressbar"', 'role="listbox"', 'role="slider"'], 'interactive ARIA widget roles'));
  cover(56, () => assert(source.includes("aria-current={step.state === 'CURRENT' ? 'step' : undefined}"), 'CURRENT cannot depend on color alone'));
  cover(57, () => assert(source.includes('aria-hidden="true"'), 'decorative marker must remain hidden from accessibility tree'));
  cover(58, () => excludesAll(source, ['aria-live="assertive"', "aria-live='assertive'", 'role="alert"'], 'assertive announcements'));
  cover(59, () => excludesAll(source, ['focus()', 'scrollIntoView(', 'onFocus=', 'onKeyDown='], 'focus movement'));
  cover(60, () => includesAll(readme, ['## ProcessStatusLine', 'server-safe', 'proyeccion visible y ordenada'], 'README ProcessStatusLine contract'));
  cover(61, () => includesAll(readme, ['SHELL', 'NEXO', 'FOGO', 'ORIGO', 'VISO', 'PULSO', 'NUMERA', 'Consumidores migrados por UI012: 0/7.'], 'README consumer matrix'));
  cover(62, () => includesAll(readme, ['### TaskNavigation, AppShell y composicion', '### Condiciones, offline y sincronizacion'], 'README composition boundaries'));
  cover(63, () => includesAll(readme, ['Sin `version` npm.', 'Sin `main`, `types` o `exports`', 'exports publicos permanecen diferidos'], 'README deferred public surface'));
  cover(64, () => {
    const manifest = JSON.parse(packageSource);
    assert(manifest.name === '@vento/ui-web' && manifest.private === true && manifest.type === 'module', 'ui-web package identity changed');
    assert(!('exports' in manifest) && !('version' in manifest) && !('main' in manifest) && !('types' in manifest), 'public package surface must remain deferred');
    assertGitUnchanged(['packages/ui-web/package.json', 'package.json', 'package-lock.json']);
  });
  cover(65, () => assertGitUnchanged([
    'packages/ui-web/src/Alert.tsx',
    'packages/ui-web/src/alert.css',
    'packages/ui-web/scripts/validate-alert.mjs',
    'packages/ui-web/src/Button.tsx',
    'packages/ui-web/src/button.css',
    'packages/ui-web/scripts/validate-button.mjs',
    'packages/ui-web/src/Card.tsx',
    'packages/ui-web/src/card.css',
    'packages/ui-web/scripts/validate-card.mjs',
    'packages/ui-web/src/EmptyState.tsx',
    'packages/ui-web/src/empty-state.css',
    'packages/ui-web/scripts/validate-empty-state.mjs',
    'packages/ui-web/src/ContextIndicator.tsx',
    'packages/ui-web/src/context-indicator.css',
    'packages/ui-web/scripts/validate-context-indicator.mjs',
    'packages/ui-web/src/SiteSelector.tsx',
    'packages/ui-web/src/site-selector.css',
    'packages/ui-web/scripts/validate-site-selector.mjs',
    'packages/ui-web/src/AreaSelector.tsx',
    'packages/ui-web/src/area-selector.css',
    'packages/ui-web/scripts/validate-area-selector.mjs',
    'packages/ui-web/src/SimulatedRoleNotice.tsx',
    'packages/ui-web/src/simulated-role-notice.css',
    'packages/ui-web/scripts/validate-simulated-role-notice.mjs',
    'packages/ui-web/src/AppShell.tsx',
    'packages/ui-web/src/app-shell.css',
    'packages/ui-web/scripts/validate-app-shell.mjs',
    'packages/ui-web/src/TaskNavigation.tsx',
    'packages/ui-web/src/task-navigation.css',
    'packages/ui-web/scripts/validate-task-navigation.mjs',
  ]));
  cover(66, () => assertGitUnchanged([
    'docs/plan-canonico/modular/bloques/H_FUNDACION_COMPARTIDA/07_COMPONENTES_WEB_COMPARTIDOS.md',
    'docs/plan-canonico/modular/implementation-instances/SHELL-UI-011__GLOBAL.json',
    'packages/contracts',
    'packages/os-context',
    'packages/supabase',
    'templates/app-shell-standard',
  ]));
  cover(67, () => assertGitUnchanged(['src/components/ui', 'src/components/vento', 'src/app']));
  cover(68, () => {
    assert(scenarios === 67, 'all prior scenarios must pass before completion');
    includesAll(readme, [
      'ÚLTIMA TAREA APROBADA: `SHELL-UI-011`',
      'TAREA ACTUAL APROBADA: `SHELL-UI-012`',
      'SIGUIENTE TAREA RESERVADA: `SHELL-UI-013`',
    ], 'README continuity');
  });

  assert(scenarios === 68, `expected 68 scenarios, got ${scenarios}`);
  console.log(
    'PASS: SHELL-UI-012 ProcessStatusLine validated; scenarios=68 server_safe=YES authority=NONE transitions=EXTERNAL consumers=0/7 exports=DEFERRED',
  );
}

main();
