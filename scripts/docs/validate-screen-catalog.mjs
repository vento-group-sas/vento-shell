import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { readPlanSection } from './read-plan-section.mjs';

const SCREEN_RELATIVE_PATH =
  'docs/plan-canonico/modular/bloques/E2_PROCESOS_Y_EXPERIENCIA/05_CONTRATO_DE_PANTALLAS.md';
const PROCESS_RELATIVE_PATH =
  'docs/plan-canonico/modular/bloques/E2_PROCESOS_Y_EXPERIENCIA/01_CATALOGO_DE_PROCESOS.md';
const APPLICATION_RELATIVE_PATH =
  'docs/plan-canonico/modular/bloques/C_CATALOGO/01_APLICACIONES_Y_CONVENCION.md';

function read(root, relativePath) {
  return readPlanSection(root, relativePath);
}

function section(source, startPattern, endPattern) {
  const start = source.search(startPattern);
  if (start < 0) throw new Error(`no se encontró la sección ${startPattern}.`);
  const tail = source.slice(start);
  const endMatch = tail.slice(1).match(endPattern);
  return endMatch ? tail.slice(0, endMatch.index + 1) : tail;
}

function splitRow(line) {
  if (!line.startsWith('|') || !line.endsWith('|')) return null;
  return line.slice(1, -1).split('|').map((cell) => cell.trim());
}

function cleanCode(cell) {
  return cell.replaceAll('`', '').replaceAll('*', '').trim();
}

function extractApplicationCodes(applicationSource) {
  const catalog = section(
    applicationSource,
    /^#### 11\. Catálogo canónico aprobado$/m,
    /^#### 12\./m
  );
  const codes = new Set();
  for (const line of catalog.split('\n')) {
    const cells = splitRow(line);
    if (!cells || cells.length < 5) continue;
    const code = cleanCode(cells[0]);
    if (/^[a-z][a-z0-9-]*$/.test(code) && code !== 'código') codes.add(code);
  }
  if (codes.size === 0) throw new Error('el catálogo de aplicaciones no contiene códigos resolubles.');
  return codes;
}

function extractScreens(screenTask) {
  const screens = [];
  for (const line of screenTask.split('\n')) {
    const cells = splitRow(line);
    if (!cells || cells.length !== 6) continue;
    const id = cleanCode(cells[0]);
    const idMatch = id.match(/^VSCREEN-(\d{4,})$/);
    if (!idMatch) continue;
    screens.push({
      id,
      number: Number(idMatch[1]),
      name: cleanCode(cells[1]),
      app: cleanCode(cells[2]),
    });
  }
  return screens;
}

function extractSummaryCounts(screenTask) {
  const summary = section(
    screenTask,
    /^#### 11\. Resumen de asignación$/m,
    /^#### 12\./m
  );
  const counts = new Map();
  let declaredTotal = null;
  for (const line of summary.split('\n')) {
    const cells = splitRow(line);
    if (!cells || cells.length !== 5) continue;
    const code = cleanCode(cells[0]);
    const quantity = Number(cleanCode(cells[3]));
    if (code === 'Total') declaredTotal = quantity;
    else if (/^[a-z][a-z0-9-]*$/.test(code) && Number.isInteger(quantity)) {
      counts.set(code, quantity);
    }
  }
  if (declaredTotal === null) throw new Error('el resumen de pantallas no declara un total resoluble.');
  return { counts, declaredTotal };
}

function expandProcessReferences(coverageSource) {
  const ids = new Set();
  const rangePattern = /`VPROC-(\d{4})`\s+a\s+`(\d{4})`/g;
  for (const match of coverageSource.matchAll(rangePattern)) {
    const from = Number(match[1]);
    const to = Number(match[2]);
    for (let value = from; value <= to; value += 1) {
      ids.add(`VPROC-${String(value).padStart(4, '0')}`);
    }
  }
  const singlePattern = /`(VPROC-\d{4})`/g;
  for (const match of coverageSource.matchAll(singlePattern)) ids.add(match[1]);
  return ids;
}

