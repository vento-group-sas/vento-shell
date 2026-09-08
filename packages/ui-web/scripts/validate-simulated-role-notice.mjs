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
const packagePath = path.join(packageRoot, 'package.json');
const readmePath = path.join(packageRoot, 'README.md');
const componentPath = path.join(packageRoot, 'src', 'SimulatedRoleNotice.tsx');
const cssPath = path.join(packageRoot, 'src', 'simulated-role-notice.css');

const SOURCE_CONTRACT_SHA256 = '7e2fd3c04f81d337dc72a9b42babae6ea03c1fd0eeb238c6e1107b34bde2db2d';

function canonicalTaskBlock(owner, taskId) {
  const task = parseTaskBlocks(owner).find((entry) => entry.id === taskId) ?? null;
  assert(task, `canonical task ${taskId} not found`);
  return task.block;
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
  assert(blockingDiagnostics.length === 0, 'SimulatedRoleNotice transpile diagnostics contain errors');

  const runtimeModule = { exports: {} };
  const localRequire = (specifier) => {
    if (specifier === './simulated-role-notice.css') return {};
    return requireFromRepo(specifier);
  };
  const wrapper = vm.runInThisContext(
    `(function(require,module,exports){${compiled.outputText}\n})`,
    { filename: 'SimulatedRoleNotice.runtime.cjs' },
  );
  wrapper(localRequire, runtimeModule, runtimeModule.exports);
  return runtimeModule.exports;
}

function renderNotice(api, overrides = {}) {
  const React = requireFromRepo('react');
  const { renderToStaticMarkup } = requireFromRepo('react-dom/server');
  return renderToStaticMarkup(React.createElement(api.SimulatedRoleNotice, {
    title: 'Vista de simulacion',
    simulatedRoleLabel: 'Rol mostrado: Supervisor',
    description: 'La vista representa el alcance simulado entregado por la composicion.',
    nonExecutableLabel: 'Esta presentacion no concede autoridad de ejecucion.',
    ...overrides,
  }));
}

