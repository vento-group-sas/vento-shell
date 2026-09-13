import assert from 'node:assert/strict';
import fs from 'node:fs';
import test from 'node:test';

import {
  buildApplicationReadiness,
  extractImplementationReferences,
  mergeProgress,
  parseApplications,
  parseProcessRelationships,
  parseScreens,
  prepareImplementationReadinessArtifacts,
  readinessEffectiveOperationalProjection,
} from './implementation-readiness-artifacts.mjs';
import { resolveTaskWorkTopology } from './task-work-topology.mjs';

const policy = {
  mode: 'CONTROLLED_EXECUTION',
  initial_slice_status: 'NOT_STARTED',
  slice_statuses: ['NOT_STARTED', 'PLANNED', 'IN_PROGRESS', 'IMPLEMENTED', 'VERIFIED', 'BLOCKED'],
  slices: [
    { id: 'contract', title: 'Contrato' },
    { id: 'tests', title: 'Pruebas' },
  ],
};

test('extrae catálogos y clasifica cobertura sin afirmar implementación', () => {
  const applications = parseApplications(`#### 11. Catálogo canónico aprobado

| Código | Nombre canónico | Tipo | Dominio de identidad | Alcance del roadmap |
| --- | --- | --- | --- | --- |
| shell | Vento OS | Hub | Laboral | Núcleo |
| aura | AURA | Administrativa | Laboral | Diferido |

#### 12. Tipos
`);
  const relationships = parseProcessRelationships(`### ✅ PROC-CAT-005 — Propiedad

| ID | Nombre | Dominio | Propietaria | Regla | Evidencia | Nota |
| --- | --- | --- | --- | --- | --- | --- |
| \`VPROC-0001\` | Entrada | Base | \`shell\` | regla | evidencia | nota |

### ✅ PROC-CAT-006 — Consumo

| ID | Propietaria | Directas | Condicionales | Motivo | Nota |
| --- | --- | --- | --- | --- | --- |
| \`VPROC-0001\` | \`shell\` | — | — | motivo | nota |

### ✅ PROC-CAT-007 — Actores
`);
  const screens = parseScreens(`### ✅ PROC-SCREEN-002 — Pantallas

| ID | Nombre | Aplicación | Tipo | Estado | Nota |
| --- | --- | --- | --- | --- | --- |
| \`VSCREEN-0001\` | Inicio | \`shell\` | hub | vigente | nota |

### ✅ PROC-SCREEN-003 — Procesos
`);
  const rows = buildApplicationReadiness(applications, relationships, screens);
  assert.equal(rows.find(({ code }) => code === 'shell').status, 'BASE_COVERED');
  assert.equal(rows.find(({ code }) => code === 'aura').status, 'DEFERRED');
  assert.ok(rows.every(({ status }) => !['IMPLEMENTED', 'VERIFIED'].includes(status)));
});

test('el relevo deriva aplicaciones solo desde identidades y relaciones canónicas', () => {
  const catalogs = {
    applications: [
      { code: 'shell' },
      { code: 'nexo' },
      { code: 'viso' },
    ],
    screens: new Map([['VSCREEN-0001', { app: 'nexo' }]]),
    relationships: {
      owners: new Map([['VPROC-0001', 'viso']]),
      consumers: new Map([['VPROC-0001', { direct: ['nexo'], conditional: [] }]]),
    },
  };
  const references = extractImplementationReferences(
    'SHELL-UI-015 usa VSCREEN-0001, VPROC-0001, TREQ-UX-2001, SHELL-UI-014 y DELIV-PKG-VCTRL_001.',
    'SHELL-UI-015',
    catalogs,
  );
  assert.deepEqual(references.applications, ['nexo', 'shell', 'viso']);
  assert.deepEqual(references.screens, ['VSCREEN-0001']);
  assert.deepEqual(references.processes, ['VPROC-0001']);
  assert.deepEqual(references.treq, ['TREQ-UX-2001']);
  assert.deepEqual(references.tasks, ['DELIV-PKG-VCTRL_001', 'SHELL-UI-014']);
});

test('los cortes nacen NOT_STARTED y el generador conserva avances explícitos', () => {
  const initial = mergeProgress(null, {
    taskId: 'SHELL-UI-015',
    taskTitle: 'Diagnóstico',
    policy,
    repositories: ['vento-shell'],
  });
  assert.deepEqual(initial.slices.map(({ status }) => status), ['NOT_STARTED', 'NOT_STARTED']);
  initial.slices[0].status = 'PLANNED';
  initial.slices[0].notes = 'Corte revisado manualmente.';
  const merged = mergeProgress(initial, {
    taskId: 'SHELL-UI-015',
    taskTitle: 'Diagnóstico de contexto',
    policy,
    repositories: [],
  });
  assert.equal(merged.slices[0].status, 'PLANNED');
  assert.equal(merged.slices[0].notes, 'Corte revisado manualmente.');
  assert.equal(merged.implementation_authorized, false);
});

