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
const componentPath = path.join(packageRoot, 'src', 'ContextIndicator.tsx');
const cssPath = path.join(packageRoot, 'src', 'context-indicator.css');

const SOURCE_CONTRACT_SHA256 = '1c3683ab3c8542b98e0a75062165b4091a9e92653b07794a086e389894ad6fe1';
const STATES = ['resolving', 'active', 'changing', 'stale', 'invalid', 'unavailable'];

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
  assert(blockingDiagnostics.length === 0, 'ContextIndicator transpile diagnostics contain errors');

  const runtimeModule = { exports: {} };
  const localRequire = (specifier) => {
    if (specifier === './context-indicator.css') return {};
    return requireFromRepo(specifier);
  };
  const wrapper = vm.runInThisContext(
    `(function(require,module,exports){${compiled.outputText}\n})`,
    { filename: 'ContextIndicator.runtime.cjs' },
  );
  wrapper(localRequire, runtimeModule, runtimeModule.exports);
  return runtimeModule.exports;
}

function renderContextIndicator(api, props) {
  const React = requireFromRepo('react');
  const { renderToStaticMarkup } = requireFromRepo('react-dom/server');
  return renderToStaticMarkup(React.createElement(api.ContextIndicator, props));
}

function contextIndicatorElement(api, props) {
  return api.ContextIndicator(props);
}

