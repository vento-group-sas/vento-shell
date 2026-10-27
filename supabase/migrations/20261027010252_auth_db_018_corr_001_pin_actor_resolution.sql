-- AUTH-DB-018::CORR-001: shared device PIN actor identity (additive correction).
-- Source: read-only introspection of STAGING public.sign_shared_device_action.
-- The existing function signature, owner, grants, audit and caller policies
-- are preserved. Only two uses of the wrong NULL parameter are corrected.
-- WARNING: Postgres QA must match the STAGING function fingerprint before
-- applying this candidate. Do not apply directly to STAGING or production.
begin;

do $auth_db_018_preflight$
declare
  v_def text;
begin
  select pg_catalog.pg_get_functiondef(p.oid) into v_def
  from pg_catalog.pg_proc p
  join pg_catalog.pg_namespace n on n.oid = p.pronamespace
  where n.nspname = 'public'
    and p.proname = 'sign_shared_device_action'
    and pg_catalog.pg_get_function_identity_arguments(p.oid) like 'p_actor_employee_id uuid%';

  if v_def is null or pg_catalog.md5(v_def) <>
    '6dd2f8b5d93d303da5a7d48f22b889ad' then
    raise exception 'AUTH_DB_018_PIN_SOURCE_STAGING_MISMATCH'
      using errcode = '55000';
  end if;
end;
$auth_db_018_preflight$;

CREATE OR REPLACE FUNCTION public.sign_shared_device_action(p_actor_employee_id uuid, p_actor_pin text DEFAULT NULL::text, p_app_code text DEFAULT 'nexo'::text, p_action_code text DEFAULT NULL::text, p_target_table text DEFAULT NULL::text, p_target_id uuid DEFAULT NULL::uuid, p_signature_method text DEFAULT 'pin'::text, p_ttl_seconds integer DEFAULT 300, p_metadata jsonb DEFAULT '{}'::jsonb)
 RETURNS TABLE(signature_id uuid, actor_employee_id uuid, actor_shift_id uuid, expires_at timestamp with time zone)
 LANGUAGE plpgsql
 SECURITY DEFINER
 SET search_path TO 'public', 'auth'
AS $function$
declare
  v_device public.shared_operational_devices%rowtype;
  v_actor public.employees%rowtype;
  v_shift_id uuid;
  v_actor_site_id uuid;
  v_actor_area_id uuid;
  v_action_code text := nullif(btrim(coalesce(p_action_code, '')), '');
  v_app_code text := nullif(btrim(coalesce(p_app_code, '')), '');
  v_method text := lower(nullif(btrim(coalesce(p_signature_method, '')), ''));
  v_expires_at timestamptz;
  v_signature_id uuid;
