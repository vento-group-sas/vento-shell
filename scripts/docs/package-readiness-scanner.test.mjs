import assert from 'node:assert/strict';
import fs from 'node:fs';
import test from 'node:test';

import {
  buildFoundationEvidenceRef,
  derivePackageExecutionRequirements,
  evaluateCapability,
  evaluatePhysicalDependencies,
  evaluatePackageDeploymentEnvironment,
  requiredFoundationCheckIds,
  remoteDriftArgs,
  validateFoundationEvidenceRef,
  parseCanonicalPackageCatalogFromSource,
  parseDeploymentEnvironmentProjection,
  parsePackageExecutionProjection,
  parsePackageTaskRouting,
  prioritizeImplementationReadyQueue,
  renderPackageDetail,
  renderReadinessMarkdown,
  scanPackageReadiness,
} from './package-readiness-scanner.mjs';

const contract = JSON.parse(fs.readFileSync(
  new URL('./package-readiness/package-readiness-contract.json', import.meta.url),
  'utf8',
));


test('remote drift args separan ENVIRONMENT_READY de HISTORY_PASS', () => {
  const binding = { project_ref: 'abc123', owner: 'SUPA-TRANS-015' };
  assert.deepEqual(remoteDriftArgs(binding, 'STAGING', 'environment'), [
    'run', '--silent', 'supabase:drift:remote', '--',
    '--environment-role', 'staging',
    '--project-ref', 'abc123',
    '--owner', 'SUPA-TRANS-015',
    '--scope', 'environment',
    '--strict',
  ]);
  assert.deepEqual(remoteDriftArgs(binding, 'PRODUCTION', 'history'), [
    'run', '--silent', 'supabase:drift:remote', '--',
    '--environment-role', 'production',
    '--project-ref', 'abc123',
    '--owner', 'SUPA-TRANS-015',
    '--scope', 'history',
    '--strict',
  ]);
});

function approvedTask(id, title = id) {
  return {
    id,
    title,
    marker: '✅',
    state: 'APROBADA',
    relativePath: `fixtures/${id}.md`,
    block: `### ✅ ${id} — ${title}\n\n**Estado:** APROBADA\n`,
  };
}

function pendingTask(id, title = id) {
  return {
    id,
    title,
    marker: '[ ]',
    state: 'NO_INICIADA',
    relativePath: `fixtures/${id}.md`,
    block: `### [ ] ${id} — ${title}\n\n**Estado:** NO INICIADA\n`,
  };
}

function inventory({ capabilityApproved = true, templatesApproved = true, gateApproved = true } = {}) {
  const rows = [capabilityApproved ? approvedTask('TEST-CAP-001') : pendingTask('TEST-CAP-001')];
  for (let number = 1; number <= 25; number += 1) {
    const id = `DELIV-PKG-${String(number).padStart(3, '0')}`;
    rows.push(templatesApproved ? approvedTask(id) : pendingTask(id));
  }
  rows.push(gateApproved ? approvedTask('E5-GATE-008') : pendingTask('E5-GATE-008'));
  rows.push(approvedTask('TEST-SUPPORT-001'));
  rows.push(approvedTask('TEST-DOM-001'));
  rows.push(pendingTask('TEST-PENDING-001'));
  return new Map(rows.map((row) => [row.id, row]));
}

function completeCapability(overrides = {}) {
  const contributors = {};
  for (const condition of contract.capability_conditions) {
    contributors[condition.group] = [{ task_refs: ['TEST-CAP-001'] }];
  }
  return {
    objective: 'Capacidad de prueba trazable',
    owner_application: 'nexo',
    package_slug: 'TEST-CAPABILITY',
    contributors,
    not_applicable: [],
    ...overrides,
  };
}

function capabilityIndex(capability = completeCapability()) {
  return {
    schema_version: 1,
    index_id: 'TEST-CAPABILITY-INDEX',
    discovery_mode: 'EXPLICIT_CANONICAL_MAPPINGS_ONLY',
    capabilities: { TEST_CAPABILITY: capability },
  };
}

function emptyRegistry() {
  return {
    schema_version: 1,
    registry_id: 'TEST-REGISTRY',
    packages: [],
    status_scope: 'DOCUMENTARY_READINESS',
    physical_status_projection: '.delivery/package-readiness-scan.json',
  };
}

function verifiedPhysicalDependencies() {
  const rows = new Map();
  for (let number = 1; number <= 19; number += 1) {
    const taskId = `SHELL-CI-${String(number).padStart(3, '0')}`;
    const instanceId = `${taskId}::GLOBAL`;
    rows.set(instanceId, { instance_id: instanceId, task_id: taskId, status: 'VERIFIED' });
  }
  return rows;
}

function approvedPackageGateRecord(packageId) {
  return {
    schema_version: 1,
    package_id: packageId,
    status: 'APPROVED_FOR_IMPLEMENTATION',
    created_at: '2026-08-29T19:00:00.000Z',
    updated_at: '2026-08-29T20:00:00.000Z',
    physical_identity: { targets: [{ repository: 'vento-shell', path: 'packages/test', symbol_or_surface: 'TestSurface', operation: 'materialize' }] },
    implementation_units: [{ unit_id: 'TEST-UNIT-001', repository: 'vento-shell', change: 'Materializar el package de prueba.' }],
    deployment_environment: {
      canonical_task_id: 'DELIV-PKG-019',
      rollout_profile: 'TP-UI-001',
      environment_profile: 'ENV-WEB-CI-STAGING',
      targets: [{ environment_role: 'STAGING', target_type: 'WEB_ENVIRONMENT', target_id: 'staging', owner: 'VENTO_OWNER' }],
      production_authorized: false,
    },
    evidence_plan: {
      tests: [{ command: 'npm test', expected_result: 'PASS' }],
      observability: [{ signal: 'test.signal', expected_result: 'Visible' }],
      acceptance_criteria: ['El package satisface su contrato.'],
      rollback_steps: ['Revertir la unidad.'],
    },
    authorization: {
      decision: 'APROBADO', approved_by: 'fixture', approved_at: '2026-08-29T20:00:00.000Z', approval_ref: 'fixture:GAP', approval_statement: `APROBADO ${packageId}.`,
    },
  };
}

function scan({
  index = capabilityIndex(),
  registry = emptyRegistry(),
  taskInventory = inventory(),
  instances = verifiedPhysicalDependencies(),
  priorityLanes = { lanes: [] },
  check = false,
  time = '2026-08-27T15:00:00.000Z',
} = {}) {
  return scanPackageReadiness({
    root: process.cwd(),
    check,
    trigger: 'test',
    now: () => time,
    supplied: {
      contract,
      capabilityIndex: index,
      registry,
      inventory: taskInventory,
      instances,
      priorityLanes,
      activeSequence: { task_ids: ['NEXT-DOC-001'] },
      canonicalPackageIds: [],
      skipDerivedReports: true,
    },
  });
}

function addCompleteDossier(registry) {
  const cloned = structuredClone(registry);
  assert.equal(cloned.packages.length, 1);
  const evidence = {};
  for (const condition of contract.dossier_conditions) {
    evidence[condition.id] = [{
      source: `artifact:${condition.id}`,
      status: 'PASS',
      detail: `Evidencia trazable para ${condition.id}`,
    }];
  }
  cloned.packages[0].package_evidence = evidence;
  return cloned;
}

