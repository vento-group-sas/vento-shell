import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { spawnSync } from 'node:child_process';

import {
  READINESS_PATHS,
  instanceRequiresInPackageCandidateEvidence,
} from './package-readiness-scanner.mjs';

export const IMPLEMENTATION_DOCTOR_MODEL_ID = 'VENTO-IMPLEMENTATION-DOCTOR-V1';
export const REQUIRED_MAIN_CHECK = 'VENTO Required Gate';
export const SHELL_REPOSITORY = 'vento-group-sas/vento-shell';

const SHA_PATTERN = /^[0-9a-f]{40}$/u;
const DERIVED_PATHS = new Set([
  'docs/plan-canonico/modular/00_CABECERA_Y_ESTADO.md',
  'docs/plan-canonico/modular/active-sequence.json',
  'docs/plan-canonico/modular/.generated/REGISTRO_GLOBAL_DE_TAREAS.md',
  'docs/plan-canonico/modular/.generated/REGISTRO_DE_TAREAS_PENDIENTES_CON_CONTEXTO.md',
  'scripts/docs/package-readiness/implementation-package-registry.json',
]);

function fail(message) {
  throw new Error(message);
}

function normalizeRepoPath(value) {
  return String(value ?? '').trim().replaceAll('\\', '/').replace(/^\.\/+/u, '');
}

function normalizeInstanceId(value) {
  const raw = String(value ?? '').trim();
  const match = /^([A-Za-z0-9]+(?:-[A-Za-z0-9]+)*-[0-9]{3,4})::([A-Za-z0-9][A-Za-z0-9._-]*)$/u.exec(raw);
  if (!match) fail(`DOCTOR_INSTANCE_ID_INVALID:${raw || 'EMPTY'}`);
  return `${match[1].toUpperCase()}::${match[2]}`;
}

export function implementationBranchName(instanceId) {
  const id = normalizeInstanceId(instanceId);
  const [taskId, instanceKey] = id.split('::');
  return `implementation/${taskId.toLowerCase()}/${instanceKey.toLowerCase()}`;
}

function instanceRecordPath(instanceId) {
  const [taskId, instanceKey] = normalizeInstanceId(instanceId).split('::');
  return `docs/plan-canonico/modular/implementation-instances/${taskId}__${instanceKey}.json`;
}

function readJson(root, relativePath) {
  const absolute = path.join(root, ...relativePath.split('/'));
  if (!fs.existsSync(absolute)) fail(`DOCTOR_FILE_MISSING:${relativePath}`);
  return JSON.parse(fs.readFileSync(absolute, 'utf8'));
}

function scopeMatches(scopePath, changedPath) {
  const scope = normalizeRepoPath(scopePath).replace(/\/+$/u, '');
  const changed = normalizeRepoPath(changedPath);
  return Boolean(scope && changed && (changed === scope || changed.startsWith(`${scope}/`)));
}

function isPristinePendingRecord(root, relativePath) {
  if (!relativePath.startsWith('docs/plan-canonico/modular/implementation-instances/')) return false;
  const absolute = path.join(root, ...relativePath.split('/'));
  if (!fs.existsSync(absolute)) return false;
  try {
    const record = JSON.parse(fs.readFileSync(absolute, 'utf8'));
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
    return JSON.stringify(Object.keys(record).sort()) === JSON.stringify(expectedKeys)
      && record.status === 'PENDING_AUTHORIZATION'
      && Array.isArray(record.target_repositories) && record.target_repositories.length === 0
      && Array.isArray(record.authorized_changes) && record.authorized_changes.length === 0
      && Array.isArray(record.validation_commands) && record.validation_commands.length === 0
      && record.authorization === null
      && Array.isArray(record.evidence) && record.evidence.length === 0;
  } catch {
    return false;
  }
}

