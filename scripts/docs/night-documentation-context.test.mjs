import assert from 'node:assert/strict';
import test from 'node:test';

import {
  classifyComplexity,
  compactTaskBlock,
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
