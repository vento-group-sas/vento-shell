import crypto from 'node:crypto';
import { performance } from 'node:perf_hooks';

import { deriveImplementationControl } from './implementation-control.mjs';
import { scanPackageReadiness } from './package-readiness-scanner.mjs';

export const IMPLEMENTATION_VALIDATION_ENGINE_ID = 'VENTO-IMPLEMENTATION-VALIDATION-ENGINE-V1';
export const IMPLEMENTATION_VALIDATION_PHASES = Object.freeze([
  'F1_OBSERVABILITY',
  'F2_SHARED_IMMUTABLE_CONTEXT',
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
    },
    policy: {
      semantics: 'PRESERVED',
      validationGatesSkipped: 0,
      fullFallback: true,
      failClosed: true,
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
