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

export function observeShadowImpact({ plan, results = [] } = {}) {
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
      shadowImpactMode: 'OBSERVE_ONLY',
      selectiveExecution: false,
      fullValidationRequired: true,
    },
    context: {
      immutable: context.immutable,
      fingerprintSha256: context.fingerprintSha256,
      packageExecutionSource: 'PACKAGE_READINESS_SHARED_CONTEXT',
    },
    observability,
  });

  return {
    baseControl,
    registry: context.registryProjection,
    validationEngine,
  };
}
