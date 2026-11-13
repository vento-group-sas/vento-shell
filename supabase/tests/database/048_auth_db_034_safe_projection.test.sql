-- VENTO_DB_TEST_CATEGORY: RPC
-- AUTH-DB-034::CORR-002 - PRIVATE V1 projection adapter regression.
-- Test only on dedicated disposable local PostgreSQL after forward migration.
-- No hosted database, package GAP-PKG-004 QA, or main-local reset.
begin;
create extension if not exists pgtap with schema extensions;
select extensions.plan(32);

-- The production functions are deliberately private. This runner-only
-- EXECUTE grant is rolled back with the test and never reaches other roles.
set role vento_authorization_owner;
grant execute on function
  app_private.project_safe_authorization_decision_v1(jsonb),
  app_private.project_authorization_audit_v1(jsonb)
to postgres;
reset role;

create temporary table auth_safe_v1_fixture on commit drop as
select pg_catalog.jsonb_build_object(
  'contract_family', 'vento.authorization.response-contracts',
  'contract_name', 'AuthorizationDecision',
  'contract_version', '1.0.0',
  'decision_id', 'synthetic-test-decision',
  'final_decision', 'DENY',
  'request', pg_catalog.jsonb_build_object(
    'app_code', 'shell',
    'permission_key', 'shell.access',
    'operation_kind', 'APP_ACCESS'
  ),
  'resource', pg_catalog.jsonb_build_object(
    'resource_type', 'APP_SURFACE',
    'safe_resource_reference', null
  ),
  'field_policy_decision', pg_catalog.jsonb_build_object(
    'visible_fields', pg_catalog.jsonb_build_array('secret_field')
  ),
  'blocked_reasons', pg_catalog.jsonb_build_array(
    'INTERNAL_UNAPPROVED_REASON', 'AUTH_NO_SESSION'
  ),
  'correlation_id', null,
  'decided_at', '2026-10-22T12:00:00Z',
  'audit', pg_catalog.jsonb_build_object(
    'decision_id', 'synthetic-test-decision',
    'correlation_id', null,
    'actor_id', null,
    'principal_id', null,
    'device_id', null,
    'app_code', 'shell',
    'permission_key', 'shell.access',
    'resource_type', 'APP_SURFACE',
    'resource_ids', '[]'::jsonb,
    'outcome', 'DENY',
    'authorizing_lanes', '[]'::jsonb,
    'context_fingerprint', 'sha256:' || pg_catalog.repeat('a',64),
    'resource_fingerprint', 'sha256:' || pg_catalog.repeat('b',64),
    'catalog_hash', 'sha256:' || pg_catalog.repeat('c',64),
    'dataset_hashes', '{}'::jsonb,
    'evaluator_name', 'vento.authorization.evaluate_authorization',
    'evaluator_version', '20260901230518',
    'request_fingerprint', 'sha256:' || pg_catalog.repeat('d',64),
    'permission_contract_fingerprint', null,
    'contract_release_hash', 'sha256:' || pg_catalog.repeat('e',64),
    'identity_registry_sha256', null,
    'dataset_evidence', '[]'::jsonb,
    'request_source', 'RPC'
  )
) as decision;

create temporary table auth_safe_v1_result on commit drop as
select
  app_private.project_safe_authorization_decision_v1(decision) as dto,
  app_private.project_authorization_audit_v1(decision) as audit_v1,
  app_private.project_safe_authorization_decision(decision) as old_dto
from auth_safe_v1_fixture;

select extensions.is(pg_catalog.jsonb_typeof(dto), 'object', 'safe DTO object')
from auth_safe_v1_result;

select extensions.is(
  (select pg_catalog.count(*)::integer from pg_catalog.jsonb_object_keys(dto)),
  9, 'safe DTO exact field count'
) from auth_safe_v1_result;

select extensions.is(
  (select pg_catalog.array_agg(key order by key)
   from pg_catalog.jsonb_object_keys(dto) as key),
  array[
    'app_code','correlation_id','mutable_fields','outcome','permission_key',
    'projection_version','reason_codes','safe_message_code','visible_fields'
  ]::text[],
  'safe DTO exact field set'
) from auth_safe_v1_result;

