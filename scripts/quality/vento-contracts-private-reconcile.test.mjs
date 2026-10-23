import assert from 'node:assert/strict';
import fs from 'node:fs';
import { createHash } from 'node:crypto';
import path from 'node:path';
import test from 'node:test';

import {
  SOURCE_SHA, PILOT, TAG, REGISTRY, TAR_SHA, TAR_SRI,
  verifyRecoveryContext, verifyMetadata, verifyExistingRegistryMetadata,
  verifyMatchingTarballs, verifiedRemoteState, verifyCurrentPilotCompatibility,
} from './vento-contracts-private-reconcile.mjs';

const repository = path.resolve(import.meta.dirname, '../..');
const workflow = fs.readFileSync(path.join(repository,
  '.github/workflows/vento-contracts-private-npm-reconcile.yml'), 'utf8');
const runner = fs.readFileSync(path.join(repository,
  'scripts/quality/vento-contracts-private-reconcile.mjs'), 'utf8');

function context() {
  return {
    GITHUB_EVENT_NAME: 'workflow_dispatch',
    GITHUB_REF: 'refs/heads/main',
    GITHUB_REPOSITORY: 'vento-group-sas/vento-shell',
    GITHUB_SHA: 'f'.repeat(40),
    VENTO_RECOVERY_SOURCE_SHA: SOURCE_SHA,
    VENTO_RECOVERY_CONFIRMATION: PILOT,
    GITLAB_NPM_REGISTRY_URL: REGISTRY,
    GITLAB_NPM_PUBLISH_TOKEN: 'synthetic-example-nonsecret-token',
    GH_TOKEN: 'synthetic-example-nonsecret-github-token',
  };
}

test('pinned source SHA, version and original tarball are immutable', () => {
  assert.equal(SOURCE_SHA, 'e6fb82c92e9e3b242fea4ec7cc7025774f157622');
  assert.equal(PILOT, '@vento/contracts@1.0.0-alpha.1');
  assert.equal(TAG, 'vento-pkg/vento__contracts/v1.0.0-alpha.1');
  assert.equal(REGISTRY, 'https://gitlab.com/api/v4/projects/87892751/packages/npm/');
  assert.equal(TAR_SHA, '2cd9985395aa1f741b40008c37e3478e64dc5f1392aca94c5198f13e7c0a2ee3');
  assert.match(TAR_SRI, /^sha512-/u);
});

test('recovery requires exact source, manual main and confirmation', () => {
  assert.deepEqual(verifyRecoveryContext(context()), {
    package: PILOT, source_sha: SOURCE_SHA,
  });
  for (const invalid of [
    { GITHUB_EVENT_NAME: 'push' },
    { GITHUB_REF: 'refs/pull/1/merge' },
    { GITHUB_REPOSITORY: 'some/repository' },
    { GITHUB_SHA: 'bad' },
    { VENTO_RECOVERY_SOURCE_SHA: 'a'.repeat(40) },
    { VENTO_RECOVERY_CONFIRMATION: '@vento/contracts@1.0.0' },
    { GITLAB_NPM_REGISTRY_URL: 'https://registry.npmjs.org/' },
    { GITLAB_NPM_PUBLISH_TOKEN: '' },
    { GH_TOKEN: '' },
  ]) {
    assert.throws(() => verifyRecoveryContext({ ...context(), ...invalid }),
      /VENTO_CI003_RECOVERY:/u);
  }
});

test('existing GitHub Release must match and have zero public assets', () => {
  const expected = { tagName: TAG, isPrerelease: true, isDraft: false,
    body: 'exact canonical notes', assets: [] };
  assert.doesNotThrow(() => verifyMetadata(expected, 'exact canonical notes'));
  for (const modification of [
    { tagName: 'another-tag' },
    { isPrerelease: false }, { isDraft: true },
    { body: 'wrong' }, { assets: [{ name: 'secret.tgz' }] },
  ]) {
    assert.throws(() => verifyMetadata({ ...expected, ...modification },
      'exact canonical notes'), /EXISTING_RELEASE_MISMATCH/u);
  }
});

