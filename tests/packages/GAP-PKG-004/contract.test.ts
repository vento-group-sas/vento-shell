import assert from 'node:assert/strict';
import { createHash } from 'node:crypto';
import fs from 'node:fs';
import path from 'node:path';
import test from 'node:test';
import { fileURLToPath } from 'node:url';

const root = fileURLToPath(new URL('../../../', import.meta.url));
const read = (relative: string): string => fs.readFileSync(path.join(root, relative), 'utf8');
type Target = { repository: string; path: string; operation: string; symbol_or_surface: string };
type Gate = {
  package_id: string;
  status: string;
  authorization: {
    decision: string;
    approved_by: string | null;
    approved_at: string | null;
    approval_ref: string | null;
    approval_statement: string | null;
  };
  canonical_snapshot: { task_ids: string[] };
  implementation_units: Array<{ unit_id: string }>;
  physical_identity: { targets: Target[] };
  physical_discovery: { findings: Target[]; status: string; unresolved_findings: string[] };
  evidence_plan: { observability: Array<{ signal: string }>; acceptance_criteria: string[]; rollback_steps: string[] };
  deployment_environment: { production_authorized: boolean };
};
const fixtures = JSON.parse(read('tests/packages/GAP-PKG-004/fixtures.json')) as {
  package_id: string; migration_path: string; gap_signals: string[]; treq_ids: string[];
};
const gate = JSON.parse(read('docs/plan-canonico/modular/package-gate-instances/GAP-PKG-004.json')) as Gate;

const uniqueSorted = (values: string[]): string[] => [...new Set(values)].sort();

test('GAP-PKG-004 preserves 56 task IDs and one unit through governed gate transitions', () => {
  assert.equal(gate.package_id, fixtures.package_id);
  assert.ok(
    ['MATURATION_DRAFT', 'READY_FOR_APPROVAL', 'APPROVED_FOR_IMPLEMENTATION'].includes(gate.status),
    'The package must remain within its governed maturation and approval lifecycle',
  );
  if (gate.status === 'APPROVED_FOR_IMPLEMENTATION') {
    assert.equal(gate.authorization.decision, 'APROBADO');
    for (const [name, proof] of Object.entries({
      approved_by: gate.authorization.approved_by,
      approved_at: gate.authorization.approved_at,
      approval_ref: gate.authorization.approval_ref,
      approval_statement: gate.authorization.approval_statement,
    })) {
      assert.ok(typeof proof === 'string' && proof.trim().length > 0,
        'Approved gate requires explicit authorization evidence: ' + name);
    }
  } else {
    assert.equal(gate.authorization.decision, 'PENDING');
    assert.equal(gate.authorization.approved_by, null);
    assert.equal(gate.authorization.approved_at, null);
    assert.equal(gate.authorization.approval_ref, null);
    assert.equal(gate.authorization.approval_statement, null);
  }
  assert.equal(gate.canonical_snapshot.task_ids.length, 56);
  assert.equal(uniqueSorted(gate.canonical_snapshot.task_ids).length, 56);
  assert.equal(gate.implementation_units.length, 1);
  assert.equal('supabase/migrations/' + gate.implementation_units[0].unit_id, fixtures.migration_path);
  assert.equal(gate.deployment_environment.production_authorized, false);
});

