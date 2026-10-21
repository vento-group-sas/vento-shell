-- GAP-PKG-004 / AUTH-DB-002 / DATABASE_RPC_BOUNDARY
-- FOR GENERATED FORWARD MIGRATION: 20261012173553_gap_pkg_004_rpc_acl_hardening.sql
-- REVIEW CANDIDATE ONLY. Do not deploy until gate approval and STAGING smoke checks.
-- Purpose: block five privileged RPCs and atomically finalize invited staff employment under a service_role-only function.
-- Existing five RPC bodies remain unchanged. Adds one tightly restricted service-only invitation completion RPC; employee rows change only when explicitly invoked.
-- Also changes documents bucket visibility; ensure signed URL flow works for ANIMA/VISO.
-- WARNING: unindexed/external direct clients may depend on authenticated EXECUTE.
-- Require controlled STAGING tests of real consumers prior to any production rollout.
-- Prepared for the already generated VENTO Shell migration filename (not yet applied).
-- AUTH-CAT-003 VISO: register workforce.employees.view ONLY, with no automatic
-- employee/role grants and no staff.read or staff.manage authorization alias.

begin;
set local lock_timeout = '2s';
set local statement_timeout = '10s';

-- Deterministic preflight: exact identities, owners, and operational ACLs.
-- All five functions are SECURITY DEFINER owned by postgres in current STAGING.
do $gap_pkg_004_preflight$
declare
  v_valid integer;
begin
  with target(signature) as (
    values
    ('public.get_site_cost_center(uuid)'),
    ('public.resolve_internal_transfer_price(uuid,uuid,uuid,uuid,text,timestamp with time zone)'),
    ('public.resolve_internal_transfer_price_for_profile(uuid,uuid,uuid,uuid,uuid,text,timestamp with time zone)'),
    ('public.assert_inventory_uom_profile_stock_input(uuid,uuid,uuid,uuid,numeric,numeric)'),
    ('public.shared_device_actor_is_allowed_v1(uuid,uuid,uuid,uuid)')
  )
  select count(*) into v_valid
  from target t
  join pg_proc p on p.oid = to_regprocedure(t.signature)
  join pg_namespace n on n.oid = p.pronamespace
  where n.nspname = 'public'
    and pg_get_userbyid(p.proowner) = 'postgres'
    and p.prosecdef
    and has_function_privilege('anon', p.oid, 'EXECUTE')
    and has_function_privilege('authenticated', p.oid, 'EXECUTE')
    and has_function_privilege('service_role', p.oid, 'EXECUTE')
    and exists (
      select 1
      from aclexplode(coalesce(p.proacl, acldefault('f', p.proowner))) acl
      where acl.grantee = 0
        and acl.privilege_type = 'EXECUTE'
    );
  if v_valid <> 5 then
    raise exception 'GAP_PKG_004_RPC_ACL_PRECONDITION_FAILED: expected 5 exact public EXECUTE grants, found %', v_valid;
  end if;
end;
$gap_pkg_004_preflight$;

-- documents is used for private employee documents, not public catalog media.
-- Fail if the baseline differs rather than silently changing a different bucket.
do $gap_pkg_004_storage_preflight$
begin
  if not exists (
    select 1 from storage.buckets
    where id = 'documents' and public = true
  ) then
    raise exception 'GAP_PKG_004_DOCUMENTS_BUCKET_PRECONDITION_FAILED';
  end if;
end;
$gap_pkg_004_storage_preflight$;

revoke execute on function public.get_site_cost_center(uuid) from public, anon, authenticated;
revoke execute on function public.resolve_internal_transfer_price(uuid,uuid,uuid,uuid,text,timestamp with time zone) from public, anon, authenticated;
revoke execute on function public.resolve_internal_transfer_price_for_profile(uuid,uuid,uuid,uuid,uuid,text,timestamp with time zone) from public, anon, authenticated;
revoke execute on function public.assert_inventory_uom_profile_stock_input(uuid,uuid,uuid,uuid,numeric,numeric) from public, anon, authenticated;
revoke execute on function public.shared_device_actor_is_allowed_v1(uuid,uuid,uuid,uuid) from public, anon, authenticated;

