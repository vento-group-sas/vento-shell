-- VENTO_DB_TEST_CATEGORY: RPC
-- GAP-PKG-004: local ACL and Storage acceptance checks. No fixtures or production mutation.
BEGIN;
CREATE EXTENSION IF NOT EXISTS pgtap WITH SCHEMA extensions;
SET LOCAL search_path TO public, extensions, pg_catalog;
SELECT plan(100);

SELECT ok(NOT has_function_privilege('anon', 'public.get_site_cost_center(uuid)', 'EXECUTE'),
  'RPC-1: anon execution is denied');
SELECT ok(NOT has_function_privilege('authenticated', 'public.get_site_cost_center(uuid)', 'EXECUTE'),
  'RPC-1: authenticated execution is denied');
SELECT ok(has_function_privilege('service_role', 'public.get_site_cost_center(uuid)', 'EXECUTE'),
  'RPC-1: service_role execution is preserved');
SELECT ok(NOT EXISTS (
  SELECT 1 FROM pg_proc p,
    LATERAL aclexplode(coalesce(p.proacl, acldefault('f', p.proowner))) AS acl
  WHERE p.oid = to_regprocedure('public.get_site_cost_center(uuid)')
    AND acl.grantee = 0 AND acl.privilege_type = 'EXECUTE'
), 'RPC-1: no PUBLIC direct EXECUTE grant');

SELECT ok(NOT has_function_privilege('anon', 'public.resolve_internal_transfer_price(uuid,uuid,uuid,uuid,text,timestamp with time zone)', 'EXECUTE'),
  'RPC-2: anon execution is denied');
SELECT ok(NOT has_function_privilege('authenticated', 'public.resolve_internal_transfer_price(uuid,uuid,uuid,uuid,text,timestamp with time zone)', 'EXECUTE'),
  'RPC-2: authenticated execution is denied');
SELECT ok(has_function_privilege('service_role', 'public.resolve_internal_transfer_price(uuid,uuid,uuid,uuid,text,timestamp with time zone)', 'EXECUTE'),
  'RPC-2: service_role execution is preserved');
SELECT ok(NOT EXISTS (
  SELECT 1 FROM pg_proc p,
    LATERAL aclexplode(coalesce(p.proacl, acldefault('f', p.proowner))) AS acl
  WHERE p.oid = to_regprocedure('public.resolve_internal_transfer_price(uuid,uuid,uuid,uuid,text,timestamp with time zone)')
    AND acl.grantee = 0 AND acl.privilege_type = 'EXECUTE'
), 'RPC-2: no PUBLIC direct EXECUTE grant');

SELECT ok(NOT has_function_privilege('anon', 'public.resolve_internal_transfer_price_for_profile(uuid,uuid,uuid,uuid,uuid,text,timestamp with time zone)', 'EXECUTE'),
  'RPC-3: anon execution is denied');
SELECT ok(NOT has_function_privilege('authenticated', 'public.resolve_internal_transfer_price_for_profile(uuid,uuid,uuid,uuid,uuid,text,timestamp with time zone)', 'EXECUTE'),
  'RPC-3: authenticated execution is denied');
SELECT ok(has_function_privilege('service_role', 'public.resolve_internal_transfer_price_for_profile(uuid,uuid,uuid,uuid,uuid,text,timestamp with time zone)', 'EXECUTE'),
  'RPC-3: service_role execution is preserved');
SELECT ok(NOT EXISTS (
  SELECT 1 FROM pg_proc p,
    LATERAL aclexplode(coalesce(p.proacl, acldefault('f', p.proowner))) AS acl
  WHERE p.oid = to_regprocedure('public.resolve_internal_transfer_price_for_profile(uuid,uuid,uuid,uuid,uuid,text,timestamp with time zone)')
    AND acl.grantee = 0 AND acl.privilege_type = 'EXECUTE'
), 'RPC-3: no PUBLIC direct EXECUTE grant');

SELECT ok(NOT has_function_privilege('anon', 'public.assert_inventory_uom_profile_stock_input(uuid,uuid,uuid,uuid,numeric,numeric)', 'EXECUTE'),
  'RPC-4: anon execution is denied');
SELECT ok(NOT has_function_privilege('authenticated', 'public.assert_inventory_uom_profile_stock_input(uuid,uuid,uuid,uuid,numeric,numeric)', 'EXECUTE'),
  'RPC-4: authenticated execution is denied');
