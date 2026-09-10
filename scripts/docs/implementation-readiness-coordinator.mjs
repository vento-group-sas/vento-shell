import { fileURLToPath } from 'node:url';
import path from 'node:path';

import { deriveImplementationValidationInputs } from './implementation-validation-engine.mjs';

function queueCandidate(registry) {
  const execution = registry?.package_execution ?? null;
  const authorization = execution?.authorization_frontier?.[0] ?? null;
  const current = execution?.current ?? null;
  const candidateEntry = authorization
    ?? (current?.next_action?.type === 'AUTHORIZE_PHYSICAL_IMPLEMENTATION' ? current : null);

  if (!candidateEntry) return null;

  const first = registry?.implementation_ready_queue?.find(
    ({ package_id: packageId }) => packageId === candidateEntry.package_id,
  ) ?? null;
  if (!first) return null;

  return {
    packageId: first.package_id,
    capabilityId: first.capability_id,
    ownerApplication: first.owner_application,
    gateId: first.gate_id,
    instanceId: first.next_execution,
    status: 'READY_FOR_AUTHORIZATION',
    source: 'PACKAGE_EXECUTION_GOVERNED_FRONTIER',
    authorizationRequired: true,
  };
}

function frontierPackageAction(registry) {
  const execution = registry?.package_execution ?? null;
  const current = execution?.current ?? null;
  if (!current) return null;

  const action = current.next_action;
  const work = execution.current_work ?? current.current_work ?? {
    kind: 'PACKAGE',
    id: current.package_id,
    consumer_package_id: current.package_id,
  };
  const foundation = work.kind === 'FOUNDATION_GATE';

  return {
    type: action.type,
    target: action.target,
    title: foundation
      ? `${work.id} es el prerrequisito local de ${current.package_id}`
      : `${current.package_id} es el primary frontier member ${current.position}/${execution.sequence.length}`,
    instruction: foundation
      ? `${action.reason} El package afectado permanece WAITING; no autorizarlo hasta cerrar el gate.`
      : `${action.reason} Ejecutar: ${action.command}`,
    why: foundation
      ? `${current.package_id} conserva trazabilidad como consumidor bloqueado sin monopolizar roots independientes.`
      : 'La prioridad de frontier es determinista por dependencias, capa y package_id; no existe selección humana.',
    command: action.command,
    packageId: current.package_id,
    currentWork: work,
    source: 'PACKAGE_EXECUTION_GOVERNED_FRONTIER',
  };
}

function packageLifecycleIdentity(instanceId) {
  const match = /^SHELL-CI-02[0-4]::(GAP-PKG-\d{3})$/u.exec(String(instanceId ?? '').trim());
  return match ? { packageId: match[1], instanceId: String(instanceId).trim() } : null;
}

export function coordinateImplementationStatus({ baseControl, registry }) {
  if (!baseControl || typeof baseControl !== 'object') {
    throw new Error('baseControl es obligatorio.');
  }

  const candidate = queueCandidate(registry);
  const current = registry?.package_execution?.current ?? null;
  const frontierAction = frontierPackageAction(registry);
  const baseActive = baseControl.physical?.active ?? null;
  const baseIdentity = packageLifecycleIdentity(baseActive?.instanceId);

  // A non-package global physical instance has no package resource profile.
  // Preserve its existing fail-closed priority instead of assuming independence.
  if (baseActive && !baseIdentity) {
    return {
      ...baseControl,
      readinessCandidate: candidate,
      readinessCurrent: current,
      coordinatedPrimaryAction: baseControl.primaryAction,
      coordinationSource: 'IMPLEMENTATION_CONTROL_ACTIVE_INSTANCE',
    };
  }

  // If implementation-control is projecting the exact same package instance,
  // preserve the more precise authorization/execution action from that ledger.
  if (
    baseActive
    && frontierAction
    && frontierAction.target === baseActive.instanceId
  ) {
    return {
      ...baseControl,
      readinessCandidate: candidate,
      readinessCurrent: current,
      coordinatedPrimaryAction: baseControl.primaryAction,
      coordinationSource: 'IMPLEMENTATION_CONTROL_ACTIVE_INSTANCE',
    };
  }

  // A package already in CI020..CI024 is tracked in ACTIVE_PHYSICAL. It does not
  // suppress a different deterministic primary from the governed frontier.
  if (frontierAction) {
    return {
      ...baseControl,
      readinessCandidate: candidate,
      readinessCurrent: current,
      coordinatedPrimaryAction: frontierAction,
      coordinationSource: baseActive
        ? 'PACKAGE_EXECUTION_GOVERNED_FRONTIER_WITH_ACTIVE_SET'
        : 'PACKAGE_EXECUTION_GOVERNED_FRONTIER',
    };
  }

  if (baseActive) {
    return {
      ...baseControl,
      readinessCandidate: candidate,
      readinessCurrent: current,
      coordinatedPrimaryAction: baseControl.primaryAction,
      coordinationSource: 'IMPLEMENTATION_CONTROL_ACTIVE_INSTANCE',
    };
  }

  return {
    ...baseControl,
    readinessCandidate: null,
    readinessCurrent: null,
    coordinatedPrimaryAction: baseControl.primaryAction,
    coordinationSource: 'PACKAGE_EXECUTION_COMPLETE',
  };
}

