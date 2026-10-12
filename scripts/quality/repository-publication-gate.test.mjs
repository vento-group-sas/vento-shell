import assert from 'node:assert/strict';
import fs from 'node:fs';
import test from 'node:test';
import { fileURLToPath } from 'node:url';
import {
  PUBLICATION_GATE_ID,
  CANONICAL_REPOSITORIES,
  auditPublicationPolicy,
  buildObservationOnlyReport,
  observeGithubRepository,
  parsePublicationGateArgs,
  validatePublicationPolicy,
} from './repository-publication-gate.mjs';

const NOW = '2026-10-10T02:00:00Z';
const AT = '2026-10-09T22:00:00Z';
const HEAD = 'a'.repeat(40);
const POLICY_PATH = fileURLToPath(new URL('../../quality/repository-publication-policy.json', import.meta.url));
const baseline = JSON.parse(fs.readFileSync(POLICY_PATH, 'utf8'));
const copy = (value) => structuredClone(value);

function approvedPolicy() {
  const policy = copy(baseline);
  for (const row of policy.publication_scope.repository_decisions) {
    row.approval = 'APROBADO';
    row.approval_record = {
      approved_by: 'OWN-SEG', approved_at: AT,
      source_commit: HEAD, evidence_refs: ['EVIDENCE-AUTHORITY-001'],
    };
    for (const key of ['content_review', 'security_review', 'access_review']) {
      row[key] = {
        status: 'PASS', reviewer: 'OWN-SEG', reviewed_at: AT,
        source_commit: HEAD, evidence_refs: ['EVIDENCE-REVIEW-001'],
      };
    }
  }
  return policy;
}

function fakeObservations() {
  return CANONICAL_REPOSITORIES.map((repository, index) => ({
    requested_repository: repository,
    available: true,
    repository,
    repository_id: 1000 + index,
    visibility: repository.startsWith('carlosibarraariza/') ? 'private' : 'public',
    administrator_access: true,
    source_commit: HEAD,
    observed_at: AT,
    secret_scanning_status: 'enabled',
    push_protection_status: 'enabled',
    secret_alerts_observed: true,
    open_secret_alerts: false,
  }));
}

function evaluate(changes = () => {}) {
  const policy = approvedPolicy();
  const observations = fakeObservations();
  changes(policy, observations);
  return auditPublicationPolicy({ policy, observations, now: NOW });
}

function blocked(report, code) {
  assert.equal(report.result, 'BLOCKED');
  const all = [...report.policy_finding_codes, ...report.repositories.flatMap((row) => row.finding_codes)];
  assert.ok(all.includes(code), `Expected finding ${code}: ${JSON.stringify(all)}`);
}

test('TP-CONTROL-001: policy identity and canonical ten-repository cardinality', () => {
  assert.equal(baseline.policy_id, PUBLICATION_GATE_ID);
  assert.deepEqual(validatePublicationPolicy(baseline), []);
  assert.equal(baseline.publication_scope.repository_decisions.length, 10);
  assert.equal(baseline.publication_scope.repository_decisions.filter((r) => r.proposed_visibility === 'public').length, 8);
  assert.equal(baseline.publication_scope.repository_decisions.filter((r) => r.proposed_visibility === 'private').length, 2);
  assert.equal(baseline.publication_scope.repository_decisions.every((r) => r.approval === 'PENDING'), true);
});

test('TP-CONTROL-001: synthetic 10/10 fully supported cases PASS without network', () => {
  const report = evaluate();
  assert.equal(report.result, 'PASS');
  assert.equal(report.checked_repositories, 10);
  assert.equal(report.passed_repositories, 10);
  assert.equal(report.blocked_repositories, 0);
  assert.equal(report.remote_mutations, 0);
});

test('TP-CONTROL-001: real policy pending approval cannot pass even with perfect live observations', () => {
  const report = auditPublicationPolicy({ policy: baseline, observations: fakeObservations(), now: NOW });
  blocked(report, 'HUMAN_PUBLICATION_APPROVAL_REQUIRED');
  assert.equal(report.passed_repositories, 0);
});

test('TP-CONTROL-001: omitted repository is blocked', () => {
  const report = evaluate((p) => { p.publication_scope.repository_decisions.pop(); });
  blocked(report, 'MISSING_CANONICAL_REPOSITORY');
});

test('TP-CONTROL-001: extra unrecognized repository cannot replace the tenth', () => {
  const report = evaluate((p) => {
    p.publication_scope.repository_decisions[0].repository = 'attacker/repository';
  });
  blocked(report, 'UNKNOWN_REPOSITORY');
});

