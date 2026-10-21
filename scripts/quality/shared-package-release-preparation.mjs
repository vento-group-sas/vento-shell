import { createHash } from 'node:crypto';
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { spawnSync } from 'node:child_process';
import { fileURLToPath } from 'node:url';
import {
  detectSecretsInTarball, parseSemver, readTarEntries,
  releasePreviewManifest, tagForPackageVersion,
} from './shared-package-release-gate.mjs';
import { NPM_REGISTRY_URL, PACKAGE_LOCATIONS, queryGitLabPackages } from './shared-package-registry-preflight.mjs';

const ROOT = path.resolve(fileURLToPath(new URL('../..', import.meta.url)));
const PROTECTION_URL = 'https://gitlab.com/api/v4/projects/87892751/packages/protection/rules';
const SHA = /^[0-9a-f]{40}$/u;
const MIN_ROLES = new Set(['maintainer', 'owner', 'admin']);

function check(ok, code) {
  if (!ok) throw new Error('VENTO_NPM_RELEASE_PREP:' + code);
}
export { releasePreviewManifest };

function safeDist(root) {
  const stat = fs.lstatSync(root);
  check(stat.isDirectory() && !stat.isSymbolicLink(), 'DIST_UNSAFE');
  for (const entry of fs.readdirSync(root, { withFileTypes: true })) {
    const full = path.join(root, entry.name);
    const child = fs.lstatSync(full);
    check(!child.isSymbolicLink(), 'SYMLINK_IN_DIST');
    if (child.isDirectory()) safeDist(full);
    else check(child.isFile(), 'NONREGULAR_DIST_ENTRY');
  }
}

function npmPack(staging, output, userconfig) {
  const cli = process.env.npm_execpath;
  const bin = cli ? process.execPath : process.platform === 'win32' ? 'npm.cmd' : 'npm';
  const args = [...(cli ? [cli] : []), 'pack', staging, '--offline',
    '--ignore-scripts', '--json', '--pack-destination', output];
  const result = spawnSync(bin, args, {
    cwd: output, encoding: 'utf8', timeout: 180000, windowsHide: true,
    maxBuffer: 8 * 1024 * 1024,
    env: { ...process.env, npm_config_userconfig: userconfig,
      npm_config_registry: 'https://registry.npmjs.org/', npm_config_ignore_scripts: 'true' },
  });
  // Never print npm stderr, which might include local credential paths.
  check(!result.error && result.status === 0, 'OFFLINE_NPM_PACK_FAILED');
  let rows;
  try { rows = JSON.parse(result.stdout); } catch { check(false, 'PACK_JSON_INVALID'); }
  check(Array.isArray(rows) && rows.length === 1, 'PACK_CARDINALITY');
  return rows[0];
}

export function verifyPreview({ bytes, metadata, preview, targets }) {
  check(Buffer.isBuffer(bytes) && bytes.length > 0, 'EMPTY_ARCHIVE');
  check(metadata?.name === preview.name && metadata?.version === preview.version,
    'PACK_IDENTITY_MISMATCH');
  const entries = readTarEntries(bytes);
  const names = entries.map((entry) => entry.path);
  check(names.length > 0 && new Set(names).size === names.length, 'DUPLICATE_ARCHIVE_ENTRY');
  check(names.every((name) => name === 'package/package.json'
    || name === 'package/README.md'
    || /^package\/dist\/[A-Za-z0-9_./-]+$/u.test(name)
      && !name.includes('..')), 'ARCHIVE_ALLOWLIST_FAILED');
  check(targets.every((target) => names.includes('package/' + target)),
    'EXPORTED_OUTPUT_NOT_PACKED');
  let actual;
  try {
    const entry = entries.find((x) => x.path === 'package/package.json');
    actual = JSON.parse(entry.content.toString('utf8'));
  } catch { check(false, 'ARCHIVE_MANIFEST_INVALID'); }
  check(actual.name === preview.name && actual.version === preview.version
    && actual.private === false
    && actual.publishConfig?.registry === NPM_REGISTRY_URL
    && !Object.hasOwn(actual, 'scripts') && !Object.hasOwn(actual, 'bin'),
  'ARCHIVE_MANIFEST_UNSAFE');
  check(detectSecretsInTarball(bytes).length === 0, 'TARBALL_SECRET_FOUND');
  const integrity = 'sha512-' + createHash('sha512').update(bytes).digest('base64');
  check(metadata.integrity === integrity, 'TARBALL_INTEGRITY_MISMATCH');
  const listed = metadata.files?.map((item) => 'package/' + item.path);
  check(Array.isArray(listed) && listed.length === names.length
    && listed.every((name) => names.includes(name)), 'ARCHIVE_FILE_LIST_MISMATCH');
  return {
    name: preview.name, version: preview.version,
    channel: parseSemver(preview.version).prerelease ? 'PRERELEASE' : 'STABLE',
    proposed_tag: tagForPackageVersion(preview.name, preview.version),
    sha256: createHash('sha256').update(bytes).digest('hex'),
    integrity, file_count: names.length, checked_exports: targets.length,
    source_private_unchanged: true, preview_private: false, preview_pack: 'PASS',
    publication_executed: false, release_certified: false,
  };
}

