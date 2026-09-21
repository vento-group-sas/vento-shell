import assert from 'node:assert/strict';
import test from 'node:test';

import {
  IMPLEMENTATION_READINESS_GATE_STATE_TYPE,
  deriveDecisionOwnerFromPackageCatalog,
  evaluateImplementationReadinessGates,
  replaceImplementationReadinessGateState,
} from './implementation-readiness-gate-engine.mjs';

const CANDIDATE = 'a'.repeat(40);
const LIFECYCLE = 'b'.repeat(40);

function fixture({ input = null, previous = null } = {}) {
  const target = { environment_role: 'STAGING', target_type: 'ENVIRONMENT_PROFILE', target_id: 'ENV-WEB-CI-STAGING', owner: 'OWN-OPS' };
  const instance = {
    instance_id: 'SHELL-CI-021::GAP-PKG-045',
    status: 'IMPLEMENTED',
    validation_commands: ['npm test'],
    target_environments: [target],
    evidence: [
      'LOCAL_VALIDATION candidate=' + CANDIDATE + ' command=npm test status=PASS',
      ...(previous ? [previous] : []),
    ],
  };
  const request = {
    schema_version: 1,
    instance_id: instance.instance_id,
    candidate_commit: CANDIDATE,
    lifecycle_head_commit: LIFECYCLE,
    candidate_lifecycle: { decision: 'REUSE_PHYSICAL_EVIDENCE' },
    validation_commands: ['npm test'],
    results: [{ command: 'npm test', status: 'PASS' }],
    target_environments: [target],
  };
  const ci020 = {
    instance_id: 'SHELL-CI-020::GAP-PKG-045',
    authorized_changes: [{ path: 'packages/contracts/shared.ts', change: 'MODIFY' }],
    evidence: [{
      type: 'IMPLEMENTATION_EXECUTION_EVIDENCE_V1',
      environment_results: [{ ...target, status: 'PASS', evidence: ['VERCEL_PREVIEW state=READY target=PREVIEW_NO_PRODUCTION'] }],
      operational_evidence: [
        'SUPABASE_MUTATIONS=0 DATABASE_MUTATIONS=0',
        'ROLLBACK_STRATEGY git revert exact candidate',
      ],
    }],
  };
  const packageGate = { status: 'APPROVED_FOR_IMPLEMENTATION', canonical_snapshot: { package_id: 'GAP-PKG-045' } };
  const packageCatalog = [
    '| Paquete | Responsable de decisión |',
    '| --- | --- |',
    '| `GAP-PKG-045` | `OWN-OPS` |',
  ].join('\n');
  return { instance, request, supplied: { ci020, packageGate, packageCatalog, input } };
}

function completeInput(fingerprint) {
  return {
    schema_version: 1,
    instance_id: 'SHELL-CI-021::GAP-PKG-045',
    candidate_commit: CANDIDATE,
    physical_fingerprint: fingerprint,
    support: {
      titular: 'persona-a',
      suplente: 'persona-b',
      coverage_window: 'pilot-window',
      levels: ['L1', 'L2'],
      escalation: ['OWN-OPS'],
      ownership_confirmed: true,
      evidence_refs: ['SUPPORT-REF'],
    },
    rollback_exercise: {
      result: 'PASS',
      executed_at: '2026-09-21T07:00:00Z',
      environment_id: 'ENV-WEB-CI-STAGING',
      candidate_commit: CANDIDATE,
      evidence_refs: ['ROLLBACK-REF'],
      restore_verified: true,
      production_mutations: false,
    },
    pilot_entry_decision: {
      decision: 'APROBAR_ENTRADA',
      authority: 'OWN-OPS',
      approved_by: 'VENTO_OWNER',
      approved_at: '2026-09-21T07:05:00Z',
    },
  };
}

test('extrae Responsable de decisión del catálogo E5', () => {
  assert.equal(deriveDecisionOwnerFromPackageCatalog('| Paquete | Responsable de decisión |\n|---|---|\n| `GAP-PKG-045` | `OWN-OPS` |', 'GAP-PKG-045'), 'OWN-OPS');
});

