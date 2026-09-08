import crypto from 'node:crypto';
import { performance } from 'node:perf_hooks';

import { deriveImplementationControl } from './implementation-control.mjs';
import { scanPackageReadiness } from './package-readiness-scanner.mjs';

export const IMPLEMENTATION_VALIDATION_ENGINE_ID = 'VENTO-IMPLEMENTATION-VALIDATION-ENGINE-V1';
export const IMPLEMENTATION_VALIDATION_PHASES = Object.freeze([
  'F1_OBSERVABILITY',
  'F2_SHARED_IMMUTABLE_CONTEXT',
  'F3_DEDUPLICATION_CANDIDATE_RECEIPTS',
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
