import crypto from 'node:crypto';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

import {
  deriveImplementationControl,
  instanceRecordRelativePath,
} from './implementation-control.mjs';
import { resolveTaskWorkTopology } from './task-work-topology.mjs';

const TEMPLATE_PATH = 'docs/plan-canonico/modular/chatgpt-work-starter-template.txt';
const LEGACY_OUTPUT_PATH = 'INICIADOR_VENTO_ACTUAL.txt';
const DOCUMENTATION_OUTPUT_PATH = '.delivery/INICIADOR_VENTO_DOCUMENTACION.txt';
const IMPLEMENTATION_OUTPUT_PATH = '.delivery/INICIADOR_VENTO_IMPLEMENTACION.txt';
const SLOT = '{{CURRENT_WORK}}';

const DOCUMENTATION_PROTOCOL = "REGLA OBLIGATORIA DE RAMA POR TAREA Y CIERRE EN MAIN\n\nToda tarea canónica debe comenzar desde una rama de trabajo propia antes de modificar su contenido, código, datos, configuración o artefactos derivados.\n\nLa rama estable de integración es `main`. El trabajo ordinario no se desarrolla directamente sobre `main`.\n\nAntes de comenzar una tarea, el usuario ejecuta `npm run docs:task:start -- --task-id` seguido del identificador exacto de la tarea actual. ChatGPT debe entregar siempre el comando completo con el ID real ya resuelto; nunca debe dejar un identificador genérico para que el usuario lo complete.\n\nLa convención de rama es `task/<task-id-en-minusculas>`. Por ejemplo, la tarea `AUTH-SRV-001` utiliza `task/auth-srv-001`.\n\n`docs:task:start` debe fallar cerrado salvo que el worktree esté limpio, `main` pueda actualizarse mediante fast-forward, la tarea solicitada sea realmente la tarea canónica actual y el preflight documental sea válido.\n\nSi la rama remota todavía no existe, `docs:task:start` la crea desde `main` actualizado, configura upstream y la publica en GitHub antes de permitir trabajo.\n\nSi la rama ya existe en GitHub, `docs:task:start` la recupera o reutiliza y la sincroniza mediante fast-forward. Esta capacidad es el mecanismo normal para continuar una misma tarea desde otro computador.\n\nUn resultado `READY_TO_WORK: SI` autoriza únicamente a comenzar el trabajo previsto por la tarea; no sustituye las reglas de autorización física ni concede a ChatGPT permisos de escritura.\n\nDespués de que la tarea quede APROBADA y sus validaciones aplicables hayan pasado, ninguna tarea siguiente puede comenzar hasta cerrar la rama actual mediante `npm run docs:task:finish -- --task-id` seguido del identificador exacto de la tarea aprobada.\n\n`docs:task:finish` debe comprobar que se ejecuta desde la rama exacta de la tarea, que la tarea ya está APROBADA, que la continuidad la reconoce como última tarea aprobada, que `active-sequence.json` está vigente y que no existen archivos fuera de los alcances automatizables.\n\nEl cierre debe ejecutar `git diff --check`, preparar el alcance, validar `docs:commit-scope:check`, crear el commit final cuando existan cambios sin commit, publicar la rama, crear o actualizar el PR hacia `main`, declarar los TREQ afectados conforme al contenido real de la tarea, esperar los checks del PR, bloquear ante cualquier fallo y ejecutar el merge únicamente sobre el mismo SHA validado.\n\nDespués del merge, `docs:task:finish` debe cambiar a `main`, actualizarlo mediante fast-forward, comprobar sincronización `0/0`, comprobar worktree limpio y limpiar la rama de tarea cuando sea seguro.\n\nSolo `NEXT_TASK_ALLOWED: SI` confirma que la tarea siguiente puede comenzar.\n\n`APROBADO` por sí solo cierra la decisión documental de la tarea, pero no autoriza avanzar a la siguiente mientras el cierre Git anterior no haya producido `NEXT_TASK_ALLOWED: SI`.\n\nPREFLIGHT OBLIGATORIO\n\nCuando exista checkout actualizado de `vento-shell`, entrega al usuario como paso el preflight canónico antes de modificar; no lo ejecutes tú en modo manual:\n\n`npm run docs:task:preflight`\n\nSi se trabaja sobre una tarea explícita, usa su ID real y exacto en el comando; nunca escribas placeholders ejecutables ni rutas ficticias.\n\nREGLA DE APROBACIÓN\n\nLos artefactos documentales se preparan desde el inicio con:\n\n`### ✅ ID — TÍTULO`\n\ny:\n\n`**Estado:** APROBADA`\n\nEsto existe para que el archivo sea validable y pueda reemplazarse sin una segunda regeneración puramente administrativa.\n\nSin embargo:\n\n`ARCHIVO PREFORMATEADO COMO APROBADA`\n≠\n`APROBACIÓN CANÓNICA DEL USUARIO`\n\nLa aprobación canónica requiere siempre la palabra explícita:\n\n`APROBADO`\n\nPor tanto:\n\n- que el usuario no pida correcciones NO significa aprobación;\n- una entrega correcta NO avanza continuidad automáticamente;\n- una tarea aprobada NO inicia la siguiente por sí sola;\n- el usuario debe solicitar expresamente continuar.\n\nALCANCE Y CONTINUIDAD\n\n- Trabaja únicamente la tarea solicitada.\n- No prepares ni desarrolles la siguiente.\n- No edites `active-sequence.json` manualmente ni por inferencia.\n- No uses continuidad histórica dentro de una tarea antigua como continuidad actual.\n- Verifica la etapa contractual intermedia antes de saltar de bloque.\n- No cambies decisiones de tareas ajenas salvo corrección imprescindible y explícitamente trazable.\n- Si se corrige una tarea ya aprobada, la corrección no cambia por sí sola el estado de tareas posteriores.\n- Si el usuario pide revisión, no escribas.\n- Si el usuario pide corrección de un archivo propietario completo, devuelve ese archivo completo corregido sin inventar una nueva tarea administrativa.\n\nFORMATO DE TAREAS DOCUMENTALES\n\nPara tareas sujetas a `task-format-policy.json` y `task-development-policy.json`:\n\n1. exactamente una tarea por artefacto de tarea;\n2. título canónico exacto;\n3. línea vacía después del título;\n4. metadata compacta, sin líneas vacías internas;\n5. separador `---` después de metadata;\n6. campos obligatorios:\n   - Estado\n   - Tarea anterior\n   - Tarea siguiente\n   - Tipo de tarea\n   - Bloque\n   - Repositorio propietario\n   - Archivo propietario\n   - Estado físico resultante\n   - Cambios físicos autorizados\n   - Requisitos de prueba creados o modificados\n7. secciones sustantivas obligatorias:\n   - Propósito u Objetivo\n   - Requisitos de prueba derivados\n   - Evidencia de validación\n   - Criterios de aceptación\n   - Límites\n   - Continuidad\n8. evidencia con exactamente estas cinco clases:\n   - BUILD\n   - LOCAL\n   - REMOTA\n   - OPERATIVA\n   - FÍSICA\n9. estados de evidencia permitidos:\n   - PASS\n   - FAIL\n   - NOT_EXECUTED\n   - NOT_APPLICABLE\n10. continuidad exactamente en formato apilado:\n   - ÚLTIMA TAREA APROBADA\n   - TAREA ACTUAL APROBADA\n   - SIGUIENTE TAREA RESERVADA\n11. la sección Continuidad termina después de la siguiente tarea reservada.\n\nNo uses placeholders sin resolver, instrucciones de descarga, instrucciones de reemplazo, rutas locales ni contenido de chat dentro del artefacto de tarea.\n\nCONSISTENCIA ENTRE TAREAS DE UN MISMO MINIBLOQUE\n\nAntes de cerrar un minibloque:\n\n1. verifica cadena anterior → actual → siguiente;\n2. verifica título exacto y ownership;\n3. verifica topología uniforme cuando las tareas comparten modo;\n4. verifica fronteras de responsabilidad sin solapamiento;\n5. verifica que ninguna tarea absorba trabajo reservado a otra;\n6. verifica contratos, shapes, cardinalidades y namespaces contra la fuente propietaria;\n7. verifica que no existan dos significados para el mismo término;\n8. verifica que una proyección pública no adquiera campos no aprobados;\n9. verifica que `null`, ausencia, invalidez, deny y fallo técnico no se confundan;\n10. verifica que seguridad, rollback, frescura y evidencia sean coherentes entre tareas;\n11. verifica numeración y jerarquía Markdown;\n12. verifica que la tarea posterior consuma exactamente el handoff de la anterior;\n13. verifica omisiones: toda responsabilidad detectada debe tener propietario y condición de salida.\n\nNo reescribas tareas correctas solo para hacerlas “parecidas”. Corrige únicamente diferencias que afecten formato vigente, lógica, validación, claridad contractual o consistencia real.\n\nREGLA CRÍTICA DEL VALIDADOR DE ENTREGA Y TREQ\n\n`validate-task-delivery.mjs` interpreta cualquier identificador `TREQ-*` situado dentro de la sección `Requisitos de prueba derivados` como un requisito afectado por la entrega.\n\nPor tanto, cuando una tarea declara:\n\n`NO GENERA REQUISITOS DE PRUEBA`\n\ny:\n\n`Requisitos creados: 0`\n`Requisitos modificados: 0`\n\nla sección `Requisitos de prueba derivados` NO debe contener identificadores `TREQ-*`.\n\nSi se necesita documentar cobertura heredada, crea una sección posterior e independiente, por ejemplo:\n\n`Cobertura de prueba vigente reutilizada`\n\ny enumera allí los requisitos existentes, dejando explícito que se trata de trazabilidad y no de una actualización del registro.\n\nNunca menciones un identificador hipotético `TREQ-*` dentro de una sección de cero cambios.\n\nREGISTRO 04A\n\nLa fuente física canónica actual del registro es modular y está gobernada por `manifest.json`.\n\nCuando una tarea cambia uno o más `TREQ-*`:\n\n1. identifica los dominios afectados;\n2. actualiza el fragmento de encabezado;\n3. actualiza cada fragmento de dominio afectado;\n4. conserva intactos los fragmentos no afectados;\n5. usa los nombres canónicos exactos de los fragmentos;\n6. no entregue fragmentos idénticos al canónico como si estuvieran afectados;\n7. valida el registro prospectivo completo;\n8. preserva identificadores, secuencias, relaciones y las catorce columnas;\n9. no edites derivados o compilados para ocultar el cambio.\n\nCuando no hay cambios `TREQ-*`:\n\n- declara cero cambios;\n- justifica la cobertura;\n- no entregues 04A innecesario.\n\nEl formato externo de entrega al usuario continúa gobernado por `FORMATO_ENTREGA_VENTO_V1`; el modelo modular anterior describe la fuente canónica y lo que debe satisfacer el validador del repositorio. Si ambos contratos exigieran artefactos incompatibles en una futura tarea, detén la entrega y reporta la contradicción exacta antes de inventar un tercer formato.\n\nDESARROLLO DOCUMENTAL SUSTANTIVO\n\nUna tarea documental debe materializar sus decisiones, matrices, inventarios, contratos y handoffs completos.\n\nTAREAS DOCUMENTALES\n\nCuando la tarea sea documental:\n\n- completa todas las decisiones documentales;\n- no ejecutes cambios físicos reservados a una instancia posterior;\n- distingue contrato global de materialización;\n- aplica la topología vigente;\n- prepara el artefacto con formato APROBADA para validación;\n- no lo trates como aprobado canónicamente antes de `APROBADO`;\n- no avances continuidad.\n\nVALIDACIÓN PROPORCIONAL\n\nUsa los validadores reales del repositorio y reporta solo lo ejecutado.\n\nFORMATEO CANÓNICO OBLIGATORIO ANTES DE CHECK\n\nDespués de insertar o reemplazar una tarea documental y antes de ejecutar cualquier `--check` de formato, `docs:task:quality`, `docs:delivery:check` o batería global, el procedimiento normal es:\n\n1. ejecutar primero `docs:task:format` con `--write`, usando el archivo propietario real y el task ID exacto;\n2. ejecutar inmediatamente el mismo comando con `--check`;\n3. continuar con quality, delivery y la batería restante únicamente si ambos pasos terminan correctamente.\n\n`--write` no es un fallback que se usa solo después de que falle `--check`. Es el paso normal e idempotente de normalización canónica después de insertar o reemplazar el artefacto. El `--check` posterior demuestra que la normalización quedó estable.\n\nSi `--write` falla, detén el avance afectado y devuelve la evidencia. No ejecutes `--check`, quality ni la batería global sobre una tarea que no pudo normalizarse.\n\nNunca entregues `--check` como primer comando de formato inmediatamente después de insertar o reemplazar una tarea.\n\nPara una tarea documental actual, cuando exista checkout completo:\n\n1. preflight canónico;\n2. `docs:task:format --write` sobre el archivo propietario y task ID exactos;\n3. `docs:task:format --check` sobre el mismo archivo y task ID;\n4. `npm run docs:task:quality`;\n5. validación de entrega del artefacto con `npm run docs:delivery:check`;\n6. validadores de dominio indicados por preflight;\n7. validadores globales cuando el cambio canónico lo requiera.\n\nValidación global esperada desde `vento-shell`:\n\n`npm run docs:plan:build`\n`npm run docs:plan:check`\n`npm run docs:plan:test`\n`npm run docs:treq:check`\n`npm run docs:treq:test`\n`git diff --check`\n\nCuando aplique topología:\n\n`npm run docs:work-topology:check`\n\nCORRECCIONES DE ARCHIVOS YA APROBADOS\n\nSi el usuario pide corregir una tarea o minibloque ya aprobado:\n\n1. conserva las decisiones correctas;\n2. corrige únicamente contradicciones, omisiones, formato o incompatibilidades verificables;\n3. no cambies continuidad vigente por la mera corrección;\n4. si el archivo propietario completo fue solicitado, devuelve el archivo completo;\n5. si solo fue solicitada una tarea, devuelve únicamente el artefacto de esa tarea;\n6. no generes una tarea administrativa nueva para justificar la corrección;\n7. vuelve a comprobar requisitos, numeración, evidencia, ownership y fronteras después del cambio.\n\nENTREGA DOCUMENTAL AUTOCONTENIDA OBLIGATORIA\n\nLa primera respuesta que entregue materialmente una tarea documental debe ser autocontenida. El usuario no debe reconstruir el procedimiento consultando mensajes anteriores ni preguntar qué sigue.\n\nEn UN SOLO MENSAJE, y dentro de las ocho secciones de `FORMATO_ENTREGA_VENTO_V1`, ChatGPT debe entregar en orden:\n\n1. el enlace de descarga del archivo completo de tarea;\n2. el enlace del 04A completo cuando corresponda;\n3. la ruta exacta del archivo propietario;\n4. el marcador exacto que se reemplaza;\n5. la instrucción exacta de reemplazo y guardado;\n6. todos los comandos de validación determinables con la evidencia disponible, en su orden real;\n7. la batería documental completa aplicable, sin omitirla por estar documentada en otra fuente;\n8. el resultado esperado de cada gate o el bloque compacto que el usuario debe devolver;\n9. la comprobación final de `git status --short` / `git diff --check` y del alcance esperado;\n10. qué hacer ante FAIL: detener únicamente el avance afectado, conservar la evidencia y devolver el bloque `RESULTADO PARA CHATGPT`;\n11. la palabra exacta `APROBADO` cuando corresponda a la decisión documental;\n12. el cierre posterior exacto mediante `docs:task:finish` y el requisito `NEXT_TASK_ALLOWED: SI`;\n13. la siguiente tarea reservada, sin desarrollarla.\n\nNo dividas estos pasos entre varios mensajes cuando ya puedan determinarse. No entregues solo el artefacto esperando que el usuario pregunte después por la batería, el cierre o el paso final. Solo detente antes cuando el siguiente contenido dependa materialmente de una salida todavía desconocida.\n\nSi una validación falla, revisa el conjunto completo de aserciones y validadores afectados antes de entregar una corrección; no hagas que el usuario descubra errores previsibles uno por uno.\n";
const IMPLEMENTATION_PROTOCOL = "REGLA OBLIGATORIA DE RAMA FÍSICA Y CIERRE EN MAIN\n\nRESILIENCIA OBLIGATORIA DEL LIFECYCLE FISICO\n\nEstas reglas pertenecen exclusivamente al carril fisico y se generan dentro de INICIADOR_VENTO_IMPLEMENTACION; no pertenecen a la plantilla compartida.\n\n1. SCOPE_FISICO = authorized_changes de la instancia para el repositorio objetivo. El lifecycle fisico no decide escrituras mediante una whitelist global de carpetas.\n2. Una ruta con change = EXECUTE_ONLY nunca es escribible. 04A/TREQ permanece bloqueado aunque una clasificacion generica reconozca la carpeta.\n3. Fuera de authorized_changes solo se admiten proyecciones propias del lifecycle y, como maximo, un nuevo registro pristino PENDING_AUTHORIZATION derivado.\n4. docs:implementation:finish es el mecanismo normal de cierre y recuperacion. Si se interrumpe despues de commit, push, PR o merge, se vuelve a ejecutar el mismo lifecycle; no se crean recovery ad hoc para reconstruir pasos ya realizados.\n5. El cierre fisico nunca usa force-push.\n6. CI de implementation/* valida base..head contra la instancia resuelta desde la rama; las reglas genericas de mezcla no sustituyen authorized_changes.\n7. Si github.event.before no es alcanzable, CI usa fallback seguro a base..head y no falla por Invalid revision range.\n8. En Windows no se invoca child_process.spawn/spawnSync directamente sobre npm.cmd; se usa resolveNpmInvocation o process.execPath para scripts Node conocidos.\n9. Los nombres npm se leen de package.json. La sincronizacion local vigente es docs:plan:local-sync.\n10. La politica de texto usa * text=auto eol=lf y los hashes persistidos de migraciones neutralizan CRLF de checkout a LF.\n11. Un fallo de gate por estas invariantes se corrige en lifecycle, workflow, validador o politica propietaria y recibe prueba de regresion; no se salta mediante workaround manual.\n12. Todo materializador TXT ejecutado con node --input-type=commonjs - debe pasar antes docs:delivery-exec:check -- --file <archivo> --mode stdin-commonjs; Illegal return statement u otro error de parser debe detenerse antes de tocar el repositorio.\n\nPara una implementación física en `vento-shell` no uses `docs:task:start` ni `docs:task:finish`, porque esos comandos pertenecen exclusivamente a la continuidad documental y exigen que el `task_id` sea la tarea documental actual.\n\nDespués de detener primero el watcher y confirmar `main` limpio, actualizado y sincronizado `0/0`, el usuario guarda después el registro de instancia en `AUTHORIZED` y ejecuta `npm run docs:implementation:start -- --instance-id` seguido del identificador físico exacto. ChatGPT debe entregar siempre el comando completo con el `instance_id` real; nunca debe dejar un identificador genérico para completar.\n\nLa convención de rama física es `implementation/<task-id-en-minusculas>/<instance-key-en-minusculas>`. Por ejemplo, `SHELL-CON-001::GLOBAL` utiliza `implementation/shell-con-001/global`.\n\nAntes de crear cualquier rama física, todos los repositorios incluidos en `target_repositories` deben quedar en su rama estable `main`, con `fetch` ejecutado, actualización `pull --ff-only`, worktree limpio y divergencia `0/0` respecto de `origin/main`. Si una instancia afecta más de un repositorio, esta comprobación se realiza en cada uno antes de crear ninguna rama de implementación.\n\n`docs:implementation:start` debe fallar cerrado salvo que `main` esté sincronizado `0/0`, la instancia exista y esté `AUTHORIZED`, conserve autorización humana válida y el único cambio local previo sea su propio archivo de instancia. Antes de crear o recuperar la rama física, el comando ejecuta un readiness físico de solo lectura mientras la instancia permanece `AUTHORIZED`. En carril físico, la continuidad documental actual, el formato histórico del marcador propietario y un `active-sequence.json` pendiente de regeneración son contexto documental y se clasifican como avisos, no como bloqueos de una instancia previamente aprobada y autorizada; siguen siendo bloqueos reales la autorización inválida, el contrato de entrega inválido, divergencia bloqueante, cambios locales inesperados, identidad de instancia incorrecta o cualquier otro hallazgo físico. Solo después de `PRE_BRANCH_READINESS: PASS` puede crear o recuperar la rama, configurar y publicar su upstream, cambiar únicamente esa instancia a `IN_PROGRESS` y ejecutar automáticamente una sola vez el preflight físico estricto con `--instance-id`. Después de ese preflight, el mismo `docs:implementation:start` ejecuta `docs:plan:build` una vez para reconciliar el cambio de estado físico y `docs:plan:check` para demostrar que cabecera, control, Iniciador y derivados versionados quedaron coherentes antes de permitir código. El usuario no ejecuta ese build manualmente. Solo `PRE_BRANCH_READINESS: PASS`, `PREFLIGHT: PASS`, `START_DOCS_PLAN_BUILD: PASS_ONCE`, `START_DOCS_PLAN_CHECK: PASS`, `DOCUMENTARY_LANE_FOR_PHYSICAL: ADVISORY_ONLY` y `READY_TO_IMPLEMENT: SI` habilitan la materialización.\n\nDespués de que la batería física autorizada haya pasado, la evidencia esté consolidada y la instancia quede `VERIFIED`, el usuario ejecuta `npm run docs:implementation:finish -- --instance-id` seguido del identificador exacto. Este comando ejecuta `docs:plan:build` exactamente una vez como sincronización documental convergente de cierre y, antes de stage, commit o push, debe ejecutar localmente `docs:plan:check`, `docs:plan:test`, `docs:treq:check`, `docs:treq:test`, `quality:lint:ratchet` y `git diff --check`. Luego bloquea cambios directos al registro 04A/TREQ, prepara únicamente el alcance automatizable, valida `docs:commit-scope:check`, crea el commit final, publica la rama, crea o actualiza el PR, espera los checks, mergea únicamente el SHA validado, sincroniza `main` `0/0` y limpia la rama. Solo `READY_TO_RESTART_WATCHER: SI` permite volver a encender el watcher.\n\nPara una implementación física que además modifique repositorios consumidores, las ramas, commits, validaciones y merges propios de esos repositorios continúan gobernados por el expediente físico correspondiente. El lifecycle de `vento-shell` no simula ni sustituye la integración pendiente de otro repositorio.\n\nLa fuente compartida entre computadores es GitHub. Un cambio sin commit o un commit sin push no forma parte del estado recuperable desde otra estación.\n\nREGLA DE PRECEDENCIA DEL LIFECYCLE FÍSICO\n\nDesde que existen `docs:implementation:start` y `docs:implementation:finish`, esos comandos son la autoridad operativa para abrir y cerrar una instancia física en `vento-shell`.\n\nSi el contenido dinámico de `CURRENT-WORK` conserva instrucciones históricas que indiquen crear una rama física con `git switch -c`, cambiar manualmente `AUTHORIZED` a `IN_PROGRESS`, omitir el readiness previo a la rama, ejecutar manualmente el preflight físico inicial, publicar manualmente la rama de apertura, ejecutar manualmente `docs:plan:build` para reconciliar `AUTHORIZED`/`IN_PROGRESS`, ejecutar manualmente validadores documentales que ya pertenecen a `docs:implementation:start` o `docs:implementation:finish`, o realizar manualmente commit, push, PR o merge final que ya pertenezcan a `docs:implementation:finish`, ChatGPT debe tratarlas como proyección operativa desactualizada y NO debe entregarlas al usuario.\n\nLa materialización del código, la transición posterior a `IMPLEMENTED`, la ejecución de las `validation_commands`, la consolidación de evidencia y el paso a `VERIFIED` continúan siendo responsabilidad humana salvo autorización asistida explícita. El lifecycle físico automatiza únicamente lo que sus comandos declaran expresamente.\n\nAnte cualquier diferencia entre una instrucción dinámica de `CURRENT-WORK` y estas reglas globales del template, prevalece este template para el flujo operativo. Esa precedencia no amplía el alcance autorizado de la instancia ni permite omitir gates, evidencia, TREQ, permisos, credenciales o límites de repositorio.\n\nMODO PREDETERMINADO DE IMPLEMENTACIÓN HUMANA\n\nLa autorización física de una instancia y la autorización para que ChatGPT escriba son decisiones distintas.\n\nPor defecto:\n\n- el usuario humano crea, modifica, reemplaza y elimina archivos;\n- el usuario humano ejecuta comandos, validaciones, instalaciones y migraciones;\n- el usuario humano realiza commit, push, PR, despliegues y cualquier mutación remota;\n- ChatGPT puede auditar fuentes en solo lectura, preparar el mapa y entregar instrucciones exactas;\n- ChatGPT entrega seguidos todos los pasos que pueden determinarse con la evidencia disponible y se detiene únicamente cuando el paso siguiente depende de una salida todavía desconocida;\n- `AUTHORIZED`, `APROBADO`, `RESULTADO DEL PASO`, “implementa” y “haz la acción principal” no autorizan escrituras automáticas del asistente.\n\nEl historial físico es acumulativo y usa un archivo por instancia bajo `docs/plan-canonico/modular/implementation-instances/`:\n\n- cuando una instancia queda lista para autorización, el watcher crea automáticamente su archivo exacto en `PENDING_AUTHORIZATION` sin inferir alcance ni autorización;\n- ChatGPT recibe en este iniciador la ruta y el contenido local completos de ese archivo y, después de auditar, entrega su reemplazo íntegro para `AUTHORIZED`;\n- el usuario nunca crea manualmente el archivo ni edita `implementation-control.json` durante el flujo normal;\n- implementar, validar o bloquear una instancia modifica únicamente ese mismo archivo;\n- `evidence` conserva allí la evidencia consolidada de su implementación y validación;\n- una instancia `VERIFIED` y su evidencia son históricas e inmutables;\n- nunca se reemplaza un arreglo global `instances`, nunca se borra un registro anterior y nunca se autoriza la siguiente instancia sobrescribiendo la precedente;\n- `docs/plan-canonico/modular/implementation-control.json` contiene solo la política común y no se modifica durante el ciclo normal de una instancia.\n\nPara cada implementación física:\n\n1. la primera respuesta presenta el mapa completo numerado;\n2. el lote actual contiene todos los pasos consecutivos que no dependen de información nueva;\n3. cada paso indica operación, repositorio, ruta absoluta y relativa, contenido completo o comando, comprobación y evidencia esperada;\n4. crear un archivo exige contenido completo sin elipsis;\n5. modificar un archivo entrega preferentemente el archivo completo; en archivos materialmente enormes puede entregar un bloque anterior literal y único más su reemplazo completo;\n6. ejecutar una validación exige directorio y comando exactos, pero la ejecuta el usuario;\n7. no se pausa entre pasos por rutina ni para pedir `HECHO`;\n8. solo se pausa cuando el próximo contenido o decisión depende de una prueba, salida, discrepancia local, permiso, credencial, decisión humana u operación sensible todavía no resuelta;\n9. al pausar se pide `RESULTADO DEL PASO N` con la evidencia exacta necesaria;\n10. el progreso se informa como `N/M` sin declarar completado lo que no fue demostrado;\n11. las respuestas intermedias son compactas para no repetir el contrato completo ni consumir mensajes innecesarios.\n\nFLUJO RÁPIDO DE IMPLEMENTACIÓN FÍSICA\n\nPara una instancia física autorizada, la eficiencia operativa es vinculante:\n\n1. mientras el carril sea documental, el watcher puede permanecer activo para sincronizar artefactos derivados y crear el registro `PENDING_AUTHORIZATION` cuando corresponda;\n2. después de que ChatGPT audite el alcance, detén primero el watcher con `Ctrl+C` si está activo; no escribas todavía `AUTHORIZED`;\n3. con el watcher ya apagado y antes de modificar el registro de instancia, confirma en todos los `target_repositories` su `main` actualizado con `fetch`, `pull --ff-only`, worktree limpio y sincronización `0/0`; si alguno falla, no se escribe la autorización ni se crea ninguna rama;\n4. solo después de superar esa comprobación guarda el registro `AUTHORIZED`;\n5. con el watcher apagado, ejecuta `npm run docs:implementation:start -- --instance-id` seguido del identificador físico exacto resuelto; este comando ejecuta primero readiness físico de solo lectura mientras la instancia sigue `AUTHORIZED`; la continuidad documental adelantada, el formato histórico del marcador y `active-sequence.json` pendiente son avisos documentales en este carril y no obligan a reabrir tareas históricas; solo tras `PRE_BRANCH_READINESS: PASS` crea o recupera la rama `implementation/<task-id-en-minusculas>/<instance-key-en-minusculas>`, publica su upstream, cambia únicamente el registro a `IN_PROGRESS`, ejecuta el preflight físico estricto una sola vez y después ejecuta automáticamente `docs:plan:build` una vez seguido de `docs:plan:check` para reconciliar los derivados versionados del nuevo estado físico;\n6. si `docs:implementation:start` produce `PRE_BRANCH_READINESS: PASS`, `PREFLIGHT: PASS`, `START_DOCS_PLAN_BUILD: PASS_ONCE`, `START_DOCS_PLAN_CHECK: PASS` y `READY_TO_IMPLEMENT: SI`, continúa localmente sin volver al chat; desde ese momento el watcher debe permanecer apagado hasta que el cierre físico confirme `READY_TO_RESTART_WATCHER: SI`; si produce FAIL, ese sí es un gate de evidencia;\n7. después del preflight materializa todos los cambios deterministas de la implementación sin gates intermedios de `git status`, Source Control, capturas, hashes sueltos, diff, build, lint o tests;\n8. cuando todos los cambios físicos estén completos, registra `IMPLEMENTED` con la identidad disponible y ejecuta una sola transacción final fail-fast formada exclusivamente por las `validation_commands` autorizadas de la instancia, en su orden contractual; no agregues automáticamente `docs:plan:build`, `docs:plan:check`, `docs:plan:test`, `docs:treq:check` ni `docs:treq:test`; si toda la evidencia exigida es local, la transacción puede llegar directamente a `VERIFIED` tras PASS; si alguna validación exige evidencia remota sobre código publicado, completa primero el tramo local, realiza el commit/push mínimo de materialización mientras la instancia permanece `IMPLEMENTED` y ejecuta después el tramo remoto contra ese SHA;\n9. si la batería falla en el tramo local o remoto, conserva `IMPLEMENTED`, corrige únicamente la causa dentro del alcance y vuelve a ejecutar la misma batería final completa; si la corrección cambia el SHA publicado, realiza un nuevo commit/push de materialización antes del tramo remoto; no la fragmentes en micro-gates;\n10. cambia la instancia a `VERIFIED` únicamente cuando hayan pasado todos los tramos exigidos por el contrato, incluida la evidencia remota cuando aplique; entonces consolida `evidence` y no repitas validaciones por rutina;\n11. después de `VERIFIED`, ejecuta `npm run docs:implementation:finish -- --instance-id` seguido del identificador físico exacto resuelto; el cierre ejecuta `npm run docs:plan:build` una sola vez, por lo que no debes ejecutarlo manualmente antes ni después;\n12. `docs:implementation:finish` realiza el build documental único y convergente, ejecuta localmente `docs:plan:check`, `docs:plan:test`, `docs:treq:check`, `docs:treq:test`, `quality:lint:ratchet` y `git diff --check` antes de stage/commit/push, valida el commit, realiza el commit/push final de cierre, crea o actualiza el PR, espera CI, mergea el mismo SHA validado, vuelve a `main`, comprueba sincronización `0/0`, limpia la rama y conserva la terminal abierta ante PASS o FAIL;\n13. solo con `READY_TO_RESTART_WATCHER: SI` vuelve a encender el watcher; al arrancar debe comprobar estado y fuentes en modo de solo lectura, publicar estado runtime y no ejecutar build ni modificar archivos versionados hasta detectar un cambio documental real;\n14. si GitHub Push Protection bloquea un push, clasifica primero el hallazgo: un fixture sintético verificado puede exceptuarse como prueba o falso positivo, pero un secreto real debe retirarse y rotarse y nunca puede recibir bypass.\n\nLa única excepción es una frase explícita para un paso ya numerado, por ejemplo:\n\n`AUTORIZO EJECUCION ASISTIDA DEL PASO 3`\n\nEsa frase autoriza solamente el paso 3. No autoriza pasos anteriores, posteriores, comandos adicionales, Git, GitHub, despliegues ni cambios remotos no contenidos literalmente en ese paso. Al terminar, vuelve automáticamente el modo manual.\n\nPREFLIGHT FÍSICO OBLIGATORIO\n\nEn una instancia física `docs:implementation:start` contiene automáticamente el gate de apertura completo y ninguna de sus partes se invoca manualmente durante el flujo normal. Primero se ejecuta un readiness de solo lectura mientras la instancia sigue `AUTHORIZED`; esta comprobación ocurre antes de crear o recuperar la rama y debe terminar con `PRE_BRANCH_READINESS: PASS`. La continuidad documental actual, el formato histórico del marcador propietario y `active-sequence.json` pendiente de regeneración se conservan como avisos porque la instancia física puede ejecutarse mucho después de su aprobación documental; no se reformatea ni se reabre una tarea histórica para implementarla. Solo entonces el lifecycle crea o recupera la rama, cambia la instancia a `IN_PROGRESS` y ejecuta internamente una sola vez `npm run docs:task:preflight -- --instance-id` con el identificador físico exacto, `--json --strict`. Después ejecuta `docs:plan:build` una vez y `docs:plan:check` para reconciliar el estado físico y sus derivados antes de `READY_TO_IMPLEMENT: SI`. El preflight estricto no se repite como comprobación rutinaria entre archivos ni antes de cada comando; solo se repite si el checkout cambia materialmente o una discrepancia concreta hace que la evidencia anterior deje de ser suficiente.\n\nEl preflight debe resolver como mínimo:\n\n- tarea actual;\n- propietario;\n- continuidad;\n- formato;\n- contrato de entrega;\n- estado del worktree;\n- divergencia respecto del upstream disponible;\n- validadores proporcionales para trabajo documental o, en carril físico, exclusivamente las `validation_commands` autorizadas de la instancia.\n\nUn warning de preflight debe clasificarse antes de continuar. No lo ignores por conveniencia.\n\nDESARROLLO FÍSICO SUSTANTIVO\n\nUna tarea de implementación debe terminar con cambios reales en código, SQL, migraciones, configuración, tests o documentación que le pertenezcan; en modo manual esos cambios los realiza el usuario mediante lotes continuos separados únicamente por gates de evidencia reales.\n\nTAREAS DE IMPLEMENTACIÓN\n\nAntes de editar determina:\n\n- repositorio;\n- archivos reales;\n- comportamiento actual;\n- comportamiento esperado;\n- dependencias;\n- consumidores;\n- tests;\n- migraciones;\n- impacto de datos;\n- rollback;\n- evidencia.\n\nDespués guía al usuario para materializar únicamente lo necesario y entrega seguidos todos los pasos deterministas hasta el siguiente gate de evidencia.\n\nNo declares implementación completa solo porque compile.\n\nVALIDACIÓN FÍSICA PROPORCIONAL\n\nPara implementación física, la batería final no se deriva de esta lista global: ejecuta exclusivamente las `validation_commands` autorizadas en la instancia, en una sola transacción fail-fast después de materializar los cambios. Typecheck, lint, unitarias, integración, build, migraciones, seguridad o validaciones remotas/operativas solo se ejecutan si pertenecen a esas `validation_commands`. Si la batería falla, se corrige la causa y se vuelve a ejecutar la misma batería; un PASS completo no se repite antes de `VERIFIED`. Los builds documentales del lifecycle no forman parte de esa batería: `docs:implementation:start` ejecuta `docs:plan:build` una vez después de pasar a `IN_PROGRESS` para reconciliar la apertura, y `docs:implementation:finish` ejecuta `docs:plan:build` una vez después de `VERIFIED` para reconciliar el cierre. Ninguno se ejecuta manualmente por rutina.\n\nDistingue siempre:\n\n- VALIDACIÓN ESTRUCTURAL DEL ARTEFACTO;\n- VALIDACIÓN LOCAL DEL REPOSITORIO;\n- VALIDACIÓN REMOTA;\n- VALIDACIÓN OPERATIVA;\n- VALIDACIÓN FÍSICA.\n\nNunca declares `PASS` sin evidencia real. `NOT_EXECUTED` y `NOT_APPLICABLE` no son equivalentes.\n\nENTREGA FÍSICA AUTOCONTENIDA OBLIGATORIA\n\nLa primera respuesta material de una fase física debe presentar el mapa operativo completo numerado y entregar juntos todos los pasos consecutivos que ya puedan determinarse. El usuario no debe preguntar qué sigue entre pasos deterministas.\n\nEn UN SOLO MENSAJE de la fase actual, ChatGPT debe incluir:\n\n1. estado real e instancia exacta;\n2. registro de instancia y reemplazo completo cuando corresponda;\n3. target repositories y alcance autorizado;\n4. preparación exacta de repositorios y watcher;\n5. comando exacto de `docs:implementation:start`;\n6. todos los cambios deterministas que pueden materializarse antes del siguiente gate;\n7. `quality:repair` exactamente una vez cuando corresponda;\n8. transición a `IMPLEMENTED` solo después de cumplir su gate;\n9. batería final formada exclusivamente por `validation_commands`, en orden y fail-fast;\n10. bloque compacto `RESULTADO PARA CHATGPT` que debe regresar al chat cuando se necesite evidencia;\n11. reglas de corrección y repetición de la batería si falla;\n12. transición a `VERIFIED` únicamente con toda la evidencia;\n13. comando exacto de `docs:implementation:finish`;\n14. resultado final esperado `READY_TO_RESTART_WATCHER: SI`;\n15. siguiente instancia o continuidad únicamente como reserva informativa.\n\nNo fragmentes el flujo en micro-gates de `HECHO`, `git status`, capturas, hashes o validaciones parciales cuando el siguiente paso ya sea determinable. Solo pausa cuando la siguiente acción dependa de una salida desconocida, una decisión humana, una credencial, un permiso, una contradicción o un fallo real.\n";

