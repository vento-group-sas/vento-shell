import { createHash } from 'node:crypto';
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { spawnSync } from 'node:child_process';
import { fileURLToPath, pathToFileURL } from 'node:url';

export const SOURCE_SHA = 'e6fb82c92e9e3b242fea4ec7cc7025774f157622';
export const PILOT = '@vento/contracts@1.0.0-alpha.1';
export const TAG = 'vento-pkg/vento__contracts/v1.0.0-alpha.1';
export const REGISTRY = 'https://gitlab.com/api/v4/projects/87892751/packages/npm/';
export const TAR_SHA = '2cd9985395aa1f741b40008c37e3478e64dc5f1392aca94c5198f13e7c0a2ee3';
export const TAR_SRI = 'sha512-0H7VuJ1exQoKZwQbLmtbn53bIDWQAe9ncLefWs6I3NS8LDfNB3F8rukyGQ31jNW1eP4XyHoViAuYDHNiC7yhqA==';
const REPO = 'vento-group-sas/vento-shell';

function check(ok, code) {
  if (!ok) throw new Error('VENTO_CI003_RECOVERY:' + code);
}

function run(program, args, cwd, timeout = 30000) {
  const result = spawnSync(program, args, {
    cwd, encoding: 'utf8', timeout, windowsHide: true, maxBuffer: 1024 * 1024,
  });
  check(!result.error && result.status === 0, 'COMMAND_FAILED_CLOSED');
  return result.stdout.trim();
}

function onlyEvidence(directory, name) {
  check(fs.existsSync(directory), name + '_MISSING');
  const files = fs.readdirSync(directory);
  check(files.length === 1 && /^[a-f0-9-]{20,}\.json$/u.test(files[0]), name + '_CARDINALITY');
  const p = path.join(directory, files[0]);
  const stat = fs.lstatSync(p);
  check(stat.isFile() && !stat.isSymbolicLink(), name + '_UNSAFE');
  let data;
  try { data = JSON.parse(fs.readFileSync(p, 'utf8')); }
  catch { check(false, name + '_JSON_INVALID'); }
  check(data && typeof data === 'object' && !Array.isArray(data), name + '_SCHEMA_INVALID');
  return { path: p, data };
}

export function verifyRecoveryContext(env) {
  check(env.GITHUB_EVENT_NAME === 'workflow_dispatch' && env.GITHUB_REF === 'refs/heads/main'
    && env.GITHUB_REPOSITORY === REPO, 'PROTECTED_MAIN_DISPATCH_REQUIRED');
  check(/^[a-f0-9]{40}$/u.test(env.GITHUB_SHA ?? ''), 'WORKFLOW_SHA_INVALID');
  check(env.VENTO_RECOVERY_SOURCE_SHA === SOURCE_SHA, 'SOURCE_PIN_MISMATCH');
  check(env.VENTO_RECOVERY_CONFIRMATION === PILOT, 'PUBLISH_CONFIRMATION_MISMATCH');
  check(env.GITLAB_NPM_REGISTRY_URL === REGISTRY, 'PRIVATE_REGISTRY_MISMATCH');
  check(typeof env.GITLAB_NPM_PUBLISH_TOKEN === 'string'
    && env.GITLAB_NPM_PUBLISH_TOKEN.length >= 12, 'GITLAB_TOKEN_MISSING');
  check(typeof env.GH_TOKEN === 'string' && env.GH_TOKEN.length >= 20, 'GITHUB_TOKEN_MISSING');
  return { package: PILOT, source_sha: SOURCE_SHA };
}

export function verifyMetadata(release, notes) {
  check(release && release.tagName === TAG && release.isPrerelease === true
    && release.isDraft === false && Array.isArray(release.assets)
    && release.assets.length === 0 && release.body?.trim() === notes.trim(),
  'EXISTING_RELEASE_MISMATCH');
}

