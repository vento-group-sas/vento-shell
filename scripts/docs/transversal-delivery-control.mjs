import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

export const TRANSVERSAL_DELIVERY_POLICY_PATH = 'docs/plan-canonico/modular/transversal-delivery-policy.json';
const TASK_ID_PATTERN = /^[A-Z][A-Z0-9-]*-\d{3}$/u;
const PACKAGE_NAME_PATTERN = /^@vento\/[a-z][a-z0-9-]*$/u;
const REPOSITORY_PATTERN = /^[A-Za-z0-9-]+\/[A-Za-z0-9._-]+$/u;
const OPERATIONS = new Set(['CREATE', 'MODIFY', 'DELETE']);
const RECORD_STATUSES = new Set(['DRAFT', 'READY_FOR_APPROVAL']);

function fail(reason) {
  throw new Error(`TRANSVERSAL_DELIVERY:${reason}`);
}

function relativePath(value) {
  if (typeof value !== 'string' || !value || value.includes('\\') || path.posix.isAbsolute(value)
    || value.split('/').some((part) => !part || part === '.' || part === '..')
    || !/^[a-zA-Z0-9_.\/-]+$/u.test(value)) {
    fail(`INVALID_RELATIVE_PATH:${String(value)}`);
  }
  return value;
}

function fileAt(root, value) {
  const target = relativePath(value);
  return path.join(root, ...target.split('/'));
}

function parseJsonAt(root, file) {
  const source = fs.readFileSync(fileAt(root, file), 'utf8');
  try {
    return JSON.parse(source);
  } catch {
    fail(`INVALID_JSON:${file}`);
  }
}

function readTextAt(root, file) {
  try {
    return fs.readFileSync(fileAt(root, file), 'utf8');
  } catch {
    fail(`SOURCE_NOT_FOUND:${file}`);
  }
}

function assertObject(value, label) {
  if (!value || typeof value !== 'object' || Array.isArray(value)) fail(`INVALID_OBJECT:${label}`);
}

function assertExactKeys(value, allowed, label) {
  const unknown = Object.keys(value).filter((key) => !allowed.includes(key));
  if (unknown.length > 0) fail(`UNRECOGNIZED_FIELDS:${label}:${unknown.join(',')}`);
}

function taskIds(group) {
  return Array.from({ length: group.to - group.from + 1 }, (_, i) => (
    `${group.prefix}-${String(group.from + i).padStart(3, '0')}`
  ));
}

