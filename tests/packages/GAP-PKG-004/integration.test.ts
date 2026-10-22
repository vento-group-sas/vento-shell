import assert from 'node:assert/strict';
import { spawnSync } from 'node:child_process';
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import test from 'node:test';
import { fileURLToPath } from 'node:url';
import {
  QA_ISOLATED_PROFILES,
  buildIsolatedQaTemplatePatchSQL,
  buildIsolatedQaVisualTemplateFixtureSQL,
  resolveIsolatedQaDatabaseContainer,
  runIsolatedQaPreflight,
} from '../../../scripts/quality/supabase-db-harness.mjs';

const root = fileURLToPath(new URL('../../../', import.meta.url));
const sql = fs.readFileSync(path.join(root, 'supabase/tests/packages/GAP-PKG-004.sql'), 'utf8');
const migration = fs.readFileSync(
  path.join(root, 'supabase/migrations/20261012173553_gap_pkg_004_rpc_acl_hardening.sql'), 'utf8',
);
const completionMarker = '-- GAP-PKG-004 / INVITATION_COMPLETION';
const completionSql = migration.slice(
  migration.indexOf(completionMarker), migration.lastIndexOf('commit;'),
);
assert.ok(migration.includes(completionMarker) && completionSql.includes('complete_staff_invitation_v1'));

// Transactional ANIMA attendance probe against the existing isolated GAP-004
// Supabase QA container. Never use supabase_db_vento-shell or a hosted project.
test('GAP-PKG-004 isolated attendance replay and GPS denial preserve all fixtures', async () => {
  const { randomUUID } = await import('node:crypto');
  const profile = QA_ISOLATED_PROFILES['GAP-PKG-004'];
  assert.equal(profile.project, 'vento-shell-gap-pkg-004-qa');
  const dockerRun = (command, args) => {
    assert.equal(command, 'docker');
    const r = spawnSync(command, args, {
      cwd: root, encoding: 'utf8', windowsHide: true, timeout: 15000,
    });
    assert.ifError(r.error);
    assert.equal(r.status, 0, 'Isolated QA Docker identity preflight failed');
    return r.stdout.trim();
  };
  const container = resolveIsolatedQaDatabaseContainer(dockerRun, profile, root);
  const queryQa = (sqlText) => {
    assert.ok(sqlText.startsWith('SELECT ') || sqlText.startsWith('BEGIN;'));
    const r = spawnSync('docker', [
      'exec', '-i', container, 'psql', '--username', 'postgres',
      '--dbname', 'postgres', '--no-psqlrc', '--tuples-only', '--no-align',
      '--quiet', '--set', 'ON_ERROR_STOP=1',
    ], { cwd: root, input: sqlText, encoding: 'utf8', timeout: 45000, windowsHide: true });
    assert.ifError(r.error);
    assert.equal(r.status, 0, 'Isolated QA SQL assertion failed: ' + String(r.stderr).slice(0, 950));
    return r.stdout.trim();
  };
  const actor = randomUUID();
  const outsider = randomUUID();
  const site = randomUUID();
  const eventIn = 'gap004-in-' + randomUUID().replace(/-/gu, '');
  const eventOut = 'gap004-out-' + randomUUID().replace(/-/gu, '');
  const tag = randomUUID().replace(/-/gu, '').slice(0, 18);
  const snapshotSql = [
    "SELECT json_build_object(",
    " 'auth',(SELECT count(*) FROM auth.users WHERE id='" + actor + "'::uuid),",
    " 'sites',(SELECT count(*) FROM public.sites WHERE id='" + site + "'::uuid),",
    " 'employees',(SELECT count(*) FROM public.employees WHERE id='" + actor + "'::uuid),",
    " 'memberships',(SELECT count(*) FROM public.employee_sites WHERE employee_id='" + actor + "'::uuid),",
    " 'logs',(SELECT count(*) FROM public.attendance_logs WHERE employee_id='" + actor + "'::uuid),",
    " 'conflicts',(SELECT count(*) FROM public.attendance_sync_conflicts WHERE employee_id='" + actor + "'::uuid)",
    ");",
  ].join('\n');
  const before = JSON.parse(queryQa(snapshotSql));
  assert.ok(Object.values(before).every((v) => v === 0), 'Synthetic QA identities must not already exist');
  const transaction = [
    'BEGIN;',
    "SET LOCAL statement_timeout = '20s';",
    "INSERT INTO auth.users(id,email) VALUES ('" + actor + "'::uuid, 'gap004-" + tag + "@example.invalid');",
    "INSERT INTO public.sites(id,code,name,type,site_kind,is_active,latitude,longitude)",
    "VALUES ('" + site + "'::uuid, 'GAP004_ATT_" + tag.toUpperCase() + "',",
    "'GAP004 Isolated Attendance', 'satellite', 'satellite', true, 7.9, -72.5);",
    "INSERT INTO public.employees(id,site_id,role,full_name,is_active)",
    "VALUES ('" + actor + "'::uuid, '" + site + "'::uuid, 'mesero', 'GAP004 QA Employee', true);",
    // public.employees already provisions its primary employee_sites link via trigger.
    // Do not insert a duplicate membership fixture.
    'SET LOCAL ROLE authenticated;',
    "SET LOCAL request.jwt.claim.sub = '" + actor + "';",
    'DO $gap004_attendance_qa$',
    'DECLARE event jsonb; first_result text; replay_result text;',
    'BEGIN',
    " event := jsonb_build_object('eventId','" + eventIn + "',",
    "   'eventType','check_in','siteId','" + site + "','source','mobile',",
    "   'geoSnapshot',jsonb_build_object('lat',7.9,'lng',-72.5,'accuracy',5));",
    ' SELECT r.result INTO first_result FROM public.sync_attendance_events(jsonb_build_array(event)) r;',
    " IF first_result <> 'applied' THEN RAISE EXCEPTION 'GAP004_CHECKIN_FAILED:%',first_result; END IF;",
    ' SELECT r.result INTO replay_result FROM public.sync_attendance_events(jsonb_build_array(event)) r;',
    " IF replay_result NOT IN ('duplicate','conflict') THEN",
    "   RAISE EXCEPTION 'GAP004_REPLAY_UNEXPECTED:%',replay_result; END IF;",
    " PERFORM set_config('qa.gap004_in',json_build_object('first',first_result,",
    "   'replay',replay_result)::text,true);",
    'END;',
    '$gap004_attendance_qa$;',
    'RESET ROLE;',
    // Postgres now() is transaction-stable. Distinguish synthetic check-in
    // timestamps before checking the next action in this same transaction.
    "UPDATE public.attendance_logs SET occurred_at=now()-interval '5 minutes',",
    " created_at=now()-interval '5 minutes' WHERE employee_id='" + actor + "'::uuid;",
    'SET LOCAL ROLE authenticated;',
    "SET LOCAL request.jwt.claim.sub = '" + actor + "';",
    'DO $gap004_checkout_qa$',
    'DECLARE event jsonb; refused text; successful text; replay text;',
    'BEGIN',
    " event := jsonb_build_object('eventId','" + eventOut + "',",
    "   'eventType','check_out','siteId','" + site + "','source','mobile',",
    "   'geoSnapshot',jsonb_build_object('lat',7.9,'lng',-72.5,'accuracy',5));",
    " SELECT r.result INTO refused FROM public.sync_attendance_events(jsonb_build_array(event-'geoSnapshot')) r;",
    " IF refused IN ('applied','duplicate') OR refused IS NULL THEN",
    "   RAISE EXCEPTION 'GAP004_GPS_DENIAL_BYPASSED:%',refused; END IF;",
    ' SELECT r.result INTO successful FROM public.sync_attendance_events(jsonb_build_array(event)) r;',
    " IF successful <> 'applied' THEN RAISE EXCEPTION 'GAP004_CHECKOUT_FAILED:%',successful; END IF;",
    ' SELECT r.result INTO replay FROM public.sync_attendance_events(jsonb_build_array(event)) r;',
    " IF replay NOT IN ('duplicate','conflict') THEN",
    "   RAISE EXCEPTION 'GAP004_CHECKOUT_REPLAY_UNEXPECTED:%',replay; END IF;",
    " PERFORM set_config('qa.gap004_out',json_build_object(",
    "   'gps_denied',refused,'checkout',successful,'replay',replay)::text,true);",
    'END;',
    '$gap004_checkout_qa$;',
    "SET LOCAL request.jwt.claim.sub = '" + outsider + "';",
    'DO $gap004_unauthorized_qa$',
    'BEGIN',
    " BEGIN",
    "  PERFORM public.sync_attendance_events('[]'::jsonb);",
    "  RAISE EXCEPTION 'GAP004_FOREIGN_IDENTITY_WAS_ALLOWED';",
    ' EXCEPTION WHEN OTHERS THEN',
    "  IF SQLERRM='GAP004_FOREIGN_IDENTITY_WAS_ALLOWED' THEN RAISE; END IF;",
    ' END;',
    'END;',
    '$gap004_unauthorized_qa$;',
    'RESET ROLE;',
    "SELECT json_build_object('check_in',current_setting('qa.gap004_in')::json,",
    " 'check_out',current_setting('qa.gap004_out')::json,",
    " 'logs',(SELECT count(*) FROM public.attendance_logs WHERE employee_id='" + actor + "'::uuid),",
    " 'events',(SELECT count(DISTINCT client_event_id) FROM public.attendance_logs",
    "            WHERE employee_id='" + actor + "'::uuid),",
    " 'event_match',(SELECT bool_and((action='check_in' AND client_event_id='" + eventIn + "')",
    "             OR (action='check_out' AND client_event_id='" + eventOut + "'))",
    "             FROM public.attendance_logs WHERE employee_id='" + actor + "'::uuid)",
    ");",
    'ROLLBACK;',
  ].join('\n');
  let observed;
  try {
    observed = JSON.parse(queryQa(transaction));
  } finally {
    assert.deepEqual(JSON.parse(queryQa(snapshotSql)), before,
      'Isolated SQL transaction must leave ZERO synthetic attendance data');
  }
  assert.equal(observed.check_in.first, 'applied');
  assert.ok(['conflict', 'duplicate'].includes(observed.check_in.replay));
  assert.notEqual(observed.check_out.gps_denied, 'applied');
  assert.equal(observed.check_out.checkout, 'applied');
  assert.ok(['conflict', 'duplicate'].includes(observed.check_out.replay));
  assert.equal(observed.logs, 2);
  assert.equal(observed.events, 2);
  assert.equal(observed.event_match, true);
  // Only synthetic result codes: never log employee identities or database credentials.
  console.log('GAP004_ISOLATED_ATTENDANCE_RESULT: ' + JSON.stringify({
    check_in: observed.check_in.first,
    check_in_replay: observed.check_in.replay,
    no_gps: observed.check_out.gps_denied,
    check_out: observed.check_out.checkout,
    check_out_replay: observed.check_out.replay,
    persisted_rows_inside_transaction: observed.logs,
    residual_rows_after_rollback: 0,
  }));
});

