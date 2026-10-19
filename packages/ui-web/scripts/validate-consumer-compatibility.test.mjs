import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import { createHash } from 'node:crypto';
import { spawnSync } from 'node:child_process';
import { fileURLToPath } from 'node:url';

// COMP-PKG-004 / SHELL-CI-005: read-only discovery, not a compatibility release certificate.
// This test NEVER runs npm install or changes any consumer worktree.
const packageRoot = path.resolve(fileURLToPath(new URL('..', import.meta.url)));
const shellParallelRoot = path.resolve(packageRoot, '..', '..');
const siblingRoot = path.dirname(shellParallelRoot);
const CONSUMERS = Object.freeze([
  'vento-shell',
  'vento-viso',
  'vento-nexo',
  'vento-fogo',
  'vento-origo',
  'vento-pulso',
  'vento-numera',
]);
const DEPENDENCIES = Object.freeze([
  'next', 'react', 'react-dom', 'tailwindcss', 'typescript',
]);

function sha256(buffer) {
  return createHash('sha256').update(buffer).digest('hex');
}

function readJsonWithIdentity(file) {
  const bytes = fs.readFileSync(file);
  return { data: JSON.parse(bytes.toString('utf8')), sha256: sha256(bytes) };
}

function numericVersion(value) {
  const match = /^(\d+)\.(\d+)\.(\d+)(?:\+[\w.-]+)?$/u.exec(String(value));
  assert.ok(match, 'UNSUPPORTED_VERSION_IDENTITY:' + String(value));
  return match.slice(1).map(Number);
}

function compareVersion(a, b) {
  const left = numericVersion(a);
  const right = numericVersion(b);
  for (let i = 0; i < 3; i += 1) {
    if (left[i] !== right[i]) return left[i] < right[i] ? -1 : 1;
  }
  return 0;
}

function satisfiesDeclaredVersion(spec, version) {
  if (/^\d+(?:\.\d+){0,2}$/u.test(spec)) {
    // npm shorthand exact release only applies to complete X.Y.Z.
    return spec.split('.').length === 3 && compareVersion(spec, version) === 0;
  }
  const match = /^(\^|~)(\d+)(?:\.(\d+))?(?:\.(\d+))?$/u.exec(spec);
  assert.ok(match, 'UNSUPPORTED_MANIFEST_RANGE:' + spec);
  const [, mode, majorText, minorText, patchText] = match;
  const major = Number(majorText);
  const minor = Number(minorText ?? '0');
  const patch = Number(patchText ?? '0');
  const low = [major, minor, patch].join('.');
  const high = mode === '^'
    ? [major > 0 ? major + 1 : 0, major > 0 ? 0 : minor + 1, 0].join('.')
    : [major, minorText === undefined ? minor + 1 : minor + 1, 0].join('.');
  return compareVersion(version, low) >= 0 && compareVersion(version, high) < 0;
}

function candidateBand(name, version) {
  const lower = {
    next: '16.1.1',
    react: '19.2.3',
    'react-dom': '19.2.3',
    tailwindcss: '4.0.0',
    typescript: '5.0.0',
  }[name];
  const upper = {
    next: '17.0.0',
    react: '20.0.0',
    'react-dom': '20.0.0',
    tailwindcss: '5.0.0',
    typescript: '6.0.0',
  }[name];
  return compareVersion(version, lower) >= 0 && compareVersion(version, upper) < 0;
}

function gitHead(repositoryRoot) {
  const git = spawnSync('git', ['rev-parse', '--verify', 'HEAD'], {
    cwd: repositoryRoot, encoding: 'utf8', windowsHide: true,
    timeout: 10000,
  });
  assert.equal(git.status, 0, 'GIT_HEAD_UNAVAILABLE:' + path.basename(repositoryRoot));
  const sha = String(git.stdout ?? '').trim();
  assert.match(sha, /^[0-9a-f]{40}$/u, 'INVALID_GIT_HEAD');
  return sha;
}

function getInstalledPackageVersion(root, name) {
  const manifest = path.join(root, 'node_modules', ...name.split('/'), 'package.json');
  if (!fs.existsSync(manifest)) return null;
  try {
    return readJsonWithIdentity(manifest).data.version ?? null;
  } catch {
    return 'INVALID_INSTALLED_MANIFEST';
  }
}

