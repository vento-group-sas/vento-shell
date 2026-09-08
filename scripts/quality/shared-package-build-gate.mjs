import crypto from 'node:crypto';
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { spawnSync } from 'node:child_process';
import { fileURLToPath, pathToFileURL } from 'node:url';
import zlib from 'node:zlib';
import {
  asSha256Identity as qualityAsSha256Identity,
  readJson as qualityReadJson,
  sha256 as qualitySha256,
  stableStringify as qualityStableStringify,
  writePrettyJson as qualityWritePrettyJson,
} from './quality-primitives.mjs';

export const CANONICAL_SHARED_PACKAGES = Object.freeze([
  '@vento/contracts',
  '@vento/os-context',
  '@vento/supabase',
  '@vento/ui-web',
]);

export const REQUIRED_CONTRACT_CHECKS = Object.freeze([
  'entrypoints',
  'declarations',
  'runtime_types_coherence',
  'no_private_source_imports',
  'no_absolute_paths',
  'no_local_dependencies',
  'peer_runtime_coherence',
  'isolated_pack',
  'isolated_import',
  'public_surface_snapshot',
]);

const GATE_INSTANCE_ID = 'SHELL-CI-002::GLOBAL';
const EVIDENCE_SCHEMA_VERSION = 1;
const CONTRACT_SCHEMA_VERSION = 1;
const DEFAULT_TIMEOUT_MS = 120_000;
const IMPLEMENTATION_FILENAME = 'shared-package-build-gate.mjs';
const IMPLEMENTATION_RELATIVE_PATH = `scripts/quality/${IMPLEMENTATION_FILENAME}`;
const FINAL_STATES = new Set(['PASS', 'FAIL', 'BLOCKED', 'CANCELLED', 'TIMED_OUT']);
const SENSITIVE_KEY_PATTERN = /(authorization|cookie|credential|password|secret|token|api[_-]?key|private[_-]?key|service[_-]?role)/iu;
const ENV_SECRET_PATTERN = /(TOKEN|SECRET|PASSWORD|API_KEY|PRIVATE_KEY|SERVICE_ROLE|DATABASE_URL|SUPABASE|AUTH)/u;
const LOCAL_RANGE_PATTERN = /^(?:file:|link:|workspace:|git\+|git:|github:|https?:\/\/|ssh:)/iu;
const MATERIAL_IDENTITY_FIELDS = Object.freeze([
  'package_name',
  'package_candidate_version',
  'source_commit',
  'package_manifest_hash',
  'lockfile_hash',
  'toolchain_identity',
  'runtime_identity',
  'resolved_internal_dependency_set',
  'public_surface_identity',
  'build_contract_identity',
  'gate_implementation_identity',
]);

function normalizePath(value) {
  return String(value).replaceAll('\\', '/');
}

function isPlainObject(value) {
  return value !== null && typeof value === 'object' && !Array.isArray(value);
}



export function stableStringify(value) {
  return qualityStableStringify(value);
}

export function sha256(value) {
  return qualitySha256(value);
}

function asSha256Identity(value) {
  return qualityAsSha256Identity(value);
}

function nonEmptyString(value) {
  return typeof value === 'string' && value.trim().length > 0;
}

function unique(values) {
  return [...new Set(values)];
}

