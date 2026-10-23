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
    QA_ISOLATED_PROFILES,
    validateIsolatedQaEndpoints,
    parseIsolatedQaStatus,
    validateIsolatedQaLabels,
    resolveIsolatedQaDatabaseContainer,
    validateIsolatedQaDatabaseState,
    validateIsolatedQaAuthSchema,
    parseIsolatedQaTemplateRlsSummary,
    buildIsolatedQaTemplatePatchSQL,
    buildIsolatedQaVisualTemplateFixtureSQL,
    readIsolatedQaScenarios,
    authorizeIsolatedQaHttpPlan,
    qaMakePlan,
    qaSeedSQL,
    qaCleanupSQL,
    qaResidualSQL,
    qaRecoverySQL,
    validateIsolatedQaRecoverySurfaces,
    runIsolatedQaPreflight,
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

const qaProfile = QA_ISOLATED_PROFILES['GAP-PKG-004'];
const qaContainerName = qaProfile.databaseContainerPrefix + 'a9043e7e3774';
const qaStatus = [
    'API_URL="http://127.0.0.1:23151"',
    'DB_URL="postgresql://postgres:private@127.0.0.1:20545/postgres"',
    'SERVICE_ROLE_KEY="unit-only-not-a-real-key"',
].join('\n');
const qaLabels = {
    'com.docker.compose.project': 'supabase-vento_gap_pkg_004_qa_isolado-9ef1ab0e6874',
    'com.supabase.instance': '48e4728b-5fc0-4a35-9f11-8d3dcc51696d',
    'com.supabase.service': 'database',
};

function syntheticQaGate() {
    return {
        package_id: 'GAP-PKG-004',
        status: 'MATURATION_DRAFT',
        physical_identity: { targets: [{
            repository: 'vento-group-sas/vento-viso',
            path: 'src/app/staff/[id]/page.tsx',
            operation: 'MODIFICAR',
        }] },
        evidence_plan: { tests: [{
            command: 'MCP_BROWSER_QA_READ_ONLY',
            qa_scope: {
                repository: 'vento-group-sas/vento-viso',
                target_path: 'src/app/staff/[id]/page.tsx',
                route_pattern: '/staff/[id]',
                scenarios: ['same_site','cross_site_global','cross_site_site_only'].map(key=>({
                    key, expected_access: key==='cross_site_site_only'?'deny':'allow',
                    identities: [{key:'operator'},{key:'target'}],
                    checks: [{code:'viso.access'},{code:'viso.workforce.employees.view'}],
                })),
            },
        }] },
    };
}
async function withQaFixture(callback) {
    const root=fs.mkdtempSync(path.join(os.tmpdir(),'vento-qa-unit-'));
    const temp=path.join(root,'temp');
    const qa=path.join(temp,qaProfile.directory,'supabase');
    const doc=path.join(root,'docs','plan-canonico','modular','package-gate-instances');
    const bin=path.join(root,'node_modules','supabase','bin');
    try {
        for (const dir of [qa,doc,bin]) fs.mkdirSync(dir,{recursive:true});
        fs.writeFileSync(path.join(qa,'config.toml'),'project_id = "vento-shell-gap-pkg-004-qa"\n');
        fs.writeFileSync(path.join(doc,'GAP-PKG-004.json'),JSON.stringify(syntheticQaGate()));
        fs.writeFileSync(path.join(root,'node_modules','supabase','package.json'),
            JSON.stringify({bin:{supabase:'bin/supabase'}}));
        fs.writeFileSync(path.join(bin,'supabase'),'local executable stub');
        return await callback({root,temp});
    } finally {
        fs.rmSync(root,{recursive:true,force:true});
    }
}

