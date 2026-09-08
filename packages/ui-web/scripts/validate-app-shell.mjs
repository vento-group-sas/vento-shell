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
const componentPath = path.join(packageRoot, 'src', 'AppShell.tsx');
const cssPath = path.join(packageRoot, 'src', 'app-shell.css');

const SOURCE_CONTRACT_SHA256 = 'd015d322f8f1aff853f8bc450c81e745a2c248a8156c5b639af18257798fa1d6';

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
  assert(blockingDiagnostics.length === 0, 'AppShell transpile diagnostics contain errors');

  const runtimeModule = { exports: {} };
  const localRequire = (specifier) => {
    if (specifier === './app-shell.css') return {};
    return requireFromRepo(specifier);
  };
  const wrapper = vm.runInThisContext(
    `(function(require,module,exports){${compiled.outputText}\n})`,
    { filename: 'AppShell.runtime.cjs' },
  );
  wrapper(localRequire, runtimeModule, runtimeModule.exports);
  return runtimeModule.exports;
}

function renderShell(api, overrides = {}) {
  const React = requireFromRepo('react');
  const { renderToStaticMarkup } = requireFromRepo('react-dom/server');
  const {
    children = React.createElement('section', null, 'Contenido de proceso'),
    ...props
  } = overrides;
  return renderToStaticMarkup(React.createElement(api.AppShell, {
    brand: React.createElement('strong', null, 'NEXO'),
    skipToContentLabel: 'Ir al contenido principal',
    ...props,
  }, children));
}

