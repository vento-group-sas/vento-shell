-- VENTO_DB_TEST_CATEGORY: SCHEMA
begin;

create extension if not exists pgtap with schema extensions;

select plan(11);

-- TREQ-SUPABASE-029
select ok(
  to_regnamespace('auth') is not null
  and to_regnamespace('identity_access') is not null
  and not exists (
    select 1
    from pg_catalog.pg_constraint con
    join pg_catalog.pg_class sc on sc.oid = con.conrelid
    join pg_catalog.pg_namespace sn on sn.oid = sc.relnamespace
    join pg_catalog.pg_class tc on tc.oid = con.confrelid
    join pg_catalog.pg_namespace tn on tn.oid = tc.relnamespace
    where con.contype = 'f'
      and sn.nspname = 'identity_access'
      and tn.nspname = 'auth'
  ),
  'TREQ-SUPABASE-029 managed Auth remains separate from enterprise identity tables'
);

-- TREQ-SUPABASE-116
select ok(
  exists (
    select 1 from pg_catalog.pg_roles
    where rolname = 'authenticator' and not rolinherit
  )
  and pg_has_role('authenticator', 'anon', 'MEMBER')
  and pg_has_role('authenticator', 'authenticated', 'MEMBER')
  and pg_has_role('authenticator', 'service_role', 'MEMBER'),
  'TREQ-SUPABASE-116 authenticator remains NOINHERIT with governed SET-role memberships'
);

-- TREQ-SUPABASE-117
select ok(
  not has_schema_privilege('service_role', 'identity_access', 'USAGE')
  and not has_table_privilege('service_role', 'identity_access.principals', 'SELECT')
  and not has_table_privilege('service_role', 'identity_access.enterprise_identity_links', 'SELECT'),
  'TREQ-SUPABASE-117 service_role has no direct identity_access client surface'
);

-- TREQ-SUPABASE-124
select ok(
  coalesce(
    pg_catalog.obj_description('identity_access.principals'::regclass, 'pg_class'),
    ''
  ) like '%replaceable technical reference%not an enterprise identity%',
  'TREQ-SUPABASE-124 Auth subject remains a replaceable technical reference'
);

-- TREQ-SUPABASE-125
select ok(
  coalesce((
    select pg_catalog.pg_get_constraintdef(c.oid)
    from pg_catalog.pg_constraint c
    where c.conrelid = 'identity_access.enterprise_identity_links'::regclass
      and c.conname = 'ck_enterprise_identity_links_compatibility'
  ), '') like '%EMPLOYEE%CUSTOMER%',
  'TREQ-SUPABASE-125 governed identity kinds do not hard-code a single enterprise identity class per human principal'
);

-- TREQ-SUPABASE-126
select is(
  (
    select count(*)
    from pg_catalog.pg_attribute a
    where a.attrelid = 'identity_access.enterprise_identity_links'::regclass
      and a.attnum > 0
      and not a.attisdropped
      and a.attname ~* 'session|refresh|aal'
  ),
  0::bigint,
  'TREQ-SUPABASE-126 session state is not conflated with the enterprise identity link'
);

-- TREQ-SUPABASE-127
select ok(
  coalesce((
    select pg_catalog.pg_get_constraintdef(c.oid)
    from pg_catalog.pg_constraint c
    where c.conrelid = 'identity_access.enterprise_identity_links'::regclass
      and c.conname = 'ck_enterprise_identity_links_state'
  ), '') like '%SUSPENDED%REVOKED%',
  'TREQ-SUPABASE-127 inactive identity links have explicit non-active lifecycle states'
);

-- TREQ-SUPABASE-131
select ok(
  coalesce((
    select pg_catalog.pg_get_constraintdef(c.oid)
    from pg_catalog.pg_constraint c
    where c.conrelid = 'identity_access.enterprise_identity_links'::regclass
      and c.conname = 'ck_enterprise_identity_links_identity_kind'
  ), '') like '%EMPLOYEE%',
  'TREQ-SUPABASE-131 employee identity is an explicit governed enterprise kind'
);

-- TREQ-SUPABASE-134
select ok(
  coalesce((
    select pg_catalog.pg_get_constraintdef(c.oid)
    from pg_catalog.pg_constraint c
    where c.conrelid = 'identity_access.enterprise_identity_links'::regclass
      and c.conname = 'ck_enterprise_identity_links_origin'
  ), '') like '%STAFF_INVITATION%',
  'TREQ-SUPABASE-134 staff invitation is an explicit governed identity-link origin'
);

-- TREQ-SUPABASE-135
select ok(
  coalesce((
    select pg_catalog.pg_get_constraintdef(c.oid)
    from pg_catalog.pg_constraint c
    where c.conrelid = 'identity_access.principals'::regclass
      and c.conname = 'ck_principals_kind'
  ), '') like '%HUMAN_USER%SHARED_DEVICE%SERVICE%',
  'TREQ-SUPABASE-135 principal class is explicit for human, shared-device and service actors'
);

-- TREQ-SUPABASE-138
select is(
  (select count(*) from identity_access.principals)
  + (select count(*) from identity_access.identity_resolution_cases)
  + (select count(*) from identity_access.enterprise_identity_links),
  0::bigint,
  'TREQ-SUPABASE-138 observed inventory remains evidence only and AUTH-DB-019 performs no automatic backfill'
);

select * from finish();
rollback;
