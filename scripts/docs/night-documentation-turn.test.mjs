import assert from 'node:assert/strict';
import test from 'node:test';

import {
  assertZeroTreqChanges,
  classifyTurnStop,
  parseTaskFinishResult,
  validatePhase6Authorization,
  validateUnitScope,
} from './night-documentation-turn.mjs';

const authorization = {
  authorization_type: 'DOCUMENTATION_NIGHT_BATCH_V1',
  status: 'AUTHORIZED',
  lane: 'DOCUMENTATION',
  authorization_sha256: 'a'.repeat(64),
  start_scope: {
    route_id: 'NORMAL-CANONICAL-FLOW-001',
    sequence_id: 'PHASE-05-NEXO',
    block_code: 'BLOQUE K',
    task_id: 'NEXO-DOM-025',
  },
  limits: {
    max_tasks: 3,
    cutoff_utc: '2026-09-15T11:30:00.000Z',
  },
  physical_authorization: { granted: false, scope: 'NONE' },
  phase_2_capabilities: { author_review_enabled: true },
  phase_3_capabilities: { closure_preflight_enabled: true },
  phase_6_capabilities: {
    execute_turn_enabled: true,
    repository_mutation_enabled: true,
    task_execution_enabled: true,
    github_mutation_enabled: true,
  },
};

test('FASE 6 exige autorización explícita de ejecución y physical NONE', () => {
  assert.equal(
    validatePhase6Authorization(authorization, {
      now: new Date('2026-09-15T10:00:00.000Z'),
    }),
    true,
  );

  assert.throws(
    () => validatePhase6Authorization({
      ...authorization,
      phase_6_capabilities: {
        ...authorization.phase_6_capabilities,
        execute_turn_enabled: false,
      },
    }, { now: new Date('2026-09-15T10:00:00.000Z') }),
    /no habilita ejecución documental FASE 6/u,
  );

  assert.throws(
    () => validatePhase6Authorization({
      ...authorization,
      physical_authorization: { granted: true, scope: 'SUPABASE' },
    }, { now: new Date('2026-09-15T10:00:00.000Z') }),
    /physical_authorization NONE/u,
  );
});

test('turno se detiene por max_tasks o cutoff antes de otra unidad', () => {
  assert.equal(classifyTurnStop({
    completedTasks: 3,
    maxTasks: 3,
    cutoffUtc: '2026-09-15T11:30:00.000Z',
    now: new Date('2026-09-15T10:00:00.000Z'),
  }), 'MAX_TASKS_REACHED');

  assert.equal(classifyTurnStop({
    completedTasks: 1,
    maxTasks: 3,
    cutoffUtc: '2026-09-15T11:30:00.000Z',
    now: new Date('2026-09-15T11:30:00.000Z'),
  }), 'CUTOFF_REACHED');

  assert.equal(classifyTurnStop({
    completedTasks: 1,
    maxTasks: 3,
    cutoffUtc: '2026-09-15T11:30:00.000Z',
    now: new Date('2026-09-15T10:00:00.000Z'),
  }), null);
});

test('unidad debe permanecer en route sequence y block autorizados', () => {
  const preflight = {
    task: { id: 'NEXO-DOM-025', current: true },
    continuity: {
      route: 'NORMAL-CANONICAL-FLOW-001',
      sequence: 'PHASE-05-NEXO',
    },
    blockers: [],
  };
  const active = { block_code: 'BLOQUE K' };

  assert.equal(validateUnitScope({
    authorization,
    preflight,
    activeSequence: active,
  }), 'NEXO-DOM-025');

  assert.throws(
    () => validateUnitScope({
      authorization,
      preflight,
      activeSequence: { block_code: 'BLOQUE L' },
    }),
    /BLOCK_OR_SEQUENCE_CROSSING/u,
  );
});

test('turno V1 falla cerrado ante cambios TREQ', () => {
  assert.equal(assertZeroTreqChanges({
    affected_treq_ids: [],
    changes: [],
  }), true);

  assert.throws(
    () => assertZeroTreqChanges({
      affected_treq_ids: ['TREQ-NEXO-999'],
      changes: [{ id: 'TREQ-NEXO-999' }],
    }),
    /TREQ_CHANGE_REQUIRES_REGISTRY_MATERIALIZATION/u,
  );
});

test('parsea TASK_FINISH solo con PASS y NEXT_TASK_ALLOWED', () => {
  const parsed = parseTaskFinishResult(`
=== RESULTADO PARA CHATGPT ===
ESTADO: PASS
OPERACION: TASK_FINISH
TASK_ID: NEXO-DOM-025
PR: 509
MERGE_COMMIT: ${'b'.repeat(40)}
MAIN_HEAD: ${'c'.repeat(40)}
NEXT_TASK_ALLOWED: SI
=== FIN RESULTADO PARA CHATGPT ===
`);
  assert.deepEqual(parsed, {
    taskId: 'NEXO-DOM-025',
    pr: 509,
    mergeCommit: 'b'.repeat(40),
    mainHead: 'c'.repeat(40),
  });

  assert.throws(
    () => parseTaskFinishResult('ESTADO: FAIL'),
    /PASS \+ NEXT_TASK_ALLOWED/u,
  );
});
