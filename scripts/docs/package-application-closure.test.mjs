import assert from 'node:assert/strict';
import test from 'node:test';

import {
  APPLICATION_CLOSURE_MODEL_ID,
  buildPackageApplicationClosure,
  parseCapabilityConsumerProjection,
  resolveCapabilityConsumers,
} from './package-application-closure.mjs';

const CAP_MAP_005 = `
### ✅ CAP-MAP-005 — Definir aplicaciones y sistemas consumidores

#### 6. Catálogo inicial de posibles consumidores

| Código | Aplicación |
| --- | --- |
| \`shell\` | Vento OS |
| \`anima\` | ANIMA |
| \`viso\` | VISO |
| \`nexo\` | NEXO |
| \`fogo\` | FOGO |
| \`origo\` | ORIGO |
| \`pulso\` | PULSO |
| \`numera\` | NUMERA |
| \`aura\` | AURA |
| \`pass\` | Vento Pass |

#### 9. Mapa base por familia

| Familia | Propietaria candidata | Consumidores VENTO candidatos | Externos o medios por confirmar | Motivo principal |
| --- | --- | --- | --- | --- |
${Array.from({ length: 18 }, (_, index) => {
  const family = String(index + 1).padStart(2, '0');
  if (family === '01') return `| \`CAP-${family}\` Gobierno | \`viso\` | \`shell\` y aplicaciones afectadas por la regla | documentos | regla |`;
  if (family === '02') return `| \`CAP-${family}\` Personas | \`viso\` | aplicaciones que requieren contexto laboral: \`nexo\`, \`fogo\`, \`origo\`, \`pulso\` y \`numera\` | archivos | contexto |`;
  if (family === '05') return `| \`CAP-${family}\` Compras | \`origo\` | \`nexo\` y \`numera\`; \`fogo\` cuando aplique | proveedor | compra |`;
  return `| \`CAP-${family}\` Familia | \`viso\` | \`viso\` | medios | motivo |`;
}).join('\n')}

#### 10. Excepciones y fronteras específicas

| Subcapacidades | Consumidor | Necesidad | Frontera |
| --- | --- | --- | --- |
| \`CAP-05.07\` a \`CAP-05.10\` | \`nexo\` | recepción | frontera |
| \`CAP-05.08\` y \`CAP-05.12\` | \`numera\` | obligación | frontera |
| \`CAP-15.06\` a \`CAP-15.09\` | aplicación afectada y medio de soporte por confirmar | soporte | frontera |

### ✅ CAP-MAP-006 — Siguiente
`;

function canonicalPackages(overrides = new Map()) {
  return Array.from({ length: 207 }, (_, index) => {
    const packageId = `GAP-PKG-${String(index + 1).padStart(3, '0')}`;
    return {
      package_id: packageId,
      source_kind: 'CANONICAL_GAP_PACKAGE',
      owner_application: index === 0 ? 'ORIGO' : 'FRONTERA_DISTRIBUIDA',
      domain_owner: index === 0 ? 'AUTH-DB' : 'TEST',
      repository_owner: 'devVentoGroup/vento-shell',
      capability_ids: index === 0 ? ['CAP-05.08'] : ['CAP-01.01'],
      execution: { depends_on_package_ids: index === 1 ? ['GAP-PKG-001'] : [] },
      canonical_prerequisites: {
        implementation_unit_id: index === 0 ? 'unit-e5-001' : 'PENDIENTE',
      },
      ...(overrides.get(packageId) ?? {}),
    };
  });
}

test('CAP-MAP-005 materializa 10 apps y 18 familias', () => {
  const projection = parseCapabilityConsumerProjection(CAP_MAP_005);
  assert.equal(projection.model_id, APPLICATION_CLOSURE_MODEL_ID);
  assert.equal(projection.applications.length, 10);
  assert.equal(projection.families.size, 18);
});

test('resuelve consumidores por familia aunque capability no tenga excepción', () => {
  const projection = parseCapabilityConsumerProjection(CAP_MAP_005);
  const resolved = resolveCapabilityConsumers('CAP-01.01', projection);
  assert.deepEqual(resolved.explicit_application_ids, ['shell']);
  assert.equal(resolved.unresolved_consumers.length, 1);
  assert.match(resolved.unresolved_consumers[0], /aplicaciones afectadas/u);
});

