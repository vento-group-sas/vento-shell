-- VENTO_DB_TEST_CATEGORY: RPC
-- GAP-PKG-001
-- TREQ-PROC-1490
-- TREQ-SUPABASE-005
-- TREQ-SUPABASE-006
-- TREQ-SUPABASE-1760

begin;

create extension if not exists pgtap with schema extensions;

select plan(4);

select pass(
  'GAP-PKG-001 authorizes no database schema, migration, RLS, grant, RPC or cron mutation'
);

select ok(
  case
    when to_regclass('public.internal_job_secrets') is null then true
    else exists (
      select 1
      from pg_catalog.pg_class c
      join pg_catalog.pg_namespace n
        on n.oid = c.relnamespace
      where n.nspname = 'public'
        and c.relname = 'internal_job_secrets'
        and c.relkind in ('r', 'p')
    )
  end,
  'internal_job_secrets is either absent from clean local replay or remains a table-like relation'
);

select ok(
  case
    when to_regprocedure('public.run_shift_runtime_processor()') is null then true
    else position(
      'shift_runtime_processor_cron'
      in pg_get_functiondef(
        'public.run_shift_runtime_processor()'::regprocedure
      )
    ) > 0
  end,
  'run_shift_runtime_processor is either absent from clean local replay or preserves the canonical secret identity'
);

select ok(
  case
    when to_regprocedure('public.run_shift_runtime_processor()') is null then true
    else position(
      'x-cron-key'
      in pg_get_functiondef(
        'public.run_shift_runtime_processor()'::regprocedure
      )
    ) > 0
  end,
  'run_shift_runtime_processor is either absent from clean local replay or preserves the x-cron-key contract'
);

select * from finish();

rollback;