-- Secure both anonymous and authenticated direct public access to documents.
-- Authenticated access is retained through Storage RLS and createSignedUrl.
update storage.buckets set public = false where id = 'documents' and public = true;

-- Postcondition: anon and generic authenticated blocked; service_role and postgres owner preserved.
do $gap_pkg_004_verify$
declare
  v_valid integer;
begin
  with target(signature) as (
    values
    ('public.get_site_cost_center(uuid)'),
    ('public.resolve_internal_transfer_price(uuid,uuid,uuid,uuid,text,timestamp with time zone)'),
    ('public.resolve_internal_transfer_price_for_profile(uuid,uuid,uuid,uuid,uuid,text,timestamp with time zone)'),
    ('public.assert_inventory_uom_profile_stock_input(uuid,uuid,uuid,uuid,numeric,numeric)'),
    ('public.shared_device_actor_is_allowed_v1(uuid,uuid,uuid,uuid)')
  )
  select count(*) into v_valid
  from target t
  join pg_proc p on p.oid = to_regprocedure(t.signature)
  where not has_function_privilege('anon', p.oid, 'EXECUTE')
    and not has_function_privilege('authenticated', p.oid, 'EXECUTE')
    and has_function_privilege('service_role', p.oid, 'EXECUTE')
    and not exists (
      select 1
      from aclexplode(coalesce(p.proacl, acldefault('f', p.proowner))) acl
      where acl.grantee = 0
        and acl.privilege_type = 'EXECUTE'
    );
  if v_valid <> 5 then
    raise exception 'GAP_PKG_004_RPC_ACL_POSTCONDITION_FAILED: expected 5 secured RPCs, found %', v_valid;
  end if;
end;
$gap_pkg_004_verify$;

do $gap_pkg_004_storage_verify$
begin
  if not exists (select 1 from storage.buckets where id = 'documents' and public = false) then
    raise exception 'GAP_PKG_004_DOCUMENTS_BUCKET_POSTCONDITION_FAILED';
  end if;
end;
$gap_pkg_004_storage_verify$;


-- GAP-PKG-004 / INVITATION_COMPLETION
-- Only service_role can finalize employment. A row lock serializes acceptance
-- with cancellation/resend; all employment writes and the terminal state commit
-- atomically in a single PostgreSQL transaction.
-- Auth admin password updates remain outside PostgreSQL: an Auth-only success
-- never grants staff permissions; retry is safe while invitation is still sent.
-- service_role already owns the required business table privileges and BYPASSRLS,
-- but needs narrow read-only access to three private Auth identity fields.
-- Keep this routine SECURITY INVOKER so the historical privileged-function
-- inventory is not expanded. Never grant these columns to client roles.
grant select (id, email, email_confirmed_at) on table auth.users to service_role;

create or replace function public.complete_staff_invitation_v1(
  p_invitation_id uuid,
  p_auth_user_id uuid,
  p_email text,
  p_full_name text,
  p_alias text,
  p_completion_status text
)
returns boolean
language plpgsql
security invoker
set search_path = ''
as $gap_pkg_004_complete$
declare
  v_inv public.staff_invitations%rowtype;
  v_role text;
  v_site uuid;
  v_at timestamptz := statement_timestamp();
  v_joined_at timestamptz;
