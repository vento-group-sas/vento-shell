import assert from "node:assert/strict";
import { spawnSync } from "node:child_process";
import { stripTypeScriptTypes } from "node:module";
import { runInNewContext } from "node:vm";
import fs from "node:fs";
import path from "node:path";
import test from "node:test";
import { fileURLToPath } from "node:url";

const root = fileURLToPath(new URL("../../../", import.meta.url));
const config = fs.readFileSync(path.join(root, "supabase/config.toml"), "utf8");
const forwardMigration = fs.readFileSync(
  path.join(root, "supabase/migrations/20261012173553_gap_pkg_004_rpc_acl_hardening.sql"),
  "utf8",
);
const employeeSitePolicySql = /\bcreate policy gap_pkg_004_employee_sites_documents_site_scope[\s\S]*?;/iu
  .exec(forwardMigration)?.[0];
assert.ok(employeeSitePolicySql, "The forward migration must define the exact employee-site policy");
assert.match(employeeSitePolicySql, /\bon public\.employee_sites\s+as permissive\s+for select\s+to authenticated\b/iu);
const documentsScopePolicySql = /\balter policy documents_select_self_or_permission[\s\S]*?;/iu
  .exec(forwardMigration)?.[0];
const storageScopePolicySql = /\balter policy documents_select_visible[\s\S]*?;/iu
  .exec(forwardMigration)?.[0];
assert.ok(documentsScopePolicySql, "The forward migration must scope document metadata access");
assert.ok(storageScopePolicySql, "The forward migration must scope document Storage access");
assert.match(documentsScopePolicySql, /has_permission\('viso\.staff\.documents\.manage', target_site\.site_id\)/u);
assert.match(storageScopePolicySql, /has_permission\('viso\.staff\.documents\.manage', target_site\.site_id\)/u);
const syntheticActor = "b0040000-0000-0000-0000-000000000001";

function queryLocalDatabase(sql: string): string {
  assert.match(config, /^project_id\s*=\s*"vento-shell"/m);
  const result = spawnSync(
    "docker",
    [
      "exec", "-i", "supabase_db_vento-shell", "psql",
      "--username", "postgres", "--dbname", "postgres",
      "--no-psqlrc", "--tuples-only", "--no-align", "--quiet",
      "--set", "ON_ERROR_STOP=1",
    ],
    { cwd: root, input: sql, encoding: "utf8", timeout: 90000, windowsHide: true },
  );
  assert.ifError(result.error);
  assert.equal(result.status, 0, result.stderr || result.stdout);
  return result.stdout.trim();
}

function readLocalEdgeSecret(name) {
  assert.match(config, /^project_id\s*=\s*"vento-shell"/m);
  assert.ok(["SUPABASE_SERVICE_ROLE_KEY", "SUPABASE_ANON_KEY"].includes(name));
  const process = spawnSync("docker", [
    "exec", "supabase_edge_runtime_vento-shell", "printenv", name,
  ], { cwd: root, encoding: "utf8", timeout: 12000, windowsHide: true });
  assert.equal(process.status, 0, "Local Docker Edge key lookup failed: " + name);
  const key = (process.stdout || "").trim();
  assert.ok(key.length > 100, "Missing local key: " + name);
  return key;
}

// Local PostgreSQL only. No hosted URL, credentials, or persistent fixtures.
const snapshotSql = [
  "SELECT json_build_object(",
  "  'bucket_public', (SELECT public FROM storage.buckets WHERE id = 'documents'),",
  "  'direct_helper_executable', has_function_privilege(",
  "    'authenticated', 'public.shared_device_actor_is_allowed_v1(uuid,uuid,uuid,uuid)', 'EXECUTE'),",
  "  'signed_action_executable', has_function_privilege(",
  "    'authenticated', 'public.sign_shared_device_action(uuid,text,text,text,text,uuid,text,integer,jsonb)', 'EXECUTE'),",
  "  'synthetic_signatures', (SELECT count(*) FROM public.shared_device_actor_signatures",
  "      WHERE actor_employee_id = '" + syntheticActor + "'::uuid)",
  ");",
].join("\n");

const negativeAccessSql = [
  "BEGIN;",
  "SET LOCAL statement_timeout = '10s';",
  "SET LOCAL ROLE authenticated;",
  "SET LOCAL request.jwt.claim.sub = '" + syntheticActor + "';",
  "DO $gap004_e2e$",
  "BEGIN",
  "  IF auth.uid() IS DISTINCT FROM '" + syntheticActor + "'::uuid THEN",
  "    RAISE EXCEPTION 'GAP004_FAKE_ACTOR_JWT_NOT_APPLIED';",
  "  END IF;",
  "  IF has_function_privilege(",
  "    'authenticated', 'public.shared_device_actor_is_allowed_v1(uuid,uuid,uuid,uuid)', 'EXECUTE'",
  "  ) THEN",
  "    RAISE EXCEPTION 'GAP004_DIRECT_DEVICE_HELPER_STILL_EXPOSED';",
  "  END IF;",
  "  BEGIN",
  "    PERFORM public.shared_device_actor_is_allowed_v1(",
  "      NULL::uuid, '" + syntheticActor + "'::uuid, NULL::uuid, NULL::uuid",
  "    );",
  "    RAISE EXCEPTION 'GAP004_DIRECT_DEVICE_HELPER_UNEXPECTEDLY_SUCCEEDED';",
  "  EXCEPTION WHEN insufficient_privilege THEN",
  "    NULL;",
  "  END;",
  "  IF NOT has_function_privilege(",
  "    'authenticated',",
  "    'public.sign_shared_device_action(uuid,text,text,text,text,uuid,text,integer,jsonb)',",
  "    'EXECUTE'",
  "  ) THEN",
  "    RAISE EXCEPTION 'GAP004_SIGNED_ACTION_PUBLIC_API_BROKEN';",
  "  END IF;",
  "  BEGIN",
  "    PERFORM public.sign_shared_device_action(",
  "      '" + syntheticActor + "'::uuid, 'invalid-synthetic-pin'::text,",
  "      'nexo'::text, 'gap004-negative-probe'::text,",
  "      NULL::text, NULL::uuid, 'pin'::text, 60::integer, '{}'::jsonb",
  "    );",
  "    RAISE EXCEPTION 'GAP004_SIGNED_ACTION_ALLOWED_UNBOUND_DEVICE';",
  "  EXCEPTION WHEN SQLSTATE '28000' THEN",
  "    IF SQLERRM <> 'ACTIVE_SHARED_DEVICE_REQUIRED' THEN",
  "      RAISE EXCEPTION 'GAP004_WRAPPER_UNEXPECTED_DENIAL: %', SQLERRM;",
  "    END IF;",
  "  END;",
  "END;",
  "$gap004_e2e$;",
  "RESET ROLE;",
  "SELECT 'GAP_PKG_004_E2E_NEGATIVE_ACCESS_PASS';",
  "ROLLBACK;",
].join("\n");

test("GAP-PKG-004 denies direct device-helper access but retains a guarded signed-action endpoint", () => {
  const before = JSON.parse(queryLocalDatabase(snapshotSql)) as {
    bucket_public: boolean | null;
    direct_helper_executable: boolean;
    signed_action_executable: boolean;
    synthetic_signatures: number;
  };
  assert.equal(before.bucket_public, false, "Apply the migration in local replay before E2E");
  assert.equal(before.direct_helper_executable, false, "Direct authenticated access must be revoked");
  assert.equal(before.signed_action_executable, true, "Authorized wrapper must stay executable");
  assert.equal(before.synthetic_signatures, 0, "Synthetic fixture must be absent");

  const output = queryLocalDatabase(negativeAccessSql);
  assert.match(output, /^GAP_PKG_004_E2E_NEGATIVE_ACCESS_PASS$/m);
  assert.deepEqual(JSON.parse(queryLocalDatabase(snapshotSql)), before,
    "The negative authorization probe must leave no persisted state");
});


test("GAP-PKG-004 rejects real direct execution of all five privileged RPCs by anon and authenticated", () => {
  // Exact deployed signatures; every invocation runs on local PostgreSQL only.
  const directCalls = [
    "public.get_site_cost_center(NULL::uuid)",
    "public.resolve_internal_transfer_price(NULL::uuid,NULL::uuid,NULL::uuid,NULL::uuid,NULL::text,NULL::timestamptz)",
    "public.resolve_internal_transfer_price_for_profile(NULL::uuid,NULL::uuid,NULL::uuid,NULL::uuid,NULL::uuid,NULL::text,NULL::timestamptz)",
    "public.assert_inventory_uom_profile_stock_input(NULL::uuid,NULL::uuid,NULL::uuid,NULL::uuid,NULL::numeric,NULL::numeric)",
    "public.shared_device_actor_is_allowed_v1(NULL::uuid,NULL::uuid,NULL::uuid,NULL::uuid)",
  ];
  const before = JSON.parse(queryLocalDatabase(snapshotSql));
  for (const role of ["anon", "authenticated"]) {
    const statements = [
      "BEGIN;",
      "SET LOCAL statement_timeout = '10s';",
      "SET LOCAL ROLE " + role + ";",
      "DO $gap004_rpc_denial$",
      "DECLARE statement text;",
      "BEGIN",
      "  IF NOT has_schema_privilege(current_user, 'public', 'USAGE') THEN",
      "    RAISE EXCEPTION 'GAP004_SCHEMA_USAGE_MISSING';",
      "  END IF;",
      "  FOR statement IN SELECT operation FROM (VALUES",
      ...directCalls.map((call) => "    ('SELECT " + call + "')")
        .map((line, i, items) => line + (i < items.length - 1 ? "," : "")),
      "  ) AS calls(operation) LOOP",
      "    BEGIN",
      "      EXECUTE statement;",
      "      RAISE EXCEPTION 'GAP004_DIRECT_EXECUTE_UNEXPECTEDLY_SUCCEEDED: %', statement;",
      "    EXCEPTION WHEN insufficient_privilege THEN",
      "      NULL;",
      "    END;",
      "  END LOOP;",
      "END;",
      "$gap004_rpc_denial$;",
      "RESET ROLE;",
      "SELECT 'GAP004_FIVE_RPC_DENIAL_" + role + "_PASS';",
      "ROLLBACK;",
    ].join("\n");
    assert.match(queryLocalDatabase(statements),
      new RegExp("^GAP004_FIVE_RPC_DENIAL_" + role + "_PASS$", "m"));
  }
  assert.deepEqual(JSON.parse(queryLocalDatabase(snapshotSql)), before,
    "Direct-denial tests must preserve existing local data and ACLs");
});

test("GAP-PKG-004 retains eight cost-inventory and one device definer dependencies", () => {
  // Count distinct caller-to-RPC links separately from repeated calls to a given RPC.
  // Structural evidence only: this does not simulate business operations.
  const names = [
    "consume_inventory_stock_by_uom_profile",
    "set_inventory_stock_by_uom_profile_count",
    "upsert_inventory_stock_by_uom_profile",
    "validate_restock_request_item_pick",
    "value_closed_restock_request",
    "resolve_internal_transfer_price",
    "sign_shared_device_action",
  ];
  const protectedRpcNames = [
    "get_site_cost_center",
    "resolve_internal_transfer_price",
    "resolve_internal_transfer_price_for_profile",
    "assert_inventory_uom_profile_stock_input",
    "shared_device_actor_is_allowed_v1",
  ];
  const rows = JSON.parse(queryLocalDatabase([
    "WITH consumers(name) AS (VALUES",
    ...names.map((name, i) => "  ('" + name + "')" + (i < names.length - 1 ? "," : "")),
    "), protected_rpc(name) AS (VALUES",
    ...protectedRpcNames.map((name, i) => "  ('" + name + "')" +
      (i < protectedRpcNames.length - 1 ? "," : "")),
    "), inspected AS (",
    " SELECT c.name AS caller, p.prosecdef AS definer,",
    "   pg_get_userbyid(p.proowner) AS owner, p.prosrc AS source",
    " FROM consumers c",
    " JOIN pg_proc p ON p.proname = c.name",
    " JOIN pg_namespace n ON n.oid = p.pronamespace AND n.nspname = 'public'",
    ") SELECT coalesce(json_agg(json_build_object(",
    " 'caller', i.caller, 'definer', i.definer, 'owner', i.owner,",
    " 'refs', (SELECT coalesce(json_agg(t.name), '[]'::json)",
    "          FROM protected_rpc t WHERE i.source ~",
    "            ('(^|[^[:alnum:]_])' || t.name || '[[:space:]]*[(]')),",
    " 'call_count', (SELECT count(*) FROM protected_rpc t",
    "   CROSS JOIN LATERAL regexp_matches(i.source,",
    "     ('(^|[^[:alnum:]_])' || t.name || '[[:space:]]*[(]'), 'g') hit)",
    ") ORDER BY i.caller), '[]'::json) FROM inspected i;",
  ].join("\n"))) as Array<{
    caller: string; definer: boolean; owner: string; refs: string[]; call_count: number;
  }>;
  assert.deepEqual([...new Set(rows.map((r) => r.caller))].sort(), [...names].sort(),
    "All seven trusted consumer functions must exist");
  for (const row of rows) {
    assert.equal(row.definer, true, row.caller + " must retain SECURITY DEFINER");
    assert.equal(row.owner, "postgres", row.caller + " must retain the trusted owner");
  }
  const links = new Set(rows.flatMap((r) => r.refs.map((ref) => r.caller + " -> " + ref)));
  const device = [...links].filter((link) => link.endsWith(" -> shared_device_actor_is_allowed_v1"));
  assert.deepEqual(device, ["sign_shared_device_action -> shared_device_actor_is_allowed_v1"]);
  const cost = [...links].filter((link) => !link.endsWith(" -> shared_device_actor_is_allowed_v1"));
  assert.equal(cost.length, 7, "Seven distinct cost/inventory dependencies must remain");
  const costCalls = rows.filter((r) => r.caller !== "sign_shared_device_action")
    .reduce((sum, row) => sum + row.call_count, 0);
  assert.equal(costCalls, 8,
    "Eight actual cost/inventory RPC invocations must remain: " +
    JSON.stringify(rows.map((r) => ({ caller: r.caller, calls: r.call_count }))));
});


test("GAP-PKG-004 authenticated device signs a legitimate active worker through the privileged helper", async () => {
  // All fixture rows and signature events exist only inside this LOCAL transaction.
  const { randomUUID } = await import("node:crypto");
  const nonce = randomUUID().replace(/-/gu, "");
  const deviceUser = randomUUID();
  const actor = randomUUID();
  const site = randomUUID();
  const device = randomUUID();
  const policy = randomUUID();
  const attendance = randomUUID();
  const catalogApp = randomUUID();
  const deviceCode = "GAP004_POS_" + nonce.slice(0, 14).toUpperCase();
  const siteCode = "GAP004_POS_" + nonce.slice(14, 26).toUpperCase();
  const uuid = id => {
    assert.match(id, /^[0-9a-f-]{36}$/iu);
    return "'" + id + "'::uuid";
  };
  const users = [deviceUser, actor].map(uuid).join(", ");
  const snapshotSql = [
    "SELECT json_build_object(",
    " 'auth',(SELECT count(*) FROM auth.users WHERE id IN (" + users + ")),",
    " 'profiles',(SELECT count(*) FROM public.users WHERE id IN (" + users + ")),",
    " 'sites',(SELECT count(*) FROM public.sites WHERE id = " + uuid(site) + "),",
    " 'employees',(SELECT count(*) FROM public.employees WHERE id = " + uuid(actor) + "),",
    " 'attendance',(SELECT count(*) FROM public.attendance_logs WHERE id = " + uuid(attendance) + "),",
    " 'apps',(SELECT count(*) FROM public.apps WHERE id = " + uuid(catalogApp) + "),",
    " 'devices',(SELECT count(*) FROM public.shared_operational_devices WHERE id = " + uuid(device) + "),",
    " 'device_apps',(SELECT count(*) FROM public.shared_operational_device_apps WHERE device_id = " + uuid(device) + "),",
    " 'actor_policies',(SELECT count(*) FROM public.shared_operational_device_actor_policies WHERE id = " + uuid(policy) + "),",
    " 'signatures',(SELECT count(*) FROM public.shared_device_actor_signatures WHERE shared_device_id = " + uuid(device) + "),",
    " 'events',(SELECT count(*) FROM public.shared_operational_device_events WHERE device_id = " + uuid(device) + ")",
    ");",
  ].join("\n");
  const before = JSON.parse(queryLocalDatabase(snapshotSql));
  assert.ok(Object.values(before).every(count => count === 0),
    "The device, users and attendance synthetic fixture must not preexist");
  const sql = [
    "BEGIN;",
    "SET LOCAL statement_timeout = '15s';",
    "INSERT INTO auth.users (id,email) VALUES",
    "(" + uuid(deviceUser) + ", 'gap004-device-" + nonce + "@example.invalid'),",
    "(" + uuid(actor) + ", 'gap004-actor-" + nonce + "@example.invalid');",
    "INSERT INTO public.users (id,full_name,email,role,is_active,loyalty_points,is_client) VALUES",
    "(" + uuid(deviceUser) + ", 'GAP004 Device', 'gap004-device-" + nonce +
      "@example.invalid', 'client', true, 0, true),",
    "(" + uuid(actor) + ", 'GAP004 Worker', 'gap004-actor-" + nonce +
      "@example.invalid', 'client', true, 0, true)",
    "ON CONFLICT (id) DO UPDATE SET full_name=EXCLUDED.full_name,",
    "email=EXCLUDED.email,role=EXCLUDED.role,is_active=EXCLUDED.is_active,",
    "loyalty_points=EXCLUDED.loyalty_points,is_client=EXCLUDED.is_client;",
    "INSERT INTO public.sites (id,code,name,type,site_kind,is_active,operational_visibility)",
    "VALUES (" + uuid(site) + ", '" + siteCode +
      "', 'GAP004 Device E2E', 'satellite', 'satellite', true, 'operational');",
    "INSERT INTO public.employees (id,site_id,role,full_name,pin_code,is_active)",
    "VALUES (" + uuid(actor) + ", " + uuid(site) +
      ", 'cajero', 'GAP004 Active Worker', '004001', true);",
    "INSERT INTO public.apps (id,code,name) SELECT " + uuid(catalogApp) +
      ", 'nexo', 'GAP004 Transaction-Only App' WHERE NOT EXISTS",
    "(SELECT 1 FROM public.apps WHERE code = 'nexo');",
    "INSERT INTO public.shared_operational_devices",
    "(id,code,label,auth_user_id,site_id,default_app_code,requires_actor_pin,",
    " requires_active_actor_shift,allow_actor_without_pin,activation_status,is_active)",
    "VALUES (" + uuid(device) + ", '" + deviceCode + "', 'GAP004 Test Device', " +
      uuid(deviceUser) + ", " + uuid(site) + ", 'nexo', true, false, false, 'active', true);",
    "INSERT INTO public.shared_operational_device_apps(device_id,app_code,is_active)",
    "VALUES (" + uuid(device) + ", 'nexo', true);",
    "INSERT INTO public.shared_operational_device_actor_policies",
    "(id,device_id,policy_type,site_id,is_active)",
    "VALUES (" + uuid(policy) + ", " + uuid(device) +
      ", 'same_site_active_worker', " + uuid(site) + ", true);",
    "INSERT INTO public.attendance_logs(id,employee_id,site_id,action,source,device_info)",
    "VALUES (" + uuid(attendance) + ", " + uuid(actor) +
      ", " + uuid(site) + ", 'check_in', 'web', '{}'::jsonb);",
    "SET LOCAL ROLE authenticated;",
    "SET LOCAL request.jwt.claim.sub = '" + deviceUser + "';",
    "DO $gap004_sign_positive$",
    "DECLARE v_sig uuid; v_actor uuid; v_exp timestamptz;",
    "BEGIN",
    "  IF auth.uid() IS DISTINCT FROM " + uuid(deviceUser) + " THEN",
    "    RAISE EXCEPTION 'GAP004_DEVICE_SESSION_INVALID'; END IF;",
    "  IF has_function_privilege('authenticated',",
    "    'public.shared_device_actor_is_allowed_v1(uuid,uuid,uuid,uuid)', 'EXECUTE') THEN",
    "    RAISE EXCEPTION 'GAP004_INTERNAL_HELPER_UNEXPECTEDLY_PUBLIC'; END IF;",
    "  BEGIN",
    "    PERFORM public.sign_shared_device_action(" + uuid(actor) +
      ", 'wrong-pin', 'nexo', 'gap004-positive-control', NULL::text, NULL::uuid,",
    "      'pin', 60, '{}'::jsonb);",
    "    RAISE EXCEPTION 'GAP004_WRONG_PIN_UNEXPECTEDLY_ACCEPTED';",
    "  EXCEPTION WHEN SQLSTATE '28000' THEN",
    "    IF SQLERRM <> 'INVALID_ACTOR_PIN' THEN RAISE; END IF;",
    "  END;",
    "  SELECT signature_id, actor_employee_id, expires_at INTO v_sig, v_actor, v_exp",
    "  FROM public.sign_shared_device_action(" + uuid(actor) +
      ", '004001', 'nexo', 'gap004-positive-control', NULL::text, NULL::uuid,",
    "      'pin', 60, '{}'::jsonb);",
    "  IF v_sig IS NULL OR v_actor IS DISTINCT FROM " + uuid(actor) +
      " OR v_exp <= now() THEN",
    "    RAISE EXCEPTION 'GAP004_LEGITIMATE_SIGNATURE_NOT_RETURNED';",
    "  END IF;",
    "END;",
    "$gap004_sign_positive$;",
    "RESET ROLE;",
    "SELECT json_build_object(",
    " 'signatures',(SELECT count(*) FROM public.shared_device_actor_signatures",
    "   WHERE shared_device_id = " + uuid(device) + " AND actor_employee_id = " + uuid(actor) + "),",
    " 'events',(SELECT count(*) FROM public.shared_operational_device_events",
    "   WHERE device_id = " + uuid(device) + " AND event_type = 'actor_signature_created'),",
    " 'pin_rejected',true",
    ");",
    "ROLLBACK;",
  ].join("\n");
  const result = JSON.parse(queryLocalDatabase(sql));
  assert.deepEqual(result, { signatures: 1, events: 1, pin_rejected: true },
    "Legitimate wrapper must record exactly one signature and one event");
  assert.deepEqual(JSON.parse(queryLocalDatabase(snapshotSql)), before,
    "PostgreSQL ROLLBACK must preserve all local data and Auth identities");
});


