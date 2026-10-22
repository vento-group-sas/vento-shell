import { randomBytes, randomUUID } from 'node:crypto';
import { createClient } from '@supabase/supabase-js';
import fs from 'node:fs';
import os from 'node:os';
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


// Read-only QA profile adapter; no Auth user creation, role changes, or grants.
export const QA_ISOLATED_PROFILES = Object.freeze({
    'GAP-PKG-004': Object.freeze({
        project:'vento-shell-gap-pkg-004-qa',
        directory:'VENTO_GAP_PKG_004_QA_ISOLADO',
        apiPort:23151, dbPort:20545,
        databaseContainerPrefix:'supabase-VENTO_GAP_PKG_004_QA_ISOLADO-database-',
        migration:'20261012173553', expectedHistory:23,
        appCode:'viso', permissionCode:'workforce.employees.view',
        legacyCode:'staff.read', route:'/staff/[id]',
    }),
});
function qaFail(code) {
    const error=new Error(code);
    error.exitCode=1;
    throw error;
}
export function validateIsolatedQaEndpoints(report, profile) {
    if (!report || !profile ||
        ['API_URL','DB_URL','SERVICE_ROLE_KEY'].some(k=>typeof report[k]!=='string'||!report[k]))
        qaFail('QA_STATUS_FIELDS_MISSING');
    let api,db;
    try { api=new URL(report.API_URL);db=new URL(report.DB_URL); }
    catch { qaFail('QA_STATUS_URL_INVALID'); }
    if (api.protocol!=='http:' || api.hostname!=='127.0.0.1' ||
        Number(api.port)!==profile.apiPort || api.pathname!=='/' ||
        api.search || api.hash || api.username || api.password ||
        !['postgres:','postgresql:'].includes(db.protocol) ||
        db.hostname!=='127.0.0.1' || Number(db.port)!==profile.dbPort ||
        db.pathname!=='/postgres' || db.search || db.hash)
        qaFail('QA_STATUS_ENDPOINT_NOT_ISOLATED');
    return {api:api.origin,key:report.SERVICE_ROLE_KEY};
}
export function parseIsolatedQaStatus(source) {
    const result=Object.create(null);
    for (const line of String(source).split(/\r?\n/u)) {
        const m=/^\s*(?:export\s+)?(API_URL|DB_URL|SERVICE_ROLE_KEY|ANON_KEY)\s*=\s*(.*?)\s*$/u.exec(line);
        if (!m) continue;
        if (Object.hasOwn(result,m[1])) qaFail('QA_STATUS_DUPLICATE_KEY');
        result[m[1]]=m[2].replace(/^(?:"(.*)"|'(.*)')$/u,(_,a,b)=>a??b);
    }
    return result;
}
export function validateIsolatedQaLabels(labels,profile) {
    // Runtime UUID and Compose hash are ephemeral, not canonical constants.
    const directory=profile?.directory;
    const namespace=typeof directory==='string' && /^[A-Za-z0-9_]+$/u.test(directory)
        ? 'supabase-'+directory.toLowerCase()+'-' : '';
    const compose=labels?.['com.docker.compose.project'];
    const instance=labels?.['com.supabase.instance'];
    if (!namespace || !labels || typeof labels!=='object' || Array.isArray(labels) ||
        typeof compose!=='string' || !compose.startsWith(namespace) ||
        !/^[a-f0-9]{12,64}$/u.test(compose.slice(namespace.length)) ||
        typeof instance!=='string' ||
        !/^[a-f0-9]{8}-(?:[a-f0-9]{4}-){3}[a-f0-9]{12}$/iu.test(instance) ||
        labels['com.supabase.service']!=='database') qaFail('QA_DOCKER_IDENTITY_MISMATCH');
    return true;
}
export function resolveIsolatedQaDatabaseContainer(run, profile, root) {
    const directory=profile?.directory;
    const expectedPrefix=typeof directory==='string' &&
        /^[A-Za-z0-9_]+$/u.test(directory)
        ? 'supabase-'+directory+'-database-' : '';
    if (!expectedPrefix || profile.databaseContainerPrefix!==expectedPrefix) {
        qaFail('QA_DOCKER_PROFILE_INVALID');
    }
    // Re-discover ONE running QA database on every invocation. Never filter
    // by stale Compose hash, Supabase instance UUID or container suffix.
    const output = run('docker', [
        'ps',
        '--filter', 'label=com.supabase.service=database',
        '--format', '{{.Names}}',
    ], { cwd: root });
    const names = String(output).split(/\r?\n/u).map(name => name.trim())
        .filter(name => name.startsWith(expectedPrefix));
    if (names.length !== 1 ||
        !/^[a-f0-9]{12,64}$/u.test(names[0].slice(expectedPrefix.length))) {
        qaFail('QA_DOCKER_DATABASE_CONTAINER_MISSING_OR_AMBIGUOUS');
    }
    const name = names[0];
    let labels;
    try {
        labels = JSON.parse(run('docker', [
            'inspect', '--format', '{{json .Config.Labels}}', name,
        ], { cwd: root }));
    } catch {
        qaFail('QA_DOCKER_LABELS_INVALID');
    }
    validateIsolatedQaLabels(labels, profile);
    if (run('docker', [
        'inspect', '--format', '{{.State.Running}}', name,
    ], { cwd: root }) !== 'true') qaFail('QA_DOCKER_CONTAINER_NOT_RUNNING');
    return name;
}
export function readIsolatedQaScenarios(gate,profile) {
    if (!gate || gate.package_id!=='GAP-PKG-004' ||
        gate.status!=='MATURATION_DRAFT' ||
        !Array.isArray(gate.evidence_plan?.tests) ||
        !Array.isArray(gate.physical_identity?.targets)) qaFail('QA_CANONICAL_GATE_INVALID');
    const scopes=gate.evidence_plan.tests.filter(t=>
        t.command==='MCP_BROWSER_QA_READ_ONLY' &&
        t.qa_scope?.route_pattern===profile.route &&
        t.qa_scope?.repository==='vento-group-sas/vento-viso');
    if (scopes.length!==1 || !Array.isArray(scopes[0].qa_scope.scenarios) ||
        !gate.physical_identity.targets.some(t=>t.repository==='vento-group-sas/vento-viso' &&
        t.path===scopes[0].qa_scope.target_path && ['CREAR','MODIFICAR'].includes(t.operation)))
        qaFail('QA_CANONICAL_SCOPE_INVALID');
    const scenarios=scopes[0].qa_scope.scenarios;
    const keys=scenarios.map(s=>s.key);
    if (scenarios.length!==3 || new Set(keys).size!==3 ||
        !['same_site','cross_site_global','cross_site_site_only'].every(k=>keys.includes(k)) ||
        scenarios.some(s=>!['allow','deny'].includes(s.expected_access) ||
            !Array.isArray(s.identities) || !Array.isArray(s.checks) ||
            !s.identities.some(i=>i.key==='operator') ||
            !s.identities.some(i=>i.key==='target') ||
            s.checks.some(c=>!['viso.access','viso.'+profile.permissionCode].includes(c.code))))
        qaFail('QA_CANONICAL_SCENARIOS_DRIFT');
    return keys;
}
function qaReadFile(filename) {
    try {
        const stat=fs.lstatSync(filename);
        if (!stat.isFile() || stat.isSymbolicLink()) qaFail('QA_FILE_UNSAFE');
        return fs.readFileSync(filename,'utf8');
    } catch { qaFail('QA_FILE_MISSING_OR_UNSAFE'); }
}
function qaRunFixed(command,args,opts={}) {
    const r=spawnSync(command,args,{
        cwd:opts.cwd,env:opts.env??process.env,encoding:'utf8',input:opts.input,
        timeout:opts.timeout??15000,windowsHide:true,
        maxBuffer:128*1024,shell:false
    });
    if (r.error || r.status!==0) {
        if (command==='docker' && args[0]==='inspect') qaFail('QA_DOCKER_INSPECT_FAILED');
        if (command==='docker' && args[0]==='exec') qaFail('QA_DOCKER_SQL_FAILED');
        if (args.includes('status')) {
            // Classify status failures without emitting stdout, stderr or local credentials.
            const stderr=String(r.stderr??'')+'\n'+String(r.stdout??'');
            const safeTerms=new Set([
                'error','failed','unable','cannot','docker','daemon','container',
                'supabase','cli','stack','project','config','file','directory',
                'not','running','stopped','unknown','invalid','missing','found',
                'network','connect','connection','refused','permission','denied',
                'timeout','timed','out','context','service','start','status',
                'failed','login','required','backend','gateway','native','npm',
                'offline','cached','install','resolve','version','environment',
                'experimental','output','system','database','port','command',
                'flag','unsupported','process','settings','instance','engine'
            ]);
            const terms=[...new Set((stderr.toLowerCase().match(/\b[a-z]{3,20}\b/gu)??[])
                .filter(word=>safeTerms.has(word)))].slice(0,18);
            console.log('QA_CLI_STATUS_TERMS: '+(terms.join('_')||'NONE'));
            const stderrCategory=[
                ['INVALID_FLAG',/unknown flag|flag provided but not defined|unknown shorthand flag/iu],
                ['STACK_NOT_RUNNING',/local development setup is not running|stack.*not running|no such container/iu],
                ['DOCKER_UNAVAILABLE',/cannot connect to (?:the )?docker daemon|docker daemon is not running/iu],
                ['CONFIG_INVALID',/config[.]toml|invalid config|failed to parse|toml/iu],
                ['NETWORK_UNAVAILABLE',/connection refused|connect refused|dial tcp|connection timed out/iu],
                ['PERMISSION_DENIED',/permission denied|access is denied/iu],
            ].find(([,pattern])=>pattern.test(stderr))?.[0]??'UNCLASSIFIED';
            const spawnCode=['ENOENT','EACCES','ETIMEDOUT'].includes(r.error?.code)
                ?r.error.code:'NONE';
            const exitCode=Number.isInteger(r.status)&&r.status>=0&&r.status<=255
                ?String(r.status):'NONE';
            console.log('QA_CLI_STATUS_DIAGNOSTIC: EXIT_'+exitCode+
                '__SPAWN_'+spawnCode+'__STDERR_'+stderrCategory);
            qaFail('QA_OFFLINE_CLI_STATUS_FAILED');
        }
        qaFail('QA_LOCAL_COMMAND_FAILED');
    }
    return r.stdout.trim();
}
export function validateIsolatedQaDatabaseState(output, profile, visoId) {
    if (!profile || typeof visoId!=='string' ||
        !/^[0-9a-f]{8}-(?:[0-9a-f]{4}-){3}[0-9a-f]{12}$/iu.test(visoId) ||
        !new RegExp('^'+profile.expectedHistory+'\\|1\\|0\\|0\\|'+visoId+'\\|[01]\\|[01]$','u').test(output)) {
        qaFail('QA_REST_POSTGRES_IDENTITY_OR_SECURITY_DRIFT');
    }
    return true;
}
export function validateIsolatedQaAuthSchema(summary) {
    if (typeof summary!=='string') qaFail('QA_SCHEMA_DRIFT');
    const fields=summary.split('|');
    const allowed=fields[2]?.split(',')??[];
    if (fields.length!==3 || fields[0]!=='NONE' ||
        fields[1]!=='permission_scope_type' ||
        !allowed.includes('global') || !allowed.includes('site')) {
        qaFail('QA_SCHEMA_DRIFT');
    }
    return true;
}
export function parseIsolatedQaTemplateRlsSummary(summary) {
    const match=/^([0-3])\|([0-3])\|([01])\|([01])\|([01])\|([0-4])\|([01])\|(\d{1,7})$/u.exec(String(summary??'').trim());
    if (!match) qaFail('QA_TEMPLATE_RLS_SUMMARY_INVALID');
    const [,policies,rlsTables,invoker,authenticatedGrant,anonGrant,invokerViews,staffManage,activeTemplates]=match;
    return {
        restrictivePolicies:Number(policies),
        rlsTables:Number(rlsTables),
        invoker:invoker==='1',
        authenticatedGrant:authenticatedGrant==='1',
        anonGrant:anonGrant==='1',
        invokerViews:Number(invokerViews),
        staffManage:staffManage==='1',
        activeTemplates:Number(activeTemplates),
        ready:policies==='3' && rlsTables==='3' && invoker==='1' &&
            authenticatedGrant==='1' && anonGrant==='0' &&
            invokerViews==='4' && staffManage==='1'
    };
}