export function classifyDoctorWorktreePath({ root, instance, relativePath } = {}) {
  const pathValue = normalizeRepoPath(relativePath);
  if (!pathValue) return 'INVALID';
  if (pathValue === instanceRecordPath(instance.instance_id)) return 'OWN_LEDGER';
  if (DERIVED_PATHS.has(pathValue)) return 'DERIVED_PROJECTION';
  if (isPristinePendingRecord(root, pathValue)) return 'PRISTINE_PENDING_INSTANCE';

  for (const entry of instance?.authorized_changes ?? []) {
    if (String(entry?.repo ?? '').trim() !== SHELL_REPOSITORY) continue;
    if (!scopeMatches(entry?.path, pathValue)) continue;
    const change = String(entry?.change ?? '').trim().toUpperCase();
    return change === 'EXECUTE_ONLY' ? 'EXECUTE_ONLY_MUTATION' : 'AUTHORIZED_WRITABLE';
  }
  return 'UNEXPECTED';
}

export function deriveImplementationDoctorRequirements({ instance, foundation } = {}) {
  if (!instance || typeof instance !== 'object' || Array.isArray(instance)) {
    fail('DOCTOR_INSTANCE_INVALID');
  }
  const commands = Array.isArray(instance.validation_commands)
    ? instance.validation_commands.map((entry) => String(entry))
    : [];
  const physicalValidationPending = instance.status !== 'VERIFIED';
  const supabaseValidation = commands.some(
    (command) => /(?:supabase:db|supabase\s+test\s+db|supabase\s+db)/iu.test(command),
  );
  const mrp015Required = instanceRequiresInPackageCandidateEvidence(instance, foundation);

  return Object.freeze({
    instance_id: normalizeInstanceId(instance.instance_id),
    expected_branch: implementationBranchName(instance.instance_id),
    physical_validation_pending: physicalValidationPending,
    supabase_cli_required: physicalValidationPending && (supabaseValidation || mrp015Required),
    docker_server_required: physicalValidationPending && (supabaseValidation || mrp015Required),
    mrp015_050_required: mrp015Required,
    required_main_check: REQUIRED_MAIN_CHECK,
  });
}

function probePass(value) {
  return value === true;
}

