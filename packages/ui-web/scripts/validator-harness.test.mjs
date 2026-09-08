import strictAssert from 'node:assert/strict';
import path from 'node:path';
import test from 'node:test';

import { createUiValidatorHarness } from './validator-harness.mjs';

const harness = createUiValidatorHarness(import.meta.url);

test('resuelve packageRoot, repoRoot y requireFromRepo desde scripts/ui-web', () => {
  strictAssert.equal(path.basename(harness.packageRoot), 'ui-web');
  strictAssert.equal(path.basename(path.dirname(harness.packageRoot)), 'packages');
  strictAssert.equal(path.resolve(harness.packageRoot, '..', '..'), harness.repoRoot);
  strictAssert.equal(typeof harness.requireFromRepo, 'function');
});

test('conserva las primitivas de assertion de los validadores UI', () => {
  harness.assert(true, 'no debe fallar');
  strictAssert.throws(() => harness.assert(false, 'fallo esperado'), /fallo esperado/u);

  harness.includesAll('alpha beta gamma', ['alpha', 'gamma'], 'source');
  strictAssert.throws(
    () => harness.includesAll('alpha', ['beta'], 'source'),
    /source missing: beta/u,
  );

  harness.excludesAll('alpha beta', ['gamma'], 'source');
  strictAssert.throws(
    () => harness.excludesAll('alpha beta', ['beta'], 'source'),
    /source contains forbidden value: beta/u,
  );
});

test('sha256 conserva el contrato UTF-8 usado por los validadores UI', () => {
  strictAssert.equal(
    harness.sha256('vento\n'),
    'fc64a790d2e79f11d88208bbf968abc9cc5b98c9f6c7b3594f5fa9b6d4f8879b',
  );
});
