import assert from 'node:assert/strict';
import fs from 'node:fs';
import test from 'node:test';

import { scanPackageReadiness, validateFoundationEvidenceRef } from './package-readiness-scanner.mjs';

const packageJson = JSON.parse(fs.readFileSync('package.json', 'utf8'));
const buildSource = fs.readFileSync('scripts/docs/build-plan-canonico.mjs', 'utf8');
const syncSource = fs.readFileSync('scripts/docs/sync-local-derived-artifacts.mjs', 'utf8');
const scannerSource = fs.readFileSync('scripts/docs/package-readiness-scanner.mjs', 'utf8');
const starterSource = fs.readFileSync('scripts/docs/chatgpt-work-starter-readiness.mjs', 'utf8');
const packageGateLifecycleSource = fs.readFileSync('scripts/docs/package-gate-lifecycle.mjs', 'utf8');
const lifecycleSource = fs.readFileSync('scripts/docs/task-branch-lifecycle-readiness.mjs', 'utf8');
const index = JSON.parse(fs.readFileSync(
  'scripts/docs/package-readiness/implementation-capability-index.json',
  'utf8',
));

test('build ejecuta scanner fail-closed antes de generar iniciadores readiness', () => {
  const scan = buildSource.indexOf("scanPackageReadiness({ root, write: true, trigger: 'plan-build' })");
  const starter = buildSource.indexOf('writeChatgptWorkStarter({ root, readinessResult })');
  assert.ok(scan >= 0);
  assert.ok(starter > scan);
  assert.match(buildSource, /\[PACKAGE READINESS\] Compilaci\\u00f3n bloqueada/u);
  assert.match(buildSource, /process\.exit\(1\)/u);
});


test('local sync converge todas las proyecciones antes del postcheck', () => {
  const initial = syncSource.indexOf(
    'const initialStatus = repositoryStatus(repositoryRoot);',
  );

  const continuity = syncSource.indexOf(
    'syncPlanContinuity({',
  );

  const implementation = syncSource.indexOf(
    'const implementationControl = writeImplementationControlArtifacts({',
  );

  const readiness = syncSource.indexOf(
    'const readiness = scanPackageReadiness({',
  );

  const readinessWrite = syncSource.indexOf(
    'write: true',
    readiness,
  );

  const pending = syncSource.indexOf(
    'const pendingContext = syncPendingTaskContext({',
  );

  const compiled = syncSource.indexOf(
    'const compiled = syncCompiledCache(repositoryRoot, manifest);',
  );

  const starter = syncSource.indexOf(
    'const starter = writeReadinessChatgptWorkStarter({',
  );

  const correction = syncSource.indexOf(
    'const correctionStarter = writeCorrectionStarter({',
  );

  const converged = syncSource.indexOf(
    'const reconciledStatus = repositoryStatus(repositoryRoot);',
  );

  const postReadiness = syncSource.indexOf(
    'const postReadiness = scanPackageReadiness({',
  );

  const after = syncSource.indexOf(
    'const afterStatus = repositoryStatus(repositoryRoot);',
  );

  assert.ok(initial >= 0);
  assert.ok(continuity > initial);
  assert.ok(implementation > continuity);
  assert.ok(readiness > implementation);
  assert.ok(readinessWrite > readiness);
  assert.ok(pending > readinessWrite);
  assert.ok(compiled > pending);
  assert.ok(starter > compiled);
  assert.ok(correction > starter);
  assert.ok(converged > correction);
  assert.ok(postReadiness > converged);
  assert.ok(after > postReadiness);

  assert.ok(
    syncSource.includes('CI_DERIVED_PROJECTION_DRIFT'),
  );

  assert.ok(
    syncSource.includes('afterStatus !== reconciledStatus'),
  );

  assert.ok(
    syncSource.includes('NON_DERIVED_WORKTREE: PRESERVED'),
  );
});