test('TP-CONTROL-001: duplicate repository cannot satisfy count', () => {
  const report = evaluate((p) => {
    p.publication_scope.repository_decisions[1].repository = p.publication_scope.repository_decisions[0].repository;
  });
  blocked(report, 'DUPLICATE_REPOSITORY');
});

test('TP-CONTROL-001: GitHub canonical owner resolution uses returned identity', () => {
  const report = evaluate((p, obs) => {
    const shell = obs.find((r) => r.repository === 'vento-group-sas/vento-shell');
    shell.original_requested_repository = 'devVentoGroup/vento-shell';
  });
  assert.equal(report.result, 'PASS');
  const wrong = evaluate((p, obs) => {
    obs.find((r) => r.repository === 'vento-group-sas/vento-shell').repository = 'devVentoGroup/vento-shell';
  });
  blocked(wrong, 'CANONICAL_REPOSITORY_IDENTITY_MISMATCH');
});

test('TP-CONTROL-001: missing admin proof is blocked without inferring authority', () => {
  const report = evaluate((p, obs) => { obs[0].administrator_access = undefined; });
  blocked(report, 'ADMIN_PERMISSION_NOT_DEMONSTRATED');
});

test('TP-CONTROL-001: observed/proposed visibility remains immutable and private boundaries hold', () => {
  const changedPolicy = evaluate((p) => {
    p.publication_scope.repository_decisions.find((r) => r.repository.endsWith('/vento-pass')).proposed_visibility = 'public';
  });
  blocked(changedPolicy, 'CANONICAL_VISIBILITY_OR_POLICY_MISMATCH');
  const changedLive = evaluate((p, obs) => {
    obs.find((r) => r.requested_repository.endsWith('/vento-talento')).visibility = 'public';
  });
  blocked(changedLive, 'LIVE_VISIBILITY_MISMATCH');
});

test('TP-CONTROL-001: approval requires exact source commit and human evidence', () => {
  const stale = evaluate((p) => {
    p.publication_scope.repository_decisions[0].approval_record.source_commit = 'b'.repeat(40);
  });
  blocked(stale, 'HUMAN_APPROVAL_EVIDENCE_INVALID');
  const actor = evaluate((p) => {
    p.publication_scope.repository_decisions[0].approval_record.approved_by = 'AUTOMATION';
  });
  blocked(actor, 'HUMAN_APPROVAL_EVIDENCE_INVALID');
});

test('TP-CONTROL-001: review tied to another commit is stale', () => {
  const report = evaluate((p) => { p.publication_scope.repository_decisions[0].content_review.source_commit = 'b'.repeat(40); });
  blocked(report, 'CONTENT_REVIEW_NOT_VERIFIED_FOR_COMMIT');
});

test('TP-CONTROL-001: missing private access review blocks Pass and Talento', () => {
  const report = evaluate((p) => {
    p.publication_scope.repository_decisions.find((r) => r.repository.endsWith('/vento-pass')).access_review.status = 'PENDING';
  });
  blocked(report, 'PRIVATE_ACCESS_REVIEW_NOT_VERIFIED');
});

test('TP-CONTROL-001: review of secrets and personal data required for public repositories', () => {
  const report = evaluate((p) => { p.publication_scope.repository_decisions[0].security_review.status = 'PENDING'; });
  blocked(report, 'SECRET_AND_PERSONAL_DATA_REVIEW_NOT_VERIFIED');
});

test('TP-CONTROL-001: enabled scanning by itself is not publication approval', () => {
  const policy = copy(baseline);
  const report = auditPublicationPolicy({ policy, observations: fakeObservations(), now: NOW });
  blocked(report, 'HUMAN_PUBLICATION_APPROVAL_REQUIRED');
});

test('TP-CONTROL-001: public scanning disabled without an exception blocks', () => {
  const report = evaluate((p, obs) => { obs[0].secret_scanning_status = 'disabled'; });
  blocked(report, 'SECRET_SCANNING_NOT_PROVEN_OR_EXCEPTION_INVALID');
});

test('TP-CONTROL-001: push protection disabled without exception blocks', () => {
  const report = evaluate((p, obs) => { obs[0].push_protection_status = 'disabled'; });
  blocked(report, 'PUSH_PROTECTION_NOT_PROVEN_OR_EXCEPTION_INVALID');
});

