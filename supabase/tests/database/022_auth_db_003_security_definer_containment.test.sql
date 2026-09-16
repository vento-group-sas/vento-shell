-- VENTO_DB_TEST_CATEGORY: RPC
begin;

create extension if not exists pgtap with schema extensions;

insert into auth.users (id, email)
values
  (
    'a0030000-0000-0000-0000-000000000001',
    'auth-db-003-owner@test.local'
  ),
  (
    'a0030000-0000-0000-0000-000000000002',
    'auth-db-003-global@test.local'
  ),
  (
    'a0030000-0000-0000-0000-000000000003',
    'auth-db-003-manager@test.local'
  ),
  (
    'a0030000-0000-0000-0000-000000000004',
    'auth-db-003-cashier@test.local'
  ),
  (
    'a0030000-0000-0000-0000-000000000005',
    'auth-db-003-outsider@test.local'
  )
on conflict (id) do nothing;

insert into public.users (
  id,
  full_name,
  email,
  role,
  is_active,
  loyalty_points,
  is_client
)
values
  (
    'a0030000-0000-0000-0000-000000000001',
    'AUTH DB 003 Owner',
    'auth-db-003-owner@test.local',
    'client',
    true,
    0,
    true
  ),
  (
    'a0030000-0000-0000-0000-000000000002',
    'AUTH DB 003 Global Manager',
    'auth-db-003-global@test.local',
    'client',
    true,
    0,
    true
  ),
  (
    'a0030000-0000-0000-0000-000000000003',
    'AUTH DB 003 Manager',
    'auth-db-003-manager@test.local',
    'client',
    true,
    0,
    true
  ),
  (
    'a0030000-0000-0000-0000-000000000004',
    'AUTH DB 003 Cashier',
    'auth-db-003-cashier@test.local',
    'client',
    true,
    0,
    true
  ),
  (
    'a0030000-0000-0000-0000-000000000005',
    'AUTH DB 003 Outsider',
    'auth-db-003-outsider@test.local',
    'client',
    true,
    0,
    true
  )
on conflict (id) do update
set
  full_name = excluded.full_name,
  email = excluded.email,
  role = excluded.role,
  is_active = excluded.is_active,
  loyalty_points = excluded.loyalty_points,
  is_client = excluded.is_client;

insert into public.sites (
  id,
  code,
  name,
  type,
  site_kind,
  is_active
)
values (
  'a0031000-0000-0000-0000-000000000001',
  'AUTH_DB_003_SITE_A',
  'AUTH DB 003 Site A',
  'satellite',
  'satellite',
  true
);

insert into public.employees (
  id,
  site_id,
  role,
  full_name,
  is_active
)
values
  (
    'a0030000-0000-0000-0000-000000000001',
    'a0031000-0000-0000-0000-000000000001',
    'propietario',
    'AUTH DB 003 Owner',
    true
  ),
  (
    'a0030000-0000-0000-0000-000000000002',
    'a0031000-0000-0000-0000-000000000001',
    'gerente_general',
    'AUTH DB 003 Global Manager',
    true
  ),
  (
    'a0030000-0000-0000-0000-000000000003',
    'a0031000-0000-0000-0000-000000000001',
    'gerente',
    'AUTH DB 003 Manager',
    true
  ),
  (
    'a0030000-0000-0000-0000-000000000004',
    'a0031000-0000-0000-0000-000000000001',
    'cajero',
    'AUTH DB 003 Cashier',
    true
  );

insert into public.employee_sites (
  employee_id,
  site_id,
  is_primary,
  is_active
)
values
  (
    'a0030000-0000-0000-0000-000000000001',
    'a0031000-0000-0000-0000-000000000001',
    true,
    true
  ),
  (
    'a0030000-0000-0000-0000-000000000002',
    'a0031000-0000-0000-0000-000000000001',
    true,
    true
  ),
  (
    'a0030000-0000-0000-0000-000000000003',
    'a0031000-0000-0000-0000-000000000001',
    true,
    true
  ),
  (
    'a0030000-0000-0000-0000-000000000004',
    'a0031000-0000-0000-0000-000000000001',
    true,
    true
  )
