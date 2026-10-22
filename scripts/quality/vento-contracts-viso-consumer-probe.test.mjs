import assert from 'node:assert/strict';
import test from 'node:test';

import {
  buildRealCi005PilotInput, classifyCompilerErrors,
  assertContractSemanticBehavior, compareFrozenDependencyTrees,
  evaluateProbe, runtimeProgram,
} from './vento-contracts-viso-consumer-probe.mjs';

import { asSha256Identity } from './shared-package-release-gate.mjs';
import { prepareCompatibilityEvidence } from './shared-package-compatibility-gate.mjs';

const STEPS = ['npm-ci', 'npm-install-tarball', 'runtime-first', 'runtime-repeat',
  'viso-baseline', 'viso-typecheck', 'viso-next-build'];
const PASS = STEPS.map(name => ({ name, status: 'PASS' }));

test('consumer test suite requires every real installation, repeat runtime, types and Next step', () => {
  assert.equal(evaluateProbe(PASS, 'sha256:a', 'sha256:a',
    'sha256:b', 'sha256:b').status, 'PASS');
  for (let i = 0; i < PASS.length; i += 1) {
    const failed = structuredClone(PASS);
    failed[i].status = 'FAIL';
    assert.equal(evaluateProbe(failed, 'sha256:a', 'sha256:a',
      'sha256:b', 'sha256:b').status, 'BLOCKED');
  }
  assert.equal(evaluateProbe(PASS.slice(0, -1), 'a', 'a', 'b', 'b').status,
    'BLOCKED');
});

test('temporary consumer app modifications must never count as a production-safe result', () => {
  assert.equal(evaluateProbe(PASS, 'a', 'wrong', 'b', 'b').status, 'BLOCKED');
  assert.equal(evaluateProbe(PASS, 'a', 'a', 'b', 'wrong').status, 'BLOCKED');
  const observed = evaluateProbe(PASS, 'a', 'a', 'b', 'b');
  assert.equal(observed.publication_executed, false);
  assert.equal(observed.release_eligibility, 'PENDING_CI005_RELATION_ATTESTATION');
});

test('runtime probe verifies all fourteen ESM entrypoints and the empty type-only module', () => {
  const surface = Array.from({ length: 14 }, (_, i) => ({
    subpath: './entry-' + i, expected_exports: ['value' + i],
  }));
  surface.push({ subpath: './authorization/response-contracts/v1',
    expected_exports: [], type_only: true });
  const code = runtimeProgram(surface);
  assert.equal((code.match(/import \* as module\d+ from/g) ?? []).length, 14);
  assert(code.includes("await import('@vento/contracts/authorization/response-contracts/v1')"));
  assert(code.includes('assert.deepEqual(Object.keys(onlyTypes), [])'));
  assert.throws(() => runtimeProgram(surface.slice(0, 14)),
    /CI005_PUBLIC_SURFACE_CHANGED/u);
});



test('real runtime contract assertions reject catalog corruption and resolver behavior changes', async () => {
  const root = JSON.parse((await import('node:fs')).readFileSync(
    new URL('./vento-contracts-pilot-build-contract.json', import.meta.url), 'utf8'));
  const entries = root.public_surface.filter(entry => entry.type_only !== true);
  const modules = Object.fromEntries(await Promise.all(entries.map(async entry => [
    entry.subpath, await import('@vento/contracts/' + entry.subpath.slice(2)),
  ])));
  assert.equal(assertContractSemanticBehavior(modules), 14);
  const base = modules['./authorization/base-roles/v1'];
  assert.throws(() => assertContractSemanticBehavior({
    ...modules,
    './authorization/base-roles/v1': {
      ...base, BASE_ROLE_CODES: [...base.BASE_ROLE_CODES.slice(0, -1), 'role_forged'],
    },
  }));
  const processes = modules['./processes'];
  assert.throws(() => assertContractSemanticBehavior({
    ...modules,
    './processes': { ...processes, isProcessId: () => true },
  }));
  const ownership = modules['./ownership'];
  assert.throws(() => assertContractSemanticBehavior({
    ...modules,
    './ownership': { ...ownership, resolveProcessOwner: () => undefined },
  }));
  assert.throws(() => assertContractSemanticBehavior({
    ...modules, './authorization/catalog/v1': {
      ...modules['./authorization/catalog/v1'],
      APPLICATION_CODES: ['shell', 'anima'],
    },
  }));
});


