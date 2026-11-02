# VISO — expediente SQL para hotfix exclusivo en producción

**Estado: CANDIDATO NO APLICADO.** Fuente productiva `clzdpinthhtknkmefsxx`, Vercel `8cf7c49a593c748cb6c99dd9b919b6947bcfec14`. No se alteró STAGING ni se ejecutó DDL en producción. **Este archivo es documentación del SQL, no una migración creada por CLI.** Para aplicar: crear previamente la migración real con `supabase migration new` en checkout autorizado de vento-shell, validar nombre y manifest, obtener gate E5 y prueba de restore.

## Alcance estrictamente productivo

- Conserva la función y trigger existentes, sin DROP ni datos alterados; sustituye límite fijo de 186 h/mes por defensas generales de 54 h/semana y 11 h/día bajo acuerdo flexible. No convierte 210 h del divisor salarial en tope.
- Conteo por empleado **todas las sedes** y semana ISO; únicamente turnos publicados y no cancelados/descanso, bloqueos por empleado/semana para serializar publicación.
- **No certifica** jornada ordinaria individual menor de 42 h, consentimiento flexible, autorización de extras, nómina ni registro de horas efectivamente trabajadas. Por tanto E5, rollback probado y aceptación operativa están **BLOCKED**; no desplegar aun.

## SQL forward (pendiente de generar/registrar migración CLI)

```sql
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
  if tg_op = 'UPDATE'
    and old.published_at is not null
    and old.employee_id = new.employee_id
    and old.shift_date = new.shift_date
    and v_new_minutes <= greatest(
      0, floor(extract(epoch from (old.end_time - old.start_time)) / 60)::integer
        - greatest(coalesce(old.break_minutes, 0), 0)
    )
  then
    return new;
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
```

## SQL rollback — restauración exacta de función leída de producción

**Precaución:** restaurar el antiguo techo de 186 h puede bloquear turnos publicados bajo una regla nueva. Conciliar datos, congelar cambios y probar la recuperación antes de aplicar un rollback; conservar respaldo de definición y grants.

```sql
CREATE OR REPLACE FUNCTION public.viso_enforce_monthly_schedule_publish_limit()
 RETURNS trigger
 LANGUAGE plpgsql
 SECURITY DEFINER
 SET search_path TO 'public'
AS $function$
declare
  v_month_start date;
  v_month_end date;
  v_existing_minutes integer := 0;
  v_new_minutes integer := 0;
  v_total_minutes integer := 0;
  v_limit_minutes constant integer := 11160;
  v_employee_label text;
begin
  -- La regla solo se activa cuando el registro queda publicado.
  -- Cancelar o convertir un turno en descanso siempre debe poder reducir horas.
  if new.published_at is null
    or coalesce(new.status, '') = 'cancelled'
    or coalesce(new.shift_kind, 'laboral') = 'descanso'
  then
    return new;
  end if;

  v_month_start := date_trunc('month', new.shift_date)::date;
  v_month_end := (v_month_start + interval '1 month')::date;

  select coalesce(
    sum(
      case
        when coalesce(es.shift_kind, 'laboral') = 'descanso'
          or coalesce(es.status, '') = 'cancelled'
        then 0
        else greatest(
          0,
          floor(extract(epoch from (es.end_time - es.start_time)) / 60)::integer
          - greatest(coalesce(es.break_minutes, 0), 0)
        )
      end
    ),
    0
  )::integer
  into v_existing_minutes
  from public.employee_shifts es
  where es.employee_id = new.employee_id
    and es.shift_date >= v_month_start
    and es.shift_date < v_month_end
    and (tg_op = 'INSERT' or es.id <> new.id);

  v_new_minutes := case
    when coalesce(new.shift_kind, 'laboral') = 'descanso'
      or coalesce(new.status, '') = 'cancelled'
    then 0
    else greatest(
      0,
      floor(extract(epoch from (new.end_time - new.start_time)) / 60)::integer
      - greatest(coalesce(new.break_minutes, 0), 0)
    )
  end;

  v_total_minutes := v_existing_minutes + v_new_minutes;

  if v_total_minutes > v_limit_minutes then
    select coalesce(e.full_name, e.alias, e.id::text)
    into v_employee_label
    from public.employees e
    where e.id = new.employee_id;

    raise exception using
      errcode = 'P0001',
      message = format(
        'No se puede publicar: %s acumula %s horas en %s y el máximo permitido es 186 horas. Corrige los borradores del mes.',
        coalesce(v_employee_label, new.employee_id::text),
        round(v_total_minutes::numeric / 60, 1),
        to_char(v_month_start, 'YYYY-MM')
      );
  end if;

  return new;
end;
$function$
```

## Gate de aplicación

`CODE-AUD-021`, `AUTH-UI-061`, `VISO-SCH-001..008`, `DELIV-PKG-001..025`, `E5-GATE-008::VISO-SCHEDULE-MONTHLY-001` y aceptación funcional no están cerrados. Falta pgTAP aislado con 42/54/54+1 h semanales, 11/11+1 h diarios, cruce de mes, multisedes, descanso, borrador, concurrencia, corrección, RLS y prueba de rollback; QA VISO final del mismo SHA y liberación autorizada. **No utilizar `apply_migration` ni `execute_sql` en producción antes de estos controles.**
