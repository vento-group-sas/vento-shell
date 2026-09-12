import { spawnSync } from 'node:child_process';

import { validateInPackageCandidateEvidence } from './package-readiness-scanner.mjs';

export const IMPLEMENTATION_STATE_INTEGRITY_MODEL_ID = 'VENTO-IMPLEMENTATION-STATE-INTEGRITY-V1';

export const IMPLEMENTATION_MUTATING_ENTRYPOINT = 'docs:implementation:advance';

export function rejectDirectImplementationLifecycleEntry(entry) {
  const normalized = String(entry ?? 'UNKNOWN').trim().toUpperCase() || 'UNKNOWN';
  throw new Error(
    `DIRECT_IMPLEMENTATION_ENTRY_DISABLED:${normalized}; use ${IMPLEMENTATION_MUTATING_ENTRYPOINT}.`,
  );
}

const STATUS_ORDER = Object.freeze([
  'PENDING_AUTHORIZATION',
  'AUTHORIZED',
  'IN_PROGRESS',
  'IMPLEMENTED',
  'VERIFIED',
]);
const STATUS_RANK = new Map(STATUS_ORDER.map((status, index) => [status, index]));
const RECOVERY_BY_STATUS = Object.freeze({
  PENDING_AUTHORIZATION: 'AWAIT_EXPLICIT_AUTHORIZATION',
  AUTHORIZED: 'START_IMPLEMENTATION_BRANCH',
  IN_PROGRESS: 'MATERIALIZE_VALIDATE_AND_SEAL_CANDIDATE',
  IMPLEMENTED: 'PREVERIFY_AND_SEAL_VERIFICATION_EVIDENCE',
  VERIFIED: 'FINISH_AND_RECONCILE_MAIN',
});
const NEXT_BY_STATUS = Object.freeze({
  PENDING_AUTHORIZATION: 'AUTHORIZE',
  AUTHORIZED: 'START',
  IN_PROGRESS: 'MATERIALIZE_AND_VALIDATE',
  IMPLEMENTED: 'PREVERIFY_AND_SEAL_VERIFICATION_EVIDENCE',
  VERIFIED: 'FINISH',
});
const LOCAL_VALIDATION_PATTERN = /^LOCAL_VALIDATION candidate=([0-9a-f]{40}) command=(.*) status=(PASS|NOT_APPLICABLE)$/u;
const SHA_PATTERN = /^[0-9a-f]{40}$/u;

function unique(values) {
  return [...new Set(values.map((value) => String(value)).filter(Boolean))];
}

function normalizedId(value) {
  return String(value ?? '').trim();
}

function instanceRecordPath(instanceId) {
  const [taskId, instanceKey] = normalizedId(instanceId).split('::');
  if (!taskId || !instanceKey) return null;
  return `docs/plan-canonico/modular/implementation-instances/${taskId}__${instanceKey}.json`;
}

function implementationBranch(instanceId) {
  const [taskId, instanceKey] = normalizedId(instanceId).split('::');
  if (!taskId || !instanceKey) return null;
  return `implementation/${taskId.toLowerCase()}/${instanceKey.toLowerCase()}`;
}

function runGit(root, args) {
  const result = spawnSync('git', args, {
    cwd: root,
    encoding: 'utf8',
    windowsHide: true,
  });
  return {
    status: Number.isInteger(result.status) ? result.status : 1,
    stdout: String(result.stdout ?? '').trim(),
    stderr: String(result.stderr ?? '').trim(),
  };
}

function readGitJson(root, ref, relativePath) {
  if (!relativePath) return null;
  const result = runGit(root, ['show', `${ref}:${relativePath}`]);
  if (result.status !== 0 || !result.stdout) return null;
  try {
    return JSON.parse(result.stdout);
  } catch {
    return null;
  }
}

function gitRefExists(root, ref) {
  return runGit(root, ['rev-parse', '--verify', '--quiet', ref]).status === 0;
}

function gitRefCommit(root, ref) {
  const result = runGit(root, ['rev-parse', ref]);
  return result.status === 0 && SHA_PATTERN.test(result.stdout.toLowerCase())
    ? result.stdout.toLowerCase()
    : null;
}