test('package.json enruta starter, status, commit-scope y lifecycle por readiness con carril de correcciones separado', () => {
  const starterCommand = packageJson.scripts['docs:chatgpt:starter'];
  assert.equal(
    starterCommand,
    'node scripts/docs/chatgpt-work-starter-readiness.mjs && node scripts/docs/implementation-work-package.mjs --write && node scripts/docs/correction-starter.mjs',
  );
  const readinessStarter = starterCommand.indexOf('chatgpt-work-starter-readiness.mjs');
  const workPackageStarter = starterCommand.indexOf('implementation-work-package.mjs --write');
  const correctionStarter = starterCommand.indexOf('correction-starter.mjs');
  assert.ok(readinessStarter >= 0);
  assert.ok(workPackageStarter > readinessStarter);
  assert.ok(correctionStarter > workPackageStarter);
  assert.equal(packageJson.scripts['docs:implementation:status'], 'node scripts/docs/implementation-readiness-coordinator.mjs');
  assert.equal(packageJson.scripts['docs:commit-scope:check'], 'node scripts/docs/commit-scope-readiness.mjs');
  assert.equal(packageJson.scripts['docs:task:start'], 'node scripts/docs/task-branch-lifecycle-readiness.mjs start');
  assert.equal(packageJson.scripts['docs:task:finish'], 'node scripts/docs/task-branch-lifecycle-readiness.mjs finish');
  assert.match(packageJson.scripts['docs:plan:check'], /chatgpt-work-starter-readiness\.mjs --check/u);
  assert.doesNotMatch(packageJson.scripts['docs:plan:check'], /chatgpt-work-starter\.mjs --check/u);
  assert.equal(packageJson.scripts['docs:package:start'], 'node scripts/docs/package-gate-lifecycle.mjs start');
  assert.equal(packageJson.scripts['docs:package:prepare'], 'node scripts/docs/package-gate-lifecycle.mjs prepare');
  assert.equal(packageJson.scripts['docs:package:gate:status'], 'node scripts/docs/package-gate-lifecycle.mjs status');
  assert.equal(packageJson.scripts['docs:package:gate:check'], 'node scripts/docs/package-gate-lifecycle.mjs check');
  assert.equal(packageJson.scripts['docs:package:gate:approve'], 'node scripts/docs/package-gate-lifecycle.mjs approve');
  assert.equal(packageJson.scripts['docs:package:finish'], 'node scripts/docs/package-gate-lifecycle.mjs finish');
  assert.equal(packageJson.scripts['docs:package:handoff'], 'node scripts/docs/package-gate-lifecycle.mjs handoff');
  assert.equal(packageJson.scripts['docs:package:execution:status'], 'node scripts/docs/package-execution-control.mjs status');
  assert.equal(packageJson.scripts['docs:package:execution:check'], 'node scripts/docs/package-execution-control.mjs check');
  assert.equal(packageJson.scripts['docs:package:foundation:record'], 'node scripts/docs/package-readiness-scanner.mjs --record-foundation');
  assert.equal(packageJson.scripts['docs:package:foundation:status'], 'node scripts/docs/package-readiness-scanner.mjs --foundation-status');
  assert.equal(packageJson.scripts['docs:package:select'], undefined);
  assert.match(packageJson.scripts['docs:plan:check'], /package-gate-lifecycle\.mjs check/u);
  assert.match(packageJson.scripts['docs:plan:check'], /package-execution-control\.mjs check/u);
  assert.match(packageJson.scripts['docs:plan:test'], /package-gate-control\.test\.mjs/u);
  assert.match(packageJson.scripts['docs:plan:test'], /package-execution-control\.test\.mjs/u);
  assert.match(packageJson.scripts['docs:plan:test'], /correction-starter\.test\.mjs/u);
});

test('el lifecycle documental escanea antes y después del cierre y no publica PASS antes del postcheck', () => {
  const pre = lifecycleSource.indexOf("trigger: 'task-finish-premerge'");
  const finish = lifecycleSource.indexOf('captureFinalResult(() => finishTask');
  const post = lifecycleSource.indexOf("trigger: 'task-finish-postmerge'");
  const replay = lifecycleSource.indexOf('replayFinalResult();');
  assert.ok(pre >= 0);
  assert.ok(finish > pre);
  assert.ok(post > finish);
  assert.ok(replay > post);
});