begin
  if p_invitation_id is null
    or p_auth_user_id is null
    or nullif(btrim(p_email), '') is null
    or nullif(btrim(p_full_name), '') is null
    or p_completion_status is null
    or p_completion_status not in ('accepted', 'linked_existing_user')
  then
    return false;
  end if;

  select * into v_inv
    from public.staff_invitations
    where id = p_invitation_id
    for update;

  if not found
    or v_inv.status <> 'sent'
    or v_inv.auth_user_id is distinct from p_auth_user_id
    or v_inv.expires_at is null
    or v_inv.expires_at <= v_at
    or lower(btrim(coalesce(v_inv.email, ''))) <> lower(btrim(p_email))
  then
    return false;
  end if;

  -- Reject stale/wrong account identities. Never authorize through user_metadata.
  if not exists (
    select 1 from auth.users u
    where u.id = p_auth_user_id
      and u.email_confirmed_at is not null
      and lower(btrim(u.email)) = lower(btrim(p_email))
  ) then
    return false;
  end if;

  v_role := nullif(btrim(coalesce(v_inv.role_code, v_inv.staff_role)), '');
  v_site := coalesce(v_inv.site_id, v_inv.staff_site_id);
  if v_role is null or v_site is null
    or (v_inv.role_code is not null and v_inv.staff_role is not null
        and v_inv.role_code <> v_inv.staff_role)
    or (v_inv.site_id is not null and v_inv.staff_site_id is not null
        and v_inv.site_id <> v_inv.staff_site_id)
    or not exists (select 1 from public.roles r
                   where r.code = v_role and r.is_active is true)
    or not exists (select 1 from public.sites s
                   where s.id = v_site and s.is_active is true
                     and s.operational_visibility = 'operational')
  then
    return false;
  end if;

  select e.joined_at into v_joined_at
    from public.employees e where e.id = p_auth_user_id;

  -- Triggers synchronizing site assignments run inside this same transaction.
  insert into public.employees (
    id, full_name, alias, role, site_id, is_active, joined_at, updated_at
  ) values (
    p_auth_user_id, btrim(p_full_name), nullif(btrim(coalesce(p_alias, '')), ''),
    v_role, v_site, true, coalesce(v_joined_at, v_at), v_at
  )
  on conflict (id) do update
    set full_name = excluded.full_name,
        alias = coalesce(excluded.alias, public.employees.alias),
        role = excluded.role,
        site_id = excluded.site_id,
        is_active = true,
        joined_at = coalesce(public.employees.joined_at, excluded.joined_at),
        updated_at = excluded.updated_at;

  update public.employee_sites es
    set is_primary = false
    where es.employee_id = p_auth_user_id
      and es.site_id <> v_site
      and es.is_primary is true;

  insert into public.employee_sites (
    employee_id, site_id, is_primary, is_active
  ) values (p_auth_user_id, v_site, true, true)
  on conflict (employee_id, site_id) do update
    set is_primary = true, is_active = true;

  update public.staff_invitations
    set status = p_completion_status,
        employee_id = p_auth_user_id,
        accepted_at = case when p_completion_status = 'accepted' then v_at else null end,
        updated_at = v_at
    where id = p_invitation_id
      and status = 'sent';
  if not found then
    raise exception 'GAP_PKG_004_INVITATION_COMPLETION_RACE';
  end if;

  return true;
end;
$gap_pkg_004_complete$;

revoke execute on function public.complete_staff_invitation_v1(uuid,uuid,text,text,text,text)
  from public, anon, authenticated;
grant execute on function public.complete_staff_invitation_v1(uuid,uuid,text,text,text,text)
  to service_role;

-- Forward-only AUTH-DB-002 RLS correction for employee documents.
-- The historic document policies resolve target-site membership through
-- public.employee_sites, but a scoped document operator cannot read that
-- relation under the existing authenticated RLS. No SECURITY DEFINER helper
-- or anonymous privileges are introduced. This permits only active site
-- memberships at a site where the actor has anima.documents.upload or
-- viso.staff.documents.manage. No blanket visibility is granted.
do $gap_pkg_004_employee_sites_preflight$
begin
  if not exists (
    select 1 from pg_catalog.pg_class c
    join pg_catalog.pg_namespace n on n.oid = c.relnamespace
    where n.nspname = 'public'
      and c.relname = 'employee_sites'
      and c.relrowsecurity is true
  ) then
    raise exception 'GAP_PKG_004_EMPLOYEE_SITES_RLS_PRECONDITION_FAILED';
  end if;

  if exists (
    select 1 from pg_catalog.pg_policies
    where schemaname = 'public'
      and tablename = 'employee_sites'
      and policyname = 'gap_pkg_004_employee_sites_documents_site_scope'
  ) then
    raise exception 'GAP_PKG_004_EMPLOYEE_SITES_POLICY_ALREADY_EXISTS';
  end if;
end;
$gap_pkg_004_employee_sites_preflight$;

create policy gap_pkg_004_employee_sites_documents_site_scope
  on public.employee_sites
  as permissive
  for select
  to authenticated
  using (
    is_active is true
    and (
      public.has_permission('anima.documents.upload', site_id)
      or public.has_permission('viso.staff.documents.manage', site_id)
    )
  );

