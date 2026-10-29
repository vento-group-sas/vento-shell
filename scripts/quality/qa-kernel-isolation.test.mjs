import assert from 'node:assert/strict';
import { test } from 'node:test';
import { loadCatalog, TARGET_ENVIRONMENT } from './qa-kernel.mjs';
import {
  planIsolatedBegin, attestAuthorizedSession, buildRunRequest,
  attestRunReceipt, classifyLocalStatus, buildEndRequest, attestTerminalEvidence,
  classifyNoStackRecovery,
} from './qa-kernel-isolation.mjs';

const catalog = loadCatalog();
const source = Object.freeze({
  repository: 'vento-group-sas/vento-shell',
  branch: 'infra/qa-kernel-f0',
  head: 'a'.repeat(40),
  clean: true,
  staged_count: 0,
  environment: TARGET_ENVIRONMENT,
});
const inventory = Object.freeze({
  migrations: 22,
  tests: 25,
  source_sha256: 'b'.repeat(64),
  migrations_sha256: 'c'.repeat(64),
});
const sessionId = 'LOCAL-QA::4DA5538E525BC91D44E3D5F998267802';
const tests = [
  'supabase/tests/database/000_schema_harness.test.sql',
  ...Array.from({ length: 24 }, (_, i) =>
    'supabase/tests/database/' + String(100 + i) + '_synthetic.test.sql'),
];
const beginPlan = () => planIsolatedBegin({
  catalog, profileId:'foundation-baseline', source, sourceInventory:inventory,
  availableTests:tests, workspace:12,
});
const authorized = (change={})=>({
  status:'AUTHORIZED',
  session_id:sessionId, workspace:12, branch:source.branch, head:source.head,
  source_fingerprint:inventory.source_sha256,
  project_fingerprint:'d'.repeat(64),
  adapters:[], migrations:22, tests:25,
  qa_acl_compat_profile:false, qa_viso_app_fixture:false,
  pre_gap_catalog_probe:false,local_only:true,remote_mutations:false,
  ...change,
});
const context = () => attestAuthorizedSession({
  request:beginPlan(),receipt:authorized(),
});
const status = (change={})=>({
  session_id:sessionId,branch:source.branch,head:source.head,
  status:'RUNNING',stage:'BOOTSTRAP',running:true,tests_completed:0,...change,
});
const artifact = (change={})=>({
  session_id:sessionId,source_head:source.head,
  source_fingerprint:inventory.source_sha256,
  terminal:'PASS',direct_parity_without_adapters:true,
  prebaseline_acl_override:false,qa_acl_compat_profile:false,adapter_hashes:[],
  stack_started:true,
  pgTap_summary:{
    files_requested:1,files_completed:1,files_pass:1,files_fail:0,
    files_blocked:0,files_pending:0,direct_parity_without_adapters:true,
  },
  events:[{stage:'TEST',status:'PASS'}],
  ...change,
});
const ended=(change={})=>({
  session_id:sessionId,status:'STOPPED',cleanup:'RETAINED',
  docker_volumes_deleted:false,...change,
});
const postflight=(change={})=>({
  session_id:sessionId,source_head:source.head,
  source_fingerprint:inventory.source_sha256,
  docker_inspected:true,owner_verified:true,
  process_termination_verified:true,running_owned_containers:0,
  unverified_consumers:0,persistent_stack_modified:false,
  remote_mutations:false,docker_volumes_deleted:false,...change,
});

const recoveryInspection=(ctx=context(),changes={})=>({
  status:'PASS',branch:ctx.source.branch,head:ctx.source.head,
  registered_count:1,candidates:[{
    session_id:ctx.session_id,mode:'STOP_ONLY_FROM_VOUCHER',
    source_identity_verified:true,process_quiescence_verified:true,
    sensitive_recovery_blocked:false,docker_owner_verified:false,
  }],...changes,
});
const noStackClosure=(ctx=context(),changes={})=>({
  status:'CLOSED_NO_STACK',session_id:ctx.session_id,cleanup:'RETAINED',
  stack_absence_verified:true,stop_executed:false,
  docker_containers_inspected:16,docker_volumes_deleted:false,
  remote_mutations:false,pgTap_certified:false,...changes,
});

