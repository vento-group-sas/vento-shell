-- VENTO_DB_TEST_CATEGORY: SCHEMA
begin;

create extension if not exists pgtap with schema extensions;

select plan(38);

create or replace function pg_temp.gap019_reconciliation(
  p_source numeric default 100,
  p_accepted numeric default 86,
  p_rejected numeric default 4,
  p_quarantine numeric default 3,
  p_duplicates numeric default 5,
  p_excluded numeric default 2,
  p_materialized numeric default 86
)
returns jsonb
language sql
immutable
as $gap019_test_reconciliation$
  select pg_catalog.jsonb_build_object(
    'contract_version', '1.0.0',
    'source', pg_catalog.jsonb_build_object(
      'source_id', 'canonical-sales-events',
      'source_version', '2026-09-13',
      'schema_version', '3.2.0',
      'period_start', '2026-09-01',
      'period_end', '2026-09-07',
      'cutoff_at', '2026-09-08T05:00:00.000Z',
      'source_count', p_source
    ),
    'processing', pg_catalog.jsonb_build_object(
      'transformation_id', 'sales-kpi-weekly',
      'transformation_version', '1.4.0',
      'accepted_count', p_accepted,
      'rejected_count', p_rejected,
      'quarantine_count', p_quarantine,
      'duplicate_count', p_duplicates,
      'excluded_count', p_excluded,
      'materialized_count', p_materialized
    ),
    'lineage', pg_catalog.jsonb_build_object(
      'input_fingerprint', 'sha256:aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa',
      'result_fingerprint', 'sha256:bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb'
    )
  );
$gap019_test_reconciliation$;

create or replace function pg_temp.gap019_authorization(
  p_decision_id text,
  p_outcome text default 'ALLOW',
  p_mode text default 'AGGREGATE',
  p_operation text default 'READ'
)
returns jsonb
language sql
immutable
as $gap019_test_authorization$
  select pg_catalog.jsonb_build_object(
    'contract_family', 'vento.authorization.response-contracts',
    'contract_name', 'AuthorizationDecision',
    'contract_version', '1.0.0',
    'decision_id', p_decision_id,
    'final_decision', p_outcome,
    'request', pg_catalog.jsonb_build_object(
      'operation_kind', p_operation
    ),
    'resource', pg_catalog.jsonb_build_object(
      'request_mode', p_mode
    )
  );
$gap019_test_authorization$;

create or replace function pg_temp.gap019_rule(
  p_minimum integer default 5,
  p_complementary boolean default false,
  p_successive boolean default false,
  p_allow_export boolean default false,
  p_allow_drill_down boolean default true
)
returns jsonb
language sql
immutable
as $gap019_test_rule$
  select pg_catalog.jsonb_build_object(
    'contract_version', '1.0.0',
    'rule_id', 'DISC-SALES-FULFILLMENT-001',
    'rule_version', '2.1.0',
    'status', 'ACTIVE',
    'purpose', 'OPERATIONS_REVIEW',
    'metric_family', 'sales',
    'metric_id', 'sales.fulfillment_rate',
    'classification_version', 'CLASS-3.0.0',
    'policy_version', 'PRIVACY-4.2.0',
    'allowed_dimensions', '["site_id","week"]'::jsonb,
    'minimum_population', p_minimum,
    'primary_suppression_enabled', true,
    'complementary_suppression_required', p_complementary,
    'successive_query_protection_required', p_successive,
    'allow_comparison', false,
    'allow_export', p_allow_export,
    'allow_drill_down', p_allow_drill_down
  );
$gap019_test_rule$;

create or replace function pg_temp.gap019_context(
  p_comparison boolean default false,
  p_export boolean default false,
  p_drill_down boolean default false
)
returns jsonb
language sql
immutable
as $gap019_test_context$
  select pg_catalog.jsonb_build_object(
    'purpose', 'OPERATIONS_REVIEW',
    'comparison_requested', p_comparison,
    'export_requested', p_export,
    'drill_down_requested', p_drill_down
  );
$gap019_test_context$;

create or replace function pg_temp.gap019_disclosure(
  p_population integer default 12,
  p_authorization jsonb default pg_temp.gap019_authorization(
    '01900000-0000-0000-0000-000000000001'
  ),
  p_rule jsonb default pg_temp.gap019_rule(),
  p_context jsonb default pg_temp.gap019_context(),
  p_detail_authorization jsonb default 'null'::jsonb
)
returns jsonb
language sql
immutable
as $gap019_test_disclosure$
  select app_private.apply_small_population_disclosure(
    pg_catalog.jsonb_build_object(
      'contract_version', '1.0.0',
      'authorization', p_authorization,
      'detail_authorization', p_detail_authorization,
      'aggregate', pg_catalog.jsonb_build_object(
        'metric_id', 'sales.fulfillment_rate',
        'metric_family', 'sales',
        'classification', 'S2',
        'value', 86.4,
        'population_count', p_population,
        'dimensions', '["site_id","week"]'::jsonb
      ),
      'disclosure_rule', p_rule,
      'request_context', p_context
    )
  );
