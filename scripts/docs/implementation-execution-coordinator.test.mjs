import assert from 'node:assert/strict';
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { spawnSync } from 'node:child_process';
import test from 'node:test';

import {
  candidateValidationState,
  classifyExecutionState,
  evaluateCandidatePreverifyReceipt,
  resolveExecutorInstanceId,
  validateExecutionEvidenceReceipt,
} from './implementation-execution-coordinator.mjs';
import {
  createCandidateValidationReceipt,
  fingerprintCandidateRepositoryState,
  validateCandidateValidationReceipt,
} from './implementation-validation-engine.mjs';

test('clasifica estados físicos en gates deterministas', () => {
  const cases = new Map([
    ['PENDING_AUTHORIZATION', 'AUTHORIZATION_GATE'],
    ['AUTHORIZED', 'START'],
    ['IN_PROGRESS', 'MATERIALIZATION_GATE'],
    ['BLOCKED', 'BLOCKED'],
    ['IMPLEMENTED', 'EVIDENCE_GATE'],
    ['VERIFIED', 'FINISH'],
    ['DEFERRED', 'DEFERRED'],
  ]);
  for (const [status, expected] of cases) {
    assert.equal(classifyExecutionState({ status }), expected);
  }
});

test('resuelve instance_id explícito o desde la acción coordinada', () => {
  assert.equal(
    resolveExecutorInstanceId({ explicitInstanceId: 'shell-ci-021::GAP-PKG-001' }),
    'SHELL-CI-021::GAP-PKG-001',
  );
  assert.equal(
    resolveExecutorInstanceId({
      coordinatedStatus: {
        coordinatedPrimaryAction: { target: 'SHELL-CI-022::GAP-PKG-001' },
      },
    }),
    'SHELL-CI-022::GAP-PKG-001',
  );
  assert.equal(
    resolveExecutorInstanceId({
      coordinatedStatus: {
        coordinatedPrimaryAction: { target: 'GAP-PKG-001' },
      },
    }),
    null,
  );
});

test('evidence receipt exige candidato, comandos y ambiente exactos', () => {
  const instance = {
    instance_id: 'SHELL-CI-021::GAP-PKG-001',
    validation_commands: ['npm test'],
    target_environments: [
      {
        environment_role: 'STAGING',
        target_type: 'SUPABASE_PROJECT_REF',
        target_id: 'project',
        owner: 'OWNER',
      },
    ],
  };
  const candidateCommit = 'a'.repeat(40);
  const receipt = {
    schema_version: 1,
    instance_id: instance.instance_id,
    candidate_commit: candidateCommit,
    observed_at: '2026-09-07T20:00:00Z',
    validation_commands: ['npm test'],
    results: [{ command: 'npm test', status: 'PASS' }],
    target_environments: instance.target_environments,
    environment_results: [
      {
        ...instance.target_environments[0],
        status: 'PASS',
        evidence: ['remote PASS'],
      },
    ],
    operational_evidence: ['readiness PASS'],
  };

  assert.equal(
    validateExecutionEvidenceReceipt({ instance, receipt, candidateCommit }),
    true,
  );

  assert.throws(
    () => validateExecutionEvidenceReceipt({
      instance,
      receipt: { ...receipt, candidate_commit: 'b'.repeat(40) },
      candidateCommit,
    }),
    /no corresponde al candidato/u,
  );

  assert.throws(
    () => validateExecutionEvidenceReceipt({
      instance,
      receipt: {
        ...receipt,
        environment_results: [{ ...receipt.environment_results[0], status: 'FAIL' }],
      },
      candidateCommit,
    }),
    /no esta PASS/u,
  );
});

