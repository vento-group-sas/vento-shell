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
const cardPath = path.join(packageRoot, 'src', 'Card.tsx');
const cssPath = path.join(packageRoot, 'src', 'card.css');

const SOURCE_CONTRACT_SHA256 = '440686eee94d886a1e73f1606d4a79cffa5c5b311fe5743838ea64ea562a5822';

function canonicalTaskBlock(owner, taskId) {
  const task = parseTaskBlocks(owner).find((entry) => entry.id === taskId) ?? null;
  assert(task, `canonical task ${taskId} not found`);
  return task.block;
}

function loadCardRuntime(cardSource) {
  const ts = requireFromRepo('typescript');
  const compiled = ts.transpileModule(cardSource, {
    compilerOptions: {
      target: ts.ScriptTarget.ES2022,
      module: ts.ModuleKind.CommonJS,
      jsx: ts.JsxEmit.ReactJSX,
      esModuleInterop: true,
    },
    fileName: cardPath,
    reportDiagnostics: true,
  });

  const blockingDiagnostics = (compiled.diagnostics ?? []).filter(
    (entry) => entry.category === ts.DiagnosticCategory.Error,
  );
  assert(blockingDiagnostics.length === 0, 'Card transpile diagnostics contain errors');

  const runtimeModule = { exports: {} };
  const localRequire = (specifier) => {
    if (specifier === './card.css') return {};
    return requireFromRepo(specifier);
  };
  const wrapper = vm.runInThisContext(
    `(function(require,module,exports){${compiled.outputText}\n})`,
    { filename: 'Card.runtime.cjs' },
  );
  wrapper(localRequire, runtimeModule, runtimeModule.exports);
  return runtimeModule.exports;
}

function renderCard(api, props) {
  const React = requireFromRepo('react');
  const { renderToStaticMarkup } = requireFromRepo('react-dom/server');
  return renderToStaticMarkup(React.createElement(api.Card, props));
}

function cardElement(api, props) {
  return api.Card(props);
}

