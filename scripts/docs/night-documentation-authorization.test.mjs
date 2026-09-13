import assert from 'node:assert/strict';
import fs from 'node:fs';
import test from 'node:test';

import {
  AUTHORIZATION_LANE,
  AUTHORIZATION_TYPE,
  buildAuthorization,
  parseCutoff,
  parseMaxTasks,
} from './night-documentation-authorization.mjs';

const validPreflight = {
  task: {
    id: 'NEXO-DOM-019',
    current: true,
  },
  continuity: {
    route: 'NORMAL-CANONICAL-FLOW-001',
    sequence: 'PHASE-05-NEXO',
  },
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

test('materializa autorización documental acotada sin habilitar ejecución ni IA', () => {
  const authorization = build();

  assert.equal(authorization.authorization_type, AUTHORIZATION_TYPE);
  assert.equal(authorization.lane, AUTHORIZATION_LANE);
  assert.equal(authorization.status, 'AUTHORIZED');
  assert.equal(authorization.limits.max_tasks, 3);
  assert.equal(authorization.limits.block_crossing, false);
  assert.equal(authorization.limits.sequence_crossing, false);
  assert.equal(authorization.main_snapshot.policy, 'EVIDENCE_ONLY_NOT_PINNED');
  assert.equal(authorization.phase_1_capabilities.execution_enabled, false);
  assert.equal(authorization.phase_1_capabilities.ai_enabled, false);
  assert.equal(authorization.physical_authorization.granted, false);
  assert.equal(authorization.physical_authorization.scope, 'NONE');
  assert.equal(authorization.start_scope.task_id, 'NEXO-DOM-019');
  assert.match(authorization.authorization_sha256, /^[0-9a-f]{64}$/u);
});

test('fingerprint es determinista para la misma autorización', () => {
  assert.equal(build().authorization_sha256, build().authorization_sha256);
});

test('rechaza ausencia de autorización humana explícita', () => {
  assert.throws(
    () => build({ authorize: 'false' }),
    /confirmación humana explícita/u,
  );
});

test('max_tasks exige entero positivo', () => {
  assert.equal(parseMaxTasks('1'), 1);
  assert.throws(() => parseMaxTasks('0'), /entero positivo/u);
  assert.throws(() => parseMaxTasks('1.5'), /entero positivo/u);
});

test('cutoff exige instante futuro y offset coherente con timezone', () => {
  const parsed = parseCutoff({
    cutoffAt: '2026-09-13T06:30:00-05:00',
    timeZone: 'America/Bogota',
    now: new Date('2026-09-13T03:00:00.000Z'),
  });
  assert.equal(parsed.offsetMinutes, -300);
  assert.throws(
    () => parseCutoff({
      cutoffAt: '2026-09-13T06:30:00+00:00',
      timeZone: 'America/Bogota',
      now: new Date('2026-09-13T03:00:00.000Z'),
    }),
    /usa offset/u,
  );
  assert.throws(
    () => parseCutoff({
      cutoffAt: '2026-09-12T20:00:00-05:00',
      timeZone: 'America/Bogota',
      now: new Date('2026-09-13T03:00:00.000Z'),
    }),
    /futuro/u,
  );
});

test('rechaza ruta o secuencia diferente del active-sequence vigente', () => {
  assert.throws(
    () => build({
      preflight: {
        ...validPreflight,
        continuity: {
          route: 'OTHER',
          sequence: 'PHASE-05-NEXO',
        },
      },
    }),
    /no coinciden/u,
  );
});

test('el workflow FASE 1 es manual, serial, read-only y no consume IA', () => {
  const workflow = fs.readFileSync(
    '.github/workflows/vento-night-documentation-autopilot.yml',
    'utf8',
  );

  assert.match(workflow, /workflow_dispatch:/u);
  assert.match(workflow, /authorize:/u);
  assert.match(workflow, /max_tasks:/u);
  assert.match(workflow, /cutoff_at:/u);
  assert.match(workflow, /timezone:/u);
  assert.match(workflow, /group: vento-night-documentation-autopilot/u);
  assert.match(workflow, /cancel-in-progress: false/u);
  assert.match(workflow, /permissions:\s+contents: read/gu);
  assert.match(workflow, /ref: main/u);
  assert.match(workflow, /git fetch origin main --quiet/u);
  assert.match(workflow, /git checkout --detach origin\/main/u);
  assert.match(workflow, /night-documentation-authorization\.mjs/u);
  assert.match(workflow, /actions\/upload-artifact@v4/u);
  assert.doesNotMatch(workflow, /openai\/codex-action/u);
  assert.doesNotMatch(workflow, /OPENAI_API_KEY/u);
  assert.doesNotMatch(workflow, /docs:task:start/u);
  assert.doesNotMatch(workflow, /docs:task:finish/u);
  assert.doesNotMatch(workflow, /docs:implementation:/u);
  assert.doesNotMatch(workflow, /supabase:/u);
  assert.doesNotMatch(workflow, /deploy/u);
});
