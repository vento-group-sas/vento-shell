import assert from 'node:assert/strict';
import { spawnSync } from 'node:child_process';
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import test from 'node:test';
import { fileURLToPath } from 'node:url';

import {
  __test,
  applyAllowlist,
  assertManagementRequest,
  compareFunctionSets,
  compareLocal,
  compareRemote,
  controllerOutcome,
  evaluateEdgeSecretRequirements,
  extractSqlScalar,
  fetchRemoteFunctionBody,
  inventoryEdgeFunctions,
  normalizeRemoteFunctionBody,
  observeRemoteEnvironment,
  parseRemoteFunctionMultipart,
  parseToml,
  sha256,
  stableStringify,
  validateAllowlist,
  validatePackageScripts,
} from './environment-drift.mjs';

function withTempRoot(callback) {
  const root = fs.mkdtempSync(path.join(os.tmpdir(), 'vento-environment-drift-'));
  try {
    return callback(root);
  } finally {
    fs.rmSync(root, { recursive: true, force: true });
  }
}

test('parsea el subconjunto TOML usado por el contrato ambiental', () => {
  const parsed = parseToml(`
project_id = "vento-shell"
[api]
schemas = ["public", "graphql_public"]
max_rows = 1000
[db]
major_version = 17
[functions.webhook]
verify_jwt = false
`);
  assert.equal(parsed[''].project_id, 'vento-shell');
  assert.deepEqual(parsed.api.schemas, ['public', 'graphql_public']);
  assert.equal(parsed.api.max_rows, 1000);
  assert.equal(parsed.db.major_version, 17);
  assert.equal(parsed['functions.webhook'].verify_jwt, false);
});

test('stableStringify ordena claves sin destruir orden semantico de arreglos', () => {
  assert.equal(stableStringify({ b: 2, a: 1 }), stableStringify({ a: 1, b: 2 }));
  assert.notEqual(stableStringify({ a: [1, 2] }), stableStringify({ a: [2, 1] }));
});

test('inventa Edge Functions con digests, verify_jwt y nombres de secretos sin valores', () => {
  withTempRoot((root) => {
    fs.mkdirSync(path.join(root, 'supabase', 'functions', 'alpha'), { recursive: true });
    fs.writeFileSync(path.join(root, 'supabase', 'config.toml'), '[functions.alpha]\nverify_jwt = false\n', 'utf8');
    fs.writeFileSync(
      path.join(root, 'supabase', 'functions', 'alpha', 'index.ts'),
      'const key = Deno.env.get("PAYMENT_SECRET");\nconst url = Deno.env.get("SUPABASE_URL");\n',
      'utf8',
    );
    const functions = inventoryEdgeFunctions({ root });
    assert.equal(functions.length, 1);
    assert.equal(functions[0].slug, 'alpha');
    assert.equal(functions[0].verify_jwt, false);
    assert.deepEqual(functions[0].referenced_secret_names, ['PAYMENT_SECRET']);
    assert.match(functions[0].source_digest, /^[a-f0-9]{64}$/u);
    assert.equal(JSON.stringify(functions).includes('PAYMENT_SECRET='), false);
  });
});

test('MRP015-040 source parity: BOM UTF-8 y CRLF no producen source drift', () => {
  assert.equal(
    sha256(Buffer.from('\uFEFFexport const value = 1;\r\n', 'utf8')),
    sha256('export const value = 1;\n'),
  );
});

test('MRP015-040 source parity: ignora assets no declarados y npmrc sin configuracion efectiva', () => {
  withTempRoot((root) => {
    const directory = path.join(root, 'supabase', 'functions', 'alpha');

    fs.mkdirSync(path.join(directory, 'assets'), { recursive: true });
    fs.writeFileSync(
      path.join(root, 'supabase', 'config.toml'),
      '[functions.alpha]\nverify_jwt = true\n',
      'utf8',
    );
    fs.writeFileSync(
      path.join(directory, 'index.ts'),
      'export const value = 1;\n',
      'utf8',
    );
    fs.writeFileSync(
      path.join(directory, 'deno.json'),
      '{}\n',
      'utf8',
    );
    fs.writeFileSync(
      path.join(directory, '.npmrc'),
      '# Configuration documentation only\n',
      'utf8',
    );
    fs.writeFileSync(
      path.join(directory, 'assets', 'logo.base64.txt'),
      'not part of runtime source\n',
      'utf8',
    );
    fs.writeFileSync(
      path.join(directory, 'assets', 'logo.png'),
      Buffer.from([0x89, 0x50, 0x4e, 0x47]),
    );

    const [entry] = inventoryEdgeFunctions({ root });

    assert.deepEqual(
      entry.files.map((file) => file.path),
      ['index.ts'],
    );
  });
});

test('MRP015-040 source parity: falla cerrado cuando static_files requiere soporte explicito', () => {
  withTempRoot((root) => {
    const directory = path.join(root, 'supabase', 'functions', 'alpha');

    fs.mkdirSync(path.join(directory, 'assets'), { recursive: true });
    fs.writeFileSync(
      path.join(root, 'supabase', 'config.toml'),
      '[functions.alpha]\nstatic_files = ["./functions/alpha/assets/logo.png"]\n',
      'utf8',
    );
    fs.writeFileSync(
      path.join(directory, 'index.ts'),
      'export const value = 1;\n',
      'utf8',
    );
    fs.writeFileSync(
      path.join(directory, 'assets', 'logo.png'),
      Buffer.from([0x89, 0x50, 0x4e, 0x47]),
    );

    assert.throws(
      () => inventoryEdgeFunctions({ root }),
      /EDGE_FUNCTION_STATIC_FILES_PARITY_UNSUPPORTED:alpha/u,
    );
  });
});

test('MRP015-040 source parity: falla cerrado ante npmrc con configuracion efectiva', () => {
  withTempRoot((root) => {
    const directory = path.join(root, 'supabase', 'functions', 'alpha');

    fs.mkdirSync(directory, { recursive: true });
    fs.writeFileSync(
      path.join(root, 'supabase', 'config.toml'),
      '[functions.alpha]\nverify_jwt = true\n',
      'utf8',
    );
    fs.writeFileSync(
      path.join(directory, 'index.ts'),
      'export const value = 1;\n',
      'utf8',
    );
    fs.writeFileSync(
      path.join(directory, '.npmrc'),
      '@vento:registry=https://registry.example.invalid\n',
      'utf8',
    );

    assert.throws(
      () => inventoryEdgeFunctions({ root }),
      /EDGE_FUNCTION_NPMRC_PARITY_UNSUPPORTED:alpha/u,
    );
  });
});

test('normaliza cuerpo remoto de Edge Function al mismo modelo de archivos', () => {
  const remote = normalizeRemoteFunctionBody(
    'alpha',
    { verify_jwt: true, status: 'ACTIVE', version: 2, ezbr_sha256: 'abc' },
    { files: [{ name: 'alpha/index.ts', content: 'export const x = 1;\r\n' }] },
  );
  assert.equal(remote.slug, 'alpha');
  assert.equal(remote.verify_jwt, true);
  assert.equal(remote.files[0].path, 'index.ts');
  assert.equal(remote.files[0].sha256, sha256('export const x = 1;\n'));
  assert.match(remote.source_digest, /^[a-f0-9]{64}$/u);
});



test('MRP015-040 source parity: conserva deno.json cuando tiene configuracion efectiva', () => {
  withTempRoot((root) => {
    const directory = path.join(root, 'supabase', 'functions', 'alpha');
    fs.mkdirSync(directory, { recursive: true });
    fs.writeFileSync(path.join(root, 'supabase', 'config.toml'), '[functions.alpha]\nverify_jwt = true\n', 'utf8');
    fs.writeFileSync(path.join(directory, 'index.ts'), 'export const value = 1;\n', 'utf8');
    fs.writeFileSync(path.join(directory, 'deno.json'), '{"imports":{"lib":"jsr:@scope/lib@1"}}\n', 'utf8');
    const [entry] = inventoryEdgeFunctions({ root });
    assert.deepEqual(entry.files.map((file) => file.path), ['deno.json', 'index.ts']);
  });
});

