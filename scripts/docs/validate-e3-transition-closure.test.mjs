import assert from 'node:assert/strict';
import test from 'node:test';

import { validateE3TransitionClosureSources } from './validate-e3-transition-closure.mjs';

const orderedSequence = [
  'SHELL-AUD-001..011', 'SHELL-PKG-001..008', 'TSVC-CAT-001..010',
  'AUTH-UI-030..039', 'AUTH-DEV-001..006', 'AUTH-SIM-001..006',
  'AUTH-ERR-001..020', 'NEXO-DOM-001', 'NEXO-UX-001..025',
  'AUTH-UI-052..060', 'DELIV-PKG-001..025::<package_id>', 'READY-GATE-001..015',
  'CUTOVER-OPS-001..010', 'HYPERCARE-OPS-001..010', 'SHELL-CI-001..019',
  'E5-GATE-001..007::<package_id>', 'E5-GATE-008::<package_id>',
  'SHELL-CI-020::<package_id>', 'BLOQUE R aplicable al mismo package_id',
].join('\n');
const gateTokens = [
  'POST_E3_DESIGN_STAGES_005_016_COMPLETE',
  'E5_READINESS_PLAN_001_015_COMPLETE',
  'E5_CUTOVER_PLAN_001_010_COMPLETE',
  'E5_HYPERCARE_PLAN_001_010_COMPLETE',
  'E5_ENTRY_GATES_001_007_APPROVED',
].join('\n');

function validSources() {
  return {
    supaIndex: '`07_10_SUPA_TRANS_016.md`',
    normalizationIndex: '`DATA-NORM-DB-001` a `DATA-NORM-DB-010`',
    supa016: `### 🟡 SUPA-TRANS-016 — Gate\n**Estado:** PROPUESTA PARA APROBACIÓN\n- [ ] el usuario aprobó explícitamente \`SUPA-TRANS-016\`;\n${orderedSequence}\n${gateTokens}\nREMOTE_CATALOG_ARTIFACT`,
    gateSql: `${gateTokens}\nExpected 15 gate conditions\nExpected 12 unresolved physical-entry conditions\ndocs:plan:check`,
    data009: '- [x] el usuario aprobó explícitamente este contrato.',
    supa015: 'incidencia histórica; resuelta en la validación de cierre',
    activeSequence: JSON.stringify({
      handoff_task_id: 'SHELL-AUD-001',
      handoff_sequence_id: 'H-SHARED-AUDIT-001',
    }),
    transitionHeaders: { 'task.md': '### ✅ TASK-001\n**Estado:** APROBADA' },
  };
}

test('acepta el cierre coherente de E3', () => {
  const result = validateE3TransitionClosureSources(validSources());
  assert.equal(result.gateConditions, 15);
  assert.equal(result.handoffTask, 'SHELL-AUD-001');
});

test('acepta SUPA-TRANS-016 aprobada sin iniciar el handoff', () => {
  const sources = validSources();
  sources.supa016 = sources.supa016
    .replace('### 🟡', '### ✅')
    .replace('**Estado:** PROPUESTA PARA APROBACIÓN', '**Estado:** APROBADA')
    .replace(
      '- [ ] el usuario aprobó explícitamente `SUPA-TRANS-016`;',
      '- [x] el usuario aprobó explícitamente `SUPA-TRANS-016`;',
    );
  const result = validateE3TransitionClosureSources(sources);
  assert.equal(result.handoffTask, 'SHELL-AUD-001');
});

test('acepta activar la auditoría H después de aprobar el handoff', () => {
  const sources = validSources();
  sources.activeSequence = JSON.stringify({
    sequence_id: 'H-SHARED-AUDIT-001',
    previous_task_id: 'SUPA-TRANS-016',
    handoff_task_id: 'SHELL-PKG-001',
    handoff_sequence_id: 'H-SHARED-PACKAGES-001',
  });
  const result = validateE3TransitionClosureSources(sources);
  assert.equal(result.handoffTask, 'SHELL-AUD-001');
});

