import fs from 'node:fs';
import path from 'node:path';
import { spawnSync } from 'node:child_process';

import {
  SHELL_REPOSITORY,
  correctionBranchName,
} from './correction-control.mjs';
import {
  implementationPathMatchesScope,
  normalizeImplementationPath,
} from './implementation-path-policy.mjs';
import { parsePorcelainPaths } from './task-branch-lifecycle.mjs';

export const CORRECTION_REPOSITORY_BUNDLE_MODEL_ID = 'VENTO-CORRECTION-REPOSITORY-BUNDLE-V1';
export const CORRECTION_REPOSITORY_BUNDLE_PUBLISH_EVIDENCE_TYPE = 'CORRECTION_REPOSITORY_BUNDLE_PUBLISH_V1';
const DEFAULT_BRANCH = 'main';
const REQUIRED_GATE = 'VENTO Required Gate';
const SHA_PATTERN = /^[0-9a-f]{40}$/u;
const CHECK_ATTEMPTS = 720;
const CHECK_INTERVAL_MS = 5000;
const MERGE_ATTEMPTS = 60;
const MERGE_INTERVAL_MS = 2000;

function fail(message, code = 1) {
  const error = new Error(message);
  error.exitCode = code;
  throw error;
}

function run(command, args, { cwd = process.cwd(), allowFailure = false } = {}) {
  const result = spawnSync(command, args, {
    cwd,
    encoding: 'utf8',
    windowsHide: true,
    stdio: ['ignore', 'pipe', 'pipe'],
    maxBuffer: 64 * 1024 * 1024,
  });
  if (result.error) {
    if (allowFailure) return { status: 1, stdout: '', stderr: result.error.message };
    fail(`${command} no disponible: ${result.error.message}`);
  }
  const status = Number.isInteger(result.status) ? result.status : 1;
  const stdout = String(result.stdout ?? '').trimEnd();
  const stderr = String(result.stderr ?? '').trimEnd();
  if (status !== 0 && !allowFailure) fail(stderr || stdout || `${command} ${args.join(' ')} fallo.`, status);
  return { status, stdout, stderr };
}

