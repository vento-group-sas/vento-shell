-- PASS/PULSO - shared loyalty redemption contract v1 (EXPAND only).
-- Owner: VENTO Shell. Target: staging candidate. No external POS integration.
-- The legacy direct-write RLS paths are intentionally NOT removed here:
-- their controlled retirement requires the PASS/PULSO consumer cutover and
-- replacement of the historical GAP-PKG-002 assertions in a separate phase.
-- No permission assignment or commercial activation is made by this migration.

begin;

alter table pass.loyalty_redemptions
  add column if not exists expires_at timestamptz;

create unique index if not exists loyalty_redemptions_qr_code_v1_key
  on pass.loyalty_redemptions (qr_code)
  where qr_code is not null;

create table if not exists pass.redemption_requests (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  reward_id uuid not null references pass.loyalty_rewards(id) on delete restrict,
  site_id uuid not null references public.sites(id) on delete restrict,
  expected_points_cost integer not null check (expected_points_cost > 0),
  status text not null default 'issued'
    check (status in ('issued','reserved','consumed','cancelled')),
  redemption_id uuid unique references pass.loyalty_redemptions(id) on delete restrict,
  ledger_transaction_id uuid unique references pass.loyalty_transactions(id) on delete restrict,
  expires_at timestamptz not null default (now() + interval '5 minutes'),
  consumed_by uuid references auth.users(id) on delete set null,
  consumed_signature_id uuid references public.shared_device_actor_signatures(id) on delete set null,
  consumed_order_id uuid references public.orders(id) on delete set null,
  consumed_at timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  constraint redemption_requests_effect_coherence_v1 check (
    (status = 'issued' and redemption_id is null and ledger_transaction_id is null)
    or (status = 'reserved' and redemption_id is not null and ledger_transaction_id is null)
    or (status = 'consumed' and redemption_id is not null and ledger_transaction_id is not null)
    or (status = 'cancelled' and ledger_transaction_id is null)
  )
);

create index if not exists redemption_requests_customer_state_v1_idx
  on pass.redemption_requests(user_id, status, expires_at);

create unique index if not exists loyalty_transactions_redemption_request_v1_unique
  on pass.loyalty_transactions ((metadata ->> 'redemption_request_id'))
  where kind = 'spend' and metadata ? 'redemption_request_id';

alter table pass.redemption_requests enable row level security;
revoke all on table pass.redemption_requests from public, anon, authenticated;

-- Private domain functions: not part of the configured Data API schemas.
-- Each checks auth.uid() and/or a specific operational permission. The API
-- exposes only SECURITY INVOKER wrappers in the existing "api" schema.

create or replace function pass.pass_issue_redemption_request_v1(
  p_reward_id uuid,
  p_site_id uuid,
  p_expected_points_cost integer
) returns jsonb language plpgsql security definer
set search_path = pg_catalog
as $issue$
declare
  v_user uuid := auth.uid();
  v_cost integer;
  v_reward_site uuid;
  v_active boolean;
  v_request uuid;
begin
  if v_user is null then raise exception 'AUTH_REQUIRED' using errcode='28000'; end if;
  if p_reward_id is null or p_site_id is null
      or coalesce(p_expected_points_cost,0) <= 0 then
    raise exception 'INVALID_REDEMPTION_REQUEST' using errcode='22023';
  end if;

  if not exists (
    select 1 from public.users u where u.id=v_user and u.is_active is true
  ) then
    raise exception 'CLIENT_NOT_ACTIVE' using errcode='42501';
  end if;

  if not exists (
    select 1 from public.sites s where s.id=p_site_id and s.is_active is true
  ) then
    raise exception 'SITE_NOT_ACTIVE' using errcode='42501';
  end if;

  select r.points_cost,r.site_id,r.is_active
    into v_cost,v_reward_site,v_active
    from pass.loyalty_rewards r where r.id=p_reward_id;

  if not found or not coalesce(v_active,false)
     or v_cost is distinct from p_expected_points_cost
     or (v_reward_site is not null and v_reward_site <> p_site_id) then
    raise exception 'REWARD_NOT_ELIGIBLE' using errcode='42501';
  end if;

  insert into pass.redemption_requests(
    user_id,reward_id,site_id,expected_points_cost
  ) values (v_user,p_reward_id,p_site_id,p_expected_points_cost)
  returning id into v_request;

  return pg_catalog.jsonb_build_object(
    'request_id',v_request,'status','issued'
  );
