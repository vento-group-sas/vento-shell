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
const componentPath = path.join(packageRoot, 'src', 'TaskNavigation.tsx');
const cssPath = path.join(packageRoot, 'src', 'task-navigation.css');
const appShellPath = path.join(packageRoot, 'src', 'AppShell.tsx');

const SOURCE_CONTRACT_SHA256 = 'deb966aa36911398405e13a62adbfb5b49c7efa421fa061c2e4685fd68664755';

function assertThrows(action, pattern, message) {
  let caught = null;
  try {
    action();
  } catch (error) {
    caught = error;
  }
  assert(caught instanceof Error && pattern.test(caught.message), message);
}

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
  assert(blockingDiagnostics.length === 0, 'TaskNavigation transpile diagnostics contain errors');

  const runtimeModule = { exports: {} };
  const localRequire = (specifier) => {
    if (specifier === './task-navigation.css') return {};
    return requireFromRepo(specifier);
  };
  const wrapper = vm.runInThisContext(
    `(function(require,module,exports){${compiled.outputText}\n})`,
    { filename: 'TaskNavigation.runtime.cjs' },
  );
  wrapper(localRequire, runtimeModule, runtimeModule.exports);
  return runtimeModule.exports;
}

function sampleGroups(React) {
  return [
    {
      groupId: 'now',
      label: 'Ahora',
      description: 'Trabajo prioritario ya resuelto',
      items: [
        {
          navigationId: 'receive',
          intentCode: 'RECEIVE_WORK',
          label: 'Recibir pendientes',
          description: 'Revisa lo que requiere atencion',
          href: '/work/receive',
          state: 'PRIMARY',
          statusLabel: 'Listo para revisar',
          ownerLabel: 'NEXO',
          icon: React.createElement('span', null, 'R'),
        },
        {
          navigationId: 'audit',
          intentCode: 'AUDIT_WORK',
          label: 'Auditar movimientos',
          href: 'https://audit.example.test/work',
          state: 'SECONDARY',
        },
      ],
    },
    {
      groupId: 'later',
      label: 'Despues',
      items: [
        {
          navigationId: 'discover',
          intentCode: 'DISCOVER_WORK',
          label: 'Explorar conciliaciones',
          href: '/work/discover',
          state: 'DISCOVERABLE',
        },
        {
          navigationId: 'context-blocked',
          intentCode: 'CONTEXT_BLOCKED',
          label: 'Preparar despacho',
          href: '/work/dispatch',
          state: 'CONTEXTUAL_DISABLED',
          statusLabel: 'Selecciona contexto primero',
        },
        {
          navigationId: 'required-blocked',
          intentCode: 'REQUIRED_BLOCKED_WORK',
          label: 'Resolver bloqueo',
          href: '/work/blocked',
          state: 'REQUIRED_BLOCKED',
          statusLabel: 'Requiere una condicion previa',
        },
      ],
    },
  ];
}

function renderNavigation(api, overrides = {}) {
  const React = requireFromRepo('react');
  const { renderToStaticMarkup } = requireFromRepo('react-dom/server');
  const props = {
    ariaLabel: 'Trabajo de NEXO',
    groups: sampleGroups(React),
    ...overrides,
  };
  return renderToStaticMarkup(React.createElement(api.TaskNavigation, props));
}

