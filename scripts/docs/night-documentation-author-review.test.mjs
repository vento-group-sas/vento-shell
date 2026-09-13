import assert from 'node:assert/strict';
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import test from 'node:test';

import {
  authorSchema,
  candidateStructuralMetrics,
  reviewerSchema,
  runAuthorReview,
  selectModels,
  sha256,
  validateCandidate,
  validateStructuralParity,
} from './night-documentation-author-review.mjs';

const capsule = {
  capsule_sha256: 'c'.repeat(64),
  complexity: 'SUBSTANTIVE',
  current: {
    id: 'NEXO-DOM-019',
    title: 'Separar identidad permanente del contenedor físico e identidad temporal o persistente del LPN',
    previous_id: 'NEXO-DOM-018',
    next_id: 'NEXO-DOM-020',
    block_code: 'BLOQUE K',
    owner: 'docs/plan-canonico/modular/bloques/K_NEXO/02_DOMINIO_DE_INVENTARIO_LOGISTICA_Y_ACTIVOS.md',
  },
  registry: {
    domain: 'NEXO',
    max_numeric_id: 17,
    next_candidate_id: 'TREQ-NEXO-018',
    relevant_rows: [
      '| `TREQ-NEXO-004` | `NEXO` | requisito existente de prueba | origen | riesgo | modalidad | NEXO-DOM-019 | paquete | repo | PLANIFICADO | artefacto | resultado | evidencia | — |',
    ],
  },
};

const taskMarkdown = `### ✅ NEXO-DOM-019 — Separar identidad permanente del contenedor físico e identidad temporal o persistente del LPN

**Estado:** APROBADA
**Tarea anterior:** NEXO-DOM-018 — Integrar etiquetas LOC, LPN, activos y documentos con BLOQUE E4
**Tarea siguiente:** NEXO-DOM-020 — Definir cuándo un contenedor conserva, cambia o cierra su LPN
**Tipo de tarea:** documental; contrato de identidad de contenedor y LPN
**Bloque:** BLOQUE K — NEXO
**Repositorio propietario:** \`vento-shell\`
**Archivo propietario:** \`docs/plan-canonico/modular/bloques/K_NEXO/02_DOMINIO_DE_INVENTARIO_LOGISTICA_Y_ACTIVOS.md\`
**Estado físico resultante:** \`NO_PHYSICAL_INSTANCE\`
**Cambios físicos autorizados:** ninguno
**Requisitos de prueba creados o modificados:** ninguno

---

#### 1. Propósito

Separar identidad física permanente e identidad logística LPN sin confundir sus ciclos de vida.

#### 2. Requisitos de prueba derivados

NO GENERA REQUISITOS DE PRUEBA nuevos o modificados en esta tarea.

#### 3. Evidencia de validación

| Clase | Estado |
| --- | --- |
| BUILD | NOT_EXECUTED |
| LOCAL | NOT_EXECUTED |
| REMOTA | NOT_EXECUTED |
| OPERATIVA | NOT_EXECUTED |
| FÍSICA | NOT_APPLICABLE |

#### 4. Criterios de aceptación

- La identidad del contenedor permanece separada de la identidad LPN.

#### 5. Límites

- No materializa cambios físicos.

#### 6. Continuidad

**ÚLTIMA TAREA APROBADA**
NEXO-DOM-018 — Integrar etiquetas LOC, LPN, activos y documentos con BLOQUE E4

**TAREA ACTUAL APROBADA**
NEXO-DOM-019 — Separar identidad permanente del contenedor físico e identidad temporal o persistente del LPN

**SIGUIENTE TAREA RESERVADA**
NEXO-DOM-020 — Definir cuándo un contenedor conserva, cambia o cierra su LPN
`;

function authorResponse() {
  return {
    status: 'CANDIDATE',
    stop_reason: null,
    task_markdown: taskMarkdown,
    affected_treq_ids: [],
    treq_changes: [],
    evidence_summary: ['Sin ejecución física; evidencia pendiente de validadores deterministas.'],
  };
}

function apiEnvelope(id, input = 10, output = 20) {
  return {
    id,
    status: 'completed',
    usage: {
      input_tokens: input,
      output_tokens: output,
      output_tokens_details: { reasoning_tokens: 5 },
      total_tokens: input + output,
    },
  };
}

