import crypto from 'node:crypto';
import { performance } from 'node:perf_hooks';

import { deriveImplementationControl } from './implementation-control.mjs';
import { scanPackageReadiness } from './package-readiness-scanner.mjs';

export const IMPLEMENTATION_VALIDATION_ENGINE_ID = 'VENTO-IMPLEMENTATION-VALIDATION-ENGINE-V1';
export const IMPLEMENTATION_VALIDATION_PHASES = Object.freeze([
  'F1_OBSERVABILITY',
  'F2_SHARED_IMMUTABLE_CONTEXT',
  'F3_DEDUPLICATION_CANDIDATE_RECEIPTS',
  'F4_SHADOW_IMPACT_SELECTION',
  'F5_SAFE_SELECTIVE_VALIDATION',
]);

function sha256(value) {
  return crypto.createHash('sha256').update(String(value), 'utf8').digest('hex');
}

function canonicalJson(value) {
  if (Array.isArray(value)) {
    return `[${value.map((entry) => canonicalJson(entry)).join(',')}]`;
  }
  if (value && typeof value === 'object') {
    return `{${Object.keys(value)
      .sort()
      .map((key) => `${JSON.stringify(key)}:${canonicalJson(value[key])}`)
      .join(',')}}`;
  }
  return JSON.stringify(value);
}

function deepFreeze(value, seen = new WeakSet()) {
  if (!value || typeof value !== 'object' || seen.has(value)) return value;
  seen.add(value);
  for (const child of Object.values(value)) deepFreeze(child, seen);
  return Object.freeze(value);
}

function immutableClone(value) {
  return deepFreeze(structuredClone(value));
}

function durationMs(start, end) {
  return Number(Math.max(0, Number(end) - Number(start)).toFixed(3));
}

export const IMPLEMENTATION_VALIDATION_REUSE_POLICY = Object.freeze({
  PREVERIFY: 'EXACT_CANDIDATE_FINGERPRINT_ONLY',
  REMOTE: 'NEVER_REUSE',
  AUTHORIZATION: 'NEVER_REUSE',
  PR_MERGE: 'NEVER_REUSE',
});

const PREVERIFY_VALIDATOR_ID = 'IMPLEMENTATION_PREVERIFY_V1';

const SHADOW_IMPACT_SELECTOR_ID = 'IMPLEMENTATION_SHADOW_IMPACT_SELECTOR_V1';
const SHADOW_EXECUTION_MODE = 'FULL_SUITE_SHADOW_ONLY';
const SAFE_SELECTIVE_POLICY_ID = 'PACKAGE_LOCAL_CLOSED_SCOPE_V1';
const SAFE_SELECTIVE_REPOSITORY = 'vento-group-sas/vento-shell';
const SAFE_SELECTIVE_EXECUTION_MODE = 'CONDITIONAL_SAFE_SELECTIVE';
const SAFE_SELECTIVE_MINIMUM_OMISSION_BEARING_SAMPLES = 5;
const SAFE_SELECTIVE_MINIMUM_DISTINCT_PACKAGES = 3;

function safeSelectiveCertificationSnapshot({
  observedOmissionBearingSamples = 0,
  distinctPackageIds = [],
  observedFalseNegatives = 0,
} = {}) {
  const packages = [...new Set((Array.isArray(distinctPackageIds) ? distinctPackageIds : [])
    .map((value) => String(value ?? '').trim().toUpperCase())
    .filter(Boolean))].sort((left, right) => left.localeCompare(right, 'en'));
  const samples = Number(observedOmissionBearingSamples) || 0;
  const falseNegatives = Number(observedFalseNegatives) || 0;
  const certified = samples >= SAFE_SELECTIVE_MINIMUM_OMISSION_BEARING_SAMPLES
    && packages.length >= SAFE_SELECTIVE_MINIMUM_DISTINCT_PACKAGES
    && falseNegatives === 0;
  const status = falseNegatives > 0
    ? 'BLOCKED_SHADOW_FALSE_NEGATIVE'
    : certified ? 'CERTIFIED' : 'PENDING_REAL_SHADOW_EVIDENCE';
  const payload = {
    schemaVersion: 1,
    policyId: SAFE_SELECTIVE_POLICY_ID,
    status,
    minimumOmissionBearingSamples: SAFE_SELECTIVE_MINIMUM_OMISSION_BEARING_SAMPLES,
    minimumDistinctPackages: SAFE_SELECTIVE_MINIMUM_DISTINCT_PACKAGES,
    observedOmissionBearingSamples: samples,
    observedDistinctPackages: packages.length,
    distinctPackageIds: packages,
    observedFalseNegatives: falseNegatives,
  };
  return deepFreeze({
    ...payload,
    certificationSha256: sha256(canonicalJson(payload)),
  });
}

export const IMPLEMENTATION_SAFE_SELECTIVE_CERTIFICATION = safeSelectiveCertificationSnapshot();

function normalizedChangedPaths(values) {
  if (!Array.isArray(values)) return [];
  return [...new Set(values
    .map((value) => String(value ?? '').replaceAll('\\', '/').trim())
    .filter(Boolean))]
    .sort((left, right) => left.localeCompare(right, 'en'));
}

function packageTokens(value) {
  return [...new Set(
    String(value ?? '').toUpperCase().match(/\b[A-Z][A-Z0-9]*(?:-[A-Z0-9]+)*-PKG-\d{3}\b/gu) ?? [],
  )].sort((left, right) => left.localeCompare(right, 'en'));
}

