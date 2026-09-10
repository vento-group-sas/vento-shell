import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

export const PACKAGE_EXECUTION_POLICY_PATH = 'docs/plan-canonico/modular/package-execution-policy.json';

const ACTIVE_PHYSICAL_STATUSES = new Set(['IMPLEMENTING', 'DEPLOYED']);
const WAIT_ACTIONS = new Set([
  'WAIT_FOR_DOCUMENTARY_PREREQUISITE',
  'WAIT_FOR_PHYSICAL_PREREQUISITE',
  'WAIT_FOR_FOUNDATION_PREREQUISITE',
]);

function fail(message) {
  throw new Error(message);
}

function absolute(root, relativePath) {
  return path.join(root, ...String(relativePath).split('/'));
}

function canonicalPackageId(value) {
  return /^GAP-PKG-\d{3}$/u.test(String(value ?? ''));
}

function normalizePackageId(value) {
  return String(value ?? '').trim().toUpperCase();
}

function packageDependencies(pkg) {
  return [...new Set(
    (Array.isArray(pkg?.execution?.depends_on_package_ids)
      ? pkg.execution.depends_on_package_ids
      : [])
      .map(normalizePackageId)
      .filter(Boolean),
  )].sort((left, right) => left.localeCompare(right, 'en'));
}

function layerRankFor(policy) {
  return new Map((policy.layer_order ?? []).map((layer, index) => [layer, index]));
}

function packageLayer(pkg) {
  return Number.isInteger(pkg?.execution?.layer) ? pkg.execution.layer : null;
}

function comparePackage(left, right, layerRank) {
  const leftRank = layerRank.get(packageLayer(left)) ?? Number.MAX_SAFE_INTEGER;
  const rightRank = layerRank.get(packageLayer(right)) ?? Number.MAX_SAFE_INTEGER;
  return leftRank - rightRank || normalizePackageId(left.package_id).localeCompare(
    normalizePackageId(right.package_id),
    'en',
  );
}

function isDeferred(pkg, policy, layerRank) {
  const execution = pkg?.execution ?? null;
  if (!execution || execution.deferred === true) return true;
  if (!layerRank.has(execution.layer) && policy.defer_without_canonical_order === true) return true;
  return false;
}

function isTerminal(pkg, policy) {
  return new Set(policy.terminal_statuses ?? ['CLOSED'])
    .has(String(pkg?.status ?? '').trim().toUpperCase());
}

function unmetPhysicalDependency(pkg) {
  return (pkg?.physical_dependencies?.evidence ?? [])
    .find(({ status }) => status !== 'PASS') ?? null;
}

function prerequisiteAction(pkg) {
  const dependency = unmetPhysicalDependency(pkg);
  if (!dependency) return null;

  if (dependency.kind === 'FOUNDATION_GATE') {
    return {
      type: 'WAIT_FOR_FOUNDATION_PREREQUISITE',
      target: dependency.foundation_id ?? dependency.source,
      gate_id: dependency.gate_id ?? null,
      owner_task: dependency.owner_task ?? null,
      command: `npm run docs:package:readiness:check -- --package ${pkg.package_id}`,
      reason:
        `${pkg.package_id} espera ${dependency.foundation_id ?? dependency.source}`
        + `${dependency.gate_id ? ` / ${dependency.gate_id}` : ''}`
        + `${dependency.owner_task ? `, propiedad de ${dependency.owner_task}` : ''}. `
        + 'El package permanece WAITING; otros roots independientes dependency-eligible pueden continuar.',
    };
  }

  return {
    type: 'WAIT_FOR_PHYSICAL_PREREQUISITE',
    target: dependency.source,
    command: 'npm run docs:implementation:status',
    reason:
      `${pkg.package_id} espera ${dependency.source} hasta VERIFIED; `
      + 'la espera no monopoliza la frontier global.',
  };
}