test('selecciona modelos por complejidad con Terra como autor sustantivo', () => {
  assert.equal(selectModels('ROUTINE').author.model, 'gpt-5.6-luna');
  assert.equal(selectModels('SUBSTANTIVE').author.model, 'gpt-5.6-terra');
  assert.equal(selectModels('COMPLEX').author.model, 'gpt-5.6-sol');
  assert.equal(selectModels('SUBSTANTIVE').reviewer1.model, 'gpt-5.6-luna');
  assert.equal(selectModels('SUBSTANTIVE').reviewer2.model, 'gpt-5.6-terra');
});

test('schemas estructurados son cerrados y obligatorios', () => {
  assert.equal(authorSchema().additionalProperties, false);
  assert.equal(reviewerSchema().additionalProperties, false);
  assert.ok(authorSchema().required.includes('treq_changes'));
  assert.ok(reviewerSchema().required.includes('candidate_sha256'));
});

test('valida candidato documental sin TREQ inventados', () => {
  const result = validateCandidate(authorResponse(), capsule);
  assert.equal(result.stopped, false);
  assert.match(result.candidateSha, /^[0-9a-f]{64}$/u);
  assert.equal(result.candidateSha, sha256(`${taskMarkdown.trim()}\n`));
  assert.deepEqual(result.affectedTreqIds, []);
});

test('reubica referencia TREQ histórica fuera de derivados antes de calcular el SHA', () => {
  const historical = authorResponse();
  historical.task_markdown = historical.task_markdown.replace(
    'NO GENERA REQUISITOS DE PRUEBA nuevos o modificados en esta tarea.',
    [
      'NO GENERA REQUISITOS DE PRUEBA nuevos o modificados en esta tarea.',
      '',
      'La cobertura histórica existente `TREQ-NEXO-004` permanece sin modificación.',
    ].join('\n'),
  );

  const result = validateCandidate(historical, capsule);
  const derived = result.markdown.match(
    /^####\s+2\.\s+Requisitos de prueba derivados\s*$([\s\S]*?)(?=^####\s+3\.)/mu,
  )?.[1] ?? '';

  assert.doesNotMatch(derived, /TREQ-NEXO-004/u);
  assert.match(
    result.markdown,
    /\*\*Referencias históricas no modificadas:\*\*[\s\S]*TREQ-NEXO-004[\s\S]*#### 2\. Requisitos de prueba derivados/u,
  );
  assert.equal(result.candidateSha, sha256(result.markdown));
  assert.deepEqual(result.affectedTreqIds, []);
});

test('rechaza referencia TREQ histórica desconocida durante normalización', () => {
  const invalid = authorResponse();
  invalid.task_markdown = invalid.task_markdown.replace(
    'NO GENERA REQUISITOS DE PRUEBA nuevos o modificados en esta tarea.',
    [
      'NO GENERA REQUISITOS DE PRUEBA nuevos o modificados en esta tarea.',
      '',
      'Cobertura histórica: TREQ-NEXO-999.',
    ].join('\n'),
  );

  assert.throws(
    () => validateCandidate(invalid, capsule),
    /referencia TREQ histórica no autorizada.*TREQ-NEXO-999/u,
  );
});

test('permite referencia histórica fuera de la sección TREQ con cero cambios', () => {
  const referenced = authorResponse();
  referenced.task_markdown = referenced.task_markdown.replace(
    'Separar identidad física permanente e identidad logística LPN sin confundir sus ciclos de vida.',
    'Separar identidad física permanente e identidad logística LPN sin confundir sus ciclos de vida. Cobertura histórica no modificada: TREQ-NEXO-004.',
  );
  const result = validateCandidate(referenced, capsule);
  assert.equal(result.stopped, false);
  assert.deepEqual(result.affectedTreqIds, []);
});