function main() {
  const owner = fs.readFileSync(ownerPath, 'utf8');
  const taskBlock = canonicalTaskBlock(owner, 'SHELL-UI-006');
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
    'export function ContextIndicator',
    'export interface ContextIndicatorProps',
    'export type ContextIndicatorState',
    'export interface ContextIndicatorItem',
    "import './context-indicator.css';",
    "extends Omit<HTMLAttributes<HTMLDivElement>, 'children'>",
    'state: ContextIndicatorState;',
    'stateLabel: string;',
    'items: readonly ContextIndicatorItem[];',
    'readonly label: string;',
    'readonly value: string;',
  ], 'ContextIndicator source');
  includesAll(source, STATES.map((state) => `'${state}'`), 'ContextIndicator state union');
  excludesAll(source, [
    'EffectiveContext',
    'AccessContext',
    'SimulationContext',
    'siteId',
    'areaId',
    'isAdmin',
    'canOperate',
    'bypassApplied',
    'isOnShift',
    'isCheckedIn',
    'isSimulated',
    'isDelegated',
    'variant?:',
    'tone?:',
    'children:',
  ], 'ContextIndicator public API boundary');

  includesAll(readme, [
    'SHELL-UI-006::GLOBAL',
    'src/ContextIndicator.tsx',
    'src/context-indicator.css',
    'scripts/validate-context-indicator.mjs',
    'Consumidores migrados: 0',
  ], 'README materialization');

  const covered = new Set();
  const cover = (number, assertion) => {
    assertion();
    covered.add(number);
  };

  for (let index = 0; index < STATES.length; index += 1) {
    const state = STATES[index];
    cover(index + 1, () => {
      const rendered = renderContextIndicator(api, {
        state,
        stateLabel: `Estado ${state}`,
        items: [],
      });
      includesAll(rendered, [
        'ui-context-indicator',
        `data-context-state="${state}"`,
        `Estado ${state}`,
      ], `${state} render`);
    });
  }

  cover(7, () => {
    for (const state of STATES) {
      const rendered = renderContextIndicator(api, { state, stateLabel: `Label ${state}`, items: [] });
      assert(rendered.includes(`Label ${state}`), `stateLabel missing for ${state}`);
    }
  });

  cover(8, () => {
    const rendered = renderContextIndicator(api, {
      state: 'active',
      stateLabel: 'Contexto vigente',
      items: [{ label: 'Sede activa', value: 'Centro de Produccion' }],
    });
    includesAll(rendered, ['<dl', '<dt', '<dd', 'Sede activa', 'Centro de Produccion'], 'description list semantics');
  });

  cover(9, () => {
    const rendered = renderContextIndicator(api, {
      state: 'active',
      stateLabel: 'Contexto vigente',
      items: [
        { label: 'Primero', value: 'A' },
        { label: 'Segundo', value: 'B' },
        { label: 'Tercero', value: 'C' },
      ],
    });
    assert(rendered.indexOf('Primero') < rendered.indexOf('Segundo'), 'item order changed: first/second');
    assert(rendered.indexOf('Segundo') < rendered.indexOf('Tercero'), 'item order changed: second/third');
  });

  cover(10, () => {
    const rendered = renderContextIndicator(api, { state: 'resolving', stateLabel: 'Resolviendo', items: [] });
    assert(!rendered.includes('<dl'), 'zero items must not invent a description list');
    excludesAll(rendered, ['Sin sede', 'Sin area', 'No disponible por defecto'], 'zero item fallback');
  });

  cover(11, () => {
    const rendered = renderContextIndicator(api, {
      state: 'active',
      stateLabel: 'Vigente',
      items: [
        { label: 'Sede activa', value: 'Centro de Produccion' },
        { label: 'Area activa', value: 'Reposteria' },
        { label: 'Rol operativo', value: 'Bodeguero' },
      ],
    });
    includesAll(rendered, ['Sede activa', 'Area activa', 'Rol operativo'], 'multiple dimensions');
  });

  cover(12, () => {
    const rendered = renderContextIndicator(api, {
      state: 'resolving',
      stateLabel: 'Contexto en resolucion',
      items: [{ label: 'Sede conocida', value: 'Centro de Produccion' }],
    });
    includesAll(rendered, ['Contexto en resolucion', 'Sede conocida', 'Centro de Produccion'], 'known values during resolving');
  });

  cover(13, () => excludesAll(source, ['primarySite', 'primary_site', 'firstSite', 'sites[0]'], 'site fallback boundary'));
  cover(14, () => excludesAll(source, ['URLSearchParams', 'searchParams', 'location.search', 'window.location'], 'URL inference boundary'));
  cover(15, () => excludesAll(source, ['localStorage', 'sessionStorage', 'indexedDB', 'document.cookie'], 'storage inference boundary'));
  cover(16, () => excludesAll(source, ['appName', 'applicationName', 'pathname', 'routeName'], 'application-name inference boundary'));
  cover(17, () => excludesAll(source, ['@vento/supabase', '@supabase/', '.from(', '.rpc(', '.auth', '.storage'], 'Supabase boundary'));
  cover(18, () => excludesAll(source, ['fetch(', 'axios', 'XMLHttpRequest', 'WebSocket'], 'network boundary'));
  cover(19, () => excludesAll(source, ['permission', 'roleCode', 'authorize', 'authorization', 'accessDecision'], 'authorization boundary'));
  cover(20, () => excludesAll(source, ['select', 'option', 'SiteSelector', 'AreaSelector', 'RoleSelector'], 'selector boundary'));
  cover(21, () => excludesAll(source, ['canOperate', 'isAllowed', 'isAuthorized'], 'canOperate boundary'));

  cover(22, () => {
    const rendered = renderContextIndicator(api, {
      state: 'active',
      stateLabel: 'Vigente',
      items: [
        { label: 'Rol base', value: 'Supervisor' },
        { label: 'Rol operativo', value: 'Bodeguero' },
      ],
    });
    includesAll(rendered, ['Rol base', 'Supervisor', 'Rol operativo', 'Bodeguero'], 'role distinction');
  });

  cover(23, () => {
    const rendered = renderContextIndicator(api, {
      state: 'active',
      stateLabel: 'Vigente',
      items: [
        { label: 'Sede activa', value: 'Centro de Produccion' },
        { label: 'Filtro administrativo', value: 'Sede Norte' },
      ],
    });
    includesAll(rendered, ['Sede activa', 'Filtro administrativo'], 'operational/admin distinction');
  });

  cover(24, () => {
    const rendered = renderContextIndicator(api, {
      state: 'active',
      stateLabel: 'Vigente',
      items: [
        { label: 'Turno', value: 'Jornada vigente' },
        { label: 'Check-in', value: 'Iniciado' },
      ],
    });
    includesAll(rendered, ['Turno', 'Jornada vigente', 'Check-in', 'Iniciado'], 'shift/check-in distinction');
  });

  cover(25, () => {
    const rendered = renderContextIndicator(api, {
      state: 'active',
      stateLabel: 'Vigente',
      items: [
        { label: 'Actor', value: 'Carlos' },
        { label: 'Dispositivo', value: 'Tablet barra' },
      ],
    });
    includesAll(rendered, ['Actor', 'Carlos', 'Dispositivo', 'Tablet barra'], 'actor/device distinction');
  });

  cover(26, () => {
    includesAll(readme, ['seleccion solicitada', 'contexto nuevo confirmado'], 'changing authority boundary');
    excludesAll(source, ['requestedSite', 'requestedArea', 'optimisticContext', 'setState('], 'optimistic context boundary');
  });

  cover(27, () => {
    includesAll(css, [
      "[data-context-state='active']",
      "[data-context-state='stale']",
      '.ui-context-indicator__state',
    ], 'active/stale styling');
    includesAll(readme, ['stateLabel', 'no depende solo de color'], 'non-color state distinction');
  });

  cover(28, () => {
    includesAll(css, ["[data-context-state='invalid']", "[data-context-state='unavailable']"], 'invalid/unavailable styling');
    const invalid = renderContextIndicator(api, { state: 'invalid', stateLabel: 'Contexto inconsistente', items: [] });
    const unavailable = renderContextIndicator(api, { state: 'unavailable', stateLabel: 'Contexto no disponible', items: [] });
    assert(invalid !== unavailable, 'invalid and unavailable must remain observably distinct');
  });

  cover(29, () => {
    const rendered = renderContextIndicator(api, { state: 'active', stateLabel: 'Vigente', items: [] });
    assert(!rendered.includes('role="status"'), 'role=status must not be forced');
    assert(!rendered.includes('aria-live='), 'aria-live must not be forced');
  });

  cover(30, () => excludesAll(source, ['autoFocus=', 'autoFocus:', '.focus(', 'tabIndex={0}', 'tabIndex="0"'], 'focus boundary'));

  cover(31, () => includesAll(css, ['min-width: 0;', 'max-width: 100%;', 'overflow-wrap: anywhere;', '@media (max-width: 480px)'], 'reflow CSS'));

  cover(32, () => {
    assert(!/(^|\n)\s*width\s*:\s*\d+(?:px|rem|em)/u.test(css), 'ContextIndicator must not impose fixed width');
    assert(!/(^|\n)\s*height\s*:/u.test(css), 'ContextIndicator must not impose fixed height');
    excludesAll(css, ['overflow: hidden;', 'white-space: nowrap;'], 'zoom and clipping boundary');
  });

  cover(33, () => {
    assert(!/#[0-9a-f]{3,8}\b/iu.test(css), 'ContextIndicator CSS must not hardcode theme colors');
    assert(!/rgb\s*\(/iu.test(css), 'ContextIndicator CSS must not hardcode rgb colors');
    includesAll(css, ['var(--ui-border)', 'var(--ui-muted)', 'var(--ui-success)', 'var(--ui-brand-700)', 'var(--ui-danger)'], 'theme token boundary');
  });

  cover(34, () => {
    assert(contextIndicatorElement(api, { state: 'active', stateLabel: 'Vigente', items: [] }).type === 'div', 'root must be div');
    assert(!/^[\s]*['"]use client['"];?/mu.test(source), 'ContextIndicator must remain server-safe');
    const rendered = renderContextIndicator(api, { state: 'active', stateLabel: 'SSR', items: [] });
    assert(rendered.includes('SSR'), 'server rendering failed');
  });

  cover(35, () => excludesAll(source, ['useState', 'useEffect', 'useReducer', 'useMemo', 'useCallback', 'setTimeout(', 'setInterval('], 'React state/effect boundary'));

  cover(36, () => {
    assert(!source.includes("from './Alert'"), 'ContextIndicator must not absorb Alert');
    includesAll(readme, ['Alert', 'responsabilidades distintas'], 'Alert composition boundary');
  });

  cover(37, () => {
    excludesAll(source, ['isSimulated', 'SimulationContext', 'SimulatedRoleNotice'], 'simulation absorption boundary');
    includesAll(readme, ['SimulatedRoleNotice', 'no lo absorbe'], 'simulation composition boundary');
  });

  cover(38, () => {
    excludesAll(source, ['SiteSelector', 'AreaSelector', 'onSiteChange', 'onAreaChange'], 'selector composition boundary');
    includesAll(readme, ['seleccion solicitada', 'contexto nuevo confirmado'], 'selector confirmation boundary');
  });

  cover(39, () => {
    excludesAll(source, ['email', 'phone', 'documentNumber', 'sessionToken', 'accessToken', 'refreshToken'], 'privacy field boundary');
    includesAll(readme, ['minimizacion', 'datos tecnicos o privados'], 'privacy documentation');
  });

  cover(40, () => {
    includesAll(readme, ['paridad por consumidor', 'antes de retiro legacy', 'Consumidores migrados: 0'], 'consumer parity deferral');
    assertGitUnchanged([
      'package.json',
      'package-lock.json',
      'packages/ui-web/package.json',
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
      'src/components/ui',
      'templates/app-shell-standard',
      'packages/contracts',
      'packages/os-context',
      'packages/supabase',
    ]);
  });

  includesAll(css, [
    '.ui-context-indicator',
    '.ui-context-indicator__state',
    '.ui-context-indicator__items',
    '.ui-context-indicator__item',
    '.ui-context-indicator__label',
    '.ui-context-indicator__value',
  ], 'ContextIndicator CSS');
  excludesAll(source, [
    'window.',
    'document.',
    'next/navigation',
    'next/router',
    'react-router',
    '@vento/os-context',
    '@vento/contracts',
    '@vento/supabase',
  ], 'runtime dependency boundary');
  includesAll(readme, [
    'exports publicos permanecen diferidos',
    'Consumidores migrados: 0',
    'SHELL-UI-007',
  ], 'README deferred boundaries');

  assert(covered.size === 40, `scenario coverage count mismatch: ${covered.size}`);
  for (let number = 1; number <= 40; number += 1) {
    assert(covered.has(number), `scenario ${number} not covered`);
  }

  console.log('PASS: SHELL-UI-006 ContextIndicator validated; scenarios=40 states=6 root=DIV list=DL order=PRESERVED ssr=SAFE consumers=NOT_MIGRATED legacy=UNCHANGED exports=DEFERRED');
}

try {
  main();
} catch (error) {
  console.error(`FAIL: SHELL-UI-006 ContextIndicator validation: ${error instanceof Error ? error.message : String(error)}`);
  process.exitCode = 1;
}