test('QA aislado: solo API/DB localhost exactos y clave disponible',()=>{
    const report=parseIsolatedQaStatus(qaStatus);
    assert.equal(validateIsolatedQaEndpoints(report,qaProfile).api,'http://127.0.0.1:23151');
    for (const [key,value] of [
        ['API_URL','https://example.supabase.co'],
        ['API_URL','http://localhost:23151'],
        ['DB_URL','postgresql://postgres:x@127.0.0.1:54322/postgres'],
        ['DB_URL','postgresql://postgres:x@127.0.0.1:20545/other'],
    ]) assert.throws(()=>validateIsolatedQaEndpoints({...report,[key]:value},qaProfile),
        /QA_STATUS_ENDPOINT_NOT_ISOLATED/u);
    assert.throws(()=>validateIsolatedQaEndpoints({},qaProfile),/QA_STATUS_FIELDS_MISSING/u);
    assert.throws(()=>parseIsolatedQaStatus(qaStatus+'\nSERVICE_ROLE_KEY=duplicate'),
        /QA_STATUS_DUPLICATE_KEY/u);
});

test('QA aislado: admite 51 regeneraciones de identidad Docker sin cambiar el perfil',()=>{
    assert.equal(validateIsolatedQaLabels(qaLabels,qaProfile),true);
    for(let i=1;i<=51;i++){
        const token=i.toString(16).padStart(12,'0');
        const name=qaProfile.databaseContainerPrefix+token;
        const labels={
            ...qaLabels,
            'com.docker.compose.project':'supabase-vento_gap_pkg_004_qa_isolado-'+token,
            'com.supabase.instance':'aaaaaaaa-bbbb-4ccc-8ddd-'+token,
        };
        assert.equal(validateIsolatedQaLabels(labels,qaProfile),true);
        const run=(command,args)=>{
            assert.equal(command,'docker');
            if(args[0]==='ps'){
                assert.deepEqual(args,[
                    'ps','--filter','label=com.supabase.service=database',
                    '--format','{{.Names}}',
                ]);
                return 'supabase-OTHER-database-aaaaaaaaaaaa\n'+name;
            }
            if(args.includes('{{json .Config.Labels}}')) return JSON.stringify(labels);
            if(args.includes('{{.State.Running}}')) return 'true';
            throw new Error('UNEXPECTED_DOCKER_COMMAND');
        };
        assert.equal(resolveIsolatedQaDatabaseContainer(run,qaProfile,'/qa'),name);
    }
});
test('QA aislado: rechaza proyectos ajenos, UUID invalido y servicio incorrecto',()=>{
    for(const labels of [
        {...qaLabels,'com.docker.compose.project':'supabase-principal-aaaaaaaaaaaa'},
        {...qaLabels,'com.docker.compose.project':'supabase-vento_gap_pkg_004_qa_isolado-zzzzzzzzzzzz'},
        {...qaLabels,'com.supabase.instance':'not-a-uuid'},
        {...qaLabels,'com.supabase.instance':null},
        {...qaLabels,'com.supabase.service':'auth'},
    ]) assert.throws(()=>validateIsolatedQaLabels(labels,qaProfile),
        /QA_DOCKER_IDENTITY_MISMATCH/u);
});
test('QA aislado: resuelve contenedor activo por namespace y exige unicidad',()=>{
    const replacement=qaProfile.databaseContainerPrefix+'123456789abc';
    const runFor=(names,labels=qaLabels,state='true')=>(command,args)=>{
        assert.equal(command,'docker');
        if(args[0]==='ps'){
            assert.deepEqual(args,[
                'ps','--filter','label=com.supabase.service=database',
                '--format','{{.Names}}',
            ]);
            return names;
        }
        if(args.includes('{{json .Config.Labels}}')) return JSON.stringify(labels);
        if(args.includes('{{.State.Running}}')) return state;
        throw new Error('UNEXPECTED_DOCKER_COMMAND');
    };
    assert.equal(resolveIsolatedQaDatabaseContainer(runFor(qaContainerName),qaProfile,'/qa'),
        qaContainerName);
    assert.equal(resolveIsolatedQaDatabaseContainer(runFor(replacement),qaProfile,'/qa'),
        replacement);
    assert.equal(resolveIsolatedQaDatabaseContainer(
        runFor('supabase-OTHER-database-aaaaaaaaaaaa\n'+replacement),qaProfile,'/qa'),
        replacement);
    for(const names of [
        '',qaContainerName+'\n'+replacement,'supabase-db-helper-123456789abc',
        qaContainerName+';other',
    ]) assert.throws(
        ()=>resolveIsolatedQaDatabaseContainer(runFor(names),qaProfile,'/qa'),
        /QA_DOCKER_DATABASE_CONTAINER_MISSING_OR_AMBIGUOUS/u);
    assert.throws(()=>resolveIsolatedQaDatabaseContainer(runFor(qaContainerName,{
        ...qaLabels,'com.docker.compose.project':'supabase-principal-aaaaaaaaaaaa',
    }),qaProfile,'/qa'),/QA_DOCKER_IDENTITY_MISMATCH/u);
    assert.throws(()=>resolveIsolatedQaDatabaseContainer(runFor(qaContainerName,qaLabels,'false'),
        qaProfile,'/qa'),/QA_DOCKER_CONTAINER_NOT_RUNNING/u);
});

