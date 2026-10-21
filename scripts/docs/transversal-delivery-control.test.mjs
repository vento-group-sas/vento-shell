import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';

import {
  assessTransversalDelivery,
  assessTransversalPreflight,
  deliveryRecordPath,
  readTransversalPolicy,
  runTransversalControl,
  validateDraftDossier,
  validateTransversalPolicy,
} from './transversal-delivery-control.mjs';

const sourceFiles = {
  'SHELL-PKG': 'docs/plan-canonico/modular/bloques/H_FUNDACION_COMPARTIDA/02_DISTRIBUCION_Y_PAQUETES_COMPARTIDOS.md',
  'SHELL-UI': 'docs/plan-canonico/modular/bloques/H_FUNDACION_COMPARTIDA/07_COMPONENTES_WEB_COMPARTIDOS.md',
  'SHELL-CI': 'docs/plan-canonico/modular/bloques/T_CALIDAD_Y_DESPLIEGUE/01_PAQUETES_RELEASES_Y_COMPATIBILIDAD.md',
  'SHELL-MIG': 'docs/plan-canonico/modular/bloques/H_FUNDACION_COMPARTIDA/07_01_MIGRACION_COORDINADA_DE_CONSUMIDORES_WEB.md',
};

function policy() {
  return {
    schema_version: 1,
    policy_id: 'TRANSVERSAL-DELIVERY-CONTROL-001',
    mode: 'CANONICAL_TASK_COMPOSITION',
    execution_mode: 'READ_ONLY_SCOPE_PREPARATION',
    automatic_authorization: false,
    assistant_remote_mutations: false,
    gap_package_selection: false,
    preserve_verified_instances: true,
    source_authority: 'CANONICAL_TASK_OWNERS_AND_INSTANCE_LEDGERS',
    record_directory: 'docs/plan-canonico/modular/transversal-delivery-instances',
    profiles: [{
      package_name: '@vento/ui-web',
      package_manifest: 'packages/ui-web/package.json',
      distribution_gate: 'PHYSICAL_SCOPE_AND_HUMAN_APPROVAL_REQUIRED',
      source_groups: Object.entries(sourceFiles).map(([prefix, owner_file]) => ({
        prefix,
        from: 1,
        to: 1,
        owner_file,
        instance_requirement: ['SHELL-UI', 'SHELL-CI'].includes(prefix) ? 'VERIFIED_GLOBAL' : 'NONE',
      })),
    }],
  };
}

function file(root, relative, content) {
  const target = path.join(root, ...relative.split('/'));
  fs.mkdirSync(path.dirname(target), { recursive: true });
  fs.writeFileSync(target, content);
  return target;
}

function fixture(t) {
  const root = fs.mkdtempSync(path.join(os.tmpdir(), 'vento-transversal-test-'));
  t.after(() => fs.rmSync(root, { recursive: true, force: true }));
  const p = policy();
  file(root, 'docs/plan-canonico/modular/transversal-delivery-policy.json', `${JSON.stringify(p, null, 2)}\n`);
  file(root, 'packages/ui-web/package.json', '{"name":"@vento/ui-web","private":true}\n');
  for (const [prefix, owner] of Object.entries(sourceFiles)) {
    file(root, owner, `### ✅ ${prefix}-001 — Fuente existente\n\n**Estado:** APROBADA\n\nDocumento propietario.\n`);
    if (['SHELL-UI', 'SHELL-CI'].includes(prefix)) {
      const id = `${prefix}-001`;
      file(root, `docs/plan-canonico/modular/implementation-instances/${id}__GLOBAL.json`,
        `${JSON.stringify({ task_id: id, instance_id: `${id}::GLOBAL`, status: 'VERIFIED' })}\n`);
    }
  }
  return { root, policy: p };
}

function draft() {
  return {
    schema_version: 1,
    package_name: '@vento/ui-web',
    status: 'DRAFT',
    source_task_ids: ['SHELL-PKG-001', 'SHELL-UI-001', 'SHELL-CI-001', 'SHELL-MIG-001'],
    physical_discovery: { status: 'PENDING', searches: [], findings: [], unresolved_findings: [] },
    target_repositories: [],
    physical_targets: [],
    validation_commands: [],
    rollback: { status: 'PENDING' },
    resource_conflict_evidence: [],
    human_authorization: null,
  };
}

