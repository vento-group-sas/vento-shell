import assert from 'node:assert/strict';
import test from 'node:test';

import {
  automaticTaskIds,
  isTaskCoveredByPresentationPolicy,
  renderSemanticWarningsReport,
  shouldPreserveUnapprovedTask,
  summarizeSemanticWarnings,
} from './auto-prepare-canonical-task.mjs';

test('prepara únicamente la última aprobada y la tarea actual', () => {
  assert.deepEqual(
    automaticTaskIds({
      continuity: {
        previous: 'SHELL-UI-007',
        current: 'SHELL-UI-008',
        next: 'SHELL-UI-009',
      },
    }),
    ['SHELL-UI-007', 'SHELL-UI-008'],
  );
});

test('no duplica una tarea terminal', () => {
  assert.deepEqual(
    automaticTaskIds({ continuity: { previous: 'FINAL-001', current: 'FINAL-001' } }),
    ['FINAL-001'],
  );
});

test('incluye tareas normalizables aunque la continuidad ya haya saltado de etapa', () => {
  const ids = automaticTaskIds({
    continuity: { previous: 'AUTH-UI-039', current: 'SHELL-CI-001' },
  }, ['SHELL-CTX-006']);
  assert.deepEqual(ids, ['AUTH-UI-039', 'SHELL-CI-001', 'SHELL-CTX-006']);
});

test('preserva tareas no aprobadas antes de su propio lifecycle', () => {
  assert.equal(shouldPreserveUnapprovedTask({ task: { state: 'NO INICIADA' } }), true);
  assert.equal(shouldPreserveUnapprovedTask({ task: { state: 'PROPUESTA PARA APROBACIÓN' } }), true);
  assert.equal(shouldPreserveUnapprovedTask({ task: { state: 'APROBADA' } }), false);
});

test('preserva tareas anteriores y aplica el formato desde la frontera incluida', () => {
  assert.equal(isTaskCoveredByPresentationPolicy(8, 9), false);
  assert.equal(isTaskCoveredByPresentationPolicy(9, 9), true);
  assert.equal(isTaskCoveredByPresentationPolicy(10, 9), true);
});

test('resume advertencias por tarea y conserva el detalle en un reporte', () => {
  const warnings = [
    { taskId: 'TEST-WARN-001', code: 'HEADER_FIELD_MISSING', message: 'falta cabecera.' },
    { taskId: 'TEST-WARN-001', code: 'SECTION_MISSING', message: 'falta sección.' },
    { taskId: 'TEST-WARN-002', code: 'EMPTY_DRAFT', message: 'borrador vacío.' },
  ];
  assert.equal(summarizeSemanticWarnings(warnings), 'TEST-WARN-001 (2), TEST-WARN-002 (1)');
  const report = renderSemanticWarningsReport(warnings);
  assert.match(report, /\*\*Total:\*\* 3/u);
  assert.match(report, /## TEST-WARN-001/u);
  assert.match(report, /\| SECTION_MISSING \| falta sección\. \|/u);
  assert.match(report, /## TEST-WARN-002/u);
});
