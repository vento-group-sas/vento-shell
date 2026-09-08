import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

import {
  sha256 as runtimeSha256,
  spawnGitUtf8,
  writePrettyJson,
} from './docs-runtime-primitives.mjs';

const REPOSITORIES = [
  'vento-anima',
  'vento-fogo',
  'vento-group-web',
  'vento-nexo',
  'vento-numera',
  'vento-origo',
  'vento-pass',
  'vento-pulso',
  'vento-shell',
  'vento-talento',
  'vento-viso',
  'vento-vital',
];

const IGNORED_DIRECTORIES = new Set([
  '.git',
  '.next',
  '.expo',
  '.turbo',
  'node_modules',
  'out',
  'build',
  'coverage',
]);

const CODE_EXTENSIONS = new Set(['.js', '.jsx', '.mjs', '.cjs', '.ts', '.tsx']);

function fail(message) {
  throw new Error(message);
}

function git(repositoryPath, args) {
  const result = spawnGitUtf8(args, { cwd: repositoryPath });
  return result.status === 0 ? result.stdout.trim() : null;
}

function walk(directory, files = []) {
  if (!fs.existsSync(directory)) return files;
  for (const entry of fs.readdirSync(directory, { withFileTypes: true })) {
    if (entry.isDirectory() && IGNORED_DIRECTORIES.has(entry.name)) continue;
    const fullPath = path.join(directory, entry.name);
    if (entry.isDirectory()) walk(fullPath, files);
    else if (entry.isFile()) files.push(fullPath);
  }
  return files;
}

function countCodeReferences(files, pattern) {
  let count = 0;
  for (const filePath of files) {
    if (!CODE_EXTENSIONS.has(path.extname(filePath).toLocaleLowerCase('en'))) continue;
    let source;
    try {
      source = fs.readFileSync(filePath, 'utf8');
    } catch {
      continue;
    }
    if (pattern.test(source)) count += 1;
  }
  return count;
}

function relativeFiles(repositoryPath, files) {
  return files.map((filePath) => path.relative(repositoryPath, filePath).replace(/\\/gu, '/'));
}

function readPackage(repositoryPath) {
  const packagePath = path.join(repositoryPath, 'package.json');
  if (!fs.existsSync(packagePath)) return null;
  const source = fs.readFileSync(packagePath);
  const manifest = JSON.parse(source.toString('utf8'));
  return {
    sha256: runtimeSha256(source),
    package_manager: manifest.packageManager ?? null,
    node_engine: manifest.engines?.node ?? null,
    npm_engine: manifest.engines?.npm ?? null,
    workspace_count: Array.isArray(manifest.workspaces) ? manifest.workspaces.length : 0,
  };
}