test('no-stack recovery acknowledges closure but not Docker or SQL certification',()=>{
  const result=classifyNoStackRecovery({
    context:context(),inspection:recoveryInspection(),closure:noStackClosure(),
  });
  assert.equal(result.status,'BLOCKED');
  assert.equal(result.lifecycle,'CLOSED_NO_STACK');
  assert.equal(result.reason,'END_POSTFLIGHT_PROOF_MISSING');
  assert.equal(result.closure_reported,true);
  for(const key of ['cleanup_attested','qa_executed','pg_tap_certified','direct_parity'])
    assert.equal(result[key],false);
});
test('no-stack classification works for two independent source identities',()=>{
  const second={...context(),session_id:'LOCAL-QA::'+'F'.repeat(32),
    source:{...context().source,head:'f'.repeat(40)},
    source_fingerprint:'e'.repeat(64),project_fingerprint:'f'.repeat(64)};
  for(const ctx of [context(),second]){
    const result=classifyNoStackRecovery({context:ctx,
      inspection:recoveryInspection(ctx),closure:noStackClosure(ctx,{docker_containers_inspected:0})});
    assert.equal(result.session_id,ctx.session_id);
    assert.equal(result.status,'BLOCKED');
    assert.equal(result.pg_tap_certified,false);
  }
});
test('no-stack recovery rejects foreign or unverified inspected vouchers',()=>{
  const base=recoveryInspection();
  const candidate=base.candidates[0];
  for(const bad of [
    {status:'FAIL'},{branch:'foreign'},{head:'f'.repeat(40)},
    {registered_count:2},{candidates:[]},{candidates:[candidate,candidate]},
    {candidates:[{...candidate,session_id:'other'}]},
    {candidates:[{...candidate,mode:'FORCE_STOP'}]},
    {candidates:[{...candidate,source_identity_verified:false}]},
    {candidates:[{...candidate,process_quiescence_verified:false}]},
    {candidates:[{...candidate,sensitive_recovery_blocked:true}]},
  ]) assert.throws(()=>classifyNoStackRecovery({context:context(),
    inspection:recoveryInspection(context(),bad),closure:noStackClosure()}),
    /QA_KERNEL_F1_RECOVERY_SCOPE_UNVERIFIED/u);
});
test('no-stack closure rejects dangerous operations and forged PASS',()=>{
  for(const bad of [
    {status:'PASS'},{session_id:'other'},{cleanup:'DELETED'},
    {stack_absence_verified:false},{stop_executed:true},
    {docker_containers_inspected:-1},{docker_containers_inspected:1.5},
    {docker_volumes_deleted:true},{remote_mutations:true},{pgTap_certified:true},
  ]) assert.throws(()=>classifyNoStackRecovery({context:context(),
    inspection:recoveryInspection(),closure:noStackClosure(context(),bad)}),
    /QA_KERNEL_F1_RECOVERY_RECEIPT_INVALID/u);
  for(const forged of [{cleanup_attested:true},{host_authorization:true},
    {password:'private'}]) assert.throws(()=>classifyNoStackRecovery({
    context:context(),inspection:recoveryInspection(),
    closure:noStackClosure(context(),forged)}),
    /QA_KERNEL_F1_RECOVERY_RECEIPT_KEYS_INVALID/u);
});
test('claimed postflight PASS cannot compensate for missing durable end proof',()=>{
  const result=classifyNoStackRecovery({context:context(),
    inspection:recoveryInspection(),closure:noStackClosure(),
    postflight:{status:'PASS',owner_verified:true,cleanup_attested:true}});
  assert.equal(result.cleanup_attested,false);
  assert.equal(result.pg_tap_certified,false);
  assert.throws(()=>attestTerminalEvidence({
    context:context(),artifact:artifact(),end:noStackClosure(),postflight:postflight(),
  }),/QA_KERNEL_F1_TERMINAL_PROVENANCE_UNVERIFIED/u);
});

