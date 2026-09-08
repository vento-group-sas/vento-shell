import fs from 'node:fs';
import path from 'node:path';
import vm from 'node:vm';
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
const componentPath = path.join(packageRoot, 'src', 'SensitiveActionConfirmation.tsx');
const cssPath = path.join(packageRoot, 'src', 'sensitive-action-confirmation.css');

const SOURCE_CONTRACT_SHA256 = 'cab6f99042a3bf3097d5827b9f95369e1d628ae547e8ad8d19a61d2b6883e918';

function countMatches(source, pattern) {
  return [...source.matchAll(pattern)].length;
}

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
  const errors = (compiled.diagnostics ?? []).filter(
    (entry) => entry.category === ts.DiagnosticCategory.Error,
  );
  assert(errors.length === 0, 'SensitiveActionConfirmation transpile diagnostics contain errors');

  const runtimeModule = { exports: {} };
  const localRequire = (specifier) => {
    if (specifier === './sensitive-action-confirmation.css') return {};
    return requireFromRepo(specifier);
  };
  const wrapper = vm.runInThisContext(
    `(function(require,module,exports){${compiled.outputText}\n})`,
    { filename: 'SensitiveActionConfirmation.runtime.cjs' },
  );
  wrapper(localRequire, runtimeModule, runtimeModule.exports);
  return runtimeModule.exports;
}