export function verifyExistingRegistryMetadata(value) {
  // npm's JSON output may be either an object or a singleton array. Never
  // accept ambiguous versions, and never infer package name or version.
  const rows = Array.isArray(value) ? value : [value];
  check(rows.length === 1 && rows[0] && typeof rows[0] === 'object'
    && !Array.isArray(rows[0]), 'REGISTRY_METADATA_CARDINALITY_OR_SHAPE');
  const info = rows[0];
  check(info.name === '@vento/contracts' && info.version === '1.0.0-alpha.1',
    'REGISTRY_METADATA_PACKAGE_IDENTITY_MISMATCH');
  const flattenedIntegrity = info['dist.integrity'];
  const nestedIntegrity = info.dist?.integrity;
  check(flattenedIntegrity === undefined || nestedIntegrity === undefined
    || flattenedIntegrity === nestedIntegrity, 'REGISTRY_METADATA_INTEGRITY_CONFLICT');
  const integrity = flattenedIntegrity ?? nestedIntegrity ?? null;
  // GitLab can omit SHA512 in packument metadata. If present, it MUST match;
  // if missing, the downloaded tarball MUST be verified physically instead.
  check(integrity === null || integrity === TAR_SRI,
    'EXISTING_REGISTRY_INTEGRITY_MISMATCH');
  const shasum = info['dist.shasum'] ?? info.dist?.shasum ?? null;
  check(typeof shasum === 'string' && /^[0-9a-f]{40}$/u.test(shasum),
    'REGISTRY_METADATA_SHA1_MISSING_OR_INVALID');
  const rawTarball = info['dist.tarball'] ?? info.dist?.tarball ?? null;
  let url;
  try { url = new URL(rawTarball); }
  catch { check(false, 'REGISTRY_METADATA_TARBALL_URL_INVALID'); }
  check(url.protocol === 'https:' && url.hostname === 'gitlab.com'
    && !url.username && !url.password && !url.port && !url.search && !url.hash
    && url.pathname.startsWith('/api/v4/projects/87892751/packages/npm/')
    && url.pathname.includes('contracts') && url.pathname.endsWith('.tgz'),
  'REGISTRY_METADATA_TARBALL_URL_UNTRUSTED');
  return { name: info.name, version: info.version, shasum,
    metadata_integrity_present: integrity !== null,
    registry_tarball_url: url.href };
}

export function verifyMatchingTarballs({
  originalBytes, downloadedBytes, expectedSha256, expectedSri, registryShasum,
} = {}) {
  check(Buffer.isBuffer(originalBytes) && Buffer.isBuffer(downloadedBytes)
    && downloadedBytes.length > 0 && originalBytes.equals(downloadedBytes),
  'REGISTRY_TARBALL_CONTENT_MISMATCH');
  const sha1 = createHash('sha1').update(downloadedBytes).digest('hex');
  const sha256 = createHash('sha256').update(downloadedBytes).digest('hex');
  const sri = 'sha512-' + createHash('sha512').update(downloadedBytes).digest('base64');
  check(sha1 === registryShasum && /^[0-9a-f]{40}$/u.test(sha1),
    'REGISTRY_TARBALL_SHA1_MISMATCH');
  check(sha256 === expectedSha256 && sri === expectedSri,
    'REGISTRY_TARBALL_SHA256_SHA512_MISMATCH');
  return { sha1, sha256: 'sha256:' + sha256, sri };
}

export function verifiedRemoteState(candidate) {
  check(candidate?.package_name === '@vento/contracts'
    && candidate.release_version === '1.0.0-alpha.1'
    && candidate.source_commit === SOURCE_SHA && candidate.tag_name === TAG
    && candidate.tarball_sha256 === 'sha256:' + TAR_SHA
    && candidate.pack_integrity === TAR_SRI && candidate.release_channel === 'next',
  'CANONICAL_CANDIDATE_NOT_PINNED_TO_PILOT');
  const published = {
    package_name: candidate.package_name, release_version: candidate.release_version,
    source_commit: candidate.source_commit, tag_name: candidate.tag_name,
    artifact_sha256: candidate.tarball_sha256, pack_integrity: candidate.pack_integrity,
    release_channel: candidate.release_channel,
  };
  return {
    schema_version: 1,
    tags: { [TAG]: { ...published, annotated: true } },
    releases: { [TAG]: { ...published, immutable: true } },
    registry: { [PILOT]: { ...published, immutable: true } },
    channels: { '@vento/contracts': { next: '1.0.0-alpha.1' } },
  };
}

export function verifyCurrentPilotCompatibility(verifiedIdentity, prepared) {
  // The CI005 digest binds CI001/CI002 evidence freshly generated for this run.
  // Never require an older run's digest: source and relation invariants are
  // already checked by requirePilotCompatibility against the current evidence.
  check(/^sha256:[a-f0-9]{64}$/u.test(String(verifiedIdentity))
    && verifiedIdentity === prepared?.compatibility_evidence_identity
    && Array.isArray(prepared.required_relation_ids)
    && prepared.required_relation_ids.length === 1
    && prepared.required_relation_ids[0] === 'PKG-COMP-MX-002'
    && Array.isArray(prepared.relation_evaluations)
    && prepared.relation_evaluations.length === 1
    && prepared.relation_evaluations[0]?.relation_identity === 'PKG-COMP-MX-002'
    && prepared.relation_evaluations[0]?.state === 'COMPATIBLE_CON_RESTRICCIONES',
  'CI005_CURRENT_EVIDENCE_OR_RELATION_MISMATCH');
}


