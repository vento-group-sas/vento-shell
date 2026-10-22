import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import test from 'node:test';

import { NPM_REGISTRY_URL } from './shared-package-registry-preflight.mjs';
import {
  registryNpmrc, releaseContract, releaseEvidenceSummary,
  requirePilotCompatibility, verifyDispatch,
} from './vento-contracts-private-release.mjs';

const SHA = 'a'.repeat(40);
const OTHER = 'b'.repeat(40);
const REPOSITORY = 'vento-group-sas/vento-shell';
const CONFIRM = '@vento/contracts@1.0.0-alpha.1';

function context(mode = 'publish', overrides = {}) {
  return {
    mode, sourceCommit: SHA, expectedSha: SHA,
    githubSha: SHA, repository: REPOSITORY,
    ref: 'refs/heads/main', event: 'workflow_dispatch',
    confirmation: CONFIRM, ...overrides,
  };
}

test('publish contract is restricted to first protected GitLab prerelease', () => {
  const c = releaseContract(SHA);
  assert.equal(c.source_commit, SHA);
  assert.equal(c.package_name, '@vento/contracts');
  assert.equal(c.release_version, '1.0.0-alpha.1');
  assert.equal(c.release_channel, 'next');
  assert.equal(c.release_channel_type, 'PRERELEASE');
  assert.equal(c.release_preview_mode, 'EPHEMERAL_PRIVATE_SOURCE');
  assert.equal(c.registry_url, NPM_REGISTRY_URL);
  assert.equal(c.github_repository, REPOSITORY);
  assert.equal(c.execution_mode, 'REAL');
  assert.equal(c.approved_internal_prereleases.length, 0);
});

test('manual publish needs exact source SHA, main, repository and explicit identity', () => {
  assert.deepEqual(verifyDispatch(context()), {
    mode: 'publish', source_commit: SHA,
    package_name: '@vento/contracts',
    version: '1.0.0-alpha.1', mutating: true,
  });
  for (const change of [
    { sourceCommit: OTHER },
    { githubSha: OTHER },
    { expectedSha: OTHER },
    { expectedSha: undefined },
    { repository: 'someone-else/repo' },
    { repository: undefined },
    { ref: 'refs/pull/123/merge' },
    { event: 'pull_request' },
    { event: 'push' },
    { confirmation: '@vento/contracts@1.0.0' },
    { confirmation: undefined },
  ]) {
    assert.throws(() => verifyDispatch(context('publish', change)),
      /VENTO_PRIVATE_RELEASE:/u);
  }
});

test('protected read-only audit requires main and source pin but does not publish', () => {
  const result = verifyDispatch(context('audit', { confirmation: null }));
  assert.equal(result.mutating, false);
  assert.equal(result.mode, 'audit');
  assert.throws(() => verifyDispatch(context('audit', {
    expectedSha: OTHER,
  })), /MANUAL_PINNED_SHA_REQUIRED/u);
});

test('safe preparation permits PR synthetic merge commit without protected credentials', () => {
  const prepared = verifyDispatch({
    mode: 'prepare',
    sourceCommit: SHA,
    githubSha: SHA,
    repository: REPOSITORY,
    ref: 'refs/pull/1028/merge',
    event: 'pull_request',
  });
  assert.equal(prepared.mutating, false);
  assert.equal(prepared.source_commit, SHA);
  assert.throws(() => verifyDispatch(context('unsafe')), /MODE_NOT_ALLOWED/u);
});

test('npm authentication configuration uses only the pinned private endpoint', () => {
  const token = 'test-token-for-synthetic-audit';
  const config = registryNpmrc(token);
  assert.equal(config, '@vento:registry=' + NPM_REGISTRY_URL + '\n'
    + '//gitlab.com/api/v4/projects/87892751/packages/npm/:_authToken=' + token + '\n');
  assert(!config.includes('registry.npmjs.org'));
  assert.throws(() => registryNpmrc(''), /REGISTRY_PUBLISH_TOKEN_INVALID/u);
  assert.throws(() => registryNpmrc('x\nrogue-setting=1'), /REGISTRY_PUBLISH_TOKEN_INVALID/u);
  assert.throws(() => registryNpmrc('x:y'), /REGISTRY_PUBLISH_TOKEN_INVALID/u);
});