export async function runIsolatedQaPreflight({
    root=repoRootFromModule(),packageId='GAP-PKG-004',
    temp=os.tmpdir(),run=qaRunFixed,request=fetch,afterVerified=null,onOwnedRecovery=null
}={}) {
    const approvedProfile=QA_ISOLATED_PROFILES[packageId];
    if (!approvedProfile) qaFail('QA_PROFILE_NOT_APPROVED');
    const p={...approvedProfile};
    const qaRoot=path.join(temp,p.directory);
    const config=qaReadFile(path.join(qaRoot,'supabase','config.toml'));
    if (!new RegExp('^project_id\\s*=\\s*"' + p.project + '"\\s*$','m').test(config))
        qaFail('QA_PROJECT_IDENTITY_MISMATCH');
    const gate=JSON.parse(qaReadFile(path.join(root,'docs','plan-canonico','modular',
        'package-gate-instances',packageId+'.json')));
    const scenarios=readIsolatedQaScenarios(gate,p);
    p.databaseContainer=resolveIsolatedQaDatabaseContainer(run,p,root);
    const cliPackageRoot=path.join(root,'node_modules','supabase');
    const cliPackage=JSON.parse(qaReadFile(path.join(cliPackageRoot,'package.json')));
    const cliEntry=typeof cliPackage.bin==='string' ? cliPackage.bin : cliPackage.bin?.supabase;
    if (typeof cliEntry!=='string' || ! /^(?:bin|dist)\/[A-Za-z0-9_./-]+$/u.test(cliEntry) ||
        cliEntry.split('/').includes('..')) qaFail('QA_OFFLINE_CLI_ENTRY_UNSAFE');
    const cli=path.resolve(cliPackageRoot,cliEntry);
    let cliStat;
    try { cliStat=fs.lstatSync(cli); } catch { qaFail('QA_OFFLINE_CLI_NOT_INSTALLED'); }
    if (cliStat.isSymbolicLink() || !cliStat.isFile() || cliStat.size>8*1024*1024)
        qaFail('QA_OFFLINE_CLI_ENTRY_UNSAFE');
    const beginning=fs.readFileSync(cli).subarray(0,200).toString('utf8');
    const nodeScript=/\.(?:cjs|mjs|js)$/iu.test(cli) || /^#!.*\bnode\b/u.test(beginning);
    const cliArgs=['status','--env','--output-format','text'];
    let status;
    try {
        status=parseIsolatedQaStatus(run(nodeScript?process.execPath:cli,
            nodeScript?[cli,...cliArgs]:cliArgs,{
                cwd:qaRoot,env:{...process.env,SUPABASE_EXPERIMENTAL_STACK:'1'},timeout:20000
            }));
    } catch (error) {
        if (error?.message!=='QA_OFFLINE_CLI_STATUS_FAILED') throw error;
        const npm=resolveNpmInvocation();
        status=parseIsolatedQaStatus(run(npm.command,[...npm.prefixArgs,'exec',
            '--offline','--no','--package=supabase@2.121.0','--',
            'supabase',...cliArgs],{
                cwd:qaRoot,env:{...process.env,SUPABASE_EXPERIMENTAL_STACK:'1',
                    npm_config_offline:'true',npm_config_yes:'false'},timeout:20000
            }));
    }
    const backend=validateIsolatedQaEndpoints(status,p);
    const health=await request(backend.api+'/auth/v1/health',{
        method:'GET',redirect:'error',signal:AbortSignal.timeout(8000)
    });
    if (health.status!==200) qaFail('QA_AUTH_NOT_READY');
    const headers={apikey:backend.key,authorization:'Bearer '+backend.key,accept:'application/json'};
    const getRows=async (endpoint)=>{
        const res=await request(backend.api+endpoint,{
            method:'GET',headers,redirect:'error',signal:AbortSignal.timeout(8000)
        });
        if (res.status!==200) qaFail('QA_REST_UNAVAILABLE');
        const rows=await res.json();
        if (!Array.isArray(rows)) qaFail('QA_REST_NOT_ARRAY');
        return rows;
    };
    const apps=await getRows('/rest/v1/apps?select=id,code&code=eq.'+p.appCode);
    if (apps.length!==1 || apps[0].code!==p.appCode ||
        !/^[0-9a-f-]{36}$/iu.test(apps[0].id)) qaFail('QA_REST_APP_DRIFT');
    const canonical=await getRows('/rest/v1/app_permissions?select=app_id,code&code=eq.'+p.permissionCode);
    const legacy=await getRows('/rest/v1/app_permissions?select=app_id,code&code=eq.'+p.legacyCode);
    if (canonical.filter(x=>x.app_id===apps[0].id&&x.code===p.permissionCode).length!==1 ||
        legacy.some(x=>x.app_id===apps[0].id&&x.code===p.legacyCode))
        qaFail('QA_REST_CATALOG_DRIFT');
    const sql="SELECT concat_ws('|',"+
        "(SELECT count(*) FROM supabase_migrations.schema_migrations),"+
        "(SELECT count(*) FROM supabase_migrations.schema_migrations WHERE version='"+p.migration+"'),"+
        "(SELECT count(*) FROM public.role_permissions rp JOIN public.app_permissions ap ON rp.permission_id=ap.id"+
        " JOIN public.apps a ON ap.app_id=a.id WHERE a.code='"+p.appCode+"' AND ap.code='"+p.permissionCode+"'),"+
        "(SELECT count(*) FROM public.employee_permissions ep JOIN public.app_permissions ap ON ep.permission_id=ap.id"+
        " JOIN public.apps a ON ap.app_id=a.id WHERE a.code='"+p.appCode+"' AND ap.code='"+p.permissionCode+"'),"+
        "(SELECT id::text FROM public.apps WHERE code='"+p.appCode+"'),"+
        "(SELECT count(*) FROM public.roles WHERE code='cajero' AND is_active IS TRUE),"+
        "(SELECT count(*) FROM public.app_permissions ap JOIN public.apps a ON a.id=ap.app_id"+
        " WHERE a.code='viso' AND ap.code='access' AND ap.is_active IS TRUE));";
    const dbStatus=run('docker',['exec',p.databaseContainer,'psql','-X','-w','-q','-A','-t',
        '-v','ON_ERROR_STOP=1','-U','postgres','-d','postgres','-c',sql],{cwd:root});
    let dbDriftError=null;
    try { validateIsolatedQaDatabaseState(dbStatus,p,apps[0].id); }
    catch (error) {
        if (error?.message!=='QA_REST_POSTGRES_IDENTITY_OR_SECURITY_DRIFT') throw error;
        dbDriftError=error;
    }
    const qaAuditSql="SELECT concat_ws('|',"+
        "(SELECT count(*) FROM auth.users WHERE email LIKE 'gap004qa-%@example.invalid'),"+
        "(SELECT count(*) FROM public.sites WHERE code LIKE 'GAP004QA%'),"+
        "(SELECT count(*) FROM public.app_permissions WHERE code='access' AND name='GAP004 QA TEMP ACCESS'),"+
        "(SELECT count(*) FROM public.employees WHERE full_name='GAP004 QA Synthetic Employee'));";
    const auditViaCommand=run('docker',['exec',p.databaseContainer,'psql','-X','-w','-q','-A','-t',
        '-v','ON_ERROR_STOP=1','-U','postgres','-d','postgres','-c',qaAuditSql],{cwd:root});
    if (!/^\d+\|\d+\|\d+\|\d+$/u.test(auditViaCommand))
        qaFail('QA_AUDIT_FORMAT_INVALID');
    if (dbDriftError) {
        const driftParts=dbStatus.split('|');
        if (driftParts.length!==7 || !driftParts.slice(0,4).every(v=>/^\d+$/u.test(v)) ||
            !driftParts.slice(5).every(v=>/^\d+$/u.test(v))) qaFail('QA_DRIFT_FORMAT_INVALID');
        console.log('QA_DRIFT_ROLE_WORKFORCE_GRANTS: '+driftParts[2]);
        console.log('QA_DRIFT_EMPLOYEE_WORKFORCE_GRANTS: '+driftParts[3]);
        console.log('QA_DRIFT_VISO_ACCESS_ROWS: '+driftParts[6]);
        console.log('QA_RESIDUAL_AUTH_SITES_PERMISSION_EMPLOYEES: '+auditViaCommand);
        const qaOwnershipSql="SELECT concat_ws('|',"+
            "(SELECT count(*) FROM auth.users u WHERE u.email LIKE 'gap004qa-%@example.invalid' "+
            "AND u.raw_app_meta_data->>'vento_qa_owner'='GAP-PKG-004'),"+
            "(SELECT count(DISTINCT u.raw_app_meta_data->>'vento_qa_run') FROM auth.users u "+
            "WHERE u.email LIKE 'gap004qa-%@example.invalid'),"+
            "(SELECT count(*) FROM public.users WHERE email LIKE 'gap004qa-%@example.invalid'),"+
            "(SELECT count(*) FROM public.employee_sites es JOIN public.employees e ON e.id=es.employee_id "+
            "WHERE e.full_name='GAP004 QA Synthetic Employee'),"+
            "(SELECT count(*) FROM public.employee_permissions ep JOIN public.employees e ON e.id=ep.employee_id "+
            "WHERE e.full_name='GAP004 QA Synthetic Employee'),"+
            "(SELECT count(*) FROM public.employee_settings se JOIN public.employees e ON e.id=se.employee_id "+
            "WHERE e.full_name='GAP004 QA Synthetic Employee'),"+
            "(SELECT count(*) FROM public.sites WHERE code LIKE 'GAP004QA%' "+
            "AND name='GAP004 QA Synthetic Site'),"+
            "(SELECT count(*) FROM public.role_permissions rp JOIN public.app_permissions ap "+
            "ON ap.id=rp.permission_id WHERE ap.code='access' AND ap.name='GAP004 QA TEMP ACCESS'));";
        const own=run('docker',['exec',p.databaseContainer,'psql','-X','-w','-q','-A','-t',
            '-v','ON_ERROR_STOP=1','-U','postgres','-d','postgres','-c',qaOwnershipSql],{cwd:root});
        if (!/^(?:\d+\|){7}\d+$/u.test(own)) qaFail('QA_OWNERSHIP_FORMAT_INVALID');
        console.log('QA_OWNED_AUTH_RUN_PROFILES_SITES_PERMS_SETTINGS_SITES_ROLE: '+own);
        if (onOwnedRecovery !== null) {
            if (typeof onOwnedRecovery!=='function') qaFail('QA_RECOVERY_CALLBACK_INVALID');
            return await onOwnedRecovery({root,run,request,profile:p,gate,
                api:backend.api,serviceKey:backend.key,visoAppId:apps[0].id,
                postgresState:dbStatus,aggregate:auditViaCommand,owned:own});
        }
        throw dbDriftError;
    }
    let auditViaStdin=null;
    try {
        auditViaStdin=qaSql({root,run,profile:p},qaAuditSql);
    } catch (error) {
        if (error?.message!=='QA_SQL_CHECK_FAILED') throw error;
    }
    const stdinValid=auditViaStdin===auditViaCommand;
    const qaSchemaSql="WITH inserted(tab,cols) AS (VALUES "+
        "('app_permissions',ARRAY['app_id','code','name','is_active','permission_audience','is_operational','requires_active_work_context']),"+
        "('sites',ARRAY['id','code','name','type','site_kind','site_type','is_active','operational_visibility']),"+
        "('employees',ARRAY['id','full_name','role','site_id','is_active']),"+
        "('employee_sites',ARRAY['employee_id','site_id','is_primary','is_active']),"+
        "('employee_permissions',ARRAY['employee_id','permission_id','is_allowed','scope_type','scope_site_id'])) "+
        "SELECT concat_ws('|',COALESCE((SELECT string_agg(c.table_name||'.'||c.column_name,',' ORDER BY c.table_name,c.ordinal_position) "+
        "FROM information_schema.columns c JOIN inserted i ON i.tab=c.table_name "+
        "WHERE c.table_schema='public' AND c.is_nullable='NO' AND c.column_default IS NULL "+
        "AND c.is_generated='NEVER' AND NOT(c.column_name=ANY(i.cols))),'NONE'),"+
        "COALESCE((SELECT format_type(a.atttypid,a.atttypmod) FROM pg_attribute a "+
        "WHERE a.attrelid='public.employee_permissions'::regclass AND a.attname='scope_type' AND NOT a.attisdropped),'MISSING'),"+
        "COALESCE((SELECT string_agg(e.enumlabel::text,',' ORDER BY e.enumsortorder) FROM pg_enum e"+
        " JOIN pg_type t ON t.oid=e.enumtypid WHERE t.typname='permission_scope_type'),'NONE'));";
    const qaSchemaSummary=run('docker',['exec',p.databaseContainer,'psql','-X','-w','-q','-A','-t',
        '-v','ON_ERROR_STOP=1','-U','postgres','-d','postgres','-c',qaSchemaSql],{cwd:root});
    if (!/^[a-zA-Z0-9_,.]+\|[a-zA-Z0-9_. ]+\|[a-zA-Z0-9_,.]+$/u.test(qaSchemaSummary))
        qaFail('QA_SCHEMA_FORMAT_INVALID');
    // The isolated stack may have 23 applied migrations but an older body for
    // GAP-PKG-004. Version count alone cannot certify template RLS readiness.
    // Read-only probe: exact Docker identity was checked before this query.
    const qaTemplateRlsSql="SELECT concat_ws('|',"+
        "(SELECT count(*) FROM pg_catalog.pg_policies WHERE schemaname='public'"+
        " AND permissive='RESTRICTIVE' AND cmd='SELECT'"+
        " AND roles=ARRAY['authenticated']::name[]"+
        " AND qual LIKE '%viso.staff.manage%' AND (tablename,policyname) IN ("+
        "('shared_operational_device_templates','gap_pkg_004_templates_manage_read'),"+
        "('shared_operational_device_template_apps','gap_pkg_004_template_apps_manage_read'),"+
        "('shared_operational_device_template_actor_policies','gap_pkg_004_template_actor_policies_manage_read'))),"+
        "(SELECT count(*) FROM pg_catalog.pg_class c JOIN pg_catalog.pg_namespace n"+
        " ON n.oid=c.relnamespace WHERE n.nspname='public' AND c.relrowsecurity"+
        " AND c.relname IN ('shared_operational_device_templates',"+
        "'shared_operational_device_template_apps','shared_operational_device_template_actor_policies')),"+
        "(SELECT count(*) FROM pg_catalog.pg_class c JOIN pg_catalog.pg_namespace n"+
        " ON n.oid=c.relnamespace WHERE n.nspname='public'"+
        " AND c.relname='shared_operational_device_templates_admin_v1'"+
        " AND 'security_invoker=true'=ANY(COALESCE(c.reloptions,ARRAY[]::text[]))),"+
        "(SELECT CASE WHEN has_table_privilege('authenticated',"+
        "'public.shared_operational_device_templates_admin_v1','SELECT') THEN 1 ELSE 0 END),"+
        "(SELECT CASE WHEN has_table_privilege('anon',"+
        "'public.shared_operational_device_templates_admin_v1','SELECT') THEN 1 ELSE 0 END),"+
        "(SELECT count(*) FROM pg_catalog.pg_class c JOIN pg_catalog.pg_namespace n"+
        " ON n.oid=c.relnamespace WHERE n.nspname='public' AND c.relkind='v'"+
        " AND 'security_invoker=true'=ANY(COALESCE(c.reloptions,ARRAY[]::text[]))"+
        " AND c.relname IN ('permission_catalog_human_v1',"+
        "'shared_operational_device_actor_policies_admin_v1',"+
        "'shared_operational_device_templates_admin_v1',"+
        "'shared_operational_devices_admin_v1')),"+
        "(SELECT count(*) FROM public.app_permissions p JOIN public.apps a ON a.id=p.app_id"+
        " WHERE a.code='viso' AND p.code='staff.manage' AND p.is_active),"+
        "(SELECT count(*) FROM public.shared_operational_device_templates"+
        " WHERE is_active IS TRUE));";
    const qaTemplateRlsOutput=run('docker',['exec',p.databaseContainer,
        'psql','-X','-w','-q','-A','-t','-v','ON_ERROR_STOP=1',
        '-U','postgres','-d','postgres','-c',qaTemplateRlsSql],{cwd:root});
    const templateRls=parseIsolatedQaTemplateRlsSummary(qaTemplateRlsOutput);
    if (afterVerified !== null) validateIsolatedQaAuthSchema(qaSchemaSummary);
    if (afterVerified !== null && !stdinValid) qaFail('QA_DOCKER_STDIN_NOT_VERIFIED');
    if (afterVerified !== null && auditViaCommand!=='0|0|0|0') qaFail('QA_OWNED_RESIDUE_PREEXISTS');
    if (afterVerified !== null) {
        if (typeof afterVerified !== 'function') qaFail('QA_CALLBACK_INVALID');
        return await afterVerified({root,run,request,profile:p,gate,
            api:backend.api,serviceKey:backend.key,anonKey:status.ANON_KEY,
            roleCajero:dbStatus.split('|')[5]==='1',
            visoAccess:dbStatus.split('|')[6]==='1',templateRls});
    }
    return {target:'VERIFIED',httpAuth:'PASS',restBinding:'PASS',
        migrations:p.expectedHistory,scenariosDeclared:scenarios.length,
        roleCajero:dbStatus.split('|')[5]==='1',
        visoAccess:dbStatus.split('|')[6]==='1',
        anonKeyAvailable:typeof status.ANON_KEY==='string' && status.ANON_KEY.length>40,
        qaSqlStdinVerified:stdinValid,
        qaResidualCounts:auditViaCommand,
        qaSchemaSummary,
        templateRls,
        actualAuthenticatedScenarios:'NOT_EXECUTED',writesPerformed:false};
}