end;
$issue$;

create or replace function pass.pass_create_redemption_intent_v1(
  p_request_id uuid,
  p_reward_id uuid,
  p_site_id uuid,
  p_expected_points_cost integer
) returns jsonb language plpgsql security definer
set search_path = pg_catalog
as $create_intent$
declare
  v_user uuid := auth.uid();
  v_request pass.redemption_requests%rowtype;
  v_redemption pass.loyalty_redemptions%rowtype;
  v_reward pass.loyalty_rewards%rowtype;
  v_balance integer;
  v_reserved bigint;
  v_expiry timestamptz;
  v_qr text;
begin
  if v_user is null then raise exception 'AUTH_REQUIRED' using errcode='28000'; end if;
  if p_request_id is null or p_site_id is null or p_reward_id is null
     or coalesce(p_expected_points_cost,0) <= 0 then
    raise exception 'INVALID_REDEMPTION_REQUEST' using errcode='22023';
  end if;

  select * into v_request
    from pass.redemption_requests rr
    where rr.id=p_request_id and rr.user_id=v_user
    for update;

  if not found then
    raise exception 'REQUEST_NOT_FOUND' using errcode='42501';
  end if;
  if v_request.reward_id is distinct from p_reward_id
     or v_request.site_id is distinct from p_site_id
     or v_request.expected_points_cost is distinct from p_expected_points_cost then
    raise exception 'IDEMPOTENCY_KEY_CONFLICT' using errcode='23505';
  end if;

  if v_request.status='reserved' and v_request.redemption_id is not null then
    select * into v_redemption from pass.loyalty_redemptions r
      where r.id=v_request.redemption_id;
    if not found or v_redemption.status <> 'pending'
       or v_request.expires_at <= pg_catalog.now()
       or v_redemption.expires_at <= pg_catalog.now() then
      raise exception 'REDEMPTION_EXPIRED_OR_INCONSISTENT' using errcode='42501';
    end if;
    return pg_catalog.jsonb_build_object(
      'redemption_id',v_redemption.id,'qr_code',v_redemption.qr_code,
      'status','pending','expires_at',v_redemption.expires_at,
      'reservation_mode','hold_until_consumed'
    );
  end if;
  if v_request.status <> 'issued' or v_request.expires_at <= pg_catalog.now() then
    raise exception 'REQUEST_NOT_CONSUMABLE' using errcode='42501';
  end if;

  select * into v_reward from pass.loyalty_rewards r where r.id=p_reward_id;
  if not found or not v_reward.is_active
     or v_reward.points_cost <> p_expected_points_cost
     or (v_reward.site_id is not null and v_reward.site_id <> p_site_id) then
    raise exception 'REWARD_NOT_ELIGIBLE' using errcode='42501';
  end if;
  if not exists (
    select 1 from public.sites s where s.id=p_site_id and s.is_active is true
  ) then
    raise exception 'SITE_NOT_ACTIVE' using errcode='42501';
  end if;

  -- Serialize all new reservations for this client behind the balance row.
  select u.loyalty_points into v_balance from public.users u
    where u.id=v_user and u.is_active is true for update;
  if not found then raise exception 'CLIENT_NOT_ACTIVE' using errcode='42501'; end if;

  select coalesce(sum(rr.expected_points_cost),0)
    into v_reserved
    from pass.redemption_requests rr
    where rr.user_id=v_user and rr.status='reserved'
      and rr.expires_at > pg_catalog.now();

  if coalesce(v_balance,0)::bigint-v_reserved < p_expected_points_cost then
    raise exception 'INSUFFICIENT_AVAILABLE_POINTS' using errcode='23514';
  end if;

  -- Secure, server-issued ticket. No points are debited at creation.
  v_qr := 'VENTO-' || pg_catalog.replace(pg_catalog.gen_random_uuid()::text,'-','')
                   || pg_catalog.replace(pg_catalog.gen_random_uuid()::text,'-','');
  v_expiry := pg_catalog.now() + interval '15 minutes';

  insert into pass.loyalty_redemptions (
    user_id,reward_id,points_spent,qr_code,status,site_id,expires_at,metadata
  ) values (
    v_user,p_reward_id,p_expected_points_cost,v_qr,'pending',p_site_id,v_expiry,
    pg_catalog.jsonb_build_object(
      'contract','pass_redemption_v1',
      'request_id',p_request_id,
      'reservation_mode','hold_until_consumed'
    )
  ) returning * into v_redemption;

  update pass.redemption_requests
    set status='reserved',redemption_id=v_redemption.id,
        expires_at=v_expiry,updated_at=pg_catalog.now()
    where id=p_request_id;

  return pg_catalog.jsonb_build_object(
    'redemption_id',v_redemption.id,'qr_code',v_qr,
    'status','pending','expires_at',v_expiry,
    'reservation_mode','hold_until_consumed'
  );
