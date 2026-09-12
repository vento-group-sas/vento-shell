import { spawnSync } from 'node:child_process';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const RESULT_START = '=== RESULTADO PARA CHATGPT ===';
const RESULT_END = '=== FIN RESULTADO PARA CHATGPT ===';

export const REPAIR_WORKING_COPY_POLICY = Object.freeze({
  orchestration: 'COORDINATOR_EXACT_CANDIDATE_RECEIPT',
  idempotentByCandidateFingerprint: true,
  destructiveGitOperations: false,
});
const TEXT_EXTENSIONS = new Set([
  '.cjs',
  '.css',
  '.js',
  '.json',
  '.jsonl',
  '.jsx',
  '.md',
  '.mjs',
  '.ts',
  '.tsx',
  '.txt',
  '.yaml',
  '.yml',
]);
const ESLINT_EXTENSIONS = new Set([
  '.cjs',
  '.js',
  '.jsx',
  '.mjs',
  '.ts',
  '.tsx',
]);

function fail(message, code = 1) {
  const error = new Error(message);
  error.exitCode = code;
  throw error;
}

export function normalizeRepoPath(value) {
  return String(value ?? '').replaceAll('\\', '/').replace(/^\.\//u, '');
}

export function normalizeUtf8Text(value) {
  const bytes = Buffer.isBuffer(value) ? value : Buffer.from(value);
  const hasBom = bytes.length >= 3
    && bytes[0] === 0xef
    && bytes[1] === 0xbb
    && bytes[2] === 0xbf;
  const source = (hasBom ? bytes.subarray(3) : bytes).toString('utf8');
  const normalized = source.replace(/\r\n?/gu, '\n');
  return Object.freeze({
    content: normalized,
    changed: hasBom || normalized !== source,
    removedBom: hasBom,
    removedCr: source.includes('\r'),
  });
}

export function isTextRepairCandidate(relativePath) {
  const normalized = normalizeRepoPath(relativePath);
  const basename = path.posix.basename(normalized);
  if (['.editorconfig', '.gitattributes', '.gitignore', '.node-version'].includes(basename)) {
    return true;
  }
  return TEXT_EXTENSIONS.has(path.posix.extname(normalized).toLowerCase());
}

export function isGeneratedContractPath(relativePath) {
  return normalizeRepoPath(relativePath).includes('/generated/');
}

export function isEslintFixCandidate(relativePath) {
  const normalized = normalizeRepoPath(relativePath);
  if (isGeneratedContractPath(normalized)) return false;
  return ESLINT_EXTENSIONS.has(path.posix.extname(normalized).toLowerCase());
}

export function contractModuleForGeneration(relativePath) {
  const normalized = normalizeRepoPath(relativePath);
  const match = normalized.match(/^packages\/contracts\/([^/]+)\/(.+)$/u);
  if (!match) return null;
  const rest = match[2];
  const generatorChanged = /^scripts\/generate-[^/]+\.mjs$/u.test(rest);
  const generatedChanged = /^generated\//u.test(rest);
  return generatorChanged || generatedChanged
    ? `packages/contracts/${match[1]}`
    : null;
}

export function repairExpansionIsAllowed(relativePath, originalFiles, generatedModules) {
  const normalized = normalizeRepoPath(relativePath);
  if (originalFiles.has(normalized)) return true;
  return [...generatedModules].some((moduleRoot) => (
    normalized.startsWith(`${moduleRoot}/generated/`)
  ));
}

function run(command, args, {
  root,
  allowFailure = false,
} = {}) {
  const result = spawnSync(command, args, {
    cwd: root,
    encoding: 'utf8',
    windowsHide: true,
    maxBuffer: 64 * 1024 * 1024,
  });
  if (result.error) {
    if (allowFailure) {
      return { status: 1, stdout: '', stderr: result.error.message };
    }
    fail(`${command} no disponible: ${result.error.message}`);
  }
  const status = Number.isInteger(result.status) ? result.status : 1;
  const stdout = String(result.stdout ?? '').trimEnd();
  const stderr = String(result.stderr ?? '').trimEnd();
  if (status !== 0 && !allowFailure) {
    fail(stderr || stdout || `${command} ${args.join(' ')} fallo.`, status);
  }
  return { status, stdout, stderr };
}

function git(root, args) {
  return run('git', args, { root }).stdout;
}

export function listChangedFiles(root = process.cwd()) {
  const tracked = git(root, [
    'diff',
    '--name-only',
    '--diff-filter=ACMR',
    'HEAD',
  ]).split(/\r?\n/u);
  const untracked = git(root, [
    'ls-files',
    '--others',
    '--exclude-standard',
  ]).split(/\r?\n/u);
  return [...new Set([...tracked, ...untracked].map(normalizeRepoPath).filter(Boolean))]
    .filter((relativePath) => {
      const absolutePath = path.join(root, ...relativePath.split('/'));
      return fs.existsSync(absolutePath) && fs.statSync(absolutePath).isFile();
    })
    .sort((left, right) => left.localeCompare(right, 'en'));
}

function normalizeChangedTextFiles(root, files) {
  const changed = [];
  let removedBom = 0;
  let removedCr = 0;
  for (const relativePath of files) {
    if (!isTextRepairCandidate(relativePath)) continue;
    const absolutePath = path.join(root, ...relativePath.split('/'));
    const current = fs.readFileSync(absolutePath);
    const normalized = normalizeUtf8Text(current);
    if (!normalized.changed) continue;
    fs.writeFileSync(absolutePath, normalized.content, 'utf8');
    changed.push(relativePath);
    if (normalized.removedBom) removedBom += 1;
    if (normalized.removedCr) removedCr += 1;
  }
  return { changed, removedBom, removedCr };
}

function eslintCliPath(root) {
  return path.join(root, 'node_modules', 'eslint', 'bin', 'eslint.js');
}

function runEslintFix(root, files) {
  const targets = files.filter(isEslintFixCandidate);
  if (targets.length === 0) return { targets: [], status: 0, stderr: '' };
  const eslintCli = eslintCliPath(root);
  if (!fs.existsSync(eslintCli)) {
    fail('ESLint local no esta disponible; ejecuta npm install antes de quality:repair.');
  }
  const result = run(process.execPath, [eslintCli, '--fix', ...targets], {
    root,
    allowFailure: true,
  });
  return { targets, status: result.status, stderr: result.stderr || result.stdout };
}

function runEslintProbe(root, files) {
  const targets = files.filter((relativePath) => (
    ESLINT_EXTENSIONS.has(path.posix.extname(relativePath).toLowerCase())
  ));
  if (targets.length === 0) return { targets: [], status: 0, stderr: '' };
  const eslintCli = eslintCliPath(root);
  if (!fs.existsSync(eslintCli)) {
    fail('ESLint local no esta disponible; ejecuta npm install antes de quality:repair.');
  }
  const result = run(process.execPath, [eslintCli, ...targets], {
    root,
    allowFailure: true,
  });
  return { targets, status: result.status, stderr: result.stderr || result.stdout };
}

function generatorsForModule(root, moduleRoot) {
  const scriptsDirectory = path.join(root, ...moduleRoot.split('/'), 'scripts');
  if (!fs.existsSync(scriptsDirectory)) return [];
  return fs.readdirSync(scriptsDirectory, { withFileTypes: true })
    .filter((entry) => entry.isFile() && /^generate-[^/]+\.mjs$/u.test(entry.name))
    .map((entry) => `${moduleRoot}/scripts/${entry.name}`)
    .sort((left, right) => left.localeCompare(right, 'en'));
}

function runContractGenerators(root, files) {
  const modules = new Set(
    files.map(contractModuleForGeneration).filter(Boolean),
  );
  const generators = [];
  for (const moduleRoot of [...modules].sort((left, right) => left.localeCompare(right, 'en'))) {
    for (const relativePath of generatorsForModule(root, moduleRoot)) {
      run(process.execPath, [path.join(root, ...relativePath.split('/'))], { root });
      generators.push(relativePath);
    }
  }
  return { modules, generators };
}

export function repairWorkingCopy({ root = process.cwd() } = {}) {
  const repositoryRoot = path.resolve(root);
  const before = listChangedFiles(repositoryRoot);
  const originalFiles = new Set(before);

  const firstNormalization = normalizeChangedTextFiles(repositoryRoot, before);
  const firstEslint = runEslintFix(repositoryRoot, listChangedFiles(repositoryRoot));
  const generation = runContractGenerators(repositoryRoot, listChangedFiles(repositoryRoot));
  const secondNormalization = normalizeChangedTextFiles(
    repositoryRoot,
    listChangedFiles(repositoryRoot),
  );
  const secondEslint = runEslintFix(repositoryRoot, listChangedFiles(repositoryRoot));
  const thirdNormalization = normalizeChangedTextFiles(
    repositoryRoot,
    listChangedFiles(repositoryRoot),
  );

  const after = listChangedFiles(repositoryRoot);
  const unexpected = after.filter((relativePath) => !repairExpansionIsAllowed(
    relativePath,
    originalFiles,
    generation.modules,
  ));
  if (unexpected.length > 0) {
    fail(`REPAIR_SCOPE_EXPANSION ${unexpected.join(', ')}`);
  }

  const lintProbe = runEslintProbe(repositoryRoot, after);
  if (lintProbe.status !== 0) {
    const detail = lintProbe.stderr.trim().replace(/\r?\n/gu, ' | ');
    fail(`REPAIR_REQUIRES_MANUAL_LINT ${detail || 'ESLint conserva hallazgos no auto-reparables.'}`);
  }

  const normalizedFiles = new Set([
    ...firstNormalization.changed,
    ...secondNormalization.changed,
    ...thirdNormalization.changed,
  ]);

  return Object.freeze({
    policy: REPAIR_WORKING_COPY_POLICY,
    before: Object.freeze(before),
    after: Object.freeze(after),
    normalizedFiles: Object.freeze([...normalizedFiles].sort()),
    removedBom: firstNormalization.removedBom
      + secondNormalization.removedBom
      + thirdNormalization.removedBom,
    removedCr: firstNormalization.removedCr
      + secondNormalization.removedCr
      + thirdNormalization.removedCr,
    eslintFixTargets: Object.freeze([
      ...new Set([...firstEslint.targets, ...secondEslint.targets]),
    ].sort()),
    generators: Object.freeze(generation.generators),
    generatedModules: Object.freeze([...generation.modules].sort()),
  });
}

function printResult(fields) {
  console.log('');
  console.log(RESULT_START);
  for (const [key, value] of Object.entries(fields)) {
    console.log(`${key}: ${value}`);
  }
  console.log(RESULT_END);
}

function main() {
  try {
    const result = repairWorkingCopy();
    console.log('[REPAIR] PASS');
    console.log(`[REPAIR] FILES_BEFORE ${result.before.length}`);
    console.log(`[REPAIR] FILES_AFTER ${result.after.length}`);
    console.log(`[REPAIR] NORMALIZED ${result.normalizedFiles.length}`);
    console.log(`[REPAIR] GENERATORS ${result.generators.length}`);
    console.log(`[REPAIR] ESLINT_FIX_TARGETS ${result.eslintFixTargets.length}`);
    printResult({
      ESTADO: 'PASS',
      OPERACION: 'REPOSITORY_REPAIR',
      FILES_BEFORE: result.before.length,
      FILES_AFTER: result.after.length,
      NORMALIZED_FILES: result.normalizedFiles.length,
      REMOVED_CR_FILES: result.removedCr,
      REMOVED_UTF8_BOM_FILES: result.removedBom,
      CONTRACT_GENERATORS_RUN: result.generators.length,
      ESLINT_FIX_TARGETS: result.eslintFixTargets.length,
      REMAINING_ESLINT: 0,
      REPAIR_SCOPE: 'PASS',
      READY_FOR_VALIDATION: 'SI',
    });
  } catch (error) {
    const message = error instanceof Error ? error.message : String(error);
    console.error('[REPAIR] FAIL');
    console.error(message);
    printResult({
      ESTADO: 'FAIL',
      OPERACION: 'REPOSITORY_REPAIR',
      ERROR: message.replace(/\r?\n/gu, ' | '),
      READY_FOR_VALIDATION: 'NO',
    });
    process.exitCode = Number.isInteger(error?.exitCode) ? error.exitCode : 1;
  }
}

const isCli = process.argv[1]
  && path.resolve(process.argv[1]) === path.resolve(fileURLToPath(import.meta.url));

if (isCli) main();