on conflict (employee_id, site_id) do nothing;

select plan(34);

select cmp_ok(
  (
    select count(*)
    from pg_catalog.pg_proc p
    join pg_catalog.pg_namespace n
      on n.oid = p.pronamespace
    where n.nspname in (
      'app_private',
      'club',
      'pass',
      'public',
      'talento',
      'vital'
    )
  ),
  '>=',
  407::bigint,
  'governed function universe preserves the AUTH-DB-014 baseline while allowing additive governed routines'
);

select is(
  (
    select count(*)
    from pg_catalog.pg_proc p
    join pg_catalog.pg_namespace n
      on n.oid = p.pronamespace
    where n.nspname in (
      'app_private',
      'club',
      'pass',
      'public',
      'talento',
      'vital'
    )
      and p.prosecdef
  ),
  222::bigint,
  'SECURITY DEFINER total includes six AUTH-DB-014 privileged device-audit writers after the AUTH-DB-013 baseline'
);

select is(
  (
    select count(*)
    from pg_catalog.pg_proc p
    join pg_catalog.pg_namespace n
      on n.oid = p.pronamespace
    where n.nspname in (
      'app_private',
      'club',
      'pass',
      'public',
      'talento'
    )
      and p.prosecdef
  ),
  217::bigint,
  'Vento SECURITY DEFINER total includes six AUTH-DB-014 privileged device-audit writers after the AUTH-DB-013 baseline'
);

select is(
  (
    select count(*)
    from pg_catalog.pg_proc p
    join pg_catalog.pg_namespace n
      on n.oid = p.pronamespace
    where n.nspname = 'vital'
      and p.prosecdef
  ),
  5::bigint,
  'VITAL authoritative boundary remains unchanged at five'
);

select is(
  (
    select count(*)
    from pg_catalog.pg_proc p
    join pg_catalog.pg_namespace n
      on n.oid = p.pronamespace
    where n.nspname in (
      'app_private',
      'club',
      'pass',
      'public',
      'talento',
      'vital'
    )
      and p.prosecdef
      and p.prorettype <> 'trigger'::regtype
  ),
  188::bigint,
  'direct SECURITY DEFINER total includes six AUTH-DB-014 privileged device-audit writers after the AUTH-DB-013 baseline'
);

select is(
  (
    select count(*)
    from pg_catalog.pg_proc p
    join pg_catalog.pg_namespace n
      on n.oid = p.pronamespace
    where n.nspname in (
      'app_private',
      'club',
      'pass',
      'public',
      'talento',
      'vital'
    )
      and p.prosecdef
      and p.prorettype = 'trigger'::regtype
  ),
  34::bigint,
  'authoritative trigger SECURITY DEFINER cohort includes two AUTH-DB-035 freshness trigger functions'
);

with expected(signature) as (
  values
    (
      'public.can_access_recipe_scope(p_site_id uuid, p_area_id uuid)'
    ),
    ('public.current_employee_area_id()'),
    ('public.current_employee_site_id()'),
    ('public.is_active_staff()'),
    ('public.is_global_manager()'),
    ('public.is_manager()'),
    ('public.is_manager_or_owner()'),
    ('public.is_owner()')
)
select is(
  (
    select count(*)
    from expected e
    join pg_catalog.pg_proc p
      on format(
        '%I.%I(%s)',
        (
          select n.nspname
          from pg_catalog.pg_namespace n
          where n.oid = p.pronamespace
        ),
        p.proname,
        pg_get_function_identity_arguments(p.oid)
      ) = e.signature
    where not p.prosecdef
  ),
  8::bigint,
  'exactly eight approved wrappers are SECURITY INVOKER'
);

