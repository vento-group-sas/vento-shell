-- VENTO_DB_TEST_CATEGORY: RPC
-- AUTH-DB-018::CORR-001 - PIN resolution on STAGING-equivalent QA.
-- Prerequisite: disposable QA restored from a staging-schema-equivalent
-- baseline, including role/RLS/trigger/grant topology. Never run on staging.
-- All synthetic identities and events are rolled back.
begin;
create extension if not exists pgtap with schema extensions;

-- Deterministic synthetic fixture with zero dependency on production accounts.
insert into auth.users(id,email)
values
  ('a0180000-0000-4000-8000-000000000001','qa-shared-device-owner@test.invalid'),
  ('a0180000-0000-4000-8000-000000000002','qa-shared-device-actor@test.invalid');

insert into public.apps(code,name,is_active)
values ('pulso','PULSO',true)
on conflict (code) do nothing;

insert into public.roles(code,name,is_active)
values ('qa_shared_pin_worker','QA Shared PIN Worker',true);

insert into public.sites(
  id,code,name,type,site_kind,is_active,operational_visibility
) values (
  'a0181000-0000-4000-8000-000000000001',
  'QA_A018_PIN_SITE','QA PIN Site','satellite','satellite',true,'test'
);

insert into public.employees(id,site_id,role,full_name,pin_code,is_active)
values(
  'a0180000-0000-4000-8000-000000000002',
  'a0181000-0000-4000-8000-000000000001',
  'qa_shared_pin_worker',
  'QA Synthetic PIN Actor','876543',true
);

insert into public.shared_operational_devices(
  id,code,label,device_type,auth_user_id,site_id,default_app_code,
  requires_actor_pin,allow_actor_without_pin,requires_active_actor_shift,
  activation_status,is_active
) values (
  'a0182000-0000-4000-8000-000000000001',
  'QA_A018_PIN_DEVICE','QA Synthetic POS Terminal','pos_terminal',
  'a0180000-0000-4000-8000-000000000001',
  'a0181000-0000-4000-8000-000000000001',
  'pulso',true,false,true,'active',true
);

insert into public.shared_operational_device_apps(device_id,app_code,is_active)
values('a0182000-0000-4000-8000-000000000001','pulso',true);

insert into public.shared_operational_device_actor_policies(
  device_id,policy_type,site_id,is_active
) values (
  'a0182000-0000-4000-8000-000000000001',
  'same_site_active_worker',
  'a0181000-0000-4000-8000-000000000001',
  true
);

insert into public.employee_shifts(
  id,employee_id,site_id,shift_date,start_time,end_time,
  published_at,status
) values (
  'a0183000-0000-4000-8000-000000000001',
  'a0180000-0000-4000-8000-000000000002',
  'a0181000-0000-4000-8000-000000000001',
  (now() at time zone 'America/Bogota')::date,
  '00:00'::time,'23:59'::time,now(),'scheduled'
);

insert into public.attendance_logs(employee_id,site_id,shift_id,action,source)
values (
  'a0180000-0000-4000-8000-000000000002',
  'a0181000-0000-4000-8000-000000000001',
  'a0183000-0000-4000-8000-000000000001',
  'check_in','system'
);

select extensions.plan(17);

select extensions.ok(
  pg_catalog.to_regprocedure(
    'public.sign_shared_device_action(uuid,text,text,text,text,uuid,text,integer,jsonb)'
  ) is not null,'same existing callable identity'
);

select extensions.is(
  (select p.prosecdef from pg_catalog.pg_proc p where
    p.oid='public.sign_shared_device_action(uuid,text,text,text,text,uuid,text,integer,jsonb)'::regprocedure),
  true, 'security definer status retained'
);

select extensions.is(
  (select pg_catalog.pg_get_userbyid(p.proowner)
     from pg_catalog.pg_proc p where
     p.oid='public.sign_shared_device_action(uuid,text,text,text,text,uuid,text,integer,jsonb)'::regprocedure),
  'postgres', 'owner remains postgres'
);

select extensions.ok(
  pg_catalog.has_function_privilege(
    'authenticated',
    'public.sign_shared_device_action(uuid,text,text,text,text,uuid,text,integer,jsonb)',
    'EXECUTE'
  ),'authenticated caller retains signature RPC access'
);

select extensions.ok(
  not pg_catalog.has_function_privilege(
    'anon',
    'public.sign_shared_device_action(uuid,text,text,text,text,uuid,text,integer,jsonb)',
    'EXECUTE'
  ),'anon cannot request shared-device actor signatures'
);

