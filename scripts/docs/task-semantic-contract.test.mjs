import assert from 'node:assert/strict';
import test from 'node:test';

import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';

import {
  isHistoricalApprovedExemption,
  readCanonicalTaskInventory,
  validateTaskDevelopmentPolicy,
  validateTaskSemanticContract,
} from './task-semantic-contract.mjs';
import {
  auditProspectiveTaskSet,
  renderProspectiveAuditErrors,
} from './audit-prospective-tasks.mjs';

const policy = {
  required_header_fields: [
    'Estado',
    'Tarea anterior',
    'Tarea siguiente',
    'Tipo de tarea',
    'Bloque',
    'Repositorio propietario',
    'Archivo propietario',
    'Estado físico resultante',
    'Cambios físicos autorizados',
    'Requisitos de prueba creados o modificados',
  ],
  required_section_groups: [
    { label: 'propósito', pattern: 'Propósito|Objetivo' },
    { label: 'pruebas', pattern: 'Requisitos de prueba derivados' },
    { label: 'evidencia', pattern: 'Evidencia de validación' },
    { label: 'aceptación', pattern: 'Criterios de aceptación' },
    { label: 'límites', pattern: 'Límites' },
    { label: 'continuidad', pattern: 'Continuidad' },
  ],
  forbidden_placeholder_pattern: '\\[PENDIENTE[^\\]]*\\]|<[A-Z][A-Z0-9_-]+>',
  required_evidence_classes: ['BUILD', 'LOCAL', 'REMOTA', 'OPERATIVA', 'FÍSICA'],
  allowed_evidence_statuses: ['PASS', 'FAIL', 'NOT_EXECUTED', 'NOT_APPLICABLE'],
  blocking_codes: [
    'EMPTY_DRAFT',
    'PRESENTATION',
    'OWNER_FILE_MISMATCH',
    'OWNER_REPOSITORY_MISSING',
    'PHYSICAL_SCOPE_CONTRADICTION',
    'UNRESOLVED_PLACEHOLDER',
    'UNKNOWN_TASK_REFERENCE',
    'EVIDENCE_STATUS_INVALID',
    'EVIDENCE_MISSING',
    'TREQ_COUNT_CONTRADICTION',
  ],
};

const validBlock = `### ✅ TEST-SEM-011 — Tarea válida

**Estado:** APROBADA
**Tarea anterior:** TEST-SEM-010 — Anterior
**Tarea siguiente:** TEST-SEM-012 — Siguiente
**Tipo de tarea:** Documental
**Bloque:** X
**Repositorio propietario:** \`vento-group-sas/vento-shell\`
**Archivo propietario:** \`docs/plan-canonico/modular/bloques/X/test.md\`
**Estado físico resultante:** \`ESPECIFICADO_NO_MATERIALIZADO\`
**Cambios físicos autorizados:** ninguno
**Requisitos de prueba creados o modificados:** 0

---

#### 1. Propósito
Texto.

#### 2. Requisitos de prueba derivados
**Resultado:** NO GENERA REQUISITOS DE PRUEBA

#### 3. Evidencia de validación
| Clase | Estado | Evidencia |
| --- | --- | --- |
| BUILD | PASS | docs:plan:build completado |
| LOCAL | PASS | pruebas unitarias completadas |
| REMOTA | NOT_EXECUTED | no requerida |
| OPERATIVA | NOT_EXECUTED | no requerida |
| FÍSICA | NOT_EXECUTED | no requerida |

#### 4. Criterios de aceptación
Texto.

#### 5. Límites
No autoriza implementación.

#### 6. Continuidad
**ÚLTIMA TAREA APROBADA**
\`TEST-SEM-010 — Anterior\`

**TAREA ACTUAL APROBADA**
\`TEST-SEM-011 — Tarea válida\`

**SIGUIENTE TAREA RESERVADA**
\`TEST-SEM-012 — Siguiente\`
`;

const inventory = new Map([
  ['TEST-SEM-010', {}],
  ['TEST-SEM-011', {}],
  ['TEST-SEM-012', {}],
]);

test('la política material prospectiva es válida', () => {
  const materialPolicy = JSON.parse(fs.readFileSync(
    path.resolve('docs/plan-canonico/modular/task-development-policy.json'),
    'utf8',
  ));
  assert.deepEqual(validateTaskDevelopmentPolicy(materialPolicy), []);
});