function nextAction(pkg) {
  const packageId = normalizePackageId(pkg.package_id);
  const status = String(pkg.status ?? '').trim().toUpperCase();

  if (status === 'IMPLEMENTATION_READY') {
    const prerequisite = prerequisiteAction(pkg);
    if (prerequisite) return prerequisite;

    if (!pkg.physical_entry_instance) {
      return {
        type: 'MATERIALIZE_PHYSICAL_HANDOFF',
        target: pkg.next_execution ?? `SHELL-CI-020::${packageId}`,
        command: `npm run docs:package:handoff -- --package-id ${packageId}`,
        reason:
          `${packageId} completó dossier, gate y dependencias; `
          + 'su handoff físico solo puede materializarse con admisión de recursos ADMISSIBLE.',
      };
    }

    if (pkg.physical_entry_instance.status === 'PENDING_AUTHORIZATION') {
      return {
        type: 'AUTHORIZE_PHYSICAL_IMPLEMENTATION',
        target: pkg.physical_entry_instance.instance_id,
        command: 'npm run docs:implementation:status',
        reason:
          `${packageId} ya tiene handoff PENDING_AUTHORIZATION y reserva su scope probado; `
          + 'falta autorización física humana explícita.',
      };
    }

    return {
      type: 'RESOLVE_PACKAGE_BLOCKER',
      target: pkg.physical_entry_instance.instance_id,
      command: 'npm run docs:implementation:status',
      reason:
        `${pkg.physical_entry_instance.instance_id} existe con estado `
        + `${pkg.physical_entry_instance.status}; revisar el lifecycle físico exacto.`,
    };
  }

  if (ACTIVE_PHYSICAL_STATUSES.has(status)) {
    const prerequisite = prerequisiteAction(pkg);
    if (prerequisite) return prerequisite;
    return {
      type: 'CONTINUE_PHYSICAL_LIFECYCLE',
      target: pkg.next_execution ?? packageId,
      command: 'npm run docs:implementation:status',
      reason:
        `${packageId} permanece en ACTIVE_PHYSICAL y conserva sus locks aplicables; `
        + 'su observación no monopoliza el primary global.',
    };
  }

  if (pkg.source_kind === 'CANONICAL_GAP_PACKAGE' && !pkg.package_gate) {
    return {
      type: 'PREPARE_PACKAGE_GATE',
      target: packageId,
      command: `npm run docs:package:start -- --package-id ${packageId}`,
      reason:
        `${packageId} está dependency-eligible y no tiene expediente package-gate.`,
    };
  }

  if (pkg.source_kind === 'CANONICAL_GAP_PACKAGE') {
    const missingTask = pkg.task_prerequisites?.missing_task_ids?.[0] ?? null;
    if (missingTask) {
      return {
        type: 'WAIT_FOR_DOCUMENTARY_PREREQUISITE',
        target: missingTask,
        command: `npm run docs:package:gate:status -- --package-id ${packageId}`,
        reason:
          `${packageId} espera la tarea documental ${missingTask}; `
          + 'otros roots independientes pueden continuar.',
      };
    }

    if (pkg.package_gate.status !== 'APPROVED_FOR_IMPLEMENTATION') {
      return {
        type: 'MATURE_PACKAGE_GATE',
        target: packageId,
        command: `npm run docs:package:gate:status -- --package-id ${packageId}`,
        reason:
          `${packageId} debe completar identidad, unidades, evidencia y aprobación de gate.`,
      };
    }

    const prerequisite = prerequisiteAction(pkg);
    if (prerequisite) return prerequisite;

    const gateBlocker = pkg.gate?.checks?.find(({ status: checkStatus }) => checkStatus !== 'PASS') ?? null;
    return {
      type: 'RESOLVE_PACKAGE_BLOCKER',
      target: gateBlocker?.id ?? pkg.blockers?.[0] ?? packageId,
      command: `npm run docs:package:readiness -- --package ${packageId}`,
      reason:
        `${packageId} aún no satisface su primer bloqueo efectivo; `
        + 'permanece WAITING sin monopolizar la frontier.',
    };
  }

  return {
    type: 'WAIT_FOR_SPECIAL_PACKAGE_READINESS',
    target: packageId,
    command: `npm run docs:package:readiness:check -- --package ${packageId}`,
    reason:
      `${packageId} espera sus condiciones documentales explícitas y no bloquea roots independientes.`,
  };
}

function deriveCurrentWork(pkg, action) {
  if (!action) return null;

  if (action.type === 'WAIT_FOR_FOUNDATION_PREREQUISITE') {
    const dependency = unmetPhysicalDependency(pkg);
    return {
      kind: 'FOUNDATION_GATE',
      id: action.target,
      gate_id: action.gate_id ?? dependency?.gate_id ?? null,
      owner_task: action.owner_task ?? dependency?.owner_task ?? null,
      status: dependency?.status ?? 'UNKNOWN',
      consumer_package_id: pkg.package_id,
      action_type: action.type,
    };
  }

  if (action.type === 'WAIT_FOR_PHYSICAL_PREREQUISITE') {
    const dependency = unmetPhysicalDependency(pkg);
    return {
      kind: 'PHYSICAL_PREREQUISITE',
      id: action.target,
      gate_id: null,
      owner_task: null,
      status: dependency?.status ?? 'UNKNOWN',
      consumer_package_id: pkg.package_id,
      action_type: action.type,
    };
  }

  return {
    kind: 'PACKAGE',
    id: pkg.package_id,
    gate_id: null,
    owner_task: null,
    status: pkg.status,
    consumer_package_id: pkg.package_id,
    action_type: action.type,
  };
}

