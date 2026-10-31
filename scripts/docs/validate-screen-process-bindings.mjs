import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { readPlanSection } from './read-plan-section.mjs';

const SCREEN_PATH =
  'docs/plan-canonico/modular/bloques/E2_PROCESOS_Y_EXPERIENCIA/05_CONTRATO_DE_PANTALLAS.md';
const PROCESS_PATH =
  'docs/plan-canonico/modular/bloques/E2_PROCESOS_Y_EXPERIENCIA/01_CATALOGO_DE_PROCESOS.md';

function read(root, relativePath) {
  return readPlanSection(root, relativePath);
}

function section(source, startPattern, endPattern) {
  const start = source.search(startPattern);
  if (start < 0) throw new Error(`no se encontró la sección ${startPattern}.`);
  const tail = source.slice(start);
  const end = tail.slice(1).search(endPattern);
  return end < 0 ? tail : tail.slice(0, end + 1);
}

function splitRow(line) {
  if (!line.startsWith('|') || !line.endsWith('|')) return null;
  return line.slice(1, -1).split('|').map((cell) => cell.trim());
}

function clean(cell) {
  return cell.replaceAll('`', '').replaceAll('*', '').trim();
}

function processIds(cell) {
  if (clean(cell) === '—') return [];
  return [...cell.matchAll(/`(VPROC-\d{4})`/g)].map((match) => match[1]);
}

function extractScreens(source) {
  const task = section(
    source,
    /^### ✅ PROC-SCREEN-002\b/m,
    /^### (?:✅|🟡|\[~\]|\[ \]) PROC-SCREEN-003\b/m
  );
  const screens = new Map();
  for (const line of task.split('\n')) {
    const cells = splitRow(line);
    if (!cells || cells.length !== 6) continue;
    const id = clean(cells[0]);
    if (!/^VSCREEN-\d{4}$/.test(id)) continue;
    screens.set(id, { name: clean(cells[1]), app: clean(cells[2]) });
  }
  return screens;
}

