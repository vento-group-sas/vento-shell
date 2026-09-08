import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { spawnSync } from 'node:child_process';
import {
  contentIdentity as qualityContentIdentity,
  logicalIdentity as qualityLogicalIdentity,
  stableJson as qualityStableJson,
} from './quality-primitives.mjs';

export const EVIDENCE_INSTANCE_ID = 'SHELL-CI-019::GLOBAL';
export const EVIDENCE_CONTRACT_ID = 'SHELL-CI-019';
export const REQUIRED_GATE_CONTEXT = 'VENTO Required Gate';
export const CANONICAL_REPOSITORIES = Object.freeze([
  'vento-group-sas/vento-shell',
  'vento-group-sas/vento-nexo',
  'vento-group-sas/vento-fogo',
  'vento-group-sas/vento-origo',
  'vento-group-sas/vento-pulso',
  'vento-group-sas/vento-viso',
  'vento-group-sas/vento-numera',
  'vento-group-sas/vento-anima',
]);

const TERMINAL = new Set(['PASS', 'FAIL', 'BLOCKED', 'CANCELLED', 'TIMED_OUT', 'STALE']);
const COMMIT = /^[0-9a-f]{40}$/u;
const SHA256 = /^sha256:[0-9a-f]{64}$/u;
const SECRET_KEYS = /(?:^|_)(?:password|passwd|secret|token|cookie|private_key|service_role_key|authorization)(?:$|_)/iu;
const SECRET_VALUES = [
  /-----BEGIN [A-Z ]*PRIVATE KEY-----/u,
  /\bgh[pousr]_[A-Za-z0-9]{20,}\b/u,
  /\bgithub_pat_[A-Za-z0-9_]{20,}\b/u,
  /\bsbp_[A-Za-z0-9]{20,}\b/u,
  /\beyJ[A-Za-z0-9_-]{10,}\.[A-Za-z0-9_-]{10,}\.[A-Za-z0-9_-]{10,}\b/u,
];



export function stableJson(value) {
  return qualityStableJson(value);
}

export const logicalIdentity = qualityLogicalIdentity;
export const contentIdentity = qualityContentIdentity;

function publisherIdentity() {
  return contentIdentity(fs.readFileSync(fileURLToPath(import.meta.url), 'utf8').replace(/\r\n?/gu, '\n'));
}

function scanSecrets(value, trail = '$', out = []) {
  if (Array.isArray(value)) {
    value.forEach((item, index) => scanSecrets(item, `${trail}[${index}]`, out));
  } else if (value && typeof value === 'object') {
    for (const [key, item] of Object.entries(value)) {
      if (SECRET_KEYS.test(key)) out.push(`${trail}.${key}`);
      scanSecrets(item, `${trail}.${key}`, out);
    }
  } else if (typeof value === 'string' && SECRET_VALUES.some((pattern) => pattern.test(value))) {
    out.push(trail);
  }
  return out;
}

export function assertNoSecrets(value) {
  const findings = scanSecrets(value);
  if (findings.length) throw new Error(`PUBLICATION_SECRET_DETECTED:${findings.join(',')}`);
}

const text = (value) => value == null ? '' : String(value).trim();
const normalizedSha = (value) => text(value).toLowerCase();
const add = (errors, code) => { if (!errors.includes(code)) errors.push(code); };

function slug(value) {
  const result = text(value).toLowerCase().replace(/[^a-z0-9._-]+/gu, '-').replace(/^-+|-+$/gu, '');
  if (!result) throw new Error('PUBLICATION_SCHEMA_INVALID:EMPTY_SLUG');
  return result;
}

function normalizeCheck(check, index) {
  return {
    check_id: text(check?.check_id) || `check-${index + 1}`,
    owner: text(check?.owner) || 'UNRESOLVED',
    classification: check?.classification == null ? null : String(check.classification),
    applicability_reason: check?.applicability_reason == null ? null : String(check.applicability_reason),
    source_identity: check?.source_identity == null ? null : String(check.source_identity),
    result: (text(check?.result) || 'BLOCKED').toUpperCase(),
    started_at: check?.started_at ?? null,
    completed_at: check?.completed_at ?? null,
    invalidation_reason: check?.invalidation_reason ?? null,
  };
}