SELECT ok(has_function_privilege('service_role', 'public.assert_inventory_uom_profile_stock_input(uuid,uuid,uuid,uuid,numeric,numeric)', 'EXECUTE'),
  'RPC-4: service_role execution is preserved');
SELECT ok(NOT EXISTS (
  SELECT 1 FROM pg_proc p,
    LATERAL aclexplode(coalesce(p.proacl, acldefault('f', p.proowner))) AS acl
  WHERE p.oid = to_regprocedure('public.assert_inventory_uom_profile_stock_input(uuid,uuid,uuid,uuid,numeric,numeric)')
    AND acl.grantee = 0 AND acl.privilege_type = 'EXECUTE'
), 'RPC-4: no PUBLIC direct EXECUTE grant');

SELECT ok(NOT has_function_privilege('anon', 'public.shared_device_actor_is_allowed_v1(uuid,uuid,uuid,uuid)', 'EXECUTE'),
  'RPC-5: anon execution is denied');
SELECT ok(NOT has_function_privilege('authenticated', 'public.shared_device_actor_is_allowed_v1(uuid,uuid,uuid,uuid)', 'EXECUTE'),
  'RPC-5: authenticated execution is denied');
SELECT ok(has_function_privilege('service_role', 'public.shared_device_actor_is_allowed_v1(uuid,uuid,uuid,uuid)', 'EXECUTE'),
  'RPC-5: service_role execution is preserved');
SELECT ok(NOT EXISTS (
  SELECT 1 FROM pg_proc p,
    LATERAL aclexplode(coalesce(p.proacl, acldefault('f', p.proowner))) AS acl
  WHERE p.oid = to_regprocedure('public.shared_device_actor_is_allowed_v1(uuid,uuid,uuid,uuid)')
    AND acl.grantee = 0 AND acl.privilege_type = 'EXECUTE'
), 'RPC-5: no PUBLIC direct EXECUTE grant');

SELECT ok(EXISTS (SELECT 1 FROM storage.buckets WHERE id = 'documents' AND public = false),
  'documents bucket is private');

-- AUTH-CAT-003: materialize one VISO workforce read permission only.
SELECT is((
  SELECT count(*) FROM public.app_permissions p
  JOIN public.apps a ON a.id = p.app_id
  WHERE a.code = 'viso' AND p.code = 'workforce.employees.view'
), 1::bigint, 'canonical VISO employee read permission exists exactly once');

SELECT ok(EXISTS (
  SELECT 1 FROM public.app_permissions p
  JOIN public.apps a ON a.id = p.app_id
  WHERE a.code = 'viso' AND p.code = 'workforce.employees.view'
    AND p.is_active IS TRUE
    AND p.name = 'Consultar trabajadores'
    AND p.human_label = 'Consultar trabajadores'
    AND p.human_group = 'Personal'
    AND p.permission_audience = 'administrative'
    AND p.is_operational IS FALSE
    AND p.requires_active_work_context IS FALSE
), 'canonical VISO employee read permission is active BASE_ONLY administrative');

SELECT ok(NOT EXISTS (
  SELECT 1 FROM public.app_permissions p
  JOIN public.apps a ON a.id = p.app_id
  WHERE a.code = 'viso' AND p.code = 'staff.read'
), 'legacy VISO staff.read alias is not assignable');

SELECT is((
  SELECT count(*) FROM public.role_permissions rp
  JOIN public.app_permissions p ON p.id = rp.permission_id
  JOIN public.apps a ON a.id = p.app_id
  WHERE a.code = 'viso' AND p.code = 'workforce.employees.view'
), 0::bigint, 'registration creates zero role grants');

SELECT is((
  SELECT count(*) FROM public.employee_permissions ep
  JOIN public.app_permissions p ON p.id = ep.permission_id
  JOIN public.apps a ON a.id = p.app_id
  WHERE a.code = 'viso' AND p.code = 'workforce.employees.view'
), 0::bigint, 'registration creates zero employee grants');

-- GAP-PKG-004: forward-only RLS grant for an explicitly permitted document operator.
SELECT ok(EXISTS (
  SELECT 1 FROM pg_catalog.pg_policies
  WHERE schemaname = 'public'
    AND tablename = 'employee_sites'
    AND policyname = 'gap_pkg_004_employee_sites_documents_site_scope'
    AND permissive = 'PERMISSIVE'
    AND cmd = 'SELECT'
    AND roles = ARRAY['authenticated']::name[]
), 'documents site mapping policy is restricted to authenticated SELECT');

