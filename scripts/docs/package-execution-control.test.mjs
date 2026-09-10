import test from 'node:test';
import assert from 'node:assert/strict';

import {
  assertNoFuturePackageArtifacts,
  assertPackageMutationAllowed,
  deriveLinearPackageExecution,
  readPackageExecutionPolicy,
} from './package-execution-control.mjs';

const policy = {
  schema_version: 1,
  policy_id: 'PACKAGE-EXECUTION-001',
  mode: 'DETERMINISTIC_GOVERNED_FRONTIER',
  automatic_next: true,
  human_package_selection: false,
  source_task: 'DELIV-PKG-015',
  layer_order: [0, 1, 2, 3, 4],
  tie_breakers: ['EXPLICIT_PACKAGE_DEPENDENCIES', 'IMPLEMENTATION_LAYER', 'PACKAGE_ID'],
  terminal_statuses: ['CLOSED'],
  stop_on_blocked_current: false,
  physical_authorization_required: true,
  defer_without_canonical_order: true,
  current_package_semantics: 'DETERMINISTIC_PRIMARY_FRONTIER_MEMBER',
  current_executable_work_semantics: 'FIRST_SCHEDULABLE_FRONTIER_WORK',
  foundation_prerequisites_precede_consumer: true,
  frontier_semantics: 'ALL_DEPENDENCY_ELIGIBLE_NONTERMINAL_PACKAGES',
  active_physical_semantics: 'IMPLEMENTING_OR_DEPLOYED_PACKAGES_RETAIN_EXACT_RESOURCE_LOCKS',
  physical_admission_semantics: 'PROVEN_NON_CONFLICTING_WITH_ACTIVE_AND_RESERVED_SET',
  unknown_physical_identity: 'FAIL_CLOSED_PHYSICAL_ADMISSION_ONLY',
  long_observation_holds_global_turn: false,
  independent_checkout_required: true,
  serialized_close: true,
  shared_resource_conflicts_serialized: true,
};

function scope(packageId, {
  path = `src/${packageId}.ts`,
  unit = packageId,
  shared = [],
} = {}) {
  const repository = 'vento-group-sas/vento-shell';
  return {
    target_paths: [path],
    target_path_keys: [`${repository}:${path}`],
    target_repositories: [repository],
    implementation_unit_ids: [`${repository}:${unit}`],
    deployment_target_keys: [],
    resource_keys: [
      `PATH::${repository}::${path}`,
      `UNIT::${repository}::${unit}`,
      ...shared.map((key) => `SHARED::${repository}::${key}`),
    ],
  };
}

function pkg(packageId, layer, status = 'COMPILED', dependencies = [], extra = {}) {
  return {
    package_id: packageId,
    source_kind: 'CANONICAL_GAP_PACKAGE',
    status,
    execution: {
      layer,
      depends_on_package_ids: dependencies,
      deferred: false,
    },
    blockers: status === 'IMPLEMENTATION_READY' ? [] : ['PENDING'],
    task_prerequisites: { missing_task_ids: [] },
    package_gate: null,
    execution_requirements: scope(packageId),
    next_execution: status === 'IMPLEMENTATION_READY'
      ? `SHELL-CI-020::${packageId}`
      : null,
    ...extra,
  };
}

test('la política versionada habilita frontier gobernada sin selección humana', () => {
  const loaded = readPackageExecutionPolicy(process.cwd());
  assert.equal(loaded.mode, 'DETERMINISTIC_GOVERNED_FRONTIER');
  assert.equal(loaded.automatic_next, true);
  assert.equal(loaded.human_package_selection, false);
  assert.equal(loaded.stop_on_blocked_current, false);
  assert.equal(loaded.long_observation_holds_global_turn, false);
  assert.equal(loaded.serialized_close, true);
});

test('un package bloqueado por fundación no monopoliza otro root independiente', () => {
  const waiting = {
    ...pkg('GAP-PKG-001', 1),
    package_gate: { status: 'APPROVED_FOR_IMPLEMENTATION', approval_complete: true },
    blockers: ['PHYSICAL_DEPENDENCIES:FAIL'],
    physical_dependencies: {
      status: 'FAIL',
      evidence: [{
        source: 'MRP015-000::TOOLCHAIN_READY',
        kind: 'FOUNDATION_GATE',
        foundation_id: 'MRP015-000',
        gate_id: 'TOOLCHAIN_READY',
        owner_task: 'SUPA-TRANS-015',
        status: 'FAIL',
        detail: 'Se requiere PASS.',
      }],
    },
  };
  const independent = pkg('GAP-PKG-002', 1);
  const result = deriveLinearPackageExecution({ packages: [waiting, independent] }, policy);

  assert.equal(result.current.package_id, 'GAP-PKG-002');
  assert.equal(result.current.next_action.type, 'PREPARE_PACKAGE_GATE');
  assert.ok(result.frontier.some(({ package_id: id }) => id === 'GAP-PKG-001'));
  assert.ok(result.waiting.some(({ package_id: id }) => id === 'GAP-PKG-001'));
});