const DOWNLOAD_CLEANUP_PROTOCOL = `LIMPIEZA TRANSACCIONAL DE ENTRADAS DESCARGADAS

Cuando un paso consume uno o más archivos ubicados bajo la carpeta real de Descargas del usuario, el runbook debe tratarlos como entradas temporales y programar su limpieza dentro de ese mismo paso.

La limpieza es obligatoria únicamente cuando se cumplan todas estas condiciones:

1. cada entrada descargada fue declarada mediante una ruta absoluta exacta y validada como archivo regular dentro de la carpeta real de Descargas;
2. su identidad, hash o contenido fue validado cuando el paso lo exige;
3. todos los consumidores previstos terminaron de usarla;
4. la aplicación o reemplazo terminó sin excepción;
5. todas las comprobaciones que pertenecen a la operación consumidora produjeron PASS;
6. el archivo no es una salida, evidencia o artefacto que el contrato exija conservar.

Si cualquiera de esas condiciones falla, no borres ninguna entrada descargada. Un FAIL, una excepción, una validación parcial, un estado NOT_EXECUTED o un consumidor posterior pendiente conservan los archivos para diagnóstico y reintento.

Después del último gate PASS de la operación consumidora y antes de emitir su resultado final PASS:

- elimina exclusivamente las rutas exactas registradas para esa operación;
- usa Remove-Item -LiteralPath sin comodines y sin -Recurse;
- rechaza cualquier ruta que no resuelva dentro de la carpeta real de Descargas;
- rechaza directorios, enlaces ambiguos, globs y rutas construidas desde texto no validado;
- comprueba con Test-Path -LiteralPath que cada entrada ya no exista;
- emite DOWNLOAD_CLEANUP: PASS solo después de comprobar la ausencia de todas las entradas;
- si la eliminación o la comprobación falla, emite DOWNLOAD_CLEANUP: FAIL, no emitas el PASS final de la operación y conserva la evidencia exacta del fallo.

Cuando varias entradas forman un lote, la limpieza ocurre una sola vez después de que el lote completo haya producido PASS. Cuando una entrada será reutilizada por un paso posterior ya determinado, difiere su limpieza hasta el PASS de su último consumidor.

Nunca limpies Descargas de forma general. Nunca uses Remove-Item sobre la carpeta Descargas, una ruta padre, una búsqueda, una extensión completa ni una lista descubierta dinámicamente. Esta regla autoriza únicamente la eliminación post-PASS de los archivos temporales exactos que el propio runbook indicó descargar y consumir.`;

