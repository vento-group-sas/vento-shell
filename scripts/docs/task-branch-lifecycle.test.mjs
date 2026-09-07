import assert from 'node:assert/strict';
import fs from 'node:fs';
import test from 'node:test';

import {
  activeSequenceTaskIds,
  buildInfraPrBody,
  buildOpsPrBody,
  buildPrBody,
  classifyInfraPath,
  classifyOpsPath,
  classifyPrChecksCompletionProbe,
  classifyPrChecksProbe,
  classifyTaskFinishContinuity,
  classifyTaskPath,
  infraBranchName,
  isTransientPrChecksFailure,
  opsBranchName,
  parsePorcelainPaths,
  parseTaskTreqDeclaration,
  resolveCanonicalOwnerRelativePath,
  resolveNpmInvocation,
  taskBranchName,
  validateOperationalGuideResilience,
} from './task-branch-lifecycle.mjs';

test('normaliza una tarea canonica a task/<id-en-minusculas>', () => {
  assert.equal(taskBranchName('AUTH-SRV-001'), 'task/auth-srv-001');
  assert.equal(taskBranchName('shell-ci-024'), 'task/shell-ci-024');
});

test('rechaza identificadores que no parecen task IDs canonicos', () => {
  assert.throws(() => taskBranchName('mi-rama'), /TASK_ID invalido/u);
  assert.throws(() => taskBranchName('../main'), /TASK_ID invalido/u);
});

test('expande la proyeccion activa desde task_ids o segmentos', () => {
  assert.deepEqual(
    activeSequenceTaskIds({
      task_ids: ['ANIMA-AUTH-001', 'ANIMA-AUTH-002'],
    }),
    ['ANIMA-AUTH-001', 'ANIMA-AUTH-002'],
  );
  assert.deepEqual(
    activeSequenceTaskIds({
      segments: [{ prefix: 'INT-DB', from: 8, to: 8 }],
    }),
    ['INT-DB-008'],
  );
});

test('finish conserva el cierre estandar cuando previous coincide con la tarea', () => {
  assert.deepEqual(
    classifyTaskFinishContinuity({
      taskId: 'INT-DB-007',
      taskState: 'APROBADA',
      continuityPrevious: 'INT-DB-007',
      continuityCurrent: 'INT-DB-008',
      activeSequenceCurrent: true,
      baseActiveSequence: {
        segments: [{ prefix: 'INT-DB', from: 7, to: 8 }],
        handoff_task_id: 'ANIMA-AUTH-001',
      },
    }),
    { allowed: true, mode: 'STANDARD' },
  );
});

test('finish admite cierre terminal solo contra el handoff declarado por main', () => {
  const baseActiveSequence = {
    segments: [{ prefix: 'INT-DB', from: 8, to: 8 }],
    handoff_task_id: 'ANIMA-AUTH-001',
  };

  assert.deepEqual(
    classifyTaskFinishContinuity({
      taskId: 'INT-DB-008',
      taskState: 'APROBADA',
      continuityPrevious: 'AUTH-ERR-020',
      continuityCurrent: 'ANIMA-AUTH-001',
      activeSequenceCurrent: true,
      baseActiveSequence,
    }),
    { allowed: true, mode: 'TERMINAL_STAGE_TRANSITION' },
  );

  assert.deepEqual(
    classifyTaskFinishContinuity({
      taskId: 'INT-DB-008',
      taskState: 'APROBADA',
      continuityPrevious: 'AUTH-ERR-020',
      continuityCurrent: 'ANIMA-AUTH-002',
      activeSequenceCurrent: true,
      baseActiveSequence,
    }),
    { allowed: false, mode: 'CONTINUITY_MISMATCH' },
  );

  assert.deepEqual(
    classifyTaskFinishContinuity({
      taskId: 'INT-DB-008',
      taskState: 'APROBADA',
      continuityPrevious: 'AUTH-ERR-020',
      continuityCurrent: 'ANIMA-AUTH-001',
      activeSequenceCurrent: true,
      baseActiveSequence: {
        segments: [{ prefix: 'INT-DB', from: 7, to: 7 }],
        handoff_task_id: 'ANIMA-AUTH-001',
      },
    }),
    { allowed: false, mode: 'CONTINUITY_MISMATCH' },
  );

  assert.deepEqual(
    classifyTaskFinishContinuity({
      taskId: 'INT-DB-008',
      taskState: 'APROBADA',
      continuityPrevious: 'AUTH-ERR-020',
      continuityCurrent: 'ANIMA-AUTH-001',
      activeSequenceCurrent: false,
      baseActiveSequence,
    }),
    { allowed: false, mode: 'CONTINUITY_MISMATCH' },
  );
});

