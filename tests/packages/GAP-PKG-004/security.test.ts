import assert from 'node:assert/strict';
import { ESLint } from 'eslint';
import fs from 'node:fs';
import path from 'node:path';
import test from 'node:test';
import { fileURLToPath } from 'node:url';

const root = fileURLToPath(new URL('../../../', import.meta.url));
const read = (relative: string): string => fs.readFileSync(path.join(root, relative), 'utf8');
const fixtures = JSON.parse(read('tests/packages/GAP-PKG-004/fixtures.json')) as {
  migration_path: string; rpc_signatures: string[];
};

// Structural checks only. Effective ACL and actor/site access require pgTAP and STAGING smoke tests.
test('GAP-PKG-004 candidate explicitly revokes five privileged RPCs from all direct client roles', () => {
  const sql = read(fixtures.migration_path);
  assert.match(sql, /\bbegin\s*;/iu);
  assert.match(sql, /\bcommit\s*;/iu);
  assert.equal(fixtures.rpc_signatures.length, 5);
  for (const signature of fixtures.rpc_signatures) {
    assert.ok(sql.includes('revoke execute on function ' + signature + ' from public, anon, authenticated;'), signature);
    assert.ok(sql.split(signature).length >= 4, 'preflight, revoke and postflight for ' + signature);
  }
  assert.match(sql, /update\s+storage\.buckets\s+set\s+public\s*=\s*false\s+where\s+id\s*=\s*'documents'/iu);
});


test('GAP-PKG-004 blocks missing runtime app catalog without ad hoc SQL seeding', () => {
  const sql = read(fixtures.migration_path);
  assert.match(sql, /SELECT id INTO v_app_id FROM public\.apps WHERE code = 'viso';/u);
  assert.match(sql, /IF v_app_id IS NULL THEN\s+RAISE EXCEPTION 'GAP004_VISO_APP_MISSING';/u);
  assert.doesNotMatch(sql, /\bINSERT\s+INTO\s+public\.apps\b/iu,
    'The scoped forward migration must not silently bootstrap unrelated applications');

  const definitions = JSON.parse(read(
    'packages/contracts/authorization/catalog/versions/1.0.0/applications.json',
  )) as Array<{ app_code: string; lifecycle_status: string }>;
  assert.equal(definitions.length, 10, 'The contract defines ten applications');
  assert.equal(new Set(definitions.map((app) => app.app_code)).size, 10);
  assert.ok(definitions.some((app) => app.app_code === 'viso'));
  assert.ok(definitions.every((app) => app.lifecycle_status === 'active'));

  const seedSection = read('supabase/config.toml').split('[db.seed]')[1]?.split('\n[')[0];
  assert.ok(seedSection, 'A seed policy must be explicitly configured');
  assert.match(seedSection, /^\s*enabled\s*=\s*false\s*$/mu,
    'Catalog provisioning cannot be inferred from an enabled generic seed');
});

