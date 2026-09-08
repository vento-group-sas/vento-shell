import { spawnSync } from 'node:child_process';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { logicalIdentity as qualityLogicalIdentity } from './quality-primitives.mjs';

export const REQUIRED_GATE_INSTANCE_ID = 'SHELL-CI-018::GLOBAL';
export const REQUIRED_GATE_SCHEMA_VERSION = 1;
export const REQUIRED_GATE_CONTEXT = 'VENTO Required Gate';
export const DEPLOY_GATE_CONTEXT = 'VENTO Deploy Gate';
export const RUNTIME_EVIDENCE_DIRECTORY = '.delivery/required-gate';
export const CI018_BRANCH_NAME = 'shell-ci-018-global';

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

export const GATE_RESULT_STATES = Object.freeze([
  'PENDING',
  'RUNNING',
  'PASS',
  'FAIL',
  'BLOCKED',
  'CANCELLED',
  'TIMED_OUT',
  'STALE',
]);

export const CHECK_CLASSIFICATIONS = Object.freeze([
  'REQUIRED',
  'CONDITIONAL',
  'NOT_APPLICABLE',
]);

const COMMIT_PATTERN = /^[0-9a-f]{40}$/u;
const TREQ_PATTERN = /^TREQ-[A-Z]+-\d{3,}$/u;
const WORKFLOW_RELATIVE_PATH = '.github/workflows/vento-required-gate.yml';
const VISO_LEGACY_WORKFLOW_RELATIVE_PATH = '.github/workflows/apply-guided-product-form.yml';





export function logicalIdentity(value) {
  return qualityLogicalIdentity(value);
}

function checkResultToGateState(result) {
  if (result === 'STALE') return 'STALE';
  if (result === 'CANCELLED') return 'CANCELLED';
  if (result === 'TIMED_OUT') return 'TIMED_OUT';
  if (result === 'FAIL') return 'FAIL';
  return 'BLOCKED';
}

function normalizeCheck(check, index) {
  return {
    check_id: String(check?.check_id ?? `check-${index + 1}`),
    owner: String(check?.owner ?? 'UNRESOLVED'),
    classification: String(check?.classification ?? ''),
    applicability_reason: check?.applicability_reason == null
      ? null
      : String(check.applicability_reason),
    source_identity: check?.source_identity == null ? null : String(check.source_identity),
    source_commit: check?.source_commit == null ? null : String(check.source_commit).toLowerCase(),
    result: String(check?.result ?? 'BLOCKED'),
    started_at: check?.started_at ?? null,
    completed_at: check?.completed_at ?? null,
    invalidation_reason: check?.invalidation_reason ?? null,
  };
}

function branchProtectionErrors(snapshot) {
  const errors = [];
  if (!snapshot || typeof snapshot !== 'object') return ['BRANCH_PROTECTION_MISSING'];
  if (snapshot.protected !== true) errors.push('BRANCH_NOT_PROTECTED');
  if (snapshot.required_context !== REQUIRED_GATE_CONTEXT) errors.push('REQUIRED_CONTEXT_MISMATCH');
  if (snapshot.strict !== true) errors.push('STRICT_STATUS_CHECKS_DISABLED');
  if (snapshot.enforce_admins !== true) errors.push('ADMIN_ENFORCEMENT_DISABLED');
  if (snapshot.require_pull_request !== true) errors.push('PULL_REQUEST_NOT_REQUIRED');
  if (snapshot.allow_force_pushes !== false) errors.push('FORCE_PUSH_ALLOWED');
  if (snapshot.allow_deletions !== false) errors.push('BRANCH_DELETION_ALLOWED');
  if ((snapshot.bypass_actor_count ?? 0) !== 0) errors.push('BYPASS_ACTORS_PRESENT');
  return errors;
}

function providerErrors(provider, sourceCommit, environment) {
  const errors = [];
  if (!provider || typeof provider !== 'object') return ['DEPLOY_PROVIDER_EVIDENCE_MISSING'];
  if (provider.verified !== true) errors.push('DEPLOY_PROVIDER_NOT_VERIFIED');
  if (provider.enforces_gate !== true) errors.push('DEPLOY_PROVIDER_GATE_NOT_ENFORCED');
  if (String(provider.source_commit ?? '').toLowerCase() !== sourceCommit) {
    errors.push('DEPLOY_PROVIDER_SOURCE_COMMIT_MISMATCH');
  }
  if (String(provider.environment ?? '') !== environment) {
    errors.push('DEPLOY_PROVIDER_ENVIRONMENT_MISMATCH');
  }
  return errors;
}

