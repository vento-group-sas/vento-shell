import assert from 'node:assert/strict';
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { spawnSync } from 'node:child_process';
import test from 'node:test';

import {
  assessAuthorizedMaterialization,
  buildMachineObservableExecutionEvidence,
  candidateValidationState,
  evaluateCandidateRepairReceipt,
  classifyExecutionState,
  evaluateCandidatePreverifyReceipt,
  resolveExecutorInstanceId,
  runValidationCommandsWithPolicy,
  runValidationCommandsWithShadow,
  validateExecutionEvidenceReceipt,
} from './implementation-execution-coordinator.mjs';
import {
  assessSafeSelectiveExecution,
  buildShadowImpactPlan,
  createCandidateRepairReceipt,
  createCandidateValidationReceipt,
  createSafeSelectiveValidationRecord,
  deriveSafeSelectiveCertification,
  fingerprintCandidateRepositoryState,
  IMPLEMENTATION_SAFE_SELECTIVE_CERTIFICATION,
  observeShadowImpact,
  validateCandidateRepairReceipt,
  validateCandidateValidationReceipt,
  validateSafeSelectiveValidationRecord,
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
  assert.match(source, /validateExecutionEvidenceReceipt\(\{\s*instance: refreshed,\s*receipt,\s*candidateCommit,\s*certification,\s*\}\)/u);
  assert.match(source, /runCanonicalLifecycle\(root, 'docs:implementation:finish', instanceId\)/u);

  const sealStart = source.indexOf('async function sealVerifiedEvidence');
  const sealEnd = source.indexOf('async function printStatus', sealStart);
  const seal = source.slice(sealStart, sealEnd);
  assert.doesNotMatch(seal, /ensureCurrentMainContained\(/u);
  assert.doesNotMatch(seal, /ensureImplementationBranch\(/u);
});


test('F4 shadow selecciona por dominio y conserva validadores globales', () => {
  const plan = buildShadowImpactPlan({
    changedPaths: ['docs/plan-canonico/modular/bloques/H2_SHELL_APP/example.md'],
    validationCommands: [
      'npm run docs:plan:check',
      'npm run supabase:db:test:clean',
      'npm test --silent',
      'node custom-validator.mjs',
    ],
  });
  assert.equal(plan.phase, 'F4_SHADOW_IMPACT_SELECTION');
  assert.equal(plan.selectiveExecution, false);
  assert.equal(plan.fullValidationRequired, true);
  assert.equal(plan.validationGatesSkipped, 0);
  assert.deepEqual(plan.selectedCommands, [
    'npm run docs:plan:check',
    'npm test --silent',
    'node custom-validator.mjs',
  ]);
  assert.deepEqual(plan.omittedCommands, ['npm run supabase:db:test:clean']);
});

test('F4 shadow usa package identity y default conservador', () => {
  const plan = buildShadowImpactPlan({
    changedPaths: ['tests/packages/GAP-PKG-002/contract.test.ts'],
    validationCommands: [
      'node --test tests/packages/GAP-PKG-001/contract.test.ts',
      'node --test tests/packages/GAP-PKG-002/contract.test.ts',
      'git diff --check',
      'node scripts/quality/unknown-validator.mjs',
    ],
  });
  assert.deepEqual(plan.omittedCommands, [
    'node --test tests/packages/GAP-PKG-001/contract.test.ts',
  ]);
  assert.deepEqual(plan.selectedCommands, [
    'node --test tests/packages/GAP-PKG-002/contract.test.ts',
    'git diff --check',
    'node scripts/quality/unknown-validator.mjs',
  ]);
});

test('F4 shadow sin changed paths selecciona suite completa', () => {
  const commands = ['npm run docs:plan:check', 'npm run supabase:db:test:clean'];
  const plan = buildShadowImpactPlan({ changedPaths: [], validationCommands: commands });
  assert.deepEqual(plan.selectedCommands, commands);
  assert.deepEqual(plan.omittedCommands, []);
  assert.equal(plan.potentialReductionPercent, 0);
});

test('F4 observación compara contra la suite completa y detecta falsos negativos', () => {
  const plan = buildShadowImpactPlan({
    changedPaths: ['docs/example.md'],
    validationCommands: ['npm run docs:plan:check', 'npm run supabase:db:test:clean'],
  });
  const pass = observeShadowImpact({
    plan,
    results: [
      { command: 'npm run docs:plan:check', status: 'PASS' },
      { command: 'npm run supabase:db:test:clean', status: 'PASS' },
    ],
  });
  assert.equal(pass.fullSuiteExecuted, true);
  assert.equal(pass.observedFalseNegativeCount, 0);
  assert.equal(pass.eligibleForSelectiveExecution, false);

  const miss = observeShadowImpact({
    plan,
    results: [
      { command: 'npm run docs:plan:check', status: 'PASS' },
      { command: 'npm run supabase:db:test:clean', status: 'FAIL' },
    ],
  });
  assert.equal(miss.fullSuiteStatus, 'FAIL');
  assert.equal(miss.observedFalseNegativeCount, 1);
  assert.deepEqual(miss.observedFalseNegatives, ['npm run supabase:db:test:clean']);
});

test('F4 accelerator ejecuta todos los comandos aunque shadow proponga omitir', () => {
  const commands = [
    'npm run docs:plan:check',
    'npm run supabase:db:test:clean',
    'npm test --silent',
  ];
  const executed = [];
  const result = runValidationCommandsWithShadow({
    root: '/repo',
    changedPaths: ['docs/example.md'],
    validationCommands: commands,
    runner: (_root, command) => executed.push(command),
  });
  assert.deepEqual(executed, commands);
  assert.equal(result.plan.omittedCommandCount, 1);
  assert.equal(result.observation.fullSuiteExecuted, true);
  assert.equal(result.observation.validationGatesSkipped, 0);
});

test('F4 accelerator identifica fallo de un validator shadow-omitido sin convertirlo en skip', () => {
  const failing = 'npm run supabase:db:test:clean';
  assert.throws(
    () => runValidationCommandsWithShadow({
      root: '/repo',
      changedPaths: ['docs/example.md'],
      validationCommands: ['npm run docs:plan:check', failing],
      runner: (_root, command) => {
        if (command === failing) throw new Error('synthetic failure');
      },
    }),
    (error) => {
      assert.equal(error.message, 'synthetic failure');
      assert.equal(error.shadowImpact.classification, 'SHADOW_FALSE_NEGATIVE');
      assert.equal(error.shadowImpact.selected, false);
      return true;
    },
  );
});

test('F4 se persiste solo como observación en evidence-request y no habilita ejecución selectiva', () => {
  const source = fs.readFileSync(new URL('./implementation-execution-coordinator.mjs', import.meta.url), 'utf8');
  assert.match(source, /validation_engine_shadow_impact: shadowImpact/u);
  assert.match(source, /runValidationCommandsWithShadow\(\{/u);
  assert.match(source, /for \(const entry of plan\.entries\)/u);
  assert.match(source, /VALIDATION_GATES_SKIPPED: 0/u);
  assert.doesNotMatch(source, /for \(const command of plan\.selectedCommands\)/u);
});


test('F4 rechaza observación incompleta o plan alterado', () => {
  const plan = buildShadowImpactPlan({
    changedPaths: ['docs/example.md'],
    validationCommands: ['npm run docs:plan:check', 'npm run supabase:db:test:clean'],
  });
  assert.throws(
    () => observeShadowImpact({
      plan,
      results: [{ command: 'npm run docs:plan:check', status: 'PASS' }],
    }),
    /suite completa/u,
  );

  const tampered = structuredClone(plan);
  tampered.omittedCommandCount += 1;
  assert.throws(
    () => observeShadowImpact({
      plan: tampered,
      results: [
        { command: 'npm run docs:plan:check', status: 'PASS' },
        { command: 'npm run supabase:db:test:clean', status: 'PASS' },
      ],
    }),
    /integridad SHA-256/u,
  );
});

test('F4 expone el diagnóstico shadow en el resultado de fallo sin cambiar fail-fast', () => {
  const source = fs.readFileSync(new URL('./implementation-execution-coordinator.mjs', import.meta.url), 'utf8');
  assert.match(source, /SHADOW_IMPACT: shadowImpact\?\.classification \?\? 'NONE'/u);
  assert.match(source, /SHADOW_COMMAND: shadowImpact\?\.command \?\? 'NONE'/u);
  assert.match(source, /SHADOW_SELECTED: shadowImpact \? \(shadowImpact\.selected \? 'SI' : 'NO'\) : 'N\/A'/u);
});



function shadowCertificationFixture() {
  const packageIds = [
    'GAP-PKG-001',
    'GAP-PKG-002',
    'GAP-PKG-003',
    'GAP-PKG-001',
    'GAP-PKG-002',
  ];
  const instances = packageIds.map((packageId, index) => {
    const other = packageId === 'GAP-PKG-001' ? 'GAP-PKG-009' : 'GAP-PKG-001';
    const plan = buildShadowImpactPlan({
      changedPaths: [`tests/packages/${packageId}/contract.test.ts`],
      validationCommands: [
        `node --test tests/packages/${packageId}/contract.test.ts`,
        `node --test tests/packages/${other}/contract.test.ts`,
        'git diff --check',
      ],
    });
    const observation = observeShadowImpact({
      plan,
      results: plan.fullCommands.map((command) => ({ command, status: 'PASS' })),
    });
    return {
      instanceId: `SHELL-CI-${String(20 + index).padStart(3, '0')}::${packageId}`,
      status: 'VERIFIED',
      authorizedChanges: [
        {
          repo: 'vento-group-sas/vento-shell',
          path: `tests/packages/${packageId}/contract.test.ts`,
          change: 'CREATE',
        },
        {
          repo: 'vento-group-sas/vento-shell',
          path: `docs/plan-canonico/modular/implementation-instances/SHELL-CI-${String(20 + index).padStart(3, '0')}__${packageId}.json`,
          change: 'MODIFY',
        },
      ],
      evidence: [{
        type: 'IMPLEMENTATION_EXECUTION_EVIDENCE_V1',
        validation_engine_shadow_impact: observation,
      }],
    };
  });
  return deriveSafeSelectiveCertification({ instances });
}

const certifiedF5 = shadowCertificationFixture();


test('F5 deriva certificacion automaticamente desde evidencia F4 VERIFIED', () => {
  assert.equal(certifiedF5.status, 'CERTIFIED');
  assert.equal(certifiedF5.observedOmissionBearingSamples, 5);
  assert.equal(certifiedF5.observedDistinctPackages, 3);
  assert.equal(certifiedF5.observedFalseNegatives, 0);
  assert.deepEqual(certifiedF5.distinctPackageIds, [
    'GAP-PKG-001',
    'GAP-PKG-002',
    'GAP-PKG-003',
  ]);
  assert.match(certifiedF5.certificationSha256, /^[a-f0-9]{64}$/u);
});

test('F5 cuenta como maximo una muestra por instancia VERIFIED', () => {
  const packageId = 'GAP-PKG-001';
  const plan = buildShadowImpactPlan({
    changedPaths: [`tests/packages/${packageId}/contract.test.ts`],
    validationCommands: [
      `node --test tests/packages/${packageId}/contract.test.ts`,
      'node --test tests/packages/GAP-PKG-009/contract.test.ts',
    ],
  });
  const observation = observeShadowImpact({
    plan,
    results: plan.fullCommands.map((command) => ({ command, status: 'PASS' })),
  });
  const certification = deriveSafeSelectiveCertification({
    instances: [{
      instanceId: `SHELL-CI-020::${packageId}`,
      status: 'VERIFIED',
      authorizedChanges: [{
        repo: 'vento-group-sas/vento-shell',
        path: `tests/packages/${packageId}/contract.test.ts`,
        change: 'CREATE',
      }],
      evidence: [
        { validation_engine_shadow_impact: observation },
        { validation_engine_shadow_impact: observation },
      ],
    }],
  });
  assert.equal(certification.observedOmissionBearingSamples, 1);
  assert.equal(certification.observedDistinctPackages, 1);
});

test('F5 no certifica evidencia shadow de una instancia VERIFIED con alcance transversal', () => {
  const packageId = 'GAP-PKG-001';
  const plan = buildShadowImpactPlan({
    changedPaths: [`tests/packages/${packageId}/contract.test.ts`],
    validationCommands: [
      `node --test tests/packages/${packageId}/contract.test.ts`,
      'node --test tests/packages/GAP-PKG-009/contract.test.ts',
    ],
  });
  const observation = observeShadowImpact({
    plan,
    results: plan.fullCommands.map((command) => ({ command, status: 'PASS' })),
  });
  const certification = deriveSafeSelectiveCertification({
    instances: [{
      instanceId: `SHELL-CI-020::${packageId}`,
      status: 'VERIFIED',
      authorizedChanges: [
        {
          repo: 'vento-group-sas/vento-shell',
          path: 'supabase/functions/shift-runtime-processor/index.ts',
          change: 'MODIFY',
        },
        {
          repo: 'vento-group-sas/vento-shell',
          path: `tests/packages/${packageId}/contract.test.ts`,
          change: 'CREATE',
        },
      ],
      evidence: [{ validation_engine_shadow_impact: observation }],
    }],
  });
  assert.equal(certification.status, 'PENDING_REAL_SHADOW_EVIDENCE');
  assert.equal(certification.observedOmissionBearingSamples, 0);
  assert.equal(certification.observedDistinctPackages, 0);
});

test('F5 identifica candidato closed-scope pero mantiene full fallback sin certificacion shadow real', () => {
  const plan = buildShadowImpactPlan({
    changedPaths: [
      'tests/packages/GAP-PKG-002/contract.test.ts',
      'supabase/tests/packages/GAP-PKG-002.sql',
      'docs/plan-canonico/modular/implementation-instances/SHELL-CI-021__GAP-PKG-002.json',
    ],
    validationCommands: [
      'node --test tests/packages/GAP-PKG-001/contract.test.ts',
      'node --test tests/packages/GAP-PKG-002/contract.test.ts',
      'npm exec -- supabase test db supabase/tests/packages/GAP-PKG-002.sql',
      'git diff --check',
    ],
  });
  const pending = assessSafeSelectiveExecution({ plan });
  assert.equal(pending.candidateEligible, true);
  assert.equal(pending.selectiveExecution, false);
  assert.equal(pending.fullFallback, true);
  assert.equal(pending.packageId, 'GAP-PKG-002');
  assert.equal(pending.reason, 'FULL_FALLBACK_SHADOW_CERTIFICATION_PENDING');
  assert.equal(pending.certificationStatus, 'PENDING_REAL_SHADOW_EVIDENCE');
  assert.deepEqual(pending.executedCommands, plan.fullCommands);
  assert.deepEqual(pending.notApplicableCommands, []);

  const certified = assessSafeSelectiveExecution({ plan, certification: certifiedF5 });
  assert.equal(certified.selectiveExecution, true);
  assert.equal(certified.fullFallback, false);
  assert.equal(certified.reason, 'SAFE_PACKAGE_LOCAL_CLOSED_SCOPE_CERTIFIED');
  assert.deepEqual(certified.notApplicableCommands, [
    'node --test tests/packages/GAP-PKG-001/contract.test.ts',
  ]);
  assert.match(certified.decisionSha256, /^[a-f0-9]{64}$/u);
});

test('F5 usa full fallback ante cualquier path transversal aunque el shadow proponga omitir', () => {
  const plan = buildShadowImpactPlan({
    changedPaths: [
      'supabase/functions/shift-runtime-processor/index.ts',
      'tests/packages/GAP-PKG-001/contract.test.ts',
    ],
    validationCommands: [
      'node --test tests/packages/GAP-PKG-001/contract.test.ts',
      'node --test tests/packages/GAP-PKG-002/contract.test.ts',
      'npm test --silent',
    ],
  });
  const decision = assessSafeSelectiveExecution({ plan });
  assert.equal(decision.selectiveExecution, false);
  assert.equal(decision.fullFallback, true);
  assert.match(decision.reason, /^FULL_FALLBACK_CROSS_CUTTING_PATH:/u);
  assert.deepEqual(decision.executedCommands, plan.fullCommands);
  assert.deepEqual(decision.notApplicableCommands, []);
});

test('F5 usa full fallback para multiples packages o ausencia de validator del package actual', () => {
  const multi = assessSafeSelectiveExecution({
    plan: buildShadowImpactPlan({
      changedPaths: [
        'tests/packages/GAP-PKG-001/a.test.ts',
        'tests/packages/GAP-PKG-002/b.test.ts',
      ],
      validationCommands: [
        'node --test tests/packages/GAP-PKG-001/a.test.ts',
        'node --test tests/packages/GAP-PKG-003/c.test.ts',
      ],
    }),
  });
  assert.equal(multi.selectiveExecution, false);
  assert.equal(multi.reason, 'FULL_FALLBACK_MULTI_PACKAGE_SCOPE');

  const noMatch = assessSafeSelectiveExecution({
    plan: buildShadowImpactPlan({
      changedPaths: ['tests/packages/GAP-PKG-002/fixture.json'],
      validationCommands: ['node --test tests/packages/GAP-PKG-001/a.test.ts'],
    }),
  });
  assert.equal(noMatch.selectiveExecution, false);
  assert.equal(noMatch.reason, 'FULL_FALLBACK_NO_MATCHING_PACKAGE_VALIDATOR');
});

test('F5 ejecuta solo comandos aplicables dentro del closed scope', () => {
  const commands = [
    'node --test tests/packages/GAP-PKG-001/contract.test.ts',
    'node --test tests/packages/GAP-PKG-002/contract.test.ts',
    'git diff --check',
  ];
  const executed = [];
  const result = runValidationCommandsWithPolicy({
    root: '/repo',
    changedPaths: [
      'tests/packages/GAP-PKG-002/contract.test.ts',
      'docs/plan-canonico/modular/implementation-instances/SHELL-CI-021__GAP-PKG-002.json',
    ],
    validationCommands: commands,
    runner: (_root, command) => executed.push(command),
    certification: certifiedF5,
  });
  assert.equal(result.decision.selectiveExecution, true);
  assert.deepEqual(executed, [
    'node --test tests/packages/GAP-PKG-002/contract.test.ts',
    'git diff --check',
  ]);
  assert.equal(result.shadowObservation, null);
});

test('F5 production default ejecuta suite completa aun en closed scope mientras certificacion esta pendiente', () => {
  const commands = [
    'node --test tests/packages/GAP-PKG-001/contract.test.ts',
    'node --test tests/packages/GAP-PKG-002/contract.test.ts',
    'git diff --check',
  ];
  const executed = [];
  const result = runValidationCommandsWithPolicy({
    root: '/repo',
    changedPaths: ['tests/packages/GAP-PKG-002/contract.test.ts'],
    validationCommands: commands,
    runner: (_root, command) => executed.push(command),
  });
  assert.equal(result.decision.candidateEligible, true);
  assert.equal(result.decision.selectiveExecution, false);
  assert.equal(result.decision.reason, 'FULL_FALLBACK_SHADOW_CERTIFICATION_PENDING');
  assert.deepEqual(executed, commands);
  assert.equal(result.shadowObservation.fullSuiteExecuted, true);
  assert.equal(result.shadowObservation.validationGatesSkipped, 0);
});

test('F5 full fallback ejecuta suite completa y conserva F4 como guard', () => {
  const commands = [
    'node --test tests/packages/GAP-PKG-001/contract.test.ts',
    'node --test tests/packages/GAP-PKG-002/contract.test.ts',
    'npm test --silent',
  ];
  const executed = [];
  const result = runValidationCommandsWithPolicy({
    root: '/repo',
    changedPaths: [
      'supabase/functions/shift-runtime-processor/index.ts',
      'tests/packages/GAP-PKG-001/contract.test.ts',
    ],
    validationCommands: commands,
    runner: (_root, command) => executed.push(command),
  });
  assert.equal(result.decision.selectiveExecution, false);
  assert.deepEqual(executed, commands);
  assert.equal(result.shadowObservation.fullSuiteExecuted, true);
  assert.equal(result.shadowObservation.validationGatesSkipped, 0);
});

test('F5 record sella candidato, decision y particion PASS/NOT_APPLICABLE', () => {
  const commands = [
    'node --test tests/packages/GAP-PKG-001/contract.test.ts',
    'node --test tests/packages/GAP-PKG-002/contract.test.ts',
    'git diff --check',
  ];
  const plan = buildShadowImpactPlan({
    changedPaths: ['tests/packages/GAP-PKG-002/contract.test.ts'],
    validationCommands: commands,
  });
  const decision = assessSafeSelectiveExecution({ plan, certification: certifiedF5 });
  const record = createSafeSelectiveValidationRecord({
    plan,
    decision,
    results: decision.executedCommands.map((command) => ({ command, status: 'PASS' })),
    candidateCommit: 'a'.repeat(40),
    certification: certifiedF5,
  });
  const validated = validateSafeSelectiveValidationRecord({
    record,
    candidateCommit: 'a'.repeat(40),
    validationCommands: commands,
    certification: certifiedF5,
  });
  assert.equal(validated.status, 'PASS');
  assert.equal(validated.selectiveExecution, true);
  assert.deepEqual(validated.notApplicableCommands, [
    'node --test tests/packages/GAP-PKG-001/contract.test.ts',
  ]);

  const tampered = structuredClone(record);
  tampered.notApplicableCommands = [];
  assert.throws(
    () => validateSafeSelectiveValidationRecord({
      record: tampered,
      candidateCommit: 'a'.repeat(40),
      validationCommands: commands,
      certification: certifiedF5,
    }),
    /integridad SHA-256/u,
  );
});

test('F5 fallo de validator seleccionado sigue siendo fail-fast', () => {
  const failing = 'node --test tests/packages/GAP-PKG-002/contract.test.ts';
  assert.throws(
    () => runValidationCommandsWithPolicy({
      root: '/repo',
      changedPaths: ['tests/packages/GAP-PKG-002/contract.test.ts'],
      validationCommands: [
        'node --test tests/packages/GAP-PKG-001/contract.test.ts',
        failing,
      ],
      runner: (_root, command) => {
        if (command === failing) throw new Error('synthetic selective failure');
      },
      certification: certifiedF5,
    }),
    (error) => {
      assert.equal(error.message, 'synthetic selective failure');
      assert.equal(error.safeSelective.classification, 'SAFE_SELECTIVE_SELECTED_VALIDATOR_FAILURE');
      assert.equal(error.safeSelective.command, failing);
      return true;
    },
  );
});

test('F5 integra record en evidence request y no toca remote, authorization, preverify ni finish', () => {
  const source = fs.readFileSync(new URL('./implementation-execution-coordinator.mjs', import.meta.url), 'utf8');
  assert.match(source, /validation_engine_selective_validation: selectiveValidation/u);
  assert.match(source, /runValidationCommandsWithPolicy\(\{/u);
  assert.match(source, /status: notApplicable\.has\(command\) \? 'NOT_APPLICABLE' : 'PASS'/u);
  assert.match(source, /validateSafeSelectiveValidationRecord\(\{/u);
  assert.match(source, /runCanonicalLifecycle\(root, 'docs:implementation:preverify', id\)/u);
  assert.match(source, /validateExecutionEvidenceReceipt\(\{\s*instance: refreshed,\s*receipt,\s*candidateCommit,\s*certification,\s*\}\)/u);
  assert.match(source, /runCanonicalLifecycle\(root, 'docs:implementation:finish', instanceId\)/u);
  assert.match(source, /SAFE_SELECTIVE: safeSelective\?\.classification \?\? 'NONE'/u);
});


test('F5 certification incompleta nunca habilita seleccion', () => {
  const plan = buildShadowImpactPlan({
    changedPaths: ['tests/packages/GAP-PKG-002/contract.test.ts'],
    validationCommands: [
      'node --test tests/packages/GAP-PKG-001/contract.test.ts',
      'node --test tests/packages/GAP-PKG-002/contract.test.ts',
    ],
  });
  const insufficient = assessSafeSelectiveExecution({
    plan,
    certification: IMPLEMENTATION_SAFE_SELECTIVE_CERTIFICATION,
  });
  assert.equal(insufficient.candidateEligible, true);
  assert.equal(insufficient.selectiveExecution, false);
  assert.equal(insufficient.reason, 'FULL_FALLBACK_SHADOW_CERTIFICATION_PENDING');
});

test('F5 evidence receipt acepta NOT_APPLICABLE solo con record selectivo certificado exacto', () => {
  const instance = {
    instance_id: 'SHELL-CI-021::GAP-PKG-002',
    validation_commands: [
      'node --test tests/packages/GAP-PKG-001/contract.test.ts',
      'node --test tests/packages/GAP-PKG-002/contract.test.ts',
      'git diff --check',
    ],
    target_environments: [],
  };
  const candidateCommit = 'b'.repeat(40);
  const plan = buildShadowImpactPlan({
    changedPaths: ['tests/packages/GAP-PKG-002/contract.test.ts'],
    validationCommands: instance.validation_commands,
  });
  const decision = assessSafeSelectiveExecution({ plan, certification: certifiedF5 });
  const record = createSafeSelectiveValidationRecord({
    plan,
    decision,
    results: decision.executedCommands.map((command) => ({ command, status: 'PASS' })),
    candidateCommit,
    certification: certifiedF5,
  });
  const receipt = {
    schema_version: 1,
    instance_id: instance.instance_id,
    candidate_commit: candidateCommit,
    observed_at: '2026-09-08T03:30:00Z',
    validation_commands: instance.validation_commands,
    results: [
      { command: instance.validation_commands[0], status: 'NOT_APPLICABLE' },
      { command: instance.validation_commands[1], status: 'PASS' },
      { command: instance.validation_commands[2], status: 'PASS' },
    ],
    target_environments: [],
    environment_results: [],
    operational_evidence: ['F5 selective validation record PASS'],
    validation_engine_selective_validation: record,
  };
  assert.equal(validateExecutionEvidenceReceipt({
    instance,
    receipt,
    candidateCommit,
    certification: certifiedF5,
  }), true);

  const forged = structuredClone(receipt);
  forged.results[0].status = 'PASS';
  assert.throws(
    () => validateExecutionEvidenceReceipt({
      instance,
      receipt: forged,
      candidateCommit,
      certification: certifiedF5,
    }),
    /resultado local exacto/u,
  );
});


test('F5 rechaza certificacion manipulada aunque declare CERTIFIED', () => {
  const plan = buildShadowImpactPlan({
    changedPaths: ['tests/packages/GAP-PKG-002/contract.test.ts'],
    validationCommands: [
      'node --test tests/packages/GAP-PKG-001/contract.test.ts',
      'node --test tests/packages/GAP-PKG-002/contract.test.ts',
    ],
  });
  const tampered = { ...certifiedF5, observedOmissionBearingSamples: 999 };
  const decision = assessSafeSelectiveExecution({ plan, certification: tampered });
  assert.equal(decision.candidateEligible, true);
  assert.equal(decision.selectiveExecution, false);
  assert.equal(decision.reason, 'FULL_FALLBACK_SHADOW_CERTIFICATION_PENDING');
});

test('C4 detecta materializacion por paths autorizados sin --materialized', () => {
  const instance = {
    instance_id: 'SHELL-CI-021::GAP-PKG-002',
    authorized_changes: [
      { repo: 'vento-group-sas/vento-shell', path: 'tests/packages/GAP-PKG-002/a.ts', change: 'CREATE' },
      { repo: 'vento-group-sas/vento-shell', path: 'tests/packages/GAP-PKG-002/b.ts', change: 'MODIFY' },
      { repo: 'vento-group-sas/vento-shell', path: 'scripts/docs/implementation-branch-lifecycle.mjs', change: 'EXECUTE_ONLY' },
    ],
  };
  const ready = assessAuthorizedMaterialization({
    instance,
    changedPaths: ['tests/packages/GAP-PKG-002/a.ts', 'tests/packages/GAP-PKG-002/b.ts'],
  });
  assert.equal(ready.ready, true);
  assert.deepEqual(ready.missingPaths, []);
  const pending = assessAuthorizedMaterialization({ instance, changedPaths: ['tests/packages/GAP-PKG-002/a.ts'] });
  assert.equal(pending.ready, false);
  assert.deepEqual(pending.missingPaths, ['tests/packages/GAP-PKG-002/b.ts']);
});

test('C4 repair receipt reutiliza solo fingerprint exacto del candidato reparado', () => {
  const receipt = createCandidateRepairReceipt({
    instanceId: 'SHELL-CI-021::GAP-PKG-002',
    candidateCommit: 'a'.repeat(40),
    inputRepositoryStateSha256: '1'.repeat(64),
    outputRepositoryStateSha256: '2'.repeat(64),
    toolchain: { nodeVersion: 'v24.19.0', platform: 'win32', arch: 'x64' },
    repairExecuted: true,
    repairedPaths: ['tests/packages/GAP-PKG-002/a.ts'],
    repairedAt: '2026-09-12T05:00:00Z',
  });
  const exact = validateCandidateRepairReceipt({
    receipt, instanceId: 'SHELL-CI-021::GAP-PKG-002', candidateCommit: 'a'.repeat(40),
    repositoryStateSha256: '2'.repeat(64),
    toolchain: { nodeVersion: 'v24.19.0', platform: 'win32', arch: 'x64' },
  });
  assert.equal(exact.status, 'PASS');
  const changed = validateCandidateRepairReceipt({
    receipt, instanceId: 'SHELL-CI-021::GAP-PKG-002', candidateCommit: 'a'.repeat(40),
    repositoryStateSha256: '3'.repeat(64),
    toolchain: { nodeVersion: 'v24.19.0', platform: 'win32', arch: 'x64' },
  });
  assert.equal(changed.status, 'MISS');
  const wrapper = evaluateCandidateRepairReceipt({
    instance: { instance_id: 'SHELL-CI-021::GAP-PKG-002' },
    request: { validation_engine_repair_receipt: receipt },
    candidateState: {
      candidateCommit: 'a'.repeat(40), repositoryStateSha256: '2'.repeat(64),
      toolchain: { nodeVersion: 'v24.19.0', platform: 'win32', arch: 'x64' },
    },
  });
  assert.equal(wrapper.status, 'PASS');
});

test('C4 auto-sella evidencia solo cuando no existe target externo', () => {
  const request = {
    schema_version: 1,
    instance_id: 'SHELL-CI-021::GAP-PKG-002',
    candidate_commit: 'b'.repeat(40),
    observed_at: null,
    validation_commands: ['npm test'],
    results: [{ command: 'npm test', status: 'PASS' }],
    target_environments: [],
    environment_results: [],
    operational_evidence: [],
    validation_engine_preverify_receipt: { receiptSha256: 'c'.repeat(64) },
  };
  const auto = buildMachineObservableExecutionEvidence({ request, observedAt: '2026-09-12T06:00:00Z' });
  assert.equal(auto.observed_at, '2026-09-12T06:00:00Z');
  assert.equal(auto.operational_evidence.length, 2);
  assert.equal(validateExecutionEvidenceReceipt({
    instance: { instance_id: request.instance_id, validation_commands: ['npm test'], target_environments: [] },
    receipt: auto, candidateCommit: request.candidate_commit,
  }), true);
  assert.equal(buildMachineObservableExecutionEvidence({
    request: { ...request, target_environments: [{ environment_role: 'STAGING' }] },
  }), null);
});

test('C4 elimina stash, elimina gate --materialized y serializa finish contra git-common-dir', () => {
  const source = fs.readFileSync(new URL('./implementation-execution-coordinator.mjs', import.meta.url), 'utf8');
  assert.doesNotMatch(source, /git\(\['stash'/u);
  assert.doesNotMatch(source, /if \(!materialized\)/u);
  assert.match(source, /MATERIALIZATION_REQUIRED/u);
  assert.match(source, /LEGACY_MATERIALIZED_FLAG/u);
  assert.match(source, /MAIN_RECONCILIATION_DIRTY_WORKTREE/u);
  assert.match(source, /--git-common-dir/u);
  assert.match(source, /IMPLEMENTATION_FINISH_LOCK_ACTIVE/u);
  assert.match(source, /EXTERNAL_EVIDENCE_REQUIRED/u);
  const repair = source.indexOf('const repairBeforeCheckpoint = runCandidateRepairOnce');
  const mainReconcile = source.indexOf('const rebaseline = ensureCurrentMainContained', repair);
  const validation = source.indexOf('const validationRun = runValidationCommandsWithPolicy', mainReconcile);
  const mrp = source.indexOf('const mrpStatus = maybeRecordCi020Candidate', validation);
  const implemented = source.indexOf("status: 'IMPLEMENTED'", mrp);
  assert.ok(repair >= 0 && mainReconcile > repair && validation > mainReconcile);
  assert.ok(mrp > validation && implemented > mrp);
  assert.match(source, /REPAIR_RECEIPT_NOT_EXACT_FINAL_CANDIDATE/u);
});
