import assert from 'node:assert/strict';
import fs from 'node:fs';
import { spawnSync } from 'node:child_process';
import { test } from 'node:test';
// Aggregate all QA Kernel phase suites behind the stable, approved npm command.
import './qa-kernel-isolation.test.mjs';
import {
  KERNEL_ID,
  TARGET_ENVIRONMENT,
  loadCatalog,
  validateCatalog,
  validateSource,
  planWorkload,
  planTestPreflight,
  compareRunnerEnvelope,
  reconcileMigrationCandidates,
  transitionLifecycle,
} from './qa-kernel.mjs';

const catalog = loadCatalog();
const baseSource = Object.freeze({
  repository: 'vento-group-sas/vento-shell',
  branch: 'infra/qa-kernel-f0',
  head: 'a'.repeat(40),
  clean: true,
  staged_count: 0,
  environment: TARGET_ENVIRONMENT,
});
const updated = (callback) => {
  const copy = structuredClone(catalog);
  callback(copy);
  return copy;
};
const source = (changes = {}) => ({ ...baseSource, ...changes });
const file = (name, digit = 'a') => ({
  file: 'supabase/migrations/' + name,
  sha256: digit.repeat(64),
});
const baseline = [
  file('00000000000000_baseline.sql'),
  file('20260913131524_gap_pkg_019_governed_analytics.sql', 'b'),
];

test('catalog is PLAN_ONLY and owns baseline plus three independent lanes', () => {
  assert.equal(validateCatalog(catalog), true);
  assert.equal(catalog.kernel_id, KERNEL_ID);
  assert.equal(catalog.execution_mode, 'PLAN_ONLY');
  assert.deepEqual(catalog.profiles.map((p) => p.id), [
    'foundation-baseline', 'auth-db-034', 'gap-pkg-004', 'pass-redemption',
  ]);
  assert.equal(catalog.capabilities.length, 9);
});

test('no instance_id is required or accepted to plan non-GAP work', () => {
  const profile = catalog.profiles.find((p) => p.id === 'pass-redemption');
  const plan = planWorkload({
    catalog, profileId: profile.id, source: source(),
    availableTests: profile.test_files,
  });
  assert.equal(plan.profile, 'pass-redemption');
  assert.equal(plan.status, 'PENDING');
  assert.equal(plan.reason, 'RUNTIME_NOT_EXECUTED');
  assert.equal(plan.pg_tap_certified, false);
  assert.equal(plan.qa_executed, false);
  assert.equal(plan.remote_mutations, false);
  assert.deepEqual(plan.missing_test_files, []);
  assert.throws(() => validateSource(source({ instance_id: 'AUTH-DB-034::GLOBAL' })),
    /QA_KERNEL_SOURCE_KEYS_INVALID/u);
});

test('the same numeric 048 prefix does not conflate AUTH and PASS tests', () => {
  const auth = catalog.profiles.find((p) => p.id === 'auth-db-034');
  const pass = catalog.profiles.find((p) => p.id === 'pass-redemption');
  assert.ok(auth.test_files.some((f) => f.includes('/048_')));
  assert.ok(pass.test_files.some((f) => f.includes('/048_')));
  assert.notEqual(auth.test_files.find((f) => f.includes('/048_')),
    pass.test_files.find((f) => f.includes('/048_')));
});

test('planning on main baseline blocks absent candidate tests, not marks PASS', () => {
  for (const profile of catalog.profiles) {
    const plan = planWorkload({
      catalog, profileId: profile.id,
      source: source(), availableTests: [],
    });
    assert.equal(plan.status, 'BLOCKED');
    assert.equal(plan.reason, 'TEST_FILES_NOT_IN_SOURCE');
    assert.deepEqual(plan.missing_test_files, profile.test_files);
    assert.equal(plan.qa_executed, false);
  }
});

