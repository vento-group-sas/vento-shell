-- QA SQL EFIMERA: no apunta a Supabase, no contiene empleados reales.
BEGIN;

CREATE TRIGGER trg_viso_monthly_schedule_publish_limit
BEFORE INSERT OR UPDATE OF published_at, employee_id, shift_date, start_time,
  end_time, break_minutes, shift_kind, status
ON public.employee_shifts
FOR EACH ROW EXECUTE FUNCTION public.viso_enforce_monthly_schedule_publish_limit();

DO $test$
DECLARE
  v_e1 uuid := '11111111-1111-4111-8111-111111111111';
  v_e2 uuid := '22222222-2222-4222-8222-222222222222';
  v_e3 uuid := '33333333-3333-4333-8333-333333333333';
  v_e4 uuid := '44444444-4444-4444-8444-444444444444';
  v_site1 uuid := 'aaaaaaaa-aaaa-4aaa-8aaa-aaaaaaaaaaaa';
  v_site2 uuid := 'bbbbbbbb-bbbb-4bbb-8bbb-bbbbbbbbbbbb';
  v_cancelled_shift uuid;
  v_rows integer;
  v_minutes integer;
  v_rejected boolean;
  v_error text;
BEGIN
  -- 4 semanas ISO de 54 horas (6 dias x 9 h), 2 sedes, total mensual 216 h.
  -- Debe poder publicarse aunque el viejo trigger hubiera bloqueado en 186.
  INSERT INTO public.employee_shifts
    (employee_id, site_id, shift_date, start_time, end_time, published_at)
  SELECT v_e1,
    CASE WHEN extract(day from d.day_value)::integer % 2 = 0 THEN v_site1 ELSE v_site2 END,
    d.day_value::date, time '08:00', time '17:00', now()
  FROM generate_series(date '2026-11-02', date '2026-11-28', interval '1 day')
    AS d(day_value)
  WHERE extract(isodow from d.day_value) <= 6;

  SELECT count(*),
    coalesce(sum(extract(epoch from (end_time - start_time)) / 60), 0)::integer
  INTO v_rows, v_minutes
  FROM public.employee_shifts
  WHERE employee_id = v_e1 AND shift_date BETWEEN date '2026-11-01' AND date '2026-11-30';
  IF v_rows <> 24 OR v_minutes <> 216 * 60 THEN
    RAISE EXCEPTION 'FAIL: se esperaban 24 turnos y 216 horas, filas %, minutos %', v_rows, v_minutes;
  END IF;
  RAISE NOTICE 'PASS: 216 horas en noviembre, 2 sedes y semanas de 54 horas';

  -- 55 h semanales: rechazar, aunque solo se agregue 1 h al lunes (10 h ese dia).
  v_rejected := false;
  BEGIN
    INSERT INTO public.employee_shifts
      (employee_id, site_id, shift_date, start_time, end_time, published_at)
    VALUES (v_e1, v_site2, date '2026-11-02', time '17:00', time '18:00', now());
  EXCEPTION WHEN SQLSTATE 'P0001' THEN
    v_rejected := true;
    GET STACKED DIAGNOSTICS v_error = MESSAGE_TEXT;
  END;
  IF NOT v_rejected OR v_error NOT LIKE '%54 h%' THEN
    RAISE EXCEPTION 'FAIL: 55 h semanales no fueron rechazadas (mensaje %)', v_error;
  END IF;
  RAISE NOTICE 'PASS: 55 h semanales rechazadas';

  -- Defensa diaria general: 11 h aceptadas como techo tecnico; 12 h rechazadas.
  INSERT INTO public.employee_shifts
    (employee_id, site_id, shift_date, start_time, end_time, published_at)
  VALUES (v_e2, v_site1, date '2026-11-10', time '07:00', time '18:00', now());
  v_rejected := false;
  BEGIN
    INSERT INTO public.employee_shifts
      (employee_id, site_id, shift_date, start_time, end_time, published_at)
    VALUES (v_e2, v_site2, date '2026-11-10', time '18:00', time '19:00', now());
  EXCEPTION WHEN SQLSTATE 'P0001' THEN
    v_rejected := true;
    GET STACKED DIAGNOSTICS v_error = MESSAGE_TEXT;
  END;
  IF NOT v_rejected OR v_error NOT LIKE '%11 h%' THEN
    RAISE EXCEPTION 'FAIL: 12 h diarias no fueron rechazadas (mensaje %)', v_error;
  END IF;
  RAISE NOTICE 'PASS: 12 h diarias rechazadas';

  -- La misma semana ISO que termina el 1 de noviembre incluye el trabajo de octubre.
  INSERT INTO public.employee_shifts
    (employee_id, site_id, shift_date, start_time, end_time, published_at)
  SELECT v_e3, v_site1, d.day_value::date, time '08:00', time '17:00', now()
  FROM generate_series(date '2026-10-26', date '2026-10-31', interval '1 day')
    AS d(day_value);
  v_rejected := false;
  BEGIN
    INSERT INTO public.employee_shifts
      (employee_id, site_id, shift_date, start_time, end_time, published_at)
    VALUES (v_e3, v_site2, date '2026-11-01', time '08:00', time '09:00', now());
  EXCEPTION WHEN SQLSTATE 'P0001' THEN
    v_rejected := true;
    GET STACKED DIAGNOSTICS v_error = MESSAGE_TEXT;
  END;
  IF NOT v_rejected OR v_error NOT LIKE '%54 h%' THEN
    RAISE EXCEPTION 'FAIL: cruce de mes no preservo limite semanal (mensaje %)', v_error;
  END IF;
  RAISE NOTICE 'PASS: cruce de mes controla semana completa';

  -- Los borradores no se suman a las horas ya publicadas.
  INSERT INTO public.employee_shifts
    (employee_id, site_id, shift_date, start_time, end_time, published_at)
  VALUES (v_e4, v_site1, date '2026-11-16', time '00:00', time '23:00', NULL);
  INSERT INTO public.employee_shifts
    (employee_id, site_id, shift_date, start_time, end_time, published_at)
  VALUES (v_e4, v_site2, date '2026-11-16', time '08:00', time '15:00', now());
  SELECT count(*) INTO v_rows FROM public.employee_shifts
  WHERE employee_id = v_e4 AND published_at IS NOT NULL;
  IF v_rows <> 1 THEN
    RAISE EXCEPTION 'FAIL: la publicacion no separa borradores, %', v_rows;
  END IF;
  RAISE NOTICE 'PASS: borradores no cuentan como publicados';

  -- Un turno cancelado no cuenta, pero reactivarlo DEBE activar de nuevo controles.
  INSERT INTO public.employee_shifts
    (employee_id, site_id, shift_date, start_time, end_time, status, published_at)
  VALUES (v_e1, v_site2, date '2026-11-03', time '17:00', time '18:00',
          'cancelled', now())
  RETURNING id INTO v_cancelled_shift;
  v_rejected := false;
  BEGIN
    UPDATE public.employee_shifts SET status = 'scheduled'
    WHERE id = v_cancelled_shift;
  EXCEPTION WHEN SQLSTATE 'P0001' THEN
    v_rejected := true;
    GET STACKED DIAGNOSTICS v_error = MESSAGE_TEXT;
  END;
  IF NOT v_rejected OR v_error NOT LIKE '%54 h%' THEN
    RAISE EXCEPTION 'FAIL: reactivacion eludio tope semanal (mensaje %)', v_error;
  END IF;
  RAISE NOTICE 'PASS: reactivacion cancelada no evade validacion';

  -- Corregir/reducir horas publicadas no debe estar prohibido;
  -- liberar una hora permite reactivar una hora sin exceder 54 h.
  UPDATE public.employee_shifts
  SET end_time = time '16:00'
  WHERE employee_id = v_e1 AND shift_date = date '2026-11-02'
    AND start_time = time '08:00';
  GET DIAGNOSTICS v_rows = ROW_COUNT;
  IF v_rows <> 1 THEN
    RAISE EXCEPTION 'FAIL: correccion de turno publicado afecto % filas', v_rows;
  END IF;
  UPDATE public.employee_shifts SET status = 'scheduled'
  WHERE id = v_cancelled_shift;
  SELECT coalesce(sum(extract(epoch from (end_time - start_time)) / 60), 0)::integer
  INTO v_minutes
  FROM public.employee_shifts
  WHERE employee_id = v_e1
    AND shift_date BETWEEN date '2026-11-02' AND date '2026-11-08'
    AND status <> 'cancelled' AND shift_kind <> 'descanso' AND published_at IS NOT NULL;
  IF v_minutes <> 54 * 60 THEN
    RAISE EXCEPTION 'FAIL: correccion y reactivacion esperaban 54h, minutos %', v_minutes;
  END IF;
  RAISE NOTICE 'PASS: correccion reductora y reactivacion permitidas dentro del tope';

  -- La funcion bajo prueba no autoriza horas extra ni calcula nomina.
  RAISE NOTICE 'FIN QA EFIMERA: solo validacion tecnica SQL, no E2E ni PROD';
END;
$test$;

ROLLBACK;
