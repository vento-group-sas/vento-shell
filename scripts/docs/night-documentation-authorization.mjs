import crypto from 'node:crypto';
import fs from 'node:fs';
import path from 'node:path';
import { spawnSync } from 'node:child_process';
import { pathToFileURL } from 'node:url';

export const AUTHORIZATION_TYPE = 'DOCUMENTATION_NIGHT_BATCH_V1';
export const AUTHORIZATION_LANE = 'DOCUMENTATION';
export const REQUIRED_REPOSITORY = 'vento-group-sas/vento-shell';
export const PROTOCOL_PATH = 'docs/plan-canonico/modular/01_PROTOCOLO.md';
export const ACTIVE_SEQUENCE_PATH = 'docs/plan-canonico/modular/active-sequence.json';
export const DOCUMENTATION_STARTER_PATH = '.delivery/INICIADOR_VENTO_DOCUMENTACION.txt';

function fail(message) {
  throw new Error(message);
}

export function stableObject(value) {
  if (Array.isArray(value)) return value.map(stableObject);
  if (!value || typeof value !== 'object') return value;
  return Object.fromEntries(
    Object.entries(value)
      .sort(([left], [right]) => left.localeCompare(right, 'en'))
      .map(([key, entry]) => [key, stableObject(entry)]),
  );
}

export function sha256(value) {
  return crypto.createHash('sha256').update(value).digest('hex');
}

export function parseAuthorizationFlag(value) {
  const normalized = String(value ?? '').trim().toLowerCase();
  if (normalized !== 'true') {
    fail('La autorización nocturna exige confirmación humana explícita authorize=true.');
  }
  return true;
}

export function parseOptionalBoolean(value, label = 'flag') {
  const normalized = String(value ?? '').trim().toLowerCase() || 'false';
  if (!['true', 'false'].includes(normalized)) fail(`${label} debe ser true o false.`);
  return normalized === 'true';
}

export function parseMaxTasks(value) {
  const raw = String(value ?? '').trim();
  if (!/^[1-9]\d*$/u.test(raw)) fail('max_tasks debe ser un entero positivo explícito.');
  const parsed = Number(raw);
  if (!Number.isSafeInteger(parsed) || parsed <= 0) fail('max_tasks debe ser un entero positivo seguro.');
  return parsed;
}

export function validateTimeZone(value) {
  const zone = String(value ?? '').trim();
  if (!zone) fail('timezone es obligatorio.');
  try {
    new Intl.DateTimeFormat('en-US', { timeZone: zone }).format(new Date());
  } catch {
    fail(`timezone IANA inválido: ${zone}.`);
  }
  return zone;
}

function explicitOffsetMinutes(source) {
  const match = String(source).trim().match(/(Z|[+-]\d{2}:\d{2})$/u);
  if (!match) fail('cutoff_at debe ser ISO-8601 absoluto y terminar en Z o ±HH:MM.');
  if (match[1] === 'Z') return 0;
  const sign = match[1][0] === '-' ? -1 : 1;
  const hours = Number(match[1].slice(1, 3));
  const minutes = Number(match[1].slice(4, 6));
  if (hours > 23 || minutes > 59) fail(`offset inválido en cutoff_at: ${match[1]}.`);
  return sign * ((hours * 60) + minutes);
}

export function timeZoneOffsetMinutesAt(instant, timeZone) {
  const formatter = new Intl.DateTimeFormat('en-US', {
    timeZone,
    timeZoneName: 'longOffset',
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    hourCycle: 'h23',
  });
  const label = formatter.formatToParts(instant)
    .find((part) => part.type === 'timeZoneName')?.value ?? '';
  if (label === 'GMT' || label === 'UTC') return 0;
  const match = label.match(/^GMT([+-])(\d{2}):(\d{2})$/u);
  if (!match) fail(`no se pudo resolver offset para timezone ${timeZone}: ${label || 'VACÍO'}.`);
  const sign = match[1] === '-' ? -1 : 1;
  return sign * ((Number(match[2]) * 60) + Number(match[3]));
}

export function parseCutoff({ cutoffAt, timeZone, now = new Date() } = {}) {
  const source = String(cutoffAt ?? '').trim();
  const zone = validateTimeZone(timeZone);
  const explicitOffset = explicitOffsetMinutes(source);
  const instant = new Date(source);
  if (Number.isNaN(instant.getTime())) fail(`cutoff_at inválido: ${source || 'VACÍO'}.`);
  if (instant.getTime() <= now.getTime()) fail('cutoff_at debe estar en el futuro al emitir la autorización.');
  const zoneOffset = timeZoneOffsetMinutesAt(instant, zone);
  if (explicitOffset !== zoneOffset) {
    fail(`cutoff_at usa offset ${explicitOffset} min pero ${zone} usa ${zoneOffset} min en ese instante.`);
  }
  return {
    requested: source,
    instantUtc: instant.toISOString(),
    timeZone: zone,
    offsetMinutes: zoneOffset,
  };
}