test('MRP015-040 source parity: normalizacion remota ignora deno.json vacio y npmrc documental', () => {
  const remote = normalizeRemoteFunctionBody(
    'alpha',
    { verify_jwt: true, status: 'ACTIVE', version: 1 },
    { files: [
      { name: 'alpha/index.ts', content: 'export const x = 1;\n' },
      { name: 'alpha/deno.json', content: '{"imports":{}}\n' },
      { name: 'alpha/.npmrc', content: '# documentation only\n' },
    ] },
  );
  assert.deepEqual(remote.files.map((file) => file.path), ['index.ts']);
});

test('MRP015-040 source parity: normalizacion remota conserva deno.json efectivo', () => {
  const remote = normalizeRemoteFunctionBody(
    'alpha',
    { verify_jwt: true, status: 'ACTIVE', version: 1 },
    { files: [
      { name: 'alpha/index.ts', content: 'export const x = 1;\n' },
      { name: 'alpha/deno.json', content: '{"imports":{"lib":"jsr:@scope/lib@1"}}\n' },
    ] },
  );
  assert.deepEqual(remote.files.map((file) => file.path), ['deno.json', 'index.ts']);
});
test('CORR-011 multipart Edge Function body: consume server-side unbundle sin interpretar ESZIP como JSON', async () => {
  const boundary = 'vento-corr-011-boundary';

  const multipart = Buffer.from(
    [
      `--${boundary}\r\n`,
      'Content-Disposition: form-data; name="metadata"\r\n',
      'Content-Type: application/json\r\n',
      '\r\n',
      '{"deno2_entrypoint_path":"index.ts"}',
      '\r\n',
      `--${boundary}\r\n`,
      'Content-Disposition: form-data; name="file"; filename="index.ts"\r\n',
      'Supabase-Path: alpha/lib/index.ts\r\n',
      'Content-Type: application/typescript\r\n',
      '\r\n',
      'export const value = 1;\r\n\r\n',
      `--${boundary}--\r\n`,
    ].join(''),
    'utf8',
  );

  let observedAccept = null;

  const payload = await fetchRemoteFunctionBody({
    token: 'mock-management-token',
    projectRef: 'staging-ref',
    slug: 'alpha',
    fetchImpl: async (_url, options) => {
      observedAccept = options.headers.Accept;

      return {
        ok: true,
        status: 200,
        headers: {
          get(name) {
            return String(name).toLowerCase() === 'content-type'
              ? `multipart/form-data; boundary=${boundary}`
              : null;
          },
        },
        async arrayBuffer() {
          return multipart.buffer.slice(
            multipart.byteOffset,
            multipart.byteOffset + multipart.byteLength,
          );
        },
      };
    },
  });

  assert.equal(observedAccept, 'multipart/form-data');
  assert.equal(payload.files.length, 1);
  assert.equal(payload.files[0].name, 'alpha/lib/index.ts');

  const normalized = normalizeRemoteFunctionBody(
    'alpha',
    {
      verify_jwt: true,
      status: 'ACTIVE',
      version: 1,
      ezbr_sha256: 'remote-bundle',
    },
    payload,
  );

  assert.equal(normalized.files[0].path, 'lib/index.ts');
  assert.equal(
    normalized.files[0].sha256,
    sha256('export const value = 1;\n'),
  );
});

test('MRP015-040 server-side unbundle: normaliza source/index.ts al path local del entrypoint', () => {
  const boundary = 'vento-mrp015-040-entrypoint';
  const source = 'export const recovered = true;\r\n';
  const multipart = Buffer.from(
    [
      `--${boundary}\r\n`,
      'Content-Disposition: form-data; name="metadata"\r\n',
      'Content-Type: application/json\r\n',
      '\r\n',
      '{"deno2_entrypoint_path":"source/index.ts"}',
      '\r\n',
      `--${boundary}\r\n`,
      'Content-Disposition: form-data; name="file"; filename="index.ts"\r\n',
      'Supabase-Path: source/index.ts\r\n',
      'Content-Type: application/typescript\r\n',
      '\r\n',
      source,
      '\r\n',
      `--${boundary}--\r\n`,
    ].join(''),
    'utf8',
  );

  const payload = parseRemoteFunctionMultipart(
    'recovered',
    multipart,
    `multipart/form-data; boundary=${boundary}`,
  );

  assert.equal(payload.entrypoint_path, 'source/index.ts');

  const normalized = normalizeRemoteFunctionBody(
    'recovered',
    { verify_jwt: true, status: 'ACTIVE', version: 1, ezbr_sha256: 'bundle' },
    payload,
  );

  assert.equal(normalized.files.length, 1);
  assert.equal(normalized.files[0].path, 'index.ts');
  assert.equal(normalized.files[0].sha256, sha256('export const recovered = true;\n'));
});

test('CORR-011 multipart Edge Function body: rechaza rutas multipart que escapen del Function root', () => {
  const boundary = 'vento-corr-011-unsafe';

  const multipart = Buffer.from(
    [
      `--${boundary}\r\n`,
      'Content-Disposition: form-data; name="file"; filename="index.ts"\r\n',
      'Supabase-Path: ../../outside.ts\r\n',
      '\r\n',
      'unsafe',
      '\r\n',
      `--${boundary}--\r\n`,
    ].join(''),
    'utf8',
  );

  assert.throws(
    () => parseRemoteFunctionMultipart(
      'alpha',
      multipart,
      `multipart/form-data; boundary=${boundary}`,
    ),
    /REMOTE_FUNCTION_FILE_PATH_UNSAFE/u,
  );
});

test('Management API queda cerrada a GET y SQL read-only', () => {
  assert.equal(assertManagementRequest('GET', '/v1/projects/abc123'), true);
  assert.equal(assertManagementRequest('GET', '/v1/branches/abc123'), true);
  assert.equal(assertManagementRequest('GET', '/v1/projects/abc123/database/migrations'), true);
  assert.equal(assertManagementRequest('POST', '/v1/projects/abc123/database/query/read-only'), true);
  assert.throws(
    () => assertManagementRequest('POST', '/v1/projects/abc123/database/query'),
    /MANAGEMENT_API_OPERATION_FORBIDDEN/u,
  );
  assert.throws(
    () => assertManagementRequest('PATCH', '/v1/projects/abc123/config/auth'),
    /MANAGEMENT_API_OPERATION_FORBIDDEN/u,
  );
  assert.throws(
    () => assertManagementRequest('PATCH', '/v1/branches/abc123'),
    /MANAGEMENT_API_OPERATION_FORBIDDEN/u,
  );
  assert.throws(
    () => assertManagementRequest('DELETE', '/v1/projects/abc123/database/migrations'),
    /MANAGEMENT_API_OPERATION_FORBIDDEN/u,
  );
});

test('staging persistent branch se normaliza sin conservar credenciales sensibles', async () => {
  const requests = [];
  const fakeDbPass = 'FAKE_DB_PASS_SHOULD_NEVER_APPEAR';
  const fakeJwtSecret = 'FAKE_JWT_SECRET_SHOULD_NEVER_APPEAR';
  const response = (status, payload) => ({
    ok: status >= 200 && status < 300,
    status,
    async json() { return payload; },
  });
  const fetchImpl = async (url) => {
    const pathname = new URL(url).pathname;
    requests.push(pathname);
    if (pathname === '/v1/projects/staging-ref') {
      return response(400, { message: 'Project not found' });
    }
    if (pathname === '/v1/branches/staging-ref') {
      return response(200, {
        ref: 'staging-ref',
        postgres_version: 'supabase-postgres-17.6.1.166',
        postgres_engine: '17',
        release_channel: 'ga',
        status: 'ACTIVE_HEALTHY',
        db_host: 'db.staging-ref.supabase.co',
        db_user: 'postgres',
        db_pass: fakeDbPass,
        jwt_secret: fakeJwtSecret,
      });
    }
    throw new Error(`UNEXPECTED_REQUEST:${pathname}`);
  };

  const observed = await observeRemoteEnvironment({
    projectRef: 'staging-ref',
    environmentRole: 'staging',
    owner: 'SUPA-TRANS-015',
    scope: 'environment',
    token: 'mock-management-token',
    fetchImpl,
  });

  assert.equal(observed.identity_status, 'PASS');
  assert.equal(observed.identity.project_ref, 'staging-ref');
  assert.deepEqual(requests, ['/v1/projects/staging-ref', '/v1/branches/staging-ref']);
  const project = observed.surfaces.find((entry) => entry.name === 'project');
  assert.equal(project.status, 'PASS');
  assert.equal(project.value.ref, 'staging-ref');
  assert.equal(project.value.hosted_identity_kind, 'branch');
  assert.equal(project.value.database.postgres_engine, '17');
  const serialized = JSON.stringify(observed);
  assert.equal(serialized.includes(fakeDbPass), false);
  assert.equal(serialized.includes(fakeJwtSecret), false);
  assert.equal(serialized.includes('db_pass'), false);
  assert.equal(serialized.includes('jwt_secret'), false);

  const result = compareRemote({
    scope: 'environment',
    expected: {
      candidate: { clean: true, commit_sha: 'abc', dirty_path_count: 0 },
      expected_digest: 'expected',
      config: { contract: { postgres_major: 17 } },
    },
    remoteObserved: observed,
  });
  assert.equal(result.certification, 'STAGING_CERTIFIED');
  assert.deepEqual(result.drifts, []);
});