function mailpitLocalHosts() {
  const interfaces = Object.values(os.networkInterfaces()).flatMap((entries) => entries ?? []);
  const privateAddresses = interfaces.filter(({ address, family, internal }) => {
    if (family !== 'IPv4' || internal) return false;
    const octets = address.split('.').map(Number);
    if (octets.length !== 4 || octets.some((value) => !Number.isInteger(value) || value < 0 || value > 255)) {
      return false;
    }
    return octets[0] === 10 ||
      (octets[0] === 172 && octets[1] >= 16 && octets[1] <= 31) ||
      (octets[0] === 192 && octets[1] === 168);
  }).map(({ address }) => address);
  // Only loopback or private IPv4 addresses assigned to this exact local host.
  const candidates = [...new Set(['127.0.0.1', ...privateAddresses])];
  const configured = process.env.GAP_PKG_004_MAILPIT_HOST?.trim();
  assert.ok(!configured || candidates.includes(configured),
    'Mailpit host override must be loopback or a private IPv4 address on this machine');
  return configured ? [configured] : candidates;
}

async function resolveLocalMailpit() {
  const config = fs.readFileSync(path.join(root, 'supabase/config.toml'), 'utf8');
  assert.match(config, /^project_id\s*=\s*"vento-shell"/mu, 'Wrong local Supabase project');
  const section = config.split('[local_smtp]')[1]?.split(/\n\[/u)[0] ?? '';
  assert.match(section, /^enabled\s*=\s*true\s*$/mu, 'Local SMTP sandbox must be enabled');
  assert.match(section, /^port\s*=\s*54324\s*$/mu, 'Unexpected local Mailpit port');
  const candidates = mailpitLocalHosts();
  for (const host of candidates) {
    const base = new URL('http://' + host + ':54324/api/v1/');
    try {
      const response = await fetch(new URL('info', base), {
        method: 'GET', redirect: 'manual', signal: AbortSignal.timeout(2500),
      });
      if (response.status !== 200) continue;
      const info = await response.json();
      // Refuse to send synthetic mail to an unrelated service on a local interface.
      if (info && typeof info === 'object' &&
          typeof info.Version === 'string' &&
          typeof info.Database === 'string' &&
          typeof info.Messages === 'number') {
        return { base, info };
      }
    } catch {
      // Docker/WSL can accept TCP on loopback and then abort the HTTP connection.
    }
  }
  assert.fail('No verified Mailpit API on the local port 54324; tested: ' + candidates.join(', '));
}

test('GAP-PKG-004 Mailpit local sandbox exposes its read-only API', async () => {
  const { base, info } = await resolveLocalMailpit();
  assert.equal(base.port, '54324');
  assert.match(info.Version, /^v\d+\./u);
  assert.ok(info.Messages >= 0);
  // Only health metadata is checked; no mailbox messages or credentials are printed.
});

test('GAP-PKG-004 Mailpit captures and removes one synthetic email without relay', async () => {
  const { base } = await resolveLocalMailpit();
  assert.equal(base.port, '54324');
  const { randomUUID } = await import('node:crypto');
  const nonce = randomUUID().replace(/-/gu, '');
  const to = 'gap004-mailpit-' + nonce + '@example.invalid';
  const subject = 'GAP-PKG-004 local Mailpit synthetic ' + nonce.slice(0, 12);

  async function search() {
    const url = new URL('search', base);
    url.searchParams.set('query', 'to:' + to);
    const response = await fetch(url, { method: 'GET', redirect: 'manual',
      signal: AbortSignal.timeout(8000) });
    assert.equal(response.status, 200, 'Mailpit search must be local and healthy');
    const results = await response.json();
    assert.ok(Array.isArray(results.messages), 'Mailpit search must return messages array');
    return results.messages.filter(m => m?.Subject === subject);
  }
  assert.equal((await search()).length, 0, 'Synthetic address must be unused');
  let sent = false;
  try {
    const url = new URL('send', base);
    const response = await fetch(url, {
      method: 'POST', headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        From: { Email: 'gap004-sandbox@example.invalid', Name: 'GAP004 Local' },
        To: [{ Email: to }],
        Subject: subject,
        Text: 'Synthetic GAP-PKG-004 local Mailpit sink validation',
      }),
      redirect: 'manual', signal: AbortSignal.timeout(8000),
    });
    assert.equal(response.status, 200, 'Local Mailpit must capture the synthetic message');
    sent = true;
    const matches = await search();
    assert.equal(matches.length, 1, 'Exactly one local synthetic email must be captured');
    assert.match(String(matches[0]?.ID || ''), /^[A-Za-z0-9]+$/u);
    const detail = await fetch(new URL('message/' + matches[0].ID, base), {
      method: 'GET', redirect: 'manual', signal: AbortSignal.timeout(8000),
    });
    assert.equal(detail.status, 200);
    const body = await detail.json();
    assert.equal(body.Subject, subject);
  } finally {
    // Only one exact synthetic recipient/subject is eligible for cleanup.
    // Mailpit's DELETE with an empty IDs array would delete ALL messages.
    const matches = await search();
    assert.ok(matches.length <= 1, 'Refuse broad Mailpit cleanup');
    for (const candidate of matches) {
      const id = candidate?.ID;
      assert.match(String(id || ''), /^[A-Za-z0-9]+$/u);
      const deletion = await fetch(new URL('messages', base), {
        method: 'DELETE', headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ IDs: [id] }),
        redirect: 'manual', signal: AbortSignal.timeout(8000),
      });
      assert.equal(deletion.status, 200, 'Only the synthetic message may be deleted');
    }
    assert.equal((await search()).length, 0, 'Synthetic Mailpit residue must be zero');
  }
  assert.equal(sent, true);
});

