import assert from 'node:assert/strict';
import test from 'node:test';
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { execFileSync } from 'node:child_process';

import { changedFiles, evaluateLintRatchet, summarizeLintResults } from './lint-ratchet.mjs';

test('base incluye deuda del archivo ya commiteado, cambios locales y archivos nuevos', (t) => {
  const root = fs.mkdtempSync(path.join(os.tmpdir(), 'vento-lint-range-'));
  t.after(() => fs.rmSync(root, { recursive: true, force: true }));
  const git = (...args) => execFileSync('git', args, { cwd: root, encoding: 'utf8', windowsHide: true, stdio: ['ignore', 'pipe', 'pipe'] }).trim();
  git('init', '-b', 'main');
  git('config', 'user.name', 'Test');
  git('config', 'user.email', 'test@example.invalid');
  fs.writeFileSync(path.join(root, 'legacy.ts'), 'export const value = 1;\n');
  git('add', '--', 'legacy.ts');
  git('commit', '-m', 'baseline');
  git('switch', '-c', 'implementation/test');
  fs.appendFileSync(path.join(root, 'legacy.ts'), 'const detail = "unused";\n');
  git('add', '--', 'legacy.ts');
  git('commit', '-m', 'implementation');
  const issue = { file: 'legacy.ts', rule: '@typescript-eslint/no-unused-vars', severity: 1, count: 2 };
  const baseline = { issues: [issue] };
  assert.deepEqual(changedFiles({}, { root }), []);
  assert.deepEqual(evaluateLintRatchet({ baseline, actualIssues: [issue], changedFiles: changedFiles({ base: 'main' }, { root }) }).touchedDebt, [issue]);
  fs.writeFileSync(path.join(root, 'new.ts'), 'export {};\n');
  assert.deepEqual(changedFiles({ base: 'main' }, { root }), ['legacy.ts', 'new.ts']);
  assert.throws(() => changedFiles({ base: 'missing' }, { root }));
  assert.throws(() => changedFiles({ base: 'main', range: 'main..HEAD' }, { root }), /no admite/u);
});

test('resume ESLint por archivo, regla y severidad', () => {
  const issues = summarizeLintResults([
    {
      filePath: 'src/example.ts',
      messages: [
        { ruleId: 'rule-a', severity: 2 },
        { ruleId: 'rule-a', severity: 2 },
        { ruleId: 'rule-b', severity: 1 },
      ],
    },
  ], { root: process.cwd() });
  assert.deepEqual(issues, [
    { file: 'src/example.ts', rule: 'rule-a', severity: 2, count: 2 },
    { file: 'src/example.ts', rule: 'rule-b', severity: 1, count: 1 },
  ]);
});

test('acepta deuda histórica sin aumentos en archivos no tocados', () => {
  const issue = { file: 'legacy.ts', rule: 'rule-a', severity: 2, count: 2 };
  const result = evaluateLintRatchet({
    baseline: { issues: [issue] },
    actualIssues: [issue],
    changedFiles: ['clean.ts'],
  });
  assert.deepEqual(result, { newDebt: [], touchedDebt: [] });
});

test('rechaza aumentos y cualquier hallazgo en un archivo tocado', () => {
  const issue = { file: 'legacy.ts', rule: 'rule-a', severity: 2, count: 3 };
  const result = evaluateLintRatchet({
    baseline: { issues: [{ ...issue, count: 2 }] },
    actualIssues: [issue],
    changedFiles: ['legacy.ts'],
  });
  assert.equal(result.newDebt[0].added, 1);
  assert.deepEqual(result.touchedDebt, [issue]);
});

test('excluye evidencia local .delivery del universo ESLint del ratchet', () => {
  const source = fs.readFileSync(new URL('./lint-ratchet.mjs', import.meta.url), 'utf8');
  assert.ok(source.includes("[eslintCli, '.', '--ignore-pattern', '.delivery/**', '--format', 'json']"));
});
