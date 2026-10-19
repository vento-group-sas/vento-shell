import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { spawnSync } from 'node:child_process';
import {
  PACKAGE_ROOT,
  COMPONENTS,
  CLIENT_COMPONENTS,
  validateManifest,
  validatePhysicalDist,
  validateRuntime,
} from './validate-distribution.mjs';

function fixture(t) {
  const root = fs.mkdtempSync(path.join(os.tmpdir(), 'vento-ui-web-qa-'));
  t.after(() => fs.rmSync(root, { recursive: true, force: true }));
  fs.cpSync(path.join(PACKAGE_ROOT, 'src'), path.join(root, 'src'), { recursive: true });
  fs.cpSync(path.join(PACKAGE_ROOT, 'dist'), path.join(root, 'dist'), { recursive: true });
  fs.copyFileSync(path.join(PACKAGE_ROOT, 'package.json'), path.join(root, 'package.json'));
  return root;
}

function editedManifest(change) {
  const source = JSON.parse(fs.readFileSync(path.join(PACKAGE_ROOT, 'package.json'), 'utf8'));
  change(source);
  return source;
}

test('candidate is private, versioned and has 21 explicit public exports', () => {
  const manifest = editedManifest(() => {});
  assert.equal(validateManifest(manifest), 21);
  assert.deepEqual(CLIENT_COMPONENTS, ['AppShell', 'AreaSelector', 'SiteSelector']);
  assert.equal(COMPONENTS.length, 19);
});

test('compiled 19 ESM components, 19 declarations, CSS and index are present', () => {
  const result = validatePhysicalDist();
  assert.deepEqual(result, {
    components: 19, clientBoundaries: 3, cssSources: 19, outputs: 41, exports: 21,
  });
});

test('actual ESM import and three React server-render smoke scenarios work', async () => {
  const result = await validateRuntime();
  assert.deepEqual(result, { loadedModules: 19, ssrSmokeCases: 3 });
});

test('registry publish cannot be unlocked through a manifest mutation', () => {
  assert.throws(() => validateManifest(editedManifest((manifest) => {
    manifest.private = false;
  })), /RELEASE_MUST_REMAIN_PRIVATE/u);
  assert.throws(() => validateManifest(editedManifest((manifest) => {
    manifest.publishConfig = { registry: 'https://not-approved.example/' };
  })), /REGISTRY_NOT_YET_CERTIFIED/u);
});

test('public export inventory is fail-closed, including styling', () => {
  assert.throws(() => validateManifest(editedManifest((manifest) => {
    delete manifest.exports['./SiteSelector'];
  })), /UNREVIEWED_PUBLIC_EXPORT/u);
  assert.throws(() => validateManifest(editedManifest((manifest) => {
    manifest.exports['./Internal'] = './src/Internal.ts';
  })), /UNREVIEWED_PUBLIC_EXPORT/u);
  assert.throws(() => validateManifest(editedManifest((manifest) => {
    manifest.exports['./styles.css'] = './src/styles.css';
  })), /CSS_EXPORT_MISSING/u);
});

test('peer bands and CSS side-effect controls cannot drift silently', () => {
  assert.throws(() => validateManifest(editedManifest((manifest) => {
    manifest.peerDependencies.react = '*';
  })), /REACT_PEER_BAND/u);
  assert.throws(() => validateManifest(editedManifest((manifest) => {
    manifest.sideEffects = false;
  })), /CSS_TREE_SHAKE_POLICY/u);
});

test('client directive missing from emitted leaf fails the distribution check', (t) => {
  const root = fixture(t);
  const file = path.join(root, 'dist', 'AppShell.js');
  const original = fs.readFileSync(file, 'utf8');
  assert.match(original, /^['"]use client['"];?/u);
  fs.writeFileSync(file, original.replace(/^['"]use client['"];?/u, ''), 'utf8');
  assert.throws(() => validatePhysicalDist(root), /CLIENT_BOUNDARY:AppShell/u);
});

test('JavaScript CSS imports cause a fail-closed duplicate injection check', (t) => {
  const root = fixture(t);
  const file = path.join(root, 'dist', 'Alert.js');
  fs.writeFileSync(file, "import './alert.css';\n" + fs.readFileSync(file, 'utf8'), 'utf8');
  assert.throws(() => validatePhysicalDist(root), /BUNDLED_CSS_DUPLICATION:Alert/u);
});

test('TypeScript declarations never load CSS as a side effect', (t) => {
  const root = fixture(t);
  const file = path.join(root, 'dist', 'Alert.d.ts');
  fs.writeFileSync(file, "import './alert.css';\n" + fs.readFileSync(file, 'utf8'), 'utf8');
  assert.throws(() => validatePhysicalDist(root), /CSS_DECLARATION_LEAK:Alert/u);
});

test('missing or duplicated aggregate CSS is rejected', (t) => {
  const root = fixture(t);
  const file = path.join(root, 'dist', 'styles.css');
  const css = fs.readFileSync(file, 'utf8');
  fs.writeFileSync(file, css.replace('/* @vento/ui-web: alert.css */', ''), 'utf8');
  assert.throws(() => validatePhysicalDist(root), /CSS_CARDINALITY:alert.css/u);
});

test('distribution excludes unexpected output files', (t) => {
  const root = fixture(t);
  fs.writeFileSync(path.join(root, 'dist', 'unreviewed.js'), '', 'utf8');
  assert.throws(() => validatePhysicalDist(root), /UNEXPECTED_DIST_FILES/u);
});

test('build deterministically reproduces the same 41 output files', () => {
  function identity() {
    return Object.fromEntries(fs.readdirSync(path.join(PACKAGE_ROOT, 'dist'))
      .sort().map((filename) => [filename, fs.readFileSync(path.join(PACKAGE_ROOT, 'dist', filename), 'base64')]));
  }
  const before = identity();
  const build = spawnSync(process.execPath, ['scripts/build.mjs'], {
    cwd: PACKAGE_ROOT, encoding: 'utf8', windowsHide: true, timeout: 120000,
  });
  assert.equal(build.status, 0, String(build.stderr ?? build.stdout));
  assert.deepEqual(identity(), before);
});
