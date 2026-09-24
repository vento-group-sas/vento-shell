import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const E3_RELATIVE = 'docs/plan-canonico/modular/bloques/E3_SUPABASE';

function fail(message) {
  throw new Error(message);
}

function requireText(source, token, label) {
  if (!source.includes(token)) fail(`${label}: falta ${token}.`);
}

function requireOrdered(source, tokens, label) {
  let cursor = -1;
  for (const token of tokens) {
    const next = source.indexOf(token, cursor + 1);
    if (next < 0) fail(`${label}: falta ${token}.`);
    if (next <= cursor) fail(`${label}: ${token} está fuera de orden.`);
    cursor = next;
  }
}

export function validateE3TransitionClosureSources({
  supaIndex,
  normalizationIndex,
  supa016,
  gateSql,
  data009,
  supa015,
  activeSequence,
  transitionHeaders,
}) {
  const isProposal = /^### 🟡 SUPA-TRANS-016 — /mu.test(supa016);
  const isApproved = /^### ✅ SUPA-TRANS-016 — /mu.test(supa016);
  if (!isProposal && !isApproved) {
    fail('SUPA-TRANS-016 debe estar en propuesta o aprobada con marcador canónico.');
  }
  requireText(
    supa016,
    isApproved ? '**Estado:** APROBADA' : '**Estado:** PROPUESTA PARA APROBACIÓN',
    'SUPA-TRANS-016',
  );
  requireText(
    supa016,
    isApproved
      ? '- [x] el usuario aprobó explícitamente `SUPA-TRANS-016`;'
      : '- [ ] el usuario aprobó explícitamente `SUPA-TRANS-016`;',
    'aprobación explícita de SUPA-TRANS-016',
  );
  requireText(supaIndex, '`07_10_SUPA_TRANS_016.md`', 'índice SUPA-TRANS');
  requireText(normalizationIndex, '`DATA-NORM-DB-001` a `DATA-NORM-DB-010`', 'índice DATA-NORM-TRANS');
  requireText(data009, '- [x] el usuario aprobó explícitamente este contrato.', 'DATA-NORM-TRANS-009');
  requireText(supa015, 'incidencia histórica; resuelta en la validación de cierre', 'SUPA-TRANS-015');

  const active = JSON.parse(activeSequence);
  const e3StillActive = active.handoff_task_id === 'SHELL-AUD-001'
    && active.handoff_sequence_id === 'H-SHARED-AUDIT-001';
  const hSequenceActive = typeof active.sequence_id === 'string'
    && active.sequence_id.startsWith('H-SHARED-')
    && (
      active.previous_task_id === 'SUPA-TRANS-016'
      || /^SHELL-[A-Z]+-\d{3}$/u.test(active.previous_task_id ?? '')
    );
  const priorityLaneActive = active.generated_from === 'execution-route.json'
    && active.route_id !== 'NORMAL-CANONICAL-FLOW-001'
    && /^[A-Z][A-Z0-9-]+-001$/u.test(active.route_id ?? '')
    && /^PRIORITY-[A-Z0-9-]+-STAGE-\d{3}$/u.test(active.sequence_id ?? '')
    && /^[A-Z][A-Z0-9]*(?:-[A-Z0-9]+)+-\d{3}(?:::[A-Z0-9_-]+)?$/u.test(
      active.previous_task_id ?? '',
    );
  const normalCanonicalFlowActive = active.generated_from === 'execution-route.json'
    && active.route_id === 'NORMAL-CANONICAL-FLOW-001'
    && /^PHASE-\d{2}-[A-Z0-9-]+$/u.test(active.sequence_id ?? '')
    && /^[A-Z][A-Z0-9]*(?:-[A-Z0-9]+)+-\d{3}$/u.test(active.previous_task_id ?? '');
  if (!e3StillActive && !hSequenceActive && !priorityLaneActive && !normalCanonicalFlowActive) {
    fail('active-sequence.json debe reservar H desde E3, haber avanzado por H-SHARED-*, proyectar el flujo canónico integral o proyectar un carril prioritario aprobado sin invalidar el cierre E3/H.');
  }

  requireOrdered(supa016, [
    'SHELL-AUD-001..011',
    'SHELL-PKG-001..008',
    'TSVC-CAT-001..010',
    'AUTH-UI-030..039',
    'AUTH-DEV-001..006',
    'AUTH-SIM-001..006',
    'AUTH-ERR-001..020',
    'NEXO-DOM-001',
    'NEXO-UX-001..025',
    'AUTH-UI-052..060',
    'DELIV-PKG-001..025::<package_id>',
    'READY-GATE-001..015',
    'CUTOVER-OPS-001..010',
    'HYPERCARE-OPS-001..010',
    'SHELL-CI-001..019',
    'E5-GATE-001..007::<package_id>',
    'E5-GATE-008::<package_id>',
    'SHELL-CI-020::<package_id>',
    'BLOQUE R aplicable al mismo package_id',
  ], 'secuencia obligatoria de SUPA-TRANS-016');

  for (const token of [
    'POST_E3_DESIGN_STAGES_005_016_COMPLETE',
    'E5_READINESS_PLAN_001_015_COMPLETE',
    'E5_CUTOVER_PLAN_001_010_COMPLETE',
    'E5_HYPERCARE_PLAN_001_010_COMPLETE',
    'E5_ENTRY_GATES_001_007_APPROVED',
  ]) {
    requireText(supa016, token, 'gate documental SUPA-TRANS-016');
    requireText(gateSql, token, 'gate SQL SUPA-TRANS-016');
  }
  requireText(gateSql, 'Expected 15 gate conditions', 'gate SQL SUPA-TRANS-016');
  requireText(gateSql, 'Expected 12 unresolved physical-entry conditions', 'gate SQL SUPA-TRANS-016');
  requireText(gateSql, 'docs:plan:check', 'frontera de evidencia del gate SQL');
  requireText(supa016, 'REMOTE_CATALOG_ARTIFACT', 'reproducibilidad de SUPA-TRANS-001/002');

  for (const [name, header] of Object.entries(transitionHeaders)) {
    if (/RESERVADA/u.test(header)) {
      fail(`${name}: conserva una continuidad RESERVADA obsoleta en su cabecera.`);
    }
  }

  return {
    predecessorTasks: 24,
    gateConditions: 15,
    unresolvedPhysicalConditions: 12,
    handoffTask: e3StillActive ? active.handoff_task_id : 'SHELL-AUD-001',
  };
}

