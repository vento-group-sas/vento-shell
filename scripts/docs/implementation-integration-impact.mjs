import {
  implementationAuthorizedChanges,
  implementationPathMatchesScope,
  isImplementationDerivedProjection,
  normalizeImplementationPath,
} from './implementation-path-policy.mjs';

export const IMPLEMENTATION_INTEGRATION_IMPACT_MODEL_ID =
  'VENTO-IMPLEMENTATION-INTEGRATION-IMPACT-V1';

export const IMPLEMENTATION_INTEGRATION_EVIDENCE_DECISIONS = Object.freeze([
  'REUSE_PHYSICAL_EVIDENCE',
  'REVALIDATE_PHYSICAL',
]);

const IMPLEMENTATION_DOCTOR_SCRIPT = 'node scripts/docs/implementation-doctor.mjs';

const INTEGRATION_LIFECYCLE_EXACT_PATHS = new Set([
  'docs/plan-canonico/modular/task-development-policy.json',
  'scripts/docs/canonical-task-preflight.mjs',
  'scripts/docs/docs-runtime-primitives.mjs',
  'scripts/docs/docs-runtime-primitives.test.mjs',
  'scripts/docs/implementation-branch-lifecycle.mjs',
  'scripts/docs/implementation-branch-lifecycle.test.mjs',
  'scripts/docs/implementation-execution-coordinator.mjs',
  'scripts/docs/implementation-execution-coordinator.test.mjs',
  'scripts/docs/implementation-path-policy.mjs',
  'scripts/docs/implementation-path-policy.test.mjs',
  'scripts/docs/implementation-repository-bundle.mjs',
  'scripts/docs/implementation-repository-bundle.test.mjs',
  'scripts/docs/implementation-state-integrity.mjs',
  'scripts/docs/implementation-state-integrity.test.mjs',
  'scripts/docs/implementation-validation-engine.mjs',
  'scripts/docs/implementation-validation-engine.test.mjs',
  'scripts/docs/validate-executable-delivery.mjs',
  'scripts/docs/validate-executable-delivery.test.mjs',
  'scripts/docs/task-branch-lifecycle.mjs',
  'scripts/docs/task-branch-lifecycle.test.mjs',
  'scripts/docs/package-review-factory.mjs',
  'scripts/docs/task-semantic-contract.mjs',
  'scripts/docs/task-semantic-contract.test.mjs',
  'scripts/quality/lint-ratchet.mjs',
  'scripts/quality/lint-ratchet.test.mjs',
  'scripts/supabase/environment-drift.mjs',
  'scripts/supabase/environment-drift.test.mjs',
]);

const CORRECTION_INSTANCE_DIRECTORY = 'docs/plan-canonico/modular/correction-instances/';
const CORRECTION_INTEGRATION_LIFECYCLE_EXACT_PATHS = new Set([
  '.vscode/settings.json',
  'scripts/docs/correction-branch-lifecycle.mjs',
  'scripts/docs/correction-branch-lifecycle.test.mjs',
  'scripts/docs/correction-control.mjs',
  'scripts/docs/correction-control.test.mjs',
  'scripts/docs/correction-lifecycle-performance.md',
  'scripts/docs/correction-repository-bundle.mjs',
  'scripts/docs/correction-repository-bundle.test.mjs',
  'scripts/docs/correction-validation-session.mjs',
  'scripts/docs/correction-validation-session.test.mjs',
  'scripts/docs/lifecycle-command-observer.mjs',
  'scripts/docs/lifecycle-command-observer.test.mjs',
  'scripts/docs/vento-terminal.ps1',
]);

function fail(message) {
  throw new Error(message);
}