test('package lifecycle obliga turno, rama, publicación y handoff PENDING', () => {
  assert.match(packageGateLifecycleSource, /assertPackageMutationAllowed/u);
  assert.match(packageGateLifecycleSource, /assertNoFuturePackageArtifacts/u);
  assert.match(packageGateLifecycleSource, /loadValidatedCorrectionControl/u);
  assert.match(packageGateLifecycleSource, /PACKAGE_EXECUTION_ORDER_CORRECTION_OPEN|openOrderCorrections/u);
  assert.match(packageGateLifecycleSource, /infra\/package-gate-/u);
  assert.match(packageGateLifecycleSource, /docs:infra:publish/u);
  assert.match(packageGateLifecycleSource, /pendingInstanceRecord/u);
  assert.match(packageGateLifecycleSource, /PENDING_AUTHORIZATION/u);
  assert.match(packageGateLifecycleSource, /docs:implementation:status/u);
});

test('package lifecycle sincroniza readiness persistente antes de checks dependientes del registry', () => {
  const helper = packageGateLifecycleSource.indexOf('function synchronizePackageReadiness(root, trigger)');
  const helperWrite = packageGateLifecycleSource.indexOf('write: true', helper);

  const approveStart = packageGateLifecycleSource.indexOf('export function approvePackageGate({');
  const approveSync = packageGateLifecycleSource.indexOf(
    "synchronizePackageReadiness(root, 'package-gate-approve');",
    approveStart,
  );

  const finishStart = packageGateLifecycleSource.indexOf('export function finishPackageGate({');
  const finishSync = packageGateLifecycleSource.indexOf(
    "synchronizePackageReadiness(root, 'package-finish-precheck');",
    finishStart,
  );
  const finishHandoff = packageGateLifecycleSource.indexOf(
    'materializePendingPhysicalHandoff(root, id, synchronized)',
    finishStart,
  );
  const finishExecutionCheck = packageGateLifecycleSource.indexOf(
    "npm(['run', 'docs:package:execution:check']",
    finishStart,
  );

  const handoffStart = packageGateLifecycleSource.indexOf(
    'export function handoffPackageImplementation({',
  );
  const handoffSync = packageGateLifecycleSource.indexOf(
    "synchronizePackageReadiness(root, 'package-handoff-precheck');",
    handoffStart,
  );
  const handoffExecutionCheck = packageGateLifecycleSource.indexOf(
    "npm(['run', 'docs:package:execution:check']",
    handoffStart,
  );

  assert.ok(helper >= 0);
  assert.ok(helperWrite > helper);
  assert.ok(approveSync > approveStart);
  assert.ok(finishSync > finishStart);
  assert.ok(finishHandoff > finishSync);
  assert.ok(finishExecutionCheck > finishHandoff);
  assert.ok(handoffSync > handoffStart);
  assert.ok(handoffExecutionCheck > handoffSync);
});

test('scanner separa registry documental persistente de estado físico efectivo', () => {
  assert.match(scannerSource, /status_scope: 'DOCUMENTARY_READINESS'/u);
  assert.match(scannerSource, /export function applyPhysicalOverlay/u);
  assert.match(scannerSource, /status_scope: 'EFFECTIVE_RUNTIME'/u);
  assert.match(scannerSource, /physical_authorization_required: true/u);
  assert.match(scannerSource, /persistentRegistry: nextPersistentRegistry/u);
});

