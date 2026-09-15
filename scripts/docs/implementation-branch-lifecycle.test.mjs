import assert from 'node:assert/strict';
import fs from 'node:fs';
import test from 'node:test';

import {
  assertCi020PhysicalPrerequisitesForFinish,
  assertImplementationPaths,
  assertInstanceCanFinish,
  assertInstanceCanStart,
  assertStartWorktree,
  assertStartBranchFreshness,
  authorizedRecordMatchesPersistedMain,
  buildImplementationPrBody,
  classifyImplementationPath,
  defaultBranchOccupiedByAnotherWorktree,
  implementationBranchName,
  isPristinePendingInstanceRecord,
  normalizeInstanceId,
  physicalLaneBlockers,
  readinessBlockers,
  resolveImplementationFinishMode,
} from './implementation-branch-lifecycle.mjs';

test('normaliza instance_id y deriva rama fisica estable', () => {
  assert.equal(normalizeInstanceId('shell-con-001::GLOBAL'), 'SHELL-CON-001::GLOBAL');
  assert.equal(
    implementationBranchName('SHELL-CON-001::GLOBAL'),
    'implementation/shell-con-001/global',
  );
  assert.equal(
    implementationBranchName('AUTH-DB-020::pkg_001'),
    'implementation/auth-db-020/pkg_001',
  );
});

test('rechaza instance_id inseguros o sin cardinalidad fisica', () => {
  assert.throws(() => normalizeInstanceId('SHELL-CON-001'), /INSTANCE_ID invalido/u);
  assert.throws(() => normalizeInstanceId('../main::GLOBAL'), /INSTANCE_ID invalido/u);
  assert.throws(() => normalizeInstanceId('SHELL-CON-001::../GLOBAL'), /INSTANCE_ID invalido/u);
});

test('detecta main ocupada por otro worktree antes del cierre', () => {
  const porcelain = [
    'worktree C:/repo/physical',
    'HEAD 1111111111111111111111111111111111111111',
    'branch refs/heads/implementation/shell-ci-021/gap-pkg-018',
    '',
    'worktree C:/repo/hardening',
    'HEAD 2222222222222222222222222222222222222222',
    'branch refs/heads/main',
    '',
  ].join('\n');

  assert.equal(defaultBranchOccupiedByAnotherWorktree(porcelain, 'C:/repo/physical'), true);
  assert.equal(defaultBranchOccupiedByAnotherWorktree(porcelain, 'C:/repo/hardening'), false);
  assert.equal(defaultBranchOccupiedByAnotherWorktree('', 'C:/repo/physical'), false);
});

test('start exige AUTHORIZED con decision humana aprobada', () => {
  assert.equal(assertInstanceCanStart({
    instance_id: 'SHELL-CON-001::GLOBAL',
    status: 'AUTHORIZED',
    authorization: { decision: 'APPROVED' },
  }), true);
  assert.throws(
    () => assertInstanceCanStart({
      instance_id: 'SHELL-CON-001::GLOBAL',
      status: 'PENDING_AUTHORIZATION',
      authorization: null,
    }),
    /debe estar AUTHORIZED/u,
  );
});

test('finish exige VERIFIED y evidence consolidada', () => {
  assert.equal(assertInstanceCanFinish({
    instance_id: 'SHELL-CON-001::GLOBAL',
    status: 'VERIFIED',
    evidence: ['VALIDATION PASS'],
  }), true);
  assert.throws(
    () => assertInstanceCanFinish({
      instance_id: 'SHELL-CON-001::GLOBAL',
      status: 'IMPLEMENTED',
      evidence: ['VALIDATION PASS'],
    }),
    /debe estar VERIFIED/u,
  );
  assert.throws(
    () => assertInstanceCanFinish({
      instance_id: 'SHELL-CON-001::GLOBAL',
      status: 'VERIFIED',
      evidence: [],
    }),
    /sin evidence consolidada/u,
  );
});

