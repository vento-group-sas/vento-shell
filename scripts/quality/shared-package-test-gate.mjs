import crypto from 'node:crypto';
import fs from 'node:fs';
import path from 'node:path';
import { spawnSync } from 'node:child_process';
import { fileURLToPath } from 'node:url';
import {
  asSha256Identity as qualityAsSha256Identity,
  readJson as qualityReadJson,
  sha256 as qualitySha256,
  stableStringify as qualityStableStringify,
  writePrettyJson as qualityWritePrettyJson,
} from './quality-primitives.mjs';

export const CANONICAL_SHARED_PACKAGES = Object.freeze([
  '@vento/contracts',
  '@vento/os-context',
  '@vento/supabase',
  '@vento/ui-web',
]);

const GATE_INSTANCE_ID = 'SHELL-CI-001::GLOBAL';
const EVIDENCE_SCHEMA_VERSION = 1;
const RESULT_SCHEMA_VERSION = 1;
const CONTRACT_SCHEMA_VERSION = 1;
const DEFAULT_TIMEOUT_MS = 120_000;
const IMPLEMENTATION_FILENAME = 'shared-package-test-gate.mjs';
const IMPLEMENTATION_RELATIVE_PATH = `scripts/quality/${IMPLEMENTATION_FILENAME}`;
const GROUP_APPLICABILITY = new Set(['REQUIRED', 'CONDITIONAL']);
const GROUP_STATES = new Set(['PASS', 'FAIL', 'BLOCKED', 'CANCELLED', 'TIMED_OUT', 'NOT_APPLICABLE']);
const FINAL_STATES = new Set(['PASS', 'FAIL', 'BLOCKED', 'CANCELLED', 'TIMED_OUT']);
const MATERIAL_IDENTITY_FIELDS = Object.freeze([
  'package',
  'candidate_version',
  'source_commit',
  'manifest_identity',
  'internal_dependency_set',
  'runtime_identity',
  'test_contract_identity',
  'fixture_identities',
  'gate_implementation_identity',
]);
const SENSITIVE_KEY_PATTERN = /(authorization|cookie|credential|password|secret|token|api[_-]?key|private[_-]?key)/iu;

function normalizePath(filePath) {
  return String(filePath).replaceAll('\\', '/');
}

function isPlainObject(value) {
  return value !== null && typeof value === 'object' && !Array.isArray(value);
}



export function stableStringify(value) {
  return qualityStableStringify(value);
}

export function sha256(value) {
  return qualitySha256(value);
}

function asSha256Identity(value) {
  return qualityAsSha256Identity(value);
}

function nonEmptyString(value) {
  return typeof value === 'string' && value.trim().length > 0;
}

function nonNegativeInteger(value) {
  return Number.isInteger(value) && value >= 0;
}

function unique(values) {
  return [...new Set(values)];
}

function groupById(groups) {
  return new Map((groups ?? []).map((group) => [group.id, group]));
}

function normalizeRunnerCommand(command) {
  return command === '$NODE' ? process.execPath : command;
}

function assertRelativePath(candidate, label) {
  if (!nonEmptyString(candidate)) throw new Error(`${label} must be a non-empty relative path.`);
  if (path.isAbsolute(candidate)) throw new Error(`${label} must not be absolute.`);
  const normalized = normalizePath(path.normalize(candidate));
  if (normalized === '..' || normalized.startsWith('../')) {
    throw new Error(`${label} must remain inside the package root.`);
  }
  return normalized;
}

function readJson(filePath, label) {
  return qualityReadJson(filePath, label);
}

function runGit(root, args) {
  const result = spawnSync('git', args, {
    cwd: root,
    encoding: 'utf8',
    windowsHide: true,
  });
  if (result.error || result.status !== 0) return null;
  return result.stdout.trim();
}

function resolveRepositoryRoot(startPath) {
  const root = runGit(startPath, ['rev-parse', '--show-toplevel']);
  if (!root) throw new Error('Cannot resolve the Git repository root.');
  return path.resolve(root);
}

function sourceCommit(repositoryRoot) {
  const commit = runGit(repositoryRoot, ['rev-parse', 'HEAD']);
  if (!commit) throw new Error('Cannot resolve the source commit.');
  return commit;
}

function packageWorktreeChanges(repositoryRoot, packageRoot) {
  const relative = normalizePath(path.relative(repositoryRoot, packageRoot));
  const output = runGit(repositoryRoot, ['status', '--porcelain', '--', relative]);
  return output ?? '';
}

