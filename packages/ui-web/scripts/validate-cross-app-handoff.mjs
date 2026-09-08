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
const componentPath = path.join(packageRoot, 'src', 'CrossAppHandoff.tsx');
const cssPath = path.join(packageRoot, 'src', 'cross-app-handoff.css');
const readmePath = path.join(packageRoot, 'README.md');
const packagePath = path.join(packageRoot, 'package.json');
const SOURCE_CONTRACT_SHA256 = '1b396d5b715783ce415de3aa48eeb4c2d0cefb2dbbd42307c1ba57c3ca70b83c';
const STATES = [
  'OFFERED',
  'ACCEPTED',
  'REJECTED',
  'EXPIRED',
  'CANCELLED',
  'PARTIALLY_ACCEPTED',
  'RECONCILIATION_REQUIRED',
];
const SLOTS = [
  'PERSISTENT_CONTEXT',
  'BLOCKING_STATE',
  'WORK_IDENTITY',
  'STEP_CONTENT',
  'PRIMARY_ACTION',
  'SECONDARY_SUPPORT',
  'RESULT_AND_RECEIPT',
];
const CONSUMER_DECISIONS = [
  'SHELL: `ELEGIBLE_SOLO_CON_RELACION_HANDOFF_CANONICA_Y_REVALIDACION`',
  'VISO: `ELEGIBLE_COMO_PROPIETARIA_O_PARTICIPANTE_SIN_CEDER_AUTORIDAD_A_UI`',
  'NEXO: `ELEGIBLE_SOLO_CON_RELACION_HANDOFF_CANONICA_Y_REVALIDACION`',
  'FOGO: `ELEGIBLE_SOLO_CON_RELACION_HANDOFF_CANONICA_Y_REVALIDACION`',
  'ORIGO: `ELEGIBLE_SOLO_CON_RELACION_HANDOFF_CANONICA_Y_REVALIDACION`',
  'PULSO: `ELEGIBLE_SOLO_CON_RELACION_HANDOFF_CANONICA_Y_REVALIDACION`',
  'NUMERA: `ELEGIBLE_SOLO_CON_RELACION_HANDOFF_CANONICA_Y_REVALIDACION`',
];

function count(source, value) {
  return source.split(value).length - 1;
}

function stateLiterals(source) {
  const match = source.match(/export type CrossAppHandoffState =([\s\S]*?);/u);
  assert(match, 'CrossAppHandoffState declaration not found');
  return [...match[1].matchAll(/'([A-Z_]+)'/gu)].map((entry) => entry[1]);
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
  assert(errors.length === 0, 'CrossAppHandoff transpile diagnostics contain errors');
  const runtimeModule = { exports: {} };
  const localRequire = (specifier) => {
    if (specifier === './cross-app-handoff.css') return {};
    return requireFromRepo(specifier);
  };
  const wrapper = vm.runInThisContext(
    `(function(require,module,exports){${compiled.outputText}\n})`,
    { filename: 'CrossAppHandoff.runtime.cjs' },
  );
  wrapper(localRequire, runtimeModule, runtimeModule.exports);
  return runtimeModule.exports;
}

function render(api, overrides = {}) {
  const React = requireFromRepo('react');
  const { renderToStaticMarkup } = requireFromRepo('react-dom/server');
  const props = {
    state: 'OFFERED',
    ariaLabel: 'Continuidad entre aplicaciones',
    persistentContext: React.createElement('p', null, 'Origen VISO hacia NEXO con contexto vigente'),
    workIdentity: React.createElement('h2', null, 'Recepcion OC-2026-00418'),
    stepContent: React.createElement('p', null, 'Oferta pendiente de aceptacion explicita'),
    ...overrides,
  };
  return renderToStaticMarkup(React.createElement(api.CrossAppHandoff, props));
}