test('capabilities resolve dependencies in correct order', () => {
  const profile = catalog.profiles.find((p) => p.id === 'auth-db-034');
  const plan = planWorkload({
    catalog, profileId: profile.id,
    source: source(), availableTests: profile.test_files,
  });
  const names = plan.requirements.map((cap) => cap.id);
  assert.ok(names.indexOf('source_attestation') < names.indexOf('isolated_postgres'));
  assert.ok(names.indexOf('migration_manifest') < names.indexOf('migration_replay'));
  assert.ok(names.indexOf('isolated_postgres') < names.indexOf('scram_loopback'));
  assert.ok(names.includes('scram_loopback'));
  assert.ok(!names.includes('fdw_server'), 'AUTH 042 usa SCRAM/BIND sin foreign server ni GRANT FDW');
  assert.ok(names.indexOf('migration_replay') < names.indexOf('pgtap'));
  assert.ok(names.indexOf('rollback') >= 0);
  assert.equal(new Set(names).size, names.length);
});

test('plans bind source SHA and change fingerprint when the branch SHA changes', () => {
  const profile = catalog.profiles[1];
  const props = {
    catalog, profileId: profile.id, availableTests: profile.test_files,
  };
  const a = planWorkload({ ...props, source: source() });
  const b = planWorkload({ ...props, source: source({ head: 'b'.repeat(40) }) });
  assert.match(a.plan_sha256, /^[a-f0-9]{64}$/u);
  assert.notEqual(a.plan_sha256, b.plan_sha256);
  assert.deepEqual(a.source, {
    repository: baseSource.repository, branch: baseSource.branch,
    head: baseSource.head, environment: TARGET_ENVIRONMENT,
  });
});

test('source attestation fails closed without a known Git branch or environment', () => {
  for (const variant of [
    { repository: 'devventogroup/vento-shell' },
    { repository: 'vento-group-sas/vento-pass' },
    { branch: '../main' },
    { branch: 'refs//heads/main' },
    { branch: 'bad.lock' },
    { head: '0'.repeat(39) },
    { head: 'X'.repeat(40) },
    { clean: false },
    { staged_count: 1 },
    { environment: 'STAGING' },
    { environment: 'PRODUCTION' },
    { environment: 'QA_LOCAL_SHARED' },
  ]) {
    assert.throws(() => validateSource(source(variant)),
      /QA_KERNEL_SOURCE_NOT_ATTESTABLE/u);
  }
});

test('unknown source fields, notably remote project refs, are refused', () => {
  for (const variant of [
    { project_ref: 'rcrxixmqhrndcervbllp' },
    { db_url: 'postgres://private.example.invalid' },
    { token: 'secret' },
  ]) {
    assert.throws(() => validateSource(source(variant)),
      /QA_KERNEL_SOURCE_KEYS_INVALID/u);
  }
});

test('catalog rejects arbitrary keys, remote targets and executable mode', () => {
  for (const mutate of [
    (c) => { c.execution_mode = 'RUN'; },
    (c) => { c.target_environment = 'STAGING'; },
    (c) => { c.owner_repository = 'devventogroup/vento-shell'; },
    (c) => { c.remote_mutations = true; },
    (c) => { c.capabilities[0].command = 'supabase db reset'; },
  ]) assert.throws(() => validateCatalog(updated(mutate)), /QA_KERNEL_/u);
});

test('capability graph rejects missing dependencies, cycles and duplicates', () => {
  for (const mutate of [
    (c) => { c.capabilities[0].requires = ['absent']; },
    (c) => { c.capabilities[0].requires = ['rollback']; },
    (c) => { c.capabilities.push(structuredClone(c.capabilities[0])); },
    (c) => { c.capabilities[1].requires = ['source_attestation', 'source_attestation']; },
  ]) assert.throws(() => validateCatalog(updated(mutate)), /QA_KERNEL_/u);
});

test('profiles reject unknown dependencies, unsafe test paths and duplicates', () => {
  for (const mutate of [
    (c) => { c.profiles[0].requires.push('remote_sql'); },
    (c) => { c.profiles[0].test_files.push('../tests/secret.sql'); },
    (c) => { c.profiles[0].test_files.push(c.profiles[0].test_files[0]); },
    (c) => { c.profiles[0].owner = 'AUTH-DB-034::GLOBAL'; },
    (c) => { c.profiles[0].preflight_sql = 'select 1'; },
    (c) => { c.profiles.push(structuredClone(c.profiles[0])); },
  ]) assert.throws(() => validateCatalog(updated(mutate)), /QA_KERNEL_/u);
});

