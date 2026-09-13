import assert from 'node:assert/strict';
import test from 'node:test';

import {
  buildStructuralBaseline,
  classifyComplexity,
  compactTaskBlock,
  taskStructureProfile,
  titleKeywords,
  validateAuthorizationForPhase2,
} from './night-documentation-context.mjs';

test('extrae palabras clave útiles y elimina stop words', () => {
  const keywords = titleKeywords('Separar identidad permanente del contenedor físico e identidad temporal o persistente del LPN');
  assert.ok(keywords.includes('identidad'));
  assert.ok(keywords.includes('contenedor'));
  assert.ok(keywords.includes('lpn'));
  assert.ok(!keywords.includes('del'));
  assert.ok(!keywords.includes('separar'));
});

test('clasifica sustantivo por defecto y escala riesgos críticos', () => {
  assert.equal(classifyComplexity({
    task: { id: 'NEXO-DOM-019', title: 'Separar identidad permanente del contenedor y LPN', relativePath: 'bloques/K_NEXO/a.md' },
    relatedCount: 6,
  }), 'SUBSTANTIVE');
  assert.equal(classifyComplexity({
    task: { id: 'SUPA-TRANS-001', title: 'Definir migración RLS y backfill', relativePath: 'bloques/E3_SUPABASE/a.md' },
    relatedCount: 2,
  }), 'COMPLEX');
  assert.equal(classifyComplexity({
    task: { id: 'X-001', title: 'Inventariar nombres vigentes', relativePath: 'bloques/X/a.md' },
    relatedCount: 2,
  }), 'ROUTINE');
});

test('compacta task block conservando metadata y ventanas semánticas', () => {
  const block = `### ✅ X-001 — Título\n\n**Estado:** APROBADA\n---\n\n#### Propósito\nIdentidad LPN.\n\n#### Límites\nNo cambia contenedor.\n`;
  const excerpt = compactTaskBlock(block, ['identidad', 'lpn', 'contenedor'], 5000);
  assert.match(excerpt, /Estado/u);
  assert.match(excerpt, /Identidad LPN/u);
  assert.match(excerpt, /contenedor/u);
});

test('FASE 2 exige autorización explícita, no física, vigente y dentro del mismo bloque', () => {
  const authorization = {
    status: 'AUTHORIZED',
    lane: 'DOCUMENTATION',
    physical_authorization: { granted: false, scope: 'NONE' },
    phase_2_capabilities: {
      author_review_enabled: true,
      repository_mutation_enabled: false,
    },
    limits: { cutoff_utc: '2026-09-14T05:00:00.000Z' },
    start_scope: {
      route_id: 'NORMAL-CANONICAL-FLOW-001',
      sequence_id: 'PHASE-05-NEXO',
      block_code: 'BLOQUE K',
    },
  };
  const preflight = {
    task: { current: true, id: 'NEXO-DOM-019' },
    continuity: { route: 'NORMAL-CANONICAL-FLOW-001', sequence: 'PHASE-05-NEXO' },
    blockers: [],
  };
  const activeSequence = { block_code: 'BLOQUE K' };
  assert.equal(validateAuthorizationForPhase2({
    authorization,
    preflight,
    activeSequence,
    now: new Date('2026-09-13T05:00:00.000Z'),
  }), true);
  assert.throws(() => validateAuthorizationForPhase2({
    authorization: { ...authorization, phase_2_capabilities: { ...authorization.phase_2_capabilities, author_review_enabled: false } },
    preflight,
    activeSequence,
    now: new Date('2026-09-13T05:00:00.000Z'),
  }), /no habilita FASE 2/u);
  assert.throws(() => validateAuthorizationForPhase2({
    authorization,
    preflight,
    activeSequence: { block_code: 'BLOQUE L' },
    now: new Date('2026-09-13T05:00:00.000Z'),
  }), /cruzó de bloque/u);
});

test('baseline estructural toma los tres predecesores aprobados inmediatos del mismo owner', () => {
  const owner = 'bloques/K_NEXO/02_DOMINIO_DE_INVENTARIO_LOGISTICA_Y_ACTIVOS.md';
  const makeBlock = (id, count) => [
    `### ✅ ${id} — Referencia`,
    '**Estado:** APROBADA',
    ...Array.from(
      { length: count },
      (_, index) => `#### ${index + 1}. Sección ${index + 1}\nContenido sustantivo ${'x'.repeat(250)}`,
    ),
  ].join('\n\n');

  const tasks = [
    { id: 'NEXO-DOM-018', title: 'Externa', state: 'APROBADA', marker: '✅', relativePath: 'otro.md', block: makeBlock('NEXO-DOM-018', 90) },
    { id: 'NEXO-DOM-019', title: 'Referencia 19', state: 'APROBADA', marker: '✅', relativePath: owner, block: makeBlock('NEXO-DOM-019', 50) },
    { id: 'NEXO-DOM-020', title: 'Referencia 20', state: 'APROBADA', marker: '✅', relativePath: owner, block: makeBlock('NEXO-DOM-020', 60) },
    { id: 'NEXO-DOM-021', title: 'Referencia 21', state: 'APROBADA', marker: '✅', relativePath: owner, block: makeBlock('NEXO-DOM-021', 70) },
    { id: 'NEXO-DOM-022', title: 'Actual', state: 'NO INICIADA', marker: '[ ]', relativePath: owner, block: '### [ ] NEXO-DOM-022 — Actual' },
  ];

  const inventory = new Map(tasks.map((task) => [task.id, task]));
  const baseline = buildStructuralBaseline(
    inventory,
    tasks.at(-1),
    { complexity: 'SUBSTANTIVE' },
  );

  assert.equal(baseline.enforced, true);
  assert.deepEqual(
    baseline.references.map(({ id }) => id),
    ['NEXO-DOM-021', 'NEXO-DOM-020', 'NEXO-DOM-019'],
  );
  assert.equal(baseline.medians.section_count, 60);
  assert.equal(baseline.quality_floor.min_section_count, 39);
  assert.ok(baseline.quality_floor.min_character_count >= 18000);
  assert.equal(taskStructureProfile(tasks[3]).section_count, 70);
});