test('start admite ledger AUTHORIZED local y worktree limpio sujeto a persistencia remota exacta', () => {
  const record = 'docs/plan-canonico/modular/implementation-instances/SHELL-CON-001__GLOBAL.json';
  assert.equal(assertStartWorktree([record], record), true);
  assert.equal(assertStartWorktree([], record), true);
  assert.throws(
    () => assertStartWorktree([record, 'package.json'], record),
    /solo admite worktree limpio/u,
  );
});

test('start solo confia en AUTHORIZED persistido cuando el ledger remoto coincide exactamente', () => {
  const instance = {
    instance_id: 'SHELL-CON-001::GLOBAL',
    task_id: 'SHELL-CON-001',
    status: 'AUTHORIZED',
    target_repositories: ['vento-group-sas/vento-shell'],
    authorized_changes: [{ repo: 'vento-group-sas/vento-shell', path: 'x.ts', change: 'CREATE' }],
    validation_commands: ['npm test'],
    authorization: { decision: 'APPROVED' },
    evidence: [],
  };
  const persisted = JSON.parse(JSON.stringify(instance));
  assert.equal(authorizedRecordMatchesPersistedMain(instance, persisted), true);
  persisted.validation_commands = ['npm run different'];
  assert.equal(authorizedRecordMatchesPersistedMain(instance, persisted), false);
  persisted.validation_commands = ['npm test'];
  persisted.authorization.decision = 'REJECTED';
  assert.equal(authorizedRecordMatchesPersistedMain(instance, persisted), false);
});

test('start valida AUTHORIZED persistido antes de crear o reanudar la rama fisica', () => {
  const source = fs.readFileSync('scripts/docs/implementation-branch-lifecycle.mjs', 'utf8');
  const start = source.indexOf('export function startImplementation');
  const persisted = source.indexOf(
    'const persistedAuthorization = authorizedRecordPersistedOnMain(root, recordPath, instance);',
    start,
  );
  const firstGuard = source.indexOf('assertStartWorktree(worktreePaths(root), recordPath);', persisted);
  const branchMutation = source.indexOf('const branchMode = ensureBranchReadyForStart(root, branch);', firstGuard);
  const secondGuard = source.indexOf('assertStartWorktree(worktreePaths(root), recordPath);', branchMutation);
  const statusWrite = source.indexOf("writeInstanceStatus(root, id, 'IN_PROGRESS')", secondGuard);
  assert.ok(start >= 0);
  assert.ok(persisted > start);
  assert.ok(firstGuard > persisted);
  assert.ok(branchMutation > firstGuard);
  assert.ok(secondGuard > branchMutation);
  assert.ok(statusWrite > secondGuard);
});

test('start rechaza rama fisica existente que no contiene origin/main', () => {
  assert.equal(assertStartBranchFreshness({
    mainContained: true,
    branch: 'implementation/shell-ci-020/gap-pkg-018',
    syncRaw: '0\t1',
  }), true);
  assert.throws(
    () => assertStartBranchFreshness({
      mainContained: false,
      branch: 'implementation/shell-ci-020/gap-pkg-018',
      syncRaw: '81\t1',
    }),
    /IMPLEMENTATION_START_STALE_BRANCH/u,
  );
});

test('finish crea commit con cambios y reanuda si el commit ya existe', () => {
  assert.equal(
    resolveImplementationFinishMode({
      dirtyPaths: ['packages/ui-web/src/Test.tsx'],
      branchCommits: 0,
    }),
    'CREATE_COMMIT',
  );
  assert.equal(
    resolveImplementationFinishMode({ dirtyPaths: [], branchCommits: 1 }),
    'RESUME_POST_COMMIT',
  );
  assert.throws(
    () => resolveImplementationFinishMode({ dirtyPaths: [], branchCommits: 0 }),
    /no encontro cambios locales ni un commit de implementacion existente para reanudar/u,
  );
});

