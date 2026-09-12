import assert from 'node:assert/strict';
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { spawnSync } from 'node:child_process';
import test from 'node:test';

import {
  contractModuleForGeneration,
  isEslintFixCandidate,
  isGeneratedContractPath,
  isTextRepairCandidate,
  normalizeRepoPath,
  normalizeUtf8Text,
  repairExpansionIsAllowed,
  REPAIR_WORKING_COPY_POLICY,
  repairWorkingCopy,
} from './repair-working-copy.mjs';

function run(command, args, cwd) {
  const result = spawnSync(command, args, {
    cwd,
    encoding: 'utf8',
    windowsHide: true,
  });
  if (result.status !== 0) {
    throw new Error(result.stderr || result.stdout || `${command} failed.`);
  }
  return result.stdout;
}

function write(root, relativePath, content) {
  const absolutePath = path.join(root, ...relativePath.split('/'));
  fs.mkdirSync(path.dirname(absolutePath), { recursive: true });
  fs.writeFileSync(absolutePath, content);
}

test('normaliza BOM y CRLF sin alterar el contenido logico', () => {
  const source = Buffer.concat([
    Buffer.from([0xef, 0xbb, 0xbf]),
    Buffer.from('uno\r\ndos\r\ntres\r', 'utf8'),
  ]);
  const result = normalizeUtf8Text(source);
  assert.equal(result.content, 'uno\ndos\ntres\n');
  assert.equal(result.changed, true);
  assert.equal(result.removedBom, true);
  assert.equal(result.removedCr, true);
});

test('clasifica archivos reparables y excluye generated de eslint --fix', () => {
  assert.equal(isTextRepairCandidate('scripts/docs/tool.mjs'), true);
  assert.equal(isTextRepairCandidate('docs/plan/file.md'), true);
  assert.equal(isTextRepairCandidate('assets/image.png'), false);
  assert.equal(isGeneratedContractPath('packages/contracts/demo/generated/x.ts'), true);
  assert.equal(isEslintFixCandidate('packages/contracts/demo/scripts/generate-x.mjs'), true);
  assert.equal(isEslintFixCandidate('packages/contracts/demo/generated/x.ts'), false);
});

test('detecta solo modulos contractuales que requieren regeneracion', () => {
  assert.equal(
    contractModuleForGeneration('packages/contracts/demo/scripts/generate-demo.mjs'),
    'packages/contracts/demo',
  );
  assert.equal(
    contractModuleForGeneration('packages/contracts/demo/generated/demo.contract.ts'),
    'packages/contracts/demo',
  );
  assert.equal(contractModuleForGeneration('packages/contracts/demo/README.md'), null);
  assert.equal(contractModuleForGeneration('scripts/docs/demo.mjs'), null);
});

test('limita expansion de alcance a modulos generados', () => {
  const original = new Set(['packages/contracts/demo/scripts/generate-demo.mjs']);
  const modules = new Set(['packages/contracts/demo']);
  assert.equal(
    repairExpansionIsAllowed('packages/contracts/demo/generated/demo.ts', original, modules),
    true,
  );
  assert.equal(
    repairExpansionIsAllowed('packages/contracts/other/generated/other.ts', original, modules),
    false,
  );
});

test('normaliza rutas Windows a rutas de repositorio', () => {
  assert.equal(normalizeRepoPath('.\\scripts\\docs\\x.mjs'), 'scripts/docs/x.mjs');
});

test('repairWorkingCopy normaliza, ejecuta eslint fix y regenera contrato local', () => {
  const root = fs.mkdtempSync(path.join(os.tmpdir(), 'vento-repair-'));
  try {
    run('git', ['init', '-q'], root);
    run('git', ['config', 'user.email', 'test@example.com'], root);
    run('git', ['config', 'user.name', 'Test'], root);

    write(root, 'node_modules/eslint/bin/eslint.js', `
const fs = require('node:fs');
const args = process.argv.slice(2);
const fix = args[0] === '--fix';
const files = fix ? args.slice(1) : args;
for (const file of files) {
  if (!fs.existsSync(file)) continue;
  const source = fs.readFileSync(file, 'utf8');
  if (fix) fs.writeFileSync(file, source.replace('const AUTO_FIX = true;\\n', ''), 'utf8');
  else if (source.includes('const AUTO_FIX = true;')) process.exitCode = 1;
}
`);

    write(root, 'packages/contracts/demo/scripts/generate-demo.mjs', `
import fs from 'node:fs';
import path from 'node:path';
const output = path.resolve('packages/contracts/demo/generated/demo.contract.ts');
fs.mkdirSync(path.dirname(output), { recursive: true });
fs.writeFileSync(output, 'export const DEMO = true;\\n', 'utf8');
const AUTO_FIX = true;
`);
    write(root, 'packages/contracts/demo/generated/demo.contract.ts', 'export const DEMO = false;\n');
    write(root, 'README.md', '# fixture\n');
    run('git', ['add', '.'], root);
    run('git', ['commit', '-qm', 'fixture'], root);

    const generator = path.join(
      root,
      'packages/contracts/demo/scripts/generate-demo.mjs',
    );
    fs.writeFileSync(
      generator,
      Buffer.concat([
        Buffer.from([0xef, 0xbb, 0xbf]),
        Buffer.from(`
import fs from 'node:fs';\r
import path from 'node:path';\r
// changed\r
const output = path.resolve('packages/contracts/demo/generated/demo.contract.ts');\r
fs.mkdirSync(path.dirname(output), { recursive: true });\r
fs.writeFileSync(output, 'export const DEMO = true;\\n', 'utf8');\r
const AUTO_FIX = true;\r
`, 'utf8'),
      ]),
    );

    const result = repairWorkingCopy({ root });
    const repairedGenerator = fs.readFileSync(generator);
    assert.equal(repairedGenerator.includes(13), false);
    assert.equal(
      repairedGenerator.length >= 3
        && repairedGenerator[0] === 0xef
        && repairedGenerator[1] === 0xbb
        && repairedGenerator[2] === 0xbf,
      false,
    );
    assert.doesNotMatch(repairedGenerator.toString('utf8'), /AUTO_FIX/u);
    assert.equal(
      fs.readFileSync(
        path.join(root, 'packages/contracts/demo/generated/demo.contract.ts'),
        'utf8',
      ),
      'export const DEMO = true;\n',
    );
    assert.equal(result.generators.length, 1);
    assert.equal(result.removedBom, 1);
    assert.equal(result.removedCr, 1);
  } finally {
    fs.rmSync(root, { recursive: true, force: true });
  }
});

test('C4 declara quality repair como receipt-governed y no destructivo', () => {
  assert.equal(REPAIR_WORKING_COPY_POLICY.orchestration, 'COORDINATOR_EXACT_CANDIDATE_RECEIPT');
  assert.equal(REPAIR_WORKING_COPY_POLICY.idempotentByCandidateFingerprint, true);
  assert.equal(REPAIR_WORKING_COPY_POLICY.destructiveGitOperations, false);
  const source = fs.readFileSync('scripts/docs/repair-working-copy.mjs', 'utf8');
  assert.doesNotMatch(source, /git\s+(?:reset|clean|stash)/u);
});
