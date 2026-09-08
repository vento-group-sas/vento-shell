import { createHash } from 'node:crypto';
import { spawnSync } from 'node:child_process';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import {
  asSha256Identity as qualityAsSha256Identity,
  logicalIdentity as qualityLogicalIdentity,
  writePrettyJson as qualityWritePrettyJson,
} from './quality-primitives.mjs';

export const TEST_COMMAND_GATE_INSTANCE_ID = 'SHELL-CI-016::GLOBAL';
export const TEST_COMMAND_GATE_SCHEMA_VERSION = 1;
export const RUNTIME_EVIDENCE_RELATIVE_PATH = '.delivery/repository-tests/SHELL-CI-016__GLOBAL.json';

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

export const SHELL_REQUIRED_QUALITY_TEST_FILES = Object.freeze([
  'scripts/quality/shared-package-test-gate.test.mjs',
  'scripts/quality/shared-package-build-gate.test.mjs',
  'scripts/quality/shared-package-release-gate.test.mjs',
  'scripts/quality/shared-package-changelog-gate.test.mjs',
  'scripts/quality/shared-package-compatibility-gate.test.mjs',
  'scripts/quality/shared-package-consumer-update-gate.test.mjs',
  'scripts/quality/repository-rollback-gate.test.mjs',
  'scripts/quality/deployment-independence-gate.test.mjs',
  'scripts/quality/quality-primitives.test.mjs',
  'scripts/quality/repository-test-command-gate.test.mjs',
]);

export const SHELL_REQUIRED_SUITE_GROUPS = Object.freeze([
  'docs:plan:test',
  'quality-gates',
]);

export const RESULT_STATES = Object.freeze([
  'PENDING',
  'RUNNING',
  'PASS',
  'FAIL',
  'BLOCKED',
  'CANCELLED',
  'TIMED_OUT',
  'STALE',
]);

const REMOTE_MUTATION_PATTERNS = Object.freeze([
  /\bgit\s+push\b/iu,
  /\bgh\s+pr\s+(?:merge|create)\b/iu,
  /\bnpm\s+(?:publish|unpublish)\b/iu,
  /\bvercel\s+(?:deploy|--prod)\b/iu,
  /\beas\s+(?:submit|update)\b/iu,
  /\bexpo\s+publish\b/iu,
  /\bsupabase\s+(?:db\s+(?:push|reset)|migration|functions\s+deploy|secrets\s+set)\b/iu,
]);

