import assert from 'node:assert/strict';
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { spawnSync } from 'node:child_process';
import test from 'node:test';

import {
  CANONICAL_SHARED_PACKAGES,
  REQUIRED_CONTRACT_CHECKS,
  buildMaterialIdentity,
  collectBareImports,
  collectInternalDependencies,
  compareEvidenceIdentity,
  compareNormalizedBuilds,
  detectUnsafeOutputText,
  evaluateObservedBuild,
  exportedNames,
  exportedTypeNames,
  inspectBuiltSurface,
  findDuplicateBuildGateImplementations,
  runGate,
  sha256,
  snapshotDirectory,
  stableStringify,
  validateBuildContract,
  validateEvidence,
  validateManifestContract,
} from './shared-package-build-gate.mjs';

function baseManifest(overrides = {}) {
  return {
    name: '@vento/contracts',
    version: '1.2.3',
    type: 'module',
    main: './dist/index.js',
    types: './dist/index.d.ts',
    exports: {
      '.': {
        import: './dist/index.js',
        types: './dist/index.d.ts',
      },
    },
    files: ['dist'],
    dependencies: {},
    devDependencies: {},
    peerDependencies: {},
    optionalDependencies: {},
    ...overrides,
  };
}

function baseContract(overrides = {}) {
  return {
    schema_version: 1,
    package: '@vento/contracts',
    candidate_version: '1.2.3',
    release_channel: 'stable',
    build: {
      command: '$NODE',
      args: ['scripts/build.mjs'],
      timeout_ms: 30_000,
    },
    output_root: 'dist',
    public_surface: [
      {
        subpath: '.',
        runtime: 'dist/index.js',
        types: 'dist/index.d.ts',
        expected_exports: ['hello'],
      },
    ],
    assets: [],
    internal_dependencies: [],
    external_peers: {},
    runtime: { node_major: Number.parseInt(process.versions.node.split('.')[0], 10) },
    generated_inputs: [],
    exclusions: ['src'],
    reproducibility_ignore: [],
    allow_source_files: false,
    contract_checks: [...REQUIRED_CONTRACT_CHECKS],
    ...overrides,
  };
}

function writeJson(filePath, value) {
  fs.mkdirSync(path.dirname(filePath), { recursive: true });
  fs.writeFileSync(filePath, `${JSON.stringify(value, null, 2)}\n`, 'utf8');
}

function run(root, command, args) {
  const result = spawnSync(command, args, { cwd: root, encoding: 'utf8', windowsHide: true });
  if (result.error || result.status !== 0) {
    throw new Error(`${command} ${args.join(' ')} failed: ${result.stderr || result.stdout}`);
  }
  return result.stdout.trim();
}

function createFixture({ manifest = baseManifest(), contract = baseContract(), buildSource = null } = {}) {
  const root = fs.mkdtempSync(path.join(os.tmpdir(), 'vento-ci002-test-'));
  fs.mkdirSync(path.join(root, 'packages', 'contracts', 'scripts'), { recursive: true });
  writeJson(path.join(root, 'package.json'), {
    name: 'fixture-root',
    version: '1.0.0',
    private: true,
    packageManager: 'npm@11.17.0',
    engines: { node: process.versions.node },
  });
  writeJson(path.join(root, 'package-lock.json'), {
    name: 'fixture-root',
    version: '1.0.0',
    lockfileVersion: 3,
    packages: {},
  });
  writeJson(path.join(root, 'packages', 'contracts', 'package.json'), manifest);
  writeJson(path.join(root, 'build-contract.json'), contract);
  fs.writeFileSync(
    path.join(root, 'packages', 'contracts', 'scripts', 'build.mjs'),
    buildSource ?? [
      "import fs from 'node:fs';",
      "fs.rmSync('dist', { recursive: true, force: true });",
      "fs.mkdirSync('dist', { recursive: true });",
      "fs.writeFileSync('dist/index.js', \"export const hello = 'world';\\n\", 'utf8');",
      "fs.writeFileSync('dist/index.d.ts', 'export declare const hello: string;\\n', 'utf8');",
    ].join('\n'),
    'utf8',
  );
  run(root, 'git', ['init']);
  run(root, 'git', ['config', 'user.email', 'ci002@example.invalid']);
  run(root, 'git', ['config', 'user.name', 'CI002 Fixture']);
  run(root, 'git', ['add', '.']);
  run(root, 'git', ['commit', '-m', 'fixture']);
  return {
    root,
    packageRoot: path.join(root, 'packages', 'contracts'),
    contractPath: path.join(root, 'build-contract.json'),
    evidenceRoot: path.join(root, '.delivery', 'shared-package-builds'),
  };
}