test('las exenciones históricas se comparten por ID exacto y por rango', () => {
  const exemptionPolicy = {
    historical_approved_exemptions: [
      { task_ids: ['TEST-HIST-001'] },
      { prefix: 'TEST-RANGE', from: 2, to: 4 },
    ],
  };
  assert.equal(isHistoricalApprovedExemption('TEST-HIST-001', exemptionPolicy), true);
  assert.equal(isHistoricalApprovedExemption('TEST-RANGE-003', exemptionPolicy), true);
  assert.equal(isHistoricalApprovedExemption('TEST-RANGE-005', exemptionPolicy), false);
});

test('acepta una tarea aprobada completa y con evidencia tipada', () => {
  const result = validateTaskSemanticContract({
    block: validBlock,
    task: { id: 'TEST-SEM-011', state: 'APROBADA' },
    ownerRelativePath: 'bloques/X/test.md',
    inventory,
    policy,
  });
  assert.deepEqual(result.errors, []);
  assert.deepEqual(result.warnings, []);
});

test('no confunde artefacto independiente con evidencia pendiente', () => {
  const block = validBlock.replace(
    'pruebas unitarias completadas',
    'El artefacto independiente fue comprobado estructuralmente contra la política',
  );
  const result = validateTaskSemanticContract({
    block,
    task: { id: 'TEST-SEM-011', state: 'APROBADA' },
    ownerRelativePath: 'bloques/X/test.md',
    inventory,
    policy,
  });
  assert.ok(!result.errors.some(({ code }) => code === 'EVIDENCE_MISSING'));
});

test('sigue rechazando un PASS que declara evidencia pendiente', () => {
  const block = validBlock.replace(
    'pruebas unitarias completadas',
    'Evidencia pendiente de ejecución local',
  );
  const result = validateTaskSemanticContract({
    block,
    task: { id: 'TEST-SEM-011', state: 'APROBADA' },
    ownerRelativePath: 'bloques/X/test.md',
    inventory,
    policy,
  });
  assert.ok(result.errors.some(({ code }) => code === 'EVIDENCE_MISSING'));
});

test('no confunde el estado pendiente de una tarea referenciada con evidencia pendiente', () => {
  const block = validBlock.replace(
    'pruebas unitarias completadas',
    'Lectura remota confirmó TEST-SEM-010 aprobado y TEST-SEM-012 como único pendiente del bloque',
  );
  const result = validateTaskSemanticContract({
    block,
    task: { id: 'TEST-SEM-011', state: 'APROBADA' },
    ownerRelativePath: 'bloques/X/test.md',
    inventory,
    policy,
  });
  assert.ok(!result.errors.some(({ code }) => code === 'EVIDENCE_MISSING'));
});

test('sigue rechazando un PASS que admite no haber ejecutado o verificado la prueba', () => {
  for (const evidence of [
    'Pendiente de verificar en remoto',
    'La evidencia pendiente debe capturarse después',
    'No se ha ejecutado la validación remota',
    'NOT_EXECUTED',
  ]) {
    const result = validateTaskSemanticContract({
      block: validBlock.replace('pruebas unitarias completadas', evidence),
      task: { id: 'TEST-SEM-011', state: 'APROBADA' },
      ownerRelativePath: 'bloques/X/test.md',
      inventory,
      policy,
    });
    assert.ok(
      result.errors.some(({ code }) => code === 'EVIDENCE_MISSING'),
      `debía rechazar: ${evidence}`,
    );
  }
});

test('acepta cero como declaración explícita de cambios físicos no autorizados', () => {
  const result = validateTaskSemanticContract({
    block: validBlock.replace('**Cambios físicos autorizados:** ninguno', '**Cambios físicos autorizados:** 0'),
    task: { id: 'TEST-SEM-011', state: 'APROBADA' },
    ownerRelativePath: 'bloques/X/test.md',
    inventory,
    policy,
  });
  assert.ok(!result.errors.some(({ code }) => code === 'PHYSICAL_SCOPE_CONTRADICTION'));
});

test('acepta ninguno durante el marcador global como cero cambios físicos', () => {
  const result = validateTaskSemanticContract({
    block: validBlock.replace(
      '**Cambios físicos autorizados:** ninguno',
      '**Cambios físicos autorizados:** ninguno durante el marcador global',
    ),
    task: { id: 'TEST-SEM-011', state: 'APROBADA' },
    ownerRelativePath: 'bloques/X/test.md',
    inventory,
    policy,
  });
  assert.ok(!result.errors.some(({ code }) => code === 'PHYSICAL_SCOPE_CONTRADICTION'));
});