test('planner refuses invented test inventories and unknown lane', () => {
  assert.throws(() => planWorkload({
    catalog, profileId: 'does-not-exist', source: source(), availableTests: [],
  }), /QA_KERNEL_PROFILE_UNKNOWN/u);
  assert.throws(() => planWorkload({
    catalog, profileId: 'gap-pkg-004', source: source(), availableTests: ['../secret.sql'],
  }), /QA_KERNEL_TEST_INVENTORY_INVALID/u);
  assert.throws(() => planWorkload({
    catalog, profileId: 'gap-pkg-004', source: source(),
  }), /QA_KERNEL_TEST_INVENTORY_INVALID/u);
});


test('F2 preflight separates actual 042 SCRAM and 048 private projection requirements', () => {
  const profile = catalog.profiles.find((p) => p.id === 'auth-db-034');
  const preflight = planTestPreflight({
    catalog, profileId: profile.id, source: source(),
    availableTests: profile.test_files,
  });
  assert.equal(preflight.status, 'PENDING');
  assert.equal(preflight.reason, 'RUNTIME_PROBES_AND_RUNNER_SEPARATION_REQUIRED');
  assert.deepEqual(preflight.missing_test_contracts, []);
  assert.deepEqual(preflight.test_preflights.map((x) => x.file), profile.test_files);
  const [context, projection] = preflight.test_preflights;
  assert.deepEqual(context.probes.extensions, ['pgtap', 'dblink']);
  assert.equal(context.probes.min_connections, 2);
  assert.deepEqual(context.probes.set_roles,
    ['vento_context_freshness_owner', 'vento_ddl_owner']);
  assert.deepEqual(context.requires, ['pgtap', 'scram_loopback', 'rollback']);
  assert.deepEqual(projection.probes.extensions, ['pgtap']);
  assert.equal(projection.probes.min_connections, 1);
  assert.deepEqual(projection.probes.set_roles, ['vento_authorization_owner']);
  assert.deepEqual(projection.requires, ['pgtap', 'rollback']);
  assert.equal(projection.probes.fixtures, 'SYNTHETIC_ONLY');
  assert.equal(projection.probes.bootstrap, 'PRIVILEGED_SETUP_REQUIRED');
  for (const item of [context, projection]) {
    assert.ok(!item.requires.includes('fdw_server'));
    assert.equal(item.probes.fixtures, 'SYNTHETIC_ONLY');
  }
  assert.equal(preflight.bootstrap_attested, false);
  assert.equal(preflight.runner_non_admin_attested, false);
  assert.equal(preflight.runtime_probes_executed, false);
  assert.equal(preflight.qa_executed, false);
  assert.equal(preflight.pg_tap_certified, false);
});

test('F2 AUTH source inventory blocks absent 048 even when its contract is declared', () => {
  const profile = catalog.profiles.find((p) => p.id === 'auth-db-034');
  const availableTests = profile.test_files.filter((file) => fs.existsSync(file));
  const preflight = planTestPreflight({
    catalog, profileId: profile.id, source: source(), availableTests,
  });
  assert.deepEqual(preflight.missing_test_contracts, []);
  assert.deepEqual(preflight.missing_test_files,
    profile.test_files.filter((file) => !availableTests.includes(file)));
  assert.equal(preflight.status, preflight.missing_test_files.length ? 'BLOCKED' : 'PENDING');
  assert.equal(preflight.reason, preflight.missing_test_files.length
    ? 'TEST_FILES_NOT_IN_SOURCE' : 'RUNTIME_PROBES_AND_RUNNER_SEPARATION_REQUIRED');
  assert.equal(preflight.qa_executed, false);
  assert.equal(preflight.pg_tap_certified, false);
});