function emptyRun(overrides = {}) {
  return {
    processState: 'PASS',
    processReason: null,
    manifestReasons: [],
    surfaceReasons: [],
    packReasons: [],
    crossPackageChanges: [],
    duplicateImplementations: [],
    reproducibility: { reproducible: true },
    ...overrides,
  };
}

// 8 positive cases required by SHELL-CI-002.
test('positive 01 - materialized package can complete a full clean build and produce attributable evidence', () => {
  const fixture = createFixture();
  try {
    const result = runGate(fixture);
    assert.equal(result.evidence.build_status, 'PASS');
    assert.equal(result.evidence.package_name, '@vento/contracts');
    assert.ok(result.evidence.artifact_file_manifest.length >= 2);
    assert.match(result.evidence.pack_integrity, /^sha512-/u);
  } finally {
    fs.rmSync(fixture.root, { recursive: true, force: true });
  }
});

test('positive 02 - two identical normalized builds are reproducible', () => {
  const build = { files: [{ path: 'index.js', sha256: 'sha256:a' }], content_hash: 'sha256:x' };
  assert.equal(compareNormalizedBuilds(build, structuredClone(build)).reproducible, true);
});

test('positive 03 - declarations and runtime expose the same required public symbol', () => {
  assert.deepEqual(exportedNames("export const hello = 'x';"), ['hello']);
  assert.deepEqual(exportedNames('export declare const hello: string;'), ['hello']);
});

test('positive 04 - several public entrypoints can be declared without duplication', () => {
  const contract = baseContract({
    public_surface: [
      { subpath: '.', runtime: 'dist/index.js', types: 'dist/index.d.ts', expected_exports: ['hello'] },
      { subpath: './server', runtime: 'dist/server.js', types: 'dist/server.d.ts', expected_exports: ['server'] },
    ],
  });
  assert.deepEqual(validateBuildContract(contract), []);
});

test('positive 05 - an approved external peer range is preserved exactly', () => {
  const manifest = baseManifest({ peerDependencies: { react: '^19.2.3' } });
  const contract = baseContract({ external_peers: { react: '^19.2.3' } });
  assert.deepEqual(validateManifestContract(manifest, contract), []);
});

test('positive 06 - an exact internal dependency identity is accepted', () => {
  const manifest = baseManifest({ dependencies: { '@vento/os-context': '1.4.0' } });
  const contract = baseContract({
    internal_dependencies: [{
      name: '@vento/os-context',
      range: '1.4.0',
      section: 'dependencies',
      identity: 'sha256:abc',
    }],
  });
  assert.deepEqual(validateManifestContract(manifest, contract), []);
  assert.equal(collectInternalDependencies(manifest).length, 1);
});

test('positive 07 - packed surface paths remain distributable and source-free', () => {
  const manifest = baseManifest();
  assert.equal(manifest.files.includes('dist'), true);
  assert.equal(validateManifestContract(manifest, baseContract()).length, 0);
});

test('positive 08 - a legitimate contract identity change produces a new material identity', () => {
  const fixture = createFixture();
  try {
    const manifestSource = fs.readFileSync(path.join(fixture.packageRoot, 'package.json'), 'utf8');
    const manifest = JSON.parse(manifestSource);
    const sourceA = fs.readFileSync(fixture.contractPath, 'utf8');
    const contractA = JSON.parse(sourceA);
    const identityA = buildMaterialIdentity({
      repositoryRoot: fixture.root,
      manifestSource,
      manifest,
      contractSource: sourceA,
      contract: contractA,
    });
    const contractB = { ...contractA, reproducibility_ignore: ['dist/build-meta.json'] };
    const sourceB = `${JSON.stringify(contractB, null, 2)}\n`;
    const identityB = buildMaterialIdentity({
      repositoryRoot: fixture.root,
      manifestSource,
      manifest,
      contractSource: sourceB,
      contract: contractB,
    });
    assert.notEqual(identityA.material_identity_sha256, identityB.material_identity_sha256);
  } finally {
    fs.rmSync(fixture.root, { recursive: true, force: true });
  }
});

