import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { spawnSync } from 'node:child_process';
import { fileURLToPath } from 'node:url';

import {
  evaluateReleaseCandidate, normalizeSyntheticState, runGate,
} from './shared-package-release-gate.mjs';
import {
  auditPrivatePublicationAuthority, packPilotPrivatePreview,
} from './shared-package-release-preparation.mjs';
import { NPM_REGISTRY_URL } from './shared-package-registry-preflight.mjs';

const REPOSITORY = 'vento-group-sas/vento-shell';
const PACKAGE = '@vento/contracts';
const VERSION = '1.0.0-alpha.1';
const SHA = /^[a-f0-9]{40}$/u;
const ROOT = path.resolve(fileURLToPath(new URL('../..', import.meta.url)));
const PACKAGE_ROOT = path.join(ROOT, 'packages/contracts');
const TEST_ROOT = path.join(ROOT, '.delivery/shared-package-tests/vento__contracts');
const BUILD_ROOT = path.join(ROOT, '.delivery/shared-package-builds/vento__contracts');
const RELEASE_ROOT = path.join(ROOT, '.delivery/shared-package-releases');
const REGISTRY_NPMRC = '//gitlab.com/api/v4/projects/87892751/packages/npm/:_authToken=';

function check(condition, code) {
  if (!condition) throw new Error('VENTO_PRIVATE_RELEASE:' + code);
}

function git(args) {
  const result = spawnSync('git', args, {
    cwd: ROOT, encoding: 'utf8', timeout: 30000, windowsHide: true,
    maxBuffer: 1024 * 1024,
  });
  check(!result.error && result.status === 0, 'GIT_PREFLIGHT_FAILED');
  return result.stdout.trim();
}

export function releaseContract(sourceCommit) {
  check(SHA.test(sourceCommit ?? ''), 'SOURCE_SHA_INVALID');
  return {
    schema_version: 1,
    package_name: PACKAGE,
    release_version: VERSION,
    source_commit: sourceCommit,
    release_channel: 'next',
    release_channel_type: 'PRERELEASE',
    execution_mode: 'REAL',
    distribution_change: true,
    release_preview_mode: 'EPHEMERAL_PRIVATE_SOURCE',
    github_repository: REPOSITORY,
    registry_url: NPM_REGISTRY_URL,
    approved_internal_prereleases: [],
    changelog_required: false,
    compatibility_required: false,
  };
}

export function verifyDispatch({
  mode, sourceCommit, expectedSha, githubSha, repository, ref, event,
  confirmation,
} = {}) {
  check(mode === 'prepare' || mode === 'audit' || mode === 'publish',
    'MODE_NOT_ALLOWED');
  check(SHA.test(sourceCommit ?? ''), 'SOURCE_SHA_INVALID');
  check(typeof githubSha !== 'string' || githubSha === sourceCommit,
    'GITHUB_SHA_CHECKOUT_MISMATCH');
  check(typeof repository !== 'string' || repository === REPOSITORY,
    'GITHUB_REPOSITORY_INVALID');
  if (mode !== 'prepare') {
    check(expectedSha === sourceCommit && SHA.test(expectedSha ?? ''),
      'MANUAL_PINNED_SHA_REQUIRED');
    check(repository === REPOSITORY && ref === 'refs/heads/main'
      && event === 'workflow_dispatch', 'PROTECTED_MAIN_MANUAL_ONLY');
    if (mode === 'publish') {
      check(confirmation === PACKAGE + '@' + VERSION,
        'EXACT_PUBLISH_CONFIRMATION_REQUIRED');
    }
  }
  return { mode, source_commit: sourceCommit, package_name: PACKAGE,
    version: VERSION, mutating: mode === 'publish' };
}

export function registryNpmrc(token) {
  check(typeof token === 'string' && /^[A-Za-z0-9_.-]{12,}$/u.test(token),
    'REGISTRY_PUBLISH_TOKEN_INVALID');
  return '@vento:registry=' + NPM_REGISTRY_URL + '\n'
    + REGISTRY_NPMRC + token + '\n';
}

function exactlyOneJson(directory, label) {
  check(fs.existsSync(directory), label + '_DIRECTORY_MISSING');
  const names = fs.readdirSync(directory);
  check(names.length === 1 && /^[A-Za-z0-9-]+\.json$/u.test(names[0]),
    label + '_EVIDENCE_CARDINALITY');
  const filename = path.join(directory, names[0]);
  check(fs.lstatSync(filename).isFile()
    && !fs.lstatSync(filename).isSymbolicLink(), label + '_NONREGULAR');
  return filename;
}

function loadEvidenceJson(filename, label) {
  let value;
  try { value = JSON.parse(fs.readFileSync(filename, 'utf8')); } catch {
    check(false, label + '_JSON_INVALID');
  }
  check(value && typeof value === 'object' && !Array.isArray(value),
    label + '_SCHEMA_INVALID');
  return value;
}

