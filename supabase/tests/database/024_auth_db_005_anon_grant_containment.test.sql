-- VENTO_DB_TEST_CATEGORY: RPC
begin;

create extension if not exists pgtap with schema extensions;

select plan(20);

select is(
  (
    select count(*)
    from pg_catalog.pg_default_acl d
    join pg_catalog.pg_namespace n on n.oid = d.defaclnamespace
    where d.defaclrole = 'postgres'::regrole::oid
      and n.nspname = 'public'
      and d.defaclobjtype in ('r', 'f', 'S')
      and exists (
        select 1
        from aclexplode(d.defaclacl) a
        where a.grantee = 'anon'::regrole::oid
          and (
            (
              d.defaclobjtype = 'r'
              and a.privilege_type in ('SELECT', 'INSERT', 'UPDATE', 'DELETE')
            )
            or (
              d.defaclobjtype = 'f'
              and a.privilege_type = 'EXECUTE'
            )
            or (
              d.defaclobjtype = 'S'
              and a.privilege_type in ('USAGE', 'SELECT')
            )
          )
      )
  ),
  0::bigint,
  'postgres public defaults grant no anon client data operations'
);

select is(
  (
    select count(*)
    from pg_catalog.pg_default_acl d
    join pg_catalog.pg_namespace n on n.oid = d.defaclnamespace
    where d.defaclrole = 'supabase_admin'::regrole::oid
      and n.nspname = 'public'
      and d.defaclobjtype in ('r', 'f', 'S')
      and exists (
        select 1
        from aclexplode(d.defaclacl) a
        where a.grantee = 'anon'::regrole::oid
      )
  ),
  3::bigint,
  'managed supabase_admin anon defaults remain unchanged'
);

select ok(
  not has_schema_privilege('anon', 'pos', 'USAGE'),
  'anon no longer has USAGE on pos'
);

select ok(
  not has_schema_privilege('anon', 'pos', 'CREATE'),
  'anon still has no CREATE on pos'
);

select ok(
  has_schema_privilege('authenticated', 'pos', 'USAGE'),
  'authenticated pos USAGE remains unchanged'
);

select ok(
  has_schema_privilege('service_role', 'pos', 'USAGE'),
  'service_role pos USAGE remains unchanged'
);

select ok(
  has_schema_privilege('anon', 'pass', 'USAGE'),
  'legacy pass anon USAGE remains frozen'
);

select ok(
  has_schema_privilege('anon', 'public', 'USAGE'),
  'legacy public anon USAGE remains frozen'
);

select ok(
  has_schema_privilege('anon', 'talento', 'USAGE'),
  'legacy talento anon USAGE remains frozen'
);

select is(
  (
    select count(*)
    from pg_catalog.pg_namespace n
    where n.nspname in (
      'app_private',
      'club',
      'pass',
      'payments',
      'pos',
      'public',
      'talento',
      'viso'
    )
      and has_schema_privilege('anon', n.oid, 'USAGE')
  ),
  3::bigint,
  'anon schema USAGE is reduced from four governed schemas to three'
);

select is(
  (
    select count(*)
    from pg_catalog.pg_namespace n
    where n.nspname in (
      'app_private',
      'club',
      'pass',
      'payments',
      'pos',
      'public',
      'talento',
      'viso'
    )
      and has_schema_privilege('anon', n.oid, 'CREATE')
  ),
  0::bigint,
  'anon CREATE remains zero on governed schemas'
);

select is(
  (
    select count(*)
    from pg_catalog.pg_class c
    join pg_catalog.pg_namespace n on n.oid = c.relnamespace
    where n.nspname = 'pos'
      and c.relkind in ('r', 'p', 'v', 'm', 'f')
      and (
        has_table_privilege('anon', c.oid, 'SELECT')
        or has_table_privilege('anon', c.oid, 'INSERT')
        or has_table_privilege('anon', c.oid, 'UPDATE')
        or has_table_privilege('anon', c.oid, 'DELETE')
        or has_table_privilege('anon', c.oid, 'TRUNCATE')
        or has_table_privilege('anon', c.oid, 'REFERENCES')
        or has_table_privilege('anon', c.oid, 'TRIGGER')
      )
  ),
  0::bigint,
  'pos remains without anon object privileges'
);

select is(
  (
    select count(*)
    from pg_catalog.pg_proc p
    join pg_catalog.pg_namespace n on n.oid = p.pronamespace
    where n.nspname = 'pos'
      and p.prokind in ('f', 'p')
      and has_function_privilege('anon', p.oid, 'EXECUTE')
  ),
  0::bigint,
  'pos remains without anon executable functions'
);

