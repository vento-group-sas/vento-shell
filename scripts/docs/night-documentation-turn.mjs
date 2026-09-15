import crypto from 'node:crypto';
import fs from 'node:fs';
import path from 'node:path';
import { spawnSync } from 'node:child_process';
import { pathToFileURL } from 'node:url';

import { derivePreflight } from './canonical-task-preflight.mjs';
import { buildContextCapsule } from './night-documentation-context.mjs';
import { runAuthorReview } from './night-documentation-author-review.mjs';
import {
  buildClosurePlan,
  replaceTaskBlockInMemory,
} from './night-documentation-closure.mjs';
import {
  formatTaskBlock,
  parseTaskBlocks,
} from './format-canonical-task.mjs';
import { readPendingTaskTitleAuthority } from './pending-task-title-authority.mjs';
import { resolveNpmInvocation } from './task-branch-lifecycle.mjs';
import { writeCanonicalRepositoryText } from './validate-executable-delivery.mjs';

export const NIGHT_TURN_MODEL_ID = 'VENTO-NIGHT-DOCUMENTATION-TURN-V1';
export const NIGHT_AUTHORIZATION_TYPE = 'DOCUMENTATION_NIGHT_BATCH_V1';

const HEADER_PATH = 'docs/plan-canonico/modular/00_CABECERA_Y_ESTADO.md';
const ACTIVE_SEQUENCE_PATH = 'docs/plan-canonico/modular/active-sequence.json';
const DEFAULT_BRANCH = 'main';
const STANDARD_DERIVED_PATHS = [
  'docs/plan-canonico/modular/.generated/REGISTRO_DE_TAREAS_PENDIENTES_CON_CONTEXTO.md',
  'docs/plan-canonico/modular/.generated/REGISTRO_GLOBAL_DE_TAREAS.md',
  HEADER_PATH,
  ACTIVE_SEQUENCE_PATH,
];

function fail(message) {
  throw new Error(message);
}

function normalize(value) {
  return String(value ?? '').replace(/\r\n?/gu, '\n');
}

export function sha256(value) {
  return crypto.createHash('sha256').update(value).digest('hex');
}

function readJson(filePath, label = filePath) {
  if (!fs.existsSync(filePath)) fail(`no existe ${label}: ${filePath}.`);
  try {
    return JSON.parse(fs.readFileSync(filePath, 'utf8'));
  } catch {
    fail(`${label} no contiene JSON válido.`);
  }
}

function writeJson(filePath, value) {
  fs.mkdirSync(path.dirname(filePath), { recursive: true });
  fs.writeFileSync(filePath, `${JSON.stringify(value, null, 2)}\n`, 'utf8');
}

function run(command, args, {
  cwd = process.cwd(),
  inherit = false,
  allowFailure = false,
  env = process.env,
} = {}) {
  const result = spawnSync(command, args, {
    cwd,
    encoding: 'utf8',
    windowsHide: true,
    env,
    stdio: inherit ? 'inherit' : ['ignore', 'pipe', 'pipe'],
  });

  if (result.error) {
    if (allowFailure) {
      return { status: 1, stdout: '', stderr: result.error.message };
    }
    fail(`${command} no disponible: ${result.error.message}`);
  }

  const status = Number.isInteger(result.status) ? result.status : 1;
  const stdout = inherit ? '' : String(result.stdout ?? '').trimEnd();
  const stderr = inherit ? '' : String(result.stderr ?? '').trimEnd();

  if (status !== 0 && !allowFailure) {
    fail(stderr || stdout || `${command} ${args.join(' ')} falló con exit code ${status}.`);
  }

  return { status, stdout, stderr };
}

function git(root, args, options = {}) {
  return run('git', args, { cwd: root, ...options });
}

function gh(root, args, options = {}) {
  return run('gh', args, { cwd: root, ...options });
}

function npmRun(root, scriptName, extraArgs = [], {
  inherit = true,
  allowFailure = false,
} = {}) {
  const args = ['run', scriptName, ...extraArgs];
  const invocation = resolveNpmInvocation();
  return run(
    invocation.command,
    [...invocation.prefixArgs, ...args],
    { cwd: root, inherit, allowFailure },
  );
}