export function evaluateImplementationDoctorProbes({
  instance,
  requirements,
  probes,
  worktreeClassifications = [],
} = {}) {
  if (!instance || !requirements || !probes) fail('DOCTOR_EVALUATION_INPUT_INVALID');
  const blockers = [];
  const advisories = [];

  const block = (value) => blockers.push(value);
  const advise = (value) => advisories.push(value);

  if (!probePass(probes.repository_root_ok)) block('REPOSITORY_ROOT_INVALID');
  if (!probePass(probes.repository_basename_ok)) block('OWNER_REPOSITORY_BASENAME_INVALID');
  if (!probePass(probes.origin_repository_ok)) block('ORIGIN_REPOSITORY_INVALID');
  if (!probePass(probes.full_branch_refspec_ok)) block('ORIGIN_REFSPEC_INCOMPLETE');

  for (const tool of ['git', 'node', 'npm', 'gh']) {
    if (!probePass(probes.tools?.[tool]?.ok)) block(`TOOL_UNAVAILABLE:${tool}`);
  }
  if (!probePass(probes.github_auth_ok)) block('GITHUB_AUTH_INVALID');
  if (!probePass(probes.branch_protection_readable)) block('BRANCH_PROTECTION_UNREADABLE');
  if (!probePass(probes.required_main_check_present)) block(`REQUIRED_CHECK_MISSING:${requirements.required_main_check}`);

  const allowedBranches = instance.status === 'AUTHORIZED'
    ? new Set(['main', requirements.expected_branch])
    : new Set([requirements.expected_branch]);
  if (!allowedBranches.has(String(probes.current_branch ?? ''))) {
    block(`CURRENT_BRANCH_INVALID:${probes.current_branch ?? 'DETACHED'}`);
  }

  const blockedWorktree = worktreeClassifications.filter(
    (entry) => ['EXECUTE_ONLY_MUTATION', 'UNEXPECTED', 'INVALID'].includes(entry.classification),
  );
  if (blockedWorktree.length > 0) {
    block(`WORKTREE_SCOPE_INVALID:${blockedWorktree.map((entry) => entry.path).join(',')}`);
  }

  if (probes.current_branch === 'main' && instance.status === 'AUTHORIZED') {
    if (probes.remote_main_sha && probes.local_head_sha !== probes.remote_main_sha) {
      block('MAIN_NOT_SYNCHRONIZED_WITH_REMOTE');
    }
  }

  if (probes.current_branch === requirements.expected_branch) {
    if (!probes.remote_branch_sha) {
      block('REMOTE_IMPLEMENTATION_BRANCH_MISSING');
    } else if (probes.local_head_sha !== probes.remote_branch_sha) {
      if (probes.remote_branch_relation === 'REMOTE_ANCESTOR_LOCAL') {
        advise('LOCAL_IMPLEMENTATION_BRANCH_AHEAD_OF_REMOTE');
      } else {
        block(`IMPLEMENTATION_BRANCH_DIVERGENCE:${probes.remote_branch_relation ?? 'UNKNOWN'}`);
      }
    }

    if (probes.main_ancestor_of_local_head === false) {
      if (instance.status === 'AUTHORIZED') {
        block('IMPLEMENTATION_START_STALE_BRANCH');
      } else {
        advise('INTEGRATION_BASE_ADVANCED');
      }
    }
  }

  if (requirements.docker_server_required && !probePass(probes.docker_server_ok)) {
    block('DOCKER_SERVER_UNAVAILABLE');
  }
  if (requirements.supabase_cli_required && !probePass(probes.supabase_cli_ok)) {
    block('SUPABASE_CLI_UNAVAILABLE');
  }

  if (probes.branch_protection_strict === true && probes.main_ancestor_of_local_head === false) {
    advise('STRICT_PROTECTION_REQUIRES_REINTEGRATION_BEFORE_MERGE');
  }

  if (probes.open_pr) {
    if (probes.open_pr.head_sha && probes.remote_branch_sha
        && probes.open_pr.head_sha !== probes.remote_branch_sha) {
      block('OPEN_PR_HEAD_DOES_NOT_MATCH_REMOTE_BRANCH');
    }
    if (probes.open_pr.is_draft) advise('OPEN_PR_IS_DRAFT');
    if (String(probes.open_pr.mergeable ?? '').toUpperCase() === 'CONFLICTING') {
      block('OPEN_PR_CONFLICTING');
    }
  }

  const integrationRequired = advisories.includes('INTEGRATION_BASE_ADVANCED')
    || advisories.includes('STRICT_PROTECTION_REQUIRES_REINTEGRATION_BEFORE_MERGE');

  return Object.freeze({
    model_id: IMPLEMENTATION_DOCTOR_MODEL_ID,
    instance_id: instance.instance_id,
    status: blockers.length === 0 ? 'PASS' : 'BLOCKED',
    blockers: Object.freeze(blockers),
    advisories: Object.freeze(advisories),
    integration_required: integrationRequired,
    next_action: blockers.length > 0
      ? 'STOP_AND_REPAIR_PREFLIGHT'
      : integrationRequired
        ? 'REINTEGRATE_MAIN_BEFORE_CHECKS'
        : 'CONTINUE_CANONICAL_LIFECYCLE',
  });
}

function run(command, args, { cwd, allowFailure = false } = {}) {
  const result = spawnSync(command, args, {
    cwd,
    encoding: 'utf8',
    windowsHide: true,
    stdio: ['ignore', 'pipe', 'pipe'],
  });
  if (result.error) {
    if (allowFailure) return { status: 1, stdout: '', stderr: result.error.message };
    fail(`${command} unavailable: ${result.error.message}`);
  }
  const status = Number.isInteger(result.status) ? result.status : 1;
  const stdout = String(result.stdout ?? '').trim();
  const stderr = String(result.stderr ?? '').trim();
  if (status !== 0 && !allowFailure) {
    fail(stderr || stdout || `${command} failed`);
  }
  return { status, stdout, stderr };
}