export function validateTransversalPolicy(policy) {
  assertObject(policy, 'policy');
  assertExactKeys(policy, [
    'schema_version', 'policy_id', 'mode', 'execution_mode',
    'automatic_authorization', 'assistant_remote_mutations', 'gap_package_selection',
    'preserve_verified_instances', 'source_authority', 'record_directory', 'profiles',
  ], 'policy');
  if (policy.schema_version !== 1 || policy.policy_id !== 'TRANSVERSAL-DELIVERY-CONTROL-001'
    || policy.mode !== 'CANONICAL_TASK_COMPOSITION'
    || policy.execution_mode !== 'READ_ONLY_SCOPE_PREPARATION'
    || policy.automatic_authorization !== false || policy.assistant_remote_mutations !== false
    || policy.gap_package_selection !== false || policy.preserve_verified_instances !== true
    || policy.source_authority !== 'CANONICAL_TASK_OWNERS_AND_INSTANCE_LEDGERS'
    || policy.record_directory !== 'docs/plan-canonico/modular/transversal-delivery-instances') {
    fail('POLICY_EXECUTION_BOUNDARY_CHANGED');
  }
  if (!Array.isArray(policy.profiles) || policy.profiles.length < 1) fail('PROFILES_EMPTY');
  const packageNames = new Set();
  for (const profile of policy.profiles) {
    assertObject(profile, 'profile');
    assertExactKeys(profile, ['package_name', 'package_manifest', 'distribution_gate', 'source_groups'], 'profile');
    if (!PACKAGE_NAME_PATTERN.test(profile.package_name) || packageNames.has(profile.package_name)) {
      fail(`INVALID_OR_DUPLICATE_PROFILE:${profile.package_name}`);
    }
    packageNames.add(profile.package_name);
    relativePath(profile.package_manifest);
    if (!profile.package_manifest.startsWith('packages/')
      || !profile.package_manifest.endsWith('/package.json')
      || profile.distribution_gate !== 'PHYSICAL_SCOPE_AND_HUMAN_APPROVAL_REQUIRED') {
      fail(`PROFILE_SCOPE_INVALID:${profile.package_name}`);
    }
    if (!Array.isArray(profile.source_groups) || profile.source_groups.length === 0) {
      fail(`SOURCE_GROUPS_EMPTY:${profile.package_name}`);
    }
    const ids = new Set();
    for (const group of profile.source_groups) {
      assertObject(group, 'source_group');
      assertExactKeys(group, ['prefix', 'from', 'to', 'owner_file', 'instance_requirement'], 'source_group');
      if (!/^[A-Z][A-Z0-9]*(?:-[A-Z0-9]+)*$/u.test(group.prefix)
        || !Number.isInteger(group.from) || !Number.isInteger(group.to)
        || group.from < 1 || group.to > 999 || group.from > group.to
        || group.to - group.from > 250
        || !['NONE', 'VERIFIED_GLOBAL'].includes(group.instance_requirement)) {
        fail('INVALID_SOURCE_GROUP');
      }
      relativePath(group.owner_file);
      if (!group.owner_file.startsWith('docs/plan-canonico/modular/bloques/')
        || !group.owner_file.endsWith('.md')) fail('INVALID_SOURCE_OWNER');
      for (const id of taskIds(group)) {
        if (!TASK_ID_PATTERN.test(id) || ids.has(id)) fail(`DUPLICATE_OR_INVALID_TASK:${id}`);
        ids.add(id);
      }
    }
  }
  return true;
}

export function readTransversalPolicy(root = process.cwd()) {
  const policy = parseJsonAt(root, TRANSVERSAL_DELIVERY_POLICY_PATH);
  validateTransversalPolicy(policy);
  return policy;
}

