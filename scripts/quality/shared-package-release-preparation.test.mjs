import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import test from 'node:test';
import {
  NPM_REGISTRY_URL, PACKAGE_LOCATIONS,
} from './shared-package-registry-preflight.mjs';
import {
  releasePreviewManifest, verifyPreview, stagePreviews,
  assessProtectionRules, auditProtectionRules,
} from './shared-package-release-preparation.mjs';

const SOURCE = {
  name: '@vento/os-context',
  version: '0.1.0',
  type: 'module',
  private: true,
  scripts: { prepublishOnly: 'node forbidden.mjs', build: 'tsc' },
  files: ['dist/'],
  exports: { '.': { types: './dist/index.d.ts', import: './dist/index.js' } },
  peerDependencies: { '@supabase/supabase-js': '>=2.90.0' },
};

function failCode(fn, message) {
  assert.throws(fn, (error) =>
    error instanceof Error && error.message.includes('VENTO_NPM_RELEASE_PREP:' + message));
}

test('preview is strictly isolated from private workspace manifests and lifecycle hooks', () => {
  const input = structuredClone(SOURCE);
  const result = releasePreviewManifest(input);
  assert.equal(input.private, true);
  assert.equal(result.preview.private, false);
  assert.equal(result.preview.publishConfig.registry, NPM_REGISTRY_URL);
  assert.equal(result.preview.scripts, undefined);
  assert.equal(result.preview.bin, undefined);
  assert.deepEqual(result.targets, ['dist/index.d.ts', 'dist/index.js']);
  assert.equal(result.preview.peerDependencies['@supabase/supabase-js'], '>=2.90.0');
  assert.deepEqual(input, SOURCE);
});

test('unapproved source releases and manifest alterations are fail-closed', () => {
  failCode(() => releasePreviewManifest({ ...SOURCE, private: false }),
    'SOURCE_MUST_REMAIN_PRIVATE');
  failCode(() => releasePreviewManifest({ ...SOURCE, publishConfig: { registry: NPM_REGISTRY_URL } }),
    'SOURCE_PUBLISH_CONFIG_FORBIDDEN');
  failCode(() => releasePreviewManifest({ ...SOURCE, name: '@vento/external' }),
    'NONCANONICAL_PACKAGE');
  failCode(() => releasePreviewManifest({ ...SOURCE, version: 'unversioned' }),
    'VERSION_INVALID');
  failCode(() => releasePreviewManifest({ ...SOURCE, files: ['src/'] }),
    'SOURCE_FILES_UNSAFE');
});

test('cannot stage files outside dist, source imports or mutable internal peer versions', () => {
  failCode(() => releasePreviewManifest({ ...SOURCE,
    exports: { '.': './src/index.ts' } }), 'EXPORT_OUTSIDE_DIST');
  failCode(() => releasePreviewManifest({ ...SOURCE,
    exports: { '.': '../../etc/passwd' } }), 'EXPORT_OUTSIDE_DIST');
  failCode(() => releasePreviewManifest({ ...SOURCE,
    exports: { '.': ['./dist/a.js', './dist/b.js'] } }), 'EXPORT_INVALID');
  failCode(() => releasePreviewManifest({ ...SOURCE,
    dependencies: { '@vento/contracts': '^1.0.0' } }), 'INTERNAL_VERSION_NOT_EXACT');
});

test('archive verifier rejects tampered or empty bytes', () => {
  failCode(() => verifyPreview({ bytes: Buffer.alloc(0), metadata: {},
    preview: { name: '@vento/os-context' }, targets: [] }), 'EMPTY_ARCHIVE');
  failCode(() => verifyPreview({ bytes: Buffer.from('fake'),
    metadata: { name: '@vento/other', version: '1' },
    preview: { name: '@vento/os-context', version: '0.1.0' }, targets: [] }),
  'PACK_IDENTITY_MISMATCH');
});

const protectedRules = [{
  package_type: 'npm',
  package_name_pattern: '@vento/*',
  minimum_access_level_for_push: 'maintainer',
}];

