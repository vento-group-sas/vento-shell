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
const componentPath = path.join(packageRoot, 'src', 'SiteSelector.tsx');
const cssPath = path.join(packageRoot, 'src', 'site-selector.css');

const SOURCE_CONTRACT_SHA256 = 'd22e4c8bbf8affd897cfdc1f61ae1bd4f7a80b6d0698e31ac7d276a24c545542';

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
  assert(blockingDiagnostics.length === 0, 'SiteSelector transpile diagnostics contain errors');

  const runtimeModule = { exports: {} };
  const localRequire = (specifier) => {
    if (specifier === './site-selector.css') return {};
    return requireFromRepo(specifier);
  };
  const wrapper = vm.runInThisContext(
    `(function(require,module,exports){${compiled.outputText}\n})`,
    { filename: 'SiteSelector.runtime.cjs' },
  );
  wrapper(localRequire, runtimeModule, runtimeModule.exports);
  return runtimeModule.exports;
}

function renderSiteSelector(api, props) {
  const React = requireFromRepo('react');
  const { renderToStaticMarkup } = requireFromRepo('react-dom/server');
  return renderToStaticMarkup(React.createElement(api.SiteSelector, props));
}

function findElement(node, type) {
  if (!node || typeof node !== 'object') return null;
  if (node.type === type) return node;

  const children = node.props?.children;
  const list = Array.isArray(children) ? children : [children];
  for (const child of list) {
    const found = findElement(child, type);
    if (found) return found;
  }
  return null;
}

function siteSelectorElement(api, props) {
  return api.SiteSelector(props);
}