export async function deriveCoordinatedImplementationStatus({
  root = process.cwd(),
  validationDependencies = {},
} = {}) {
  const inputs = await deriveImplementationValidationInputs({
    root,
    dependencies: validationDependencies,
  });
  const coordinated = coordinateImplementationStatus({
    baseControl: inputs.baseControl,
    registry: inputs.registry,
  });
  return {
    ...coordinated,
    validationEngine: inputs.validationEngine,
  };
}

function printStatus(status) {
  const action = status.coordinatedPrimaryAction;
  console.log(`COORDINATION_SOURCE: ${status.coordinationSource}`);
  console.log(`ACTION: ${action.type}`);
  console.log(`TARGET: ${action.target}`);
  if (action.command) console.log(`COMMAND: ${action.command}`);

  if (status.readinessCurrent) {
    console.log(`PRIMARY_PACKAGE: ${status.readinessCurrent.package_id}`);
    console.log(`PRIMARY_POSITION: ${status.readinessCurrent.position}`);
    console.log(
      `CURRENT_EXECUTABLE_WORK: ${status.readinessCurrent.current_work?.id ?? 'NONE'}`,
    );
    console.log(
      `CURRENT_EXECUTABLE_WORK_KIND: ${status.readinessCurrent.current_work?.kind ?? 'NONE'}`,
    );
  }

  if (status.readinessCandidate) {
    console.log(`PACKAGE_ID: ${status.readinessCandidate.packageId}`);
    console.log(`PACKAGE_GATE: ${status.readinessCandidate.gateId}`);
    console.log(`PACKAGE_STATUS: ${status.readinessCandidate.status}`);
    console.log('PHYSICAL_AUTHORIZATION_REQUIRED: SI');
  }

  if (status.validationEngine) {
    const engine = status.validationEngine;
    console.log(`VALIDATION_ENGINE: ${engine.engineId}`);
    console.log(`VALIDATION_ENGINE_PHASES: ${engine.phases.join(',')}`);
    console.log(`VALIDATION_CONTEXT_IMMUTABLE: ${engine.context.immutable ? 'SI' : 'NO'}`);
    console.log(`VALIDATION_CONTEXT_SHA256: ${engine.context.fingerprintSha256}`);
    console.log(`PACKAGE_READINESS_SCANS: ${engine.observability.packageReadinessScans}`);
    console.log(`PACKAGE_EXECUTION_REUSES: ${engine.observability.packageExecutionReuses}`);
    console.log(
      `DUPLICATE_READINESS_SCANS_AVOIDED: ${engine.observability.duplicateReadinessScansAvoided}`,
    );
    console.log(`VALIDATION_GATES_SKIPPED: ${engine.observability.validationGatesSkipped}`);
    console.log(`VALIDATION_TOTAL_MS: ${engine.observability.totalMs}`);
  }
}

async function main() {
  const unknown = process.argv.slice(2);
  if (unknown.length > 0) {
    throw new Error(`argumentos desconocidos: ${unknown.join(', ')}.`);
  }
  const status = await deriveCoordinatedImplementationStatus();
  printStatus(status);
}

const isCli = process.argv[1]
  && path.resolve(process.argv[1]) === path.resolve(fileURLToPath(import.meta.url));

if (isCli) {
  main().catch((error) => {
    console.error(`ERROR: ${error instanceof Error ? error.message : String(error)}`);
    process.exitCode = 1;
  });
}