export const CHATGPT_STARTER_PATHS = Object.freeze({
  selector: LEGACY_OUTPUT_PATH,
  documentation: DOCUMENTATION_OUTPUT_PATH,
  implementation: IMPLEMENTATION_OUTPUT_PATH,
});

function sha256(source) {
  return crypto.createHash('sha256').update(source).digest('hex');
}

function list(values, fallback = 'Ninguno.') {
  return values.length > 0 ? values.map((value) => `- ${value}`).join('\n') : `- ${fallback}`;
}

function metadata(block, label) {
  const escaped = label.replace(/[.*+?^${}()|[\]\\]/gu, '\\$&');
  return block.match(new RegExp(`^\\*\\*${escaped}:\\*\\*\\s*(.+)$`, 'imu'))?.[1]?.trim() ?? 'No declarado.';
}

function taskState(task) {
  if (task.marker === '[ ]') return 'NO INICIADA';
  if (task.marker === '[~]' || task.marker === '🟡') return 'PROPUESTA PARA APROBACIÓN';
  if (task.marker === '❌') return 'RECHAZADA';
  return 'APROBADA';
}

function countByStatus(rows, status) {
  return rows.filter((entry) => entry.status === status).length;
}

function sourceContext(task) {
  return [
    'CONTENIDO CANÓNICO DE LA TAREA OBJETIVO',
    '',
    task.block.trim(),
  ].join('\n');
}