export function assertCanonicalNightGovernance(protocolSource) {
  const source = String(protocolSource ?? '');
  const required = [
    '#### 4.9. Autorización Documental Nocturna',
    '`main` es dinámico durante el turno.',
    'dos revisiones independientes terminan en PASS sobre el mismo SHA',
    '`NEXT_TASK_ALLOWED: SI`',
  ];
  for (const marker of required) {
    if (!source.includes(marker)) fail(`01_PROTOCOLO.md no contiene la gobernanza nocturna requerida: ${marker}`);
  }
  return true;
}

export function buildAuthorization({
  now = new Date(),
  authorize,
  phase2AuthorReview = false,
  maxTasks,
  cutoffAt,
  timeZone,
  repository,
  actor,
  runId,
  runAttempt = '1',
  mainSha,
  starterSha256,
  preflight,
  activeSequence,
} = {}) {
  parseAuthorizationFlag(authorize);
  const authorReviewEnabled = typeof phase2AuthorReview === 'boolean'
    ? phase2AuthorReview
    : parseOptionalBoolean(phase2AuthorReview, 'phase2_author_review');
  const taskLimit = parseMaxTasks(maxTasks);
  const cutoff = parseCutoff({ cutoffAt, timeZone, now });

  if (repository !== REQUIRED_REPOSITORY) fail(`repositorio no autorizado para este runner: ${repository || 'VACÍO'}.`);
  if (!String(actor ?? '').trim()) fail('github actor es obligatorio.');
  if (!String(runId ?? '').trim()) fail('github run_id es obligatorio.');
  if (!/^[0-9a-f]{40}$/u.test(String(mainSha ?? '').trim().toLowerCase())) fail('main_sha debe ser un SHA Git de 40 caracteres.');
  if (!/^[0-9a-f]{64}$/u.test(String(starterSha256 ?? '').trim().toLowerCase())) fail('starter_sha256 debe ser SHA-256 hexadecimal.');

  const blockers = Array.isArray(preflight?.blockers) ? preflight.blockers : [];
  if (blockers.length > 0) fail(`preflight documental bloqueado: ${blockers.join(' | ')}`);
  if (preflight?.task?.current !== true || !preflight?.task?.id) fail('preflight no resolvió una tarea documental actual.');
  if (
    preflight?.continuity?.route !== activeSequence?.route_id
    || preflight?.continuity?.sequence !== activeSequence?.sequence_id
  ) fail('preflight y active-sequence no coinciden en ruta/secuencia.');
  if (!activeSequence?.block_code) fail('active-sequence no contiene block_code.');

  const authorization = {
    schema_version: 2,
    authorization_type: AUTHORIZATION_TYPE,
    status: 'AUTHORIZED',
    authorization_identity: `github:${repository}:${runId}:${runAttempt}`,
    authorized_at: now.toISOString(),
    authorized_by: String(actor).trim(),
    lane: AUTHORIZATION_LANE,
    repository,
    main_snapshot: {
      sha: String(mainSha).trim().toLowerCase(),
      policy: 'EVIDENCE_ONLY_NOT_PINNED',
    },
    documentation_starter: {
      path: DOCUMENTATION_STARTER_PATH,
      sha256: String(starterSha256).trim().toLowerCase(),
    },
    start_scope: {
      route_id: activeSequence.route_id,
      sequence_id: activeSequence.sequence_id,
      block_code: activeSequence.block_code,
      block_title: activeSequence.block_title ?? null,
      task_id: preflight.task.id,
    },
    limits: {
      max_tasks: taskLimit,
      cutoff_at: cutoff.requested,
      cutoff_utc: cutoff.instantUtc,
      timezone: cutoff.timeZone,
      block_crossing: false,
      sequence_crossing: false,
    },
    delegated_gates: ['INDIVIDUAL_DOCUMENT_APPROVAL', 'CONVERSATIONAL_CONTINUE_REQUEST'],
    physical_authorization: { granted: false, scope: 'NONE' },
    phase_1_capabilities: {
      execution_enabled: false,
      ai_enabled: false,
      allowed_operations: [
        'READ_CANONICAL_STATE',
        'REGENERATE_DOCUMENTATION_STARTER',
        'RESOLVE_CURRENT_DOCUMENTATION_TASK',
        'MATERIALIZE_AUTHORIZATION_EVIDENCE',
      ],
    },
    phase_2_capabilities: {
      author_review_enabled: authorReviewEnabled,
      ai_enabled: authorReviewEnabled,
      repository_mutation_enabled: false,
      task_execution_enabled: false,
      max_model_calls_per_task: 3,
      repair_cycles: 0,
      allowed_operations: authorReviewEnabled ? [
        'BUILD_MINIMAL_CONTEXT_CAPSULE',
        'DRAFT_SINGLE_DOCUMENTATION_CANDIDATE',
        'REVIEW_CANDIDATE_INDEPENDENTLY_TWICE',
        'MATERIALIZE_AUTHOR_REVIEW_EVIDENCE',
      ] : [],
    },
    stop_policy: 'FAIL_CLOSED',
  };

  const fingerprintPayload = stableObject(authorization);
  return { ...authorization, authorization_sha256: sha256(JSON.stringify(fingerprintPayload)) };
}