export function normalizeGateReport(report) {
  if (!report || typeof report !== 'object' || Array.isArray(report)) throw new Error('PUBLICATION_PAYLOAD_MISSING');
  assertNoSecrets(report);

  const repository = text(report.repository);
  const sourceCommit = normalizedSha(report.source_commit);
  const gateContext = text(report.gate_context).toUpperCase();
  const environment = report.environment == null ? null : text(report.environment);
  const result = text(report.result).toUpperCase();
  const errors = [];

  if (report.schema_version !== 1) add(errors, 'PUBLICATION_SCHEMA_INVALID');
  if (report.logical_gate_identity !== REQUIRED_GATE_CONTEXT) add(errors, 'PUBLICATION_EXECUTION_MISMATCH');
  if (!CANONICAL_REPOSITORIES.includes(repository)) add(errors, 'PUBLICATION_REPOSITORY_MISMATCH');
  if (!COMMIT.test(sourceCommit)) add(errors, 'PUBLICATION_COMMIT_MISMATCH');
  if (report.base_commit != null && !COMMIT.test(normalizedSha(report.base_commit))) add(errors, 'PUBLICATION_COMMIT_MISMATCH');
  if (!['MERGE', 'DEPLOY'].includes(gateContext)) add(errors, 'PUBLICATION_SCHEMA_INVALID');
  if (gateContext === 'MERGE' && environment !== null && environment !== '') add(errors, 'PUBLICATION_SCHEMA_INVALID');
  if (gateContext === 'DEPLOY' && (!environment || environment === 'PREVIEW_DIAGNOSTIC')) add(errors, 'PUBLICATION_SCHEMA_INVALID');
  if (!TERMINAL.has(result)) add(errors, 'PUBLICATION_SCHEMA_INVALID');
  if (!text(report.execution_identity)) add(errors, 'PUBLICATION_EXECUTION_MISMATCH');
  if (!text(report.required_check_set_identity) || !Array.isArray(report.checks) || !Array.isArray(report.block_reasons)) add(errors, 'PUBLICATION_SCHEMA_INVALID');
  if (report.affected_treq_ids != null && !Array.isArray(report.affected_treq_ids)) add(errors, 'PUBLICATION_SCHEMA_INVALID');
  if (errors.length) throw new Error(errors.join(','));

  return {
    schema_version: 1,
    logical_gate_identity: REQUIRED_GATE_CONTEXT,
    technical_check_identity: report.technical_check_identity == null ? null : String(report.technical_check_identity),
    gate_context: gateContext,
    repository,
    source_commit: sourceCommit,
    base_commit: report.base_commit == null ? null : normalizedSha(report.base_commit),
    target_branch: report.target_branch == null ? null : String(report.target_branch),
    environment: gateContext === 'MERGE' ? null : environment,
    package_id: report.package_id == null ? null : String(report.package_id),
    required_check_set_identity: String(report.required_check_set_identity),
    checks: report.checks.map(normalizeCheck),
    treq_registry_identity: report.treq_registry_identity == null ? null : String(report.treq_registry_identity),
    treq_baseline_identity: report.treq_baseline_identity == null ? null : String(report.treq_baseline_identity),
    affected_treq_ids: Array.isArray(report.affected_treq_ids) ? report.affected_treq_ids.map(String) : [],
    started_at: report.started_at ?? null,
    completed_at: report.completed_at ?? null,
    execution_identity: String(report.execution_identity),
    result,
    block_reasons: report.block_reasons.map(String),
  };
}

export function repositoryArtifactName({ repository, packageId, sourceCommit, gateContext, runId, runAttempt }) {
  return [
    'vento-test-evidence',
    slug(repository),
    slug(packageId == null || text(packageId) === '' ? 'repository' : packageId),
    normalizedSha(sourceCommit),
    slug(gateContext),
    slug(runId),
    slug(runAttempt),
  ].join('__');
}

function bundleBasis(bundle) {
  const basis = { ...bundle };
  delete basis.bundle_identity;
  delete basis.publication_reference;
  delete basis.publication_result;
  delete basis.published_at;
  delete basis.invalidation_reason;
  return basis;
}
export function buildRepositoryBundle({
  gateReport,
  provider = 'github-actions',
  providerRunId,
  providerRunAttempt,
  providerWorkflowIdentity,
  publishedAt = new Date().toISOString(),
}) {
  const report = normalizeGateReport(gateReport);
  const runId = text(providerRunId);
  const attempt = Number(providerRunAttempt);
  const workflow = text(providerWorkflowIdentity);
  if (!runId || !Number.isInteger(attempt) || attempt < 1 || !workflow) throw new Error('PUBLICATION_SCHEMA_INVALID');

  const artifactName = repositoryArtifactName({
    repository: report.repository,
    packageId: report.package_id,
    sourceCommit: report.source_commit,
    gateContext: report.gate_context,
    runId,
    runAttempt: attempt,
  });
  const gateDecisionSource = `${JSON.stringify(report, null, 2)}\n`;
  const bundle = {
    schema_version: 1,
    evidence_contract_id: EVIDENCE_CONTRACT_ID,
    repository: report.repository,
    source_commit: report.source_commit,
    base_commit: report.base_commit,
    target_branch: report.target_branch,
    environment: report.environment,
    gate_context: report.gate_context,
    gate_execution_identity: report.execution_identity,
    gate_result: report.result,
    gate_block_reasons: report.block_reasons,
    required_check_set_identity: report.required_check_set_identity,
    treq_registry_identity: report.treq_registry_identity,
    treq_baseline_identity: report.treq_baseline_identity,
    affected_treq_ids: report.affected_treq_ids,
    checks: report.checks,
    provider: String(provider),
    provider_run_id: runId,
    provider_run_attempt: attempt,
    provider_workflow_identity: workflow,
    started_at: report.started_at,
    completed_at: report.completed_at,
    published_at: publishedAt,
    artifacts: [{
      artifact_id: 'gate-decision.json',
      media_type: 'application/json',
      content_identity: contentIdentity(gateDecisionSource),
    }],
    publisher_identity: publisherIdentity(),
    bundle_identity: null,
    publication_reference: `github-actions-artifact:${report.repository}:${runId}:${attempt}:${artifactName}`,
    publication_result: 'PASS',
    invalidation_reason: report.result === 'STALE' ? (report.block_reasons.join(';') || 'STALE') : null,
  };
  bundle.bundle_identity = logicalIdentity(bundleBasis(bundle));
  assertNoSecrets(bundle);
  return { artifact_name: artifactName, gate_decision_source: gateDecisionSource, bundle };
}

