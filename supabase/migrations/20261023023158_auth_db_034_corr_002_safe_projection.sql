-- AUTH-DB-034::CORR-002 / SHELL-AUTH-002 - additive, forward-only
-- CLI-reserved migration; private SafeDecisionProjectionV1 and audit V1 adapters.
-- This is a CODE CANDIDATE until isolated PostgreSQL/pgTAP, drift and rollout PASS.
-- Never apply to STAGING/production without a separately authorized database gate.
-- Existing evaluator, policy boolean, audit persistence, public API and RPC ACL stay
-- unchanged. Adapters do NOT implement complete AuthorizationDecisionV1 semantics.
-- Preserve older AUTH-DB-034 / CORR-001 / AUTH-DB-032 migrations verbatim.

begin;
set local lock_timeout = '2s';
set local statement_timeout = '20s';

do $auth_db_034_corr002_preconditions$
declare
  v_wrapper text;
begin
  if pg_catalog.to_regnamespace('app_private') is null
     or pg_catalog.to_regnamespace('api') is null
     or pg_catalog.to_regnamespace('audit') is null
     or pg_catalog.to_regprocedure('app_private.project_safe_authorization_decision(jsonb)') is null
     or pg_catalog.to_regprocedure('app_private.evaluate_authorization(jsonb)') is null
     or pg_catalog.to_regprocedure('app_private.evaluate_and_record_authorization(jsonb)') is null
     or pg_catalog.to_regprocedure('app_private.authorization_policy_allows(jsonb)') is null
     or pg_catalog.to_regprocedure('api.get_safe_authorization_decision(jsonb)') is null then
    raise exception using
      errcode = '55000',
      message = 'VENTO_AUTH_SAFE_V1_MISSING_PRIOR_FUNCTION_GRAPH';
  end if;

  if not exists (
    select 1 from pg_catalog.pg_roles
    where rolname = 'vento_authorization_owner'
      and not rolcanlogin and not rolinherit
      and not rolsuper and not rolcreatedb and not rolcreaterole
      and not rolreplication and not rolbypassrls
  ) then
    raise exception using
      errcode = '55000',
      message = 'VENTO_AUTH_SAFE_V1_OWNER_INVALID';
  end if;

  if pg_catalog.to_regprocedure(
       'app_private.project_safe_authorization_decision_v1(jsonb)'
     ) is not null
     or pg_catalog.to_regprocedure(
       'app_private.project_authorization_audit_v1(jsonb)'
     ) is not null then
    raise exception using
      errcode = '55000',
      message = 'VENTO_AUTH_SAFE_V1_REVIEW_EXISTING_FUNCTIONS_FIRST';
  end if;

  -- No silent normalization of a pre-existing broader schema grant.
  if pg_catalog.has_schema_privilege(
       'vento_authorization_owner', 'app_private', 'CREATE'
     ) then
    raise exception using
      errcode = '55000',
      message = 'VENTO_AUTH_SAFE_V1_OWNER_CREATE_BASELINE_DRIFT';
  end if;

  select pg_catalog.pg_get_functiondef(
    'api.get_safe_authorization_decision(jsonb)'::pg_catalog.regprocedure
  ) into v_wrapper;
  if v_wrapper not ilike '%evaluate_and_record_authorization%'
     or pg_catalog.has_function_privilege(
       'anon', 'api.get_safe_authorization_decision(jsonb)', 'EXECUTE'
     )
     or not pg_catalog.has_function_privilege(
       'authenticated', 'api.get_safe_authorization_decision(jsonb)', 'EXECUTE'
     ) then
    raise exception using
      errcode = '55000',
      message = 'VENTO_AUTH_SAFE_V1_API_AUDIT_ROUTE_OR_ACL_DRIFT';
  end if;
end
$auth_db_034_corr002_preconditions$;

-- Execute CREATE as the already restricted non-login authorization owner.
-- Revoke the temporary CREATE permission in the SAME transaction.
grant create on schema app_private to vento_authorization_owner;
set local role vento_authorization_owner;

