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

  const audit = buildPackageThroughputAudit({
    registry,
    policy: { mode: 'DETERMINISTIC_LINEAR_TOPOLOGICAL' },
  });

  assert.equal(audit.canonical_gap_packages, 2);
  assert.equal(audit.dependency_edges, 1);
  assert.equal(audit.graph_roots, 1);
  assert.equal(audit.supabase_mutation_required, 1);
  assert.equal(audit.parallel_execution_authorized, false);
  assert.equal(audit.execution_policy, 'DETERMINISTIC_LINEAR_TOPOLOGICAL');
  assert.equal(audit.distinct_target_paths, 2);
  assert.equal(audit.shared_target_paths, 1);
  assert.equal(audit.max_packages_per_target_path, 2);
  assert.deepEqual(audit.top_shared_targets, [
    { target_path: 'supabase/functions/a/index.ts', package_count: 2 },
  ]);
});
