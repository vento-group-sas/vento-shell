import assert from 'node:assert/strict';
import { createHash } from 'node:crypto';
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import test from 'node:test';
import { fileURLToPath } from 'node:url';

import {
    FROZEN_BASELINE_SHA256,
    QA_ONLY_ROLES_SQL,
    assertQaMarker,
    fingerprintQaTree,
    availableQaPorts,
    isolateQaConfig,
    prepareIsolatedQaReplay,
} from './supabase-qa-baseline.mjs';
import { canonicalMigrationBytes } from '../supabase/migration-manifest.mjs';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '../..');
const TEST_PORTS = [23001, 23002, 23003, 23004, 23005, 23006, 23007, 23008];
const TEST_PROJECT = 'vento-shell-qa-0123456789abcdef';
const sha256 = (value) => createHash('sha256').update(value).digest('hex');

test('QA pre-baseline ACL removes only postgres/public anon defaults, never supabase_admin', () => {
    assert.equal((QA_ONLY_ROLES_SQL.match(/alter default privileges for role postgres in schema public revoke all on/gu) || []).length, 3);
    assert.match(QA_ONLY_ROLES_SQL, /on tables from anon/u);
    assert.match(QA_ONLY_ROLES_SQL, /on functions from anon/u);
    assert.match(QA_ONLY_ROLES_SQL, /on sequences from anon/u);
    assert.doesNotMatch(QA_ONLY_ROLES_SQL, /alter default privileges for role supabase_admin/iu);
    assert.doesNotMatch(QA_ONLY_ROLES_SQL, /grant (?:all|select|insert|update|delete)/iu);
    assert.doesNotMatch(QA_ONLY_ROLES_SQL, /drop\s|truncate\s|delete from|update\s+[\w.]+\s+set/iu);
    assert.match(QA_ONLY_ROLES_SQL, /VENTO_QA_POSTGRES_DEFAULT_ACL_NOT_NORMALIZED/u);
    assert.match(QA_ONLY_ROLES_SQL, /VENTO_QA_MANAGED_DEFAULT_ACL_UNEXPECTED/u);
});

test('QA config requires unique project and exactly eight nonconflicting local ports', () => {
    const original = fs.readFileSync(path.join(ROOT, 'supabase', 'config.toml'), 'utf8');
    const config = isolateQaConfig(original, { projectId: TEST_PROJECT, ports: TEST_PORTS });
    assert.match(config, /project_id = "vento-shell-qa-0123456789abcdef"/u);
    assert.doesNotMatch(config, /project_id = "vento-shell"/u);
    for (const port of TEST_PORTS) assert.match(config, new RegExp('= ' + port + '(?:\\r?\\n|$)', 'u'));
    for (const shared of ['54321', '54322', '54320', '54329', '54323', '54324', '54327', '8083']) {
        assert.doesNotMatch(config, new RegExp('^\\s*(?:port|shadow_port|inspector_port)\\s*= ' + shared + '$', 'mu'));
    }
    assert.throws(() => isolateQaConfig(original, { projectId: 'vento-shell', ports: TEST_PORTS }), /PROJECT_ID_INVALID/u);
    assert.throws(() => isolateQaConfig(original, { projectId: TEST_PROJECT, ports: Array(8).fill(23001) }), /PORT_SET_INVALID/u);
    assert.throws(() => isolateQaConfig(original, { projectId: TEST_PROJECT, ports: TEST_PORTS.slice(0, 7) }), /PORT_SET_INVALID/u);
    assert.throws(() => isolateQaConfig(original.replace('port = 54321', 'port = 54322\nport = 54321'), { projectId: TEST_PROJECT, ports: Array.from({ length: 8 }, (_, i) => 23001 + i) }), /DUPLICATE_PORT/u);
});