function canonicalGapRoutingSource() {
  const historicalRows = Array.from({ length: 814 }, (_, index) => {
    const packageNumber = index < 201 ? index + 1 : ((index - 201) % 201) + 1;
    const packageId = `GAP-PKG-${String(packageNumber).padStart(3, '0')}`;
    const primary = index === 0 ? 'TEST-CAP-001 — Base; TEST-PENDING-001 — Pendiente' : 'TEST-CAP-001 — Base';
    const support = index === 0 ? 'TEST-SUPPORT-001' : '—';
    return `| \`EQG-${String(index + 1).padStart(3, '0')}\` | \`GAP-${String(index + 1).padStart(3, '0')}\` | Brecha ${index + 1} | \`CONTRACTUAL\` | \`CAP-01.01\` | \`OWN-OPS\` | \`${primary}\` | \`${support}\` | \`${packageId}\` | \`ALTA\` |`;
  }).join('\n');
  const appendOnlyRows = Array.from({ length: 6 }, (_, index) => {
    const packageId = `GAP-PKG-${String(index + 202).padStart(3, '0')}`;
    return `| \`H-PROC-COVER-010-${String(index + 1).padStart(3, '0')}\` | \`fixture\` | \`CONTRACTUAL\` | \`P1\` | \`CAP-01.01\` | \`VPROC-0001\` | Brecha append-only | \`OWN-OPS\` | \`2026-08-21\` | \`TEST-CAP-001 — Base\` | \`${packageId}\` | \`CLOSE-CON-CTR\` | \`EV-01\` | \`OWN-OPS\` | \`ABIERTA\` |`;
  }).join('\n');
  const appendOnlyPackageRows = Array.from({ length: 6 }, (_, index) => {
    const packageId = `GAP-PKG-${String(index + 202).padStart(3, '0')}`;
    return `| \`${packageId}\` | \`H-PROC-COVER-010-${String(index + 1).padStart(3, '0')}\` | \`CONTRACTUAL\` | \`OWN-OPS\` | \`W1\` | \`2026-08-21\` | \`TEST-CAP-001 — Base\` | — | \`CLOSE-CON-CTR\` | \`ABIERTA\` |`;
  }).join('\n');
  return `### ✅ GAP-CTRL-006 — Routing\n\n#### 9. Matriz completa brecha → tarea → paquete\n\n| Registro | Referencia representativa | Brecha resumida | Clase | Capacidad / proceso | Propietario / fecha | Tarea primaria | Tareas de soporte | Paquete | Confianza |\n| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |\n${historicalRows}\n\n### B. Nuevas brechas canónicas\n\n| Gap ID | Fuente | Clase | Criticidad | Capacidad | Proceso/alcance | Hallazgo canónico | Propietario | Fecha | Tarea primaria | Paquete | Perfil | Evidencia | Revisor | Estado |\n| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |\n${appendOnlyRows}\n\n### C. Paquetes nuevos\n\n| Paquete | Brecha | Clase | Propietario | Ola | Fecha | Tarea primaria | Tareas de apoyo | Perfil | Estado |\n| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |\n${appendOnlyPackageRows}\n`;
}

function canonicalCatalogSource({ passPackage = null } = {}) {
  const finalRows = Array.from({ length: 207 }, (_, index) => {
    const packageId = `GAP-PKG-${String(index + 1).padStart(3, '0')}`;
    const pass = packageId === passPackage;
    return `| \`${packageId}\` | \`KEEP_AS_SINGLE_UNIT\` | \`${pass ? 'PASS' : 'BLOQUEADO'}\` | \`${pass ? 'READY' : 'BLOQUEADO_014_Y_EVIDENCIA'}\` | \`${pass ? `${packageId}::UNIT` : 'PENDIENTE'}\` | \`${pass ? 'PASS' : 'BLOQUEADO'}\` | \`${pass ? 'NONE' : 'DELIV-PKG-014'}\` | \`${pass ? '0 bloqueadores' : 'Confirmar identidad física y evidencia'}\` |`;
  }).join('\n');
  const ownershipRows = Array.from({ length: 207 }, (_, index) => {
    const packageId = `GAP-PKG-${String(index + 1).padStart(3, '0')}`;
    const applicationOwner = packageId === 'GAP-PKG-005'
      ? 'POS'
      : packageId === 'GAP-PKG-010'
        ? 'FRONTERA_DISTRIBUIDA_TALENTO_VISO_ANIMA'
        : 'FRONTERA_DISTRIBUIDA';
    const domainOwner = packageId === 'GAP-PKG-001' ? 'TEST-DOM' : 'TEST-CAP';
    const repositoryOwner = packageId === 'GAP-PKG-006' ? 'NO_CONFIRMADO' : 'devVentoGroup/vento-shell';
    const ownershipState = packageId === 'GAP-PKG-006'
      ? 'REPOSITORIO_NO_CONFIRMADO'
      : 'APLICACION_Y_REPOSITORIO_CONFIRMADOS';
    const blockingCondition = packageId === 'GAP-PKG-006'
      ? 'Confirmar repositorio propietario de AURA antes de materializacion fisica'
      : 'NINGUNA';
    return `| \`${packageId}\` | \`${applicationOwner}\` | \`${domainOwner}\` | \`${repositoryOwner}\` | \`${ownershipState}\` | \`${blockingCondition}\` |`;
  }).join('\n');
  const runtimeRows = Array.from({ length: 207 }, (_, index) => {
    const packageId = `GAP-PKG-${String(index + 1).padStart(3, '0')}`;
    const repositoryOwner = packageId === 'GAP-PKG-006' ? 'NO_CONFIRMADO' : 'devVentoGroup/vento-shell';
    return `| \`${packageId}\` | \`${repositoryOwner}\` | \`TP-DB-001\` | \`DATABASE_RPC_BOUNDARY\` | \`OWN-SEG\` | \`ESPECIFICADO\` | \`IMPLEMENTACION_BLOQUEADA\` |`;
  }).join('\n');
  const dominantRows = Array.from({ length: 207 }, (_, index) => {
    const packageId = `GAP-PKG-${String(index + 1).padStart(3, '0')}`;
    const dominant = packageId === 'GAP-PKG-001' ? 'TEST-DOM-001' : 'TEST-CAP-001';
    return `| \`${packageId}\` | \`${dominant}\` | \`DATABASE_RPC_BOUNDARY\` | \`YES\` | \`YES\` | \`NO\` | \`YES\` | \`NO\` | \`ESPECIFICADO\` |`;
  }).join('\n');
  const orderRows = Array.from({ length: 207 }, (_, index) => {
    const packageId = `GAP-PKG-${String(index + 1).padStart(3, '0')}`;
    return `| \`${packageId}\` | ninguna arista confirmada | \`BLOQUEADO_POR_IDENTIDAD\` | Capa 1: contrato/datos autoritativos |`;
  }).join('\n');
  const deploymentRows = Array.from({ length: 207 }, (_, index) => {
    const packageId = `GAP-PKG-${String(index + 1).padStart(3, '0')}`;
    const profile = packageId === 'GAP-PKG-004'
      ? '`TP-UI-001` / `ENV-WEB-CI-STAGING`'
      : '`TP-DB-001` / `ENV-SUPABASE-LOCAL-CI-STAGING`';
    return `| \`${packageId}\` | \`devVentoGroup/vento-shell\` | \`OWN-SEG\` | ${profile} | \`READY\` | Capa 1 | fixture | \`ESPECIFICADO\` |`;
  }).join('\n');
  return `### ✅ DELIV-PKG-002 — Vincular\n\n| package_id | process_id | gap_id estable E1 | capability_id |\n| --- | --- | --- | --- |\n| \`GAP-PKG-001\` | \`VPROC-0001\` | \`H-001\` | \`CAP-01.01\` |\n\n### ✅ DELIV-PKG-003 — Ownership\n\n| package_id | application_owner | domain_owner | repo_owner | ownership_state | blocking_condition |\n| --- | --- | --- | --- | --- | --- |\n${ownershipRows}\n\n### ✅ DELIV-PKG-007 — Runtime\n\n| package_id | Tarea dominante | runtime_profile | Lógica | Server Action | API | RPC | Edge | Estado |\n| --- | --- | --- | --- | --- | --- | --- | --- | --- |\n${dominantRows}\n\n### ✅ DELIV-PKG-015 — Orden\n\n| package_id | Dependencia entre paquetes | Orden actual | Orden posterior al gate |\n| --- | --- | --- | --- |\n${orderRows}\n\n### ✅ DELIV-PKG-017 — Observabilidad\n\n| Paquete | Repositorio propietario | Perfil 016 | Runtime | Responsable de decisión | Resultado 017 | Gate heredado |\n| --- | --- | --- | --- | --- | --- | --- |\n${runtimeRows}\n\n### ✅ DELIV-PKG-019 — Rollout\n\n| package_id | Repositorio | Propietario | Perfil / ambiente | Gate físico 015 | Orden | Artefacto de rollout | Resultado 019 |\n| --- | --- | --- | --- | --- | --- | --- | --- |\n${deploymentRows}\n\n### ✅ DELIV-PKG-025 — Cierre final\n\n| package_id | Disposición 025 | Estado 023 heredado | Estado físico heredado | implementation_unit_id | Decisión final 025 | Propietario de salida | Condición de salida |\n| --- | --- | --- | --- | --- | --- | --- | --- |\n${finalRows}\n`;
}