// Synthetic, structurally complete rollback used only for readiness gate tests.
function completeRollback() {
  return {
    status: 'COMPLETE',
    owner: 'fixture package owner',
    baseline: {
      repository: 'vento-group-sas/vento-shell',
      commit_sha: 'a'.repeat(40),
      manifest: 'package.json',
      lockfile: 'package-lock.json',
    },
    steps: ['Restore the previously certified consumer snapshot'],
    validation_commands: ['npm ci'],
    stop_conditions: ['Abort if the baseline no longer matches'],
  };
}

test('policy profiles use existing canonical package identity, never GAP identities', () => {
  const p = policy();
  assert.equal(validateTransversalPolicy(p), true);
  assert.equal(deliveryRecordPath(p, '@vento/ui-web'),
    'docs/plan-canonico/modular/transversal-delivery-instances/vento-ui-web.json');
  p.profiles[0].package_name = 'GAP-PKG-999';
  assert.throws(() => validateTransversalPolicy(p), /INVALID_OR_DUPLICATE_PROFILE/u);
});

test('inspector reads four approved sources and two verified globals without editing', (t) => {
  const { root } = fixture(t);
  const source = fs.readFileSync(path.join(root, 'packages/ui-web/package.json'), 'utf8');
  const result = assessTransversalDelivery({ root, packageName: '@vento/ui-web' });
  assert.equal(result.canonical_sources, 4);
  assert.equal(result.verified_global_sources, 2);
  assert.equal(result.dossier, 'MISSING');
  assert.equal(result.physical_authorized, false);
  assert.equal(result.remote_mutations_authorized, false);
  assert.equal(fs.readFileSync(path.join(root, 'packages/ui-web/package.json'), 'utf8'), source);
});

test('missing owner block cannot be replaced with a derived registry claim', (t) => {
  const { root } = fixture(t);
  file(root, sourceFiles['SHELL-MIG'], '### ✅ SHELL-MIG-002 — Otra tarea\n**Estado:** APROBADA\n');
  assert.throws(() => assessTransversalDelivery({ root, packageName: '@vento/ui-web' }),
    /CANONICAL_TASK_MARKER_COUNT:SHELL-MIG-001:0/u);
});

test('unapproved canonical tasks block the composed source', (t) => {
  const { root } = fixture(t);
  file(root, sourceFiles['SHELL-PKG'], '### ✅ SHELL-PKG-001 — Fuente\n**Estado:** PROPUESTA\n');
  assert.throws(() => assessTransversalDelivery({ root, packageName: '@vento/ui-web' }),
    /SOURCE_NOT_APPROVED:SHELL-PKG-001/u);
});

test('a historical global instance must remain VERIFIED', (t) => {
  const { root } = fixture(t);
  file(root, 'docs/plan-canonico/modular/implementation-instances/SHELL-UI-001__GLOBAL.json',
    JSON.stringify({ task_id: 'SHELL-UI-001', instance_id: 'SHELL-UI-001::GLOBAL', status: 'IN_PROGRESS' }));
  assert.throws(() => assessTransversalDelivery({ root, packageName: '@vento/ui-web' }),
    /SOURCE_INSTANCE_NOT_VERIFIED:SHELL-UI-001/u);
});

test('no silent public package conversion before independent implementation authorization', (t) => {
  const { root } = fixture(t);
  file(root, 'packages/ui-web/package.json', '{"name":"@vento/ui-web","private":false,"exports":{".":"./dist/index.js"}}');
  assert.throws(() => assessTransversalDelivery({ root, packageName: '@vento/ui-web' }),
    /UNAUTHORIZED_DISTRIBUTABLE_MANIFEST/u);
});