test('acepta una aclaración futura después de declarar cero cambios físicos', () => {
  const result = validateTaskSemanticContract({
    block: validBlock.replace(
      '**Cambios físicos autorizados:** ninguno',
      '**Cambios físicos autorizados:** ninguno durante el marcador global; la materialización futura queda condicionada a E5',
    ),
    task: { id: 'TEST-SEM-011', state: 'APROBADA' },
    ownerRelativePath: 'bloques/X/test.md',
    inventory,
    policy,
  });
  assert.ok(!result.errors.some(({ code }) => code === 'PHYSICAL_SCOPE_CONTRADICTION'));
});

test('la auditoría prospectiva agrega errores y preserva aprobaciones históricas', () => {
  const auditPolicy = {
    blocking_codes: ['EMPTY_DRAFT', 'PRESENTATION'],
    required_header_fields: [],
    required_section_groups: [],
    forbidden_placeholder_pattern: '\\[PENDIENTE[^\\]]*\\]',
    required_evidence_classes: [],
    allowed_evidence_statuses: [],
    historical_approved_exemptions: [{ task_ids: ['TEST-AUD-003'] }],
  };
  const makeTask = (id, marker = '✅') => ({
    id,
    marker,
    title: `Título ${id}`,
    block: `### ${marker} ${id} — Título ${id}`,
    relativePath: 'bloques/X/test.md',
  });
  const ordered = [makeTask('TEST-AUD-001'), makeTask('TEST-AUD-002'), makeTask('TEST-AUD-003')];
  const result = auditProspectiveTaskSet({
    ordered,
    inventory: new Map(ordered.map((item) => [item.id, item])),
    canonicalTitles: new Map(ordered.map((item) => [item.id, item.title])),
    formatBoundaryId: 'TEST-AUD-001',
    semanticBoundaryId: 'TEST-AUD-001',
    developmentPolicy: auditPolicy,
  });

  assert.deepEqual(new Set(result.errors.map(({ taskId }) => taskId)), new Set([
    'TEST-AUD-001',
    'TEST-AUD-002',
  ]));
  assert.equal(result.stats.historicalExemptions, 1);
  assert.match(renderProspectiveAuditErrors(result.errors), /encontradas en conjunto/u);
});

test('explica los dos valores cuando existe una contradicción física real', () => {
  const result = validateTaskSemanticContract({
    block: validBlock.replace(
      '**Cambios físicos autorizados:** ninguno',
      '**Cambios físicos autorizados:** modificar código consumidor',
    ),
    task: { id: 'TEST-SEM-011', state: 'APROBADA' },
    ownerRelativePath: 'bloques/X/test.md',
    inventory,
    policy,
  });
  const finding = result.errors.find(({ code }) => code === 'PHYSICAL_SCOPE_CONTRADICTION');
  assert.ok(finding);
  assert.match(finding.message, /NO_MATERIALIZADO/u);
  assert.match(finding.message, /modificar código consumidor/u);
});

test('durante desarrollo convierte incumplimientos en advertencias', () => {
  const result = validateTaskSemanticContract({
    block: validBlock.replace('### ✅', '### [ ]').replace('APROBADA', 'NO INICIADA').replace(
      '#### 3. Evidencia de validación',
      '#### 3. Evidencia pendiente',
    ),
    task: { id: 'TEST-SEM-011', state: 'NO INICIADA' },
    ownerRelativePath: 'bloques/X/test.md',
    inventory,
    policy,
  });
  assert.equal(result.errors.length, 0);
  assert.ok(result.warnings.some(({ code }) => code === 'SECTION_MISSING'));
});

test('una tarea aprobada no puede conservar placeholders', () => {
  const result = validateTaskSemanticContract({
    block: validBlock.replace('Texto.', '[PENDIENTE_DE_DESARROLLO]'),
    task: { id: 'TEST-SEM-011', state: 'APROBADA' },
    ownerRelativePath: 'bloques/X/test.md',
    inventory,
    policy,
  });
  assert.ok(result.errors.some(({ code }) => code === 'UNRESOLVED_PLACEHOLDER'));
});

test('permite parámetros canónicos en minúscula y bloquea placeholders en mayúscula', () => {
  const canonicalParameter = validateTaskSemanticContract({
    block: validBlock.replace('Texto.', 'Instancia `SHELL-MIG-007::<package_id>`.'),
    task: { id: 'TEST-SEM-011', state: 'APROBADA' },
    ownerRelativePath: 'bloques/X/test.md',
    inventory,
    policy,
  });
  assert.ok(!canonicalParameter.errors.some(({ code }) => code === 'UNRESOLVED_PLACEHOLDER'));

  const unresolvedPlaceholder = validateTaskSemanticContract({
    block: validBlock.replace('Texto.', 'Instancia `<PACKAGE_ID>`.'),
    task: { id: 'TEST-SEM-011', state: 'APROBADA' },
    ownerRelativePath: 'bloques/X/test.md',
    inventory,
    policy,
  });
  assert.ok(unresolvedPlaceholder.errors.some(({ code }) => code === 'UNRESOLVED_PLACEHOLDER'));
  assert.match(
    unresolvedPlaceholder.errors.find(({ code }) => code === 'UNRESOLVED_PLACEHOLDER').message,
    /<PACKAGE_ID> \(línea \d+\)/u,
  );
});