function pathTouchesDocs(relativePath) {
  const value = String(relativePath ?? '').toLowerCase();
  return value.startsWith('docs/')
    || value.startsWith('scripts/docs/')
    || value === 'package.json'
    || value.startsWith('.github/');
}

function pathTouchesSupabase(relativePath) {
  const value = String(relativePath ?? '').toLowerCase();
  return value.startsWith('supabase/')
    || (value.startsWith('scripts/') && value.includes('supabase'))
    || value === 'package.json'
    || value.startsWith('.github/');
}

function isBroadValidationCommand(command) {
  const value = String(command ?? '').toLowerCase();
  return /(?:^|\s)npm(?:\.cmd)?\s+ci(?:\s|$)/u.test(value)
    || /(?:^|\s)npm(?:\.cmd)?\s+test(?:\s|$)/u.test(value)
    || /(?:^|\s)npm(?:\.cmd)?\s+run\s+(?:test(?::\S+)?|lint(?::\S+)?|typecheck(?::\S+)?|build(?::\S+)?)(?:\s|$)/u.test(value)
    || value.includes('quality:lint:ratchet')
    || /git\s+diff\s+--check/u.test(value);
}

function shadowSelectionDecision(command, changedPaths) {
  const value = String(command ?? '').trim();
  const lower = value.toLowerCase();
  if (!value) return { selected: true, reason: 'EMPTY_COMMAND_CONSERVATIVE' };
  if (changedPaths.length === 0) return { selected: true, reason: 'NO_CHANGED_PATHS_CONSERVATIVE_FULL' };
  if (isBroadValidationCommand(value)) return { selected: true, reason: 'BROAD_VALIDATOR_ALWAYS_SELECTED' };

  const commandPackages = packageTokens(value);
  if (commandPackages.length > 0) {
    const changedPackages = new Set(changedPaths.flatMap((entry) => packageTokens(entry)));
    if (commandPackages.some((entry) => changedPackages.has(entry))) {
      return { selected: true, reason: 'PACKAGE_ID_MATCH' };
    }
    return { selected: false, reason: 'PACKAGE_ID_NO_MATCH' };
  }

  const docsSpecific = lower.includes('docs:') || lower.includes('scripts/docs/');
  if (docsSpecific) {
    return changedPaths.some(pathTouchesDocs)
      ? { selected: true, reason: 'DOCS_DOMAIN_MATCH' }
      : { selected: false, reason: 'DOCS_DOMAIN_NO_MATCH' };
  }

  const supabaseSpecific = lower.includes('supabase');
  if (supabaseSpecific) {
    return changedPaths.some(pathTouchesSupabase)
      ? { selected: true, reason: 'SUPABASE_DOMAIN_MATCH' }
      : { selected: false, reason: 'SUPABASE_DOMAIN_NO_MATCH' };
  }

  return { selected: true, reason: 'UNKNOWN_COMMAND_CONSERVATIVE' };
}

export function buildShadowImpactPlan({
  changedPaths = [],
  validationCommands = [],
} = {}) {
  const paths = normalizedChangedPaths(changedPaths);
  const commands = normalizedValidationCommands(validationCommands);
  const entries = commands.map((command, index) => {
    const decision = shadowSelectionDecision(command, paths);
    return {
      index,
      command,
      selected: decision.selected,
      reason: decision.reason,
    };
  });
  const selectedCommands = entries.filter(({ selected }) => selected).map(({ command }) => command);
  const omittedCommands = entries.filter(({ selected }) => !selected).map(({ command }) => command);
  const payload = {
    schemaVersion: 1,
    engineId: IMPLEMENTATION_VALIDATION_ENGINE_ID,
    phase: 'F4_SHADOW_IMPACT_SELECTION',
    selectorId: SHADOW_IMPACT_SELECTOR_ID,
    executionMode: SHADOW_EXECUTION_MODE,
    selectiveExecution: false,
    fullValidationRequired: true,
    validationGatesSkipped: 0,
    changedPaths: paths,
    fullCommands: commands,
    selectedCommands,
    omittedCommands,
    entries,
    fullCommandCount: commands.length,
    selectedCommandCount: selectedCommands.length,
    omittedCommandCount: omittedCommands.length,
    potentialReductionPercent: commands.length === 0
      ? 0
      : Number(((omittedCommands.length / commands.length) * 100).toFixed(2)),
  };
  return deepFreeze({
    ...payload,
    planSha256: sha256(canonicalJson(payload)),
  });
}

function assertShadowImpactPlan(plan) {
  if (!plan || typeof plan !== 'object' || Array.isArray(plan)) {
    throw new Error('F4 shadow impact exige plan.');
  }
  if (
    plan.phase !== 'F4_SHADOW_IMPACT_SELECTION'
    || plan.selectorId !== SHADOW_IMPACT_SELECTOR_ID
    || plan.executionMode !== SHADOW_EXECUTION_MODE
    || plan.selectiveExecution !== false
    || plan.fullValidationRequired !== true
    || plan.validationGatesSkipped !== 0
  ) {
    throw new Error('F4 shadow impact rechaza plan con identidad o política inválida.');
  }
  const { planSha256, ...planPayload } = plan;
  if (!/^[a-f0-9]{64}$/u.test(String(planSha256 ?? ''))
    || sha256(canonicalJson(planPayload)) !== planSha256) {
    throw new Error('F4 shadow impact rechaza plan con integridad SHA-256 inválida.');
  }
  return true;
}