function runCanonicalCommand(root, command) {
  const source = String(command ?? '').trim();
  if (!source) fail('validador canónico vacío.');

  if (source === 'git diff --check') {
    return git(root, ['diff', '--check']);
  }

  if (source.startsWith('npm run ')) {
    const tokens = source.split(/\s+/u);
    const scriptName = tokens[2];
    const extra = tokens.slice(3);
    return npmRun(root, scriptName, extra, { inherit: true });
  }

  if (source.startsWith('node ')) {
    const tokens = source.split(/\s+/u);
    return run(process.execPath, tokens.slice(1), { cwd: root, inherit: true });
  }

  fail(`validador canónico no soportado por el turno V1: ${source}.`);
}

function repositoryRoot() {
  const root = git(process.cwd(), ['rev-parse', '--show-toplevel']).stdout.trim();
  const pkg = readJson(path.join(root, 'package.json'), 'package.json');
  if (pkg.name !== 'vento-shell') fail(`repositorio inesperado: ${pkg.name || 'VACÍO'}.`);
  return root;
}

function currentBranch(root) {
  return git(root, ['branch', '--show-current']).stdout.trim();
}

function worktreeStatus(root) {
  return git(
    root,
    ['status', '--porcelain=v1', '--untracked-files=all'],
  ).stdout.trim();
}

function trackedDirtyPaths(root) {
  const raw = git(root, ['diff', '--name-only']).stdout.trim();
  return raw
    ? raw
      .split(/\r?\n/u)
      .map((entry) => entry.trim().replaceAll('\\', '/'))
      .filter(Boolean)
      .sort()
    : [];
}

function sameSet(left, right) {
  return JSON.stringify([...left].sort()) === JSON.stringify([...right].sort());
}

function localBranchExists(root, branch) {
  return git(
    root,
    ['show-ref', '--verify', '--quiet', `refs/heads/${branch}`],
    { allowFailure: true },
  ).status === 0;
}

function remoteBranchSha(root, branch) {
  const result = git(
    root,
    ['ls-remote', '--heads', 'origin', branch],
    { allowFailure: true },
  );
  if (result.status !== 0 || !result.stdout.trim()) return null;
  return result.stdout.trim().split(/\s+/u)[0].toLowerCase();
}

function openPrForBranch(root, branch) {
  const result = gh(root, [
    'pr', 'list',
    '--head', branch,
    '--state', 'open',
    '--json', 'number,headRefOid,state',
  ], { allowFailure: true });

  if (result.status !== 0) {
    fail(`no se pudo consultar PR abierto para ${branch}: ${result.stderr || result.stdout}.`);
  }

  const rows = JSON.parse(result.stdout || '[]');
  return rows[0] ?? null;
}

export function validatePhase6Authorization(authorization, {
  now = new Date(),
} = {}) {
  if (
    authorization?.authorization_type !== NIGHT_AUTHORIZATION_TYPE
    || authorization?.status !== 'AUTHORIZED'
    || authorization?.lane !== 'DOCUMENTATION'
  ) {
    fail('autorización nocturna inválida para FASE 6.');
  }

  if (
    authorization?.physical_authorization?.granted !== false
    || authorization?.physical_authorization?.scope !== 'NONE'
  ) {
    fail('FASE 6 exige physical_authorization NONE.');
  }

  if (
    authorization?.phase_2_capabilities?.author_review_enabled !== true
    || authorization?.phase_3_capabilities?.closure_preflight_enabled !== true
  ) {
    fail('FASE 6 exige author/review y closure preflight habilitados.');
  }

  const phase6 = authorization?.phase_6_capabilities;
  if (
    phase6?.execute_turn_enabled !== true
    || phase6?.repository_mutation_enabled !== true
    || phase6?.task_execution_enabled !== true
    || phase6?.github_mutation_enabled !== true
  ) {
    fail('la autorización no habilita ejecución documental FASE 6.');
  }

  const maxTasks = Number(authorization?.limits?.max_tasks);
  if (!Number.isSafeInteger(maxTasks) || maxTasks <= 0) {
    fail('FASE 6 exige max_tasks positivo y seguro.');
  }

  const cutoff = new Date(authorization?.limits?.cutoff_utc ?? '');
  if (Number.isNaN(cutoff.getTime()) || cutoff.getTime() <= now.getTime()) {
    fail('autorización FASE 6 vencida o sin cutoff válido.');
  }

  if (
    !authorization?.start_scope?.route_id
    || !authorization?.start_scope?.sequence_id
    || !authorization?.start_scope?.block_code
  ) {
    fail('autorización FASE 6 carece de route/sequence/block.');
  }

  return true;
}

