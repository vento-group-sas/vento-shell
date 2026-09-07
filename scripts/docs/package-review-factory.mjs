import crypto from 'node:crypto';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { spawnSync } from 'node:child_process';

import { scanPackageReadiness } from './package-readiness-scanner.mjs';

const FACTORY_ID = 'VENTO-PACKAGE-REVIEW-FACTORY-V1';
const SCHEMA_VERSION = 1;
const OUTPUT_ROOT = '.delivery/package-review-factory';
const DOSSIERS_DIR = `${OUTPUT_ROOT}/dossiers`;
const INDEX_PATH = `${OUTPUT_ROOT}/index.json`;
const LEDGER_PATH = `${OUTPUT_ROOT}/ledger.json`;
const ANOMALY_QUEUE_PATH = `${OUTPUT_ROOT}/anomaly-queue.json`;
const SOURCE_MANIFEST_PATH = `${OUTPUT_ROOT}/source-manifest.json`;
const DOSSIERS_MD_PATH = `${OUTPUT_ROOT}/PACKAGE_REVIEW_DOSSIERS.md`;
const BATCH_JSON_PATH = `${OUTPUT_ROOT}/review-batch.json`;
const BATCH_MD_PATH = `${OUTPUT_ROOT}/REVIEW_BATCH.md`;
const RECEIPT_TEMPLATE_PATH = `${OUTPUT_ROOT}/review-receipt-template.json`;
const CANONICAL_BLOCK_ROOT = 'docs/plan-canonico/modular/bloques';
const CANONICAL_PACKAGE_SOURCE = 'docs/plan-canonico/modular/bloques/E5_PLANIFICACION_DE_IMPLEMENTACION/02_PAQUETES_DE_IMPLEMENTACION.md';
const ROUTING_SOURCE = 'docs/plan-canonico/modular/bloques/W_WORKFLOWS_TAREAS_Y_RESOLUCION/02_MATRIZ_DE_ENRUTAMIENTO_Y_BRECHAS.md';
const TREQ_SOURCE = 'docs/plan-canonico/modular/bloques/E6_IOT_HARDWARE_Y_QR/04A_REGISTRO_CANONICO_DE_REQUISITOS_DE_PRUEBA.md';
const IMPLEMENTATION_ORDER_SOURCE = 'docs/plan-canonico/modular/90_ORDEN_DE_IMPLEMENTACION.md';
const PACKAGE_EXECUTION_POLICY_SOURCE = 'docs/plan-canonico/modular/package-execution-policy.json';
const PACKAGE_READINESS_CONTRACT_SOURCE = 'scripts/docs/package-readiness/package-readiness-contract.json';
const TASK_SECTION_CHAR_LIMIT = 9000;
const TOKEN_SNIPPET_LIMIT = 8;
const EVIDENCE_PREVIEW_CHAR_LIMIT = 160;
const BATCH_HEADER_RESERVE_MAX_CHARS = 4096;
const REVIEW_TOOLING_PATHS = new Set([
  'package.json',
  'scripts/docs/package-review-factory.mjs',
  'scripts/docs/package-review-factory.test.mjs',
]);

function fail(message, code = 1) {
  const error = new Error(message);
  error.exitCode = code;
  throw error;
}

function run(command, args, {
  cwd = process.cwd(),
  allowFailure = false,
} = {}) {
  const result = spawnSync(command, args, {
    cwd,
    encoding: 'utf8',
    windowsHide: true,
    stdio: ['ignore', 'pipe', 'pipe'],
  });

  if (result.error) {
    if (allowFailure) return { status: 1, stdout: '', stderr: result.error.message };
    fail(`${command} no disponible: ${result.error.message}`);
  }

  const status = Number.isInteger(result.status) ? result.status : 1;
  const stdout = String(result.stdout ?? '').trimEnd();
  const stderr = String(result.stderr ?? '').trimEnd();

  if (status !== 0 && !allowFailure) {
    fail(stderr || stdout || `${command} ${args.join(' ')} fallo.`, status);
  }

  return { status, stdout, stderr };
}

function git(args, options = {}) {
  return run('git', args, options);
}

function normalizePath(value) {
  return String(value ?? '').replaceAll('\\', '/').replace(/^\.\/+/u, '');
}

function stableJson(value) {
  if (Array.isArray(value)) {
    return `[${value.map((entry) => stableJson(entry)).join(',')}]`;
  }

  if (value && typeof value === 'object') {
    const keys = Object.keys(value).sort((left, right) => left.localeCompare(right, 'en'));
    return `{${keys.map((key) => `${JSON.stringify(key)}:${stableJson(value[key])}`).join(',')}}`;
  }

  return JSON.stringify(value);
}

function sha256(value) {
  const data = Buffer.isBuffer(value) ? value : Buffer.from(String(value), 'utf8');
  return crypto.createHash('sha256').update(data).digest('hex');
}

function writeJson(root, relativePath, value) {
  const absolute = path.join(root, ...relativePath.split('/'));
  fs.mkdirSync(path.dirname(absolute), { recursive: true });
  fs.writeFileSync(absolute, `${JSON.stringify(value, null, 2)}\n`, 'utf8');
}

function writeText(root, relativePath, value) {
  const absolute = path.join(root, ...relativePath.split('/'));
  fs.mkdirSync(path.dirname(absolute), { recursive: true });
  fs.writeFileSync(absolute, String(value).replace(/\r\n/gu, '\n'), 'utf8');
}

function readJsonIfExists(root, relativePath) {
  const absolute = path.join(root, ...relativePath.split('/'));
  if (!fs.existsSync(absolute)) return null;

  try {
    return JSON.parse(fs.readFileSync(absolute, 'utf8'));
  } catch (error) {
    fail(`${relativePath} contiene JSON invalido: ${error instanceof Error ? error.message : String(error)}`);
  }
}

function repositoryRoot() {
  const root = git(['rev-parse', '--show-toplevel']).stdout.trim();
  if (!root) fail('No se pudo resolver la raiz Git.');
  return root;
}

function currentHead(root) {
  return git(['rev-parse', 'HEAD'], { cwd: root }).stdout.trim();
}

function currentBranch(root) {
  return git(['branch', '--show-current'], { cwd: root }).stdout.trim();
}

function worktreeDirtyPaths(root) {
  return git(
    ['status', '--porcelain=v1', '--untracked-files=all'],
    { cwd: root },
  ).stdout
    .split(/\r?\n/u)
    .filter(Boolean)
    .map((line) => normalizePath(line.length >= 4 ? line.slice(3).trim().split(' -> ').at(-1) : line.trim()))
    .filter(Boolean)
    .filter((entry) => !entry.startsWith('.delivery/'))
    .filter((entry) => !REVIEW_TOOLING_PATHS.has(entry));
}

function assertCanonicalReviewWorkspace(root) {
  const branch = currentBranch(root);
  if (branch !== 'main') {
    fail(`PACKAGE REVIEW FACTORY exige rama main; rama actual: ${branch || 'DETACHED'}.`);
  }

  const head = currentHead(root);
  const originMain = git(['rev-parse', 'origin/main'], { cwd: root }).stdout.trim();
  if (head !== originMain) {
    fail(`PACKAGE REVIEW FACTORY exige main sincronizado 0/0. HEAD=${head} origin/main=${originMain}`);
  }

  const dirty = worktreeDirtyPaths(root);
  if (dirty.length > 0) {
    fail(`PACKAGE REVIEW FACTORY exige worktree canonico limpio: ${dirty.join(', ')}`);
  }

  return { branch, head };
}

function listTrackedMarkdown(root) {
  const output = git(
    ['ls-files', '--', CANONICAL_BLOCK_ROOT],
    { cwd: root },
  ).stdout;

  return output
    .split(/\r?\n/u)
    .map((entry) => normalizePath(entry.trim()))
    .filter((entry) => entry.endsWith('.md'))
    .filter((entry) => fs.existsSync(path.join(root, ...entry.split('/'))));
}

