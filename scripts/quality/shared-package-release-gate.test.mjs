import assert from 'node:assert/strict';
import crypto from 'node:crypto';
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { spawnSync } from 'node:child_process';
import test from 'node:test';
import zlib from 'node:zlib';

import {
  asSha256Identity,
  assessPrivateReleasePreview,
  collectInternalDependencies,
  detectSecretsInTarball,
  evaluateReleaseCandidate,
  inspectObservedState,
  normalizeSyntheticState,
  packageSlug,
  parseSemver,
  privateReleaseCreateArgs,
  privateReleaseNotes,
  releasePreviewManifest,
  planCoordinatedRelease,
  runGate,
  sriSha512,
  stableStringify,
  tagForPackageVersion,
  validateReleaseContract,
} from './shared-package-release-gate.mjs';

function exec(command, args, options = {}) {
  const result = spawnSync(command, args, {
    cwd: options.cwd,
    encoding: 'utf8',
    windowsHide: true,
    shell: false,
  });
  if (result.error || result.status !== 0) {
    throw new Error(`${command} ${args.join(' ')} failed: ${result.error?.message ?? result.stderr}`);
  }
  return result.stdout.trim();
}

function tarHeader(name, size) {
  const header = Buffer.alloc(512, 0);
  header.write(name, 0, Math.min(Buffer.byteLength(name), 100), 'utf8');
  header.write('0000644\0', 100, 'ascii');
  header.write('0000000\0', 108, 'ascii');
  header.write('0000000\0', 116, 'ascii');
  header.write(`${size.toString(8).padStart(11, '0')}\0`, 124, 'ascii');
  header.write(`${Math.floor(Date.now() / 1000).toString(8).padStart(11, '0')}\0`, 136, 'ascii');
  header.fill(0x20, 148, 156);
  header.write('0', 156, 'ascii');
  header.write('ustar\0', 257, 'ascii');
  header.write('00', 263, 'ascii');
  let checksum = 0;
  for (const byte of header) checksum += byte;
  header.write(`${checksum.toString(8).padStart(6, '0')}\0 `, 148, 'ascii');
  return header;
}

function makeTarball(files) {
  const chunks = [];
  for (const [name, source] of Object.entries(files)) {
    const body = Buffer.from(source, 'utf8');
    chunks.push(tarHeader(name, body.length));
    chunks.push(body);
    const remainder = body.length % 512;
    if (remainder) chunks.push(Buffer.alloc(512 - remainder, 0));
  }
  chunks.push(Buffer.alloc(1024, 0));
  return zlib.gzipSync(Buffer.concat(chunks), { mtime: 0 });
}

function hash(value) {
  return `sha256:${crypto.createHash('sha256').update(value).digest('hex')}`;
}

function baseManifest(packageName = '@vento/contracts', version = '1.2.3', dependencies = {}) {
  return {
    name: packageName,
    version,
    type: 'module',
    main: './dist/index.js',
    types: './dist/index.d.ts',
    exports: { '.': { import: './dist/index.js', types: './dist/index.d.ts' } },
    dependencies,
  };
}

function baseScenario(overrides = {}) {
  const manifest = overrides.manifest ?? baseManifest();
  const manifestSource = `${JSON.stringify(manifest, null, 2)}\n`;
  const sourceCommit = overrides.sourceCommit ?? '1'.repeat(40);
  const tarballBuffer = overrides.tarballBuffer ?? makeTarball({
    'package/package.json': JSON.stringify(manifest),
    'package/dist/index.js': 'export const fixture = 1;\n',
    'package/dist/index.d.ts': 'export declare const fixture: number;\n',
  });
  const internal = collectInternalDependencies(manifest);
  const contract = {
    schema_version: 1,
    package_name: manifest.name,
    release_version: manifest.version,
    source_commit: sourceCommit,
    release_channel: 'fixture-stable',
    release_channel_type: 'STABLE',
    execution_mode: 'SYNTHETIC',
    distribution_change: true,
    approved_internal_prereleases: [],
    changelog_required: false,
    compatibility_required: false,
    ...(overrides.contract ?? {}),
  };
  const contractSource = `${JSON.stringify(contract, null, 2)}\n`;
  const packageManifestHash = asSha256Identity(manifestSource);
  const testEvidence = {
    schema_version: 1,
    gate_instance: 'SHELL-CI-001::GLOBAL',
    package: manifest.name,
    candidate_version: manifest.version,
    source_commit: sourceCommit,
    manifest_identity: packageManifestHash,
    internal_dependency_set: internal,
    outcome: 'PASS',
    invalidation_reason: null,
    result_fingerprint: hash('test-evidence'),
    ...(overrides.testEvidence ?? {}),
  };
  const buildEvidence = {
    schema_version: 1,
    gate_instance: 'SHELL-CI-002::GLOBAL',
    package_name: manifest.name,
    package_candidate_version: manifest.version,
    source_commit: sourceCommit,
    package_manifest_hash: packageManifestHash,
    lockfile_hash: hash('lockfile'),
    resolved_internal_dependency_set: internal,
    artifact_file_manifest: [
      { path: 'dist/index.js', sha256: hash('js') },
      { path: 'dist/index.d.ts', sha256: hash('dts') },
    ],
    artifact_content_hash: hash('built-output'),
    pack_integrity: sriSha512(tarballBuffer),
    build_status: 'PASS',
    invalidation_reason: null,
    ...(overrides.buildEvidence ?? {}),
  };
  const observedState = normalizeSyntheticState(overrides.observedState ?? {});
  return {
    manifest,
    manifestSource,
    contract,
    contractSource,
    testEvidence,
    buildEvidence,
    tarballBuffer,
    repositoryCommit: overrides.repositoryCommit ?? sourceCommit,
    observedState,
    duplicateImplementations: overrides.duplicateImplementations ?? [],
    packageDirty: overrides.packageDirty ?? false,
  };
}

