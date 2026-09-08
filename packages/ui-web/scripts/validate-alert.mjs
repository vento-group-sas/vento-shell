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
const alertPath = path.join(packageRoot, 'src', 'Alert.tsx');
const cssPath = path.join(packageRoot, 'src', 'alert.css');

const SOURCE_CONTRACT_SHA256 = '47ec05f49c60c6adec070d48a07669372254299e15541b23523c37386cf67497';

function canonicalTaskBlock(owner, taskId) {
  const task = parseTaskBlocks(owner).find((entry) => entry.id === taskId) ?? null;
  assert(task, `canonical task ${taskId} not found`);
  return task.block;
}

function loadAlertRuntime(alertSource) {
  const ts = requireFromRepo('typescript');
  const compiled = ts.transpileModule(alertSource, {
    compilerOptions: {
      target: ts.ScriptTarget.ES2022,
      module: ts.ModuleKind.CommonJS,
      jsx: ts.JsxEmit.ReactJSX,
      esModuleInterop: true,
    },
    fileName: alertPath,
    reportDiagnostics: true,
  });

  const blockingDiagnostics = (compiled.diagnostics ?? []).filter(
    (entry) => entry.category === ts.DiagnosticCategory.Error,
  );
  assert(blockingDiagnostics.length === 0, 'Alert transpile diagnostics contain errors');

  const runtimeModule = { exports: {} };
  const localRequire = (specifier) => {
    if (specifier === './alert.css') return {};
    return requireFromRepo(specifier);
  };
  const wrapper = vm.runInThisContext(
    `(function(require,module,exports){${compiled.outputText}\n})`,
    { filename: 'Alert.runtime.cjs' },
  );
  wrapper(localRequire, runtimeModule, runtimeModule.exports);
  return runtimeModule.exports;
}

function renderAlert(api, props) {
  const React = requireFromRepo('react');
  const { renderToStaticMarkup } = requireFromRepo('react-dom/server');
  return renderToStaticMarkup(React.createElement(api.Alert, props));
}