test('acepta avanzar de la auditoría H a paquetes compartidos', () => {
  const sources = validSources();
  sources.activeSequence = JSON.stringify({
    sequence_id: 'H-SHARED-PACKAGES-001',
    previous_task_id: 'SHELL-AUD-011',
    handoff_task_id: 'SHELL-CON-001',
    handoff_sequence_id: 'H-SHARED-CONTRACTS-001',
  });
  const result = validateE3TransitionClosureSources(sources);
  assert.equal(result.handoffTask, 'SHELL-AUD-001');
});

test('acepta activar el carril NEXO después de completar sus prerrequisitos E3/H', () => {
  const sources = validSources();
  sources.activeSequence = JSON.stringify({
    generated_from: 'execution-route.json',
    route_id: 'NEXO-REMISSIONS-001',
    sequence_id: 'PRIORITY-NEXO-REMISSIONS-001-STAGE-007',
    previous_task_id: 'SHELL-PKG-008',
    handoff_task_id: 'AUTH-UI-030',
  });
  const result = validateE3TransitionClosureSources(sources);
  assert.equal(result.handoffTask, 'SHELL-AUD-001');
});

test('acepta avanzar el carril después de aprobar un control virtual con guiones bajos', () => {
  const sources = validSources();
  sources.activeSequence = JSON.stringify({
    generated_from: 'execution-route.json',
    route_id: 'NEXO-REMISSIONS-001',
    sequence_id: 'PRIORITY-NEXO-REMISSIONS-001-STAGE-017',
    previous_task_id: 'NEXO-REMISSIONS-001::CONDITIONAL_IMPLEMENTATION_SCOPE',
    handoff_task_id: 'READY-GATE-001::NEXO-REMISSIONS-001',
  });
  const result = validateE3TransitionClosureSources(sources);
  assert.equal(result.handoffTask, 'SHELL-AUD-001');
});


test('acepta una prioridad documental PASS derivada de execution-route', () => {
  const sources = validSources();
  sources.activeSequence = JSON.stringify({
    generated_from: 'execution-route.json',
    route_id: 'PASS-LOYALTY-001',
    sequence_id: 'PRIORITY-PASS-LOYALTY-001-STAGE-001',
    previous_task_id: 'ORIGO-AUTH-009',
    handoff_task_id: 'PASS-INT-001',
  });
  const result = validateE3TransitionClosureSources(sources);
  assert.equal(result.handoffTask, 'SHELL-AUD-001');
});

test('acepta continuar por el flujo canónico integral sin carril prioritario', () => {
  const sources = validSources();
  sources.activeSequence = JSON.stringify({
    generated_from: 'execution-route.json',
    route_id: 'NORMAL-CANONICAL-FLOW-001',
    sequence_id: 'PHASE-04-E2-CROSS-DOMAIN-DESIGN',
    previous_task_id: 'INT-APP-010',
    handoff_task_id: 'INT-EXT-002',
  });
  const result = validateE3TransitionClosureSources(sources);
  assert.equal(result.handoffTask, 'SHELL-AUD-001');
});

test('rechaza una secuencia ajena que no demuestre avance desde E3 hacia H', () => {
  const sources = validSources();
  sources.activeSequence = JSON.stringify({
    sequence_id: 'R-UNRELATED-001',
    previous_task_id: 'OTHER-001',
    handoff_task_id: 'OTHER-002',
  });
  assert.throws(
    () => validateE3TransitionClosureSources(sources),
    /debe reservar H desde E3, haber avanzado/u,
  );
});

test('rechaza omitir readiness, cutover o hypercare', () => {
  const sources = validSources();
  sources.supa016 = sources.supa016.replace('CUTOVER-OPS-001..010', '');
  assert.throws(
    () => validateE3TransitionClosureSources(sources),
    /CUTOVER-OPS-001\.\.010/,
  );
});

test('rechaza una continuidad histórica reservada en cabecera aprobada', () => {
  const sources = validSources();
  sources.transitionHeaders['task.md'] += '\n**Tarea siguiente:** TASK-002 — RESERVADA';
  assert.throws(
    () => validateE3TransitionClosureSources(sources),
    /RESERVADA obsoleta/,
  );
});
