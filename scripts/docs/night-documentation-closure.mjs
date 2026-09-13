import crypto from 'node:crypto';
import fs from 'node:fs';
import path from 'node:path';
import { pathToFileURL } from 'node:url';

import { derivePreflight } from './canonical-task-preflight.mjs';
import {
  parseTaskTreqDeclaration,
  resolveCanonicalOwnerRelativePath,
  taskBranchName,
} from './task-branch-lifecycle.mjs';

const AUTHORIZATION_TYPE = 'DOCUMENTATION_NIGHT_BATCH_V1';

function fail(message) {
  throw new Error(message);
}

export function sha256(value) {
  return crypto.createHash('sha256').update(value).digest('hex');
}

function readJson(filePath, label) {
  if (!fs.existsSync(filePath)) fail(`no existe ${label}: ${filePath}.`);
  try {
    return JSON.parse(fs.readFileSync(filePath, 'utf8'));
  } catch {
    fail(`${label} no contiene JSON válido.`);
  }
}

function normalizeSource(value) {
  return String(value ?? '').replace(/\r\n?/gu, '\n');
}

function taskHeading(line) {
  return /^###\s+(?:✅|\[[^\]]+\])\s+[A-Z0-9]+(?:-[A-Z0-9]+)+-\d{3,4}\s+—\s+.+$/u.test(line);
}

export function replaceTaskBlockInMemory({
  ownerSource,
  markerSource,
  candidate,
  taskId,
} = {}) {
  const sourceLines = normalizeSource(ownerSource).split('\n');
  const marker = String(markerSource ?? '').trim();
  const exactMatches = sourceLines
    .map((line, index) => ({ line: line.trimEnd(), index }))
    .filter(({ line }) => line === marker);

  if (exactMatches.length !== 1) {
    fail(`${taskId}: se esperaba exactamente un marcador fuente; encontrados ${exactMatches.length}.`);
  }

  const start = exactMatches[0].index;
  let end = sourceLines.length;
  for (let index = start + 1; index < sourceLines.length; index += 1) {
    if (taskHeading(sourceLines[index])) {
      end = index;
      break;
    }
  }

  const candidateText = normalizeSource(candidate).trim();
  const expectedPrefix = `### ✅ ${taskId} — `;
  if (!candidateText.startsWith(expectedPrefix)) {
    fail(`${taskId}: candidato no inicia con encabezado aprobado exacto.`);
  }

  const candidateTaskHeadings = candidateText
    .split('\n')
    .filter((line) => taskHeading(line));
  if (candidateTaskHeadings.length !== 1) {
    fail(`${taskId}: candidato debe contener exactamente una tarea; encontrados ${candidateTaskHeadings.length}.`);
  }

  const before = sourceLines.slice(0, start).join('\n').replace(/\n*$/u, '');
  const after = sourceLines.slice(end).join('\n').replace(/^\n*/u, '');
  return [
    before,
    candidateText,
    after,
  ].filter(Boolean).join('\n\n') + '\n';
}