test('F2 basic non-admin declaration rejects 042 and 048 without fake PASS', () => {
  // The current first-runner envelope is deliberately minimal.
  // This only compares data; it does not attest installed MCP capabilities.
  const offeredRunner = {
    extensions: ['pgtap'], max_connections: 1,
    set_roles: [], fixture_modes: ['NONE'], bootstrap_separated: true,
  };
  const profile = catalog.profiles.find((p) => p.id === 'auth-db-034');
  const plan = planTestPreflight({
    catalog, profileId: profile.id, source: source(),
    availableTests: profile.test_files.slice(0, 1), offeredRunner,
  });
  assert.equal(plan.status, 'BLOCKED');
  assert.deepEqual(plan.missing_test_files, [profile.test_files[1]]);
  const [context, projection] = plan.test_preflights.map((x) => x.runner_compatibility);
  assert.equal(context.status, 'BLOCKED');
  assert.deepEqual(context.gaps, [
    'REQUIRED_EXTENSION_UNSUPPORTED', 'MIN_CONNECTIONS_UNSUPPORTED',
    'SET_ROLE_UNSUPPORTED', 'FIXTURE_MODE_UNSUPPORTED',
  ]);
  assert.equal(projection.status, 'BLOCKED');
  assert.deepEqual(projection.gaps, [
    'SET_ROLE_UNSUPPORTED', 'FIXTURE_MODE_UNSUPPORTED',
  ]);
  assert.equal(plan.pg_tap_certified, false);
  assert.equal(plan.runner_non_admin_attested, false);
  assert.equal(projection.role_authorization_attested, false);
});

test('F2 matching declared permissions remain PENDING physical admission', () => {
  const offer = {
    extensions: ['pgtap'], max_connections: 1,
    set_roles: ['vento_authorization_owner'],
    fixture_modes: ['NONE', 'SYNTHETIC_ONLY'],
    bootstrap_separated: true,
  };
  const contract = catalog.profiles.find((p) => p.id === 'auth-db-034')
    .test_contracts[1];
  const comparison = compareRunnerEnvelope(contract.probes, offer);
  assert.equal(comparison.status, 'PENDING');
  assert.equal(comparison.reason, 'PHYSICAL_RUNNER_AND_OWNER_ATTESTATION_REQUIRED');
  assert.deepEqual(comparison.gaps, []);
  assert.equal(comparison.offered_capabilities_attested, false);
  assert.equal(comparison.qa_executed, false);
  assert.equal(comparison.pg_tap_certified, false);
  const baseline = catalog.profiles.find((p) => p.id === 'foundation-baseline');
  const simpler = planTestPreflight({
    catalog, profileId: baseline.id, source: source(),
    availableTests: baseline.test_files,
    offeredRunner: {
      extensions: ['pgtap'], max_connections: 1, set_roles: [],
      fixture_modes: ['NONE'], bootstrap_separated: true,
    },
  });
  assert.equal(simpler.test_preflights[0].runner_compatibility.status, 'PENDING');
  assert.equal(simpler.qa_executed, false);
});

test('F2 runner envelope rejects forged privileges or invalid declarations', () => {
  const probes = catalog.profiles.find((p) => p.id === 'auth-db-034')
    .test_contracts[1].probes;
  const valid = {
    extensions: ['pgtap'], max_connections: 1,
    set_roles: [], fixture_modes: ['NONE'],
    bootstrap_separated: false,
  };
  for (const change of [
    { max_connections: 0 }, { max_connections: 17 },
    { extensions: ['pgtap', 'pgtap'] }, { extensions: [] },
    { set_roles: ['postgres;GRANT'] }, { set_roles: ['owner', 'owner'] },
    { fixture_modes: ['LIVE_DATA'] }, { fixture_modes: [] },
    { bootstrap_separated: 'true' }, { admin_override: true },
  ]) assert.throws(() => compareRunnerEnvelope(probes, { ...valid, ...change }),
    /QA_KERNEL_RUNNER_ENVELOPE_INVALID/u);
  for (const changed of [
    { extensions: [] }, { min_connections: 0 },
    { set_roles: 'vento_authorization_owner' },
    { fixtures: 'LIVE_DATA' }, { bootstrap: 'AUTO_ADMIN_GRANT' },
    { unbounded_sql: true },
  ]) assert.throws(() => compareRunnerEnvelope({ ...probes, ...changed }, valid),
    /QA_KERNEL_RUNNER_PROBES_INVALID/u);
  const result = compareRunnerEnvelope(probes, valid);
  assert.ok(result.gaps.includes('PRIVILEGED_BOOTSTRAP_SEPARATION_UNDECLARED'));
  assert.equal(result.status, 'BLOCKED');
});