test("GAP-PKG-004 trusted pricing and authorized UOM stock consumption remain functional", async () => {
  const { randomUUID } = await import("node:crypto");
  const id = Object.fromEntries([
    "actor","seller","buyer","area","category","product","profile","location",
    "sellerCenter","buyerCenter","siteList","centerList",
    "siteItem","centerItem","stock","app","permission"
  ].map(key => [key, randomUUID()]));
  const nonce = randomUUID().replace(/-/gu, "");
  const kind = "gap004qa_" + nonce.slice(0, 14);
  const u = key => {
    assert.match(id[key], /^[0-9a-f-]{36}$/iu);
    return "'" + id[key] + "'::uuid";
  };
  const tables = {
    actors: ["auth.users", "id", "actor"],
    profiles: ["public.users", "id", "actor"],
    employees: ["public.employees", "id", "actor"],
    seller: ["public.sites", "id", "seller"],
    buyer: ["public.sites", "id", "buyer"],
    area: ["public.areas", "id", "area"],
    category: ["public.product_categories", "id", "category"],
    product: ["public.products", "id", "product"],
    profile: ["public.product_uom_profiles", "id", "profile"],
    location: ["public.inventory_locations", "id", "location"],
    sellerCenter: ["public.cost_centers", "id", "sellerCenter"],
    buyerCenter: ["public.cost_centers", "id", "buyerCenter"],
    siteList: ["public.internal_price_lists", "id", "siteList"],
    centerList: ["public.internal_price_lists", "id", "centerList"],
    siteItem: ["public.internal_price_list_items", "id", "siteItem"],
    centerItem: ["public.internal_price_list_items", "id", "centerItem"],
    stock: ["public.inventory_stock_by_uom_profile", "id", "stock"],
    app: ["public.apps", "id", "app"],
    permission: ["public.app_permissions", "id", "permission"],
  };
  const snapshot = [
    "SELECT json_build_object(",
    ...Object.entries(tables).map(([label, [table, column, key]], index, all) =>
      " '" + label + "', (SELECT count(*) FROM " + table +
      " WHERE " + column + " = " + u(key) + ")" +
      (index === all.length - 1 ? "" : ",")),
    ", 'kind', (SELECT count(*) FROM public.area_kinds WHERE code = '" + kind + "'),",
    " 'grants', (SELECT count(*) FROM public.employee_permissions WHERE employee_id = " + u("actor") + ")",
    ");",
  ].join("\n");
  const initial = JSON.parse(queryLocalDatabase(snapshot));
  assert.ok(Object.values(initial).every(value => value === 0),
    "Never touch preexisting identities in LOCAL");
  const sql = [
    "BEGIN;",
    "SET LOCAL statement_timeout = '20s';",
    "INSERT INTO auth.users(id,email) VALUES (" + u("actor") +
      ", 'gap004-price-" + nonce + "@example.invalid');",
    "INSERT INTO public.sites (id,code,name,type,site_kind,is_active) VALUES",
    "(" + u("seller") + ", 'GAP004_PRC_A_" + nonce.slice(0, 10) +
      "', 'GAP004 Stock Site', 'satellite', 'satellite', true),",
    "(" + u("buyer") + ", 'GAP004_PRC_B_" + nonce.slice(0, 10) +
      "', 'GAP004 Buyer Site', 'satellite', 'satellite', true);",
    "INSERT INTO public.area_kinds(code,name) VALUES ('" + kind + "', 'GAP004 Fixture Kind');",
    "INSERT INTO public.areas(id,site_id,code,name,kind) VALUES (" + u("area") +
      ", " + u("seller") + ", 'GAP004_' || substr('" + nonce +
      "',1,10), 'GAP004 Stock Area', '" + kind + "');",
    "INSERT INTO public.product_categories(id,name) VALUES (" + u("category") +
      ", 'GAP004 Product Category');",
    "INSERT INTO public.products(id,name,category_id,unit,product_type,production_area_kind,sku)",
    "VALUES (" + u("product") + ", 'GAP004 Synthetic Product', " +
      u("category") + ", 'box', 'insumo', '" + kind + "', 'GAP004-QA-" + nonce.slice(0, 14).toUpperCase() + "');",
    "INSERT INTO public.product_uom_profiles",
    "(id,product_id,label,input_unit_code,qty_in_input_unit,qty_in_stock_unit,is_active)",
    "VALUES (" + u("profile") + ", " + u("product") +
      ", 'GAP004 Box', 'box', 4, 10, true);",
    "INSERT INTO public.inventory_locations(id,site_id,code,zone,area_id)",
    "VALUES (" + u("location") + ", " + u("seller") +
      ", 'GAP004_LOC_" + nonce.slice(0, 12) + "', 'QA', " + u("area") + ");",
    "INSERT INTO public.inventory_stock_by_uom_profile",
    "(id,site_id,location_id,product_id,uom_profile_id,presentation_qty,base_qty)",
    "VALUES (" + u("stock") + ", " + u("seller") + ", " + u("location") +
      ", " + u("product") + ", " + u("profile") + ", 4, 10);",
    "INSERT INTO public.cost_centers(id,site_id,name,type) VALUES",
    "(" + u("sellerCenter") + ", " + u("seller") +
      ", 'GAP004 Seller Production', 'production_center'),",
    "(" + u("buyerCenter") + ", " + u("buyer") +
      ", 'GAP004 Buyer', 'satellite');",
    "INSERT INTO public.internal_price_lists",
    "(id,name,seller_cost_center_id,buyer_site_id,valid_from,is_active)",
    "VALUES (" + u("siteList") + ", 'GAP004 Site Price', " +
      u("sellerCenter") + ", " + u("buyer") + ", now() - interval '1 day', true);",
    "INSERT INTO public.internal_price_lists",
    "(id,name,seller_cost_center_id,buyer_cost_center_id,valid_from,is_active)",
    "VALUES (" + u("centerList") + ", 'GAP004 Priority Center', " +
      u("sellerCenter") + ", " + u("buyerCenter") +
      ", now() - interval '1 day', true);",
    "INSERT INTO public.internal_price_list_items",
    "(id,price_list_id,product_id,unit_price,unit_code,uom_profile_id,",
    "pricing_qty_in_input_unit,pricing_qty_in_stock_unit,is_active) VALUES",
    "(" + u("siteItem") + ", " + u("siteList") + ", " + u("product") +
      ", 175, 'box', " + u("profile") + ", 4, 10, true),",
    "(" + u("centerItem") + ", " + u("centerList") + ", " + u("product") +
      ", 320, 'box', " + u("profile") + ", 4, 10, true);",
    "INSERT INTO public.employees(id,site_id,role,full_name,is_active) VALUES",
    "(" + u("actor") + ", " + u("seller") + ", 'cajero', 'GAP004 Stock Worker', true);",
    "INSERT INTO public.apps(id,code,name) SELECT " + u("app") +
      ", 'nexo', 'GAP004 Transaction-Only App' WHERE NOT EXISTS",
    "(SELECT 1 FROM public.apps WHERE code='nexo');",
    "INSERT INTO public.app_permissions(id,app_id,code,name)",
    "SELECT " + u("permission") + ", a.id, 'inventory.stock', 'GAP004 Stock Grant'",
    "FROM public.apps a WHERE a.code='nexo' AND NOT EXISTS",
    "(SELECT 1 FROM public.app_permissions p WHERE p.app_id=a.id AND p.code='inventory.stock');",
    "INSERT INTO public.employee_permissions",
    "(employee_id,permission_id,is_allowed,scope_type,scope_site_id)",
    "SELECT " + u("actor") + ", p.id, true, 'site', " + u("seller"),
    "FROM public.app_permissions p JOIN public.apps a ON a.id=p.app_id",
    "WHERE a.code='nexo' AND p.code='inventory.stock';",
    "SET LOCAL ROLE service_role;",
    "DO $gap004_positive_business$",
    "DECLARE v_cc uuid; v_rate record; v_simple record; v_input record;",
    "BEGIN",
    " IF NOT has_function_privilege('service_role',",
    "   'public.assert_inventory_uom_profile_stock_input(uuid,uuid,uuid,uuid,numeric,numeric)', 'EXECUTE') THEN",
    "   RAISE EXCEPTION 'GAP004_TRUSTED_INVENTORY_RPC_REVOKED'; END IF;",
    " SELECT public.get_site_cost_center(" + u("seller") + ") INTO v_cc;",
    " IF v_cc IS DISTINCT FROM " + u("sellerCenter") +
      " THEN RAISE EXCEPTION 'GAP004_COST_CENTER_PRIORITY_BROKEN'; END IF;",
    " SELECT * INTO v_rate FROM public.resolve_internal_transfer_price_for_profile(" +
      u("product") + ", " + u("sellerCenter") + ", " + u("buyerCenter") +
      ", " + u("buyer") + ", " + u("profile") + ", 'box', now());",
    " IF v_rate.price_list_id IS DISTINCT FROM " + u("centerList") +
      " OR v_rate.price_list_item_id IS DISTINCT FROM " + u("centerItem") +
      " OR v_rate.unit_price <> 320 OR v_rate.priority <> 1",
    " OR v_rate.pricing_factor_to_stock <> 2.5 THEN",
    "   RAISE EXCEPTION 'GAP004_PRICING_PROFILE_WRONG_RESULT'; END IF;",
    " SELECT * INTO v_simple FROM public.resolve_internal_transfer_price(" +
      u("product") + ", " + u("sellerCenter") + ", " + u("buyerCenter") +
      ", " + u("buyer") + ", 'box', now());",
    " IF v_simple.unit_price <> 320 OR v_simple.priority <> 1 THEN",
    "   RAISE EXCEPTION 'GAP004_PRICE_CONSUMER_WRONG_RESULT'; END IF;",
    " SELECT * INTO v_input FROM public.assert_inventory_uom_profile_stock_input(" +
      u("location") + ", NULL::uuid, " + u("product") +
      ", " + u("profile") + ", 1, 2.5);",
    " IF v_input.site_id IS DISTINCT FROM " + u("seller") +
      " OR v_input.factor_to_stock <> 2.5 THEN",
    "   RAISE EXCEPTION 'GAP004_UOM_CONVERSION_WRONG_RESULT'; END IF;",
    "END;",
    "$gap004_positive_business$;",
    "RESET ROLE;",
    "SET LOCAL ROLE authenticated;",
    "SET LOCAL request.jwt.claim.sub = '" + id.actor + "';",
    "DO $gap004_authorized_stock$",
    "BEGIN",
    " IF auth.uid() IS DISTINCT FROM " + u("actor") +
      " OR NOT public.has_permission('nexo.inventory.stock', " + u("seller") + ") THEN",
    "   RAISE EXCEPTION 'GAP004_EXPLICIT_SITE_STOCK_GRANT_MISSING'; END IF;",
    " BEGIN",
    "   PERFORM public.consume_inventory_stock_by_uom_profile(" +
      u("location") + ", " + u("product") + ", " + u("profile") +
      ", 1, 2.4, NULL::uuid);",
    "   RAISE EXCEPTION 'GAP004_INVALID_CONVERSION_ACCEPTED';",
    " EXCEPTION WHEN OTHERS THEN",
    "   IF SQLERRM <> 'base quantity does not match presentation conversion' THEN RAISE; END IF;",
    " END;",
    " PERFORM public.consume_inventory_stock_by_uom_profile(" +
      u("location") + ", " + u("product") + ", " + u("profile") +
      ", 1, 2.5, NULL::uuid);",
    "END;",
    "$gap004_authorized_stock$;",
    "RESET ROLE;",
    "SELECT json_build_object(",
    " 'presentation',(SELECT presentation_qty FROM public.inventory_stock_by_uom_profile WHERE id=" + u("stock") + "),",
    " 'base',(SELECT base_qty FROM public.inventory_stock_by_uom_profile WHERE id=" + u("stock") + "),",
    " 'stock_rows',(SELECT count(*) FROM public.inventory_stock_by_uom_profile WHERE id=" + u("stock") + ")",
    ");",
    "ROLLBACK;",
  ].join("\n");
  let result;
  try {
    result = JSON.parse(queryLocalDatabase(sql));
  } finally {
    assert.deepEqual(JSON.parse(queryLocalDatabase(snapshot)), initial,
      "Atomic transaction must roll back all stock, pricing and permission fixtures");
  }
  assert.equal(Number(result.presentation), 3,
    "Authorized stock consumer must subtract one presentation");
  assert.equal(Number(result.base), 7.5,
    "The same consumer must subtract the exact converted base quantity");
  assert.equal(result.stock_rows, 1);
});

test("GAP-PKG-004 private documents reject anon access and serve a signed local URL", async () => {
  assert.match(config, /^project_id\s*=\s*"vento-shell"/m);
  const { createClient } = await import("@supabase/supabase-js");
  const { randomUUID } = await import("node:crypto");
  const key = "gap-pkg-004-smoke/" + randomUUID().replace(/-/gu, "") + ".txt";
  assert.match(key, /^gap-pkg-004-smoke\/[0-9a-f]{32}\.txt$/u);
  const origin = "http://127.0.0.1:54321";
  const service = createClient(origin, readLocalEdgeSecret("SUPABASE_SERVICE_ROLE_KEY"), {
    auth: { persistSession: false, autoRefreshToken: false },
  });
  const anonymous = createClient(origin, readLocalEdgeSecret("SUPABASE_ANON_KEY"), {
    auth: { persistSession: false, autoRefreshToken: false },
  });
  const snapshotSql = [
    "SELECT json_build_object(",
    " 'private', (SELECT NOT public FROM storage.buckets WHERE id = 'documents'),",
    " 'object_count', (SELECT count(*) FROM storage.objects",
    "   WHERE bucket_id = 'documents' AND name = '" + key + "')",
    ");",
  ].join("\n");
  const before = JSON.parse(queryLocalDatabase(snapshotSql));
  assert.deepEqual(before, { private: true, object_count: 0 },
    "Only a private local documents bucket with an unused synthetic key is eligible");

  const content = "GAP-PKG-004 synthetic document " + key;
  try {
    const upload = await service.storage.from("documents").upload(
      key, new Blob([content], { type: "text/plain" }),
      { contentType: "text/plain", upsert: false },
    );
    assert.equal(upload.error, null, "Local service-role upload: " + upload.error?.message);
    assert.equal(JSON.parse(queryLocalDatabase(snapshotSql)).object_count, 1);

    const anonDownload = await anonymous.storage.from("documents").download(key);
    assert.ok(anonDownload.error, "Anonymous direct download must be refused by Storage RLS");
    const anonSign = await anonymous.storage.from("documents").createSignedUrl(key, 60);
    assert.ok(anonSign.error, "Anonymous actor must not issue a signed documents URL");

    const { data: publicAddress } = service.storage.from("documents").getPublicUrl(key);
    const directUrl = new URL(publicAddress.publicUrl);
    assert.equal(directUrl.hostname, "127.0.0.1");
    assert.equal(directUrl.port, "54321");
    const directResponse = await fetch(directUrl, {
      method: "GET", redirect: "manual", signal: AbortSignal.timeout(8000),
    });
    assert.notEqual(directResponse.status, 200,
      "Private employee document must not be exposed through the public URL");

    const signed = await service.storage.from("documents").createSignedUrl(key, 60);
    assert.equal(signed.error, null, "Trusted signed URL creation: " + signed.error?.message);
    const signedUrl = new URL(signed.data?.signedUrl ?? "");
    assert.equal(signedUrl.hostname, "127.0.0.1");
    assert.equal(signedUrl.port, "54321");
    assert.ok(signedUrl.pathname.includes("/object/sign/documents/"));
    const signedResponse = await fetch(signedUrl, {
      method: "GET", redirect: "manual", signal: AbortSignal.timeout(8000),
    });
    assert.equal(signedResponse.status, 200,
      "Valid short-lived signed URL must allow reading a private local document");
    assert.equal(await signedResponse.text(), content);

    signedUrl.searchParams.set("token", "gap004-invalid-synthetic-token");
    const invalidResponse = await fetch(signedUrl, {
      method: "GET", redirect: "manual", signal: AbortSignal.timeout(8000),
    });
    assert.notEqual(invalidResponse.status, 200,
      "A forged signed URL must not allow access");

    // Exercise the actual local Storage HTTP expiry guard, not just token syntax.
    // The loopback origin has no CDN; a hosted CDN cache needs separate review.
    const shortLived = await service.storage.from("documents").createSignedUrl(key, 1);
    assert.equal(shortLived.error, null,
      "One-second synthetic signed URL creation: " + shortLived.error?.message);
    const expiredUrl = new URL(shortLived.data?.signedUrl ?? "");
    assert.equal(expiredUrl.origin, new URL(origin).origin,
      "The expiry test must never leave the verified LOCAL Storage origin");
    await new Promise((resolve) => setTimeout(resolve, 2400));
    const expiredResponse = await fetch(expiredUrl, {
      method: "GET", redirect: "manual", headers: { "Cache-Control": "no-store" },
      signal: AbortSignal.timeout(8000),
    });
    assert.notEqual(expiredResponse.status, 200,
      "An expired signed URL must not expose private documents at the local origin");
  } finally {
    // Remove only this unpredictable synthetic object, never any existing document.
    const cleanup = await service.storage.from("documents").remove([key]);
    assert.equal(cleanup.error, null, "Exact synthetic object cleanup: " + cleanup.error?.message);
    assert.deepEqual(JSON.parse(queryLocalDatabase(snapshotSql)), before,
      "The private bucket and synthetic-object count must be unchanged after cleanup");
  }
});