function extractCanonicalProcessIds(processSource) {
  const assignedRange = processSource.match(
    /\*\*Rango asignado:\*\*\s+`VPROC-(\d{4})`\s+a\s+`VPROC-(\d{4})`/
  );
  if (!assignedRange) throw new Error('el catálogo de procesos no declara un rango asignado resoluble.');
  const ids = new Set();
  for (let value = Number(assignedRange[1]); value <= Number(assignedRange[2]); value += 1) {
    ids.add(`VPROC-${String(value).padStart(4, '0')}`);
  }
  return ids;
}

function validateExceptions(screenTask) {
  const exceptionSection = section(
    screenTask,
    /^##### 13\.1 Excepciones deliberadas de admisión$/m,
    /^Una nueva capacidad o proceso/m
  );
  const allowedStatuses = new Set([
    'DEFERRED_APP_SCOPE',
    'FUTURE_PRODUCT_NOT_APP_CODE',
    'EXTERNAL_CHANNEL',
    'OUTSIDE_VENTO_OS',
  ]);
  let rows = 0;
  for (const line of exceptionSection.split('\n')) {
    const cells = splitRow(line);
    if (!cells || cells.length !== 4) continue;
    const status = cleanCode(cells[1]);
    if (!allowedStatuses.has(status)) continue;
    rows += 1;
    if (cleanCode(cells[0]).length < 3) throw new Error('existe una excepción sin cobertura identificable.');
    if (cleanCode(cells[2]).length < 20) throw new Error(`la excepción ${cleanCode(cells[0])} no explica su motivo.`);
    if (cleanCode(cells[3]).length < 8) throw new Error(`la excepción ${cleanCode(cells[0])} no define puerta propietaria.`);
  }
  if (rows < 5) throw new Error(`solo existen ${rows} excepciones deliberadas; se esperaban al menos 5.`);
}

