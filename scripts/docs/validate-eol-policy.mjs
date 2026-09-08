import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

import { spawnGitUtf8 } from './docs-runtime-primitives.mjs';

const REQUIRED_POLICY_FILES = Object.freeze([
  '.gitattributes',
  '.editorconfig',
  '.vscode/settings.json',
  'package.json',
]);

const GOVERNED_PATHS = Object.freeze([
  '.gitattributes',
  '.editorconfig',
  '.vscode/settings.json',
  'package.json',
  'docs/plan-canonico/modular',
  'scripts/docs',
  'packages/contracts/authorization',
]);

const STARTER_RELATIVE_PATH = 'INICIADOR_VENTO_ACTUAL.txt';
const MANIFEST_RELATIVE_PATH = 'docs/plan-canonico/modular/manifest.json';

function normalizePath(value) {
  return String(value ?? '').replaceAll('\\', '/').replace(/^\.\//u, '');
}

function fail(message) {
  const error = new Error(message);
  error.exitCode = 1;
  throw error;
}

function runGit(root, args) {
  const result = spawnGitUtf8(args, {
    cwd: root,
    windowsHide: true,
    maxBuffer: 16 * 1024 * 1024,
  });
  if (result.status !== 0) {
    fail(result.stderr.trim() || `git ${args.join(' ')} failed.`);
  }
  return result.stdout;
}

export function inspectTextBuffer(value) {
  const bytes = Buffer.isBuffer(value) ? value : Buffer.from(value);
  return Object.freeze({
    hasCr: bytes.includes(13),
    hasUtf8Bom: bytes.length >= 3
      && bytes[0] === 0xef
      && bytes[1] === 0xbb
      && bytes[2] === 0xbf,
  });
}

function inspectFile(root, relativePath) {
  const absolutePath = path.join(root, ...normalizePath(relativePath).split('/'));
  return inspectTextBuffer(fs.readFileSync(absolutePath));
}

function listGovernedFiles(root) {
  const source = runGit(root, [
    'ls-files',
    '--cached',
    '--others',
    '--exclude-standard',
    '-z',
    '--',
    ...GOVERNED_PATHS,
  ]);
  return [...new Set(source.split('\0').map(normalizePath).filter(Boolean))]
    .filter((relativePath) => {
      const absolutePath = path.join(root, ...relativePath.split('/'));
      return fs.existsSync(absolutePath) && fs.statSync(absolutePath).isFile();
    })
    .sort((left, right) => left.localeCompare(right, 'en'));
}

function localDerivedFiles(root) {
  const candidates = [STARTER_RELATIVE_PATH];
  const manifestPath = path.join(root, ...MANIFEST_RELATIVE_PATH.split('/'));
  if (fs.existsSync(manifestPath)) {
    const manifest = JSON.parse(fs.readFileSync(manifestPath, 'utf8'));
    const compiled = normalizePath(manifest.compiled_output);
    if (compiled) candidates.push(compiled);
  }
  return [...new Set(candidates)]
    .filter((relativePath) => {
      const absolutePath = path.join(root, ...relativePath.split('/'));
      return fs.existsSync(absolutePath) && fs.statSync(absolutePath).isFile();
    })
    .sort((left, right) => left.localeCompare(right, 'en'));
}

export function auditEolPolicy({
  root = process.cwd(),
  includeLocalDerived = true,
} = {}) {
  const repositoryRoot = path.resolve(root);
  const violations = [];

  for (const relativePath of REQUIRED_POLICY_FILES) {
    const absolutePath = path.join(repositoryRoot, ...relativePath.split('/'));
    if (!fs.existsSync(absolutePath) || !fs.statSync(absolutePath).isFile()) {
      violations.push({ path: relativePath, problem: 'MISSING' });
    }
  }

  const governedFiles = listGovernedFiles(repositoryRoot);
  const derivedFiles = includeLocalDerived ? localDerivedFiles(repositoryRoot) : [];
  const files = [...new Set([...governedFiles, ...derivedFiles])];

  for (const relativePath of files) {
    const inspection = inspectFile(repositoryRoot, relativePath);
    if (inspection.hasCr) violations.push({ path: relativePath, problem: 'CR' });
    if (inspection.hasUtf8Bom) violations.push({ path: relativePath, problem: 'UTF8_BOM' });
  }

  violations.sort((left, right) => {
    const pathOrder = left.path.localeCompare(right.path, 'en');
    return pathOrder || left.problem.localeCompare(right.problem, 'en');
  });

  return Object.freeze({
    governedFiles: Object.freeze(governedFiles),
    derivedFiles: Object.freeze(derivedFiles),
    violations: Object.freeze(violations),
  });
}

export function validateEolPolicy(options = {}) {
  const report = auditEolPolicy(options);
  if (report.violations.length > 0) {
    const detail = report.violations
      .map((entry) => `${entry.path}:${entry.problem}`)
      .join(', ');
    fail(`EOL_POLICY_VIOLATION ${detail}`);
  }
  return report;
}

function main() {
  const report = validateEolPolicy();
  console.log('[EOL POLICY] PASS');
  console.log(`[EOL POLICY] GOVERNED_FILES ${report.governedFiles.length}`);
  console.log(`[EOL POLICY] LOCAL_DERIVED_FILES ${report.derivedFiles.length}`);
  console.log('[EOL POLICY] CR 0');
  console.log('[EOL POLICY] UTF8_BOM 0');
}

const isCli = process.argv[1]
  && path.resolve(process.argv[1]) === path.resolve(fileURLToPath(import.meta.url));

if (isCli) {
  try {
    main();
  } catch (error) {
    console.error('[EOL POLICY] FAIL');
    console.error(error instanceof Error ? error.message : String(error));
    process.exitCode = Number.isInteger(error?.exitCode) ? error.exitCode : 1;
  }
}
