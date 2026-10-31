import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { readPlanSection } from './read-plan-section.mjs';

const CONTRACT_PATH =
  'docs/plan-canonico/modular/bloques/E2_PROCESOS_Y_EXPERIENCIA/05_CONTRATO_DE_PANTALLAS.md';

function clean(value) {
  return value.replaceAll('`', '').replaceAll('*', '').trim();
}

function row(line) {
  if (!line.startsWith('|') || !line.endsWith('|')) return null;
  return line.slice(1, -1).split('|').map((cell) => clean(cell));
}

function task(source, id, nextId) {
  const start = source.search(new RegExp(`^### ✅ ${id}\\b`, 'm'));
  if (start < 0) throw new Error(`no se encontró ${id}.`);
  const tail = source.slice(start + 1);
  const end = tail.search(new RegExp(`^### .*${nextId}\\b`, 'm'));
  if (end < 0) throw new Error(`no se encontró el cierre de ${id}.`);
  return source.slice(start, start + 1 + end);
}

function records(section, columns) {
  return section
    .split('\n')
    .map(row)
    .filter((cells) => cells?.length === columns && /^VSCREEN-\d{4}$/.test(cells[0]));
}

function byId(rows, label) {
  const map = new Map();
  for (const cells of rows) {
    if (map.has(cells[0])) throw new Error(`${cells[0]} está duplicada en ${label}.`);
    map.set(cells[0], cells);
  }
  return map;
}

function load(root) {
  return readPlanSection(root, CONTRACT_PATH);
}

function base(source) {
  const catalogRows = records(task(source, 'PROC-SCREEN-002', 'PROC-SCREEN-003'), 6);
  const processRows = records(task(source, 'PROC-SCREEN-003', 'PROC-SCREEN-004'), 7);
  return {
    catalog: byId(catalogRows, 'catálogo'),
    processes: byId(processRows, 'vínculos de proceso'),
  };
}

function assertCoverage(reference, observed, label) {
  if (observed.size !== reference.size) {
    throw new Error(`${label} contiene ${observed.size} pantallas para ${reference.size} identidades canónicas.`);
  }
  for (const [id, canonical] of reference) {
    const cells = observed.get(id);
    if (!cells) throw new Error(`${label} no contiene ${id}.`);
    if (cells[1] !== canonical[1]) throw new Error(`${id} no conserva el nombre canónico en ${label}.`);
    if (cells[2] !== canonical[2]) throw new Error(`${id} no conserva la aplicación canónica en ${label}.`);
  }
}

export function validateScreenStepBindings({ root = process.cwd() } = {}) {
  const source = load(root);
  const { catalog, processes } = base(source);
  const section = task(source, 'PROC-SCREEN-004', 'PROC-SCREEN-005');
  const steps = byId(records(section, 7), 'vínculos de paso');
  assertCoverage(catalog, steps, 'vínculos de paso');
  const roles = new Set([
    'ENTRY', 'IDENTIFY', 'INITIATE', 'TRIAGE', 'CAPTURE', 'CONFIGURE', 'PLAN', 'VALIDATE',
    'REVIEW', 'SIMULATE', 'APPROVE', 'DECIDE', 'EXECUTE', 'MONITOR', 'RECONCILE',
    'CORRECT', 'CLOSE', 'AUDIT', 'ANALYZE', 'PUBLISH', 'RECEIPT', 'RECOVER', 'SELF_SERVICE',
  ]);
  const positions = new Set([
    'PRECONDITION', 'INITIAL', 'IN_PROGRESS', 'DECISION', 'TERMINAL', 'CROSS_CUTTING',
  ]);
  const anchors = new Set();
  for (const [id, cells] of steps) {
    const primaryProcess = processes.get(id)?.[3];
    if (cells[3] !== primaryProcess) throw new Error(`${id} cambia el proceso primario al vincular el paso.`);
    const stepRef = cells[4].split(/\s+—\s+/)[0];
    if (!stepRef.startsWith(`${primaryProcess}::STEP-`)) {
      throw new Error(`${id} usa un paso que no pertenece a ${primaryProcess}.`);
    }
    if (anchors.has(stepRef)) throw new Error(`el ancla ${stepRef} está asignada a más de una pantalla.`);
    anchors.add(stepRef);
    if (!roles.has(cells[5])) throw new Error(`${id} usa el rol de paso inválido ${cells[5]}.`);
    if (!positions.has(cells[6])) throw new Error(`${id} usa la posición inválida ${cells[6]}.`);
  }
  for (const fragment of [
    `**${steps.size} pantallas**`,
    `**${steps.size} vínculos primarios de paso**`,
    `**${anchors.size} anclas de paso**`,
  ]) {
    if (!section.includes(fragment)) throw new Error(`PROC-SCREEN-004 no declara el resultado físico ${fragment}.`);
  }
  return { screens: steps.size, anchors: anchors.size, roles: roles.size, positions: positions.size };
}