function renderSelector(control) {
  const physical = control.physical.active;
  const physicalSet = control.physical.actionableSet ?? (physical ? [physical] : []);
  const physicalSetLabel = physicalSet.length > 0
    ? physicalSet.map(({ instanceId, status }) => `${instanceId} — ${status}`).join('; ')
    : 'SIN INSTANCIAS EN CURSO';
  return `VENTO OS — SELECTOR DE INICIADOR POR INTENCIÓN

ESTE ARCHIVO YA NO CONTIENE EL PAYLOAD COMPLETO DE TRABAJO.
NO LO USES COMO SUSTITUTO DE LOS INICIADORES ESPECÍFICOS.

CARRIL DOCUMENTAL

- Archivo: ${DOCUMENTATION_OUTPUT_PATH}
- Tarea actual: ${control.documentary.taskId} — ${control.documentary.taskTitle}
- Estado: ${control.documentary.state}
- Úsalo para: desarrollar, documentar, revisar o corregir la tarea documental actual.

CARRIL FÍSICO

- Archivo: ${IMPLEMENTATION_OUTPUT_PATH}
- Puntero de compatibilidad: ${physical ? `${physical.instanceId} — ${physical.status}` : 'SIN INSTANCIA ACTIVA'}
- Conjunto físico gobernado: ${physicalSetLabel}
- Úsalo para: autorizar, implementar, continuar o resolver la instancia indicada por el puntero sin negar las demás instancias en curso.

REGLA

Carga solamente uno de los dos iniciadores según la intención de la conversación. Nunca cargues ambos en la misma conversación.
`;
}