function extractProcessOwners(source) {
  const task = section(source, /^### ✅ PROC-CAT-005\b/m, /^### ✅ PROC-CAT-006\b/m);
  const owners = new Map();
  for (const line of task.split('\n')) {
    const cells = splitRow(line);
    if (!cells || cells.length !== 7) continue;
    const id = clean(cells[0]);
    if (!/^VPROC-\d{4}$/.test(id)) continue;
    owners.set(id, clean(cells[3]));
  }
  return owners;
}

function extractBindings(source) {
  const task = section(
    source,
    /^### (?:🟡|\[~\]|✅) PROC-SCREEN-003\b/m,
    /^### (?:✅|🟡|\[~\]|\[ \]) PROC-SCREEN-004\b/m
  );
  const bindings = [];
  for (const line of task.split('\n')) {
    const cells = splitRow(line);
    if (!cells || cells.length !== 7) continue;
    const id = clean(cells[0]);
    if (!/^VSCREEN-\d{4}$/.test(id)) continue;
    const primary = clean(cells[3]);
    bindings.push({
      id,
      name: clean(cells[1]),
      app: clean(cells[2]),
      primary,
      related: processIds(cells[4]),
      mode: clean(cells[5]),
      reason: clean(cells[6]),
    });
  }
  return { task, bindings };
}

export function validateScreenProcessBindings({ root = process.cwd() } = {}) {
  const screenSource = read(root, SCREEN_PATH);
  const processSource = read(root, PROCESS_PATH);
  const screens = extractScreens(screenSource);
  const owners = extractProcessOwners(processSource);
  const { task, bindings } = extractBindings(screenSource);
  const allowedModes = new Set([
    'OWNER_WORKSPACE',
    'TRANSVERSAL_ENTRY',
    'SUPERVISION_SURFACE',
    'PERSONAL_CHANNEL',
    'CUSTOMER_CHANNEL',
  ]);
  const deferred = new Set(['VPROC-0056', 'VPROC-0057']);

  if (screens.size === 0) throw new Error('el catálogo base no contiene pantallas.');
  if (owners.size !== 69) throw new Error(`el catálogo contiene ${owners.size} procesos; se esperaban 69.`);
  if (bindings.length !== screens.size) {
    throw new Error(`existen ${bindings.length} vínculos pantalla-proceso para ${screens.size} pantallas.`);
  }

  const seen = new Set();
  const covered = new Set();
  let relatedCount = 0;
  for (const binding of bindings) {
    const screen = screens.get(binding.id);
    if (!screen) throw new Error(`${binding.id} no existe en SCREEN-CANONICAL-CATALOG-001.`);
    if (seen.has(binding.id)) throw new Error(`${binding.id} aparece más de una vez en el registro pantalla-proceso.`);
    seen.add(binding.id);
    if (binding.name !== screen.name) throw new Error(`${binding.id} no conserva su nombre canónico.`);
    if (binding.app !== screen.app) throw new Error(`${binding.id} declara ${binding.app} y el catálogo declara ${screen.app}.`);
    if (!owners.has(binding.primary)) throw new Error(`${binding.id} usa el proceso primario inexistente ${binding.primary}.`);
    if (deferred.has(binding.primary)) throw new Error(`${binding.id} vincula el proceso diferido ${binding.primary}.`);
    if (!allowedModes.has(binding.mode)) throw new Error(`${binding.id} usa la modalidad inválida ${binding.mode}.`);
    if (binding.reason.length < 20) throw new Error(`${binding.id} no explica suficientemente el vínculo.`);

    const relatedSet = new Set(binding.related);
    if (relatedSet.size !== binding.related.length) throw new Error(`${binding.id} repite procesos relacionados.`);
    if (relatedSet.has(binding.primary)) throw new Error(`${binding.id} repite el proceso primario entre relacionados.`);
    for (const processId of relatedSet) {
      if (!owners.has(processId)) throw new Error(`${binding.id} usa el proceso relacionado inexistente ${processId}.`);
      if (deferred.has(processId)) throw new Error(`${binding.id} vincula el proceso diferido ${processId}.`);
      covered.add(processId);
    }
    relatedCount += binding.related.length;
    covered.add(binding.primary);

    const owner = owners.get(binding.primary);
    if (binding.mode === 'OWNER_WORKSPACE' && owner !== binding.app) {
      throw new Error(`${binding.id} usa OWNER_WORKSPACE para ${binding.app}, pero ${binding.primary} pertenece a ${owner}.`);
    }
    if (binding.mode !== 'OWNER_WORKSPACE' && owner === binding.app) {
      throw new Error(`${binding.id} usa ${binding.mode} aunque su aplicación ya es propietaria de ${binding.primary}.`);
    }
    if (binding.mode === 'TRANSVERSAL_ENTRY' && binding.app !== 'shell') {
      throw new Error(`${binding.id} usa TRANSVERSAL_ENTRY fuera de SHELL.`);
    }
    if (binding.mode === 'PERSONAL_CHANNEL' && binding.app !== 'anima') {
      throw new Error(`${binding.id} usa PERSONAL_CHANNEL fuera de ANIMA.`);
    }
    if (binding.mode === 'CUSTOMER_CHANNEL' && binding.app !== 'pass') {
      throw new Error(`${binding.id} usa CUSTOMER_CHANNEL fuera de PASS.`);
    }
  }

  const missingScreens = [...screens.keys()].filter((id) => !seen.has(id));
  if (missingScreens.length) throw new Error(`pantallas sin vínculo: ${missingScreens.join(', ')}.`);
  const expectedCovered = [...owners.keys()].filter((id) => !deferred.has(id));
  const missingProcesses = expectedCovered.filter((id) => !covered.has(id));
  if (missingProcesses.length) throw new Error(`procesos activos sin pantalla: ${missingProcesses.join(', ')}.`);
  for (const processId of deferred) {
    if (covered.has(processId)) throw new Error(`${processId} no puede cubrirse mientras AURA siga diferida.`);
  }

  const expectedResult = [
    `**${screens.size} pantallas canónicas**`,
    `**${bindings.length} vínculos primarios**`,
    `**${relatedCount} vínculos relacionados**`,
    `**${covered.size} procesos activos**`,
  ];
  if (expectedResult.some((fragment) => !task.includes(fragment))) {
    throw new Error('el resultado cuantitativo no coincide con pantallas, vínculos y procesos activos.');
  }
  if (!task.includes('VPROC-0056') || !task.includes('VPROC-0057') || !task.includes('DEFERRED_APP_SCOPE')) {
    throw new Error('la propuesta no conserva la excepción explícita de los procesos AURA.');
  }

  return {
    screens: bindings.length,
    primaryBindings: bindings.length,
    relatedBindings: relatedCount,
    coveredProcesses: covered.size,
    deferredProcesses: deferred.size,
  };
}

const isCli = process.argv[1] && path.resolve(process.argv[1]) === fileURLToPath(import.meta.url);
if (isCli) {
  try {
    const stats = validateScreenProcessBindings();
    console.log(
      `OK: vínculos pantalla-proceso; ${stats.screens} pantallas; ${stats.primaryBindings} primarios; `
      + `${stats.relatedBindings} relacionados; ${stats.coveredProcesses} procesos activos; `
      + `${stats.deferredProcesses} diferidos.`
    );
  } catch (error) {
    console.error(
      `ERROR: Vínculos pantalla-proceso inválidos:\n- ${error instanceof Error ? error.message : String(error)}`
    );
    process.exit(1);
  }
}