function evaluate(overrides = {}) {
  return evaluateReleaseCandidate(baseScenario(overrides));
}

function exactPublishedState(scenario) {
  const initial = evaluateReleaseCandidate(scenario);
  assert.ok(initial.candidate);
  const candidate = initial.candidate;
  const record = {
    package_name: candidate.package_name,
    release_version: candidate.release_version,
    source_commit: candidate.source_commit,
    tag_name: candidate.tag_name,
    artifact_sha256: candidate.tarball_sha256,
    pack_integrity: candidate.pack_integrity,
    release_channel: candidate.release_channel,
  };
  return {
    schema_version: 1,
    tags: { [candidate.tag_name]: { ...record, annotated: true } },
    releases: { [candidate.tag_name]: { ...record, immutable: true } },
    registry: { [`${candidate.package_name}@${candidate.release_version}`]: { ...record, immutable: true } },
    channels: { [candidate.package_name]: { [candidate.release_channel]: candidate.release_version } },
  };
}

function createIntegrationFixture() {
  const root = fs.mkdtempSync(path.join(os.tmpdir(), 'vento-ci003-'));
  exec('git', ['init'], { cwd: root });
  exec('git', ['config', 'user.email', 'ci003@example.invalid'], { cwd: root });
  exec('git', ['config', 'user.name', 'CI003 Fixture'], { cwd: root });
  const packageRoot = path.join(root, 'packages', 'contracts');
  fs.mkdirSync(packageRoot, { recursive: true });
  const manifest = baseManifest('@vento/contracts', '1.2.3');
  const manifestPath = path.join(packageRoot, 'package.json');
  fs.writeFileSync(manifestPath, `${JSON.stringify(manifest, null, 2)}\n`, 'utf8');
  exec('git', ['add', '.'], { cwd: root });
  exec('git', ['commit', '-m', 'fixture'], { cwd: root });
  const sourceCommit = exec('git', ['rev-parse', 'HEAD'], { cwd: root });
  const manifestSource = fs.readFileSync(manifestPath, 'utf8');
  const tarball = makeTarball({
    'package/package.json': JSON.stringify(manifest),
    'package/dist/index.js': 'export const fixture = 1;\n',
    'package/dist/index.d.ts': 'export declare const fixture: number;\n',
  });
  const contract = {
    schema_version: 1,
    package_name: manifest.name,
    release_version: manifest.version,
    source_commit: sourceCommit,
    release_channel: 'fixture-stable',
    release_channel_type: 'STABLE',
    execution_mode: 'SYNTHETIC',
    distribution_change: true,
    approved_internal_prereleases: [],
    changelog_required: false,
    compatibility_required: false,
  };
  const testEvidence = {
    schema_version: 1,
    gate_instance: 'SHELL-CI-001::GLOBAL',
    package: manifest.name,
    candidate_version: manifest.version,
    source_commit: sourceCommit,
    manifest_identity: asSha256Identity(manifestSource),
    internal_dependency_set: [],
    outcome: 'PASS',
    invalidation_reason: null,
  };
  const buildEvidence = {
    schema_version: 1,
    gate_instance: 'SHELL-CI-002::GLOBAL',
    package_name: manifest.name,
    package_candidate_version: manifest.version,
    source_commit: sourceCommit,
    package_manifest_hash: asSha256Identity(manifestSource),
    lockfile_hash: hash('lockfile'),
    resolved_internal_dependency_set: [],
    artifact_file_manifest: [{ path: 'dist/index.js', sha256: hash('js') }],
    artifact_content_hash: hash('built-output'),
    pack_integrity: sriSha512(tarball),
    build_status: 'PASS',
    invalidation_reason: null,
  };
  const contractPath = path.join(root, 'release-contract.json');
  const testEvidencePath = path.join(root, 'test-evidence.json');
  const buildEvidencePath = path.join(root, 'build-evidence.json');
  const tarballPath = path.join(root, 'candidate.tgz');
  const statePath = path.join(root, '.delivery', 'synthetic-release-state.json');
  const evidenceRoot = path.join(root, '.delivery', 'shared-package-releases');
  fs.writeFileSync(contractPath, `${JSON.stringify(contract, null, 2)}\n`, 'utf8');
  fs.writeFileSync(testEvidencePath, `${JSON.stringify(testEvidence, null, 2)}\n`, 'utf8');
  fs.writeFileSync(buildEvidencePath, `${JSON.stringify(buildEvidence, null, 2)}\n`, 'utf8');
  fs.writeFileSync(tarballPath, tarball);
  return { root, packageRoot, contractPath, testEvidencePath, buildEvidencePath, tarballPath, statePath, evidenceRoot };
}