test("GAP-PKG-004 real authenticated worker can sign own private document but not a peer document", async () => {
  assert.match(config, /^project_id\s*=\s*"vento-shell"/m);
  const { createClient } = await import("@supabase/supabase-js");
  const { randomUUID } = await import("node:crypto");
  const origin = "http://127.0.0.1:54321";
  const service = createClient(origin, readLocalEdgeSecret("SUPABASE_SERVICE_ROLE_KEY"), {
    auth: { persistSession: false, autoRefreshToken: false },
  });
  const employee = createClient(origin, readLocalEdgeSecret("SUPABASE_ANON_KEY"), {
    auth: { persistSession: false, autoRefreshToken: false },
  });
  const nonce = randomUUID().replace(/-/gu, "");
  const siteId = randomUUID();
  const siteCode = "GAP004_DOC_" + nonce.slice(0, 12).toUpperCase();
  const emails = [0, 1].map(i => "gap004-document-" + nonce + "-" + i + "@example.invalid");
  const passwords = [0, 1].map(() => "Local-Gap004-" + randomUUID());
  const documentIds = [randomUUID(), randomUUID()];
  const syntheticAppId = randomUUID();
  const syntheticPermissionId = randomUUID();
  const objectKeys = [0, 1].map(i => "gap-pkg-004-worker/" + nonce + "/" + i + ".txt");
  const contents = objectKeys.map(key => "Private GAP004 employee " + key);
  const userIds = [];
  const uploaded = [];
  const cleanupErrors = [];
  let siteAttempted = false;
  const uuid = value => {
    assert.match(value, /^[0-9a-f-]{36}$/iu);
    return "'" + value + "'::uuid";
  };
  const list = ids => ids.length ? ids.map(uuid).join(", ") : "NULL::uuid";
  function snapshot() {
    const workers = list(userIds);
    return JSON.parse(queryLocalDatabase([
      "SELECT json_build_object(",
      " 'auth', (SELECT count(*) FROM auth.users WHERE email IN ('" + emails.join("','") + "')),",
      " 'profiles', (SELECT count(*) FROM public.users WHERE id IN (" + workers + ")),",
      " 'employees', (SELECT count(*) FROM public.employees WHERE id IN (" + workers + ")),",
      " 'employee_sites', (SELECT count(*) FROM public.employee_sites WHERE employee_id IN (" + workers + ")),",
      " 'employee_grants', (SELECT count(*) FROM public.employee_permissions WHERE employee_id IN (" + workers + ")),",
      " 'catalog_app', (SELECT count(*) FROM public.apps WHERE id = " + uuid(syntheticAppId) + "),",
      " 'catalog_permission', (SELECT count(*) FROM public.app_permissions WHERE id = " + uuid(syntheticPermissionId) + "),",
      " 'employee_settings', (SELECT count(*) FROM public.employee_settings WHERE employee_id IN (" + workers + ")),",
      " 'site', (SELECT count(*) FROM public.sites WHERE id = " + uuid(siteId) + "),",
      " 'documents', (SELECT count(*) FROM public.documents WHERE id IN (" + list(documentIds) + ")),",
      " 'objects', (SELECT count(*) FROM storage.objects WHERE bucket_id = 'documents'",
      " AND name IN ('" + objectKeys.join("','") + "'))",
      ");",
    ].join("\n")));
  }
  const empty = {
    auth: 0, profiles: 0, employees: 0, employee_sites: 0, employee_grants: 0,
    catalog_app: 0, catalog_permission: 0, employee_settings: 0,
    site: 0, documents: 0, objects: 0,
  };
  assert.deepEqual(snapshot(), empty, "Only unused local synthetic fixture identities are eligible");
  try {
    siteAttempted = true;
    queryLocalDatabase([
      "INSERT INTO public.sites (id,code,name,type,site_kind,site_type,is_active,operational_visibility)",
      "VALUES (" + uuid(siteId) + ", '" + siteCode + "',",
      " 'GAP004 Private Worker Storage', 'satellite', 'operational', 'satellite', true, 'operational');",
    ].join("\n"));
    for (let i = 0; i < 2; i++) {
      const created = await service.auth.admin.createUser({
        email: emails[i], password: passwords[i], email_confirm: true,
        user_metadata: { full_name: "GAP004 Synthetic Employee " + i },
      });
      assert.equal(created.error, null, "Local GoTrue must create the worker fixture");
      assert.ok(created.data?.user?.id, "Synthetic worker must have a real Auth UUID");
      userIds.push(created.data.user.id);
    }
    queryLocalDatabase([
      "INSERT INTO public.employees (id,site_id,role,full_name,is_active) VALUES",
      userIds.map((id,i) => "(" + uuid(id) + ", " + uuid(siteId) +
        ", 'cajero', 'GAP004 Synthetic Employee " + i + "', true)")
        .join(", ") + ";",
      "INSERT INTO public.documents",
      " (id,scope,owner_employee_id,target_employee_id,site_id,title,storage_path,file_name)",
      " VALUES " + documentIds.map((doc,i) => "(" + uuid(doc) +
        ", 'employee', " + uuid(userIds[i]) + ", " + uuid(userIds[i]) +
        ", " + uuid(siteId) + ", 'GAP004 Private Document', '" +
        objectKeys[i] + "', 'private.txt')").join(", ") + ";",
    ].join("\n"));
    for (let i = 0; i < objectKeys.length; i++) {
      uploaded.push(objectKeys[i]);
      const result = await service.storage.from("documents").upload(
        objectKeys[i], new Blob([contents[i]], { type: "text/plain" }),
        { contentType: "text/plain", upsert: false },
      );
      assert.equal(result.error, null, "Trusted upload must create the synthetic local Storage object");
    }
    const session = await employee.auth.signInWithPassword({
      email: emails[0], password: passwords[0],
    });
    assert.equal(session.error, null, "A real LOCAL GoTrue worker must authenticate");
    assert.ok(session.data?.session?.access_token, "The worker must hold a JWT");
    const ownMetadata = await employee.from("documents").select("id")
      .eq("id", documentIds[0]);
    assert.equal(ownMetadata.error, null);
    assert.deepEqual(ownMetadata.data?.map(row => row.id), [documentIds[0]]);
    const peerMetadata = await employee.from("documents").select("id")
      .eq("id", documentIds[1]);
    assert.equal(peerMetadata.error, null);
    assert.deepEqual(peerMetadata.data, [], "A same-site peer's metadata must remain private");

    const allowed = await employee.storage.from("documents").createSignedUrl(objectKeys[0], 60);
    assert.equal(allowed.error, null, "Worker must sign the document they own");
    const signedUrl = new URL(allowed.data?.signedUrl ?? "");
    assert.equal(signedUrl.origin, origin, "Signed URLs must use the local Storage origin");
    const downloaded = await fetch(signedUrl, {
      redirect: "manual", signal: AbortSignal.timeout(8000),
    });
    assert.equal(downloaded.status, 200, "Real authenticated signed URL must download");
    assert.equal(await downloaded.text(), contents[0]);

    const denied = await employee.storage.from("documents").createSignedUrl(objectKeys[1], 60);
    assert.ok(denied.error, "A same-site peer must not sign someone else's document");
    const deniedDownload = await employee.storage.from("documents").download(objectKeys[1]);
    assert.ok(deniedDownload.error, "The peer's private document must not be downloaded");

    // Grant ONLY the real worker a site-scoped VISO document permission.
    // The permission itself must already be present in the LOCAL catalog.
    queryLocalDatabase([
      "INSERT INTO public.employee_sites(employee_id,site_id,is_primary,is_active)",
      "VALUES (" + uuid(userIds[1]) + ", " + uuid(siteId) + ", true, true)",
      "ON CONFLICT(employee_id,site_id) DO UPDATE SET is_active=true;",
      "INSERT INTO public.apps(id,code,name) SELECT " + uuid(syntheticAppId) + ",",
      " 'viso','GAP004 synthetic VISO' WHERE NOT EXISTS",
      "(SELECT 1 FROM public.apps WHERE code='viso');",
      "INSERT INTO public.app_permissions(id,app_id,code,name)",
      "SELECT " + uuid(syntheticPermissionId) + ",a.id,'staff.documents.manage',",
      " 'GAP004 synthetic site document permission' FROM public.apps a",
      "WHERE a.code='viso' AND NOT EXISTS (SELECT 1 FROM public.app_permissions p",
      " WHERE p.app_id=a.id AND p.code='staff.documents.manage');",
      "INSERT INTO public.employee_permissions",
      "(employee_id,permission_id,is_allowed,scope_type,scope_site_id)",
      "SELECT " + uuid(userIds[0]) + ", p.id, true, 'site', " + uuid(siteId),
      "FROM public.app_permissions p JOIN public.apps a ON a.id=p.app_id",
      "WHERE a.code='viso' AND p.code='staff.documents.manage' AND p.is_active;",
    ].join("\n"));
    const allowedScope = JSON.parse(queryLocalDatabase([
      "BEGIN;",
      "SET LOCAL ROLE authenticated;",
      "SET LOCAL request.jwt.claim.sub = '" + userIds[0] + "';",
      "SELECT json_build_object(",
      " 'site',public.has_permission('viso.staff.documents.manage'," + uuid(siteId) + "),",
      " 'grant',(SELECT count(*) FROM public.employee_permissions ep",
      " JOIN public.app_permissions p ON p.id=ep.permission_id",
      " JOIN public.apps a ON a.id=p.app_id WHERE ep.employee_id=" + uuid(userIds[0]),
      " AND ep.is_allowed AND ep.scope_type='site' AND ep.scope_site_id=" + uuid(siteId),
      " AND a.code='viso' AND p.code='staff.documents.manage')",
      ");",
      "ROLLBACK;",
    ].join("\n")));
    assert.deepEqual(allowedScope, { site: true, grant: 1 },
      "An explicit VISO site grant must authorize the worker in its own site");
    const authorizedPeer = await employee.from("documents").select("id")
      .eq("id", documentIds[1]);
    assert.equal(authorizedPeer.error, null);
    assert.deepEqual(authorizedPeer.data?.map(row => row.id), [documentIds[1]]);
    const peerLink = await employee.storage.from("documents").createSignedUrl(objectKeys[1], 60);
    assert.equal(peerLink.error, null, "Site-authorized worker must sign same-site peer document");
    const peerUrl = new URL(peerLink.data?.signedUrl ?? "");
    assert.equal(peerUrl.origin, origin);
    const peerResponse = await fetch(peerUrl, {
      redirect: "manual", signal: AbortSignal.timeout(8000),
    });
    assert.equal(peerResponse.status, 200);
    assert.equal(await peerResponse.text(), contents[1]);
  } finally {
    if (uploaded.length) {
      try {
        const removed = await service.storage.from("documents").remove(uploaded);
        if (removed.error) cleanupErrors.push("synthetic_storage_cleanup");
      } catch {
        cleanupErrors.push("synthetic_storage_cleanup");
      }
    }
    if (siteAttempted) {
      try {
        const workers = list(userIds);
        queryLocalDatabase([
          "BEGIN;",
          "SET LOCAL statement_timeout = '15s';",
          "SET LOCAL session_replication_role = replica;",
          "DELETE FROM public.documents WHERE id IN (" + list(documentIds) + ");",
          "DELETE FROM public.employee_permissions WHERE employee_id IN (" + workers + ");",
          "DELETE FROM public.app_permissions WHERE id = " + uuid(syntheticPermissionId) + ";",
          "DELETE FROM public.apps WHERE id = " + uuid(syntheticAppId) + ";",
          "DELETE FROM public.employee_sites WHERE employee_id IN (" + workers + ");",
          "DELETE FROM public.employee_settings WHERE employee_id IN (" + workers + ");",
          "DELETE FROM public.employees WHERE id IN (" + workers + ") AND site_id = " + uuid(siteId) + ";",
          "DELETE FROM public.users WHERE id IN (" + workers + ");",
          "DELETE FROM public.sites WHERE id = " + uuid(siteId) +
            " AND code = '" + siteCode + "';",
          "COMMIT;",
        ].join("\n"));
      } catch {
        cleanupErrors.push("synthetic_postgres_cleanup");
      }
    }
    for (const id of userIds) {
      try {
        const removed = await service.auth.admin.deleteUser(id);
        if (removed.error) cleanupErrors.push("synthetic_auth_cleanup");
      } catch {
        cleanupErrors.push("synthetic_auth_cleanup");
      }
    }
    try {
      assert.deepEqual(snapshot(), empty);
    } catch {
      cleanupErrors.push("synthetic_residuals");
    }
    assert.deepEqual(cleanupErrors, [], "Real Auth, metadata and Storage fixtures must leave zero residue");
  }
});

test("GAP-PKG-004 local document-alerts rejects untrusted cron HTTP calls", async () => {
  assert.match(config, /^project_id\s*=\s*"vento-shell"/m);
  assert.match(config, /^\[functions\.document-alerts\]\s*\nverify_jwt\s*=\s*false/m);
  const endpoint = new URL("/functions/v1/document-alerts", "http://127.0.0.1:54321");
  assert.equal(endpoint.hostname, "127.0.0.1");
  assert.equal(endpoint.port, "54321");

  const methodResponse = await fetch(endpoint, {
    method: "GET", redirect: "manual", signal: AbortSignal.timeout(12000),
  });
  assert.equal(methodResponse.status, 405,
    "Local Edge handler must reject document-alerts GET before accessing data");
  assert.equal((await methodResponse.json()).error, "Method not allowed");

  // Only inspect whether the secret exists; never print it or invoke the
  // authorized cron branch (which could send actual Expo notifications).
  const envProbe = spawnSync("docker", [
    "exec", "supabase_edge_runtime_vento-shell", "printenv", "DOCUMENT_ALERTS_CRON_SECRET",
  ], { cwd: root, encoding: "utf8", timeout: 12000, windowsHide: true });
  assert.ifError(envProbe.error);
  assert.ok(envProbe.status === 0 || envProbe.status === 1,
    "Local Docker Edge cron configuration probe must complete");
  const configured = envProbe.status === 0 && Boolean((envProbe.stdout || "").trim());

  for (const headers of [
    { "Content-Type": "application/json" },
    { "Content-Type": "application/json", "x-cron-key": "gap004-invalid-synthetic-key" },
  ]) {
    const response = await fetch(endpoint, {
      method: "POST", headers, body: "{}",
      redirect: "manual", signal: AbortSignal.timeout(12000),
    });
    const expectedStatus = configured ? 401 : 503;
    assert.equal(response.status, expectedStatus,
      "Cron must fail closed for missing or invalid credentials");
    const body = await response.json();
    assert.equal(body.error, configured ? "Unauthorized" : "Cron secret not configured");
  }
});

// Exercise the actual Deno cron handler under synthetic in-memory adapters.
// No SQL, remote URL, notifications or real credentials are used by these tests.
function makeDocumentAlertsHarness(options = {}) {
  const relative = "supabase/functions/document-alerts/index.ts";
  const source = fs.readFileSync(path.join(root, relative), "utf8");
  const calls = { database: [], outbound: [], tokenUpdates: [], clients: 0 };
  const owner = "synthetic-employee-only";
  const futureDate = new Date(Date.now() + 7 * 86400000).toISOString().slice(0, 10);
  const documents = options.withDocument ? [{
    id: "synthetic-document-only", title: "Synthetic", scope: "employee",
    expiry_date: futureDate, status: "active", owner_employee_id: owner,
    target_employee_id: null, document_type: { name: "Synthetic", reminder_days: 7 },
  }] : [];
  const tokens = [{ token: "ExponentPushToken[synthetic-only]", employee_id: owner }];
  const fakeSupabase = {
    from(table) {
      assert.ok(["documents", "employee_push_tokens"].includes(table), "Only synthetic cron tables");
      const query = {
        select() { return query; },
        not() { return query; },
        neq() { return query; },
        gte() { return query; },
        lte() { return query; },
        eq() { return query; },
        in() { return query; },
        update(payload) { calls.tokenUpdates.push({ table, payload }); return query; },
        then(resolve, reject) {
          calls.database.push(table);
          return Promise.resolve({ data: table === "documents" ? documents : tokens, error: null })
            .then(resolve, reject);
        },
      };
      return query;
    },
  };
  let handler;
  const sandbox = {
    serve(callback) { handler = callback; },
    createClient() { calls.clients++; return fakeSupabase; },
    Deno: { env: { get(name) {
      if (name === "DOCUMENT_ALERTS_CRON_SECRET") {
        return options.secretConfigured === false ? null : "qa-synthetic-cron-key";
      }
      if (name === "SUPABASE_URL") return "http://127.0.0.1:54321";
      if (name === "SUPABASE_SERVICE_ROLE_KEY") return "test-only-no-real-credential";
      return null;
    } } },
    async fetch(url, init) {
      assert.equal(url, "https://exp.host/--/api/v2/push/send");
      assert.equal(init.method, "POST");
      const messages = JSON.parse(init.body);
      assert.equal(messages.length, 1);
      assert.equal(messages[0].to, tokens[0].token);
      calls.outbound.push({ count: messages.length });
      if (options.pushStatus === 503) {
        return new Response(JSON.stringify({ error: "synthetic-provider-failure" }), { status: 503 });
      }
      if (options.malformedPushResponse) {
        return new Response(JSON.stringify({ data: [] }), { status: 200 });
      }
      if (options.deviceNotRegistered) {
        return new Response(JSON.stringify({
          data: [{ status: "error", details: { error: "DeviceNotRegistered" } }],
        }), { status: 200 });
      }
      return new Response(JSON.stringify({ data: [{ status: "ok" }] }), { status: 200 });
    },
    AbortSignal, Request, Response, Headers, URL, Date,
    console: { error() {} },
  };
  const runnable = stripTypeScriptTypes(source, { mode: "strip" }).replace(/^import .*$/gmu, "");
  assert.doesNotMatch(runnable, /^import /mu);
  runInNewContext(runnable, sandbox, { filename: relative, timeout: 1000 });
  assert.equal(typeof handler, "function");
  return {
    calls,
    async invoke(key = "qa-synthetic-cron-key") {
      const headers = key === null ? {} : { "x-cron-key": key };
      const response = await handler(new Request(
        "http://127.0.0.1:54321/functions/v1/document-alerts",
        { method: "POST", headers },
      ));
      return { status: response.status, body: await response.json() };
    },
  };
}

test("GAP-PKG-004 cron validates its configured secret before any database access", async () => {
  const missing = makeDocumentAlertsHarness({ secretConfigured: false });
  assert.deepEqual(await missing.invoke(), {
    status: 503, body: { error: "Cron secret not configured" },
  });
  assert.equal(missing.calls.clients, 0);
  assert.equal(missing.calls.outbound.length, 0);

  const invalid = makeDocumentAlertsHarness();
  assert.deepEqual(await invalid.invoke("invalid-synthetic-key"), {
    status: 401, body: { error: "Unauthorized" },
  });
  assert.equal(invalid.calls.clients, 0);

  const validNoop = makeDocumentAlertsHarness();
  assert.deepEqual(await validNoop.invoke(), { status: 200, body: { sent: 0 } });
  assert.deepEqual(validNoop.calls.database, ["documents"]);
  assert.equal(validNoop.calls.outbound.length, 0);
});

test("GAP-PKG-004 cron fails closed on undelivered or malformed Expo responses", async () => {
  const success = makeDocumentAlertsHarness({ withDocument: true });
  assert.deepEqual(await success.invoke(), { status: 200, body: { sent: 1 } });
  assert.equal(success.calls.outbound.length, 1);
  assert.equal(success.calls.tokenUpdates.length, 0);

  const unregistered = makeDocumentAlertsHarness({
    withDocument: true, deviceNotRegistered: true,
  });
  assert.deepEqual(await unregistered.invoke(), { status: 200, body: { sent: 0 } },
    "Expo DeviceNotRegistered must not count as a delivered notification");
  assert.equal(unregistered.calls.outbound.length, 1);
  assert.equal(unregistered.calls.tokenUpdates.length, 1,
    "Invalid token is deactivated instead of being retried");

  for (const options of [
    { withDocument: true, pushStatus: 503 },
    { withDocument: true, malformedPushResponse: true },
  ]) {
    const failure = makeDocumentAlertsHarness(options);
    assert.deepEqual(await failure.invoke(), {
      status: 502, body: { error: "Push delivery could not be confirmed" },
    });
    assert.equal(failure.calls.outbound.length, 1);
    assert.equal(failure.calls.tokenUpdates.length, 0);
  }
});

