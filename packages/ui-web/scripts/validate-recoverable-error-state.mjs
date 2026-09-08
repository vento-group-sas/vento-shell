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
const componentPath = path.join(packageRoot, 'src', 'RecoverableErrorState.tsx');
const cssPath = path.join(packageRoot, 'src', 'recoverable-error-state.css');
const readmePath = path.join(packageRoot, 'README.md');
const packagePath = path.join(packageRoot, 'package.json');
const SOURCE_CONTRACT_SHA256 = '02c9d99d8d959762cedcb56979563e7844dcabddeb14a83347160329820536a6';
const CATEGORIES = ['CONFLICT', 'TECHNICAL_FAILURE', 'VALIDATION_REQUIRED'];
const PRESERVED_STATES = ['NONE', 'LOCAL', 'SERVER', 'PARTIAL', 'UNKNOWN'];

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
  assert(errors.length === 0, 'RecoverableErrorState transpile diagnostics contain errors');
  const runtimeModule = { exports: {} };
  const localRequire = (specifier) => {
    if (specifier === './recoverable-error-state.css') return {};
    return requireFromRepo(specifier);
  };
  const wrapper = vm.runInThisContext(`(function(require,module,exports){${compiled.outputText}\n})`, { filename: 'RecoverableErrorState.runtime.cjs' });
  wrapper(localRequire, runtimeModule, runtimeModule.exports);
  return runtimeModule.exports;
}

function render(api, overrides = {}) {
  const React = requireFromRepo('react');
  const { renderToStaticMarkup } = requireFromRepo('react-dom/server');
  const props = {
    category: 'TECHNICAL_FAILURE',
    title: 'No pudimos completar este paso',
    summary: 'Tu trabajo sigue disponible mientras revisamos el siguiente paso seguro.',
    preservedState: 'LOCAL',
    preservedStateLabel: 'Borrador conservado en este equipo',
    details: [],
    nextStep: 'Revisa el estado antes de continuar.',
    ...overrides,
  };
  return renderToStaticMarkup(React.createElement(api.RecoverableErrorState, props));
}