test('parsea git status sin perder rutas renombradas', () => {
  const source = [
    ' M docs/plan-canonico/modular/active-sequence.json',
    '?? scripts/docs/task-branch-lifecycle.mjs',
    'R  old.txt -> docs/plan-canonico/modular/new.md',
  ].join('\n');
  assert.deepEqual(parsePorcelainPaths(source), [
    'docs/plan-canonico/modular/active-sequence.json',
    'docs/plan-canonico/modular/new.md',
    'scripts/docs/task-branch-lifecycle.mjs',
  ]);
});

test('solo automatiza rutas gobernadas y bloquea archivos ajenos', () => {
  assert.equal(classifyTaskPath('docs/plan-canonico/modular/active-sequence.json'), 'ALLOWED');
  assert.equal(classifyTaskPath('scripts/docs/task-branch-lifecycle.mjs'), 'ALLOWED');
  assert.equal(classifyTaskPath('src/app/page.tsx'), 'ALLOWED');
  assert.equal(classifyTaskPath('.env.local'), 'OTHER');
  assert.equal(classifyTaskPath('notas-personales.txt'), 'OTHER');
});


test('cambio transversal usa infra/<change-id> y bloquea archivos canonicos de tarea', () => {
  assert.equal(
    infraBranchName('task-lifecycle-finish-verification'),
    'infra/task-lifecycle-finish-verification',
  );
  assert.throws(() => infraBranchName('../main'), /CHANGE_ID invalido/u);
  assert.equal(
    classifyInfraPath(
      'docs/plan-canonico/modular/implementation-instances/AUTH-DB-036__GLOBAL.json',
    ),
    'ALLOWED',
  );

  assert.equal(classifyInfraPath('scripts/docs/task-branch-lifecycle.mjs'), 'ALLOWED');
  assert.equal(classifyInfraPath('scripts/quality/lint-ratchet.mjs'), 'ALLOWED');
  assert.equal(classifyInfraPath('scripts/supabase/environment-drift.mjs'), 'ALLOWED');
  assert.equal(classifyInfraPath('.github/workflows/vento-required-gate.yml'), 'ALLOWED');
  assert.equal(classifyInfraPath('package.json'), 'ALLOWED');
  assert.equal(classifyInfraPath('.gitattributes'), 'ALLOWED');
  assert.equal(classifyInfraPath('.editorconfig'), 'ALLOWED');
  assert.equal(classifyInfraPath('packages/contracts/README.md'), 'ALLOWED');
  assert.equal(classifyInfraPath('packages/contracts/authorization/README.md'), 'ALLOWED');
  assert.equal(
    classifyInfraPath('docs/plan-canonico/modular/chatgpt-work-starter-template.txt'),
    'ALLOWED',
  );
  assert.equal(classifyInfraPath('docs/plan-canonico/modular/00_CABECERA_Y_ESTADO.md'), 'ALLOWED');
  assert.equal(classifyInfraPath('docs/plan-canonico/modular/active-sequence.json'), 'ALLOWED');
  assert.equal(
    classifyInfraPath('docs/plan-canonico/modular/.generated/REGISTRO_GLOBAL_DE_TAREAS.md'),
    'ALLOWED',
  );
  assert.equal(
    classifyInfraPath('docs/plan-canonico/modular/.generated/REGISTRO_DE_TAREAS_PENDIENTES_CON_CONTEXTO.md'),
    'ALLOWED',
  );
  assert.equal(classifyInfraPath('packages/contracts/package.json'), 'OTHER');
  assert.equal(
    classifyInfraPath('docs/plan-canonico/modular/bloques/J_ACCIONES_DE_SERVIDOR/01_INVENTARIO_DE_SUPERFICIES_DE_SERVIDOR.md'),
    'OTHER',
  );
  assert.equal(classifyInfraPath('src/app/page.tsx'), 'OTHER');
});