export function classifyTurnStop({
  completedTasks,
  maxTasks,
  cutoffUtc,
  now = new Date(),
} = {}) {
  const completed = Number(completedTasks);
  const maximum = Number(maxTasks);
  const cutoff = new Date(cutoffUtc ?? '');

  if (!Number.isSafeInteger(completed) || completed < 0) {
    fail('completedTasks inválido.');
  }
  if (!Number.isSafeInteger(maximum) || maximum <= 0) {
    fail('maxTasks inválido.');
  }
  if (Number.isNaN(cutoff.getTime())) fail('cutoffUtc inválido.');

  if (completed >= maximum) return 'MAX_TASKS_REACHED';
  if (now.getTime() >= cutoff.getTime()) return 'CUTOFF_REACHED';
  return null;
}

export function validateUnitScope({
  authorization,
  preflight,
  activeSequence,
} = {}) {
  if (preflight?.task?.current !== true || !preflight?.task?.id) {
    fail('unidad nocturna no resolvió una tarea actual.');
  }

  const blockers = Array.isArray(preflight?.blockers) ? preflight.blockers : [];
  if (blockers.length > 0) {
    fail(`preflight documental bloqueado: ${blockers.join(' | ')}`);
  }

  if (
    preflight?.continuity?.route !== authorization?.start_scope?.route_id
    || preflight?.continuity?.sequence !== authorization?.start_scope?.sequence_id
  ) {
    fail('BLOCK_OR_SEQUENCE_CROSSING: ruta/secuencia fuera de autorización.');
  }

  if (activeSequence?.block_code !== authorization?.start_scope?.block_code) {
    fail('BLOCK_OR_SEQUENCE_CROSSING: bloque fuera de autorización.');
  }

  return preflight.task.id;
}

export function assertZeroTreqChanges(treqEnvelope) {
  const changes = Array.isArray(treqEnvelope?.changes) ? treqEnvelope.changes : [];
  const affected = Array.isArray(treqEnvelope?.affected_treq_ids)
    ? treqEnvelope.affected_treq_ids
    : [];

  if (changes.length > 0 || affected.length > 0) {
    fail(
      `TREQ_CHANGE_REQUIRES_REGISTRY_MATERIALIZATION: changes=${changes.length}; affected=${affected.length}.`,
    );
  }

  return true;
}

export function parseTaskFinishResult(source) {
  const text = String(source ?? '');
  if (!text.includes('ESTADO: PASS') || !text.includes('NEXT_TASK_ALLOWED: SI')) {
    fail('TASK_FINISH no devolvió PASS + NEXT_TASK_ALLOWED: SI.');
  }

  const task = text.match(/^TASK_ID:\s*(\S+)\s*$/mu)?.[1] ?? null;
  const pr = Number(text.match(/^PR:\s*(\d+)\s*$/mu)?.[1] ?? NaN);
  const mergeCommit = text.match(/^MERGE_COMMIT:\s*([0-9a-f]{40})\s*$/mu)?.[1] ?? null;
  const mainHead = text.match(/^MAIN_HEAD:\s*([0-9a-f]{40})\s*$/mu)?.[1] ?? null;

  if (!task || !Number.isInteger(pr) || !mergeCommit || !mainHead) {
    fail('TASK_FINISH PASS carece de task/pr/merge/main verificables.');
  }

  return { taskId: task, pr, mergeCommit, mainHead };
}

