CREATE OR REPLACE FUNCTION public.viso_enforce_monthly_schedule_publish_limit()
 RETURNS trigger
 LANGUAGE plpgsql
 SECURITY DEFINER
 SET search_path TO 'pg_catalog', 'public'
AS $function$
declare
  v_week_start date;
  v_week_end date;
  v_day_minutes integer := 0;
  v_week_minutes integer := 0;
  v_new_minutes integer := 0;
begin
  -- No existe limite legal mensual de 186/188/210 horas para publicar.
  -- Defensas absolutas generales, no reemplazan autorizacion del contrato:
  -- 54 horas por semana (42 ordinarias + 12 extra), 11/dia solo con acuerdo
  -- flexible valido (9 ordinarias + 2 extra). No liquida horas trabajadas.
  if new.published_at is null
    or coalesce(new.status, '') = 'cancelled'
    or coalesce(new.shift_kind, 'laboral') = 'descanso'
  then
    return new;
  end if;

  v_new_minutes := greatest(
    0, floor(extract(epoch from (new.end_time - new.start_time)) / 60)::integer
      - greatest(coalesce(new.break_minutes, 0), 0)
  );

  -- Permitir corregir/reducir tiempo publicado del mismo empleado y fecha.
  if tg_op = 'UPDATE' then
    if old.published_at is not null
      and coalesce(old.status, '') <> 'cancelled'
      and coalesce(old.shift_kind, 'laboral') <> 'descanso'
      and old.employee_id = new.employee_id
      and old.shift_date = new.shift_date
      and v_new_minutes <= greatest(
        0, floor(extract(epoch from (old.end_time - old.start_time)) / 60)::integer
          - greatest(coalesce(old.break_minutes, 0), 0)
      )
    then
      return new;
    end if;
  end if;

  v_week_start := date_trunc('week', new.shift_date)::date;
  v_week_end := v_week_start + 7;

  perform pg_catalog.pg_advisory_xact_lock(
    pg_catalog.hashtext(new.employee_id::text),
    pg_catalog.hashtext(v_week_start::text)
  );

  select coalesce(sum(greatest(
    0, floor(extract(epoch from (es.end_time - es.start_time)) / 60)::integer
      - greatest(coalesce(es.break_minutes, 0), 0)
  )), 0)::integer
  into v_week_minutes
  from public.employee_shifts es
  where es.employee_id = new.employee_id
    and es.shift_date >= v_week_start and es.shift_date < v_week_end
    and es.published_at is not null
    and coalesce(es.shift_kind, 'laboral') <> 'descanso'
    and coalesce(es.status, '') <> 'cancelled'
    and (tg_op = 'INSERT' or es.id <> new.id);

  select coalesce(sum(greatest(
    0, floor(extract(epoch from (es.end_time - es.start_time)) / 60)::integer
      - greatest(coalesce(es.break_minutes, 0), 0)
  )), 0)::integer
  into v_day_minutes
  from public.employee_shifts es
  where es.employee_id = new.employee_id
    and es.shift_date = new.shift_date
    and es.published_at is not null
    and coalesce(es.shift_kind, 'laboral') <> 'descanso'
    and coalesce(es.status, '') <> 'cancelled'
    and (tg_op = 'INSERT' or es.id <> new.id);

  v_week_minutes := v_week_minutes + v_new_minutes;
  v_day_minutes := v_day_minutes + v_new_minutes;

  if v_week_minutes > 54 * 60 then
    raise exception using errcode = 'P0001',
      message = format(
        'Publicacion rechazada: semana %s acumula %s h, excede maximo general 54 h semanales.',
        to_char(v_week_start, 'YYYY-MM-DD'),
        round(v_week_minutes::numeric / 60, 2)
      );
  end if;

  if v_day_minutes > 11 * 60 then
    raise exception using errcode = 'P0001',
      message = format(
        'Publicacion rechazada: dia %s acumula %s h; requiere revisar jornada pactada y limite de 2 h extras diarias.',
        to_char(new.shift_date, 'YYYY-MM-DD'),
        round(v_day_minutes::numeric / 60, 2)
      );
  end if;

  return new;
end;
$function$;