// 8 positive cases.
test('positive 01 - complete synthetic candidate publishes once with attributable PASS evidence', () => {
  const fixture = createIntegrationFixture();
  try {
    const result = runGate({
      packageRoot: fixture.packageRoot,
      contractPath: fixture.contractPath,
      testEvidencePath: fixture.testEvidencePath,
      buildEvidencePath: fixture.buildEvidencePath,
      tarballPath: fixture.tarballPath,
      evidenceRoot: fixture.evidenceRoot,
      syntheticStatePath: fixture.statePath,
    });
    assert.equal(result.evidence.release_status, 'PASS');
    assert.ok(fs.existsSync(result.evidencePath));
    assert.ok(fs.existsSync(fixture.statePath));
  } finally {
    fs.rmSync(fixture.root, { recursive: true, force: true });
  }
});

test('positive 02 - exact repeated synthetic release is idempotent and does not overwrite identities', () => {
  const fixture = createIntegrationFixture();
  try {
    const first = runGate({
      packageRoot: fixture.packageRoot,
      contractPath: fixture.contractPath,
      testEvidencePath: fixture.testEvidencePath,
      buildEvidencePath: fixture.buildEvidencePath,
      tarballPath: fixture.tarballPath,
      evidenceRoot: fixture.evidenceRoot,
      syntheticStatePath: fixture.statePath,
    });
    const stateBefore = fs.readFileSync(fixture.statePath, 'utf8');
    const second = runGate({
      packageRoot: fixture.packageRoot,
      contractPath: fixture.contractPath,
      testEvidencePath: fixture.testEvidencePath,
      buildEvidencePath: fixture.buildEvidencePath,
      tarballPath: fixture.tarballPath,
      evidenceRoot: fixture.evidenceRoot,
      syntheticStatePath: fixture.statePath,
    });
    assert.equal(first.evidence.release_status, 'PASS');
    assert.equal(second.evidence.release_status, 'PASS');
    assert.deepEqual(second.evidence.phases, ['IDEMPOTENT_NO_MUTATION']);
    assert.equal(fs.readFileSync(fixture.statePath, 'utf8'), stateBefore);
  } finally {
    fs.rmSync(fixture.root, { recursive: true, force: true });
  }
});

test('positive 03 - two canonical packages with independent versions serialize to distinct tags', () => {
  const left = tagForPackageVersion('@vento/contracts', '1.2.3');
  const right = tagForPackageVersion('@vento/ui-web', '1.2.3');
  assert.notEqual(left, right);
  assert.match(left, /^vento-pkg\/vento__contracts\/v1\.2\.3$/u);
});

test('positive 04 - coordinated cut excludes packages without distributable changes', () => {
  const plan = planCoordinatedRelease([
    { package_name: '@vento/contracts', release_version: '1.1.0', distribution_change: true, internal_dependencies: [] },
    { package_name: '@vento/ui-web', release_version: '2.0.0', distribution_change: true, internal_dependencies: [] },
    { package_name: '@vento/os-context', release_version: '1.0.0', distribution_change: false, internal_dependencies: [] },
  ]);
  assert.equal(plan.outcome, 'PASS');
  assert.deepEqual(plan.order, ['@vento/contracts', '@vento/ui-web']);
});

test('positive 05 - coordinated cut orders exact internal dependency before dependent', () => {
  const plan = planCoordinatedRelease([
    { package_name: '@vento/contracts', release_version: '2.0.0', distribution_change: true, internal_dependencies: [] },
    { package_name: '@vento/ui-web', release_version: '3.0.0', distribution_change: true, internal_dependencies: [{ name: '@vento/contracts', range: '2.0.0' }] },
  ]);
  assert.equal(plan.outcome, 'PASS');
  assert.deepEqual(plan.order, ['@vento/contracts', '@vento/ui-web']);
});

test('positive 06 - prerelease is eligible when channel semantics are explicitly PRERELEASE', () => {
  const manifest = baseManifest('@vento/contracts', '2.0.0-rc.1');
  const result = evaluate({
    manifest,
    contract: { release_channel: 'fixture-preview', release_channel_type: 'PRERELEASE' },
  });
  assert.equal(result.outcome, 'READY');
});

test('positive 07 - stable release with only stable exact internal dependencies remains eligible', () => {
  const manifest = baseManifest('@vento/ui-web', '3.0.0', { '@vento/contracts': '2.0.0' });
  const scenario = baseScenario({ manifest });
  scenario.observedState.registry['@vento/contracts@2.0.0'] = {
    package_name: '@vento/contracts',
    release_version: '2.0.0',
  };
  const result = evaluateReleaseCandidate(scenario);
  assert.equal(result.outcome, 'READY');
});

test('positive 08 - exact post-read state proves package version commit tarball and integrity identity', () => {
  const scenario = baseScenario();
  scenario.observedState = normalizeSyntheticState(exactPublishedState(scenario));
  const result = evaluateReleaseCandidate(scenario);
  assert.equal(result.outcome, 'PASS');
  assert.equal(result.idempotent, true);
});

// 20 negative cases.
test('negative 01 - unknown package family is blocked', () => {
  const manifest = baseManifest('@vento/unknown', '1.0.0');
  const errors = validateReleaseContract({ ...baseScenario().contract, package_name: manifest.name, release_version: manifest.version }, { manifest });
  assert.ok(errors.includes('PACKAGE_NOT_CANONICAL'));
});

