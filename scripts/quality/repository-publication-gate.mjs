import fs from 'node:fs';
import path from 'node:path';
import { spawnSync } from 'node:child_process';
import { fileURLToPath } from 'node:url';

// GAP-PKG-003 / TP-CONTROL-001. This gate performs GET operations only.
// It never changes GitHub visibility, members, secrets, repository settings or owners.
export const PUBLICATION_GATE_ID = 'VENTO-REPOSITORY-PUBLICATION-GATE-V1';
export const CANONICAL_REPOSITORIES = Object.freeze([
  'vento-group-sas/vento-anima',
  'vento-group-sas/vento-fogo',
  'vento-group-sas/vento-nexo',
  'vento-group-sas/vento-numera',
  'vento-group-sas/vento-origo',
  'carlosibarraariza/vento-pass',
  'vento-group-sas/vento-pulso',
  'vento-group-sas/vento-shell',
  'carlosibarraariza/vento-talento',
  'vento-group-sas/vento-viso',
]);

const REPOSITORY_PATTERN = /^[A-Za-z0-9_.-]+\/[A-Za-z0-9_.-]+$/u;
const SHA_PATTERN = /^[a-f0-9]{40}$/u;
const APPROVERS = new Set(['OWN-SEG', 'OWN-GG']);
const EXCEPTION_CONTROLS = new Set(['SECRET_SCANNING', 'PUSH_PROTECTION']);
const PRIVATE_REPOSITORIES = new Set([
  'carlosibarraariza/vento-pass',
  'carlosibarraariza/vento-talento',
]);

function isoTime(value, now) {
  if (typeof value !== 'string' || !/^\d{4}-\d\d-\d\dT/u.test(value)) return false;
  const time = Date.parse(value);
  return Number.isFinite(time) && time <= Date.parse(now);
}

function refsPresent(value) {
  return Array.isArray(value) && value.length > 0
    && value.every((ref) => typeof ref === 'string'
      && ref.length >= 4 && ref.length <= 400
      && !/[\r\n\0]/u.test(ref));
}

function addFinding(target, finding) {
  if (!target.includes(finding)) target.push(finding);
}

function expectedVisibility(repository) {
  return PRIVATE_REPOSITORIES.has(repository) ? 'private' : 'public';
}

export function validatePublicationPolicy(policy) {
  const findings = [];
  if (!policy || typeof policy !== 'object' || Array.isArray(policy)) return ['POLICY_INVALID'];
  if (policy.schema_version !== 1 || policy.policy_id !== PUBLICATION_GATE_ID
    || policy.package_id !== 'GAP-PKG-003' || policy.test_profile !== 'TP-CONTROL-001'
    || policy.source_package_gate !== 'docs/plan-canonico/modular/package-gate-instances/GAP-PKG-003.json') {
    findings.push('CANONICAL_IDENTITY_MISMATCH');
  }
  if (policy.decision_owner !== 'OWN-SEG' || policy.deputy_owner !== 'OWN-GG') {
    findings.push('CANONICAL_AUTHORITY_MISMATCH');
  }
  const rows = policy.publication_scope?.repository_decisions;
  if (!Array.isArray(rows)) return [...findings, 'REPOSITORY_DECISIONS_MISSING'];
  const names = rows.map((row) => row?.repository);
  if (names.length !== 10) findings.push('REPOSITORY_COUNT_MISMATCH');
  if (new Set(names).size !== names.length) findings.push('DUPLICATE_REPOSITORY');
  if (names.some((name) => !CANONICAL_REPOSITORIES.includes(name))) findings.push('UNKNOWN_REPOSITORY');
  if (CANONICAL_REPOSITORIES.some((name) => !names.includes(name))) findings.push('MISSING_CANONICAL_REPOSITORY');
  for (const row of rows) {
    if (!row || typeof row !== 'object' || !CANONICAL_REPOSITORIES.includes(row.repository)) continue;
    const expected = expectedVisibility(row.repository);
    const classification = expected === 'public'
      ? 'PUBLIC_WITH_VERIFIED_PUBLICATION_CONTROLS'
      : 'PRIVATE_WITH_ACCESS_REVIEW';
    if (row.observed_visibility !== expected || row.proposed_visibility !== expected
      || row.policy !== classification || row.owner !== 'OWN-SEG') {
      addFinding(findings, 'CANONICAL_VISIBILITY_OR_POLICY_MISMATCH');
    }
    if (!['PENDING', 'APROBADO', 'DENEGADO'].includes(row.approval)) {
      addFinding(findings, 'INVALID_APPROVAL_STATE');
    }
    if (!Array.isArray(row.exceptions)) addFinding(findings, 'EXCEPTIONS_INVALID');
  }
  return findings;
}