function renderDocumentationWork({ control, workTopology, templateHash, repositoryRoot }) {
  const task = workTopology.inventory.get(control.documentary.taskId);
  if (!task) throw new Error(`no se encontró ${control.documentary.taskId} en el inventario canónico.`);
  const lifecycle = workTopology.topology.get(task.id);
  const dependencies = workTopology.dependencies.get(task.id);
  if (!lifecycle || !dependencies) throw new Error(`no se resolvió la topología de ${task.id}.`);

  const physical = control.physical.active;
  const sourceContractHash = sha256(task.block.replace(/\r\n?/gu, '\n'));

  return `INTENT_LOCK: DOCUMENTATION
CONVERSATION_LANE: DOCUMENTARY
DO_NOT_SWITCH_LANES: TRUE

REGLA CRÍTICA DE ESTA CONVERSACIÓN

Esta conversación trabaja EXCLUSIVAMENTE el carril documental y la tarea ${task.id}.

- Una instancia física pendiente, autorizada, en progreso, implementada o bloqueada NO cambia la tarea documental de esta conversación.
- NO autorices implementaciones desde este iniciador.
- NO ejecutes implementaciones desde este iniciador.
- NO cambies al carril físico por prioridad de implementation-control.
- Si el usuario solicita después una acción física, debe abrir otra conversación con ${IMPLEMENTATION_OUTPUT_PATH}.

TRABAJO DOCUMENTAL ACTUAL

- ID: ${task.id}
- Título: ${task.title}
- Estado canónico: ${taskState(task)}
- Carril documental: ${control.documentary.state}
- Repositorio propietario: ${metadata(task.block, 'Repositorio propietario')}
- Archivo propietario: docs/plan-canonico/modular/${task.relativePath}
- Tipo de tarea: ${metadata(task.block, 'Tipo de tarea')}
- Ciclo físico declarado para el contrato: ${lifecycle.label} (${lifecycle.mode})
- Raíz local exacta del repositorio: ${repositoryRoot}

CONTINUIDAD DOCUMENTAL

- Tarea actual: ${control.documentary.taskId} — ${control.documentary.taskTitle}
- Dependencias para desarrollar: ${dependencies.developmentSource ?? 'Solo precedencia canónica vigente.'}
- Dependencias para ejecutar físicamente: INFORMATIVAS EN ESTE INICIADOR; NO EJECUTAR.

METODOLOGÍA DOCUMENTAL VIGENTE

- El usuario humano realiza los reemplazos y comandos locales.
- Antes de desarrollar, verifica 01_PROTOCOLO.md, delivery-contract.json, manifest.json, continuidad, topología, políticas de formato/desarrollo, archivo propietario, dependencias, 04A cuando aplique, package.json y validadores reales.
- Si docs:task:start -- --task-id ${task.id} ya produjo PASS y READY_TO_WORK: SI, no lo repitas.
- El artefacto de tarea se entrega completo, listo para reemplazar el marcador exacto, pero no se vuelve canónico hasta que el usuario responda APROBADO.
- APROBADO no autoriza implementación física ni avance automático a la siguiente tarea.
- El cierre documental conserva npm run docs:task:finish -- --task-id ${task.id} y no se sustituye por commits manuales.
- No pegues en el chat el contenido completo de la tarea ni de 04A cuando existan archivos descargables preparados para reemplazo.
- Distingue VALIDACIÓN ESTRUCTURAL DEL ARTEFACTO de VALIDACIÓN REAL DEL REPOSITORIO.

PROTOCOLO DOCUMENTAL COMPLETO RESTAURADO

${DOCUMENTATION_PROTOCOL}

COMANDOS DOCUMENTALES RESUELTOS PARA ESTA TAREA

- Apertura, si todavía no existe evidencia PASS: npm run docs:task:start -- --task-id ${task.id}
- Preflight proporcional: npm run docs:task:preflight -- --task-id ${task.id}
- Formateo canónico obligatorio después del reemplazo: npm run docs:task:format -- --file "docs/plan-canonico/modular/${task.relativePath}" --task-id ${task.id} --write
- Comprobación de formato, solo después del --write: npm run docs:task:format -- --file "docs/plan-canonico/modular/${task.relativePath}" --task-id ${task.id} --check
- Orden obligatorio de validación: FORMAT_WRITE -> FORMAT_CHECK -> TASK_QUALITY -> DELIVERY_CHECK -> validadores de dominio -> batería global.
- Calidad de tarea: npm run docs:task:quality
- Batería global esperada cuando aplique: npm run docs:plan:build; npm run docs:plan:check; npm run docs:plan:test; npm run docs:treq:check; npm run docs:treq:test; git diff --check.
- Cierre después de APROBADO y validaciones PASS: npm run docs:task:finish -- --task-id ${task.id}
- Único resultado que habilita continuidad: NEXT_TASK_ALLOWED: SI.

CARRIL FÍSICO — SOLO ESTADO INFORMATIVO

- Puntero de compatibilidad: ${physical ? physical.instanceId : 'NINGUNA'}
- Estado del puntero: ${physical ? physical.status : 'SIN INSTANCIA ACTIVA'}
- Conjunto físico gobernado: ${(control.physical.actionableSet ?? (physical ? [physical] : [])).map(({ instanceId, status }) => `${instanceId} — ${status}`).join('; ') || 'NINGUNO'}
- Contrato físico: ${physical ? `${physical.taskId} — ${physical.taskTitle}` : 'No aplica.'}
- Acción física prioritaria global: ${physical ? `${control.primaryAction.type} ${control.primaryAction.target}` : 'NINGUNA'}
- Alcance dentro de esta conversación: FUERA DE ALCANCE. NO DESARROLLAR, NO AUTORIZAR, NO EJECUTAR.

TRAZABILIDAD DEL INICIADOR

- Intención: DOCUMENTATION
- Plantilla SHA-256: ${templateHash}
- Contrato documental SHA-256: ${sourceContractHash}
- Fuente de continuidad: task-work-topology + preflight documental
- Fuente de control físico resumido: docs/plan-canonico/modular/implementation-control.json

${sourceContext(task)}
`;
}

