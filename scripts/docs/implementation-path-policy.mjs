import fs from 'node:fs';
import path from 'node:path';

export const SHELL_REPOSITORY = 'vento-group-sas/vento-shell';

export const PLAN_DERIVED_PROJECTION_PATHS = Object.freeze([
  'docs/plan-canonico/modular/00_CABECERA_Y_ESTADO.md',
  'docs/plan-canonico/modular/active-sequence.json',
  'docs/plan-canonico/modular/.generated/REGISTRO_GLOBAL_DE_TAREAS.md',
  'docs/plan-canonico/modular/.generated/REGISTRO_DE_TAREAS_PENDIENTES_CON_CONTEXTO.md',
]);

export const IMPLEMENTATION_DERIVED_PROJECTION_PATHS = Object.freeze([
  ...PLAN_DERIVED_PROJECTION_PATHS,
  'scripts/docs/package-readiness/implementation-package-registry.json',
]);

const PLAN_DERIVED_PROJECTIONS = new Set(PLAN_DERIVED_PROJECTION_PATHS);
const IMPLEMENTATION_DERIVED_PROJECTIONS = new Set(
  IMPLEMENTATION_DERIVED_PROJECTION_PATHS,
);

function fail(message) {
  throw new Error(message);
}

export function normalizeImplementationPath(value) {
  return String(value ?? '')
    .trim()
    .replaceAll('\\', '/')
    .replace(/^\.\/+/u, '')
    .replace(/\/+$/u, '');
}

export function implementationPathMatchesScope(scopePath, changedPath) {
  const scope = normalizeImplementationPath(scopePath);
  const changed = normalizeImplementationPath(changedPath);
  return Boolean(scope && changed && (changed === scope || changed.startsWith(`${scope}/`)));
}

export function implementationAuthorizedChanges(instance) {
  return Object.freeze((instance?.authorized_changes ?? [])
    .filter((entry) => String(entry?.repo ?? '').trim() === SHELL_REPOSITORY)
    .map((entry) => Object.freeze({
      path: normalizeImplementationPath(entry?.path),
      change: String(entry?.change ?? '').trim().toUpperCase(),
    }))
    .filter((entry) => entry.path)
    .sort((left, right) => right.path.length - left.path.length || left.path.localeCompare(right.path)));
}

export function resolveImplementationAuthorization(instance, filePath) {
  const relativePath = normalizeImplementationPath(filePath);
  const match = implementationAuthorizedChanges(instance)
    .find((entry) => implementationPathMatchesScope(entry.path, relativePath));
  if (!match) return null;
  return Object.freeze({
    ...match,
    classification: match.change === 'EXECUTE_ONLY' ? 'EXECUTE_ONLY' : 'WRITABLE',
  });
}

export function isPlanDerivedProjection(filePath) {
  return PLAN_DERIVED_PROJECTIONS.has(normalizeImplementationPath(filePath));
}

export function isImplementationDerivedProjection(filePath) {
  return IMPLEMENTATION_DERIVED_PROJECTIONS.has(normalizeImplementationPath(filePath));
}

function safeAbsolutePath(root, relativePath) {
  const normalized = normalizeImplementationPath(relativePath);
  if (
    !normalized
    || path.posix.isAbsolute(normalized)
    || /^[A-Za-z]:/u.test(normalized)
    || normalized.split('/').includes('..')
  ) {
    fail(`AUTHORIZED_PATH_INVALID:${relativePath || 'EMPTY'}`);
  }
  const repositoryRoot = path.resolve(root);
  const absolute = path.resolve(repositoryRoot, ...normalized.split('/'));
  const prefix = `${repositoryRoot}${path.sep}`.toLowerCase();
  if (absolute.toLowerCase() !== repositoryRoot.toLowerCase()
    && !absolute.toLowerCase().startsWith(prefix)) {
    fail(`AUTHORIZED_PATH_OUTSIDE_REPOSITORY:${normalized}`);
  }
  return { normalized, absolute, repositoryRoot };
}

function directoryToPrepare({ absolute, change }) {
  if (fs.existsSync(absolute)) {
    return fs.statSync(absolute).isDirectory() ? absolute : path.dirname(absolute);
  }
  const createDirectoryScope = change === 'CREATE' && path.extname(absolute) === '';
  return createDirectoryScope ? absolute : path.dirname(absolute);
}

export function prepareAuthorizedMaterializationDirectories({ root, instance } = {}) {
  if (!root) fail('AUTHORIZED_DIRECTORY_ROOT_MISSING');
  if (!instance || typeof instance !== 'object' || Array.isArray(instance)) {
    fail('AUTHORIZED_DIRECTORY_INSTANCE_INVALID');
  }

  const repositoryRoot = path.resolve(root);
  const created = [];
  const prepared = [];
  for (const entry of implementationAuthorizedChanges(instance)) {
    if (entry.change === 'EXECUTE_ONLY') continue;
    const resolved = safeAbsolutePath(repositoryRoot, entry.path);
    const directory = directoryToPrepare({ absolute: resolved.absolute, change: entry.change });
    const existed = fs.existsSync(directory);
    fs.mkdirSync(directory, { recursive: true });
    const relativeDirectory = normalizeImplementationPath(path.relative(repositoryRoot, directory));
    if (relativeDirectory) prepared.push(relativeDirectory);
    if (!existed && relativeDirectory) created.push(relativeDirectory);
  }

  return Object.freeze({
    prepared: Object.freeze([...new Set(prepared)].sort()),
    created: Object.freeze([...new Set(created)].sort()),
  });
}