function reviewValid(review, sourceCommit, now) {
  return Boolean(review && review.status === 'PASS'
    && APPROVERS.has(review.reviewer)
    && review.source_commit === sourceCommit
    && isoTime(review.reviewed_at, now)
    && refsPresent(review.evidence_refs));
}

function approvalValid(decision, sourceCommit, now) {
  const receipt = decision.approval_record;
  return decision.approval === 'APROBADO'
    && Boolean(receipt && APPROVERS.has(receipt.approved_by)
      && receipt.source_commit === sourceCommit
      && isoTime(receipt.approved_at, now)
      && refsPresent(receipt.evidence_refs));
}

function exceptionValid(ex, control, sourceCommit, now) {
  if (!ex || ex.control_id !== control || ex.status !== 'APPROVED'
    || !APPROVERS.has(ex.owner) || !APPROVERS.has(ex.approved_by)
    || ex.source_commit !== sourceCommit || !isoTime(ex.approved_at, now)
    || typeof ex.risk !== 'string' || ex.risk.trim().length < 12
    || typeof ex.reason !== 'string' || ex.reason.trim().length < 12
    || typeof ex.alternative_control !== 'string' || ex.alternative_control.trim().length < 12
    || !refsPresent(ex.evidence_refs) || !refsPresent(ex.alternative_control_evidence_refs)) {
    return false;
  }
  const expires = Date.parse(ex.expires_at);
  return typeof ex.expires_at === 'string' && Number.isFinite(expires)
    && expires > Date.parse(now);
}

function observeSummary(entry) {
  const observedName = entry?.repository;
  const observedTime = entry?.observed_at;
  const commit = entry?.source_commit;
  return {
    repository: typeof observedName === 'string' ? observedName : null,
    source_commit: typeof commit === 'string' && SHA_PATTERN.test(commit) ? commit : null,
    observed_at: typeof observedTime === 'string' && Number.isFinite(Date.parse(observedTime))
      ? observedTime : null,
  };
}

