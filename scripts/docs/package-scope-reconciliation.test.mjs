import assert from 'node:assert/strict';
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import test from 'node:test';
import { RECONCILIATION_PATH, validatePackageScopeReconciliation } from './package-scope-reconciliation.mjs';

const sourceRoot = path.resolve(import.meta.dirname, '../..');
const blocks = 'docs/plan-canonico/modular/bloques';
const treqPath = `${blocks}/E1_DESCUBRIMIENTO_OPERATIVO/04A_05_SUPABASE.md`;
const e5Path = `${blocks}/E5_PLANIFICACION_DE_IMPLEMENTACION/02_PAQUETES_DE_IMPLEMENTACION.md`;
const gatePath = 'docs/plan-canonico/modular/package-gate-instances/GAP-PKG-003.json';

function fixture(t) {
  const tempBase = fs.realpathSync(os.tmpdir());
  const root = fs.mkdtempSync(path.join(tempBase, 'vento-scope-test-'));
  for (const name of [RECONCILIATION_PATH, treqPath, e5Path, gatePath,
    'docs/plan-canonico/modular/package-gate-instances/GAP-PKG-018.json',
    'docs/plan-canonico/modular/package-gate-instances/GAP-PKG-019.json',
    `${blocks}/E1_DESCUBRIMIENTO_OPERATIVO/07_REGISTRO_CANONICO_DE_BRECHAS.md`,
    `${blocks}/E5_PLANIFICACION_DE_IMPLEMENTACION/06_PUERTA_DE_SALIDA_DE_E5.md`,
    `${blocks}/E5_PLANIFICACION_DE_IMPLEMENTACION/04_CUTOVER_Y_PILOTO.md`]) {
    const target = path.join(root, name);
    fs.mkdirSync(path.dirname(target), { recursive: true });
    fs.copyFileSync(path.join(sourceRoot, name), target);
  }
  t.after(() => {
    assert.ok(path.resolve(root).startsWith(`${tempBase}${path.sep}vento-scope-test-`));
    fs.rmSync(root, { recursive: true, force: true });
  });
  return root;
}

function change(root, name, transform) {
  const file = path.join(root, name);
  fs.writeFileSync(file, transform(fs.readFileSync(file, 'utf8')));
}

test('reconciliación conserva 25 requisitos y todas sus proyecciones', (t) => {
  assert.deepEqual(validatePackageScopeReconciliation({ root: fixture(t) }), { packages: 1, transfers: 25 });
});

test('rechaza pérdida de un requisito aunque el dossier tenga campos completos', (t) => {
  const root = fixture(t);
  change(root, treqPath, (text) => text.split('\n').filter((line) => !line.startsWith('| `TREQ-SUPABASE-164`')).join('\n'));
  assert.throws(() => validatePackageScopeReconciliation({ root }), /TREQ desaparecido: TREQ-SUPABASE-164/u);
});

test('rechaza destino correcto en 04A con prueba 016 faltante', (t) => {
  const root = fixture(t);
  change(root, e5Path, (text) => text.split('\n').map((line) => line.startsWith('| `GAP-PKG-082`')
    ? line.replace('`TREQ-SUPABASE-164`', '`TREQ-SUPABASE-999`') : line).join('\n'));
  assert.throws(() => validatePackageScopeReconciliation({ root }), /falta cobertura GAP-PKG-082\/DELIV-PKG-016/u);
});

test('rechaza retorno a perfil SQL ajeno aunque la estructura JSON siga válida', (t) => {
  const root = fixture(t);
  change(root, gatePath, (text) => text.replace('CONTROL_NO_DIRECT_RUNTIME', 'DATABASE_RPC_BOUNDARY'));
  assert.throws(() => validatePackageScopeReconciliation({ root }), /snapshot del gate obsoleto/u);
});

test('rechaza revivir exposición histórica de secretos como oracle aprobado', (t) => {
  const root = fixture(t);
  change(root, treqPath, (text) => text.replace('nunca como resultado esperado satisfactorio', 'como resultado esperado satisfactorio'));
  assert.throws(() => validatePackageScopeReconciliation({ root }), /TREQ-SUPABASE-211: regla protegida alterada/u);
});

test('rechaza omitir un traslado del ledger aunque las filas todavía existan', (t) => {
  const root = fixture(t);
  change(root, RECONCILIATION_PATH, (text) => {
    const value = JSON.parse(text);
    value.packages[0].treq_transfers.pop();
    return JSON.stringify(value);
  });
  assert.throws(() => validatePackageScopeReconciliation({ root }), /inventario de traslados incompleto/u);
});

test('impide reiniciar descubrimiento para otro paquete en la etapa de implementación', (t) => {
  const root = fixture(t);
  change(root, e5Path, (text) => text.split('\n').map((line) => line.startsWith('| `GAP-PKG-004`')
    ? line.replace('`PACKAGE_GATE_MATURATION`', '`DELIV-PKG-014 (reapertura trazable)`') : line).join('\n'));
  assert.throws(() => validatePackageScopeReconciliation({ root }), /identidad nueva debe resolverse en package-gate/u);
});

test('rechaza un resumen de piloto antiguo aunque las filas del paquete estén corregidas', (t) => {
  const root = fixture(t);
  change(root, `${blocks}/E5_PLANIFICACION_DE_IMPLEMENTACION/06_PUERTA_DE_SALIDA_DE_E5.md`, (text) => text.replace(/(`PILOT-DIRECT-001` \/ `ACC-DIRECT-001`\s*\|\s*\*\*)159/u, '$1160'));
  assert.throws(() => validatePackageScopeReconciliation({ root }), /resumen PILOT-DIRECT-001 obsoleto/u);
});

test('impide reutilizar una aprobación anterior para un alcance ampliado', (t) => {
  const root = fixture(t);
  change(root, 'docs/plan-canonico/modular/package-gate-instances/GAP-PKG-018.json', (text) => {
    const value = JSON.parse(text);
    value.authorization = value.authorization_history.findLast((entry) => entry.superseded_by === 'IMPLEMENTATION_SCOPE_RECONCILIATION');
    return JSON.stringify(value);
  });
  assert.throws(() => validatePackageScopeReconciliation({ root }), /aprobación antigua reutilizada/u);
});
