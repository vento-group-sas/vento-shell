// AUTH-DB-027 QA-only replay preflight. Never edits canonical migrations or targets hosted.
import { createHash, randomBytes } from 'node:crypto';
import fs from 'node:fs';
import net from 'node:net';
import os from 'node:os';
import path from 'node:path';
import { spawnSync } from 'node:child_process';
import { fileURLToPath } from 'node:url';

import { canonicalMigrationBytes, checkManifest } from '../supabase/migration-manifest.mjs';
import { parsePgProveSummary, resolveNpmInvocation } from './supabase-db-harness.mjs';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '../..');
const BASELINE = '00000000000000_baseline.sql';
export const FROZEN_BASELINE_SHA256 = 'b8437e5d0e767566f1021d22781e23d8956cd7383f986298562a562c24b913d3';
const REQUIRED_PORT_KEYS = Object.freeze([
    'api.port', 'db.port', 'db.shadow_port', 'db.pooler.port',
    'studio.port', 'local_smtp.port', 'edge_runtime.inspector_port', 'analytics.port',
]);
const EXCLUDED_SERVICES = [
    'gotrue', 'realtime', 'storage-api', 'imgproxy', 'kong', 'mailpit',
    'postgrest', 'postgres-meta', 'studio', 'edge-runtime', 'logflare',
    'vector', 'supavisor',
];
const QA_MARKER = 'vento-qa-bootstrap.json';

function sha256(value) {
    return createHash('sha256').update(value).digest('hex');
}
function fail(message) {
    throw new Error('VENTO_QA_BOOTSTRAP_' + message);
}

export const QA_ONLY_ROLES_SQL = [
    '-- QA-ONLY PRE-BASELINE ROLE PRECONDITION. Never deploy or copy to a tracked Supabase project.',
    '-- Applied by the local CLI before migrations, only inside a unique throwaway --workdir.',
    'begin;',
    'do $qa_role_preflight$ begin',
    "  if (select count(*) from pg_catalog.pg_default_acl d join pg_catalog.pg_namespace n on n.oid=d.defaclnamespace where d.defaclrole='supabase_admin'::pg_catalog.regrole::oid and n.nspname='public' and d.defaclobjtype in ('r','f','S') and exists (select 1 from pg_catalog.aclexplode(d.defaclacl) a where a.grantee='anon'::pg_catalog.regrole::oid)) <> 3 then",
    "    raise exception 'VENTO_QA_MANAGED_DEFAULT_ACL_UNEXPECTED';",
    '  end if;',
    'end $qa_role_preflight$;',
    'alter default privileges for role postgres in schema public revoke all on tables from anon;',
    'alter default privileges for role postgres in schema public revoke all on functions from anon;',
    'alter default privileges for role postgres in schema public revoke all on sequences from anon;',
    'do $qa_role_postflight$ begin',
    "  if exists (select 1 from pg_catalog.pg_default_acl d join pg_catalog.pg_namespace n on n.oid=d.defaclnamespace where d.defaclrole='postgres'::pg_catalog.regrole::oid and n.nspname='public' and d.defaclobjtype in ('r','f','S') and exists (select 1 from pg_catalog.aclexplode(d.defaclacl) a where a.grantee='anon'::pg_catalog.regrole::oid)) then",
    "    raise exception 'VENTO_QA_POSTGRES_DEFAULT_ACL_NOT_NORMALIZED';",
    '  end if;',
    'end $qa_role_postflight$;',
    'commit;',
    '',
].join('\n');

