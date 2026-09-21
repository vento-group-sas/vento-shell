import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { spawnSync } from 'node:child_process';

import { scanPackageReadiness } from './package-readiness-scanner.mjs';
import { writeReadinessChatgptWorkStarter } from './chatgpt-work-starter-readiness.mjs';
import { writeImplementationControlArtifacts } from './implementation-control.mjs';
import { writeCorrectionStarter } from './correction-starter.mjs';
import { syncPlanContinuity } from './plan-continuity-final-newline.mjs';
import { syncPendingTaskContext } from './sync-pending-task-context.mjs';

const MANIFEST_RELATIVE_PATH = 'docs/plan-canonico/modular/manifest.json';
const STARTER_RELATIVE_PATH = 'INICIADOR_VENTO_ACTUAL.txt';
const RESULT_START = '=== RESULTADO PARA CHATGPT ===';
const RESULT_END = '=== FIN RESULTADO PARA CHATGPT ===';

function fail(message, code = 1) {
  const error = new Error(message);
  error.exitCode = code;
  throw error;
}

function run(command, args, {
  cwd = process.cwd(),
  allowFailure = false,
} = {}) {
  const result = spawnSync(command, args, {
    cwd,
    encoding: 'utf8',
    windowsHide: true,
    stdio: ['ignore', 'pipe', 'pipe'],
  });

  if (result.error) {
    if (allowFailure) return { status: 1, stdout: '', stderr: result.error.message };
    fail(`${command} no disponible: ${result.error.message}`);
  }

  const status = Number.isInteger(result.status) ? result.status : 1;
  const stdout = String(result.stdout ?? '').trimEnd();
  const stderr = String(result.stderr ?? '').trimEnd();

  if (status !== 0 && !allowFailure) {
    fail(stderr || stdout || `${command} ${args.join(' ')} fallo.`, status);
  }

  return { status, stdout, stderr };
}

function git(args, options = {}) {
  return run('git', args, options);
}

function repositoryStatus(root) {
  return git(
    ['status', '--porcelain=v1', '--untracked-files=all'],
    { cwd: root },
  ).stdout;
}

function ensureIgnored(root, relativePath) {
  const result = git(
    ['check-ignore', '--quiet', '--', relativePath],
    { cwd: root, allowFailure: true },
  );
  if (result.status !== 0) {
    fail(`LOCAL_DERIVED_SYNC rechazo ${relativePath}: no esta protegido por .gitignore.`);
  }
}

function loadManifest(root) {
  const manifestPath = path.join(root, ...MANIFEST_RELATIVE_PATH.split('/'));
  if (!fs.existsSync(manifestPath)) {
    fail(`No existe ${MANIFEST_RELATIVE_PATH}.`);
  }

  const manifest = JSON.parse(fs.readFileSync(manifestPath, 'utf8'));
  if (!Array.isArray(manifest.files) || manifest.files.length === 0) {
    fail(`${MANIFEST_RELATIVE_PATH} no contiene files validos.`);
  }
  if (typeof manifest.compiled_output !== 'string' || !manifest.compiled_output.trim()) {
    fail(`${MANIFEST_RELATIVE_PATH} no contiene compiled_output valido.`);
  }
  return manifest;
}

function renderCompiledSource(root, manifest) {
  const baseDir = path.join(root, 'docs', 'plan-canonico', 'modular');
  let compiled = '';

  for (const relativePath of manifest.files) {
    const absolutePath = path.join(baseDir, ...String(relativePath).split('/'));
    if (!fs.existsSync(absolutePath) || !fs.statSync(absolutePath).isFile()) {
      fail(`Falta fragmento canonico: ${relativePath}.`);
    }
    const fragment = fs.readFileSync(absolutePath, 'utf8');
    if (!fragment.endsWith('\n')) {
      fail(`Fragmento sin salto final: ${relativePath}.`);
    }
    compiled += fragment;
  }

  return compiled;
}

function syncCompiledCache(root, manifest) {
  const relativePath = String(manifest.compiled_output).replaceAll('\\', '/');
  ensureIgnored(root, relativePath);

  const outputPath = path.join(root, ...relativePath.split('/'));
  const expected = renderCompiledSource(root, manifest);
  const current = fs.existsSync(outputPath) ? fs.readFileSync(outputPath, 'utf8') : null;
  const changed = current !== expected;

  if (changed) {
    fs.mkdirSync(path.dirname(outputPath), { recursive: true });
    fs.writeFileSync(outputPath, expected, 'utf8');
  }

  return { relativePath, changed };
}

function verifyCanonicalState(root) {
  const result = run(
    process.execPath,
    ['scripts/docs/build-plan-canonico-core.mjs', '--check'],
    { cwd: root, allowFailure: true },
  );
  if (result.status !== 0) {
    fail(
      result.stderr
      || result.stdout
      || 'build-plan-canonico-core.mjs --check fallo despues de sincronizar derivados locales.',
      result.status,
    );
  }
}