SELECT ok(EXISTS (
  SELECT 1 FROM pg_catalog.pg_policies
  WHERE schemaname = 'public'
    AND tablename = 'employee_sites'
    AND policyname = 'gap_pkg_004_employee_sites_documents_site_scope'
    AND qual ILIKE '%is_active%'
    AND qual LIKE '%anima.documents.upload%'
    AND qual LIKE '%viso.staff.documents.manage%'
    AND qual LIKE '%site_id%'
), 'documents site mapping requires active membership and explicit site permission');

SELECT ok(NOT EXISTS (
  SELECT 1 FROM pg_catalog.pg_policies
  WHERE schemaname = 'public'
    AND tablename = 'employee_sites'
    AND policyname = 'gap_pkg_004_employee_sites_documents_site_scope'
    AND roles && ARRAY['anon', 'public']::name[]
), 'documents site mapping is not granted to anon or PUBLIC');

SELECT ok(EXISTS (
  SELECT 1 FROM pg_catalog.pg_policies
  WHERE schemaname = 'public'
    AND tablename = 'documents'
    AND policyname = 'documents_select_self_or_permission'
    AND cmd = 'SELECT'
    AND roles = ARRAY['authenticated']::name[]
    AND qual LIKE '%anima.documents.view_all%'
    AND qual LIKE '%anima.documents.upload%'
    AND qual LIKE '%viso.staff.documents.manage%'
    AND qual LIKE '%target_site.site_id%'
), 'document metadata VISO manager grant is bound to an active target site');

SELECT ok(EXISTS (
  SELECT 1 FROM pg_catalog.pg_policies
  WHERE schemaname = 'storage'
    AND tablename = 'objects'
    AND policyname = 'documents_select_visible'
    AND cmd = 'SELECT'
    AND roles = ARRAY['authenticated']::name[]
    AND qual LIKE '%anima.documents.view_all%'
    AND qual LIKE '%anima.documents.upload%'
    AND qual LIKE '%viso.staff.documents.manage%'
    AND qual LIKE '%target_site.site_id%'
), 'private document Storage VISO manager grant is bound to an active target site');

SELECT ok(EXISTS (
  SELECT 1 FROM pg_proc p
  JOIN pg_namespace n ON n.oid = p.pronamespace
  WHERE n.nspname = 'public'
    AND p.proname = 'sign_shared_device_action'
    AND p.prosecdef
    AND pg_get_userbyid(p.proowner) = 'postgres'
    AND pg_get_functiondef(p.oid) LIKE '%shared_device_actor_is_allowed_v1%'
), 'shared device signed action retains definer-mediated helper dependency');
-- AUTH-INVITE: only the trusted service role can atomically activate invited staff.
SELECT ok(NOT has_function_privilege('anon',
  'public.complete_staff_invitation_v1(uuid,uuid,text,text,text,text)', 'EXECUTE'),
  'invitation completion denied for anon');
SELECT ok(NOT has_function_privilege('authenticated',
  'public.complete_staff_invitation_v1(uuid,uuid,text,text,text,text)', 'EXECUTE'),
  'invitation completion denied for authenticated');
SELECT ok(has_function_privilege('service_role',
  'public.complete_staff_invitation_v1(uuid,uuid,text,text,text,text)', 'EXECUTE'),
  'invitation completion allowed for service_role');
SELECT ok(EXISTS (
  SELECT 1 FROM pg_proc p
  WHERE p.oid = to_regprocedure(
    'public.complete_staff_invitation_v1(uuid,uuid,text,text,text,text)')
    AND NOT p.prosecdef
), 'invitation completion runs with SECURITY INVOKER, preserving historical privileged inventory');
SELECT ok(EXISTS (
  SELECT 1 FROM pg_proc p
  WHERE p.oid = to_regprocedure(
    'public.complete_staff_invitation_v1(uuid,uuid,text,text,text,text)')
    AND pg_get_userbyid(p.proowner) = 'postgres'
), 'invitation completion is owned by postgres');
SELECT ok(
  has_column_privilege('service_role', 'auth.users', 'id', 'SELECT')
  AND has_column_privilege('service_role', 'auth.users', 'email', 'SELECT')
  AND has_column_privilege('service_role', 'auth.users', 'email_confirmed_at', 'SELECT'),
  'service_role can read only the required private Auth identity columns');
