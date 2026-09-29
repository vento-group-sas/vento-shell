import assert from 'node:assert/strict';
import test from 'node:test';

import {
  formatTaskBlock,
  formatTaskFileSource,
  validateTaskPresentation,
} from './format-canonical-task.mjs';

test('formatea solo la tarea indicada y conserva el contenido', () => {
  const source = `### [ ] TEST-FMT-001 — Primera
**Bloque:** X
**Estado:** NO INICIADA
#### 1. Propósito
Texto intacto.
---
#### 2. Resultado
Otro texto.

### [ ] TEST-FMT-002 — Segunda
Texto sin tocar.
`;
  const result = formatTaskFileSource(source, { taskId: 'TEST-FMT-001' });
  assert.deepEqual(result.changedTaskIds, ['TEST-FMT-001']);
  assert.match(result.source, /\*\*Estado:\*\* NO INICIADA\n\*\*Bloque:\*\* X/u);
  assert.match(result.source, /#### 1\. Propósito\n\nTexto intacto\./u);
  assert.match(result.source, /Otro texto\.\n\n### \[ \] TEST-FMT-002 — Segunda\nTexto sin tocar\./u);

  const secondPass = formatTaskFileSource(result.source, { taskId: 'TEST-FMT-001' });
  assert.deepEqual(secondPass.changedTaskIds, []);
  assert.equal(secondPass.source, result.source);
});

test('elimina espacios finales de la tarea seleccionada sin tocar otras tareas', () => {
  const source = '### [ ] TEST-FMT-011 — Primera\n\nPárrafo con espacios  \nPárrafo con tabulación\t\n```text\nvalor  \n```\n\n### [ ] TEST-FMT-012 — Segunda\nTexto ajeno  \n';
  const result = formatTaskFileSource(source, { taskId: 'TEST-FMT-011' });
  assert.deepEqual(result.changedTaskIds, ['TEST-FMT-011']);
  assert.match(result.source, /Párrafo con espacios\nPárrafo con tabulación\n```text\nvalor\n```/u);
  assert.match(result.source, /### \[ \] TEST-FMT-012 — Segunda\nTexto ajeno  \n$/u);
  assert.deepEqual(formatTaskFileSource(result.source, { taskId: 'TEST-FMT-011' }).changedTaskIds, []);
});

test('crea un scaffold explícito solo para una tarea no iniciada y vacía', () => {
  const source = '### [ ] TEST-FMT-003 — Vacía\n';
  const result = formatTaskFileSource(source, {
    taskId: 'TEST-FMT-003',
    scaffold: true,
  });
  assert.match(result.source, /\*\*Estado:\*\* NO INICIADA/u);
  assert.match(result.source, /#### 1\. Propósito/u);
  assert.match(result.source, /#### 8\. Continuidad/u);
  assert.match(result.source, /\[PENDIENTE_DE_DESARROLLO\]/u);
});

test('rechaza scaffold sobre una tarea aprobada', () => {
  assert.throws(
    () => formatTaskBlock('### ✅ TEST-FMT-004 — Aprobada\n', { scaffold: true }),
    /solo puede utilizarse con una tarea NO INICIADA/u,
  );
});

test('normaliza cabecera compacta y continuidad inline sin frase redundante', () => {
  const source = `### ✅ TEST-FMT-005 — Modelo futuro

**Estado:** APROBADA

**Tarea anterior:** \`TEST-FMT-004 — Anterior\`

**Tarea siguiente:** \`TEST-FMT-006 — Siguiente\`

**Tipo de tarea:** Documental

**Bloque:** X — Prueba

---

#### 1. Propósito

Texto intacto.

---

#### 2. Continuidad

**ÚLTIMA TAREA APROBADA**

\`\`\`text
TEST-FMT-004 — Anterior
\`\`\`

**TAREA ACTUAL APROBADA**

\`\`\`text
TEST-FMT-005 — Modelo futuro
\`\`\`

**SIGUIENTE TAREA RESERVADA**

\`\`\`text
TEST-FMT-006 — Siguiente
\`\`\`

No se inicia \`TEST-FMT-006\` en esta tarea.
`;
  const formatted = formatTaskBlock(source);
  assert.match(formatted, /\*\*Estado:\*\* APROBADA\n\*\*Tarea anterior:\*\* TEST-FMT-004/u);
  assert.doesNotMatch(formatted, /```text|No se inicia/u);
  assert.match(
    formatted,
    /\*\*ÚLTIMA TAREA APROBADA\*\*\n`TEST-FMT-004 — Anterior`\n\n\*\*TAREA ACTUAL APROBADA\*\*\n`TEST-FMT-005 — Modelo futuro`/u,
  );
  assert.deepEqual(validateTaskPresentation(formatted), []);
});

test('normaliza continuidad con subtítulos y conserva su texto adicional antes del cierre', () => {
  const source = `### ✅ TEST-FMT-010 — Contratos nativos

**Estado:** APROBADA
**Tarea anterior:** TEST-FMT-009 — Contrato anterior
**Tarea siguiente:** TEST-FMT-011 — Contrato siguiente
**Tipo de tarea:** Documental
**Bloque:** X — Prueba

---

#### 1. Límites

Límite original.

---

#### 2. Continuidad

##### ÚLTIMA TAREA APROBADA

TEST-FMT-001 — Valor equivocado

##### TAREA ACTUAL APROBADA

TEST-FMT-002 — Valor equivocado

##### SIGUIENTE TAREA RESERVADA

TEST-FMT-003 — Valor equivocado

La implementación debe empezar por contratos puros.
`;
  const formatted = formatTaskBlock(source);
  assert.match(formatted, /Límite original\.\n\nLa implementación debe empezar por contratos puros\./u);
  assert.match(
    formatted,
    /\*\*ÚLTIMA TAREA APROBADA\*\*\n`TEST-FMT-009 — Contrato anterior`/u,
  );
  assert.match(
    formatted,
    /\*\*TAREA ACTUAL APROBADA\*\*\n`TEST-FMT-010 — Contratos nativos`/u,
  );
  assert.match(
    formatted,
    /\*\*SIGUIENTE TAREA RESERVADA\*\*\n`TEST-FMT-011 — Contrato siguiente`$/u,
  );
  assert.doesNotMatch(formatted, /^#####/mu);
  assert.deepEqual(validateTaskPresentation(formatted), []);
});

test('añade continuidad prospectiva cuando la tarea desarrollada todavía no la contiene', () => {
  const source = `### [ ] TEST-FMT-006 — Con desarrollo

**Estado:** NO INICIADA
**Tarea anterior:** TEST-FMT-005 — Anterior
**Tarea siguiente:** TEST-FMT-007 — Siguiente
**Tipo de tarea:** Documental
**Bloque:** X — Prueba

---

#### 1. Propósito

Texto.
`;
  const formatted = formatTaskBlock(source);
  assert.match(formatted, /#### 2\. Continuidad/u);
  assert.match(formatted, /`TEST-FMT-006 — Con desarrollo`/u);
  assert.deepEqual(validateTaskPresentation(formatted), []);
});

test('inserta el separador estructural de cabecera cuando fue omitido', () => {
  const source = `### ✅ TEST-FMT-007 — Sin separador

**Estado:** APROBADA
**Tarea anterior:** TEST-FMT-006 — Anterior
**Tarea siguiente:** TEST-FMT-008 — Siguiente
**Tipo de tarea:** Documental
**Bloque:** X — Prueba

#### 1. Propósito

Texto.

#### 2. Continuidad

**ÚLTIMA TAREA APROBADA**
\`TEST-FMT-006 — Anterior\`

**TAREA ACTUAL APROBADA**
\`TEST-FMT-007 — Sin separador\`

**SIGUIENTE TAREA RESERVADA**
\`TEST-FMT-008 — Siguiente\`
`;
  const formatted = formatTaskBlock(source);
  assert.match(formatted, /\*\*Bloque:\*\* X — Prueba\n\n---\n\n#### 1\. Propósito/u);
  assert.deepEqual(validateTaskPresentation(formatted), []);
});

test('corrige títulos estructurales desde la guía de tareas pendientes', () => {
  const canonicalTitles = new Map([
    ['TEST-FMT-008', 'Título actual canónico'],
    ['TEST-FMT-009', 'Próxima tarea canónica'],
  ]);
  const source = `### ✅ TEST-FMT-008 — Título cambiado durante el desarrollo

**Estado:** APROBADA
**Tarea anterior:** TEST-FMT-007 — Anterior histórica
**Tarea siguiente:** TEST-FMT-009 — Próxima tarea renombrada por accidente
**Tipo de tarea:** Documental
**Bloque:** X — Prueba

---

#### 1. Propósito

La narrativa conserva la frase TEST-FMT-009 — Próxima tarea renombrada por accidente.

#### 2. Continuidad

**ÚLTIMA TAREA APROBADA**
\`TEST-FMT-007 — Anterior histórica\`

**TAREA ACTUAL APROBADA**
\`TEST-FMT-008 — Otro título incorrecto\`

**SIGUIENTE TAREA RESERVADA**
\`TEST-FMT-009 — Otro título incorrecto\`
`;
  const formatted = formatTaskBlock(source, { canonicalTitles });
  assert.match(formatted, /^### ✅ TEST-FMT-008 — Título actual canónico$/mu);
  assert.match(formatted, /^\*\*Tarea siguiente:\*\* TEST-FMT-009 — Próxima tarea canónica$/mu);
  assert.match(formatted, /`TEST-FMT-008 — Título actual canónico`/u);
  assert.match(formatted, /`TEST-FMT-009 — Próxima tarea canónica`/u);
  assert.match(
    formatted,
    /La narrativa conserva la frase TEST-FMT-009 — Próxima tarea renombrada por accidente\./u,
  );
  assert.deepEqual(validateTaskPresentation(formatted, { canonicalTitles }), []);
});

test('detecta títulos estructurales distintos a la guía pendiente', () => {
  const canonicalTitles = new Map([['TEST-FMT-008', 'Título actual canónico']]);
  const source = `### ✅ TEST-FMT-008 — Título incorrecto

**Estado:** APROBADA
**Tarea anterior:** TEST-FMT-007 — Anterior
**Tarea siguiente:** TEST-FMT-009 — Siguiente
**Tipo de tarea:** Documental
**Bloque:** X

---

#### 1. Continuidad

**ÚLTIMA TAREA APROBADA**
\`TEST-FMT-007 — Anterior\`

**TAREA ACTUAL APROBADA**
\`TEST-FMT-008 — Título incorrecto\`

**SIGUIENTE TAREA RESERVADA**
\`TEST-FMT-009 — Siguiente\`
`;
  assert.ok(validateTaskPresentation(source, { canonicalTitles })
    .some((error) => /no coincide con la guía de tareas pendientes/u.test(error)));
});