export function validateRepositoryBundle(bundle, options = {}) {
  const errors = [];
  if (!bundle || typeof bundle !== 'object' || Array.isArray(bundle)) return { result: 'BLOCKED', errors: ['PUBLICATION_PAYLOAD_MISSING'] };
  try { assertNoSecrets(bundle); } catch { add(errors, 'PUBLICATION_SECRET_DETECTED'); }
  if (bundle.schema_version !== 1 || bundle.evidence_contract_id !== EVIDENCE_CONTRACT_ID) add(errors, 'PUBLICATION_SCHEMA_INVALID');
  if (!CANONICAL_REPOSITORIES.includes(bundle.repository)) add(errors, 'PUBLICATION_REPOSITORY_MISMATCH');
  if (!COMMIT.test(normalizedSha(bundle.source_commit))) add(errors, 'PUBLICATION_COMMIT_MISMATCH');
  if (bundle.base_commit != null && !COMMIT.test(normalizedSha(bundle.base_commit))) add(errors, 'PUBLICATION_COMMIT_MISMATCH');
  if (!['MERGE', 'DEPLOY'].includes(bundle.gate_context)) add(errors, 'PUBLICATION_SCHEMA_INVALID');
  if (bundle.gate_context === 'MERGE' && bundle.environment !== null) add(errors, 'PUBLICATION_SCHEMA_INVALID');
  if (bundle.gate_context === 'DEPLOY' && !text(bundle.environment)) add(errors, 'PUBLICATION_SCHEMA_INVALID');
  if (!TERMINAL.has(bundle.gate_result) || !text(bundle.gate_execution_identity)) add(errors, 'PUBLICATION_SCHEMA_INVALID');
  if (!Array.isArray(bundle.artifacts) || !bundle.artifacts.length) add(errors, 'PUBLICATION_SCHEMA_INVALID');

  const ids = new Set();
  for (const artifact of bundle.artifacts ?? []) {
    if (!text(artifact?.artifact_id) || ids.has(artifact?.artifact_id)) add(errors, 'PUBLICATION_SCHEMA_INVALID');
    ids.add(artifact?.artifact_id);
    if (!SHA256.test(text(artifact?.content_identity))) add(errors, 'PUBLICATION_CONTENT_IDENTITY_MISMATCH');
  }

  if (options.gateReportSource != null) {
    const decision = (bundle.artifacts ?? []).find((artifact) => artifact.artifact_id === 'gate-decision.json');
    if (!decision || decision.content_identity !== contentIdentity(options.gateReportSource)) add(errors, 'PUBLICATION_CONTENT_IDENTITY_MISMATCH');
  }
  if (bundle.bundle_identity !== logicalIdentity(bundleBasis(bundle))) add(errors, 'PUBLICATION_BUNDLE_IDENTITY_MISMATCH');
  if (!text(bundle.publication_reference)) add(errors, 'PUBLICATION_REFERENCE_MISSING');
  else if (!text(bundle.publication_reference).startsWith('github-actions-artifact:')) add(errors, 'PUBLICATION_REFERENCE_INVALID');
  if (bundle.publication_result !== 'PASS') add(errors, 'PUBLICATION_NOT_RETRIEVABLE');
  if (options.expectedRepository != null && bundle.repository !== options.expectedRepository) add(errors, 'PUBLICATION_REPOSITORY_MISMATCH');
  if (options.expectedSourceCommit != null && normalizedSha(bundle.source_commit) !== normalizedSha(options.expectedSourceCommit)) add(errors, 'PUBLICATION_COMMIT_MISMATCH');
  if (options.expectedExecutionIdentity != null && bundle.gate_execution_identity !== options.expectedExecutionIdentity) add(errors, 'PUBLICATION_EXECUTION_MISMATCH');
  return { result: errors.length ? 'BLOCKED' : 'PASS', errors, bundle_identity: bundle.bundle_identity ?? null };
}