function topologicalOrder(executable, byId, policy) {
  const layerRank = layerRankFor(policy);
  const executableIds = new Set(executable.map(({ package_id: packageId }) => normalizePackageId(packageId)));
  const incoming = new Map(executable.map(({ package_id: packageId }) => [normalizePackageId(packageId), new Set()]));
  const outgoing = new Map(executable.map(({ package_id: packageId }) => [normalizePackageId(packageId), new Set()]));

  for (const pkg of executable) {
    const packageId = normalizePackageId(pkg.package_id);
    for (const dependencyId of packageDependencies(pkg)) {
      if (!canonicalPackageId(dependencyId) || !byId.has(dependencyId)) {
        fail(`${packageId}: dependencia desconocida ${dependencyId}.`);
      }
      if (dependencyId === packageId) fail(`${packageId}: dependencia circular consigo mismo.`);
      if (!executableIds.has(dependencyId)) {
        fail(`${packageId}: depende de ${dependencyId}, que está fuera del orden ejecutable.`);
      }
      const dependency = byId.get(dependencyId);
      if (
        (layerRank.get(packageLayer(dependency)) ?? Number.MAX_SAFE_INTEGER)
        > (layerRank.get(packageLayer(pkg)) ?? Number.MAX_SAFE_INTEGER)
      ) {
        fail(`${packageId}: dependencia ${dependencyId} contradice el orden de capas.`);
      }
      incoming.get(packageId).add(dependencyId);
      outgoing.get(dependencyId).add(packageId);
    }
  }

  const ready = executable
    .filter((pkg) => incoming.get(normalizePackageId(pkg.package_id)).size === 0)
    .sort((left, right) => comparePackage(left, right, layerRank));
  const ordered = [];

  while (ready.length > 0) {
    const current = ready.shift();
    const currentId = normalizePackageId(current.package_id);
    ordered.push(current);
    for (const dependentId of outgoing.get(currentId)) {
      const dependencies = incoming.get(dependentId);
      dependencies.delete(currentId);
      if (dependencies.size === 0) {
        ready.push(byId.get(dependentId));
        ready.sort((left, right) => comparePackage(left, right, layerRank));
      }
    }
  }

  if (ordered.length !== executable.length) {
    const cyclic = executable
      .map(({ package_id: packageId }) => normalizePackageId(packageId))
      .filter((packageId) => !ordered.some((pkg) => normalizePackageId(pkg.package_id) === packageId));
    fail(`Ciclo entre packages: ${cyclic.join(', ')}.`);
  }

  return ordered;
}

function dependencyEligibility(pkg, byId, policy) {
  const pending = packageDependencies(pkg)
    .filter((dependencyId) => !isTerminal(byId.get(dependencyId), policy));
  return {
    eligible: pending.length === 0,
    pending_dependency_ids: pending,
  };
}

function resourceProfile(pkg) {
  const requirements = pkg?.execution_requirements ?? {};
  const targetPaths = Array.isArray(requirements.target_paths) ? requirements.target_paths : [];
  const targetPathKeys = Array.isArray(requirements.target_path_keys) ? requirements.target_path_keys : [];
  const implementationUnits = Array.isArray(requirements.implementation_unit_ids)
    ? requirements.implementation_unit_ids
    : [];
  const resourceKeys = Array.isArray(requirements.resource_keys) ? requirements.resource_keys : [];

  const persistent = [...new Set(
    resourceKeys.filter((key) => /^PATH::|^UNIT::/u.test(String(key))),
  )].sort((left, right) => left.localeCompare(right, 'en'));
  const exclusiveTransition = [...new Set(
    resourceKeys.filter((key) => /^SHARED::/u.test(String(key))),
  )].sort((left, right) => left.localeCompare(right, 'en'));
  const admission = [...new Set([...persistent, ...exclusiveTransition])]
    .sort((left, right) => left.localeCompare(right, 'en'));

  const status = String(pkg?.status ?? '').trim().toUpperCase();
  const requiresPhysicalIdentity = pkg?.package_gate?.approval_complete === true
    || pkg?.package_gate?.status === 'APPROVED_FOR_IMPLEMENTATION'
    || status === 'IMPLEMENTATION_READY'
    || ACTIVE_PHYSICAL_STATUSES.has(status);

  const proven = !requiresPhysicalIdentity || (
    targetPaths.length > 0
    && targetPathKeys.length === targetPaths.length
    && implementationUnits.length > 0
    && persistent.length > 0
  );

  return {
    package_id: normalizePackageId(pkg?.package_id),
    proven,
    target_paths: [...targetPaths],
    target_path_keys: [...targetPathKeys],
    implementation_unit_ids: [...implementationUnits],
    persistent_resource_keys: persistent,
    exclusive_transition_keys: exclusiveTransition,
    admission_resource_keys: admission,
    resource_keys: admission,
    reason: proven ? 'PROVEN' : 'PHYSICAL_SCOPE_OR_IMPLEMENTATION_UNIT_UNRESOLVED',
  };
}