function ownerBlock(source, id) {
  const lines = source.split(/\r?\n/u);
  const marker = `### ✅ ${id} —`;
  const positions = lines.flatMap((line, i) => (line.startsWith(marker) ? [i] : []));
  if (positions.length !== 1) fail(`CANONICAL_TASK_MARKER_COUNT:${id}:${positions.length}`);
  const first = positions[0];
  const next = lines.findIndex((line, i) => i > first && /^###\s+[✅🟡🔴⚠️]/u.test(line));
  const block = lines.slice(first, next < 0 ? undefined : next).join('\n');
  if (!/^\*\*Estado:\*\*\s+APROBADA\b/mu.test(block)) fail(`SOURCE_NOT_APPROVED:${id}`);
  return block;
}

export function deliveryRecordPath(policy, packageName) {
  if (!PACKAGE_NAME_PATTERN.test(packageName)) fail(`INVALID_DELIVERY_IDENTITY:${packageName}`);
  return `${policy.record_directory}/${packageName.slice(1).replace('/', '-')}.json`;
}

export function validateDraftDossier(record, { packageName, taskIds: expectedTasks }) {
  assertObject(record, 'dossier');
  assertExactKeys(record, [
    'schema_version', 'package_name', 'status', 'source_task_ids', 'physical_discovery',
    'target_repositories', 'physical_targets', 'validation_commands', 'rollback',
    'human_authorization', 'resource_conflict_evidence',
  ], 'dossier');
  if (record.schema_version !== 1 || record.package_name !== packageName
    || !RECORD_STATUSES.has(record.status)) fail('DOSSIER_IDENTITY_OR_STATUS_INVALID');
  if (!Array.isArray(record.source_task_ids)
    || record.source_task_ids.length !== expectedTasks.length
    || new Set(record.source_task_ids).size !== expectedTasks.length
    || !expectedTasks.every((id) => record.source_task_ids.includes(id))) {
    fail('DOSSIER_SOURCE_LINEAGE_MISMATCH');
  }
  if (record.human_authorization !== null) fail('DOSSIER_MUST_NOT_SELF_AUTHORIZE');
  assertObject(record.physical_discovery, 'physical_discovery');
  if (!['PENDING', 'COMPLETE'].includes(record.physical_discovery.status)
    || !Array.isArray(record.physical_discovery.searches)
    || !Array.isArray(record.physical_discovery.findings)
    || !Array.isArray(record.physical_discovery.unresolved_findings)) {
    fail('DISCOVERY_INVALID');
  }
  if (!Array.isArray(record.target_repositories) || !Array.isArray(record.physical_targets)
    || !Array.isArray(record.validation_commands) || !record.rollback
    || typeof record.rollback !== 'object' || !Array.isArray(record.resource_conflict_evidence)) {
    fail('DOSSIER_STRUCTURE_INVALID');
  }
  if (new Set(record.target_repositories).size !== record.target_repositories.length
    || record.target_repositories.some((value) => !REPOSITORY_PATTERN.test(value))) {
    fail('TARGET_REPOSITORIES_INVALID');
  }
  const seenPaths = new Set();
  for (const item of record.physical_targets) {
    assertObject(item, 'physical_target');
    assertExactKeys(item, ['repository', 'path', 'operation', 'symbol_or_surface'], 'physical_target');
    relativePath(item.path);
    if (!record.target_repositories.includes(item.repository) || !OPERATIONS.has(item.operation)
      || typeof item.symbol_or_surface !== 'string' || !item.symbol_or_surface.trim()) {
      fail('PHYSICAL_TARGET_INVALID');
    }
    const key = `${item.repository}:${item.path}`;
    if (seenPaths.has(key)) fail(`DUPLICATE_PHYSICAL_TARGET:${key}`);
    seenPaths.add(key);
  }
  if (record.validation_commands.some((x) => typeof x !== 'string' || !x.trim())) {
    fail('VALIDATION_COMMAND_INVALID');
  }
  if (record.status === 'READY_FOR_APPROVAL') {
    if (record.physical_discovery.status !== 'COMPLETE'
      || record.physical_discovery.unresolved_findings.length !== 0
      || record.target_repositories.length === 0 || record.physical_targets.length === 0
      || record.validation_commands.length === 0 || record.resource_conflict_evidence.length === 0) {
      fail('READY_FOR_APPROVAL_WITH_INCOMPLETE_SCOPE');
    }
  }
  return true;
}

export function assessTransversalDelivery({ root = process.cwd(), policy = readTransversalPolicy(root), packageName }) {
  validateTransversalPolicy(policy);
  const profile = policy.profiles.find((entry) => entry.package_name === packageName);
  if (!profile) fail(`DELIVERY_NOT_REGISTERED:${packageName}`);
  const owners = new Map();
  const sources = [];
  const verifiedInstances = [];
  for (const group of profile.source_groups) {
    if (!owners.has(group.owner_file)) owners.set(group.owner_file, readTextAt(root, group.owner_file));
    for (const id of taskIds(group)) {
      ownerBlock(owners.get(group.owner_file), id);
      sources.push(id);
      if (group.instance_requirement === 'VERIFIED_GLOBAL') {
        const filename = `docs/plan-canonico/modular/implementation-instances/${id}__GLOBAL.json`;
        const instance = parseJsonAt(root, filename);
        if (instance.instance_id !== `${id}::GLOBAL` || instance.task_id !== id
          || instance.status !== 'VERIFIED') fail(`SOURCE_INSTANCE_NOT_VERIFIED:${id}`);
        verifiedInstances.push(id);
      }
    }
  }
  const manifest = parseJsonAt(root, profile.package_manifest);
  if (manifest.name !== profile.package_name) fail(`PACKAGE_NAME_MISMATCH:${profile.package_name}`);
  const recordPath = deliveryRecordPath(policy, profile.package_name);
  const exists = fs.existsSync(fileAt(root, recordPath));
  if (exists) {
    const record = parseJsonAt(root, recordPath);
    validateDraftDossier(record, { packageName, taskIds: sources });
  }
  // This first control only prepares scope. An approved physical delivery must
  // be admitted by a separate, reviewed lifecycle before the manifest changes.
  if (manifest.private !== true) fail(`UNAUTHORIZED_DISTRIBUTABLE_MANIFEST:${packageName}`);
  return Object.freeze({
    package_name: packageName,
    canonical_sources: sources.length,
    verified_global_sources: verifiedInstances.length,
    source_ids: sources,
    package_private: true,
    dossier: exists ? 'DRAFT_OR_READY' : 'MISSING',
    dossier_path: recordPath,
    physical_authorized: false,
    remote_mutations_authorized: false,
    next_gate: 'PHYSICAL_DISCOVERY_AND_INDEPENDENT_HUMAN_APPROVAL',
  });
}

function parseArgs(argv) {
  const [operation = 'status', ...rest] = argv;
  if (!['status', 'check'].includes(operation)) fail(`UNSUPPORTED_OPERATION:${operation}`);
  let packageName = null;
  for (let i = 0; i < rest.length; i += 1) {
    if (rest[i] !== '--package' || packageName || !rest[i + 1]) fail('INVALID_CLI_ARGUMENTS');
    packageName = rest[++i];
  }
  return { operation, packageName };
}

export function runTransversalControl({ root = process.cwd(), operation = 'status', packageName = null } = {}) {
  const policy = readTransversalPolicy(root);
  const profiles = packageName ? [packageName] : policy.profiles.map((p) => p.package_name);
  const reports = profiles.map((value) => assessTransversalDelivery({ root, policy, packageName: value }));
  if (operation === 'check') {
    console.log('TRANSVERSAL_DELIVERY_POLICY: PASS');
    console.log(`TRANSVERSAL_DELIVERY_SOURCES: ${reports.reduce((n, r) => n + r.canonical_sources, 0)}`);
    console.log(`TRANSVERSAL_DELIVERY_VERIFIED_GLOBAL: ${reports.reduce((n, r) => n + r.verified_global_sources, 0)}`);
  } else {
    console.log('=== RESULTADO PARA CHATGPT ===');
    console.log('ESTADO: PASS');
    console.log('OPERACION: TRANSVERSAL_DELIVERY_STATUS');
    for (const report of reports) {
      console.log(`PACKAGE: ${report.package_name}`);
      console.log(`TASKS_APPROVED: ${report.canonical_sources}`);
      console.log(`FOUNDATIONS_VERIFIED: ${report.verified_global_sources}`);
      console.log(`PHYSICAL_DOSSIER: ${report.dossier}`);
      console.log(`PHYSICAL_AUTHORIZATION: NO`);
      console.log(`NEXT_GATE: ${report.next_gate}`);
    }
    console.log('GAP_FRONTIER: UNCHANGED');
    console.log('REMOTE_MUTATIONS: FORBIDDEN');
    console.log('=== FIN RESULTADO PARA CHATGPT ===');
  }
  return reports;
}

const isCli = process.argv[1]
  && path.resolve(process.argv[1]) === path.resolve(fileURLToPath(import.meta.url));
if (isCli) {
  try {
    const { operation, packageName } = parseArgs(process.argv.slice(2));
    runTransversalControl({ operation, packageName });
  } catch (error) {
    console.error('TRANSVERSAL_DELIVERY: FAIL');
    console.error(error instanceof Error ? error.message : String(error));
    process.exitCode = 1;
  }
}