test('staging separado como proyecto conserva el endpoint de proyecto sin fallback a branch', async () => {
  const requests = [];
  const response = (status, payload) => ({
    ok: status >= 200 && status < 300,
    status,
    async json() { return payload; },
  });
  const fetchImpl = async (url) => {
    const pathname = new URL(url).pathname;
    requests.push(pathname);
    if (pathname === '/v1/projects/staging-project-ref') {
      return response(200, {
        id: 'staging-project-ref',
        ref: 'staging-project-ref',
        name: 'staging-project',
        region: 'us-east-2',
        status: 'ACTIVE_HEALTHY',
        database: {
          version: '17.6.1.054',
          postgres_engine: '17',
          release_channel: 'ga',
        },
      });
    }
    throw new Error(`UNEXPECTED_REQUEST:${pathname}`);
  };

  const observed = await observeRemoteEnvironment({
    projectRef: 'staging-project-ref',
    environmentRole: 'staging',
    owner: 'SUPA-TRANS-015',
    scope: 'environment',
    token: 'mock-management-token',
    fetchImpl,
  });
  assert.deepEqual(requests, ['/v1/projects/staging-project-ref']);
  assert.equal(observed.surfaces[0].status, 'PASS');
  assert.equal(observed.surfaces[0].value.ref, 'staging-project-ref');
  assert.equal(observed.surfaces[0].value.database.postgres_engine, '17');
});

test('extrae resultado escalar de respuestas SQL compatibles', () => {
  assert.deepEqual(extractSqlScalar([{ fingerprint: '{"a":1}' }]), { a: 1 });
  assert.deepEqual(extractSqlScalar({ result: [{ storage_buckets: '[]' }] }), []);
  assert.throws(() => extractSqlScalar([]), /SQL_RESULT_EMPTY/u);
});

test('allowlist exige identidad exacta, owner, aprobador y expiracion vigente', () => {
  const base = {
    drift_id: 'DRIFT-1234',
    surface: 'auth.site_url',
    identity: 'project-ref',
    environment: 'staging',
    classification: 'EXPECTED_OVERLAY',
    reason: 'URL propia de staging',
    risk: 'LOW',
    owner: 'VENTO_OWNER',
    approver: 'VENTO_OWNER',
    evidence: 'ENV-IDENTITY-001',
    treatment: 'KEEP_ENVIRONMENT_SPECIFIC',
  };
  assert.equal(validateAllowlist([base]).length, 1);
  assert.throws(
    () => validateAllowlist([{ ...base, surface: 'auth.*' }]),
    /ALLOWLIST_WILDCARD_FORBIDDEN/u,
  );
  assert.throws(
    () => validateAllowlist([{ ...base, classification: 'TEMPORARY_EXCEPTION' }]),
    /ALLOWLIST_EXPIRATION_REQUIRED/u,
  );
  assert.throws(
    () => validateAllowlist([{
      ...base,
      classification: 'TEMPORARY_EXCEPTION',
      expires_at: '2020-01-01T00:00:00Z',
    }], { now: new Date('2026-08-26T00:00:00Z') }),
    /ALLOWLIST_EXPIRATION_EXPIRED/u,
  );
});

test('applyAllowlist solo reclasifica el drift exacto', () => {
  const drift = {
    drift_id: 'DRIFT-1234',
    surface: 'auth.site_url',
    identity: 'project-ref',
    environment: 'staging',
    classification: 'UNAUTHORIZED_DRIFT',
  };
  const allowance = validateAllowlist([{
    drift_id: 'DRIFT-1234',
    surface: 'auth.site_url',
    identity: 'project-ref',
    environment: 'staging',
    classification: 'EXPECTED_OVERLAY',
    reason: 'URL propia',
    risk: 'LOW',
    owner: 'VENTO_OWNER',
    approver: 'VENTO_OWNER',
    evidence: 'ENV-IDENTITY-001',
    treatment: 'KEEP_ENVIRONMENT_SPECIFIC',
  }]);
  assert.equal(applyAllowlist([drift], allowance)[0].classification, 'EXPECTED_OVERLAY');
});

test('comparacion de Edge Functions detecta presencia, verify_jwt y source drift', () => {
  const expected = [{
    slug: 'alpha',
    verify_jwt: true,
    source_digest: 'aaa',
    files: [],
  }];
  const observed = [{
    slug: 'alpha',
    verify_jwt: false,
    source_digest: 'bbb',
    files: [{ path: 'index.ts', sha256: 'x', bytes: 1 }],
  }];
  const drifts = [];
  compareFunctionSets(expected, observed, drifts, 'staging');
  assert.equal(drifts.length, 2);
  assert.deepEqual(drifts.map((entry) => entry.surface).sort(), [
    'edge_functions.source',
    'edge_functions.verify_jwt',
  ]);
});

test('MRP015-040 hosted function policy: SOLO_LOCAL ausente no deriva drift y presencia hosted si bloquea', () => {
  const expected = [
    { slug: 'hosted', verify_jwt: true, source_digest: 'aaa', files: [] },
    { slug: 'local-only', verify_jwt: true, source_digest: 'bbb', files: [] },
  ];
  const observedHosted = [{
    slug: 'hosted',
    verify_jwt: true,
    source_digest: 'aaa',
    files: [{ path: 'index.ts', sha256: 'x', bytes: 1 }],
  }];
  const policy = {
    default_disposition: 'REQUIRED_HOSTED',
    solo_local: ['local-only'],
  };
  const cleanDrifts = [];
  compareFunctionSets(expected, observedHosted, cleanDrifts, 'staging', policy);
  assert.deepEqual(cleanDrifts, []);

  const unexpectedDrifts = [];
  compareFunctionSets(
    expected,
    [
      ...observedHosted,
      {
        slug: 'local-only',
        verify_jwt: true,
        source_digest: 'bbb',
        files: [{ path: 'index.ts', sha256: 'y', bytes: 1 }],
      },
    ],
    unexpectedDrifts,
    'staging',
    policy,
  );
  assert.equal(unexpectedDrifts.length, 1);
  assert.equal(unexpectedDrifts[0].surface, 'edge_functions');
  assert.equal(unexpectedDrifts[0].identity, 'local-only');
});

test('local no certifica un candidate con worktree sucio', () => {
  const result = compareLocal({
    expected: {
      candidate: { clean: false, commit_sha: 'abc', dirty_path_count: 2 },
      migration_manifest: { count: 5 },
      config: { contract: { postgres_major: 17 } },
      expected_digest: 'expected',
    },
    observed: {
      harness: { migrations: 5 },
      toolchain: { postgres_major: 17 },
      observed_digest: 'observed',
    },
  });
  assert.equal(result.certification, 'INSUFFICIENT_EVIDENCE');
  assert.equal(result.drifts[0].surface, 'candidate.git_tree');
});

