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


-- VPROC-0008: revision administrativa gobernada, aun NO HABILITADA por catalogo.
-- La funcion no concede permisos. El identificador de autorizacion requiere
-- alta canónica separada y pruebas territoriales antes de una activacion.
create table if not exists public.attendance_administrative_decisions (
  id uuid primary key default gen_random_uuid(),
  ticket_id uuid not null unique references public.support_tickets(id),
  check_in_log_id uuid not null references public.attendance_logs(id),
  employee_id uuid not null references public.employees(id),
  site_id uuid not null references public.sites(id),
  shift_id uuid not null references public.employee_shifts(id),
  shift_published_at timestamptz not null,
  actor_id uuid not null references public.employees(id),
  decision text not null check (decision in ('approve','reject')),
  reason text not null check (length(btrim(reason)) between 15 and 1000),
  approved_checkout_at timestamptz,
  decided_at timestamptz not null default clock_timestamp(),
  checkout_log_id uuid unique references public.attendance_logs(id),
  check ((decision = 'approve') = (checkout_log_id is not null)),
  check ((decision = 'approve') = (approved_checkout_at is not null))
);

create index if not exists attendance_administrative_decisions_employee_idx
on public.attendance_administrative_decisions(employee_id, decided_at desc);
alter table public.attendance_administrative_decisions enable row level security;
revoke all on public.attendance_administrative_decisions from public, anon, authenticated;
grant select, insert on public.attendance_administrative_decisions to service_role;

create or replace function public.decide_attendance_checkout_review_v1(
  p_ticket_id uuid, p_check_in_log_id uuid, p_decision text, p_reason text,
  p_checkout_at timestamptz
) returns table(result text, decision_id uuid, checkout_log_id uuid)
language plpgsql security definer set search_path = ''
as $admin_attendance$
declare
  v_actor uuid := auth.uid();
  v_ticket public.support_tickets%rowtype;
  v_existing public.attendance_administrative_decisions%rowtype;
  v_checkin public.attendance_logs%rowtype;
  v_latest public.attendance_logs%rowtype;
  v_shift public.employee_shifts%rowtype;
  v_decision_id uuid;
  v_checkout_id uuid;
  v_reason text := btrim(coalesce(p_reason, ''));
