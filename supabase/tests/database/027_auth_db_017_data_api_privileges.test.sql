-- VENTO_DB_TEST_CATEGORY: RPC
begin;

create extension if not exists pgtap with schema extensions;

select plan(31);

select ok(
  to_regnamespace('api') is not null,
  'api schema exists'
);

select ok(
  has_schema_privilege('authenticated', 'api', 'USAGE'),
  'authenticated has explicit api USAGE'
);

select ok(
  not has_schema_privilege('anon', 'api', 'USAGE'),
  'anon remains fail-closed on api until a public contract is explicitly classified'
);

select ok(
  not has_schema_privilege('service_role', 'api', 'USAGE'),
  'service_role receives no implicit api contract'
);

select ok(
  not has_schema_privilege('authenticated', 'api', 'CREATE')
  and not has_schema_privilege('anon', 'api', 'CREATE')
  and not has_schema_privilege('service_role', 'api', 'CREATE'),
  'runtime roles have zero CREATE on api'
);

select is(
  (
    select count(*)
    from pg_catalog.pg_class c
    join pg_catalog.pg_namespace n
      on n.oid = c.relnamespace
    where n.nspname = 'api'
      and c.relkind = 'v'
  ),
  57::bigint,
  'api keeps exactly 57 AUTH-DB-018 read views'
);

select is(
  (
    select count(*)
    from pg_catalog.pg_class c
    join pg_catalog.pg_namespace n
      on n.oid = c.relnamespace
    where n.nspname = 'api'
      and c.relkind = 'v'
      and coalesce(
        c.reloptions,
        array[]::text[]
      ) @> array['security_invoker=true']::text[]
  ),
  57::bigint,
  'all api views remain security_invoker'
);

select is(
  (
    select count(*)
    from pg_catalog.pg_class c
    join pg_catalog.pg_namespace n
      on n.oid = c.relnamespace
    where n.nspname = 'api'
      and c.relkind = 'v'
      and has_table_privilege(
        'authenticated',
        c.oid,
        'SELECT'
      )
  ),
  57::bigint,
  'authenticated has SELECT on every published api read view'
);

select is(
  (
    select count(*)
    from pg_catalog.pg_class c
    join pg_catalog.pg_namespace n
      on n.oid = c.relnamespace
    where n.nspname = 'api'
      and c.relkind = 'v'
      and has_table_privilege(
        'anon',
        c.oid,
        'SELECT'
      )
  ),
  0::bigint,
  'anon receives zero inferred api view grants'
);

select is(
  (
    select count(*)
    from pg_catalog.pg_class c
    join pg_catalog.pg_namespace n
      on n.oid = c.relnamespace
    where n.nspname = 'api'
      and c.relkind = 'v'
      and has_table_privilege(
        'service_role',
        c.oid,
        'SELECT'
      )
  ),
  0::bigint,
  'service_role receives zero implicit api view grants'
);

select is(
  (
    select count(*)
    from pg_catalog.pg_class c
    join pg_catalog.pg_namespace n
      on n.oid = c.relnamespace
    where n.nspname = 'api'
      and c.relkind = 'v'
      and exists (
        select 1
        from pg_catalog.aclexplode(
          coalesce(
            c.relacl,
            pg_catalog.acldefault(
              'r',
              c.relowner
            )
          )
        ) a
        where a.grantee = 0::oid
          and a.privilege_type = 'SELECT'
      )
  ),
  0::bigint,
  'PUBLIC has zero SELECT grants on api views'
);

select ok(
  (
    select count(*)
    from pg_catalog.pg_proc p
    join pg_catalog.pg_namespace n
      on n.oid = p.pronamespace
    where n.nspname = 'api'
      and p.prokind = 'f'
  ) > 0,
  'api contains AUTH-DB-018 RPC wrappers'
);

select cmp_ok(
  (
    select count(*)
    from pg_catalog.pg_proc p
    join pg_catalog.pg_namespace n
      on n.oid = p.pronamespace
    where n.nspname = 'api'
      and p.prokind = 'f'
      and p.prosecdef
  ),
  '>=',
  2::bigint, 'api preserves the governed SECURITY DEFINER baseline while allowing additive governed RPCs'
);

