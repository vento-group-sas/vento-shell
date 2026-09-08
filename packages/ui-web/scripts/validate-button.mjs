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
const buttonPath = path.join(packageRoot, 'src', 'Button.tsx');
const cssPath = path.join(packageRoot, 'src', 'button.css');

const SOURCE_CONTRACT_SHA256 = 'd8bcd7ff87d51d7651bd0b946bd487fdc9db81c55af16e6b88a674f4ecbf74c6';

function canonicalTaskBlock(owner, taskId) {
  const task = parseTaskBlocks(owner).find((entry) => entry.id === taskId) ?? null;
  assert(task, `canonical task ${taskId} not found`);
  return task.block;
}

function loadButtonRuntime(buttonSource) {
  const ts = requireFromRepo('typescript');
  const compiled = ts.transpileModule(buttonSource, {
    compilerOptions: {
      target: ts.ScriptTarget.ES2022,
      module: ts.ModuleKind.CommonJS,
      jsx: ts.JsxEmit.ReactJSX,
      esModuleInterop: true,
    },
    fileName: buttonPath,
    reportDiagnostics: true,
  });

  const blockingDiagnostics = (compiled.diagnostics ?? []).filter(
    (entry) => entry.category === ts.DiagnosticCategory.Error,
  );
  assert(blockingDiagnostics.length === 0, 'Button transpile diagnostics contain errors');

  const runtimeModule = { exports: {} };
  const localRequire = (specifier) => {
    if (specifier === './button.css') return {};
    return requireFromRepo(specifier);
  };
  const wrapper = vm.runInThisContext(
    `(function(require,module,exports){${compiled.outputText}\n})`,
    { filename: 'Button.runtime.cjs' },
  );
  wrapper(localRequire, runtimeModule, runtimeModule.exports);
  return runtimeModule.exports;
}

function renderButton(api, props) {
  const React = requireFromRepo('react');
  const { renderToStaticMarkup } = requireFromRepo('react-dom/server');
  return renderToStaticMarkup(React.createElement(api.Button, props));
}

function buttonElement(api, props) {
  return api.Button(props);
}