test('negative 02 - missing or invalid SemVer is blocked', () => {
  assert.equal(parseSemver('1.2'), null);
  assert.ok(validateReleaseContract({ ...baseScenario().contract, release_version: 'latest' }, { manifest: baseManifest('@vento/contracts', 'latest') }).includes('RELEASE_VERSION_INVALID'));
});

test('negative 03 - release version different from certified manifest is blocked', () => {
  const scenario = baseScenario({ contract: { release_version: '1.2.4' } });
  const result = evaluateReleaseCandidate(scenario);
  assert.ok(result.reasons.includes('MANIFEST_VERSION_MISMATCH'));
});

test('negative 04 - CI001 evidence that is non-PASS, stale or incompatible is blocked', () => {
  const result = evaluate({ testEvidence: { outcome: 'FAIL', invalidation_reason: 'STALE_INPUT' } });
  assert.ok(result.reasons.includes('TEST_EVIDENCE_NOT_PASS'));
  assert.ok(result.reasons.includes('TEST_EVIDENCE_STALE'));
});

test('negative 05 - CI002 evidence that is non-PASS, stale or incompatible is blocked', () => {
  const result = evaluate({ buildEvidence: { build_status: 'FAIL', invalidation_reason: 'STALE_INPUT' } });
  assert.ok(result.reasons.includes('BUILD_EVIDENCE_NOT_PASS'));
  assert.ok(result.reasons.includes('BUILD_EVIDENCE_STALE'));
});

test('negative 06 - tarball whose integrity differs from CI002 is blocked', () => {
  const result = evaluate({ buildEvidence: { pack_integrity: sriSha512(Buffer.from('different')) } });
  assert.ok(result.reasons.includes('TARBALL_INTEGRITY_MISMATCH'));
});

test('negative 07 - existing tag pointing to another commit is blocked', () => {
  const scenario = baseScenario();
  const state = exactPublishedState(scenario);
  const tag = tagForPackageVersion('@vento/contracts', '1.2.3');
  state.tags[tag].source_commit = '2'.repeat(40);
  scenario.observedState = normalizeSyntheticState(state);
  const result = evaluateReleaseCandidate(scenario);
  assert.ok(result.reasons.includes('TAG_IDENTITY_CONFLICT'));
});

test('negative 08 - existing tag attributed to another package identity is blocked', () => {
  const scenario = baseScenario();
  const state = exactPublishedState(scenario);
  const tag = tagForPackageVersion('@vento/contracts', '1.2.3');
  state.tags[tag].package_name = '@vento/ui-web';
  scenario.observedState = normalizeSyntheticState(state);
  const result = evaluateReleaseCandidate(scenario);
  assert.ok(result.reasons.includes('TAG_IDENTITY_CONFLICT'));
});

test('negative 09 - remote release associated with conflicting identity is blocked', () => {
  const scenario = baseScenario();
  const state = exactPublishedState(scenario);
  const tag = tagForPackageVersion('@vento/contracts', '1.2.3');
  state.releases[tag].release_version = '1.2.2';
  scenario.observedState = normalizeSyntheticState(state);
  const result = evaluateReleaseCandidate(scenario);
  assert.ok(result.reasons.includes('REMOTE_RELEASE_IDENTITY_CONFLICT'));
});

test('negative 10 - registry version with different bytes is blocked', () => {
  const scenario = baseScenario();
  const state = exactPublishedState(scenario);
  state.registry['@vento/contracts@1.2.3'].artifact_sha256 = hash('other-bytes');
  scenario.observedState = normalizeSyntheticState(state);
  const result = evaluateReleaseCandidate(scenario);
  assert.ok(result.reasons.includes('REGISTRY_VERSION_IDENTITY_CONFLICT'));
});

test('negative 11 - published version cannot be overwritten with different integrity', () => {
  const scenario = baseScenario();
  const state = exactPublishedState(scenario);
  state.registry['@vento/contracts@1.2.3'].pack_integrity = sriSha512(Buffer.from('other'));
  scenario.observedState = normalizeSyntheticState(state);
  const result = evaluateReleaseCandidate(scenario);
  assert.ok(result.reasons.includes('REGISTRY_VERSION_IDENTITY_CONFLICT'));
});

test('negative 12 - reconstructed artifact with changed bytes cannot reuse certified build evidence', () => {
  const changed = makeTarball({ 'package/index.js': 'different distributed bytes\n' });
  const scenario = baseScenario({ tarballBuffer: changed, buildEvidence: { pack_integrity: sriSha512(Buffer.from('certified-other')) } });
  const result = evaluateReleaseCandidate(scenario);
  assert.ok(result.reasons.includes('TARBALL_INTEGRITY_MISMATCH'));
});

test('negative 13 - stable package depending on unauthorized internal prerelease is blocked', () => {
  const manifest = baseManifest('@vento/ui-web', '3.0.0', { '@vento/contracts': '2.0.0-rc.1' });
  const result = evaluate({ manifest });
  assert.ok(result.reasons.some((reason) => reason.startsWith('UNAUTHORIZED_INTERNAL_PRERELEASE:')));
});