function git(root, args, options = {}) { return run('git', args, { ...options, cwd: root }); }
function gh(root, args, options = {}) { return run('gh', args, { ...options, cwd: root }); }
function sleep(ms) { const delay = Number(ms); if (Number.isFinite(delay) && delay > 0) Atomics.wait(new Int32Array(new SharedArrayBuffer(4)), 0, 0, delay); }
function uniqueSorted(values) { return [...new Set((values ?? []).map((value) => String(value ?? '').trim()).filter(Boolean))].sort((left, right) => left.localeCompare(right, 'en')); }
function repositoryName(repository) {
  const parts = String(repository ?? '').trim().split('/');
  if (parts.length !== 2 || parts.some((entry) => !entry)) fail(`CORRECTION_REPOSITORY_INVALID:${repository || 'EMPTY'}`);
  return parts[1];
}
function normalizedRemoteRepository(remote) {
  const value = String(remote ?? '').trim().replace(/\\/gu, '/').replace(/\.git$/u, '');
  const match = /github\.com[/:]([^/]+)\/([^/]+)$/iu.exec(value);
  return match ? `${match[1]}/${match[2]}` : null;
}
function repositoryRootFor(shellRoot, repository) {
  return repository === SHELL_REPOSITORY
    ? path.resolve(shellRoot)
    : path.resolve(path.dirname(path.resolve(shellRoot)), repositoryName(repository));
}
function currentBranch(root) { return git(root, ['branch', '--show-current']).stdout.trim(); }
function currentHead(root) { return git(root, ['rev-parse', 'HEAD']).stdout.trim().toLowerCase(); }
function branchExists(root, branch) { return git(root, ['show-ref', '--verify', '--quiet', `refs/heads/${branch}`], { allowFailure: true }).status === 0; }
function remoteBranchExists(root, branch) { return git(root, ['ls-remote', '--exit-code', '--heads', 'origin', `refs/heads/${branch}`], { allowFailure: true }).status === 0; }
function worktreePaths(root) { return parsePorcelainPaths(git(root, ['status', '--porcelain=v1', '--untracked-files=all']).stdout); }
function branchChangedPaths(root) {
  return git(root, ['diff', '--name-only', '--diff-filter=ACMRD', `origin/${DEFAULT_BRANCH}...HEAD`]).stdout
    .split(/\r?\n/u).map(normalizeImplementationPath).filter(Boolean);
}
function authorizedChanges(record, repository) {
  return (record?.authorized_changes ?? []).filter((entry) => String(entry?.repo ?? '').trim() === repository);
}
function verifyRepositoryCheckout(root, repository) {
  if (!fs.existsSync(root) || !fs.statSync(root).isDirectory()) fail(`CORRECTION_REPOSITORY_CHECKOUT_MISSING:${repository}:${root}`);
  const top = git(root, ['rev-parse', '--show-toplevel'], { allowFailure: true });
  if (top.status !== 0 || path.resolve(top.stdout.trim()) !== path.resolve(root)) fail(`CORRECTION_REPOSITORY_CHECKOUT_INVALID:${repository}:${root}`);
  const remote = git(root, ['remote', 'get-url', 'origin'], { allowFailure: true });
  const identity = remote.status === 0 ? normalizedRemoteRepository(remote.stdout) : null;
  if (identity !== repository) fail(`CORRECTION_REPOSITORY_ORIGIN_MISMATCH:${repository}:${identity ?? 'NONE'}`);
  return true;
}
function parseJson(source, label) {
  try { return JSON.parse(String(source ?? '').trim() || 'null'); } catch { fail(`${label}:JSON_INVALID`); }
}
function mergedPrForBranch(entry) {
  const result = gh(entry.root, [
    'pr', 'list', '--head', entry.branch, '--base', DEFAULT_BRANCH, '--state', 'closed',
    '--json', 'number,state,headRefName,headRefOid,baseRefName,mergedAt,mergeCommit', '--limit', '20',
  ], { allowFailure: true });
  if (result.status !== 0) return null;
  const rows = parseJson(result.stdout, 'gh pr list merged') ?? [];
  if (!Array.isArray(rows)) return null;
  return rows.find((row) => row?.mergedAt && row?.baseRefName === DEFAULT_BRANCH && row?.headRefName === entry.branch) ?? null;
}
function verifyMergedPrOnMain(entry, row) {
  const candidate = String(row?.headRefOid ?? '').trim().toLowerCase();
  const mergeCommit = String(row?.mergeCommit?.oid ?? '').trim().toLowerCase();
  if (!Number.isSafeInteger(Number(row?.number)) || Number(row.number) <= 0 || !SHA_PATTERN.test(candidate) || !SHA_PATTERN.test(mergeCommit)) {
    fail(`CORRECTION_REPOSITORY_MERGED_PR_INVALID:${entry.repository}`);
  }
  git(entry.root, ['fetch', 'origin', DEFAULT_BRANCH, '--quiet']);
  if (git(entry.root, ['merge-base', '--is-ancestor', mergeCommit, `origin/${DEFAULT_BRANCH}`], { allowFailure: true }).status !== 0) {
    fail(`CORRECTION_REPOSITORY_MERGE_NOT_ON_MAIN:${entry.repository}:${mergeCommit}`);
  }
  return Object.freeze({
    repository: entry.repository,
    candidate_commit: candidate,
    pr: Number(row.number),
    merge_commit: mergeCommit,
    merged_at: row.mergedAt,
    status: 'MERGED',
  });
}