function physicalPhase(pkg) {
  const target = String(pkg?.next_execution ?? '').trim();
  const match = /^SHELL-CI-(02[0-4])::/u.exec(target);
  if (!match) return 'UNKNOWN';
  if (['020', '021'].includes(match[1])) return 'CHANGE';
  if (['022', '023', '024'].includes(match[1])) return 'OBSERVATION';
  return 'UNKNOWN';
}

function holderProfile(pkg, kind) {
  const profile = resourceProfile(pkg);
  const phase = kind === 'PENDING_AUTHORIZATION_RESERVATION'
    ? 'AUTHORIZATION'
    : physicalPhase(pkg);
  const held = kind === 'PENDING_AUTHORIZATION_RESERVATION'
    ? profile.admission_resource_keys
    : phase === 'OBSERVATION'
      ? profile.persistent_resource_keys
      : profile.admission_resource_keys;

  return {
    package_id: profile.package_id,
    kind,
    status: String(pkg?.status ?? '').trim().toUpperCase(),
    phase,
    proven: profile.proven,
    held_resource_keys: [...held],
    persistent_resource_keys: profile.persistent_resource_keys,
    exclusive_transition_keys: profile.exclusive_transition_keys,
    admission_resource_keys: profile.admission_resource_keys,
    resource_keys: [...held],
    reason: profile.reason,
  };
}

function buildResourceHolders(ordered) {
  const holders = [];

  for (const pkg of ordered) {
    const status = String(pkg.status ?? '').trim().toUpperCase();
    if (ACTIVE_PHYSICAL_STATUSES.has(status)) {
      holders.push(holderProfile(pkg, 'ACTIVE_PHYSICAL'));
      continue;
    }
    if (pkg?.physical_entry_instance?.status === 'PENDING_AUTHORIZATION') {
      holders.push(holderProfile(pkg, 'PENDING_AUTHORIZATION_RESERVATION'));
    }
  }

  return holders;
}

function resourceCollisions(candidateKeys, holderKeys) {
  const held = new Set(holderKeys);
  return candidateKeys.filter((key) => held.has(key));
}

function physicalAdmission(pkg, holders) {
  const profile = resourceProfile(pkg);

  if (!profile.proven) {
    return {
      package_id: profile.package_id,
      status: 'UNKNOWN',
      reason: profile.reason,
      conflicting_packages: [],
      conflicting_resource_keys: [],
      resource_profile: profile,
    };
  }

  const unknownOther = holders.find(
    (holder) => holder.package_id !== profile.package_id && holder.proven !== true,
  ) ?? null;
  if (unknownOther) {
    return {
      package_id: profile.package_id,
      status: 'UNKNOWN',
      reason: `ACTIVE_OR_RESERVED_SCOPE_UNKNOWN:${unknownOther.package_id}`,
      conflicting_packages: [unknownOther.package_id],
      conflicting_resource_keys: [],
      resource_profile: profile,
    };
  }

  const conflicts = [];
  for (const holder of holders) {
    if (holder.package_id === profile.package_id) continue;
    const keys = resourceCollisions(profile.admission_resource_keys, holder.held_resource_keys);
    if (keys.length > 0) {
      conflicts.push({
        package_id: holder.package_id,
        holder_kind: holder.kind,
        holder_phase: holder.phase,
        resource_keys: keys,
      });
    }
  }

  if (conflicts.length > 0) {
    return {
      package_id: profile.package_id,
      status: 'BLOCKED_CONFLICT',
      reason: 'RESOURCE_LOCK_COLLISION',
      conflicting_packages: [...new Set(conflicts.map(({ package_id: packageId }) => packageId))].sort(),
      conflicting_resource_keys: [...new Set(conflicts.flatMap(({ resource_keys: keys }) => keys))].sort(),
      conflicts,
      resource_profile: profile,
    };
  }

  return {
    package_id: profile.package_id,
    status: 'ADMISSIBLE',
    reason: 'PROVEN_NON_CONFLICTING_WITH_ACTIVE_AND_RESERVED_SET',
    conflicting_packages: [],
    conflicting_resource_keys: [],
    resource_profile: profile,
  };
}

