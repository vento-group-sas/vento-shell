import assert from 'node:assert/strict';
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import test from 'node:test';

import {
  IMPLEMENTATION_DERIVED_PROJECTION_PATHS,
  implementationPathMatchesScope,
  isImplementationDerivedProjection,
  prepareAuthorizedMaterializationDirectories,
  resolveImplementationAuthorization,
  implementationAuthorizedChanges,
} from './implementation-path-policy.mjs';

function instance(authorizedChanges) {
  return {
    instance_id: 'SHELL-CI-020::GAP-PKG-020',
    authorized_changes: authorizedChanges.map((entry) => ({
      repo: 'vento-group-sas/vento-shell',
      ...entry,
    })),
  };
}

test('centraliza todas las proyecciones derivadas del lifecycle fisico', () => {
  assert.equal(IMPLEMENTATION_DERIVED_PROJECTION_PATHS.length, 5);
  for (const relativePath of IMPLEMENTATION_DERIVED_PROJECTION_PATHS) {
    assert.equal(isImplementationDerivedProjection(relativePath), true);
  }
  assert.equal(isImplementationDerivedProjection('src/app/page.tsx'), false);
});

test('una autorizacion de directorio cubre sus hijos en todos los validadores', () => {
  const record = instance([
    { path: 'tests/packages/GAP-PKG-020', change: 'CREATE' },
    { path: 'tests/packages/GAP-PKG-020/locked.test.ts', change: 'EXECUTE_ONLY' },
  ]);
  assert.equal(
    implementationPathMatchesScope(
      'tests/packages/GAP-PKG-020',
      'tests/packages/GAP-PKG-020/contract.test.ts',
    ),
    true,
  );
  assert.equal(
    resolveImplementationAuthorization(
      record,
      'tests/packages/GAP-PKG-020/contract.test.ts',
    ).classification,
    'WRITABLE',
  );
  assert.equal(
    resolveImplementationAuthorization(
      record,
      'tests/packages/GAP-PKG-020/locked.test.ts',
    ).classification,
    'EXECUTE_ONLY',
  );
});

test('conserva repositorio en authorized_changes y permite proyeccion explicita multi-repo', () => {
  const record = { authorized_changes: [
    { repo: 'vento-group-sas/vento-shell', path: 'src/app/page.tsx', change: 'MODIFY' },
    { repo: 'vento-group-sas/vento-nexo', path: 'src/app/page.tsx', change: 'MODIFY' },
  ] };
  assert.deepEqual(implementationAuthorizedChanges(record).map((entry) => entry.repo), ['vento-group-sas/vento-shell']);
  assert.deepEqual(implementationAuthorizedChanges(record, { repository: 'vento-group-sas/vento-nexo' }).map((entry) => entry.repo), ['vento-group-sas/vento-nexo']);
  assert.equal(implementationAuthorizedChanges(record, { repository: null }).length, 2);
});

test('prepara automaticamente directorios para archivos y scopes CREATE', (context) => {
  const root = fs.mkdtempSync(path.join(os.tmpdir(), 'vento-implementation-paths-'));
  context.after(() => fs.rmSync(root, { recursive: true, force: true }));
  const record = instance([
    { path: 'tests/packages/GAP-PKG-020', change: 'CREATE' },
    { path: 'supabase/tests/packages/GAP-PKG-020.sql', change: 'CREATE' },
    { path: 'scripts/docs/read-only.mjs', change: 'EXECUTE_ONLY' },
  ]);

  const result = prepareAuthorizedMaterializationDirectories({ root, instance: record });

  assert.equal(fs.statSync(path.join(root, 'tests/packages/GAP-PKG-020')).isDirectory(), true);
  assert.equal(fs.statSync(path.join(root, 'supabase/tests/packages')).isDirectory(), true);
  assert.equal(fs.existsSync(path.join(root, 'scripts/docs')), false);
  assert.deepEqual(result.created, [
    'supabase/tests/packages',
    'tests/packages/GAP-PKG-020',
  ]);
});

test('rechaza paths autorizados que intentan salir del repositorio', (context) => {
  const root = fs.mkdtempSync(path.join(os.tmpdir(), 'vento-implementation-paths-'));
  context.after(() => fs.rmSync(root, { recursive: true, force: true }));
  const record = instance([{ path: '../outside/file.ts', change: 'CREATE' }]);
  assert.throws(
    () => prepareAuthorizedMaterializationDirectories({ root, instance: record }),
    /AUTHORIZED_PATH_INVALID/u,
  );
});