function dossierBasis(dossier) {
  const basis = { ...dossier };
  delete basis.dossier_identity;
  delete basis.created_at;
  return basis;
}
export function buildPackageDossier({ packageId, requiredRepositories, bundles, packageExecutionIdentity, createdAt = new Date().toISOString() }) {
  if (!text(packageId) || !text(packageExecutionIdentity)) throw new Error('PACKAGE_ID_UNRESOLVED');
  if (!Array.isArray(requiredRepositories) || !requiredRepositories.length || !Array.isArray(bundles)) throw new Error('PACKAGE_REQUIRED_REPOSITORY_MISSING');

  const required = requiredRepositories.map(String);
  if (new Set(required).size !== required.length) throw new Error('PACKAGE_BUNDLE_DUPLICATED');
  if (required.some((repo) => !CANONICAL_REPOSITORIES.includes(repo))) throw new Error('PACKAGE_UNEXPECTED_REPOSITORY');

  const byRepo = new Map();
  const reasons = [];
  for (const bundle of bundles) {
    const repo = text(bundle?.repository);
    if (byRepo.has(repo)) add(reasons, 'PACKAGE_BUNDLE_DUPLICATED');
    byRepo.set(repo, bundle);
    if (!required.includes(repo)) add(reasons, 'PACKAGE_UNEXPECTED_REPOSITORY');
  }

  const rows = [];
  const treq = new Set();
  let stale = false;
  let failed = false;
  let blocked = false;

  for (const repo of required) {
    const bundle = byRepo.get(repo);
    if (!bundle) { add(reasons, 'PACKAGE_REQUIRED_REPOSITORY_MISSING'); continue; }
    const valid = validateRepositoryBundle(bundle, { expectedRepository: repo });
    if (valid.result !== 'PASS') { stale = true; add(reasons, 'PACKAGE_BUNDLE_STALE'); }
    if (bundle.gate_result === 'STALE') stale = true;
    if (bundle.gate_result === 'FAIL') failed = true;
    if (['BLOCKED', 'CANCELLED', 'TIMED_OUT'].includes(bundle.gate_result) || bundle.publication_result !== 'PASS') blocked = true;
    (bundle.affected_treq_ids ?? []).forEach((id) => treq.add(String(id)));
    rows.push({
      repository: repo,
      source_commit: bundle.source_commit,
      gate_context: bundle.gate_context,
      environment: bundle.environment,
      bundle_identity: bundle.bundle_identity,
      publication_reference: bundle.publication_reference,
      gate_result: bundle.gate_result,
      publication_result: bundle.publication_result,
    });
  }

  const complete = !reasons.length && rows.length === required.length && bundles.length === required.length;
  let result = 'PASS';
  if (stale) result = 'STALE';
  else if (failed) result = 'FAIL';
  else if (!complete || blocked) result = 'BLOCKED';

  const dossier = {
    schema_version: 1,
    evidence_contract_id: EVIDENCE_CONTRACT_ID,
    package_id: String(packageId),
    required_repository_set_identity: logicalIdentity([...required].sort()),
    repositories: rows,
    affected_treq_ids: [...treq].sort((a, b) => a.localeCompare(b, 'en')),
    created_at: createdAt,
    package_execution_identity: String(packageExecutionIdentity),
    dossier_identity: null,
    completeness: complete ? 'COMPLETE' : 'INCOMPLETE',
    result,
    block_reasons: reasons,
  };
  dossier.dossier_identity = logicalIdentity(dossierBasis(dossier));
  assertNoSecrets(dossier);
  return dossier;
}

export function validatePackageDossier(dossier) {
  const errors = [];
  if (!dossier || typeof dossier !== 'object' || Array.isArray(dossier)) return { result: 'BLOCKED', errors: ['PUBLICATION_PAYLOAD_MISSING'] };
  try { assertNoSecrets(dossier); } catch { add(errors, 'PUBLICATION_SECRET_DETECTED'); }
  if (dossier.schema_version !== 1 || dossier.evidence_contract_id !== EVIDENCE_CONTRACT_ID) add(errors, 'PUBLICATION_SCHEMA_INVALID');
  if (!text(dossier.package_id) || !text(dossier.package_execution_identity)) add(errors, 'PACKAGE_ID_UNRESOLVED');
  if (!['COMPLETE', 'INCOMPLETE'].includes(dossier.completeness) || !['PASS', 'FAIL', 'BLOCKED', 'STALE'].includes(dossier.result)) add(errors, 'PUBLICATION_SCHEMA_INVALID');
  if (!Array.isArray(dossier.repositories)) add(errors, 'PUBLICATION_SCHEMA_INVALID');

  const seen = new Set();
  for (const row of dossier.repositories ?? []) {
    if (seen.has(row.repository)) add(errors, 'PACKAGE_BUNDLE_DUPLICATED');
    seen.add(row.repository);
    if (!CANONICAL_REPOSITORIES.includes(row.repository)) add(errors, 'PACKAGE_UNEXPECTED_REPOSITORY');
    if (!COMMIT.test(normalizedSha(row.source_commit)) || !SHA256.test(text(row.bundle_identity))) add(errors, 'PACKAGE_BUNDLE_STALE');
    if (!text(row.publication_reference)) add(errors, 'PUBLICATION_REFERENCE_MISSING');
    if (dossier.result === 'PASS' && (row.gate_result !== 'PASS' || row.publication_result !== 'PASS')) add(errors, 'PACKAGE_BUNDLE_STALE');
  }
  if (dossier.completeness === 'COMPLETE' && !(dossier.repositories ?? []).length) add(errors, 'PACKAGE_REQUIRED_REPOSITORY_MISSING');
  if (dossier.dossier_identity !== logicalIdentity(dossierBasis(dossier))) add(errors, 'PUBLICATION_BUNDLE_IDENTITY_MISMATCH');
  return { result: errors.length ? 'BLOCKED' : 'PASS', errors, dossier_identity: dossier.dossier_identity ?? null };
}

export function writeRepositoryBundle({ gateReport, outputDirectory, provider, providerRunId, providerRunAttempt, providerWorkflowIdentity }) {
  fs.mkdirSync(outputDirectory, { recursive: true });
  if (fs.existsSync(path.join(outputDirectory, 'bundle.json')) || fs.existsSync(path.join(outputDirectory, 'gate-decision.json'))) {
    throw new Error('PUBLICATION_OUTPUT_ALREADY_EXISTS');
  }
  const built = buildRepositoryBundle({ gateReport, provider, providerRunId, providerRunAttempt, providerWorkflowIdentity });
  fs.writeFileSync(path.join(outputDirectory, 'gate-decision.json'), built.gate_decision_source, 'utf8');
  fs.writeFileSync(path.join(outputDirectory, 'bundle.json'), `${JSON.stringify(built.bundle, null, 2)}\n`, 'utf8');
  return built;
}