function main() {
  const owner = fs.readFileSync(ownerPath, 'utf8');
  const taskBlock = canonicalTaskBlock(owner, 'SHELL-UI-009');
  const packageJson = JSON.parse(fs.readFileSync(packagePath, 'utf8'));
  const readme = fs.readFileSync(readmePath, 'utf8');
  const source = fs.readFileSync(componentPath, 'utf8');
  const css = fs.readFileSync(cssPath, 'utf8');
  const api = loadRuntime(source);

  assert(sha256(taskBlock) === SOURCE_CONTRACT_SHA256, 'source contract SHA256 mismatch');
  includesAll(owner, [
    'EXECUTION-GATE-RECONCILIATION:B001-200:SHELL-UI-001-020',
    '`GLOBAL_ENABLE_ONCE`',
    '`PRE_E5_FOUNDATION`',
    '`<task_id>::GLOBAL`',
  ], 'physical topology reconciliation');

  assert(packageJson.name === '@vento/ui-web', 'package name mismatch');
  assert(packageJson.private === true && packageJson.type === 'module', 'package identity mismatch');
  for (const key of ['version', 'main', 'types', 'exports', 'dependencies', 'devDependencies', 'peerDependencies', 'scripts']) {
    assert(!(key in packageJson), `package public surface must remain deferred: ${key}`);
  }

  includesAll(source, [
    'export function SimulatedRoleNotice',
    'export interface SimulatedRoleNoticeProps',
    "import './simulated-role-notice.css';",
    'HTMLAttributes<HTMLDivElement>',
    "'children'",
    'title: string;',
    'simulatedRoleLabel: string;',
    'description: string;',
    'nonExecutableLabel: string;',
    'className',
    '...rest',
    '<div className={rootClassName} {...rest}>',
  ], 'SimulatedRoleNotice source');

  excludesAll(source, [
    "'use client'",
    '"use client"',
    'active?:',
    'isSimulated',
    'onDismiss',
    'onClose',
    'onStartSimulation',
    'onStopSimulation',
    'onRoleChange',
    'roleOptions',
    'canOperate',
    'wouldAllow',
    'useState(',
    'useReducer(',
    'useEffect(',
    'useLayoutEffect(',
    'useRef(',
  ], 'presentational API boundary');

  includesAll(readme, [
    'SHELL-UI-009::GLOBAL',
    'src/SimulatedRoleNotice.tsx',
    'src/simulated-role-notice.css',
    'scripts/validate-simulated-role-notice.mjs',
    'simulatedRoleLabel',
    'nonExecutableLabel',
    'Consumidores migrados: 0',
  ], 'README materialization');

  const covered = new Set();
  const cover = (number, assertion) => {
    assertion();
    covered.add(number);
  };

  cover(1, () => {
    const rendered = renderNotice(api);
    includesAll(rendered, [
      'Vista de simulacion',
      'Rol mostrado: Supervisor',
      'La vista representa el alcance simulado entregado por la composicion.',
      'Esta presentacion no concede autoridad de ejecucion.',
    ], 'four visible meanings');
  });

  cover(2, () => {
    const rendered = renderNotice(api, { className: 'consumer-class' });
    includesAll(rendered, ['ui-simulated-role-notice consumer-class'], 'className composition');
  });

  cover(3, () => {
    const rendered = renderNotice(api, { style: { marginTop: '12px' } });
    assert(rendered.includes('margin-top:12px'), 'style attribute must remain transferable');
  });

  cover(4, () => {
    const rendered = renderNotice(api, { 'data-surface': 'simulation' });
    assert(rendered.includes('data-surface="simulation"'), 'data attributes must remain transferable');
  });

  cover(5, () => {
    const rendered = renderNotice(api, { 'aria-label': 'Contexto simulado' });
    assert(rendered.includes('aria-label="Contexto simulado"'), 'ARIA attributes must remain transferable');
  });

  cover(6, () => {
    const rendered = renderNotice(api);
    assert(!rendered.includes('role="alert"'), 'component must not impose role=alert');
    assert(!rendered.includes('aria-live='), 'component must not impose live-region semantics');
  });

  cover(7, () => excludesAll(source, ["'use client'", '"use client"'], 'SSR boundary'));
  cover(8, () => excludesAll(source, ['useState(', 'useReducer(', 'useSyncExternalStore('], 'state boundary'));
  cover(9, () => excludesAll(source, ['setTimeout(', 'setInterval(', 'requestAnimationFrame('], 'timer boundary'));
  cover(10, () => excludesAll(source, ['onDismiss', 'onClose', 'dismiss', 'closeNotice'], 'dismiss boundary'));
  cover(11, () => excludesAll(source, ['onStartSimulation', 'startSimulation', 'beginSimulation'], 'simulation start boundary'));
  cover(12, () => excludesAll(source, ['onStopSimulation', 'stopSimulation', 'endSimulation'], 'simulation stop boundary'));
  cover(13, () => excludesAll(source, ['onRoleChange', 'roleOptions', '<select', '<option'], 'role selector boundary'));
  cover(14, () => excludesAll(source, ['active?:', 'isSimulated', 'simulationActive'], 'simulation-resolution boundary'));
  cover(15, () => excludesAll(source, ['canOperate', 'wouldAllow', 'WOULD_ALLOW', 'ALLOW'], 'authority projection boundary'));
  cover(16, () => excludesAll(source, ['permissionCode', 'permission', 'grant', 'scope', 'authorize'], 'permission boundary'));
  cover(17, () => excludesAll(source, ['@vento/os-context', 'EffectiveContext', 'SimulationContext', 'resolveEffectiveContext'], 'os-context boundary'));
  cover(18, () => excludesAll(source, ['@vento/supabase', '@supabase/', 'createClient', '.from('], 'Supabase boundary'));
  cover(19, () => excludesAll(source, ['fetch(', 'XMLHttpRequest', 'WebSocket', 'axios'], 'network boundary'));
  cover(20, () => excludesAll(source, ['.rpc(', 'invoke(', 'edgeFunction'], 'RPC boundary'));
  cover(21, () => excludesAll(source, ['document.cookie', 'cookieStore', 'role_override', 'roleOverrideCookie'], 'cookie boundary'));
  cover(22, () => excludesAll(source, ['localStorage', 'sessionStorage', 'indexedDB'], 'storage boundary'));
  cover(23, () => excludesAll(source, ['URLSearchParams', 'searchParams', 'location.href', 'location.search', 'pathname'], 'URL boundary'));
  cover(24, () => excludesAll(source, ['useRouter', 'router.', 'next/navigation', 'redirect('], 'router boundary'));
  cover(25, () => excludesAll(source, ['persistSimulation', 'saveSimulation', 'employee_settings', 'simulation_session'], 'persistence boundary'));
  cover(26, () => excludesAll(source, ['audit', 'telemetry', 'analytics', 'trackEvent'], 'audit boundary'));
  cover(27, () => excludesAll(source, ['autoClose', 'timeout', 'duration', 'expiresAt'], 'autoclose boundary'));
  cover(28, () => excludesAll(source, ['focus()', 'autoFocus', 'document.activeElement'], 'focus movement boundary'));
  cover(29, () => excludesAll(source, ['onKeyDown', 'onKeyUp', 'addEventListener'], 'keyboard interception boundary'));

  cover(30, () => {
    const rendered = renderNotice(api);
    assert(rendered.startsWith('<div'), 'root must remain a generic non-interactive div');
    excludesAll(source, ['<button', '<a ', 'tabIndex=', 'role="button"'], 'non-interactive root boundary');
  });

  cover(31, () => assert(renderNotice(api, { title: 'Titulo visible' }).includes('Titulo visible'), 'title must render visibly'));
  cover(32, () => assert(renderNotice(api, { simulatedRoleLabel: 'Rol simulado visible' }).includes('Rol simulado visible'), 'simulated role label must render visibly'));
  cover(33, () => assert(renderNotice(api, { description: 'Descripcion visible' }).includes('Descripcion visible'), 'description must render visibly'));
  cover(34, () => assert(renderNotice(api, { nonExecutableLabel: 'No ejecutable visible' }).includes('No ejecutable visible'), 'non-executable label must render visibly'));

  cover(35, () => excludesAll(source, [
    'Modo prueba',
    'Rol simulado:',
    'Solo lectura',
    'No ejecutable',
    'No puedes ejecutar',
  ], 'universal business copy boundary'));

  cover(36, () => includesAll(css, [
    'var(--ui-text)',
    'var(--ui-surface-2)',
    'var(--ui-border)',
    'var(--ui-primary)',
    'var(--ui-muted)',
    'var(--ui-neutral-soft)',
  ], 'theme tokens'));

  cover(37, () => {
    assert(!/(?:#(?:[0-9a-f]{3,8})\b|rgb\(|rgba\(|hsl\(|hsla\()/iu.test(css), 'SimulatedRoleNotice CSS must not hardcode colors');
  });

  cover(38, () => includesAll(css, ['max-width: 100%;', 'min-width: 0;', 'overflow-wrap: anywhere;'], 'reflow CSS'));

  cover(39, () => {
    assert(!/(^|\n)\s*height\s*:/u.test(css), 'SimulatedRoleNotice must not impose fixed height');
    assert(!/(^|\n)\s*min-height\s*:/u.test(css), 'SimulatedRoleNotice must not impose minimum height');
  });

  cover(40, () => excludesAll(css, ['overflow: hidden;', 'white-space: nowrap;', 'text-overflow: ellipsis;'], 'zoom and clipping boundary'));
  cover(41, () => assert(!/:hover\b/u.test(css), 'SimulatedRoleNotice must not depend on hover'));
  cover(42, () => excludesAll(css, ['--authorized', '--executable', '--admin', '--operational', '--real', '.authorized', '.executable', '.admin', '.operational', '.real'], 'authority visual variants'));

  cover(43, () => includesAll(readme, ['renderiza solo cuando', 'capa propietaria determina'], 'owner-controlled rendering'));
  cover(44, () => includesAll(readme, ['rol simulado no sustituye el rol real', 'no modifica identidad'], 'simulated versus real role'));
  cover(45, () => includesAll(readme, ['presentacion no es autoridad', 'no concede permisos'], 'presentation authority separation'));
  cover(46, () => includesAll(readme, ['sin dismiss', 'sin autocierre', 'no inicia ni termina simulaciones', 'no audita', 'no hace enforcement'], 'lifecycle and enforcement boundary'));
  cover(47, () => includesAll(readme, ['`ContextIndicator`', '`SiteSelector`', '`AreaSelector`', 'responsabilidades separadas'], 'shared component composition'));
  cover(48, () => includesAll(readme, ['AppShell', '`SHELL-UI-010`'], 'AppShell separation'));

  cover(49, () => {
    assertGitUnchanged([
      'src/components/ui',
      'templates/app-shell-standard',
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
      'packages/contracts',
      'packages/os-context',
      'packages/supabase',
    ]);
  });

  cover(50, () => includesAll(readme, ['Consumidores migrados: 0', 'rollback', '`SHELL-MIG-*`'], 'consumer migration and rollback boundary'));

  assert(covered.size === 50, `future scenario coverage mismatch: ${covered.size}`);
  for (let number = 1; number <= 50; number += 1) {
    assert(covered.has(number), `future scenario not covered: ${number}`);
  }

  assertGitUnchanged([
    'package.json',
    'package-lock.json',
    'packages/ui-web/package.json',
  ]);

  console.log('PASS: SHELL-UI-009 SimulatedRoleNotice validated; scenarios=50 presentation=STATIC authority=NONE lifecycle=OWNER_CONTROLLED consumers=NOT_MIGRATED exports=DEFERRED');
}

try {
  main();
} catch (error) {
  console.error('FAIL: SHELL-UI-009 SimulatedRoleNotice validation failed');
  console.error(error instanceof Error ? error.message : String(error));
  process.exitCode = 1;
}