function main() {
  const owner = fs.readFileSync(ownerPath, 'utf8');
  const taskBlock = canonicalTaskBlock(owner, 'SHELL-UI-007');
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
    'export function SiteSelector',
    'export interface SiteSelectorProps',
    'export interface SiteSelectorOption',
    "import './site-selector.css';",
    'SelectHTMLAttributes<HTMLSelectElement>',
    'label: string;',
    'confirmedSiteId: string | null;',
    'requestedSiteId?: string;',
    'options: readonly SiteSelectorOption[];',
    'onRequestChange: (siteId: string) => void;',
    'pending?: boolean;',
    'pendingLabel?: string;',
    'disabled?: boolean;',
    'placeholderLabel?: string;',
    'readonly id: string;',
    'readonly label: string;',
    "| 'value'",
    "| 'defaultValue'",
    "| 'onChange'",
    "| 'multiple'",
    "| 'children'",
    "| 'size'",
    "| 'autoFocus'",
  ], 'SiteSelector source');

  excludesAll(source, [
    'defaultSiteId',
    'primarySiteId',
    'lastSiteId',
    'activeSiteId',
    'canSwitchRole',
    'canOperate',
    'permissionCode',
    'supabaseClient',
    'employeeId',
    'SiteSelectorState',
    'areaId',
    'variant?:',
    'tone?:',
    'fullWidth',
  ], 'SiteSelector public API boundary');

  includesAll(readme, [
    'SHELL-UI-007::GLOBAL',
    'src/SiteSelector.tsx',
    'src/site-selector.css',
    'scripts/validate-site-selector.mjs',
    'confirmedSiteId',
    'requestedSiteId',
    'onRequestChange',
    'Consumidores migrados: 0',
  ], 'README materialization');

  const options = [
    { id: 'site-a', label: 'Centro de Produccion' },
    { id: 'site-b', label: 'Vento Cafe' },
    { id: 'site-c', label: 'Saudo' },
  ];

  const covered = new Set();
  const cover = (number, assertion) => {
    assertion();
    covered.add(number);
  };

  cover(1, () => {
    const rendered = renderSiteSelector(api, {
      label: 'Cambiar sede',
      confirmedSiteId: 'site-a',
      options,
      onRequestChange() {},
    });
    includesAll(rendered, ['<select', '<option value="site-a" selected="">Centro de Produccion</option>'], 'confirmed site render');
  });

  cover(2, () => {
    const rendered = renderSiteSelector(api, {
      label: 'Seleccionar sede',
      confirmedSiteId: null,
      placeholderLabel: 'Selecciona una sede',
      options,
      onRequestChange() {},
    });
    includesAll(rendered, ['<option value="" disabled="" selected="">Selecciona una sede</option>'], 'null confirmed site placeholder');
  });

  cover(3, () => {
    const rendered = renderSiteSelector(api, {
      label: 'Cambiar sede',
      confirmedSiteId: 'site-a',
      options,
      onRequestChange() {},
    });
    includesAll(rendered, ['Centro de Produccion', 'Vento Cafe', 'Saudo'], 'multiple options');
  });

  cover(4, () => {
    let calls = 0;
    renderSiteSelector(api, {
      label: 'Cambiar sede',
      confirmedSiteId: null,
      options: [{ id: 'only-site', label: 'Unica sede' }],
      onRequestChange() { calls += 1; },
    });
    assert(calls === 0, 'single option must not auto-emit onRequestChange');
  });

  cover(5, () => {
    const rendered = renderSiteSelector(api, {
      label: 'Cambiar sede',
      confirmedSiteId: 'site-not-visible',
      options: [],
      onRequestChange() {},
    });
    assert(!rendered.includes('site-not-visible'), 'zero options must not synthesize confirmedSiteId as option');
    assert(!rendered.includes('Sin sede'), 'zero options must not invent universal empty-site option');
  });

  cover(6, () => {
    const rendered = renderSiteSelector(api, {
      label: 'Cambiar sede',
      confirmedSiteId: 'site-b',
      options,
      onRequestChange() {},
    });
    assert(rendered.indexOf('Centro de Produccion') < rendered.indexOf('Vento Cafe'), 'option order changed: first/second');
    assert(rendered.indexOf('Vento Cafe') < rendered.indexOf('Saudo'), 'option order changed: second/third');
  });

  cover(7, () => {
    const rendered = renderSiteSelector(api, {
      label: 'Cambiar sede',
      confirmedSiteId: 'site-a',
      options,
      onRequestChange() {},
    });
    includesAll(rendered, ['Centro de Produccion', 'Vento Cafe', 'Saudo'], 'human labels');
  });

  cover(8, () => {
    const rendered = renderSiteSelector(api, {
      label: 'Cambiar sede',
      confirmedSiteId: 'internal-uuid-123',
      options: [{ id: 'internal-uuid-123', label: 'Sede humana' }],
      onRequestChange() {},
    });
    includesAll(rendered, ['value="internal-uuid-123"', '>Sede humana</option>'], 'option id/label separation');
    assert(!rendered.includes('>internal-uuid-123</option>'), 'internal id rendered as visible option label');
  });

  cover(9, () => {
    const calls = [];
    const root = siteSelectorElement(api, {
      label: 'Cambiar sede',
      confirmedSiteId: 'site-a',
      options,
      onRequestChange(siteId) { calls.push(siteId); },
    });
    const select = findElement(root, 'select');
    assert(select, 'native select not found');
    select.props.onChange({ currentTarget: { value: 'site-b' } });
    assert(calls.length === 1 && calls[0] === 'site-b', 'onRequestChange must emit selected site id exactly once');
  });

  cover(10, () => {
    excludesAll(source, ['useState(', 'setActiveSiteId', 'setConfirmedSiteId', 'setContext('], 'authority mutation boundary');
    includesAll(readme, ['solicitud', 'no produce autoridad'], 'request-only semantics');
  });

  cover(11, () => excludesAll(source, ['defaultSiteId'], 'default site boundary'));
  cover(12, () => excludesAll(source, ['options[0]', 'sites[0]', '.at(0)'], 'first-option auto-selection boundary'));
  cover(13, () => excludesAll(source, ['primarySite', 'primary_site'], 'primary site fallback boundary'));
  cover(14, () => excludesAll(source, ['lastSite', 'last_site', 'recentSite'], 'last site fallback boundary'));

  cover(15, () => includesAll(source, ['confirmedSiteId', 'requestedSiteId'], 'confirmed/requested separation'));

  cover(16, () => {
    const rendered = renderSiteSelector(api, {
      label: 'Cambiar sede',
      confirmedSiteId: 'site-a',
      requestedSiteId: 'site-b',
      pending: true,
      pendingLabel: 'Cambio de sede en curso',
      options,
      onRequestChange() {},
    });
    includesAll(rendered, ['<option value="site-b" selected="">Vento Cafe</option>', 'Cambio de sede en curso', 'aria-busy="true"', 'disabled=""'], 'pending request render');
    assert(!rendered.includes('Sede activa'), 'requested site must not be labeled as active');
  });

  cover(17, () => {
    const rendered = renderSiteSelector(api, {
      label: 'Cambiar sede',
      confirmedSiteId: 'site-b',
      options,
      onRequestChange() {},
    });
    includesAll(rendered, ['<option value="site-b" selected="">Vento Cafe</option>'], 'owner-confirmed site update');
    assert(!rendered.includes('data-pending="true"'), 'confirmed transition must clear pending presentation');
  });

  cover(18, () => {
    const rendered = renderSiteSelector(api, {
      label: 'Cambiar sede',
      confirmedSiteId: 'site-a',
      options,
      onRequestChange() {},
    });
    includesAll(rendered, ['<option value="site-a" selected="">Centro de Produccion</option>'], 'rejected transition restores confirmed site');
  });

  cover(19, () => {
    const calls = [];
    const root = siteSelectorElement(api, {
      label: 'Cambiar sede',
      confirmedSiteId: 'site-a',
      requestedSiteId: 'site-b',
      pending: true,
      pendingLabel: 'Validando nueva sede',
      options,
      onRequestChange(siteId) { calls.push(siteId); },
    });
    const select = findElement(root, 'select');
    assert(select?.props.disabled === true, 'pending select must be disabled');
    select.props.onChange({ currentTarget: { value: 'site-b' } });
    assert(calls.length === 0, 'pending transition must suppress equivalent or concurrent requests');
  });

  cover(20, () => {
    const rendered = renderSiteSelector(api, {
      label: 'Cambiar sede',
      confirmedSiteId: 'site-a',
      requestedSiteId: 'site-b',
      pending: true,
      pendingLabel: 'Esperando confirmacion del contexto',
      options,
      onRequestChange() {},
    });
    includesAll(rendered, ['ui-site-selector__pending', 'Esperando confirmacion del contexto'], 'pending text');
  });

  cover(21, () => {
    const rendered = renderSiteSelector(api, {
      label: 'Cambiar sede',
      confirmedSiteId: 'site-a',
      disabled: true,
      options,
      onRequestChange() {},
    });
    includesAll(rendered, ['disabled=""'], 'disabled control');
    excludesAll(source, ['DENY', 'isDenied', 'permissionDenied'], 'disabled authorization boundary');
  });

  cover(22, () => excludesAll(source, ['Sin sede'], 'universal empty-site option boundary'));
  cover(23, () => excludesAll(source, ['document.cookie', 'cookieStore', 'siteCookie'], 'cookie boundary'));
  cover(24, () => excludesAll(source, ['localStorage', 'sessionStorage', 'indexedDB'], 'storage boundary'));
  cover(25, () => excludesAll(source, ['site_id', 'URLSearchParams', 'searchParams', 'useSearchParams'], 'query parameter boundary'));
  cover(26, () => excludesAll(source, ['next/navigation', 'useRouter', 'router.push', 'router.replace', 'location.href'], 'router boundary'));
  cover(27, () => excludesAll(source, ['employee_settings', 'selected_site_id'], 'employee settings boundary'));
  cover(28, () => excludesAll(source, ['@vento/supabase', '@supabase/', 'createClient', '.from('], 'Supabase boundary'));
  cover(29, () => excludesAll(source, ['fetch(', '.rpc(', 'XMLHttpRequest', 'WebSocket', 'axios'], 'network/RPC boundary'));
  cover(30, () => excludesAll(source, ['permission', 'roleCode', 'grant', 'scope', 'authorize', 'authorization'], 'role/permission boundary'));
  cover(31, () => excludesAll(source, ['canSwitchRole', 'isOwner', 'isGeneralManager', 'isAdmin'], 'legacy role gating boundary'));
  cover(32, () => excludesAll(source, ['simulationRole', 'roleOverride', 'isSimulated', 'startSimulation', 'stopSimulation'], 'simulation boundary'));

  cover(33, () => includesAll(readme, ['filtro administrativo', 'no cambia contexto operativo'], 'administrative filter separation'));
  cover(34, () => includesAll(readme, ['SHELL-UI-008', 'AreaSelector', 'selector de area'], 'area selector separation'));
  cover(35, () => includesAll(readme, ['ContextIndicator', 'state="changing"'], 'ContextIndicator composition'));
  cover(36, () => includesAll(readme, ['revalida', 'servidor', 'confirmacion'], 'server-side revalidation boundary'));
  cover(37, () => includesAll(readme, ['invalidar', 'contexto anterior'], 'context invalidation boundary'));
  cover(38, () => includesAll(readme, ['concurrencia', 'cache autoritativo'], 'concurrency boundary'));

  cover(39, () => {
    const rendered = renderSiteSelector(api, {
      label: 'Cambiar sede',
      confirmedSiteId: 'site-a',
      options,
      onRequestChange() {},
    });
    assert(rendered.includes('<select'), 'native select required for native keyboard behavior');
    excludesAll(source, ['role="combobox"', 'onKeyDown=', 'addEventListener'], 'custom keyboard boundary');
  });

  cover(40, () => includesAll(css, ['.ui-site-selector__control:focus-visible', 'outline: 3px solid var(--ui-primary);'], 'focus visible CSS'));

  cover(41, () => {
    const rendered = renderSiteSelector(api, {
      label: 'Cambiar sede',
      confirmedSiteId: 'site-a',
      options,
      onRequestChange() {},
    });
    includesAll(rendered, ['<label', '<span', 'Cambiar sede', '<select'], 'associated label structure');
  });

  cover(42, () => {
    includesAll(css, ['var(--ui-text)', 'var(--ui-surface)', 'var(--ui-border)', 'var(--ui-primary)'], 'theme tokens');
    assert(!/(?:#(?:[0-9a-f]{3,8})\b|rgb\(|rgba\(|hsl\(|hsla\()/iu.test(css), 'SiteSelector CSS must not hardcode colors');
  });

  cover(43, () => includesAll(css, ['max-width: 100%;', 'min-width: 0;', 'overflow-wrap: anywhere;'], 'reflow CSS'));

  cover(44, () => {
    assert(!/(^|\n)\s*height\s*:/u.test(css), 'SiteSelector must not impose fixed height');
    excludesAll(css, ['overflow: hidden;', 'white-space: nowrap;', 'text-overflow: ellipsis;'], 'zoom/clipping boundary');
  });

  cover(45, () => includesAll(css, ['min-height: 44px;', 'touch-action: manipulation;'], 'touch target CSS'));
  cover(46, () => assert(!/:hover\b/u.test(css), 'SiteSelector must not depend on hover'));
  cover(47, () => includesAll(source, ["'use client';", 'onRequestChange'], 'isolated client boundary'));
  cover(48, () => excludesAll(source, ['addEventListener(', 'removeEventListener(', 'document.', 'window.'], 'global listener boundary'));

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
      'packages/contracts',
      'packages/os-context',
      'packages/supabase',
    ]);
    includesAll(readme, ['Consumidores migrados: 0'], 'consumer migration boundary');
  });

  cover(50, () => includesAll(readme, ['rollback', 'SHELL-MIG-*'], 'rollback before legacy retirement'));

  assert(covered.size === 50, `future scenario coverage mismatch: ${covered.size}`);
  for (let number = 1; number <= 50; number += 1) {
    assert(covered.has(number), `future scenario not covered: ${number}`);
  }

  assertGitUnchanged([
    'package.json',
    'package-lock.json',
    'packages/ui-web/package.json',
  ]);

  console.log('PASS: SHELL-UI-007 SiteSelector validated; scenarios=50 native=select authority=request-only consumers=NOT_MIGRATED legacy=UNCHANGED exports=DEFERRED');
}

try {
  main();
} catch (error) {
  console.error('FAIL: SHELL-UI-007 SiteSelector validation failed');
  console.error(error instanceof Error ? error.message : String(error));
  process.exitCode = 1;
}