test('GAP-PKG-004 preserves physical target and finding integrity during discovery', () => {
  const targets = gate.physical_identity.targets.map((entry) => JSON.stringify(entry));
  const findings = gate.physical_discovery.findings.map((entry) => JSON.stringify(entry));
  const targetIdentities = uniqueSorted(targets);
  const findingIdentities = uniqueSorted(findings);
  assert.ok(targets.length >= 35, 'Physical target coverage cannot regress below the 35-target baseline');
  assert.equal(targetIdentities.length, targets.length, 'Physical target identities must be unique');
  assert.equal(findingIdentities.length, findings.length, 'Discovery finding identities must be unique');
  assert.deepEqual(
    findingIdentities,
    findingIdentities.filter((entry) => targetIdentities.includes(entry)),
    'Every documented finding must match one canonical physical target',
  );
  if (gate.physical_discovery.status === 'COMPLETE') {
    assert.deepEqual(findingIdentities, targetIdentities,
      'Completed discovery must cover every physical target');
    assert.equal(gate.physical_discovery.unresolved_findings.length, 0);
  } else {
    assert.equal(gate.physical_discovery.status, 'PENDING');
    assert.equal(gate.status, 'MATURATION_DRAFT');
    assert.ok(findingIdentities.length <= targetIdentities.length,
      'Pending discovery may complete physical coverage while risks remain unresolved');
    assert.ok(gate.physical_discovery.unresolved_findings.length > 0,
      'Pending discovery must preserve explicitly unresolved items');
  }
  const legacy = gate.physical_identity.targets.find((entry) => entry.path === 'supabase/tests/database/024_auth_db_005_anon_grant_containment.test.sql');
  assert.equal(legacy?.repository, 'vento-group-sas/vento-shell');
  assert.equal(legacy?.operation, 'MODIFICAR');
  for (const target of gate.physical_identity.targets) {
    if (target.repository === 'vento-group-sas/vento-shell') {
      assert.equal(fs.existsSync(path.join(root, target.path)), true, target.path);
    }
  }
});

test('GAP-PKG-004 applies the prevailing location decision without rewriting protected target identities', () => {
  const current = gate.evidence_plan.acceptance_criteria.find((entry) =>
    entry.startsWith('DECISION FINAL PREVALENTE — GEOLOCALIZACION ANIMA / 2026-10-19'));
  assert.ok(current, 'The approved geolocation decision must remain explicit');
  assert.match(current, /ubicacion PRECISA y el permiso de segundo plano son REQUISITOS para registrar check-in/u);
  assert.match(current, /seguimiento continuo foreground\/background solo puede ejecutarse durante un turno ABIERTO/u);
  assert.match(current, /NO debe impedir disponer de una via de finalizacion manual/u);
  assert.match(current, /PRECEDENCIA CANONICA/u);
  assert.match(current, /SUPERADAS/u);
  for (const path of [
    'src/hooks/use-attendance.ts',
    'src/hooks/attendance/background-location-task.ts',
    'app.config.js',
    'app/account-settings.tsx',
  ]) {
    const target = gate.physical_identity.targets.find((entry) =>
      entry.repository === 'vento-group-sas/vento-anima' && entry.path === path);
    const finding = gate.physical_discovery.findings.find((entry) =>
      entry.repository === 'vento-group-sas/vento-anima' && entry.path === path);
    assert.ok(target, 'Protected target must remain in the physical scope: ' + path);
    assert.deepEqual(finding, target, 'Findings must preserve its canonical physical identity: ' + path);
  }
  // Protected legacy labels are historical, not permission to restore optional check-in.
  assert.equal(gate.authorization.decision, 'PENDING');
  assert.equal(gate.deployment_environment.production_authorized, false);
});

test('GAP-PKG-004 retains authorized ANIMA/VISO UI and staff-detail targets', () => {
  for (const target of [
    { repository: 'vento-group-sas/vento-anima', path: 'src/components/team/use-team-invitations.ts' },
    { repository: 'vento-group-sas/vento-viso', path: 'src/components/viso/staff-invite-form.tsx' },
    { repository: 'vento-group-sas/vento-viso', path: 'src/app/staff/page.tsx' },
    { repository: 'vento-group-sas/vento-viso', path: 'src/app/staff/[id]/page.tsx' },
    { repository: 'vento-group-sas/vento-viso', path: 'src/app/staff/shared-devices/new/page.tsx' },
    { repository: 'vento-group-sas/vento-viso', path: 'scripts/quality/viso-consumer-baseline-gate.test.mjs' },
  ]) {
    const match = gate.physical_identity.targets.find((entry) => (
      entry.repository === target.repository && entry.path === target.path
    ));
    assert.equal(match?.operation, 'MODIFICAR', target.path);
    const finding = gate.physical_discovery.findings.find((entry) => (
      entry.repository === target.repository && entry.path === target.path
    ));
    assert.deepEqual(finding, match);
  }
});