SELECT ok(EXISTS (
  SELECT 1 FROM pg_proc p
  WHERE p.oid = to_regprocedure(
    'public.complete_staff_invitation_v1(uuid,uuid,text,text,text,text)')
    AND EXISTS (
      SELECT 1 FROM unnest(p.proconfig) AS setting
      WHERE split_part(setting, '=', 1) = 'search_path'
        AND btrim(split_part(setting, '=', 2), '"') = ''
    )
), 'invitation completion has empty search_path');
SELECT ok(NOT EXISTS (
  SELECT 1 FROM pg_proc p,
    LATERAL aclexplode(coalesce(p.proacl, acldefault('f', p.proowner))) AS acl
  WHERE p.oid = to_regprocedure(
    'public.complete_staff_invitation_v1(uuid,uuid,text,text,text,text)')
    AND acl.grantee = 0 AND acl.privilege_type = 'EXECUTE'
), 'invitation completion has no PUBLIC direct EXECUTE');
SELECT is(
  public.complete_staff_invitation_v1(null,null,null,null,null,'accepted'),
  false, 'invitation completion refuses a missing identity');
SELECT is(
  public.complete_staff_invitation_v1(
    'b0040000-0000-0000-0000-000000000001'::uuid,
    'b0040000-0000-0000-0000-000000000002'::uuid,
    'unregistered@example.invalid', 'Synthetic Actor', null, 'accepted'),
  false, 'invitation completion refuses unknown invitation ID');


-- Full local lifecycle probes; their Auth, invitation, employee and site rows
-- exist only until the surrounding test ROLLBACK.
INSERT INTO public.sites (
  id, code, name, type, site_kind, site_type, is_active, operational_visibility
) VALUES (
  'b0040000-0000-0000-0000-000000000020'::uuid,
  'GAP004_FIXTURE', 'GAP004 Fixture Site', 'satellite', 'operational',
  'satellite', true, 'operational'
);
INSERT INTO auth.users (
  instance_id, id, aud, role, email, encrypted_password,
  email_confirmed_at, created_at, updated_at
) VALUES (
  '00000000-0000-0000-0000-000000000000'::uuid,
  'b0040000-0000-0000-0000-000000000021'::uuid,
  'authenticated', 'authenticated',
  'gap004-fixture-user-a@example.invalid', '',
  now(), now(), now()
), (
  '00000000-0000-0000-0000-000000000000'::uuid,
  'b0040000-0000-0000-0000-000000000023'::uuid,
  'authenticated', 'authenticated',
  'gap004-fixture-user-b@example.invalid', '',
  now(), now(), now()
);
INSERT INTO public.staff_invitations (
  id, email, staff_role, role_code, staff_site_id, site_id,
  status, auth_user_id, invited_at, expires_at
) VALUES (
  'b0040000-0000-0000-0000-000000000022'::uuid,
  'gap004-fixture-user-a@example.invalid', 'mesero', 'mesero',
  'b0040000-0000-0000-0000-000000000020'::uuid,
  'b0040000-0000-0000-0000-000000000020'::uuid,
  'sent', 'b0040000-0000-0000-0000-000000000021'::uuid,
  now(), now() + interval '1 day'
), (
  'b0040000-0000-0000-0000-000000000024'::uuid,
  'gap004-fixture-user-b@example.invalid', 'mesero', 'mesero',
  'b0040000-0000-0000-0000-000000000020'::uuid,
  'b0040000-0000-0000-0000-000000000020'::uuid,
  'cancelled', 'b0040000-0000-0000-0000-000000000023'::uuid,
  now(), now() + interval '1 day'
);
INSERT INTO auth.users (
  instance_id, id, aud, role, email, encrypted_password,
  created_at, updated_at
) VALUES (
  '00000000-0000-0000-0000-000000000000'::uuid,
  'b0040000-0000-0000-0000-000000000025'::uuid,
  'authenticated', 'authenticated',
  'gap004-unverified@example.invalid', '', now(), now()
);
INSERT INTO public.staff_invitations (
  id, email, staff_role, role_code, staff_site_id, site_id,
  status, auth_user_id, invited_at, expires_at
) VALUES (
  'b0040000-0000-0000-0000-000000000026'::uuid,
  'gap004-unverified@example.invalid', 'mesero', 'mesero',
  'b0040000-0000-0000-0000-000000000020'::uuid,
  'b0040000-0000-0000-0000-000000000020'::uuid,
  'sent', 'b0040000-0000-0000-0000-000000000025'::uuid,
  now(), now() + interval '1 day'
);