select is(
  (
    select count(*)
    from pg_catalog.pg_class c
    join pg_catalog.pg_namespace n on n.oid = c.relnamespace
    where n.nspname = 'pos'
      and c.relkind = 'S'
      and (
        has_sequence_privilege('anon', c.oid, 'USAGE')
        or has_sequence_privilege('anon', c.oid, 'SELECT')
        or has_sequence_privilege('anon', c.oid, 'UPDATE')
      )
  ),
  0::bigint,
  'pos remains without anon sequence privileges'
);

select is(
  (
    select count(*)
    from pg_catalog.pg_class c
    join pg_catalog.pg_namespace n on n.oid = c.relnamespace
    where n.nspname in (
      'app_private',
      'club',
      'pass',
      'payments',
      'pos',
      'public',
      'talento',
      'viso'
    )
      and c.relkind in ('r', 'p', 'v', 'm', 'f')
      and exists (
        select 1
        from aclexplode(coalesce(c.relacl, acldefault('r', c.relowner))) a
        where a.grantee = 'anon'::regrole::oid
          and a.privilege_type = 'SELECT'
      )
  ),
  39::bigint,
  '39 canonical direct anon SELECT grants remain frozen'
);

select is(
  (
    select count(*)
    from pg_catalog.pg_class c
    join pg_catalog.pg_namespace n on n.oid = c.relnamespace
    where n.nspname in (
      'app_private',
      'club',
      'pass',
      'payments',
      'pos',
      'public',
      'talento',
      'viso'
    )
      and c.relkind in ('r', 'p', 'v', 'm', 'f')
      and has_table_privilege('anon', c.oid, 'INSERT')
      and has_table_privilege('anon', c.oid, 'UPDATE')
      and has_table_privilege('anon', c.oid, 'DELETE')
  ),
  4::bigint,
  'four legacy anon DML tables remain frozen pending successors'
);

select is(
  (
    select count(*)
    from pg_catalog.pg_proc p
    join pg_catalog.pg_namespace n on n.oid = p.pronamespace
    where n.nspname in (
      'app_private',
      'club',
      'pass',
      'payments',
      'pos',
      'public',
      'talento',
      'viso'
    )
      and p.prokind in ('f', 'p')
      and has_function_privilege('anon', p.oid, 'EXECUTE')
  ),
  (
    91::bigint - case
      when exists (
        select 1
        from supabase_migrations.schema_migrations m
        where m.version = '20261012173553'
          and cardinality(m.statements) > 0
      ) then 5::bigint
      else 0::bigint
    end
  ),
  'anon EXECUTE baseline 91 minus five exact GAP-PKG-004 revocations after its migration'
);

select is(
  (
    select count(*)
    from pg_catalog.pg_proc p
    join pg_catalog.pg_namespace n on n.oid = p.pronamespace
    where format(
      '%I.%I(%s)',
      n.nspname,
      p.proname,
      pg_get_function_identity_arguments(p.oid)
    ) in (
      'public.can_access_recipe_scope(p_site_id uuid, p_area_id uuid)',
      'public.current_employee_area_id()',
      'public.current_employee_site_id()',
      'public.is_active_staff()',
      'public.is_global_manager()',
      'public.is_manager()',
      'public.is_manager_or_owner()',
      'public.is_owner()'
    )
      and not p.prosecdef
      and has_function_privilege('anon', p.oid, 'EXECUTE')
  ),
  8::bigint,
  'AUTH-DB-003 invoker wrappers and anon EXECUTE remain unchanged'
);

select is(
  (
    select count(*)
    from pg_catalog.pg_class c
    join pg_catalog.pg_namespace n on n.oid = c.relnamespace
    where n.nspname = 'pos'
      and c.relkind = 'S'
  ),
  0::bigint,
  'pos remains without sequence dependencies'
);

select ok(
  exists (
    select 1
    from supabase_migrations.schema_migrations m
    where m.version = '20260827153413'
      and cardinality(m.statements) > 0
  )
  and not exists (
    select 1
    from supabase_migrations.schema_migrations m
    cross join lateral unnest(m.statements) as s(statement)
    where m.version = '20260827153413'
      and s.statement ~* 'create[[:space:]]+schema[[:space:]]+(if[[:space:]]+not[[:space:]]+exists[[:space:]]+)?("?api"?)([[:space:];]|$)'
  ),
  'AUTH-DB-005 migration does not create the api schema'
);

select * from finish();
rollback;
