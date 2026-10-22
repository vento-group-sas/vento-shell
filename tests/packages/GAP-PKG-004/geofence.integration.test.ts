import assert from 'node:assert/strict';
import { spawnSync } from 'node:child_process';
import fs from 'node:fs';
import path from 'node:path';
import test from 'node:test';
import { fileURLToPath } from 'node:url';
import { QA_ISOLATED_PROFILES, resolveIsolatedQaDatabaseContainer } from '../../../scripts/quality/supabase-db-harness.mjs';

const root = fileURLToPath(new URL('../../../', import.meta.url));

test('GEOFENCE isolated SQL applies one server-verified checkout and rejects stale sessions', async () => {
  const { randomUUID } = await import('node:crypto');
  const profile = QA_ISOLATED_PROFILES['GAP-PKG-004'];
  assert.equal(profile.project, 'vento-shell-gap-pkg-004-qa');
  const dockerRun = (command: string, args: string[]) => {
    assert.equal(command, 'docker');
    const result = spawnSync(command, args, {
      cwd: root, encoding: 'utf8', windowsHide: true, timeout: 15000,
    });
    assert.ifError(result.error);
    assert.equal(result.status, 0, 'Only the identified isolated QA Docker container is permitted');
    return result.stdout.trim();
  };
  const container = resolveIsolatedQaDatabaseContainer(dockerRun, profile, root);
  const uids = Array.from({ length: 10 }, () => randomUUID());
  const [employee, site, shift, checkIn, proof, laterCheckIn, staleProof, manualProof, insideProof, invalidProof] = uids;
  const uid = (value: string) => "'" + value + "'::uuid";
  const suffix = randomUUID().replace(/-/gu, '').slice(0, 14);
  const code = 'GEO_QA_' + suffix.toUpperCase();
  const call = (id: string) =>
    'public.apply_geofence_auto_checkout_v1(' + uid(id) + ')';
  // Exercise the migration in the SAME isolated QA transaction as the fixture.
  // ROLLBACK restores cron jobs, function and table; no permanent QA mutation.
  const transientMigration = fs.readFileSync(path.join(
    root, 'supabase/migrations/20261020223916_attendance_geofence_authority.sql',
  ), 'utf8').replace(/^\s*begin;\s*/iu, '').replace(/\s*commit;\s*$/iu, '');
  const stmts = [
    'BEGIN;',
    "SET LOCAL statement_timeout='20s';",
    transientMigration,
    "INSERT INTO auth.users(id,email) VALUES (" + uid(employee) +
      ", 'geofence-" + suffix + "@example.invalid');",
    "INSERT INTO public.sites(id,code,name,type,site_kind,is_active,latitude,longitude,checkin_radius_meters)" +
      " VALUES (" + uid(site) + ", '" + code + "', 'GEO QA', 'satellite', 'satellite',true,7.9,-72.5,50);",
    "INSERT INTO public.employees(id,site_id,role,full_name,is_active) VALUES (" +
      uid(employee) + ',' + uid(site) + ",'mesero','GEO QA Worker',true);",
    "INSERT INTO public.employee_shifts(id,employee_id,site_id,shift_date,start_time,end_time," +
      "shift_kind,status,published_at) VALUES (" +
      uid(shift) + ',' + uid(employee) + ',' + uid(site) +
      ",current_date,'00:00','23:59','laboral','scheduled',now());",
    "INSERT INTO public.attendance_logs(id,employee_id,site_id,geofence_site_id,shift_id," +
      "action,source,occurred_at) VALUES (" +
      [checkIn, employee, site, site, shift].map(uid).join(',') +
      ",'check_in','system',now()-interval '6 minutes');",
    "INSERT INTO public.attendance_geofence_verified_evidence(" +
      "id,employee_id,site_id,shift_id,check_in_log_id,provider_ref,verifier,attestation_digest," +
      "first_outside_at,second_outside_at,first_latitude,first_longitude,second_latitude," +
      "second_longitude,first_accuracy_meters,second_accuracy_meters," +
      "has_mock_or_integrity_warning,exceptions_cleared_by_server) VALUES (" +
      [proof,employee,site,shift,checkIn].map(uid).join(',') +
      ",'proof-" + suffix + "','server_attested_location_v1',repeat('a',64)," +
      "now()-interval '4 minutes',now()-interval '3 minutes'," +
      "7.911,-72.5,7.9112,-72.5,5,5,true,true);",
    // Geometry must fail closed even when a privileged verifier marks its evidence valid.
    "INSERT INTO public.attendance_geofence_verified_evidence(" +
      "id,employee_id,site_id,shift_id,check_in_log_id,provider_ref,verifier,attestation_digest," +
      "first_outside_at,second_outside_at,first_latitude,first_longitude,second_latitude," +
      "second_longitude,first_accuracy_meters,second_accuracy_meters," +
      "has_mock_or_integrity_warning,exceptions_cleared_by_server) VALUES (" +
      [insideProof,employee,site,shift,checkIn].map(uid).join(',') +
      ",'inside-" + suffix + "','server_attested_location_v1',repeat('d',64)," +
      "now()-interval '4 minutes',now()-interval '3 minutes'," +
      "7.90001,-72.5,7.90002,-72.5,5,5,false,true);",
    'SET LOCAL ROLE service_role;',
    "SELECT set_config('qa.geo_inside'," + call(insideProof) + ',true);',
    'RESET ROLE;',
    // The schema must reject confirmations separated by less than 45 seconds.
    "DO $bad_interval$ BEGIN INSERT INTO public.attendance_geofence_verified_evidence(" +
      "id,employee_id,site_id,shift_id,check_in_log_id,provider_ref,verifier,attestation_digest," +
      "first_outside_at,second_outside_at,first_latitude,first_longitude,second_latitude," +
      "second_longitude,first_accuracy_meters,second_accuracy_meters," +
      "has_mock_or_integrity_warning,exceptions_cleared_by_server) VALUES (" +
      [invalidProof,employee,site,shift,checkIn].map(uid).join(',') +
      ",'interval-" + suffix + "','server_attested_location_v1',repeat('e',64)," +
      "now()-interval '4 minutes',now()-interval '210 seconds'," +
      "7.911,-72.5,7.9112,-72.5,5,5,false,true);" +
      " RAISE EXCEPTION 'GEOFENCE_TOO_SHORT_INTERVAL_ACCEPTED';" +
      " EXCEPTION WHEN check_violation THEN NULL; END $bad_interval$;",
    "DO $guard$ BEGIN IF has_function_privilege('authenticated'," +
      "'public.apply_geofence_auto_checkout_v1(uuid)','EXECUTE') THEN" +
      " RAISE EXCEPTION 'GEOFENCE_CLIENT_EXECUTE_EXPOSED'; END IF; END $guard$;",
    'SET LOCAL ROLE service_role;',
    "SELECT set_config('qa.geo_mock'," + call(proof) + ',true);',
    'RESET ROLE;',
    'UPDATE public.attendance_geofence_verified_evidence' +
      ' SET has_mock_or_integrity_warning=false, exceptions_cleared_by_server=false' +
      ' WHERE id=' + uid(proof) + ';',
    'SET LOCAL ROLE service_role;',
    "SELECT set_config('qa.geo_exception'," + call(proof) + ',true);',
    'RESET ROLE;',
    'UPDATE public.attendance_geofence_verified_evidence SET exceptions_cleared_by_server=true' +
      ' WHERE id=' + uid(proof) + ';',
    'SET LOCAL ROLE service_role;',
    "SELECT set_config('qa.geo_first'," + call(proof) + ',true);',
    "SELECT set_config('qa.geo_duplicate'," + call(proof) + ',true);',
    'RESET ROLE;',
    "INSERT INTO public.attendance_logs(id,employee_id,site_id,geofence_site_id,shift_id," +
      "action,source,occurred_at) VALUES (" +
      [laterCheckIn, employee, site, site, shift].map(uid).join(',') +
      ",'check_in','system',now()-interval '2 minutes');",
    "INSERT INTO public.attendance_geofence_verified_evidence(" +
      "id,employee_id,site_id,shift_id,check_in_log_id,provider_ref,verifier,attestation_digest," +
      "first_outside_at,second_outside_at,first_latitude,first_longitude,second_latitude," +
      "second_longitude,first_accuracy_meters,second_accuracy_meters," +
      "has_mock_or_integrity_warning,exceptions_cleared_by_server) VALUES (" +
      [staleProof,employee,site,shift,checkIn].map(uid).join(',') +
      ",'stale-" + suffix + "','server_attested_location_v1',repeat('b',64)," +
      "now()-interval '2 minutes',now()-interval '1 minute'," +
      "7.911,-72.5,7.9112,-72.5,5,5,false,true);",
    'SET LOCAL ROLE service_role;',
    "SELECT set_config('qa.geo_stale'," + call(staleProof) + ',true);',
    'RESET ROLE;',
    // A manual mobile checkout wins over a previously proposed automatic one.
    "INSERT INTO public.attendance_geofence_verified_evidence(" +
      "id,employee_id,site_id,shift_id,check_in_log_id,provider_ref,verifier,attestation_digest," +
      "first_outside_at,second_outside_at,first_latitude,first_longitude,second_latitude," +
      "second_longitude,first_accuracy_meters,second_accuracy_meters," +
      "has_mock_or_integrity_warning,exceptions_cleared_by_server) VALUES (" +
      [manualProof,employee,site,shift,laterCheckIn].map(uid).join(',') +
      ",'manual-" + suffix + "','server_attested_location_v1',repeat('c',64)," +
      "now()-interval '105 seconds',now()-interval '45 seconds'," +
      "7.911,-72.5,7.9112,-72.5,5,5,false,true);",
    "INSERT INTO public.attendance_logs(employee_id,site_id,geofence_site_id,shift_id,action," +
      "source,latitude,longitude,accuracy_meters,client_event_id) VALUES (" +
      [employee,site,site,shift].map(uid).join(',') +
      ",'check_out','mobile',7.9,-72.5,5,'manual-" + suffix + "');",
    'SET LOCAL ROLE service_role;',
    "SELECT set_config('qa.geo_manual_wins'," + call(manualProof) + ',true);',
    'RESET ROLE;',
    "SELECT json_build_object(" +
      "'mock',current_setting('qa.geo_mock')," +
      "'inside',current_setting('qa.geo_inside')," +
      "'invalid_interval_rows',(SELECT count(*) FROM public.attendance_geofence_verified_evidence" +
      " WHERE id=" + uid(invalidProof) + ")," +
      "'exception',current_setting('qa.geo_exception')," +
      "'manual_wins',current_setting('qa.geo_manual_wins')," +
      "'closed',current_setting('qa.geo_first')," +
      "'duplicate',current_setting('qa.geo_duplicate')," +
      "'stale',current_setting('qa.geo_stale')," +
      "'check_outs',(SELECT count(*) FROM public.attendance_logs WHERE employee_id=" +
      uid(employee) + " AND action='check_out')," +
      "'consumed',(SELECT count(*) FROM public.attendance_geofence_verified_evidence" +
      " WHERE employee_id=" + uid(employee) + " AND status='consumed')" +
      ');',
    'ROLLBACK;',
  ].join('\n');
  const psql = spawnSync('docker', [
    'exec','-i',container,'psql','--username','postgres','--dbname','postgres',
    '--no-psqlrc','--tuples-only','--no-align','--quiet','--set','ON_ERROR_STOP=1',
  ], { cwd: root, input: stmts, encoding: 'utf8', windowsHide: true, timeout: 45000 });
  assert.ifError(psql.error);
  assert.equal(psql.status, 0, String(psql.stderr).slice(0, 1500));
  const last = psql.stdout.trim().split(/\r?\n/u).filter(Boolean).at(-1);
  const observed = JSON.parse(last ?? '{}');
  assert.equal(observed.mock, 'review');
  assert.equal(observed.inside, 'review');
  assert.equal(observed.invalid_interval_rows, 0);
  assert.equal(observed.exception, 'review');
  assert.equal(observed.manual_wins, 'review');
  assert.equal(observed.closed, 'closed');
  assert.equal(observed.duplicate, 'duplicate');
  assert.equal(observed.stale, 'review');
  assert.equal(observed.check_outs, 2, 'Exactly one automatic and one manual checkout');
  assert.equal(observed.consumed, 1);
});