test('GAP-PKG-004 validates the forward candidate and 100 pgTAP assertions in a rollback-only local transaction', () => {
  assert.match(fs.readFileSync(path.join(root, 'supabase/config.toml'), 'utf8'), /^project_id\s*=\s*"vento-shell"/m);
  const result = spawnSync('docker', [
    'exec', '-i', 'supabase_db_vento-shell', 'psql', '--username', 'postgres',
    '--dbname', 'postgres', '--no-psqlrc', '--tuples-only', '--no-align',
    '--quiet', '--set', 'ON_ERROR_STOP=1',
  ], {
    cwd: root,
    // The new forward migration is not yet replayed locally. Inspect its exact
    // service-only RPC fragment inside a rollback-only transaction so tests
    // exercise the candidate without persisting DDL before the clean reset.
    input: 'BEGIN;\n' + completionSql + '\n' +
      sql.replace(/^\s*BEGIN;\s*/u, '').replace(/ROLLBACK;\s*$/u, '') +
      '\nROLLBACK;\n',
    encoding: 'utf8', timeout: 120000, windowsHide: true,
  });
  assert.ifError(result.error);
  assert.equal(result.status, 0, result.stderr);
  const output = (result.stdout || '').trim();
  assert.doesNotMatch(output, /^(?:not ok\b|Bail out!)/m);
  assert.match(output, /^1\.\.100$/m);
  const assertions = [...output.matchAll(/^ok (\d+) - /gm)];
  assert.equal(assertions.length, 100, output);
  assert.deepEqual(assertions.map((match) => Number(match[1])), Array.from({length: 100}, (_, index) => index + 1));
});

test('GAP-PKG-004 preserves VISO template and permission-catalog consumer queries under security_invoker', () => {
  assert.match(fs.readFileSync(path.join(root, 'supabase/config.toml'), 'utf8'),
    /^project_id\s*=\s*"vento-shell"/m);
  const result = spawnSync('docker', [
    'exec', '-i', 'supabase_db_vento-shell', 'psql', '--username', 'postgres',
    '--dbname', 'postgres', '--no-psqlrc', '--tuples-only', '--no-align',
    '--quiet', '--set', 'ON_ERROR_STOP=1',
  ], {
    cwd: root,
    // The candidate is applied only inside a transaction. Postgres closes
    // the connection and rolls back even if a permission error aborts psql.
    input: [
      'BEGIN;',
      completionSql,
      'SET LOCAL ROLE authenticated;',
      'SELECT id,code,label,description,device_type,default_app_code,',
      '  requires_actor_pin,requires_active_actor_shift,allow_actor_without_pin,',
      '  allow_actions_without_actor,app_codes,actor_policies,sort_order,is_active',
      '  FROM public.shared_operational_device_templates_admin_v1',
      '  WHERE is_active = true ORDER BY sort_order ASC LIMIT 0;',
      'RESET ROLE;',
      // The roles-and-permissions page uses a server-only service_role client,
      // never the authenticated browser client, for the human catalog.
      'SET LOCAL ROLE service_role;',
      'SELECT id,app_code,code,label,description,group_label,',
      '  permission_audience,is_operational,requires_active_work_context,',
      '  human_sort_order,is_active,is_human_configured',
      '  FROM public.permission_catalog_human_v1',
      '  WHERE is_active = true AND is_human_configured = true',
      '  ORDER BY app_code,human_sort_order,code LIMIT 0;',
      "SELECT count(*) FROM public.permission_catalog_human_v1",
      " WHERE app_code='viso' AND code='workforce.employees.view'",
      " AND is_active=true AND is_human_configured=true;",
      'RESET ROLE;',
      'ROLLBACK;',
    ].join('\n'),
    encoding: 'utf8', timeout: 120000, windowsHide: true,
  });
  assert.ifError(result.error);
  assert.equal(result.status, 0, result.stderr || result.stdout);
  assert.equal(result.stdout.trim(), '1',
    'The canonical VISO workforce read permission must be visible to the server-only catalog consumer');
});