test("GAP-PKG-004 authenticated employees cannot read peer or foreign-site documents", async () => {
  assert.match(config, /^project_id\s*=\s*"vento-shell"/m);
  const { randomUUID } = await import("node:crypto");
  const actors = Array.from({ length: 3 }, () => randomUUID());
  const sites = Array.from({ length: 2 }, () => randomUUID());
  const docs = Array.from({ length: 3 }, () => randomUUID());
  const objects = Array.from({ length: 3 }, () => randomUUID());
  const nonce = randomUUID().replace(/-/gu, "");
  const catalogAppId = randomUUID();
  const catalogPermissionId = randomUUID();
  const catalogVisoAppId = randomUUID();
  const catalogVisoPermissionId = randomUUID();
  const paths = [0, 1, 2].map((index) =>
    "gap-pkg-004-rls/" + nonce + "/employee-" + index + ".txt");
  const uuid = (value) => {
    assert.match(value, /^[0-9a-f-]{36}$/iu);
    return "'" + value + "'::uuid";
  };
  const list = (values) => values.map(uuid).join(", ");
  const countById = (table, ids) =>
    "(SELECT count(*) FROM " + table + " WHERE id IN (" + list(ids) + "))";
  const countObjects = "(SELECT count(*) FROM storage.objects WHERE bucket_id = 'documents' " +
    "AND id IN (" + list(objects) + "))";
  const snapshot = [
    "SELECT json_build_object(",
    " 'auth', " + countById("auth.users", actors) + ",",
    " 'profiles', " + countById("public.users", actors) + ",",
    " 'employees', " + countById("public.employees", actors) + ",",
    " 'employee_sites', (SELECT count(*) FROM public.employee_sites WHERE employee_id IN (" + list(actors) + ")),",
    " 'sites', " + countById("public.sites", sites) + ",",
    " 'documents', " + countById("public.documents", docs) + ",",
    " 'catalog_app', " + countById("public.apps", [catalogAppId, catalogVisoAppId]) + ",",
    " 'catalog_permission', " + countById("public.app_permissions", [catalogPermissionId, catalogVisoPermissionId]) + ",",
    " 'employee_grants', (SELECT count(*) FROM public.employee_permissions WHERE employee_id IN (" + list(actors) + ")),",
    " 'role_grants', (SELECT count(*) FROM public.role_permissions rp" +
    " JOIN public.app_permissions p ON p.id = rp.permission_id" +
    " JOIN public.apps a ON a.id = p.app_id" +
    " WHERE rp.role = 'cajero' AND a.code = 'viso' AND p.code = 'staff.documents.manage'),",
    " 'objects', " + countObjects,
    ");",
  ].join("\n");
  const before = JSON.parse(queryLocalDatabase(snapshot));
  assert.deepEqual(before, {
    auth: 0, profiles: 0, employees: 0, employee_sites: 0, sites: 0, documents: 0,
    catalog_app: 0, catalog_permission: 0, employee_grants: 0, role_grants: 0, objects: 0,
  }, "Synthetic IDs must not already exist locally");
  const insertedSites = sites.map((id, i) => "(" + uuid(id) + ", 'GAP004_RLS_" +
    nonce.slice(0, 8).toUpperCase() + "_" + i +
    "', 'GAP004 Synthetic Site', 'satellite', 'satellite', true)");
  const insertedUsers = actors.map((id, i) =>
    "(" + uuid(id) + ", 'gap004-rls-" + nonce + "-" + i + "@example.invalid')");
  const insertedProfiles = actors.map((id, i) =>
    "(" + uuid(id) + ", 'GAP004 Synthetic Employee', 'gap004-rls-" + nonce +
    "-" + i + "@example.invalid', 'client', true, 0, true)");
  const insertedEmployees = actors.map((id, i) =>
    "(" + uuid(id) + ", " + uuid(sites[i === 2 ? 1 : 0]) +
    ", 'cajero', 'GAP004 Synthetic Employee', true)");
  const insertedEmployeeSites = actors.map((id, i) =>
    "(" + uuid(id) + ", " + uuid(sites[i === 2 ? 1 : 0]) + ", true, true)");
  const insertedDocs = docs.map((id, i) =>
    "(" + uuid(id) + ", 'employee', " + uuid(actors[i]) + ", " + uuid(actors[i]) +
    ", " + uuid(sites[i === 2 ? 1 : 0]) +
    ", 'GAP004 Synthetic Document', '" + paths[i] + "', 'synthetic.txt')");
  const insertedObjects = objects.map((id, i) =>
    "(" + uuid(id) + ", 'documents', '" + paths[i] + "')");
  const statements = [
    "BEGIN;",
    "SET LOCAL statement_timeout = '20s';",
    "INSERT INTO auth.users (id, email) VALUES " + insertedUsers.join(", ") + ";",
    "INSERT INTO public.users (id, full_name, email, role, is_active, loyalty_points, is_client) VALUES " +
      insertedProfiles.join(", ") +
      " ON CONFLICT (id) DO UPDATE SET full_name = EXCLUDED.full_name, email = EXCLUDED.email, " +
      "role = EXCLUDED.role, is_active = EXCLUDED.is_active, " +
      "loyalty_points = EXCLUDED.loyalty_points, is_client = EXCLUDED.is_client;",
    "INSERT INTO public.sites (id, code, name, type, site_kind, is_active) VALUES " +
      insertedSites.join(", ") + ";",
    "INSERT INTO public.employees (id, site_id, role, full_name, is_active) VALUES " +
      insertedEmployees.join(", ") + ";",
    "INSERT INTO public.employee_sites (employee_id, site_id, is_primary, is_active) VALUES " +
      insertedEmployeeSites.join(", ") + " ON CONFLICT (employee_id, site_id) DO NOTHING;",
    "INSERT INTO public.documents (id, scope, owner_employee_id, target_employee_id, site_id, " +
      "title, storage_path, file_name) VALUES " + insertedDocs.join(", ") + ";",
    "INSERT INTO storage.objects (id, bucket_id, name) VALUES " +
      insertedObjects.join(", ") + ";",
    // Simulate the candidate forward RLS inside this transaction; ROLLBACK
    // reverts the policy as well as all synthetic Auth/employee/document rows.
    "DROP POLICY IF EXISTS gap_pkg_004_employee_sites_documents_site_scope ON public.employee_sites;",
    // Run the exact forward policies; rollback reverses this DDL and fixtures.
    employeeSitePolicySql,
    documentsScopePolicySql,
    storageScopePolicySql,
    // The local catalog can be empty. Introduce only transaction-bound test rows.
    "INSERT INTO public.apps (id, code, name) SELECT " + uuid(catalogAppId) +
      ", 'anima', 'GAP004 transaction-only app' WHERE NOT EXISTS (" +
      "SELECT 1 FROM public.apps WHERE code = 'anima');",
    "INSERT INTO public.app_permissions (id, app_id, code, name) SELECT " +
      uuid(catalogPermissionId) + ", a.id, 'documents.upload', 'GAP004 transaction-only permission'" +
      " FROM public.apps a WHERE a.code = 'anima' AND NOT EXISTS (" +
      "SELECT 1 FROM public.app_permissions p WHERE p.app_id = a.id AND p.code = 'documents.upload');",
    // Independently probe VISO's actual site-scoped manage permission in PostgreSQL.
    "INSERT INTO public.apps (id, code, name) SELECT " + uuid(catalogVisoAppId) +
      ", 'viso', 'GAP004 transaction-only VISO app' WHERE NOT EXISTS (" +
      "SELECT 1 FROM public.apps WHERE code = 'viso');",
    "INSERT INTO public.app_permissions (id, app_id, code, name) SELECT " +
      uuid(catalogVisoPermissionId) + ", a.id, 'staff.documents.manage', 'GAP004 VISO site permission'" +
      " FROM public.apps a WHERE a.code = 'viso' AND NOT EXISTS (" +
      "SELECT 1 FROM public.app_permissions p WHERE p.app_id = a.id AND p.code = 'staff.documents.manage');",
  ];
  for (let i = 0; i < actors.length; i++) {
    statements.push("SET LOCAL ROLE authenticated;");
    statements.push("SET LOCAL request.jwt.claim.sub = '" + actors[i] + "';");
    statements.push("SELECT json_build_object(" +
      "'actor', " + i + ", 'broad_permission', public.has_permission('anima.documents.view_all'), " +
      "'viso_permission', public.has_permission('viso.staff.documents.manage', " + uuid(sites[i === 2 ? 1 : 0]) + ")," +
      "'other_employee_sites', (SELECT count(*) FROM public.employee_sites" +
      " WHERE employee_id = " + uuid(actors[(i + 1) % 3]) + " AND is_active)," +
      "'docs', json_build_array(" +
      docs.map((id) => "(SELECT count(*) FROM public.documents WHERE id = " + uuid(id) + ")")
        .join(", ") + "), 'objects', json_build_array(" +
      objects.map((id) => "(SELECT count(*) FROM storage.objects WHERE id = " + uuid(id) + ")")
        .join(", ") + "));");
    statements.push("RESET ROLE;");
  }
  statements.push(
    "INSERT INTO public.employee_permissions (employee_id, permission_id, is_allowed, scope_type, scope_site_id)" +
    " SELECT " + uuid(actors[0]) + ", p.id, true, 'site', " + uuid(sites[0]) +
    " FROM public.app_permissions p JOIN public.apps a ON a.id = p.app_id" +
    " WHERE (a.code = 'anima' AND p.code = 'documents.upload')" +
    " OR (a.code = 'viso' AND p.code = 'staff.documents.manage');"
  );
  statements.push("SELECT json_build_object('grants', (SELECT count(*) FROM public.employee_permissions" +
    " WHERE employee_id = " + uuid(actors[0]) + " AND is_allowed" +
    " AND scope_site_id = " + uuid(sites[0]) + "));");
  statements.push("SET LOCAL ROLE authenticated;");
  statements.push("SET LOCAL request.jwt.claim.sub = '" + actors[0] + "';");
  statements.push("SELECT json_build_object(" +
    "'site_permission', public.has_permission('anima.documents.upload', " + uuid(sites[0]) + ")," +
    " 'foreign_permission', public.has_permission('anima.documents.upload', " + uuid(sites[1]) + ")," +
    " 'viso_site_permission', public.has_permission('viso.staff.documents.manage', " + uuid(sites[0]) + ")," +
    " 'viso_foreign_permission', public.has_permission('viso.staff.documents.manage', " + uuid(sites[1]) + ")," +
    " 'viso_null_site_permission', public.has_permission('viso.staff.documents.manage', NULL::uuid)," +
    " 'viso_explicit_global_employee', EXISTS (SELECT 1 FROM public.employee_permissions ep" +
    " JOIN public.app_permissions p ON p.id = ep.permission_id" +
    " JOIN public.apps a ON a.id = p.app_id" +
    " WHERE ep.employee_id = " + uuid(actors[0]) +
    " AND a.code = 'viso' AND p.code = 'staff.documents.manage'" +
    " AND ep.is_allowed AND ep.scope_type = 'global' AND ep.scope_site_id IS NULL)," +
    " 'viso_explicit_global_role', EXISTS (SELECT 1 FROM public.role_permissions rp" +
    " JOIN public.app_permissions p ON p.id = rp.permission_id" +
    " JOIN public.apps a ON a.id = p.app_id" +
    " WHERE rp.role = 'cajero' AND a.code = 'viso' AND p.code = 'staff.documents.manage'" +
    " AND rp.is_allowed AND (rp.scope_type = 'global' OR rp.scope_type IS NULL)" +
    " AND rp.scope_site_id IS NULL AND rp.scope_area_id IS NULL)," +
    " 'policy_shape_ok', EXISTS (SELECT 1 FROM pg_catalog.pg_policies" +
    " WHERE schemaname = 'public' AND tablename = 'employee_sites'" +
    " AND policyname = 'gap_pkg_004_employee_sites_documents_site_scope'" +
    " AND permissive = 'PERMISSIVE' AND cmd = 'SELECT'" +
    " AND roles = array['authenticated']::name[]" +
    " AND qual ilike '%is_active%' AND qual like '%anima.documents.upload%'" +
    " AND qual like '%site_id%')," +
    " 'target_peer_site_rows', (SELECT count(*) FROM public.employee_sites" +
    " WHERE employee_id = " + uuid(actors[1]) + " AND site_id = " + uuid(sites[0]) + " AND is_active)," +
    " 'foreign_site_rows', (SELECT count(*) FROM public.employee_sites" +
    " WHERE employee_id = " + uuid(actors[2]) + " AND site_id = " + uuid(sites[1]) + " AND is_active)," +
    " 'docs', json_build_array(" +
    docs.map((id) => "(SELECT count(*) FROM public.documents WHERE id = " + uuid(id) + ")").join(", ") +
    "), 'objects', json_build_array(" +
    objects.map((id) => "(SELECT count(*) FROM storage.objects WHERE id = " + uuid(id) + ")").join(", ") +
    "));");
  statements.push("RESET ROLE;");
  // Preserve the employee's real primary site, while testing a SECONDARY
  // assignment. Deactivating a sole primary would violate employment triggers.
  statements.push("INSERT INTO public.employee_sites (employee_id, site_id, is_primary, is_active)" +
    " VALUES (" + uuid(actors[2]) + ", " + uuid(sites[0]) + ", false, true);");
  // A target employee can work in two sites, but a document explicitly tagged
  // with site B must not become visible to an operator scoped only to site A.
  statements.push("SET LOCAL ROLE authenticated;");
  statements.push("SET LOCAL request.jwt.claim.sub = '" + actors[0] + "';");
  statements.push("SELECT json_build_object(" +
    "'actor', 'multi_site_target_foreign_document'," +
    " 'docs', json_build_array(" +
    docs.map((id) => "(SELECT count(*) FROM public.documents WHERE id = " + uuid(id) + ")").join(", ") +
    "), 'objects', json_build_array(" +
    objects.map((id) => "(SELECT count(*) FROM storage.objects WHERE id = " + uuid(id) + ")").join(", ") +
    "));");
  statements.push("RESET ROLE;");
  statements.push("UPDATE public.documents SET site_id = " + uuid(sites[0]) +
    " WHERE id = " + uuid(docs[2]) + ";");
  statements.push("SET LOCAL ROLE authenticated;");
  statements.push("SET LOCAL request.jwt.claim.sub = '" + actors[0] + "';");
  statements.push("SELECT json_build_object(" +
    "'actor', 'secondary_site_active'," +
    " 'secondary_site_rows', (SELECT count(*) FROM public.employee_sites" +
    " WHERE employee_id = " + uuid(actors[2]) + " AND site_id = " + uuid(sites[0]) +
    " AND is_active AND NOT is_primary)," +
    " 'docs', json_build_array(" +
    docs.map((id) => "(SELECT count(*) FROM public.documents WHERE id = " + uuid(id) + ")").join(", ") +
    "), 'objects', json_build_array(" +
    objects.map((id) => "(SELECT count(*) FROM storage.objects WHERE id = " + uuid(id) + ")").join(", ") +
    "));");
  statements.push("RESET ROLE;");
  // An inactive SECONDARY assignment must no longer justify access, while
  // keeping the target's valid primary assignment at the other site.
  statements.push("WITH modified AS (UPDATE public.employee_sites SET is_active = false" +
    " WHERE employee_id = " + uuid(actors[2]) + " AND site_id = " + uuid(sites[0]) +
    " AND NOT is_primary RETURNING employee_id)" +
    " SELECT json_build_object('deactivated', (SELECT count(*) FROM modified));");
  statements.push("SET LOCAL ROLE authenticated;");
  statements.push("SET LOCAL request.jwt.claim.sub = '" + actors[0] + "';");
  statements.push("SELECT json_build_object(" +
    "'actor', 'secondary_site_inactive'," +
    " 'grant_still_valid', public.has_permission('anima.documents.upload', " + uuid(sites[0]) + ")," +
    " 'viso_grant_still_valid', public.has_permission('viso.staff.documents.manage', " + uuid(sites[0]) + ")," +
    " 'peer_active_assignments', (SELECT count(*) FROM public.employee_sites" +
    " WHERE employee_id = " + uuid(actors[2]) + " AND site_id = " + uuid(sites[0]) +
    " AND is_active)," +
    " 'docs', json_build_array(" +
    docs.map((id) => "(SELECT count(*) FROM public.documents WHERE id = " + uuid(id) + ")").join(", ") +
    "), 'objects', json_build_array(" +
    objects.map((id) => "(SELECT count(*) FROM storage.objects WHERE id = " + uuid(id) + ")").join(", ") +
    "));");
  statements.push("RESET ROLE;");
  // A real explicit GLOBAL grant is distinguishable from a site-only grant
  // despite both returning true for has_permission(permission, NULL).
  statements.push(
    "INSERT INTO public.employee_permissions (employee_id, permission_id, is_allowed, scope_type)" +
    " SELECT " + uuid(actors[0]) + ", p.id, true, 'global'" +
    " FROM public.app_permissions p JOIN public.apps a ON a.id = p.app_id" +
    " WHERE a.code = 'viso' AND p.code = 'staff.documents.manage';"
  );
  statements.push("SET LOCAL ROLE authenticated;");
  statements.push("SET LOCAL request.jwt.claim.sub = '" + actors[0] + "';");
  statements.push("SELECT json_build_object(" +
    "'actor', 'explicit_global_grant'," +
    " 'null_site_rpc', public.has_permission('viso.staff.documents.manage', NULL::uuid)," +
    " 'global_grant', EXISTS (SELECT 1 FROM public.employee_permissions ep" +
    " JOIN public.app_permissions p ON p.id = ep.permission_id" +
    " JOIN public.apps a ON a.id = p.app_id" +
    " WHERE ep.employee_id = " + uuid(actors[0]) +
    " AND a.code = 'viso' AND p.code = 'staff.documents.manage'" +
    " AND ep.is_allowed AND ep.scope_type = 'global'" +
    " AND ep.scope_site_id IS NULL AND ep.scope_area_id IS NULL));");
  statements.push("RESET ROLE;");
  // An operator without individual grants is granted a role permission first
  // at ONE site, then GLOBAL. Every SQL row exists only inside BEGIN/ROLLBACK.
  statements.push(
    "INSERT INTO public.role_permissions (role, permission_id, is_allowed, scope_type, scope_site_id)" +
    " SELECT 'cajero', p.id, true, 'site', " + uuid(sites[0]) +
    " FROM public.app_permissions p JOIN public.apps a ON a.id = p.app_id" +
    " WHERE a.code = 'viso' AND p.code = 'staff.documents.manage'" +
    " AND NOT EXISTS (SELECT 1 FROM public.role_permissions rp" +
    " WHERE rp.role = 'cajero' AND rp.permission_id = p.id);"
  );
  statements.push("SET LOCAL ROLE authenticated;");
  statements.push("SET LOCAL request.jwt.claim.sub = '" + actors[1] + "';");
  statements.push("SELECT json_build_object(" +
    "'actor', 'site_only_role_grant'," +
    " 'local_site_rpc', public.has_permission('viso.staff.documents.manage', " + uuid(sites[0]) + ")," +
    " 'foreign_site_rpc', public.has_permission('viso.staff.documents.manage', " + uuid(sites[1]) + ")," +
    " 'individual_grants', (SELECT count(*) FROM public.employee_permissions" +
    " WHERE employee_id = " + uuid(actors[1]) + "));");
  statements.push("RESET ROLE;");
  statements.push(
    "UPDATE public.role_permissions SET scope_type = 'global', scope_site_id = NULL" +
    " WHERE role = 'cajero' AND scope_type = 'site' AND scope_site_id = " + uuid(sites[0]) +
    " AND permission_id IN (SELECT p.id FROM public.app_permissions p" +
    " JOIN public.apps a ON a.id = p.app_id" +
    " WHERE a.code = 'viso' AND p.code = 'staff.documents.manage');"
  );
  statements.push("SET LOCAL ROLE authenticated;");
  statements.push("SET LOCAL request.jwt.claim.sub = '" + actors[1] + "';");
  statements.push("SELECT json_build_object(" +
    "'actor', 'explicit_global_role_grant'," +
    " 'null_site_rpc', public.has_permission('viso.staff.documents.manage', NULL::uuid)," +
    " 'foreign_site_rpc', public.has_permission('viso.staff.documents.manage', " + uuid(sites[1]) + ")," +
    " 'individual_grants', (SELECT count(*) FROM public.employee_permissions" +
    " WHERE employee_id = " + uuid(actors[1]) + "));");
  statements.push("RESET ROLE;");
  statements.push("ROLLBACK;");
  const rows = queryLocalDatabase(statements.join("\n")).split(/\r?\n/u)
    .filter(Boolean).map((line) => JSON.parse(line));
  assert.equal(rows.length, 12, "Three unprivileged actors, site grants, multi-site probes, employee GLOBAL, role SITE and role GLOBAL");
  for (let i = 0; i < 3; i++) {
    assert.equal(rows[i].actor, i);
    assert.equal(rows[i].broad_permission, false,
      "A cashier has no blanket permission to read documents");
    assert.equal(rows[i].viso_permission, false,
      "Unprivileged employees must not manage VISO staff documents");
    assert.equal(rows[i].other_employee_sites, 0,
      "Unprivileged actors must not enumerate peer site assignments");
    assert.deepEqual(rows[i].docs, [0, 1, 2].map((index) => Number(index === i)),
      "Employee may read own metadata but not a same-site peer or a foreign site");
    assert.deepEqual(rows[i].objects, [0, 1, 2].map((index) => Number(index === i)),
      "Storage RLS must match the employee and site boundaries");
  }
  // Verify rollback BEFORE any positive authorization assertion can fail.
  assert.deepEqual(JSON.parse(queryLocalDatabase(snapshot)), before,
    "Synthetic identities, catalog rows, grants, documents and Storage must be rolled back");
  assert.equal(rows[3].grants, 2, "Exactly one ANIMA and one VISO site grant must exist");
  assert.equal(rows[4].site_permission, true, "Granted ANIMA site permission must be effective");
  assert.equal(rows[4].viso_site_permission, true,
    "Granted VISO staff-document permission must be effective at the operator's site");
  assert.equal(rows[4].viso_foreign_permission, false,
    "VISO site grant must not authorize employee documents at another site");
  // Verified behavior: NULL-site has_permission is NOT proof of GLOBAL scope.
  // It can return true for a site-only grant, so callers must check provenance.
  assert.equal(rows[4].viso_null_site_permission, true,
    "A site-only grant can satisfy the legacy NULL-site RPC; do not use it alone");
  assert.equal(rows[4].viso_explicit_global_employee, false,
    "No explicit employee GLOBAL grant exists for this site-only operator");
  assert.equal(rows[4].viso_explicit_global_role, false,
    "The operator's real role must not carry a GLOBAL document grant");
  assert.equal(rows[4].policy_shape_ok, true, "Forward policy must satisfy the exact catalog postcondition");
  assert.equal(rows[4].foreign_permission, false, "Site permission must deny another site");
  assert.equal(rows[4].target_peer_site_rows, 1,
    "Explicitly authorized operators may resolve active peer membership at their own site");
  assert.equal(rows[4].foreign_site_rows, 0,
    "Site-scoped document operators must not enumerate assignments at other sites");
  assert.deepEqual(rows[4].docs, [1, 1, 0], "Operator may see same-site documents only");
  assert.deepEqual(rows[4].objects, [1, 1, 0], "Private Storage follows the granted site boundary");
  assert.equal(rows[5].actor, "multi_site_target_foreign_document");
  assert.deepEqual(rows[5].docs, [1, 1, 0],
    "Target membership at site A must not expose a document explicitly assigned to site B");
  assert.deepEqual(rows[5].objects, [1, 1, 0],
    "Storage must reject a foreign-site document despite an active secondary assignment");
  assert.equal(rows[6].actor, "secondary_site_active");
  assert.equal(rows[6].secondary_site_rows, 1,
    "An active secondary site assignment must exist without replacing the primary site");
  assert.deepEqual(rows[6].docs, [1, 1, 1],
    "The operator may see a document explicitly assigned to its authorized site");
  assert.deepEqual(rows[6].objects, [1, 1, 1],
    "Private Storage must honor that authorized document site");
  assert.equal(rows[7].deactivated, 1,
    "Exactly one non-primary site assignment must be disabled");
  assert.equal(rows[8].actor, "secondary_site_inactive");
  assert.equal(rows[8].grant_still_valid, true,
    "The operator keeps the ANIMA site grant while the target's secondary assignment changes");
  assert.equal(rows[8].viso_grant_still_valid, true,
    "The VISO operator retains its own permission but loses access to an unassigned target");
  assert.equal(rows[8].peer_active_assignments, 0);
  assert.deepEqual(rows[8].docs, [1, 1, 0],
    "Inactive secondary assignments cannot justify reading their documents");
  assert.deepEqual(rows[8].objects, [1, 1, 0],
    "Inactive secondary assignments cannot justify reading their Storage objects");
  assert.equal(rows[9].actor, "explicit_global_grant");
  assert.equal(rows[9].null_site_rpc, true,
    "The ordinary permission RPC stays effective for an explicit GLOBAL grant");
  assert.equal(rows[9].global_grant, true,
    "An actual GLOBAL grant must be identifiable separately from the unsafe NULL-site RPC");
  assert.equal(rows[10].actor, "site_only_role_grant");
  assert.equal(rows[10].individual_grants, 0,
    "The site-only role case must not have individual permissions");
  assert.equal(rows[10].local_site_rpc, true,
    "The actual role's site grant must allow the assigned site");
  assert.equal(rows[10].foreign_site_rpc, false,
    "A site-limited role grant must not authorize a foreign site");
  assert.equal(rows[11].actor, "explicit_global_role_grant");
  assert.equal(rows[11].individual_grants, 0,
    "The role grant must authorize an actor without any individual permissions");
  assert.equal(rows[11].null_site_rpc, true,
    "The actual role's explicit GLOBAL grant must be effective");
  assert.equal(rows[11].foreign_site_rpc, true,
    "A global role grant must authorize a different site under the real SQL RPC");
});