test('GAP-PKG-004 tracks all 22 findings and 14 TREQ through discovery completion', () => {
  assert.equal(fixtures.gap_signals.length, 22);
  assert.equal(uniqueSorted(fixtures.gap_signals).length, 22);
  assert.equal(fixtures.treq_ids.length, 14);
  assert.equal(uniqueSorted(fixtures.treq_ids).length, 14);
  const signals = gate.evidence_plan.observability.map((entry) => entry.signal);
  for (const signal of fixtures.gap_signals) assert.ok(signals.includes(signal), signal);
  assert.ok(['PENDING', 'COMPLETE'].includes(gate.physical_discovery.status));
  if (gate.physical_discovery.status === 'PENDING') {
    assert.equal(gate.status, 'MATURATION_DRAFT',
      'The package cannot advance with incomplete physical discovery');
    assert.ok(gate.physical_discovery.unresolved_findings.length > 0);
  } else {
    assert.equal(gate.physical_discovery.unresolved_findings.length, 0,
      'Discovery cannot be complete while physical findings remain unresolved');
  }
});

test('GAP-PKG-004 requires scoped and explicit rollback for the legacy cron jobs', () => {
  const steps = gate.evidence_plan.rollback_steps.filter((entry) =>
    entry.startsWith('CRON GAP-PKG-004:'));
  assert.equal(steps.length, 1, 'The rollback plan must have one dedicated cron entry');
  const plan = steps[0];
  assert.match(plan, /cron\.alter_job\(job_id := ID_VERIFICADO, active := false\)/u);
  assert.match(plan, /cron\.alter_job\(job_id := ID_VERIFICADO, active := true\)/u);
  assert.match(plan, /NO AUTOMATICO/u);
  assert.match(plan, /autorizacion expresa del responsable/u);
  assert.match(plan, /sin mostrar command ni secretos/u);
  assert.match(plan, /que los tres jobs persisten en cron\.job con active=false/u);
  assert.equal(gate.authorization.decision, 'PENDING',
    'A rollback plan cannot authorize a database mutation');
});