test('package-gate policy, protocol e instances son infraestructura transversal publicable', () => {
  assert.equal(classifyInfraPath('docs/plan-canonico/modular/01_PROTOCOLO.md'), 'ALLOWED');
  assert.equal(classifyInfraPath('docs/plan-canonico/modular/package-gate-policy.json'), 'ALLOWED');
  assert.equal(classifyInfraPath('docs/plan-canonico/modular/package-gate-instances/GAP-PKG-061.json'), 'ALLOWED');
});

test('PR transversal declara TREQ NONE y enumera solo infraestructura permitida', () => {
  const body = buildInfraPrBody('task-lifecycle-finish-verification', [
    'scripts/docs/task-branch-lifecycle.mjs',
    'package.json',
  ]);
  assert.match(body, /^VENTO-TREQ-AFFECTED: NONE$/mu);
  assert.match(body, /task-lifecycle-finish-verification/u);
  assert.match(body, /- package\.json/u);
  assert.match(body, /- scripts\/docs\/task-branch-lifecycle\.mjs/u);
  assert.throws(
    () => buildInfraPrBody('bad-scope', ['src/app/page.tsx']),
    /solo admite infraestructura transversal/u,
  );
});


test('guia operativa de lifecycle conserva invariantes de resiliencia', () => {
  const valid = [
    'RESILIENCIA DEL LIFECYCLE Y GATES',
    'authorized_changes',
    'docs:implementation:finish',
    'docs:plan:local-sync',
    'github.event.before',
    'resolveNpmInvocation',
    'HTTP 499',
    'CRLF',
    'force-push',
    'recovery ad hoc',
    'docs:delivery-exec:check',
    'stdin-commonjs',
    'Illegal return statement',
    'IMPLEMENTATION_PROTOCOL',
    'plantilla compartida contiene solo reglas comunes',
    'LC-015',
    'test contractual propietario',
    'diagnostico exacto',
    'LC-016',
    'ranura estructural de trabajo',
    'token reservado',
  ].join('\n');
  assert.equal(validateOperationalGuideResilience(valid), true);
  assert.throws(() => validateOperationalGuideResilience(valid.replace('authorized_changes', 'scope')), /perdio invariantes/u);
  assert.throws(() => validateOperationalGuideResilience(`${valid}\ndocs:plan:sync-local`), /nombre inexistente/u);
});

test('documentacion operativa usa ops/<change-id> y solo admite Markdown directo en docs', () => {
  assert.equal(opsBranchName('guia-operativa-comandos'), 'ops/guia-operativa-comandos');
  assert.throws(() => opsBranchName('../main'), /CHANGE_ID invalido/u);

  assert.equal(classifyOpsPath('docs/VENTO_OS_GUIA_OPERATIVA_DE_COMANDOS.md'), 'ALLOWED');
  assert.equal(classifyOpsPath('docs/OTRA_GUIA.md'), 'ALLOWED');
  assert.equal(classifyOpsPath('docs/plan-canonico/modular/01_PROTOCOLO.md'), 'OTHER');
  assert.equal(classifyOpsPath('docs/guias/otra.md'), 'OTHER');
  assert.equal(classifyOpsPath('scripts/docs/task-branch-lifecycle.mjs'), 'OTHER');
  assert.equal(classifyOpsPath('src/app/page.tsx'), 'OTHER');
  assert.equal(classifyInfraPath('docs/VENTO_OS_GUIA_OPERATIVA_DE_COMANDOS.md'), 'OTHER');
});

test('PR de documentacion operativa declara TREQ NONE y rechaza otros alcances', () => {
  const body = buildOpsPrBody('guia-operativa-comandos', [
    'docs/VENTO_OS_GUIA_OPERATIVA_DE_COMANDOS.md',
  ]);
  assert.match(body, /^VENTO-TREQ-AFFECTED: NONE$/mu);
  assert.match(body, /guia-operativa-comandos/u);
  assert.match(body, /- docs\/VENTO_OS_GUIA_OPERATIVA_DE_COMANDOS\.md/u);
  assert.throws(
    () => buildOpsPrBody('bad-scope', ['docs/plan-canonico/modular/01_PROTOCOLO.md']),
    /solo admite Markdown operativo/u,
  );
});

