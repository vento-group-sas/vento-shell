// VENTO QA Kernel F1: strict, read-only contract for the governed MCP
// local_qa_begin/run/status/artifact/end interface. No Docker/SQL/process calls.
// The MCP runtime performs the real operations with separate local consent.
import { planWorkload, KERNEL_ID, TARGET_ENVIRONMENT } from './qa-kernel.mjs';

const SHA256 = /^[a-f0-9]{64}$/u;
const SESSION_ID = /^LOCAL-QA::[A-F0-9]{32}$/u;
const ERROR_CODE = /^[A-Z][A-Z0-9_:-]{1,159}$/u;
const SHA40 = /^[a-f0-9]{40}$/u;

function deny(code) {
  throw new Error('QA_KERNEL_F1_' + code);
}
function record(value) {
  return value !== null && typeof value === 'object' && !Array.isArray(value);
}
function exact(value, keys, code) {
  if (!record(value) || Object.keys(value).some((key) => !keys.includes(key))) deny(code);
}
function positiveInteger(value) {
  return Number.isSafeInteger(value) && value > 0;
}
function validSession(sessionId) {
  return typeof sessionId === 'string' && SESSION_ID.test(sessionId);
}
function assertContext(value) {
  if (!record(value) || value.kernel_id !== KERNEL_ID
    || !validSession(value.session_id) || !record(value.source)
    || typeof value.source.branch !== 'string'
    || !SHA40.test(value.source.head)
    || !SHA256.test(value.source_fingerprint)
    || !SHA256.test(value.project_fingerprint)
    || value.local_only !== true
    || value.remote_mutations !== false) deny('SESSION_CONTEXT_INVALID');
}
function noCompatEvidence(receipt) {
  if (receipt.qa_acl_compat_profile !== false ||
    receipt.qa_viso_app_fixture !== false ||
    receipt.pre_gap_catalog_probe !== false ||
    !Array.isArray(receipt.adapters) || receipt.adapters.length !== 0) {
    deny('ADAPTED_QA_NOT_DIRECT_PARITY');
  }
}

// Builds only arguments for the existing, owner-attested VS Code MCP tool.
// Never shells out, configures Docker, or applies migrations.
export function planIsolatedBegin({
  catalog, profileId, source, availableTests, sourceInventory, workspace,
} = {}) {
  const work = planWorkload({ catalog, profileId, source, availableTests });
  if (work.status !== 'PENDING' || work.missing_test_files.length !== 0) {
    deny('PROFILE_SOURCE_INCOMPLETE');
  }
  if (!Number.isSafeInteger(workspace) || workspace < 0) deny('WORKSPACE_INVALID');
  exact(sourceInventory,
    ['migrations', 'tests', 'source_sha256', 'migrations_sha256'],
    'SOURCE_INVENTORY_KEYS_INVALID');
  if (!positiveInteger(sourceInventory.migrations) ||
    !positiveInteger(sourceInventory.tests) ||
    !SHA256.test(sourceInventory.source_sha256) ||
    !SHA256.test(sourceInventory.migrations_sha256) ||
    !Array.isArray(availableTests) ||
    availableTests.length !== sourceInventory.tests ||
    work.test_files.length > 700) deny('SOURCE_INVENTORY_INVALID');

  const reason = 'VENTO QA Kernel F1: isolated direct-parity PostgreSQL test for ' +
    work.profile + ', tied to a verified Git SHA; no QA adapters, remote SQL or shared stack reset.';
  const begin = {
    workspace,
    expected_branch: work.source.branch,
    expected_head: work.source.head,
    reason,
    qa_acl_compat_profile: false,
    pre_gap_catalog_probe: false,
    pre_gap_viso_app_fixture: false,
  };
  return Object.freeze({
    kernel_id: KERNEL_ID,
    profile: work.profile,
    plan_sha256: work.plan_sha256,
    environment: TARGET_ENVIRONMENT,
    mode: 'DIRECT_PARITY_ONLY',
    source: work.source,
    source_inventory: { ...sourceInventory },
    test_files: [...work.test_files],
    begin,
    status: 'PENDING',
    remote_mutations: false,
    pg_tap_certified: false,
  });
}