test('GAP-PKG-004 inventories the effective RLS and grants of administrative view dependencies', () => {
  const result = spawnSync('docker', [
    'exec', '-i', 'supabase_db_vento-shell', 'psql', '--username', 'postgres',
    '--dbname', 'postgres', '--no-psqlrc', '--tuples-only', '--no-align',
    '--quiet', '--set', 'ON_ERROR_STOP=1',
  ], {
    cwd: root,
    input: [
      'BEGIN;',
      completionSql,
      "WITH targets AS (",
      " SELECT c.oid, c.relname FROM pg_class c JOIN pg_namespace n ON n.oid=c.relnamespace",
      " WHERE n.nspname='public' AND c.relname IN (",
      " 'permission_catalog_human_v1','shared_operational_device_actor_policies_admin_v1',",
      " 'shared_operational_device_templates_admin_v1','shared_operational_devices_admin_v1')",
      "), referenced AS (",
      " SELECT DISTINCT ON (t.relname, d.refobjid)",
      " t.relname AS view_name, d.refobjid::regclass::text AS base_name,",
      " cl.relrowsecurity AS rls,",
      " has_table_privilege('authenticated',d.refobjid,'SELECT') AS authenticated_select,",
      " has_table_privilege('service_role',d.refobjid,'SELECT') AS service_select,",
      " (SELECT json_agg(json_build_object('name',policyname,'roles',roles,'qual',left(qual,180)))",
      " FROM pg_policies pol WHERE pol.schemaname=ns.nspname AND pol.tablename=cl.relname) AS policies",
      " FROM targets t JOIN pg_rewrite rw ON rw.ev_class=t.oid AND rw.rulename='_RETURN'",
      " JOIN pg_depend d ON d.objid=rw.oid AND d.refclassid='pg_class'::regclass",
      " JOIN pg_class cl ON cl.oid=d.refobjid",
      " JOIN pg_namespace ns ON ns.oid=cl.relnamespace",
      " WHERE d.refobjid<>t.oid AND cl.relkind IN ('r','p','v')",
      ") SELECT coalesce(json_agg(row_to_json(referenced)),'[]'::json) FROM referenced;",
      'ROLLBACK;',
    ].join('\n'),
    encoding: 'utf8', timeout: 120000, windowsHide: true,
  });
  assert.ifError(result.error);
  assert.equal(result.status, 0, result.stderr || result.stdout);
  const metadata = JSON.parse(result.stdout.trim()) as Array<{
    view_name: string; base_name: string; rls: boolean;
    authenticated_select: boolean; service_select: boolean;
    policies: Array<{name: string}> | null;
  }>;
  assert.deepEqual([...new Set(metadata.map(item => item.view_name))].sort(), [
    'permission_catalog_human_v1', 'shared_operational_device_actor_policies_admin_v1',
    'shared_operational_device_templates_admin_v1', 'shared_operational_devices_admin_v1',
  ]);
  assert.ok(metadata.length >= 4, 'Each administrative view must depend on protected base relations');
  assert.ok(metadata.every(item => item.rls && item.service_select),
    'All referenced base relations must preserve RLS and server-side SELECT permissions');
  const templateBases = metadata.filter(item =>
    item.view_name === 'shared_operational_device_templates_admin_v1');
  assert.ok(templateBases.length > 0 &&
    templateBases.every(item => item.authenticated_select),
    'The existing VISO authenticated template consumer requires base-table SELECT rights');
  const devices = metadata.find(item =>
    item.view_name === 'shared_operational_devices_admin_v1' &&
    item.base_name === 'shared_operational_devices');
  assert.ok(devices?.policies?.some(policy => policy.name === 'shared_operational_devices_select_own'),
    'The device administration view must retain its owner-filtered source RLS');
});

test('GAP-PKG-004 validates the isolated QA preparation SQL with a forced ROLLBACK', async (t) => {
  const qa = await runIsolatedQaPreflight();
  assert.equal(qa.target, 'VERIFIED');
  assert.equal(qa.qaResidualCounts, '0|0|0|0');
  if (qa.templateRls.ready) {
    t.skip('Isolated QA already has the candidate policies and admin view settings');
    return;
  }
  assert.equal(qa.templateRls.restrictivePolicies, 0);
  assert.equal(qa.templateRls.invokerViews, 0);
  assert.equal(qa.templateRls.staffManage, false);

  const patch = buildIsolatedQaTemplatePatchSQL(migration);
  assert.equal([...patch.matchAll(/^COMMIT;$/gmu)].length, 1);
  assert.ok(patch.indexOf('RAISE EXCEPTION') < patch.lastIndexOf('COMMIT;'));
  // Test the exact generated SQL on verified isolated QA, but replace its
  // ONLY final COMMIT with ROLLBACK. Never persist fixtures or schema.
  const rollbackOnly = patch.replace(/^COMMIT;\s*$/mu, 'ROLLBACK;');
  assert.match(rollbackOnly, /^ROLLBACK;$/mu);
  assert.doesNotMatch(rollbackOnly, /^COMMIT;$/mu);

  const docker = (command, args) => {
    assert.equal(command, 'docker');
    const result = spawnSync(command, args, {
      cwd: root, encoding: 'utf8', windowsHide: true,
      timeout: 30000,
    });
    assert.ifError(result.error);
    assert.equal(result.status, 0, result.stderr || result.stdout);
    return result.stdout.trim();
  };
  const container = resolveIsolatedQaDatabaseContainer(
    docker, QA_ISOLATED_PROFILES['GAP-PKG-004'], root,
  );
  const result = spawnSync('docker', [
    'exec', '-i', container, 'psql', '-X', '-w', '-q', '-A', '-t',
    '-v', 'ON_ERROR_STOP=1', '-U', 'postgres', '-d', 'postgres',
  ], {
    cwd: root, input: rollbackOnly, encoding: 'utf8',
    windowsHide: true, timeout: 120000, maxBuffer: 1024 * 1024,
  });
  assert.ifError(result.error);
  assert.equal(result.status, 0, result.stderr || result.stdout);
  assert.equal(result.stdout.trim(), '3|4|1');

  const after = await runIsolatedQaPreflight();
  assert.equal(after.target, 'VERIFIED');
  assert.equal(after.qaResidualCounts, '0|0|0|0');
  assert.equal(after.templateRls.restrictivePolicies, 0);
  assert.equal(after.templateRls.invokerViews, 0);
  assert.equal(after.templateRls.staffManage, false);
});

test('GAP-PKG-004 visual template fixture seeds and cleans inside one QA ROLLBACK',async(t)=>{
  const qa=await runIsolatedQaPreflight();
  assert.equal(qa.target,'VERIFIED');
  assert.equal(qa.templateRls.ready,true);
  assert.equal(qa.qaResidualCounts,'0|0|0|0');
  if (qa.templateRls.activeTemplates!==0) {
    t.skip('Verified QA currently contains active templates; no foreign fixture changes');
    return;
  }
  const seed=buildIsolatedQaVisualTemplateFixtureSQL('seed');
  const cleanup=buildIsolatedQaVisualTemplateFixtureSQL('cleanup');
  assert.equal([...seed.matchAll(/^COMMIT;$/gmu)].length,1);
  assert.equal([...cleanup.matchAll(/^COMMIT;$/gmu)].length,1);
  const sql=seed.replace(/^COMMIT;$/mu,'')+'\n'+
    cleanup.replace(/^BEGIN;$/mu,'').replace(/^COMMIT;$/mu,'ROLLBACK;');
  assert.doesNotMatch(sql,/^COMMIT;$/mu);
  assert.match(sql,/^ROLLBACK;$/mu);
  const dockerRun=(command,args)=>{
    assert.equal(command,'docker');
    const result=spawnSync('docker',args,{
      cwd:root,encoding:'utf8',windowsHide:true,timeout:30000,
    });
    assert.ifError(result.error);
    assert.equal(result.status,0,result.stderr||result.stdout);
    return result.stdout.trim();
  };
  const container=resolveIsolatedQaDatabaseContainer(
    dockerRun,QA_ISOLATED_PROFILES['GAP-PKG-004'],root);
  const actual=spawnSync('docker',[
    'exec','-i',container,'psql','-X','-w','-q','-A','-t',
    '-v','ON_ERROR_STOP=1','-U','postgres','-d','postgres',
  ],{cwd:root,input:sql,encoding:'utf8',windowsHide:true,
    timeout:120000,maxBuffer:1024*1024});
  assert.ifError(actual.error);
  assert.equal(actual.status,0,actual.stderr||actual.stdout);
  assert.equal(actual.stdout.trim().replace(/\r\n/gu,'\n'),'1\n0');
  const after=await runIsolatedQaPreflight();
  assert.equal(after.templateRls.activeTemplates,0);
  assert.equal(after.qaResidualCounts,'0|0|0|0');
  assert.equal(after.templateRls.ready,true);
});