function main() {
  const owner = fs.readFileSync(ownerPath, 'utf8');
  const taskBlock = canonicalTaskBlock(owner, 'SHELL-UI-003');
  const packageJson = JSON.parse(fs.readFileSync(packagePath, 'utf8'));
  const readme = fs.readFileSync(readmePath, 'utf8');
  const buttonSource = fs.readFileSync(buttonPath, 'utf8');
  const css = fs.readFileSync(cssPath, 'utf8');
  const api = loadButtonRuntime(buttonSource);

  const covered = new Set();
  const cover = (number, assertion) => {
    assertion();
    covered.add(number);
  };

  cover(1, () => assert(sha256(taskBlock) === SOURCE_CONTRACT_SHA256, 'source contract SHA256 mismatch'));
  cover(2, () => includesAll(owner, [
    'EXECUTION-GATE-RECONCILIATION:B001-200:SHELL-UI-001-020',
    '`GLOBAL_ENABLE_ONCE`',
    '`PRE_E5_FOUNDATION`',
    '`<task_id>::GLOBAL`',
  ], 'physical topology reconciliation'));
  cover(3, () => {
    assert(packageJson.name === '@vento/ui-web', 'package name mismatch');
    assert(packageJson.private === true && packageJson.type === 'module', 'package identity mismatch');
  });
  cover(4, () => {
    for (const key of ['version', 'main', 'types', 'exports', 'dependencies', 'devDependencies', 'peerDependencies', 'scripts']) {
      assert(!(key in packageJson), `package public surface must remain deferred: ${key}`);
    }
  });
  cover(5, () => includesAll(buttonSource, [
    'export function Button',
    'export interface ButtonProps',
    'export type ButtonVariant',
    'export type ButtonSize',
  ], 'Button source'));
  cover(6, () => {
    assert(fs.existsSync(cssPath), 'Button CSS missing');
    assert(buttonSource.includes("import './button.css';"), 'Button CSS import missing');
  });
  cover(7, () => includesAll(readme, [
    'SHELL-UI-003::GLOBAL',
    'src/Button.tsx',
    'src/button.css',
    'scripts/validate-button.mjs',
  ], 'README materialization'));
  cover(8, () => assert(
    /'primary'\s*\|\s*'secondary'\s*\|\s*'outline'\s*\|\s*'ghost'\s*\|\s*'danger'/u.test(buttonSource),
    'variant union mismatch',
  ));
  cover(9, () => assert(buttonSource.includes("variant = 'primary'"), 'primary default missing'));
  cover(10, () => assert(/'sm'\s*\|\s*'md'\s*\|\s*'lg'/u.test(buttonSource), 'size union mismatch'));
  cover(11, () => assert(buttonSource.includes("size = 'md'"), 'md default missing'));
  cover(12, () => assert(
    buttonSource.includes('extends ButtonHTMLAttributes<HTMLButtonElement>'),
    'native HTML button attribute contract missing',
  ));
  cover(13, () => assert(/children:\s*ReactNode/u.test(buttonSource), 'children must be required ReactNode'));
  cover(14, () => assert(/loading\?:\s*boolean/u.test(buttonSource), 'loading contract missing'));
  cover(15, () => excludesAll(buttonSource, ['fullWidth', 'full-width'], 'fullWidth boundary'));
  cover(16, () => assert(!/['"]brand['"]/u.test(buttonSource), 'brand variant must not be materialized'));
  cover(17, () => assert(!/['"]success['"]/u.test(buttonSource), 'success variant must not be materialized'));
  cover(18, () => excludesAll(buttonSource, ['href?:', 'to?:', 'asChild', 'prefetch', 'replace?:'], 'link polymorphism boundary'));
  cover(19, () => excludesAll(buttonSource, ['loadingLabel', 'Cargando...'], 'loading copy boundary'));
  cover(20, () => excludesAll(buttonSource, ['iconLeft', 'iconRight', 'leadingIcon', 'trailingIcon'], 'icon prop boundary'));
  cover(21, () => assert(!/^[\s]*['"]use client['"];?/mu.test(buttonSource), 'Button must remain server-safe'));
  cover(22, () => excludesAll(buttonSource, ['window.', 'document.', 'localStorage', 'sessionStorage', 'cookie'], 'browser API boundary'));
  cover(23, () => excludesAll(buttonSource, ['@vento/supabase', '@supabase/', '.from(', '.rpc(', '.auth', '.storage'], 'Supabase boundary'));
  cover(24, () => excludesAll(buttonSource, ['@vento/os-context', 'permission', 'roleCode', 'EffectiveContext'], 'authorization boundary'));
  cover(25, () => excludesAll(buttonSource, ['next/navigation', 'next/router', 'react-router', 'useRouter'], 'router boundary'));
  cover(26, () => excludesAll(buttonSource, ['fetch(', 'axios', 'XMLHttpRequest', 'WebSocket'], 'network boundary'));
  cover(27, () => excludesAll(buttonSource, ['useState', 'useEffect', 'useReducer', 'useSyncExternalStore'], 'state boundary'));
  cover(28, () => assert(renderButton(api, { children: 'Action' }).startsWith('<button '), 'root must render as native button'));
  cover(29, () => assert(renderButton(api, { children: 'Action' }).includes('type="button"'), 'default type button missing'));
  cover(30, () => assert(renderButton(api, { type: 'submit', children: 'Submit' }).includes('type="submit"'), 'explicit submit type missing'));
  cover(31, () => assert(renderButton(api, { type: 'reset', children: 'Reset' }).includes('type="reset"'), 'explicit reset type missing'));
  cover(32, () => assert(renderButton(api, { variant: 'primary', children: 'Primary' }).includes('ui-button--primary'), 'primary runtime class missing'));
  cover(33, () => assert(renderButton(api, { variant: 'secondary', children: 'Secondary' }).includes('ui-button--secondary'), 'secondary runtime class missing'));
  cover(34, () => assert(renderButton(api, { variant: 'outline', children: 'Outline' }).includes('ui-button--outline'), 'outline runtime class missing'));
  cover(35, () => assert(renderButton(api, { variant: 'ghost', children: 'Ghost' }).includes('ui-button--ghost'), 'ghost runtime class missing'));
  cover(36, () => assert(renderButton(api, { variant: 'danger', children: 'Danger' }).includes('ui-button--danger'), 'danger runtime class missing'));
  cover(37, () => assert(renderButton(api, { size: 'sm', children: 'Small' }).includes('ui-button--sm'), 'sm runtime class missing'));
  cover(38, () => assert(renderButton(api, { size: 'md', children: 'Medium' }).includes('ui-button--md'), 'md runtime class missing'));
  cover(39, () => assert(renderButton(api, { size: 'lg', children: 'Large' }).includes('ui-button--lg'), 'lg runtime class missing'));
  cover(40, () => {
    const rendered = renderButton(api, {
      id: 'button-id',
      name: 'action',
      value: 'save',
      'data-test': 'native',
      'aria-label': 'Save action',
      style: { marginTop: 4 },
      children: 'Save',
    });
    includesAll(rendered, [
      'id="button-id"',
      'name="action"',
      'value="save"',
      'data-test="native"',
      'aria-label="Save action"',
      'margin-top:4px',
    ], 'native attribute forwarding');
  });
  cover(41, () => {
    const handler = () => {};
    const element = buttonElement(api, { onClick: handler, children: 'Click' });
    assert(element.props.onClick === handler, 'native event forwarding missing');
  });
  cover(42, () => {
    const element = buttonElement(api, { disabled: true, children: 'Disabled' });
    assert(element.type === 'button' && element.props.disabled === true, 'native disabled state mismatch');
  });
  cover(43, () => {
    const element = buttonElement(api, { loading: true, children: 'Saving' });
    assert(element.props.disabled === true, 'loading must disable repeated native activation');
    assert(element.props.className.includes('ui-button--loading'), 'loading runtime class missing');
  });
  cover(44, () => {
    const rendered = renderButton(api, { loading: true, children: 'Saving' });
    assert(rendered.includes('aria-busy="true"'), 'loading aria-busy missing');
    assert(!renderButton(api, { children: 'Idle' }).includes('aria-busy='), 'aria-busy forced while idle');
  });
  cover(45, () => {
    const rendered = renderButton(api, { loading: true, children: 'Save invoice' });
    assert(rendered.includes('Save invoice'), 'loading removed action identity');
    assert(!rendered.includes('Cargando'), 'loading hardcoded generic copy');
    assert(rendered.includes('aria-hidden="true"'), 'loading spinner must be decorative');
  });
  cover(46, () => {
    const rendered = renderButton(api, { 'aria-label': 'Open menu', children: '☰' });
    assert(rendered.includes('aria-label="Open menu"'), 'icon-only accessible name forwarding failed');
  });
  cover(47, () => assert(
    renderButton(api, { className: 'consumer-class', children: 'Class' }).includes('ui-button ui-button--primary ui-button--md consumer-class'),
    'base and consumer classes not composed',
  ));
  cover(48, () => includesAll(css, [
    '.ui-button:focus-visible',
    '.ui-button:disabled',
    '.ui-button--loading:disabled',
    '.ui-button__spinner',
    'overflow-wrap: anywhere;',
    'white-space: normal;',
    '@media (prefers-reduced-motion: reduce)',
  ], 'interaction and accessibility CSS'));
  cover(49, () => includesAll(readme, [
    'Sin consumidores migrados.',
    'Sin entrypoint CSS publico o distribuible.',
    'Superficie publica diferida',
    'SHELL-MIG-*',
    'SHELL-UI-014',
  ], 'future adoption and sensitive-action deferral'));
  cover(50, () => assertGitUnchanged([
    'package.json',
    'package-lock.json',
    'packages/ui-web/package.json',
    'packages/ui-web/src/Alert.tsx',
    'packages/ui-web/src/alert.css',
    'packages/ui-web/scripts/validate-alert.mjs',
    'src/components/ui',
    'templates/app-shell-standard',
    'packages/contracts',
    'packages/os-context',
    'packages/supabase',
  ]));

  assert(covered.size === 50, `scenario coverage mismatch: ${covered.size}/50`);
  for (let number = 1; number <= 50; number += 1) {
    assert(covered.has(number), `scenario ${number} not covered`);
  }

  console.log('PASS: SHELL-UI-003 Button validated; scenarios=50 variants=5 sizes=3 loading=SAFE ssr=SAFE consumers=NOT_MIGRATED legacy=UNCHANGED exports=DEFERRED');
}

try {
  main();
} catch (error) {
  console.error(`FAIL: ${error instanceof Error ? error.message : String(error)}`);
  process.exitCode = 1;
}
