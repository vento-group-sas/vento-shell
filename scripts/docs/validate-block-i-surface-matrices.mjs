import crypto from 'node:crypto';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { validateActionServerCoverage } from './validate-action-server-coverage.mjs';

const INVENTORY_PATH =
  'docs/plan-canonico/modular/bloques/I_NAVEGACION_Y_PANTALLAS/01_INVENTARIO_COMPLETO_DE_SUPERFICIES.md';
const BINDINGS_PATH =
  'docs/plan-canonico/modular/bloques/I_NAVEGACION_Y_PANTALLAS/02_VINCULACION_CON_PROCESOS_Y_APLICACIONES.md';
const CLASSIFICATION_PATH =
  'docs/plan-canonico/modular/bloques/I_NAVEGACION_Y_PANTALLAS/03_CLASIFICACION_FUNCIONAL_Y_CONTEXTO_DE_USO.md';
const ELIGIBILITY_PATH =
  'docs/plan-canonico/modular/bloques/I_NAVEGACION_Y_PANTALLAS/04_DEPURACION_DE_VISTAS_Y_RUTAS_TECNICAS.md';
const AUTHORIZATION_PATH =
  'docs/plan-canonico/modular/bloques/I_NAVEGACION_Y_PANTALLAS/05_AUTORIZACION_DE_VISTAS_Y_ACCIONES.md';
const CATALOG_PATH =
  'docs/plan-canonico/modular/bloques/D_MATRICES/08_REVISION_CONTRACTUAL_PREVIA_DATASETS.md';

const EXPECTED_ROWS = 264;
const EXPECTED_RENDERED_VIEWS = 252;
const EXPECTED_ALIASES = 7;
const EXPECTED_REDIRECTS = 5;
const PASS_STACK_NAMES = [
  'Home',
  'Club',
  'MyOrders',
  'ChooseSatellite',
  'DeliveryAddresses',
  'AccountSettings',
  'VentoCafe',
  'Saudo',
  'SatelliteExperience',
  'SatellitePass',
  'OrderHome',
  'OrderMenu',
  'OrderCheckout',
  'OrderPlaced',
  'OrderChat',
];
const PASS_SURFACE_IDS = Array.from(
  { length: 21 },
  (_, index) => `PASS-CUSTOMER-SURFACE-${String(index + 1).padStart(3, '0')}`,
);
const REDIRECT_IDS = new Set([
  'NEXO-ROUTE-055',
  'NEXO-ROUTE-057',
  'NEXO-ROUTE-058',
  'NEXO-ROUTE-064',
  'AURA-CURRENT-PUBLIC-007',
]);
const EXPECTED_READ_ASSIGNMENTS = {
  ASSIGNED: 125,
  BLOCKED: 38,
  NOT_APPLICABLE: 101,
};
const NON_ELIGIBLE_SENTINELS = new Set([
  'AUTHENTICATION_SESSION_OR_DENIAL_POLICY',
  'SYSTEM_INTEGRITY_AND_RECOVERY_POLICY',
  'INHERIT_DESTINATION_PERMISSIONS',
  'INHERIT_HOST_READ_AND_BIND_ACTION_PERMISSIONS',
  'PUBLIC_CLIENT_SESSION_OWNERSHIP_OR_SCOPED_TOKEN',
  'PUBLICATION_STATE_OR_PUBLIC_POLICY',
  'ENDPOINT_TOKEN_RATE_LIMIT_OR_STATIC_POLICY',
  'NO_CAPABILITY_NO_ACCESS_GRANT',
  'INHERIT_SOURCE_PERMISSION_WITHOUT_NEW_IDENTITY',
  'INHERIT_DESTINATION_PERMISSION',
]);

function normalize(value) {
  return value.replace(/\r\n?/g, '\n');
}

function clean(value) {
  return value.replaceAll('`', '').replaceAll('*', '').trim();
}

function splitRow(line) {
  if (!line.startsWith('|') || !line.endsWith('|')) return null;
  return line.slice(1, -1).split('|').map(clean);
}

function task(source, id, nextId) {
  const start = source.search(new RegExp(`^###\\s+✅\\s+${id}\\b`, 'm'));
  if (start < 0) throw new Error(`no se encontró ${id}.`);
  const tail = source.slice(start + 1);
  const end = nextId
    ? tail.search(new RegExp(`^###\\s+(?:✅|🟡|❌|\\[[ x~]\\])\\s+${nextId}\\b`, 'm'))
    : -1;
  return source.slice(start, end < 0 ? source.length : start + 1 + end);
}