export function verifyBundleFiles({ bundlePath, gateReportPath, expectedRepository, expectedSourceCommit, expectedExecutionIdentity }) {
  const gateReportSource = fs.readFileSync(gateReportPath, 'utf8');
  return validateRepositoryBundle(JSON.parse(fs.readFileSync(bundlePath, 'utf8')), {
    gateReportSource,
    expectedRepository,
    expectedSourceCommit,
    expectedExecutionIdentity,
  });
}

function sample(overrides = {}) {
  return {
    schema_version: 1,
    logical_gate_identity: REQUIRED_GATE_CONTEXT,
    gate_context: 'MERGE',
    repository: 'vento-group-sas/vento-shell',
    source_commit: 'a'.repeat(40),
    base_commit: 'b'.repeat(40),
    target_branch: 'main',
    environment: null,
    package_id: null,
    required_check_set_identity: logicalIdentity([{ check_id: 'npm-test', owner: 'SHELL-CI-016' }]),
    checks: [{ check_id: 'npm-test', owner: 'SHELL-CI-016', result: 'PASS' }],
    treq_registry_identity: `sha256:${'c'.repeat(64)}`,
    treq_baseline_identity: 'b'.repeat(40),
    affected_treq_ids: [],
    started_at: '2026-08-18T20:00:00.000Z',
    completed_at: '2026-08-18T20:01:00.000Z',
    execution_identity: 'github:100:1',
    result: 'PASS',
    block_reasons: [],
    ...overrides,
  };
}

function sampleBundle(overrides = {}, attempt = 1) {
  return buildRepositoryBundle({
    gateReport: sample(overrides),
    providerRunId: '100',
    providerRunAttempt: attempt,
    providerWorkflowIdentity: 'workflow:test',
  }).bundle;
}

