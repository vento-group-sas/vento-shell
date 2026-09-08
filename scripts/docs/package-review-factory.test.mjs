import assert from 'node:assert/strict';
import test from 'node:test';

import {
  analyzePackage,
  compactMarkdownForBudget,
  buildCanonicalGapRoutingIndex,
  buildCrossPackageIndexes,
  buildFactoryFromPackages,
  canonicalTaskSectionsFromSource,
  normalizeReviewPackage,
  parseCanonicalGapRouting,
  parseTaskTreqDeclaration,
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
          source: `docs/${taskId}.md`,
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

test('compactMarkdownForBudget aplica un limite duro incluso al primer dossier', () => {
  const result = compactMarkdownForBudget('x'.repeat(20000), 5000);

  assert.equal(result.truncated, true);
  assert.equal(result.original_chars, 20000);
  assert.ok(result.markdown.length <= 5000);
  assert.match(result.markdown, /BATCH_EVIDENCE_TRUNCATED/u);
});

test('factory no duplica texto canónico completo dentro del dossier y batch respeta presupuesto', () => {
  const taskIds = Array.from({ length: 120 }, (_, index) => `TASK-X-${String(index + 1).padStart(3, '0')}`);
  const taskSectionIndex = new Map(taskIds.map((taskId) => [taskId, {
    task_id: taskId,
    source_path: `docs/${taskId}.md`,
    source_blob_sha: 'a'.repeat(40),
    text: `## ${taskId}\n${'evidence '.repeat(2000)}`,
    text_sha256: 'b'.repeat(64),
    truncated: true,
    original_chars: 18000,
  }]));

  const sourceManifest = {
    generated_from_head: 'a'.repeat(40),
  };

  const built = buildFactoryFromPackages({
    rawPackages: [
      rawPackage({
        id: 'GAP-PKG-001',
        layer: 0,
        primary: taskIds,
        dominant: taskIds[0],
      }),
    ],
    taskSectionIndex,
    sourceManifest,
    generatedAt: '2026-09-07T20:00:00Z',
  });

  const evidence = built.dossiers[0].source_evidence.tasks[0];
  assert.equal(Object.hasOwn(evidence, 'text'), false);
  assert.equal(evidence.text_present, true);
  assert.ok(evidence.preview.length <= 160);

  const batch = selectReviewBatch({
    dossiers: built.dossiers,
    ledger: built.ledger,
    size: 1,
    maxChars: 5000,
  });

  assert.equal(batch.selected.length, 1);
  assert.ok(batch.selected[0].markdown.length <= batch.per_package_budget);
  assert.ok(batch.used_chars <= batch.content_budget);
});

test('routing canónico recupera gap_id, primaria y soporte por package', () => {
  const source = [
    '#### 9. Matriz completa brecha → tarea → paquete',
    '',
    '| Registro | Referencia representativa | Brecha resumida | Clase | Capacidad / proceso | Propietario / fecha | Tarea primaria | Tareas de soporte | Paquete | Confianza |',
    '| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |',
    '| `H-CODE-001-001` | `CODE-AUD-001` | Falta A | `TECNICA` | `CAP-01.01` | `OWN / 2026-01-01` | `TASK-A-001` | `TASK-S-001`; `TASK-S-002` | `GAP-PKG-001` | `ALTA` |',
    '',
    '### B. Nuevas brechas canónicas',
    '',
    '| Gap ID | Fuente | Clase | Criticidad | Capacidad | Proceso/alcance | Hallazgo canónico | Propietario | Fecha | Tarea primaria | Tareas de soporte | Paquete | Perfil | Evidencia | Revisor | Estado |',
    '| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |',
    '| `H-PROC-001-001` | `PROC-COVER-010` | `FUNCIONAL` | `HIGH` | `CAP-02.01` | `VPROC-0002` | Falta B | `OWN` | `2026-01-02` | `TASK-B-001` | `TASK-S-003` | `GAP-PKG-002` | `P1` | `EVID` | `REV` | `ABIERTA` |',
    '',
  ].join('\n');

  const rows = parseCanonicalGapRouting(
    source,
    'docs/plan-canonico/modular/bloques/E1_DESCUBRIMIENTO_OPERATIVO/07_REGISTRO_CANONICO_DE_BRECHAS.md',
  );

  assert.equal(rows.length, 2);
  assert.equal(rows[0].gap_id, 'H-CODE-001-001');
  assert.equal(rows[0].package_id, 'GAP-PKG-001');
  assert.deepEqual(rows[0].primary_task_ids, ['TASK-A-001']);
  assert.deepEqual(rows[0].support_task_ids, ['TASK-S-001', 'TASK-S-002']);
  assert.equal(rows[1].gap_id, 'H-PROC-001-001');
  assert.equal(rows[1].package_id, 'GAP-PKG-002');
  assert.deepEqual(rows[1].support_task_ids, ['TASK-S-003']);
});

test('factory usa routing canónico como gap_ids y bloquea conteos incoherentes', () => {
  const routingRows = [{
    gap_id: 'H-CODE-001-001',
    package_id: 'GAP-PKG-001',
    source_kind: 'HISTORICAL',
    source_path: 'routing.md',
    source_line: 5,
    row_sha256: 'a'.repeat(64),
    reference: 'CODE-AUD-001',
    class: 'TECNICA',
    context: 'CAP-01.01',
    summary: 'Falta A',
    confidence: 'ALTA',
    primary_task_ids: ['TASK-A-001'],
    support_task_ids: ['TASK-S-001'],
  }];

  const raw = rawPackage({
    id: 'GAP-PKG-001',
    layer: 0,
    primary: ['TASK-A-001'],
    support: ['TASK-S-001'],
    dominant: 'TASK-A-001',
    gaps: [],
  });
  raw.gap_membership_count = 1;

  const normalized = normalizeReviewPackage(raw, routingRows);
  assert.deepEqual(normalized.gap_ids, ['H-CODE-001-001']);
  assert.equal(normalized.gap_routing_resolved, true);

  const indexes = buildCrossPackageIndexes([normalized]);
  const analyzed = analyzePackage(normalized, indexes);
  assert.equal(
    analyzed.anomalies.some(({ code }) => code === 'GAP_ROUTING_COUNT_MISMATCH'),
    false,
  );

  const bad = normalizeReviewPackage(
    { ...raw, gap_membership_count: 2 },
    routingRows,
  );
  const badResult = analyzePackage(
    bad,
    buildCrossPackageIndexes([bad]),
  );
  assert.equal(
    badResult.anomalies.some(
      ({ code, severity }) => code === 'GAP_ROUTING_COUNT_MISMATCH' && severity === 'BLOCKING',
    ),
    true,
  );
});

test('primary/support overlap permanece REVIEW cuando el routing es válido', () => {
  const routingRows = [
    {
      gap_id: 'H-CODE-001-001',
      package_id: 'GAP-PKG-001',
      source_kind: 'HISTORICAL',
      source_path: 'routing.md',
      source_line: 5,
      row_sha256: 'a'.repeat(64),
      primary_task_ids: ['TASK-A-001'],
      support_task_ids: ['TASK-X-001'],
    },
    {
      gap_id: 'H-CODE-001-002',
      package_id: 'GAP-PKG-001',
      source_kind: 'HISTORICAL',
      source_path: 'routing.md',
      source_line: 6,
      row_sha256: 'b'.repeat(64),
      primary_task_ids: ['TASK-X-001'],
      support_task_ids: [],
    },
  ];

  const raw = rawPackage({
    id: 'GAP-PKG-001',
    layer: 0,
    primary: ['TASK-A-001', 'TASK-X-001'],
    support: ['TASK-X-001'],
    dominant: 'TASK-A-001',
  });
  raw.gap_membership_count = 2;

  const normalized = normalizeReviewPackage(raw, routingRows);
  const analyzed = analyzePackage(
    normalized,
    buildCrossPackageIndexes([normalized]),
  );

  const overlap = analyzed.anomalies.find(
    ({ code }) => code === 'PRIMARY_SUPPORT_OVERLAP',
  );

  assert.equal(overlap?.severity, 'REVIEW');
  assert.equal(
    analyzed.anomalies.some(({ severity }) => severity === 'BLOCKING'),
    false,
  );
});

test('routing index conserva todas las filas de cada package', () => {
  const index = buildCanonicalGapRoutingIndex([
    { package_id: 'GAP-PKG-001', gap_id: 'H-002' },
    { package_id: 'GAP-PKG-001', gap_id: 'H-001' },
    { package_id: 'GAP-PKG-002', gap_id: 'H-003' },
  ]);

  assert.deepEqual(
    index.get('GAP-PKG-001').map(({ gap_id: gapId }) => gapId),
    ['H-001', 'H-002'],
  );
  assert.equal(index.get('GAP-PKG-002').length, 1);
});

test('evidencia de tarea ignora headings históricos dentro de fences', () => {
  const source = [
    'Texto histórico.',
    '```md',
    '### [ ] SHELL-AUD-011 — Propuesta histórica',
    'No debe ser seleccionada.',
    '```',
    '',
    '### ✅ SHELL-AUD-011 — Tarea canónica aprobada',
    '',
    '**Estado:** APROBADA',
    '',
    'Contenido vigente.',
    '',
  ].join('\n');

  const sections = canonicalTaskSectionsFromSource(
    source,
    ['SHELL-AUD-011'],
  );

  const section = sections.get('SHELL-AUD-011');
  assert.ok(section);
  assert.match(section.text, /Tarea canónica aprobada/u);
  assert.doesNotMatch(section.text, /Propuesta histórica/u);
});

test('routing conserva delimitadores ante backtick no cerrado en extracto truncado', () => {
  const source = [
    '#### 9. Matriz completa brecha → tarea → paquete',
    '',
    '| Registro | Referencia representativa | Brecha resumida | Clase | Capacidad / proceso | Propietario / fecha | Tarea primaria | Tareas de soporte | Paquete | Confianza |',
    '| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |',
    '| `H-CODE-001-001` | `CODE-AUD-001` | Extracto truncado con `campo sin cierre... | `TECNICA` | `CAP-01.01` | `OWN / 2026-01-01` | `TASK-A-001` | `TASK-S-001` | `GAP-PKG-001` | `ALTA` |',
    '',
    '### B. Nuevas brechas canónicas',
    '',
    '| Gap ID | Fuente | Clase | Criticidad | Capacidad | Proceso/alcance | Hallazgo canónico | Propietario | Fecha | Tarea primaria | Tareas de soporte | Paquete | Perfil | Evidencia | Revisor | Estado |',
    '| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |',
    '| `H-PROC-001-001` | `PROC-COVER-010` | `FUNCIONAL` | `HIGH` | `CAP-02.01` | `VPROC-0002` | Falta B | `OWN` | `2026-01-02` | `TASK-B-001` | `TASK-S-002` | `GAP-PKG-002` | `P1` | `EVID` | `REV` | `ABIERTA` |',
    '',
  ].join('\n');

  const rows = parseCanonicalGapRouting(source, 'routing.md');

  assert.equal(rows.length, 2);
  assert.equal(rows[0].package_id, 'GAP-PKG-001');
  assert.deepEqual(rows[0].primary_task_ids, ['TASK-A-001']);
  assert.deepEqual(rows[0].support_task_ids, ['TASK-S-001']);
});

test('TREQ solo se extrae desde Requisitos de prueba derivados', () => {
  const block = [
    '### ✅ INT-DB-008 — Tarea',
    '',
    '**Requisitos de prueba creados o modificados:** 0',
    '',
    'Texto general que menciona TREQ-INTEGRATION-004 y TREQ-INTEGRATION-006.',
    '',
    '#### 9. Requisitos de prueba derivados',
    '',
    '**Resultado:** NO GENERA REQUISITOS DE PRUEBA',
    '',
    '#### 10. Continuidad',
    '',
  ].join('\n');

  const declaration = parseTaskTreqDeclaration(block);

  assert.equal(declaration.declared_count, 0);
  assert.deepEqual(declaration.ids, []);
  assert.equal(declaration.consistent, true);
});

test('TREQ NO GENERA ignora referencias de cobertura existente dentro de la seccion derivada', () => {
  const fixtures = [
    {
      taskId: 'TI-UX-003',
      ids: [
        'TREQ-NEXO-019',
        'TREQ-PROC-457',
        'TREQ-PROC-461',
        'TREQ-PROC-500',
        'TREQ-UX-003',
        'TREQ-UX-005',
        'TREQ-UX-010',
        'TREQ-VISO-002',
      ],
    },
    {
      taskId: 'INFO-DOM-001',
      ids: [
        'TREQ-ANIMA-005',
        'TREQ-INTEGRATION-021',
        'TREQ-PASS-012',
        'TREQ-SHELL-011',
        'TREQ-SUPABASE-013',
        'TREQ-VISO-003',
      ],
    },
    {
      taskId: 'SHELL-CON-010',
      ids: [
        'TREQ-PROC-038',
        'TREQ-PROC-052',
        'TREQ-SHELL-002',
        'TREQ-SHELL-006',
        'TREQ-SHELL-008',
      ],
    },
    {
      taskId: 'SHELL-UI-001',
      ids: [
        'TREQ-SHELL-002',
        'TREQ-SHELL-006',
        'TREQ-SHELL-007',
        'TREQ-SHELL-008',
        'TREQ-SHELL-029',
        'TREQ-SHELL-030',
        'TREQ-SHELL-031',
        'TREQ-SHELL-032',
        'TREQ-SHELL-035',
        'TREQ-SHELL-036',
      ],
    },
  ];

  for (const fixture of fixtures) {
    const block = [
      `### ✅ ${fixture.taskId} — Tarea`,
      '',
      '**Requisitos de prueba creados o modificados:** 0',
      '',
      '#### 7. Requisitos de prueba derivados',
      '',
      '**Resultado:** NO GENERA REQUISITOS DE PRUEBA',
      '',
      `**Justificación:** cobertura vigente: ${fixture.ids.map((id) => `\`${id}\``).join(', ')}.`,
      '',
      '#### 8. Evidencia',
      '',
    ].join('\n');

    const declaration = parseTaskTreqDeclaration(block);

    assert.equal(declaration.declared_count, 0, fixture.taskId);
    assert.deepEqual(declaration.ids, [], fixture.taskId);
    assert.equal(declaration.consistent, true, fixture.taskId);
    assert.equal(declaration.detail, 'PASS', fixture.taskId);
  }
});

test('TREQ NO GENERA sigue fallando si la cabecera declara cambios', () => {
  const block = [
    '### ✅ TEST-TASK-001 — Tarea',
    '',
    '**Requisitos de prueba creados o modificados:** 1',
    '',
    '#### 7. Requisitos de prueba derivados',
    '',
    '**Resultado:** NO GENERA REQUISITOS DE PRUEBA',
    '',
    'Justificación con referencia existente `TREQ-SHELL-001`.',
    '',
    '#### 8. Evidencia',
    '',
  ].join('\n');

  const declaration = parseTaskTreqDeclaration(block);

  assert.equal(declaration.declared_count, 1);
  assert.deepEqual(declaration.ids, []);
  assert.equal(declaration.consistent, false);
  assert.equal(declaration.detail, 'DECLARED_1_BUT_SECTION_NO_GENERA');
});

test('TREQ derivados valida conteo declarado y conserva IDs', () => {
  const block = [
    '### ✅ TEST-TASK-001 — Tarea',
    '',
    '**Requisitos de prueba creados o modificados:** 2',
    '',
    '#### 7. Requisitos de prueba derivados',
    '',
    '- `TREQ-SHELL-001`',
    '- `TREQ-SHELL-002`',
    '',
    '#### 8. Evidencia',
    '',
  ].join('\n');

  const declaration = parseTaskTreqDeclaration(block);

  assert.equal(declaration.declared_count, 2);
  assert.deepEqual(declaration.ids, ['TREQ-SHELL-001', 'TREQ-SHELL-002']);
  assert.equal(declaration.consistent, true);
});

test('TREQ derivados marca mismatch sin convertirlo en fallo del parser', () => {
  const block = [
    '### ✅ TEST-TASK-001 — Tarea',
    '',
    '**Requisitos de prueba creados o modificados:** 2',
    '',
    '#### 7. Requisitos de prueba derivados',
    '',
    '- `TREQ-SHELL-001`',
    '',
    '#### 8. Evidencia',
    '',
  ].join('\n');

  const declaration = parseTaskTreqDeclaration(block);

  assert.equal(declaration.declared_count, 2);
  assert.deepEqual(declaration.ids, ['TREQ-SHELL-001']);
  assert.equal(declaration.consistent, false);
  assert.match(declaration.detail, /DECLARED_2_RESOLVED_1/u);
});

test('support de tabla de paquetes nuevos no se compara contra fila de membership', () => {
  const membershipRows = [{
    gap_id: 'H-PROC-COVER-010-001',
    package_id: 'GAP-PKG-202',
    source_kind: 'APPEND_ONLY',
    source_path: 'routing.md',
    source_line: 10,
    row_sha256: 'a'.repeat(64),
    primary_task_ids: ['INFO-DOM-012'],
    support_task_ids: [],
  }];

  const raw = rawPackage({
    id: 'GAP-PKG-202',
    layer: 0,
    primary: ['INFO-DOM-012'],
    support: ['DATA-DOM-004', 'DATA-DOM-015', 'READY-GATE-014'],
    dominant: 'INFO-DOM-012',
  });
  raw.gap_membership_count = 1;

  const normalized = normalizeReviewPackage(
    raw,
    membershipRows,
    {
      primary_task_ids: ['INFO-DOM-012'],
      support_task_ids: ['READY-GATE-014', 'DATA-DOM-004', 'DATA-DOM-015'],
    },
  );

  const analyzed = analyzePackage(
    normalized,
    buildCrossPackageIndexes([normalized]),
  );

  assert.equal(
    analyzed.anomalies.some(
      ({ code }) => code === 'ROUTING_SUPPORT_TASK_PROJECTION_MISMATCH',
    ),
    false,
  );
  assert.equal(normalized.task_routing_resolved, true);
});

test('TREQ SHELL-UI-001 reconoce declaración narrativa real de cero cambios', () => {
  const block = [
    '### ✅ SHELL-UI-001 — Crear @vento/ui-web',
    '',
    '**Requisitos de prueba creados o modificados:** 0',
    '',
    '#### 40. Requisitos de prueba derivados',
    '',
    '`SHELL-UI-001` crea **0** requisitos `TREQ-*` y modifica **0** requisitos existentes.',
    '',
    'Justificación:',
    '',
    '- `TREQ-SHELL-002` ya protege la obligación compartida;',
    '- `TREQ-SHELL-006` ya exige pruebas del package;',
    '- `TREQ-SHELL-029` conserva el template como fuente histórica.',
    '',
    '#### 41. Evidencia de validación',
    '',
  ].join('\n');

  const declaration = parseTaskTreqDeclaration(block);

  assert.equal(declaration.declared_count, 0);
  assert.deepEqual(declaration.ids, []);
  assert.equal(declaration.consistent, true);
  assert.equal(declaration.detail, 'PASS');
});

test('TREQ INT-EXT-002 reconoce declaración real NO GENERA sin etiqueta Resultado', () => {
  const block = [
    '### ✅ INT-EXT-002 — Definir principal técnico independiente por integración',
    '',
    '**Requisitos de prueba creados o modificados:** 0',
    '',
    '#### 18. Requisitos de prueba derivados',
    '',
    '**NO GENERA REQUISITOS DE PRUEBA.**',
    '',
    'Justificación: cobertura existente `TREQ-AUTH-015`, `TREQ-AUTH-021`, `TREQ-INTEGRATION-020`, `TREQ-SUPABASE-866`.',
    '',
    '#### 19. Evidencia de validación',
    '',
  ].join('\n');

  const declaration = parseTaskTreqDeclaration(block);

  assert.equal(declaration.declared_count, 0);
  assert.deepEqual(declaration.ids, []);
  assert.equal(declaration.consistent, true);
  assert.equal(declaration.detail, 'PASS');
});

test('TREQ cero explícito por creados y modificados ignora referencias de cobertura', () => {
  const block = [
    '### ✅ TEST-TASK-001 — Tarea',
    '',
    '**Requisitos de prueba creados o modificados:** 0',
    '',
    '#### 7. Requisitos de prueba derivados',
    '',
    '**Requisitos creados:** **0**',
    '**Requisitos modificados:** **0**',
    '',
    'Cobertura ya vigente: `TREQ-SHELL-001`, `TREQ-SHELL-002`.',
    '',
    '#### 8. Evidencia',
    '',
  ].join('\n');

  const declaration = parseTaskTreqDeclaration(block);

  assert.equal(declaration.declared_count, 0);
  assert.deepEqual(declaration.ids, []);
  assert.equal(declaration.consistent, true);
  assert.equal(declaration.detail, 'PASS');
});

test('TREQ variantes reales de cero cambios siguen fallando cerrado si la cabecera declara cambios', () => {
  const fixtures = [
    [
      '**NO GENERA REQUISITOS DE PRUEBA.**',
      'Cobertura existente `TREQ-SHELL-001`.',
    ],
    [
      '`TEST-TASK-001` crea **0** requisitos `TREQ-*` y modifica **0** requisitos existentes.',
      'Cobertura existente `TREQ-SHELL-001`.',
    ],
    [
      '**Requisitos creados:** **0**',
      '**Requisitos modificados:** **0**',
      'Cobertura existente `TREQ-SHELL-001`.',
    ],
  ];

  for (const sectionLines of fixtures) {
    const block = [
      '### ✅ TEST-TASK-001 — Tarea',
      '',
      '**Requisitos de prueba creados o modificados:** 1',
      '',
      '#### 7. Requisitos de prueba derivados',
      '',
      ...sectionLines,
      '',
      '#### 8. Evidencia',
      '',
    ].join('\n');

    const declaration = parseTaskTreqDeclaration(block);

    assert.equal(declaration.declared_count, 1);
    assert.deepEqual(declaration.ids, []);
    assert.equal(declaration.consistent, false);
    assert.equal(declaration.detail, 'DECLARED_1_BUT_SECTION_NO_GENERA');
  }
});