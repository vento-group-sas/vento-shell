import assert from 'node:assert/strict';
import test from 'node:test';

import {
  classifyPreflightFindings,
  parseWorktreePaths,
  terminalSafeText,
  validatorsForPath,
  validatorsForPreflight,
} from './canonical-task-preflight.mjs';


test('normaliza salida operativa de terminal a ASCII seguro', () => {
  const source = '[PLAN CAN\u00d3NICO] \u279c ACCI\u00d3N PRINCIPAL: v\u00e1lido \u2705';
  const normalized = terminalSafeText(source);
  assert.equal(normalized, '[PLAN CANONICO] -> ACCION PRINCIPAL: valido PASS');
  assert.doesNotMatch(normalized, /[^\x09\x0A\x0D\x20-\x7E]/u);
});

test('asigna validadores globales a cualquier tarea documental', () => {
  const validators = validatorsForPath('bloques/H_FUNDACION_COMPARTIDA/07_COMPONENTES_WEB_COMPARTIDOS.md');
  assert.ok(validators.includes('npm run docs:plan:check'));
  assert.ok(validators.includes('npm run docs:treq:check'));
  assert.ok(validators.includes('git diff --check'));
});

test('añade validadores proporcionales por dominio documental', () => {
  const screenValidators = validatorsForPath('bloques/I_NAVEGACION_Y_PANTALLAS/01.md');
  assert.ok(screenValidators.includes('npm run docs:block-i:check'));

  const supabaseValidators = validatorsForPath('bloques/E3_SUPABASE/06.md');
  assert.ok(supabaseValidators.includes('node scripts/docs/validate-e3-transition-closure.mjs'));

  const integrationValidators = validatorsForPath('bloques/X_INTEGRACIONES/02.md');
  assert.ok(integrationValidators.includes('npm run docs:int-app:check'));
  assert.ok(integrationValidators.includes('npm run docs:int-ext:check'));
});

test('carril físico usa exclusivamente validation_commands de la instancia', () => {
  const validationCommands = [
    'npm test -- --runInBand',
    'npm run typecheck',
  ];
  const validators = validatorsForPreflight({
    relativePath: 'bloques/T_CALIDAD_Y_DESPLIEGUE/01_PAQUETES_RELEASES_Y_COMPATIBILIDAD.md',
    requestedInstance: {
      instance_id: 'SHELL-CI-019::GLOBAL',
      task_id: 'SHELL-CI-019',
      status: 'IN_PROGRESS',
      validation_commands: validationCommands,
    },
  });

  assert.deepEqual(validators, validationCommands);
  assert.equal(validators.includes('npm run docs:plan:build'), false);
  assert.equal(validators.includes('npm run docs:plan:check'), false);
  assert.equal(validators.includes('npm run docs:treq:check'), false);
});

test('extrae rutas modificadas de git status porcelain', () => {
  assert.deepEqual(
    parseWorktreePaths([
      ' M docs/plan-canonico/modular/implementation-instances/SHELL-CI-005__GLOBAL.json',
      '?? scripts/quality/new-file.mjs',
      'R  old.txt -> new.txt',
    ].join('\n')),
    [
      'docs/plan-canonico/modular/implementation-instances/SHELL-CI-005__GLOBAL.json',
      'new.txt',
      'scripts/quality/new-file.mjs',
    ],
  );
});

test('carril físico IN_PROGRESS acepta continuidad documental adelantada y cambio exclusivo del registro', () => {
  const result = classifyPreflightFindings({
    requestedTaskId: 'SHELL-CI-005',
    currentTaskId: 'SHELL-CI-006',
    requestedInstance: {
      instance_id: 'SHELL-CI-005::GLOBAL',
      task_id: 'SHELL-CI-005',
      status: 'IN_PROGRESS',
    },
    worktreePaths: [
      'docs/plan-canonico/modular/implementation-instances/SHELL-CI-005__GLOBAL.json',
    ],
    behind: 0,
    ahead: 0,
    activeSequenceCurrent: true,
    formatState: 'OK',
    contractErrors: [],
  });

  assert.deepEqual(result.blockers, []);
  assert.equal(result.advisories.length, 2);
  assert.match(result.advisories[0], /carril físico/u);
  assert.match(result.advisories[1], /únicamente cambios esperados del carril físico/u);
});