test('deriva NONE cuando la tarea declara cero TREQ', () => {
  const source = `### ✅ AUTH-SRV-001 — Inventariar Server Actions\n\n**Requisitos de prueba creados o modificados:** 0\n\n#### 1. Requisitos de prueba derivados\n\n**Resultado:** NO GENERA REQUISITOS DE PRUEBA\n\n#### 2. Continuidad\n\nTexto\n\n### [ ] AUTH-SRV-002 — Siguiente\n`;
  const declaration = parseTaskTreqDeclaration(source, 'AUTH-SRV-001');
  assert.deepEqual(declaration, { declaredCount: 0, ids: [] });
  const body = buildPrBody('AUTH-SRV-001', declaration);
  assert.match(body, /^VENTO-TREQ-AFFECTED: NONE$/mu);
  assert.match(body, /^VENTO-TREQ-ZERO-REASON: .{20,}$/mu);
});

test('deriva IDs TREQ exactos cuando la tarea declara cambios', () => {
  const source = `### ✅ TASK-001 — Ejemplo\n\n**Requisitos de prueba creados o modificados:** 2\n\n#### 1. Requisitos de prueba derivados\n\n- TREQ-AAA-001\n- TREQ-BBB-002\n\n#### 2. Continuidad\n\nTexto\n`;
  const declaration = parseTaskTreqDeclaration(source, 'TASK-001');
  assert.deepEqual(declaration, {
    declaredCount: 2,
    ids: ['TREQ-AAA-001', 'TREQ-BBB-002'],
  });
  assert.match(buildPrBody('TASK-001', declaration), /^VENTO-TREQ-AFFECTED: TREQ-AAA-001,TREQ-BBB-002$/mu);
});

test('falla cerrado si metadata TREQ y seccion derivada contradicen', () => {
  const source = `### ✅ TASK-001 — Ejemplo\n\n**Requisitos de prueba creados o modificados:** 0\n\n#### 1. Requisitos de prueba derivados\n\n- TREQ-AAA-001\n`;
  assert.throws(
    () => parseTaskTreqDeclaration(source, 'TASK-001'),
    /declara 0 TREQ/u,
  );
});

test('distingue checks aun no registrados de errores reales de gh', () => {
  assert.equal(
    isTransientPrChecksFailure({
      status: 1,
      stdout: '',
      stderr: 'HTTP 499: 499 (https://api.github.com/graphql)',
    }),
    true,
  );
  assert.equal(
    isTransientPrChecksFailure({
      status: 1,
      stdout: '',
      stderr: 'HTTP 403: Resource not accessible',
    }),
    false,
  );
  assert.deepEqual(
    classifyPrChecksProbe({
      status: 1,
      stdout: '',
      stderr: 'HTTP 499: 499 (https://api.github.com/graphql)',
    }),
    {
      state: 'RETRY',
      count: 0,
      detail: 'HTTP 499: 499 (https://api.github.com/graphql)',
    },
  );

  assert.deepEqual(
    classifyPrChecksProbe({
      status: 1,
      stdout: '',
      stderr: "no checks reported on the 'task/auth-srv-002' branch",
    }),
    {
      state: 'WAIT',
      count: 0,
      detail: "no checks reported on the 'task/auth-srv-002' branch",
    },
  );

  assert.deepEqual(
    classifyPrChecksProbe({
      status: 0,
      stdout: '[]',
      stderr: '',
    }),
    { state: 'WAIT', count: 0, detail: '' },
  );

  assert.deepEqual(
    classifyPrChecksProbe({
      status: 8,
      stdout: '[{"name":"VENTO Required Gate","state":"IN_PROGRESS","bucket":"pending","link":"https://example.invalid"}]',
      stderr: '',
    }),
    { state: 'REGISTERED', count: 1, detail: '' },
  );

  assert.deepEqual(
    classifyPrChecksProbe({
      status: 1,
      stdout: '',
      stderr: 'HTTP 403: Resource not accessible',
    }),
    { state: 'ERROR', count: 0, detail: 'HTTP 403: Resource not accessible' },
  );
});