function discoverConsumer(repository) {
  const consumerRoot = path.join(siblingRoot, repository);
  assert.ok(fs.existsSync(consumerRoot), 'CONSUMER_CHECKOUT_MISSING:' + repository);
  assert.equal(path.basename(consumerRoot), repository, 'CONSUMER_DIRECTORY_MISMATCH');
  const manifestFile = path.join(consumerRoot, 'package.json');
  const lockFile = path.join(consumerRoot, 'package-lock.json');
  assert.ok(fs.existsSync(manifestFile), 'CONSUMER_MANIFEST_MISSING:' + repository);
  assert.ok(fs.existsSync(lockFile), 'CONSUMER_LOCKFILE_MISSING:' + repository);
  const manifest = readJsonWithIdentity(manifestFile);
  const lock = readJsonWithIdentity(lockFile);
  assert.equal(manifest.data.name, repository, 'CONSUMER_MANIFEST_IDENTITY_MISMATCH');
  assert.equal(lock.data.name, repository, 'CONSUMER_LOCK_IDENTITY_MISMATCH');
  assert.equal(lock.data.lockfileVersion, 3, 'UNEXPECTED_NPM_LOCKFILE_VERSION');

  const rootNode = lock.data.packages?.[''];
  assert.ok(rootNode, 'CONSUMER_LOCK_ROOT_MISSING');
  const versions = {};
  const installed = {};
  const discrepancies = [];
  for (const name of DEPENDENCIES) {
    const spec = manifest.data.dependencies?.[name]
      ?? manifest.data.devDependencies?.[name];
    const lockSpec = rootNode.dependencies?.[name]
      ?? rootNode.devDependencies?.[name];
    assert.equal(typeof spec, 'string', 'CONSUMER_DEPENDENCY_UNDECLARED:' + name);
    assert.equal(lockSpec, spec, 'CONSUMER_MANIFEST_LOCK_SPEC_DRIFT:' + name);
    const version = lock.data.packages?.['node_modules/' + name]?.version;
    assert.equal(typeof version, 'string', 'CONSUMER_RESOLVED_VERSION_MISSING:' + name);
    assert.ok(satisfiesDeclaredVersion(spec, version),
      'CONSUMER_RESOLVED_VERSION_OUTSIDE_DECLARED_RANGE:' + name);
    assert.ok(candidateBand(name, version), 'OUTSIDE_COMP_PKG_004_CANDIDATE_BAND:' + name);
    versions[name] = version;
    installed[name] = getInstalledPackageVersion(consumerRoot, name);
    if (!installed[name]) discrepancies.push('LOCAL_TOOLCHAIN_NOT_INSTALLED:' + name);
    else if (installed[name] !== version) {
      discrepancies.push('LOCAL_INSTALLED_VERSION_DRIFT:' + name);
    }
  }
  assert.equal(versions.react, versions['react-dom'], 'REACT_REACT_DOM_LOCK_VERSION_MISMATCH');

  const preexistingUiWeb = Boolean(manifest.data.dependencies?.['@vento/ui-web']
    || manifest.data.devDependencies?.['@vento/ui-web']);
  const results = {
    repository,
    commit: gitHead(consumerRoot),
    manifest_sha256: manifest.sha256,
    lockfile_sha256: lock.sha256,
    locked_versions: versions,
    installed_versions: installed,
    runtime_toolchain_status: discrepancies.length
      ? 'BLOCKED_LOCAL_TOOLCHAIN' : 'PRESENT_MATCHES_LOCK',
    runtime_blockers: discrepancies,
    preexisting_ui_web_dependency: preexistingUiWeb,
    evidence_scope: 'READ_ONLY_CANDIDATE_DISCOVERY_NOT_CERTIFIED',
  };

  // Recheck immutable read-only input identities after the inventory was prepared.
  assert.equal(sha256(fs.readFileSync(manifestFile)), manifest.sha256,
    'CONCURRENT_CONSUMER_MANIFEST_CHANGE');
  assert.equal(sha256(fs.readFileSync(lockFile)), lock.sha256,
    'CONCURRENT_CONSUMER_LOCKFILE_CHANGE');
  return results;
}

test('seven real web-consumer manifests and npm locks satisfy candidate COMP-PKG-004 bands', async (t) => {
  assert.equal(CONSUMERS.length, 7, 'CANONICAL_SEVEN_CONSUMERS_REQUIRED');
  assert.ok(fs.existsSync(path.join(packageRoot, 'dist', 'index.js')),
    'PRIVATE_UI_WEB_CANDIDATE_NOT_BUILT');
  const results = [];
  for (const repository of CONSUMERS) {
    await t.test('read-only consumer inventory: ' + repository, (subtest) => {
      const entry = discoverConsumer(repository);
      results.push(entry);
      subtest.diagnostic('CONSUMER_CANDIDATE_EVIDENCE:' + JSON.stringify(entry));
    });
  }
  assert.equal(results.length, 7, 'INCOMPLETE_SEVEN_CONSUMER_INVENTORY');
  const toolchainsReady = results.filter((r) =>
    r.runtime_toolchain_status === 'PRESENT_MATCHES_LOCK').length;
  t.diagnostic('CONSUMER_INVENTORY_TOTAL:7');
  t.diagnostic('CONSUMER_RUNTIME_TOOLCHAINS_PRESENT_MATCHING_LOCK:' + toolchainsReady);
  t.diagnostic('COMPATIBILITY_CERTIFICATION:NOT_CERTIFIED; NO_CONSUMER_INSTALL_OR_BUILD');
});