// QA isolated execution is additive to the LOCAL-only MCP bootstrap contract.
export function authorizeIsolatedQaHttpPlan(gate,profile) {
    const approved=gate?.evidence_plan?.tests?.filter(t=>
        t.command==='npm run qa:isolated:viso:auth' &&
        typeof t.expected_result==='string' &&
        t.expected_result.includes('QA AISLADO GAP-PKG-004'));
    if (approved?.length!==1) qaFail('QA_AUTHORIZATION_MISSING');
    readIsolatedQaScenarios(gate,profile);
    const scope=gate.evidence_plan.tests.find(t=>t.command==='MCP_BROWSER_QA_READ_ONLY' &&
        t.qa_scope?.route_pattern===profile.route)?.qa_scope;
    const expectations={
        same_site:{sites:['a'],viewScope:'site',viewSite:'a',allowed:true},
        cross_site_global:{sites:['a','b'],viewScope:'global',viewSite:null,allowed:true},
        cross_site_site_only:{sites:['a','b'],viewScope:'site',viewSite:'a',allowed:false},
    };
    if (!scope || scope.scenarios.length!==3) qaFail('QA_AUTH_SCOPE_INVALID');
    for (const s of scope.scenarios) {
        const e=expectations[s.key], operator=s.identities?.find(i=>i.key==='operator');
        const target=s.identities?.find(i=>i.key==='target');
        if (!e || s.identities.length!==2 || !operator || !target ||
            JSON.stringify(s.sites)!==JSON.stringify(e.sites) ||
            s.login_as!=='operator' || s.expected_access!==(e.allowed?'allow':'deny') ||
            operator.role!=='cajero' || target.role!=='cajero' ||
            operator.memberships?.length!==1 || target.memberships?.length!==1 ||
            operator.memberships[0].site!=='a' || !operator.memberships[0].active ||
            !operator.memberships[0].primary || !target.memberships[0].active ||
            !target.memberships[0].primary ||
            target.memberships[0].site!==(s.key==='same_site'?'a':'b') ||
            target.permissions?.length!==0 || operator.permissions?.length!==2) {
            qaFail('QA_AUTH_SCENARIO_DRIFT');
        }
        const app=operator.permissions.find(p=>p.code==='viso.access');
        const view=operator.permissions.find(p=>p.code==='viso.workforce.employees.view');
        if (!app || !view || !app.allowed || app.scope!=='global' ||
            !view.allowed || view.scope!==e.viewScope ||
            (e.viewScope==='site' && view.site!==e.viewSite) ||
            !Array.isArray(s.checks) ||
            JSON.stringify(s.checks.map(x=>[x.code,x.site,x.allowed]))!==
              JSON.stringify((s.key==='same_site'
                ?[['viso.access','a',true],['viso.workforce.employees.view','a',true]]
                :[['viso.access','a',true],['viso.workforce.employees.view','a',true],
                  ['viso.workforce.employees.view','b',e.allowed]]))) {
            qaFail('QA_AUTH_PERMISSION_DRIFT');
        }
    }
    return scope.scenarios;
}
function qaUuid(value) {
    if (typeof value!=='string' || !/^[0-9a-f]{8}-(?:[0-9a-f]{4}-){3}[0-9a-f]{12}$/iu.test(value))
        qaFail('QA_SYNTHETIC_UUID_INVALID');
    return "'"+value.toLowerCase()+"'::uuid";
}
function qaSql(ctx,source,stage='CHECK') {
    if (!['CHECK','SEED','CLEANUP','RESIDUAL','RECOVERY_DRY','RECOVERY_COMMIT','TEMPLATE_PREPARE','FIXTURE_SEED','FIXTURE_CLEANUP'].includes(stage)) qaFail('QA_SQL_STAGE_INVALID');
    try {
        return ctx.run('docker',['exec','-i',ctx.profile.databaseContainer,
            'psql','-X','-w','-q','-A','-t','-v','ON_ERROR_STOP=1','-U','postgres','-d','postgres'],{
            cwd:ctx.root,input:source,timeout:20000,
        });
    } catch (error) {
        if (error?.message==='QA_DOCKER_SQL_FAILED') qaFail('QA_SQL_'+stage+'_FAILED');
        throw error;
    }
}
export function qaMakePlan(scenarios) {
    const runTag=randomBytes(8).toString('hex');
    const sites=[],actors=[],byScenario=Object.create(null);
    for (const scenario of scenarios) {
        const entry={sites:Object.create(null),identities:Object.create(null)};
        for (const letter of scenario.sites) {
            const site={id:randomUUID(),letter,scenario:scenario.key,
                code:'GAP004QA'+runTag.slice(0,6)+String(sites.length)};
            sites.push(site);entry.sites[letter]=site;
        }
        for (const identity of scenario.identities) {
            const actor={id:null,email:'gap004qa-'+runTag+'-'+actors.length+'@example.invalid',
                password:randomBytes(30).toString('base64url'),
                role:identity.key,scenario:scenario.key,
                site:entry.sites[identity.memberships[0].site],
                permissions:identity.permissions};
            actors.push(actor);entry.identities[identity.key]=actor;
        }
        byScenario[scenario.key]=entry;
    }
    return {runTag,sites,actors,byScenario};
}


