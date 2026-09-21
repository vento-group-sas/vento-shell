import assert from 'node:assert/strict';
import test from 'node:test';

import {
  IMPLEMENTATION_INTEGRATION_IMPACT_MODEL_ID,
  assessPackageJsonIntegrationImpact,
  assertPhysicalEvidenceReusableForIntegration,
  classifyImplementationIntegrationImpact,
  isImplementationIntegrationLifecyclePath,
  isCorrectionIntegrationLifecyclePath,
} from './implementation-integration-impact.mjs';

function instance() {
  return {
    instance_id: 'SHELL-CI-020::GAP-PKG-018',
    authorized_changes: [
      {
        repo: 'vento-group-sas/vento-shell',
        path: 'supabase/tests/packages/GAP-PKG-018.sql',
        change: 'CREATE',
      },
      {
        repo: 'vento-group-sas/vento-shell',
        path: 'tests/packages/GAP-PKG-018/contract.test.ts',
        change: 'CREATE',
      },
      {
        repo: 'vento-group-sas/vento-shell',
        path: 'docs/plan-canonico/modular/implementation-instances/SHELL-CI-020__GAP-PKG-018.json',
        change: 'MODIFY',
      },
      {
        repo: 'vento-group-sas/vento-shell',
        path: 'scripts/docs/implementation-branch-lifecycle.mjs',
        change: 'EXECUTE_ONLY',
      },
      {
        repo: 'vento-group-sas/vento-shell',
        path: 'scripts/quality/supabase-db-harness.mjs',
        change: 'EXECUTE_ONLY',
      },
      {
        repo: 'vento-group-sas/vento-shell',
        path: 'scripts/quality/repository-test-command-gate.mjs',
        change: 'EXECUTE_ONLY',
      },
    ],
  };
}

const packageBefore = {
  name: 'vento-shell',
  scripts: {
    test: 'node scripts/quality/repository-test-command-gate.mjs run-shell',
    'docs:plan:test': 'node --test scripts/docs/implementation-state-integrity.test.mjs scripts/docs/implementation-execution-coordinator.test.mjs',
  },
  dependencies: { next: '16.1.1' },
};

const packageAfterSafe = {
  name: 'vento-shell',
  scripts: {
    test: 'node scripts/quality/repository-test-command-gate.mjs run-shell',
    'docs:implementation:doctor': 'node scripts/docs/implementation-doctor.mjs',
    'docs:plan:test': 'node --test scripts/docs/implementation-state-integrity.test.mjs scripts/docs/implementation-integration-model.test.mjs scripts/docs/implementation-integration-loop.test.mjs scripts/docs/implementation-integration-impact.test.mjs scripts/docs/implementation-doctor.test.mjs scripts/docs/implementation-execution-coordinator.test.mjs',
  },
  dependencies: { next: '16.1.1' },
};

test('reconoce tooling de lifecycle de integracion como no fisico', () => {
  assert.equal(
    isImplementationIntegrationLifecyclePath(
      'scripts/docs/implementation-branch-lifecycle.mjs',
    ),
    true,
  );
  assert.equal(
    isImplementationIntegrationLifecyclePath(
      'scripts/docs/implementation-integration-loop.test.mjs',
    ),
    true,
  );
  assert.equal(
    isImplementationIntegrationLifecyclePath(
      'scripts/docs/implementation-doctor.mjs',
    ),
    true,
  );
  assert.equal(
    isImplementationIntegrationLifecyclePath(
      'scripts/quality/supabase-db-harness.mjs',
    ),
    false,
  );
  for (const relativePath of [
    'scripts/docs/implementation-validation-engine.mjs',
    'scripts/docs/validate-executable-delivery.mjs',
    'scripts/docs/validate-executable-delivery.test.mjs',
    'scripts/quality/lint-ratchet.mjs',
    'scripts/supabase/environment-drift.mjs',
  ]) {
    assert.equal(isImplementationIntegrationLifecyclePath(relativePath), true);
  }
});

