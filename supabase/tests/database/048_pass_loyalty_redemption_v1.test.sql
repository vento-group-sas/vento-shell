-- VENTO_DB_TEST_CATEGORY: RPC
-- PASS/PULSO redemption v1: synthetic, rollback-only source test.
-- No users, orders, money or points are changed outside this transaction.
begin;
create extension if not exists pgtap with schema extensions;

insert into auth.users(id,email)
values ('b0080000-0000-0000-0000-000000000001','pass-redemption-v1-client@test.local')
on conflict(id) do nothing;

insert into public.users(id,full_name,email,role,is_active,loyalty_points,is_client)
values (
  'b0080000-0000-0000-0000-000000000001',
  'PASS Redemption Synthetic Client',
  'pass-redemption-v1-client@test.local','client',true,80,true
)
on conflict(id) do update set is_active=true,loyalty_points=80;

insert into public.sites(id,code,name,type,site_kind,is_active)
values (
  'b0081000-0000-0000-0000-000000000001',
  'PASS_REDEMPTION_TEST_SITE',
  'PASS Redemption Test Site','satellite','satellite',true
)
on conflict(id) do nothing;

insert into pass.loyalty_rewards(id,code,name,points_cost,is_active,site_id)
values (
  'b0082000-0000-0000-0000-000000000001',
  'PASS_REDEMPTION_TEST_REWARD',
  'PASS Redemption Test Reward',25,true,
  'b0081000-0000-0000-0000-000000000001'
)
on conflict(id) do nothing;

create temporary table pass_redemption_v1_fixture(
  request_id uuid,
  ticket jsonb
) on commit drop;
grant select,insert,update on table pass_redemption_v1_fixture to authenticated;

select plan(21);

select ok(to_regclass('pass.redemption_requests') is not null,
  'server-issued redemption requests are stored durably');
select ok(exists(
  select 1 from information_schema.columns
  where table_schema='pass' and table_name='loyalty_redemptions'
    and column_name='expires_at'
), 'ticket expiration column exists');
select ok((
  select relrowsecurity from pg_class where oid='pass.redemption_requests'::regclass
), 'idempotency requests are RLS-protected');

select ok(to_regprocedure('api.pass_issue_redemption_request_v1(uuid,uuid,integer)') is not null,
  'public API can issue request identifiers');
select ok(to_regprocedure('api.pass_create_redemption_intent_v1(uuid,uuid,uuid,integer)') is not null,
  'public API can create a pending ticket');
select ok(to_regprocedure('api.pass_validate_redemption_v1(text,uuid)') is not null,
  'PULSO can validate via API facade');
select ok(to_regprocedure('api.pass_consume_redemption_v1(uuid,uuid,uuid,uuid)') is not null,
  'PULSO can consume via API facade');
select ok(to_regprocedure('api.pass_cancel_redemption_intent_v1(uuid)') is not null,
  'PASS can release an unused reservation');

select ok(not has_function_privilege(
  'anon','api.pass_consume_redemption_v1(uuid,uuid,uuid,uuid)','EXECUTE'
), 'anon cannot consume points');
select ok(has_function_privilege(
  'authenticated','api.pass_consume_redemption_v1(uuid,uuid,uuid,uuid)','EXECUTE'
), 'authenticated can invoke guarded operation');
select ok(not has_table_privilege(
  'authenticated','pass.redemption_requests','INSERT'
), 'the mobile cannot create request rows directly');
select ok(exists(
  select 1 from pg_indexes
  where schemaname='pass' and tablename='loyalty_redemptions'
    and indexname='loyalty_redemptions_qr_code_v1_key'
), 'ticket QR has a unique index');

set local role authenticated;
set local request.jwt.claim.sub='b0080000-0000-0000-0000-000000000001';

insert into pass_redemption_v1_fixture(request_id)
select (api.pass_issue_redemption_request_v1(
  'b0082000-0000-0000-0000-000000000001',
  'b0081000-0000-0000-0000-000000000001',
  25
)->>'request_id')::uuid;

select ok(
  (select request_id is not null from pass_redemption_v1_fixture limit 1),
  'client gets a server-issued durable request id'
);

update pass_redemption_v1_fixture
  set ticket=api.pass_create_redemption_intent_v1(
    request_id,
    'b0082000-0000-0000-0000-000000000001',
    'b0081000-0000-0000-0000-000000000001',
    25
  );

select ok(
  (select ticket->>'redemption_id' is not null
    and (ticket->>'qr_code') like 'VENTO-%'
    from pass_redemption_v1_fixture limit 1),
  'intent creates server QR and pending redemption'
);

select ok(
  (select api.pass_create_redemption_intent_v1(
    request_id,
    'b0082000-0000-0000-0000-000000000001',
    'b0081000-0000-0000-0000-000000000001',
    25
  )=ticket from pass_redemption_v1_fixture limit 1),
  'replay of same request returns identical durable ticket'
);

select is(
  (select loyalty_points from public.users
   where id='b0080000-0000-0000-0000-000000000001'),
  80,
  'reserving points does not debit before POS confirms consumption'
);

select is(
  (select count(*) from pass.loyalty_transactions
   where user_id='b0080000-0000-0000-0000-000000000001'
      and kind='spend'),
  0::bigint,
  'intent creation does not insert spend ledger'
);

select throws_ok(
  format(
    'select api.pass_consume_redemption_v1(%L::uuid,%L::uuid,null::uuid,null::uuid)',
    (select ticket->>'redemption_id' from pass_redemption_v1_fixture limit 1),
    'b0081000-0000-0000-0000-000000000001'
  ),
  '42501','PERMISSION_DENIED',
  'ordinary client cannot consume an intent as a PULSO worker'
);

select is(
  (select api.pass_cancel_redemption_intent_v1(request_id)->>'status'
   from pass_redemption_v1_fixture limit 1),
  'cancelled',
  'the owner can cancel an unused reservation'
);

select is(
  (select status from pass.loyalty_redemptions
   where id=(select (ticket->>'redemption_id')::uuid
             from pass_redemption_v1_fixture limit 1)),
  'cancelled',
  'cancellation also transitions the ticket'
);

select is(
  (select count(*) from pass.loyalty_transactions
   where user_id='b0080000-0000-0000-0000-000000000001'
     and kind='spend'),
  0::bigint,
  'cancellation of a reservation does not create a monetary or ledger effect'
);

select * from finish();
rollback;