test('F2 without external runner declaration preserves existing planner contract', () => {
  const profile = catalog.profiles.find((p) => p.id === 'auth-db-034');
  const plan = planTestPreflight({
    catalog, profileId: profile.id, source: source(),
    availableTests: profile.test_files,
  });
  assert.equal(plan.status, 'PENDING');
  assert.equal(plan.reason, 'RUNTIME_PROBES_AND_RUNNER_SEPARATION_REQUIRED');
  assert.ok(plan.test_preflights.every((x) => !Object.hasOwn(x, 'runner_compatibility')));
  assert.equal(plan.pg_tap_certified, false);
});

test('F2 contract tracks actual SET ROLE actors in 042 source SQL', () => {
  const profile = catalog.profiles.find((p) => p.id === 'auth-db-034');
  const contract = profile.test_contracts[0];
  const sql = fs.readFileSync(contract.file, 'utf8');
  const used = [...sql.matchAll(/\bset\s+(?:local\s+)?role\s+([a-z][a-z0-9_]*)/giu)]
    .map((match) => match[1].toLowerCase());
  assert.deepEqual([...new Set(used)].sort(), [...contract.probes.set_roles].sort());
  assert.deepEqual([...new Set(used)].sort(),
    ['vento_context_freshness_owner', 'vento_ddl_owner'].sort());
});

test('F2 preflight never turns a full plan into runtime PASS', () => {
  const profile = catalog.profiles.find((p) => p.id === 'foundation-baseline');
  const preflight = planTestPreflight({
    catalog, profileId: profile.id, source: source(),
    availableTests: profile.test_files,
  });
  assert.equal(preflight.status, 'PENDING');
  assert.equal(preflight.reason, 'RUNTIME_PROBES_AND_RUNNER_SEPARATION_REQUIRED');
  assert.deepEqual(preflight.missing_test_contracts, []);
  assert.equal(preflight.test_preflights.length, 1);
  assert.equal(preflight.test_preflights[0].probes.bootstrap,
    'PRIVILEGED_SETUP_REQUIRED');
  assert.equal(preflight.bootstrap_attested, false);
  assert.equal(preflight.runner_non_admin_attested, false);
  assert.equal(preflight.qa_executed, false);
  assert.equal(preflight.pg_tap_certified, false);
});

test('F2 preflight blocks absent source SQL before considering runner privileges', () => {
  const preflight = planTestPreflight({
    catalog, profileId: 'foundation-baseline', source: source(),
    availableTests: [],
  });
  assert.equal(preflight.status, 'BLOCKED');
  assert.equal(preflight.reason, 'TEST_FILES_NOT_IN_SOURCE');
  assert.equal(preflight.missing_test_files.length, 1);
  assert.equal(preflight.runtime_probes_executed, false);
});

test('F2 preflight fingerprint follows source SHA and fails closed on hostile source', () => {
  const args = {
    catalog, profileId: 'foundation-baseline',
    availableTests: catalog.profiles[0].test_files,
  };
  const first = planTestPreflight({ ...args, source: source() });
  const changed = planTestPreflight({
    ...args, source: source({ head: 'b'.repeat(40) }),
  });
  assert.notEqual(first.plan_sha256, changed.plan_sha256);
  assert.throws(() => planTestPreflight({
    ...args, source: source({ environment: 'STAGING' }),
  }), /QA_KERNEL_SOURCE_NOT_ATTESTABLE/u);
});