test('el contrato conserva 14 condiciones, DELIV-PKG-001..025 y catálogo GAP-PKG-001..207', () => {
  assert.equal(contract.capability_conditions.length, 14);
  const deliv = contract.dossier_conditions.flatMap(({ deliv_pkg_refs: refs }) => refs);
  assert.deepEqual(deliv, Array.from({ length: 25 }, (_, index) => `DELIV-PKG-${String(index + 1).padStart(3, '0')}`));
  assert.equal(contract.unknown_blocks, true);
  assert.equal(contract.implementation_entry_task, 'SHELL-CI-020');
  assert.equal(contract.canonical_package_catalog.identity_task, 'DELIV-PKG-001');
  assert.equal(contract.canonical_package_catalog.final_decision_task, 'DELIV-PKG-025');
  assert.equal(contract.canonical_package_catalog.expected_count, 207);
  assert.equal(contract.canonical_package_catalog.expected_gap_memberships, 820);
  assert.equal(contract.canonical_package_catalog.expected_historical_gap_memberships, 814);
  assert.equal(contract.canonical_package_catalog.expected_append_only_gap_memberships, 6);
  assert.equal(contract.queue_policy.implementation_ready_diagnostic_only, true);
  assert.equal(contract.queue_policy.linear_execution_source, 'DELIV-PKG-015');
});

test('DELIV-PKG-015 materializa capas y aristas explícitas sin depender de la fila que contiene la flecha', () => {
  const projection = parsePackageExecutionProjection(`### ✅ DELIV-PKG-015 — Orden

| package_id | Dependencia entre paquetes | Orden actual | Orden posterior al gate |
| --- | --- | --- | --- |
| \`GAP-PKG-001\` | \`GAP-PKG-001 → GAP-PKG-002\` | \`BLOQUEADO\` | Capa 1: contrato |
| \`GAP-PKG-002\` | ninguna adicional | \`BLOQUEADO\` | Capa 2: dominio |
`);
  assert.equal(projection.get('GAP-PKG-001').layer, 1);
  assert.equal(projection.get('GAP-PKG-002').layer, 2);
  assert.deepEqual(projection.get('GAP-PKG-002').depends_on_package_ids, ['GAP-PKG-001']);
});

test('evidencia ausente produce UNKNOWN y bloquea la creación del package especial', () => {
  const capability = completeCapability();
  capability.contributors.data = [];
  const result = scan({ index: capabilityIndex(capability) });
  const data = result.capabilityResults[0].conditions.find(({ id }) => id === 'DATA_CLOSED');
  assert.equal(data.status, 'UNKNOWN');
  assert.equal(result.capabilityResults[0].capability_ready, false);
  assert.equal(result.registry.packages.length, 0);
  assert.equal(result.registry.implementation_ready_queue.length, 0);
});

test('una capacidad especial con 14 condiciones trazables auto-instancia package y compila DELIV-PKG', () => {
  const result = scan();
  assert.equal(result.capabilityResults[0].capability_ready, true);
  assert.equal(result.registry.packages.length, 1);
  const pkg = result.registry.packages[0];
  assert.equal(pkg.package_id, 'TEST-CAPABILITY-001');
  assert.equal(pkg.source_kind, 'SPECIAL_CAPABILITY');
  assert.equal(pkg.status, 'COMPILED');
  assert.equal(pkg.dossier.contract_ready, true);
  assert.equal(pkg.dossier.complete, false);
  assert.deepEqual(pkg.status_history.map(({ status }) => status), ['DISCOVERED', 'READY_FOR_COMPILATION', 'COMPILED']);
});

test('un PASS de dossier sin fuente material degradable queda UNKNOWN', () => {
  const first = scan();
  const registry = structuredClone(first.persistentRegistry);
  registry.packages[0].package_evidence.DELIV_PKG_001 = [{ source: 'artifact:DELIV_PKG_001', status: 'PASS' }];
  const second = scan({ registry });
  const check = second.registry.packages[0].dossier.checks.find(({ id }) => id === 'DELIV_PKG_001');
  assert.equal(check.package_status, 'UNKNOWN');
  assert.match(check.evidence[0].detail, /degradado a UNKNOWN/u);
  assert.equal(second.registry.packages[0].status, 'COMPILED');
});

test('dossier completo + gate + dependencias VERIFIED produce IMPLEMENTATION_READY sin autoautorizar CI020', () => {
  const first = scan();
  const second = scan({ registry: addCompleteDossier(first.persistentRegistry), time: '2026-08-27T15:01:00.000Z' });
  const pkg = second.registry.packages[0];
  assert.equal(pkg.dossier.complete, true);
  assert.equal(pkg.gate.status, 'PASS');
  assert.equal(pkg.status, 'IMPLEMENTATION_READY');
  assert.equal(pkg.blockers.length, 0);
  assert.equal(pkg.next_execution, 'SHELL-CI-020::TEST-CAPABILITY-001');
  assert.equal(second.registry.implementation_ready_queue[0].physical_authorization_required, true);
  assert.equal(second.registry.package_execution.current, null);
  assert.deepEqual(second.registry.package_execution.deferred.map(({ package_id: packageId }) => packageId), ['TEST-CAPABILITY-001']);
});

test('dossier completo sin fundación física VERIFIED queda READY_FOR_GATE y fuera de la cola', () => {
  const first = scan();
  const second = scan({ registry: addCompleteDossier(first.persistentRegistry), instances: new Map() });
  const pkg = second.registry.packages[0];
  assert.equal(pkg.status, 'READY_FOR_GATE');
  assert.equal(pkg.gate.status, 'UNKNOWN');
  assert.ok(pkg.blockers.includes('PHYSICAL_DEPENDENCIES:UNKNOWN'));
  assert.equal(second.registry.implementation_ready_queue.length, 0);
});

