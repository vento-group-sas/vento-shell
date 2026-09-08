import assert from 'node:assert/strict';
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import test from 'node:test';

import {
  sha256,
  spawnGitUtf8,
  writePrettyJson,
} from './docs-runtime-primitives.mjs';

test('sha256 conserva strings UTF-8 y Buffer sin reinterpretarlos', () => {
  const expected = 'fc64a790d2e79f11d88208bbf968abc9cc5b98c9f6c7b3594f5fa9b6d4f8879b';
  assert.equal(sha256('vento\n'), expected);
  assert.equal(sha256(Buffer.from('vento\n', 'utf8')), expected);
});

test('spawnGitUtf8 devuelve el resultado del proceso y preserva opciones explicitas', () => {
  const result = spawnGitUtf8(['--version'], {
    cwd: process.cwd(),
    windowsHide: true,
    maxBuffer: 1024 * 1024,
  });

  assert.equal(result.status, 0);
  assert.match(String(result.stdout), /^git version /u);

  const failed = spawnGitUtf8(['cat-file', '-e', 'refs/heads/__vento_missing_ref__'], {
    cwd: process.cwd(),
  });
  assert.notEqual(failed.status, 0);
});

test('writePrettyJson crea el directorio y escribe JSON con LF final', () => {
  const root = fs.mkdtempSync(path.join(os.tmpdir(), 'vento-docs-runtime-'));
  try {
    const target = path.join(root, 'nested', 'evidence.json');
    assert.equal(writePrettyJson(target, { status: 'PASS' }), target);
    assert.equal(
      fs.readFileSync(target, 'utf8'),
      '{\n  "status": "PASS"\n}\n',
    );
  } finally {
    fs.rmSync(root, { recursive: true, force: true });
  }
});