function commandProbe(command, args, cwd) {
  const result = run(command, args, { cwd, allowFailure: true });
  return Object.freeze({
    ok: result.status === 0,
    status: result.status,
    detail: (result.stdout || result.stderr).split(/\r?\n/u)[0] || null,
  });
}

function parsePorcelainPaths(source) {
  return String(source ?? '').split(/\r?\n/u).filter(Boolean).map((line) => {
    const payload = line.slice(3).trim();
    const arrow = payload.lastIndexOf(' -> ');
    return normalizeRepoPath(arrow >= 0 ? payload.slice(arrow + 4) : payload);
  });
}

function remoteHead(root, branch) {
  const result = run('git', ['ls-remote', '--heads', 'origin', `refs/heads/${branch}`], {
    cwd: root,
    allowFailure: true,
  });
  if (result.status !== 0 || !result.stdout) return null;
  const value = result.stdout.split(/\s+/u)[0]?.toLowerCase() ?? '';
  return SHA_PATTERN.test(value) ? value : null;
}

function commitExists(root, sha) {
  if (!sha) return false;
  return run('git', ['cat-file', '-e', `${sha}^{commit}`], {
    cwd: root,
    allowFailure: true,
  }).status === 0;
}

function relation(root, leftSha, rightSha) {
  if (!commitExists(root, leftSha) || !commitExists(root, rightSha)) return 'UNKNOWN';
  if (leftSha === rightSha) return 'EQUAL';
  if (run('git', ['merge-base', '--is-ancestor', leftSha, rightSha], {
    cwd: root,
    allowFailure: true,
  }).status === 0) return 'REMOTE_ANCESTOR_LOCAL';
  if (run('git', ['merge-base', '--is-ancestor', rightSha, leftSha], {
    cwd: root,
    allowFailure: true,
  }).status === 0) return 'LOCAL_ANCESTOR_REMOTE';
  return 'DIVERGED';
}

function parseProtection(source) {
  if (!source) return { readable: false, strict: null, contexts: [] };
  try {
    const value = JSON.parse(source);
    const contexts = new Set([
      ...(Array.isArray(value.contexts) ? value.contexts : []),
      ...(Array.isArray(value.checks) ? value.checks.map((entry) => entry?.context).filter(Boolean) : []),
    ]);
    return {
      readable: true,
      strict: value.strict === true,
      contexts: [...contexts].sort(),
    };
  } catch {
    return { readable: false, strict: null, contexts: [] };
  }
}

function parseOpenPr(source) {
  if (!source) return null;
  try {
    const rows = JSON.parse(source);
    if (!Array.isArray(rows) || rows.length === 0) return null;
    const row = rows[0];
    return {
      number: Number(row.number),
      head_sha: String(row.headRefOid ?? '').toLowerCase() || null,
      mergeable: row.mergeable ?? null,
      is_draft: row.isDraft === true,
    };
  } catch {
    return null;
  }
}