test('clasifica polling de CI como pending, pass o fail sin depender de watch', () => {
  const pending = classifyPrChecksCompletionProbe({
    status: 8,
    stdout: JSON.stringify([
      { name: 'VENTO Required Gate', state: 'IN_PROGRESS', bucket: 'pending', link: '' },
    ]),
    stderr: '',
  });
  assert.deepEqual(pending, { state: 'WAIT', count: 1, detail: '' });

  const passed = classifyPrChecksCompletionProbe({
    status: 0,
    stdout: JSON.stringify([
      { name: 'VENTO Required Gate', state: 'SUCCESS', bucket: 'pass', link: '' },
      { name: 'Validar plan canonico', state: 'SKIPPED', bucket: 'skipping', link: '' },
    ]),
    stderr: '',
  });
  assert.deepEqual(passed, { state: 'PASS', count: 2, detail: '' });

  const failed = classifyPrChecksCompletionProbe({
    status: 1,
    stdout: JSON.stringify([
      { name: 'VENTO Required Gate', state: 'FAILURE', bucket: 'fail', link: '' },
    ]),
    stderr: '',
  });
  assert.equal(failed.state, 'FAIL');
  assert.equal(failed.count, 1);
  assert.match(failed.detail, /VENTO Required Gate:FAILURE/u);
});

test('finish usa polling reintentable de checks y verifica el cierre completo antes de PASS', () => {
  const source = fs.readFileSync('scripts/docs/task-branch-lifecycle.mjs', 'utf8');
  const finish = source.indexOf('export function finishTask');
  const finishEnd = source.indexOf('function runInfraLocalValidation', finish);
  const finishSource = source.slice(finish, finishEnd);
  const registrationCall = source.indexOf('const registeredCheckCount = waitForPrChecksToRegister(root, prNumber);');
  const completionCall = source.indexOf('const completedCheckCount = waitForPrChecksToComplete(root, prNumber);', registrationCall);
  const mergeWait = source.indexOf('const merged = waitForPrMerged(root, prNumber, headSha);', completionCall);
  const ancestorCheck = source.indexOf("['merge-base', '--is-ancestor', headSha, 'HEAD']", mergeWait);
  const cleanupCall = source.indexOf('const cleanup = cleanupBranch(root, branch);', ancestorCheck);
  const passOutput = source.indexOf("ESTADO: 'PASS'", cleanupCall);

  assert.ok(registrationCall >= 0);
  assert.ok(completionCall > registrationCall);
  assert.ok(mergeWait > completionCall);
  assert.ok(ancestorCheck > mergeWait);
  assert.ok(cleanupCall > ancestorCheck);
  assert.ok(passOutput > cleanupCall);
  assert.equal(finishSource.includes("'--watch'"), false);
  assert.match(source, /HEAD_VALIDATED_IN_MAIN: 'SI'/u);
  assert.match(source, /CHECKS_REGISTERED: registeredCheckCount/u);
  assert.match(source, /CHECKS_COMPLETED: completedCheckCount/u);
});


test('infra publish usa el mismo cierre fuerte y solo permite PASS al final', () => {
  const source = fs.readFileSync('scripts/docs/task-branch-lifecycle.mjs', 'utf8');
  const start = source.indexOf('export function publishInfraChange');
  const branchCreate = source.indexOf("git(['switch', '-c', branch]", start);
  const localValidation = source.indexOf('runInfraLocalValidation(root, dirty);', branchCreate);
  const push = source.indexOf("git(['push', '-u', 'origin', branch]", localValidation);
  const registration = source.indexOf('const registeredCheckCount = waitForPrChecksToRegister(root, prNumber);', push);
  const completion = source.indexOf('const completedCheckCount = waitForPrChecksToComplete(root, prNumber);', registration);
  const mergeWait = source.indexOf('const merged = waitForPrMerged(root, prNumber, headSha);', completion);
  const ancestor = source.indexOf("['merge-base', '--is-ancestor', headSha, 'HEAD']", mergeWait);
  const cleanup = source.indexOf('const cleanup = cleanupBranch(root, branch);', ancestor);
  const ready = source.indexOf("READY_FOR_NEXT_TASK: 'SI'", cleanup);

  assert.ok(start >= 0);
  assert.ok(branchCreate > start);
  assert.ok(localValidation > branchCreate);
  assert.ok(push > localValidation);
  assert.ok(registration > push);
  assert.ok(completion > registration);
  assert.ok(mergeWait > completion);
  assert.ok(ancestor > mergeWait);
  assert.ok(cleanup > ancestor);
  assert.ok(ready > cleanup);
});

