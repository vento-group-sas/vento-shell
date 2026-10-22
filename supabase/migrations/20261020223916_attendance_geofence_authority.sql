begin;

-- AUTOCIERRE POR GEOCERCA: ninguna hora programada puede inventar una salida.
-- Desactivar reversiblemente solo los tres jobs legados; conservar definiciones
-- e historial de ejecuciones para auditoria y eventual rollback gobernado.
do $geofence_cron$
declare
  v_job bigint;
begin
  if to_regclass('cron.job') is not null then
    if to_regprocedure('cron.alter_job(bigint,text,text,text,text,boolean)') is null then
      raise exception 'GEOFENCE_LEGACY_CRON_DEACTIVATION_UNAVAILABLE';
    end if;
    for v_job in
      select jobid from cron.job
      where active is true and jobname in (
        'anima_attendance_day_end_close_0005',
        'auto-close-attendance',
        'attendance_stale_open_shift_autoclose_daily_bogota'
      )
    loop
      execute 'select cron.alter_job(job_id := $1, active := false)' using v_job;
    end loop;
    if exists (
      select 1 from cron.job
      where active is true and jobname in (
        'anima_attendance_day_end_close_0005',
        'auto-close-attendance',
        'attendance_stale_open_shift_autoclose_daily_bogota'
      )
    ) then
      raise exception 'GEOFENCE_LEGACY_AUTO_CLOSE_CRON_STILL_ACTIVE';
    end if;
  end if;
end;
$geofence_cron$;

-- Libro de evidencias: NO admite escrituras de usuarios ANIMA.
-- Solo un verificador remoto privilegiado puede registrar pruebas.
create table if not exists public.attendance_geofence_verified_evidence (
  id uuid primary key default gen_random_uuid(),
  employee_id uuid not null references public.employees(id),
  site_id uuid not null references public.sites(id),
  shift_id uuid not null references public.employee_shifts(id),
  check_in_log_id uuid not null references public.attendance_logs(id),
  provider_ref text not null unique,
  verifier text not null check (verifier = 'server_attested_location_v1'),
  attestation_digest text not null check (attestation_digest ~ '^[a-f0-9]{64}$'),
  verified_at timestamptz not null default now(),
  first_outside_at timestamptz not null,
  second_outside_at timestamptz not null,
  first_latitude numeric not null check (first_latitude between -90 and 90),
  first_longitude numeric not null check (first_longitude between -180 and 180),
  second_latitude numeric not null check (second_latitude between -90 and 90),
  second_longitude numeric not null check (second_longitude between -180 and 180),
  first_accuracy_meters numeric not null check (first_accuracy_meters between 0 and 25),
  second_accuracy_meters numeric not null check (second_accuracy_meters between 0 and 25),
  has_mock_or_integrity_warning boolean not null default true,
  exceptions_cleared_by_server boolean not null default false,
  status text not null default 'verified'
    check (status in ('verified', 'consumed', 'review')),
  checkout_log_id uuid references public.attendance_logs(id),
  consumed_at timestamptz,
  created_at timestamptz not null default now(),
  constraint geofence_verified_evidence_sample_interval_check
    check (second_outside_at >= first_outside_at + interval '45 seconds'
       and second_outside_at <= first_outside_at + interval '10 minutes')
);

create index if not exists attendance_geofence_verified_evidence_pending_idx
on public.attendance_geofence_verified_evidence (verified_at,id)
where status = 'verified';

alter table public.attendance_geofence_verified_evidence enable row level security;
revoke all on public.attendance_geofence_verified_evidence from public, anon, authenticated;
grant select, insert, update on public.attendance_geofence_verified_evidence to service_role;

-- El mismo advisory-lock que enforce_attendance_sequence garantiza serialización
-- entre check-out manual, reintentos y autocierre.
create or replace function public.apply_geofence_auto_checkout_v1(p_evidence_id uuid)
returns text
language plpgsql
security invoker
set search_path = ''
as $geofence_apply$
declare
  v_e public.attendance_geofence_verified_evidence%rowtype;
  v_last public.attendance_logs%rowtype;
  v_shift public.employee_shifts%rowtype;
  v_site public.sites%rowtype;
  v_site_policy public.site_attendance_policy%rowtype;
  v_radius double precision;
  v_first_distance double precision;
  v_second_distance double precision;
  v_checkout_id uuid;