test('CI021 estándar resuelve auto/no-aplica y bloquea únicamente evidencia real faltante', () => {
  const fx = fixture();
  const result = evaluateImplementationReadinessGates({ ...fx, now: '2026-09-21T06:40:00Z' });
  assert.equal(result.applies, true);
  assert.equal(result.complete, false);
  assert.deepEqual(result.state.summary.blocked_gates, ['READY-GATE-010', 'READY-GATE-012', 'READY-GATE-014', 'READY-GATE-015']);
  assert.equal(result.state.gates.find((g) => g.gate_id === 'READY-GATE-001').status, 'PASS');
  assert.equal(result.state.gates.find((g) => g.gate_id === 'READY-GATE-002').status, 'NO_APLICA');
  assert.equal(result.state.gates.find((g) => g.gate_id === 'READY-GATE-005').status, 'PASS');
  assert.equal(result.state.gates.find((g) => g.gate_id === 'READY-GATE-011').status, 'PASS');
  assert.equal(result.state.gates.find((g) => g.gate_id === 'READY-GATE-013').status, 'PASS');
});

test('PASS previos con mismo fingerprint se reutilizan y blockers se reevalúan', () => {
  const first = evaluateImplementationReadinessGates({ ...fixture(), now: '2026-09-21T06:40:00Z' });
  const secondFx = fixture({ previous: first.state });
  const second = evaluateImplementationReadinessGates({ ...secondFx, now: '2026-09-21T06:41:00Z' });
  assert.equal(second.state.gates.find((g) => g.gate_id === 'READY-GATE-001').reused, true);
  assert.equal(second.state.gates.find((g) => g.gate_id === 'READY-GATE-010').status, 'BLOQUEADO');
});

test('cambio de candidate invalida input y evita reutilización silenciosa', () => {
  const first = evaluateImplementationReadinessGates({ ...fixture(), now: '2026-09-21T06:40:00Z' });
  const fx = fixture({ previous: first.state });
  fx.request.candidate_commit = 'c'.repeat(40);
  assert.throws(() => evaluateImplementationReadinessGates({ ...fx, supplied: { ...fx.supplied, input: completeInput(first.state.physical_fingerprint) } }), /INPUT_CANDIDATE_MISMATCH|INPUT_FINGERPRINT_MISMATCH/u);
});

test('evidencia humana + ejercicio + decisión final produce receipt compatible', () => {
  const first = evaluateImplementationReadinessGates({ ...fixture(), now: '2026-09-21T06:40:00Z' });
  const input = completeInput(first.state.physical_fingerprint);
  const fx = fixture({ input, previous: first.state });
  const result = evaluateImplementationReadinessGates({ ...fx, now: '2026-09-21T07:05:30Z' });
  assert.equal(result.complete, true);
  assert.equal(result.state.summary.fail_count, 0);
  assert.equal(result.state.summary.blocked_count, 0);
  assert.equal(result.state.gates.find((g) => g.gate_id === 'READY-GATE-015').status, 'PASS');
  assert.equal(result.finalReceipt.environment_results[0].status, 'PASS');
  assert.match(result.finalReceipt.operational_evidence.join('\n'), /READY_GATE_015:APROBAR_ENTRADA/u);
});

test('replace conserva evidencia existente y sustituye un único readiness state', () => {
  const fx = fixture();
  const first = evaluateImplementationReadinessGates({ ...fx });
  const once = replaceImplementationReadinessGateState(fx.instance, first.state);
  const twice = replaceImplementationReadinessGateState(once, { ...first.state, observed_at: 'later' });
  assert.equal(twice.evidence.filter((entry) => entry?.type === IMPLEMENTATION_READINESS_GATE_STATE_TYPE).length, 1);
  assert.equal(twice.evidence[0].startsWith('LOCAL_VALIDATION'), true);
});
