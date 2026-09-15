import assert from 'node:assert/strict';
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import test from 'node:test';

import {
  parseGitPorcelainV1Paths,
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

test('parseGitPorcelainV1Paths preserva columnas XY y primer caracter de la ruta', () => {
  const source = [
    ' M docs/plan-canonico/a.md',
    'M  docs/plan-canonico/b.md',
    'MM docs/plan-canonico/c.md',
    '?? docs/plan-canonico/nuevo.md',
    'R  docs/plan-canonico/viejo.md -> docs/plan-canonico/nuevo-nombre.md',
    ' M docs/plan-canonico/path with spaces.md',
  ].join('\n');
  assert.deepEqual(parseGitPorcelainV1Paths(source), [
    'docs/plan-canonico/a.md',
    'docs/plan-canonico/b.md',
    'docs/plan-canonico/c.md',
    'docs/plan-canonico/nuevo-nombre.md',
    'docs/plan-canonico/nuevo.md',
    'docs/plan-canonico/path with spaces.md',
  ]);
});

test('parser canonico conserva docs/ con git status real para staged y unstaged', () => {
  const root = fs.mkdtempSync(path.join(os.tmpdir(), 'vento-git-machine-output-'));
  const runGit = (args) => spawnGitUtf8(args, { cwd: root, windowsHide: true });
  try {
    assert.equal(runGit(['init']).status, 0);
    assert.equal(runGit(['config', 'user.email', 'vento-test@example.com']).status, 0);
    assert.equal(runGit(['config', 'user.name', 'Vento Test']).status, 0);
    fs.mkdirSync(path.join(root, 'docs', 'plan-canonico'), { recursive: true });
    fs.writeFileSync(path.join(root, 'docs', 'plan-canonico', 'tracked.md'), 'base\n', 'utf8');
    fs.writeFileSync(path.join(root, 'staged.md'), 'base\n', 'utf8');
    assert.equal(runGit(['add', '.']).status, 0);
    assert.equal(runGit(['commit', '-m', 'base']).status, 0);
    fs.writeFileSync(path.join(root, 'docs', 'plan-canonico', 'tracked.md'), 'dirty\n', 'utf8');
    fs.writeFileSync(path.join(root, 'staged.md'), 'staged\n', 'utf8');
    assert.equal(runGit(['add', 'staged.md']).status, 0);
    const status = runGit(['status', '--porcelain=v1', '--untracked-files=all']);
    const paths = parseGitPorcelainV1Paths(String(status.stdout ?? ''));
    assert.ok(paths.includes('docs/plan-canonico/tracked.md'));
    assert.ok(!paths.some((entry) => entry.startsWith('ocs/')));
    assert.ok(paths.includes('staged.md'));
  } finally {
    fs.rmSync(root, { recursive: true, force: true });
  }
});

test('guard anti-regresion prohibe parsing manual de porcelain en tooling de implementacion', () => {
  const repoRoot = process.cwd();
  const governed = [
    'scripts/docs/implementation-doctor.mjs',
    'scripts/docs/task-branch-lifecycle.mjs',
    'scripts/docs/canonical-task-preflight.mjs',
    'scripts/docs/package-review-factory.mjs',
    'scripts/docs/implementation-state-integrity.mjs',
    'scripts/docs/implementation-branch-lifecycle.mjs',
    'scripts/docs/implementation-execution-coordinator.mjs',
    'scripts/supabase/environment-drift.mjs',
  ];
  const violations = [];
  for (const relativePath of governed) {
    const source = fs.readFileSync(path.join(repoRoot, ...relativePath.split('/')), 'utf8');
    if (/slice\s*\(\s*3\s*\)/u.test(source)) violations.push(relativePath);
  }
  assert.deepEqual(violations, []);
});