select is(
  (
    select count(*)
    from pg_catalog.pg_proc p
    join pg_catalog.pg_namespace n
      on n.oid = p.pronamespace
    where n.nspname = 'api'
      and p.prokind = 'f'
      and has_function_privilege(
        'authenticated',
        p.oid,
        'EXECUTE'
      )
  ),
  (
    select count(*)
    from pg_catalog.pg_proc p
    join pg_catalog.pg_namespace n
      on n.oid = p.pronamespace
    where n.nspname = 'api'
      and p.prokind = 'f'
  ) - 1::bigint,
  'authenticated has EXECUTE on every published api RPC signature'
);

select ok(
  not has_function_privilege(
    'authenticated',
    'api.get_safe_access_context(text)',
    'EXECUTE'
  ),
  'AUTH-DB-033 safe RPC is explicitly withheld until its owner sources exist'
);

select is(
  (
    select count(*)
    from pg_catalog.pg_proc p
    join pg_catalog.pg_namespace n
      on n.oid = p.pronamespace
    where n.nspname = 'api'
      and p.prokind = 'f'
      and has_function_privilege(
        'anon',
        p.oid,
        'EXECUTE'
      )
  ),
  0::bigint,
  'anon receives zero inferred api RPC grants'
);

select is(
  (
    select count(*)
    from pg_catalog.pg_proc p
    join pg_catalog.pg_namespace n
      on n.oid = p.pronamespace
    where n.nspname = 'api'
      and p.prokind = 'f'
      and has_function_privilege(
        'service_role',
        p.oid,
        'EXECUTE'
      )
  ),
  0::bigint,
  'service_role receives zero implicit api RPC grants'
);

select is(
  (
    select count(*)
    from pg_catalog.pg_proc p
    join pg_catalog.pg_namespace n
      on n.oid = p.pronamespace
    where n.nspname = 'api'
      and p.prokind = 'f'
      and exists (
        select 1
        from pg_catalog.aclexplode(
          coalesce(
            p.proacl,
            pg_catalog.acldefault(
              'f',
              p.proowner
            )
          )
        ) a
        where a.grantee = 0::oid
          and a.privilege_type = 'EXECUTE'
      )
  ),
  0::bigint,
  'PUBLIC has zero EXECUTE grants on api RPCs'
);

select ok(
  not has_schema_privilege(
    'anon',
    'app_private',
    'USAGE'
  )
  and not has_schema_privilege(
    'authenticated',
    'app_private',
    'USAGE'
  ),
  'app_private remains outside direct client access'
);

select ok(
  not has_schema_privilege(
    'anon',
    'audit',
    'USAGE'
  )
  and not has_schema_privilege(
    'authenticated',
    'audit',
    'USAGE'
  ),
  'audit remains outside direct client access'
);

select is(
  (
    select count(*)
    from pg_catalog.pg_namespace n
    where n.nspname in (
      'org_governance',
      'recruiting',
      'workforce',
      'work_scheduling',
      'attendance',
      'payroll',
      'operational_compliance',
      'product_catalog',
      'recipes',
      'commercial_offer',
      'procurement',
      'inventory',
      'assets',
      'production',
      'sales_orders',
      'customer_engagement',
      'logistics',
      'finance',
      'facilities',
      'marketing',
      'technology_operations',
      'identity_access',
      'business_records',
      'business_insights',
      'operational_continuity'
    )
      and (
        has_schema_privilege(
          'anon',
          n.oid,
          'USAGE'
        )
        or has_schema_privilege(
          'authenticated',
          n.oid,
          'USAGE'
        )
      )
  ),
  0::bigint,
  'empty owner schemas remain closed to anon and authenticated'
);

select ok(
  to_regclass(
    'public.sell_products_by_site'
  ) is not null
  and has_table_privilege(
    'authenticated',
    'public.sell_products_by_site',
    'SELECT'
  ),
  'documented public compatibility view remains available during consumer migration'
);

select ok(
  to_regnamespace('vital') is not null
  and exists (
    select 1
    from pg_catalog.pg_roles r
    where r.rolname = 'vento_ddl_owner'
      and not r.rolcanlogin
      and not r.rolinherit
      and not r.rolsuper
      and not r.rolcreatedb
      and not r.rolcreaterole
      and not r.rolreplication
      and not r.rolbypassrls
      and not exists (
        select 1
        from pg_catalog.pg_auth_members am
        where am.member = r.oid
      )
  )
  and not has_schema_privilege(
    'vento_ddl_owner',
    'vital',
    'CREATE'
  ),
  'VITAL remains outside vento_ddl_owner creation scope'
);

