import assert from 'node:assert/strict';
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import test from 'node:test';
import { spawnSync } from 'node:child_process';
import { fileURLToPath } from 'node:url';

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
    '@vento/os-context/server',
    '@vento/os-context/client',
    '@vento/os-context/testing',
    '@vento/os-context/legacy',
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
  assert.equal(imported.length, 19);
  await assert.rejects(import('@vento/os-context'), { code: 'ERR_PACKAGE_PATH_NOT_EXPORTED' });
  const context = await import('@vento/os-context/legacy');
  assert.equal(typeof context.getEffectiveContext, 'function');
  const browser = await import('@vento/supabase/browser');
  assert.equal(typeof browser.createBrowserClient, 'function');
  const server = await import('@vento/supabase/server');
  assert.equal(typeof server.createServerClient, 'function');
  const privileged = await import('@vento/supabase/privileged');
  assert.equal(typeof privileged.createPrivilegedClient, 'function');
});


test('tarballs reales: instalacion npm con peers exactos, ESM y tipos aislados', (t) => {
  const root = path.resolve(fileURLToPath(new URL('../..', import.meta.url)));
  const temp = fs.mkdtempSync(path.join(os.tmpdir(), 'vento-npm-consumer-'));
  t.after(() => fs.rmSync(temp, { recursive: true, force: true }));
  const npmCli = process.env.npm_execpath;
  const cli = npmCli ? process.execPath : (process.platform === 'win32' ? 'npm.cmd' : 'npm');
  const command = (args, cwd) => spawnSync(cli, npmCli ? [npmCli, ...args] : args, {
    cwd, encoding: 'utf8', timeout: 180_000, windowsHide: true, maxBuffer: 8 * 1024 * 1024,
  });
  const tarballs = [];
  for (const name of packages) {
    const pack = command(['pack', '--workspace', name, '--json',
      '--pack-destination', temp, '--offline', '--ignore-scripts'], root);
    assert.equal(pack.status, 0, 'NPM_PACK_REAL_FAILED:' + name + ':' + pack.stderr?.slice(-500));
    const output = JSON.parse(pack.stdout);
    assert.equal(output.length, 1);
    const tarball = path.join(temp, output[0].filename);
    assert(fs.statSync(tarball).isFile());
    tarballs.push(tarball);
  }

  fs.writeFileSync(path.join(temp, 'package.json'),
    JSON.stringify({ name: 'isolated-vento-consumer', private: true, type: 'module' }));
  const install = command(['install', '--prefer-offline', '--registry=https://registry.npmjs.org/', '--ignore-scripts', '--no-audit',
    '--no-fund', '--no-package-lock', ...tarballs,
    '@supabase/ssr@0.8.0', '@supabase/supabase-js@2.90.1'], temp);
  assert.equal(install.status, 0,
    'NPM_ISOLATED_INSTALL_FAILED:' + install.stderr?.slice(0,4200));

  const imports = [
    '@vento/contracts/processes',
    '@vento/contracts/authorization/catalog/v1',
    '@vento/os-context/server',
    '@vento/os-context/client',
    '@vento/os-context/testing',
    '@vento/os-context/legacy',
    '@vento/supabase/browser',
    '@vento/supabase/server',
    '@vento/supabase/native',
    '@vento/supabase/privileged',
    '@vento/supabase/runtime',
  ];
  const source = [
    ...imports.map((p, i) => "import * as pkg" + i + " from '" + p + "';"),
    ...imports.map((_p, i) => "if (!pkg" + i + ") throw new Error('ESM_IMPORT_FAILED_" + i + "');"),
    "if (typeof pkg0.isProcessId !== 'function') throw new Error('CONTRACT_RUNTIME_MISSING');",
    "if (typeof pkg5.getEffectiveContext !== 'function') throw new Error('CONTEXT_RUNTIME_MISSING');",
    "if (typeof pkg6.createBrowserClient !== 'function') throw new Error('BROWSER_RUNTIME_MISSING');",
    "const webCookie = pkg10.resolveCanonicalCookieOptions({currentHost:'viso.ventogroup.co',isSecureContext:true,cookiePolicy:{allowSharedDomain:true,sharedDomain:'ventogroup.co',allowInsecureHttp:false}});",
    "if (webCookie.domain !== 'ventogroup.co' || webCookie.secure !== true) throw new Error('SSR_SHARED_COOKIE_POLICY_MISMATCH');",
    "const localCookie = pkg10.resolveCanonicalCookieOptions({currentHost:'localhost',isSecureContext:false,cookiePolicy:{allowSharedDomain:true,sharedDomain:'ventogroup.co',allowInsecureHttp:true}});",
    "if ('domain' in localCookie || localCookie.secure !== false) throw new Error('SSR_LOCAL_COOKIE_POLICY_MISMATCH');",
    "try { pkg10.assertPublicSupabaseKey('sb_secret_synthetic'); throw new Error('SECRET_ACCEPTED_IN_BROWSER'); } catch (error) { if (!String(error.message).includes('publicKey cannot')) throw error; }",
    "console.log('ISOLATED_CONSUMER_ESM:PASS');",
  ].join('\n') + '\n';
  const smoke = path.join(temp, 'consumer.mjs');
  fs.writeFileSync(smoke, source);
  const imported = spawnSync(process.execPath, [smoke], {
    cwd: temp, encoding: 'utf8', timeout: 60000,
  });
  assert.equal(imported.status, 0, 'ISOLATED_ESM_IMPORT_FAILED:' + imported.stderr?.slice(-750));
  assert.match(imported.stdout, /ISOLATED_CONSUMER_ESM:PASS/u);

  const types = [
    "import { isProcessId } from '@vento/contracts/processes';",
    "import type { ProcessId } from '@vento/contracts/processes';",
    "import type { EffectiveContext } from '@vento/os-context/legacy';",
    "import type { AccessContextV1 } from '@vento/os-context/server';",
    "import type { BrowserClientConfig } from '@vento/supabase/browser';",
    "import type { ServerClientConfig } from '@vento/supabase/server';",
    "import type { NativeClientConfig } from '@vento/supabase/native';",
    "import type { CookiePolicy } from '@vento/supabase/runtime';",
    "const policy: CookiePolicy = { allowSharedDomain: true, sharedDomain: 'ventogroup.co', allowInsecureHttp: false };",
    "const url = 'https://synthetic.supabase.co';",
    "const publicKey = 'sb_publishable_synthetic';",
    "const nextBrowser: BrowserClientConfig = { url, publicKey, currentHost: 'viso.ventogroup.co', isSecureContext: true, cookiePolicy: policy };",
    "const nextCookieAdapter: ServerClientConfig['cookies'] = {",
    "  getAll: () => [{name: 'sb-auth', value: 'synthetic'}],",
    "  setAll: async (cookies) => { for (const item of cookies) { const domain: string | undefined = item.options.domain; void domain; } },",
    "};",
    "const nextServer: ServerClientConfig = { url, publicKey, cookies: nextCookieAdapter, currentHost: 'viso.ventogroup.co', isSecureRequest: true, cookiePolicy: policy, cookieWriteMode: 'READ_WRITE' };",
    "const expoSecureStorage: NativeClientConfig['storage'] = {",
    "  getItem: async (_key: string) => null,",
    "  setItem: async (_key: string, _value: string) => {},",
    "  removeItem: async (_key: string) => {},",
    "};",
    "const nativeClient: NativeClientConfig = { url, publicKey, storage: expoSecureStorage };",
    "void nextBrowser; void nextServer; void nativeClient;",
    "const id: ProcessId = 'VPROC-0001';",
    'if (!isProcessId(id)) throw new Error("ID_INVALID");',
    'declare const effective: EffectiveContext;',
    'declare const canonical: AccessContextV1;',
    'declare const browser: BrowserClientConfig;',
    'declare const server: ServerClientConfig;',
    'void effective; void canonical; void browser; void server;',
  ].join('\n') + '\n';
  fs.writeFileSync(path.join(temp, 'consumer.mts'), types);
  const config = path.join(temp, 'tsconfig.json');
  fs.writeFileSync(config, JSON.stringify({
    compilerOptions: {
      module: 'NodeNext', moduleResolution: 'NodeNext', target: 'ES2022',
      strict: true, skipLibCheck: true, noEmit: true, types: [],
    },
    include: ['consumer.mts'],
  }));
  const tsc = spawnSync(process.execPath, [
    path.join(root, 'node_modules/typescript/bin/tsc'), '-p', config,
  ], { cwd: temp, encoding: 'utf8', timeout: 60000 });
  assert.equal(tsc.status, 0,
    'ISOLATED_TS_CONSUMER_FAILED:' + tsc.stdout?.slice(-750) + tsc.stderr?.slice(-350));
});