function syncMain(root) {
  if (currentBranch(root) !== DEFAULT_BRANCH) {
    fail(`se esperaba ${DEFAULT_BRANCH}; rama actual: ${currentBranch(root) || 'DETACHED'}.`);
  }

  const status = worktreeStatus(root);
  if (status) fail(`main no está limpio: ${status.replace(/\r?\n/gu, ' | ')}.`);

  git(root, ['fetch', 'origin', DEFAULT_BRANCH, '--quiet']);
  git(root, ['pull', '--ff-only', 'origin', DEFAULT_BRANCH]);

  const local = git(root, ['rev-parse', 'HEAD']).stdout.trim().toLowerCase();
  const remote = git(root, ['rev-parse', `origin/${DEFAULT_BRANCH}`]).stdout.trim().toLowerCase();
  if (local !== remote) fail(`main local ${local} != origin/main ${remote}.`);
  return local;
}

function assertMainUnchanged(root, expected, label) {
  git(root, ['fetch', 'origin', DEFAULT_BRANCH, '--quiet']);
  const observed = git(root, ['rev-parse', 'origin/main']).stdout.trim().toLowerCase();
  if (observed !== expected) {
    fail(`${label}: MAIN_DRIFT_DURING_UNIT ${observed} != ${expected}.`);
  }
}

function activeSequence(root) {
  return readJson(
    path.join(root, ...ACTIVE_SEQUENCE_PATH.split('/')),
    'active-sequence.json',
  );
}

function resolveCurrentUnit(root, authorization) {
  const preflight = derivePreflight({ root });
  const active = activeSequence(root);
  const taskId = validateUnitScope({
    authorization,
    preflight,
    activeSequence: active,
  });
  return { taskId, preflight, active };
}

function taskBranch(taskId) {
  return `task/${String(taskId).toLowerCase()}`;
}

function assertNoResidualTaskBranch(root, taskId) {
  const branch = taskBranch(taskId);
  if (localBranchExists(root, branch)) {
    fail(`${taskId}: rama local residual ${branch}.`);
  }
  if (remoteBranchSha(root, branch)) {
    fail(`${taskId}: rama remota residual ${branch}.`);
  }
  const pr = openPrForBranch(root, branch);
  if (pr) fail(`${taskId}: PR abierto residual #${pr.number}.`);
}

function writeUnitEvidence(unitDir, {
  context,
  summary,
  closure,
} = {}) {
  writeJson(path.join(unitDir, 'context-capsule.json'), context);
  writeJson(path.join(unitDir, 'phase2-summary.json'), summary);
  writeJson(path.join(unitDir, 'closure-plan.json'), closure);
}

function candidatePath(unitDir, taskId) {
  return path.join(unitDir, `${taskId}_APROBADA_PARA_REEMPLAZAR.md`);
}

function verifyCandidateWhitespace(candidate, taskId) {
  const lines = normalize(candidate).split('\n');
  const violations = lines
    .map((line, index) => ({ line, number: index + 1 }))
    .filter(({ line }) => /[ \t]+$/u.test(line));
  if (violations.length > 0) {
    fail(
      `${taskId}: CANDIDATE_TRAILING_WHITESPACE lines=${violations.map(({ number }) => number).join(',')}.`,
    );
  }
}

function expectedDirtyPaths(ownerPath) {
  return [...STANDARD_DERIVED_PATHS, ownerPath].sort();
}

function assertDirtySet(root, expected, label) {
  const observed = trackedDirtyPaths(root);
  if (!sameSet(observed, expected)) {
    fail(
      `${label}: paths dirty inesperados. Esperado=${expected.join(', ')}; `
      + `observado=${observed.join(', ') || 'NINGUNO'}.`,
    );
  }
}

function taskBlockFromOwner(root, ownerPath, taskId) {
  const source = fs.readFileSync(path.join(root, ...ownerPath.split('/')), 'utf8');
  const matches = parseTaskBlocks(source).filter(({ id }) => id === taskId);
  if (matches.length !== 1) {
    fail(`${taskId}: owner contiene ${matches.length} bloques.`);
  }
  return normalize(matches[0].block).trimEnd();
}