function authorizationValid(instance) {
  return instance?.authorization?.decision === 'APPROVED'
    && Array.isArray(instance?.target_repositories)
    && instance.target_repositories.length > 0
    && Array.isArray(instance?.authorized_changes)
    && instance.authorized_changes.length > 0
    && Array.isArray(instance?.validation_commands)
    && instance.validation_commands.length > 0;
}

function parseLocalValidationEvidence(instance, candidateCommit) {
  const byCommand = new Map();
  const stale = [];
  for (const entry of instance?.evidence ?? []) {
    if (typeof entry !== 'string') continue;
    const match = LOCAL_VALIDATION_PATTERN.exec(entry.trim());
    if (!match) continue;
    const [, evidenceCommit, command, status] = match;
    if (candidateCommit && evidenceCommit !== candidateCommit) {
      stale.push(`LOCAL_VALIDATION_CANDIDATE_MISMATCH:${command}`);
      continue;
    }
    byCommand.set(command, status);
  }
  const missing = [];
  for (const command of instance?.validation_commands ?? []) {
    const result = byCommand.get(command);
    if (result !== 'PASS' && result !== 'NOT_APPLICABLE') {
      missing.push(`LOCAL_VALIDATION_MISSING:${command}`);
    }
  }
  return {
    complete: missing.length === 0 && (instance?.validation_commands?.length ?? 0) > 0,
    missing,
    stale,
  };
}

function packageIdFromInstance(instance) {
  const match = /::(GAP-PKG-\d{3})$/u.exec(normalizedId(instance?.instance_id));
  return match?.[1] ?? null;
}

function candidateGateRequirement(readiness, packageId) {
  if (!packageId || !readiness?.registry?.packages) return { required: false, gate: null };
  const pkg = readiness.registry.packages.find((entry) => entry?.package_id === packageId) ?? null;
  const required = pkg?.execution_requirements?.supabase_mutation_required === true;
  const gate = readiness?.contract?.physical_dependencies
    ?.supabase_pre_e5_foundation?.in_package_candidate_gate ?? null;
  return { required, gate };
}

function modernVerificationEvidence(instance, candidateCommit) {
  const entries = (instance?.evidence ?? []).filter((entry) => (
    entry && typeof entry === 'object' && !Array.isArray(entry)
    && entry.type === 'IMPLEMENTATION_EXECUTION_EVIDENCE_V1'
  ));
  const exact = entries.find((entry) => String(entry.candidate_commit ?? '').toLowerCase() === candidateCommit)
    ?? null;
  if (exact) return { evidence: exact, stale: [] };
  const stale = entries.length > 0 ? ['VERIFICATION_EVIDENCE_CANDIDATE_MISMATCH'] : [];
  return { evidence: null, stale };
}

function validateStructuredVerification(entry, instance, candidateCommit) {
  if (!entry) return { valid: false, missing: ['VERIFICATION_EVIDENCE_MISSING'], stale: [] };
  const stale = [];
  const missing = [];
  const evidenceCandidate = String(entry.candidate_commit ?? '').toLowerCase();
  if (!SHA_PATTERN.test(evidenceCandidate)) missing.push('VERIFICATION_CANDIDATE_INVALID');
  if (candidateCommit && evidenceCandidate && evidenceCandidate !== candidateCommit) {
    stale.push('VERIFICATION_EVIDENCE_CANDIDATE_MISMATCH');
  }
  const expectedCommands = instance?.validation_commands ?? [];
  const evidenceCommands = Array.isArray(entry.validation_commands) ? entry.validation_commands : [];
  if (JSON.stringify(evidenceCommands) !== JSON.stringify(expectedCommands)) {
    missing.push('VERIFICATION_VALIDATION_COMMANDS_MISMATCH');
  }
  const results = Array.isArray(entry.results) ? entry.results : [];
  const resultByCommand = new Map(results.map((result) => [result?.command, result?.status]));
  for (const command of expectedCommands) {
    const status = resultByCommand.get(command);
    if (status !== 'PASS' && status !== 'NOT_APPLICABLE') {
      missing.push(`VERIFICATION_RESULT_NOT_PASS:${command}`);
    }
  }
  if (!Array.isArray(entry.target_environments)) missing.push('VERIFICATION_TARGET_ENVIRONMENTS_MISSING');
  if (!Array.isArray(entry.environment_results)) missing.push('VERIFICATION_ENVIRONMENT_RESULTS_MISSING');
  if (Array.isArray(entry.target_environments) && Array.isArray(entry.environment_results)
      && entry.target_environments.length !== entry.environment_results.length) {
    missing.push('VERIFICATION_ENVIRONMENT_CARDINALITY_MISMATCH');
  }
  for (const environment of entry.environment_results ?? []) {
    if (environment?.status !== 'PASS') missing.push('VERIFICATION_ENVIRONMENT_NOT_PASS');
    if (!Array.isArray(environment?.evidence) || environment.evidence.length === 0) {
      missing.push('VERIFICATION_ENVIRONMENT_EVIDENCE_MISSING');
    }
  }
  return { valid: missing.length === 0 && stale.length === 0, missing: unique(missing), stale: unique(stale) };
}

