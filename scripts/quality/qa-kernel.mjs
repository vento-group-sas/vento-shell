// VENTO QA Kernel F0: pure capability and migration reconciliation contracts.
// No Docker, SQL, network, credentials, deployment or process execution.
// Actual provisioning and validation require separately authorized F1+ runtimes.
import { createHash } from 'node:crypto';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

export const CATALOG_PATH = 'scripts/quality/qa-kernel-capabilities.json';
export const KERNEL_ID = 'VENTO-QA-KERNEL-001';
export const TARGET_ENVIRONMENT = 'QA_LOCAL_ISOLATED';
export const OWNER_REPOSITORY = 'vento-group-sas/vento-shell';
export const OUTCOMES = Object.freeze(['PENDING', 'BLOCKED', 'FAIL', 'PASS']);
export const LIFECYCLE = Object.freeze({
  PENDING: ['ATTESTED', 'BLOCKED'],
  ATTESTED: ['READY', 'BLOCKED'],
  READY: ['RUNNING', 'BLOCKED'],
  RUNNING: ['RESTORING', 'BLOCKED', 'FAIL'],
  BLOCKED: ['RESTORING'],
  FAIL: ['RESTORING'],
  RESTORING: ['CLOSED', 'FAIL'],
  CLOSED: [],
});
const KIND = new Set([
  'READ_ONLY', 'ISOLATED_RESOURCE', 'ISOLATED_WRITE',
  'QA_VALIDATION', 'QA_REVERSIBLE',
]);
const SHA = /^[a-f0-9]{64}$/u;
const GIT_SHA = /^[a-f0-9]{40}$/u;
const ID = /^[a-z][a-z0-9-]{2,63}$/u;
const CAPABILITY = /^[a-z][a-z0-9_]{2,63}$/u;
const OWNER = /^[A-Z][A-Z0-9-]{3,79}$/u;
const TEST = /^supabase\/tests\/(?:database|packages)\/[A-Za-z0-9][A-Za-z0-9_.-]*\.sql$/u;
const MIGRATION = /^supabase\/migrations\/([0-9]{14})_[a-z0-9][a-z0-9_]*\.sql$/u;
const BRANCH = /^[A-Za-z0-9][A-Za-z0-9._/-]{0,119}$/u;

function fail(code) {
  throw new Error('QA_KERNEL_' + code);
}
function object(value) {
  return value !== null && typeof value === 'object' && !Array.isArray(value);
}
function closed(value, fields, code) {
  if (!object(value) || Object.keys(value).some((k) => !fields.includes(k))) fail(code);
}
function nonEmptyArray(value, code) {
  if (!Array.isArray(value) || value.length === 0) fail(code);
}
function uniqueStrings(array, pattern, code) {
  nonEmptyArray(array, code);
  if (array.some((x) => typeof x !== 'string' || !pattern.test(x))
    || new Set(array).size !== array.length) fail(code);
}
function digest(data) {
  return createHash('sha256').update(JSON.stringify(data)).digest('hex');
}
function validateTestPath(value) {
  return typeof value === 'string'
    && TEST.test(value)
    && !value.includes('..') && !value.includes('\\');
}