function matrix(section, columns, label) {
  const rows = section
    .split('\n')
    .map(splitRow)
    .filter((cells) =>
      cells?.length === columns
      && /^(?:NEXO|FOGO|ORIGO|PULSO|VISO|NUMERA|ANIMA|SHELL|PASS|AURA)-/.test(cells[0]));
  const result = new Map();
  for (const cells of rows) {
    if (result.has(cells[0])) throw new Error(`${cells[0]} está duplicada en ${label}.`);
    result.set(cells[0], cells);
  }
  return result;
}

function assertCoverage(reference, observed, label) {
  if (observed.size !== reference.size) {
    throw new Error(`${label} contiene ${observed.size} filas para ${reference.size} identidades de referencia.`);
  }
  for (const id of reference.keys()) {
    if (!observed.has(id)) throw new Error(`${label} no contiene ${id}.`);
  }
}

function count(matrixValue, index, expected) {
  return [...matrixValue.values()].filter((cells) => cells[index] === expected).length;
}

function sha(ids) {
  return crypto.createHash('sha256').update([...ids].sort().join('\n')).digest('hex');
}

function assertFragment(section, fragment, label) {
  if (!section.includes(fragment)) throw new Error(`${label} no declara ${fragment}.`);
}

function activePermissionCatalog(source) {
  const permissions = [...source.matchAll(/^active_permission=([^\s]+)$/gm)]
    .map((match) => match[1]);
  const unique = new Set(permissions);
  if (permissions.length !== 140 || unique.size !== 140) {
    throw new Error(
      `vento.authorization@1.0.0 publica ${permissions.length} entradas y ${unique.size} claves únicas; se requieren 140.`,
    );
  }
  return unique;
}

function permissionKeys(requirement) {
  if (!requirement.startsWith('ANY_OF(')) return [requirement];
  if (!requirement.endsWith(')')) throw new Error(`expresión de lectura inválida ${requirement}.`);
  return requirement.slice('ANY_OF('.length, -1).split(',').map((value) => value.trim());
}

function validateReadAssignments({ eligibility, authorization, catalog }) {
  assertCoverage(eligibility, authorization, 'AUTH-UI-030');
  const counts = { ASSIGNED: 0, BLOCKED: 0, NOT_APPLICABLE: 0 };

  for (const [id, eligibilityRow] of eligibility) {
    const assignment = authorization.get(id);
    const eligibilityClass = eligibilityRow[3];
    const independentPermission = eligibilityRow[4];
    const [assignmentClass, requirement, resolution, status, nextOwner] = assignment.slice(1);
    if (assignmentClass !== eligibilityClass) {
      throw new Error(`${id} cambia la clase de elegibilidad entre AUTH-UI-029 y AUTH-UI-030.`);
    }
    if (!(status in counts)) throw new Error(`${id} usa estado de asignación inválido ${status}.`);
    counts[status] += 1;

    if (independentPermission === 'YES') {
      if (eligibilityClass !== 'FUNCTIONAL_VIEW_PERMISSION_ELIGIBLE') {
        throw new Error(`${id} pide permiso independiente sin ser una vista funcional elegible.`);
      }
      if (status === 'ASSIGNED') {
        if (!['EXACT_ACTIVE_PERMISSION', 'COMPOSITE_ACTIVE_PERMISSION'].includes(resolution)) {
          throw new Error(`${id} asigna lectura con resolución inválida ${resolution}.`);
        }
        const keys = permissionKeys(requirement);
        if (keys.length === 0 || keys.some((key) => !catalog.has(key))) {
          throw new Error(`${id} referencia una clave fuera de vento.authorization@1.0.0: ${requirement}.`);
        }
        if (nextOwner !== 'AUTH-UI-031') {
          throw new Error(`${id} debe entregar la siguiente decisión a AUTH-UI-031, no a ${nextOwner}.`);
        }
      } else if (status === 'BLOCKED') {
        if (requirement !== 'NO_ACTIVE_CANONICAL_READ_PERMISSION') {
          throw new Error(`${id} está bloqueada sin el sentinel de brecha de catálogo.`);
        }
        if (!/^MISSING_[A-Z0-9_]*READ_CAPABILITY[A-Z0-9_]*$/.test(resolution)) {
          throw new Error(`${id} no identifica una resolución cerrada para su brecha de catálogo.`);
        }
        if (!nextOwner || nextOwner === 'AUTH-UI-030') {
          throw new Error(`${id} no entrega su brecha a un propietario documental posterior.`);
        }
      } else {
        throw new Error(`${id} es elegible para lectura independiente pero usa ${status}.`);
      }
    } else if (independentPermission === 'NO') {
      if (status !== 'NOT_APPLICABLE'
        || resolution !== 'NO_INDEPENDENT_PERMISSION'
        || !NON_ELIGIBLE_SENTINELS.has(requirement)) {
        throw new Error(`${id} no conserva una decisión cerrada sin permiso independiente.`);
      }
    } else {
      throw new Error(`${id} usa independent_view_permission inválido ${independentPermission}.`);
    }
  }

  for (const [status, expected] of Object.entries(EXPECTED_READ_ASSIGNMENTS)) {
    if (counts[status] !== expected) {
      throw new Error(`AUTH-UI-030 contiene ${counts[status]} filas ${status}; se requieren ${expected}.`);
    }
  }
  return counts;
}