export function qaSeedSQL(plan) {
    const sites=plan.sites.map(s=>'('+qaUuid(s.id)+",'"+s.code+
        "','GAP004 QA Synthetic Site','satellite','operational','satellite',true,'operational')").join(',\n');
    const employees=plan.actors.map(a=>'('+qaUuid(a.id)+
        ",'GAP004 QA Synthetic Employee','cajero',"+qaUuid(a.site.id)+',true)').join(',\n');
    const memberships=plan.actors.map(a=>'('+qaUuid(a.id)+','+qaUuid(a.site.id)+',true,true)').join(',\n');
    const byScenario=plan.byScenario;
    const assignments=[];
    for (const entry of Object.values(byScenario)) {
        const operator=entry.identities.operator;
        for (const permission of operator.permissions) {
            const code=permission.code==='viso.access'?'access':'workforce.employees.view';
            const siteId=permission.scope==='site'?qaUuid(entry.sites[permission.site].id):'NULL::uuid';
            assignments.push('('+qaUuid(operator.id)+",'"+code+"','"+permission.scope+"',"+siteId+')');
        }
    }
    const actorIds=plan.actors.map(a=>qaUuid(a.id)).join(',');
    const siteIds=plan.sites.map(s=>qaUuid(s.id)).join(',');
    const assignmentSql=assignments.join(',\n');
    return [
        'BEGIN;', "SET LOCAL lock_timeout='3s';",
        "DO $qa_guard$ BEGIN IF EXISTS (SELECT 1 FROM public.app_permissions p JOIN public.apps a ON a.id=p.app_id WHERE a.code='viso' AND p.code='access') THEN RAISE EXCEPTION 'QA_ACCESS_ALREADY_REGISTERED'; END IF; END $qa_guard$;",
        "INSERT INTO public.app_permissions(app_id,code,name,is_active,permission_audience,is_operational,requires_active_work_context)"+
          " SELECT id,'access','GAP004 QA TEMP ACCESS',true,'administrative',false,false FROM public.apps WHERE code='viso';",
        'INSERT INTO public.sites(id,code,name,type,site_kind,site_type,is_active,operational_visibility) VALUES '+sites+';',
        'INSERT INTO public.employees(id,full_name,role,site_id,is_active) VALUES '+employees+';',
        'INSERT INTO public.employee_sites(employee_id,site_id,is_primary,is_active) VALUES '+memberships+' ON CONFLICT (employee_id,site_id) DO NOTHING;',
        "INSERT INTO public.employee_permissions(employee_id,permission_id,is_allowed,scope_type,scope_site_id) "+
        'SELECT f.employee_id,p.id,true,f.scope_type::public.permission_scope_type,f.scope_site_id FROM (VALUES '+assignmentSql+') AS f(employee_id,code,scope_type,scope_site_id) '+
        "JOIN public.app_permissions p ON p.code=f.code JOIN public.apps a ON a.id=p.app_id AND a.code='viso';",
        "DO $qa_guard$ BEGIN IF (SELECT count(*) FROM public.employee_permissions WHERE employee_id IN ("+actorIds+
        ')) <> '+assignments.length+" OR (SELECT count(*) FROM public.role_permissions rp JOIN public.app_permissions p ON p.id=rp.permission_id JOIN public.apps a ON a.id=p.app_id WHERE a.code='viso' AND p.code IN ('access','workforce.employees.view')) <> 0 "+
        "THEN RAISE EXCEPTION 'QA_AUTH_SEED_DRIFT'; END IF; END $qa_guard$;",
        "SELECT concat_ws('|',(SELECT count(*) FROM public.sites WHERE id IN ("+siteIds+
        ")),(SELECT count(*) FROM public.employees WHERE id IN ("+actorIds+
        ")),(SELECT count(*) FROM public.employee_sites WHERE employee_id IN ("+actorIds+
        ")),(SELECT count(*) FROM public.employee_permissions WHERE employee_id IN ("+actorIds+
        ")),(SELECT count(*) FROM public.app_permissions p JOIN public.apps a ON a.id=p.app_id WHERE a.code='viso' AND p.code='access' AND p.name='GAP004 QA TEMP ACCESS'));",
        'COMMIT;'
    ].join('\n');
}
export function qaCleanupSQL(plan) {
    if (!/^[a-f0-9]{16}$/u.test(plan?.runTag??'')) qaFail('QA_CLEANUP_TAG_INVALID');
    const actorIds=plan.actors.filter(a=>a.id).map(a=>qaUuid(a.id));
    const siteIds=plan.sites.map(s=>qaUuid(s.id));
    const actors=actorIds.length?actorIds.join(','):"NULL::uuid";
    const sites=siteIds.join(',');
    return [
        'BEGIN;', "SET LOCAL lock_timeout='3s';", "SET LOCAL statement_timeout='15s';",
        "DO $qa_guard$ BEGIN IF (SELECT count(*) FROM auth.users WHERE id IN ("+actors+
        ") AND email LIKE 'gap004qa-%@example.invalid' AND raw_app_meta_data->>'vento_qa_owner'='GAP-PKG-004'"+
        " AND raw_app_meta_data->>'vento_qa_run'='"+plan.runTag+"') <> "+actorIds.length+
        " THEN RAISE EXCEPTION 'QA_CLEANUP_OWNERSHIP_DRIFT'; END IF; END $qa_guard$;",
        "SET LOCAL session_replication_role=replica;",
        'DELETE FROM public.employee_permissions WHERE employee_id IN ('+actors+');',
        'DELETE FROM public.employee_sites WHERE employee_id IN ('+actors+');',
        'DELETE FROM public.employee_settings WHERE employee_id IN ('+actors+');',
        "DELETE FROM public.employees WHERE id IN ("+actors+") AND full_name='GAP004 QA Synthetic Employee';",
        "DELETE FROM public.users WHERE id IN ("+actors+") AND email LIKE 'gap004qa-%@example.invalid';",
        'DELETE FROM public.sites WHERE id IN ('+sites+") AND code LIKE 'GAP004QA%' AND name='GAP004 QA Synthetic Site';",
        "DELETE FROM public.app_permissions WHERE code='access' AND name='GAP004 QA TEMP ACCESS' AND app_id=(SELECT id FROM public.apps WHERE code='viso');",
        'COMMIT;'
    ].join('\n');
}
export function qaResidualSQL(plan) {
    const actors=plan.actors.filter(a=>a.id).map(a=>qaUuid(a.id)).join(',')||'NULL::uuid';
    const sites=plan.sites.map(s=>qaUuid(s.id)).join(',');
    return "SELECT concat_ws('|',"+
        "(SELECT count(*) FROM public.sites WHERE id IN ("+sites+")),"+
        "(SELECT count(*) FROM auth.users WHERE id IN ("+actors+")),"+
        "(SELECT count(*) FROM public.users WHERE id IN ("+actors+")),"+
        "(SELECT count(*) FROM public.employees WHERE id IN ("+actors+")),"+
        "(SELECT count(*) FROM public.employee_sites WHERE employee_id IN ("+actors+")),"+
        "(SELECT count(*) FROM public.employee_settings WHERE employee_id IN ("+actors+")),"+
        "(SELECT count(*) FROM public.employee_permissions WHERE employee_id IN ("+actors+")),"+
        "(SELECT count(*) FROM public.app_permissions p JOIN public.apps a ON a.id=p.app_id"+
        " WHERE a.code='viso' AND p.code='access' AND p.name='GAP004 QA TEMP ACCESS'));";
}



