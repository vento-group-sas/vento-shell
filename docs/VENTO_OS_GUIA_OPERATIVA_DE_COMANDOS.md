# VENTO OS — Guía Operativa de Comandos

> **Propósito:** tener en un solo lugar los comandos que necesitas para trabajar con Vento OS sin depender del chat para recordar el flujo Git, las tareas canónicas, las implementaciones físicas, los cambios transversales, las validaciones y los diagnósticos básicos.
>
> **Repositorio principal:** `vento-group-sas/vento-shell`
>
> **Rama estable:** `main`
>
> **Fecha de esta guía:** 2026-08-25

---

## 1. La regla más importante

En Vento OS existen **cuatro tipos de trabajo** y no deben mezclarse.

| Tipo de trabajo | Rama | Comando principal |
| --- | --- | --- |
| Tarea canónica documental | `task/...` | `docs:task:start` / `docs:task:finish` |
| Implementación física autorizada | `implementation/...` | `docs:implementation:start` / `docs:implementation:finish` |
| Cambio transversal de infraestructura | `infra/...` | `docs:infra:publish` |
| Documentación operativa no canónica | `ops/...` | `docs:ops:publish` |

### Mapa mental

```text
¿Voy a desarrollar una tarea documental actual del Plan Canónico?
|
+-- SI --> docs:task:start
|          trabajo documental
|          APROBADO
|          docs:task:finish
|
+-- NO --> ¿Voy a ejecutar una instancia física ya AUTHORIZED?
           |
           +-- SI --> docs:implementation:start
           |          materialización
           |          validation_commands
           |          VERIFIED
           |          docs:implementation:finish
           |
           +-- NO --> ¿Es una corrección transversal de scripts, CI, GitHub, tooling o política transversal?
                      |
                      +-- SI --> hago los cambios en main sin commit directo
                      |          docs:infra:publish
                      |
                      +-- NO --> ¿Es Markdown operativo directamente en docs/?
                                 |
                                 +-- SI --> hago el cambio en main sin commit directo
                                            docs:ops:publish
```

**Nunca uses una rama de tarea para esconder una implementación física o una corrección transversal.**

**Nunca uses `docs:task:start` para una instancia física.**

**Nunca hagas un commit directo a `main` para saltarte el lifecycle.**

---

# 2. Los seis comandos que debes memorizar

## 2.1 Empezar una tarea canónica documental

```powershell
npm run docs:task:start -- --task-id AUTH-SRV-004
```

Debe encargarse de:

```text
main actualizado
-> preflight documental
-> crear o recuperar task/auth-srv-004
-> publicar la rama
-> comprobar sincronización
-> READY_TO_WORK: SI
```

Solo empiezas trabajo documental cuando termine con:

```text
ESTADO: PASS
READY_TO_WORK: SI
```

---

## 2.2 Cerrar una tarea canónica documental

```powershell
npm run docs:task:finish -- --task-id AUTH-SRV-004
```

Debe encargarse de:

```text
validar tarea APROBADA
-> validar cambios
-> commit
-> push
-> PR
-> checks
-> merge del SHA validado
-> volver a main
-> sincronizar 0/0
-> worktree limpio
-> eliminar ramas
-> NEXT_TASK_ALLOWED: SI
```

El cierre solo es válido cuando termina con:

```text
ESTADO: PASS
MERGE: PASS
SYNC_MAIN: 0/0
WORKTREE: CLEAN
NEXT_TASK_ALLOWED: SI
```

**`APROBADO` no sustituye este cierre Git.**

---

## 2.3 Empezar una implementación física

Ejemplo real de instancia global:

```powershell
npm run docs:implementation:start -- --instance-id SHELL-CON-001::GLOBAL
```

Este comando se usa **solo después de que el registro de instancia esté `AUTHORIZED`**.

Antes de escribir `PENDING_AUTHORIZATION -> AUTHORIZED`, el orden obligatorio es: detener primero el watcher, confirmar `main` limpio/actualizado/sincronizado `0/0`, guardar después `AUTHORIZED` y ejecutar inmediatamente `docs:implementation:start`. Nunca guardes `AUTHORIZED` con el watcher activo, porque el watcher puede reconstruir derivados versionados antes de que el lifecycle físico cree su rama.

Una instancia física puede ejecutarse mucho después de que su tarea documental haya sido aprobada. Por eso el carril físico no obliga a que esa tarea histórica sea la tarea documental actual ni exige reformatearla para poder implementar. La continuidad documental adelantada, el formato histórico del marcador propietario y `active-sequence.json` pendiente de regeneración se tratan como **avisos documentales**, no como bloqueos físicos.

Debe encargarse de:

```text
validar instancia AUTHORIZED
-> comprobar authorization APPROVED
-> comprobar que el único cambio local sea el registro de la instancia
-> verificar main 0/0
-> ejecutar readiness físico de solo lectura antes de crear la rama
-> clasificar continuidad/formato/active-sequence documentales como advisory
-> bloquear únicamente hallazgos físicos reales
-> PRE_BRANCH_READINESS: PASS
-> crear o recuperar implementation/shell-con-001/global
-> publicar upstream
-> cambiar la instancia a IN_PROGRESS
-> ejecutar una sola vez el preflight físico estricto
-> PREFLIGHT: PASS
-> ejecutar docs:plan:build una vez para reconciliar IN_PROGRESS y derivados
-> ejecutar docs:plan:check
-> git diff --check
-> START_DOCS_PLAN_BUILD: PASS_ONCE
-> START_DOCS_PLAN_CHECK: PASS
-> READY_TO_IMPLEMENT: SI
```

Resultado esperado:

```text
ESTADO: PASS
OPERACION: IMPLEMENTATION_START
INSTANCE_ID: SHELL-CON-001::GLOBAL
PRE_BRANCH_READINESS: PASS
INSTANCE_STATUS: IN_PROGRESS
PREFLIGHT: PASS
START_DOCS_PLAN_BUILD: PASS_ONCE
START_DOCS_PLAN_CHECK: PASS
DOCUMENTARY_LANE_FOR_PHYSICAL: ADVISORY_ONLY
READY_TO_IMPLEMENT: SI
```

### Regla crítica

No crees manualmente la rama física con `git switch -c` durante el flujo normal.

No cambies manualmente `AUTHORIZED` a `IN_PROGRESS`: `docs:implementation:start` realiza esa transición.

No ejecutes manualmente `docs:plan:build` después de reemplazar el registro `PENDING_AUTHORIZATION -> AUTHORIZED`: el propio `docs:implementation:start` lo ejecuta en la rama física, después de `IN_PROGRESS`, y deja cabecera y derivados coherentes antes de autorizar código.

No reformatees ni reabras una tarea documental histórica solo para poder ejecutar su instancia física.

---

## 2.4 Cerrar una implementación física

Cuando la instancia ya esté `VERIFIED` y conserve evidencia consolidada:

```powershell
npm run docs:implementation:finish -- --instance-id SHELL-CON-001::GLOBAL
```

Debe encargarse de:

```text
validar instancia VERIFIED
-> comprobar evidence
-> exigir rama implementation/shell-con-001/global
-> ejecutar docs:plan:build una sola vez y de forma convergente
-> docs:plan:check local
-> docs:plan:test local
-> docs:treq:check local
-> docs:treq:test local
-> quality:lint:ratchet local
-> validar paths de implementación
-> git diff --check
-> stage explícito del alcance detectado
-> docs:commit-scope:check --staged
-> commit
-> push
-> PR
-> esperar checks
-> merge del SHA validado
-> volver a main
-> main 0/0
-> worktree limpio
-> eliminar rama local y remota
-> READY_TO_RESTART_WATCHER: SI
```

Resultado esperado:

```text
ESTADO: PASS
OPERACION: IMPLEMENTATION_FINISH
REQUIRED_CHECKS: PASS
MERGE: PASS
SYNC_MAIN: 0/0
WORKTREE: CLEAN
READY_TO_RESTART_WATCHER: SI
```