test('QA prepared copy preserves every canonical migration byte, never copies remote CLI link', () => {
    const sourceMigrations = path.join(ROOT, 'supabase', 'migrations');
    const sourceBaseline = fs.readFileSync(path.join(sourceMigrations, '00000000000000_baseline.sql'));
    const baselineHash = sha256(canonicalMigrationBytes(sourceBaseline));
    assert.equal(baselineHash, FROZEN_BASELINE_SHA256);
    const session = prepareIsolatedQaReplay({
        root: ROOT,
        projectId: TEST_PROJECT,
        ports: Array.from({ length: 8 }, (_, i) => 23001 + i),
    });
    try {
        assert.equal(session.marker.scope, 'QA_LOCAL_ONLY');
        assert.equal(session.marker.source_migration_count, 23);
        assert.equal(session.marker.direct_parity_without_bootstrap_override, false);
        const qaSupabase = path.join(session.qaRoot, 'supabase');
        assert.equal(fs.existsSync(path.join(qaSupabase, '.temp', 'project-ref')), false);
        assert.equal(fs.existsSync(path.join(qaSupabase, '.temp', 'linked-project.json')), false);
        const canonicalRoles = fs.readFileSync(path.join(ROOT, 'supabase', 'roles.sql'), 'utf8');
        const qaRoles = fs.readFileSync(path.join(qaSupabase, 'roles.sql'), 'utf8');
        assert.equal(qaRoles, QA_ONLY_ROLES_SQL + '\n' + canonicalRoles);
        assert.equal(session.marker.source_roles_sha256, sha256(canonicalRoles));
        assert.equal(session.marker.qa_roles_sha256, sha256(qaRoles));
        assert.equal(fs.readFileSync(path.join(qaSupabase, 'config.toml'), 'utf8').includes('project_id = "' + TEST_PROJECT + '"'), true);
        const filenames = fs.readdirSync(sourceMigrations).filter((name) => name.endsWith('.sql')).sort();
        assert.equal(filenames.length, 23);
        for (const name of filenames) {
            const original = fs.readFileSync(path.join(sourceMigrations, name));
            const copy = fs.readFileSync(path.join(qaSupabase, 'migrations', name));
            assert.equal(copy.equals(original), true, name + ' must remain byte-identical');
        }
        assert.equal(sha256(canonicalMigrationBytes(fs.readFileSync(path.join(sourceMigrations, '00000000000000_baseline.sql')))), baselineHash);
        assert.equal(session.marker.source_migration_tree_sha256, fingerprintQaTree(sourceMigrations));
        assert.equal(session.marker.source_tests_tree_sha256, fingerprintQaTree(path.join(ROOT, 'supabase', 'tests')));
        assert.doesNotThrow(() => assertQaMarker(session.qaRoot, TEST_PROJECT));
        assert.throws(() => assertQaMarker(session.qaRoot, 'vento-shell-qa-ffffffffffffffff'), /QA_IDENTITY_MISMATCH/u);

        for (const relative of [
            'migrations/20260827153413_auth_db_005_anon_grant_containment.sql',
            'tests/database/024_auth_db_005_anon_grant_containment.test.sql',
            'roles.sql',
        ]) {
            const candidate = path.join(qaSupabase, ...relative.split('/'));
            const original = fs.readFileSync(candidate);
            try {
                fs.appendFileSync(candidate, '\n-- unauthorized QA mutation\n');
                assert.throws(() => assertQaMarker(session.qaRoot, TEST_PROJECT), /QA_SOURCE_INTEGRITY_MISMATCH/u, relative);
            } finally {
                fs.writeFileSync(candidate, original);
            }
            assert.doesNotThrow(() => assertQaMarker(session.qaRoot, TEST_PROJECT), relative);
        }
        const linked = path.join(qaSupabase, '.temp', 'project-ref');
        try {
            fs.mkdirSync(path.dirname(linked), { recursive: true });
            fs.writeFileSync(linked, 'disallowed-linked-ref', 'utf8');
            assert.throws(() => assertQaMarker(session.qaRoot, TEST_PROJECT), /QA_SOURCE_INTEGRITY_MISMATCH/u);
        } finally {
            fs.rmSync(path.dirname(linked), { recursive: true, force: true });
        }
    } finally {
        // Test removes only the uniquely named scratch directory it created.
        assert.equal(session.qaRoot.startsWith(fs.realpathSync(os.tmpdir()) + path.sep), true);
        assert.equal(fs.readFileSync(path.join(session.qaRoot, 'vento-qa-bootstrap.json'), 'utf8').includes(TEST_PROJECT), true);
        fs.rmSync(session.qaRoot, { recursive: true, force: true });
    }
});

test('port allocator returns distinct available local-only ports', async () => {
    const ports = await availableQaPorts();
    assert.equal(ports.length, 8);
    assert.equal(new Set(ports).size, 8);
    assert.equal(ports.every((port) => Number.isInteger(port) && port > 1024 && port < 65536), true);
});