test('GAP-PKG-004 replays template RLS in isolated QA exclusively inside ROLLBACK', async () => {
  const qa = await runIsolatedQaPreflight();
  assert.equal(qa.target, 'VERIFIED');
  assert.equal(qa.qaResidualCounts, '0|0|0|0');
  assert.equal(qa.templateRls.rlsTables, 3);
  assert.equal(typeof qa.templateRls.invoker, 'boolean');
  assert.equal(qa.templateRls.authenticatedGrant, true);
  assert.equal(qa.templateRls.anonGrant, false);
  assert.ok(qa.templateRls.ready || qa.templateRls.restrictivePolicies === 0,
    'Refuse partially replayed template policies in isolated QA');

  const sectionStart = migration.indexOf('-- H-CODE-017-009:');
  const sectionEnd = migration.indexOf('do $gap004_admin_views_postflight$', sectionStart);
  assert.ok(sectionStart >= 0 && sectionEnd > sectionStart);
  const policySql = migration.slice(sectionStart, sectionEnd);
  assert.deepEqual(
    [...policySql.matchAll(/create policy (gap_pkg_004_[a-z_]+)\s/giu)].map(m => m[1]),
    [
      'gap_pkg_004_templates_manage_read',
      'gap_pkg_004_template_apps_manage_read',
      'gap_pkg_004_template_actor_policies_manage_read',
    ],
  );
  assert.doesNotMatch(policySql, /\b(?:commit|rollback|truncate|drop)\b/iu);
  const viewStatements = [...migration.matchAll(
    /^alter view public\.(\w+) set \(security_invoker = true\);$/gmu,
  )].map(match => ({name:match[1],sql:match[0]}));
  assert.deepEqual(viewStatements.map(item => item.name), [
    'permission_catalog_human_v1',
    'shared_operational_device_actor_policies_admin_v1',
    'shared_operational_device_templates_admin_v1',
    'shared_operational_devices_admin_v1',
  ]);

  function docker(args, input) {
    const result = spawnSync('docker', args, {
      cwd: root, input, encoding: 'utf8', windowsHide: true,
      timeout: 120000, maxBuffer: 1024 * 1024,
    });
    assert.ifError(result.error);
    assert.equal(result.status, 0, result.stderr || result.stdout);
    return result.stdout.trim();
  }
  const container = resolveIsolatedQaDatabaseContainer(
    (command, args) => {
      assert.equal(command, 'docker');
      return docker(args);
    },
    QA_ISOLATED_PROFILES['GAP-PKG-004'], root,
  );
  const psql = [
    'exec', '-i', container, 'psql', '-U', 'postgres', '-d', 'postgres',
    '-X', '-w', '-q', '-A', '-t', '-v', 'ON_ERROR_STOP=1',
  ];
  // Reuse the deterministic synthetic identities of the package; this
  // test targets ONLY the Docker container verified by the QA profile.
  const site = 'b0040000-0000-0000-0000-000000000160';
  const manager = 'b0040000-0000-0000-0000-000000000161';
  const reader = 'b0040000-0000-0000-0000-000000000165';
  const template = 'b0040000-0000-0000-0000-000000000166';
  const policyCount = "(SELECT count(*) FROM pg_catalog.pg_policies WHERE schemaname='public'" +
    " AND permissive='RESTRICTIVE' AND policyname IN (" +
    "'gap_pkg_004_templates_manage_read','gap_pkg_004_template_apps_manage_read'," +
    "'gap_pkg_004_template_actor_policies_manage_read'))";
  const transaction = [
    'BEGIN;',
    "SET LOCAL lock_timeout='2s';",
    "SET LOCAL statement_timeout='15s';",
    'INSERT INTO public.sites (id,code,name,type,site_kind,site_type,is_active,operational_visibility)',
    "VALUES ('" + site + "','GAP004_RLS_DEVICE','GAP004 QA Device','satellite','operational','satellite',true,'operational');",
    'INSERT INTO auth.users (instance_id,id,aud,role,email,encrypted_password,email_confirmed_at,created_at,updated_at)',
    "VALUES ('00000000-0000-0000-0000-000000000000','" + manager + "','authenticated','authenticated','gap004-rls-manager@example.invalid','',now(),now(),now()),",
    "('00000000-0000-0000-0000-000000000000','" + reader + "','authenticated','authenticated','gap004-rls-reader@example.invalid','',now(),now(),now());",
    'INSERT INTO public.employees (id,full_name,role,site_id,is_active,joined_at,updated_at)',
    "VALUES ('" + manager + "','GAP004 RLS Manager','cajero','" + site + "',true,now(),now()),",
    "('" + reader + "','GAP004 RLS Reader','cajero','" + site + "',true,now(),now());",
    'INSERT INTO public.employee_sites (employee_id,site_id,is_primary,is_active)',
    "VALUES ('" + manager + "','" + site + "',true,true),",
    "('" + reader + "','" + site + "',true,true)",
    'ON CONFLICT (employee_id,site_id) DO UPDATE SET is_active=true,is_primary=true;',
    'INSERT INTO public.shared_operational_device_templates (id,code,label,default_app_code,is_active)',
    "VALUES ('" + template + "','GAP004_QA_TEMPLATE','GAP004 QA Template','viso',true);",
    'INSERT INTO public.shared_operational_device_template_apps (template_id,app_code,is_default,is_active)',
    "VALUES ('" + template + "','viso',true,true);",
    // The stale isolated stack lacks staff.manage in app_permissions.
    // The fixture adds it transactionally; no canonical catalog edit survives.
    'INSERT INTO public.app_permissions (app_id,code,name,is_active,permission_audience,is_operational,requires_active_work_context)',
    "SELECT id,'staff.manage','GAP004 RLS TEMP STAFF MANAGE',true,'administrative',false,false",
    " FROM public.apps a WHERE a.code='viso'",
    " AND NOT EXISTS (SELECT 1 FROM public.app_permissions p WHERE p.app_id=a.id AND p.code='staff.manage');",
    'INSERT INTO public.employee_permissions (employee_id,permission_id,is_allowed,scope_type,scope_site_id)',
    "SELECT '" + manager + "'::uuid,p.id,true,'site','" + site + "'::uuid",
    " FROM public.app_permissions p JOIN public.apps a ON a.id=p.app_id",
    " WHERE a.code='viso' AND p.code='staff.manage';",
    'INSERT INTO public.app_permissions (app_id,code,name,is_active,permission_audience,is_operational,requires_active_work_context)',
    "SELECT id,'access','GAP004 RLS TEMP ACCESS',true,'administrative',false,false",
    " FROM public.apps a WHERE a.code='viso'",
    " AND NOT EXISTS (SELECT 1 FROM public.app_permissions p WHERE p.app_id=a.id AND p.code='access');",
    'INSERT INTO public.employee_permissions (employee_id,permission_id,is_allowed,scope_type,scope_site_id)',
    "SELECT '" + reader + "'::uuid,p.id,true,'site','" + site + "'::uuid",
    " FROM public.app_permissions p JOIN public.apps a ON a.id=p.app_id",
    " WHERE a.code='viso' AND p.code='access';",
    "SELECT json_build_object('phase','catalog',",
    "'manage_permission',(SELECT count(*) FROM public.app_permissions p JOIN public.apps a ON a.id=p.app_id",
    " WHERE a.code='viso' AND p.code='staff.manage' AND p.is_active),",
    "'manager_grant',(SELECT count(*) FROM public.employee_permissions ep WHERE ep.employee_id='" + manager + "'::uuid),",
    "'manager_membership',(SELECT count(*) FROM public.employee_sites WHERE employee_id='" + manager + "'::uuid AND is_active));",
    'SET LOCAL ROLE authenticated;',
    "SET LOCAL request.jwt.claim.sub='" + reader + "';",
    "SELECT json_build_object('phase','before','view',",
    "(SELECT count(*) FROM public.shared_operational_device_templates_admin_v1 WHERE id='" + template + "'),",
    "'raw',(SELECT count(*) FROM public.shared_operational_device_templates WHERE id='" + template + "'),",
    "'has_access',public.has_permission('viso.access','" + site + "'::uuid),",
    "'has_manage',public.has_permission('viso.staff.manage','" + site + "'::uuid));",
    'RESET ROLE;',
    ...(qa.templateRls.invoker ? [] : viewStatements.map(item => item.sql)),
    ...(qa.templateRls.restrictivePolicies === 3 ? [] : [policySql]),
    "SELECT json_build_object('phase','policies','count'," + policyCount + ");",
    'SET LOCAL ROLE authenticated;',
    "SET LOCAL request.jwt.claim.sub='" + manager + "';",
    "SELECT json_build_object('phase','manager','view',",
    "(SELECT count(*) FROM public.shared_operational_device_templates_admin_v1 WHERE id='" + template + "'),",
    "'raw',(SELECT count(*) FROM public.shared_operational_device_templates WHERE id='" + template + "'),",
    "'apps',(SELECT count(*) FROM public.shared_operational_device_template_apps WHERE template_id='" + template + "'),",
    "'has_manage',public.has_permission('viso.staff.manage','" + site + "'::uuid));",
    "SET LOCAL request.jwt.claim.sub='" + reader + "';",
    "SELECT json_build_object('phase','reader','view',",
    "(SELECT count(*) FROM public.shared_operational_device_templates_admin_v1 WHERE id='" + template + "'),",
    "'raw',(SELECT count(*) FROM public.shared_operational_device_templates WHERE id='" + template + "'),",
    "'apps',(SELECT count(*) FROM public.shared_operational_device_template_apps WHERE template_id='" + template + "'),",
    "'has_access',public.has_permission('viso.access','" + site + "'::uuid),",
    "'has_manage',public.has_permission('viso.staff.manage','" + site + "'::uuid));",
    'RESET ROLE;',
    'SET LOCAL ROLE service_role;',
    "SELECT json_build_object('phase','service','view',",
    "(SELECT count(*) FROM public.shared_operational_device_templates_admin_v1 WHERE id='" + template + "'));",
    'RESET ROLE;',
    'ROLLBACK;',
  ].join('\n');
  const lines = docker(psql, transaction).split(/\r?\n/u).filter(Boolean).map(JSON.parse);
  assert.deepEqual(lines, [
    {phase:'catalog',manage_permission:1,manager_grant:1,manager_membership:1},
    {phase:'before',view:qa.templateRls.invoker && qa.templateRls.restrictivePolicies === 3 ? 0 : 1,
      raw:qa.templateRls.restrictivePolicies === 3 ? 0 : 1,has_access:true,has_manage:false},
    {phase:'policies',count:3},
    {phase:'manager',view:1,raw:1,apps:1,has_manage:true},
    {phase:'reader',view:0,raw:0,apps:0,has_access:true,has_manage:false},
    {phase:'service',view:1},
  ]);

  // A separate connection proves no schema/fixture persisted after ROLLBACK.
  const after = docker(psql, [
    'BEGIN READ ONLY;',
    "SELECT json_build_object('policies'," + policyCount + ",",
    "'view_invoker',(SELECT 'security_invoker=true'=any(coalesce(c.reloptions,ARRAY[]::text[]))",
    " FROM pg_catalog.pg_class c WHERE c.oid='public.shared_operational_device_templates_admin_v1'::regclass),",
    "'site',(SELECT count(*) FROM public.sites WHERE id='" + site + "'),",
    "'accounts',(SELECT count(*) FROM auth.users WHERE id IN ('" + manager + "','" + reader + "')),",
    "'templates',(SELECT count(*) FROM public.shared_operational_device_templates WHERE id='" + template + "'),",
    "'access_fixture',(SELECT count(*) FROM public.app_permissions WHERE code='access' AND name='GAP004 RLS TEMP ACCESS'),",
    "'manage_fixture',(SELECT count(*) FROM public.app_permissions WHERE code='staff.manage' AND name='GAP004 RLS TEMP STAFF MANAGE'));",
    'ROLLBACK;',
  ].join('\n'));
  assert.deepEqual(JSON.parse(after), {
    policies:qa.templateRls.restrictivePolicies,
    view_invoker:qa.templateRls.invoker,
    site:0,accounts:0,templates:0,access_fixture:0,manage_fixture:0,
  });
});