function assessDecision(decision, observation, now) {
  const findings = [];
  const expected = expectedVisibility(decision.repository);
  const details = observeSummary(observation);
  if (decision.approval !== 'APROBADO') addFinding(findings, 'HUMAN_PUBLICATION_APPROVAL_REQUIRED');
  if (!observation || observation.available === false) {
    addFinding(findings, 'LIVE_REPOSITORY_EVIDENCE_UNAVAILABLE');
  } else {
    if (!REPOSITORY_PATTERN.test(details.repository ?? '')
      || details.repository !== decision.repository
      || !Number.isInteger(observation.repository_id) || observation.repository_id <= 0) {
      addFinding(findings, 'CANONICAL_REPOSITORY_IDENTITY_MISMATCH');
    }
    if (observation.visibility !== expected) addFinding(findings, 'LIVE_VISIBILITY_MISMATCH');
    if (observation.administrator_access !== true) addFinding(findings, 'ADMIN_PERMISSION_NOT_DEMONSTRATED');
    if (!details.source_commit) addFinding(findings, 'SOURCE_COMMIT_UNRESOLVED');
    if (!isoTime(details.observed_at, now)) addFinding(findings, 'OBSERVATION_TIME_INVALID');
  }
  const commit = details.source_commit;
  if (!approvalValid(decision, commit, now)) addFinding(findings, 'HUMAN_APPROVAL_EVIDENCE_INVALID');
  if (!reviewValid(decision.content_review, commit, now)) {
    addFinding(findings, 'CONTENT_REVIEW_NOT_VERIFIED_FOR_COMMIT');
  }
  if (expected === 'private') {
    if (!reviewValid(decision.access_review, commit, now)) {
      addFinding(findings, 'PRIVATE_ACCESS_REVIEW_NOT_VERIFIED');
    }
  } else {
    if (!reviewValid(decision.security_review, commit, now)) {
      addFinding(findings, 'SECRET_AND_PERSONAL_DATA_REVIEW_NOT_VERIFIED');
    }
    const exceptions = Array.isArray(decision.exceptions) ? decision.exceptions : [];
    const known = new Set();
    for (const ex of exceptions) {
      if (!EXCEPTION_CONTROLS.has(ex?.control_id)) addFinding(findings, 'EXCEPTION_CONTROL_INVALID');
      else if (known.has(ex.control_id)) addFinding(findings, 'DUPLICATE_EXCEPTION_CONTROL');
      else known.add(ex.control_id);
    }
    const validException = (control) => exceptions.some((ex) => exceptionValid(ex, control, commit, now));
    const enabledScan = observation?.secret_scanning_status === 'enabled';
    const enabledProtection = observation?.push_protection_status === 'enabled';
    if (!enabledScan && !validException('SECRET_SCANNING')) {
      addFinding(findings, 'SECRET_SCANNING_NOT_PROVEN_OR_EXCEPTION_INVALID');
    }
    if (!enabledProtection && !validException('PUSH_PROTECTION')) {
      addFinding(findings, 'PUSH_PROTECTION_NOT_PROVEN_OR_EXCEPTION_INVALID');
    }
    if (enabledScan && (observation?.secret_alerts_observed !== true
      || observation?.open_secret_alerts !== false)) {
      addFinding(findings, 'SECRET_SCANNING_ALERTS_NOT_OBSERVABLE');
    }
    if (observation?.open_secret_alerts === true) {
      // Deliberately never print alert titles, paths, secret values or raw API responses.
      addFinding(findings, 'OPEN_SECRET_FINDING_REQUIRES_REMEDIATION');
    }
  }
  return Object.freeze({
    repository: decision.repository,
    visibility: observation?.visibility === 'public' || observation?.visibility === 'private'
      ? observation.visibility : 'UNKNOWN',
    source_commit: details.source_commit,
    observed_at: details.observed_at,
    result: findings.length === 0 ? 'PASS' : 'BLOCKED',
    finding_codes: Object.freeze(findings.sort()),
  });
}

export function auditPublicationPolicy({ policy, observations = [], now = new Date().toISOString() } = {}) {
  const policyFindings = validatePublicationPolicy(policy);
  const rows = policy?.publication_scope?.repository_decisions;
  const byDecision = new Map((Array.isArray(rows) ? rows : [])
    .filter((row) => row && CANONICAL_REPOSITORIES.includes(row.repository))
    .map((row) => [row.repository, row]));
  const byObservation = new Map((Array.isArray(observations) ? observations : [])
    .filter((item) => item && typeof item.requested_repository === 'string')
    .map((item) => [item.requested_repository, item]));
  const entries = CANONICAL_REPOSITORIES.map((repository) => {
    const decision = byDecision.get(repository);
    if (!decision) return Object.freeze({
      repository, visibility: 'UNKNOWN', source_commit: null, observed_at: null,
      result: 'BLOCKED', finding_codes: Object.freeze(['MISSING_CANONICAL_REPOSITORY']),
    });
    return assessDecision(decision, byObservation.get(repository) ?? null, now);
  });
  if (new Set((Array.isArray(observations) ? observations : []).map((v) => v?.requested_repository)).size
    !== (Array.isArray(observations) ? observations.length : 0)) {
    policyFindings.push('DUPLICATE_REMOTE_OBSERVATION');
  }
  const pass = entries.filter((entry) => entry.result === 'PASS').length;
  const result = policyFindings.length === 0 && pass === CANONICAL_REPOSITORIES.length ? 'PASS' : 'BLOCKED';
  return Object.freeze({
    schema_version: 1,
    gate_id: PUBLICATION_GATE_ID,
    package_id: 'GAP-PKG-003',
    result,
    checked_repositories: CANONICAL_REPOSITORIES.length,
    passed_repositories: pass,
    blocked_repositories: CANONICAL_REPOSITORIES.length - pass,
    policy_finding_codes: Object.freeze([...new Set(policyFindings)].sort()),
    repositories: Object.freeze(entries),
    remote_mutations: 0,
  });
}