test('derivados y tooling de integracion reutilizan evidencia fisica', () => {
  const impact = classifyImplementationIntegrationImpact({
    instance: instance(),
    changedPaths: [
      'docs/plan-canonico/modular/00_CABECERA_Y_ESTADO.md',
      'scripts/docs/implementation-state-integrity.mjs',
      'scripts/docs/implementation-integration-model.mjs',
      'scripts/docs/implementation-integration-loop.test.mjs',
      'scripts/docs/implementation-doctor.mjs',
    ],
  });
  assert.equal(impact.model_id, IMPLEMENTATION_INTEGRATION_IMPACT_MODEL_ID);
  assert.equal(impact.decision, 'REUSE_PHYSICAL_EVIDENCE');
  assert.deepEqual(impact.material_paths, []);
});

test('path fisico writable del candidato exige revalidacion', () => {
  const impact = classifyImplementationIntegrationImpact({
    instance: instance(),
    changedPaths: ['supabase/tests/packages/GAP-PKG-018.sql'],
  });
  assert.equal(impact.decision, 'REVALIDATE_PHYSICAL');
  assert.match(
    impact.classifications[0].classification,
    /^AUTHORIZED_WRITABLE_OVERLAP:/u,
  );
});

test('harness execute-only fisico exige revalidacion pero lifecycle execute-only no', () => {
  const physical = classifyImplementationIntegrationImpact({
    instance: instance(),
    changedPaths: ['scripts/quality/supabase-db-harness.mjs'],
  });
  assert.equal(physical.decision, 'REVALIDATE_PHYSICAL');

  const lifecycle = classifyImplementationIntegrationImpact({
    instance: instance(),
    changedPaths: ['scripts/docs/implementation-branch-lifecycle.mjs'],
  });
  assert.equal(lifecycle.decision, 'REUSE_PHYSICAL_EVIDENCE');
});

test('path desconocido falla cerrado y exige revalidacion', () => {
  const impact = classifyImplementationIntegrationImpact({
    instance: instance(),
    changedPaths: ['packages/auth-runtime/src/identity.ts'],
  });
  assert.equal(impact.decision, 'REVALIDATE_PHYSICAL');
  assert.equal(
    impact.classifications[0].classification,
    'UNKNOWN_OR_PHYSICAL_DEPENDENCY_CHANGED',
  );
});

test('ledger propio cambiado nunca reutiliza evidencia por inferencia', () => {
  const impact = classifyImplementationIntegrationImpact({
    instance: instance(),
    changedPaths: [
      'docs/plan-canonico/modular/implementation-instances/SHELL-CI-020__GAP-PKG-018.json',
    ],
  });
  assert.equal(impact.decision, 'REVALIDATE_PHYSICAL');
  assert.equal(
    impact.classifications[0].classification,
    'CURRENT_INSTANCE_LEDGER_CHANGED',
  );
});

test('otro ledger solo es seguro con prueba explicita de pending pristino', () => {
  const path =
    'docs/plan-canonico/modular/implementation-instances/SHELL-CI-021__GAP-PKG-018.json';
  const blocked = classifyImplementationIntegrationImpact({
    instance: instance(),
    changedPaths: [path],
  });
  assert.equal(blocked.decision, 'REVALIDATE_PHYSICAL');

  const safe = classifyImplementationIntegrationImpact({
    instance: instance(),
    changedPaths: [path],
    pristinePendingInstancePaths: [path],
  });
  assert.equal(safe.decision, 'REUSE_PHYSICAL_EVIDENCE');
});

test('package.json permite solo doctor exacto y tests de implementacion aditivos', () => {
  const semantic = assessPackageJsonIntegrationImpact({
    before: packageBefore,
    after: packageAfterSafe,
  });
  assert.equal(semantic.safe, true);
  assert.equal(
    semantic.reason,
    'PACKAGE_JSON_ADDITIVE_IMPLEMENTATION_TESTS_ONLY',
  );
  assert.equal(
    semantic.doctor_script,
    'node scripts/docs/implementation-doctor.mjs',
  );

  const impact = classifyImplementationIntegrationImpact({
    instance: instance(),
    changedPaths: ['package.json'],
    packageJsonBefore: packageBefore,
    packageJsonAfter: packageAfterSafe,
  });
  assert.equal(impact.decision, 'REUSE_PHYSICAL_EVIDENCE');
});

