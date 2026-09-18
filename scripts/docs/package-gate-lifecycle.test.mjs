import assert from 'node:assert/strict';
import test from 'node:test';

import { applyPackageGateDossier } from './package-gate-lifecycle.mjs';

function record() {
  return {
    schema_version: 1,
    package_id: 'GAP-PKG-045',
    status: 'APPROVED_FOR_IMPLEMENTATION',
    created_at: '2026-09-17T00:00:00.000Z',
    updated_at: '2026-09-17T00:00:00.000Z',
    physical_identity: { targets: [{ repository: 'vento-group-sas/vento-shell', path: 'src/a.ts', symbol_or_surface: 'A', operation: 'MODIFICAR' }] },
    implementation_units: [{ unit_id: 'A', repository: 'vento-group-sas/vento-shell', change: 'A' }],
    deployment_environment: { canonical_task_id: 'DELIV-PKG-019', rollout_profile: 'TP', environment_profile: 'ENV', targets: [{ environment_role: 'STAGING', target_type: 'WEB_ENVIRONMENT', target_id: 'staging', owner: 'OWN-OPS' }], production_authorized: false },
    evidence_plan: { tests: [{ command: 'npm test', expected_result: 'PASS' }], observability: [{ signal: 'a', expected_result: 'PASS' }], acceptance_criteria: ['PASS'], rollback_steps: ['ROLLBACK'] },
    authorization: { decision: 'APROBADO', approved_by: 'VENTO_OWNER', approved_at: '2026-09-17T00:00:00.000Z', approval_ref: 'APROBADO', approval_statement: 'APROBADO GAP-PKG-045' },
  };
}

function dossier() {
  return {
    package_id: 'GAP-PKG-045',
    physical_discovery: { status: 'COMPLETE', searches: [{ repository: 'vento-group-sas/vento-shell', surface: 'A', method: 'CODE_SEARCH', evidence: 'src/a.ts' }], findings: [{ repository: 'vento-group-sas/vento-shell', path: 'src/a.ts', symbol_or_surface: 'A', operation: 'MODIFICAR' }], unresolved_findings: [] },
    physical_identity: { targets: [{ repository: 'vento-group-sas/vento-shell', path: 'src/a.ts', symbol_or_surface: 'A', operation: 'MODIFICAR' }] },
    implementation_units: [{ unit_id: 'A', repository: 'vento-group-sas/vento-shell', change: 'A' }],
    deployment_environment: { canonical_task_id: 'DELIV-PKG-019', rollout_profile: 'TP', environment_profile: 'ENV', targets: [{ environment_role: 'STAGING', target_type: 'WEB_ENVIRONMENT', target_id: 'staging', owner: 'OWN-OPS' }], production_authorized: false },
    evidence_plan: { tests: [{ command: 'npm test', expected_result: 'PASS' }], observability: [{ signal: 'a', expected_result: 'PASS' }], acceptance_criteria: ['PASS'], rollback_steps: ['ROLLBACK'] },
  };
}

test('remature reemplaza dossier, archiva aprobación y vuelve a PENDING', () => {
  const next = applyPackageGateDossier(record(), dossier(), { packageId: 'GAP-PKG-045', remature: true, now: '2026-09-18T00:00:00.000Z' });
  assert.equal(next.status, 'MATURATION_DRAFT');
  assert.equal(next.authorization.decision, 'PENDING');
  assert.equal(next.authorization_history.length, 1);
  assert.equal(next.authorization_history[0].decision, 'APROBADO');
  assert.equal(next.physical_discovery.status, 'COMPLETE');
});

test('mature no permite dossier de otro package', () => {
  assert.throws(() => applyPackageGateDossier(record(), { ...dossier(), package_id: 'GAP-PKG-046' }, { packageId: 'GAP-PKG-045' }), /IDENTITY_MISMATCH/u);
});