do $gap_pkg_004_employee_sites_postflight$
begin
  if not exists (
    select 1 from pg_catalog.pg_policies
    where schemaname = 'public'
      and tablename = 'employee_sites'
      and policyname = 'gap_pkg_004_employee_sites_documents_site_scope'
      and permissive = 'PERMISSIVE'
      and cmd = 'SELECT'
      and roles = array['authenticated']::name[]
      and qual ilike '%is_active%'
      and qual like '%anima.documents.upload%'
      and qual like '%viso.staff.documents.manage%'
      and qual like '%site_id%'
  ) then
    raise exception 'GAP_PKG_004_EMPLOYEE_SITES_POLICY_POSTCONDITION_FAILED';
  end if;
end;
$gap_pkg_004_employee_sites_postflight$;

-- AUTH-DB-002 historical SELECT policies mistakenly treated a VISO
-- site-scoped staff.documents.manage grant as a global document grant.
-- Preserve the original self and ANIMA view_all branches, but resolve both
-- delegated upload and VISO manage access against the TARGET employee's
-- active site membership and the actor's explicit grant at that same site.
-- When documents.site_id is populated, it must also match the granted site;
-- null-site historical employee documents retain their original semantics.
-- Patch policies in this forward migration; never edit historical SQL.
do $gap_pkg_004_document_scope_preflight$
begin
  if not exists (
    select 1 from pg_catalog.pg_policies
    where schemaname = 'public'
      and tablename = 'documents'
      and policyname = 'documents_select_self_or_permission'
      and cmd = 'SELECT'
      and roles = array['authenticated']::name[]
      and qual like '%viso.staff.documents.manage%'
  ) or not exists (
    select 1 from pg_catalog.pg_policies
    where schemaname = 'storage'
      and tablename = 'objects'
      and policyname = 'documents_select_visible'
      and cmd = 'SELECT'
      and roles = array['authenticated']::name[]
      and qual like '%viso.staff.documents.manage%'
  ) then
    raise exception 'GAP_PKG_004_DOCUMENT_SCOPE_BASELINE_PRECONDITION_FAILED';
  end if;
end;
$gap_pkg_004_document_scope_preflight$;

alter policy documents_select_self_or_permission
  on public.documents
  to authenticated
  using (
    owner_employee_id = auth.uid()
    or target_employee_id = auth.uid()
    or public.has_permission('anima.documents.view_all')
    or exists (
      select 1
      from public.employee_sites target_site
      where target_site.employee_id = documents.target_employee_id
        and target_site.is_active is true
        and (documents.site_id is null or documents.site_id = target_site.site_id)
        and (
          public.has_permission('anima.documents.upload', target_site.site_id)
          or public.has_permission('viso.staff.documents.manage', target_site.site_id)
        )
    )
  );

alter policy documents_select_visible
  on storage.objects
  to authenticated
  using (
    bucket_id = 'documents'
    and exists (
      select 1
      from public.documents d
      where d.storage_path = objects.name
        and (
          d.owner_employee_id = auth.uid()
          or d.target_employee_id = auth.uid()
          or public.has_permission('anima.documents.view_all')
          or exists (
            select 1
            from public.employee_sites target_site
            where target_site.employee_id = d.target_employee_id
              and target_site.is_active is true
              and (d.site_id is null or d.site_id = target_site.site_id)
              and (
                public.has_permission('anima.documents.upload', target_site.site_id)
                or public.has_permission('viso.staff.documents.manage', target_site.site_id)
              )
          )
        )
    )
  );

do $gap_pkg_004_document_scope_postflight$
begin
  if not exists (
    select 1 from pg_catalog.pg_policies
    where schemaname = 'public'
      and tablename = 'documents'
      and policyname = 'documents_select_self_or_permission'
      and cmd = 'SELECT'
      and roles = array['authenticated']::name[]
      and qual like '%anima.documents.view_all%'
      and qual like '%anima.documents.upload%'
      and qual like '%viso.staff.documents.manage%'
      and qual like '%target_site.site_id%'
  ) or not exists (
    select 1 from pg_catalog.pg_policies
    where schemaname = 'storage'
      and tablename = 'objects'
      and policyname = 'documents_select_visible'
      and cmd = 'SELECT'
      and roles = array['authenticated']::name[]
      and qual like '%anima.documents.view_all%'
      and qual like '%anima.documents.upload%'
      and qual like '%viso.staff.documents.manage%'
      and qual like '%target_site.site_id%'
  ) then
    raise exception 'GAP_PKG_004_DOCUMENT_SCOPE_POSTCONDITION_FAILED';
  end if;
