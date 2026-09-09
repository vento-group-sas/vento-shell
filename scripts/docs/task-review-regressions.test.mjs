import assert from 'node:assert/strict';
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import test from 'node:test';
import { selectQualityTask } from './task-quality.mjs';
import { validateActionServerCoverage } from './validate-action-server-coverage.mjs';
import { extractDeliveryTask, validateTask } from './validate-task-delivery.mjs';

const contract=JSON.parse(fs.readFileSync('docs/plan-canonico/modular/delivery-contract.json'));
function fixture(t) {
  const root=fs.mkdtempSync(path.join(os.tmpdir(),'vento-task-review-'));
  t.after(()=>fs.rmSync(root,{recursive:true,force:true}));
  return root;
}
function artifact(extra='') { return `### ✅ TEST-DEL-001 — Entrega\n\n**Estado:** APROBADA\n\n${extra}\n\n#### 1. Requisitos de prueba derivados\n\nNO GENERA REQUISITOS DE PRUEBA\n`; }

test('quality conserva la tarea de la rama y permite seleccionar otra explícitamente',()=>{
  assert.equal(selectQualityTask([], 'task/auth-ui-044'),'AUTH-UI-044');
  assert.equal(selectQualityTask(['--task-id','AUTH-UI-043'],'task/auth-ui-044'),'AUTH-UI-043');
  assert.equal(selectQualityTask([], 'main'),null);
  assert.throws(()=>selectQualityTask(['--task-id'],'task/auth-ui-044'),/Uso/);
  assert.throws(()=>selectQualityTask(['--typo','AUTH-UI-044'],'main'),/Uso/);
});

test('extrae un solo bloque, preserva código y rechaza duplicados o IDs inexistentes',t=>{
  const root=fixture(t);const base=path.join(root,'docs/plan-canonico/modular');fs.mkdirSync(base,{recursive:true});
  fs.writeFileSync(path.join(base,'manifest.json'),JSON.stringify({files:['owner.md']}));
  const expected=artifact('```text\nPERMISSION != PATH\n```');
  fs.writeFileSync(path.join(base,'owner.md'),`### [ ] TEST-DEL-000 — Antes\n\n${expected}\n### [ ] TEST-DEL-002 — Después\n`);
  const p=extractDeliveryTask({root,taskId:'TEST-DEL-001'});
  assert.equal(fs.readFileSync(p,'utf8').trim(),expected.trim());
  assert.deepEqual(validateTask({taskPath:p,contract}).errors,[]);
  assert.throws(()=>extractDeliveryTask({root,taskId:'TEST-DEL-999'}),/encontrados 0/);
  fs.appendFileSync(path.join(base,'owner.md'),expected);
  assert.throws(()=>extractDeliveryTask({root,taskId:'TEST-DEL-001'}),/encontrados 2/);
});

test('permite describir descargar como acción de producto y rechaza instrucciones de descarga',t=>{
  const root=fixture(t);const p=path.join(root,'TEST-DEL-001_APROBADA_PARA_REEMPLAZAR.md');
  fs.writeFileSync(p,artifact('Exportar, imprimir o descargar no se deriva de un permiso de vista.'));
  assert.deepEqual(validateTask({taskPath:p,contract}).errors,[]);
  fs.writeFileSync(p,artifact('Descargar el archivo de tarea.'));
  assert.ok(validateTask({taskPath:p,contract}).errors.length>0);
  fs.writeFileSync(p,artifact('Descargar el artefacto.'));
  assert.ok(validateTask({taskPath:p,contract}).errors.length>0);
});

const action=(id,mode)=>`| \`${id}::PRIMARY\` | surface | PRIMARY | label | effect | protection | context | binding | \`${mode}\` | permission | formula | state | gap | owner |`;
const source=(obligations)=>`### ✅ AUTH-UI-031 — Acciones\n${action('A','ACTION-CLIENT-SELF')}\n${action('B','ACTION-NOT-AVAILABLE')}\n### ✅ AUTH-UI-043 — Servidor\n${obligations}\n### [ ] AUTH-UI-044 — Siguiente\n`;
const complete='| `ACTION-CLIENT-SELF` | Validar propiedad en servidor. |\n| `ACTION-NOT-AVAILABLE` | Conservar indisponibilidad. |';
test('cobertura detecta modalidades omitidas aunque el texto declare cobertura total',()=>{
 assert.throws(()=>validateActionServerCoverage(source('Cobertura total.\n| `ACTION-CLIENT-SELF` | Validar propiedad. |'),2),/ACTION-NOT-AVAILABLE/);
 assert.deepEqual(validateActionServerCoverage(source(complete),2),{skipped:false,actions:2,modes:2});
 assert.throws(()=>validateActionServerCoverage(source(complete+'\n| `ACTION-NOT-AVAILABLE` | Duplicado. |'),2),/duplicada/);
 assert.throws(()=>validateActionServerCoverage(source(complete).replace('B::PRIMARY','A::PRIMARY'),2),/duplicada/);
 assert.throws(()=>validateActionServerCoverage(source(complete+'\n| `ACTION-INVENTED` | Sin fuente. |'),2),/ACTION-INVENTED/);
});