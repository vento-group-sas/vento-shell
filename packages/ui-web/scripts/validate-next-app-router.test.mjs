import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import { spawnSync } from 'node:child_process';
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

test('isolated Next App Router builds ESM client leaf modules and one CSS entry', (t) => {
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
});