function assertRelativePath(candidate, label) {
  if (!nonEmptyString(candidate)) throw new Error(`${label} must be a non-empty relative path.`);
  if (path.isAbsolute(candidate)) throw new Error(`${label} must not be absolute.`);
  const normalized = normalizePath(path.normalize(candidate));
  if (normalized === '..' || normalized.startsWith('../')) {
    throw new Error(`${label} must stay inside its declared root.`);
  }
  return normalized.replace(/^\.\//u, '');
}

function readJson(filePath, label) {
  return qualityReadJson(filePath, label);
}

function runGit(root, args) {
  const result = spawnSync('git', args, {
    cwd: root,
    encoding: 'utf8',
    windowsHide: true,
  });
  if (result.error || result.status !== 0) return null;
  return result.stdout.trim();
}

function resolveRepositoryRoot(startPath) {
  const root = runGit(startPath, ['rev-parse', '--show-toplevel']);
  if (!root) throw new Error('Cannot resolve the Git repository root.');
  return path.resolve(root);
}

function sourceCommit(repositoryRoot) {
  const commit = runGit(repositoryRoot, ['rev-parse', 'HEAD']);
  if (!commit) throw new Error('Cannot resolve the source commit.');
  return commit;
}

function packageWorktreeChanges(repositoryRoot, packageRoot) {
  const relative = normalizePath(path.relative(repositoryRoot, packageRoot));
  return runGit(repositoryRoot, ['status', '--porcelain', '--untracked-files=all', '--', relative]) ?? '';
}

function gitChangedPaths(repositoryRoot) {
  const output = runGit(repositoryRoot, ['status', '--porcelain', '--untracked-files=all']) ?? '';
  return output.split(/\r?\n/u).filter(Boolean).map((line) => {
    const payload = line.slice(3).trim();
    const renamed = payload.includes(' -> ') ? payload.split(' -> ').at(-1) : payload;
    return normalizePath(renamed.replace(/^"|"$/gu, ''));
  });
}

function packageSlug(packageName) {
  return packageName.replace(/^@/u, '').replaceAll('/', '__');
}

function rootLockfilePath(repositoryRoot) {
  return path.join(repositoryRoot, 'package-lock.json');
}

function packageNameFromSpecifier(specifier) {
  if (specifier.startsWith('@')) return specifier.split('/').slice(0, 2).join('/');
  return specifier.split('/')[0];
}

function flattenDistributionPaths(value, results = []) {
  if (typeof value === 'string') results.push(value);
  else if (Array.isArray(value)) value.forEach((child) => flattenDistributionPaths(child, results));
  else if (isPlainObject(value)) Object.values(value).forEach((child) => flattenDistributionPaths(child, results));
  return results;
}

function isSourcePath(value) {
  const normalized = normalizePath(String(value));
  return normalized === 'src' || normalized.startsWith('src/') || normalized.includes('/src/');
}

function manifestDistributionPaths(manifest) {
  return unique(flattenDistributionPaths({
    main: manifest?.main,
    module: manifest?.module,
    types: manifest?.types,
    exports: manifest?.exports,
  }).filter(nonEmptyString));
}

export function collectInternalDependencies(manifest) {
  const sections = ['dependencies', 'devDependencies', 'optionalDependencies', 'peerDependencies'];
  const entries = [];
  for (const section of sections) {
    const dependencies = isPlainObject(manifest?.[section]) ? manifest[section] : {};
    for (const [name, range] of Object.entries(dependencies)) {
      if (!name.startsWith('@vento/')) continue;
      entries.push({ name, range: String(range), section });
    }
  }
  return entries.sort((left, right) => {
    const nameOrder = left.name.localeCompare(right.name);
    return nameOrder || left.section.localeCompare(right.section) || left.range.localeCompare(right.range);
  });
}

function declaredRuntimeDependencies(manifest) {
  const names = new Set();
  for (const section of ['dependencies', 'optionalDependencies', 'peerDependencies']) {
    for (const name of Object.keys(isPlainObject(manifest?.[section]) ? manifest[section] : {})) names.add(name);
  }
  return names;
}

function allDependencyEntries(manifest) {
  const results = [];
  for (const section of ['dependencies', 'devDependencies', 'optionalDependencies', 'peerDependencies']) {
    for (const [name, range] of Object.entries(isPlainObject(manifest?.[section]) ? manifest[section] : {})) {
      results.push({ section, name, range: String(range) });
    }
  }
  return results;
}

function sortedObjects(values) {
  return [...values].sort((left, right) => stableStringify(left).localeCompare(stableStringify(right)));
}

export function validateBuildContract(contract, { packageName = null } = {}) {
  const errors = [];
  if (!isPlainObject(contract)) return ['CONTRACT_NOT_OBJECT'];
  if (contract.schema_version !== CONTRACT_SCHEMA_VERSION) errors.push('CONTRACT_SCHEMA_VERSION_UNSUPPORTED');
  if (!CANONICAL_SHARED_PACKAGES.includes(contract.package)) errors.push('PACKAGE_NOT_CANONICAL');
  if (packageName && contract.package !== packageName) errors.push('CONTRACT_PACKAGE_MISMATCH');
  if (!nonEmptyString(contract.candidate_version)) errors.push('CANDIDATE_VERSION_MISSING');
  if (!isPlainObject(contract.build)) errors.push('BUILD_DECLARATION_MISSING');
  if (isPlainObject(contract.build)) {
    if (!nonEmptyString(contract.build.command)) errors.push('BUILD_COMMAND_MISSING');
    if (!Array.isArray(contract.build.args) || contract.build.args.some((value) => typeof value !== 'string')) {
      errors.push('BUILD_ARGS_INVALID');
    }
    if (contract.build.timeout_ms !== undefined
      && (!Number.isInteger(contract.build.timeout_ms) || contract.build.timeout_ms <= 0)) {
      errors.push('BUILD_TIMEOUT_INVALID');
    }
  }
  try {
    assertRelativePath(contract.output_root, 'output_root');
  } catch {
    errors.push('OUTPUT_ROOT_INVALID');
  }
  if (!Array.isArray(contract.public_surface) || contract.public_surface.length === 0) {
    errors.push('PUBLIC_SURFACE_EMPTY');
  } else {
    const subpaths = [];
    for (const entry of contract.public_surface) {
      if (!isPlainObject(entry) || !nonEmptyString(entry.subpath) || !nonEmptyString(entry.runtime)) {
        errors.push('PUBLIC_SURFACE_ENTRY_INVALID');
        continue;
      }
      subpaths.push(entry.subpath);
      try {
        assertRelativePath(entry.runtime, `runtime:${entry.subpath}`);
      } catch {
        errors.push(`RUNTIME_PATH_INVALID:${entry.subpath}`);
      }
      if (entry.types !== null && entry.types !== undefined) {
        try {
          assertRelativePath(entry.types, `types:${entry.subpath}`);
        } catch {
          errors.push(`TYPES_PATH_INVALID:${entry.subpath}`);
        }
      }
      if (!Array.isArray(entry.expected_exports)
        || entry.expected_exports.length === 0
        || entry.expected_exports.some((name) => !nonEmptyString(name))) {
        errors.push(`EXPECTED_EXPORTS_INVALID:${entry.subpath}`);
      }
    }
    if (unique(subpaths).length !== subpaths.length) errors.push('PUBLIC_SURFACE_SUBPATH_DUPLICATE');
  }
  if (!Array.isArray(contract.assets) || contract.assets.some((value) => !nonEmptyString(value))) {
    errors.push('ASSETS_INVALID');
  } else {
    for (const asset of contract.assets) {
      try {
        assertRelativePath(asset, 'asset');
      } catch {
        errors.push(`ASSET_PATH_INVALID:${asset}`);
      }
    }
  }
  if (!Array.isArray(contract.internal_dependencies)) errors.push('INTERNAL_DEPENDENCIES_INVALID');
  else {
    for (const dependency of contract.internal_dependencies) {
      if (!isPlainObject(dependency)
        || !nonEmptyString(dependency.name)
        || !dependency.name.startsWith('@vento/')
        || !nonEmptyString(dependency.range)
        || !nonEmptyString(dependency.section)
        || !nonEmptyString(dependency.identity)) {
        errors.push('INTERNAL_DEPENDENCY_INVALID');
      }
    }
  }
  if (!isPlainObject(contract.external_peers)) errors.push('EXTERNAL_PEERS_INVALID');
  if (!isPlainObject(contract.runtime) || !Number.isInteger(contract.runtime.node_major)) {
    errors.push('RUNTIME_CONTRACT_INVALID');
  }
  if (!Array.isArray(contract.contract_checks)) errors.push('CONTRACT_CHECKS_INVALID');
  else {
    for (const required of REQUIRED_CONTRACT_CHECKS) {
      if (!contract.contract_checks.includes(required)) errors.push(`CONTRACT_CHECK_MISSING:${required}`);
    }
  }
  for (const field of ['generated_inputs', 'exclusions', 'reproducibility_ignore']) {
    if (!Array.isArray(contract[field]) || contract[field].some((value) => !nonEmptyString(value))) {
      errors.push(`${field.toUpperCase()}_INVALID`);
      continue;
    }
    for (const value of contract[field]) {
      try {
        assertRelativePath(value, field);
      } catch {
        errors.push(`${field.toUpperCase()}_PATH_INVALID:${value}`);
      }
    }
  }
  if (contract.allow_source_files !== undefined && typeof contract.allow_source_files !== 'boolean') {
    errors.push('ALLOW_SOURCE_FILES_INVALID');
  }
  return unique(errors);
}

export function validateManifestContract(manifest, contract) {
  const errors = [];
  if (!isPlainObject(manifest)) return ['MANIFEST_NOT_OBJECT'];
  if (manifest.name !== contract.package) errors.push('MANIFEST_PACKAGE_MISMATCH');
  if (manifest.version !== contract.candidate_version) errors.push('MANIFEST_VERSION_MISMATCH');
  const distributionPaths = manifestDistributionPaths(manifest);
  if (distributionPaths.length === 0) errors.push('MANIFEST_DISTRIBUTION_SURFACE_MISSING');
  for (const candidate of distributionPaths) {
    if (isSourcePath(candidate)) errors.push(`SOURCE_EXPOSED_AS_DISTRIBUTION:${candidate}`);
    if (path.isAbsolute(candidate)) errors.push(`ABSOLUTE_DISTRIBUTION_PATH:${candidate}`);
  }
  for (const dependency of allDependencyEntries(manifest)) {
    if (LOCAL_RANGE_PATTERN.test(dependency.range)) {
      errors.push(`LOCAL_DEPENDENCY_RANGE:${dependency.section}:${dependency.name}`);
    }
  }
  const actualInternal = collectInternalDependencies(manifest);
  const expectedInternal = sortedObjects((contract.internal_dependencies ?? []).map(({ name, range, section }) => ({
    name,
    range,
    section,
  })));
  if (stableStringify(actualInternal) !== stableStringify(expectedInternal)) {
    errors.push('INTERNAL_DEPENDENCY_SET_MISMATCH');
  }
  const peers = isPlainObject(manifest.peerDependencies) ? manifest.peerDependencies : {};
  for (const [name, range] of Object.entries(contract.external_peers ?? {})) {
    if (peers[name] !== range) errors.push(`PEER_RANGE_MISMATCH:${name}`);
  }
  for (const name of Object.keys(peers)) {
    if (name.startsWith('@vento/')) continue;
    if (!Object.hasOwn(contract.external_peers ?? {}, name)) errors.push(`PEER_UNDECLARED_BY_CONTRACT:${name}`);
  }
  if (contract.package === '@vento/os-context' && contract.release_channel === 'stable') {
    const supabaseRange = peers['@supabase/supabase-js'];
    if (!supabaseRange || !/<\s*3(?:\.0\.0)?/u.test(supabaseRange)) {
      errors.push('OS_CONTEXT_SUPABASE_PEER_NOT_CAPPED_BELOW_3');
    }
  }
  if (contract.package === '@vento/ui-web') {
    for (const peer of ['react', 'react-dom']) {
      const dependencies = isPlainObject(manifest.dependencies) ? manifest.dependencies : {};
      if (dependencies[peer] && !peers[peer]) errors.push(`UI_WEB_FRAMEWORK_NOT_PEER:${peer}`);
    }
  }
  return unique(errors);
}

export function collectBareImports(source) {
  const specifiers = [];
  const patterns = [
    /\bfrom\s*['"]([^'"]+)['"]/gu,
    /\bimport\s*['"]([^'"]+)['"]/gu,
    /\bimport\s*\(\s*['"]([^'"]+)['"]\s*\)/gu,
    /\brequire\s*\(\s*['"]([^'"]+)['"]\s*\)/gu,
  ];
  for (const pattern of patterns) {
    for (const match of source.matchAll(pattern)) specifiers.push(match[1]);
  }
  return unique(specifiers.filter((specifier) => (
    !specifier.startsWith('.')
    && !specifier.startsWith('/')
    && !specifier.startsWith('node:')
    && !/^[a-zA-Z]:[\\/]/u.test(specifier)
  )).map(packageNameFromSpecifier));
}

export function exportedNames(source) {
  const names = new Set();
  for (const match of source.matchAll(/\bexport\s+(?:declare\s+)?(?:async\s+)?(?:const|let|var|function|class|interface|type|enum)\s+([A-Za-z_$][\w$]*)/gu)) {
    names.add(match[1]);
  }
  for (const match of source.matchAll(/\bexport\s*\{([^}]+)\}/gu)) {
    for (const raw of match[1].split(',')) {
      const token = raw.trim();
      if (!token) continue;
      const alias = token.match(/\bas\s+([A-Za-z_$][\w$]*)$/u)?.[1];
      const base = token.match(/^([A-Za-z_$][\w$]*)/u)?.[1];
      if (alias || base) names.add(alias ?? base);
    }
  }
  if (/\bexport\s+default\b/u.test(source)) names.add('default');
  return [...names].sort();
}