function candidateFixture() {
  const instance = {
    instance_id: 'SHELL-CI-021::GAP-PKG-001',
    validation_commands: ['npm test', 'npm run docs:plan:check'],
  };
  const candidateCommit = 'c'.repeat(40);
  const repositoryStateSha256 = fingerprintCandidateRepositoryState({
    candidateCommit,
    gitStatus: ' M docs/example.txt',
    trackedDiff: 'diff --git a/docs/example.txt b/docs/example.txt',
    untrackedFiles: [{ path: 'tmp/evidence.json', objectSha: 'd'.repeat(40) }],
  });
  const toolchain = {
    nodeVersion: 'v24.0.0',
    platform: 'win32',
    arch: 'x64',
  };
  const receipt = createCandidateValidationReceipt({
    instanceId: instance.instance_id,
    candidateCommit,
    repositoryStateSha256,
    validationCommands: instance.validation_commands,
    toolchain,
    validatedAt: '2026-09-08T03:00:00Z',
  });
  return { instance, candidateCommit, repositoryStateSha256, toolchain, receipt };
}

test('F3 reutiliza PREVERIFY solo con fingerprint exacto de candidato, worktree, comandos y toolchain', () => {
  const fixture = candidateFixture();
  const result = validateCandidateValidationReceipt({
    receipt: fixture.receipt,
    instanceId: fixture.instance.instance_id,
    candidateCommit: fixture.candidateCommit,
    repositoryStateSha256: fixture.repositoryStateSha256,
    validationCommands: fixture.instance.validation_commands,
    toolchain: fixture.toolchain,
  });
  assert.deepEqual(result, {
    status: 'PASS',
    reusable: true,
    reason: 'EXACT_CANDIDATE_FINGERPRINT_MATCH',
  });
});

test('F3 invalida receipt si cambia candidato, worktree, comandos o toolchain', () => {
  const fixture = candidateFixture();
  const common = {
    receipt: fixture.receipt,
    instanceId: fixture.instance.instance_id,
    candidateCommit: fixture.candidateCommit,
    repositoryStateSha256: fixture.repositoryStateSha256,
    validationCommands: fixture.instance.validation_commands,
    toolchain: fixture.toolchain,
  };

  assert.equal(validateCandidateValidationReceipt({
    ...common,
    candidateCommit: 'e'.repeat(40),
  }).status, 'MISS');
  assert.equal(validateCandidateValidationReceipt({
    ...common,
    repositoryStateSha256: 'f'.repeat(64),
  }).status, 'MISS');
  assert.equal(validateCandidateValidationReceipt({
    ...common,
    validationCommands: [...fixture.instance.validation_commands, 'npm run quality:lint:ratchet'],
  }).status, 'MISS');
  assert.equal(validateCandidateValidationReceipt({
    ...common,
    toolchain: { ...fixture.toolchain, nodeVersion: 'v25.0.0' },
  }).status, 'MISS');
});

test('F3 invalida receipt si cambia la instancia y trata receipt ausente o malformado como MISS', () => {
  const fixture = candidateFixture();
  const common = {
    candidateCommit: fixture.candidateCommit,
    repositoryStateSha256: fixture.repositoryStateSha256,
    validationCommands: fixture.instance.validation_commands,
    toolchain: fixture.toolchain,
  };

  const otherInstance = validateCandidateValidationReceipt({
    receipt: fixture.receipt,
    instanceId: 'SHELL-CI-022::GAP-PKG-001',
    ...common,
  });
  assert.equal(otherInstance.status, 'MISS');
  assert.equal(otherInstance.reason, 'FINGERPRINT_MISMATCH:instanceId');

  const missing = validateCandidateValidationReceipt({
    receipt: null,
    instanceId: fixture.instance.instance_id,
    ...common,
  });
  assert.deepEqual(missing, { status: 'MISS', reusable: false, reason: 'RECEIPT_MISSING' });

  const malformed = validateCandidateValidationReceipt({
    receipt: { schemaVersion: 1 },
    instanceId: fixture.instance.instance_id,
    ...common,
  });
  assert.equal(malformed.status, 'MISS');
  assert.equal(malformed.reusable, false);
});

test('F3 invalida receipt alterado aunque conserve los fingerprints aparentes', () => {
  const fixture = candidateFixture();
  const tampered = structuredClone(fixture.receipt);
  tampered.validatedAt = '2026-09-08T03:01:00Z';
  const result = validateCandidateValidationReceipt({
    receipt: tampered,
    instanceId: fixture.instance.instance_id,
    candidateCommit: fixture.candidateCommit,
    repositoryStateSha256: fixture.repositoryStateSha256,
    validationCommands: fixture.instance.validation_commands,
    toolchain: fixture.toolchain,
  });
  assert.equal(result.status, 'MISS');
  assert.equal(result.reason, 'RECEIPT_INTEGRITY_MISMATCH');
});