test('protected registry must cover all four @vento packages', () => {
  const result = assessProtectionRules(protectedRules);
  assert.equal(result.protection_rules_seen, 1);
  assert.deepEqual(result.packages.map((row) => row.name),
    PACKAGE_LOCATIONS.map((row) => row.name));
  assert(result.packages.every((row) => row.protected && row.push_roles[0] === 'maintainer'));
  assert.equal(result.publication_executed, false);
  assert.equal(result.token_publish_permission, 'NOT_TESTED');
});

test('missing or insufficient package protections must fail', () => {
  failCode(() => assessProtectionRules([]), 'MISSING_NPM_PROTECTION');
  failCode(() => assessProtectionRules([{
    ...protectedRules[0], minimum_access_level_for_push: 'developer',
  }]), 'PROTECTION_ROLE_TOO_WEAK');
  failCode(() => assessProtectionRules([{
    ...protectedRules[0], package_type: 'maven',
  }]), 'MISSING_NPM_PROTECTION');
  failCode(() => assessProtectionRules([{ ...protectedRules[0],
    package_name_pattern: '@vento/contracts' }]), 'MISSING_NPM_PROTECTION');
  failCode(() => assessProtectionRules({ rows: [] }), 'PROTECTION_RESPONSE_INVALID');
});

function okResponse(body) {
  return { ok: true, status: 200, json: async () => body };
}
test('read-only GitLab audit sends only one pinned GET, with no token in result', async () => {
  const trace = [];
  const result = await auditProtectionRules({
    token: 'synthetic-test-token',
    registryUrl: NPM_REGISTRY_URL,
    fetchImpl: async (url, options) => {
      trace.push({ url, options });
      return okResponse(protectedRules);
    },
  });
  assert.equal(trace.length, 1);
  assert.equal(trace[0].url,
    'https://gitlab.com/api/v4/projects/87892751/packages/protection/rules');
  assert.equal(trace[0].options.method, 'GET');
  assert.equal(trace[0].options.redirect, 'error');
  assert.equal(trace[0].options.headers['PRIVATE-TOKEN'], 'synthetic-test-token');
  assert.equal(result.read_authentication, 'PASS');
  assert.equal(result.token_publish_permission, 'NOT_TESTED');
  assert(!JSON.stringify(result).includes('synthetic-test-token'));
});

test('a wrong registry, missing token, denied request or network error fail closed', async () => {
  let requests = 0;
  await assert.rejects(auditProtectionRules({
    token: 'synthetic', registryUrl: 'https://example.net/evil',
    fetchImpl: async () => { requests++; return okResponse(protectedRules); },
  }), /REGISTRY_ENDPOINT_MISMATCH/u);
  assert.equal(requests, 0);
  await assert.rejects(auditProtectionRules({
    token: '', registryUrl: NPM_REGISTRY_URL,
  }), /TOKEN_MISSING/u);
  await assert.rejects(auditProtectionRules({
    token: 'synthetic', registryUrl: NPM_REGISTRY_URL,
    fetchImpl: async () => ({ ok: false, status: 403 }),
  }), /PROTECTION_HTTP_403/u);
  await assert.rejects(auditProtectionRules({
    token: 'synthetic', registryUrl: NPM_REGISTRY_URL,
    fetchImpl: async () => { throw new Error('secret should never be printed'); },
  }), /PROTECTION_REQUEST_FAILED/u);
});

test('stage four real compiled packages as ephemeral SHA-bound previews, without publishing', () => {
  const root = path.resolve(import.meta.dirname, '../..');
  const before = PACKAGE_LOCATIONS.map((item) => {
    const filename = path.join(root, 'packages', item.directory, 'package.json');
    return fs.readFileSync(filename, 'utf8');
  });
  const sha = 'a'.repeat(40);
  const result = stagePreviews({ root, sourceCommit: sha });
  assert.equal(result.phase, 'PREPARATION_ONLY');
  assert.equal(result.source_commit, sha);
  assert.equal(result.packages.length, 4);
  assert.equal(result.publication_executed, false);
  assert.equal(result.release_certified, false);
  assert.equal(result.artifacts_persisted, false);
  assert(result.packages.every((item) =>
    item.preview_pack === 'PASS' && item.source_private_unchanged
    && item.preview_private === false && /^[a-f0-9]{64}$/u.test(item.sha256)));
  for (const [index, item] of PACKAGE_LOCATIONS.entries()) {
    assert.equal(result.packages[index].name, item.name);
    const filename = path.join(root, 'packages', item.directory, 'package.json');
    assert.equal(fs.readFileSync(filename, 'utf8'), before[index]);
    assert.equal(JSON.parse(before[index]).private, true);
  }
});

