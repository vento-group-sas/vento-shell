export const IMPLEMENTATION_INTEGRATION_IMPACT_MODEL_ID =
  'VENTO-IMPLEMENTATION-INTEGRATION-IMPACT-V1';

export const IMPLEMENTATION_INTEGRATION_EVIDENCE_DECISIONS = Object.freeze([
  'REUSE_PHYSICAL_EVIDENCE',
  'REVALIDATE_PHYSICAL',
]);

const SHELL_REPOSITORY = 'vento-group-sas/vento-shell';

const DERIVED_INTEGRATION_PATHS = new Set([
  'docs/plan-canonico/modular/00_CABECERA_Y_ESTADO.md',
  'docs/plan-canonico/modular/active-sequence.json',
  'docs/plan-canonico/modular/.generated/REGISTRO_GLOBAL_DE_TAREAS.md',
  'docs/plan-canonico/modular/.generated/REGISTRO_DE_TAREAS_PENDIENTES_CON_CONTEXTO.md',
  'scripts/docs/package-readiness/implementation-package-registry.json',
]);

const INTEGRATION_LIFECYCLE_EXACT_PATHS = new Set([
  'scripts/docs/implementation-branch-lifecycle.mjs',
  'scripts/docs/implementation-branch-lifecycle.test.mjs',
  'scripts/docs/implementation-execution-coordinator.mjs',
  'scripts/docs/implementation-execution-coordinator.test.mjs',
  'scripts/docs/implementation-state-integrity.mjs',
  'scripts/docs/implementation-state-integrity.test.mjs',
  'scripts/docs/task-branch-lifecycle.mjs',
  'scripts/docs/task-branch-lifecycle.test.mjs',
]);

function fail(message) {
  throw new Error(message);
}

function normalizeRepoPath(value) {
  return String(value ?? '').trim().replaceAll('\\', '/').replace(/^\.\/+/u, '');
}

function uniqueSorted(values) {
  return [...new Set(values.map(normalizeRepoPath).filter(Boolean))].sort();
}

function stableJson(value) {
  if (Array.isArray(value)) return `[${value.map(stableJson).join(',')}]`;
  if (value && typeof value === 'object') {
    const keys = Object.keys(value).sort();
    return `{${keys.map((key) => `${JSON.stringify(key)}:${stableJson(value[key])}`).join(',')}}`;
  }
  return JSON.stringify(value);
}

function scopeMatches(scopePath, changedPath) {
  const scope = normalizeRepoPath(scopePath).replace(/\/+$/u, '');
  const changed = normalizeRepoPath(changedPath);
  if (!scope || !changed) return false;
  return changed === scope || changed.startsWith(`${scope}/`);
}

function ownLedgerPath(instance) {
  const [taskId, instanceKey] = String(instance?.instance_id ?? '').split('::');
  if (!taskId || !instanceKey) return null;
  return `docs/plan-canonico/modular/implementation-instances/${taskId}__${instanceKey}.json`;
}

function authorizedScope(instance) {
  const writable = [];
  const executeOnly = [];
  for (const entry of instance?.authorized_changes ?? []) {
    if (String(entry?.repo ?? '').trim() !== SHELL_REPOSITORY) continue;
    const relativePath = normalizeRepoPath(entry?.path);
    if (!relativePath) continue;
    const change = String(entry?.change ?? '').trim().toUpperCase();
    if (change === 'EXECUTE_ONLY') executeOnly.push(relativePath);
    else writable.push(relativePath);
  }
  return {
    writable: uniqueSorted(writable),
    execute_only: uniqueSorted(executeOnly),
  };
}

export function isImplementationIntegrationLifecyclePath(filePath) {
  const relativePath = normalizeRepoPath(filePath);
  if (INTEGRATION_LIFECYCLE_EXACT_PATHS.has(relativePath)) return true;
  return /^scripts\/docs\/implementation-(?:integration|doctor)[A-Za-z0-9._/-]*\.mjs$/u
    .test(relativePath);
}

