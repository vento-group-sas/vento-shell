import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import { createHash } from 'node:crypto';
import { spawn, spawnSync } from 'node:child_process';
import net from 'node:net';
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
    "  const [area, setArea] = React.useState('area-a');",
    "  const [site, setSite] = React.useState('site-a');",
    "  return React.createElement('section', { id: 'controls' },",
    "    React.createElement(AreaSelector, { label: 'QA_AREA',",
    '      confirmedAreaId: area, onRequestChange: setArea,',
    "      options: [{ id: 'area-a', label: 'Area A' }, { id: 'area-b', label: 'Area B' }],",
    '    }),',
    "    React.createElement(SiteSelector, { label: 'QA_SITE',",
    '      confirmedSiteId: site, onRequestChange: setSite,',
    "      options: [{ id: 'site-a', label: 'Site S' }, { id: 'site-b', label: 'Site T' }],",
    '    }),',
    "    React.createElement('output', null, 'QA_SELECTION_' + area + '_' + site),",
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

async function buildWithConsumerToolchain(t, repository, discovered) {
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
    browser_hydration: 'CHECKED_SEPARATELY_AFTER_BUILD',
    consumer_mutations: 0, evidence_scope: 'PILOT_NOT_RELEASE_CERTIFIED',
  }));
  const chromiumExecutable = findChromiumExecutable();
  assert.ok(chromiumExecutable, 'CHROMIUM_REQUIRED_FOR_REAL_CONSUMER_HYDRATION_QA');
  await t.test('real Chromium hydration and interactions: ' + repository,
    async (browserTest) => {
      await runBrowserHydrationQa(browserTest, temp, cli, chromiumExecutable);
      browserTest.diagnostic('CONSUMER_BROWSER_HYDRATION_PASS:' + JSON.stringify({
        repository, commit: discovered.commit,
        lockfile_sha256: discovered.lockfile_sha256,
        next: discovered.locked_versions.next,
        react: discovered.locked_versions.react,
        navigation_toggle: 'PASS', escape: 'PASS',
        area_selector: 'PASS', site_selector: 'PASS',
        consumer_repository_mutations: 0,
        scope: 'SYNTHETIC_FIXTURE_NOT_CONSUMER_APPLICATION',
      }));
    });
}

test('isolated Next builds with exact lock-matched consumer toolchains, without consumer writes', async (t) => {
  const results = CONSUMERS.map(discoverConsumer);
  let executed = 0;
  for (const entry of results) {
    await t.test('locked Next build: ' + entry.repository, {
      skip: entry.runtime_toolchain_status !== 'PRESENT_MATCHES_LOCK'
        ? entry.runtime_blockers.join(',') : false,
    }, async (subtest) => {
      await buildWithConsumerToolchain(subtest, entry.repository, entry);
      executed += 1;
    });
  }
  t.diagnostic('ISOLATED_CANDIDATE_BUILDS_EXECUTED:' + executed + '/7');
  t.diagnostic('COMPATIBILITY_CERTIFICATION:NOT_CERTIFIED; SYNTHETIC_FIXTURE_BUILD_AND_REAL_CHROMIUM_HYDRATION_ONLY');
});

// Browser CDP fixture logic mirrors the already verified standalone Next 16 QA.
function findChromiumExecutable() {
  const paths = [process.env.CHROME_PATH, process.env.EDGE_PATH];
  if (process.platform === 'win32') {
    const bases = [
      process.env.PROGRAMFILES,
      process.env['PROGRAMFILES(X86)'],
      process.env.LOCALAPPDATA,
    ].filter(Boolean);
    for (const base of bases) {
      paths.push(path.join(base, 'Google', 'Chrome', 'Application', 'chrome.exe'));
      paths.push(path.join(base, 'Microsoft', 'Edge', 'Application', 'msedge.exe'));
    }
  } else if (process.platform === 'darwin') {
    paths.push('/Applications/Google Chrome.app/Contents/MacOS/Google Chrome');
    paths.push('/Applications/Microsoft Edge.app/Contents/MacOS/Microsoft Edge');
  } else {
    paths.push('/usr/bin/google-chrome', '/usr/bin/chromium', '/usr/bin/chromium-browser');
    paths.push('/opt/google/chrome/chrome', '/usr/bin/microsoft-edge');
  }
  return paths.find((candidate) => candidate && fs.existsSync(candidate)) ?? null;
}