// 20 negative cases required by SHELL-CI-002.
test('negative 01 - package without build declaration is blocked by the contract validator', () => {
  const contract = baseContract();
  delete contract.build;
  assert.ok(validateBuildContract(contract).includes('BUILD_DECLARATION_MISSING'));
});

test('negative 02 - a governed package that is not materialized cannot be evaluated', () => {
  const errors = validateBuildContract({ ...baseContract(), package: '@vento/supabase' }, { packageName: '@vento/contracts' });
  assert.ok(errors.includes('CONTRACT_PACKAGE_MISMATCH'));
});

test('negative 03 - missing build command is blocked', () => {
  assert.ok(validateBuildContract(baseContract({ build: { command: '', args: [] } })).includes('BUILD_COMMAND_MISSING'));
});

test('negative 04 - root application build coupling is fail-closed', () => {
  const result = evaluateObservedBuild(emptyRun({ processState: 'BLOCKED', processReason: 'BUILD_COMMAND_COUPLED_TO_ROOT_APPLICATION' }));
  assert.equal(result.outcome, 'BLOCKED');
});

test('negative 05 - zero distributable outputs is a failure', () => {
  assert.equal(evaluateObservedBuild(emptyRun({ surfaceReasons: ['ZERO_DISTRIBUTABLE_OUTPUTS'] })).outcome, 'FAIL');
});

test('negative 06 - manifest that exposes src is rejected', () => {
  const manifest = baseManifest({ main: './src/index.ts' });
  assert.ok(validateManifestContract(manifest, baseContract()).some((reason) => reason.startsWith('SOURCE_EXPOSED_AS_DISTRIBUTION:')));
});

test('negative 07 - missing public runtime entrypoint is detected', () => {
  assert.equal(evaluateObservedBuild(emptyRun({ surfaceReasons: ['ENTRYPOINT_MISSING:.:dist/index.js'] })).outcome, 'FAIL');
});

test('negative 08 - missing declaration is detected', () => {
  assert.equal(evaluateObservedBuild(emptyRun({ surfaceReasons: ['DECLARATION_MISSING:.:dist/index.d.ts'] })).outcome, 'FAIL');
});

test('negative 09 - private source references in distributable output are detected', () => {
  assert.ok(detectUnsafeOutputText("import x from '../src/private.js';").includes('PRIVATE_SOURCE_REFERENCE'));
});

test('negative 10 - local absolute paths in output are detected', () => {
  assert.ok(detectUnsafeOutputText('const p = "C:\\Users\\User\\repo\\src";').includes('ABSOLUTE_LOCAL_PATH'));
});

test('negative 11 - file, git and workspace dependency ranges are rejected', () => {
  const manifest = baseManifest({ dependencies: { foo: 'file:../foo' } });
  assert.ok(validateManifestContract(manifest, baseContract()).some((reason) => reason.startsWith('LOCAL_DEPENDENCY_RANGE:')));
});

test('negative 12 - runtime import without runtime dependency declaration is rejected by surface evaluation', () => {
  assert.deepEqual(collectBareImports("import x from 'left-pad';"), ['left-pad']);
  assert.equal(evaluateObservedBuild(emptyRun({ surfaceReasons: ['RUNTIME_DEPENDENCY_UNDECLARED:dist/index.js:left-pad'] })).outcome, 'FAIL');
});

test('negative 13 - peer range that differs from the canonical contract is rejected', () => {
  const manifest = baseManifest({ peerDependencies: { react: '^18.0.0' } });
  const contract = baseContract({ external_peers: { react: '^19.2.3' } });
  assert.ok(validateManifestContract(manifest, contract).includes('PEER_RANGE_MISMATCH:react'));
});

test('negative 14 - build that requires removed production credentials cannot normalize process error to PASS', () => {
  const result = evaluateObservedBuild(emptyRun({ processState: 'BLOCKED', processReason: 'BUILD_PROCESS_ERROR:ENV:credential missing' }));
  assert.equal(result.outcome, 'BLOCKED');
});

