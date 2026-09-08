import strictAssert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import test from 'node:test';

import { createDataNormalizationValidatorHarness } from './validator-harness.mjs';

const harness = createDataNormalizationValidatorHarness(import.meta.url);

test('resuelve packageRoot y repoRoot desde data-normalization/scripts', () => {
  strictAssert.equal(path.basename(harness.packageRoot), 'data-normalization');
  strictAssert.equal(path.basename(path.dirname(harness.packageRoot)), 'packages');
  strictAssert.equal(path.resolve(harness.packageRoot, '..', '..'), harness.repoRoot);
});

test('conserva assert, exactArray e includesAll con mensajes configurables', () => {
  harness.assert(true, 'no debe fallar');
  strictAssert.throws(() => harness.assert(false, 'fallo esperado'), /fallo esperado/u);

  harness.exactArray(['a', 'b'], ['a', 'b'], 'array');
  strictAssert.throws(
    () => harness.exactArray(['a'], ['b'], 'array'),
    /array mismatch/u,
  );

  harness.includesAll('alpha beta gamma', ['alpha', 'gamma'], 'source');
  strictAssert.throws(
    () => harness.includesAll('alpha', ['beta'], 'source'),
    /source missing: beta/u,
  );

  const strictIncludes = createDataNormalizationValidatorHarness(import.meta.url, {
    includesAllMessage: 'missing required entries',
  });
  strictAssert.throws(
    () => strictIncludes.includesAll(['alpha'], ['beta'], 'entries'),
    /entries missing required entries: beta/u,
  );
});

test('sha256 y asciiSafe conservan el contrato UTF-8 de validación', () => {
  strictAssert.equal(
    harness.sha256('vento\n'),
    'fc64a790d2e79f11d88208bbf968abc9cc5b98c9f6c7b3594f5fa9b6d4f8879b',
  );
  strictAssert.equal(harness.asciiSafe('ÚLTIMA — café'), 'ULTIMA ? cafe');
});

test('run conserva status/stdout/stderr y canonicalTaskBlock usa el parser canónico', () => {
  const version = harness.run(process.execPath, ['--version']);
  strictAssert.equal(version.status, 0);
  strictAssert.match(version.stdout, /^v\d+/u);

  const ownerPath = path.join(
    harness.repoRoot,
    'docs',
    'plan-canonico',
    'modular',
    'bloques',
    'H_FUNDACION_COMPARTIDA',
    '05_NORMALIZACION_COMPARTIDA.md',
  );
  const owner = fs.readFileSync(ownerPath, 'utf8');
  const block = harness.canonicalTaskBlock(owner, 'SHELL-NORM-002');
  strictAssert.match(block, /SHELL-NORM-002/u);
});