export function qaRecoverySQL(runTag,commit=false) {
    if (typeof runTag!=='string' || !/^[a-f0-9]{16}$/u.test(runTag) ||
        typeof commit!=='boolean') qaFail('QA_RECOVERY_TAG_INVALID');
    const users="SELECT id FROM auth.users WHERE email ~ "+
        "'^gap004qa-[a-f0-9]{16}-[0-5]@example[.]invalid$' "+
        "AND raw_app_meta_data->>'vento_qa_owner'='GAP-PKG-004' "+
        "AND raw_app_meta_data->>'vento_qa_run'='"+runTag+"'";
    const sites="SELECT id FROM public.sites WHERE "+
        "code ~ '^GAP004QA"+runTag.slice(0,6)+"[0-4]$' "+
        "AND name='GAP004 QA Synthetic Site'";
    const matches=[
        "(SELECT count(*) FROM auth.users WHERE email LIKE 'gap004qa-%@example.invalid')=6",
        "(SELECT count(*) FROM auth.users WHERE id IN ("+users+"))=6",
        "(SELECT count(*) FROM public.users WHERE email LIKE 'gap004qa-%@example.invalid')=6",
        "(SELECT count(*) FROM public.users WHERE id IN ("+users+
            ") AND email LIKE 'gap004qa-%@example.invalid')=6",
        "(SELECT count(*) FROM public.sites WHERE code LIKE 'GAP004QA%')=5",
        "(SELECT count(*) FROM public.sites WHERE id IN ("+sites+"))=5",
        "(SELECT count(*) FROM public.employees WHERE full_name='GAP004 QA Synthetic Employee')=6",
        "(SELECT count(*) FROM public.employees WHERE id IN ("+users+
            ") AND role='cajero' AND full_name='GAP004 QA Synthetic Employee' "+
            "AND site_id IN ("+sites+"))=6",
        "(SELECT count(*) FROM public.employees WHERE site_id IN ("+sites+"))=6",
        "(SELECT count(*) FROM public.employee_sites WHERE site_id IN ("+sites+"))=6",
        "(SELECT count(*) FROM public.employee_sites WHERE employee_id IN ("+users+"))=6",
        "(SELECT count(*) FROM public.employee_sites WHERE employee_id IN ("+users+
            ") AND site_id IN ("+sites+"))=6",
        "(SELECT count(*) FROM public.employee_settings WHERE employee_id IN ("+users+"))=6",
        "(SELECT count(*) FROM public.employee_permissions WHERE employee_id IN ("+users+"))=6",
        "(SELECT count(*) FROM public.employee_permissions ep "+
            "JOIN public.app_permissions ap ON ap.id=ep.permission_id "+
            "JOIN public.apps a ON a.id=ap.app_id WHERE a.code='viso' "+
            "AND ep.employee_id IN ("+users+") AND ep.is_allowed IS TRUE "+
            "AND ap.code='access' AND ap.name='GAP004 QA TEMP ACCESS' "+
            "AND ep.scope_type='global' AND ep.scope_site_id IS NULL)=3",
        "(SELECT count(*) FROM public.employee_permissions ep "+
            "JOIN public.app_permissions ap ON ap.id=ep.permission_id "+
            "JOIN public.apps a ON a.id=ap.app_id WHERE a.code='viso' "+
            "AND ep.employee_id IN ("+users+") AND ep.is_allowed IS TRUE "+
            "AND ap.code='workforce.employees.view' AND "+
            "((ep.scope_type='global' AND ep.scope_site_id IS NULL) OR "+
            "(ep.scope_type='site' AND ep.scope_site_id IN ("+sites+"))))=3",
        "(SELECT count(*) FROM public.employee_permissions ep JOIN public.app_permissions ap "+
            "ON ap.id=ep.permission_id JOIN public.apps a ON a.id=ap.app_id "+
            "WHERE a.code='viso' AND ap.code='access' "+
            "AND ap.name='GAP004 QA TEMP ACCESS')=3",
        "(SELECT count(*) FROM public.app_permissions ap JOIN public.apps a ON a.id=ap.app_id "+
            "WHERE a.code='viso' AND ap.code='access' AND "+
            "ap.name='GAP004 QA TEMP ACCESS')=1",
        "(SELECT count(*) FROM public.role_permissions rp "+
            "JOIN public.app_permissions ap ON ap.id=rp.permission_id "+
            "JOIN public.apps a ON a.id=ap.app_id WHERE a.code='viso' "+
            "AND ap.code IN ('access','workforce.employees.view'))=0",
        "(SELECT count(*) FROM public.staff_invitations "+
            "WHERE auth_user_id IN ("+users+"))=0",
        "(SELECT count(*) FROM public.staff_invitations "+
            "WHERE site_id IN ("+sites+") OR staff_site_id IN ("+sites+"))=0",
    ];
    const zeroCounts=[
        "(SELECT count(*) FROM public.sites WHERE id IN ("+sites+"))",
        "(SELECT count(*) FROM public.employees WHERE id IN ("+users+"))",
        "(SELECT count(*) FROM public.employee_sites WHERE employee_id IN ("+users+"))",
        "(SELECT count(*) FROM public.employee_settings WHERE employee_id IN ("+users+"))",
        "(SELECT count(*) FROM public.employee_permissions WHERE employee_id IN ("+users+"))",
        "(SELECT count(*) FROM public.users WHERE id IN ("+users+"))",
        "(SELECT count(*) FROM public.app_permissions ap JOIN public.apps a ON a.id=ap.app_id "+
            "WHERE a.code='viso' AND ap.code='access' AND ap.name='GAP004 QA TEMP ACCESS')",
        "(SELECT count(*) FROM auth.users WHERE id IN ("+users+"))",
    ];
    return [
        'BEGIN;',
        "SET LOCAL statement_timeout='15s';",
        "SET LOCAL lock_timeout='3s';",
        "DO $qa_recover$ BEGIN IF NOT ("+matches.join(' AND ')+
            ") THEN RAISE EXCEPTION 'QA_RECOVERY_OWNERSHIP_DRIFT'; END IF; END $qa_recover$;",
        // The package's own E2E cleanup uses this transaction-only switch for
        // circular employee assignment triggers. Never set it globally.
        "SET LOCAL session_replication_role=replica;",
        "DELETE FROM public.employee_permissions WHERE employee_id IN ("+users+");",
        "DELETE FROM public.employee_sites WHERE employee_id IN ("+users+");",
        "DELETE FROM public.employee_settings WHERE employee_id IN ("+users+");",
        "DELETE FROM public.employees WHERE id IN ("+users+
            ") AND full_name='GAP004 QA Synthetic Employee';",
        "DELETE FROM public.users WHERE id IN ("+users+
            ") AND email LIKE 'gap004qa-%@example.invalid';",
        "DELETE FROM public.sites WHERE id IN ("+sites+");",
        "DELETE FROM public.app_permissions WHERE code='access' "+
            "AND name='GAP004 QA TEMP ACCESS' "+
            "AND app_id=(SELECT id FROM public.apps WHERE code='viso');",
        "SELECT concat_ws('|',"+zeroCounts.join(',')+");",
        commit?'COMMIT;':'ROLLBACK;',
    ].join('\n');
}


export function validateIsolatedQaRecoverySurfaces(ctx) {
    const p=ctx?.postgresState?.split('|') ?? [];
    if (p.length!==7 || !/^[a-f0-9-]{36}$/iu.test(ctx?.visoAppId??'') ||
        p[0]!=='23' || p[1]!=='1' || p[2]!=='0' || p[3]!=='3' ||
        p[4]!==ctx.visoAppId || p[5]!=='1' || p[6]!=='1' ||
        ctx.aggregate!=='6|5|1|6' || ctx.owned!=='6|1|6|6|6|6|5|0') {
        qaFail('QA_RECOVERY_SURFACE_MISMATCH');
    }
    return true;
}
export async function runIsolatedQaRecovery({
    root=repoRootFromModule(),run=qaRunFixed,request=fetch,temp=os.tmpdir()
}={}) {
    return runIsolatedQaPreflight({root,run,request,temp,onOwnedRecovery:async ctx=>{
        const approvals=ctx.gate.evidence_plan?.tests?.filter(t=>
            t.command==='npm run qa:isolated:viso:recover' &&
            typeof t.expected_result==='string' &&
            t.expected_result.includes('QA_RECOVERY_OWNED_ONLY'));
        if (approvals?.length!==1) qaFail('QA_RECOVERY_NOT_AUTHORIZED');
        validateIsolatedQaRecoverySurfaces(ctx);
        const tagSql="SELECT min(raw_app_meta_data->>'vento_qa_run') "+
            "FROM auth.users WHERE email LIKE 'gap004qa-%@example.invalid' "+
            "AND raw_app_meta_data->>'vento_qa_owner'='GAP-PKG-004';";
        const tag=qaSql(ctx,tagSql,'CHECK');
        if (!/^[a-f0-9]{16}$/u.test(tag)) qaFail('QA_RECOVERY_TAG_INVALID');
        const idSql="SELECT string_agg(id::text,',' ORDER BY email) FROM auth.users "+
            "WHERE email ~ '^gap004qa-[a-f0-9]{16}-[0-5]@example[.]invalid$' "+
            "AND raw_app_meta_data->>'vento_qa_owner'='GAP-PKG-004' "+
            "AND raw_app_meta_data->>'vento_qa_run'='"+tag+"';";
        const ids=qaSql(ctx,idSql,'CHECK').split(',');
        if (ids.length!==6 || new Set(ids).size!==6 ||
            ids.some(x=>! /^[a-f0-9]{8}-(?:[a-f0-9]{4}-){3}[a-f0-9]{12}$/u.test(x)))
            qaFail('QA_RECOVERY_IDENTITY_MISMATCH');
        const admin=createClient(ctx.api,ctx.serviceKey,{
            auth:{persistSession:false,autoRefreshToken:false}
        });
        // Confirm GoTrue still owns every identity before touching PostgreSQL.
        for (const id of ids) {
            const {data,error}=await admin.auth.admin.getUserById(id);
            const u=data?.user;
            if (error || u?.id!==id ||
                !/^gap004qa-[a-f0-9]{16}-[0-5]@example\.invalid$/u.test(u.email??'') ||
                u.app_metadata?.vento_qa_owner!=='GAP-PKG-004' ||
                u.app_metadata?.vento_qa_run!==tag) qaFail('QA_RECOVERY_AUTH_OWNERSHIP_MISMATCH');
        }
        const dry=qaSql(ctx,qaRecoverySQL(tag,false),'RECOVERY_DRY');
        if (dry!=='0|0|0|0|0|0|0|6') qaFail('QA_RECOVERY_DRY_RESULT_INVALID');
        console.log('QA_RECOVERY_DRY_RUN: PASS');
        const commit=qaSql(ctx,qaRecoverySQL(tag,true),'RECOVERY_COMMIT');
        if (commit!=='0|0|0|0|0|0|0|6') qaFail('QA_RECOVERY_COMMIT_RESULT_INVALID');
        console.log('QA_RECOVERY_POSTGRES: PASS');
        let failed=0;
        for (const id of ids) {
            try {
                const {error}=await admin.auth.admin.deleteUser(id);
                if (error) failed++;
            } catch { failed++; }
        }
        if (failed!==0) qaFail('QA_RECOVERY_AUTH_DELETE_INCOMPLETE');
        const safeIds=ids.map(qaUuid).join(',');
        const auditSql="SELECT concat_ws('|',"+
            "(SELECT count(*) FROM auth.users WHERE id IN ("+safeIds+")),"+
            "(SELECT count(*) FROM public.users WHERE id IN ("+safeIds+")),"+
            "(SELECT count(*) FROM public.employees WHERE id IN ("+safeIds+")),"+
            "(SELECT count(*) FROM public.employee_sites WHERE employee_id IN ("+safeIds+")),"+
            "(SELECT count(*) FROM public.employee_settings WHERE employee_id IN ("+safeIds+")),"+
            "(SELECT count(*) FROM public.employee_permissions WHERE employee_id IN ("+safeIds+")),"+
            "(SELECT count(*) FROM public.sites WHERE code ~ '^GAP004QA"+tag.slice(0,6)+"[0-4]$'),"+
            "(SELECT count(*) FROM public.app_permissions WHERE code='access' "+
            "AND name='GAP004 QA TEMP ACCESS'));";
        const counts=qaSql(ctx,auditSql,'CHECK');
        if (counts!=='0|0|0|0|0|0|0|0') qaFail('QA_RECOVERY_RESIDUE_REMAINS');
        const clean=await runIsolatedQaPreflight({root,run,request,temp});
        if (clean.target!=='VERIFIED' || clean.restBinding!=='PASS' ||
            clean.qaResidualCounts!=='0|0|0|0') qaFail('QA_RECOVERY_FINAL_PREFLIGHT_FAILED');
        return {target:'VERIFIED',postgres:'PASS',auth:'PASS',residues:0,
            migrations:clean.migrations,qaOnly:true};
    }});
}
function printIsolatedQaRecovery(result) {
    console.log(RESULT_START);
    console.log('ESTADO: PASS');
    console.log('OPERACION: QA_ISOLADO_RECOVERY');
    console.log('QA_TARGET: '+result.target);
    console.log('QA_RECOVERY_POSTGRES: '+result.postgres);
    console.log('QA_RECOVERY_AUTH: '+result.auth);
    console.log('QA_RECOVERY_RESIDUE: '+result.residues);
    console.log('QA_MIGRATIONS: '+result.migrations);
    console.log('QA_AUTHENTICATED_SCENARIOS: NOT_EXECUTED');
    console.log(RESULT_END);
}