async function waitFor(predicate, timeoutMs, errorCode) {
  const deadline = Date.now() + timeoutMs;
  let lastError = null;
  while (Date.now() < deadline) {
    try {
      const value = await predicate();
      if (value) return value;
    } catch (error) {
      lastError = error;
    }
    await new Promise((resolve) => setTimeout(resolve, 150));
  }
  throw new Error(errorCode + (lastError ? ': ' + lastError.message : ''));
}

async function getFreeLocalPort() {
  const server = net.createServer();
  await new Promise((resolve, reject) => {
    server.once('error', reject);
    server.listen(0, '127.0.0.1', resolve);
  });
  const port = server.address().port;
  await new Promise((resolve, reject) => server.close((error) => error ? reject(error) : resolve()));
  return port;
}

async function openCdp(webSocketUrl) {
  const socket = new WebSocket(webSocketUrl);
  await new Promise((resolve, reject) => {
    socket.addEventListener('open', resolve, { once: true });
    socket.addEventListener('error', reject, { once: true });
  });
  let nextId = 0;
  async function send(method, params = {}) {
    const id = ++nextId;
    return new Promise((resolve, reject) => {
      const timeout = setTimeout(() => {
        socket.removeEventListener('message', onMessage);
        reject(new Error('CDP_RESPONSE_TIMEOUT:' + method));
      }, 10000);
      function onMessage(event) {
        const message = JSON.parse(String(event.data));
        if (message.id !== id) return;
        clearTimeout(timeout);
        socket.removeEventListener('message', onMessage);
        if (message.error) reject(new Error('CDP_' + method + ':' + message.error.message));
        else resolve(message.result);
      }
      socket.addEventListener('message', onMessage);
      socket.send(JSON.stringify({ id, method, params }));
    });
  }
  async function evaluate(expression) {
    const response = await send('Runtime.evaluate', {
      expression, returnByValue: true, awaitPromise: true,
    });
    if (response.exceptionDetails) throw new Error('BROWSER_JS_EXCEPTION:' + expression);
    return response.result?.value;
  }
  return { socket, send, evaluate };
}

