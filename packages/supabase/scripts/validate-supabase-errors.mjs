import crypto from 'node:crypto';
import { spawnSync } from 'node:child_process';
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { isDeepStrictEqual } from 'node:util';
import { fileURLToPath, pathToFileURL } from 'node:url';

import { parseTaskBlocks } from '../../../scripts/docs/format-canonical-task.mjs';

const here = path.dirname(fileURLToPath(import.meta.url));
const packageRoot = path.resolve(here, '..');
const repoRoot = path.resolve(packageRoot, '..', '..');
const sourcePath = path.join(packageRoot, 'src', 'errors.ts');
const readmePath = path.join(packageRoot, 'README.md');
const packagePath = path.join(packageRoot, 'package.json');
const ownerPath = path.join(
  repoRoot,
  'docs',
  'plan-canonico',
  'modular',
  'bloques',
  'H_FUNDACION_COMPARTIDA',
  '06_ACCESO_COMPARTIDO_A_DATOS.md',
);

const SOURCE_CONTRACT_SHA256 = '1a135810618ae8e186415ef8c5cd4ce99f2845d083e4a968eb9883a88a70a042';
const EXPECTED_POLICY_ID = 'VENTO_SUPABASE_TECHNICAL_ERROR_NORMALIZATION@1.0.0';

function assert(condition, message) {
  if (!condition) throw new Error(message);
}

function exactArray(actual, expected, label) {
  assert(isDeepStrictEqual(actual, expected), `${label} mismatch`);
}

function includesAll(source, expected, label) {
  for (const value of expected) assert(source.includes(value), `${label} missing: ${value}`);
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

function assertGitUnchanged(paths) {
  const result = run('git', ['diff', '--quiet', '--', ...paths]);
  assert(result.status === 0, `out-of-scope immutable file changed: ${paths.join(', ')}`);
}

function compileSource(tempDir) {
  const tscCli = path.join(repoRoot, 'node_modules', 'typescript', 'bin', 'tsc');
  assert(fs.existsSync(tscCli), `TypeScript CLI not found: ${tscCli}`);
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
    sourcePath,
  ]);
  assert(result.status === 0, `TypeScript compile failed: ${result.stderr || result.stdout}`);
}

function baseFailure(overrides = {}) {
  return {
    source: 'POSTGREST',
    dispatchState: 'NOT_DISPATCHED',
    nativeCode: 'PGRST000',
    httpStatus: 503,
    message: 'provider message',
    ...overrides,
  };
}

function baseContext(overrides = {}) {
  return {
    productBoundary: 'VENTO_OS',
    operation: 'QUERY',
    runtime: 'SERVER',
    contractId: 'contract:inventory',
    contractVersion: '1.0.0',
    mappingVersion: 'mapping:1',
    effectCertainty: 'NO_EFFECT_CONFIRMED',
    retryContract: { directive: 'DO_NOT_RETRY' },
    correlationId: 'corr-001',
    ...overrides,
  };
}

