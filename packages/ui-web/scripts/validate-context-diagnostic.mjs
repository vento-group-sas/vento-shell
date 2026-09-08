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
const ownerPath = path.join(repoRoot, 'docs', 'plan-canonico', 'modular', 'bloques', 'H_FUNDACION_COMPARTIDA', '07_COMPONENTES_WEB_COMPARTIDOS.md');
const componentPath = path.join(packageRoot, 'src', 'ContextDiagnostic.tsx');
const cssPath = path.join(packageRoot, 'src', 'context-diagnostic.css');
const readmePath = path.join(packageRoot, 'README.md');
const packagePath = path.join(packageRoot, 'package.json');
const SOURCE_CONTRACT_SHA256 = 'fc2e0b744a47240025472f329a91d3e57e4728096b9c6da18050fb7afc03bca2';
const STATES = ['resolving', 'changing', 'stale', 'invalid', 'unavailable'];

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
  const errors = (compiled.diagnostics ?? []).filter((entry) => entry.category === ts.DiagnosticCategory.Error);
  assert(errors.length === 0, 'ContextDiagnostic transpile diagnostics contain errors');
  const runtimeModule = { exports: {} };
  const localRequire = (specifier) => {
    if (specifier === './context-diagnostic.css') return {};
    return requireFromRepo(specifier);
  };
  const wrapper = vm.runInThisContext(`(function(require,module,exports){${compiled.outputText}\n})`, { filename: 'ContextDiagnostic.runtime.cjs' });
  wrapper(localRequire, runtimeModule, runtimeModule.exports);
  return runtimeModule.exports;
}

function render(api, overrides = {}) {
  const React = requireFromRepo('react');
  const { renderToStaticMarkup } = requireFromRepo('react-dom/server');
  const props = {
    state: 'invalid',
    title: 'Contexto requiere atención',
    summary: 'La operación no puede continuar con el contexto actual.',
    conditions: [],
    preservedContext: [],
    blockedActions: [],
    resolution: { instruction: 'Verifica el contexto antes de continuar.' },
    ...overrides,
  };
  return renderToStaticMarkup(React.createElement(api.ContextDiagnostic, props));
}