test('local certifica cuando el candidate esta limpio y contratos base coinciden', () => {
  const result = compareLocal({
    expected: {
      candidate: { clean: true, commit_sha: 'abc', dirty_path_count: 0 },
      migration_manifest: { count: 5 },
      config: { contract: { postgres_major: 17 } },
      expected_digest: 'expected',
    },
    observed: {
      harness: { migrations: 5 },
      toolchain: { postgres_major: 17 },
      observed_digest: 'observed',
    },
  });
  assert.equal(result.certification, 'LOCAL_CERTIFIED');
  assert.deepEqual(result.drifts, []);
});

test('remote sin identidad explicita termina en INSUFFICIENT_EVIDENCE', () => {
  const result = compareRemote({
    expected: {
      candidate: { clean: true, commit_sha: 'abc', dirty_path_count: 0 },
      expected_digest: 'expected',
    },
    localObserved: {},
    remoteObserved: {
      environment_role: 'staging',
      identity: { project_ref: null },
      identity_status: 'INSUFFICIENT_EVIDENCE',
      identity_issues: ['PROJECT_REF_MISSING_OR_INVALID'],
      observed_digest: null,
    },
  });
  assert.equal(result.certification, 'INSUFFICIENT_EVIDENCE');
  assert.equal(result.drifts[0].surface, 'environment.identity');
});

test('scope environment certifica identidad remota sin consumir history ni recursos', () => {
  const result = compareRemote({
    scope: 'environment',
    expected: {
      candidate: { clean: true, commit_sha: 'abc', dirty_path_count: 0 },
      expected_digest: 'expected',
      config: { contract: { postgres_major: 17 } },
    },
    remoteObserved: {
      environment_role: 'staging',
      remote_scope: 'environment',
      identity: { project_ref: 'staging-ref' },
      identity_status: 'PASS',
      observed_digest: 'observed',
      surfaces: [{
        name: 'project',
        status: 'PASS',
        value: { ref: 'staging-ref', database: { postgres_engine: '17' } },
      }],
    },
  });
  assert.equal(result.certification, 'STAGING_CERTIFIED');
  assert.equal(result.remote_scope, 'environment');
  assert.deepEqual(result.drifts, []);
});

function compareHistoryFixture({
  environmentRole,
  versions,
  scope = 'history',
} = {}) {
  const projectRef = `${environmentRole}-ref`;
  const expectedVersions = [
    '00000000000000',
    '20260801000000',
    '20260901000000',
  ];

  return compareRemote({
    scope,
    expected: {
      candidate: { clean: true, commit_sha: 'abc', dirty_path_count: 0 },
      expected_digest: 'expected',
      config: { contract: { postgres_major: 17 } },
      migration_manifest: {
        rows: expectedVersions.map((version) => ({ version })),
      },
    },
    remoteObserved: {
      environment_role: environmentRole,
      remote_scope: scope,
      identity: { project_ref: projectRef },
      identity_status: 'PASS',
      observed_digest: 'observed',
      surfaces: [
        {
          name: 'project',
          status: 'PASS',
          value: {
            ref: projectRef,
            database: { postgres_engine: '17' },
          },
        },
        {
          name: 'migrations',
          status: 'PASS',
          value: versions.map((version) => ({
            version,
            name: `migration-${version}`,
          })),
        },
      ],
    },
  });
}

test('scope history certifica PRODUCTION cuando conserva un prefijo canonico no vacio', () => {
  const result = compareHistoryFixture({
    environmentRole: 'production',
    versions: ['00000000000000'],
  });

  assert.equal(result.certification, 'PRODUCTION_CERTIFIED');
  assert.equal(result.remote_scope, 'history');
  assert.deepEqual(result.drifts, []);
});

test('scope history rechaza historial vacio en PRODUCTION', () => {
  const result = compareHistoryFixture({
    environmentRole: 'production',
    versions: [],
  });

  assert.equal(result.certification, 'UNAUTHORIZED_DRIFT');
  assert.deepEqual(
    result.drifts.map((entry) => entry.surface),
    ['migration_history.versions'],
  );
});

test('scope history conserva paridad exacta obligatoria en STAGING', () => {
  const result = compareHistoryFixture({
    environmentRole: 'staging',
    versions: ['00000000000000'],
  });

  assert.equal(result.certification, 'UNAUTHORIZED_DRIFT');
  assert.deepEqual(
    result.drifts.map((entry) => entry.surface),
    ['migration_history.versions'],
  );
});

test('scope history certifica STAGING cuando alcanza el universo completo', () => {
  const result = compareHistoryFixture({
    environmentRole: 'staging',
    versions: [
      '00000000000000',
      '20260801000000',
      '20260901000000',
    ],
  });

  assert.equal(result.certification, 'STAGING_CERTIFIED');
  assert.deepEqual(result.drifts, []);
});

test('scope history rechaza huecos en el prefijo de PRODUCTION', () => {
  const result = compareHistoryFixture({
    environmentRole: 'production',
    versions: [
      '00000000000000',
      '20260901000000',
    ],
  });

  assert.equal(result.certification, 'UNAUTHORIZED_DRIFT');
  assert.deepEqual(
    result.drifts.map((entry) => entry.surface),
    ['migration_history.versions'],
  );
});

test('scope history rechaza versiones desconocidas en PRODUCTION', () => {
  const result = compareHistoryFixture({
    environmentRole: 'production',
    versions: [
      '00000000000000',
      '99999999999999',
    ],
  });

  assert.equal(result.certification, 'UNAUTHORIZED_DRIFT');
  assert.deepEqual(
    result.drifts.map((entry) => entry.surface),
    ['migration_history.versions'],
  );
});

test('scope history rechaza versiones duplicadas en PRODUCTION', () => {
  const result = compareHistoryFixture({
    environmentRole: 'production',
    versions: [
      '00000000000000',
      '00000000000000',
    ],
  });

  assert.equal(result.certification, 'UNAUTHORIZED_DRIFT');
  assert.deepEqual(
    result.drifts.map((entry) => entry.surface),
    ['migration_history.versions'],
  );
});

test('scope history certifica PRODUCTION cuando alcanza el universo completo', () => {
  const result = compareHistoryFixture({
    environmentRole: 'production',
    versions: [
      '00000000000000',
      '20260801000000',
      '20260901000000',
    ],
  });

  assert.equal(result.certification, 'PRODUCTION_CERTIFIED');
  assert.deepEqual(result.drifts, []);
});

test('scope full sigue rechazando PRODUCTION incompleto', () => {
  const result = compareHistoryFixture({
    environmentRole: 'production',
    scope: 'full',
    versions: ['00000000000000'],
  });

  assert.notEqual(result.certification, 'PRODUCTION_CERTIFIED');
  assert.equal(
    result.drifts.some(
      (entry) => entry.surface === 'migration_history.versions',
    ),
    true,
  );
});

test('scope environment conserva fail closed para candidate sucio', () => {
  const result = compareRemote({
    scope: 'environment',
    expected: {
      candidate: { clean: false, commit_sha: 'abc', dirty_path_count: 1 },
      expected_digest: 'expected',
      config: { contract: { postgres_major: 17 } },
    },
    remoteObserved: {
      environment_role: 'staging',
      remote_scope: 'environment',
      identity: { project_ref: 'staging-ref' },
      identity_status: 'PASS',
      observed_digest: 'observed',
      surfaces: [{
        name: 'project',
        status: 'PASS',
        value: { ref: 'staging-ref', database: { postgres_engine: '17' } },
      }],
    },
  });
  assert.equal(result.certification, 'INSUFFICIENT_EVIDENCE');
  assert.equal(result.drifts[0].surface, 'candidate.git_tree');
});

test('SQL de fingerprint excluye VITAL y no contiene operaciones de mutacion', () => {
  const sql = __test.FINGERPRINT_SQL.toLowerCase();
  assert.match(sql, /'vital'/u);
  assert.match(sql, /included_in_governed_schemas/u);
  assert.doesNotMatch(sql, /\b(insert|update|delete|alter|drop|create|truncate)\b/u);
});


test('MRP015-040 SQL fingerprint: ACL es independiente del rol observador', () => {
  const sql = __test.FINGERPRINT_SQL;
  assert.match(sql, /pg_catalog\.aclexplode/u);
  assert.match(sql, /pg_catalog\.acldefault/u);
  assert.match(sql, /'grantor'/u);
  assert.match(sql, /pg_get_function_identity_arguments/u);
  assert.doesNotMatch(sql, /information_schema\.(?:table|routine)_privileges/u);
});