test('compiler failures report only diagnostic codes, never consumer source or credentials', () => {
  const sample = "src/app/foo/page.tsx(5,3): error TS2307: Cannot find module 'sensitive-value'.\n"
    + ".ci005-contracts-types.ts(2,1): error TS2344: secret=another-sensitive-value\n";
  const diagnostic = classifyCompilerErrors(sample);
  assert.deepEqual(diagnostic.codes, ['TS2307', 'TS2344']);
  assert.equal(diagnostic.diagnostic_count, 2);
  assert.equal(diagnostic.probe_related, true);
  assert(!JSON.stringify(diagnostic).includes('sensitive-value'));
  assert.deepEqual(classifyCompilerErrors('npm exited 1').codes, []);
});


test('preexisting VISO typecheck debt is a named restriction, not a clean PASS or publication', () => {
  const same = structuredClone(PASS);
  same[5].status = 'BASELINE_DEBT_UNCHANGED';
  const observed = evaluateProbe(same, 'a', 'a', 'b', 'b');
  assert.equal(observed.status, 'PASS_WITH_RESTRICTIONS');
  assert.equal(observed.preexisting_typecheck_debt, true);
  assert.equal(observed.release_eligibility, 'PENDING_CI005_RELATION_ATTESTATION');
  const bad = structuredClone(PASS);
  bad[5].status = 'FAIL';
  assert.equal(evaluateProbe(bad, 'a', 'a', 'b', 'b').status, 'BLOCKED');
});

test('baseline TypeScript diagnostics have stable cryptographic fingerprints, not source text', () => {
  const left = classifyCompilerErrors("src/foo.ts(1,2): error TS2345: sensitive diagnostic A");
  const right = classifyCompilerErrors("src/foo.ts(1,2): error TS2345: sensitive diagnostic B");
  assert.notDeepEqual(left.identities, right.identities);
  assert.equal(left.identities.length, 1);
  assert(/^sha256:[a-f0-9]{64}$/u.test(left.identities[0]));
  assert(!JSON.stringify(left).includes('sensitive'));
});


test('npm install must preserve all VISO locked dependencies besides the candidate tarball', () => {
  const prior = {
    'node_modules/next': '16.4.2',
    'node_modules/react': '19.2.3',
    'node_modules/@types/react': '19.2.6',
    'node_modules/typescript': '5.9.3',
  };
  const identical = { ...prior, 'node_modules/@vento/contracts': '1.0.0-alpha.1' };
  assert.deepEqual(compareFrozenDependencyTrees(prior, identical), {
    frozen: true, changed_count: 0, changed_packages: [],
  });
  const changed = { ...identical, 'node_modules/@types/react': '19.3.0' };
  const result = compareFrozenDependencyTrees(prior, changed);
  assert.equal(result.frozen, false);
  assert.equal(result.changed_count, 1);
  assert.deepEqual(result.changed_packages, [{
    name: 'node_modules/@types/react', before: '19.2.6', after: '19.3.0',
  }]);
  const removed = { ...identical };
  delete removed['node_modules/react'];
  assert.equal(compareFrozenDependencyTrees(prior, removed).frozen, false);
});