export function assessPackageJsonIntegrationImpact({ before, after } = {}) {
  if (!before || typeof before !== 'object' || Array.isArray(before)) {
    fail('PACKAGE_JSON_BEFORE_INVALID');
  }
  if (!after || typeof after !== 'object' || Array.isArray(after)) {
    fail('PACKAGE_JSON_AFTER_INVALID');
  }

  const beforeCopy = structuredClone(before);
  const afterCopy = structuredClone(after);
  const beforePlanTest = String(beforeCopy?.scripts?.['docs:plan:test'] ?? '');
  const afterPlanTest = String(afterCopy?.scripts?.['docs:plan:test'] ?? '');

  if (beforeCopy.scripts) delete beforeCopy.scripts['docs:plan:test'];
  if (afterCopy.scripts) delete afterCopy.scripts['docs:plan:test'];

  if (stableJson(beforeCopy) !== stableJson(afterCopy)) {
    return Object.freeze({
      safe: false,
      reason: 'PACKAGE_JSON_NON_INTEGRATION_SURFACE_CHANGED',
      added_tests: [],
    });
  }

  if (beforePlanTest === afterPlanTest) {
    return Object.freeze({
      safe: true,
      reason: 'PACKAGE_JSON_UNCHANGED_OUTSIDE_INTEGRATION',
      added_tests: [],
    });
  }

  const beforeTokens = beforePlanTest.split(/\s+/u).filter(Boolean);
  const afterTokens = afterPlanTest.split(/\s+/u).filter(Boolean);
  let beforeIndex = 0;
  const added = [];

  for (const token of afterTokens) {
    if (beforeIndex < beforeTokens.length && token === beforeTokens[beforeIndex]) {
      beforeIndex += 1;
      continue;
    }
    added.push(token);
  }

  if (beforeIndex !== beforeTokens.length) {
    return Object.freeze({
      safe: false,
      reason: 'PACKAGE_JSON_DOCS_PLAN_TEST_REMOVED_OR_REORDERED',
      added_tests: added,
    });
  }

  const unsafeAdded = added.filter(
    (token) => !/^scripts\/docs\/implementation-[A-Za-z0-9._/-]*\.test\.mjs$/u.test(token),
  );
  if (unsafeAdded.length > 0) {
    return Object.freeze({
      safe: false,
      reason: `PACKAGE_JSON_DOCS_PLAN_TEST_UNSAFE_ADDITION:${unsafeAdded.join(',')}`,
      added_tests: added,
    });
  }

  return Object.freeze({
    safe: true,
    reason: 'PACKAGE_JSON_ADDITIVE_IMPLEMENTATION_TESTS_ONLY',
    added_tests: added,
  });
}

export function classifyImplementationIntegrationImpact({
  instance,
  changedPaths = [],
  pristinePendingInstancePaths = [],
  packageJsonBefore = null,
  packageJsonAfter = null,
} = {}) {
  if (!instance || typeof instance !== 'object' || Array.isArray(instance)) {
    fail('INTEGRATION_IMPACT_INSTANCE_INVALID');
  }
  if (!String(instance.instance_id ?? '').includes('::')) {
    fail('INTEGRATION_IMPACT_INSTANCE_ID_INVALID');
  }

  const changed = uniqueSorted(changedPaths);
  const pristinePending = new Set(uniqueSorted(pristinePendingInstancePaths));
  const ledger = ownLedgerPath(instance);
  const scope = authorizedScope(instance);
  const safe = [];
  const material = [];
  const classifications = [];

  const classify = (path, classification, evidenceReuseSafe) => {
    classifications.push(Object.freeze({
      path,
      classification,
      evidence_reuse_safe: evidenceReuseSafe,
    }));
    (evidenceReuseSafe ? safe : material).push(path);
  };

  for (const relativePath of changed) {
    if (relativePath === ledger) {
      classify(relativePath, 'CURRENT_INSTANCE_LEDGER_CHANGED', false);
      continue;
    }

    if (DERIVED_INTEGRATION_PATHS.has(relativePath)) {
      classify(relativePath, 'DERIVED_PROJECTION', true);
      continue;
    }

    if (isImplementationIntegrationLifecyclePath(relativePath)) {
      classify(relativePath, 'INTEGRATION_LIFECYCLE_TOOLING', true);
      continue;
    }

    if (relativePath === 'package.json') {
      if (!packageJsonBefore || !packageJsonAfter) {
        classify(relativePath, 'PACKAGE_JSON_WITHOUT_SEMANTIC_PROOF', false);
        continue;
      }
      const packageImpact = assessPackageJsonIntegrationImpact({
        before: packageJsonBefore,
        after: packageJsonAfter,
      });
      classify(
        relativePath,
        packageImpact.reason,
        packageImpact.safe,
      );
      continue;
    }

    if (
      relativePath.startsWith('docs/plan-canonico/modular/implementation-instances/')
      && pristinePending.has(relativePath)
    ) {
      classify(relativePath, 'PRISTINE_PENDING_INSTANCE_METADATA', true);
      continue;
    }

    const writableMatch = scope.writable.find((entry) => scopeMatches(entry, relativePath));
    if (writableMatch) {
      classify(relativePath, `AUTHORIZED_WRITABLE_OVERLAP:${writableMatch}`, false);
      continue;
    }

    const executeMatch = scope.execute_only.find((entry) => scopeMatches(entry, relativePath));
    if (executeMatch) {
      classify(relativePath, `AUTHORIZED_EXECUTE_ONLY_DEPENDENCY_CHANGED:${executeMatch}`, false);
      continue;
    }

    classify(relativePath, 'UNKNOWN_OR_PHYSICAL_DEPENDENCY_CHANGED', false);
  }

  const decision = material.length === 0
    ? 'REUSE_PHYSICAL_EVIDENCE'
    : 'REVALIDATE_PHYSICAL';

  return Object.freeze({
    model_id: IMPLEMENTATION_INTEGRATION_IMPACT_MODEL_ID,
    instance_id: instance.instance_id,
    decision,
    changed_paths: changed,
    safe_paths: uniqueSorted(safe),
    material_paths: uniqueSorted(material),
    classifications: Object.freeze(classifications),
  });
}

export function assertPhysicalEvidenceReusableForIntegration(input = {}) {
  const impact = classifyImplementationIntegrationImpact(input);
  if (impact.decision !== 'REUSE_PHYSICAL_EVIDENCE') {
    fail(
      `PHYSICAL_EVIDENCE_REUSE_BLOCKED:${impact.material_paths.join(',') || 'UNKNOWN'}`,
    );
  }
  return impact;
}