export function runSelfCertification() {
  const scenarios = {
    positive: [
      ['pass bundle', () => validateRepositoryBundle(sampleBundle()).result === 'PASS'],
      ['fail preserved', () => sampleBundle({ result: 'FAIL', block_reasons: ['x'] }).gate_result === 'FAIL'],
      ['blocked preserved', () => sampleBundle({ result: 'BLOCKED', block_reasons: ['x'] }).gate_result === 'BLOCKED'],
      ['rerun new identity', () => sampleBundle({}, 1).bundle_identity !== sampleBundle({ execution_identity: 'github:100:2' }, 2).bundle_identity],
      ['new sha new identity', () => sampleBundle().bundle_identity !== sampleBundle({ source_commit: 'd'.repeat(40) }).bundle_identity],
      ['merge environment null', () => sampleBundle().environment === null],
      ['deploy environment exact', () => sampleBundle({ gate_context: 'DEPLOY', environment: 'STAGING', base_commit: null }).environment === 'STAGING'],
      ['single dossier', () => buildPackageDossier({ packageId: 'PKG-A', requiredRepositories: ['vento-group-sas/vento-shell'], bundles: [sampleBundle()], packageExecutionIdentity: 'pkg:a:1' }).result === 'PASS'],
      ['multi dossier', () => {
        const b = sampleBundle({ repository: 'vento-group-sas/vento-nexo', source_commit: 'd'.repeat(40), execution_identity: 'github:200:1' });
        return buildPackageDossier({ packageId: 'PKG-B', requiredRepositories: ['vento-group-sas/vento-shell', 'vento-group-sas/vento-nexo'], bundles: [sampleBundle(), b], packageExecutionIdentity: 'pkg:b:1' }).result === 'PASS';
      }],
      ['bundle reuse', () => {
        const b = sampleBundle();
        const a = buildPackageDossier({ packageId: 'PKG-C', requiredRepositories: [b.repository], bundles: [b], packageExecutionIdentity: 'pkg:c:1' });
        const d = buildPackageDossier({ packageId: 'PKG-D', requiredRepositories: [b.repository], bundles: [b], packageExecutionIdentity: 'pkg:d:1' });
        return a.repositories[0].bundle_identity === d.repositories[0].bundle_identity;
      }],
      ['hash valid', () => SHA256.test(sampleBundle().bundle_identity)],
      ['reference exact', () => sampleBundle().publication_reference.includes('github-actions-artifact:')],
      ['zero treq', () => sampleBundle().affected_treq_ids.length === 0],
      ['affected treq', () => sampleBundle({ affected_treq_ids: ['TREQ-SHELL-005'] }).affected_treq_ids[0] === 'TREQ-SHELL-005'],
      ['provider identity', () => sampleBundle().provider_workflow_identity === 'workflow:test'],
    ],
    negative: [
      ['missing repo', () => { try { sampleBundle({ repository: '' }); return false; } catch { return true; } }],
      ['bad sha', () => { try { sampleBundle({ source_commit: 'x' }); return false; } catch { return true; } }],
      ['wrong repo', () => validateRepositoryBundle(sampleBundle(), { expectedRepository: 'vento-group-sas/vento-nexo' }).errors.includes('PUBLICATION_REPOSITORY_MISMATCH')],
      ['wrong sha', () => validateRepositoryBundle(sampleBundle(), { expectedSourceCommit: 'f'.repeat(40) }).errors.includes('PUBLICATION_COMMIT_MISMATCH')],
      ['wrong execution', () => validateRepositoryBundle(sampleBundle(), { expectedExecutionIdentity: 'other' }).errors.includes('PUBLICATION_EXECUTION_MISMATCH')],
      ['content altered', () => validateRepositoryBundle(sampleBundle(), { gateReportSource: '{}' }).errors.includes('PUBLICATION_CONTENT_IDENTITY_MISMATCH')],
      ['bundle altered', () => { const b = sampleBundle(); b.bundle_identity = `sha256:${'0'.repeat(64)}`; return validateRepositoryBundle(b).errors.includes('PUBLICATION_BUNDLE_IDENTITY_MISMATCH'); }],
      ['reference missing', () => { const b = sampleBundle(); b.publication_reference = ''; return validateRepositoryBundle(b).errors.includes('PUBLICATION_REFERENCE_MISSING'); }],
      ['secret rejected', () => { try { sampleBundle({ secret_token: `ghp_${'A'.repeat(30)}` }); return false; } catch { return true; } }],
      ['overwrite blocked', () => {
        const root = fs.mkdtempSync(path.join(os.tmpdir(), 'ci019-self-'));
        try {
          writeRepositoryBundle({ gateReport: sample(), outputDirectory: root, providerRunId: '1', providerRunAttempt: 1, providerWorkflowIdentity: 'w' });
          try { writeRepositoryBundle({ gateReport: sample(), outputDirectory: root, providerRunId: '1', providerRunAttempt: 1, providerWorkflowIdentity: 'w' }); return false; } catch { return true; }
        } finally { fs.rmSync(root, { recursive: true, force: true }); }
      }],
      ['package id missing', () => { try { buildPackageDossier({ packageId: '', requiredRepositories: ['vento-group-sas/vento-shell'], bundles: [sampleBundle()], packageExecutionIdentity: 'x' }); return false; } catch { return true; } }],
      ['package repo missing', () => buildPackageDossier({ packageId: 'PKG', requiredRepositories: ['vento-group-sas/vento-shell', 'vento-group-sas/vento-nexo'], bundles: [sampleBundle()], packageExecutionIdentity: 'x' }).completeness === 'INCOMPLETE'],
      ['package extra repo', () => {
        const n = sampleBundle({ repository: 'vento-group-sas/vento-nexo', source_commit: 'd'.repeat(40), execution_identity: 'github:2:1' });
        return buildPackageDossier({ packageId: 'PKG', requiredRepositories: ['vento-group-sas/vento-shell'], bundles: [sampleBundle(), n], packageExecutionIdentity: 'x' }).block_reasons.includes('PACKAGE_UNEXPECTED_REPOSITORY');
      }],
      ['package duplicate', () => { const b = sampleBundle(); return buildPackageDossier({ packageId: 'PKG', requiredRepositories: [b.repository], bundles: [b, b], packageExecutionIdentity: 'x' }).block_reasons.includes('PACKAGE_BUNDLE_DUPLICATED'); }],
      ['package stale', () => buildPackageDossier({ packageId: 'PKG', requiredRepositories: ['vento-group-sas/vento-shell'], bundles: [sampleBundle({ result: 'STALE', block_reasons: ['stale'] })], packageExecutionIdentity: 'x' }).result === 'STALE'],
      ['complete empty invalid', () => validatePackageDossier({ schema_version: 1, evidence_contract_id: EVIDENCE_CONTRACT_ID, package_id: 'PKG', required_repository_set_identity: logicalIdentity([]), repositories: [], affected_treq_ids: [], created_at: 'x', package_execution_identity: 'x', dossier_identity: 'bad', completeness: 'COMPLETE', result: 'PASS', block_reasons: [] }).result === 'BLOCKED'],
      ['failing repo not pass', () => buildPackageDossier({ packageId: 'PKG', requiredRepositories: ['vento-group-sas/vento-shell'], bundles: [sampleBundle({ result: 'FAIL', block_reasons: ['x'] })], packageExecutionIdentity: 'x' }).result === 'FAIL'],
      ['publication fail not pass', () => { const b = sampleBundle(); b.publication_result = 'FAIL'; b.bundle_identity = logicalIdentity(bundleBasis(b)); return buildPackageDossier({ packageId: 'PKG', requiredRepositories: [b.repository], bundles: [b], packageExecutionIdentity: 'x' }).result !== 'PASS'; }],
      ['latest not authoritative', () => { const b = sampleBundle(); b.publication_reference = 'latest'; return validateRepositoryBundle(b).errors.includes('PUBLICATION_REFERENCE_INVALID'); }],
      ['preview rejected', () => { try { sampleBundle({ gate_context: 'DEPLOY', environment: 'PREVIEW_DIAGNOSTIC', base_commit: null }); return false; } catch { return true; } }],
    ],
    regression: [
      ['gate name stable', () => REQUIRED_GATE_CONTEXT === 'VENTO Required Gate'],
      ['owner stable', () => EVIDENCE_CONTRACT_ID === 'SHELL-CI-019'],
      ['no npm test execution', () => sampleBundle().checks[0].owner === 'SHELL-CI-016'],
      ['no raw log parser', () => sampleBundle({ stdout: 'FAIL', stderr: 'FAIL', result: 'PASS' }).gate_result === 'PASS'],
      ['no git mutation', () => sampleBundle().provider === 'github-actions'],
      ['no env artifact', () => !sampleBundle().artifacts.some((a) => /\.env/iu.test(a.artifact_id))],
      ['failed result retained', () => sampleBundle({ result: 'FAIL', block_reasons: ['x'] }).gate_result === 'FAIL'],
      ['attempt named', () => repositoryArtifactName({ repository: 'vento-group-sas/vento-shell', sourceCommit: 'a'.repeat(40), gateContext: 'MERGE', runId: '1', runAttempt: '1' }) !== repositoryArtifactName({ repository: 'vento-group-sas/vento-shell', sourceCommit: 'a'.repeat(40), gateContext: 'MERGE', runId: '1', runAttempt: '2' })],
      ['publication failure blocks', () => { const b = sampleBundle(); b.publication_result = 'FAIL'; b.bundle_identity = logicalIdentity(bundleBasis(b)); return validateRepositoryBundle(b).result === 'BLOCKED'; }],
      ['package never inferred', () => { try { buildPackageDossier({ packageId: null, requiredRepositories: ['vento-group-sas/vento-shell'], bundles: [sampleBundle()], packageExecutionIdentity: 'x' }); return false; } catch { return true; } }],
      ['independent shas', () => sampleBundle().source_commit !== sampleBundle({ repository: 'vento-group-sas/vento-nexo', source_commit: 'd'.repeat(40), execution_identity: 'g:2' }).source_commit],
      ['no treq mutation', () => sampleBundle({ affected_treq_ids: ['TREQ-SHELL-005'] }).affected_treq_ids[0] === 'TREQ-SHELL-005'],
      ['no supabase mutation', () => !Object.hasOwn(sampleBundle(), 'supabase')],
      ['no deploy command', () => sampleBundle({ gate_context: 'DEPLOY', environment: 'STAGING', base_commit: null }).provider === 'github-actions'],
      ['no rollback command', () => !Object.hasOwn(sampleBundle(), 'rollback')],
      ['no ci020', () => EVIDENCE_INSTANCE_ID === 'SHELL-CI-019::GLOBAL'],
    ],
  };

  const failures = [];
  for (const [group, rows] of Object.entries(scenarios)) {
    for (const [name, fn] of rows) {
      try { if (fn() !== true) failures.push(`${group}:${name}`); }
      catch (error) { failures.push(`${group}:${name}:${error instanceof Error ? error.message : String(error)}`); }
    }
  }
  return {
    schema_version: 1,
    instance_id: EVIDENCE_INSTANCE_ID,
    positive_count: scenarios.positive.length,
    negative_count: scenarios.negative.length,
    regression_count: scenarios.regression.length,
    scenario_count: Object.values(scenarios).reduce((sum, rows) => sum + rows.length, 0),
    result: failures.length ? 'BLOCKED' : 'PASS',
    failures,
  };
}