end;
$create_intent$;

create or replace function pass.pass_validate_redemption_v1(
  p_qr_code text,
  p_site_id uuid,
  p_signature_id uuid default null
) returns jsonb language plpgsql security definer
set search_path = pg_catalog
as $validate$
declare
  v_user uuid := auth.uid();
  v_redemption record;
  v_device_id uuid;
  v_actor_id uuid;
  v_actor_role text;
  v_signed_target uuid;
begin
  if v_user is null or p_site_id is null or
     pg_catalog.btrim(coalesce(p_qr_code,'')) = '' then
    raise exception 'INVALID_REQUEST' using errcode='42501';
  end if;

  -- Require an authorized human before returning any customer data.
  select d.id into v_device_id
    from public.shared_operational_devices d
    join public.shared_operational_device_apps da on da.device_id=d.id
    where d.auth_user_id=v_user and d.site_id=p_site_id
      and d.is_active and d.activation_status='active'
      and da.app_code='pulso' and da.is_active
    limit 1;

  if v_device_id is not null then
    if p_signature_id is null then
      raise exception 'ACTOR_SIGNATURE_REQUIRED' using errcode='42501';
    end if;
    select sig.actor_employee_id,sig.target_id into v_actor_id,v_signed_target
      from public.shared_device_actor_signatures sig
      join public.employees e on e.id=sig.actor_employee_id and e.is_active is true
      where sig.id=p_signature_id and sig.shared_device_id=v_device_id
        and sig.auth_user_id=v_user and sig.site_id=p_site_id
        and sig.app_code='pulso'
        and sig.action_code='pos.loyalty.validate_redemption'
        and sig.target_table='pass.loyalty_redemptions'
        and sig.signature_method='pin' and sig.expires_at > pg_catalog.now();
    if v_actor_id is null or not public.shared_device_actor_is_allowed_v1(
      v_device_id,v_actor_id,p_site_id,null
    ) then
      raise exception 'ACTOR_NOT_AUTHORIZED' using errcode='42501';
    end if;
    select c.active_operational_role into v_actor_role
      from public.get_operational_context(v_actor_id,p_site_id,'pulso') c
      where c.employee_id=v_actor_id and c.can_operate
        and c.active_site_id=p_site_id;
    if v_actor_role is null or not public.has_operational_role_permission(
      v_actor_role,'pulso.loyalty.points.redeem',p_site_id,null,'pulso'
    ) then
      raise exception 'ACTOR_PERMISSION_DENIED' using errcode='42501';
    end if;
  else
    if p_signature_id is not null
       or not (
         public.has_permission('pulso.loyalty.points.redeem',p_site_id,null)
         or public.has_operational_permission(
           'pulso.loyalty.points.redeem',p_site_id,null,'pulso'
         )
       )
       or not exists (
         select 1 from public.employees e
         where e.id=v_user and e.is_active is true
           and (e.site_id=p_site_id or exists (
             select 1 from public.employee_sites es
             where es.employee_id=e.id and es.site_id=p_site_id and es.is_active
           ))
       ) then
      raise exception 'PERMISSION_DENIED' using errcode='42501';
    end if;
  end if;

  select r.id,r.user_id,r.reward_id,r.points_spent,r.status,r.created_at,
         r.expires_at,r.site_id,rew.name as reward_name,rr.status as request_status
    into v_redemption from pass.loyalty_redemptions r
    join pass.loyalty_rewards rew on rew.id=r.reward_id
    join pass.redemption_requests rr on rr.redemption_id=r.id
    where r.qr_code=p_qr_code and r.site_id=p_site_id;

  if not found or v_redemption.status <> 'pending'
     or v_redemption.request_status <> 'reserved'
     or v_redemption.expires_at <= pg_catalog.now() then
    raise exception 'REDEMPTION_NOT_CONSUMABLE' using errcode='42501';
  end if;

  if v_signed_target is not null and v_signed_target <> v_redemption.id then
    raise exception 'SIGNATURE_BOUND_TO_OTHER_TICKET' using errcode='42501';
  end if;

  return pg_catalog.jsonb_build_object('success',true,'redemption',
    pg_catalog.jsonb_build_object(
      'id',v_redemption.id,'user_id',v_redemption.user_id,
      'reward_id',v_redemption.reward_id,'reward_name',v_redemption.reward_name,
      'points_spent',v_redemption.points_spent,'status','pending',
      'created_at',v_redemption.created_at
    )
  );