begin
  if (auth.jwt() ->> 'role') is distinct from 'authenticated'
     or v_actor is null
     or p_ticket_id is null or p_check_in_log_id is null
     or p_decision is null or p_decision not in ('approve','reject')
     or length(v_reason) not between 15 and 1000
     or (p_decision = 'approve'
         and (p_checkout_at is null or p_checkout_at > clock_timestamp()))
     or (p_decision = 'reject' and p_checkout_at is not null)
  then
    raise exception 'ATTENDANCE_REVIEW_INVALID' using errcode = '22023';
  end if;

  select * into v_ticket from public.support_tickets
  where id = p_ticket_id for update;
  if not found or v_ticket.category <> 'attendance'
     or v_ticket.title <> 'Revisión de salida sin ubicación'
     or v_ticket.site_id is null
     or not exists (
       select 1 from public.support_messages m
       where m.ticket_id = p_ticket_id
     )
  then
    raise exception 'ATTENDANCE_REVIEW_EVIDENCE_MISSING' using errcode = 'P0002';
  end if;

  -- Siempre denegar hasta registrar el permiso canónico y asignarlo
  -- explícitamente al decisor en el territorio de la solicitud.
  if not public.has_permission(
    'anima.attendance.checkout_review.decide', v_ticket.site_id, null
  ) then
    raise exception 'ATTENDANCE_REVIEW_FORBIDDEN' using errcode = '42501';
  end if;
  -- El resolutor RBAC generico puede aceptar un grant GLOBAL o por rol.
  -- Esta accion sensible solo admite una concesion INDIVIDUAL/SS del
  -- actor en la sede del ticket, con adscripcion laboral activa.
  -- No basta con que has_permission() retorne true.
  if not exists (
    select 1
    from public.employee_permissions ep
    join public.app_permissions ap on ap.id = ep.permission_id
    join public.apps a on a.id = ap.app_id
    join public.employee_sites es
      on es.employee_id = ep.employee_id and es.site_id = v_ticket.site_id
    where ep.employee_id = v_actor
      and ep.is_allowed is true
      and ep.scope_type = 'site'
      and ep.scope_site_id = v_ticket.site_id
      and ep.scope_area_id is null
      and ep.scope_site_type is null
      and ep.scope_area_kind is null
      and es.is_active is true
      and ap.code = 'attendance.checkout_review.decide'
      and ap.is_active is true
      and a.code = 'anima'
      and a.is_active is true
  ) then
    raise exception 'ATTENDANCE_REVIEW_SITE_GRANT_REQUIRED' using errcode = '42501';
  end if;
  if not exists (
    select 1 from public.employees e
    where e.id = v_actor and e.is_active is true
  ) then
    raise exception 'ATTENDANCE_REVIEW_ACTOR_INACTIVE' using errcode = '42501';
  end if;
  if v_actor = coalesce(v_ticket.target_employee_id, v_ticket.created_by) then
    raise exception 'ATTENDANCE_REVIEW_SELF_APPROVAL_DENIED' using errcode = '42501';
  end if;

  select * into v_existing from public.attendance_administrative_decisions
  where ticket_id = p_ticket_id;
  if found then
    if v_existing.check_in_log_id is distinct from p_check_in_log_id
       or v_existing.actor_id is distinct from v_actor
       or v_existing.decision is distinct from p_decision
       or v_existing.reason is distinct from v_reason
       or v_existing.approved_checkout_at is distinct from p_checkout_at
    then
      raise exception 'ATTENDANCE_REVIEW_REPLAY_CONFLICT' using errcode = '23505';
    end if;
    return query select 'duplicate'::text, v_existing.id, v_existing.checkout_log_id;
    return;
  end if;

  if v_ticket.status::text not in ('open', 'in_progress') then
    raise exception 'ATTENDANCE_REVIEW_NOT_OPEN' using errcode = 'P0001';
  end if;

  -- Mismo lock por trabajador que el trigger de secuencia y el autocierre.
  -- Tomarlo antes del FOR UPDATE del evento para no invertir el orden
  -- de locks frente a un checkout concurrente del trabajador.
  perform pg_catalog.pg_advisory_xact_lock(
    pg_catalog.hashtext(
      coalesce(v_ticket.target_employee_id, v_ticket.created_by)::text
    )::bigint
  );
  select * into v_checkin from public.attendance_logs
  where id = p_check_in_log_id for update;
  if not found or v_checkin.action <> 'check_in'
     or v_checkin.employee_id is distinct from
          coalesce(v_ticket.target_employee_id, v_ticket.created_by)
     or v_checkin.site_id is distinct from v_ticket.site_id
     or v_checkin.shift_id is null
     or v_ticket.created_at < v_checkin.occurred_at
  then
    raise exception 'ATTENDANCE_REVIEW_WRONG_SESSION' using errcode = 'P0001';
  end if;
  select * into v_shift from public.employee_shifts
  where id = v_checkin.shift_id
    and employee_id = v_checkin.employee_id
    and site_id = v_checkin.site_id
    and published_at is not null and status <> 'cancelled'
    and shift_kind = 'laboral';
  if not found then
    raise exception 'ATTENDANCE_REVIEW_SHIFT_INVALID' using errcode = 'P0001';
  end if;
  if p_decision = 'approve' and p_checkout_at <= v_checkin.occurred_at then
    raise exception 'ATTENDANCE_REVIEW_OUT_OF_ORDER' using errcode = '22023';
  end if;

  if p_decision = 'approve' then
    select * into v_latest from public.attendance_logs
    where employee_id = v_checkin.employee_id
    order by occurred_at desc, created_at desc, id desc
    limit 1 for update;
    if not found or v_latest.id is distinct from v_checkin.id then
      raise exception 'ATTENDANCE_REVIEW_SESSION_CHANGED' using errcode = 'P0001';
    end if;
    if exists (
      select 1 from public.attendance_breaks
      where employee_id = v_checkin.employee_id and ended_at is null
    ) then
      raise exception 'ATTENDANCE_REVIEW_BREAK_OPEN' using errcode = 'P0001';
    end if;

    -- El instante aprobado deriva de evidencia administrativa: nunca se
    -- sustituye silenciosamente por la hora de llegada de la solicitud.
    insert into public.attendance_logs (
      employee_id, site_id, geofence_site_id, shift_id, action,
      source, occurred_at, client_event_id, notes, device_info
    ) values (
      v_checkin.employee_id, v_checkin.site_id,
      coalesce(v_checkin.geofence_site_id, v_checkin.site_id),
      v_checkin.shift_id, 'check_out', 'system', p_checkout_at,
      'attendance-admin-review:' || p_ticket_id::text,
      'Salida administrativa aprobada tras revisión',
      pg_catalog.jsonb_build_object(
        'authority','attendance_admin_review_v1',
        'ticketId',p_ticket_id,'checkInId',v_checkin.id,
        'approvedBy',v_actor,'approvedCheckoutAt',p_checkout_at
      )
    ) returning id into v_checkout_id;
  end if;

  insert into public.attendance_administrative_decisions (
    ticket_id, check_in_log_id, employee_id, site_id,
    shift_id, shift_published_at, actor_id, decision, reason,
    approved_checkout_at, checkout_log_id
  ) values (
    p_ticket_id, v_checkin.id, v_checkin.employee_id, v_checkin.site_id,
    v_checkin.shift_id, v_shift.published_at, v_actor, p_decision,
    v_reason, p_checkout_at, v_checkout_id
  ) returning id into v_decision_id;

  -- La resolución del caso y su notificación quedan en el MISMO commit
  -- que la decisión y el evento derivado: no se anuncia éxito parcial.
  update public.support_tickets
  set status = 'resolved', resolved_at = clock_timestamp(),
      updated_at = clock_timestamp(), assigned_to = v_actor
  where id = p_ticket_id;
  insert into public.support_messages(ticket_id, author_id, body)
  values (
    p_ticket_id, v_actor,
    case when p_decision = 'approve'
      then 'Revisión de salida aprobada. La asistencia fue actualizada por un responsable.'
      else 'Revisión de salida rechazada. La asistencia no fue modificada.'
    end
  );

  return query select 'applied'::text, v_decision_id, v_checkout_id;
end;
$admin_attendance$;

revoke execute on function public.decide_attendance_checkout_review_v1(uuid,uuid,text,text,timestamptz)
from public, anon;
grant execute on function public.decide_attendance_checkout_review_v1(uuid,uuid,text,text,timestamptz)
to authenticated;

commit;