function gh(args, cwd = process.cwd()) {
  const child = spawnSync(process.platform === 'win32' ? 'gh.exe' : 'gh', args, {
    cwd, encoding: 'utf8', windowsHide: true,
    env: { ...process.env, GH_PAGER: 'cat', NO_COLOR: '1' },
    maxBuffer: 32 * 1024 * 1024,
  });
  if (child.error) throw child.error;
  if (child.status !== 0) throw new Error(String(child.stderr || child.stdout || `gh exited ${child.status}`).trim());
  return String(child.stdout ?? '');
}

function findFile(root, name) {
  const queue = [root];
  while (queue.length) {
    const current = queue.shift();
    for (const entry of fs.readdirSync(current, { withFileTypes: true })) {
      const target = path.join(current, entry.name);
      if (entry.isDirectory()) queue.push(target);
      else if (entry.isFile() && entry.name === name) return target;
    }
  }
  return null;
}

export function verifyGithubPublishedEvidence({ head }) {
  if (!text(head)) throw new Error('verify-github exige --head.');
  const repositories = [];
  const errors = [];

  for (const repository of CANONICAL_REPOSITORIES) {
    const row = { repository, head, head_sha: null, run_id: null, artifact_name: null, bundle_identity: null, result: 'BLOCKED', errors: [] };
    let tmp = null;
    try {
      const ref = JSON.parse(gh(['api', `repos/${repository}/git/ref/heads/${head}`]));
      row.head_sha = normalizedSha(ref?.object?.sha);
      if (!COMMIT.test(row.head_sha)) throw new Error('REMOTE_HEAD_INVALID');

      const runs = JSON.parse(gh(['run', 'list', '--repo', repository, '--branch', head, '--event', 'pull_request', '--limit', '50', '--json', 'databaseId,headSha,status,conclusion,createdAt,workflowName']));
      const candidates = runs
        .filter((run) => run.workflowName === REQUIRED_GATE_CONTEXT && normalizedSha(run.headSha) === row.head_sha && run.status === 'completed' && run.conclusion === 'success')
        .sort((a, b) => String(b.createdAt).localeCompare(String(a.createdAt)));

      let selected;
      let artifact;
      for (const run of candidates) {
        const response = JSON.parse(gh(['api', '--method', 'GET', `repos/${repository}/actions/runs/${run.databaseId}/artifacts`, '-f', 'per_page=100']));
        artifact = (response.artifacts ?? []).find((item) => item.expired !== true && text(item.name).startsWith('vento-test-evidence__'));
        if (artifact) { selected = run; break; }
      }
      if (!selected || !artifact) throw new Error('PUBLICATION_NOT_RETRIEVABLE');

      tmp = fs.mkdtempSync(path.join(os.tmpdir(), 'vento-ci019-gh-'));
      gh(['run', 'download', String(selected.databaseId), '--repo', repository, '--name', String(artifact.name), '--dir', tmp]);

      const bundlePath = findFile(tmp, 'bundle.json');
      const gatePath = findFile(tmp, 'gate-decision.json');
      if (!bundlePath || !gatePath) throw new Error('PUBLICATION_PAYLOAD_MISSING');
      const validation = verifyBundleFiles({ bundlePath, gateReportPath: gatePath, expectedRepository: repository, expectedSourceCommit: row.head_sha });
      if (validation.result !== 'PASS') throw new Error(validation.errors.join(','));

      row.run_id = selected.databaseId;
      row.artifact_name = artifact.name;
      row.bundle_identity = validation.bundle_identity;
      row.result = 'PASS';
    } catch (error) {
      row.errors.push(error instanceof Error ? error.message : String(error));
      errors.push(`${repository}:${row.errors.join(',')}`);
    } finally {
      if (tmp) fs.rmSync(tmp, { recursive: true, force: true });
    }
    repositories.push(row);
  }

  return {
    schema_version: 1,
    instance_id: EVIDENCE_INSTANCE_ID,
    head,
    repository_count: CANONICAL_REPOSITORIES.length,
    passed_repository_count: repositories.filter((row) => row.result === 'PASS').length,
    result: errors.length ? 'BLOCKED' : 'PASS',
    errors,
    repositories,
  };
}