const SECRET_LITERAL_PATTERN = /\b(?:API[_-]?KEY|TOKEN|SECRET|PASSWORD|PRIVATE[_-]?KEY)\s*=\s*[^\s"']+/iu;
const ABSOLUTE_WINDOWS_PATH_PATTERN = /(?:^|[\s"'])?[A-Za-z]:\\(?:Users|home|workspace|dev)\\/u;
const ABSOLUTE_UNIX_PATH_PATTERN = /(?:^|[\s"'])\/(?:Users|home|workspace|mnt)\//u;
const TEST_SUMMARY_PATTERN = /^(?:#|\u2139)\s*(tests|pass|fail|cancelled|skipped|todo)\s+(\d+)\s*$/gmu;
const COMMIT_PATTERN = /^[0-9a-f]{40}$/u;



export function sha256Identity(value) {
  return qualityAsSha256Identity(String(value));
}



export function logicalIdentity(value) {
  return qualityLogicalIdentity(value);
}

function normalizeCommand(command) {
  return String(command ?? '').replace(/\s+/gu, ' ').trim();
}

function npmExecutable() {
  return process.platform === 'win32' ? 'npm.cmd' : 'npm';
}

function spawnPortable(command, args, options = {}) {
  if (process.platform === 'win32' && command.toLowerCase().endsWith('.cmd')) {
    return spawnSync(
      process.env.ComSpec || 'cmd.exe',
      ['/d', '/s', '/c', command, ...args],
      options,
    );
  }
  return spawnSync(command, args, options);
}

function parseNpmDelegation(command) {
  const normalized = normalizeCommand(command);
  const match = normalized.match(/^npm\s+run(?:-script)?\s+(?:--silent\s+)?([A-Za-z0-9:_-]+)(?:\s+--\s+.*)?$/u);
  return match?.[1] ?? null;
}

function recognizedRunner(command, repository) {
  const normalized = normalizeCommand(command);
  if (/\bnode\s+--test\b/u.test(normalized)) return true;
  if (/\b(?:vitest|jest|playwright)\b/iu.test(normalized)) return true;
  if (
    repository === 'vento-group-sas/vento-shell'
    && normalized === 'node scripts/quality/repository-test-command-gate.mjs run-shell'
  ) return true;
  return false;
}

export function resolveScriptChain(manifest, scriptName = 'test') {
  const scripts = manifest?.scripts;
  if (!scripts || typeof scripts !== 'object' || Array.isArray(scripts)) {
    return { chain: [], error: 'SCRIPTS_OBJECT_MISSING' };
  }

  const chain = [];
  const visited = new Set();
  let current = scriptName;

  for (let depth = 0; depth < 16; depth += 1) {
    if (visited.has(current)) {
      return { chain, error: `SCRIPT_RECURSION:${current}` };
    }
    visited.add(current);

    const command = normalizeCommand(scripts[current]);
    if (!command) {
      return { chain, error: `SCRIPT_MISSING_OR_EMPTY:${current}` };
    }

    chain.push(Object.freeze({ name: current, command }));
    const delegated = parseNpmDelegation(command);
    if (!delegated) return { chain, error: null };
    current = delegated;
  }

  return { chain, error: 'SCRIPT_CHAIN_TOO_DEEP' };
}

export function validateTestCommandContract(manifest, repository = 'vento-group-sas/unknown') {
  const errors = [];
  const scripts = manifest?.scripts;
  if (!scripts || typeof scripts !== 'object' || Array.isArray(scripts)) {
    return ['SCRIPTS_OBJECT_MISSING'];
  }

  const testCommand = normalizeCommand(scripts.test);
  if (!testCommand) return ['TEST_SCRIPT_MISSING_OR_EMPTY'];

  const resolution = resolveScriptChain(manifest, 'test');
  if (resolution.error) errors.push(resolution.error);

  for (const entry of resolution.chain) {
    const command = entry.command;

    if (/\|\|\s*true\b/iu.test(command) || /(?:^|[;&])\s*exit\s+0\b/iu.test(command)) {
      errors.push(`FAILURE_NEUTRALIZATION:${entry.name}`);
    }
    if (/--watch(?:\b|=)/iu.test(command) || /\bwatchAll\b/iu.test(command)) {
      errors.push(`WATCH_MODE_FORBIDDEN:${entry.name}`);
    }
    if (/--interactive\b/iu.test(command) || /\bprompt\b/iu.test(command)) {
      errors.push(`INTERACTIVE_MODE_FORBIDDEN:${entry.name}`);
    }
    if (ABSOLUTE_WINDOWS_PATH_PATTERN.test(command) || ABSOLUTE_UNIX_PATH_PATTERN.test(command)) {
      errors.push(`ABSOLUTE_LOCAL_PATH_FORBIDDEN:${entry.name}`);
    }
    if (SECRET_LITERAL_PATTERN.test(command)) {
      errors.push(`SECRET_LITERAL_FORBIDDEN:${entry.name}`);
    }
    for (const pattern of REMOTE_MUTATION_PATTERNS) {
      if (pattern.test(command)) errors.push(`REMOTE_MUTATION_FORBIDDEN:${entry.name}`);
    }
    if (repository === 'vento-group-sas/vento-anima' && /\bexpo\s+start\s+--web\b/iu.test(command)) {
      errors.push(`ANIMA_WEB_SURROGATE_FORBIDDEN:${entry.name}`);
    }
  }

  const terminalCommand = resolution.chain.at(-1)?.command ?? '';
  if (!resolution.error && !recognizedRunner(terminalCommand, repository)) {
    errors.push('RECOGNIZED_TEST_RUNNER_MISSING');
  }

  if (
    repository === 'vento-group-sas/vento-shell'
    && testCommand !== 'node scripts/quality/repository-test-command-gate.mjs run-shell'
  ) {
    errors.push('SHELL_REQUIRED_SUITE_FACADE_MISMATCH');
  }

  return [...new Set(errors)].sort((left, right) => left.localeCompare(right, 'en'));
}

export function parseNodeTestSummaries(output) {
  const counters = {
    tests: 0,
    pass: 0,
    fail: 0,
    cancelled: 0,
    skipped: 0,
    todo: 0,
    summary_blocks: 0,
  };

  const source = String(output ?? '').replace(/\r\n?/gu, '\n');
  let match;
  while ((match = TEST_SUMMARY_PATTERN.exec(source)) !== null) {
    const key = match[1];
    counters[key] += Number.parseInt(match[2], 10);
    if (key === 'tests') counters.summary_blocks += 1;
  }
  TEST_SUMMARY_PATTERN.lastIndex = 0;
  return counters;
}

export function buildCanonicalInvocation() {
  return Object.freeze({ command: 'npm', args: Object.freeze(['test', '--silent']) });
}

export function evaluateRepositoryExecution({
  expectedRepository,
  expectedCommit,
  contractErrors = [],
  execution,
}) {
  if (contractErrors.length > 0) {
    return { result: 'BLOCKED', reason: contractErrors.join('|') };
  }
  if (!execution || typeof execution !== 'object') {
    return { result: 'BLOCKED', reason: 'EXECUTION_EVIDENCE_MISSING' };
  }
  if (execution.repository !== expectedRepository) {
    return { result: 'BLOCKED', reason: 'REPOSITORY_IDENTITY_MISMATCH' };
  }
  if (execution.source_commit !== expectedCommit) {
    return { result: 'STALE', reason: 'SOURCE_COMMIT_MISMATCH' };
  }
  if (execution.cancelled === true) {
    return { result: 'CANCELLED', reason: 'EXECUTION_CANCELLED' };
  }
  if (execution.timed_out === true) {
    return { result: 'TIMED_OUT', reason: 'EXECUTION_TIMED_OUT' };
  }
  if (execution.runner_error === true) {
    return { result: 'FAIL', reason: execution.runner_error_reason || 'RUNNER_ERROR' };
  }
  if (execution.exit_code !== 0) {
    return { result: 'FAIL', reason: `NONZERO_EXIT_CODE:${execution.exit_code}` };
  }
  if (!Number.isInteger(execution.required_suites) || execution.required_suites <= 0) {
    return { result: 'BLOCKED', reason: 'REQUIRED_SUITE_SET_EMPTY' };
  }
  if (execution.executed_required_suites !== execution.required_suites) {
    return { result: 'BLOCKED', reason: 'REQUIRED_SUITE_OMITTED' };
  }
  if (!Number.isInteger(execution.executed_required_tests) || execution.executed_required_tests <= 0) {
    return { result: 'BLOCKED', reason: 'ZERO_REQUIRED_TESTS' };
  }
  if ((execution.failed_required_tests ?? 0) > 0) {
    return { result: 'FAIL', reason: 'REQUIRED_TEST_FAILURE' };
  }
  if ((execution.unresolved_required_skips ?? 0) > 0) {
    return { result: 'BLOCKED', reason: 'UNRESOLVED_REQUIRED_SKIP' };
  }
  if ((execution.todo_required_tests ?? 0) > 0) {
    return { result: 'BLOCKED', reason: 'UNRESOLVED_REQUIRED_TODO' };
  }
  return { result: 'PASS', reason: null };
}

export function certificationIsStale(previous, current) {
  const materialFields = [
    'repository',
    'source_commit',
    'manifest_identity',
    'lockfile_identity',
    'runtime_identity',
    'test_command_identity',
    'runner_identity',
    'required_suite_set_identity',
    'test_configuration_identity',
    'fixture_set_identity',
    'environment_identity',
  ];
  return materialFields.some((field) => previous?.[field] !== current?.[field]);
}

function readJson(filePath) {
  return JSON.parse(fs.readFileSync(filePath, 'utf8'));
}

function fileIdentity(filePath) {
  const source = fs.readFileSync(filePath);
  return `sha256:${createHash('sha256').update(source).digest('hex')}`;
}

function repositoryName(repository) {
  return repository.slice(repository.indexOf('/') + 1);
}

function execute(command, args, options = {}) {
  const startedAt = new Date().toISOString();
  const started = Date.now();
  const child = spawnPortable(command, args, {
    cwd: options.cwd,
    encoding: 'utf8',
    windowsHide: true,
    timeout: options.timeout ?? 600_000,
    maxBuffer: options.maxBuffer ?? 64 * 1024 * 1024,
    env: {
      ...process.env,
      CI: '1',
      FORCE_COLOR: '0',
      NO_COLOR: '1',
    },
    stdio: options.stdio ?? 'pipe',
  });
  const completedAt = new Date().toISOString();
  return {
    status: child.status,
    signal: child.signal,
    error: child.error ?? null,
    stdout: child.stdout ?? '',
    stderr: child.stderr ?? '',
    startedAt,
    completedAt,
    durationMs: Date.now() - started,
  };
}

function gitCommit(repositoryRoot) {
  const result = execute('git', ['rev-parse', 'HEAD'], { cwd: repositoryRoot, timeout: 30_000 });
  const commit = String(result.stdout ?? '').trim().toLowerCase();
  if (result.status !== 0 || !COMMIT_PATTERN.test(commit)) {
    throw new Error('GIT_COMMIT_UNRESOLVABLE');
  }
  return commit;
}

function runnerAndSuiteIdentities(manifest, repository) {
  const resolution = resolveScriptChain(manifest, 'test');
  const chain = resolution.chain.map((entry) => `${entry.name}=${entry.command}`);
  const suiteDescriptor = repository === 'vento-group-sas/vento-shell'
    ? [...SHELL_REQUIRED_SUITE_GROUPS, ...SHELL_REQUIRED_QUALITY_TEST_FILES]
    : chain;
  return {
    runner_identity: logicalIdentity(chain),
    required_suite_set_identity: logicalIdentity(suiteDescriptor),
  };
}

function repositoryExecutionRecord({ repository, repositoryRoot, sourceCommit }) {
  const invocation = buildCanonicalInvocation();
  const result = execute(npmExecutable(), [...invocation.args], {
    cwd: repositoryRoot,
    timeout: 900_000,
  });
  const output = `${result.stdout}\n${result.stderr}`;
  const summary = parseNodeTestSummaries(output);
  const requiredSuites = repository === 'vento-group-sas/vento-shell'
    ? SHELL_REQUIRED_SUITE_GROUPS.length
    : 1;

  const execution = {
    repository,
    source_commit: sourceCommit,
    required_suites: requiredSuites,
    executed_required_suites: summary.summary_blocks > 0
      ? Math.min(requiredSuites, summary.summary_blocks)
      : 0,
    executed_required_tests: summary.tests,
    failed_required_tests: summary.fail,
    unresolved_required_skips: summary.skipped,
    todo_required_tests: summary.todo,
    exit_code: result.status ?? 1,
    cancelled: result.signal === 'SIGINT' || result.signal === 'SIGTERM',
    timed_out: result.error?.code === 'ETIMEDOUT',
    runner_error: Boolean(result.error && result.error.code !== 'ETIMEDOUT'),
    runner_error_reason: result.error?.code ?? null,
  };

  return {
    execution,
    summary,
    started_at: result.startedAt,
    completed_at: result.completedAt,
    duration_ms: result.durationMs,
    output_identity: sha256Identity(output),
  };
}

export function certifyRepository({ repository, repositoryRoot }) {
  const manifestPath = path.join(repositoryRoot, 'package.json');
  const lockfilePath = path.join(repositoryRoot, 'package-lock.json');
  const baseRecord = {
    repository,
    repository_root_name: path.basename(repositoryRoot),
    result: 'BLOCKED',
    invalidation_reason: null,
  };

  if (!fs.existsSync(manifestPath)) {
    return { ...baseRecord, invalidation_reason: 'MANIFEST_MISSING' };
  }
  if (!fs.existsSync(lockfilePath)) {
    return { ...baseRecord, invalidation_reason: 'LOCKFILE_MISSING' };
  }

  let sourceCommit;
  try {
    sourceCommit = gitCommit(repositoryRoot);
  } catch (error) {
    return { ...baseRecord, invalidation_reason: error.message };
  }

  const manifest = readJson(manifestPath);
  const contractErrors = validateTestCommandContract(manifest, repository);
  const identities = runnerAndSuiteIdentities(manifest, repository);
  const executionRecord = repositoryExecutionRecord({
    repository,
    repositoryRoot,
    sourceCommit,
  });
  const decision = evaluateRepositoryExecution({
    expectedRepository: repository,
    expectedCommit: sourceCommit,
    contractErrors,
    execution: executionRecord.execution,
  });

  return {
    repository,
    source_commit: sourceCommit,
    manifest_identity: fileIdentity(manifestPath),
    lockfile_identity: fileIdentity(lockfilePath),
    runtime_identity: logicalIdentity({ node: process.version, npm: process.env.npm_config_user_agent ?? 'npm' }),
    test_command: normalizeCommand(manifest.scripts?.test),
    test_command_identity: sha256Identity(normalizeCommand(manifest.scripts?.test)),
    ...identities,
    test_configuration_identity: logicalIdentity({ scripts: manifest.scripts }),
    fixture_set_identity: logicalIdentity({ repository, sourceCommit, contract: TEST_COMMAND_GATE_INSTANCE_ID }),
    environment_identity: 'CI_LOCAL_ISOLATED',
    execution_identity: logicalIdentity({
      repository,
      sourceCommit,
      manifest: fileIdentity(manifestPath),
      lockfile: fileIdentity(lockfilePath),
      startedAt: executionRecord.started_at,
    }),
    started_at: executionRecord.started_at,
    completed_at: executionRecord.completed_at,
    duration_ms: executionRecord.duration_ms,
    exit_code: executionRecord.execution.exit_code,
    executed_required_suites: executionRecord.execution.executed_required_suites,
    executed_required_tests: executionRecord.execution.executed_required_tests,
    failed_required_tests: executionRecord.execution.failed_required_tests,
    unresolved_required_skips: executionRecord.execution.unresolved_required_skips,
    todo_required_tests: executionRecord.execution.todo_required_tests,
    output_identity: executionRecord.output_identity,
    result: decision.result,
    invalidation_reason: decision.reason,
    contract_errors: contractErrors,
  };
}

export function certifyCanonicalRepositories({ shellRoot } = {}) {
  const resolvedShellRoot = shellRoot ?? path.resolve(
    path.dirname(fileURLToPath(import.meta.url)),
    '..',
    '..',
  );
  const workspaceRoot = path.dirname(resolvedShellRoot);
  const records = CANONICAL_REPOSITORIES.map((repository) => {
    const repositoryRoot = repository === 'vento-group-sas/vento-shell'
      ? resolvedShellRoot
      : path.join(workspaceRoot, repositoryName(repository));
    if (!fs.existsSync(repositoryRoot)) {
      return {
        repository,
        repository_root_name: path.basename(repositoryRoot),
        result: 'BLOCKED',
        invalidation_reason: 'REPOSITORY_CHECKOUT_MISSING',
      };
    }
    return certifyRepository({ repository, repositoryRoot });
  });

  const passed = records.filter((record) => record.result === 'PASS').length;
  const result = passed === CANONICAL_REPOSITORIES.length ? 'PASS' : 'BLOCKED';
  return {
    instance_id: TEST_COMMAND_GATE_INSTANCE_ID,
    schema_version: TEST_COMMAND_GATE_SCHEMA_VERSION,
    generated_at: new Date().toISOString(),
    repository_count: CANONICAL_REPOSITORIES.length,
    passed_repository_count: passed,
    failed_repository_count: CANONICAL_REPOSITORIES.length - passed,
    result,
    repositories: records,
  };
}

function writeEvidence(shellRoot, evidence) {
  const evidencePath = path.join(shellRoot, RUNTIME_EVIDENCE_RELATIVE_PATH);
  return qualityWritePrettyJson(evidencePath, evidence);
}

export function validateSelfContract() {
  const errors = [];
  if (CANONICAL_REPOSITORIES.length !== 8) errors.push('CANONICAL_REPOSITORY_COUNT_MUST_BE_8');
  if (SHELL_REQUIRED_SUITE_GROUPS.length < 2) errors.push('SHELL_MUST_HAVE_MULTIPLE_REQUIRED_SUITE_GROUPS');
  if (SHELL_REQUIRED_QUALITY_TEST_FILES.length < 2) errors.push('SHELL_QUALITY_SUITE_TOO_SMALL');
  if (!RESULT_STATES.includes('PASS') || !RESULT_STATES.includes('STALE')) errors.push('RESULT_STATE_SET_INCOMPLETE');
  return errors;
}

export function runShellRepositoryTests({ shellRoot } = {}) {
  const root = shellRoot ?? path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..', '..');
  const selfErrors = validateSelfContract();
  if (selfErrors.length > 0) {
    console.error(selfErrors.join('\n'));
    return 1;
  }

  const docs = spawnPortable(npmExecutable(), ['run', 'docs:plan:test'], {
    cwd: root,
    stdio: 'inherit',
    windowsHide: true,
    env: { ...process.env, CI: '1', FORCE_COLOR: '0', NO_COLOR: '1' },
  });
  if ((docs.status ?? 1) !== 0) return docs.status ?? 1;

  const quality = spawnSync(process.execPath, ['--test', ...SHELL_REQUIRED_QUALITY_TEST_FILES], {
    cwd: root,
    stdio: 'inherit',
    windowsHide: true,
    env: { ...process.env, CI: '1', FORCE_COLOR: '0', NO_COLOR: '1' },
  });
  return quality.status ?? 1;
}

function printUsage() {
  console.log(`Usage:\n  node scripts/quality/repository-test-command-gate.mjs run-shell\n  node scripts/quality/repository-test-command-gate.mjs certify [--json] [--write-evidence]`);
}

function runCli(argv) {
  const [command, ...flags] = argv;
  if (!command || command === '--help' || command === '-h') {
    printUsage();
    return 0;
  }

  if (command === 'run-shell') {
    if (flags.length > 0) {
      console.error(`Unknown arguments for run-shell: ${flags.join(' ')}`);
      return 2;
    }
    return runShellRepositoryTests();
  }

  if (command === 'certify') {
    const allowed = new Set(['--json', '--write-evidence']);
    const unknown = flags.filter((flag) => !allowed.has(flag));
    if (unknown.length > 0) {
      console.error(`Unknown arguments for certify: ${unknown.join(' ')}`);
      return 2;
    }

    const shellRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..', '..');
    const evidence = certifyCanonicalRepositories({ shellRoot });
    let evidencePath = null;
    if (flags.includes('--write-evidence')) evidencePath = writeEvidence(shellRoot, evidence);

    if (flags.includes('--json')) {
      console.log(JSON.stringify({ ...evidence, evidence_path: evidencePath }, null, 2));
    } else {
      for (const record of evidence.repositories) {
        console.log(`${record.repository}: ${record.result}${record.invalidation_reason ? ` (${record.invalidation_reason})` : ''}`);
      }
      console.log(`CI016_REPOSITORY_TEST_CERTIFICATION=${evidence.result}`);
      if (evidencePath) console.log(`EVIDENCE_PATH=${evidencePath}`);
    }
    return evidence.result === 'PASS' ? 0 : 1;
  }

  console.error(`Unknown command: ${command}`);
  printUsage();
  return 2;
}

const isDirectRun = process.argv[1]
  && path.resolve(process.argv[1]) === path.resolve(fileURLToPath(import.meta.url));
if (isDirectRun) {
  process.exitCode = runCli(process.argv.slice(2));
}