test('permite genéricos TypeScript de una letra', () => {
  const result = validateTaskSemanticContract({
    block: validBlock.replace(
      'Texto.',
      '`parseX(input: unknown): ContractValidationResult<X>` y `ContractValidationResult<T>`.',
    ),
    task: { id: 'TEST-SEM-011', state: 'APROBADA' },
    ownerRelativePath: 'bloques/X/test.md',
    inventory,
    policy,
  });
  assert.ok(!result.errors.some(({ code }) => code === 'UNRESOLVED_PLACEHOLDER'));
});

test('una tarea aprobada con formato histórico recibe recomendaciones sin bloquear', () => {
  const historicalBlock = validBlock
    .replace(/^\*\*(?:Repositorio propietario|Archivo propietario|Estado físico resultante|Cambios físicos autorizados|Requisitos de prueba creados o modificados):\*\*.*\n/gmu, '')
    .replace(/\n#### 3\. Evidencia de validación[\s\S]*?(?=\n#### 4\.)/u, '')
    .replace(/\n#### 5\. Límites[\s\S]*?(?=\n#### 6\.)/u, '');
  const result = validateTaskSemanticContract({
    block: historicalBlock,
    task: { id: 'TEST-SEM-011', state: 'APROBADA' },
    ownerRelativePath: 'bloques/X/test.md',
    inventory,
    policy,
  });
  assert.deepEqual(result.errors, []);
  assert.ok(result.warnings.some(({ code }) => code === 'HEADER_FIELD_MISSING'));
  assert.ok(result.warnings.some(({ code }) => code === 'SECTION_MISSING'));
  assert.ok(result.warnings.some(({ code }) => code === 'EVIDENCE_CLASS_CARDINALITY'));
  assert.ok(!result.warnings.some(({ code }) => code === 'TREQ_COUNT_CONTRADICTION'));
});

test('la ausencia del contador TREQ no se interpreta como contradicción', () => {
  const blockWithoutCount = validBlock.replace(
    /^\*\*Requisitos de prueba creados o modificados:\*\*.*\n/mu,
    '',
  );
  const result = validateTaskSemanticContract({
    block: blockWithoutCount,
    task: { id: 'TEST-SEM-011', state: 'APROBADA' },
    ownerRelativePath: 'bloques/X/test.md',
    inventory,
    policy,
  });
  assert.ok(![...result.errors, ...result.warnings]
    .some(({ code }) => code === 'TREQ_COUNT_CONTRADICTION'));
});

test('inventario canónico preserva files sobre auxiliary_files para el mismo task_id', () => {
  const root = fs.mkdtempSync(path.join(os.tmpdir(), 'vento-canonical-inventory-'));
  try {
    const baseDir = path.join(root, 'docs', 'plan-canonico', 'modular');
    fs.mkdirSync(baseDir, { recursive: true });
    fs.writeFileSync(
      path.join(baseDir, 'manifest.json'),
      JSON.stringify({
        files: ['canonical.md'],
        auxiliary_files: ['proposal.md', 'aux-unique.md'],
      }),
      'utf8',
    );
    fs.writeFileSync(
      path.join(baseDir, 'canonical.md'),
      '### ✅ TEST-AUX-001 — Autoridad canónica\n',
      'utf8',
    );
    fs.writeFileSync(
      path.join(baseDir, 'proposal.md'),
      '### 🟡 TEST-AUX-001 — Propuesta histórica\n',
      'utf8',
    );
    fs.writeFileSync(
      path.join(baseDir, 'aux-unique.md'),
      '### ✅ TEST-AUX-002 — Auxiliary único\n',
      'utf8',
    );

    const result = readCanonicalTaskInventory(root);

    assert.equal(result.get('TEST-AUX-001')?.marker, '✅');
    assert.equal(result.get('TEST-AUX-001')?.relativePath, 'canonical.md');
    assert.equal(result.get('TEST-AUX-002')?.marker, '✅');
    assert.equal(result.get('TEST-AUX-002')?.relativePath, 'aux-unique.md');
  } finally {
    fs.rmSync(root, { recursive: true, force: true });
  }
});