test('F2 test contracts reject undeclared permissions, unsafe probes and tampering', () => {
  const cases = [
    (c) => { c.profiles[0].test_contracts[0].file = '../evil.sql'; },
    (c) => { c.profiles[0].test_contracts.push(
      structuredClone(c.profiles[0].test_contracts[0])); },
    (c) => { c.profiles[0].test_contracts[0].requires = ['fdw_server']; },
    (c) => { c.profiles[0].test_contracts[0].probes.extensions = ['pgtap', 'pgtap']; },
    (c) => { c.profiles[0].test_contracts[0].probes.min_connections = 0; },
    (c) => { c.profiles[0].test_contracts[0].probes.set_roles = ['postgres;drop']; },
    (c) => { c.profiles[0].test_contracts[0].probes.fixtures = 'LIVE_USERS'; },
    (c) => { c.profiles[0].test_contracts[0].probes.bootstrap = 'AUTO_GRANT_ADMIN'; },
    (c) => { c.profiles[0].test_contracts[0].probes.sql = 'GRANT ALL'; },
    (c) => { c.profiles[0].test_contracts[0].command = 'docker exec'; },
    (c) => { c.profiles[0].test_contracts = 'none'; },
  ];
  for (const mutate of cases) {
    assert.throws(() => validateCatalog(updated(mutate)), /QA_KERNEL_/u);
  }
});

test('lifecycle cannot skip owner attestation, rollback or terminal state', () => {
  assert.equal(transitionLifecycle('PENDING', 'ATTESTED'), 'ATTESTED');
  assert.equal(transitionLifecycle('ATTESTED', 'READY'), 'READY');
  assert.equal(transitionLifecycle('RUNNING', 'RESTORING'), 'RESTORING');
  assert.equal(transitionLifecycle('BLOCKED', 'RESTORING'), 'RESTORING');
  assert.equal(transitionLifecycle('RESTORING', 'CLOSED'), 'CLOSED');
  for (const step of [
    ['PENDING', 'RUNNING'],
    ['READY', 'CLOSED'],
    ['RUNNING', 'CLOSED'],
    ['FAIL', 'CLOSED'],
    ['CLOSED', 'RUNNING'],
    ['BOGUS', 'PASS'],
  ]) assert.throws(() => transitionLifecycle(...step),
    /QA_KERNEL_LIFECYCLE_TRANSITION_FORBIDDEN/u);
});

test('22 historical plus 2 GAP, 1 AUTH and 1 PASS source entries project 26', () => {
  const b22 = Array.from({ length: 22 }, (_, i) =>
    file(String(20260801000000 + i).padStart(14, '0') + '_canonical.sql'));
  const overlays = [
    { lane: 'gap-pkg-004', migrations: [
      file('20261012173553_gap_pkg_004_rpc_acl_hardening.sql'),
      file('20261020223916_attendance_geofence_authority.sql'),
    ] },
    { lane: 'auth-db-034', migrations: [
      file('20261023023158_auth_db_034_corr_002_safe_projection.sql'),
    ] },
    { lane: 'pass-redemption', migrations: [
      file('20261026235844_pass_loyalty_redemption_v1.sql'),
    ] },
  ];
  const result = reconcileMigrationCandidates({ baseline: b22, overlays });
  assert.equal(result.status, 'PENDING_QA');
  assert.equal(result.projected_count, 26);
  assert.equal(result.candidate_count, 4);
  assert.equal(result.baseline_count, 22);
  assert.deepEqual(result.candidates.map((x) => x.owners[0]), [
    'gap-pkg-004', 'gap-pkg-004', 'auth-db-034', 'pass-redemption',
  ]);
  assert.equal(result.replay_executed, false);
  assert.equal(result.hosted_mutations, false);
});

test('identical inherited migrations deduplicate safely across overlays', () => {
  const result = reconcileMigrationCandidates({
    baseline,
    overlays:[
      { lane: 'auth-db-034', migrations:[baseline[1]] },
      { lane: 'pass-redemption', migrations:[file('20261026235844_pass_loyalty_redemption_v1.sql')] },
    ],
  });
  assert.equal(result.status, 'PENDING_QA');
  assert.equal(result.candidate_count, 1);
  assert.equal(result.projected_count, 3);
});