function normalizeRepoPath(value) {
  return normalizeImplementationPath(value);
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

function ownLedgerPath(instance) {
  const [taskId, instanceKey] = String(instance?.instance_id ?? '').split('::');
  if (!taskId || !instanceKey) return null;
  return `docs/plan-canonico/modular/implementation-instances/${taskId}__${instanceKey}.json`;
}

function authorizedScope(instance) {
  const changes = implementationAuthorizedChanges(instance);
  return {
    writable: uniqueSorted(changes.filter((entry) => entry.change !== 'EXECUTE_ONLY').map((entry) => entry.path)),
    execute_only: uniqueSorted(changes.filter((entry) => entry.change === 'EXECUTE_ONLY').map((entry) => entry.path)),
  };
}

export function isImplementationIntegrationLifecyclePath(filePath) {
  const relativePath = normalizeRepoPath(filePath);
  if (INTEGRATION_LIFECYCLE_EXACT_PATHS.has(relativePath)) return true;
  return /^scripts\/docs\/implementation-(?:integration|doctor)[A-Za-z0-9._/-]*\.mjs$/u
    .test(relativePath);
}

export function isCorrectionIntegrationLifecyclePath(filePath) {
  return CORRECTION_INTEGRATION_LIFECYCLE_EXACT_PATHS.has(normalizeRepoPath(filePath));
}

export function isVerifiedCorrectionIntegrationRecord(record, relativePath) {
  if (!record || typeof record !== 'object' || Array.isArray(record)) return false;
  const id = String(record.correction_id ?? '').trim();
  if (!/^[A-Z0-9]+(?:-[A-Z0-9]+)*-[0-9]{3,4}::CORR-[0-9]{3}$/u.test(id)) return false;
  const expectedPath = `${CORRECTION_INSTANCE_DIRECTORY}${id.replace('::', '__')}.json`;
  if (normalizeRepoPath(relativePath) !== expectedPath) return false;
  if (record.status !== 'VERIFIED') return false;
  if (!String(record.verified_at ?? '').trim() || !Number.isFinite(Date.parse(record.verified_at))) return false;
  return (record.evidence ?? []).some((entry) => (
    entry && typeof entry === 'object' && !Array.isArray(entry)
    && entry.type === 'CORRECTION_VERIFICATION_V1'
    && entry.status === 'PASS'
  ));
}

function assessAdditiveTestScript({ before, after, allowedPattern, label }) {
  if (before === after) return Object.freeze({ safe: true, added: [] });
  const beforeTokens = String(before ?? '').split(/\s+/u).filter(Boolean);
  const afterTokens = String(after ?? '').split(/\s+/u).filter(Boolean);
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
    return Object.freeze({ safe: false, reason: `${label}_REMOVED_OR_REORDERED`, added });
  }
  const unsafeAdded = added.filter((token) => !allowedPattern.test(token));
  if (unsafeAdded.length > 0) {
    return Object.freeze({
      safe: false,
      reason: `${label}_UNSAFE_ADDITION:${unsafeAdded.join(',')}`,
      added,
    });
  }
  return Object.freeze({ safe: true, added });
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
  const beforeCorrectionTest = String(beforeCopy?.scripts?.['docs:correction:test'] ?? '');
  const afterCorrectionTest = String(afterCopy?.scripts?.['docs:correction:test'] ?? '');
  const beforeDoctor = String(beforeCopy?.scripts?.['docs:implementation:doctor'] ?? '');
  const afterDoctor = String(afterCopy?.scripts?.['docs:implementation:doctor'] ?? '');

  if (beforeCopy.scripts) {
    delete beforeCopy.scripts['docs:plan:test'];
    delete beforeCopy.scripts['docs:correction:test'];
    delete beforeCopy.scripts['docs:implementation:doctor'];
  }
  if (afterCopy.scripts) {
    delete afterCopy.scripts['docs:plan:test'];
    delete afterCopy.scripts['docs:correction:test'];
    delete afterCopy.scripts['docs:implementation:doctor'];
  }

  if (stableJson(beforeCopy) !== stableJson(afterCopy)) {
    return Object.freeze({
      safe: false,
      reason: 'PACKAGE_JSON_NON_INTEGRATION_SURFACE_CHANGED',
      added_tests: [],
      doctor_script: afterDoctor || null,
    });
  }

  const doctorScriptSafe = beforeDoctor === afterDoctor
    || (!beforeDoctor && afterDoctor === IMPLEMENTATION_DOCTOR_SCRIPT);
  if (!doctorScriptSafe) {
    return Object.freeze({
      safe: false,
      reason: 'PACKAGE_JSON_IMPLEMENTATION_DOCTOR_SCRIPT_CHANGED_UNSAFELY',
      added_tests: [],
      doctor_script: afterDoctor || null,
    });
  }

  const planDelta = assessAdditiveTestScript({
    before: beforePlanTest,
    after: afterPlanTest,
    allowedPattern: /^scripts\/docs\/(?:(?:implementation|correction)-[A-Za-z0-9._/-]*|lifecycle-command-observer)\.test\.mjs$/u,
    label: 'DOCS_PLAN_TEST',
  });
  if (!planDelta.safe) {
    return Object.freeze({
      safe: false,
      reason: `PACKAGE_JSON_${planDelta.reason}`,
      added_tests: planDelta.added,
      doctor_script: afterDoctor || null,
    });
  }

  const correctionDelta = assessAdditiveTestScript({
    before: beforeCorrectionTest,
    after: afterCorrectionTest,
    allowedPattern: /^scripts\/docs\/(?:correction-[A-Za-z0-9._/-]*|lifecycle-command-observer)\.test\.mjs$/u,
    label: 'DOCS_CORRECTION_TEST',
  });
  if (!correctionDelta.safe) {
    return Object.freeze({
      safe: false,
      reason: `PACKAGE_JSON_${correctionDelta.reason}`,
      added_tests: [...planDelta.added, ...correctionDelta.added],
      doctor_script: afterDoctor || null,
    });
  }

  const addedTests = [...planDelta.added, ...correctionDelta.added];
  if (addedTests.length === 0) {
    return Object.freeze({
      safe: true,
      reason: beforeDoctor === afterDoctor
        ? 'PACKAGE_JSON_UNCHANGED_OUTSIDE_INTEGRATION'
        : 'PACKAGE_JSON_ADDITIVE_IMPLEMENTATION_DOCTOR_ONLY',
      added_tests: [],
      doctor_script: afterDoctor || null,
    });
  }

  const correctionAddition = addedTests.some((token) => /^scripts\/docs\/correction-/u.test(token));
  return Object.freeze({
    safe: true,
    reason: correctionAddition
      ? 'PACKAGE_JSON_ADDITIVE_LIFECYCLE_TESTS_ONLY'
      : 'PACKAGE_JSON_ADDITIVE_IMPLEMENTATION_TESTS_ONLY',
    added_tests: addedTests,
    doctor_script: afterDoctor || null,
  });
}

