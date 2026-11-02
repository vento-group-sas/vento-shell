-- QA EFIMERA: prueba de publicación mensual por UPDATE de muchas filas.
-- No modifica ningún Supabase hospedado. Debe fallar íntegramente sin autorización.
BEGIN;
DO $batch$
DECLARE
  employee uuid := '44444444-4444-4444-8444-444444444444';
  actor uuid := 'aaaaaaaa-aaaa-4aaa-8aaa-aaaaaaaaaaaa';
  site_a uuid := 'bbbbbbbb-bbbb-4bbb-8bbb-bbbbbbbbbbbb';
  site_b uuid := 'cccccccc-cccc-4ccc-8ccc-cccccccccccc';
  blocked boolean := false;
  published_rows integer;
  total_minutes integer;
BEGIN
  INSERT INTO public.viso_labor_terms(
    employee_id,effective_week,ordinary_weekly_minutes,ordinary_daily_minutes,
    flexible_daily_agreement,agreement_reference,recorded_by
  ) VALUES (
    employee,date '2026-11-02',2520,480,false,'PRACTICA-BATCH-42H',actor
  );

  INSERT INTO public.employee_shifts(
    employee_id,site_id,shift_date,start_time,end_time,published_at
  )
  SELECT employee,CASE WHEN d%2=0 THEN site_a ELSE site_b END,
         date '2026-11-02'+d,time '08:00',time '17:00',null
    FROM generate_series(0,5) d;

  BEGIN
    UPDATE public.employee_shifts
       SET published_at = clock_timestamp()
     WHERE employee_id = employee
       AND shift_date BETWEEN date '2026-11-02' AND date '2026-11-08'
       AND published_at IS NULL;
  EXCEPTION WHEN SQLSTATE 'P0001' THEN blocked := true;
  END;
  SELECT count(*) INTO published_rows
  FROM public.employee_shifts WHERE employee_id=employee AND published_at IS NOT NULL;
  IF NOT blocked OR published_rows <> 0 THEN
    RAISE EXCEPTION 'FAIL: publicación masiva parcial o sin autorización (rows %)',published_rows;
  END IF;
  RAISE NOTICE 'PASS: UPDATE de seis borradores es atómico y denegado sin autorización';

  INSERT INTO public.viso_weekly_overtime_decisions(
    employee_id,week_start,decision,authorized_minutes,reason,approval_reference,recorded_by
  )
  VALUES (employee,date '2026-11-02','approve',720,
    'Aprobación de extensión semanal','AUT-BATCH-12H',actor);

  UPDATE public.employee_shifts
     SET published_at = clock_timestamp()
   WHERE employee_id = employee
     AND shift_date BETWEEN date '2026-11-02' AND date '2026-11-08'
     AND published_at IS NULL;

  SELECT count(*),
         coalesce(sum(extract(epoch from(end_time-start_time))/60),0)::integer
    INTO published_rows,total_minutes
  FROM public.employee_shifts WHERE employee_id=employee AND published_at IS NOT NULL;
  IF published_rows <> 6 OR total_minutes <> 3240 THEN
    RAISE EXCEPTION 'FAIL: seis borradores deben publicarse íntegros como 54 h, filas %, minutos %',
      published_rows,total_minutes;
  END IF;
  RAISE NOTICE 'PASS: seis turnos de dos sedes publicados por un solo UPDATE (54 h autorizadas)';
END;
$batch$;
ROLLBACK;