test('negative 14 - exact internal dependency not present in release registry is blocked', () => {
  const manifest = baseManifest('@vento/ui-web', '3.0.0', { '@vento/contracts': '2.0.0' });
  const result = evaluate({ manifest });
  assert.ok(result.reasons.includes('INTERNAL_DEPENDENCY_NOT_PUBLISHED:@vento/contracts@2.0.0'));
});

test('negative 15 - cyclic coordinated internal dependency order is blocked', () => {
  const plan = planCoordinatedRelease([
    { package_name: '@vento/contracts', release_version: '2.0.0', distribution_change: true, internal_dependencies: [{ name: '@vento/ui-web', range: '3.0.0' }] },
    { package_name: '@vento/ui-web', release_version: '3.0.0', distribution_change: true, internal_dependencies: [{ name: '@vento/contracts', range: '2.0.0' }] },
  ]);
  assert.equal(plan.outcome, 'BLOCKED');
  assert.ok(plan.reasons.includes('INTERNAL_DEPENDENCY_CYCLE'));
});

test('negative 16 - channel semantics contradictory with SemVer are blocked', () => {
  const manifest = baseManifest('@vento/contracts', '2.0.0-rc.1');
  const result = evaluate({ manifest, contract: { release_channel_type: 'STABLE' } });
  assert.ok(result.reasons.includes('PRERELEASE_CHANNEL_MISMATCH'));
});

test('negative 17 - package without distributable change cannot be newly published by a cut', () => {
  const result = evaluate({ contract: { distribution_change: false } });
  assert.ok(result.reasons.includes('DISTRIBUTION_CHANGE_REQUIRED'));
});

test('negative 18 - REAL contract without explicit remote destinations is invalid before credentials can be used', () => {
  const scenario = baseScenario({ contract: { execution_mode: 'REAL' } });
  const errors = validateReleaseContract(scenario.contract, { manifest: scenario.manifest });
  assert.ok(errors.includes('GITHUB_REPOSITORY_REQUIRED'));
  assert.ok(errors.includes('REGISTRY_URL_REQUIRED'));
});

test('negative 19 - secret-like content inside distributed tarball is blocked', () => {
  const tarballBuffer = makeTarball({ 'package/config.txt': 'token=fixture-only-placeholder\n' });
  const scenario = baseScenario({ tarballBuffer });
  scenario.buildEvidence.pack_integrity = sriSha512(tarballBuffer);
  const result = evaluateReleaseCandidate(scenario);
  assert.ok(result.reasons.some((reason) => reason.startsWith('SECRET_DETECTED_IN_ARTIFACT:')));
});

test('negative 20 - ambiguous remote record cannot be normalized to PASS', () => {
  const scenario = baseScenario();
  const result0 = evaluateReleaseCandidate(scenario);
  const candidate = result0.candidate;
  const state = normalizeSyntheticState({
    tags: { [candidate.tag_name]: { ambiguous: true } },
    releases: {},
    registry: {},
  });
  const observed = inspectObservedState(candidate, state);
  assert.ok(observed.conflicts.includes('TAG_IDENTITY_CONFLICT'));
});

// 16 regression cases.
test('regression 01 - moved tag after prior release remains a conflict', () => {
  const scenario = baseScenario();
  const state = exactPublishedState(scenario);
  const tag = tagForPackageVersion('@vento/contracts', '1.2.3');
  state.tags[tag].source_commit = 'f'.repeat(40);
  scenario.observedState = normalizeSyntheticState(state);
  assert.equal(evaluateReleaseCandidate(scenario).outcome, 'BLOCKED');
});

test('regression 02 - release reassociated to another tag cannot pass', () => {
  const scenario = baseScenario();
  const state = exactPublishedState(scenario);
  const tag = tagForPackageVersion('@vento/contracts', '1.2.3');
  state.releases[tag].tag_name = 'vento-pkg/vento__contracts/v9.9.9';
  scenario.observedState = normalizeSyntheticState(state);
  assert.ok(evaluateReleaseCandidate(scenario).reasons.includes('REMOTE_RELEASE_IDENTITY_CONFLICT'));
});

test('regression 03 - same SemVer resolving different bytes never becomes idempotent', () => {
  const scenario = baseScenario();
  const state = exactPublishedState(scenario);
  state.registry['@vento/contracts@1.2.3'].artifact_sha256 = hash('changed');
  scenario.observedState = normalizeSyntheticState(state);
  const result = evaluateReleaseCandidate(scenario);
  assert.notEqual(result.outcome, 'PASS');
});

test('regression 04 - substituted tarball cannot be hidden by previous metadata', () => {
  const original = baseScenario();
  const changedTarball = makeTarball({ 'package/dist/index.js': 'changed\n' });
  const changed = baseScenario({ tarballBuffer: changedTarball });
  changed.buildEvidence.pack_integrity = original.buildEvidence.pack_integrity;
  const result = evaluateReleaseCandidate(changed);
  assert.ok(result.reasons.includes('TARBALL_INTEGRITY_MISMATCH'));
});

test('regression 05 - integrity for another artifact cannot certify current tarball', () => {
  const scenario = baseScenario({ buildEvidence: { pack_integrity: sriSha512(makeTarball({ 'package/x': 'other' })) } });
  assert.ok(evaluateReleaseCandidate(scenario).reasons.includes('TARBALL_INTEGRITY_MISMATCH'));
});

