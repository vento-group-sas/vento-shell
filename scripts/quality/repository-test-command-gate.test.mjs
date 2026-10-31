import assert from 'node:assert/strict';
import test from 'node:test';

import {
  CANONICAL_REPOSITORIES,
  SHELL_REQUIRED_QUALITY_TEST_FILES,
  SHELL_REQUIRED_SUITE_GROUPS,
  buildCanonicalInvocation,
  certificationIsStale,
  evaluateRepositoryExecution,
  logicalIdentity,
  parseNodeTestSummaries,
  resolveScriptChain,
  sha256Identity,
  validateSelfContract,
  validateTestCommandContract,
} from './repository-test-command-gate.mjs';

const REPO = 'vento-group-sas/vento-nexo';
const COMMIT_A = 'aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa';
const COMMIT_B = 'bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb';

function manifest(testCommand = 'npm run test:ci007', aliasCommand = 'node --test scripts/quality/nexo-consumer-baseline-gate.test.mjs') {
  return {
    name: 'fixture-repository',
    private: true,
    scripts: {
      test: testCommand,
      'test:ci007': aliasCommand,
    },
  };
}

function shellManifest(testCommand = 'node scripts/quality/repository-test-command-gate.mjs run-shell') {
  return {
    name: 'vento-shell',
    private: true,
    scripts: {
      test: testCommand,
      'docs:plan:test': 'node --test scripts/docs/example.test.mjs',
    },
  };
}

function execution(overrides = {}) {
  return {
    repository: REPO,
    source_commit: COMMIT_A,
    required_suites: 1,
    executed_required_suites: 1,
    executed_required_tests: 12,
    failed_required_tests: 0,
    unresolved_required_skips: 0,
    todo_required_tests: 0,
    exit_code: 0,
    cancelled: false,
    timed_out: false,
    runner_error: false,
    ...overrides,
  };
}

function decide({ repository = REPO, commit = COMMIT_A, contractErrors = [], evidence = execution() } = {}) {
  return evaluateRepositoryExecution({
    expectedRepository: repository,
    expectedCommit: commit,
    contractErrors,
    execution: evidence,
  });
}

const positiveCases = [
  {
    id: 'P01',
    name: 'web repository delegates npm test to a specialized alias and passes',
    run() {
      const fixture = manifest();
      assert.deepEqual(validateTestCommandContract(fixture, REPO), []);
      assert.equal(resolveScriptChain(fixture).chain.length, 2);
      assert.equal(decide().result, 'PASS');
    },
  },
  {
    id: 'P02',
    name: 'another web repository can use a different internal alias with the same public interface',
    run() {
      const fixture = {
        scripts: {
          test: 'npm run test:ci008',
          'test:ci008': 'node --test scripts/quality/fogo-consumer-baseline-gate.test.mjs',
        },
      };
      assert.deepEqual(validateTestCommandContract(fixture, 'vento-group-sas/vento-fogo'), []);
    },
  },
  {
    id: 'P03',
    name: 'ANIMA uses a headless node test runner behind npm test',
    run() {
      const fixture = {
        scripts: {
          test: 'npm run test:ci013',
          'test:ci013': 'node --test scripts/quality/anima-consumer-baseline-gate.test.mjs',
        },
      };
      assert.deepEqual(validateTestCommandContract(fixture, 'vento-group-sas/vento-anima'), []);
    },
  },
  {
    id: 'P04',
    name: 'SHELL facade covers more than one required suite group',
    run() {
      assert.deepEqual(validateTestCommandContract(shellManifest(), 'vento-group-sas/vento-shell'), []);
      assert.ok(SHELL_REQUIRED_SUITE_GROUPS.length >= 2);
      assert.ok(SHELL_REQUIRED_QUALITY_TEST_FILES.length >= 2);
      assert.ok(SHELL_REQUIRED_QUALITY_TEST_FILES.includes(
        'scripts/quality/qa-kernel.test.mjs',
      ));
    },
  },
  {
    id: 'P05',
    name: 'internal runner can change without changing npm test public interface',
    run() {
      const first = manifest('npm run repository:tests', 'node --test old.test.mjs');
      first.scripts['repository:tests'] = 'node --test old.test.mjs';
      delete first.scripts['test:ci007'];
      const second = structuredClone(first);
      second.scripts['repository:tests'] = 'node --test new.test.mjs';
      assert.deepEqual(validateTestCommandContract(first, REPO), []);
      assert.deepEqual(validateTestCommandContract(second, REPO), []);
      assert.equal(first.scripts.test, second.scripts.test);
      assert.notEqual(logicalIdentity(resolveScriptChain(first).chain), logicalIdentity(resolveScriptChain(second).chain));
    },
  },
  {
    id: 'P06',
    name: 'conditional not applicable work does not create an unresolved required skip',
    run() {
      assert.equal(decide({ evidence: execution({ unresolved_required_skips: 0, conditional_not_applicable_suites: 1 }) }).result, 'PASS');
    },
  },
  {
    id: 'P07',
    name: 'same logical snapshot produces deterministic identities',
    run() {
      const value = { repository: REPO, commit: COMMIT_A, suites: ['a', 'b'] };
      assert.equal(logicalIdentity(value), logicalIdentity(structuredClone(value)));
      assert.match(logicalIdentity(value), /^sha256:[0-9a-f]{64}$/u);
    },
  },
  {
    id: 'P08',
    name: 'corrected failure creates a new execution without rewriting the previous identity',
    run() {
      const failed = { repository: REPO, source_commit: COMMIT_A, execution_identity: sha256Identity('attempt-1') };
      const passed = { repository: REPO, source_commit: COMMIT_A, execution_identity: sha256Identity('attempt-2') };
      assert.notEqual(failed.execution_identity, passed.execution_identity);
      assert.equal(failed.execution_identity, sha256Identity('attempt-1'));
    },
  },
  {
    id: 'P09',
    name: 'multiple node test summaries aggregate into one repository execution',
    run() {
      const summary = parseNodeTestSummaries('# tests 3\n# pass 3\n# fail 0\n\u2139 tests 5\n\u2139 pass 5\n\u2139 fail 0\n');
      assert.equal(summary.tests, 8);
      assert.equal(summary.pass, 8);
      assert.equal(summary.fail, 0);
      assert.equal(summary.summary_blocks, 2);
    },
  },
  {
    id: 'P10',
    name: 'canonical invocation exposes npm test without runner knowledge',
    run() {
      assert.deepEqual(buildCanonicalInvocation(), { command: 'npm', args: ['test', '--silent'] });
      assert.equal(buildCanonicalInvocation().args.some((entry) => entry.includes('ci007')), false);
    },
  },
];