test("GAP-PKG-004 local positive invitation prerequisites are available", async () => {
  assert.match(config, /^project_id\s*=\s*"vento-shell"/m);
  // Only retrieve local keys into memory, without printing them.
  readLocalEdgeSecret("SUPABASE_SERVICE_ROLE_KEY");
  readLocalEdgeSecret("SUPABASE_ANON_KEY");

  const state = JSON.parse(queryLocalDatabase([
    "SELECT json_build_object(",
    " 'mesero', EXISTS (SELECT 1 FROM public.roles WHERE code = 'mesero' AND is_active IS TRUE),",
    " 'completion_rpc', to_regprocedure('public.complete_staff_invitation_v1(uuid,uuid,text,text,text,text)') IS NOT NULL,",
    " 'no_direct_auth_rpc', NOT has_function_privilege('authenticated',",
    "   'public.complete_staff_invitation_v1(uuid,uuid,text,text,text,text)', 'EXECUTE')",
    ");",
  ].join("\n")));
  assert.equal(state.mesero, true, "Local seeded staff role 'mesero' required");
  assert.equal(state.completion_rpc, true, "Local invitation RPC migration required");
  assert.equal(state.no_direct_auth_rpc, true, "Client must not have direct completion privileges");
});

test("GAP-PKG-004 local Auth health endpoint is available without hosted credentials", async () => {
  assert.match(config, /^project_id\s*=\s*"vento-shell"/m);
  const url = new URL("/auth/v1/health", "http://127.0.0.1:54321");
  assert.equal(url.hostname, "127.0.0.1");
  const response = await fetch(url, {
    method: "GET", redirect: "manual", signal: AbortSignal.timeout(8000),
  });
  assert.equal(response.status, 200, "Local GoTrue must be healthy before invitation tests");
});

test("GAP-PKG-004 local Edge invitation endpoint responds without touching hosted services", async () => {
  assert.match(config, /^project_id\s*=\s*"vento-shell"/m);
  const endpoint = new URL("/functions/v1/staff-invitations-accept", "http://127.0.0.1:54321");
  assert.equal(endpoint.hostname, "127.0.0.1");
  const response = await fetch(endpoint, {
    method: "GET",
    redirect: "manual",
    signal: AbortSignal.timeout(10000),
  });
  const responseText = (await response.text()).slice(0, 800)
    .replace(/eyJ[A-Za-z0-9._-]{20,}/gu, "[REDACTED_JWT]");
  assert.equal(response.status, 405,
    "The local Edge runtime must execute staff-invitations-accept and reject GET; HTTP " +
      response.status + ", response: " + responseText);
  const body = JSON.parse(responseText);
  assert.equal(body.error, "Method not allowed");
});


test("GAP-PKG-004 local Edge rejects unauthenticated POST requests", async () => {
  assert.match(config, /^project_id\s*=\s*"vento-shell"/m);
  const endpoint = new URL("/functions/v1/staff-invitations-accept", "http://127.0.0.1:54321");
  assert.equal(endpoint.hostname, "127.0.0.1");
  const response = await fetch(endpoint, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      password: "synthetic-only-password",
      full_name: "Synthetic Local Person",
    }),
    redirect: "manual",
    signal: AbortSignal.timeout(20000),
  });
  const textBody = (await response.text()).slice(0, 500);
  assert.equal(response.status, 401, "Unauthenticated Edge request must fail closed: " +
    response.status + " " + textBody);
  const body = JSON.parse(textBody);
  assert.equal(body.error, "Unauthorized");
});

// Behavioral tests run the actual Edge TypeScript handler with a Supabase
// adapter, never a copied reimplementation. They do not replace HTTP/Auth
// smoke testing. No secrets, external requests or persistent test data.
function makeLocalInvitationHandlerHarness(options = {}) {
  const relative = "supabase/functions/staff-invitations-accept/index.ts";
  const source = fs.readFileSync(path.join(root, relative), "utf8")
    .replace(/^import \{ serve \} from "[^"]+"\s*$/mu, "")
    .replace(/^import \{ createClient \} from "[^"]+"\s*$/mu, "");
  assert.doesNotMatch(source, /^import /m);
  const user = {
    id: "b0040000-0000-0000-0000-000000000021",
    email: "fixture@example.invalid",
    email_confirmed_at: new Date().toISOString(),
    user_metadata: { role: "propietario", site_id: "untrusted-site", full_name: "Ficha Local" },
    ...(options.user ?? {}),
  };
  const invitation = {
    id: "b0040000-0000-0000-0000-000000000022",
    auth_user_id: user.id,
    email: "fixture@example.invalid",
    status: options.status ?? "sent",
    expires_at: options.expiresAt ?? new Date(Date.now() + 86400000).toISOString(),
    role_code: "mesero",
    staff_role: "mesero",
    site_id: "b0040000-0000-0000-0000-000000000020",
    staff_site_id: "b0040000-0000-0000-0000-000000000020",
    ...(options.invitation ?? {}),
  };
  const calls = { authUpdates: [], rpc: [], queried: [], issuedClients: 0 };
  function from(name) {
    const clauses = [];
    const builder = {
      select() { return builder; },
      eq(field, value) { clauses.push(["eq", field, value]); return builder; },
      gt(field, value) { clauses.push(["gt", field, value]); return builder; },
      order() { return builder; },
      limit() { return builder; },
      async maybeSingle() {
        calls.queried.push({ table: name, clauses });
        if (name === "staff_invitations") {
          const matches = clauses.every(([operator, field, value]) => {
            if (operator === "eq") return invitation[field] === value;
            if (operator === "gt") return String(invitation[field]) > String(value);
            return false;
          });
          return { data: matches ? invitation : null, error: null };
        }
        if (name === "roles") {
          return { data: options.roleActive === false ? null :
            { code: invitation.role_code, is_active: true }, error: null };
        }
        if (name === "sites") {
          return { data: options.siteActive === false ? null :
            { id: invitation.site_id, is_active: true }, error: null };
        }
        if (name === "users") return { data: options.profile ?? null, error: null };
        throw new Error("UNEXPECTED_EDGE_TABLE: " + name);
      },
    };
    return builder;
  }
  const client = {
    auth: {
      async getUser(token) {
        if (token !== "local-fixture-access" || options.rejectToken) {
          return { data: null, error: new Error("invalid token") };
        }
        return { data: { user }, error: null };
      },
      admin: {
        async updateUserById(id, args) {
          calls.authUpdates.push({ id, args });
          return { error: options.authError ? new Error("local mock auth failure") : null };
        },
      },
    },
    from,
    async rpc(name, args) {
      calls.rpc.push({ name, args });
      return {
        data: options.rpcReject ? false : true,
        error: options.rpcError ? new Error("local mock rpc failure") : null,
      };
    },
  };
  let handler = null;
  const sandbox = {
    serve(fn) { handler = fn; },
    createClient() { calls.issuedClients++; return client; },
    Deno: { env: { get(name) {
      if (name === "SUPABASE_URL") return "http://127.0.0.1:54321";
      if (name === "SUPABASE_SERVICE_ROLE_KEY") return "synthetic-unit-test-only";
      return null;
    } } },
    Request, Response, Headers, Date, URL,
    console: { error() {} },
  };
  const transpiled = stripTypeScriptTypes(source, { mode: "strip" });
  // Node can retain Deno imports while stripping types. Use only the actual
  // local Edge handler body under the deterministic dependency adapters.
  const runnable = transpiled.replace(/^import .*$/gmu, "");
  assert.doesNotMatch(runnable, /^import /mu);
  runInNewContext(runnable, sandbox, {
    filename: relative, timeout: 1000,
  });
  assert.equal(typeof handler, "function");

  return {
    calls, user, invitation,
    async invoke(body = { password: "TestPassword123", full_name: "Persona Prueba" }, token = "local-fixture-access") {
      const request = new Request("http://127.0.0.1:54321/functions/v1/staff-invitations-accept", {
        method: "POST",
        headers: token ? { Authorization: "Bearer " + token } : {},
        body: JSON.stringify(body),
      });
      const response = await handler(request);
      return { status: response.status, body: await response.json() };
    },
  };
}

test("GAP-PKG-004 actual Edge handler finalizes only a verified, pending invitation", async () => {
  const h = makeLocalInvitationHandlerHarness();
  const response = await h.invoke();
  assert.equal(response.status, 200);
  assert.equal(response.body.user_id, h.user.id);
  assert.equal(h.calls.authUpdates.length, 1);
  assert.equal(h.calls.rpc.length, 1);
  assert.equal(h.calls.authUpdates[0].args.password, "TestPassword123");
  assert.equal(h.calls.authUpdates[0].args.user_metadata.role, undefined);
  assert.equal(h.calls.authUpdates[0].args.user_metadata.site_id, undefined);
  assert.equal(h.calls.rpc[0].name, "complete_staff_invitation_v1");
  assert.deepEqual(JSON.parse(JSON.stringify(h.calls.rpc[0].args)), {
    p_invitation_id: h.invitation.id,
    p_auth_user_id: h.user.id,
    p_email: h.user.email,
    p_full_name: "Persona Prueba",
    p_alias: null,
    p_completion_status: "accepted",
  });
});

test("GAP-PKG-004 Edge rejects unsigned and invalid user sessions", async () => {
  const h = makeLocalInvitationHandlerHarness();
  assert.equal((await h.invoke(undefined, "")).status, 401);
  assert.equal((await h.invoke(undefined, "invalid-token")).status, 401);
  assert.equal(h.calls.authUpdates.length, 0);
  assert.equal(h.calls.rpc.length, 0);
});

test("GAP-PKG-004 Edge rejects weak credentials before touching Auth", async () => {
  const h = makeLocalInvitationHandlerHarness();
  assert.equal((await h.invoke({ password: "short", full_name: "Persona" })).status, 400);
  assert.equal(h.calls.issuedClients, 0);
});

test("GAP-PKG-004 Edge does not activate a cancelled or expired invitation", async () => {
  for (const options of [
    { status: "cancelled" },
    { status: "accepted" },
    { expiresAt: new Date(Date.now() - 86400000).toISOString() },
    { invitation: { auth_user_id: "b0040000-0000-0000-0000-000000000029" } },
  ]) {
    const h = makeLocalInvitationHandlerHarness(options);
    assert.equal((await h.invoke()).status, 403, JSON.stringify(options));
    assert.equal(h.calls.authUpdates.length, 0);
    assert.equal(h.calls.rpc.length, 0);
  }
});

test("GAP-PKG-004 Edge refuses unverified identities and client role/site overrides", async () => {
  const unverified = makeLocalInvitationHandlerHarness({ user: { email_confirmed_at: null } });
  assert.equal((await unverified.invoke()).status, 403);
  assert.equal(unverified.calls.authUpdates.length, 0);
  const role = makeLocalInvitationHandlerHarness();
  assert.equal((await role.invoke({ password: "TestPassword123", full_name: "Persona", role: "propietario" })).status, 403);
  assert.equal(role.calls.authUpdates.length, 0);
  const site = makeLocalInvitationHandlerHarness();
  assert.equal((await site.invoke({ password: "TestPassword123", full_name: "Persona", site_id: "wrong-site" })).status, 403);
  assert.equal(site.calls.rpc.length, 0);
});

test("GAP-PKG-004 Edge does not commit staff access if Auth fails", async () => {
  const h = makeLocalInvitationHandlerHarness({ authError: true });
  assert.equal((await h.invoke()).status, 500);
  assert.equal(h.calls.rpc.length, 0);
});

test("GAP-PKG-004 Edge reports concurrent cancellation without declaring success", async () => {
  const h = makeLocalInvitationHandlerHarness({ rpcReject: true });
  const response = await h.invoke();
  assert.equal(response.status, 409);
  assert.equal(h.calls.authUpdates.length, 1);
  assert.equal(h.calls.rpc.length, 1);
  assert.equal(response.body.error, "Invitation no longer available");
});

test("GAP-PKG-004 Edge reports database failures without declaring success", async () => {
  const h = makeLocalInvitationHandlerHarness({ rpcError: true });
  const response = await h.invoke();
  assert.equal(response.status, 503);
  assert.equal(h.calls.rpc.length, 1);
  assert.match(response.body.error, /retry safely/);
});