function validateOptionalPassRepository(root, inventory) {
  const passApp = path.resolve(root, '..', 'vento-pass', 'App.js');
  if (!fs.existsSync(passApp)) return { checked: false, stackScreens: PASS_STACK_NAMES.length };
  const source = fs.readFileSync(passApp, 'utf8');
  const actual = [...source.matchAll(/<Stack\.Screen\s+name="([^"]+)"/g)].map((match) => match[1]);
  if (new Set(actual).size !== actual.length) throw new Error('vento-pass/App.js contiene Stack.Screen duplicados.');
  if (actual.length !== PASS_STACK_NAMES.length
    || actual.some((name, index) => name !== PASS_STACK_NAMES[index])) {
    throw new Error(
      `vento-pass/App.js declara [${actual.join(', ')}], pero el inventario congelado espera `
      + `[${PASS_STACK_NAMES.join(', ')}]. Ejecuta la reconciliación documental antes de compilar.`,
    );
  }
  for (const name of actual) {
    if (!inventory.includes(`\`${name} —`) && !inventory.includes(`\`${name} `)) {
      throw new Error(`AUTH-UI-009 no identifica la pantalla PASS ${name}.`);
    }
  }
  return { checked: true, stackScreens: actual.length };
}

export function validateBlockISurfaceMatrices({ root = process.cwd() } = {}) {
  const inventory = normalize(fs.readFileSync(path.join(root, INVENTORY_PATH), 'utf8'));
  const bindings = normalize(fs.readFileSync(path.join(root, BINDINGS_PATH), 'utf8'));
  const classification = normalize(fs.readFileSync(path.join(root, CLASSIFICATION_PATH), 'utf8'));
  const eligibilitySource = normalize(fs.readFileSync(path.join(root, ELIGIBILITY_PATH), 'utf8'));
  const authorizationSource = normalize(fs.readFileSync(path.join(root, AUTHORIZATION_PATH), 'utf8'));
  const serverCoverage = validateActionServerCoverage(authorizationSource);
  const catalogSource = normalize(fs.readFileSync(path.join(root, CATALOG_PATH), 'utf8'));
  const sections = {
    inventory: task(inventory, 'AUTH-UI-009', 'AUTH-UI-010'),
    process: task(bindings, 'AUTH-UI-011', 'AUTH-UI-012'),
    step: task(bindings, 'AUTH-UI-012', 'AUTH-UI-013'),
    application: task(bindings, 'AUTH-UI-013', 'AUTH-UI-014'),
    consumption: task(bindings, 'AUTH-UI-014'),
    operational: task(classification, 'AUTH-UI-015', 'AUTH-UI-016'),
    eligibility: task(eligibilitySource, 'AUTH-UI-029'),
    readAuthorization: task(authorizationSource, 'AUTH-UI-030', 'AUTH-UI-031'),
  };
  const matrices = {
    process: matrix(sections.process, 7, 'AUTH-UI-011'),
    step: matrix(sections.step, 9, 'AUTH-UI-012'),
    application: matrix(sections.application, 10, 'AUTH-UI-013'),
    consumption: matrix(sections.consumption, 12, 'AUTH-UI-014'),
    operational: matrix(sections.operational, 13, 'AUTH-UI-015'),
    eligibility: matrix(sections.eligibility, 8, 'AUTH-UI-029'),
    readAuthorization: matrix(sections.readAuthorization, 6, 'AUTH-UI-030'),
  };

  if (matrices.process.size !== EXPECTED_ROWS) {
    throw new Error(`AUTH-UI-011 contiene ${matrices.process.size} filas; se requieren ${EXPECTED_ROWS}.`);
  }
  for (const [label, observed] of Object.entries(matrices)) {
    assertCoverage(matrices.process, observed, label);
  }
  for (const id of matrices.process.keys()) {
    const processId = matrices.process.get(id)[2];
    if (matrices.step.get(id)[2] !== processId
      || matrices.application.get(id)[2] !== processId
      || matrices.consumption.get(id)[2] !== processId
      || matrices.operational.get(id)[2] !== processId) {
      throw new Error(`${id} cambia primary_process_id entre AUTH-UI-011 y AUTH-UI-015.`);
    }
    const step = matrices.step.get(id)[3];
    if (matrices.application.get(id)[3] !== step
      || matrices.consumption.get(id)[3] !== step
      || matrices.operational.get(id)[3] !== step) {
      throw new Error(`${id} cambia primary_process_step_ref entre AUTH-UI-012 y AUTH-UI-015.`);
    }
    const primaryApp = matrices.application.get(id)[5];
    const ownerApp = matrices.application.get(id)[6];
    if (matrices.consumption.get(id)[4] !== primaryApp
      || matrices.operational.get(id)[5] !== primaryApp
      || matrices.consumption.get(id)[5] !== ownerApp
      || matrices.operational.get(id)[6] !== ownerApp) {
      throw new Error(`${id} cambia aplicación primaria o propietaria entre AUTH-UI-013 y AUTH-UI-015.`);
    }
    const consumerOnly = matrices.consumption.get(id)[6];
    if (!['true', 'false'].includes(consumerOnly)) {
      throw new Error(`${id} usa consumer_only inválido ${consumerOnly}.`);
    }
    if (matrices.operational.get(id)[7] !== consumerOnly) {
      throw new Error(`${id} cambia consumer_only al entrar en AUTH-UI-015.`);
    }
  }

  for (const id of PASS_SURFACE_IDS) {
    if (!sections.inventory.includes(`\`${id}\``)) throw new Error(`AUTH-UI-009 no contiene ${id}.`);
    if (!matrices.process.has(id)) throw new Error(`las matrices no contienen ${id}.`);
  }
  const optionalRepository = validateOptionalPassRepository(root, sections.inventory);
  assertCoverage(matrices.process, matrices.eligibility, 'AUTH-UI-029');
  const readAssignments = validateReadAssignments({
    eligibility: matrices.eligibility,
    authorization: matrices.readAuthorization,
    catalog: activePermissionCatalog(catalogSource),
  });

  const aliases = [...matrices.operational.values()].filter((cells) => cells[9] === 'ALIAS_INHERITED');
  const redirects = [...matrices.operational.values()].filter((cells) => cells[9] === 'REDIRECT_INHERITED');
  if (aliases.length !== EXPECTED_ALIASES) {
    throw new Error(`AUTH-UI-015 contiene ${aliases.length} aliases; se requieren ${EXPECTED_ALIASES}.`);
  }
  if (redirects.length !== EXPECTED_REDIRECTS) {
    throw new Error(`AUTH-UI-015 contiene ${redirects.length} redirects; se requieren ${EXPECTED_REDIRECTS}.`);
  }
  for (const id of REDIRECT_IDS) {
    const processRow = matrices.process.get(id);
    const operationalRow = matrices.operational.get(id);
    if (processRow[4] !== 'REDIRECT_ALIAS') throw new Error(`${id} no conserva binding_mode REDIRECT_ALIAS.`);
    if (operationalRow[8] !== 'false'
      || operationalRow[9] !== 'REDIRECT_INHERITED'
      || operationalRow[10] !== 'INHERITED') {
      throw new Error(`${id} se trata como vista operativa o renderizada independiente.`);
    }
  }

  const uniqueRendered = matrices.process.size - aliases.length - redirects.length;
  if (uniqueRendered !== EXPECTED_RENDERED_VIEWS) {
    throw new Error(`se derivan ${uniqueRendered} vistas renderizadas; se requieren ${EXPECTED_RENDERED_VIEWS}.`);
  }
  const operationalCounts = {
    direct: count(matrices.operational, 9, 'DIRECT_OPERATION'),
    hybrid: count(matrices.operational, 9, 'HYBRID_OPERATION'),
    nonOperational: count(matrices.operational, 9, 'NOT_OPERATIONAL'),
    alias: aliases.length,
    redirect: redirects.length,
    operational: count(matrices.operational, 8, 'true'),
  };
  const expectedOperational = {
    direct: 28,
    hybrid: 31,
    nonOperational: 193,
    alias: 7,
    redirect: 5,
    operational: 59,
  };
  for (const [key, expected] of Object.entries(expectedOperational)) {
    if (operationalCounts[key] !== expected) {
      throw new Error(`AUTH-UI-015 deriva ${operationalCounts[key]} para ${key}; se requieren ${expected}.`);
    }
  }

  const fingerprints = {
    direct: sha([...matrices.operational.values()]
      .filter((cells) => cells[9] === 'DIRECT_OPERATION').map((cells) => cells[0])),
    hybrid: sha([...matrices.operational.values()]
      .filter((cells) => cells[9] === 'HYBRID_OPERATION').map((cells) => cells[0])),
    nonOperational: sha([...matrices.operational.values()]
      .filter((cells) => cells[9] === 'NOT_OPERATIONAL').map((cells) => cells[0])),
    alias: sha([...matrices.operational.values()]
      .filter((cells) => cells[9] === 'ALIAS_INHERITED').map((cells) => cells[0])),
    redirect: sha([...matrices.operational.values()]
      .filter((cells) => cells[9] === 'REDIRECT_INHERITED').map((cells) => cells[0])),
  };
  const fingerprintLabels = {
    direct: 'DIRECT_OPERATION_SHA256',
    hybrid: 'HYBRID_OPERATION_SHA256',
    nonOperational: 'NOT_OPERATIONAL_SHA256',
    alias: 'ALIAS_INHERITED_SHA256',
    redirect: 'REDIRECT_INHERITED_SHA256',
  };
  const missingFingerprints = Object.entries(fingerprints)
    .map(([key, hash]) => `${fingerprintLabels[key]} = ${hash}`)
    .filter((fragment) => !sections.operational.includes(fragment));
  if (missingFingerprints.length) {
    throw new Error(`AUTH-UI-015 no declara las huellas vigentes: ${missingFingerprints.join('; ')}.`);
  }
  for (const section of [sections.process, sections.step, sections.application, sections.consumption]) {
    assertFragment(section, '**264**', 'matriz BLOQUE I');
    assertFragment(section, '**252**', 'matriz BLOQUE I');
    assertFragment(section, '**12**', 'matriz BLOQUE I');
  }
  assertFragment(sections.operational, '**264**', 'AUTH-UI-015');
  assertFragment(sections.operational, '**252**', 'AUTH-UI-015');
  assertFragment(sections.operational, '**12**', 'AUTH-UI-015');
  assertFragment(
    sections.consumption,
    '| Tarea canónica propietaria | `AUTH-UI-030`',
    'AUTH-UI-014-COR-001',
  );
  assertFragment(
    sections.consumption,
    '| Estado de la acción  | `BLOCKING_PRECONDITION`',
    'AUTH-UI-014-COR-001',
  );

  return {
    rows: matrices.process.size,
    serverCoverage,
    renderedViews: uniqueRendered,
    aliases: aliases.length,
    redirects: redirects.length,
    passSurfaces: PASS_SURFACE_IDS.length,
    passRepositoryChecked: optionalRepository.checked,
    operational: operationalCounts.operational,
    readAssignments,
    fingerprints,
  };
}

const isCli = process.argv[1] && path.resolve(process.argv[1]) === fileURLToPath(import.meta.url);
if (isCli) {
  try {
    const stats = validateBlockISurfaceMatrices();
    console.log(
      `OK: BLOQUE I; ${stats.rows} filas; ${stats.renderedViews} vistas renderizadas; `
      + `${stats.aliases} aliases; ${stats.redirects} redirects; ${stats.passSurfaces} superficies PASS; `
      + `${stats.operational} operativas${stats.passRepositoryChecked ? '; vento-pass verificado' : ''}.`
      + ` AUTH-UI-030: ${stats.readAssignments.ASSIGNED} asignadas, `
      + `${stats.readAssignments.BLOCKED} bloqueadas y ${stats.readAssignments.NOT_APPLICABLE} no aplicables.`,
    );
  } catch (error) {
    console.error(`ERROR: matrices BLOQUE I inválidas:\n- ${error instanceof Error ? error.message : String(error)}`);
    process.exit(1);
  }
}