test('foundation F1 baseline requires one real SQL test in own source',()=>{
  const v=beginPlan();
  assert.equal(v.profile,'foundation-baseline');
  assert.equal(v.status,'PENDING');
  assert.equal(v.mode,'DIRECT_PARITY_ONLY');
  assert.equal(v.environment,'QA_LOCAL_ISOLATED');
  assert.equal(v.remote_mutations,false);
  assert.equal(v.pg_tap_certified,false);
  assert.deepEqual(v.test_files,['supabase/tests/database/000_schema_harness.test.sql']);
});
test('begin arguments are fixed to MCP owner, Git SHA and no ACL adapters',()=>{
  const request=beginPlan();
  assert.deepEqual(Object.keys(request.begin).sort(),[
    'expected_branch','expected_head','pre_gap_catalog_probe',
    'pre_gap_viso_app_fixture','qa_acl_compat_profile','reason','workspace',
  ].sort());
  assert.equal(request.begin.workspace,12);
  assert.equal(request.begin.expected_head,source.head);
  assert.equal(request.begin.qa_acl_compat_profile,false);
  assert.equal(request.begin.pre_gap_viso_app_fixture,false);
  assert.equal(request.begin.pre_gap_catalog_probe,false);
  assert.ok(!JSON.stringify(request).includes('instance_id'));
});
test('preflight rejects different Git SHA and staged/dirty worktree',()=>{
  for(const v of [{head:'a'.repeat(39)},{staged_count:2},{clean:false},
    {environment:'STAGING'}]){
    assert.throws(()=>planIsolatedBegin({catalog,profileId:'foundation-baseline',
      source:{...source,...v},sourceInventory:inventory,
      availableTests:tests,workspace:12}),/QA_KERNEL_/);
  }
});
test('preflight rejects unknown/missing tests and mismatched inventory counts',()=>{
  const input={catalog,profileId:'foundation-baseline',source,
    sourceInventory:inventory,availableTests:tests,workspace:12};
  assert.throws(()=>planIsolatedBegin({...input,availableTests:[]}),
    /QA_KERNEL_F1_PROFILE_SOURCE_INCOMPLETE/);
  assert.throws(()=>planIsolatedBegin({...input,sourceInventory:{...inventory,tests:24}}),
    /QA_KERNEL_F1_SOURCE_INVENTORY_INVALID/);
  assert.throws(()=>planIsolatedBegin({...input,workspace:-1}),
    /QA_KERNEL_F1_WORKSPACE_INVALID/);
  assert.throws(()=>planIsolatedBegin({...input,sourceInventory:{...inventory,db_url:'x'}}),
    /QA_KERNEL_F1_SOURCE_INVENTORY_KEYS_INVALID/);
});
test('valid authorized session confirms fingerprint, branch, source and owner',()=>{
  const v=context();
  assert.equal(v.session_id,sessionId);
  assert.equal(v.source_fingerprint,inventory.source_sha256);
  assert.equal(v.project_fingerprint,'d'.repeat(64));
  assert.equal(v.mode,'DIRECT_PARITY_ONLY');
  assert.equal(v.local_only,true);
  assert.equal(v.remote_mutations,false);
  assert.equal(v.certified,false);
});
test('authorized receipt blocks foreign session, SHA drift and remote mutation',()=>{
  for(const variant of [
    {session_id:'other'}, {workspace:6},{head:'e'.repeat(40)},
    {branch:'infra/package-gate-gap-pkg-004'}, {source_fingerprint:'e'.repeat(64)},
    {project_fingerprint:'bad'}, {migrations:23},{tests:26},
    {local_only:false},{remote_mutations:true},{status:'READY'},
  ])assert.throws(()=>attestAuthorizedSession({
    request:beginPlan(),receipt:authorized(variant),
  }),/QA_KERNEL_F1_BEGIN_RECEIPT_MISMATCH/);
});
test('adapted QA never passes for DIRECT_PARITY_ONLY',()=>{
  for(const variant of [
    {qa_acl_compat_profile:true},{pre_gap_catalog_probe:true},
    {qa_viso_app_fixture:true},{adapters:[{after_version:'20260827143711'}]},
  ])assert.throws(()=>attestAuthorizedSession({
    request:beginPlan(),receipt:authorized(variant),
  }),/QA_KERNEL_F1_ADAPTED_QA_NOT_DIRECT_PARITY/);
});
test('run accepts exactly the catalog test without shell commands',()=>{
  const q=buildRunRequest(context());
  assert.deepEqual(q,{
    session_id:sessionId,action:'start_and_test',
    test_files:['supabase/tests/database/000_schema_harness.test.sql'],
  });
  assert.ok(!JSON.stringify(q).includes('db reset'));
  assert.ok(!JSON.stringify(q).includes('--linked'));
});
test('run response RUNNING is PENDING, never SQL PASS',()=>{
  const c=context();
  assert.deepEqual(attestRunReceipt({context:c,receipt:{
    status:'RUNNING',session_id:sessionId,action:'start_and_test',
    tests:1,local_only:true,
  }}),{status:'PENDING',stage:'RUNNING',qa_executed:false});
  for(const v of [{status:'PASS'},{tests:2},{local_only:false},
    {session_id:'LOCAL-QA::'+ 'A'.repeat(32)}]){
    assert.throws(()=>attestRunReceipt({context:c,receipt:{
      status:'RUNNING',session_id:sessionId,action:'start_and_test',
      tests:1,local_only:true,...v,
    }}),/QA_KERNEL_F1_RUN_RECEIPT_MISMATCH/);
  }
});
test('bootstrap RUNNING never certifies migration replay',()=>{
  assert.deepEqual(classifyLocalStatus({context:context(),status:status()}),
    {status:'PENDING',stage:'BOOTSTRAP',qa_executed:false});
});
test('observed AUTH_DB_005 replay error returns FAIL with original classification',()=>{
  const observed=status({
    status:'FAIL',stage:'BOOTSTRAP',running:false,
    code:'AUTH_DB_005_ANON_DML_IDENTITY_DRIFT:246',
    diagnostic:{category:'MIGRATION',sqlstate:'P0001',output_sha256:'x'},
  });
  assert.deepEqual(classifyLocalStatus({context:context(),status:observed}),{
    status:'FAIL',stage:'BOOTSTRAP',category:'MIGRATION',
    code:'AUTH_DB_005_ANON_DML_IDENTITY_DRIFT:246',
    qa_executed:false,pg_tap_certified:false,
  });
});
test('aborted bootstrap without SQLSTATE is a PROCESS failure, not migration SQL drift',()=>{
  const c=context();
  const observed=status({status:'FAIL',running:false,code:'ABORTED',
    diagnostic:{category:'MIGRATION',sqlstate:null}});
  const classified=classifyLocalStatus({context:c,status:observed});
  assert.equal(classified.status,'FAIL');
  assert.equal(classified.category,'PROCESS');
  assert.equal(classified.qa_executed,false);
  const terminated=attestTerminalEvidence({context:c,
    artifact:artifact({terminal:'FAIL',events:[{stage:'BOOTSTRAP',status:'FAIL',
      code:'ABORTED',diagnostic:{category:'MIGRATION',sqlstate:null}}]}),
    end:ended()});
  assert.equal(terminated.status,'FAIL');
  assert.equal(terminated.failure_type,'PROCESS_INTERRUPTED');
  assert.equal(terminated.cleanup_attested,false);
});

