import crypto from 'node:crypto';
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import zlib from 'node:zlib';
import { spawnSync } from 'node:child_process';
import { fileURLToPath, pathToFileURL } from 'node:url';
import React from 'react';
import { renderToStaticMarkup } from 'react-dom/server';
import ts from 'typescript';

export const COMPONENTS = Object.freeze([
  ['Alert', 'alert'], ['AppShell', 'app-shell'], ['AreaSelector', 'area-selector'],
  ['Button', 'button'], ['Card', 'card'],
  ['ContextDiagnostic', 'context-diagnostic'], ['ContextIndicator', 'context-indicator'],
  ['CrossAppHandoff', 'cross-app-handoff'], ['EmptyState', 'empty-state'],
  ['InterruptedProcessState', 'interrupted-process-state'],
  ['KioskTaskSurface', 'kiosk-task-surface'],
  ['PrimaryActionPanel', 'primary-action-panel'],
  ['ProcessStatusLine', 'process-status-line'],
  ['RecoverableErrorState', 'recoverable-error-state'],
  ['SensitiveActionConfirmation', 'sensitive-action-confirmation'],
  ['SimulatedRoleNotice', 'simulated-role-notice'],
  ['SiteSelector', 'site-selector'], ['TabletTaskSurface', 'tablet-task-surface'],
  ['TaskNavigation', 'task-navigation'],
]);
export const CLIENT_COMPONENTS = Object.freeze(['AppShell', 'AreaSelector', 'SiteSelector']);
export const PACKAGE_ROOT = path.resolve(fileURLToPath(new URL('..', import.meta.url)));
export const REPOSITORY_ROOT = path.resolve(PACKAGE_ROOT, '../..');

function assert(condition, message) {
  if (!condition) throw new Error('UI_WEB_DISTRIBUTION:' + message);
}

function read(root, relative) {
  const target = path.join(root, ...relative.split('/'));
  const info = fs.lstatSync(target);
  assert(info.isFile() && !info.isSymbolicLink(), 'NONREGULAR_ARTIFACT:' + relative);
  return fs.readFileSync(target, 'utf8');
}

function publicEntry(name) {
  const dir = './dist/' + name;
  return { types: dir + '.d.ts', import: dir + '.js', default: dir + '.js' };
}

export function validateManifest(manifest) {
  assert(manifest.name === '@vento/ui-web', 'PACKAGE_IDENTITY');
  assert(manifest.type === 'module' && manifest.private === true, 'RELEASE_MUST_REMAIN_PRIVATE');
  assert(manifest.version === '0.1.0-alpha.1', 'UNREVIEWED_PACKAGE_VERSION');
  assert(manifest.main === './dist/index.js' && manifest.types === './dist/index.d.ts',
    'ROOT_ENTRYPOINT_MISMATCH');
  assert(Array.isArray(manifest.files) && manifest.files.length === 1
    && manifest.files[0] === 'dist/', 'DISTRIBUTION_FILES_ALLOWLIST');
  assert(Array.isArray(manifest.sideEffects) && manifest.sideEffects.length === 1
    && manifest.sideEffects[0] === './dist/styles.css', 'CSS_TREE_SHAKE_POLICY');
  assert(manifest.peerDependencies?.react === '>=19.2.3 <20'
    && manifest.peerDependencies?.['react-dom'] === '>=19.2.3 <20', 'REACT_PEER_BAND');
  assert(manifest.scripts?.build === 'node scripts/build.mjs'
    && manifest.scripts?.validate === 'node scripts/validate-distribution.mjs'
    && manifest.scripts?.test === 'node --test scripts/validate-distribution.test.mjs',
  'PACKAGE_VALIDATION_SCRIPTS');
  const keys = ['.', ...COMPONENTS.map(([name]) => './' + name), './styles.css'];
  const received = Object.keys(manifest.exports ?? {});
  assert(received.length === keys.length && received.every((key, i) => key === keys[i]),
    'UNREVIEWED_PUBLIC_EXPORT');
  for (const [name, entry] of [
    ['index', manifest.exports['.']],
    ...COMPONENTS.map(([component]) => [component, manifest.exports['./' + component]]),
  ]) {
    assert(JSON.stringify(entry) === JSON.stringify(publicEntry(name)),
      'BAD_CONDITIONAL_EXPORT:' + name);
  }
  assert(manifest.exports['./styles.css'] === './dist/styles.css', 'CSS_EXPORT_MISSING');
  assert(!('publishConfig' in manifest), 'REGISTRY_NOT_YET_CERTIFIED');
  return keys.length;
}