test('accelerator consume el receipt dentro de la solicitud existente y hace fallback completo al faltar', () => {
  const fixture = candidateFixture();
  const candidateState = {
    candidateCommit: fixture.candidateCommit,
    repositoryStateSha256: fixture.repositoryStateSha256,
    validationCommands: fixture.instance.validation_commands,
    toolchain: fixture.toolchain,
  };
  const hit = evaluateCandidatePreverifyReceipt({
    instance: fixture.instance,
    request: { validation_engine_preverify_receipt: fixture.receipt },
    candidateState,
  });
  assert.equal(hit.status, 'PASS');
  assert.equal(hit.reusable, true);

  const miss = evaluateCandidatePreverifyReceipt({
    instance: fixture.instance,
    request: null,
    candidateState,
  });
  assert.equal(miss.status, 'MISS');
  assert.equal(miss.reusable, false);
});


test('candidateValidationState cambia ante delta tracked o untracked real', () => {
  const root = fs.mkdtempSync(path.join(os.tmpdir(), 'vento-f3-candidate-'));
  const runGit = (args) => {
    const result = spawnSync('git', args, { cwd: root, encoding: 'utf8' });
    assert.equal(result.status, 0, result.stderr || result.stdout);
  };
  runGit(['init', '-q']);
  runGit(['config', 'user.email', 'test@vento.local']);
  runGit(['config', 'user.name', 'Vento Test']);
  fs.writeFileSync(path.join(root, 'tracked.txt'), 'base\n', 'utf8');
  runGit(['add', 'tracked.txt']);
  runGit(['commit', '-qm', 'base']);

  const instance = { instance_id: 'SHELL-CI-021::GAP-PKG-001', validation_commands: ['npm test'] };
  const base = candidateValidationState(root, instance);

  fs.writeFileSync(path.join(root, 'tracked.txt'), 'changed\n', 'utf8');
  const tracked = candidateValidationState(root, instance);
  assert.notEqual(tracked.repositoryStateSha256, base.repositoryStateSha256);

  runGit(['checkout', '--', 'tracked.txt']);
  fs.writeFileSync(path.join(root, 'untracked.txt'), 'one\n', 'utf8');
  const untrackedOne = candidateValidationState(root, instance);
  fs.writeFileSync(path.join(root, 'untracked.txt'), 'two\n', 'utf8');
  const untrackedTwo = candidateValidationState(root, instance);
  assert.notEqual(untrackedOne.repositoryStateSha256, untrackedTwo.repositoryStateSha256);
});

test('F3 integra receipt en evidence-request, mantiene fallback y no toca gates dinámicos finales', () => {
  const source = fs.readFileSync(new URL('./implementation-execution-coordinator.mjs', import.meta.url), 'utf8');
  assert.match(source, /validation_engine_preverify_receipt: preverifyReceipt/u);
  assert.match(source, /if \(preverifyReceipt\.status === 'PASS'\)/u);
  assert.match(source, /PREVERIFY no reutilizable .* se ejecuta completo/u);
  assert.match(source, /runCanonicalLifecycle\(root, 'docs:implementation:preverify', id\)/u);
  assert.match(source, /validateExecutionEvidenceReceipt\(\{ instance: refreshed, receipt, candidateCommit \}\)/u);
  assert.match(source, /runCanonicalLifecycle\(root, 'docs:implementation:finish', instanceId\)/u);

  const sealStart = source.indexOf('async function sealVerifiedEvidence');
  const sealEnd = source.indexOf('async function printStatus', sealStart);
  const seal = source.slice(sealStart, sealEnd);
  assert.doesNotMatch(seal, /ensureCurrentMainContained\(/u);
  assert.doesNotMatch(seal, /ensureImplementationBranch\(/u);
});