export function validateCatalog(catalog) {
  closed(catalog, [
    'schema_version', 'kernel_id', 'execution_mode', 'target_environment',
    'owner_repository', 'capabilities', 'profiles',
  ], 'CATALOG_KEYS_INVALID');
  if (catalog.schema_version !== 1 || catalog.kernel_id !== KERNEL_ID
    || catalog.execution_mode !== 'PLAN_ONLY'
    || catalog.target_environment !== TARGET_ENVIRONMENT
    || catalog.owner_repository !== OWNER_REPOSITORY) fail('CATALOG_BOUNDARY_INVALID');

  nonEmptyArray(catalog.capabilities, 'CAPABILITIES_EMPTY');
  const capabilities = new Map();
  for (const item of catalog.capabilities) {
    closed(item, ['id', 'kind', 'requires'], 'CAPABILITY_KEYS_INVALID');
    if (typeof item.id !== 'string' || !CAPABILITY.test(item.id)
      || !KIND.has(item.kind) || !Array.isArray(item.requires)
      || capabilities.has(item.id)) fail('CAPABILITY_INVALID_OR_DUPLICATE');
    if (new Set(item.requires).size !== item.requires.length
      || item.requires.some((dep) => typeof dep !== 'string' || !CAPABILITY.test(dep)))
      fail('CAPABILITY_DEPENDENCY_INVALID');
    capabilities.set(item.id, item);
  }
  const visiting = new Set();
  const visited = new Set();
  function visit(id) {
    if (!capabilities.has(id)) fail('CAPABILITY_DEPENDENCY_UNKNOWN');
    if (visiting.has(id)) fail('CAPABILITY_DEPENDENCY_CYCLE');
    if (visited.has(id)) return;
    visiting.add(id);
    for (const dep of capabilities.get(id).requires) visit(dep);
    visiting.delete(id);
    visited.add(id);
  }
  for (const id of capabilities.keys()) visit(id);

  nonEmptyArray(catalog.profiles, 'PROFILES_EMPTY');
  const profiles = new Set();
  for (const profile of catalog.profiles) {
    closed(profile, ['id', 'owner', 'requires', 'test_files', 'test_contracts'], 'PROFILE_KEYS_INVALID');
    if (typeof profile.id !== 'string' || !ID.test(profile.id)
      || typeof profile.owner !== 'string' || !OWNER.test(profile.owner)
      || profiles.has(profile.id)) fail('PROFILE_INVALID_OR_DUPLICATE');
    profiles.add(profile.id);
    uniqueStrings(profile.requires, CAPABILITY, 'PROFILE_CAPABILITIES_INVALID');
    for (const requirement of profile.requires) {
      if (!capabilities.has(requirement)) fail('PROFILE_CAPABILITY_UNKNOWN');
    }
    nonEmptyArray(profile.test_files, 'PROFILE_TEST_FILES_EMPTY');
    if (new Set(profile.test_files).size !== profile.test_files.length
      || profile.test_files.some((file) => !validateTestPath(file))) {
      fail('PROFILE_TEST_FILES_INVALID');
    }

    // F2: a partial declaration is permitted, but an undeclared test is never READY.
    // Contracts are data, never executable SQL, shell fragments or permission grants.
    if (profile.test_contracts !== undefined) {
      if (!Array.isArray(profile.test_contracts)) fail('TEST_CONTRACTS_INVALID');
      const seen = new Set();
      for (const contract of profile.test_contracts) {
        closed(contract, ['file', 'requires', 'probes'], 'TEST_CONTRACT_KEYS_INVALID');
        if (!validateTestPath(contract.file)
          || !profile.test_files.includes(contract.file) || seen.has(contract.file)) {
          fail('TEST_CONTRACT_FILE_INVALID');
        }
        seen.add(contract.file);
        uniqueStrings(contract.requires, CAPABILITY, 'TEST_CONTRACT_CAPABILITIES_INVALID');
        if (contract.requires.some((id) => !profile.requires.includes(id))) {
          fail('TEST_CONTRACT_CAPABILITIES_OUT_OF_SCOPE');
        }
        closed(contract.probes, [
          'extensions', 'min_connections', 'set_roles', 'fixtures', 'bootstrap',
        ], 'TEST_CONTRACT_PROBES_INVALID');
        const p = contract.probes;
        if (!Array.isArray(p.extensions) || p.extensions.length === 0
          || p.extensions.some((value) => typeof value !== 'string'
            || !CAPABILITY.test(value))
          || new Set(p.extensions).size !== p.extensions.length
          || !Number.isInteger(p.min_connections)
          || p.min_connections < 1 || p.min_connections > 16
          || !Array.isArray(p.set_roles)
          || p.set_roles.some((role) => typeof role !== 'string'
            || !/^[a-z][a-z0-9_]{1,62}$/u.test(role))
          || new Set(p.set_roles).size !== p.set_roles.length
          || !['NONE', 'SYNTHETIC_ONLY'].includes(p.fixtures)
          || p.bootstrap !== 'PRIVILEGED_SETUP_REQUIRED') {
          fail('TEST_CONTRACT_PROBES_INVALID');
        }
      }
    }
    // Full paths, not the numeric 048 prefix, identify tests across lanes.
  }
  return true;
}

export function loadCatalog(root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '../..')) {
  let catalog;
  try {
    catalog = JSON.parse(fs.readFileSync(path.join(root, CATALOG_PATH), 'utf8'));
  } catch {
    fail('CATALOG_NOT_READABLE');
  }
  validateCatalog(catalog);
  return catalog;
}