// The actual MCP response must prove that it approved a distinct, exact SHA
// session without the GAP-specific compatibility profile.
export function attestAuthorizedSession({ request, receipt } = {}) {
  if (!record(request) || request.kernel_id !== KERNEL_ID ||
    request.mode !== 'DIRECT_PARITY_ONLY' || !record(request.begin) ||
    !record(request.source_inventory)) deny('REQUEST_INVALID');
  if (!record(receipt) || receipt.status !== 'AUTHORIZED' ||
    !validSession(receipt.session_id) ||
    receipt.workspace !== request.begin.workspace ||
    receipt.branch !== request.begin.expected_branch ||
    receipt.head !== request.begin.expected_head ||
    receipt.source_fingerprint !== request.source_inventory.source_sha256 ||
    !SHA256.test(receipt.project_fingerprint) ||
    receipt.migrations !== request.source_inventory.migrations ||
    receipt.tests !== request.source_inventory.tests ||
    receipt.local_only !== true ||
    receipt.remote_mutations !== false) deny('BEGIN_RECEIPT_MISMATCH');
  noCompatEvidence(receipt);
  return Object.freeze({
    kernel_id: KERNEL_ID,
    session_id: receipt.session_id,
    profile: request.profile,
    plan_sha256: request.plan_sha256,
    source: request.source,
    source_fingerprint: receipt.source_fingerprint,
    project_fingerprint: receipt.project_fingerprint,
    test_files: [...request.test_files],
    environment: TARGET_ENVIRONMENT,
    mode: 'DIRECT_PARITY_ONLY',
    local_only: true,
    remote_mutations: false,
    certified: false,
  });
}

export function buildRunRequest(context) {
  assertContext(context);
  if (!Array.isArray(context.test_files) ||
    context.test_files.length === 0 ||
    context.test_files.length > 700) deny('TEST_SET_INVALID');
  return {
    session_id: context.session_id,
    action: 'start_and_test',
    test_files: [...context.test_files],
  };
}

export function attestRunReceipt({ context, receipt } = {}) {
  assertContext(context);
  if (!record(receipt) || receipt.status !== 'RUNNING'
    || receipt.session_id !== context.session_id
    || receipt.action !== 'start_and_test'
    || receipt.tests !== context.test_files.length
    || receipt.local_only !== true) deny('RUN_RECEIPT_MISMATCH');
  return { status: 'PENDING', stage: 'RUNNING', qa_executed: false };
}

// Running/failed bootstrap cannot become PASS through a fallback bootstrap.
// Diagnostic details remain sanitized; never forward stdout, URLs or secrets.
export function classifyLocalStatus({ context, status } = {}) {
  assertContext(context);
  if (!record(status) ||
    status.session_id !== context.session_id ||
    status.branch !== context.source.branch ||
    status.head !== context.source.head ||
    typeof status.stage !== 'string') deny('STATUS_RECEIPT_MISMATCH');
  if (status.status === 'RUNNING') {
    if (status.running !== true) deny('STATUS_RECEIPT_MISMATCH');
    return { status: 'PENDING', stage: status.stage, qa_executed: false };
  }
  if (status.status === 'FAIL') {
    if (status.running !== false) deny('STATUS_RECEIPT_MISMATCH');
    const code = typeof status.code === 'string' && ERROR_CODE.test(status.code)
      ? status.code : 'UNCLASSIFIED_RUNTIME_FAILURE';
    // A cancelled/aborted bootstrap without a SQLSTATE is a process failure,
    // not evidence that a migration SQL invariant failed.
    const category = code === 'ABORTED' && status.diagnostic?.sqlstate == null
      ? 'PROCESS'
      : ['MIGRATION', 'POSTGRES', 'DOCKER', 'AUTH', 'PGTAP']
        .includes(status.diagnostic?.category) ? status.diagnostic.category : 'OTHER';
    return {
      status: 'FAIL', stage: status.stage, category, code,
      qa_executed: (status.tests_completed ?? 0) > 0,
      pg_tap_certified: false,
    };
  }
  return { status: 'BLOCKED', stage: status.stage, code: 'RUNTIME_STATUS_UNVERIFIED',
    qa_executed: false, pg_tap_certified: false };
}

