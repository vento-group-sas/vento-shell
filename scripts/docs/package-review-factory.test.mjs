import assert from 'node:assert/strict';
import test from 'node:test';

import {
  analyzePackage,
  buildCrossPackageIndexes,
  buildFactoryFromPackages,
  normalizeReviewPackage,
  selectReviewBatch,
  validateReviewReceipt,
} from './package-review-factory.mjs';

function rawPackage({
  id,
  layer,
  dependencies = [],
  primary = [],
  support = [],
  dominant = null,
  targets = [],
  gaps = [],
  supabase = false,
} = {}) {
  return {
    package_id: id,
    source_kind: 'CANONICAL_GAP_PACKAGE',
    status: 'COMPILED',
    status_scope: 'DOCUMENTARY_READINESS',
    primary_task_ids: primary,
    support_task_ids: support,
    dominant_task_id: dominant,
    gap_ids_sampled_from_deliv_pkg_002: gaps,
    gap_membership_count: gaps.length,
    task_prerequisites: {
      progress_percent: 100,
      missing_task_ids: [],
      tasks: [...new Set([...primary, ...support, dominant].filter(Boolean))]
        .map((taskId) => ({
          task_id: taskId,
          state: 'APROBADA',
        })),
    },
    repository_owner: 'vento-shell',
    runtime_profile: supabase ? 'SUPABASE' : 'SHELL',
    execution: {
      layer,
      depends_on_package_ids: dependencies,
      deferred: false,
    },
    execution_requirements: {
      supabase_mutation_required: supabase,
      target_paths: targets,
    },
  };
}

test('normaliza package sin depender de campos opcionales', () => {
  const normalized = normalizeReviewPackage(rawPackage({
    id: 'GAP-PKG-001',
    layer: 0,
    primary: ['AUTH-DB-003'],
    support: ['AUTH-DB-005'],
    dominant: 'AUTH-DB-003',
    targets: ['supabase/functions/a/index.ts'],
    gaps: ['H-CODE-017-016'],
    supabase: true,
  }));

  assert.equal(normalized.package_id, 'GAP-PKG-001');
  assert.deepEqual(normalized.primary_task_ids, ['AUTH-DB-003']);
  assert.deepEqual(normalized.support_task_ids, ['AUTH-DB-005']);
  assert.deepEqual(normalized.gap_ids, ['H-CODE-017-016']);
  assert.equal(normalized.execution.layer, 0);
  assert.equal(normalized.execution_requirements.supabase_mutation_required, true);
});

test('detecta dependencia inexistente e inversion topologica', () => {
  const packages = [
    normalizeReviewPackage(rawPackage({
      id: 'GAP-PKG-001',
      layer: 1,
      dependencies: ['GAP-PKG-002', 'GAP-PKG-999'],
      primary: ['TASK-A-001'],
      dominant: 'TASK-A-001',
    })),
    normalizeReviewPackage(rawPackage({
      id: 'GAP-PKG-002',
      layer: 1,
      primary: ['TASK-B-001'],
      dominant: 'TASK-B-001',
    })),
  ];

  const indexes = buildCrossPackageIndexes(packages);
  const result = analyzePackage(packages[0], indexes);
  const codes = result.anomalies.map(({ code }) => code);

  assert.ok(codes.includes('MISSING_DEPENDENCY_PACKAGE'));
  assert.ok(codes.includes('DEPENDENCY_LAYER_INVERSION'));
});

test('detecta overlaps de target, primaria y gap como REVIEW', () => {
  const packages = [
    normalizeReviewPackage(rawPackage({
      id: 'GAP-PKG-001',
      layer: 0,
      primary: ['AUTH-DB-003'],
      dominant: 'AUTH-DB-003',
      targets: ['supabase/functions/a/index.ts'],
      gaps: ['H-CODE-017-016'],
    })),
    normalizeReviewPackage(rawPackage({
      id: 'GAP-PKG-002',
      layer: 1,
      dependencies: ['GAP-PKG-001'],
      primary: ['AUTH-DB-003'],
      dominant: 'AUTH-DB-004',
      targets: ['supabase/functions/a/index.ts'],
      gaps: ['H-CODE-017-016'],
    })),
  ];

  const indexes = buildCrossPackageIndexes(packages);
  const result = analyzePackage(packages[0], indexes);
  const codes = new Set(result.anomalies.map(({ code }) => code));

  assert.equal(codes.has('SHARED_TARGET_PATH'), true);
  assert.equal(codes.has('SHARED_PRIMARY_TASK'), true);
  assert.equal(codes.has('SHARED_GAP_MEMBERSHIP'), true);
  assert.equal(
    result.anomalies
      .filter(({ code }) => code.startsWith('SHARED_'))
      .every(({ severity }) => severity === 'REVIEW'),
    true,
  );
});