export function detectUnsafeOutputText(source, { repositoryRoot = null, packageRoot = null } = {}) {
  const reasons = [];
  const normalized = normalizePath(source);
  if (/\b(?:src|source)\/[A-Za-z0-9_.\-/]+/u.test(normalized)
    || /(?:\.\.\/)+src\//u.test(normalized)) reasons.push('PRIVATE_SOURCE_REFERENCE');
  if (/[A-Za-z]:\\(?:Users|Program Files|dev|src)\\/u.test(source)
    || /\/(?:Users|home|private|tmp)\/[A-Za-z0-9_.-]+\//u.test(normalized)) {
    reasons.push('ABSOLUTE_LOCAL_PATH');
  }
  if (repositoryRoot && normalized.includes(normalizePath(path.resolve(repositoryRoot)))) {
    reasons.push('REPOSITORY_ABSOLUTE_PATH');
  }
  if (packageRoot && normalized.includes(normalizePath(path.resolve(packageRoot)))) {
    reasons.push('PACKAGE_ABSOLUTE_PATH');
  }
  if (/\b(?:service_role|SUPABASE_SERVICE_ROLE_KEY|DATABASE_URL|PRIVATE_KEY|API_KEY)\b\s*[:=]/u.test(source)
    || /\bsk_(?:live|test)_[A-Za-z0-9]{12,}\b/u.test(source)
    || /\beyJ[A-Za-z0-9_-]{20,}\.[A-Za-z0-9_-]{20,}\.[A-Za-z0-9_-]{20,}\b/u.test(source)) {
    reasons.push('SENSITIVE_VALUE_PATTERN');
  }
  return unique(reasons);
}

function walkFiles(directory, results = []) {
  if (!fs.existsSync(directory)) return results;
  for (const entry of fs.readdirSync(directory, { withFileTypes: true })) {
    const absolute = path.join(directory, entry.name);
    if (entry.isDirectory()) walkFiles(absolute, results);
    else if (entry.isFile()) results.push(absolute);
  }
  return results;
}

function matchesIgnored(relative, ignored) {
  return ignored.some((candidate) => relative === candidate || relative.startsWith(`${candidate}/`));
}

export function snapshotDirectory(directory, { ignore = [] } = {}) {
  const normalizedIgnore = ignore.map((candidate) => assertRelativePath(candidate, 'ignore'));
  const files = walkFiles(directory).map((absolute) => {
    const relative = normalizePath(path.relative(directory, absolute));
    return {
      path: relative,
      size: fs.statSync(absolute).size,
      sha256: asSha256Identity(fs.readFileSync(absolute)),
    };
  }).filter((entry) => !matchesIgnored(entry.path, normalizedIgnore));
  files.sort((left, right) => left.path.localeCompare(right.path));
  return {
    files,
    content_hash: asSha256Identity(stableStringify(files.map(({ path: filePath, sha256: hash }) => ({
      path: filePath,
      sha256: hash,
    })))),
  };
}

function outputRelativeToRoot(contract, packageRoot, declaredPath) {
  const absolute = path.resolve(packageRoot, declaredPath);
  const outputRoot = path.resolve(packageRoot, contract.output_root);
  const prefix = `${outputRoot}${path.sep}`;
  if (absolute !== outputRoot && !absolute.startsWith(prefix)) {
    throw new Error(`Declared output escapes output_root: ${declaredPath}`);
  }
  return normalizePath(path.relative(outputRoot, absolute));
}

export function inspectBuiltSurface({ packageRoot, repositoryRoot, manifest, contract, artifactSnapshot }) {
  const reasons = [];
  const allowedRuntime = declaredRuntimeDependencies(manifest);
  const surface = [];
  const declarationFiles = [];
  for (const entry of contract.public_surface) {
    const runtimeAbsolute = path.resolve(packageRoot, entry.runtime);
    const runtimeRelative = outputRelativeToRoot(contract, packageRoot, entry.runtime);
    if (!fs.existsSync(runtimeAbsolute) || !fs.statSync(runtimeAbsolute).isFile()) {
      reasons.push(`ENTRYPOINT_MISSING:${entry.subpath}:${entry.runtime}`);
      continue;
    }
    const runtimeSource = fs.readFileSync(runtimeAbsolute, 'utf8');
    for (const unsafe of detectUnsafeOutputText(runtimeSource, { repositoryRoot, packageRoot })) {
      reasons.push(`${unsafe}:${entry.runtime}`);
    }
    for (const imported of collectBareImports(runtimeSource)) {
      if (!allowedRuntime.has(imported)) reasons.push(`RUNTIME_DEPENDENCY_UNDECLARED:${entry.runtime}:${imported}`);
      if (contract.package === '@vento/contracts'
        && ['next', 'react', 'react-dom', '@supabase/supabase-js'].includes(imported)) {
        reasons.push(`CONTRACTS_FORBIDDEN_FRAMEWORK_IMPORT:${imported}`);
      }
    }
    const runtimeExports = exportedNames(runtimeSource);
    const expected = [...entry.expected_exports].sort();
    if (stableStringify(runtimeExports) !== stableStringify(expected)) {
      reasons.push(`PUBLIC_EXPORT_MISMATCH:${entry.subpath}`);
    }
    let typeExports = [];
    if (entry.types) {
      const typesAbsolute = path.resolve(packageRoot, entry.types);
      if (!fs.existsSync(typesAbsolute) || !fs.statSync(typesAbsolute).isFile()) {
        reasons.push(`DECLARATION_MISSING:${entry.subpath}:${entry.types}`);
      } else {
        declarationFiles.push(outputRelativeToRoot(contract, packageRoot, entry.types));
        const typeSource = fs.readFileSync(typesAbsolute, 'utf8');
        for (const unsafe of detectUnsafeOutputText(typeSource, { repositoryRoot, packageRoot })) {
          reasons.push(`${unsafe}:${entry.types}`);
        }
        typeExports = exportedNames(typeSource);
        for (const exported of expected) {
          if (!typeExports.includes(exported)) reasons.push(`DECLARATION_EXPORT_MISSING:${entry.subpath}:${exported}`);
        }
      }
    }
    surface.push({
      subpath: entry.subpath,
      runtime: runtimeRelative,
      runtime_exports: runtimeExports,
      types: entry.types ? outputRelativeToRoot(contract, packageRoot, entry.types) : null,
      type_exports: typeExports,
    });
  }
  for (const asset of contract.assets) {
    const absolute = path.resolve(packageRoot, asset);
    if (!fs.existsSync(absolute) || !fs.statSync(absolute).isFile()) reasons.push(`ASSET_MISSING:${asset}`);
    else outputRelativeToRoot(contract, packageRoot, asset);
  }
  if (artifactSnapshot.files.length === 0) reasons.push('ZERO_DISTRIBUTABLE_OUTPUTS');
  return {
    reasons: unique(reasons),
    surface: surface.sort((left, right) => left.subpath.localeCompare(right.subpath)),
    declarations_identity: asSha256Identity(stableStringify(
      artifactSnapshot.files.filter((entry) => declarationFiles.includes(entry.path)),
    )),
    exports_identity: asSha256Identity(stableStringify(surface)),
  };
}

function sanitizeBuildEnv() {
  const env = {};
  for (const [key, value] of Object.entries(process.env)) {
    if (ENV_SECRET_PATTERN.test(key)) continue;
    env[key] = value;
  }
  env.CI = '1';
  env.VENTO_PACKAGE_BUILD_GATE = '1';
  return env;
}

function spawnNpm(args, options = {}) {
  const explicitCli = process.env.npm_execpath;
  const bundledCli = path.join(
    path.dirname(process.execPath),
    'node_modules',
    'npm',
    'bin',
    'npm-cli.js',
  );
  const cli = [explicitCli, bundledCli].find((candidate) => (
    nonEmptyString(candidate) && fs.existsSync(candidate)
  ));
  if (cli) {
    return spawnSync(process.execPath, [cli, ...args], {
      ...options,
      windowsHide: true,
    });
  }
  return spawnSync('npm', args, {
    ...options,
    windowsHide: true,
    shell: process.platform === 'win32',
  });
}

function normalizeRunnerCommand(command) {
  return command === '$NODE' ? process.execPath : command;
}

function buildCommandLooksRootCoupled(contract, repositoryRoot, packageRoot) {
  const tokens = [contract.build.command, ...(contract.build.args ?? [])].map(String);
  const text = tokens.join(' ');
  const repo = normalizePath(path.resolve(repositoryRoot));
  const pkg = normalizePath(path.resolve(packageRoot));
  if (/\bnext\s+build\b/iu.test(text)) return true;
  if (/--prefix\s+(?:\.\.\/|\.\.\\)/u.test(text)) return true;
  if (normalizePath(text).includes(repo) && repo !== pkg) return true;
  return false;
}

function processOutcome(execution) {
  const timedOut = execution.error?.code === 'ETIMEDOUT';
  if (timedOut) return { state: 'TIMED_OUT', reason: 'BUILD_TIMED_OUT' };
  if (execution.signal) return { state: 'CANCELLED', reason: `BUILD_SIGNAL:${execution.signal}` };
  if (execution.error) return {
    state: 'BLOCKED',
    reason: `BUILD_PROCESS_ERROR:${execution.error.code ?? 'ERROR'}:${execution.error.message}`,
  };
  if (execution.status !== 0) return { state: 'FAIL', reason: `BUILD_EXIT_NONZERO:${execution.status}` };
  return { state: 'PASS', reason: null };
}

function parseNpmPackJson(stdout) {
  const text = String(stdout ?? '').trim();
  const first = text.indexOf('[');
  const last = text.lastIndexOf(']');
  if (first < 0 || last < first) throw new Error('npm pack did not return JSON metadata.');
  const parsed = JSON.parse(text.slice(first, last + 1));
  if (!Array.isArray(parsed) || parsed.length !== 1 || !isPlainObject(parsed[0])) {
    throw new Error('npm pack returned an unexpected JSON payload.');
  }
  return parsed[0];
}

function readCString(buffer, start, length) {
  const slice = buffer.subarray(start, start + length);
  const zero = slice.indexOf(0);
  return slice.subarray(0, zero >= 0 ? zero : slice.length).toString('utf8').trim();
}

function readOctal(buffer, start, length) {
  const value = readCString(buffer, start, length).replace(/\0/gu, '').trim();
  return value ? Number.parseInt(value, 8) : 0;
}

function parseTarEntries(tgzPath) {
  const tar = zlib.gunzipSync(fs.readFileSync(tgzPath));
  const entries = [];
  let offset = 0;
  let pendingLongName = null;
  while (offset + 512 <= tar.length) {
    const header = tar.subarray(offset, offset + 512);
    if (header.every((byte) => byte === 0)) break;
    const name = readCString(header, 0, 100);
    const prefix = readCString(header, 345, 155);
    const size = readOctal(header, 124, 12);
    const type = String.fromCharCode(header[156] || 48);
    const rawName = pendingLongName ?? (prefix ? `${prefix}/${name}` : name);
    pendingLongName = null;
    const dataStart = offset + 512;
    const data = tar.subarray(dataStart, dataStart + size);
    if (type === 'L') {
      pendingLongName = data.toString('utf8').replace(/\0+$/u, '');
    } else if (type === '0' || type === '\0' || type === '5') {
      entries.push({ name: normalizePath(rawName), type, data: Buffer.from(data) });
    }
    offset = dataStart + Math.ceil(size / 512) * 512;
  }
  return entries;
}

function extractPackageTarball(tgzPath, destination) {
  const entries = parseTarEntries(tgzPath);
  for (const entry of entries) {
    if (!entry.name.startsWith('package/')) continue;
    const relative = entry.name.slice('package/'.length);
    if (!relative) continue;
    const safeRelative = assertRelativePath(relative, 'tar entry');
    const absolute = path.resolve(destination, safeRelative);
    const prefix = `${path.resolve(destination)}${path.sep}`;
    if (!absolute.startsWith(prefix)) throw new Error(`Unsafe tar entry: ${entry.name}`);
    if (entry.type === '5') fs.mkdirSync(absolute, { recursive: true });
    else {
      fs.mkdirSync(path.dirname(absolute), { recursive: true });
      fs.writeFileSync(absolute, entry.data);
    }
  }
}

function inspectPack({ packageRoot, repositoryRoot, contract, packDirectory }) {
  const execution = spawnNpm([
    'pack',
    '--json',
    '--ignore-scripts',
    '--pack-destination',
    packDirectory,
  ], {
    cwd: packageRoot,
    encoding: 'utf8',
    windowsHide: true,
    env: sanitizeBuildEnv(),
    maxBuffer: 16 * 1024 * 1024,
  });
  if (execution.error || execution.status !== 0) {
    return {
      reasons: [`NPM_PACK_FAILED:${execution.status ?? 'NO_STATUS'}`],
      metadata: null,
      integrity: null,
      isolated_import: null,
    };
  }
  let metadata;
  try {
    metadata = parseNpmPackJson(execution.stdout);
  } catch (error) {
    return {
      reasons: [`NPM_PACK_METADATA_INVALID:${error instanceof Error ? error.message : String(error)}`],
      metadata: null,
      integrity: null,
      isolated_import: null,
    };
  }
  const reasons = [];
  const packedPaths = (metadata.files ?? []).map((entry) => normalizePath(entry.path));
  if (!contract.allow_source_files && packedPaths.some(isSourcePath)) reasons.push('PACK_CONTAINS_SOURCE');
  for (const excluded of contract.exclusions) {
    if (packedPaths.some((candidate) => candidate === excluded || candidate.startsWith(`${excluded}/`))) {
      reasons.push(`PACK_CONTAINS_EXCLUDED_PATH:${excluded}`);
    }
  }
  for (const surface of contract.public_surface) {
    const runtimeRelative = normalizePath(surface.runtime);
    const typesRelative = surface.types ? normalizePath(surface.types) : null;
    if (!packedPaths.includes(runtimeRelative)) reasons.push(`PACK_RUNTIME_MISSING:${surface.subpath}`);
    if (typesRelative && !packedPaths.includes(typesRelative)) reasons.push(`PACK_TYPES_MISSING:${surface.subpath}`);
  }
  for (const asset of contract.assets) {
    if (!packedPaths.includes(normalizePath(asset))) reasons.push(`PACK_ASSET_MISSING:${asset}`);
  }
  const tgzPath = path.resolve(packDirectory, metadata.filename);
  if (!fs.existsSync(tgzPath)) reasons.push('PACK_TARBALL_MISSING');
  let isolatedImport = null;
  if (fs.existsSync(tgzPath) && reasons.length === 0) {
    const extractRoot = fs.mkdtempSync(path.join(packDirectory, 'extract-'));
    try {
      extractPackageTarball(tgzPath, extractRoot);
      const rootNodeModules = path.join(repositoryRoot, 'node_modules');
      if (fs.existsSync(rootNodeModules)) {
        const link = path.join(extractRoot, 'node_modules');
        try {
          fs.symlinkSync(rootNodeModules, link, process.platform === 'win32' ? 'junction' : 'dir');
        } catch {
          // Import may still work when the package has no external runtime dependencies.
        }
      }
      const importScript = contract.public_surface.map((entry) => {
        const runtime = path.resolve(extractRoot, entry.runtime);
        return `await import(${JSON.stringify(pathToFileURL(runtime).href)});`;
      }).join('\n');
      const importExecution = spawnSync(process.execPath, ['--input-type=module', '-e', importScript], {
        cwd: extractRoot,
        encoding: 'utf8',
        windowsHide: true,
        env: sanitizeBuildEnv(),
        timeout: contract.build.timeout_ms ?? DEFAULT_TIMEOUT_MS,
      });
      isolatedImport = {
        status: importExecution.status,
        signal: importExecution.signal,
        stderr_sha256: asSha256Identity(importExecution.stderr ?? ''),
      };
      if (importExecution.error?.code === 'ETIMEDOUT') reasons.push('ISOLATED_IMPORT_TIMED_OUT');
      else if (importExecution.signal) reasons.push(`ISOLATED_IMPORT_CANCELLED:${importExecution.signal}`);
      else if (importExecution.error || importExecution.status !== 0) reasons.push('ISOLATED_IMPORT_FAILED');
    } finally {
      fs.rmSync(extractRoot, { recursive: true, force: true });
    }
  }
  return {
    reasons,
    metadata: metadata ? {
      id: metadata.id,
      name: metadata.name,
      version: metadata.version,
      filename: metadata.filename,
      size: metadata.size,
      unpackedSize: metadata.unpackedSize,
      shasum: metadata.shasum,
      integrity: metadata.integrity,
      files: (metadata.files ?? []).map((entry) => ({ path: normalizePath(entry.path), size: entry.size })),
    } : null,
    integrity: metadata?.integrity ?? null,
    isolated_import: isolatedImport,
  };
}

function snapshotGeneratedInputs(packageRoot, contract) {
  return contract.generated_inputs.map((relative) => {
    const absolute = path.resolve(packageRoot, relative);
    if (!fs.existsSync(absolute) || !fs.statSync(absolute).isFile()) {
      return { path: normalizePath(relative), sha256: null };
    }
    return { path: normalizePath(relative), sha256: asSha256Identity(fs.readFileSync(absolute)) };
  });
}

function npmVersion() {
  const execution = spawnNpm(['--version'], { encoding: 'utf8' });
  return execution.status === 0 ? execution.stdout.trim() : 'UNKNOWN';
}

function implementationIdentity() {
  return asSha256Identity(fs.readFileSync(fileURLToPath(import.meta.url)));
}

function rootToolchainIdentity(repositoryRoot) {
  const rootManifestPath = path.join(repositoryRoot, 'package.json');
  let packageManager = 'UNKNOWN';
  let engines = null;
  if (fs.existsSync(rootManifestPath)) {
    try {
      const rootManifest = JSON.parse(fs.readFileSync(rootManifestPath, 'utf8'));
      packageManager = rootManifest.packageManager ?? 'UNKNOWN';
      engines = rootManifest.engines ?? null;
    } catch {
      // Keep a deterministic degraded identity; the build will still be attributable.
    }
  }
  return asSha256Identity(stableStringify({
    node: process.version,
    npm: npmVersion(),
    package_manager: packageManager,
    engines,
  }));
}

function runtimeIdentity() {
  return `node:${process.version};platform:${process.platform};arch:${process.arch}`;
}

export function buildMaterialIdentity({
  repositoryRoot,
  manifestSource,
  manifest,
  contractSource,
  contract,
}) {
  const lockfile = rootLockfilePath(repositoryRoot);
  const expectedInternal = sortedObjects((contract.internal_dependencies ?? []).map((dependency) => ({
    name: dependency.name,
    range: dependency.range,
    section: dependency.section,
    identity: dependency.identity,
  })));
  const surfaceSeed = {
    package: manifest.name,
    main: manifest.main ?? null,
    module: manifest.module ?? null,
    types: manifest.types ?? null,
    exports: manifest.exports ?? null,
    public_surface: contract.public_surface,
    assets: contract.assets,
  };
  const identity = {
    package_name: manifest.name,
    package_candidate_version: manifest.version,
    source_commit: sourceCommit(repositoryRoot),
    package_manifest_hash: asSha256Identity(manifestSource),
    lockfile_hash: fs.existsSync(lockfile) ? asSha256Identity(fs.readFileSync(lockfile)) : 'sha256:ABSENT',
    toolchain_identity: rootToolchainIdentity(repositoryRoot),
    runtime_identity: runtimeIdentity(),
    resolved_internal_dependency_set: expectedInternal,
    public_surface_identity: asSha256Identity(stableStringify(surfaceSeed)),
    build_contract_identity: asSha256Identity(contractSource),
    gate_implementation_identity: implementationIdentity(),
  };
  return {
    ...identity,
    material_identity_sha256: asSha256Identity(stableStringify(identity)),
  };
}

export function compareNormalizedBuilds(first, second) {
  return {
    reproducible: first?.content_hash === second?.content_hash
      && stableStringify(first?.files ?? []) === stableStringify(second?.files ?? []),
    first_hash: first?.content_hash ?? null,
    second_hash: second?.content_hash ?? null,
  };
}

export function evaluateObservedBuild({
  processState = 'PASS',
  processReason = null,
  manifestReasons = [],
  surfaceReasons = [],
  packReasons = [],
  crossPackageChanges = [],
  duplicateImplementations = [],
  reproducibility = { reproducible: true },
}) {
  const reasons = [];
  if (processReason) reasons.push(processReason);
  reasons.push(...manifestReasons, ...surfaceReasons, ...packReasons);
  if (crossPackageChanges.length > 0) reasons.push(`CROSS_PACKAGE_WRITE:${crossPackageChanges.join(',')}`);
  if (duplicateImplementations.length > 0) {
    reasons.push(`DUPLICATE_GATE_IMPLEMENTATION:${duplicateImplementations.join(',')}`);
  }
  if (!reproducibility.reproducible) reasons.push('REPRODUCIBILITY_MISMATCH');
  if (processState === 'TIMED_OUT') return { outcome: 'TIMED_OUT', reasons: unique(reasons) };
  if (processState === 'CANCELLED') return { outcome: 'CANCELLED', reasons: unique(reasons) };
  if (processState === 'BLOCKED') return { outcome: 'BLOCKED', reasons: unique(reasons) };
  return { outcome: reasons.length > 0 || processState === 'FAIL' ? 'FAIL' : 'PASS', reasons: unique(reasons) };
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

export function findDuplicateBuildGateImplementations(repositoryRoot) {
  const results = [];
  walkForFilename(path.join(repositoryRoot, 'packages'), IMPLEMENTATION_FILENAME, results);
  return results.map((filePath) => normalizePath(path.relative(repositoryRoot, filePath))).sort();
}

function relativePackagePrefix(repositoryRoot, packageRoot) {
  const relative = normalizePath(path.relative(repositoryRoot, packageRoot));
  return relative ? `${relative}/` : '';
}

function crossPackageWriteDelta(before, after, repositoryRoot, packageRoot) {
  const beforeSet = new Set(before);
  const packagePrefix = relativePackagePrefix(repositoryRoot, packageRoot);
  return after.filter((candidate) => !beforeSet.has(candidate) && !candidate.startsWith(packagePrefix));
}

function runBuildOnce({ repositoryRoot, packageRoot, manifest, contract }) {
  const outputRoot = path.resolve(packageRoot, contract.output_root);
  const packagePrefix = `${path.resolve(packageRoot)}${path.sep}`;
  if (outputRoot === path.resolve(packageRoot) || !outputRoot.startsWith(packagePrefix)) {
    return {
      process: { state: 'BLOCKED', reason: 'OUTPUT_ROOT_NOT_SCOPED_TO_PACKAGE' },
      snapshot: { files: [], content_hash: null },
      surface: { reasons: ['OUTPUT_ROOT_NOT_SCOPED_TO_PACKAGE'], surface: [], declarations_identity: null, exports_identity: null },
      pack: { reasons: ['OUTPUT_ROOT_NOT_SCOPED_TO_PACKAGE'], metadata: null, integrity: null, isolated_import: null },
      crossPackageChanges: [],
    };
  }
  if (buildCommandLooksRootCoupled(contract, repositoryRoot, packageRoot)) {
    return {
      process: { state: 'BLOCKED', reason: 'BUILD_COMMAND_COUPLED_TO_ROOT_APPLICATION' },
      snapshot: { files: [], content_hash: null },
      surface: { reasons: [], surface: [], declarations_identity: null, exports_identity: null },
      pack: { reasons: [], metadata: null, integrity: null, isolated_import: null },
      crossPackageChanges: [],
    };
  }
  fs.rmSync(outputRoot, { recursive: true, force: true });
  const before = gitChangedPaths(repositoryRoot);
  const execution = spawnSync(normalizeRunnerCommand(contract.build.command), contract.build.args, {
    cwd: packageRoot,
    encoding: 'utf8',
    timeout: contract.build.timeout_ms ?? DEFAULT_TIMEOUT_MS,
    maxBuffer: 16 * 1024 * 1024,
    windowsHide: true,
    env: sanitizeBuildEnv(),
  });
  const process = processOutcome(execution);
  if (process.state !== 'PASS') {
    return {
      process,
      execution,
      snapshot: { files: [], content_hash: null },
      surface: { reasons: [], surface: [], declarations_identity: null, exports_identity: null },
      pack: { reasons: [], metadata: null, integrity: null, isolated_import: null },
      crossPackageChanges: crossPackageWriteDelta(before, gitChangedPaths(repositoryRoot), repositoryRoot, packageRoot),
    };
  }
  const snapshot = fs.existsSync(outputRoot)
    ? snapshotDirectory(outputRoot, { ignore: contract.reproducibility_ignore })
    : { files: [], content_hash: null };
  const surface = inspectBuiltSurface({
    packageRoot,
    repositoryRoot,
    manifest,
    contract,
    artifactSnapshot: snapshot,
  });
  const packDirectory = fs.mkdtempSync(path.join(os.tmpdir(), 'vento-package-pack-'));
  let pack;
  try {
    pack = inspectPack({ packageRoot, repositoryRoot, contract, packDirectory });
  } finally {
    fs.rmSync(packDirectory, { recursive: true, force: true });
  }
  return {
    process,
    execution,
    snapshot,
    surface,
    pack,
    crossPackageChanges: crossPackageWriteDelta(before, gitChangedPaths(repositoryRoot), repositoryRoot, packageRoot),
  };
}

function evidenceDirectory(evidenceRoot, packageName) {
  return path.join(evidenceRoot, packageSlug(packageName));
}

function loadHistory(evidenceRoot, packageName) {
  const directory = evidenceDirectory(evidenceRoot, packageName);
  if (!fs.existsSync(directory)) return [];
  return fs.readdirSync(directory, { withFileTypes: true })
    .filter((entry) => entry.isFile() && entry.name.endsWith('.json'))
    .flatMap((entry) => {
      try {
        return [JSON.parse(fs.readFileSync(path.join(directory, entry.name), 'utf8'))];
      } catch {
        return [];
      }
    });
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

function writeEvidence(evidenceRoot, evidence) {
  const directory = evidenceDirectory(evidenceRoot, evidence.package_name);
  const filePath = path.join(directory, `${evidence.run_identity}.json`);
  return qualityWritePrettyJson(filePath, sanitizeObject(evidence));
}

function buildRunDiagnostic(run) {
  return {
    process_state: run.process.state,
    process_reason: run.process.reason,
    exit_status: run.execution?.status ?? null,
    signal: run.execution?.signal ?? null,
    stdout_sha256: asSha256Identity(run.execution?.stdout ?? ''),
    stderr_sha256: asSha256Identity(run.execution?.stderr ?? ''),
    artifact_content_hash: run.snapshot.content_hash,
    artifact_file_count: run.snapshot.files.length,
    declarations_identity: run.surface.declarations_identity,
    exports_identity: run.surface.exports_identity,
    pack_integrity: run.pack.integrity,
    isolated_import: run.pack.isolated_import,
    cross_package_changes: run.crossPackageChanges,
  };
}

export function validateEvidence(evidence) {
  const errors = [];
  if (!isPlainObject(evidence)) return ['EVIDENCE_NOT_OBJECT'];
  if (evidence.schema_version !== EVIDENCE_SCHEMA_VERSION) errors.push('EVIDENCE_SCHEMA_VERSION_UNSUPPORTED');
  if (evidence.gate_instance !== GATE_INSTANCE_ID) errors.push('EVIDENCE_GATE_INSTANCE_INVALID');
  if (!nonEmptyString(evidence.run_identity)) errors.push('EVIDENCE_RUN_ID_MISSING');
  if (!FINAL_STATES.has(evidence.build_status) && evidence.build_status !== 'STALE') errors.push('EVIDENCE_BUILD_STATUS_INVALID');
  for (const field of MATERIAL_IDENTITY_FIELDS) {
    if (evidence[field] === undefined || evidence[field] === null) errors.push(`EVIDENCE_FIELD_MISSING:${field}`);
  }
  if (!nonEmptyString(evidence.material_identity_sha256)) errors.push('EVIDENCE_MATERIAL_IDENTITY_MISSING');
  if (!Array.isArray(evidence.artifact_file_manifest)) errors.push('EVIDENCE_FILE_MANIFEST_INVALID');
  if (!nonEmptyString(evidence.artifact_content_hash)) errors.push('EVIDENCE_ARTIFACT_HASH_MISSING');
  if (!nonEmptyString(evidence.declarations_identity)) errors.push('EVIDENCE_DECLARATIONS_IDENTITY_MISSING');
  if (!nonEmptyString(evidence.exports_identity)) errors.push('EVIDENCE_EXPORTS_IDENTITY_MISSING');
  if (!nonEmptyString(evidence.pack_integrity)) errors.push('EVIDENCE_PACK_INTEGRITY_MISSING');
  return unique(errors);
}

export function compareEvidenceIdentity(evidence, currentIdentity) {
  const evidenceErrors = validateEvidence(evidence);
  if (evidenceErrors.length > 0) {
    return { current: false, changed_fields: [], reason: 'EVIDENCE_INCOMPLETE', errors: evidenceErrors };
  }
  const changedFields = [];
  for (const field of MATERIAL_IDENTITY_FIELDS) {
    if (stableStringify(evidence[field]) !== stableStringify(currentIdentity[field])) changedFields.push(field);
  }
  if (evidence.material_identity_sha256 !== currentIdentity.material_identity_sha256) {
    if (changedFields.length === 0) changedFields.push('material_identity_sha256');
  }
  return {
    current: changedFields.length === 0,
    changed_fields: changedFields,
    reason: changedFields.length === 0 ? null : 'MATERIAL_IDENTITY_CHANGED',
    errors: [],
  };
}

export function runGate({ packageRoot, contractPath, evidenceRoot }) {
  const absolutePackageRoot = path.resolve(packageRoot);
  const absoluteContractPath = path.resolve(contractPath);
  const absoluteEvidenceRoot = path.resolve(evidenceRoot);
  const repositoryRoot = resolveRepositoryRoot(absolutePackageRoot);
  const manifestPath = path.join(absolutePackageRoot, 'package.json');
  const { source: manifestSource, value: manifest } = readJson(manifestPath, 'package manifest');
  const { source: contractSource, value: contract } = readJson(absoluteContractPath, 'build contract');
  const contractErrors = validateBuildContract(contract, { packageName: manifest.name });
  if (contractErrors.length > 0) throw new Error(contractErrors.join('\n'));
  const manifestReasons = validateManifestContract(manifest, contract);
  if (Number.parseInt(process.versions.node.split('.')[0], 10) !== contract.runtime.node_major) {
    manifestReasons.push(`NODE_MAJOR_MISMATCH:expected=${contract.runtime.node_major}:actual=${process.versions.node}`);
  }
  const generatedInputs = snapshotGeneratedInputs(absolutePackageRoot, contract);
  for (const input of generatedInputs) {
    if (!input.sha256) manifestReasons.push(`GENERATED_INPUT_MISSING:${input.path}`);
  }
  const identity = buildMaterialIdentity({
    repositoryRoot,
    manifestSource,
    manifest,
    contractSource,
    contract,
  });
  const duplicates = findDuplicateBuildGateImplementations(repositoryRoot);
  const dirty = packageWorktreeChanges(repositoryRoot, absolutePackageRoot);
  const preReasons = [...manifestReasons];
  if (dirty) preReasons.push('PACKAGE_WORKTREE_DIRTY');
  if (duplicates.length > 0) preReasons.push(`DUPLICATE_GATE_IMPLEMENTATION:${duplicates.join(',')}`);
  const runId = crypto.randomUUID();
  const startedAt = new Date().toISOString();
  let first = null;
  let second = null;
  let reproducibility = { reproducible: false, first_hash: null, second_hash: null };
  let evaluation;
  if (preReasons.length > 0) {
    evaluation = { outcome: 'BLOCKED', reasons: unique(preReasons) };
  } else {
    first = runBuildOnce({ repositoryRoot, packageRoot: absolutePackageRoot, manifest, contract });
    second = first.process.state === 'PASS'
      ? runBuildOnce({ repositoryRoot, packageRoot: absolutePackageRoot, manifest, contract })
      : null;
    reproducibility = second
      ? compareNormalizedBuilds(first.snapshot, second.snapshot)
      : { reproducible: false, first_hash: first.snapshot.content_hash, second_hash: null };
    const selected = second ?? first;
    evaluation = evaluateObservedBuild({
      processState: selected.process.state,
      processReason: selected.process.reason,
      manifestReasons,
      surfaceReasons: [...(first?.surface.reasons ?? []), ...(second?.surface.reasons ?? [])],
      packReasons: [...(first?.pack.reasons ?? []), ...(second?.pack.reasons ?? [])],
      crossPackageChanges: unique([...(first?.crossPackageChanges ?? []), ...(second?.crossPackageChanges ?? [])]),
      duplicateImplementations: duplicates,
      reproducibility,
    });
  }
  const endedAt = new Date().toISOString();
  const finalRun = second ?? first;
  const artifactSnapshot = finalRun?.snapshot ?? { files: [], content_hash: asSha256Identity('') };
  const evidence = {
    schema_version: EVIDENCE_SCHEMA_VERSION,
    gate_instance: GATE_INSTANCE_ID,
    run_identity: runId,
    started_at: startedAt,
    completed_at: endedAt,
    ...identity,
    generated_input_identities: generatedInputs,
    build_status: evaluation.outcome,
    reasons: evaluation.reasons,
    artifact_file_manifest: artifactSnapshot.files,
    artifact_content_hash: artifactSnapshot.content_hash ?? asSha256Identity(''),
    declarations_identity: finalRun?.surface.declarations_identity ?? asSha256Identity(''),
    exports_identity: finalRun?.surface.exports_identity ?? asSha256Identity(''),
    pack_integrity: finalRun?.pack.integrity ?? 'sha512:UNAVAILABLE',
    pack_metadata: finalRun?.pack.metadata ?? null,
    reproducibility,
    runs: [first, second].filter(Boolean).map(buildRunDiagnostic),
    invalidation_reason: null,
  };
  const history = loadHistory(absoluteEvidenceRoot, manifest.name);
  if (evidence.build_status === 'PASS' && history.some((entry) => (
    entry?.material_identity_sha256 === evidence.material_identity_sha256
    && entry?.build_status !== 'PASS'
  ))) {
    evidence.build_status = 'BLOCKED';
    evidence.reasons = unique([...evidence.reasons, 'SAME_INPUTS_PREVIOUSLY_NONPASS']);
  }
  const evidencePath = writeEvidence(absoluteEvidenceRoot, evidence);
  return { evidence: sanitizeObject(evidence), evidencePath };
}

export function verifyEvidence({ packageRoot, contractPath, evidencePath }) {
  const absolutePackageRoot = path.resolve(packageRoot);
  const absoluteContractPath = path.resolve(contractPath);
  const repositoryRoot = resolveRepositoryRoot(absolutePackageRoot);
  const { source: manifestSource, value: manifest } = readJson(
    path.join(absolutePackageRoot, 'package.json'),
    'package manifest',
  );
  const { source: contractSource, value: contract } = readJson(absoluteContractPath, 'build contract');
  const contractErrors = validateBuildContract(contract, { packageName: manifest.name });
  if (contractErrors.length > 0) throw new Error(contractErrors.join('\n'));
  const identity = buildMaterialIdentity({ repositoryRoot, manifestSource, manifest, contractSource, contract });
  const evidence = readJson(path.resolve(evidencePath), 'evidence').value;
  if (packageWorktreeChanges(repositoryRoot, absolutePackageRoot)) {
    return {
      outcome: 'STALE',
      invalidation_reason: 'PACKAGE_WORKTREE_DIRTY',
      changed_fields: ['source_commit'],
      errors: [],
      material_identity_sha256: identity.material_identity_sha256,
    };
  }
  const comparison = compareEvidenceIdentity(evidence, identity);
  return {
    outcome: comparison.current && evidence.build_status === 'PASS' ? 'PASS' : 'STALE',
    invalidation_reason: comparison.current
      ? (evidence.build_status === 'PASS' ? null : 'PREVIOUS_BUILD_NOT_PASS')
      : comparison.reason,
    changed_fields: comparison.changed_fields,
    errors: comparison.errors,
    material_identity_sha256: identity.material_identity_sha256,
  };
}

function parseArgs(argv) {
  const args = {
    packageRoot: null,
    contractPath: null,
    evidenceRoot: '.delivery/shared-package-builds',
    verifyEvidencePath: null,
    json: false,
    help: false,
  };
  for (let index = 0; index < argv.length; index += 1) {
    const token = argv[index];
    if (token === '--json') args.json = true;
    else if (token === '--help' || token === '-h') args.help = true;
    else if (['--package-root', '--contract', '--evidence-root', '--verify-evidence'].includes(token)) {
      const value = argv[index + 1];
      if (!value || value.startsWith('--')) throw new Error(`Missing value for ${token}.`);
      if (token === '--package-root') args.packageRoot = value;
      else if (token === '--contract') args.contractPath = value;
      else if (token === '--evidence-root') args.evidenceRoot = value;
      else args.verifyEvidencePath = value;
      index += 1;
    } else throw new Error(`Unknown argument: ${token}.`);
  }
  return args;
}

function printUsage() {
  console.log(`Usage:
  node ${IMPLEMENTATION_RELATIVE_PATH} --package-root <dir> --contract <json> [--evidence-root <dir>] [--json]
  node ${IMPLEMENTATION_RELATIVE_PATH} --package-root <dir> --contract <json> --verify-evidence <json> [--json]

The build contract is explicit and machine-readable. The gate never publishes a package. It performs two clean builds,
validates the distributable surface, packs with npm for inspection, checks isolated runtime import, compares normalized
content for reproducibility, and writes evidence under .delivery/shared-package-builds by default.`);
}

export function main(argv = process.argv.slice(2)) {
  const args = parseArgs(argv);
  if (args.help) return printUsage();
  if (!args.packageRoot) throw new Error('--package-root is required.');
  if (!args.contractPath) throw new Error('--contract is required.');
  if (args.verifyEvidencePath) {
    const verification = verifyEvidence({
      packageRoot: args.packageRoot,
      contractPath: args.contractPath,
      evidencePath: args.verifyEvidencePath,
    });
    console.log(args.json ? JSON.stringify(verification, null, 2) : `${verification.outcome}: build evidence verification.`);
    if (verification.outcome !== 'PASS') process.exitCode = 1;
    return verification;
  }
  const result = runGate({
    packageRoot: args.packageRoot,
    contractPath: args.contractPath,
    evidenceRoot: args.evidenceRoot,
  });
  console.log(args.json ? JSON.stringify(result.evidence, null, 2) : `${result.evidence.build_status}: ${result.evidence.package_name} build gate.`);
  if (result.evidence.build_status !== 'PASS') process.exitCode = 1;
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