create function app_private.project_safe_authorization_decision_v1(
  p_decision jsonb
)
returns jsonb
language plpgsql
immutable
strict
security invoker
set search_path = pg_catalog, app_private
as $auth_db_034_corr002_safe$
declare
  v_legacy jsonb;
  v_outcome text;
  v_public_reasons jsonb;
  v_message text;
  -- Frozen public subset of authorization/reason-codes/v1. Unknown codes
  -- never cross the client DTO boundary; DENY receives generic fallback.
  v_public_codes constant text[] := array[
    'AUTH_NO_SESSION',
    'AUTH_USER_INACTIVE',
    'AUTH_APP_ACCESS_DENIED',
    'AUTH_ADMIN_PERMISSION_DENIED',
    'AUTH_OPERATIONAL_PERMISSION_DENIED',
    'AUTH_SITE_ASSIGNMENT_REQUIRED',
    'AUTH_ACTIVE_SITE_REQUIRED',
    'AUTH_AREA_ASSIGNMENT_REQUIRED',
    'AUTH_ACTIVE_AREA_REQUIRED',
    'AUTH_PUBLISHED_SHIFT_REQUIRED',
    'AUTH_OUTSIDE_SHIFT_WINDOW',
    'AUTH_CHECKIN_REQUIRED',
    'AUTH_OPERATIONAL_ROLE_REQUIRED',
    'AUTH_OPERATIONAL_ROLE_INVALID_FOR_SITE',
    'AUTH_OPERATIONAL_ROLE_INVALID_FOR_AREA',
    'AUTH_SHARED_DEVICE_NOT_AUTHORIZED',
    'AUTH_ACTION_NOT_ALLOWED_IN_SIMULATION',
    'AUTH_ADMINISTRATIVE_CONFIGURATION_INCONSISTENT',
    'AUTH_PERMISSION_NOT_REGISTERED',
    'AUTH_AUTHORIZATION_EVALUATION_UNAVAILABLE'
  ];
begin
  if pg_catalog.jsonb_typeof(p_decision) is distinct from 'object'
     or pg_catalog.jsonb_typeof(p_decision -> 'final_decision') is distinct from 'string'
     or nullif(p_decision ->> 'decision_id', '') is null
     or pg_catalog.jsonb_typeof(p_decision -> 'blocked_reasons') is distinct from 'array'
     or exists (
       select 1 from pg_catalog.jsonb_array_elements(
         p_decision -> 'blocked_reasons'
       ) as item(value)
       where pg_catalog.jsonb_typeof(item.value) is distinct from 'string'
     ) then
    raise exception using
      errcode = '22023',
      message = 'VENTO_AUTH_SAFE_V1_LEGACY_SHAPE_INVALID';
  end if;

  if p_decision #>> '{audit,outcome}' is distinct from p_decision ->> 'final_decision'
     or p_decision #>> '{audit,decision_id}' is distinct from p_decision ->> 'decision_id'
     or p_decision #>> '{audit,app_code}' is distinct from p_decision #>> '{request,app_code}'
     or p_decision #>> '{audit,permission_key}' is distinct from p_decision #>> '{request,permission_key}' then
    raise exception using
      errcode = '22023',
      message = 'VENTO_AUTH_SAFE_V1_AUDIT_DECISION_MISMATCH';
  end if;

  -- Source presentation fields only from the preexisting governed projector,
  -- which still expects scalar final_decision (never rewrite it to V1 object).
  v_legacy := app_private.project_safe_authorization_decision(p_decision);
  v_outcome := v_legacy ->> 'outcome';

  if v_outcome is null
     or v_outcome not in ('ALLOW', 'DENY')
     or nullif(v_legacy ->> 'app_code', '') is null
     or nullif(v_legacy ->> 'permission_key', '') is null
     or pg_catalog.jsonb_typeof(v_legacy -> 'safe_reason_codes') is distinct from 'array'
     or pg_catalog.jsonb_typeof(v_legacy -> 'correlation_id') not in ('string', 'null')
     or not (v_legacy ? 'correlation_id') then
    raise exception using
      errcode = '22023',
      message = 'VENTO_AUTH_SAFE_V1_PROJECTION_INVALID';
  end if;

  if v_outcome = 'ALLOW'
     and pg_catalog.jsonb_array_length(v_legacy -> 'safe_reason_codes') > 0 then
    raise exception using
      errcode = '22023',
      message = 'VENTO_AUTH_SAFE_V1_ALLOW_HAS_BLOCKERS';
  end if;

  select coalesce(
      pg_catalog.jsonb_agg(r.reason_code order by r.reason_code),
      '[]'::jsonb
    )
  into v_public_reasons
  from (
    select distinct item.value as reason_code
    from pg_catalog.jsonb_array_elements_text(
      v_legacy -> 'safe_reason_codes'
    ) as item(value)
    where item.value = any(v_public_codes)
  ) as r;

  if v_outcome = 'DENY' then
    if pg_catalog.jsonb_array_length(v_public_reasons) = 0 then
      v_public_reasons := pg_catalog.jsonb_build_array(
        'AUTH_AUTHORIZATION_EVALUATION_UNAVAILABLE'
      );
    end if;
    v_message := v_public_reasons ->> 0;
  else
    v_public_reasons := '[]'::jsonb;
    v_message := null;
  end if;

  -- Exactly nine public fields. No private IDs, resource snapshots, evidence,
  -- opaque SQL errors or client-mintable permission capabilities.
  -- Fail-closed classification: no visible/mutable fields until certified.
  return pg_catalog.jsonb_build_object(
    'projection_version', '1.0.0',
    'correlation_id', v_legacy -> 'correlation_id',
    'app_code', v_legacy ->> 'app_code',
    'permission_key', v_legacy ->> 'permission_key',
    'outcome', v_outcome,
    'safe_message_code', v_message,
    'reason_codes', v_public_reasons,
    'visible_fields', '[]'::jsonb,
    'mutable_fields', '[]'::jsonb
  );