function main() {
  const owner = fs.readFileSync(ownerPath, 'utf8');
  const task = parseTaskBlocks(owner).find((entry) => entry.id === 'SHELL-UI-016');
  const packageJson = JSON.parse(fs.readFileSync(packagePath, 'utf8'));
  const source = fs.readFileSync(componentPath, 'utf8');
  const css = fs.readFileSync(cssPath, 'utf8');
  const readme = fs.readFileSync(readmePath, 'utf8');
  const api = loadRuntime(source);

  assert(task, 'canonical task SHELL-UI-016 not found');
  assert(sha256(task.block) === SOURCE_CONTRACT_SHA256, 'source contract SHA256 mismatch');
  assert(packageJson.name === '@vento/ui-web' && packageJson.private === true, 'private package identity mismatch');
  for (const key of ['version', 'main', 'types', 'exports', 'dependencies', 'devDependencies', 'peerDependencies', 'scripts']) {
    assert(!(key in packageJson), `package public surface must remain deferred: ${key}`);
  }

  includesAll(source, [
    'export function RecoverableErrorState',
    'export type RecoverableErrorCategory',
    'export interface RecoverableErrorDetail',
    'export type RecoverableErrorStateProps',
    "'CONFLICT'",
    "'TECHNICAL_FAILURE'",
    "'VALIDATION_REQUIRED'",
    "'NONE'",
    "'LOCAL'",
    "'SERVER'",
    "'PARTIAL'",
    "'UNKNOWN'",
    'primaryRecoveryControl?: ReactNode',
    'secondaryRecoveryControls?: readonly ReactNode[]',
    "import './recoverable-error-state.css';",
  ], 'RecoverableErrorState source');

  const covered = new Set();
  const cover = (number, assertion) => {
    assertion();
    covered.add(number);
  };

  cover(1, () => includesAll(render(api, { category: 'CONFLICT' }), ['data-error-category="CONFLICT"', 'No pudimos completar este paso'], 'CONFLICT render'));
  cover(2, () => includesAll(render(api, { category: 'TECHNICAL_FAILURE' }), ['data-error-category="TECHNICAL_FAILURE"'], 'TECHNICAL_FAILURE render'));
  cover(3, () => includesAll(render(api, { category: 'VALIDATION_REQUIRED' }), ['data-error-category="VALIDATION_REQUIRED"'], 'VALIDATION_REQUIRED render'));
  cover(4, () => excludesAll(source, ["'BLOCKED'", "'DENIED'", "'WAITING'", "'WARNING'", "'INFO'", "'ERROR'"], 'root category boundary'));
  cover(5, () => includesAll(render(api, { preservedState: 'NONE', preservedStateLabel: 'No hay trabajo recuperable representado' }), ['data-preserved-state="NONE"', 'No hay trabajo recuperable representado'], 'NONE presentation'));
  cover(6, () => includesAll(render(api, { preservedState: 'LOCAL', preservedStateLabel: 'Borrador local conservado' }), ['data-preserved-state="LOCAL"', 'Borrador local conservado'], 'LOCAL presentation'));
  cover(7, () => includesAll(render(api, { preservedState: 'SERVER', preservedStateLabel: 'Estado confirmado por el servidor' }), ['data-preserved-state="SERVER"', 'Estado confirmado por el servidor'], 'SERVER presentation'));
  cover(8, () => includesAll(render(api, { preservedState: 'PARTIAL', preservedStateLabel: '8 de 10 elementos confirmados' }), ['data-preserved-state="PARTIAL"', '8 de 10 elementos confirmados'], 'PARTIAL presentation'));
  cover(9, () => includesAll(render(api, { preservedState: 'UNKNOWN', preservedStateLabel: 'Resultado todavia no confirmado' }), ['data-preserved-state="UNKNOWN"', 'Resultado todavia no confirmado'], 'UNKNOWN presentation'));
  cover(10, () => excludesAll(source, ['onRetry', 'retry(', 'retryCount', 'retryAfter', 'canRetry'], 'blind retry boundary'));
  cover(11, () => includesAll(render(api), ['ui-recoverable-error-state__preserved-label', 'Borrador conservado en este equipo'], 'preserved state label'));
  cover(12, () => excludesAll(source, ['window.', 'document.', 'localStorage', 'sessionStorage', 'location.search', 'searchParams'], 'inference boundary'));
  cover(13, () => excludesAll(source, ['instanceof Error', 'error.message', 'exception', 'stack'], 'exception parsing boundary'));
  cover(14, () => excludesAll(source, ['reasonCode', 'reason_code', 'reasonCodes'], 'reason code boundary'));
  cover(15, () => excludesAll(source, ['sqlState', 'SQLSTATE', 'accessToken', 'refreshToken', 'payload', 'metadata'], 'sensitive technical data boundary'));
  cover(16, () => includesAll(render(api), ['ui-recoverable-error-state__next-step', 'Revisa el estado antes de continuar.'], 'required next step'));
  cover(17, () => assert(!render(api).includes('ui-recoverable-error-state__controls'), 'controls must be absent without supplied recovery action'));
  cover(18, () => {
    const React = requireFromRepo('react');
    const html = render(api, { primaryRecoveryControl: React.createElement('button', { type: 'button' }, 'Consultar estado') });
    includesAll(html, ['ui-recoverable-error-state__primary-control', '<button', 'Consultar estado'], 'primary recovery control');
  });
  cover(19, () => {
    const React = requireFromRepo('react');
    const html = render(api, { secondaryRecoveryControls: [React.createElement('a', { href: '/support', key: 'support' }, 'Abrir seguimiento')] });
    includesAll(html, ['ui-recoverable-error-state__secondary-controls', '<a', 'Abrir seguimiento'], 'secondary recovery controls');
  });
  cover(20, () => excludesAll(source, ['businessIntent', 'originalIntent', 'executeRecovery', 'performRecovery'], 'business intent execution boundary'));
  cover(21, () => excludesAll(source, ['idempotencyKey', 'idempotency_key', 'correlationId', 'correlation_id'], 'idempotency boundary'));
  cover(22, () => excludesAll(source, ['lastWriteWins', 'overwrite', 'forceWrite', 'mergeConflict'], 'conflict resolution boundary'));
  cover(23, () => assert(!render(api, { preservedState: 'PARTIAL', preservedStateLabel: 'Parcial', details: [] }).includes('Completado'), 'partial state must not invent completion'));
  cover(24, () => assert(!source.includes('EmptyState'), 'failed or incomplete results must not become EmptyState'));
  cover(25, () => excludesAll(source, ['permissionKey', 'roleCode', 'isAuthorized', 'authorize', 'hasEffectivePermission', 'getEffectiveContext'], 'authorization and context boundary'));
  cover(26, () => assert(!source.includes('ContextDiagnostic'), 'context diagnosis must remain separate'));
  cover(27, () => assert(!source.includes("from './Alert'"), 'Alert must not absorb recovery contract'));
  cover(28, () => assert(!source.includes("from './Button'"), 'Button must not become recovery policy'));
  cover(29, () => assert(!source.includes('SensitiveActionConfirmation'), 'sensitive confirmation remains externally composed'));
  cover(30, () => excludesAll(source, ['onClose', 'onCancel', 'AbortController', '.abort('], 'remote cancellation boundary'));
  cover(31, () => excludesAll(source, ['429', 'rateLimit', 'setInterval(', 'setTimeout('], 'rate limit and timer boundary'));
  cover(32, () => excludesAll(source, ['attemptCount', 'maxAttempts', 'backoff', 'retryPolicy'], 'attempt policy boundary'));
  cover(33, () => includesAll(render(api, { supportReference: 'REF-7K4M' }), ['ui-recoverable-error-state__support-reference', 'REF-7K4M'], 'opaque support reference'));
  cover(34, () => excludesAll(source, ['autoFocus', '.focus(', 'tabIndex={0}'], 'focus stealing boundary'));
  cover(35, () => {
    const html = render(api);
    assert(!html.includes('role="alert"'), 'role=alert must not be universal');
    assert(!html.includes('aria-live='), 'aria-live must not be universal');
  });
  cover(36, () => {
    includesAll(css, ["[data-error-category='CONFLICT']", "[data-error-category='TECHNICAL_FAILURE']", "[data-error-category='VALIDATION_REQUIRED']"], 'category structural styling');
    assert(render(api).includes('Borrador conservado en este equipo'), 'state meaning must remain textual');
  });
  cover(37, () => excludesAll(source, ['onKeyDown', 'role="button"', 'tabIndex={-1}'], 'custom keyboard trap boundary'));
  cover(38, () => includesAll(css, ['min-width: 0;', 'max-width: 100%;', '@media (max-width: 767px)'], 'responsive CSS'));
  cover(39, () => excludesAll(css, ['overflow: hidden;', 'white-space: nowrap;', 'text-overflow: ellipsis;'], 'zoom and clipping boundary'));
  cover(40, () => includesAll(css, ['ui-recoverable-error-state__controls', 'grid-template-columns: minmax(0, 1fr);'], 'touch and narrow-layout control flow'));
  cover(41, () => excludesAll(css, ['animation:', 'transition:', '@keyframes'], 'motion boundary'));
  cover(42, () => excludesAll(source, ['user_id', 'session_id', 'currentActor', 'previousActor', 'email', 'phone', 'documentNumber'], 'shared-device privacy boundary'));
  cover(43, () => excludesAll(source, ['aria-label={supportReference}', 'aria-description', 'data-debug', 'data-stack'], 'assistive privacy boundary'));
  cover(44, () => {
    assert(!/^[\s]*['"]use client['"];?/mu.test(source), 'component must remain server-safe');
    assert(render(api).includes('No pudimos completar este paso'), 'server render failed');
  });
  cover(45, () => excludesAll(source, ['@vento/supabase', '@supabase/', '.from(', '.rpc(', '.storage', '.auth'], 'Supabase boundary'));
  cover(46, () => excludesAll(source, ['fetch(', 'axios', 'XMLHttpRequest', 'WebSocket'], 'network boundary'));
  cover(47, () => excludesAll(source, ['setTimeout(', 'setInterval(', 'requestAnimationFrame('], 'authoritative timer boundary'));
  cover(48, () => includesAll(readme, ['SHELL, NEXO, FOGO, ORIGO, VISO, PULSO y NUMERA', '7/7'], 'seven consumer decisions'));
  cover(49, () => includesAll(readme, ['paridad por consumidor', 'antes de retirar legacy'], 'consumer parity and legacy retirement'));
  cover(50, () => {
    assertGitUnchanged([
      'package.json',
      'package-lock.json',
      'packages/ui-web/package.json',
      'packages/ui-web/src/Alert.tsx',
      'packages/ui-web/src/alert.css',
      'packages/ui-web/src/Button.tsx',
      'packages/ui-web/src/button.css',
      'packages/ui-web/src/Card.tsx',
      'packages/ui-web/src/card.css',
      'packages/ui-web/src/EmptyState.tsx',
      'packages/ui-web/src/empty-state.css',
      'packages/ui-web/src/ContextIndicator.tsx',
      'packages/ui-web/src/context-indicator.css',
      'packages/ui-web/src/PrimaryActionPanel.tsx',
      'packages/ui-web/src/primary-action-panel.css',
      'packages/ui-web/src/SensitiveActionConfirmation.tsx',
      'packages/ui-web/src/sensitive-action-confirmation.css',
      'packages/ui-web/src/ContextDiagnostic.tsx',
      'packages/ui-web/src/context-diagnostic.css',
      'src/components/ui',
      'templates/app-shell-standard',
      'packages/contracts',
      'packages/os-context',
      'packages/supabase',
    ]);
  });

  includesAll(css, CATEGORIES.map((category) => `[data-error-category='${category}']`), 'category styling');
  includesAll(css, PRESERVED_STATES.map((state) => `[data-preserved-state='${state}']`), 'preserved state styling');
  includesAll(css, ['var(--ui-border)', 'var(--ui-surface)', 'var(--ui-surface-2)', 'var(--ui-muted)', 'var(--ui-primary)', 'var(--ui-danger)'], 'theme tokens');
  assert(!/#[0-9a-f]{3,8}\b/iu.test(css), 'CSS must not hardcode colors');
  includesAll(readme, ['SHELL-UI-016::GLOBAL', 'src/RecoverableErrorState.tsx', 'src/recoverable-error-state.css', 'scripts/validate-recoverable-error-state.mjs'], 'README materialization');
  assert(covered.size === 50, `scenario coverage count mismatch: ${covered.size}`);
  for (let number = 1; number <= 50; number += 1) assert(covered.has(number), `scenario ${number} not covered`);
  console.log('PASS: SHELL-UI-016 RecoverableErrorState validated; scenarios=50 categories=3 preserved_states=5 ssr=SAFE authority=NONE recovery=EXTERNAL consumers=0/7 exports=DEFERRED');
}

try {
  main();
} catch (error) {
  console.error(`FAIL: SHELL-UI-016 RecoverableErrorState validation: ${error instanceof Error ? error.message : String(error)}`);
  process.exitCode = 1;
}
