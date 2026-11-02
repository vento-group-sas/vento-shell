-- VISO-SCHEDULE-MONTHLY-001 / VPROC-0007
-- CANDIDATO SOLAMENTE: aplicar exclusivamente tras E5-GATE-008 y backup de PROD.
-- Esta migración depende de 20261102182951_viso_prod_monthly_overtime_publish.sql.
-- No crea contratos ficticios, no modifica filas existentes ni configura STAGING.

CREATE TABLE public.viso_labor_terms (
  id uuid PRIMARY KEY DEFAULT pg_catalog.gen_random_uuid(),
  employee_id uuid NOT NULL REFERENCES public.employees(id),
  effective_week date NOT NULL,
  ordinary_weekly_minutes integer NOT NULL,
  ordinary_daily_minutes integer NOT NULL,
  flexible_daily_agreement boolean NOT NULL DEFAULT false,
  agreement_reference text NOT NULL,
  recorded_by uuid NOT NULL REFERENCES public.employees(id),
  recorded_at timestamptz NOT NULL DEFAULT pg_catalog.clock_timestamp(),
  CONSTRAINT viso_labor_terms_week_monday CHECK (extract(isodow from effective_week) = 1),
  CONSTRAINT viso_labor_terms_weekly CHECK (ordinary_weekly_minutes BETWEEN 60 AND 2520),
  CONSTRAINT viso_labor_terms_daily CHECK (ordinary_daily_minutes BETWEEN 60 AND 540),
  CONSTRAINT viso_labor_terms_flex CHECK (flexible_daily_agreement OR ordinary_daily_minutes <= 480),
  CONSTRAINT viso_labor_terms_reference CHECK (char_length(btrim(agreement_reference)) BETWEEN 6 AND 240),
  CONSTRAINT viso_labor_terms_version UNIQUE (employee_id, effective_week)
);

CREATE TABLE public.viso_weekly_overtime_decisions (
  id uuid PRIMARY KEY DEFAULT pg_catalog.gen_random_uuid(),
  employee_id uuid NOT NULL REFERENCES public.employees(id),
  week_start date NOT NULL,
  decision text NOT NULL,
  authorized_minutes integer NOT NULL,
  reason text NOT NULL,
  approval_reference text NOT NULL,
  recorded_by uuid NOT NULL REFERENCES public.employees(id),
  recorded_at timestamptz NOT NULL DEFAULT pg_catalog.clock_timestamp(),
  CONSTRAINT viso_ot_decision_week_monday CHECK (extract(isodow from week_start) = 1),
  CONSTRAINT viso_ot_decision_kind CHECK (decision IN ('approve', 'revoke')),
  CONSTRAINT viso_ot_decision_minutes CHECK (
    (decision = 'approve' AND authorized_minutes BETWEEN 1 AND 720)
    OR (decision = 'revoke' AND authorized_minutes = 0)
  ),
  CONSTRAINT viso_ot_decision_reason CHECK (char_length(btrim(reason)) BETWEEN 12 AND 500),
  CONSTRAINT viso_ot_decision_reference CHECK (char_length(btrim(approval_reference)) BETWEEN 6 AND 240)
);

CREATE INDEX viso_labor_terms_effective_idx
  ON public.viso_labor_terms (employee_id, effective_week DESC);
CREATE INDEX viso_weekly_ot_current_idx
  ON public.viso_weekly_overtime_decisions (employee_id, week_start, recorded_at DESC, id DESC);

-- Solo el backend controlado (service_role) puede ver o registrar estos datos
-- laborales; cada mutación del servidor valida VISO staff.manage y la sede.
ALTER TABLE public.viso_labor_terms ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.viso_weekly_overtime_decisions ENABLE ROW LEVEL SECURITY;
REVOKE ALL ON public.viso_labor_terms FROM PUBLIC, anon, authenticated;
REVOKE ALL ON public.viso_weekly_overtime_decisions FROM PUBLIC, anon, authenticated;
GRANT SELECT, INSERT ON public.viso_labor_terms TO service_role;
GRANT SELECT, INSERT ON public.viso_weekly_overtime_decisions TO service_role;

-- Expedientes laborales y decisiones son append-only: una nueva versión
-- sustituye la vigente sin reescribir evidencias históricas.
CREATE FUNCTION public.viso_reject_labor_record_mutation()
 RETURNS trigger
 LANGUAGE plpgsql
 SET search_path TO 'pg_catalog', 'public'
AS $function$
BEGIN
  RAISE EXCEPTION USING ERRCODE = 'P0001',
    MESSAGE = 'Los registros de jornada y autorizacion son inmutables; registre una nueva version o una revocacion.';
END;
$function$;