select extensions.is(dto ->> 'projection_version', '1.0.0', 'version pinned')
from auth_safe_v1_result;

select extensions.is(dto ->> 'outcome', 'DENY', 'no authority upgrade')
from auth_safe_v1_result;

select extensions.is(dto ->> 'safe_message_code', 'AUTH_NO_SESSION', 'public denial reason')
from auth_safe_v1_result;

select extensions.is(dto -> 'reason_codes', '["AUTH_NO_SESSION"]'::jsonb,
  'unknown internal reasons excluded') from auth_safe_v1_result;

select extensions.is(dto -> 'visible_fields', '[]'::jsonb,
  'unclassified fields never exposed') from auth_safe_v1_result;

select extensions.is(dto -> 'mutable_fields', '[]'::jsonb,
  'no mutable authority inferred') from auth_safe_v1_result;

select extensions.ok(
  not (dto ?| array['audit','dataset_hashes','resource_fingerprint',
                    'decision_id','matched_allows','matched_denies','safe_reason_codes']),
  'no private audit data or legacy keys in client DTO'
) from auth_safe_v1_result;

select extensions.is(
  (select pg_catalog.count(*)::integer from pg_catalog.jsonb_object_keys(old_dto)),
  12, 'prior 12-field projection unchanged'
) from auth_safe_v1_result;

select extensions.is(
  (select pg_catalog.count(*)::integer from pg_catalog.jsonb_object_keys(audit_v1)),
  17, 'audit V1 projection exact field count'
) from auth_safe_v1_result;

select extensions.ok(
  not (audit_v1 ?| array[
    'request_fingerprint','permission_contract_fingerprint',
    'contract_release_hash','identity_registry_sha256',
    'dataset_evidence','request_source'
  ]), 'legacy audit keys excluded from V1 projection'
) from auth_safe_v1_result;

select extensions.throws_ok(
  $$ select app_private.project_safe_authorization_decision_v1(
    pg_catalog.jsonb_set(
      pg_catalog.jsonb_set(decision,'{final_decision}','"ALLOW"'::jsonb),
      '{audit,outcome}','"ALLOW"'::jsonb
    )
  ) from auth_safe_v1_fixture $$,
  '22023', 'VENTO_AUTH_SAFE_V1_ALLOW_HAS_BLOCKERS',
  'ALLOW with blockers rejected'
);

select extensions.ok(
  not pg_catalog.has_function_privilege('authenticated',
    'app_private.project_safe_authorization_decision_v1(jsonb)', 'EXECUTE'),
  'authenticated denied private V1 adapter'
);

select extensions.ok(
  not pg_catalog.has_function_privilege('service_role',
    'app_private.project_authorization_audit_v1(jsonb)', 'EXECUTE'),
  'service_role denied private audit adapter'
);

select extensions.ok(
  not prosecdef, 'new adapter is SECURITY INVOKER'
) from pg_catalog.pg_proc
where oid = 'app_private.project_safe_authorization_decision_v1(jsonb)'::pg_catalog.regprocedure;

select extensions.ok(
  not pg_catalog.has_schema_privilege('vento_authorization_owner','app_private','CREATE'),
  'authorization owner CREATE grant was removed'
);

select extensions.throws_ok(
  $$ select app_private.project_safe_authorization_decision_v1(
    pg_catalog.jsonb_set(decision,'{final_decision}','"ALLOW"'::jsonb)
  ) from auth_safe_v1_fixture $$,
  '22023', 'VENTO_AUTH_SAFE_V1_AUDIT_DECISION_MISMATCH',
  'tampering only the outcome cannot mint ALLOW'
);

select extensions.throws_ok(
  $$ select app_private.project_safe_authorization_decision_v1(
    decision - 'blocked_reasons'
  ) from auth_safe_v1_fixture $$,
  '22023', 'VENTO_AUTH_SAFE_V1_LEGACY_SHAPE_INVALID',
  'missing blockers array rejected'
);