function schedulableAction(action, admission) {
  if (!action) return false;
  if (WAIT_ACTIONS.has(action.type)) return false;
  if (action.type === 'CONTINUE_PHYSICAL_LIFECYCLE') return false;
  if (action.type === 'AUTHORIZE_PHYSICAL_IMPLEMENTATION') return false;
  if (action.type === 'MATERIALIZE_PHYSICAL_HANDOFF') return admission?.status === 'ADMISSIBLE';
  return true;
}

function entryFor(pkg, position) {
  return {
    package_id: normalizePackageId(pkg.package_id),
    position,
    layer: packageLayer(pkg),
    status: pkg.status,
    depends_on_package_ids: packageDependencies(pkg),
  };
}

export function assertPackageMutationAllowed({
  execution,
  packageId,
  operation = 'PACKAGE_MUTATION',
  openOrderCorrections = [],
} = {}) {
  const normalizedPackageId = normalizePackageId(packageId);
  if (!canonicalPackageId(normalizedPackageId)) {
    fail(`PACKAGE_ID_INVALID: ${packageId ?? 'EMPTY'}.`);
  }

  const corrections = [...new Set(
    (openOrderCorrections ?? [])
      .map((entry) => typeof entry === 'string' ? entry : entry?.correction_id)
      .map((entry) => String(entry ?? '').trim())
      .filter(Boolean),
  )].sort((left, right) => left.localeCompare(right, 'en'));

  if (corrections.length > 0) {
    fail(
      `PACKAGE_EXECUTION_ORDER_CORRECTION_OPEN: ${operation} bloqueado mientras `
      + `${corrections.join(', ')} no quede VERIFIED en main.`,
    );
  }

  const current = execution?.current ?? null;
  if (current?.package_id === normalizedPackageId) return current;

  const frontierEntry = (execution?.frontier ?? [])
    .find(({ package_id: packageIdValue }) => packageIdValue === normalizedPackageId) ?? null;

  const finishOnly = String(operation).includes('PACKAGE_FINISH') && frontierEntry;

  if (finishOnly) return frontierEntry;

  fail(
    `PACKAGE_OUTSIDE_GOVERNED_PRIMARY: ${operation} solo admite el primary frontier member `
    + `${current?.package_id ?? 'NONE'}; solicitado ${normalizedPackageId}.`,
  );
}

export function assertNoFuturePackageArtifacts({
  execution,
  packageGateIds = [],
  implementationInstanceIds = [],
} = {}) {
  if (!execution) fail('PACKAGE_EXECUTION_NOT_EVALUATED.');

  const sequence = execution.sequence ?? [];
  const known = new Map(sequence.map((entry) => [entry.package_id, entry]));
  const frontier = new Set((execution.frontier ?? []).map(({ package_id: packageId }) => packageId));
  const active = new Set((execution.active_physical ?? []).map(({ package_id: packageId }) => packageId));
  const authorization = new Set(
    (execution.authorization_frontier ?? []).map(({ package_id: packageId }) => packageId),
  );
  const physicalAdmission = new Map(
    (execution.physical_admission ?? []).map((entry) => [entry.package_id, entry.status]),
  );
  const violations = [];

  for (const packageIdRaw of packageGateIds) {
    const packageId = normalizePackageId(packageIdRaw);
    if (!canonicalPackageId(packageId)) continue;
    const entry = known.get(packageId);
    if (!entry) {
      violations.push(`PACKAGE_GATE_OUTSIDE_GOVERNED_SEQUENCE:${packageId}`);
      continue;
    }
    if (!frontier.has(packageId) && !active.has(packageId) && entry.status !== 'CLOSED') {
      violations.push(`PACKAGE_GATE_BEFORE_DEPENDENCY_ELIGIBILITY:${packageId}`);
    }
  }

  for (const instanceIdRaw of implementationInstanceIds) {
    const instanceId = String(instanceIdRaw ?? '').trim();
    const match = /^SHELL-CI-02[0-4]::(GAP-PKG-\d{3})$/u.exec(instanceId);
    if (!match) continue;
    const packageId = match[1];
    const entry = known.get(packageId);
    if (!entry) {
      violations.push(`PHYSICAL_INSTANCE_OUTSIDE_GOVERNED_SEQUENCE:${instanceId}`);
      continue;
    }
    const admitted = physicalAdmission.get(packageId) === 'ADMISSIBLE';
    if (!active.has(packageId) && !authorization.has(packageId) && !admitted && entry.status !== 'CLOSED') {
      violations.push(`PHYSICAL_INSTANCE_WITHOUT_GOVERNED_ADMISSION:${instanceId}`);
    }
  }

  if (violations.length > 0) {
    fail(`PACKAGE_GOVERNED_ARTIFACT_VIOLATION: ${violations.join(', ')}.`);
  }

  return true;
}