export function evaluateRequiredGate(input = {}) {
  const gateContext = String(input.gate_context ?? '').toUpperCase();
  const repository = String(input.repository ?? '');
  const sourceCommit = String(input.source_commit ?? '').toLowerCase();
  const baseCommit = input.base_commit == null ? null : String(input.base_commit).toLowerCase();
  const targetBranch = input.target_branch == null ? null : String(input.target_branch);
  const environment = input.environment == null ? null : String(input.environment);
  const packageId = input.package_id == null ? null : String(input.package_id);
  const checks = Array.isArray(input.checks) ? input.checks.map(normalizeCheck) : [];
  const blockReasons = [];
  let state = 'PASS';

  const block = (reason, desired = 'BLOCKED') => {
    blockReasons.push(reason);
    const rank = { PASS: 0, BLOCKED: 1, FAIL: 2, TIMED_OUT: 3, CANCELLED: 4, STALE: 5 };
    if ((rank[desired] ?? 1) > (rank[state] ?? 0)) state = desired;
  };

  if (!CANONICAL_REPOSITORIES.includes(repository)) block('REPOSITORY_NOT_GOVERNED');
  if (!['MERGE', 'DEPLOY'].includes(gateContext)) block('GATE_CONTEXT_INVALID');
  if (!COMMIT_PATTERN.test(sourceCommit)) block('SOURCE_COMMIT_INVALID');
  if (baseCommit !== null && !COMMIT_PATTERN.test(baseCommit)) block('BASE_COMMIT_INVALID');

  if (gateContext === 'MERGE') {
    if (targetBranch !== 'main') block('TARGET_BRANCH_NOT_GOVERNED');
    for (const reason of branchProtectionErrors(input.branch_protection)) block(reason);
  }

  if (gateContext === 'DEPLOY') {
    if (!environment) block('DEPLOY_ENVIRONMENT_MISSING');
    if (environment === 'PREVIEW_DIAGNOSTIC') block('PREVIEW_DIAGNOSTIC_NOT_GOVERNED_DEPLOY');
    for (const reason of providerErrors(input.deploy_provider, sourceCommit, environment)) block(reason);
  }

  if (checks.length === 0) block('REQUIRED_CHECK_SET_EMPTY');
  for (const check of checks) {
    if (!CHECK_CLASSIFICATIONS.includes(check.classification)) {
      block(`CHECK_CLASSIFICATION_INVALID:${check.check_id}`);
      continue;
    }
    if (check.source_commit && check.source_commit !== sourceCommit) {
      block(`CHECK_SOURCE_COMMIT_STALE:${check.check_id}`, 'STALE');
    }
    if (check.classification === 'NOT_APPLICABLE') {
      if (!check.applicability_reason || check.applicability_reason.trim().length < 8) {
        block(`NOT_APPLICABLE_REASON_MISSING:${check.check_id}`);
      }
      if (check.result !== 'NOT_APPLICABLE') {
        block(`NOT_APPLICABLE_RESULT_INVALID:${check.check_id}`);
      }
      continue;
    }
    if (check.classification === 'CONDITIONAL' && check.result === 'NOT_APPLICABLE') {
      if (!check.applicability_reason || check.applicability_reason.trim().length < 8) {
        block(`CONDITIONAL_REASON_MISSING:${check.check_id}`);
      }
      continue;
    }
    if (check.result !== 'PASS') {
      block(`CHECK_NOT_PASS:${check.check_id}:${check.result}`, checkResultToGateState(check.result));
    }
  }

  const treq = input.treq ?? {};
  if (treq.required === true) {
    const affected = Array.isArray(treq.affected_treq_ids) ? treq.affected_treq_ids.map(String) : null;
    if (!affected) {
      block('TREQ_DECLARATION_MISSING');
    } else {
      const duplicates = affected.filter((id, index, all) => all.indexOf(id) !== index);
      if (duplicates.length > 0) block('TREQ_DECLARATION_DUPLICATED');
      if (affected.some((id) => !TREQ_PATTERN.test(id))) block('TREQ_DECLARATION_MALFORMED');
      if (affected.length === 0) {
        const reason = String(treq.zero_reason ?? '').trim();
        if (reason.length < 20) block('TREQ_ZERO_REASON_INSUFFICIENT');
      }
    }
    if (treq.validation_result !== 'PASS') block('TREQ_VALIDATION_NOT_PASS');
    if (treq.baseline_required === true && treq.historical_result !== 'PASS') {
      block('TREQ_HISTORICAL_VALIDATION_NOT_PASS');
    }
  }

  const requiredCheckIdentity = logicalIdentity(checks.map((check) => ({
    check_id: check.check_id,
    owner: check.owner,
    classification: check.classification,
    applicability_reason: check.applicability_reason,
    source_identity: check.source_identity,
  })));
  const now = input.completed_at ?? new Date().toISOString();
  const startedAt = input.started_at ?? now;

  return {
    schema_version: REQUIRED_GATE_SCHEMA_VERSION,
    logical_gate_identity: REQUIRED_GATE_CONTEXT,
    gate_context: gateContext || null,
    repository: repository || null,
    source_commit: sourceCommit || null,
    base_commit: baseCommit,
    target_branch: targetBranch,
    environment,
    package_id: packageId,
    required_check_set_identity: requiredCheckIdentity,
    checks,
    treq_registry_identity: treq.registry_identity ?? null,
    treq_baseline_identity: treq.baseline_identity ?? null,
    affected_treq_ids: Array.isArray(treq.affected_treq_ids) ? [...treq.affected_treq_ids] : null,
    started_at: startedAt,
    completed_at: now,
    execution_identity: logicalIdentity({
      repository,
      sourceCommit,
      baseCommit,
      targetBranch,
      environment,
      requiredCheckIdentity,
      startedAt,
    }),
    result: state,
    block_reasons: [...new Set(blockReasons)],
  };
}