test('cierre fisico deriva el alcance de authorized_changes y no de carpetas globales', () => {
  const instance = {
    instance_id: 'AUTH-DB-015::GLOBAL',
    authorized_changes: [
      { repo: 'vento-group-sas/vento-shell', path: 'scripts/supabase/migration-manifest.mjs', change: 'CREATE' },
      { repo: 'vento-group-sas/vento-shell', path: 'docs/ARQUITECTURA-MIGRACIONES-CENTRALIZADAS.md', change: 'MODIFY' },
      { repo: 'vento-group-sas/vento-shell', path: 'scripts/docs/implementation-branch-lifecycle.mjs', change: 'EXECUTE_ONLY' },
      { repo: 'vento-group-sas/vento-shell', path: 'docs/plan-canonico/modular/implementation-instances/AUTH-DB-015__GLOBAL.json', change: 'MODIFY' },
    ],
  };

  assert.equal(classifyImplementationPath('scripts/supabase/migration-manifest.mjs', instance), 'AUTHORIZED');
  assert.equal(classifyImplementationPath('docs/ARQUITECTURA-MIGRACIONES-CENTRALIZADAS.md', instance), 'AUTHORIZED');
  assert.equal(classifyImplementationPath('scripts/docs/implementation-branch-lifecycle.mjs', instance), 'EXECUTE_ONLY');
  assert.equal(classifyImplementationPath('docs/plan-canonico/modular/00_CABECERA_Y_ESTADO.md', instance), 'DERIVED_PROJECTION');
  assert.equal(
    classifyImplementationPath('docs/plan-canonico/modular/bloques/E1_DESCUBRIMIENTO_OPERATIVO/04A_04_SHELL.md', instance),
    'TREQ_REGISTRY',
  );
  assert.equal(classifyImplementationPath('src/app/page.tsx', instance), 'OTHER');
  assert.throws(
    () => assertImplementationPaths(['scripts/docs/implementation-branch-lifecycle.mjs'], instance),
    /EXECUTE_ONLY/u,
  );
  assert.throws(
    () => assertImplementationPaths(['src/app/page.tsx'], instance),
    /fuera de authorized_changes/u,
  );
});

test('borrador de la siguiente instancia solo es derivado si permanece pristino', () => {
  const path = 'docs/plan-canonico/modular/implementation-instances/AUTH-DB-027__GLOBAL.json';
  const pristine = {
    instance_id: 'AUTH-DB-027::GLOBAL',
    task_id: 'AUTH-DB-027',
    status: 'PENDING_AUTHORIZATION',
    target_repositories: [],
    authorized_changes: [],
    validation_commands: [],
    authorization: null,
    evidence: [],
  };
  assert.equal(isPristinePendingInstanceRecord(pristine, path), true);
  assert.equal(isPristinePendingInstanceRecord({ ...pristine, status: 'AUTHORIZED' }, path), false);
  assert.equal(isPristinePendingInstanceRecord({ ...pristine, extra: true }, path), false);
});

test('PR fisico declara TREQ NONE y lista el alcance real', () => {
  const body = buildImplementationPrBody('SHELL-CON-001::GLOBAL', [
    'packages/contracts/package.json',
    'docs/plan-canonico/modular/implementation-instances/SHELL-CON-001__GLOBAL.json',
  ]);
  assert.match(body, /^VENTO-TREQ-AFFECTED: NONE$/mu);
  assert.match(body, /SHELL-CON-001::GLOBAL/u);
  assert.match(body, /packages\/contracts\/package\.json/u);
});