export function readPackageExecutionPolicy(root = process.cwd()) {
  const target = absolute(root, PACKAGE_EXECUTION_POLICY_PATH);
  if (!fs.existsSync(target)) fail(`No existe ${PACKAGE_EXECUTION_POLICY_PATH}.`);

  let policy;
  try {
    policy = JSON.parse(fs.readFileSync(target, 'utf8'));
  } catch (error) {
    fail(
      `${PACKAGE_EXECUTION_POLICY_PATH} no contiene JSON válido: `
      + `${error instanceof Error ? error.message : String(error)}`,
    );
  }

  const errors = [];
  if (policy?.schema_version !== 1) errors.push('schema_version debe ser 1.');
  if (policy?.policy_id !== 'PACKAGE-EXECUTION-001') errors.push('policy_id debe ser PACKAGE-EXECUTION-001.');
  if (policy?.mode !== 'DETERMINISTIC_GOVERNED_FRONTIER') {
    errors.push('mode debe ser DETERMINISTIC_GOVERNED_FRONTIER.');
  }
  if (policy?.automatic_next !== true) errors.push('automatic_next debe ser true.');
  if (policy?.human_package_selection !== false) errors.push('human_package_selection debe ser false.');
  if (policy?.source_task !== 'DELIV-PKG-015') errors.push('source_task debe ser DELIV-PKG-015.');
  if (JSON.stringify(policy?.layer_order) !== JSON.stringify([0, 1, 2, 3, 4])) {
    errors.push('layer_order debe ser [0,1,2,3,4].');
  }
  if (
    JSON.stringify(policy?.tie_breakers)
    !== JSON.stringify(['EXPLICIT_PACKAGE_DEPENDENCIES', 'IMPLEMENTATION_LAYER', 'PACKAGE_ID'])
  ) {
    errors.push('tie_breakers debe conservar dependencias, capa y package_id.');
  }
  if (!Array.isArray(policy?.terminal_statuses) || !policy.terminal_statuses.includes('CLOSED')) {
    errors.push('terminal_statuses debe incluir CLOSED.');
  }
  if (policy?.stop_on_blocked_current !== false) errors.push('stop_on_blocked_current debe ser false.');
  if (policy?.physical_authorization_required !== true) {
    errors.push('physical_authorization_required debe ser true.');
  }
  if (policy?.defer_without_canonical_order !== true) {
    errors.push('defer_without_canonical_order debe ser true.');
  }
  if (policy?.current_package_semantics !== 'DETERMINISTIC_PRIMARY_FRONTIER_MEMBER') {
    errors.push('current_package_semantics debe ser DETERMINISTIC_PRIMARY_FRONTIER_MEMBER.');
  }
  if (policy?.current_executable_work_semantics !== 'FIRST_SCHEDULABLE_FRONTIER_WORK') {
    errors.push('current_executable_work_semantics debe ser FIRST_SCHEDULABLE_FRONTIER_WORK.');
  }
  if (policy?.foundation_prerequisites_precede_consumer !== true) {
    errors.push('foundation_prerequisites_precede_consumer debe ser true.');
  }
  if (policy?.frontier_semantics !== 'ALL_DEPENDENCY_ELIGIBLE_NONTERMINAL_PACKAGES') {
    errors.push('frontier_semantics inválido.');
  }
  if (
    policy?.active_physical_semantics
    !== 'IMPLEMENTING_OR_DEPLOYED_PACKAGES_RETAIN_EXACT_RESOURCE_LOCKS'
  ) {
    errors.push('active_physical_semantics inválido.');
  }
  if (
    policy?.physical_admission_semantics
    !== 'PROVEN_NON_CONFLICTING_WITH_ACTIVE_AND_RESERVED_SET'
  ) {
    errors.push('physical_admission_semantics inválido.');
  }
  if (policy?.unknown_physical_identity !== 'FAIL_CLOSED_PHYSICAL_ADMISSION_ONLY') {
    errors.push('unknown_physical_identity inválido.');
  }
  if (policy?.long_observation_holds_global_turn !== false) {
    errors.push('long_observation_holds_global_turn debe ser false.');
  }
  if (policy?.independent_checkout_required !== true) {
    errors.push('independent_checkout_required debe ser true.');
  }
  if (policy?.serialized_close !== true) errors.push('serialized_close debe ser true.');
  if (policy?.shared_resource_conflicts_serialized !== true) {
    errors.push('shared_resource_conflicts_serialized debe ser true.');
  }

  if (errors.length > 0) {
    fail(`Política de governed frontier inválida:\n- ${errors.join('\n- ')}`);
  }

  return Object.freeze(policy);
}