function main() {
  const owner = fs.readFileSync(ownerPath, 'utf8');
  const taskBlock = canonicalTaskBlock(owner, 'SHELL-UI-004');
  const packageJson = JSON.parse(fs.readFileSync(packagePath, 'utf8'));
  const readme = fs.readFileSync(readmePath, 'utf8');
  const cardSource = fs.readFileSync(cardPath, 'utf8');
  const css = fs.readFileSync(cssPath, 'utf8');
  const api = loadCardRuntime(cardSource);
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
  includesAll(cardSource, [
    'export function Card',
    'export interface CardProps',
    'export type CardVariant',
    'export type CardPadding',
    "import './card.css';",
    'extends HTMLAttributes<HTMLDivElement>',
  ], 'Card source');
  includesAll(readme, [
    'SHELL-UI-004::GLOBAL',
    'src/Card.tsx',
    'src/card.css',
    'scripts/validate-card.mjs',
  ], 'README materialization');

  const covered = new Set();
  const cover = (number, assertion) => {
    assertion();
    covered.add(number);
  };

  cover(1, () => {
    const rendered = renderCard(api, { children: 'Default' });
    includesAll(rendered, ['ui-card--surface', 'ui-card--padding-md'], 'default Card render');
  });
  cover(2, () => assert(renderCard(api, { variant: 'surface', children: 'Surface' }).includes('ui-card--surface'), 'surface runtime class missing'));
  cover(3, () => assert(renderCard(api, { variant: 'soft', children: 'Soft' }).includes('ui-card--soft'), 'soft runtime class missing'));
  cover(4, () => assert(renderCard(api, { variant: 'raised', children: 'Raised' }).includes('ui-card--raised'), 'raised runtime class missing'));
  cover(5, () => assert(renderCard(api, { padding: 'sm', children: 'Small' }).includes('ui-card--padding-sm'), 'sm padding class missing'));
  cover(6, () => assert(renderCard(api, { padding: 'md', children: 'Medium' }).includes('ui-card--padding-md'), 'md padding class missing'));
  cover(7, () => assert(renderCard(api, { padding: 'lg', children: 'Large' }).includes('ui-card--padding-lg'), 'lg padding class missing'));
  cover(8, () => assert(/'surface'\s*\|\s*'soft'\s*\|\s*'raised'/u.test(cardSource), 'variant union mismatch'));
  cover(9, () => assert(/'sm'\s*\|\s*'md'\s*\|\s*'lg'/u.test(cardSource), 'padding union mismatch'));
  cover(10, () => assert(renderCard(api, { children: 'Readable text' }).includes('Readable text'), 'text children missing'));
  cover(11, () => {
    const child = React.createElement('p', { 'data-child': 'composed' }, 'Composed');
    const rendered = renderCard(api, { children: child });
    includesAll(rendered, ['<p data-child="composed">', 'Composed</p>'], 'composed children');
  });
  cover(12, () => {
    const rendered = renderCard(api, {});
    assert(rendered.startsWith('<div '), 'empty Card root must remain div');
    assert(rendered.endsWith('></div>'), 'empty Card must not invent fallback markup');
  });
  cover(13, () => assert(renderCard(api, { id: 'card-id' }).includes('id="card-id"'), 'id forwarding missing'));
  cover(14, () => assert(renderCard(api, { 'data-test': 'card' }).includes('data-test="card"'), 'data attribute forwarding missing'));
  cover(15, () => assert(renderCard(api, { 'aria-label': 'Summary card' }).includes('aria-label="Summary card"'), 'ARIA forwarding missing'));
  cover(16, () => assert(
    renderCard(api, { className: 'consumer-card' }).includes('ui-card ui-card--surface ui-card--padding-md consumer-card'),
    'base and consumer classes not composed',
  ));
  cover(17, () => assert(renderCard(api, { style: { marginTop: 4 } }).includes('margin-top:4px'), 'style forwarding missing'));
  cover(18, () => assert(cardElement(api, {}).type === 'div', 'Card root must be a div'));
  cover(19, () => assert(!renderCard(api, {}).includes(' role='), 'Card must not force role'));
  cover(20, () => assert(!renderCard(api, {}).includes('tabindex='), 'Card must not force tabIndex'));
  cover(21, () => excludesAll(cardSource, ['autoFocus=', 'autoFocus:', '.focus('], 'focus automation boundary'));
  cover(22, () => excludesAll(cardSource, ['onKeyDown=', 'onKeyUp=', 'onKeyPress='], 'keyboard activation boundary'));
  cover(23, () => excludesAll(cardSource, ['href?:', 'to?:', 'as?:', 'asChild', 'Link'], 'navigation and polymorphism boundary'));
  cover(24, () => excludesAll(cardSource, ['next/navigation', 'next/router', 'react-router', 'useRouter'], 'router boundary'));
  cover(25, () => excludesAll(cardSource, ['fetch(', 'axios', 'XMLHttpRequest', 'WebSocket'], 'network boundary'));
  cover(26, () => excludesAll(cardSource, ['@vento/supabase', '@supabase/', '.from(', '.rpc(', '.auth', '.storage'], 'Supabase boundary'));
  cover(27, () => excludesAll(cardSource, ['@vento/os-context', 'permission', 'roleCode', 'EffectiveContext', 'session'], 'session and authorization boundary'));
  cover(28, () => {
    assert(!/^[\s]*['"]use client['"];?/mu.test(cardSource), 'Card must remain server-safe');
    excludesAll(cardSource, ['window.', 'document.', 'localStorage', 'sessionStorage', 'useState', 'useEffect', 'useReducer'], 'server-safe boundary');
  });
  cover(29, () => {
    const child = React.createElement('button', { type: 'button' }, 'Client action');
    const rendered = renderCard(api, { children: child });
    assert(rendered.includes('<button type="button">Client action</button>'), 'client-composable child semantics not preserved');
  });
  cover(30, () => includesAll(css, ['min-width: 0;', 'max-width: 100%;', 'overflow-wrap: anywhere;'], 'reflow CSS'));
  cover(31, () => {
    assert(!/(^|\n)\s*height\s*:/u.test(css), 'Card must not impose fixed height');
    assert(!/(^|\n)\s*width\s*:/u.test(css), 'Card must not impose fixed width');
    excludesAll(css, ['overflow: hidden;', 'white-space: nowrap;'], 'zoom and clipping boundary');
  });
  cover(32, () => includesAll(css, ['var(--ui-surface)', 'var(--ui-surface-2)', 'var(--ui-border)'], 'theme token usage'));
  cover(33, () => {
    assert(!/#[0-9a-f]{3,8}\b/iu.test(css), 'Card CSS must not hardcode theme colors');
    assert(!/rgb\s*\(/iu.test(css), 'Card CSS must not hardcode rgb theme colors');
  });
  cover(34, () => includesAll(css, ['border: 1px solid var(--ui-border);', 'color: inherit;'], 'surface/content separation'));
  cover(35, () => includesAll(css, ['.ui-card--surface', '.ui-card--soft', '.ui-card--raised'], 'variant CSS differentiation'));
  cover(36, () => {
    const element = cardElement(api, { variant: 'raised' });
    assert(element.type === 'div', 'raised must remain non-interactive div');
    assert(element.props.className.includes('ui-card--raised'), 'raised class missing');
    excludesAll(cardSource, ['interactive?:', 'clickable?:'], 'raised interactivity boundary');
  });
  cover(37, () => {
    const element = cardElement(api, { variant: 'soft' });
    assert(element.props.className.includes('ui-card--soft'), 'soft class missing');
    excludesAll(cardSource, ['disabled?:', 'loading?:', 'selected?:'], 'business state boundary');
  });
  cover(38, () => {
    const child = React.createElement('div', { className: 'ui-alert ui-alert--neutral' }, 'Notice');
    const rendered = renderCard(api, { children: child });
    assert(rendered.includes('ui-alert ui-alert--neutral'), 'Alert composition not preserved');
    assert(!cardSource.includes("from './Alert'"), 'Card must not absorb Alert responsibility');
  });
  cover(39, () => {
    const child = React.createElement('button', { type: 'button', className: 'ui-button' }, 'Action');
    const rendered = renderCard(api, { children: child });
    assert(rendered.includes('<button type="button" class="ui-button">Action</button>'), 'Button composition not preserved');
    assert(!cardSource.includes("from './Button'"), 'Card must not absorb Button responsibility');
  });
  cover(40, () => {
    const child = React.createElement('h2', null, 'Consumer heading');
    assert(renderCard(api, { children: child }).includes('<h2>Consumer heading</h2>'), 'consumer heading semantics not preserved');
  });
  cover(41, () => {
    const child = React.createElement('a', { href: '/owner-route' }, 'Owner navigation');
    const rendered = renderCard(api, { children: child });
    assert(rendered.includes('<a href="/owner-route">Owner navigation</a>'), 'owner native navigation composition missing');
    excludesAll(cardSource, ['onClick={()', 'onClick={', 'role="button"', 'tabIndex={0}'], 'Card activation boundary');
  });
  cover(42, () => {
    assertGitUnchanged(['src/components/ui/Card.tsx', 'src/components/ui/index.ts']);
    includesAll(readme, ['legacy local', 'permanecen intactos'], 'SHELL candidate migration deferral');
  });
  cover(43, () => {
    assertGitUnchanged(['templates/app-shell-standard']);
    includesAll(readme, ['familia `vento/standard`', 'migracion posterior'], 'historical standard migration deferral');
  });
  cover(44, () => includesAll(readme, ['padding fijo `p-6`', 'no crea una cuarta densidad'], 'historical fixed padding classification'));
  cover(45, () => {
    excludesAll(css, ['backdrop-filter', 'backdrop-blur'], 'backdrop blur boundary');
    includesAll(readme, ['`backdrop-blur-xl`', 'no se perpetua'], 'backdrop blur reconciliation');
  });
  cover(46, () => {
    excludesAll(cardSource, ['CardHeader', 'CardTitle', 'CardDescription', 'CardContent', 'CardFooter', 'CardAction'], 'unapproved subcomponent boundary');
    includesAll(readme, ['sin `CardHeader`', '`CardTitle`', '`CardContent`', '`CardFooter`'], 'README subcomponent boundary');
  });
  cover(47, () => includesAll(readme, ['SHELL-CI-*', 'compatibilidad', 'consumidores'], 'consumer compatibility deferral'));
  cover(48, () => includesAll(readme, ['rollback', 'SHELL-MIG-*'], 'consumer rollback deferral'));
  cover(49, () => includesAll(readme, ['componentes `*Card` de dominio', 'no se absorben'], 'domain Card boundary'));
  cover(50, () => {
    includesAll(readme, ['retiro legacy', 'evidencia de uso residual'], 'legacy retirement gate');
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
      'src/components/ui',
      'templates/app-shell-standard',
      'packages/contracts',
      'packages/os-context',
      'packages/supabase',
    ]);
  });

  assert(cardSource.includes("variant = 'surface'"), 'surface default missing');
  assert(cardSource.includes("padding = 'md'"), 'md default missing');
  assert(/children\?:\s*ReactNode/u.test(cardSource), 'children must remain optional ReactNode');
  excludesAll(cardSource, [
    'success',
    'warning',
    'danger',
    'brand',
    'header?:',
    'footer?:',
    'title?:',
    'actions?:',
    'collapsible?:',
    'elevation?:',
    'blur?:',
  ], 'unapproved Card API boundary');
  includesAll(css, [
    '.ui-card--padding-sm',
    '.ui-card--padding-md',
    '.ui-card--padding-lg',
    'box-shadow: var(--ui-shadow-1);',
  ], 'Card density/elevation CSS');

  assert(covered.size === 50, `scenario coverage mismatch: ${covered.size}/50`);
  for (let number = 1; number <= 50; number += 1) {
    assert(covered.has(number), `scenario ${number} not covered`);
  }

  console.log('PASS: SHELL-UI-004 Card validated; scenarios=50 variants=3 paddings=3 root=DIV ssr=SAFE consumers=NOT_MIGRATED legacy=UNCHANGED exports=DEFERRED');
}

try {
  main();
} catch (error) {
  console.error(`FAIL: ${error instanceof Error ? error.message : String(error)}`);
  process.exitCode = 1;
}
