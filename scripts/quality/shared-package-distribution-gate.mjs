import fs from 'node:fs';
import path from 'node:path';
import { spawnSync } from 'node:child_process';
import { fileURLToPath } from 'node:url';

export const PRIVATE_CANDIDATES = Object.freeze({
  '@vento/contracts': 'contracts',
  '@vento/os-context': 'os-context',
  '@vento/supabase': 'supabase',
});
const SCRIPT_ROOT = path.resolve(fileURLToPath(new URL('../..', import.meta.url)));
const VERSION_PATTERN = /^\d+\.\d+\.\d+(?:-[0-9A-Za-z.-]+)?(?:\+[0-9A-Za-z.-]+)?$/u;

function invariant(condition, reason) {
  if (!condition) throw new Error('VENTO_DISTRIBUTION:' + reason);
}

export function exportSurface(manifest) {
  invariant(manifest?.exports && typeof manifest.exports === 'object'
    && !Array.isArray(manifest.exports), 'NO_EXPLICIT_EXPORTS');
  const items = [];
  for (const [subpath, declaration] of Object.entries(manifest.exports)) {
    invariant(subpath === '.' || (subpath.startsWith('./') && !subpath.includes('..')),
      'INVALID_SUBPATH:' + subpath);
    invariant(declaration && typeof declaration === 'object' && !Array.isArray(declaration),
      'CONDITIONAL_EXPORT_REQUIRED:' + subpath);
    const types = declaration.types;
    const runtime = declaration.import ?? declaration.node;
    invariant(typeof types === 'string' && typeof runtime === 'string',
      'MISSING_TYPES_OR_RUNTIME:' + subpath);
    invariant(/^\.\/dist\/[A-Za-z0-9_./-]+\.js$/u.test(runtime)
      && /^\.\/dist\/[A-Za-z0-9_./-]+\.d\.ts$/u.test(types),
    'EXPORT_MUST_TARGET_COMPILED_DIST:' + subpath);
    invariant(types === runtime.replace(/\.js$/u, '.d.ts'),
      'RUNTIME_TYPES_MISMATCH:' + subpath);
    invariant(Object.keys(declaration).every((key) =>
      ['types', 'import', 'default', 'node'].includes(key)), 'UNEXPECTED_EXPORT_CONDITION:' + subpath);
    if ('default' in declaration) {
      invariant(declaration.default === runtime, 'DEFAULT_EXPORT_MISMATCH:' + subpath);
    }
    items.push({ subpath, types, runtime });
  }
  invariant(items.length > 0, 'NO_PUBLIC_SUBPATHS');
  return items;
}

function regularFile(filepath) {
  let stats;
  try {
    stats = fs.lstatSync(filepath);
  } catch {
    invariant(false, 'MISSING_BUILD_OUTPUT:' + path.basename(filepath));
  }
  invariant(stats?.isFile() && !stats.isSymbolicLink(), 'NONREGULAR_BUILD_OUTPUT');
}