test('ops publish usa cierre fuerte y solo permite PASS despues de integrar y limpiar', () => {
  const source = fs.readFileSync('scripts/docs/task-branch-lifecycle.mjs', 'utf8');
  const start = source.indexOf('export function publishOpsChange');
  const branchCreate = source.indexOf("git(['switch', '-c', branch]", start);
  const localValidation = source.indexOf('runOpsLocalValidation(root, dirty);', branchCreate);
  const push = source.indexOf("git(['push', '-u', 'origin', branch]", localValidation);
  const registration = source.indexOf('const registeredCheckCount = waitForPrChecksToRegister(root, prNumber);', push);
  const completion = source.indexOf('const completedCheckCount = waitForPrChecksToComplete(root, prNumber);', registration);
  const mergeWait = source.indexOf('const merged = waitForPrMerged(root, prNumber, headSha);', completion);
  const ancestor = source.indexOf("['merge-base', '--is-ancestor', headSha, 'HEAD']", mergeWait);
  const cleanup = source.indexOf('const cleanup = cleanupBranch(root, branch);', ancestor);
  const ready = source.indexOf("READY_FOR_NEXT_TASK: 'SI'", cleanup);

  assert.ok(start >= 0);
  assert.ok(branchCreate > start);
  assert.ok(localValidation > branchCreate);
  assert.ok(push > localValidation);
  assert.ok(registration > push);
  assert.ok(completion > registration);
  assert.ok(mergeWait > completion);
  assert.ok(ancestor > mergeWait);
  assert.ok(cleanup > ancestor);
  assert.ok(ready > cleanup);
});

test('resuelve el owner del preflight dentro de docs/plan-canonico/modular', () => {
  const relativeOwner = 'bloques/J_ACCIONES_DE_SERVIDOR/01_INVENTARIO_DE_SUPERFICIES_DE_SERVIDOR.md';
  const repoRelativeOwner = `docs/plan-canonico/modular/${relativeOwner}`;

  assert.equal(
    resolveCanonicalOwnerRelativePath(relativeOwner),
    repoRelativeOwner,
  );
  assert.equal(
    resolveCanonicalOwnerRelativePath(repoRelativeOwner),
    repoRelativeOwner,
  );
  assert.throws(
    () => resolveCanonicalOwnerRelativePath('../fuera.md'),
    /Ruta de archivo propietario invalida/u,
  );
});