test('GAP-PKG-004 forward RLS grants only active employee-site mappings to explicitly authorized document operators', () => {
  const sql = read(fixtures.migration_path);
  const policy = /create policy gap_pkg_004_employee_sites_documents_site_scope[\s\S]*?;/iu.exec(sql)?.[0];
  assert.ok(policy, 'the forward-only policy must exist in the canonical migration');
  assert.match(policy, /on public\.employee_sites\s+as permissive\s+for select\s+to authenticated/iu);
  assert.match(policy, /is_active is true\s+and\s*\([\s\S]*?public\.has_permission\('anima\.documents\.upload', site_id\)[\s\S]*?or public\.has_permission\('viso\.staff\.documents\.manage', site_id\)/iu);
  assert.doesNotMatch(policy, /\bsecurity\s+definer\b|\bto\s+(?:public|anon)\b/iu);
  for (const name of ['documents_select_self_or_permission', 'documents_select_visible']) {
    const statement = new RegExp('alter policy ' + name + '[\\s\\S]*?;', 'iu').exec(sql)?.[0];
    assert.ok(statement, name + ' must be corrected forward-only');
    assert.match(statement, /public\.has_permission\('viso\.staff\.documents\.manage', target_site\.site_id\)/iu);
    const documentSite = name === 'documents_select_visible' ? 'd' : 'documents';
    assert.ok(statement.includes(
      `(${documentSite}.site_id is null or ${documentSite}.site_id = target_site.site_id)`
    ), name + ' must reject explicit documents belonging to a different site');
    assert.doesNotMatch(statement, /public\.has_permission\('viso\.staff\.documents\.manage'\s*\)/iu,
      'A VISO grant without an explicit target site must never imply global document access');
    assert.match(statement, /public\.has_permission\('anima\.documents\.view_all'\)/iu,
      'Retain the historic intentionally broad view_all behavior');
  }
  assert.match(sql, /GAP_PKG_004_EMPLOYEE_SITES_RLS_PRECONDITION_FAILED/u);
  assert.match(sql, /GAP_PKG_004_EMPLOYEE_SITES_POLICY_POSTCONDITION_FAILED/u);
  assert.match(sql, /GAP_PKG_004_DOCUMENT_SCOPE_BASELINE_PRECONDITION_FAILED/u);
  assert.match(sql, /GAP_PKG_004_DOCUMENT_SCOPE_POSTCONDITION_FAILED/u);
});

test('GAP-PKG-004 source guards fail closed for cron and use a server-side invitation', () => {
  const cron = read('supabase/functions/document-alerts/index.ts');
  assert.match(cron, /if\s*\(!cronSecret\)/u);
  assert.match(cron, /req\.headers\.get\("x-cron-key"\)\s*!==\s*cronSecret/u);
  const invitations = read('supabase/functions/staff-invitations-accept/index.ts');
  assert.match(invitations, /\.from\("staff_invitations"\)/u);
  assert.match(invitations, /invitation\.role_code/u);
  assert.match(invitations, /invitation\.site_id/u);
  assert.match(invitations, /\.eq\("status", "sent"\)/u);
  assert.match(invitations, /\.gt\("expires_at",/u);
});

test('GAP-PKG-004 serializes invitation completion and denies direct client RPC calls', () => {
  const sql = read(fixtures.migration_path);
  assert.match(sql, /create or replace function public\.complete_staff_invitation_v1/u);
  assert.match(sql, /returns boolean\s+language plpgsql\s+security invoker\s+set search_path = ''/u);
  assert.match(sql, /grant select \(id, email, email_confirmed_at\) on table auth\.users to service_role;/u);
  assert.match(sql, /for update;/u);
  assert.match(sql, /p_completion_status not in \('accepted', 'linked_existing_user'\)/u);
  assert.match(sql, /set search_path = ''/u);
  assert.match(sql, /revoke execute on function public\.complete_staff_invitation_v1/u);
  assert.match(sql, /to service_role;/u);
});

test('GAP-PKG-004 protects invitation lifecycle from pre-provisioning and stale writes', () => {
  const created = read('supabase/functions/staff-invitations-create/index.ts');
  const accepted = read('supabase/functions/staff-invitations-accept/index.ts');
  const cancelled = read('supabase/functions/staff-invitations-cancel/index.ts');
  const resent = read('supabase/functions/staff-invitations-resend/index.ts');

  assert.doesNotMatch(created, /\.from\("employees"\)\.upsert/u);
  assert.doesNotMatch(created, /\.from\("employee_sites"\)\.upsert/u);
  assert.match(created, /status: "sent", authUserId: existingUserId, employeeId: null/u);
  assert.match(created, /employeeId: null/u);
  assert.match(created, /complete_staff_invitation_v1/u);
  assert.match(accepted, /complete_staff_invitation_v1/u);
  assert.doesNotMatch(accepted, /\.from\("employees"\)/u);
  assert.match(cancelled, /\.eq\("status", invitation\.status\)/u);
  assert.match(cancelled, /\.eq\("updated_at", invitation\.updated_at\)/u);
  assert.match(resent, /\.eq\("status", invitation\.status\)/u);
  assert.match(resent, /\.eq\("resend_count", invitation\.resend_count\)/u);
  assert.match(resent, /\.eq\("updated_at", invitation\.updated_at\)/u);
});

test('GAP-PKG-004 Edge invitation source passes ESLint without calling npm', async () => {
  const eslint = new ESLint({ cwd: root });
  const paths = ['create', 'accept', 'cancel', 'resend'].map(
    (name) => 'supabase/functions/staff-invitations-' + name + '/index.ts',
  );
  const results = await eslint.lintFiles(paths);
  assert.equal(results.length, 4, 'all invitation functions must be linted');
  const diagnostics = results.flatMap((entry) =>
    entry.messages.filter((message) => message.severity === 2)
      .map((message) => entry.filePath + ':' + message.line + ':' + message.column + ' ' + message.message),
  );
  assert.deepEqual(diagnostics, [], diagnostics.join('\n'));
});

test('GEOFENCE auto-checkout SQL preserves one authority and atomically binds the exact check-in', () => {
  const sql = read('supabase/migrations/20261020223916_attendance_geofence_authority.sql');
  for (const job of [
    'anima_attendance_day_end_close_0005',
    'auto-close-attendance',
    'attendance_stale_open_shift_autoclose_daily_bogota',
  ]) assert.ok(sql.includes(job), job);
  assert.match(sql, /to_regprocedure\('cron[.]alter_job[(]bigint,text,text,text,text,boolean[)]'\)/iu);
  assert.match(sql, /select jobid from cron[.]job/iu);
  assert.match(sql, /execute 'select cron[.]alter_job[(]job_id := [$]1, active := false[)]' using v_job;/iu);
  assert.match(sql, /GEOFENCE_LEGACY_AUTO_CLOSE_CRON_STILL_ACTIVE/u);
  assert.doesNotMatch(sql, /cron[.]unschedule/iu);
  assert.match(sql, /create or replace function public[.]apply_geofence_auto_checkout_v1/iu);
  assert.match(sql, /security invoker/iu);
  assert.match(sql, /current_user <> 'service_role'/iu);
  assert.match(sql, /revoke execute on function public[.]apply_geofence_auto_checkout_v1[(]uuid[)]/iu);
  assert.match(sql, /grant execute on function public[.]apply_geofence_auto_checkout_v1[(]uuid[)]/iu);
  assert.match(sql, /pg_advisory_xact_lock/iu);
  assert.match(sql, /v_last[.]id is distinct from v_e[.]check_in_log_id/iu);
  assert.match(sql, /v_last[.]shift_id is distinct from v_e[.]shift_id/iu);
  assert.match(sql, /v_e[.]has_mock_or_integrity_warning/iu);
  assert.match(sql, /v_e[.]exceptions_cleared_by_server/iu);
  assert.match(sql, /attendance_breaks/iu);
  assert.match(sql, /v_first_distance - v_e[.]first_accuracy_meters > v_radius/iu);
  assert.match(sql, /v_second_distance - v_e[.]second_accuracy_meters > v_radius/iu);
  assert.match(sql, /status='consumed',checkout_log_id=v_checkout_id/iu);
  assert.doesNotMatch(sql, /grant execute on function public[.]apply_geofence_auto_checkout_v1[(]uuid[)]\s+to\s+(?:anon|authenticated|public)/iu);
});

test('GEOFENCE cron execution is opt-in and only processes server-verified evidence after cron auth', () => {
  const cron = read('supabase/functions/shift-runtime-processor/index.ts');
  const gate = cron.indexOf('GAP-PKG-001:CRON_AUTHORIZATION_END');
  const geofence = cron.indexOf('const geofenceAutoCloseEnabled');
  assert.ok(gate > 0 && geofence > gate, 'Geo processing must follow the existing cron auth guard');
  assert.match(cron, /Deno[.]env[.]get[(]"GEOFENCE_AUTO_CLOSE_ENABLED"[)] === "true"/u);
  assert.match(cron, /attendance_geofence_verified_evidence/u);
  assert.match(cron, /[.]eq[(]"status", "verified"[)]/u);
  assert.match(cron, /[.]rpc[(]"apply_geofence_auto_checkout_v1"/u);
  assert.match(cron, /geofence_authority_unavailable/u);
  assert.match(cron, /const autoCloseEnabled = false/u);
});

test('GEOFENCE Edge receptor: HTTP loopback authenticates, rejects unsafe cases and never auto-checks-out', async () => {
  // Actual production handler transpiled to CommonJS for Node's isolated HTTP
  // server. Supabase Auth, database and Play decoder are synthetic test doubles.
  // This is NOT a live Supabase Auth / Play Integrity / GPS attestation test.
  const ts = (await import('typescript')).default;
  const { runInNewContext } = await import('node:vm');
  const { createServer } = await import('node:http');
  const integrityModuleUrl = new URL(
    '../../../supabase/functions/_shared/geofence-app-integrity.ts', import.meta.url,
  );
  const { computeGeofenceRequestHash, evaluateGooglePlayVerdict } =
    await import(integrityModuleUrl.href);

  const employeeId = 'e9132f2a-8474-468c-9c69-2eebc68a92a0';
  const siteId = 'f8fd215f-b784-4a05-8592-c6a36fe005a3';
  const shiftId = '507425bd-e229-4407-8b52-f42681cc034f';
  const checkInLogId = '12cdcb46-5fbd-46ab-9d41-b1f7420e1c0b';
  const otherEmployee = '2d84c940-e72c-4fe5-a9c5-888cad733fb7';
  const now = Date.now();
  const bound = {
    employeeId, siteId, shiftId, checkInLogId,
    first: { capturedAt: now - 110000, latitude: 7.911, longitude: -72.5,
      accuracyMeters: 5, mocked: false },
    second: { capturedAt: now - 15000, latitude: 7.9112, longitude: -72.5,
      accuracyMeters: 4, mocked: false },
    integrityToken: 'synthetic-play-integrity-token',
  };
  const defaults = {
    employees: { id: employeeId, is_active: true },
    attendance_logs: { id: checkInLogId, employee_id: employeeId, site_id: siteId,
      shift_id: shiftId, geofence_site_id: siteId, action: 'check_in',
      occurred_at: new Date(now - 300000).toISOString() },
    employee_shifts: { id: shiftId, employee_id: employeeId, site_id: siteId,
      status: 'scheduled', shift_kind: 'laboral', published_at: new Date(now - 600000).toISOString() },
    attendance_breaks: null,
    sites: { id: siteId, is_active: true, latitude: 7.9, longitude: -72.5,
      checkin_radius_meters: 50 },
    site_attendance_policy: { requires_geofence: true, checkin_radius_meters: 50 },
  };
  const tables: Record<string, unknown> = { ...defaults };
  const mutations: string[] = [];
  const reads: string[] = [];
  let providerMode: 'VERIFIED' | 'WRONG_HASH' | 'UNAVAILABLE' = 'VERIFIED';
  let sentPayload = bound;
  const env: Record<string, string> = {
    GEOFENCE_EVIDENCE_RECEIVER_ENABLED: 'false',
    SUPABASE_URL: 'http://synthetic-supabase.invalid',
    SUPABASE_SERVICE_ROLE_KEY: 'synthetic-service-role-not-live',
    GEOFENCE_ANDROID_PACKAGE_NAME: 'com.vento.anima.qa',
    GEOFENCE_ANDROID_CERT_SHA256_DIGEST: 'synthetic-cert-digest',
    GOOGLE_PLAY_SERVICE_ACCOUNT_JSON: JSON.stringify({
      client_email: 'qa@example.invalid', private_key: 'synthetic-private-key',
    }),
  };
  const db = {
    auth: { getUser: async (token: string) => ({
      data: { user: token === 'synthetic-user-jwt'
        ? { id: employeeId, is_anonymous: false } : null },
      error: token === 'synthetic-user-jwt' ? null : { code: 'AUTH_DENIED' },
    }) },
    from(table: string) {
      const query = {
        select(_columns: string) { void _columns; return query; },
        eq(_column: string, _value: unknown) { void _column; void _value; return query; },
        is(_column: string, _value: unknown) { void _column; void _value; return query; },
        order(_column: string, _options: unknown) { void _column; void _options; return query; },
        limit(_count: number) { void _count; return query; },
        async maybeSingle() {
          reads.push(table);
          return { data: tables[table] ?? null, error: null };
        },
        insert() {
          mutations.push(table + '.insert');
          throw new Error('UNEXPECTED_MUTATION');
        },
        update() {
          mutations.push(table + '.update');
          throw new Error('UNEXPECTED_MUTATION');
        },
        upsert() {
          mutations.push(table + '.upsert');
          throw new Error('UNEXPECTED_MUTATION');
        },
      };
      return query;
    },
    rpc(name: string) {
      mutations.push('rpc:' + name);
      throw new Error('UNEXPECTED_MUTATION');
    },
  };
  const decodedGoogleVerdict = async () => {
    if (providerMode === 'UNAVAILABLE') throw new Error('SYNTHETIC_PROVIDER_DOWN');
    const hash = await computeGeofenceRequestHash(sentPayload);
    return {
      requestDetails: {
        requestPackageName: 'com.vento.anima.qa',
        requestHash: providerMode === 'WRONG_HASH' ? 'f'.repeat(64) : hash,
        timestampMillis: String(Date.now() - 1000),
      },
      appIntegrity: { appRecognitionVerdict: 'PLAY_RECOGNIZED',
        packageName: 'com.vento.anima.qa',
        certificateSha256Digest: ['synthetic-cert-digest'] },
      deviceIntegrity: { deviceRecognitionVerdict: ['MEETS_DEVICE_INTEGRITY'] },
    };
  };
  const source = read('supabase/functions/geofence-evidence/index.ts');
  const javascript = ts.transpileModule(source, {
    fileName: 'index.ts',
    compilerOptions: { target: ts.ScriptTarget.ES2022, module: ts.ModuleKind.CommonJS },
    reportDiagnostics: true,
  });
  assert.deepEqual(
    javascript.diagnostics?.filter((entry) => entry.category === ts.DiagnosticCategory.Error) ?? [],
    [],
    'The real Edge source must transpile without TypeScript errors',
  );
  const cjs = { exports: {} as Record<string, unknown> };
  let served: unknown = null;
  runInNewContext(javascript.outputText, {
    module: cjs, exports: cjs.exports,
    require(specifier: string) {
      if (specifier === 'npm:@supabase/supabase-js@2.91.0') {
        return { createClient: () => db };
      }
      if (specifier.endsWith('geofence-app-integrity.ts')) {
        return { computeGeofenceRequestHash,
          decodeGooglePlayIntegrityToken: decodedGoogleVerdict,
          evaluateGooglePlayVerdict };
      }
      throw new Error('UNKNOWN_IMPORT:' + specifier);
    },
    Deno: { env: { get: (name: string) => env[name] ?? null },
      serve: (handler: unknown) => { served = handler; } },
    Request, Response, TextDecoder, TextEncoder, Uint8Array,
    Date, Math, JSON, console,
  }, { filename: 'geofence-evidence-qa.cjs' });
  const handler = cjs.exports.handleGeofenceEvidence as (req: Request) => Promise<Response>;
  assert.equal(typeof handler, 'function');
  assert.equal(served, handler);
  const server = createServer(async (incoming, outgoing) => {
    try {
      const chunks: Uint8Array[] = [];
      for await (const chunk of incoming) chunks.push(Buffer.from(chunk));
      const inbound = new Headers();
      for (const [key, value] of Object.entries(incoming.headers)) {
        if (typeof value === 'string') inbound.set(key, value);
      }
      const method = incoming.method ?? 'GET';
      const init = { method, headers: inbound } as RequestInit & { duplex?: string };
      if (method === 'POST') {
        init.body = Buffer.concat(chunks);
        init.duplex = 'half';
      }
      const result = await handler(new Request('http://127.0.0.1/evidence', init));
      outgoing.writeHead(result.status, Object.fromEntries(result.headers.entries()));
      outgoing.end(await result.text());
    } catch (error) {
      outgoing.statusCode = 500;
      outgoing.end(String(error));
    }
  });
  await new Promise<void>((resolve) => server.listen(0, '127.0.0.1', resolve));
  const address = server.address();
  assert.ok(address && typeof address !== 'string');
  const url = 'http://127.0.0.1:' + address.port + '/evidence';
  const call = async (options: {
    token?: string; contentType?: string; method?: string;
    body?: Record<string, unknown>; raw?: string;
  } = {}) => {
    const method = options.method ?? 'POST';
    const payload = options.body ?? bound;
    sentPayload = payload as typeof bound;
    const headers: Record<string, string> = {};
    if (options.token !== '') headers.Authorization = 'Bearer ' + (options.token ?? 'synthetic-user-jwt');
    if (method === 'POST') headers['Content-Type'] = options.contentType ?? 'application/json';
    const response = await fetch(url, {
      method, headers,
      ...(method === 'POST' ? { body: options.raw ?? JSON.stringify(payload) } : {}),
    });
    const text = await response.text();
    return { status: response.status,
      body: text ? JSON.parse(text) as Record<string, unknown> : {} };
  };
  try {
    assert.equal((await call()).status, 503, 'Receiver must be disabled by default');
    env.GEOFENCE_EVIDENCE_RECEIVER_ENABLED = 'true';
    assert.equal((await call({ method: 'GET' })).status, 405);
    assert.equal((await call({ token: '' })).status, 401);
    assert.equal((await call({ token: 'invalid-jwt' })).status, 401);
    assert.equal((await call({ contentType: 'text/plain' })).status, 415);
    assert.equal((await call({ raw: '{bad json' })).status, 400);
    assert.equal((await call({ raw: 'x'.repeat(25000) })).status, 400);
    assert.equal((await call({
      body: { ...bound, first: { ...bound.first, mocked: true } },
    })).status, 422);
    assert.equal((await call({ body: { ...bound, employeeId: otherEmployee } })).status, 403);
    assert.equal((await call({
      body: { ...bound, first: { ...bound.first, capturedAt: now - 250000 },
        second: { ...bound.second, capturedAt: now - 165000 } },
    })).status, 422, 'Stale samples must fail');
    tables.employees = { ...defaults.employees, is_active: false };
    assert.equal((await call()).status, 409);
    tables.employees = defaults.employees;
    tables.attendance_logs = { ...defaults.attendance_logs, action: 'check_out' };
    assert.equal((await call()).status, 409);
    tables.attendance_logs = defaults.attendance_logs;
    tables.employee_shifts = { ...defaults.employee_shifts, status: 'cancelled' };
    assert.equal((await call()).status, 409);
    tables.employee_shifts = defaults.employee_shifts;
    tables.attendance_breaks = { id: otherEmployee };
    assert.equal((await call()).status, 409);
    tables.attendance_breaks = null;
    assert.equal((await call({ body: { ...bound,
      second: { ...bound.second, latitude: 7.9001 } } })).status, 422);
    providerMode = 'WRONG_HASH';
    assert.equal((await call()).status, 403, 'Forged bound request hash must be denied');
    providerMode = 'UNAVAILABLE';
    assert.equal((await call()).status, 503, 'Provider outage must fail closed');
    providerMode = 'VERIFIED';
    const accepted = await call();
    assert.equal(accepted.status, 200);
    assert.equal(accepted.body.status, 'APP_DEVICE_VERIFIED_GPS_UNATTESTED');
    assert.equal(accepted.body.evidenceRecorded, false);
    assert.equal(accepted.body.eligibleForAutomaticCheckout, false);
    assert.ok(reads.includes('attendance_logs') && reads.includes('attendance_breaks'));
    assert.deepEqual(mutations, [], 'No HTTP request may record evidence or alter attendance');
  } finally {
    server.closeAllConnections();
    await new Promise<void>((resolve) => server.close(() => resolve()));
  }
});

test('GEOFENCE receptor and HTTP QA harness pass scoped ESLint without global baseline changes', async () => {
  const eslint = new ESLint({ cwd: root });
  const targets = [
    'supabase/functions/geofence-evidence/index.ts',
    'tests/packages/GAP-PKG-004/security.test.ts',
  ];
  const results = await eslint.lintFiles(targets);
  assert.equal(results.length, 2, 'Both newly affected code surfaces must be linted');
  const errors = results.flatMap((entry) => entry.messages
    .filter((message) => message.severity === 2)
    .map((message) =>
      entry.filePath + ':' + message.line + ':' + message.column + ' ' + message.message,
    ));
  assert.deepEqual(errors, [], errors.join('\n'));
});

test('GAP-PKG-004 isolated documents privacy baseline is read-only and verified', async () => {
  const {spawnSync} = await import('node:child_process');
  const {QA_ISOLATED_PROFILES, resolveIsolatedQaDatabaseContainer, runIsolatedQaPreflight} =
    await import('../../../scripts/quality/supabase-db-harness.mjs');
  const before = await runIsolatedQaPreflight();
  assert.equal(before.target, 'VERIFIED');
  assert.equal(before.qaResidualCounts, '0|0|0|0');
  const profile = QA_ISOLATED_PROFILES['GAP-PKG-004'];
  const runDocker = (command, args) => {
    assert.equal(command, 'docker');
    const r = spawnSync(command, args, {cwd: root, encoding: 'utf8',
      timeout: 15000, windowsHide: true});
    assert.ifError(r.error);
    assert.equal(r.status, 0);
    return r.stdout.trim();
  };
  const container = resolveIsolatedQaDatabaseContainer(runDocker, profile, root);
  const statement = [
    'BEGIN READ ONLY;',
    'SELECT json_build_object(',
    " 'private',(SELECT NOT public FROM storage.buckets WHERE id='documents'),",
    " 'documents_rls',(SELECT relrowsecurity FROM pg_class WHERE oid='public.documents'::regclass),",
    " 'storage_rls',(SELECT relrowsecurity FROM pg_class WHERE oid='storage.objects'::regclass),",
    " 'document_scope',(SELECT count(*) FROM pg_policies WHERE schemaname='public' AND tablename='documents'",
    " AND policyname='documents_select_self_or_permission' AND qual LIKE '%target_site.site_id%'),",
    " 'storage_scope',(SELECT count(*) FROM pg_policies WHERE schemaname='storage' AND tablename='objects'",
    " AND policyname='documents_select_visible' AND qual LIKE '%target_site.site_id%')",
    ');',
    'ROLLBACK;',
  ].join('\n');
  const r = spawnSync('docker', ['exec', '-i', container, 'psql', '-X', '-w',
    '-q', '-A', '-t', '-v', 'ON_ERROR_STOP=1', '-U', 'postgres', '-d', 'postgres'],
  {cwd: root, input: statement, encoding: 'utf8', timeout: 25000, windowsHide: true});
  assert.ifError(r.error);
  assert.equal(r.status, 0, String(r.stderr).slice(-1000));
  const observed = JSON.parse(r.stdout.trim());
  assert.deepEqual(observed, {private: true, documents_rls: true,
    storage_rls: true, document_scope: 1, storage_scope: 1});
  const after = await runIsolatedQaPreflight();
  assert.equal(after.target, 'VERIFIED');
  assert.equal(after.qaResidualCounts, '0|0|0|0');
});

test('GAP-PKG-004 isolated HTTP allows own document, denies peer and applies SITE grant', async () => {
  const {createClient} = await import('@supabase/supabase-js');
  const {randomUUID} = await import('node:crypto');
  const {spawnSync} = await import('node:child_process');
  const {runIsolatedQaPreflight} = await import('../../../scripts/quality/supabase-db-harness.mjs');
  const nonce = randomUUID().replace(/-/gu, '');
  const site = randomUUID();
  const documents = [randomUUID(), randomUUID()];
  const permissionId = randomUUID();
  const emails = [0,1].map(i => 'gap004-doc-http-' + nonce + '-' + i + '@example.invalid');
  const password = 'Gap004-Isolated-' + randomUUID();
  const objectKeys = [0,1].map(i => 'gap004-doc-http/' + nonce + '/' + i + '.txt');
  const content = objectKeys.map(v => 'Private synthetic document ' + v);
  const ids = [];
  const uploaded = [];
  const cleanupErrors = [];
  const u = v => "'" + v + "'::uuid";
  const userSet = () => ids.length ? ids.map(u).join(',') : 'NULL::uuid';
  const docSet = documents.map(u).join(',');
  const keys = objectKeys.map(v => "'" + v + "'").join(',');
  const result = await runIsolatedQaPreflight({afterVerified: async ({
    api, anonKey, serviceKey, profile,
  }) => {
    assert.equal(api, 'http://127.0.0.1:23151');
    assert.equal(profile.project, 'vento-shell-gap-pkg-004-qa');
    assert.match(profile.databaseContainer,
      /^supabase-VENTO_GAP_PKG_004_QA_ISOLADO-database-[a-f0-9]{12,64}$/u);
    const admin = createClient(api, serviceKey, {
      auth: {persistSession: false, autoRefreshToken: false},
    });
    const worker = createClient(api, anonKey, {
      auth: {persistSession: false, autoRefreshToken: false},
    });
    const anonymous = createClient(api, anonKey, {
      auth: {persistSession: false, autoRefreshToken: false},
    });
    const db = sql => {
      const r = spawnSync('docker', ['exec','-i',profile.databaseContainer,'psql',
        '-X','-w','-q','-A','-t','-v','ON_ERROR_STOP=1','-U','postgres','-d','postgres'],
      {cwd: root, input: sql, encoding: 'utf8', windowsHide: true, timeout: 45000});
      assert.ifError(r.error);
      assert.equal(r.status, 0, String(r.stderr).slice(-1000));
      return r.stdout.trim();
    };
    const snapshot = () => JSON.parse(db([
      'SELECT json_build_object(',
      " 'auth',(SELECT count(*) FROM auth.users WHERE email IN ('" + emails.join("','") + "')),",
      " 'profiles',(SELECT count(*) FROM public.users WHERE id IN (" + userSet() + ')),',
      " 'employees',(SELECT count(*) FROM public.employees WHERE id IN (" + userSet() + ')),',
      " 'settings',(SELECT count(*) FROM public.employee_settings WHERE employee_id IN (" + userSet() + ')),',
      " 'memberships',(SELECT count(*) FROM public.employee_sites WHERE employee_id IN (" + userSet() + ')),',
      " 'grants',(SELECT count(*) FROM public.employee_permissions WHERE employee_id IN (" + userSet() + ')),',
      " 'site',(SELECT count(*) FROM public.sites WHERE id=" + u(site) + '),',
      " 'documents',(SELECT count(*) FROM public.documents WHERE id IN (" + docSet + ')),',
      " 'objects',(SELECT count(*) FROM storage.objects WHERE bucket_id='documents' AND name IN (" + keys + ')),',
      " 'catalog',(SELECT count(*) FROM public.app_permissions WHERE id=" + u(permissionId) + ')',
      ');',
    ].join('\n')));
    const empty = {auth:0,profiles:0,employees:0,settings:0,memberships:0,
      grants:0,site:0,documents:0,objects:0,catalog:0};
    assert.deepEqual(snapshot(), empty, 'Synthetic QA identity must be unused');
    let siteAttempted = false;
    try {
      for (let i=0;i<2;i++) {
        const created = await admin.auth.admin.createUser({
          email:emails[i],password,email_confirm:true,
        });
        assert.equal(created.error,null,'QA GoTrue user creation');
        assert.ok(created.data?.user?.id);
        ids.push(created.data.user.id);
      }
      siteAttempted = true;
      db([
        'BEGIN;',
        "SET LOCAL statement_timeout='15s';",
        'INSERT INTO public.sites(id,code,name,type,site_kind,site_type,is_active,operational_visibility)',
        'VALUES (' + u(site) + ",'GAP004_DOC_" + nonce.slice(0,12).toUpperCase() +
          "','GAP004 Private Documents','satellite','operational','satellite',true,'operational');",
        'INSERT INTO public.employees(id,site_id,role,full_name,is_active) VALUES',
        ids.map((id,i)=>'(' + u(id) + ',' + u(site) +
          ",'cajero','GAP004 DOC HTTP WORKER " + i + "',true)").join(',') + ';',
        'INSERT INTO public.employee_sites(employee_id,site_id,is_primary,is_active) VALUES',
        ids.map(id=>'(' + u(id) + ',' + u(site) + ',true,true)').join(',') +
          ' ON CONFLICT(employee_id,site_id) DO UPDATE SET is_active=true;',
        'INSERT INTO public.documents(id,scope,owner_employee_id,target_employee_id,site_id,title,storage_path,file_name)',
        'VALUES ' + documents.map((id,i)=>'(' + u(id) + ",'employee'," +
          u(ids[i]) + ',' + u(ids[i]) + ',' + u(site) +
          ",'GAP004 Synthetic Private Document','" + objectKeys[i] + "','private.txt')").join(',') + ';',
        'COMMIT;',
      ].join('\n'));
      for (let i=0;i<2;i++) {
        const upload = await admin.storage.from('documents').upload(
          objectKeys[i],new Blob([content[i]],{type:'text/plain'}),
          {contentType:'text/plain',upsert:false});
        assert.equal(upload.error,null,'Synthetic private Storage upload');
        uploaded.push(objectKeys[i]);
      }
      const login = await worker.auth.signInWithPassword({email:emails[0],password});
      assert.equal(login.error,null,'Real QA GoTrue login');
      assert.ok(login.data?.session?.access_token,'Authenticated worker JWT');
      const own = await worker.from('documents').select('id').eq('id',documents[0]);
      assert.equal(own.error,null);
      assert.deepEqual(own.data?.map(row=>row.id),[documents[0]]);
      const peer = await worker.from('documents').select('id').eq('id',documents[1]);
      assert.equal(peer.error,null);
      assert.deepEqual(peer.data,[],'Peer metadata must remain private');
      const ownLink = await worker.storage.from('documents').createSignedUrl(objectKeys[0],60);
      assert.equal(ownLink.error,null,'Own signed document');
      const ownUrl = new URL(ownLink.data.signedUrl);
      assert.equal(ownUrl.origin,api);
      const ownDownload = await fetch(ownUrl,{redirect:'manual',signal:AbortSignal.timeout(8000)});
      assert.equal(ownDownload.status,200,'Own signed URL must download');
      assert.equal(await ownDownload.text(),content[0]);
      const anonymousDownload = await anonymous.storage.from('documents').download(objectKeys[0]);
      assert.ok(anonymousDownload.error,'Anonymous must not download private documents');
      const peerLink = await worker.storage.from('documents').createSignedUrl(objectKeys[1],60);
      assert.ok(peerLink.error,'Peer may not sign without permission');
      const peerDirect = await worker.storage.from('documents').download(objectKeys[1]);
      assert.ok(peerDirect.error,'Peer may not download without permission');
      db([
        'BEGIN;',
        'INSERT INTO public.app_permissions(id,app_id,code,name) SELECT ' +
          u(permissionId) + ",a.id,'staff.documents.manage','GAP004 DOC HTTP TEMP' FROM public.apps a",
        "WHERE a.code='viso' AND NOT EXISTS (SELECT 1 FROM public.app_permissions p",
        " WHERE p.app_id=a.id AND p.code='staff.documents.manage');",
        'INSERT INTO public.employee_permissions(employee_id,permission_id,is_allowed,scope_type,scope_site_id)',
        'SELECT ' + u(ids[0]) + ",p.id,true,'site'," + u(site),
        'FROM public.app_permissions p JOIN public.apps a ON a.id=p.app_id',
        "WHERE a.code='viso' AND p.code='staff.documents.manage';",
        'COMMIT;',
      ].join('\n'));
      const permitted = await worker.from('documents').select('id').eq('id',documents[1]);
      assert.equal(permitted.error,null);
      assert.deepEqual(permitted.data?.map(row=>row.id),[documents[1]],
        'Explicit SITE permission must permit same-site peer');
      const permittedLink = await worker.storage.from('documents').createSignedUrl(objectKeys[1],60);
      assert.equal(permittedLink.error,null,'Site-permitted peer signed URL');
      const permittedUrl = new URL(permittedLink.data.signedUrl);
      assert.equal(permittedUrl.origin,api);
      const peerHttp = await fetch(permittedUrl,{redirect:'manual',signal:AbortSignal.timeout(8000)});
      assert.equal(peerHttp.status,200,'SITE-authorized peer must download');
      assert.equal(await peerHttp.text(),content[1]);
      console.log('GAP004_ISOLATED_DOCUMENT_HTTP_OWNER_DENY_SITE_PASS');
      return true;
    } finally {
      try { await worker.auth.signOut(); } catch { cleanupErrors.push('session'); }
      if (uploaded.length) {
        try {
          const removal = await admin.storage.from('documents').remove(uploaded);
          if (removal.error) cleanupErrors.push('storage');
        } catch { cleanupErrors.push('storage'); }
      }
      if (siteAttempted) {
        try {
          db([
            'BEGIN;',
            "SET LOCAL statement_timeout='15s';",
            'SET LOCAL session_replication_role=replica;',
            'DELETE FROM public.documents WHERE id IN (' + docSet + ');',
            'DELETE FROM public.employee_permissions WHERE employee_id IN (' + userSet() + ');',
            'DELETE FROM public.employee_sites WHERE employee_id IN (' + userSet() + ');',
            'DELETE FROM public.employee_settings WHERE employee_id IN (' + userSet() + ');',
            'DELETE FROM public.employees WHERE id IN (' + userSet() + ');',
            'DELETE FROM public.app_permissions WHERE id=' + u(permissionId) + ';',
            'DELETE FROM public.users WHERE id IN (' + userSet() + ');',
            'DELETE FROM public.sites WHERE id=' + u(site) + ';',
            'COMMIT;',
          ].join('\n'));
        } catch { cleanupErrors.push('database'); }
      }
      for (const id of ids) {
        try {
          const deleted = await admin.auth.admin.deleteUser(id);
          if (deleted.error) cleanupErrors.push('auth');
        } catch { cleanupErrors.push('auth'); }
      }
      assert.deepEqual(snapshot(),empty,'All synthetic QA traces must be removed');
      assert.deepEqual(cleanupErrors,[],'Synthetic cleanup stages must all succeed');
    }
  }});
  assert.equal(result,true);
  const after = await runIsolatedQaPreflight();
  assert.equal(after.target,'VERIFIED');
  assert.equal(after.qaResidualCounts,'0|0|0|0');
});