export function validatePhysicalDist(root = PACKAGE_ROOT) {
  const manifest = JSON.parse(read(root, 'package.json'));
  const exportCount = validateManifest(manifest);
  const names = [...COMPONENTS.map(([name]) => name), 'index'];
  const expectedFiles = names.flatMap((name) => [name + '.js', name + '.d.ts']).concat('styles.css');
  const actualFiles = fs.readdirSync(path.join(root, 'dist')).sort();
  assert(actualFiles.length === 41
    && expectedFiles.sort().every((file, i) => actualFiles[i] === file),
  'UNEXPECTED_DIST_FILES');
  const css = read(root, 'dist/styles.css');
  const declarations = [];
  for (const [name, stylesheet] of COMPONENTS) {
    const output = read(root, 'dist/' + name + '.js');
    const declaration = read(root, 'dist/' + name + '.d.ts');
    assert(!/(?:^|\n)\s*import\s+['"][^'"]+\.css['"]/u.test(output),
      'BUNDLED_CSS_DUPLICATION:' + name);
    assert(!declaration.includes('.css'), 'CSS_DECLARATION_LEAK:' + name);
    const hasDirective = /^['"]use client['"];?/u.test(output);
    assert(hasDirective === CLIENT_COMPONENTS.includes(name), 'CLIENT_BOUNDARY:' + name);
    const file = stylesheet + '.css';
    const marker = '/* @vento/ui-web: ' + file + ' */';
    assert(css.split(marker).length === 2, 'CSS_CARDINALITY:' + file);
    const original = read(root, 'src/' + file).trim();
    assert(css.includes(marker + '\n' + original + '\n'),
      'CSS_BYTES_NOT_PRESERVED:' + file);
    declarations.push(declaration);
  }
  const index = read(root, 'dist/index.js');
  assert(!index.includes('use client') && !index.includes('.css'), 'INDEX_NOT_SERVER_SAFE');
  for (const [name] of COMPONENTS) {
    assert(index.includes('./' + name + '.js'), 'INDEX_EXPORT_MISSING:' + name);
    assert(read(root, 'dist/index.d.ts').includes('./' + name + '.js'),
      'TYPE_EXPORT_MISSING:' + name);
  }
  assert(declarations.length === 19 && exportCount === 21, 'COUNT_MISMATCH');
  return { components: 19, clientBoundaries: CLIENT_COMPONENTS.length, cssSources: 19, outputs: 41, exports: exportCount };
}

export async function validateRuntime(root = PACKAGE_ROOT) {
  const api = await import(pathToFileURL(path.join(root, 'dist/index.js')).href);
  for (const [name] of COMPONENTS) {
    assert(typeof api[name] === 'function', 'ESM_NAMED_EXPORT_MISSING:' + name);
  }
  const html = renderToStaticMarkup(React.createElement(api.Alert, {
    variant: 'success',
  }, 'VENTO_UI_WEB_SSR_SMOKE'));
  assert(html.includes('VENTO_UI_WEB_SSR_SMOKE') && html.includes('ui-alert--success'),
    'SERVER_SIDE_RENDER_SMOKE_FAILED');
  const button = renderToStaticMarkup(React.createElement(api.Button, {
    type: 'button',
  }, 'Acción'));
  assert(button.includes('Acción') && button.includes('button'), 'BUTTON_SSR_SMOKE_FAILED');
  const appShell = renderToStaticMarkup(React.createElement(api.AppShell, {
    brand: 'VENTO', skipToContentLabel: 'Saltar al contenido',
  }, 'Inicio'));
  assert(appShell.includes('VENTO') && appShell.includes('Inicio'), 'CLIENT_SSR_SMOKE_FAILED');
  return { loadedModules: COMPONENTS.length, ssrSmokeCases: 3 };
}

export function validateNpmPack(root = PACKAGE_ROOT, repositoryRoot = REPOSITORY_ROOT) {
  assert(root === PACKAGE_ROOT, 'PACK_PRODUCTION_ROOT_ONLY');
  const npmCli = process.env.npm_execpath;
  assert(npmCli && fs.existsSync(npmCli), 'NPM_CLI_FOR_PACK_NOT_AVAILABLE');
  const result = spawnSync(process.execPath, [
    npmCli, 'pack', '--workspace', '@vento/ui-web',
    '--dry-run', '--json', '--ignore-scripts', '--offline',
  ], {
    cwd: repositoryRoot, encoding: 'utf8', windowsHide: true,
    timeout: 120000, maxBuffer: 1024 * 1024 * 4,
  });
  assert(result.status === 0 && !result.error,
    'NPM_PACK_DRY_RUN_FAILED:' + String(result.stderr ?? result.error?.message ?? ''));
  let packed;
  try {
    packed = JSON.parse(result.stdout);
  } catch {
    throw new Error('UI_WEB_DISTRIBUTION:NPM_PACK_INVALID_JSON');
  }
  assert(Array.isArray(packed) && packed.length === 1, 'NPM_PACK_CARDINALITY');
  const files = (packed[0].files ?? []).map((file) => file.path);
  const required = ['package.json', ...[
    ...COMPONENTS.map(([name]) => name), 'index',
  ].flatMap((name) => ['dist/' + name + '.js', 'dist/' + name + '.d.ts']),
  'dist/styles.css'];
  assert(required.every((file) => files.includes(file)),
    'NPM_PACK_MISSING_REQUIRED_DIST');
  assert(files.every((file) => file === 'package.json' || file === 'README.md'
    || file.startsWith('dist/')), 'NPM_PACK_LEAKS_PRIVATE_SOURCES');
  return { packedFiles: files.length, dryRun: true, published: false };
}

function parseTarEntries(bytes) {
  const raw = zlib.gunzipSync(bytes);
  const entries = [];
  let offset = 0;
  const textField = (chunk, start, end) =>
    chunk.subarray(start, end).toString('utf8').split('\0', 1)[0];
  while (offset + 512 <= raw.length) {
    const header = raw.subarray(offset, offset + 512);
    if (header.every((value) => value === 0)) break;
    const file = textField(header, 0, 100);
    const prefix = textField(header, 345, 500);
    const name = prefix ? prefix + '/' + file : file;
    const octal = textField(header, 124, 136).trim();
    const flag = String.fromCharCode(header[156]);
    assert(/^[0-7]+$/u.test(octal) && (flag === '\0' || flag === '0'),
      'UNSAFE_TARBALL_ENTRY:' + name);
    const size = Number.parseInt(octal, 8);
    const relative = name.startsWith('package/') ? name.slice(8) : '';
    assert(relative && !relative.includes('..') && !relative.includes('\\')
      && !relative.startsWith('/') && !relative.includes('//'), 'TAR_PATH_ESCAPE:' + name);
    const begin = offset + 512;
    assert(Number.isSafeInteger(size) && begin + size <= raw.length, 'TAR_SIZE_INVALID:' + name);
    entries.push({ relative, content: raw.subarray(begin, begin + size) });
    offset = begin + Math.ceil(size / 512) * 512;
  }
  assert(offset + 512 <= raw.length, 'TAR_TERMINATOR_MISSING');
  return entries;
}

export function verifyPackedTarball(bytes, listedFiles, root = PACKAGE_ROOT) {
  assert(Buffer.isBuffer(bytes) && bytes.length > 0, 'EMPTY_PACKED_BYTES');
  assert(Array.isArray(listedFiles) && listedFiles.length === 43,
    'PACKED_FILE_CARDINALITY');
  const expected = [...listedFiles].sort();
  const entries = parseTarEntries(bytes);
  const actual = entries.map((item) => item.relative).sort();
  assert(actual.length === expected.length && actual.every((name, index) =>
    name === expected[index]), 'TARBALL_INVENTORY_MISMATCH');
  assert(new Set(actual).size === actual.length, 'DUPLICATE_TARBALL_ENTRY');
  assert(actual.every((name) => name === 'package.json' || name === 'README.md'
    || /^dist\/[A-Za-z][A-Za-z0-9_-]*\.(?:js|d\.ts)$/u.test(name)
    || name === 'dist/styles.css'), 'UNEXPECTED_TARBALL_ENTRY');
  for (const entry of entries) {
    const original = fs.readFileSync(path.join(root, ...entry.relative.split('/')));
    assert(original.equals(entry.content), 'PACKED_BYTES_DIVERGE:' + entry.relative);
  }
  return { packedArchiveFiles: entries.length };
}

function validateTemporaryConsumerInstall(temp, archiveFilename, packedFiles, root, repositoryRoot) {
  assert(typeof archiveFilename === 'string' &&
    archiveFilename === path.basename(archiveFilename), 'CONSUMER_ARCHIVE_PATH_INVALID');
  const cli = process.env.npm_execpath;
  assert(cli && fs.existsSync(cli), 'CONSUMER_NPM_CLI_UNAVAILABLE');
  const consumerManifest = {
    name: 'vento-ui-web-isolated-consumer-qa',
    version: '1.0.0',
    private: true,
    type: 'module',
  };
  fs.writeFileSync(path.join(temp, 'package.json'),
    JSON.stringify(consumerManifest, null, 2) + '\n', 'utf8');
  const installed = spawnSync(process.execPath, [
    cli, 'install', path.join(temp, archiveFilename), '--offline',
    '--ignore-scripts', '--no-save', '--no-audit', '--no-fund',
    '--no-package-lock', '--legacy-peer-deps',
  ], {
    cwd: temp,
    encoding: 'utf8',
    windowsHide: true,
    timeout: 120000,
    maxBuffer: 4 * 1024 * 1024,
  });
  assert(installed.status === 0 && !installed.error,
    'ISOLATED_NPM_INSTALL_FAILED:' +
    String(installed.stderr ?? installed.error?.message ?? ''));

  const consumerPkg = path.join(temp, 'node_modules', '@vento', 'ui-web');
  const metadata = JSON.parse(read(consumerPkg, 'package.json'));
  validateManifest(metadata);
  for (const relative of packedFiles) {
    const installedBytes = fs.readFileSync(path.join(consumerPkg, ...relative.split('/')));
    const originalBytes = fs.readFileSync(path.join(root, ...relative.split('/')));
    assert(installedBytes.equals(originalBytes), 'ISOLATED_INSTALL_CONTENT_MISMATCH:' + relative);
  }

  // Offline runtime peers are copied ONLY into the temporary QA fixture.
  // This is not a certification of consumer peer installation or registry access.
  for (const peer of ['react', 'react-dom', 'scheduler']) {
    const source = path.join(repositoryRoot, 'node_modules', peer);
    if (fs.existsSync(source)) {
      const destination = path.join(temp, 'node_modules', peer);
      assert(!fs.existsSync(destination), 'UNEXPECTED_CONSUMER_PEER:' + peer);
      fs.cpSync(source, destination, { recursive: true });
    } else {
      assert(peer === 'scheduler', 'MISSING_LOCAL_REACT_PEER:' + peer);
    }
  }
  const fixtureFile = path.join(temp, 'consumer.mts');
  fs.writeFileSync(fixtureFile, 'export {};\n', 'utf8');
  const tsOptions = {
    module: ts.ModuleKind.NodeNext,
    moduleResolution: ts.ModuleResolutionKind.NodeNext,
    target: ts.ScriptTarget.ES2022,
  };
  const entrypoints = [
    ['@vento/ui-web', 'index.d.ts'],
    ['@vento/ui-web/Alert', 'Alert.d.ts'],
    ['@vento/ui-web/AppShell', 'AppShell.d.ts'],
    ['@vento/ui-web/SiteSelector', 'SiteSelector.d.ts'],
  ];
  for (const [request, declaration] of entrypoints) {
    const resolved = ts.resolveModuleName(request, fixtureFile, tsOptions, ts.sys)
      .resolvedModule?.resolvedFileName;
    assert(resolved && path.normalize(resolved).endsWith(path.join('dist', declaration)),
      'ISOLATED_TYPESCRIPT_RESOLUTION_FAILED:' + request);
  }

  const esmProbe = String.raw`
import React from 'react';
import { renderToStaticMarkup } from 'react-dom/server';
import * as publicApi from '@vento/ui-web';
import { Alert } from '@vento/ui-web/Alert';
import { AppShell } from '@vento/ui-web/AppShell';
import { SiteSelector } from '@vento/ui-web/SiteSelector';
if (typeof publicApi.Alert !== 'function' ||
    typeof Alert !== 'function' ||
    typeof AppShell !== 'function' ||
    typeof SiteSelector !== 'function') {
  throw new Error('ISOLATED_ESM_EXPORTS_MISSING');
}
const rendered = renderToStaticMarkup(React.createElement(AppShell, {
  brand: 'VENTO', skipToContentLabel: 'Skip',
}, React.createElement(Alert, { variant: 'success' }, 'ISOLATED_CONSUMER_OK')));
if (!rendered.includes('ISOLATED_CONSUMER_OK') || !rendered.includes('VENTO')) {
  throw new Error('ISOLATED_CONSUMER_SSR_MISMATCH');
}
`;
  const probe = spawnSync(process.execPath, ['--input-type=module', '--eval', esmProbe], {
    cwd: temp,
    encoding: 'utf8',
    windowsHide: true,
    timeout: 30000,
    maxBuffer: 1024 * 1024,
  });
  assert(probe.status === 0 && !probe.error,
    'ISOLATED_ESM_SSR_PROBE_FAILED:' + String(probe.stderr ?? probe.error?.message ?? ''));
  assert(fs.existsSync(path.join(consumerPkg, 'dist', 'styles.css')),
    'ISOLATED_CONSUMER_CSS_MISSING');
  return { installedFilesVerified: packedFiles.length,
    installedTypeEntrypoints: entrypoints.length,
    isolatedEsmSsrSmoke: 'PASS', installedTarballLocally: true,
    nextHydrationCertified: false };
}

export function validateRealNpmPack(root = PACKAGE_ROOT, repositoryRoot = REPOSITORY_ROOT) {
  assert(root === PACKAGE_ROOT, 'PACK_PRODUCTION_ROOT_ONLY');
  const cli = process.env.npm_execpath;
  assert(cli && fs.existsSync(cli), 'NPM_CLI_FOR_PACK_NOT_AVAILABLE');
  const temp = fs.mkdtempSync(path.join(os.tmpdir(), 'vento-ui-web-pack-'));
  try {
    const result = spawnSync(process.execPath, [
      cli, 'pack', '--workspace', '@vento/ui-web', '--pack-destination', temp,
      '--json', '--ignore-scripts', '--offline',
    ], {
      cwd: repositoryRoot,
      encoding: 'utf8',
      windowsHide: true,
      timeout: 120000,
      maxBuffer: 4 * 1024 * 1024,
    });
    assert(result.status === 0 && !result.error,
      'NPM_REAL_PACK_FAILED:' + String(result.stderr ?? result.error?.message ?? ''));
    let output;
    try {
      output = JSON.parse(result.stdout);
    } catch {
      throw new Error('UI_WEB_DISTRIBUTION:NPM_REAL_PACK_INVALID_JSON');
    }
    assert(Array.isArray(output) && output.length === 1,
      'NPM_REAL_PACK_CARDINALITY');
    const metadata = output[0];
    assert(metadata.name === '@vento/ui-web' && metadata.version === '0.1.0-alpha.1',
      'NPM_REAL_PACK_IDENTITY');
    assert(typeof metadata.filename === 'string' &&
      metadata.filename === path.basename(metadata.filename) &&
      /^vento-ui-web-0\.1\.0-alpha\.1\.tgz$/u.test(metadata.filename),
    'NPM_REAL_PACK_FILENAME');
    const archive = fs.readFileSync(path.join(temp, metadata.filename));
    const calculatedIntegrity = 'sha512-' +
      crypto.createHash('sha512').update(archive).digest('base64');
    const sha1 = crypto.createHash('sha1').update(archive).digest('hex');
    const sha256 = crypto.createHash('sha256').update(archive).digest('hex');
    assert(metadata.integrity === calculatedIntegrity && metadata.shasum === sha1,
      'NPM_PACK_INTEGRITY_MISMATCH');
    const packedFiles = (metadata.files ?? []).map((entry) => entry.path);
    const packed = verifyPackedTarball(archive, packedFiles, root);
    const installed = validateTemporaryConsumerInstall(
      temp, metadata.filename, packedFiles, root, repositoryRoot);
    return { ...packed, ...installed, tarballSha256: sha256,
      tarballIntegrity: calculatedIntegrity, tarballBytes: archive.length,
      tarballCreatedLocally: true, published: false };
  } finally {
    fs.rmSync(temp, { recursive: true, force: true });
  }
}

export function validateLegacyValidators() {
  const scripts = fs.readdirSync(path.join(PACKAGE_ROOT, 'scripts'))
    .filter((name) => /^validate-(?!distribution)[a-z-]+\.mjs$/u.test(name))
    .sort();
  assert(scripts.length === 19, 'HISTORICAL_VALIDATOR_INVENTORY_CHANGED');
  for (const script of scripts) {
    const result = spawnSync(process.execPath, ['scripts/' + script], {
      cwd: PACKAGE_ROOT,
      encoding: 'utf8',
      windowsHide: true,
      timeout: 60000,
      maxBuffer: 1024 * 1024,
    });
    assert(result.status === 0 && !result.error,
      'HISTORICAL_VALIDATOR_FAILED:' + script + ':' +
      String(result.stderr ?? '') + String(result.stdout ?? ''));
  }
  return { historicalValidators: scripts.length, historicalValidatorStatus: 'PASS' };
}

export async function validateDistribution() {
  const physical = validatePhysicalDist();
  const runtime = await validateRuntime();
  const pack = validateNpmPack();
  const tarball = validateRealNpmPack();
  const historical = validateLegacyValidators();
  console.log('UI_WEB_DISTRIBUTION:PASS');
  console.log(JSON.stringify({ ...physical, ...runtime, ...pack, ...tarball, ...historical }));
  return { ...physical, ...runtime, ...pack, ...tarball, ...historical };
}

if (process.argv[1] && path.resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  try {
    await validateDistribution();
  } catch (error) {
    console.error(error instanceof Error ? error.message : String(error));
    process.exitCode = 1;
  }
}