function packageSlug(packageName) {
  return packageName.replace(/^@/u, '').replaceAll('/', '__');
}

export function collectInternalDependencies(manifest) {
  const sections = ['dependencies', 'devDependencies', 'optionalDependencies', 'peerDependencies'];
  const entries = [];
  for (const section of sections) {
    const dependencies = isPlainObject(manifest?.[section]) ? manifest[section] : {};
    for (const [name, range] of Object.entries(dependencies)) {
      if (!name.startsWith('@vento/')) continue;
      entries.push({ name, range: String(range), section });
    }
  }
  return entries.sort((left, right) => {
    const nameOrder = left.name.localeCompare(right.name);
    return nameOrder || left.section.localeCompare(right.section) || left.range.localeCompare(right.range);
  });
}

export function validateTestContract(contract, { packageName = null } = {}) {
  const errors = [];
  if (!isPlainObject(contract)) return ['CONTRACT_NOT_OBJECT'];
  if (contract.schema_version !== CONTRACT_SCHEMA_VERSION) errors.push('CONTRACT_SCHEMA_VERSION_UNSUPPORTED');
  if (!nonEmptyString(contract.package)) errors.push('CONTRACT_PACKAGE_MISSING');
  if (nonEmptyString(contract.package) && !CANONICAL_SHARED_PACKAGES.includes(contract.package)) {
    errors.push('PACKAGE_NOT_CANONICAL');
  }
  if (packageName && contract.package !== packageName) errors.push('CONTRACT_PACKAGE_MISMATCH');
  if (!isPlainObject(contract.runner)) errors.push('RUNNER_MISSING');
  if (isPlainObject(contract.runner)) {
    if (!nonEmptyString(contract.runner.command)) errors.push('RUNNER_COMMAND_MISSING');
    if (!Array.isArray(contract.runner.args) || contract.runner.args.some((value) => typeof value !== 'string')) {
      errors.push('RUNNER_ARGS_INVALID');
    }
    if (contract.runner.timeout_ms !== undefined
      && (!Number.isInteger(contract.runner.timeout_ms) || contract.runner.timeout_ms <= 0)) {
      errors.push('RUNNER_TIMEOUT_INVALID');
    }
  }
  if (!Array.isArray(contract.required_groups) || contract.required_groups.length === 0) {
    errors.push('REQUIRED_GROUPS_EMPTY');
  } else {
    const ids = [];
    for (const group of contract.required_groups) {
      if (!isPlainObject(group) || !nonEmptyString(group.id)) {
        errors.push('GROUP_ID_INVALID');
        continue;
      }
      ids.push(group.id);
      if (!GROUP_APPLICABILITY.has(group.applicability)) {
        errors.push(`GROUP_APPLICABILITY_INVALID:${group.id}`);
      }
    }
    if (unique(ids).length !== ids.length) errors.push('GROUP_ID_DUPLICATE');
  }
  if (contract.fixtures !== undefined) {
    if (!Array.isArray(contract.fixtures) || contract.fixtures.some((fixture) => !nonEmptyString(fixture))) {
      errors.push('FIXTURES_INVALID');
    } else {
      for (const fixture of contract.fixtures) {
        try {
          assertRelativePath(fixture, 'fixture');
        } catch {
          errors.push(`FIXTURE_PATH_INVALID:${fixture}`);
        }
      }
    }
  }
  return unique(errors);
}

function validateGroupResult(group) {
  const errors = [];
  if (!isPlainObject(group) || !nonEmptyString(group.id)) return ['RESULT_GROUP_ID_INVALID'];
  if (!GROUP_STATES.has(group.status)) errors.push(`RESULT_GROUP_STATUS_INVALID:${group.id}`);
  if (!isPlainObject(group.tests)) {
    errors.push(`RESULT_GROUP_COUNTS_MISSING:${group.id}`);
    return errors;
  }
  const { total, passed, failed, skipped } = group.tests;
  if (![total, passed, failed, skipped].every(nonNegativeInteger)) {
    errors.push(`RESULT_GROUP_COUNTS_INVALID:${group.id}`);
    return errors;
  }
  if (passed + failed + skipped !== total) errors.push(`RESULT_GROUP_COUNTS_INCONSISTENT:${group.id}`);
  return errors;
}