function git(root, args) {
  const result = spawnSync('git', args, { cwd: root, encoding: 'utf8' });
  if (result.status !== 0) fail(result.stderr?.trim() || result.stdout?.trim() || `git ${args.join(' ')} falló.`);
  return result.stdout.trim();
}

function readJson(filePath, label) {
  if (!fs.existsSync(filePath)) fail(`no existe ${label}: ${filePath}.`);
  return JSON.parse(fs.readFileSync(filePath, 'utf8'));
}

function writeGithubOutput(filePath, authorization) {
  if (!filePath) return;
  fs.appendFileSync(filePath, [
    `authorization_status=${authorization.status}`,
    `authorization_sha256=${authorization.authorization_sha256}`,
    `task_id=${authorization.start_scope.task_id}`,
    `route_id=${authorization.start_scope.route_id}`,
    `sequence_id=${authorization.start_scope.sequence_id}`,
    `block_code=${authorization.start_scope.block_code}`,
    `execution_enabled=${authorization.phase_1_capabilities.execution_enabled}`,
    `phase2_author_review_enabled=${authorization.phase_2_capabilities.author_review_enabled}`,
    '',
  ].join('\n'), 'utf8');
}

function writeSummary(filePath, authorization) {
  if (!filePath) return;
  const lines = [
    '# VENTO Night Documentation Authorization',
    '',
    `- Status: ${authorization.status}`,
    `- Lane: ${authorization.lane}`,
    `- Authorized by: ${authorization.authorized_by}`,
    `- Start task: ${authorization.start_scope.task_id}`,
    `- Route: ${authorization.start_scope.route_id}`,
    `- Sequence: ${authorization.start_scope.sequence_id}`,
    `- Block: ${authorization.start_scope.block_code}`,
    `- Maximum tasks: ${authorization.limits.max_tasks}`,
    `- Cutoff: ${authorization.limits.cutoff_at}`,
    `- Timezone: ${authorization.limits.timezone}`,
    `- Main snapshot: ${authorization.main_snapshot.sha} (evidence only, not pinned)`,
    `- AI enabled in Phase 1: ${authorization.phase_1_capabilities.ai_enabled}`,
    `- Phase 2 author/review enabled: ${authorization.phase_2_capabilities.author_review_enabled}`,
    `- Phase 2 max model calls per task: ${authorization.phase_2_capabilities.max_model_calls_per_task}`,
    `- Repository mutation enabled in Phase 2: ${authorization.phase_2_capabilities.repository_mutation_enabled}`,
    `- Task execution enabled in Phase 2: ${authorization.phase_2_capabilities.task_execution_enabled}`,
    `- Physical authorization: ${authorization.physical_authorization.scope}`,
    `- Authorization SHA-256: ${authorization.authorization_sha256}`,
    '',
  ];
  fs.appendFileSync(filePath, lines.join('\n'), 'utf8');
}