test('MRP015-040 SQL fingerprint: separa version de PostgreSQL y extensiones administradas', () => {
  const sql = __test.FINGERPRINT_SQL;
  const capabilities = __test.EXTENSION_CAPABILITIES_SQL;
  assert.doesNotMatch(sql, /current_setting\('server_version'\)/u);
  assert.doesNotMatch(sql, /pg_catalog\.pg_extension/u);
  assert.match(capabilities, /pg_catalog\.pg_extension/u);
  assert.match(capabilities, /extname/u);
  assert.doesNotMatch(capabilities, /extversion/u);
});


test('MRP015-040 SQL fingerprint: excluye _realtime y pgbouncer administrados por Supabase', () => {
  assert.equal(
    __test.MANAGED_SCHEMAS.has('_realtime'),
    true,
  );

  assert.equal(
    __test.MANAGED_SCHEMAS.has('pgbouncer'),
    true,
  );

  const sql = __test.FINGERPRINT_SQL;

  const start = sql.indexOf(
    'with governed_schemas as (',
  );

  const end = sql.indexOf(
    '),\nrelations as (',
    start,
  );

  assert.ok(start >= 0);
  assert.ok(end > start);

  const governed = sql.slice(start, end);

  assert.match(
    governed,
    /'_realtime'/u,
  );

  assert.match(
    governed,
    /'pgbouncer'/u,
  );
});

test('captura fingerprints mayores al maxBuffer predeterminado de Node', () => {
  assert.equal(__test.PROCESS_OUTPUT_MAX_BYTES, 32 * 1024 * 1024);
  assert.ok(__test.PROCESS_OUTPUT_MAX_BYTES > 1024 * 1024);
});

test('package.json expone las cuatro entradas estables de drift', () => {
  const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '../..');
  const packageJson = JSON.parse(fs.readFileSync(path.join(root, 'package.json'), 'utf8'));
  assert.equal(validatePackageScripts(packageJson), true);
});

test('CORR-011 hosted parity regression: conserva causa exacta cuando falta SUPABASE_ACCESS_TOKEN', async () => {
  let fetchCalled = false;

  const observed = await observeRemoteEnvironment({
    projectRef: 'staging-ref',
    environmentRole: 'staging',
    owner: 'SUPA-TRANS-015',
    scope: 'full',
    token: null,
    fetchImpl: async () => {
      fetchCalled = true;
      throw new Error('FETCH_MUST_NOT_RUN');
    },
  });

  assert.equal(fetchCalled, false);
  assert.equal(observed.identity_status, 'INSUFFICIENT_EVIDENCE');
  assert.deepEqual(observed.identity_issues, ['SUPABASE_ACCESS_TOKEN_MISSING']);

  const result = compareRemote({
    scope: 'full',
    expected: {
      candidate: { clean: true, commit_sha: 'abc', dirty_path_count: 0 },
      expected_digest: 'expected',
    },
    localObserved: {},
    remoteObserved: observed,
  });

  assert.equal(result.certification, 'INSUFFICIENT_EVIDENCE');
  assert.equal(result.drifts.length, 1);
  assert.equal(result.drifts[0].surface, 'environment.identity');
  assert.equal(result.drifts[0].observed, 'SUPABASE_ACCESS_TOKEN_MISSING');
});

function corr011HostedCronFixture(observedCronJobs, observedInternalJobSecretKeys = ['shift_runtime_processor_cron'], transform = (fixture) => fixture) {
  const sqlFingerprint = { functions: [] };
  const extensionCapabilities = [{ name: 'pg_cron' }];

  return compareRemote(transform({
    scope: 'full',
    expected: {
      candidate: { clean: true, commit_sha: 'abc', dirty_path_count: 0 },
      expected_digest: 'expected',
      migration_manifest: {
        rows: [{ version: '00000000000000' }],
      },
      config: {
        contract: {
          postgres_major: 17,
          data_api: {
            schemas: ['public'],
            max_rows: 1000,
          },
          storage: {
            file_size_limit_bytes: 52428800,
          },
          auth: {
            signup_enabled: true,
            anonymous_sign_ins_enabled: false,
            jwt_expiry: 3600,
            site_url: 'http://localhost:3000',
          },
          realtime: {
            enabled: true,
          },
        },
      },
      edge_functions: [],
      referenced_secret_names: [],
      hosted_resources: {
        cron_jobs: [{
          jobname: 'anima_shift_runtime_processor_every_5m',
          schedule: '*/5 * * * *',
          active: true,
        }],
        internal_job_secret_keys: ['shift_runtime_processor_cron'],
        edge_environment_requirements: {
          required_all: [],
          required_any_of: [],
          optional_or_defaulted: [],
        },
      },
    },
    localObserved: {
      sql_fingerprint: sqlFingerprint,
      extension_capabilities: extensionCapabilities,
      storage_buckets: [],
      cron: {
        evidence: 'NOT_APPLICABLE',
        jobs: [],
      },
    },
    remoteObserved: {
      environment_role: 'staging',
      remote_scope: 'full',
      identity: {
        project_ref: 'staging-ref',
      },
      identity_status: 'PASS',
      observed_digest: 'observed',
      surfaces: [
        {
          name: 'project',
          status: 'PASS',
          value: {
            ref: 'staging-ref',
            database: { postgres_engine: '17' },
          },
        },
        {
          name: 'migrations',
          status: 'PASS',
          value: [{ version: '00000000000000', name: 'baseline' }],
        },
        { name: 'edge_functions', status: 'PASS', value: [] },
        {
          name: 'auth',
          status: 'PASS',
          value: {
            disable_signup: false,
            external_anonymous_users_enabled: false,
            jwt_exp: 3600,
            site_url: 'http://localhost:3000',
          },
        },
        {
          name: 'storage',
          status: 'PASS',
          value: { file_size_limit: 52428800 },
        },
        {
          name: 'realtime',
          status: 'PASS',
          value: { suspend: false },
        },
        {
          name: 'postgrest',
          status: 'PASS',
          value: {
            db_schema: 'public',
            max_rows: 1000,
          },
        },
        { name: 'secret_names', status: 'PASS', value: [] },
        { name: 'sql_fingerprint', status: 'PASS', value: sqlFingerprint },
        { name: 'extension_capabilities', status: 'PASS', value: extensionCapabilities },
        { name: 'storage_buckets', status: 'PASS', value: [] },
        { name: 'cron_jobs', status: 'PASS', value: observedCronJobs },
        { name: 'internal_job_secret_keys', status: 'PASS', value: observedInternalJobSecretKeys },
      ],
    },
  }));
}

test('MRP015-040 hosted contract v2: full STAGING usa config hosted explicita y no site_url local', () => {
  const cron = [{
    jobname: 'anima_shift_runtime_processor_every_5m',
    schedule: '*/5 * * * *',
    active: true,
  }];
  const result = corr011HostedCronFixture(cron, ['shift_runtime_processor_cron'], (fixture) => {
    fixture.expected.config.contract.data_api.schemas = ['local-only-schema'];
    fixture.expected.config.contract.auth.site_url = 'http://localhost:3000';
    fixture.expected.hosted_resources.environment_contracts = {
      STAGING: {
        config: {
          data_api: {
            schemas: ['public'],
            extra_search_path: ['public', 'extensions'],
            max_rows: 1000,
          },
          auth: {
            signup_enabled: true,
            anonymous_sign_ins_enabled: false,
            jwt_expiry: 3600,
            site_url: 'https://staging.example.test',
          },
          storage: { file_size_limit_bytes: 52428800 },
          realtime: { suspended: false },
        },
        edge_functions: {
          default_disposition: 'REQUIRED_HOSTED',
          solo_local: [],
        },
      },
    };
    const postgrest = fixture.remoteObserved.surfaces.find((entry) => entry.name === 'postgrest');
    postgrest.value.db_schema = 'public';
    postgrest.value.db_extra_search_path = 'extensions,public';
    const auth = fixture.remoteObserved.surfaces.find((entry) => entry.name === 'auth');
    auth.value.site_url = 'https://staging.example.test';
    return fixture;
  });

  assert.equal(result.certification, 'STAGING_CERTIFIED');
  assert.deepEqual(result.drifts, []);
});