test('QA aislado: tres escenarios canonicos, sin inventar rutas',()=>{
    assert.deepEqual(readIsolatedQaScenarios(syntheticQaGate(),qaProfile),
        ['same_site','cross_site_global','cross_site_site_only']);
    const bad=syntheticQaGate();
    bad.evidence_plan.tests[0].qa_scope.scenarios.pop();
    assert.throws(()=>readIsolatedQaScenarios(bad,qaProfile),
        /QA_CANONICAL_SCENARIOS_DRIFT/u);
});

test('QA aislado: preflight de solo lectura verifica REST, SQL e historial',async()=>{
    await withQaFixture(async ({root,temp})=>{
        const calls=[];
        const run=(command,args)=>{
            calls.push([command,args]);
            if (args[0]==='ps') return qaContainerName;
            if (args.includes('{{json .Config.Labels}}')) return JSON.stringify(qaLabels);
            if (args.includes('inspect')) return 'true';
            if (args.includes('status')) return qaStatus;
            if (args.includes('exec')) {
                if (args.some(v=>typeof v==='string' && v.includes('information_schema.columns c')))
                    return 'NONE|permission_scope_type|global,site';
                if (args.some(v=>typeof v==='string' && v.includes('gap_pkg_004_templates_manage_read')))
                    return '3|3|1|1|0|4|1|0';
                if (args.includes('-i') || args.some(v=>typeof v==='string' && v.includes('auth.users WHERE email LIKE')))
                    return '0|0|0|0';
                // GAP-PKG-004 QA requires viso.access ABSENT from the initial catalog.
                return '23|1|0|0|a1111111-1111-1111-1111-111111111111|1|0';
            }
            throw Error('UNKNOWN_TEST_COMMAND');
        };
        const request=async (url,options)=>{
            calls.push([url,options.method]);
            assert.equal(options.method,'GET');
            const canonical=url.includes('workforce.employees.view');
            return {
                status:200,
                json:async()=>url.includes('app_permissions')
                    ?canonical?[{app_id:'a1111111-1111-1111-1111-111111111111',
                        code:'workforce.employees.view'}]:[]
                    :[{id:'a1111111-1111-1111-1111-111111111111',code:'viso'}],
            };
        };
        const result=await runIsolatedQaPreflight({root,temp,run,request});
        assert.equal(result.target,'VERIFIED');
        assert.equal(result.scenariosDeclared,3);
        assert.equal(result.visoAccess,false,'QA baseline must lack viso.access; absence is expected, not a missing authorization');
        assert.equal(result.actualAuthenticatedScenarios,'NOT_EXECUTED');
        assert.equal(result.writesPerformed,false);
        assert.equal(result.templateRls.ready,true);
        assert.equal(result.templateRls.restrictivePolicies,3);
        assert.equal(result.templateRls.invokerViews,4);
        assert.equal(result.templateRls.staffManage,true);
        assert.equal(result.templateRls.activeTemplates,0);
        assert.equal(calls.filter(([,action])=>action==='GET').length,4);
        assert.equal(calls.filter(([,action])=>['POST','PATCH','DELETE'].includes(action)).length,0);
    });
});



