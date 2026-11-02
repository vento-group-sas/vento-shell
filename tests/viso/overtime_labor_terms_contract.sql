-- VPROC-0007: PostgreSQL 16/17 efímero y datos sintéticos, SIN PROD.
-- El trigger se instala SOBRE el fixture de employee_shifts, no sobre PROD.
CREATE TRIGGER trg_viso_monthly_schedule_publish_limit
BEFORE INSERT OR UPDATE OF published_at, employee_id, shift_date,
  start_time, end_time, break_minutes, shift_kind, status
ON public.employee_shifts
FOR EACH ROW EXECUTE FUNCTION public.viso_enforce_monthly_schedule_publish_limit();

BEGIN;
DO $qa$
DECLARE
 actor uuid := 'aaaaaaaa-aaaa-4aaa-8aaa-aaaaaaaaaaaa';
 e1 uuid := '11111111-1111-4111-8111-111111111111';
 e2 uuid := '22222222-2222-4222-8222-222222222222';
 e3 uuid := '33333333-3333-4333-8333-333333333333';
 site1 uuid := 'bbbbbbbb-bbbb-4bbb-8bbb-bbbbbbbbbbbb';
 site2 uuid := 'cccccccc-cccc-4ccc-8ccc-cccccccccccc';
 denied boolean;