test('rechaza estados materiales sin evidencia', () => {
  const existing = {
    schema_version: 1,
    task_id: 'SHELL-UI-015',
    task_title: 'Diagnóstico',
    mode: 'CONTROLLED_EXECUTION',
    implementation_authorized: false,
    slices: [
      {
        id: 'contract',
        title: 'Contrato',
        status: 'IMPLEMENTED',
        target_repositories: ['vento-shell'],
        evidence: [],
        notes: null,
      },
    ],
  };
  assert.throws(() => mergeProgress(existing, {
    taskId: 'SHELL-UI-015',
    taskTitle: 'Diagnóstico',
    policy,
    repositories: [],
  }), /IMPLEMENTED sin evidencia/u);
});

test('los catálogos reales generan preparación completa u omisión segura sin escrituras', () => {
  const result = prepareImplementationReadinessArtifacts({ write: false });
  assert.equal(result.applicationRows.length, 10);
  assert.equal(result.applicationRows.reduce((sum, row) => sum + row.ownedProcesses, 0), 69);
  assert.equal(result.applicationRows.reduce((sum, row) => sum + row.screenCount, 0), 177);
  if (result.skipped) {
    assert.equal(result.handoff, undefined);
    assert.equal(result.progress, undefined);
    return;
  }
  const workTopology = resolveTaskWorkTopology();
  const currentLifecycle = workTopology.topology.get(workTopology.currentId);
  assert.ok(result.handoff.includes('CONTROLLED_EXECUTION'));
  assert.ok(result.handoff.includes(workTopology.currentId));
  assert.ok(result.handoff.includes(currentLifecycle.mode));
  assert.equal(result.progress.implementation_authorized, false);
  assert.equal(result.progress.lifecycle_mode, currentLifecycle.mode);
  assert.equal(result.progress.future_instance_pattern, currentLifecycle.instancePattern);
  assert.equal(result.progress.slices.length, 5);
});

test('el contrato de paridad conserva su ejecución futura aunque deje de ser la tarea actual', () => {
  const workTopology = resolveTaskWorkTopology();
  const lifecycle = workTopology.topology.get('SHELL-MIG-007');
  const dependencies = workTopology.dependencies.get('SHELL-MIG-007');
  assert.equal(lifecycle.mode, 'TEMPLATE_PER_PACKAGE');
  assert.equal(lifecycle.instancePattern, '<task_id>::<package_id>');
  assert.ok(dependencies.execution.includes('SHELL-CI-001'));
});

test('el build y el check mantienen la preparación automática conectada', () => {
  const buildSource = fs.readFileSync('scripts/docs/build-plan-canonico.mjs', 'utf8');
  const packageJson = JSON.parse(fs.readFileSync('package.json', 'utf8'));
  assert.match(buildSource, /prepareImplementationReadinessArtifacts\(\{ root, write: true \}\)/u);
  assert.match(
    packageJson.scripts['docs:plan:check'],
    /implementation-readiness-artifacts\.mjs --check/u,
  );
  assert.equal(
    packageJson.scripts['docs:implementation:prepare'],
    'node scripts/docs/implementation-readiness-artifacts.mjs',
  );
});

// C6_READINESS_EFFECTIVE_PROJECTION_TEST
test('readiness proyecta contrato operativo efectivo sin autorizar lifecycle directo', () => {
  const projection = readinessEffectiveOperationalProjection({
    physical: {
      active: {
        instanceId: 'SHELL-CI-022::GAP-PKG-001',
        status: 'IN_PROGRESS',
        declaredStatus: 'VERIFIED',
        effectiveStatus: 'IN_PROGRESS',
        recoveryAction: 'RECONCILE_DECLARED_STATUS_TO_IN_PROGRESS',
        stateIntegrity: { status_valid: false },
      },
    },
  });
  assert.equal(projection.model_id, 'VENTO-IMPLEMENTATION-OPERATIONAL-CONTRACT-V1');
  assert.equal(projection.mutating_entrypoint, 'docs:implementation:advance');
  assert.equal(projection.direct_lifecycle_entrypoints_enabled, false);
  assert.equal(projection.declared_status, 'VERIFIED');
  assert.equal(projection.effective_status, 'IN_PROGRESS');
  assert.equal(projection.state_integrity_valid, false);
});
