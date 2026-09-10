import assert from 'node:assert/strict';
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import test from 'node:test';

import {
  analyzeCommitScope,
  classifyCommitPath,
  resolveImplementationInstanceFromHeadRef,
} from './commit-scope.mjs';

test('clasifica fuentes canónicas y herramientas transversales por separado', () => {
  assert.equal(
    classifyCommitPath('docs/plan-canonico/modular/bloques/H/archivo.md'),
    'CANONICAL_TASK',
  );
  assert.equal(classifyCommitPath('scripts/docs/watch-plan-canonico.mjs'), 'TRANSVERSAL');
  assert.equal(classifyCommitPath('scripts/supabase/environment-drift.mjs'), 'TRANSVERSAL');
  assert.equal(
    classifyCommitPath('docs/plan-canonico/modular/package-selection-policy.json'),
    'TRANSVERSAL',
  );
  assert.equal(
    classifyCommitPath('docs/plan-canonico/modular/package-execution-policy.json'),
    'TRANSVERSAL',
  );
  assert.equal(
    classifyCommitPath('docs/plan-canonico/modular/implementation-materialization-map.json'),
    'TRANSVERSAL',
  );
  assert.equal(classifyCommitPath('.gitattributes'), 'TRANSVERSAL');
  assert.equal(classifyCommitPath('.editorconfig'), 'TRANSVERSAL');
  assert.equal(
    classifyCommitPath(
      'docs/plan-canonico/modular/implementation-instances/SHELL-CI-001__GLOBAL.json',
    ),
    'TRANSVERSAL',
  );
  assert.equal(classifyCommitPath('docs/plan-canonico/modular/00_CABECERA_Y_ESTADO.md'), 'PROJECTION');
  assert.equal(classifyCommitPath('src/app/page.tsx'), 'APPLICATION');
  assert.equal(classifyCommitPath('docs/VENTO_OS_GUIA_OPERATIVA_DE_COMANDOS.md'), 'OPERATIONS_DOC');
});

test('permite mapa de materializacion junto a tooling transversal', () => {
  const result = analyzeCommitScope([
    'docs/plan-canonico/modular/implementation-materialization-map.json',
    'scripts/docs/implementation-materialization.mjs',
  ]);
  assert.deepEqual(result.errors, []);
});

test('rechaza mezclar una tarea canónica con infraestructura transversal', () => {
  const result = analyzeCommitScope([
    'docs/plan-canonico/modular/bloques/H/tareas.md',
    'scripts/docs/validator.mjs',
  ]);
  assert.deepEqual(result.errors, [
    'el commit mezcla desarrollo de tarea canónica con infraestructura transversal.',
  ]);
});

test('permite derivados y fragmento propietario dentro del mismo alcance canónico', () => {
  const result = analyzeCommitScope([
    'docs/plan-canonico/modular/bloques/H/tareas.md',
    'docs/plan-canonico/modular/active-sequence.json',
    'docs/plan-canonico/modular/.generated/REGISTRO_GLOBAL_DE_TAREAS.md',
  ]);
  assert.deepEqual(result.errors, []);
});

test('permite proyecciones derivadas junto a infraestructura transversal', () => {
  const result = analyzeCommitScope([
    'scripts/docs/implementation-control.mjs',
    'docs/plan-canonico/modular/00_CABECERA_Y_ESTADO.md',
    'docs/plan-canonico/modular/.generated/REGISTRO_DE_TAREAS_PENDIENTES_CON_CONTEXTO.md',
  ]);
  assert.deepEqual(result.errors, []);
});


test('rechaza mezclar documentacion operativa con tarea canonica', () => {
  const result = analyzeCommitScope([
    'docs/plan-canonico/modular/bloques/J/tareas.md',
    'docs/VENTO_OS_GUIA_OPERATIVA_DE_COMANDOS.md',
  ]);
  assert.deepEqual(result.errors, [
    'el commit mezcla desarrollo de tarea canónica con documentación operativa.',
  ]);
});

test('rechaza mezclar documentacion operativa con infraestructura', () => {
  const result = analyzeCommitScope([
    'scripts/docs/task-branch-lifecycle.mjs',
    'docs/VENTO_OS_GUIA_OPERATIVA_DE_COMANDOS.md',
  ]);
  assert.deepEqual(result.errors, [
    'el commit mezcla infraestructura transversal con documentación operativa.',
  ]);
});

test('permite uno o varios documentos operativos en un commit aislado', () => {
  const result = analyzeCommitScope([
    'docs/VENTO_OS_GUIA_OPERATIVA_DE_COMANDOS.md',
    'docs/OTRA_GUIA.md',
  ]);
  assert.deepEqual(result.errors, []);
  assert.deepEqual(result.scopes.OPERATIONS_DOC, [
    'docs/OTRA_GUIA.md',
    'docs/VENTO_OS_GUIA_OPERATIVA_DE_COMANDOS.md',
  ]);
});

test('resuelve la instancia fisica desde la rama sin inferir carpetas de codigo', () => {
  const root = fs.mkdtempSync(path.join(os.tmpdir(), 'vento-commit-scope-instance-'));
  const directory = path.join(root, 'docs', 'plan-canonico', 'modular', 'implementation-instances');
  fs.mkdirSync(directory, { recursive: true });
  fs.writeFileSync(
    path.join(directory, 'AUTH-DB-015__GLOBAL.json'),
    JSON.stringify({ instance_id: 'AUTH-DB-015::GLOBAL', task_id: 'AUTH-DB-015' }),
    'utf8',
  );
  try {
    assert.equal(
      resolveImplementationInstanceFromHeadRef({
        root,
        headRef: 'implementation/auth-db-015/global',
      }).instance_id,
      'AUTH-DB-015::GLOBAL',
    );
    assert.throws(
      () => resolveImplementationInstanceFromHeadRef({ root, headRef: 'implementation/unknown/global' }),
      /instancia unica/u,
    );
  } finally {
    fs.rmSync(root, { recursive: true, force: true });
  }
});
