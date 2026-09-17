import assert from 'node:assert/strict';
import test from 'node:test';

import {
  assertNonProductionEnvironment,
  classifyDryRun,
  parsePendingMigrations,
  replaceEvidence,
} from './correction-supabase-deploy.mjs';

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

test('replaceEvidence reemplaza evidencia del mismo tipo sin duplicarla', () => {
  const record = {
    evidence: [
      { evidence_type: 'OTHER', status: 'PASS' },
      { evidence_type: 'CORRECTION_SUPABASE_DEPLOY_V1', status: 'OLD' },
    ],
  };
  const next = replaceEvidence(record, {
    evidence_type: 'CORRECTION_SUPABASE_DEPLOY_V1',
    status: 'PASS',
  });
  assert.deepEqual(next.evidence, [
    { evidence_type: 'OTHER', status: 'PASS' },
    { evidence_type: 'CORRECTION_SUPABASE_DEPLOY_V1', status: 'PASS' },
  ]);
});