export function buildCorrectionRepositoryPlan({ shellRoot = process.cwd(), record, verifyCheckouts = true } = {}) {
  if (!record || typeof record !== 'object' || Array.isArray(record)) fail('CORRECTION_REPOSITORY_RECORD_INVALID');
  const repositories = uniqueSorted(record.target_repositories ?? []);
  if (repositories.length === 0) fail('CORRECTION_REPOSITORY_TARGETS_EMPTY');
  if (!repositories.includes(SHELL_REPOSITORY)) fail(`CORRECTION_REPOSITORY_ORCHESTRATOR_MISSING:${SHELL_REPOSITORY}`);
  const authorizedRepositories = uniqueSorted((record.authorized_changes ?? []).map((entry) => entry?.repo));
  const missing = repositories.filter((repo) => !authorizedRepositories.includes(repo));
  const extra = authorizedRepositories.filter((repo) => !repositories.includes(repo));
  if (missing.length > 0 || extra.length > 0) {
    fail(`CORRECTION_REPOSITORY_AUTHORIZATION_MISMATCH:missing=${missing.join(',') || 'NONE'};extra=${extra.join(',') || 'NONE'}`);
  }
  const branch = correctionBranchName(record.correction_id);
  const entries = repositories.map((repository) => {
    const root = repositoryRootFor(shellRoot, repository);
    if (verifyCheckouts) verifyRepositoryCheckout(root, repository);
    return Object.freeze({
      repository,
      root,
      branch,
      orchestrator: repository === SHELL_REPOSITORY,
      authorized_changes: Object.freeze(authorizedChanges(record, repository)),
    });
  });
  if (new Set(entries.map((entry) => path.resolve(entry.root).toLowerCase())).size !== entries.length) {
    fail('CORRECTION_REPOSITORY_CHECKOUTS_NOT_INDEPENDENT');
  }
  return Object.freeze({
    model_id: CORRECTION_REPOSITORY_BUNDLE_MODEL_ID,
    correction_id: record.correction_id,
    branch,
    repositories: Object.freeze(entries),
    repository_count: entries.length,
    multi_repo: entries.length > 1,
  });
}

export function assertExternalCorrectionScope({ record, changes } = {}) {
  for (const state of changes ?? []) {
    if (state.repository === SHELL_REPOSITORY) continue;
    const authorized = authorizedChanges(record, state.repository);
    for (const changedPath of state.paths ?? []) {
      const normalized = normalizeImplementationPath(changedPath);
      const match = authorized.find((entry) => implementationPathMatchesScope(entry.path, normalized));
      if (!match) fail(`CORRECTION_REPOSITORY_PATH_OUT_OF_SCOPE:${state.repository}:${normalized}`);
      if (String(match.change ?? '').trim().toUpperCase() === 'EXECUTE_ONLY') {
        fail(`CORRECTION_REPOSITORY_EXECUTE_ONLY_WRITE:${state.repository}:${normalized}`);
      }
    }
  }
  return true;
}

export function ensureExternalCorrectionBranches({ plan } = {}) {
  if (!plan || plan.model_id !== CORRECTION_REPOSITORY_BUNDLE_MODEL_ID) fail('CORRECTION_REPOSITORY_PLAN_INVALID');
  const results = [];
  for (const entry of plan.repositories.filter((candidate) => !candidate.orchestrator)) {
    verifyRepositoryCheckout(entry.root, entry.repository);
    const merged = mergedPrForBranch(entry);
    if (merged) {
      results.push(Object.freeze({ repository: entry.repository, branch: entry.branch, state: 'ALREADY_MERGED' }));
      continue;
    }
    git(entry.root, ['fetch', 'origin', DEFAULT_BRANCH, '--quiet']);
    const current = currentBranch(entry.root);
    if (current === DEFAULT_BRANCH) {
      if (worktreePaths(entry.root).length > 0) fail(`CORRECTION_REPOSITORY_MAIN_DIRTY:${entry.repository}`);
      git(entry.root, ['pull', '--ff-only', 'origin', DEFAULT_BRANCH]);
      if (remoteBranchExists(entry.root, entry.branch)) {
        git(entry.root, ['fetch', 'origin', entry.branch, '--quiet']);
        if (branchExists(entry.root, entry.branch)) {
          git(entry.root, ['switch', entry.branch]);
          git(entry.root, ['branch', '--set-upstream-to', `origin/${entry.branch}`, entry.branch]);
        } else {
          git(entry.root, ['switch', '-c', entry.branch, '--track', `origin/${entry.branch}`]);
        }
      } else if (branchExists(entry.root, entry.branch)) {
        git(entry.root, ['switch', entry.branch]);
      } else {
        git(entry.root, ['switch', '-c', entry.branch]);
      }
    } else if (current !== entry.branch) {
      fail(`CORRECTION_REPOSITORY_BRANCH_CONFLICT:${entry.repository}:${current || 'DETACHED'}`);
    }
    if (worktreePaths(entry.root).length === 0) {
      const contained = git(entry.root, ['merge-base', '--is-ancestor', `origin/${DEFAULT_BRANCH}`, 'HEAD'], { allowFailure: true });
      if (contained.status !== 0) {
        const merge = git(entry.root, ['merge', '--no-edit', `origin/${DEFAULT_BRANCH}`], { allowFailure: true });
        if (merge.status !== 0) fail(`CORRECTION_REPOSITORY_MAIN_RECONCILIATION_FAILED:${entry.repository}`);
      }
    }
    results.push(Object.freeze({ repository: entry.repository, branch: entry.branch, state: 'READY' }));
  }
  return Object.freeze(results);
}