test('QA aislado: identifica replay RLS obsoleto aunque tenga las 23 versiones',()=>{
    const good=parseIsolatedQaTemplateRlsSummary('3|3|1|1|0|4|1|0');
    assert.equal(good.ready,true);
    assert.equal(good.invoker,true);
    assert.equal(good.anonGrant,false);
    assert.equal(good.invokerViews,4);
    assert.equal(good.staffManage,true);
    assert.equal(good.activeTemplates,0);
    assert.equal(parseIsolatedQaTemplateRlsSummary('3|3|1|1|0|4|1|2').activeTemplates,2);
    const stale=parseIsolatedQaTemplateRlsSummary('0|3|0|1|0|0|0|0');
    assert.equal(stale.ready,false);
    assert.equal(stale.restrictivePolicies,0);
    assert.equal(stale.staffManage,false);
    for (const drift of ['3|3|1|1|1|4|1|0','3|2|1|1|0|4|1|0',
        '3|3|0|1|0|4|1|0','3|3|1|0|0|4|1|0',
        '3|3|1|1|0|3|1|0','3|3|1|1|0|4|0|0'])
        assert.equal(parseIsolatedQaTemplateRlsSummary(drift).ready,false);
    for (const invalid of ['23|1|0|0','', '4|3|1|1|0|4|1|0',
        '3|3|1|1|0|4|1|0|0','3|3|service_role|1|0|4|1|0']) assert.throws(
        ()=>parseIsolatedQaTemplateRlsSummary(invalid),
        /QA_TEMPLATE_RLS_SUMMARY_INVALID/u);
});

test('QA aislado: prepara SOLO vistas y politicas candidatas en transaccion aislada',()=>{
    const root=path.resolve(path.dirname(fileURLToPath(import.meta.url)),'../..');
    const source=fs.readFileSync(path.join(root,'supabase','migrations',
        '20261012173553_gap_pkg_004_rpc_acl_hardening.sql'),'utf8');
    const sql=buildIsolatedQaTemplatePatchSQL(source);
    assert.match(sql,/^BEGIN;\n/u);
    assert.match(sql,/COMMIT;\s*$/u);
    assert.equal([...sql.matchAll(/^alter view public\./gmu)].length,4);
    assert.equal([...sql.matchAll(/^create policy gap_pkg_004_/gmu)].length,3);
    assert.match(sql,/GAP-PKG-004 QA catalog staff.manage/u);
    assert.match(sql,/DO \$qa_template_verify\$\nBEGIN/u);
    assert.match(sql,/RAISE EXCEPTION 'QA_TEMPLATE_PREPARATION_POSTCONDITION_FAILED'/u);
    assert.equal([...sql.matchAll(/^COMMIT;$/gmu)].length,1);
    assert.ok(sql.indexOf('RAISE EXCEPTION')<sql.lastIndexOf('COMMIT;'),
        'The SQL server must verify postconditions BEFORE the irreversible commit');
    assert.doesNotMatch(sql,/\b(?:db reset|ALTER ROLE|DROP TABLE|https?:\/\/)\b/iu);
    assert.throws(()=>buildIsolatedQaTemplatePatchSQL(
        source.replace('create policy gap_pkg_004_templates_manage_read',
            'create policy gap_pkg_004_unexpected_read')),
        /QA_TEMPLATE_POLICY_PATCH_DRIFT/u);
    assert.throws(()=>buildIsolatedQaTemplatePatchSQL(
        source.replace('alter view public.shared_operational_device_templates_admin_v1 set (security_invoker = true);',
            'alter view public.shared_operational_device_templates_admin_v1 set (security_invoker = false);')),
        /QA_TEMPLATE_VIEW_PATCH_DRIFT/u);
});