test('autor y dos reviewers operan sobre el mismo SHA con máximo tres llamadas', async () => {
  const outputDir = fs.mkdtempSync(path.join(os.tmpdir(), 'vento-phase2-review-'));
  const calls = [];
  let candidateSha = null;
  const fakeCall = async (options) => {
    calls.push(options.schemaName);
    if (options.schemaName === 'vento_documentation_candidate_v1') {
      const parsed = authorResponse();
      candidateSha = sha256(`${parsed.task_markdown.trim()}\n`);
      return { parsed, response: apiEnvelope('resp-author', 100, 200) };
    }
    return {
      parsed: {
        verdict: 'PASS',
        candidate_sha256: candidateSha,
        summary: 'PASS',
        findings: [],
      },
      response: apiEnvelope(options.schemaName, 50, 20),
    };
  };

  const summary = await runAuthorReview({ capsule, apiKey: 'test', outputDir, call: fakeCall });
  assert.equal(summary.status, 'PASS');
  assert.equal(summary.model_calls, 3);
  assert.equal(summary.same_candidate_sha, true);
  assert.equal(summary.candidate_sha256, candidateSha);
  assert.deepEqual(calls.sort(), [
    'vento_documentation_candidate_v1',
    'vento_documentation_reviewer1_v1',
    'vento_documentation_reviewer2_v1',
  ].sort());
  assert.ok(fs.existsSync(path.join(outputDir, 'NEXO-DOM-019_APROBADA_PARA_REEMPLAZAR.md')));
  assert.ok(fs.existsSync(path.join(outputDir, 'reviewer-1.json')));
  assert.ok(fs.existsSync(path.join(outputDir, 'reviewer-2.json')));
});

test('STOP del autor falla cerrado sin gastar reviews', async () => {
  const outputDir = fs.mkdtempSync(path.join(os.tmpdir(), 'vento-phase2-stop-'));
  let calls = 0;
  const fakeCall = async () => {
    calls += 1;
    return {
      parsed: {
        status: 'STOP',
        stop_reason: 'Falta contrato canónico necesario.',
        task_markdown: '',
        affected_treq_ids: [],
        treq_changes: [],
        evidence_summary: [],
      },
      response: apiEnvelope('resp-stop'),
    };
  };
  await assert.rejects(
    runAuthorReview({ capsule, apiKey: 'test', outputDir, call: fakeCall }),
    /AUTHOR_STOP/u,
  );
  assert.equal(calls, 1);
  const summary = JSON.parse(fs.readFileSync(path.join(outputDir, 'phase2-summary.json'), 'utf8'));
  assert.equal(summary.status, 'STOP');
  assert.equal(summary.model_calls, 1);
});

test('normaliza etiquetas abreviadas de Continuidad sin gastar otra llamada', () => {
  const abbreviated = authorResponse();
  abbreviated.task_markdown = abbreviated.task_markdown
    .replace(
      '**ÚLTIMA TAREA APROBADA**\nNEXO-DOM-018 — Integrar etiquetas LOC, LPN, activos y documentos con BLOQUE E4',
      '- Última aprobada: NEXO-DOM-018 — Integrar etiquetas LOC, LPN, activos y documentos con BLOQUE E4',
    )
    .replace(
      '**TAREA ACTUAL APROBADA**\nNEXO-DOM-019 — Separar identidad permanente del contenedor físico e identidad temporal o persistente del LPN',
      '- Actual aprobada: NEXO-DOM-019 — Separar identidad permanente del contenedor físico e identidad temporal o persistente del LPN',
    )
    .replace(
      '**SIGUIENTE TAREA RESERVADA**\nNEXO-DOM-020 — Definir cuándo un contenedor conserva, cambia o cierra su LPN',
      '- Siguiente reservada: NEXO-DOM-020 — Definir cuándo un contenedor conserva, cambia o cierra su LPN',
    );

  const result = validateCandidate(abbreviated, capsule);
  assert.match(result.markdown, /^- ÚLTIMA TAREA APROBADA:/mu);
  assert.match(result.markdown, /^- TAREA ACTUAL APROBADA:/mu);
  assert.match(result.markdown, /^- SIGUIENTE TAREA RESERVADA:/mu);
});

test('rechaza candidato materialmente superficial frente al baseline del mismo owner', () => {
  const strictCapsule = {
    ...capsule,
    structural_baseline: {
      enforced: true,
      policy: 'DYNAMIC_SAME_OWNER_PREDECESSOR_PARITY',
      references: [
        { id: 'NEXO-DOM-021', section_count: 78, character_count: 70000 },
        { id: 'NEXO-DOM-020', section_count: 61, character_count: 60000 },
        { id: 'NEXO-DOM-019', section_count: 72, character_count: 65000 },
      ],
      quality_floor: {
        min_section_count: 46,
        min_character_count: 30000,
      },
    },
  };

  const metrics = candidateStructuralMetrics(taskMarkdown);
  assert.ok(metrics.section_count < 46);

  assert.throws(
    () => validateStructuralParity(taskMarkdown, strictCapsule),
    /STRUCTURAL_PARITY_FAIL/u,
  );

  assert.throws(
    () => validateCandidate(authorResponse(), strictCapsule),
    /STRUCTURAL_PARITY_FAIL/u,
  );
});