export function validateScreenCatalog({ root = process.cwd() } = {}) {
  const screenSource = read(root, SCREEN_RELATIVE_PATH);
  const processSource = read(root, PROCESS_RELATIVE_PATH);
  const applicationSource = read(root, APPLICATION_RELATIVE_PATH);
  const screenTask = section(
    screenSource,
    /^### ✅ PROC-SCREEN-002\b/m,
    /^### (?:✅|🟡|\[~\]|\[ \]) PROC-SCREEN-003\b/m
  );
  const applicationCodes = extractApplicationCodes(applicationSource);
  const screens = extractScreens(screenTask);
  const { counts: summaryCounts, declaredTotal } = extractSummaryCounts(screenTask);

  if (applicationCodes.size !== 10 || !applicationCodes.has('aura')) {
    throw new Error(
      `BLOQUE C debe resolver 10 aplicaciones canónicas incluida aura; resolvió ${applicationCodes.size}.`
    );
  }
  if (screens.length !== declaredTotal) {
    throw new Error(`el catálogo contiene ${screens.length} pantallas y el resumen declara ${declaredTotal}.`);
  }

  const uniqueIds = new Set(screens.map((screen) => screen.id));
  if (uniqueIds.size !== screens.length) throw new Error('el catálogo contiene screen_id duplicados.');
  for (let index = 0; index < screens.length; index += 1) {
    const expected = index + 1;
    if (screens[index].number !== expected) {
      throw new Error(
        `la secuencia de pantallas se rompe en ${screens[index].id}; se esperaba VSCREEN-${String(expected).padStart(4, '0')}.`
      );
    }
    if (!applicationCodes.has(screens[index].app)) {
      throw new Error(`${screens[index].id} usa la aplicación no canónica ${screens[index].app}.`);
    }
    if (screens[index].app === 'aura') {
      throw new Error(`${screens[index].id} asigna una pantalla a AURA mientras continúa diferida.`);
    }
  }

  const actualCounts = new Map();
  for (const screen of screens) actualCounts.set(screen.app, (actualCounts.get(screen.app) ?? 0) + 1);
  actualCounts.set('aura', actualCounts.get('aura') ?? 0);
  for (const [app, summaryCount] of summaryCounts) {
    const actual = actualCounts.get(app) ?? 0;
    if (actual !== summaryCount) {
      throw new Error(`la distribución de ${app} declara ${summaryCount} y contiene ${actual}.`);
    }
  }
  for (const app of actualCounts.keys()) {
    if (!summaryCounts.has(app)) throw new Error(`la aplicación ${app} no aparece en el resumen de distribución.`);
  }

  const requiredBindings = new Map([
    ['VSCREEN-0120', 'viso'],
    ['VSCREEN-0141', 'nexo'],
    ['VSCREEN-0160', 'pass'],
    ['VSCREEN-0164', 'pass'],
    ['VSCREEN-0166', 'pass'],
    ['VSCREEN-0168', 'pass'],
    ['VSCREEN-0170', 'pass'],
    ['VSCREEN-0171', 'pass'],
    ['VSCREEN-0176', 'nexo'],
    ['VSCREEN-0177', 'nexo'],
  ]);
  const screenById = new Map(screens.map((screen) => [screen.id, screen]));
  for (const line of screenSource.split('\n')) {
    const cells = splitRow(line);
    if (!cells || cells.length < 2) continue;
    const id = cleanCode(cells[0]);
    const canonical = screenById.get(id);
    if (!canonical) continue;
    const observedName = cleanCode(cells[1]);
    if (observedName !== canonical.name) {
      throw new Error(
        `${id} usa el nombre "${observedName}" fuera del catálogo; debe conservar "${canonical.name}".`
      );
    }
  }
  for (const [screenId, app] of requiredBindings) {
    if (screenById.get(screenId)?.app !== app) {
      throw new Error(`${screenId} debe existir y permanecer vinculado con ${app}.`);
    }
  }

  if (screens.some((screen) => screen.app === 'talento')) {
    throw new Error('TALENTO no puede utilizarse como aplicación primaria sin app_code canónico.');
  }
  const coverage = section(
    screenTask,
    /^#### 13\. SCREEN-COVERAGE-ADMISSION-REGISTER-001$/m,
    /^##### 13\.1/m
  );
  const coveredProcesses = expandProcessReferences(coverage);
  const canonicalProcesses = extractCanonicalProcessIds(processSource);
  const missingProcesses = [...canonicalProcesses].filter((id) => !coveredProcesses.has(id)).sort();
  const unknownProcesses = [...coveredProcesses].filter((id) => !canonicalProcesses.has(id)).sort();
  if (missingProcesses.length) {
    throw new Error(`procesos sin disposición de cobertura: ${missingProcesses.join(', ')}.`);
  }
  if (unknownProcesses.length) {
    throw new Error(`cobertura referencia procesos inexistentes: ${unknownProcesses.join(', ')}.`);
  }
  validateExceptions(screenTask);

  const declaredRange = screenTask.match(
    /existen exactamente (?<total>\d+) registros[\s\S]*?`VSCREEN-0001` a `VSCREEN-(?<last>\d{4,})`/
  );
  if (!declaredRange) throw new Error('las validaciones no declaran total y rango de pantalla.');
  if (Number(declaredRange.groups.total) !== screens.length) {
    throw new Error('el total declarado en validaciones no coincide con el catálogo.');
  }
  if (Number(declaredRange.groups.last) !== screens.at(-1).number) {
    throw new Error('el rango declarado en validaciones no coincide con el último screen_id.');
  }

  return {
    screens: screens.length,
    applications: applicationCodes.size,
    activeApplications: actualCounts.size - 1,
    processes: canonicalProcesses.size,
    exceptions: 5,
    lastScreenId: screens.at(-1).id,
  };
}

const isCli = process.argv[1] && path.resolve(process.argv[1]) === fileURLToPath(import.meta.url);
if (isCli) {
  try {
    const stats = validateScreenCatalog();
    console.log(
      `OK: catálogo de pantallas; ${stats.screens} pantallas; ${stats.activeApplications} aplicaciones habilitadas; `
      + `${stats.processes} procesos cubiertos; última ${stats.lastScreenId}.`
    );
  } catch (error) {
    console.error(`ERROR: Catálogo de pantallas inválido:\n- ${error instanceof Error ? error.message : String(error)}`);
    process.exit(1);
  }
}