test('dossier cannot self-authorize or impersonate a package gate', () => {
  const record = draft();
  assert.equal(validateDraftDossier(record, { packageName: '@vento/ui-web', taskIds: record.source_task_ids }), true);
  record.status = 'APPROVED_FOR_IMPLEMENTATION';
  assert.throws(() => validateDraftDossier(record, { packageName: '@vento/ui-web', taskIds: record.source_task_ids }),
    /DOSSIER_IDENTITY_OR_STATUS_INVALID/u);
  record.status = 'DRAFT';
  record.human_authorization = { decision: 'APPROVED' };
  assert.throws(() => validateDraftDossier(record, { packageName: '@vento/ui-web', taskIds: record.source_task_ids }),
    /DOSSIER_MUST_NOT_SELF_AUTHORIZE/u);
});

test('ready approval requires complete physical discovery, tests and lock evidence', () => {
  const record = draft();
  record.status = 'READY_FOR_APPROVAL';
  assert.throws(() => validateDraftDossier(record, { packageName: '@vento/ui-web', taskIds: record.source_task_ids }),
    /READY_FOR_APPROVAL_WITH_INCOMPLETE_SCOPE/u);
  record.physical_discovery.status = 'COMPLETE';
  record.physical_discovery.searches.push({ surface: 'PACKAGE_TREE', observation: '19 approved modules' });
  record.physical_discovery.findings.push('Physical scope reviewed');
  record.target_repositories = ['vento-group-sas/vento-shell'];
  record.physical_targets = [{ repository: 'vento-group-sas/vento-shell', path: 'packages/ui-web/package.json', operation: 'MODIFY', symbol_or_surface: 'distribution manifest' }];
  record.validation_commands = ['npm run docs:plan:check'];
  record.resource_conflict_evidence = [{ status: 'NON_CONFLICTING', instance: 'GAP-PKG-004' }];
  record.rollback = completeRollback();
  assert.equal(validateDraftDossier(record, { packageName: '@vento/ui-web', taskIds: record.source_task_ids }), true);
});

test('ready dossier rejects unresolved resource conflicts before physical admission', () => {
  const record = draft();
  record.status = 'READY_FOR_APPROVAL';
  record.physical_discovery.status = 'COMPLETE';
  record.physical_discovery.searches.push({ surface: 'RESOURCE_LOCKS' });
  record.physical_discovery.findings.push('Paths reviewed');
  record.target_repositories = ['vento-group-sas/vento-shell'];
  record.physical_targets = [{
    repository: 'vento-group-sas/vento-shell',
    path: 'packages/ui-web/package.json',
    operation: 'MODIFY',
    symbol_or_surface: 'package manifest',
  }];
  record.validation_commands = ['npm run docs:transversal:check'];
  record.resource_conflict_evidence = [{ status: 'UNRESOLVED_RECHECK_REQUIRED', owner: 'GAP-PKG-004' }];
  assert.throws(
    () => validateDraftDossier(record, { packageName: '@vento/ui-web', taskIds: record.source_task_ids }),
    /READY_FOR_APPROVAL_WITH_UNRESOLVED_CONFLICTS/u,
  );
});

test('ready dossier rejects pending and malformed rollback even with otherwise complete scope', () => {
  const record = draft();
  record.status = 'READY_FOR_APPROVAL';
  record.physical_discovery.status = 'COMPLETE';
  record.physical_discovery.searches.push({ surface: 'PACKAGE_TREE' });
  record.physical_discovery.findings.push('Scope verified');
  record.target_repositories = ['vento-group-sas/vento-shell'];
  record.physical_targets = [{
    repository: 'vento-group-sas/vento-shell',
    path: 'packages/ui-web/package.json',
    operation: 'MODIFY',
    symbol_or_surface: 'private manifest',
  }];
  record.validation_commands = ['npm run docs:transversal:check'];
  record.resource_conflict_evidence = [{ status: 'NON_CONFLICTING' }];
  const validate = () => validateDraftDossier(record, {
    packageName: '@vento/ui-web', taskIds: record.source_task_ids,
  });
  assert.throws(validate, /READY_FOR_APPROVAL_WITH_INCOMPLETE_ROLLBACK/u);
  record.rollback = { ...completeRollback(), steps: [] };
  assert.throws(validate, /READY_FOR_APPROVAL_WITH_INCOMPLETE_ROLLBACK/u);
  record.rollback = { ...completeRollback(), validation_commands: [''] };
  assert.throws(validate, /READY_FOR_APPROVAL_WITH_INCOMPLETE_ROLLBACK/u);
  record.rollback = { ...completeRollback(), stop_conditions: [] };
  assert.throws(validate, /READY_FOR_APPROVAL_WITH_INCOMPLETE_ROLLBACK/u);
  record.rollback = { ...completeRollback(), baseline: {
    ...completeRollback().baseline, commit_sha: 'invalid',
  } };
  assert.throws(validate, /READY_FOR_APPROVAL_WITH_INCOMPLETE_ROLLBACK/u);
  record.rollback = completeRollback();
  assert.equal(validate(), true);
});