export function syncLocalDerivedArtifacts({
  root = process.cwd(),
  quiet = false,
} = {}) {
  const repositoryRoot = path.resolve(root);

  const localProjectionPaths = [
    STARTER_RELATIVE_PATH,
    '.delivery/INICIADOR_VENTO_DOCUMENTACION.txt',
    '.delivery/INICIADOR_VENTO_DOCUMENTACION_TRABAJO_ADELANTADO.txt',
    '.delivery/INICIADOR_VENTO_IMPLEMENTACION.txt',
    '.delivery/INICIADOR_VENTO_CORRECCION.txt',
    '.delivery/current-work-directive.md',
    '.delivery/implementation-control-status.json',
  ];

  for (const relativePath of localProjectionPaths) {
    ensureIgnored(repositoryRoot, relativePath);
  }

  const initialStatus = repositoryStatus(repositoryRoot);

  const continuity = syncPlanContinuity({
    root: repositoryRoot,
    checkOnly: false,
  });

  const implementationControl = writeImplementationControlArtifacts({
    root: repositoryRoot,
    check: false,
    materializePendingRecord: false,
  });

  const readiness = scanPackageReadiness({
    root: repositoryRoot,
    write: true,
    check: false,
    trigger: 'local-derived-sync',
  });

  const pendingContext = syncPendingTaskContext({
    root: repositoryRoot,
    check: false,
    readinessResult: readiness,
  });

  const manifest = loadManifest(repositoryRoot);
  const compiled = syncCompiledCache(repositoryRoot, manifest);

  const starter = writeReadinessChatgptWorkStarter({
    root: repositoryRoot,
    readinessResult: readiness,
  });

  const correctionStarter = writeCorrectionStarter({
    root: repositoryRoot,
  });

  const reconciledStatus = repositoryStatus(repositoryRoot);

  if (
    process.env.CI === 'true'
    && reconciledStatus !== initialStatus
  ) {
    fail(
      'CI_DERIVED_PROJECTION_DRIFT: una o más proyecciones versionadas '
      + 'requirieron regeneración durante docs:plan:check; deben quedar '
      + 'comprometidas en el PR antes del merge.',
    );
  }

  verifyCanonicalState(repositoryRoot);

  const postReadiness = scanPackageReadiness({
    root: repositoryRoot,
    check: true,
    trigger: 'local-derived-sync-postcheck',
    supplied: { skipDerivedReports: true },
  });

  syncPendingTaskContext({
    root: repositoryRoot,
    check: true,
    readinessResult: postReadiness,
  });

  writeImplementationControlArtifacts({
    root: repositoryRoot,
    check: true,
    materializePendingRecord: false,
  });

  writeReadinessChatgptWorkStarter({
    root: repositoryRoot,
    check: true,
    readinessResult: postReadiness,
  });

  writeCorrectionStarter({
    root: repositoryRoot,
    check: true,
  });

  const afterStatus = repositoryStatus(repositoryRoot);

  if (afterStatus !== reconciledStatus) {
    fail(
      'LOCAL_DERIVED_SYNC detectó una mutación posterior a la convergencia; '
      + 'algún generador no es idempotente o modificó una ruta no derivada.',
    );
  }

  const result = {
    trackedContinuityChanged: continuity.changed,
    implementationControlChanged: implementationControl.changed,
    packageRegistryChanged: readiness.registryChanged,
    pendingTaskContextChanged: pendingContext.changed,
    compiled: compiled.relativePath,
    compiledChanged: compiled.changed,
    starter: STARTER_RELATIVE_PATH,
    starterChanged: starter.changed,
    correctionStarterChanged: correctionStarter.changed,
    packageReadiness: 'PASS',
    implementationReadyCount:
      readiness.registry.implementation_ready_queue.length,
    worktreePreservedAfterConvergence: true,
  };

  if (!quiet) {
    console.log('');
    console.log(RESULT_START);
    console.log('ESTADO: PASS');
    console.log('OPERACION: LOCAL_DERIVED_SYNC');
    console.log(
      `TRACKED_PLAN_CONTINUITY: ${continuity.changed ? 'REFRESHED' : 'FRESH'}`,
    );
    console.log(
      `PACKAGE_REGISTRY: ${readiness.registryChanged ? 'REFRESHED' : 'FRESH'}`,
    );
    console.log(
      `PENDING_TASK_CONTEXT: ${pendingContext.changed ? 'REFRESHED' : 'FRESH'}`,
    );
    console.log(
      `IMPLEMENTATION_CONTROL: ${implementationControl.changed ? 'REFRESHED' : 'FRESH'}`,
    );
    console.log(
      `CHATGPT_STARTERS: ${starter.changed ? 'REFRESHED' : 'FRESH'}`,
    );
    console.log(
      `CORRECTION_STARTER: ${correctionStarter.changed ? 'REFRESHED' : 'FRESH'}`,
    );
    console.log(
      `COMPILED_CACHE: ${compiled.changed ? 'REFRESHED' : 'FRESH'}`,
    );
    console.log('PACKAGE_READINESS: PASS');
    console.log(
      `IMPLEMENTATION_READY_QUEUE: ${readiness.registry.implementation_ready_queue.length}`,
    );
    console.log('NON_DERIVED_WORKTREE: PRESERVED');
    console.log(RESULT_END);
  }

  return result;
}
function main() {
  syncLocalDerivedArtifacts();
}

const isCli = process.argv[1]
  && path.resolve(process.argv[1]) === path.resolve(fileURLToPath(import.meta.url));

if (isCli) {
  try {
    main();
  } catch (error) {
    const message = error instanceof Error ? error.message : String(error);
    const code = Number.isInteger(error?.exitCode) ? error.exitCode : 1;
    console.log('');
    console.log(RESULT_START);
    console.log('ESTADO: FAIL');
    console.log('OPERACION: LOCAL_DERIVED_SYNC');
    console.log(`ERROR: ${message.replace(/\s+/gu, ' ').trim()}`);
    console.log('NON_DERIVED_WORKTREE: PRESERVED_OR_BLOCKED');
    console.log(RESULT_END);
    process.exitCode = code;
  }
}