export async function runFromEnvironment({ root = process.cwd(), env = process.env, now = new Date() } = {}) {
  if (env.GITHUB_EVENT_NAME !== 'workflow_dispatch') fail(`evento no autorizado: ${env.GITHUB_EVENT_NAME || 'VACÍO'}.`);

  const packageJson = readJson(path.join(root, 'package.json'), 'package.json');
  if (packageJson.name !== 'vento-shell') fail(`repositorio inesperado: ${packageJson.name || 'VACÍO'}.`);

  const protocolSource = fs.readFileSync(path.join(root, PROTOCOL_PATH), 'utf8');
  assertCanonicalNightGovernance(protocolSource);
  const starterPath = path.join(root, DOCUMENTATION_STARTER_PATH);
  if (!fs.existsSync(starterPath)) fail(`falta el iniciador documental regenerado: ${DOCUMENTATION_STARTER_PATH}.`);

  const activeSequence = readJson(path.join(root, ACTIVE_SEQUENCE_PATH), 'active-sequence.json');
  const { derivePreflight } = await import('./canonical-task-preflight.mjs');
  const preflight = derivePreflight({ root });
  const authorization = buildAuthorization({
    now,
    authorize: env.NIGHT_AUTHORIZATION_GRANTED,
    phase2AuthorReview: env.NIGHT_PHASE2_AUTHOR_REVIEW,
    maxTasks: env.NIGHT_MAX_TASKS,
    cutoffAt: env.NIGHT_CUTOFF_AT,
    timeZone: env.NIGHT_TIMEZONE,
    repository: env.GITHUB_REPOSITORY,
    actor: env.GITHUB_ACTOR,
    runId: env.GITHUB_RUN_ID,
    runAttempt: env.GITHUB_RUN_ATTEMPT || '1',
    mainSha: git(root, ['rev-parse', 'HEAD']).toLowerCase(),
    starterSha256: sha256(fs.readFileSync(starterPath)),
    preflight,
    activeSequence,
  });

  const outputPath = String(env.NIGHT_AUTHORIZATION_OUTPUT ?? '').trim();
  if (!outputPath) fail('NIGHT_AUTHORIZATION_OUTPUT es obligatorio.');
  fs.mkdirSync(path.dirname(outputPath), { recursive: true });
  fs.writeFileSync(outputPath, `${JSON.stringify(authorization, null, 2)}\n`, 'utf8');
  writeGithubOutput(env.GITHUB_OUTPUT, authorization);
  writeSummary(env.GITHUB_STEP_SUMMARY, authorization);

  console.log('=== RESULTADO PARA CHATGPT ===');
  console.log('ESTADO: PASS');
  console.log('OPERACION: NIGHT_DOCUMENTATION_AUTHORIZATION');
  console.log(`AUTHORIZATION_STATUS: ${authorization.status}`);
  console.log(`AUTHORIZATION_SHA256: ${authorization.authorization_sha256}`);
  console.log(`START_TASK: ${authorization.start_scope.task_id}`);
  console.log(`ROUTE: ${authorization.start_scope.route_id}`);
  console.log(`SEQUENCE: ${authorization.start_scope.sequence_id}`);
  console.log(`BLOCK: ${authorization.start_scope.block_code}`);
  console.log(`MAX_TASKS: ${authorization.limits.max_tasks}`);
  console.log(`CUTOFF_AT: ${authorization.limits.cutoff_at}`);
  console.log(`TIMEZONE: ${authorization.limits.timezone}`);
  console.log(`MAIN_SHA_EVIDENCE: ${authorization.main_snapshot.sha}`);
  console.log('MAIN_SHA_POLICY: EVIDENCE_ONLY_NOT_PINNED');
  console.log('PHASE_1_AI_ENABLED: NO');
  console.log(`PHASE_2_AUTHOR_REVIEW_ENABLED: ${authorization.phase_2_capabilities.author_review_enabled ? 'SI' : 'NO'}`);
  console.log(`PHASE_2_AI_ENABLED: ${authorization.phase_2_capabilities.ai_enabled ? 'SI' : 'NO'}`);
  console.log('TASK_EXECUTION_ENABLED: NO');
  console.log('REPOSITORY_MUTATION_ENABLED: NO');
  console.log('PHYSICAL_AUTHORIZATION: NONE');
  console.log('=== FIN RESULTADO PARA CHATGPT ===');
  return authorization;
}

const invokedDirectly = process.argv[1]
  && import.meta.url === pathToFileURL(path.resolve(process.argv[1])).href;

if (invokedDirectly) {
  runFromEnvironment().catch((error) => {
    console.error('=== RESULTADO PARA CHATGPT ===');
    console.error('ESTADO: FAIL');
    console.error('OPERACION: NIGHT_DOCUMENTATION_AUTHORIZATION');
    console.error(`ERROR: ${error instanceof Error ? error.message : String(error)}`);
    console.error('TASK_EXECUTION_ENABLED: NO');
    console.error('REPOSITORY_MUTATION_ENABLED: NO');
    console.error('PHYSICAL_AUTHORIZATION: NONE');
    console.error('=== FIN RESULTADO PARA CHATGPT ===');
    process.exitCode = 1;
  });
}