**El watcher solo se vuelve a encender después de `READY_TO_RESTART_WATCHER: SI`.**

---

## 2.4.1 RESILIENCIA DEL LIFECYCLE Y GATES

Esta sección registra protecciones permanentes del repositorio. No depende de memoria de ChatGPT, de una conversación concreta ni de un operador recordando un workaround.

La autoridad para estas reglas está en el código, los tests, los workflows y los contratos versionados del repositorio. Si una regla de esta sección y el tooling divergen, el cambio se trata como infraestructura transversal y se corrige antes de continuar una nueva implementación física.

| ID | Incidente que debe permanecer imposible | Protección permanente | Evidencia automática |
| --- | --- | --- | --- |
| LC-001 | Una carpeta nueva legítima queda fuera del lifecycle físico. | El scope de una implementación se deriva de `authorized_changes` de su instancia y repositorio, no de una whitelist global de carpetas. | `implementation-branch-lifecycle.test.mjs` prueba rutas como `scripts/supabase/` y documentación raíz autorizada. |
| LC-002 | `docs:plan:build` crea la siguiente instancia y el cierre la confunde con scope ajeno. | Fuera de `authorized_changes` solo se aceptan proyecciones propias del lifecycle y como máximo un registro nuevo con forma exacta `PENDING_AUTHORIZATION`, arrays vacíos, `authorization: null` y `evidence: []`. | El lifecycle valida forma, identidad de ruta y cardinalidad; cualquier segundo borrador derivado falla cerrado. |
| LC-003 | `commit-scope` bloquea una implementación válida porque mezcla categorías genéricas. | Los PR `implementation/*` usan validación instance-aware sobre el rango completo `base..head`. Las categorías genéricas continúan gobernando task/infra/ops, pero no sustituyen el contrato físico. | `commit-scope.test.mjs` y `validate-canonical-plan-workflow.test.mjs`. |
| LC-004 | `gh pr checks --watch` cae por HTTP 499 o error transitorio. | El lifecycle usa polling corto y reintenta HTTP 408/425/429/499/5xx y errores transitorios de red; los fallos reales de checks siguen siendo fail-fast. | `task-branch-lifecycle.test.mjs` clasifica HTTP 499 como RETRY y 403 como ERROR. |
| LC-005 | `finish` falla porque el commit ya existe y el worktree está limpio. | `docs:implementation:finish` conserva `RESUME_POST_COMMIT` y continúa desde el commit existente. | `implementation-branch-lifecycle.test.mjs`. |
| LC-006 | El PR ya fue mergeado pero falló la sincronización o limpieza local. | `docs:implementation:finish` detecta el PR mergeado, verifica HEAD y merge commit en main y termina por `RESUME_POST_MERGE`. | Test estructural y verificación de ancestros Git antes de PASS. |
| LC-007 | Un force-push deja `github.event.before` huérfano y CI responde `Invalid revision range`. | El lifecycle físico no usa force-push. En synchronize no físico, el workflow usa `github.event.before` solo si existe y es ancestro; de lo contrario cae de forma segura a `base..head`. | Workflow test con guard `git cat-file` + `git merge-base --is-ancestor`. |
| LC-008 | Windows y Linux calculan SHA distintos por CRLF/LF o una carpeta nueva vuelve a EOL no gobernado. | Git aplica `* text=auto eol=lf`; el manifiesto de migraciones neutraliza únicamente CRLF de checkout a LF antes de SHA-256 y bytes. | `validate-eol-policy.test.mjs` y prueba `contenido canonico es estable entre checkout CRLF de Windows y LF de CI`. |
| LC-009 | Node en Windows intenta `spawnSync npm.cmd` y retorna EINVAL. | Los lifecycles usan `resolveNpmInvocation`; para scripts Node conocidos se usa `process.execPath`. Está prohibido spawn/spawnSync directo sobre `npm.cmd`. | `task-branch-lifecycle.test.mjs` prueba resolución Windows y ausencia de spawn directo. |
| LC-010 | Un comando inventa un alias npm inexistente al invertir los términos `local` y `sync` del nombre canónico. | `package.json` es autoridad única de nombres. La sincronización local vigente es `docs:plan:local-sync`. Los nombres prohibidos se describen semánticamente y nunca se copian literalmente dentro de la guía. | Starter canónico y tests rechazan aliases inventados; el validador operativo bloquea la presencia del literal prohibido. |
| LC-011 | Se crea un recovery ad hoc y el recovery introduce otro fallo de parser, shell o estado. | El mecanismo normal de recuperación es volver a ejecutar `docs:implementation:finish`. No se crea recovery ad hoc para estados post-commit, post-push, post-PR o post-merge que el lifecycle pueda reanudar. | Starter canónico y esta guía; una carencia de reanudación obliga a corregir el lifecycle mediante `docs:infra:publish`. |
| LC-012 | Una corrección parcial deja el worktree a medias si falla una validación. | Los aplicadores de hardening usados para esta corrección restauran bytes originales ante FAIL; la publicación oficial continúa siendo propiedad de los publishers del repositorio. | El aplicador imprime `ROLLBACK:PASS` en fallo de materialización y el publisher vuelve a validar antes del commit. |
| LC-013 | Un descargable ejecutable contiene sintaxis válida en apariencia pero falla al lanzarse como stdin CommonJS, por ejemplo `return;` a nivel superior con `Illegal return statement`. | Todo materializador TXT ejecutado con `node --input-type=commonjs -` debe pasar primero `docs:delivery-exec:check -- --file <archivo> --mode stdin-commonjs`, que parsea con semántica CommonJS y falla antes de cualquier escritura. | `validate-executable-delivery.test.mjs` reproduce explícitamente `return;` top-level como FAIL y un return dentro de función como PASS. |
| LC-014 | Reglas exclusivas del lifecycle fisico se insertan en la plantilla compartida y contaminan el iniciador documental; `chatgpt-work-starter.test.mjs` falla porque la plantilla comun deja de ser comun. | La plantilla compartida contiene solo reglas comunes; las reglas documentales viven en `DOCUMENTATION_PROTOCOL` y las fisicas en `IMPLEMENTATION_PROTOCOL`. Toda modificacion del generador debe pasar `chatgpt-work-starter.test.mjs` y la suite completa `docs:plan:test` antes de publicar. | `chatgpt-work-starter.test.mjs` protege la ausencia de comandos fisicos en la plantilla comun y `task-branch-lifecycle.test.mjs` verifica que `SCOPE_FISICO = authorized_changes` permanezca dentro de `IMPLEMENTATION_PROTOCOL`. |
| LC-015 | Un repair intenta acomodar su cambio reescribiendo el test contractual que habia detectado el defecto, o devuelve solo `node --test failed` sin el diagnostico concreto. | El test propietario se trata como contrato: primero se corrige la implementacion. Solo se modifica el test cuando cambia deliberadamente el contrato y la razon queda versionada. Los materializadores capturan y devuelven el nombre del paso y el diagnostico exacto del test antes de rollback. | El repair V5 conserva `chatgpt-work-starter.test.mjs`, modifica solo el test transversal agregado por el hardening y exige `docs:plan:test` completo antes de `READY_FOR_INFRA_PUBLISH: SI`. |
| LC-016 | La documentacion de la plantilla compartida repite literalmente el token estructural de la ranura y crea una segunda ranura accidental; el generador deja de poder resolver una unica insercion. | La ranura estructural de trabajo debe existir exactamente una vez. El token reservado de la ranura no se cita literalmente dentro del texto comun y la cardinalidad se valida antes de los tests. | `chatgpt-work-starter.test.mjs` conserva la asercion de cardinalidad y el hardening transversal duplica esa proteccion antes de publicar. |
| LC-017 | Un ejemplo negativo dentro de documentación operativa reproduce literalmente un identificador que el propio validador prohíbe y activa el guard aunque el texto pretendiera explicar un error histórico. | Los identificadores y nombres prohibidos se documentan por significado, patrón o descripción, nunca copiando el literal vetado. La guía candidata se valida con `validateOperationalGuideResilience` antes de declararse lista para publicar. | `task-branch-lifecycle.test.mjs` prueba el rechazo del literal prohibido y `docs:ops:publish` ejecuta el mismo validador sobre el archivo real. |