end;
$validate$;

create or replace function pass.pass_consume_redemption_v1(
  p_redemption_id uuid,
  p_site_id uuid,
  p_order_id uuid,
  p_signature_id uuid
) returns jsonb language plpgsql security definer
set search_path = pg_catalog
as $consume$
declare
  v_principal uuid := auth.uid();
  v_device_id uuid;
  v_actor_id uuid;
  v_actor_role text;
  v_request pass.redemption_requests%rowtype;
  v_redemption pass.loyalty_redemptions%rowtype;
  v_balance integer;
  v_transaction_id uuid;
begin
  if v_principal is null or p_redemption_id is null or p_site_id is null then
    raise exception 'AUTH_AND_CONTEXT_REQUIRED' using errcode='42501';
  end if;

  -- Authorization precedes reading customer or reward data.
  select d.id into v_device_id
    from public.shared_operational_devices d
    where d.auth_user_id=v_principal and d.site_id=p_site_id
      and d.is_active and d.activation_status='active'
    limit 1;

  if v_device_id is not null then
    if p_signature_id is null then
      raise exception 'ACTOR_SIGNATURE_REQUIRED' using errcode='42501';
    end if;
    select s.actor_employee_id
      into v_actor_id
      from public.shared_device_actor_signatures s
      join public.employees e on e.id=s.actor_employee_id and e.is_active is true
      where s.id=p_signature_id and s.shared_device_id=v_device_id
        and s.auth_user_id=v_principal and s.site_id=p_site_id
        and s.app_code='pulso'
        and s.action_code='pos.loyalty.validate_redemption'
        and s.target_table='pass.loyalty_redemptions'
        and s.target_id=p_redemption_id
        and s.expires_at > pg_catalog.now()
        and s.signature_method='pin';

    if v_actor_id is not null then
      select c.active_operational_role into v_actor_role
        from public.get_operational_context(v_actor_id,p_site_id,'pulso') c
        where c.employee_id=v_actor_id and c.can_operate
          and c.active_site_id=p_site_id;
    end if;

    if v_actor_id is null or v_actor_role is null
       or not public.shared_device_actor_is_allowed_v1(
         v_device_id,v_actor_id,p_site_id,null
       )
       or not public.has_operational_role_permission(
         v_actor_role,'pulso.loyalty.points.redeem',p_site_id,null,'pulso'
       ) then
      raise exception 'ACTOR_NOT_AUTHORIZED' using errcode='42501';
    end if;
  else
    if p_signature_id is not null
       or not (
         public.has_permission('pulso.loyalty.points.redeem',p_site_id,null)
         or public.has_operational_permission(
           'pulso.loyalty.points.redeem',p_site_id,null,'pulso'
         )
       )
       or not exists (
         select 1 from public.employees e
         where e.id=v_principal and e.is_active is true
           and (
             e.site_id=p_site_id or exists (
               select 1 from public.employee_sites es
               where es.employee_id=e.id and es.site_id=p_site_id and es.is_active
             )
           )
       ) then
      raise exception 'PERMISSION_DENIED' using errcode='42501';
    end if;
    v_actor_id := v_principal;
  end if;

  -- Single operation identity: lock the request before touching ticket or balance.
  select * into v_request
    from pass.redemption_requests rr
    where rr.redemption_id=p_redemption_id
    for update;
  if not found then raise exception 'REQUEST_NOT_FOUND' using errcode='42501'; end if;

  select * into v_redemption
    from pass.loyalty_redemptions r where r.id=p_redemption_id
    for update;
  if not found or v_request.user_id is distinct from v_redemption.user_id
     or v_request.site_id is distinct from p_site_id
     or v_redemption.site_id is distinct from p_site_id
     or v_redemption.points_spent <> v_request.expected_points_cost then
    raise exception 'REDEMPTION_INCONSISTENT' using errcode='42501';
  end if;

  if v_request.status='consumed' and v_redemption.status='validated'
     and v_request.consumed_order_id is not distinct from p_order_id
     and v_request.consumed_by=v_actor_id then
    return pg_catalog.jsonb_build_object(
      'redemption_id',p_redemption_id,'status','validated',
      'already_applied',true,'transaction_id',v_request.ledger_transaction_id
    );
  end if;

  if v_request.status <> 'reserved' or v_redemption.status <> 'pending'
     or v_redemption.expires_at <= pg_catalog.now() then
    raise exception 'REDEMPTION_NOT_CONSUMABLE' using errcode='42501';
  end if;

  if not exists (
    select 1 from pass.loyalty_rewards r
    where r.id=v_redemption.reward_id and r.is_active
      and (r.site_id is null or r.site_id=p_site_id)
  ) then
    raise exception 'REWARD_NOT_ELIGIBLE' using errcode='42501';
  end if;

  if p_order_id is not null and not exists (
    select 1 from public.orders o
    where o.id=p_order_id and o.site_id=p_site_id
      and o.client_id=v_redemption.user_id and o.voided_at is null
      and o.status <> 'cancelled'
  ) then
    raise exception 'ORDER_NOT_ELIGIBLE' using errcode='42501';
  end if;

  select u.loyalty_points into v_balance from public.users u
    where u.id=v_redemption.user_id and u.is_active is true for update;
  if not found or coalesce(v_balance,0) < v_redemption.points_spent then
    raise exception 'INSUFFICIENT_AVAILABLE_POINTS' using errcode='23514';
  end if;

  -- Exactly one ledger INSERT, which invokes the EXISTING balance trigger.
  -- Never manually UPDATE public.users.loyalty_points here.
  insert into pass.loyalty_transactions(
    user_id,order_id,kind,points_delta,description,metadata
  ) values (
    v_redemption.user_id,p_order_id,'spend',-v_redemption.points_spent,
    'Redención confirmada en PULSO',
    pg_catalog.jsonb_build_object(
      'redemption_request_id',v_request.id,
      'redemption_id',v_redemption.id,
      'site_id',p_site_id,'actor_employee_id',v_actor_id,
      'shared_device_signature_id',p_signature_id,
      'contract','pass_redemption_v1'
    )
  ) returning id into v_transaction_id;

  update pass.loyalty_redemptions
    set status='validated',validated_at=pg_catalog.now(),order_id=p_order_id,
        metadata=coalesce(metadata,'{}'::jsonb) ||
          pg_catalog.jsonb_build_object(
            'ledger_transaction_id',v_transaction_id,
            'consumed_by',v_actor_id,
            'consumed_site_id',p_site_id,
            'shared_device_signature_id',p_signature_id
          )
    where id=p_redemption_id;

  update pass.redemption_requests
    set status='consumed',ledger_transaction_id=v_transaction_id,
        consumed_by=v_actor_id,consumed_signature_id=p_signature_id,
        consumed_order_id=p_order_id,consumed_at=pg_catalog.now(),
        updated_at=pg_catalog.now()
    where id=v_request.id;

  return pg_catalog.jsonb_build_object(
    'redemption_id',p_redemption_id,'status','validated',
    'already_applied',false,'transaction_id',v_transaction_id
  );