// Apply ONLY the already-versioned GAP-PKG-004 admin-view/RLS delta to the
// isolated QA instance. This is not a full migration replay or a deployment.
// The session verifies Docker labels, exact QA ports, no accounts and no
// fixture residue before any transactional DDL. Never run on LOCAL principal.
export function buildIsolatedQaTemplatePatchSQL(migrationSource) {
    if (typeof migrationSource!=='string') qaFail('QA_TEMPLATE_MIGRATION_INVALID');
    const viewStatements=[...migrationSource.matchAll(
        /^alter view public\.([a-z_0-9]+) set \(security_invoker = true\);$/gmu,
    )];
    const viewNames=[
        'permission_catalog_human_v1','shared_operational_device_actor_policies_admin_v1',
        'shared_operational_device_templates_admin_v1','shared_operational_devices_admin_v1',
    ];
    if (JSON.stringify(viewStatements.map(m=>m[1]))!==JSON.stringify(viewNames))
        qaFail('QA_TEMPLATE_VIEW_PATCH_DRIFT');
    const begin=migrationSource.indexOf('-- H-CODE-017-009:');
    const end=migrationSource.indexOf('do $gap004_admin_views_postflight$',begin);
    if (begin<0 || end<=begin) qaFail('QA_TEMPLATE_POLICY_PATCH_MISSING');
    const policySql=migrationSource.slice(begin,end);
    const policies=[...policySql.matchAll(
        /^create policy (gap_pkg_004_[a-z_]+)$/gmu,
    )].map(m=>m[1]);
    if (JSON.stringify(policies)!==JSON.stringify([
        'gap_pkg_004_templates_manage_read','gap_pkg_004_template_apps_manage_read',
        'gap_pkg_004_template_actor_policies_manage_read',
    ]) || /\b(?:commit|rollback|truncate|drop\s+(?:table|schema|database))\b/iu.test(policySql))
        qaFail('QA_TEMPLATE_POLICY_PATCH_DRIFT');
    return [
        'BEGIN;',
        "SET LOCAL lock_timeout='2s';",
        "SET LOCAL statement_timeout='15s';",
        ...viewStatements.map(m=>m[0]),policySql,
        // QA-only catalog parity: registration itself grants no permission.
        // The permission is needed for JWT-scoped synthetic browser grants.
        "INSERT INTO public.app_permissions (app_id,code,name,is_active,",
        " permission_audience,is_operational,requires_active_work_context)",
        "SELECT a.id,'staff.manage','GAP-PKG-004 QA catalog staff.manage',",
        " true,'administrative',false,false FROM public.apps a",
        "WHERE a.code='viso' AND NOT EXISTS (",
        " SELECT 1 FROM public.app_permissions p WHERE p.app_id=a.id",
        " AND p.code='staff.manage');",
        "SELECT concat_ws('|',",
        "(SELECT count(*) FROM pg_policies WHERE schemaname='public'",
        " AND permissive='RESTRICTIVE' AND policyname IN (",
        " 'gap_pkg_004_templates_manage_read',",
        " 'gap_pkg_004_template_apps_manage_read',",
        " 'gap_pkg_004_template_actor_policies_manage_read')),",
        "(SELECT count(*) FROM pg_class c JOIN pg_namespace n ON n.oid=c.relnamespace",
        " WHERE n.nspname='public' AND c.relname IN (",
        " 'permission_catalog_human_v1','shared_operational_device_actor_policies_admin_v1',",
        " 'shared_operational_device_templates_admin_v1','shared_operational_devices_admin_v1')",
        " AND 'security_invoker=true'=ANY(coalesce(c.reloptions,ARRAY[]::text[]))),",
        "(SELECT count(*) FROM public.app_permissions p JOIN public.apps a ON a.id=p.app_id",
        " WHERE a.code='viso' AND p.code='staff.manage' AND p.is_active));",
        // Fail atomically: no COMMIT before the server has validated every
        // security-sensitive postcondition. ON_ERROR_STOP aborts the session.
        'DO $qa_template_verify$',
        'BEGIN',
        "  IF (SELECT count(*) FROM pg_catalog.pg_policies WHERE schemaname='public'",
        "    AND permissive='RESTRICTIVE' AND cmd='SELECT'",
        "    AND roles=ARRAY['authenticated']::name[]",
        "    AND qual LIKE '%viso.staff.manage%' AND (tablename,policyname) IN (",
        "    ('shared_operational_device_templates','gap_pkg_004_templates_manage_read'),",
        "    ('shared_operational_device_template_apps','gap_pkg_004_template_apps_manage_read'),",
        "    ('shared_operational_device_template_actor_policies','gap_pkg_004_template_actor_policies_manage_read')))<>3",
        "    OR (SELECT count(*) FROM pg_catalog.pg_class c JOIN pg_catalog.pg_namespace n",
        "    ON n.oid=c.relnamespace WHERE n.nspname='public'",
        "    AND 'security_invoker=true'=ANY(coalesce(c.reloptions,ARRAY[]::text[]))",
        "    AND c.relname IN ('permission_catalog_human_v1',",
        "    'shared_operational_device_actor_policies_admin_v1',",
        "    'shared_operational_device_templates_admin_v1',",
        "    'shared_operational_devices_admin_v1'))<>4",
        "    OR (SELECT count(*) FROM public.app_permissions p JOIN public.apps a",
        "    ON a.id=p.app_id WHERE a.code='viso'",
        "    AND p.code='staff.manage' AND p.is_active)<>1 THEN",
        "    RAISE EXCEPTION 'QA_TEMPLATE_PREPARATION_POSTCONDITION_FAILED';",
        '  END IF;',
        'END',
        '$qa_template_verify$;',
        'COMMIT;',
    ].join('\n');
}

export async function prepareIsolatedQaTemplateCatalog({
    root=repoRootFromModule(),run=qaRunFixed,request=fetch,temp=os.tmpdir()
}={}) {
    return runIsolatedQaPreflight({root,run,request,temp,afterVerified:async ctx=>{
        const exact=ctx.gate.evidence_plan.tests.filter(t=>
            t.command==='npm run qa:isolated:viso:templates:prepare' &&
            typeof t.expected_result==='string' &&
            t.expected_result.includes('AUTORIZACION QA AISLADO PLANTILLAS GAP-PKG-004'));
        const scopes=ctx.gate.evidence_plan.tests.filter(t=>
            t.command==='MCP_BROWSER_QA_READ_ONLY' &&
            t.qa_scope?.route_pattern==='/staff/shared-devices/new' &&
            t.qa_scope?.target_path==='src/app/staff/shared-devices/new/page.tsx');
        if (exact.length!==1 || scopes.length!==1 ||
            scopes[0].qa_scope.scenarios.length!==3)
            qaFail('QA_TEMPLATE_PREPARATION_AUTHORIZATION_MISSING');
        if (!ctx.roleCajero || ctx.visoAccess ||
            ctx.templateRls.rlsTables!==3 ||
            ctx.templateRls.authenticatedGrant!==true ||
            ctx.templateRls.anonGrant!==false)
            qaFail('QA_TEMPLATE_PREPARATION_BASELINE_INVALID');
        if (ctx.templateRls.ready)
            return {result:'ALREADY_READY',views:4,policies:3,
                staffManage:'AVAILABLE',qaOnly:true};
        if (ctx.templateRls.restrictivePolicies!==0 ||
            ctx.templateRls.invokerViews!==0 ||
            ctx.templateRls.staffManage)
            qaFail('QA_TEMPLATE_PREPARATION_PARTIAL_DRIFT');
        const migration=qaReadFile(path.join(root,'supabase','migrations',
            '20261012173553_gap_pkg_004_rpc_acl_hardening.sql'));
        const patch=buildIsolatedQaTemplatePatchSQL(migration);
        const result=qaSql(ctx,patch,'TEMPLATE_PREPARE');
        if (result!=='3|4|1') qaFail('QA_TEMPLATE_PREPARATION_POSTCONDITION_FAILED');
        const after=await runIsolatedQaPreflight({root,run,request,temp});
        if (!after.templateRls.ready || after.qaResidualCounts!=='0|0|0|0')
            qaFail('QA_TEMPLATE_PREPARATION_FINAL_PREFLIGHT_FAILED');
        return {result:'READY',views:after.templateRls.invokerViews,
            policies:after.templateRls.restrictivePolicies,
            staffManage:'AVAILABLE',qaOnly:true};
    }});
}
function printIsolatedQaTemplatePreparation(result) {
    console.log(RESULT_START);
    console.log('ESTADO: PASS');
    console.log('OPERACION: QA_ISOLADO_TEMPLATE_PREPARATION');
    console.log('QA_TARGET: VERIFIED');
    console.log('QA_TEMPLATE_PREPARATION: '+result.result);
    console.log('QA_ADMIN_VIEWS_INVOKER: '+result.views+'/4');
    console.log('QA_TEMPLATE_RLS_RESTRICTIVE: '+result.policies+'/3');
    console.log('QA_VISO_STAFF_MANAGE_CATALOG: '+result.staffManage);
    console.log('QA_HTTP_AUTHENTICATED_SCENARIOS: NOT_EXECUTED');
    console.log('QA_REMOTE_WRITES: 0');
    console.log(RESULT_END);
}

// A single disposable, code-marked visual template for the isolated QA browser.
// It is deliberately not created by read-only validators and is never shipped.
const QA_VISUAL_TEMPLATE_CODE='GAP004QA_VISUAL_TEMPLATE';
const QA_VISUAL_TEMPLATE_LABEL='GAP004 QA Visual Template';