function main() {
  const owner = fs.readFileSync(ownerPath, 'utf8');
  const taskBlock = canonicalTaskBlock(owner, 'SHELL-UI-010');
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
    "'use client';",
    'export function AppShell',
    'export type AppShellProps',
    'children: ReactNode;',
    'brand: ReactNode;',
    'navigation?: undefined;',
    'navigationLabel?: never;',
    'navigation: ReactNode;',
    'navigationLabel: string;',
    'skipToContentLabel: string;',
    'context?: ReactNode;',
    'notices?: ReactNode;',
    'headerActions?: ReactNode;',
    "import './app-shell.css';",
    'useState(false)',
    'useRef<HTMLButtonElement>(null)',
    'aria-controls={navigationId}',
    'aria-expanded={navigationOpen}',
    'aria-label={navigationLabel}',
    "event.key === 'Escape'",
    'navigationToggleRef.current?.focus()',
    '<header className="ui-app-shell__header">',
    '<main id={mainId} className="ui-app-shell__main" tabIndex={-1}>',
  ], 'AppShell source');

  excludesAll(source, [
    '@vento/os-context',
    '@vento/supabase',
    '@supabase/',
    'createClient',
    '.from(',
    '.rpc(',
    '.auth',
    'permissionCode',
    'canOperate',
    'required:',
    'anyOf',
    'AccessContext',
    'EffectiveContext',
    'SimulationContext',
    'OperatingGate',
    'AppSwitcher',
    'ProfileMenu',
    'usePathname',
    'useSearchParams',
    'useRouter',
    'next/navigation',
    'URLSearchParams',
    'document.cookie',
    'cookieStore',
    'localStorage',
    'sessionStorage',
    'indexedDB',
    'fetch(',
    'XMLHttpRequest',
    'WebSocket',
    'roleOverride',
    'isSimulated',
    'siteId',
    'areaId',
    'shiftId',
  ], 'application authority boundary');

  includesAll(readme, [
    'SHELL-UI-010::GLOBAL',
    'src/AppShell.tsx',
    'src/app-shell.css',
    'scripts/validate-app-shell.mjs',
    'skipToContentLabel',
    'Consumidores migrados: 0/7',
    'SHELL-UI-011',
  ], 'README materialization');

  const covered = new Set();
  const cover = (number, assertion) => {
    assertion();
    covered.add(number);
  };

  cover(1, () => {
    const rendered = renderShell(api);
    includesAll(rendered, ['NEXO', 'Contenido de proceso'], 'minimal shell content');
  });

  cover(2, () => {
    const rendered = renderShell(api);
    assert(rendered.includes('ui-app-shell__skip-link'), 'skip link must render');
    assert(rendered.includes('Ir al contenido principal'), 'skip link label must remain consumer supplied');
  });

  cover(3, () => {
    const rendered = renderShell(api);
    assert((rendered.match(/<main\b/gu) ?? []).length === 1, 'AppShell must render exactly one main landmark');
    assert(rendered.includes('tabindex="-1"'), 'main target must support skip-link focus');
  });

  cover(4, () => {
    const rendered = renderShell(api);
    assert(!rendered.includes('<nav'), 'navigation-less composition must not render nav');
  });

  cover(5, () => {
    const rendered = renderShell(api);
    assert(!rendered.includes('ui-app-shell__navigation-toggle'), 'navigation-less composition must not render menu control');
  });

  cover(6, () => {
    const React = requireFromRepo('react');
    const rendered = renderShell(api, {
      navigation: React.createElement('a', { href: '/work' }, 'Trabajo'),
      navigationLabel: 'Navegacion de trabajo',
    });
    includesAll(rendered, ['<nav', 'aria-label="Navegacion de trabajo"', '>Trabajo</a>'], 'navigation landmark');
  });

  cover(7, () => {
    const React = requireFromRepo('react');
    const rendered = renderShell(api, {
      navigation: React.createElement('span', null, 'Navegacion'),
      navigationLabel: 'Navegacion principal',
    });
    assert(/aria-controls="[^"]+"/u.test(rendered), 'mobile navigation control must reference nav');
  });

  cover(8, () => {
    const React = requireFromRepo('react');
    const rendered = renderShell(api, {
      navigation: React.createElement('span', null, 'Navegacion'),
      navigationLabel: 'Navegacion principal',
    });
    assert(rendered.includes('aria-expanded="false"'), 'mobile navigation disclosure must expose collapsed state');
  });

  cover(9, () => {
    const React = requireFromRepo('react');
    const rendered = renderShell(api, {
      navigation: React.createElement('span', null, 'Navegacion'),
      navigationLabel: 'Navegacion principal',
    });
    assert(rendered.includes('data-mobile-open="false"'), 'mobile navigation must start collapsed');
  });

  cover(10, () => {
    const React = requireFromRepo('react');
    const rendered = renderShell(api, {
      navigation: React.createElement('ol', null, React.createElement('li', null, 'Destino preparado')),
      navigationLabel: 'Trabajo',
    });
    assert(rendered.includes('Destino preparado'), 'navigation slot must preserve consumer content');
  });

  cover(11, () => {
    const rendered = renderShell(api, { context: 'Contexto preparado' });
    assert(rendered.includes('Contexto preparado'), 'context slot must render');
  });

  cover(12, () => {
    const rendered = renderShell(api, { notices: 'Aviso persistente' });
    assert(rendered.includes('Aviso persistente'), 'notices slot must render');
  });

  cover(13, () => {
    const rendered = renderShell(api, { headerActions: 'Acciones utilitarias' });
    assert(rendered.includes('Acciones utilitarias'), 'headerActions slot must render');
  });

  cover(14, () => {
    const rendered = renderShell(api, { className: 'consumer-shell' });
    assert(rendered.includes('ui-app-shell consumer-shell'), 'root className must remain composable');
  });

  cover(15, () => {
    const rendered = renderShell(api, { 'data-surface': 'app-shell' });
    assert(rendered.includes('data-surface="app-shell"'), 'root data attributes must remain transferable');
  });

  cover(16, () => includesAll(source, ["'use client';", 'useState(false)'], 'interactive client boundary'));
  cover(17, () => includesAll(source, ['setNavigationOpen((open) => !open)', 'data-mobile-open'], 'local disclosure state'));
  cover(18, () => includesAll(source, ['useRef<HTMLButtonElement>(null)', 'navigationToggleRef.current?.focus()'], 'focus return'));
  cover(19, () => includesAll(source, ["event.key === 'Escape'", 'closeNavigation();'], 'local keyboard close'));
  cover(20, () => excludesAll(source, ['addEventListener(', 'removeEventListener(', 'document.addEventListener', 'window.addEventListener'], 'global listener boundary'));
  cover(21, () => excludesAll(source, ['useRouter', 'router.', 'next/navigation', 'redirect('], 'router boundary'));
  cover(22, () => excludesAll(source, ['usePathname', 'useSearchParams', 'URLSearchParams', 'location.href', 'location.search'], 'URL boundary'));
  cover(23, () => excludesAll(source, ['localStorage', 'sessionStorage', 'indexedDB', 'document.cookie', 'cookieStore'], 'persistence boundary'));
  cover(24, () => excludesAll(source, ['@vento/supabase', '@supabase/', 'createClient', '.from(', '.rpc(', '.auth'], 'Supabase boundary'));
  cover(25, () => excludesAll(source, ['getUser(', 'session', 'employee', 'userId', 'authUser'], 'identity boundary'));
  cover(26, () => excludesAll(source, ['permissionCode', 'canOperate', 'grant', 'authorize', 'requiredPermissions'], 'authorization boundary'));
  cover(27, () => excludesAll(source, ['AccessContext', 'EffectiveContext', 'SimulationContext', 'siteId', 'areaId', 'shiftId'], 'context authority boundary'));
  cover(28, () => excludesAll(source, ['OperatingGate', 'gateState', 'checkInRequired', 'shiftRequired'], 'operating gate boundary'));
  cover(29, () => excludesAll(source, ['AppSwitcher', 'ProfileMenu', 'applicationCatalog', 'apps ='], 'application catalog boundary'));
  cover(30, () => excludesAll(source, ['/nexo', '/fogo', '/origo', '/viso', '/pulso', '/numera'], 'application route boundary'));
  cover(31, () => excludesAll(source, ['loading:', 'error:', 'blocked:', 'isLoading', 'isBlocked'], 'business state boundary'));
  cover(32, () => excludesAll(source, ['activeWorkContext', 'operationalContext', 'activeContextLabel'], 'legacy context signature boundary'));
  cover(33, () => excludesAll(source, ['simulated?:', 'isSimulated', 'roleOverride', 'simulationContext'], 'simulation variant boundary'));

  cover(34, () => includesAll(css, [
    '.ui-app-shell__body--with-navigation',
    'grid-template-columns: minmax(12rem, 18rem) minmax(0, 1fr);',
  ], 'desktop shell grid'));

  cover(35, () => includesAll(css, [
    '@media (max-width: 767px)',
    '.ui-app-shell__navigation-toggle',
    '.ui-app-shell__body--with-navigation',
  ], 'responsive disclosure'));

  cover(36, () => includesAll(css, [
    ".ui-app-shell__navigation[data-mobile-open='false']",
    'display: none;',
    ".ui-app-shell__navigation[data-mobile-open='true']",
  ], 'hidden mobile navigation'));

  cover(37, () => includesAll(css, ['min-height: 44px;', 'ui-app-shell__navigation-toggle:focus-visible'], 'touch and focus target'));
  cover(38, () => includesAll(css, ['ui-app-shell__skip-link:focus-visible', 'ui-app-shell__main:focus-visible'], 'focus visibility'));

  cover(39, () => includesAll(css, [
    'var(--ui-bg)',
    'var(--ui-surface)',
    'var(--ui-surface-2)',
    'var(--ui-border)',
    'var(--ui-text)',
    'var(--ui-primary)',
    'var(--ui-on-primary)',
    'var(--ui-brand)',
    'var(--ui-radius-control)',
  ], 'shared visual tokens'));

  cover(40, () => {
    assert(!/(?:#(?:[0-9a-f]{3,8})\b|rgb\(|rgba\(|hsl\(|hsla\()/iu.test(css), 'AppShell CSS must not hardcode colors');
  });

  cover(41, () => includesAll(css, ['min-width: 0;', 'max-width: 100%;', 'overflow-wrap: anywhere;'], 'reflow and long content'));

  cover(42, () => {
    assert(!/(^|\n)\s*width\s*:\s*\d/iu.test(css), 'AppShell must not impose a fixed numeric width');
    excludesAll(css, ['overflow-x: hidden', 'white-space: nowrap', 'text-overflow: ellipsis'], 'structural clipping boundary');
  });

  cover(43, () => excludesAll(css, ['transition:', 'animation:', '@keyframes'], 'motion-independent chrome'));

  cover(44, () => includesAll(readme, [
    '## AppShell',
    '`AppShell` es un marco de composicion',
    '`skipToContentLabel`',
    'navegacion presente exige `navigationLabel`',
  ], 'README AppShell API'));

  cover(45, () => includesAll(readme, [
    '`brand`',
    '`navigation`',
    '`context`',
    '`notices`',
    '`headerActions`',
    '`children`',
    'presentacion no sustituye autorizacion',
  ], 'README composition and authority boundary'));

  cover(46, () => includesAll(readme, [
    '7 consumidores conceptualmente elegibles',
    '6 familias runtime duplicadas',
    '1 launcher SHELL',
    'Consumidores migrados: 0/7',
    'Copias legacy retiradas: 0',
  ], 'README consumer disposition'));

  cover(47, () => includesAll(readme, [
    '`SHELL-UI-011` conserva la navegacion orientada a tareas',
    'AppShell no define items, rutas, permisos ni agrupacion empresarial',
  ], 'navigation handoff'));

  cover(48, () => {
    assertGitUnchanged([
      'package.json',
      'package-lock.json',
      'packages/ui-web/package.json',
      'src/components/ui',
      'templates/app-shell-standard',
      'packages/contracts',
      'packages/os-context',
      'packages/supabase',
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
    ]);
  });

  cover(49, () => includesAll(readme, [
    'Sin `version` npm.',
    'Sin `main`, `types` o `exports`',
    'Sin publicacion, registry, tags o releases.',
    'Superficie publica diferida',
  ], 'deferred package surface'));

  cover(50, () => {
    const ordered = [...covered].sort((left, right) => left - right);
    assert(ordered.length === 49, `coverage pre-final count must be 49, got ${ordered.length}`);
    assert(ordered.every((value, index) => value === index + 1), 'coverage numbering must be contiguous 1..49 before final');
  });

  covered.add(50);
  const ordered = [...covered].sort((left, right) => left - right);
  assert(ordered.length === 50, `scenario count must be 50, got ${ordered.length}`);
  assert(ordered.every((value, index) => value === index + 1), 'scenario numbering must be exactly 1..50');

  console.log('PASS: SHELL-UI-010 AppShell validated; scenarios=50 interaction=LOCAL_DISCLOSURE authority=NONE navigation=EXTERNAL consumers=0/7 exports=DEFERRED');
}

main();