function sourceBlob(root, relativePath) {
  const normalized = normalizePath(relativePath);
  const absolute = path.join(root, ...normalized.split('/'));

  if (!fs.existsSync(absolute)) {
    return {
      path: normalized,
      present: false,
      blob_sha: null,
    };
  }

  return {
    path: normalized,
    present: true,
    blob_sha: git(['hash-object', normalized], { cwd: root }).stdout.trim(),
  };
}

function buildSourceManifest(root, workspace) {
  const canonicalTree = git(
    ['ls-tree', '-r', 'HEAD', '--', CANONICAL_BLOCK_ROOT],
    { cwd: root },
  ).stdout.trim();

  const sources = [
    CANONICAL_PACKAGE_SOURCE,
    ROUTING_SOURCE,
    TREQ_SOURCE,
    IMPLEMENTATION_ORDER_SOURCE,
    PACKAGE_EXECUTION_POLICY_SOURCE,
    PACKAGE_READINESS_CONTRACT_SOURCE,
    'scripts/docs/package-readiness-scanner.mjs',
    'scripts/docs/package-review-factory.mjs',
  ].map((relativePath) => sourceBlob(root, relativePath));

  return {
    schema_version: SCHEMA_VERSION,
    factory_id: FACTORY_ID,
    generated_from_branch: workspace.branch,
    generated_from_head: workspace.head,
    canonical_block_tree_sha256: sha256(canonicalTree),
    sources,
  };
}

function uniqueSorted(values) {
  return [...new Set(
    (Array.isArray(values) ? values : [])
      .map((entry) => String(entry ?? '').trim())
      .filter(Boolean),
  )].sort((left, right) => left.localeCompare(right, 'en'));
}

function taskIdsFromPrerequisites(taskPrerequisites) {
  const tasks = Array.isArray(taskPrerequisites?.tasks)
    ? taskPrerequisites.tasks
    : [];

  return uniqueSorted(
    tasks.map((entry) => entry?.task_id),
  );
}

function compactTaskPrerequisites(taskPrerequisites) {
  const tasks = Array.isArray(taskPrerequisites?.tasks)
    ? taskPrerequisites.tasks
    : [];

  return {
    progress_percent: taskPrerequisites?.progress_percent ?? null,
    missing_task_ids: uniqueSorted(taskPrerequisites?.missing_task_ids),
    tasks: tasks.map((entry) => ({
      task_id: entry?.task_id ?? null,
      state: entry?.state ?? entry?.status ?? null,
      title: entry?.title ?? null,
      owner: entry?.owner ?? entry?.owner_file ?? null,
      approved: entry?.approved ?? null,
      role: entry?.role ?? entry?.task_role ?? null,
    })),
  };
}

export function normalizeReviewPackage(pkg) {
  const primaryTaskIds = uniqueSorted(pkg?.primary_task_ids);
  const supportTaskIds = uniqueSorted(pkg?.support_task_ids);
  const taskPrerequisiteIds = taskIdsFromPrerequisites(pkg?.task_prerequisites);
  const gapIds = uniqueSorted(
    pkg?.gap_ids_sampled_from_deliv_pkg_002
      ?? pkg?.gap_ids
      ?? [],
  );

  return {
    package_id: String(pkg?.package_id ?? '').trim(),
    source_kind: pkg?.source_kind ?? null,
    status: pkg?.status ?? null,
    status_scope: pkg?.status_scope ?? null,
    objective: pkg?.objective ?? null,
    repository_owner: pkg?.repository_owner ?? null,
    runtime_profile: pkg?.runtime_profile ?? null,
    dominant_task_id: pkg?.dominant_task_id ?? null,
    primary_task_ids: primaryTaskIds,
    support_task_ids: supportTaskIds,
    task_prerequisite_ids: taskPrerequisiteIds,
    task_prerequisites: compactTaskPrerequisites(pkg?.task_prerequisites),
    capability_ids: uniqueSorted(pkg?.capability_ids),
    process_ids: uniqueSorted(pkg?.process_ids),
    gap_ids: gapIds,
    gap_membership_count: Number.isInteger(pkg?.gap_membership_count)
      ? pkg.gap_membership_count
      : null,
    execution: {
      layer: Number.isInteger(pkg?.execution?.layer)
        ? pkg.execution.layer
        : null,
      position: pkg?.execution?.position ?? null,
      depends_on_package_ids: uniqueSorted(pkg?.execution?.depends_on_package_ids),
      deferred: pkg?.execution?.deferred ?? false,
    },
    execution_requirements: {
      supabase_mutation_required:
        pkg?.execution_requirements?.supabase_mutation_required === true,
      target_paths: uniqueSorted(pkg?.execution_requirements?.target_paths),
      target_repositories: uniqueSorted(
        pkg?.execution_requirements?.target_repositories
          ?? pkg?.execution_requirements?.repositories
          ?? [],
      ),
    },
    deployment_environment: pkg?.deployment_environment ?? null,
    blockers: Array.isArray(pkg?.blockers) ? pkg.blockers : [],
    package_gate: pkg?.package_gate ?? null,
    next_execution: pkg?.next_execution ?? null,
  };
}

function packageIdNumber(packageId) {
  const match = /^GAP-PKG-(\d{3})$/u.exec(String(packageId ?? ''));
  return match ? Number(match[1]) : Number.MAX_SAFE_INTEGER;
}

function sortPackageIds(left, right) {
  const leftNumber = packageIdNumber(left);
  const rightNumber = packageIdNumber(right);
  return leftNumber - rightNumber || String(left).localeCompare(String(right), 'en');
}

function addIndexValue(map, key, packageId) {
  const normalized = String(key ?? '').trim();
  if (!normalized) return;
  const set = map.get(normalized) ?? new Set();
  set.add(packageId);
  map.set(normalized, set);
}

function mapToSortedPackageLists(map) {
  return new Map(
    [...map.entries()].map(([key, set]) => [
      key,
      [...set].sort(sortPackageIds),
    ]),
  );
}

export function buildCrossPackageIndexes(packages) {
  const byId = new Map();
  const targetPaths = new Map();
  const primaryTasks = new Map();
  const dominantTasks = new Map();
  const gapIds = new Map();
  const dependents = new Map();

  for (const pkg of packages) {
    byId.set(pkg.package_id, pkg);

    for (const targetPath of pkg.execution_requirements.target_paths) {
      addIndexValue(targetPaths, targetPath, pkg.package_id);
    }

    for (const taskId of pkg.primary_task_ids) {
      addIndexValue(primaryTasks, taskId, pkg.package_id);
    }

    addIndexValue(dominantTasks, pkg.dominant_task_id, pkg.package_id);

    for (const gapId of pkg.gap_ids) {
      addIndexValue(gapIds, gapId, pkg.package_id);
    }

    for (const dependencyId of pkg.execution.depends_on_package_ids) {
      addIndexValue(dependents, dependencyId, pkg.package_id);
    }
  }

  return {
    byId,
    targetPaths: mapToSortedPackageLists(targetPaths),
    primaryTasks: mapToSortedPackageLists(primaryTasks),
    dominantTasks: mapToSortedPackageLists(dominantTasks),
    gapIds: mapToSortedPackageLists(gapIds),
    dependents: mapToSortedPackageLists(dependents),
  };
}

function sharedRelations(values, index, packageId, keyName) {
  return values
    .map((value) => ({
      [keyName]: value,
      package_ids: (index.get(value) ?? []).filter((id) => id !== packageId),
    }))
    .filter((entry) => entry.package_ids.length > 0);
}

function relationContext(pkg, indexes) {
  return {
    dependencies: pkg.execution.depends_on_package_ids,
    dependents: indexes.dependents.get(pkg.package_id) ?? [],
    shared_target_paths: sharedRelations(
      pkg.execution_requirements.target_paths,
      indexes.targetPaths,
      pkg.package_id,
      'target_path',
    ),
    shared_primary_tasks: sharedRelations(
      pkg.primary_task_ids,
      indexes.primaryTasks,
      pkg.package_id,
      'task_id',
    ),
    shared_gap_ids: sharedRelations(
      pkg.gap_ids,
      indexes.gapIds,
      pkg.package_id,
      'gap_id',
    ),
    shared_dominant_task: pkg.dominant_task_id
      ? sharedRelations(
          [pkg.dominant_task_id],
          indexes.dominantTasks,
          pkg.package_id,
          'task_id',
        )
      : [],
  };
}

