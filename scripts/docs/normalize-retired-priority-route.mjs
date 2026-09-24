import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const scriptDir = path.dirname(fileURLToPath(import.meta.url));
const repoRoot = path.resolve(scriptDir, '..', '..');
const docsRoot = path.join(repoRoot, 'docs', 'plan-canonico', 'modular');
const checkOnly = process.argv.includes('--check');
const excluded = new Set([
  path.normalize('priority-delivery-lanes.json'),
  path.normalize('priority-route-progress.json'),
  path.normalize('bloques/K_NEXO/NEXO-REMISSIONS-001_CONDITIONAL_IMPLEMENTATION_SCOPE_APROBADO.md'),
]);

function sourceFiles(root) {
  const pending = [root];
  const result = [];
  while (pending.length) {
    const current = pending.pop();
    for (const entry of fs.readdirSync(current, { withFileTypes: true })) {
      const fullPath = path.join(current, entry.name);
      const relative = path.relative(root, fullPath);
      if (entry.isDirectory()) {
        if (entry.name !== '.generated' && entry.name !== 'respaldo') pending.push(fullPath);
      } else if ((entry.name.endsWith('.md') || entry.name.endsWith('.json')) && !excluded.has(path.normalize(relative))) {
        result.push(fullPath);
      }
    }
  }
  return result;
}

function normalize(source) {
  return source
    .replaceAll(
      '`DELIV-PKG-001` a `DELIV-PKG-025::NEXO-REMISSIONS-001`',
      '`DELIV-PKG-001..025::<package_id>`',
    )
    .replaceAll(
      '`NEXO-REMISSIONS-001::CONDITIONAL_IMPLEMENTATION_SCOPE`',
      '`DELIV-PKG-001..025::<package_id>`',
    )
    .replaceAll(
      'NEXO-REMISSIONS-001::CONDITIONAL_IMPLEMENTATION_SCOPE',
      'DELIV-PKG-001..025::<package_id>',
    )
    .replace(/DELIV-PKG-(\d{3})::NEXO-REMISSIONS-001/g, 'DELIV-PKG-$1::<package_id>')
    .replaceAll(
      'paquete E5 NEXO de `NEXO-REMISSIONS-001`',
      'paquete propietario que se defina mediante `DELIV-PKG-001::<package_id>`',
    )
    .replaceAll(
      'paquete E5 de `NEXO-REMISSIONS-001`',
      'paquete propietario que se defina mediante `DELIV-PKG-001::<package_id>`',
    );
}

function normalizeFileSpecific(relativePath, source) {
  const normalized = path.normalize(relativePath);
  if (normalized === path.normalize('bloques/E1_DESCUBRIMIENTO_OPERATIVO/04A_01_AUTH.md')
    || normalized === path.normalize('bloques/P_DISPOSITIVOS_COMPARTIDOS/01_IDENTIDAD_ALCANCE_Y_LIMITES_DEL_DISPOSITIVO.md')) {
    return source.replaceAll(
      '`NEXO-REMISSIONS-001`',
      '`DELIV-PKG-001..025::<package_id>`',
    );
  }
  return source;
}

const staleFiles = [];
for (const filePath of sourceFiles(docsRoot)) {
  const before = fs.readFileSync(filePath, 'utf8');
  const relativePath = path.relative(docsRoot, filePath);
  const after = normalizeFileSpecific(relativePath, normalize(before));
  if (after !== before) {
    staleFiles.push(path.relative(repoRoot, filePath));
    if (!checkOnly) fs.writeFileSync(filePath, after, 'utf8');
  }
}

if (checkOnly && staleFiles.length) {
  throw new Error(`Persisten destinos activos del carril retirado:\n- ${staleFiles.join('\n- ')}`);
}

const lanes = JSON.parse(fs.readFileSync(path.join(docsRoot, 'priority-delivery-lanes.json'), 'utf8'));
const retiredLane = lanes.lanes?.find((lane) => lane.lane_id === 'NEXO-REMISSIONS-001');
if (retiredLane?.status !== 'SUSPENDED' || retiredLane?.active !== false || retiredLane?.historical_evidence_only !== true) {
  throw new Error('NEXO-REMISSIONS-001 debe permanecer suspendido, inactivo y reservado a evidencia histórica.');
}

const progress = JSON.parse(fs.readFileSync(path.join(docsRoot, 'priority-route-progress.json'), 'utf8'));
if (progress.route_id === 'NEXO-REMISSIONS-001'
  && (progress.active !== false || progress.superseded_by !== 'NORMAL-CANONICAL-FLOW-001')) {
  throw new Error('priority-route-progress.json intenta reactivar el carril NEXO retirado.');
}

const authUiPath = path.join(
  docsRoot,
  'bloques',
  'I_NAVEGACION_Y_PANTALLAS',
  '06_EXPERIENCIA_USABILIDAD_Y_APROBACION.md',
);
const authUi = fs.readFileSync(authUiPath, 'utf8');
const rectificationHeading = '## Rectificación integral de `AUTH-UI-052..060`';
if (!authUi.includes(rectificationHeading)) {
  throw new Error('No existe la rectificación integral AUTH-UI-052..060.');
}

const rectificationStates = new Map();
for (let number = 52; number <= 60; number += 1) {
  const id = `AUTH-UI-${String(number).padStart(3, '0')}`;
  const headingPattern = new RegExp(
    `^###\\s+(✅|\\[ \\])\\s+${id}\\s+—[^\\n]*$`,
    'gmu',
  );
  const matches = [...authUi.matchAll(headingPattern)];
  if (matches.length !== 1) {
    throw new Error(
      `${id} debe existir exactamente una vez dentro de la rectificación integral con estado APROBADA o NO INICIADA; encontrados ${matches.length}.`,
    );
  }
  rectificationStates.set(id, matches[0][1] === '✅' ? 'APROBADA' : 'NO_INICIADA');
}

const approvedCount = [...rectificationStates.values()].filter((state) => state === 'APROBADA').length;
const pendingCount = [...rectificationStates.values()].filter((state) => state === 'NO_INICIADA').length;

if (checkOnly) {
  console.log(
    `[PLAN CANÓNICO] Carril retirado y alcance AUTH-UI integral verificados; ${approvedCount} aprobada(s), ${pendingCount} pendiente(s).`,
  );
} else {
  console.log(`[PLAN CANÓNICO] Normalización de carril retirado completa: ${staleFiles.length} archivo(s) actualizado(s).`);
}