end;
$consume$;

create or replace function pass.pass_cancel_redemption_intent_v1(
  p_request_id uuid
) returns jsonb language plpgsql security definer
set search_path = pg_catalog
as $cancel$
declare
  v_user uuid := auth.uid();
  v_request pass.redemption_requests%rowtype;
  v_status text;
begin
  if v_user is null or p_request_id is null then
    raise exception 'AUTH_REQUIRED' using errcode='42501';
  end if;
  select * into v_request from pass.redemption_requests rr
    where rr.id=p_request_id and rr.user_id=v_user for update;
  if not found then raise exception 'REQUEST_NOT_FOUND' using errcode='42501'; end if;
  if v_request.status='cancelled' then
    return pg_catalog.jsonb_build_object('request_id',p_request_id,'status','cancelled');
  end if;
  if v_request.status='consumed' then
    raise exception 'CONSUMED_REDEMPTION_REQUIRES_REFUND_FLOW' using errcode='42501';
  end if;

  if v_request.redemption_id is not null then
    select r.status into v_status from pass.loyalty_redemptions r
      where r.id=v_request.redemption_id for update;
    if v_status <> 'pending' then
      raise exception 'REDEMPTION_NOT_CANCELLABLE' using errcode='42501';
    end if;
    update pass.loyalty_redemptions set status='cancelled'
      where id=v_request.redemption_id;
  end if;
  -- Reservation only: no ledger debit was created, therefore no refund INSERT.
  update pass.redemption_requests
    set status='cancelled',updated_at=pg_catalog.now()
    where id=p_request_id;
  return pg_catalog.jsonb_build_object(
    'request_id',p_request_id,'status','cancelled'
  );