test('una decisión empresarial suspendida bloquea la capacidad especial', () => {
  const capability = completeCapability({ priority_lane_id: 'NEXO-REMISSIONS-001' });
  const result = evaluateCapability({
    capabilityId: 'TEST_CAPABILITY',
    capability,
    contract,
    inventory: inventory(),
    priorityLanes: { lanes: [{ lane_id: 'NEXO-REMISSIONS-001', status: 'SUSPENDED', active: false, suspension_reason: 'Decisión empresarial explícita.' }] },
  });
  const decisions = result.conditions.find(({ id }) => id === 'NO_OPEN_CRITICAL_DECISIONS');
  assert.equal(decisions.status, 'FAIL');
  assert.equal(result.capability_ready, false);
});

test('un package especial canónico sin mapping explícito bloquea write/check', () => {
  assert.throws(() => scanPackageReadiness({
    root: process.cwd(),
    check: true,
    supplied: {
      contract,
      capabilityIndex: capabilityIndex(),
      registry: emptyRegistry(),
      inventory: inventory(),
      instances: verifiedPhysicalDependencies(),
      priorityLanes: { lanes: [] },
      activeSequence: { task_ids: ['NEXT-DOC-001'] },
      canonicalPackageIds: ['UNMAPPED-PACKAGE-001'],
      skipDerivedReports: true,
    },
  }), /no cubre package_id canónicos especiales: UNMAPPED-PACKAGE-001/u);
});

test('N/A solo es válido para las cinco condiciones donde el contrato lo permite', () => {
  const capability = completeCapability({ not_applicable: ['functional_result'] });
  assert.throws(() => scan({ index: capabilityIndex(capability) }), /N\/A no permitido/u);
});

test('--check falla cerrado cuando el registry persistente está desactualizado', () => {
  assert.throws(() => scan({ check: true }), /implementation-package-registry\.json está desactualizado/u);
});

test('DELIV-PKG-025 se convierte en catálogo maestro exacto de 207 packages sin inventar IDs', () => {
  const catalog = parseCanonicalPackageCatalogFromSource(canonicalCatalogSource(), contract, canonicalGapRoutingSource());
  assert.equal(catalog.packages.length, 207);
  assert.equal(catalog.packages[0].package_id, 'GAP-PKG-001');
  assert.equal(catalog.packages.at(-1).package_id, 'GAP-PKG-207');
  assert.equal(catalog.membership_audit.total, 820);
  assert.equal(catalog.membership_audit.unique_gap_ids, 820);
  assert.equal(catalog.membership_audit.packages_covered, 207);
  assert.equal(catalog.packages[0].repository_owner, 'devVentoGroup/vento-shell');
  assert.deepEqual(catalog.packages[0].capability_ids, ['CAP-01.01']);
  assert.deepEqual(catalog.packages[0].process_ids, ['VPROC-0001']);
  assert.equal(catalog.packages[0].exit_owner, 'DELIV-PKG-014');
  assert.deepEqual(catalog.packages[0].primary_task_ids, ['TEST-CAP-001', 'TEST-PENDING-001']);
  assert.deepEqual(catalog.packages[0].support_task_ids, ['TEST-SUPPORT-001']);
  assert.equal(catalog.packages[0].dominant_task_id, 'TEST-DOM-001');
  assert.equal(catalog.packages[0].application_owner, 'FRONTERA_DISTRIBUIDA');
  assert.equal(catalog.packages[0].domain_owner, 'TEST-DOM');
  assert.equal(catalog.packages[0].repo_owner, 'devVentoGroup/vento-shell');
  assert.equal(catalog.packages[0].ownership_state, 'APLICACION_Y_REPOSITORIO_CONFIRMADOS');
  assert.equal(catalog.packages[0].blocking_condition, 'NINGUNA');
  assert.equal(catalog.packages[4].application_owner, 'POS');
  assert.equal(catalog.packages[9].application_owner, 'FRONTERA_DISTRIBUIDA_TALENTO_VISO_ANIMA');
  assert.equal(catalog.packages[5].repo_owner, 'NO_CONFIRMADO');
  assert.equal(catalog.packages[5].ownership_state, 'REPOSITORIO_NO_CONFIRMADO');
  assert.match(catalog.packages[5].blocking_condition, /Confirmar repositorio propietario de AURA/u);
  assert.equal(catalog.packages.filter(({ application_owner: owner }) => Boolean(owner)).length, 207);
});

test('DELIV-PKG-003 falla cerrado ante ownership faltante o duplicado', () => {
  const row207 = '| `GAP-PKG-207` | `FRONTERA_DISTRIBUIDA` | `TEST-CAP` | `devVentoGroup/vento-shell` | `APLICACION_Y_REPOSITORIO_CONFIRMADOS` | `NINGUNA` |';
  const missing = canonicalCatalogSource().replace(`${row207}\n`, '');
  assert.throws(
    () => parseCanonicalPackageCatalogFromSource(missing, contract, canonicalGapRoutingSource()),
    /DELIV-PKG-003 ownership incompleto:.*GAP-PKG-207/u,
  );

  const row001 = '| `GAP-PKG-001` | `FRONTERA_DISTRIBUIDA` | `TEST-DOM` | `devVentoGroup/vento-shell` | `APLICACION_Y_REPOSITORIO_CONFIRMADOS` | `NINGUNA` |';
  const duplicated = canonicalCatalogSource().replace(row001, `${row001}\n${row001}`);
  assert.throws(
    () => parseCanonicalPackageCatalogFromSource(duplicated, contract, canonicalGapRoutingSource()),
    /DELIV-PKG-003 duplica ownership para GAP-PKG-001/u,
  );
});

test('DELIV-PKG-003 falla cerrado ante contradiccion de dominio o repositorio con E5', () => {
  const row001 = '| `GAP-PKG-001` | `FRONTERA_DISTRIBUIDA` | `TEST-DOM` | `devVentoGroup/vento-shell` | `APLICACION_Y_REPOSITORIO_CONFIRMADOS` | `NINGUNA` |';
  const domainMismatch = canonicalCatalogSource().replace(
    row001,
    row001.replace('`TEST-DOM`', '`TEST-CAP`'),
  );
  assert.throws(
    () => parseCanonicalPackageCatalogFromSource(domainMismatch, contract, canonicalGapRoutingSource()),
    /Contradiccion DELIV-PKG-003\/DELIV-PKG-007.*domain_owner/u,
  );

  const repositoryMismatch = canonicalCatalogSource().replace(
    row001,
    row001.replace('`devVentoGroup/vento-shell`', '`devVentoGroup/vento-pass`'),
  );
  assert.throws(
    () => parseCanonicalPackageCatalogFromSource(repositoryMismatch, contract, canonicalGapRoutingSource()),
    /Contradiccion DELIV-PKG-003\/DELIV-PKG-017.*repo_owner/u,
  );
});

test('catálogo incompleto falla cerrado en lugar de inventar el package faltante', () => {
  const source = canonicalCatalogSource().split('\n').filter((line) => !line.includes('GAP-PKG-207')).join('\n');
  assert.throws(() => parseCanonicalPackageCatalogFromSource(source, contract, canonicalGapRoutingSource()), /esperados 207 packages/u);
});