export function observeShadowImpact({ plan, results = [] } = {}) {
  assertShadowImpactPlan(plan);
  const planSha256 = plan.planSha256;

  const normalizedResults = Array.isArray(results) ? results.map((result) => ({
    command: String(result?.command ?? '').trim(),
    status: String(result?.status ?? '').trim().toUpperCase(),
  })) : [];
  if (normalizedResults.length !== plan.fullCommands.length) {
    throw new Error('F4 shadow impact exige resultado de la suite completa.');
  }
  for (let index = 0; index < plan.fullCommands.length; index += 1) {
    if (normalizedResults[index].command !== plan.fullCommands[index]) {
      throw new Error(`F4 shadow impact desalineado en command[${index}].`);
    }
    if (!['PASS', 'FAIL'].includes(normalizedResults[index].status)) {
      throw new Error(`F4 shadow impact status inválido en command[${index}].`);
    }
  }

  const selected = new Set(plan.selectedCommands);
  const failures = normalizedResults.filter(({ status }) => status !== 'PASS');
  const falseNegatives = failures.filter(({ command }) => !selected.has(command));
  const payload = {
    schemaVersion: 1,
    engineId: IMPLEMENTATION_VALIDATION_ENGINE_ID,
    phase: 'F4_SHADOW_IMPACT_SELECTION',
    selectorId: SHADOW_IMPACT_SELECTOR_ID,
    planSha256,
    executionMode: SHADOW_EXECUTION_MODE,
    selectiveExecution: false,
    fullSuiteExecuted: true,
    validationGatesSkipped: 0,
    fullSuiteStatus: failures.length === 0 ? 'PASS' : 'FAIL',
    fullCommandCount: plan.fullCommandCount,
    selectedCommandCount: plan.selectedCommandCount,
    omittedCommandCount: plan.omittedCommandCount,
    potentialReductionPercent: plan.potentialReductionPercent,
    observedFailureCount: failures.length,
    observedFalseNegativeCount: falseNegatives.length,
    observedFalseNegatives: falseNegatives.map(({ command }) => command),
    eligibleForSelectiveExecution: false,
  };
  return deepFreeze({
    ...payload,
    observationSha256: sha256(canonicalJson(payload)),
  });
}


function validateStoredShadowObservation(observation) {
  if (!observation || typeof observation !== 'object' || Array.isArray(observation)) return false;
  if (
    observation.schemaVersion !== 1
    || observation.engineId !== IMPLEMENTATION_VALIDATION_ENGINE_ID
    || observation.phase !== 'F4_SHADOW_IMPACT_SELECTION'
    || observation.selectorId !== SHADOW_IMPACT_SELECTOR_ID
    || observation.executionMode !== SHADOW_EXECUTION_MODE
    || observation.selectiveExecution !== false
    || observation.fullSuiteExecuted !== true
    || observation.validationGatesSkipped !== 0
  ) return false;
  const { observationSha256, ...payload } = observation;
  return /^[a-f0-9]{64}$/u.test(String(observationSha256 ?? ''))
    && sha256(canonicalJson(payload)) === observationSha256;
}

export function deriveSafeSelectiveCertification({ instances = [] } = {}) {
  const seen = new Set();
  const packageIds = new Set();
  let samples = 0;
  let falseNegatives = 0;

  for (const instance of Array.isArray(instances) ? instances : []) {
    if (String(instance?.status ?? '').trim().toUpperCase() !== 'VERIFIED') continue;
    const instanceId = String(instance?.instanceId ?? instance?.instance_id ?? '').trim().toUpperCase();
    const packageMatch = /::([A-Z][A-Z0-9]*(?:-[A-Z0-9]+)*-PKG-\d{3})$/u.exec(instanceId);
    if (!packageMatch) continue;
    const packageId = packageMatch[1];
    if (safeSelectiveSamplePackageId(instance, packageId) !== packageId) continue;
    for (const evidence of Array.isArray(instance?.evidence) ? instance.evidence : []) {
      const observation = evidence?.validation_engine_shadow_impact ?? null;
      if (!validateStoredShadowObservation(observation)) continue;
      if (Number(observation.omittedCommandCount) <= 0) continue;
      const observationFalseNegatives = (Number(observation.observedFalseNegativeCount) || 0)
        + (observation.fullSuiteStatus === 'PASS' ? 0 : 1);
      const key = instanceId;
      if (seen.has(key)) {
        falseNegatives += observationFalseNegatives;
        continue;
      }
      seen.add(key);
      samples += 1;
      packageIds.add(packageId);
      falseNegatives += observationFalseNegatives;
    }
  }

  return safeSelectiveCertificationSnapshot({
    observedOmissionBearingSamples: samples,
    distinctPackageIds: [...packageIds],
    observedFalseNegatives: falseNegatives,
  });
}

function packageLocalPathIdentity(relativePath) {
  const value = String(relativePath ?? '').replaceAll('\\', '/').trim();
  const patterns = [
    /^tests\/packages\/([A-Z][A-Z0-9]*(?:-[A-Z0-9]+)*-PKG-\d{3})(?:\/|$)/iu,
    /^supabase\/tests\/packages\/([A-Z][A-Z0-9]*(?:-[A-Z0-9]+)*-PKG-\d{3})\.sql$/iu,
    /^docs\/plan-canonico\/modular\/implementation-instances\/[^/]*__([A-Z][A-Z0-9]*(?:-[A-Z0-9]+)*-PKG-\d{3})\.json$/iu,
  ];
  for (const pattern of patterns) {
    const match = pattern.exec(value);
    if (match) return match[1].toUpperCase();
  }
  return null;
}