test('main push performs protected GET audit only after package QA; PRs cannot access secrets', () => {
  const root = path.resolve(import.meta.dirname, '../..');
  const qaWorkflow = fs.readFileSync(
    path.join(root, '.github/workflows/vento-shared-npm-registry-qa.yml'), 'utf8');
  const canonical = fs.readFileSync(
    path.join(root, '.github/workflows/validate-canonical-plan.yml'), 'utf8');
  assert(qaWorkflow.includes("github.ref == 'refs/heads/main'"));
  assert(qaWorkflow.includes("github.event_name == 'push'"));
  assert(qaWorkflow.includes('needs: package-qa'));
  assert(qaWorkflow.includes('environment: npm-packages-publish'));
  assert(qaWorkflow.includes('node scripts/quality/shared-package-registry-preflight.mjs registry'));
  assert(qaWorkflow.includes('node scripts/quality/shared-package-release-preparation.mjs protection'));
  assert(qaWorkflow.includes("github.event_name == 'push' || inputs.audit_protection == true"));
  for (const covered of [
    '.github/workflows/vento-shared-npm-registry-qa.yml',
    'scripts/quality/shared-package-release-preparation.mjs',
    'scripts/quality/shared-package-release-preparation.test.mjs',
  ]) {
    assert.equal(canonical.split('"' + covered + '"').length, 3,
      'CANONICAL_PLAN_PR_AND_PUSH_MUST_COVER:' + covered);
  }
});

test('canonical and package CI actions use maintained Node 24 runtime without exposing audit cache', () => {
  const root = path.resolve(import.meta.dirname, '../..');
  const paths = [
    '.github/workflows/vento-shared-npm-registry-qa.yml',
    '.github/workflows/validate-canonical-plan.yml',
    '.github/workflows/vento-required-gate.yml',
    '.github/workflows/vento-repository-publication.yml',
    '.github/workflows/vento-night-documentation-autopilot.yml',
  ];
  for (const filename of paths) {
    const workflow = fs.readFileSync(path.join(root, filename), 'utf8');
    assert.match(workflow, /uses: actions\/checkout@v7/u, filename + ':CHECKOUT_V7_REQUIRED');
    assert.match(workflow, /uses: actions\/setup-node@v7/u, filename + ':SETUP_NODE_V7_REQUIRED');
    assert.doesNotMatch(workflow, /uses: actions\/(?:checkout|setup-node|upload-artifact|download-artifact)@v[1-6]\b/u,
      filename + ':OUTDATED_ACTION_RUNTIME');
    if (workflow.includes('uses: actions/upload-artifact@')) {
      assert.match(workflow, /uses: actions\/upload-artifact@v7/u,
        filename + ':UPLOAD_ARTIFACT_NODE24_REQUIRED');
    }
    if (workflow.includes('uses: actions/download-artifact@')) {
      assert.match(workflow, /uses: actions\/download-artifact@v7/u,
        filename + ':DOWNLOAD_ARTIFACT_NODE24_REQUIRED');
    }
  }
  const qa = fs.readFileSync(path.join(root, paths[0]), 'utf8');
  assert.match(qa, /name: Configurar Node canonico\n\s+uses: actions\/setup-node@v7\n\s+with:\n\s+node-version-file: \.node-version\n\s+package-manager-cache: false/u,
    'PROTECTED_AUDIT_CACHING_MUST_BE_DISABLED');
  assert.match(qa, /environment: npm-packages-publish/u);
  assert.match(qa, /persist-credentials: false/u);
  const publication = fs.readFileSync(path.join(root, paths[3]), 'utf8');
  const autopilot = fs.readFileSync(path.join(root, paths[4]), 'utf8');
  assert.match(publication, /package-manager-cache: false/u,
    'PUBLICATION_WORKFLOW_CACHE_DISABLED');
  assert.equal((autopilot.match(/package-manager-cache: false/gu) ?? []).length, 4,
    'DOC_AUTOPILOT_JOBS_MUST_DISABLE_UNUSED_CACHE');
});