test('readiness fisica desacopla continuidad y formato documentales historicos', () => {
  const instanceId = 'SHELL-CON-001::GLOBAL';
  const report = {
    blockers: [
      `${instanceId} debe estar IN_PROGRESS para ejecutar el preflight fisico; estado actual: AUTHORIZED.`,
      'formato de tarea: NEEDS_FORMAT.',
      'active-sequence.json requiere regeneración.',
      'contrato de entrega inválido: CONTRACT_ERROR',
    ],
  };

  assert.deepEqual(
    readinessBlockers(report, instanceId),
    ['contrato de entrega inválido: CONTRACT_ERROR'],
  );
  assert.deepEqual(
    physicalLaneBlockers(report, instanceId),
    [
      `${instanceId} debe estar IN_PROGRESS para ejecutar el preflight fisico; estado actual: AUTHORIZED.`,
      'contrato de entrega inválido: CONTRACT_ERROR',
    ],
  );
});

test('start abre carril fisico antes de reconciliar derivados versionados y no exige formato documental historico', () => {
  const source = fs.readFileSync('scripts/docs/implementation-branch-lifecycle.mjs', 'utf8');
  const start = source.indexOf('export function startImplementation');
  const readinessDefinition = source.indexOf('function physicalReadiness');
  const worktreeGuard = source.indexOf('assertStartWorktree(worktreePaths(root), recordPath);', start);
  const readinessCall = source.indexOf('const readiness = physicalReadiness(root, id);', worktreeGuard);
  const branchMutation = source.indexOf('const branchMode = ensureBranchReadyForStart(root, branch);', readinessCall);
  const secondWorktreeGuard = source.indexOf('assertStartWorktree(worktreePaths(root), recordPath);', branchMutation);
  const statusWrite = source.indexOf("writeInstanceStatus(root, id, 'IN_PROGRESS')", secondWorktreeGuard);
  const preflightDefinition = source.indexOf('function physicalPreflight');
  const instanceArg = source.indexOf("'--instance-id', instanceId", preflightDefinition);
  const strict = source.indexOf("'--strict'", instanceArg);
  const preflightCall = source.indexOf('const report = physicalPreflight(root, id);', statusWrite);
  const build = source.indexOf("npm(['run', '--silent', 'docs:plan:build']", preflightCall);
  const planCheck = source.indexOf("npm(['run', '--silent', 'docs:plan:check']", build);
  const diffCheck = source.indexOf("git(['diff', '--check']", planCheck);
  const ready = source.indexOf("READY_TO_IMPLEMENT: 'SI'", diffCheck);
  const preStartLocalSync = source.indexOf('syncLocalDerivedArtifacts({ root, quiet: true });', start);

  assert.ok(readinessDefinition >= 0);
  assert.ok(worktreeGuard > start);
  assert.ok(readinessCall > readinessDefinition);
  assert.ok(branchMutation > readinessCall);
  assert.ok(secondWorktreeGuard > branchMutation && secondWorktreeGuard < statusWrite);
  assert.ok(statusWrite > branchMutation);
  assert.ok(preflightDefinition >= 0);
  assert.ok(instanceArg > preflightDefinition);
  assert.ok(strict > instanceArg);
  assert.ok(preflightCall > statusWrite);
  assert.ok(build > preflightCall);
  assert.ok(planCheck > build);
  assert.ok(diffCheck > planCheck);
  assert.ok(ready > diffCheck);
  assert.ok(preStartLocalSync === -1 || preStartLocalSync > ready);
  assert.match(source, /START_DOCS_PLAN_BUILD: 'PASS_ONCE'/u);
  assert.match(source, /DOCUMENTARY_LANE_FOR_PHYSICAL: 'ADVISORY_ONLY'/u);
});