function safeSelectiveSamplePackageId(instance, expectedPackageId) {
  const changes = instance?.authorizedChanges ?? instance?.authorized_changes ?? [];
  if (!Array.isArray(changes) || changes.length === 0) return null;
  if (changes.some((entry) => !entry || typeof entry !== 'object' || Array.isArray(entry))) return null;
  const writable = changes.filter(
    (entry) => String(entry?.change ?? '').trim().toUpperCase() !== 'EXECUTE_ONLY',
  );
  if (writable.length === 0) return null;
  const identities = [];
  for (const entry of writable) {
    if (String(entry?.repo ?? '').trim() !== SAFE_SELECTIVE_REPOSITORY) return null;
    const packageId = packageLocalPathIdentity(entry?.path);
    if (!packageId) return null;
    identities.push(packageId);
  }
  const unique = [...new Set(identities)];
  if (unique.length !== 1 || unique[0] !== expectedPackageId) return null;
  return unique[0];
}

export function assessSafeSelectiveExecution({
  plan,
  certification = IMPLEMENTATION_SAFE_SELECTIVE_CERTIFICATION,
} = {}) {
  assertShadowImpactPlan(plan);

  let candidateEligible = false;
  let candidateReason = 'CLOSED_SCOPE_NOT_EVALUATED';
  let packageId = null;

  if (plan.changedPaths.length === 0) {
    candidateReason = 'NO_CHANGED_PATHS';
  } else if (plan.omittedCommandCount === 0) {
    candidateReason = 'NO_REDUCTION';
  } else {
    const identities = plan.changedPaths.map((entry) => ({
      path: entry,
      packageId: packageLocalPathIdentity(entry),
    }));
    const outsideClosedScope = identities.find(({ packageId: identity }) => !identity);
    if (outsideClosedScope) {
      candidateReason = `CROSS_CUTTING_PATH:${outsideClosedScope.path}`;
    } else {
      const packageIds = [...new Set(identities.map(({ packageId: identity }) => identity))];
      if (packageIds.length !== 1) {
        candidateReason = 'MULTI_PACKAGE_SCOPE';
      } else {
        [packageId] = packageIds;
        const unsafeOmission = plan.entries.find(
          (entry) => !entry.selected && entry.reason !== 'PACKAGE_ID_NO_MATCH',
        );
        const matchingPackageValidator = plan.entries.some(
          (entry) => entry.selected && entry.reason === 'PACKAGE_ID_MATCH',
        );
        if (unsafeOmission) {
          candidateReason = `UNSAFE_OMISSION:${unsafeOmission.reason}`;
        } else if (!matchingPackageValidator) {
          candidateReason = 'NO_MATCHING_PACKAGE_VALIDATOR';
        } else {
          candidateEligible = true;
          candidateReason = 'SAFE_PACKAGE_LOCAL_CLOSED_SCOPE';
        }
      }
    }
  }

  const certificationPayload = certification && typeof certification === 'object' && !Array.isArray(certification)
    ? Object.fromEntries(Object.entries(certification).filter(([key]) => key !== 'certificationSha256'))
    : null;
  const certificationIntegrityValid = certificationPayload
    && /^[a-f0-9]{64}$/u.test(String(certification?.certificationSha256 ?? ''))
    && sha256(canonicalJson(certificationPayload)) === certification.certificationSha256;
  const certificationValid = certificationIntegrityValid
    && certification.schemaVersion === 1
    && certification.policyId === SAFE_SELECTIVE_POLICY_ID
    && certification.status === 'CERTIFIED'
    && Number(certification.minimumOmissionBearingSamples) === SAFE_SELECTIVE_MINIMUM_OMISSION_BEARING_SAMPLES
    && Number(certification.minimumDistinctPackages) === SAFE_SELECTIVE_MINIMUM_DISTINCT_PACKAGES
    && Number(certification.observedOmissionBearingSamples) >= SAFE_SELECTIVE_MINIMUM_OMISSION_BEARING_SAMPLES
    && Number(certification.observedDistinctPackages) >= SAFE_SELECTIVE_MINIMUM_DISTINCT_PACKAGES
    && Array.isArray(certification.distinctPackageIds)
    && certification.distinctPackageIds.length === Number(certification.observedDistinctPackages)
    && Number(certification.observedFalseNegatives) === 0;

  const selectiveExecution = candidateEligible && certificationValid;
  let reason;
  if (selectiveExecution) reason = 'SAFE_PACKAGE_LOCAL_CLOSED_SCOPE_CERTIFIED';
  else if (candidateEligible && certification?.status === 'BLOCKED_SHADOW_FALSE_NEGATIVE') {
    reason = 'FULL_FALLBACK_SHADOW_FALSE_NEGATIVE';
  } else if (candidateEligible) reason = 'FULL_FALLBACK_SHADOW_CERTIFICATION_PENDING';
  else reason = `FULL_FALLBACK_${candidateReason}`;

  const executedCommands = selectiveExecution ? plan.selectedCommands : plan.fullCommands;
  const notApplicableCommands = selectiveExecution ? plan.omittedCommands : [];
  const payload = {
    schemaVersion: 1,
    engineId: IMPLEMENTATION_VALIDATION_ENGINE_ID,
    phase: 'F5_SAFE_SELECTIVE_VALIDATION',
    policyId: SAFE_SELECTIVE_POLICY_ID,
    executionMode: SAFE_SELECTIVE_EXECUTION_MODE,
    planSha256: plan.planSha256,
    candidateEligible,
    candidateReason,
    selectiveExecution,
    fullFallback: !selectiveExecution,
    fullFallbackAvailable: true,
    validationGatesSkipped: 0,
    reason,
    packageId,
    certificationStatus: String(certification?.status ?? 'INVALID'),
    certificationSha256: String(certification?.certificationSha256 ?? ''),
    certificationMinimumOmissionBearingSamples: Number(certification?.minimumOmissionBearingSamples ?? 0),
    certificationMinimumDistinctPackages: Number(certification?.minimumDistinctPackages ?? 0),
    certificationObservedOmissionBearingSamples: Number(certification?.observedOmissionBearingSamples ?? 0),
    certificationObservedDistinctPackages: Number(certification?.observedDistinctPackages ?? 0),
    certificationObservedFalseNegatives: Number(certification?.observedFalseNegatives ?? 0),
    fullCommandCount: plan.fullCommandCount,
    executedCommandCount: executedCommands.length,
    notApplicableCommandCount: notApplicableCommands.length,
    potentialNotApplicableCommandCount: candidateEligible ? plan.omittedCommandCount : 0,
    executedCommands,
    notApplicableCommands,
  };
  return deepFreeze({
    ...payload,
    decisionSha256: sha256(canonicalJson(payload)),
  });
}