test('dependencia explícita no entra a frontier hasta que predecessor quede CLOSED', () => {
  const dependent = pkg('GAP-PKG-001', 1, 'COMPILED', ['GAP-PKG-002']);
  const predecessor = pkg('GAP-PKG-002', 1);

  let result = deriveLinearPackageExecution({ packages: [dependent, predecessor] }, policy);
  assert.deepEqual(result.sequence.map(({ package_id: id }) => id), ['GAP-PKG-002', 'GAP-PKG-001']);
  assert.deepEqual(result.frontier.map(({ package_id: id }) => id), ['GAP-PKG-002']);
  assert.ok(result.waiting.some(({ package_id: id, kind }) => id === 'GAP-PKG-001' && kind === 'DEPENDENCY_WAIT'));

  result = deriveLinearPackageExecution({
    packages: [dependent, { ...predecessor, status: 'CLOSED', blockers: [] }],
  }, policy);
  assert.ok(result.frontier.some(({ package_id: id }) => id === 'GAP-PKG-001'));
});

test('scope físico desconocido falla cerrado para admission pero no bloquea otra maduración', () => {
  const unknown = pkg('GAP-PKG-001', 1, 'IMPLEMENTATION_READY', [], {
    package_gate: { status: 'APPROVED_FOR_IMPLEMENTATION', approval_complete: true },
    execution_requirements: {
      target_paths: ['supabase/functions/x/index.ts'],
      target_path_keys: [],
      target_repositories: [],
      implementation_unit_ids: [],
      deployment_target_keys: [],
      resource_keys: [],
    },
  });
  const independent = pkg('GAP-PKG-002', 1);
  const result = deriveLinearPackageExecution({ packages: [unknown, independent] }, policy);

  assert.equal(result.physical_admission[0].package_id, 'GAP-PKG-001');
  assert.equal(result.physical_admission[0].status, 'UNKNOWN');
  assert.equal(result.current.package_id, 'GAP-PKG-002');
});

test('scope probado y no conflictivo habilita handoff determinista', () => {
  const ready = pkg('GAP-PKG-001', 1, 'IMPLEMENTATION_READY', [], {
    package_gate: { status: 'APPROVED_FOR_IMPLEMENTATION', approval_complete: true },
  });
  const result = deriveLinearPackageExecution({ packages: [ready] }, policy);

  assert.equal(result.physical_admission[0].status, 'ADMISSIBLE');
  assert.equal(result.current.package_id, 'GAP-PKG-001');
  assert.equal(result.current.next_action.type, 'MATERIALIZE_PHYSICAL_HANDOFF');
});

test('PENDING_AUTHORIZATION reserva todos los admission locks', () => {
  const pending = pkg('GAP-PKG-001', 1, 'IMPLEMENTATION_READY', [], {
    package_gate: { status: 'APPROVED_FOR_IMPLEMENTATION', approval_complete: true },
    execution_requirements: scope('GAP-PKG-001', {
      path: 'supabase/migrations/001.sql',
      unit: 'db-a',
      shared: ['SUPABASE_SCHEMA'],
    }),
    physical_entry_instance: {
      instance_id: 'SHELL-CI-020::GAP-PKG-001',
      status: 'PENDING_AUTHORIZATION',
    },
  });
  const candidate = pkg('GAP-PKG-002', 1, 'IMPLEMENTATION_READY', [], {
    package_gate: { status: 'APPROVED_FOR_IMPLEMENTATION', approval_complete: true },
    execution_requirements: scope('GAP-PKG-002', {
      path: 'supabase/migrations/002.sql',
      unit: 'db-b',
      shared: ['SUPABASE_SCHEMA'],
    }),
  });

  const result = deriveLinearPackageExecution({ packages: [pending, candidate] }, policy);
  const admission = result.physical_admission.find(({ package_id: id }) => id === 'GAP-PKG-002');

  assert.equal(result.authorization_frontier[0].package_id, 'GAP-PKG-001');
  assert.equal(admission.status, 'BLOCKED_CONFLICT');
  assert.equal(result.resource_holders[0].phase, 'AUTHORIZATION');
  assert.ok(result.resource_holders[0].held_resource_keys.some((key) => key.endsWith('SUPABASE_SCHEMA')));
});