test('finish usa fast lane físico, reanuda post-commit y exige polling hosted antes del merge', () => {
  const source = fs.readFileSync('scripts/docs/implementation-branch-lifecycle.mjs', 'utf8');
  const finish = source.indexOf('export async function finishImplementation');
  const finishEnd = source.indexOf('function parseArgs', finish);
  const finishSource = source.slice(finish, finishEnd);
  const verified = source.indexOf('assertInstanceCanFinish(instance);', finish);
  const build = source.indexOf("npm(['run', '--silent', 'docs:plan:build']", verified);
  const planCheck = source.indexOf("npm(['run', '--silent', 'docs:plan:check']", build);
  const fastLane = source.indexOf('LOCAL_VALIDATION_STRATEGY: \'SCOPE_ENFORCED_FAST_LANE\'', planCheck);
  const dirty = source.indexOf('const dirty = worktreePaths(root);', planCheck);
  const finishMode = source.indexOf('const finishMode = resolveImplementationFinishMode({', dirty);
  const commitScope = source.indexOf("'docs:commit-scope:check'", finishMode);
  const instanceScope = source.indexOf("'--instance-id', id", commitScope);
  const push = source.indexOf("git(['push', '-u', 'origin', branch]", commitScope);
  const registration = source.indexOf('waitForPrChecksToRegister(root, prNumber)', push);
  const completion = source.indexOf('waitForPrChecksToComplete(root, prNumber)', registration);
  const merge = source.indexOf("'pr', 'merge'", completion);
  const mainPull = source.indexOf("git(['pull', '--ff-only', 'origin', DEFAULT_BRANCH]", merge);
  const localDerivedSync = source.indexOf('syncLocalDerivedArtifacts({ root, quiet: true });', mainPull);
  const cleanup = source.indexOf('cleanupBranch(root, branch)', localDerivedSync);
  const ready = source.indexOf("READY_TO_RESTART_WATCHER: 'SI'", cleanup);
  const main = source.indexOf('async function main()');
  const awaitedFinish = source.indexOf('await finishImplementation({ instanceId: args.instanceId });', main);
  const awaitedMain = source.indexOf('await main();', awaitedFinish);

  assert.ok(finish >= 0);
  assert.ok(verified > finish);
  assert.ok(build > verified);
  assert.ok(planCheck > build);
  assert.equal(finishSource.includes("npmAsync(['run', '--silent', 'docs:plan:test']"), false);
  assert.equal(finishSource.includes("npmAsync(['run', '--silent', 'docs:treq:check']"), false);
  assert.equal(finishSource.includes("npmAsync(['run', '--silent', 'docs:treq:test']"), false);
  assert.equal(finishSource.includes("npmAsync(['run', '--silent', 'quality:lint:ratchet'"), false);
  assert.ok(fastLane > planCheck && fastLane > dirty);
  assert.ok(finishMode > dirty);
  assert.ok(commitScope > finishMode);
  assert.ok(instanceScope > commitScope);
  assert.ok(push > instanceScope);
  assert.ok(registration > push);
  assert.ok(completion > registration);
  assert.ok(merge > completion);
  assert.ok(mainPull > merge);
  assert.ok(localDerivedSync > mainPull);
  assert.ok(cleanup > localDerivedSync);
  assert.ok(ready > cleanup);
  assert.ok(main >= 0);
  assert.ok(awaitedFinish > main);
  assert.ok(awaitedMain > awaitedFinish);
  assert.equal(finishSource.includes("'--watch'"), false);
  assert.equal(finishSource.includes("'--force'"), false);
  assert.equal(source.includes('classifyTaskPath'), false);
  assert.match(source, /RESUME_POST_MERGE/u);
  assert.match(source, /derivedPending\.length > 1/u);
  assert.match(source, /import \{ spawnSync \} from 'node:child_process';/u);
  assert.match(source, /const CHECK_REGISTRATION_ATTEMPTS = 60;/u);
  assert.match(source, /const CHECK_REGISTRATION_INTERVAL_MS = 2000;/u);
  assert.match(source, /const MERGE_CONFIRM_ATTEMPTS = 60;/u);
  assert.match(source, /const MERGE_CONFIRM_INTERVAL_MS = 2000;/u);
  assert.match(source, /FINISH_MODE: finishMode/u);
  assert.match(source, /CHECKS_COMPLETED: completedCheckCount/u);
  assert.match(source, /LOCAL_DERIVED_SYNC: 'PASS_AFTER_MERGE'/u);
});