test('scanner de producción reconcilia los 207 GAP-PKG directamente desde E5', () => {
  const result = scanPackageReadiness({
    root: process.cwd(),
    trigger: 'test-canonical',
    now: () => '2026-08-29T20:00:00.000Z',
    supplied: {
      contract,
      capabilityIndex: { schema_version: 1, index_id: 'EMPTY', discovery_mode: 'EXPLICIT_CANONICAL_MAPPINGS_ONLY', capabilities: {} },
      registry: emptyRegistry(),
      inventory: inventory(),
      instances: verifiedPhysicalDependencies(),
      priorityLanes: { lanes: [] },
      activeSequence: { task_ids: ['NEXT-DOC-001'] },
      canonicalCatalogSource: canonicalCatalogSource(),
      gapRoutingSource: canonicalGapRoutingSource(),
      packageGateRecords: new Map(),
      skipDerivedReports: true,
    },
  });
  assert.equal(result.canonicalCatalog.packages.length, 207);
  assert.equal(result.persistentRegistry.packages.length, 207);
  const persisted = result.persistentRegistry.packages[0];
  assert.equal(persisted.source_kind, 'CANONICAL_GAP_PACKAGE');
  assert.equal(persisted.status, 'COMPILED');
  assert.equal(persisted.canonical_prerequisites, undefined);
  assert.equal(persisted.dossier, undefined);
  assert.equal(persisted.gate_documentary, undefined);
  assert.equal(persisted.blockers, undefined);
  const effective = result.registry.packages[0];
  assert.equal(effective.owner_application, 'FRONTERA_DISTRIBUIDA');
  assert.equal(effective.domain_owner, 'TEST-DOM');
  assert.equal(effective.repository_owner, 'devVentoGroup/vento-shell');
  assert.equal(effective.ownership_state, 'APLICACION_Y_REPOSITORIO_CONFIRMADOS');
  assert.equal(effective.ownership_blocking_condition, 'NINGUNA');
  assert.equal(result.registry.packages.filter(({ source_kind: kind, owner_application: owner }) => kind === 'CANONICAL_GAP_PACKAGE' && Boolean(owner)).length, 207);
  assert.equal(effective.canonical_prerequisites.final_decision_025, 'BLOQUEADO');
  assert.equal(effective.task_prerequisites.total, 4);
  assert.equal(effective.task_prerequisites.approved, 3);
  assert.deepEqual(effective.task_prerequisites.missing_task_ids, ['TEST-PENDING-001']);
  assert.equal(result.registry.implementation_ready_queue.length, 0);
  assert.equal(result.registry.package_execution.current.package_id, 'GAP-PKG-001');
  assert.equal(result.registry.package_execution.current.next_action.type, 'PREPARE_PACKAGE_GATE');
});


test('registry persistente conserva estado mínimo y el detalle completo queda solo en la proyección efectiva', () => {
  const result = scanPackageReadiness({
    root: process.cwd(),
    trigger: 'test-compact-registry',
    now: () => '2026-08-29T20:00:00.000Z',
    supplied: {
      contract,
      capabilityIndex: { schema_version: 1, index_id: 'EMPTY', discovery_mode: 'EXPLICIT_CANONICAL_MAPPINGS_ONLY', capabilities: {} },
      registry: emptyRegistry(),
      inventory: inventory(),
      instances: verifiedPhysicalDependencies(),
      priorityLanes: { lanes: [] },
      activeSequence: { task_ids: ['NEXT-DOC-001'] },
      canonicalCatalogSource: canonicalCatalogSource(),
      gapRoutingSource: canonicalGapRoutingSource(),
      packageGateRecords: new Map(),
      skipDerivedReports: true,
    },
  });
  const persisted = result.persistentRegistry.packages[0];
  assert.deepEqual(Object.keys(persisted).sort(), [
    'detected_at',
    'last_status_change_at',
    'package_id',
    'ready_for_gate_at',
    'source_kind',
    'status',
    'status_scope',
    'updated_at',
  ]);
  assert.ok(result.registry.packages[0].dossier);
  assert.ok(result.registry.packages[0].gate_documentary);
  assert.ok(result.registry.packages[0].canonical_prerequisites);
  assert.match(result.block, /PERSISTENT REGISTRY:/u);
  assert.match(result.block, /DERIVED DETAIL:/u);
  assert.doesNotMatch(result.block, /PACKAGES:\n- GAP-PKG-001/u);
});

test('un GAP-PKG con DELIV-PKG-025 PASS entra a la cola solo cuando dependencias físicas están VERIFIED', () => {
  const result = scanPackageReadiness({
    root: process.cwd(),
    trigger: 'test-canonical-ready',
    now: () => '2026-08-29T20:00:00.000Z',
    supplied: {
      contract,
      capabilityIndex: { schema_version: 1, index_id: 'EMPTY', discovery_mode: 'EXPLICIT_CANONICAL_MAPPINGS_ONLY', capabilities: {} },
      registry: emptyRegistry(),
      inventory: inventory(),
      instances: verifiedPhysicalDependencies(),
      priorityLanes: { lanes: [] },
      activeSequence: { task_ids: ['NEXT-DOC-001'] },
      canonicalCatalogSource: canonicalCatalogSource({ passPackage: 'GAP-PKG-004' }),
      gapRoutingSource: canonicalGapRoutingSource(),
      packageGateRecords: new Map([['GAP-PKG-004', approvedPackageGateRecord('GAP-PKG-004')]]),
      skipDerivedReports: true,
    },
  });
  assert.equal(result.registry.implementation_ready_queue.length, 1);
  assert.equal(result.registry.implementation_ready_queue[0].package_id, 'GAP-PKG-004');
  assert.equal(result.registry.package_execution.current.package_id, 'GAP-PKG-001');
  assert.equal(result.registry.package_execution.current.next_action.type, 'PREPARE_PACKAGE_GATE');
});

test('GAP-CTRL-006 aporta tareas primarias y de soporte sin inferencia semántica', () => {
  const routing = parsePackageTaskRouting(canonicalGapRoutingSource());
  assert.deepEqual(routing.get('GAP-PKG-001').primary_task_ids, ['TEST-CAP-001', 'TEST-PENDING-001']);
  assert.deepEqual(routing.get('GAP-PKG-001').support_task_ids, ['TEST-SUPPORT-001']);
  assert.deepEqual(routing.get('GAP-PKG-002').primary_task_ids, ['TEST-CAP-001']);
});


test('GAP-CTRL-006 preserva columnas cuando una celda contiene pipes escapados o pipes en codigo', () => {
  const source = `### ✅ GAP-CTRL-006 — Routing

| Registro | Referencia representativa | Brecha resumida | Clase | Capacidad / proceso | Propietario / fecha | Tarea primaria | Tareas de soporte | Paquete | Confianza |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| \`EQG-001\` | \`GAP-NEXO-003\` | Contrato con valor A \\| B y literal \`campo|estado\` dentro de la misma celda. | \`CONTRACTUAL\` | \`CAP-06.09\` | \`OWN-OPS / 2026-08-21\` | \`TEST-CAP-001\` — Resolver contrato | \`TEST-SUPPORT-001\` — Apoyo | \`GAP-PKG-001\` | \`ALTA\` |
`;
  const routing = parsePackageTaskRouting(source);
  assert.deepEqual(routing.get('GAP-PKG-001').primary_task_ids, ['TEST-CAP-001']);
  assert.deepEqual(routing.get('GAP-PKG-001').support_task_ids, ['TEST-SUPPORT-001']);
});