test('package.json doctor alterado, test cambiado o dependencia cambiada exige revalidacion', () => {
  const badDoctor = structuredClone(packageAfterSafe);
  badDoctor.scripts['docs:implementation:doctor'] = 'node scripts/docs/other-doctor.mjs';
  assert.equal(
    assessPackageJsonIntegrationImpact({
      before: packageBefore,
      after: badDoctor,
    }).safe,
    false,
  );

  const changedTest = structuredClone(packageAfterSafe);
  changedTest.scripts.test = 'node different-runner.mjs';
  assert.equal(
    assessPackageJsonIntegrationImpact({
      before: packageBefore,
      after: changedTest,
    }).safe,
    false,
  );

  const changedDependency = structuredClone(packageAfterSafe);
  changedDependency.dependencies.next = '17.0.0';
  assert.equal(
    assessPackageJsonIntegrationImpact({
      before: packageBefore,
      after: changedDependency,
    }).safe,
    false,
  );
});

test('delta esperado del hardening es reutilizable sin repetir pruebas fisicas', () => {
  const impact = classifyImplementationIntegrationImpact({
    instance: instance(),
    changedPaths: [
      'package.json',
      'scripts/docs/implementation-state-integrity.mjs',
      'scripts/docs/implementation-state-integrity.test.mjs',
      'scripts/docs/implementation-branch-lifecycle.mjs',
      'scripts/docs/implementation-branch-lifecycle.test.mjs',
      'scripts/docs/implementation-integration-model.mjs',
      'scripts/docs/implementation-integration-model.test.mjs',
      'scripts/docs/implementation-integration-loop.mjs',
      'scripts/docs/implementation-integration-loop.test.mjs',
      'scripts/docs/implementation-integration-impact.mjs',
      'scripts/docs/implementation-integration-impact.test.mjs',
      'scripts/docs/implementation-doctor.mjs',
      'scripts/docs/implementation-doctor.test.mjs',
    ],
    packageJsonBefore: packageBefore,
    packageJsonAfter: packageAfterSafe,
  });
  assert.equal(impact.decision, 'REUSE_PHYSICAL_EVIDENCE');
  assert.equal(impact.material_paths.length, 0);
});

test('assert de reutilizacion falla cerrado ante impacto material', () => {
  assert.equal(
    assertPhysicalEvidenceReusableForIntegration({
      instance: instance(),
      changedPaths: ['scripts/docs/implementation-integration-loop.mjs'],
    }).decision,
    'REUSE_PHYSICAL_EVIDENCE',
  );

  assert.throws(
    () => assertPhysicalEvidenceReusableForIntegration({
      instance: instance(),
      changedPaths: ['scripts/quality/repository-test-command-gate.mjs'],
    }),
    /PHYSICAL_EVIDENCE_REUSE_BLOCKED/u,
  );
});

test('hardening de Git machine output reutiliza evidencia fisica', () => {
  const paths = [
    'scripts/docs/docs-runtime-primitives.mjs',
    'scripts/docs/docs-runtime-primitives.test.mjs',
    'scripts/docs/canonical-task-preflight.mjs',
    'scripts/docs/package-review-factory.mjs',
    'scripts/docs/implementation-doctor.mjs',
    'scripts/docs/task-branch-lifecycle.mjs',
    'scripts/supabase/environment-drift.mjs',
    'scripts/docs/task-semantic-contract.mjs',
    'scripts/docs/task-semantic-contract.test.mjs',
    'docs/plan-canonico/modular/task-development-policy.json',
  ];
  const impact = classifyImplementationIntegrationImpact({
    instance: instance(),
    changedPaths: paths,
  });
  assert.equal(impact.decision, 'REUSE_PHYSICAL_EVIDENCE');
  assert.deepEqual(impact.material_paths, []);
});

test('governance-only correction delta reutiliza evidencia fisica', () => {
  assert.equal(isCorrectionIntegrationLifecyclePath('scripts/docs/correction-control.mjs'), true);
  assert.equal(isCorrectionIntegrationLifecyclePath('scripts/docs/correction-repository-bundle.test.mjs'), true);
  assert.equal(isCorrectionIntegrationLifecyclePath('scripts/docs/correction-supabase-deploy.mjs'), false);
  assert.equal(isImplementationIntegrationLifecyclePath('scripts/docs/implementation-repository-bundle.mjs'), true);

  const correctionPath = 'docs/plan-canonico/modular/correction-instances/DELIV-PKG-015__CORR-020.json';
  const blocked = classifyImplementationIntegrationImpact({
    instance: instance(),
    changedPaths: [correctionPath],
  });
  assert.equal(blocked.decision, 'REVALIDATE_PHYSICAL');

  const safe = classifyImplementationIntegrationImpact({
    instance: instance(),
    changedPaths: [
      correctionPath,
      'scripts/docs/correction-control.mjs',
      'scripts/docs/correction-repository-bundle.test.mjs',
      'scripts/docs/implementation-repository-bundle.mjs',
    ],
    verifiedCorrectionRecordPaths: [correctionPath],
  });
  assert.equal(safe.decision, 'REUSE_PHYSICAL_EVIDENCE');
  assert.equal(safe.material_paths.length, 0);
});