function validateRunnerResult(result, contract) {
  const errors = [];
  if (!isPlainObject(result)) return ['RESULT_NOT_OBJECT'];
  if (result.schema_version !== RESULT_SCHEMA_VERSION) errors.push('RESULT_SCHEMA_VERSION_UNSUPPORTED');
  if (result.package !== contract.package) errors.push('RESULT_PACKAGE_MISMATCH');
  if (!FINAL_STATES.has(result.outcome)) errors.push('RESULT_OUTCOME_INVALID');
  if (!Array.isArray(result.groups)) return [...errors, 'RESULT_GROUPS_MISSING'];
  const groupIds = result.groups.map((group) => group?.id).filter(nonEmptyString);
  if (unique(groupIds).length !== groupIds.length) errors.push('RESULT_GROUP_DUPLICATE');
  const expected = new Set(contract.required_groups.map((group) => group.id));
  for (const group of result.groups) {
    errors.push(...validateGroupResult(group));
    if (nonEmptyString(group?.id) && !expected.has(group.id)) errors.push(`RESULT_GROUP_UNDECLARED:${group.id}`);
  }
  for (const group of contract.required_groups) {
    if (!groupIds.includes(group.id)) errors.push(`RESULT_GROUP_MISSING:${group.id}`);
  }
  return unique(errors);
}

function aggregateCounts(groups) {
  return groups.reduce(
    (totals, group) => {
      if (!isPlainObject(group?.tests)) return totals;
      totals.total += group.tests.total ?? 0;
      totals.passed += group.tests.passed ?? 0;
      totals.failed += group.tests.failed ?? 0;
      totals.skipped += group.tests.skipped ?? 0;
      return totals;
    },
    { total: 0, passed: 0, failed: 0, skipped: 0 },
  );
}

function statePriority(states) {
  if (states.includes('TIMED_OUT')) return 'TIMED_OUT';
  if (states.includes('CANCELLED')) return 'CANCELLED';
  if (states.includes('BLOCKED')) return 'BLOCKED';
  if (states.includes('FAIL')) return 'FAIL';
  return 'PASS';
}

export function detectFlakyHistory(history, materialIdentitySha256, currentOutcome) {
  if (currentOutcome !== 'PASS') return false;
  return history.some((entry) => entry?.material_identity_sha256 === materialIdentitySha256
    && entry?.outcome !== 'PASS');
}