with expected(signature, body_md5) as (
  values
    (
      'public.can_access_recipe_scope(p_site_id uuid, p_area_id uuid)',
      'a43d76af47c6e3f2c10fcb504cab4803'
    ),
    (
      'public.current_employee_area_id()',
      '96dc4c7b968dd4525510b9c66c59f7a4'
    ),
    (
      'public.current_employee_site_id()',
      '2e478f29e06c7bafb9214a17d384a028'
    ),
    (
      'public.is_active_staff()',
      '96927b1f831a1e97b006b9ea2d25cc6c'
    ),
    (
      'public.is_global_manager()',
      'bd7997fcfba09712e790ae3c9213890b'
    ),
    (
      'public.is_manager()',
      'c64498e4160030d5115b43e9c18a4dec'
    ),
    (
      'public.is_manager_or_owner()',
      '25f4a2af9ba3f056e95091413fc5a43d'
    ),
    (
      'public.is_owner()',
      'd67bd14c118d7b7e6fa1e1575215855d'
    )
)
select is(
  (
    select count(*)
    from expected e
    join pg_catalog.pg_proc p
      on format(
        '%I.%I(%s)',
        (
          select n.nspname
          from pg_catalog.pg_namespace n
          where n.oid = p.pronamespace
        ),
        p.proname,
        pg_get_function_identity_arguments(p.oid)
      ) = e.signature
    where md5(
      replace(
        p.prosrc,
        E'\r\n',
        E'\n'
      )
    ) = e.body_md5
  ),
  8::bigint,
  'all eight approved wrapper bodies are preserved'
);

with expected(signature) as (
  values
    (
      'public.can_access_recipe_scope(p_site_id uuid, p_area_id uuid)'
    ),
    ('public.current_employee_area_id()'),
    ('public.current_employee_site_id()'),
    ('public.is_active_staff()'),
    ('public.is_global_manager()'),
    ('public.is_manager()'),
    ('public.is_manager_or_owner()'),
    ('public.is_owner()')
)
select is(
  (
    select count(*)
    from expected e
    join pg_catalog.pg_proc p
      on format(
        '%I.%I(%s)',
        (
          select n.nspname
          from pg_catalog.pg_namespace n
          where n.oid = p.pronamespace
        ),
        p.proname,
        pg_get_function_identity_arguments(p.oid)
      ) = e.signature
    where pg_get_userbyid(p.proowner) = 'postgres'
  ),
  8::bigint,
  'all eight wrapper owners remain postgres in this task'
);

with expected(signature) as (
  values
    (
      'public.can_access_recipe_scope(p_site_id uuid, p_area_id uuid)'
    ),
    ('public.current_employee_area_id()'),
    ('public.current_employee_site_id()'),
    ('public.is_active_staff()'),
    ('public.is_global_manager()'),
    ('public.is_manager()'),
    ('public.is_manager_or_owner()'),
    ('public.is_owner()')
)
select is(
  (
    select count(*)
    from expected e
    join pg_catalog.pg_proc p
      on format(
        '%I.%I(%s)',
        (
          select n.nspname
          from pg_catalog.pg_namespace n
          where n.oid = p.pronamespace
        ),
        p.proname,
        pg_get_function_identity_arguments(p.oid)
      ) = e.signature
    where coalesce(
      array_to_string(p.proconfig, ','),
      ''
    ) = 'search_path=public'
  ),
  8::bigint,
  'converted wrappers retain only explicit public search_path'
);