### Reglas operativas vinculantes

1. Para una instancia física, `authorized_changes` decide escrituras permitidas. `EXECUTE_ONLY` nunca concede escritura.
2. `docs:implementation:finish` es idempotente y reanudable. Ante interrupción, consulta estado real y vuelve a ejecutar el mismo lifecycle; no reconstruyas manualmente commit, push, PR o merge.
3. Nunca uses force-push para conseguir que pase un cierre físico.
4. Nunca sustituyas un fallo de gate por un workaround manual. Si el gate está equivocado, se corrige como infraestructura y se agrega regresión.
5. Las fundaciones PRE_E5 de SUPA-TRANS-015 solo pueden quedar PASS mediante `docs:package:foundation:record`; escribir manualmente `evidence_ref` o usar una cadena libre no constituye evidencia. El productor ejecuta los checks del gate, guarda solo metadatos/digests seguros y materializa evidencia estructurada con integridad SHA-256.
6. Si `CURRENT_EXECUTABLE_WORK` es una foundation o prerrequisito físico, esa acción prevalece sobre cualquier instancia consumidora `PENDING_AUTHORIZATION`; no se autoriza la instancia hasta que el prerrequisito quede PASS.
7. Para llamadas npm desde Node, usa `resolveNpmInvocation`. Para ejecutar un `.mjs` conocido directamente, usa `process.execPath`.
8. Antes de nombrar un script npm, lee `package.json`. El nombre exacto de sincronización local es `docs:plan:local-sync`.
7. El workflow no asume que `github.event.before` siga alcanzable después de reescrituras de historia; debe tener fallback seguro.
8. HTTP 499 y errores de red transitorios se reintentan; un check en FAILURE no se reintenta como si fuera un problema de transporte.
9. CRLF/LF no puede cambiar la identidad persistida de una migración ni exigir habilitar una carpeta nueva en la política EOL.
10. Si una futura implementación necesita una ruta nueva, se autoriza esa ruta en su instancia. No se modifica el lifecycle para “habilitar la carpeta”.
11. Antes de ejecutar un materializador descargable TXT mediante node --input-type=commonjs -, valida el archivo con npm run docs:delivery-exec:check -- --file <archivo> --mode stdin-commonjs. Un Illegal return statement o cualquier error de parser debe detenerse antes de tocar el repositorio.
12. La plantilla compartida contiene solo reglas comunes. Las reglas exclusivas de implementacion pertenecen a IMPLEMENTATION_PROTOCOL y las documentales a DOCUMENTATION_PROTOCOL; nunca se corrige un carril contaminando el otro.
13. Un test contractual propietario no se reescribe para acomodar una implementacion defectuosa. Primero se corrige la implementacion; cualquier cambio deliberado del contrato exige una justificacion versionada.
14. Todo materializador de infraestructura debe devolver el paso fallido y un diagnostico exacto del test antes de rollback; un mensaje generico como node --test failed no es evidencia suficiente.
15. Un ejemplo negativo no debe copiar literalmente un identificador que el validador de la misma guía prohíbe. Describe el patrón o el significado y valida el documento candidato con la función canónica antes de publicarlo.

## 2.5 Publicar un cambio transversal

Ejemplo:

```powershell
npm run docs:infra:publish -- --change-id task-lifecycle-finish-verification
```

Úsalo desde `main` para cambios transversales como:

- scripts de documentación;
- validadores;
- GitHub Actions;
- configuración de calidad;
- package scripts;
- herramientas del lifecycle;
- automatización transversal;
- archivos que el clasificador de infraestructura admita expresamente.

Crea automáticamente una rama:

```text
infra/task-lifecycle-finish-verification
```

Y debe realizar:

```text
validación
-> rama infra
-> commit
-> push
-> PR
-> checks
-> merge
-> main 0/0
-> worktree limpio
-> eliminación de ramas
```

### Importante sobre archivos transversales del Plan

`commit-scope` puede clasificar determinados archivos del Plan como `TRANSVERSAL`, pero `docs:infra:publish` solo puede publicarlos si `classifyInfraPath()` también los admite expresamente.

Si un archivo transversal legítimo es rechazado por `docs:infra:publish`, **no uses `docs:ops:publish`, no lo mezcles con una tarea y no hagas commit directo a `main`**. Primero se corrige el alcance del publisher transversal.

---

## 2.6 Publicar documentación operativa no canónica

```powershell
npm run docs:ops:publish -- --change-id guia-operativa-comandos
```

Úsalo exclusivamente para Markdown operativo ubicado directamente dentro de `docs/`, por ejemplo:

```text
docs/VENTO_OS_GUIA_OPERATIVA_DE_COMANDOS.md
```

Crea automáticamente:

```text
ops/guia-operativa-comandos
```

Y ejecuta:

```text
validación local
-> commit aislado
-> push
-> PR a main
-> checks
-> merge confirmado
-> main 0/0
-> worktree limpio
-> eliminación de ramas
```

No puede publicar:

```text
docs/plan-canonico/...
scripts/...
src/...
packages/...
supabase/...
```

---

# 3. Flujo normal de una tarea documental

## Paso A — Estás en `main`

```powershell
git branch --show-current
git status --short
```

Antes de comenzar una tarea nueva, `main` debe estar limpio.

## Paso B — Inicias la tarea

```powershell
npm run docs:task:start -- --task-id AUTH-SRV-004
```

La rama esperada es:

```text
task/auth-srv-004
```

## Paso C — Trabajas y validas

```powershell
git status --short
git diff
git diff --name-only
git diff --check
```

## Paso D — La tarea queda APROBADA

```powershell
npm run docs:task:finish -- --task-id AUTH-SRV-004
```

No empieces la siguiente hasta recibir:

```text
NEXT_TASK_ALLOWED: SI
```

---

# 4. Flujo normal de una implementación física

## Paso A — Detén el watcher antes de autorizar

El watcher puede crear o mantener el registro de instancia en:

```text
PENDING_AUTHORIZATION
```

Mientras siga `PENDING_AUTHORIZATION`, si el watcher está activo deténlo:

```text
Ctrl+C
```

Desde este punto permanece apagado durante toda la implementación física. No escribas todavía `AUTHORIZED`.

## Paso B — Sincroniza `main` y guarda la autorización

Con el watcher ya apagado, confirma primero en todos los `target_repositories`:

```text
main
fetch ejecutado
pull --ff-only completado
worktree limpio
sincronización 0/0
```

Solo después completa en el registro de instancia:

- `target_repositories`;
- `authorized_changes`;
- `validation_commands`;
- `authorization.decision = APPROVED`;
- evidencia inicialmente vacía;
- `status = AUTHORIZED`.

No ejecutes ningún build manual entre `AUTHORIZED` y `docs:implementation:start`.

## Paso C — Abre la instancia física

Antes de crear cualquier rama de implementación, cada repositorio incluido en `target_repositories` debe quedar en:

```text
main
fetch ejecutado
pull --ff-only completado
worktree limpio
origin/main...HEAD = 0/0
```

Si la instancia afecta varios repositorios, valida todos antes de crear la primera rama. `docs:implementation:start` controla esta condición dentro de `vento-shell`; los demás repositorios afectados se verifican por separado antes de continuar.

Ejemplo:

```powershell
npm run docs:implementation:start -- --instance-id SHELL-CON-001::GLOBAL
```

El comando primero ejecuta readiness de solo lectura mientras la instancia sigue `AUTHORIZED`. La tarea documental actual puede ser otra: continuidad adelantada, formato histórico y `active-sequence.json` pendiente son avisos documentales en este carril. Solo puede crear o recuperar la rama cuando los bloqueos físicos reales estén en cero y termine con:

```text
PRE_BRANCH_READINESS: PASS
```