test('CI021 mantiene lock compartido y bloquea otra mutación de schema', () => {
  const active = pkg('GAP-PKG-001', 1, 'DEPLOYED', [], {
    package_gate: { status: 'APPROVED_FOR_IMPLEMENTATION', approval_complete: true },
    blockers: [],
    next_execution: 'SHELL-CI-021::GAP-PKG-001',
    execution_requirements: scope('GAP-PKG-001', {
      path: 'supabase/migrations/001.sql',
      unit: 'db-a',
      shared: ['SUPABASE_SCHEMA'],
    }),
  });
  const candidate = pkg('GAP-PKG-002', 1, 'IMPLEMENTATION_READY', [], {
    package_gate: { status: 'APPROVED_FOR_IMPLEMENTATION', approval_complete: true },
    execution_requirements: scope('GAP-PKG-002', {
      path: 'supabase/migrations/002.sql',
      unit: 'db-b',
      shared: ['SUPABASE_SCHEMA'],
    }),
  });

  const result = deriveLinearPackageExecution({ packages: [active, candidate] }, policy);
  const holder = result.resource_holders.find(({ package_id: id }) => id === 'GAP-PKG-001');
  const admission = result.physical_admission.find(({ package_id: id }) => id === 'GAP-PKG-002');

  assert.equal(holder.phase, 'CHANGE');
  assert.ok(holder.held_resource_keys.some((key) => key.endsWith('SUPABASE_SCHEMA')));
  assert.equal(admission.status, 'BLOCKED_CONFLICT');
});

test('CI022 libera lock compartido de schema y permite otra mutación en path distinto', () => {
  const pilot = pkg('GAP-PKG-001', 1, 'DEPLOYED', [], {
    package_gate: { status: 'APPROVED_FOR_IMPLEMENTATION', approval_complete: true },
    blockers: [],
    next_execution: 'SHELL-CI-022::GAP-PKG-001',
    execution_requirements: scope('GAP-PKG-001', {
      path: 'supabase/migrations/001.sql',
      unit: 'db-a',
      shared: ['SUPABASE_SCHEMA'],
    }),
  });
  const candidate = pkg('GAP-PKG-002', 1, 'IMPLEMENTATION_READY', [], {
    package_gate: { status: 'APPROVED_FOR_IMPLEMENTATION', approval_complete: true },
    execution_requirements: scope('GAP-PKG-002', {
      path: 'supabase/migrations/002.sql',
      unit: 'db-b',
      shared: ['SUPABASE_SCHEMA'],
    }),
  });

  const result = deriveLinearPackageExecution({ packages: [pilot, candidate] }, policy);
  const holder = result.resource_holders.find(({ package_id: id }) => id === 'GAP-PKG-001');
  const admission = result.physical_admission.find(({ package_id: id }) => id === 'GAP-PKG-002');

  assert.equal(holder.phase, 'OBSERVATION');
  assert.ok(!holder.held_resource_keys.some((key) => key.endsWith('SUPABASE_SCHEMA')));
  assert.equal(admission.status, 'ADMISSIBLE');
  assert.equal(result.current.package_id, 'GAP-PKG-002');
});

test('CI022 conserva lock exacto del path y bloquea doble edición del mismo surface', () => {
  const pilot = pkg('GAP-PKG-001', 1, 'DEPLOYED', [], {
    package_gate: { status: 'APPROVED_FOR_IMPLEMENTATION', approval_complete: true },
    blockers: [],
    next_execution: 'SHELL-CI-022::GAP-PKG-001',
    execution_requirements: scope('GAP-PKG-001', {
      path: 'supabase/functions/shared/index.ts',
      unit: 'processor-a',
      shared: ['SUPABASE_SCHEMA'],
    }),
  });
  const candidate = pkg('GAP-PKG-002', 1, 'IMPLEMENTATION_READY', [], {
    package_gate: { status: 'APPROVED_FOR_IMPLEMENTATION', approval_complete: true },
    execution_requirements: scope('GAP-PKG-002', {
      path: 'supabase/functions/shared/index.ts',
      unit: 'processor-b',
      shared: ['SUPABASE_SCHEMA'],
    }),
  });

  const result = deriveLinearPackageExecution({ packages: [pilot, candidate] }, policy);
  const admission = result.physical_admission.find(({ package_id: id }) => id === 'GAP-PKG-002');

  assert.equal(admission.status, 'BLOCKED_CONFLICT');
  assert.ok(admission.conflicting_resource_keys.some((key) => key.includes('PATH::')));
});