begin
  if current_user <> 'service_role' then
    raise exception 'GEOFENCE_SERVER_ONLY' using errcode = '42501';
  end if;
  if p_evidence_id is null then
    return 'review';
  end if;

  select * into v_e
    from public.attendance_geofence_verified_evidence
    where id = p_evidence_id
    for update;
  if not found then return 'review'; end if;
  if v_e.status = 'consumed' and v_e.checkout_log_id is not null then
    return 'duplicate';
  end if;
  if v_e.status <> 'verified' then return 'review'; end if;

  -- Ninguna coordenada del cliente por sí sola puede servir como evidencia:
  -- el registro debe venir de un verificador server-only independiente.
  if v_e.verifier <> 'server_attested_location_v1'
     or v_e.has_mock_or_integrity_warning
     or not v_e.exceptions_cleared_by_server
     or v_e.attestation_digest !~ '^[a-f0-9]{64}$'
     or v_e.second_outside_at < v_e.first_outside_at + interval '45 seconds'
     or v_e.second_outside_at > clock_timestamp()
     or v_e.verified_at < v_e.second_outside_at
     or clock_timestamp() - v_e.second_outside_at > interval '20 minutes'
  then
    return 'review';
  end if;

  perform pg_catalog.pg_advisory_xact_lock(pg_catalog.hashtext(v_e.employee_id::text)::bigint);

  select * into v_last from public.attendance_logs
  where employee_id = v_e.employee_id
  order by occurred_at desc, created_at desc, id desc limit 1 for update;
  if not found or v_last.id is distinct from v_e.check_in_log_id
     or v_last.action <> 'check_in'
     or v_last.shift_id is distinct from v_e.shift_id
     or v_last.site_id is distinct from v_e.site_id
     or v_e.first_outside_at <= v_last.occurred_at
  then
    return 'review';
  end if;

  select * into v_shift from public.employee_shifts
  where id = v_e.shift_id and employee_id = v_e.employee_id
    and site_id = v_e.site_id and published_at is not null
    and status <> 'cancelled' and shift_kind = 'laboral';
  if not found then return 'review'; end if;

  if exists (select 1 from public.attendance_breaks
             where employee_id = v_e.employee_id and ended_at is null) then
    return 'review';
  end if;

  select * into v_site from public.sites
  where id = coalesce(v_last.geofence_site_id,v_last.site_id)
    and is_active is true and latitude is not null and longitude is not null;
  if not found then return 'review'; end if;

  select * into v_site_policy from public.site_attendance_policy
  where site_id = v_site.id;
  if found and v_site_policy.requires_geofence is false then return 'review'; end if;

  v_radius := greatest(200,
    coalesce(v_site_policy.checkin_radius_meters,v_site.checkin_radius_meters,50)
  )::double precision;

  v_first_distance := public.haversine_m(
    v_e.first_latitude,v_e.first_longitude,v_site.latitude,v_site.longitude
  );
  v_second_distance := public.haversine_m(
    v_e.second_latitude,v_e.second_longitude,v_site.latitude,v_site.longitude
  );
  if not (v_first_distance - v_e.first_accuracy_meters > v_radius
      and v_second_distance - v_e.second_accuracy_meters > v_radius)
  then
    return 'review';
  end if;

  insert into public.attendance_logs (
    employee_id,site_id,geofence_site_id,shift_id,action,source,
    occurred_at,latitude,longitude,accuracy_meters,
    client_event_id,notes,device_info
  ) values (
    v_e.employee_id,v_e.site_id,v_site.id,v_e.shift_id,'check_out','system',
    v_e.second_outside_at,null,null,null,
    'geofence-auto:' || v_e.id::text,
    'Cierre por salida sostenida de geocerca verificada por servidor',
    pg_catalog.jsonb_build_object(
      'autoCheckout',true,'sourceDetail','system_verified_geofence',
      'checkInId',v_e.check_in_log_id,'evidenceId',v_e.id,
      'attestationVerifier',v_e.verifier,'verifiedAt',v_e.verified_at
    )
  ) returning id into v_checkout_id;

  update public.attendance_geofence_verified_evidence
  set status='consumed',checkout_log_id=v_checkout_id,consumed_at=clock_timestamp()
  where id=p_evidence_id and status='verified';
  return 'closed';
end;
$geofence_apply$;

revoke execute on function public.apply_geofence_auto_checkout_v1(uuid)
  from public,anon,authenticated;
grant execute on function public.apply_geofence_auto_checkout_v1(uuid)
  to service_role;

commit;