test('QA aislado: fixture visual protegido, simetrico y con verificacion antes de COMMIT',()=>{
    const seed=buildIsolatedQaVisualTemplateFixtureSQL('seed');
    const cleanup=buildIsolatedQaVisualTemplateFixtureSQL('cleanup');
    for (const sql of [seed,cleanup]) {
        assert.match(sql,/^BEGIN;\n/u);
        assert.equal([...sql.matchAll(/^COMMIT;$/gmu)].length,1);
        assert.match(sql,/RAISE EXCEPTION 'QA_VISUAL_FIXTURE_PRECONDITION_FAILED'/u);
        assert.match(sql,/RAISE EXCEPTION 'QA_VISUAL_FIXTURE_POSTCONDITION_FAILED'/u);
        assert.ok(sql.lastIndexOf('QA_VISUAL_FIXTURE_POSTCONDITION_FAILED')<
            sql.lastIndexOf('COMMIT;'));
        assert.doesNotMatch(sql,/DROP (?:SCHEMA|TABLE|DATABASE)|ALTER ROLE|TRUNCATE|db reset/iu);
        assert.match(sql,/GAP004QA_VISUAL_TEMPLATE/u);
        assert.match(sql,/GAP004 QA Visual Template/u);
    }
    assert.match(seed,/WITH created AS \(INSERT INTO public.shared_operational_device_templates/u);
    assert.match(seed,/INSERT INTO public.shared_operational_device_template_apps/u);
    assert.doesNotMatch(seed,/DELETE FROM/u);
    assert.match(cleanup,/DELETE FROM public.shared_operational_device_template_apps/u);
    assert.match(cleanup,/DELETE FROM public.shared_operational_device_templates/u);
    assert.ok(cleanup.indexOf('DELETE FROM public.shared_operational_device_template_apps')<
        cleanup.indexOf('DELETE FROM public.shared_operational_device_templates WHERE'));
    assert.doesNotMatch(cleanup,/INSERT INTO/u);
    assert.match(cleanup,/shared_operational_devices/u);
    assert.throws(()=>buildIsolatedQaVisualTemplateFixtureSQL('reset'),
        /QA_VISUAL_FIXTURE_ACTION_INVALID/u);
});

test('QA aislado: REST y PostgreSQL deben compartir UUID VISO sin grants implicitos',()=>{
    const id='a1111111-1111-1111-1111-111111111111';
    assert.equal(
        validateIsolatedQaDatabaseState('23|1|0|0|'+id+'|1|1',qaProfile,id),
        true,
    );
    for (const drift of [
        '23|1|0|0|b2222222-2222-2222-2222-222222222222|1|1',
        '23|1|1|0|'+id+'|1|1',
        '23|1|0|1|'+id+'|1|1',
        '22|1|0|0|'+id+'|1|1',
        '23|0|0|0|'+id+'|1|1',
        '23|1|0|0|'+id+'|3|1',
    ]) assert.throws(
        ()=>validateIsolatedQaDatabaseState(drift,qaProfile,id),
        /QA_REST_POSTGRES_IDENTITY_OR_SECURITY_DRIFT/u,
    );
});


test('QA aislado: exige autorizacion explicita y escenarios SITE/GLOBAL exactos',()=>{
    const root=path.resolve(path.dirname(fileURLToPath(import.meta.url)),'../..');
    const gate=JSON.parse(fs.readFileSync(path.join(root,
        'docs/plan-canonico/modular/package-gate-instances/GAP-PKG-004.json'),'utf8'));
    const scenarios=authorizeIsolatedQaHttpPlan(gate,qaProfile);
    assert.deepEqual(scenarios.map(s=>s.key),
        ['same_site','cross_site_global','cross_site_site_only']);
    const unauthorized=structuredClone(gate);
    unauthorized.evidence_plan.tests=unauthorized.evidence_plan.tests.filter(t=>
        t.command!=='npm run qa:isolated:viso:auth');
    assert.throws(()=>authorizeIsolatedQaHttpPlan(unauthorized,qaProfile),
        /QA_AUTHORIZATION_MISSING/u);
    const expanded=structuredClone(gate);
    const scope=expanded.evidence_plan.tests.find(t=>
        t.command==='MCP_BROWSER_QA_READ_ONLY' &&
        t.qa_scope?.route_pattern==='/staff/[id]').qa_scope;
    scope.scenarios[2].identities[0].permissions[1].scope='global';
    assert.throws(()=>authorizeIsolatedQaHttpPlan(expanded,qaProfile),
        /QA_AUTH_PERMISSION_DRIFT/u);
});


test('QA aislado: SQL sintetico crea solo permisos individuales y limpieza simetrica',()=>{
    const root=path.resolve(path.dirname(fileURLToPath(import.meta.url)),'../..');
    const gate=JSON.parse(fs.readFileSync(path.join(root,
        'docs/plan-canonico/modular/package-gate-instances/GAP-PKG-004.json'),'utf8'));
    const plan=qaMakePlan(authorizeIsolatedQaHttpPlan(gate,qaProfile));
    assert.equal(plan.actors.length,6);
    assert.equal(plan.sites.length,5);
    for (let i=0;i<plan.actors.length;i++) {
        const actor=plan.actors[i];
        actor.id='b0040000-0000-4000-8000-'+String(i+1).padStart(12,'0');
        assert.match(actor.email,/^gap004qa-[a-f0-9]{16}-[0-9]+@example\.invalid$/u);
        assert.ok(actor.password.length>35);
    }
    const seed=qaSeedSQL(plan);
    const cleanup=qaCleanupSQL(plan);
    const residual=qaResidualSQL(plan);
    assert.match(seed,/^BEGIN;/u);
    assert.match(seed,/COMMIT;\s*$/u);
    assert.match(seed,/INSERT INTO public\.employee_permissions/u);
    assert.match(seed,/f\.scope_type::public\.permission_scope_type/u);
    assert.match(seed,/ON CONFLICT \(employee_id,site_id\) DO NOTHING/u);
    assert.doesNotMatch(seed,/INSERT INTO public\.role_permissions/u);
    assert.doesNotMatch(seed,/DROP TABLE|ALTER ROLE|db reset/iu);
    assert.match(seed,/GAP004 QA TEMP ACCESS/u);
    assert.match(cleanup,/DELETE FROM public\.employee_permissions/u);
    assert.match(cleanup,/DELETE FROM public\.employee_sites/u);
    assert.match(cleanup,/DELETE FROM public\.employee_settings/u);
    assert.match(cleanup,/SET LOCAL session_replication_role=replica/u);
    assert.match(cleanup,/QA_CLEANUP_OWNERSHIP_DRIFT/u);
    assert.match(cleanup,/DELETE FROM public\.employees/u);
    assert.match(cleanup,/DELETE FROM public\.users/u);
    assert.match(cleanup,/DELETE FROM public\.sites/u);
    assert.match(cleanup,/DELETE FROM public\.app_permissions/u);
    assert.doesNotMatch(cleanup,/DELETE FROM public\.role_permissions/u);
    assert.match(residual,/auth\.users/u);
    assert.match(residual,/employee_permissions/u);
});

test('QA aislado: bloquea esquema y enum ajenos antes de crear usuarios',()=>{
    assert.equal(validateIsolatedQaAuthSchema(
        'NONE|permission_scope_type|global,site,site_type,area,area_kind'),true);
    for (const drift of [
        'public.sites.name|permission_scope_type|global,site',
        'NONE|text|global,site',
        'NONE|permission_scope_type|site',
        'NONE|permission_scope_type|global',
        'NONE|permission_scope_type|global,site|extra',
    ]) {
        assert.throws(()=>validateIsolatedQaAuthSchema(drift),/QA_SCHEMA_DRIFT/u);
    }
});


test('QA recovery exige inventario exacto y prohibe superficies nuevas',()=>{
    const ctx={
        postgresState:'23|1|0|3|a1111111-1111-1111-1111-111111111111|1|1',
        visoAppId:'a1111111-1111-1111-1111-111111111111',
        aggregate:'6|5|1|6',
        owned:'6|1|6|6|6|6|5|0',
    };
    assert.equal(validateIsolatedQaRecoverySurfaces(ctx),true);
    for (const field of ['postgresState','aggregate','owned','visoAppId']) {
        const bad={...ctx,[field]:'0'};
        assert.throws(()=>validateIsolatedQaRecoverySurfaces(bad),
            /QA_RECOVERY_SURFACE_MISMATCH/u);
    }
    assert.throws(()=>validateIsolatedQaRecoverySurfaces({...ctx,
        postgresState:'23|1|1|3|a1111111-1111-1111-1111-111111111111|1|1'}),
    /QA_RECOVERY_SURFACE_MISMATCH/u);
});
test('QA recovery usa un unico marcador propio, rollback previo y borrado acotado',()=>{
    const tag='0123456789abcdef';
    const dry=qaRecoverySQL(tag,false);
    const commit=qaRecoverySQL(tag,true);
    assert.ok(dry.startsWith('BEGIN;'));
    assert.ok(commit.startsWith('BEGIN;'));
    assert.match(dry,/SET LOCAL session_replication_role=replica;/u);
    assert.match(dry,/QA_RECOVERY_OWNERSHIP_DRIFT/u);
    assert.match(dry,/raw_app_meta_data->>'vento_qa_owner'='GAP-PKG-004'/u);
    assert.match(dry,/raw_app_meta_data->>'vento_qa_run'='0123456789abcdef'/u);
    assert.ok(dry.includes('GAP004QA012345[0-4]'));
    for (const relation of ['employee_permissions','employee_sites','employee_settings',
        'employees','users','sites','app_permissions']) {
        assert.ok(dry.includes('DELETE FROM public.'+relation+' WHERE'));
    }
    assert.ok(dry.endsWith('ROLLBACK;'));
    assert.ok(commit.endsWith('COMMIT;'));
    assert.equal(commit.replace(/COMMIT;$/u,'ROLLBACK;'),dry);
    assert.doesNotMatch(dry,/DELETE FROM auth.users|DELETE FROM public.role_permissions|TRUNCATE/iu);
    assert.throws(()=>qaRecoverySQL('invalid',false),/QA_RECOVERY_TAG_INVALID/u);
});

test('QA aislado: rechaza Docker incorrecto ANTES de HTTP y CLI',async()=>{
    await withQaFixture(async ({root,temp})=>{
        let httpCalls=0;
        const run=(cmd,args)=>args[0]==='ps'?qaContainerName:
            args.includes('{{json .Config.Labels}}')
                ?JSON.stringify({...qaLabels,'com.supabase.instance':'unsafe'}):'true';
        await assert.rejects(
            runIsolatedQaPreflight({root,temp,run,
                request:async()=>{httpCalls++;return {status:200};}}),
            /QA_DOCKER_IDENTITY_MISMATCH/u);
        assert.equal(httpCalls,0);
    });
});

test('QA auth: consulta attendance_policy bajo JWT antes de contar PASS y conserva limpieza', () => {
    const source = fs.readFileSync(new URL('./supabase-db-harness.mjs', import.meta.url), 'utf8');
    const authStart = source.indexOf('export async function runAuthorizedIsolatedQaAuthScenario(');
    const authEnd = source.indexOf('function printQaAuthResult(', authStart);
    assert.ok(authStart >= 0 && authEnd > authStart);
    const scenario = source.slice(authStart, authEnd);
    const login = scenario.indexOf('client.auth.signInWithPassword(');
    const policy = scenario.indexOf(".from('attendance_policy')");
    const success = scenario.indexOf('passed.push(scenario.key)');
    const cleanup = scenario.indexOf("qaSql(ctx,qaCleanupSQL(plan),'CLEANUP')");
    assert.ok(login >= 0 && login < policy && policy < success && success < cleanup);
    assert.match(scenario, /policyError\.code === '42501'/u);
    assert.match(scenario, /QA_AUTH_ATTENDANCE_POLICY_42501/u);
    assert.match(scenario, /QA_AUTH_ATTENDANCE_POLICY_DB_COUNT_INVALID/u);
    assert.match(scenario, /QA_AUTH_ATTENDANCE_POLICY_ROW_NOT_VISIBLE/u);
    assert.match(scenario, /EMPTY_TABLE_FALLBACK/u);
    assert.match(scenario, /policyReadStatuses\.push\('ROW_READ'\)/u);
    assert.match(source, /QA_AUTH_ATTENDANCE_POLICY: /u);
    assert.match(scenario, /admin\.auth\.admin\.deleteUser\(actor\.id\)/u);
    assert.match(scenario, /QA_CLEANUP_INCOMPLETE/u);
});