export function validateSource(source) {
  closed(source, [
    'repository', 'branch', 'head', 'clean', 'staged_count', 'environment',
  ], 'SOURCE_KEYS_INVALID');
  if (source.repository !== OWNER_REPOSITORY
    || typeof source.branch !== 'string' || !BRANCH.test(source.branch)
    || source.branch.includes('..') || source.branch.includes('//')
    || source.branch.endsWith('.lock') || source.branch.startsWith('/')
    || typeof source.head !== 'string' || !GIT_SHA.test(source.head)
    || source.clean !== true || source.staged_count !== 0
    || source.environment !== TARGET_ENVIRONMENT) {
    fail('SOURCE_NOT_ATTESTABLE');
  }
  return {
    repository: source.repository,
    branch: source.branch,
    head: source.head,
    environment: source.environment,
  };
}

export function planWorkload({
  catalog,
  profileId,
  source,
  availableTests,
} = {}) {
  validateCatalog(catalog);
  const origin = validateSource(source);
  if (!Array.isArray(availableTests)
    || availableTests.some((file) => !validateTestPath(file))
    || new Set(availableTests).size !== availableTests.length) {
    fail('TEST_INVENTORY_INVALID');
  }
  const profile = catalog.profiles.find((item) => item.id === profileId);
  if (!profile) fail('PROFILE_UNKNOWN');

  const byId = new Map(catalog.capabilities.map((item) => [item.id, item]));
  const ordered = [];
  const included = new Set();
  function add(id) {
    if (included.has(id)) return;
    const item = byId.get(id);
    for (const dep of item.requires) add(dep);
    included.add(id);
    ordered.push({ id, kind: item.kind, requires: [...item.requires] });
  }
  for (const required of profile.requires) add(required);
  const found = new Set(availableTests);
  const missing = profile.test_files.filter((file) => !found.has(file));
  const identity = digest({
    kernel_id: KERNEL_ID,
    catalog,
    source: origin,
    profile: profile.id,
    test_files: profile.test_files,
  });
  return {
    kernel_id: KERNEL_ID,
    execution_mode: 'PLAN_ONLY',
    environment: TARGET_ENVIRONMENT,
    profile: profile.id,
    owner: profile.owner,
    source: origin,
    plan_sha256: identity,
    requirements: ordered,
    test_files: [...profile.test_files],
    missing_test_files: missing,
    status: missing.length ? 'BLOCKED' : 'PENDING',
    reason: missing.length ? 'TEST_FILES_NOT_IN_SOURCE' : 'RUNTIME_NOT_EXECUTED',
    qa_executed: false,
    pg_tap_certified: false,
    remote_mutations: false,
  };
}

// F2: read-only, per-test requirements for a separately authorized MCP runner.
// This is NOT a physical probe, permission grant, SQL execution or QA certification.
export function planTestPreflight({ catalog, profileId, source, availableTests } = {}) {
  const plan = planWorkload({ catalog, profileId, source, availableTests });
  const profile = catalog.profiles.find((item) => item.id === profileId);
  const contracts = new Map((profile.test_contracts || []).map((item) => [item.file, item]));
  const missingContracts = profile.test_files.filter((file) => !contracts.has(file));
  const requestedProbes = profile.test_files.filter((file) => contracts.has(file))
    .map((file) => {
      const item = contracts.get(file);
      return {
        file,
        requires: [...item.requires],
        probes: {
          extensions: [...item.probes.extensions],
          min_connections: item.probes.min_connections,
          set_roles: [...item.probes.set_roles],
          fixtures: item.probes.fixtures,
          bootstrap: item.probes.bootstrap,
        },
      };
    });
  const status = plan.missing_test_files.length || missingContracts.length
    ? 'BLOCKED' : 'PENDING';
  const reason = plan.missing_test_files.length
    ? 'TEST_FILES_NOT_IN_SOURCE'
    : missingContracts.length ? 'TEST_CONTRACTS_MISSING'
      : 'RUNTIME_PROBES_AND_RUNNER_SEPARATION_REQUIRED';
  return {
    kernel_id: KERNEL_ID,
    execution_mode: 'PLAN_ONLY',
    environment: TARGET_ENVIRONMENT,
    profile: profile.id,
    source: plan.source,
    plan_sha256: plan.plan_sha256,
    status,
    reason,
    missing_test_files: [...plan.missing_test_files],
    missing_test_contracts: missingContracts,
    test_preflights: requestedProbes,
    bootstrap_attested: false,
    runner_non_admin_attested: false,
    runtime_probes_executed: false,
    qa_executed: false,
    pg_tap_certified: false,
    remote_mutations: false,
  };
}