test('build preserva review solo si fingerprint permanece igual y marca STALE si cambia', () => {
  const sourceManifest = {
    generated_from_head: 'a'.repeat(40),
  };

  const first = buildFactoryFromPackages({
    rawPackages: [
      rawPackage({
        id: 'GAP-PKG-001',
        layer: 0,
        primary: ['AUTH-DB-003'],
        dominant: 'AUTH-DB-003',
      }),
    ],
    sourceManifest,
    generatedAt: '2026-09-07T20:00:00Z',
  });

  const fingerprint = first.dossiers[0].review_fingerprint;

  const reviewedLedger = {
    schema_version: 1,
    factory_id: 'VENTO-PACKAGE-REVIEW-FACTORY-V1',
    packages: [
      {
        package_id: 'GAP-PKG-001',
        review_fingerprint: fingerprint,
        status: 'PASS',
        decision: 'PASS',
        reviewed_at: '2026-09-07T20:01:00Z',
        summary: 'coherente',
        issues: [],
      },
    ],
  };

  const unchanged = buildFactoryFromPackages({
    rawPackages: [
      rawPackage({
        id: 'GAP-PKG-001',
        layer: 0,
        primary: ['AUTH-DB-003'],
        dominant: 'AUTH-DB-003',
      }),
    ],
    sourceManifest,
    previousLedger: reviewedLedger,
    generatedAt: '2026-09-07T20:02:00Z',
  });

  assert.equal(unchanged.ledger.packages[0].status, 'PASS');

  const changed = buildFactoryFromPackages({
    rawPackages: [
      rawPackage({
        id: 'GAP-PKG-001',
        layer: 0,
        primary: ['AUTH-DB-003'],
        dominant: 'AUTH-DB-003',
        targets: ['src/new-surface.ts'],
      }),
    ],
    sourceManifest,
    previousLedger: reviewedLedger,
    generatedAt: '2026-09-07T20:03:00Z',
  });

  assert.equal(changed.ledger.packages[0].status, 'STALE');
  assert.equal(changed.ledger.packages[0].decision, null);
});

test('batch prioriza STALE y anomalies sin superar size', () => {
  const sourceManifest = {
    generated_from_head: 'a'.repeat(40),
  };

  const built = buildFactoryFromPackages({
    rawPackages: [
      rawPackage({
        id: 'GAP-PKG-001',
        layer: 0,
        primary: ['TASK-A-001'],
        dominant: 'TASK-A-001',
      }),
      rawPackage({
        id: 'GAP-PKG-002',
        layer: 1,
        dependencies: ['GAP-PKG-001'],
        primary: ['TASK-B-001'],
        dominant: 'TASK-B-001',
      }),
    ],
    sourceManifest,
    generatedAt: '2026-09-07T20:00:00Z',
  });

  built.ledger.packages[1].status = 'STALE';

  const batch = selectReviewBatch({
    dossiers: built.dossiers,
    ledger: built.ledger,
    size: 1,
    maxChars: 100000,
  });

  assert.equal(batch.selected.length, 1);
  assert.equal(batch.selected[0].dossier.package_id, 'GAP-PKG-002');
});

test('receipt exige fingerprint vigente y evidencia para contradiccion', () => {
  const sourceManifest = {
    generated_from_head: 'a'.repeat(40),
  };

  const built = buildFactoryFromPackages({
    rawPackages: [
      rawPackage({
        id: 'GAP-PKG-001',
        layer: 0,
        primary: ['TASK-A-001'],
        dominant: 'TASK-A-001',
      }),
    ],
    sourceManifest,
    generatedAt: '2026-09-07T20:00:00Z',
  });

  const dossier = built.dossiers[0];

  assert.equal(
    validateReviewReceipt({
      dossiers: built.dossiers,
      receipt: {
        schema_version: 1,
        factory_id: 'VENTO-PACKAGE-REVIEW-FACTORY-V1',
        reviews: [
          {
            package_id: 'GAP-PKG-001',
            review_fingerprint: dossier.review_fingerprint,
            decision: 'PASS',
            summary: 'Sin contradicción.',
            issues: [],
          },
        ],
      },
    }),
    true,
  );

  assert.throws(
    () => validateReviewReceipt({
      dossiers: built.dossiers,
      receipt: {
        schema_version: 1,
        factory_id: 'VENTO-PACKAGE-REVIEW-FACTORY-V1',
        reviews: [
          {
            package_id: 'GAP-PKG-001',
            review_fingerprint: 'b'.repeat(64),
            decision: 'PASS',
            summary: 'stale',
            issues: [],
          },
        ],
      },
    }),
    /STALE/u,
  );

  assert.throws(
    () => validateReviewReceipt({
      dossiers: built.dossiers,
      receipt: {
        schema_version: 1,
        factory_id: 'VENTO-PACKAGE-REVIEW-FACTORY-V1',
        reviews: [
          {
            package_id: 'GAP-PKG-001',
            review_fingerprint: dossier.review_fingerprint,
            decision: 'CONTRADICTION',
            summary: 'Hay contradicción.',
            issues: [],
          },
        ],
      },
    }),
    /CONTRADICTION exige/u,
  );
});