export function isolateQaConfig(source, { projectId, ports }) {
    if (!/^vento-shell-qa-[a-f0-9]{16}$/u.test(projectId)) fail('PROJECT_ID_INVALID');
    if (!Array.isArray(ports) || ports.length !== REQUIRED_PORT_KEYS.length
        || new Set(ports).size !== ports.length
        || ports.some((port) => !Number.isInteger(port) || port < 1024 || port > 65535)) {
        fail('PORT_SET_INVALID');
    }
    const assigned = Object.fromEntries(REQUIRED_PORT_KEYS.map((key, index) => [key, ports[index]]));
    const found = new Set();
    let section = '';
    let projectCount = 0;
    const output = String(source).split('\n').map((line) => {
        const nextSection = /^\s*\[([A-Za-z0-9_.]+)\]\s*$/u.exec(line);
        if (nextSection) section = nextSection[1];
        if (/^\s*project_id\s*=/u.test(line)) {
            projectCount += 1;
            return 'project_id = "' + projectId + '"';
        }
        const keyMatch = /^\s*(port|shadow_port|inspector_port)\s*=\s*\d+\s*$/u.exec(line);
        if (!keyMatch) return line;
        const key = section + '.' + keyMatch[1];
        if (!Object.hasOwn(assigned, key)) fail('UNREVIEWED_PORT:' + key);
        if (found.has(key)) fail('DUPLICATE_PORT:' + key);
        found.add(key);
        return keyMatch[1] + ' = ' + assigned[key];
    }).join('\n');
    if (projectCount !== 1 || found.size !== REQUIRED_PORT_KEYS.length) fail('CONFIG_PORT_OR_PROJECT_INCOMPLETE');
    if (output.includes('project_id = "vento-shell"')) fail('SHARED_PROJECT_ID');
    return output;
}

export async function availableQaPorts(count = REQUIRED_PORT_KEYS.length) {
    const servers = [];
    try {
        for (let index = 0; index < count; index += 1) {
            const server = net.createServer();
            const port = await new Promise((resolve, reject) => {
                server.once('error', reject);
                server.listen(0, '127.0.0.1', () => resolve(server.address().port));
            });
            servers.push({ server, port });
        }
        const ports = servers.map((entry) => entry.port);
        if (new Set(ports).size !== count) fail('PORT_ALLOCATION_CONFLICT');
        return ports;
    } finally {
        await Promise.all(servers.map(({ server }) => new Promise((resolve) => server.close(resolve))));
    }
}

function assertNoSymbolicLinks(directory) {
    for (const entry of fs.readdirSync(directory, { withFileTypes: true })) {
        if (entry.isSymbolicLink()) fail('SOURCE_SYMLINK_FORBIDDEN');
        if (entry.isDirectory()) assertNoSymbolicLinks(path.join(directory, entry.name));
        else if (!entry.isFile()) fail('SOURCE_FILE_TYPE_FORBIDDEN');
    }
}
function assertQaMarker(qaRoot, projectId) {
    const marker = JSON.parse(fs.readFileSync(path.join(qaRoot, QA_MARKER), 'utf8'));
    const config = fs.readFileSync(path.join(qaRoot, 'supabase', 'config.toml'), 'utf8');
    if (marker.project_id !== projectId || marker.scope !== 'QA_LOCAL_ONLY'
        || !config.includes('project_id = "' + projectId + '"')
        || !fs.realpathSync(qaRoot).startsWith(fs.realpathSync(os.tmpdir()) + path.sep)) {
        fail('QA_IDENTITY_MISMATCH');
    }
    if (fs.existsSync(path.join(qaRoot, 'supabase', '.temp', 'project-ref'))
        || fs.existsSync(path.join(qaRoot, 'supabase', '.temp', 'linked-project.json'))
        || sha256(fs.readFileSync(path.join(qaRoot, 'supabase', 'roles.sql'))) !== marker.qa_roles_sha256
        || sha256(canonicalMigrationBytes(fs.readFileSync(path.join(qaRoot, 'supabase', 'migrations', BASELINE)))) !== marker.source_baseline_sha256) {
        fail('QA_SOURCE_INTEGRITY_MISMATCH');
    }
    return marker;
}