test('no convierte en UNKNOWN un descriptor genérico que enumera exhaustivamente apps tras dos puntos', () => {
  const projection = parseCapabilityConsumerProjection(CAP_MAP_005);
  const resolved = resolveCapabilityConsumers('CAP-02.01', projection);
  assert.deepEqual(resolved.explicit_application_ids, ['fogo', 'nexo', 'numera', 'origo', 'pulso']);
  assert.deepEqual(resolved.unresolved_consumers, []);
});

test('suma base y excepción exacta sin inferir consumidores genéricos', () => {
  const projection = parseCapabilityConsumerProjection(CAP_MAP_005);
  const resolved = resolveCapabilityConsumers('CAP-05.08', projection);
  assert.deepEqual(resolved.explicit_application_ids, ['fogo', 'nexo', 'numera']);

  const generic = resolveCapabilityConsumers('CAP-15.07', projection);
  assert.deepEqual(generic.explicit_application_ids, ['viso']);
  assert.equal(generic.unresolved_consumers.length, 1);
  assert.match(generic.unresolved_consumers[0], /aplicación afectada/u);
});

test('mantiene relaciones separadas y solo cierra criterio por TREQ PASS explícito', () => {
  const projection = parseCapabilityConsumerProjection(CAP_MAP_005);
  const packageGates = [{
    relative_path: 'docs/plan-canonico/modular/package-gate-instances/GAP-PKG-001.json',
    record: {
      package_id: 'GAP-PKG-001',
      implementation_units: [{ unit_id: 'physical-unit-001', repository: 'vento-shell' }],
      evidence_plan: {
        acceptance_criteria: [
          'TREQ-TEST-001 y TREQ-TEST-002 deben tener PASS explícito.',
          'El flujo debe conservar semántica previa.',
        ],
      },
    },
  }];
  const implementationInstances = [{
    relative_path: 'docs/plan-canonico/modular/implementation-instances/SHELL-CI-020__GAP-PKG-001.json',
    record: {
      instance_id: 'SHELL-CI-020::GAP-PKG-001',
      task_id: 'SHELL-CI-020',
      status: 'VERIFIED',
      evidence: [
        'TREQ TREQ-TEST-001 PASS',
        'TREQ TREQ-TEST-002 PASS',
        'VALIDATION npm test PASS',
      ],
    },
  }];

  const model = buildPackageApplicationClosure({
    registry: { packages: canonicalPackages() },
    consumerProjection: projection,
    packageGates,
    implementationInstances,
  });
  const pkg = model.packages[0];

  assert.equal(pkg.relations.PRERREQUISITO_DE.length, 0);
  assert.equal(pkg.relations.IMPLEMENTADO_POR.length, 2);
  assert.deepEqual(
    pkg.relations.CONSUMIDO_POR.map(({ application_id: id }) => id),
    ['fogo', 'nexo', 'numera'],
  );
  assert.equal(pkg.relations.EVIDENCIADO_POR.length, 3);
  assert.equal(pkg.relations.CIERRA_CRITERIO_DE.length, 1);
  assert.equal(pkg.acceptance_criteria[0].state, 'PASS');
  assert.equal(pkg.acceptance_criteria[1].state, 'UNKNOWN');
  assert.equal(pkg.closure.acceptance_criteria_explicitly_closed, 1);
  assert.equal(pkg.closure.acceptance_criteria_unknown, 1);
});

