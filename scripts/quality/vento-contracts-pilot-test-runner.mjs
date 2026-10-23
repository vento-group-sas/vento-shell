import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import { spawnSync } from 'node:child_process';
import { fileURLToPath, pathToFileURL } from 'node:url';

import { exportedNames, exportedTypeNames } from './shared-package-build-gate.mjs';
import { inspectCandidate, validatePack } from './shared-package-distribution-gate.mjs';

const ROOT = path.resolve(fileURLToPath(new URL('../..', import.meta.url)));
const PACKAGE_ROOT = path.join(ROOT, 'packages', 'contracts');
const PACKAGE = '@vento/contracts';
const PUBLIC_SUBPATH_COUNT = 15;

function requireFile(filename) {
  const root = path.resolve(PACKAGE_ROOT);
  const absolute = path.resolve(root, filename);
  assert(absolute.startsWith(root + path.sep), 'PATH_ESCAPE');
  const stat = fs.lstatSync(absolute);
  assert(stat.isFile() && !stat.isSymbolicLink(), 'NONREGULAR_FILE');
  return fs.readFileSync(absolute, 'utf8');
}

function checkCounts(id) {
  return { id, status: 'PASS', tests: { total: 0, passed: 0, failed: 0, skipped: 0 } };
}

async function check(group, code, fn, reasons) {
  group.tests.total += 1;
  try {
    await fn();
    group.tests.passed += 1;
  } catch {
    group.tests.failed += 1;
    reasons.push(code);
  }
  if (group.tests.failed > 0) group.status = 'FAIL';
}

function unitSuite() {
  const group = checkCounts('unit');
  const run = spawnSync(process.execPath, [
    '--test', '--test-reporter=tap',
    'scripts/quality/shared-package-distribution-gate.test.mjs',
  ], { cwd: ROOT, encoding: 'utf8', windowsHide: true,
    timeout: 120000, maxBuffer: 4 * 1024 * 1024 });
  const output = String(run.stdout ?? '');
  const metric = (name) => {
    const found = [...output.matchAll(new RegExp('^# ' + name + '\\s+(\\d+)\\s*$', 'gm'))];
    return found.length ? Number(found.at(-1)[1]) : null;
  };
  const total = metric('tests');
  const passed = metric('pass');
  const failed = metric('fail');
  const skipped = metric('skipped');
  if (run.status === 0 && !run.error && !run.signal
    && total > 0 && passed === total && failed === 0 && skipped === 0) {
    group.tests = { total, passed, failed: 0, skipped: 0 };
  } else {
    group.tests = {
      total: Number.isInteger(total) && total > 0 ? total : 1,
      passed: Number.isInteger(passed) && passed >= 0 ? Math.min(passed, total ?? 1) : 0,
      failed: Math.max(1, Number.isInteger(failed) ? failed : 1),
      skipped: Number.isInteger(skipped) ? skipped : 0,
    };
    if (group.tests.passed + group.tests.failed + group.tests.skipped !== group.tests.total) {
      group.tests = { total: 1, passed: 0, failed: 1, skipped: 0 };
    }
    group.status = 'FAIL';
  }
  return group;
}

