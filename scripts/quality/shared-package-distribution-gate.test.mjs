import assert from 'node:assert/strict';
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import test from 'node:test';

import {
  PRIVATE_CANDIDATES,
  exportSurface,
  inspectCandidate,
  validatePack,
} from './shared-package-distribution-gate.mjs';

const packages = Object.keys(PRIVATE_CANDIDATES);

function isolatedManifest(t, name, patch = {}) {
  const root = fs.mkdtempSync(path.join(os.tmpdir(), 'vento-private-pack-'));
  t.after(() => fs.rmSync(root, { recursive: true, force: true }));
  const pkg = path.join(root, 'packages', PRIVATE_CANDIDATES[name]);
  fs.mkdirSync(pkg, { recursive: true });
  const data = {
    name, version: '0.1.0-alpha.1', type: 'module', private: true,
    files: ['dist/'],
    scripts: { build: 'tsc -p tsconfig.build.json', validate: 'node validate.mjs' },
    exports: { '.': { types: './dist/index.d.ts', import: './dist/index.js', default: './dist/index.js' } },
    ...patch,
  };
  fs.writeFileSync(path.join(pkg, 'package.json'), JSON.stringify(data));
  return root;
}

test('el contrato de exports rechaza fuentes TypeScript y condiciones ambiguas', () => {
  assert.throws(() => exportSurface({
    exports: { '.': { types: './src/index.ts', import: './src/index.ts' } },
  }), /EXPORT_MUST_TARGET_COMPILED_DIST/u);
  assert.throws(() => exportSurface({
    exports: { '.': { types: './dist/index.d.ts', import: './dist/index.js', default: './dist/other.js' } },
  }), /DEFAULT_EXPORT_MISMATCH/u);
  assert.throws(() => exportSurface({
    exports: { './../../../private': { types: './dist/index.d.ts', import: './dist/index.js' } },
  }), /INVALID_SUBPATH/u);
});

test('el gate de distribución se niega a liberar un paquete alterado', (t) => {
  const name = '@vento/os-context';
  const root = isolatedManifest(t, name, { private: false });
  assert.throws(() => inspectCandidate(name, { root, built: false }), /UNAUTHORIZED_NPM_RELEASE/u);
  assert.throws(() => inspectCandidate('@vento/not-real', { root, built: false }), /UNKNOWN_PACKAGE/u);
});

test('el gate no confunde manifiesto valido con un build verificado', (t) => {
  const name = '@vento/os-context';
  const root = isolatedManifest(t, name);
  assert.equal(inspectCandidate(name, { root, built: false }).publish_certified, false);
  assert.throws(() => inspectCandidate(name, { root, built: true }), /MISSING_BUILD_OUTPUT/u);
});

test('seis subpaths mantienen aislamiento del runtime privilegiado', (t) => {
  const name = '@vento/supabase';
  const basic = {
    './browser': { types: './dist/browser.d.ts', import: './dist/browser.js', default: './dist/browser.js' },
    './server': { types: './dist/server.d.ts', import: './dist/server.js', default: './dist/server.js' },
    './native': { types: './dist/native.d.ts', import: './dist/native.js', default: './dist/native.js' },
    './runtime': { types: './dist/runtime.d.ts', import: './dist/runtime.js', default: './dist/runtime.js' },
    './errors': { types: './dist/errors.d.ts', import: './dist/errors.js', default: './dist/errors.js' },
    './privileged': { types: './dist/privileged.d.ts', node: './dist/privileged.js' },
  };
  const root = isolatedManifest(t, name, { exports: basic });
  assert.equal(inspectCandidate(name, { root, built: false }).entries.length, 6);
  basic['./privileged'].default = './dist/privileged.js';
  fs.writeFileSync(path.join(root, 'packages/supabase/package.json'), JSON.stringify({
    name, version: '0.1.0-alpha.1', private: true, type: 'module', files: ['dist/'],
    scripts: { build: 'tsc', validate: 'node validate.mjs' }, exports: basic,
  }));
  assert.throws(() => inspectCandidate(name, { root, built: false }), /PRIVILEGED_MUST_BE_NODE_ONLY/u);
});

for (const name of packages) {
  test('npm pack privado: ' + name, () => {
    const result = validatePack(name);
    assert.equal(result.npm_pack, 'PASS');
    assert.equal(result.runtime_exports, 'PASS');
    assert.equal(result.publication_executed, false);
    assert.equal(result.release_certified, false);
    assert(result.packaged_files >= result.checked_export_entries * 2);
  });
}

test('las entradas ESM y subpaths empaquetados se pueden importar en Node', async () => {
  const imported = [];
  for (const subpath of [
    '@vento/contracts/processes',
    '@vento/contracts/process-states',
    '@vento/contracts/actions',
    '@vento/contracts/events',
    '@vento/contracts/screens',
    '@vento/contracts/integrations',
    '@vento/contracts/authorization/catalog/v1',
    '@vento/contracts/authorization/base-roles/v1',
    '@vento/contracts/authorization/response-contracts/v1',
    '@vento/os-context',
    '@vento/supabase/browser',
    '@vento/supabase/server',
    '@vento/supabase/native',
    '@vento/supabase/errors',
    '@vento/supabase/runtime',
    '@vento/supabase/privileged',
  ]) {
    const exports = await import(subpath);
    assert(exports && typeof exports === 'object', 'FAILED_IMPORT:' + subpath);
    imported.push(subpath);
  }
  assert.equal(imported.length, 16);
  const context = await import('@vento/os-context');
  assert.equal(typeof context.getEffectiveContext, 'function');
  const browser = await import('@vento/supabase/browser');
  assert.equal(typeof browser.createBrowserClient, 'function');
  const server = await import('@vento/supabase/server');
  assert.equal(typeof server.createServerClient, 'function');
  const privileged = await import('@vento/supabase/privileged');
  assert.equal(typeof privileged.createPrivilegedClient, 'function');
});
