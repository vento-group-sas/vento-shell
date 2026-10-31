import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { readPlanSection } from './read-plan-section.mjs';

const PROCESS_PATH =
  'docs/plan-canonico/modular/bloques/E2_PROCESOS_Y_EXPERIENCIA/01_CATALOGO_DE_PROCESOS.md';
const APPLICATION_PATH =
  'docs/plan-canonico/modular/bloques/C_CATALOGO/01_APLICACIONES_Y_CONVENCION.md';

function read(root, relativePath) {
  return readPlanSection(root, relativePath);
}

function taskSection(source, taskId, nextTaskId) {
  const start = source.search(new RegExp(`^### ✅ ${taskId}\\b`, 'm'));
  const end = source.search(new RegExp(`^### ✅ ${nextTaskId}\\b`, 'm'));
  if (start < 0 || end <= start) throw new Error(`no se pudo aislar ${taskId}.`);
  return source.slice(start, end);
}

function splitRow(line) {
  if (!line.startsWith('|') || !line.endsWith('|')) return null;
  return line.slice(1, -1).split('|').map((cell) => cell.trim());
}

function clean(cell) {
  return cell.replaceAll('`', '').replaceAll('*', '').trim();
}

function applicationCodes(source) {
  const start = source.indexOf('#### 11. Catálogo canónico aprobado');
  const end = source.indexOf('#### 12.', start);
  if (start < 0 || end <= start) throw new Error('no se pudo aislar el catálogo de aplicaciones.');
  const codes = new Set();
  for (const line of source.slice(start, end).split('\n')) {
    const cells = splitRow(line);
    if (!cells || cells.length < 5) continue;
    const code = clean(cells[0]);
    if (/^[a-z][a-z0-9-]*$/.test(code) && code !== 'código') codes.add(code);
  }
  return codes;
}

function processId(cell) {
  const value = clean(cell);
  return /^VPROC-\d{4}$/.test(value) ? value : null;
}

function appList(cell) {
  if (clean(cell) === '—') return [];
  return [...cell.matchAll(/`([a-z][a-z0-9-]*)`/g)].map((match) => match[1]);
}

function assertSet(label, values, allowed) {
  const invalid = values.filter((value) => !allowed.has(value));
  if (invalid.length) throw new Error(`${label} contiene códigos no canónicos: ${[...new Set(invalid)].join(', ')}.`);
  if (new Set(values).size !== values.length) throw new Error(`${label} contiene aplicaciones duplicadas.`);
}

export function validateProcessApplicationIntegrity({ root = process.cwd() } = {}) {
  const processSource = read(root, PROCESS_PATH);
  const apps = applicationCodes(read(root, APPLICATION_PATH));
  const ownerTask = taskSection(processSource, 'PROC-CAT-005', 'PROC-CAT-006');
  const consumerTask = taskSection(processSource, 'PROC-CAT-006', 'PROC-CAT-007');
  const owners = new Map();

  for (const line of ownerTask.split('\n')) {
    const cells = splitRow(line);
    if (!cells || cells.length !== 7) continue;
    const id = processId(cells[0]);
    if (!id) continue;
    const owner = clean(cells[3]);
    if (!apps.has(owner)) throw new Error(`${id} usa la propietaria no canónica ${owner}.`);
    if (owners.has(id)) throw new Error(`${id} aparece más de una vez en el registro de propiedad.`);
    owners.set(id, owner);
  }
  if (owners.size !== 69) throw new Error(`el registro de propiedad contiene ${owners.size} procesos; se esperaban 69.`);

  const consumers = new Map();
  let directCount = 0;
  let conditionalCount = 0;
  for (const line of consumerTask.split('\n')) {
    const cells = splitRow(line);
    if (!cells || cells.length !== 6) continue;
    const id = processId(cells[0]);
    if (!id) continue;
    const owner = clean(cells[1]);
    const direct = appList(cells[2]);
    const conditional = appList(cells[3]);
    if (owner !== owners.get(id)) {
      throw new Error(`${id} declara propietaria ${owner} en consumidores y ${owners.get(id)} en propiedad.`);
    }
    assertSet(`${id} consumidoras directas`, direct, apps);
    assertSet(`${id} consumidoras condicionales`, conditional, apps);
    if (direct.includes(owner) || conditional.includes(owner)) {
      throw new Error(`${id} incluye a su propietaria ${owner} como consumidora.`);
    }
    const overlap = direct.filter((app) => conditional.includes(app));
    if (overlap.length) throw new Error(`${id} repite consumidoras directas y condicionales: ${overlap.join(', ')}.`);
    if (consumers.has(id)) throw new Error(`${id} aparece más de una vez en el registro de consumidoras.`);
    consumers.set(id, { owner, direct, conditional });
    directCount += direct.length;
    conditionalCount += conditional.length;
  }
  if (consumers.size !== owners.size) {
    const missing = [...owners.keys()].filter((id) => !consumers.has(id));
    throw new Error(`faltan contratos de consumo para: ${missing.join(', ')}.`);
  }

  const declaredDirect = Number(
    consumerTask.match(/\*\*Relaciones directas de consumo:\*\*\s+\*\*(\d+)\*\*/)?.[1]
  );
  const declaredConditional = Number(
    consumerTask.match(/\*\*Relaciones condicionales de consumo:\*\*\s+\*\*(\d+)\*\*/)?.[1]
  );
  if (directCount !== declaredDirect) {
    throw new Error(`existen ${directCount} consumos directos y se declaran ${declaredDirect}.`);
  }
  if (conditionalCount !== declaredConditional) {
    throw new Error(`existen ${conditionalCount} consumos condicionales y se declaran ${declaredConditional}.`);
  }
  if (ownerTask.includes('| `talento` |') || consumerTask.includes('`talento`')) {
    throw new Error('TALENTO persiste como aplicación propietaria o consumidora sin app_code canónico.');
  }

  return {
    processes: owners.size,
    applications: apps.size,
    directRelationships: directCount,
    conditionalRelationships: conditionalCount,
  };
}

const isCli = process.argv[1] && path.resolve(process.argv[1]) === fileURLToPath(import.meta.url);
if (isCli) {
  try {
    const stats = validateProcessApplicationIntegrity();
    console.log(
      `OK: integridad proceso-aplicación; ${stats.processes} procesos; ${stats.applications} aplicaciones canónicas; `
      + `${stats.directRelationships} consumos directos; ${stats.conditionalRelationships} condicionales.`
    );
  } catch (error) {
    console.error(
      `ERROR: Integridad proceso-aplicación inválida:\n- ${error instanceof Error ? error.message : String(error)}`
    );
    process.exit(1);
  }
}