test('regression 06 - evidence from another version cannot be reused by matching commit', () => {
  const result = evaluate({ testEvidence: { candidate_version: '1.2.2' }, buildEvidence: { package_candidate_version: '1.2.2' } });
  assert.ok(result.reasons.includes('TEST_EVIDENCE_VERSION_MISMATCH'));
  assert.ok(result.reasons.includes('BUILD_EVIDENCE_VERSION_MISMATCH'));
});

test('regression 07 - evidence from another commit cannot be reused by matching version', () => {
  const result = evaluate({ testEvidence: { source_commit: '2'.repeat(40) }, buildEvidence: { source_commit: '2'.repeat(40) } });
  assert.ok(result.reasons.includes('TEST_EVIDENCE_COMMIT_MISMATCH'));
  assert.ok(result.reasons.includes('BUILD_EVIDENCE_COMMIT_MISMATCH'));
});

test('regression 08 - lockstep does not pull unchanged package into coordinated cut', () => {
  const plan = planCoordinatedRelease([
    { package_name: '@vento/contracts', release_version: '2.0.0', distribution_change: true, internal_dependencies: [] },
    { package_name: '@vento/os-context', release_version: '2.0.0', distribution_change: false, internal_dependencies: [] },
  ]);
  assert.deepEqual(plan.order, ['@vento/contracts']);
});

test('regression 09 - dependent package cannot be ordered before changed internal dependency', () => {
  const plan = planCoordinatedRelease([
    { package_name: '@vento/ui-web', release_version: '3.0.0', distribution_change: true, internal_dependencies: [{ name: '@vento/contracts', range: '2.0.0' }] },
    { package_name: '@vento/contracts', release_version: '2.0.0', distribution_change: true, internal_dependencies: [] },
  ]);
  assert.deepEqual(plan.order, ['@vento/contracts', '@vento/ui-web']);
});

test('regression 10 - prerelease cannot be presented with stable channel semantics', () => {
  const manifest = baseManifest('@vento/contracts', '1.2.3-beta.1');
  const result = evaluate({ manifest, contract: { release_channel_type: 'STABLE' } });
  assert.equal(result.outcome, 'BLOCKED');
});

test('regression 11 - idempotent retry preserves exactly one tag release and registry identity', () => {
  const scenario = baseScenario();
  const state = exactPublishedState(scenario);
  const result = evaluateReleaseCandidate({ ...scenario, observedState: normalizeSyntheticState(state) });
  assert.equal(result.outcome, 'PASS');
  assert.equal(Object.keys(state.tags).length, 1);
  assert.equal(Object.keys(state.releases).length, 1);
  assert.equal(Object.keys(state.registry).length, 1);
});

test('regression 12 - partial publication with conflicting existing registry stays blocked', () => {
  const scenario = baseScenario();
  const state = exactPublishedState(scenario);
  const tag = tagForPackageVersion('@vento/contracts', '1.2.3');
  delete state.releases[tag];
  state.registry['@vento/contracts@1.2.3'].source_commit = '0'.repeat(40);
  scenario.observedState = normalizeSyntheticState(state);
  assert.equal(evaluateReleaseCandidate(scenario).outcome, 'BLOCKED');
});

test('regression 13 - malformed remote success record remains conflict instead of PASS', () => {
  const scenario = baseScenario();
  const first = evaluateReleaseCandidate(scenario);
  const state = normalizeSyntheticState({
    tags: { [first.candidate.tag_name]: { ambiguous: true } },
    releases: { [first.candidate.tag_name]: { ambiguous: true } },
    registry: { '@vento/contracts@1.2.3': { ambiguous: true } },
  });
  assert.equal(evaluateReleaseCandidate({ ...scenario, observedState: state }).outcome, 'BLOCKED');
});

test('regression 14 - contract secret field is not copied into release evidence', () => {
  const fixture = createIntegrationFixture();
  try {
    const contract = JSON.parse(fs.readFileSync(fixture.contractPath, 'utf8'));
    contract.api_token = 'fixture-only-placeholder';
    fs.writeFileSync(fixture.contractPath, `${JSON.stringify(contract, null, 2)}\n`, 'utf8');
    const result = runGate({
      packageRoot: fixture.packageRoot,
      contractPath: fixture.contractPath,
      testEvidencePath: fixture.testEvidencePath,
      buildEvidencePath: fixture.buildEvidencePath,
      tarballPath: fixture.tarballPath,
      evidenceRoot: fixture.evidenceRoot,
      syntheticStatePath: fixture.statePath,
    });
    const evidenceSource = fs.readFileSync(result.evidencePath, 'utf8');
    assert.doesNotMatch(evidenceSource, /fixture-only-placeholder/u);
  } finally {
    fs.rmSync(fixture.root, { recursive: true, force: true });
  }
});

test('regression 15 - second package-local implementation of release gate blocks the candidate', () => {
  const result = evaluate({ duplicateImplementations: ['packages/contracts/shared-package-release-gate.mjs'] });
  assert.ok(result.reasons.some((reason) => reason.startsWith('DUPLICATE_GATE_IMPLEMENTATION:')));
});

