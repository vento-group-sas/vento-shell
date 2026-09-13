import assert from 'node:assert/strict';
import fs from 'node:fs';
import test from 'node:test';

import {
  AUTHORIZATION_LANE,
  AUTHORIZATION_TYPE,
  buildAuthorization,
  parseCutoff,
  parseMaxTasks,
  parseOptionalBoolean,
} from './night-documentation-authorization.mjs';

const validPreflight = {
  task: { id: 'NEXO-DOM-019', current: true },
  continuity: { route: 'NORMAL-CANONICAL-FLOW-001', sequence: 'PHASE-05-NEXO' },
  blockers: [],
};
const activeSequence = {
  route_id: 'NORMAL-CANONICAL-FLOW-001',
  sequence_id: 'PHASE-05-NEXO',
  block_code: 'BLOQUE K',
  block_title: 'NEXO',
};

function build(overrides = {}) {
  return buildAuthorization({
    now: new Date('2026-09-13T03:00:00.000Z'),
    authorize: 'true',
    phase2AuthorReview: false,
    phase3ClosurePreflight: false,
    maxTasks: '3',
    cutoffAt: '2026-09-13T06:30:00-05:00',
    timeZone: 'America/Bogota',
    repository: 'vento-group-sas/vento-shell',
    actor: 'vento-owner',
    runId: '123456',
    runAttempt: '1',
    mainSha: 'a'.repeat(40),
    starterSha256: 'b'.repeat(64),
    preflight: validPreflight,
    activeSequence,
    ...overrides,
  });
}

test('mantiene FASE 1 sin IA y FASE 2 deshabilitada por defecto', () => {
  const authorization = build();
  assert.equal(authorization.authorization_type, AUTHORIZATION_TYPE);
  assert.equal(authorization.lane, AUTHORIZATION_LANE);
  assert.equal(authorization.phase_1_capabilities.ai_enabled, false);
  assert.equal(authorization.phase_1_capabilities.execution_enabled, false);
  assert.equal(authorization.phase_2_capabilities.author_review_enabled, false);
  assert.equal(authorization.phase_2_capabilities.ai_enabled, false);
  assert.equal(authorization.phase_2_capabilities.repository_mutation_enabled, false);
  assert.equal(authorization.phase_2_capabilities.task_execution_enabled, false);
  assert.equal(authorization.phase_3_capabilities.closure_preflight_enabled, false);
  assert.equal(authorization.phase_3_capabilities.repository_mutation_enabled, false);
  assert.equal(authorization.phase_3_capabilities.task_execution_enabled, false);
  assert.equal(authorization.physical_authorization.scope, 'NONE');
});

test('autoriza FASE 2 explícitamente sin habilitar mutación ni ejecución', () => {
  const authorization = build({ phase2AuthorReview: true });
  assert.equal(authorization.phase_2_capabilities.author_review_enabled, true);
  assert.equal(authorization.phase_2_capabilities.ai_enabled, true);
  assert.equal(authorization.phase_2_capabilities.max_model_calls_per_task, 3);
  assert.equal(authorization.phase_2_capabilities.repair_cycles, 0);
  assert.equal(authorization.phase_2_capabilities.repository_mutation_enabled, false);
  assert.equal(authorization.phase_2_capabilities.task_execution_enabled, false);
  assert.match(authorization.authorization_sha256, /^[0-9a-f]{64}$/u);
});

test('autoriza FASE 3 preflight solo junto con FASE 2 y permanece read-only', () => {
  const authorization = build({
    phase2AuthorReview: true,
    phase3ClosurePreflight: true,
  });
  assert.equal(authorization.phase_3_capabilities.closure_preflight_enabled, true);
  assert.equal(authorization.phase_3_capabilities.repository_mutation_enabled, false);
  assert.equal(authorization.phase_3_capabilities.task_execution_enabled, false);
  assert.throws(
    () => build({ phase3ClosurePreflight: true }),
    /exige FASE 2 author\/review habilitada/u,
  );
});

test('fingerprint cambia cuando se habilita FASE 2', () => {
  assert.notEqual(build().authorization_sha256, build({ phase2AuthorReview: true }).authorization_sha256);
});

test('rechaza ausencia de autorización humana explícita', () => {
  assert.throws(() => build({ authorize: 'false' }), /confirmación humana explícita/u);
});

test('flags booleanos y max_tasks fallan cerrado', () => {
  assert.equal(parseOptionalBoolean('true', 'phase2'), true);
  assert.equal(parseOptionalBoolean('', 'phase2'), false);
  assert.throws(() => parseOptionalBoolean('yes', 'phase2'), /true o false/u);
  assert.equal(parseMaxTasks('1'), 1);
  assert.throws(() => parseMaxTasks('0'), /entero positivo/u);
});

test('cutoff exige instante futuro y offset coherente', () => {
  const parsed = parseCutoff({
    cutoffAt: '2026-09-13T06:30:00-05:00',
    timeZone: 'America/Bogota',
    now: new Date('2026-09-13T03:00:00.000Z'),
  });
  assert.equal(parsed.offsetMinutes, -300);
  assert.throws(() => parseCutoff({
    cutoffAt: '2026-09-13T06:30:00+00:00',
    timeZone: 'America/Bogota',
    now: new Date('2026-09-13T03:00:00.000Z'),
  }), /usa offset/u);
});

test('rechaza ruta o secuencia diferente del active-sequence', () => {
  assert.throws(() => build({
    preflight: { ...validPreflight, continuity: { route: 'OTHER', sequence: 'PHASE-05-NEXO' } },
  }), /no coinciden/u);
});

test('workflow conserva autorización manual y añade FASE 2 gated/read-only', () => {
  const workflow = fs.readFileSync('.github/workflows/vento-night-documentation-autopilot.yml', 'utf8');
  assert.match(workflow, /workflow_dispatch:/u);
  assert.match(workflow, /phase2_author_review:/u);
  assert.match(workflow, /phase3_closure_preflight:/u);
  assert.match(workflow, /group: vento-night-documentation-autopilot/u);
  assert.match(workflow, /cancel-in-progress: false/u);
  assert.match(workflow, /permissions:\s+contents: read/gu);
  assert.match(workflow, /night-documentation-context\.mjs/u);
  assert.match(workflow, /night-documentation-author-review\.mjs/u);
  assert.match(workflow, /night-documentation-closure\.mjs/u);
  assert.match(workflow, /OPENAI_API_KEY: \$\{\{ secrets\.OPENAI_API_KEY \}\}/u);
  assert.match(workflow, /if: \$\{\{ inputs\.phase2_author_review \}\}/u);
  assert.doesNotMatch(workflow, /openai\/codex-action/u);
  assert.doesNotMatch(workflow, /docs:task:start/u);
  assert.doesNotMatch(workflow, /docs:task:finish/u);
  assert.doesNotMatch(workflow, /docs:implementation:/u);
  assert.doesNotMatch(workflow, /supabase:/u);
  assert.doesNotMatch(workflow, /deploy/u);
});