export function stagePreviews({ root = ROOT, sourceCommit = process.env.GITHUB_SHA } = {}) {
  check(SHA.test(String(sourceCommit)), 'SOURCE_COMMIT_REQUIRED');
  const temp = fs.mkdtempSync(path.join(os.tmpdir(), 'vento-release-prep-'));
  fs.chmodSync(temp, 0o700);
  try {
    const archiveRoot = path.join(temp, 'archives');
    fs.mkdirSync(archiveRoot);
    const userconfig = path.join(temp, 'empty.npmrc');
    fs.writeFileSync(userconfig, '', { mode: 0o600 });
    const results = [];
    for (const target of PACKAGE_LOCATIONS) {
      const pkg = path.join(root, 'packages', target.directory);
      const sourcePath = path.join(pkg, 'package.json');
      const raw = fs.readFileSync(sourcePath);
      const sourceHash = createHash('sha256').update(raw).digest('hex');
      const { preview, targets } = releasePreviewManifest(JSON.parse(raw.toString('utf8')));
      check(preview.name === target.name, 'LOCATION_NAME_MISMATCH');
      safeDist(path.join(pkg, 'dist'));
      const staging = path.join(temp, 'stage-' + target.directory);
      fs.mkdirSync(staging);
      fs.cpSync(path.join(pkg, 'dist'), path.join(staging, 'dist'), { recursive: true });
      const readme = path.join(pkg, 'README.md');
      if (fs.existsSync(readme)) {
        check(fs.lstatSync(readme).isFile(), 'README_UNSAFE');
        fs.copyFileSync(readme, path.join(staging, 'README.md'));
      }
      fs.writeFileSync(path.join(staging, 'package.json'),
        JSON.stringify(preview, null, 2) + '\n');
      const meta = npmPack(staging, archiveRoot, userconfig);
      const archive = path.resolve(archiveRoot, String(meta.filename ?? ''));
      check(path.dirname(archive) === archiveRoot && fs.statSync(archive).isFile(),
        'ARCHIVE_PATH_UNSAFE');
      results.push(verifyPreview({ bytes: fs.readFileSync(archive),
        metadata: meta, preview, targets }));
      check(createHash('sha256').update(fs.readFileSync(sourcePath)).digest('hex')
        === sourceHash, 'SOURCE_MANIFEST_MUTATED');
    }
    return { phase: 'PREPARATION_ONLY', source_commit: sourceCommit,
      registry: NPM_REGISTRY_URL, packages: results,
      token_publish_permission: 'NOT_TESTED', collision_audit: 'NOT_EXECUTED',
      artifacts_persisted: false, publication_executed: false,
      release_certified: false };
  } finally {
    fs.rmSync(temp, { recursive: true, force: true });
  }
}