async function runBrowserHydrationQa(t, temp, nextCli, chromiumExecutable) {
  const browserProfile = fs.mkdtempSync(path.join(temp, 'chrome-profile-'));
  const port = await getFreeLocalPort();
  const baseUrl = 'http://127.0.0.1:' + port;
  const nextServer = spawn(process.execPath, [
    nextCli, 'start', '-p', String(port), '-H', '127.0.0.1',
  ], {
    cwd: temp,
    windowsHide: true,
    stdio: ['ignore', 'pipe', 'pipe'],
    env: { ...process.env, NEXT_TELEMETRY_DISABLED: '1' },
  });
  let serverOutput = '';
  for (const output of [nextServer.stdout, nextServer.stderr]) {
    output.on('data', (chunk) => {
      serverOutput = (serverOutput + String(chunk)).slice(-1800);
    });
  }
  let browser = null;
  let client = null;
  try {
    await waitFor(async () => {
      if (nextServer.exitCode !== null) throw new Error('NEXT_SERVER_EXITED:' + nextServer.exitCode);
      const response = await fetch(baseUrl, {
        redirect: 'manual',
        signal: AbortSignal.timeout(3000),
      });
      assert.equal(response.status, 200,
        'ISOLATED_FIXTURE_HTTP_STATUS:' + response.status
        + ':REDIRECT:' + (response.headers.get('location') ?? 'none'));
      return true;
    }, 25000, 'NEXT_SERVER_NOT_READY');

    browser = spawn(chromiumExecutable, [
      '--headless=new',
      '--no-first-run',
      '--no-default-browser-check',
      '--disable-extensions',
      '--disable-background-networking',
      '--disable-gpu',
      '--no-sandbox',
      '--disable-dev-shm-usage',
      '--remote-debugging-address=127.0.0.1',
      '--remote-debugging-port=0',
      '--remote-allow-origins=*',
      '--user-data-dir=' + browserProfile,
      'about:blank',
    ], { windowsHide: true, stdio: 'ignore' });

    const debugInfo = await waitFor(() => {
      if (browser.exitCode !== null) throw new Error('CHROMIUM_EXITED:' + browser.exitCode);
      const file = path.join(browserProfile, 'DevToolsActivePort');
      return fs.existsSync(file) ? fs.readFileSync(file, 'utf8').trim() : null;
    }, 15000, 'CHROMIUM_DEVTOOLS_NOT_READY');
    const debuggerPort = Number(debugInfo.split(/\r?\n/u)[0]);
    assert.ok(Number.isInteger(debuggerPort) && debuggerPort > 0,
      'CHROMIUM_DEBUGGER_PORT_INVALID');

    const target = await waitFor(async () => {
      const response = await fetch('http://127.0.0.1:' + debuggerPort + '/json/list');
      if (!response.ok) return null;
      const tabs = await response.json();
      return tabs.find((tab) => tab.type === 'page' && tab.webSocketDebuggerUrl);
    }, 10000, 'CHROMIUM_PAGE_TARGET_MISSING');

    client = await openCdp(target.webSocketDebuggerUrl);
    await client.send('Page.enable');
    await client.send('Runtime.enable');
    await client.send('Page.navigate', { url: baseUrl });

    try {
      await waitFor(async () => client.evaluate(
        "document.readyState === 'complete' && !!document.querySelector('.ui-area-selector__control')"
        + " && !!document.querySelector('.ui-site-selector__control')"
        + " && !!document.querySelector('.ui-app-shell__navigation-toggle')"
      ), 20000, 'BROWSER_DOM_NOT_READY');
    } catch (error) {
      const page = await client.evaluate(
        "JSON.stringify({ url: location.href, title: document.title,"
        + " ready: document.readyState,"
        + " content: document.body?.innerText?.slice(0, 800),"
        + " areaCount: document.querySelectorAll('.ui-area-selector__control').length,"
        + " siteCount: document.querySelectorAll('.ui-site-selector__control').length })"
      ).catch((diagnosticError) => 'CDP_DIAGNOSTIC_FAILED:' + diagnosticError.message);
      throw new Error(error.message + ' PAGE:' + page
        + ' NEXT_OUTPUT:' + serverOutput.slice(-800));
    }

    await waitFor(async () => {
      if (await client.evaluate(
        "document.querySelector('.ui-app-shell__navigation-toggle').getAttribute('aria-expanded') === 'true'"
      )) return true;
      await client.evaluate("document.querySelector('.ui-app-shell__navigation-toggle').click()");
      await new Promise((resolve) => setTimeout(resolve, 250));
      return client.evaluate(
        "document.querySelector('.ui-app-shell__navigation-toggle').getAttribute('aria-expanded') === 'true'"
      );
    }, 12000, 'APP_SHELL_NOT_HYDRATED');

    await client.evaluate(
      "document.querySelector('nav.ui-app-shell__navigation')"
      + ".dispatchEvent(new KeyboardEvent('keydown', { key: 'Escape', bubbles: true }))"
    );
    await waitFor(async () => client.evaluate(
      "document.querySelector('.ui-app-shell__navigation-toggle').getAttribute('aria-expanded') === 'false'"
    ), 6000, 'APP_SHELL_ESCAPE_NOT_HANDLED');

    await client.evaluate(
      "(() => { const el = document.querySelector('.ui-area-selector__control');"
      + " el.value = 'area-b'; el.dispatchEvent(new Event('change', { bubbles: true })); })()"
    );
    await waitFor(async () => client.evaluate(
      "document.querySelector('#controls output')?.textContent === 'QA_SELECTION_area-b_site-a'"
    ), 6000, 'AREA_SELECTOR_NOT_HYDRATED');

    await client.evaluate(
      "(() => { const el = document.querySelector('.ui-site-selector__control');"
      + " el.value = 'site-b'; el.dispatchEvent(new Event('change', { bubbles: true })); })()"
    );
    await waitFor(async () => client.evaluate(
      "document.querySelector('#controls output')?.textContent === 'QA_SELECTION_area-b_site-b'"
    ), 6000, 'SITE_SELECTOR_NOT_HYDRATED');

    t.diagnostic('REAL_CHROMIUM_HYDRATION_PASS:' + path.basename(chromiumExecutable));
  } finally {
    client?.socket.close();
    browser?.kill();
    nextServer.kill();
    await new Promise((resolve) => setTimeout(resolve, 400));
    fs.rmSync(browserProfile, { recursive: true, force: true, maxRetries: 3, retryDelay: 200 });
  }
}
