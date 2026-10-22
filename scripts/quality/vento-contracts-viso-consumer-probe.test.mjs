import assert from 'node:assert/strict';
import test from 'node:test';

import {
  classifyCompilerErrors, evaluateProbe, runtimeProgram,
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