Después cambia la instancia a `IN_PROGRESS`, ejecuta el preflight físico estricto una sola vez y reconcilia automáticamente el estado documental derivado:

```text
PREFLIGHT: PASS
-> docs:plan:build una vez
-> docs:plan:check
-> git diff --check
```

Solo continúa cuando diga:

```text
START_DOCS_PLAN_BUILD: PASS_ONCE
START_DOCS_PLAN_CHECK: PASS
READY_TO_IMPLEMENT: SI
```

No ejecutes ese `docs:plan:build` manualmente antes del start.

## Paso D — Materializas exclusivamente el alcance autorizado

No amplíes el alcance por inferencia.

No uses una tarea posterior para justificar cambios adelantados.

No ejecutes validadores globales por rutina durante esta fase.

## Paso E — Estado `IMPLEMENTED`

Cuando el cambio físico esté materializado, el mismo registro pasa a:

```text
IMPLEMENTED
```

## Paso F — Ejecutas la batería física final

Ejecuta exclusivamente las `validation_commands` registradas en la instancia, en el orden contractual.

No agregues automáticamente:

```text
docs:plan:build
docs:plan:check
docs:plan:test
docs:treq:check
docs:treq:test
```

salvo que una `validation_command` los exija expresamente.

Si falla la batería:

```text
IMPLEMENTED
-> corregir causa dentro del alcance
-> repetir la batería completa
```

No fragmentes el cierre en micro-gates.

## Paso G — Estado `VERIFIED`

Solo después de PASS completo:

```text
VERIFIED
```

Consolida la evidencia en el registro de la instancia.

## Paso H — Cierre físico oficial

```powershell
npm run docs:implementation:finish -- --instance-id SHELL-CON-001::GLOBAL
```

No ejecutes manualmente `docs:plan:build`, `docs:plan:check`, `docs:plan:test`, `docs:treq:check`, `docs:treq:test` ni `quality:lint:ratchet` como pasos de cierre: `docs:implementation:finish` los administra localmente antes de commit/push. Tampoco hagas manualmente commit, push, PR o merge que este comando ya administra.

Solo después de:

```text
READY_TO_RESTART_WATCHER: SI
```

puedes volver a ejecutar:

```powershell
npm run docs:plan:watch
```

---

# 5. Flujo de un cambio transversal

Este flujo existe para evitar commits directos a `main`.

Ejemplo de cambios:

```text
scripts/docs/task-branch-lifecycle.mjs
scripts/docs/task-branch-lifecycle.test.mjs
package.json
```

No hagas un commit manual directo sobre `main`.

Usa:

```powershell
npm run docs:infra:publish -- --change-id task-lifecycle-finish-verification
```

## Cómo nombrar `change-id`

Buenos ejemplos:

```text
task-lifecycle-finish-verification
implementation-branch-lifecycle
docs-validator-fix
windows-npm-portability
owner-path-resolution
```

Evita:

```text
fix
cambio
prueba
cosas
nuevo
```

## 5.1 Cambios de dos tipos al mismo tiempo

No mezcles scopes incompatibles.

Ejemplo:

```text
cambio transversal
+
docs/VENTO_OS_GUIA_OPERATIVA_DE_COMANDOS.md
```

Secuencia recomendada:

```text
1. apartar temporalmente la guía operativa
2. publicar infraestructura con docs:infra:publish
3. volver a main limpio
4. recuperar la guía
5. publicar guía con docs:ops:publish
```

Comando selectivo:

```powershell
git stash push -u -m "ops-doc-pendiente" -- docs/VENTO_OS_GUIA_OPERATIVA_DE_COMANDOS.md
```

Después:

```powershell
git stash list
git stash pop
npm run docs:ops:publish -- --change-id guia-operativa-comandos
```

---

# 6. Validaciones del Plan Canónico

## Reconstruir artefactos derivados

```powershell
npm run docs:plan:build
```

## Validación estructural

```powershell
npm run docs:plan:check
```

## Tests documentales

```powershell
npm run docs:plan:test
```

## Validar registro TREQ

```powershell
npm run docs:treq:check
```

## Tests TREQ

```powershell
npm run docs:treq:test
```

## Validar alcance staged

```powershell
npm run docs:commit-scope:check -- --staged
```

## Preflight documental

```powershell
npm run docs:task:preflight -- --task-id AUTH-SRV-004 --json
```

## Readiness y preflight físico

`docs:implementation:start` ejecuta automáticamente el gate completo de apertura:

```text
1. readiness de solo lectura con la instancia todavía AUTHORIZED y antes de crear la rama
2. clasificación advisory de continuidad/formato/active-sequence documentales históricos
3. preflight físico estricto después de cambiar a IN_PROGRESS
4. docs:plan:build una vez para reconciliar el nuevo estado físico
5. docs:plan:check y git diff --check antes de permitir código
```

No ejecutes ninguna de esas partes manualmente por rutina. El inicio solo es válido cuando termina con:

```text
PRE_BRANCH_READINESS: PASS
PREFLIGHT: PASS
START_DOCS_PLAN_BUILD: PASS_ONCE
START_DOCS_PLAN_CHECK: PASS
READY_TO_IMPLEMENT: SI
```

El formato de una tarea histórica no se corrige como requisito previo de implementación física. Si su contenido canónico fue aprobado y la instancia está correctamente autorizada, ese formato pertenece al carril documental.

---

# 7. Comandos Git que sí debes conocer

## Rama actual

```powershell
git branch --show-current
```

## Archivos modificados

```powershell
git status --short
```

## Diff

```powershell
git diff
```

## Solo nombres

```powershell
git diff --name-only
```

## Staged

```powershell
git diff --cached
git diff --cached --name-only
```

## Últimos commits

```powershell
git log --oneline -10
```

## HEAD

```powershell
git rev-parse HEAD
```

## Fetch

```powershell
git fetch origin
```

## Sincronización obligatoria de `main` antes de una rama de implementación

```powershell
git switch main
git fetch origin --prune
git pull --ff-only origin main
git status --short
git rev-list --left-right --count origin/main...HEAD
```

Resultado correcto:

```text
worktree sin salida
0    0
```

Esta comprobación se repite en cada repositorio incluido en `target_repositories` antes de crear cualquier rama física.

---

# 8. GitHub CLI — comandos que debes conocer

## Autenticación

```powershell
gh auth status
```

## PR de la rama actual

```powershell
gh pr view
```

## Estado resumido

```powershell
gh pr status
```

## Checks

```powershell
gh pr checks
```

Esperar:

```powershell
gh pr checks --watch --fail-fast --interval 5
```

Si aparece `no checks reported`, puede significar que los workflows todavía no se registraron. Los lifecycle automatizados deben esperar ese registro antes de tratarlo como fallo definitivo.

---

# 9. Trabajar desde otro computador

GitHub es la fuente compartida.

## Continuar una tarea documental

```powershell
npm run docs:task:start -- --task-id AUTH-SRV-004
```

El comando debe recuperar o reutilizar la rama remota existente.

## Continuar una implementación física

Si la instancia sigue en estado compatible con apertura y la rama física existe, el lifecycle puede recuperarla o reutilizarla mediante:

```powershell
npm run docs:implementation:start -- --instance-id SHELL-CON-001::GLOBAL
```

No recrees manualmente `implementation/shell-con-001/global`.

## Regla importante

Esto sí viaja entre computadores:

```text
commit + push
```

Esto no viaja:

```text
cambios sin commit
commit local sin push
```

---

# 10. Si un lifecycle falla

La regla general es:

```text
FAIL
!=
repetir todo desde cero
```

Conserva la rama y el worktree y diagnostica la comprobación concreta.

## `docs:task:start` dice cambios pendientes

```powershell
git status --short
```

No uses `git add -A`.

## `docs:implementation:start` falla

Comprueba especialmente:

- instancia realmente `AUTHORIZED`;
- `authorization.decision = APPROVED`;
- único cambio local = archivo de la instancia;
- `main` 0/0;
- `gh` autenticado.