// Explicit observation mode never issues a publication approval. It accepts only
// allowlisted fields and never forwards raw GitHub API responses or secret values.
export function buildObservationOnlyReport({ observations = [], now = new Date().toISOString() } = {}) {
  const rows = CANONICAL_REPOSITORIES.map((repository) => {
    const matches = Array.isArray(observations)
      ? observations.filter((item) => item?.requested_repository === repository) : [];
    const item = matches.length === 1 ? matches[0] : null;
    const available = item?.available === true && item.repository === repository;
    const visibility = available && ['public', 'private'].includes(item.visibility)
      ? item.visibility : 'UNKNOWN';
    const sourceCommit = available && SHA_PATTERN.test(String(item.source_commit ?? ''))
      ? item.source_commit : null;
    const scan = available && ['enabled', 'disabled'].includes(item.secret_scanning_status)
      ? item.secret_scanning_status : 'UNKNOWN';
    const protection = available && ['enabled', 'disabled'].includes(item.push_protection_status)
      ? item.push_protection_status : 'UNKNOWN';
    const alerts = visibility !== 'public' ? 'NOT_APPLICABLE'
      : item?.secret_alerts_observed !== true ? 'UNKNOWN'
        : item.open_secret_alerts === true ? 'OPEN'
          : item.open_secret_alerts === false ? 'NONE' : 'UNKNOWN';
    const complete = available && sourceCommit !== null
      && item.administrator_access === true
      && visibility === expectedVisibility(repository)
      && (visibility === 'private' || alerts !== 'UNKNOWN');
    return Object.freeze({
      repository,
      available,
      visibility,
      source_commit: sourceCommit,
      administrator_access_verified: available && item.administrator_access === true,
      secret_scanning_status: scan,
      push_protection_status: protection,
      open_secret_alerts: alerts,
      evidence_complete: complete,
    });
  });
  const complete = rows.filter((row) => row.evidence_complete).length;
  return Object.freeze({
    schema_version: 1,
    gate_id: PUBLICATION_GATE_ID,
    package_id: 'GAP-PKG-003',
    mode: 'OBSERVATION_ONLY',
    result: complete === rows.length ? 'OBSERVATION_COMPLETE' : 'OBSERVATION_PARTIAL',
    publication_certification: 'NOT_GRANTED',
    observed_at: now,
    checked_repositories: rows.length,
    evidence_complete_repositories: complete,
    repositories: Object.freeze(rows),
    remote_mutations: 0,
  });
}

function readOnlyGhJson(endpoint) {
  // No shell expansion, mutation endpoints, or stdout/stderr propagation.
  const result = spawnSync('gh', ['api', '--method', 'GET', endpoint], {
    encoding: 'utf8', windowsHide: true, timeout: 20_000,
    maxBuffer: 4 * 1024 * 1024,
    stdio: ['ignore', 'pipe', 'pipe'],
  });
  if (result.error || result.status !== 0) return { available: false };
  try { return { available: true, value: JSON.parse(result.stdout) }; }
  catch { return { available: false }; }
}