test('GAP-CTRL-006 preserva columnas ante un fragmento truncado con backtick sin cierre', () => {
  const source = `### ✅ GAP-CTRL-006 — Routing

| Registro | Referencia representativa | Brecha resumida | Clase | Capacidad / proceso | Propietario / fecha | Tarea primaria | Tareas de soporte | Paquete | Confianza |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| \`EQG-001\` | \`GAP-NEXO-003\` | Extracto truncado con \`campo completo\` y \`fragmento... | \`CONTRACTUAL\` | \`CAP-06.09\` | \`OWN-OPS / 2026-08-21\` | \`TEST-CAP-001\` — Resolver contrato | \`TEST-SUPPORT-001\` — Apoyo | \`GAP-PKG-001\` | \`ALTA\` |
`;
  const routing = parsePackageTaskRouting(source);
  assert.deepEqual(routing.get('GAP-PKG-001').primary_task_ids, ['TEST-CAP-001']);
  assert.deepEqual(routing.get('GAP-PKG-001').support_task_ids, ['TEST-SUPPORT-001']);
});

test('el package muestra tareas aprobadas, pendientes y progreso exacto', () => {
  const result = scanPackageReadiness({
    root: process.cwd(),
    trigger: 'test-task-progress',
    now: () => '2026-08-29T20:00:00.000Z',
    supplied: {
      contract,
      capabilityIndex: { schema_version: 1, index_id: 'EMPTY', discovery_mode: 'EXPLICIT_CANONICAL_MAPPINGS_ONLY', capabilities: {} },
      registry: emptyRegistry(),
      inventory: inventory(),
      instances: verifiedPhysicalDependencies(),
      priorityLanes: { lanes: [] },
      activeSequence: { task_ids: ['NEXT-DOC-001'] },
      canonicalCatalogSource: canonicalCatalogSource(),
      gapRoutingSource: canonicalGapRoutingSource(),
      packageGateRecords: new Map(),
      skipDerivedReports: true,
    },
  });
  const pkg = result.registry.packages.find(({ package_id: packageId }) => packageId === 'GAP-PKG-001');
  assert.equal(pkg.task_prerequisites.total, 4);
  assert.equal(pkg.task_prerequisites.approved, 3);
  assert.equal(pkg.task_prerequisites.remaining, 1);
  assert.equal(pkg.task_prerequisites.progress_percent, 75);
  assert.deepEqual(pkg.task_prerequisites.missing_task_ids, ['TEST-PENDING-001']);
  const pending = pkg.task_prerequisites.tasks.find(({ task_id: taskId }) => taskId === 'TEST-PENDING-001');
  assert.deepEqual(pending.roles, ['PRIMARY']);
  const dominant = pkg.task_prerequisites.tasks.find(({ task_id: taskId }) => taskId === 'TEST-DOM-001');
  assert.deepEqual(dominant.roles, ['DOMINANT']);
  assert.ok(pkg.blockers.includes('TASK_PREREQUISITE:TEST-PENDING-001:FAIL'));
  assert.ok(!pkg.blockers.some((blocker) => blocker.startsWith('CANONICAL_EXIT_OWNER:')));
  assert.ok(!pkg.blockers.some((blocker) => blocker.startsWith('CANONICAL_EXIT_CONDITION:')));
  assert.ok(!pkg.blockers.some((blocker) => blocker.startsWith('GATE:')));
});

test('nearest-to-ready queda como dato diagnóstico y no compite con el primary gobernado', () => {
  const result = scanPackageReadiness({
    root: process.cwd(),
    trigger: 'test-nearest-progress',
    now: () => '2026-08-29T20:00:00.000Z',
    supplied: {
      contract,
      capabilityIndex: { schema_version: 1, index_id: 'EMPTY', discovery_mode: 'EXPLICIT_CANONICAL_MAPPINGS_ONLY', capabilities: {} },
      registry: emptyRegistry(),
      inventory: inventory(),
      instances: verifiedPhysicalDependencies(),
      priorityLanes: { lanes: [] },
      activeSequence: { task_ids: ['NEXT-DOC-001'] },
      canonicalCatalogSource: canonicalCatalogSource(),
      gapRoutingSource: canonicalGapRoutingSource(),
      packageGateRecords: new Map(),
      skipDerivedReports: true,
    },
  });
  assert.equal(result.registry.nearest_to_ready_queue[0].package_id, 'GAP-PKG-002');
  assert.equal(result.registry.nearest_to_ready_queue[0].task_progress.remaining, 0);
  assert.match(result.block, /PRIMARY PACKAGE: GAP-PKG-001/u);
  assert.match(result.block, /ACTION: PREPARE_PACKAGE_GATE/u);
  assert.doesNotMatch(result.block, /NEAREST TO READY/u);
});