BEGIN
 IF has_table_privilege('authenticated','public.viso_labor_terms','SELECT')
    OR has_table_privilege('authenticated','public.viso_weekly_overtime_decisions','INSERT') THEN
  RAISE EXCEPTION 'FAIL: exposición de datos laborales';
 END IF;
 RAISE NOTICE 'PASS: solo el backend puede leer y autorizar';

 denied := false;
 BEGIN
  INSERT INTO public.employee_shifts(employee_id,site_id,shift_date,start_time,end_time,published_at)
  VALUES(e1,site1,'2026-11-02','08:00','16:00',now());
 EXCEPTION WHEN SQLSTATE 'P0001' THEN denied:=true;
 END;
 IF NOT denied THEN RAISE EXCEPTION 'FAIL: publicación sin acuerdo'; END IF;
 RAISE NOTICE 'PASS: falta de contrato rechaza publicación';

 INSERT INTO public.viso_labor_terms(employee_id,effective_week,ordinary_weekly_minutes,ordinary_daily_minutes,flexible_daily_agreement,agreement_reference,recorded_by)
 VALUES(e1,'2026-11-02',2160,480,false,'CONTRATO-36H',actor);
 denied:=false;
 BEGIN
  INSERT INTO public.viso_labor_terms(employee_id,effective_week,ordinary_weekly_minutes,ordinary_daily_minutes,flexible_daily_agreement,agreement_reference,recorded_by)
  VALUES(e1,'2026-11-03',2160,480,false,'FECHA-INVALIDA',actor);
 EXCEPTION WHEN SQLSTATE '23514' THEN denied:=true;
 END;
 IF NOT denied THEN RAISE EXCEPTION 'FAIL: término sin fecha lunes'; END IF;
 RAISE NOTICE 'PASS: vigencia inicia lunes y contrato no se infiere';

 INSERT INTO public.employee_shifts(employee_id,site_id,shift_date,start_time,end_time,published_at)
 SELECT e1,CASE WHEN d%2=0 THEN site1 ELSE site2 END,
        date '2026-11-02'+d,'08:00','16:00',now()
 FROM generate_series(0,3) d;
 denied:=false;
 BEGIN
  INSERT INTO public.employee_shifts(employee_id,site_id,shift_date,start_time,end_time,published_at)
  VALUES(e1,site2,'2026-11-06','08:00','16:00',now());
 EXCEPTION WHEN SQLSTATE 'P0001' THEN denied:=true;
 END;
 IF NOT denied THEN RAISE EXCEPTION 'FAIL: más de 36h sin autorización'; END IF;
 RAISE NOTICE 'PASS: jornada individual y dos sedes exigen aprobación';

 INSERT INTO public.viso_weekly_overtime_decisions(employee_id,week_start,decision,authorized_minutes,reason,approval_reference,recorded_by)
 VALUES(e1,'2026-11-02','approve',240,'Cobertura extraordinaria','AUT-4H',actor);
 INSERT INTO public.employee_shifts(employee_id,site_id,shift_date,start_time,end_time,published_at)
 VALUES(e1,site2,'2026-11-06','08:00','16:00',now());
 denied:=false;
 BEGIN
  INSERT INTO public.employee_shifts(employee_id,site_id,shift_date,start_time,end_time,published_at)
  VALUES(e1,site1,'2026-11-06','16:00','18:00',now());
 EXCEPTION WHEN SQLSTATE 'P0001' THEN denied:=true;
 END;
 IF NOT denied THEN RAISE EXCEPTION 'FAIL: aprobación insuficiente'; END IF;
 RAISE NOTICE 'PASS: autorización de 4h no permite 6h';

 INSERT INTO public.viso_weekly_overtime_decisions(employee_id,week_start,decision,authorized_minutes,reason,approval_reference,recorded_by)
 VALUES(e1,'2026-11-02','approve',360,'Ampliación de cobertura','AUT-6H',actor);
 INSERT INTO public.employee_shifts(employee_id,site_id,shift_date,start_time,end_time,published_at)
 VALUES(e1,site1,'2026-11-06','16:00','18:00',now());
 denied:=false;
 BEGIN
  INSERT INTO public.employee_shifts(employee_id,site_id,shift_date,start_time,end_time,published_at)
  VALUES(e1,site1,'2026-11-06','18:00','19:00',now());
 EXCEPTION WHEN SQLSTATE 'P0001' THEN denied:=true;
 END;
 IF NOT denied THEN RAISE EXCEPTION 'FAIL: más de 2h extra/día'; END IF;
 RAISE NOTICE 'PASS: actualización de aprobación; límite diario pactado +2h';

 INSERT INTO public.viso_labor_terms(employee_id,effective_week,ordinary_weekly_minutes,ordinary_daily_minutes,flexible_daily_agreement,agreement_reference,recorded_by)
 VALUES(e2,'2026-11-02',2520,480,false,'CONTRATO-42H',actor);
 INSERT INTO public.employee_shifts(employee_id,site_id,shift_date,start_time,end_time,published_at)
 SELECT e2,site1,date '2026-11-02'+d,'08:00','09:00',now()
 FROM generate_series(0,5) d;
 denied:=false;
 BEGIN
  INSERT INTO public.employee_shifts(employee_id,site_id,shift_date,start_time,end_time,published_at)
  VALUES(e2,site2,'2026-11-08','08:00','09:00',now());
 EXCEPTION WHEN SQLSTATE 'P0001' THEN denied:=true;
 END;
 IF NOT denied THEN RAISE EXCEPTION 'FAIL: séptimo día'; END IF;
 RAISE NOTICE 'PASS: máximo seis días laborales por semana';

 INSERT INTO public.viso_labor_terms(employee_id,effective_week,ordinary_weekly_minutes,ordinary_daily_minutes,flexible_daily_agreement,agreement_reference,recorded_by)
 VALUES(e3,'2026-11-02',2520,480,false,'CONTRATO-42C',actor);
 denied:=false;
 BEGIN
  INSERT INTO public.employee_shifts(employee_id,site_id,shift_date,start_time,end_time,published_at)
  VALUES(e3,site1,'2026-11-03','08:00','17:00',now());
 EXCEPTION WHEN SQLSTATE 'P0001' THEN denied:=true;
 END;
 IF NOT denied THEN RAISE EXCEPTION 'FAIL: hora diaria extra sin permiso'; END IF;
 INSERT INTO public.viso_weekly_overtime_decisions(employee_id,week_start,decision,authorized_minutes,reason,approval_reference,recorded_by)
 VALUES(e3,'2026-11-02','approve',60,'Extensión diaria puntual','AUT-DIA',actor);
 INSERT INTO public.employee_shifts(employee_id,site_id,shift_date,start_time,end_time,published_at)
 VALUES(e3,site1,'2026-11-03','08:00','17:00',now());
 RAISE NOTICE 'PASS: extra diario requiere autorización aun bajo 42h semanales';

 INSERT INTO public.viso_weekly_overtime_decisions(employee_id,week_start,decision,authorized_minutes,reason,approval_reference,recorded_by)
 VALUES(e3,'2026-11-02','revoke',0,'Revocación expresa del permiso','REV-DIA',actor);
 denied:=false;
 BEGIN
  INSERT INTO public.employee_shifts(employee_id,site_id,shift_date,start_time,end_time,published_at)
  VALUES(e3,site2,'2026-11-04','08:00','09:00',now());
 EXCEPTION WHEN SQLSTATE 'P0001' THEN denied:=true;
 END;
 IF NOT denied THEN RAISE EXCEPTION 'FAIL: revocación no respetada'; END IF;
 RAISE NOTICE 'PASS: revocación efectiva y auditada en nuevas publicaciones';

 denied:=false;
 BEGIN
  UPDATE public.viso_labor_terms SET ordinary_weekly_minutes=2520 WHERE employee_id=e1;
 EXCEPTION WHEN SQLSTATE 'P0001' THEN denied:=true;
 END;
 IF NOT denied THEN RAISE EXCEPTION 'FAIL: registros históricos editables'; END IF;
 RAISE NOTICE 'PASS: registro laboral inmutable y versionable';
END;
$qa$;
ROLLBACK;