function validException() {
  return {
    control_id: 'PUSH_PROTECTION', status: 'APPROVED', owner: 'OWN-SEG',
    approved_by: 'OWN-SEG', approved_at: AT, source_commit: HEAD,
    expires_at: '2026-10-12T02:00:00Z',
    risk: 'Push protection feature unavailable for this repository',
    reason: 'Temporary compensating control approved pending activation',
    alternative_control: 'Required offline secret-content audit at exact HEAD',
    evidence_refs: ['EXCEPTION-CASE-001'],
    alternative_control_evidence_refs: ['ALTERNATE-SCAN-REPORT-001'],
  };
}

test('TP-CONTROL-001: bounded owner-approved exception permits unavailable push protection', () => {
  const report = evaluate((p, obs) => {
    obs[0].push_protection_status = 'disabled';
    p.publication_scope.repository_decisions[0].exceptions = [validException()];
  });
  assert.equal(report.result, 'PASS');
});

test('TP-CONTROL-001: documented alternative permits unavailable scanning without claiming scanner enabled', () => {
  const report = evaluate((p, obs) => {
    obs[0].secret_scanning_status = 'disabled';
    obs[0].secret_alerts_observed = false;
    const alternate = { ...validException(), control_id: 'SECRET_SCANNING' };
    p.publication_scope.repository_decisions[0].exceptions = [alternate];
  });
  assert.equal(report.result, 'PASS');
});

test('TP-CONTROL-001: fake alerts-observed flag without explicit zero-alert proof blocks', () => {
  const report = evaluate((p, obs) => { delete obs[0].open_secret_alerts; });
  blocked(report, 'SECRET_SCANNING_ALERTS_NOT_OBSERVABLE');
});

test('TP-CONTROL-001: expired exception does not waive controls', () => {
  const report = evaluate((p, obs) => {
    obs[0].push_protection_status = 'disabled';
    p.publication_scope.repository_decisions[0].exceptions = [{ ...validException(), expires_at: '2026-10-09T00:00:00Z' }];
  });
  blocked(report, 'PUSH_PROTECTION_NOT_PROVEN_OR_EXCEPTION_INVALID');
});

test('TP-CONTROL-001: exception with no alternative evidence does not waive controls', () => {
  const report = evaluate((p, obs) => {
    obs[0].push_protection_status = 'disabled';
    p.publication_scope.repository_decisions[0].exceptions = [{ ...validException(), alternative_control_evidence_refs: [] }];
  });
  blocked(report, 'PUSH_PROTECTION_NOT_PROVEN_OR_EXCEPTION_INVALID');
});

test('TP-CONTROL-001: duplicate exception identity blocked', () => {
  const report = evaluate((p) => {
    p.publication_scope.repository_decisions[0].exceptions = [validException(), validException()];
  });
  blocked(report, 'DUPLICATE_EXCEPTION_CONTROL');
});

test('TP-CONTROL-001: synthetic open secret finding blocks, and report never prints raw secret', () => {
  const marker = 'SUPER_SENSITIVE_SYNTHETIC_SECRET_VALUE_12345';
  const report = evaluate((p, obs) => {
    obs[0].open_secret_alerts = true;
    obs[0].raw_alert = { secret: marker, path: '/home/person/private-file' };
  });
  blocked(report, 'OPEN_SECRET_FINDING_REQUIRES_REMEDIATION');
  assert.equal(JSON.stringify(report).includes(marker), false);
  assert.equal(JSON.stringify(report).includes('/home/person/private-file'), false);
});

test('TP-CONTROL-001: inability to read alerts blocks even with scanner enabled', () => {
  const report = evaluate((p, obs) => { obs[0].secret_alerts_observed = false; });
  blocked(report, 'SECRET_SCANNING_ALERTS_NOT_OBSERVABLE');
});

test('TP-CONTROL-001: unknown network and missing source commit block without raw errors', () => {
  const report = evaluate((p, obs) => {
    obs[0] = { requested_repository: obs[0].requested_repository, available: false, error: 'TOKEN=DO_NOT_EXPOSE' };
  });
  blocked(report, 'LIVE_REPOSITORY_EVIDENCE_UNAVAILABLE');
  assert.equal(JSON.stringify(report).includes('DO_NOT_EXPOSE'), false);
});

test('TP-CONTROL-001: missing source SHA and invalid timestamps block', () => {
  const report = evaluate((p, obs) => {
    obs[0].source_commit = null;
    obs[0].observed_at = 'not-a-time';
  });
  blocked(report, 'SOURCE_COMMIT_UNRESOLVED');
  blocked(report, 'OBSERVATION_TIME_INVALID');
});