function matches(name, pattern) {
  if (pattern === name || pattern === '@vento/*') return true;
  // Unknown wildcard forms are not used to claim protection.
  return false;
}
export function assessProtectionRules(rows) {
  check(Array.isArray(rows) && rows.length <= 200, 'PROTECTION_RESPONSE_INVALID');
  const npm = rows.filter((item) => item?.package_type === 'npm');
  const packages = PACKAGE_LOCATIONS.map((item) => {
    const rules = npm.filter((r) => matches(item.name, r.package_name_pattern));
    check(rules.length > 0, 'MISSING_NPM_PROTECTION:' + item.name);
    check(rules.every((r) => MIN_ROLES.has(r.minimum_access_level_for_push)),
      'PROTECTION_ROLE_TOO_WEAK:' + item.name);
    return { name: item.name, protected: true,
      push_roles: [...new Set(rules.map((r) => r.minimum_access_level_for_push))].sort() };
  });
  return { phase: 'READ_ONLY_PROTECTION_AUDIT', registry: NPM_REGISTRY_URL,
    protection_rules_seen: npm.length, packages,
    read_authentication: 'PASS', token_publish_permission: 'NOT_TESTED',
    publication_executed: false, release_certified: false };
}
export async function auditProtectionRules({
  token = process.env.GITLAB_NPM_PUBLISH_TOKEN,
  registryUrl = process.env.GITLAB_NPM_REGISTRY_URL,
  fetchImpl = fetch,
} = {}) {
  check(registryUrl === NPM_REGISTRY_URL, 'REGISTRY_ENDPOINT_MISMATCH');
  check(typeof token === 'string' && token.trim(), 'TOKEN_MISSING');
  let response;
  try {
    response = await fetchImpl(PROTECTION_URL, {
      method: 'GET', redirect: 'error',
      headers: { 'PRIVATE-TOKEN': token, Accept: 'application/json' },
      signal: AbortSignal.timeout(15000),
    });
  } catch { check(false, 'PROTECTION_REQUEST_FAILED'); }
  check(response?.ok === true, 'PROTECTION_HTTP_' + String(response?.status ?? 'UNKNOWN'));
  let rules;
  try { rules = await response.json(); } catch { check(false, 'PROTECTION_JSON_INVALID'); }
  return assessProtectionRules(rules);
}

const PRIVATE_GITLAB_PROJECT = 'https://gitlab.com/api/v4/projects/87892751';
const GITLAB_API = 'https://gitlab.com/api/v4/';
const PILOT_PACKAGE = '@vento/contracts';
const PILOT_VERSION = '1.0.0-alpha.1';

async function readGitLabJson(endpoint, token, fetchImpl, errorPrefix) {
  check(endpoint.startsWith(GITLAB_API) && !endpoint.includes('?')
    && !endpoint.includes('#'), 'UNSAFE_GITLAB_ENDPOINT');
  let response;
  try {
    response = await fetchImpl(endpoint, {
      method: 'GET', redirect: 'error',
      headers: { 'PRIVATE-TOKEN': token, Accept: 'application/json' },
      signal: AbortSignal.timeout(15000),
    });
  } catch {
    check(false, errorPrefix + '_UNAVAILABLE');
  }
  check(response?.ok === true,
    errorPrefix + '_HTTP_' + String(response?.status ?? 'UNKNOWN'));
  let data;
  try { data = await response.json(); } catch { check(false, errorPrefix + '_JSON_INVALID'); }
  check(data && typeof data === 'object' && !Array.isArray(data),
    errorPrefix + '_RESPONSE_INVALID');
  return data;
}