export function runImplementationDoctor({
  root = process.cwd(),
  instanceId,
} = {}) {
  const resolvedRoot = path.resolve(root);
  const gitRoot = run('git', ['rev-parse', '--show-toplevel'], {
    cwd: resolvedRoot,
    allowFailure: true,
  });
  const rootOk = gitRoot.status === 0
    && path.resolve(gitRoot.stdout).toLowerCase() === resolvedRoot.toLowerCase();

  const id = normalizeInstanceId(instanceId);
  const instance = readJson(resolvedRoot, instanceRecordPath(id));
  const contract = readJson(resolvedRoot, READINESS_PATHS.contract);
  const foundation = contract?.physical_dependencies?.supabase_pre_e5_foundation ?? null;
  const requirements = deriveImplementationDoctorRequirements({ instance, foundation });

  const localHeadProbe = commandProbe('git', ['rev-parse', 'HEAD'], resolvedRoot);
  const localHead = localHeadProbe.ok && SHA_PATTERN.test(String(localHeadProbe.detail ?? '').toLowerCase())
    ? String(localHeadProbe.detail).toLowerCase()
    : null;
  const currentBranchProbe = commandProbe('git', ['branch', '--show-current'], resolvedRoot);
  const currentBranch = currentBranchProbe.ok ? String(currentBranchProbe.detail ?? '') : null;

  const originProbe = commandProbe('git', ['remote', 'get-url', 'origin'], resolvedRoot);
  const originUrl = String(originProbe.detail ?? '');
  const originRepositoryOk = originProbe.ok && (
    /github\.com[/:]vento-group-sas\/vento-shell(?:\.git)?$/iu.test(originUrl)
  );

  const refspecProbe = run('git', ['config', '--get-all', 'remote.origin.fetch'], {
    cwd: resolvedRoot,
    allowFailure: true,
  });
  const refspecLines = refspecProbe.stdout.split(/\r?\n/u).filter(Boolean);
  const fullBranchRefspec = refspecProbe.status === 0
    && refspecLines.some((entry) => entry.includes('+refs/heads/*:refs/remotes/origin/*'));

  const remoteMain = remoteHead(resolvedRoot, 'main');
  const remoteBranch = remoteHead(resolvedRoot, requirements.expected_branch);
  const remoteRelation = remoteBranch && localHead
    ? relation(resolvedRoot, remoteBranch, localHead)
    : null;
  const mainAncestor = remoteMain && localHead && commitExists(resolvedRoot, remoteMain)
    ? run('git', ['merge-base', '--is-ancestor', remoteMain, localHead], {
      cwd: resolvedRoot,
      allowFailure: true,
    }).status === 0
    : null;

  const worktree = run('git', ['status', '--porcelain=v1', '--untracked-files=all'], {
    cwd: resolvedRoot,
    allowFailure: true,
  });
  const worktreePaths = worktree.status === 0 ? parsePorcelainPaths(worktree.stdout) : [];
  const worktreeClassifications = worktreePaths.map((relativePath) => ({
    path: relativePath,
    classification: classifyDoctorWorktreePath({
      root: resolvedRoot,
      instance,
      relativePath,
    }),
  }));

  const ghAuth = commandProbe('gh', ['auth', 'status'], resolvedRoot);
  const protectionProbe = run('gh', [
    'api',
    `repos/${SHELL_REPOSITORY}/branches/main/protection/required_status_checks`,
  ], { cwd: resolvedRoot, allowFailure: true });
  const protection = protectionProbe.status === 0
    ? parseProtection(protectionProbe.stdout)
    : { readable: false, strict: null, contexts: [] };

  const openPrProbe = run('gh', [
    'pr', 'list',
    '--head', requirements.expected_branch,
    '--base', 'main',
    '--state', 'open',
    '--json', 'number,headRefOid,mergeable,isDraft',
    '--limit', '1',
  ], { cwd: resolvedRoot, allowFailure: true });
  const openPr = openPrProbe.status === 0 ? parseOpenPr(openPrProbe.stdout) : null;

  const docker = requirements.docker_server_required
    ? commandProbe('docker', ['version', '--format', '{{.Server.Version}}'], resolvedRoot)
    : { ok: true, status: 0, detail: 'NOT_REQUIRED_FOR_CURRENT_STATE' };
  const supabase = requirements.supabase_cli_required
    ? commandProbe('cmd.exe', ['/d', '/s', '/c', 'npm.cmd exec -- supabase --version'], resolvedRoot)
    : { ok: true, status: 0, detail: 'NOT_REQUIRED_FOR_CURRENT_STATE' };

  const probes = {
    repository_root_ok: rootOk,
    repository_basename_ok: path.basename(resolvedRoot).toLowerCase() === 'vento-shell',
    origin_repository_ok: originRepositoryOk,
    full_branch_refspec_ok: fullBranchRefspec,
    tools: {
      git: commandProbe('git', ['--version'], resolvedRoot),
      node: { ok: true, status: 0, detail: process.version },
      npm: commandProbe('cmd.exe', ['/d', '/s', '/c', 'npm.cmd --version'], resolvedRoot),
      gh: commandProbe('gh', ['--version'], resolvedRoot),
    },
    github_auth_ok: ghAuth.ok,
    branch_protection_readable: protection.readable,
    required_main_check_present: protection.contexts.includes(REQUIRED_MAIN_CHECK),
    required_main_checks: protection.contexts,
    branch_protection_strict: protection.strict,
    current_branch: currentBranch,
    local_head_sha: localHead,
    remote_main_sha: remoteMain,
    remote_branch_sha: remoteBranch,
    remote_branch_relation: remoteRelation,
    main_ancestor_of_local_head: mainAncestor,
    docker_server_ok: docker.ok,
    docker_server_detail: docker.detail,
    supabase_cli_ok: supabase.ok,
    supabase_cli_detail: supabase.detail,
    open_pr: openPr,
  };

  const assessment = evaluateImplementationDoctorProbes({
    instance,
    requirements,
    probes,
    worktreeClassifications,
  });

  return Object.freeze({
    schema_version: 1,
    model_id: IMPLEMENTATION_DOCTOR_MODEL_ID,
    instance: Object.freeze({
      id: instance.instance_id,
      task_id: instance.task_id,
      status: instance.status,
    }),
    requirements,
    probes,
    worktree: Object.freeze({
      paths: Object.freeze(worktreePaths),
      classifications: Object.freeze(worktreeClassifications),
    }),
    assessment,
    remote_mutations: 0,
    worktree_mutations: 0,
  });
}