$gap019_test_disclosure$;

select ok(
  pg_catalog.to_regprocedure('app_private.reconcile_analytic_aggregate(jsonb)') is not null,
  '1 reconciliation exact signature exists'
);

select ok(
  pg_catalog.to_regprocedure('app_private.apply_small_population_disclosure(jsonb)') is not null,
  '2 disclosure exact signature exists'
);

select ok(
  pg_catalog.to_regprocedure('api.get_governed_analytic_aggregate(jsonb)') is not null,
  '3 safe API exact signature exists'
);

select is(
  pg_catalog.pg_get_userbyid(p.proowner),
  'vento_authorization_owner',
  '4 reconciliation owner is governed'
)
from pg_catalog.pg_proc p
where p.oid = 'app_private.reconcile_analytic_aggregate(jsonb)'::regprocedure;

select is(
  pg_catalog.pg_get_userbyid(p.proowner),
  'vento_authorization_owner',
  '5 disclosure owner is governed'
)
from pg_catalog.pg_proc p
where p.oid = 'app_private.apply_small_population_disclosure(jsonb)'::regprocedure;

select is(
  pg_catalog.pg_get_userbyid(p.proowner),
  'vento_authorization_owner',
  '6 API owner is governed'
)
from pg_catalog.pg_proc p
where p.oid = 'api.get_governed_analytic_aggregate(jsonb)'::regprocedure;

select ok(
  not (select p.prosecdef from pg_catalog.pg_proc p where p.oid = 'app_private.reconcile_analytic_aggregate(jsonb)'::regprocedure),
  '7 reconciliation is SECURITY INVOKER'
);

select ok(
  not (select p.prosecdef from pg_catalog.pg_proc p where p.oid = 'app_private.apply_small_population_disclosure(jsonb)'::regprocedure),
  '8 disclosure is SECURITY INVOKER'
);

select ok(
  (select p.prosecdef from pg_catalog.pg_proc p where p.oid = 'api.get_governed_analytic_aggregate(jsonb)'::regprocedure),
  '9 API is the single SECURITY DEFINER boundary'
);

select is(
  (
    select pg_catalog.count(*)
    from pg_catalog.pg_proc p
    where p.oid in (
      'app_private.reconcile_analytic_aggregate(jsonb)'::regprocedure,
      'app_private.apply_small_population_disclosure(jsonb)'::regprocedure,
      'api.get_governed_analytic_aggregate(jsonb)'::regprocedure
    )
      and p.proconfig @> array['search_path=']
  ),
  3::bigint,
  '10 all three functions use an empty search_path'
);

select ok(
  not pg_catalog.has_function_privilege('public', 'api.get_governed_analytic_aggregate(jsonb)', 'EXECUTE'),
  '11 PUBLIC cannot execute the API'
);

select ok(
  not pg_catalog.has_function_privilege('anon', 'api.get_governed_analytic_aggregate(jsonb)', 'EXECUTE'),
  '12 anon cannot execute the API'
);

select ok(
  not pg_catalog.has_function_privilege('service_role', 'api.get_governed_analytic_aggregate(jsonb)', 'EXECUTE'),
  '13 service_role has no implicit API bypass'
);

select ok(
  pg_catalog.has_function_privilege('authenticated', 'api.get_governed_analytic_aggregate(jsonb)', 'EXECUTE'),
  '14 authenticated receives the exact safe API grant'
);

select is(
  (
    select pg_catalog.count(*)
    from (
      values ('anon'), ('authenticated'), ('service_role')
    ) runtime_role(name)
    cross join (
      values
        ('app_private.reconcile_analytic_aggregate(jsonb)'::regprocedure),
        ('app_private.apply_small_population_disclosure(jsonb)'::regprocedure)
    ) private_function(oid)
    where pg_catalog.has_function_privilege(runtime_role.name, private_function.oid, 'EXECUTE')
  ),
  0::bigint,
  '15 runtime roles have zero direct execution across private helpers'
);

select is(
  app_private.reconcile_analytic_aggregate(pg_temp.gap019_reconciliation()) ->> 'status',
  'RECONCILED',
  '16 exact source equation reconciles'
);

select is(
  app_private.reconcile_analytic_aggregate(pg_temp.gap019_reconciliation()) #>> '{counters,accounted}',
  '100',
  '17 accounted counter is reproducible'
);

select is(
  app_private.reconcile_analytic_aggregate(pg_temp.gap019_reconciliation()) ->> 'source_difference',
  '0',
  '18 exact source difference is zero'
);

select is(
  app_private.reconcile_analytic_aggregate(pg_temp.gap019_reconciliation()) ->> 'materialization_difference',
  '0',
  '19 exact materialization difference is zero'
);

