import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

export const RECONCILIATION_PATH = 'docs/plan-canonico/modular/package-scope-reconciliation.json';
const BLOCKS = 'docs/plan-canonico/modular/bloques';
const E5 = `${BLOCKS}/E5_PLANIFICACION_DE_IMPLEMENTACION/02_PAQUETES_DE_IMPLEMENTACION.md`;
const EXIT = `${BLOCKS}/E5_PLANIFICACION_DE_IMPLEMENTACION/06_PUERTA_DE_SALIDA_DE_E5.md`;
const TREQ = `${BLOCKS}/E1_DESCUBRIMIENTO_OPERATIVO/04A_05_SUPABASE.md`;
const ROUTING = `${BLOCKS}/E1_DESCUBRIMIENTO_OPERATIVO/07_REGISTRO_CANONICO_DE_BRECHAS.md`;

function packageIds(value) {
  return [...new Set(String(value).match(/GAP-PKG-\d{3}/gu) ?? [])].sort();
}

export function expandTreqIds(value) {
  const ids = new Set();
  for (const match of String(value).matchAll(/TREQ-([A-Z]+)-(\d+)(?:\.\.(\d+))?/gu)) {
    const first = Number(match[2]);
    const last = match[3] ? Number(match[3]) : first;
    if (last < first || last - first > 10000) throw new Error('Rango TREQ inválido');
    for (let number = first; number <= last; number += 1) {
      ids.add(`TREQ-${match[1]}-${String(number).padStart(match[2].length, '0')}`);
    }
  }
  return [...ids].sort();
}