function syntheticPilotWitness() {
  const source = 'a'.repeat(40);
  const manifestBytes = Buffer.from('{}', 'utf8');
  const manifestHash = asSha256Identity(manifestBytes);
  const art = 'sha256:74f63fd7a59b12bf2ea35c6d4a63c6842ab807b0d599effed9e06092100e0561';
  const tests = asSha256Identity('tests');
  const build = asSha256Identity('build');
  const snapshots = ['vento-shell', 'vento-viso', 'vento-nexo', 'vento-fogo',
    'vento-origo', 'vento-pulso', 'vento-numera'].map(name => ({
    consumer_repository: name,
    consumer_commit: 'b'.repeat(40),
    consumer_manifest_identity: asSha256Identity('manifest:' + name),
    consumer_lockfile_identity: asSha256Identity('lock:' + name),
  }));
  return {
    observed: {
      status: 'PASS', candidate: '@vento/contracts',
      candidate_version: '1.0.0-alpha.1',
      consumer: 'vento-viso',
      consumer_sha: 'b'.repeat(40), package_sha: source,
      candidate_manifest_identity: manifestHash,
      artifact_content_identity: art,
      test_evidence_identity: tests, build_evidence_identity: build,
      preexisting_typecheck_debt: false,
      consumer_manifest_unchanged: true,
      dependency_tree: { frozen: true },
      steps: structuredClone(PASS), snapshots,
      semantic_probe: {
        probe_id: 'CI005_CONTRACTS_SEMANTIC_V1', status: 'PASS',
        checked_subpaths: 14, executions: 2,
        artifact_content_identity: art,
      },
    },
    testEvidence: { outcome: 'PASS', source_commit: source,
      manifest_identity: manifestHash, material_identity_sha256: tests },
    buildEvidence: { build_status: 'PASS', source_commit: source,
      package_manifest_hash: manifestHash, artifact_content_hash: art,
      material_identity_sha256: build, pack_integrity: 'sha512-synthetic-only',
      exports_identity: 'sha256:da282d7c17dbcfc23a12d6c938c497fbfe8967ae6af434af772b115e6d2a6403' },
    manifestBytes,
    consumerManifest: {
      dependencies: { next: '16.4.2', react: '19.2.3', 'react-dom': '19.2.3' },
      devDependencies: { typescript: '^5.0.0' },
    },
    effectiveVersions: {
      node: '24.19.0', next: '16.4.2', react: '19.2.3',
      react_dom: '19.2.3', typescript: '5.9.3',
    },
    npmVersion: '11.17.0',
  };
}

test('CI005 prerelease binds exactly the real VISO pilot and seven consumer snapshots', () => {
  const input = buildRealCi005PilotInput(syntheticPilotWitness());
  assert.deepEqual(input.pilot_relation_ids, ['PKG-COMP-MX-002']);
  assert.equal(input.release_channel_type, 'PRERELEASE');
  assert.equal(input.consumer_snapshots.length, 7);
  assert.equal(input.relations.length, 1);
  assert.equal(input.relations[0].candidate_bands.next.minimum, '16.4.2');
  assert.equal(input.relations[0].coverage_evaluations.length, 5);
  assert.equal(input.relations[0].axes.length, 12);
  assert(input.relations[0].restrictions.length > 0);
  assert(input.relations[0].axes.some(x => x.status === 'NOT_APPLICABLE'));
  // A structurally plausible fake is never enough to satisfy CI001/CI002.
  assert.equal(prepareCompatibilityEvidence(input).result, 'BLOCKED');
});

test('CI005 rejects synthetic drift, stale evidence, missing consumer and unresolved versions', () => {
  const base = syntheticPilotWitness();
  for (const mutate of [
    x => { x.observed.status = 'PASS_WITH_RESTRICTIONS'; },
    x => { x.observed.dependency_tree.frozen = false; },
    x => { x.observed.steps[5].status = 'FAIL'; },
    x => { x.observed.snapshots.pop(); },
    x => { x.buildEvidence.artifact_content_hash = asSha256Identity('changed'); },
    x => { x.effectiveVersions.next = ''; },
    x => { delete x.observed.semantic_probe; },
    x => { x.observed.semantic_probe.executions = 1; },
    x => { x.observed.semantic_probe.status = 'PENDING'; },
    x => { x.observed.artifact_content_identity = asSha256Identity('modified-runtime'); },
    x => { x.buildEvidence.exports_identity = asSha256Identity('modified-exports'); },
  ]) {
    const fixture = structuredClone(base);
    mutate(fixture);
    assert.throws(() => buildRealCi005PilotInput(fixture), /CI005_VISO:/u);
  }
});
