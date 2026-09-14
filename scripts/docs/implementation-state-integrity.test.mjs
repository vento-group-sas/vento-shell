import assert from 'node:assert/strict';
import { spawnSync } from 'node:child_process';
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import test from 'node:test';

import {
  IMPLEMENTATION_MUTATING_ENTRYPOINT,
  IMPLEMENTATION_STATE_INTEGRITY_MODEL_ID,
  deriveImplementationStateFacts,
  evaluateImplementationStateIntegrity,
  isVerifiedResumeDeltaAllowed,
  resolveImplementationCandidateLifecycle,
  rejectDirectImplementationLifecycleEntry,
  verifiedLedgerTransitionCompatible,
} from './implementation-state-integrity.mjs';

const baseInstance = (status) => ({
  instance_id: 'SHELL-CI-020::GAP-PKG-018',
  task_id: 'SHELL-CI-020',
  status,
  target_repositories: ['vento-group-sas/vento-shell'],
  authorized_changes: [{ repo: 'vento-group-sas/vento-shell', path: 'x', change: 'MODIFY' }],
  validation_commands: ['node --test x.test.mjs'],
  authorization: { decision: 'APPROVED' },
  evidence: [],
});

const validFacts = () => ({
  authorization_valid: true,
  implementation_branch_present: true,
  local_validation_complete: true,
  local_validation_missing: [],
  candidate_gate_pass: true,
  candidate_gate_detail: 'PASS',
  verification_evidence_present: true,
  verification_receipt_valid: true,
  grandfathered_verified: false,
  stale_evidence: [],
  verification_missing: [],
});

test('expone el modelo y exactamente los ocho campos canonicos', () => {
  assert.equal(IMPLEMENTATION_STATE_INTEGRITY_MODEL_ID, 'VENTO-IMPLEMENTATION-STATE-INTEGRITY-V1');
  const result = evaluateImplementationStateIntegrity({
    instance: baseInstance('AUTHORIZED'),
    facts: validFacts(),
  });
  assert.deepEqual(Object.keys(result), [
    'declared_status',
    'highest_valid_status',
    'status_valid',
    'missing_prerequisites',
    'stale_evidence',
    'next_legal_transition',
    'recoverable',
    'recovery_action',
  ]);
});

test('VERIFIED moderno valido conserva cierre como siguiente transicion', () => {
  const result = evaluateImplementationStateIntegrity({
    instance: baseInstance('VERIFIED'),
    facts: validFacts(),
  });
  assert.equal(result.highest_valid_status, 'VERIFIED');
  assert.equal(result.status_valid, true);
  assert.equal(result.next_legal_transition, 'FINISH');
});

test('VERIFIED imposible degrada logicamente a IN_PROGRESS sin reescribir el ledger', () => {
  const facts = validFacts();
  facts.local_validation_complete = false;
  facts.local_validation_missing = ['LOCAL_VALIDATION_MISSING:node --test x.test.mjs'];
  facts.verification_evidence_present = false;
  facts.verification_receipt_valid = false;
  facts.verification_missing = ['VERIFICATION_EVIDENCE_MISSING'];
  const instance = baseInstance('VERIFIED');
  const before = JSON.stringify(instance);
  const result = evaluateImplementationStateIntegrity({ instance, facts });
  assert.equal(result.highest_valid_status, 'IN_PROGRESS');
  assert.equal(result.status_valid, false);
  assert.equal(result.recoverable, true);
  assert.equal(
    result.recovery_action,
    'RECONCILE_DECLARED_STATUS_TO_IN_PROGRESS_THEN_MATERIALIZE_VALIDATE_AND_SEAL_CANDIDATE',
  );
  assert.equal(JSON.stringify(instance), before);
});

test('separa evidencia stale de prerrequisitos faltantes', () => {
  const facts = validFacts();
  facts.local_validation_complete = false;
  facts.local_validation_missing = ['LOCAL_VALIDATION_MISSING:node --test x.test.mjs'];
  facts.stale_evidence = ['LOCAL_VALIDATION_CANDIDATE_MISMATCH:node --test x.test.mjs'];
  const result = evaluateImplementationStateIntegrity({
    instance: baseInstance('IMPLEMENTED'),
    facts,
  });
  assert.deepEqual(result.stale_evidence, [
    'LOCAL_VALIDATION_CANDIDATE_MISMATCH:node --test x.test.mjs',
  ]);
  assert.ok(result.missing_prerequisites.includes('LOCAL_VALIDATION_MISSING:node --test x.test.mjs'));
});