test('GAP-PKG-004 disables only legacy scheduled checkout jobs, preserving audit and rollback', () => {
  const sql = read('supabase/migrations/20261020223916_attendance_geofence_authority.sql');
  const cronBlock = /do \$geofence_cron\$[\s\S]*?\$geofence_cron\$;/u.exec(sql)?.[0];
  assert.ok(cronBlock, 'GAP-004 must retain one guarded cron transition');
  assert.match(cronBlock, /to_regprocedure\('cron\.alter_job\(bigint,text,text,text,text,boolean\)'\)/u);
  assert.match(cronBlock, /cron\.alter_job\(job_id := \$1, active := false\)/u,
    'Legacy jobs must be deactivated reversibly, not deleted');
  assert.doesNotMatch(cronBlock, /cron\.unschedule\s*\(|\bdelete\s+from\s+cron\.job/iu);
  for (const job of [
    'anima_attendance_day_end_close_0005',
    'auto-close-attendance',
    'attendance_stale_open_shift_autoclose_daily_bogota',
  ]) {
    assert.equal(cronBlock.split(job).length - 1, 2,
      'Only these three named jobs may be deactivated and verified: ' + job);
  }
  assert.match(cronBlock, /GEOFENCE_LEGACY_AUTO_CLOSE_CRON_STILL_ACTIVE/u,
    'Migration must fail closed if a legacy job remains active');
  assert.equal(gate.authorization.decision, 'PENDING',
    'SQL candidate must not silently approve a remote migration');
});

test('VPROC-0008 administrative checkout candidate is fail-closed, audited and idempotent', () => {
  const sql = read('supabase/migrations/20261020223916_attendance_geofence_authority.sql');
  assert.match(sql, /create table if not exists public\.attendance_administrative_decisions/u);
  assert.match(sql, /ticket_id uuid not null unique references public\.support_tickets\(id\)/u);
  assert.match(sql, /alter table public\.attendance_administrative_decisions enable row level security/u);
  assert.match(sql, /revoke all on public\.attendance_administrative_decisions from public, anon, authenticated/u);
  const fn = /create or replace function public\.decide_attendance_checkout_review_v1\([\s\S]*?\$admin_attendance\$;/u.exec(sql)?.[0];
  assert.ok(fn, 'The administrative decision must exist in the server transaction');
  assert.match(fn, /auth\.jwt\(\) ->> 'role'/u);
  assert.match(fn, /'anima\.attendance\.checkout_review\.decide'/u,
    'A dedicated site-scoped permission, not shift scheduling, is mandatory');
  assert.match(fn, /public\.has_permission\([\s\S]*?v_ticket\.site_id/u);
  assert.match(fn, /pg_advisory_xact_lock/u);
  assert.match(fn, /ATTENDANCE_REVIEW_REPLAY_CONFLICT/u);
  assert.match(fn, /ATTENDANCE_REVIEW_SESSION_CHANGED/u);
  assert.match(fn, /ATTENDANCE_REVIEW_BREAK_OPEN/u);
  assert.match(fn, /p_decision = 'approve'[\s\S]*?insert into public\.attendance_logs/u);
  assert.match(fn, /insert into public\.attendance_administrative_decisions/u);
  assert.doesNotMatch(fn, /update public\.attendance_logs|delete from public\.attendance_logs/iu);
  assert.match(fn, /p_checkout_at timestamptz/u);
  assert.match(fn, /p_checkout_at is null or p_checkout_at > clock_timestamp\(\)/u);
  assert.match(fn, /p_checkout_at <= v_checkin\.occurred_at/u);
  assert.match(fn, /v_checkin\.employee_id is distinct from[\s\S]*?coalesce\(v_ticket\.target_employee_id, v_ticket\.created_by\)/u);
  assert.match(fn, /ATTENDANCE_REVIEW_SELF_APPROVAL_DENIED/u);
  assert.match(fn, /ATTENDANCE_REVIEW_EVIDENCE_MISSING/u);
  assert.match(fn, /v_existing\.approved_checkout_at is distinct from p_checkout_at/u);
  assert.match(fn, /p_decision = 'approve' then[\s\S]*?insert into public\.attendance_logs/u);
  assert.match(fn, /'system', p_checkout_at/u, 'The manager-approved instant must not become server arrival time');
  assert.match(fn, /v_shift\.published_at/u, 'Preserve the published schedule reference');
  assert.match(fn, /update public\.support_tickets[\s\S]*?status = 'resolved'/u);
  assert.match(fn, /insert into public\.support_messages/u);
  assert.match(sql, /check \(\(decision = 'approve'\) = \(approved_checkout_at is not null\)\)/u);
  assert.match(sql, /revoke execute on function public\.decide_attendance_checkout_review_v1\(uuid,uuid,text,text,timestamptz\)[\s\S]*?from public, anon/u);
  const permissions = JSON.parse(read(
    'packages/contracts/authorization/catalog/versions/1.0.0/permissions.json',
  )) as Array<{ permission_key: string }>;
  assert.equal(permissions.some((p) => p.permission_key ===
    'anima.attendance.checkout_review.decide'), false,
  'Until its canonical grant is approved, the candidate MUST stay inaccessible');
  assert.equal(gate.authorization.decision, 'PENDING');
});

test('GAP-PKG-004 SQL candidate remains consistent with versioned migration manifest', () => {
  const body = read(fixtures.migration_path).replace(/\r\n?/gu, '\n');
  const digest = createHash('sha256').update(body).digest('hex');
  const manifest = read('supabase/MIGRATION_MANIFEST.md');
  assert.ok(manifest.includes('20261012173553_gap_pkg_004_rpc_acl_hardening.sql'));
  assert.ok(manifest.includes(digest), 'manifest must be rebuilt after SQL changes');
});

test('GAP-PKG-004 preserves the historical anon EXECUTE baseline with a gated five-RPC reduction', () => {
  const source = read('supabase/tests/database/024_auth_db_005_anon_grant_containment.test.sql');
  assert.match(source, /91::bigint/u);
  assert.match(source, /m\.version\s*=\s*'20261012173553'/u);
  assert.match(source, /then 5::bigint/u);
  assert.match(source, /else 0::bigint/u);
});

test('GAP-PKG-004 tracks the full approved invitation lifecycle scope', () => {
  const webAuth = gate.physical_identity.targets.find((entry) => entry.path === 'web-auth/api/set-password.js');
  assert.equal(webAuth?.repository, 'vento-group-sas/vento-anima');
  assert.equal(webAuth?.operation, 'MODIFICAR');
  for (const action of ['create','accept','cancel','resend']) {
    const relative = `supabase/functions/staff-invitations-${action}/index.ts`;
    const target = gate.physical_identity.targets.find((entry) => entry.path === relative);
    assert.equal(target?.repository, 'vento-group-sas/vento-shell', relative);
    assert.equal(target?.operation, 'MODIFICAR', relative);
  }
});

test('GAP-PKG-004 requires canonical VISO app identity before registering its permission', () => {
  const applications = JSON.parse(read('packages/contracts/authorization/catalog/versions/1.0.0/applications.json')) as Array<{
    app_code: string; lifecycle_status: string; permission_namespace: string;
  }>;
  assert.equal(applications.length, 10, 'Use the verified ten-app identity foundation');
  const viso = applications.filter((app) => app.app_code === 'viso');
  assert.equal(viso.length, 1);
  assert.equal(viso[0].lifecycle_status, 'active');
  assert.equal(viso[0].permission_namespace, 'viso');

  const forward = read(fixtures.migration_path);
  assert.match(forward, /SELECT id INTO v_app_id FROM public\.apps WHERE code = 'viso'/iu);
  assert.match(forward, /RAISE EXCEPTION 'GAP004_VISO_APP_MISSING'/iu);
  assert.match(forward, /'workforce\.employees\.view'/iu);
  assert.doesNotMatch(forward, /\bINSERT\s+INTO\s+public\.apps\b/iu,
    'The GAP-PKG-004 security forward must not invent or seed the shared app catalog');
});

test('GAP-PKG-004 reconciles the historical 112 keys to 140 current identities without reviving retired authority', () => {
  // The original AUTH-CAT-016 matrix remains immutable historical evidence.
  const historicalSource = read('docs/plan-canonico/modular/bloques/C_CATALOGO/06_CONTRATO_DE_RECURSO.md');
  const start = historicalSource.indexOf('#### 15. Matriz completa de los 112 permisos');
  const end = historicalSource.indexOf('#### 16.', start);
  assert.ok(start >= 0 && end > start, 'The approved historical matrix must remain inspectable');
  const historical = [...historicalSource.slice(start, end)
    .matchAll(/^\|\s*`([a-z][a-z0-9_.]+)`\s*\|/gmu)].map((match) => match[1]);
  assert.equal(historical.length, 112);
  assert.equal(new Set(historical).size, 112);

  // SHELL-CON-003::GLOBAL VERIFIED materializes identity only, not grant authority.
  const actual = JSON.parse(read('packages/contracts/authorization/catalog/versions/1.0.0/permissions.json')) as Array<{
    permission_key: string; app_code: string; lifecycle_status: string;
  }>;
  assert.equal(actual.length, 140);
  assert.equal(new Set(actual.map((entry) => entry.permission_key)).size, 140);
  assert.ok(actual.every((entry) => entry.lifecycle_status === 'active'));
  assert.ok(actual.every((entry) => entry.permission_key.startsWith(entry.app_code + '.')));

  const historicalSet = new Set(historical);
  const activeSet = new Set(actual.map((entry) => entry.permission_key));
  const added = actual.map((entry) => entry.permission_key).filter((key) => !historicalSet.has(key));
  const removed = historical.filter((key) => !activeSet.has(key));
  assert.equal(added.length, 29);
  assert.deepEqual(removed, ['nexo.inventory.remissions.dispatch']);
  assert.equal(112 + added.length - removed.length, actual.length);
  const byApp = (keys: string[]) => keys.reduce<Record<string, number>>((counts, key) => {
    const app = key.split('.')[0];
    counts[app] = (counts[app] ?? 0) + 1;
    return counts;
  }, {});
  assert.deepEqual(byApp(added), { nexo: 5, origo: 1, pulso: 9, viso: 14 });
  assert.deepEqual(byApp(removed), { nexo: 1 });
  for (const independent of [
    'nexo.inventory.remissions.accept_custody',
    'nexo.inventory.remissions.start_transit',
    'nexo.inventory.remissions.deliver',
  ]) {
    assert.ok(activeSet.has(independent), independent);
  }
  assert.ok(!activeSet.has('nexo.inventory.remissions.dispatch'));
});