test('MRP015-040 extension capabilities: exige pg_net solo cuando el SQL canonico usa net.http_*', () => {
  const cron = [{
    jobname: 'anima_shift_runtime_processor_every_5m',
    schedule: '*/5 * * * *',
    active: true,
  }];
  const result = corr011HostedCronFixture(cron, ['shift_runtime_processor_cron'], (fixture) => {
    const fingerprint = {
      functions: [{ definition: "select net.http_post(url := 'https://example.invalid')" }],
    };
    fixture.localObserved.sql_fingerprint = fingerprint;
    fixture.localObserved.extension_capabilities = [
      { name: 'pg_cron' },
      { name: 'pg_net' },
    ];
    fixture.remoteObserved.surfaces.find((row) => row.name === 'sql_fingerprint').value = fingerprint;
    fixture.remoteObserved.surfaces.find((row) => row.name === 'extension_capabilities').value = [
      { name: 'pg_cron' },
    ];
    return fixture;
  });

  assert.equal(result.certification, 'UNAUTHORIZED_DRIFT');
  assert.deepEqual(result.drifts.map((entry) => entry.surface), ['extensions.capability']);
  assert.equal(result.drifts[0].identity, 'pg_net');
});

test('MRP015-040 extension capabilities: extensiones hosted extra no simulan SQL drift', () => {
  const cron = [{
    jobname: 'anima_shift_runtime_processor_every_5m',
    schedule: '*/5 * * * *',
    active: true,
  }];
  const result = corr011HostedCronFixture(cron, ['shift_runtime_processor_cron'], (fixture) => {
    fixture.remoteObserved.surfaces.find((row) => row.name === 'extension_capabilities').value = [
      { name: 'pg_cron' },
      { name: 'pg_graphql' },
      { name: 'pg_net' },
    ];
    return fixture;
  });

  assert.equal(result.certification, 'STAGING_CERTIFIED');
  assert.deepEqual(result.drifts, []);
});

test('MRP015-040 SQL fingerprint: un cambio real de grant sigue bloqueando', () => {
  const cron = [{
    jobname: 'anima_shift_runtime_processor_every_5m',
    schedule: '*/5 * * * *',
    active: true,
  }];
  const result = corr011HostedCronFixture(cron, ['shift_runtime_processor_cron'], (fixture) => {
    const localFingerprint = {
      functions: [],
      table_grants: [{
        schema: 'public',
        relation: 'orders',
        grantor: 'postgres',
        grantee: 'authenticated',
        privilege: 'SELECT',
        grantable: false,
      }],
    };
    const remoteFingerprint = structuredClone(localFingerprint);
    remoteFingerprint.table_grants[0].privilege = 'UPDATE';
    fixture.localObserved.sql_fingerprint = localFingerprint;
    fixture.remoteObserved.surfaces.find((row) => row.name === 'sql_fingerprint').value = remoteFingerprint;
    return fixture;
  });

  assert.equal(result.certification, 'UNAUTHORIZED_DRIFT');
  assert.deepEqual(result.drifts.map((entry) => entry.surface), ['database.sql_fingerprint']);
});

test('CORR-011 hosted parity regression: detecta cron hosted ausente aunque local no tenga pg_cron', () => {
  const result = corr011HostedCronFixture([]);

  assert.equal(result.certification, 'UNAUTHORIZED_DRIFT');
  assert.deepEqual(
    result.drifts.map((entry) => entry.surface),
    ['cron.jobs'],
  );
});

test('CORR-011 hosted parity regression: certifica cron hosted versionado aunque local no tenga pg_cron', () => {
  const result = corr011HostedCronFixture([{
    jobname: 'anima_shift_runtime_processor_every_5m',
    schedule: '*/5 * * * *',
    active: true,
    database: 'postgres',
    username: 'postgres',
    command_sha256: 'environment-specific-command-digest',
  }]);

  assert.equal(result.certification, 'STAGING_CERTIFIED');
  assert.deepEqual(result.drifts, []);
});

test('CORR-011 hosted resource baseline: versiona los siete cron AS-IS sin comandos ni valores secretos', () => {
  const readiness = JSON.parse(fs.readFileSync(
    new URL('../docs/package-readiness/package-readiness-contract.json', import.meta.url),
    'utf8',
  ));

  const baseline =
    readiness.physical_dependencies.supabase_pre_e5_foundation.hosted_resource_baseline;

  assert.equal(baseline.cron_jobs.length, 7);

  assert.deepEqual(
    baseline.cron_jobs.map((entry) => entry.jobname).sort(),
    [
      'anima_attendance_day_end_close_0005',
      'anima_shift_runtime_processor_every_5m',
      'attendance_stale_open_shift_autoclose_daily_bogota',
      'auto-close-attendance',
      'document-alerts-daily',
      'pass_delivery_quotes_cleanup_hourly',
      'pass_payment_checkout_expiry_reconciliation',
    ],
  );

  assert.equal(
    baseline.cron_jobs.every((entry) => entry.active === true),
    true,
  );

  assert.deepEqual(
    baseline.internal_job_secret_keys,
    ['shift_runtime_processor_cron'],
  );

  assert.equal(baseline.cron_commands_forbidden, true);
  assert.equal(baseline.secret_values_forbidden, true);
  assert.equal(baseline.schema_version, 3);
  assert.deepEqual(
    baseline.edge_environment_requirements.local_only,
    ['GOOGLE_WALLET_EMPLOYEE_CLASS_ID', 'REVENUECAT_WEBHOOK_SECRET'],
  );
  assert.equal(
    baseline.edge_environment_requirements.required_all.includes('GOOGLE_WALLET_EMPLOYEE_CLASS_ID'),
    false,
  );
  assert.equal(
    baseline.edge_environment_requirements.required_all.includes('REVENUECAT_WEBHOOK_SECRET'),
    false,
  );
  const staging = baseline.environment_contracts.STAGING;
  assert.deepEqual(
    staging.config.data_api.schemas,
    ['public', 'api', 'graphql_public'],
  );
  assert.deepEqual(
    staging.config.data_api.extra_search_path,
    ['public', 'extensions'],
  );
  assert.equal(staging.config.auth.site_url, 'https://os.ventogroup.co');
  assert.equal(staging.edge_functions.default_disposition, 'REQUIRED_HOSTED');
  assert.deepEqual(
    staging.edge_functions.solo_local,
    [
      'club-revenuecat-webhook',
      'club-settle-booster',
      'club-sync-earn-events',
      'employee-apple-pass',
      'employee-wallet-pass',
    ],
  );

  const serialized = JSON.stringify(baseline);
  assert.equal(/"command"\s*:|"command_sha256"\s*:/u.test(serialized), false);
  assert.equal(/"secret_value"\s*:/u.test(serialized), false);
});

test('CORR-011 hosted resource baseline: detecta ausencia de la clave interna configurada sin comparar su valor', () => {
  const result = corr011HostedCronFixture(
    [{
      jobname: 'anima_shift_runtime_processor_every_5m',
      schedule: '*/5 * * * *',
      active: true,
    }],
    [],
  );

  assert.equal(result.certification, 'UNAUTHORIZED_DRIFT');
  assert.deepEqual(
    result.drifts.map((entry) => entry.surface),
    ['internal_job_secrets.configured_keys'],
  );

  assert.equal(
    JSON.stringify(result).includes('secret_value'),
    false,
  );
});