end
$auth_db_034_corr002_safe$;

create function app_private.project_authorization_audit_v1(
  p_decision jsonb
)
returns jsonb
language plpgsql
immutable
strict
security invoker
set search_path = pg_catalog, app_private
as $auth_db_034_corr002_audit$
declare
  v_audit jsonb;
  v_required constant text[] := array[
    'decision_id', 'correlation_id', 'actor_id', 'principal_id',
    'device_id', 'app_code', 'permission_key', 'resource_type',
    'resource_ids', 'outcome', 'authorizing_lanes',
    'context_fingerprint', 'resource_fingerprint', 'catalog_hash',
    'dataset_hashes', 'evaluator_name', 'evaluator_version'
  ];
begin
  v_audit := p_decision -> 'audit';
  if pg_catalog.jsonb_typeof(v_audit) is distinct from 'object'
     or not (v_audit ?& v_required)
     or pg_catalog.jsonb_typeof(v_audit -> 'resource_ids') is distinct from 'array'
     or pg_catalog.jsonb_typeof(v_audit -> 'authorizing_lanes') is distinct from 'array'
     or pg_catalog.jsonb_typeof(v_audit -> 'dataset_hashes') is distinct from 'object'
     or nullif(p_decision ->> 'decision_id', '') is null
     or v_audit ->> 'decision_id' is distinct from p_decision ->> 'decision_id'
     or v_audit ->> 'outcome' is distinct from p_decision ->> 'final_decision'
     or v_audit -> 'correlation_id' is distinct from p_decision -> 'correlation_id'
     or v_audit ->> 'app_code' is distinct from p_decision #>> '{request,app_code}'
     or v_audit ->> 'permission_key' is distinct from p_decision #>> '{request,permission_key}'
     or v_audit ->> 'resource_type' is distinct from p_decision #>> '{resource,resource_type}'
     or nullif(v_audit ->> 'evaluator_name', '') is null
     or nullif(v_audit ->> 'evaluator_version', '') is null then
    raise exception using
      errcode = '22023',
      message = 'VENTO_AUTH_AUDIT_V1_SOURCE_INVALID';
  end if;

  return pg_catalog.jsonb_build_object(
    'decision_id', v_audit -> 'decision_id',
    'correlation_id', v_audit -> 'correlation_id',
    'actor_id', v_audit -> 'actor_id',
    'principal_id', v_audit -> 'principal_id',
    'device_id', v_audit -> 'device_id',
    'app_code', v_audit -> 'app_code',
    'permission_key', v_audit -> 'permission_key',
    'resource_type', v_audit -> 'resource_type',
    'resource_ids', v_audit -> 'resource_ids',
    'outcome', v_audit -> 'outcome',
    'authorizing_lanes', v_audit -> 'authorizing_lanes',
    'context_fingerprint', v_audit -> 'context_fingerprint',
    'resource_fingerprint', v_audit -> 'resource_fingerprint',
    'catalog_hash', v_audit -> 'catalog_hash',
    'dataset_hashes', v_audit -> 'dataset_hashes',
    'evaluator_name', v_audit -> 'evaluator_name',
    'evaluator_version', v_audit -> 'evaluator_version'
  );