function readJson(file) { return JSON.parse(fs.readFileSync(file, 'utf8')); }

function parseArgs(argv) {
  const command = argv[0] ?? null;
  const options = { json: false };
  for (let i = 1; i < argv.length; i += 1) {
    const arg = argv[i];
    if (arg === '--json') { options.json = true; continue; }
    if (!arg.startsWith('--') || argv[i + 1] == null || argv[i + 1].startsWith('--')) throw new Error(`Argumento inválido: ${arg}`);
    const key = arg.slice(2).replace(/-([a-z])/gu, (_, c) => c.toUpperCase());
    options[key] = argv[++i];
  }
  return { command, options };
}

function print(result, json) {
  console.log(json ? JSON.stringify(result, null, 2) : `${result.result}: ${EVIDENCE_INSTANCE_ID}`);
  if (result.result !== 'PASS') process.exitCode = 1;
}

function main() {
  const { command, options } = parseArgs(process.argv.slice(2));

  if (command === 'build-bundle') {
    if (!options.gateReport || !options.outputDir) throw new Error('build-bundle exige --gate-report y --output-dir.');
    const gateReport = readJson(path.resolve(options.gateReport));
    if (options.repository && gateReport.repository !== options.repository) throw new Error('PUBLICATION_REPOSITORY_MISMATCH');
    const built = writeRepositoryBundle({
      gateReport,
      outputDirectory: path.resolve(options.outputDir),
      provider: options.provider ?? 'github-actions',
      providerRunId: options.runId,
      providerRunAttempt: Number(options.runAttempt),
      providerWorkflowIdentity: options.workflow,
    });
    if (options.githubOutput) {
      fs.appendFileSync(options.githubOutput, [
        `artifact_name=${built.artifact_name}`,
        `bundle_identity=${built.bundle.bundle_identity}`,
        `publication_reference=${built.bundle.publication_reference}`,
        `gate_result=${built.bundle.gate_result}`,
        '',
      ].join('\n'), 'utf8');
    }
    print({ result: 'PASS', instance_id: EVIDENCE_INSTANCE_ID, artifact_name: built.artifact_name, bundle_identity: built.bundle.bundle_identity, publication_reference: built.bundle.publication_reference }, options.json);
    return;
  }

  if (command === 'verify-bundle') {
    if (!options.bundle || !options.gateReport) throw new Error('verify-bundle exige --bundle y --gate-report.');
    print(verifyBundleFiles({
      bundlePath: path.resolve(options.bundle),
      gateReportPath: path.resolve(options.gateReport),
      expectedRepository: options.repository,
      expectedSourceCommit: options.sourceCommit,
      expectedExecutionIdentity: options.executionIdentity,
    }), options.json);
    return;
  }

  if (command === 'build-dossier') {
    if (!options.input || !options.output) throw new Error('build-dossier exige --input y --output.');
    const dossier = buildPackageDossier(readJson(path.resolve(options.input)));
    fs.writeFileSync(path.resolve(options.output), `${JSON.stringify(dossier, null, 2)}\n`, 'utf8');
    print({ result: validatePackageDossier(dossier).result, instance_id: EVIDENCE_INSTANCE_ID, dossier_identity: dossier.dossier_identity, completeness: dossier.completeness, dossier_result: dossier.result }, options.json);
    return;
  }

  if (command === 'verify-dossier') {
    if (!options.input) throw new Error('verify-dossier exige --input.');
    print(validatePackageDossier(readJson(path.resolve(options.input))), options.json);
    return;
  }

  if (command === 'self-certify') { print(runSelfCertification(), options.json); return; }
  if (command === 'verify-github') { print(verifyGithubPublishedEvidence({ head: options.head }), options.json); return; }
  throw new Error(`Comando no reconocido: ${command ?? 'VACÍO'}.`);
}

const isCli = process.argv[1] && path.resolve(process.argv[1]) === path.resolve(fileURLToPath(import.meta.url));
if (isCli) {
  try { main(); }
  catch (error) { console.error(error instanceof Error ? error.message : String(error)); process.exitCode = 1; }
}