test('package.json admite solo tests lifecycle aditivos de correction', () => {
  const before = structuredClone(packageBefore);
  before.scripts['docs:correction:test'] = 'node --test scripts/docs/correction-control.test.mjs';
  const after = structuredClone(before);
  after.scripts['docs:plan:test'] += ' scripts/docs/correction-repository-bundle.test.mjs';
  after.scripts['docs:correction:test'] += ' scripts/docs/correction-repository-bundle.test.mjs';
  const semantic = assessPackageJsonIntegrationImpact({ before, after });
  assert.equal(semantic.safe, true);
  assert.equal(semantic.reason, 'PACKAGE_JSON_ADDITIVE_LIFECYCLE_TESTS_ONLY');

  const bad = structuredClone(after);
  bad.scripts['docs:correction:test'] += ' scripts/supabase/environment-drift.test.mjs';
  assert.equal(assessPackageJsonIntegrationImpact({ before, after: bad }).safe, false);
});

test('PR585 lifecycle support delta reutiliza evidencia fisica sin ampliar paths desconocidos', () => {
  const supportPaths = [
    '.vscode/settings.json',
    'scripts/docs/correction-lifecycle-performance.md',
    'scripts/docs/correction-validation-session.mjs',
    'scripts/docs/correction-validation-session.test.mjs',
    'scripts/docs/lifecycle-command-observer.mjs',
    'scripts/docs/lifecycle-command-observer.test.mjs',
    'scripts/docs/vento-terminal.ps1',
  ];
  for (const relativePath of supportPaths) {
    assert.equal(isCorrectionIntegrationLifecyclePath(relativePath), true);
  }
  assert.equal(isCorrectionIntegrationLifecyclePath('scripts/docs/lifecycle-command-observer-runtime.mjs'), false);

  const before = {
    name: 'vento-shell',
    scripts: {
      'docs:plan:test': 'node --test scripts/docs/correction-control.test.mjs',
      'docs:correction:test': 'node --test scripts/docs/correction-control.test.mjs',
    },
    dependencies: { next: '16.1.1' },
  };
  const after = structuredClone(before);
  after.scripts['docs:plan:test'] += ' scripts/docs/correction-validation-session.test.mjs scripts/docs/lifecycle-command-observer.test.mjs';
  after.scripts['docs:correction:test'] += ' scripts/docs/correction-validation-session.test.mjs scripts/docs/lifecycle-command-observer.test.mjs';

  const semantic = assessPackageJsonIntegrationImpact({ before, after });
  assert.equal(semantic.safe, true);

  const impact = classifyImplementationIntegrationImpact({
    instance: instance(),
    changedPaths: [...supportPaths, 'package.json'],
    packageJsonBefore: before,
    packageJsonAfter: after,
  });
  assert.equal(impact.decision, 'REUSE_PHYSICAL_EVIDENCE');
  assert.deepEqual(impact.material_paths, []);

  const unsafePackage = structuredClone(after);
  unsafePackage.scripts['docs:plan:test'] += ' scripts/docs/lifecycle-command-observer-runtime.test.mjs';
  assert.equal(assessPackageJsonIntegrationImpact({ before, after: unsafePackage }).safe, false);

  const unknown = classifyImplementationIntegrationImpact({
    instance: instance(),
    changedPaths: ['scripts/docs/lifecycle-command-observer-runtime.mjs'],
  });
  assert.equal(unknown.decision, 'REVALIDATE_PHYSICAL');
  assert.equal(unknown.classifications[0].classification, 'UNKNOWN_OR_PHYSICAL_DEPENDENCY_CHANGED');
});