select extensions.ok(
  pg_catalog.strpos(
    pg_catalog.pg_get_functiondef(
      'public.sign_shared_device_action(uuid,text,text,text,text,uuid,text,integer,jsonb)'::regprocedure
    ),
    'current_actor_shift_for_shared_device_v1(' ||
       pg_catalog.chr(10) || '    v_actor.id,'
  ) > 0,'shift is resolved with PIN-verified actor'
);

select extensions.ok(
  pg_catalog.strpos(
    pg_catalog.pg_get_functiondef(
      'public.sign_shared_device_action(uuid,text,text,text,text,uuid,text,integer,jsonb)'::regprocedure
    ),
    'v_device.id,' || pg_catalog.chr(10) || '    v_actor.id,'
  ) > 0,'device actor policy uses resolved worker identity'
);

-- Simulate a device JWT without storing real credentials. The function itself
-- verifies auth.uid, PIN, the active device/app, and an active check-in.
select pg_catalog.set_config(
 'request.jwt.claim.sub','a0180000-0000-4000-8000-000000000001',true
);

create temporary table qa_auth_018_pin_result on commit drop as
select * from public.sign_shared_device_action(
  null::uuid,'876543','pulso','pos.loyalty.validate_redemption',
  'pass.loyalty_redemptions',null::uuid,'pin',300,'{}'::jsonb
);

select extensions.is(
  (select actor_employee_id from qa_auth_018_pin_result),
  'a0180000-0000-4000-8000-000000000002'::uuid,
  'NULL actor parameter resolves to the PIN-verified actor'
);

select extensions.ok(
  (select signature_id is not null and expires_at > pg_catalog.now()
   from qa_auth_018_pin_result),
  'result provides durable signature id and expiration'
);

select extensions.is(
  (select actor_shift_id from qa_auth_018_pin_result),
  'a0183000-0000-4000-8000-000000000001'::uuid,
  'PIN-resolved actor keeps active shift on shift-required POS'
);

select extensions.is(
  (select count(*) from public.shared_device_actor_signatures
    where shared_device_id='a0182000-0000-4000-8000-000000000001'
      and actor_employee_id='a0180000-0000-4000-8000-000000000002'),
  1::bigint, 'signature belongs to actual worker, not shared device'
);

select extensions.is(
  (select count(*) from public.shared_operational_device_events
    where device_id='a0182000-0000-4000-8000-000000000001'
      and event_type='actor_signature_created'),
  1::bigint,'audit event exists for successful worker PIN'
);

select extensions.throws_ok(
 $$select * from public.sign_shared_device_action(
   null::uuid,null::text,'pulso','pos.loyalty.validate_redemption',
   'pass.loyalty_redemptions',null::uuid,'pin',300,'{}'::jsonb
 )$$,'22023','ACTOR_PIN_REQUIRED','missing PIN is denied before resolution'
);

select extensions.throws_ok(
 $$select * from public.sign_shared_device_action(
   null::uuid,'111111','pulso','pos.loyalty.validate_redemption',
   'pass.loyalty_redemptions',null::uuid,'pin',300,'{}'::jsonb
 )$$,'28000','ACTIVE_ACTOR_REQUIRED','unknown PIN fails closed'
);

select extensions.throws_ok(
 $$select * from public.sign_shared_device_action(
   'a0180000-0000-4000-8000-000000000002'::uuid,'111111',
   'pulso','pos.loyalty.validate_redemption','pass.loyalty_redemptions',
   null::uuid,'pin',300,'{}'::jsonb
 )$$,'28000','INVALID_ACTOR_PIN','explicit actor cannot override PIN'
);

select extensions.is(
  (select actor_employee_id from public.sign_shared_device_action(
   'a0180000-0000-4000-8000-000000000002'::uuid,'876543',
   'pulso','pos.loyalty.validate_redemption','pass.loyalty_redemptions',
   null::uuid,'pin',300,'{}'::jsonb)),
  'a0180000-0000-4000-8000-000000000002'::uuid,
  'existing explicit actor+correct PIN flow remains valid'
);

select extensions.is(
  (select count(*) from public.shared_device_actor_signatures
    where shared_device_id='a0182000-0000-4000-8000-000000000001'),
  2::bigint, 'failed PIN attempts created no signatures'
);

select * from extensions.finish();
rollback;