export function validateRequiredGateWorkflow(source, repository = 'vento-group-sas/unknown') {
  const text = String(source ?? '').replace(/\r\n?/gu, '\n');
  const errors = [];
  if (!/^name:\s*VENTO Required Gate\s*$/mu.test(text)) errors.push('WORKFLOW_NAME_MISMATCH');
  if (!/^\s*pull_request:\s*$/mu.test(text)) errors.push('PULL_REQUEST_TRIGGER_MISSING');
  if (!/^\s*branches:\s*\[main\]\s*$/mu.test(text)) errors.push('MAIN_BRANCH_FILTER_MISSING');
  if (/^\s*paths(?:-ignore)?:\s*$/mu.test(text)) errors.push('FINAL_GATE_PATH_FILTER_FORBIDDEN');
  if (/pull_request_target\s*:/u.test(text)) errors.push('PULL_REQUEST_TARGET_FORBIDDEN');
  if (/contents:\s*write/u.test(text)) errors.push('CONTENTS_WRITE_FORBIDDEN');
  if (!/permissions:\s*\n\s+contents:\s*read/mu.test(text)) errors.push('MINIMUM_PERMISSIONS_MISSING');
  if (!/name:\s*VENTO Required Gate\s*$/mu.test(text)) errors.push('REQUIRED_JOB_NAME_MISSING');
  if (/continue-on-error:\s*true/u.test(text)) errors.push('CONTINUE_ON_ERROR_FORBIDDEN');
  if (/\|\|\s*true\b/u.test(text)) errors.push('FAILURE_NEUTRALIZATION_FORBIDDEN');
  if (/\bgit\s+push\b/u.test(text)) errors.push('GIT_PUSH_FORBIDDEN');
  if (/\bgh\s+pr\s+merge\b/u.test(text)) errors.push('AUTO_MERGE_FORBIDDEN');
  if (/\b(?:vercel\s+--prod|eas\s+(?:submit|update))\b/iu.test(text)) errors.push('DEPLOY_MUTATION_FORBIDDEN');
  if (repository === 'vento-group-sas/vento-anima' && /expo\s+start\s+--web/iu.test(text)) {
    errors.push('ANIMA_WEB_SURROGATE_FORBIDDEN');
  }
  return [...new Set(errors)].sort((a, b) => a.localeCompare(b, 'en'));
}