function mapping(overrides = {}) {
  return {
    mappingId: 'mapping:postgrest:unavailable',
    mappingVersion: 'mapping:1',
    source: 'POSTGREST',
    nativeCode: 'PGRST000',
    contractId: 'contract:inventory',
    contractVersion: '1.0.0',
    family: 'DEPENDENCY_FAILURE',
    ...overrides,
  };
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

async function assertBehavior(tempDir) {
  compileSource(tempDir);
  const compiled = path.join(tempDir, 'src', 'errors.js');
  const api = await import(`${pathToFileURL(compiled).href}?v=${Date.now()}`);
  const covered = new Set();
  const cover = (number, assertion) => {
    assertion();
    covered.add(number);
  };

  cover(1, () => {
    const outcome = {
      code: 'AUTHZ_DENIED',
      family: 'AUTHORIZATION_DENIED',
      contractId: 'contract:inventory',
      contractVersion: '1.0.0',
    };
    const result = api.normalizeSupabaseTechnicalError(
      baseFailure(),
      baseContext({ contractOutcome: outcome }),
      [mapping()],
    );
    assert(result.contractOutcome === outcome, 'contract outcome identity was not preserved');
    assert(result.family === 'AUTHORIZATION_DENIED', 'contract outcome family lost priority');
  });

  cover(2, () => {
    assert(api.ERROR_SEMANTIC_FAMILIES.length === 11, 'semantic family count mismatch');
    assert(new Set(api.ERROR_SEMANTIC_FAMILIES).size === 11, 'semantic families contain duplicates');
  });

  cover(3, () => {
    const result = api.normalizeSupabaseTechnicalError(baseFailure(), baseContext());
    assert(result.family === 'INTERNAL_UNDISCLOSED', 'unmapped failure did not fail closed');
  });

  cover(4, () => {
    const result = api.normalizeSupabaseTechnicalError(
      baseFailure({ nativeCode: 'PGRST_NEW' }),
      baseContext(),
      [mapping()],
    );
    assert(result.mapping === null && result.family === 'INTERNAL_UNDISCLOSED', 'unknown native code guessed a mapping');
  });

  cover(5, () => {
    const first = api.normalizeSupabaseTechnicalError(
      baseFailure({ message: 'first language' }),
      baseContext(),
      [mapping()],
    );
    const second = api.normalizeSupabaseTechnicalError(
      baseFailure({ message: 'segundo idioma' }),
      baseContext(),
      [mapping()],
    );
    assert(isDeepStrictEqual(first.publicError, second.publicError), 'message changed normalized semantics');
    assertThrows(
      () => api.normalizeSupabaseTechnicalError(
        baseFailure(),
        baseContext(),
        [{ ...mapping(), messagePattern: 'denied' }],
      ),
      'mapping cannot branch on messagePattern',
      'message mapping rejection',
    );
  });

  cover(6, () => {
    const result = api.normalizeSupabaseTechnicalError(baseFailure({ sqlState: '42501' }), baseContext());
    assert(result.protectedDiagnostic.sqlState === '42501', 'server SQLSTATE not preserved');
    assert(!JSON.stringify(result.publicError).includes('42501'), 'SQLSTATE leaked publicly');
  });

  cover(7, () => {
    const result = api.normalizeSupabaseTechnicalError(baseFailure({ constraint: 'secret_unique' }), baseContext());
    assert(!JSON.stringify(result.publicError).includes('secret_unique'), 'constraint leaked publicly');
  });

  cover(8, () => {
    const result = api.normalizeSupabaseTechnicalError(baseFailure({ stack: 'private stack' }), baseContext());
    assert(!JSON.stringify(result.publicError).includes('private stack'), 'stack leaked publicly');
  });

  cover(9, () => {
    const result = api.normalizeSupabaseTechnicalError(baseFailure({ details: 'select * from private_table' }), baseContext());
    assert(!JSON.stringify(result.publicError).includes('private_table'), 'SQL details leaked publicly');
  });

  for (const [number, status] of [[10, 401], [11, 404], [12, 409], [13, 429]]) {
    cover(number, () => {
      const result = api.normalizeSupabaseTechnicalError(baseFailure({ httpStatus: status }), baseContext());
      assert(result.family === 'INTERNAL_UNDISCLOSED', `HTTP ${status} inferred business semantics`);
    });
  }

  cover(14, () => {
    const result = api.normalizeSupabaseTechnicalError(baseFailure(), baseContext({ operation: 'QUERY' }));
    assert(result.ok === false && result.publicError.ok === false, 'failed query appeared successful');
  });

  cover(15, () => {
    const result = api.normalizeSupabaseTechnicalError(
      baseFailure({ dispatchState: 'NOT_DISPATCHED' }),
      baseContext({ operation: 'COMMAND' }),
    );
    assert(result.ok === false, 'failed command appeared successful');
  });

  cover(16, () => {
    const result = api.normalizeSupabaseTechnicalError(
      baseFailure({ source: 'NETWORK', dispatchState: 'NOT_DISPATCHED', nativeCode: 'TIMEOUT' }),
      baseContext({ retryContract: { directive: 'RETRY_IF_CONTRACT_ALLOWS' } }),
    );
    assert(result.retry === 'RETRY_IF_CONTRACT_ALLOWS', 'pre-dispatch retry contract was not preserved');
  });

  const unknownResult = api.normalizeSupabaseTechnicalError(
    baseFailure({ source: 'NETWORK', dispatchState: 'DISPATCHED', nativeCode: 'TIMEOUT' }),
    baseContext({ operation: 'COMMAND', effectCertainty: 'UNKNOWN' }),
  );
  cover(17, () => assert(unknownResult.family === 'RESULT_UNKNOWN', 'post-dispatch timeout lost uncertainty'));
  cover(18, () => assert(unknownResult.requiresReconciliation, 'unknown result did not require reconciliation'));

  cover(19, () => {
    const result = api.normalizeSupabaseTechnicalError(
      baseFailure(),
      baseContext({ retryContract: { directive: 'RETRY_IF_CONTRACT_ALLOWS' } }),
      [mapping()],
    );
    assert(result.retry === 'RETRY_IF_CONTRACT_ALLOWS', 'allowed retry contract lost');
  });

  cover(20, () => {
    const result = api.normalizeSupabaseTechnicalError(baseFailure(), baseContext(), [mapping()]);
    assert(result.retry === 'DO_NOT_RETRY', 'forbidden retry contract changed');
  });

  cover(21, () => {
    const result = api.normalizeSupabaseTechnicalError(
      baseFailure(),
      baseContext({ idempotencyKey: 'intent-key-1' }),
    );
    assert(result.protectedDiagnostic.idempotencyKey === 'intent-key-1', 'idempotency key not preserved');
  });

  cover(22, () => {
    const outcome = {
      code: 'IDEMPOTENCY_PAYLOAD_CONFLICT',
      family: 'IDEMPOTENCY_CONFLICT',
      contractId: 'contract:inventory',
      contractVersion: '1.0.0',
    };
    const result = api.normalizeSupabaseTechnicalError(baseFailure(), baseContext({ contractOutcome: outcome }));
    assert(result.publicError.code === outcome.code, 'idempotency conflict outcome was replaced');
  });

  cover(23, () => {
    const outcome = {
      code: 'EXPECTED_VERSION_STALE',
      family: 'STATE_OR_VERSION_CONFLICT',
      contractId: 'contract:inventory',
      contractVersion: '1.0.0',
    };
    const result = api.normalizeSupabaseTechnicalError(
      baseFailure(),
      baseContext({ contractOutcome: outcome, expectedVersion: 'v7' }),
    );
    assert(result.protectedDiagnostic.expectedVersion === 'v7', 'expected version not preserved');
  });

  cover(24, () => {
    const result = api.normalizeSupabaseTechnicalError(
      baseFailure({ source: 'POSTGRES', nativeCode: '40001' }),
      baseContext({ retryContract: { directive: 'BOUNDED_RETRY_IF_CONTRACT_ALLOWS', maxAttempts: 3 } }),
      [mapping({
        mappingId: 'mapping:serialization',
        source: 'POSTGRES',
        nativeCode: '40001',
        family: 'STATE_OR_VERSION_CONFLICT',
      })],
    );
    assert(result.family === 'STATE_OR_VERSION_CONFLICT', 'serialization mapping failed');
    assert(result.retry === 'BOUNDED_RETRY_IF_CONTRACT_ALLOWS', 'bounded concurrency retry lost');
  });

  for (const [number, code, family] of [
    [25, 'AUTH_INVALID', 'AUTHENTICATION_INVALID'],
    [26, 'AUTHZ_DENIED', 'AUTHORIZATION_DENIED'],
    [28, 'RESOURCE_NOT_VISIBLE', 'RESOURCE_NOT_VISIBLE'],
  ]) {
    cover(number, () => {
      const outcome = {
        code,
        family,
        contractId: 'contract:inventory',
        contractVersion: '1.0.0',
      };
      const result = api.normalizeSupabaseTechnicalError(baseFailure(), baseContext({ contractOutcome: outcome }));
      assert(result.family === family && result.publicError.code === code, `${code} outcome not preserved`);
    });
  }

  cover(27, () => {
    const result = api.normalizeSupabaseTechnicalError(
      baseFailure({ source: 'SUPABASE_AUTH', nativeCode: 'provider_unavailable' }),
      baseContext(),
    );
    assert(result.family === 'INTERNAL_UNDISCLOSED', 'auth technical failure became policy denial');
  });

  cover(29, () => {
    const contractual = api.normalizeSupabaseTechnicalError(
      baseFailure(),
      baseContext({
        contractOutcome: {
          code: 'CAPACITY_LIMIT',
          family: 'RATE_OR_CAPACITY',
          contractId: 'contract:inventory',
          contractVersion: '1.0.0',
        },
      }),
    );
    const technical = api.normalizeSupabaseTechnicalError(baseFailure({ httpStatus: 429 }), baseContext());
    assert(contractual.family === 'RATE_OR_CAPACITY', 'contractual capacity outcome lost');
    assert(technical.family === 'INTERNAL_UNDISCLOSED', 'technical saturation became contractual capacity');
  });

  cover(30, () => {
    const result = api.normalizeSupabaseTechnicalError(
      baseFailure({ sqlState: '42501', stack: 'secret stack' }),
      baseContext({ runtime: 'BROWSER' }),
    );
    assert(result.protectedDiagnostic === null, 'browser received protected diagnostic');
  });

  cover(31, () => {
    const result = api.normalizeSupabaseTechnicalError(baseFailure(), baseContext({ correlationId: 'support-42' }));
    assert(result.publicError.correlationId === 'support-42', 'safe correlation was not preserved');
  });

  cover(32, () => {
    const cause = new Error('native cause');
    const result = api.normalizeSupabaseTechnicalError(baseFailure({ cause }), baseContext());
    assert(result.protectedDiagnostic.cause === cause, 'server cause was not preserved');
    assert(!('cause' in result.publicError), 'cause leaked publicly');
  });

  cover(33, () => {
    const runtimes = ['SERVER', 'BROWSER', 'NATIVE'].map((runtime) => (
      api.normalizeSupabaseTechnicalError(baseFailure(), baseContext({ runtime }), [mapping()])
    ));
    assert(runtimes.every((result) => result.family === 'DEPENDENCY_FAILURE'), 'runtime semantic parity failed');
    assert(runtimes.every((result) => result.publicError.code === 'VENTO_TECHNICAL_FAILURE'), 'runtime public parity failed');
  });

  cover(34, () => {
    const matching = api.normalizeSupabaseTechnicalError(baseFailure(), baseContext(), [mapping()]);
    const stale = api.normalizeSupabaseTechnicalError(
      baseFailure(),
      baseContext({ mappingVersion: 'mapping:2' }),
      [mapping()],
    );
    assert(matching.mapping !== null, 'matching mapping was ignored');
    assert(stale.mapping === null && stale.family === 'INTERNAL_UNDISCLOSED', 'stale mapping was applied silently');
  });

  cover(35, () => {
    assertThrows(
      () => api.normalizeSupabaseTechnicalError(baseFailure(), baseContext({ productBoundary: 'VITAL' })),
      'VITAL and other product boundaries are excluded',
      'VITAL boundary',
    );
  });

  cover(36, () => {
    const result = api.normalizeSupabaseTechnicalError(baseFailure(), baseContext());
    assert(result.ok === false && result.publicError.ok === false, 'technical failure converted to success');
    assert(!['data', 'value', 'success'].some((key) => key in result.publicError), 'public failure contains success-shaped output');
  });

  assert(covered.size === 36, `behavior coverage mismatch: ${covered.size}/36`);
  return covered.size;
}

async function main() {
  assertGitUnchanged([
    'package.json',
    'package-lock.json',
    'packages/supabase/package.json',
    'supabase',
  ]);

  const packageJson = JSON.parse(fs.readFileSync(packagePath, 'utf8'));
  exactArray(
    Object.keys(packageJson).sort(),
    ['description', 'exports', 'files', 'name', 'peerDependencies', 'private', 'scripts', 'type', 'version'],
    'package manifest keys',
  );
  assert(packageJson.name === '@vento/supabase', 'package name mismatch');
  assert(packageJson.private === true && packageJson.type === 'module', 'package boundary mismatch');
  assert(packageJson.version === '0.1.0-alpha.1', 'package candidate version mismatch');
  assert(packageJson.exports?.['./errors']?.import === './dist/errors.js',
    'compiled technical error export missing');
  assert(packageJson.files?.length === 1 && packageJson.files[0] === 'dist/',
    'distribution allowlist mismatch');

  const owner = fs.readFileSync(ownerPath, 'utf8');
  const taskBlock = canonicalTaskBlock(owner, 'SHELL-DB-004');
  assert(sha256(taskBlock) === SOURCE_CONTRACT_SHA256, 'SHELL-DB-004 source contract SHA256 mismatch');
  assert(owner.includes('| `SHELL-DB-004` | `GLOBAL_ENABLE_ONCE` | `PRE_E5_FOUNDATION` |'), 'physical topology reconciliation missing');

  const source = fs.readFileSync(sourcePath, 'utf8');
  const readme = fs.readFileSync(readmePath, 'utf8');
  includesAll(source, [
    EXPECTED_POLICY_ID,
    'ERROR_SEMANTIC_LAYERS',
    'ERROR_SEMANTIC_FAMILIES',
    'TECHNICAL_ERROR_SOURCES',
    'RETRY_DIRECTIVES',
    'captureStructuredSupabaseFailure',
    'normalizeSupabaseTechnicalError',
    'toPublicTechnicalError',
    'VITAL and other product boundaries are excluded',
  ], 'error normalizer source');
  includesAll(readme, [
    'SHELL-DB-001::GLOBAL',
    'SHELL-DB-004::GLOBAL',
    EXPECTED_POLICY_ID,
    '4/4 capas',
    '11/11 familias',
    '36/36 coberturas',
    'SHELL-DB-005',
    'VITAL',
  ], 'package README');

  const tempDir = fs.mkdtempSync(path.join(os.tmpdir(), 'vento-supabase-errors-'));
  try {
    const scenarios = await assertBehavior(tempDir);
    process.stdout.write(
      `PASS: SHELL-DB-004 errors validated; layers=4 families=11 scenarios=${scenarios} `
      + 'contract_outcome=PASS unknown_result=PASS redaction=PASS parity=PASS vital=BLOCKED\n',
    );
  } finally {
    fs.rmSync(tempDir, { recursive: true, force: true });
  }
}

main().catch((error) => {
  process.stderr.write(`FAIL: ${String(error instanceof Error ? error.message : error)}\n`);
  process.exitCode = 1;
});
