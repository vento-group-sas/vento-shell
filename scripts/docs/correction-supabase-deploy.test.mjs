import assert from 'node:assert/strict';
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import test from 'node:test';

import {
  assertNonProductionEnvironment,
  assertCanonicalLinkedStagingTarget,
  classifyDryRun,
  classifyLegacyQualityRepairAdoption,
  parsePendingMigrations,
  replaceEvidence,
} from './correction-supabase-deploy.mjs';

function legacyRecord(overrides = {}) {
  return {
    correction_id: 'SHELL-CI-020::CORR-002',
    status: 'IN_PROGRESS',
    correction_type: 'PHYSICAL',
    authorization: { decision: 'APPROVED' },
    authorized_changes: [
      {
        repo: 'vento-group-sas/vento-shell',
        path: 'supabase/migrations/20260913131524_gap_pkg_019_governed_analytics.sql',
        change: 'EXECUTE_ONLY',
      },
      {
        repo: 'vento-group-sas/vento-shell',
        path: 'scripts/supabase/environment-drift.mjs',
        change: 'EXECUTE_ONLY',
      },
    ],
    evidence: [
      {
        evidence_type: 'CORRECTION_SUPABASE_DEPLOY_V1',
        status: 'PASS',
        post_push_remote_up_to_date: true,
        production_mutations: false,
      },
      {
        evidence_type: 'CORRECTION_REMOTE_DRIFT_V1',
        status: 'PASS',
        remote_mutations_during_drift: false,
        production_mutations: false,
      },
    ],
    ...overrides,
  };
}

test('parsePendingMigrations extrae migraciones exactas sin duplicados', () => {
  const result = parsePendingMigrations(`
Would push these migrations:
 • 20260913131524_gap_pkg_019_governed_analytics.sql
 • 20260913131524_gap_pkg_019_governed_analytics.sql
`);
  assert.deepEqual(result, [
    '20260913131524_gap_pkg_019_governed_analytics.sql',
  ]);
});

test('classifyDryRun aplica solo cuando existe exactamente la migracion autorizada', () => {
  assert.deepEqual(
    classifyDryRun({
      pendingMigrations: [
        '20260913131524_gap_pkg_019_governed_analytics.sql',
      ],
      expectedMigration: '20260913131524_gap_pkg_019_governed_analytics.sql',
    }),
    {
      action: 'APPLY',
      pending: ['20260913131524_gap_pkg_019_governed_analytics.sql'],
    },
  );
});

test('classifyDryRun es resumible cuando no quedan migraciones pendientes', () => {
  assert.deepEqual(
    classifyDryRun({
      pendingMigrations: [],
      expectedMigration: '20260913131524_gap_pkg_019_governed_analytics.sql',
    }),
    {
      action: 'ALREADY_APPLIED',
      pending: [],
    },
  );
});

test('classifyDryRun rechaza cualquier conjunto remoto distinto al esperado', () => {
  assert.throws(
    () => classifyDryRun({
      pendingMigrations: [
        '20260913131524_gap_pkg_019_governed_analytics.sql',
        '20260916150000_unexpected.sql',
      ],
      expectedMigration: '20260913131524_gap_pkg_019_governed_analytics.sql',
    }),
    /PENDING_MIGRATION_SET_MISMATCH/u,
  );
});

test('production permanece fail-closed', () => {
  assert.throws(
    () => assertNonProductionEnvironment('PRODUCTION'),
    /PRODUCTION_REMOTE_MUTATION_FORBIDDEN/u,
  );
  assert.equal(assertNonProductionEnvironment('staging'), 'STAGING');
});

test('replaceEvidence reemplaza evidencia type/evidence_type sin duplicarla', () => {
  const record = {
    evidence: [
      { evidence_type: 'OTHER', status: 'PASS' },
      { type: 'CORRECTION_QUALITY_REPAIR_V1', status: 'OLD' },
    ],
  };
  const next = replaceEvidence(record, {
    evidence_type: 'CORRECTION_QUALITY_REPAIR_V1',
    status: 'PASS',
  });
  assert.deepEqual(next.evidence, [
    { evidence_type: 'OTHER', status: 'PASS' },
    { evidence_type: 'CORRECTION_QUALITY_REPAIR_V1', status: 'PASS' },
  ]);
});

test('legacy execute-only certificado puede adoptar quality gate sin reejecucion', () => {
  const result = classifyLegacyQualityRepairAdoption({
    record: legacyRecord(),
    baselinePredatesGovernance: true,
    changedPaths: [
      'docs/plan-canonico/modular/correction-instances/SHELL-CI-020__CORR-002.json',
    ],
    allowedMetadataPaths: [
      'docs/plan-canonico/modular/correction-instances/SHELL-CI-020__CORR-002.json',
    ],
  });
  assert.equal(result.action, 'ADOPT_LEGACY_PASS');
});

test('baseline gobernado nunca adopta y conserva quality repair normal', () => {
  const result = classifyLegacyQualityRepairAdoption({
    record: legacyRecord(),
    baselinePredatesGovernance: false,
    changedPaths: [],
    allowedMetadataPaths: [],
  });
  assert.equal(result.action, 'NOT_APPLICABLE_GOVERNED_BASELINE');
});

test('quality PASS existente se reutiliza sin duplicar ni reejecutar', () => {
  const record = legacyRecord({
    evidence: [
      ...legacyRecord().evidence,
      { type: 'CORRECTION_QUALITY_REPAIR_V1', status: 'PASS' },
    ],
  });
  const result = classifyLegacyQualityRepairAdoption({
    record,
    baselinePredatesGovernance: true,
  });
  assert.equal(result.action, 'REUSE_EXISTING_PASS');
});