SELECT ok(NOT EXISTS (
  SELECT 1 FROM public.employees
  WHERE id = 'b0040000-0000-0000-0000-000000000021'::uuid
), 'pending invitation does not preactivate employee');

-- Exercise the completion exactly as PostgREST service_role, not as postgres.
SET LOCAL ROLE service_role;
SELECT is(public.complete_staff_invitation_v1(
  'b0040000-0000-0000-0000-000000000022'::uuid,
  'b0040000-0000-0000-0000-000000000021'::uuid,
  'gap004-fixture-user-a@example.invalid', 'Synthetic Staff', null, 'accepted'
), true, 'valid verified Auth account activates using SECURITY INVOKER as service_role');
RESET ROLE;

SELECT ok(EXISTS (
  SELECT 1 FROM public.staff_invitations i
  JOIN public.employees e ON e.id = i.auth_user_id
  JOIN public.employee_sites es ON es.employee_id = e.id AND es.site_id = e.site_id
  WHERE i.id = 'b0040000-0000-0000-0000-000000000022'::uuid
    AND i.status = 'accepted' AND i.employee_id = e.id
    AND e.is_active is true AND es.is_active is true AND es.is_primary is true
), 'employment, primary site and accepted state commit together');

SELECT is(public.complete_staff_invitation_v1(
  'b0040000-0000-0000-0000-000000000022'::uuid,
  'b0040000-0000-0000-0000-000000000021'::uuid,
  'gap004-fixture-user-a@example.invalid', 'Synthetic Staff', null, 'accepted'
), false, 'repeated acceptance cannot activate invitation twice');

SELECT is(public.complete_staff_invitation_v1(
  'b0040000-0000-0000-0000-000000000024'::uuid,
  'b0040000-0000-0000-0000-000000000023'::uuid,
  'gap004-fixture-user-b@example.invalid', 'Synthetic Staff', null, 'accepted'
), false, 'cancelled invitation cannot activate employee');

SELECT ok(NOT EXISTS (
  SELECT 1 FROM public.employees
  WHERE id = 'b0040000-0000-0000-0000-000000000023'::uuid
), 'cancelled invitation leaves employee without staff access');

SELECT is(public.complete_staff_invitation_v1(
  'b0040000-0000-0000-0000-000000000026'::uuid,
  'b0040000-0000-0000-0000-000000000025'::uuid,
  'gap004-unverified@example.invalid', 'Unverified Staff', null, 'accepted'
), false, 'unverified Auth email cannot activate employee');
SELECT ok(NOT EXISTS (
  SELECT 1 FROM public.employees
  WHERE id = 'b0040000-0000-0000-0000-000000000025'::uuid
), 'unverified email leaves staff employment inactive');

SELECT ok(EXISTS (
  SELECT 1 FROM pg_catalog.pg_class c
  JOIN pg_catalog.pg_namespace ns ON ns.oid = c.relnamespace
  WHERE ns.nspname = 'public' AND c.relkind = 'v'
    AND c.relname = 'permission_catalog_human_v1'
    AND 'security_invoker=true' = any(coalesce(c.reloptions, array[]::text[]))
    AND has_table_privilege('authenticated', c.oid, 'SELECT')
    AND NOT has_table_privilege('anon', c.oid, 'SELECT')
    AND has_table_privilege('service_role', c.oid, 'SELECT')
), 'admin view 1 is caller-invoker without widening existing ACL');

SELECT ok(EXISTS (
  SELECT 1 FROM pg_catalog.pg_class c
  JOIN pg_catalog.pg_namespace ns ON ns.oid = c.relnamespace
  WHERE ns.nspname = 'public' AND c.relkind = 'v'
    AND c.relname = 'shared_operational_device_actor_policies_admin_v1'
    AND 'security_invoker=true' = any(coalesce(c.reloptions, array[]::text[]))
    AND has_table_privilege('authenticated', c.oid, 'SELECT')
    AND NOT has_table_privilege('anon', c.oid, 'SELECT')
    AND has_table_privilege('service_role', c.oid, 'SELECT')
), 'admin view 2 is caller-invoker without widening existing ACL');

