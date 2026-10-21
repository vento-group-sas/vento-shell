import assert from 'node:assert/strict';
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import test from 'node:test';

import {
  NPM_REGISTRY_URL,
  PACKAGE_LOCATIONS,
  assessManifest,
  inspectLocalPackages,
  queryGitLabPackages,
  reconcileRegistry,
  runAudit,
} from './shared-package-registry-preflight.mjs';

function fixture(t, override = {}) {
  const root = fs.mkdtempSync(path.join(os.tmpdir(), 'vento-registry-readonly-'));
  t.after(() => fs.rmSync(root, { recursive: true, force: true }));
  for (const { name, directory } of PACKAGE_LOCATIONS) {
    const folder = path.join(root, 'packages', directory);
    fs.mkdirSync(folder, { recursive: true });
    const manifest = override[name] ?? {
      name, version: '0.1.0-alpha.1', type: 'module', private: true,
    };
    fs.writeFileSync(path.join(folder, 'package.json'), JSON.stringify(manifest));
  }
  return root;
}

function response(rows, next = '', status = 200) {
  return {
    ok: status >= 200 && status < 300,
    status,
    headers: { get: (key) => key === 'x-next-page' ? next : null },
    json: async () => rows,
  };
}

test('inventario observa cuatro packages pero no concede certificacion de publicacion', (t) => {
  const root = fixture(t);
  const result = inspectLocalPackages({ root });
  assert.equal(result.inventory_validation, 'PASS');
  assert.equal(result.release_certified, false);
  assert.equal(result.publication_executed, false);
  assert.equal(result.npm_publish_authentication, 'NOT_TESTED');
  assert.deepEqual(result.packages.map((pkg) => pkg.name), PACKAGE_LOCATIONS.map((pkg) => pkg.name));
  assert(result.packages.every((pkg) => pkg.release_readiness === 'BLOCKED'));
  assert(result.packages.every((pkg) => pkg.blockers.includes('NOT_EXPLICITLY_DISTRIBUTABLE')));
});

test('identidad erronea y manifiesto ausente fallan cerrados', (t) => {
  const root = fixture(t);
  fs.writeFileSync(path.join(root, 'packages/contracts/package.json'), JSON.stringify({ name: '@vento/other' }));
  assert.throws(() => inspectLocalPackages({ root }), /PACKAGE_IDENTITY_INVALID/u);
  fs.rmSync(path.join(root, 'packages/contracts/package.json'));
  assert.throws(() => inspectLocalPackages({ root }), /PACKAGE_MANIFEST_MISSING_OR_INVALID/u);
});

test('exportar TypeScript directamente no equivale a un paquete npm compilado', () => {
  const pkg = assessManifest({
    name: '@vento/os-context', version: '0.1.0', private: true,
    exports: { '.': './src/index.ts' }, files: ['src/'],
    scripts: { build: 'node build.mjs' },
  }, '@vento/os-context');
  assert(pkg.blockers.includes('PUBLIC_EXPORTS_REFERENCE_SOURCES'));
  assert(pkg.blockers.includes('DIST_ALLOWLIST_NOT_MATERIALIZED'));
});

test('candidato valido no implica release certificada', () => {
  const entry = assessManifest({
    name: '@vento/ui-web', version: '0.2.0-rc.1', private: false,
    exports: { '.': { types: './dist/index.d.ts', import: './dist/index.js' } },
    files: ['dist/'], scripts: { build: 'node scripts/build.mjs' },
  }, '@vento/ui-web');
  assert.equal(entry.release_readiness, 'CANDIDATE_ONLY');
  assert.deepEqual(entry.blockers, []);
});

test('reconciliacion identifica colision exacta, no iguala versiones diferentes', (t) => {
  const root = fixture(t);
  const original = inspectLocalPackages({ root });
  const actual = reconcileRegistry(original, [
    { name: '@vento/contracts', version: '0.1.0-alpha.1', package_type: 'npm' },
    { name: '@vento/contracts', version: '1.0.0', package_type: 'npm' },
    { name: '@vento/ui-web', version: '0.2.0', package_type: 'npm' },
  ]);
  assert.equal(actual.registry_authentication, 'PASS');
  assert.equal(actual.packages[0].exact_version_collision, true);
  assert.equal(actual.packages[3].exact_version_collision, false);
  assert.equal(actual.release_certified, false);
  assert.equal(actual.publication_executed, false);
});

