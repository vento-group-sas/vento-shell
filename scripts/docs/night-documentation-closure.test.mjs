import assert from 'node:assert/strict';
import test from 'node:test';

import {
  buildClosurePlan,
  replaceTaskBlockInMemory,
  sha256,
} from './night-documentation-closure.mjs';

const candidate = `### ✅ NEXO-DOM-019 — Separar identidad permanente del contenedor físico e identidad temporal o persistente del LPN

**Estado:** APROBADA
**Tarea anterior:** NEXO-DOM-018
**Tarea siguiente:** NEXO-DOM-020
**Tipo de tarea:** documental
**Bloque:** BLOQUE K — NEXO
**Repositorio propietario:** \`vento-shell\`
**Archivo propietario:** \`docs/plan-canonico/modular/bloques/K_NEXO/02_DOMINIO_DE_INVENTARIO_LOGISTICA_Y_ACTIVOS.md\`
**Estado físico resultante:** \`NO_PHYSICAL_INSTANCE\`
**Cambios físicos autorizados:** ninguno
**Requisitos de prueba creados o modificados:** 0

---

#### 1. Propósito

Contrato documental.

#### 2. Requisitos de prueba derivados

**Resultado:** NO GENERA REQUISITOS DE PRUEBA

**Justificación:** no crea ni modifica comportamiento ejecutable en esta tarea.

#### 3. Evidencia de validación

| Clase | Estado |
| --- | --- |
| BUILD | NOT_EXECUTED |
| LOCAL | NOT_EXECUTED |
| REMOTA | NOT_EXECUTED |
| OPERATIVA | NOT_APPLICABLE |
| FÍSICA | NOT_APPLICABLE |

#### 4. Criterios de aceptación

- Contrato preservado.

#### 5. Límites

- Sin cambios físicos.

#### 6. Continuidad

**ÚLTIMA TAREA APROBADA**
NEXO-DOM-018

**TAREA ACTUAL APROBADA**
NEXO-DOM-019

**SIGUIENTE TAREA RESERVADA**
NEXO-DOM-020
`;

const candidateSha = sha256(`${candidate.trim()}\n`);

const authorization = {
  authorization_type: 'DOCUMENTATION_NIGHT_BATCH_V1',
  status: 'AUTHORIZED',
  lane: 'DOCUMENTATION',
  start_scope: {
    route_id: 'NORMAL-CANONICAL-FLOW-001',
    sequence_id: 'PHASE-05-NEXO',
    block_code: 'BLOQUE K',
  },
  limits: {
    cutoff_utc: '2026-09-14T12:00:00.000Z',
  },
  physical_authorization: { granted: false, scope: 'NONE' },
  phase_2_capabilities: {
    author_review_enabled: true,
  },
  phase_3_capabilities: {
    closure_preflight_enabled: true,
    repository_mutation_enabled: false,
    task_execution_enabled: false,
  },
};

const preflight = {
  task: { id: 'NEXO-DOM-019', current: true },
  continuity: {
    route: 'NORMAL-CANONICAL-FLOW-001',
    sequence: 'PHASE-05-NEXO',
  },
};

const context = {
  current: {
    id: 'NEXO-DOM-019',
    owner: 'docs/plan-canonico/modular/bloques/K_NEXO/02_DOMINIO_DE_INVENTARIO_LOGISTICA_Y_ACTIVOS.md',
    marker_source: '### [ ] NEXO-DOM-019 — Separar identidad permanente del contenedor físico e identidad temporal o persistente del LPN',
    block_code: 'BLOQUE K',
    validators: [
      'npm run docs:plan:build',
      'npm run docs:plan:check',
      'npm run docs:plan:test',
    ],
  },
};

const phase2Summary = {
  status: 'PASS',
  task_id: 'NEXO-DOM-019',
  context_sha256: 'c'.repeat(64),
  candidate_sha256: candidateSha,
  reviewer_1: 'PASS',
  reviewer_2: 'PASS',
  same_candidate_sha: true,
  affected_treq_ids: [],
  repository_mutation: false,
  task_execution_enabled: false,
  physical_authorization: 'NONE',
};