test('GitLab npm metadata may omit dist.integrity but must bind exact protected version', () => {
  const tarball = 'https://gitlab.com/api/v4/projects/87892751/packages/npm/'
    + '@vento/contracts/-/vento-contracts-1.0.0-alpha.1.tgz';
  const base = {
    name: '@vento/contracts', version: '1.0.0-alpha.1',
    'dist.integrity': TAR_SRI, 'dist.shasum': 'a'.repeat(40),
    'dist.tarball': tarball,
  };
  assert.equal(verifyExistingRegistryMetadata(base).metadata_integrity_present, true);
  assert.equal(verifyExistingRegistryMetadata([base]).registry_tarball_url, tarball);
  const { ['dist.integrity']: removed, ...legacy } = base;
  assert.equal(removed, TAR_SRI);
  assert.equal(verifyExistingRegistryMetadata(legacy).metadata_integrity_present, false);
  const nested = {
    name: base.name, version: base.version,
    dist: { integrity: TAR_SRI, shasum: base['dist.shasum'], tarball },
  };
  assert.equal(verifyExistingRegistryMetadata(nested).shasum, 'a'.repeat(40));
  for (const invalid of [
    null, [], [base, base], [[base]], {},
    { ...base, name: '@vento/ui-web' },
    { ...base, version: '1.0.0-alpha.2' },
    { ...base, 'dist.integrity': 'sha512-mismatched' },
    { ...base, 'dist.shasum': '' },
    { ...base, 'dist.shasum': 'abc123' },
    { ...base, 'dist.tarball': 'https://registry.npmjs.org/a.tgz' },
    { ...base, 'dist.tarball': 'https://gitlab.com/api/v4/projects/1/packages/npm/a.tgz' },
    { ...base, 'dist.tarball': tarball + '?secret=1' },
    { ...base, 'dist.tarball': null },
    { ...base, dist: { integrity: 'sha512-different' } },
  ]) {
    assert.throws(() => verifyExistingRegistryMetadata(invalid),
      /VENTO_CI003_RECOVERY:/u);
  }
});

test('physical npm readback requires byte identity plus SHA1 SHA256 and SHA512', () => {
  const source = Buffer.from('Synthetic test tarball, not a production artifact.');
  const sha1 = createHash('sha1').update(source).digest('hex');
  const sha256 = createHash('sha256').update(source).digest('hex');
  const sri = 'sha512-' + createHash('sha512').update(source).digest('base64');
  const args = {
    originalBytes: source, downloadedBytes: Buffer.from(source),
    expectedSha256: sha256, expectedSri: sri, registryShasum: sha1,
  };
  assert.deepEqual(verifyMatchingTarballs(args), {
    sha1, sha256: 'sha256:' + sha256, sri,
  });
  for (const changed of [
    { downloadedBytes: Buffer.from('tampered') },
    { downloadedBytes: Buffer.alloc(0) },
    { originalBytes: 'untrusted-string' },
    { expectedSha256: 'f'.repeat(64) },
    { expectedSri: 'sha512-invalid' },
    { registryShasum: '0'.repeat(40) },
  ]) {
    assert.throws(() => verifyMatchingTarballs({ ...args, ...changed }),
      /VENTO_CI003_RECOVERY:/u);
  }
});

test('canonical idempotent state is pinned to the actual prerelease only', () => {
  const candidate = {
    package_name: '@vento/contracts', release_version: '1.0.0-alpha.1',
    source_commit: SOURCE_SHA, tag_name: TAG,
    tarball_sha256: 'sha256:' + TAR_SHA,
    pack_integrity: TAR_SRI, release_channel: 'next',
  };
  const state = verifiedRemoteState(candidate);
  assert.equal(state.tags[TAG].annotated, true);
  assert.equal(state.releases[TAG].immutable, true);
  assert.equal(state.registry[PILOT].pack_integrity, TAR_SRI);
  assert.equal(state.channels['@vento/contracts'].next, '1.0.0-alpha.1');
  for (const invalid of [
    { package_name: '@vento/ui-web' },
    { release_version: '1.0.0-alpha.2' },
    { source_commit: '0'.repeat(40) },
    { tag_name: 'untrusted' },
    { tarball_sha256: 'sha256:untrusted' },
    { pack_integrity: 'sha512-untrusted' },
    { release_channel: 'latest' },
  ]) {
    assert.throws(() => verifiedRemoteState({ ...candidate, ...invalid }),
      /VENTO_CI003_RECOVERY:CANONICAL_CANDIDATE_NOT_PINNED_TO_PILOT/u);
  }
});

