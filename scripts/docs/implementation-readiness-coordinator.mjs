import { fileURLToPath } from 'node:url';
import path from 'node:path';

import { deriveImplementationValidationInputs } from './implementation-validation-engine.mjs';

function queueCandidate(registry) {
  const current = registry?.package_execution?.current ?? null;
  if (current?.next_action.type !== 'AUTHORIZE_PHYSICAL_IMPLEMENTATION') return null;
  const first = registry?.implementation_ready_queue?.find(
    ({ package_id: packageId }) => packageId === current.package_id,
  ) ?? null;
  if (!first) return null;
  return {
    packageId: first.package_id,
    capabilityId: first.capability_id,
    ownerApplication: first.owner_application,
    gateId: first.gate_id,
    instanceId: first.next_execution,
    status: 'READY_FOR_AUTHORIZATION',
    source: 'PACKAGE_EXECUTION_LINEAR',
    authorizationRequired: true,
  };
}

function linearPackageAction(registry) {
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
      ? `${work.id} es el trabajo requerido antes de ${current.package_id}`
      : `${current.package_id} ocupa el turno ${current.position}/${execution.sequence.length}`,
    instruction: foundation
      ? `${action.reason} No autorizar ni continuar ${current.package_id} hasta cerrar este gate.`
      : `${action.reason} Ejecutar: ${action.command}`,
    why: foundation
      ? `${current.package_id} conserva el turno topológico como consumidor bloqueado; la fundación tiene precedencia física.`
      : 'La secuencia es determinista; un package bloqueado conserva el turno y no puede ser adelantado.',
    command: action.command,
    packageId: current.package_id,
    currentWork: work,
    source: 'PACKAGE_EXECUTION_LINEAR',
  };
}

export function coordinateImplementationStatus({ baseControl, registry }) {
  if (!baseControl || typeof baseControl !== 'object') {
    throw new Error('baseControl es obligatorio.');
  }
  const candidate = queueCandidate(registry);
  const current = registry?.package_execution?.current ?? null;
  const linearAction = linearPackageAction(registry);
  const baseActive = baseControl.physical?.active ?? null;

  if (baseActive) {
    return {
      ...baseControl,
      readinessCandidate: candidate,
      readinessCurrent: current,
      coordinatedPrimaryAction: baseControl.primaryAction,
      coordinationSource: 'IMPLEMENTATION_CONTROL_ACTIVE_INSTANCE',
    };
  }

  if (!linearAction) {
    return {
      ...baseControl,
      readinessCandidate: null,
      readinessCurrent: null,
      coordinatedPrimaryAction: baseControl.primaryAction,
      coordinationSource: 'PACKAGE_EXECUTION_COMPLETE',
    };
  }

  return {
    ...baseControl,
    readinessCandidate: candidate,
    readinessCurrent: current,
    coordinatedPrimaryAction: linearAction,
    coordinationSource: 'PACKAGE_EXECUTION_LINEAR',
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
    console.log(`CURRENT_PACKAGE: ${status.readinessCurrent.package_id}`);
    console.log(`CURRENT_POSITION: ${status.readinessCurrent.position}`);
    console.log(`CURRENT_EXECUTABLE_WORK: ${status.readinessCurrent.current_work?.id ?? 'NONE'}`);
    console.log(`CURRENT_EXECUTABLE_WORK_KIND: ${status.readinessCurrent.current_work?.kind ?? 'NONE'}`);
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
    console.log(`DUPLICATE_READINESS_SCANS_AVOIDED: ${engine.observability.duplicateReadinessScansAvoided}`);
    console.log(`VALIDATION_GATES_SKIPPED: ${engine.observability.validationGatesSkipped}`);
    console.log(`VALIDATION_TOTAL_MS: ${engine.observability.totalMs}`);
  }
}

async function main() {
  const unknown = process.argv.slice(2);
  if (unknown.length > 0) throw new Error(`argumentos desconocidos: ${unknown.join(', ')}.`);
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