export function validateVisoLegacyWorkflow(source) {
  const text = String(source ?? '').replace(/\r\n?/gu, '\n');
  const errors = [];
  if (/contents:\s*write/u.test(text)) errors.push('VISO_CONTENTS_WRITE_REMAINS');
  if (/\bgit\s+push\b/u.test(text)) errors.push('VISO_DIRECT_PUSH_REMAINS');
  if (/\bgit\s+commit\b/u.test(text)) errors.push('VISO_AUTOMATED_COMMIT_REMAINS');
  if (/^\s*push:\s*$/mu.test(text)) errors.push('VISO_PUSH_TRIGGER_REMAINS');
  return errors;
}

function repositoryName(repository) {
  return repository.slice(repository.indexOf('/') + 1);
}

export function auditWorkspaceMaterialization({ shellRoot } = {}) {
  const resolvedShellRoot = shellRoot ?? path.resolve(
    path.dirname(fileURLToPath(import.meta.url)),
    '..',
    '..',
  );
  const workspaceRoot = path.dirname(resolvedShellRoot);
  const records = [];
  const errors = [];

  for (const repository of CANONICAL_REPOSITORIES) {
    const root = repository === 'vento-group-sas/vento-shell'
      ? resolvedShellRoot
      : path.join(workspaceRoot, repositoryName(repository));
    const workflowPath = path.join(root, WORKFLOW_RELATIVE_PATH);
    const manifestPath = path.join(root, 'package.json');
    const lockfilePath = path.join(root, 'package-lock.json');
    const record = { repository, root_name: path.basename(root), errors: [] };
    if (!fs.existsSync(root)) record.errors.push('REPOSITORY_CHECKOUT_MISSING');
    if (!fs.existsSync(manifestPath)) record.errors.push('PACKAGE_MANIFEST_MISSING');
    if (!fs.existsSync(lockfilePath)) record.errors.push('LOCKFILE_MISSING');
    if (!fs.existsSync(workflowPath)) {
      record.errors.push('REQUIRED_GATE_WORKFLOW_MISSING');
    } else {
      const workflowErrors = validateRequiredGateWorkflow(fs.readFileSync(workflowPath, 'utf8'), repository);
      record.errors.push(...workflowErrors);
    }
    if (fs.existsSync(manifestPath)) {
      try {
        const manifest = JSON.parse(fs.readFileSync(manifestPath, 'utf8'));
        if (!String(manifest?.scripts?.test ?? '').trim()) record.errors.push('NPM_TEST_MISSING');
      } catch {
        record.errors.push('PACKAGE_MANIFEST_INVALID');
      }
    }
    if (repository === 'vento-group-sas/vento-viso') {
      const legacyPath = path.join(root, VISO_LEGACY_WORKFLOW_RELATIVE_PATH);
      if (!fs.existsSync(legacyPath)) {
        record.errors.push('VISO_LEGACY_WORKFLOW_MISSING');
      } else {
        record.errors.push(...validateVisoLegacyWorkflow(fs.readFileSync(legacyPath, 'utf8')));
      }
    }
    record.result = record.errors.length === 0 ? 'PASS' : 'BLOCKED';
    records.push(record);
    for (const error of record.errors) errors.push(`${repository}:${error}`);
  }

  return {
    schema_version: REQUIRED_GATE_SCHEMA_VERSION,
    instance_id: REQUIRED_GATE_INSTANCE_ID,
    repository_count: CANONICAL_REPOSITORIES.length,
    passed_repository_count: records.filter((record) => record.result === 'PASS').length,
    result: errors.length === 0 ? 'PASS' : 'BLOCKED',
    errors,
    repositories: records,
  };
}

function ghExecutable() {
  return process.platform === 'win32' ? 'gh.exe' : 'gh';
}

function runGh(args) {
  const child = spawnSync(ghExecutable(), args, {
    encoding: 'utf8',
    windowsHide: true,
    env: { ...process.env, GH_PAGER: 'cat', NO_COLOR: '1' },
    maxBuffer: 16 * 1024 * 1024,
  });
  if (child.error) throw child.error;
  if (child.status !== 0) {
    throw new Error(String(child.stderr || child.stdout || `gh exited ${child.status}`).trim());
  }
  return String(child.stdout ?? '');
}

function extractStatusCheckRollup(pr) {
  return Array.isArray(pr?.statusCheckRollup) ? pr.statusCheckRollup : [];
}

