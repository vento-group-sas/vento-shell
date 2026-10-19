import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import { spawn, spawnSync } from 'node:child_process';
import net from 'node:net';
import { fileURLToPath } from 'node:url';

const pkgRoot = path.resolve(fileURLToPath(new URL('..', import.meta.url)));
const repoRoot = path.resolve(pkgRoot, '../..');

function walkFiles(dir) {
  if (!fs.existsSync(dir)) return [];
  return fs.readdirSync(dir, { withFileTypes: true }).flatMap((entry) => {
    const filename = path.join(dir, entry.name);
    return entry.isDirectory() ? walkFiles(filename) : entry.isFile() ? [filename] : [];
  });
}


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

test('isolated Next App Router builds ESM client leaf modules and one CSS entry', async (t) => {
  const nextCli = path.join(repoRoot, 'node_modules', 'next', 'dist', 'bin', 'next');
  assert.ok(fs.existsSync(nextCli), 'NEXT16_TOOLCHAIN_NOT_INSTALLED');
  // The fixture lives under the checked-out repository, so Next 16 can resolve
  // the existing toolchain without linking or copying Next into the QA project.
  // All fixture files are removed even when compilation fails.
  const temp = fs.mkdtempSync(path.join(repoRoot, '.vento-ui-web-next-'));
  t.after(() => fs.rmSync(temp, { recursive: true, force: true }));
  fs.mkdirSync(path.join(temp, 'app'), { recursive: true });
  fs.mkdirSync(path.join(temp, 'node_modules', '@vento', 'ui-web'), { recursive: true });
  const installed = path.join(temp, 'node_modules', '@vento', 'ui-web');
  for (const filename of ['package.json', 'README.md']) {
    fs.copyFileSync(path.join(pkgRoot, filename), path.join(installed, filename));
  }
  fs.cpSync(path.join(pkgRoot, 'dist'), path.join(installed, 'dist'), { recursive: true });

  for (const name of ['react', 'react-dom', 'scheduler']) {
    const source = path.join(repoRoot, 'node_modules', name);
    if (fs.existsSync(source)) {
      fs.cpSync(source, path.join(temp, 'node_modules', name), { recursive: true });
    } else {
      assert.equal(name, 'scheduler', 'MISSING_REACT_TOOLCHAIN_PEER:' + name);
    }
  }

  const nextVersion = JSON.parse(fs.readFileSync(
    path.join(repoRoot, 'node_modules', 'next', 'package.json'), 'utf8')).version;
  assert.match(nextVersion, /^16\./u, 'UNEXPECTED_NEXT_MAJOR');
  fs.writeFileSync(path.join(temp, 'package.json'), JSON.stringify({
    name: 'vento-ui-web-next-app-router-qa',
    version: '1.0.0',
    private: true,
    type: 'module',
    dependencies: {
      '@vento/ui-web': '0.1.0-alpha.1',
      next: nextVersion,
      react: '19.2.3',
      'react-dom': '19.2.3',
    },
  }, null, 2) + '\n', 'utf8');
  fs.writeFileSync(path.join(temp, 'next.config.mjs'),
    "import path from 'node:path';\nexport default { reactStrictMode: true, experimental: { cpus: 2 }, turbopack: { root: path.resolve(process.cwd(), '..') } };\n", 'utf8');
  // This disposable fixture must never inherit Shell's SSO middleware.
  fs.writeFileSync(path.join(temp, 'middleware.js'), String.raw`
import { NextResponse } from 'next/server';
export function middleware() { return NextResponse.next(); }
export const config = { matcher: ['/'] };
`, 'utf8');
  fs.writeFileSync(path.join(temp, 'app', 'layout.js'), String.raw`
import React from 'react';
import '@vento/ui-web/styles.css';
export const metadata = { title: 'VENTO UI Web App Router QA' };
export default function RootLayout({ children }) {
  return React.createElement('html', null,
    React.createElement('body', null, children));
}
`, 'utf8');
  fs.writeFileSync(path.join(temp, 'app', 'controls.js'), String.raw`
'use client';
import React from 'react';
import { AreaSelector } from '@vento/ui-web/AreaSelector';
import { SiteSelector } from '@vento/ui-web/SiteSelector';
export default function ClientControls() {
  const [areaId, setAreaId] = React.useState('area-a');
  const [siteId, setSiteId] = React.useState('site-a');
  return React.createElement('section', { id: 'controls' },
    React.createElement(AreaSelector, {
      label: 'QA_AREA_LABEL', confirmedAreaId: areaId,
      options: [{ id: 'area-a', label: 'QA_AREA_INITIAL' },
        { id: 'area-b', label: 'QA_AREA_ALTERNATE' }],
      onRequestChange: setAreaId,
    }),
    React.createElement(SiteSelector, {
      label: 'QA_SITE_LABEL', confirmedSiteId: siteId,
      options: [{ id: 'site-a', label: 'QA_SITE_INITIAL' },
        { id: 'site-b', label: 'QA_SITE_ALTERNATE' }],
      onRequestChange: setSiteId,
    }),
    React.createElement('output', null, 'QA_SELECTION_' + areaId + '_' + siteId),
  );
}
`, 'utf8');
  fs.writeFileSync(path.join(temp, 'app', 'page.js'), String.raw`
import React from 'react';
import ClientControls from './controls.js';
import { AppShell } from '@vento/ui-web/AppShell';
import { Alert } from '@vento/ui-web/Alert';
export default function Page() {
  return React.createElement(AppShell, {
    brand: 'VENTO', skipToContentLabel: 'Skip to main content',
    navigation: React.createElement('a', { href: '#controls' }, 'QA_NAVIGATION'),
    navigationLabel: 'QA_NAVIGATION',
  }, React.createElement(React.Fragment, null,
    React.createElement(Alert, { variant: 'success' }, 'NEXT_APP_ROUTER_QA_OK'),
    React.createElement(ClientControls),
  ));
}
`, 'utf8');

  const output = spawnSync(process.execPath, [nextCli, 'build'], {
    cwd: temp,
    encoding: 'utf8',
    windowsHide: true,
    timeout: 120000,
    maxBuffer: 4 * 1024 * 1024,
    env: {
      ...process.env,
      NEXT_TELEMETRY_DISABLED: '1',
      CI: '1',
    },
  });
  assert.equal(output.status, 0, 'NEXT_APP_ROUTER_BUILD_FAILED:\n' +
    String(output.stderr ?? '') + '\n' + String(output.stdout ?? ''));

  const prerender = walkFiles(path.join(temp, '.next', 'server', 'app'))
    .filter((name) => name.endsWith('.html'));
  assert.ok(prerender.some((name) =>
    fs.readFileSync(name, 'utf8').includes('NEXT_APP_ROUTER_QA_OK')),
  'APP_ROUTER_SSR_PRERENDER_MISSING');

  const emittedCss = walkFiles(path.join(temp, '.next', 'static'))
    .filter((name) => name.endsWith('.css'));
  assert.ok(emittedCss.length > 0, 'APP_ROUTER_CSS_NOT_EMITTED');
  const html = prerender.map((name) => fs.readFileSync(name, 'utf8')).join('\n');
  for (const marker of [
    'QA_NAVIGATION', 'QA_AREA_INITIAL', 'QA_SITE_INITIAL',
    'QA_SELECTION_area-a_site-a',
  ]) {
    assert.ok(html.includes(marker), 'APP_ROUTER_SSR_MARKER_MISSING:' + marker);
  }
  for (const selector of [
    '.ui-alert', '.ui-app-shell', '.ui-area-selector', '.ui-site-selector',
  ]) {
    const matchingAssets = emittedCss.filter((name) =>
      fs.readFileSync(name, 'utf8').includes(selector));
    assert.equal(matchingAssets.length, 1,
      'APP_ROUTER_CSS_MISSING_OR_DUPLICATED:' + selector);
  }

  const browser = findChromiumExecutable();
  await t.test('real Chromium hydration: navigation, Escape, area and site selection', {
    skip: browser ? false : 'CHROMIUM_BINARY_NOT_FOUND',
  }, async (browserTest) => {
    await runBrowserHydrationQa(browserTest, temp, nextCli, browser);
  });
});
