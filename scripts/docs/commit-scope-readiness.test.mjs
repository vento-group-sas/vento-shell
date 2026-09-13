import assert from 'node:assert/strict';
import fs from 'node:fs';
import test from 'node:test';

import {
  analyzeReadinessCommitScope,
  CORRECTION_SCOPE_NATIVE_MARKER,
  PACKAGE_REGISTRY_PATH,
  resolveReadinessScopeMode,
} from './commit-scope-readiness.mjs';

function baseAnalyze(paths) {
  const canonical = paths.filter((entry) => entry.startsWith('docs/plan-canonico/modular/'));
  const transversal = paths.filter((entry) => entry.startsWith('scripts/docs/'));
  const errors = canonical.length && transversal.length
    ? ['el commit mezcla desarrollo de tarea canónica con infraestructura transversal.']
    : [];
  const scopes = {};
  if (canonical.length) scopes.CANONICAL_TASK = canonical;
  if (transversal.length) scopes.TRANSVERSAL = transversal;
  return { files: [...paths], scopes, errors, warnings: [] };
}

test('el registry persistente puede acompañar el cierre de una tarea como PROJECTION', () => {
  const report = analyzeReadinessCommitScope([
    'docs/plan-canonico/modular/bloques/X/fixture.md',
    PACKAGE_REGISTRY_PATH,
  ], baseAnalyze);
  assert.deepEqual(report.errors, []);
  assert.deepEqual(report.scopes.PROJECTION, [PACKAGE_REGISTRY_PATH]);
  assert.deepEqual(report.scopes.CANONICAL_TASK, ['docs/plan-canonico/modular/bloques/X/fixture.md']);
  assert.equal(report.scopes.TRANSVERSAL, undefined);
});

test('otros scripts/docs siguen siendo TRANSVERSAL y mantienen el bloqueo de mezcla', () => {
  const report = analyzeReadinessCommitScope([
    'docs/plan-canonico/modular/bloques/X/fixture.md',
    'scripts/docs/package-readiness-scanner.mjs',
  ], baseAnalyze);
  assert.equal(report.errors.length, 1);
  assert.ok(report.scopes.TRANSVERSAL.includes('scripts/docs/package-readiness-scanner.mjs'));
});

test('dispatcher conserva carriles fisico, correccion y generico mutuamente excluyentes', () => {
  assert.equal(resolveReadinessScopeMode(), 'GENERIC');
  assert.equal(resolveReadinessScopeMode({ physical: true }), 'PHYSICAL');
  assert.equal(resolveReadinessScopeMode({ correctionHeadRef: 'correction/task-001/corr-001' }), 'CORRECTION');
  assert.throws(
    () => resolveReadinessScopeMode({ physical: true, correctionHeadRef: 'correction/task-001/corr-001' }),
    /mutuamente excluyentes/u,
  );
  assert.equal(CORRECTION_SCOPE_NATIVE_MARKER, 'CORRECTION_NATIVE_SCOPE_V1');
});

test('workflow canónico enruta correction PR al gate semantico y no reinterpreta merges ya validados', () => {
  const workflow = fs.readFileSync('.github/workflows/validate-canonical-plan.yml', 'utf8');
  assert.match(workflow, /correction_pr=false/u);
  assert.match(workflow, /correction\/\* \|\| "\$\{HEAD_REF:-\}" == correction-register\/\*/u);
  assert.match(workflow, /--correction-head-ref "\$HEAD_REF"/u);
  assert.match(workflow, /steps\.scope\.outputs\.correction_pr != 'true'/u);
  assert.match(workflow, /only_merge_commits=true/u);
  assert.match(workflow, /aislamiento por commit ya fue validado en el PR/u);
});