function main() {
  const owner = fs.readFileSync(ownerPath, 'utf8');
  const taskBlock = canonicalTaskBlock(owner, 'SHELL-UI-002');
  const packageJson = JSON.parse(fs.readFileSync(packagePath, 'utf8'));
  const readme = fs.readFileSync(readmePath, 'utf8');
  const alertSource = fs.readFileSync(alertPath, 'utf8');
  const css = fs.readFileSync(cssPath, 'utf8');
  const api = loadAlertRuntime(alertSource);
  const React = requireFromRepo('react');

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
  cover(5, () => includesAll(alertSource, ['export function Alert', 'export interface AlertProps'], 'Alert source'));
  cover(6, () => {
    assert(fs.existsSync(cssPath), 'Alert CSS missing');
    assert(alertSource.includes("import './alert.css';"), 'Alert CSS import missing');
  });
  cover(7, () => includesAll(readme, ['SHELL-UI-002::GLOBAL', 'src/Alert.tsx', 'src/alert.css'], 'README materialization'));
  cover(8, () => assert(/'neutral'\s*\|\s*'success'\s*\|\s*'warning'\s*\|\s*'danger'/u.test(alertSource), 'variant union mismatch'));
  cover(9, () => assert(alertSource.includes("variant = 'neutral'"), 'neutral default missing'));
  cover(10, () => assert(/children:\s*ReactNode/u.test(alertSource), 'children must be required ReactNode'));
  cover(11, () => assert(/icon\?:\s*ReactNode/u.test(alertSource), 'icon must be optional ReactNode'));
  cover(12, () => assert(alertSource.includes("Omit<HTMLAttributes<HTMLDivElement>, 'children'>"), 'HTML attribute contract mismatch'));
  cover(13, () => assert(renderAlert(api, { children: 'Base' }).startsWith('<div '), 'root must render as div'));
  cover(14, () => assert(renderAlert(api, { children: 'Neutral' }).includes('ui-alert--neutral'), 'neutral runtime class missing'));
  cover(15, () => assert(renderAlert(api, { variant: 'success', children: 'Success' }).includes('ui-alert--success'), 'success runtime class missing'));
  cover(16, () => assert(renderAlert(api, { variant: 'warning', children: 'Warning' }).includes('ui-alert--warning'), 'warning runtime class missing'));
  cover(17, () => assert(renderAlert(api, { variant: 'danger', children: 'Danger' }).includes('ui-alert--danger'), 'danger runtime class missing'));
  cover(18, () => assert(renderAlert(api, { className: 'extra-class', children: 'Class' }).includes('extra-class'), 'className extension missing'));
  cover(19, () => assert(renderAlert(api, { id: 'alert-id', children: 'Id' }).includes('id="alert-id"'), 'HTML attributes not transferred'));
  cover(20, () => assert(renderAlert(api, { role: 'alert', children: 'Role' }).includes('role="alert"'), 'role attribute not transferred'));
  cover(21, () => assert(renderAlert(api, { 'aria-live': 'polite', children: 'Live' }).includes('aria-live="polite"'), 'aria-live not transferred'));
  cover(22, () => assert(renderAlert(api, { 'aria-atomic': true, children: 'Atomic' }).includes('aria-atomic="true"'), 'aria-atomic not transferred'));
  cover(23, () => assert(!renderAlert(api, { children: 'No role' }).includes('role="alert"'), 'role alert forced by default'));
  cover(24, () => assert(!renderAlert(api, { children: 'No live' }).includes('aria-live='), 'aria-live forced by default'));
  cover(25, () => excludesAll(alertSource, ['autoFocus', '.focus(', 'focus()'], 'focus boundary'));
  cover(26, () => assert(!/^['"]use client['"];?/mu.test(alertSource), 'Alert must remain server-safe'));
  cover(27, () => excludesAll(alertSource, ['window.', 'document.', 'localStorage', 'sessionStorage', 'cookie'], 'browser API boundary'));
  cover(28, () => excludesAll(alertSource, ['@vento/supabase', '@supabase/', '.from(', '.rpc(', '.auth', '.storage'], 'Supabase boundary'));
  cover(29, () => excludesAll(alertSource, ['@vento/os-context', 'permission', 'roleCode', 'EffectiveContext'], 'authorization boundary'));
  cover(30, () => excludesAll(alertSource, ['next/navigation', 'next/router', 'react-router', 'useRouter'], 'router boundary'));
  cover(31, () => excludesAll(alertSource, ['fetch(', 'axios', 'XMLHttpRequest', 'WebSocket'], 'network boundary'));
  cover(32, () => excludesAll(alertSource, ['setTimeout', 'setInterval', 'requestAnimationFrame'], 'timer boundary'));
  cover(33, () => excludesAll(alertSource, ['useState', 'useEffect', 'useReducer', 'useSyncExternalStore'], 'state boundary'));
  cover(34, () => excludesAll(alertSource, ['Toast', 'toast', 'portal', 'autoDismiss'], 'toast boundary'));
  cover(35, () => includesAll(css, ['.ui-alert {', 'border-radius: var(--ui-radius-card);', 'padding: 16px;'], 'base CSS'));
  cover(36, () => includesAll(css, ['.ui-alert--neutral', 'background: var(--ui-neutral-soft);', 'color: var(--ui-text);'], 'neutral CSS'));
  cover(37, () => includesAll(css, ['.ui-alert--success', 'background: var(--ui-success-soft);', 'color: var(--ui-success);'], 'success CSS'));
  cover(38, () => includesAll(css, ['.ui-alert--warning', 'background: var(--ui-brand-soft);', 'color: var(--ui-brand-700);'], 'warning CSS'));
  cover(39, () => includesAll(css, ['.ui-alert--danger', 'background: var(--ui-danger-soft);', 'color: var(--ui-danger);'], 'danger CSS'));
  cover(40, () => excludesAll(css, ['.ui-alert--warn {', '.ui-alert--error {'], 'legacy modifier boundary'));
  cover(41, () => assert(!renderAlert(api, { children: 'No icon' }).includes('ui-alert__icon'), 'icon wrapper rendered without icon'));
  cover(42, () => {
    const rendered = renderAlert(api, { icon: React.createElement('span', null, '!'), children: 'Icon' });
    assert(rendered.includes('ui-alert__icon'), 'icon wrapper missing');
    assert(!alertSource.includes('aria-hidden'), 'icon semantics must not be forced universally');
  });
  cover(43, () => assert(renderAlert(api, { children: 'Visible content' }).includes('<div class="ui-alert__text">Visible content</div>'), 'visible content wrapper mismatch'));
  cover(44, () => assert(renderAlert(api, { className: 'consumer-class', children: 'Class' }).includes('ui-alert ui-alert--neutral consumer-class'), 'base and consumer classes not composed'));
  cover(45, () => assert(renderAlert(api, { children: React.createElement('a', { href: '/safe' }, 'Open') }).includes('<a href="/safe">Open</a>'), 'semantic link composition failed'));
  cover(46, () => assert(renderAlert(api, { children: React.createElement('button', { type: 'button' }, 'Retry') }).includes('<button type="button">Retry</button>'), 'semantic control composition failed'));
  cover(47, () => {
    const neutral = renderAlert(api, { variant: 'neutral', children: 'Same content' });
    const danger = renderAlert(api, { variant: 'danger', children: 'Same content' });
    assert(neutral.includes('Same content') && danger.includes('Same content'), 'variant change altered content');
  });
  cover(48, () => includesAll(readme, ['Sin consumidores migrados.', 'legacy', 'SHELL-MIG-*'], 'consumer migration deferral'));
  cover(49, () => includesAll(readme, ['Sin entrypoint CSS publico o distribuible.', 'certificacion de contraste', 'Superficie publica diferida'], 'future certification deferral'));
  cover(50, () => assertGitUnchanged([
    'package.json',
    'package-lock.json',
    'packages/ui-web/package.json',
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

  console.log('PASS: SHELL-UI-002 Alert validated; scenarios=50 variants=4 ssr=SAFE aria_defaults=NONE consumers=NOT_MIGRATED legacy=UNCHANGED exports=DEFERRED');
}

try {
  main();
} catch (error) {
  console.error(`FAIL: ${error instanceof Error ? error.message : String(error)}`);
  process.exitCode = 1;
}