function verifyPostBuild(root, {
  taskId,
  ownerPath,
  candidate,
} = {}) {
  const preflight = derivePreflight({ root });
  const active = activeSequence(root);

  if (preflight?.continuity?.previous !== taskId) {
    fail(`${taskId}: build no avanzó continuity.previous.`);
  }
  if (active?.previous_task_id !== taskId) {
    fail(`${taskId}: active-sequence.previous_task_id no avanzó.`);
  }

  const canonicalTitles = readPendingTaskTitleAuthority(root);
  const formatted = normalize(
    formatTaskBlock(normalize(candidate).trimEnd(), { canonicalTitles }),
  ).trimEnd();
  const actual = taskBlockFromOwner(root, ownerPath, taskId);

  if (actual !== formatted) {
    fail(
      `${taskId}: CANONICAL_FORMAT_MISMATCH `
      + `actual=${sha256(actual)} expected=${sha256(formatted)}.`,
    );
  }

  return {
    materialized: formatted,
    materializedSha256: sha256(formatted),
    nextTaskId: preflight?.task?.id ?? null,
  };
}

function runValidators(root, closurePlan, ownerPath, taskId) {
  const expected = expectedDirtyPaths(ownerPath);
  const validators = Array.isArray(closurePlan?.planned_lifecycle?.validators)
    ? closurePlan.planned_lifecycle.validators
    : [];

  for (const command of validators) {
    if (command === 'npm run docs:plan:build') continue;
    console.log(`[NIGHT TURN] ${taskId} validator: ${command}`);
    runCanonicalCommand(root, command);
    assertDirtySet(root, expected, `${taskId}:${command}`);
  }
}

function applyCandidate(root, {
  ownerPath,
  markerSource,
  candidate,
  taskId,
} = {}) {
  const absolute = path.join(root, ...ownerPath.split('/'));
  const source = fs.readFileSync(absolute, 'utf8');
  const replaced = replaceTaskBlockInMemory({
    ownerSource: source,
    markerSource,
    candidate,
    taskId,
  });
  writeCanonicalRepositoryText(absolute, replaced);
}

function safeCleanupUncommittedUnit(root, {
  taskId,
  sourceMain,
  ownerPath,
} = {}) {
  const branch = taskBranch(taskId);
  try {
    if (currentBranch(root) !== branch) return 'NOT_ON_TASK_BRANCH';
    const localHead = git(root, ['rev-parse', 'HEAD']).stdout.trim().toLowerCase();
    const remoteHead = remoteBranchSha(root, branch);
    if (localHead !== sourceMain || remoteHead !== sourceMain) {
      return 'PRESERVED_COMMITTED_OR_DIVERGED_UNIT';
    }
    if (openPrForBranch(root, branch)) return 'PRESERVED_OPEN_PR';

    const allowed = new Set(expectedDirtyPaths(ownerPath));
    const dirty = trackedDirtyPaths(root);
    if (dirty.some((entry) => !allowed.has(entry))) {
      return 'PRESERVED_UNKNOWN_DIRTY_PATHS';
    }

    if (dirty.length > 0) {
      git(root, ['restore', '--staged', '--worktree', '--', ...dirty]);
    }

    git(root, ['switch', DEFAULT_BRANCH]);
    git(root, ['pull', '--ff-only', 'origin', DEFAULT_BRANCH]);

    if (localBranchExists(root, branch)) git(root, ['branch', '-d', branch]);
    if (remoteBranchSha(root, branch)) git(root, ['push', 'origin', '--delete', branch]);

    return 'SAFE_UNCOMMITTED_UNIT_CLEANED';
  } catch (error) {
    return `CLEANUP_FAILED:${error instanceof Error ? error.message : String(error)}`;
  }
}

function cutoffGuard(authorization, label) {
  const reason = classifyTurnStop({
    completedTasks: 0,
    maxTasks: Number.MAX_SAFE_INTEGER,
    cutoffUtc: authorization.limits.cutoff_utc,
    now: new Date(),
  });
  if (reason === 'CUTOFF_REACHED') {
    fail(`${label}: CUTOFF_REACHED.`);
  }
}