end;
$gap_pkg_004_document_scope_postflight$;

-- AUTH-CAT-003 RENAME viso.staff.read -> viso.workforce.employees.view.
-- Physical LOCAL/STAGING preflight is fail-closed. Do not fabricate the
-- historical legacy grant, grant to staff.manage, or create a parallel alias.
-- Permission codes are stored relative to their app (without "viso.").
DO $gap_pkg_004_viso_workforce_catalog$
DECLARE
  v_app_id uuid;
  v_permission_id uuid;
BEGIN
  SELECT id INTO v_app_id FROM public.apps WHERE code = 'viso';
  IF v_app_id IS NULL THEN
    RAISE EXCEPTION 'GAP004_VISO_APP_MISSING';
  END IF;

  -- An existing legacy/canonical row requires a separate, evidence-backed
  -- reconciliation of scopes and grants, never an automatic overwrite.
  IF EXISTS (
    SELECT 1 FROM public.app_permissions
    WHERE app_id = v_app_id
      AND code IN ('staff.read', 'workforce.employees.view')
  ) THEN
    RAISE EXCEPTION 'GAP004_VISO_STAFF_READ_CATALOG_DRIFT';
  END IF;

  INSERT INTO public.app_permissions (
    app_id, code, name, description,
    human_label, human_description, human_group,
    is_active, permission_audience, is_operational,
    requires_active_work_context
  ) VALUES (
    v_app_id,
    'workforce.employees.view',
    'Consultar trabajadores',
    'Permite consultar trabajadores y su información laboral general.',
    'Consultar trabajadores',
    'Permite consultar trabajadores y su información laboral general.',
    'Personal',
    true, 'administrative', false, false
  )
  RETURNING id INTO v_permission_id;

  -- Registration must not generate authority for any real actor or role.
  IF v_permission_id IS NULL
     OR EXISTS (
       SELECT 1 FROM public.employee_permissions
       WHERE permission_id = v_permission_id
     )
     OR EXISTS (
       SELECT 1 FROM public.role_permissions
       WHERE permission_id = v_permission_id
     )
     OR EXISTS (
       SELECT 1 FROM public.app_permissions
       WHERE app_id = v_app_id AND code = 'staff.read'
     )
  THEN
    RAISE EXCEPTION 'GAP004_VISO_STAFF_READ_GRANT_OR_ALIAS_DRIFT';
  END IF;
END;
$gap_pkg_004_viso_workforce_catalog$;

-- GAP-PKG-004 / administrative views: execute with the caller's privileges,
-- preserving the established grants and each base table's RLS.  This
-- preflight protects against changing a drifted or differently owned view.
do $gap004_admin_views_preflight$
declare
  v_matching integer;
begin
  select count(*) into v_matching
  from pg_catalog.pg_class c
  join pg_catalog.pg_namespace n on n.oid = c.relnamespace
  where n.nspname = 'public' and c.relkind = 'v'
    and c.relname in (
      'permission_catalog_human_v1',
      'shared_operational_device_actor_policies_admin_v1',
      'shared_operational_device_templates_admin_v1',
      'shared_operational_devices_admin_v1'
    )
    and pg_catalog.pg_get_userbyid(c.relowner) = 'postgres'
    and not ('security_invoker=true' = any(coalesce(c.reloptions, array[]::text[])))
    and has_table_privilege('authenticated', c.oid, 'SELECT')
    and not has_table_privilege('anon', c.oid, 'SELECT')
    and has_table_privilege('service_role', c.oid, 'SELECT');
  if v_matching <> 4 then
    raise exception 'GAP004_ADMIN_VIEWS_BASELINE_DRIFT: found %, expected 4', v_matching;
  end if;
end;
$gap004_admin_views_preflight$;