function isGrandfatheredHistoricalVerified({ root, instance, originMainRef = 'origin/main' }) {
  if (instance?.status !== 'VERIFIED') return false;
  if (!root) return false;
  const relativePath = instanceRecordPath(instance.instance_id);
  const historical = readGitJson(root, originMainRef, relativePath);
  return historical?.status === 'VERIFIED'
    && JSON.stringify(historical) === JSON.stringify(instance);
}

export function deriveImplementationStateFacts({
  root = process.cwd(),
  instance,
  readiness = null,
  candidateCommit = null,
  branchPresent = null,
  candidateGateStatus = null,
  historicalVerified = null,
} = {}) {
  const id = normalizedId(instance?.instance_id);
  const branch = implementationBranch(id);
  const localRef = branch ? `refs/heads/${branch}` : null;
  const remoteRef = branch ? `refs/remotes/origin/${branch}` : null;
  const detectedBranch = branchPresent == null
    ? Boolean(
      (localRef && gitRefExists(root, localRef))
      || (remoteRef && gitRefExists(root, remoteRef)),
    )
    : Boolean(branchPresent);
  const detectedCandidate = String(candidateCommit ?? (
    (remoteRef && gitRefCommit(root, remoteRef))
    || (localRef && gitRefCommit(root, localRef))
    || ''
  )).toLowerCase();
  const localValidation = parseLocalValidationEvidence(instance, detectedCandidate || null);
  const packageId = packageIdFromInstance(instance);
  const candidateGate = candidateGateRequirement(readiness, packageId);
  let gatePass = true;
  let gateDetail = null;
  if (candidateGate.required) {
    if (candidateGateStatus != null) {
      gatePass = candidateGateStatus === 'PASS';
      gateDetail = String(candidateGateStatus);
    } else {
      const result = validateInPackageCandidateEvidence({
        root,
        packageId,
        instance,
        gate: candidateGate.gate,
      });
      gatePass = result?.status === 'PASS';
      gateDetail = result?.detail ?? result?.status ?? 'UNKNOWN';
    }
  }
  const verification = modernVerificationEvidence(instance, detectedCandidate);
  const verificationReceipt = validateStructuredVerification(
    verification.evidence,
    instance,
    detectedCandidate,
  );
  const grandfathered = historicalVerified == null
    ? isGrandfatheredHistoricalVerified({ root, instance })
    : Boolean(historicalVerified);

  return {
    authorization_valid: authorizationValid(instance),
    implementation_branch_present: detectedBranch,
    candidate_commit: detectedCandidate || null,
    local_validation_complete: localValidation.complete,
    local_validation_missing: localValidation.missing,
    candidate_gate_required: candidateGate.required,
    candidate_gate_pass: gatePass,
    candidate_gate_detail: gateDetail,
    verification_evidence_present: Boolean(verification.evidence),
    verification_receipt_valid: verificationReceipt.valid,
    grandfathered_verified: grandfathered,
    stale_evidence: unique([...localValidation.stale, ...verification.stale, ...verificationReceipt.stale]),
    verification_missing: unique(verificationReceipt.missing),
  };
}

function nextActionFor(status) {
  return NEXT_BY_STATUS[status] ?? 'NONE';
}

function recoveryFor(status) {
  return RECOVERY_BY_STATUS[status] ?? 'MANUAL_RECONCILIATION_REQUIRED';
}