function renderAllSlots(api, state = 'OFFERED') {
  const React = requireFromRepo('react');
  return render(api, {
    state,
    blockingState: React.createElement('p', null, 'Revalidacion requerida'),
    primaryAction: React.createElement('button', { type: 'button' }, 'Abrir destino permitido'),
    secondarySupport: React.createElement('button', { type: 'button' }, 'Revisar evidencia'),
    resultAndReceipt: React.createElement('p', null, 'Resultado propietario confirmado'),
  });
}

function assertSlotOrder(html) {
  let previous = -1;
  for (const slot of SLOTS) {
    const index = html.indexOf(`data-cross-app-handoff-slot="${slot}"`);
    assert(index > previous, `semantic slot order mismatch at ${slot}`);
    previous = index;
  }
}

function main() {
  const owner = fs.readFileSync(ownerPath, 'utf8');
  const task = parseTaskBlocks(owner).find((entry) => entry.id === 'SHELL-UI-020');
  const packageJson = JSON.parse(fs.readFileSync(packagePath, 'utf8'));
  const source = fs.readFileSync(componentPath, 'utf8');
  const css = fs.readFileSync(cssPath, 'utf8');
  const readme = fs.readFileSync(readmePath, 'utf8');
  const api = loadRuntime(source);

  assert(task, 'canonical task SHELL-UI-020 not found');
  assert(sha256(task.block) === SOURCE_CONTRACT_SHA256, 'source contract SHA256 mismatch');
  assert(
    packageJson.name === '@vento/ui-web' && packageJson.private === true,
    'private package identity mismatch',
  );
  for (const key of [
    'version',
    'main',
    'types',
    'exports',
    'dependencies',
    'devDependencies',
    'peerDependencies',
    'scripts',
  ]) {
    assert(!(key in packageJson), `package public surface must remain deferred: ${key}`);
  }

  includesAll(
    source,
    [
      'export function CrossAppHandoff',
      'export type CrossAppHandoffProps',
      'export type CrossAppHandoffState',
      'state: CrossAppHandoffState',
      'ariaLabel: string',
      'persistentContext: ReactNode',
      'workIdentity: ReactNode',
      'stepContent: ReactNode',
      'blockingState?: ReactNode',
      'primaryAction?: ReactNode',
      'secondarySupport?: ReactNode',
      'resultAndReceipt?: ReactNode',
      "import './cross-app-handoff.css';",
    ],
    'CrossAppHandoff source',
  );
  assert(
    JSON.stringify(stateLiterals(source)) === JSON.stringify(STATES),
    'CrossAppHandoffState must contain exactly the seven canonical states in canonical order',
  );

  const covered = new Set();
  const cover = (number, assertion) => {
    assertion();
    covered.add(number);
  };

  cover(1, () => assert(typeof api.CrossAppHandoff === 'function', 'CrossAppHandoff export missing'));
  cover(2, () => {
    for (const state of STATES) {
      includesAll(render(api, { state }), [`data-cross-app-handoff-state="${state}"`], `state ${state}`);
    }
  });
  cover(3, () => excludesAll(source, ['OPENED', 'NAVIGATED', 'DELIVERED', 'SUCCESS', 'DONE'], 'parallel state boundary'));
  cover(4, () => {
    const html = renderAllSlots(api);
    assertSlotOrder(html);
    assert(SLOTS.every((slot) => count(html, `data-cross-app-handoff-slot="${slot}"`) === 1), 'slot cardinality mismatch');
  });
  cover(5, () => includesAll(render(api), ['data-cross-app-handoff-slot="PERSISTENT_CONTEXT"', 'Origen VISO hacia NEXO con contexto vigente'], 'persistent context'));
  cover(6, () => includesAll(render(api), ['data-cross-app-handoff-slot="WORK_IDENTITY"', 'Recepcion OC-2026-00418'], 'work identity'));
  cover(7, () => includesAll(render(api), ['data-cross-app-handoff-slot="STEP_CONTENT"', 'Oferta pendiente de aceptacion explicita'], 'step content'));
  cover(8, () => assert(count(renderAllSlots(api), 'data-cross-app-handoff-slot="PRIMARY_ACTION"') === 1, 'primary action must render at most once'));
  cover(9, () => assert(!render(api).includes('data-cross-app-handoff-slot="PRIMARY_ACTION"'), 'primary action absence must be valid'));
  cover(10, () => includesAll(readme, ['La relacion canonica se resuelve antes del render'], 'canonical relation resolution'));
  cover(11, () => excludesAll(source, ['location.', 'pathname', 'searchParams', 'usePathname', 'useSearchParams'], 'URL relation inference'));
  cover(12, () => excludesAll(source, ['ownerAppCode', 'participantAppCode'], 'application ownership inference'));
  cover(13, () => includesAll(readme, ['El productor entrega origen y destino humanos'], 'origin presentation'));
  cover(14, () => includesAll(readme, ['origen y destino humanos'], 'destination presentation'));
  cover(15, () => includesAll(readme, ['la misma instancia empresarial'], 'same business instance'));
  cover(16, () => includesAll(readme, ['recurso y trabajo pendiente perceptibles'], 'resource preservation'));
  cover(17, () => includesAll(readme, ['trabajo pendiente perceptibles'], 'pending work presentation'));
  cover(18, () => includesAll(readme, ['El actor emisor permanece atribuible'], 'sender attribution'));
  cover(19, () => includesAll(readme, ['actor receptor se revalida en destino'], 'receiver revalidation'));
  cover(20, () => includesAll(readme, ['Sede y area pueden preservarse como contexto humano sin ampliar autoridad'], 'territorial context boundary'));
  cover(21, () => includesAll(readme, ['Navegacion completada no equivale a responsabilidad transferida'], 'navigation authority boundary'));
  cover(22, () => includesAll(readme, ['Un deep link opaco no transporta autoridad'], 'opaque deep link authority'));
  cover(23, () => includesAll(readme, ['actor autoritativo'], 'deep link actor boundary'));
  cover(24, () => includesAll(readme, ['estado objetivo a imponer'], 'deep link target state boundary'));
  cover(25, () => includesAll(readme, ['el destino permitido se resuelve externamente'], 'destination resolution'));
  cover(26, () => includesAll(readme, ['Un retorno valido conserva la instancia original'], 'return continuity'));
  cover(27, () => includesAll(readme, ['un retorno invalido falla cerrado'], 'invalid return boundary'));
  cover(28, () => includesAll(readme, ['Abrir otra aplicacion no equivale a aceptar el handoff'], 'open destination acceptance boundary'));
  cover(29, () => includesAll(readme, ['entregar tecnicamente, visualizar o abrir destino no equivale a aceptar'], 'delivery acceptance boundary'));
  cover(30, () => includesAll(readme, ['ACK TECNICO != EFFECT_CONFIRMED'], 'technical ack boundary'));
  cover(31, () => includesAll(readme, ['`OFFERED` no transfiere responsabilidad'], 'OFFERED semantics'));
  cover(32, () => includesAll(readme, ['`ACCEPTED` requiere resultado propietario'], 'ACCEPTED semantics'));
  cover(33, () => includesAll(readme, ['`REJECTED` no cancela todo el proceso por inferencia'], 'REJECTED semantics'));
  cover(34, () => includesAll(readme, ['`EXPIRED` no reutiliza autoridad vencida'], 'EXPIRED semantics'));
  cover(35, () => includesAll(readme, ['`CANCELLED` no se deriva del cierre visual'], 'CANCELLED semantics'));
  cover(36, () => includesAll(readme, ['`PARTIALLY_ACCEPTED` no se presenta como exito global'], 'partial acceptance semantics'));
  cover(37, () => includesAll(readme, ['`RECONCILIATION_REQUIRED` conserva incertidumbre sin correccion cross-app directa'], 'reconciliation boundary'));
  cover(38, () => includesAll(readme, ['`RESULT_UNKNOWN` se resuelve antes de retry'], 'unknown result boundary'));
  cover(39, () => {
    excludesAll(source, ['idempotencyKey', 'retry(', 'retryPolicy', 'canRetry'], 'idempotency and retry ownership');
    includesAll(readme, ['UI020 no genera idempotency keys'], 'idempotency documentation');
  });
  cover(40, () => includesAll(readme, ['Un replay de resultado previo conserva la identidad del efecto y no habilita un segundo efecto'], 'result replay boundary'));
  cover(41, () => includesAll(readme, ['La participante solicita, recibe, acepta o ejecuta solamente su responsabilidad permitida'], 'participant ownership'));
  cover(42, () => includesAll(readme, ['SHELL como writer universal'], 'SHELL writer boundary'));
  cover(43, () => includesAll(readme, ['`HANDOFF_REQUEST`, `HANDOFF_PROJECTION`, `HANDOFF_FACT` y `BusinessEventId` permanecen identidades distintas'], 'event separation'));
  cover(44, () => includesAll(readme, ['`HANDOFF_REQUEST`', '`HANDOFF_FACT`'], 'request fact separation'));
  cover(45, () => includesAll(readme, ['ni convierte la matriz visual en fuente contractual'], 'projection source-of-truth boundary'));
  cover(46, () => includesAll(readme, ['Claims y leases se revalidan fuera del componente'], 'claim revalidation'));
  cover(47, () => includesAll(readme, ['Custodia digital y custodia fisica permanecen hechos distintos'], 'custody boundary'));
  cover(48, () => includesAll(readme, ['Cambiar actor no transfiere borrador, claim, custodia ni aceptacion'], 'actor change boundary'));
  cover(49, () => includesAll(readme, ['Cambiar dispositivo', 'exige nueva resolucion externa'], 'device change boundary'));
  cover(50, () => includesAll(readme, ['sede, area, turno, check-in', 'exige nueva resolucion externa'], 'territorial change boundary'));
  cover(51, () => includesAll(readme, ['Una sesion vencida no permite aceptar'], 'expired session boundary'));
  cover(52, () => includesAll(readme, ['Offline local no se presenta como recepcion remota'], 'offline boundary'));
  cover(53, () => includesAll(readme, ['un mensaje en cola no se presenta como aceptacion'], 'queued message boundary'));
  cover(54, () => includesAll(readme, ['La reconexion revalida sesion, contexto, contrato y resultado antes de actuar'], 'reconnection revalidation'));
  cover(55, () => includesAll(readme, ['Evidencia presente no equivale a resultado empresarial confirmado'], 'evidence result boundary'));
  cover(56, () => includesAll(readme, ['la proyeccion se minimiza antes del render'], 'data minimization'));
  cover(57, () => {
    excludesAll(source, ['accessToken', 'refreshToken', 'handoffSecret'], 'secret boundary');
    includesAll(readme, ['No se muestran secretos, tokens, credenciales, OTP, PIN'], 'secret documentation');
  });
  cover(58, () => includesAll(readme, ['En dispositivo compartido la proyeccion se minimiza antes del render'], 'shared device privacy'));
  cover(59, () => includesAll(readme, ['teclado'], 'keyboard accessibility'));
  cover(60, () => includesAll(readme, ['lector de pantalla'], 'screen reader accessibility'));
  cover(61, () => includesAll(css, ['min-inline-size: max(3rem, 48px);', 'min-block-size: max(3rem, 48px);'], 'touch target CSS'));
  cover(62, () => includesAll(css, [':focus-visible', 'scroll-margin-block: 1rem;'], 'focus CSS'));
  cover(63, () => includesAll(readme, ['sin depender de hover, gesto oculto, color o movimiento como unico significado'], 'non-color-only semantics'));
  cover(64, () => includesAll(css, ['min-width: 0;', 'max-width: 100%;', '@media (max-width: 639px)'], 'responsive reflow CSS'));
  cover(65, () => includesAll(readme, ['el `AppSwitcher` historico permanece launcher, no handoff'], 'AppSwitcher boundary'));
  cover(66, () => includesAll(readme, ['AppShell conserva navegacion transversal ordinaria'], 'launcher navigation separation'));
  cover(67, () => excludesAll(source, ['@vento/supabase', 'supabase', 'RPC', 'EdgeFunction'], 'Supabase dependency boundary'));
  cover(68, () => {
    excludesAll(source, ["'use client'", '"use client"', 'window.', 'document.', 'localStorage', 'sessionStorage', 'setTimeout(', 'setInterval(', 'fetch(', 'XMLHttpRequest', 'WebSocket'], 'server-safe boundary');
    assert(!source.includes('useState(') && !source.includes('useEffect('), 'server-safe React hooks boundary');
  });
  cover(69, () => {
    includesAll(readme, CONSUMER_DECISIONS, 'consumer decisions');
    assert(CONSUMER_DECISIONS.length === 7, 'consumer decision count must be seven');
  });
  cover(70, () => includesAll(readme, ['permanecen evaluados 7/7. Faltantes: 0. Duplicados: 0.'], 'consumer completeness'));
  cover(71, () => includesAll(readme, ['ANIMA, AURA y PASS no se agregan artificialmente al conjunto web'], 'non-web participant boundary'));
  cover(72, () => includesAll(readme, ['49 relaciones', 'UI020 no copia esas 49 relaciones dentro del package'], 'external handoff universe'));
  cover(73, () => includesAll(readme, ['La compatibilidad de origen y destino se prueba antes de adopcion'], 'compatibility before adoption'));
  cover(74, () => includesAll(readme, ['existe rollback antes de retirar un patron legacy'], 'rollback before retirement'));
  cover(75, () => includesAll(readme, ['el retiro exige uso residual cero'], 'zero residual use'));
  cover(76, () => {
    includesAll(readme, ['Las migraciones posteriores deben conservar ausencia de escritura cross-app prohibida'], 'cross-app write prohibition');
    excludesAll(source, ['insert(', 'update(', 'delete(', 'upsert(', 'mutate(', 'commandBus', 'postMessage('], 'cross-app mutation boundary');
  });

  assert(covered.size === 76, `scenario coverage count mismatch: ${covered.size}`);
  for (let number = 1; number <= 76; number += 1) {
    assert(covered.has(number), `scenario coverage missing: ${number}`);
  }

  includesAll(
    css,
    [
      '.ui-cross-app-handoff',
      '.ui-cross-app-handoff__persistent-context',
      '.ui-cross-app-handoff__blocking-state',
      '.ui-cross-app-handoff__work-identity',
      '.ui-cross-app-handoff__step-content',
      '.ui-cross-app-handoff__action-rail',
      '.ui-cross-app-handoff__primary-action',
      '.ui-cross-app-handoff__secondary-support',
      '.ui-cross-app-handoff__result-and-receipt',
      'overflow-wrap: anywhere;',
      '@media (min-width: 960px)',
    ],
    'CrossAppHandoff CSS',
  );
  excludesAll(css, ['overflow: hidden', 'animation:', 'transition:'], 'CSS safety boundary');
  includesAll(
    readme,
    [
      '## CrossAppHandoff',
      '`CROSS-APP-HANDOFF-PRESENTATION-CONTRACT-001`',
      'Consumidores migrados por UI020: 0/7',
      'Cambios Supabase por UI020: 0',
      'TAREA ACTUAL APROBADA: `SHELL-UI-020`',
      'SIGUIENTE TAREA RESERVADA: `SHELL-MIG-001`',
      '`CrossAppHandoff` conserva region nombrada',
    ],
    'README UI020 materialization',
  );
  assertGitUnchanged([
    'packages/ui-web/package.json',
    'packages/ui-web/src/InterruptedProcessState.tsx',
    'packages/ui-web/src/interrupted-process-state.css',
    'packages/ui-web/scripts/validate-interrupted-process-state.mjs',
  ]);

  console.log(
    'PASS: SHELL-UI-020 CrossAppHandoff validated; '
      + 'scenarios=76 states=7 slots=7 ssr=SAFE authority=NONE navigation=EXTERNAL '
      + 'handoff=EXTERNAL consumers=0/7 exports=DEFERRED',
  );
}

main();