function externalChanges(plan) {
  return plan.repositories.filter((entry) => !entry.orchestrator).map((entry) => Object.freeze({
    repository: entry.repository,
    paths: Object.freeze([...new Set([
      ...branchChangedPaths(entry.root),
      ...worktreePaths(entry.root).map(normalizeImplementationPath),
    ])].filter(Boolean).sort()),
  }));
}
function commitDirty(root, message) {
  const dirty = worktreePaths(root);
  if (dirty.length === 0) return false;
  git(root, ['add', '--', ...dirty]);
  git(root, ['diff', '--cached', '--check']);
  const staged = git(root, ['diff', '--cached', '--name-only', '--diff-filter=ACMRD']).stdout.trim();
  if (!staged) return false;
  git(root, ['commit', '-m', message]);
  return true;
}

export function checkpointExternalCorrectionBundle({ plan, record } = {}) {
  const initial = externalChanges(plan);
  assertExternalCorrectionScope({ record, changes: initial });
  const results = [];
  for (const entry of plan.repositories.filter((candidate) => !candidate.orchestrator)) {
    const merged = mergedPrForBranch(entry);
    if (merged) {
      results.push(Object.freeze({ ...verifyMergedPrOnMain(entry, merged), checkpoint: 'ALREADY_MERGED' }));
      continue;
    }
    if (currentBranch(entry.root) !== entry.branch) fail(`CORRECTION_REPOSITORY_CHECKPOINT_BRANCH_INVALID:${entry.repository}`);
    commitDirty(entry.root, `correction(${record.correction_id}): materialize ${entry.repository}`);
    git(entry.root, ['fetch', 'origin', DEFAULT_BRANCH, '--quiet']);
    const contained = git(entry.root, ['merge-base', '--is-ancestor', `origin/${DEFAULT_BRANCH}`, 'HEAD'], { allowFailure: true });
    if (contained.status !== 0) {
      const merge = git(entry.root, ['merge', '--no-edit', `origin/${DEFAULT_BRANCH}`], { allowFailure: true });
      if (merge.status !== 0) fail(`CORRECTION_REPOSITORY_CHECKPOINT_RECONCILIATION_FAILED:${entry.repository}`);
    }
    const changed = branchChangedPaths(entry.root);
    assertExternalCorrectionScope({ record, changes: [{ repository: entry.repository, paths: changed }] });
    if (changed.length === 0) fail(`CORRECTION_REPOSITORY_EMPTY_DELTA:${entry.repository}`);
    git(entry.root, ['push', '-u', 'origin', entry.branch]);
    git(entry.root, ['fetch', 'origin', entry.branch, '--quiet']);
    const local = currentHead(entry.root);
    const remote = git(entry.root, ['rev-parse', `origin/${entry.branch}`]).stdout.trim().toLowerCase();
    if (local !== remote) fail(`CORRECTION_REPOSITORY_PUSH_MISMATCH:${entry.repository}`);
    results.push(Object.freeze({ repository: entry.repository, candidate_commit: local, changed_paths: Object.freeze(changed), checkpoint: 'PUSHED' }));
  }
  return Object.freeze(results);
}

