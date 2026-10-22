import assert from 'node:assert/strict';
import test from 'node:test';

import {
  classifyCompilerErrors, compareFrozenDependencyTrees, evaluateProbe, runtimeProgram,
} from './vento-contracts-viso-consumer-probe.mjs';

const STEPS = ['npm-ci', 'npm-install-tarball', 'runtime-first', 'runtime-repeat',
  'viso-baseline', 'viso-typecheck', 'viso-next-build'];
const PASS = STEPS.map(name => ({ name, status: 'PASS' }));

test('consumer test suite requires every real installation, repeat runtime, types and Next step', () => {
  assert.equal(evaluateProbe(PASS, 'sha256:a', 'sha256:a',
    'sha256:b', 'sha256:b').status, 'PASS');
  for (let i = 0; i < PASS.length; i += 1) {
    const failed = structuredClone(PASS);
    failed[i].status = 'FAIL';
    assert.equal(evaluateProbe(failed, 'sha256:a', 'sha256:a',
      'sha256:b', 'sha256:b').status, 'BLOCKED');
  }
  assert.equal(evaluateProbe(PASS.slice(0, -1), 'a', 'a', 'b', 'b').status,
    'BLOCKED');
});

test('temporary consumer app modifications must never count as a production-safe result', () => {
  assert.equal(evaluateProbe(PASS, 'a', 'wrong', 'b', 'b').status, 'BLOCKED');
  assert.equal(evaluateProbe(PASS, 'a', 'a', 'b', 'wrong').status, 'BLOCKED');
  const observed = evaluateProbe(PASS, 'a', 'a', 'b', 'b');
  assert.equal(observed.publication_executed, false);
  assert.equal(observed.release_eligibility, 'PENDING_CI005_RELATION_ATTESTATION');
});

test('runtime probe verifies all fourteen ESM entrypoints and the empty type-only module', () => {
  const surface = Array.from({ length: 14 }, (_, i) => ({
    subpath: './entry-' + i, expected_exports: ['value' + i],
  }));
  surface.push({ subpath: './authorization/response-contracts/v1',
    expected_exports: [], type_only: true });
  const code = runtimeProgram(surface);
  assert.equal((code.match(/import \* as module\d+ from/g) ?? []).length, 14);
  assert(code.includes("await import('@vento/contracts/authorization/response-contracts/v1')"));
  assert(code.includes('assert.deepEqual(Object.keys(onlyTypes), [])'));
  assert.throws(() => runtimeProgram(surface.slice(0, 14)),
    /CI005_PUBLIC_SURFACE_CHANGED/u);
});


test('compiler failures report only diagnostic codes, never consumer source or credentials', () => {
  const sample = "src/app/foo/page.tsx(5,3): error TS2307: Cannot find module 'sensitive-value'.\n"
    + ".ci005-contracts-types.ts(2,1): error TS2344: secret=another-sensitive-value\n";
  const diagnostic = classifyCompilerErrors(sample);
  assert.deepEqual(diagnostic.codes, ['TS2307', 'TS2344']);
  assert.equal(diagnostic.diagnostic_count, 2);
  assert.equal(diagnostic.probe_related, true);
  assert(!JSON.stringify(diagnostic).includes('sensitive-value'));
  assert.deepEqual(classifyCompilerErrors('npm exited 1').codes, []);
});


test('preexisting VISO typecheck debt is a named restriction, not a clean PASS or publication', () => {
  const same = structuredClone(PASS);
  same[5].status = 'BASELINE_DEBT_UNCHANGED';
  const observed = evaluateProbe(same, 'a', 'a', 'b', 'b');
  assert.equal(observed.status, 'PASS_WITH_RESTRICTIONS');
  assert.equal(observed.preexisting_typecheck_debt, true);
  assert.equal(observed.release_eligibility, 'PENDING_CI005_RELATION_ATTESTATION');
  const bad = structuredClone(PASS);
  bad[5].status = 'FAIL';
  assert.equal(evaluateProbe(bad, 'a', 'a', 'b', 'b').status, 'BLOCKED');
});

test('baseline TypeScript diagnostics have stable cryptographic fingerprints, not source text', () => {
  const left = classifyCompilerErrors("src/foo.ts(1,2): error TS2345: sensitive diagnostic A");
  const right = classifyCompilerErrors("src/foo.ts(1,2): error TS2345: sensitive diagnostic B");
  assert.notDeepEqual(left.identities, right.identities);
  assert.equal(left.identities.length, 1);
  assert(/^sha256:[a-f0-9]{64}$/u.test(left.identities[0]));
  assert(!JSON.stringify(left).includes('sensitive'));
});


test('npm install must preserve all VISO locked dependencies besides the candidate tarball', () => {
  const prior = {
    'node_modules/next': '16.4.2',
    'node_modules/react': '19.2.3',
    'node_modules/@types/react': '19.2.6',
    'node_modules/typescript': '5.9.3',
  };
  const identical = { ...prior, 'node_modules/@vento/contracts': '1.0.0-alpha.1' };
  assert.deepEqual(compareFrozenDependencyTrees(prior, identical), {
    frozen: true, changed_count: 0, changed_packages: [],
  });
  const changed = { ...identical, 'node_modules/@types/react': '19.3.0' };
  const result = compareFrozenDependencyTrees(prior, changed);
  assert.equal(result.frozen, false);
  assert.equal(result.changed_count, 1);
  assert.deepEqual(result.changed_packages, [{
    name: 'node_modules/@types/react', before: '19.2.6', after: '19.3.0',
  }]);
  const removed = { ...identical };
  delete removed['node_modules/react'];
  assert.equal(compareFrozenDependencyTrees(prior, removed).frozen, false);
});