function render(api, overrides = {}) {
  const React = requireFromRepo('react');
  const { renderToStaticMarkup } = requireFromRepo('react-dom/server');
  const props = {
    open: true,
    ariaLabel: 'Confirmacion sensible',
    actionId: 'inventory.adjustment.confirm',
    title: 'Confirmar ajuste',
    description: 'Revisa la accion antes de continuar.',
    consequence: 'El ajuste cambia el inventario registrado.',
    state: 'READY',
    confirmControl: React.createElement('button', { type: 'button' }, 'Confirmar ajuste'),
    cancelControl: React.createElement('button', { type: 'button' }, 'Cancelar'),
    ...overrides,
  };
  return renderToStaticMarkup(React.createElement(api.SensitiveActionConfirmation, props));
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
  const taskBlock = canonicalTaskBlock(owner, 'SHELL-UI-014');
  const api = loadRuntime(source);

  const readyMarkup = render(api);
  const closedMarkup = render(api, { open: false });
  const pendingMarkup = render(api, { state: 'PENDING', statusLabel: 'Operacion en curso' });
  const blockedMarkup = render(api, { state: 'BLOCKED', statusLabel: 'Reautenticacion requerida' });
  const unknownMarkup = render(api, { state: 'RESULT_UNKNOWN', statusLabel: 'Resultado por reconciliar' });
  const optionalMarkup = render(api, {
    resourceLabel: 'Lote 184',
    contextSummary: 'Centro de Produccion',
    reasonControl: 'Razon requerida por el propietario',
  });

  cover(1, () => assert(sha256(taskBlock) === SOURCE_CONTRACT_SHA256, 'source contract SHA256 mismatch'));
  cover(2, () => includesAll(taskBlock, ['SensitiveActionConfirmation', 'SensitiveActionConfirmationProps', 'SensitiveActionConfirmationState'], 'owner contract'));
  cover(3, () => includesAll(taskBlock, ['READY', 'PENDING', 'BLOCKED', 'RESULT_UNKNOWN'], 'owner state taxonomy'));
  cover(4, () => includesAll(taskBlock, ['confirmControl', 'cancelControl', 'reasonControl', 'actionId'], 'owner control contract'));
  cover(5, () => includesAll(taskBlock, ['EXPLICIT_CONFIRMATION', 'REASON_AND_CONFIRMATION', 'SERVER_REVALIDATION', 'EXTERNAL_RESULT_CONFIRMATION'], 'owner policy boundary'));
  cover(6, () => assert(fs.existsSync(componentPath), 'SensitiveActionConfirmation.tsx missing'));
  cover(7, () => assert(fs.existsSync(cssPath), 'sensitive-action-confirmation.css missing'));
  cover(8, () => assert(fs.existsSync(readmePath), 'ui-web README missing'));
  cover(9, () => includesAll(source, ["export type SensitiveActionConfirmationState =", "| 'READY'", "| 'PENDING'", "| 'BLOCKED'", "| 'RESULT_UNKNOWN';"], 'state union'));
  cover(10, () => assert(!source.includes("'HIDDEN'"), 'HIDDEN must not be renderable'));
  cover(11, () => includesAll(source, ['open: boolean;', 'ariaLabel: string;', 'actionId: string;'], 'identity props'));
  cover(12, () => includesAll(source, ['title: string;', 'description: string;', 'consequence: string;'], 'required human copy'));
  cover(13, () => includesAll(source, ['resourceLabel?: string;', 'contextSummary?: ReactNode;', 'statusLabel?: string;'], 'optional projection props'));
  cover(14, () => includesAll(source, ['reasonControl?: ReactNode;', 'confirmControl: ReactNode;', 'cancelControl: ReactNode;'], 'control props'));
  cover(15, () => assert(source.includes('if (!open) return null;'), 'closed confirmation must not render'));
  cover(16, () => includesAll(source, ['<section', 'aria-label={ariaLabel}', 'data-action-id={actionId}', 'data-state={state}'], 'root semantics'));
  cover(17, () => assert(source.includes("aria-busy={state === 'PENDING' ? true : undefined}"), 'PENDING must expose busy semantics'));
  cover(18, () => assert(source.includes('{title}') && source.includes('{description}') && source.includes('{consequence}'), 'required copy must remain visible'));
  cover(19, () => assert(source.includes('resourceLabel ?') && source.includes('{resourceLabel}'), 'resourceLabel must remain optional'));
  cover(20, () => assert(source.includes('contextSummary ?') && source.includes('{contextSummary}'), 'contextSummary must remain optional'));
  cover(21, () => assert(source.includes('statusLabel ?') && source.includes('{statusLabel}'), 'statusLabel must remain optional'));
  cover(22, () => assert(source.includes('reasonControl ?') && source.includes('{reasonControl}'), 'reasonControl must remain optional'));
  cover(23, () => assert(source.includes('{confirmControl}') && source.includes('{cancelControl}'), 'explicit confirmation and cancel controls missing'));
  cover(24, () => assert(countMatches(source, /\{confirmControl\}/gu) === 1, 'confirmControl must render exactly once'));
  cover(25, () => assert(countMatches(source, /\{cancelControl\}/gu) === 1, 'cancelControl must render exactly once'));
  cover(26, () => assert(source.indexOf('{cancelControl}') < source.indexOf('{confirmControl}'), 'safe cancel control must precede commit control in semantic order'));
  cover(27, () => excludesAll(source, ['actions:', 'actions?:', 'candidates:', 'riskLevel', 'sensitivityLevel', 'isSensitive'], 'action or risk classification'));
  cover(28, () => excludesAll(source, ['permissionCode', 'requiredPermissions', 'allowedRoles', 'roleCode', 'canAuthorize', 'canExecute', 'AuthorizationDecision'], 'authorization payloads'));
  cover(29, () => excludesAll(source, ['reauth', 'credential', 'password', 'token', 'session'], 'reauthentication or credential handling'));
  cover(30, () => excludesAll(source, ['supabase', '.from(', '.rpc(', 'fetch(', 'XMLHttpRequest', 'WebSocket'], 'data access'));
  cover(31, () => excludesAll(source, ['next/link', 'next/navigation', 'usePathname', 'useSearchParams', 'router', 'href:'], 'navigation'));
  cover(32, () => excludesAll(source, ['localStorage', 'sessionStorage', 'indexedDB', 'document.cookie'], 'storage'));
  cover(33, () => excludesAll(source, ['setTimeout', 'setInterval', 'requestAnimationFrame'], 'timers'));
  cover(34, () => excludesAll(source, ["'use client'", '"use client"', 'useState', 'useReducer', 'useEffect', 'useLayoutEffect'], 'server-safe boundary'));
  cover(35, () => excludesAll(source, ['onConfirm:', 'onConfirm?:', 'onCancel:', 'onCancel?:', 'onExecute:', 'onExecute?:', 'onCommit:', 'onCommit?:', 'onRetry:', 'onRetry?:', 'onReconcile:', 'onReconcile?:'], 'business callbacks'));
  cover(36, () => excludesAll(source, ['transitionId', 'nextState', 'currentStateCode', 'allowedTransitions'], 'process transitions'));
  cover(37, () => excludesAll(source, ['idempotencyKey', 'correlationId', 'receipt', 'providerReference'], 'execution or receipt payloads'));
  cover(38, () => assert(!source.includes('danger'), 'visual danger must not classify sensitivity'));
  cover(39, () => assert(!source.includes("import { Button") && !source.includes('import Button'), 'confirmation must compose owner-supplied controls'));
  cover(40, () => assert(!source.includes('onClick='), 'confirmation surface must not execute actions itself'));
  cover(41, () => excludesAll(source, ['role="dialog"', 'aria-modal=', 'createPortal', 'focus()', 'document.activeElement'], 'modal geometry and focus ownership'));
  cover(42, () => assert(closedMarkup === '', 'open=false must render nothing'));
  cover(43, () => includesAll(readyMarkup, ['<section', 'aria-label="Confirmacion sensible"', 'data-action-id="inventory.adjustment.confirm"', 'data-state="READY"'], 'READY runtime root'));
  cover(44, () => includesAll(readyMarkup, ['Confirmar ajuste', 'Revisa la accion antes de continuar.', 'El ajuste cambia el inventario registrado.'], 'runtime required copy'));
  cover(45, () => assert(readyMarkup.indexOf('>Cancelar</button>') < readyMarkup.indexOf('>Confirmar ajuste</button>'), 'runtime cancel must precede confirm control'));
  cover(46, () => assert(!readyMarkup.includes('aria-busy='), 'READY must not expose busy state'));
  cover(47, () => includesAll(pendingMarkup, ['data-state="PENDING"', 'aria-busy="true"', 'Operacion en curso'], 'PENDING runtime semantics'));
  cover(48, () => includesAll(blockedMarkup, ['data-state="BLOCKED"', 'Reautenticacion requerida'], 'BLOCKED runtime semantics'));
  cover(49, () => includesAll(unknownMarkup, ['data-state="RESULT_UNKNOWN"', 'Resultado por reconciliar'], 'RESULT_UNKNOWN runtime semantics'));
  cover(50, () => includesAll(optionalMarkup, ['Lote 184', 'Centro de Produccion', 'Razon requerida por el propietario'], 'optional projection runtime'));
  cover(51, () => assert(countMatches(readyMarkup, />Confirmar ajuste<\/button>/gu) === 1, 'runtime must expose one commit control'));
  cover(52, () => assert(countMatches(readyMarkup, />Cancelar<\/button>/gu) === 1, 'runtime must expose one cancel control'));
  cover(53, () => includesAll(css, ['.ui-sensitive-action-confirmation {', 'min-width: 0;', 'max-width: 100%;'], 'base reflow'));
  cover(54, () => includesAll(css, ['border: 1px solid var(--ui-border);', 'border-radius: var(--ui-radius-card);', 'background: var(--ui-surface);', 'color: var(--ui-text);'], 'tokenized surface'));
  cover(55, () => includesAll(css, ['.ui-sensitive-action-confirmation__consequence', 'border-inline-start-width: 4px;', 'font-weight: 600;'], 'consequence hierarchy'));
  cover(56, () => includesAll(css, ['.ui-sensitive-action-confirmation__controls', 'grid-template-columns: auto minmax(0, 1fr);'], 'control hierarchy'));
  cover(57, () => includesAll(css, ["[data-state='PENDING']", 'border-style: double;', 'border-width: 3px;'], 'PENDING non-color distinction'));
  cover(58, () => includesAll(css, ["[data-state='BLOCKED']", 'border-style: dashed;'], 'BLOCKED non-color distinction'));
  cover(59, () => includesAll(css, ["[data-state='RESULT_UNKNOWN']", 'border-width: 2px;', 'box-shadow: inset 4px 0 0 var(--ui-primary);'], 'RESULT_UNKNOWN distinction'));
  cover(60, () => assert(!/(?:#[0-9a-f]{3,8}\b|rgba?\(|hsla?\()/iu.test(css), 'hardcoded CSS colors are forbidden'));
  cover(61, () => excludesAll(css, ['animation:', '@keyframes', 'transition:'], 'motion'));
  cover(62, () => assert(css.includes('@media (max-width: 767px)'), 'narrow viewport reflow missing'));
  cover(63, () => includesAll(css, ['grid-template-columns: minmax(0, 1fr);', 'width: 100%;'], 'narrow control layout'));
  cover(64, () => excludesAll(css, ['overflow-x: auto', 'overflow-x: scroll', 'overflow-x: hidden', 'white-space: nowrap'], 'structural horizontal overflow'));
  cover(65, () => {
    const tokens = [...css.matchAll(/var\((--ui-[a-z0-9-]+)\)/gu)].map((match) => match[1]);
    const allowed = new Set(['--ui-border', '--ui-radius-card', '--ui-surface', '--ui-text', '--ui-muted', '--ui-surface-2', '--ui-primary']);
    assert(tokens.length > 0 && tokens.every((token) => allowed.has(token)), 'CSS must use existing ui tokens only');
  });
  cover(66, () => includesAll(readme, ['`SHELL-UI-014::GLOBAL` materializa internamente `SensitiveActionConfirmation`', '## SensitiveActionConfirmation'], 'README materialization'));
  cover(67, () => includesAll(readme, ['READY', 'PENDING', 'BLOCKED', 'RESULT_UNKNOWN'], 'README state taxonomy'));
  cover(68, () => includesAll(readme, ['`actionId`', '`confirmControl`', '`cancelControl`', '`reasonControl`'], 'README API'));
  cover(69, () => includesAll(readme, ['EXPLICIT_CONFIRMATION', 'REASON_AND_CONFIRMATION', 'SERVER_REVALIDATION', 'EXTERNAL_RESULT_CONFIRMATION'], 'README policy boundary'));
  cover(70, () => includesAll(readme, ['`Button`', '`danger`', 'reautenticacion', 'resultado autoritativo'], 'README adjacent boundaries'));
  cover(71, () => includesAll(readme, ['Consumidores migrados por UI014: 0/7.', 'SHELL', 'NEXO', 'FOGO', 'ORIGO', 'VISO', 'PULSO', 'NUMERA'], 'README consumer handoff'));
  cover(72, () => includesAll(readme, ['ÚLTIMA TAREA APROBADA: `SHELL-UI-013`', 'TAREA ACTUAL APROBADA: `SHELL-UI-014`', 'SIGUIENTE TAREA RESERVADA: `SHELL-UI-015`'], 'README continuity'));
  cover(73, () => includesAll(readme, ['`SensitiveActionConfirmation` conserva nombre accesible', 'no implementa focus trap'], 'README accessibility'));
  cover(74, () => assert(!readme.includes('SIGUIENTE TAREA RESERVADA: `SHELL-UI-014`'), 'README must not retain UI014 as next reserved task'));
  cover(75, () => {
    const pkg = JSON.parse(packageSource);
    assert(pkg.name === '@vento/ui-web' && pkg.private === true && pkg.type === 'module', 'package identity changed');
    for (const key of ['version', 'main', 'types', 'exports', 'dependencies', 'devDependencies', 'peerDependencies', 'scripts']) {
      assert(!(key in pkg), `package manifest unexpectedly exposes ${key}`);
    }
  });
  cover(76, () => assertGitUnchanged(['packages/ui-web/package.json']));
  cover(77, () => assertGitUnchanged(['packages/ui-web/src/Button.tsx', 'packages/ui-web/src/button.css']));
  cover(78, () => assertGitUnchanged(['packages/ui-web/src/PrimaryActionPanel.tsx', 'packages/ui-web/src/primary-action-panel.css']));
  cover(79, () => assertGitUnchanged(['src/components/ui/Modal.tsx', 'src/components/ui/index.ts']));
  cover(80, () => assertGitUnchanged(['packages/contracts', 'packages/os-context', 'packages/supabase']));
  cover(81, () => excludesAll(readme, ['SensitiveActionConfirmation concede permiso', 'SensitiveActionConfirmation ejecuta mutaciones'], 'README authority boundary'));
  cover(82, () => includesAll(readme, ['SHELL queda `CANDIDATO_A_ADOPTAR_CON_RECONCILIACION_DE_MODAL_LOCAL`', 'adoptados fisicamente: 0'], 'README legacy reconciliation'));

  assert(scenarios === 82, `expected 82 scenarios, got ${scenarios}`);
  console.log(
    'PASS: SHELL-UI-014 SensitiveActionConfirmation validated; scenarios=82 server_safe=YES authority=NONE confirmation_policy=EXTERNAL consumers=0/7 exports=DEFERRED',
  );
}

main();