function prevalidateRemoteGit(sourceCommit) {
  const branchLine = git(['ls-remote', 'origin', 'refs/heads/main']);
  const remoteSha = branchLine.split(/\s+/u)[0];
  check(remoteSha === sourceCommit, 'REMOTE_MAIN_MOVED');
  const tagRef = 'refs/tags/vento-pkg/vento__contracts/v' + VERSION;
  const result = spawnSync('git', ['ls-remote', 'origin', tagRef], {
    cwd: ROOT, encoding: 'utf8', timeout: 30000, windowsHide: true,
  });
  check(!result.error && result.status === 0 && !result.stdout.trim(),
    'VERSION_TAG_EXISTS_OR_UNVERIFIED');
}

function writeReleaseNpmrc(directory, token) {
  const filename = path.join(directory, 'private-publish.npmrc');
  fs.writeFileSync(filename, registryNpmrc(token), {
    mode: 0o600, flag: 'wx',
  });
  return filename;
}

function protectNpmEnvironment(filePath) {
  process.env.npm_config_userconfig = filePath;
  process.env.npm_config_ignore_scripts = 'true';
  process.env.npm_config_provenance = 'false';
  process.env.npm_config_audit = 'false';
  process.env.npm_config_fund = 'false';
}

export function releaseEvidenceSummary(evaluation, report) {
  return {
    phase: 'CONTRACTS_PRIVATE_RELEASE_GATE_PREPARATION',
    source_commit: evaluation.candidate?.source_commit ?? null,
    package_name: PACKAGE,
    version: VERSION,
    release_channel: 'next',
    result: evaluation.outcome,
    reasons: evaluation.reasons,
    material_identity_sha256: evaluation.candidate?.material_identity_sha256 ?? null,
    tarball_sha256: evaluation.candidate?.tarball_sha256 ?? null,
    npm_integrity: evaluation.candidate?.pack_integrity ?? null,
    tarball_checks: report?.preview_pack ?? 'NOT_TESTED',
    archived_tarball: false,
    registry_write_tested: false,
    publication_executed: false,
  };
}