select is(
  app_private.reconcile_analytic_aggregate(pg_temp.gap019_reconciliation(p_excluded => 1)) ->> 'status',
  'DIFFERENCE',
  '20 unaccounted source fact is a difference'
);

select is(
  app_private.reconcile_analytic_aggregate(pg_temp.gap019_reconciliation(p_materialized => 85)) ->> 'status',
  'DIFFERENCE',
  '21 accepted fact not materialized is a difference'
);

select is(
  app_private.reconcile_analytic_aggregate(
    pg_temp.gap019_reconciliation(0, 0, 0, 0, 0, 0, 0)
  ) ->> 'status',
  'RECONCILED',
  '22 explicit zero is distinct from missing and reconciles'
);

select throws_ok(
  $$
    select app_private.reconcile_analytic_aggregate(
      pg_temp.gap019_reconciliation(p_accepted => -1)
    )
  $$,
  '22023',
  'GAP_PKG_019_RECONCILIATION_COUNTER_INVALID',
  '23 invalid counter fails closed'
);

select is(
  pg_temp.gap019_disclosure() ->> 'mode',
  'AGREGADO',
  '24 governed sensitive aggregate is publishable'
);

select is(
  pg_temp.gap019_disclosure() -> 'value',
  '86.4'::jsonb,
  '25 publishable aggregate retains only its governed value'
);

select is(
  pg_temp.gap019_disclosure(p_population => 4) ->> 'mode',
  'SUPRIMIDO',
  '26 small population is suppressed'
);

select is(
  pg_temp.gap019_disclosure(p_population => 4) -> 'value',
  'null'::jsonb,
  '27 suppressed population does not leak its value'
);

select is(
  pg_temp.gap019_disclosure(p_rule => 'null'::jsonb) ->> 'reason_code',
  'DISCLOSURE_RULE_UNRESOLVED',
  '28 missing disclosure rule suppresses fail closed'
);

select is(
  pg_temp.gap019_disclosure(
    p_authorization => pg_temp.gap019_authorization(
      '01900000-0000-0000-0000-000000000003',
      'DENY'
    )
  ) ->> 'mode',
  'DENEGADO',
  '29 AUTH-DB-034 denial outranks disclosure'
);

select is(
  pg_temp.gap019_disclosure(
    p_authorization => pg_temp.gap019_authorization(
      '01900000-0000-0000-0000-000000000004',
      'ALLOW',
      'COLLECTION'
    )
  ) ->> 'reason_code',
  'AGGREGATE_AUTHORIZATION_REQUIRED',
  '30 detail authorization cannot substitute aggregate authorization'
);

select is(
  pg_temp.gap019_disclosure(
    p_context => pg_temp.gap019_context(p_comparison => true)
  ) ->> 'reason_code',
  'COMPARISON_REQUIRES_INDEPENDENT_EVALUATION',
  '31 comparison requires independent disclosure evaluation'
);

select is(
  pg_temp.gap019_disclosure(
    p_rule => pg_temp.gap019_rule(p_complementary => true)
  ) ->> 'reason_code',
  'COMPLEMENTARY_SUPPRESSION_REQUIRED',
  '32 complementary reconstruction risk suppresses'
);

select is(
  pg_temp.gap019_disclosure(
    p_rule => pg_temp.gap019_rule(p_successive => true)
  ) ->> 'reason_code',
  'SUCCESSIVE_QUERY_GUARD_REQUIRED',
  '33 uncertified successive-query protection suppresses'
);

select is(
  pg_temp.gap019_disclosure(
    p_context => pg_temp.gap019_context(p_drill_down => true)
  ) ->> 'drill_down_allowed',
  'false',
  '34 aggregate authorization alone does not grant drill-down'
);

select is(
  pg_temp.gap019_disclosure(
    p_context => pg_temp.gap019_context(p_drill_down => true)
  ) ->> 'drill_down_reason_code',
  'DISTINCT_DETAIL_AUTHORIZATION_REQUIRED',
  '35 missing detail authorization has an explicit reason'
);

select is(
  pg_temp.gap019_disclosure(
    p_context => pg_temp.gap019_context(p_drill_down => true),
    p_detail_authorization => pg_temp.gap019_authorization(
      '01900000-0000-0000-0000-000000000004',
      'ALLOW',
      'COLLECTION'
    )
  ) ->> 'drill_down_allowed',
  'true',
  '36 distinct non-aggregate detail decision grants drill-down'
);

select is(
  pg_temp.gap019_disclosure(p_population => 4) -> 'dimensions',
  '[]'::jsonb,
  '37 suppressed cell does not leak quasi-identifier dimensions'
);

select throws_ok(
  $$
    select api.get_governed_analytic_aggregate('{}'::jsonb)
  $$,
  '28000',
  'GAP_PKG_019_AUTHENTICATED_PRINCIPAL_REQUIRED',
  '38 API rejects a missing authenticated JWT principal before evaluation'
);

select * from finish();
rollback;