export function evaluateTestResult({
  contract,
  result,
  processResult = { status: 0, signal: null, timedOut: false, error: null },
  identity,
  history = [],
}) {
  const contractErrors = validateTestContract(contract, { packageName: identity?.package ?? null });
  if (contractErrors.length > 0) {
    return {
      outcome: 'BLOCKED',
      reasons: contractErrors,
      required_groups: [],
      executed_groups: [],
      conditional_not_applicable: [],
      test_counts: { total: 0, passed: 0, failed: 0, skipped: 0 },
      attempt_number: 1,
    };
  }

  const sameIdentityHistory = history.filter(
    (entry) => entry?.material_identity_sha256 === identity.material_identity_sha256,
  );
  const attemptNumber = sameIdentityHistory.length + 1;

  if (processResult.timedOut) {
    return {
      outcome: 'TIMED_OUT',
      reasons: ['RUNNER_TIMED_OUT'],
      required_groups: contract.required_groups.map((group) => group.id),
      executed_groups: [],
      conditional_not_applicable: [],
      test_counts: { total: 0, passed: 0, failed: 0, skipped: 0 },
      attempt_number: attemptNumber,
    };
  }
  if (processResult.signal) {
    return {
      outcome: 'CANCELLED',
      reasons: [`RUNNER_SIGNAL:${processResult.signal}`],
      required_groups: contract.required_groups.map((group) => group.id),
      executed_groups: [],
      conditional_not_applicable: [],
      test_counts: { total: 0, passed: 0, failed: 0, skipped: 0 },
      attempt_number: attemptNumber,
    };
  }
  if (processResult.error) {
    return {
      outcome: 'BLOCKED',
      reasons: [`RUNNER_ERROR:${processResult.error}`],
      required_groups: contract.required_groups.map((group) => group.id),
      executed_groups: [],
      conditional_not_applicable: [],
      test_counts: { total: 0, passed: 0, failed: 0, skipped: 0 },
      attempt_number: attemptNumber,
    };
  }

  const resultErrors = validateRunnerResult(result, contract);
  if (resultErrors.length > 0) {
    return {
      outcome: 'BLOCKED',
      reasons: resultErrors,
      required_groups: contract.required_groups.map((group) => group.id),
      executed_groups: [],
      conditional_not_applicable: [],
      test_counts: { total: 0, passed: 0, failed: 0, skipped: 0 },
      attempt_number: attemptNumber,
    };
  }

  const reasons = [];
  const groupStates = [];
  const groupMap = groupById(result.groups);
  const executedGroups = [];
  const conditionalNotApplicable = [];

  for (const required of contract.required_groups) {
    const group = groupMap.get(required.id);
    if (group.status === 'NOT_APPLICABLE') {
      if (required.applicability !== 'CONDITIONAL') {
        reasons.push(`REQUIRED_GROUP_NOT_APPLICABLE:${required.id}`);
        groupStates.push('FAIL');
      } else if (!nonEmptyString(group.reason)) {
        reasons.push(`CONDITIONAL_NOT_APPLICABLE_REASON_MISSING:${required.id}`);
        groupStates.push('FAIL');
      } else {
        conditionalNotApplicable.push(required.id);
      }
      continue;
    }

    executedGroups.push(required.id);
    if (group.status === 'PASS') {
      if (group.tests.total === 0) {
        reasons.push(`ZERO_TESTS:${required.id}`);
        groupStates.push('FAIL');
      } else if (group.tests.failed > 0 || group.tests.skipped > 0 || group.tests.passed !== group.tests.total) {
        reasons.push(`PASS_COUNTS_INVALID:${required.id}`);
        groupStates.push('FAIL');
      } else {
        groupStates.push('PASS');
      }
      continue;
    }
    groupStates.push(group.status);
  }

  let outcome = statePriority(groupStates);
  if (reasons.length > 0 && outcome === 'PASS') outcome = 'FAIL';

  if (result.outcome !== outcome) {
    reasons.push(`MACHINE_OUTCOME_MISMATCH:reported=${result.outcome}:derived=${outcome}`);
    if (!['TIMED_OUT', 'CANCELLED', 'BLOCKED'].includes(outcome)) outcome = 'FAIL';
  }

  if (processResult.status === null || processResult.status === undefined) {
    reasons.push('PROCESS_STATUS_MISSING');
    if (!['TIMED_OUT', 'CANCELLED'].includes(outcome)) outcome = 'BLOCKED';
  } else if (processResult.status !== 0 && outcome === 'PASS') {
    reasons.push(`PROCESS_EXIT_NONZERO_WITH_PASS:${processResult.status}`);
    outcome = 'FAIL';
  } else if (processResult.status === 0 && outcome !== 'PASS') {
    reasons.push(`PROCESS_EXIT_ZERO_WITH_NONPASS:${outcome}`);
    if (!['TIMED_OUT', 'CANCELLED', 'BLOCKED'].includes(outcome)) outcome = 'FAIL';
  }

  if (detectFlakyHistory(history, identity.material_identity_sha256, outcome)) {
    reasons.push('FLAKY_SAME_INPUTS_PREVIOUSLY_NONPASS');
    outcome = 'BLOCKED';
  }

  return {
    outcome,
    reasons: unique(reasons),
    required_groups: contract.required_groups.map((group) => group.id),
    executed_groups: executedGroups,
    conditional_not_applicable: conditionalNotApplicable,
    test_counts: aggregateCounts(result.groups),
    attempt_number: attemptNumber,
  };
}

export function buildMaterialIdentity({
  packageName,
  candidateVersion,
  sourceCommit: commit,
  manifestIdentity,
  internalDependencySet,
  runtimeIdentity,
  testContractIdentity,
  fixtureIdentities,
  gateImplementationIdentity,
}) {
  const identity = {
    package: packageName,
    candidate_version: candidateVersion,
    source_commit: commit,
    manifest_identity: manifestIdentity,
    internal_dependency_set: [...internalDependencySet].sort((left, right) => stableStringify(left).localeCompare(stableStringify(right))),
    runtime_identity: runtimeIdentity,
    test_contract_identity: testContractIdentity,
    fixture_identities: [...fixtureIdentities].sort((left, right) => stableStringify(left).localeCompare(stableStringify(right))),
    gate_implementation_identity: gateImplementationIdentity,
  };
  return {
    ...identity,
    material_identity_sha256: asSha256Identity(stableStringify(identity)),
  };
}