export function prepareIsolatedQaReplay({
    root = ROOT,
    tmpRoot = os.tmpdir(),
    projectId = 'vento-shell-qa-' + randomBytes(8).toString('hex'),
    ports,
} = {}) {
    if (!Array.isArray(ports)) fail('PORTS_REQUIRED');
    const migrations = path.join(root, 'supabase', 'migrations');
    const tests = path.join(root, 'supabase', 'tests');
    const configFile = path.join(root, 'supabase', 'config.toml');
    const canonicalRolesFile = path.join(root, 'supabase', 'roles.sql');
    const manifest = checkManifest({ root });
    const originalBaseline = fs.readFileSync(path.join(migrations, BASELINE));
    if (sha256(canonicalMigrationBytes(originalBaseline)) !== FROZEN_BASELINE_SHA256) fail('FROZEN_BASELINE_SHA_CHANGED');
    if (manifest.summary.files !== 23) fail('MIGRATION_COUNT_CHANGED');
    if (!fs.existsSync(tests) || !fs.statSync(tests).isDirectory()) fail('TEST_FILES_MISSING');
    assertNoSymbolicLinks(migrations);
    assertNoSymbolicLinks(tests);
    const config = isolateQaConfig(fs.readFileSync(configFile, 'utf8'), { projectId, ports });
    const canonicalRoles = fs.readFileSync(canonicalRolesFile, 'utf8');
    if (!canonicalRoles.includes('vento_authorization_owner') || !canonicalRoles.includes('vento_ddl_owner')) fail('CANONICAL_ROLES_UNEXPECTED');
    const combinedRoles = QA_ONLY_ROLES_SQL + '\n' + canonicalRoles;
    const realTemp = fs.realpathSync(os.tmpdir());
    const realRequested = fs.realpathSync(tmpRoot);
    if (realRequested !== realTemp) fail('TEMP_ROOT_OUTSIDE_SYSTEM_TEMP');
    const qaRoot = fs.mkdtempSync(path.join(realTemp, 'vento-db-qa-'));
    const qaSupabase = path.join(qaRoot, 'supabase');
    fs.mkdirSync(qaSupabase);
    fs.cpSync(migrations, path.join(qaSupabase, 'migrations'), { recursive: true, force: false, errorOnExist: true, dereference: false });
    fs.cpSync(tests, path.join(qaSupabase, 'tests'), { recursive: true, force: false, errorOnExist: true, dereference: false });
    fs.writeFileSync(path.join(qaSupabase, 'config.toml'), config);
    fs.writeFileSync(path.join(qaSupabase, 'roles.sql'), combinedRoles);
    const migrationCopy = fs.readFileSync(path.join(qaSupabase, 'migrations', BASELINE));
    if (!migrationCopy.equals(originalBaseline)) fail('BASELINE_BYTES_CHANGED_DURING_COPY');
    const marker = {
        scope: 'QA_LOCAL_ONLY',
        project_id: projectId,
        source_migration_count: manifest.summary.files,
        source_baseline_sha256: sha256(originalBaseline),
        source_roles_sha256: sha256(canonicalRoles),
        qa_roles_sha256: sha256(combinedRoles),
        prebaseline_acl_override: true,
        direct_parity_without_bootstrap_override: false,
        source_copy_has_remote_link: false,
    };
    fs.writeFileSync(path.join(qaRoot, QA_MARKER), JSON.stringify(marker, null, 2) + '\n');
    assertQaMarker(qaRoot, projectId);
    return { qaRoot, projectId, marker };
}

function runLocalCli({ root, qaRoot, args, timeout }) {
    const allow = new Set(['--version', 'start', 'test db', 'status', 'stop']);
    const subcommand = args.join(' ');
    if (!allow.has(subcommand)) fail('CLI_COMMAND_FORBIDDEN');
    const invocation = resolveNpmInvocation();
    const argv = [...invocation.prefixArgs, 'exec', '--', 'supabase', '--workdir', qaRoot, ...args];
    if (subcommand === 'start') argv.push('--exclude', EXCLUDED_SERVICES.join(','));
    const env = { ...process.env };
    for (const name of ['SUPABASE_ACCESS_TOKEN', 'SUPABASE_DB_PASSWORD', 'SUPABASE_PROJECT_REF', 'DATABASE_URL', 'PGPASSWORD']) delete env[name];
    const result = spawnSync(invocation.command, argv, {
        cwd: root, env, encoding: 'utf8', windowsHide: true,
        timeout, maxBuffer: 8 * 1024 * 1024, stdio: ['ignore', 'pipe', 'pipe'],
    });
    return {
        status: result.status ?? 1,
        timed_out: result.error?.code === 'ETIMEDOUT',
        output_sha256: sha256(String(result.stdout || '') + '\n' + String(result.stderr || '')),
        text: String(result.stdout || '') + '\n' + String(result.stderr || ''),
    };
}