end;
$cancel$;

-- Owner functions are executable by authenticated solely through their explicit
-- checks. They live outside the configured PostgREST exposed schemas.
revoke all on function pass.pass_issue_redemption_request_v1(uuid,uuid,integer) from public,anon,authenticated,service_role;
revoke all on function pass.pass_create_redemption_intent_v1(uuid,uuid,uuid,integer) from public,anon,authenticated,service_role;
revoke all on function pass.pass_validate_redemption_v1(text,uuid,uuid) from public,anon,authenticated,service_role;
revoke all on function pass.pass_consume_redemption_v1(uuid,uuid,uuid,uuid) from public,anon,authenticated,service_role;
revoke all on function pass.pass_cancel_redemption_intent_v1(uuid) from public,anon,authenticated,service_role;

grant execute on function pass.pass_issue_redemption_request_v1(uuid,uuid,integer) to authenticated;
grant execute on function pass.pass_create_redemption_intent_v1(uuid,uuid,uuid,integer) to authenticated;
grant execute on function pass.pass_validate_redemption_v1(text,uuid,uuid) to authenticated;
grant execute on function pass.pass_consume_redemption_v1(uuid,uuid,uuid,uuid) to authenticated;
grant execute on function pass.pass_cancel_redemption_intent_v1(uuid) to authenticated;

