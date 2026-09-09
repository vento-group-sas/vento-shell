import assert from 'node:assert/strict';
import test from 'node:test';

import { buildPackageThroughputAudit } from './package-throughput-audit.mjs';

test('audita throughput sin autorizar paralelismo', () => {
  const registry = {
    package_execution: {
      current: { package_id: 'GAP-PKG-001', position: '1/2' },
    },
    packages: [
      {
        package_id: 'GAP-PKG-001',
        source_kind: 'CANONICAL_GAP_PACKAGE',
        status: 'IMPLEMENTING',
        repository_owner: 'vento-shell',
        runtime_profile: 'SUPABASE',
        execution: { layer: 0, depends_on_package_ids: [] },
        execution_requirements: {
          supabase_mutation_required: true,
          target_paths: ['supabase/functions/a/index.ts'],
        },
      },
      {
        package_id: 'GAP-PKG-002',
        source_kind: 'CANONICAL_GAP_PACKAGE',
        status: 'COMPILED',
        repository_owner: 'vento-nexo',
        runtime_profile: 'NEXT',
        execution: { layer: 1, depends_on_package_ids: ['GAP-PKG-001'] },
        execution_requirements: {
          supabase_mutation_required: false,
          target_paths: ['supabase/functions/a/index.ts', 'apps/nexo/page.tsx'],
        },
      },
    ],
  };

  const applicationClosure = {
    model_id: 'VENTO-PACKAGE-APPLICATION-CLOSURE-V1',
    fingerprint_sha256: 'a'.repeat(64),
    applications: [
      { application_id: 'origo', completion_state: 'INCOMPLETE' },
      { application_id: 'nexo', completion_state: 'COMPLETE_EXPLICIT_SCOPE' },
    ],
    metrics: {
      applications: 2,
      package_closure_counts: { CLOSED: 1, OPEN: 1 },
      relationship_counts: {
        PRERREQUISITO_DE: 1,
        IMPLEMENTADO_POR: 2,
        CONSUMIDO_POR: 3,
        EVIDENCIADO_POR: 4,
        CIERRA_CRITERIO_DE: 1,
      },
      packages_with_unresolved_consumers: 1,
      acceptance_criteria_total: 5,
      acceptance_criteria_explicitly_closed: 3,
      acceptance_criteria_unknown: 2,
    },
  };

  const audit = buildPackageThroughputAudit({
    registry,
    policy: { mode: 'DETERMINISTIC_LINEAR_TOPOLOGICAL' },
    applicationClosure,
  });

  assert.equal(audit.canonical_gap_packages, 2);
  assert.equal(audit.dependency_edges, 1);
  assert.equal(audit.graph_roots, 1);
  assert.equal(audit.supabase_mutation_required, 1);
  assert.equal(audit.parallel_execution_authorized, false);
  assert.equal(audit.application_closure_available, true);
  assert.equal(audit.application_closure_model_id, 'VENTO-PACKAGE-APPLICATION-CLOSURE-V1');
  assert.equal(audit.application_closure_fingerprint_sha256, 'a'.repeat(64));
  assert.equal(audit.application_count, 2);
  assert.deepEqual(audit.package_closure_counts, { CLOSED: 1, OPEN: 1 });
  assert.deepEqual(audit.application_completion_counts, {
    COMPLETE_EXPLICIT_SCOPE: 1,
    INCOMPLETE: 1,
  });
  assert.equal(audit.packages_with_unresolved_consumers, 1);
  assert.equal(audit.acceptance_criteria_total, 5);
  assert.equal(audit.acceptance_criteria_explicitly_closed, 3);
  assert.equal(audit.acceptance_criteria_unknown, 2);
  assert.deepEqual(audit.application_relationship_counts, {
    PRERREQUISITO_DE: 1,
    IMPLEMENTADO_POR: 2,
    CONSUMIDO_POR: 3,
    EVIDENCIADO_POR: 4,
    CIERRA_CRITERIO_DE: 1,
  });
  assert.equal(audit.execution_policy, 'DETERMINISTIC_LINEAR_TOPOLOGICAL');
  assert.equal(audit.distinct_target_paths, 2);
  assert.equal(audit.shared_target_paths, 1);
  assert.equal(audit.max_packages_per_target_path, 2);
  assert.deepEqual(audit.top_shared_targets, [
    { target_path: 'supabase/functions/a/index.ts', package_count: 2 },
  ]);
});

test('no infiere cierre por aplicacion si la proyeccion no fue suministrada', () => {
  const audit = buildPackageThroughputAudit({
    registry: { packages: [] },
    policy: { mode: 'DETERMINISTIC_LINEAR_TOPOLOGICAL' },
  });

  assert.equal(audit.parallel_execution_authorized, false);
  assert.equal(audit.application_closure_available, false);
  assert.equal(audit.application_closure_model_id, null);
  assert.equal(audit.package_closure_counts, null);
  assert.equal(audit.application_completion_counts, null);
  assert.equal(audit.application_relationship_counts, null);
});