test('lifecycle oficial no contiene spawn directo de npm.cmd', () => {
  for (const relativePath of [
    'scripts/docs/task-branch-lifecycle.mjs',
    'scripts/docs/implementation-branch-lifecycle.mjs',
  ]) {
    const source = fs.readFileSync(relativePath, 'utf8');
    assert.doesNotMatch(source, /spawn(?:Sync)?\(\s*['"]npm\.cmd['"]/u);
  }
});

test('resuelve npm de forma portable y evita spawn directo de npm.cmd en Windows', () => {
  assert.deepEqual(
    resolveNpmInvocation({
      platform: 'win32',
      execPath: 'C:\\Program Files\\nodejs\\node.exe',
      npmExecPath: 'C:\\Program Files\\nodejs\\node_modules\\npm\\bin\\npm-cli.js',
      comspec: 'C:\\Windows\\System32\\cmd.exe',
    }),
    {
      command: 'C:\\Program Files\\nodejs\\node.exe',
      prefixArgs: ['C:\\Program Files\\nodejs\\node_modules\\npm\\bin\\npm-cli.js'],
    },
  );

  assert.deepEqual(
    resolveNpmInvocation({
      platform: 'win32',
      execPath: 'C:\\Program Files\\nodejs\\node.exe',
      npmExecPath: '',
      comspec: 'C:\\Windows\\System32\\cmd.exe',
    }),
    {
      command: 'C:\\Windows\\System32\\cmd.exe',
      prefixArgs: ['/d', '/s', '/c', 'npm.cmd'],
    },
  );

  assert.deepEqual(
    resolveNpmInvocation({
      platform: 'linux',
      execPath: '/usr/bin/node',
      npmExecPath: '',
    }),
    {
      command: 'npm',
      prefixArgs: [],
    },
  );
});

test('el iniciador exige start antes de trabajo y finish antes de siguiente tarea', () => {
  const template = fs.readFileSync(
    'docs/plan-canonico/modular/chatgpt-work-starter-template.txt',
    'utf8',
  );
  assert.match(template, /REGLA OBLIGATORIA DE RAMA POR TAREA Y CIERRE EN MAIN/u);
  assert.match(template, /npm run docs:task:start -- --task-id/u);
  assert.match(template, /task\/<task-id-en-minusculas>/u);
  assert.match(template, /npm run docs:task:finish -- --task-id/u);
  assert.match(template, /NEXT_TASK_ALLOWED: SI/u);
  assert.match(template, /ninguna tarea siguiente puede comenzar/u);
  assert.match(template, /ARQUITECTURA DE INICIADORES POR CARRIL/u);
  assert.equal(template.split('{{CURRENT_WORK}}').length, 2);
  assert.match(template, /ranura estructural de trabajo/u);
  assert.match(template, /token reservado/u);
  assert.match(template, /VALIDACION OBLIGATORIA DE DESCARGABLES EJECUTABLES/u);
  assert.match(template, /docs:delivery-exec:check/u);
  assert.match(template, /stdin-commonjs/u);
  assert.match(template, /Illegal return statement/u);
  assert.doesNotMatch(template, /RESILIENCIA OBLIGATORIA DEL LIFECYCLE FISICO/u);
  assert.doesNotMatch(template, /docs:implementation:finish/u);
  assert.doesNotMatch(template, /docs:plan:sync-local/u);

  const generator = fs.readFileSync('scripts/docs/chatgpt-work-starter.mjs', 'utf8');
  const implementationStart = generator.indexOf('const IMPLEMENTATION_PROTOCOL =');
  assert.ok(implementationStart >= 0);
  const implementationProtocol = generator.slice(implementationStart);
  assert.match(implementationProtocol, /RESILIENCIA OBLIGATORIA DEL LIFECYCLE FISICO/u);
  assert.match(implementationProtocol, /SCOPE_FISICO = authorized_changes/u);
  assert.match(implementationProtocol, /docs:implementation:finish/u);
  assert.match(implementationProtocol, /resolveNpmInvocation/u);
  assert.match(implementationProtocol, /docs:plan:local-sync/u);
  assert.match(implementationProtocol, /github\.event\.before/u);
});

test('package.json expone ciclos de tarea, infraestructura y documentacion operativa', () => {
  const packageJson = JSON.parse(fs.readFileSync('package.json', 'utf8'));
  assert.equal(
    packageJson.scripts['docs:task:start'],
    'node scripts/docs/task-branch-lifecycle-readiness.mjs start',
  );
  assert.equal(
    packageJson.scripts['docs:task:finish'],
    'node scripts/docs/task-branch-lifecycle-readiness.mjs finish',
  );
  assert.equal(
    packageJson.scripts['docs:infra:publish'],
    'node scripts/docs/task-branch-lifecycle.mjs infra',
  );
  assert.equal(
    packageJson.scripts['docs:ops:publish'],
    'node scripts/docs/task-branch-lifecycle.mjs ops',
  );
});

test('el Required Gate usa main y no depende de la rama historica de BLOQUE T', () => {
  const workflow = fs.readFileSync('.github/workflows/vento-required-gate.yml', 'utf8');
  assert.match(workflow, /repository: vento-group-sas\/vento-shell[\s\S]*?ref: main/u);
  assert.doesNotMatch(workflow, /ref: shell-ci-018-global/u);
});