alter view public.permission_catalog_human_v1 set (security_invoker = true);
alter view public.shared_operational_device_actor_policies_admin_v1 set (security_invoker = true);
alter view public.shared_operational_device_templates_admin_v1 set (security_invoker = true);
alter view public.shared_operational_devices_admin_v1 set (security_invoker = true);

-- H-CODE-017-009: the only indexed authenticated template-admin consumer
-- is VISO /staff/shared-devices/new; its SSR guard requires staff.manage.
-- Do not revoke its view grant or rewrite the view; restrict all three
-- underlying catalog relations so direct base-table queries cannot bypass
-- the same DB authorization boundary. Existing PERMISSIVE policies stay.
-- Templates are global (no site_id): any legitimate manager with an
-- effective staff.manage grant at an active site or globally can read them.
-- service_role and postgres retain their established RLS-bypass behavior.
do $gap004_template_rls_preflight$
declare
  v_existing integer;
begin
  select count(*) into v_existing
  from pg_catalog.pg_policies p
  join pg_catalog.pg_class c
    on c.relname = p.tablename
  join pg_catalog.pg_namespace n
    on n.oid = c.relnamespace and n.nspname = p.schemaname
  where p.schemaname = 'public'
    and c.relrowsecurity
    and p.permissive = 'PERMISSIVE'
    and p.cmd = 'SELECT'
    and p.roles = array['authenticated']::name[]
    and (p.tablename, p.policyname) in (
      ('shared_operational_device_templates',
       'shared_device_templates_select_authenticated'),
      ('shared_operational_device_template_apps',
       'shared_device_template_apps_select_authenticated'),
      ('shared_operational_device_template_actor_policies',
       'shared_device_template_actor_policies_select_authenticated')
    );
  if v_existing <> 3 then
    raise exception 'GAP004_TEMPLATE_RLS_BASELINE_DRIFT: %, expected 3',
      v_existing;
  end if;
end;
$gap004_template_rls_preflight$;

create policy gap_pkg_004_templates_manage_read
on public.shared_operational_device_templates
as restrictive for select to authenticated
using (public.has_permission('viso.staff.manage', null::uuid));

create policy gap_pkg_004_template_apps_manage_read
on public.shared_operational_device_template_apps
as restrictive for select to authenticated
using (public.has_permission('viso.staff.manage', null::uuid));

create policy gap_pkg_004_template_actor_policies_manage_read
on public.shared_operational_device_template_actor_policies
as restrictive for select to authenticated
using (public.has_permission('viso.staff.manage', null::uuid));

do $gap004_template_rls_postflight$
declare
  v_secured integer;
begin
  select count(*) into v_secured
  from pg_catalog.pg_policies
  where schemaname = 'public'
    and permissive = 'RESTRICTIVE'
    and cmd = 'SELECT'
    and roles = array['authenticated']::name[]
    and qual like '%viso.staff.manage%'
    and (tablename, policyname) in (
      ('shared_operational_device_templates', 'gap_pkg_004_templates_manage_read'),
      ('shared_operational_device_template_apps', 'gap_pkg_004_template_apps_manage_read'),
      ('shared_operational_device_template_actor_policies',
       'gap_pkg_004_template_actor_policies_manage_read')
    );
  if v_secured <> 3 then
    raise exception 'GAP004_TEMPLATE_RLS_POSTCONDITION_FAILED: %, expected 3',
      v_secured;
  end if;
end;
$gap004_template_rls_postflight$;

do $gap004_admin_views_postflight$
declare
  v_secured integer;
begin
  select count(*) into v_secured
  from pg_catalog.pg_class c
  join pg_catalog.pg_namespace n on n.oid = c.relnamespace
  where n.nspname = 'public' and c.relkind = 'v'
    and c.relname in (
      'permission_catalog_human_v1',
      'shared_operational_device_actor_policies_admin_v1',
      'shared_operational_device_templates_admin_v1',
      'shared_operational_devices_admin_v1'
    )
    and 'security_invoker=true' = any(coalesce(c.reloptions, array[]::text[]))
    and has_table_privilege('authenticated', c.oid, 'SELECT')
    and not has_table_privilege('anon', c.oid, 'SELECT')
    and has_table_privilege('service_role', c.oid, 'SELECT');
  if v_secured <> 4 then
    raise exception 'GAP004_ADMIN_VIEWS_POSTCONDITION_FAILED: found %, expected 4', v_secured;
  end if;