// C6_ADVANCE_ONLY_STARTER_PROJECTION
export const IMPLEMENTATION_OPERATIONAL_PROJECTION_ID = 'VENTO-IMPLEMENTATION-OPERATIONAL-CONTRACT-V1';

export function projectAdvanceOnlyImplementationSource(source) {
  let projected = String(source ?? '');
  for (const legacy of [
    'docs:implementation:start',
    'docs:implementation:preverify',
    'docs:implementation:finish',
  ]) projected = projected.replaceAll(legacy, 'docs:implementation:advance');
  projected = projected
    .replaceAll('npm run quality:repair', 'INTERNAL_QUALITY_REPAIR_BY_ADVANCE')
    .replaceAll('`quality:repair`', '`INTERNAL_QUALITY_REPAIR_BY_ADVANCE`')
    .replaceAll('quality:repair una vez', 'repair interno exacto por fingerprint dentro de advance')
    .replaceAll(
      'Ejecuta exactamente una vez INTERNAL_QUALITY_REPAIR_BY_ADVANCE antes de registrar IMPLEMENTED.',
      'El coordinador ejecuta internamente repair exacto por fingerprint antes de registrar IMPLEMENTED.',
    )
    .replaceAll(
      'Solo con INTERNAL_QUALITY_REPAIR_BY_ADVANCE PASS y READY_FOR_VALIDATION: SI registra IMPLEMENTED.',
      'Solo con repair interno sellado PASS y READY_FOR_VALIDATION: SI el coordinador registra IMPLEMENTED.',
    );
  // C6_STARTER_INTEGRITY_RECOVERY_GLOBAL_COMMAND_SUPPRESSION
  if (projected.includes('STATE_INTEGRITY_RECOVERY_REQUIRED: TRUE')) {
    projected = projected
      .split('\n')
      .map((line) => (
        line.includes('npm run docs:implementation:advance')
          ? 'MUTATION_SUPPRESSED_UNTIL_STATE_INTEGRITY_RECONCILED'
          : line
      ))
      .join('\n');
  }
  if (projected.includes('ADVANCE_ONLY_OPERATIONAL_PROJECTION_V1')) return projected;
  return [
    'ADVANCE_ONLY_OPERATIONAL_PROJECTION_V1',
    '- Operational contract: VENTO-IMPLEMENTATION-OPERATIONAL-CONTRACT-V1',
    '- Normal mutating entrypoint: docs:implementation:advance',
    '- Direct start/preverify/finish entrypoints: DISABLED',
    '- Candidate repair: INTERNAL_BY_ADVANCE_EXACT_FINGERPRINT',
    '',
    projected,
  ].join('\n');
}

function legacyActionResponseContract(control, sourceContractHash) {
  const physical = control.physical?.active ?? null;
  if (!physical) {
    return [
      'No existe una instancia física activa.',
      'No infieras una instancia desde la tarea documental ni autorices trabajo físico por continuidad.',
    ].join('\n');
  }

  const target = physical.instanceId;
  const recordPath = physical.recordPath ?? instanceRecordRelativePath(target);
  const common = [
    'La primera respuesta material y la entrega final deben comenzar con FORMATO_ENTREGA_VENTO_V1 y conservar exactamente sus ocho secciones.',
    'El operador predeterminado es el usuario humano; el asistente audita y prepara artefactos en solo lectura.',
    'No escribas archivos, no ejecutes validaciones, no hagas commit, push, PR, merge, despliegues ni mutaciones remotas.',
    'Solo AUTORIZO EJECUCION ASISTIDA DEL PASO N autoriza ese único paso numerado.',
    'No uses micro-gates ni pauses por rutina; pausa solo ante FAIL, contradicción real, decisión humana, permiso o credencial no resuelta.',
    'CONTINUATION_POLICY: PASS_CONTINUES_LOCALLY',
    'CHAT_RETURN_POLICY: FAIL_OR_UNRESOLVED_ONLY',
    'FULL_DETERMINISTIC_RUNBOOK_REQUIRED: TRUE',
    'MESSAGE_DELIVERY_CONTRACT: INLINE_VISIBLE_STEPS_ONLY',
    'MESSAGE_MEANS_ASSISTANT_REPLY_BODY: TRUE',
    'RUNBOOK_TERM_MEANS_VISIBLE_MESSAGE_PROCEDURE: TRUE',
    'PROCEDURE_MUST_SURVIVE_ATTACHMENT_REMOVAL: TRUE',
    'FILE_IS_NOT_MESSAGE: TRUE',
    'DOWNLOAD_IS_SUPPLEMENT_ONLY: TRUE',
    'RUNBOOK_FILE_CAN_REPLACE_VISIBLE_PROCEDURE: FALSE',
    'PATCH_FILE_CAN_REPLACE_VISIBLE_PROCEDURE: FALSE',
    'ORCHESTRATOR_FILE_CAN_REPLACE_VISIBLE_PROCEDURE: FALSE',
    'Un MENSAJE significa exclusivamente el cuerpo visible de la respuesta que ChatGPT envia en la conversacion. Un archivo, adjunto, patch, script, runbook o enlace descargable NO es un mensaje y nunca cuenta como sustituto.',
    'La palabra RUNBOOK en este iniciador significa exclusivamente la secuencia de PASOS visible y numerada dentro del cuerpo del mensaje. Nunca significa ni autoriza crear un archivo llamado runbook para sustituir esa secuencia visible.',
    'La frase EN UN SOLO MENSAJE exige que el mapa y todos los PASO 1..N deterministas aparezcan literalmente escritos y numerados en el cuerpo visible de esa misma respuesta.',
    'Cada paso visible debe incluir como minimo: numero, operacion, repositorio o ruta cuando aplique, accion o comando, condicion PASS para continuar y condicion FAIL para detenerse.',
    'Un archivo descargable solo puede acompanar un paso cuando contiene el contenido real de un archivo que debe crearse o reemplazarse. Nunca puede contener la unica copia de las instrucciones operativas.',
    'Un patch puede ser el mecanismo de materializacion de codigo, pero no reemplaza el mensaje: el cuerpo visible debe conservar el paso que lo aplica, donde se aplica, como se valida y que ocurre despues de PASS o FAIL.',
    'Esta prohibido crear un runbook descargable, script orquestador o archivo ejecutable con el proposito de reemplazar la enumeracion visible de pasos de la respuesta.',
    'INVALID_DELIVERY_EXAMPLE: responder solo con descarga runbook.cjs, patch.txt, script o archivo que contenga el procedimiento y omitir los PASOS visibles del mensaje.',
    'VALID_DELIVERY_EXAMPLE: escribir PASO 1, PASO 2, ... PASO N literalmente en la respuesta; cuando un paso necesite un archivo, enlazar ese archivo dentro de ese paso sin ocultar la instruccion.',
    'AUTO_VERIFICATION_BEFORE_SEND: elimina mentalmente todos los enlaces y adjuntos; si al hacerlo el usuario deja de poder ver el procedimiento completo y saber que ejecutar en cada paso, la respuesta es invalida y debe reescribirse antes de enviarse.',
    'La mera existencia futura de un GATE LOCAL PASS/FAIL no constituye un gate conversacional cuando el tramo posterior para PASS ya puede determinarse.',
    'Si un GATE LOCAL produce PASS, continúa inmediatamente con el siguiente paso numerado del mismo runbook sin volver al chat.',
    'Si un GATE LOCAL produce FAIL, detén únicamente la secuencia local, conserva la terminal abierta y devuelve RESULTADO PARA CHATGPT.',
    'Cuando necesites evidencia, el comando debe imprimir un bloque === RESULTADO PARA CHATGPT === ... === FIN RESULTADO PARA CHATGPT === y el usuario devuelve únicamente ese bloque salvo insuficiencia diagnóstica.',
    'Todo bloque manual debe dejar la terminal abierta, usar PowerShell parser-safe y salida operativa ASCII segura.',
    'No repitas lifecycles, validaciones o pasos ya demostrados como PASS.',
    'Durante el carril físico el watcher del checkout físico permanece apagado desde antes de docs:implementation:start hasta READY_TO_RESTART_WATCHER: SI.',
    `La apertura física se realiza exclusivamente con npm run docs:implementation:start -- --instance-id ${target}.`,
    'Después de READY_TO_IMPLEMENT: SI materializa todos los cambios deterministas antes de validar.',
    'Ejecuta exactamente una vez npm run quality:repair antes de registrar IMPLEMENTED.',
    'Solo con quality:repair PASS y READY_FOR_VALIDATION: SI registra IMPLEMENTED.',
    'La batería final contiene exclusivamente validation_commands autorizadas, en su orden contractual, y es fail-fast.',
    'Si existe evidencia remota obligatoria, conserva IMPLEMENTED durante commit/push mínimo de materialización y valida el SHA remoto antes de VERIFIED.',
    `Después de VERIFIED ejecuta exclusivamente npm run docs:implementation:finish -- --instance-id ${target}.`,
  ];

  if (control.primaryAction.type === 'AUTORIZAR_IMPLEMENTACION') {
    return [
      ...common,
      `El registro ${recordPath} debe permanecer PENDING_AUTHORIZATION hasta que el usuario apruebe el alcance exacto.`,
      'La autorización debe declarar instance_id, task_id, status AUTHORIZED, target_repositories, authorized_changes, validation_commands, authorization y evidence: [].',
      'authorization debe declarar decision: APPROVED, approved_by, approved_at, timezone, approval_statement y source_contract_sha256.',
      `source_contract_sha256 debe ser exactamente ${sourceContractHash}.`,
      'evidence permanece [] mientras el estado sea AUTHORIZED.',
      'La misma entrega puede preparar el lote físico completo, condicionado a guardar primero AUTHORIZED y superar docs:implementation:start.',
    ].join('\n');
  }

  if (control.primaryAction.type === 'RESOLVER_BLOQUEO') {
    return [
      ...common,
      `Identifica en solo lectura la causa raíz del bloqueo de ${target}.`,
      'Entrega todos los pasos deterministas dentro del alcance y detente únicamente cuando la condición de salida requiera evidencia nueva.',
    ].join('\n');
  }

  return [
    ...common,
    `Continúa ${target} desde su estado real ${physical.status}; no reinicies automáticamente desde AUTHORIZED si ya existe evidencia de una fase posterior.`,
    'Si la instancia ya está IMPLEMENTED, entra directamente a la batería final; no repitas preflight ni materialización demostrada.',
  ].join('\n');
}

