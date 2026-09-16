import assert from 'node:assert/strict';
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import test from 'node:test';
import { fileURLToPath } from 'node:url';

import {
    REQUIRED_CATEGORIES,
    assertLocalSupabaseCommand,
    discoverDatabaseTests,
    normalizeMode,
    parseConfiguredPostgresMajor,
    parsePgProveSummary,
    resolveNpmInvocation,
    summarizeFailureOutput,
    validatePackageScripts,
} from './supabase-db-harness.mjs';

function withTempRoot(callback) {
    const root = fs.mkdtempSync(path.join(os.tmpdir(), 'vento-db-harness-'));
    try {
        return callback(root);
    } finally {
        fs.rmSync(root, { recursive: true, force: true });
    }
}

function writeCategoryFixture(root, category, index = 0) {
    const directory = path.join(root, 'supabase', 'tests', 'database');
    fs.mkdirSync(directory, { recursive: true });
    fs.writeFileSync(
        path.join(directory, `${String(index).padStart(3, '0')}_${category.toLowerCase()}.test.sql`),
        `-- VENTO_DB_TEST_CATEGORY: ${category}\nselect 1;\n`,
        'utf8',
    );
}

test('normaliza exclusivamente los dos modos canonicos', () => {
    assert.equal(normalizeMode('incremental'), 'incremental');
    assert.equal(normalizeMode('CLEAN'), 'clean');
    assert.throws(() => normalizeMode('linked'), /MODE_INVALID/u);
});

test('resuelve PostgreSQL major desde config.toml', () => {
    assert.equal(parseConfiguredPostgresMajor('[db]\nmajor_version = 17\n'), 17);
    assert.throws(() => parseConfiguredPostgresMajor('[db]\nport = 54322\n'), /POSTGRES_MAJOR_CONFIG_MISSING/u);
});

test('descubre una categoria por archivo y exige las cinco categorias', () => {
    withTempRoot((root) => {
        REQUIRED_CATEGORIES.forEach((category, index) => writeCategoryFixture(root, category, index));
        const discovered = discoverDatabaseTests({ root });
        assert.equal(discovered.files.length, 5);
        for (const category of REQUIRED_CATEGORIES) assert.equal(discovered.categoryFiles[category].length, 1);
    });

    withTempRoot((root) => {
        REQUIRED_CATEGORIES.slice(0, -1).forEach((category, index) => writeCategoryFixture(root, category, index));
        assert.throws(() => discoverDatabaseTests({ root }), /DATABASE_TEST_CATEGORY_EMPTY:MIGRATIONS/u);
    });
});

test('rechaza archivo sin marcador o con marcador duplicado', () => {
    withTempRoot((root) => {
        REQUIRED_CATEGORIES.forEach((category, index) => writeCategoryFixture(root, category, index));
        const target = path.join(root, 'supabase', 'tests', 'database', '999_extra.test.sql');
        fs.writeFileSync(target, 'select 1;\n', 'utf8');
        assert.throws(() => discoverDatabaseTests({ root }), /DATABASE_TEST_CATEGORY_MARKER_COUNT/u);
    });
});

test('solo admite comandos Supabase locales cerrados', () => {
    for (const command of [
        ['--version'],
        ['status'],
        ['start'],
        ['db', 'reset'],
        ['test', 'db'],
    ]) assert.equal(assertLocalSupabaseCommand(command), true);

    assert.throws(() => assertLocalSupabaseCommand(['db', 'reset', '--linked']), /REMOTE_SUPABASE_FLAG_FORBIDDEN/u);
    assert.throws(() => assertLocalSupabaseCommand(['db', 'push']), /SUPABASE_COMMAND_NOT_ALLOWED/u);
    assert.throws(() => assertLocalSupabaseCommand(['link']), /SUPABASE_COMMAND_NOT_ALLOWED/u);
});

test('resuelve npm en Windows sin spawn directo de npm.cmd', () => {
    assert.deepEqual(
        resolveNpmInvocation({
            platform: 'win32',
            execPath: 'C:\\Program Files\\nodejs\\node.exe',
            npmExecPath: 'C:\\Program Files\\nodejs\\node_modules\\npm\\bin\\npm-cli.js',
            comspec: 'C:\\Windows\\System32\\cmd.exe',
        }),
        {
            command: 'C:\\Program Files\\nodejs\\node.exe',
            prefixArgs: ['C:\\Program Files\\nodejs\\node_modules\\npm\\bin\\npm-cli.js'],
        },
    );

    assert.deepEqual(
        resolveNpmInvocation({
            platform: 'win32',
            execPath: 'C:\\Program Files\\nodejs\\node.exe',
            npmExecPath: '',
            comspec: 'C:\\Windows\\System32\\cmd.exe',
        }),
        {
            command: 'C:\\Windows\\System32\\cmd.exe',
            prefixArgs: ['/d', '/s', '/c', 'npm.cmd'],
        },
    );
});

test('parsea unicamente resumen pg_prove PASS con conteos', () => {
    assert.deepEqual(
        parsePgProveSummary('All tests successful.\nFiles=5, Tests=20, 1 wallclock secs\nResult: PASS\n'),
        { files: 5, tests: 20, pass: true },
    );
    assert.throws(() => parsePgProveSummary('Files=5, Tests=20\nResult: FAIL\n'), /PGTAP_SUMMARY_INVALID/u);
});

test('resume el diagnostico real antes de la cola y redacta secretos', () => {
    const summary = summarizeFailureOutput({
        stdout: [
            'database/026_contract.test.sql ..',
            '# Failed test 5: direct routine inventory',
            '# have: 281',
            '# want: 279',
            ...Array.from({ length: 14 }, (_, index) => `noise-${index}`),
            'Files=24, Tests=1905',
            'Result: FAIL',
        ].join('\n'),
        stderr: 'ERROR SQLSTATE 42501 at postgresql://admin:secret@127.0.0.1:54322/postgres eyJabcdefghijklmnopqrstuvwxyz123456',
    });

    assert.match(summary, /Failed test 5/u);
    assert.match(summary, /have: 281/u);
    assert.match(summary, /want: 279/u);
    assert.match(summary, /Result: FAIL/u);
    assert.match(summary, /\[REDACTED_DB_URL\]/u);
    assert.match(summary, /\[REDACTED_TOKEN\]/u);
    assert.doesNotMatch(summary, /admin:secret/u);
});

test('package.json expone las tres entradas estables del harness', () => {
    const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '../..');
    const packageJson = JSON.parse(fs.readFileSync(path.join(root, 'package.json'), 'utf8'));
    assert.equal(validatePackageScripts(packageJson), true);
});