function taskBlock(source, id) {
  const lines = source.split('\n');
  const start = lines.findIndex((line) => new RegExp(`^### (?:✅|🟡|❌|\\[[^\\]]+\\]) ${id} —`, 'u').test(line));
  if (start < 0) throw new Error(`Tarea propietaria ausente: ${id}`);
  let end = start + 1;
  while (end < lines.length && !/^### (?:✅|🟡|❌|\[[^\]]+\]) [A-Z]+-/u.test(lines[end])) end += 1;
  return lines.slice(start, end).join('\n');
}

function matrixRow(source, id) {
  return source.split('\n').find((line) => {
    const key = line.split('|')[1]?.trim();
    return key === `\`${id}\`` || key === id;
  }) ?? '';
}

export function validatePackageScopeReconciliation({ root = process.cwd(), optional = false } = {}) {
  const read = (name) => fs.readFileSync(path.join(root, name), 'utf8');
  if (optional && !fs.existsSync(path.join(root, RECONCILIATION_PATH))) return { packages: 0, transfers: 0 };
  const ledger = JSON.parse(read(RECONCILIATION_PATH));
  const errors = [];
  const require = (condition, message) => { if (!condition) errors.push(message); };
  if (ledger.schema_version !== 1 || !Array.isArray(ledger.packages) || ledger.packages.length === 0) {
    throw new Error('Contrato de reconciliación inválido o vacío');
  }
  const e5 = read(E5);
  const exit = read(EXIT);
  const treq = read(TREQ);
  const routing = read(ROUTING);
  const cutover = read(`${BLOCKS}/E5_PLANIFICACION_DE_IMPLEMENTACION/04_CUTOVER_Y_PILOTO.md`);
  for (const id of ['DELIV-PKG-015', 'DELIV-PKG-025']) {
    require(!taskBlock(e5, id).split('\n').some((line) => /^\| `GAP-PKG-\d+`/u.test(line) && /reapertura trazable/iu.test(line)), `${id}: identidad nueva debe resolverse en package-gate, no reiniciar descubrimiento`);
  }
  const rowCache = new Map();
  const blockCache = new Map();
  const e5Row = (task, id) => {
    if (!blockCache.has(task)) blockCache.set(task, taskBlock(e5, task));
    const key = `${task}:${id}`;
    if (!rowCache.has(key)) rowCache.set(key, matrixRow(blockCache.get(task), id));
    return rowCache.get(key);
  };
  for (const task of ['DELIV-PKG-007', 'DELIV-PKG-008', 'DELIV-PKG-009', 'DELIV-PKG-010', 'DELIV-PKG-017', 'DELIV-PKG-018', 'DELIV-PKG-019', 'DELIV-PKG-020', 'DELIV-PKG-022', 'DELIV-PKG-023']) {
    const block = taskBlock(e5, task);
    const rows = block.split('\n').filter((line) => /^\| `GAP-PKG-\d+`/u.test(line));
    for (const match of block.matchAll(/^\| `((?:DATA|TABLE|FUNC|POLICY|MIG|EV|TP|PILOT|ACC)-[A-Z0-9-]+|DATABASE_RPC_BOUNDARY|CONTROL_NO_DIRECT_RUNTIME)`\s*\|\s*(?:\*\*)?(\d+)(?:\*\*)?\s*\|/gmu)) {
      const actual = rows.filter((row) => row.includes(`\`${match[1]}\``)).length;
      require(actual === Number(match[2]), `${task}: resumen ${match[1]} obsoleto (${match[2]} != ${actual})`);
    }
  }
  const pilotRows = taskBlock(e5, 'DELIV-PKG-022').split('\n').filter((line) => /^\| `GAP-PKG-\d+`/u.test(line));
  for (const source of [cutover, exit]) {
    for (const match of source.matchAll(/^\| `(PILOT-(?:DIRECT|CONTROL)-001)`(?: \/ `ACC-[A-Z0-9-]+`)?\s*\|\s*\*\*(\d+)\*\*/gmu)) {
      const actual = pilotRows.filter((row) => row.includes(`\`${match[1]}\``)).length;
      require(actual === Number(match[2]), `Salida/piloto: resumen ${match[1]} obsoleto (${match[2]} != ${actual})`);
    }
  }
  const seenPackages = new Set();
  for (const change of ledger.affected_package_gates ?? []) {
    const gate = JSON.parse(read(`docs/plan-canonico/modular/package-gate-instances/${change.package_id}.json`));
    require(JSON.stringify(gate.scope_reconciliation?.additional_treq_ids?.slice().sort()) === JSON.stringify(change.additional_treq_ids.slice().sort()), `${change.package_id}: alcance ampliado sin reconciliación en el gate`);
    const superseded = gate.authorization_history?.findLast((entry) => entry.superseded_by === 'IMPLEMENTATION_SCOPE_RECONCILIATION');
    require(Boolean(superseded), `${change.package_id}: falta conservar aprobación histórica del alcance previo`);
    if (gate.authorization?.decision === 'APROBADO') {
      require(Date.parse(gate.authorization.approved_at) > Date.parse(superseded?.superseded_at), `${change.package_id}: aprobación antigua reutilizada para alcance ampliado`);
    }
  }
  let transfers = 0;
  for (const item of ledger.packages ?? []) {
    require(!seenPackages.has(item.package_id), `Reconciliación duplicada: ${item.package_id}`);
    seenPackages.add(item.package_id);
    const seenTreq = new Set();
    const rootRow = routing.split('\n').find((line) => line.startsWith(`| \`${item.gap_id}\``) && line.includes(`\`${item.package_id}\``) && line.includes(item.capability_id)) ?? '';
    require(rootRow.includes(`\`${item.dominant_task_id}\``), `${item.package_id}: tarea raíz divergente`);
    require(rootRow.includes(item.capability_id), `${item.package_id}: capacidad raíz divergente`);
    for (const forbidden of item.removed_support_task_ids) require(!rootRow.includes(forbidden), `${item.package_id}: soporte ajeno ${forbidden}`);
    const ownerRow = e5Row('DELIV-PKG-003', item.package_id);
    require(ownerRow.includes(item.capability_id) && ownerRow.includes(item.dominant_task_id), `${item.package_id}: propiedad E5 divergente`);
    for (const id of ['DELIV-PKG-007', 'DELIV-PKG-012', 'DELIV-PKG-014', 'DELIV-PKG-015', 'DELIV-PKG-017']) {
      const row = e5Row(id, item.package_id);
      require(row.includes(item.runtime_profile), `${item.package_id}: runtime divergente en ${id}`);
      require(!row.includes('DATABASE_RPC_BOUNDARY'), `${item.package_id}: perfil DB heredado en ${id}`);
    }
    const dataRow = e5Row('DELIV-PKG-008', item.package_id);
    require(dataRow.includes('DATA_CONTROL_NO_DIRECT_CHANGE') && dataRow.includes('STORAGE-NONE-001'), `${item.package_id}: superficies de datos divergentes`);
    const testRow = e5Row('DELIV-PKG-016', item.package_id);
    require(testRow.includes(item.test_profile) && expandTreqIds(testRow).length === 0, `${item.package_id}: TREQ ajeno o perfil de pruebas divergente`);
    const unitRow = e5Row('DELIV-PKG-025', item.package_id);
    require(unitRow.includes('PACKAGE_GATE_MATURATION') && !unitRow.includes('reapertura'), `${item.package_id}: salida debe usar el gate vigente`);
    for (const id of ['DELIV-PKG-018', 'DELIV-PKG-019', 'DELIV-PKG-020']) {
      const row = e5Row(id, item.package_id);
      require(row.includes(item.test_profile) && row.includes('ENV-DOC-CI'), `${item.package_id}: entorno/perfil divergente en ${id}`);
    }
    const gatePath = `docs/plan-canonico/modular/package-gate-instances/${item.package_id}.json`;
    if (fs.existsSync(path.join(root, gatePath))) {
      const gate = JSON.parse(read(gatePath));
      require(gate.canonical_snapshot?.dominant_task_id === item.dominant_task_id && gate.canonical_snapshot?.runtime_profile === item.runtime_profile, `${item.package_id}: snapshot del gate obsoleto`);
      for (const forbidden of item.removed_support_task_ids) require(!gate.canonical_snapshot?.task_ids?.includes(forbidden), `${item.package_id}: snapshot conserva soporte ajeno ${forbidden}`);
    }
    for (const transfer of item.treq_transfers) {
      require(!seenTreq.has(transfer.treq_id), `${item.package_id}: traslado duplicado ${transfer.treq_id}`);
      seenTreq.add(transfer.treq_id);
      const line = matrixRow(treq, transfer.treq_id);
      require(Boolean(line), `TREQ desaparecido: ${transfer.treq_id}`);
      const actual = packageIds(line.split('|')[8] ?? '');
      require(JSON.stringify(actual) === JSON.stringify([...transfer.target_package_ids].sort()), `${transfer.treq_id}: destino divergente ${actual.join(',')}`);
      require(!actual.includes(item.package_id) && actual.length > 0, `${transfer.treq_id}: traslado sin destino o conserva raíz ajena`);
      require(Boolean(transfer.reason), `${transfer.treq_id}: traslado sin justificación`);
      if (transfer.original_rule) {
        require(line.split('|')[3]?.trim() === (transfer.effective_rule ?? transfer.original_rule), `${transfer.treq_id}: regla protegida alterada sin reconciliación`);
      }
      for (const target of actual) {
        for (const task of ['DELIV-PKG-016', 'DELIV-PKG-024']) {
          require(expandTreqIds(e5Row(task, target)).includes(transfer.treq_id), `${transfer.treq_id}: falta cobertura ${target}/${task}`);
        }
      }
      const exitRow = matrixRow(exit, transfer.treq_id);
      if (exitRow) require(JSON.stringify(packageIds(exitRow)) === JSON.stringify(actual), `${transfer.treq_id}: salida E5 obsoleta`);
      transfers += 1;
    }
    require(seenTreq.size === item.original_treq_count, `${item.package_id}: inventario de traslados incompleto`);
  }
  if (errors.length) throw new Error(`PACKAGE_SCOPE_RECONCILIATION: FAIL\n- ${errors.join('\n- ')}`);
  return { packages: seenPackages.size, transfers };
}

if (process.argv[1] && path.resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  try {
    const result = validatePackageScopeReconciliation();
    console.log(`PACKAGE_SCOPE_RECONCILIATION: PASS (${result.packages} paquete(s), ${result.transfers} traslados sin pérdida).`);
  } catch (error) { console.error(error.message); process.exitCode = 1; }
}