test('IMPLEMENTADO_POR deduplica la misma unidad conservando ambas procedencias', () => {
  const overrides = new Map([[
    'GAP-PKG-001',
    {
      capability_ids: ['CAP-02.06'],
      canonical_prerequisites: { implementation_unit_id: 'unit-001' },
    },
  ]]);
  const registry = { packages: canonicalPackages(overrides) };
  const projection = parseCapabilityConsumerProjection(CAP_MAP_005);
  const model = buildPackageApplicationClosure({
    registry,
    consumerProjection: projection,
    packageGates: [{
      record: {
        package_id: 'GAP-PKG-001',
        implementation_units: [{ unit_id: 'unit-001', repository: 'vento-group-sas/vento-shell' }],
        evidence_plan: { acceptance_criteria: [] },
      },
    }],
    implementationInstances: [],
  });

  const relations = model.packages[0].relations.IMPLEMENTADO_POR;
  assert.equal(relations.length, 1);
  assert.equal(relations[0].implementation_unit_id, 'unit-001');
  assert.deepEqual(relations[0].sources, ['DELIV-PKG-025', 'PACKAGE_GATE']);
});

test('IMPLEMENTADO_POR no materializa valores centinela de E5', () => {
  const projection = parseCapabilityConsumerProjection(CAP_MAP_005);

  for (const sentinel of ['NO_MATERIALIZADO', 'NO MATERIALIZADO', 'NO_APLICA']) {
    const overrides = new Map([[
      'GAP-PKG-001',
      {
        canonical_prerequisites: { implementation_unit_id: sentinel },
      },
    ]]);
    const model = buildPackageApplicationClosure({
      registry: { packages: canonicalPackages(overrides) },
      consumerProjection: projection,
      packageGates: [],
      implementationInstances: [],
    });

    assert.equal(
      model.packages[0].relations.IMPLEMENTADO_POR.length,
      0,
      `sentinel ${sentinel} no puede convertirse en implementation_unit_id`,
    );
  }
});

test('CI020 VERIFIED no equivale a package CLOSED', () => {
  const projection = parseCapabilityConsumerProjection(CAP_MAP_005);
  const model = buildPackageApplicationClosure({
    registry: { packages: canonicalPackages() },
    consumerProjection: projection,
    implementationInstances: [{
      relative_path: 'docs/plan-canonico/modular/implementation-instances/SHELL-CI-020__GAP-PKG-001.json',
      record: {
        instance_id: 'SHELL-CI-020::GAP-PKG-001',
        task_id: 'SHELL-CI-020',
        status: 'VERIFIED',
        evidence: ['RESULT CI020 VERIFIED'],
      },
    }],
  });
  assert.equal(model.packages[0].closure.closure_state, 'OPEN');
});

test('solo CI024 VERIFIED con evidence certifica package CLOSED', () => {
  const projection = parseCapabilityConsumerProjection(CAP_MAP_005);
  const model = buildPackageApplicationClosure({
    registry: { packages: canonicalPackages() },
    consumerProjection: projection,
    implementationInstances: [{
      relative_path: 'docs/plan-canonico/modular/implementation-instances/SHELL-CI-024__GAP-PKG-001.json',
      record: {
        instance_id: 'SHELL-CI-024::GAP-PKG-001',
        task_id: 'SHELL-CI-024',
        status: 'VERIFIED',
        evidence: ['PACKAGE_CLOSURE_CERTIFIED'],
      },
    }],
  });
  assert.equal(model.packages[0].closure.closure_state, 'CLOSED');
  assert.equal(model.metrics.package_closure_counts.CLOSED, 1);
});

test('application completion permanece incompleta mientras un package relacionado siga abierto', () => {
  const projection = parseCapabilityConsumerProjection(CAP_MAP_005);
  const model = buildPackageApplicationClosure({
    registry: { packages: canonicalPackages() },
    consumerProjection: projection,
  });
  const origo = model.applications.find(({ application_id: id }) => id === 'origo');
  const nexo = model.applications.find(({ application_id: id }) => id === 'nexo');
  assert.equal(origo.completion_state, 'INCOMPLETE');
  assert.equal(nexo.completion_state, 'INCOMPLETE');
  assert.ok(nexo.consumed_package_ids.includes('GAP-PKG-001'));
});

test('falla cerrado si el universo no conserva 207 GAP-PKG', () => {
  const projection = parseCapabilityConsumerProjection(CAP_MAP_005);
  assert.throws(
    () => buildPackageApplicationClosure({
      registry: { packages: canonicalPackages().slice(0, 206) },
      consumerProjection: projection,
    }),
    /exige 207 GAP-PKG/u,
  );
});