## `docs:implementation:finish` falla

Comprueba especialmente:

- instancia `VERIFIED`;
- evidencia no vacía;
- rama exacta `implementation/<task>/<instance-key>`;
- paths dentro del alcance automatizable;
- checks del PR;
- mismo SHA validado y mergeado.

## GitHub CLI

```powershell
gh auth status
gh pr status
gh pr checks
```

---

# 11. Comandos de sintaxis y tests para scripts `.mjs`

Lifecycle documental:

```powershell
node --check scripts/docs/task-branch-lifecycle.mjs
node --test scripts/docs/task-branch-lifecycle.test.mjs
```

Lifecycle físico:

```powershell
node --check scripts/docs/implementation-branch-lifecycle.mjs
node --test scripts/docs/implementation-branch-lifecycle.test.mjs
```

---

# 12. Comandos que NO debes usar como rutina

## No hagas commits directos a `main`

Evita:

```powershell
git add .
git commit -m 'cambio'
git push origin main
```

## No abras implementación física con Git manual

Evita como flujo normal:

```powershell
git switch -c implementation/shell-con-001/global
```

Usa:

```powershell
npm run docs:implementation:start -- --instance-id SHELL-CON-001::GLOBAL
```

## Evita `git add -A`

Puede incluir archivos ajenos al alcance.

## No uses `git push --force` como rutina

No forma parte del lifecycle normal.

## No empieces la siguiente tarea desde una rama anterior

Secuencia correcta:

```text
rama actual
-> PR
-> merge
-> main
-> main 0/0
-> siguiente carril
```

---

# 13. Cómo pedir ayuda al propio comando

## Lifecycle documental

```powershell
npm run docs:task:start -- --help
npm run docs:task:finish -- --help
```

## Lifecycle físico

```powershell
npm run docs:implementation:start -- --help
npm run docs:implementation:finish -- --help
```

## Cambios transversales

```powershell
npm run docs:infra:publish -- --help
```

## Documentación operativa

```powershell
npm run docs:ops:publish -- --help
```

---

# 14. Tabla de decisión rápida

| Situación | Qué hacer |
| --- | --- |
| Voy a comenzar una tarea documental actual | `docs:task:start` |
| La tarea documental quedó APROBADA | `docs:task:finish` |
| Una instancia física ya quedó AUTHORIZED | `docs:implementation:start` |
| La instancia física ya quedó VERIFIED | `docs:implementation:finish` |
| Cambié tooling/CI/scripts entre tareas | `docs:infra:publish` |
| Cambié una guía Markdown directamente en `docs/` | `docs:ops:publish` |
| Tengo scopes incompatibles al mismo tiempo | separar con stash selectivo y publicar cada scope con su lifecycle |
| No sé qué archivos están modificados | `git status --short` |
| Quiero ver exactamente qué cambié | `git diff` |
| Quiero verificar plan | `docs:plan:check` |
| Quiero correr tests documentales | `docs:plan:test` |
| Quiero revisar TREQ | `docs:treq:check` + `docs:treq:test` |
| Quiero comprobar PR | `gh pr view` |
| Quiero comprobar checks | `gh pr checks` |
| Quiero saber si main está 0/0 | `git rev-list --left-right --count HEAD...origin/main` |

---

# 15. Las secuencias que debes tener en la cabeza

## Tarea documental

```text
main limpio
   |
   v
docs:task:start
   |
   v
task/<id>
   |
   v
trabajo documental + validación
   |
   v
APROBADO
   |
   v
docs:task:finish
   |
   v
PR + checks + merge
   |
   v
main 0/0 + clean
   |
   v
NEXT_TASK_ALLOWED: SI
```

## Implementación física

```text
PENDING_AUTHORIZATION
   |
   v
AUTHORIZED
   |
   v
docs:implementation:start
   |
   v
implementation/<task>/<instance>
   |
   v
IN_PROGRESS
   |
   v
materialización
   |
   v
IMPLEMENTED
   |
   v
validation_commands
   |
   v
VERIFIED
   |
   v
docs:implementation:finish
   |
   v
PR + checks + merge
   |
   v
main 0/0 + clean
   |
   v
READY_TO_RESTART_WATCHER: SI
```

## Cambio transversal

```text
main
   |
   v
modifico tooling
   |
   v
docs:infra:publish
   |
   v
infra/<change-id>
   |
   v
PR + checks + merge
   |
   v
main 0/0 + clean
```

## Documentación operativa

```text
main
   |
   v
modifico docs/*.md operativo
   |
   v
docs:ops:publish
   |
   v
ops/<change-id>
   |
   v
PR + checks + merge
   |
   v
main 0/0 + clean
```

---

# 16. Ejemplo completo de implementación física

Supón que `SHELL-CON-001::GLOBAL` ya está `AUTHORIZED`.

Primero confirma `main` limpio y `0/0` en todos los repositorios afectados. Después abres el lifecycle:

```powershell
npm run docs:implementation:start -- --instance-id SHELL-CON-001::GLOBAL
```

Después del PASS:

```text
PRE_BRANCH_READINESS: PASS
PREFLIGHT: PASS
START_DOCS_PLAN_BUILD: PASS_ONCE
START_DOCS_PLAN_CHECK: PASS
DOCUMENTARY_LANE_FOR_PHYSICAL: ADVISORY_ONLY
READY_TO_IMPLEMENT: SI
```

materializas únicamente los cambios autorizados. No haces una corrección documental intermedia de la tarea histórica.

Cuando los cambios estén listos:

```text
IMPLEMENTED
-> ejecutar validation_commands
-> PASS
-> VERIFIED
```

Cierras:

```powershell
npm run docs:implementation:finish -- --instance-id SHELL-CON-001::GLOBAL
```

Solo cuando aparezca:

```text
READY_TO_RESTART_WATCHER: SI
```

reactivas:

```powershell
npm run docs:plan:watch
```

---

# 17. Chuleta de emergencia

```text
¿Dónde estoy?
git branch --show-current

¿Qué está cambiado?
git status --short

¿Qué cambió?
git diff

¿Main está sincronizado?
git fetch origin main
git rev-list --left-right --count HEAD...origin/main

¿GitHub funciona?
gh auth status

¿Comienzo tarea documental?
npm run docs:task:start -- --task-id AUTH-SRV-004

¿Cierro tarea documental aprobada?
npm run docs:task:finish -- --task-id AUTH-SRV-004

¿Abro implementación física autorizada?
npm run docs:implementation:start -- --instance-id SHELL-CON-001::GLOBAL

¿Cierro implementación física verificada?
npm run docs:implementation:finish -- --instance-id SHELL-CON-001::GLOBAL

¿Publico corrección transversal?
npm run docs:infra:publish -- --change-id docs-validator-fix

¿Publico guía operativa?
npm run docs:ops:publish -- --change-id guia-operativa-comandos
```

---

# 18. Principios operativos

1. **`main` es la línea estable.**
2. **Una tarea documental = una rama `task/...`.**
3. **Una instancia física = una rama `implementation/...`.**
4. **Un cambio transversal = una rama `infra/...`.**
5. **Un documento operativo = una rama `ops/...`.**
6. **No se trabaja normalmente directo sobre `main`.**
7. **No se usa el lifecycle documental para ejecutar una instancia física.**
8. **Una instancia física requiere autorización explícita antes de abrirse.**
9. **Antes de cualquier rama física, todos los repositorios afectados deben estar en `main`, limpios y `0/0`.**
10. **`docs:implementation:start` debe completar readiness antes de crear o recuperar la rama.**
11. **Una tarea documental histórica no se reformatea ni se reabre como condición para ejecutar una instancia física ya aprobada y autorizada.**
12. **El cambio `AUTHORIZED -> IN_PROGRESS` se reconcilia con un `docs:plan:build` automático dentro de `docs:implementation:start`, nunca manualmente en `main`.**
13. **No se avanza de tarea hasta que el cierre correspondiente lo autorice.**
14. **GitHub, no el chat, es la fuente compartida entre computadores.**
15. **Un FAIL se diagnostica; no se reinicia todo automáticamente.**
16. **No se stagean archivos desconocidos.**
17. **Los checks deben corresponder al mismo SHA que se mergea.**
18. **PASS significa cierre comprobado, no simplemente comando ejecutado.**