export function evaluateImplementationStateIntegrity({ instance, facts = {} } = {}) {
  const declared = String(instance?.status ?? 'UNKNOWN').trim();
  const missing = [];
  const stale = unique(facts.stale_evidence ?? []);

  if (!STATUS_RANK.has(declared)) {
    return {
      declared_status: declared || 'UNKNOWN',
      highest_valid_status: 'PENDING_AUTHORIZATION',
      status_valid: false,
      missing_prerequisites: ['DECLARED_STATUS_UNKNOWN'],
      stale_evidence: stale,
      next_legal_transition: 'NONE',
      recoverable: false,
      recovery_action: 'MANUAL_RECONCILIATION_REQUIRED',
    };
  }

  let highest = 'PENDING_AUTHORIZATION';
  if (facts.authorization_valid === true) {
    highest = 'AUTHORIZED';
  } else if (STATUS_RANK.get(declared) >= STATUS_RANK.get('AUTHORIZED')) {
    missing.push('AUTHORIZATION_OR_SCOPE_INVALID');
  }

  if (highest === 'AUTHORIZED') {
    if (facts.implementation_branch_present === true) {
      highest = 'IN_PROGRESS';
    } else if (STATUS_RANK.get(declared) >= STATUS_RANK.get('IN_PROGRESS')) {
      missing.push('IMPLEMENTATION_BRANCH_MISSING');
    }
  }

  if (highest === 'IN_PROGRESS') {
    if (facts.local_validation_complete === true && facts.candidate_gate_pass !== false) {
      highest = 'IMPLEMENTED';
    } else if (STATUS_RANK.get(declared) >= STATUS_RANK.get('IMPLEMENTED')) {
      missing.push(...(facts.local_validation_missing ?? []));
      if (facts.local_validation_complete !== true && (facts.local_validation_missing ?? []).length === 0) {
        missing.push('LOCAL_VALIDATION_EVIDENCE_INCOMPLETE');
      }
      if (facts.candidate_gate_pass === false) {
        missing.push(`CANDIDATE_GATE_NOT_PASS:${facts.candidate_gate_detail ?? 'UNKNOWN'}`);
      }
    }
  }

  if (highest === 'IMPLEMENTED') {
    const verified = facts.grandfathered_verified === true
      || (facts.verification_evidence_present === true && facts.verification_receipt_valid === true);
    if (verified) {
      highest = 'VERIFIED';
    } else if (declared === 'VERIFIED') {
      missing.push(...(facts.verification_missing ?? []));
      if (facts.verification_evidence_present !== true) missing.push('VERIFICATION_EVIDENCE_MISSING');
      if (facts.verification_evidence_present === true && facts.verification_receipt_valid !== true) {
        missing.push('VERIFICATION_RECEIPT_INVALID');
      }
    }
  }

  const declaredRank = STATUS_RANK.get(declared);
  const highestRank = STATUS_RANK.get(highest);
  const statusValid = declaredRank <= highestRank;
  const baseRecovery = recoveryFor(highest);
  const recoveryAction = statusValid
    ? recoveryFor(declared)
    : `RECONCILE_DECLARED_STATUS_TO_${highest}_THEN_${baseRecovery}`;

  return {
    declared_status: declared,
    highest_valid_status: highest,
    status_valid: statusValid,
    missing_prerequisites: unique(missing),
    stale_evidence: stale,
    next_legal_transition: statusValid ? nextActionFor(declared) : nextActionFor(highest),
    recoverable: true,
    recovery_action: recoveryAction,
  };
}

export function assessImplementationStateIntegrity(options = {}) {
  const facts = deriveImplementationStateFacts(options);
  return evaluateImplementationStateIntegrity({
    instance: options.instance,
    facts,
  });
}

export function formatImplementationStateIntegrityViolation(instanceId, integrity) {
  const id = normalizedId(instanceId) || 'INSTANCIA';
  const missing = (integrity?.missing_prerequisites ?? []).join(',') || 'NONE';
  const stale = (integrity?.stale_evidence ?? []).join(',') || 'NONE';
  return [
    `STATE_INTEGRITY_VIOLATION:${id}`,
    `declared=${integrity?.declared_status ?? 'UNKNOWN'}`,
    `highest_valid=${integrity?.highest_valid_status ?? 'UNKNOWN'}`,
    `missing=${missing}`,
    `stale=${stale}`,
    `recovery=${integrity?.recovery_action ?? 'MANUAL_RECONCILIATION_REQUIRED'}`,
  ].join(' | ');
}