test("GAP-PKG-004 real GoTrue invitation-to-employment acceptance stays local and cleans up", async () => {
  // The local-only experiment is authorized for this one GAP package.
  // The generated link is an Auth admin link: no SMTP/Resend or hosted services.
  // It represents the same invitation shape persisted by staff-invitations-create,
  // but does not claim to test that sender's external email delivery.
  assert.match(config, /^project_id\s*=\s*"vento-shell"/m);
  const localOrigin = "http://127.0.0.1:54321";
  const { createClient } = await import("@supabase/supabase-js");
  const { randomUUID } = await import("node:crypto");
  const serviceKey = readLocalEdgeSecret("SUPABASE_SERVICE_ROLE_KEY");
  const anonKey = readLocalEdgeSecret("SUPABASE_ANON_KEY");
  const admin = createClient(localOrigin, serviceKey, {
    auth: { persistSession: false, autoRefreshToken: false },
  });
  const invited = createClient(localOrigin, anonKey, {
    auth: { persistSession: false, autoRefreshToken: false },
  });

  const nonce = randomUUID().replace(/-/gu, "");
  const siteId = randomUUID();
  const invitationId = randomUUID();
  const siteCode = "GAP004_E2E_" + nonce.slice(0, 12).toUpperCase();
  const email = "gap004-e2e-" + nonce + "@example.invalid";
  const fullName = "Prueba Local GAP004";
  const password = "LocalGap004-" + randomUUID();
  const sqlUuid = x => {
    assert.match(x, /^[0-9a-f-]{36}$/iu);
    return "'" + x + "'::uuid";
  };
  const siteLiteral = sqlUuid(siteId);
  const inviteLiteral = sqlUuid(invitationId);
  let authUserId = null;
  let siteInsertAttempted = false;
  let invitationInsertAttempted = false;
  let acceptanceConfirmed = false;
  const cleanupFailures = [];

  function stateOfFixture() {
    const userCondition = authUserId ? "id = " + sqlUuid(authUserId) : "false";
    return JSON.parse(queryLocalDatabase([
      "SELECT json_build_object(",
      " 'site_count', (SELECT count(*) FROM public.sites WHERE id = " + siteLiteral + "),",
      " 'invitation_count', (SELECT count(*) FROM public.staff_invitations WHERE id = " + inviteLiteral + "),",
      " 'status', (SELECT status FROM public.staff_invitations WHERE id = " + inviteLiteral + "),",
      " 'employee_count', (SELECT count(*) FROM public.employees WHERE " + userCondition + "),",
      " 'employee_role', (SELECT role FROM public.employees WHERE " + userCondition + "),",
      " 'employee_name', (SELECT full_name FROM public.employees WHERE " + userCondition + "),",
      " 'employee_active', (SELECT is_active FROM public.employees WHERE " + userCondition + "),",
      " 'primary_site_count', (SELECT count(*) FROM public.employee_sites",
      "    WHERE employee_id = " + (authUserId ? sqlUuid(authUserId) : "NULL::uuid") +
      "      AND site_id = " + siteLiteral + " AND is_primary AND is_active),",
      " 'settings_count', (SELECT count(*) FROM public.employee_settings",
      "    WHERE employee_id = " + (authUserId ? sqlUuid(authUserId) : "NULL::uuid") + "),",
      " 'auth_count', (SELECT count(*) FROM auth.users WHERE " + userCondition + "),",
      " 'email_verified', (SELECT email_confirmed_at IS NOT NULL FROM auth.users WHERE " + userCondition + "),",
      " 'public_user_count', (SELECT count(*) FROM public.users WHERE " + userCondition + ")",
      ");",
    ].join("\n")));
  }

  try {
    // A fresh operational site, never an existing real site or employee.
    siteInsertAttempted = true;
    queryLocalDatabase([
      "INSERT INTO public.sites (id, code, name, type, site_kind, site_type, is_active, operational_visibility)",
      "VALUES (" + siteLiteral + ", '" + siteCode + "', 'GAP004 Local E2E Fixture',",
      " 'satellite', 'operational', 'satellite', true, 'operational');",
    ].join("\n"));

    const generated = await admin.auth.admin.generateLink({
      type: "invite", email,
      options: { data: { full_name: fullName } },
    });
    assert.equal(Boolean(generated.error), false,
      "Local GoTrue admin.generateLink(invite) must succeed");
    authUserId = generated.data?.user?.id ?? null;
    const hashedToken = generated.data?.properties?.hashed_token;
    const verifyType = generated.data?.properties?.verification_type ?? "invite";
    assert.ok(authUserId && /^[0-9a-f-]{36}$/iu.test(authUserId),
      "GoTrue must create a synthetic local Auth user");
    assert.ok(typeof hashedToken === "string" && hashedToken.length > 20,
      "GoTrue must produce an invitation token_hash");
    assert.equal(verifyType, "invite", "Verification type must be invite");
    assert.equal(stateOfFixture().auth_count, 1);

    // Reproduce the live 'sent' invitation shape without outbound email.
    invitationInsertAttempted = true;
    queryLocalDatabase([
      "INSERT INTO public.staff_invitations (",
      " id, email, full_name, staff_role, role_code, staff_site_id, site_id,",
      " status, auth_user_id, invited_at, expires_at, metadata",
      ") VALUES (",
      inviteLiteral + ", '" + email + "', '" + fullName + "',",
      " 'mesero', 'mesero', " + siteLiteral + ", " + siteLiteral + ",",
      " 'sent', " + sqlUuid(authUserId) + ", now(), now() + interval '1 day',",
      " '{\"source\":\"GAP-PKG-004-local-e2e\"}'::jsonb);",
    ].join("\n"));

    const before = stateOfFixture();
    assert.equal(before.invitation_count, 1);
    assert.equal(before.status, "sent");
    assert.equal(before.employee_count, 0, "Invitation must not preactivate employee");
    assert.equal(before.primary_site_count, 0, "Invitation must not preactivate site");
    assert.equal(before.email_verified, false, "Unaccepted Auth invitation must remain unverified");

    // Equivalent to the browser's verifyOtp({ token_hash, type: "invite" }).
    const verified = await invited.auth.verifyOtp({
      token_hash: hashedToken, type: "invite",
    });
    assert.equal(Boolean(verified.error), false,
      "Local GoTrue invitation verification must succeed");
    const accessToken = verified.data?.session?.access_token;
    assert.ok(typeof accessToken === "string" && accessToken.length > 50,
      "Local GoTrue must issue an authenticated invitation session");
    assert.equal(verified.data?.user?.id, authUserId);
    assert.equal(stateOfFixture().email_verified, true);

    const endpoint = localOrigin + "/functions/v1/staff-invitations-accept";
    async function accept(body, callerToken = accessToken) {
      const response = await fetch(endpoint, {
        method: "POST",
        headers: {
          Authorization: "Bearer " + callerToken,
          apikey: anonKey,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
        redirect: "manual",
        signal: AbortSignal.timeout(25000),
      });
      const payload = await response.json().catch(() => ({}));
      return { status: response.status, payload };
    }

    // The client cannot override the manager's invitation role.
    const tampered = await accept({
      password, full_name: fullName, role: "propietario",
    });
    assert.equal(tampered.status, 403,
      "A verified invitee cannot elevate their role via the body");
    assert.equal(stateOfFixture().employee_count, 0,
      "Denied role escalation must not provision employment");

    const accepted = await accept({ password, full_name: fullName });
    assert.equal(accepted.status, 200,
      "Edge invitation activation must return HTTP 200 (got " + accepted.status +
        ", code=" + String(accepted.payload?.error || "none") + ")");
    assert.equal(accepted.payload?.user_id, authUserId);

    const after = stateOfFixture();
    assert.equal(after.status, "accepted", "Invitation must be marked accepted");
    assert.equal(after.employee_count, 1, "Exactly one staff employee must exist");
    assert.equal(after.employee_role, "mesero", "Role comes from the server invitation");
    assert.equal(after.employee_name, fullName);
    assert.equal(after.employee_active, true);
    assert.equal(after.primary_site_count, 1, "One active primary site must be assigned");

    // Auth password change is real too; app can sign in after acceptance.
    const login = await invited.auth.signInWithPassword({ email, password });
    assert.equal(Boolean(login.error), false,
      "Local GoTrue must accept the new password");
    assert.equal(login.data?.user?.id, authUserId);

    // A replayed acceptance cannot grant further access.
    const freshSessionToken = login.data?.session?.access_token;
    assert.ok(typeof freshSessionToken === "string" && freshSessionToken.length > 50,
      "Password login must return a fresh valid Auth access token");
    const repeated = await accept({ password, full_name: fullName }, freshSessionToken);
    assert.equal(repeated.status, 403,
      "A completed invitation must no longer be eligible for acceptance");
    assert.equal(stateOfFixture().primary_site_count, 1);
    acceptanceConfirmed = true;
  } finally {
    // Clean up by newly generated UUID + unique fixture email/site code only.
    // Never reset the local DB or touch any other staff/site record.
    if (siteInsertAttempted || invitationInsertAttempted) {
      try {
        const user = authUserId ? sqlUuid(authUserId) : "NULL::uuid";
        queryLocalDatabase([
          "BEGIN;",
          "SET LOCAL statement_timeout = '15s';",
          // Local-only fixture cleanup: bypass circular employee assignment
          // triggers in this ONE transaction (never a global database setting).
          "SET LOCAL session_replication_role = replica;",
          "DELETE FROM public.staff_invitations WHERE id = " + inviteLiteral +
            " AND email = '" + email + "';",
          "DELETE FROM public.employees WHERE id = " + user +
            " AND site_id = " + siteLiteral + ";",
          "DELETE FROM public.employee_sites WHERE employee_id = " + user +
            " AND site_id = " + siteLiteral + ";",
          "DELETE FROM public.employee_settings WHERE employee_id = " + user + ";",
          "DELETE FROM public.users WHERE id = " + user +
            " AND email = '" + email + "';",
          "DELETE FROM public.sites WHERE id = " + siteLiteral +
            " AND code = '" + siteCode + "';",
          "COMMIT;",
        ].join("\n"));
      } catch {
        cleanupFailures.push("local_postgresql_fixture_cleanup");
      }
    }
    if (authUserId) {
      try {
        const deleted = await admin.auth.admin.deleteUser(authUserId);
        if (deleted.error) cleanupFailures.push("local_gotrue_delete_user");
      } catch {
        cleanupFailures.push("local_gotrue_delete_user");
      }
    }
    try {
      const remain = stateOfFixture();
      for (const field of [
        "site_count", "invitation_count", "employee_count",
        "primary_site_count", "settings_count", "auth_count", "public_user_count",
      ]) {
        if (remain[field] !== 0) cleanupFailures.push("residual_" + field);
      }
    } catch {
      cleanupFailures.push("local_residual_verification");
    }
    assert.deepEqual(cleanupFailures, [],
      "Synthetic local test fixture must be fully removed");
  }
  assert.equal(acceptanceConfirmed, true,
    "Real local GoTrue + Edge + PostgreSQL acceptance must complete");
});


test("GAP-PKG-004 recover exclusively orphaned local synthetic fixture", async () => {
  assert.match(config, /^project_id\s*=\s*"vento-shell"/m);
  const pattern = "^gap004-e2e-[0-9a-f]{32}@example[.]invalid$";
  const ids = "(SELECT id FROM auth.users WHERE email ~ '" + pattern + "')";
  const snapshot = [
    "SELECT json_build_object(",
    " 'auth', (SELECT count(*) FROM auth.users WHERE id IN " + ids + "),",
    " 'profiles', (SELECT count(*) FROM public.users WHERE id IN " + ids + "),",
    " 'invites', (SELECT count(*) FROM public.staff_invitations",
    "   WHERE auth_user_id IN " + ids + " AND metadata->>'source' = 'GAP-PKG-004-local-e2e'),",
    " 'employees', (SELECT count(*) FROM public.employees WHERE id IN " + ids + "),",
    " 'employee_sites', (SELECT count(*) FROM public.employee_sites WHERE employee_id IN " + ids + "),",
    " 'employee_settings', (SELECT count(*) FROM public.employee_settings WHERE employee_id IN " + ids + "),",
    " 'sites', (SELECT count(*) FROM public.sites WHERE code ~ '^GAP004_E2E_[A-F0-9]{12}$'),",
    " 'statuses', (SELECT json_agg(status) FROM public.staff_invitations",
    "     WHERE auth_user_id IN " + ids + " AND metadata->>'source' = 'GAP-PKG-004-local-e2e')",
    ");",
  ].join("\n");
  const before = JSON.parse(queryLocalDatabase(snapshot));
  console.log("LOCAL_ORPHANED_SYNTHETIC_FIXTURE_COUNTS " + JSON.stringify(before));
  assert.ok(before.auth <= 1 && before.sites <= 1 && before.invites <= 1,
    "Only the exact single synthetic fixture can be targeted for cleanup");
  if (before.auth === 0) {
    assert.equal(before.sites, 0);
    return;
  }
  const dryRun = [
    "BEGIN;",
    "SET LOCAL statement_timeout = '15s';",
    "SET LOCAL session_replication_role = replica;",
    "DELETE FROM public.staff_invitations WHERE auth_user_id IN " + ids +
      " AND metadata->>'source' = 'GAP-PKG-004-local-e2e';",
    "DELETE FROM public.employees WHERE id IN " + ids + ";",
    "DELETE FROM public.employee_sites WHERE employee_id IN " + ids + ";",
    "DELETE FROM public.employee_settings WHERE employee_id IN " + ids + ";",
    "DELETE FROM public.users WHERE id IN " + ids + ";",
    "DELETE FROM public.sites WHERE code ~ '^GAP004_E2E_[A-F0-9]{12}$';",
    "ROLLBACK;",
  ].join("\n");
  // The dry-run must pass before committing the exact same local-only DELETEs.
  queryLocalDatabase(dryRun);
  console.log("LOCAL_SYNTHETIC_CLEANUP_DRY_RUN: PASS");
  const orphanId = queryLocalDatabase(
    "SELECT id::text FROM auth.users WHERE email ~ '" + pattern + "'"
  );
  assert.match(orphanId, /^[a-f0-9-]{36}$/iu);
  queryLocalDatabase(dryRun.replace(/ROLLBACK;$/u, "COMMIT;"));
  console.log("LOCAL_SYNTHETIC_POSTGRESQL_CLEANUP: PASS");

  // Use GoTrue Admin against the exact local origin to revoke sessions and
  // delete its synthetic Auth identity/identities; never mutate hosted Auth.
  const { createClient } = await import("@supabase/supabase-js");
  const localAdmin = createClient("http://127.0.0.1:54321",
    readLocalEdgeSecret("SUPABASE_SERVICE_ROLE_KEY"),
    { auth: { persistSession: false, autoRefreshToken: false } }
  );
  const deleted = await localAdmin.auth.admin.deleteUser(orphanId);
  assert.equal(Boolean(deleted.error), false,
    "Local GoTrue must delete the orphaned synthetic Auth user");

  const after = JSON.parse(queryLocalDatabase(snapshot));
  for (const field of [
    "auth", "profiles", "invites", "employees", "employee_sites",
    "employee_settings", "sites",
  ]) {
    assert.equal(after[field], 0, "Orphaned fixture must leave zero " + field);
  }
  console.log("LOCAL_SYNTHETIC_FIXTURE_CLEANUP_VERIFIED: PASS");
});


// These three tests run the unmodified actual Deno handler bodies in a local
// VM. The adapter captures Supabase calls and intercepts EVERY fetch, so no
// Resend request or hosted data mutation can escape this process.
function makeStaffLifecycleHarness(kind, options = {}) {
  assert.ok(["create", "resend", "cancel"].includes(kind));
  const relative = "supabase/functions/staff-invitations-" + kind + "/index.ts";
  const source = fs.readFileSync(path.join(root, relative), "utf8");
  const { webcrypto } = requireCryptoForLifecycleHarness();
  const actorId = "b0040000-0000-0000-0000-000000000051";
  const userId = "b0040000-0000-0000-0000-000000000052";
  const siteId = "b0040000-0000-0000-0000-000000000053";
  const invitationId = "b0040000-0000-0000-0000-000000000054";
  const email = "gap004-local-lifecycle@example.invalid";
  const actorEmployee = options.actorEmployee === null ? null : {
    id: actorId,
    role: options.actorRole || "gerente",
    site_id: options.actorSite || siteId,
  };
  const initialInvitation = kind === "create" ? null : {
    id: invitationId, email, full_name: "Invitada Local",
    status: options.invitationStatus || "sent",
    resend_count: 0, role_code: "mesero", staff_role: "mesero",
    site_id: options.inviteSite || siteId,
    staff_site_id: options.inviteSite || siteId,
    auth_user_id: userId, employee_id: null,
    updated_at: "2026-10-12T00:00:00.000Z",
    metadata: options.invitationMetadata || {},
  };
  const state = options.sharedState || {
    invitation: initialInvitation,
    mail: [], generatedLinks: [], databaseWrites: [],
    unexpectedOutbound: 0,
  };
  if (!Array.isArray(state.outbox)) state.outbox = [];
  function enqueueDelivery(eventKey, kind) {
    if (state.outbox.some(event => event.event_key === eventKey)) return;
    const id = "b0040000-0000-0000-0000-" +
      String(70 + state.outbox.length).padStart(12, "0");
    state.outbox.push({ id, invitation_id: invitationId,
      event_key: eventKey, kind, delivery_state: "queued" });
  }

  function from(table) {
    const clauses = [];
    let action = "select";
    let payload = null;
    const builder = {
      select() { return this; },
      eq(key, value) { clauses.push([key, value]); return this; },
      or() { return this; },
      order() { return this; },
      limit() { return this; },
      update(patch) { action = "update"; payload = patch; return this; },
      insert(value) { action = "insert"; payload = value; return this; },
      maybeSingle() { return Promise.resolve(run()); },
      single() { return Promise.resolve(run()); },
      then(resolve, reject) { return Promise.resolve(run()).then(resolve, reject); },
    };
    function matched(row) {
      return row && clauses.every(([key, value]) => row[key] === value);
    }
    function run() {
      if (table === "employees") return { data: matched(actorEmployee) ? actorEmployee : null, error: null };
      if (table === "users") {
        const actor = { id: actorId };
        return { data: matched(actor) ? actor : null, error: null };
      }
      if (table === "roles") {
        const role = { code: "mesero", is_active: true };
        return { data: matched(role) && options.roleActive !== false ? role : null, error: null };
      }
      if (table === "sites") {
        const site = { id: siteId, is_active: true };
        return { data: matched(site) && options.siteActive !== false ? site : null, error: null };
      }
      if (table !== "staff_invitations") throw new Error("UNEXPECTED_TABLE " + table);
      if (action === "insert") {
        if (state.invitation) throw new Error("EXPECTED_EMPTY_INVITATION_FOR_INSERT");
        state.invitation = { id: invitationId, updated_at: new Date().toISOString(), ...payload };
        if (payload.status === "sent" && payload.auth_user_id &&
            payload.metadata?.existing_user_flow !== true) {
          enqueueDelivery("initial:" + invitationId, "initial");
        }
        state.databaseWrites.push({ action, table, status: payload.status });
        return { data: { id: invitationId }, error: null };
      }
      if (action === "update") {
        if (!matched(state.invitation) || options.concurrentUpdate ||
            (options.failFinalize && payload.resend_count !== undefined &&
              !payload.metadata?.resend_claim)) {
          return { data: null, error: null };
        }
        const timestamp = payload.updated_at || new Date().toISOString();
        const previousClaim = state.invitation?.metadata?.resend_claim?.id;
        state.invitation = { ...state.invitation, ...payload, updated_at: timestamp };
        const claim = Boolean(payload.metadata?.resend_claim);
        const nextClaim = payload.metadata?.resend_claim?.id;
        if (nextClaim && nextClaim !== previousClaim) {
          enqueueDelivery("resend:" + nextClaim, "resend");
        }
        state.databaseWrites.push({
          action, table, status: payload.status,
          phase: claim ? "reserve" : payload.resend_count !== undefined ? "finish" :
            payload.metadata?.source === "staff-invitations-cancel" ? "cancel" : "release",
        });
        return { data: { id: invitationId, updated_at: timestamp }, error: null };
      }
      if (action === "select") {
        if (clauses.some(([key]) => key === "email")) {
          return { data: matched(state.invitation) ? [state.invitation] : [], error: null };
        }
        return { data: matched(state.invitation) ? state.invitation : null, error: null };
      }
      throw new Error("UNEXPECTED_DB_ACTION " + action);
    }
    return builder;
  }

  const fakeSupabase = {
    auth: {
      async getUser(token) {
        if (token !== "synthetic-actor-token" || options.invalidToken) {
          return { data: null, error: new Error("Rejected fixture token") };
        }
        return { data: { user: { id: actorId, email: "manager@example.invalid" } }, error: null };
      },
      admin: {
        async generateLink(request) {
          state.generatedLinks.push(request);
          if (options.onGeneratedLink) await options.onGeneratedLink(state);
          if (options.linkThrows) throw new Error("Synthetic GoTrue network failure");
          if (options.linkError) {
            return { data: null, error: new Error("Synthetic GoTrue link rejection") };
          }
          if (options.linkAlreadyRegistered) {
            return { data: null, error: new Error("User already been registered") };
          }
          return {
            data: {
              user: { id: userId, email, user_metadata: { full_name: "Invitada Local" } },
              properties: {
                verification_type: "invite",
                hashed_token: "unit-only-hashed-token",
                action_link: "https://example.invalid/auth/verify?type=invite",
              },
            },
            error: null,
          };
        },
      },
    },
    from,
    async rpc(name, args) {
      if (name === "has_unresolved_staff_invitation_delivery_v1") {
        return { data: state.outbox.some(event =>
          event.invitation_id === args.p_invitation_id && (
            ["queued", "in_flight", "uncertain"].includes(event.delivery_state) ||
            (event.kind === "resend" && event.delivery_state === "delivered" &&
              event.event_key === "resend:" +
                (state.invitation?.metadata?.resend_claim?.id ?? ""))
          )), error: null };
      }
      if (name === "claim_staff_invitation_delivery_v1") {
        const event = state.outbox.find(event =>
          event.invitation_id === args.p_invitation_id &&
          event.event_key === args.p_event_key && event.delivery_state === "queued");
        if (!event) return { data: null, error: null };
        event.delivery_state = "in_flight";
        return { data: event.id, error: null };
      }
      if (name === "finish_staff_invitation_delivery_v1") {
        const event = state.outbox.find(event => event.id === args.p_delivery_id);
        if (!event || event.delivery_state !== "in_flight" ||
            !["delivered", "rejected", "uncertain"].includes(args.p_delivery_state)) {
          return { data: false, error: null };
        }
        event.delivery_state = args.p_delivery_state;
        return { data: true, error: null };
      }
      throw new Error("UNEXPECTED_RPC " + name);
    },
  };
  let handler = null;
  const env = {
    SUPABASE_URL: "http://127.0.0.1:54321",
    SUPABASE_SERVICE_ROLE_KEY: "unit-only-not-a-secret",
    SET_PASSWORD_WEB_URL: "https://example.invalid/api/set-password",
    RESEND_API_KEY: "unit-only-not-a-secret",
  };
  const sandbox = {
    serve(callback) { handler = callback; },
    createClient() { return fakeSupabase; },
    Deno: { env: { get(name) { return env[name] ?? null; } } },
    async fetch(url, request) {
      if (url !== "https://api.resend.com/emails") {
        state.unexpectedOutbound++;
        throw new Error("NON_RESEND_OUTBOUND_FORBIDDEN");
      }
      const body = JSON.parse(request.body);
      state.mail.push({ to: body.to, subject: body.subject, html: body.html,
        idempotencyKey: request.headers?.["Idempotency-Key"] ?? null });
      if (options.onMail) await options.onMail(state);
      if (options.mailThrows) throw new Error("Synthetic provider connection lost");
      const status = options.mailStatus ?? (options.mailFailure ? 503 : 200);
      return new Response(status >= 400 ? "Synthetic delivery failure" : "{}", {
        status,
      });
    },
    crypto: webcrypto, AbortSignal, TextEncoder, Uint8Array, Request, Response, Headers, URL, Date,
    console: { error() {} },
  };
  const executable = stripTypeScriptTypes(source, { mode: "strip" }).replace(/^import .*$/gmu, "");
  assert.doesNotMatch(executable, /^import /mu);
  runInNewContext(executable, sandbox, { filename: relative, timeout: 1000 });
  assert.equal(typeof handler, "function");
  return {
    state, actorId, userId, siteId, invitationId, email,
    async invoke(body, token = "synthetic-actor-token") {
      const request = new Request("http://127.0.0.1:54321/functions/v1/staff-invitations-" + kind, {
        method: "POST",
        headers: token ? { Authorization: "Bearer " + token } : {},
        body: JSON.stringify(body),
      });
      const response = await handler(request);
      return { status: response.status, body: await response.json() };
    },
  };
}

function requireCryptoForLifecycleHarness() {
  // The import is intentionally cached per process and never accesses a server.
  return globalThis.__gap004Crypto ?? { webcrypto: globalThis.crypto };
}

test("GAP-PKG-004 actual create handler accepts ANIMA/VISO observed payload shapes with Resend isolated", async () => {
  const clients = [
    { name: "ANIMA", payload: { email: "gap004-local-lifecycle@example.invalid",
      full_name: "Invitada Local", role: "mesero",
      site_id: "b0040000-0000-0000-0000-000000000053" } },
    { name: "VISO", payload: { email: "gap004-local-lifecycle@example.invalid",
      full_name: "Invitada Local", role: "mesero",
      site_id: "b0040000-0000-0000-0000-000000000053", expires_at: undefined } },
  ];
  for (const client of clients) {
    const h = makeStaffLifecycleHarness("create");
    const created = await h.invoke(client.payload);
    assert.equal(created.status, 200, client.name + " create response");
    assert.equal(created.body.invited, true);
    assert.equal(created.body.status, "sent");
    assert.equal(h.state.invitation.status, "sent");
    assert.equal(h.state.invitation.role_code, "mesero");
    assert.equal(h.state.invitation.site_id, h.siteId);
    assert.equal(h.state.invitation.employee_id, null);
    assert.equal(h.state.mail.length, 1);
    assert.deepEqual(JSON.parse(JSON.stringify(h.state.mail[0].to)), [h.email]);
    assert.ok(h.state.mail[0].html.includes("token_hash="));
    assert.equal(h.state.outbox.length, 1);
    assert.equal(h.state.outbox[0].delivery_state, "delivered");
    assert.equal(h.state.mail[0].idempotencyKey, h.state.outbox[0].id,
      "Initial mail uses a durable event identity at the provider");
    assert.equal(h.state.unexpectedOutbound, 0);
    assert.equal(h.state.generatedLinks[0].type, "invite");
    assert.deepEqual(JSON.parse(JSON.stringify(h.state.generatedLinks[0].options.data)),
      { full_name: "Invitada Local" }, "Auth metadata must never contain role/site");
    const duplicate = await h.invoke(client.payload);
    assert.equal(duplicate.status, 200, "Existing successful invitation is idempotent");
    assert.equal(h.state.mail.length, 1, "Creation retry never sends a second email");
    assert.equal(h.state.generatedLinks.length, 1, "Creation retry never invalidates Auth link");
  }
});

test("GAP-PKG-004 create never falsely acknowledges a failed or unresolved invitation after an Auth duplicate race", async () => {
  const cases = [
    { status: "failed", delivery: null, expected: 409 },
    { status: "sent", delivery: "queued", expected: 409 },
    { status: "sent", delivery: "uncertain", expected: 409 },
    { status: "sent", delivery: "delivered", expected: 200 },
  ];
  for (const scenario of cases) {
    const h = makeStaffLifecycleHarness("create", {
      linkAlreadyRegistered: true,
      onGeneratedLink(state) {
        // A concurrent writer persisted the invitation AFTER our initial
        // lookup but BEFORE Auth reported that the email was registered.
        const id = "b0040000-0000-0000-0000-000000000054";
        state.invitation = {
          id, email: "gap004-local-lifecycle@example.invalid",
          status: scenario.status, site_id: "b0040000-0000-0000-0000-000000000053",
          staff_site_id: "b0040000-0000-0000-0000-000000000053",
          auth_user_id: "b0040000-0000-0000-0000-000000000052",
          resend_count: 0, metadata: {},
        };
        if (scenario.delivery) {
          state.outbox.push({
            id: "b0040000-0000-0000-0000-000000000070",
            invitation_id: id, event_key: "initial:" + id,
            kind: "initial", delivery_state: scenario.delivery,
          });
        }
      },
    });
    const response = await h.invoke({
      email: h.email, full_name: "Invitada Local", role: "mesero", site_id: h.siteId,
    });
    assert.equal(response.status, scenario.expected,
      "Duplicate Auth race with invitation " + scenario.status + "/" + scenario.delivery);
    if (scenario.expected === 409) {
      assert.ok(response.body.error, "Unconfirmed delivery must return an explicit error");
      assert.notEqual(response.body.invited, true, "Never claim failed/uncertain mail was sent");
    } else {
      assert.equal(response.body.invited, true, "Confirmed delivery remains idempotent");
      assert.equal(response.body.status, "sent");
    }
    assert.equal(h.state.invitation.status, scenario.status);
    assert.equal(h.state.mail.length, 0, "Retry never contacts a real or mocked provider");
    assert.equal(h.state.unexpectedOutbound, 0);
  }
});

test("GAP-PKG-004 actual resend and cancel handlers enforce states without outbound mail", async () => {
  const sent = makeStaffLifecycleHarness("resend");
  const resent = await sent.invoke({ staff_invitation_id: sent.invitationId });
  assert.equal(resent.status, 200);
  assert.equal(resent.body.status, "sent");
  assert.equal(resent.body.resend_count, 1);
  assert.equal(sent.state.invitation.resend_count, 1);
  assert.equal(sent.state.mail.length, 1, "Resend must call only the injected mock delivery");
  assert.equal(sent.state.outbox.length, 1);
  assert.equal(sent.state.outbox[0].delivery_state, "delivered");
  assert.equal(sent.state.mail[0].idempotencyKey, sent.state.outbox[0].id,
    "Resend must use the existing event identity for provider idempotency");
  assert.equal(sent.state.unexpectedOutbound, 0);
  assert.deepEqual(sent.state.databaseWrites.map(x => x.phase),
    ["reserve", "finish"], "Reservation must persist before delivery completion");
  assert.equal(sent.state.invitation.metadata.resend_claim, undefined,
    "Reservation is removed after a completed resend");

  for (const status of ["cancelled", "accepted", "linked_existing_user"]) {
    const r = makeStaffLifecycleHarness("resend", { invitationStatus: status });
    const response = await r.invoke({ staff_invitation_id: r.invitationId });
    assert.equal(response.status, 409);
    assert.equal(r.state.mail.length, 0);
    assert.equal(r.state.generatedLinks.length, 0);
  }
  const forbidden = makeStaffLifecycleHarness("resend", { actorSite: "other-site" });
  assert.equal((await forbidden.invoke({ staff_invitation_id: forbidden.invitationId })).status, 403);
  assert.equal(forbidden.state.mail.length, 0);

  const c = makeStaffLifecycleHarness("cancel");
  const cancelled = await c.invoke({ staff_invitation_id: c.invitationId });
  assert.equal(cancelled.status, 200);
  assert.equal(cancelled.body.status, "cancelled");
  assert.equal(c.state.invitation.status, "cancelled");
  assert.equal(c.state.mail.length, 0);
  assert.equal((await c.invoke({ staff_invitation_id: c.invitationId })).status, 200,
    "Repeated cancellation must be idempotent");
  const protectedAccepted = makeStaffLifecycleHarness("cancel", { invitationStatus: "accepted" });
  assert.equal((await protectedAccepted.invoke({ staff_invitation_id: protectedAccepted.invitationId })).status, 409);
  const otherSite = makeStaffLifecycleHarness("cancel", { actorSite: "other-site" });
  assert.equal((await otherSite.invoke({ staff_invitation_id: otherSite.invitationId })).status, 403);
  assert.equal(otherSite.state.invitation.status, "sent");
});

test("GAP-PKG-004 actual create and resend handlers fail closed on delivery and CAS conflicts", async () => {
  const unsent = makeStaffLifecycleHarness("create", { mailFailure: true });
  const failed = await unsent.invoke({
    email: unsent.email, full_name: "Invitada Local", role: "mesero", site_id: unsent.siteId,
  });
  assert.equal(failed.status, 502);
  assert.equal(unsent.state.invitation.status, "sent",
    "Provider 503 is uncertain and must not be reported as a definitive rejection");
  assert.equal(unsent.state.mail.length, 1);
  assert.equal(unsent.state.outbox[0].delivery_state, "uncertain");
  const duplicateCreate = await unsent.invoke({
    email: unsent.email, full_name: "Invitada Local", role: "mesero", site_id: unsent.siteId,
  });
  assert.equal(duplicateCreate.status, 409, "An unresolved initial event must not send again");
  assert.equal(unsent.state.mail.length, 1);
  assert.equal(unsent.state.generatedLinks.length, 1,
    "An uncertain invitation has generated only the original Auth link");
  const stale = makeStaffLifecycleHarness("resend", { concurrentUpdate: true });
  const result = await stale.invoke({ staff_invitation_id: stale.invitationId });
  assert.equal(result.status, 409, "Resend CAS protects persisted invitation state");
  assert.equal(stale.state.invitation.resend_count, 0);
  assert.equal(stale.state.mail.length, 0,
    "CAS loss must prevent every email-provider request");
  assert.equal(stale.state.generatedLinks.length, 0,
    "A failed reservation must not even create an Auth link");
  assert.equal(stale.state.databaseWrites.length, 0);
  const cancelRace = makeStaffLifecycleHarness("cancel", { concurrentUpdate: true });
  const cancelResult = await cancelRace.invoke({ staff_invitation_id: cancelRace.invitationId });
  assert.equal(cancelResult.status, 409);
  assert.equal(cancelRace.state.invitation.status, "sent");
  assert.equal(cancelRace.state.mail.length, 0);
});



test("GAP-PKG-004 resend CAS claim serializes concurrent cancellation and duplicate send", async () => {
  const h = makeStaffLifecycleHarness("resend", {
    onMail: async state => {
      assert.equal(state.databaseWrites[0]?.phase, "reserve",
        "Reservation must be persisted before contacting Resend");
      assert.ok(state.invitation.metadata?.resend_claim?.id);
      const cancel = makeStaffLifecycleHarness("cancel", { sharedState: state });
      const result = await cancel.invoke({ staff_invitation_id: cancel.invitationId });
      assert.equal(result.status, 409,
        "A cancellation must not overtake an in-flight resend");
      const repeated = makeStaffLifecycleHarness("resend", { sharedState: state });
      const second = await repeated.invoke({ staff_invitation_id: repeated.invitationId });
      assert.equal(second.status, 409,
        "An active claim must block duplicate delivery");
      assert.equal(state.mail.length, 1);
    },
  });
  const result = await h.invoke({ staff_invitation_id: h.invitationId });
  assert.equal(result.status, 200);
  assert.equal(h.state.invitation.status, "sent");
  assert.equal(h.state.invitation.resend_count, 1);
  assert.equal(h.state.invitation.metadata.resend_claim, undefined);
  const after = makeStaffLifecycleHarness("cancel", { sharedState: h.state });
  assert.equal((await after.invoke({ staff_invitation_id: after.invitationId })).status, 200,
    "Cancellation remains possible after resend completes");
  assert.equal(h.state.invitation.status, "cancelled");
});

test("GAP-PKG-004 resend preserves uncertain delivery without replay or cancellation", async () => {
  const h = makeStaffLifecycleHarness("resend", { mailFailure: true });
  const result = await h.invoke({ staff_invitation_id: h.invitationId });
  assert.equal(result.status, 502, "Failed provider delivery does not count as sent");
  assert.equal(h.state.invitation.resend_count, 0);
  assert.equal(h.state.invitation.status, "sent");
  assert.ok(h.state.invitation.metadata.resend_claim,
    "Uncertain delivery retains the reservation until reconciliation");
  assert.deepEqual(h.state.databaseWrites.map(x => x.phase), ["reserve"]);
  assert.equal(h.state.mail.length, 1, "Provider request remained local and intercepted");
  assert.equal(h.state.outbox[0].delivery_state, "uncertain");
  const repeated = makeStaffLifecycleHarness("resend", { sharedState: h.state });
  assert.equal((await repeated.invoke({ staff_invitation_id: repeated.invitationId })).status, 409);
  assert.equal(h.state.mail.length, 1, "An uncertain event must not send twice");
  const cancel = makeStaffLifecycleHarness("cancel", { sharedState: h.state });
  assert.equal((await cancel.invoke({ staff_invitation_id: cancel.invitationId })).status, 409,
    "Uncertain delivery must be reconciled before cancellation");
});

test("GAP-PKG-004 mail accepted before a failed invitation CAS stays blocked after lease expiry", async () => {
  const accepted = makeStaffLifecycleHarness("resend", { failFinalize: true });
  const result = await accepted.invoke({ staff_invitation_id: accepted.invitationId });
  assert.equal(result.status, 409, "Provider accepted mail but invitation finalization failed");
  assert.equal(accepted.state.mail.length, 1);
  assert.equal(accepted.state.outbox.length, 1);
  assert.equal(accepted.state.outbox[0].delivery_state, "delivered");
  assert.ok(accepted.state.invitation.metadata?.resend_claim?.id);

  // Simulate a crash recovered long after the CAS lease expired.
  accepted.state.invitation.metadata.resend_claim.expires_at =
    new Date(Date.now() - 3600000).toISOString();
  const repeated = makeStaffLifecycleHarness("resend", { sharedState: accepted.state });
  const retryResult = await repeated.invoke({ staff_invitation_id: repeated.invitationId });
  assert.equal(retryResult.status, 409);
  assert.equal(accepted.state.mail.length, 1,
    "Confirmed delivery with unfinalized invitation must never regenerate a token or email");
  assert.equal(accepted.state.generatedLinks.length, 1);
  const cancelled = makeStaffLifecycleHarness("cancel", { sharedState: accepted.state });
  assert.equal((await cancelled.invoke({ staff_invitation_id: cancelled.invitationId })).status, 409,
    "An unfinalized confirmed delivery requires manual state reconciliation");
});

test("GAP-PKG-004 provider rejection and connection loss have distinct outbox states", async () => {
  const initialRejected = makeStaffLifecycleHarness("create", { mailStatus: 400 });
  const initialResult = await initialRejected.invoke({
    email: initialRejected.email, full_name: "Invitada Local",
    role: "mesero", site_id: initialRejected.siteId,
  });
  assert.equal(initialResult.status, 500);
  assert.equal(initialRejected.state.invitation.status, "failed");
  assert.equal(initialRejected.state.outbox[0].delivery_state, "rejected");

  const resendRejected = makeStaffLifecycleHarness("resend", { mailStatus: 400 });
  const refused = await resendRejected.invoke({ staff_invitation_id: resendRejected.invitationId });
  assert.equal(refused.status, 502);
  assert.equal(resendRejected.state.invitation.metadata.resend_claim, undefined);
  assert.equal(resendRejected.state.outbox[0].delivery_state, "rejected");
  assert.equal(resendRejected.state.mail.length, 1);
  const cancel = makeStaffLifecycleHarness("cancel", { sharedState: resendRejected.state });
  assert.equal((await cancel.invoke({ staff_invitation_id: cancel.invitationId })).status, 200,
    "A definitive rejection can release its reservation and allow cancellation");

  const networkLost = makeStaffLifecycleHarness("resend", { mailThrows: true });
  assert.equal((await networkLost.invoke({ staff_invitation_id: networkLost.invitationId })).status, 502);
  assert.equal(networkLost.state.outbox[0].delivery_state, "uncertain");
  const retry = makeStaffLifecycleHarness("resend", { sharedState: networkLost.state });
  assert.equal((await retry.invoke({ staff_invitation_id: retry.invitationId })).status, 409);
  assert.equal(networkLost.state.mail.length, 1, "Unknown deliveries are never retried blindly");
});

test("GAP-PKG-004 active and expired resend claims have distinct cancellation outcomes", async () => {
  const active = {
    resend_claim: { id: "synthetic-claim", expires_at: new Date(Date.now() + 30_000).toISOString() },
  };
  const blocked = makeStaffLifecycleHarness("cancel", { invitationMetadata: active });
  assert.equal((await blocked.invoke({ staff_invitation_id: blocked.invitationId })).status, 409);
  assert.equal(blocked.state.invitation.status, "sent");
  const noDuplicate = makeStaffLifecycleHarness("resend", { invitationMetadata: active });
  assert.equal((await noDuplicate.invoke({ staff_invitation_id: noDuplicate.invitationId })).status, 409);
  assert.equal(noDuplicate.state.mail.length, 0);
  assert.equal(noDuplicate.state.generatedLinks.length, 0);
  const expired = {
    resend_claim: { id: "expired-claim", expires_at: new Date(Date.now() - 120_000).toISOString() },
  };
  const released = makeStaffLifecycleHarness("cancel", { invitationMetadata: expired });
  assert.equal((await released.invoke({ staff_invitation_id: released.invitationId })).status, 200);
  assert.equal(released.state.invitation.status, "cancelled");
});

test("GAP-PKG-004 cancellation during Auth link generation respects the persisted claim", async () => {
  const h = makeStaffLifecycleHarness("resend", {
    onGeneratedLink: async state => {
      assert.equal(state.databaseWrites[0]?.phase, "reserve",
        "Auth token must be generated only after the CAS reservation");
      const cancel = makeStaffLifecycleHarness("cancel", { sharedState: state });
      const blocked = await cancel.invoke({ staff_invitation_id: cancel.invitationId });
      assert.equal(blocked.status, 409, "Cannot cancel during Auth link generation");
      assert.equal(state.mail.length, 0);
    },
  });
  const result = await h.invoke({ staff_invitation_id: h.invitationId });
  assert.equal(result.status, 200);
  assert.equal(h.state.invitation.status, "sent");
  assert.equal(h.state.mail.length, 1);
});

test("GAP-PKG-004 failed Auth link generation releases reservation without sending mail", async () => {
  for (const [config, expected] of [[{ linkError: true }, 400], [{ linkThrows: true }, 502]]) {
    const h = makeStaffLifecycleHarness("resend", config);
    const result = await h.invoke({ staff_invitation_id: h.invitationId });
    assert.equal(result.status, expected);
    assert.equal(h.state.invitation.resend_count, 0);
    assert.equal(h.state.invitation.metadata.resend_claim, undefined);
    assert.deepEqual(h.state.databaseWrites.map(x => x.phase), ["reserve", "release"]);
    assert.equal(h.state.mail.length, 0);
  }
});

test("GAP-PKG-004 cleanup synthetic cancelled invitation residue only", () => {
  assert.match(config, /^project_id\s*=\s*"vento-shell"/m);
  // Previous local E2E cancellation replaces metadata.source, so cleanup
  // must use the exact reserved synthetic email, not the old source value.
  const predicate = [
    "email ~ '^gap004-invite-[a-f0-9]{32}@example[.]invalid$'",
    "status = 'cancelled'",
    "metadata->>'source' = 'staff-invitations-cancel'",
    "auth_user_id IS NULL",
    "employee_id IS NULL",
  ].join(" AND ");
  const before = Number(queryLocalDatabase(
    "SELECT count(*) FROM public.staff_invitations WHERE " + predicate + ";"
  ));
  assert.ok(Number.isInteger(before) && before >= 0 && before <= 1,
    "Only one specifically identified synthetic invitation can be cleaned");
  if (before) {
    queryLocalDatabase([
      "BEGIN;",
      "SET LOCAL statement_timeout = '15s';",
      "DELETE FROM public.staff_invitations WHERE " + predicate + ";",
      "COMMIT;",
    ].join("\n"));
  }
  assert.equal(Number(queryLocalDatabase(
    "SELECT count(*) FROM public.staff_invitations WHERE " + predicate + ";"
  )), 0);
});

test("GAP-PKG-004 real manager cancel and no-email sender rejection", async () => {
  assert.match(config, /^project_id\s*=\s*"vento-shell"/m);
  const { createClient } = await import("@supabase/supabase-js");
  const { randomUUID } = await import("node:crypto");
  const rootUrl = "http://127.0.0.1:54321";
  const admin = createClient(rootUrl, readLocalEdgeSecret("SUPABASE_SERVICE_ROLE_KEY"), {
    auth: { persistSession: false, autoRefreshToken: false },
  });
  const client = createClient(rootUrl, readLocalEdgeSecret("SUPABASE_ANON_KEY"), {
    auth: { persistSession: false, autoRefreshToken: false },
  });
  const rand = randomUUID().replace(/-/gu, "");
  const siteId = randomUUID();
  const invitationId = randomUUID();
  const siteCode = "GAP004_E2E_" + rand.slice(0, 12).toUpperCase();
  const email = "gap004-e2e-" + rand + "@example.invalid";
  const invitedEmail = "gap004-invite-" + rand + "@example.invalid";
  const password = "LocalManage004-" + randomUUID();
  const allowedUuid = x => {
    assert.match(x, /^[a-f0-9-]{36}$/iu);
    return "'" + x + "'::uuid";
  };
  const siteSQL = allowedUuid(siteId);
  const inviteSQL = allowedUuid(invitationId);
  let managerId = null;
  let attemptedSite = false;
  let attemptedInvitation = false;
  const cleanupFaults = [];
  let verified = false;

  function localCounts() {
    const actor = managerId ? allowedUuid(managerId) : "NULL::uuid";
    const sql = [
      "SELECT json_build_object(",
      " 'sites', (SELECT count(*) FROM public.sites WHERE id = " + siteSQL + "),",
      " 'invitations', (SELECT count(*) FROM public.staff_invitations WHERE id = " + inviteSQL + "),",
      " 'invitation_status', (SELECT status FROM public.staff_invitations WHERE id = " + inviteSQL + "),",
      " 'employees', (SELECT count(*) FROM public.employees WHERE id = " + actor + "),",
      " 'employee_sites', (SELECT count(*) FROM public.employee_sites WHERE employee_id = " + actor + "),",
      " 'employee_settings', (SELECT count(*) FROM public.employee_settings WHERE employee_id = " + actor + "),",
      " 'auth', (SELECT count(*) FROM auth.users WHERE id = " + actor + "),",
      " 'profiles', (SELECT count(*) FROM public.users WHERE id = " + actor + ")",
      ");",
    ].join("\n");
    return JSON.parse(queryLocalDatabase(sql));
  }
  try {
    attemptedSite = true;
    queryLocalDatabase([
      "INSERT INTO public.sites(id,code,name,type,site_kind,site_type,is_active,operational_visibility)",
      "VALUES (" + siteSQL + ", '" + siteCode + "', 'GAP004 Local E2E Manager',",
      " 'satellite', 'operational', 'satellite', true, 'operational');",
    ].join("\n"));

    const result = await admin.auth.admin.createUser({
      email, password, email_confirm: true,
      user_metadata: { full_name: "Synthetic Local Manager" },
    });
    assert.equal(Boolean(result.error), false, "Local GoTrue createUser must succeed");
    managerId = result.data?.user?.id ?? null;
    assert.ok(managerId && /^[a-f0-9-]{36}$/iu.test(managerId));
    const actorSQL = allowedUuid(managerId);

    queryLocalDatabase([
      "INSERT INTO public.employees(id,full_name,role,site_id,is_active)",
      "VALUES (" + actorSQL + ", 'Synthetic Local Manager', 'gerente', " + siteSQL + ", true);",
    ].join("\n"));

    attemptedInvitation = true;
    queryLocalDatabase([
      "INSERT INTO public.staff_invitations(",
      " id,email,full_name,staff_role,role_code,staff_site_id,site_id,status,invited_at,expires_at,metadata",
      ") VALUES (" + inviteSQL + ", '" + invitedEmail + "', 'Synthetic Invitee',",
      " 'mesero','mesero'," + siteSQL + "," + siteSQL + ",",
      " 'sent', now(), now() + interval '1 day',",
      " '{\"source\":\"GAP-PKG-004-manager-e2e\"}'::jsonb);",
    ].join("\n"));
    assert.equal(localCounts().invitation_status, "sent");

    const session = await client.auth.signInWithPassword({ email, password });
    assert.equal(Boolean(session.error), false, "Local manager Auth must succeed");
    const token = session.data?.session?.access_token;
    assert.ok(typeof token === "string" && token.length > 50);

    async function call(handlerName, body) {
      assert.ok(["staff-invitations-create","staff-invitations-cancel","staff-invitations-resend"]
        .includes(handlerName));
      const response = await fetch(rootUrl + "/functions/v1/" + handlerName, {
        method: "POST",
        headers: { Authorization: "Bearer " + token, "Content-Type": "application/json" },
        body: JSON.stringify(body), redirect: "manual", signal: AbortSignal.timeout(16000),
      });
      return { status: response.status, body: await response.json() };
    }
    // Creation is checked only with deliberately incomplete input, so no
    // Auth invitation is generated and no outbound email is even attempted.
    const incomplete = await call("staff-invitations-create", {});
    assert.equal(incomplete.status, 400);
    assert.equal(incomplete.body.error, "Missing fields");
    assert.equal(localCounts().invitation_status, "sent");

    const unknown = await call("staff-invitations-resend", { staff_invitation_id: randomUUID() });
    assert.equal(unknown.status, 404);
    // Prove the LIVE local Edge code sees an active resend reservation.
    // No provider request is made in this test.
    const claimExpiry = new Date(Date.now() + 60_000).toISOString();
    queryLocalDatabase([
      "UPDATE public.staff_invitations SET metadata = jsonb_build_object(",
      " 'source','GAP-PKG-004-manager-e2e',",
      " 'resend_claim',jsonb_build_object('id','synthetic-local-claim',",
      " 'expires_at','" + claimExpiry + "')), updated_at = now()",
      " WHERE id = " + inviteSQL + " AND email = '" + invitedEmail + "' AND status = 'sent';",
    ].join("\n"));
    const inFlightCancel = await call("staff-invitations-cancel",
      { staff_invitation_id: invitationId });
    assert.equal(inFlightCancel.status, 409,
      "LIVE Edge must refuse cancellation while a resend claim is active");
    assert.equal(localCounts().invitation_status, "sent");
    queryLocalDatabase([
      "UPDATE public.staff_invitations SET",
      " metadata = '{\"source\":\"GAP-PKG-004-manager-e2e\"}'::jsonb,",
      " updated_at = now() WHERE id = " + inviteSQL +
      " AND email = '" + invitedEmail + "' AND status = 'sent';",
    ].join("\n"));

    const outboxInstalled = queryLocalDatabase(
      "SELECT to_regprocedure('public.has_unresolved_staff_invitation_delivery_v1(uuid)') IS NOT NULL;"
    ) === "t";
    const cancelled = await call("staff-invitations-cancel", { staff_invitation_id: invitationId });
    if (outboxInstalled) {
      assert.equal(cancelled.status, 200, "Migrated local Edge cancellation must succeed");
      assert.equal(cancelled.body.status, "cancelled");
      assert.equal(localCounts().invitation_status, "cancelled");
      const repeated = await call("staff-invitations-cancel", { staff_invitation_id: invitationId });
      assert.equal(repeated.status, 200, "Cancellation must be idempotent");
      const blocked = await call("staff-invitations-resend", { staff_invitation_id: invitationId });
      assert.equal(blocked.status, 409, "No resend for a cancelled invitation");
      assert.equal(localCounts().invitation_status, "cancelled");
    } else {
      // LOCAL main intentionally has not replayed the forward candidate.
      // Never fake the outbox RPC, disable its guard or reset the valuable DB.
      assert.equal(cancelled.status, 409,
        "Pre-migration Edge must fail closed rather than bypass absent outbox RPC");
      assert.equal(localCounts().invitation_status, "sent",
        "Pre-migration guard does not mutate the synthetic invitation");
    }
    verified = true;
  } finally {
    if (attemptedSite || attemptedInvitation) {
      try {
        const actor = managerId ? allowedUuid(managerId) : "NULL::uuid";
        queryLocalDatabase([
          "BEGIN;",
          "SET LOCAL statement_timeout = '15s';",
          "SET LOCAL session_replication_role = replica;",
          "DELETE FROM public.staff_invitations WHERE id = " + inviteSQL +
            " AND email = '" + invitedEmail + "';",
          "DELETE FROM public.employees WHERE id = " + actor +
            " AND site_id = " + siteSQL + ";",
          "DELETE FROM public.employee_sites WHERE employee_id = " + actor +
            " AND site_id = " + siteSQL + ";",
          "DELETE FROM public.employee_settings WHERE employee_id = " + actor + ";",
          "DELETE FROM public.users WHERE id = " + actor +
            " AND email = '" + email + "';",
          "DELETE FROM public.sites WHERE id = " + siteSQL +
            " AND code = '" + siteCode + "';",
          "COMMIT;",
        ].join("\n"));
      } catch {
        cleanupFaults.push("postgresql_synthetic_manager_cleanup");
      }
    }
    if (managerId) {
      try {
        const deleted = await admin.auth.admin.deleteUser(managerId);
        if (deleted.error) cleanupFaults.push("gotrue_synthetic_manager_cleanup");
      } catch {
        cleanupFaults.push("gotrue_synthetic_manager_cleanup");
      }
    }
    try {
      const after = localCounts();
      for (const k of [
        "sites","invitations","employees","employee_sites",
        "employee_settings","auth","profiles",
      ]) if (after[k] !== 0) cleanupFaults.push("residual_" + k);
    } catch {
      cleanupFaults.push("synthetic_manager_residual_check");
    }
    assert.deepEqual(cleanupFaults, [],
      "Local synthetic manager must leave zero database/Auth residues");
  }
  assert.equal(verified, true, "Local manager Edge cancel/create/resend guards must complete");
});

test("GAP-PKG-004 read-only historical invitation reconciliation reports aggregate counts", () => {
  assert.match(config, /^project_id\s*=\s*"vento-shell"/m);
  const summary = JSON.parse(queryLocalDatabase([
    "WITH invitation AS (",
    " SELECT i.*, COALESCE(i.site_id, i.staff_site_id) AS effective_site,",
    " COALESCE(i.role_code, i.staff_role) AS effective_role",
    " FROM public.staff_invitations i",
    "), by_status AS (",
    " SELECT status, count(*)::int AS n FROM invitation GROUP BY status",
    "), stats AS (",
    " SELECT count(*)::int AS total,",
    " count(*) FILTER (WHERE status = 'sent' AND expires_at <= now())::int AS sent_expired,",
    " count(*) FILTER (WHERE role_code IS NOT NULL AND staff_role IS NOT NULL",
    "     AND role_code <> staff_role)::int AS role_inconsistent,",
    " count(*) FILTER (WHERE site_id IS NOT NULL AND staff_site_id IS NOT NULL",
    "     AND site_id <> staff_site_id)::int AS site_inconsistent,",
    " count(*) FILTER (WHERE status = 'sent' AND auth_user_id IS NOT NULL",
    "     AND NOT EXISTS (SELECT 1 FROM auth.users a WHERE a.id = invitation.auth_user_id))::int AS sent_orphan_auth,",
    " count(*) FILTER (WHERE status = 'sent' AND auth_user_id IS NOT NULL",
    "     AND EXISTS (SELECT 1 FROM public.employees e",
    "       WHERE e.id = invitation.auth_user_id AND e.is_active IS TRUE))::int AS sent_preactivated_employee,",
    " count(*) FILTER (WHERE status IN ('accepted','linked_existing_user')",
    "     AND (employee_id IS NULL OR NOT EXISTS (SELECT 1 FROM public.employees e",
    "       WHERE e.id = invitation.employee_id AND e.is_active IS TRUE)))::int AS completed_missing_active_employee,",
    " count(*) FILTER (WHERE status IN ('accepted','linked_existing_user')",
    "     AND (employee_id IS NULL OR NOT EXISTS (SELECT 1 FROM public.employee_sites es",
    "       WHERE es.employee_id = invitation.employee_id",
    "         AND es.site_id = invitation.effective_site",
    "         AND es.is_primary IS TRUE AND es.is_active IS TRUE)))::int AS completed_missing_primary_site,",
    " count(*) FILTER (WHERE status = 'cancelled' AND employee_id IS NOT NULL",
    "     AND EXISTS (SELECT 1 FROM public.employees e",
    "       WHERE e.id = invitation.employee_id AND e.is_active IS TRUE))::int AS cancelled_has_active_employee",
    " FROM invitation",
    ") SELECT row_to_json(result) FROM (",
    " SELECT stats.*, COALESCE((SELECT json_object_agg(status, n) FROM by_status), '{}'::json)",
    " AS by_status FROM stats",
    ") AS result;",
  ].join("\n")));
  assert.equal(typeof summary.total, "number");
  const sum = Object.values(summary.by_status).reduce((acc, n) => acc + Number(n), 0);
  assert.equal(sum, summary.total, "Historic status counts must reconcile to total");
  const anomalies = [
    "sent_expired", "role_inconsistent", "site_inconsistent",
    "sent_orphan_auth", "sent_preactivated_employee",
    "completed_missing_active_employee", "completed_missing_primary_site",
    "cancelled_has_active_employee",
  ];
  for (const k of anomalies) {
    assert.ok(Number.isInteger(summary[k]) && summary[k] >= 0,
      "Historical reconciliation metric must be a nonnegative aggregate: " + k);
  }
  // Aggregate-only; NEVER output invitation IDs, staff names or email addresses.
  console.log("GAP004_HISTORICAL_INVITATION_RECONCILIATION " + JSON.stringify(summary));
});

test("GAP-PKG-004 inspects the local VISO permission catalog for HTTP QA without mutation", (t) => {
  // Metadata-only LOCAL query; no user rows, secrets, personal data, or writes.
  const permissions = JSON.parse(queryLocalDatabase([
    "SELECT json_build_object(",
    " 'role_cajero', EXISTS(SELECT 1 FROM public.roles WHERE code='cajero' AND is_active IS TRUE),",
    " 'viso_access', EXISTS(SELECT 1 FROM public.app_permissions p",
    "   JOIN public.apps a ON a.id=p.app_id WHERE a.code='viso' AND p.code='access'),",
    " 'viso_staff_read', EXISTS(SELECT 1 FROM public.app_permissions p",
    "   JOIN public.apps a ON a.id=p.app_id WHERE a.code='viso' AND p.code='staff.read'),",
    " 'viso_workforce_employees_view', EXISTS(SELECT 1 FROM public.app_permissions p",
    "   JOIN public.apps a ON a.id=p.app_id WHERE a.code='viso' AND p.code='workforce.employees.view'),",
    " 'viso_staff_manage', EXISTS(SELECT 1 FROM public.app_permissions p",
    "   JOIN public.apps a ON a.id=p.app_id WHERE a.code='viso' AND p.code='staff.manage')",
    ");",
  ].join("\n"))) as Record<string, boolean>;
  for (const value of Object.values(permissions)) {
    assert.equal(typeof value, "boolean", "Catalog lookup must return booleans only");
  }
  assert.equal(permissions.role_cajero, true, "Scenario role must exist in LOCAL catalog");
  assert.equal(permissions.viso_access, true, "Required app.access must exist locally");
  assert.equal(permissions.viso_staff_manage, true, "Legacy manage regression must remain available");
  console.log("GAP004_LOCAL_VISO_PERMISSION_CATALOG " + JSON.stringify(permissions));
  // Database metadata only: determine the physical insertion contract before a
  // governed catalog migration. No employee rows, secrets, grants or mutations.
  const columns = JSON.parse(queryLocalDatabase([
    "SELECT COALESCE(json_agg(json_build_object(",
    "  'column', column_name, 'type', data_type, 'nullable', is_nullable,",
    "  'default', column_default) ORDER BY ordinal_position), '[]'::json)",
    "FROM information_schema.columns",
    "WHERE table_schema='public' AND table_name='app_permissions';",
  ].join("\n"))) as Array<{
    column: string; type: string; nullable: string; default: string | null;
  }>;
  const constraints = JSON.parse(queryLocalDatabase([
    "SELECT COALESCE(json_agg(json_build_object(",
    "  'name', conname, 'rule', pg_get_constraintdef(oid))), '[]'::json)",
    "FROM pg_constraint WHERE conrelid='public.app_permissions'::regclass;",
  ].join("\n"))) as Array<{ name: string; rule: string }>;
  assert.ok(columns.some((column) => column.column === 'code'));
  assert.ok(columns.some((column) => column.column === 'app_id'));
  console.log("GAP004_LOCAL_PERMISSION_SCHEMA " + JSON.stringify({ columns, constraints }));
  // An absent runtime read permission blocks authenticated staff-page QA.
  // Normalization plans do not create physical permissions or authorize fallback to manage.
  if (!permissions.viso_workforce_employees_view) {
    t.skip("GAP004_LOCAL_CANONICAL_STAFF_VIEW_PERMISSION_NOT_REGISTERED");
  }
});

test("GAP-PKG-004 VISO canonical read permission registers with zero grants in a LOCAL rollback", () => {
  const section = /\bDO \$gap_pkg_004_viso_workforce_catalog\$[\s\S]*?\$gap_pkg_004_viso_workforce_catalog\$;/iu
    .exec(forwardMigration)?.[0];
  assert.ok(section, "The governed single forward migration must register canonical VISO permission");
  assert.doesNotMatch(section, /\bGRANT\s+\w+\s+ON\b/iu,
    "Catalog registration may not expand SQL object privileges");
  assert.doesNotMatch(section, /\bINSERT\s+INTO\s+public\.(?:role_permissions|employee_permissions)\b/iu,
    "Catalog registration must never assign permissions to actors or roles");

  const snapshotQuery = [
    "SELECT json_build_object(",
    " 'canonical', EXISTS (SELECT 1 FROM public.app_permissions p",
    "  JOIN public.apps a ON a.id=p.app_id",
    "  WHERE a.code='viso' AND p.code='workforce.employees.view'),",
    " 'legacy', EXISTS (SELECT 1 FROM public.app_permissions p",
    "  JOIN public.apps a ON a.id=p.app_id",
    "  WHERE a.code='viso' AND p.code='staff.read'),",
    " 'role_grants', (SELECT count(*)::int FROM public.role_permissions rp",
    "  JOIN public.app_permissions p ON p.id=rp.permission_id",
    "  JOIN public.apps a ON a.id=p.app_id",
    "  WHERE a.code='viso' AND p.code='workforce.employees.view'),",
    " 'employee_grants', (SELECT count(*)::int FROM public.employee_permissions ep",
    "  JOIN public.app_permissions p ON p.id=ep.permission_id",
    "  JOIN public.apps a ON a.id=p.app_id",
    "  WHERE a.code='viso' AND p.code='workforce.employees.view')",
    ");",
  ].join("\n");
  const before = JSON.parse(queryLocalDatabase(snapshotQuery)) as {
    canonical: boolean; legacy: boolean; role_grants: number; employee_grants: number;
  };
  assert.equal(before.legacy, false, "The historical alias cannot exist in LOCAL");
  if (before.canonical) {
    // After a controlled replay the canonical permission is already present.
    // Never re-run an insert or automatically revoke future legitimate grants.
    assert.equal(before.role_grants, 0, "Initial catalog registration must not assign role grants");
    assert.equal(before.employee_grants, 0, "Initial catalog registration must not assign employee grants");
    return;
  }
  const inside = JSON.parse(queryLocalDatabase([
    "BEGIN;",
    "SET LOCAL lock_timeout='2s';",
    "SET LOCAL statement_timeout='10s';",
    section,
    snapshotQuery,
    "ROLLBACK;",
  ].join("\n")));
  assert.deepEqual(inside, {
    canonical: true, legacy: false, role_grants: 0, employee_grants: 0,
  }, "Candidate migration must register only the canonical permission");
  assert.deepEqual(JSON.parse(queryLocalDatabase(snapshotQuery)), before,
    "The SQL proof must leave LOCAL Postgres unchanged");
});
