import test from 'node:test';
import assert from 'node:assert/strict';

import {
  __test,
  buildAclPlan,
  buildCronPlan,
  buildDataApiPlan,
  buildFunctionPlan,
  buildSecretPlan,
  parseArgs,
  parseEnvSource,
  structuralFingerprintDifferences,
} from './staging-resource-reconciliation.mjs';

function baseFingerprint() {
  return {
    governed_schemas: ['public'],
    relations: [],
    views: [],
    columns: [],
    constraints: [],
    indexes: [],
    functions: [],
    triggers: [],
    policies: [],
    table_grants: [],
    routine_grants: [],
    publications: [],
    types: [],
    vital_boundary: { schema_present: true, included_in_governed_schemas: false },
  };
}

test('only STAGING is accepted and apply needs explicit acknowledgement', () => {
  assert.throws(
    () => parseArgs([
      'plan', '--environment-role', 'production', '--project-ref', 'prod', '--owner', 'SUPA-TRANS-015',
    ]),
    /ONLY_STAGING_IS_ALLOWED/u,
  );
  assert.throws(
    () => parseArgs([
      'apply', '--environment-role', 'staging', '--project-ref', 'stage', '--owner', 'SUPA-TRANS-015',
    ]),
    /APPLY_ACKNOWLEDGEMENT_REQUIRED/u,
  );
  const parsed = parseArgs([
    'apply', '--environment-role', 'staging', '--project-ref', 'stage', '--owner', 'SUPA-TRANS-015',
    '--acknowledge', 'MRP015-040',
  ]);
  assert.equal(parsed.environmentRole, 'STAGING');
});

test('structural SQL comparison excludes ACL arrays but detects real schema differences', () => {
  const local = baseFingerprint();
  const remote = structuredClone(local);
  remote.table_grants = [{ schema: 'public' }];
  remote.routine_grants = [{ schema: 'public' }];
  assert.deepEqual(structuralFingerprintDifferences(local, remote), []);
  remote.columns = [{ schema: 'public', relation: 'orders', name: 'id' }];
  assert.deepEqual(structuralFingerprintDifferences(local, remote), ['columns']);
});

test('ACL reconciliation builds role-invariant table and overloaded routine grants', () => {
  const local = baseFingerprint();
  const remote = baseFingerprint();
  local.functions = [
    {
      schema: 'public', name: 'lookup', identity_args: 'uuid',
      definition: 'CREATE OR REPLACE FUNCTION public.lookup(uuid) RETURNS void LANGUAGE sql AS $$ select $$;',
    },
    {
      schema: 'public', name: 'lookup', identity_args: 'text',
      definition: 'CREATE OR REPLACE FUNCTION public.lookup(text) RETURNS void LANGUAGE sql AS $$ select $$;',
    },
  ];
  remote.functions = structuredClone(local.functions);
  local.table_grants = [{
    schema: 'public', relation: 'orders', grantor: 'postgres', grantee: 'authenticated',
    privilege: 'SELECT', grantable: false,
  }];
  local.routine_grants = [
    {
      schema: 'public', routine: 'lookup', identity_args: 'uuid', grantor: 'postgres',
      grantee: 'authenticated', privilege: 'EXECUTE', grantable: false,
    },
    {
      schema: 'public', routine: 'lookup', identity_args: 'text', grantor: 'postgres',
      grantee: 'authenticated', privilege: 'EXECUTE', grantable: false,
    },
  ];
  const plan = buildAclPlan(local, remote);
  assert.equal(plan.structural_differences.length, 0);
  assert.equal(plan.actions.length, 3);
  assert.match(plan.sql, /grant SELECT on table "public"\."orders" to "authenticated";/u);
  assert.match(plan.sql, /"lookup"\(uuid\)/u);
  assert.match(plan.sql, /"lookup"\(text\)/u);
});

test('ACL reconciliation preserves unsupported grant provenance as unresolved instead of guessing', () => {
  const local = baseFingerprint();
  const remote = baseFingerprint();
  remote.table_grants = [{
    schema: 'public', relation: 'orders', grantor: 'supabase_admin', grantee: 'authenticated',
    privilege: 'SELECT', grantable: false,
  }];
  const plan = buildAclPlan(local, remote);
  assert.equal(plan.actions.length, 0);
  assert.equal(plan.unsupported.length, 1);
  assert.match(plan.unsupported[0].reason, /ACL_GRANTOR_UNSUPPORTED/u);
});

test('Data API plan patches all authoritative fields together', () => {
  const plan = buildDataApiPlan(
    {
      schemas: ['public', 'api', 'graphql_public'],
      extra_search_path: ['public', 'extensions'],
      max_rows: 1000,
    },
    {
      db_schema: 'public,pass,pos',
      db_extra_search_path: 'public,extensions',
      max_rows: 1000,
    },
  );
  assert.equal(plan.needs_patch, true);
  assert.deepEqual(plan.body, {
    db_schema: 'public,api,graphql_public',
    db_extra_search_path: 'public,extensions',
    max_rows: 1000,
  });
});

