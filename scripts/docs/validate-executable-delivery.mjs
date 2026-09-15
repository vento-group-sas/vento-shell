import fs from 'node:fs';
import path from 'node:path';
import vm from 'node:vm';
import { fileURLToPath } from 'node:url';

const SUPPORTED_MODES = new Set(['stdin-commonjs']);

function fail(message) {
  const error = new Error(message);
  error.exitCode = 1;
  throw error;
}

export function canonicalRepositoryText(source) {
  const normalized = String(source ?? '')
    .replace(/^\uFEFF/u, '')
    .replaceAll('\r\n', '\n')
    .replaceAll('\r', '\n');
  return `${normalized.replace(/[ \t\n]+$/u, '')}\n`;
}

export function writeCanonicalRepositoryText(filePath, source) {
  const target = String(filePath ?? '').trim();
  if (!target) fail('CANONICAL_REPOSITORY_TEXT_PATH_EMPTY');
  const absolute = path.resolve(target);
  fs.writeFileSync(absolute, canonicalRepositoryText(source), 'utf8');
  return absolute;
}

export function validateExecutablePolicy(source) {
  const text = String(source ?? '');

  // LC-009: downloaded stdin-CommonJS executors must never embed npm.cmd.
  // They must consume the repository's canonical resolveNpmInvocation helper.
  if (/['"`]npm\.cmd['"`]/iu.test(text)) {
    fail(
      'EXECUTABLE_POLICY_FAIL:LC-009:DIRECT_NPM_CMD_LITERAL_FORBIDDEN:'
      + 'use canonical resolveNpmInvocation',
    );
  }

  if (
    /\b(?:spawn|spawnSync|execFile|execFileSync)\s*\(\s*['"`]npm['"`]/iu.test(text)
  ) {
    fail(
      'EXECUTABLE_POLICY_FAIL:LC-009:DIRECT_NPM_PROCESS_FORBIDDEN:'
      + 'use canonical resolveNpmInvocation',
    );
  }

  // Downloaded executors must not route a physical implementation through
  // the branch-local npm facade. An implementation branch can intentionally
  // lag main while current-main tooling carries lifecycle hardening.
  if (/['"`]docs:implementation:advance['"`]/iu.test(text)) {
    fail(
      'EXECUTABLE_POLICY_FAIL:CURRENT_MAIN_COORDINATOR_REQUIRED:'
      + 'invoke current-main implementation-execution-coordinator.mjs with process.execPath',
    );
  }

  if (
    /\b(?:fs\.)?(?:promises\.)?(?:writeFileSync|writeFile|appendFileSync|appendFile)\s*\(/iu.test(text)
  ) {
    fail(
      'EXECUTABLE_POLICY_FAIL:CANONICAL_TEXT_WRITE_REQUIRED:'
      + 'use writeCanonicalRepositoryText from current-main validate-executable-delivery.mjs',
    );
  }

  return true;
}

export function validateExecutableSource(source, {
  mode = 'stdin-commonjs',
  filename = 'downloaded-executable.txt',
} = {}) {
  const normalizedMode = String(mode ?? '').trim();
  if (!SUPPORTED_MODES.has(normalizedMode)) {
    fail(`UNSUPPORTED_EXECUTABLE_MODE:${normalizedMode || 'EMPTY'}`);
  }
  const text = String(source ?? '');
  if (!text.trim()) fail('EXECUTABLE_SOURCE_EMPTY');

  if (normalizedMode === 'stdin-commonjs') {
    try {
      new vm.Script(text, { filename: String(filename || 'downloaded-executable.txt') });
    } catch (error) {
      fail(`EXECUTABLE_PARSE_FAIL:stdin-commonjs:${error instanceof Error ? error.message : String(error)}`);
    }
  }

  validateExecutablePolicy(text);

  return Object.freeze({
    mode: normalizedMode,
    bytes: Buffer.byteLength(text, 'utf8'),
    policies: Object.freeze(['LC-009', 'CURRENT_MAIN_COORDINATOR', 'CANONICAL_TEXT_WRITE']),
  });
}

function parseArgs(argv) {
  const args = { file: null, mode: 'stdin-commonjs' };
  for (let index = 0; index < argv.length; index += 1) {
    const token = argv[index];
    if (token === '--file') {
      args.file = argv[index + 1];
      if (!args.file || args.file.startsWith('--')) fail('Falta valor de --file.');
      index += 1;
    } else if (token === '--mode') {
      args.mode = argv[index + 1];
      if (!args.mode || args.mode.startsWith('--')) fail('Falta valor de --mode.');
      index += 1;
    } else {
      fail(`Argumento desconocido: ${token}.`);
    }
  }
  if (!args.file) fail('Falta --file.');
  return args;
}

function main() {
  const args = parseArgs(process.argv.slice(2));
  const absolute = path.resolve(args.file);
  if (!fs.existsSync(absolute) || !fs.statSync(absolute).isFile()) {
    fail(`EXECUTABLE_FILE_MISSING:${args.file}`);
  }
  const source = fs.readFileSync(absolute, 'utf8');
  const report = validateExecutableSource(source, { mode: args.mode, filename: args.file });
  console.log('[EXECUTABLE DELIVERY] PASS');
  console.log(`[EXECUTABLE DELIVERY] MODE ${report.mode}`);
  console.log(`[EXECUTABLE DELIVERY] BYTES ${report.bytes}`);
  console.log('[EXECUTABLE DELIVERY] LC-009 PASS');
  console.log('[EXECUTABLE DELIVERY] CURRENT_MAIN_COORDINATOR PASS');
  console.log('[EXECUTABLE DELIVERY] CANONICAL_TEXT_WRITE PASS');
}

const isCli = process.argv[1]
  && path.resolve(process.argv[1]) === path.resolve(fileURLToPath(import.meta.url));

if (isCli) {
  try {
    main();
  } catch (error) {
    console.error('[EXECUTABLE DELIVERY] FAIL');
    console.error(error instanceof Error ? error.message : String(error));
    process.exitCode = Number.isInteger(error?.exitCode) ? error.exitCode : 1;
  }
}