const reviewer = {
  verdict: 'PASS',
  candidate_sha256: candidateSha,
  summary: 'PASS',
  findings: [],
};

const ownerSource = `# BLOQUE K

### ✅ NEXO-DOM-018 — Previa

Contenido previo.

### [ ] NEXO-DOM-019 — Separar identidad permanente del contenedor físico e identidad temporal o persistente del LPN

### [ ] NEXO-DOM-020 — Siguiente

Contenido siguiente.
`;

function build(overrides = {}) {
  return buildClosurePlan({
    authorization,
    preflight,
    context,
    phase2Summary,
    reviewer1: reviewer,
    reviewer2: reviewer,
    candidate,
    treqChanges: [],
    ownerSource,
    now: new Date('2026-09-13T17:00:00.000Z'),
    ...overrides,
  });
}

test('materializa plan de cierre read-only compatible con lifecycle', () => {
  const plan = build();
  assert.equal(plan.status, 'READY_FOR_PHASE4_PILOT');
  assert.equal(plan.task_id, 'NEXO-DOM-019');
  assert.equal(plan.candidate_sha256, candidateSha);
  assert.equal(plan.treq.declared_count, 0);
  assert.deepEqual(plan.treq.affected_ids, []);
  assert.equal(plan.repository_mutation, false);
  assert.equal(plan.task_execution_enabled, false);
  assert.equal(plan.phase4_execution_enabled, false);
  assert.match(plan.planned_lifecycle.start, /docs:task:start/u);
  assert.match(plan.planned_lifecycle.finish, /docs:task:finish/u);
});

test('reemplazo en memoria conserva siguiente tarea y no duplica marcador', () => {
  const simulated = replaceTaskBlockInMemory({
    ownerSource,
    markerSource: context.current.marker_source,
    candidate,
    taskId: context.current.id,
  });
  assert.match(simulated, /^### ✅ NEXO-DOM-019/mu);
  assert.match(simulated, /^### \[ \] NEXO-DOM-020/mu);
  assert.doesNotMatch(simulated, /^### \[ \] NEXO-DOM-019/mu);
});

test('rechaza candidate SHA distinto al revisado', () => {
  assert.throws(
    () => build({ candidate: `${candidate}\ntexto adicional\n` }),
    /candidate SHA no coincide/u,
  );
});

test('rechaza reviewer sobre SHA distinto', () => {
  assert.throws(
    () => build({
      reviewer2: {
        ...reviewer,
        candidate_sha256: 'f'.repeat(64),
      },
    }),
    /REVIEWER_2 revisó SHA distinto/u,
  );
});

test('rechaza candidato cero-TREQ incompatible con docs:task:finish', () => {
  const incompatible = candidate.replace(
    '**Justificación:** no crea ni modifica comportamiento ejecutable en esta tarea.',
    '**Justificación:** cobertura histórica TREQ-NEXO-004.',
  );
  const incompatibleSha = sha256(`${incompatible.trim()}\n`);
  assert.throws(
    () => build({
      candidate: incompatible,
      phase2Summary: {
        ...phase2Summary,
        candidate_sha256: incompatibleSha,
      },
      reviewer1: { ...reviewer, candidate_sha256: incompatibleSha },
      reviewer2: { ...reviewer, candidate_sha256: incompatibleSha },
    }),
    /LIFECYCLE_COMPATIBILITY_FAIL/u,
  );
});

test('rechaza FASE 3 no habilitada o con mutación autorizada', () => {
  assert.throws(
    () => build({
      authorization: {
        ...authorization,
        phase_3_capabilities: {
          ...authorization.phase_3_capabilities,
          closure_preflight_enabled: false,
        },
      },
    }),
    /no habilita FASE 3/u,
  );

  assert.throws(
    () => build({
      authorization: {
        ...authorization,
        phase_3_capabilities: {
          ...authorization.phase_3_capabilities,
          repository_mutation_enabled: true,
        },
      },
    }),
    /debe permanecer read-only/u,
  );
});