async function processUnit(root, {
  authorization,
  apiKey,
  outputRoot,
  unitIndex,
} = {}) {
  const sourceMain = syncMain(root);
  run(process.execPath, ['scripts/docs/chatgpt-work-starter.mjs'], {
    cwd: root,
    inherit: true,
  });

  const { taskId } = resolveCurrentUnit(root, authorization);
  assertNoResidualTaskBranch(root, taskId);
  cutoffGuard(authorization, `${taskId}:PRE_AUTHOR`);

  const unitDir = path.join(
    outputRoot,
    `unit-${String(unitIndex + 1).padStart(2, '0')}-${taskId}`,
  );
  const phase2Dir = path.join(unitDir, 'phase2');
  const phase3Dir = path.join(unitDir, 'phase3');
  fs.mkdirSync(phase2Dir, { recursive: true });
  fs.mkdirSync(phase3Dir, { recursive: true });

  const context = buildContextCapsule({
    root,
    authorization,
    now: new Date(),
  });
  writeJson(path.join(phase2Dir, 'context-capsule.json'), context);

  const summary = await runAuthorReview({
    capsule: context,
    apiKey,
    outputDir: phase2Dir,
  });

  assertMainUnchanged(root, sourceMain, `${taskId}:POST_REVIEW`);
  cutoffGuard(authorization, `${taskId}:POST_REVIEW`);

  const candidateFile = candidatePath(phase2Dir, taskId);
  if (!fs.existsSync(candidateFile)) fail(`${taskId}: falta candidate artifact.`);
  const candidate = fs.readFileSync(candidateFile, 'utf8');
  verifyCandidateWhitespace(candidate, taskId);

  const treqEnvelope = readJson(
    path.join(phase2Dir, 'treq-changes.json'),
    'treq-changes.json',
  );
  assertZeroTreqChanges(treqEnvelope);

  const reviewer1 = readJson(path.join(phase2Dir, 'reviewer-1.json'), 'reviewer-1.json');
  const reviewer2 = readJson(path.join(phase2Dir, 'reviewer-2.json'), 'reviewer-2.json');
  const currentPreflight = derivePreflight({ root });
  const ownerPath = context.current.owner;
  const ownerSource = fs.readFileSync(path.join(root, ...ownerPath.split('/')), 'utf8');

  const closure = buildClosurePlan({
    authorization,
    preflight: currentPreflight,
    context,
    phase2Summary: summary,
    reviewer1,
    reviewer2,
    candidate,
    treqChanges: treqEnvelope.changes,
    ownerSource,
    now: new Date(),
  });
  writeJson(path.join(phase3Dir, 'closure-plan.json'), closure);
  writeUnitEvidence(unitDir, { context, summary, closure });

  if (
    closure.status !== 'READY_FOR_PHASE4_PILOT'
    || closure.task_id !== taskId
    || closure.repository_mutation !== false
    || closure.task_execution_enabled !== false
    || closure.physical_authorization !== 'NONE'
  ) {
    fail(`${taskId}: closure preflight no quedó READY.`);
  }

  assertMainUnchanged(root, sourceMain, `${taskId}:PRE_START`);
  cutoffGuard(authorization, `${taskId}:PRE_START`);

  npmRun(root, 'docs:task:start', ['--', '--task-id', taskId], { inherit: true });

  let materialization = null;
  let finish = null;
  try {
    applyCandidate(root, {
      ownerPath: closure.owner_path,
      markerSource: closure.marker_source,
      candidate,
      taskId,
    });

    assertDirtySet(root, [closure.owner_path], `${taskId}:PRE_BUILD`);

    npmRun(root, 'docs:plan:build', [], { inherit: true });
    assertDirtySet(root, expectedDirtyPaths(closure.owner_path), `${taskId}:POST_BUILD`);

    materialization = verifyPostBuild(root, {
      taskId,
      ownerPath: closure.owner_path,
      candidate,
    });

    runValidators(root, closure, closure.owner_path, taskId);
    cutoffGuard(authorization, `${taskId}:PRE_FINISH`);
    assertMainUnchanged(root, sourceMain, `${taskId}:PRE_FINISH`);

    const finishResult = npmRun(
      root,
      'docs:task:finish',
      ['--', '--task-id', taskId],
      { inherit: false, allowFailure: true },
    );

    if (finishResult.stdout) console.log(finishResult.stdout);
    if (finishResult.stderr) console.error(finishResult.stderr);
    if (finishResult.status !== 0) {
      fail(`${taskId}: docs:task:finish exit=${finishResult.status}.`);
    }

    finish = parseTaskFinishResult(finishResult.stdout);
    if (finish.taskId !== taskId) {
      fail(`${taskId}: TASK_FINISH devolvió ${finish.taskId}.`);
    }

    if (currentBranch(root) !== DEFAULT_BRANCH) {
      fail(`${taskId}: TASK_FINISH no volvió a main.`);
    }
    if (worktreeStatus(root)) {
      fail(`${taskId}: worktree final no limpio.`);
    }

    git(root, ['fetch', 'origin', DEFAULT_BRANCH, '--quiet']);
    const localMain = git(root, ['rev-parse', 'HEAD']).stdout.trim().toLowerCase();
    const remoteMain = git(root, ['rev-parse', 'origin/main']).stdout.trim().toLowerCase();
    if (localMain !== remoteMain || localMain !== finish.mainHead) {
      fail(`${taskId}: main final no coincide con TASK_FINISH.`);
    }

    if (localBranchExists(root, taskBranch(taskId)) || remoteBranchSha(root, taskBranch(taskId))) {
      fail(`${taskId}: task branch residual después del finish.`);
    }

    const finalBlock = taskBlockFromOwner(root, closure.owner_path, taskId);
    if (finalBlock !== materialization.materialized) {
      fail(`${taskId}: bloque final difiere de materialización canónica validada.`);
    }

    const postPreflight = derivePreflight({ root });
    if (postPreflight?.continuity?.previous !== taskId) {
      fail(`${taskId}: continuidad final no registra tarea aprobada.`);
    }

    const unitResult = {
      status: 'PASS',
      unit_index: unitIndex + 1,
      task_id: taskId,
      source_main: sourceMain,
      candidate_sha256: summary.candidate_sha256,
      canonical_materialized_sha256: materialization.materializedSha256,
      pr: finish.pr,
      merge_commit: finish.mergeCommit,
      final_main: finish.mainHead,
      next_task: postPreflight?.task?.id ?? null,
      next_task_allowed: true,
      treq_changes: 0,
      physical_authorization: 'NONE',
    };
    writeJson(path.join(unitDir, 'unit-result.json'), unitResult);
    return unitResult;
  } catch (error) {
    const cleanup = safeCleanupUncommittedUnit(root, {
      taskId,
      sourceMain,
      ownerPath: closure.owner_path,
    });
    writeJson(path.join(unitDir, 'unit-failure.json'), {
      status: 'FAIL',
      task_id: taskId,
      source_main: sourceMain,
      error: error instanceof Error ? error.message : String(error),
      cleanup,
      candidate_sha256: summary?.candidate_sha256 ?? null,
      canonical_materialized_sha256: materialization?.materializedSha256 ?? null,
      task_finish: finish,
      physical_authorization: 'NONE',
    });
    throw error;
  }
}