test('preflight blocks absent and incomplete dossiers without touching the package', (t) => {
  const { root, policy: p } = fixture(t);
  const manifestPath = path.join(root, 'packages/ui-web/package.json');
  const before = fs.readFileSync(manifestPath, 'utf8');
  const missing = assessTransversalPreflight({ root, packageName: '@vento/ui-web' });
  assert.equal(missing.status, 'BLOCKED');
  assert.deepEqual(missing.blockers, ['DOSSIER_MISSING']);
  file(root, deliveryRecordPath(p, '@vento/ui-web'), JSON.stringify(draft()));
  const incomplete = assessTransversalPreflight({ root, packageName: '@vento/ui-web' });
  assert.equal(incomplete.status, 'BLOCKED');
  assert(incomplete.blockers.includes('DOSSIER_NOT_READY_FOR_APPROVAL'));
  assert(incomplete.blockers.includes('PHYSICAL_DISCOVERY_INCOMPLETE'));
  assert(incomplete.blockers.includes('RESOURCE_CONFLICT_EVIDENCE_UNRESOLVED'));
  assert.equal(incomplete.physical_authorized, false);
  assert.throws(() => runTransversalControl({ root, operation: 'preflight' }), /PREFLIGHT_BLOCKED/u);
  assert.equal(fs.readFileSync(manifestPath, 'utf8'), before);
});

test('preflight checks real target existence, local ownership and rejects deletes without admission', (t) => {
  const { root, policy: p } = fixture(t);
  const record = draft();
  record.target_repositories = ['vento-group-sas/vento-shell', 'vento-group-sas/vento-viso'];
  record.physical_targets = [
    {
      repository: 'vento-group-sas/vento-shell', path: 'packages/ui-web/package.json',
      operation: 'CREATE', symbol_or_surface: 'must not overwrite',
    },
    {
      repository: 'vento-group-sas/vento-shell', path: 'packages/ui-web/src/does-not-exist.tsx',
      operation: 'MODIFY', symbol_or_surface: 'must exist',
    },
    {
      repository: 'vento-group-sas/vento-shell', path: 'packages/ui-web/README.md',
      operation: 'DELETE', symbol_or_surface: 'requires separate gate',
    },
    {
      repository: 'vento-group-sas/vento-viso', path: 'src/app/page.tsx',
      operation: 'MODIFY', symbol_or_surface: 'requires separate checkout',
    },
  ];
  file(root, deliveryRecordPath(p, '@vento/ui-web'), JSON.stringify(record));
  const result = assessTransversalPreflight({ root, packageName: '@vento/ui-web' });
  assert.equal(result.status, 'BLOCKED');
  assert(result.blockers.includes('PHYSICAL_TARGET_CREATE_ALREADY_EXISTS:packages/ui-web/package.json'));
  assert(result.blockers.includes('PHYSICAL_TARGET_MODIFY_MISSING:packages/ui-web/src/does-not-exist.tsx'));
  assert(result.blockers.includes('PHYSICAL_TARGET_DELETE_REQUIRES_SEPARATE_GATE:packages/ui-web/README.md'));
  assert(result.blockers.includes('EXTERNAL_REPOSITORY_REQUIRES_INDEPENDENT_CHECK:vento-group-sas/vento-viso'));
  assert.equal(result.physical_authorized, false);
});