SELECT ok(EXISTS (
  SELECT 1 FROM pg_catalog.pg_class c
  JOIN pg_catalog.pg_namespace ns ON ns.oid = c.relnamespace
  WHERE ns.nspname = 'public' AND c.relkind = 'v'
    AND c.relname = 'shared_operational_device_templates_admin_v1'
    AND 'security_invoker=true' = any(coalesce(c.reloptions, array[]::text[]))
    AND has_table_privilege('authenticated', c.oid, 'SELECT')
    AND NOT has_table_privilege('anon', c.oid, 'SELECT')
    AND has_table_privilege('service_role', c.oid, 'SELECT')
) AND (
  SELECT count(*) FROM pg_catalog.pg_policies
  WHERE schemaname = 'public'
    AND permissive = 'RESTRICTIVE'
    AND cmd = 'SELECT'
    AND roles = array['authenticated']::name[]
    AND qual like '%viso.staff.manage%'
    AND (tablename,policyname) in (
      ('shared_operational_device_templates', 'gap_pkg_004_templates_manage_read'),
      ('shared_operational_device_template_apps', 'gap_pkg_004_template_apps_manage_read'),
      ('shared_operational_device_template_actor_policies',
       'gap_pkg_004_template_actor_policies_manage_read')
    )
) = 3, 'admin view 3 and all three base catalogs enforce effective staff.manage');

SELECT ok(EXISTS (
  SELECT 1 FROM pg_catalog.pg_class c
  JOIN pg_catalog.pg_namespace ns ON ns.oid = c.relnamespace
  WHERE ns.nspname = 'public' AND c.relkind = 'v'
    AND c.relname = 'shared_operational_devices_admin_v1'
    AND 'security_invoker=true' = any(coalesce(c.reloptions, array[]::text[]))
    AND has_table_privilege('authenticated', c.oid, 'SELECT')
    AND NOT has_table_privilege('anon', c.oid, 'SELECT')
    AND has_table_privilege('service_role', c.oid, 'SELECT')
), 'admin view 4 is caller-invoker without widening existing ACL');

-- Durable transactional invitation delivery outbox: no hosted mail or tokens.
SELECT ok(to_regclass('app_private.staff_invitation_delivery_outbox') is not null, 'private delivery outbox exists');

SELECT ok((select relrowsecurity from pg_class where oid=to_regclass('app_private.staff_invitation_delivery_outbox')), 'outbox RLS enabled');

SELECT ok(not has_table_privilege('anon','app_private.staff_invitation_delivery_outbox','SELECT'),'anon has no direct outbox read');

SELECT ok(not has_table_privilege('authenticated','app_private.staff_invitation_delivery_outbox','SELECT'),'authenticated has no direct outbox read');

SELECT ok(not has_table_privilege('service_role','app_private.staff_invitation_delivery_outbox','SELECT'),'service_role has no direct outbox read');

SELECT ok(not has_function_privilege('anon','public.claim_staff_invitation_delivery_v1(uuid,text)','EXECUTE'),'anon may not call claim');

SELECT ok(not has_function_privilege('authenticated','public.claim_staff_invitation_delivery_v1(uuid,text)','EXECUTE'),'authenticated may not call claim');

SELECT ok(has_function_privilege('service_role','public.claim_staff_invitation_delivery_v1(uuid,text)','EXECUTE'),'service_role may call claim');

SELECT ok(not has_function_privilege('anon','public.finish_staff_invitation_delivery_v1(uuid,text,text)','EXECUTE'),'anon may not call finish');

SELECT ok(not has_function_privilege('authenticated','public.finish_staff_invitation_delivery_v1(uuid,text,text)','EXECUTE'),'authenticated may not call finish');

SELECT ok(has_function_privilege('service_role','public.finish_staff_invitation_delivery_v1(uuid,text,text)','EXECUTE'),'service_role may call finish');

SELECT ok(not has_function_privilege('anon','public.has_unresolved_staff_invitation_delivery_v1(uuid)','EXECUTE'),'anon may not call unresolved');

SELECT ok(not has_function_privilege('authenticated','public.has_unresolved_staff_invitation_delivery_v1(uuid)','EXECUTE'),'authenticated may not call unresolved');

SELECT ok(has_function_privilege('service_role','public.has_unresolved_staff_invitation_delivery_v1(uuid)','EXECUTE'),'service_role may call unresolved');