test('CI usa fast lane en PR fisico sin duplicar suites cubiertas por Required Gate', () => {
  const source = fs.readFileSync('.github/workflows/validate-canonical-plan.yml', 'utf8');
  const requiredGate = fs.readFileSync('.github/workflows/vento-required-gate.yml', 'utf8');

  assert.match(source, /implementation_pr=false/u);
  assert.match(source, /\$\{HEAD_REF:-\}" == implementation\/\*/u);
  assert.match(source, /implementation_pr=\$implementation_pr/u);
  assert.match(
    source,
    /steps\.scope\.outputs\.implementation_pr != 'true'/u,
  );

  const planChecks = source.match(/run: npm run docs:plan:check/gu) ?? [];
  assert.equal(planChecks.length, 1);
  assert.equal(source.includes('run: npm run docs:delivery:check'), false);
  assert.match(source, /npm ci --prefer-offline --no-audit --no-fund/u);
  assert.match(requiredGate, /run: npm test --silent/u);
  assert.match(requiredGate, /validate-treq-registry\.mjs --json --baseline-file .*--require-baseline/u);
});

test('docs:plan:build materializa la siguiente instancia pendiente antes del core build', () => {
  const source = fs.readFileSync('scripts/docs/build-plan-canonico.mjs', 'utf8');
  const derive = source.indexOf('deriveImplementationControl({ root })');
  const pending = source.indexOf('ensurePendingImplementationRecord({ root, control: preBuildControl })', derive);
  const coreBuild = source.indexOf("await import('./safe-build-plan-canonico.mjs')", pending);
  const finalControl = source.indexOf('writeImplementationControlArtifacts({ root })', coreBuild);

  assert.ok(derive >= 0);
  assert.ok(pending > derive);
  assert.ok(coreBuild > pending);
  assert.ok(finalControl > coreBuild);
});

test('package.json conserva shims legacy fail-closed y advance como unica entrada mutante normal', () => {
  const packageJson = JSON.parse(fs.readFileSync('package.json', 'utf8'));
  const guardSource = fs.readFileSync('scripts/docs/implementation-correction-guard.mjs', 'utf8');
  const lifecycleSource = fs.readFileSync('scripts/docs/implementation-branch-lifecycle.mjs', 'utf8');

  assert.equal(
    packageJson.scripts['docs:implementation:advance'],
    'node scripts/docs/implementation-execution-coordinator.mjs advance',
  );
  assert.equal(
    packageJson.scripts['docs:implementation:start'],
    'node scripts/docs/implementation-correction-guard.mjs start',
  );
  assert.equal(
    packageJson.scripts['docs:implementation:preverify'],
    'node scripts/docs/implementation-branch-lifecycle.mjs preverify',
  );
  assert.equal(
    packageJson.scripts['docs:implementation:finish'],
    'node scripts/docs/implementation-branch-lifecycle.mjs finish',
  );

  const internalEntry = guardSource.indexOf('export function startImplementationGuarded');
  const guardedCheck = guardSource.indexOf('assertImplementationStartNotBlocked({ root, instanceId });', internalEntry);
  const internalDelegation = guardSource.indexOf('return startImplementation({ root, instanceId });', guardedCheck);
  assert.ok(internalEntry >= 0);
  assert.ok(guardedCheck > internalEntry);
  assert.ok(internalDelegation > guardedCheck);

  assert.match(guardSource, /rejectDirectImplementationLifecycleEntry\('START'\)/u);
  assert.doesNotMatch(guardSource, /assertImplementationStartNotBlocked\(\{ instanceId: args\.instanceId \}\)/u);
  assert.match(lifecycleSource, /rejectDirectImplementationLifecycleEntry\(args\.mode\)/u);
  assert.match(lifecycleSource, /docs:implementation:advance -- --instance-id/u);

  assert.match(
    guardSource,
    /import \{ startImplementation \} from '\.\/implementation-branch-lifecycle\.mjs';/u,
  );
  assert.match(
    packageJson.scripts['docs:plan:test'],
    /scripts\/docs\/implementation-branch-lifecycle\.test\.mjs/u,
  );
  assert.match(
    packageJson.scripts['docs:plan:test'],
    /scripts\/docs\/implementation-correction-guard\.test\.mjs/u,
  );
});

test('sync local converge derivados y preserva el worktree no derivado', () => {
  const packageJson = JSON.parse(
    fs.readFileSync('package.json', 'utf8'),
  );

  assert.equal(
    packageJson.scripts['docs:plan:local-sync'],
    'node scripts/docs/sync-local-derived-artifacts.mjs',
  );

  assert.equal(
    packageJson.scripts['docs:plan:watch'],
    'node scripts/docs/sync-local-derived-artifacts.mjs && node scripts/docs/watch-plan-canonico.mjs',
  );

  assert.ok(
    packageJson.scripts['docs:plan:check']
      .startsWith(
        'node scripts/docs/sync-local-derived-artifacts.mjs && ',
      ),
  );

  const source = fs.readFileSync(
    'scripts/docs/sync-local-derived-artifacts.mjs',
    'utf8',
  );

  assert.ok(
    source.includes(
      "['check-ignore', '--quiet', '--', relativePath]",
    ),
  );

  assert.ok(
    source.includes(
      'syncPlanContinuity({',
    ),
  );

  assert.ok(
    source.includes(
      'writeImplementationControlArtifacts({',
    ),
  );

  assert.ok(
    source.includes(
      "trigger: 'local-derived-sync'",
    ),
  );

  assert.ok(
    source.includes(
      'write: true',
    ),
  );

  assert.ok(
    source.includes(
      'syncPendingTaskContext({',
    ),
  );

  assert.ok(
    source.includes(
      'readinessResult: readiness',
    ),
  );

  assert.ok(
    source.includes(
      'writeReadinessChatgptWorkStarter({',
    ),
  );

  assert.ok(
    source.includes(
      'writeCorrectionStarter({',
    ),
  );

  assert.ok(
    source.includes(
      "build-plan-canonico-core.mjs', '--check",
    ),
  );

  assert.ok(
    source.includes(
      'CI_DERIVED_PROJECTION_DRIFT',
    ),
  );

  assert.ok(
    source.includes(
      'afterStatus !== reconciledStatus',
    ),
  );

  assert.ok(
    source.includes(
      'NON_DERIVED_WORKTREE: PRESERVED',
    ),
  );
});

test('finish de SHELL-CI-020 falla cerrado ante fundación pendiente', () => {
  const instance = { instance_id: 'SHELL-CI-020::GAP-PKG-001', task_id: 'SHELL-CI-020' };
  const blocked = { registry: { packages: [{
    package_id: 'GAP-PKG-001',
    physical_dependencies: { status: 'UNKNOWN', evidence: [{ source: 'MRP015-000::TOOLCHAIN_READY', status: 'UNKNOWN', detail: 'Pendiente.' }] },
  }] } };

  assert.throws(
    () => assertCi020PhysicalPrerequisitesForFinish({ instance, readiness: blocked }),
    /MRP015-000::TOOLCHAIN_READY/u,
  );

  const ready = { registry: { packages: [{
    package_id: 'GAP-PKG-001',
    physical_dependencies: { status: 'PASS', evidence: [{ source: 'MRP015-000::TOOLCHAIN_READY', status: 'PASS', detail: 'PASS.' }] },
  }] } };

  assert.equal(assertCi020PhysicalPrerequisitesForFinish({ instance, readiness: ready }), true);
});

test('package registry persistente es proyección derivada física', () => {
  const instance = {
    instance_id: 'SHELL-CON-001::GLOBAL',
    authorized_changes: [],
  };
  assert.equal(
    classifyImplementationPath(
      'scripts/docs/package-readiness/implementation-package-registry.json',
      instance,
    ),
    'DERIVED_PROJECTION',
  );
});

// CORR-010 OWN LEDGER SCOPE
test('el lifecycle permite únicamente el ledger propio sin exigirlo en authorized_changes', () => {
  const instance = {
    instance_id: 'SHELL-CI-021::GAP-PKG-001',
    authorized_changes: [
      { repo: 'vento-group-sas/vento-shell', path: 'packages/ui-web/src/Test.tsx', change: 'MODIFY' },
    ],
  };
  assert.equal(
    classifyImplementationPath(
      'docs/plan-canonico/modular/implementation-instances/SHELL-CI-021__GAP-PKG-001.json',
      instance,
    ),
    'OWN_INSTANCE_LEDGER',
  );
  assert.equal(
    classifyImplementationPath(
      'docs/plan-canonico/modular/implementation-instances/SHELL-CI-022__GAP-PKG-001.json',
      instance,
    ),
    'OTHER',
  );
});

test('start ejecuta implementation doctor antes de mutar la rama fisica', () => {
  const source = fs.readFileSync('scripts/docs/implementation-branch-lifecycle.mjs', 'utf8');
  const start = source.indexOf('export function startImplementation');
  const doctor = source.indexOf('runImplementationDoctor({ root, instanceId: id })', start);
  const branchMutation = source.indexOf('ensureBranchReadyForStart(root, branch)', start);
  const statusMutation = source.indexOf("writeInstanceStatus(root, id, 'IN_PROGRESS')", start);
  assert.ok(start >= 0);
  assert.ok(doctor > start);
  assert.ok(branchMutation > doctor);
  assert.ok(statusMutation > branchMutation);
});

test('finish usa integration loop estable y vuelve a consultar main despues de checks', () => {
  const source = fs.readFileSync('scripts/docs/implementation-branch-lifecycle.mjs', 'utf8');
  const finish = source.indexOf('export async function finishImplementation');
  const finishEnd = source.indexOf('function parseArgs', finish);
  const finishSource = source.slice(finish, finishEnd);
  const doctor = finishSource.indexOf('runImplementationDoctor({ root, instanceId: id })');
  const impact = finishSource.indexOf('integrateCurrentMain({ root, id, instance })');
  const push = finishSource.indexOf("git(['push', '-u', 'origin', branch]");
  const checks = finishSource.indexOf('waitForPrChecksToComplete(root, prNumber)', push);
  const postCheckFetch = finishSource.indexOf(
    "git(['fetch', 'origin', DEFAULT_BRANCH, '--quiet']",
    checks,
  );
  const loopStep = finishSource.indexOf('integrationRuntimeStep({', postCheckFetch);
  const reintegrate = finishSource.indexOf("loopStep.action === 'REINTEGRATE_MAIN'", loopStep);
  const seal = finishSource.indexOf('markImplementationIntegrationChecksPass', reintegrate);
  const exactMerge = finishSource.indexOf("'--match-head-commit', headSha", seal);
  assert.ok(doctor >= 0);
  assert.ok(impact > doctor);
  assert.ok(push > impact);
  assert.ok(checks > push);
  assert.ok(postCheckFetch > checks);
  assert.ok(loopStep > postCheckFetch);
  assert.ok(reintegrate > loopStep);
  assert.ok(seal > reintegrate);
  assert.ok(exactMerge > seal);
  assert.match(finishSource, /INTEGRATION_STABILITY_ATTEMPTS/u);
  assert.match(source, /INTEGRATION_REQUIRES_PHYSICAL_REVALIDATION/u);
  assert.match(source, /'merge-tree', '--write-tree'/u);
  assert.doesNotMatch(finishSource, /--admin/u);
});