end;
$gap004_admin_views_postflight$;

-- GAP-PKG-004 / invitation delivery outbox (service-only, transactionally
-- written from the invitation row). This records event identity and delivery
-- disposition only: never invitation links, hashed tokens, or mail credentials.
create table app_private.staff_invitation_delivery_outbox (
  id uuid primary key default gen_random_uuid(),
  invitation_id uuid not null references public.staff_invitations(id) on delete restrict,
  event_key text not null,
  event_kind text not null check (event_kind in ('initial', 'resend')),
  delivery_state text not null default 'queued'
    check (delivery_state in ('queued', 'in_flight', 'delivered', 'rejected', 'uncertain')),
  claimed_at timestamptz,
  completed_at timestamptz,
  provider_message_id text,
  reconciliation_reference text,
  reconciled_at timestamptz,
  created_at timestamptz not null default now(),
  unique (invitation_id, event_key),
  check (length(event_key) between 8 and 120)
);
alter table app_private.staff_invitation_delivery_outbox enable row level security;
revoke all on app_private.staff_invitation_delivery_outbox
  from public, anon, authenticated;
-- No direct table privileges: service_role reaches the outbox solely
-- through the narrowly granted RPCs below.

create or replace function app_private.enqueue_staff_invitation_delivery_v1()
returns trigger language plpgsql security definer set search_path = ''
as $gap004_invite_enqueue$
declare
  v_event_key text;
  v_event_kind text;