export function buildClosurePlan({
  authorization,
  preflight,
  context,
  phase2Summary,
  reviewer1,
  reviewer2,
  candidate,
  treqChanges,
  ownerSource,
  now = new Date(),
} = {}) {
  if (
    authorization?.authorization_type !== AUTHORIZATION_TYPE
    || authorization?.status !== 'AUTHORIZED'
    || authorization?.lane !== 'DOCUMENTATION'
  ) {
    fail('autorización nocturna inválida para FASE 3.');
  }
  if (
    authorization?.physical_authorization?.granted !== false
    || authorization?.physical_authorization?.scope !== 'NONE'
  ) {
    fail('FASE 3 exige physical_authorization NONE.');
  }
  if (authorization?.phase_2_capabilities?.author_review_enabled !== true) {
    fail('FASE 3 exige FASE 2 author/review habilitada.');
  }
  if (authorization?.phase_3_capabilities?.closure_preflight_enabled !== true) {
    fail('autorización no habilita FASE 3 closure preflight.');
  }
  if (
    authorization?.phase_3_capabilities?.repository_mutation_enabled !== false
    || authorization?.phase_3_capabilities?.task_execution_enabled !== false
  ) {
    fail('FASE 3 preflight debe permanecer read-only.');
  }

  const cutoff = new Date(authorization?.limits?.cutoff_utc ?? '');
  if (Number.isNaN(cutoff.getTime()) || cutoff.getTime() <= now.getTime()) {
    fail('autorización nocturna vencida durante FASE 3.');
  }

  const taskId = String(context?.current?.id ?? '');
  if (!taskId || preflight?.task?.id !== taskId || preflight?.task?.current !== true) {
    fail('FASE 3 no coincide con la tarea documental actual.');
  }

  for (const [label, actual, expected] of [
    ['route', preflight?.continuity?.route, authorization?.start_scope?.route_id],
    ['sequence', preflight?.continuity?.sequence, authorization?.start_scope?.sequence_id],
    ['block', context?.current?.block_code, authorization?.start_scope?.block_code],
  ]) {
    if (actual !== expected) {
      fail(`FASE 3 salió del ${label} autorizado: ${actual || 'VACIO'} != ${expected || 'VACIO'}.`);
    }
  }

  if (phase2Summary?.status !== 'PASS') fail('FASE 2 no terminó PASS.');
  if (phase2Summary?.task_id !== taskId) fail('FASE 2 corresponde a otra tarea.');
  if (phase2Summary?.reviewer_1 !== 'PASS' || phase2Summary?.reviewer_2 !== 'PASS') {
    fail('FASE 3 exige dos reviewers PASS.');
  }
  if (phase2Summary?.same_candidate_sha !== true) fail('FASE 3 exige SAME_CANDIDATE_SHA.');
  if (phase2Summary?.repository_mutation !== false) fail('FASE 2 reportó mutación del repositorio.');
  if (phase2Summary?.task_execution_enabled !== false) fail('FASE 2 reportó task execution habilitada.');
  if (phase2Summary?.physical_authorization !== 'NONE') fail('FASE 2 no conservó physical authorization NONE.');

  const candidateText = normalizeSource(candidate).trim();
  const candidateSha = sha256(`${candidateText}\n`);
  if (!/^[0-9a-f]{64}$/u.test(String(phase2Summary?.candidate_sha256 ?? ''))) {
    fail('FASE 2 no contiene candidate SHA válido.');
  }
  if (candidateSha !== phase2Summary.candidate_sha256) {
    fail(`candidate SHA no coincide: ${candidateSha} != ${phase2Summary.candidate_sha256}.`);
  }

  for (const [label, review] of [['REVIEWER_1', reviewer1], ['REVIEWER_2', reviewer2]]) {
    if (review?.verdict !== 'PASS') fail(`${label} no terminó PASS.`);
    if (review?.candidate_sha256 !== candidateSha) {
      fail(`${label} revisó SHA distinto del candidato.`);
    }
  }

  const changes = Array.isArray(treqChanges) ? treqChanges : [];
  const affected = Array.isArray(phase2Summary?.affected_treq_ids)
    ? [...phase2Summary.affected_treq_ids].sort()
    : [];
  const changeIds = changes.map((entry) => entry?.id).filter(Boolean).sort();
  if (JSON.stringify(affected) !== JSON.stringify(changeIds)) {
    fail('treq-changes.json no coincide con affected_treq_ids de FASE 2.');
  }

  const ownerPath = resolveCanonicalOwnerRelativePath(context?.current?.owner);
  const simulatedOwner = replaceTaskBlockInMemory({
    ownerSource,
    markerSource: context?.current?.marker_source,
    candidate: candidateText,
    taskId,
  });

  let treqDeclaration;
  try {
    treqDeclaration = parseTaskTreqDeclaration(simulatedOwner, taskId);
  } catch (error) {
    fail(`LIFECYCLE_COMPATIBILITY_FAIL: ${error instanceof Error ? error.message : String(error)}`);
  }

  if (treqDeclaration.declaredCount !== changes.length) {
    fail(
      `lifecycle resolvió ${treqDeclaration.declaredCount} TREQ y treq_changes contiene ${changes.length}.`,
    );
  }

  return {
    schema_version: 1,
    status: 'READY_FOR_PHASE4_PILOT',
    phase: 'FASE_3_CLOSURE_ORCHESTRATION',
    task_id: taskId,
    candidate_sha256: candidateSha,
    context_sha256: phase2Summary.context_sha256,
    owner_path: ownerPath,
    marker_source: context.current.marker_source,
    branch: taskBranchName(taskId),
    treq: {
      declared_count: treqDeclaration.declaredCount,
      affected_ids: treqDeclaration.ids,
      changes_count: changes.length,
    },
    planned_lifecycle: {
      start: `npm run docs:task:start -- --task-id ${taskId}`,
      replacement_mode: 'EXACT_SINGLE_TASK_BLOCK',
      validators: Array.isArray(context?.current?.validators)
        ? context.current.validators
        : [],
      finish: `npm run docs:task:finish -- --task-id ${taskId}`,
      require_next_task_allowed: true,
    },
    repository_mutation: false,
    task_execution_enabled: false,
    physical_authorization: 'NONE',
    phase4_execution_enabled: false,
  };
}