test('status from another session and untrusted diagnostics fail closed',()=>{
  assert.throws(()=>classifyLocalStatus({context:context(),status:status({
    head:'e'.repeat(40),
  })}),/QA_KERNEL_F1_STATUS_RECEIPT_MISMATCH/);
  assert.deepEqual(classifyLocalStatus({context:context(),status:status({
    status:'FAIL',running:false,
    code:'secret postgres://hidden',
    diagnostic:{category:'SHELL'},
  })}).code,'UNCLASSIFIED_RUNTIME_FAILURE');
});
test('unknown status is blocked, never interpreted as PASS',()=>{
  const x=classifyLocalStatus({context:context(),status:status({
    status:'SUCCESS',running:false,
  })});
  assert.equal(x.status,'BLOCKED');
  assert.equal(x.pg_tap_certified,false);
});
test('end request retains files and never commands Docker volumes deletion',()=>{
  assert.deepEqual(buildEndRequest(context()),{
    session_id:sessionId,cleanup_files:false,
  });
});
test('first real failure remains FAIL after STOPPED and no SQL test executed',()=>{
  const result=attestTerminalEvidence({
    context:context(),
    artifact:artifact({
      terminal:'FAIL',direct_parity_without_adapters:false,
      stack_started:false,pgTap:[],
      pgTap_summary:{
        files_requested:null,files_completed:0,files_pass:0,files_fail:0,
        files_blocked:0,files_pending:null,direct_parity_without_adapters:false,
      },
      events:[{stage:'BOOTSTRAP',status:'FAIL',
        code:'AUTH_DB_005_ANON_DML_IDENTITY_DRIFT:246'}],
    }),
    end:ended(),
  });
  assert.equal(result.status,'FAIL');
  assert.equal(result.code,'AUTH_DB_005_ANON_DML_IDENTITY_DRIFT:246');
  assert.equal(result.cleanup_attested,false);
  assert.equal(result.failure_type,'EXECUTION_FAILURE');
  assert.equal(result.pg_tap_certified,false);
  assert.equal(result.qa_executed,false);
});
test('partial SQL FAIL acknowledges executed pgTAP but never certifies',()=>{
  const result=attestTerminalEvidence({context:context(),
    artifact:artifact({terminal:'FAIL',pgTap_summary:{
      ...artifact().pgTap_summary,files_fail:1,
    },events:[{stage:'TEST',status:'FAIL',code:'QA_TEST_FAILED'}]}),
    end:ended()});
  assert.equal(result.status,'FAIL');
  assert.equal(result.qa_executed,true);
  assert.equal(result.pg_tap_certified,false);
});
test('synthetic all-PASS receipt certifies only when direct and cleaned',()=>{
  const result=attestTerminalEvidence({context:context(),artifact:artifact(),
    end:ended(),postflight:postflight()});
  assert.equal(result.status,'PASS');
  assert.equal(result.pg_tap_certified,true);
  assert.equal(result.direct_parity,true);
  assert.equal(result.cleanup_attested,true);
});
test('STOPPED without independent Docker postflight blocks certification',()=>{
  const missing=attestTerminalEvidence({context:context(),artifact:artifact(),end:ended()});
  assert.equal(missing.status,'BLOCKED');
  assert.equal(missing.reason,'POSTFLIGHT_OWNER_ATTESTATION_MISSING');
  assert.equal(missing.cleanup_attested,false);
  assert.equal(missing.qa_executed,true);
  assert.equal(missing.pg_tap_certified,false);
  for (const bad of [
    postflight({session_id:'LOCAL-QA::'+'E'.repeat(32)}),
    postflight({source_head:'e'.repeat(40)}),
    postflight({source_fingerprint:'e'.repeat(64)}),
    postflight({docker_inspected:false}),
    postflight({owner_verified:false}),
    postflight({process_termination_verified:false}),
    postflight({running_owned_containers:1}),
    postflight({unverified_consumers:1}),
    postflight({persistent_stack_modified:true}),
    postflight({remote_mutations:true}),
    postflight({docker_volumes_deleted:true}),
  ]) {
    const result=attestTerminalEvidence({context:context(),artifact:artifact(),
      end:ended(),postflight:bad});
    assert.equal(result.status,'BLOCKED');
    assert.equal(result.cleanup_attested,false);
  }
  const wrongEnd=attestTerminalEvidence({context:context(),artifact:artifact(),
    end:ended({cleanup:'UNVERIFIED'}),postflight:postflight()});
  assert.equal(wrongEnd.cleanup_attested,false);
});

