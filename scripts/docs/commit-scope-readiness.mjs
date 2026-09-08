import path from 'node:path';
import { fileURLToPath } from 'node:url';

import { spawnGitUtf8 } from './docs-runtime-primitives.mjs';

export const PACKAGE_REGISTRY_PATH = 'scripts/docs/package-readiness/implementation-package-registry.json';

function normalizePath(filePath) {
  return String(filePath ?? '').replaceAll('\\', '/').replace(/^\.\//u, '');
}

export function analyzeReadinessCommitScope(paths, baseAnalyzeCommitScope) {
  if (typeof baseAnalyzeCommitScope !== 'function') {
    throw new Error('baseAnalyzeCommitScope es obligatorio.');
  }
  const files = [...new Set(paths.map(normalizePath).filter(Boolean))].sort();
  const projections = files.filter((entry) => entry === PACKAGE_REGISTRY_PATH);
  const regular = files.filter((entry) => entry !== PACKAGE_REGISTRY_PATH);
  const report = baseAnalyzeCommitScope(regular);
  const scopes = { ...(report.scopes ?? {}) };
  if (projections.length > 0) scopes.PROJECTION = [...new Set([...(scopes.PROJECTION ?? []), ...projections])].sort();
  return {
    ...report,
    files,
    scopes,
  };
}

function runGit(args) {
  const result = spawnGitUtf8(args, {
    cwd: process.cwd(),
    windowsHide: true,
  });
  if (result.status !== 0) {
    throw new Error(String(result.stderr ?? '').trim() || `git ${args.join(' ')} falló.`);
  }
  return String(result.stdout ?? '').trim();
}

function pathsForCommit(commit) {
  return runGit(['diff-tree', '--root', '--no-commit-id', '--name-only', '-r', commit])
    .split(/\r?\n/u)
    .filter(Boolean);
}

function parseArgs(argv) {
  const args = { staged: false, range: null, physical: false };
  for (let index = 0; index < argv.length; index += 1) {
    const token = argv[index];
    if (token === '--staged') args.staged = true;
    else if (token === '--range') {
      args.range = argv[index + 1];
      if (!args.range) throw new Error('falta el valor de --range.');
      index += 1;
    } else if (token === '--instance-id' || token === '--implementation-head-ref') {
      args.physical = true;
      index += 1;
      if (!argv[index]) throw new Error(`falta el valor de ${token}.`);
    } else throw new Error(`argumento desconocido: ${token}.`);
  }
  if (args.staged && args.range) throw new Error('--staged y --range son mutuamente excluyentes.');
  return args;
}

export async function main(argv = process.argv.slice(2)) {
  const parsed = parseArgs(argv);
  const original = await import('./commit-scope.mjs');
  if (parsed.physical) return original.main(argv);

  const reports = [];
  if (parsed.range) {
    const commits = runGit(['rev-list', '--reverse', parsed.range]).split(/\r?\n/u).filter(Boolean);
    for (const commit of commits) {
      reports.push({
        label: commit.slice(0, 12),
        report: analyzeReadinessCommitScope(pathsForCommit(commit), original.analyzeCommitScope),
      });
    }
  } else {
    const diffArgs = parsed.staged
      ? ['diff', '--cached', '--name-only', '--diff-filter=ACMRD']
      : ['diff', '--name-only', '--diff-filter=ACMRD', 'HEAD'];
    const paths = runGit(diffArgs).split(/\r?\n/u).filter(Boolean);
    reports.push({
      label: parsed.staged ? 'staged' : 'working-tree',
      report: analyzeReadinessCommitScope(paths, original.analyzeCommitScope),
    });
  }

  const errors = [];
  for (const { label, report } of reports) {
    for (const warning of report.warnings ?? []) console.warn(`[COMMIT SCOPE] ${label}: ADVERTENCIA: ${warning}`);
    for (const error of report.errors ?? []) errors.push(`${label}: ${error}`);
  }
  if (errors.length > 0) throw new Error(errors.join('\n'));
  console.log(`OK: alcance de ${reports.length} corte(s) sin mezcla transversal prohibida; package registry tratado como PROJECTION.`);
  return reports;
}

const isCli = process.argv[1]
  && path.resolve(process.argv[1]) === path.resolve(fileURLToPath(import.meta.url));

if (isCli) {
  main().catch((error) => {
    console.error(`ERROR: ${error instanceof Error ? error.message : String(error)}`);
    process.exitCode = 1;
  });
}