function main() {
  const owner = fs.readFileSync(ownerPath, 'utf8');
  const task = parseTaskBlocks(owner).find((entry) => entry.id === 'SHELL-UI-015');
  const packageJson = JSON.parse(fs.readFileSync(packagePath, 'utf8'));
  const source = fs.readFileSync(componentPath, 'utf8');
  const css = fs.readFileSync(cssPath, 'utf8');
  const readme = fs.readFileSync(readmePath, 'utf8');
  const api = loadRuntime(source);
  assert(task, 'canonical task SHELL-UI-015 not found');
  assert(sha256(task.block) === SOURCE_CONTRACT_SHA256, 'source contract SHA256 mismatch');
  assert(packageJson.name === '@vento/ui-web' && packageJson.private === true, 'private package identity mismatch');
  for (const key of ['version', 'main', 'types', 'exports', 'dependencies', 'devDependencies', 'peerDependencies', 'scripts']) {
    assert(!(key in packageJson), `package public surface must remain deferred: ${key}`);
  }

  includesAll(source, [
    'export function ContextDiagnostic',
    'export type ContextDiagnosticState',
    'export interface ContextDiagnosticCondition',
    'export interface ContextDiagnosticResolution',
    'export type ContextDiagnosticProps',
    "Exclude<ContextIndicatorState, 'active'>",
    'readonly ContextIndicatorItem[]',
    "import './context-diagnostic.css';",
  ], 'ContextDiagnostic source');

  const covered = new Set();
  const cover = (number, assertion) => {
    assertion();
    covered.add(number);
  };

  for (let index = 0; index < STATES.length; index += 1) {
    const state = STATES[index];
    cover(index + 1, () => includesAll(render(api, { state }), [`data-context-state=\"${state}\"`, 'Contexto requiere atención'], `${state} render`));
  }
  cover(6, () => assert(!source.includes("| 'active'"), 'active must not be a diagnostic state'));
  cover(7, () => includesAll(render(api), ['<h2', 'Contexto requiere atención', 'La operación no puede continuar'], 'title and summary'));
  cover(8, () => includesAll(render(api, { conditions: [{ label: 'Sede activa', message: 'No está confirmada.' }] }), ['<dl', '<dt', '<dd', 'Sede activa', 'No está confirmada.'], 'condition semantics'));
  cover(9, () => {
    const html = render(api, { conditions: [{ label: 'Primera', message: 'A' }, { label: 'Segunda', message: 'B' }] });
    assert(html.indexOf('Primera') < html.indexOf('Segunda'), 'condition order changed');
  });
  cover(10, () => includesAll(render(api, { preservedContext: [{ label: 'Actor', value: 'Carlos' }] }), ['Actor', 'Carlos'], 'preserved context'));
  cover(11, () => assert(!render(api).includes('ui-context-diagnostic__preserved-context'), 'empty context must not invent fallback'));
  cover(12, () => includesAll(render(api, { blockedActions: ['Registrar recepción'] }), ['<ul', '<li', 'Registrar recepción'], 'blocked actions'));
  cover(13, () => assert(!render(api).includes('ui-context-diagnostic__blocked-actions'), 'empty blocked actions must remain empty'));
  cover(14, () => includesAll(render(api), ['ui-context-diagnostic__resolution', 'Verifica el contexto antes de continuar.'], 'required resolution'));
  cover(15, () => includesAll(render(api, { resolution: { instruction: 'Espera.', ownerLabel: 'Supervisor', reviewCondition: 'Al iniciar turno' } }), ['Supervisor', 'Al iniciar turno'], 'optional owner and review'));
  cover(16, () => includesAll(render(api, { resolution: { instruction: 'Contacta soporte.', supportReference: 'REF-7K4M' } }), ['REF-7K4M'], 'support reference'));
  cover(17, () => excludesAll(source, ['user_id', 'session_id', 'refresh_token', 'device_secret'], 'sensitive identifiers'));
  cover(18, () => excludesAll(source, ['reasonCodes', 'reason_codes', 'AUTH-ERR-'], 'reason code boundary'));
  cover(19, () => excludesAll(source, ['blocked_reasons', 'blockedReasons'], 'blocked reasons boundary'));
  cover(20, () => excludesAll(source, ['metadata', 'JSON.stringify'], 'metadata boundary'));
  cover(21, () => excludesAll(source, ['can_operate', 'canOperate'], 'visual authority boundary'));
  cover(22, () => excludesAll(source, ['getEffectiveContext', 'EffectiveContext'], 'context resolver boundary'));
  cover(23, () => excludesAll(source, ['hasEffectivePermission', 'permission', 'authorize'], 'permission boundary'));
  cover(24, () => excludesAll(source, ['@vento/supabase', '@supabase/', '.from(', '.rpc('], 'Supabase boundary'));
  cover(25, () => excludesAll(source, ['fetch(', 'axios', 'XMLHttpRequest', 'WebSocket'], 'network boundary'));
  cover(26, () => excludesAll(source, ['primarySite', 'sites[0]', 'searchParams', 'location.search'], 'site inference boundary'));
  cover(27, () => excludesAll(source, ['isOnShift', 'isCheckedIn'], 'shift and check-in inference boundary'));
  cover(28, () => excludesAll(source, ['sharedDeviceId', 'currentActor', 'deviceActor'], 'actor and device inference boundary'));
  cover(29, () => excludesAll(source, ['baseRole', 'operationalRole', 'roleCode'], 'role inference boundary'));
  cover(30, () => excludesAll(source, ['SimulationContext', 'SimulatedRoleNotice'], 'simulation absorption boundary'));
  cover(31, () => excludesAll(source, ['setState(', 'fallbackContext', 'lastKnownContext'], 'resolving fallback boundary'));
  cover(32, () => excludesAll(source, ['requestedSite', 'requestedArea', 'optimisticContext'], 'changing authority boundary'));
  cover(33, () => excludesAll(source, ['cacheAuthority', 'cachedPermission', 'extendSession'], 'stale authority boundary'));
  cover(34, () => includesAll(render(api, { state: 'invalid', conditions: [{ label: 'Área activa', message: 'Ya no está disponible.' }] }), ['Área activa', 'Ya no está disponible.'], 'invalid safe dimension'));
  cover(35, () => assert(!render(api, { state: 'unavailable' }).includes('EmptyState'), 'unavailable must not become EmptyState'));
  cover(36, () => excludesAll(source, ['forbidden', 'unauthorized', 'DENIED'], 'authorization classification boundary'));
  cover(37, () => excludesAll(source, ['RecoverableErrorState', 'onRetry', 'retry'], 'recovery boundary'));
  cover(38, () => excludesAll(source, ['SiteSelector', 'onSiteChange'], 'site selector boundary'));
  cover(39, () => excludesAll(source, ['AreaSelector', 'onAreaChange'], 'area selector boundary'));
  cover(40, () => excludesAll(source, ['SensitiveActionConfirmation', 'onConfirm', 'reauth'], 'sensitive confirmation boundary'));
  cover(41, () => assert(api.ContextDiagnostic({ state: 'invalid', title: 'T', summary: 'S', conditions: [], preservedContext: [], blockedActions: [], resolution: { instruction: 'I' } }).type === 'section', 'root must be section'));
  cover(42, () => assert(!render(api).includes('role=\"alert\"'), 'role=alert must not be universal'));
  cover(43, () => assert(!render(api).includes('aria-live='), 'aria-live must not be universal'));
  cover(44, () => {
    const html = render(api, { conditions: [{ label: 'Condición', message: 'Detalle' }] });
    assert(html.indexOf('Contexto requiere atención') < html.indexOf('Condición'), 'reading order changed');
  });
  cover(45, () => excludesAll(source, ['autoFocus', '.focus(', 'tabIndex={0}'], 'focus boundary'));
  cover(46, () => excludesAll(source, ['onClick', 'onKeyDown', 'button', 'role="button"'], 'interaction boundary'));
  cover(47, () => includesAll(css, ['min-width: 0;', 'max-width: 100%;', 'overflow-wrap: anywhere;', '@media (max-width: 767px)'], 'responsive CSS'));
  cover(48, () => excludesAll(css, ['overflow: hidden;', 'white-space: nowrap;', 'text-overflow: ellipsis;'], 'zoom and clipping boundary'));
  cover(49, () => excludesAll(source, ['email', 'phone', 'documentNumber', 'accessToken', 'refreshToken'], 'shared-device privacy boundary'));
  cover(50, () => {
    assert(!/^[\s]*['"]use client['"];?/mu.test(source), 'component must remain server-safe');
    assert(render(api).includes('Contexto requiere atención'), 'server render failed');
  });
  cover(51, () => excludesAll(source, ['useState', 'useEffect', 'useReducer', 'setTimeout(', 'setInterval('], 'React state boundary'));
  cover(52, () => includesAll(readme, ['paridad por consumidor', 'antes de retirar legacy'], 'consumer parity deferral'));
  cover(53, () => includesAll(readme, ['SHELL, NEXO, FOGO, ORIGO, VISO, PULSO y NUMERA', '7/7'], 'consumer decisions'));
  cover(54, () => {
    assertGitUnchanged([
      'package.json', 'package-lock.json', 'packages/ui-web/package.json',
      'packages/ui-web/src/ContextIndicator.tsx', 'packages/ui-web/src/context-indicator.css',
      'packages/ui-web/src/SensitiveActionConfirmation.tsx', 'packages/ui-web/src/sensitive-action-confirmation.css',
      'src/components/ui', 'templates/app-shell-standard', 'packages/contracts', 'packages/os-context', 'packages/supabase',
    ]);
  });

  includesAll(css, STATES.map((state) => `[data-context-state='${state}']`), 'state styling');
  includesAll(css, ['var(--ui-border)', 'var(--ui-surface)', 'var(--ui-muted)', 'var(--ui-primary)', 'var(--ui-danger)'], 'theme tokens');
  assert(!/#[0-9a-f]{3,8}\b/iu.test(css), 'CSS must not hardcode colors');
  includesAll(readme, ['SHELL-UI-015::GLOBAL', 'src/ContextDiagnostic.tsx', 'src/context-diagnostic.css', 'scripts/validate-context-diagnostic.mjs'], 'README materialization');
  assert(covered.size === 54, `scenario coverage count mismatch: ${covered.size}`);
  for (let number = 1; number <= 54; number += 1) assert(covered.has(number), `scenario ${number} not covered`);
  console.log('PASS: SHELL-UI-015 ContextDiagnostic validated; scenarios=54 states=5 ssr=SAFE authority=NONE recovery=EXTERNAL consumers=0/7 exports=DEFERRED');
}

try {
  main();
} catch (error) {
  console.error(`FAIL: SHELL-UI-015 ContextDiagnostic validation: ${error instanceof Error ? error.message : String(error)}`);
  process.exitCode = 1;
}
