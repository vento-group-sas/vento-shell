import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

import { spawnGitUtf8 } from './docs-runtime-primitives.mjs';

import {
  assertImplementationPaths,
  implementationBranchName,
  normalizeInstanceId,
} from './implementation-branch-lifecycle.mjs';
import { instanceRecordRelativePath } from './implementation-control.mjs';

const TRANSVERSAL_PLAN_FILES = new Set([
  'docs/plan-canonico/modular/01_PROTOCOLO.md',
  'docs/plan-canonico/modular/delivery-contract.json',
  'docs/plan-canonico/modular/implementation-handoff-template.md',
  'docs/plan-canonico/modular/implementation-readiness-policy.json',
  'docs/plan-canonico/modular/implementation-control.json',
  'docs/plan-canonico/modular/package-gate-policy.json',
  'docs/plan-canonico/modular/implementation-materialization-map.json',
  'docs/plan-canonico/modular/package-selection-policy.json',
  'docs/plan-canonico/modular/package-execution-policy.json',
  'docs/plan-canonico/modular/chatgpt-work-starter-template.txt',
  'docs/plan-canonico/modular/continuity-route.json',
  'docs/plan-canonico/modular/task-delivery-template.md',
  'docs/plan-canonico/modular/task-development-policy.json',
  'docs/plan-canonico/modular/task-format-policy.json',
  'docs/plan-canonico/modular/task-work-topology.json',
]);
const DERIVED_PLAN_PROJECTIONS = new Set([
  'docs/plan-canonico/modular/00_CABECERA_Y_ESTADO.md',
  'docs/plan-canonico/modular/active-sequence.json',
  'docs/plan-canonico/modular/.generated/REGISTRO_GLOBAL_DE_TAREAS.md',
  'docs/plan-canonico/modular/.generated/REGISTRO_DE_TAREAS_PENDIENTES_CON_CONTEXTO.md',
]);

const IMPLEMENTATION_INSTANCES_DIRECTORY = 'docs/plan-canonico/modular/implementation-instances';

function loadImplementationInstance(root, instanceId) {
  const id = normalizeInstanceId(instanceId);
  const relativePath = instanceRecordRelativePath(id);
  const absolutePath = path.join(root, ...relativePath.split('/'));
  if (!fs.existsSync(absolutePath) || !fs.statSync(absolutePath).isFile()) {
    throw new Error(`No existe el registro de instancia ${id}.`);
  }
  const record = JSON.parse(fs.readFileSync(absolutePath, 'utf8'));
  if (record.instance_id !== id) throw new Error(`El registro de ${id} no conserva instance_id exacto.`);
  return record;
}

export function resolveImplementationInstanceFromHeadRef({
  root = process.cwd(),
  headRef,
} = {}) {
  const normalizedHead = String(headRef ?? '').trim();
  if (!normalizedHead.startsWith('implementation/')) {
    throw new Error(`Head ref fisico invalido: ${normalizedHead || 'VACIO'}.`);
  }
  const directory = path.join(root, ...IMPLEMENTATION_INSTANCES_DIRECTORY.split('/'));
  if (!fs.existsSync(directory) || !fs.statSync(directory).isDirectory()) {
    throw new Error('No existe implementation-instances.');
  }
  const matches = [];
  for (const entry of fs.readdirSync(directory, { withFileTypes: true })) {
    if (!entry.isFile() || !entry.name.endsWith('.json')) continue;
    const record = JSON.parse(fs.readFileSync(path.join(directory, entry.name), 'utf8'));
    if (!record?.instance_id) continue;
    try {
      if (implementationBranchName(record.instance_id) === normalizedHead) matches.push(record);
    } catch {
      // invalid records are handled by the implementation-control validator elsewhere
    }
  }
  if (matches.length !== 1) {
    throw new Error(`No se pudo resolver una instancia unica para ${normalizedHead}; coincidencias: ${matches.length}.`);
  }
  return matches[0];
}

function baseRefFromRange(range) {
  const raw = String(range ?? '').trim();
  const match = /^(.+?)\.{2,3}(.+)$/u.exec(raw);
  if (!match) throw new Error(`Rango Git invalido: ${raw || 'VACIO'}.`);
  return match[1];
}

function netPathsForRange(range) {
  return runGit(['diff', '--name-only', '--diff-filter=ACMRD', range])
    .split(/\r?\n/u)
    .filter(Boolean);
}