export function validateEvidence(evidence) {
  const errors = [];
  if (!isPlainObject(evidence)) return ['EVIDENCE_NOT_OBJECT'];
  if (evidence.schema_version !== EVIDENCE_SCHEMA_VERSION) errors.push('EVIDENCE_SCHEMA_VERSION_UNSUPPORTED');
  if (evidence.gate_instance !== GATE_INSTANCE_ID) errors.push('EVIDENCE_GATE_INSTANCE_INVALID');
  if (!nonEmptyString(evidence.run_identity)) errors.push('EVIDENCE_RUN_ID_MISSING');
  if (!FINAL_STATES.has(evidence.outcome) && evidence.outcome !== 'STALE') errors.push('EVIDENCE_OUTCOME_INVALID');
  for (const field of MATERIAL_IDENTITY_FIELDS) {
    if (evidence[field] === undefined || evidence[field] === null) errors.push(`EVIDENCE_FIELD_MISSING:${field}`);
  }
  if (!nonEmptyString(evidence.material_identity_sha256)) errors.push('EVIDENCE_MATERIAL_IDENTITY_MISSING');
  if (!Array.isArray(evidence.required_groups)) errors.push('EVIDENCE_REQUIRED_GROUPS_INVALID');
  if (!Array.isArray(evidence.executed_groups)) errors.push('EVIDENCE_EXECUTED_GROUPS_INVALID');
  if (!isPlainObject(evidence.test_counts)) errors.push('EVIDENCE_TEST_COUNTS_INVALID');
  return unique(errors);
}

export function compareEvidenceIdentity(evidence, currentIdentity) {
  const evidenceErrors = validateEvidence(evidence);
  if (evidenceErrors.length > 0) {
    return { current: false, changed_fields: [], reason: 'EVIDENCE_INCOMPLETE', errors: evidenceErrors };
  }
  const changedFields = [];
  for (const field of MATERIAL_IDENTITY_FIELDS) {
    if (stableStringify(evidence[field]) !== stableStringify(currentIdentity[field])) changedFields.push(field);
  }
  if (evidence.material_identity_sha256 !== currentIdentity.material_identity_sha256) {
    if (changedFields.length === 0) changedFields.push('material_identity_sha256');
  }
  return {
    current: changedFields.length === 0,
    changed_fields: changedFields,
    reason: changedFields.length === 0 ? null : 'MATERIAL_IDENTITY_CHANGED',
    errors: [],
  };
}

export function redactSensitiveText(value) {
  let text = String(value ?? '');
  text = text.replace(/(bearer\s+)[a-z0-9._~+\/-]+/giu, '$1[REDACTED]');
  text = text.replace(/((?:token|secret|password|api[_-]?key)\s*[=:]\s*)[^\s,;]+/giu, '$1[REDACTED]');
  return text.slice(0, 4_000);
}

function sanitizeObject(value) {
  if (Array.isArray(value)) return value.map(sanitizeObject);
  if (!isPlainObject(value)) return value;
  const result = {};
  for (const [key, child] of Object.entries(value)) {
    result[key] = SENSITIVE_KEY_PATTERN.test(key) ? '[REDACTED]' : sanitizeObject(child);
  }
  return result;
}

function fixtureIdentities(packageRoot, fixtures = []) {
  return fixtures.map((fixture) => {
    const relative = assertRelativePath(fixture, 'fixture');
    const absolute = path.resolve(packageRoot, relative);
    const packagePrefix = `${path.resolve(packageRoot)}${path.sep}`;
    if (absolute !== path.resolve(packageRoot) && !absolute.startsWith(packagePrefix)) {
      throw new Error(`Fixture escapes the package root: ${fixture}`);
    }
    const stat = fs.statSync(absolute);
    if (!stat.isFile()) throw new Error(`Fixture is not a file: ${fixture}`);
    return { path: normalizePath(relative), sha256: asSha256Identity(fs.readFileSync(absolute)) };
  });
}

function implementationIdentity() {
  return asSha256Identity(fs.readFileSync(fileURLToPath(import.meta.url)));
}

function runtimeIdentity() {
  return `node:${process.version};platform:${process.platform};arch:${process.arch}`;
}

function evidenceDirectory(evidenceRoot, packageName) {
  return path.join(evidenceRoot, packageSlug(packageName));
}

function loadHistory(evidenceRoot, packageName) {
  const directory = evidenceDirectory(evidenceRoot, packageName);
  if (!fs.existsSync(directory)) return [];
  return fs.readdirSync(directory, { withFileTypes: true })
    .filter((entry) => entry.isFile() && entry.name.endsWith('.json'))
    .flatMap((entry) => {
      try {
        return [JSON.parse(fs.readFileSync(path.join(directory, entry.name), 'utf8'))];
      } catch {
        return [];
      }
    });
}

function walkForFilename(directory, filename, results) {
  if (!fs.existsSync(directory)) return;
  for (const entry of fs.readdirSync(directory, { withFileTypes: true })) {
    if (entry.name === 'node_modules' || entry.name === '.git' || entry.name === '.delivery') continue;
    const absolute = path.join(directory, entry.name);
    if (entry.isDirectory()) walkForFilename(absolute, filename, results);
    else if (entry.isFile() && entry.name === filename) results.push(absolute);
  }
}