test('negative 15 - stale output contamination is a failure', () => {
  assert.equal(evaluateObservedBuild(emptyRun({ surfaceReasons: ['STALE_OUTPUT_DETECTED'] })).outcome, 'FAIL');
});

test('negative 16 - two clean builds with different normalized content fail reproducibility', () => {
  const comparison = compareNormalizedBuilds(
    { files: [{ path: 'a', sha256: 'sha256:a' }], content_hash: 'sha256:a' },
    { files: [{ path: 'a', sha256: 'sha256:b' }], content_hash: 'sha256:b' },
  );
  assert.equal(evaluateObservedBuild(emptyRun({ reproducibility: comparison })).outcome, 'FAIL');
});

test('negative 17 - writing outside the target package fails the build', () => {
  const result = evaluateObservedBuild(emptyRun({ crossPackageChanges: ['packages/os-context/dist/index.js'] }));
  assert.ok(result.reasons.some((reason) => reason.startsWith('CROSS_PACKAGE_WRITE:')));
});

test('negative 18 - pack that cannot import outside source tree fails', () => {
  assert.equal(evaluateObservedBuild(emptyRun({ packReasons: ['ISOLATED_IMPORT_FAILED'] })).outcome, 'FAIL');
});

test('negative 19 - secret-like output is blocked', () => {
  assert.ok(detectUnsafeOutputText('API_KEY=sk_live_abcdefghijklmnopqrstuvwxyz').includes('SENSITIVE_VALUE_PATTERN'));
});

test('negative 20 - stale evidence from a different material identity is not current', () => {
  const evidence = {
    schema_version: 1,
    gate_instance: 'SHELL-CI-002::GLOBAL',
    run_identity: 'run',
    build_status: 'PASS',
    package_name: '@vento/contracts',
    package_candidate_version: '1.0.0',
    source_commit: 'a',
    package_manifest_hash: 'sha256:a',
    lockfile_hash: 'sha256:a',
    toolchain_identity: 'sha256:a',
    runtime_identity: 'node:x',
    resolved_internal_dependency_set: [],
    public_surface_identity: 'sha256:a',
    build_contract_identity: 'sha256:a',
    gate_implementation_identity: 'sha256:a',
    material_identity_sha256: 'sha256:a',
    artifact_file_manifest: [],
    artifact_content_hash: 'sha256:a',
    declarations_identity: 'sha256:a',
    exports_identity: 'sha256:a',
    pack_integrity: 'sha512:a',
  };
  const current = { ...evidence, source_commit: 'b', material_identity_sha256: 'sha256:b' };
  assert.equal(compareEvidenceIdentity(evidence, current).current, false);
});

// 16 regression cases required by SHELL-CI-002.
test('regression 01 - build script failure cannot be presented as PASS', () => {
  assert.equal(evaluateObservedBuild(emptyRun({ processState: 'FAIL', processReason: 'BUILD_EXIT_NONZERO:1' })).outcome, 'FAIL');
});

test('regression 02 - inherited output residue remains a failure reason', () => {
  assert.ok(evaluateObservedBuild(emptyRun({ surfaceReasons: ['STALE_OUTPUT_DETECTED'] })).reasons.includes('STALE_OUTPUT_DETECTED'));
});

test('regression 03 - main existing does not hide broken exports', () => {
  assert.equal(evaluateObservedBuild(emptyRun({ surfaceReasons: ['ENTRYPOINT_MISSING:./server:dist/server.js'] })).outcome, 'FAIL');
});

test('regression 04 - stale declarations do not satisfy public surface', () => {
  assert.equal(evaluateObservedBuild(emptyRun({ surfaceReasons: ['DECLARATION_EXPORT_MISSING:.:hello'] })).outcome, 'FAIL');
});

test('regression 05 - packed workspace dependency is never accepted', () => {
  const manifest = baseManifest({ dependencies: { foo: 'workspace:*' } });
  assert.ok(validateManifestContract(manifest, baseContract()).some((reason) => reason.startsWith('LOCAL_DEPENDENCY_RANGE:')));
});

test('regression 06 - import that only resolves through source reference is rejected', () => {
  assert.ok(detectUnsafeOutputText("export { x } from '../../src/x.js';").includes('PRIVATE_SOURCE_REFERENCE'));
});