export function verifyGithubProtectionLive({ head = CI018_BRANCH_NAME } = {}) {
  const repositories = [];
  const errors = [];
  for (const repository of CANONICAL_REPOSITORIES) {
    const protectionRecord = {
      repository,
      branch: 'main',
      protected: false,
      required_context: null,
      strict: false,
      enforce_admins: false,
      require_pull_request: false,
      allow_force_pushes: null,
      allow_deletions: null,
      bypass_actor_count: null,
      pr: null,
      errors: [],
    };
    try {
      const raw = runGh(['api', `repos/${repository}/branches/main/protection`]);
      const protection = JSON.parse(raw);
      const contexts = protection?.required_status_checks?.contexts ?? [];
      protectionRecord.protected = true;
      protectionRecord.required_context = contexts.includes(REQUIRED_GATE_CONTEXT)
        ? REQUIRED_GATE_CONTEXT
        : contexts.join(',');
      protectionRecord.strict = protection?.required_status_checks?.strict === true;
      protectionRecord.enforce_admins = protection?.enforce_admins?.enabled === true;
      protectionRecord.require_pull_request = Boolean(protection?.required_pull_request_reviews);
      protectionRecord.allow_force_pushes = protection?.allow_force_pushes?.enabled === true;
      protectionRecord.allow_deletions = protection?.allow_deletions?.enabled === true;
      const bypass = protection?.required_pull_request_reviews?.bypass_pull_request_allowances;
      protectionRecord.bypass_actor_count = [
        ...(bypass?.users ?? []),
        ...(bypass?.teams ?? []),
        ...(bypass?.apps ?? []),
      ].length;
      protectionRecord.errors.push(...branchProtectionErrors(protectionRecord));
    } catch (error) {
      protectionRecord.errors.push(`BRANCH_PROTECTION_READ_FAILED:${error.message}`);
    }

    try {
      const raw = runGh([
        'pr', 'list', '--repo', repository, '--state', 'all', '--head', head, '--limit', '5',
        '--json', 'number,state,headRefOid,mergeCommit,statusCheckRollup,url',
      ]);
      const prs = JSON.parse(raw);
      const pr = prs[0] ?? null;
      if (!pr) {
        protectionRecord.errors.push('CI018_PR_NOT_FOUND');
      } else {
        const checks = extractStatusCheckRollup(pr);
        const required = checks.find((entry) => entry?.name === REQUIRED_GATE_CONTEXT);
        protectionRecord.pr = {
          number: pr.number,
          state: pr.state,
          head_ref_oid: pr.headRefOid,
          merge_commit_oid: pr.mergeCommit?.oid ?? null,
          required_gate_status: required?.status ?? null,
          required_gate_conclusion: required?.conclusion ?? null,
          url: pr.url,
        };
        if (!required) protectionRecord.errors.push('CI018_REQUIRED_GATE_CHECK_NOT_FOUND');
        else if (required.status !== 'COMPLETED' || required.conclusion !== 'SUCCESS') {
          protectionRecord.errors.push('CI018_REQUIRED_GATE_CHECK_NOT_SUCCESS');
        }
      }
    } catch (error) {
      protectionRecord.errors.push(`CI018_PR_READ_FAILED:${error.message}`);
    }

    protectionRecord.result = protectionRecord.errors.length === 0 ? 'PASS' : 'BLOCKED';
    repositories.push(protectionRecord);
    for (const error of protectionRecord.errors) errors.push(`${repository}:${error}`);
  }

  return {
    schema_version: REQUIRED_GATE_SCHEMA_VERSION,
    instance_id: REQUIRED_GATE_INSTANCE_ID,
    head_branch: head,
    repository_count: CANONICAL_REPOSITORIES.length,
    passed_repository_count: repositories.filter((record) => record.result === 'PASS').length,
    result: errors.length === 0 ? 'PASS' : 'BLOCKED',
    errors,
    repositories,
  };
}

const ALLOWED_PROVIDER_ENFORCEMENT = new Set([
  'PROTECTED_MAIN',
  'PROVIDER_CHECK',
  'NO_GOVERNED_PRODUCTION_PATH',
]);