function qaVisualTemplateAuditSQL() {
    const owned="SELECT id FROM public.shared_operational_device_templates "+
        "WHERE code='"+QA_VISUAL_TEMPLATE_CODE+"'";
    return "SELECT concat_ws('|',"+
        "(SELECT count(*) FROM public.shared_operational_device_templates WHERE code='"+
        QA_VISUAL_TEMPLATE_CODE+"'),"+
        "(SELECT count(*) FROM public.shared_operational_device_template_apps"+
        " WHERE template_id IN ("+owned+")),"+
        "(SELECT count(*) FROM public.shared_operational_device_template_actor_policies"+
        " WHERE template_id IN ("+owned+")),"+
        "(SELECT count(*) FROM public.shared_operational_devices"+
        " WHERE template_id IN ("+owned+")));";
}
export function buildIsolatedQaVisualTemplateFixtureSQL(action) {
    if (action!=='seed' && action!=='cleanup') qaFail('QA_VISUAL_FIXTURE_ACTION_INVALID');
    const match="code='"+QA_VISUAL_TEMPLATE_CODE+"' AND label='"+
        QA_VISUAL_TEMPLATE_LABEL+"' AND default_app_code='viso' AND is_active IS TRUE";
    const pre=action==='seed'?
        "IF (SELECT count(*) FROM public.shared_operational_device_templates"+
        " WHERE is_active IS TRUE)<>0 OR"+
        " (SELECT count(*) FROM public.shared_operational_device_templates WHERE code='"+
        QA_VISUAL_TEMPLATE_CODE+"')<>0 THEN":
        "IF (SELECT count(*) FROM public.shared_operational_device_templates WHERE "+
        match+")<>1 OR"+
        " (SELECT count(*) FROM public.shared_operational_device_templates"+
        " WHERE is_active IS TRUE)<>1 OR"+
        " (SELECT count(*) FROM public.shared_operational_device_template_apps"+
        " WHERE template_id IN (SELECT id FROM public.shared_operational_device_templates"+
        " WHERE "+match+"))<>1 OR"+
        " (SELECT count(*) FROM public.shared_operational_device_template_apps"+
        " WHERE template_id IN (SELECT id FROM public.shared_operational_device_templates"+
        " WHERE "+match+") AND app_code='viso' AND is_default AND is_active)<>1 OR"+
        " (SELECT count(*) FROM public.shared_operational_device_template_actor_policies"+
        " WHERE template_id IN (SELECT id FROM public.shared_operational_device_templates"+
        " WHERE "+match+"))<>0 OR"+
        " (SELECT count(*) FROM public.shared_operational_devices"+
        " WHERE template_id IN (SELECT id FROM public.shared_operational_device_templates"+
        " WHERE "+match+"))<>0 THEN";
    const modifications=action==='seed'?[
        "WITH created AS (INSERT INTO public.shared_operational_device_templates"+
        " (id,code,label,default_app_code,is_active) VALUES"+
        " (gen_random_uuid(),'"+QA_VISUAL_TEMPLATE_CODE+"','"+
        QA_VISUAL_TEMPLATE_LABEL+"','viso',TRUE) RETURNING id)",
        "INSERT INTO public.shared_operational_device_template_apps"+
        " (template_id,app_code,is_default,is_active)"+
        " SELECT id,'viso',TRUE,TRUE FROM created;",
    ]:[
        "DELETE FROM public.shared_operational_device_template_apps"+
        " WHERE template_id IN (SELECT id FROM public.shared_operational_device_templates"+
        " WHERE "+match+") AND app_code='viso' AND is_default AND is_active;",
        "DELETE FROM public.shared_operational_device_templates WHERE "+match+";",
    ];
    const post=action==='seed'?
        "IF (SELECT count(*) FROM public.shared_operational_device_templates WHERE "+
        match+")<>1 OR"+
        " (SELECT count(*) FROM public.shared_operational_device_template_apps"+
        " WHERE template_id IN (SELECT id FROM public.shared_operational_device_templates"+
        " WHERE "+match+") AND app_code='viso' AND is_default AND is_active)<>1"+
        " OR (SELECT count(*) FROM public.shared_operational_device_templates"+
        " WHERE is_active IS TRUE)<>1 THEN":
        "IF (SELECT count(*) FROM public.shared_operational_device_templates WHERE code='"+
        QA_VISUAL_TEMPLATE_CODE+"')<>0 OR"+
        " (SELECT count(*) FROM public.shared_operational_device_templates"+
        " WHERE is_active IS TRUE)<>0 THEN";
    return [
        'BEGIN;',
        "SET LOCAL lock_timeout='2s';",
        "SET LOCAL statement_timeout='15s';",
        "DO $qa_visual_fixture_pre$ BEGIN",
        pre,
        "RAISE EXCEPTION 'QA_VISUAL_FIXTURE_PRECONDITION_FAILED'; END IF;",
        "END $qa_visual_fixture_pre$;",
        ...modifications,
        "DO $qa_visual_fixture_post$ BEGIN",
        post,
        "RAISE EXCEPTION 'QA_VISUAL_FIXTURE_POSTCONDITION_FAILED'; END IF;",
        "END $qa_visual_fixture_post$;",
        "SELECT count(*) FROM public.shared_operational_device_templates WHERE is_active IS TRUE;",
        'COMMIT;',
    ].join('\n');
}
export async function manageIsolatedQaVisualTemplateFixture(action,{
    root=repoRootFromModule(),run=qaRunFixed,request=fetch,temp=os.tmpdir()
}={}) {
    if (action!=='seed' && action!=='cleanup') qaFail('QA_VISUAL_FIXTURE_ACTION_INVALID');
    return runIsolatedQaPreflight({root,run,request,temp,afterVerified:async ctx=>{
        const command='npm run qa:isolated:viso:templates:fixture:'+action;
        const declared=ctx.gate.evidence_plan.tests.filter(entry=>
            entry.command===command && String(entry.expected_result??'')
                .includes('QA VISUAL TEMPLATE FIXTURE GAP-PKG-004'));
        const scope=ctx.gate.evidence_plan.tests.filter(entry=>
            entry.command==='MCP_BROWSER_QA_READ_ONLY' &&
            entry.qa_scope?.route_pattern==='/staff/shared-devices/new' &&
            entry.qa_scope?.scenarios?.length===3);
        if (declared.length!==1 || scope.length!==1)
            qaFail('QA_VISUAL_FIXTURE_AUTHORIZATION_MISSING');
        if (!ctx.templateRls.ready)
            qaFail('QA_VISUAL_FIXTURE_BACKEND_NOT_READY');
        if (ctx.templateRls.activeTemplates!==(action==='seed'?0:1))
            qaFail('QA_VISUAL_FIXTURE_TEMPLATE_COUNT_DRIFT');
        const before=qaSql(ctx,qaVisualTemplateAuditSQL(),'CHECK');
        if (before!==(action==='seed'?'0|0|0|0':'1|1|0|0'))
            qaFail('QA_VISUAL_FIXTURE_OWNERSHIP_DRIFT');
        const sql=buildIsolatedQaVisualTemplateFixtureSQL(action);
        const output=qaSql(ctx,sql,action==='seed'?'FIXTURE_SEED':'FIXTURE_CLEANUP');
        const count=action==='seed'?1:0;
        if (output!==String(count)) qaFail('QA_VISUAL_FIXTURE_TRANSACTION_RESULT_INVALID');
        const after=await runIsolatedQaPreflight({root,run,request,temp});
        const finalAudit=qaSql(ctx,qaVisualTemplateAuditSQL(),'RESIDUAL');
        if (!after.templateRls.ready || after.templateRls.activeTemplates!==count ||
            finalAudit!==(action==='seed'?'1|1|0|0':'0|0|0|0') ||
            after.qaResidualCounts!=='0|0|0|0')
            qaFail('QA_VISUAL_FIXTURE_POSTFLIGHT_FAILED');
        return {action,templateCount:count,fixtureAudit:finalAudit,
            residues:after.qaResidualCounts,qaOnly:true};
    }});
}
function printIsolatedQaVisualFixture(result) {
    console.log(RESULT_START);
    console.log('ESTADO: PASS');
    console.log('OPERACION: QA_ISOLADO_VISUAL_TEMPLATE_FIXTURE');
    console.log('QA_TARGET: VERIFIED');
    console.log('QA_VISUAL_TEMPLATE_FIXTURE: '+(result.action==='seed'?'SEEDED':'CLEANED'));
    console.log('QA_ACTIVE_DEVICE_TEMPLATES: '+result.templateCount);
    console.log('QA_FIXTURE_PARENT_APPS_POLICIES_DEVICES: '+result.fixtureAudit);
    console.log('QA_SYNTHETIC_RESIDUAL_COUNTS: '+result.residues);
    console.log('QA_REMOTE_WRITES: 0');
    console.log(RESULT_END);
}

export async function runAuthorizedIsolatedQaAuthScenario({
    root=repoRootFromModule(),run=qaRunFixed,request=fetch,temp=os.tmpdir()
}={}) {
    return runIsolatedQaPreflight({root,run,request,temp,afterVerified:async ctx=>{
        if (!ctx.roleCajero || ctx.visoAccess || typeof ctx.anonKey!=='string' ||
            ctx.anonKey.length<40) qaFail('QA_AUTH_CATALOG_NOT_READY');
        const scenarios=authorizeIsolatedQaHttpPlan(ctx.gate,ctx.profile);
        const previous=qaSql(ctx,"SELECT concat_ws('|',"+
            "(SELECT count(*) FROM auth.users WHERE email LIKE 'gap004qa-%@example.invalid'),"+
            "(SELECT count(*) FROM public.sites WHERE code LIKE 'GAP004QA%'),"+
            "(SELECT count(*) FROM public.app_permissions WHERE code='access' AND name='GAP004 QA TEMP ACCESS'));");
        if (previous!=='0|0|0') qaFail('QA_OWNED_RESIDUE_PREEXISTS');
        const plan=qaMakePlan(scenarios);
        const admin=createClient(ctx.api,ctx.serviceKey,{
            auth:{persistSession:false,autoRefreshToken:false}
        });
        let runError=null,passed=[],policyReadStatuses=[];
        try {
            for (const actor of plan.actors) {
                if (!/^gap004qa-[a-f0-9]{16}-[0-9]+@example\.invalid$/u.test(actor.email))
                    qaFail('QA_SYNTHETIC_EMAIL_INVALID');
                const {data,error}=await admin.auth.admin.createUser({
                    email:actor.email,password:actor.password,email_confirm:true,
                    app_metadata:{vento_qa_owner:'GAP-PKG-004',vento_qa_run:plan.runTag},
                    user_metadata:{full_name:'GAP004 QA Synthetic Employee'}
                });
                if (error || !data?.user?.id) qaFail('QA_AUTH_CREATE_FAILED');
                actor.id=data.user.id;
                qaUuid(actor.id);
            }
            const output=qaSql(ctx,qaSeedSQL(plan),'SEED');
            const expected=plan.sites.length+'|'+plan.actors.length+'|'+
                plan.actors.length+'|'+scenarios.length*2+'|1';
            if (output!==expected) qaFail('QA_AUTH_SEED_UNEXPECTED');
            for (const scenario of scenarios) {
                const entry=plan.byScenario[scenario.key];
                const actor=entry.identities.operator;
                const client=createClient(ctx.api,ctx.anonKey,{
                    auth:{persistSession:false,autoRefreshToken:false}
                });
                const {data:login,error:signInError}=await client.auth.signInWithPassword({
                    email:actor.email,password:actor.password
                });
                if (signInError || login?.user?.id!==actor.id ||
                    typeof login?.session?.access_token!=='string' ||
                    login.session.access_token.length<50)
                    qaFail('QA_AUTH_LOGIN_FAILED');
                for (const check of scenario.checks) {
                    const {data,error}=await client.rpc('has_permission',{
                        p_permission_code:check.code,
                        p_site_id:entry.sites[check.site]?.id??null,
                        p_area_id:null
                    });
                    if (error || typeof data!=='boolean' || data!==check.allowed)
                        qaFail('QA_AUTH_PERMISSION_MISMATCH');
                }
                // Query the exact ANIMA policy projection with this actor's JWT.
                // A 42501 here is a real authenticated ACL failure, not an anon pre-login error.
                const { data: attendancePolicy, error: policyError } = await client
                    .from('attendance_policy')
                    .select(
                        'geofence_check_in_max_accuracy_meters, geofence_check_out_max_accuracy_meters, late_tolerance_minutes, ' +
                        'geofence_ready_cache_ms, geofence_latch_ttl_checkin_ms, geofence_latch_ttl_checkout_ms, ' +
                        'shift_departure_max_accuracy_meters, shift_departure_threshold_meters, ' +
                        'shift_departure_min_check_interval_ms, default_radius_meters'
                    )
                    .limit(1)
                    .maybeSingle();
                if (policyError) {
                    if (policyError.code === '42501') qaFail('QA_AUTH_ATTENDANCE_POLICY_42501');
                    qaFail('QA_AUTH_ATTENDANCE_POLICY_READ_FAILED');
                }
                if (!attendancePolicy) {
                    // ANIMA's hook deliberately falls back when this global table is empty.
                    // A populated table returning zero JWT-visible rows is not equivalent.
                    const total=qaSql(ctx,'SELECT count(*) FROM public.attendance_policy;');
                    if (!/^\d+$/u.test(total)) qaFail('QA_AUTH_ATTENDANCE_POLICY_DB_COUNT_INVALID');
                    if (Number(total)>0) qaFail('QA_AUTH_ATTENDANCE_POLICY_ROW_NOT_VISIBLE');
                    policyReadStatuses.push('EMPTY_TABLE_FALLBACK');
                } else {
                    policyReadStatuses.push('ROW_READ');
                }
                passed.push(scenario.key);
            }
        } catch (error) {
            runError=error;
        }
        const cleanupErrors=[];
        try { qaSql(ctx,qaCleanupSQL(plan),'CLEANUP'); } catch { cleanupErrors.push('QA_DB_CLEANUP_FAILED'); }
        for (const actor of plan.actors.filter(x=>x.id)) {
            try {
                const {error}=await admin.auth.admin.deleteUser(actor.id);
                if (error) cleanupErrors.push('QA_AUTH_CLEANUP_FAILED');
            } catch { cleanupErrors.push('QA_AUTH_CLEANUP_FAILED'); }
        }
        try {
            const after=qaSql(ctx,qaResidualSQL(plan),'RESIDUAL');
            if (after!=='0|0|0|0|0|0|0|0') cleanupErrors.push('QA_SYNTHETIC_RESIDUE');
        } catch { cleanupErrors.push('QA_RESIDUE_CHECK_FAILED'); }
        if (cleanupErrors.length) qaFail('QA_CLEANUP_INCOMPLETE');
        if (runError) throw runError;
        if (passed.length!==3) qaFail('QA_HTTP_SCENARIOS_INCOMPLETE');
        return {target:'VERIFIED',authSession:'PASS',scenarios:passed,
            attendancePolicy:policyReadStatuses,
            syntheticResidue:0,qaOnly:true,websiteBrowser:'NOT_EXECUTED'};
    }});
}
function printQaAuthResult(result) {
    console.log(RESULT_START);
    console.log('ESTADO: PASS');
    console.log('OPERACION: QA_ISOLADO_AUTH_HTTP');
    console.log('QA_TARGET: '+result.target);
    console.log('QA_AUTH_SESSION: '+result.authSession);
    for (const key of result.scenarios) console.log('QA_SCENARIO_'+key.toUpperCase()+': PASS');
    console.log('QA_AUTH_ATTENDANCE_POLICY: '+result.attendancePolicy.join('|'));
    console.log('QA_HTTP_AUTHENTICATED_SCENARIOS: '+result.scenarios.length+'/3');
    console.log('QA_SYNTHETIC_RESIDUE: '+result.syntheticResidue);
    console.log('QA_VISO_BROWSER: '+result.websiteBrowser);
    console.log(RESULT_END);
}