test('regression 07 - reproducibility comparison includes every normalized file hash', () => {
  const first = { files: [{ path: 'a', sha256: 'sha256:a' }, { path: 'b', sha256: 'sha256:b' }], content_hash: 'sha256:x' };
  const second = { files: [{ path: 'a', sha256: 'sha256:a' }], content_hash: 'sha256:x' };
  assert.equal(compareNormalizedBuilds(first, second).reproducible, false);
});

test('regression 08 - incompatible peer remains blocking instead of warning-only', () => {
  const manifest = baseManifest({ peerDependencies: { react: '^18.0.0' } });
  const reasons = validateManifestContract(manifest, baseContract({ external_peers: { react: '^19.2.3' } }));
  assert.ok(reasons.includes('PEER_RANGE_MISMATCH:react'));
});

test('regression 09 - changed internal dependency identity changes material identity', () => {
  const a = stableStringify([{ name: '@vento/os-context', identity: 'sha256:a' }]);
  const b = stableStringify([{ name: '@vento/os-context', identity: 'sha256:b' }]);
  assert.notEqual(sha256(a), sha256(b));
});

test('regression 10 - unknown package family is rejected', () => {
  assert.equal(CANONICAL_SHARED_PACKAGES.includes('@vento/unknown'), false);
  assert.ok(validateBuildContract(baseContract({ package: '@vento/unknown' })).includes('PACKAGE_NOT_CANONICAL'));
});

test('regression 11 - timeout and cancellation are never PASS', () => {
  assert.equal(evaluateObservedBuild(emptyRun({ processState: 'TIMED_OUT', processReason: 'BUILD_TIMED_OUT' })).outcome, 'TIMED_OUT');
  assert.equal(evaluateObservedBuild(emptyRun({ processState: 'CANCELLED', processReason: 'BUILD_SIGNAL:SIGTERM' })).outcome, 'CANCELLED');
});

test('regression 12 - omitting a required contract check invalidates the contract', () => {
  const contract = baseContract({ contract_checks: REQUIRED_CONTRACT_CHECKS.filter((value) => value !== 'isolated_pack') });
  assert.ok(validateBuildContract(contract).includes('CONTRACT_CHECK_MISSING:isolated_pack'));
});

test('regression 13 - secret detection survives unrelated safe content', () => {
  assert.ok(detectUnsafeOutputText('export const ok = true;\nservice_role = "abc";').includes('SENSITIVE_VALUE_PATTERN'));
});

test('regression 14 - cross-package writes cannot be erased by an otherwise clean result', () => {
  const result = evaluateObservedBuild(emptyRun({ crossPackageChanges: ['packages/ui-web/dist/index.js'] }));
  assert.equal(result.outcome, 'FAIL');
});

test('regression 15 - malformed machine evidence cannot be treated as human PASS', () => {
  assert.ok(validateEvidence({ build_status: 'PASS' }).length > 0);
});

test('regression 16 - a second package-local implementation of the gate is detected', () => {
  const root = fs.mkdtempSync(path.join(os.tmpdir(), 'vento-ci002-duplicate-'));
  try {
    const duplicate = path.join(root, 'packages', 'contracts', 'shared-package-build-gate.mjs');
    fs.mkdirSync(path.dirname(duplicate), { recursive: true });
    fs.writeFileSync(duplicate, 'export {};\n', 'utf8');
    assert.deepEqual(findDuplicateBuildGateImplementations(root), ['packages/contracts/shared-package-build-gate.mjs']);
  } finally {
    fs.rmSync(root, { recursive: true, force: true });
  }
});

// Additional deterministic helper checks.
test('helper - stable stringify is key-order independent', () => {
  assert.equal(stableStringify({ b: 2, a: 1 }), stableStringify({ a: 1, b: 2 }));
});

test('helper - snapshot directory hashes the normalized file set', () => {
  const root = fs.mkdtempSync(path.join(os.tmpdir(), 'vento-ci002-snapshot-'));
  try {
    fs.writeFileSync(path.join(root, 'a.txt'), 'a', 'utf8');
    fs.writeFileSync(path.join(root, 'b.txt'), 'b', 'utf8');
    const snapshot = snapshotDirectory(root);
    assert.equal(snapshot.files.length, 2);
    assert.match(snapshot.content_hash, /^sha256:/u);
  } finally {
    fs.rmSync(root, { recursive: true, force: true });
  }
});