test('GAP-PKG-004 verifies synthetic device ownership, anonymous denial, and template read scope', () => {
  const site = 'b0040000-0000-0000-0000-000000000160';
  const actorA = 'b0040000-0000-0000-0000-000000000161';
  const actorB = 'b0040000-0000-0000-0000-000000000162';
  const actorC = 'b0040000-0000-0000-0000-000000000165';
  const deviceA = 'b0040000-0000-0000-0000-000000000163';
  const deviceB = 'b0040000-0000-0000-0000-000000000164';
  const deviceC = 'b0040000-0000-0000-0000-000000000167';
  const templateId = 'b0040000-0000-0000-0000-000000000166';
  const result = spawnSync('docker', [
    'exec', '-i', 'supabase_db_vento-shell', 'psql', '--username', 'postgres',
    '--dbname', 'postgres', '--no-psqlrc', '--tuples-only', '--no-align',
    '--quiet', '--set', 'ON_ERROR_STOP=1',
  ], {
    cwd: root,
    // All identities and devices are synthetic and live only in this transaction.
    input: [
      'BEGIN;',
      completionSql,
      'INSERT INTO public.sites (id,code,name,type,site_kind,site_type,is_active,operational_visibility)',
      "VALUES ('" + site + "','GAP004_RLS_DEVICE','GAP004 QA Device','satellite','operational','satellite',true,'operational');",
      'INSERT INTO auth.users (instance_id,id,aud,role,email,encrypted_password,email_confirmed_at,created_at,updated_at)',
      "VALUES ('00000000-0000-0000-0000-000000000000','" + actorA + "','authenticated','authenticated','gap004-device-a@example.invalid','',now(),now(),now()),",
      "('00000000-0000-0000-0000-000000000000','" + actorB + "','authenticated','authenticated','gap004-device-b@example.invalid','',now(),now(),now()),",
      "('00000000-0000-0000-0000-000000000000','" + actorC + "','authenticated','authenticated','gap004-device-c@example.invalid','',now(),now(),now());",
      'INSERT INTO public.employees (id,full_name,role,site_id,is_active,joined_at,updated_at)',
      "VALUES ('" + actorA + "','GAP004 Device Actor A','cajero','" + site + "',true,now(),now()),",
      "('" + actorB + "','GAP004 Device Actor B','cajero','" + site + "',true,now(),now()),",
      "('" + actorC + "','GAP004 Device Actor C','cajero','" + site + "',true,now(),now());",
      'INSERT INTO public.employee_sites (employee_id,site_id,is_primary,is_active)',
      "VALUES ('" + actorA + "','" + site + "',true,true),",
      "('" + actorB + "','" + site + "',true,true),",
      "('" + actorC + "','" + site + "',true,true)",
      'ON CONFLICT (employee_id,site_id) DO UPDATE SET is_active=true,is_primary=true;',
      'INSERT INTO public.shared_operational_devices (id,code,label,site_id,auth_user_id,default_app_code)',
      "VALUES ('" + deviceA + "','GAP004_QA_DEV_A','GAP004 QA device A','" + site + "','" + actorA + "','viso'),",
      "('" + deviceB + "','GAP004_QA_DEV_B','GAP004 QA device B','" + site + "','" + actorB + "','viso'),",
      "('" + deviceC + "','GAP004_QA_DEV_C','GAP004 QA device C','" + site + "','" + actorC + "','viso');",
      'INSERT INTO public.shared_operational_device_templates (id,code,label,default_app_code,is_active)',
      "VALUES ('" + templateId + "','GAP004_QA_TEMPLATE','GAP004 QA Template','viso',true);",
      'UPDATE public.shared_operational_devices SET template_id=',
      " '" + templateId + "'::uuid WHERE id='" + deviceC + "'::uuid;",
      'INSERT INTO public.shared_operational_device_template_apps (template_id,app_code,is_default,is_active)',
      "VALUES ('" + templateId + "','viso',true,true);",
      // The catalog's scope is global. A legitimate SITE grant must
      // work as well as a GLOBAL grant for its intended VISO consumer.
      'INSERT INTO public.employee_permissions (employee_id,permission_id,is_allowed,scope_type,scope_site_id)',
      "SELECT '" + actorA + "'::uuid,p.id,true,'site','" + site + "'::uuid",
      " FROM public.app_permissions p JOIN public.apps a ON a.id=p.app_id",
      " WHERE a.code='viso' AND p.code='staff.manage';",
      'INSERT INTO public.employee_permissions (employee_id,permission_id,is_allowed,scope_type)',
      "SELECT '" + actorB + "'::uuid,p.id,true,'global'",
      " FROM public.app_permissions p JOIN public.apps a ON a.id=p.app_id",
      " WHERE a.code='viso' AND p.code='staff.manage';",
      // Actor C has access to VISO, but not administrative staff.manage.
      'INSERT INTO public.employee_permissions (employee_id,permission_id,is_allowed,scope_type,scope_site_id)',
      "SELECT '" + actorC + "'::uuid,p.id,true,'site','" + site + "'::uuid",
      " FROM public.app_permissions p JOIN public.apps a ON a.id=p.app_id",
      " WHERE a.code='viso' AND p.code='access';",
      'SET LOCAL ROLE authenticated;',
      "SET LOCAL request.jwt.claim.sub = '" + actorA + "';",
      'SELECT json_build_object(',
      " 'actor','A','own',(SELECT count(*) FROM public.shared_operational_devices_admin_v1 WHERE id='" + deviceA + "'),",
      " 'other',(SELECT count(*) FROM public.shared_operational_devices_admin_v1 WHERE id='" + deviceB + "'),",
      " 'templates',(SELECT count(*) FROM public.shared_operational_device_templates_admin_v1 WHERE id='" + templateId + "'),",
      " 'raw_templates',(SELECT count(*) FROM public.shared_operational_device_templates WHERE id='" + templateId + "'),",
      " 'raw_apps',(SELECT count(*) FROM public.shared_operational_device_template_apps WHERE template_id='" + templateId + "'),",
      " 'has_manage',public.has_permission('viso.staff.manage',null::uuid));",
      "SET LOCAL request.jwt.claim.sub = '" + actorB + "';",
      'SELECT json_build_object(',
      " 'actor','B','own',(SELECT count(*) FROM public.shared_operational_devices_admin_v1 WHERE id='" + deviceB + "'),",
      " 'other',(SELECT count(*) FROM public.shared_operational_devices_admin_v1 WHERE id='" + deviceA + "'),",
      " 'templates',(SELECT count(*) FROM public.shared_operational_device_templates_admin_v1 WHERE id='" + templateId + "'),",
      " 'raw_templates',(SELECT count(*) FROM public.shared_operational_device_templates WHERE id='" + templateId + "'),",
      " 'raw_apps',(SELECT count(*) FROM public.shared_operational_device_template_apps WHERE template_id='" + templateId + "'),",
      " 'has_manage',public.has_permission('viso.staff.manage',null::uuid));",
      "SET LOCAL request.jwt.claim.sub = '" + actorC + "';",
      'SELECT json_build_object(',
      " 'actor','C','own',(SELECT count(*) FROM public.shared_operational_devices_admin_v1 WHERE id='" + deviceC + "'),",
      " 'other',(SELECT count(*) FROM public.shared_operational_devices_admin_v1 WHERE id='" + deviceB + "'),",
      " 'template_label_exposed',(SELECT template_label IS NOT NULL FROM public.shared_operational_devices_admin_v1 WHERE id='" + deviceC + "'),",
      " 'templates',(SELECT count(*) FROM public.shared_operational_device_templates_admin_v1 WHERE code='GAP004_QA_TEMPLATE'),",
      " 'raw_templates',(SELECT count(*) FROM public.shared_operational_device_templates WHERE id='" + templateId + "'),",
      " 'raw_apps',(SELECT count(*) FROM public.shared_operational_device_template_apps WHERE template_id='" + templateId + "'),",
      " 'has_manage',public.has_permission('viso.staff.manage','" + site + "'::uuid),",
      " 'has_access',public.has_permission('viso.access','" + site + "'::uuid));",
      'RESET ROLE;',
      'SET LOCAL ROLE service_role;',
      'SELECT json_build_object(',
      " 'actor','S','templates',(SELECT count(*) FROM public.shared_operational_device_templates_admin_v1 WHERE id='" + templateId + "'),",
      " 'raw_templates',(SELECT count(*) FROM public.shared_operational_device_templates WHERE id='" + templateId + "'),",
      " 'raw_apps',(SELECT count(*) FROM public.shared_operational_device_template_apps WHERE template_id='" + templateId + "'));",
      'RESET ROLE;',
      'UPDATE public.employee_permissions SET is_allowed=false',
      " WHERE employee_id='" + actorA + "'::uuid AND permission_id IN (",
      " SELECT p.id FROM public.app_permissions p JOIN public.apps a ON a.id=p.app_id",
      " WHERE a.code='viso' AND p.code='staff.manage');",
      'SET LOCAL ROLE authenticated;',
      "SET LOCAL request.jwt.claim.sub='" + actorA + "';",
      'SELECT json_build_object(',
      " 'actor','A_REVOKED',",
      " 'templates',(SELECT count(*) FROM public.shared_operational_device_templates_admin_v1 WHERE id='" + templateId + "'),",
      " 'raw_templates',(SELECT count(*) FROM public.shared_operational_device_templates WHERE id='" + templateId + "'),",
      " 'has_manage',public.has_permission('viso.staff.manage',null::uuid));",
      'RESET ROLE;',
      'SET LOCAL ROLE anon;',
      'DO $gap004_anon$ DECLARE v_name text; BEGIN',
      "  FOREACH v_name IN ARRAY ARRAY['permission_catalog_human_v1',",
      "   'shared_operational_device_actor_policies_admin_v1',",
      "   'shared_operational_device_templates_admin_v1',",
      "   'shared_operational_devices_admin_v1'] LOOP",
      '    BEGIN',
      "      EXECUTE format('SELECT 1 FROM public.%I LIMIT 1',v_name);",
      "      RAISE EXCEPTION 'GAP004_ANON_VIEW_LEAK:%',v_name;",
      '    EXCEPTION WHEN insufficient_privilege THEN NULL;',
      '    END;',
      '  END LOOP;',
      'END $gap004_anon$;',
      'RESET ROLE;',
      'ROLLBACK;',
    ].join('\n'),
    encoding: 'utf8', timeout: 120000, windowsHide: true,
  });
  assert.ifError(result.error);
  assert.equal(result.status, 0, result.stderr || result.stdout);
  const observations = result.stdout.trim().split(/\r?\n/u).map(line => JSON.parse(line));
  // Actual PostgreSQL RLS with Auth-style session claims (not a signed
  // browser JWT). SITE and GLOBAL staff managers retain the template catalog,
  // while a logged-in outsider cannot reconstruct it from the base tables.
  assert.deepEqual(observations, [
    {actor:'A',own:1,other:0,templates:1,raw_templates:1,raw_apps:1,has_manage:true},
    {actor:'B',own:1,other:0,templates:1,raw_templates:1,raw_apps:1,has_manage:true},
    {actor:'C',own:1,other:0,template_label_exposed:false,templates:0,raw_templates:0,raw_apps:0,has_manage:false,has_access:true},
    {actor:'S',templates:1,raw_templates:1,raw_apps:1},
    {actor:'A_REVOKED',templates:0,raw_templates:0,has_manage:false},
  ]);
});