// CORR015_HISTORICAL_VERIFIED_TERMINAL_REGRESSION
test('VERIFIED historico exacto en main es terminal aunque no exista lifecycle activo', () => {
  const facts = validFacts();
  facts.implementation_branch_present = false;
  facts.local_validation_complete = false;
  facts.local_validation_missing = ['LOCAL_VALIDATION_EVIDENCE_INCOMPLETE'];
  facts.verification_evidence_present = false;
  facts.verification_receipt_valid = false;
  facts.verification_missing = ['VERIFICATION_EVIDENCE_MISSING'];
  facts.stale_evidence = ['LEGACY_ACTIVE_EVIDENCE_MUST_NOT_REOPEN_HISTORY'];
  facts.grandfathered_verified = true;

  const result = evaluateImplementationStateIntegrity({
    instance: baseInstance('VERIFIED'),
    facts,
  });

  assert.equal(result.declared_status, 'VERIFIED');
  assert.equal(result.highest_valid_status, 'VERIFIED');
  assert.equal(result.status_valid, true);
  assert.deepEqual(result.missing_prerequisites, []);
  assert.deepEqual(result.stale_evidence, []);
  assert.equal(result.next_legal_transition, 'NONE');
  assert.equal(result.recoverable, false);
  assert.equal(result.recovery_action, 'NONE');
});

test('VERIFIED divergente conserva fail closed y no recibe terminal historico', () => {
  const facts = validFacts();
  facts.implementation_branch_present = false;
  facts.local_validation_complete = false;
  facts.local_validation_missing = ['LOCAL_VALIDATION_EVIDENCE_INCOMPLETE'];
  facts.verification_evidence_present = false;
  facts.verification_receipt_valid = false;
  facts.grandfathered_verified = false;

  const result = evaluateImplementationStateIntegrity({
    instance: baseInstance('VERIFIED'),
    facts,
  });

  assert.equal(result.highest_valid_status, 'AUTHORIZED');
  assert.equal(result.status_valid, false);
  assert.ok(result.missing_prerequisites.includes('IMPLEMENTATION_BRANCH_MISSING'));
});

test('evidencia posterior no salta la transicion del estado declarado', () => {
  const result = evaluateImplementationStateIntegrity({
    instance: baseInstance('AUTHORIZED'),
    facts: validFacts(),
  });
  assert.equal(result.highest_valid_status, 'VERIFIED');
  assert.equal(result.status_valid, true);
  assert.equal(result.next_legal_transition, 'START');
});

test('estado desconocido falla cerrado', () => {
  const result = evaluateImplementationStateIntegrity({
    instance: baseInstance('MAGIC_DONE'),
    facts: validFacts(),
  });
  assert.equal(result.status_valid, false);
  assert.equal(result.recoverable, false);
  assert.equal(result.next_legal_transition, 'NONE');
  assert.deepEqual(result.missing_prerequisites, ['DECLARED_STATUS_UNKNOWN']);
});

test('coordinador y lifecycle imponen integridad antes de transiciones mutantes', () => {
  const coordinator = fs.readFileSync('scripts/docs/implementation-execution-coordinator.mjs', 'utf8');
  const lifecycle = fs.readFileSync('scripts/docs/implementation-branch-lifecycle.mjs', 'utf8');

  assert.match(coordinator, /assessImplementationStateIntegrity/u);
  assert.match(coordinator, /function assertCoordinatorStateIntegrity/u);
  assert.match(coordinator, /STATE_INTEGRITY_VIOLATION/u);
  const advanceIndex = coordinator.indexOf('async function advance');
  const integrityIndex = coordinator.indexOf('assertCoordinatorStateIntegrity', advanceIndex);
  const classifyIndex = coordinator.indexOf('classifyExecutionState(instance)', advanceIndex);
  assert.ok(advanceIndex >= 0 && integrityIndex > advanceIndex && classifyIndex > integrityIndex);

  assert.match(lifecycle, /assessImplementationStateIntegrity/u);
  assert.match(lifecycle, /function assertLifecycleStateIntegrity/u);
  assert.match(lifecycle, /assertLifecycleStateIntegrity\(root, instance, 'AUTHORIZED'\)/u);
  assert.match(lifecycle, /assertLifecycleStateIntegrity\(root, instance, 'IMPLEMENTED'\)/u);
  assert.match(lifecycle, /assertLifecycleStateIntegrity\(root, instance, 'VERIFIED'\)/u);
});