test('readiness gate engine y su test son tooling lifecycle seguro', () => {
  assert.equal(isImplementationIntegrationLifecyclePath('scripts/docs/implementation-readiness-gate-engine.mjs'), true);
  assert.equal(isImplementationIntegrationLifecyclePath('scripts/docs/implementation-readiness-gate-engine.test.mjs'), true);
});

test('package.json permite añadir el test del readiness engine a plan y accelerator sin ampliar otras superficies', () => {
  const before = {
    name: 'vento-shell',
    scripts: {
      'docs:plan:test': 'node --test scripts/docs/implementation-execution-coordinator.test.mjs',
      'docs:implementation:accelerator:test': 'node --test scripts/docs/implementation-execution-coordinator.test.mjs',
    },
  };
  const after = structuredClone(before);
  after.scripts['docs:plan:test'] += ' scripts/docs/implementation-readiness-gate-engine.test.mjs';
  after.scripts['docs:implementation:accelerator:test'] += ' scripts/docs/implementation-readiness-gate-engine.test.mjs';
  const safe = assessPackageJsonIntegrationImpact({ before, after });
  assert.equal(safe.safe, true);
  assert.equal(safe.reason, 'PACKAGE_JSON_ADDITIVE_IMPLEMENTATION_TESTS_ONLY');

  const unsafe = structuredClone(after);
  unsafe.scripts['docs:implementation:accelerator:test'] += ' scripts/quality/arbitrary-physical-harness.test.mjs';
  const rejected = assessPackageJsonIntegrationImpact({ before, after: unsafe });
  assert.equal(rejected.safe, false);
  assert.match(rejected.reason, /DOCS_IMPLEMENTATION_ACCELERATOR_TEST_UNSAFE_ADDITION/u);
});

test('delta completo del readiness engine reutiliza evidencia física', () => {
  const before = {
    name: 'vento-shell',
    scripts: {
      'docs:plan:test': 'node --test scripts/docs/implementation-execution-coordinator.test.mjs',
      'docs:implementation:accelerator:test': 'node --test scripts/docs/implementation-execution-coordinator.test.mjs',
    },
  };
  const after = structuredClone(before);
  after.scripts['docs:plan:test'] += ' scripts/docs/implementation-readiness-gate-engine.test.mjs';
  after.scripts['docs:implementation:accelerator:test'] += ' scripts/docs/implementation-readiness-gate-engine.test.mjs';
  const result = classifyImplementationIntegrationImpact({
    instance: instance(),
    changedPaths: [
      'scripts/docs/implementation-readiness-gate-engine.mjs',
      'scripts/docs/implementation-readiness-gate-engine.test.mjs',
      'scripts/docs/implementation-execution-coordinator.mjs',
      'scripts/docs/implementation-execution-coordinator.test.mjs',
      'scripts/docs/implementation-integration-impact.mjs',
      'scripts/docs/implementation-integration-impact.test.mjs',
      'package.json',
    ],
    packageJsonBefore: before,
    packageJsonAfter: after,
  });
  assert.equal(result.decision, 'REUSE_PHYSICAL_EVIDENCE');
  assert.deepEqual(result.material_paths, []);
});


test('contratos normativos READY-GATE y CI021 son metadata lifecycle segura', () => {
  for (const relativePath of [
    'docs/plan-canonico/modular/bloques/E5_PLANIFICACION_DE_IMPLEMENTACION/03_PUERTA_DE_READINESS_OPERATIVO.md',
  ]) {
    assert.equal(isImplementationIntegrationLifecyclePath(relativePath), true);
  }
  const impact = classifyImplementationIntegrationImpact({
    instance: instance(),
    changedPaths: [
      'scripts/docs/implementation-readiness-gate-engine.mjs',
      'scripts/docs/implementation-readiness-gate-engine.test.mjs',
      'scripts/docs/implementation-execution-coordinator.mjs',
      'scripts/docs/implementation-execution-coordinator.test.mjs',
      'scripts/docs/implementation-integration-impact.mjs',
      'scripts/docs/implementation-integration-impact.test.mjs',
      'docs/plan-canonico/modular/bloques/E5_PLANIFICACION_DE_IMPLEMENTACION/03_PUERTA_DE_READINESS_OPERATIVO.md',
    ],
  });
  assert.equal(impact.decision, 'REUSE_PHYSICAL_EVIDENCE');
  assert.deepEqual(impact.material_paths, []);
});