test('preparation summary states explicitly that no publication or private tarball upload occurred', () => {
  const candidate = {
    source_commit: SHA,
    material_identity_sha256: 'sha256:' + 'c'.repeat(64),
    tarball_sha256: 'sha256:' + 'd'.repeat(64),
    pack_integrity: 'sha512-' + 'Z'.repeat(86) + '==',
  };
  const report = releaseEvidenceSummary({
    outcome: 'READY',
    reasons: [], candidate,
  }, { preview_pack: 'PASS' });
  assert.equal(report.result, 'READY');
  assert.equal(report.archived_tarball, false);
  assert.equal(report.registry_write_tested, false);
  assert.equal(report.publication_executed, false);
  assert.equal(report.release_channel, 'next');
  assert(!JSON.stringify(report).includes('_authToken'));
});


test('GitHub publication is manual, main-only, SHA-pinned and credential-isolated', () => {
  const root = path.resolve(import.meta.dirname, '../..');
  const workflow = fs.readFileSync(
    path.join(root, '.github/workflows/vento-contracts-private-npm-release.yml'),
    'utf8',
  );
  assert.match(workflow, /\bon:\s*\n\s+workflow_dispatch:/u);
  assert.doesNotMatch(workflow, /\n\s+(?:push|pull_request|schedule|repository_dispatch):/u);
  assert.equal((workflow.match(/if: \$\{\{ github\.ref == 'refs\/heads\/main'/gu) ?? []).length, 2);
  assert.match(workflow, /environment: npm-packages-publish/u);
  assert.match(workflow, /permissions:\n  contents: read/u);
  assert.match(workflow, /permissions:\n      contents: write/u);
  assert.match(workflow, /persist-credentials: \$\{\{ inputs\.operation == 'publish' \}\}/u);
  assert.match(workflow, /test "\$EXPECTED_SHA" = "\$GITHUB_SHA"/u);
  assert.match(workflow, /cancel-in-progress: false/u);
  assert.match(workflow, /--mode "\$OPERATION"/u);
  assert.equal((workflow.match(/GITLAB_NPM_PUBLISH_TOKEN: \$\{\{/gu) ?? []).length, 1);
  assert.doesNotMatch(workflow, /npm publish|\.tgz|--force|sudo /u);
});


test('real private publication requires CI005 pilot identity and refuses uncertified compatibility', () => {
  const release = releaseContract(SHA);
  assert.equal(release.compatibility_required, false);
  const ready = releaseContract(SHA, 'sha256:' + 'f'.repeat(64));
  assert.equal(ready.compatibility_required, true);
  assert.equal(ready.compatibility_evidence_identity, 'sha256:' + 'f'.repeat(64));
  assert.throws(() => requirePilotCompatibility({}), /CI005_REAL_PILOT_EVIDENCE_REQUIRED/u);
  assert.throws(() => requirePilotCompatibility({
    input: { pilot_relation_ids: [] },
    prepared: {},
  }), /CI005_APPROVED_PILOT_CONSUMER_REQUIRED/u);
  assert.throws(() => requirePilotCompatibility({
    input: { pilot_relation_ids: ['COMP-REL-001'] },
    prepared: {
      result: 'BLOCKED', phase: 'PREPARE',
      release_channel_type: 'PRERELEASE',
    },
  }), /CI005_PREPARE_NOT_PASS/u);
  assert.throws(() => requirePilotCompatibility({
    input: { pilot_relation_ids: ['COMP-REL-001'] },
    prepared: {
      result: 'PASS', phase: 'PREPARE',
      release_channel_type: 'STABLE',
    },
  }), /CI005_PREPARE_NOT_PASS/u);
});

test('synthetic CI005 PREPARE identity alone does not qualify as real pilot compatibility', () => {
  assert.throws(() => requirePilotCompatibility({
    input: { pilot_relation_ids: ['COMP-REL-001'] },
    prepared: {
      result: 'PASS', phase: 'PREPARE',
      release_channel_type: 'PRERELEASE',
      invalidation_reason: null,
      compatibility_evidence_identity: 'sha256:' + '1'.repeat(64),
    },
    testEvidence: {}, buildEvidence: {}, sourceCommit: SHA,
    manifestSource: '{}',
  }), /CI005_EVIDENCE_STALE_OR_INCOMPATIBLE/u);
});