export function validateE3TransitionClosure({ root = process.cwd() } = {}) {
  const e3 = path.join(root, E3_RELATIVE);
  const read = (name) => fs.readFileSync(path.join(e3, name), 'utf8');
  const transitionFiles = fs.readdirSync(e3)
    .filter((name) => /^(?:06_\d{2}_SUPA_TRANS|07_\d{2}_(?:DATA_NORM_TRANS|SUPA_TRANS))_\d{3}\.md$/u.test(name));
  const transitionHeaders = Object.fromEntries(
    transitionFiles.map((name) => [name, read(name).split(/\r?\n/u).slice(0, 16).join('\n')]),
  );

  return validateE3TransitionClosureSources({
    supaIndex: read('06_PLAN_DE_TRANSICION.md'),
    normalizationIndex: read('07_TRANSICION_DE_NORMALIZACION_Y_CALIDAD_DE_DATOS.md'),
    supa016: read('07_10_SUPA_TRANS_016.md'),
    gateSql: read('SUPA-TRANS-016_BLOCK_R_ENTRY_GATE.sql'),
    data009: read('07_09_DATA_NORM_TRANS_009.md'),
    supa015: read('06_15_SUPA_TRANS_015.md'),
    activeSequence: fs.readFileSync(
      path.join(root, 'docs/plan-canonico/modular/active-sequence.json'),
      'utf8',
    ),
    transitionHeaders,
  });
}

if (process.argv[1] && path.resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  const stats = validateE3TransitionClosure();
  console.log(
    `OK: cierre E3; ${stats.predecessorTasks} predecesores; ${stats.gateConditions} condiciones; `
    + `${stats.unresolvedPhysicalConditions} bloqueos físicos; handoff ${stats.handoffTask}.`,
  );
}