function evidenceJson(file) {
  let x;
  try { x = JSON.parse(fs.readFileSync(file, 'utf8')); }
  catch { check(false, 'CI005_EVIDENCE_JSON_INVALID'); }
  check(x && typeof x === 'object' && !Array.isArray(x), 'CI005_EVIDENCE_INVALID');
  return x;
}

async function execute() {
  verifyRecoveryContext(process.env);
  const root = path.resolve(process.cwd());
  check(run('git', ['rev-parse', 'HEAD'], root) === SOURCE_SHA, 'CHECKOUT_SHA_MISMATCH');
  check(!run('git', ['status', '--porcelain', '--untracked-files=all', '--',
    'packages/contracts'], root), 'PACKAGE_SOURCES_DIRTY');

  const fromSource = async (name) => import(pathToFileURL(path.join(root,
    'scripts/quality', name)).href);
  const { releaseContract, requirePilotCompatibility, registryNpmrc } =
    await fromSource('vento-contracts-private-release.mjs');
  const { packPilotPrivatePreview, auditProtectionRules } =
    await fromSource('shared-package-release-preparation.mjs');
  const { queryGitLabPackages } = await fromSource('shared-package-registry-preflight.mjs');
  const { evaluateReleaseCandidate, parseRemoteAnnotatedTag, privateReleaseNotes } =
    await fromSource('shared-package-release-gate.mjs');

  const tagOutput = run('git', ['ls-remote', 'origin', 'refs/tags/' + TAG,
    'refs/tags/' + TAG + '^{}'], root);
  const remoteTag = parseRemoteAnnotatedTag(tagOutput, TAG);
  check(remoteTag?.annotated === true && remoteTag.sha === SOURCE_SHA,
    'EXISTING_ANNOTATED_TAG_MISMATCH');

  const manifestSource = fs.readFileSync(path.join(root, 'packages/contracts/package.json'), 'utf8');
  const manifest = JSON.parse(manifestSource);
  check(manifest.private === true && manifest.name === '@vento/contracts'
    && manifest.version === '1.0.0-alpha.1', 'PILOT_SOURCE_NOT_PRIVATE');
  const test = onlyEvidence(path.join(root, '.delivery/shared-package-tests/vento__contracts'), 'CI001');
  const build = onlyEvidence(path.join(root, '.delivery/shared-package-builds/vento__contracts'), 'CI002');
  check(test.data.outcome === 'PASS' && test.data.source_commit === SOURCE_SHA
    && build.data.build_status === 'PASS' && build.data.source_commit === SOURCE_SHA,
  'CI001_CI002_IDENTITY_INVALID');

  const compatibilityRoot = path.join(root, '.delivery/shared-package-compatibility/contracts-pilot');
  const compatible = requirePilotCompatibility({
    input: evidenceJson(path.join(compatibilityRoot, 'input.json')),
    prepared: evidenceJson(path.join(compatibilityRoot, 'prepared.json')),
    testEvidence: test.data, buildEvidence: build.data,
    sourceCommit: SOURCE_SHA, manifestSource,
  });
  verifyCurrentPilotCompatibility(compatible, evidenceJson(path.join(compatibilityRoot, 'prepared.json')));

  const tmp = fs.mkdtempSync(path.join(os.tmpdir(), 'vento-ci003-reconcile-'));
  fs.chmodSync(tmp, 0o700);
  try {
    const contract = releaseContract(SOURCE_SHA, compatible);
    const contractPath = path.join(tmp, 'release-contract.json');
    fs.writeFileSync(contractPath, JSON.stringify(contract, null, 2) + '\n', { mode: 0o600 });
    const packRoot = path.join(tmp, 'package');
    fs.mkdirSync(packRoot, { mode: 0o700 });
    const { tarballPath } = packPilotPrivatePreview({
      root, temporaryRoot: packRoot, packageName: '@vento/contracts',
    });
    const tarBytes = fs.readFileSync(tarballPath);
    check(createHash('sha256').update(tarBytes).digest('hex') === TAR_SHA
      && 'sha512-' + createHash('sha512').update(tarBytes).digest('base64') === TAR_SRI,
    'ORIGINAL_TARBALL_IDENTITY_MISMATCH');

    const notes = privateReleaseNotes({
      package_name: '@vento/contracts', release_version: '1.0.0-alpha.1',
      source_commit: SOURCE_SHA, tarball_sha256: 'sha256:' + TAR_SHA,
      pack_integrity: TAR_SRI,
    });
    const release = JSON.parse(run('gh', ['release', 'view', TAG,
      '--repo', REPO, '--json', 'tagName,isDraft,isPrerelease,assets,body'], root));
    verifyMetadata(release, notes);

    const token = process.env.GITLAB_NPM_PUBLISH_TOKEN;
    const remoteRows = await queryGitLabPackages({ token, registryUrl: REGISTRY });
    const listed = remoteRows.filter(x => x.name === '@vento/contracts'
      && x.version === '1.0.0-alpha.1');
    // The registry already has this exact version. Never publish again here,
    // even if it disappears between the initial list and the physical GET.
    check(listed.length === 1, 'EXISTING_VERSION_NOT_UNAMBIGUOUSLY_LISTED');
    const protection = await auditProtectionRules({ token, registryUrl: REGISTRY });
    check(protection.packages.some(x => x.name === '@vento/contracts'
      && x.protected === true), 'PROTECTED_PACKAGE_RULE_MISSING');

    const npmrc = path.join(tmp, 'private-readback.npmrc');
    fs.writeFileSync(npmrc, registryNpmrc(token), { mode: 0o600, flag: 'wx' });
    process.env.npm_config_userconfig = npmrc;
    process.env.npm_config_ignore_scripts = 'true';
    process.env.npm_config_provenance = 'false';
    process.env.npm_config_audit = 'false';
    process.env.npm_config_fund = 'false';
    const metadataJson = run('npm', [
      'view', PILOT, 'name', 'version', 'dist.integrity',
      'dist.shasum', 'dist.tarball', '--json', '--registry', REGISTRY,
    ], tmp, 45000);
    let metadata;
    try { metadata = JSON.parse(metadataJson); }
    catch { check(false, 'EXISTING_REGISTRY_JSON_INVALID'); }
    const verifiedMetadata = verifyExistingRegistryMetadata(metadata);

    // npm pack with an explicit REMOTE package spec is a read-only download.
    // Run outside the source/workspaces; no scripts, no publish or dist-tag.
    const remoteDir = path.join(tmp, 'remote');
    fs.mkdirSync(remoteDir, { mode: 0o700 });
    const response = run('npm', [
      'pack', PILOT, '--json', '--ignore-scripts',
      '--pack-destination', remoteDir, '--prefer-online',
      '--registry', REGISTRY,
    ], tmp, 90000);
    let packRows;
    try { packRows = JSON.parse(response); }
    catch { check(false, 'REGISTRY_PACK_READBACK_JSON_INVALID'); }
    check(Array.isArray(packRows) && packRows.length === 1
      && packRows[0]?.name === '@vento/contracts'
      && packRows[0]?.version === '1.0.0-alpha.1'
      && packRows[0]?.filename === 'vento-contracts-1.0.0-alpha.1.tgz',
    'REGISTRY_PACK_RESPONSE_NOT_PINNED');
    const archivePath = path.join(remoteDir, packRows[0].filename);
    check(fs.existsSync(archivePath), 'REGISTRY_TARBALL_NOT_DOWNLOADED');
    const stat = fs.lstatSync(archivePath);
    check(stat.isFile() && !stat.isSymbolicLink()
      && stat.size > 0 && stat.size <= 50 * 1024 * 1024,
    'REGISTRY_TARBALL_FILE_UNSAFE');
    const remoteBytes = fs.readFileSync(archivePath);
    const proof = verifyMatchingTarballs({
      originalBytes: tarBytes, downloadedBytes: remoteBytes,
      expectedSha256: TAR_SHA, expectedSri: TAR_SRI,
      registryShasum: verifiedMetadata.shasum,
    });
    check(packRows[0].shasum === proof.sha1
      && packRows[0].integrity === proof.sri,
    'REGISTRY_NPM_PACK_PHYSICAL_DIGEST_MISMATCH');

    // Canonical release-candidate evaluator from the immutable SOURCE_SHA.
    // We populate observed records ONLY after checking actual GitLab bytes,
    // its project/metadata, GitHub annotated tag and metadata-only release.
    const candidateArgs = {
      manifestSource, manifest,
      contractSource: fs.readFileSync(contractPath, 'utf8'), contract,
      testEvidence: test.data, buildEvidence: build.data,
      tarballBuffer: tarBytes, repositoryCommit: SOURCE_SHA,
      packageDirty: false, duplicateImplementations: [],
    };
    const candidate = evaluateReleaseCandidate({
      ...candidateArgs,
      observedState: { schema_version: 1, tags: {}, releases: {}, registry: {}, channels: {} },
    });
    check(candidate.outcome === 'READY' && candidate.candidate,
      'CANONICAL_CANDIDATE_PRECHECK_NONPASS');
    const canonical = evaluateReleaseCandidate({
      ...candidateArgs, observedState: verifiedRemoteState(candidate.candidate),
    });
    check(canonical.outcome === 'PASS' && canonical.idempotent === true
      && canonical.observed?.exact === true,
    'CANONICAL_READ_ONLY_EVALUATION_NONPASS');

    const runId = String(process.env.GITHUB_RUN_ID ?? '');
    check(/^[1-9][0-9]{4,20}$/u.test(runId), 'GITHUB_RUN_ID_MISSING');
    const evidenceDirectory = path.join(root,
      '.delivery/shared-package-releases/vento__contracts/1.0.0-alpha.1');
    fs.mkdirSync(evidenceDirectory, { recursive: true, mode: 0o700 });
    const evidence = {
      schema_version: 1,
      gate_instance: 'SHELL-CI-003::RECOVERY_PHYSICAL_READBACK',
      release_status: 'PASS',
      certification_method: 'AUTHENTICATED_GITLAB_BINARY_READBACK',
      package_name: '@vento/contracts', release_version: '1.0.0-alpha.1',
      source_commit: SOURCE_SHA, runner_commit: process.env.GITHUB_SHA,
      workflow_run_id: runId, tag_name: TAG,
      original_tarball_sha256: 'sha256:' + TAR_SHA,
      downloaded_tarball_sha256: proof.sha256,
      original_sri: TAR_SRI, downloaded_sri: proof.sri,
      registry_metadata_sha1_verified: true,
      registry_metadata_sha512_present: verifiedMetadata.metadata_integrity_present,
      original_and_downloaded_bytes_identical: true,
      private_registry: REGISTRY,
      annotated_tag_verified: true, github_release_metadata_only_verified: true,
      ci001: 'PASS', ci002: 'PASS', ci005: 'PASS',
      ci005_relation: 'PKG-COMP-MX-002', ci005_evidence_identity: compatible,
      canonical_candidate_evaluation: 'PASS_IDEMPOTENT_ALREADY_PUBLISHED',
      remote_write_executed: false, registry_write_tested_this_run: false,
      phases: [
        'GITLAB_EXISTING_VERSION_READ_ONLY',
        'GITLAB_REGISTRY_PROTECTION_VERIFIED',
        'GITLAB_REMOTE_TARBALL_DOWNLOADED_READ_ONLY',
        'GITLAB_SHA1_SHA256_SHA512_AND_BYTES_MATCH',
        'CANONICAL_CANDIDATE_IDEMPOTENT_PASS',
      ],
    };
    const evidencePath = path.join(evidenceDirectory, runId + '.json');
    fs.writeFileSync(evidencePath, JSON.stringify(evidence, null, 2) + '\n',
      { mode: 0o600, flag: 'wx' });
    console.log(JSON.stringify({
      status: 'PASS', phase: 'RECOVER_EXISTING_PRIVATE_NPM_BY_PHYSICAL_READBACK',
      package: PILOT, source_sha: SOURCE_SHA,
      tarball_sha256: proof.sha256, sri: proof.sri,
      metadata_sha512_present: verifiedMetadata.metadata_integrity_present,
      canonical_candidate_evaluation: canonical.outcome,
      registry_write_executed: false, remote_readback_verified: true,
      evidence_file: '.delivery/shared-package-releases/vento__contracts/1.0.0-alpha.1/'
        + runId + '.json',
    }));
  } finally {
    delete process.env.npm_config_userconfig;
    delete process.env.npm_config_ignore_scripts;
    delete process.env.npm_config_provenance;
    delete process.env.npm_config_audit;
    delete process.env.npm_config_fund;
    fs.rmSync(tmp, { recursive: true, force: true });
  }
}

if (process.argv[1] && path.resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  execute().catch(e => {
    const msg = e instanceof Error ? e.message : '';
    console.error(/^VENTO_CI003_RECOVERY:[A-Z0-9_]+$/u.test(msg)
      ? msg : 'VENTO_CI003_RECOVERY:FAILED_CLOSED');
    process.exitCode = 1;
  });
}