with expected(signature) as (
  values
    (
      'public.can_access_recipe_scope(p_site_id uuid, p_area_id uuid)'
    ),
    ('public.current_employee_area_id()'),
    ('public.current_employee_site_id()'),
    ('public.is_active_staff()'),
    ('public.is_global_manager()'),
    ('public.is_manager()'),
    ('public.is_manager_or_owner()'),
    ('public.is_owner()')
)
select is(
  (
    select count(*)
    from expected e
    join pg_catalog.pg_proc p
      on format(
        '%I.%I(%s)',
        (
          select n.nspname
          from pg_catalog.pg_namespace n
          where n.oid = p.pronamespace
        ),
        p.proname,
        pg_get_function_identity_arguments(p.oid)
      ) = e.signature
    where has_function_privilege(
      'anon',
      p.oid,
      'EXECUTE'
    )
  ),
  8::bigint,
  'anon effective EXECUTE is preserved'
);

with expected(signature) as (
  values
    (
      'public.can_access_recipe_scope(p_site_id uuid, p_area_id uuid)'
    ),
    ('public.current_employee_area_id()'),
    ('public.current_employee_site_id()'),
    ('public.is_active_staff()'),
    ('public.is_global_manager()'),
    ('public.is_manager()'),
    ('public.is_manager_or_owner()'),
    ('public.is_owner()')
)
select is(
  (
    select count(*)
    from expected e
    join pg_catalog.pg_proc p
      on format(
        '%I.%I(%s)',
        (
          select n.nspname
          from pg_catalog.pg_namespace n
          where n.oid = p.pronamespace
        ),
        p.proname,
        pg_get_function_identity_arguments(p.oid)
      ) = e.signature
    where has_function_privilege(
      'authenticated',
      p.oid,
      'EXECUTE'
    )
  ),
  8::bigint,
  'authenticated effective EXECUTE is preserved'
);

with expected(signature) as (
  values
    (
      'public.can_access_recipe_scope(p_site_id uuid, p_area_id uuid)'
    ),
    ('public.current_employee_area_id()'),
    ('public.current_employee_site_id()'),
    ('public.is_active_staff()'),
    ('public.is_global_manager()'),
    ('public.is_manager()'),
    ('public.is_manager_or_owner()'),
    ('public.is_owner()')
)
select is(
  (
    select count(*)
    from expected e
    join pg_catalog.pg_proc p
      on format(
        '%I.%I(%s)',
        (
          select n.nspname
          from pg_catalog.pg_namespace n
          where n.oid = p.pronamespace
        ),
        p.proname,
        pg_get_function_identity_arguments(p.oid)
      ) = e.signature
    where has_function_privilege(
      'service_role',
      p.oid,
      'EXECUTE'
    )
  ),
  8::bigint,
  'service_role effective EXECUTE is preserved'
);

with expected(signature) as (
  values
    ('public.current_employee_selected_area_id()'),
    ('public.current_employee_selected_site_id()'),
    ('public.is_employee()'),
    ('public.current_employee_role()'),
    ('public.can_access_site(p_site_id uuid)'),
    ('public.can_access_area(p_area_id uuid)')
)
select is(
  (
    select count(*)
    from expected e
    join pg_catalog.pg_proc p
      on format(
        '%I.%I(%s)',
        (
          select n.nspname
          from pg_catalog.pg_namespace n
          where n.oid = p.pronamespace
        ),
        p.proname,
        pg_get_function_identity_arguments(p.oid)
      ) = e.signature
    where p.prosecdef
      and has_function_privilege(
        'authenticated',
        p.oid,
        'EXECUTE'
      )
  ),
  6::bigint,
  'delegated privileged cores remain available'
);

with expected(proname, body_md5) as (
  values
    (
      'notify_shift_published',
      '3756e852e9806deaabe419c73f2ce4c2'
    ),
    (
      'update_loyalty_balance',
      '5d6893c0f7dd1e9f8dbd67ecaa60d5b2'
    )
)
select is(
  (
    select count(*)
    from expected e
    join pg_catalog.pg_proc p
      on p.proname = e.proname
    join pg_catalog.pg_namespace n
      on n.oid = p.pronamespace
    where n.nspname = 'public'
      and p.prosecdef
      and p.prorettype = 'trigger'::regtype
      and md5(
        replace(
          p.prosrc,
          E'\r\n',
          E'\n'
        )
      ) = e.body_md5
  ),
  2::bigint,
  'RETIRE functions remain unchanged'
);