function assertSafeSelectiveDecision(plan, decision, certification) {
  if (!decision || typeof decision !== 'object' || Array.isArray(decision)) {
    throw new Error('F5 safe selective exige decision.');
  }
  const expected = assessSafeSelectiveExecution({ plan, certification });
  if (canonicalJson(decision) !== canonicalJson(expected)) {
    throw new Error('F5 safe selective rechaza decision distinta de la politica determinista vigente.');
  }
  return expected;
}

export function createSafeSelectiveValidationRecord({
  plan,
  decision,
  results = [],
  candidateCommit,
  certification = IMPLEMENTATION_SAFE_SELECTIVE_CERTIFICATION,
} = {}) {
  const expectedDecision = assertSafeSelectiveDecision(plan, decision, certification);
  const commit = String(candidateCommit ?? '').trim().toLowerCase();
  if (!/^[a-f0-9]{40}$/u.test(commit)) {
    throw new Error('F5 safe selective exige candidateCommit valido.');
  }
  const normalizedResults = Array.isArray(results) ? results.map((result) => ({
    command: String(result?.command ?? '').trim(),
    status: String(result?.status ?? '').trim().toUpperCase(),
  })) : [];
  if (normalizedResults.length !== expectedDecision.executedCommands.length) {
    throw new Error('F5 safe selective results no coincide con comandos ejecutados.');
  }
  for (let index = 0; index < expectedDecision.executedCommands.length; index += 1) {
    if (normalizedResults[index].command !== expectedDecision.executedCommands[index]
      || normalizedResults[index].status !== 'PASS') {
      throw new Error(`F5 safe selective resultado invalido en command[${index}].`);
    }
  }

  const payload = {
    schemaVersion: 1,
    engineId: IMPLEMENTATION_VALIDATION_ENGINE_ID,
    phase: 'F5_SAFE_SELECTIVE_VALIDATION',
    policyId: SAFE_SELECTIVE_POLICY_ID,
    candidateCommit: commit,
    planSha256: plan.planSha256,
    decisionSha256: expectedDecision.decisionSha256,
    changedPaths: [...plan.changedPaths],
    validationCommands: [...plan.fullCommands],
    executionMode: expectedDecision.selectiveExecution ? 'SAFE_SELECTIVE' : 'FULL_FALLBACK',
    selectiveExecution: expectedDecision.selectiveExecution,
    fullFallbackUsed: expectedDecision.fullFallback,
    fullFallbackAvailable: true,
    validationGatesSkipped: 0,
    reason: expectedDecision.reason,
    packageId: expectedDecision.packageId,
    candidateEligible: expectedDecision.candidateEligible,
    candidateReason: expectedDecision.candidateReason,
    potentialNotApplicableCommandCount: expectedDecision.potentialNotApplicableCommandCount,
    certificationStatus: expectedDecision.certificationStatus,
    certificationSha256: expectedDecision.certificationSha256,
    certificationMinimumOmissionBearingSamples: expectedDecision.certificationMinimumOmissionBearingSamples,
    certificationMinimumDistinctPackages: expectedDecision.certificationMinimumDistinctPackages,
    certificationObservedOmissionBearingSamples: expectedDecision.certificationObservedOmissionBearingSamples,
    certificationObservedDistinctPackages: expectedDecision.certificationObservedDistinctPackages,
    certificationObservedFalseNegatives: expectedDecision.certificationObservedFalseNegatives,
    executedCommands: [...expectedDecision.executedCommands],
    notApplicableCommands: [...expectedDecision.notApplicableCommands],
    results: normalizedResults,
    status: 'PASS',
  };
  return deepFreeze({
    ...payload,
    recordSha256: sha256(canonicalJson(payload)),
  });
}