export async function runFromEnvironment({
  root = process.cwd(),
  env = process.env,
  now = new Date(),
} = {}) {
  const authorizationPath = String(env.NIGHT_AUTHORIZATION_PATH ?? '').trim();
  const phase2Dir = String(env.NIGHT_PHASE2_DIR ?? '').trim();
  const outputDir = String(env.NIGHT_PHASE3_OUTPUT_DIR ?? '').trim();

  if (!authorizationPath) fail('NIGHT_AUTHORIZATION_PATH es obligatorio.');
  if (!phase2Dir) fail('NIGHT_PHASE2_DIR es obligatorio.');
  if (!outputDir) fail('NIGHT_PHASE3_OUTPUT_DIR es obligatorio.');

  const authorization = readJson(authorizationPath, 'authorization.json');
  const context = readJson(path.join(phase2Dir, 'context-capsule.json'), 'context-capsule.json');
  const phase2Summary = readJson(path.join(phase2Dir, 'phase2-summary.json'), 'phase2-summary.json');
  const reviewer1 = readJson(path.join(phase2Dir, 'reviewer-1.json'), 'reviewer-1.json');
  const reviewer2 = readJson(path.join(phase2Dir, 'reviewer-2.json'), 'reviewer-2.json');
  const treqChanges = readJson(path.join(phase2Dir, 'treq-changes.json'), 'treq-changes.json');

  const candidatePath = path.join(
    phase2Dir,
    `${phase2Summary.task_id}_APROBADA_PARA_REEMPLAZAR.md`,
  );
  if (!fs.existsSync(candidatePath)) fail(`no existe candidato FASE 2: ${candidatePath}.`);
  const candidate = fs.readFileSync(candidatePath, 'utf8');

  const preflight = derivePreflight({ root });
  const ownerPath = resolveCanonicalOwnerRelativePath(context?.current?.owner);
  const ownerAbsolute = path.join(root, ...ownerPath.split('/'));
  if (!fs.existsSync(ownerAbsolute)) fail(`no existe archivo propietario: ${ownerPath}.`);
  const ownerSource = fs.readFileSync(ownerAbsolute, 'utf8');

  const plan = buildClosurePlan({
    authorization,
    preflight,
    context,
    phase2Summary,
    reviewer1,
    reviewer2,
    candidate,
    treqChanges,
    ownerSource,
    now,
  });

  fs.mkdirSync(outputDir, { recursive: true });
  fs.writeFileSync(
    path.join(outputDir, 'closure-plan.json'),
    `${JSON.stringify(plan, null, 2)}\n`,
    'utf8',
  );

  console.log('=== RESULTADO PARA CHATGPT ===');
  console.log('ESTADO: PASS');
  console.log('OPERACION: NIGHT_DOCUMENTATION_CLOSURE_PREFLIGHT');
  console.log(`TASK_ID: ${plan.task_id}`);
  console.log(`CANDIDATE_SHA256: ${plan.candidate_sha256}`);
  console.log(`OWNER_PATH: ${plan.owner_path}`);
  console.log(`TASK_BRANCH: ${plan.branch}`);
  console.log('LIFECYCLE_COMPATIBILITY: PASS');
  console.log('REPOSITORY_MUTATION: NO');
  console.log('TASK_EXECUTION_ENABLED: NO');
  console.log('PHYSICAL_AUTHORIZATION: NONE');
  console.log('PHASE_3: COMPLETE');
  console.log('NEXT_PHASE: FASE_4_ONE_TASK_PILOT');
  console.log('=== FIN RESULTADO PARA CHATGPT ===');

  return plan;
}

const invokedDirectly = process.argv[1]
  && pathToFileURL(path.resolve(process.argv[1])).href === import.meta.url;

if (invokedDirectly) {
  runFromEnvironment().catch((error) => {
    console.error('=== RESULTADO PARA CHATGPT ===');
    console.error('ESTADO: FAIL');
    console.error('OPERACION: NIGHT_DOCUMENTATION_CLOSURE_PREFLIGHT');
    console.error(`ERROR: ${error instanceof Error ? error.message : String(error)}`);
    console.error('REPOSITORY_MUTATION: NO');
    console.error('TASK_EXECUTION_ENABLED: NO');
    console.error('PHYSICAL_AUTHORIZATION: NONE');
    console.error('PHASE_3: NOT_COMPLETE');
    console.error('=== FIN RESULTADO PARA CHATGPT ===');
    process.exitCode = 1;
  });
}