SELECT ok((select count(*)=3 and bool_and(prosecdef and array_to_string(proconfig,',') like '%search_path=%') from pg_proc where oid in (to_regprocedure('public.claim_staff_invitation_delivery_v1(uuid,text)'),to_regprocedure('public.finish_staff_invitation_delivery_v1(uuid,text,text)'),to_regprocedure('public.has_unresolved_staff_invitation_delivery_v1(uuid)'))),'outbox RPCs are narrow SECURITY DEFINER with fixed search_path');

SELECT is((select count(*) from app_private.staff_invitation_delivery_outbox where invitation_id='b0040000-0000-0000-0000-000000000026'::uuid and event_kind='initial' and delivery_state='queued'),1::bigint,'initial invitation and queued event commit together');

SELECT is((select count(*) from app_private.staff_invitation_delivery_outbox where invitation_id='b0040000-0000-0000-0000-000000000024'::uuid),0::bigint,'cancelled invitation has no queued email');

SELECT ok(not exists(select 1 from information_schema.columns where table_schema='app_private' and table_name='staff_invitation_delivery_outbox' and column_name in ('email','token','invite_token_hash','html','password','secret')),'outbox stores no mail tokens or payloads');

SELECT ok(public.has_unresolved_staff_invitation_delivery_v1('b0040000-0000-0000-0000-000000000026'::uuid),'queued delivery is unresolved');

SET LOCAL ROLE service_role;
SELECT ok(public.claim_staff_invitation_delivery_v1('b0040000-0000-0000-0000-000000000026'::uuid,'initial:b0040000-0000-0000-0000-000000000026') is not null,'service_role claims queued event');
SELECT is(public.claim_staff_invitation_delivery_v1('b0040000-0000-0000-0000-000000000026'::uuid,'initial:b0040000-0000-0000-0000-000000000026'),null::uuid,'parallel claim is denied');
RESET ROLE;

SELECT ok(not public.finish_staff_invitation_delivery_v1((select id from app_private.staff_invitation_delivery_outbox where invitation_id='b0040000-0000-0000-0000-000000000026'::uuid and event_kind='initial'),'queued'),'invalid disposition rejected');

SELECT ok(public.finish_staff_invitation_delivery_v1((select id from app_private.staff_invitation_delivery_outbox where invitation_id='b0040000-0000-0000-0000-000000000026'::uuid and event_kind='initial'),'delivered'),'inflight delivery can complete');

SELECT ok(not public.finish_staff_invitation_delivery_v1((select id from app_private.staff_invitation_delivery_outbox where invitation_id='b0040000-0000-0000-0000-000000000026'::uuid and event_kind='initial'),'delivered'),'second completion cannot replay');

SELECT ok(not public.has_unresolved_staff_invitation_delivery_v1('b0040000-0000-0000-0000-000000000026'::uuid),'delivered event is resolved');

UPDATE public.staff_invitations SET metadata=jsonb_set(metadata,'{resend_claim}','{"id":"qa-resend-event","expires_at":"2099-01-01T00:00:00Z"}'::jsonb,true) WHERE id='b0040000-0000-0000-0000-000000000026'::uuid;
SELECT is((select count(*) from app_private.staff_invitation_delivery_outbox where invitation_id='b0040000-0000-0000-0000-000000000026'::uuid and event_key='resend:qa-resend-event' and delivery_state='queued'),1::bigint,'resend reservation enqueues one event in same transaction');

UPDATE public.staff_invitations SET metadata=metadata WHERE id='b0040000-0000-0000-0000-000000000026'::uuid;
SELECT is((select count(*) from app_private.staff_invitation_delivery_outbox where invitation_id='b0040000-0000-0000-0000-000000000026'::uuid and event_kind='resend'),1::bigint,'repeating unchanged metadata cannot duplicate event');

SET LOCAL ROLE service_role;
SELECT is(public.claim_staff_invitation_delivery_v1('b0040000-0000-0000-0000-000000000026'::uuid,'resend:wrong'),null::uuid,'wrong event cannot claim');
SELECT ok(public.claim_staff_invitation_delivery_v1('b0040000-0000-0000-0000-000000000026'::uuid,'resend:qa-resend-event') is not null,'resend event claimed once');
RESET ROLE;