// Requires an explicit follow-up tool call. Never remove Docker volumes.
export function buildEndRequest(context) {
  assertContext(context);
  return { session_id: context.session_id, cleanup_files: false };
}

// The MCP can close an abandoned voucher when its stack never existed.
// That is a lifecycle outcome, NOT durable Docker cleanup or SQL evidence.
// No caller-supplied flags may promote this legacy receipt to PASS.
export function classifyNoStackRecovery({ context, inspection, closure, postflight } = {}) {
  assertContext(context);
  const candidates = inspection?.candidates;
  const candidate = Array.isArray(candidates) && candidates.length === 1
    ? candidates[0] : null;
  if (!record(inspection) || inspection.status !== 'PASS' ||
    inspection.branch !== context.source.branch ||
    inspection.head !== context.source.head ||
    inspection.registered_count !== 1 ||
    !record(candidate) || candidate.session_id !== context.session_id ||
    candidate.mode !== 'STOP_ONLY_FROM_VOUCHER' ||
    candidate.source_identity_verified !== true ||
    candidate.process_quiescence_verified !== true ||
    candidate.sensitive_recovery_blocked !== false) {
    deny('RECOVERY_SCOPE_UNVERIFIED');
  }
  exact(closure, [
    'status', 'session_id', 'cleanup', 'stack_absence_verified',
    'stop_executed', 'docker_containers_inspected',
    'docker_volumes_deleted', 'remote_mutations', 'pgTap_certified',
    'durable_absence_proof_recorded',
  ], 'RECOVERY_RECEIPT_KEYS_INVALID');
  if (closure.status !== 'CLOSED_NO_STACK' ||
    closure.session_id !== context.session_id ||
    closure.cleanup !== 'RETAINED' ||
    closure.stack_absence_verified !== true ||
    closure.stop_executed !== false ||
    !Number.isSafeInteger(closure.docker_containers_inspected) ||
    closure.docker_containers_inspected < 0 ||
    closure.docker_volumes_deleted !== false ||
    closure.remote_mutations !== false ||
    closure.pgTap_certified !== false ||
    (closure.durable_absence_proof_recorded !== undefined &&
      closure.durable_absence_proof_recorded !== true)) {
    deny('RECOVERY_RECEIPT_INVALID');
  }
  const keys = [
    'status', 'lifecycle', 'session_id', 'source_head',
    'source_fingerprint', 'durable_absence_proof_verified',
    'docker_inspected', 'docker_containers_inspected',
    'stack_absence_verified', 'process_quiescence_verified',
    'owner_verified', 'cleanup_attested', 'pg_tap_certified',
    'replay_certified', 'remote_mutations', 'docker_volumes_deleted',
  ];
  const reviewed = closure.durable_absence_proof_recorded === true &&
    record(postflight) &&
    Object.keys(postflight).length === keys.length &&
    Object.keys(postflight).every(key => keys.includes(key)) &&
    postflight.status === 'ATTESTED_NO_STACK' &&
    postflight.lifecycle === 'CLOSED_NO_STACK' &&
    postflight.session_id === context.session_id &&
    postflight.source_head === context.source.head &&
    postflight.source_fingerprint === context.source_fingerprint &&
    postflight.durable_absence_proof_verified === true &&
    postflight.docker_inspected === true &&
    Number.isSafeInteger(postflight.docker_containers_inspected) &&
    postflight.docker_containers_inspected >= 0 &&
    postflight.stack_absence_verified === true &&
    postflight.process_quiescence_verified === true &&
    postflight.owner_verified === false &&
    postflight.cleanup_attested === false &&
    postflight.pg_tap_certified === false &&
    postflight.replay_certified === false &&
    postflight.remote_mutations === false &&
    postflight.docker_volumes_deleted === false;
  return Object.freeze({
    status: reviewed ? 'ATTESTED_NO_STACK' : 'BLOCKED',
    lifecycle: 'CLOSED_NO_STACK',
    reason: reviewed ? 'NO_STACK_ABSENCE_ATTESTED' : 'END_POSTFLIGHT_PROOF_MISSING',
    closure_reported: true,
    no_stack_absence_attested: reviewed,
    cleanup_attested: false,
    qa_executed: false,
    pg_tap_certified: false,
    direct_parity: false,
    session_id: context.session_id,
  });
}

