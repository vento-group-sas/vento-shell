import { spawnSync } from 'node:child_process';
import fs from 'node:fs';
import path from 'node:path';

import { validateInPackageCandidateEvidence } from './package-readiness-scanner.mjs';
import {
  classifyImplementationIntegrationImpact,
  isVerifiedCorrectionIntegrationRecord,
} from './implementation-integration-impact.mjs';
import {
  assessImplementationCandidateLifecycleDelta,
  resolveValidationCandidateAnchor,
} from './implementation-integration-model.mjs';
import {
  isImplementationDerivedProjection,
  normalizeImplementationPath,
} from './implementation-path-policy.mjs';

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
const IMPLEMENTATION_INSTANCE_DIRECTORY = 'docs/plan-canonico/modular/implementation-instances/';
const CORRECTION_INSTANCE_DIRECTORY = 'docs/plan-canonico/modular/correction-instances/';

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

function readWorktreeJson(root, relativePath) {
  const normalized = normalizeRepoPath(relativePath);
  if (!normalized) return null;
  const absolute = path.join(root, ...normalized.split('/'));
  try {
    return JSON.parse(fs.readFileSync(absolute, 'utf8'));
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

function normalizeRepoPath(value) {
  return normalizeImplementationPath(value);
}

function pristinePendingImplementationRecord(record, instanceKey) {
  if (!record || typeof record !== 'object' || Array.isArray(record)) return false;
  const expectedKeys = [
    'instance_id',
    'task_id',
    'status',
    'target_repositories',
    'authorized_changes',
    'validation_commands',
    'authorization',
    'evidence',
  ].sort();
  if (JSON.stringify(Object.keys(record).sort()) !== JSON.stringify(expectedKeys)) return false;
  const [taskId, recordKey] = normalizedId(record.instance_id).split('::');
  if (!taskId || !recordKey || record.task_id !== taskId || recordKey !== instanceKey) return false;
  return record.status === 'PENDING_AUTHORIZATION'
    && Array.isArray(record.target_repositories) && record.target_repositories.length === 0
    && Array.isArray(record.authorized_changes) && record.authorized_changes.length === 0
    && Array.isArray(record.validation_commands) && record.validation_commands.length === 0
    && record.authorization === null
    && Array.isArray(record.evidence) && record.evidence.length === 0;
}

export function isVerifiedResumeDeltaAllowed({
  instanceId,
  changedPaths = [],
  pendingRecords = {},
} = {}) {
  const id = normalizedId(instanceId);
  const ownLedger = instanceRecordPath(id);
  const instanceKey = id.split('::')[1] ?? '';
  if (!ownLedger || !instanceKey) return false;

  for (const rawPath of changedPaths) {
    const relativePath = normalizeRepoPath(rawPath);
    if (!relativePath) return false;
    if (relativePath === ownLedger || isImplementationDerivedProjection(relativePath)) continue;
    if (relativePath.startsWith(IMPLEMENTATION_INSTANCE_DIRECTORY)) {
      if (!pristinePendingImplementationRecord(pendingRecords[relativePath], instanceKey)) return false;
      continue;
    }
    return false;
  }
  return true;
}

function lifecycleContract(record) {
  if (!record || typeof record !== 'object' || Array.isArray(record)) return null;
  const keys = Object.keys(record).filter((key) => key !== 'status' && key !== 'evidence').sort();
  return JSON.stringify(Object.fromEntries(keys.map((key) => [key, record[key]])));
}

export function verifiedLedgerTransitionCompatible({
  candidateLedger,
  verifiedLedger,
  instance,
} = {}) {
  if (!candidateLedger || !verifiedLedger || !instance) return false;
  if (verifiedLedger.status !== 'VERIFIED') return false;
  if (JSON.stringify(verifiedLedger) !== JSON.stringify(instance)) return false;
  const candidateContract = lifecycleContract(candidateLedger);
  const verifiedContract = lifecycleContract(verifiedLedger);
  return Boolean(candidateContract && verifiedContract && candidateContract === verifiedContract);
}

function verificationEvidenceCandidates(instance) {
  return unique((instance?.evidence ?? [])
    .filter((entry) => (
      entry && typeof entry === 'object' && !Array.isArray(entry)
      && entry.type === 'IMPLEMENTATION_EXECUTION_EVIDENCE_V1'
    ))
    .map((entry) => String(entry.candidate_commit ?? '').toLowerCase())
    .filter((entry) => SHA_PATTERN.test(entry)));
}

function resolveVerifiedResumeCandidate({ root, instance, branchTip }) {
  if (instance?.status !== 'VERIFIED' || !SHA_PATTERN.test(String(branchTip ?? '').toLowerCase())) return null;
  const ownLedger = instanceRecordPath(instance.instance_id);
  if (!ownLedger) return null;
  const tipLedger = readGitJson(root, branchTip, ownLedger);
  if (!tipLedger || JSON.stringify(tipLedger) !== JSON.stringify(instance)) return null;

  for (const candidate of verificationEvidenceCandidates(instance)) {
    if (!gitRefExists(root, candidate)) continue;
    if (runGit(root, ['merge-base', '--is-ancestor', candidate, branchTip]).status !== 0) continue;
    const candidateLedger = readGitJson(root, candidate, ownLedger);
    if (!verifiedLedgerTransitionCompatible({ candidateLedger, verifiedLedger: tipLedger, instance })) continue;

    const delta = runGit(root, ['diff', '--name-only', `${candidate}..${branchTip}`]);
    if (delta.status !== 0) continue;
    const changedPaths = delta.stdout.split(/\r?\n/u).map((entry) => entry.trim()).filter(Boolean);
    const pendingRecords = {};
    const verifiedCorrectionRecordPaths = [];
    for (const relativePath of changedPaths) {
      const normalized = normalizeRepoPath(relativePath);
      if (normalized !== ownLedger && normalized.startsWith(IMPLEMENTATION_INSTANCE_DIRECTORY)) {
        pendingRecords[normalized] = readGitJson(root, branchTip, normalized);
        continue;
      }
      if (normalized.startsWith(CORRECTION_INSTANCE_DIRECTORY)) {
        const correctionRecord = readGitJson(root, branchTip, normalized);
        if (isVerifiedCorrectionIntegrationRecord(correctionRecord, normalized)) {
          verifiedCorrectionRecordPaths.push(normalized);
        }
      }
    }

    const resumePaths = changedPaths
      .map(normalizeRepoPath)
      .filter((relativePath) => relativePath && relativePath !== ownLedger);
    const instanceKey = normalizedId(instance.instance_id).split('::')[1] ?? '';
    const pristinePendingInstancePaths = resumePaths.filter((relativePath) => (
      relativePath.startsWith(IMPLEMENTATION_INSTANCE_DIRECTORY)
      && pristinePendingImplementationRecord(pendingRecords[relativePath], instanceKey)
    ));
    const packageTouched = resumePaths.includes('package.json');
    const packageJsonBefore = packageTouched
      ? readGitJson(root, candidate, 'package.json')
      : null;
    const packageJsonAfter = packageTouched
      ? readGitJson(root, branchTip, 'package.json')
      : null;

    const impact = classifyImplementationIntegrationImpact({
      instance,
      changedPaths: resumePaths,
      pristinePendingInstancePaths,
      verifiedCorrectionRecordPaths,
      packageJsonBefore,
      packageJsonAfter,
    });
    if (impact.decision === 'REUSE_PHYSICAL_EVIDENCE') return candidate;
  }
  return null;
}

function activeImplementationWorktreePaths(root, instanceId) {
  const branch = implementationBranch(instanceId);
  if (!branch) return [];
  const current = runGit(root, ['branch', '--show-current']);
  if (current.status !== 0 || current.stdout !== branch) return [];

  const unstaged = runGit(root, ['diff', '--name-only']);
  const staged = runGit(root, ['diff', '--cached', '--name-only']);
  const untracked = runGit(root, ['ls-files', '--others', '--exclude-standard']);
  if (unstaged.status !== 0 || staged.status !== 0 || untracked.status !== 0) return [];

  return unique([
    ...unstaged.stdout.split(/\r?\n/u),
    ...staged.stdout.split(/\r?\n/u),
    ...untracked.stdout.split(/\r?\n/u),
  ].map(normalizeRepoPath).filter(Boolean));
}

export function resolveImplementationCandidateLifecycle({
  root = process.cwd(),
  instance,
  branchTip = null,
} = {}) {
  const anchor = resolveValidationCandidateAnchor(instance);
  const branch = implementationBranch(instance?.instance_id);
  const detectedTip = String(
    branchTip
    ?? (branch && gitRefCommit(root, `refs/remotes/origin/${branch}`))
    ?? (branch && gitRefCommit(root, `refs/heads/${branch}`))
    ?? ''
  ).toLowerCase();

  if (anchor.status !== 'PASS') {
    return Object.freeze({
      status: anchor.status,
      candidate_commit: null,
      lifecycle_head_commit: detectedTip || null,
      decision: 'REVALIDATE_PHYSICAL',
      reason: anchor.reason,
      changed_paths: Object.freeze([]),
    });
  }
  if (!SHA_PATTERN.test(detectedTip)) {
    return Object.freeze({
      status: 'INVALID',
      candidate_commit: anchor.candidate_sha,
      lifecycle_head_commit: null,
      decision: 'REVALIDATE_PHYSICAL',
      reason: 'LIFECYCLE_HEAD_MISSING',
      changed_paths: Object.freeze([]),
    });
  }
  if (!gitRefExists(root, anchor.candidate_sha)) {
    return Object.freeze({
      status: 'INVALID',
      candidate_commit: anchor.candidate_sha,
      lifecycle_head_commit: detectedTip,
      decision: 'REVALIDATE_PHYSICAL',
      reason: 'CANDIDATE_REF_MISSING',
      changed_paths: Object.freeze([]),
    });
  }

  const ownLedger = instanceRecordPath(instance.instance_id);
  const candidateLedger = readGitJson(root, anchor.candidate_sha, ownLedger);
  const ancestor = runGit(
    root,
    ['merge-base', '--is-ancestor', anchor.candidate_sha, detectedTip],
  ).status === 0;
  const delta = runGit(root, ['diff', '--name-only', `${anchor.candidate_sha}..${detectedTip}`]);
  const committedPaths = delta.status === 0
    ? delta.stdout.split(/\r?\n/u).map(normalizeRepoPath).filter(Boolean)
    : [];
  const worktreePaths = activeImplementationWorktreePaths(root, instance.instance_id);
  const changedPaths = unique([
    ...committedPaths,
    ...worktreePaths,
  ]);
  const worktreePathSet = new Set(worktreePaths.map(normalizeRepoPath));
  const instanceKey = normalizedId(instance.instance_id).split('::')[1] ?? '';
  const pristinePendingInstancePaths = [];
  for (const relativePath of changedPaths) {
    const normalized = normalizeRepoPath(relativePath);
    if (
      !normalized
      || normalized === ownLedger
      || !normalized.startsWith(IMPLEMENTATION_INSTANCE_DIRECTORY)
    ) {
      continue;
    }
    const pendingRecord = worktreePathSet.has(normalized)
      ? readWorktreeJson(root, normalized)
      : readGitJson(root, detectedTip, normalized);
    if (pristinePendingImplementationRecord(pendingRecord, instanceKey)) {
      pristinePendingInstancePaths.push(normalized);
    }
  }

  const assessment = assessImplementationCandidateLifecycleDelta({
    instance,
    candidateLedger,
    lifecycleLedger: instance,
    changedPaths,
    pristinePendingInstancePaths,
    candidateIsAncestor: ancestor,
  });

  return Object.freeze({
    status: assessment.decision === 'REUSE_PHYSICAL_EVIDENCE' ? 'PASS' : 'INVALID',
    candidate_commit: anchor.candidate_sha,
    lifecycle_head_commit: detectedTip,
    decision: assessment.decision,
    reason: assessment.reason,
    changed_paths: assessment.changed_paths,
    model_id: assessment.model_id,
  });
}

export function resolveEffectiveImplementationCandidate({
  root = process.cwd(),
  instance,
  branchTip = null,
} = {}) {
  const strict = resolveImplementationCandidateLifecycle({ root, instance, branchTip });
  if (strict.status === 'PASS' && strict.decision === 'REUSE_PHYSICAL_EVIDENCE') {
    return Object.freeze({
      ...strict,
      source: 'STRICT_LIFECYCLE',
      strict_lifecycle: strict,
    });
  }

  const detectedTip = String(strict.lifecycle_head_commit ?? branchTip ?? '').toLowerCase();
  const verifiedCandidate = resolveVerifiedResumeCandidate({
    root,
    instance,
    branchTip: detectedTip,
  });
  if (verifiedCandidate && SHA_PATTERN.test(verifiedCandidate)) {
    return Object.freeze({
      status: 'PASS',
      candidate_commit: verifiedCandidate,
      lifecycle_head_commit: detectedTip || null,
      decision: 'REUSE_PHYSICAL_EVIDENCE',
      reason: 'VERIFIED_RESUME_GOVERNANCE_ONLY',
      changed_paths: strict.changed_paths ?? Object.freeze([]),
      model_id: strict.model_id ?? 'VENTO-IMPLEMENTATION-CANDIDATE-LIFECYCLE-V1',
      source: 'VERIFIED_RESUME',
      strict_lifecycle: strict,
    });
  }

  return Object.freeze({
    ...strict,
    source: 'STRICT_LIFECYCLE_REJECTED',
    strict_lifecycle: strict,
  });
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

  // CORR015_HISTORICAL_VERIFIED_TERMINAL_FACTS
  // A ledger VERIFIED exactamente persistido en origin/main ya es terminal.
  // No debe volver a depender de rama, candidate, validaciones activas ni gates efimeros.
  const grandfathered = historicalVerified == null
    ? isGrandfatheredHistoricalVerified({ root, instance })
    : Boolean(historicalVerified);

  if (grandfathered) {
    return {
      authorization_valid: authorizationValid(instance),
      implementation_branch_present: false,
      candidate_commit: null,
      local_validation_complete: true,
      local_validation_missing: [],
      candidate_gate_required: false,
      candidate_gate_pass: true,
      candidate_gate_detail: 'HISTORICAL_VERIFIED_TERMINAL',
      verification_evidence_present: false,
      verification_receipt_valid: true,
      grandfathered_verified: true,
      stale_evidence: [],
      verification_missing: [],
    };
  }

  const branch = implementationBranch(id);
  const localRef = branch ? `refs/heads/${branch}` : null;
  const remoteRef = branch ? `refs/remotes/origin/${branch}` : null;
  const detectedBranch = branchPresent == null
    ? Boolean(
      (localRef && gitRefExists(root, localRef))
      || (remoteRef && gitRefExists(root, remoteRef)),
    )
    : Boolean(branchPresent);
  const detectedTip = String(
    (remoteRef && gitRefCommit(root, remoteRef))
    || (localRef && gitRefCommit(root, localRef))
    || ''
  ).toLowerCase();
  const candidateResolution = candidateCommit == null
    ? resolveEffectiveImplementationCandidate({ root, instance, branchTip: detectedTip })
    : null;
  const candidateLifecycle = candidateResolution?.strict_lifecycle ?? null;
  const effectiveCandidate = candidateResolution?.status === 'PASS'
    ? candidateResolution.candidate_commit
    : null;
  const detectedCandidate = String(
    candidateCommit ?? effectiveCandidate ?? detectedTip ?? ''
  ).toLowerCase();
  const localValidation = parseLocalValidationEvidence(instance, detectedCandidate || null);
  const candidateLifecycleStale = candidateLifecycle?.status === 'INVALID'
    ? [`CANDIDATE_LIFECYCLE_DELTA_UNSAFE:${candidateLifecycle.reason}`]
    : [];
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
    grandfathered_verified: false,
    candidate_lifecycle_head_commit: candidateResolution?.lifecycle_head_commit ?? detectedTip ?? null,
    candidate_lifecycle_decision: candidateResolution?.decision ?? null,
    stale_evidence: unique([
      ...candidateLifecycleStale,
      ...localValidation.stale,
      ...verification.stale,
      ...verificationReceipt.stale,
    ]),
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

  // CORR015_HISTORICAL_VERIFIED_TERMINAL_EVALUATION
  // Este caso se resuelve antes de reconstruir el lifecycle activo.
  if (declared === 'VERIFIED' && facts.grandfathered_verified === true) {
    return {
      declared_status: 'VERIFIED',
      highest_valid_status: 'VERIFIED',
      status_valid: true,
      missing_prerequisites: [],
      stale_evidence: [],
      next_legal_transition: 'NONE',
      recoverable: false,
      recovery_action: 'NONE',
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
