import crypto from 'node:crypto';
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import zlib from 'node:zlib';
import {
  asSha256Identity as qualityAsSha256Identity,
  readJson as qualityReadJson,
  sha256 as qualitySha256,
  spawnUtf8 as qualitySpawnUtf8,
  stableStringify as qualityStableStringify,
  writePrettyJson as qualityWritePrettyJson,
} from './quality-primitives.mjs';

export const CANONICAL_SHARED_PACKAGES = Object.freeze([
  '@vento/contracts',
  '@vento/os-context',
  '@vento/supabase',
  '@vento/ui-web',
]);

export const RELEASE_GATE_INSTANCE_ID = 'SHELL-CI-003::GLOBAL';
export const RELEASE_CONTRACT_SCHEMA_VERSION = 1;
export const RELEASE_EVIDENCE_SCHEMA_VERSION = 1;
export const SYNTHETIC_STATE_SCHEMA_VERSION = 1;
export const IMPLEMENTATION_FILENAME = 'shared-package-release-gate.mjs';
export const IMPLEMENTATION_RELATIVE_PATH = `scripts/quality/${IMPLEMENTATION_FILENAME}`;

const TEST_GATE_INSTANCE_ID = 'SHELL-CI-001::GLOBAL';
const BUILD_GATE_INSTANCE_ID = 'SHELL-CI-002::GLOBAL';
const RELEASE_FINAL_STATES = new Set(['PASS', 'FAIL', 'BLOCKED', 'CANCELLED', 'TIMED_OUT', 'STALE']);
const CHANNEL_TYPES = new Set(['STABLE', 'PRERELEASE']);
const EXECUTION_MODES = new Set(['SYNTHETIC', 'REAL']);
const SENSITIVE_KEY_PATTERN = /(authorization|cookie|credential|password|secret|token|api[_-]?key|private[_-]?key|service[_-]?role)/iu;
const TEXT_SECRET_PATTERN = /\b(?:password|secret|token|api[_-]?key|private[_-]?key)\s*[:=]\s*["']?[^\s"']{8,}/iu;
const HARD_SECRET_PATTERNS = Object.freeze([
  /\bgh[pousr]_[A-Za-z0-9_]{24,}\b/u,
  /\bAKIA[0-9A-Z]{16}\b/u,
  /\bsk_(?:live|test)_[A-Za-z0-9]{20,}\b/u,
  /-----BEGIN (?:RSA |EC |OPENSSH )?PRIVATE KEY-----/u,
]);
const SEMVER_PATTERN = /^(0|[1-9]\d*)\.(0|[1-9]\d*)\.(0|[1-9]\d*)(?:-([0-9A-Za-z-]+(?:\.[0-9A-Za-z-]+)*))?(?:\+([0-9A-Za-z-]+(?:\.[0-9A-Za-z-]+)*))?$/u;
const COMMIT_PATTERN = /^[0-9a-f]{40}$/u;
const MATERIAL_IDENTITY_FIELDS = Object.freeze([
  'package_name',
  'release_version',
  'source_commit',
  'package_manifest_hash',
  'lockfile_hash',
  'resolved_internal_dependency_set',
  'test_evidence_identity',
  'build_evidence_identity',
  'artifact_file_manifest_identity',
  'artifact_content_hash',
  'pack_integrity',
  'release_channel',
  'release_channel_type',
  'release_contract_identity',
  'tag_serialization_identity',
  'gate_implementation_identity',
]);

function nonEmptyString(value) {
  return typeof value === 'string' && value.trim().length > 0;
}

function isPlainObject(value) {
  return value !== null && typeof value === 'object' && !Array.isArray(value);
}

function unique(values) {
  return [...new Set(values)];
}

function normalizePath(value) {
  return String(value).replaceAll('\\', '/');
}



export function stableStringify(value) {
  return qualityStableStringify(value);
}

export function sha256(value) {
  return qualitySha256(value);
}

export function asSha256Identity(value) {
  return qualityAsSha256Identity(value);
}

export function sriSha512(value) {
  const buffer = Buffer.isBuffer(value) ? value : Buffer.from(String(value), 'utf8');
  return `sha512-${crypto.createHash('sha512').update(buffer).digest('base64')}`;
}

function readJson(filePath, label) {
  return qualityReadJson(filePath, label);
}

function writeJsonAtomic(filePath, value) {
  fs.mkdirSync(path.dirname(filePath), { recursive: true });
  const tempPath = `${filePath}.${process.pid}.${crypto.randomUUID()}.tmp`;
  fs.writeFileSync(tempPath, `${JSON.stringify(value, null, 2)}\n`, 'utf8');
  fs.renameSync(tempPath, filePath);
}

function run(command, args, options = {}) {
  return qualitySpawnUtf8(command, args, options);
}

function runChecked(command, args, options = {}) {
  const result = run(command, args, options);
  if (result.error || result.status !== 0) {
    const reason = result.error?.message ?? result.stderr?.trim() ?? `exit=${result.status}`;
    throw new Error(`${command} ${args.join(' ')} failed: ${reason}`);
  }
  return result.stdout.trim();
}

function npmCliInvocation(args) {
  const candidates = [
    process.env.npm_execpath,
    path.join(path.dirname(process.execPath), 'node_modules', 'npm', 'bin', 'npm-cli.js'),
    path.join(path.dirname(path.dirname(process.execPath)), 'lib', 'node_modules', 'npm', 'bin', 'npm-cli.js'),
  ].filter(nonEmptyString);
  for (const candidate of candidates) {
    if (fs.existsSync(candidate)) {
      return { command: process.execPath, args: [candidate, ...args], shell: false };
    }
  }
  return {
    command: process.platform === 'win32' ? 'npm.cmd' : 'npm',
    args,
    shell: process.platform === 'win32',
  };
}

function runNpm(args, options = {}) {
  const invocation = npmCliInvocation(args);
  return run(invocation.command, invocation.args, { ...options, shell: invocation.shell });
}

function runNpmChecked(args, options = {}) {
  const invocation = npmCliInvocation(args);
  return runChecked(invocation.command, invocation.args, { ...options, shell: invocation.shell });
}

function git(repositoryRoot, args) {
  const result = run('git', args, { cwd: repositoryRoot });
  if (result.error || result.status !== 0) return null;
  return result.stdout.trim();
}

function resolveRepositoryRoot(startPath) {
  const root = git(startPath, ['rev-parse', '--show-toplevel']);
  if (!root) throw new Error('Cannot resolve Git repository root.');
  return path.resolve(root);
}

function currentCommit(repositoryRoot) {
  const commit = git(repositoryRoot, ['rev-parse', 'HEAD']);
  if (!commit) throw new Error('Cannot resolve source commit.');
  return commit;
}

function packageWorktreeChanges(repositoryRoot, packageRoot) {
  const relative = normalizePath(path.relative(repositoryRoot, packageRoot));
  return git(repositoryRoot, ['status', '--porcelain', '--untracked-files=all', '--', relative]) ?? '';
}

export function parseSemver(version) {
  if (!nonEmptyString(version)) return null;
  const match = version.match(SEMVER_PATTERN);
  if (!match) return null;
  return {
    raw: version,
    major: Number(match[1]),
    minor: Number(match[2]),
    patch: Number(match[3]),
    prerelease: match[4] ?? null,
    build: match[5] ?? null,
  };
}

export function packageSlug(packageName) {
  if (!CANONICAL_SHARED_PACKAGES.includes(packageName)) throw new Error(`Unknown canonical package: ${packageName}`);
  return packageName.slice(1).replaceAll('/', '__');
}

export function tagForPackageVersion(packageName, version) {
  if (!parseSemver(version)) throw new Error(`Invalid SemVer for tag serialization: ${version}`);
  return `vento-pkg/${packageSlug(packageName)}/v${version}`;
}

export function tagSerializationIdentity() {
  return asSha256Identity('vento-pkg/<scope__name>/v<semver>;v1');
}

function implementationIdentity() {
  return asSha256Identity(fs.readFileSync(fileURLToPath(import.meta.url)));
}

function normalizeDependencySet(values) {
  if (!Array.isArray(values)) return [];
  return values.map((entry) => ({
    name: String(entry?.name ?? ''),
    range: String(entry?.range ?? entry?.version ?? ''),
    section: String(entry?.section ?? ''),
  })).sort((left, right) => {
    const name = left.name.localeCompare(right.name);
    return name || left.section.localeCompare(right.section) || left.range.localeCompare(right.range);
  });
}

export function collectInternalDependencies(manifest) {
  const entries = [];
  for (const section of ['dependencies', 'optionalDependencies', 'peerDependencies']) {
    const dependencies = isPlainObject(manifest?.[section]) ? manifest[section] : {};
    for (const [name, range] of Object.entries(dependencies)) {
      if (!name.startsWith('@vento/')) continue;
      entries.push({ name, range: String(range), section });
    }
  }
  return normalizeDependencySet(entries);
}

function exactInternalDependencyVersion(range) {
  return parseSemver(range)?.raw ?? null;
}

function compareDependencySets(left, right) {
  return stableStringify(normalizeDependencySet(left)) === stableStringify(normalizeDependencySet(right));
}

export function validateReleaseContract(contract, { manifest } = {}) {
  const errors = [];
  if (!isPlainObject(contract)) return ['CONTRACT_NOT_OBJECT'];
  if (contract.schema_version !== RELEASE_CONTRACT_SCHEMA_VERSION) errors.push('CONTRACT_SCHEMA_VERSION_UNSUPPORTED');
  if (!CANONICAL_SHARED_PACKAGES.includes(contract.package_name)) errors.push('PACKAGE_NOT_CANONICAL');
  if (!parseSemver(contract.release_version)) errors.push('RELEASE_VERSION_INVALID');
  if (!COMMIT_PATTERN.test(String(contract.source_commit ?? ''))) errors.push('SOURCE_COMMIT_INVALID');
  if (!nonEmptyString(contract.release_channel)) errors.push('RELEASE_CHANNEL_MISSING');
  if (!CHANNEL_TYPES.has(contract.release_channel_type)) errors.push('RELEASE_CHANNEL_TYPE_INVALID');
  if (!EXECUTION_MODES.has(contract.execution_mode)) errors.push('EXECUTION_MODE_INVALID');
  if (contract.distribution_change !== true) errors.push('DISTRIBUTION_CHANGE_REQUIRED');
  if (contract.changelog_required === true && !nonEmptyString(contract.changelog_identity)) {
    errors.push('CHANGELOG_IDENTITY_REQUIRED');
  }
  if (contract.compatibility_required === true && !nonEmptyString(contract.compatibility_evidence_identity)) {
    errors.push('COMPATIBILITY_EVIDENCE_REQUIRED');
  }
  if (!Array.isArray(contract.approved_internal_prereleases ?? [])) errors.push('APPROVED_INTERNAL_PRERELEASES_INVALID');
  if (contract.execution_mode === 'REAL') {
    if (!nonEmptyString(contract.github_repository)) errors.push('GITHUB_REPOSITORY_REQUIRED');
    if (!nonEmptyString(contract.registry_url)) errors.push('REGISTRY_URL_REQUIRED');
  }
  if (manifest) {
    if (manifest.name !== contract.package_name) errors.push('MANIFEST_PACKAGE_MISMATCH');
    if (manifest.version !== contract.release_version) errors.push('MANIFEST_VERSION_MISMATCH');
    const semver = parseSemver(contract.release_version);
    if (semver) {
      if (semver.prerelease && contract.release_channel_type !== 'PRERELEASE') errors.push('PRERELEASE_CHANNEL_MISMATCH');
      if (!semver.prerelease && contract.release_channel_type !== 'STABLE') errors.push('STABLE_CHANNEL_MISMATCH');
    }
    for (const dependency of collectInternalDependencies(manifest)) {
      const exact = exactInternalDependencyVersion(dependency.range);
      if (!exact) errors.push(`INTERNAL_DEPENDENCY_NOT_EXACT:${dependency.name}`);
      else if (!parseSemver(contract.release_version)?.prerelease && parseSemver(exact)?.prerelease) {
        const approved = (contract.approved_internal_prereleases ?? []).some((entry) => (
          entry?.name === dependency.name && entry?.version === exact
        ));
        if (!approved) errors.push(`UNAUTHORIZED_INTERNAL_PRERELEASE:${dependency.name}@${exact}`);
      }
    }
  }
  return unique(errors);
}

function validateTestEvidence(evidence, expected) {
  const errors = [];
  if (!isPlainObject(evidence)) return ['TEST_EVIDENCE_NOT_OBJECT'];
  if (evidence.gate_instance !== TEST_GATE_INSTANCE_ID) errors.push('TEST_EVIDENCE_GATE_INVALID');
  if (evidence.outcome !== 'PASS') errors.push('TEST_EVIDENCE_NOT_PASS');
  if (evidence.invalidation_reason) errors.push('TEST_EVIDENCE_STALE');
  if (evidence.package !== expected.package_name) errors.push('TEST_EVIDENCE_PACKAGE_MISMATCH');
  if (evidence.candidate_version !== expected.release_version) errors.push('TEST_EVIDENCE_VERSION_MISMATCH');
  if (evidence.source_commit !== expected.source_commit) errors.push('TEST_EVIDENCE_COMMIT_MISMATCH');
  if (evidence.manifest_identity !== expected.package_manifest_hash) errors.push('TEST_EVIDENCE_MANIFEST_MISMATCH');
  if (!compareDependencySets(evidence.internal_dependency_set, expected.internal_dependencies)) {
    errors.push('TEST_EVIDENCE_DEPENDENCY_SET_MISMATCH');
  }
  return unique(errors);
}

function validateBuildEvidence(evidence, expected) {
  const errors = [];
  if (!isPlainObject(evidence)) return ['BUILD_EVIDENCE_NOT_OBJECT'];
  if (evidence.gate_instance !== BUILD_GATE_INSTANCE_ID) errors.push('BUILD_EVIDENCE_GATE_INVALID');
  if (evidence.build_status !== 'PASS') errors.push('BUILD_EVIDENCE_NOT_PASS');
  if (evidence.invalidation_reason) errors.push('BUILD_EVIDENCE_STALE');
  if (evidence.package_name !== expected.package_name) errors.push('BUILD_EVIDENCE_PACKAGE_MISMATCH');
  if (evidence.package_candidate_version !== expected.release_version) errors.push('BUILD_EVIDENCE_VERSION_MISMATCH');
  if (evidence.source_commit !== expected.source_commit) errors.push('BUILD_EVIDENCE_COMMIT_MISMATCH');
  if (evidence.package_manifest_hash !== expected.package_manifest_hash) errors.push('BUILD_EVIDENCE_MANIFEST_MISMATCH');
  if (!compareDependencySets(evidence.resolved_internal_dependency_set, expected.internal_dependencies)) {
    errors.push('BUILD_EVIDENCE_DEPENDENCY_SET_MISMATCH');
  }
  if (!nonEmptyString(evidence.artifact_content_hash)) errors.push('BUILD_EVIDENCE_ARTIFACT_HASH_MISSING');
  if (!nonEmptyString(evidence.pack_integrity)) errors.push('BUILD_EVIDENCE_PACK_INTEGRITY_MISSING');
  if (!Array.isArray(evidence.artifact_file_manifest)) errors.push('BUILD_EVIDENCE_FILE_MANIFEST_INVALID');
  return unique(errors);
}

function parseTarOctal(buffer) {
  const source = buffer.toString('utf8').replace(/\0.*$/u, '').trim();
  if (!source) return 0;
  return Number.parseInt(source, 8);
}

export function readTarEntries(tarballBuffer) {
  const raw = tarballBuffer[0] === 0x1f && tarballBuffer[1] === 0x8b
    ? zlib.gunzipSync(tarballBuffer)
    : tarballBuffer;
  const entries = [];
  let offset = 0;
  while (offset + 512 <= raw.length) {
    const header = raw.subarray(offset, offset + 512);
    if (header.every((byte) => byte === 0)) break;
    const name = header.subarray(0, 100).toString('utf8').replace(/\0.*$/u, '');
    const prefix = header.subarray(345, 500).toString('utf8').replace(/\0.*$/u, '');
    const fullName = normalizePath(prefix ? `${prefix}/${name}` : name);
    const size = parseTarOctal(header.subarray(124, 136));
    const type = String.fromCharCode(header[156] || 48);
    const bodyStart = offset + 512;
    const bodyEnd = bodyStart + size;
    if (bodyEnd > raw.length) throw new Error('Malformed tarball: entry exceeds archive length.');
    if (type === '0' || type === '\0') entries.push({ path: fullName, content: raw.subarray(bodyStart, bodyEnd) });
    offset = bodyStart + Math.ceil(size / 512) * 512;
  }
  return entries;
}

export function detectSecretsInTarball(tarballBuffer) {
  const findings = [];
  let entries;
  try {
    entries = readTarEntries(tarballBuffer);
  } catch {
    return ['TARBALL_UNREADABLE_FOR_SECRET_SCAN'];
  }
  for (const entry of entries) {
    if (entry.content.length > 5 * 1024 * 1024) continue;
    const text = entry.content.toString('utf8');
    if (TEXT_SECRET_PATTERN.test(text) || HARD_SECRET_PATTERNS.some((pattern) => pattern.test(text))) {
      findings.push(entry.path);
    }
  }
  return unique(findings);
}

function emptySyntheticState() {
  return {
    schema_version: SYNTHETIC_STATE_SCHEMA_VERSION,
    tags: {},
    releases: {},
    registry: {},
    channels: {},
  };
}

export function normalizeSyntheticState(state) {
  if (!isPlainObject(state)) return emptySyntheticState();
  return {
    schema_version: SYNTHETIC_STATE_SCHEMA_VERSION,
    tags: isPlainObject(state.tags) ? state.tags : {},
    releases: isPlainObject(state.releases) ? state.releases : {},
    registry: isPlainObject(state.registry) ? state.registry : {},
    channels: isPlainObject(state.channels) ? state.channels : {},
  };
}

function registryKey(packageName, version) {
  return `${packageName}@${version}`;
}

function expectedPublishedIdentity(candidate) {
  return {
    package_name: candidate.package_name,
    release_version: candidate.release_version,
    source_commit: candidate.source_commit,
    tag_name: candidate.tag_name,
    artifact_sha256: candidate.tarball_sha256,
    pack_integrity: candidate.pack_integrity,
    release_channel: candidate.release_channel,
  };
}

function exactRecord(record, expected) {
  return isPlainObject(record) && Object.entries(expected).every(([key, value]) => record[key] === value);
}

export function inspectObservedState(candidate, state) {
  const normalized = normalizeSyntheticState(state);
  const expected = expectedPublishedIdentity(candidate);
  const tag = normalized.tags[candidate.tag_name] ?? null;
  const release = normalized.releases[candidate.tag_name] ?? null;
  const registry = normalized.registry[registryKey(candidate.package_name, candidate.release_version)] ?? null;
  const conflicts = [];
  if (tag && !exactRecord(tag, expected)) conflicts.push('TAG_IDENTITY_CONFLICT');
  if (release && !exactRecord(release, expected)) conflicts.push('REMOTE_RELEASE_IDENTITY_CONFLICT');
  if (registry && !exactRecord(registry, expected)) conflicts.push('REGISTRY_VERSION_IDENTITY_CONFLICT');
  return {
    state: normalized,
    tag,
    release,
    registry,
    conflicts,
    complete: Boolean(tag && release && registry),
    exact: Boolean(tag && release && registry && conflicts.length === 0),
  };
}

function checkInternalDependenciesPublished(candidate, state) {
  const reasons = [];
  for (const dependency of candidate.internal_dependencies) {
    const version = exactInternalDependencyVersion(dependency.range);
    if (!version) continue;
    const record = normalizeSyntheticState(state).registry[registryKey(dependency.name, version)];
    if (!record) reasons.push(`INTERNAL_DEPENDENCY_NOT_PUBLISHED:${dependency.name}@${version}`);
  }
  return reasons;
}

function candidateFromInputs({ manifestSource, manifest, contractSource, contract, testEvidence, buildEvidence, tarballBuffer, repositoryCommit }) {
  const packageManifestHash = asSha256Identity(manifestSource);
  const internalDependencies = collectInternalDependencies(manifest);
  const tagName = tagForPackageVersion(contract.package_name, contract.release_version);
  const tarballSha256 = asSha256Identity(tarballBuffer);
  const packIntegrity = sriSha512(tarballBuffer);
  const artifactFileManifestIdentity = asSha256Identity(stableStringify(buildEvidence?.artifact_file_manifest ?? []));
  const releaseContractIdentity = asSha256Identity(contractSource);
  const base = {
    package_name: contract.package_name,
    release_version: contract.release_version,
    source_commit: contract.source_commit,
    package_manifest_hash: packageManifestHash,
    lockfile_hash: buildEvidence?.lockfile_hash ?? null,
    resolved_internal_dependency_set: internalDependencies,
    internal_dependencies: internalDependencies,
    test_evidence_identity: asSha256Identity(stableStringify(testEvidence)),
    build_evidence_identity: asSha256Identity(stableStringify(buildEvidence)),
    artifact_file_manifest_identity: artifactFileManifestIdentity,
    artifact_content_hash: buildEvidence?.artifact_content_hash ?? null,
    tarball_sha256: tarballSha256,
    pack_integrity: packIntegrity,
    release_channel: contract.release_channel,
    release_channel_type: contract.release_channel_type,
    release_contract_identity: releaseContractIdentity,
    tag_serialization_identity: tagSerializationIdentity(),
    gate_implementation_identity: implementationIdentity(),
    tag_name: tagName,
    repository_commit: repositoryCommit,
  };
  const material = Object.fromEntries(MATERIAL_IDENTITY_FIELDS.map((field) => [field, base[field]]));
  return { ...base, material_identity_sha256: asSha256Identity(stableStringify(material)) };
}

export function evaluateReleaseCandidate({
  manifestSource,
  manifest,
  contractSource,
  contract,
  testEvidence,
  buildEvidence,
  tarballBuffer,
  repositoryCommit,
  observedState,
  duplicateImplementations = [],
  packageDirty = false,
}) {
  const reasons = [];
  reasons.push(...validateReleaseContract(contract, { manifest }));
  const packageManifestHash = asSha256Identity(manifestSource);
  const internalDependencies = collectInternalDependencies(manifest);
  const expected = {
    package_name: contract?.package_name,
    release_version: contract?.release_version,
    source_commit: contract?.source_commit,
    package_manifest_hash: packageManifestHash,
    internal_dependencies: internalDependencies,
  };
  reasons.push(...validateTestEvidence(testEvidence, expected));
  reasons.push(...validateBuildEvidence(buildEvidence, expected));
  if (contract?.source_commit !== repositoryCommit) reasons.push('SOURCE_COMMIT_NOT_CHECKED_OUT');
  if (packageDirty) reasons.push('PACKAGE_WORKTREE_DIRTY');
  if (duplicateImplementations.length > 0) reasons.push(`DUPLICATE_GATE_IMPLEMENTATION:${duplicateImplementations.join(',')}`);
  const tarballIntegrity = sriSha512(tarballBuffer);
  if (buildEvidence?.pack_integrity !== tarballIntegrity) reasons.push('TARBALL_INTEGRITY_MISMATCH');
  const secretFindings = detectSecretsInTarball(tarballBuffer);
  if (secretFindings.length > 0) reasons.push(`SECRET_DETECTED_IN_ARTIFACT:${secretFindings.join(',')}`);
  let candidate = null;
  try {
    candidate = candidateFromInputs({
      manifestSource,
      manifest,
      contractSource,
      contract,
      testEvidence,
      buildEvidence,
      tarballBuffer,
      repositoryCommit,
    });
  } catch (error) {
    reasons.push(`CANDIDATE_IDENTITY_ERROR:${error instanceof Error ? error.message : String(error)}`);
  }
  if (!candidate) return { outcome: 'BLOCKED', reasons: unique(reasons), candidate: null, observed: null };
  const observed = inspectObservedState(candidate, observedState);
  reasons.push(...observed.conflicts);
  reasons.push(...checkInternalDependenciesPublished(candidate, observed.state));
  if (reasons.length > 0) return { outcome: 'BLOCKED', reasons: unique(reasons), candidate, observed };
  if (observed.exact) return { outcome: 'PASS', reasons: ['IDEMPOTENT_ALREADY_PUBLISHED'], candidate, observed, idempotent: true };
  return { outcome: 'READY', reasons: [], candidate, observed, idempotent: false };
}

function applySyntheticRelease(candidate, state) {
  const next = structuredClone(normalizeSyntheticState(state));
  const expected = expectedPublishedIdentity(candidate);
  if (!next.tags[candidate.tag_name]) next.tags[candidate.tag_name] = { ...expected, annotated: true };
  if (!next.releases[candidate.tag_name]) next.releases[candidate.tag_name] = { ...expected, immutable: true };
  const key = registryKey(candidate.package_name, candidate.release_version);
  if (!next.registry[key]) next.registry[key] = { ...expected, immutable: true };
  if (!isPlainObject(next.channels[candidate.package_name])) next.channels[candidate.package_name] = {};
  next.channels[candidate.package_name][candidate.release_channel] = candidate.release_version;
  return next;
}

function sanitizeObject(value) {
  if (Array.isArray(value)) return value.map(sanitizeObject);
  if (!isPlainObject(value)) return value;
  const result = {};
  for (const [key, child] of Object.entries(value)) {
    result[key] = SENSITIVE_KEY_PATTERN.test(key) ? '[REDACTED]' : sanitizeObject(child);
  }
  return result;
}

function evidenceDirectory(evidenceRoot, packageName, version) {
  return path.join(evidenceRoot, packageSlug(packageName), version);
}

function writeEvidence(evidenceRoot, evidence) {
  const directory = evidenceDirectory(evidenceRoot, evidence.package_name, evidence.release_version);
  const filePath = path.join(directory, `${evidence.release_run_identity}.json`);
  return qualityWritePrettyJson(filePath, sanitizeObject(evidence));
}

function loadSyntheticState(statePath) {
  if (!statePath || !fs.existsSync(statePath)) return emptySyntheticState();
  return normalizeSyntheticState(readJson(statePath, 'synthetic release state').value);
}

function realTagCommit(repositoryRoot, tagName) {
  const result = run('git', ['ls-remote', 'origin', `refs/tags/${tagName}`, `refs/tags/${tagName}^{}`], {
    cwd: repositoryRoot,
  });
  if (result.error || result.status !== 0 || !result.stdout.trim()) return null;
  const lines = result.stdout.trim().split(/\r?\n/u);
  const peeled = lines.find((line) => line.endsWith(`refs/tags/${tagName}^{}`));
  const chosen = peeled ?? lines[0];
  return chosen.split(/\s+/u)[0] ?? null;
}

function realReleaseInfo(contract, tagName) {
  const result = run('gh', [
    'release', 'view', tagName,
    '--repo', contract.github_repository,
    '--json', 'tagName,targetCommitish,name,assets',
  ]);
  if (result.error || result.status !== 0) return null;
  try {
    return JSON.parse(result.stdout);
  } catch {
    return { ambiguous: true, raw_sha256: asSha256Identity(result.stdout) };
  }
}

function realRegistryInfo(contract) {
  const spec = `${contract.package_name}@${contract.release_version}`;
  const result = runNpm(['view', spec, 'name', 'version', 'dist.integrity', '--json', '--registry', contract.registry_url]);
  if (result.error || result.status !== 0 || !result.stdout.trim()) return null;
  try {
    return JSON.parse(result.stdout);
  } catch {
    return { ambiguous: true, raw_sha256: asSha256Identity(result.stdout) };
  }
}

function realObservedState(repositoryRoot, contract, candidate) {
  const tagCommit = realTagCommit(repositoryRoot, candidate.tag_name);
  const release = realReleaseInfo(contract, candidate.tag_name);
  const registry = realRegistryInfo(contract);
  const synthetic = emptySyntheticState();
  const expected = expectedPublishedIdentity(candidate);
  if (tagCommit) {
    synthetic.tags[candidate.tag_name] = tagCommit === candidate.source_commit
      ? { ...expected, annotated: true }
      : { ...expected, source_commit: tagCommit, annotated: true };
  }
  if (release) {
    if (release.ambiguous) synthetic.releases[candidate.tag_name] = { ambiguous: true };
    else {
      synthetic.releases[candidate.tag_name] = release.tagName === candidate.tag_name
        ? { ...expected, immutable: true }
        : { ...expected, tag_name: release.tagName ?? 'UNKNOWN', immutable: true };
    }
  }
  if (registry) {
    if (registry.ambiguous) synthetic.registry[registryKey(candidate.package_name, candidate.release_version)] = { ambiguous: true };
    else {
      const name = registry.name ?? contract.package_name;
      const version = registry.version ?? contract.release_version;
      const integrity = registry['dist.integrity'] ?? registry.dist?.integrity ?? null;
      synthetic.registry[registryKey(candidate.package_name, candidate.release_version)] = {
        ...expected,
        package_name: name,
        release_version: version,
        pack_integrity: integrity,
        immutable: true,
      };
    }
  }
  return synthetic;
}

function assertRealReleaseConfirmation(contract, allowRealRelease) {
  if (!allowRealRelease) throw new Error('REAL_RELEASE_NOT_EXPLICITLY_ALLOWED');
  const expected = `${contract.package_name}@${contract.release_version}`;
  if (process.env.VENTO_REAL_RELEASE_CONFIRMATION !== expected) {
    throw new Error(`REAL_RELEASE_CONFIRMATION_MISSING:expected=${expected}`);
  }
}

function createTempProvenance(candidate) {
  const directory = fs.mkdtempSync(path.join(os.tmpdir(), 'vento-release-provenance-'));
  const filePath = path.join(directory, 'release-provenance.json');
  writeJsonAtomic(filePath, sanitizeObject({
    package_name: candidate.package_name,
    release_version: candidate.release_version,
    source_commit: candidate.source_commit,
    artifact_sha256: candidate.tarball_sha256,
    pack_integrity: candidate.pack_integrity,
    material_identity_sha256: candidate.material_identity_sha256,
  }));
  return { directory, filePath };
}

function applyRealRelease({ repositoryRoot, contract, candidate, tarballPath, observed, allowRealRelease }) {
  assertRealReleaseConfirmation(contract, allowRealRelease);
  const phases = [];
  if (!observed.tag) {
    runChecked('git', ['tag', '-a', candidate.tag_name, candidate.source_commit, '-m', `${candidate.package_name} ${candidate.release_version}`], { cwd: repositoryRoot });
    runChecked('git', ['push', 'origin', `refs/tags/${candidate.tag_name}`], { cwd: repositoryRoot });
    phases.push('TAG_CREATED');
  }
  const provenance = createTempProvenance(candidate);
  try {
    if (!observed.release) {
      runChecked('gh', [
        'release', 'create', candidate.tag_name,
        tarballPath,
        provenance.filePath,
        '--repo', contract.github_repository,
        '--title', `${candidate.package_name} ${candidate.release_version}`,
        '--notes', `Immutable package release for ${candidate.package_name}@${candidate.release_version}.`,
        '--verify-tag',
      ]);
      phases.push('REMOTE_RELEASE_CREATED');
    }
    if (!observed.registry) {
      runNpmChecked([
        'publish', tarballPath,
        '--tag', candidate.release_channel,
        '--registry', contract.registry_url,
      ]);
      phases.push('REGISTRY_PUBLISHED');
    }
  } finally {
    fs.rmSync(provenance.directory, { recursive: true, force: true });
  }
  const verifiedState = realObservedState(repositoryRoot, contract, candidate);
  const verified = inspectObservedState(candidate, verifiedState);
  if (!verified.exact) {
    throw new Error(`REAL_RELEASE_POST_READ_FAILED:${verified.conflicts.join(',') || 'INCOMPLETE'}`);
  }
  return { phases, state: verifiedState, expected };
}

function walkForFilename(directory, filename, results) {
  if (!fs.existsSync(directory)) return;
  for (const entry of fs.readdirSync(directory, { withFileTypes: true })) {
    if (entry.name === 'node_modules' || entry.name === '.git' || entry.name === '.delivery') continue;
    const absolute = path.join(directory, entry.name);
    if (entry.isDirectory()) walkForFilename(absolute, filename, results);
    else if (entry.isFile() && entry.name === filename) results.push(absolute);
  }
}

export function findDuplicateReleaseGateImplementations(repositoryRoot) {
  const results = [];
  walkForFilename(path.join(repositoryRoot, 'packages'), IMPLEMENTATION_FILENAME, results);
  return results.map((filePath) => normalizePath(path.relative(repositoryRoot, filePath))).sort();
}

function validateReleaseEvidence(evidence) {
  const errors = [];
  if (!isPlainObject(evidence)) return ['EVIDENCE_NOT_OBJECT'];
  if (evidence.schema_version !== RELEASE_EVIDENCE_SCHEMA_VERSION) errors.push('EVIDENCE_SCHEMA_VERSION_UNSUPPORTED');
  if (evidence.gate_instance !== RELEASE_GATE_INSTANCE_ID) errors.push('EVIDENCE_GATE_INSTANCE_INVALID');
  if (!nonEmptyString(evidence.release_run_identity)) errors.push('EVIDENCE_RUN_ID_MISSING');
  if (!RELEASE_FINAL_STATES.has(evidence.release_status)) errors.push('EVIDENCE_RELEASE_STATUS_INVALID');
  for (const field of MATERIAL_IDENTITY_FIELDS) {
    if (evidence[field] === undefined || evidence[field] === null) errors.push(`EVIDENCE_FIELD_MISSING:${field}`);
  }
  if (!nonEmptyString(evidence.material_identity_sha256)) errors.push('EVIDENCE_MATERIAL_IDENTITY_MISSING');
  return unique(errors);
}

export function compareReleaseEvidenceIdentity(evidence, candidate) {
  const errors = validateReleaseEvidence(evidence);
  if (errors.length > 0) return { current: false, reason: 'EVIDENCE_INCOMPLETE', changed_fields: [], errors };
  const changed = [];
  for (const field of MATERIAL_IDENTITY_FIELDS) {
    if (stableStringify(evidence[field]) !== stableStringify(candidate[field])) changed.push(field);
  }
  if (evidence.material_identity_sha256 !== candidate.material_identity_sha256) {
    if (changed.length === 0) changed.push('material_identity_sha256');
  }
  return {
    current: changed.length === 0,
    reason: changed.length === 0 ? null : 'MATERIAL_IDENTITY_CHANGED',
    changed_fields: changed,
    errors: [],
  };
}

export function planCoordinatedRelease(candidates) {
  const changed = candidates.filter((candidate) => candidate.distribution_change === true);
  const byName = new Map(changed.map((candidate) => [candidate.package_name, candidate]));
  const incoming = new Map(changed.map((candidate) => [candidate.package_name, 0]));
  const edges = new Map(changed.map((candidate) => [candidate.package_name, []]));
  const errors = [];
  for (const candidate of changed) {
    if (!CANONICAL_SHARED_PACKAGES.includes(candidate.package_name)) errors.push(`PACKAGE_NOT_CANONICAL:${candidate.package_name}`);
    for (const dependency of candidate.internal_dependencies ?? []) {
      const version = exactInternalDependencyVersion(dependency.range);
      if (!version) {
        errors.push(`INTERNAL_DEPENDENCY_NOT_EXACT:${candidate.package_name}:${dependency.name}`);
        continue;
      }
      const dependencyCandidate = byName.get(dependency.name);
      if (!dependencyCandidate) continue;
      if (dependencyCandidate.release_version !== version) {
        errors.push(`INTERNAL_DEPENDENCY_VERSION_MISMATCH:${candidate.package_name}:${dependency.name}@${version}`);
        continue;
      }
      edges.get(dependency.name).push(candidate.package_name);
      incoming.set(candidate.package_name, incoming.get(candidate.package_name) + 1);
    }
  }
  if (errors.length > 0) return { outcome: 'BLOCKED', reasons: unique(errors), order: [] };
  const ready = [...incoming.entries()].filter(([, count]) => count === 0).map(([name]) => name).sort();
  const order = [];
  while (ready.length > 0) {
    const name = ready.shift();
    order.push(name);
    for (const dependent of edges.get(name) ?? []) {
      const next = incoming.get(dependent) - 1;
      incoming.set(dependent, next);
      if (next === 0) {
        ready.push(dependent);
        ready.sort();
      }
    }
  }
  if (order.length !== changed.length) return { outcome: 'BLOCKED', reasons: ['INTERNAL_DEPENDENCY_CYCLE'], order: [] };
  return { outcome: 'PASS', reasons: [], order };
}

function createEvidence({ candidate, evaluation, executionMode, phases, startedAt, completedAt }) {
  const evidence = {
    schema_version: RELEASE_EVIDENCE_SCHEMA_VERSION,
    gate_instance: RELEASE_GATE_INSTANCE_ID,
    release_run_identity: crypto.randomUUID(),
    started_at: startedAt,
    completed_at: completedAt,
    ...Object.fromEntries(MATERIAL_IDENTITY_FIELDS.map((field) => [field, candidate[field]])),
    material_identity_sha256: candidate.material_identity_sha256,
    tarball_sha256: candidate.tarball_sha256,
    tag_name: candidate.tag_name,
    annotated_tag_identity: evaluation.outcome === 'PASS'
      ? asSha256Identity(stableStringify({ tag: candidate.tag_name, commit: candidate.source_commit }))
      : null,
    remote_release_identity: evaluation.outcome === 'PASS'
      ? asSha256Identity(stableStringify({ tag: candidate.tag_name, artifact: candidate.tarball_sha256 }))
      : null,
    registry_artifact_identity: evaluation.outcome === 'PASS'
      ? asSha256Identity(stableStringify({ package: candidate.package_name, version: candidate.release_version, integrity: candidate.pack_integrity }))
      : null,
    execution_mode: executionMode,
    release_status: evaluation.outcome,
    reasons: evaluation.reasons,
    phases,
    invalidation_reason: null,
  };
  return sanitizeObject(evidence);
}

export function runGate({
  packageRoot,
  contractPath,
  testEvidencePath,
  buildEvidencePath,
  tarballPath,
  evidenceRoot,
  syntheticStatePath = null,
  allowRealRelease = false,
}) {
  const absolutePackageRoot = path.resolve(packageRoot);
  const absoluteContractPath = path.resolve(contractPath);
  const absoluteTestEvidencePath = path.resolve(testEvidencePath);
  const absoluteBuildEvidencePath = path.resolve(buildEvidencePath);
  const absoluteTarballPath = path.resolve(tarballPath);
  const absoluteEvidenceRoot = path.resolve(evidenceRoot);
  const repositoryRoot = resolveRepositoryRoot(absolutePackageRoot);
  const { source: manifestSource, value: manifest } = readJson(path.join(absolutePackageRoot, 'package.json'), 'package manifest');
  const { source: contractSource, value: contract } = readJson(absoluteContractPath, 'release contract');
  const testEvidence = readJson(absoluteTestEvidencePath, 'CI001 evidence').value;
  const buildEvidence = readJson(absoluteBuildEvidencePath, 'CI002 evidence').value;
  const tarballBuffer = fs.readFileSync(absoluteTarballPath);
  const repositoryCommit = currentCommit(repositoryRoot);
  const duplicates = findDuplicateReleaseGateImplementations(repositoryRoot);
  const packageDirty = Boolean(packageWorktreeChanges(repositoryRoot, absolutePackageRoot));
  const initialState = contract.execution_mode === 'SYNTHETIC'
    ? loadSyntheticState(path.resolve(syntheticStatePath))
    : emptySyntheticState();

  let preliminary = evaluateReleaseCandidate({
    manifestSource,
    manifest,
    contractSource,
    contract,
    testEvidence,
    buildEvidence,
    tarballBuffer,
    repositoryCommit,
    observedState: initialState,
    duplicateImplementations: duplicates,
    packageDirty,
  });

  if (contract.execution_mode === 'REAL' && preliminary.candidate) {
    const observedReal = realObservedState(repositoryRoot, contract, preliminary.candidate);
    preliminary = evaluateReleaseCandidate({
      manifestSource,
      manifest,
      contractSource,
      contract,
      testEvidence,
      buildEvidence,
      tarballBuffer,
      repositoryCommit,
      observedState: observedReal,
      duplicateImplementations: duplicates,
      packageDirty,
    });
  }

  const startedAt = new Date().toISOString();
  if (!preliminary.candidate) throw new Error(`Release candidate cannot be built: ${preliminary.reasons.join(',')}`);
  let finalEvaluation = preliminary;
  let phases = [];
  if (preliminary.outcome === 'READY') {
    if (contract.execution_mode === 'SYNTHETIC') {
      const statePath = path.resolve(syntheticStatePath);
      const nextState = applySyntheticRelease(preliminary.candidate, preliminary.observed.state);
      writeJsonAtomic(statePath, nextState);
      phases = ['SYNTHETIC_TAG_CREATED', 'SYNTHETIC_REMOTE_RELEASE_CREATED', 'SYNTHETIC_REGISTRY_PUBLISHED'];
      const verified = inspectObservedState(preliminary.candidate, nextState);
      finalEvaluation = verified.exact
        ? { ...preliminary, outcome: 'PASS', reasons: [] }
        : { ...preliminary, outcome: 'FAIL', reasons: ['SYNTHETIC_POST_READ_FAILED'] };
    } else {
      const result = applyRealRelease({
        repositoryRoot,
        contract,
        candidate: preliminary.candidate,
        tarballPath: absoluteTarballPath,
        observed: preliminary.observed,
        allowRealRelease,
      });
      phases = result.phases;
      finalEvaluation = { ...preliminary, outcome: 'PASS', reasons: [] };
    }
  } else if (preliminary.outcome === 'PASS' && preliminary.idempotent) {
    phases = ['IDEMPOTENT_NO_MUTATION'];
  }
  const completedAt = new Date().toISOString();
  const evidence = createEvidence({
    candidate: preliminary.candidate,
    evaluation: finalEvaluation,
    executionMode: contract.execution_mode,
    phases,
    startedAt,
    completedAt,
  });
  const evidencePath = writeEvidence(absoluteEvidenceRoot, evidence);
  return { evidence, evidencePath };
}

export function verifyEvidence({ packageRoot, contractPath, testEvidencePath, buildEvidencePath, tarballPath, evidencePath }) {
  const absolutePackageRoot = path.resolve(packageRoot);
  const repositoryRoot = resolveRepositoryRoot(absolutePackageRoot);
  const { source: manifestSource, value: manifest } = readJson(path.join(absolutePackageRoot, 'package.json'), 'package manifest');
  const { source: contractSource, value: contract } = readJson(path.resolve(contractPath), 'release contract');
  const testEvidence = readJson(path.resolve(testEvidencePath), 'CI001 evidence').value;
  const buildEvidence = readJson(path.resolve(buildEvidencePath), 'CI002 evidence').value;
  const tarballBuffer = fs.readFileSync(path.resolve(tarballPath));
  const candidate = candidateFromInputs({
    manifestSource,
    manifest,
    contractSource,
    contract,
    testEvidence,
    buildEvidence,
    tarballBuffer,
    repositoryCommit: currentCommit(repositoryRoot),
  });
  const evidence = readJson(path.resolve(evidencePath), 'release evidence').value;
  const comparison = compareReleaseEvidenceIdentity(evidence, candidate);
  return {
    outcome: comparison.current && evidence.release_status === 'PASS' ? 'PASS' : 'STALE',
    invalidation_reason: comparison.current
      ? (evidence.release_status === 'PASS' ? null : 'PREVIOUS_RELEASE_NOT_PASS')
      : comparison.reason,
    changed_fields: comparison.changed_fields,
    errors: comparison.errors,
    material_identity_sha256: candidate.material_identity_sha256,
  };
}

function parseArgs(argv) {
  const args = {
    packageRoot: null,
    contractPath: null,
    testEvidencePath: null,
    buildEvidencePath: null,
    tarballPath: null,
    evidenceRoot: '.delivery/shared-package-releases',
    syntheticStatePath: null,
    verifyEvidencePath: null,
    allowRealRelease: false,
    json: false,
    help: false,
  };
  for (let index = 0; index < argv.length; index += 1) {
    const token = argv[index];
    if (token === '--json') args.json = true;
    else if (token === '--help' || token === '-h') args.help = true;
    else if (token === '--allow-real-release') args.allowRealRelease = true;
    else if ([
      '--package-root', '--contract', '--test-evidence', '--build-evidence', '--tarball',
      '--evidence-root', '--synthetic-state', '--verify-evidence',
    ].includes(token)) {
      const value = argv[index + 1];
      if (!value || value.startsWith('--')) throw new Error(`Missing value for ${token}.`);
      if (token === '--package-root') args.packageRoot = value;
      else if (token === '--contract') args.contractPath = value;
      else if (token === '--test-evidence') args.testEvidencePath = value;
      else if (token === '--build-evidence') args.buildEvidencePath = value;
      else if (token === '--tarball') args.tarballPath = value;
      else if (token === '--evidence-root') args.evidenceRoot = value;
      else if (token === '--synthetic-state') args.syntheticStatePath = value;
      else args.verifyEvidencePath = value;
      index += 1;
    } else throw new Error(`Unknown argument: ${token}`);
  }
  return args;
}

function printUsage() {
  console.log(`Usage:\n  node ${IMPLEMENTATION_RELATIVE_PATH} --package-root <dir> --contract <json> --test-evidence <json> --build-evidence <json> --tarball <tgz> [--synthetic-state <json>] [--evidence-root <dir>] [--json]\n  node ${IMPLEMENTATION_RELATIVE_PATH} --package-root <dir> --contract <json> --test-evidence <json> --build-evidence <json> --tarball <tgz> --verify-evidence <json> [--json]\n\nSYNTHETIC mode writes only the supplied synthetic state and .delivery evidence. REAL mode is fail-closed and additionally requires --allow-real-release plus VENTO_REAL_RELEASE_CONFIRMATION=<package>@<version>. The gate publishes the exact certified tarball and never rebuilds it.`);
}

export function main(argv = process.argv.slice(2)) {
  const args = parseArgs(argv);
  if (args.help) return printUsage();
  for (const [label, value] of [
    ['--package-root', args.packageRoot],
    ['--contract', args.contractPath],
    ['--test-evidence', args.testEvidencePath],
    ['--build-evidence', args.buildEvidencePath],
    ['--tarball', args.tarballPath],
  ]) {
    if (!value) throw new Error(`${label} is required.`);
  }
  if (args.verifyEvidencePath) {
    const result = verifyEvidence({
      packageRoot: args.packageRoot,
      contractPath: args.contractPath,
      testEvidencePath: args.testEvidencePath,
      buildEvidencePath: args.buildEvidencePath,
      tarballPath: args.tarballPath,
      evidencePath: args.verifyEvidencePath,
    });
    console.log(args.json ? JSON.stringify(result, null, 2) : `${result.outcome}: release evidence verification.`);
    if (result.outcome !== 'PASS') process.exitCode = 1;
    return result;
  }
  const contract = readJson(path.resolve(args.contractPath), 'release contract').value;
  if (contract.execution_mode === 'SYNTHETIC' && !args.syntheticStatePath) {
    throw new Error('--synthetic-state is required for SYNTHETIC execution.');
  }
  const result = runGate({
    packageRoot: args.packageRoot,
    contractPath: args.contractPath,
    testEvidencePath: args.testEvidencePath,
    buildEvidencePath: args.buildEvidencePath,
    tarballPath: args.tarballPath,
    evidenceRoot: args.evidenceRoot,
    syntheticStatePath: args.syntheticStatePath,
    allowRealRelease: args.allowRealRelease,
  });
  console.log(args.json ? JSON.stringify(result.evidence, null, 2) : `${result.evidence.release_status}: ${result.evidence.package_name}@${result.evidence.release_version} release gate.`);
  if (result.evidence.release_status !== 'PASS') process.exitCode = 1;
  return result;
}

const isCli = process.argv[1]
  && path.resolve(process.argv[1]) === path.resolve(fileURLToPath(import.meta.url));

if (isCli) {
  try {
    main();
  } catch (error) {
    console.error(`ERROR: ${error instanceof Error ? error.message : String(error)}`);
    process.exit(1);
  }
}