test('complete preflight is only READY_FOR_APPROVAL and never a physical authorization', (t) => {
  const { root, policy: p } = fixture(t);
  const record = draft();
  record.status = 'READY_FOR_APPROVAL';
  record.physical_discovery.status = 'COMPLETE';
  record.physical_discovery.searches.push({ surface: 'SOURCE' });
  record.physical_discovery.findings.push('Approved source reviewed');
  record.target_repositories = ['vento-group-sas/vento-shell'];
  record.physical_targets = [{
    repository: 'vento-group-sas/vento-shell',
    path: 'packages/ui-web/package.json',
    operation: 'MODIFY',
    symbol_or_surface: 'physical candidate',
  }];
  record.validation_commands = ['npm run docs:transversal:check'];
  record.resource_conflict_evidence = [{ status: 'NON_CONFLICTING', instance: 'GAP-PKG-004' }];
  record.rollback = completeRollback();
  file(root, deliveryRecordPath(p, '@vento/ui-web'), JSON.stringify(record));
  const result = runTransversalControl({ root, operation: 'preflight' });
  assert.equal(result.length, 1);
  assert.equal(result[0].status, 'READY_FOR_APPROVAL');
  assert.equal(result[0].physical_authorized, false);
  assert.equal(result[0].remote_mutations_authorized, false);
  assert.equal(JSON.parse(fs.readFileSync(path.join(root, 'packages/ui-web/package.json'), 'utf8')).private, true);
  assert.throws(() => runTransversalControl({ root, operation: 'authorize' }), /UNSUPPORTED_OPERATION/u);
});

test('duplicate physical targets and path traversal are rejected', () => {
  const record = draft();
  record.target_repositories = ['vento-group-sas/vento-shell'];
  record.physical_targets = [{ repository: 'vento-group-sas/vento-shell', path: '../outside.js', operation: 'MODIFY', symbol_or_surface: 'bad' }];
  assert.throws(() => validateDraftDossier(record, { packageName: '@vento/ui-web', taskIds: record.source_task_ids }),
    /INVALID_RELATIVE_PATH/u);
  record.physical_targets[0].path = 'packages/ui-web/package.json';
  record.physical_targets.push({ ...record.physical_targets[0] });
  assert.throws(() => validateDraftDossier(record, { packageName: '@vento/ui-web', taskIds: record.source_task_ids }),
    /DUPLICATE_PHYSICAL_TARGET/u);
});

test('source lineage must match every source exactly without duplicates', () => {
  const record = draft();
  record.source_task_ids[1] = 'SHELL-PKG-001';
  assert.throws(() => validateDraftDossier(record, { packageName: '@vento/ui-web', taskIds: draft().source_task_ids }),
    /DOSSIER_SOURCE_LINEAGE_MISMATCH/u);
});

test('draft dossier is visible but cannot authorize mutations', (t) => {
  const { root, policy: p } = fixture(t);
  file(root, deliveryRecordPath(p, '@vento/ui-web'), JSON.stringify(draft()));
  const report = assessTransversalDelivery({ root, packageName: '@vento/ui-web' });
  assert.equal(report.dossier, 'DRAFT_OR_READY');
  assert.equal(report.physical_authorized, false);
});

test('CLI check returns a count without changing manifest or GAP registry', (t) => {
  const { root } = fixture(t);
  assert.equal(readTransversalPolicy(root).profiles.length, 1);
  const result = runTransversalControl({ root, operation: 'check' });
  assert.equal(result[0].canonical_sources, 4);
  assert.equal(result[0].package_private, true);
});

test('strict policy denies unknown knobs or remote mutation enablement', () => {
  const p = policy();
  p.assistant_remote_mutations = true;
  assert.throws(() => validateTransversalPolicy(p), /POLICY_EXECUTION_BOUNDARY_CHANGED/u);
  p.assistant_remote_mutations = false;
  p.profiles[0].source_groups[0].extra = 'BYPASS';
  assert.throws(() => validateTransversalPolicy(p), /UNRECOGNIZED_FIELDS:source_group/u);
});

test('duplicated source range cannot create a second history owner', () => {
  const p = policy();
  p.profiles[0].source_groups.push({ ...p.profiles[0].source_groups[1] });
  assert.throws(() => validateTransversalPolicy(p), /DUPLICATE_OR_INVALID_TASK:SHELL-UI-001/u);
});