test('CORR-011 explicit Edge environment requirements: clasifica exactamente los 28 nombres no administrados del candidate', () => {
  const readiness = JSON.parse(fs.readFileSync(
    new URL('../docs/package-readiness/package-readiness-contract.json', import.meta.url),
    'utf8',
  ));

  const requirements =
    readiness.physical_dependencies.supabase_pre_e5_foundation
      .hosted_resource_baseline.edge_environment_requirements;

  const classified = [
    ...requirements.required_all,
    ...requirements.optional_or_defaulted,
    ...requirements.local_only,
    ...requirements.required_any_of.flatMap((entry) => entry.names),
  ];

  assert.equal(classified.length, 28);
  assert.equal(new Set(classified).size, 28);

  assert.deepEqual(
    requirements.required_any_of.map((entry) => entry.requirement_id),
    [
      'ANIMA_SET_PASSWORD_URL',
      'GOOGLE_MAPS_SERVER_KEY',
      'WOMPI_WEBHOOK_SECRET',
    ],
  );

  assert.equal(
    requirements.optional_or_defaulted.includes('DOCUMENT_ALERTS_CRON_SECRET'),
    true,
  );

  assert.equal(
    requirements.optional_or_defaulted.includes('SHIFT_RUNTIME_CRON_SECRET'),
    true,
  );
});

test('CORR-011 explicit Edge environment requirements: optional/defaulted ausentes no producen drift y ANY-OF acepta un miembro', () => {
  const readiness = JSON.parse(fs.readFileSync(
    new URL('../docs/package-readiness/package-readiness-contract.json', import.meta.url),
    'utf8',
  ));

  const requirements =
    readiness.physical_dependencies.supabase_pre_e5_foundation
      .hosted_resource_baseline.edge_environment_requirements;

  const referenced = [
    ...requirements.required_all,
    ...requirements.optional_or_defaulted,
    ...requirements.local_only,
    ...requirements.required_any_of.flatMap((entry) => entry.names),
  ];

  const observed = [
    ...requirements.required_all,
    ...requirements.required_any_of.map((entry) => entry.names[0]),
  ];

  const drifts = evaluateEdgeSecretRequirements({
    referencedSecretNames: referenced,
    requirements,
    observedSecretNames: observed,
    environment: 'staging',
    identity: 'staging-ref',
  });

  assert.deepEqual(drifts, []);
});

test('CORR-011 explicit Edge environment requirements: distingue REQUIRED_ALL de REQUIRED_ANY_OF', () => {
  const readiness = JSON.parse(fs.readFileSync(
    new URL('../docs/package-readiness/package-readiness-contract.json', import.meta.url),
    'utf8',
  ));

  const requirements =
    readiness.physical_dependencies.supabase_pre_e5_foundation
      .hosted_resource_baseline.edge_environment_requirements;

  const referenced = [
    ...requirements.required_all,
    ...requirements.optional_or_defaulted,
    ...requirements.local_only,
    ...requirements.required_any_of.flatMap((entry) => entry.names),
  ];

  const observed = [
    ...requirements.required_all.filter(
      (name) => name !== 'ACCOUNT_DELETION_WORKER_SECRET',
    ),
    ...requirements.required_any_of
      .filter((entry) => entry.requirement_id !== 'GOOGLE_MAPS_SERVER_KEY')
      .map((entry) => entry.names[0]),
  ];

  const drifts = evaluateEdgeSecretRequirements({
    referencedSecretNames: referenced,
    requirements,
    observedSecretNames: observed,
    environment: 'staging',
    identity: 'staging-ref',
  });

  assert.deepEqual(
    drifts.map((entry) => entry.surface).sort(),
    [
      'edge_secrets.required_any_of',
      'edge_secrets.required_name',
    ],
  );
});

test('CORR-011 explicit Edge environment requirements: una referencia nueva sin clasificar bloquea por evidencia insuficiente', () => {
  const readiness = JSON.parse(fs.readFileSync(
    new URL('../docs/package-readiness/package-readiness-contract.json', import.meta.url),
    'utf8',
  ));

  const requirements =
    readiness.physical_dependencies.supabase_pre_e5_foundation
      .hosted_resource_baseline.edge_environment_requirements;

  const referenced = [
    ...requirements.required_all,
    ...requirements.optional_or_defaulted,
    ...requirements.local_only,
    ...requirements.required_any_of.flatMap((entry) => entry.names),
    'NEW_UNCLASSIFIED_EDGE_ENV',
  ];

  const drifts = evaluateEdgeSecretRequirements({
    referencedSecretNames: referenced,
    requirements,
    observedSecretNames: [],
    environment: 'staging',
    identity: 'staging-ref',
  });

  assert.equal(drifts.length, 1);
  assert.equal(drifts[0].surface, 'edge_secrets.expected_contract');
  assert.equal(drifts[0].classification, 'INSUFFICIENT_EVIDENCE');
});


// These acceptance tests use synthetic resources only. A successful negative
// test proves detector behavior; it does not certify a hosted VENTO environment.
const acceptanceCron = [{
  jobname: 'anima_shift_runtime_processor_every_5m',
  schedule: '*/5 * * * *',
  active: true,
}];

function acceptanceFixture() {
  let fixture;
  corr011HostedCronFixture(acceptanceCron, ['shift_runtime_processor_cron'], (value) => {
    fixture = value;
    return value;
  });
  return fixture;
}

function printedOutcome(result, strict) {
  const moduleUrl = new URL('./environment-drift.mjs', import.meta.url).href;
  return spawnSync(process.execPath, [
    '--input-type=module', '-e',
    `import { printControllerResult } from ${JSON.stringify(moduleUrl)}; printControllerResult(JSON.parse(process.argv[1]));`,
    JSON.stringify({ mode: 'remote', result, strict }),
  ], { encoding: 'utf8', timeout: 15000 });
}

test('CORR-011_ACCEPTANCE: un full compatible certifica solamente el ambiente sintetico', () => {
  const result = compareRemote(acceptanceFixture());
  assert.equal(result.certification, 'STAGING_CERTIFIED');
  assert.deepEqual(controllerOutcome({ mode: 'remote', result, strict: true }), {
    execution_status: 'PASS',
    observation_status: 'PASS',
    environment_certified: 'YES',
    exit_code: 0,
  });
  const child = printedOutcome(result, true);
  assert.equal(child.error, undefined);
  assert.equal(child.status, 0);
  assert.match(child.stdout, /^OBSERVATION_STATUS: PASS$/mu);
  assert.match(child.stdout, /^ENVIRONMENT_CERTIFIED: YES$/mu);
});

test('CORR-011_ACCEPTANCE: observar drift no certifica el ambiente ni neutraliza strict', () => {
  const result = corr011HostedCronFixture([], []);
  assert.equal(result.certification, 'UNAUTHORIZED_DRIFT');
  assert.deepEqual(result.drifts.map((row) => row.surface), [
    'cron.jobs', 'internal_job_secrets.configured_keys',
  ]);
  assert.deepEqual(controllerOutcome({ mode: 'remote', result, strict: true }), {
    execution_status: 'FAIL',
    observation_status: 'PASS',
    environment_certified: 'NO',
    exit_code: 1,
  });
  const child = printedOutcome(result, true);
  assert.equal(child.error, undefined);
  assert.equal(child.status, 1);
  assert.match(child.stdout, /^ESTADO: FAIL$/mu);
  assert.match(child.stdout, /^OBSERVATION_STATUS: PASS$/mu);
  assert.match(child.stdout, /^ENVIRONMENT_CERTIFIED: NO$/mu);
  assert.match(child.stdout, /^CERTIFICATION: UNAUTHORIZED_DRIFT$/mu);
  assert.match(child.stdout, /^REMOTE_MUTATIONS: NO$/mu);
});

test('CORR-011_ACCEPTANCE: sin strict el proceso puede observar sin aprobar despliegue', () => {
  const result = corr011HostedCronFixture([]);
  const child = printedOutcome(result, false);
  assert.equal(child.error, undefined);
  assert.equal(child.status, 0);
  assert.match(child.stdout, /^ESTADO: PASS$/mu);
  assert.match(child.stdout, /^ENVIRONMENT_CERTIFIED: NO$/mu);
  assert.match(child.stdout, /^CERTIFICATION: UNAUTHORIZED_DRIFT$/mu);
});

