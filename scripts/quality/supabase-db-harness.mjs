import fs from 'node:fs';
import path from 'node:path';
import { spawnSync } from 'node:child_process';
import { fileURLToPath } from 'node:url';

import { checkManifest } from '../supabase/migration-manifest.mjs';

export const REQUIRED_CATEGORIES = Object.freeze([
    'SCHEMA',
    'INTEGRITY',
    'RLS',
    'RPC',
    'MIGRATIONS',
]);

const TESTS_RELATIVE = 'supabase/tests/database';
const CONFIG_RELATIVE = 'supabase/config.toml';
const RESULT_START = '=== RESULTADO PARA CHATGPT ===';
const RESULT_END = '=== FIN RESULTADO PARA CHATGPT ===';
const CATEGORY_PATTERN = /^--\s*VENTO_DB_TEST_CATEGORY:\s*(SCHEMA|INTEGRITY|RLS|RPC|MIGRATIONS)\s*$/gmu;

function fail(message) {
    const error = new Error(message);
    error.exitCode = 1;
    throw error;
}

function repoRootFromModule() {
    return path.resolve(path.dirname(fileURLToPath(import.meta.url)), '../..');
}

function normalizeRepoPath(value) {
    return String(value ?? '').replaceAll('\\', '/').replace(/^\.\//u, '');
}

export function normalizeMode(value) {
    const mode = String(value ?? '').trim().toLowerCase();
    if (!['incremental', 'clean'].includes(mode)) {
        fail(`MODE_INVALID:${mode || 'EMPTY'}:expected=incremental|clean`);
    }
    return mode;
}

export function parseConfiguredPostgresMajor(source) {
    const match = /^major_version\s*=\s*(\d+)\s*$/mu.exec(String(source ?? ''));
    if (!match) fail('POSTGRES_MAJOR_CONFIG_MISSING');
    const major = Number(match[1]);
    if (!Number.isInteger(major) || major <= 0) fail('POSTGRES_MAJOR_CONFIG_INVALID');
    return major;
}

function listDatabaseTestFiles(directory, prefix = '') {
    const entries = fs.readdirSync(directory, { withFileTypes: true })
        .sort((left, right) => left.name.localeCompare(right.name, 'en'));
    const files = [];
    for (const entry of entries) {
        const relative = prefix ? `${prefix}/${entry.name}` : entry.name;
        const absolute = path.join(directory, entry.name);
        if (entry.isDirectory()) {
            files.push(...listDatabaseTestFiles(absolute, relative));
            continue;
        }
        if (entry.isFile() && /\.(?:sql|pg)$/u.test(entry.name)) files.push(relative);
    }
    return files;
}

export function discoverDatabaseTests({ root = repoRootFromModule() } = {}) {
    const directory = path.join(root, ...TESTS_RELATIVE.split('/'));
    if (!fs.existsSync(directory) || !fs.statSync(directory).isDirectory()) {
        fail(`DATABASE_TEST_DIRECTORY_MISSING:${TESTS_RELATIVE}`);
    }

    const files = listDatabaseTestFiles(directory);
    if (files.length === 0) fail('DATABASE_TEST_FILES_ZERO');

    const categoryFiles = new Map(REQUIRED_CATEGORIES.map((category) => [category, []]));
    for (const relative of files) {
        const source = fs.readFileSync(path.join(directory, ...relative.split('/')), 'utf8');
        const markers = [...source.matchAll(CATEGORY_PATTERN)].map((match) => match[1]);
        if (markers.length !== 1) {
            fail(`DATABASE_TEST_CATEGORY_MARKER_COUNT:${normalizeRepoPath(`${TESTS_RELATIVE}/${relative}`)}:${markers.length}`);
        }
        categoryFiles.get(markers[0]).push(relative);
    }

    const missing = REQUIRED_CATEGORIES.filter((category) => categoryFiles.get(category).length === 0);
    if (missing.length > 0) fail(`DATABASE_TEST_CATEGORY_EMPTY:${missing.join(',')}`);

    return {
        files,
        categoryFiles: Object.fromEntries(
            REQUIRED_CATEGORIES.map((category) => [category, [...categoryFiles.get(category)]]),
        ),
    };
}

export function assertLocalSupabaseCommand(args) {
    const normalized = (args ?? []).map((entry) => String(entry));
    const forbidden = normalized.filter((entry) => [
        '--linked',
        '--db-url',
        '--project-ref',
    ].some((token) => entry === token || entry.startsWith(`${token}=`)));
    if (forbidden.length > 0) fail(`REMOTE_SUPABASE_FLAG_FORBIDDEN:${forbidden.join(',')}`);

    const key = normalized.join(' ');
    const allowed = new Set([
        '--version',
        'status',
        'start',
        'db reset',
        'test db',
    ]);
    if (!allowed.has(key)) fail(`SUPABASE_COMMAND_NOT_ALLOWED:${key || 'EMPTY'}`);
    return true;
}

export function resolveNpmInvocation({
    platform = process.platform,
    execPath = process.execPath,
    npmExecPath = process.env.npm_execpath,
    comspec = process.env.ComSpec || process.env.COMSPEC,
} = {}) {
    if (npmExecPath) return { command: execPath, prefixArgs: [npmExecPath] };
    if (platform === 'win32') {
        if (!comspec) fail('COMSPEC_MISSING_FOR_NPM');
        return { command: comspec, prefixArgs: ['/d', '/s', '/c', 'npm.cmd'] };
    }
    return { command: 'npm', prefixArgs: [] };
}

function run(command, args, { cwd, allowFailure = false } = {}) {
    const result = spawnSync(command, args, {
        cwd,
        encoding: 'utf8',
        windowsHide: true,
        stdio: ['ignore', 'pipe', 'pipe'],
    });
    if (result.error) {
        if (allowFailure) return { status: 1, stdout: '', stderr: result.error.message };
        fail(`PROCESS_START_FAILED:${path.basename(command)}`);
    }
    const status = Number.isInteger(result.status) ? result.status : 1;
    const output = {
        status,
        stdout: String(result.stdout ?? '').trimEnd(),
        stderr: String(result.stderr ?? '').trimEnd(),
    };
    if (status !== 0 && !allowFailure) fail(`PROCESS_FAILED:${path.basename(command)}:exit=${status}`);
    return output;
}

function createSupabaseRunner(root) {
    const npmInvocation = resolveNpmInvocation();
    return (args, { allowFailure = false } = {}) => {
        assertLocalSupabaseCommand(args);
        return run(
            npmInvocation.command,
            [...npmInvocation.prefixArgs, 'exec', '--', 'supabase', ...args],
            { cwd: root, allowFailure },
        );
    };
}

function safeAscii(value) {
    return String(value ?? '')
        .replace(/postgres(?:ql)?:\/\/[^\s]+/giu, '[REDACTED_DB_URL]')
        .replace(/\b(?:eyJ|sb_[A-Za-z0-9_])[A-Za-z0-9._-]{20,}\b/gu, '[REDACTED_TOKEN]')
        .replace(/[^\x20-\x7E\r\n]/gu, '?');
}

export function summarizeFailureOutput(result, {
    maxDiagnosticLines = 24,
    maxTailLines = 10,
} = {}) {
    const lines = safeAscii([result?.stdout, result?.stderr].filter(Boolean).join('\n'))
        .split(/\r?\n/u)
        .map((line) => line.trim())
        .filter(Boolean);
    if (lines.length === 0) return '';

    const diagnosticPattern = /(?:\bnot ok\b|failed test|\bhave:\s*|\bwant:\s*|\bgot:\s*|\bexpected:\s*|\berror\b|sqlstate|failed \d+\/\d+ subtests)/iu;
    const diagnosticIndexes = lines
        .map((line, index) => diagnosticPattern.test(line) ? index : -1)
        .filter((index) => index >= 0);

    const selected = new Set();
    for (const index of diagnosticIndexes) {
        for (let cursor = Math.max(0, index - 1); cursor <= Math.min(lines.length - 1, index + 2); cursor += 1) {
            selected.add(cursor);
            if (selected.size >= maxDiagnosticLines) break;
        }
        if (selected.size >= maxDiagnosticLines) break;
    }
    for (let index = Math.max(0, lines.length - maxTailLines); index < lines.length; index += 1) {
        selected.add(index);
    }

    return [...selected]
        .sort((left, right) => left - right)
        .map((index) => lines[index])
        .join(' | ')
        .replace(/\s+/gu, ' ')
        .trim();
}

export function parsePgProveSummary(source) {
    const text = String(source ?? '');
    const files = /Files=(\d+)/u.exec(text);
    const tests = /Tests=(\d+)/u.exec(text);
    const pass = /Result:\s*PASS\b/u.test(text) && /All tests successful\./u.test(text);
    if (!files || !tests || !pass) fail('PGTAP_SUMMARY_INVALID');
    return { files: Number(files[1]), tests: Number(tests[1]), pass: true };
}

export function validatePackageScripts(packageJson) {
    const scripts = packageJson?.scripts ?? {};
    const expected = {
        'supabase:db:harness:test': 'node --test scripts/quality/supabase-db-harness.test.mjs',
        'supabase:db:test': 'node scripts/quality/supabase-db-harness.mjs incremental',
        'supabase:db:test:clean': 'node scripts/quality/supabase-db-harness.mjs clean',
    };
    for (const [name, command] of Object.entries(expected)) {
        if (scripts[name] !== command) fail(`PACKAGE_SCRIPT_MISMATCH:${name}`);
    }
    return true;
}

function printSuccess(summary) {
    console.log(RESULT_START);
    console.log('ESTADO: PASS');
    console.log('OPERACION: SUPABASE_DB_HARNESS');
    console.log(`MODE: ${summary.mode.toUpperCase()}`);
    console.log(`NODE_VERSION: ${safeAscii(summary.nodeVersion)}`);
    console.log(`SUPABASE_CLI_VERSION: ${safeAscii(summary.supabaseVersion)}`);
    console.log(`POSTGRES_MAJOR: ${summary.postgresMajor}`);
    console.log(`MIGRATIONS: ${summary.migrations}`);
    console.log(`TEST_FILES_DISCOVERED: ${summary.testFiles}`);
    console.log(`PGTAP_FILES_EXECUTED: ${summary.pgTapFiles}`);
    console.log(`ASSERTIONS: ${summary.assertions}`);
    for (const category of REQUIRED_CATEGORIES) console.log(`CATEGORY_${category}: PASS`);
    console.log('REMOTE_TARGETS_USED: NO');
    console.log('ERROR: NONE');
    console.log(RESULT_END);
}

function printFailure(error) {
    const message = error instanceof Error ? error.message : String(error);
    console.log(RESULT_START);
    console.log('ESTADO: FAIL');
    console.log('OPERACION: SUPABASE_DB_HARNESS');
    console.log(`ERROR: ${safeAscii(message).replace(/\s+/gu, ' ').trim()}`);
    console.log('REMOTE_TARGETS_USED: NO');
    console.log(RESULT_END);
}

export function runHarness({
    mode,
    root = repoRootFromModule(),
    supabaseRunner = null,
} = {}) {
    const selectedMode = normalizeMode(mode);
    const packageJson = JSON.parse(fs.readFileSync(path.join(root, 'package.json'), 'utf8'));
    validatePackageScripts(packageJson);

    const configSource = fs.readFileSync(path.join(root, ...CONFIG_RELATIVE.split('/')), 'utf8');
    const postgresMajor = parseConfiguredPostgresMajor(configSource);
    const tests = discoverDatabaseTests({ root });
    const migrationInventory = checkManifest({ root });
    const runSupabase = supabaseRunner ?? createSupabaseRunner(root);

    const version = runSupabase(['--version']);
    const supabaseVersion = safeAscii(version.stdout || version.stderr).split(/\r?\n/u)[0].trim();
    if (!supabaseVersion) fail('SUPABASE_CLI_VERSION_EMPTY');

    let status = runSupabase(['status'], { allowFailure: true });
    if (selectedMode === 'incremental' && status.status !== 0) {
        fail('LOCAL_SUPABASE_STACK_NOT_RUNNING');
    }
    if (selectedMode === 'clean' && status.status !== 0) {
        const start = runSupabase(['start'], { allowFailure: true });
        if (start.status !== 0) fail(`LOCAL_SUPABASE_START_FAILED:${summarizeFailureOutput(start) || `exit=${start.status}`}`);
        status = runSupabase(['status'], { allowFailure: true });
        if (status.status !== 0) fail('LOCAL_SUPABASE_STACK_NOT_READY_AFTER_START');
    }

    if (selectedMode === 'clean') {
        const reset = runSupabase(['db', 'reset'], { allowFailure: true });
        if (reset.status !== 0) fail(`LOCAL_DB_RESET_FAILED:${summarizeFailureOutput(reset) || `exit=${reset.status}`}`);
    }

    const testResult = runSupabase(['test', 'db'], { allowFailure: true });
    if (testResult.status !== 0) {
        fail(`PGTAP_FAILED:${summarizeFailureOutput(testResult) || `exit=${testResult.status}`}`);
    }
    const pgTap = parsePgProveSummary(`${testResult.stdout}\n${testResult.stderr}`);
    if (pgTap.files < tests.files.length) {
        fail(`PGTAP_FILE_COUNT_TOO_LOW:discovered=${tests.files.length}:executed=${pgTap.files}`);
    }

    return {
        mode: selectedMode,
        nodeVersion: process.version,
        supabaseVersion,
        postgresMajor,
        migrations: migrationInventory.summary.files,
        testFiles: tests.files.length,
        pgTapFiles: pgTap.files,
        assertions: pgTap.tests,
    };
}

function main() {
    try {
        printSuccess(runHarness({ mode: process.argv[2] }));
    } catch (error) {
        printFailure(error);
        process.exitCode = Number.isInteger(error?.exitCode) ? error.exitCode : 1;
    }
}

const isCli = process.argv[1]
    && path.resolve(process.argv[1]) === path.resolve(fileURLToPath(import.meta.url));

if (isCli) main();
