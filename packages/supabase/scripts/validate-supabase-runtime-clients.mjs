import crypto from 'node:crypto';
import { spawnSync } from 'node:child_process';
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';

import { parseTaskBlocks } from '../../../scripts/docs/format-canonical-task.mjs';

const here = path.dirname(fileURLToPath(import.meta.url));
const packageRoot = path.resolve(here, '..');
const repoRoot = path.resolve(packageRoot, '..', '..');
const srcRoot = path.join(packageRoot, 'src');
const ownerPath = path.join(
    repoRoot,
    'docs',
    'plan-canonico',
    'modular',
    'bloques',
    'H_FUNDACION_COMPARTIDA',
    '06_ACCESO_COMPARTIDO_A_DATOS.md',
);
const packagePath = path.join(packageRoot, 'package.json');
const rootPackagePath = path.join(repoRoot, 'package.json');
const lockPath = path.join(repoRoot, 'package-lock.json');
const readmePath = path.join(packageRoot, 'README.md');

const SOURCE_CONTRACT_SHA256 = 'c47ab647ac18a5aa87a731ea42cc30b7d2d0062054a6d4b74e0a27c1009bf49b';
const EXPECTED_SSR_VERSION = '0.8.0';
const EXPECTED_SUPABASE_JS_VERSION = '2.90.1';

function assert(condition, message) {
    if (!condition) throw new Error(message);
}

function includesAll(source, expected, label) {
    for (const value of expected) assert(source.includes(value), `${label} missing: ${value}`);
}

function excludesAll(source, forbidden, label) {
    for (const value of forbidden) assert(!source.includes(value), `${label} contains forbidden value: ${value}`);
}

function run(command, args) {
    return spawnSync(command, args, {
        cwd: repoRoot,
        encoding: 'utf8',
        windowsHide: true,
    });
}

function sha256(value) {
    return crypto.createHash('sha256').update(value, 'utf8').digest('hex');
}

function canonicalTaskBlock(owner, taskId) {
    const task = parseTaskBlocks(owner).find((entry) => entry.id === taskId) ?? null;
    assert(task, `canonical task ${taskId} not found`);
    return task.block;
}

function read(relativePath) {
    return fs.readFileSync(path.join(repoRoot, ...relativePath.split('/')), 'utf8');
}

function assertGitUnchanged(paths) {
    const result = run('git', ['diff', '--quiet', '--', ...paths]);
    assert(result.status === 0, `out-of-scope immutable file changed: ${paths.join(', ')}`);
}

function compileRuntime(tempDir) {
    const tscCli = path.join(repoRoot, 'node_modules', 'typescript', 'bin', 'tsc');
    assert(fs.existsSync(tscCli), `TypeScript CLI not found: ${tscCli}`);
    const runtimePath = path.join(srcRoot, 'runtime.ts');
    const result = run(process.execPath, [
        tscCli,
        '--pretty', 'false',
        '--strict',
        '--skipLibCheck',
        '--target', 'ES2022',
        '--module', 'NodeNext',
        '--moduleResolution', 'NodeNext',
        '--rootDir', packageRoot,
        '--outDir', tempDir,
        runtimePath,
    ]);
    assert(result.status === 0, `runtime TypeScript compile failed: ${result.stderr || result.stdout}`);
}

function assertThrows(action, expected, label) {
    let error = null;
    try {
        action();
    } catch (caught) {
        error = caught;
    }
    assert(error instanceof Error, `${label} did not throw`);
    assert(error.message.includes(expected), `${label} threw unexpected error: ${error.message}`);
}

function base64Url(value) {
    return Buffer.from(value, 'utf8').toString('base64url');
}

function syntheticJwt(role) {
    return `${base64Url(JSON.stringify({ alg: 'HS256', typ: 'JWT' }))}.${base64Url(JSON.stringify({ role }))}.synthetic`;
}

