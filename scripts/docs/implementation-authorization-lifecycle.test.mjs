import assert from 'node:assert/strict';
import test from 'node:test';

import { buildAuthorizedInstanceRecord, mapPhysicalOperation } from './implementation-authorization-lifecycle.mjs';

const identity = { instanceId: 'SHELL-CI-020::GAP-PKG-045', taskId: 'SHELL-CI-020', packageId: 'GAP-PKG-045' };
const pending = { instance_id: identity.instanceId, task_id: identity.taskId, status: 'PENDING_AUTHORIZATION', target_repositories: [], authorized_changes: [], validation_commands: [], authorization: null, evidence: [] };
const gate = {
  package_id: 'GAP-PKG-045',
  status: 'APPROVED_FOR_IMPLEMENTATION',
  authorization: { approval_statement: 'APROBADO GAP-PKG-045' },
  physical_discovery: { status: 'COMPLETE', searches: [{ repository: 'vento-group-sas/vento-shell', surface: 'A', method: 'CODE_SEARCH', evidence: 'src/a.ts' }], findings: [{ repository: 'vento-group-sas/vento-shell', path: 'src/a.ts', symbol_or_surface: 'A', operation: 'MODIFICAR' }], unresolved_findings: [] },
  physical_identity: { targets: [
    { repository: 'vento-group-sas/vento-shell', path: 'src/a.ts', symbol_or_surface: 'A', operation: 'MODIFICAR' },
    { repository: 'vento-group-sas/vento-shell', path: 'src/b.ts', symbol_or_surface: 'B', operation: 'ADOPTAR_SIN_MODIFICAR' },
  ] },
  implementation_units: [{ unit_id: 'A', repository: 'vento-group-sas/vento-shell', change: 'A' }],
  evidence_plan: { tests: [{ command: 'node --test tests/a.test.ts', expected_result: 'PASS' }] },
  deployment_environment: { environment_profile: 'ENV-WEB-CI-STAGING', targets: [{ environment_role: 'STAGING', target_type: 'WEB_ENVIRONMENT', target_id: 'staging', owner: 'OWN-OPS' }] },
};
const approval = { approvedBy: 'VENTO_OWNER', approvedAt: '2026-09-18T00:00:00.000Z', timezone: 'America/Bogota', approvalStatement: 'APROBADO SHELL-CI-020::GAP-PKG-045' };

test('mapea operaciones físicas canónicas sin inferir escrituras', () => {
  assert.equal(mapPhysicalOperation('CREAR'), 'CREATE');
  assert.equal(mapPhysicalOperation('MODIFICAR'), 'MODIFY');
  assert.equal(mapPhysicalOperation('ELIMINAR'), 'DELETE');
  assert.equal(mapPhysicalOperation('ADOPTAR_SIN_MODIFICAR'), 'EXECUTE_ONLY');
  assert.throws(() => mapPhysicalOperation('INFERIR'), /UNSUPPORTED/u);
});

test('CI020 deriva scope, tests, ambiente y autorización desde package-gate aprobado', () => {
  const record = buildAuthorizedInstanceRecord({ instance: pending, gate, identity, approval, sourceContractSha256: 'a'.repeat(64) });
  assert.equal(record.status, 'AUTHORIZED');
  assert.equal(record.authorization.decision, 'APPROVED');
  assert.equal(record.authorization.source_contract_sha256, 'a'.repeat(64));
  assert.ok(record.authorized_changes.some(({ path, change }) => path === 'src/a.ts' && change === 'MODIFY'));
  assert.ok(record.authorized_changes.some(({ path, change }) => path === 'src/b.ts' && change === 'EXECUTE_ONLY'));
  assert.deepEqual(record.validation_commands, ['node --test tests/a.test.ts']);
  assert.equal(record.target_environments[0].environment_role, 'STAGING');
  assert.match(record.prerequisite_evidence.join(' '), /PHYSICAL_DISCOVERY COMPLETE/u);
});

test('CI020 falla cerrado sin physical discovery explícito', () => {
  assert.throws(() => buildAuthorizedInstanceRecord({ instance: pending, gate: { ...gate, physical_discovery: undefined }, identity, approval, sourceContractSha256: 'a'.repeat(64) }), /PHYSICAL_DISCOVERY_COMPLETE/u);
});

test('CI021 reutiliza lifecycle estándar y exige CI020 VERIFIED', () => {
  const ci021Identity = { instanceId: 'SHELL-CI-021::GAP-PKG-045', taskId: 'SHELL-CI-021', packageId: 'GAP-PKG-045' };
  const ci021Pending = { ...pending, instance_id: ci021Identity.instanceId, task_id: ci021Identity.taskId };
  const previous = { instance_id: 'SHELL-CI-020::GAP-PKG-045', task_id: 'SHELL-CI-020', status: 'VERIFIED', evidence: ['PASS'] };
  const record = buildAuthorizedInstanceRecord({ instance: ci021Pending, gate, identity: ci021Identity, previous, approval, sourceContractSha256: 'b'.repeat(64) });
  assert.equal(record.status, 'AUTHORIZED');
  assert.deepEqual(record.validation_commands, [
    'npm run docs:package:gate:check -- --package-id GAP-PKG-045',
    'npm run docs:package:readiness:check -- --package GAP-PKG-045',
    'npm run docs:package:execution:check',
    'npm run docs:implementation:check',
  ]);
  assert.ok(record.authorized_changes.every(({ path, change }) => path.includes('implementation-instances/') || change === 'EXECUTE_ONLY'));
});