test('GAP-PKG-004 retains the AUTH-DB-005 historical anon EXECUTE invariant in local PostgreSQL', () => {
  assert.match(fs.readFileSync(path.join(root, 'supabase/config.toml'), 'utf8'), /^project_id\s*=\s*"vento-shell"/m);
  const legacySql = fs.readFileSync(
    path.join(root, 'supabase/tests/database/024_auth_db_005_anon_grant_containment.test.sql'), 'utf8',
  );
  const result = spawnSync('docker', [
    'exec', '-i', 'supabase_db_vento-shell', 'psql', '--username', 'postgres',
    '--dbname', 'postgres', '--no-psqlrc', '--tuples-only', '--no-align',
    '--quiet', '--set', 'ON_ERROR_STOP=1',
  ], {
    cwd: root, input: 'SET search_path TO public, extensions, pg_catalog;\n' + legacySql,
    encoding: 'utf8', timeout: 120000, windowsHide: true,
  });
  assert.ifError(result.error);
  assert.equal(result.status, 0, result.stderr);
  const output = (result.stdout || '').trim();
  assert.doesNotMatch(output, /^(?:not ok\b|Bail out!)/m);
  assert.match(output, /^1\.\.20$/m);
  const assertions = [...output.matchAll(/^ok (\d+) - /gm)];
  assert.equal(assertions.length, 20, output);
  assert.deepEqual(assertions.map((match) => Number(match[1])), Array.from({ length: 20 }, (_, index) => index + 1));
});