begin
  if auth.uid() is null then
    raise exception 'AUTH_REQUIRED' using errcode = '28000';
  end if;

  if v_action_code is null then
    raise exception 'ACTION_CODE_REQUIRED' using errcode = '22023';
  end if;

  if v_app_code is null then
    raise exception 'APP_CODE_REQUIRED' using errcode = '22023';
  end if;

  if v_method is null then
    v_method := 'pin';
  end if;

  if v_method not in ('pin', 'qr', 'nfc', 'manual_override', 'session_reuse') then
    raise exception 'INVALID_SIGNATURE_METHOD' using errcode = '22023';
  end if;

  select * into v_device
  from public.shared_operational_devices d
  where d.auth_user_id = auth.uid()
    and d.is_active
    and d.activation_status = 'active'
  limit 1;

  if v_device.id is null then
    raise exception 'ACTIVE_SHARED_DEVICE_REQUIRED' using errcode = '28000';
  end if;

  if not exists (
    select 1
    from public.shared_operational_device_apps da
    where da.device_id = v_device.id
      and da.app_code = v_app_code
      and da.is_active
  ) then
    raise exception 'APP_NOT_ALLOWED_FOR_DEVICE' using errcode = '42501';
  end if;

  if p_actor_employee_id is null then
    if nullif(btrim(coalesce(p_actor_pin, '')), '') is null then
      raise exception 'ACTOR_PIN_REQUIRED' using errcode = '22023';
    end if;

    with candidates as (
      select e.*
      from public.employees e
      where e.is_active is true
        and coalesce(e.pin_code, '') = btrim(p_actor_pin)
        and public.shared_device_actor_is_allowed_v1(
          v_device.id,
          e.id,
          case when v_device.requires_active_actor_shift then v_device.site_id else null end,
          null
        )
    )
    select * into v_actor
    from candidates
    limit 1;

    if v_actor.id is null then
      raise exception 'ACTIVE_ACTOR_REQUIRED' using errcode = '28000';
    end if;

    if (
      select count(*)
      from public.employees e
      where e.is_active is true
        and coalesce(e.pin_code, '') = btrim(p_actor_pin)
        and public.shared_device_actor_is_allowed_v1(
          v_device.id,
          e.id,
          case when v_device.requires_active_actor_shift then v_device.site_id else null end,
          null
        )
    ) > 1 then
      raise exception 'AMBIGUOUS_ACTOR_PIN' using errcode = '21000';
    end if;
  else
    select * into v_actor
    from public.employees e
    where e.id = p_actor_employee_id
      and e.is_active is true
    limit 1;

    if v_actor.id is null then
      raise exception 'ACTIVE_ACTOR_REQUIRED' using errcode = '28000';
    end if;
  end if;

  if v_device.requires_actor_pin and not v_device.allow_actor_without_pin then
    if v_method <> 'pin' then
      raise exception 'PIN_SIGNATURE_REQUIRED' using errcode = '42501';
    end if;

    if nullif(btrim(coalesce(p_actor_pin, '')), '') is null then
      raise exception 'ACTOR_PIN_REQUIRED' using errcode = '22023';
    end if;

    if coalesce(v_actor.pin_code, '') <> btrim(p_actor_pin) then
      raise exception 'INVALID_ACTOR_PIN' using errcode = '28000';
    end if;
  end if;

  select s.actor_shift_id, s.active_site_id, s.active_area_id
  into v_shift_id, v_actor_site_id, v_actor_area_id
  from public.current_actor_shift_for_shared_device_v1(
    v_actor.id,
    case when v_device.requires_active_actor_shift then v_device.site_id else null end,
    null
  ) s
  limit 1;

  if v_device.requires_active_actor_shift and v_shift_id is null then
    raise exception 'ACTIVE_ACTOR_SHIFT_REQUIRED' using errcode = '42501';
  end if;

  if not public.shared_device_actor_is_allowed_v1(
    v_device.id,
    v_actor.id,
    case when v_device.requires_active_actor_shift then v_device.site_id else null end,
    null
  ) then
    raise exception 'ACTOR_NOT_ALLOWED_FOR_DEVICE' using errcode = '42501';
  end if;

  if p_ttl_seconds is null or p_ttl_seconds <= 0 then
    v_expires_at := now();
  else
    v_expires_at := now() + make_interval(secs => least(p_ttl_seconds, 3600));
  end if;

  insert into public.shared_device_actor_signatures (
    shared_device_id,
    auth_user_id,
    actor_employee_id,
    actor_shift_id,
    site_id,
    area_id,
    app_code,
    action_code,
    target_table,
    target_id,
    signature_method,
    signed_at,
    expires_at,
    metadata
  ) values (
    v_device.id,
    auth.uid(),
    v_actor.id,
    v_shift_id,
    coalesce(v_actor_site_id, v_device.site_id),
    coalesce(v_actor_area_id, v_device.area_id),
    v_app_code,
    v_action_code,
    nullif(btrim(coalesce(p_target_table, '')), ''),
    p_target_id,
    v_method,
    now(),
    v_expires_at,
    coalesce(p_metadata, '{}'::jsonb) || jsonb_build_object(
      'device_code', v_device.code,
      'device_label', v_device.label,
      'actor_role', v_actor.role
    )
  )
  returning id into v_signature_id;

  insert into public.shared_operational_device_events (
    device_id,
    session_user_id,
    actor_employee_id,
    actor_shift_id,
    app_code,
    site_id,
    area_id,
    event_type,
    event_payload,
    source
  ) values (
    v_device.id,
    auth.uid(),
    v_actor.id,
    v_shift_id,
    v_app_code,
    coalesce(v_actor_site_id, v_device.site_id),
    coalesce(v_actor_area_id, v_device.area_id),
    'actor_signature_created',
    jsonb_build_object(
      'signature_id', v_signature_id,
      'action_code', v_action_code,
      'target_table', p_target_table,
      'target_id', p_target_id,
      'signature_method', v_method,
      'expires_at', v_expires_at
    ),
    'shared_device'
  );

  return query select v_signature_id, v_actor.id, v_shift_id, v_expires_at;
end;
$function$
;

do $auth_db_018_postconditions$
declare
  v_oid oid;
  v_def text;
begin
  select p.oid,pg_catalog.pg_get_functiondef(p.oid) into v_oid,v_def
    from pg_catalog.pg_proc p
    join pg_catalog.pg_namespace n on n.oid=p.pronamespace
    where n.nspname='public' and p.proname='sign_shared_device_action'
      and pg_catalog.pg_get_function_identity_arguments(p.oid) like 'p_actor_employee_id uuid%';

  if v_oid is null
     or pg_catalog.strpos(v_def,
       E'current_actor_shift_for_shared_device_v1(\\n    v_actor.id,')=0
     or pg_catalog.strpos(v_def,
       E'v_device.id,\\n    v_actor.id,')=0
     or not (select p.prosecdef from pg_catalog.pg_proc p where p.oid=v_oid)
     or not pg_catalog.has_function_privilege('authenticated',v_oid,'EXECUTE')
     or pg_catalog.has_function_privilege('anon',v_oid,'EXECUTE') then
    raise exception 'AUTH_DB_018_PIN_POSTCONDITION_FAILED'
      using errcode='55000';
  end if;
end;
$auth_db_018_postconditions$;

commit;