select extensions.is(
  app_private.project_safe_authorization_decision_v1(
    pg_catalog.jsonb_set(decision,'{blocked_reasons}',
      '["UNAPPROVED_PRIVATE_REASON"]'::jsonb)
  ) ->> 'safe_message_code',
  'AUTH_AUTHORIZATION_EVALUATION_UNAVAILABLE',
  'unknown reasons replaced by approved public fallback'
) from auth_safe_v1_fixture;

select extensions.is(
  app_private.project_safe_authorization_decision_v1(
    pg_catalog.jsonb_set(
      pg_catalog.jsonb_set(
        pg_catalog.jsonb_set(decision,'{final_decision}','"ALLOW"'::jsonb),
        '{audit,outcome}','"ALLOW"'::jsonb
      ), '{blocked_reasons}', '[]'::jsonb
    )
  ) -> 'reason_codes',
  '[]'::jsonb,
  'ALLOW cannot include public denial codes'
) from auth_safe_v1_fixture;

select extensions.throws_ok(
  $$ select app_private.project_authorization_audit_v1(
    pg_catalog.jsonb_set(decision,'{audit,dataset_hashes}','null'::jsonb)
  ) from auth_safe_v1_fixture $$,
  '22023', 'VENTO_AUTH_AUDIT_V1_SOURCE_INVALID',
  'null canonical dataset hash object rejected'
);

-- Stable RPC contract: the externally authorized route must persist audit
-- rather than bypass the durable coordinator or widen privileges.
select extensions.ok(
  pg_catalog.pg_get_functiondef(
    'api.get_safe_authorization_decision(jsonb)'::pg_catalog.regprocedure
  ) ilike '%evaluate_and_record_authorization%',
  'safe RPC continues to evaluate and persist decisions'
);

select extensions.ok(
  not pg_catalog.has_function_privilege(
    'anon','api.get_safe_authorization_decision(jsonb)','EXECUTE'
  ), 'anonymous role still denied API'
);

select extensions.ok(
  pg_catalog.has_function_privilege(
    'authenticated','api.get_safe_authorization_decision(jsonb)','EXECUTE'
  ), 'authenticated retains existing API execution'
);

select extensions.ok(
  pg_catalog.pg_get_functiondef(
    'app_private.authorization_policy_allows(jsonb)'::pg_catalog.regprocedure
  ) ilike '%evaluate_authorization%',
  'policy boolean still uses evaluator rather than audit persistence'
);

select extensions.is(
  (select pg_catalog.pg_get_userbyid(proowner)
   from pg_catalog.pg_proc
   where oid='app_private.project_safe_authorization_decision_v1(jsonb)'::pg_catalog.regprocedure),
  'vento_authorization_owner',
  'safe DTO helper owner is non-login authorization role'
);

select extensions.is(
  (select pg_catalog.pg_get_userbyid(proowner)
   from pg_catalog.pg_proc
   where oid='app_private.project_authorization_audit_v1(jsonb)'::pg_catalog.regprocedure),
  'vento_authorization_owner',
  'audit DTO helper owner is non-login authorization role'
);

select extensions.throws_ok(
  $$ select app_private.project_safe_authorization_decision_v1(
    pg_catalog.jsonb_set(decision,'{blocked_reasons}','[1]'::jsonb)
  ) from auth_safe_v1_fixture $$,
  '22023', 'VENTO_AUTH_SAFE_V1_LEGACY_SHAPE_INVALID',
  'non-string blockers are rejected before public projection'
);

select extensions.throws_ok(
  $$ select app_private.project_authorization_audit_v1(
    pg_catalog.jsonb_set(decision,'{audit,resource_type}','"WRONG_TYPE"'::jsonb)
  ) from auth_safe_v1_fixture $$,
  '22023', 'VENTO_AUTH_AUDIT_V1_SOURCE_INVALID',
  'audit resource type mismatch cannot be projected'
);

select extensions.throws_ok(
  $$ select app_private.project_authorization_audit_v1(
    pg_catalog.jsonb_set(decision,'{audit,correlation_id}','"tampered"'::jsonb)
  ) from auth_safe_v1_fixture $$,
  '22023', 'VENTO_AUTH_AUDIT_V1_SOURCE_INVALID',
  'audit correlation cannot be changed independently'
);

select * from extensions.finish();
rollback;