function normalizePath(filePath) {
  return String(filePath).replaceAll('\\', '/').replace(/^\.\//u, '');
}

export function classifyCommitPath(filePath) {
  const normalized = normalizePath(filePath);
  if (TRANSVERSAL_PLAN_FILES.has(normalized)) return 'TRANSVERSAL';
  if (normalized.startsWith('docs/plan-canonico/modular/implementation-instances/')) {
    return 'TRANSVERSAL';
  }
  if (normalized.startsWith('docs/plan-canonico/modular/package-gate-instances/')) {
    return 'TRANSVERSAL';
  }
  if (DERIVED_PLAN_PROJECTIONS.has(normalized)) return 'PROJECTION';
  if (/^docs\/[^/]+\.md$/u.test(normalized)) return 'OPERATIONS_DOC';
  if (
    normalized === '.gitattributes'
    || normalized === '.editorconfig'
    || normalized === 'AGENTS.md'
    || normalized === 'package.json'
    || normalized === 'package-lock.json'
    || normalized.startsWith('scripts/docs/')
    || normalized.startsWith('scripts/quality/')
    || normalized.startsWith('scripts/supabase/')
    || normalized.startsWith('quality/')
    || normalized.startsWith('.github/')
    || normalized.startsWith('.vscode/')
  ) return 'TRANSVERSAL';
  if (normalized.startsWith('docs/plan-canonico/modular/')) return 'CANONICAL_TASK';
  if (
    normalized.startsWith('src/')
    || normalized.startsWith('packages/')
    || normalized.startsWith('supabase/')
    || normalized.startsWith('templates/')
  ) return 'APPLICATION';
  return 'OTHER';
}

export function analyzeCommitScope(paths) {
  const files = [...new Set(paths.map(normalizePath).filter(Boolean))].sort();
  const byScope = new Map();
  for (const file of files) {
    const scope = classifyCommitPath(file);
    if (!byScope.has(scope)) byScope.set(scope, []);
    byScope.get(scope).push(file);
  }
  const errors = [];
  const warnings = [];
  if (byScope.has('CANONICAL_TASK') && byScope.has('TRANSVERSAL')) {
    errors.push('el commit mezcla desarrollo de tarea canónica con infraestructura transversal.');
  }
  if (byScope.has('CANONICAL_TASK') && byScope.has('APPLICATION')) {
    warnings.push('el commit mezcla plan canónico y aplicación; confirme que la tarea autoriza ambos alcances.');
  }
  if (byScope.has('CANONICAL_TASK') && byScope.has('OPERATIONS_DOC')) {
    errors.push('el commit mezcla desarrollo de tarea canónica con documentación operativa.');
  }
  if (byScope.has('TRANSVERSAL') && byScope.has('OPERATIONS_DOC')) {
    errors.push('el commit mezcla infraestructura transversal con documentación operativa.');
  }
  if (byScope.has('APPLICATION') && byScope.has('OPERATIONS_DOC')) {
    errors.push('el commit mezcla aplicación con documentación operativa.');
  }
  return {
    files,
    scopes: Object.fromEntries([...byScope.entries()]),
    errors,
    warnings,
  };
}

function runGit(args) {
  const result = spawnGitUtf8(args, {
    cwd: process.cwd(),
    windowsHide: true,
  });
  if (result.status !== 0) {
    throw new Error(result.stderr.trim() || `git ${args.join(' ')} falló.`);
  }
  return result.stdout.trim();
}

function pathsForCommit(commit) {
  return runGit(['diff-tree', '--root', '--no-commit-id', '--name-only', '-r', commit])
    .split(/\r?\n/u)
    .filter(Boolean);
}

function parseArgs(argv) {
  const args = { staged: false, range: null, instanceId: null, implementationHeadRef: null };
  for (let index = 0; index < argv.length; index += 1) {
    const token = argv[index];
    if (token === '--staged') args.staged = true;
    else if (token === '--range') {
      args.range = argv[index + 1];
      if (!args.range) throw new Error('falta el valor de --range.');
      index += 1;
    } else if (token === '--instance-id') {
      args.instanceId = argv[index + 1];
      if (!args.instanceId) throw new Error('falta el valor de --instance-id.');
      index += 1;
    } else if (token === '--implementation-head-ref') {
      args.implementationHeadRef = argv[index + 1];
      if (!args.implementationHeadRef) throw new Error('falta el valor de --implementation-head-ref.');
      index += 1;
    } else throw new Error(`argumento desconocido: ${token}.`);
  }
  if (args.staged && args.range) throw new Error('--staged y --range son mutuamente excluyentes.');
  if (args.instanceId && args.implementationHeadRef) {
    throw new Error('--instance-id y --implementation-head-ref son mutuamente excluyentes.');
  }
  if ((args.instanceId || args.implementationHeadRef) && !args.staged && !args.range) {
    throw new Error('el alcance fisico exige --staged o --range.');
  }
  return args;
}

export function main(argv = process.argv.slice(2)) {
  const args = parseArgs(argv);
  const reports = [];

  if (args.instanceId || args.implementationHeadRef) {
    const root = process.cwd();
    const instance = args.instanceId
      ? loadImplementationInstance(root, args.instanceId)
      : resolveImplementationInstanceFromHeadRef({ root, headRef: args.implementationHeadRef });
    const paths = args.range
      ? netPathsForRange(args.range)
      : runGit(['diff', '--cached', '--name-only', '--diff-filter=ACMRD'])
        .split(/\r?\n/u)
        .filter(Boolean);
    const baseRef = args.range ? baseRefFromRange(args.range) : 'origin/main';
    assertImplementationPaths(paths, instance, { root, baseRef });
    console.log(`OK: alcance fisico ${instance.instance_id}; ${paths.length} archivo(s) dentro de authorized_changes o proyecciones del lifecycle.`);
    return [{ label: instance.instance_id, report: { files: paths, scopes: { PHYSICAL_INSTANCE: paths }, errors: [], warnings: [] } }];
  }
  if (args.range) {
    const commits = runGit(['rev-list', '--reverse', args.range]).split(/\r?\n/u).filter(Boolean);
    for (const commit of commits) {
      reports.push({ label: commit.slice(0, 12), report: analyzeCommitScope(pathsForCommit(commit)) });
    }
  } else {
    const diffArgs = args.staged
      ? ['diff', '--cached', '--name-only', '--diff-filter=ACMRD']
      : ['diff', '--name-only', '--diff-filter=ACMRD', 'HEAD'];
    reports.push({ label: args.staged ? 'staged' : 'working-tree', report: analyzeCommitScope(
      runGit(diffArgs).split(/\r?\n/u).filter(Boolean),
    ) });
  }

  const errors = [];
  for (const { label, report } of reports) {
    for (const warning of report.warnings) console.warn(`[COMMIT SCOPE] ${label}: ADVERTENCIA: ${warning}`);
    for (const error of report.errors) errors.push(`${label}: ${error}`);
  }
  if (errors.length > 0) throw new Error(errors.join('\n'));
  console.log(`OK: alcance de ${reports.length} corte(s) sin mezcla transversal prohibida.`);
  return reports;
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