end
$auth_db_034_corr002_audit$;

-- PostgreSQL grants EXECUTE to PUBLIC by default on CREATE FUNCTION.
-- Revoke as the actual function owner before resetting the restricted role:
-- the migration executor is not necessarily a superuser.
revoke all on function
  app_private.project_safe_authorization_decision_v1(jsonb),
  app_private.project_authorization_audit_v1(jsonb)
from public, anon, authenticated, service_role;

reset role;

revoke create on schema app_private from vento_authorization_owner;

do $auth_db_034_corr002_postconditions$
declare
  v_count integer;
  v_wrapper text;
begin
  select pg_catalog.count(*)::integer into v_count
  from pg_catalog.pg_proc p
  where p.oid in (
    'app_private.project_safe_authorization_decision_v1(jsonb)'::pg_catalog.regprocedure,
    'app_private.project_authorization_audit_v1(jsonb)'::pg_catalog.regprocedure
  )
    and pg_catalog.pg_get_userbyid(p.proowner) = 'vento_authorization_owner'
    and not p.prosecdef
    and p.provolatile = 'i'
    and pg_catalog.array_to_string(p.proconfig, ',') like '%search_path=%';
  if v_count <> 2 then
    raise exception using
      errcode = '55000',
      message = 'VENTO_AUTH_SAFE_V1_OWNER_OR_FUNCTION_SECURITY_POSTCONDITION';
  end if;

  if pg_catalog.has_schema_privilege(
       'vento_authorization_owner', 'app_private', 'CREATE'
     )
     or pg_catalog.has_function_privilege(
       'anon', 'app_private.project_safe_authorization_decision_v1(jsonb)', 'EXECUTE'
     )
     or pg_catalog.has_function_privilege(
       'authenticated', 'app_private.project_safe_authorization_decision_v1(jsonb)', 'EXECUTE'
     )
     or pg_catalog.has_function_privilege(
       'service_role', 'app_private.project_safe_authorization_decision_v1(jsonb)', 'EXECUTE'
     )
     or pg_catalog.has_function_privilege(
       'anon', 'app_private.project_authorization_audit_v1(jsonb)', 'EXECUTE'
     )
     or pg_catalog.has_function_privilege(
       'authenticated', 'app_private.project_authorization_audit_v1(jsonb)', 'EXECUTE'
     )
     or pg_catalog.has_function_privilege(
       'service_role', 'app_private.project_authorization_audit_v1(jsonb)', 'EXECUTE'
     ) then
    raise exception using
      errcode = '55000',
      message = 'VENTO_AUTH_SAFE_V1_PRIVATE_ACL_OR_SCHEMA_GRANT_POSTCONDITION';
  end if;

  select pg_catalog.pg_get_functiondef(
    'api.get_safe_authorization_decision(jsonb)'::pg_catalog.regprocedure
  ) into v_wrapper;
  if v_wrapper not ilike '%evaluate_and_record_authorization%'
     or pg_catalog.has_function_privilege(
       'anon', 'api.get_safe_authorization_decision(jsonb)', 'EXECUTE'
     )
     or not pg_catalog.has_function_privilege(
       'authenticated', 'api.get_safe_authorization_decision(jsonb)', 'EXECUTE'
     ) then
    raise exception using
      errcode = '55000',
      message = 'VENTO_AUTH_SAFE_V1_API_AUDIT_ROUTE_OR_ACL_CHANGED';
  end if;
end
$auth_db_034_corr002_postconditions$;

commit;