export function findDuplicateGateImplementations(repositoryRoot) {
  const results = [];
  walkForFilename(path.join(repositoryRoot, 'packages'), IMPLEMENTATION_FILENAME, results);
  return results.map((filePath) => normalizePath(path.relative(repositoryRoot, filePath))).sort();
}

function runnerProcessResult(execution) {
  const timedOut = execution.error?.code === 'ETIMEDOUT';
  return {
    status: execution.status,
    signal: execution.signal,
    timedOut,
    error: execution.error && !timedOut
      ? `${execution.error.code ?? 'ERROR'}:${execution.error.message}`
      : null,
  };
}

function diagnosticSummary(execution) {
  return {
    exit_status: execution.status,
    signal: execution.signal,
    timed_out: execution.error?.code === 'ETIMEDOUT',
    stdout_sha256: asSha256Identity(execution.stdout ?? ''),
    stderr_sha256: asSha256Identity(execution.stderr ?? ''),
    stdout_bytes: Buffer.byteLength(execution.stdout ?? '', 'utf8'),
    stderr_bytes: Buffer.byteLength(execution.stderr ?? '', 'utf8'),
  };
}

function createEvidence({
  runId,
  startedAt,
  endedAt,
  identity,
  contract,
  evaluation,
  execution,
  resultFile,
}) {
  const evidence = {
    schema_version: EVIDENCE_SCHEMA_VERSION,
    gate_instance: GATE_INSTANCE_ID,
    run_identity: runId,
    started_at: startedAt,
    ended_at: endedAt,
    ...identity,
    required_groups: evaluation.required_groups,
    executed_groups: evaluation.executed_groups,
    conditional_not_applicable: evaluation.conditional_not_applicable,
    test_counts: evaluation.test_counts,
    attempt_number: evaluation.attempt_number,
    outcome: evaluation.outcome,
    reasons: evaluation.reasons,
    runner: {
      command: contract.runner.command,
      args_count: contract.runner.args.length,
      args_sha256: asSha256Identity(stableStringify(contract.runner.args)),
      ...diagnosticSummary(execution),
    },
    artifacts: resultFile ? [{ type: 'runner-result', sha256: asSha256Identity(fs.readFileSync(resultFile)) }] : [],
    invalidation_reason: null,
  };
  evidence.result_fingerprint = asSha256Identity(stableStringify({
    package: evidence.package,
    material_identity_sha256: evidence.material_identity_sha256,
    required_groups: evidence.required_groups,
    executed_groups: evidence.executed_groups,
    conditional_not_applicable: evidence.conditional_not_applicable,
    test_counts: evidence.test_counts,
    outcome: evidence.outcome,
    reasons: evidence.reasons,
  }));
  return sanitizeObject(evidence);
}

function writeEvidence(evidenceRoot, evidence) {
  const directory = evidenceDirectory(evidenceRoot, evidence.package);
  const filePath = path.join(directory, `${evidence.run_identity}.json`);
  return qualityWritePrettyJson(filePath, evidence);
}

function buildCurrentIdentity({ repositoryRoot, packageRoot, manifestSource, manifest, contractSource, contract }) {
  return buildMaterialIdentity({
    packageName: manifest.name,
    candidateVersion: manifest.version,
    sourceCommit: sourceCommit(repositoryRoot),
    manifestIdentity: asSha256Identity(manifestSource),
    internalDependencySet: collectInternalDependencies(manifest),
    runtimeIdentity: runtimeIdentity(),
    testContractIdentity: asSha256Identity(contractSource),
    fixtureIdentities: fixtureIdentities(packageRoot, contract.fixtures ?? []),
    gateImplementationIdentity: implementationIdentity(),
  });
}

function blockedEvidence({ evidenceRoot, manifest, contract, identity, reasons }) {
  const now = new Date().toISOString();
  const runId = crypto.randomUUID();
  const evaluation = {
    outcome: 'BLOCKED',
    reasons,
    required_groups: contract.required_groups?.map((group) => group.id) ?? [],
    executed_groups: [],
    conditional_not_applicable: [],
    test_counts: { total: 0, passed: 0, failed: 0, skipped: 0 },
    attempt_number: loadHistory(evidenceRoot, manifest.name)
      .filter((entry) => entry?.material_identity_sha256 === identity.material_identity_sha256).length + 1,
  };
  const execution = { status: null, signal: null, stdout: '', stderr: '', error: null };
  const evidence = createEvidence({
    runId,
    startedAt: now,
    endedAt: now,
    identity,
    contract,
    evaluation,
    execution,
    resultFile: null,
  });
  const evidencePath = writeEvidence(evidenceRoot, evidence);
  return { evidence, evidencePath };
}