test('los iniciadores usan una única proyección readiness y prohíben cambio silencioso de carril', () => {
  assert.match(starterSource, /PACKAGE READINESS SCANNER — OBLIGATORIO/u);
  assert.match(starterSource, /NO cambiar de carril/u);
  assert.match(starterSource, /no equivale a AUTHORIZED/u);
  assert.match(starterSource, /DOCUMENTATION_QUEUE = EMPTY/u);
  assert.match(starterSource, /READY_FOR_AUTHORIZATION/u);
  assert.match(starterSource, /PACKAGE GATE LIFECYCLE — VALIDACIÓN OBLIGATORIA/u);
  assert.match(starterSource, /docs:package:gate:check/u);
  assert.match(starterSource, /Nunca ejecute docs:package:gate:approve por inferencia/u);
  assert.doesNotMatch(starterSource, /packages\.find\(\(\{ package_gate/u);
  assert.match(starterSource, /Selección humana de package: FALSE/u);
  assert.match(starterSource, /no monopoliza roots independientes/u);
  assert.match(starterSource, /docs:package:start/u);
  assert.match(starterSource, /DELIV-PKG-015/u);
  assert.match(starterSource, /PENDING_AUTHORIZATION/u);
});

test('el índice inicial no inventa un catálogo masivo y solo siembra identidades canónicas explícitas', () => {
  assert.equal(index.discovery_mode, 'EXPLICIT_CANONICAL_MAPPINGS_ONLY');
  assert.deepEqual(Object.keys(index.capabilities).sort(), ['NEXO_REMISSIONS', 'VISO_SCHEDULE_MONTHLY']);
  assert.equal(index.capabilities.NEXO_REMISSIONS.canonical_package_id, 'NEXO-REMISSIONS-001');
  assert.equal(index.capabilities.VISO_SCHEDULE_MONTHLY.canonical_package_id, 'VISO-SCHEDULE-MONTHLY-001');
});

test('la governed frontier conserva la fundación pendiente en el package afectado sin exigir que sea primary global', () => {
  const contract = JSON.parse(fs.readFileSync('scripts/docs/package-readiness/package-readiness-contract.json', 'utf8'));
  const foundation = contract.physical_dependencies.supabase_pre_e5_foundation;
  const remote = foundation.remote_environment_identity;
  const remoteReady = ['STAGING', 'PRODUCTION'].every((role) => {
    const binding = remote.bindings[role];
    return binding.classification === role && String(binding.project_ref ?? '').trim() && String(binding.owner ?? '').trim();
  }) && remote.bindings.STAGING.project_ref !== remote.bindings.PRODUCTION.project_ref;

  const firstUnresolved = foundation.ordered_foundation_gates.find((gate) => {
    if (validateFoundationEvidenceRef(gate, gate.evidence_ref).status !== 'PASS') return true;
    if (gate.foundation_id === 'MRP015-010' && !remoteReady) return true;
    return false;
  }) ?? null;

  const result = scanPackageReadiness({
    root: process.cwd(),
    check: true,
    trigger: 'corr-012-integration',
    supplied: { skipDerivedReports: true },
  });
  const execution = result.registry.package_execution;
  const gap001 = (execution.frontier ?? []).find(({ package_id: packageId }) => packageId === 'GAP-PKG-001')
    ?? (execution.active_physical ?? []).find(({ package_id: packageId }) => packageId === 'GAP-PKG-001')
    ?? null;

  if (firstUnresolved) {
    assert.ok(gap001);
    assert.equal(gap001.next_action.type, 'WAIT_FOR_FOUNDATION_PREREQUISITE');
    assert.equal(gap001.current_work.id, firstUnresolved.foundation_id);
    assert.equal(gap001.current_work.consumer_package_id, 'GAP-PKG-001');
    assert.ok((execution.waiting ?? []).some(({ package_id: packageId }) => packageId === 'GAP-PKG-001'));
  } else {
    assert.notEqual(gap001?.next_action?.type, 'WAIT_FOR_FOUNDATION_PREREQUISITE');
  }
});

test('integración exige CURRENT_EXECUTABLE_WORK en scanner starter y guard', () => {
  const executionSource = fs.readFileSync('scripts/docs/package-execution-control.mjs', 'utf8');
  const pendingSource = fs.readFileSync('scripts/docs/sync-pending-task-context.mjs', 'utf8');
  const guardSource = fs.readFileSync('scripts/docs/implementation-correction-guard.mjs', 'utf8');
  assert.match(scannerSource, /MRP015-000/u);
  assert.match(executionSource, /CURRENT_EXECUTABLE_WORK/u);
  assert.match(starterSource, /CURRENT_EXECUTABLE_WORK/u);
  assert.match(pendingSource, /CURRENT_EXECUTABLE_WORK/u);
  assert.match(guardSource, /IMPLEMENTATION_START_NOT_READY/u);
});


test('docs:plan:check converge todas sus proyecciones antes de comprobarlas', () => {
  const pendingSource = fs.readFileSync(
    'scripts/docs/sync-pending-task-context.mjs',
    'utf8',
  );

  const implementationSource = fs.readFileSync(
    'scripts/docs/implementation-control.mjs',
    'utf8',
  );

  const planCheck =
    packageJson.scripts['docs:plan:check'];

  assert.ok(
    planCheck.includes(
      'sync-local-derived-artifacts.mjs',
    ),
  );

  assert.ok(
    planCheck.includes(
      'sync-pending-task-context.mjs --check',
    ),
  );

  assert.ok(
    planCheck.includes(
      'implementation-control.mjs --check',
    ),
  );

  assert.ok(
    planCheck.includes(
      'chatgpt-work-starter-readiness.mjs --check',
    ),
  );

  assert.ok(
    planCheck.includes(
      'correction-starter.mjs --check',
    ),
  );

  const continuity = syncSource.indexOf(
    'syncPlanContinuity({',
  );

  const implementation = syncSource.indexOf(
    'writeImplementationControlArtifacts({',
  );

  const readiness = syncSource.indexOf(
    'const readiness = scanPackageReadiness({',
  );

  const readinessWrite = syncSource.indexOf(
    'write: true',
    readiness,
  );

  const pending = syncSource.indexOf(
    'const pendingContext = syncPendingTaskContext({',
  );

  const starter = syncSource.indexOf(
    'const starter = writeReadinessChatgptWorkStarter({',
  );

  const correction = syncSource.indexOf(
    'const correctionStarter = writeCorrectionStarter({',
  );

  const convergence = syncSource.indexOf(
    'const reconciledStatus = repositoryStatus(repositoryRoot);',
  );

  assert.ok(continuity >= 0);
  assert.ok(implementation > continuity);
  assert.ok(readiness > implementation);
  assert.ok(readinessWrite > readiness);
  assert.ok(pending > readinessWrite);
  assert.ok(starter > pending);
  assert.ok(correction > starter);
  assert.ok(convergence > correction);

  assert.ok(
    pendingSource.includes(
      'readinessResult ?? scanPackageReadiness',
    ),
  );

  assert.ok(
    implementationSource.includes(
      'materializePendingRecord = true',
    ),
  );

  assert.ok(
    syncSource.includes(
      'materializePendingRecord: false',
    ),
  );

  const correctionPostcheck =
    syncSource.indexOf(
      'writeCorrectionStarter({',
      convergence,
    );

  const correctionPostcheckFlag =
    syncSource.indexOf(
      'check: true',
      correctionPostcheck,
    );

  assert.ok(
    correctionPostcheck > convergence,
  );

  assert.ok(
    correctionPostcheckFlag > correctionPostcheck,
  );

  assert.ok(
    syncSource.includes(
      'CI_DERIVED_PROJECTION_DRIFT',
    ),
  );
});

test('DELIV-PKG-019 queda enlazado fail-closed hasta la autorización CI020', () => {
  const implementationSource = fs.readFileSync('scripts/docs/implementation-control.mjs', 'utf8');
  const guardSource = fs.readFileSync('scripts/docs/implementation-correction-guard.mjs', 'utf8');
  assert.match(scannerSource, /parseDeploymentEnvironmentProjection/u);
  assert.match(scannerSource, /evaluatePackageDeploymentEnvironment/u);
  assert.match(scannerSource, /deployment_environment_profile_019/u);
  assert.match(implementationSource, /target_environments completos/u);
  assert.match(guardSource, /IMPLEMENTATION_ENVIRONMENT_MISMATCH/u);
  assert.match(guardSource, /PRODUCTION no está autorizada/u);
});

// CORR-010 PACKAGE LIFECYCLE INTEGRATION
test('integración conecta secuencia CI020..024, ledger propio y MRP015-050 package-scoped', () => {
  const implementationControlSource = fs.readFileSync('scripts/docs/implementation-control.mjs', 'utf8');
  const implementationLifecycleSource = fs.readFileSync('scripts/docs/implementation-branch-lifecycle.mjs', 'utf8');
  const guardSource = fs.readFileSync('scripts/docs/implementation-correction-guard.mjs', 'utf8');
  assert.match(scannerSource, /PHYSICAL_STAGE_SEQUENCE_VIOLATION/u);
  assert.match(scannerSource, /MRP015_050_CANDIDATE_READY/u);
  assert.match(scannerSource, /recordInPackageCandidateEvidence/u);
  assert.match(implementationControlSource, /SHELL-CI-02\[1-4\]/u);
  assert.match(implementationControlSource, /TEMPLATE_PER_PACKAGE/u);
  assert.match(implementationLifecycleSource, /OWN_INSTANCE_LEDGER/u);
  assert.match(implementationLifecycleSource, /MRP015-050\/CANDIDATE_READY/u);
  assert.match(guardSource, /CONTINUE_PHYSICAL_LIFECYCLE/u);
});
