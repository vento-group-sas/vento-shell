-- GAP-PKG-019 governed analytics DB/RPC boundary.
-- DATA-DOM-006 / DATA-AUTH-002 / DATA-INT-001.
-- This migration adds deterministic reconciliation and disclosure functions.
-- It does not materialize source facts, mutate remote data, or weaken AUTH-DB-034.

begin;

do $gap_pkg_019_preconditions$
begin
  if not exists (
    select 1
    from pg_catalog.pg_roles
    where rolname = 'vento_authorization_owner'
      and not rolcanlogin
      and not rolinherit
      and not rolsuper
      and not rolcreatedb
      and not rolcreaterole
      and not rolreplication
      and not rolbypassrls
  ) then
    raise exception 'GAP_PKG_019_AUTHORIZATION_OWNER_MISSING_OR_INVALID';
  end if;

  if pg_catalog.to_regnamespace('app_private') is null
     or pg_catalog.to_regnamespace('api') is null
     or pg_catalog.to_regprocedure(
       'app_private.evaluate_authorization(jsonb)'
     ) is null
     or pg_catalog.to_regprocedure(
       'app_private.project_safe_authorization_decision(jsonb)'
     ) is null then
    raise exception 'GAP_PKG_019_AUTHORIZATION_FOUNDATION_MISSING';
  end if;
end
$gap_pkg_019_preconditions$;

-- Temporary DDL capability is scoped to this transaction and revoked below.
grant usage, create
on schema app_private, api
to vento_authorization_owner;

set local role vento_authorization_owner;

create or replace function
  app_private.reconcile_analytic_aggregate(
    p_input jsonb
  )
returns jsonb
language plpgsql
immutable
strict
security invoker
set search_path = ''
as $gap_pkg_019_reconcile$
declare
  v_source jsonb;
  v_processing jsonb;
  v_lineage jsonb;
  v_source_count numeric;
  v_accepted_count numeric;
  v_rejected_count numeric;
  v_quarantine_count numeric;
  v_duplicate_count numeric;
  v_excluded_count numeric;
  v_materialized_count numeric;
  v_accounted_count numeric;
  v_source_difference numeric;
  v_materialization_difference numeric;
  v_reconciled boolean;