---

## Comandos esenciales — versión ultra corta

```powershell
# 1. Empezar tarea documental
npm run docs:task:start -- --task-id AUTH-SRV-004

# 2. Cerrar tarea documental
npm run docs:task:finish -- --task-id AUTH-SRV-004

# 3. Empezar implementación física
npm run docs:implementation:start -- --instance-id SHELL-CON-001::GLOBAL

# 4. Cerrar implementación física
npm run docs:implementation:finish -- --instance-id SHELL-CON-001::GLOBAL

# 5. Publicar cambio transversal
npm run docs:infra:publish -- --change-id docs-validator-fix

# 6. Publicar documentación operativa
npm run docs:ops:publish -- --change-id guia-operativa-comandos

# 7. Ver estado local
git status --short

# 8. Ver rama
git branch --show-current

# 9. Ver cambios
git diff

# 10. Revisar GitHub
gh pr status
```

Si recuerdas estos diez comandos, puedes resolver la mayoría del trabajo diario sin memorizar el resto.

<!-- CURRENT-EXECUTABLE-WORK-CORR-002:START -->
## Implementación lineal: package consumidor y trabajo ejecutable

Antes de autorizar o continuar una implementación por package, consultar el scanner y distinguir:

```text
CURRENT_PACKAGE
≠ necesariamente
CURRENT_EXECUTABLE_WORK
```

Cuando `CURRENT_EXECUTABLE_WORK` sea una fundación o un prerrequisito físico, se resuelve primero esa identidad. El package conserva el turno como consumidor bloqueado y no se inicia, despliega ni cierra por inferencia.

Para Supabase, la secuencia global previa al package es R0 → `MRP015-000` → `MRP015-010` → `MRP015-020` → `MRP015-030` → `MRP015-040`. El candidato `MRP015-050` pertenece al ciclo del package y precede al despliegue remoto.

<!-- CORR-011-HOSTED-PARITY:START -->
### MRP015-040 — paridad hosted obligatoria

`MRP015-040 / RESOURCE_MANIFEST_PASS` no queda PASS solo porque el repositorio pueda construir el manifiesto EXPECTED.

Debe completar las tres evidencias:

```text
MIGRATION_MANIFEST
EXPECTED_RESOURCE_MANIFEST
STAGING_HOSTED_RESOURCE_PARITY
```

La tercera ejecuta la observación remota sobre el STAGING canónico:

```powershell
npm run supabase:drift:remote -- --environment-role staging --project-ref rcrxixmqhrndcervbllp --owner SUPA-TRANS-015 --scope full --strict
```

El proceso Node que ejecuta el controlador requiere `SUPABASE_ACCESS_TOKEN` disponible en su entorno para consultar el Management API. La autenticación persistida por `supabase login` puede estar almacenada en el credential store nativo del sistema y no equivale a exportar esa variable al proceso.

El token se utiliza únicamente para observación soportada y no se imprime, versiona ni incorpora a evidencia.

El baseline hosted pre-E5 incluye:

- los cron operativos AS-IS mediante nombre, schedule y estado activo;
- presencia de claves internas requeridas sin sus valores;
- las demás superficies contractuales ya cubiertas por el controlador full.

Un FAIL de esta evidencia no se sustituye por una reparación manual ad hoc. Primero se identifica la superficie divergente, se resuelve mediante su propietario físico y después se vuelve a registrar `MRP015-040`.

### Validar CORR-011 sin confundirla con la reparación de STAGING

La aceptación del detector se comprueba con las pruebas completas y con los casos específicos `CORR-011_ACCEPTANCE`:

```powershell
node --test scripts/supabase/environment-drift.test.mjs
node --test --test-name-pattern=CORR-011_ACCEPTANCE scripts/supabase/environment-drift.test.mjs
node --test scripts/docs/package-readiness-scanner.test.mjs
```

Estos casos no usan PAT, no contactan Supabase y no modifican recursos remotos. Verifican una comparación sintética compatible, diferencias conocidas, evidencia insuficiente, separación de scopes, ausencia de valores secretos en los escenarios ejercitados y el código de salida real de la salida estructurada.

La validación de aceptación que exigía un PASS hosted de `supabase:drift:remote --scope full --strict` se sustituye explícitamente en el registro abierto de `CORR-011` por la batería `CORR-011_ACCEPTANCE`. El comando original queda preservado en la trazabilidad del registro y permanece como gate de certificación ambiental; no se desactiva ni se convierte un FAIL remoto en PASS.

Para una observación completa que detecta diferencias, el resultado remoto estricto conserva:

```text
ESTADO: FAIL
OBSERVATION_STATUS: PASS
ENVIRONMENT_CERTIFIED: NO
CERTIFICATION: UNAUTHORIZED_DRIFT
```

La prueba negativa puede pasar porque comprueba esa respuesta exacta. El ambiente continúa sin certificarse. Un error de credencial o de lectura no sirve como sustituto de esa prueba.

`docs:package:readiness:check -- --package GAP-PKG-001` verifica consistencia del registro, no autoriza una implementación. Siempre se leen separadamente `IMPLEMENTATION_READY` y las dependencias pendientes. No registrar `MRP015-040`, no marcar `VERIFIED` y no ejecutar `docs:correction:finish` como consecuencia automática de estos tests.

<!-- CORR-011-HOSTED-PARITY:END -->
<!-- CURRENT-EXECUTABLE-WORK-CORR-002:END -->

<!-- MRP015-040-LOCAL-SOURCE-RECOVERY:START -->
## MRP015-040 - Recuperación local de fuentes y configuración

### Alcance aprobado

La aprobación `APROBADO LOTE LOCAL` autoriza exclusivamente incorporar tres fuentes existentes en STAGING, explicitar cuatro valores de `verify_jwt` y registrar su procedencia en esta guía. Base Git: `19038651e798e2a39092fe48e768e52955cddd47`. Propietario: `SUPA-TRANS-015 / MRP015-040`. `DELIV-PKG-015::CORR-011` permanece cerrada e inmutable.

Las fuentes se recuperaron mediante `get_edge_function` en STAGING `rcrxixmqhrndcervbllp`, sin invocar handlers. La disposición `CONSERVAR` de `SUPA-TRANS-013` y la aprobación de este lote gobiernan la incorporación. OBSERVED no autoriza una adopción general ni un despliegue.

| Archivo | Operación | Resultado permitido |
| --- | --- | --- |
| `supabase/functions/delivery-portal/index.ts` | CREATE | Fuente hosted v1, remoto `index.ts`; preservar handler y RPC. |
| `supabase/functions/order-message-notify/index.ts` | CREATE | Fuente hosted v3, remoto `index.ts`; preservar autor y notificación. |
| `supabase/functions/pass-register-push-token/index.ts` | CREATE | Fuente hosted v3, remoto `index.ts`; preservar vinculación al usuario autenticado. |
| `supabase/config.toml` | MODIFY | Añadir solo las cuatro secciones de funciones descritas abajo. |
| `docs/VENTO_OS_GUIA_OPERATIVA_DE_COMANDOS.md` | MODIFY | Este bloque de procedencia, pruebas y límites. |

| Función | Versión hosted | verify_jwt explícito | Frontera preservada |
| --- | ---: | --- | --- |
| `delivery-portal` | 1 | `false` | Token de capacidad validado por RPC; el valor false no elimina esa autoridad. |
| `order-message-notify` | 3 | `true` | Gateway, sesión autenticada y autor de tipo staff. |
| `pass-register-push-token` | 3 | `true` | Gateway y usuario obtenido por `auth.getUser`. |
| `payments-return` | 3 | `false` | Retorno público, no autorización de pago. Source local sin cambios. |