test('different SHA for the same migration is blocked, never silently overwritten', () => {
  const result = reconcileMigrationCandidates({
    baseline,
    overlays:[{ lane: 'auth-db-034', migrations:[file('20260913131524_gap_pkg_019_governed_analytics.sql', 'c')] }],
  });
  assert.equal(result.status, 'BLOCKED');
  assert.ok(result.conflicts.some((x) => x.code === 'MIGRATION_CONTENT_COLLISION'));
});

test('different filenames with the same migration version are blocked', () => {
  const result = reconcileMigrationCandidates({
    baseline,
    overlays:[{ lane: 'pass-redemption', migrations:[
      file('20260913131524_pass_loyalty_redemption.sql'),
    ] }],
  });
  assert.equal(result.status, 'BLOCKED');
  assert.ok(result.conflicts.some((x) => x.code === 'MIGRATION_VERSION_COLLISION'));
});

test('overlay ordering never overrides deterministic timestamp order', () => {
  const result = reconcileMigrationCandidates({
    baseline,
    overlays:[{ lane: 'pass-redemption', migrations:[
      file('20261026235844_pass_loyalty_redemption_v1.sql'),
      file('20261012173553_gap_pkg_004_rpc_acl_hardening.sql'),
    ] }],
  });
  assert.deepEqual(result.candidates.map((x) => x.version), [
    '20261012173553', '20261026235844',
  ]);
});

test('no remote, path traversal, invalid SHA or SQL file name may enter reconciliation', () => {
  for (const invalid of [
    file('../20261026235844_pass_loyalty_redemption_v1.sql'),
    file('20261026235844_pass_loyalty_redemption_v1.sql', 'Z'),
    { file: 'supabase/remote/20261026235844_pass.sql', sha256:'a'.repeat(64) },
    { file: 'supabase/migrations/abc.sql', sha256:'a'.repeat(64) },
    { file:'supabase/migrations/20261026235844_pass.sql', sha256:'a'.repeat(64), remote:true },
  ]) assert.throws(() => reconcileMigrationCandidates({
    baseline, overlays:[{ lane:'pass-redemption',migrations:[invalid] }],
  }), /QA_KERNEL_MIGRATION_SOURCE_/u);
});

test('duplicate baseline, duplicate overlay, duplicate lane and missing overlay reject', () => {
  for (const input of [
    { baseline:[...baseline,baseline[0]], overlays:[{ lane:'auth-db-034',migrations:[] }] },
    { baseline, overlays:[{ lane:'auth-db-034',migrations:[baseline[0],baseline[0]] }] },
    { baseline, overlays:[{lane:'auth-db-034',migrations:[]},{lane:'auth-db-034',migrations:[]}] },
    { baseline, overlays:[] },
  ]) assert.throws(() => reconcileMigrationCandidates(input), /QA_KERNEL_/u);
});

test('read-only CLI check is informational and does not execute QA', () => {
  const result = spawnSync(process.execPath, ['scripts/quality/qa-kernel.mjs','check'], {
    cwd: process.cwd(), encoding:'utf8', windowsHide:true, timeout:15000,
  });
  assert.equal(result.status, 0, result.stderr);
  const summary = JSON.parse(result.stdout);
  assert.equal(summary.status, 'PASS');
  assert.equal(summary.runtime_qa, 'NOT_EXECUTED');
  assert.equal(summary.remote_mutations, false);
  assert.equal(summary.execution_mode, 'PLAN_ONLY');
});

test('CLI refuses unrecognized actions instead of granting an execution path', () => {
  const result = spawnSync(process.execPath, ['scripts/quality/qa-kernel.mjs','execute'], {
    cwd: process.cwd(), encoding:'utf8', windowsHide:true, timeout:15000,
  });
  assert.equal(result.status, 1);
  const summary = JSON.parse(result.stderr);
  assert.equal(summary.status, 'FAIL');
  assert.equal(summary.code, 'QA_KERNEL_CLI_ACTION_NOT_ALLOWED');
});