export function observeGithubRepository(requestedRepository, now = new Date().toISOString()) {
  if (!CANONICAL_REPOSITORIES.includes(requestedRepository)) {
    return { requested_repository: requestedRepository, available: false };
  }
  const repo = readOnlyGhJson(`repos/${requestedRepository}`);
  if (!repo.available || typeof repo.value?.full_name !== 'string'
    || !REPOSITORY_PATTERN.test(repo.value.full_name)) {
    return { requested_repository: requestedRepository, available: false };
  }
  // Follow GitHub's canonical full_name, but only accept an exact canonical match at the gate.
  const resolvedName = repo.value.full_name;
  const branch = typeof repo.value.default_branch === 'string' ? repo.value.default_branch : '';
  const commit = branch ? readOnlyGhJson(`repos/${resolvedName}/commits/${encodeURIComponent(branch)}`)
    : { available: false };
  const visibility = repo.value.visibility === 'private' || repo.value.private === true
    ? 'private' : repo.value.visibility === 'public' || repo.value.private === false
      ? 'public' : 'UNKNOWN';
  const security = repo.value.security_and_analysis ?? {};
  let alert = { available: false };
  if (visibility === 'public' && security.secret_scanning?.status === 'enabled') {
    // Request a redacted response from GitHub; never ingest a raw secret value.
    alert = readOnlyGhJson(`repos/${resolvedName}/secret-scanning/alerts?state=open&per_page=1&hide_secret=true`);
  }
  return {
    requested_repository: requestedRepository,
    available: true,
    repository: resolvedName,
    repository_id: repo.value.id,
    visibility,
    administrator_access: repo.value.permissions?.admin === true,
    source_commit: commit.available ? String(commit.value?.sha ?? '').toLowerCase() : null,
    observed_at: now,
    secret_scanning_status: security.secret_scanning?.status ?? 'UNKNOWN',
    push_protection_status: security.secret_scanning_push_protection?.status ?? 'UNKNOWN',
    secret_alerts_observed: alert.available && Array.isArray(alert.value),
    open_secret_alerts: alert.available && Array.isArray(alert.value) && alert.value.length > 0,
  };
}

export function parsePublicationGateArgs(argv) {
  let mode = null;
  let policy = null;
  for (let i = 0; i < argv.length; i += 1) {
    if (['--check', '--observe'].includes(argv[i]) && mode === null) mode = argv[i];
    else if (argv[i] === '--policy' && policy === null && argv[i + 1] && !argv[i + 1].startsWith('--')) {
      policy = argv[++i];
    } else throw new Error('PUBLICATION_GATE_ARGUMENT_UNSUPPORTED');
  }
  if (!mode || !policy) throw new Error('PUBLICATION_GATE_REQUIRES_MODE_AND_POLICY');
  return { [mode === '--check' ? 'check' : 'observe']: true, policy };
}

function localProofsComplete(policy) {
  if (validatePublicationPolicy(policy).length > 0) return false;
  return policy.publication_scope.repository_decisions.every((row) => row.approval === 'APROBADO'
    && row.approval_record && row.content_review?.status === 'PASS'
    && (expectedVisibility(row.repository) === 'private'
      ? row.access_review?.status === 'PASS' : row.security_review?.status === 'PASS'));
}

export function runPublicationGate(argv = process.argv.slice(2)) {
  const args = parsePublicationGateArgs(argv);
  const policyPath = path.resolve(process.cwd(), args.policy);
  let policy;
  try { policy = JSON.parse(fs.readFileSync(policyPath, 'utf8')); }
  catch { throw new Error('PUBLICATION_POLICY_UNREADABLE'); }
  const now = new Date().toISOString();
  if (args.observe) {
    // Explicit read-only diagnostics can run before human approval. The result
    // is never a publication certification, even with complete observations.
    if (validatePublicationPolicy(policy).length) throw new Error('PUBLICATION_POLICY_INVALID');
    const observations = CANONICAL_REPOSITORIES.map((name) => observeGithubRepository(name, now));
    const report = buildObservationOnlyReport({ observations, now });
    console.log(JSON.stringify(report, null, 2));
    return report;
  }
  // A pending human decision is a deliberate BLOCK, not a reason to query sensitive services.
  const observations = localProofsComplete(policy)
    ? CANONICAL_REPOSITORIES.map((name) => observeGithubRepository(name, now)) : [];
  const report = auditPublicationPolicy({ policy, observations, now });
  console.log(JSON.stringify(report, null, 2));
  if (report.result !== 'PASS') process.exitCode = 1;
  return report;
}

const isMain = process.argv[1]
  && path.resolve(process.argv[1]) === path.resolve(fileURLToPath(import.meta.url));
if (isMain) {
  try { runPublicationGate(); }
  catch { console.error('PUBLICATION_GATE:BLOCKED:INVALID_INPUT_OR_ENVIRONMENT'); process.exitCode = 1; }
}