export function deriveGovernedPackageExecution(registry, policy) {
  const packages = registry?.packages ?? [];
  const layerRank = layerRankFor(policy);
  const deferred = [];
  const executable = [];

  for (const pkg of packages) {
    if (isDeferred(pkg, policy, layerRank)) {
      deferred.push({
        package_id: normalizePackageId(pkg.package_id),
        status: pkg.status,
        reason: pkg?.execution?.deferred_reason ?? 'NO_CANONICAL_EXECUTION_ORDER',
      });
      continue;
    }
    executable.push(pkg);
  }

  const byId = new Map(executable.map((pkg) => [normalizePackageId(pkg.package_id), pkg]));
  const ordered = topologicalOrder(executable, byId, policy);
  const positionById = new Map(
    ordered.map((pkg, index) => [normalizePackageId(pkg.package_id), index + 1]),
  );
  const holders = buildResourceHolders(ordered);

  const frontier = [];
  const schedulableFrontier = [];
  const authorizationFrontier = [];
  const activePhysical = [];
  const waiting = [];
  const physicalAdmissionRows = [];

  for (const pkg of ordered) {
    const packageId = normalizePackageId(pkg.package_id);
    const position = positionById.get(packageId);
    if (isTerminal(pkg, policy)) continue;

    const dependency = dependencyEligibility(pkg, byId, policy);
    if (!dependency.eligible) {
      waiting.push({
        ...entryFor(pkg, position),
        kind: 'DEPENDENCY_WAIT',
        pending_dependency_ids: dependency.pending_dependency_ids,
      });
      continue;
    }

    const action = nextAction(pkg);
    const work = deriveCurrentWork(pkg, action);
    const base = {
      ...entryFor(pkg, position),
      next_action: action,
      current_work: work,
      blockers: [...(pkg.blockers ?? [])],
    };
    frontier.push(base);

    if (ACTIVE_PHYSICAL_STATUSES.has(String(pkg.status ?? '').trim().toUpperCase())) {
      const holder = holders.find(
        ({ package_id: holderPackageId, kind }) => (
          holderPackageId === packageId && kind === 'ACTIVE_PHYSICAL'
        ),
      );
      activePhysical.push({
        ...base,
        phase: holder?.phase ?? physicalPhase(pkg),
        resource_profile: resourceProfile(pkg),
        resource_locks: holder?.held_resource_keys ?? [],
        persistent_resource_locks: holder?.persistent_resource_keys ?? [],
        exclusive_transition_locks: holder?.exclusive_transition_keys ?? [],
      });
      continue;
    }

    let admission = null;
    if (
      action.type === 'MATERIALIZE_PHYSICAL_HANDOFF'
      || action.type === 'AUTHORIZE_PHYSICAL_IMPLEMENTATION'
    ) {
      admission = physicalAdmission(pkg, holders);
      physicalAdmissionRows.push(admission);
    }

    if (action.type === 'AUTHORIZE_PHYSICAL_IMPLEMENTATION') {
      authorizationFrontier.push({ ...base, physical_admission: admission });
      continue;
    }

    if (!schedulableAction(action, admission)) {
      waiting.push({
        ...base,
        kind: action.type === 'MATERIALIZE_PHYSICAL_HANDOFF'
          ? 'PHYSICAL_ADMISSION_WAIT'
          : 'PACKAGE_WAIT',
        physical_admission: admission,
      });
      continue;
    }

    schedulableFrontier.push({ ...base, physical_admission: admission });
  }

  const current = schedulableFrontier[0] ?? authorizationFrontier[0] ?? null;
  const currentWork = current?.current_work ?? null;
  const currentId = current?.package_id ?? null;

  const sequence = ordered.map((pkg, index) => {
    const packageId = normalizePackageId(pkg.package_id);
    const dependency = isTerminal(pkg, policy)
      ? { eligible: false, pending_dependency_ids: [] }
      : dependencyEligibility(pkg, byId, policy);
    return {
      ...entryFor(pkg, index + 1),
      current: packageId === currentId,
      dependency_eligible: dependency.eligible,
      pending_dependency_ids: dependency.pending_dependency_ids,
      active_physical: activePhysical.some(({ package_id: activeId }) => activeId === packageId),
    };
  });

  let state = 'BLOCKED_FRONTIER';
  if (sequence.length === 0 || sequence.every(({ status }) => status === 'CLOSED')) {
    state = 'COMPLETE';
  } else if (schedulableFrontier.length > 0) {
    state = 'FRONTIER_READY';
  } else if (authorizationFrontier.length > 0) {
    state = 'AWAITING_PHYSICAL_AUTHORIZATION';
  } else if (activePhysical.length > 0) {
    state = 'ACTIVE_PHYSICAL_ONLY';
  }

  return Object.freeze({
    policy_id: policy.policy_id,
    mode: policy.mode,
    automatic_next: true,
    human_package_selection: false,
    state,
    current,
    current_work: currentWork,
    sequence,
    frontier,
    schedulable_frontier: schedulableFrontier,
    authorization_frontier: authorizationFrontier,
    active_physical: activePhysical,
    waiting,
    physical_admission: physicalAdmissionRows,
    resource_holders: holders,
    deferred: deferred.sort((left, right) => left.package_id.localeCompare(right.package_id, 'en')),
    metrics: {
      sequence_count: sequence.length,
      frontier_count: frontier.length,
      schedulable_frontier_count: schedulableFrontier.length,
      authorization_frontier_count: authorizationFrontier.length,
      active_physical_count: activePhysical.length,
      waiting_count: waiting.length,
      deferred_count: deferred.length,
    },
    safeguards: {
      explicit_dependencies_enforced: true,
      deterministic_priority: true,
      unknown_physical_admission_fail_closed: true,
      phase_scoped_shared_locks: true,
      persistent_exact_locks_through_observation: true,
      human_package_selection: false,
      serialized_close: policy.serialized_close === true,
      independent_checkout_required: policy.independent_checkout_required === true,
    },
  });
}