test('quality previa no PASS bloquea retry automatico', () => {
  const record = legacyRecord({
    evidence: [
      ...legacyRecord().evidence,
      { type: 'CORRECTION_QUALITY_REPAIR_V1', status: 'STARTED' },
    ],
  });
  assert.throws(
    () => classifyLegacyQualityRepairAdoption({
      record,
      baselinePredatesGovernance: true,
    }),
    /QUALITY_REPAIR_PREVIOUS_STARTED/u,
  );
});

test('legacy con cambios MODIFY no puede adoptar equivalencia execute-only', () => {
  const record = legacyRecord({
    authorized_changes: [
      {
        repo: 'vento-group-sas/vento-shell',
        path: 'scripts/docs/example.mjs',
        change: 'MODIFY',
      },
    ],
  });
  assert.throws(
    () => classifyLegacyQualityRepairAdoption({
      record,
      baselinePredatesGovernance: true,
      changedPaths: [],
      allowedMetadataPaths: [],
    }),
    /LEGACY_QUALITY_REPAIR_REQUIRES_EXECUTE_ONLY/u,
  );
});

test('legacy con diff fisico inesperado bloquea adopcion', () => {
  assert.throws(
    () => classifyLegacyQualityRepairAdoption({
      record: legacyRecord(),
      baselinePredatesGovernance: true,
      changedPaths: ['scripts/docs/unexpected.mjs'],
      allowedMetadataPaths: [
        'docs/plan-canonico/modular/correction-instances/SHELL-CI-020__CORR-002.json',
      ],
    }),
    /LEGACY_QUALITY_REPAIR_ADOPTION_SCOPE_UNSAFE/u,
  );
});

test('legacy exige deploy y drift PASS sin mutaciones de production', () => {
  const missingDrift = legacyRecord({
    evidence: [
      {
        evidence_type: 'CORRECTION_SUPABASE_DEPLOY_V1',
        status: 'PASS',
        post_push_remote_up_to_date: true,
        production_mutations: false,
      },
    ],
  });
  assert.throws(
    () => classifyLegacyQualityRepairAdoption({
      record: missingDrift,
      baselinePredatesGovernance: true,
      changedPaths: [],
      allowedMetadataPaths: [],
    }),
    /LEGACY_QUALITY_REPAIR_DRIFT_EVIDENCE_NOT_PASS/u,
  );
});

function withLinkedProject({ ref, metadataRef }, callback) {
  const root = fs.mkdtempSync(path.join(os.tmpdir(), 'vento-correction-target-'));
  const temp = path.join(root, 'supabase', '.temp');
  try {
    fs.mkdirSync(temp, { recursive: true });
    if (ref !== undefined) fs.writeFileSync(path.join(temp, 'project-ref'), ref, 'utf8');
    if (metadataRef !== undefined) {
      fs.writeFileSync(path.join(temp, 'linked-project.json'), JSON.stringify({ ref: metadataRef }), 'utf8');
    }
    return callback(root);
  } finally {
    fs.rmSync(root, { recursive: true, force: true });
  }
}

const targetBindings = {
  staging: { classification: 'STAGING', project_ref: 'staging-target', owner: 'SUPA-TRANS-015' },
  production: { classification: 'PRODUCTION', project_ref: 'production-legacy', owner: 'SUPA-TRANS-015' },
};
const validTarget = {
  environmentRole: 'STAGING',
  projectRef: 'staging-target',
  owner: 'SUPA-TRANS-015',
  bindings: targetBindings,
};

test('linked deployment: only canonical STAGING may reach CLI', () => {
  withLinkedProject({ ref: 'staging-target', metadataRef: 'staging-target' }, (root) => {
    assert.equal(assertCanonicalLinkedStagingTarget({ ...validTarget, root }).project_ref, 'staging-target');
    assert.throws(() => assertCanonicalLinkedStagingTarget({
      ...validTarget, root, environmentRole: 'DEV',
    }), /ONLY_STAGING_IS_ALLOWED/u);
    assert.throws(() => assertCanonicalLinkedStagingTarget({
      ...validTarget, root, projectRef: 'production-legacy',
    }), /PRODUCTION_TARGET_FORBIDDEN/u);
    assert.throws(() => assertCanonicalLinkedStagingTarget({
      ...validTarget, root, owner: 'OTHER',
    }), /STAGING_OWNER_MISMATCH/u);
  });
});

test('linked deployment: conflicting effective CLI project-ref blocks even with staging arguments', () => {
  withLinkedProject({ ref: 'production-legacy', metadataRef: 'production-legacy' }, (root) => {
    assert.throws(() => assertCanonicalLinkedStagingTarget({
      ...validTarget, root,
    }), /SUPABASE_LINKED_PROJECT_REF_MISMATCH/u);
  });
  withLinkedProject({ ref: undefined, metadataRef: undefined }, (root) => {
    assert.throws(() => assertCanonicalLinkedStagingTarget({
      ...validTarget, root,
    }), /SUPABASE_LINKED_PROJECT_REF_MISSING/u);
  });
});

test('linked deployment: stale auxiliary metadata blocks a staging push, not reclassified as DEV', () => {
  withLinkedProject({ ref: 'staging-target', metadataRef: 'production-legacy' }, (root) => {
    assert.throws(() => assertCanonicalLinkedStagingTarget({
      ...validTarget, root,
    }), /SUPABASE_LINKED_PROJECT_METADATA_MISMATCH/u);
  });
  withLinkedProject({ ref: 'staging-target', metadataRef: undefined }, (root) => {
    assert.equal(assertCanonicalLinkedStagingTarget({
      ...validTarget, root,
    }).environment_role, 'STAGING');
  });
});
