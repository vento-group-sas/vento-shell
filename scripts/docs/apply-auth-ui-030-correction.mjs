import fs from 'node:fs';
import path from 'node:path';

const root = process.cwd();
const taskPath = path.join(root, 'docs/plan-canonico/modular/bloques/I_NAVEGACION_Y_PANTALLAS/05_AUTORIZACION_DE_VISTAS_Y_ACCIONES.md');
const registryPath = path.join(root, 'docs/plan-canonico/modular/bloques/E1_DESCUBRIMIENTO_OPERATIVO/04A_REGISTRO_CANONICO_DE_REQUISITOS_DE_PRUEBA.md');
const packagePath = path.join(root, 'package.json');
const validatorPath = path.join(root, 'scripts/docs/validate-auth-ui-030-read-assignments.mjs');

function requireReplace(source, search, replacement, label) {
  if (!source.includes(search)) throw new Error(`No se encontro marcador para ${label}.`);
  return source.replace(search, replacement);
}

let task = fs.readFileSync(taskPath, 'utf8');
const startMarker = '### ✅ AUTH-UI-030 — Asignar permiso de lectura a cada vista';
const endMarker = '### [ ] AUTH-UI-031 — Asignar permisos a acciones de cada vista';
const start = task.indexOf(startMarker);
const end = task.indexOf(endMarker, start);
if (start < 0 || end < 0) throw new Error('No se pudo aislar AUTH-UI-030.');
let section = task.slice(start, end);
section = requireReplace(section, '**Estado:** APROBADA', '**Estado:** PROPUESTA PARA APROBACIÓN', 'estado AUTH-UI-030');
section = requireReplace(
  section,
  '| `source_task`                  | `AUTH-UI-030`.                                                    |',
  '| `source_task`                  | `AUTH-UI-029`; AUTH-UI-030 materializa la asignación.             |',
  'source_task'
);
section = requireReplace(
  section,
  '| `next_owner`                   | Tarea o bloque canónico que completa la siguiente decisión.       |',
  '| `next_owner`                   | Propietario de resolución. `AUTH-UI-030` significa cierre en esta tarea; otro identificador conserva una decisión pendiente. |',
  'semántica next_owner'
);
const addendum = `#### 8.1. Subsanación contractual y evidencia reproducible

La matriz de 264 filas conserva seis campos por fila y cuatro metadatos globales obligatorios. Esta separación evita repetir constantes sin perder trazabilidad:

| Metadato global | Valor canónico |
| --- | --- |
| \`catalog_id\` | \`vento.authorization\` |
| \`catalog_version\` | \`1.0.0\` |
| \`assignment_version\` | \`VIEW-READ-PERMISSION-ASSIGNMENT-REGISTER-001@1.0.0\` |
| \`source_task\` | \`AUTH-UI-029\` |

Reglas adicionales de cierre:

1. \`AUTH-UI-030\` en \`next_owner\` es un sentinel de resolución local para filas \`ASSIGNED\`; no representa una tarea futura ni una autorreferencia pendiente.
2. Una fila \`BLOCKED\` debe conservar \`NO_ACTIVE_CANONICAL_READ_PERMISSION\`, una causa \`MISSING_*\` y al menos un propietario distinto de \`AUTH-UI-030\`.
3. Una fila \`NOT_APPLICABLE\` debe conservar una base de autorización cerrada y su propietario posterior, sin crear un permiso de vista.
4. \`ANY_OF(...)\` expresa dominios de lectura independientes: habilita únicamente las secciones respaldadas por cada miembro concedido; no concede la vista completa por transitividad.
5. La asignación de lectura no sustituye autorización de servidor, contexto, alcance, turno, check-in, sitio, área, dispositivo, sensibilidad ni permisos de mutación, que permanecen en sus tareas propietarias.

##### Descomposición de permisos compuestos

| View ID | Sección o dominio visible | Permiso miembro requerido | Regla de agregación |
| --- | --- | --- | --- |
| \`VISO-ROUTE-037\` | Concesiones base | \`viso.authorization.base_grants.view\` | Mostrar y contabilizar solo registros del dominio concedido. |
| \`VISO-ROUTE-037\` | Concesiones operativas | \`viso.authorization.operational_grants.view\` | Mostrar y contabilizar solo registros del dominio concedido. |
| \`VISO-ROUTE-037\` | Denegaciones | \`viso.authorization.denials.view\` | Mostrar y contabilizar solo registros del dominio concedido. |

La navegación puede abrir \`VISO-ROUTE-037\` cuando exista al menos un miembro concedido. Las secciones no concedidas permanecen ausentes y los totales agregados se calculan únicamente sobre dominios autorizados.

##### Puerta de prioridad NEXO — remisiones

| View ID | Requisito de lectura | Estado exigido |
| --- | --- | --- |
| \`NEXO-ROUTE-031\` | \`nexo.inventory.remissions.view\` | \`ASSIGNED\` |
| \`NEXO-ROUTE-032\` | \`nexo.inventory.remissions.view\` | \`ASSIGNED\` |
| \`NEXO-ROUTE-033\` | \`nexo.inventory.remissions.view\` | \`ASSIGNED\` |
| \`NEXO-ROUTE-034\` | \`nexo.logistics.driver_operations.view\` | \`ASSIGNED\` |
| \`NEXO-ROUTE-035\` | \`nexo.logistics.fulfillment.view\` | \`ASSIGNED\` |
| \`NEXO-ROUTE-036\` | \`nexo.inventory.remissions.view\` | \`ASSIGNED\` |
| \`NEXO-ROUTE-037\` | \`nexo.inventory.remissions.view\` | \`ASSIGNED\` |
| \`NEXO-ROUTE-038\` | \`nexo.inventory.remissions.view\` | \`ASSIGNED\` |

La puerta de \`PRIORITY-NEXO-REMISSIONS-001-STAGE-008\` falla si falta una de estas ocho identidades, cambia su requisito o aparece \`BLOCKED\`/\`NOT_APPLICABLE\`.

---

`;
if (!section.includes('#### 8.1. Subsanación contractual y evidencia reproducible')) {
  section = requireReplace(section, '#### 9. Requisitos de prueba', addendum + '#### 9. Requisitos de prueba', 'inserción de subsanación');
}
const treqSection = `#### 9. Requisitos de prueba

| ID | Comportamiento protegido |
| --- | --- |
| \`TREQ-UX-2001\` | AUTH-UI-030 materializa exactamente 264 identidades AS-IS únicas, sin altas, bajas, duplicados ni renombrados frente a AUTH-UI-029. |
| \`TREQ-UX-2002\` | El registro declara de forma verificable \`catalog_id=vento.authorization\`, \`catalog_version=1.0.0\`, \`assignment_version=VIEW-READ-PERMISSION-ASSIGNMENT-REGISTER-001@1.0.0\` y \`source_task=AUTH-UI-029\`. |
| \`TREQ-UX-2003\` | La distribución permanece en 163 vistas elegibles y 101 sin permiso independiente; las elegibles se resuelven en 125 \`ASSIGNED\` y 38 \`BLOCKED\`. |
| \`TREQ-UX-2004\` | Toda fila \`ASSIGNED\` usa una clave de lectura canónica exacta o una expresión \`ANY_OF(...)\` cerrada, sin claves inventadas ni aproximaciones por ruta. |
| \`TREQ-UX-2005\` | Ninguna asignación de lectura reutiliza permisos de creación, actualización, aprobación, publicación, redención, retiro, eliminación, recuperación u otra mutación. |
| \`TREQ-UX-2006\` | Toda expresión \`ANY_OF(...)\` contiene miembros únicos y válidos; cada sección, conteo y dato agregado se filtra por el miembro efectivamente concedido. |
| \`TREQ-UX-2007\` | Toda fila \`BLOCKED\` aplica denegación por defecto, conserva \`NO_ACTIVE_CANONICAL_READ_PERMISSION\`, documenta una causa \`MISSING_*\` y asigna un propietario de resolución externo a AUTH-UI-030. |
| \`TREQ-UX-2008\` | Toda fila \`NOT_APPLICABLE\` conserva una base cerrada de autorización heredada, sin crear permiso staff para autenticación, runtime, alias, redirect, superficie embebida, cliente o público. |
| \`TREQ-UX-2009\` | Las ocho superficies de la puerta NEXO remisiones conservan los requisitos exactos declarados y estado \`ASSIGNED\`; ninguna brecha de catálogo bloquea el paquete prioritario. |
| \`TREQ-UX-2010\` | El validador de AUTH-UI-030 falla ante deriva de filas, conteos, estados, sentinels, propietarios, expresiones compuestas, metadatos, requisitos NEXO o ausencia de TREQ-UX-2001..2010 en el registro 04A. |

La implementación runtime y la evidencia E2E permanecen pendientes en las tareas de autorización, servidor y CI que consumen este contrato.
`;
section = section.replace(/#### 9\. Requisitos de prueba[\s\S]*?\n---\n/, treqSection + '\n---\n');
task = task.slice(0, start) + section + task.slice(end);
fs.writeFileSync(taskPath, task, 'utf8');

const validator = `import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const here = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(here, '..', '..');
const taskPath = path.join(root, 'docs/plan-canonico/modular/bloques/I_NAVEGACION_Y_PANTALLAS/05_AUTORIZACION_DE_VISTAS_Y_ACCIONES.md');
const registryPath = path.join(root, 'docs/plan-canonico/modular/bloques/E1_DESCUBRIMIENTO_OPERATIVO/04A_REGISTRO_CANONICO_DE_REQUISITOS_DE_PRUEBA.md');

function fail(message) { throw new Error(message); }
function cells(line) {
  if (!line.trim().startsWith('|') || !line.trim().endsWith('|')) return null;
  return line.trim().slice(1, -1).split('|').map((value) => value.trim().replaceAll('\\`', ''));
}
const source = fs.readFileSync(taskPath, 'utf8');
const start = source.indexOf('### ✅ AUTH-UI-030 — Asignar permiso de lectura a cada vista');
const end = source.indexOf('### [ ] AUTH-UI-031 — Asignar permisos a acciones de cada vista', start);
if (start < 0 || end < 0) fail('No se pudo aislar AUTH-UI-030.');
const section = source.slice(start, end);
const rows = section.split(/\\r?\\n/).map(cells).filter((row) => row?.length === 6 && /^(?:[A-Z0-9]+)-(?:ROUTE|SCREEN|SURFACE|PASS-SURFACE|CURRENT-[A-Z-]+)-\\d+$/.test(row[0]));
if (rows.length !== 264) fail(\`AUTH-UI-030 debe contener 264 filas; contiene \${rows.length}.\`);
const ids = new Set(rows.map((row) => row[0]));
if (ids.size !== 264) fail('AUTH-UI-030 contiene view_id duplicados.');
const statuses = Object.groupBy(rows, (row) => row[4]);
if ((statuses.ASSIGNED?.length ?? 0) !== 125) fail('Se esperaban 125 filas ASSIGNED.');
if ((statuses.BLOCKED?.length ?? 0) !== 38) fail('Se esperaban 38 filas BLOCKED.');
if ((statuses.NOT_APPLICABLE?.length ?? 0) !== 101) fail('Se esperaban 101 filas NOT_APPLICABLE.');
const eligible = rows.filter((row) => row[1] === 'FUNCTIONAL_VIEW_PERMISSION_ELIGIBLE');
if (eligible.length !== 163) fail('Se esperaban 163 vistas elegibles.');
for (const row of statuses.BLOCKED ?? []) {
  if (row[2] !== 'NO_ACTIVE_CANONICAL_READ_PERMISSION') fail(\`\${row[0]} BLOCKED no usa el sentinel canónico.\`);
  if (!row[3].startsWith('MISSING_')) fail(\`\${row[0]} BLOCKED no documenta causa MISSING_*.\`);
  if (!row[5] || row[5] === 'AUTH-UI-030') fail(\`\${row[0]} BLOCKED no tiene propietario externo.\`);
}
const mutation = /\\.(?:create|update|approve|publish|redeem|withdraw|delete|recover|manage)$/;
for (const row of statuses.ASSIGNED ?? []) {
  const expression = row[2];
  const members = expression.startsWith('ANY_OF(') ? expression.slice(7, -1).split(',').map((value) => value.trim()) : [expression];
  if (members.some((member) => mutation.test(member))) fail(\`\${row[0]} reutiliza una mutación como lectura.\`);
  if (new Set(members).size !== members.length) fail(\`\${row[0]} contiene miembros ANY_OF duplicados.\`);
  if (row[5] !== 'AUTH-UI-030') fail(\`\${row[0]} ASSIGNED no usa el sentinel de resolución local.\`);
}
for (const token of ['catalog_id', 'vento.authorization', 'catalog_version', '1.0.0', 'VIEW-READ-PERMISSION-ASSIGNMENT-REGISTER-001@1.0.0', 'source_task', 'AUTH-UI-029']) {
  if (!section.includes(token)) fail(\`Falta metadato contractual: \${token}.\`);
}
const expectedNexo = new Map([
  ['NEXO-ROUTE-031', 'nexo.inventory.remissions.view'],
  ['NEXO-ROUTE-032', 'nexo.inventory.remissions.view'],
  ['NEXO-ROUTE-033', 'nexo.inventory.remissions.view'],
  ['NEXO-ROUTE-034', 'nexo.logistics.driver_operations.view'],
  ['NEXO-ROUTE-035', 'nexo.logistics.fulfillment.view'],
  ['NEXO-ROUTE-036', 'nexo.inventory.remissions.view'],
  ['NEXO-ROUTE-037', 'nexo.inventory.remissions.view'],
  ['NEXO-ROUTE-038', 'nexo.inventory.remissions.view'],
]);
for (const [id, permission] of expectedNexo) {
  const row = rows.find((candidate) => candidate[0] === id);
  if (!row || row[2] !== permission || row[4] !== 'ASSIGNED') fail(\`Puerta NEXO invalida para \${id}.\`);
}
const composite = rows.find((row) => row[0] === 'VISO-ROUTE-037');
if (!composite || composite[2] !== 'ANY_OF(viso.authorization.base_grants.view, viso.authorization.operational_grants.view, viso.authorization.denials.view)') fail('VISO-ROUTE-037 no conserva el ANY_OF canónico.');
const registry = fs.readFileSync(registryPath, 'utf8');
for (let number = 2001; number <= 2010; number += 1) {
  const id = \`TREQ-UX-\${number}\`;
  if (!section.includes(id) || !registry.includes(\`| \\\`\${id}\\\` |\`)) fail(\`Falta \${id} en tarea o 04A.\`);
}
console.log('OK: AUTH-UI-030 conserva 264 filas, distribución 125/38/101, contrato, ANY_OF y puerta NEXO.');
`;
fs.writeFileSync(validatorPath, validator, 'utf8');

let registry = fs.readFileSync(registryPath, 'utf8');
if (!registry.includes('TREQ-UX-2001')) {
  const rows = [
    ['2001','AUTH-UI-030 materializa exactamente 264 identidades AS-IS únicas, sin altas, bajas, duplicados ni renombrados frente a AUTH-UI-029.','Deriva entre inventario y asignación / crítica','TREQ-UX-1971; TREQ-UX-1973'],
    ['2002','El registro declara catalog_id, catalog_version, assignment_version y source_task como metadatos verificables del contrato de asignación.','Asignación sin versión o procedencia / alta','TREQ-UX-1994; TREQ-UX-2001'],
    ['2003','La distribución permanece en 163 vistas elegibles y 101 sin permiso independiente; las elegibles se resuelven en 125 ASSIGNED y 38 BLOCKED.','Conteos o estados inconsistentes / crítica','TREQ-UX-1974; TREQ-UX-2001'],
    ['2004','Toda fila ASSIGNED usa una clave de lectura canónica exacta o una expresión ANY_OF cerrada, sin claves inventadas ni aproximaciones por ruta.','Concesión con autoridad inexistente o aproximada / crítica','TREQ-AUTH-002; TREQ-UX-1993'],
    ['2005','Ninguna asignación de lectura reutiliza permisos de mutación.','Escalada de privilegios por mezcla lectura-acción / crítica','TREQ-UX-1997; TREQ-UX-2004'],
    ['2006','Toda expresión ANY_OF contiene miembros únicos y válidos; cada sección, conteo y agregado se filtra por el miembro concedido.','Exposición transversal por permiso compuesto / crítica','TREQ-UX-1995; TREQ-UX-2004'],
    ['2007','Toda fila BLOCKED aplica denegación por defecto, conserva el sentinel canónico, documenta causa MISSING_* y asigna propietario externo.','Acceso por fallback ante brecha de catálogo / crítica','TREQ-AUTH-001; TREQ-UX-2003'],
    ['2008','Toda fila NOT_APPLICABLE conserva una base cerrada de autorización heredada sin crear un permiso staff improcedente.','Permisos artificiales para superficies técnicas o públicas / alta','TREQ-UX-1996; TREQ-UX-2003'],
    ['2009','Las ocho superficies de la puerta NEXO remisiones conservan requisitos exactos y estado ASSIGNED, sin brechas que bloqueen el paquete prioritario.','Bloqueo o exposición inconsistente del flujo de remisiones / crítica','TREQ-UX-2003; TREQ-UX-2004'],
    ['2010','El validador de AUTH-UI-030 falla ante deriva de filas, conteos, estados, sentinels, propietarios, ANY_OF, metadatos, puerta NEXO o registro 04A.','Cierre documental no reproducible / crítica','TREQ-UX-2000; TREQ-UX-2001; TREQ-UX-2009'],
  ].map(([number, behavior, risk, relation]) => `| \`TREQ-UX-${number}\` | \`UX\` | ${behavior} | \`AUTH-UI-030\` / \`VIEW-READ-PERMISSION-ASSIGNMENT-REGISTER-001\` | ${risk} | contractual + seguridad + estática + regresión / automatizada | \`AUTH-UI-030\`; \`AUTH-UI-043\`; \`AUTH-UI-044\`; \`SHELL-CI-017\` | Asignación canónica de lectura por superficie | \`vento-shell\` / CI documental y staging | \`IDENTIFICADO\` | Pendiente | Pendiente | Definición documental corregida; implementación runtime y evidencia E2E permanecen pendientes. | ${relation} |`).join('\n');
  registry = requireReplace(registry, '\n### Reglas obligatorias', `\n${rows}\n\n### Reglas obligatorias`, 'filas TREQ-UX-2001..2010');
  const tableRows = registry.split(/\r?\n/).filter((line) => /^\| `TREQ-[A-Z]+-\d+` \|/.test(line));
  const total = tableRows.length;
  registry = registry.replace(/\| Requisitos vigentes\s+\|\s+\*\*\d+\*\* \|/, `| Requisitos vigentes               |         **${total}** |`);
  registry = registry.replace(/\| Filas con catorce columnas\s+\| \*\*\d+ de \d+\*\* \|/, `| Filas con catorce columnas        | **${total} de ${total}** |`);
  registry = registry.replace(/\| `UX`\s+\| `TREQ-UX-001` a `TREQ-UX-\d+`\s+\|\s+\d+ \|/, '| `UX`          | `TREQ-UX-001` a `TREQ-UX-2010`                  |     2010 |');
  fs.writeFileSync(registryPath, registry, 'utf8');
}

const pkg = JSON.parse(fs.readFileSync(packagePath, 'utf8'));
if (!pkg.scripts['docs:auth-ui-030:check']) pkg.scripts['docs:auth-ui-030:check'] = 'node scripts/docs/validate-auth-ui-030-read-assignments.mjs';
if (!pkg.scripts['docs:plan:test'].includes('validate-auth-ui-030-read-assignments.mjs')) pkg.scripts['docs:plan:test'] += ' scripts/docs/validate-auth-ui-030-read-assignments.mjs';
fs.writeFileSync(packagePath, JSON.stringify(pkg, null, 2) + '\n', 'utf8');

fs.rmSync(path.join(root, 'scripts/docs/apply-auth-ui-030-correction.mjs'));
fs.rmSync(path.join(root, '.github/workflows/apply-auth-ui-030-correction.yml'));
console.log('AUTH-UI-030 corregida; 04A y validador actualizados.');