CREATE TRIGGER trg_viso_labor_terms_immutable
BEFORE UPDATE OR DELETE ON public.viso_labor_terms
FOR EACH ROW EXECUTE FUNCTION public.viso_reject_labor_record_mutation();

CREATE TRIGGER trg_viso_weekly_ot_immutable
BEFORE UPDATE OR DELETE ON public.viso_weekly_overtime_decisions
FOR EACH ROW EXECUTE FUNCTION public.viso_reject_labor_record_mutation();

-- El mismo advisory lock de publicación serializa aprobación/revocación y
-- lectura de autorización para el mismo trabajador y semana ISO.
CREATE FUNCTION public.viso_lock_weekly_ot_decision()
 RETURNS trigger
 LANGUAGE plpgsql
 SECURITY DEFINER
 SET search_path TO 'pg_catalog', 'public'
AS $function$
BEGIN
  PERFORM pg_catalog.pg_advisory_xact_lock(
    pg_catalog.hashtext(NEW.employee_id::text),
    pg_catalog.hashtext(NEW.week_start::text)
  );
  IF NOT EXISTS (
    SELECT 1
    FROM public.viso_labor_terms t
    WHERE t.employee_id = NEW.employee_id
      AND t.effective_week <= NEW.week_start
  ) THEN
    RAISE EXCEPTION USING ERRCODE = 'P0001',
      MESSAGE = 'Registre primero la jornada pactada vigente del trabajador.';
  END IF;
  NEW.recorded_at := pg_catalog.clock_timestamp();
  RETURN NEW;
END;
$function$;

CREATE TRIGGER trg_viso_weekly_ot_lock
BEFORE INSERT ON public.viso_weekly_overtime_decisions
FOR EACH ROW EXECUTE FUNCTION public.viso_lock_weekly_ot_decision();

REVOKE ALL ON FUNCTION public.viso_reject_labor_record_mutation() FROM PUBLIC, anon, authenticated;
REVOKE ALL ON FUNCTION public.viso_lock_weekly_ot_decision() FROM PUBLIC, anon, authenticated;

-- La fuente de verdad de publicación sigue siendo public.employee_shifts.
-- El trigger de 186 horas ya se reemplazó en la migración inmediatamente
-- anterior; ahora la validación exige un contrato real y decisión vigente.
CREATE OR REPLACE FUNCTION public.viso_enforce_monthly_schedule_publish_limit()
 RETURNS trigger
 LANGUAGE plpgsql
 SECURITY DEFINER
 SET search_path TO 'pg_catalog', 'public'
AS $function$
DECLARE
  v_week_start date;
  v_new_minutes integer;
  v_week_minutes integer;
  v_day_minutes integer;
  v_daily_overtime_minutes integer;
  v_overtime_minutes integer;
  v_distinct_days integer;
  v_ordinary_weekly integer;
  v_ordinary_daily integer;
  v_flexible boolean;
  v_decision text;
  v_authorized_minutes integer;