test('advance es la unica entrada mutante normal', () => {
  assert.equal(IMPLEMENTATION_MUTATING_ENTRYPOINT, 'docs:implementation:advance');
  for (const entry of ['START', 'PREVERIFY', 'FINISH']) {
    assert.throws(
      () => rejectDirectImplementationLifecycleEntry(entry),
      new RegExp(`DIRECT_IMPLEMENTATION_ENTRY_DISABLED:${entry}`, 'u'),
    );
  }

  const coordinator = fs.readFileSync('scripts/docs/implementation-execution-coordinator.mjs', 'utf8');
  const lifecycle = fs.readFileSync('scripts/docs/implementation-branch-lifecycle.mjs', 'utf8');
  const guard = fs.readFileSync('scripts/docs/implementation-correction-guard.mjs', 'utf8');

  assert.match(coordinator, /startImplementationGuarded/u);
  assert.match(coordinator, /preverifyImplementation/u);
  assert.match(coordinator, /finishImplementation/u);
  assert.match(coordinator, /await runCanonicalLifecycle/u);
  assert.doesNotMatch(coordinator, /npm\(\[\s*'run', '--silent', scriptName/u);
  assert.match(guard, /rejectDirectImplementationLifecycleEntry\('START'\)/u);
  assert.match(lifecycle, /rejectDirectImplementationLifecycleEntry\(args\.mode\)/u);
  assert.match(lifecycle, /docs:implementation:advance -- --instance-id/u);
  assert.doesNotMatch(lifecycle, /console\.log\('  npm run docs:implementation:start/u);
});


test('resume VERIFIED conserva candidato sellado solo con delta de lifecycle derivado', () => {
  const instanceId = 'SHELL-CI-020::GAP-PKG-018';
  const ownLedger = 'docs/plan-canonico/modular/implementation-instances/SHELL-CI-020__GAP-PKG-018.json';
  const pendingPath = 'docs/plan-canonico/modular/implementation-instances/SHELL-CI-021__GAP-PKG-018.json';
  const pending = {
    instance_id: 'SHELL-CI-021::GAP-PKG-018',
    task_id: 'SHELL-CI-021',
    status: 'PENDING_AUTHORIZATION',
    target_repositories: [],
    authorized_changes: [],
    validation_commands: [],
    authorization: null,
    evidence: [],
  };

  assert.equal(isVerifiedResumeDeltaAllowed({
    instanceId,
    changedPaths: [
      ownLedger,
      'docs/plan-canonico/modular/00_CABECERA_Y_ESTADO.md',
      pendingPath,
    ],
    pendingRecords: { [pendingPath]: pending },
  }), true);

  assert.equal(isVerifiedResumeDeltaAllowed({
    instanceId,
    changedPaths: [ownLedger, 'src/app/page.tsx'],
    pendingRecords: {},
  }), false);

  assert.equal(isVerifiedResumeDeltaAllowed({
    instanceId,
    changedPaths: [ownLedger, pendingPath],
    pendingRecords: {
      [pendingPath]: { ...pending, authorized_changes: [{ path: 'x' }] },
    },
  }), false);
});

test('resume VERIFIED solo permite cambiar status y evidence del ledger sellado', () => {
  const candidateLedger = baseInstance('IN_PROGRESS');
  const verifiedLedger = {
    ...candidateLedger,
    status: 'VERIFIED',
    evidence: [{
      type: 'IMPLEMENTATION_EXECUTION_EVIDENCE_V1',
      candidate_commit: 'a'.repeat(40),
    }],
  };

  assert.equal(verifiedLedgerTransitionCompatible({
    candidateLedger,
    verifiedLedger,
    instance: verifiedLedger,
  }), true);

  const mutated = {
    ...verifiedLedger,
    validation_commands: ['node --test other.test.mjs'],
  };
  assert.equal(verifiedLedgerTransitionCompatible({
    candidateLedger,
    verifiedLedger: mutated,
    instance: mutated,
  }), false);
});

test('resume VERIFIED usa el clasificador de impacto para aceptar integration tooling gobernado', () => {
  const source = fs.readFileSync('scripts/docs/implementation-state-integrity.mjs', 'utf8');
  const resolver = source.indexOf('function resolveVerifiedResumeCandidate');
  const classifier = source.indexOf('classifyImplementationIntegrationImpact({', resolver);
  const packageBefore = source.indexOf("readGitJson(root, candidate, 'package.json')", resolver);
  const packageAfter = source.indexOf("readGitJson(root, branchTip, 'package.json')", resolver);
  const reuse = source.indexOf("impact.decision === 'REUSE_PHYSICAL_EVIDENCE'", resolver);
  assert.match(
    source,
    /import \{ classifyImplementationIntegrationImpact \} from '\.\/implementation-integration-impact\.mjs';/u,
  );
  assert.ok(resolver >= 0);
  assert.ok(classifier > resolver);
  assert.ok(packageBefore > resolver);
  assert.ok(packageAfter > packageBefore);
  assert.ok(reuse > classifier);
});

test('checkpoint lifecycle conserva IMPLEMENTED sin revalidar candidato fisico', (t) => {
  const root = fs.mkdtempSync(path.join(os.tmpdir(), 'vento-candidate-lifecycle-'));
  t.after(() => fs.rmSync(root, { recursive: true, force: true }));
  const git = (...args) => {
    const result = spawnSync('git', args, {
      cwd: root,
      encoding: 'utf8',
      windowsHide: true,
      stdio: ['ignore', 'pipe', 'pipe'],
    });
    assert.equal(result.status, 0, result.stderr || result.stdout);
    return String(result.stdout ?? '').trim();
  };
  git('init', '-b', 'main');
  git('config', 'user.name', 'Test');
  git('config', 'user.email', 'test@example.invalid');
  git('switch', '-c', 'implementation/shell-ci-021/gap-pkg-018');

  const ledgerPath = path.join(
    root,
    'docs/plan-canonico/modular/implementation-instances/SHELL-CI-021__GAP-PKG-018.json',
  );
  const headerPath = path.join(root, 'docs/plan-canonico/modular/00_CABECERA_Y_ESTADO.md');
  fs.mkdirSync(path.dirname(ledgerPath), { recursive: true });
  const candidateLedger = {
    instance_id: 'SHELL-CI-021::GAP-PKG-018',
    task_id: 'SHELL-CI-021',
    status: 'IN_PROGRESS',
    target_repositories: ['vento-group-sas/vento-shell'],
    authorized_changes: [{ repo: 'vento-group-sas/vento-shell', path: 'ledger', change: 'MODIFY' }],
    validation_commands: ['node --test x.test.mjs'],
    authorization: { decision: 'APPROVED' },
    evidence: [],
    target_environments: [{ environment_role: 'STAGING', target_id: 'staging', target_type: 'SUPABASE_PROJECT_REF', owner: 'OWNER' }],
  };
  fs.writeFileSync(ledgerPath, `${JSON.stringify(candidateLedger, null, 2)}\n`);
  fs.writeFileSync(headerPath, 'candidate\n');
  git('add', '.');
  git('commit', '-m', 'candidate');
  const candidate = git('rev-parse', 'HEAD');

  const implemented = {
    ...candidateLedger,
    status: 'IMPLEMENTED',
    evidence: [
      `LOCAL_VALIDATION candidate=${candidate} command=node --test x.test.mjs status=PASS`,
    ],
  };
  fs.writeFileSync(ledgerPath, `${JSON.stringify(implemented, null, 2)}\n`);
  fs.writeFileSync(headerPath, 'lifecycle\n');
  git('add', '.');
  git('commit', '-m', 'lifecycle checkpoint');
  const lifecycle = git('rev-parse', 'HEAD');

  const identity = resolveImplementationCandidateLifecycle({
    root,
    instance: implemented,
    branchTip: lifecycle,
  });
  assert.equal(identity.status, 'PASS');
  assert.equal(identity.candidate_commit, candidate);
  assert.equal(identity.lifecycle_head_commit, lifecycle);
  assert.equal(identity.decision, 'REUSE_PHYSICAL_EVIDENCE');

  const facts = deriveImplementationStateFacts({
    root,
    instance: implemented,
    readiness: null,
    branchPresent: true,
    candidateGateStatus: 'PASS',
    historicalVerified: false,
  });
  assert.equal(facts.candidate_commit, candidate);
  assert.equal(facts.local_validation_complete, true);
  const integrity = evaluateImplementationStateIntegrity({ instance: implemented, facts });
  assert.equal(integrity.status_valid, true);
  assert.equal(integrity.highest_valid_status, 'IMPLEMENTED');

  fs.mkdirSync(path.join(root, 'src'), { recursive: true });
  fs.writeFileSync(path.join(root, 'src', 'product.ts'), 'export const changed = true;\n');
  git('add', '.');
  git('commit', '-m', 'material delta');
  const unsafe = resolveImplementationCandidateLifecycle({
    root,
    instance: implemented,
    branchTip: git('rev-parse', 'HEAD'),
  });
  assert.equal(unsafe.status, 'INVALID');
  assert.equal(unsafe.decision, 'REVALIDATE_PHYSICAL');
});
