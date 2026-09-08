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
const componentPath = path.join(packageRoot, 'src', 'AreaSelector.tsx');
const cssPath = path.join(packageRoot, 'src', 'area-selector.css');

const SOURCE_CONTRACT_SHA256 = 'e6b6aaa5d5921590d846bef268d6b905c1e084b72143f22fbc46942ac02e16c2';

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
  assert(blockingDiagnostics.length === 0, 'AreaSelector transpile diagnostics contain errors');

  const runtimeModule = { exports: {} };
  const localRequire = (specifier) => {
    if (specifier === './area-selector.css') return {};
    return requireFromRepo(specifier);
  };
  const wrapper = vm.runInThisContext(
    `(function(require,module,exports){${compiled.outputText}\n})`,
    { filename: 'AreaSelector.runtime.cjs' },
  );
  wrapper(localRequire, runtimeModule, runtimeModule.exports);
  return runtimeModule.exports;
}

function renderAreaSelector(api, props) {
  const React = requireFromRepo('react');
  const { renderToStaticMarkup } = requireFromRepo('react-dom/server');
  return renderToStaticMarkup(React.createElement(api.AreaSelector, props));
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

function areaSelectorElement(api, props) {
  return api.AreaSelector(props);
}

function main() {
  const owner = fs.readFileSync(ownerPath, 'utf8');
  const taskBlock = canonicalTaskBlock(owner, 'SHELL-UI-008');
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
    'export function AreaSelector',
    'export interface AreaSelectorProps',
    'export interface AreaSelectorOption',
    "import './area-selector.css';",
    'SelectHTMLAttributes<HTMLSelectElement>',
    'label: string;',
    'confirmedAreaId: string | null;',
    'requestedAreaId?: string | null;',
    'options: readonly AreaSelectorOption[];',
    'onRequestChange: (areaId: string) => void;',
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
  ], 'AreaSelector source');

  excludesAll(source, [
    'defaultAreaId',
    'primaryAreaId',
    'lastAreaId',
    'preferredAreaId',
    'deviceAreaId',
    'firstEligibleAreaId',
    'siteId',
    'areaKind',
    'effectiveContext',
    'accessContext',
    'EffectiveContext',
    'AccessContext',
    'permissionCode',
    'canOperate',
    'AreaSelectorState',
    'variant?:',
    'tone?:',
    'fullWidth',
  ], 'AreaSelector public API boundary');

  includesAll(readme, [
    'SHELL-UI-008::GLOBAL',
    'src/AreaSelector.tsx',
    'src/area-selector.css',
    'scripts/validate-area-selector.mjs',
    'confirmedAreaId',
    'requestedAreaId',
    'onRequestChange',
    'Consumidores migrados: 0',
  ], 'README materialization');

  const options = [
    { id: 'area-a', label: 'Panaderia' },
    { id: 'area-b', label: 'Reposteria' },
    { id: 'area-c', label: 'Cocina' },
  ];

  const covered = new Set();
  const cover = (number, assertion) => {
    assertion();
    covered.add(number);
  };

  cover(1, () => {
    const rendered = renderAreaSelector(api, {
      label: 'Cambiar area',
      confirmedAreaId: 'area-a',
      options,
      onRequestChange() {},
    });
    includesAll(rendered, ['<select', '<option value="area-a" selected="">Panaderia</option>'], 'confirmed area render');
  });

  cover(2, () => {
    const rendered = renderAreaSelector(api, {
      label: 'Seleccionar area',
      confirmedAreaId: null,
      placeholderLabel: 'Selecciona un area',
      options,
      onRequestChange() {},
    });
    includesAll(rendered, ['<option value="" disabled="" selected="">Selecciona un area</option>'], 'null confirmed area placeholder');
  });

  cover(3, () => {
    const rendered = renderAreaSelector(api, {
      label: 'Cambiar area',
      confirmedAreaId: 'area-a',
      options,
      onRequestChange() {},
    });
    includesAll(rendered, ['Panaderia', 'Reposteria', 'Cocina'], 'multiple options');
  });

  cover(4, () => {
    let calls = 0;
    renderAreaSelector(api, {
      label: 'Cambiar area',
      confirmedAreaId: null,
      options: [{ id: 'only-area', label: 'Area unica' }],
      onRequestChange() { calls += 1; },
    });
    assert(calls === 0, 'single option must not auto-confirm or auto-emit');
  });

  cover(5, () => {
    const rendered = renderAreaSelector(api, {
      label: 'Cambiar area',
      confirmedAreaId: 'area-not-visible',
      options: [],
      onRequestChange() {},
    });
    assert(!rendered.includes('area-not-visible'), 'zero options must not synthesize confirmedAreaId as option');
    assert(!rendered.includes('Sin area'), 'zero options must not invent universal empty-area option');
  });

  cover(6, () => {
    const rendered = renderAreaSelector(api, {
      label: 'Cambiar area',
      confirmedAreaId: 'area-b',
      options,
      onRequestChange() {},
    });
    assert(rendered.indexOf('Panaderia') < rendered.indexOf('Reposteria'), 'option order changed: first/second');
    assert(rendered.indexOf('Reposteria') < rendered.indexOf('Cocina'), 'option order changed: second/third');
  });

  cover(7, () => {
    const rendered = renderAreaSelector(api, {
      label: 'Cambiar area operativa',
      confirmedAreaId: 'area-a',
      options,
      onRequestChange() {},
    });
    includesAll(rendered, ['<label', '<span', 'Cambiar area operativa', 'Panaderia', 'Reposteria'], 'human label and options');
  });

  cover(8, () => {
    const calls = [];
    const root = areaSelectorElement(api, {
      label: 'Cambiar area',
      confirmedAreaId: 'area-a',
      options,
      onRequestChange(areaId) { calls.push(areaId); },
    });
    const select = findElement(root, 'select');
    assert(select, 'native select not found');
    select.props.onChange({ currentTarget: { value: 'area-b' } });
    assert(calls.length === 1 && calls[0] === 'area-b', 'selection must emit exactly one area intent');
  });

  cover(9, () => {
    excludesAll(source, ['useState(', 'setConfirmedAreaId', 'setActiveAreaId', 'setContext('], 'confirmed authority mutation boundary');
    includesAll(readme, ['emite una solicitud de cambio', 'no produce autoridad'], 'request-only semantics');
  });

  cover(10, () => {
    const rendered = renderAreaSelector(api, {
      label: 'Cambiar area',
      confirmedAreaId: 'area-a',
      requestedAreaId: 'area-b',
      pending: true,
      pendingLabel: 'Cambio de area en curso',
      options,
      onRequestChange() {},
    });
    includesAll(rendered, ['<option value="area-b" selected="">Reposteria</option>', 'Cambio de area en curso'], 'requested area separation');
    assert(!rendered.includes('Area activa'), 'requested area must not be labeled as active');
  });

  cover(11, () => {
    const rendered = renderAreaSelector(api, {
      label: 'Cambiar area',
      confirmedAreaId: 'area-a',
      requestedAreaId: 'area-b',
      pending: true,
      pendingLabel: 'Validando nueva area',
      options,
      onRequestChange() {},
    });
    includesAll(rendered, ['ui-area-selector__pending', 'Validando nueva area', 'aria-busy="true"', 'disabled=""'], 'pending perceptibility');
  });

  cover(12, () => {
    includesAll(readme, ['no sustituye `confirmedAreaId` como autoridad', 'ContextIndicator state="changing"'], 'pending not active boundary');
  });

  cover(13, () => {
    const rendered = renderAreaSelector(api, {
      label: 'Cambiar area',
      confirmedAreaId: 'area-a',
      disabled: true,
      options,
      onRequestChange() {},
    });
    includesAll(rendered, ['disabled=""'], 'disabled control');
    excludesAll(source, ['DENY', 'isDenied', 'permissionDenied'], 'disabled authorization boundary');
  });

  cover(14, () => {
    const calls = [];
    const root = areaSelectorElement(api, {
      label: 'Cambiar area',
      confirmedAreaId: null,
      placeholderLabel: 'Selecciona un area',
      options,
      onRequestChange(areaId) { calls.push(areaId); },
    });
    const select = findElement(root, 'select');
    assert(select, 'native select not found for placeholder test');
    select.props.onChange({ currentTarget: { value: '' } });
    assert(calls.length === 0, 'placeholder must not emit authority or business intent');
  });

  cover(15, () => excludesAll(source, ['defaultAreaId'], 'default area boundary'));
  cover(16, () => excludesAll(source, ['options[0]', 'areas[0]', '.at(0)'], 'first-option auto-selection boundary'));
  cover(17, () => excludesAll(source, ['lastArea', 'last_area', 'previousArea', 'recentArea'], 'previous-area fallback boundary'));
  cover(18, () => excludesAll(source, ['deviceArea', 'device_area', 'stationArea'], 'device-area fallback boundary'));
  cover(19, () => excludesAll(source, ['area_kind', 'areaKind'], 'area-kind inference boundary'));
  cover(20, () => excludesAll(source, ['option.label ===', 'find((option) => option.label', 'toLowerCase()', 'localeCompare('], 'area-name inference boundary'));
  cover(21, () => excludesAll(source, ['area_id', 'URLSearchParams', 'searchParams', 'useSearchParams', 'location.search'], 'URL/query boundary'));
  cover(22, () => excludesAll(source, ['localStorage', 'sessionStorage', 'indexedDB'], 'storage boundary'));
  cover(23, () => excludesAll(source, ['document.cookie', 'cookieStore', 'areaCookie'], 'cookie boundary'));
  cover(24, () => excludesAll(source, ['useState(', 'selected_area_id', 'employee_settings', 'persistArea'], 'persistence boundary'));
  cover(25, () => excludesAll(source, ['@vento/supabase', '@supabase/', 'createClient', '.from('], 'Supabase boundary'));
  cover(26, () => excludesAll(source, ['.rpc(', 'fetch(', 'XMLHttpRequest', 'WebSocket', 'axios'], 'RPC/network boundary'));
  cover(27, () => excludesAll(source, ['permission', 'roleCode', 'grant', 'scope', 'authorize', 'authorization', 'canOperate'], 'permission boundary'));

  cover(28, () => includesAll(readme, ['filtro administrativo de area', 'no cambia contexto operativo'], 'administrative filter separation'));
  cover(29, () => includesAll(readme, ['cambio confirmado de sede puede invalidar el area anterior', 'no la conserva como fallback'], 'site-change invalidation'));
  cover(30, () => includesAll(readme, ['`SiteSelector` y `AreaSelector` pueden coexistir', 'coordinacion sede-area'], 'SiteSelector composition'));
  cover(31, () => includesAll(readme, ['ContextIndicator state="changing"', 'contexto confirmado'], 'ContextIndicator composition'));
  cover(32, () => includesAll(readme, ['estaciones compartidas o multi-area', 'se calcula externamente'], 'shared-station external options'));
  cover(33, () => includesAll(readme, ['allowed areas del dispositivo', 'limite externo, no una concesion de autoridad'], 'device allowed-areas boundary'));
  cover(34, () => includesAll(readme, ['Al cambiar de actor', 'descarta cualquier intencion de area incompatible'], 'actor-change reset boundary'));
  cover(35, () => {
    includesAll(readme, ['volver obsoleta una solicitud', 'no aplica resultados obsoletos por su cuenta'], 'stale request boundary');
    excludesAll(source, ['useState(', 'useReducer(', 'requestHistory', 'pendingRequestRef'], 'stale internal state boundary');
  });
  cover(36, () => {
    includesAll(readme, ['no crea una cola offline de cambios', 'no mantiene cache de elegibilidad'], 'offline queue boundary');
    excludesAll(source, ['navigator.onLine', 'retry', 'setTimeout(', 'setInterval(', 'queue'], 'offline/retry source boundary');
  });

  cover(37, () => {
    const rendered = renderAreaSelector(api, {
      label: 'Cambiar area',
      confirmedAreaId: 'area-a',
      options,
      onRequestChange() {},
    });
    assert(rendered.includes('<select'), 'native select required for native keyboard behavior');
    excludesAll(source, ['role="combobox"', 'onKeyDown=', 'addEventListener'], 'custom keyboard boundary');
  });

  cover(38, () => includesAll(css, ['.ui-area-selector__control:focus-visible', 'outline: 3px solid var(--ui-primary);'], 'focus visible CSS'));

  cover(39, () => {
    const rendered = renderAreaSelector(api, {
      label: 'Cambiar area',
      confirmedAreaId: 'area-a',
      options,
      onRequestChange() {},
    });
    includesAll(rendered, ['<label', '<span', 'Cambiar area', '<select'], 'associated accessible label structure');
  });

  cover(40, () => includesAll(css, ['max-width: 100%;', 'min-width: 0;', 'overflow-wrap: anywhere;'], 'reflow CSS'));

  cover(41, () => {
    assert(!/(^|\n)\s*height\s*:/u.test(css), 'AreaSelector must not impose fixed height');
    excludesAll(css, ['overflow: hidden;', 'white-space: nowrap;', 'text-overflow: ellipsis;'], 'zoom/clipping boundary');
  });

  cover(42, () => {
    includesAll(css, ['var(--ui-text)', 'var(--ui-surface)', 'var(--ui-border)', 'var(--ui-primary)'], 'theme tokens');
    assert(!/(?:#(?:[0-9a-f]{3,8})\b|rgb\(|rgba\(|hsl\(|hsla\()/iu.test(css), 'AreaSelector CSS must not hardcode colors');
  });

  cover(43, () => includesAll(css, ['min-height: 44px;', 'touch-action: manipulation;'], 'touch target CSS'));

  cover(44, () => {
    includesAll(readme, ['estado pendiente textual', 'no depende de hover'], 'non-color pending/accessibility boundary');
    assert(!/:hover\b/u.test(css), 'AreaSelector must not depend on hover');
  });

  cover(45, () => {
    const rendered = renderAreaSelector(api, {
      label: 'Cambiar area',
      confirmedAreaId: 'area-a',
      options,
      onRequestChange() {},
    });
    includesAll(source, ["'use client';", 'onRequestChange'], 'minimal client boundary');
    includesAll(rendered, ['<select', 'Panaderia'], 'server composition render safety');
    excludesAll(source, ['useEffect(', 'document.', 'window.'], 'client-effect boundary');
  });

  cover(46, () => excludesAll(source, ['@vento/os-context', 'resolveEffectiveContext', 'resolveAccessContext'], 'os-context runtime dependency boundary'));
  cover(47, () => excludesAll(source, ['EffectiveContext', 'effectiveContext', 'AccessContext', 'accessContext'], 'EffectiveContext public API boundary'));
  cover(48, () => includesAll(readme, ['superficie de bloqueo', 'no puede reutilizar el selector como bypass'], 'blocking bypass boundary'));

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
      'packages/contracts',
      'packages/os-context',
      'packages/supabase',
    ]);
    includesAll(readme, ['paridad', 'Consumidores migrados: 0'], 'consumer migration boundary');
  });

  cover(50, () => includesAll(readme, ['rollback verificable', 'SHELL-MIG-*'], 'rollback before legacy retirement'));

  assert(covered.size === 50, `future scenario coverage mismatch: ${covered.size}`);
  for (let number = 1; number <= 50; number += 1) {
    assert(covered.has(number), `future scenario not covered: ${number}`);
  }

  assertGitUnchanged([
    'package.json',
    'package-lock.json',
    'packages/ui-web/package.json',
  ]);

  console.log('PASS: SHELL-UI-008 AreaSelector validated; scenarios=50 native=select authority=request-only options=EXTERNAL consumers=NOT_MIGRATED legacy=NOT_INFERRED exports=DEFERRED');
}

try {
  main();
} catch (error) {
  console.error('FAIL: SHELL-UI-008 AreaSelector validation failed');
  console.error(error instanceof Error ? error.message : String(error));
  process.exitCode = 1;
}