async function runtimeApi(tempDir) {
    compileRuntime(tempDir);
    const compiled = path.join(tempDir, 'src', 'runtime.js');
    return import(`${pathToFileURL(compiled).href}?v=${Date.now()}`);
}

async function main() {
    assertGitUnchanged([
        'package.json',
        'package-lock.json',
        'packages/supabase/package.json',
        'packages/supabase/src/errors.ts',
        'middleware.ts',
        'supabase',
    ]);

    const packageJson = JSON.parse(fs.readFileSync(packagePath, 'utf8'));
    assert(packageJson.name === '@vento/supabase', 'package name mismatch');
    assert(packageJson.private === true && packageJson.type === 'module', 'package boundary mismatch');
    assert(packageJson.version === '0.1.0-alpha.1', 'private candidate version mismatch');
    assert(!('dependencies' in packageJson), 'package must not absorb runtime client dependencies');
    assert(packageJson.files?.length === 1 && packageJson.files[0] === 'dist/',
      'private package must distribute only compiled outputs');
    assert(packageJson.peerDependencies?.['@supabase/ssr'] === '^0.8.0'
      && packageJson.peerDependencies?.['@supabase/supabase-js'] === '^2.90.1',
      'published peer compatibility contract mismatch');
    for (const boundary of ['browser', 'server', 'native', 'runtime', 'errors']) {
      const entry = packageJson.exports?.['./' + boundary];
      assert(entry?.import === './dist/' + boundary + '.js'
        && entry?.types === './dist/' + boundary + '.d.ts',
        'runtime export must point to compiled ESM and typings:' + boundary);
    }
    assert(!packageJson.exports?.['.'], 'root runtime factory export must remain forbidden');
    assert(packageJson.exports?.['./privileged']?.node === './dist/privileged.js'
      && !packageJson.exports?.['./privileged']?.import
      && !packageJson.exports?.['./privileged']?.default,
      'privileged runtime must be Node-only');

    const rootPackage = JSON.parse(fs.readFileSync(rootPackagePath, 'utf8'));
    assert(rootPackage.dependencies?.['@supabase/ssr'] === '^0.8.0', 'root @supabase/ssr range mismatch');
    assert(rootPackage.dependencies?.['@supabase/supabase-js'] === '^2.90.1', 'root supabase-js range mismatch');
    const lock = JSON.parse(fs.readFileSync(lockPath, 'utf8'));
    assert(lock.packages?.['node_modules/@supabase/ssr']?.version === EXPECTED_SSR_VERSION, 'locked @supabase/ssr version mismatch');
    assert(lock.packages?.['node_modules/@supabase/supabase-js']?.version === EXPECTED_SUPABASE_JS_VERSION, 'locked supabase-js version mismatch');

    const owner = fs.readFileSync(ownerPath, 'utf8');
    const taskBlock = canonicalTaskBlock(owner, 'SHELL-DB-005');
    assert(sha256(taskBlock) === SOURCE_CONTRACT_SHA256, 'SHELL-DB-005 source contract SHA256 mismatch');
    assert(
        owner.includes('| `SHELL-DB-005` | `GLOBAL_ENABLE_ONCE` | `PRE_E5_FOUNDATION` |'),
        'physical topology reconciliation missing',
    );

    const runtime = read('packages/supabase/src/runtime.ts');
    const browser = read('packages/supabase/src/browser.ts');
    const server = read('packages/supabase/src/server.ts');
    const native = read('packages/supabase/src/native.ts');
    const privileged = read('packages/supabase/src/privileged.ts');
    const readme = fs.readFileSync(readmePath, 'utf8');

    for (const [label, source] of [
        ['runtime', runtime],
        ['browser', browser],
        ['server', server],
        ['native', native],
        ['privileged', privileged],
    ]) {
        excludesAll(source, ['process.env', 'NEXT_PUBLIC_', 'SUPABASE_SERVICE_ROLE_KEY'], label);
    }

    const tempDir = fs.mkdtempSync(path.join(os.tmpdir(), 'vento-supabase-runtime-'));
    const covered = new Set();
    const cover = (number, assertion) => {
        assertion();
        covered.add(number);
    };

    try {
        const api = await runtimeApi(tempDir);
        const publicConfig = { url: 'https://project.supabase.co', publicKey: 'sb_publishable_synthetic' };
        const policy = { allowSharedDomain: true, sharedDomain: 'ventogroup.co', allowInsecureHttp: false };

        cover(1, () => includesAll(browser, ["from '@supabase/ssr'", 'createBrowserClient'], 'browser import'));
        cover(2, () => includesAll(server, ["from '@supabase/ssr'", 'createServerClient'], 'server import'));
        cover(3, () => includesAll(native, ["from '@supabase/supabase-js'", 'createNativeClient'], 'native import'));
        cover(4, () => includesAll(privileged, ["from '@supabase/supabase-js'", 'createPrivilegedClient'], 'privileged import'));
        cover(5, () => {
            assert(!fs.existsSync(path.join(srcRoot, 'index.ts')), 'runtime factory barrel must not exist');
            assert(!packageJson.exports?.['.'], 'root package must not combine runtime factories');
            assert(!packageJson.exports?.['./privileged']?.import,
              'privileged runtime must not resolve in browser import condition');
        });
        cover(6, () => excludesAll(browser, ['./server', './native', './privileged', 'next/'], 'browser boundary'));
        cover(7, () => excludesAll(server, ['./browser', './native', './privileged', 'next/'], 'server boundary'));
        cover(8, () => excludesAll(native, ['@supabase/ssr'], 'native SSR boundary'));
        cover(9, () => excludesAll(native, ['next/', 'next/headers'], 'native Next boundary'));
        cover(10, () => excludesAll(browser, ['privileged', 'serviceRoleKey'], 'browser privileged reachability'));
        cover(11, () => excludesAll(native, ['privileged', 'serviceRoleKey'], 'native privileged reachability'));
        cover(12, () => assertThrows(() => api.assertSupabaseUrl(''), 'url must be non-empty', 'missing URL'));
        cover(13, () => assertThrows(() => api.assertPublicSupabaseKey(''), 'publicKey must be non-empty', 'missing public key'));
        cover(14, () => assertThrows(
            () => api.assertPublicSupabaseKey(syntheticJwt('service_role')),
            'publicKey cannot carry the service_role role',
            'browser service role boundary',
        ));
        cover(15, () => {
            assert(server.includes('assertPublicSupabaseConfig(config)'), 'server does not use public credential guard');
            assertThrows(() => api.assertPublicSupabaseKey(syntheticJwt('service_role')), 'service_role', 'server service role boundary');
        });
        cover(16, () => {
            assert(native.includes('assertPublicSupabaseConfig(config)'), 'native does not use public credential guard');
            assertThrows(() => api.assertPublicSupabaseKey('sb_secret_synthetic'), 'secret key', 'native secret boundary');
        });
        cover(17, () => {
            assert((server.match(/createSupabaseServerClient\(/gu) ?? []).length === 1, 'server client construction count mismatch');
            excludesAll(server, ['let serverClient', 'const serverClient =', 'globalThis'], 'server request lifecycle');
        });
        cover(18, () => excludesAll(server, ['cookieStore =', 'cachedCookies', 'globalThis'], 'server cookie isolation'));
        cover(19, () => {
            assert(browser.includes('isSingleton: false'), 'browser upstream singleton is not disabled');
            excludesAll(browser, ['let browserClient', 'globalThis'], 'browser package cache');
        });
        cover(20, () => excludesAll(native, ['let nativeClient', 'globalThis'], 'native package cache'));
        cover(21, () => includesAll(native, ['assertNativeSessionStorage(config.storage)', 'storage,', 'persistSession: true'], 'native persistent storage'));
        cover(22, () => excludesAll(native, ['localStorage', 'memoryStorage', 'Map<'], 'native memory fallback'));
        cover(23, () => includesAll(server, ["cookieWriteMode === 'READ_ONLY'", 'config.cookies.setAll(cookies)'], 'server READ_WRITE setAll'));
        cover(24, () => {
            assert(!/setAll:[\s\S]{0,500}catch\s*\{/u.test(server), 'server setAll swallows a real write failure');
            assert(server.includes('await config.cookies.setAll(cookies);'), 'server setAll failure is not propagated');
        });
        cover(25, () => includesAll(server, ['ReadOnlyCookieWriteError', 'VENTO_SUPABASE_COOKIE_WRITE_READ_ONLY', "source = 'ADAPTER'"], 'READ_ONLY technical condition'));
        cover(26, () => {
            const options = api.resolveCanonicalCookieOptions({ currentHost: 'localhost', isSecureContext: true, cookiePolicy: policy });
            assert(!('domain' in options), 'localhost received shared domain');
        });
        cover(27, () => {
            const options = api.resolveCanonicalCookieOptions({ currentHost: '127.0.0.1', isSecureContext: true, cookiePolicy: policy });
            assert(!('domain' in options), 'IP received shared domain');
        });
        cover(28, () => {
            const options = api.resolveCanonicalCookieOptions({ currentHost: 'example.com', isSecureContext: true, cookiePolicy: policy });
            assert(!('domain' in options), 'mismatched host received shared domain');
        });
        cover(29, () => {
            const options = api.resolveCanonicalCookieOptions({ currentHost: 'os.ventogroup.co', isSecureContext: true, cookiePolicy: policy });
            assert(options.domain === 'ventogroup.co', 'valid subdomain did not receive shared domain');
            assertThrows(
                () => api.resolveCanonicalCookieOptions({ isSecureContext: true, cookiePolicy: policy }),
                'currentHost is required when shared domain is enabled',
                'shared domain without current host',
            );
        });
        cover(30, () => {
            const options = api.resolveCanonicalCookieOptions({ currentHost: 'os.ventogroup.co', isSecureContext: true, cookiePolicy: policy });
            assert(options.path === '/', 'cookie path mismatch');
        });
        cover(31, () => {
            const options = api.resolveCanonicalCookieOptions({ currentHost: 'os.ventogroup.co', isSecureContext: true, cookiePolicy: policy });
            assert(options.sameSite === 'lax', 'cookie sameSite mismatch');
        });
        cover(32, () => {
            const options = api.resolveCanonicalCookieOptions({ currentHost: 'os.ventogroup.co', isSecureContext: true, cookiePolicy: policy });
            assert(options.secure === true, 'HTTPS cookie is not secure');
        });
        cover(33, () => {
            const options = api.resolveCanonicalCookieOptions({
                currentHost: 'localhost',
                isSecureContext: false,
                cookiePolicy: { allowSharedDomain: false, allowInsecureHttp: true },
            });
            assert(options.secure === false, 'explicit development HTTP stayed secure');
            assertThrows(
                () => api.resolveCanonicalCookieOptions({
                    currentHost: 'localhost',
                    isSecureContext: false,
                    cookiePolicy: { allowSharedDomain: false, allowInsecureHttp: false },
                }),
                'insecure HTTP requires explicit',
                'implicit insecure HTTP',
            );
        });
        cover(34, () => excludesAll(runtime + browser + server, ['expires:', 'maxAge:'], 'provider expiration preservation'));
        cover(35, () => {
            includesAll(browser, ['cookieOptions,'], 'browser cookie scope');
            includesAll(server, ['cookieOptions,'], 'server cookie scope');
            assert(server.includes('await config.cookies.setAll(cookies);'), 'server adapter does not preserve provider cookie writes');
        });
        cover(36, () => excludesAll(browser, ['serviceRoleKey', 'SUPABASE_', 'process.env'], 'browser server fallback'));
        cover(37, () => excludesAll(runtime + browser + server + native + privileged, ['process.env'], 'implicit environment lookup'));
        cover(38, () => assert(owner.includes('wrappers definidos por `SHELL-DB-003` continúan recibiendo un cliente explícito'), 'explicit wrapper client contract missing'));
        cover(39, () => assert(owner.includes('wrapper no crea cliente oculto') || owner.includes('wrappers no crean credenciales'), 'hidden wrapper client prohibition missing'));
        cover(40, () => {
            includesAll(server, ["source = 'ADAPTER'", 'ReadOnlyCookieWriteError'], 'adapter technical diagnostic');
            assertGitUnchanged(['packages/supabase/src/errors.ts']);
        });
        cover(41, () => {
            assertGitUnchanged(['packages/supabase/src/errors.ts']);
            assert(owner.includes('Paridad semántica entre runtimes'), 'runtime outcome parity contract missing');
        });
        cover(42, () => {
            excludesAll(browser + native, ['ProtectedTechnicalDiagnostic', 'protectedDiagnostic', 'serviceRoleKey'], 'privileged diagnostic leakage');
            assertGitUnchanged(['packages/supabase/src/errors.ts']);
        });
        cover(43, () => {
            assertGitUnchanged(['middleware.ts']);
            excludesAll(server, ['matcher', 'redirect(', 'rewrite(', 'NextResponse'], 'middleware routing boundary');
        });
        cover(44, () => assert(owner.includes('adapters locales no alteran credenciales') || owner.includes('no cambian la clase de credencial'), 'local adapter credential contract missing'));
        cover(45, () => assert(owner.includes('admin client') && owner.includes('@vento/supabase/privileged'), 'legacy admin disposition missing'));
        cover(46, () => assert(owner.includes('cliente alterno PULSO') && owner.includes('gate'), 'PULSO retirement gate missing'));
        cover(47, () => assert(owner.includes('No existe migración big-bang') && owner.includes('rollback'), 'consumer rollback contract missing'));
        cover(48, () => assert(owner.includes('compatibilidad') && owner.includes('consumidores'), 'consumer compatibility contract missing'));
        cover(49, () => {
            assert(owner.includes('VITAL permanece separado'), 'VITAL exclusion missing');
            excludesAll(runtime + browser + server + native + privileged, ['VITAL'], 'VITAL code boundary');
        });
        cover(50, () => {
            excludesAll(runtime + browser + server + native + privileged, ['console.log', 'console.error', 'JSON.stringify(config)', 'JSON.stringify(storage)'], 'secret logging');
            assert(api.assertPublicSupabaseConfig(publicConfig).url === publicConfig.url, 'public config validation failed');
            assert(api.assertPrivilegedSupabaseKey('sb_secret_synthetic') === 'sb_secret_synthetic', 'secret key classification failed');
            assert(api.assertPrivilegedSupabaseKey(syntheticJwt('service_role')).length > 0, 'legacy service_role key classification failed');
        });

        assert(covered.size === 50, `behavior coverage mismatch: ${covered.size}/50`);
        includesAll(readme, [
            'SHELL-DB-005::GLOBAL',
            '@vento/supabase/browser',
            '@vento/supabase/server',
            '@vento/supabase/native',
            '@vento/supabase/privileged',
            'READ_WRITE',
            'READ_ONLY',
            'host-only',
            'VITAL',
            '50/50',
        ], 'package README');

        process.stdout.write(
            `PASS: SHELL-DB-005 runtime clients validated; scenarios=${covered.size} `
            + `ssr=${EXPECTED_SSR_VERSION} supabase_js=${EXPECTED_SUPABASE_JS_VERSION} `
            + 'boundaries=4 cookie_policy=PASS service_role=ISOLATED native_storage=EXPLICIT '
            + 'consumers=NOT_MIGRATED vital=EXCLUDED\n',
        );
    } finally {
        fs.rmSync(tempDir, { recursive: true, force: true });
    }
}

main().catch((error) => {
    process.stderr.write(`FAIL: ${String(error instanceof Error ? error.message : error)}\n`);
    process.exitCode = 1;
});