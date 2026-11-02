# VISO — expediente SQL para hotfix exclusivo en producción

**Estado: CANDIDATO NO APLICADO.** Fuente productiva `clzdpinthhtknkmefsxx`, Vercel `8cf7c49a593c748cb6c99dd9b919b6947bcfec14`. No se alteró STAGING ni se ejecutó DDL en producción. **Migración física generada mediante Supabase CLI 2.121.0** en la rama Shell: `supabase/migrations/20261102182951_viso_prod_monthly_overtime_publish.sql` (origen de nombre: [GitHub Actions #41501042061](https://github.com/vento-group-sas/vento-shell/actions/runs/41501042061)). Se ha registrado el contenido SQL forward de este expediente. **NO se ha aplicado** a ninguna base de datos. Para ejecutar: validar correspondencia exacta, gobernar el gate E5, respaldos/restauración y autoridad productiva.

## Alcance estrictamente productivo

- Conserva la función y trigger existentes, sin DROP ni datos alterados; sustituye límite fijo de 186 h/mes por defensas generales de 54 h/semana y 11 h/día bajo acuerdo flexible. No convierte 210 h del divisor salarial en tope.
- Conteo por empleado **todas las sedes** y semana ISO; únicamente turnos publicados y no cancelados/descanso, bloqueos por empleado/semana para serializar publicación.
- La excepción de corrección reductora sólo se aplica a turnos previamente **publicados, laborales y activos**. Una reactivación de un turno cancelado o de descanso vuelve a validar los topes; de lo contrario podría eludir la defensa semanal.
- **No certifica** jornada ordinaria individual menor de 42 h, consentimiento flexible, autorización de extras, nómina ni registro de horas efectivamente trabajadas. La restauración **sintética** del trigger ya se probó; el respaldo/restauración de producción, E5 y aceptación operativa siguen **BLOCKED**; no desplegar aún.

### Preflight productivo de datos (solo lectura; 2026-11-02)
- `public.employee_shifts`: 4.815 registros, 4.373 turnos publicados, 49 trabajadores y 6 sedes (agregados sin identidades).
- En los turnos **publicados e históricos**, 26 semanas superan 54 h programadas y 90 días superan 11 h programadas; 37 semanas incluyen turnos en más de una sede. No equivale a horas trabajadas ni a un dictamen de ilegalidad.
- Los límites semanales/diarios nuevos solo se validan al publicar, modificar o reactivar turnos. Conservar el histórico, permitir reducciones y planear el tratamiento de ediciones heredadas sin borrados.
- La base productiva registra solo la migración `00000000000000_baseline`, mientras Shell contiene otras 21 migraciones pendientes. **Prohibido aplicar `supabase db push` global** para este hotfix; exigir una vía específica y gobernada.

### QA de la migración exacta, sin entornos remotos
- Supabase CLI v2.121.0 [generó el nombre](https://github.com/vento-group-sas/vento-shell/actions/runs/41501042061), y el archivo SQL versionado está en `supabase/migrations/20261102182951_viso_prod_monthly_overtime_publish.sql`.
- [GitHub Actions #41501914550](https://github.com/vento-group-sas/vento-shell/actions/runs/41501914550): **SUCCESS PostgreSQL 16 y 17**; comparación exacta migración↔SQL ensayado, siete casos funcionales, dos sesiones concurrentes de dos sedes (máximo 54 h) y recuperación de función original/trigger. Todos son datos sintéticos.
- No existe evidencia de backup/PITR restaurado del proyecto productivo ni E2E de publicación real con actores; la liberación sigue **NO-GO**.

## SQL forward (registrado en migración CLI candidata, no aplicada)

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

`CODE-AUD-021`, `AUTH-UI-061`, `VISO-SCH-001..008`, `DELIV-PKG-001..025`, `E5-GATE-008::VISO-SCHEDULE-MONTHLY-001` y aceptación funcional no están cerrados. QA sintética sobre **archivo físico CLI exacto** terminó SUCCESS en PostgreSQL 16/17, siete escenarios, concurrencia de dos sesiones y restauración en [#41501914550](https://github.com/vento-group-sas/vento-shell/actions/runs/41501914550). Aún faltan pgTAP/RLS con esquema completo, contratos individuales y autorización efectiva, cruce de medianoche, datos reales minimizados, recuperación de respaldo hospedado, QA/E2E con actores y gate E5. La prueba aislada no autoriza liberación. **No utilizar `apply_migration` ni `execute_sql` en producción antes de estos controles.**