test('package en piloto permanece ACTIVE_PHYSICAL pero no primary global', () => {
  const pilot = pkg('GAP-PKG-001', 1, 'DEPLOYED', [], {
    package_gate: { status: 'APPROVED_FOR_IMPLEMENTATION', approval_complete: true },
    blockers: [],
    next_execution: 'SHELL-CI-022::GAP-PKG-001',
  });
  const next = pkg('GAP-PKG-002', 1);
  const result = deriveLinearPackageExecution({ packages: [pilot, next] }, policy);

  assert.equal(result.active_physical.length, 1);
  assert.equal(result.active_physical[0].package_id, 'GAP-PKG-001');
  assert.equal(result.current.package_id, 'GAP-PKG-002');
  assert.equal(result.active_physical[0].next_action.type, 'CONTINUE_PHYSICAL_LIFECYCLE');
});

test('mutaciones package-gate siguen primary; finish admite gate ya madurado en frontier', () => {
  const pending = pkg('GAP-PKG-001', 1, 'IMPLEMENTATION_READY', [], {
    package_gate: { status: 'APPROVED_FOR_IMPLEMENTATION', approval_complete: true },
    physical_entry_instance: {
      instance_id: 'SHELL-CI-020::GAP-PKG-001',
      status: 'PENDING_AUTHORIZATION',
    },
  });
  const next = pkg('GAP-PKG-002', 1);
  const execution = deriveLinearPackageExecution({ packages: [pending, next] }, policy);

  assert.doesNotThrow(() => assertPackageMutationAllowed({
    execution,
    packageId: 'GAP-PKG-002',
    operation: 'PACKAGE_START',
  }));
  assert.doesNotThrow(() => assertPackageMutationAllowed({
    execution,
    packageId: 'GAP-PKG-001',
    operation: 'PACKAGE_FINISH',
  }));
  assert.throws(() => assertPackageMutationAllowed({
    execution,
    packageId: 'GAP-PKG-001',
    operation: 'PACKAGE_START',
  }), /PACKAGE_OUTSIDE_GOVERNED_PRIMARY/u);
  assert.throws(() => assertPackageMutationAllowed({
    execution,
    packageId: 'GAP-PKG-002',
    operation: 'PACKAGE_START',
    openOrderCorrections: ['DELIV-PKG-015::CORR-012'],
  }), /PACKAGE_EXECUTION_ORDER_CORRECTION_OPEN/u);
});

test('artefactos exigen eligibility o admission gobernada', () => {
  const active = pkg('GAP-PKG-001', 1, 'DEPLOYED', [], {
    package_gate: { status: 'APPROVED_FOR_IMPLEMENTATION', approval_complete: true },
    blockers: [],
    next_execution: 'SHELL-CI-022::GAP-PKG-001',
  });
  const ready = pkg('GAP-PKG-002', 1, 'IMPLEMENTATION_READY', [], {
    package_gate: { status: 'APPROVED_FOR_IMPLEMENTATION', approval_complete: true },
  });
  const dependent = pkg('GAP-PKG-003', 1, 'COMPILED', ['GAP-PKG-004']);
  const predecessor = pkg('GAP-PKG-004', 1);

  const execution = deriveLinearPackageExecution({
    packages: [active, ready, dependent, predecessor],
  }, policy);

  assert.doesNotThrow(() => assertNoFuturePackageArtifacts({
    execution,
    packageGateIds: ['GAP-PKG-001', 'GAP-PKG-002'],
    implementationInstanceIds: [
      'SHELL-CI-022::GAP-PKG-001',
      'SHELL-CI-020::GAP-PKG-002',
    ],
  }));
  assert.throws(() => assertNoFuturePackageArtifacts({
    execution,
    packageGateIds: ['GAP-PKG-003'],
  }), /PACKAGE_GATE_BEFORE_DEPENDENCY_ELIGIBILITY/u);
});

test('rechaza ciclos y dependencias que contradicen capas', () => {
  assert.throws(
    () => deriveLinearPackageExecution({ packages: [
      pkg('GAP-PKG-001', 1, 'COMPILED', ['GAP-PKG-002']),
      pkg('GAP-PKG-002', 1, 'COMPILED', ['GAP-PKG-001']),
    ] }, policy),
    /Ciclo entre packages/u,
  );
  assert.throws(
    () => deriveLinearPackageExecution({ packages: [
      pkg('GAP-PKG-001', 1, 'COMPILED', ['GAP-PKG-002']),
      pkg('GAP-PKG-002', 2),
    ] }, policy),
    /contradice el orden de capas/u,
  );
});