test('current-run CI005 identity is accepted; stale or unrelated evidence is rejected', () => {
  const idA = 'sha256:' + 'a'.repeat(64);
  const idB = 'sha256:' + 'b'.repeat(64);
  const valid = {
    compatibility_evidence_identity: idB,
    required_relation_ids: ['PKG-COMP-MX-002'],
    relation_evaluations: [
      { relation_identity: 'PKG-COMP-MX-002', state: 'COMPATIBLE_CON_RESTRICCIONES' },
    ],
  };
  // A new valid hash from today's run is not required to match an older run.
  assert.doesNotThrow(() => verifyCurrentPilotCompatibility(idB, valid));
  for (const [id, changes] of [
    [idA, {}], // stale digest from a previous independent execution
    ['invalid', {}],
    [idB, { required_relation_ids: ['PKG-COMP-MX-001'] }],
    [idB, { required_relation_ids: ['PKG-COMP-MX-002', 'PKG-COMP-MX-003'] }],
    [idB, { relation_evaluations: [{ relation_identity: 'PKG-COMP-MX-001', state: 'COMPATIBLE_CON_RESTRICCIONES' }] }],
    [idB, { relation_evaluations: [{ relation_identity: 'PKG-COMP-MX-002', state: 'BLOQUEADA' }] }],
    [idB, { relation_evaluations: [] }],
  ]) {
    assert.throws(() => verifyCurrentPilotCompatibility(id, { ...valid, ...changes }),
      /VENTO_CI003_RECOVERY:CI005_CURRENT_EVIDENCE_OR_RELATION_MISMATCH/u);
  }
});

test('recovery reads original source and guards protected npm mutation', () => {
  assert(workflow.includes('ref: ' + SOURCE_SHA));
  assert(workflow.includes('environment: npm-packages-publish'));
  assert(workflow.includes('permissions:\n      contents: read'));
  assert(workflow.includes('group: vento-contracts-private-npm-release'));
  assert(workflow.includes('VENTO_RECOVERY_CONFIRMATION'));
  assert(workflow.includes('if-no-files-found: error'));
  assert(workflow.includes('persist-credentials: false'));
  assert(workflow.includes("SOURCE_SHA: ${{ inputs.expected_source_sha }}"));
  assert(workflow.includes("GITHUB_SHA=\"$SOURCE_SHA\" node scripts/quality/vento-contracts-viso-consumer-probe.mjs"));
  assert(!workflow.includes('contents: write'));
  assert(!workflow.includes('operation: publish'));
  assert(runner.includes('requirePilotCompatibility'));
  assert(!runner.includes('REAL_RELEASE_CONFIRMATION'));
  assert(!runner.includes('allowRealRelease: true'));
  assert(runner.includes("'pack', PILOT"));
  assert(runner.includes('verifyMatchingTarballs'));
  assert(runner.includes('verifiedRemoteState(candidate.candidate)'));
  assert(runner.includes('evaluateReleaseCandidate'));
  assert(runner.includes('remote_write_executed: false'));
  assert(runner.includes('SHELL-CI-003::RECOVERY_PHYSICAL_READBACK'));
  assert(!runner.includes("'publish', tarballPath"));
  assert(runner.includes('verifyMetadata(release, notes)'));
  assert(runner.includes('parseRemoteAnnotatedTag'));
  assert(!runner.includes("['tag', '-a'"));
  assert(!runner.includes("['release', 'create'"));
});