function parseArgs(argv) {
  const args = {
    root: process.cwd(),
    instanceId: null,
    json: false,
    strict: false,
  };
  for (let index = 0; index < argv.length; index += 1) {
    const token = argv[index];
    if (token === '--json') args.json = true;
    else if (token === '--strict') args.strict = true;
    else if (token === '--root' || token === '--instance-id') {
      const value = argv[index + 1];
      if (!value || value.startsWith('--')) fail(`DOCTOR_ARGUMENT_VALUE_MISSING:${token}`);
      if (token === '--root') args.root = value;
      else args.instanceId = value;
      index += 1;
    } else {
      fail(`DOCTOR_ARGUMENT_UNKNOWN:${token}`);
    }
  }
  if (!args.instanceId) fail('DOCTOR_INSTANCE_ID_REQUIRED');
  return args;
}

function printReport(report, jsonMode) {
  if (jsonMode) {
    console.log(JSON.stringify(report, null, 2));
    return;
  }
  console.log(`IMPLEMENTATION_DOCTOR: ${report.assessment.status}`);
  console.log(`INSTANCE: ${report.instance.id}`);
  console.log(`NEXT_ACTION: ${report.assessment.next_action}`);
  console.log(`INTEGRATION_REQUIRED: ${report.assessment.integration_required ? 'SI' : 'NO'}`);
  console.log(`BLOCKERS: ${report.assessment.blockers.join(' | ') || 'NONE'}`);
  console.log(`ADVISORIES: ${report.assessment.advisories.join(' | ') || 'NONE'}`);
}

const isMain = process.argv[1]
  && path.resolve(process.argv[1]) === path.resolve(fileURLToPath(import.meta.url));

if (isMain) {
  const args = parseArgs(process.argv.slice(2));
  const report = runImplementationDoctor({
    root: args.root,
    instanceId: args.instanceId,
  });
  printReport(report, args.json);
  if (args.strict && report.assessment.status !== 'PASS') {
    throw new Error(
      `IMPLEMENTATION_DOCTOR_BLOCKED:${report.assessment.blockers.join(',') || 'UNKNOWN'}`,
    );
  }
}