No se modifica ningún otro bloque de config ni el gateway hosted. No se copia el site_url productivo a la configuración local. Declarar payments-return no resuelve su diferencia de source.

### Procedencia e integridad

Se conserva el contenido capturado en UTF-8/LF, sin comentarios añadidos ni refactorizaciones en los handlers. El digest de archivo NO es el digest del bundle.

| Función | Bytes index.ts | SHA-256 del archivo |
| --- | ---: | --- |
| `delivery-portal` | 8543 | `1b77361881e8b85fd7ac3480dc508645a58418160d97260ae60b924d80f8b69e` |
| `order-message-notify` | 5173 | `d6424c252c2deced1ea5ccb15f6afa79cee90895f6b5b51b6f42a8c71c0bcb24` |
| `pass-register-push-token` | 2843 | `530dfc40ea21172005659c0cac7c26bac6f9408b3d07a2354e3e26327c404f92` |

| Función | ezbr_sha256 reportado por STAGING |
| --- | --- |
| `delivery-portal` | `316e21a30709e9b25778313bdf8172aba72ad1d4bd2b26679964279b932934dc` |
| `order-message-notify` | `a9fa8f44d6dae85f530384d8fb6ff5d01b5b44312d646bdd3066a6b43206d214` |
| `pass-register-push-token` | `0411843c25d5f2a5b117280b721cd8686a831bbd1a56997e9a59bb99d2261d26` |

### Dependencias y validación local

Los imports recuperados conservan `jsr:@supabase/functions-js/edge-runtime.d.ts` y `@supabase/supabase-js@2` mediante JSR para notificación/push y npm para el portal. No hay imports relativos nuevos ni valores de credenciales. El rango `@2` es heredado; no se fija ni certifica un lock Deno en este lote.

El portal consume `get_delivery_portal_data_by_token` y `update_delivery_portal_state`; notificación consume `order_messages`, `order_conversations` y `client_push_tokens`; push consume `client_push_tokens`. Encontrar sus nombres en el baseline no equivale a probar permisos o comportamiento remoto.

La preparación usa parseo/transpilación TypeScript y un harness temporal con `Deno.serve`, `Deno.env`, `createClient`, RPC y `fetch` simulados. Los 32 casos comprueban métodos, configuración ausente, rechazo de sesiones, JSON/UUID inválidos, identidad, autor, destinatarios vacíos, respuesta simulada de Expo, rechazo de PIN/token delegado al RPC, HTML y retorno de pagos sin escrituras. Ninguna prueba contacta servicios reales.

Regresiones existentes, sin PAT ni despliegues:

```powershell
node --test scripts/supabase/environment-drift.test.mjs
node --test scripts/docs/package-readiness-scanner.test.mjs
npm run supabase:migrations:manifest:check
npm run docs:correction:check
npm run docs:treq:check
npm test --silent
```

El inventario local pasa de 26 a 29 funciones. Las tres nuevas fuentes solo referencian variables administradas de Supabase; el conjunto no administrado sigue en 28 nombres, cubiertos por el contrato existente. `package-readiness-contract.json` no se modifica.

### Límites de aceptación

- La preparación en Linux con Node v22.16.0 no sustituye la validación en la toolchain fijada. No se ejecutaron Deno check, functions serve, compilador hosted ni ESLint con dependencias del proyecto. Parsear/transpilar no prueba todos los tipos ni resuelve los imports remotos.
- Se conservan los `any` y rangos de dependencias heredados; no se añaden excepciones para ocultarlos ni se cambia lógica de negocio durante la captura.
- Los mocks de portal no demuestran validación real de token, PIN, expiración, concurrencia, RLS o grants. Esa autoridad sigue en los RPC.
- `order-message-notify` conserva `sent` como cuenta de mensajes preparados, no entrega confirmada. Fallos de proveedor, reintentos e idempotencia siguen pendientes de aceptación operativa.
- Probar el usuario obtenido por getUser no certifica propiedad del dispositivo ni todas las colisiones de tokens entre usuarios.
- No se declaran capacidades terminadas, pagos aprobados, proveedores probados ni paridad integral.

### Publicación y continuidad

Este lote no hace commit, push, PR, deploy, migraciones, secretos, datos ni activación de cron. Antes de publicar debe verificarse que las integraciones Git no desplieguen automáticamente. La incorporación local no autoriza producción ni reabre CORR-011.

`MRP015-040` conserva `evidence_ref: null` y sigue NOT_CERTIFIED. No se ejecuta FULL remoto ni se afirma un nuevo total de hallazgos. Las cinco funciones solo locales, las diferencias de fuentes/SQL, proveedores, cron y clave interna mantienen su tratamiento pendiente.

No se crean ni modifican TREQ o fragmentos 04A. Las referencias `TREQ-SUPABASE-259`, `TREQ-SUPABASE-261` y `TREQ-SUPABASE-262` no pasan a cobertura remota por esta captura. `SHELL-CI-020::GAP-PKG-001` conserva su trabajo; `SHELL-CI-021::GAP-PKG-001` no se inicia.
<!-- MRP015-040-LOCAL-SOURCE-RECOVERY:END -->

---

## Precondición de replay hosted en STAGING

### Reconciliación ACL `authenticated` antes de `AUTH-DB-018`

Si `MRP015-020 / HISTORY_PASS` se reanuda sobre el STAGING existente después de que el historial remoto ya alcanzó exactamente `20260828023253_auth_db_016_canonical_schema_foundation`, cualquier diferencia de `authenticated EXECUTE` en funciones `public` debe reconciliarse contra un snapshot canónico del mismo prefijo de siete migraciones antes de reintentar `AUTH-DB-018`.

La reconciliación usa `scripts/supabase/staging-acl-reconciliation.mjs` en modo `authenticated` y conserva estas invariantes:

- destino obligatorio: STAGING canónico `rcrxixmqhrndcervbllp`;
- historial exacto de siete migraciones, con head `20260828023253`;
- solo se permiten `REVOKE EXECUTE ... FROM authenticated` sobre funciones `public` cuya ACL exceda el snapshot canónico;
- el conjunto de reparación válido para este incidente es exactamente `0` o `10` revokes;
- no se crean grants nuevos;
- no se modifica `anon`;
- no se modifican default privileges;
- no se modifica migration history;
- no se modifica estructura, datos, owners, definiciones de función ni objetos fuera del ACL objetivo;
- production queda prohibido por binding;
- una segunda ejecución sobre estado ya reconciliado debe producir `0` revokes.

`AUTH-DB-018` conserva sin cambios su precondición contractual de `83` RPC client-executable y `10` server-only. No se relaja la migración para acomodar drift hosted.

Después de reconciliar y verificar el estado `83 / 10`, continuar con `supabase db push --dry-run`; el dry-run debe mostrar únicamente las migraciones todavía pendientes. Solo después de esa comprobación se reanuda el `db push` de STAGING y se exige `STAGING_HISTORY_DRIFT` en `scope=history`.

En `MRP015-020 / HISTORY_PASS`, `STAGING_HISTORY_DRIFT` exige paridad exacta entre el historial aplicado y el universo versionado del manifiesto. `PRODUCTION_HISTORY_DRIFT`, únicamente cuando se ejecuta en `scope=history`, exige que el historial aplicado de PRODUCTION sea un prefijo canónico no vacío del mismo universo: cada versión remota debe coincidir con las primeras N versiones canónicas. Este check es estrictamente read-only y no autoriza `db push`, `migration repair`, `reset` ni ninguna promoción a PRODUCTION. Todo `scope=full` conserva la exigencia de paridad completa.

No usar `reset`, `migration repair`, edición de migraciones históricas ni mutación de PRODUCTION como mecanismo de recuperación de este caso.

El helper `supabase:hosted-replay:precondition` queda reservado para escenarios de pre-replay limpio sobre STAGING. No ejecuta reset, no modifica el historial y no sustituye `MRP015-020 / HISTORY_PASS`.