function walkBuiltFiles(directory) {
  if (!fs.existsSync(directory)) return [];
  return fs.readdirSync(directory, { withFileTypes: true }).flatMap((entry) => {
    const full = path.join(directory, entry.name);
    return entry.isDirectory() ? walkBuiltFiles(full) : entry.isFile() ? [full] : [];
  });
}

function writeFixtureFile(root, name, lines) {
  const target = path.join(root, name);
  fs.mkdirSync(path.dirname(target), { recursive: true });
  fs.writeFileSync(target, lines.join('\n') + '\n', 'utf8');
}

function createConsumerFixture(t, repository, discovered) {
  const temp = fs.mkdtempSync(path.join(shellParallelRoot, '.vento-ui-web-consumer-'));
  t.after(() => fs.rmSync(temp, { recursive: true, force: true, maxRetries: 3 }));
  const nodeModules = path.join(temp, 'node_modules');
  const targetPackage = path.join(nodeModules, '@vento', 'ui-web');
  fs.mkdirSync(targetPackage, { recursive: true });
  for (const name of ['package.json', 'README.md']) {
    fs.copyFileSync(path.join(packageRoot, name), path.join(targetPackage, name));
  }
  fs.cpSync(path.join(packageRoot, 'dist'), path.join(targetPackage, 'dist'),
    { recursive: true });

  const existingModules = path.join(siblingRoot, repository, 'node_modules');
  const realNext = path.join(existingModules, 'next');
  assert.equal(readJsonWithIdentity(path.join(realNext, 'package.json')).data.version,
    discovered.locked_versions.next, 'CONSUMER_NEXT_BINARY_DRIFT:' + repository);
  fs.symlinkSync(realNext, path.join(nodeModules, 'next'),
    process.platform === 'win32' ? 'junction' : 'dir');
  for (const name of ['react', 'react-dom', 'scheduler']) {
    const source = path.join(existingModules, name);
    if (fs.existsSync(source)) {
      fs.cpSync(source, path.join(nodeModules, name), { recursive: true });
    } else {
      assert.equal(name, 'scheduler', 'CONSUMER_PEER_MISSING:' + name);
    }
  }
  writeFixtureFile(temp, 'package.json', [JSON.stringify({
    name: 'vento-ui-web-consumer-compatibility-qa',
    version: '1.0.0', private: true, type: 'module',
    dependencies: {
      '@vento/ui-web': '0.1.0-alpha.1',
      next: discovered.locked_versions.next,
      react: discovered.locked_versions.react,
      'react-dom': discovered.locked_versions['react-dom'],
    },
  }, null, 2)]);
  writeFixtureFile(temp, 'next.config.mjs', [
    "import path from 'node:path';",
    "export default { reactStrictMode: true, experimental: { cpus: 2 },",
    "  turbopack: { root: path.resolve(process.cwd(), '..', '..') } };",
  ]);
  // Synthetic isolated middleware: never modify the corporate Shell SSO middleware.
  writeFixtureFile(temp, 'middleware.js', [
    "import { NextResponse } from 'next/server';",
    'export function middleware() { return NextResponse.next(); }',
    "export const config = { matcher: ['/'] };",
  ]);
  writeFixtureFile(temp, 'app/layout.js', [
    "import React from 'react';",
    "import '@vento/ui-web/styles.css';",
    'export default function Layout({ children }) {',
    "  return React.createElement('html', null,",
    "    React.createElement('body', null, children));",
    '}',
  ]);
  writeFixtureFile(temp, 'app/controls.js', [
    "'use client';",
    "import React from 'react';",
    "import { AreaSelector } from '@vento/ui-web/AreaSelector';",
    "import { SiteSelector } from '@vento/ui-web/SiteSelector';",
    'export default function Controls() {',
    "  const [area, setArea] = React.useState('a');",
    "  const [site, setSite] = React.useState('s');",
    "  return React.createElement('section', null,",
    "    React.createElement(AreaSelector, { label: 'QA_AREA',",
    '      confirmedAreaId: area, onRequestChange: setArea,',
    "      options: [{ id: 'a', label: 'Area A' }, { id: 'b', label: 'Area B' }],",
    '    }),',
    "    React.createElement(SiteSelector, { label: 'QA_SITE',",
    '      confirmedSiteId: site, onRequestChange: setSite,',
    "      options: [{ id: 's', label: 'Site S' }, { id: 't', label: 'Site T' }],",
    '    }),',
    "    React.createElement('output', null, area + '-' + site),",
    '  );',
    '}',
  ]);
  writeFixtureFile(temp, 'app/page.js', [
    "import React from 'react';",
    "import Controls from './controls.js';",
    "import { AppShell } from '@vento/ui-web/AppShell';",
    "import { Alert } from '@vento/ui-web/Alert';",
    'export default function Page() {',
    '  return React.createElement(AppShell, {',
    "    brand: 'VENTO', skipToContentLabel: 'Skip to main',",
    "    navigation: React.createElement('a', { href: '#' }, 'QA_NAVIGATION'),",
    "    navigationLabel: 'QA_NAVIGATION',",
    '  }, React.createElement(React.Fragment, null,',
    "    React.createElement(Alert, { variant: 'success' }, 'CONSUMER_MATRIX_QA_OK'),",
    '    React.createElement(Controls),',
    '  ));',
    '}',
  ]);
  return temp;
}