export function validateSafeSelectiveValidationRecord({
  record,
  candidateCommit,
  validationCommands = [],
  certification = IMPLEMENTATION_SAFE_SELECTIVE_CERTIFICATION,
} = {}) {
  if (!record || typeof record !== 'object' || Array.isArray(record)) {
    throw new Error('F5 safe selective record obligatorio.');
  }
  const commit = String(candidateCommit ?? '').trim().toLowerCase();
  if (!/^[a-f0-9]{40}$/u.test(commit) || record.candidateCommit !== commit) {
    throw new Error('F5 safe selective record no corresponde al candidato actual.');
  }
  if (
    record.schemaVersion !== 1
    || record.engineId !== IMPLEMENTATION_VALIDATION_ENGINE_ID
    || record.phase !== 'F5_SAFE_SELECTIVE_VALIDATION'
    || record.policyId !== SAFE_SELECTIVE_POLICY_ID
    || record.status !== 'PASS'
    || record.validationGatesSkipped !== 0
    || record.fullFallbackAvailable !== true
  ) {
    throw new Error('F5 safe selective record conserva identidad o politica invalida.');
  }
  const { recordSha256, ...payload } = record;
  if (!/^[a-f0-9]{64}$/u.test(String(recordSha256 ?? ''))
    || sha256(canonicalJson(payload)) !== recordSha256) {
    throw new Error('F5 safe selective record conserva integridad SHA-256 invalida.');
  }

  const commands = normalizedValidationCommands(validationCommands);
  if (canonicalJson(record.validationCommands ?? []) !== canonicalJson(commands)) {
    throw new Error('F5 safe selective validationCommands no coincide con la instancia.');
  }
  const plan = buildShadowImpactPlan({
    changedPaths: record.changedPaths ?? [],
    validationCommands: commands,
  });
  const decision = assessSafeSelectiveExecution({ plan, certification });
  if (record.planSha256 !== plan.planSha256 || record.decisionSha256 !== decision.decisionSha256) {
    throw new Error('F5 safe selective record no coincide con el plan determinista actual.');
  }
  const expectedMode = decision.selectiveExecution ? 'SAFE_SELECTIVE' : 'FULL_FALLBACK';
  if (
    record.executionMode !== expectedMode
    || record.selectiveExecution !== decision.selectiveExecution
    || record.fullFallbackUsed !== decision.fullFallback
    || record.reason !== decision.reason
    || record.packageId !== decision.packageId
    || record.candidateEligible !== decision.candidateEligible
    || record.candidateReason !== decision.candidateReason
    || record.potentialNotApplicableCommandCount !== decision.potentialNotApplicableCommandCount
    || record.certificationStatus !== decision.certificationStatus
    || record.certificationSha256 !== decision.certificationSha256
    || record.certificationMinimumOmissionBearingSamples !== decision.certificationMinimumOmissionBearingSamples
    || record.certificationMinimumDistinctPackages !== decision.certificationMinimumDistinctPackages
    || record.certificationObservedOmissionBearingSamples !== decision.certificationObservedOmissionBearingSamples
    || record.certificationObservedDistinctPackages !== decision.certificationObservedDistinctPackages
    || record.certificationObservedFalseNegatives !== decision.certificationObservedFalseNegatives
    || canonicalJson(record.executedCommands ?? []) !== canonicalJson(decision.executedCommands)
    || canonicalJson(record.notApplicableCommands ?? []) !== canonicalJson(decision.notApplicableCommands)
  ) {
    throw new Error('F5 safe selective record no conserva la decision determinista vigente.');
  }
  const normalizedResults = Array.isArray(record.results) ? record.results.map((result) => ({
    command: String(result?.command ?? '').trim(),
    status: String(result?.status ?? '').trim().toUpperCase(),
  })) : [];
  if (normalizedResults.length !== decision.executedCommands.length) {
    throw new Error('F5 safe selective record no conserva resultados ejecutados completos.');
  }
  for (let index = 0; index < decision.executedCommands.length; index += 1) {
    if (normalizedResults[index].command !== decision.executedCommands[index]
      || normalizedResults[index].status !== 'PASS') {
      throw new Error(`F5 safe selective record resultado invalido en command[${index}].`);
    }
  }
  return deepFreeze({
    status: 'PASS',
    selectiveExecution: decision.selectiveExecution,
    fullFallbackUsed: decision.fullFallback,
    reason: decision.reason,
    packageId: decision.packageId,
    executedCommands: [...decision.executedCommands],
    notApplicableCommands: [...decision.notApplicableCommands],
  });
}

function normalizedValidationCommands(values) {
  if (!Array.isArray(values)) return [];
  return values.map((value) => String(value ?? '').trim());
}

function normalizedToolchain(toolchain = {}) {
  return {
    nodeVersion: String(toolchain.nodeVersion ?? process.version),
    platform: String(toolchain.platform ?? process.platform),
    arch: String(toolchain.arch ?? process.arch),
  };
}

export function fingerprintCandidateRepositoryState({
  candidateCommit,
  gitStatus = '',
  trackedDiff = '',
  untrackedFiles = [],
} = {}) {
  const commit = String(candidateCommit ?? '').trim().toLowerCase();
  if (!/^[a-f0-9]{40}$/u.test(commit)) {
    throw new Error(`candidateCommit inválido para fingerprint: ${candidateCommit ?? 'EMPTY'}.`);
  }
  const normalizedUntracked = (Array.isArray(untrackedFiles) ? untrackedFiles : [])
    .map((entry) => ({
      path: String(entry?.path ?? '').replaceAll('\\', '/').trim(),
      objectSha: String(entry?.objectSha ?? '').trim().toLowerCase(),
    }))
    .filter((entry) => entry.path)
    .sort((left, right) => left.path.localeCompare(right.path, 'en'));

  return sha256(canonicalJson({
    candidateCommit: commit,
    gitStatus: String(gitStatus ?? ''),
    trackedDiff: String(trackedDiff ?? ''),
    untrackedFiles: normalizedUntracked,
  }));
}