// Compatibility export for existing callers. The implementation is no longer
// globally linear; the historic function name resolves the governed frontier.
export const deriveLinearPackageExecution = deriveGovernedPackageExecution;

function printExecution(execution) {
  console.log(`PACKAGE_EXECUTION: ${execution.state}`);
  console.log(`MODE: ${execution.mode}`);
  console.log('HUMAN_PACKAGE_SELECTION: FALSE');
  console.log(`PRIMARY_PACKAGE: ${execution.current?.package_id ?? 'NONE'}`);
  console.log(`CURRENT_EXECUTABLE_WORK: ${execution.current_work?.id ?? 'NONE'}`);
  console.log(`CURRENT_EXECUTABLE_WORK_KIND: ${execution.current_work?.kind ?? 'NONE'}`);
  console.log(`PRIMARY_POSITION: ${execution.current?.position ?? 'NONE'}/${execution.sequence.length}`);
  console.log(`ACTION: ${execution.current?.next_action.type ?? 'NONE'}`);
  console.log(`TARGET: ${execution.current?.next_action.target ?? 'NONE'}`);
  console.log(`COMMAND: ${execution.current?.next_action.command ?? 'NONE'}`);
  console.log(`FRONTIER_COUNT: ${execution.frontier.length}`);
  console.log(`SCHEDULABLE_FRONTIER_COUNT: ${execution.schedulable_frontier.length}`);
  console.log(`AUTHORIZATION_FRONTIER_COUNT: ${execution.authorization_frontier.length}`);
  console.log(`ACTIVE_PHYSICAL_COUNT: ${execution.active_physical.length}`);
  console.log(`WAITING_COUNT: ${execution.waiting.length}`);
  console.log(`DEFERRED_PACKAGES: ${execution.deferred.length}`);
  for (const active of execution.active_physical) {
    console.log(
      `ACTIVE_PHYSICAL: ${active.package_id} ${active.phase} `
      + `${active.next_action?.target ?? 'NONE'} locks=${active.resource_locks.length}`,
    );
  }
}

async function main() {
  const [command = 'status', ...unknown] = process.argv.slice(2);
  if (!['status', 'check'].includes(command)) fail(`Comando desconocido: ${command}.`);
  if (unknown.length > 0) fail(`Argumentos desconocidos: ${unknown.join(', ')}.`);

  const { scanPackageReadiness } = await import('./package-readiness-scanner.mjs');
  const result = scanPackageReadiness({ check: true, trigger: 'package-execution-status' });
  const execution = result.registry.package_execution;

  if (!execution || execution.mode !== 'DETERMINISTIC_GOVERNED_FRONTIER') {
    fail('PACKAGE_EXECUTION_GOVERNED_FRONTIER_NOT_PROJECTED.');
  }
  if (execution.human_package_selection !== false) {
    fail('PACKAGE_EXECUTION_HUMAN_SELECTION_MUST_REMAIN_FALSE.');
  }
  printExecution(execution);
}

const isCli = process.argv[1]
  && path.resolve(process.argv[1]) === path.resolve(fileURLToPath(import.meta.url));

if (isCli) {
  main().catch((error) => {
    console.error(`ERROR: ${error instanceof Error ? error.message : String(error)}`);
    process.exitCode = 1;
  });
}
