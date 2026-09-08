import fs from 'node:fs';
import path from 'node:path';
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
const componentPath = path.join(packageRoot, 'src', 'PrimaryActionPanel.tsx');
const cssPath = path.join(packageRoot, 'src', 'primary-action-panel.css');

const SOURCE_CONTRACT_SHA256 = '7ce826f3e35f3e7c6516d42400171ddbcb830b518b80ecec7619d42d09015d1c';

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

function assertTypeScriptTranspile(source) {
  const ts = requireFromRepo('typescript');
  const compiled = ts.transpileModule(source, {
    compilerOptions: {
      target: ts.ScriptTarget.ES2022,
      module: ts.ModuleKind.ESNext,
      jsx: ts.JsxEmit.ReactJSX,
    },
    fileName: componentPath,
    reportDiagnostics: true,
  });
  const errors = (compiled.diagnostics ?? []).filter(
    (entry) => entry.category === ts.DiagnosticCategory.Error,
  );
  assert(errors.length === 0, 'PrimaryActionPanel transpile diagnostics contain errors');
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
  const taskBlock = canonicalTaskBlock(owner, 'SHELL-UI-013');

  cover(1, () => assert(sha256(taskBlock) === SOURCE_CONTRACT_SHA256, 'source contract SHA256 mismatch'));
  cover(2, () => includesAll(taskBlock, ['PrimaryActionPanel', 'PrimaryActionPanelProps', 'PrimaryActionPresentationState'], 'owner contract'));
  cover(3, () => includesAll(taskBlock, ['READY', 'PENDING', 'CONTEXTUAL_DISABLED', 'REQUIRED_BLOCKED'], 'owner state taxonomy'));
  cover(4, () => includesAll(taskBlock, ['primaryControl', 'secondaryControl', 'actionId'], 'owner control contract'));
  cover(5, () => assert(fs.existsSync(componentPath), 'PrimaryActionPanel.tsx missing'));
  cover(6, () => assert(fs.existsSync(cssPath), 'primary-action-panel.css missing'));
  cover(7, () => assert(fs.existsSync(readmePath), 'ui-web README missing'));
  cover(8, () => assertTypeScriptTranspile(source));
  cover(9, () => includesAll(source, ["export type PrimaryActionPresentationState =", "| 'READY'", "| 'PENDING'", "| 'CONTEXTUAL_DISABLED'", "| 'REQUIRED_BLOCKED';"], 'state union'));
  cover(10, () => assert(!source.includes("'HIDDEN'"), 'HIDDEN must not be renderable'));
  cover(11, () => includesAll(source, ['ariaLabel: string;', 'actionId: string;', 'label: string;'], 'required identity props'));
  cover(12, () => includesAll(source, ['description?: string;', 'statusLabel?: string;'], 'optional copy props'));
  cover(13, () => includesAll(source, ['state: PrimaryActionPresentationState;', 'primaryControl: ReactNode;', 'secondaryControl?: ReactNode;'], 'control props'));
  cover(14, () => assert(!source.includes('actions:'), 'panel must not receive candidate actions'));
  cover(15, () => assert(!source.includes('actions?:'), 'panel must not receive optional candidate actions'));
  cover(16, () => excludesAll(source, ['.sort(', 'sort(', 'priority', 'rank', 'firstEnabled'], 'primary action selection'));
  cover(17, () => includesAll(source, ['<section', 'aria-label={ariaLabel}', 'data-action-id={actionId}', 'data-state={state}'], 'root semantics'));
  cover(18, () => assert(source.includes("aria-busy={state === 'PENDING' ? true : undefined}"), 'PENDING must expose busy semantics without declaring result'));
  cover(19, () => assert(source.includes('{label}'), 'label must remain visible'));
  cover(20, () => assert(source.includes('statusLabel ?') && source.includes('{statusLabel}'), 'statusLabel must remain optional and visible'));
  cover(21, () => assert(source.includes('description ?') && source.includes('{description}'), 'description must remain optional and visible'));
  cover(22, () => assert(source.includes('{primaryControl}') && source.includes('ui-primary-action-panel__primary'), 'primary control slot missing'));
  cover(23, () => assert(source.includes('secondaryControl ?') && source.includes('{secondaryControl}'), 'secondary control slot must remain optional'));
  cover(24, () => assert(source.indexOf('{primaryControl}') < source.indexOf('secondaryControl ?'), 'primary control must precede optional secondary control in semantic order'));
  cover(25, () => excludesAll(source, ['onPrimaryAction', 'onExecute', 'onCommit', 'onConfirm', 'onApprove', 'onReject', 'onRetry'], 'business callbacks'));
  cover(26, () => excludesAll(source, ['permissionCode', 'requiredPermissions', 'anyOfPermissions', 'canAccess', 'canExecute', 'AuthorizationDecision'], 'authorization payloads'));
  cover(27, () => excludesAll(source, ['roleCode', 'role:', 'roles:', 'canOperate', 'AccessContext', 'EffectiveContext'], 'role or context authority'));
  cover(28, () => excludesAll(source, ['supabase', '.from(', '.rpc(', 'fetch(', 'XMLHttpRequest', 'WebSocket'], 'data access'));
  cover(29, () => excludesAll(source, ['auth.', 'session', 'getUser', 'getSession'], 'authentication'));
  cover(30, () => excludesAll(source, ['next/link', 'next/navigation', 'usePathname', 'useSearchParams', 'router', 'href:'], 'navigation'));
  cover(31, () => excludesAll(source, ['localStorage', 'sessionStorage', 'indexedDB', 'document.cookie'], 'storage'));
  cover(32, () => excludesAll(source, ['setTimeout', 'setInterval', 'requestAnimationFrame'], 'timers'));
  cover(33, () => excludesAll(source, ["'use client'", '"use client"', 'useState', 'useReducer', 'useEffect', 'useLayoutEffect'], 'server-safe boundary'));
  cover(34, () => excludesAll(source, ['SensitiveActionConfirmation', 'requiresConfirmation', 'isSensitive', 'riskLevel', 'stepUp'], 'UI014 confirmation boundary'));
  cover(35, () => excludesAll(source, ['success', 'completed', 'receipt', 'resultCode'], 'business result inference'));
  cover(36, () => excludesAll(source, ['transitionId', 'nextState', 'currentStateCode', 'allowedTransitions'], 'process transition inference'));
  cover(37, () => assert(!source.includes("import { Button") && !source.includes("import Button"), 'panel must compose owner-supplied control instead of owning Button execution'));
  cover(38, () => assert(!source.includes('loading:'), 'panel must not redefine Button.loading'));
  cover(39, () => assert(!source.includes('disabled:'), 'panel must not redefine control disabled authority'));
  cover(40, () => assert(!source.includes('onClick='), 'panel root must not execute actions'));
  cover(41, () => includesAll(css, ['.ui-primary-action-panel {', 'grid-template-columns: minmax(0, 1fr) auto;', 'min-width: 0;'], 'base layout'));
  cover(42, () => includesAll(css, ['border: 1px solid var(--ui-border);', 'border-radius: var(--ui-radius-card);', 'background: var(--ui-surface);', 'color: var(--ui-text);'], 'tokenized surface'));
  cover(43, () => includesAll(css, ['.ui-primary-action-panel__label', 'font-weight: 700;'], 'primary label hierarchy'));
  cover(44, () => includesAll(css, ['.ui-primary-action-panel__description', 'color: var(--ui-muted);'], 'secondary copy hierarchy'));
  cover(45, () => includesAll(css, ['.ui-primary-action-panel__status', 'border: 1px solid var(--ui-border);', 'background: var(--ui-surface-2);'], 'status presentation'));
  cover(46, () => includesAll(css, ['.ui-primary-action-panel__controls', 'flex-wrap: wrap;', 'justify-content: flex-end;'], 'control reflow'));
  cover(47, () => includesAll(css, ["[data-state='PENDING']", 'border-style: double;', 'border-width: 3px;'], 'PENDING non-color distinction'));
  cover(48, () => includesAll(css, ["[data-state='CONTEXTUAL_DISABLED']", 'border-style: dashed;'], 'CONTEXTUAL_DISABLED non-color distinction'));
  cover(49, () => includesAll(css, ["[data-state='REQUIRED_BLOCKED']", 'border-width: 2px;', 'box-shadow: inset 4px 0 0 var(--ui-primary);'], 'REQUIRED_BLOCKED distinction'));
  cover(50, () => assert(!/(?:#[0-9a-f]{3,8}\b|rgba?\(|hsla?\()/iu.test(css), 'hardcoded CSS colors are forbidden'));
  cover(51, () => excludesAll(css, ['animation:', '@keyframes', 'transition:'], 'motion'));
  cover(52, () => assert(css.includes('@media (max-width: 767px)'), 'narrow viewport reflow missing'));
  cover(53, () => includesAll(css, ['grid-template-columns: minmax(0, 1fr);', 'width: 100%;'], 'narrow control layout'));
  cover(54, () => includesAll(css, ['overflow-wrap: anywhere;', 'max-width: 100%;'], 'long-copy reflow'));
  cover(55, () => excludesAll(css, ['overflow-x: auto', 'overflow-x: scroll', 'overflow-x: hidden', 'white-space: nowrap'], 'structural horizontal overflow'));
  cover(56, () => {
    const tokens = [...css.matchAll(/var\((--ui-[a-z0-9-]+)\)/gu)].map((match) => match[1]);
    const allowed = new Set(['--ui-border', '--ui-radius-card', '--ui-surface', '--ui-text', '--ui-muted', '--ui-surface-2', '--ui-primary']);
    assert(tokens.length > 0 && tokens.every((token) => allowed.has(token)), 'CSS must use existing ui tokens only');
  });
  cover(57, () => includesAll(readme, ['`SHELL-UI-013::GLOBAL` materializa internamente `PrimaryActionPanel`', '## PrimaryActionPanel'], 'README materialization'));
  cover(58, () => includesAll(readme, ['READY', 'PENDING', 'CONTEXTUAL_DISABLED', 'REQUIRED_BLOCKED'], 'README state taxonomy'));
  cover(59, () => includesAll(readme, ['`actionId`', '`primaryControl`', '`secondaryControl`'], 'README API'));
  cover(60, () => includesAll(readme, ['`Button`', '`loading`', '`danger`'], 'README Button boundary'));
  cover(61, () => includesAll(readme, ['Consumidores migrados por UI013: 0/7.', 'SHELL', 'NEXO', 'FOGO', 'ORIGO', 'VISO', 'PULSO', 'NUMERA'], 'README consumer handoff'));
  cover(62, () => includesAll(readme, ['LTIMA TAREA APROBADA: `SHELL-UI-012`', 'TAREA ACTUAL APROBADA: `SHELL-UI-013`', 'SIGUIENTE TAREA RESERVADA: `SHELL-UI-014`'], 'README continuity'));
  cover(63, () => includesAll(readme, ['`PrimaryActionPanel` conserva region nombrada', 'no fuerza foco'], 'README accessibility'));
  cover(64, () => assert(!readme.includes('SIGUIENTE TAREA RESERVADA: `SHELL-UI-013`'), 'README must not retain UI013 as next reserved task'));
  cover(65, () => {
    const pkg = JSON.parse(packageSource);
    assert(pkg.name === '@vento/ui-web' && pkg.private === true && pkg.type === 'module', 'package identity changed');
    for (const key of ['version', 'main', 'types', 'exports', 'dependencies', 'devDependencies', 'peerDependencies', 'scripts']) {
      assert(!(key in pkg), `package manifest unexpectedly exposes ${key}`);
    }
  });
  cover(66, () => assertGitUnchanged(['packages/ui-web/package.json']));
  cover(67, () => assertGitUnchanged(['packages/ui-web/src/Button.tsx', 'packages/ui-web/src/button.css']));
  cover(68, () => assertGitUnchanged(['packages/ui-web/src/ProcessStatusLine.tsx', 'packages/ui-web/src/process-status-line.css']));
  cover(69, () => assertGitUnchanged(['packages/ui-web/src/TaskNavigation.tsx', 'packages/ui-web/src/task-navigation.css']));
  cover(70, () => assertGitUnchanged(['src/components/ui', 'templates/app-shell-standard']));
  cover(71, () => assertGitUnchanged(['packages/contracts', 'packages/os-context', 'packages/supabase']));
  cover(72, () => excludesAll(readme, ['PrimaryActionPanel decide permisos', 'PrimaryActionPanel ejecuta mutaciones'], 'README authority boundary'));

  assert(scenarios === 72, `expected 72 scenarios, got ${scenarios}`);
  console.log(
    'PASS: SHELL-UI-013 PrimaryActionPanel validated; scenarios=72 server_safe=YES authority=NONE action_selection=EXTERNAL consumers=0/7 exports=DEFERRED',
  );
}

main();