const negativeCases = [
  {
    id: 'N01',
    name: 'manifest without scripts.test is blocked',
    run() { assert.ok(validateTestCommandContract({ scripts: {} }, REPO).includes('TEST_SCRIPT_MISSING_OR_EMPTY')); },
  },
  {
    id: 'N02',
    name: 'empty scripts.test is blocked',
    run() { assert.ok(validateTestCommandContract({ scripts: { test: '   ' } }, REPO).includes('TEST_SCRIPT_MISSING_OR_EMPTY')); },
  },
  {
    id: 'N03',
    name: 'missing delegated alias is blocked',
    run() { assert.ok(validateTestCommandContract({ scripts: { test: 'npm run test:missing' } }, REPO).some((entry) => entry.startsWith('SCRIPT_MISSING_OR_EMPTY:'))); },
  },
  {
    id: 'N04',
    name: 'recursive test delegation is blocked',
    run() { assert.ok(validateTestCommandContract({ scripts: { test: 'npm run test' } }, REPO).some((entry) => entry.startsWith('SCRIPT_RECURSION:'))); },
  },
  {
    id: 'N05',
    name: 'command that succeeds without a recognized test runner is blocked',
    run() { assert.ok(validateTestCommandContract({ scripts: { test: 'node -e "process.exit(0)"' } }, REPO).includes('RECOGNIZED_TEST_RUNNER_MISSING')); },
  },
  {
    id: 'N06',
    name: 'zero required tests is blocked',
    run() { assert.equal(decide({ evidence: execution({ executed_required_tests: 0 }) }).result, 'BLOCKED'); },
  },
  {
    id: 'N07',
    name: 'filter excluding every required test is blocked by zero execution',
    run() { assert.equal(decide({ evidence: execution({ executed_required_tests: 0, executed_required_suites: 0 }) }).reason, 'REQUIRED_SUITE_OMITTED'); },
  },
  {
    id: 'N08',
    name: 'reported test failure cannot pass with exit code zero',
    run() { assert.equal(decide({ evidence: execution({ failed_required_tests: 1, exit_code: 0 }) }).result, 'FAIL'); },
  },
  {
    id: 'N09',
    name: 'failure neutralization with logical true is blocked',
    run() { assert.ok(validateTestCommandContract({ scripts: { test: 'node --test x.test.mjs || true' } }, REPO).some((entry) => entry.startsWith('FAILURE_NEUTRALIZATION:'))); },
  },
  {
    id: 'N10',
    name: 'watch mode is blocked',
    run() { assert.ok(validateTestCommandContract({ scripts: { test: 'node --test --watch x.test.mjs' } }, REPO).some((entry) => entry.startsWith('WATCH_MODE_FORBIDDEN:'))); },
  },
  {
    id: 'N11',
    name: 'interactive test mode is blocked',
    run() { assert.ok(validateTestCommandContract({ scripts: { test: 'vitest --interactive' } }, REPO).some((entry) => entry.startsWith('INTERACTIVE_MODE_FORBIDDEN:'))); },
  },
  {
    id: 'N12',
    name: 'timeout is not PASS',
    run() { assert.equal(decide({ evidence: execution({ timed_out: true }) }).result, 'TIMED_OUT'); },
  },
  {
    id: 'N13',
    name: 'runner load error is FAIL',
    run() { assert.equal(decide({ evidence: execution({ runner_error: true, runner_error_reason: 'MODULE_NOT_FOUND' }) }).result, 'FAIL'); },
  },
  {
    id: 'N14',
    name: 'missing required fixture is FAIL',
    run() { assert.equal(decide({ evidence: execution({ runner_error: true, runner_error_reason: 'REQUIRED_FIXTURE_MISSING' }) }).reason, 'REQUIRED_FIXTURE_MISSING'); },
  },
  {
    id: 'N15',
    name: 'omitted required suite is blocked',
    run() { assert.equal(decide({ evidence: execution({ required_suites: 2, executed_required_suites: 1 }) }).reason, 'REQUIRED_SUITE_OMITTED'); },
  },
  {
    id: 'N16',
    name: 'unresolved required skip is blocked',
    run() { assert.equal(decide({ evidence: execution({ unresolved_required_skips: 1 }) }).reason, 'UNRESOLVED_REQUIRED_SKIP'); },
  },
  {
    id: 'N17',
    name: 'execution from another repository is blocked',
    run() { assert.equal(decide({ evidence: execution({ repository: 'vento-group-sas/vento-fogo' }) }).reason, 'REPOSITORY_IDENTITY_MISMATCH'); },
  },
  {
    id: 'N18',
    name: 'execution from another commit is stale',
    run() { assert.equal(decide({ evidence: execution({ source_commit: COMMIT_B }) }).result, 'STALE'); },
  },
  {
    id: 'N19',
    name: 'remote mutation in test command is blocked',
    run() { assert.ok(validateTestCommandContract({ scripts: { test: 'node --test x.test.mjs && git push' } }, REPO).some((entry) => entry.startsWith('REMOTE_MUTATION_FORBIDDEN:'))); },
  },
  {
    id: 'N20',
    name: 'secret literal embedded in test command is blocked',
    run() { assert.ok(validateTestCommandContract({ scripts: { test: 'API_KEY=realvalue node --test x.test.mjs' } }, REPO).some((entry) => entry.startsWith('SECRET_LITERAL_FORBIDDEN:'))); },
  },
];