test('TP-CONTROL-001: unexpected or duplicate remote observation blocks', () => {
  const report = evaluate((p, obs) => { obs.push(copy(obs[0])); });
  blocked(report, 'DUPLICATE_REMOTE_OBSERVATION');
});

test('TP-CONTROL-001: CLI is read-only and refuses mutating arguments', () => {
  assert.deepEqual(parsePublicationGateArgs(['--check', '--policy', 'quality/repository-publication-policy.json']), {
    check: true, policy: 'quality/repository-publication-policy.json',
  });
  assert.throws(() => parsePublicationGateArgs(['--write', '--policy', 'policy.json']));
  assert.throws(() => parsePublicationGateArgs(['--apply', '--policy', 'policy.json']));
  assert.throws(() => parsePublicationGateArgs(['--check']));
});

test('TP-CONTROL-001: unrecognized repository cannot be probed', () => {
  const observation = observeGithubRepository('attacker/repository', NOW);
  assert.equal(observation.available, false);
});


test('TP-CONTROL-001: explicit observation is never publication certification', () => {
  const report = buildObservationOnlyReport({ observations: fakeObservations(), now: NOW });
  assert.equal(report.mode, 'OBSERVATION_ONLY');
  assert.equal(report.result, 'OBSERVATION_COMPLETE');
  assert.equal(report.publication_certification, 'NOT_GRANTED');
  assert.equal(report.checked_repositories, 10);
  assert.equal(report.evidence_complete_repositories, 10);
  assert.equal(report.remote_mutations, 0);
  assert.equal(JSON.stringify(report).includes('APPROVED'), false);
});

test('TP-CONTROL-001: observation strips raw API secrets and paths', () => {
  const observations = fakeObservations();
  observations[0].raw_alert = {
    secret: 'SYNTHETIC_PRIVATE_SECRET_DO_NOT_PRINT', path: '/private/sensitive/file',
  };
  const result = JSON.stringify(buildObservationOnlyReport({ observations, now: NOW }));
  assert.equal(result.includes('SYNTHETIC_PRIVATE_SECRET_DO_NOT_PRINT'), false);
  assert.equal(result.includes('/private/sensitive/file'), false);
});

test('TP-CONTROL-001: unknown observations cannot look complete', () => {
  const observations = fakeObservations();
  observations[0] = { requested_repository: observations[0].requested_repository, available: false };
  const report = buildObservationOnlyReport({ observations, now: NOW });
  assert.equal(report.result, 'OBSERVATION_PARTIAL');
  assert.equal(report.evidence_complete_repositories, 9);
  assert.equal(report.repositories[0].available, false);
});

test('TP-CONTROL-001: open findings remain visible as redacted status', () => {
  const observations = fakeObservations();
  observations[0].open_secret_alerts = true;
  const report = buildObservationOnlyReport({ observations, now: NOW });
  assert.equal(report.publication_certification, 'NOT_GRANTED');
  assert.equal(report.repositories[0].open_secret_alerts, 'OPEN');
});

test('TP-CONTROL-001: observe mode cannot be combined with check or mutation', () => {
  assert.deepEqual(parsePublicationGateArgs(['--observe', '--policy', 'quality/repository-publication-policy.json']), {
    observe: true, policy: 'quality/repository-publication-policy.json',
  });
  assert.throws(() => parsePublicationGateArgs(['--observe', '--check', '--policy', 'policy.json']));
  assert.throws(() => parsePublicationGateArgs(['--observe', '--write', '--policy', 'policy.json']));
});

test('TP-CONTROL-001: secret scanning GET must request redacted alerts', () => {
  const source = fs.readFileSync(fileURLToPath(new URL('./repository-publication-gate.mjs', import.meta.url)), 'utf8');
  assert.match(source, /secret-scanning\/alerts\?state=open&per_page=1&hide_secret=true/);
  assert.doesNotMatch(source, /secret-scanning\/alerts\?state=open&per_page=1`/);
});


test('TP-CONTROL-001: CI distinguishes observation from certification', () => {
  const workflow = fs.readFileSync(fileURLToPath(new URL('../../.github/workflows/vento-repository-publication.yml', import.meta.url)), 'utf8');
  assert.match(workflow, /default: OBSERVE/);
  assert.match(workflow, /inputs\.mode == 'OBSERVE'/);
  assert.match(workflow, /inputs\.mode == 'CERTIFY'/);
  assert.match(workflow, /repository-publication-gate\.mjs --observe --policy/);
  assert.match(workflow, /repository-publication-gate\.mjs --check --policy/);
  assert.doesNotMatch(workflow, /permissions:\s*\n\s*contents: write/);
});