function buildWithConsumerToolchain(t, repository, discovered) {
  const temp = createConsumerFixture(t, repository, discovered);
  const cli = path.join(temp, 'node_modules', 'next', 'dist', 'bin', 'next');
  assert.ok(fs.existsSync(cli), 'CONSUMER_NEXT_CLI_MISSING:' + repository);
  const build = spawnSync(process.execPath, [cli, 'build'], {
    cwd: temp, windowsHide: true, encoding: 'utf8', timeout: 120000,
    maxBuffer: 4 * 1024 * 1024,
    env: { ...process.env, CI: '1', NEXT_TELEMETRY_DISABLED: '1' },
  });
  assert.equal(build.status, 0,
    'ISOLATED_CONSUMER_NEXT_BUILD_FAILED:' + repository + '\n'
    + String(build.stderr ?? '').slice(-2500) + '\n'
    + String(build.stdout ?? '').slice(-2500));
  const htmlFiles = walkBuiltFiles(path.join(temp, '.next', 'server', 'app'))
    .filter((file) => file.endsWith('.html'));
  assert.ok(htmlFiles.some((file) =>
    fs.readFileSync(file, 'utf8').includes('CONSUMER_MATRIX_QA_OK')),
  'CONSUMER_SSR_MARKER_MISSING:' + repository);
  const cssFiles = walkBuiltFiles(path.join(temp, '.next', 'static'))
    .filter((file) => file.endsWith('.css'));
  assert.ok(cssFiles.length > 0, 'CONSUMER_CSS_EMIT_MISSING:' + repository);
  for (const selector of [
    '.ui-alert', '.ui-app-shell', '.ui-area-selector', '.ui-site-selector',
  ]) {
    assert.equal(cssFiles.filter((file) =>
      fs.readFileSync(file, 'utf8').includes(selector)).length, 1,
    'CONSUMER_CSS_MISSING_OR_DUPLICATED:' + repository + ':' + selector);
  }
  t.diagnostic('ISOLATED_NEXT_BUILD_PASS:' + JSON.stringify({
    repository, commit: discovered.commit,
    lockfile_sha256: discovered.lockfile_sha256,
    next: discovered.installed_versions.next,
    react: discovered.installed_versions.react,
    build: 'PASS', static_ssr_css: 'PASS',
    browser_hydration: 'NOT_RUN_FOR_THIS_CONSUMER',
    consumer_mutations: 0, evidence_scope: 'PILOT_NOT_RELEASE_CERTIFIED',
  }));
}

test('isolated Next builds with exact lock-matched consumer toolchains, without consumer writes', async (t) => {
  const results = CONSUMERS.map(discoverConsumer);
  let executed = 0;
  for (const entry of results) {
    await t.test('locked Next build: ' + entry.repository, {
      skip: entry.runtime_toolchain_status !== 'PRESENT_MATCHES_LOCK'
        ? entry.runtime_blockers.join(',') : false,
    }, (subtest) => {
      buildWithConsumerToolchain(subtest, entry.repository, entry);
      executed += 1;
    });
  }
  t.diagnostic('ISOLATED_CANDIDATE_BUILDS_EXECUTED:' + executed + '/7');
  t.diagnostic('COMPATIBILITY_CERTIFICATION:NOT_CERTIFIED; ONLY_SYNTHETIC_FIXTURES_BUILT');
});