test('detalle por package lista tareas, gates y obligaciones restantes', () => {
  const result = scanPackageReadiness({
    root: process.cwd(),
    trigger: 'test-detail',
    now: () => '2026-08-29T20:00:00.000Z',
    supplied: {
      contract,
      capabilityIndex: { schema_version: 1, index_id: 'EMPTY', discovery_mode: 'EXPLICIT_CANONICAL_MAPPINGS_ONLY', capabilities: {} },
      registry: emptyRegistry(),
      inventory: inventory(),
      instances: verifiedPhysicalDependencies(),
      priorityLanes: { lanes: [] },
      activeSequence: { task_ids: ['NEXT-DOC-001'] },
      canonicalCatalogSource: canonicalCatalogSource(),
      gapRoutingSource: canonicalGapRoutingSource(),
      packageGateRecords: new Map(),
      skipDerivedReports: true,
    },
  });
  const detail = renderPackageDetail(result.registry.packages[0]);
  assert.match(detail, /TASK PREREQUISITES:/u);
  assert.match(detail, /TEST-PENDING-001/u);
  assert.match(detail, /NON-TASK GATES:/u);
  assert.match(detail, /TOTAL REMAINING OBLIGATIONS:/u);
  assert.equal(result.integrityAudit.status, 'PASS');
  const report = renderReadinessMarkdown(result);
  assert.match(report, /GUÍA VIVA DE GOVERNED FRONTIER Y READINESS DE PACKAGES/u);
  assert.match(report, /## Panel de control/u);
  assert.match(report, /## Cómo funciona la governed frontier/u);
  assert.match(report, /## Primary frontier package/u);
  assert.match(report, /## Progreso por capa/u);
  assert.match(report, /## Secuencia topológica completa/u);
  assert.match(report, /## Packages diferidos fuera de la frontier canónica/u);
  assert.match(report, /PREPARE_PACKAGE_GATE/u);
  assert.match(report, /npm run docs:package:start -- --package-id GAP-PKG-001/u);
  assert.match(report, /no monopoliza|sin monopolizar/u);
  assert.match(report, /Catálogo completo/u);
  assert.match(report, /Tareas faltantes/u);
  assert.match(report, /TEST-PENDING-001/u);
  assert.match(report, /package-gap-pkg-001/u);
});

test('la cola diagnóstica de ready es estable y no decide el turno por carril ni antigüedad', () => {
  const queue = prioritizeImplementationReadyQueue([
    { package_id: 'GAP-PKG-002', ready_for_gate_at: '2026-08-29T10:00:00Z' },
    { package_id: 'GAP-PKG-001', ready_for_gate_at: '2026-08-29T11:00:00Z' },
    { package_id: 'SPECIAL-001', ready_for_gate_at: '2026-08-29T12:00:00Z' },
  ], { lanes: [{ lane_id: 'SPECIAL-001', active: true, status: 'ACTIVE' }] });
  assert.deepEqual(queue.map(({ package_id: packageId }) => packageId), ['GAP-PKG-001', 'GAP-PKG-002', 'SPECIAL-001']);
});

test('Supabase remoto exige R0 y fundaciones MRP015 antes del package', () => {
  const gate = { physical_identity: { targets: [{ path: 'supabase/functions/example/index.ts' }] } };
  const requirements = derivePackageExecutionRequirements({ contract, packageGate: gate });
  assert.equal(requirements.supabase_mutation_required, true);
  assert.deepEqual(requirements.target_paths, ['supabase/functions/example/index.ts']);
  assert.deepEqual(requirements.target_path_keys, []);
  assert.deepEqual(requirements.resource_keys, []);
  assert.deepEqual(requirements.pre_entry_foundation_gates.map(({ foundation_id: id }) => id), ['MRP015-000', 'MRP015-010', 'MRP015-020', 'MRP015-030', 'MRP015-040']);

  const unresolvedContract = structuredClone(contract);
  for (const foundation of unresolvedContract.physical_dependencies.supabase_pre_e5_foundation.ordered_foundation_gates) {
    foundation.evidence_ref = null;
  }

  const instances = verifiedPhysicalDependencies();
  for (const instanceId of unresolvedContract.physical_dependencies.supabase_pre_e5_foundation.required_verified_instances) {
    instances.set(instanceId, { instance_id: instanceId, status: 'VERIFIED' });
  }

  const unresolvedRequirements = derivePackageExecutionRequirements({ contract: unresolvedContract, packageGate: gate });
  const unresolved = evaluatePhysicalDependencies({ contract: unresolvedContract, instances, executionRequirements: unresolvedRequirements });
  const firstFoundation = unresolved.evidence.find(({ kind, status }) => kind === 'FOUNDATION_GATE' && status !== 'PASS');
  assert.equal(firstFoundation.source, 'MRP015-000::TOOLCHAIN_READY');
  assert.equal(unresolved.available, false);

  const resolved = structuredClone(unresolvedContract);
  for (const foundation of resolved.physical_dependencies.supabase_pre_e5_foundation.ordered_foundation_gates) {
    const checks = requiredFoundationCheckIds(foundation.foundation_id).map((id) => ({
      id,
      status: 'PASS',
      exit_code: 0,
      stdout_sha256: 'a'.repeat(64),
      stderr_sha256: 'b'.repeat(64),
    }));
    foundation.evidence_ref = buildFoundationEvidenceRef({
      gate: foundation,
      checks,
      recordedAt: '2026-09-03T21:29:46-05:00',
    });
  }
  resolved.physical_dependencies.supabase_pre_e5_foundation.remote_environment_identity.bindings.STAGING = { classification: 'STAGING', project_ref: 'staging-fixture-ref', owner: 'fixture-owner' };
  resolved.physical_dependencies.supabase_pre_e5_foundation.remote_environment_identity.bindings.PRODUCTION = { classification: 'PRODUCTION', project_ref: 'production-fixture-ref', owner: 'fixture-owner' };

  const resolvedRequirements = derivePackageExecutionRequirements({ contract: resolved, packageGate: gate });
  const resolvedDependencies = evaluatePhysicalDependencies({ contract: resolved, instances, executionRequirements: resolvedRequirements });
  assert.equal(resolvedDependencies.status, 'PASS');
  assert.equal(resolvedDependencies.available, true);
});

test('evidence_ref libre o corrupta nunca cierra una foundation PRE_E5', () => {
  const gate = structuredClone(contract.physical_dependencies.supabase_pre_e5_foundation.ordered_foundation_gates[0]);
  assert.equal(validateFoundationEvidenceRef(gate, 'fixture:MRP015-000').status, 'FAIL');

  const checks = requiredFoundationCheckIds(gate.foundation_id).map((id) => ({
    id, status: 'PASS', exit_code: 0, stdout_sha256: 'a'.repeat(64), stderr_sha256: 'b'.repeat(64),
  }));
  const valid = buildFoundationEvidenceRef({ gate, checks, recordedAt: '2026-09-03T21:29:46-05:00' });
  assert.equal(validateFoundationEvidenceRef(gate, valid).status, 'PASS');

  const corrupt = structuredClone(valid);
  corrupt.payload_sha256 = '0'.repeat(64);
  assert.equal(validateFoundationEvidenceRef(gate, corrupt).status, 'FAIL');
});

test('DELIV-PKG-019 proyecta rollout y ambiente para las 207 raíces', () => {
  const projection = parseDeploymentEnvironmentProjection(canonicalCatalogSource());
  assert.equal(projection.size, 207);
  assert.deepEqual(projection.get('GAP-PKG-001'), {
    rollout_profile_019: 'TP-DB-001',
    deployment_environment_profile_019: 'ENV-SUPABASE-LOCAL-CI-STAGING',
    rollout_result_019: 'ESPECIFICADO',
  });
});

test('GAP-PKG Supabase exige exactamente el binding STAGING y excluye PRODUCTION en CI020', () => {
  const entry = {
    rollout_profile_019: 'TP-DB-001',
    deployment_environment_profile_019: 'ENV-SUPABASE-LOCAL-CI-STAGING',
  };
  const packageGate = {
    deployment_environment: {
      canonical_task_id: 'DELIV-PKG-019',
      rollout_profile: 'TP-DB-001',
      environment_profile: 'ENV-SUPABASE-LOCAL-CI-STAGING',
      targets: [{ environment_role: 'STAGING', target_type: 'SUPABASE_PROJECT_REF', target_id: 'rcrxixmqhrndcervbllp', owner: 'SUPA-TRANS-015' }],
      production_authorized: false,
    },
  };
  const executionRequirements = {
    supabase_mutation_required: true,
    remote_environment_identity: {
      bindings: {
        STAGING: { classification: 'STAGING', project_ref: 'rcrxixmqhrndcervbllp', owner: 'SUPA-TRANS-015' },
      },
    },
  };
  const pass = evaluatePackageDeploymentEnvironment({ entry, packageGate, executionRequirements });
  assert.equal(pass.status, 'PASS');

  const wrong = structuredClone(packageGate);
  wrong.deployment_environment.targets[0].target_id = 'wrong-project';
  const fail = evaluatePackageDeploymentEnvironment({ entry, packageGate: wrong, executionRequirements });
  assert.equal(fail.status, 'FAIL');
  assert.ok(fail.problems.includes('STAGING_PROJECT_REF_MISMATCH'));
});

// CORR-010 STRICT PHYSICAL STAGES 207
test('las 207 identidades GAP-PKG conservan CI020→CI021→CI022→CI023→CI024 sin saltos', async () => {
  const { physicalLifecycleStatus } = await import('./package-readiness-scanner.mjs');
  const physicalContract = { implementation_entry_task: 'SHELL-CI-020' };
  for (let number = 1; number <= 207; number += 1) {
    const packageId = `GAP-PKG-${String(number).padStart(3, '0')}`;
    const instances = new Map();
    assert.equal(physicalLifecycleStatus(packageId, instances, physicalContract), null);

    const ids = ['SHELL-CI-020', 'SHELL-CI-021', 'SHELL-CI-022', 'SHELL-CI-023', 'SHELL-CI-024']
      .map((taskId) => `${taskId}::${packageId}`);
    instances.set(ids[0], { instance_id: ids[0], status: 'AUTHORIZED' });
    assert.equal(physicalLifecycleStatus(packageId, instances, physicalContract).nextExecution, ids[0]);
    instances.set(ids[0], { instance_id: ids[0], status: 'VERIFIED' });
    assert.equal(physicalLifecycleStatus(packageId, instances, physicalContract).nextExecution, ids[1]);
    for (let index = 1; index < 4; index += 1) {
      instances.set(ids[index], { instance_id: ids[index], status: 'VERIFIED' });
      assert.equal(physicalLifecycleStatus(packageId, instances, physicalContract).nextExecution, ids[index + 1]);
    }
    instances.set(ids[4], { instance_id: ids[4], status: 'VERIFIED' });
    assert.equal(physicalLifecycleStatus(packageId, instances, physicalContract).status, 'CLOSED');
  }
});

test('scanner rechaza artefactos de una etapa física futura', async () => {
  const { physicalLifecycleStatus } = await import('./package-readiness-scanner.mjs');
  const instances = new Map([
    ['SHELL-CI-020::GAP-PKG-001', { instance_id: 'SHELL-CI-020::GAP-PKG-001', status: 'VERIFIED' }],
    ['SHELL-CI-023::GAP-PKG-001', { instance_id: 'SHELL-CI-023::GAP-PKG-001', status: 'AUTHORIZED' }],
  ]);
  assert.throws(
    () => physicalLifecycleStatus('GAP-PKG-001', instances, { implementation_entry_task: 'SHELL-CI-020' }),
    /PHYSICAL_STAGE_SEQUENCE_VIOLATION/u,
  );
});

test('MRP015-050 queda ligado al package, CI020, HEAD, alcance y contenido materializado', async () => {
  const os = await import('node:os');
  const pathModule = await import('node:path');
  const {
    buildInPackageCandidateEvidence,
    validateInPackageCandidateEvidence,
  } = await import('./package-readiness-scanner.mjs');
  const root = fs.mkdtempSync(pathModule.join(os.tmpdir(), 'vento-mrp015-050-'));
  try {
    const contractPath = pathModule.join(root, 'scripts/docs/package-readiness');
    fs.mkdirSync(contractPath, { recursive: true });
    fs.writeFileSync(
      pathModule.join(contractPath, 'package-readiness-contract.json'),
      JSON.stringify(contract),
      'utf8',
    );
    const target = pathModule.join(root, 'supabase/functions/test/index.ts');
    fs.mkdirSync(pathModule.dirname(target), { recursive: true });
    fs.writeFileSync(target, 'export const value = 1;\n', 'utf8');
    const instance = {
      instance_id: 'SHELL-CI-020::GAP-PKG-001',
      task_id: 'SHELL-CI-020',
      authorized_changes: [{
        repo: 'vento-group-sas/vento-shell',
        path: 'supabase/functions/test/index.ts',
        change: 'MODIFY',
      }],
      evidence: [],
    };
    const gate = contract.physical_dependencies.supabase_pre_e5_foundation.in_package_candidate_gate;
    const head = 'a'.repeat(40);
    const evidence = buildInPackageCandidateEvidence({
      root,
      packageId: 'GAP-PKG-001',
      instance,
      gate,
      candidateHeadSha: head,
      recordedAt: '2026-09-05T20:00:00.000Z',
    });
    instance.evidence.push(evidence);
    assert.equal(validateInPackageCandidateEvidence({
      root,
      packageId: 'GAP-PKG-001',
      instance,
      gate,
      currentHeadSha: head,
    }).status, 'PASS');
    assert.equal(validateInPackageCandidateEvidence({
      root,
      packageId: 'GAP-PKG-002',
      instance,
      gate,
      currentHeadSha: head,
    }).status, 'FAIL');
    fs.writeFileSync(target, 'export const value = 2;\n', 'utf8');
    assert.match(validateInPackageCandidateEvidence({
      root,
      packageId: 'GAP-PKG-001',
      instance,
      gate,
      currentHeadSha: head,
    }).detail, /stale/u);
  } finally {
    fs.rmSync(root, { recursive: true, force: true });
  }
});

test('CORR-011 MRP015-040 hosted parity: exige STAGING full antes de certificar RESOURCE_MANIFEST_PASS', () => {
  assert.deepEqual(
    requiredFoundationCheckIds('MRP015-040'),
    [
      'MIGRATION_MANIFEST',
      'EXPECTED_RESOURCE_MANIFEST',
      'STAGING_HOSTED_RESOURCE_PARITY',
    ],
  );

  const foundation =
    contract.physical_dependencies.supabase_pre_e5_foundation;

  const staging =
    foundation.remote_environment_identity.bindings.STAGING;

  assert.deepEqual(
    remoteDriftArgs(staging, 'STAGING', 'full'),
    [
      'run', '--silent', 'supabase:drift:remote', '--',
      '--environment-role', 'staging',
      '--project-ref', staging.project_ref,
      '--owner', staging.owner,
      '--scope', 'full',
      '--strict',
    ],
  );

  const gate = foundation.ordered_foundation_gates.find(
    (entry) =>
      entry.foundation_id === 'MRP015-040'
      && entry.gate_id === 'RESOURCE_MANIFEST_PASS',
  );

  assert.ok(gate);

  const passCheck = (id) => ({
    id,
    status: 'PASS',
    exit_code: 0,
    stdout_sha256: 'a'.repeat(64),
    stderr_sha256: 'b'.repeat(64),
  });

  assert.throws(
    () => buildFoundationEvidenceRef({
      gate,
      checks: [
        passCheck('MIGRATION_MANIFEST'),
        passCheck('EXPECTED_RESOURCE_MANIFEST'),
      ],
    }),
    /faltan checks STAGING_HOSTED_RESOURCE_PARITY/u,
  );

  const evidence = buildFoundationEvidenceRef({
    gate,
    checks: [
      passCheck('MIGRATION_MANIFEST'),
      passCheck('EXPECTED_RESOURCE_MANIFEST'),
      passCheck('STAGING_HOSTED_RESOURCE_PARITY'),
    ],
    recordedAt: '2026-09-05T19:37:00-05:00',
  });

  assert.equal(evidence.status, 'PASS');
  assert.deepEqual(
    evidence.checks.map((entry) => entry.id),
    [
      'MIGRATION_MANIFEST',
      'EXPECTED_RESOURCE_MANIFEST',
      'STAGING_HOSTED_RESOURCE_PARITY',
    ],
  );
});


test('CORR-011_ACCEPTANCE: observacion con drift nunca materializa MRP015-040 como PASS', () => {
  const foundation = contract.physical_dependencies.supabase_pre_e5_foundation;
  const gate = foundation.ordered_foundation_gates.find((row) => row.foundation_id === 'MRP015-040');
  const checks = requiredFoundationCheckIds(gate.foundation_id).map((id) => ({
    id, status: 'PASS', exit_code: 0,
    stdout_sha256: 'a'.repeat(64), stderr_sha256: 'b'.repeat(64),
  }));
  const failed = checks.map((row) => row.id === 'STAGING_HOSTED_RESOURCE_PARITY'
    ? { ...row, status: 'FAIL', exit_code: 1 } : row);
  assert.throws(() => buildFoundationEvidenceRef({ gate, checks: failed }), /checks no PASS/u);
  const ambiguous = failed.map((row) => ({ ...row, status: 'PASS' }));
  assert.throws(() => buildFoundationEvidenceRef({ gate, checks: ambiguous }), /checks no PASS/u);
  const evidence = buildFoundationEvidenceRef({ gate, checks });
  evidence.checks.find((row) => row.id === 'STAGING_HOSTED_RESOURCE_PARITY').exit_code = 1;
  assert.equal(validateFoundationEvidenceRef(gate, evidence).status, 'FAIL');
  assert.equal(validateFoundationEvidenceRef(gate, null).status, 'UNKNOWN');
});