begin
  if pg_catalog.jsonb_typeof(p_input) <> 'object'
     or p_input ->> 'contract_version' <> '1.0.0'
     or pg_catalog.jsonb_typeof(p_input -> 'source') <> 'object'
     or pg_catalog.jsonb_typeof(p_input -> 'processing') <> 'object'
     or pg_catalog.jsonb_typeof(p_input -> 'lineage') <> 'object' then
    raise exception using
      errcode = '22023',
      message = 'GAP_PKG_019_RECONCILIATION_INPUT_INVALID';
  end if;

  v_source := p_input -> 'source';
  v_processing := p_input -> 'processing';
  v_lineage := p_input -> 'lineage';

  if nullif(v_source ->> 'source_id', '') is null
     or nullif(v_source ->> 'source_version', '') is null
     or nullif(v_source ->> 'schema_version', '') is null
     or nullif(v_source ->> 'period_start', '') is null
     or nullif(v_source ->> 'period_end', '') is null
     or nullif(v_source ->> 'cutoff_at', '') is null
     or nullif(v_processing ->> 'transformation_id', '') is null
     or nullif(v_processing ->> 'transformation_version', '') is null
     or nullif(v_lineage ->> 'input_fingerprint', '') is null
     or nullif(v_lineage ->> 'result_fingerprint', '') is null then
    raise exception using
      errcode = '22023',
      message = 'GAP_PKG_019_RECONCILIATION_IDENTITY_INVALID';
  end if;

  if not (
    pg_catalog.jsonb_typeof(v_source -> 'source_count') = 'number'
    and (v_source ->> 'source_count') ~ '^(0|[1-9][0-9]*)$'
    and pg_catalog.jsonb_typeof(v_processing -> 'accepted_count') = 'number'
    and (v_processing ->> 'accepted_count') ~ '^(0|[1-9][0-9]*)$'
    and pg_catalog.jsonb_typeof(v_processing -> 'rejected_count') = 'number'
    and (v_processing ->> 'rejected_count') ~ '^(0|[1-9][0-9]*)$'
    and pg_catalog.jsonb_typeof(v_processing -> 'quarantine_count') = 'number'
    and (v_processing ->> 'quarantine_count') ~ '^(0|[1-9][0-9]*)$'
    and pg_catalog.jsonb_typeof(v_processing -> 'duplicate_count') = 'number'
    and (v_processing ->> 'duplicate_count') ~ '^(0|[1-9][0-9]*)$'
    and pg_catalog.jsonb_typeof(v_processing -> 'excluded_count') = 'number'
    and (v_processing ->> 'excluded_count') ~ '^(0|[1-9][0-9]*)$'
    and pg_catalog.jsonb_typeof(v_processing -> 'materialized_count') = 'number'
    and (v_processing ->> 'materialized_count') ~ '^(0|[1-9][0-9]*)$'
  ) then
    raise exception using
      errcode = '22023',
      message = 'GAP_PKG_019_RECONCILIATION_COUNTER_INVALID';
  end if;

  v_source_count := (v_source ->> 'source_count')::numeric;
  v_accepted_count := (v_processing ->> 'accepted_count')::numeric;
  v_rejected_count := (v_processing ->> 'rejected_count')::numeric;
  v_quarantine_count := (v_processing ->> 'quarantine_count')::numeric;
  v_duplicate_count := (v_processing ->> 'duplicate_count')::numeric;
  v_excluded_count := (v_processing ->> 'excluded_count')::numeric;
  v_materialized_count := (v_processing ->> 'materialized_count')::numeric;

  v_accounted_count :=
    v_accepted_count
    + v_rejected_count
    + v_quarantine_count
    + v_duplicate_count
    + v_excluded_count;
  v_source_difference := v_source_count - v_accounted_count;
  v_materialization_difference :=
    v_accepted_count - v_materialized_count;
  v_reconciled :=
    v_source_difference = 0
    and v_materialization_difference = 0;

  return pg_catalog.jsonb_build_object(
    'contract_family', 'vento.analytics.governed-aggregate',
    'contract_name', 'AggregateReconciliation',
    'contract_version', '1.0.0',
    'status', case when v_reconciled then 'RECONCILED' else 'DIFFERENCE' end,
    'reconciled', v_reconciled,
    'source_reference', pg_catalog.jsonb_build_object(
      'source_id', v_source ->> 'source_id',
      'source_version', v_source ->> 'source_version',
      'schema_version', v_source ->> 'schema_version',
      'period_start', v_source ->> 'period_start',
      'period_end', v_source ->> 'period_end',
      'cutoff_at', v_source ->> 'cutoff_at'
    ),
    'transformation_reference', pg_catalog.jsonb_build_object(
      'transformation_id', v_processing ->> 'transformation_id',
      'transformation_version', v_processing ->> 'transformation_version'
    ),
    'counters', pg_catalog.jsonb_build_object(
      'source', v_source_count,
      'accepted', v_accepted_count,
      'rejected', v_rejected_count,
      'quarantine', v_quarantine_count,
      'duplicates', v_duplicate_count,
      'excluded', v_excluded_count,
      'materialized', v_materialized_count,
      'accounted', v_accounted_count
    ),
    'source_difference', v_source_difference,
    'materialization_difference', v_materialization_difference,
    'lineage', pg_catalog.jsonb_build_object(
      'input_fingerprint', v_lineage ->> 'input_fingerprint',
      'result_fingerprint', v_lineage ->> 'result_fingerprint'
    )
  );
end
$gap_pkg_019_reconcile$;

create or replace function
  app_private.apply_small_population_disclosure(
    p_input jsonb
  )
returns jsonb
language plpgsql
immutable
strict
security invoker
set search_path = ''
as $gap_pkg_019_disclosure$
declare
  v_authorization jsonb;
  v_detail_authorization jsonb;
  v_aggregate jsonb;
  v_rule jsonb;
  v_context jsonb;
  v_dimensions jsonb := '[]'::jsonb;
  v_population_count numeric;
  v_minimum_population numeric;
  v_sensitive boolean;
  v_rule_valid boolean := false;
  v_comparison_requested boolean := false;
  v_export_requested boolean := false;
  v_drill_down_requested boolean := false;
  v_mode text := 'AGREGADO';
  v_reason_code text;
  v_drill_down_allowed boolean := false;
  v_drill_down_reason_code text;
  v_value jsonb := 'null'::jsonb;
