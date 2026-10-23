import { spawnSync } from 'node:child_process';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const SHA = /^[0-9a-f]{40}$/u;
const REPOSITORY = /^[A-Za-z0-9_.-]+\/[A-Za-z0-9_.-]+$/u;
const API_ROOT = 'https://api.github.com';

function fail(reason) {
  throw new Error('VENTO_SQUASH_PROVENANCE:' + reason);
}

function assertInputs({ commit, parent, repository, token }) {
  if (!SHA.test(String(commit)) || !SHA.test(String(parent)) || commit === parent) {
    fail('INVALID_COMMIT_IDENTITY');
  }
  if (!REPOSITORY.test(String(repository))) fail('INVALID_REPOSITORY');
  if (!token || typeof token !== 'string') fail('MISSING_GITHUB_TOKEN');
}

export function findMergedPullRequest(rows, { commit, repository }) {
  if (!Array.isArray(rows) || rows.length > 100) fail('INVALID_ASSOCIATED_PR_RESPONSE');
  const candidates = rows.filter((pr) => (
    Number.isSafeInteger(pr?.number) && pr.number > 0
    && pr?.state === 'closed'
    && typeof pr.merged_at === 'string' && Number.isFinite(Date.parse(pr.merged_at))
    && pr.merge_commit_sha === commit
    && pr.base?.ref === 'main'
    && pr.base?.repo?.full_name === repository
    && SHA.test(String(pr.head?.sha ?? ''))
    && typeof pr.head?.ref === 'string' && pr.head.ref.length > 0
  ));
  if (candidates.length !== 1) fail('UNVERIFIED_MERGED_PR_PROVENANCE');
  return candidates[0];
}

function execute(command, args) {
  const executable = command === 'npm' && process.platform === 'win32' ? 'npm.cmd' : command;
  const result = spawnSync(executable, args, {
    cwd: process.cwd(),
    encoding: 'utf8',
    windowsHide: true,
    timeout: 180_000,
    maxBuffer: 8 * 1024 * 1024,
  });
  if (result.error || result.status !== 0) {
    // The command may contain environment URLs or credentials in its diagnostic.
    // Only report a stable code; never disclose stdout, stderr, or tokens.
    fail('VERIFICATION_COMMAND_FAILED:' + command + ':' + args[0]);
  }
  return String(result.stdout ?? '').trim();
}

export async function verifySquashMerge({
  commit,
  parent,
  repository,
  token,
  fetchImpl = fetch,
  runCommand = execute,
} = {}) {
  assertInputs({ commit, parent, repository, token });
  if (typeof fetchImpl !== 'function' || typeof runCommand !== 'function') {
    fail('INVALID_VERIFICATION_DEPENDENCY');
  }

  const parentLine = runCommand('git', ['rev-list', '--parents', '-n', '1', commit]);
  const ancestry = String(parentLine).trim().split(/\s+/u);
  if (ancestry.length !== 2 || ancestry[0] !== commit || ancestry[1] !== parent) {
    fail('NOT_AN_EXACT_SINGLE_PARENT_COMMIT');
  }

  const url = new URL('/repos/' + repository + '/commits/' + commit + '/pulls', API_ROOT);
  let response;
  try {
    response = await fetchImpl(url.href, {
      method: 'GET',
      redirect: 'error',
      headers: {
        Accept: 'application/vnd.github+json',
        Authorization: 'Bearer ' + token,
        'X-GitHub-Api-Version': '2022-11-28',
      },
      signal: AbortSignal.timeout(15_000),
    });
  } catch {
    fail('GITHUB_PROVENANCE_LOOKUP_UNAVAILABLE');
  }
  if (!response?.ok) fail('GITHUB_PROVENANCE_HTTP_' + String(response?.status ?? 'UNKNOWN'));

  let rows;
  try {
    rows = await response.json();
  } catch {
    fail('GITHUB_PROVENANCE_RESPONSE_NOT_JSON');
  }
  const pr = findMergedPullRequest(rows, { commit, repository });

  // Reconstruct the exact original PR commits on the isolated CI checkout.
  // A message containing "#123" never counts as proof of a GitHub merge.
  runCommand('git', ['fetch', '--no-tags', 'origin', 'refs/pull/' + pr.number + '/head']);
  const fetchedHead = runCommand('git', ['rev-parse', 'FETCH_HEAD']);
  if (String(fetchedHead).trim() !== pr.head.sha) fail('PR_HEAD_IDENTITY_MISMATCH');
  runCommand('git', ['merge-base', '--is-ancestor', parent, fetchedHead]);

  const scopeArgs = [
    'run', 'docs:commit-scope:check', '--', '--range', parent + '..' + fetchedHead,
  ];
  if (pr.head.ref.startsWith('implementation/')) {
    scopeArgs.push('--implementation-head-ref', pr.head.ref);
  } else if (pr.head.ref.startsWith('correction/')
    || pr.head.ref.startsWith('correction-register/')) {
    scopeArgs.push('--correction-head-ref', pr.head.ref);
  }
  // This is the existing fail-closed per-commit scope validator, not a bypass.
  runCommand('npm', scopeArgs);
  return {
    commit,
    pull_request: pr.number,
    original_head: fetchedHead,
    result: 'VERIFIED_PR_PROVENANCE_AND_ORIGINAL_COMMIT_SCOPE',
  };
}

async function main() {
  const [commit, parent, unexpected] = process.argv.slice(2);
  if (unexpected) fail('UNEXPECTED_CLI_ARGUMENT');
  const outcome = await verifySquashMerge({
    commit, parent, repository: process.env.GITHUB_REPOSITORY,
    token: process.env.GITHUB_TOKEN,
  });
  console.log(JSON.stringify(outcome));
}

if (process.argv[1]
  && path.resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  main().catch((error) => {
    console.error(error instanceof Error ? error.message : 'VENTO_SQUASH_PROVENANCE:UNKNOWN');
    process.exitCode = 1;
  });
}