function candidateReceiptIdentity({
  instanceId,
  candidateCommit,
  repositoryStateSha256,
  validationCommands,
  toolchain,
} = {}) {
  const normalizedInstanceId = String(instanceId ?? '').trim();
  const normalizedCommit = String(candidateCommit ?? '').trim().toLowerCase();
  const normalizedState = String(repositoryStateSha256 ?? '').trim().toLowerCase();
  if (!normalizedInstanceId) throw new Error('instanceId es obligatorio para candidate receipt.');
  if (!/^[a-f0-9]{40}$/u.test(normalizedCommit)) throw new Error('candidateCommit inválido para candidate receipt.');
  if (!/^[a-f0-9]{64}$/u.test(normalizedState)) throw new Error('repositoryStateSha256 inválido para candidate receipt.');
  const commands = normalizedValidationCommands(validationCommands);
  const normalizedRuntime = normalizedToolchain(toolchain);
  return {
    instanceId: normalizedInstanceId,
    candidateCommit: normalizedCommit,
    repositoryStateSha256: normalizedState,
    validationCommandsSha256: sha256(canonicalJson(commands)),
    toolchainSha256: sha256(canonicalJson(normalizedRuntime)),
    toolchain: normalizedRuntime,
  };
}

export function createCandidateValidationReceipt({
  instanceId,
  candidateCommit,
  repositoryStateSha256,
  validationCommands = [],
  toolchain = {},
  validatedAt = new Date().toISOString(),
} = {}) {
  const identity = candidateReceiptIdentity({
    instanceId,
    candidateCommit,
    repositoryStateSha256,
    validationCommands,
    toolchain,
  });
  if (!String(validatedAt ?? '').trim() || !Number.isFinite(Date.parse(validatedAt))) {
    throw new Error('validatedAt debe ser una fecha ISO concreta para candidate receipt.');
  }
  const payload = {
    schemaVersion: 1,
    engineId: IMPLEMENTATION_VALIDATION_ENGINE_ID,
    phase: 'F3_DEDUPLICATION_CANDIDATE_RECEIPTS',
    validatorId: PREVERIFY_VALIDATOR_ID,
    reusePolicy: IMPLEMENTATION_VALIDATION_REUSE_POLICY.PREVERIFY,
    status: 'PASS',
    ...identity,
    validatedAt,
  };
  return deepFreeze({
    ...payload,
    receiptSha256: sha256(canonicalJson(payload)),
  });
}

export function validateCandidateValidationReceipt({
  receipt,
  instanceId,
  candidateCommit,
  repositoryStateSha256,
  validationCommands = [],
  toolchain = {},
} = {}) {
  if (!receipt || typeof receipt !== 'object' || Array.isArray(receipt)) {
    return deepFreeze({ status: 'MISS', reusable: false, reason: 'RECEIPT_MISSING' });
  }
  let expected;
  try {
    expected = candidateReceiptIdentity({
      instanceId,
      candidateCommit,
      repositoryStateSha256,
      validationCommands,
      toolchain,
    });
  } catch (error) {
    return deepFreeze({
      status: 'MISS',
      reusable: false,
      reason: `CURRENT_CONTEXT_INVALID:${error instanceof Error ? error.message : String(error)}`,
    });
  }

  const requiredIdentity = {
    schemaVersion: 1,
    engineId: IMPLEMENTATION_VALIDATION_ENGINE_ID,
    phase: 'F3_DEDUPLICATION_CANDIDATE_RECEIPTS',
    validatorId: PREVERIFY_VALIDATOR_ID,
    reusePolicy: IMPLEMENTATION_VALIDATION_REUSE_POLICY.PREVERIFY,
    status: 'PASS',
  };
  for (const [key, value] of Object.entries(requiredIdentity)) {
    if (receipt[key] !== value) {
      return deepFreeze({ status: 'MISS', reusable: false, reason: `IDENTITY_MISMATCH:${key}` });
    }
  }
  for (const key of [
    'instanceId',
    'candidateCommit',
    'repositoryStateSha256',
    'validationCommandsSha256',
    'toolchainSha256',
  ]) {
    if (receipt[key] !== expected[key]) {
      return deepFreeze({ status: 'MISS', reusable: false, reason: `FINGERPRINT_MISMATCH:${key}` });
    }
  }
  if (canonicalJson(receipt.toolchain ?? null) !== canonicalJson(expected.toolchain)) {
    return deepFreeze({ status: 'MISS', reusable: false, reason: 'FINGERPRINT_MISMATCH:toolchain' });
  }
  if (!String(receipt.validatedAt ?? '').trim() || !Number.isFinite(Date.parse(receipt.validatedAt))) {
    return deepFreeze({ status: 'MISS', reusable: false, reason: 'INVALID_VALIDATED_AT' });
  }
  const { receiptSha256, ...payload } = receipt;
  if (!/^[a-f0-9]{64}$/u.test(String(receiptSha256 ?? ''))
    || sha256(canonicalJson(payload)) !== receiptSha256) {
    return deepFreeze({ status: 'MISS', reusable: false, reason: 'RECEIPT_INTEGRITY_MISMATCH' });
  }
  return deepFreeze({
    status: 'PASS',
    reusable: true,
    reason: 'EXACT_CANDIDATE_FINGERPRINT_MATCH',
  });
}