SELECT ok(public.finish_staff_invitation_delivery_v1((select id from app_private.staff_invitation_delivery_outbox where invitation_id='b0040000-0000-0000-0000-000000000026'::uuid and event_kind='resend'),'uncertain'),'uncertain provider outcome is persisted');

SELECT ok(public.has_unresolved_staff_invitation_delivery_v1('b0040000-0000-0000-0000-000000000026'::uuid),'uncertain outcome remains unresolved');

SELECT is(public.claim_staff_invitation_delivery_v1('b0040000-0000-0000-0000-000000000026'::uuid,'resend:qa-resend-event'),null::uuid,'uncertain event cannot auto-retry');

SELECT is((select count(*) from app_private.staff_invitation_delivery_outbox where invitation_id='b0040000-0000-0000-0000-000000000026'::uuid),2::bigint,'initial and resend events have independent identities');

SELECT ok(not has_function_privilege('anon','public.reconcile_staff_invitation_delivery_v1(uuid,text,text)','EXECUTE'),'anon cannot reconcile delivery');

SELECT ok(not has_function_privilege('authenticated','public.reconcile_staff_invitation_delivery_v1(uuid,text,text)','EXECUTE'),'authenticated cannot reconcile delivery');

SELECT ok(has_function_privilege('service_role','public.reconcile_staff_invitation_delivery_v1(uuid,text,text)','EXECUTE'),'service_role may reconcile delivery');

SELECT ok((select prosecdef and array_to_string(proconfig,',') like '%search_path=%' from pg_proc where oid=to_regprocedure('public.reconcile_staff_invitation_delivery_v1(uuid,text,text)')),'reconciliation uses fixed SECURITY DEFINER');

SELECT ok(not public.reconcile_staff_invitation_delivery_v1((select id from app_private.staff_invitation_delivery_outbox where invitation_id='b0040000-0000-0000-0000-000000000026'::uuid and event_kind='resend'),'delivered','short'),'evidence reference is mandatory');

SELECT ok(not public.reconcile_staff_invitation_delivery_v1((select id from app_private.staff_invitation_delivery_outbox where invitation_id='b0040000-0000-0000-0000-000000000026'::uuid and event_kind='resend'),'queued','qa-provider-verified'),'invalid outcome is rejected');

SELECT ok(not public.reconcile_staff_invitation_delivery_v1((select id from app_private.staff_invitation_delivery_outbox where invitation_id='b0040000-0000-0000-0000-000000000022'::uuid and event_kind='initial'),'delivered','qa-unsent-no-ack'),'a queued unsent event cannot be marked delivered');

SELECT ok(public.reconcile_staff_invitation_delivery_v1((select id from app_private.staff_invitation_delivery_outbox where invitation_id='b0040000-0000-0000-0000-000000000026'::uuid and event_kind='resend'),'delivered','qa-provider-verified'),'uncertain delivery may be reconciled with evidence');

SELECT ok(public.has_unresolved_staff_invitation_delivery_v1('b0040000-0000-0000-0000-000000000026'::uuid),'provider-confirmed resend cannot replay while invitation CAS is unfinished');
UPDATE public.staff_invitations
SET metadata = metadata - 'resend_claim'
WHERE id = 'b0040000-0000-0000-0000-000000000026'::uuid;
SELECT ok(not public.has_unresolved_staff_invitation_delivery_v1('b0040000-0000-0000-0000-000000000026'::uuid),'reconciled and finalized invitation permits lifecycle');

SELECT is((select reconciliation_reference from app_private.staff_invitation_delivery_outbox where id=(select id from app_private.staff_invitation_delivery_outbox where invitation_id='b0040000-0000-0000-0000-000000000026'::uuid and event_kind='resend')),'qa-provider-verified'::text,'manual evidence reference is retained');

SELECT ok(not public.reconcile_staff_invitation_delivery_v1((select id from app_private.staff_invitation_delivery_outbox where invitation_id='b0040000-0000-0000-0000-000000000026'::uuid and event_kind='resend'),'rejected','qa-repeat-should-fail'),'reconciliation is a single transition');

SELECT ok(public.reconcile_staff_invitation_delivery_v1((select id from app_private.staff_invitation_delivery_outbox where invitation_id='b0040000-0000-0000-0000-000000000022'::uuid and event_kind='initial'),'rejected','qa-unsent-not-delivered'),'a never-sent queued event can be rejected with evidence');

SELECT * FROM finish();
ROLLBACK;
