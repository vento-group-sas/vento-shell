import assert from 'node:assert/strict';
import test from 'node:test';

import {
  injectReadinessIntoSources,
  renderReadinessStarterBlock,
  stableReadinessStarterProjection,
} from './chatgpt-work-starter-readiness.mjs';

function readiness(ready = true) {
  const packageId = 'NEXO-PACKAGE-001';
  const queue = ready ? [{
    package_id: packageId,
    capability_id: 'NEXO_PACKAGE',
    owner_application: 'nexo',
    gate_id: 'E5-GATE-008::NEXO-PACKAGE-001',
    next_execution: 'SHELL-CI-020::NEXO-PACKAGE-001',
  }] : [];
  const current = {
    position: 1,
    package_id: packageId,
    layer: 2,
    status: ready ? 'IMPLEMENTATION_READY' : 'COMPILED',
    next_action: ready
      ? { type: 'AUTHORIZE_PHYSICAL_IMPLEMENTATION', target: `SHELL-CI-020::${packageId}`, command: 'npm run docs:implementation:status', reason: 'Listo.' }
      : { type: 'PREPARE_PACKAGE_GATE', target: packageId, command: `npm run docs:package:prepare -- --package-id ${packageId}`, reason: 'Falta expediente.' },
  };
  return {
    block: '=== PACKAGE READINESS SCAN ===\nIMPLEMENTATION READY:\n- NEXO-PACKAGE-001\n=== END PACKAGE READINESS ===',
    registry: {
      implementation_ready_queue: queue,
      package_execution: {
        mode: 'DETERMINISTIC_GOVERNED_FRONTIER',
        state: ready ? 'READY_FOR_AUTHORIZATION' : 'BLOCKED_ON_CURRENT',
        current,
        sequence: [current],
        deferred: [],
      },
      packages: [{ package_id: packageId, package_gate: ready ? { status: 'APPROVED_FOR_IMPLEMENTATION' } : null }],
    },
  };
}

const baseResult = {
  control: {
    primaryAction: { type: 'DOCUMENTAR_TAREA', target: 'DOC-001' },
    physical: { active: null },
  },
  source: 'BASE SELECTOR\n',
  documentationSource: 'INTENT_LOCK: DOCUMENTATION\nCONVERSATION_LANE: DOCUMENTARY\nDO_NOT_SWITCH_LANES: TRUE\nBASE DOCUMENTATION\n',
  implementationSource: 'INTENT_LOCK: PHYSICAL_IMPLEMENTATION\nCONVERSATION_LANE: PHYSICAL\nDO_NOT_SWITCH_LANES: TRUE\nNO EXISTE UNA INSTANCIA FÍSICA ACTIVA.\n',
};

const coordinated = {
  readinessCandidate: {
    packageId: 'NEXO-PACKAGE-001',
    instanceId: 'SHELL-CI-020::NEXO-PACKAGE-001',
  },
};

test('el mismo snapshot de readiness se inyecta en selector y ambos iniciadores', () => {
  const result = injectReadinessIntoSources({
    baseResult,
    readiness: readiness(),
    coordinated,
  });
  assert.match(result.documentationSource, /^INTENT_LOCK: DOCUMENTATION/u);
  assert.match(result.implementationSource, /^INTENT_LOCK: PHYSICAL_IMPLEMENTATION/u);
  assert.ok(result.documentationSource.indexOf('PACKAGE READINESS SCANNER') > result.documentationSource.indexOf('DO_NOT_SWITCH_LANES: TRUE'));
  assert.ok(result.implementationSource.indexOf('PACKAGE READINESS SCANNER') > result.implementationSource.indexOf('DO_NOT_SWITCH_LANES: TRUE'));
  for (const source of [result.source, result.documentationSource, result.implementationSource]) {
    assert.match(source, /PACKAGE READINESS SCANNER — OBLIGATORIO/u);
    assert.match(source, /NEXO-PACKAGE-001/u);
    assert.match(source, /E5-GATE-008::NEXO-PACKAGE-001/u);
    assert.match(source, /UNKNOWN/u);
    assert.match(source, /PACKAGE GATE LIFECYCLE — VALIDACIÓN OBLIGATORIA/u);
    assert.match(source, /docs:package:gate:check/u);
  }
});

test('el iniciador documental avisa package listo sin cambiar de carril', () => {
  const block = renderReadinessStarterBlock({ readiness: readiness(), lane: 'DOCUMENTATION', coordinated });
  assert.match(block, /Conservar esta conversación en DOCUMENTATION/u);
  assert.match(block, /NO cambiar de carril/u);
  assert.match(block, /PACKAGE IMPLEMENTABLE DETECTED/u);
  assert.match(block, /Physical authorization required: TRUE/u);
});