const regressionCases = [
  {
    id: 'R01',
    name: 'transversal invocation never hardcodes test ci007',
    run() { assert.equal(JSON.stringify(buildCanonicalInvocation()).includes('ci007'), false); },
  },
  {
    id: 'R02',
    name: 'transversal invocation never hardcodes test ci013',
    run() { assert.equal(JSON.stringify(buildCanonicalInvocation()).includes('ci013'), false); },
  },
  {
    id: 'R03',
    name: 'green build cannot substitute for tests',
    run() { assert.ok(validateTestCommandContract({ scripts: { test: 'npm run build', build: 'next build' } }, REPO).includes('RECOGNIZED_TEST_RUNNER_MISSING')); },
  },
  {
    id: 'R04',
    name: 'green lint cannot substitute for tests',
    run() { assert.ok(validateTestCommandContract({ scripts: { test: 'npm run lint', lint: 'eslint .' } }, REPO).includes('RECOGNIZED_TEST_RUNNER_MISSING')); },
  },
  {
    id: 'R05',
    name: 'npm test with zero tests remains blocked',
    run() { assert.equal(decide({ evidence: execution({ executed_required_tests: 0 }) }).result, 'BLOCKED'); },
  },
  {
    id: 'R06',
    name: 'script presence without execution evidence remains blocked',
    run() { assert.equal(decide({ evidence: null }).reason, 'EXECUTION_EVIDENCE_MISSING'); },
  },
  {
    id: 'R07',
    name: 'runner migration cannot silently lose a required suite',
    run() { assert.equal(decide({ evidence: execution({ required_suites: 3, executed_required_suites: 2 }) }).result, 'BLOCKED'); },
  },
  {
    id: 'R08',
    name: 'watch mode cannot return to the canonical CI path',
    run() { assert.ok(validateTestCommandContract({ scripts: { test: 'node --test --watch x.test.mjs' } }, REPO).some((entry) => entry.includes('WATCH_MODE_FORBIDDEN'))); },
  },
  {
    id: 'R09',
    name: 'prompt cannot be added to the canonical CI path',
    run() { assert.ok(validateTestCommandContract({ scripts: { test: 'vitest --interactive' } }, REPO).some((entry) => entry.includes('INTERACTIVE_MODE_FORBIDDEN'))); },
  },
  {
    id: 'R10',
    name: 'failure count cannot be normalized to exit zero',
    run() { assert.equal(decide({ evidence: execution({ failed_required_tests: 2, exit_code: 0 }) }).result, 'FAIL'); },
  },
  {
    id: 'R11',
    name: 'evidence from a prior commit becomes stale',
    run() {
      const prior = {
        repository: REPO,
        source_commit: COMMIT_A,
        manifest_identity: sha256Identity('manifest'),
        lockfile_identity: sha256Identity('lock'),
        runtime_identity: sha256Identity('runtime'),
        test_command_identity: sha256Identity('test'),
        runner_identity: sha256Identity('runner'),
        required_suite_set_identity: sha256Identity('suite'),
        test_configuration_identity: sha256Identity('config'),
        fixture_set_identity: sha256Identity('fixture'),
        environment_identity: 'CI_LOCAL_ISOLATED',
      };
      const current = { ...prior, source_commit: COMMIT_B };
      assert.equal(certificationIsStale(prior, current), true);
    },
  },
  {
    id: 'R12',
    name: 'Expo Web cannot certify native ANIMA tests',
    run() { assert.ok(validateTestCommandContract({ scripts: { test: 'expo start --web' } }, 'vento-group-sas/vento-anima').some((entry) => entry.includes('ANIMA_WEB_SURROGATE_FORBIDDEN'))); },
  },
  {
    id: 'R13',
    name: 'Supabase mutation cannot be hidden behind npm test',
    run() { assert.ok(validateTestCommandContract({ scripts: { test: 'node --test x.test.mjs && supabase db push' } }, REPO).some((entry) => entry.includes('REMOTE_MUTATION_FORBIDDEN'))); },
  },
  {
    id: 'R14',
    name: 'SHELL npm test cannot collapse to CI016 self certification only',
    run() {
      const collapsed = shellManifest('node --test scripts/quality/repository-test-command-gate.test.mjs');
      assert.ok(validateTestCommandContract(collapsed, 'vento-group-sas/vento-shell').includes('SHELL_REQUIRED_SUITE_FACADE_MISMATCH'));
      assert.ok(SHELL_REQUIRED_SUITE_GROUPS.length >= 2);
    },
  },
  {
    id: 'R15',
    name: 'absolute workstation paths cannot enter the public facade',
    run() { assert.ok(validateTestCommandContract({ scripts: { test: 'node --test C:\\Users\\User\\tests\\x.test.mjs' } }, REPO).some((entry) => entry.includes('ABSOLUTE_LOCAL_PATH_FORBIDDEN'))); },
  },
];

assert.equal(positiveCases.length, 10);
assert.equal(negativeCases.length, 20);
assert.equal(regressionCases.length, 15);
assert.equal(positiveCases.length + negativeCases.length + regressionCases.length, 45);
assert.equal(CANONICAL_REPOSITORIES.length, 8);
assert.deepEqual(validateSelfContract(), []);

for (const scenario of positiveCases) {
  test(`${scenario.id} ${scenario.name}`, scenario.run);
}
for (const scenario of negativeCases) {
  test(`${scenario.id} ${scenario.name}`, scenario.run);
}
for (const scenario of regressionCases) {
  test(`${scenario.id} ${scenario.name}`, scenario.run);
}