export function runGate({ packageRoot, contractPath, evidenceRoot }) {
  const absolutePackageRoot = path.resolve(packageRoot);
  const absoluteContractPath = path.resolve(contractPath);
  const absoluteEvidenceRoot = path.resolve(evidenceRoot);
  const repositoryRoot = resolveRepositoryRoot(absolutePackageRoot);
  const manifestPath = path.join(absolutePackageRoot, 'package.json');
  const { source: manifestSource, value: manifest } = readJson(manifestPath, 'package manifest');
  const { source: contractSource, value: contract } = readJson(absoluteContractPath, 'test contract');
  const contractErrors = validateTestContract(contract, { packageName: manifest.name });
  if (contractErrors.length > 0) throw new Error(contractErrors.join('\n'));
  if (!nonEmptyString(manifest.version)) throw new Error('Package manifest version is missing.');

  const identity = buildCurrentIdentity({
    repositoryRoot,
    packageRoot: absolutePackageRoot,
    manifestSource,
    manifest,
    contractSource,
    contract,
  });
  fs.mkdirSync(absoluteEvidenceRoot, { recursive: true });

  const blockingReasons = [];
  const dirty = packageWorktreeChanges(repositoryRoot, absolutePackageRoot);
  if (dirty) blockingReasons.push('PACKAGE_WORKTREE_DIRTY');
  const duplicates = findDuplicateGateImplementations(repositoryRoot);
  if (duplicates.length > 0) blockingReasons.push(`DUPLICATE_GATE_IMPLEMENTATION:${duplicates.join(',')}`);
  if (blockingReasons.length > 0) {
    return blockedEvidence({
      evidenceRoot: absoluteEvidenceRoot,
      manifest,
      contract,
      identity,
      reasons: blockingReasons,
    });
  }

  const history = loadHistory(absoluteEvidenceRoot, manifest.name);
  const runId = crypto.randomUUID();
  const startedAt = new Date().toISOString();
  const tempDirectory = fs.mkdtempSync(path.join(absoluteEvidenceRoot, '.tmp-'));
  const resultFile = path.join(tempDirectory, 'result.json');
  const command = normalizeRunnerCommand(contract.runner.command);
  const timeout = contract.runner.timeout_ms ?? DEFAULT_TIMEOUT_MS;
  const execution = spawnSync(command, contract.runner.args, {
    cwd: absolutePackageRoot,
    encoding: 'utf8',
    timeout,
    maxBuffer: 16 * 1024 * 1024,
    windowsHide: true,
    env: {
      ...process.env,
      VENTO_PACKAGE_TEST_RESULT_FILE: resultFile,
      VENTO_PACKAGE_TEST_RUN_ID: runId,
      VENTO_PACKAGE_TEST_PACKAGE: manifest.name,
      VENTO_PACKAGE_TEST_CANDIDATE_VERSION: manifest.version,
    },
  });

  let result = null;
  if (fs.existsSync(resultFile)) {
    try {
      result = JSON.parse(fs.readFileSync(resultFile, 'utf8'));
    } catch {
      result = null;
    }
  }
  const evaluation = evaluateTestResult({
    contract,
    result,
    processResult: runnerProcessResult(execution),
    identity,
    history,
  });
  const endedAt = new Date().toISOString();
  const evidence = createEvidence({
    runId,
    startedAt,
    endedAt,
    identity,
    contract,
    evaluation,
    execution,
    resultFile: fs.existsSync(resultFile) ? resultFile : null,
  });
  const evidencePath = writeEvidence(absoluteEvidenceRoot, evidence);
  fs.rmSync(tempDirectory, { recursive: true, force: true });
  return { evidence, evidencePath };
}