test('reconciliacion rechaza registros no npm o malformados', (t) => {
  const original = inspectLocalPackages({ root: fixture(t) });
  assert.throws(() => reconcileRegistry(original, [{ name: '@vento/contracts', version: '1', package_type: 'maven' }]), /REGISTRY_RESPONSE_INVALID/u);
  assert.throws(() => reconcileRegistry(original, [{ name: '@vento/contracts', package_type: 'npm' }]), /REGISTRY_RESPONSE_INVALID/u);
});

test('consulta GitLab exclusivamente por GET sin seguir redirecciones; recorre paginas y estados', async () => {
  const visited = [];
  const fake = async (url, options) => {
    const parsed = new URL(url);
    visited.push({ url: parsed, options });
    assert.equal(parsed.origin, 'https://gitlab.com');
    assert.equal(parsed.pathname, '/api/v4/projects/87892751/packages');
    assert.equal(parsed.searchParams.get('package_type'), 'npm');
    assert.equal(options.method, 'GET');
    assert.equal(options.redirect, 'error');
    assert.equal(options.headers['PRIVATE-TOKEN'], 'synthetic-token');
    if (parsed.searchParams.get('status') === 'default'
      && parsed.searchParams.get('page') === '1') {
      return response([{ id: 1, name: '@vento/contracts', version: '1.0.0', package_type: 'npm' }], '2');
    }
    if (parsed.searchParams.get('status') === 'processing') {
      return response([{ id: 2, name: '@vento/contracts', version: '1.0.0', package_type: 'npm' }]);
    }
    return response([]);
  };
  const rows = await queryGitLabPackages({
    token: 'synthetic-token', registryUrl: NPM_REGISTRY_URL, fetchImpl: fake,
  });
  assert.equal(visited.length, 7);
  assert.equal(new Set(visited.map((v) => v.url.searchParams.get('status'))).size, 6);
  assert.equal(rows.length, 2);
  assert(!JSON.stringify(rows).includes('synthetic-token'));
});

test('URL externa invalida nunca recibe el token', async () => {
  let reached = false;
  await assert.rejects(
    queryGitLabPackages({
      token: 'synthetic-token', registryUrl: 'https://example.org/evil',
      fetchImpl: async () => { reached = true; return response([]); },
    }),
    /REGISTRY_ENDPOINT_MISMATCH/u,
  );
  assert.equal(reached, false);
});

test('no token, 401 y errores de red son bloqueos reales', async () => {
  await assert.rejects(queryGitLabPackages({ token: '', registryUrl: NPM_REGISTRY_URL }), /TOKEN_NOT_CONFIGURED/u);
  await assert.rejects(queryGitLabPackages({
    token: 'synthetic', registryUrl: NPM_REGISTRY_URL,
    fetchImpl: async () => response([], '', 401),
  }), /REGISTRY_HTTP_401/u);
  await assert.rejects(queryGitLabPackages({
    token: 'synthetic', registryUrl: NPM_REGISTRY_URL,
    fetchImpl: async () => { throw new Error('secret-bearing network diagnostic'); },
  }), /REGISTRY_READ_UNAVAILABLE/u);
});

test('paginacion y respuesta corruptas no se certifican', async () => {
  await assert.rejects(queryGitLabPackages({
    token: 'synthetic', registryUrl: NPM_REGISTRY_URL,
    fetchImpl: async () => response([], '999'),
  }), /REGISTRY_PAGINATION_INVALID/u);
  await assert.rejects(queryGitLabPackages({
    token: 'synthetic', registryUrl: NPM_REGISTRY_URL,
    fetchImpl: async () => response({ not: 'an array' }),
  }), /REGISTRY_RESPONSE_INVALID/u);
});

test('auditoria autenticada distingue lectura del registry de autenticacion npm publish', async (t) => {
  const root = fixture(t);
  const report = await runAudit({
    mode: 'registry', root,
    token: 'synthetic-token', registryUrl: NPM_REGISTRY_URL,
    fetchImpl: async () => response([]),
  });
  assert.equal(report.registry_authentication, 'PASS');
  assert.equal(report.npm_publish_authentication, 'NOT_TESTED');
  assert.equal(report.remote_package_count, 0);
  assert.equal(report.publication_executed, false);
  assert.equal(report.release_certified, false);
  assert(!JSON.stringify(report).includes('synthetic-token'));
});