test('el iniciador físico distingue package listo de instancia AUTHORIZED', () => {
  const block = renderReadinessStarterBlock({ readiness: readiness(), lane: 'PHYSICAL_IMPLEMENTATION', coordinated });
  assert.match(block, /primary derivado/u);
  assert.match(block, /no equivale a AUTHORIZED/u);
  assert.match(block, /Status: READY_FOR_AUTHORIZATION/u);
  assert.match(block, /No implementation instance is authorized/u);
});

test('cola vacía no inventa candidato implementable', () => {
  const block = renderReadinessStarterBlock({ readiness: readiness(false), lane: 'SELECTOR', coordinated: null });
  assert.match(block, /PACKAGE_EXECUTION_GOVERNED_FRONTIER/u);
  assert.match(block, /- PRIMARY 1\/1: NEXO-PACKAGE-001 -> PREPARE_PACKAGE_GATE/u);
  assert.doesNotMatch(block, /PACKAGE IMPLEMENTABLE DETECTED/u);
});

test('el expediente enfocado siempre pertenece al package actual derivado', () => {
  const snapshot = readiness(false);
  snapshot.registry.package_execution.current = {
    ...snapshot.registry.package_execution.current,
    package_id: 'GAP-PKG-061',
    next_action: { type: 'MATURE_PACKAGE_GATE', target: 'GAP-PKG-061', command: 'npm run docs:package:gate:status -- --package-id GAP-PKG-061', reason: 'Completar gate.' },
  };
  snapshot.registry.package_execution.sequence = [snapshot.registry.package_execution.current];
  snapshot.registry.packages = [{
    package_id: 'GAP-PKG-061',
    package_gate: { status: 'WAITING_DOCUMENTATION', relative_path: 'package-gate-instances/GAP-PKG-061.json' },
  }];
  const block = renderReadinessStarterBlock({ readiness: snapshot, lane: 'SELECTOR', coordinated: null });
  assert.match(block, /Selección humana de package: FALSE/u);
  assert.match(block, /Primary package: GAP-PKG-061/u);
  assert.match(block, /Expediente exacto: package-gate-instances\/GAP-PKG-061.json/u);
  assert.match(block, /Acción exacta: MATURE_PACKAGE_GATE/u);
});

test('la proyección del starter es determinista entre triggers operacionales', () => {
  const chatgpt = '=== PACKAGE READINESS SCAN ===\n\nTRIGGER: chatgpt-starter\nCAPABILITIES DETECTED: 2\n\n=== END PACKAGE READINESS ===';
  const localSync = '=== PACKAGE READINESS SCAN ===\n\nTRIGGER: local-derived-sync\nCAPABILITIES DETECTED: 2\n\n=== END PACKAGE READINESS ===';
  const expected = stableReadinessStarterProjection(chatgpt);
  assert.equal(expected, stableReadinessStarterProjection(localSync));
  assert.match(expected, /TRIGGER: STARTER_PROJECTION/u);
  assert.doesNotMatch(expected, /chatgpt-starter|local-derived-sync/u);
});

test('el starter diferencia CURRENT_PACKAGE de CURRENT_EXECUTABLE_WORK para fundaciones', () => {
  const snapshot = readiness(false);
  snapshot.registry.package_execution.current.current_work = {
    kind: 'FOUNDATION_GATE',
    id: 'MRP015-000',
    gate_id: 'TOOLCHAIN_READY',
    owner_task: 'SUPA-TRANS-015',
    consumer_package_id: 'NEXO-PACKAGE-001',
    status: 'UNKNOWN',
  };
  snapshot.registry.package_execution.current_work = snapshot.registry.package_execution.current.current_work;
  snapshot.registry.package_execution.current.next_action = { type: 'WAIT_FOR_FOUNDATION_PREREQUISITE', target: 'MRP015-000', command: 'npm run docs:package:readiness:check -- --package NEXO-PACKAGE-001', reason: 'Pendiente.' };

  const block = renderReadinessStarterBlock({ readiness: snapshot, lane: 'PHYSICAL_IMPLEMENTATION', coordinated: null });
  assert.match(block, /CURRENT_EXECUTABLE_WORK: MRP015-000/u);
  assert.match(block, /CURRENT_EXECUTABLE_WORK_KIND: FOUNDATION_GATE/u);
  assert.match(block, /BLOCKED_CONSUMER_PACKAGE: NEXO-PACKAGE-001/u);
});