export function verifyEvidence({ packageRoot, contractPath, evidencePath }) {
  const absolutePackageRoot = path.resolve(packageRoot);
  const absoluteContractPath = path.resolve(contractPath);
  const repositoryRoot = resolveRepositoryRoot(absolutePackageRoot);
  const { source: manifestSource, value: manifest } = readJson(
    path.join(absolutePackageRoot, 'package.json'),
    'package manifest',
  );
  const { source: contractSource, value: contract } = readJson(absoluteContractPath, 'test contract');
  const contractErrors = validateTestContract(contract, { packageName: manifest.name });
  if (contractErrors.length > 0) throw new Error(contractErrors.join('\n'));
  const identity = buildCurrentIdentity({
    repositoryRoot,
    packageRoot: absolutePackageRoot,
    manifestSource,
    manifest,
    contractSource,
    contract,
  });
  const evidence = readJson(path.resolve(evidencePath), 'evidence').value;
  const dirty = packageWorktreeChanges(repositoryRoot, absolutePackageRoot);
  if (dirty) {
    return {
      outcome: 'STALE',
      invalidation_reason: 'PACKAGE_WORKTREE_DIRTY',
      changed_fields: ['source_commit'],
      errors: [],
      material_identity_sha256: identity.material_identity_sha256,
    };
  }
  const comparison = compareEvidenceIdentity(evidence, identity);
  return {
    outcome: comparison.current ? 'PASS' : 'STALE',
    invalidation_reason: comparison.reason,
    changed_fields: comparison.changed_fields,
    errors: comparison.errors,
    material_identity_sha256: identity.material_identity_sha256,
  };
}

function parseArgs(argv) {
  const args = {
    packageRoot: null,
    contractPath: null,
    evidenceRoot: '.delivery/shared-package-tests',
    verifyEvidencePath: null,
    json: false,
    help: false,
  };
  for (let index = 0; index < argv.length; index += 1) {
    const token = argv[index];
    if (token === '--json') args.json = true;
    else if (token === '--help' || token === '-h') args.help = true;
    else if (['--package-root', '--contract', '--evidence-root', '--verify-evidence'].includes(token)) {
      const value = argv[index + 1];
      if (!value || value.startsWith('--')) throw new Error(`Missing value for ${token}.`);
      if (token === '--package-root') args.packageRoot = value;
      else if (token === '--contract') args.contractPath = value;
      else if (token === '--evidence-root') args.evidenceRoot = value;
      else args.verifyEvidencePath = value;
      index += 1;
    } else throw new Error(`Unknown argument: ${token}.`);
  }
  return args;
}

function printUsage() {
  console.log(`Usage:
  node ${IMPLEMENTATION_RELATIVE_PATH} --package-root <dir> --contract <json> [--evidence-root <dir>] [--json]
  node ${IMPLEMENTATION_RELATIVE_PATH} --package-root <dir> --contract <json> --verify-evidence <json> [--json]

Runner protocol:
  The runner receives VENTO_PACKAGE_TEST_RESULT_FILE and must write JSON schema_version=1 with:
  package, outcome, and one result per declared required_group.
  Final PASS is derived by the gate and requires process exit 0, complete required groups,
  zero failed or skipped tests in PASS groups, current material identity, and no flaky same-input history.`);
}

export function main(argv = process.argv.slice(2)) {
  const args = parseArgs(argv);
  if (args.help) return printUsage();
  if (!args.packageRoot) throw new Error('--package-root is required.');
  if (!args.contractPath) throw new Error('--contract is required.');

  if (args.verifyEvidencePath) {
    const verification = verifyEvidence({
      packageRoot: args.packageRoot,
      contractPath: args.contractPath,
      evidencePath: args.verifyEvidencePath,
    });
    console.log(args.json ? JSON.stringify(verification, null, 2) : `${verification.outcome}: evidence verification.`);
    if (verification.outcome !== 'PASS') process.exitCode = 1;
    return verification;
  }

  const result = runGate({
    packageRoot: args.packageRoot,
    contractPath: args.contractPath,
    evidenceRoot: args.evidenceRoot,
  });
  const output = {
    outcome: result.evidence.outcome,
    package: result.evidence.package,
    candidate_version: result.evidence.candidate_version,
    run_identity: result.evidence.run_identity,
    material_identity_sha256: result.evidence.material_identity_sha256,
    evidence_path: normalizePath(path.relative(process.cwd(), result.evidencePath)),
    reasons: result.evidence.reasons,
  };
  console.log(args.json ? JSON.stringify(output, null, 2) : `${output.outcome}: ${output.package}; evidence ${output.evidence_path}`);
  if (output.outcome !== 'PASS') process.exitCode = 1;
  return output;
}

const isCli = process.argv[1]
  && path.resolve(process.argv[1]) === path.resolve(fileURLToPath(import.meta.url));

if (isCli) {
  try {
    main();
  } catch (error) {
    console.error(`ERROR: ${error instanceof Error ? error.message : String(error)}`);
    process.exit(1);
  }
}