function findOrCreatePr(entry, record, headSha) {
  const rows = parseJson(gh(entry.root, [
    'pr', 'list', '--head', entry.branch, '--base', DEFAULT_BRANCH, '--state', 'open',
    '--json', 'number,headRefOid', '--limit', '1',
  ]).stdout, 'gh pr list') ?? [];
  if (Array.isArray(rows) && rows.length > 0) return Number(rows[0].number);
  const body = [
    'VENTO-TREQ-AFFECTED: NONE',
    `VENTO-TREQ-ZERO-REASON: ${record.correction_id} aplica un delta de repositorio externo gobernado por el ledger canonico en vento-shell.`,
    '',
    '## Correccion multi-repo',
    '',
    record.correction_id,
    '',
    `Repositorio: ${entry.repository}`,
    `Candidate: ${headSha}`,
  ].join('\n');
  gh(entry.root, [
    'pr', 'create', '--base', DEFAULT_BRANCH, '--head', entry.branch,
    '--title', `correction(${record.correction_id}): ${entry.repository}`,
    '--body', body,
  ]);
  const created = parseJson(gh(entry.root, [
    'pr', 'list', '--head', entry.branch, '--base', DEFAULT_BRANCH, '--state', 'open',
    '--json', 'number', '--limit', '1',
  ]).stdout, 'gh pr list post-create') ?? [];
  if (!Array.isArray(created) || created.length !== 1) fail(`CORRECTION_REPOSITORY_PR_NOT_RESOLVED:${entry.repository}`);
  return Number(created[0].number);
}
function waitChecks(entry, prNumber, headSha) {
  for (let attempt = 1; attempt <= CHECK_ATTEMPTS; attempt += 1) {
    const state = parseJson(gh(entry.root, ['pr', 'view', String(prNumber), '--json', 'state,isDraft,headRefOid,baseRefName']).stdout, 'gh pr view');
    if (state?.state !== 'OPEN' || state?.isDraft === true || state?.baseRefName !== DEFAULT_BRANCH || state?.headRefOid !== headSha) {
      fail(`CORRECTION_REPOSITORY_PR_IDENTITY_INVALID:${entry.repository}:#${prNumber}`);
    }
    const checks = gh(entry.root, ['pr', 'checks', String(prNumber), '--json', 'name,state,bucket,link'], { allowFailure: true });
    if (checks.status === 0) {
      const rows = parseJson(checks.stdout, 'gh pr checks') ?? [];
      if (Array.isArray(rows) && rows.length > 0) {
        const required = rows.find((row) => String(row?.name ?? '').trim() === REQUIRED_GATE);
        const failed = rows.filter((row) => ['fail', 'cancel'].includes(String(row?.bucket ?? '').toLowerCase()));
        if (failed.length > 0) fail(`CORRECTION_REPOSITORY_CHECKS_FAILED:${entry.repository}:#${prNumber}`);
        const pending = rows.filter((row) => !['pass', 'skipping'].includes(String(row?.bucket ?? '').toLowerCase()));
        if (required && String(required?.bucket ?? '').toLowerCase() === 'pass' && pending.length === 0) return rows.length;
      }
    }
    if (attempt < CHECK_ATTEMPTS) sleep(CHECK_INTERVAL_MS);
  }
  fail(`CORRECTION_REPOSITORY_REQUIRED_GATE_TIMEOUT:${entry.repository}:#${prNumber}`);
}
function waitMerged(entry, prNumber, headSha) {
  for (let attempt = 1; attempt <= MERGE_ATTEMPTS; attempt += 1) {
    const state = parseJson(gh(entry.root, ['pr', 'view', String(prNumber), '--json', 'state,mergedAt,mergeCommit,headRefOid']).stdout, 'gh pr view merged');
    if (state?.headRefOid !== headSha) fail(`CORRECTION_REPOSITORY_PR_HEAD_CHANGED:${entry.repository}:#${prNumber}`);
    if (state?.state === 'MERGED') return verifyMergedPrOnMain(entry, { ...state, number: prNumber });
    if (state?.state === 'CLOSED') fail(`CORRECTION_REPOSITORY_PR_CLOSED_WITHOUT_MERGE:${entry.repository}`);
    if (attempt < MERGE_ATTEMPTS) sleep(MERGE_INTERVAL_MS);
  }
  fail(`CORRECTION_REPOSITORY_MERGE_TIMEOUT:${entry.repository}:#${prNumber}`);
}