export async function runNightTurn({
  root = process.cwd(),
  authorization,
  apiKey,
  outputRoot,
} = {}) {
  validatePhase6Authorization(authorization);

  if (!String(apiKey ?? '').trim()) fail('OPENAI_API_KEY es obligatorio para FASE 6.');
  if (!String(outputRoot ?? '').trim()) fail('NIGHT_TURN_OUTPUT_DIR es obligatorio.');

  fs.mkdirSync(outputRoot, { recursive: true });

  const results = [];
  let stopReason = null;

  while (true) {
    stopReason = classifyTurnStop({
      completedTasks: results.length,
      maxTasks: authorization.limits.max_tasks,
      cutoffUtc: authorization.limits.cutoff_utc,
      now: new Date(),
    });
    if (stopReason) break;

    const unit = await processUnit(root, {
      authorization,
      apiKey,
      outputRoot,
      unitIndex: results.length,
    });
    results.push(unit);

    const syncedMain = syncMain(root);
    const { preflight, active } = resolveCurrentUnit(root, authorization);
    if (
      preflight.continuity.route !== authorization.start_scope.route_id
      || preflight.continuity.sequence !== authorization.start_scope.sequence_id
      || active.block_code !== authorization.start_scope.block_code
    ) {
      stopReason = 'BLOCK_OR_SEQUENCE_BOUNDARY_REACHED';
      break;
    }

    console.log(
      `[NIGHT TURN] unit ${results.length} complete; main=${syncedMain}; next=${preflight.task.id}.`,
    );
  }

  const finalMain = syncMain(root);
  const finalPreflight = derivePreflight({ root });

  const summary = {
    schema_version: 1,
    model: NIGHT_TURN_MODEL_ID,
    status: 'PASS',
    stop_reason: stopReason,
    authorization_sha256: authorization.authorization_sha256,
    start_task: authorization.start_scope.task_id,
    tasks_completed: results.length,
    task_ids: results.map(({ task_id }) => task_id),
    units: results,
    final_main: finalMain,
    final_current_task: finalPreflight?.task?.id ?? null,
    final_current_task_state: finalPreflight?.task?.state ?? null,
    next_task_allowed: true,
    worktree_clean: worktreeStatus(root) === '',
    physical_authorization: 'NONE',
  };

  writeJson(path.join(outputRoot, 'turn-summary.json'), summary);
  return summary;
}