test('CORR-011_ACCEPTANCE: una superficie ilegible es evidencia incompleta, no prueba negativa valida', () => {
  const fixture = acceptanceFixture();
  const edge = fixture.remoteObserved.surfaces.find((row) => row.name === 'edge_functions');
  edge.status = 'INSUFFICIENT_EVIDENCE';
  delete edge.value;
  edge.error = 'SYNTHETIC_HTTP_403';
  const result = compareRemote(fixture);
  assert.equal(result.certification, 'INSUFFICIENT_EVIDENCE');
  assert.equal(result.drifts[0].surface, 'edge_functions');
  const outcome = controllerOutcome({ mode: 'remote', result, strict: true });
  assert.equal(outcome.observation_status, 'FAIL');
  assert.equal(outcome.environment_certified, 'NO');
  assert.equal(outcome.exit_code, 1);
});

test('CORR-011_ACCEPTANCE: una credencial ausente no cuenta como observacion completa', async () => {
  let called = false;
  const fixture = acceptanceFixture();
  fixture.remoteObserved = await observeRemoteEnvironment({
    projectRef: 'staging-ref', environmentRole: 'staging', owner: 'SUPA-TRANS-015',
    scope: 'full', token: null,
    fetchImpl: async () => { called = true; throw new Error('NO_NETWORK_ALLOWED'); },
  });
  const result = compareRemote(fixture);
  assert.equal(called, false);
  assert.equal(result.drifts[0].observed, 'SUPABASE_ACCESS_TOKEN_MISSING');
  assert.equal(controllerOutcome({ mode: 'remote', result, strict: true }).observation_status, 'FAIL');
});

test('CORR-011_ACCEPTANCE: candidate sucio no se acepta como observacion certificable', () => {
  const fixture = acceptanceFixture();
  fixture.expected.candidate.clean = false;
  fixture.expected.candidate.dirty_path_count = 1;
  const result = compareRemote(fixture);
  assert.equal(result.certification, 'INSUFFICIENT_EVIDENCE');
  assert.ok(result.drifts.some((row) => row.surface === 'candidate.git_tree'));
  assert.equal(controllerOutcome({ mode: 'remote', result, strict: true }).environment_certified, 'NO');
});

test('CORR-011_ACCEPTANCE: JSON contradictorio o clasificacion desconocida falla incluso sin strict', () => {
  const valid = compareRemote(acceptanceFixture());
  const drift = corr011HostedCronFixture([]);
  for (const result of [
    { ...drift, certification: 'STAGING_CERTIFIED' },
    { ...valid, certification: 'UNKNOWN' },
    { ...valid, drifts: [{ classification: 'IGNORED' }] },
    { ...valid, remote_scope: 'UNKNOWN' },
    { ...valid, drifts: null },
  ]) {
    const outcome = controllerOutcome({ mode: 'remote', result, strict: false });
    assert.equal(outcome.execution_status, 'FAIL');
    assert.equal(outcome.observation_status, 'FAIL');
    assert.notEqual(outcome.environment_certified, 'YES');
    assert.equal(outcome.exit_code, 1);
  }
});

test('CORR-011_ACCEPTANCE: environment e history no se presentan como certificacion full', () => {
  const fixture = acceptanceFixture();
  for (const scope of ['environment', 'history']) {
    const result = compareRemote({ ...fixture, scope });
    const outcome = controllerOutcome({ mode: 'remote', result, strict: true });
    assert.equal(outcome.exit_code, 0);
    assert.equal(outcome.observation_status, 'PASS');
    assert.equal(outcome.environment_certified, 'NOT_APPLICABLE');
  }
});

test('CORR-011_ACCEPTANCE: expected local no representa una observacion hosted', () => {
  const result = { certification: 'EXPECTED_BASELINE_BUILT', drifts: [] };
  const outcome = controllerOutcome({ mode: 'expected', result, strict: true });
  assert.equal(outcome.execution_status, 'PASS');
  assert.equal(outcome.observation_status, 'NOT_APPLICABLE');
  assert.equal(outcome.environment_certified, 'NOT_APPLICABLE');
});

test('CORR-011_ACCEPTANCE: observador full sintetico solo usa GET y SQL read-only sin conservar valores secretos', async () => {
  const fixture = acceptanceFixture();
  const values = new Map(fixture.remoteObserved.surfaces.map((row) => [row.name, row.value]));
  const calls = [];
  const forbiddenValue = 'SYNTHETIC_SECRET_VALUE_MUST_NOT_LEAK';
  const response = (value) => ({ ok: true, status: 200, async json() { return value; } });
  const ref = '/v1/projects/staging-ref';
  const reads = new Map([
    [ref, { ref: 'staging-ref', database: { postgres_engine: '17' } }],
    [`${ref}/database/migrations`, values.get('migrations')],
    [`${ref}/functions`, []],
    [`${ref}/config/auth`, values.get('auth')],
    [`${ref}/config/storage`, { fileSizeLimit: values.get('storage').file_size_limit }],
    [`${ref}/config/realtime`, values.get('realtime')],
    [`${ref}/postgrest`, values.get('postgrest')],
    [`${ref}/secrets`, [{ name: 'SYNTHETIC_EXTRA_NAME', value: forbiddenValue }]],
  ]);
  const observed = await observeRemoteEnvironment({
    projectRef: 'staging-ref', environmentRole: 'staging', owner: 'SUPA-TRANS-015',
    scope: 'full', token: 'SYNTHETIC_PAT_ONLY',
    fetchImpl: async (url, options) => {
      const pathname = new URL(url).pathname;
      calls.push({ method: options.method, pathname });
      assert.equal(assertManagementRequest(options.method, pathname), true);
      if (options.method === 'GET' && reads.has(pathname)) return response(reads.get(pathname));
      assert.equal(options.method, 'POST');
      assert.equal(pathname, `${ref}/database/query/read-only`);
      const query = JSON.parse(options.body).query;
      let value;
      if (query.includes('as internal_job_secret_keys')) value = [];
      else if (query.includes('as extension_capabilities')) value = values.get('extension_capabilities');
      else if (query.includes('as storage_buckets')) value = values.get('storage_buckets');
      else if (query.includes('as cron_jobs')) value = [];
      else if (query.includes('as fingerprint')) value = values.get('sql_fingerprint');
      else throw new Error('UNEXPECTED_SYNTHETIC_SQL');
      return response([{ result: JSON.stringify(value) }]);
    },
  });
  assert.equal(observed.surfaces.length, 13);
  assert.ok(observed.surfaces.every((row) => row.status === 'PASS'));
  assert.equal(calls.filter((row) => row.method === 'POST').length, 5);
  const result = compareRemote({ ...fixture, remoteObserved: observed });
  assert.equal(result.certification, 'UNAUTHORIZED_DRIFT');
  assert.deepEqual(result.drifts.map((row) => row.surface), [
    'cron.jobs', 'internal_job_secrets.configured_keys',
  ]);
  const serialized = JSON.stringify({ observed, result });
  assert.equal(serialized.includes(forbiddenValue), false);
  assert.equal(serialized.includes('SYNTHETIC_PAT_ONLY'), false);
});


test('MRP015-040 STAGING secret policy override keeps dormant external integrations non-blocking', () => {
  const fixture = acceptanceFixture();
  fixture.expected.referenced_secret_names = ['EXTERNAL_SECRET'];
  fixture.expected.hosted_resources.edge_environment_requirements = {
    required_all: ['EXTERNAL_SECRET'],
    required_any_of: [],
    optional_or_defaulted: [],
    local_only: [],
  };
  fixture.expected.hosted_resources.environment_contracts ??= {};
  fixture.expected.hosted_resources.environment_contracts.STAGING ??= {};
  fixture.expected.hosted_resources.environment_contracts.STAGING.edge_environment_requirements = {
    required_all: [],
    required_any_of: [],
    optional_or_defaulted: ['EXTERNAL_SECRET'],
    local_only: [],
  };
  const secretSurface = fixture.remoteObserved.surfaces.find((row) => row.name === 'secret_names');
  secretSurface.value = [];

  const stagingResult = compareRemote(fixture);
  assert.equal(
    stagingResult.drifts.some((row) => String(row.surface).startsWith('edge_secrets.')),
    false,
  );

  delete fixture.expected.hosted_resources.environment_contracts.STAGING.edge_environment_requirements;
  const fallbackResult = compareRemote(fixture);
  assert.equal(
    fallbackResult.drifts.some((row) => row.surface === 'edge_secrets.required_name' && row.identity === 'EXTERNAL_SECRET'),
    true,
  );
});