function printIsolatedQaResult(r) {
    console.log(RESULT_START);
    console.log('ESTADO: PASS');
    console.log('OPERACION: QA_ISOLADO_PREFLIGHT');
    console.log('QA_TARGET: '+r.target);
    console.log('QA_REST_BINDING: '+r.restBinding);
    console.log('QA_HTTP_AUTH: '+r.httpAuth);
    console.log('QA_MIGRATIONS: '+r.migrations);
    console.log('QA_SCENARIOS_DECLARED: '+r.scenariosDeclared);
    console.log('QA_ROLE_CAJERO: '+(r.roleCajero?'AVAILABLE':'MISSING'));
    // GAP-PKG-004 deliberately starts with no viso.access catalog entry.
    // Authenticated QA creates temporary, owned access fixtures and cleans them up;
    // never create a permanent catalog entry to "fix" this expected baseline.
    console.log('QA_VISO_ACCESS: '+(r.visoAccess?'UNEXPECTED_PRESENT':'EXPECTED_ABSENT'));
    console.log('QA_ANON_KEY: '+(r.anonKeyAvailable?'AVAILABLE':'MISSING'));
    console.log('QA_SQL_STDIN: '+(r.qaSqlStdinVerified?'PASS':'FAIL'));
    console.log('QA_SYNTHETIC_RESIDUAL_COUNTS: '+r.qaResidualCounts);
    console.log('QA_SCHEMA_REQUIRED_AND_SCOPE_TYPE: '+r.qaSchemaSummary);
    console.log('QA_TEMPLATE_RLS_RESTRICTIVE: '+r.templateRls.restrictivePolicies+'/3');
    console.log('QA_TEMPLATE_RLS_BASE_TABLES: '+r.templateRls.rlsTables+'/3');
    console.log('QA_ADMIN_VIEWS_INVOKER: '+r.templateRls.invokerViews+'/4');
    console.log('QA_TEMPLATE_VIEW_INVOKER: '+(r.templateRls.invoker?'YES':'NO'));
    console.log('QA_VISO_STAFF_MANAGE_CATALOG: '+(r.templateRls.staffManage?'AVAILABLE':'MISSING'));
    console.log('QA_TEMPLATE_RLS_READINESS: '+(r.templateRls.ready?'READY':'REPLAY_REQUIRED'));
    console.log('QA_ACTIVE_DEVICE_TEMPLATES: '+r.templateRls.activeTemplates);
    console.log('QA_HTTP_AUTHENTICATED_SCENARIOS: '+r.actualAuthenticatedScenarios);
    console.log('QA_WRITES: 0');
    console.log(RESULT_END);
}

export function classifyIsolatedQaFailure(error) {
    // Never print an arbitrary exception message: it can contain URLs, tokens or SQL.
    const message=typeof error?.message==='string'?error.message:'';
    const code=/^QA_[A-Z0-9_]{2,120}$/u.test(message)?message:'QA_RUNTIME_FAILURE';
    const safeKinds={
        Error:'ERROR',TypeError:'TYPE_ERROR',SyntaxError:'SYNTAX_ERROR',
        RangeError:'RANGE_ERROR',ReferenceError:'REFERENCE_ERROR',
        AggregateError:'AGGREGATE_ERROR',DOMException:'DOM_EXCEPTION'
    };
    const kind=Object.hasOwn(safeKinds,error?.name)?safeKinds[error.name]:'UNKNOWN';
    const allowedCodes=new Set([
        'ECONNREFUSED','ECONNRESET','ENOTFOUND','ETIMEDOUT','EAI_AGAIN',
        'UND_ERR_CONNECT_TIMEOUT','UND_ERR_SOCKET','ABORT_ERR','ERR_INVALID_URL',
        'ERR_INVALID_ARG_TYPE','EACCES','ENOENT','EADDRINUSE'
    ]);
    const rawCause=error?.cause?.code??error?.code;
    const cause=allowedCodes.has(rawCause)?rawCause:'UNCLASSIFIED';
    const originMatch=/supabase-db-harness[.]mjs:(\d{1,4}):(\d{1,4})/u.exec(
        typeof error?.stack==='string'?error.stack:''
    );
    const origin=originMatch
        ?'LINE_'+originMatch[1]+'_COL_'+originMatch[2]:'UNAVAILABLE';
    const hint=[
        ['STACK_OWNER_UNAVAILABLE',/stack owner|primary database is unavailable|environment export/iu],
        ['HTTP_FETCH_FAILED',/fetch failed|failed to fetch/iu],
        ['HTTP_TIMEOUT',/timed out|timeout|operation was aborted/iu],
        ['CONNECTION_REFUSED',/connection refused|ECONNREFUSED/iu],
        ['INVALID_URL',/invalid (?:URL|protocol)/iu],
        ['RESPONSE_NOT_JSON',/unexpected token|not valid JSON/iu],
        ['INVALID_ARGUMENT',/argument must|argument.*type/iu],
        ['PROPERTY_ACCESS',/cannot read propert|undefined is not/iu],
        ['RESOURCE_UNAVAILABLE',/not found|no such container|missing/iu],
    ].find(([,pattern])=>pattern.test(message))?.[0]??'UNCLASSIFIED';
    return {code,kind,cause,origin,hint};
}

async function main() {
    try {
        if (process.argv.length <= 2) {
            printIsolatedQaResult(await runIsolatedQaPreflight());
        } else if (process.argv[2]==='qa-auth' && process.argv.length===3) {
            printQaAuthResult(await runAuthorizedIsolatedQaAuthScenario());
        } else if (process.argv[2]==='qa-templates-prepare' && process.argv.length===3) {
            printIsolatedQaTemplatePreparation(await prepareIsolatedQaTemplateCatalog());
        } else if (process.argv[2]==='qa-templates-fixture-seed' && process.argv.length===3) {
            printIsolatedQaVisualFixture(await manageIsolatedQaVisualTemplateFixture('seed'));
        } else if (process.argv[2]==='qa-templates-fixture-cleanup' && process.argv.length===3) {
            printIsolatedQaVisualFixture(await manageIsolatedQaVisualTemplateFixture('cleanup'));
        } else if (process.argv[2]==='qa-recover' && process.argv.length===3) {
            printIsolatedQaRecovery(await runIsolatedQaRecovery());
        } else {
            printSuccess(runHarness({ mode: process.argv[2] }));
        }
    } catch (error) {
        if (process.argv.length <= 2 || ['qa-auth','qa-recover','qa-templates-prepare','qa-templates-fixture-seed','qa-templates-fixture-cleanup'].includes(process.argv[2])) {
            const authMode=process.argv[2]==='qa-auth';
            const recoveryMode=process.argv[2]==='qa-recover';
            const templateMode=process.argv[2]==='qa-templates-prepare';
            const fixtureMode=process.argv[2]==='qa-templates-fixture-seed' || process.argv[2]==='qa-templates-fixture-cleanup';
            console.log(RESULT_START);
            console.log('ESTADO: FAIL');
            console.log('OPERACION: '+(recoveryMode?'QA_ISOLADO_RECOVERY':authMode?'QA_ISOLADO_AUTH_HTTP':templateMode?'QA_ISOLADO_TEMPLATE_PREPARATION':fixtureMode?'QA_ISOLADO_VISUAL_TEMPLATE_FIXTURE':'QA_ISOLADO_PREFLIGHT'));
            const failure=classifyIsolatedQaFailure(error);
            console.log('QA_ERROR: '+failure.code);
            if (failure.code==='QA_RUNTIME_FAILURE') {
                console.log('QA_RUNTIME_KIND: '+failure.kind);
                console.log('QA_RUNTIME_CAUSE: '+failure.cause);
                console.log('QA_RUNTIME_ORIGIN: '+failure.origin);
                console.log('QA_RUNTIME_HINT: '+failure.hint);
            }
            console.log(recoveryMode?'QA_RECOVERY: INCOMPLETE_VERIFY_RESULT':authMode?'QA_CLEANUP: VERIFY_RESULT':templateMode?'QA_TEMPLATE_PREPARATION: INCOMPLETE_VERIFY_RESULT':fixtureMode?'QA_VISUAL_FIXTURE: INCOMPLETE_VERIFY_RESULT':'QA_WRITES: 0');
            console.log(RESULT_END);
        } else {
            printFailure(error);
        }
        process.exitCode = Number.isInteger(error?.exitCode) ? error.exitCode : 1;
    }
}

const isCli = process.argv[1]
    && path.resolve(process.argv[1]) === path.resolve(fileURLToPath(import.meta.url));

if (isCli) main();