function main() {
  const owner = fs.readFileSync(ownerPath, 'utf8');
  const taskBlock = canonicalTaskBlock(owner, 'SHELL-UI-011');
  const packageJson = JSON.parse(fs.readFileSync(packagePath, 'utf8'));
  const readme = fs.readFileSync(readmePath, 'utf8');
  const source = fs.readFileSync(componentPath, 'utf8');
  const css = fs.readFileSync(cssPath, 'utf8');
  const appShellSource = fs.readFileSync(appShellPath, 'utf8');
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
    'export type TaskNavigationPresentationState =',
    "| 'PRIMARY'",
    "| 'SECONDARY'",
    "| 'DISCOVERABLE'",
    "| 'CONTEXTUAL_DISABLED'",
    "| 'REQUIRED_BLOCKED'",
    'export type TaskNavigationItem =',
    'navigationId: string;',
    'intentCode: string;',
    'href?: string;',
    'statusLabel?: string;',
    'ownerLabel?: string;',
    'icon?: ReactNode;',
    'export type TaskNavigationGroup =',
    'groupId: string;',
    'items: readonly TaskNavigationItem[];',
    'export type TaskNavigationProps =',
    'ariaLabel: string;',
    'groups: readonly TaskNavigationGroup[];',
    'currentNavigationId?: string;',
    'assertUniqueIdentities(groups);',
    "role=\"group\"",
    'aria-label={ariaLabel}',
    'aria-label={group.label}',
    "aria-current={isCurrent ? 'page' : undefined}",
    'aria-disabled="true"',
    'data-navigation-id={item.navigationId}',
    'data-intent-code={item.intentCode}',
    'data-state={item.state}',
    "import './task-navigation.css';",
  ], 'TaskNavigation source');

  excludesAll(source, [
    "'use client'",
    'HIDDEN',
    'permissionCode',
    'requiredPermissions',
    'anyOfPermissions',
    'allowedRoles',
    'AccessContext',
    'AuthorizationDecision',
    'canAccess',
    'canExecute',
    '@vento/os-context',
    '@vento/supabase',
    '@supabase/',
    'createClient',
    '.from(',
    '.rpc(',
    '.auth',
    'usePathname',
    'useSearchParams',
    'useRouter',
    'next/navigation',
    'URLSearchParams',
    'window.',
    'document.',
    'localStorage',
    'sessionStorage',
    'indexedDB',
    'fetch(',
    'XMLHttpRequest',
    'WebSocket',
    'useState(',
    'useEffect(',
    'useLayoutEffect(',
    '.sort(',
    'claim(',
    'start(',
    'approve(',
    'complete(',
    '<nav',
    'role="navigation"',
  ], 'server-safe authority and landmark boundary');

  includesAll(readme, [
    'SHELL-UI-011::GLOBAL',
    'src/TaskNavigation.tsx',
    'src/task-navigation.css',
    'scripts/validate-task-navigation.mjs',
    'TaskNavigationPresentationState',
    'currentNavigationId',
    'permissionCode',
    'AppShell.navigation',
    'Consumidores migrados por UI011: 0/7',
    'SHELL-UI-012',
  ], 'README materialization');

  const covered = new Set();
  const cover = (number, assertion) => {
    assertion();
    covered.add(number);
  };

  cover(1, () => {
    const rendered = renderNavigation(api);
    assert(rendered.indexOf('Ahora') < rendered.indexOf('Despues'), 'group order must be preserved');
  });

  cover(2, () => {
    const rendered = renderNavigation(api);
    assert(rendered.indexOf('Recibir pendientes') < rendered.indexOf('Auditar movimientos'), 'item order must be preserved');
  });

  cover(3, () => {
    const React = requireFromRepo('react');
    const groups = sampleGroups(React);
    groups[1].items[0].navigationId = 'receive';
    assertThrows(
      () => renderNavigation(api, { groups }),
      /duplicate navigationId/u,
      'duplicate navigationId must fail closed',
    );
  });

  cover(4, () => {
    const rendered = renderNavigation(api, { currentNavigationId: 'audit' });
    assert((rendered.match(/aria-current="page"/gu) ?? []).length === 1, 'exactly one current destination expected');
    assert(rendered.includes('data-navigation-id="audit"'), 'current destination identity must remain stable');
  });

  cover(5, () => {
    const rendered = renderNavigation(api, { currentNavigationId: 'missing' });
    assert(!rendered.includes('aria-current="page"'), 'missing currentNavigationId must not invent current destination');
  });

  cover(6, () => {
    const rendered = renderNavigation(api);
    assert(rendered.includes('RECEIVE_WORK') && !rendered.includes('>RECEIVE_WORK<'), 'intentCode must remain metadata, not ordinary copy');
  });

  cover(7, () => {
    const rendered = renderNavigation(api);
    assert(rendered.includes('href="/work/receive"'), 'relative href must be preserved');
  });

  cover(8, () => {
    const rendered = renderNavigation(api);
    assert(rendered.includes('href="https://audit.example.test/work"'), 'absolute href must be preserved');
  });

  cover(9, () => assert(!source.includes('permissionCode'), 'permissionCode must not exist in public component API'));
  cover(10, () => assert(!source.includes('HIDDEN'), 'HIDDEN must not be renderable'));

  cover(11, () => {
    const rendered = renderNavigation(api);
    assert(rendered.includes('ui-task-navigation__item-content--primary'), 'PRIMARY presentation must render');
  });

  cover(12, () => {
    const rendered = renderNavigation(api);
    assert(rendered.includes('ui-task-navigation__item-content--secondary'), 'SECONDARY presentation must render');
  });

  cover(13, () => {
    const rendered = renderNavigation(api);
    assert(rendered.includes('ui-task-navigation__item-content--discoverable'), 'DISCOVERABLE presentation must render');
  });

  cover(14, () => {
    const rendered = renderNavigation(api);
    const match = rendered.match(/<span[^>]*data-navigation-id="context-blocked"[^>]*>/u);
    assert(match && match[0].includes('aria-disabled="true"'), 'CONTEXTUAL_DISABLED must be non-actionable');
    assert(!rendered.includes('href="/work/dispatch"'), 'CONTEXTUAL_DISABLED href must not become actionable');
  });

  cover(15, () => {
    const rendered = renderNavigation(api);
    const match = rendered.match(/<span[^>]*data-navigation-id="required-blocked"[^>]*>/u);
    assert(match && match[0].includes('aria-disabled="true"'), 'REQUIRED_BLOCKED must be non-actionable');
    assert(!rendered.includes('href="/work/blocked"'), 'REQUIRED_BLOCKED href must not become actionable');
  });

  cover(16, () => excludesAll(source, ['permissionCode', 'requiredPermissions', 'canAccess'], 'permission inference boundary'));
  cover(17, () => excludesAll(source, ['role:', 'allowedRoles', 'roleOverride'], 'role boundary'));
  cover(18, () => excludesAll(source, ['AccessContext', 'siteId', 'areaId', 'shiftId'], 'context boundary'));
  cover(19, () => excludesAll(source, ['@vento/supabase', '@supabase/', '.from(', '.rpc('], 'Supabase boundary'));
  cover(20, () => excludesAll(source, ['fetch(', 'XMLHttpRequest', 'WebSocket'], 'network boundary'));
  cover(21, () => excludesAll(source, ['usePathname', 'pathname', 'next/navigation'], 'pathname boundary'));
  cover(22, () => excludesAll(source, ['useSearchParams', 'URLSearchParams', 'searchParams'], 'query boundary'));
  cover(23, () => excludesAll(source, ['localStorage', 'sessionStorage', 'indexedDB'], 'storage boundary'));
  cover(24, () => assert(!source.includes('.sort('), 'component must preserve owner-supplied order'));
  cover(25, () => excludesAll(source, ['claim(', 'start(', 'approve(', 'complete('], 'business transition boundary'));

  cover(26, () => {
    const React = requireFromRepo('react');
    const groups = sampleGroups(React);
    groups[0].items[0].label = 'Nuevo copy humano';
    const rendered = renderNavigation(api, { groups });
    includesAll(rendered, ['data-navigation-id="receive"', 'Nuevo copy humano'], 'label-independent identity');
  });

  cover(27, () => {
    const React = requireFromRepo('react');
    const groups = sampleGroups(React);
    groups[0].items[0].href = '/otro-destino';
    const rendered = renderNavigation(api, { groups });
    includesAll(rendered, ['data-navigation-id="receive"', 'href="/otro-destino"'], 'href-independent identity');
  });

  cover(28, () => {
    const rendered = renderNavigation(api);
    const itemStart = rendered.indexOf('data-navigation-id="receive"');
    const itemEnd = rendered.indexOf('</a>', itemStart);
    const itemMarkup = rendered.slice(itemStart, itemEnd);
    assert(
      itemMarkup.indexOf('Recibir pendientes') < itemMarkup.indexOf('>NEXO<'),
      'human purpose must precede ownerLabel inside the destination',
    );
  });

  cover(29, () => {
    const rendered = renderNavigation(api);
    assert(rendered.includes('ui-task-navigation__icon') && rendered.includes('aria-hidden="true"'), 'decorative icon must remain hidden from AT');
  });

  cover(30, () => {
    const rendered = renderNavigation(api, { groups: [] });
    assert(!/No tienes permisos|No hay trabajo|No existen pantallas/u.test(rendered), 'empty navigation must not invent cause');
  });

  cover(31, () => includesAll(css, ['min-height: 44px;', ':focus-visible'], 'keyboard and touch accessibility'));
  cover(32, () => includesAll(css, ['outline: 3px solid var(--ui-brand);', 'outline-offset: 2px;'], 'visible focus'));
  cover(33, () => assert(!source.includes('HIDDEN'), 'hidden destination must remain outside renderable API'));

  cover(34, () => {
    const rendered = renderNavigation(api, { currentNavigationId: 'receive' });
    includesAll(rendered, ['role="group"', 'aria-label="Trabajo de NEXO"', 'aria-label="Ahora"', 'aria-current="page"'], 'screen reader semantics');
  });

  cover(35, () => includesAll(css, ['@media (max-width: 767px)', 'min-width: 0;', 'max-width: 100%;'], 'narrow viewport reflow'));
  cover(36, () => excludesAll(css, ['white-space: nowrap', 'text-overflow: ellipsis', 'overflow-x: hidden'], 'zoom and essential content clipping boundary'));

  cover(37, () => {
    const rendered = renderNavigation(api);
    assert(!rendered.includes('<nav'), 'TaskNavigation must not create a competing navigation landmark');
    includesAll(appShellSource, ['<nav', 'aria-label={navigationLabel}', '{navigation}'], 'AppShell navigation landmark ownership');
  });

  cover(38, () => {
    const rendered = renderNavigation(api);
    includesAll(rendered, ['Trabajo prioritario ya resuelto', 'Listo para revisar'], 'group context and status composition');
  });

  cover(39, () => includesAll(readme, ['NEXO', 'FOGO', 'ORIGO', 'VISO', 'PULSO', 'NUMERA', 'SHELL'], 'consumer reconciliation'));
  cover(40, () => includesAll(readme, ['rollback', 'paridad', 'SHELL-MIG-*'], 'migration parity and rollback handoff'));

  cover(41, () => assert(!source.includes("'use client'"), 'base component must remain server-safe'));
  cover(42, () => excludesAll(source, ['useState(', 'useEffect(', 'useLayoutEffect('], 'React state and effect boundary'));
  cover(43, () => excludesAll(source, ['window.', 'document.', 'setTimeout(', 'setInterval('], 'browser runtime boundary'));
  cover(44, () => includesAll(source, ['data-navigation-id={item.navigationId}', 'data-intent-code={item.intentCode}'], 'stable telemetry identities'));
  cover(45, () => excludesAll(css, ['transition:', 'animation:', '@keyframes'], 'motion independence'));
  cover(46, () => excludesAll(css, ['#', 'rgb(', 'rgba(', 'hsl(', 'hsla('], 'hardcoded color boundary'));
  cover(47, () => includesAll(css, ['var(--ui-text)', 'var(--ui-muted)', 'var(--ui-surface)', 'var(--ui-surface-2)', 'var(--ui-border)', 'var(--ui-brand)'], 'existing token usage'));
  cover(48, () => includesAll(readme, ['server-safe', 'AppShell.navigation', 'landmark'], 'server and AppShell integration documentation'));
  cover(49, () => includesAll(readme, ['Consumidores migrados por UI011: 0/7', 'Copias legacy retiradas por UI011: 0'], 'zero migration materialization'));
  cover(50, () => includesAll(readme, ['Cambios Supabase por UI011: 0', 'Releases publicadas por UI011: 0'], 'zero Supabase and release materialization'));

  assert(covered.size === 50, `expected 50 covered scenarios, got ${covered.size}`);
  for (let number = 1; number <= 50; number += 1) {
    assert(covered.has(number), `missing scenario ${number}`);
  }

  assertGitUnchanged([
    'package.json',
    'package-lock.json',
    'packages/ui-web/package.json',
    'packages/ui-web/src/AppShell.tsx',
    'packages/ui-web/src/app-shell.css',
    'templates/app-shell-standard',
    'packages/contracts',
    'packages/os-context',
    'packages/supabase',
  ]);

  console.log(
    'PASS: SHELL-UI-011 TaskNavigation validated; scenarios=50 server_safe=YES authority=NONE router=EXTERNAL consumers=0/7 exports=DEFERRED',
  );
}

main();
