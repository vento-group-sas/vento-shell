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
const componentPath = path.join(packageRoot, 'src', 'EmptyState.tsx');
const cssPath = path.join(packageRoot, 'src', 'empty-state.css');

const SOURCE_CONTRACT_SHA256 = 'e97e013f81129982b309ef6aa0be712fa802ee7ffeb2b4cbc78025a9b361d8af';

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
  assert(blockingDiagnostics.length === 0, 'EmptyState transpile diagnostics contain errors');

  const runtimeModule = { exports: {} };
  const localRequire = (specifier) => {
    if (specifier === './empty-state.css') return {};
    return requireFromRepo(specifier);
  };
  const wrapper = vm.runInThisContext(
    `(function(require,module,exports){${compiled.outputText}\n})`,
    { filename: 'EmptyState.runtime.cjs' },
  );
  wrapper(localRequire, runtimeModule, runtimeModule.exports);
  return runtimeModule.exports;
}

function renderEmptyState(api, props) {
  const React = requireFromRepo('react');
  const { renderToStaticMarkup } = requireFromRepo('react-dom/server');
  return renderToStaticMarkup(React.createElement(api.EmptyState, props));
}

function emptyStateElement(api, props) {
  return api.EmptyState(props);
}

function main() {
  const owner = fs.readFileSync(ownerPath, 'utf8');
  const taskBlock = canonicalTaskBlock(owner, 'SHELL-UI-005');
  const packageJson = JSON.parse(fs.readFileSync(packagePath, 'utf8'));
  const readme = fs.readFileSync(readmePath, 'utf8');
  const source = fs.readFileSync(componentPath, 'utf8');
  const css = fs.readFileSync(cssPath, 'utf8');
  const api = loadRuntime(source);
  const React = requireFromRepo('react');

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
    'export function EmptyState',
    'export interface EmptyStateProps',
    "import './empty-state.css';",
    "extends Omit<HTMLAttributes<HTMLDivElement>, 'title'>",
    'title: ReactNode;',
    'description?: ReactNode;',
    'icon?: ReactNode;',
    'action?: ReactNode;',
  ], 'EmptyState source');
  excludesAll(source, [
    'EmptyStateVariant',
    'EmptyStateKind',
    'EmptyStateStatus',
    'EmptyStateAction',
    'EmptyStateIcon',
    'EmptyStateProvider',
    'EmptyStateContext',
    'cta?:',
    'href?:',
    'to?:',
    'variant?:',
    'kind?:',
    'status?:',
    'size?:',
    'density?:',
  ], 'EmptyState public API boundary');
  includesAll(readme, [
    'SHELL-UI-005::GLOBAL',
    'src/EmptyState.tsx',
    'src/empty-state.css',
    'scripts/validate-empty-state.mjs',
  ], 'README materialization');

  const covered = new Set();
  const cover = (number, assertion) => {
    assertion();
    covered.add(number);
  };

  cover(1, () => {
    const rendered = renderEmptyState(api, { title: 'Sin registros' });
    includesAll(rendered, ['ui-empty-state-root', 'ui-empty-state__title', 'Sin registros'], 'title-only render');
  });
  cover(2, () => {
    const rendered = renderEmptyState(api, { title: 'Sin registros', description: 'No hay elementos para este alcance.' });
    includesAll(rendered, ['ui-empty-state__description', 'No hay elementos para este alcance.'], 'description render');
  });
  cover(3, () => assert(!renderEmptyState(api, { title: 'Sin icono' }).includes('ui-empty-state__icon'), 'icon must remain optional'));
  cover(4, () => {
    const icon = React.createElement('svg', { 'data-icon': 'sample' });
    const rendered = renderEmptyState(api, { title: 'Con icono', icon });
    includesAll(rendered, ['ui-empty-state__icon', 'data-icon="sample"'], 'icon render');
  });
  cover(5, () => assert(!renderEmptyState(api, { title: 'Sin accion' }).includes('ui-empty-state__action'), 'action must remain optional'));
  cover(6, () => {
    const action = React.createElement('button', { type: 'button' }, 'Crear');
    const rendered = renderEmptyState(api, { title: 'Vacio', action });
    includesAll(rendered, ['ui-empty-state__action', '<button type="button">Crear</button>'], 'action composition');
  });
  cover(7, () => {
    const action = React.createElement('button', { type: 'button', className: 'ui-button' }, 'Crear');
    const rendered = renderEmptyState(api, { title: 'Vacio', action });
    assert(rendered.includes('<button type="button" class="ui-button">Crear</button>'), 'Button semantics not preserved');
    assert(!source.includes("from './Button'"), 'EmptyState must not absorb Button');
  });
  cover(8, () => {
    const action = React.createElement('a', { href: '/owner-route' }, 'Abrir');
    const rendered = renderEmptyState(api, { title: 'Vacio', action });
    assert(rendered.includes('<a href="/owner-route">Abrir</a>'), 'Link semantics not preserved');
    excludesAll(source, ['next/link', 'next/navigation', 'next/router', 'useRouter'], 'router boundary');
  });
  cover(9, () => {
    const rendered = renderEmptyState(api, { title: 'Vacio', id: 'empty-id', 'data-test': 'empty' });
    includesAll(rendered, ['id="empty-id"', 'data-test="empty"'], 'HTML/data forwarding');
  });
  cover(10, () => assert(renderEmptyState(api, { title: 'Vacio', 'aria-label': 'Estado vacio' }).includes('aria-label="Estado vacio"'), 'ARIA forwarding missing'));
  cover(11, () => assert(renderEmptyState(api, { title: 'Vacio', className: 'consumer-empty' }).includes('ui-empty-state-root consumer-empty'), 'className composition missing'));
  cover(12, () => {
    const rendered = renderEmptyState(api, { title: '' });
    excludesAll(rendered, ['No hay datos', 'Sin datos', 'No data'], 'fallback copy boundary');
    excludesAll(source, ['No hay datos', 'Sin datos', 'No data'], 'fallback source boundary');
  });
  cover(13, () => assert(!renderEmptyState(api, { title: 'Vacio' }).includes('role="alert"'), 'role=alert must not be forced'));
  cover(14, () => assert(!renderEmptyState(api, { title: 'Vacio' }).includes('aria-live='), 'aria-live must not be forced'));
  cover(15, () => assert(!renderEmptyState(api, { title: 'Vacio' }).includes('tabindex='), 'root must not enter tab order'));
  cover(16, () => excludesAll(source, ['autoFocus=', 'autoFocus:', '.focus('], 'focus automation boundary'));
  cover(17, () => {
    const icon = React.createElement('svg', { 'aria-label': 'Decorative candidate' });
    const rendered = renderEmptyState(api, { title: 'Texto suficiente', icon });
    assert(rendered.includes('ui-empty-state__icon" aria-hidden="true"'), 'icon wrapper must be decorative');
  });
  cover(18, () => assert(renderEmptyState(api, { title: 'Significado textual' }).includes('Significado textual'), 'meaning must survive without icon'));
  cover(19, () => includesAll(css, ['min-width: 0;', 'max-width: 100%;', 'overflow-wrap: anywhere;'], 'reflow CSS'));
  cover(20, () => {
    assert(!/(^|\n)\s*width\s*:/u.test(css), 'EmptyState must not impose fixed width');
    assert(!/(^|\n)\s*height\s*:/u.test(css), 'EmptyState must not impose fixed height');
    assert(!/(^|\n)\s*min-height\s*:/u.test(css), 'EmptyState must not impose minimum height');
    excludesAll(css, ['overflow: hidden;', 'white-space: nowrap;'], 'zoom and clipping boundary');
  });
  cover(21, () => {
    assert(emptyStateElement(api, { title: 'Vacio' }).type === 'div', 'EmptyState root must be div');
    assert(!/^[\s]*['"]use client['"];?/mu.test(source), 'EmptyState must remain server-safe');
    excludesAll(source, ['window.', 'document.', 'useState', 'useEffect', 'useReducer'], 'server-safe boundary');
  });
  cover(22, () => {
    const action = React.createElement('button', { type: 'button' }, 'Accion cliente');
    assert(renderEmptyState(api, { title: 'Vacio', action }).includes('Accion cliente'), 'client-composable action missing');
  });
  cover(23, () => excludesAll(source, ['@vento/supabase', '@supabase/', '.from(', '.rpc(', '.auth', '.storage'], 'Supabase boundary'));
  cover(24, () => excludesAll(source, ['next/navigation', 'next/router', 'react-router', 'useRouter', 'Link'], 'router boundary'));
  cover(25, () => excludesAll(source, ['fetch(', 'axios', 'XMLHttpRequest', 'WebSocket'], 'network boundary'));
  cover(26, () => excludesAll(source, ['setTimeout(', 'setInterval(', 'requestAnimationFrame('], 'timer boundary'));
  cover(27, () => excludesAll(source, ['localStorage', 'sessionStorage', 'indexedDB', 'document.cookie'], 'persistence boundary'));
  cover(28, () => excludesAll(source, ['@vento/os-context', 'permission', 'roleCode', 'EffectiveContext', 'session'], 'authorization boundary'));
  cover(29, () => {
    // Class-name composition is not domain-level filter inference.
    const inferenceSource = source.replace("values.filter(Boolean).join(' ')", '');
    excludesAll(inferenceSource, ['filter', 'searchParams', 'URLSearchParams', 'rows.length', 'items.length'], 'filter inference boundary');
  });
  cover(30, () => includesAll(readme, ['ausencia confirmada', 'consulta o inicializacion exitosa', 'alcance ya resuelto'], 'base empty entry condition'));
  cover(31, () => includesAll(readme, ['vacio filtrado', 'no afirma inexistencia global'], 'filtered empty distinction'));
  cover(32, () => includesAll(readme, ['filtros activos', 'superficie propietaria'], 'filter ownership'));
  cover(33, () => includesAll(readme, ['error de carga', 'no es EmptyState'], 'error boundary'));
  cover(34, () => includesAll(readme, ['loading', 'no representa carga'], 'loading boundary'));
  cover(35, () => includesAll(readme, ['resultado parcial', 'resultado desconocido'], 'partial/unknown boundary'));
  cover(36, () => includesAll(readme, ['denegacion de permiso', 'no es una coleccion vacia'], 'permission boundary'));
  cover(37, () => includesAll(readme, ['masking', 'existencia o conteo'], 'privacy/masking boundary'));
  cover(38, () => includesAll(readme, ['ausencia de seleccion', 'contexto operativo obligatorio'], 'selection/context distinction'));
  cover(39, () => includesAll(readme, ['cola despejada', 'completa y suficientemente fresca'], 'cleared queue boundary'));
  cover(40, () => includesAll(readme, ['ausencia de trabajo para el actor', 'autoasigna'], 'actor work boundary'));
  cover(41, () => includesAll(readme, ['primer registro', 'actor elegible'], 'first record action boundary'));
  cover(42, () => {
    excludesAll(css, ['.ui-empty-state {'], 'legacy exact selector boundary');
    includesAll(readme, ['`.ui-empty-state`', 'legacy', 'sin migrar consumidores'], 'legacy empty-state deferral');
  });
  cover(43, () => {
    excludesAll(css, ['.ui-empty {'], 'legacy lightweight selector boundary');
    includesAll(readme, ['`.ui-empty`', 'title-only'], 'legacy lightweight classification');
  });
  cover(44, () => includesAll(readme, ['reclasificacion', 'error'], 'legacy error reclassification'));
  cover(45, () => includesAll(readme, ['permiso o contexto', 'reclasificacion'], 'legacy permission/context reclassification'));
  cover(46, () => includesAll(readme, ['ORIGO proveedores', 'vacio base', 'vacio filtrado'], 'ORIGO providers evidence'));
  cover(47, () => includesAll(readme, ['ORIGO ordenes', 'filtros activos', 'ausencia global'], 'ORIGO orders evidence'));
  cover(48, () => includesAll(readme, ['FOGO', 'title-only', 'icono obligatorio'], 'FOGO evidence'));
  cover(49, () => includesAll(readme, ['paridad por consumidor', 'antes de retiro legacy'], 'consumer parity deferral'));
  cover(50, () => {
    includesAll(readme, ['rollback independiente', 'SHELL-MIG-*'], 'rollback deferral');
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
      'src/components/ui',
      'templates/app-shell-standard',
      'packages/contracts',
      'packages/os-context',
      'packages/supabase',
    ]);
  });

  includesAll(css, [
    '.ui-empty-state-root',
    '.ui-empty-state__icon',
    '.ui-empty-state__title',
    '.ui-empty-state__description',
    '.ui-empty-state__action',
    'var(--ui-muted)',
  ], 'EmptyState CSS');
  assert(!/#[0-9a-f]{3,8}\b/iu.test(css), 'EmptyState CSS must not hardcode theme colors');
  assert(!/rgb\s*\(/iu.test(css), 'EmptyState CSS must not hardcode rgb colors');
  excludesAll(css, ['background:', 'border:', 'box-shadow:', 'backdrop-filter', 'backdrop-blur'], 'Card independence boundary');
  excludesAll(source, ['onKeyDown=', 'onKeyUp=', 'onKeyPress=', 'onClick={()', 'role="button"'], 'non-interactive root boundary');
  includesAll(readme, [
    'sin `variant`, `kind`, `status`, `size` ni `density`',
    'sin `cta`, `href`, `to` ni router propios',
    'sin Card interna obligatoria',
    'sin Supabase, sesion, permisos, contexto, red, timers ni persistencia',
    'valores fisicos actuales son detalles internos',
    'exports publicos permanecen diferidos',
    'Consumidores migrados: 0',
  ], 'README boundaries');

  assert(covered.size === 50, `scenario coverage count mismatch: ${covered.size}`);
  for (let number = 1; number <= 50; number += 1) {
    assert(covered.has(number), `scenario ${number} not covered`);
  }

  console.log('PASS: SHELL-UI-005 EmptyState validated; scenarios=50 root=DIV title=REQUIRED description=OPTIONAL icon=OPTIONAL action=OPTIONAL ssr=SAFE consumers=NOT_MIGRATED legacy=UNCHANGED exports=DEFERRED');
}

try {
  main();
} catch (error) {
  console.error(`FAIL: SHELL-UI-005 EmptyState validation: ${error instanceof Error ? error.message : String(error)}`);
  process.exitCode = 1;
}