// Read-only authority audit. GET rights alone do NOT prove npm publish worked;
// they prove the principal satisfies project visibility, role and token scope
// preconditions for a controlled first publication.
export async function auditPrivatePublicationAuthority({
  token = process.env.GITLAB_NPM_PUBLISH_TOKEN,
  registryUrl = process.env.GITLAB_NPM_REGISTRY_URL,
  packageName = PILOT_PACKAGE,
  version = PILOT_VERSION,
  fetchImpl = fetch,
} = {}) {
  check(registryUrl === NPM_REGISTRY_URL, 'REGISTRY_ENDPOINT_MISMATCH');
  check(typeof token === 'string' && token.trim(), 'TOKEN_MISSING');
  check(packageName === PILOT_PACKAGE && version === PILOT_VERSION,
    'PILOT_IDENTITY_NOT_AUTHORIZED');
  const project = await readGitLabJson(PRIVATE_GITLAB_PROJECT, token, fetchImpl,
    'PROJECT');
  check(project.id === 87892751 && project.visibility === 'private'
    && project.archived !== true && project.packages_enabled !== false,
  'PROJECT_PRIVACY_OR_PACKAGE_ACCESS_INVALID');
  const identity = await readGitLabJson(GITLAB_API + 'user', token, fetchImpl,
    'TOKEN_USER');
  check(Number.isSafeInteger(identity.id) && identity.id > 0
    && identity.state === 'active', 'TOKEN_USER_INACTIVE');
  const tokenInfo = await readGitLabJson(
    GITLAB_API + 'personal_access_tokens/self', token, fetchImpl, 'TOKEN_SELF');
  check(tokenInfo.user_id === identity.id && tokenInfo.active === true
    && tokenInfo.revoked === false && Array.isArray(tokenInfo.scopes)
    && tokenInfo.scopes.includes('api'), 'TOKEN_SCOPE_OR_STATE_INSUFFICIENT');
  if (typeof tokenInfo.expires_at === 'string') {
    check(/^\d{4}-\d{2}-\d{2}$/u.test(tokenInfo.expires_at)
      && tokenInfo.expires_at >= new Date().toISOString().slice(0, 10),
    'TOKEN_EXPIRED_OR_DATE_INVALID');
  }
  const membership = await readGitLabJson(
    PRIVATE_GITLAB_PROJECT + '/members/all/' + String(identity.id),
    token, fetchImpl, 'PROJECT_MEMBER');
  check(membership.id === identity.id && membership.state === 'active'
    && Number.isInteger(membership.access_level)
    && membership.access_level >= 40,
  'PROJECT_MAINTAINER_ROLE_REQUIRED');
  if (typeof membership.expires_at === 'string') {
    check(/^\d{4}-\d{2}-\d{2}$/u.test(membership.expires_at)
      && membership.expires_at >= new Date().toISOString().slice(0, 10),
    'PROJECT_MEMBERSHIP_EXPIRED');
  }
  const protection = await auditProtectionRules({ token, registryUrl, fetchImpl });
  check(protection.packages.some((item) => item.name === packageName
    && item.protected === true), 'PILOT_PROTECTION_INVALID');
  const rows = await queryGitLabPackages({ token, registryUrl, fetchImpl });
  check(!rows.some((item) => item.name === packageName && item.version === version),
    'EXACT_PACKAGE_VERSION_COLLISION');
  return {
    phase: 'PRIVATE_PUBLICATION_AUTHORITY_READ_ONLY',
    source_registry: NPM_REGISTRY_URL,
    project_private: true,
    package_registry_enabled: true,
    token_scope_api: true,
    token_active: true,
    principal_has_maintainer_or_higher: true,
    npm_protection_pass: true,
    exact_version_collision: false,
    version,
    package_name: packageName,
    publication_executed: false,
    token_publish_permission: 'PRECONDITIONS_VERIFIED_NOT_WRITE_TESTED',
  };
}

async function main() {
  const [mode, extra] = process.argv.slice(2);
  check(!extra, 'EXTRA_CLI_ARGUMENT');
  const result = mode === 'stage' ? stagePreviews()
    : mode === 'protection' ? await auditProtectionRules()
      : null;
  check(result !== null, 'USAGE_STAGE_OR_PROTECTION');
  console.log(JSON.stringify(result, null, 2));
}
if (process.argv[1] && path.resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  main().catch((e) => {
    console.error(e instanceof Error ? e.message : 'VENTO_NPM_RELEASE_PREP:UNKNOWN');
    process.exitCode = 1;
  });
}