export async function executeRelease({
  mode = 'prepare',
  expectedSha = null,
  confirmation = null,
  environment = process.env,
  authorityAudit = auditPrivatePublicationAuthority,
} = {}) {
  const sourceCommit = git(['rev-parse', 'HEAD']);
  verifyDispatch({
    mode, sourceCommit, expectedSha, githubSha: environment.GITHUB_SHA,
    repository: environment.GITHUB_REPOSITORY,
    ref: environment.GITHUB_REF,
    event: environment.GITHUB_EVENT_NAME, confirmation,
  });
  check(git(['status', '--porcelain', '--untracked-files=all', '--',
    'packages/contracts']).length === 0, 'SOURCE_WORKTREE_DIRTY');
  const manifestSource = fs.readFileSync(path.join(PACKAGE_ROOT, 'package.json'), 'utf8');
  const manifest = JSON.parse(manifestSource);
  check(manifest.private === true && manifest.name === PACKAGE
    && manifest.version === VERSION, 'SOURCE_MANIFEST_NOT_PRIVATE_CANONICAL');
  const testEvidencePath = exactlyOneJson(TEST_ROOT, 'CI001');
  const buildEvidencePath = exactlyOneJson(BUILD_ROOT, 'CI002');
  const testEvidence = loadEvidenceJson(testEvidencePath, 'CI001');
  const buildEvidence = loadEvidenceJson(buildEvidencePath, 'CI002');
  check(testEvidence.outcome === 'PASS' && testEvidence.source_commit === sourceCommit
    && buildEvidence.build_status === 'PASS'
    && buildEvidence.source_commit === sourceCommit,
  'CI001_CI002_NOT_CURRENT_PASS');
  const temporaryRoot = fs.mkdtempSync(path.join(os.tmpdir(), 'vento-contracts-private-release-'));
  fs.chmodSync(temporaryRoot, 0o700);
  const contractPath = path.join(temporaryRoot, 'release-contract.json');
  const contract = releaseContract(sourceCommit);
  fs.writeFileSync(contractPath, JSON.stringify(contract, null, 2) + '\n',
    { mode: 0o600 });
  try {
    // packPilotPrivatePreview requires an empty staging directory and keeps all
    // tarballs inside the ephemeral release directory.
    const packRoot = path.join(temporaryRoot, 'package');
    fs.mkdirSync(packRoot, { mode: 0o700 });
    const { tarballPath, report } = packPilotPrivatePreview({
      root: ROOT, temporaryRoot: packRoot, packageName: PACKAGE,
    });
    const contractSource = fs.readFileSync(contractPath, 'utf8');
    const tarballBuffer = fs.readFileSync(tarballPath);
    const evaluation = evaluateReleaseCandidate({
      manifestSource, manifest, contractSource, contract,
      testEvidence, buildEvidence, tarballBuffer,
      repositoryCommit: sourceCommit,
      observedState: normalizeSyntheticState({}),
      packageDirty: false,
    });
    check(evaluation.outcome === 'READY', 'CANDIDATE_NOT_READY_'
      + evaluation.reasons.map((s) => s.replace(/[^A-Z0-9_]/gu, '_')).slice(0, 3).join('_'));
    const prepared = releaseEvidenceSummary(evaluation, report);
    if (mode === 'prepare') return prepared;
    const authority = await authorityAudit({
      token: environment.GITLAB_NPM_PUBLISH_TOKEN,
      registryUrl: environment.GITLAB_NPM_REGISTRY_URL,
      packageName: PACKAGE, version: VERSION,
    });
    check(authority.project_private === true
      && authority.principal_has_maintainer_or_higher === true
      && authority.exact_version_collision === false,
    'PRIVATE_AUTHORITY_NOT_VERIFIED');
    if (mode === 'audit') {
      return { ...prepared, phase: 'PROTECTED_READ_ONLY_AUDIT',
        authority, publication_executed: false };
    }
    check(environment.VENTO_REAL_RELEASE_CONFIRMATION === PACKAGE + '@' + VERSION,
      'REAL_RELEASE_CONFIRMATION_ENV_REQUIRED');
    check(typeof environment.GH_TOKEN === 'string' && environment.GH_TOKEN.length > 20,
      'GITHUB_RELEASE_TOKEN_MISSING');
    prevalidateRemoteGit(sourceCommit);
    git(['config', 'user.name', 'github-actions[bot]']);
    git(['config', 'user.email', '41898282+github-actions[bot]@users.noreply.github.com']);
    const npmrc = writeReleaseNpmrc(temporaryRoot,
      environment.GITLAB_NPM_PUBLISH_TOKEN);
    protectNpmEnvironment(npmrc);
    // The gate is the single writer: annotated tag, public metadata-only
    // release, then private GitLab npm; it reads the exact packed bytes again.
    const gate = runGate({
      packageRoot: PACKAGE_ROOT, contractPath,
      testEvidencePath, buildEvidencePath, tarballPath,
      evidenceRoot: RELEASE_ROOT, allowRealRelease: true,
    });
    check(gate.evidence.release_status === 'PASS',
      'REAL_GATE_NONPASS');
    return {
      phase: 'PRIVATE_GITLAB_NPM_RELEASE_VERIFIED',
      package_name: PACKAGE,
      version: VERSION,
      source_commit: sourceCommit,
      release_status: 'PASS',
      material_identity_sha256: gate.evidence.material_identity_sha256,
      phases: gate.evidence.phases,
      publication_executed: true,
      evidence_path: path.relative(ROOT, gate.evidencePath).replaceAll('\\', '/'),
      tarball_sha256: gate.evidence.tarball_sha256,
      npm_integrity: gate.evidence.pack_integrity,
    };
  } finally {
    delete process.env.npm_config_userconfig;
    fs.rmSync(temporaryRoot, { recursive: true, force: true });
  }
}

function parseArgs(argv) {
  const args = { mode: 'prepare', expectedSha: null, confirmation: null };
  for (let i = 0; i < argv.length; i += 1) {
    if (['--mode', '--expected-sha', '--confirmation'].includes(argv[i])) {
      check(i + 1 < argv.length, 'ARGUMENT_VALUE_REQUIRED');
      const flag = argv[i];
      const val = argv[++i];
      if (flag === '--mode') args.mode = val;
      else if (flag === '--expected-sha') args.expectedSha = val;
      else args.confirmation = val;
    } else check(false, 'UNEXPECTED_ARGUMENT');
  }
  return args;
}

async function main() {
  try {
    const result = await executeRelease(parseArgs(process.argv.slice(2)));
    console.log(JSON.stringify(result, null, 2));
  } catch (error) {
    // Preserve a safe, actionable error code; never print untrusted network
    // bodies, subprocess stderr, npm headers, token content or raw exceptions.
    const message = error instanceof Error ? error.message : '';
    const trusted = message.match(/^(?:VENTO_PRIVATE_RELEASE|VENTO_NPM_RELEASE_PREP):[A-Z0-9_]+/u);
    console.error(trusted?.[0] ?? 'VENTO_PRIVATE_RELEASE:REMOTE_OPERATION_FAILED_OR_UNVERIFIED');
    process.exitCode = 1;
  }
}
if (process.argv[1] && path.resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  main();
}