begin
  if new.source_app <> 'anima' or new.auth_user_id is null then
    return new;
  end if;
  if tg_op = 'INSERT' then
    if new.status <> 'sent'
       or coalesce(new.metadata ->> 'existing_user_flow', 'false') = 'true' then
      return new;
    end if;
    v_event_key := 'initial:' || new.id::text;
    v_event_kind := 'initial';
  elsif tg_op = 'UPDATE' then
    if new.status not in ('sent','failed')
       or new.metadata #>> '{resend_claim,id}' is null
       or (new.metadata #>> '{resend_claim,id}')
          is not distinct from (old.metadata #>> '{resend_claim,id}') then
      return new;
    end if;
    v_event_key := 'resend:' || (new.metadata #>> '{resend_claim,id}');
    v_event_kind := 'resend';
  else
    return new;
  end if;
  insert into app_private.staff_invitation_delivery_outbox
    (invitation_id, event_key, event_kind)
  values (new.id, v_event_key, v_event_kind)
  on conflict (invitation_id, event_key) do nothing;
  return new;
end;
$gap004_invite_enqueue$;
revoke all on function app_private.enqueue_staff_invitation_delivery_v1()
  from public, anon, authenticated;
create trigger gap004_staff_invitation_delivery_outbox
after insert or update on public.staff_invitations
for each row execute function app_private.enqueue_staff_invitation_delivery_v1();

-- Only service_role can reserve one exact durable event before contacting
-- Resend. Claims have no automatic timeout-based replay: a lost provider ack
-- must be manually reconciled to avoid duplicate mail delivery.
create or replace function public.claim_staff_invitation_delivery_v1(
  p_invitation_id uuid, p_event_key text
) returns uuid language plpgsql security definer set search_path = ''
as $gap004_invite_claim$
declare
  v_delivery uuid;
begin
  if p_invitation_id is null or p_event_key is null then
    return null;
  end if;
  update app_private.staff_invitation_delivery_outbox o
  set delivery_state = 'in_flight', claimed_at = now()
  from public.staff_invitations i
  where o.invitation_id = p_invitation_id and i.id = o.invitation_id
    and o.event_key = p_event_key and o.delivery_state = 'queued'
    and (
      (o.event_kind = 'initial' and i.status = 'sent')
      or
      (o.event_kind = 'resend' and i.status in ('sent','failed')
       and o.event_key = 'resend:' || (i.metadata #>> '{resend_claim,id}'))
    )
  returning o.id into v_delivery;
  return v_delivery;
end;
$gap004_invite_claim$;

create or replace function public.finish_staff_invitation_delivery_v1(
  p_delivery_id uuid, p_delivery_state text, p_provider_message_id text default null
) returns boolean language plpgsql security definer set search_path = ''
as $gap004_invite_finish$
begin
  if p_delivery_id is null
     or p_delivery_state not in ('delivered','rejected','uncertain') then
    return false;
  end if;
  update app_private.staff_invitation_delivery_outbox
  set delivery_state = p_delivery_state,
      completed_at = now(),
      provider_message_id = nullif(p_provider_message_id,'')
  where id = p_delivery_id and delivery_state = 'in_flight';
  return found;
end;
$gap004_invite_finish$;

create or replace function public.has_unresolved_staff_invitation_delivery_v1(
  p_invitation_id uuid
) returns boolean language sql stable security definer set search_path = ''
as $gap004_invite_unresolved$
  select exists (
    select 1
    from app_private.staff_invitation_delivery_outbox o
    join public.staff_invitations i on i.id = o.invitation_id
    where o.invitation_id = p_invitation_id
      and (
        o.delivery_state in ('queued','in_flight','uncertain')
        -- The provider confirmed delivery, but the invitation CAS has not
        -- yet cleared its reservation. Do not reissue a second Auth link
        -- after the TTL expires; reconcile the failed finalization.
        or (o.event_kind = 'resend'
            and o.delivery_state = 'delivered'
            and o.event_key = 'resend:' ||
              coalesce(i.metadata #>> '{resend_claim,id}', ''))
      )
  );
$gap004_invite_unresolved$;

-- Manual-only reconciliation is permitted with a non-secret evidence
-- reference. It NEVER sends or retries mail and cannot clear a live claim.
create or replace function public.reconcile_staff_invitation_delivery_v1(
  p_delivery_id uuid, p_delivery_state text, p_evidence_ref text
) returns boolean language plpgsql security definer set search_path = ''
as $gap004_invite_reconcile$
begin
  if p_delivery_id is null
     or p_delivery_state not in ('delivered','rejected')
     or length(btrim(coalesce(p_evidence_ref,''))) not between 12 and 256 then
    return false;
  end if;
  update app_private.staff_invitation_delivery_outbox
  set delivery_state = p_delivery_state,
      reconciliation_reference = btrim(p_evidence_ref),
      reconciled_at = now(),
      completed_at = now()
  where id = p_delivery_id
    and (
      delivery_state = 'uncertain'
      or (delivery_state = 'in_flight'
          and claimed_at < now() - interval '5 minutes')
      or (delivery_state = 'queued' and p_delivery_state = 'rejected')
    );
  return found;
end;
$gap004_invite_reconcile$;

revoke all on function public.reconcile_staff_invitation_delivery_v1(uuid,text,text)
  from public, anon, authenticated;
grant execute on function public.reconcile_staff_invitation_delivery_v1(uuid,text,text)
  to service_role;

revoke all on function public.claim_staff_invitation_delivery_v1(uuid,text)
  from public, anon, authenticated;
revoke all on function public.finish_staff_invitation_delivery_v1(uuid,text,text)
  from public, anon, authenticated;
revoke all on function public.has_unresolved_staff_invitation_delivery_v1(uuid)
  from public, anon, authenticated;
grant execute on function public.claim_staff_invitation_delivery_v1(uuid,text)
  to service_role;
grant execute on function public.finish_staff_invitation_delivery_v1(uuid,text,text)
  to service_role;
grant execute on function public.has_unresolved_staff_invitation_delivery_v1(uuid)
  to service_role;

-- A service-only RPC must not become callable via default PUBLIC grants.
do $gap_pkg_004_completion_grants$
begin
  if has_function_privilege(
       'anon', 'public.complete_staff_invitation_v1(uuid,uuid,text,text,text,text)', 'EXECUTE')
    or has_function_privilege(
       'authenticated', 'public.complete_staff_invitation_v1(uuid,uuid,text,text,text,text)', 'EXECUTE')
    or not has_function_privilege(
       'service_role', 'public.complete_staff_invitation_v1(uuid,uuid,text,text,text,text)', 'EXECUTE')
  then
    raise exception 'GAP_PKG_004_INVITATION_COMPLETION_ACL_INVALID';
  end if;
end;
$gap_pkg_004_completion_grants$;

commit;