La inspección read-only se ejecuta así:

    npm run supabase:hosted-replay:precondition -- inspect --environment-role staging --project-ref rcrxixmqhrndcervbllp --owner SUPA-TRANS-015

El endpoint `/database/query/read-only` ejecuta el snapshot como `supabase_read_only_user`. Ese es el actor de inspección esperado.

La identidad de escritura se valida separadamente dentro de la operación enviada a `/database/query`. Antes de cualquier mutación, el SQL exige `current_user = postgres`.

`apply` solo es elegible en un escenario de pre-replay con:

- historial de migraciones vacío;
- cero relaciones `public` con DML efectivo de `anon`;
- defaults administrados compatibles;
- actor read-only igual a `supabase_read_only_user`;
- target igual al STAGING canónico;
- PRODUCTION excluido.

La invocación autorizada del modo mutador es:

    npm run supabase:hosted-replay:precondition -- apply --environment-role staging --project-ref rcrxixmqhrndcervbllp --owner SUPA-TRANS-015 --acknowledge-mutation DELIV-PKG-015::CORR-007

Para el `MRP015-020` actualmente en curso, STAGING conserva historial canónico existente y la reconciliación ACL ya fue ejecutada y verificada. Por tanto, no se ejecutan reset ni `apply`; el flujo continúa mediante las migraciones pendientes y la paridad final se demuestra con `STAGING_HISTORY_DRIFT`.

Reglas invariables:

- No usar `migration repair` para fabricar historial.
- No repetir la reconciliación ACL ya verificada.
- No ejecutar reset destructivo para satisfacer `MRP015-020`.
- `MRP015-020` conserva paridad exacta de historial.
- `MRP015-030 / CLEAN_REPLAY_PASS` permanece como foundation posterior independiente.
- PRODUCTION no se modifica durante esta corrección.

Al terminar cualquier operación que haya cargado `SUPABASE_ACCESS_TOKEN`:

    Remove-Item Env:SUPABASE_ACCESS_TOKEN -ErrorAction SilentlyContinue
    Set-Clipboard -Value ''
### Recuperación del replay hosted

Antes de cualquier replay hosted sobre STAGING, ejecutar primero la precondición versionada. El helper autentica la Management API únicamente mediante `SUPABASE_ACCESS_TOKEN` cargado de forma temporal en la sesión; el token no se versiona ni debe imprimirse.

En PowerShell, después de copiar el Personal Access Token al portapapeles:

```powershell
$env:SUPABASE_ACCESS_TOKEN = (Get-Clipboard -Raw).Trim()
if ([string]::IsNullOrWhiteSpace($env:SUPABASE_ACCESS_TOKEN)) { throw 'SUPABASE_ACCESS_TOKEN_NOT_SET' }
```

La inspección es de solo lectura y debe apuntar explícitamente al binding canónico de STAGING:

```powershell
npm run supabase:hosted-replay:precondition -- inspect --environment-role staging --project-ref rcrxixmqhrndcervbllp --owner SUPA-TRANS-015
```

Si `APPLY_ALLOWED: NO`, se detiene exclusivamente el replay hosted. Ese resultado
no ordena ni autoriza un reset. `apply` solo corresponde a un destino nuevo y
aislado, antes del baseline, con historial vacío, cero relaciones `public` con
DML de `anon` y defaults administrados de `supabase_admin` compatibles.

En la rama STAGING existente deben preservarse VITAL y los contratos legacy.
`AUTH-DB-019::GLOBAL` conserva `public.employees.id` y su FK hacia `auth.users`;
`SUPA-TRANS-015 / MRP015-005` excluye VITAL de las mutaciones Vento OS. Un reset
general que intente eliminar `vital`, `public.employees`, `pg_cron` o `unaccent`
no cumple este procedimiento. Una autorización genérica de reset no sustituye
la reconciliación explícita de esos límites.

Cuando STAGING ya cumpla esas precondiciones, la única mutación permitida por este helper es:

```powershell
npm run supabase:hosted-replay:precondition -- apply --environment-role staging --project-ref rcrxixmqhrndcervbllp --owner SUPA-TRANS-015 --acknowledge-mutation DELIV-PKG-015::CORR-006
```

Orden obligatorio:

```text
destino nuevo y aislado, autorizado y sin objetos que deban preservarse
-> inspect
-> apply
-> baseline
-> migraciones forward en orden canónico
```

El STAGING parcialmente reproducido no es elegible para `apply`. El helper no
remedia objetos ya recreados. La continuación requiere un procedimiento de
compatibilidad sobre la rama existente que preserve objetos, datos y FKs, o un
destino de ensayo nuevo con identidad aprobada y aislamiento demostrado. Ninguna
de esas alternativas se ejecuta automáticamente al reconciliar la historia.

Esta inelegibilidad bloquea el replay hosted, aunque su prefijo migratorio sea
reconciliable. Son comprobaciones distintas. No adelantar el despliegue a
producción para resolver ninguna de ellas. Un reset de rama que reproduzca
automáticamente el baseline tampoco demuestra que la precondición se ejecutó
antes de él. Ante `out of shared memory`, conservar el log y comprobar objetos,
FKs, extensiones e historial; su presencia posterior no demuestra por sí sola
la reversión de todos los cambios. No aumentar memoria y reintentar un reset
incompatible con la frontera VITAL.

Reglas invariables:

- PRODUCTION está prohibido para este helper.
- No usar `migration repair` para fabricar historial.
- No ejecutar `AUTH-DB-005` manualmente fuera de la cadena de replay.
- No ejecutar `GRANT`/`REVOKE` ad hoc sobre relaciones existentes para acomodar el precondition.
- No usar `apply` sobre un STAGING parcialmente reproducido.
- Después de `apply`, el replay comienza en baseline y continúa por la cadena canónica.

Al terminar la inspección o la mutación autorizada, limpiar el token de la sesión y del portapapeles:

```powershell
Remove-Item Env:SUPABASE_ACCESS_TOKEN -ErrorAction SilentlyContinue
Set-Clipboard -Value ''
```

<!-- CURRENT-EXECUTABLE-WORK-CORR-010:BEGIN -->
## Secuencia física estricta por GAP-PKG

Una vez autorizado el handoff de `SHELL-CI-020::<package_id>`, el package conserva el turno hasta cerrar exactamente esta secuencia:

```text
SHELL-CI-020::<package_id>
→ SHELL-CI-021::<package_id>
→ SHELL-CI-022::<package_id>
→ SHELL-CI-023::<package_id>
→ SHELL-CI-024::<package_id>
→ CLOSED
```

`package_execution` proyecta `CONTINUE_PHYSICAL_LIFECYCLE` sobre una sola instancia exacta. Una instancia futura no puede existir antes de que su predecesora esté `VERIFIED`. Al verificar una etapa, `docs:plan:build` puede materializar únicamente la siguiente como `PENDING_AUTHORIZATION`; nunca la autoriza automáticamente.

El ledger de la instancia actual puede evolucionar como parte del lifecycle sin tener que declararse como cambio funcional. El ledger de otra instancia continúa fuera de alcance, salvo el único borrador `PENDING_AUTHORIZATION` derivado de la etapa siguiente.

Para un GAP-PKG que muta Supabase, `MRP015-000` a `MRP015-040` siguen siendo gates globales previos. `MRP015-050 / CANDIDATE_READY` no es global: pertenece al `SHELL-CI-020::<package_id>` actual y debe registrarse después de materializar el candidato y antes de cualquier despliegue remoto:

```powershell
node scripts/docs/package-readiness-scanner.mjs --record-candidate GAP-PKG-001
```

La evidencia se guarda dentro de `evidence` del ledger `SHELL-CI-020` y queda ligada a `package_id`, `instance_id`, HEAD, `authorized_changes` y hashes de las superficies Supabase materializadas. Si cualquiera de esos elementos cambia, la evidencia queda stale y debe regenerarse antes de cerrar CI020. Nunca contiene secretos ni autoriza producción.
<!-- CURRENT-EXECUTABLE-WORK-CORR-010:END -->