export function validateScreenClassifications({ root = process.cwd() } = {}) {
  const source = load(root);
  const { catalog } = base(source);
  const specs = [
    ['PROC-SCREEN-005', 'PROC-SCREEN-006', 7, 4, 5, 'OPERATIONAL'],
    ['PROC-SCREEN-006', 'PROC-SCREEN-007', 8, 5, 6, 'ADMINISTRATIVE'],
    ['PROC-SCREEN-007', 'PROC-SCREEN-008', 9, 6, 7, 'SUPERVISION'],
    ['PROC-SCREEN-008', 'PROC-SCREEN-009', 10, 7, 8, 'CONFIGURATION'],
  ];
  const patternPrefixes = {
    OPERATIONAL: 'OPERATIONAL_',
    ADMINISTRATIVE: 'ADMIN_',
    SUPERVISION: 'SUPERVISION_',
    CONFIGURATION: 'CONFIG_',
  };
  const matrices = [];
  for (const [id, nextId, columns, fitIndex, patternIndex, family] of specs) {
    const section = task(source, id, nextId);
    const matrix = byId(records(section, columns), id);
    assertCoverage(catalog, matrix, id);
    const counts = { [`PRIMARY_${family}`]: 0, [`SECONDARY_${family}`]: 0, [`OUTSIDE_${family}_CLASS`]: 0 };
    let relevant = 0;
    for (const [screenId, cells] of matrix) {
      const fit = cells[fitIndex];
      const pattern = cells[patternIndex];
      if (!(fit in counts)) throw new Error(`${screenId} usa ${fit} inválido en ${id}.`);
      counts[fit] += 1;
      if ((fit.startsWith('OUTSIDE_')) !== (pattern === 'NONE')) {
        throw new Error(`${screenId} no mantiene compatibilidad fit/pattern en ${id}.`);
      }
      if (pattern !== 'NONE' && !pattern.startsWith(patternPrefixes[family])) {
        throw new Error(`${screenId} usa el patrón ${pattern} fuera de ${family}.`);
      }
      if (pattern !== 'NONE') relevant += 1;
    }
    const resultFragments = [
      `**${matrix.size} pantallas clasificadas**`,
      `**${counts[`PRIMARY_${family}`]}** quedan como \`PRIMARY_${family}\``,
      `**${counts[`SECONDARY_${family}`]}** como \`SECONDARY_${family}\``,
      `**${counts[`OUTSIDE_${family}_CLASS`]}** como \`OUTSIDE_${family}_CLASS\``,
      `**${relevant} pantallas con relevancia`,
    ];
    if (resultFragments.some((fragment) => !section.includes(fragment))) {
      throw new Error(`${id} no reconcilia su resultado cuantitativo con la matriz física.`);
    }
    const summaryRows = section.split('\n').map(row).filter(Boolean);
    for (const app of new Set([...matrix.values()].map((cells) => cells[2]))) {
      const appRows = [...matrix.values()].filter((cells) => cells[2] === app);
      const expected = [
        appRows.filter((cells) => cells[fitIndex] === `PRIMARY_${family}`).length,
        appRows.filter((cells) => cells[fitIndex] === `SECONDARY_${family}`).length,
        appRows.filter((cells) => cells[fitIndex] === `OUTSIDE_${family}_CLASS`).length,
        appRows.length,
      ];
      const summary = summaryRows.find((cells) => cells.length === 5 && cells[0] === app);
      if (!summary || expected.some((value, index) => Number(summary[index + 1]) !== value)) {
        throw new Error(`${id} no reconcilia el resumen de ${app} con sus filas físicas.`);
      }
    }
    const patternCounts = new Map();
    for (const cells of matrix.values()) {
      const pattern = cells[patternIndex];
      if (pattern !== 'NONE') patternCounts.set(pattern, (patternCounts.get(pattern) ?? 0) + 1);
    }
    for (const [pattern, expected] of patternCounts) {
      const summary = summaryRows.find(
        (cells) => cells.length === 2 && cells[0] === pattern && Number.isFinite(Number(cells[1])),
      );
      if (!summary || Number(summary[1]) !== expected) {
        throw new Error(`${id} no reconcilia el patrón ${pattern} con sus filas físicas.`);
      }
    }
    matrices.push(matrix);
  }

  for (const id of catalog.keys()) {
    if (matrices[1].get(id)[4] !== matrices[0].get(id)[4]) {
      throw new Error(`${id} cambia operational_fit entre PROC-SCREEN-005 y PROC-SCREEN-006.`);
    }
    if (
      matrices[2].get(id)[4] !== matrices[0].get(id)[4]
      || matrices[2].get(id)[5] !== matrices[1].get(id)[5]
    ) {
      throw new Error(`${id} rompe el carryover al entrar en PROC-SCREEN-007.`);
    }
    if (
      matrices[3].get(id)[4] !== matrices[0].get(id)[4]
      || matrices[3].get(id)[5] !== matrices[1].get(id)[5]
      || matrices[3].get(id)[6] !== matrices[2].get(id)[6]
    ) {
      throw new Error(`${id} rompe el carryover al entrar en PROC-SCREEN-008.`);
    }
    const primaryCount = matrices.reduce(
      (total, matrix, index) => total + (matrix.get(id)[specs[index][3]].startsWith('PRIMARY_') ? 1 : 0),
      0,
    );
    if (primaryCount > 1) throw new Error(`${id} recibe ${primaryCount} clasificaciones primarias.`);
  }

  const expected = {
    'VSCREEN-0005': ['OUTSIDE_SUPERVISION_CLASS'],
    'VSCREEN-0006': ['OUTSIDE_SUPERVISION_CLASS'],
    'VSCREEN-0038': ['PRIMARY_OPERATIONAL', 'OUTSIDE_CONFIGURATION_CLASS'],
    'VSCREEN-0061': ['PRIMARY_OPERATIONAL', 'OUTSIDE_SUPERVISION_CLASS'],
    'VSCREEN-0080': ['PRIMARY_OPERATIONAL', 'SECONDARY_SUPERVISION'],
    'VSCREEN-0106': ['OUTSIDE_SUPERVISION_CLASS'],
    'VSCREEN-0135': ['PRIMARY_OPERATIONAL', 'OUTSIDE_CONFIGURATION_CLASS'],
    'VSCREEN-0144': ['PRIMARY_OPERATIONAL', 'OUTSIDE_ADMINISTRATIVE_CLASS', 'OUTSIDE_CONFIGURATION_CLASS'],
    'VSCREEN-0176': ['OUTSIDE_OPERATIONAL_CLASS', 'PRIMARY_CONFIGURATION'],
    'VSCREEN-0177': ['OUTSIDE_OPERATIONAL_CLASS', 'PRIMARY_CONFIGURATION'],
  };
  for (const [id, required] of Object.entries(expected)) {
    const actual = matrices.flatMap((matrix, index) => [matrix.get(id)[specs[index][3]]]);
    for (const fit of required) {
      if (!actual.includes(fit)) throw new Error(`${id} no conserva la decisión semántica ${fit}.`);
    }
  }
  return { screens: catalog.size, matrices: matrices.length };
}

const isCli = process.argv[1] && path.resolve(process.argv[1]) === fileURLToPath(import.meta.url);
if (isCli) {
  try {
    const steps = validateScreenStepBindings();
    const classifications = validateScreenClassifications();
    console.log(
      `OK: matrices de pantalla; ${steps.screens} pasos; ${steps.anchors} anclas; `
      + `${classifications.matrices} clasificaciones de ${classifications.screens} pantallas.`,
    );
  } catch (error) {
    console.error(`ERROR: Matrices de pantalla inválidas:\n- ${error instanceof Error ? error.message : String(error)}`);
    process.exit(1);
  }
}