// Declarative lifecycle only. F0 never transitions a real database or runs SQL.
export function transitionLifecycle(current, next) {
  if (typeof current !== 'string' || typeof next !== 'string'
    || !Object.hasOwn(LIFECYCLE, current)
    || !LIFECYCLE[current].includes(next)) fail('LIFECYCLE_TRANSITION_FORBIDDEN');
  return next;
}

function normalizeMigration(value) {
  closed(value, ['file', 'sha256'], 'MIGRATION_SOURCE_KEYS_INVALID');
  const match = typeof value.file === 'string' && MIGRATION.exec(value.file);
  if (!match || typeof value.sha256 !== 'string' || !SHA.test(value.sha256)) {
    fail('MIGRATION_SOURCE_INVALID');
  }
  return { file: value.file, version: match[1], sha256: value.sha256 };
}

export function reconcileMigrationCandidates({ baseline, overlays } = {}) {
  if (!Array.isArray(baseline) || !Array.isArray(overlays) || overlays.length === 0) {
    fail('MIGRATION_INVENTORY_REQUIRED');
  }
  const entries = new Map();
  const versions = new Map();
  const problems = [];
  const newFiles = new Set();
  const laneNames = new Set();

  function accept(raw, lane, added) {
    const item = normalizeMigration(raw);
    const prior = entries.get(item.file);
    const sameVersion = versions.get(item.version);
    if (prior && prior.sha256 !== item.sha256) {
      problems.push({ code: 'MIGRATION_CONTENT_COLLISION', file: item.file });
    } else if (sameVersion && sameVersion !== item.file) {
      problems.push({ code: 'MIGRATION_VERSION_COLLISION', version: item.version });
    } else if (!prior) {
      entries.set(item.file, { ...item, owners: [lane] });
      versions.set(item.version, item.file);
      if (added) newFiles.add(item.file);
    } else {
      prior.owners.push(lane);
    }
  }

  const localSeen = new Set();
  for (const item of baseline) {
    const normalized = normalizeMigration(item);
    if (localSeen.has(normalized.file)) fail('MIGRATION_DUPLICATE_IN_BASELINE');
    localSeen.add(normalized.file);
    accept(item, 'BASELINE', false);
  }
  for (const overlay of overlays) {
    closed(overlay, ['lane', 'migrations'], 'MIGRATION_OVERLAY_KEYS_INVALID');
    if (typeof overlay.lane !== 'string' || !ID.test(overlay.lane)
      || laneNames.has(overlay.lane)
      || !Array.isArray(overlay.migrations)) fail('MIGRATION_OVERLAY_INVALID');
    laneNames.add(overlay.lane);
    const seen = new Set();
    for (const item of overlay.migrations) {
      const normalized = normalizeMigration(item);
      if (seen.has(normalized.file)) fail('MIGRATION_DUPLICATE_IN_OVERLAY');
      seen.add(normalized.file);
      accept(item, overlay.lane, true);
    }
  }
  const inventory = [...entries.values()].sort((a, b) =>
    a.version.localeCompare(b.version));
  return {
    kernel_id: KERNEL_ID,
    status: problems.length ? 'BLOCKED' : 'PENDING_QA',
    execution_mode: 'PLAN_ONLY',
    baseline_count: baseline.length,
    overlay_count: overlays.length,
    candidate_count: newFiles.size,
    projected_count: inventory.length,
    candidates: inventory.filter((item) => !item.owners.includes('BASELINE'))
      .map(({ file, version, owners }) => ({ file, version, owners })),
    conflicts: problems,
    replay_executed: false,
    hosted_mutations: false,
  };
}

const isCli = process.argv[1]
  && path.resolve(process.argv[1]) === path.resolve(fileURLToPath(import.meta.url));
if (isCli) {
  try {
    if (process.argv.length !== 3 || process.argv[2] !== 'check') fail('CLI_ACTION_NOT_ALLOWED');
    const catalog = loadCatalog();
    console.log(JSON.stringify({
      kernel_id: KERNEL_ID,
      status: 'PASS',
      target: TARGET_ENVIRONMENT,
      execution_mode: catalog.execution_mode,
      capability_count: catalog.capabilities.length,
      profiles: catalog.profiles.map(({ id }) => id),
      runtime_qa: 'NOT_EXECUTED',
      remote_mutations: false,
    }));
  } catch (error) {
    console.error(JSON.stringify({
      kernel_id: KERNEL_ID,
      status: 'FAIL',
      code: error instanceof Error && /^QA_KERNEL_[A-Z_]+$/u.test(error.message)
        ? error.message : 'QA_KERNEL_UNKNOWN',
    }));
    process.exitCode = 1;
  }
}