for (const regression of [
  {
    name: 'AUTH-DB-003',
    path: 'supabase/tests/database/022_auth_db_003_security_definer_containment.test.sql',
    assertions: 34,
  },
  {
    name: 'AUTH-DB-018',
    path: 'supabase/tests/database/026_auth_db_018_contract_separation.test.sql',
    assertions: 26,
  },
]) {
  test('GAP-PKG-004 preserves historical SECURITY DEFINER inventories: ' + regression.name, () => {
    const source = fs.readFileSync(path.join(root, regression.path), 'utf8');
    assert.match(source, /\bbegin\s*;/iu);
    assert.match(source, /\brollback\s*;\s*$/iu);
    const historicalBody = source.replace(/\bbegin\s*;/iu, '').replace(/\brollback\s*;\s*$/iu, '');
    const result = spawnSync('docker', [
      'exec', '-i', 'supabase_db_vento-shell', 'psql', '--username', 'postgres',
      '--dbname', 'postgres', '--no-psqlrc', '--tuples-only', '--no-align',
      '--quiet', '--set', 'ON_ERROR_STOP=1',
    ], {
      cwd: root,
      // Verify historical inventories at their original baseline, before
      // applying the GAP-PKG-004 forward candidate in its separate transaction.
      input: 'BEGIN;\n' + historicalBody + '\nROLLBACK;\n',
      encoding: 'utf8', timeout: 120000, windowsHide: true,
    });
    assert.ifError(result.error);
    assert.equal(result.status, 0, result.stderr);
    const output = (result.stdout || '').trim();
    assert.doesNotMatch(output, /^(?:not ok\b|Bail out!)/m);
    assert.match(output, new RegExp('^1\\.\\.' + regression.assertions + '$', 'm'));
    const passed = [...output.matchAll(/^ok (\d+) - /gm)];
    assert.equal(passed.length, regression.assertions, output);
    assert.deepEqual(
      passed.map((match) => Number(match[1])),
      Array.from({length: regression.assertions}, (_, index) => index + 1),
    );
  });
}