BEGIN
  IF NEW.published_at IS NULL
     OR coalesce(NEW.status, '') = 'cancelled'
     OR coalesce(NEW.shift_kind, 'laboral') = 'descanso'
  THEN
    RETURN NEW;
  END IF;

  v_new_minutes := greatest(
    0,
    floor(extract(epoch from (NEW.end_time - NEW.start_time)) / 60)::integer
      - greatest(coalesce(NEW.break_minutes, 0), 0)
  );
  IF v_new_minutes <= 0 THEN
    RAISE EXCEPTION USING ERRCODE = 'P0001',
      MESSAGE = 'El turno laboral publicado debe tener una duracion positiva.';
  END IF;

  -- Reducir un turno laboral existente no debe bloquear correcciones.
  IF TG_OP = 'UPDATE' THEN
    IF OLD.published_at IS NOT NULL
       AND coalesce(OLD.status, '') <> 'cancelled'
       AND coalesce(OLD.shift_kind, 'laboral') <> 'descanso'
       AND OLD.employee_id = NEW.employee_id
       AND OLD.shift_date = NEW.shift_date
       AND v_new_minutes <= greatest(
         0, floor(extract(epoch from (OLD.end_time - OLD.start_time)) / 60)::integer
           - greatest(coalesce(OLD.break_minutes, 0), 0)
       )
    THEN
      RETURN NEW;
    END IF;
  END IF;

  v_week_start := date_trunc('week', NEW.shift_date)::date;
  PERFORM pg_catalog.pg_advisory_xact_lock(
    pg_catalog.hashtext(NEW.employee_id::text),
    pg_catalog.hashtext(v_week_start::text)
  );

  -- Nunca inferir la jornada individual a partir de un máximo de planificación
  -- ni asignar 42h por defecto sin acuerdo identificable.
  SELECT t.ordinary_weekly_minutes, t.ordinary_daily_minutes,
         t.flexible_daily_agreement
    INTO v_ordinary_weekly, v_ordinary_daily, v_flexible
  FROM public.viso_labor_terms t
  WHERE t.employee_id = NEW.employee_id
    AND t.effective_week <= v_week_start
  ORDER BY t.effective_week DESC
  LIMIT 1;

  IF NOT FOUND THEN
    RAISE EXCEPTION USING ERRCODE = 'P0001',
      MESSAGE = 'Publicacion rechazada: falta registrar la jornada ordinaria pactada y su referencia documental.';
  END IF;

  -- Este conjunto incluye TODAS las sedes y solo turnos activos publicados.
  -- La fila actual se excluye en UPDATE y se vuelve a sumar exactamente una vez.
  WITH candidate AS (
    SELECT es.shift_date,
           greatest(
             0,
             floor(extract(epoch from (es.end_time-es.start_time)) / 60)::integer
               - greatest(coalesce(es.break_minutes, 0), 0)
           ) AS minutes
    FROM public.employee_shifts es
    WHERE es.employee_id = NEW.employee_id
      AND es.shift_date >= v_week_start
      AND es.shift_date < v_week_start + 7
      AND es.published_at IS NOT NULL
      AND coalesce(es.status, '') <> 'cancelled'
      AND coalesce(es.shift_kind, 'laboral') <> 'descanso'
      AND (TG_OP = 'INSERT' OR es.id <> NEW.id)
    UNION ALL
    SELECT NEW.shift_date, v_new_minutes
  ),
  by_day AS (
    SELECT shift_date, sum(minutes)::integer AS day_minutes
    FROM candidate
    GROUP BY shift_date
  )
  SELECT coalesce(sum(d.day_minutes), 0)::integer,
         coalesce(max(d.day_minutes) FILTER (WHERE d.shift_date = NEW.shift_date), 0)::integer,
         coalesce(sum(greatest(d.day_minutes - v_ordinary_daily, 0)), 0)::integer,
         count(*)::integer
    INTO v_week_minutes, v_day_minutes, v_daily_overtime_minutes, v_distinct_days
  FROM by_day d;

  IF v_distinct_days > 6 THEN
    RAISE EXCEPTION USING ERRCODE = 'P0001',
      MESSAGE = 'Publicacion rechazada: mas de seis dias laborales en la misma semana.';
  END IF;

  -- 8h ordinarias/día, o hasta 9h solo con pacto flexible real; extras <=2h/d.
  IF v_day_minutes > least(660, v_ordinary_daily + 120) THEN
    RAISE EXCEPTION USING ERRCODE = 'P0001',
      MESSAGE = format('Publicacion rechazada: %s tiene %s h; supera la jornada diaria pactada mas 2 horas extra.',
                       to_char(NEW.shift_date, 'YYYY-MM-DD'),
                       round(v_day_minutes::numeric / 60, 2));
  END IF;

  -- 42h ordinarias como máximo general +12h suplementarias. Un contrato
  -- inferior hace que el máximo individual también sea inferior a 54h.
  IF v_week_minutes > least(3240, v_ordinary_weekly + 720) THEN
    RAISE EXCEPTION USING ERRCODE = 'P0001',
      MESSAGE = format('Publicacion rechazada: semana %s suma %s h y excede la jornada pactada mas 12 horas extra.',
                       to_char(v_week_start, 'YYYY-MM-DD'),
                       round(v_week_minutes::numeric / 60, 2));
  END IF;

  -- Horas extra = lo que excede el máximo semanal O la suma de excesos
  -- sobre la ordinaria diaria (sin doble contarlas).
  v_overtime_minutes := greatest(
    greatest(v_week_minutes - v_ordinary_weekly, 0),
    v_daily_overtime_minutes
  );
  IF v_overtime_minutes > 0 THEN
    SELECT d.decision, d.authorized_minutes
      INTO v_decision, v_authorized_minutes
    FROM public.viso_weekly_overtime_decisions d
    WHERE d.employee_id = NEW.employee_id
      AND d.week_start = v_week_start
    ORDER BY d.recorded_at DESC, d.id DESC
    LIMIT 1;
    IF NOT FOUND OR v_decision <> 'approve'
       OR v_authorized_minutes < v_overtime_minutes
    THEN
      RAISE EXCEPTION USING ERRCODE = 'P0001',
        MESSAGE = format('Publicacion rechazada: %s minutos extra de la semana %s no tienen autorizacion vigente suficiente.',
                         v_overtime_minutes, to_char(v_week_start, 'YYYY-MM-DD'));
    END IF;
  END IF;

  RETURN NEW;
END;
$function$;

REVOKE ALL ON FUNCTION public.viso_enforce_monthly_schedule_publish_limit() FROM PUBLIC, anon, authenticated;