function anomaly(code, severity, detail, evidence = {}) {
  return {
    code,
    severity,
    detail,
    evidence,
  };
}

export function analyzePackage(pkg, indexes) {
  const anomalies = [];
  const packageId = pkg.package_id;

  if (!/^GAP-PKG-\d{3}$/u.test(packageId)) {
    anomalies.push(anomaly(
      'INVALID_PACKAGE_ID',
      'BLOCKING',
      `Identidad de package invalida: ${packageId || 'VACIA'}.`,
    ));
  }

  if (pkg.primary_task_ids.length === 0) {
    anomalies.push(anomaly(
      'MISSING_PRIMARY_TASK',
      'BLOCKING',
      `${packageId}: no declara primary_task_ids.`,
    ));
  }

  if (!String(pkg.dominant_task_id ?? '').trim()) {
    anomalies.push(anomaly(
      'MISSING_DOMINANT_TASK',
      'BLOCKING',
      `${packageId}: no declara dominant_task_id.`,
    ));
  }

  const primarySupportOverlap = pkg.primary_task_ids.filter(
    (taskId) => pkg.support_task_ids.includes(taskId),
  );

  if (primarySupportOverlap.length > 0) {
    anomalies.push(anomaly(
      'PRIMARY_SUPPORT_OVERLAP',
      'REVIEW',
      `${packageId}: una o mas tareas aparecen como primaria y soporte.`,
      { task_ids: primarySupportOverlap },
    ));
  }

  for (const dependencyId of pkg.execution.depends_on_package_ids) {
    if (dependencyId === packageId) {
      anomalies.push(anomaly(
        'SELF_DEPENDENCY',
        'BLOCKING',
        `${packageId}: depende de si mismo.`,
        { dependency_id: dependencyId },
      ));
      continue;
    }

    const dependency = indexes.byId.get(dependencyId);
    if (!dependency) {
      anomalies.push(anomaly(
        'MISSING_DEPENDENCY_PACKAGE',
        'BLOCKING',
        `${packageId}: dependencia inexistente ${dependencyId}.`,
        { dependency_id: dependencyId },
      ));
      continue;
    }

    const packageLayer = pkg.execution.layer;
    const dependencyLayer = dependency.execution.layer;

    if (
      Number.isInteger(packageLayer)
      && Number.isInteger(dependencyLayer)
      && dependencyLayer >= packageLayer
    ) {
      anomalies.push(anomaly(
        'DEPENDENCY_LAYER_INVERSION',
        'BLOCKING',
        `${packageId}: ${dependencyId} esta en layer ${dependencyLayer}, no anterior a layer ${packageLayer}.`,
        {
          dependency_id: dependencyId,
          dependency_layer: dependencyLayer,
          package_layer: packageLayer,
        },
      ));
    }
  }

  const relations = relationContext(pkg, indexes);

  for (const relation of relations.shared_target_paths) {
    anomalies.push(anomaly(
      'SHARED_TARGET_PATH',
      'REVIEW',
      `${packageId}: target compartido con otros packages.`,
      relation,
    ));
  }

  for (const relation of relations.shared_primary_tasks) {
    anomalies.push(anomaly(
      'SHARED_PRIMARY_TASK',
      'REVIEW',
      `${packageId}: tarea primaria compartida con otros packages.`,
      relation,
    ));
  }

  for (const relation of relations.shared_gap_ids) {
    anomalies.push(anomaly(
      'SHARED_GAP_MEMBERSHIP',
      'REVIEW',
      `${packageId}: brecha compartida con otros packages; requiere confirmar routing canónico.`,
      relation,
    ));
  }

  for (const relation of relations.shared_dominant_task) {
    anomalies.push(anomaly(
      'SHARED_DOMINANT_TASK',
      'REVIEW',
      `${packageId}: tarea dominante compartida con otros packages.`,
      relation,
    ));
  }

  if (
    pkg.execution_requirements.supabase_mutation_required
    && pkg.execution_requirements.target_paths.length === 0
  ) {
    anomalies.push(anomaly(
      'SUPABASE_MUTATION_WITHOUT_TARGET_PATH',
      'REVIEW',
      `${packageId}: requiere mutacion Supabase pero no proyecta target_paths.`,
    ));
  }

  if (
    Number.isInteger(pkg.gap_membership_count)
    && pkg.gap_membership_count > 0
    && pkg.gap_ids.length === 0
  ) {
    anomalies.push(anomaly(
      'GAP_MEMBERSHIP_WITHOUT_ROUTING_IDS',
      'REVIEW',
      `${packageId}: gap_membership_count=${pkg.gap_membership_count} pero no se resolvieron gap_ids en el mapping explícito.`,
    ));
  }

  return { anomalies, relations };
}

