-- VPROC-0007: verificar rollback al guard ORIGINAL (186 h/mes) en BD efímera.
-- PRECONDICIÓN: los dos SQL candidatos cargados y luego SQL rollback original
-- del expediente, con trigger conservado. NUNCA ejecutar en producción.
BEGIN;

DO $qa$
DECLARE
  v_employee_block uuid := '11111111-1111-4111-8111-111111111111';
  v_employee_allow uuid := '22222222-2222-4222-8222-222222222222';
  v_actor uuid := 'aaaaaaaa-aaaa-4aaa-8aaa-aaaaaaaaaaaa';
  v_site uuid := 'bbbbbbbb-bbbb-4bbb-8bbb-bbbbbbbbbbbb';
  v_rejected boolean := false;
  v_count integer;
BEGIN
  IF position('v_limit_minutes constant integer := 11160' IN
    pg_get_functiondef('public.viso_enforce_monthly_schedule_publish_limit()'::regprocedure)) = 0
  THEN
    RAISE EXCEPTION 'FAIL: la función restaurada no contiene el guard original de 186 h';
  END IF;

  IF (SELECT count(*) FROM pg_trigger
      WHERE tgrelid = 'public.employee_shifts'::regclass
        AND tgname = 'trg_viso_monthly_schedule_publish_limit'
        AND NOT tgisinternal) <> 1
  THEN
    RAISE EXCEPTION 'FAIL: el rollback reemplazó o duplicó el trigger';
  END IF;

  INSERT INTO public.viso_labor_terms (
    employee_id,effective_week,ordinary_weekly_minutes,ordinary_daily_minutes,
    flexible_daily_agreement,agreement_reference,recorded_by
  ) VALUES (
    v_employee_block,DATE '2026-11-02',2520,480,FALSE,'SOPORTE-SINTETICO-001',v_actor
  );

  INSERT INTO public.viso_weekly_overtime_decisions (
    employee_id,week_start,decision,authorized_minutes,reason,approval_reference,recorded_by
  ) VALUES (
    v_employee_block,DATE '2026-11-02','approve',360,
    'Aprobación de ensayo aislado','APR-SINTETICA-001',v_actor
  );

  -- 24 días * 8h = 192h; rollback a 186 debe rechazar toda publicación.
  INSERT INTO public.employee_shifts (
    employee_id,site_id,shift_date,start_time,end_time,published_at
  )
  SELECT v_employee_block,v_site,DATE '2026-11-01'+d,TIME '08:00',TIME '16:00',NULL
  FROM generate_series(0,23) AS d;

  BEGIN
    UPDATE public.employee_shifts SET published_at = clock_timestamp()
    WHERE employee_id = v_employee_block AND shift_date = DATE '2026-11-01';
  EXCEPTION WHEN SQLSTATE 'P0001' THEN
    v_rejected := TRUE;
  END;
  IF NOT v_rejected THEN
    RAISE EXCEPTION 'FAIL: rollback permitió publicar 192 h';
  END IF;
  SELECT count(*) INTO v_count FROM public.employee_shifts
  WHERE employee_id = v_employee_block AND published_at IS NOT NULL;
  IF v_count <> 0 THEN
    RAISE EXCEPTION 'FAIL: rollback dejó publicación parcial del trabajador bloqueado';
  END IF;
  RAISE NOTICE 'PASS: regla de 186 h restaurada; 192 h rechazadas sin publicación parcial';

  -- 23 días * 8h = 184h; la regla anterior debe permitir publicarlo.
  INSERT INTO public.employee_shifts (
    employee_id,site_id,shift_date,start_time,end_time,published_at
  )
  SELECT v_employee_allow,v_site,DATE '2026-11-01'+d,TIME '08:00',TIME '16:00',NULL
  FROM generate_series(0,22) AS d;

  UPDATE public.employee_shifts SET published_at = clock_timestamp()
  WHERE employee_id = v_employee_allow AND shift_date = DATE '2026-11-01';

  SELECT count(*) INTO v_count FROM public.employee_shifts
  WHERE employee_id = v_employee_allow AND published_at IS NOT NULL;
  IF v_count <> 1 THEN
    RAISE EXCEPTION 'FAIL: rollback rechazó programación de 184 h';
  END IF;
  RAISE NOTICE 'PASS: regla restaurada permite 184 h como antes';

  IF (SELECT count(*) FROM public.viso_labor_terms
      WHERE employee_id=v_employee_block) <> 1
    OR (SELECT count(*) FROM public.viso_weekly_overtime_decisions
      WHERE employee_id=v_employee_block) <> 1
  THEN
    RAISE EXCEPTION 'FAIL: el rollback eliminó evidencia contractual o decisión auditada';
  END IF;
  RAISE NOTICE 'PASS: tablas de contratos, decisiones y trigger intactos tras rollback';
END;
$qa$;
ROLLBACK;