export function createImplementationValidationContext({ registry } = {}) {
  if (!registry || typeof registry !== 'object' || Array.isArray(registry)) {
    throw new Error('implementation validation context exige registry.');
  }
  if (
    !registry.package_execution
    || typeof registry.package_execution !== 'object'
    || Array.isArray(registry.package_execution)
  ) {
    throw new Error('implementation validation context exige registry.package_execution.');
  }

  const packageExecution = immutableClone(registry.package_execution);
  const implementationReadyQueue = immutableClone(
    Array.isArray(registry.implementation_ready_queue)
      ? registry.implementation_ready_queue
      : [],
  );
  const registryProjection = deepFreeze({
    package_execution: packageExecution,
    implementation_ready_queue: implementationReadyQueue,
  });
  const fingerprintSha256 = sha256(canonicalJson(registryProjection));

  return deepFreeze({
    schemaVersion: 1,
    engineId: IMPLEMENTATION_VALIDATION_ENGINE_ID,
    phases: [...IMPLEMENTATION_VALIDATION_PHASES],
    immutable: true,
    fingerprintSha256,
    packageExecution,
    registryProjection,
  });
}

export async function deriveImplementationValidationInputs({
  root = process.cwd(),
  dependencies = {},
} = {}) {
  const scanReadiness = dependencies.scanPackageReadiness ?? scanPackageReadiness;
  const deriveControl = dependencies.deriveImplementationControl ?? deriveImplementationControl;
  const now = dependencies.now ?? (() => performance.now());

  const startedAt = now();

  const readinessStartedAt = now();
  const readiness = await scanReadiness({
    root,
    check: true,
    trigger: 'implementation-status',
  });
  const readinessFinishedAt = now();

  const context = createImplementationValidationContext({
    registry: readiness?.registry,
  });

  const controlStartedAt = now();
  const baseControl = await deriveControl({
    root,
    packageExecution: context.packageExecution,
  });
  const controlFinishedAt = now();

  const safeSelectiveCertification = deriveSafeSelectiveCertification({
    instances: baseControl?.physical?.instances ?? [],
  });

  const finishedAt = now();
  const observability = deepFreeze({
    packageReadinessScans: 1,
    implementationControlDerivations: 1,
    packageExecutionConsumers: 2,
    packageExecutionReuses: 1,
    duplicateReadinessScansAvoided: 1,
    validationGatesSkipped: 0,
    packageReadinessMs: durationMs(readinessStartedAt, readinessFinishedAt),
    implementationControlMs: durationMs(controlStartedAt, controlFinishedAt),
    totalMs: durationMs(startedAt, finishedAt),
  });

  const validationEngine = deepFreeze({
    schemaVersion: 1,
    engineId: IMPLEMENTATION_VALIDATION_ENGINE_ID,
    phases: [...IMPLEMENTATION_VALIDATION_PHASES],
    phaseStatus: {
      F1_OBSERVABILITY: 'ACTIVE',
      F2_SHARED_IMMUTABLE_CONTEXT: 'ACTIVE',
      F3_DEDUPLICATION_CANDIDATE_RECEIPTS: 'ACTIVE',
      F4_SHADOW_IMPACT_SELECTION: 'ACTIVE',
      F5_SAFE_SELECTIVE_VALIDATION: safeSelectiveCertification.status === 'CERTIFIED'
        ? 'ACTIVE_CERTIFIED'
        : 'ACTIVE_GUARDED',
    },
    policy: {
      semantics: 'PRESERVED',
      validationGatesSkipped: 0,
      fullFallback: true,
      failClosed: true,
      candidateReceiptReuse: IMPLEMENTATION_VALIDATION_REUSE_POLICY.PREVERIFY,
      remoteReuse: IMPLEMENTATION_VALIDATION_REUSE_POLICY.REMOTE,
      authorizationReuse: IMPLEMENTATION_VALIDATION_REUSE_POLICY.AUTHORIZATION,
      prMergeReuse: IMPLEMENTATION_VALIDATION_REUSE_POLICY.PR_MERGE,
      shadowImpactMode: 'ACTIVE_GUARD',
      selectiveExecution: safeSelectiveCertification.status === 'CERTIFIED'
        ? 'CERTIFIED_PACKAGE_LOCAL_CLOSED_SCOPE_ONLY'
        : 'GUARDED_PENDING_REAL_SHADOW_CERTIFICATION',
      safeSelectivePolicy: SAFE_SELECTIVE_POLICY_ID,
      safeSelectiveCertification: safeSelectiveCertification.status,
      safeSelectiveMinimumOmissionBearingSamples: safeSelectiveCertification.minimumOmissionBearingSamples,
      safeSelectiveMinimumDistinctPackages: safeSelectiveCertification.minimumDistinctPackages,
      fullValidationRequired: safeSelectiveCertification.status !== 'CERTIFIED',
      fullValidationFallback: true,
    },
    context: {
      immutable: context.immutable,
      fingerprintSha256: context.fingerprintSha256,
      packageExecutionSource: 'PACKAGE_READINESS_SHARED_CONTEXT',
    },
    observability,
    safeSelectiveCertification,
  });

  return {
    baseControl,
    registry: context.registryProjection,
    validationEngine,
  };
}