export function inspectCandidate(name, { root = SCRIPT_ROOT, built = true } = {}) {
  invariant(Object.hasOwn(PRIVATE_CANDIDATES, name), 'UNKNOWN_PACKAGE');
  const packageRoot = path.join(root, 'packages', PRIVATE_CANDIDATES[name]);
  const filename = path.join(packageRoot, 'package.json');
  let manifest;
  try {
    manifest = JSON.parse(fs.readFileSync(filename, 'utf8'));
  } catch {
    invariant(false, 'MANIFEST_UNREADABLE:' + name);
  }
  invariant(manifest.name === name && manifest.type === 'module', 'MANIFEST_IDENTITY');
  invariant(typeof manifest.version === 'string' && VERSION_PATTERN.test(manifest.version),
    'CANDIDATE_VERSION_REQUIRED:' + name);
  invariant(manifest.private === true, 'UNAUTHORIZED_NPM_RELEASE');
  invariant(Array.isArray(manifest.files) && manifest.files.length === 1
    && manifest.files[0] === 'dist/', 'DISTRIBUTION_ALLOWLIST');
  invariant(typeof manifest.scripts?.build === 'string'
    && typeof manifest.scripts?.validate === 'string', 'BUILD_AND_VALIDATION_REQUIRED');
  const entries = exportSurface(manifest);
  if (name === '@vento/supabase') {
    invariant(!manifest.exports['.'], 'IMPLICIT_SUPABASE_RUNTIME_FORBIDDEN');
    invariant(!manifest.exports['./privileged'].import
      && !manifest.exports['./privileged'].default
      && manifest.exports['./privileged'].node === './dist/privileged.js',
    'PRIVILEGED_MUST_BE_NODE_ONLY');
    invariant(['./browser', './server', './native', './privileged', './errors', './runtime']
      .every((subpath) => manifest.exports[subpath]), 'SUPABASE_RUNTIME_BOUNDARY_INCOMPLETE');
  }
  if (built) {
    for (const { types, runtime } of entries) {
      regularFile(path.join(packageRoot, types));
      regularFile(path.join(packageRoot, runtime));
    }
  }
  return { name, version: manifest.version, private: manifest.private,
    publish_certified: false, published: false, entries, packageRoot };
}

function npmCommand(args, cwd) {
  const npmCli = process.env.npm_execpath;
  const command = npmCli ? process.execPath : (process.platform === 'win32' ? 'npm.cmd' : 'npm');
  const argv = npmCli ? [npmCli, ...args] : args;
  return spawnSync(command, argv, {
    cwd, encoding: 'utf8', timeout: 180_000, windowsHide: true,
    maxBuffer: 8 * 1024 * 1024,
  });
}

export function validatePack(name, { root = SCRIPT_ROOT } = {}) {
  const manifest = inspectCandidate(name, { root, built: true });
  const result = npmCommand(
    ['pack', '--workspace', name, '--dry-run', '--json', '--ignore-scripts', '--offline'], root,
  );
  invariant(!result.error && result.status === 0, 'NPM_PACK_DRY_RUN_FAILED:' + name);
  let metadata;
  try {
    metadata = JSON.parse(result.stdout);
  } catch {
    invariant(false, 'NPM_PACK_RESPONSE_INVALID');
  }
  invariant(Array.isArray(metadata) && metadata.length === 1, 'NPM_PACK_CARDINALITY');
  const files = (metadata[0].files ?? []).map((file) => file.path);
  invariant(files.length > 0 && files.includes('package.json'), 'EMPTY_PACKAGE');
  for (const { runtime, types } of manifest.entries) {
    invariant(files.includes(runtime.slice(2)) && files.includes(types.slice(2)),
      'DISTRIBUTION_EXPORT_MISSING');
  }
  invariant(files.every((filename) => filename === 'package.json'
    || filename === 'README.md' || filename.startsWith('dist/')),
  'PRIVATE_SOURCE_INCLUDED_IN_TARBALL');
  invariant(files.every((filename) => filename !== 'dist/privileged.ts'
    && !/(?:^|\/)\.env(?:\.|$)|\.pem$|\.key$|service[-_]role/u.test(filename)),
  'SENSITIVE_FILE_INCLUDED_IN_TARBALL');
  return {
    package: name, version: manifest.version, checked_export_entries: manifest.entries.length,
    packaged_files: files.length, npm_pack: 'PASS', runtime_exports: 'PASS',
    publication_executed: false, release_certified: false,
  };
}

function main() {
  const [name, extra] = process.argv.slice(2);
  invariant(typeof name === 'string' && !extra, 'USAGE_ONE_CANONICAL_PACKAGE_REQUIRED');
  const result = validatePack(name);
  console.log(JSON.stringify(result, null, 2));
}

const calledDirectly = process.argv[1]
  && path.resolve(process.argv[1]) === fileURLToPath(import.meta.url);
if (calledDirectly) {
  try {
    main();
  } catch (error) {
    console.error(error instanceof Error ? error.message : 'VENTO_DISTRIBUTION:UNKNOWN');
    process.exitCode = 1;
  }
}