export function verifyProviderEvidence(evidence) {
  const errors = [];
  if (evidence?.schema_version !== 1) errors.push('PROVIDER_EVIDENCE_SCHEMA_INVALID');
  const records = Array.isArray(evidence?.repositories) ? evidence.repositories : [];
  const byRepository = new Map(records.map((record) => [record?.repository, record]));
  if (records.length !== CANONICAL_REPOSITORIES.length) errors.push('PROVIDER_EVIDENCE_CARDINALITY_INVALID');
  if (byRepository.size !== records.length) errors.push('PROVIDER_EVIDENCE_DUPLICATED_REPOSITORY');

  for (const repository of CANONICAL_REPOSITORIES) {
    const record = byRepository.get(repository);
    if (!record) {
      errors.push(`${repository}:PROVIDER_EVIDENCE_MISSING`);
      continue;
    }
    if (!String(record.provider ?? '').trim()) errors.push(`${repository}:PROVIDER_IDENTITY_MISSING`);
    if (!String(record.project_identity ?? '').trim()) errors.push(`${repository}:PROVIDER_PROJECT_IDENTITY_MISSING`);
    if (!ALLOWED_PROVIDER_ENFORCEMENT.has(record.enforcement)) {
      errors.push(`${repository}:PROVIDER_ENFORCEMENT_INVALID`);
    }
    if (record.verified !== true) errors.push(`${repository}:PROVIDER_NOT_VERIFIED`);
    if (!String(record.evidence_reference ?? '').trim()) errors.push(`${repository}:PROVIDER_EVIDENCE_REFERENCE_MISSING`);
    if (record.enforcement === 'PROTECTED_MAIN') {
      if (record.production_source_branch !== 'main') errors.push(`${repository}:PRODUCTION_BRANCH_NOT_MAIN`);
      if (record.enforces_gate !== true) errors.push(`${repository}:PROTECTED_MAIN_GATE_NOT_ENFORCED`);
    }
    if (record.enforcement === 'PROVIDER_CHECK') {
      if (record.deploy_check_identity !== DEPLOY_GATE_CONTEXT) errors.push(`${repository}:DEPLOY_CHECK_IDENTITY_MISMATCH`);
      if (record.enforces_gate !== true) errors.push(`${repository}:PROVIDER_CHECK_NOT_ENFORCED`);
    }
    if (record.enforcement === 'NO_GOVERNED_PRODUCTION_PATH') {
      if (record.enforces_gate !== true) errors.push(`${repository}:FUTURE_GATE_REQUIREMENT_MISSING`);
    }
  }
  return {
    schema_version: REQUIRED_GATE_SCHEMA_VERSION,
    instance_id: REQUIRED_GATE_INSTANCE_ID,
    repository_count: CANONICAL_REPOSITORIES.length,
    evidence_repository_count: records.length,
    result: errors.length === 0 ? 'PASS' : 'BLOCKED',
    errors,
    repositories: records,
  };
}

function readJson(filePath) {
  return JSON.parse(fs.readFileSync(filePath, 'utf8'));
}

function parseArgs(argv) {
  const command = argv[0] ?? null;
  const options = { json: false, input: null, head: CI018_BRANCH_NAME };
  for (let index = 1; index < argv.length; index += 1) {
    const arg = argv[index];
    if (arg === '--json') options.json = true;
    else if (arg === '--input') {
      options.input = argv[index + 1];
      index += 1;
    } else if (arg === '--head') {
      options.head = argv[index + 1];
      index += 1;
    } else throw new Error(`Argumento no reconocido: ${arg}`);
  }
  return { command, options };
}

function printResult(result, json) {
  if (json) console.log(JSON.stringify(result, null, 2));
  else console.log(`${result.result}: ${REQUIRED_GATE_INSTANCE_ID}`);
  if (result.result !== 'PASS') process.exitCode = 1;
}

const isCli = process.argv[1]
  && path.resolve(process.argv[1]) === path.resolve(fileURLToPath(import.meta.url));

if (isCli) {
  try {
    const { command, options } = parseArgs(process.argv.slice(2));
    if (command === 'audit-workspaces') {
      printResult(auditWorkspaceMaterialization(), options.json);
    } else if (command === 'verify-github') {
      printResult(verifyGithubProtectionLive({ head: options.head }), options.json);
    } else if (command === 'verify-provider-evidence') {
      if (!options.input) throw new Error('verify-provider-evidence exige --input.');
      printResult(verifyProviderEvidence(readJson(path.resolve(options.input))), options.json);
    } else if (command === 'evaluate') {
      if (!options.input) throw new Error('evaluate exige --input.');
      printResult(evaluateRequiredGate(readJson(path.resolve(options.input))), options.json);
    } else {
      throw new Error(`Comando no reconocido: ${command ?? 'VACÍO'}.`);
    }
  } catch (error) {
    console.error(error instanceof Error ? error.message : String(error));
    process.exitCode = 1;
  }
}