// STOPPED is only a lifecycle receipt, not independent proof of Docker
// ownership, stopped processes or absence of residual consumers. Never turn
// that receipt into cleanup_attested without separately verified postflight.
function independentPostflightVerified(context, end, postflight) {
  return end.cleanup === 'RETAINED' &&
    record(postflight) &&
    postflight.session_id === context.session_id &&
    postflight.source_head === context.source.head &&
    postflight.source_fingerprint === context.source_fingerprint &&
    postflight.docker_inspected === true &&
    postflight.owner_verified === true &&
    postflight.process_termination_verified === true &&
    postflight.running_owned_containers === 0 &&
    postflight.unverified_consumers === 0 &&
    postflight.persistent_stack_modified === false &&
    postflight.remote_mutations === false &&
    postflight.docker_volumes_deleted === false;
}

// Only exact SQL PASS + no adapters + independently verified postflight may
// certify F1. A failed run remains FAIL even if STOPPED was received.
export function attestTerminalEvidence({ context, artifact, end, postflight } = {}) {
  assertContext(context);
  if (!record(artifact) || artifact.session_id !== context.session_id
    || artifact.source_head !== context.source.head
    || artifact.source_fingerprint !== context.source_fingerprint
    || !record(end) || end.session_id !== context.session_id ||
    end.status !== 'STOPPED' || end.docker_volumes_deleted !== false) {
    deny('TERMINAL_PROVENANCE_UNVERIFIED');
  }
  const cleanupAttested = independentPostflightVerified(context, end, postflight);
  if (artifact.terminal === 'FAIL') {
    const last = Array.isArray(artifact.events) ? artifact.events.at(-1) : null;
    const code = typeof last?.code === 'string' && ERROR_CODE.test(last.code)
      ? last.code : 'UNCLASSIFIED_RUNTIME_FAILURE';
    return {
      status: 'FAIL', stage: last?.stage ?? 'UNKNOWN', code,
      failure_type: code === 'ABORTED' && last?.diagnostic?.sqlstate == null
        ? 'PROCESS_INTERRUPTED' : 'EXECUTION_FAILURE',
      qa_executed: Number.isSafeInteger(artifact.pgTap_summary?.files_completed)
        && artifact.pgTap_summary.files_completed > 0,
      pg_tap_certified: false, cleanup_attested: cleanupAttested,
      direct_parity: false, session_id: context.session_id,
    };
  }
  const pgtap = artifact.pgTap_summary;
  const replayPassed = artifact.terminal === 'PASS' &&
    artifact.direct_parity_without_adapters === true &&
    artifact.prebaseline_acl_override === false &&
    artifact.qa_acl_compat_profile === false &&
    Array.isArray(artifact.adapter_hashes) &&
    artifact.adapter_hashes.length === 0 &&
    artifact.stack_started === true &&
    record(pgtap) && pgtap.files_requested === context.test_files.length &&
    pgtap.files_completed === context.test_files.length &&
    pgtap.files_pass === context.test_files.length &&
    pgtap.files_fail === 0 && pgtap.files_blocked === 0 &&
    pgtap.files_pending === 0 &&
    pgtap.direct_parity_without_adapters === true;
  const certified = replayPassed && cleanupAttested;
  return {
    status: certified ? 'PASS' : 'BLOCKED',
    reason: certified ? 'DIRECT_REPLAY_AND_TESTS_CERTIFIED'
      : replayPassed ? 'POSTFLIGHT_OWNER_ATTESTATION_MISSING'
        : 'DIRECT_REPLAY_NOT_CERTIFIED',
    qa_executed: replayPassed, pg_tap_certified: certified,
    cleanup_attested: cleanupAttested, direct_parity: certified,
    session_id: context.session_id,
  };
}