test('adapted run, missing tests, incomplete cleanup and spoofed PASS block certification',()=>{
  for (const changes of [
    {direct_parity_without_adapters:false},
    {qa_acl_compat_profile:true},
    {prebaseline_acl_override:true},
    {adapter_hashes:['a'.repeat(64)]},
    {stack_started:false},
    {terminal:'RUNNING'},
    {pgTap_summary:{...artifact().pgTap_summary,files_completed:0}},
    {pgTap_summary:{...artifact().pgTap_summary,files_fail:1}},
    {pgTap_summary:{...artifact().pgTap_summary,direct_parity_without_adapters:false}},
  ]) {
    const result=attestTerminalEvidence({
      context:context(),artifact:artifact(changes),end:ended(),
      postflight:postflight(),
    });
    assert.equal(result.status,'BLOCKED');
    assert.equal(result.pg_tap_certified,false);
  }
  for(const end of [ended({status:'RUNNING'}),
    ended({docker_volumes_deleted:true}),ended({session_id:'spoof'})]) {
    assert.throws(()=>attestTerminalEvidence({
      context:context(),artifact:artifact(),end,
    }),/QA_KERNEL_F1_TERMINAL_PROVENANCE_UNVERIFIED/);
  }
});
test('no remote staging, password or container controls appear in F1 surface',()=>{
  const serialized=JSON.stringify(beginPlan());
  for(const fragment of ['rcrxixmqhrndcervbllp','password','docker volume rm',
    '--db-url','production','service_role']){
    assert.ok(!serialized.includes(fragment),fragment);
  }
});