test('regression 16 - historical tag namespace cannot silently collide across canonical package families', () => {
  const tags = [
    tagForPackageVersion('@vento/contracts', '1.0.0'),
    tagForPackageVersion('@vento/os-context', '1.0.0'),
    tagForPackageVersion('@vento/supabase', '1.0.0'),
    tagForPackageVersion('@vento/ui-web', '1.0.0'),
  ];
  assert.equal(new Set(tags).size, 4);
  assert.equal(packageSlug('@vento/supabase'), 'vento__supabase');
});

// 2 deterministic/helper checks.
test('helper 01 - stable stringify is independent from object key insertion order', () => {
  assert.equal(stableStringify({ b: 2, a: 1 }), stableStringify({ a: 1, b: 2 }));
});

test('helper 02 - secret detector ignores ordinary package text and coordinated empty cut is valid', () => {
  const clean = makeTarball({ 'package/index.js': 'export const value = "safe";\n' });
  assert.deepEqual(detectSecretsInTarball(clean), []);
  assert.deepEqual(planCoordinatedRelease([{ package_name: '@vento/contracts', release_version: '1.0.0', distribution_change: false, internal_dependencies: [] }]), {
    outcome: 'PASS',
    reasons: [],
    order: [],
  });
});

test('private GitHub Release contains verifiable metadata but no public npm tarball asset', () => {
  const scenario = baseScenario({
    manifest: baseManifest('@vento/contracts', '1.0.0-alpha.1'),
    contract: { release_channel: 'next', release_channel_type: 'PRERELEASE' },
  });
  const candidate = evaluateReleaseCandidate(scenario).candidate;
  const contract = {
    github_repository: 'vento-group-sas/vento-shell',
    registry_url: 'https://gitlab.com/api/v4/projects/87892751/packages/npm/',
  };
  const args = privateReleaseCreateArgs(candidate, contract);
  const notes = privateReleaseNotes(candidate);
  assert.deepEqual(args.slice(0, 3), ['release', 'create', candidate.tag_name]);
  assert(args.includes('--prerelease'));
  assert(args.includes('--verify-tag'));
  assert(!args.some((arg) => /\.tgz$|\.json$/u.test(arg)));
  assert.equal(args[args.indexOf('--notes') + 1], notes);
  assert.match(notes, /^VENTO-PRIVATE-NPM-RELEASE-V1\n/u);
  assert.match(notes, /artifact=PRIVATE_GITLAB_NPM_ONLY$/u);
  assert(notes.includes(candidate.tarball_sha256));
  assert(notes.includes(candidate.pack_integrity));
  assert(!notes.includes('token='));
});

test('real publication cannot target a public npm registry or unrelated GitHub repository', () => {
  const scenario = baseScenario({
    contract: {
      execution_mode: 'REAL',
      github_repository: 'vento-group-sas/vento-shell',
      registry_url: 'https://registry.npmjs.org/',
    },
  });
  const errors = validateReleaseContract(scenario.contract, { manifest: scenario.manifest });
  assert(errors.includes('REGISTRY_NOT_PRIVATE_GITLAB'));
  assert.throws(() => privateReleaseCreateArgs(
    evaluateReleaseCandidate(scenario).candidate, scenario.contract,
  ), /PRIVATE_RELEASE_DESTINATION_INVALID/u);
  const unrelated = {
    ...scenario.contract,
    registry_url: 'https://gitlab.com/api/v4/projects/87892751/packages/npm/',
    github_repository: 'somewhere-else/not-vento',
  };
  assert(validateReleaseContract(unrelated, { manifest: scenario.manifest })
    .includes('GITHUB_REPOSITORY_NOT_CANONICAL'));
});

test('public release metadata requires strict source commit and integrity', () => {
  const scenario = baseScenario();
  const candidate = evaluateReleaseCandidate(scenario).candidate;
  assert.throws(() => privateReleaseNotes({
    ...candidate, tarball_sha256: 'sha256:invalid',
  }), /PRIVATE_RELEASE_METADATA_INVALID/u);
  assert.throws(() => privateReleaseNotes({
    ...candidate, pack_integrity: 'sha512-INVALID@',
  }), /PRIVATE_RELEASE_METADATA_INVALID/u);
  assert.throws(() => privateReleaseNotes({
    ...candidate, source_commit: 'bad',
  }), /PRIVATE_RELEASE_METADATA_INVALID/u);
});

test('stable metadata-only release is not marked prerelease', () => {
  const scenario = baseScenario();
  const candidate = evaluateReleaseCandidate(scenario).candidate;
  const args = privateReleaseCreateArgs(candidate, {
    github_repository: 'vento-group-sas/vento-shell',
    registry_url: 'https://gitlab.com/api/v4/projects/87892751/packages/npm/',
  });
  assert(!args.includes('--prerelease'));
  assert(args.includes('--verify-tag'));
});