function taskSectionHeading(line) {
  const match = /^(#{2,6})\s+.*?\b([A-Z][A-Z0-9]*(?:-[A-Z0-9]+)+-\d{3,4})\b.*$/u.exec(line);
  if (!match) return null;
  return {
    level: match[1].length,
    taskId: match[2],
  };
}

function compactSection(text, limit = TASK_SECTION_CHAR_LIMIT) {
  const normalized = String(text ?? '').replace(/\r\n/gu, '\n').trim();
  if (normalized.length <= limit) {
    return {
      text: normalized,
      truncated: false,
      original_chars: normalized.length,
    };
  }

  return {
    text: `${normalized.slice(0, limit)}\n\n[TRUNCATED_BY_PACKAGE_REVIEW_FACTORY]`,
    truncated: true,
    original_chars: normalized.length,
  };
}

function collectTaskSections(root, markdownPaths, relevantTaskIds) {
  const wanted = new Set(relevantTaskIds);
  const result = new Map();

  for (const relativePath of markdownPaths) {
    const source = fs.readFileSync(
      path.join(root, ...relativePath.split('/')),
      'utf8',
    ).replace(/\r\n/gu, '\n');

    const lines = source.split('\n');

    for (let index = 0; index < lines.length; index += 1) {
      const heading = taskSectionHeading(lines[index]);
      if (!heading || !wanted.has(heading.taskId) || result.has(heading.taskId)) {
        continue;
      }

      let end = lines.length;
      for (let cursor = index + 1; cursor < lines.length; cursor += 1) {
        const next = /^(#{1,6})\s+/u.exec(lines[cursor]);
        if (next && next[1].length <= heading.level) {
          end = cursor;
          break;
        }
      }

      const compact = compactSection(lines.slice(index, end).join('\n'));
      result.set(heading.taskId, {
        task_id: heading.taskId,
        source_path: relativePath,
        source_blob_sha: git(
          ['hash-object', relativePath],
          { cwd: root },
        ).stdout.trim(),
        ...compact,
        text_sha256: sha256(compact.text),
      });
    }
  }

  return result;
}

function addSnippet(map, token, snippet) {
  const list = map.get(token) ?? [];
  if (list.length >= TOKEN_SNIPPET_LIMIT) return;
  if (!list.some((entry) => (
    entry.source_path === snippet.source_path
    && entry.start_line === snippet.start_line
  ))) {
    list.push(snippet);
    map.set(token, list);
  }
}

function collectTokenSnippets(root, relativePaths, tokens) {
  const wanted = new Set(tokens);
  const result = new Map();

  if (wanted.size === 0) return result;

  for (const relativePath of relativePaths) {
    const absolute = path.join(root, ...relativePath.split('/'));
    if (!fs.existsSync(absolute)) continue;

    const source = fs.readFileSync(absolute, 'utf8').replace(/\r\n/gu, '\n');
    const lines = source.split('\n');
    const blobSha = git(['hash-object', relativePath], { cwd: root }).stdout.trim();

    for (let index = 0; index < lines.length; index += 1) {
      const ids = lines[index].match(/\b[A-Z][A-Z0-9]*(?:-[A-Z0-9]+)+-\d{3,4}\b/gu) ?? [];
      const matched = uniqueSorted(ids.filter((id) => wanted.has(id)));
      if (matched.length === 0) continue;

      const start = Math.max(0, index - 1);
      const end = Math.min(lines.length, index + 2);
      const snippet = {
        source_path: relativePath,
        source_blob_sha: blobSha,
        start_line: start + 1,
        end_line: end,
        text: lines.slice(start, end).join('\n').trim(),
      };
      snippet.text_sha256 = sha256(snippet.text);

      for (const token of matched) addSnippet(result, token, snippet);
    }
  }

  return result;
}

function extractTreqIds(taskSections) {
  const ids = [];

  for (const section of taskSections) {
    ids.push(
      ...(section?.text?.match(/\bTREQ-[A-Z0-9-]+\b/gu) ?? []),
    );
  }

  return uniqueSorted(ids);
}

function evidencePreview(value, limit = EVIDENCE_PREVIEW_CHAR_LIMIT) {
  const normalized = String(value ?? '').replace(/\s+/gu, ' ').trim();
  if (!normalized) return null;
  if (normalized.length <= limit) return normalized;
  return `${normalized.slice(0, Math.max(0, limit - 3))}...`;
}

function compactSnippetEvidence(snippet) {
  const textPresent = typeof snippet?.text === 'string' && snippet.text.length > 0;

  return {
    source_path: snippet?.source_path ?? null,
    source_blob_sha: snippet?.source_blob_sha ?? null,
    start_line: snippet?.start_line ?? null,
    end_line: snippet?.end_line ?? null,
    text_sha256: snippet?.text_sha256 ?? null,
    text_present: textPresent,
    preview: textPresent ? evidencePreview(snippet.text) : null,
  };
}

function compactTaskEvidence(task) {
  const textPresent = typeof task?.text === 'string' && task.text.length > 0;

  return {
    task_id: task?.task_id ?? null,
    source_path: task?.source_path ?? null,
    source_blob_sha: task?.source_blob_sha ?? null,
    text_sha256: task?.text_sha256 ?? null,
    text_present: textPresent,
    preview: textPresent ? evidencePreview(task.text) : null,
    truncated: task?.truncated === true,
    original_chars: Number.isInteger(task?.original_chars) ? task.original_chars : 0,
  };
}

function sourceEvidenceForPackage({
  pkg,
  taskSectionIndex,
  gapSnippetIndex,
  packageSnippetIndex,
  treqSnippetIndex,
}) {
  const declaredTaskIds = uniqueSorted([
    ...pkg.primary_task_ids,
    ...pkg.support_task_ids,
    pkg.dominant_task_id,
    ...pkg.task_prerequisite_ids,
  ]);

  const taskSections = declaredTaskIds
    .map((taskId) => taskSectionIndex.get(taskId) ?? {
      task_id: taskId,
      source_path: null,
      source_blob_sha: null,
      text: null,
      text_sha256: null,
      truncated: false,
      original_chars: 0,
    });

  const treqIds = extractTreqIds(
    taskSections.filter((entry) => entry.text),
  );

  return {
    package_catalog: (packageSnippetIndex.get(pkg.package_id) ?? [])
      .map((snippet) => compactSnippetEvidence(snippet)),
    tasks: taskSections.map((task) => compactTaskEvidence(task)),
    gaps: pkg.gap_ids.map((gapId) => ({
      gap_id: gapId,
      snippets: (gapSnippetIndex.get(gapId) ?? [])
        .map((snippet) => compactSnippetEvidence(snippet)),
    })),
    treq_ids: treqIds,
    treq: treqIds.map((treqId) => ({
      treq_id: treqId,
      snippets: (treqSnippetIndex.get(treqId) ?? [])
        .map((snippet) => compactSnippetEvidence(snippet)),
    })),
  };
}

function enrichEvidenceAnomalies(pkg, evidence, anomalies) {
  const next = [...anomalies];

  for (const task of evidence.tasks) {
    if (!task.text_present) {
      next.push(anomaly(
        'TASK_CANONICAL_SECTION_NOT_FOUND',
        'REVIEW',
        `${pkg.package_id}: no se pudo extraer bloque canónico para ${task.task_id}.`,
        { task_id: task.task_id },
      ));
    }
  }

  for (const gap of evidence.gaps) {
    if (gap.snippets.length === 0) {
      next.push(anomaly(
        'GAP_CANONICAL_SNIPPET_NOT_FOUND',
        'REVIEW',
        `${pkg.package_id}: no se encontró evidencia textual para ${gap.gap_id}.`,
        { gap_id: gap.gap_id },
      ));
    }
  }

  if (evidence.package_catalog.length === 0) {
    next.push(anomaly(
      'PACKAGE_CATALOG_SNIPPET_NOT_FOUND',
      'REVIEW',
      `${pkg.package_id}: no se encontró evidencia textual directa en el catálogo canónico de packages.`,
    ));
  }

  return next;
}

function evidenceFingerprint(evidence) {
  return {
    package_catalog: evidence.package_catalog.map((entry) => entry.text_sha256),
    tasks: evidence.tasks.map((entry) => ({
      task_id: entry.task_id,
      source_path: entry.source_path,
      text_sha256: entry.text_sha256,
    })),
    gaps: evidence.gaps.map((entry) => ({
      gap_id: entry.gap_id,
      snippet_sha256: entry.snippets.map((snippet) => snippet.text_sha256),
    })),
    treq: evidence.treq.map((entry) => ({
      treq_id: entry.treq_id,
      snippet_sha256: entry.snippets.map((snippet) => snippet.text_sha256),
    })),
  };
}

function severityRank(severity) {
  if (severity === 'BLOCKING') return 3;
  if (severity === 'REVIEW') return 2;
  return 1;
}

function reviewPriority(dossier, previousStatus) {
  const blocking = dossier.anomalies.filter(({ severity }) => severity === 'BLOCKING').length;
  const review = dossier.anomalies.filter(({ severity }) => severity === 'REVIEW').length;
  const overlapCount = (
    dossier.relations.shared_target_paths.length
    + dossier.relations.shared_primary_tasks.length
    + dossier.relations.shared_gap_ids.length
    + dossier.relations.shared_dominant_task.length
  );

  return (
    (previousStatus === 'STALE' ? 100000 : 0)
    + (blocking * 10000)
    + (review * 100)
    + overlapCount
  );
}

function initialLedgerEntry(dossier, previousEntry) {
  const currentFingerprint = dossier.review_fingerprint;
  const previousFingerprint = previousEntry?.review_fingerprint ?? null;
  const previousDecision = previousEntry?.decision ?? null;

  if (
    previousEntry
    && previousFingerprint === currentFingerprint
    && ['PASS', 'CONTRADICTION'].includes(previousDecision)
  ) {
    return {
      ...previousEntry,
      review_fingerprint: currentFingerprint,
      status: previousDecision,
    };
  }

  if (
    previousEntry
    && previousFingerprint
    && previousFingerprint !== currentFingerprint
    && ['PASS', 'CONTRADICTION'].includes(previousDecision)
  ) {
    return {
      package_id: dossier.package_id,
      review_fingerprint: currentFingerprint,
      status: 'STALE',
      decision: null,
      reviewed_at: null,
      summary: null,
      issues: [],
      stale_from_fingerprint: previousFingerprint,
    };
  }

  return {
    package_id: dossier.package_id,
    review_fingerprint: currentFingerprint,
    status: 'NEEDS_REVIEW',
    decision: null,
    reviewed_at: null,
    summary: null,
    issues: [],
    stale_from_fingerprint: null,
  };
}

function buildLedger(dossiers, previousLedger, sourceManifest) {
  const previous = new Map(
    (previousLedger?.packages ?? []).map((entry) => [entry.package_id, entry]),
  );

  const packages = dossiers.map((dossier) => (
    initialLedgerEntry(dossier, previous.get(dossier.package_id))
  ));

  return {
    schema_version: SCHEMA_VERSION,
    factory_id: FACTORY_ID,
    source_manifest_sha256: sha256(stableJson(sourceManifest)),
    source_head: sourceManifest.generated_from_head,
    updated_at: new Date().toISOString(),
    packages,
  };
}

function ledgerEntryMap(ledger) {
  return new Map(
    (ledger?.packages ?? []).map((entry) => [entry.package_id, entry]),
  );
}

function summaryCounts(ledger) {
  const counts = {
    PASS: 0,
    CONTRADICTION: 0,
    NEEDS_REVIEW: 0,
    STALE: 0,
  };

  for (const entry of ledger.packages ?? []) {
    if (Object.hasOwn(counts, entry.status)) counts[entry.status] += 1;
  }

  return counts;
}

function buildAnomalyQueue(dossiers, ledger) {
  const ledgerMap = ledgerEntryMap(ledger);

  return dossiers
    .map((dossier) => {
      const ledgerEntry = ledgerMap.get(dossier.package_id);
      const status = ledgerEntry?.status ?? 'NEEDS_REVIEW';

      return {
        package_id: dossier.package_id,
        review_status: status,
        review_fingerprint: dossier.review_fingerprint,
        priority: reviewPriority(dossier, status),
        anomaly_counts: {
          BLOCKING: dossier.anomalies.filter(({ severity }) => severity === 'BLOCKING').length,
          REVIEW: dossier.anomalies.filter(({ severity }) => severity === 'REVIEW').length,
        },
        anomaly_codes: uniqueSorted(dossier.anomalies.map(({ code }) => code)),
      };
    })
    .filter(({ review_status: status }) => ['NEEDS_REVIEW', 'STALE'].includes(status))
    .sort((left, right) => (
      right.priority - left.priority
      || sortPackageIds(left.package_id, right.package_id)
    ));
}

function dossierMarkdown(dossier, ledgerEntry) {
  const evidence = dossier.source_evidence;

  const parts = [
    `## ${dossier.package_id}`,
    '',
    `- Review status: \`${ledgerEntry?.status ?? 'NEEDS_REVIEW'}\``,
    `- Review fingerprint: \`${dossier.review_fingerprint}\``,
    `- Repository: \`${dossier.package.repository_owner ?? 'UNRESOLVED'}\``,
    `- Runtime: \`${dossier.package.runtime_profile ?? 'UNRESOLVED'}\``,
    `- Layer: \`${dossier.package.execution.layer ?? 'UNRESOLVED'}\``,
    `- Dependencies: ${dossier.relations.dependencies.length ? dossier.relations.dependencies.join(', ') : 'NONE'}`,
    `- Primary: ${dossier.package.primary_task_ids.length ? dossier.package.primary_task_ids.join(', ') : 'NONE'}`,
    `- Support: ${dossier.package.support_task_ids.length ? dossier.package.support_task_ids.join(', ') : 'NONE'}`,
    `- Dominant: ${dossier.package.dominant_task_id ?? 'NONE'}`,
    `- Gaps: ${dossier.package.gap_ids.length ? dossier.package.gap_ids.join(', ') : 'NONE'}`,
    `- TREQ: ${evidence.treq_ids.length ? evidence.treq_ids.join(', ') : 'NONE'}`,
    '',
    '### Anomalías deterministas',
    '',
  ];

  if (dossier.anomalies.length === 0) {
    parts.push('NONE', '');
  } else {
    for (const entry of dossier.anomalies) {
      parts.push(`- **${entry.severity} / ${entry.code}** — ${entry.detail}`);
    }
    parts.push('');
  }

  parts.push('### Relaciones cross-package', '');
  parts.push('```json');
  parts.push(JSON.stringify(dossier.relations, null, 2));
  parts.push('```', '');

  parts.push('### Catálogo canónico del package', '');
  if (evidence.package_catalog.length === 0) {
    parts.push('NO EVIDENCE EXTRACTED', '');
  } else {
    for (const snippet of evidence.package_catalog) {
      parts.push(`Fuente: \`${snippet.source_path}:${snippet.start_line}-${snippet.end_line}\``);
      parts.push('');
      parts.push('```text');
      parts.push(snippet.preview ?? 'NO PREVIEW AVAILABLE');
      parts.push('```', '');
    }
  }

  parts.push('### Tareas canónicas relevantes', '');
  for (const task of evidence.tasks) {
    parts.push(`#### ${task.task_id}`);
    parts.push('');
    if (!task.text_present) {
      parts.push('NO CANONICAL SECTION EXTRACTED', '');
      continue;
    }
    parts.push(`Fuente: \`${task.source_path}\` · SHA texto: \`${task.text_sha256}\`${task.truncated ? ' · TRUNCATED' : ''}`);
    parts.push('');
    parts.push('```markdown');
    parts.push(task.preview ?? 'NO PREVIEW AVAILABLE');
    parts.push('```', '');
  }

  parts.push('### Evidencia de brechas', '');
  for (const gap of evidence.gaps) {
    parts.push(`#### ${gap.gap_id}`, '');
    if (gap.snippets.length === 0) {
      parts.push('NO EVIDENCE EXTRACTED', '');
      continue;
    }
    for (const snippet of gap.snippets) {
      parts.push(`Fuente: \`${snippet.source_path}:${snippet.start_line}-${snippet.end_line}\``);
      parts.push('');
      parts.push('```text');
      parts.push(snippet.preview ?? 'NO PREVIEW AVAILABLE');
      parts.push('```', '');
    }
  }

  parts.push('### Requisitos TREQ relacionados', '');
  if (evidence.treq.length === 0) {
    parts.push('NONE EXTRACTED FROM TASK SECTIONS', '');
  } else {
    for (const treq of evidence.treq) {
      parts.push(`#### ${treq.treq_id}`, '');
      if (treq.snippets.length === 0) {
        parts.push('NO REGISTRY EVIDENCE EXTRACTED', '');
        continue;
      }
      for (const snippet of treq.snippets) {
        parts.push(`Fuente: \`${snippet.source_path}:${snippet.start_line}-${snippet.end_line}\``);
        parts.push('');
        parts.push('```text');
        parts.push(snippet.preview ?? 'NO PREVIEW AVAILABLE');
        parts.push('```', '');
      }
    }
  }

  return `${parts.join('\n')}\n`;
}

function writeOutputs(root, snapshot, ledger) {
  const ledgerMap = ledgerEntryMap(ledger);
  const queue = buildAnomalyQueue(snapshot.dossiers, ledger);
  const counts = summaryCounts(ledger);

  const index = {
    schema_version: SCHEMA_VERSION,
    factory_id: FACTORY_ID,
    source_head: snapshot.source_manifest.generated_from_head,
    source_manifest_sha256: sha256(stableJson(snapshot.source_manifest)),
    generated_at: snapshot.generated_at,
    package_count: snapshot.dossiers.length,
    review_counts: counts,
    deterministic_anomaly_counts: snapshot.metrics.deterministic_anomaly_counts,
    packages: snapshot.dossiers.map((dossier) => {
      const ledgerEntry = ledgerMap.get(dossier.package_id);
      return {
        package_id: dossier.package_id,
        review_status: ledgerEntry?.status ?? 'NEEDS_REVIEW',
        review_fingerprint: dossier.review_fingerprint,
        priority: reviewPriority(
          dossier,
          ledgerEntry?.status ?? 'NEEDS_REVIEW',
        ),
        primary_task_ids: dossier.package.primary_task_ids,
        support_task_ids: dossier.package.support_task_ids,
        dominant_task_id: dossier.package.dominant_task_id,
        gap_ids: dossier.package.gap_ids,
        layer: dossier.package.execution.layer,
        dependencies: dossier.relations.dependencies,
        dependents: dossier.relations.dependents,
        shared_target_paths: dossier.relations.shared_target_paths.length,
        shared_primary_tasks: dossier.relations.shared_primary_tasks.length,
        shared_gap_ids: dossier.relations.shared_gap_ids.length,
        anomaly_codes: uniqueSorted(dossier.anomalies.map(({ code }) => code)),
      };
    }),
  };

  writeJson(root, INDEX_PATH, index);
  writeJson(root, LEDGER_PATH, ledger);
  writeJson(root, ANOMALY_QUEUE_PATH, {
    schema_version: SCHEMA_VERSION,
    factory_id: FACTORY_ID,
    source_head: snapshot.source_manifest.generated_from_head,
    queue,
  });
  writeJson(root, SOURCE_MANIFEST_PATH, snapshot.source_manifest);

  let dossiersMarkdown = [
    '# VENTO PACKAGE REVIEW DOSSIERS',
    '',
    `Factory: \`${FACTORY_ID}\``,
    `Source HEAD: \`${snapshot.source_manifest.generated_from_head}\``,
    `Packages: **${snapshot.dossiers.length}**`,
    '',
    'Este archivo es una proyección analítica local. No es fuente canónica.',
    '',
  ].join('\n');

  for (const dossier of snapshot.dossiers) {
    dossiersMarkdown += `\n${dossierMarkdown(
      dossier,
      ledgerMap.get(dossier.package_id),
    )}`;
    writeJson(root, `${DOSSIERS_DIR}/${dossier.package_id}.json`, dossier);
  }

  writeText(root, DOSSIERS_MD_PATH, `${dossiersMarkdown.trimEnd()}\n`);

  return { index, queue, counts };
}

function allRelevantTaskIds(packages) {
  return uniqueSorted(
    packages.flatMap((pkg) => [
      ...pkg.primary_task_ids,
      ...pkg.support_task_ids,
      ...pkg.task_prerequisite_ids,
      pkg.dominant_task_id,
    ]),
  );
}

function allGapIds(packages) {
  return uniqueSorted(packages.flatMap((pkg) => pkg.gap_ids));
}

function allTreqIds(taskSections) {
  return uniqueSorted(
    [...taskSections.values()]
      .flatMap((section) => section.text?.match(/\bTREQ-[A-Z0-9-]+\b/gu) ?? []),
  );
}

export function buildFactoryFromPackages({
  rawPackages,
  taskSectionIndex = new Map(),
  gapSnippetIndex = new Map(),
  packageSnippetIndex = new Map(),
  treqSnippetIndex = new Map(),
  sourceManifest,
  previousLedger = null,
  generatedAt = new Date().toISOString(),
} = {}) {
  const canonical = (rawPackages ?? [])
    .filter(({ source_kind: sourceKind }) => sourceKind === 'CANONICAL_GAP_PACKAGE')
    .map((pkg) => normalizeReviewPackage(pkg))
    .sort((left, right) => sortPackageIds(left.package_id, right.package_id));

  const indexes = buildCrossPackageIndexes(canonical);

  const dossiers = canonical.map((pkg) => {
    const deterministic = analyzePackage(pkg, indexes);
    const sourceEvidence = sourceEvidenceForPackage({
      pkg,
      taskSectionIndex,
      gapSnippetIndex,
      packageSnippetIndex,
      treqSnippetIndex,
    });
    const anomalies = enrichEvidenceAnomalies(
      pkg,
      sourceEvidence,
      deterministic.anomalies,
    ).sort((left, right) => (
      severityRank(right.severity) - severityRank(left.severity)
      || left.code.localeCompare(right.code, 'en')
    ));

    const fingerprintPayload = {
      package: pkg,
      relations: deterministic.relations,
      evidence: evidenceFingerprint(sourceEvidence),
    };

    return {
      schema_version: SCHEMA_VERSION,
      factory_id: FACTORY_ID,
      package_id: pkg.package_id,
      review_fingerprint: sha256(stableJson(fingerprintPayload)),
      package: pkg,
      relations: deterministic.relations,
      anomalies,
      source_evidence: sourceEvidence,
    };
  });

  const ledger = buildLedger(dossiers, previousLedger, sourceManifest);

  const deterministicAnomalyCounts = {
    BLOCKING: dossiers.reduce(
      (sum, dossier) => sum + dossier.anomalies.filter(({ severity }) => severity === 'BLOCKING').length,
      0,
    ),
    REVIEW: dossiers.reduce(
      (sum, dossier) => sum + dossier.anomalies.filter(({ severity }) => severity === 'REVIEW').length,
      0,
    ),
  };

  return {
    generated_at: generatedAt,
    source_manifest: sourceManifest,
    dossiers,
    ledger,
    metrics: {
      canonical_packages: canonical.length,
      deterministic_anomaly_counts: deterministicAnomalyCounts,
      packages_with_blocking_anomalies: dossiers.filter(
        (dossier) => dossier.anomalies.some(({ severity }) => severity === 'BLOCKING'),
      ).length,
      packages_with_review_anomalies: dossiers.filter(
        (dossier) => dossier.anomalies.some(({ severity }) => severity === 'REVIEW'),
      ).length,
    },
  };
}

async function buildFactory(root) {
  const workspace = assertCanonicalReviewWorkspace(root);
  const previousLedger = readJsonIfExists(root, LEDGER_PATH);
  const sourceManifest = buildSourceManifest(root, workspace);

  const readiness = scanPackageReadiness({
    root,
    check: true,
    trigger: 'package-review-factory',
    supplied: { skipDerivedReports: true },
  });

  const rawPackages = readiness?.registry?.packages ?? [];
  const canonicalPackages = rawPackages.filter(
    ({ source_kind: sourceKind }) => sourceKind === 'CANONICAL_GAP_PACKAGE',
  );

  if (canonicalPackages.length !== 207) {
    fail(`PACKAGE REVIEW FACTORY exige 207 GAP-PKG; observados=${canonicalPackages.length}.`);
  }

  const normalized = canonicalPackages.map((pkg) => normalizeReviewPackage(pkg));
  const markdownPaths = listTrackedMarkdown(root);
  const relevantTaskIds = allRelevantTaskIds(normalized);
  const gapIds = allGapIds(normalized);

  const taskSectionIndex = collectTaskSections(
    root,
    markdownPaths,
    relevantTaskIds,
  );

  const packageSnippetIndex = collectTokenSnippets(
    root,
    [CANONICAL_PACKAGE_SOURCE],
    normalized.map(({ package_id: packageId }) => packageId),
  );

  const gapSnippetIndex = collectTokenSnippets(
    root,
    fs.existsSync(path.join(root, ...ROUTING_SOURCE.split('/')))
      ? [ROUTING_SOURCE]
      : markdownPaths,
    gapIds,
  );

  const treqIds = allTreqIds(taskSectionIndex);
  const treqSnippetIndex = collectTokenSnippets(
    root,
    fs.existsSync(path.join(root, ...TREQ_SOURCE.split('/')))
      ? [TREQ_SOURCE]
      : markdownPaths,
    treqIds,
  );

  const snapshot = buildFactoryFromPackages({
    rawPackages,
    taskSectionIndex,
    gapSnippetIndex,
    packageSnippetIndex,
    treqSnippetIndex,
    sourceManifest,
    previousLedger,
  });

  const output = writeOutputs(root, snapshot, snapshot.ledger);

  return {
    snapshot,
    ledger: snapshot.ledger,
    ...output,
  };
}

function printStatus(result) {
  const { snapshot, counts, queue } = result;

  console.log('=== PACKAGE REVIEW FACTORY STATUS ===');
  console.log(`FACTORY_ID: ${FACTORY_ID}`);
  console.log(`SOURCE_HEAD: ${snapshot.source_manifest.generated_from_head}`);
  console.log(`CANONICAL_PACKAGES: ${snapshot.metrics.canonical_packages}`);
  console.log(`REVIEW_PASS: ${counts.PASS}`);
  console.log(`REVIEW_CONTRADICTION: ${counts.CONTRADICTION}`);
  console.log(`REVIEW_NEEDS_REVIEW: ${counts.NEEDS_REVIEW}`);
  console.log(`REVIEW_STALE: ${counts.STALE}`);
  console.log(`BLOCKING_ANOMALIES: ${snapshot.metrics.deterministic_anomaly_counts.BLOCKING}`);
  console.log(`REVIEW_ANOMALIES: ${snapshot.metrics.deterministic_anomaly_counts.REVIEW}`);
  console.log(`PACKAGES_WITH_BLOCKING_ANOMALIES: ${snapshot.metrics.packages_with_blocking_anomalies}`);
  console.log(`PACKAGES_WITH_REVIEW_ANOMALIES: ${snapshot.metrics.packages_with_review_anomalies}`);
  console.log(`ANOMALY_QUEUE: ${queue.length}`);
  console.log(`INDEX: ${INDEX_PATH}`);
  console.log(`DOSSIERS: ${DOSSIERS_MD_PATH}`);
  console.log(`LEDGER: ${LEDGER_PATH}`);
  console.log('CANONICAL_MUTATIONS: NO');
}

export function compactMarkdownForBudget(markdown, maxChars) {
  if (!Number.isInteger(maxChars) || maxChars < 512) {
    fail('maxChars de batch debe ser entero >= 512.');
  }

  const normalized = String(markdown ?? '');
  if (normalized.length <= maxChars) {
    return {
      markdown: normalized,
      truncated: false,
      original_chars: normalized.length,
    };
  }

  const marker = `\n\n[BATCH_EVIDENCE_TRUNCATED original_chars=${normalized.length} max_chars=${maxChars}]\n`;
  const contentLimit = Math.max(0, maxChars - marker.length);
  const compact = `${normalized.slice(0, contentLimit).trimEnd()}${marker}`;

  return {
    markdown: compact.slice(0, maxChars),
    truncated: true,
    original_chars: normalized.length,
  };
}

function batchHeaderReserve(maxChars) {
  return Math.min(
    BATCH_HEADER_RESERVE_MAX_CHARS,
    Math.max(512, Math.floor(maxChars * 0.1)),
  );
}

export function selectReviewBatch({
  dossiers,
  ledger,
  size = 5,
  maxChars = 50000,
} = {}) {
  if (!Number.isInteger(size) || size <= 0) fail('size de batch debe ser entero positivo.');
  if (!Number.isInteger(maxChars) || maxChars < 2048) fail('maxChars de batch debe ser entero >= 2048.');

  const reserveChars = batchHeaderReserve(maxChars);
  const contentBudget = maxChars - reserveChars;
  const perPackageBudget = Math.floor(contentBudget / size);

  if (perPackageBudget < 512) {
    fail(`Presupuesto insuficiente: maxChars=${maxChars}; size=${size}.`);
  }

  const ledgerMap = ledgerEntryMap(ledger);
  const candidates = dossiers
    .filter((dossier) => {
      const status = ledgerMap.get(dossier.package_id)?.status ?? 'NEEDS_REVIEW';
      return ['NEEDS_REVIEW', 'STALE'].includes(status);
    })
    .sort((left, right) => {
      const leftStatus = ledgerMap.get(left.package_id)?.status ?? 'NEEDS_REVIEW';
      const rightStatus = ledgerMap.get(right.package_id)?.status ?? 'NEEDS_REVIEW';
      return (
        reviewPriority(right, rightStatus)
        - reviewPriority(left, leftStatus)
        || sortPackageIds(left.package_id, right.package_id)
      );
    });

  const selected = [];
  let usedChars = 0;

  for (const dossier of candidates) {
    if (selected.length >= size) break;
    const ledgerEntry = ledgerMap.get(dossier.package_id);
    const rendered = compactMarkdownForBudget(
      dossierMarkdown(dossier, ledgerEntry),
      perPackageBudget,
    );
    const candidateChars = rendered.markdown.length;

    if (usedChars + candidateChars > contentBudget) continue;

    selected.push({
      dossier,
      ledger_entry: ledgerEntry,
      markdown: rendered.markdown,
      batch_truncated: rendered.truncated,
      original_chars: rendered.original_chars,
    });
    usedChars += candidateChars;
  }

  return {
    selected,
    used_chars: usedChars,
    remaining_after_batch: Math.max(0, candidates.length - selected.length),
    content_budget: contentBudget,
    per_package_budget: perPackageBudget,
    header_reserve_chars: reserveChars,
  };
}

function writeBatch(root, result, { size, maxChars }) {
  const batch = selectReviewBatch({
    dossiers: result.snapshot.dossiers,
    ledger: result.ledger,
    size,
    maxChars,
  });

  const batchId = `BATCH-${new Date().toISOString().replace(/[-:.TZ]/gu, '').slice(0, 14)}`;
  const sourceHead = result.snapshot.source_manifest.generated_from_head;

  const json = {
    schema_version: SCHEMA_VERSION,
    factory_id: FACTORY_ID,
    batch_id: batchId,
    source_head: sourceHead,
    generated_at: new Date().toISOString(),
    package_ids: batch.selected.map(({ dossier }) => dossier.package_id),
    review_contract: {
      allowed_decisions: ['PASS', 'CONTRADICTION'],
      source_only: true,
      infer_missing_content: false,
      contradiction_requires_exact_evidence: true,
    },
    dossiers: batch.selected.map(({ dossier, batch_truncated: batchTruncated, original_chars: originalChars }) => ({
      ...dossier,
      batch_projection: {
        truncated: batchTruncated,
        original_markdown_chars: originalChars,
        per_package_budget: batch.per_package_budget,
      },
    })),
  };

  writeJson(root, BATCH_JSON_PATH, json);

  const markdown = [
    '# VENTO PACKAGE REVIEW BATCH',
    '',
    `Batch: \`${batchId}\``,
    `Source HEAD: \`${sourceHead}\``,
    `Packages: ${json.package_ids.join(', ') || 'NONE'}`,
    `Char budget: ${maxChars}`,
    `Per-package budget: ${batch.per_package_budget}`,
    '',
    '## Contrato de revisión',
    '',
    '- Revisar semánticamente solo contra la evidencia incluida y las fuentes canónicas referenciadas.',
    '- Los previews son auxiliares; los SHA y source refs conservan la trazabilidad.',
    '- No completar huecos con conocimiento general.',
    '- PASS solo si routing, ownership, dependencias y alcance son coherentes.',
    '- CONTRADICTION exige identificar la contradicción exacta y sus fuentes.',
    '',
    ...batch.selected.map(({ markdown: dossierMd }) => dossierMd),
  ].join('\n');

  const finalMarkdown = `${markdown.trimEnd()}\n`;

  if (finalMarkdown.length > maxChars) {
    fail(`REVIEW_BATCH excede maxChars: ${finalMarkdown.length} > ${maxChars}.`);
  }

  writeText(root, BATCH_MD_PATH, finalMarkdown);

  const receiptTemplate = {
    schema_version: SCHEMA_VERSION,
    factory_id: FACTORY_ID,
    batch_id: batchId,
    source_head: sourceHead,
    reviews: batch.selected.map(({ dossier }) => ({
      package_id: dossier.package_id,
      review_fingerprint: dossier.review_fingerprint,
      decision: null,
      summary: null,
      issues: [],
    })),
  };

  writeJson(root, RECEIPT_TEMPLATE_PATH, receiptTemplate);

  console.log('=== PACKAGE REVIEW BATCH ===');
  console.log(`BATCH_ID: ${batchId}`);
  console.log(`PACKAGES: ${json.package_ids.join(',') || 'NONE'}`);
  console.log(`PACKAGE_COUNT: ${json.package_ids.length}`);
  console.log(`USED_CHARS: ${finalMarkdown.length}`);
  console.log(`CHAR_BUDGET: ${maxChars}`);
  console.log(`BUDGET_COMPLIANCE: ${finalMarkdown.length <= maxChars ? 'PASS' : 'FAIL'}`);
  console.log(`TRUNCATED_PACKAGES: ${batch.selected.filter(({ batch_truncated: value }) => value).map(({ dossier }) => dossier.package_id).join(',') || 'NONE'}`);
  console.log(`REMAINING_AFTER_BATCH: ${batch.remaining_after_batch}`);
  console.log(`BATCH_MD: ${BATCH_MD_PATH}`);
  console.log(`BATCH_JSON: ${BATCH_JSON_PATH}`);
  console.log(`RECEIPT_TEMPLATE: ${RECEIPT_TEMPLATE_PATH}`);
  console.log('CANONICAL_MUTATIONS: NO');

  return batch;
}

function dossierById(result, packageId) {
  const normalized = String(packageId ?? '').trim().toUpperCase();
  if (!/^GAP-PKG-\d{3}$/u.test(normalized)) {
    fail(`PACKAGE_ID invalido: ${packageId || 'VACIO'}.`);
  }

  const dossier = result.snapshot.dossiers.find(
    ({ package_id: id }) => id === normalized,
  );

  if (!dossier) fail(`${normalized} no existe en la factory.`);

  const ledgerEntry = ledgerEntryMap(result.ledger).get(normalized);
  console.log(dossierMarkdown(dossier, ledgerEntry));
}

export function validateReviewReceipt({
  receipt,
  dossiers,
} = {}) {
  if (!receipt || typeof receipt !== 'object' || Array.isArray(receipt)) {
    fail('Review receipt debe ser objeto JSON.');
  }

  if (receipt.schema_version !== SCHEMA_VERSION) {
    fail(`Review receipt schema_version debe ser ${SCHEMA_VERSION}.`);
  }

  if (receipt.factory_id !== FACTORY_ID) {
    fail(`Review receipt factory_id debe ser ${FACTORY_ID}.`);
  }

  if (!Array.isArray(receipt.reviews) || receipt.reviews.length === 0) {
    fail('Review receipt exige reviews no vacío.');
  }

  const byId = new Map(dossiers.map((dossier) => [dossier.package_id, dossier]));
  const seen = new Set();

  for (const review of receipt.reviews) {
    const packageId = String(review?.package_id ?? '').trim().toUpperCase();

    if (seen.has(packageId)) {
      fail(`Review receipt repite ${packageId}.`);
    }
    seen.add(packageId);

    const dossier = byId.get(packageId);
    if (!dossier) fail(`Review receipt referencia package inexistente: ${packageId}.`);

    if (review.review_fingerprint !== dossier.review_fingerprint) {
      fail(
        `${packageId}: review_fingerprint STALE. `
        + `Esperado=${dossier.review_fingerprint} Actual=${review.review_fingerprint ?? 'NONE'}`,
      );
    }

    if (!['PASS', 'CONTRADICTION'].includes(review.decision)) {
      fail(`${packageId}: decision solo admite PASS o CONTRADICTION.`);
    }

    if (!String(review.summary ?? '').trim()) {
      fail(`${packageId}: summary es obligatorio.`);
    }

    if (!Array.isArray(review.issues)) {
      fail(`${packageId}: issues debe ser array.`);
    }

    if (review.decision === 'CONTRADICTION' && review.issues.length === 0) {
      fail(`${packageId}: CONTRADICTION exige al menos un issue.`);
    }

    for (const issue of review.issues) {
      if (
        !String(issue?.code ?? '').trim()
        || !String(issue?.detail ?? '').trim()
        || !Array.isArray(issue?.source_refs)
        || issue.source_refs.length === 0
      ) {
        fail(`${packageId}: cada issue exige code, detail y source_refs no vacío.`);
      }
    }
  }

  return true;
}

function importReceipt(root, result, receiptFile) {
  const absolute = path.resolve(root, receiptFile);
  if (!fs.existsSync(absolute)) fail(`No existe receipt: ${receiptFile}`);

  let receipt;
  try {
    receipt = JSON.parse(fs.readFileSync(absolute, 'utf8'));
  } catch (error) {
    fail(`Receipt JSON invalido: ${error instanceof Error ? error.message : String(error)}`);
  }

  validateReviewReceipt({
    receipt,
    dossiers: result.snapshot.dossiers,
  });

  const reviewMap = new Map(
    receipt.reviews.map((review) => [
      String(review.package_id).trim().toUpperCase(),
      review,
    ]),
  );

  const updatedLedger = {
    ...result.ledger,
    updated_at: new Date().toISOString(),
    packages: result.ledger.packages.map((entry) => {
      const review = reviewMap.get(entry.package_id);
      if (!review) return entry;

      return {
        package_id: entry.package_id,
        review_fingerprint: entry.review_fingerprint,
        status: review.decision,
        decision: review.decision,
        reviewed_at: new Date().toISOString(),
        summary: String(review.summary).trim(),
        issues: review.issues,
        stale_from_fingerprint: null,
      };
    }),
  };

  result.ledger = updatedLedger;
  writeOutputs(root, result.snapshot, updatedLedger);

  const counts = summaryCounts(updatedLedger);

  console.log('=== PACKAGE REVIEW IMPORT ===');
  console.log(`REVIEWS_IMPORTED: ${receipt.reviews.length}`);
  console.log(`PASS: ${counts.PASS}`);
  console.log(`CONTRADICTION: ${counts.CONTRADICTION}`);
  console.log(`NEEDS_REVIEW: ${counts.NEEDS_REVIEW}`);
  console.log(`STALE: ${counts.STALE}`);
  console.log(`LEDGER: ${LEDGER_PATH}`);
  console.log('CANONICAL_MUTATIONS: NO');
}

function parsePositiveInteger(value, label, fallback) {
  if (value == null) return fallback;
  const parsed = Number(value);
  if (!Number.isInteger(parsed) || parsed <= 0) {
    fail(`${label} debe ser entero positivo.`);
  }
  return parsed;
}

function parseArgs(argv) {
  const tokens = [...argv];
  const mode = tokens[0] && !tokens[0].startsWith('--')
    ? tokens.shift()
    : 'status';

  const args = {
    mode,
    packageId: null,
    receiptFile: null,
    size: 5,
    maxChars: 50000,
  };

  for (let index = 0; index < tokens.length; index += 1) {
    const token = tokens[index];

    if (token === '--package-id') {
      const value = tokens[index + 1];
      if (!value || value.startsWith('--')) fail('Falta valor de --package-id.');
      args.packageId = value;
      index += 1;
    } else if (token === '--receipt-file') {
      const value = tokens[index + 1];
      if (!value || value.startsWith('--')) fail('Falta valor de --receipt-file.');
      args.receiptFile = value;
      index += 1;
    } else if (token === '--size') {
      const value = tokens[index + 1];
      if (!value || value.startsWith('--')) fail('Falta valor de --size.');
      args.size = parsePositiveInteger(value, '--size', 5);
      index += 1;
    } else if (token === '--max-chars') {
      const value = tokens[index + 1];
      if (!value || value.startsWith('--')) fail('Falta valor de --max-chars.');
      args.maxChars = parsePositiveInteger(value, '--max-chars', 50000);
      index += 1;
    } else {
      fail(`Argumento desconocido: ${token}.`);
    }
  }

  if (!['build', 'status', 'batch', 'dossier', 'import'].includes(args.mode)) {
    fail('Modo requerido: build, status, batch, dossier o import.');
  }

  if (args.mode === 'dossier' && !args.packageId) {
    fail('dossier exige --package-id.');
  }

  if (args.mode === 'import' && !args.receiptFile) {
    fail('import exige --receipt-file.');
  }

  return args;
}

async function main() {
  const root = repositoryRoot();
  const args = parseArgs(process.argv.slice(2));
  const result = await buildFactory(root);

  if (args.mode === 'build' || args.mode === 'status') {
    printStatus(result);
    return;
  }

  if (args.mode === 'batch') {
    writeBatch(root, result, {
      size: args.size,
      maxChars: args.maxChars,
    });
    return;
  }

  if (args.mode === 'dossier') {
    dossierById(result, args.packageId);
    return;
  }

  importReceipt(root, result, args.receiptFile);
}

const isCli = process.argv[1]
  && path.resolve(process.argv[1]) === path.resolve(fileURLToPath(import.meta.url));

if (isCli) {
  try {
    await main();
  } catch (error) {
    const message = error instanceof Error ? error.message : String(error);
    console.error(`ERROR: ${message}`);
    process.exitCode = Number.isInteger(error?.exitCode) ? error.exitCode : 1;
  }
}