select is(
  (
    select count(*)
    from pg_catalog.pg_proc p
    join pg_catalog.pg_namespace n
      on n.oid = p.pronamespace
    where n.nspname = 'public'
      and p.proname =
        'viso_enforce_monthly_schedule_publish_limit'
      and p.prosecdef
      and p.prorettype = 'trigger'::regtype
      and pg_get_userbyid(p.proowner) = 'postgres'
      and coalesce(
        array_to_string(p.proconfig, ','),
        ''
      ) = 'search_path=public'
      and md5(
        replace(
          p.prosrc,
          E'\r\n',
          E'\n'
        )
      ) = 'da4848076978767fabe5f79c40a54e25'
  ),
  1::bigint,
  'VISO guard remains unchanged'
);

select is(
  (
    select count(*)
    from pg_catalog.pg_proc p
    join pg_catalog.pg_namespace n
      on n.oid = p.pronamespace
    join pg_catalog.pg_trigger t
      on t.tgfoid = p.oid
     and not t.tgisinternal
    where n.nspname = 'public'
      and p.proname =
        'viso_enforce_monthly_schedule_publish_limit'
  ),
  1::bigint,
  'VISO guard keeps its local trigger association'
);

set local role authenticated;
set local request.jwt.claim.sub =
  'a0030000-0000-0000-0000-000000000001';

select is(
  public.is_owner(),
  true,
  'owner remains recognized'
);

select is(
  public.is_manager_or_owner(),
  true,
  'owner remains manager-or-owner'
);

select is(
  coalesce(public.is_global_manager(), false),
  false,
  'owner is not misclassified as global manager'
);

select is(
  public.is_active_staff(),
  true,
  'owner remains active staff'
);

select is(
  public.current_employee_site_id(),
  'a0031000-0000-0000-0000-000000000001'::uuid,
  'owner current site remains available'
);

select ok(
  public.current_employee_area_id() is null,
  'owner area remains null without assignment'
);

select is(
  public.can_access_recipe_scope(
    null::uuid,
    null::uuid
  ),
  true,
  'owner retains global recipe scope'
);

reset role;

set local role authenticated;
set local request.jwt.claim.sub =
  'a0030000-0000-0000-0000-000000000002';

select is(
  public.is_global_manager(),
  true,
  'global manager remains recognized'
);

select is(
  public.is_manager_or_owner(),
  true,
  'global manager remains manager-or-owner'
);

select is(
  coalesce(public.is_owner(), false),
  false,
  'global manager is not promoted to owner'
);

reset role;

set local role authenticated;
set local request.jwt.claim.sub =
  'a0030000-0000-0000-0000-000000000003';

select is(
  public.is_manager(),
  true,
  'site manager remains recognized'
);

select is(
  public.is_manager_or_owner(),
  true,
  'site manager remains manager-or-owner'
);

reset role;

set local role authenticated;
set local request.jwt.claim.sub =
  'a0030000-0000-0000-0000-000000000004';

select is(
  public.is_active_staff(),
  true,
  'cashier remains active staff'
);

select is(
  coalesce(public.is_manager_or_owner(), false),
  false,
  'cashier is not promoted to management'
);

select is(
  coalesce(public.can_access_recipe_scope(null::uuid, null::uuid), false),
  false,
  'cashier receives no global recipe scope'
);

reset role;

set local role authenticated;
set local request.jwt.claim.sub =
  'a0030000-0000-0000-0000-000000000005';

select is(
  coalesce(public.is_active_staff(), false),
  false,
  'user without employee identity is not active staff'
);

select is(
  coalesce(public.is_owner(), false),
  false,
  'user without employee identity is not owner'
);

reset role;

select * from finish();
rollback;