async function contractualChecks(contract, manifest, reasons) {
  const group = checkCounts('contractual');
  await check(group, 'PUBLIC_SUBPATH_SNAPSHOT_MISMATCH', () => {
    assert.equal(Object.keys(manifest.exports ?? {}).length, PUBLIC_SUBPATH_COUNT);
    assert.equal(contract.public_surface.length, PUBLIC_SUBPATH_COUNT);
    assert.equal(new Set(contract.public_surface.map((entry) => entry.subpath)).size,
      PUBLIC_SUBPATH_COUNT);
    assert.equal(contract.package, PACKAGE);
    assert.equal(contract.candidate_version, manifest.version);
  }, reasons);
  for (const entry of contract.public_surface) {
    await check(group, 'SUBPATH_DISTRIBUTION_MISMATCH:' + entry.subpath, async () => {
      const target = manifest.exports?.[entry.subpath];
      assert(target && typeof target === 'object', 'MISSING_EXPORT');
      assert.equal(target.import, './' + entry.runtime);
      assert.equal(target.types, './' + entry.types);
      assert.equal(target.default, target.import);
      const src = entry.runtime.replace(/^dist\//u, '').replace(/\.js$/u, '.ts');
      const source = requireFile(src);
      const expectedFromSource = exportedNames(source);
      assert.deepEqual([...entry.expected_exports].sort(), expectedFromSource);
      const runtimeText = requireFile(entry.runtime);
      assert.deepEqual(exportedNames(runtimeText), expectedFromSource);
      const typeText = requireFile(entry.types);
      if (entry.type_only === true) {
        assert.equal(entry.subpath, './authorization/response-contracts/v1');
        assert.deepEqual(expectedFromSource, []);
        assert.deepEqual(exportedTypeNames(source), [...entry.expected_type_exports].sort());
        assert.deepEqual(exportedTypeNames(typeText), [...entry.expected_type_exports].sort());
      } else {
        assert(entry.expected_exports.length > 0);
        for (const name of expectedFromSource) {
          assert(exportedNames(typeText).includes(name), 'MISSING_DECLARED_EXPORT');
        }
      }
      const location = path.join(PACKAGE_ROOT, entry.runtime);
      const imported = await import(pathToFileURL(location).href);
      assert.deepEqual(Object.keys(imported).sort(), expectedFromSource);
      const bare = PACKAGE + '/' + entry.subpath.slice(2);
      const viaPackage = await import(bare);
      assert.deepEqual(Object.keys(viaPackage).sort(), expectedFromSource);
    }, reasons);
  }
  return group;
}

async function securityChecks(manifest, reasons) {
  const group = checkCounts('security');
  await check(group, 'PRIVATE_AUTHORING_MANIFEST_REQUIRED', () => {
    assert.equal(manifest.name, PACKAGE);
    assert.equal(manifest.private, true);
    assert.equal(manifest.type, 'module');
    assert.deepEqual(manifest.files, ['dist/']);
    assert.equal(Object.hasOwn(manifest, 'publishConfig'), false);
  }, reasons);
  await check(group, 'PRIVATE_DISTRIBUTION_VALIDATION_FAILED', () => {
    const inspected = inspectCandidate(PACKAGE, { root: ROOT, built: true });
    assert.equal(inspected.entries.length, PUBLIC_SUBPATH_COUNT);
    const packed = validatePack(PACKAGE, { root: ROOT });
    assert.equal(packed.npm_pack, 'PASS');
    assert.equal(packed.checked_export_entries, PUBLIC_SUBPATH_COUNT);
    assert.equal(packed.publication_executed, false);
  }, reasons);
  await check(group, 'DISTRIBUTION_SYMLINK_OR_NONFILE', () => {
    const stack = [path.join(PACKAGE_ROOT, 'dist')];
    let files = 0;
    while (stack.length > 0) {
      const directory = stack.pop();
      const stat = fs.lstatSync(directory);
      assert(stat.isDirectory() && !stat.isSymbolicLink());
      for (const name of fs.readdirSync(directory)) {
        const child = path.join(directory, name);
        const entry = fs.lstatSync(child);
        assert(!entry.isSymbolicLink(), 'UNSAFE_SYMLINK');
        if (entry.isDirectory()) stack.push(child);
        else { assert(entry.isFile(), 'UNSAFE_DIST_ENTRY'); files += 1; }
      }
    }
    assert(files > 0, 'EMPTY_DIST');
  }, reasons);
  return group;
}

async function main() {
  const [contractRelative, extra] = process.argv.slice(2);
  assert(contractRelative && !extra, 'BUILD_CONTRACT_REQUIRED');
  const resultFile = process.env.VENTO_PACKAGE_TEST_RESULT_FILE;
  assert(path.isAbsolute(resultFile ?? ''), 'CI001_RESULT_FILE_REQUIRED');
  assert.equal(process.env.VENTO_PACKAGE_TEST_PACKAGE, PACKAGE, 'PACKAGE_RUNNER_IDENTITY');
  const expectedContract = path.join(ROOT, 'scripts', 'quality',
    'vento-contracts-pilot-build-contract.json');
  const givenContract = path.resolve(PACKAGE_ROOT, contractRelative);
  assert.equal(givenContract, expectedContract, 'BUILD_CONTRACT_PATH_MISMATCH');
  const contract = JSON.parse(fs.readFileSync(givenContract, 'utf8'));
  const manifest = JSON.parse(fs.readFileSync(path.join(PACKAGE_ROOT, 'package.json'), 'utf8'));
  const reasons = [];
  const groups = [
    unitSuite(),
    await contractualChecks(contract, manifest, reasons),
    await securityChecks(manifest, reasons),
  ];
  if (groups[0].status !== 'PASS') reasons.push('UNIT_SUITE_NONPASS');
  const outcome = groups.every((group) => group.status === 'PASS') ? 'PASS' : 'FAIL';
  const report = { schema_version: 1, package: PACKAGE, outcome, groups };
  fs.writeFileSync(resultFile, JSON.stringify(report, null, 2) + '\n', 'utf8');
  console.log(JSON.stringify({
    package: PACKAGE, outcome, group_counts: groups.map((g) => ({ id: g.id,
      status: g.status, tests: g.tests })), reason_codes: reasons,
  }));
  if (outcome !== 'PASS') process.exitCode = 1;
}

main().catch(() => {
  console.error('VENTO_CONTRACTS_PILOT:RUNNER_BLOCKED');
  process.exitCode = 1;
});