async function main() {
  const root = repositoryRoot();
  const authorizationPath = String(process.env.NIGHT_AUTHORIZATION_PATH ?? '').trim();
  const outputRoot = String(process.env.NIGHT_TURN_OUTPUT_DIR ?? '').trim();
  const apiKey = String(process.env.OPENAI_API_KEY ?? '').trim();

  if (!authorizationPath) fail('NIGHT_AUTHORIZATION_PATH es obligatorio.');
  const authorization = readJson(authorizationPath, 'authorization.json');

  const summary = await runNightTurn({
    root,
    authorization,
    apiKey,
    outputRoot,
  });

  console.log('=== RESULTADO PARA CHATGPT ===');
  console.log('ESTADO: PASS');
  console.log('OPERACION: NIGHT_DOCUMENTATION_CONFIGURABLE_TURN');
  console.log(`STOP_REASON: ${summary.stop_reason}`);
  console.log(`TASKS_COMPLETED: ${summary.tasks_completed}`);
  console.log(`TASK_IDS: ${summary.task_ids.join(',') || 'NONE'}`);
  console.log(`FINAL_MAIN_HEAD: ${summary.final_main}`);
  console.log(`FINAL_CURRENT_TASK: ${summary.final_current_task}`);
  console.log(`FINAL_CURRENT_TASK_STATE: ${summary.final_current_task_state}`);
  console.log('NEXT_TASK_ALLOWED: SI');
  console.log(`WORKTREE: ${summary.worktree_clean ? 'CLEAN' : 'DIRTY'}`);
  console.log('PHYSICAL_AUTHORIZATION: NONE');
  console.log('FASE_6_TURN: COMPLETE');
  console.log('=== FIN RESULTADO PARA CHATGPT ===');
}

const invokedDirectly = process.argv[1]
  && pathToFileURL(path.resolve(process.argv[1])).href === import.meta.url;

if (invokedDirectly) {
  main().catch((error) => {
    const outputRoot = String(process.env.NIGHT_TURN_OUTPUT_DIR ?? '').trim();
    if (outputRoot) {
      try {
        writeJson(path.join(outputRoot, 'turn-failure.json'), {
          schema_version: 1,
          model: NIGHT_TURN_MODEL_ID,
          status: 'FAIL',
          error: error instanceof Error ? error.message : String(error),
          physical_authorization: 'NONE',
        });
      } catch {
        // preserve original failure
      }
    }

    console.error('=== RESULTADO PARA CHATGPT ===');
    console.error('ESTADO: FAIL');
    console.error('OPERACION: NIGHT_DOCUMENTATION_CONFIGURABLE_TURN');
    console.error(`ERROR: ${error instanceof Error ? error.message : String(error)}`);
    console.error('PHYSICAL_AUTHORIZATION: NONE');
    console.error('FASE_6_TURN: NOT_COMPLETE');
    console.error('=== FIN RESULTADO PARA CHATGPT ===');
    process.exitCode = 1;
  });
}