export function inspectRepository(repositoryPath, name = path.basename(repositoryPath)) {
  if (!fs.existsSync(path.join(repositoryPath, '.git'))) {
    return { name, available: false, path: repositoryPath };
  }
  const files = walk(repositoryPath);
  const relative = relativeFiles(repositoryPath, files);
  const branch = git(repositoryPath, ['branch', '--show-current']);
  const upstream = git(repositoryPath, ['rev-parse', '--abbrev-ref', '@{upstream}']);
  const divergence = upstream
    ? git(repositoryPath, ['rev-list', '--left-right', '--count', '@{upstream}...HEAD'])
    : null;
  const [behind, ahead] = divergence?.split(/\s+/u).map(Number) ?? [null, null];
  const status = git(repositoryPath, ['status', '--porcelain']) ?? '';

  const routePattern = /^(?:src\/)?app\/(?:.+\/)?(?:page|route|layout)\.(?:js|jsx|ts|tsx)$/u;
  const pagePattern = /^(?:src\/)?app\/(?:.+\/)?page\.(?:js|jsx|ts|tsx)$/u;
  const screenPattern = /^(?:src\/)?(?:screens?|views?)\/.+\.(?:js|jsx|ts|tsx)$/u;
  const componentPattern = /^(?:src\/)?components\/(?:.+\/)?[^/]+\.(?:js|jsx|ts|tsx)$/u;
  const migrationPattern = /^supabase\/migrations\/.+\.sql$/u;
  const contractPattern = /(?:^|\/)(?:contracts?|schemas?|types?)(?:\/|[^/]*\.(?:js|jsx|ts|tsx|json)$)/iu;

  return {
    name,
    available: true,
    path: repositoryPath,
    git: {
      branch,
      upstream,
      behind,
      ahead,
      clean: status.length === 0,
      changed_files: status ? status.split(/\r?\n/u).length : 0,
      head: git(repositoryPath, ['rev-parse', 'HEAD']),
    },
    package: readPackage(repositoryPath),
    surfaces: {
      route_files: relative.filter((file) => routePattern.test(file)).length,
      screen_files: relative.filter((file) => pagePattern.test(file) || screenPattern.test(file)).length,
      component_files: relative.filter((file) => componentPattern.test(file)).length,
      migration_files: relative.filter((file) => migrationPattern.test(file)).length,
      contract_files: relative.filter((file) => contractPattern.test(file)).length,
      supabase_consumer_files: countCodeReferences(
        files,
        /@supabase\/(?:supabase-js|ssr)|\bcreateClient\s*\(/u,
      ),
    },
  };
}

function comparableRepository(repository) {
  if (!repository?.available) return { available: false };
  return {
    available: true,
    package: repository.package,
    surfaces: repository.surfaces,
  };
}

export function compareSnapshots(current, baseline) {
  const baselineMap = new Map((baseline?.repositories ?? []).map((repo) => [repo.name, repo]));
  const changes = [];
  for (const repository of current.repositories) {
    const previous = baselineMap.get(repository.name);
    if (!previous) {
      changes.push({ repository: repository.name, kind: 'NEW_REPOSITORY' });
      continue;
    }
    const before = comparableRepository(previous);
    const after = comparableRepository(repository);
    if (JSON.stringify(before) !== JSON.stringify(after)) {
      changes.push({ repository: repository.name, kind: 'STRUCTURAL_DRIFT', before, after });
    }
    baselineMap.delete(repository.name);
  }
  for (const repository of baselineMap.keys()) {
    changes.push({ repository, kind: 'MISSING_REPOSITORY' });
  }
  return changes;
}

export function buildSnapshot({ workspaceRoot, repositories = REPOSITORIES } = {}) {
  if (!workspaceRoot) fail('workspaceRoot es obligatorio.');
  return {
    schema_version: 1,
    generated_at: new Date().toISOString(),
    authority: 'READ_ONLY_WORKSPACE_EVIDENCE_NOT_CANONICAL_APPROVAL',
    workspace_root: path.resolve(workspaceRoot),
    repositories: repositories.map((name) => inspectRepository(path.join(workspaceRoot, name), name)),
  };
}

function parseArgs(argv) {
  const args = {
    workspaceRoot: path.resolve(process.cwd(), '..'),
    baseline: path.resolve(process.cwd(), '.delivery', 'repository-drift-baseline.json'),
    writeBaseline: false,
    json: false,
    strict: false,
    help: false,
  };
  for (let index = 0; index < argv.length; index += 1) {
    const token = argv[index];
    if (token === '--write-baseline') args.writeBaseline = true;
    else if (token === '--json') args.json = true;
    else if (token === '--strict') args.strict = true;
    else if (token === '--help' || token === '-h') args.help = true;
    else if (token === '--workspace-root' || token === '--baseline') {
      const value = argv[index + 1];
      if (!value || value.startsWith('--')) fail(`falta el valor de ${token}.`);
      args[token === '--workspace-root' ? 'workspaceRoot' : 'baseline'] = path.resolve(value);
      index += 1;
    } else fail(`argumento desconocido: ${token}.`);
  }
  return args;
}

function printUsage() {
  console.log(`Uso:
  npm run docs:repos:drift
  npm run docs:repos:drift -- --write-baseline
  npm run docs:repos:drift -- --baseline <snapshot.json> [--json] [--strict]

El comando solo lee repositorios. Únicamente --write-baseline escribe el snapshot indicado.
La baseline es evidencia de corte, no aprobación canónica ni resultado operativo.`);
}

export function main(argv = process.argv.slice(2)) {
  const args = parseArgs(argv);
  if (args.help) return printUsage();
  const snapshot = buildSnapshot({ workspaceRoot: args.workspaceRoot });
  let baseline = null;
  if (fs.existsSync(args.baseline)) baseline = JSON.parse(fs.readFileSync(args.baseline, 'utf8'));
  const drift = baseline ? compareSnapshots(snapshot, baseline) : [];
  const liveWarnings = snapshot.repositories.flatMap((repository) => {
    if (!repository.available) return [`${repository.name}: repositorio no disponible.`];
    const warnings = [];
    if (!repository.git.clean) warnings.push(`${repository.name}: ${repository.git.changed_files} cambio(s) local(es).`);
    if (repository.git.behind > 0) warnings.push(`${repository.name}: behind ${repository.git.behind}.`);
    if (repository.git.ahead > 0) warnings.push(`${repository.name}: ahead ${repository.git.ahead}.`);
    if (!repository.git.upstream) warnings.push(`${repository.name}: sin upstream.`);
    return warnings;
  });

  if (args.writeBaseline) {
    writePrettyJson(args.baseline, snapshot);
  }

  const result = {
    snapshot,
    baseline: baseline ? args.baseline : null,
    baseline_written: args.writeBaseline ? args.baseline : null,
    drift,
    live_warnings: liveWarnings,
  };
  if (args.json) console.log(JSON.stringify(result, null, 2));
  else {
    console.log(`REPOSITORIOS: ${snapshot.repositories.filter(({ available }) => available).length}/${REPOSITORIES.length} disponibles.`);
    console.log(`BASELINE: ${baseline ? args.baseline : 'NO DEFINIDA'}.`);
    console.log(`DERIVA ESTRUCTURAL: ${drift.length}.`);
    for (const change of drift) console.log(`- ${change.repository}: ${change.kind}`);
    if (liveWarnings.length > 0) {
      console.log('ESTADO VIVO:');
      for (const warning of liveWarnings) console.log(`- ${warning}`);
    }
    if (!baseline) console.log('INFO: use --write-baseline para fijar un corte comparable local bajo .delivery/.');
    if (args.writeBaseline) console.log(`OK: baseline escrita en ${args.baseline}.`);
  }
  if (args.strict && (drift.length > 0 || liveWarnings.length > 0)) process.exitCode = 1;
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