select is(
  (
    select count(*)
    from pg_catalog.pg_auth_members am
    where am.roleid = 'vento_ddl_owner'::regrole
      and am.member = 'postgres'::regrole
      and not am.admin_option
      and not am.inherit_option
      and am.set_option
  ),
  1::bigint,
  'postgres has only SET membership without ADMIN or inherited privileges'
);

set local role vento_ddl_owner;

create table api.auth_db_017_default_table_probe (
  id bigint primary key
);

create sequence api.auth_db_017_default_sequence_probe;

create function api.auth_db_017_default_function_probe()
returns integer
language sql
security invoker
set search_path = pg_catalog, api
as $$ select 1 $$;

reset role;

select is(
  (
    select count(*)
    from pg_catalog.pg_class c
    join pg_catalog.pg_namespace n
      on n.oid = c.relnamespace
    where n.nspname = 'api'
      and c.relname in (
        'auth_db_017_default_table_probe',
        'auth_db_017_default_sequence_probe'
      )
      and c.relowner = 'vento_ddl_owner'::regrole
  ) + (
    select count(*)
    from pg_catalog.pg_proc p
    join pg_catalog.pg_namespace n
      on n.oid = p.pronamespace
    where n.nspname = 'api'
      and p.proname = 'auth_db_017_default_function_probe'
      and p.proowner = 'vento_ddl_owner'::regrole
  ),
  3::bigint,
  'transactional table sequence and function probes are owned by vento_ddl_owner'
);

select ok(
  not has_table_privilege(
    'anon',
    'api.auth_db_017_default_table_probe',
    'SELECT'
  )
  and not has_table_privilege(
    'authenticated',
    'api.auth_db_017_default_table_probe',
    'SELECT'
  )
  and not has_table_privilege(
    'service_role',
    'api.auth_db_017_default_table_probe',
    'SELECT'
  ),
  'new api relations receive zero automatic runtime SELECT grants'
);

select ok(
  not has_sequence_privilege(
    'anon',
    'api.auth_db_017_default_sequence_probe',
    'USAGE'
  )
  and not has_sequence_privilege(
    'authenticated',
    'api.auth_db_017_default_sequence_probe',
    'USAGE'
  )
  and not has_sequence_privilege(
    'service_role',
    'api.auth_db_017_default_sequence_probe',
    'USAGE'
  ),
  'new api sequences receive zero automatic runtime USAGE grants'
);

select ok(
  not has_function_privilege(
    'anon',
    'api.auth_db_017_default_function_probe()',
    'EXECUTE'
  )
  and not has_function_privilege(
    'authenticated',
    'api.auth_db_017_default_function_probe()',
    'EXECUTE'
  )
  and not has_function_privilege(
    'service_role',
    'api.auth_db_017_default_function_probe()',
    'EXECUTE'
  ),
  'new api functions receive zero automatic runtime EXECUTE grants'
);

select is(
  (
    select count(*)
    from pg_catalog.pg_proc p
    join pg_catalog.pg_namespace n
      on n.oid = p.pronamespace
    where n.nspname = 'api'
      and p.proname =
          'auth_db_017_default_function_probe'
      and exists (
        select 1
        from pg_catalog.aclexplode(
          coalesce(
            p.proacl,
            pg_catalog.acldefault(
              'f',
              p.proowner
            )
          )
        ) a
        where a.grantee = 0::oid
          and a.privilege_type = 'EXECUTE'
      )
  ),
  0::bigint,
  'new api functions do not inherit PUBLIC EXECUTE'
);

select ok(
  exists (
    select 1
    from supabase_migrations.schema_migrations m
    where m.version = '20260829152739'
      and cardinality(m.statements) > 0
  ),
  'AUTH-DB-017 migration is present in local migration history'
);

select is(
  (
    select count(*)
    from pg_catalog.pg_class c
    join pg_catalog.pg_namespace n
      on n.oid = c.relnamespace
    where n.nspname = 'api'
      and c.relkind in (
        'r',
        'p',
        'S',
        'm',
        'f'
      )
      and c.relname not in (
        'auth_db_017_default_table_probe',
        'auth_db_017_default_sequence_probe'
      )
  ),
  0::bigint,
  'api keeps zero persistent authoritative relations outside transactional probes'
);

select * from finish();

rollback;