test('type-only entrypoint is an explicit, valid CI002 contract with declaration exports', () => {
  const entry = {
    subpath: './authorization/response-contracts/v1',
    runtime: 'dist/index.js', types: 'dist/index.d.ts',
    type_only: true, expected_exports: [], expected_type_exports: ['AccessContextV1', 'SimulationContextV1'],
  };
  assert.deepEqual(validateBuildContract(baseContract({ public_surface: [entry] })), []);
  assert.deepEqual(exportedTypeNames(
    "export type { AccessContextV1, SimulationContextV1 } from './contracts.js';",
  ), ['AccessContextV1', 'SimulationContextV1']);
});

test('type-only entrypoint cannot masquerade as zero-export runtime without declared type surface', () => {
  const entry = {
    subpath: './types', runtime: 'dist/index.js', types: 'dist/index.d.ts',
    expected_exports: [],
  };
  assert(validateBuildContract(baseContract({ public_surface: [entry] }))
    .includes('EXPECTED_EXPORTS_INVALID:./types'));
  const bad = { ...entry, type_only: true, expected_type_exports: [] };
  assert(validateBuildContract(baseContract({ public_surface: [bad] }))
    .includes('TYPE_ONLY_EXPORTS_INVALID:./types'));
  const mixed = { ...entry, type_only: true, expected_exports: ['leak'],
    expected_type_exports: ['AccessContextV1'] };
  assert(validateBuildContract(baseContract({ public_surface: [mixed] }))
    .includes('EXPECTED_EXPORTS_INVALID:./types'));
});

test('CI002 validates real type-only declaration names and an empty JavaScript module', () => {
  const fixture = createFixture();
  try {
    const pkg = fixture.packageRoot;
    fs.mkdirSync(path.join(pkg, 'dist'), { recursive: true });
    fs.writeFileSync(path.join(pkg, 'dist/index.js'), 'export {};\n');
    fs.writeFileSync(path.join(pkg, 'dist/index.d.ts'),
      "export type { AccessContextV1, SimulationContextV1 } from './contracts.js';\n");
    const contract = baseContract({
      public_surface: [{
        subpath: './response', runtime: 'dist/index.js', types: 'dist/index.d.ts',
        type_only: true, expected_exports: [],
        expected_type_exports: ['AccessContextV1', 'SimulationContextV1'],
      }],
    });
    const observed = inspectBuiltSurface({
      packageRoot: pkg, repositoryRoot: fixture.root,
      manifest: baseManifest(), contract,
      artifactSnapshot: snapshotDirectory(path.join(pkg, 'dist')),
    });
    assert.deepEqual(observed.reasons, []);
    assert.deepEqual(observed.surface[0].runtime_exports, []);
    assert.deepEqual(observed.surface[0].type_exports,
      ['AccessContextV1', 'SimulationContextV1']);
    fs.writeFileSync(path.join(pkg, 'dist/index.js'), "console.log('side effect');\nexport {};\n");
    const unsafe = inspectBuiltSurface({
      packageRoot: pkg, repositoryRoot: fixture.root,
      manifest: baseManifest(), contract,
      artifactSnapshot: snapshotDirectory(path.join(pkg, 'dist')),
    });
    assert(unsafe.reasons.includes('TYPE_ONLY_RUNTIME_NOT_EMPTY:./response'));
    fs.writeFileSync(path.join(pkg, 'dist/index.js'), 'export {};\n');
    fs.writeFileSync(path.join(pkg, 'dist/index.d.ts'),
      "export type { AccessContextV1 } from './contracts.js';\n");
    const missing = inspectBuiltSurface({
      packageRoot: pkg, repositoryRoot: fixture.root,
      manifest: baseManifest(), contract,
      artifactSnapshot: snapshotDirectory(path.join(pkg, 'dist')),
    });
    assert(missing.reasons.includes('TYPE_ONLY_EXPORT_MISMATCH:./response'));
  } finally {
    fs.rmSync(fixture.root, { recursive: true, force: true });
  }
});