export function publishExternalCorrectionBundle({ plan, record } = {}) {
  const published = [];
  for (const entry of plan.repositories.filter((candidate) => !candidate.orchestrator)) {
    verifyRepositoryCheckout(entry.root, entry.repository);
    const alreadyMerged = mergedPrForBranch(entry);
    if (alreadyMerged) {
      published.push(verifyMergedPrOnMain(entry, alreadyMerged));
      continue;
    }
    if (currentBranch(entry.root) !== entry.branch) fail(`CORRECTION_REPOSITORY_FINISH_BRANCH_INVALID:${entry.repository}`);
    if (worktreePaths(entry.root).length > 0) fail(`CORRECTION_REPOSITORY_FINISH_DIRTY:${entry.repository}`);
    const changed = branchChangedPaths(entry.root);
    assertExternalCorrectionScope({ record, changes: [{ repository: entry.repository, paths: changed }] });
    if (changed.length === 0) fail(`CORRECTION_REPOSITORY_EMPTY_DELTA:${entry.repository}`);
    git(entry.root, ['push', '-u', 'origin', entry.branch]);
    const headSha = currentHead(entry.root);
    const prNumber = findOrCreatePr(entry, record, headSha);
    const checks = waitChecks(entry, prNumber, headSha);
    gh(entry.root, ['pr', 'merge', String(prNumber), '--merge', '--match-head-commit', headSha]);
    const merged = waitMerged(entry, prNumber, headSha);
    git(entry.root, ['fetch', 'origin', DEFAULT_BRANCH, '--quiet']);
    git(entry.root, ['switch', DEFAULT_BRANCH]);
    git(entry.root, ['pull', '--ff-only', 'origin', DEFAULT_BRANCH]);
    if (remoteBranchExists(entry.root, entry.branch)) git(entry.root, ['push', 'origin', '--delete', entry.branch], { allowFailure: true });
    if (branchExists(entry.root, entry.branch)) git(entry.root, ['branch', '-d', entry.branch], { allowFailure: true });
    if (worktreePaths(entry.root).length > 0) fail(`CORRECTION_REPOSITORY_MAIN_DIRTY_AFTER_MERGE:${entry.repository}`);
    published.push(Object.freeze({ ...merged, checks }));
  }
  return Object.freeze({
    type: CORRECTION_REPOSITORY_BUNDLE_PUBLISH_EVIDENCE_TYPE,
    model_id: CORRECTION_REPOSITORY_BUNDLE_MODEL_ID,
    correction_id: record.correction_id,
    published_at: new Date().toISOString(),
    repositories: Object.freeze(published),
  });
}

export function correctionRepositoryPublishEvidence(record) {
  return [...(record?.evidence ?? [])].reverse().find((entry) => entry?.type === CORRECTION_REPOSITORY_BUNDLE_PUBLISH_EVIDENCE_TYPE) ?? null;
}

export function validatePublishedCorrectionBundleEvidence({ record, evidence, plan = null } = {}) {
  const external = uniqueSorted(record?.target_repositories ?? []).filter((repo) => repo !== SHELL_REPOSITORY);
  if (external.length === 0) return true;
  if (!evidence || evidence.type !== CORRECTION_REPOSITORY_BUNDLE_PUBLISH_EVIDENCE_TYPE || evidence.correction_id !== record.correction_id) {
    fail('CORRECTION_REPOSITORY_PUBLISH_EVIDENCE_MISSING');
  }
  const actual = uniqueSorted((evidence.repositories ?? []).map((entry) => entry?.repository));
  if (JSON.stringify(external) !== JSON.stringify(actual)) fail('CORRECTION_REPOSITORY_PUBLISH_SET_MISMATCH');
  for (const row of evidence.repositories ?? []) {
    if (row.status !== 'MERGED' || !SHA_PATTERN.test(String(row.candidate_commit ?? '')) || !SHA_PATTERN.test(String(row.merge_commit ?? '')) || !Number.isSafeInteger(Number(row.pr)) || Number(row.pr) <= 0) {
      fail(`CORRECTION_REPOSITORY_PUBLISH_EVIDENCE_INVALID:${row.repository}`);
    }
    if (plan) {
      const entry = plan.repositories.find((candidate) => candidate.repository === row.repository);
      if (!entry) fail(`CORRECTION_REPOSITORY_PUBLISH_REPO_UNKNOWN:${row.repository}`);
      git(entry.root, ['fetch', 'origin', DEFAULT_BRANCH, '--quiet']);
      if (git(entry.root, ['merge-base', '--is-ancestor', row.merge_commit, `origin/${DEFAULT_BRANCH}`], { allowFailure: true }).status !== 0) {
        fail(`CORRECTION_REPOSITORY_PUBLISH_NOT_ON_MAIN:${row.repository}`);
      }
    }
  }
  return true;
}