begin
  if pg_catalog.jsonb_typeof(p_input) <> 'object'
     or p_input ->> 'contract_version' <> '1.0.0'
     or pg_catalog.jsonb_typeof(p_input -> 'authorization') <> 'object'
     or pg_catalog.jsonb_typeof(p_input -> 'aggregate') <> 'object'
     or pg_catalog.jsonb_typeof(p_input -> 'request_context') <> 'object' then
    raise exception using
      errcode = '22023',
      message = 'GAP_PKG_019_DISCLOSURE_INPUT_INVALID';
  end if;

  v_authorization := p_input -> 'authorization';
  v_detail_authorization := p_input -> 'detail_authorization';
  v_aggregate := p_input -> 'aggregate';
  v_rule := p_input -> 'disclosure_rule';
  v_context := p_input -> 'request_context';

  if v_authorization ->> 'contract_family'
       <> 'vento.authorization.response-contracts'
     or v_authorization ->> 'contract_name' <> 'AuthorizationDecision'
     or v_authorization ->> 'contract_version' <> '1.0.0'
     or v_authorization ->> 'final_decision' not in ('ALLOW', 'DENY')
     or nullif(v_authorization ->> 'decision_id', '') is null then
    raise exception using
      errcode = '22023',
      message = 'GAP_PKG_019_AUTHORIZATION_DECISION_INVALID';
  end if;

  if nullif(v_aggregate ->> 'metric_id', '') is null
     or nullif(v_aggregate ->> 'metric_family', '') is null
     or v_aggregate ->> 'classification' not in ('S0', 'S1', 'S2', 'S3', 'S4')
     or pg_catalog.jsonb_typeof(v_aggregate -> 'value') <> 'number'
     or pg_catalog.jsonb_typeof(v_aggregate -> 'population_count') <> 'number'
     or not ((v_aggregate ->> 'population_count') ~ '^(0|[1-9][0-9]*)$')
     or pg_catalog.jsonb_typeof(v_aggregate -> 'dimensions') <> 'array' then
    raise exception using
      errcode = '22023',
      message = 'GAP_PKG_019_AGGREGATE_INPUT_INVALID';
  end if;

  if exists (
    select 1
    from pg_catalog.jsonb_array_elements(v_aggregate -> 'dimensions') item(value)
    where pg_catalog.jsonb_typeof(value) <> 'string'
       or nullif(value #>> '{}', '') is null
  ) then
    raise exception using
      errcode = '22023',
      message = 'GAP_PKG_019_AGGREGATE_DIMENSIONS_INVALID';
  end if;

  select coalesce(
    pg_catalog.jsonb_agg(pg_catalog.to_jsonb(dimension) order by dimension),
    '[]'::jsonb
  )
  into v_dimensions
  from (
    select distinct value as dimension
    from pg_catalog.jsonb_array_elements_text(v_aggregate -> 'dimensions') entry(value)
  ) normalized;

  if nullif(v_context ->> 'purpose', '') is null
     or pg_catalog.jsonb_typeof(v_context -> 'comparison_requested') <> 'boolean'
     or pg_catalog.jsonb_typeof(v_context -> 'export_requested') <> 'boolean'
     or pg_catalog.jsonb_typeof(v_context -> 'drill_down_requested') <> 'boolean' then
    raise exception using
      errcode = '22023',
      message = 'GAP_PKG_019_REQUEST_CONTEXT_INVALID';
  end if;

  v_population_count := (v_aggregate ->> 'population_count')::numeric;
  v_sensitive := v_aggregate ->> 'classification' in ('S2', 'S3', 'S4');
  v_comparison_requested := (v_context ->> 'comparison_requested')::boolean;
  v_export_requested := (v_context ->> 'export_requested')::boolean;
  v_drill_down_requested := (v_context ->> 'drill_down_requested')::boolean;

  if pg_catalog.jsonb_typeof(v_rule) = 'object'
     and v_rule ->> 'contract_version' = '1.0.0'
     and nullif(v_rule ->> 'rule_id', '') is not null
     and nullif(v_rule ->> 'rule_version', '') is not null
     and v_rule ->> 'status' = 'ACTIVE'
     and v_rule ->> 'purpose' = v_context ->> 'purpose'
     and v_rule ->> 'metric_family' = v_aggregate ->> 'metric_family'
     and v_rule ->> 'metric_id' = v_aggregate ->> 'metric_id'
     and nullif(v_rule ->> 'classification_version', '') is not null
     and nullif(v_rule ->> 'policy_version', '') is not null
     and pg_catalog.jsonb_typeof(v_rule -> 'allowed_dimensions') = 'array'
     and pg_catalog.jsonb_typeof(v_rule -> 'minimum_population') = 'number'
     and (v_rule ->> 'minimum_population') ~ '^[1-9][0-9]*$'
     and pg_catalog.jsonb_typeof(v_rule -> 'primary_suppression_enabled') = 'boolean'
     and pg_catalog.jsonb_typeof(v_rule -> 'complementary_suppression_required') = 'boolean'
     and pg_catalog.jsonb_typeof(v_rule -> 'successive_query_protection_required') = 'boolean'
     and pg_catalog.jsonb_typeof(v_rule -> 'allow_comparison') = 'boolean'
     and pg_catalog.jsonb_typeof(v_rule -> 'allow_export') = 'boolean'
     and pg_catalog.jsonb_typeof(v_rule -> 'allow_drill_down') = 'boolean' then
    v_rule_valid := true;

    if exists (
      select 1
      from pg_catalog.jsonb_array_elements(v_rule -> 'allowed_dimensions') item(value)
      where pg_catalog.jsonb_typeof(value) <> 'string'
         or nullif(value #>> '{}', '') is null
    ) then
      v_rule_valid := false;
    end if;
  end if;

  if v_authorization ->> 'final_decision' <> 'ALLOW' then
    v_mode := 'DENEGADO';
    v_reason_code := 'AUTHORIZATION_DENIED';
  elsif v_authorization #>> '{resource,request_mode}' <> 'AGGREGATE' then
    v_mode := 'DENEGADO';
    v_reason_code := 'AGGREGATE_AUTHORIZATION_REQUIRED';
  elsif v_export_requested
        and v_authorization #>> '{request,operation_kind}' <> 'EXPORT' then
    v_mode := 'DENEGADO';
    v_reason_code := 'EXPORT_AUTHORIZATION_REQUIRED';
  elsif v_sensitive and not v_rule_valid then
    v_mode := 'SUPRIMIDO';
    v_reason_code := 'DISCLOSURE_RULE_UNRESOLVED';
  elsif v_sensitive
        and not (v_rule ->> 'primary_suppression_enabled')::boolean then
    v_mode := 'SUPRIMIDO';
    v_reason_code := 'PRIMARY_SUPPRESSION_REQUIRED';
  elsif v_sensitive and exists (
    select 1
    from pg_catalog.jsonb_array_elements_text(v_dimensions) requested(value)
    where not exists (
      select 1
      from pg_catalog.jsonb_array_elements_text(v_rule -> 'allowed_dimensions') allowed(value)
      where allowed.value = requested.value
    )
  ) then
    v_mode := 'SUPRIMIDO';
    v_reason_code := 'DIMENSION_NOT_DISCLOSABLE';
  elsif v_sensitive then
    v_minimum_population := (v_rule ->> 'minimum_population')::numeric;

    if v_population_count < v_minimum_population then
      v_mode := 'SUPRIMIDO';
      v_reason_code := 'SMALL_POPULATION';
    elsif (v_rule ->> 'complementary_suppression_required')::boolean then
      v_mode := 'SUPRIMIDO';
      v_reason_code := 'COMPLEMENTARY_SUPPRESSION_REQUIRED';
    elsif (v_rule ->> 'successive_query_protection_required')::boolean then
      v_mode := 'SUPRIMIDO';
      v_reason_code := 'SUCCESSIVE_QUERY_GUARD_REQUIRED';
    elsif v_comparison_requested then
      v_mode := 'SUPRIMIDO';
      v_reason_code := 'COMPARISON_REQUIRES_INDEPENDENT_EVALUATION';
    elsif v_export_requested and not (v_rule ->> 'allow_export')::boolean then
      v_mode := 'SUPRIMIDO';
      v_reason_code := 'EXPORT_NOT_DISCLOSABLE';
    end if;
  end if;

  if v_mode = 'AGREGADO' then
    v_value := v_aggregate -> 'value';
  end if;

  if v_drill_down_requested then
    if v_mode <> 'AGREGADO' then
      v_drill_down_reason_code := 'SUPPRESSED_CELL_NO_DRILL_DOWN';
    elsif not v_rule_valid
          or not (v_rule ->> 'allow_drill_down')::boolean then
      v_drill_down_reason_code := 'DRILL_DOWN_NOT_DISCLOSABLE';
    elsif pg_catalog.jsonb_typeof(v_detail_authorization) <> 'object'
          or v_detail_authorization ->> 'contract_family'
             <> 'vento.authorization.response-contracts'
          or v_detail_authorization ->> 'contract_name'
             <> 'AuthorizationDecision'
          or v_detail_authorization ->> 'contract_version' <> '1.0.0'
          or v_detail_authorization ->> 'final_decision' <> 'ALLOW'
          or v_detail_authorization #>> '{resource,request_mode}' = 'AGGREGATE'
          or nullif(v_detail_authorization ->> 'decision_id', '') is null
          or v_detail_authorization ->> 'decision_id'
             = v_authorization ->> 'decision_id' then
      v_drill_down_reason_code := 'DISTINCT_DETAIL_AUTHORIZATION_REQUIRED';
    else
      v_drill_down_allowed := true;
    end if;
  end if;

  return pg_catalog.jsonb_build_object(
    'contract_family', 'vento.analytics.disclosure',
    'contract_name', 'SmallPopulationDisclosureDecision',
    'contract_version', '1.0.0',
    'mode', v_mode,
    'reason_code', v_reason_code,
    'metric_id', v_aggregate ->> 'metric_id',
    'classification', v_aggregate ->> 'classification',
    'value', v_value,
    'dimensions', case when v_mode = 'AGREGADO' then v_dimensions else '[]'::jsonb end,
    'policy_reference', case
      when v_rule_valid then pg_catalog.jsonb_build_object(
        'rule_id', v_rule ->> 'rule_id',
        'rule_version', v_rule ->> 'rule_version',
        'classification_version', v_rule ->> 'classification_version',
        'policy_version', v_rule ->> 'policy_version'
      )
      else 'null'::jsonb
    end,
    'authorization_reference', pg_catalog.jsonb_build_object(
      'decision_id', v_authorization ->> 'decision_id'
    ),
    'drill_down_allowed', v_drill_down_allowed,
    'drill_down_reason_code', v_drill_down_reason_code
  );
end
$gap_pkg_019_disclosure$;

create or replace function
  api.get_governed_analytic_aggregate(
    p_input jsonb
  )
returns jsonb
language plpgsql
volatile
strict
security definer
set search_path = ''
as $gap_pkg_019_api$
declare
  v_authorization jsonb;
  v_detail_authorization jsonb := 'null'::jsonb;
  v_reconciliation jsonb;
  v_disclosure jsonb;
  v_safe_authorization jsonb;
begin
  if nullif(
       pg_catalog.current_setting('request.jwt.claim.sub', true),
       ''
     ) is null then
    raise exception using
      errcode = '28000',
      message = 'GAP_PKG_019_AUTHENTICATED_PRINCIPAL_REQUIRED';
  end if;

  if pg_catalog.jsonb_typeof(p_input) <> 'object'
     or p_input ->> 'contract_version' <> '1.0.0'
     or pg_catalog.jsonb_typeof(p_input -> 'authorization_request') <> 'object'
     or pg_catalog.jsonb_typeof(p_input -> 'reconciliation') <> 'object'
     or pg_catalog.jsonb_typeof(p_input -> 'aggregate') <> 'object'
     or pg_catalog.jsonb_typeof(p_input -> 'request_context') <> 'object' then
    raise exception using
      errcode = '22023',
      message = 'GAP_PKG_019_API_INPUT_INVALID';
  end if;

  v_authorization := app_private.evaluate_authorization(
    p_input -> 'authorization_request'
  );
  v_safe_authorization := app_private.project_safe_authorization_decision(
    v_authorization
  );
  v_reconciliation := app_private.reconcile_analytic_aggregate(
    p_input -> 'reconciliation'
  );

  if coalesce(
       (p_input #>> '{request_context,drill_down_requested}')::boolean,
       false
     )
     and pg_catalog.jsonb_typeof(p_input -> 'detail_authorization_request') = 'object' then
    v_detail_authorization := app_private.evaluate_authorization(
      p_input -> 'detail_authorization_request'
    );
  end if;

  if v_reconciliation ->> 'status' <> 'RECONCILED' then
    v_disclosure := pg_catalog.jsonb_build_object(
      'contract_family', 'vento.analytics.disclosure',
      'contract_name', 'SmallPopulationDisclosureDecision',
      'contract_version', '1.0.0',
      'mode', 'DENEGADO',
      'reason_code', 'AGGREGATE_RECONCILIATION_FAILED',
      'metric_id', p_input #>> '{aggregate,metric_id}',
      'classification', p_input #>> '{aggregate,classification}',
      'value', 'null'::jsonb,
      'dimensions', '[]'::jsonb,
      'policy_reference', 'null'::jsonb,
      'authorization_reference', pg_catalog.jsonb_build_object(
        'decision_id', v_authorization ->> 'decision_id'
      ),
      'drill_down_allowed', false,
      'drill_down_reason_code', 'UNRECONCILED_AGGREGATE_NO_DRILL_DOWN'
    );
  else
    v_disclosure := app_private.apply_small_population_disclosure(
      pg_catalog.jsonb_build_object(
        'contract_version', '1.0.0',
        'authorization', v_authorization,
        'detail_authorization', v_detail_authorization,
        'aggregate', p_input -> 'aggregate',
        'disclosure_rule', p_input -> 'disclosure_rule',
        'request_context', p_input -> 'request_context'
      )
    );
  end if;

  return pg_catalog.jsonb_build_object(
    'contract_family', 'vento.analytics.governed-aggregate',
    'contract_name', 'GovernedAnalyticAggregate',
    'contract_version', '1.0.0',
    'outcome', v_disclosure ->> 'mode',
    'reason_code', v_disclosure ->> 'reason_code',
    'metric_id', v_disclosure ->> 'metric_id',
    'classification', v_disclosure ->> 'classification',
    'value', v_disclosure -> 'value',
    'dimensions', v_disclosure -> 'dimensions',
    'reconciliation_status', v_reconciliation ->> 'status',
    'authorization', v_safe_authorization,
    'policy_reference', v_disclosure -> 'policy_reference',
    'drill_down_allowed', v_disclosure -> 'drill_down_allowed',
    'drill_down_reason_code', v_disclosure -> 'drill_down_reason_code'
  );
end
$gap_pkg_019_api$;

comment on function app_private.reconcile_analytic_aggregate(jsonb) is
  'GAP-PKG-019 deterministic source-to-aggregate reconciliation; exact counters remain private.';
comment on function app_private.apply_small_population_disclosure(jsonb) is
  'GAP-PKG-019 fail-closed, versioned small-population disclosure decision.';
comment on function api.get_governed_analytic_aggregate(jsonb) is
  'GAP-PKG-019 authenticated governed aggregate API; AUTH-DB-034 authorization is evaluated server-side.';

revoke all
on function
  app_private.reconcile_analytic_aggregate(jsonb),
  app_private.apply_small_population_disclosure(jsonb)
from public, anon, authenticated, service_role;

revoke all
on function api.get_governed_analytic_aggregate(jsonb)
from public, anon, authenticated, service_role;

grant execute
on function
  app_private.reconcile_analytic_aggregate(jsonb),
  app_private.apply_small_population_disclosure(jsonb)
to postgres;

grant execute
on function api.get_governed_analytic_aggregate(jsonb)
to authenticated;

reset role;

-- Restore the authorization owner to default-deny schema creation.
revoke create
on schema app_private, api
from vento_authorization_owner;

do $gap_pkg_019_installation_guard$
begin
  if pg_catalog.to_regprocedure(
       'app_private.reconcile_analytic_aggregate(jsonb)'
     ) is null
     or pg_catalog.to_regprocedure(
       'app_private.apply_small_population_disclosure(jsonb)'
     ) is null
     or pg_catalog.to_regprocedure(
       'api.get_governed_analytic_aggregate(jsonb)'
     ) is null then
    raise exception 'GAP_PKG_019_FUNCTION_INSTALLATION_INCOMPLETE';
  end if;

  if not pg_catalog.has_function_privilege(
       'authenticated',
       'api.get_governed_analytic_aggregate(jsonb)',
       'EXECUTE'
     )
     or pg_catalog.has_function_privilege(
       'public',
       'api.get_governed_analytic_aggregate(jsonb)',
       'EXECUTE'
     )
     or pg_catalog.has_function_privilege(
       'anon',
       'api.get_governed_analytic_aggregate(jsonb)',
       'EXECUTE'
     )
     or pg_catalog.has_function_privilege(
       'service_role',
       'api.get_governed_analytic_aggregate(jsonb)',
       'EXECUTE'
     )
     or pg_catalog.has_function_privilege(
       'authenticated',
       'app_private.reconcile_analytic_aggregate(jsonb)',
       'EXECUTE'
     )
     or pg_catalog.has_function_privilege(
       'authenticated',
       'app_private.apply_small_population_disclosure(jsonb)',
       'EXECUTE'
     )
     or pg_catalog.has_schema_privilege(
       'vento_authorization_owner',
       'app_private',
       'CREATE'
     )
     or pg_catalog.has_schema_privilege(
       'vento_authorization_owner',
       'api',
       'CREATE'
     ) then
    raise exception 'GAP_PKG_019_FUNCTION_PRIVILEGE_INVALID';
  end if;
end
$gap_pkg_019_installation_guard$;

commit;
