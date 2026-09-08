import assert from 'node:assert/strict';
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import test from 'node:test';

import {
  asSha256Identity,
  contentIdentity,
  logicalIdentity,
  readJson,
  sha256,
  spawnUtf8,
  stableJson,
  stableStringify,
  writePrettyJson,
} from './quality-primitives.mjs';

test('stableJson conserva orden recursivo con comparación en inglés', () => {
  assert.equal(
    stableJson({ z: 1, a: { y: 2, b: 3 }, list: [{ d: 4, c: 5 }] }),
    '{"a":{"b":3,"y":2},"list":[{"c":5,"d":4}],"z":1}',
  );
  assert.equal(
    logicalIdentity({ b: 2, a: 1 }),
    logicalIdentity({ a: 1, b: 2 }),
  );
});

test('stableStringify conserva canonicalización de objetos y arrays', () => {
  assert.equal(
    stableStringify({ z: 1, a: [{ d: 4, c: 3 }] }),
    '{"a":[{"c":3,"d":4}],"z":1}',
  );
});

test('sha256 conserva contratos string y Buffer', () => {
  const expected = 'fc64a790d2e79f11d88208bbf968abc9cc5b98c9f6c7b3594f5fa9b6d4f8879b';
  assert.equal(sha256('vento\n'), expected);
  assert.equal(sha256(Buffer.from('vento\n', 'utf8')), expected);
  assert.equal(asSha256Identity('vento\n'), `sha256:${expected}`);
  assert.equal(contentIdentity('vento\n'), `sha256:${expected}`);
});

test('readJson conserva source y errores contractuales', () => {
  const root = fs.mkdtempSync(path.join(os.tmpdir(), 'vento-quality-primitives-read-'));
  try {
    const valid = path.join(root, 'valid.json');
    fs.writeFileSync(valid, '{"answer":42}\n', 'utf8');
    assert.deepEqual(readJson(valid, 'fixture'), {
      source: '{"answer":42}\n',
      value: { answer: 42 },
    });

    assert.throws(
      () => readJson(path.join(root, 'missing.json'), 'missing fixture'),
      /^Error: Cannot read missing fixture:/u,
    );

    const invalid = path.join(root, 'invalid.json');
    fs.writeFileSync(invalid, '{', 'utf8');
    assert.throws(
      () => readJson(invalid, 'invalid fixture'),
      /^Error: Invalid JSON in invalid fixture:/u,
    );
  } finally {
    fs.rmSync(root, { recursive: true, force: true });
  }
});

test('writePrettyJson crea directorios y termina en LF', () => {
  const root = fs.mkdtempSync(path.join(os.tmpdir(), 'vento-quality-primitives-write-'));
  try {
    const target = path.join(root, 'nested', 'evidence.json');
    assert.equal(writePrettyJson(target, { result: 'PASS' }), target);
    assert.equal(
      fs.readFileSync(target, 'utf8'),
      '{\n  "result": "PASS"\n}\n',
    );
  } finally {
    fs.rmSync(root, { recursive: true, force: true });
  }
});

test('spawnUtf8 conserva captura UTF-8 y permite override de opciones', () => {
  const result = spawnUtf8(
    process.execPath,
    ['-e', 'process.stdout.write("VENTO"); process.stderr.write("ERR")'],
    { timeout: 30_000 },
  );
  assert.equal(result.status, 0);
  assert.equal(result.stdout, 'VENTO');
  assert.equal(result.stderr, 'ERR');
});