test('bloquea derivados documentales sucios antes de aplicar código físico', () => {
  const result = classifyPreflightFindings({
    requestedTaskId: 'SHELL-CI-005',
    currentTaskId: 'SHELL-CI-006',
    requestedInstance: {
      instance_id: 'SHELL-CI-005::GLOBAL',
      task_id: 'SHELL-CI-005',
      status: 'IN_PROGRESS',
    },
    worktreePaths: [
      'docs/plan-canonico/modular/00_CABECERA_Y_ESTADO.md',
      'docs/plan-canonico/modular/.generated/REGISTRO_DE_TAREAS_PENDIENTES_CON_CONTEXTO.md',
      'docs/plan-canonico/modular/implementation-instances/SHELL-CI-005__GLOBAL.json',
    ],
  });

  assert.equal(result.blockers.length, 1);
  assert.match(result.blockers[0], /fuera del carril físico esperado/u);
  assert.match(result.blockers[0], /00_CABECERA_Y_ESTADO\.md/u);
  assert.match(result.blockers[0], /REGISTRO_DE_TAREAS_PENDIENTES_CON_CONTEXTO\.md/u);
});

test('bloquea cambios locales ajenos al registro antes de aplicar código', () => {
  const result = classifyPreflightFindings({
    requestedTaskId: 'SHELL-CI-005',
    currentTaskId: 'SHELL-CI-006',
    requestedInstance: {
      instance_id: 'SHELL-CI-005::GLOBAL',
      task_id: 'SHELL-CI-005',
      status: 'IN_PROGRESS',
    },
    worktreePaths: [
      'docs/plan-canonico/modular/implementation-instances/SHELL-CI-005__GLOBAL.json',
      'scripts/quality/unrelated.mjs',
    ],
  });

  assert.equal(result.blockers.length, 1);
  assert.match(result.blockers[0], /fuera del carril físico esperado/u);
  assert.match(result.blockers[0], /scripts\/quality\/unrelated\.mjs/u);
});

test('bloquea preflight físico si la instancia no está IN_PROGRESS', () => {
  const result = classifyPreflightFindings({
    requestedTaskId: 'SHELL-CI-005',
    currentTaskId: 'SHELL-CI-006',
    requestedInstance: {
      instance_id: 'SHELL-CI-005::GLOBAL',
      task_id: 'SHELL-CI-005',
      status: 'AUTHORIZED',
    },
  });

  assert.ok(result.blockers.some((entry) => /debe estar IN_PROGRESS/u.test(entry)));
});

test('behind, formato, active-sequence y contrato inválido siguen siendo bloqueos reales', () => {
  const result = classifyPreflightFindings({
    requestedTaskId: 'SHELL-CI-005',
    currentTaskId: 'SHELL-CI-006',
    requestedInstance: {
      instance_id: 'SHELL-CI-005::GLOBAL',
      task_id: 'SHELL-CI-005',
      status: 'IN_PROGRESS',
    },
    behind: 2,
    activeSequenceCurrent: false,
    formatState: 'NEEDS_FORMAT',
    contractErrors: ['CONTRACT_ERROR'],
  });

  assert.ok(result.blockers.some((entry) => /2 commit/u.test(entry)));
  assert.ok(result.blockers.some((entry) => /active-sequence/u.test(entry)));
  assert.ok(result.blockers.some((entry) => /formato de tarea/u.test(entry)));
  assert.ok(result.blockers.some((entry) => /contrato de entrega inválido/u.test(entry)));
});

test('borrador documental vacío trata NEEDS_FORMAT como advisory y permite start', () => {
  const result = classifyPreflightFindings({
    requestedTaskId: 'SHELL-APP-021',
    currentTaskId: 'SHELL-APP-021',
    taskStructure: 'EMPTY_DRAFT',
    formatState: 'NEEDS_FORMAT',
  });

  assert.deepEqual(result.blockers, []);
  assert.ok(
    result.advisories.some((entry) => /EMPTY_DRAFT/u.test(entry)),
  );
});

test('tarea desarrollada conserva NEEDS_FORMAT como bloqueo real', () => {
  const result = classifyPreflightFindings({
    requestedTaskId: 'SHELL-APP-021',
    currentTaskId: 'SHELL-APP-021',
    taskStructure: 'DEVELOPED',
    formatState: 'NEEDS_FORMAT',
  });

  assert.equal(result.blockers.length, 1);
  assert.match(
    result.blockers[0],
    /formato de tarea: NEEDS_FORMAT/u,
  );
});

test('ahead durante una instancia física es aviso y no bloqueo', () => {
  const result = classifyPreflightFindings({
    requestedTaskId: 'SHELL-CI-005',
    currentTaskId: 'SHELL-CI-006',
    requestedInstance: {
      instance_id: 'SHELL-CI-005::GLOBAL',
      task_id: 'SHELL-CI-005',
      status: 'IN_PROGRESS',
    },
    ahead: 1,
  });

  assert.deepEqual(result.blockers, []);
  assert.ok(result.advisories.some((entry) => /1 commit/u.test(entry)));
});