function privateSourcePilotScenario() {
  const manifest = {
    ...baseManifest('@vento/contracts', '1.0.0-alpha.1'),
    private: true,
    files: ['dist/'],
  };
  const { preview } = releasePreviewManifest(manifest);
  const js = 'export const fixture = 1;\n';
  const declarations = 'export declare const fixture: number;\n';
  const tarballBuffer = makeTarball({
    'package/package.json': JSON.stringify(preview),
    'package/dist/index.js': js,
    'package/dist/index.d.ts': declarations,
  });
  return baseScenario({
    manifest,
    tarballBuffer,
    contract: {
      release_preview_mode: 'EPHEMERAL_PRIVATE_SOURCE',
      release_channel: 'next',
      release_channel_type: 'PRERELEASE',
    },
    buildEvidence: {
      // CI002 certified the private pack; private:false preview cannot match
      // those full tarball bytes. The dist bytes must still match exactly.
      pack_integrity: sriSha512(Buffer.from('private-source-build')),
      artifact_file_manifest: [
        { path: 'index.js', sha256: hash(js) },
        { path: 'index.d.ts', sha256: hash(declarations) },
      ],
    },
  });
}

test('private authoring manifest can release only an exact CI002-certified dist preview', () => {
  const scenario = privateSourcePilotScenario();
  const result = evaluateReleaseCandidate(scenario);
  assert.equal(result.outcome, 'READY', result.reasons.join(','));
  assert.notEqual(scenario.buildEvidence.pack_integrity, sriSha512(scenario.tarballBuffer));
  assert.deepEqual(assessPrivateReleasePreview({
    sourceManifest: scenario.manifest,
    tarballBuffer: scenario.tarballBuffer,
    buildEvidence: scenario.buildEvidence,
  }), []);
});

test('private package cannot use source tarball or bypass declared preview mode', () => {
  const scenario = privateSourcePilotScenario();
  scenario.contract.release_preview_mode = undefined;
  const result = evaluateReleaseCandidate(scenario);
  assert.equal(result.outcome, 'BLOCKED');
  assert(result.reasons.includes('PRIVATE_SOURCE_PREVIEW_REQUIRED'));
  scenario.contract.release_preview_mode = 'unapproved';
  const invalid = evaluateReleaseCandidate(scenario);
  assert(invalid.reasons.includes('RELEASE_PREVIEW_MODE_INVALID'));
});

test('private preview rejects a tampered dist file even with a valid npm tar manifest', () => {
  const scenario = privateSourcePilotScenario();
  const { preview } = releasePreviewManifest(scenario.manifest);
  scenario.tarballBuffer = makeTarball({
    'package/package.json': JSON.stringify(preview),
    'package/dist/index.js': 'export const fixture = "tampered";\n',
    'package/dist/index.d.ts': 'export declare const fixture: number;\n',
  });
  const result = evaluateReleaseCandidate(scenario);
  assert.equal(result.outcome, 'BLOCKED');
  assert(result.reasons.some((reason) => reason.startsWith('PRIVATE_PREVIEW_DIST_BYTES_DIVERGENCE:')));
});

test('private preview rejects extra dist files and undeclared manifest permissions', () => {
  const scenario = privateSourcePilotScenario();
  const { preview } = releasePreviewManifest(scenario.manifest);
  scenario.tarballBuffer = makeTarball({
    'package/package.json': JSON.stringify({
      ...preview,
      scripts: { prepublishOnly: 'node unsafe.mjs' },
    }),
    'package/dist/index.js': 'export const fixture = 1;\n',
    'package/dist/index.d.ts': 'export declare const fixture: number;\n',
    'package/dist/hidden.js': 'export const hidden = true;\n',
  });
  const result = evaluateReleaseCandidate(scenario);
  assert.equal(result.outcome, 'BLOCKED');
  assert(result.reasons.includes('PRIVATE_PREVIEW_MANIFEST_DIVERGENCE'));
  assert(result.reasons.includes('PRIVATE_PREVIEW_DIST_FILESET_DIVERGENCE'));
});

test('preview policy rejects unpinned internal package version before release', () => {
  const scenario = privateSourcePilotScenario();
  const malformed = { ...scenario.manifest, dependencies: { '@vento/os-context': '^0.1.0' } };
  assert.throws(() => releasePreviewManifest(malformed), /INTERNAL_VERSION_NOT_EXACT/u);
  const evaluation = assessPrivateReleasePreview({
    sourceManifest: malformed, tarballBuffer: scenario.tarballBuffer,
    buildEvidence: scenario.buildEvidence,
  });
  assert(evaluation.includes('PRIVATE_PREVIEW_SOURCE_INVALID'));
});


test('release preview rejects symlink entries even when regular dist hashes appear valid', () => {
  const scenario = privateSourcePilotScenario();
  const archive = zlib.gunzipSync(scenario.tarballBuffer);
  const name = Buffer.from('package/dist/index.js');
  const headerOffset = archive.indexOf(name);
  assert(headerOffset >= 0 && headerOffset % 512 === 0);
  archive[headerOffset + 156] = '2'.charCodeAt(0);
  archive.fill(0x20, headerOffset + 148, headerOffset + 156);
  const header = archive.subarray(headerOffset, headerOffset + 512);
  let checksum = 0;
  for (const byte of header) checksum += byte;
  header.write(checksum.toString(8).padStart(6, '0') + '\0 ', 148, 'ascii');
  scenario.tarballBuffer = zlib.gzipSync(archive, { mtime: 0 });
  const errors = assessPrivateReleasePreview({
    sourceManifest: scenario.manifest,
    tarballBuffer: scenario.tarballBuffer,
    buildEvidence: scenario.buildEvidence,
  });
  assert(errors.includes('PRIVATE_PREVIEW_ARCHIVE_INVALID'));
});