// C6_STARTER_INTEGRITY_RECOVERY_PRESERVES_PROTOCOL
export function actionResponseContract(control, sourceContractHash) {
  const physical = control?.physical?.active ?? null;
  if (physical?.stateIntegrity?.status_valid === false || physical?.stateIntegrityRecoveryRequired === true) {
    const recoveryOverlay = [
      'STATE_INTEGRITY_RECOVERY_REQUIRED: TRUE',
      `Instance: ${physical.instanceId}`,
      `Declared status: ${physical.declaredStatus ?? physical.record?.status ?? physical.status}`,
      `Effective status: ${physical.effectiveStatus ?? physical.status}`,
      `Recovery action: ${physical.recoveryAction ?? physical.stateIntegrity?.recovery_action ?? 'MANUAL_RECONCILIATION_REQUIRED'}`,
      'Mutating command before reconciliation: NONE',
      'Do not run advance until the declared ledger and effective evidence are reconciled.',
      'After reconciliation, resume only through the canonical docs:implementation:advance entrypoint for this instance.',
    ].join('\n');
    const projectedContract = projectAdvanceOnlyImplementationSource(
      legacyActionResponseContract(control, sourceContractHash),
    );
    const recoverySafeContract = projectedContract
      .split('\n')
      .map((line) => (
        line.includes('npm run docs:implementation:advance')
          ? 'MUTATION_SUPPRESSED_UNTIL_STATE_INTEGRITY_RECONCILED'
          : line
      ))
      .join('\n');
    return [recoveryOverlay, '', recoverySafeContract].join('\n');
  }
  return projectAdvanceOnlyImplementationSource(
    legacyActionResponseContract(control, sourceContractHash),
  );
}

function renderImplementationWork({ control, workTopology, templateHash, repositoryRoot }) {
  const physical = control.physical.active;
  if (!physical) {
    return `INTENT_LOCK: PHYSICAL_IMPLEMENTATION
CONVERSATION_LANE: PHYSICAL
DO_NOT_SWITCH_LANES: TRUE
CONTINUATION_POLICY: PASS_CONTINUES_LOCALLY
CHAT_RETURN_POLICY: FAIL_OR_UNRESOLVED_ONLY
FULL_DETERMINISTIC_RUNBOOK_REQUIRED: TRUE
MESSAGE_DELIVERY_CONTRACT: INLINE_VISIBLE_STEPS_ONLY
MESSAGE_MEANS_ASSISTANT_REPLY_BODY: TRUE
RUNBOOK_TERM_MEANS_VISIBLE_MESSAGE_PROCEDURE: TRUE
PROCEDURE_MUST_SURVIVE_ATTACHMENT_REMOVAL: TRUE
FILE_IS_NOT_MESSAGE: TRUE
DOWNLOAD_IS_SUPPLEMENT_ONLY: TRUE
RUNBOOK_FILE_CAN_REPLACE_VISIBLE_PROCEDURE: FALSE
PATCH_FILE_CAN_REPLACE_VISIBLE_PROCEDURE: FALSE
ORCHESTRATOR_FILE_CAN_REPLACE_VISIBLE_PROCEDURE: FALSE

ESTADO

NO EXISTE UNA INSTANCIA FÍSICA ACTIVA.

- Tarea documental actual: ${control.documentary.taskId} — ${control.documentary.taskTitle}
- Esa tarea es solo informativa en este iniciador.
- No derives, autorices ni ejecutes una instancia física por inferencia.
- Para desarrollar documentación usa ${DOCUMENTATION_OUTPUT_PATH}.

TRAZABILIDAD DEL INICIADOR

- Intención: PHYSICAL_IMPLEMENTATION
- Plantilla SHA-256: ${templateHash}
- Fuente de control: docs/plan-canonico/modular/implementation-control.json
`;
  }

  const actionableSet = control.physical.actionableSet ?? [physical];
  const actionableSetLabel = actionableSet.map(({ instanceId, status }) => `${instanceId} — ${status}`).join('; ');

  const task = workTopology.inventory.get(physical.taskId);
  if (!task) throw new Error(`no se encontró ${physical.taskId} en el inventario canónico.`);
  const lifecycle = workTopology.topology.get(task.id);
  const dependencies = workTopology.dependencies.get(task.id);
  if (!lifecycle || !dependencies) throw new Error(`no se resolvió la topología de ${task.id}.`);

  const sourceContractHash = sha256(task.block.replace(/\r\n?/gu, '\n'));
  const recordPath = physical.recordPath ?? instanceRecordRelativePath(physical.instanceId);
  const activeRecordSource = physical.record
    ? JSON.stringify(physical.record, null, 2)
    : 'No existe todavía un registro material para esta instancia.';
  const recorded = control.physical.recordedInstances ?? [];

  return `INTENT_LOCK: PHYSICAL_IMPLEMENTATION
CONVERSATION_LANE: PHYSICAL
DO_NOT_SWITCH_LANES: TRUE
CONTINUATION_POLICY: PASS_CONTINUES_LOCALLY
CHAT_RETURN_POLICY: FAIL_OR_UNRESOLVED_ONLY
FULL_DETERMINISTIC_RUNBOOK_REQUIRED: TRUE
MESSAGE_DELIVERY_CONTRACT: INLINE_VISIBLE_STEPS_ONLY
MESSAGE_MEANS_ASSISTANT_REPLY_BODY: TRUE
RUNBOOK_TERM_MEANS_VISIBLE_MESSAGE_PROCEDURE: TRUE
PROCEDURE_MUST_SURVIVE_ATTACHMENT_REMOVAL: TRUE
FILE_IS_NOT_MESSAGE: TRUE
DOWNLOAD_IS_SUPPLEMENT_ONLY: TRUE
RUNBOOK_FILE_CAN_REPLACE_VISIBLE_PROCEDURE: FALSE
PATCH_FILE_CAN_REPLACE_VISIBLE_PROCEDURE: FALSE
ORCHESTRATOR_FILE_CAN_REPLACE_VISIBLE_PROCEDURE: FALSE

REGLA CRITICA DE CONTINUIDAD CONVERSACIONAL

- Un GATE LOCAL es una comprobacion PASS/FAIL que puede resolverse dentro del runbook ya preparado, como sincronizacion 0/0, readiness, preflight, quality:repair, validation_commands o docs:implementation:finish.
- La mera existencia futura de una comprobacion PASS/FAIL NO constituye un gate conversacional si los pasos posteriores del caso PASS ya son deterministas.
- Si un GATE LOCAL produce PASS, el usuario continua inmediatamente con el siguiente paso numerado del mismo runbook sin responder al chat.
- Si un GATE LOCAL produce FAIL, el usuario detiene solamente la secuencia local, conserva la terminal abierta y devuelve a ChatGPT el bloque RESULTADO PARA CHATGPT.
- Nunca pidas RESULTADO DEL PASO N despues de un PASS cuando el siguiente paso ya era determinable antes de ejecutar ese gate.
- Un GATE CONVERSACIONAL solo existe cuando ocurre realmente un FAIL, falta evidencia para diagnosticarlo, aparece una contradiccion material, o falta una decision humana, credencial, permiso o autorizacion sensible necesaria para construir el siguiente paso.
- Despues de que el usuario autorice el alcance, la siguiente entrega material debe contener EN UN SOLO MENSAJE todo el runbook determinista disponible hasta el cierre fisico mas lejano que pueda prepararse, incluidos los pasos posteriores condicionados a PASS.
- Esta regla prevalece sobre cualquier frase posterior que pudiera interpretarse como una obligacion de pausar antes de ejecutar un GATE LOCAL cuyo tramo PASS ya esta determinado.

REGLA CRÍTICA DE ESTA CONVERSACIÓN

Esta conversación trabaja la instancia física ${physical.instanceId}, que es el puntero determinista de compatibilidad. El control global puede conservar otras instancias físicas independientes en curso.

- La tarea documental actual puede avanzar en otro checkout, pero NO pertenece a esta conversación.
- NO desarrolles la tarea documental actual desde este iniciador.
- NO cambies de instancia física por continuidad documental.
- Si el usuario solicita documentación, debe abrir otra conversación con ${DOCUMENTATION_OUTPUT_PATH}.

ACCIÓN FÍSICA ACTUAL

- Acción: ${control.primaryAction.type}
- Objetivo exacto: ${control.primaryAction.target} — ${control.primaryAction.title}
- Motivo: ${control.primaryAction.why}
- Estado declarado: ${physical.declaredStatus ?? physical.record?.status ?? physical.status}
- Estado efectivo: ${physical.effectiveStatus ?? physical.status}
- Integridad de estado: ${physical.stateIntegrity ? (physical.stateIntegrity.status_valid ? 'VALID' : 'INVALID') : 'N/A'}
- Recovery action: ${physical.recoveryAction ?? physical.stateIntegrity?.recovery_action ?? 'NONE'}
- Instancia del puntero: ${physical.instanceId}
- Conjunto físico gobernado: ${actionableSetLabel}
- Archivo exclusivo de esta instancia: ${recordPath}
- Raíz local exacta del repositorio: ${repositoryRoot}

CONTRATO PROPIETARIO DE LA INSTANCIA

- ID de tarea: ${task.id}
- Título: ${task.title}
- Estado documental del contrato: ${taskState(task)}
- Repositorio propietario: ${metadata(task.block, 'Repositorio propietario')}
- Archivo propietario: docs/plan-canonico/modular/${task.relativePath}
- Ciclo: ${lifecycle.label} (${lifecycle.mode})
- Regla de ejecución: ${lifecycle.executionRule}
- Dependencias para ejecutar: ${dependencies.executionSource ?? lifecycle.executionDependencies}

OPERADOR Y LIFECYCLE FÍSICO

${actionResponseContract(control, sourceContractHash)}

PROTOCOLO FÍSICO COMPLETO RESTAURADO

${IMPLEMENTATION_PROTOCOL}

${DOWNLOAD_CLEANUP_PROTOCOL}

COMANDOS FÍSICOS RESUELTOS PARA ESTA INSTANCIA

- Apertura: npm run docs:implementation:start -- --instance-id ${physical.instanceId}
- Reparación previa a validación: npm run quality:repair
- Batería final: exclusivamente las validation_commands autorizadas listadas en este iniciador, en su orden contractual.
- Cierre después de VERIFIED: npm run docs:implementation:finish -- --instance-id ${physical.instanceId}
- Resultado final esperado del lifecycle: READY_TO_RESTART_WATCHER: SI.

REGISTRO ACTIVO EXACTO

Ruta: ${recordPath}

\`\`\`json
${activeRecordSource}
\`\`\`

ALCANCE FÍSICO DE LA INSTANCIA

Repositorios:
${list(physical.targetRepositories ?? [], 'Ninguno autorizado todavía.')}

Cambios:
${list(physical.authorizedChanges ?? [], 'Ninguno autorizado todavía.')}

Validaciones:
${list(physical.validationCommands ?? [], 'Deben definirse antes de autorizar implementación.')}

HISTORIAL FÍSICO RESUMIDO

- Registros existentes: ${recorded.length}
- VERIFIED: ${countByStatus(recorded, 'VERIFIED')}
- DEFERRED: ${countByStatus(recorded, 'DEFERRED')}
- Instancia activa: ${physical.instanceId} — ${physical.status}
- Política: registros anteriores VERIFIED son inmutables y no se reescriben.

CARRIL DOCUMENTAL — SOLO ESTADO INFORMATIVO

- Tarea actual: ${control.documentary.taskId} — ${control.documentary.taskTitle}
- Estado: ${control.documentary.state}
- Alcance dentro de esta conversación: FUERA DE ALCANCE. NO DESARROLLAR NI REFORMATEAR.

TRAZABILIDAD DEL INICIADOR

- Intención: PHYSICAL_IMPLEMENTATION
- Plantilla SHA-256: ${templateHash}
- Contrato propietario SHA-256: ${sourceContractHash}
- Fuente de control: docs/plan-canonico/modular/implementation-control.json
- Batería física: exclusivamente validation_commands de la instancia
- Apertura: docs:implementation:start
- Reparación previa: quality:repair una vez
- Cierre: docs:implementation:finish después de VERIFIED

${sourceContext(task, workTopology, false)}
`;
}