test('Cron plan creates missing jobs only from exact local replay commands', () => {
  const plan = buildCronPlan(
    [
      { jobname: 'a', schedule: '5 0 * * *', active: true },
      { jobname: 'b', schedule: '*/5 * * * *', active: true },
    ],
    [
      { jobid: 11, jobname: 'a', schedule: '0 0 * * *', active: false },
      { jobid: 99, jobname: 'extra', schedule: '* * * * *', active: true },
    ],
    [
      { jobname: 'b', schedule: '*/5 * * * *', active: true, command: 'select public.test_runtime();' },
    ],
  );
  assert.deepEqual(plan.missing, []);
  assert.deepEqual(plan.creates.map((row) => row.jobname), ['b']);
  assert.deepEqual(plan.extra, ['extra']);
  assert.deepEqual(plan.alters, [
    { jobname: 'a', jobid: 11, schedule: '5 0 * * *', active: true },
  ]);
  const sql = __test.cronMutationSql(plan);
  assert.match(sql, /cron\.schedule/u);
  assert.match(sql, /cron\.alter_job/u);
  assert.match(sql, /cron\.unschedule\('extra'\)/u);
  assert.match(sql, /select public\.test_runtime\(\);/u);
});

test('Cron plan fails closed when local replay disagrees with the versioned schedule', () => {
  assert.throws(
    () => buildCronPlan(
      [{ jobname: 'b', schedule: '*/5 * * * *', active: true }],
      [],
      [{ jobname: 'b', schedule: '0 * * * *', active: true, command: 'select 1;' }],
    ),
    /LOCAL_CRON_CANDIDATE_MISMATCH:b/u,
  );
});

test('Edge plan deploys hosted drift and deletes SOLO_LOCAL or unexpected hosted functions', () => {
  const expected = [
    { slug: 'hosted', verify_jwt: true, source_digest: 'new' },
    { slug: 'local-only', verify_jwt: false, source_digest: 'local' },
  ];
  const observed = [
    { slug: 'hosted', verify_jwt: true, source_digest: 'old' },
    { slug: 'local-only', verify_jwt: false, source_digest: 'local' },
    { slug: 'unexpected', verify_jwt: true, source_digest: 'x' },
  ];
  const plan = buildFunctionPlan(expected, observed, {
    edge_functions: {
      default_disposition: 'REQUIRED_HOSTED',
      solo_local: ['local-only'],
    },
  });
  assert.deepEqual(plan.deploy, ['hosted']);
  assert.deepEqual(plan.remove, ['local-only', 'unexpected']);
});

test('Environment parser handles quoted values without emitting them', () => {
  const parsed = parseEnvSource([
    'A="hello world"',
    "B='value'",
    'export C=abc123',
    '# D=ignored',
  ].join('\n'));
  assert.deepEqual(parsed, { A: 'hello world', B: 'value', C: 'abc123' });
});

test('Secret plan separates resolvable values from unresolved requirement identities', () => {
  const requirements = {
    required_all: ['A', 'B'],
    required_any_of: [
      { requirement_id: 'MAPS', names: ['MAPS_A', 'MAPS_B'] },
      { requirement_id: 'WOMPI', names: ['WOMPI_A', 'WOMPI_B'] },
    ],
  };
  const discovered = {
    resolved: new Map([
      ['A', { value: 'secret-a', source: 'test' }],
      ['MAPS_B', { value: 'maps-value', source: 'test' }],
    ]),
    ambiguous: [],
  };
  const plan = buildSecretPlan(requirements, ['B'], discovered);
  assert.deepEqual(plan.to_set.map((row) => row.name), ['A', 'MAPS_B']);
  assert.deepEqual(plan.unresolved, ['WOMPI']);
});

test('Google service account values are validated structurally', () => {
  assert.equal(
    __test.usableSecretValue(
      'GOOGLE_WALLET_SERVICE_ACCOUNT_JSON',
      JSON.stringify({ client_email: 'svc@example.com', private_key: '-----BEGIN PRIVATE KEY-----x' }),
    ),
    true,
  );
  assert.equal(__test.usableSecretValue('GOOGLE_WALLET_SERVICE_ACCOUNT_JSON', '{}'), false);
});


test('STAGING secret plan requests only blocking requirements and ignores dormant external integrations', () => {
  const requirements = {
    required_all: ['ACCOUNT_DELETION_WORKER_SECRET', 'INTERNAL_NOTIFY_SECRET'],
    required_any_of: [
      { requirement_id: 'ANIMA_SET_PASSWORD_URL', names: ['SET_PASSWORD_WEB_URL', 'INVITE_REDIRECT_URL'] },
    ],
    optional_or_defaulted: ['GOOGLE_WALLET_CLASS_ID', 'RESEND_API_KEY', 'WOMPI_PUBLIC_KEY'],
    local_only: [],
  };
  const discovered = {
    resolved: new Map([
      ['ACCOUNT_DELETION_WORKER_SECRET', { value: 'internal-a', source: 'test' }],
      ['INTERNAL_NOTIFY_SECRET', { value: 'internal-b', source: 'test' }],
      ['GOOGLE_WALLET_CLASS_ID', { value: 'external-value', source: 'test' }],
    ]),
    ambiguous: [],
  };
  const plan = buildSecretPlan(requirements, ['SET_PASSWORD_WEB_URL'], discovered);
  assert.deepEqual(
    plan.to_set.map((row) => row.name),
    ['ACCOUNT_DELETION_WORKER_SECRET', 'INTERNAL_NOTIFY_SECRET'],
  );
  assert.deepEqual(plan.unresolved, []);
});
