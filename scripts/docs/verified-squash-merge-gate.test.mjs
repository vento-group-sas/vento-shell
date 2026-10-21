import assert from 'node:assert/strict';
import test from 'node:test';
import { findMergedPullRequest, verifySquashMerge } from './verified-squash-merge-gate.mjs';

const commit = 'a'.repeat(40);
const parent = 'b'.repeat(40);
const originalHead = 'c'.repeat(40);
const repository = 'vento-group-sas/vento-shell';
const pull = Object.freeze({
  number: 1021,
  state: 'closed',
  merged_at: '2026-10-21T20:00:19Z',
  merge_commit_sha: commit,
  base: { ref: 'main', repo: { full_name: repository } },
  head: { sha: originalHead, ref: 'infra/shared-package-distribution-baseline' },
});

test('la procedencia de un squash solo existe con PR merged y SHA exacto', () => {
  assert.equal(findMergedPullRequest([pull], { commit, repository }).number, 1021);
  assert.throws(() => findMergedPullRequest([], { commit, repository }),
    /UNVERIFIED_MERGED_PR_PROVENANCE/u);
  assert.throws(() => findMergedPullRequest([{ ...pull, merge_commit_sha: parent }],
    { commit, repository }), /UNVERIFIED_MERGED_PR_PROVENANCE/u);
  assert.throws(() => findMergedPullRequest([{ ...pull, merged_at: null }],
    { commit, repository }), /UNVERIFIED_MERGED_PR_PROVENANCE/u);
  assert.throws(() => findMergedPullRequest([{ ...pull, base: {
    ref: 'main', repo: { full_name: 'external/fork' },
  } }], { commit, repository }), /UNVERIFIED_MERGED_PR_PROVENANCE/u);
  assert.throws(() => findMergedPullRequest([pull, pull], { commit, repository }),
    /UNVERIFIED_MERGED_PR_PROVENANCE/u);
});

function fixture(pr = pull) {
  const calls = [];
  return {
    calls,
    fetchImpl: async (url, options) => {
      calls.push({ url, options });
      assert.equal(url, 'https://api.github.com/repos/' + repository
        + '/commits/' + commit + '/pulls');
      assert.equal(options.method, 'GET');
      assert.equal(options.redirect, 'error');
      assert.equal(options.headers.Authorization, 'Bearer synthetic-only');
      return { ok: true, status: 200, json: async () => [pr] };
    },
    runCommand: (command, args) => {
      calls.push({ command, args });
      if (command === 'git' && args[0] === 'rev-list') return commit + ' ' + parent;
      if (command === 'git' && args[0] === 'rev-parse') return originalHead;
      return '';
    },
  };
}

test('squash auténtico revalida el árbol de commits originales, sin omitir gate', async () => {
  const f = fixture();
  const result = await verifySquashMerge({
    commit, parent, repository, token: 'synthetic-only',
    fetchImpl: f.fetchImpl, runCommand: f.runCommand,
  });
  assert.equal(result.result, 'VERIFIED_PR_PROVENANCE_AND_ORIGINAL_COMMIT_SCOPE');
  assert.equal(result.pull_request, 1021);
  assert.deepEqual(f.calls.filter((x) => x.command === 'git').map((x) => x.args[0]),
    ['rev-list', 'fetch', 'rev-parse', 'merge-base']);
  const scope = f.calls.find((x) => x.command === 'npm');
  assert.deepEqual(scope.args, [
    'run', 'docs:commit-scope:check', '--', '--range', parent + '..' + originalHead,
  ]);
  assert(!JSON.stringify(result).includes('synthetic-only'));
});

test('reproduce las rutas físicas/corrección sin mezclar políticas', async () => {
  for (const [ref, expected] of [
    ['implementation/pkg-001', '--implementation-head-ref'],
    ['correction/fix-001', '--correction-head-ref'],
    ['correction-register/fix-002', '--correction-head-ref'],
  ]) {
    const f = fixture({ ...pull, head: { ...pull.head, ref } });
    await verifySquashMerge({
      commit, parent, repository, token: 'synthetic-only',
      fetchImpl: f.fetchImpl, runCommand: f.runCommand,
    });
    const scope = f.calls.find((x) => x.command === 'npm');
    assert.equal(scope.args.at(-2), expected);
    assert.equal(scope.args.at(-1), ref);
  }
});

test('push directo mezclado nunca se convierte en PR por texto del commit', async () => {
  const f = fixture({ ...pull, merge_commit_sha: parent });
  await assert.rejects(verifySquashMerge({
    commit, parent, repository, token: 'synthetic-only',
    fetchImpl: f.fetchImpl, runCommand: f.runCommand,
  }), /UNVERIFIED_MERGED_PR_PROVENANCE/u);
  assert(!f.calls.some((x) => x.command === 'npm'));
});

test('el validador falla cerrado con origen, padres y token incorrectos', async () => {
  const f = fixture();
  await assert.rejects(verifySquashMerge({
    commit: 'squash (#1021)', parent, repository, token: 'synthetic-only',
    fetchImpl: f.fetchImpl, runCommand: f.runCommand,
  }), /INVALID_COMMIT_IDENTITY/u);
  await assert.rejects(verifySquashMerge({
    commit, parent, repository, token: '',
    fetchImpl: f.fetchImpl, runCommand: f.runCommand,
  }), /MISSING_GITHUB_TOKEN/u);
  await assert.rejects(verifySquashMerge({
    commit, parent, repository, token: 'synthetic-only',
    fetchImpl: f.fetchImpl,
    runCommand: (command, args) => command === 'git' && args[0] === 'rev-list'
      ? commit + ' ' + originalHead : '',
  }), /NOT_AN_EXACT_SINGLE_PARENT_COMMIT/u);
  await assert.rejects(verifySquashMerge({
    commit, parent, repository, token: 'synthetic-only',
    fetchImpl: f.fetchImpl,
    runCommand: (command, args) => command === 'git' && args[0] === 'rev-list'
      ? commit + ' ' + parent
      : command === 'git' && args[0] === 'rev-parse' ? parent : '',
  }), /PR_HEAD_IDENTITY_MISMATCH/u);
});

test('cualquier respuesta GitHub incorrecta bloquea la excepción', async () => {
  const f = fixture();
  await assert.rejects(verifySquashMerge({
    commit, parent, repository, token: 'synthetic-only',
    runCommand: f.runCommand,
    fetchImpl: async () => ({ ok: false, status: 403 }),
  }), /GITHUB_PROVENANCE_HTTP_403/u);
  await assert.rejects(verifySquashMerge({
    commit, parent, repository, token: 'synthetic-only',
    runCommand: f.runCommand,
    fetchImpl: async () => { throw new Error('sensitive network detail'); },
  }), /GITHUB_PROVENANCE_LOOKUP_UNAVAILABLE/u);
});