function readTemplate(repositoryRoot) {
  const templatePath = path.join(repositoryRoot, TEMPLATE_PATH);
  if (!fs.existsSync(templatePath)) throw new Error(`no existe ${TEMPLATE_PATH}.`);
  const template = fs.readFileSync(templatePath, 'utf8').replace(/\r\n?/gu, '\n');
  if (template.split(SLOT).length !== 2) {
    throw new Error(`${TEMPLATE_PATH} debe contener exactamente una ranura ${SLOT}.`);
  }
  return template;
}

function renderFromTemplate(template, currentWork, intent) {
  const documentationOnlyPattern = /<!-- DOCUMENTATION_ONLY:START -->([\s\S]*?)<!-- DOCUMENTATION_ONLY:END -->/u;
  const scopedTemplate = intent === 'DOCUMENTATION'
    ? template.replace(documentationOnlyPattern, '$1')
    : template.replace(documentationOnlyPattern, '');
  const rendered = scopedTemplate.replace(SLOT, currentWork).replace(/\n*$/u, '\n');
  return intent === 'PHYSICAL_IMPLEMENTATION'
    ? projectAdvanceOnlyImplementationSource(rendered)
    : rendered;
}

export function buildChatgptWorkStarter({ root = process.cwd() } = {}) {
  const repositoryRoot = path.resolve(root);
  const template = readTemplate(repositoryRoot);
  const workTopology = resolveTaskWorkTopology({ root: repositoryRoot });
  const control = deriveImplementationControl({ root: repositoryRoot, workTopology });
  const templateHash = sha256(template);

  const selectorSource = renderSelector(control).replace(/\n*$/u, '\n');
  const documentationSource = renderFromTemplate(
    template,
    renderDocumentationWork({ control, workTopology, templateHash, repositoryRoot }),
    'DOCUMENTATION',
  );
  const implementationSource = renderFromTemplate(
    template,
    renderImplementationWork({ control, workTopology, templateHash, repositoryRoot }),
    'PHYSICAL_IMPLEMENTATION',
  );

  return {
    control,
    outputPath: path.join(repositoryRoot, LEGACY_OUTPUT_PATH),
    source: selectorSource,
    documentationOutputPath: path.join(repositoryRoot, DOCUMENTATION_OUTPUT_PATH),
    documentationSource,
    implementationOutputPath: path.join(repositoryRoot, IMPLEMENTATION_OUTPUT_PATH),
    implementationSource,
    outputs: Object.freeze([
      { key: 'selector', relativePath: LEGACY_OUTPUT_PATH, source: selectorSource },
      { key: 'documentation', relativePath: DOCUMENTATION_OUTPUT_PATH, source: documentationSource },
      { key: 'implementation', relativePath: IMPLEMENTATION_OUTPUT_PATH, source: implementationSource },
    ]),
  };
}

export function writeChatgptWorkStarter({ root = process.cwd(), check = false } = {}) {
  const result = buildChatgptWorkStarter({ root });
  const changes = [];

  for (const output of result.outputs) {
    const outputPath = path.join(path.resolve(root), ...output.relativePath.split('/'));
    const current = fs.existsSync(outputPath) ? fs.readFileSync(outputPath, 'utf8') : '';
    const changed = current !== output.source;
    changes.push({ ...output, outputPath, changed });

    if (check && changed && fs.existsSync(outputPath)) {
      throw new Error(`${output.relativePath} está desactualizado; ejecute npm run docs:chatgpt:starter.`);
    }
    if (!check && changed) {
      fs.mkdirSync(path.dirname(outputPath), { recursive: true });
      fs.writeFileSync(outputPath, output.source, 'utf8');
    }
  }

  return {
    ...result,
    changed: changes.some((entry) => entry.changed),
    changes,
  };
}

function main() {
  const unknown = process.argv.slice(2).filter((argument) => argument !== '--check');
  if (unknown.length > 0) throw new Error(`argumentos desconocidos: ${unknown.join(', ')}.`);
  const result = writeChatgptWorkStarter({ check: process.argv.includes('--check') });
  console.log(`OK: iniciadores ChatGPT ${result.changed ? 'actualizados' : 'vigentes'}.`);
  console.log(`DOCUMENTATION: ${DOCUMENTATION_OUTPUT_PATH}`);
  console.log(`PHYSICAL_IMPLEMENTATION: ${IMPLEMENTATION_OUTPUT_PATH}`);
  console.log(`SELECTOR_LEGACY: ${LEGACY_OUTPUT_PATH}`);
}

const isCli = process.argv[1]
  && path.resolve(process.argv[1]) === path.resolve(fileURLToPath(import.meta.url));

if (isCli) {
  try {
    main();
  } catch (error) {
    console.error(`ERROR: ${error instanceof Error ? error.message : String(error)}`);
    process.exit(1);
  }
}
