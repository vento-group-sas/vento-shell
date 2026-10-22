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

test('VPROC-0008 isolated administrative review enforces site scope, decisions, replay and rollback', async () => {
  const { randomUUID } = await import('node:crypto');
  const profile = QA_ISOLATED_PROFILES['GAP-PKG-004'];
  assert.equal(profile.project, 'vento-shell-gap-pkg-004-qa');
  const dockerRun = (command: string, args: string[]) => {
    assert.equal(command, 'docker');
    const output = spawnSync(command, args, {
      cwd: root, encoding: 'utf8', windowsHide: true, timeout: 15000,
    });
    assert.ifError(output.error);
    assert.equal(output.status, 0, 'Only the identified isolated QA Docker container is permitted');
    return output.stdout.trim();
  };
  const container = resolveIsolatedQaDatabaseContainer(dockerRun, profile, root);
  const [worker, reviewer, site, otherSite, shift, checkIn, ticket, newCheckIn, rejectedTicket,
    catalogApp, catalogPermission, genericTicket, staleTicket] =
      Array.from({ length: 13 }, () => randomUUID());
  const u = (id: string) => "'" + id + "'::uuid";
  const stamp = randomUUID().replace(/-/gu, '').slice(0, 14);
  const migration = fs.readFileSync(path.join(
    root, 'supabase/migrations/20261020223916_attendance_geofence_authority.sql',
  ), 'utf8').replace(/^\s*begin;\s*/iu, '').replace(/\s*commit;\s*$/iu, '');
  const rpc = (whichTicket: string, session: string, decision: string,
    reason: string, timestamp = 'NULL') =>
    'public.decide_attendance_checkout_review_v1(' +
    u(whichTicket) + ',' + u(session) + ",'" + decision + "','" + reason + "'," + timestamp + ')';
  const claims = (actor: string) => [
    'SET LOCAL ROLE authenticated;',
    "SELECT set_config('request.jwt.claim.sub','" + actor + "',true);",
    'SELECT set_config(' + "'request.jwt.claims','" +
      JSON.stringify({ sub: actor, role: 'authenticated' }) + "',true);",
  ];
  const resetClaims = ['RESET ROLE;'];
  const reason = 'Salida confirmada con evidencia administrativa de supervisor.';
  const rejection = 'No existe evidencia suficiente para confirmar la salida.';
  const timestamp = "now() - interval '2 minutes'";
  const expectedError = (tag: string, expression: string, sqlState: string, message: string) =>
    'DO $' + tag + '$ BEGIN BEGIN PERFORM ' + expression + ';' +
    " RAISE EXCEPTION 'VPROC0008_UNEXPECTED_APPROVAL';" +
    ' EXCEPTION WHEN SQLSTATE ' + "'" + sqlState + "'" +
    " THEN IF SQLERRM <> '" + message + "' THEN RAISE; END IF;" +
    ' END; END $' + tag + '$;';
  const stmts = [
    'BEGIN;',
    "SET LOCAL statement_timeout='20s';",
    migration,
    'DO $acl$ BEGIN IF has_function_privilege(' +
      "'anon','public.decide_attendance_checkout_review_v1(uuid,uuid,text,text,timestamptz)','EXECUTE'" +
      ") THEN RAISE EXCEPTION 'VPROC0008_ANON_EXECUTE'; END IF; END $acl$;",
    "INSERT INTO auth.users(id,email) VALUES (" + u(worker) + ",'qa-" + stamp +
      "@example.invalid'),(" + u(reviewer) + ",'qa-rev-" + stamp + "@example.invalid');",
    'INSERT INTO public.sites(id,code,name,type,site_kind,is_active,latitude,longitude)' +
      ' VALUES (' + u(site) + ",'REV_" + stamp.toUpperCase() +
      "','QA attendance site','satellite','satellite',true,7.9,-72.5)," +
      '(' + u(otherSite) + ",'REV_B_" + stamp.toUpperCase() +
      "','QA foreign site','satellite','satellite',true,7.9,-72.5);",
    'INSERT INTO public.employees(id,site_id,role,full_name,is_active)' +
      ' VALUES (' + u(worker) + ',' + u(site) + ",'mesero','QA worker',true)," +
      '(' + u(reviewer) + ',' + u(site) + ",'gerente','QA reviewer',true);",
    'INSERT INTO public.employee_shifts' +
      '(id,employee_id,site_id,shift_date,start_time,end_time,shift_kind,status,published_at)' +
      ' VALUES (' + [shift, worker, site].map(u).join(',') +
      ",current_date,'00:00','23:59','laboral','scheduled',now()-interval '1 day');",
    'INSERT INTO public.attendance_logs' +
      '(id,employee_id,site_id,geofence_site_id,shift_id,action,source,occurred_at)' +
      ' VALUES (' + [checkIn, worker, site, site, shift].map(u).join(',') +
      ",'check_in','system',now()-interval '10 minutes');",
    'INSERT INTO public.support_tickets' +
      '(id,created_by,site_id,category,title,description,status)' +
      ' VALUES (' + u(ticket) + ',' + u(worker) + ',' + u(site) +
      ",'attendance','Revisión de salida sin ubicación','Solicitud QA','open');",
    'INSERT INTO public.support_messages(ticket_id,author_id,body)' +
      ' VALUES (' + u(ticket) + ',' + u(worker) + ",'Solicito revisar la salida en la sede.');",
    // Only a purpose-specific ANIMA request created AFTER the open check-in
    // can be reviewed; generic or stale support tickets must fail closed.
    'INSERT INTO public.support_tickets' +
      '(id,created_by,site_id,category,title,description,status)' +
      ' VALUES (' + u(genericTicket) + ',' + u(worker) + ',' + u(site) +
      ",'attendance','Consulta administrativa general','QA generic','open');",
    'INSERT INTO public.support_messages(ticket_id,author_id,body)' +
      ' VALUES (' + u(genericTicket) + ',' + u(worker) + ",'Conversación general.');",
    'INSERT INTO public.support_tickets' +
      '(id,created_by,site_id,category,title,description,status,created_at)' +
      ' VALUES (' + u(staleTicket) + ',' + u(worker) + ',' + u(site) +
      ",'attendance','Revisión de salida sin ubicación','QA stale','open'," +
      "now()-interval '15 minutes');",
    'INSERT INTO public.support_messages(ticket_id,author_id,body)' +
      ' VALUES (' + u(staleTicket) + ',' + u(worker) + ",'Caso previo a la nueva entrada.');",
    // All permissions and grants are transaction-bound; never register them remotely.
    'INSERT INTO public.apps(id,code,name) SELECT ' + u(catalogApp) +
      ",'anima','ANIMA QA' WHERE NOT EXISTS (SELECT 1 FROM public.apps WHERE code='anima');",
    'INSERT INTO public.app_permissions(id,app_id,code,name)' +
      ' SELECT ' + u(catalogPermission) + ",a.id,'attendance.checkout_review.decide','QA local'" +
      " FROM public.apps a WHERE a.code='anima' AND NOT EXISTS" +
      " (SELECT 1 FROM public.app_permissions p WHERE p.app_id=a.id" +
      " AND p.code='attendance.checkout_review.decide');",
    'INSERT INTO public.employee_permissions' +
      '(employee_id,permission_id,is_allowed,scope_type,scope_site_id)' +
      ' SELECT ' + u(reviewer) + ",p.id,true,'site'," + u(otherSite) +
      ' FROM public.app_permissions p JOIN public.apps a ON a.id=p.app_id' +
      " WHERE a.code='anima' AND p.code='attendance.checkout_review.decide';",
    ...claims(reviewer),
    expectedError('foreign_scope', rpc(ticket,checkIn,'approve',reason,timestamp),
      '42501','ATTENDANCE_REVIEW_FORBIDDEN'),
    ...resetClaims,
    'UPDATE public.employee_permissions SET scope_site_id=' + u(site) +
      ' WHERE employee_id=' + u(reviewer) + ' AND permission_id IN' +
      " (SELECT p.id FROM public.app_permissions p JOIN public.apps a ON a.id=p.app_id" +
      " WHERE a.code='anima' AND p.code='attendance.checkout_review.decide');",
    'INSERT INTO public.employee_permissions' +
      '(employee_id,permission_id,is_allowed,scope_type,scope_site_id)' +
      ' SELECT ' + u(worker) + ",p.id,true,'site'," + u(site) +
      ' FROM public.app_permissions p JOIN public.apps a ON a.id=p.app_id' +
      " WHERE a.code='anima' AND p.code='attendance.checkout_review.decide';",
    ...claims(worker),
    expectedError('self_approval',rpc(ticket,checkIn,'approve',reason,timestamp),
      '42501','ATTENDANCE_REVIEW_SELF_APPROVAL_DENIED'),
    ...resetClaims,
    ...claims(reviewer),
    expectedError('generic_ticket',rpc(genericTicket,checkIn,'approve',reason,timestamp),
      'P0002','ATTENDANCE_REVIEW_EVIDENCE_MISSING'),
    expectedError('stale_ticket',rpc(staleTicket,checkIn,'approve',reason,timestamp),
      'P0001','ATTENDANCE_REVIEW_WRONG_SESSION'),
    expectedError('future_time',rpc(ticket,checkIn,'approve',reason,"now()+interval '1 day'"),
      '22023','ATTENDANCE_REVIEW_INVALID'),
    "SELECT set_config('qa.review.applied',result,true) FROM " +
      rpc(ticket,checkIn,'approve',reason,timestamp) + ';',
    "SELECT set_config('qa.review.duplicate',result,true) FROM " +
      rpc(ticket,checkIn,'approve',reason,timestamp) + ';',
    expectedError('conflict',rpc(ticket,checkIn,'approve',reason+' diferente',timestamp),
      '23505','ATTENDANCE_REVIEW_REPLAY_CONFLICT'),
    ...resetClaims,
    'INSERT INTO public.attendance_logs' +
      '(id,employee_id,site_id,geofence_site_id,shift_id,action,source,occurred_at)' +
      ' VALUES (' + [newCheckIn, worker, site, site, shift].map(u).join(',') +
      ",'check_in','system',now()-interval '1 minute');",
    'INSERT INTO public.support_tickets' +
      '(id,created_by,site_id,category,title,description,status)' +
      ' VALUES (' + u(rejectedTicket) + ',' + u(worker) + ',' + u(site) +
      ",'attendance','Revisión de salida sin ubicación','Caso de prueba','open');",
    'INSERT INTO public.support_messages(ticket_id,author_id,body)' +
      ' VALUES (' + u(rejectedTicket) + ',' + u(worker) +
      ",'No tengo evidencia verificable de salida.');",
    ...claims(reviewer),
    "SELECT set_config('qa.review.rejected',result,true) FROM " +
      rpc(rejectedTicket,newCheckIn,'reject',rejection) + ';',
    ...resetClaims,
    "SELECT json_build_object('approved',current_setting('qa.review.applied')," +
      "'duplicate',current_setting('qa.review.duplicate')," +
      "'rejected',current_setting('qa.review.rejected')," +
      "'decisions',(SELECT count(*) FROM public.attendance_administrative_decisions" +
        ' WHERE employee_id=' + u(worker) + '),' +
      "'approved_exits',(SELECT count(*) FROM public.attendance_logs" +
        " WHERE employee_id=" + u(worker) +
        " AND action='check_out' AND client_event_id='attendance-admin-review:" + ticket + "')," +
      "'rejected_exits',(SELECT count(*) FROM public.attendance_logs" +
        " WHERE client_event_id='attendance-admin-review:" + rejectedTicket + "')," +
      "'original_checkin',(SELECT count(*) FROM public.attendance_logs WHERE id=" +
        u(checkIn) + " AND action='check_in')," +
      "'resolved',(SELECT count(*) FROM public.support_tickets WHERE id IN(" +
        [ticket,rejectedTicket].map(u).join(',') + ") AND status='resolved')," +
      "'notifications',(SELECT count(*) FROM public.support_messages WHERE author_id=" +
        u(reviewer) + " AND ticket_id IN (" + [ticket,rejectedTicket].map(u).join(',') + "))" +
      ');',
    'ROLLBACK;',
  ].join('\n');
  const psql = spawnSync('docker', [
    'exec','-i',container,'psql','--username','postgres','--dbname','postgres',
    '--no-psqlrc','--tuples-only','--no-align','--quiet','--set','ON_ERROR_STOP=1',
  ], { cwd:root,input:stmts,encoding:'utf8',windowsHide:true,timeout:60000 });
  assert.ifError(psql.error);
  assert.equal(psql.status,0,String(psql.stderr).slice(0,1500));
  const result = JSON.parse(psql.stdout.trim().split(/\r?\n/u).filter(Boolean).at(-1) ?? '{}');
  assert.equal(result.approved,'applied');
  assert.equal(result.duplicate,'duplicate');
  assert.equal(result.rejected,'applied');
  assert.equal(result.decisions,2);
  assert.equal(result.approved_exits,1);
  assert.equal(result.rejected_exits,0);
  assert.equal(result.original_checkin,1);
  assert.equal(result.resolved,2);
  assert.equal(result.notifications,2);
  // All fixtures, grants, functions and SQL candidate were rolled back together.
  console.log('VPROC0008_ISOLATED_ADMIN_REVIEW: PASS; rollback=transactional');
});