export function classifyImplementationIntegrationImpact({
  instance,
  changedPaths = [],
  pristinePendingInstancePaths = [],
  verifiedCorrectionRecordPaths = [],
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
  const verifiedCorrections = new Set(uniqueSorted(verifiedCorrectionRecordPaths));
  const ledger = ownLedgerPath(instance);
  const scope = authorizedScope(instance);
  const safe = [];
  const material = [];
  const classifications = [];

  const classify = (pathValue, classification, evidenceReuseSafe) => {
    classifications.push(Object.freeze({
      path: pathValue,
      classification,
      evidence_reuse_safe: evidenceReuseSafe,
    }));
    (evidenceReuseSafe ? safe : material).push(pathValue);
  };

  for (const relativePath of changed) {
    if (relativePath === ledger) {
      classify(relativePath, 'CURRENT_INSTANCE_LEDGER_CHANGED', false);
      continue;
    }

    if (isImplementationDerivedProjection(relativePath)) {
      classify(relativePath, 'DERIVED_PROJECTION', true);
      continue;
    }

    if (isImplementationIntegrationLifecyclePath(relativePath)) {
      classify(relativePath, 'INTEGRATION_LIFECYCLE_TOOLING', true);
      continue;
    }

    if (isCorrectionIntegrationLifecyclePath(relativePath)) {
      classify(relativePath, 'CORRECTION_LIFECYCLE_TOOLING', true);
      continue;
    }

    if (relativePath.startsWith(CORRECTION_INSTANCE_DIRECTORY)) {
      if (verifiedCorrections.has(relativePath)) {
        classify(relativePath, 'VERIFIED_CORRECTION_METADATA', true);
      } else {
        classify(relativePath, 'CORRECTION_METADATA_NOT_VERIFIED', false);
      }
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
      classify(relativePath, packageImpact.reason, packageImpact.safe);
      continue;
    }

    if (
      relativePath.startsWith('docs/plan-canonico/modular/implementation-instances/')
      && pristinePending.has(relativePath)
    ) {
      classify(relativePath, 'PRISTINE_PENDING_INSTANCE_METADATA', true);
      continue;
    }

    const writableMatch = scope.writable.find((entry) => implementationPathMatchesScope(entry, relativePath));
    if (writableMatch) {
      classify(relativePath, `AUTHORIZED_WRITABLE_OVERLAP:${writableMatch}`, false);
      continue;
    }

    const executeMatch = scope.execute_only.find((entry) => implementationPathMatchesScope(entry, relativePath));
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