-- Data API uses api, NOT direct table grants or a globally exposed pass schema.
create or replace function api.pass_issue_redemption_request_v1(
  p_reward_id uuid,p_site_id uuid,p_expected_points_cost integer
) returns jsonb language sql security invoker set search_path=pg_catalog
as $$ select pass.pass_issue_redemption_request_v1(p_reward_id,p_site_id,p_expected_points_cost) $$;

create or replace function api.pass_create_redemption_intent_v1(
  p_request_id uuid,p_reward_id uuid,p_site_id uuid,p_expected_points_cost integer
) returns jsonb language sql security invoker set search_path=pg_catalog
as $$ select pass.pass_create_redemption_intent_v1(p_request_id,p_reward_id,p_site_id,p_expected_points_cost) $$;

create or replace function api.pass_validate_redemption_v1(
  p_qr_code text,p_site_id uuid,p_signature_id uuid default null
) returns jsonb language sql security invoker set search_path=pg_catalog
as $$ select pass.pass_validate_redemption_v1(p_qr_code,p_site_id,p_signature_id) $$;

create or replace function api.pass_consume_redemption_v1(
  p_redemption_id uuid,p_site_id uuid,p_order_id uuid,p_signature_id uuid
) returns jsonb language sql security invoker set search_path=pg_catalog
as $$ select pass.pass_consume_redemption_v1(p_redemption_id,p_site_id,p_order_id,p_signature_id) $$;

create or replace function api.pass_cancel_redemption_intent_v1(
  p_request_id uuid
) returns jsonb language sql security invoker set search_path=pg_catalog
as $$ select pass.pass_cancel_redemption_intent_v1(p_request_id) $$;

revoke all on function api.pass_issue_redemption_request_v1(uuid,uuid,integer) from public,anon,authenticated,service_role;
revoke all on function api.pass_create_redemption_intent_v1(uuid,uuid,uuid,integer) from public,anon,authenticated,service_role;
revoke all on function api.pass_validate_redemption_v1(text,uuid,uuid) from public,anon,authenticated,service_role;
revoke all on function api.pass_consume_redemption_v1(uuid,uuid,uuid,uuid) from public,anon,authenticated,service_role;
revoke all on function api.pass_cancel_redemption_intent_v1(uuid) from public,anon,authenticated,service_role;
grant execute on function api.pass_issue_redemption_request_v1(uuid,uuid,integer) to authenticated;
grant execute on function api.pass_create_redemption_intent_v1(uuid,uuid,uuid,integer) to authenticated;
grant execute on function api.pass_validate_redemption_v1(text,uuid,uuid) to authenticated;
grant execute on function api.pass_consume_redemption_v1(uuid,uuid,uuid,uuid) to authenticated;
grant execute on function api.pass_cancel_redemption_intent_v1(uuid) to authenticated;

-- A permission catalog entry is not a role grant. Never assign staff privileges
-- merely by applying a migration; VISO/authorization owns the assignment.
insert into public.app_permissions(
  app_id,code,name,description,is_active,is_operational,
  requires_active_work_context,permission_audience
)
select a.id,'loyalty.points.redeem','Validar redenciones de fidelización',
  'Consumo atómico de tickets PASS en caja nativa PULSO',true,true,true,'operational'
from public.apps a
where a.code='pulso'
on conflict(app_id,code) do nothing;

commit;