export async function replayIsolatedQa({ root = ROOT } = {}) {
    const ports = await availableQaPorts();
    const session = prepareIsolatedQaReplay({ root, ports });
    let bootstrapAttempted = false;
    let result = 'FAIL';
    let tests = null;
    let bootstrap = null;
    let stop = null;
    try {
        assertQaMarker(session.qaRoot, session.projectId);
        const version = runLocalCli({ root, qaRoot: session.qaRoot, args: ['--version'], timeout: 30000 });
        if (version.status !== 0) fail('CLI_VERSION_PRECHECK_FAILED');
        bootstrapAttempted = true;
        bootstrap = runLocalCli({ root, qaRoot: session.qaRoot, args: ['start'], timeout: 300000 });
        if (bootstrap.status !== 0) fail('DISPOSABLE_BOOTSTRAP_FAILED');
        assertQaMarker(session.qaRoot, session.projectId);
        const testRun = runLocalCli({ root, qaRoot: session.qaRoot, args: ['test', 'db'], timeout: 240000 });
        tests = { status: testRun.status, output_sha256: testRun.output_sha256 };
        if (testRun.status !== 0) fail('PGTAP_REPLAY_FAILED');
        tests.summary = parsePgProveSummary(testRun.text);
        result = 'PASS';
    } catch (error) {
        result = String(error.message || error).replace(/[^\x20-\x7e]/gu, '');
    } finally {
        if (bootstrapAttempted) {
            // Always attempt project-scoped stop even when startup failed or timed out.
            // Its unique scratch project identity is rechecked before cleanup.
            assertQaMarker(session.qaRoot, session.projectId);
            const stopped = runLocalCli({ root, qaRoot: session.qaRoot, args: ['stop'], timeout: 90000 });
            stop = { status: stopped.status === 0 ? 'STOPPED' : 'BLOCKED_STOP_UNVERIFIED', output_sha256: stopped.output_sha256 };
            if (stopped.status !== 0) result = 'BLOCKED_QA_STOP_FAILED';
        } else {
            stop = { status: 'NOT_STARTED' };
        }
    }
    return {
        status: result === 'PASS' ? 'PASS' : 'FAIL',
        diagnostic: result,
        scope: 'QA_LOCAL_ONLY',
        baseline_sha256: session.marker.source_baseline_sha256,
        migration_count: session.marker.source_migration_count,
        bootstrap: bootstrap && { status: bootstrap.status, timed_out: bootstrap.timed_out, output_sha256: bootstrap.output_sha256 },
        tests,
        stop,
        direct_parity_without_bootstrap_override: false,
        qa_project_id: session.projectId,
        qa_root: session.qaRoot,
    };
}

async function main() {
    const mode = process.argv[2];
    if (!['prepare', 'replay'].includes(mode)) fail('MODE_INVALID');
    const ports = await availableQaPorts();
    if (mode === 'prepare') {
        const session = prepareIsolatedQaReplay({ ports });
        console.log(JSON.stringify({ status: 'PREPARED_NOT_EXECUTED', qa_project_id: session.projectId, qa_root: session.qaRoot, ...session.marker }));
        return;
    }
    const result = await replayIsolatedQa();
    console.log(JSON.stringify(result));
    if (result.status !== 'PASS') process.exitCode = 1;
}

const isCli = process.argv[1] && path.resolve(process.argv[1]) === path.resolve(fileURLToPath(import.meta.url));
if (isCli) main().catch((error) => {
    console.error(String(error.message || error).replace(/[^\x20-\x7e]/gu, ''));
    process.exitCode = 1;
});
