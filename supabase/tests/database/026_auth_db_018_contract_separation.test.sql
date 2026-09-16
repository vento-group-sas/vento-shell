-- VENTO_DB_TEST_CATEGORY: RPC
begin;
    create extension
    if not exists pgtap with schema extensions;
        create temporary table auth_db_018_rpc_contracts
            (
                rpc_schema text not null,
                rpc_name   text not null,
                primary key (rpc_schema, rpc_name)
            )
        on commit drop;
        insert into auth_db_018_rpc_contracts
            (
                rpc_schema,
                rpc_name
            )
        values
            (
                'club',
                'can_access_beta'
            )
            ,
            (
                'club',
                'get_my_membership'
            )
            ,
            (
                'club',
                'get_my_wallet'
            )
            ,
            (
                'club',
                'list_my_wallet_ledger'
            )
            ,
            (
                'pass',
                'get_my_total_earned_points'
            )
            ,
            (
                'public',
                'anima_diagnostic_employee_push_tokens'
            )
            ,
            (
                'public',
                'anima_diagnostic_push_token_coverage'
            )
            ,
            (
                'public',
                'anonymize_user_personal_data'
            )
            ,
            (
                'public',
                'apply_inventory_count_adjustments'
            )
            ,
            (
                'public',
                'apply_master_inventory_profile_batch'
            )
            ,
            (
                'public',
                'apply_master_presentation_version_batch'
            )
            ,
            (
                'public',
                'apply_master_product_identity_batch'
            )
            ,
            (
                'public',
                'apply_master_product_site_batch'
            )
            ,
            (
                'public',
                'apply_master_production_route_batch'
            )
            ,
            (
                'public',
                'apply_master_request_policy_batch'
            )
            ,
            (
                'public',
                'apply_master_request_policy_rules_batch'
            )
            ,
            (
                'public',
                'apply_master_request_policy_units_batch'
            )
            ,
            (
                'public',
                'apply_master_supplier_purchase_batch'
            )
            ,
            (
                'public',
                'apply_restock_receipt'
            )
            ,
            (
                'public',
                'apply_restock_shipment_from_picks'
            )
            ,
            (
                'public',
                'apply_shared_device_template_actor_policies_v1'
            )
            ,
            (
                'public',
                'archive_finished_order_conversations'
            )
            ,
            (
                'public',
                'assign_inventory_stock_to_location'
            )
            ,
            (
                'public',
                'assign_inventory_stock_to_position'
            )
            ,
            (
                'public',
                'attach_shared_device_action_signature_target'
            )
            ,
            (
                'public',
                'award_loyalty_points_external'
            )
            ,
            (
                'public',
                'bootstrap_my_candidate'
            )
            ,
            (
                'public',
                'checkout_fail_payment_transaction'
            )
            ,
            (
                'public',
                'checkout_find_payment_transaction_by_reference'
            )
            ,
            (
                'public',
                'checkout_get_payment_transaction'
            )
            ,
            (
                'public',
                'checkout_get_payment_webhook_event'
            )
            ,
            (
                'public',
                'checkout_mark_payment_transaction_requires_action'
            )
            ,
            (
                'public',
                'checkout_record_payment_webhook_event'
            )
            ,
            (
                'public',
                'close_inventory_count_session'
            )
            ,
            (
                'public',
                'confirm_interview'
            )
            ,
            (
                'public',
                'confirm_remission_shipment_receipt'
            )
            ,
            (
                'public',
                'consume_inventory_stock_by_uom_profile'
            )
            ,
            (
                'public',
                'consume_inventory_stock_from_positions'
            )
            ,
            (
                'public',
                'create_gift_aware_scheduled_order_checkout_draft'
            )
            ,
            (
                'public',
                'create_inventory_count_session_with_lines'
            )
            ,
            (
                'public',
                'create_order_delivery_courier_link'
            )
            ,
            (
                'public',
                'create_remission_shipment_from_fulfillments'
            )
            ,
            (
                'public',
                'current_employee_site_id'
            )
            ,
            (
                'public',
                'current_shared_operational_device_v1'
            )
            ,
            (
                'public',
                'deactivate_master_request_policy_batch'
            )
            ,
            (
                'public',
                'employee_wallet_eligibility'
            )
            ,
            (
                'public',
                'end_attendance_break'
            )
            ,
            (
                'public',
                'ensure_order_conversation'
            )
            ,
            (
                'public',
                'fogo_recipe_area_options'
            )
            ,
            (
                'public',
                'generate_manual_daily_internal_pos_documents'
            )
            ,
            (
                'public',
                'get_client_order_chat_unread_counts'
            )
            ,
            (
                'public',
                'get_effective_context_v1'
            )
            ,
            (
                'public',
                'get_operational_context'
            )
            ,
            (
                'public',
                'get_order_delivery_pin'
            )
            ,
            (
                'public',
                'get_order_delivery_slots'
            )
            ,
            (
                'public',
                'get_order_reschedule_slots_admin'
            )
            ,
            (
                'public',
                'get_restock_request_operational_summary'
            )
            ,
            (
                'public',
                'get_site_order_status'
            )
            ,
            (
                'public',
                'get_staff_order_chat_unread_counts'
            )
            ,
            (
                'public',
                'has_effective_permission_v1'
            )
            ,
            (
                'public',
                'has_operational_permission'
            )
            ,
            (
                'public',
                'has_operational_role_permission'
            )
            ,
            (
                'public',
                'has_permission'
            )
            ,
            (
                'public',
                'mark_order_conversation_read'
            )
            ,
            (
                'public',
                'mark_payment_transaction_status'
            )
            ,
            (
                'public',
                'nexo_kiosk_withdraw_workers'
            )
            ,
            (
                'public',
                'origo_mark_inventory_entry_corrected'
            )
            ,
            (
                'public',
                'origo_reverse_inventory_entry'
            )
            ,
            (
                'public',
                'override_order_delivery_confirmation'
            )
            ,
            (
                'public',
                'preview_manual_daily_internal_pos_documents'
            )
            ,
            (
                'public',
                'price_restock_request_internal_transfer'
            )
            ,
            (
                'public',
                'promote_app_screen_to_navigation'
            )
            ,
            (
                'public',
                'pulso_post_daily_sales_import'
            )
            ,
            (
                'public',
                'reconcile_staff_invitations'
            )
            ,
            (
                'public',
                'reconcile_zero_internal_positions_for_location_product'
            )
            ,
            (
                'public',
                'register_shift_departure_event'
            )
            ,
            (
                'public',
                'register_shift_departure_event_autoclose'
            )
            ,
            (
                'public',
                'reschedule_scheduled_order_admin'
            )
            ,
            (
                'public',
                'resolve_scheduled_order_contact_admin'
            )
            ,
            (
                'public',
                'respond_to_offer'
            )
            ,
            (
                'public',
                'reverse_restock_request'
            )
            ,
            (
                'public',
                'set_employee_kiosk_pin'
            )
            ,
            (
                'public',
                'set_order_conversation_archived'
            )
            ,
            (
                'public',
                'sign_shared_device_action'
            )
            ,
            (
                'public',
                'split_restock_request_item'
            )
            ,
            (
                'public',
                'start_attendance_break'
            )
            ,
            (
                'public',
                'start_context_simulation_v1'
            )
            ,
            (
                'public',
                'stop_context_simulation_v1'
            )
            ,
            (
                'public',
                'submit_application'
            )
            ,
            (
                'public',
                'sync_attendance_events'
            )
            ,
            (
                'public',
                'sync_restock_request_status_from_items'
            )
            ,
            (
                'public',
                'update_order_gift_operational_state'
            )
            ,
            (
                'public',
                'update_order_operational_state'
            )
            ,
            (
                'public',
                'upsert_app_screen_registry'
            )
            ,
            (
                'public',
                'upsert_employee_site_operational_profile'
            )
            ,
            (
                'public',
                'upsert_inventory_stock_by_location'
            )
            ,
            (
                'public',
                'upsert_inventory_stock_by_uom_profile'
            )
            ,
            (
                'public',
                'upsert_operational_checkin_point'
            )
            ,
            (
                'public',
                'upsert_site_operational_role'
            )
            ,
            (
                'public',
                'viso_accounting_dashboard'
            )
        ;
        select
            plan(26);
        select
            is(
            (
                select
                    count(*)
                from
                    auth_db_018_rpc_contracts), 100::bigint, 'AUTH-DB-018 reuses exactly 100 canonical RPC contracts from AUTH-SRV-003' );
        select
            is(
            (
                select
                    count(*)
                from
                    pg_catalog.pg_class c
                join
                    pg_catalog.pg_namespace n
                on
                    n.oid = c.relnamespace
                where
                    n.nspname in ('app_private'
                                  ,
                                  'club'
                                  ,
                                  'pass'
                                  ,
                                  'payments'
                                  ,
                                  'pos'
                                  ,
                                  'public'
                                  ,
                                  'talento'
                                  ,
                                  'viso')
                and c.relkind = 'v' ), 63::bigint, 'current Vento view inventory includes the private AUTH-DB-035 session freshness bridge' );
        select
            is(
            (
                select
                    count(*)
                from
                    pg_catalog.pg_class c
                join
                    pg_catalog.pg_namespace n
                on
                    n.oid = c.relnamespace
                where
                    n.nspname in ('app_private'
                                  ,
                                  'club'
                                  ,
                                  'pass'
                                  ,
                                  'payments'
                                  ,
                                  'pos'
                                  ,
                                  'public'
                                  ,
                                  'talento'
                                  ,
                                  'viso')
                and c.relkind                                = 'v'
                and coalesce(c.reloptions, array[]::text[]) @> array['security_invoker=true']::text[] ), 58::bigint, '58 source views use security_invoker' );
        select
            is(
            (
                select
                    count(*)
                from
                    pg_catalog.pg_class c
                join
                    pg_catalog.pg_namespace n
                on
                    n.oid = c.relnamespace
                where
                    n.nspname in ('app_private'
                                  ,
                                  'club'
                                  ,
                                  'pass'
                                  ,
                                  'payments'
                                  ,
                                  'pos'
                                  ,
                                  'public'
                                  ,
                                  'talento'
                                  ,
                                  'viso')
                and c.relkind = 'v'
                and not (
                        coalesce(c.reloptions, array[]::text[]) @> array['security_invoker=true']::text[]) ), 5::bigint, 'five privileged source views include the private AUTH-DB-035 session freshness bridge' );
        select
            cmp_ok(
            (
                select
                    count(*)
                from
                    pg_catalog.pg_proc p
                join
                    pg_catalog.pg_namespace n
                on
                    n.oid = p.pronamespace
                where
                    n.nspname in ('app_private'
                                  ,
                                  'club'
                                  ,
                                  'pass'
                                  ,
                                  'payments'
                                  ,
                                  'pos'
                                  ,
                                  'public'
                                  ,
                                  'talento'
                                  ,
                                  'viso')
                and p.prokind    = 'f'
                and p.prorettype <> 'trigger'::regtype
                and p.prorettype <> 'event_trigger'::regtype
                and not exists
                    (
                        select
                            1
                        from
                            pg_catalog.pg_depend d
                        where
                            d.classid = 'pg_proc'::regclass
                        and d.objid   = p.oid
                        and d.deptype = 'e' ) ), '>=', 279::bigint,
  'direct Vento routine inventory preserves the AUTH-DB-014 baseline while allowing additive governed routines' );
        select
            is(
            (
                select
                    count(*)
                from
                    pg_catalog.pg_proc p
                join
                    pg_catalog.pg_namespace n
                on
                    n.oid = p.pronamespace
                where
                    n.nspname in ('app_private'
                                  ,
                                  'club'
                                  ,
                                  'pass'
                                  ,
                                  'payments'
                                  ,
                                  'pos'
                                  ,
                                  'public'
                                  ,
                                  'talento'
                                  ,
                                  'viso')
                and p.prokind    = 'f'
                and p.prorettype <> 'trigger'::regtype
                and p.prorettype <> 'event_trigger'::regtype
                and p.prosecdef
                and not exists
                    (
                        select
                            1
                        from
                            pg_catalog.pg_depend d
                        where
                            d.classid = 'pg_proc'::regclass
                        and d.objid   = p.oid
                        and d.deptype = 'e' ) ), 183::bigint,
  'direct SECURITY DEFINER inventory includes six AUTH-DB-014 privileged device-audit writers after the AUTH-DB-013 baseline' );
        select
            is(
            (
                select
                    count(*)
                from
                    pg_catalog.pg_proc p
                join
                    pg_catalog.pg_namespace n
                on
                    n.oid = p.pronamespace
                where
                    n.nspname in ('app_private'
                                  ,
                                  'club'
                                  ,
                                  'pass'
                                  ,
                                  'payments'
                                  ,
                                  'pos'
                                  ,
                                  'public'
                                  ,
                                  'talento'
                                  ,
                                  'viso')
                and p.prokind = 'f'
                and p.prorettype in ('trigger'::regtype
                                     ,
                                     'event_trigger'::regtype)
                and not exists
                    (
                        select
                            1
                        from
                            pg_catalog.pg_depend d
                        where
                            d.classid = 'pg_proc'::regclass
                        and d.objid   = p.oid
                        and d.deptype = 'e' ) ), 77::bigint, 'trigger function inventory includes the AUTH-DB-013 and AUTH-DB-014 append-only mutation guards plus existing freshness triggers' );
        select
            is(
            (
                select
                    count(*)
                from
                    pg_catalog.pg_proc p
                join
                    pg_catalog.pg_namespace n
                on
                    n.oid = p.pronamespace
                where
                    n.nspname in ('app_private'
                                  ,
                                  'club'
                                  ,
                                  'pass'
                                  ,
                                  'payments'
                                  ,
                                  'pos'
                                  ,
                                  'public'
                                  ,
                                  'talento'
                                  ,
                                  'viso')
                and p.prokind    = 'f'
                and p.prorettype <> 'trigger'::regtype
                and p.prorettype <> 'event_trigger'::regtype
                and exists
                    (
                        select
                            1
                        from
                            pg_catalog.pg_depend d
                        where
                            d.classid = 'pg_proc'::regclass
                        and d.objid   = p.oid
                        and d.deptype = 'e' ) ), 4::bigint, 'four extension routines are explicitly platform-managed' );
        select
            is( 63::bigint + 268::bigint, 331::bigint, 'primary classification universe includes ten AUTH-DB-014 non-trigger app_private device-audit helpers' );
        select
            is(
            (
                select
                    count(distinct r.rpc_schema || '.' || r.rpc_name)
                from
                    auth_db_018_rpc_contracts r
                where exists
                    (
                        select
                            1
                        from
                            pg_catalog.pg_proc p
                        join
                            pg_catalog.pg_namespace n
                        on
                            n.oid = p.pronamespace
                        where
                            n.nspname    = r.rpc_schema
                        and p.proname    = r.rpc_name
                        and p.prokind    = 'f'
                        and p.prorettype <> 'trigger'::regtype
                        and p.prorettype <> 'event_trigger'::regtype
                        and not exists
                            (
                                select
                                    1
                                from
                                    pg_catalog.pg_depend d
                                where
                                    d.classid = 'pg_proc'::regclass
                                and d.objid   = p.oid
                                and d.deptype = 'e' ) ) ), 93::bigint, '93 canonical RPC contracts still exist in the current catalog' );
        select
            is(
            (
                select
                    count(*)
                from
                    auth_db_018_rpc_contracts r
                where not exists
                    (
                        select
                            1
                        from
                            pg_catalog.pg_proc p
                        join
                            pg_catalog.pg_namespace n
                        on
                            n.oid = p.pronamespace
                        where
                            n.nspname    = r.rpc_schema
                        and p.proname    = r.rpc_name
                        and p.prokind    = 'f'
                        and p.prorettype <> 'trigger'::regtype
                        and p.prorettype <> 'event_trigger'::regtype
                        and not exists
                            (
                                select
                                    1
                                from
                                    pg_catalog.pg_depend d
                                where
                                    d.classid = 'pg_proc'::regclass
                                and d.objid   = p.oid
                                and d.deptype = 'e' ) ) ), 7::bigint, 'seven historical consumed RPC contracts are absent and are not recreated by inference' );
        select
            is(
            (
                select
                    count(distinct r.rpc_schema || '.' || r.rpc_name)
                from
                    auth_db_018_rpc_contracts r
                where exists
                    (
                        select
                            1
                        from
                            pg_catalog.pg_proc p
                        join
                            pg_catalog.pg_namespace n
                        on
                            n.oid = p.pronamespace
                        where
                            n.nspname    = r.rpc_schema
                        and p.proname    = r.rpc_name
                        and p.prokind    = 'f'
                        and p.prorettype <> 'trigger'::regtype
                        and p.prorettype <> 'event_trigger'::regtype
                        and not exists
                            (
                                select
                                    1
                                from
                                    pg_catalog.pg_depend d
                                where
                                    d.classid = 'pg_proc'::regclass
                                and d.objid   = p.oid
                                and d.deptype = 'e' )
                        and (
                                has_function_privilege('authenticated', p.oid, 'EXECUTE') ) ) ), 83::bigint, '83 current canonical RPC contracts remain client-executable candidates' );
        select
            is(
            (
                select
                    count(distinct r.rpc_schema || '.' || r.rpc_name)
                from
                    auth_db_018_rpc_contracts r
                where exists
                    (
                        select
                            1
                        from
                            pg_catalog.pg_proc p
                        join
                            pg_catalog.pg_namespace n
                        on
                            n.oid = p.pronamespace
                        where
                            n.nspname    = r.rpc_schema
                        and p.proname    = r.rpc_name
                        and p.prokind    = 'f'
                        and p.prorettype <> 'trigger'::regtype
                        and p.prorettype <> 'event_trigger'::regtype
                        and not exists
                            (
                                select
                                    1
                                from
                                    pg_catalog.pg_depend d
                                where
                                    d.classid = 'pg_proc'::regclass
                                and d.objid   = p.oid
                                and d.deptype = 'e' )
                        and not has_function_privilege('authenticated', p.oid, 'EXECUTE') ) ), 10::bigint, '10 current canonical RPC contracts remain server-only and are not copied to api' );
        select
            ok( to_regnamespace('api') is not null, 'api schema exists from AUTH-DB-016 foundation' );
        select
            is(
            (
                select
                    count(*)
                from
                    pg_catalog.pg_class c
                join
                    pg_catalog.pg_namespace n
                on
                    n.oid = c.relnamespace
                where
                    n.nspname = 'api'
                and c.relkind = 'v' ), 57::bigint, 'api contains exactly 57 canonical security-invoker read views after preserving the public compatibility duplicate' );
        select
            cmp_ok(
            (
                select
                    count(*)
                from
                    pg_catalog.pg_proc p
                join
                    pg_catalog.pg_namespace n
                on
                    n.oid = p.pronamespace
                where
                    n.nspname = 'api'
                and p.prokind = 'f' ), '>=', (
                select
                    count(*)
                from
                    pg_catalog.pg_proc p
                join
                    pg_catalog.pg_namespace n
                on
                    n.oid = p.pronamespace
                join
                    auth_db_018_rpc_contracts r
                on
                    r.rpc_schema = n.nspname
                and r.rpc_name   = p.proname
                where
                    n.nspname in ('app_private'
                                  ,
                                  'club'
                                  ,
                                  'pass'
                                  ,
                                  'payments'
                                  ,
                                  'pos'
                                  ,
                                  'public'
                                  ,
                                  'talento'
                                  ,
                                  'viso')
                and p.prokind    = 'f'
                and p.prorettype <> 'trigger'::regtype
                and p.prorettype <> 'event_trigger'::regtype
                and not exists
                    (
                        select
                            1
                        from
                            pg_catalog.pg_depend d
                        where
                            d.classid = 'pg_proc'::regclass
                        and d.objid   = p.oid
                        and d.deptype = 'e' )
                and has_function_privilege('authenticated', p.oid, 'EXECUTE') ) + 2::bigint, 'api preserves every published legacy wrapper and the governed safe-wrapper baseline while allowing additive governed RPCs' );
        select
            is(
            (
                select
                    count(*)
                from
                    pg_catalog.pg_class c
                join
                    pg_catalog.pg_namespace n
                on
                    n.oid = c.relnamespace
                where
                    n.nspname = 'api'
                and c.relkind = 'v'
                and not (
                        coalesce(c.reloptions, array[]::text[]) @> array['security_invoker=true']::text[]) ), 0::bigint, 'every api view is security_invoker' );
        select
            ok(
            (
                select
                    count(*) >= 2
                from
                    pg_catalog.pg_proc p
                join
                    pg_catalog.pg_namespace n
                on
                    n.oid = p.pronamespace
                where
                    n.nspname = 'api'
                and p.prosecdef )
            and not exists
            (
                select
                    1
                from
                    pg_catalog.pg_proc p
                join
                    pg_catalog.pg_namespace n
                on
                    n.oid = p.pronamespace
                where
                    n.nspname = 'api'
                and p.prosecdef
                and (
                    pg_catalog.pg_get_userbyid(p.proowner) !~ '^vento_[a-z_]+_owner$'
                    or not exists (
                        select 1
                        from pg_catalog.unnest(coalesce(p.proconfig, array[]::text[])) config
                        where config ~ '^search_path='
                    )
                )
            ), 'api preserves the governed SECURITY DEFINER baseline and every additive wrapper has a technical owner plus explicit search_path' );
        select
            is(
            (
                select
                    count(*)
                from
                    pg_catalog.pg_proc p
                join
                    pg_catalog.pg_namespace n
                on
                    n.oid = p.pronamespace
                where
                    n.nspname = 'api'
                and p.prorettype in ('trigger'::regtype
                                     ,
                                     'event_trigger'::regtype) ), 0::bigint, 'api contains zero trigger functions' );
        select
            is(
            (
                select
                    count(*)
                from
                    pg_catalog.pg_class c
                join
                    pg_catalog.pg_namespace n
                on
                    n.oid = c.relnamespace
                where
                    n.nspname = 'api'
                and c.relkind in ('r'
                                  ,
                                  'p'
                                  ,
                                  'S') ), 0::bigint, 'api contains zero authoritative tables partitions or sequences' );
        select
            ok( to_regclass('api.permission_catalog_human_v1') is null, 'privileged permission_catalog_human_v1 is not published as-is' );
        select
            ok( to_regclass('api.shared_operational_device_actor_policies_admin_v1') is null, 'privileged shared_operational_device_actor_policies_admin_v1 is not published as-is' );
        select
            ok( to_regclass('api.shared_operational_device_templates_admin_v1') is null, 'privileged shared_operational_device_templates_admin_v1 is not published as-is' );
        select
            ok( to_regclass('api.shared_operational_devices_admin_v1') is null, 'privileged shared_operational_devices_admin_v1 is not published as-is' );
        select
            ok( exists
            (
                select
                    1
                from
                    supabase_migrations.schema_migrations m
                where
                    m.version                 = '20260828152129'
                and cardinality(m.statements) > 0 )
            and not exists
            (
                select
                    1
                from
                    supabase_migrations.schema_migrations m
                cross join
                    lateral unnest(m.statements) as s(statement)
                where
                    m.version = '20260828152129'
                and s.statement ~* 'grant[[:space:]]+usage[[:space:]]+on[[:space:]]+schema[[:space:]]+"?api"?[[:space:]]+to[[:space:]]+anon([[:space:];,]|$)' ), 'AUTH-DB-018 migration itself grants no anon api USAGE' );
        select
            ok( exists
            (
                select
                    1
                from
                    supabase_migrations.schema_migrations m
                where
                    m.version                 = '20260828152129'
                and cardinality(m.statements) > 0 )
            and not exists
            (
                select
                    1
                from
                    supabase_migrations.schema_migrations m
                cross join
                    lateral unnest(m.statements) as s(statement)
                where
                    m.version = '20260828152129'
                and s.statement ~* 'grant[[:space:]]+usage[[:space:]]+on[[:space:]]+schema[[:space:]]+"?api"?[[:space:]]+to[[:space:]]+authenticated([[:space:];,]|$)' ), 'AUTH-DB-018 migration itself grants no authenticated api USAGE' );
        select
            *
        from
            finish();
        rollback;
