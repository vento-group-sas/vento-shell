### PUERTA DE READINESS OPERATIVO

Estas tareas diseñan el checklist que `SHELL-CI-021` ejecutará después de
`SHELL-CI-020` y de las tareas aplicables de BLOQUE R. E5 no exige todavía la
evidencia resultante.

#### Regla transversal de aplicabilidad temporal

La existencia de un `READY-GATE-*` en el universo canónico no implica que su evidencia deba existir en la primera comprobación técnica de todos los paquetes. La ejecución por paquete deberá clasificar cada gate mediante un `readiness_profile` trazable:

- `NOW`: obligatorio para la fase que se está intentando completar; un `FAIL` o `BLOQUEADO` sí bloquea esa fase.
- `LATER`: obligatorio en una fase posterior identificada por `target_phase`; genera handoff y evidencia pendiente, pero no bloquea la fase técnica actual.
- `NEVER`: no corresponde al alcance físico aprobado del paquete; se conserva como `NO_APLICA` con justificación reproducible.

Por seguridad, la ausencia de clasificación explícita se interpreta como `NOW`. `LATER` y `NEVER` nunca se infieren solo porque un gate sea incómodo ni por coincidencias de palabras en documentación: requieren una decisión explícita, justificable y persistida. Cuando el alcance cambie, el perfil deberá reevaluarse. La metadata de ejecución (por ejemplo, si una evidencia fue recalculada o reutilizada) no cambia por sí sola la verdad semántica del gate.

### ✅ READY-GATE-001 — Definir criterio y evidencia para confirmar código desplegado en el entorno objetivo

**Estado:** APROBADA
**Tarea anterior:** DELIV-PKG-025 — Aprobar el paquete antes de iniciar implementación física
**Tarea siguiente:** READY-GATE-002 — Definir criterio y evidencia para confirmar migraciones aplicadas y datos validados
**Tipo de tarea:** Documental — definición normativa del criterio de readiness y del expediente mínimo de evidencia para confirmar que el código de un paquete fue desplegado en el entorno objetivo; sin ejecutar despliegues ni producir evidencia posterior al despliegue

#### 1. Propósito

Definir el criterio verificable y el formato mínimo de evidencia que `SHELL-CI-021::<package_id>` deberá ejecutar para confirmar, después de `SHELL-CI-020::<package_id>` y de las tareas de implementación aplicables, que el código previsto para un paquete se encuentra realmente desplegado en el entorno objetivo aprobado y que la revisión desplegada corresponde de forma inequívoca con la revisión esperada.

Esta tarea diseña el gate. No despliega código, no promueve releases, no modifica ambientes, no consulta ni altera datos productivos, no aplica migraciones y no convierte evidencia planificada en evidencia ejecutada.

#### 2. Alcance y frontera del gate

`READY-GATE-001` responde exclusivamente a esta pregunta:

> ¿La revisión de código que debía desplegarse para este paquete puede correlacionarse de manera reproducible con la revisión que está efectivamente desplegada en el entorno objetivo?

El gate se evalúa por `package_id` y, cuando exista una identidad física materializada, por `implementation_unit_id`. Si un paquete requiere más de un repositorio, artefacto o unidad de despliegue, cada elemento obligatorio deberá quedar correlacionado antes de declarar `PASS` para el paquete.

Este gate no sustituye ni anticipa:

- `READY-GATE-002`: migraciones aplicadas y datos validados;
- `READY-GATE-003`: permisos, matrices y dispositivos configurados;
- `READY-GATE-004`: usuarios, roles, sedes, áreas y turnos requeridos;
- `READY-GATE-005`: catálogos y datos maestros mínimos;
- `READY-GATE-006`: integraciones y credenciales del ambiente;
- `READY-GATE-007`: hardware, red, escáneres e impresoras;
- `READY-GATE-008`: procedimientos operativos y contingencias;
- `READY-GATE-009`: capacitación y material de apoyo;
- `READY-GATE-010`: mesa de soporte, responsables y escalamiento;
- `READY-GATE-011`: monitoreo, métricas y alertas;
- `READY-GATE-012`: respaldo y rollback probados;
- `READY-GATE-013`: línea base previa al piloto;
- `READY-GATE-014`: riesgos aceptados y condiciones de suspensión;
- `READY-GATE-015`: autoridad y criterio final de entrada al piloto.

La existencia de una rama, un commit, un build o una URL por sí solos no demuestra que el código correcto esté desplegado en el entorno objetivo.

#### 3. Contrato de correlación del despliegue

Para cada componente de código que el paquete deba desplegar, la ejecución futura del gate deberá poder demostrar una cadena de correlación completa:

`package_id -> implementation_unit_id cuando exista -> repositorio -> revisión esperada -> artefacto o release -> despliegue -> entorno objetivo -> revisión observada`

La cadena es válida únicamente cuando todos los elementos obligatorios son identificables y la revisión desplegada coincide con la revisión esperada.

##### 3.1. Identidad mínima obligatoria

Cada comprobación deberá registrar, cuando aplique:

| Campo                    | Regla                                                                                           |
| ------------------------ | ----------------------------------------------------------------------------------------------- |
| `package_id`             | Identidad canónica exacta del expediente que se está verificando.                               |
| `implementation_unit_id` | Identidad física materializada cuando exista; no se inventa para paquetes que aún no la tengan. |
| `repository`             | Repositorio propietario exacto del código desplegado.                                           |
| `expected_commit_sha`    | Commit inmutable esperado para el despliegue. Una rama o tag sin resolución a commit no basta.  |
| `deployed_commit_sha`    | Commit inmutable observado en el entorno o en la metadata autoritativa del despliegue.          |
| `artifact_id`            | Identidad del build, release, paquete o artefacto desplegado cuando la plataforma la exponga.   |
| `artifact_digest`        | Digest o hash inmutable cuando la plataforma de artefactos lo exponga.                          |
| `target_environment`     | Ambiente objetivo exacto definido para la instancia del paquete.                                |
| `deployment_id`          | Identificador del despliegue, release o ejecución de pipeline que materializó el artefacto.     |
| `deployed_at`            | Momento verificable del despliegue observado.                                                   |
| `deployer_or_pipeline`   | Actor técnico o pipeline que efectuó el despliegue.                                             |
| `deployed_surface`       | Servicio, aplicación, función, sitio o superficie alcanzable que quedó desplegada.              |
| `verification_method`    | Mecanismo reproducible utilizado para correlacionar revisión esperada y revisión desplegada.    |
| `evidence_refs`          | Referencias a la evidencia reproducible sin incluir secretos.                                   |
| `result`                 | Resultado del componente: `PASS`, `FAIL`, `BLOQUEADO` o `NO_APLICA`.                            |
| `blocking_reason`        | Motivo concreto cuando el resultado no sea `PASS`.                                              |

No todos los proveedores exponen los mismos campos. La ausencia de un campo opcional es válida únicamente si la identidad de la revisión desplegada sigue siendo demostrable mediante evidencia equivalente y reproducible. `expected_commit_sha`, `target_environment`, la identidad del despliegue o artefacto y la correlación con la revisión observada no podrán sustituirse por una afirmación manual.

##### 3.2. Métodos de verificación permitidos

La correlación podrá demostrarse mediante uno o varios mecanismos autoritativos, por ejemplo:

- metadata del proveedor de despliegue que vincule release o deployment con commit;
- manifiesto del artefacto generado por CI que vincule digest, build y commit;
- metadata de runtime o endpoint de versión que exponga una revisión inmutable sin revelar secretos;
- registro de release o pipeline que identifique commit, artefacto y ambiente de destino;
- evidencia equivalente emitida por la plataforma propietaria del despliegue.

Cuando se usen varias fuentes, deberán ser coherentes entre sí. Una divergencia entre el commit esperado, el artefacto publicado y la revisión observada produce `FAIL` o `BLOQUEADO` según exista o no evidencia suficiente para determinar el estado real.

#### 4. Reglas de decisión

##### 4.1. Resultado por componente desplegable

| Resultado   | Condición                                                                                                                                                                                     |
| ----------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `PASS`      | La identidad del repositorio, revisión esperada, artefacto o release, despliegue, ambiente objetivo y revisión observada son correlacionables y coinciden.                                    |
| `FAIL`      | Existe evidencia suficiente y demuestra una revisión distinta, un ambiente distinto, un artefacto distinto, una superficie incorrecta o un despliegue no autorizado para esa instancia.       |
| `BLOQUEADO` | Falta evidencia autoritativa, no puede resolverse la identidad física, el entorno no es accesible para verificación, o no puede correlacionarse de forma reproducible la revisión desplegada. |
| `NO_APLICA` | La identidad canónica del paquete demuestra que no existe cambio físico de código que deba desplegarse para esa instancia.                                                                    |

`NO_APLICA` no puede utilizarse para eludir una identidad física pendiente ni para convertir en inexistente un despliegue requerido por el paquete.

##### 4.2. Resultado agregado por paquete

1. Todo componente de código obligatorio del paquete debe estar representado exactamente una vez en la evaluación del gate.
2. Si al menos un componente obtiene `FAIL`, el paquete obtiene `FAIL` en `READY-GATE-001`.
3. Si no existe `FAIL` pero al menos un componente obtiene `BLOQUEADO`, el paquete obtiene `BLOQUEADO`.
4. El paquete obtiene `PASS` únicamente cuando todos los componentes que requieren despliegue obtienen `PASS` y cualquier `NO_APLICA` está respaldado por la identidad canónica del paquete.
5. Un paquete compuesto exclusivamente por controles sin cambio físico directo podrá obtener `NO_APLICA` cuando esa condición esté demostrada por el expediente aprobado y no exista una operación de despliegue propia.
6. Un resultado parcial nunca se redondea a `PASS`.

#### 5. Evidencia aceptable y evidencia insuficiente

##### 5.1. Evidencia mínima aceptable

La ejecución futura de `SHELL-CI-021::<package_id>` deberá conservar evidencia suficiente para que otra persona pueda repetir la correlación y llegar al mismo resultado. Como mínimo deberá existir:

- identificación del paquete y del ambiente objetivo;
- revisión esperada inmutable;
- identidad del despliegue o del artefacto que llegó al ambiente;
- revisión observada o metadata autoritativa que la vincule con el despliegue;
- fecha y origen de la observación;
- método utilizado;
- resultado por componente y resultado agregado;
- referencia a la evidencia sin exponer credenciales, tokens, secretos ni valores sensibles.

##### 5.2. Evidencia insuficiente por sí sola

No constituye prueba suficiente de despliegue correcto:

- que el código exista en el repositorio;
- que un PR haya sido fusionado;
- que una rama apunte al commit esperado;
- que el build o typecheck local haya pasado;
- que CI haya terminado en verde antes del despliegue;
- que exista un artefacto sin demostrar que fue el desplegado;
- que exista una URL o servicio alcanzable sin identidad de revisión;
- una captura de pantalla sin metadata reproducible;
- una afirmación manual de “deploy exitoso”;
- evidencia de `dev`, local, preview o staging cuando el entorno objetivo sea otro;
- el plan de rollout de `DELIV-PKG-019`;
- la decisión estructural de `DELIV-PKG-025`.

#### 6. Manejo de casos bloqueados y especiales

- Los paquetes que conservan identidad física no confirmada no podrán obtener `PASS` hasta que la reapertura trazable correspondiente materialice la identidad necesaria para correlacionar el despliegue.
- Los paquetes AURA que dependan de repositorio, runtime o frontera física aún no confirmados permanecerán `BLOQUEADO` mientras esa identidad no esté resuelta.
- Las dependencias externas gobernadas no podrán presentarse como desplegadas por inferencia; la condición externa y la identidad física deberán estar materializadas antes de evaluar `PASS`.
- Los paquetes TALENTO fuera de la línea actual no podrán obtener `PASS` mientras la línea funcional no esté formalmente activada y exista una identidad de despliegue evaluable.
- Los expedientes `SIN_CAMBIO_FISICO_DIRECTO_CONFIRMADO` no deberán fabricar un `implementation_unit_id`, un commit desplegado ni una operación de release inexistente; su tratamiento será `NO_APLICA` únicamente cuando el expediente lo sustente.

Todo bloqueo deberá conservar el propietario y la condición de salida ya definidos por el expediente del paquete; `READY-GATE-001` no reasigna propietarios ni reabre decisiones de `DELIV-PKG-001..025`.

#### 7. Separación entre planificación y ejecución

`READY-GATE-001` deja aprobado el contrato que deberá ejecutar posteriormente `SHELL-CI-021::<package_id>`.

La secuencia permanece:

`E5-GATE-008::<package_id> -> SHELL-CI-020::<package_id> -> implementación aplicable -> SHELL-CI-021::<package_id> -> SHELL-CI-022::<package_id>`

Durante `SHELL-CI-021::<package_id>` se capturará la evidencia real, se resolverán discrepancias y se emitirá el resultado operativo del gate. Esta tarea no afirma que ningún paquete haya sido desplegado ni que alguno haya superado readiness.

#### Requisitos de prueba derivados

**Resultado:** NO GENERA REQUISITOS DE PRUEBA

**Justificación:** `READY-GATE-001` define un criterio documental de evidencia que operacionaliza obligaciones ya registradas sobre disponibilidad verificable, comandos reproducibles, compatibilidad de artefactos y trazabilidad del ambiente desplegado. No introduce ni modifica comportamiento empresarial, autorización, datos, runtime, contrato de integración, regla de cálculo o transición de estado ejecutable.

**Requisitos existentes consumidos:** `TREQ-SHELL-001`, `TREQ-SHELL-005`, `TREQ-SHELL-006` y `TREQ-SHELL-009`.

**Requisitos TREQ-* creados:** 0
**Requisitos TREQ-* modificados:** 0
**Fragmentos 04A afectados:** 0

#### 8. Criterios de aceptación documental

`READY-GATE-001` queda documentalmente completo cuando:

1. existe una regla explícita para correlacionar paquete, repositorio, revisión esperada, artefacto o release, despliegue, ambiente objetivo y revisión observada;
2. el expediente mínimo de evidencia identifica los campos y referencias necesarios sin exigir secretos;
3. `PASS`, `FAIL`, `BLOQUEADO` y `NO_APLICA` tienen condiciones inequívocas;
4. el resultado agregado impide `PASS` parcial cuando falta un componente obligatorio;
5. la evidencia insuficiente está expresamente diferenciada de la evidencia reproducible;
6. los paquetes con identidad física pendiente, AURA, dependencias externas, TALENTO y controles sin cambio físico conservan sus bloqueos o tratamiento heredado sin inventar despliegues;
7. la ejecución y captura de evidencia real permanecen asignadas a `SHELL-CI-021::<package_id>` después de la implementación correspondiente;
8. no se ejecuta código, despliegue, migración, DDL, DML, backfill, cambio de configuración remota ni modificación de Supabase;
9. no se crean ni modifican requisitos `TREQ-*` ni fragmentos del registro 04A;
10. `READY-GATE-002` permanece reservada y no se anticipa su criterio de migraciones o validación de datos.

#### 9. Continuidad canónica

##### ÚLTIMA TAREA APROBADA
DELIV-PKG-025 — Aprobar el paquete antes de iniciar implementación física

##### TAREA ACTUAL APROBADA
READY-GATE-001 — Definir criterio y evidencia para confirmar código desplegado en el entorno objetivo

##### SIGUIENTE TAREA RESERVADA
READY-GATE-002 — Definir criterio y evidencia para confirmar migraciones aplicadas y datos validados


### ✅ READY-GATE-002 — Definir criterio y evidencia para confirmar migraciones aplicadas y datos validados

**Estado:** APROBADA
**Tarea anterior:** READY-GATE-001 — Definir criterio y evidencia para confirmar código desplegado en el entorno objetivo
**Tarea siguiente:** READY-GATE-003 — Definir criterio y evidencia para confirmar permisos, matrices y dispositivos configurados
**Tipo de tarea:** Documental — definición normativa del criterio de readiness y del expediente mínimo de evidencia para confirmar que las migraciones requeridas por un paquete fueron aplicadas en el entorno objetivo y que los datos afectados quedaron reconciliados y validados; sin ejecutar migraciones, DDL/DML, backfills ni consultas operativas sobre ambientes remotos

#### 1. Propósito

Definir el criterio verificable y el formato mínimo de evidencia que `SHELL-CI-021::<package_id>` deberá ejecutar para confirmar, después de `SHELL-CI-020::<package_id>` y de las tareas aplicables de BLOQUE R, que:

1. el conjunto exacto de migraciones requerido por el paquete fue aplicado en el entorno objetivo correcto;
2. las migraciones aplicadas corresponden a artefactos versionados, atribuibles e inmutables;
3. no existen omisiones, sustituciones silenciosas ni drift no aprobado respecto de la definición esperada;
4. cualquier backfill, transformación o movimiento de datos incluido en el paquete produjo resultados reconciliables con su baseline y sus invariantes;
5. la evidencia posterior permite distinguir con precisión qué se aplicó, qué datos fueron afectados, qué validaciones pasaron, cuáles fallaron y cuáles no aplican.

Esta tarea diseña el gate. No ejecuta `supabase db push`, DDL, DML, backfills, restauraciones, normalizaciones, consultas productivas ni cambios remotos. Tampoco convierte evidencia planificada en evidencia ejecutada.

#### 2. Alcance y frontera del gate

`READY-GATE-002` responde exclusivamente a esta pregunta:

> ¿Las migraciones y transformaciones de datos que el paquete debía materializar fueron aplicadas exactamente en el entorno objetivo y existe evidencia reproducible de que el estado resultante de esquema y datos satisface las validaciones previstas?

El gate se evalúa por `package_id` y por cada unidad de migración, backfill o transformación materializada dentro del paquete.

No sustituye ni anticipa:

- `READY-GATE-001`: correlación del código realmente desplegado;
- `READY-GATE-003`: permisos, matrices y dispositivos configurados;
- `READY-GATE-004`: usuarios, roles, sedes, áreas y turnos requeridos;
- `READY-GATE-005`: catálogos y datos maestros mínimos;
- `READY-GATE-006`: integraciones y credenciales del ambiente;
- `READY-GATE-007`: hardware, red, escáneres e impresoras;
- `READY-GATE-008`: procedimientos operativos y contingencias;
- `READY-GATE-009`: capacitación y material de apoyo;
- `READY-GATE-010`: mesa de soporte, responsables y escalamiento;
- `READY-GATE-011`: monitoreo, métricas y alertas;
- `READY-GATE-012`: respaldo y rollback probados;
- `READY-GATE-013`: línea base previa al piloto;
- `READY-GATE-014`: riesgos aceptados y condiciones de suspensión;
- `READY-GATE-015`: autoridad y criterio final de entrada al piloto.

La existencia de un archivo de migración, una fila en historial, un comando terminado con código cero o una captura del dashboard no demuestra por sí sola que la migración correcta se aplicó en el ambiente correcto ni que los datos resultantes sean válidos.

#### 3. Fuentes vinculantes para determinar aplicabilidad

La ejecución futura del gate deberá derivar el alcance esperado exclusivamente de las decisiones canónicas y del paquete aprobado. Como mínimo deberá reconciliar, cuando apliquen:

- `DELIV-PKG-008` para objetos Supabase afectados;
- `DELIV-PKG-009` para migraciones, DDL/DML, backfills, compatibilidad y retiro legacy previstos;
- `DELIV-PKG-014` y `DELIV-PKG-015` para archivos físicos, dependencias, bloqueos y orden de aplicación;
- `DELIV-PKG-016` para requisitos `TREQ-*`, pruebas, fixtures, comandos y evidencia esperada;
- `DELIV-PKG-019` para ambiente, secuencia de rollout y promoción;
- `DELIV-PKG-020` para rollback técnico, funcional y de datos;
- `DELIV-PKG-023` para criterios de aceptación y manifiesto de evidencia;
- `DELIV-PKG-025` para la decisión final del expediente y la unidad física autorizada;
- `SUPA-TRANS-001..016` y `DATA-NORM-TRANS-001..009` cuando el paquete afecte Supabase o normalización;
- las tareas de BLOQUE R realmente incluidas en el mismo `package_id`.

`READY-GATE-002` no crea una migración nueva ni cambia el alcance de una migración ya definida. Si la ejecución detecta que el conjunto esperado no puede determinarse desde el expediente aprobado, el resultado es `BLOQUEADO` y la discrepancia debe volver a la tarea propietaria exacta del paquete.

#### 4. Clasificación obligatoria de aplicabilidad

Cada paquete deberá caer en una de las siguientes clases, sin usar categorías ambiguas:

| Clase                               | Condición                                                                                                                                 | Evaluación requerida                                                                     |
| ----------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------- |
| `NO_DATABASE_CHANGE`                | El expediente aprobado demuestra que no existe cambio físico de esquema, objeto Supabase, migración, backfill ni transformación de datos. | El gate puede cerrar `NO_APLICA` con evidencia documental del expediente.                |
| `MIGRATION_ONLY`                    | Existe cambio físico versionado sin transformación material de datos existentes.                                                          | Debe validarse identidad, orden, aplicación, drift e integridad estructural.             |
| `MIGRATION_AND_DATA_CHANGE`         | Existen migraciones y además backfill, normalización, recálculo, traslado o transformación de datos existentes.                           | Deben validarse migraciones y reconciliación completa de datos.                          |
| `DATA_CHANGE_WITHOUT_SCHEMA_CHANGE` | Existe backfill o transformación versionada sin cambio de esquema.                                                                        | Debe validarse identidad de la operación, baseline, lotes, reconciliación e invariantes. |

`NO_DATABASE_CHANGE` no puede utilizarse para ocultar una migración pendiente, una modificación manual del remoto, un backfill necesario ni una identidad física sin resolver.

#### 5. Contrato de identidad de migraciones

Para cada migración requerida, la ejecución futura deberá demostrar una cadena de identidad completa:

`package_id -> unidad de migración -> archivo versionado -> checksum o digest -> orden esperado -> ejecución -> entorno objetivo -> registro observado -> estado posterior`

##### 5.1. Campos mínimos por migración

| Campo                       | Regla                                                                                                           |
| --------------------------- | --------------------------------------------------------------------------------------------------------------- |
| `package_id`                | Identidad canónica exacta del expediente evaluado.                                                              |
| `implementation_unit_id`    | Unidad física cuando exista y sea aplicable.                                                                    |
| `migration_id`              | Identidad estable de la migración o unidad de cambio.                                                           |
| `migration_path`            | Ubicación versionada en el repositorio propietario. Toda migración Supabase de VENTO pertenece a `vento-shell`. |
| `migration_digest`          | Hash o digest inmutable del contenido efectivamente evaluado.                                                   |
| `expected_order`            | Posición o dependencia esperada dentro del conjunto del paquete.                                                |
| `target_environment`        | Ambiente exacto contra el cual se evalúa el gate.                                                               |
| `target_project_ref`        | Identidad técnica del proyecto Supabase cuando aplique, sin exponer secretos.                                   |
| `expected_candidate_commit` | Commit que contiene el conjunto autorizado de migraciones.                                                      |
| `observed_migration_record` | Registro autoritativo observado en el historial del entorno.                                                    |
| `observed_applied_at`       | Momento verificable de aplicación cuando la plataforma lo exponga.                                              |
| `execution_id`              | Ejecución de CI, pipeline o procedimiento controlado que aplicó el cambio.                                      |
| `drift_result`              | Resultado de comparar estado esperado y estado observado.                                                       |
| `evidence_refs`             | Referencias reproducibles a logs, reportes, manifiestos o consultas read-only.                                  |
| `result`                    | `PASS`, `FAIL`, `BLOQUEADO` o `NO_APLICA`.                                                                      |
| `blocking_reason`           | Motivo concreto cuando el resultado no sea `PASS`.                                                              |

##### 5.2. Regla especial Supabase

Toda modificación de Supabase perteneciente a VENTO deberá ser reproducible desde `vento-shell`.

Para obtener `PASS`:

1. la migración deberá existir versionada en `vento-shell`;
2. su digest deberá corresponder al candidato autorizado;
3. el historial observado del entorno deberá demostrar que fue aplicada;
4. la secuencia observada deberá ser compatible con el orden aprobado;
5. el estado resultante no podrá contener drift no aprobado respecto del repositorio;
6. cualquier cambio manual detectado en Dashboard, Table Editor, SQL Editor u otra herramienta deberá estar convertido en una migración versionada antes de cerrar el gate.

Un cambio remoto correcto pero no reproducible desde `vento-shell` no puede recibir `PASS`.

#### 6. Reglas de decisión para migraciones

##### 6.1. Resultado por unidad de migración

| Resultado   | Condición                                                                                                                                                                                                                    |
| ----------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `PASS`      | La migración esperada es identificable, está versionada en el repositorio correcto, su digest coincide, fue aplicada en el entorno objetivo, respeta el orden requerido y el estado posterior no presenta drift no aprobado. |
| `FAIL`      | Existe evidencia suficiente de omisión, migración distinta, digest distinto, orden inválido, entorno incorrecto, aplicación fallida, cambio remoto no versionado o drift contrario al estado esperado.                       |
| `BLOQUEADO` | No puede determinarse de forma reproducible el conjunto esperado, la identidad del entorno, el historial aplicado, el digest, el orden o el estado de drift.                                                                 |
| `NO_APLICA` | El expediente aprobado demuestra que la unidad no requiere migración física en esa instancia.                                                                                                                                |

##### 6.2. Reglas adicionales

1. Una migración presente en el repositorio pero ausente del entorno produce `FAIL` cuando el entorno es verificable.
2. Una migración observada en el entorno pero ausente del conjunto autorizado produce `FAIL` hasta que su procedencia y gobierno sean reconciliados.
3. Un mismo identificador con digest diferente entre repositorio y entorno produce `FAIL`.
4. Una secuencia aplicada fuera del orden aprobado produce `FAIL` cuando cambia precondiciones, dependencias o resultado material.
5. Si el historial remoto no es accesible o no permite correlación suficiente, el resultado es `BLOQUEADO`, nunca `PASS` por inferencia.
6. Un comando `db push`, `migrate`, `psql` o equivalente terminado con éxito no sustituye la comprobación del historial y del estado posterior.

#### 7. Contrato de validación de datos

Cuando el paquete incluya backfill, normalización, recálculo, movimiento, deduplicación, corrección, cambio de claves, transformación de relaciones o cualquier otra modificación de datos existentes, la ejecución futura deberá conservar un expediente que permita reconciliar el antes y el después.

##### 7.1. Identidad mínima de una operación de datos

| Campo                     | Regla                                                                  |
| ------------------------- | ---------------------------------------------------------------------- |
| `data_change_id`          | Identidad estable de la operación o lote.                              |
| `package_id`              | Paquete responsable de la transformación.                              |
| `target_environment`      | Ambiente exacto donde se ejecutó.                                      |
| `candidate_commit`        | Commit o versión del algoritmo, SQL o procedimiento aplicado.          |
| `rule_version`            | Versión de la regla de transformación cuando aplique.                  |
| `baseline_ref`            | Referencia al baseline previo utilizado para comparar.                 |
| `source_scope`            | Entidades, tablas, filtros y población elegible.                       |
| `attempted_rows`          | Filas o unidades intentadas.                                           |
| `affected_rows`           | Filas o unidades efectivamente modificadas.                            |
| `skipped_rows`            | Filas excluidas de forma prevista, con causa clasificable.             |
| `failed_rows`             | Filas que no pudieron procesarse correctamente.                        |
| `before_digest_or_counts` | Conteos, checksums o métricas previas suficientes para reconciliación. |
| `after_digest_or_counts`  | Conteos, checksums o métricas posteriores equivalentes.                |
| `reconciliation_result`   | Resultado de la conciliación de la operación.                          |
| `validation_bundle_ref`   | Evidencia reproducible de las validaciones posteriores.                |
| `result`                  | `PASS`, `FAIL`, `BLOQUEADO` o `NO_APLICA`.                             |

##### 7.2. Carriles mínimos de validación post-cambio

La evidencia deberá cubrir los carriles aplicables al cambio, sin reemplazar uno por otro:

1. **Integridad estructural:** constraints, PK, FK, UNIQUE, CHECK, nullability y tipos relevantes permanecen satisfechos.
2. **Reconciliación cuantitativa:** conteos y balances explican de forma determinista entradas, salidas, omitidos y fallidos.
3. **Huérfanos y duplicados:** no aparecen relaciones huérfanas ni duplicados prohibidos como consecuencia del cambio.
4. **Invariantes de negocio:** cantidades, costos, estados, relaciones, identidades y demás reglas protegidas por los `TREQ-*` del paquete conservan el resultado esperado.
5. **Transformación semántica:** normalizaciones o backfills producen exactamente las reglas versionadas y preservan excepciones aprobadas.
6. **Consumidores afectados:** las estructuras o datos producidos siguen siendo compatibles con consumidores incluidos en el paquete.
7. **Idempotencia y reejecución cuando aplique:** una operación diseñada para ser reintentable no duplica efectos ni altera resultados ya correctos.
8. **Drift posterior:** el estado de esquema, objetos y datos de control relevante coincide con el candidato aprobado o con una excepción explícita ya autorizada.

Las pruebas conductuales completas de permisos y RLS permanecen gobernadas por sus tareas y gates propietarios. `READY-GATE-002` solo exige aquí que las migraciones no dejen constraints, políticas, funciones o contratos estructurales en un estado materialmente incompleto cuando dichos objetos formen parte del cambio evaluado.

#### 8. Reglas de decisión para datos

| Resultado   | Condición                                                                                                                                                                                                                  |
| ----------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `PASS`      | Existe baseline suficiente, el alcance de datos está identificado, todos los lotes están contabilizados, las validaciones aplicables pasan y la reconciliación explica el resultado sin pérdidas ni efectos no atribuidos. |
| `FAIL`      | La evidencia demuestra pérdida, corrupción, huérfanos, duplicados prohibidos, filas fallidas no aceptadas, transformación distinta de la regla aprobada, conteos irreconciliables o una invariante crítica incumplida.     |
| `BLOQUEADO` | Falta baseline, no puede determinarse el universo afectado, no existe trazabilidad por lote, la evidencia es incompleta o el acceso autorizado no permite comprobar el resultado.                                          |
| `NO_APLICA` | El expediente demuestra que la instancia no modifica datos existentes.                                                                                                                                                     |

No se permite convertir filas no contabilizadas en `skipped_rows` sin una causa definida y verificable.

#### 9. Resultado agregado por paquete

El resultado de `READY-GATE-002::<package_id>` se calcula de forma estricta:

1. cada migración obligatoria aparece exactamente una vez en la evaluación;
2. cada backfill o transformación obligatoria aparece exactamente una vez;
3. si alguna unidad obtiene `FAIL`, el paquete obtiene `FAIL`;
4. si no existe `FAIL` pero alguna unidad obtiene `BLOQUEADO`, el paquete obtiene `BLOQUEADO`;
5. el paquete obtiene `PASS` únicamente cuando todas las unidades aplicables obtienen `PASS` y cualquier `NO_APLICA` está sustentado por el expediente aprobado;
6. un paquete sin ninguna operación de migración ni cambio de datos puede obtener `NO_APLICA` solo cuando `DELIV-PKG` lo demuestre explícitamente;
7. un resultado parcial, un subconjunto de tablas o una muestra no representativa no se redondean a `PASS`.

#### 10. Evidencia aceptable

La ejecución futura podrá usar evidencia emitida por mecanismos autoritativos y reproducibles, entre ellos:

- historial de migraciones del entorno correlacionado con los archivos versionados;
- digests del conjunto de migraciones y del candidato de código;
- ejecución de CI o pipeline que identifique paquete, commit y ambiente;
- reconstrucción limpia o upgrade controlado cuando forme parte de la prueba del paquete;
- reportes de drift entre el estado esperado y el observado;
- consultas read-only versionadas para constraints, conteos, huérfanos, duplicados e invariantes;
- manifiestos de backfill con lotes, filas intentadas, afectadas, omitidas y fallidas;
- reportes de reconciliación antes/después;
- resultados de pruebas de migración y de base de datos vinculadas a `TREQ-*`;
- referencias a evidencia ambiental aprobada por las autoridades aplicables.

La evidencia deberá registrar fecha, ambiente, origen, método, candidato, resultado y referencias durables. No deberá almacenar credenciales, connection strings, service role, JWT, secretos ni datos sensibles completos.

#### 11. Evidencia insuficiente por sí sola

No constituye prueba suficiente:

- que el archivo SQL exista;
- que el nombre de la migración aparezca en una lista sin correlación de digest;
- que una migración haya pasado en local cuando el gate evalúa staging o producción;
- que `db push` o una pipeline terminen en verde sin postvalidación;
- una captura del dashboard sin identidad reproducible del ambiente y del candidato;
- un conteo posterior sin baseline comparable;
- una muestra manual sin población, regla ni criterio definidos;
- una consulta que solo demuestre que la tabla existe;
- asumir que cero errores de ejecución equivale a datos correctos;
- un cambio manual remoto no materializado en `vento-shell`;
- el plan documental de `DELIV-PKG-009`, `DELIV-PKG-016`, `SUPA-TRANS` o `DATA-NORM-TRANS` sin evidencia de ejecución física.

#### 12. Manejo de casos especiales

##### 12.1. Migraciones destructivas o irreversibles

Una migración destructiva no obtiene `PASS` únicamente porque haya sido aplicada. Debe conservar evidencia de las precondiciones de seguridad y de las validaciones posteriores definidas por el paquete. La demostración completa de backup, restore y rollback pertenece a `READY-GATE-012`; cualquier requisito pendiente de ese gate debe permanecer visible y no puede ocultarse dentro de `READY-GATE-002`.

##### 12.2. Backfills por lotes

Los backfills por lotes deben permitir reconciliar la suma de resultados por lote contra el universo objetivo. Un lote perdido, repetido sin idempotencia o sin estado final atribuible produce `FAIL` o `BLOQUEADO` según la evidencia disponible.

##### 12.3. Escrituras concurrentes

Cuando existan writers activos durante la transición, la evidencia deberá demostrar la estrategia aprobada de compatibilidad, dual-write, congelación, reintento o conciliación. No se presume que una migración consistente en reposo sea válida bajo concurrencia.

##### 12.4. Normalización de datos

Cuando aplique `DATA-NORM-DB`, el gate deberá conservar la trazabilidad definida por `DATA-NORM-TRANS-001..009`: baseline, dry-run, colisiones, lotes reversibles, activación, validación post-backfill, recuperación y expediente por dominio. Una aprobación documental previa no equivale a evidencia operacional.

##### 12.5. Cambios sin migración Supabase

Si un paquete modifica datos de un sistema externo o de una plataforma no propietaria de VENTO, el gate solo evaluará la operación cuando el paquete la incluya expresamente como cambio controlado y exista evidencia autorizada. No se inventarán historiales ni controles equivalentes que el sistema externo no exponga.

#### 13. Separación entre planificación y ejecución

`READY-GATE-002` deja definido el contrato que `SHELL-CI-021::<package_id>` deberá ejecutar después de que `SHELL-CI-020::<package_id>` y las tareas aplicables de BLOQUE R hayan materializado las migraciones y cambios de datos del paquete.

La secuencia permanece:

`E5-GATE-008::<package_id> -> SHELL-CI-020::<package_id> -> BLOQUE R aplicable -> SHELL-CI-021::<package_id> -> SHELL-CI-022::<package_id>`

Durante `SHELL-CI-021::<package_id>` se capturará la evidencia real, se resolverán discrepancias y se emitirá el resultado operativo. Esta tarea no afirma que ninguna migración haya sido aplicada ni que ningún conjunto de datos haya sido validado.

#### Requisitos de prueba derivados

**Resultado:** NO GENERA REQUISITOS DE PRUEBA

**Justificación:** `READY-GATE-002` define el criterio documental de evidencia para obligaciones de migración, reproducibilidad ambiental, validación de datos, drift y rollback que ya están registradas. No introduce una nueva regla empresarial ni un comportamiento ejecutable adicional; operacionaliza requisitos existentes para su ejecución posterior por paquete.

**Requisitos existentes consumidos:** `TREQ-SUPABASE-008`, `TREQ-SHELL-007` y `TREQ-SHELL-009`.

**Requisitos TREQ-* creados:** 0
**Requisitos TREQ-* modificados:** 0
**Fragmentos 04A afectados:** 0

#### 14. Criterios de aceptación documental

`READY-GATE-002` queda documentalmente completo cuando:

1. define cómo determinar el conjunto exacto de migraciones y operaciones de datos esperadas por paquete;
2. exige identidad de archivo versionado, digest, orden, ambiente, ejecución e historial observado para cada migración;
3. establece que toda migración Supabase de VENTO debe ser reproducible desde `vento-shell`;
4. define `PASS`, `FAIL`, `BLOQUEADO` y `NO_APLICA` para migraciones y datos sin ambigüedad;
5. impide `PASS` cuando existe drift no aprobado, cambio remoto no versionado, migración faltante o digest divergente;
6. exige baseline, contabilización por lote y reconciliación antes/después para cambios de datos;
7. cubre integridad estructural, huérfanos, duplicados, invariantes, transformación semántica, consumidores, idempotencia y drift posterior cuando apliquen;
8. diferencia evidencia reproducible de señales insuficientes como archivo existente, pipeline verde o screenshot;
9. mantiene el backup/restore/rollback probado en `READY-GATE-012` y no invade `READY-GATE-003` ni gates posteriores;
10. mantiene ejecución y captura de evidencia real en `SHELL-CI-021::<package_id>` después de `SHELL-CI-020` y BLOQUE R;
11. no ejecuta DDL, DML, backfills, migraciones, consultas productivas ni modificaciones de Supabase;
12. no crea ni modifica requisitos `TREQ-*` ni fragmentos del registro 04A;
13. `READY-GATE-003` permanece reservada y no se anticipa su criterio.

#### 15. Continuidad canónica

##### ÚLTIMA TAREA APROBADA
READY-GATE-001 — Definir criterio y evidencia para confirmar código desplegado en el entorno objetivo

##### TAREA ACTUAL APROBADA
READY-GATE-002 — Definir criterio y evidencia para confirmar migraciones aplicadas y datos validados

##### SIGUIENTE TAREA RESERVADA
READY-GATE-003 — Definir criterio y evidencia para confirmar permisos, matrices y dispositivos configurados


### ✅ READY-GATE-003 — Definir criterio y evidencia para confirmar permisos, matrices y dispositivos configurados

**Estado:** APROBADA
**Tarea anterior:** READY-GATE-002 — Definir criterio y evidencia para confirmar migraciones aplicadas y datos validados
**Tarea siguiente:** READY-GATE-004 — Definir criterio y evidencia para confirmar usuarios, roles, sedes, áreas y turnos requeridos
**Tipo de tarea:** Documental — definición normativa del criterio de readiness y del expediente mínimo de evidencia para confirmar que permisos, matrices de autorización y configuración de dispositivos aplicables a un paquete quedaron materializados conforme a sus contratos canónicos; sin conceder permisos, asignar actores, configurar equipos, ejecutar migraciones, DDL/DML, RLS, RPC ni cambios remotos

#### 1. Propósito

Definir el criterio verificable y el formato mínimo de evidencia que `SHELL-CI-021::<package_id>` deberá ejecutar para confirmar, después de `SHELL-CI-020::<package_id>` y de las tareas de implementación aplicables, que el entorno objetivo conserva exactamente la configuración de autorización y de dispositivos requerida por el paquete, sin ampliaciones silenciosas, valores implícitos ni fuentes paralelas de autoridad.

`READY-GATE-003` responde a esta pregunta:

> ¿Los permisos, las matrices y los límites configurados de los dispositivos que el paquete necesita pueden reconstruirse desde fuentes canónicas versionadas, compararse con el estado observado del entorno y demostrar que restringen —sin conceder por sí solos— exactamente lo aprobado?

Esta tarea diseña el gate. No crea ni concede permisos, no asigna usuarios o roles, no modifica matrices, no enrola ni configura físicamente dispositivos, no cambia RLS o RPC, no ejecuta migraciones y no produce evidencia operacional posterior al despliegue.

#### 2. Alcance y frontera del gate

La evaluación se realiza por `package_id` y separa tres planos que deben permanecer independientes:

1. **catálogo y configuración de permisos:** identidad exacta, versión, vigencia, modalidad, alcance, contexto y contrato de recurso aplicables;
2. **matrices y datasets de autorización:** carril base, carril operativo, componentes, overrides o denegaciones aplicables y sus invariantes de segregación;
3. **configuración de dispositivo compartido:** identidad registral cuando exista, versión de plantilla, sede y área como límites del dispositivo, aplicaciones efectivas y techo máximo de permisos.

Un `PASS` en un plano nunca compensa un `FAIL` o `BLOQUEADO` en otro.

Este gate no sustituye ni anticipa:

- `READY-GATE-001`: correlación del código realmente desplegado;
- `READY-GATE-002`: migraciones aplicadas, drift y validación de datos;
- `READY-GATE-004`: existencia y preparación de usuarios, roles, sedes, áreas y turnos requeridos;
- `READY-GATE-005`: catálogos y datos maestros mínimos;
- `READY-GATE-006`: integraciones y credenciales del ambiente;
- `READY-GATE-007`: hardware, red, escáneres e impresoras;
- `READY-GATE-008` a `READY-GATE-015`: procedimientos, capacitación, soporte, observabilidad, rollback, baseline, riesgos y autorización final de piloto.

`READY-GATE-003` puede comprobar que una política de dispositivo referencia una sede o un área canónicas y que su configuración es restrictiva; no certifica que el actor, el turno, el check-in o la dotación física requeridos existan. Esa preparación permanece en sus gates propietarios.

#### 3. Fuentes vinculantes para determinar el estado esperado

La ejecución futura deberá derivar el estado esperado exclusivamente de artefactos aprobados y del expediente del paquete. Cuando apliquen, deberá reconciliar:

- el catálogo canónico de permisos y sus decisiones de vigencia;
- las matrices base, operativas, componentes y overrides aprobados;
- los contratos de dispositivo compartido `AUTH-DEV-001` a `AUTH-DEV-006`;
- la identidad, sede, área, aplicaciones y techo de permisos que el paquete haya incluido para cada dispositivo o plantilla afectada;
- `DELIV-PKG-012` para permiso, modalidad, alcance, contexto y recurso;
- `DELIV-PKG-014` y `DELIV-PKG-015` para artefactos físicos, dependencias y orden;
- `DELIV-PKG-016` para requisitos de prueba, fixtures, comandos y resultados esperados;
- `DELIV-PKG-018` cuando la configuración utilice flags o parámetros controlados;
- `DELIV-PKG-023` para criterios de aceptación y evidencia;
- `DELIV-PKG-025` para la decisión final del expediente;
- las tareas de implementación realmente incluidas en el mismo `package_id`.

Una configuración observada no se vuelve canónica por existir en el entorno. Si no puede trazarse hasta un contrato aprobado y una versión identificable, el resultado será `FAIL` o `BLOQUEADO` según exista evidencia suficiente para demostrar la divergencia.

#### 4. Baseline contractual vigente que este gate debe preservar

El baseline vigente al definir `READY-GATE-003` conserva las siguientes invariantes documentales. Una versión posterior solo podrá reemplazarlas cuando exista una decisión canónica aprobada, identificable y trazada por el paquete; el gate no las modifica por inferencia.

##### 4.1. Catálogo y matrices de autorización

| Artefacto        | Versión vigente de referencia                       | Invariantes documentales                                                                    |
| ---------------- | --------------------------------------------------- | ------------------------------------------------------------------------------------------- |
| Catálogo         | `vento.authorization@1.0.0`                         | claves exactas; sin permisos inferidos por rol, prefijo, ruta o dispositivo                 |
| Matriz base      | `vento.authorization.base-role-grants@1.0.0`        | 499 concesiones lógicas; 7 roles base; 463 concesiones directas y 36 componentes            |
| Matriz operativa | `vento.authorization.operational-role-grants@1.0.0` | 240 concesiones lógicas; 12 roles operativos; 218 concesiones directas y 22 componentes     |
| Overrides        | `vento.authorization.individual-overrides@1.0.0`    | seed vigente con 0 registros; una futura excepción no puede aparecer sin decisión explícita |

Digests contractuales vigentes:

- catálogo: `sha256:687e1bc19c0cf7332e76ed940cf5a23b829492ebbee399af718fd326cf473cbe`;
- matriz base: `sha256:bcea5460dfea42ecd2491a550bfe511478faa5403d766166c9e731cb499214e1`;
- matriz operativa: `sha256:3e28cb780c346fbc5cf583fe9cf20d1a88333c4fd459fc233380d9e627c6f94f`;
- overrides: `sha256:ea72b513c482f9a6018ff6e7deb11c20ef986faf15f47cd78f71ddb1230aaf10`.

El baseline contractual ya prohíbe wildcards, `null` con semántica global, dispositivos como sujetos de concesión, claves legacy o retiradas dentro de la matriz operativa y la combinación de componentes de actores distintos.

##### 4.2. Contrato vigente de dispositivos compartidos

El baseline documental de dispositivo conserva:

| Invariante                                              | Valor vigente |
| ------------------------------------------------------- | ------------: |
| Claves del inventario                                   |            19 |
| Instancias configuradas auditadas                       |             2 |
| Observaciones físicas sin vínculo inequívoco            |             2 |
| Plantillas objetivo                                     |            14 |
| Plantillas legacy retiradas                             |             1 |
| Códigos canónicos de aplicación usados por plantillas   |             7 |
| Asociaciones máximas plantilla–aplicación               |            43 |
| Paquetes exactos versionados de permisos de dispositivo |             9 |
| Membresías internas de esos paquetes                    |           177 |
| Claves únicas presentes en al menos un paquete          |            83 |
| Asociaciones máximas plantilla–permiso                  |           266 |
| Asociaciones `STANDARD`                                 |           229 |
| Asociaciones `STRONG`                                   |            37 |
| Claves `NOT_ALLOWED` admitidas por una plantilla        |             0 |
| Permisos concedidos por el dispositivo                  |             0 |
| Wildcards de dispositivo permitidos                     |             0 |

Las dos instancias registrales conocidas —`CAJA_VENTO_CAFE_01` y `KIOSCO_BODEGA_CP`— permanecen como configuración candidata no equivalente por sí sola a verificación física u operacional. Las observaciones físicas sin enrolamiento no pueden tratarse como dispositivos configurados.

#### 5. Clasificación de aplicabilidad por paquete

Cada paquete deberá clasificar cada plano mediante una decisión explícita:

| Plano        | `APLICA`                                                                                                                                      | `NO_APLICA`                                                                                                               |
| ------------ | --------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------- |
| Permisos     | El paquete consume, crea, reemplaza, retira o depende de claves de permiso o de su contrato de modalidad, alcance, contexto o recurso.        | El expediente demuestra que el resultado del paquete no depende de autorización empresarial ni modifica su configuración. |
| Matrices     | El paquete depende de decisiones de rol, carril base u operativo, componentes, overrides o denegaciones materializadas.                       | El expediente demuestra que ninguna decisión matricial participa en su comportamiento.                                    |
| Dispositivos | El paquete se ejecuta o puede ejecutarse desde dispositivo compartido, modifica su configuración o depende de límites de plantilla/instancia. | El expediente demuestra que no existe dependencia de dispositivo compartido para el alcance evaluado.                     |

El silencio, un campo ausente o la falta de una instancia física no equivalen a `NO_APLICA`.

Un paquete puede requerir verificar una configuración aunque no la haya modificado. Si una capacidad depende del catálogo, de una matriz o de una política de dispositivo ya existente, el gate deberá comprobar que la versión necesaria continúa vigente en el entorno objetivo.

#### 6. Contrato de evidencia del plano de permisos

Para cada permiso o conjunto contractual requerido por el paquete, la ejecución futura deberá conservar:

| Campo                        | Regla                                                                                        |
| ---------------------------- | -------------------------------------------------------------------------------------------- |
| `package_id`                 | Paquete exacto evaluado.                                                                     |
| `permission_key`             | Clave canónica exacta; no se aceptan prefijos ni patrones.                                   |
| `expected_catalog_id`        | Identidad del catálogo aprobado.                                                             |
| `expected_catalog_version`   | Versión que el paquete declara como compatible.                                              |
| `expected_catalog_digest`    | Digest contractual o del artefacto materializado que corresponde a la versión esperada.      |
| `expected_permission_state`  | Estado esperado de la clave: activa, retirada, reemplazada o condición equivalente aprobada. |
| `expected_modality`          | Modalidad aprobada cuando sea relevante.                                                     |
| `expected_scope_contract`    | Alcance o perfil de alcance exigido por el paquete.                                          |
| `expected_context_contract`  | Dimensiones contextuales obligatorias.                                                       |
| `expected_resource_contract` | Contrato de recurso que delimita la acción.                                                  |
| `observed_configuration_ref` | Fuente autoritativa read-only del estado observado.                                          |
| `observed_catalog_version`   | Versión efectiva observada.                                                                  |
| `observed_catalog_digest`    | Digest reproducible del estado observado cuando aplique.                                     |
| `result`                     | `PASS`, `FAIL`, `BLOQUEADO` o `NO_APLICA`.                                                   |
| `blocking_reason`            | Motivo concreto cuando no exista `PASS`.                                                     |
| `evidence_refs`              | Referencias durables sin secretos.                                                           |

Reglas obligatorias:

1. una clave inexistente o distinta de la esperada produce `FAIL` cuando el estado observado es verificable;
2. una clave retirada no puede reaparecer mediante alias, prefijo o equivalencia amplia;
3. `<app>.access` no implica acceso a capacidades internas;
4. una clave no obtiene alcance global por `null`, omisión o error de resolución;
5. modalidad, alcance, contexto y recurso no pueden sustituirse por nombre de rol;
6. una versión nueva del catálogo no se adopta automáticamente: debe existir compatibilidad y trazabilidad aprobadas para el paquete.

#### 7. Contrato de evidencia del plano de matrices

Para cada dataset o matriz aplicable deberá registrarse como mínimo:

| Campo                       | Regla                                                                                         |
| --------------------------- | --------------------------------------------------------------------------------------------- |
| `matrix_id`                 | Identidad canónica del dataset o matriz.                                                      |
| `matrix_version`            | Versión esperada por el paquete.                                                              |
| `expected_digest`           | Digest contractual o del artefacto materializado.                                             |
| `observed_digest`           | Digest reproducible del estado observado.                                                     |
| `lane`                      | `BASE`, `OPERATIONAL`, `OVERRIDE` o categoría canónica equivalente.                           |
| `expected_rows`             | Cantidad esperada para la versión evaluada.                                                   |
| `observed_rows`             | Cantidad observada.                                                                           |
| `unique_identity_result`    | Resultado de unicidad de la clave lógica de cada fila.                                        |
| `catalog_resolution_result` | Toda clave de permiso resuelve contra el catálogo esperado.                                   |
| `role_resolution_result`    | Todo rol o identidad de matriz resuelve contra su catálogo propietario.                       |
| `scope_result`              | No existen wildcards ni globalidad implícita.                                                 |
| `component_result`          | Los componentes múltiples conservan mismo actor, permiso, recurso y solicitud cuando aplique. |
| `segregation_result`        | No existe ampliación incompatible con las decisiones de segregación vigentes.                 |
| `override_result`           | Toda excepción o denegación observada tiene identidad, vigencia y fundamento aprobado.        |
| `result`                    | `PASS`, `FAIL`, `BLOQUEADO` o `NO_APLICA`.                                                    |
| `evidence_refs`             | Referencias durables a manifiestos, consultas read-only o reportes reproducibles.             |

##### 7.1. Invariantes obligatorias de matriz

El gate deberá fallar cuando el estado observado muestre cualquiera de estas condiciones sin una decisión canónica posterior que la reemplace:

- wildcard de rol, permiso, recurso, sede o área;
- `null` interpretado como acceso global;
- clave de permiso fuera del catálogo activo o versión esperada;
- clave legacy o retirada incorporada como concesión vigente;
- dispositivo o principal técnico usado como beneficiario de una concesión empresarial;
- rol operativo tratado como autoridad global;
- matriz base consumida como matriz operativa por coincidencia nominal;
- `<app>.access` convertido en todas las capacidades de la aplicación;
- componentes `BASE_AND_OPERATIONAL` combinados desde actores o recursos diferentes;
- override activo sin identidad, vigencia, alcance, propietario y fundamento trazables;
- diferencia no explicada de conteo o digest respecto de la versión esperada.

#### 8. Contrato de evidencia del plano de dispositivos

La comprobación de dispositivo se realiza sobre la configuración lógica y registral requerida por el paquete. No convierte por sí misma esa evidencia en certificación de hardware, red, periféricos o presencia física.

Para cada instancia o plantilla aplicable se registrará:

| Campo                              | Regla                                                                                            |
| ---------------------------------- | ------------------------------------------------------------------------------------------------ |
| `inventory_key`                    | Clave canónica del inventario cuando la identidad provenga del baseline de dispositivo.          |
| `device_id`                        | Identidad empresarial de instancia cuando exista; no se inventa para observaciones o plantillas. |
| `device_code`                      | Código estable cuando exista.                                                                    |
| `identity_assurance_state`         | Estado de aseguramiento observado; una fila registral no se promueve por inferencia.             |
| `template_code`                    | Plantilla exacta aplicable.                                                                      |
| `template_version`                 | Versión exacta que fija los límites de configuración.                                            |
| `site_binding_ref`                 | Vínculo de sede del dispositivo cuando la instancia lo requiera.                                 |
| `area_policy_ref`                  | Política de área subordinada a la sede cuando aplique.                                           |
| `effective_app_set_ref`            | Conjunto efectivo de aplicaciones o digest equivalente.                                          |
| `default_app_result`               | Coherencia de la aplicación predeterminada con el conjunto efectivo.                             |
| `permission_package_refs`          | Paquetes de techo máximo fijados a la versión de plantilla.                                      |
| `instance_reduction_ref`           | Reducción explícita de una instancia, si existe.                                                 |
| `effective_permission_ceiling_ref` | Resultado o digest del techo efectivo de claves.                                                 |
| `configuration_version`            | Identidad versionada de la configuración observada.                                              |
| `observed_configuration_ref`       | Fuente autoritativa read-only utilizada para verificarla.                                        |
| `result`                           | `PASS`, `FAIL`, `BLOQUEADO` o `NO_APLICA`.                                                       |
| `blocking_reason`                  | Motivo concreto cuando no exista `PASS`.                                                         |
| `evidence_refs`                    | Referencias durables sin credenciales ni datos sensibles completos.                              |

##### 8.1. Fórmulas restrictivas obligatorias

Aplicaciones efectivas:

```text
APPS EFECTIVAS DEL DISPOSITIVO
=
APPS MÁXIMAS DE LA VERSIÓN DE PLANTILLA
∩
APPS HABILITADAS EXPLÍCITAMENTE EN LA INSTANCIA
∩
APPS CANÓNICAS ACTIVAS
∩
APPS DESPLEGADAS Y COMPATIBLES
```

Techo efectivo del dispositivo:

```text
TECHO EFECTIVO DEL DISPOSITIVO
=
CLAVES EXACTAS DE LOS PAQUETES DE LA VERSIÓN DE PLANTILLA
∩
CLAVES NO RETIRADAS POR LA REDUCCIÓN VIGENTE DE LA INSTANCIA
∩
CLAVES DE APLICACIONES EFECTIVAS
∩
CLAVES CANÓNICAS ACTIVAS Y COMPATIBLES CON DISPOSITIVO COMPARTIDO
```

Una acción empresarial permanece fuera del alcance de esta sola configuración. El dispositivo únicamente restringe; nunca crea un `ALLOW`.

##### 8.2. Condiciones de fallo de dispositivo

Produce `FAIL` cuando la evidencia suficiente demuestra, entre otros casos:

- una instancia amplía su plantilla;
- una aplicación o clave aparece por wildcard, prefijo, ruta, valor `null` o lista del cliente;
- una clave `NOT_ALLOWED` aparece en el techo;
- la sede o área del dispositivo se interpreta como autoridad del actor;
- una aplicación instalada se trata como aplicación permitida sin vínculo canónico;
- una aplicación permitida se trata como permiso interno;
- la app predeterminada está fuera del conjunto efectivo o existen múltiples defaults;
- el dispositivo o principal técnico actúa como trabajador;
- una observación física recibe `device_id`, aplicaciones o paquetes por inferencia;
- una plantilla retirada admite asociaciones nuevas;
- una modificación de plantilla, apps o paquetes carece de versión e historial atribuibles.

#### 9. Reglas de decisión por plano

| Resultado   | Condición                                                                                                                                                                    |
| ----------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `PASS`      | El estado esperado es inequívoco, la fuente observada es autoritativa y reproducible, la identidad y versión coinciden y todas las invariantes aplicables pasan.             |
| `FAIL`      | Existe evidencia suficiente de configuración distinta, expansión de autoridad, identidad/versionado divergente o invariante incumplida.                                      |
| `BLOQUEADO` | Falta una fuente autoritativa, no puede resolverse la versión esperada u observada, la configuración está incompleta o el acceso autorizado no permite determinar el estado. |
| `NO_APLICA` | El expediente aprobado demuestra explícitamente que el plano no participa en la capacidad evaluada.                                                                          |

`NO_APLICA` nunca corrige un `FAIL` ni reemplaza una configuración requerida pero ausente.

#### 10. Resultado agregado por paquete

El resultado de `READY-GATE-003::<package_id>` se calcula de forma estricta:

1. los tres planos se clasifican explícitamente;
2. cada artefacto obligatorio de permiso, matriz y dispositivo aparece exactamente una vez en su evaluación;
3. si cualquier plano obtiene `FAIL`, el paquete obtiene `FAIL`;
4. si no existe `FAIL` pero algún plano obtiene `BLOQUEADO`, el paquete obtiene `BLOQUEADO`;
5. el paquete obtiene `PASS` únicamente cuando todos los planos aplicables obtienen `PASS` y cada `NO_APLICA` está sustentado por el expediente;
6. el paquete obtiene `NO_APLICA` únicamente cuando los tres planos están justificadamente fuera de alcance;
7. no existe `PASS` parcial por coincidir solo el catálogo, solo la matriz o solo la configuración registral del dispositivo.

#### 11. Evidencia aceptable

La ejecución futura podrá usar, según el plano y sin exponer secretos:

- manifiestos versionados con identidad, versión y digest;
- consultas read-only versionadas que reconstruyan configuración efectiva;
- exportes deterministas del catálogo y matrices con orden estable;
- reportes de unicidad, resolución de claves, conteos, segregación y ausencia de wildcards;
- snapshots de configuración de dispositivo que identifiquen plantilla, sede, área, apps y techo de permisos;
- evidencia emitida por CI o por la plataforma de configuración que vincule `package_id`, candidato y entorno;
- pruebas negativas y contractuales ya vinculadas al paquete;
- referencias a eventos o historial de configuración que demuestren versión, vigencia, actor administrativo y motivo.

Toda evidencia deberá indicar ambiente, candidato, fecha u origen verificable cuando corresponda, método de obtención, resultado y referencias durables.

#### 12. Evidencia insuficiente por sí sola

No constituye prueba suficiente de configuración correcta:

- que el permiso exista en un archivo o en una interfaz;
- que un rol tenga un nombre esperado;
- que una matriz documental haya sido aprobada sin demostrar su estado materializado;
- que una tabla o fila exista sin versión o correlación con el paquete;
- que una aplicación aparezca en el launcher;
- que una aplicación esté instalada;
- que una ruta responda;
- que una fila de dispositivo esté activa;
- que `navigation_role` tenga un valor esperado;
- una captura de pantalla sin fuente reproducible;
- una exportación sin versión, digest o ambiente;
- un `PASS` de migraciones en `READY-GATE-002` sin comprobar la semántica de la configuración resultante;
- que un usuario real pueda ejecutar una acción; la preparación de actores y su contexto pertenece a `READY-GATE-004`.

#### 13. Casos especiales y tratamiento obligatorio

##### 13.1. Baseline contractual sin cambios en el paquete

Si el paquete depende del baseline vigente pero no lo modifica, el gate deberá verificar que el entorno objetivo conserva la versión y digest esperados. La ausencia de cambio no elimina la necesidad de comprobar una dependencia crítica de readiness.

##### 13.2. Versión canónica posterior

Si una tarea aprobada posterior modifica catálogo, matrices o contratos de dispositivo, el paquete deberá identificar la nueva versión, digest y decisión propietaria. `READY-GATE-003` comparará contra esa versión y no contra una copia histórica. Un cambio observado sin esa trazabilidad produce `FAIL` o `BLOQUEADO`.

##### 13.3. Instancias registrales no verificadas

`CAJA_VENTO_CAFE_01` y `KIOSCO_BODEGA_CP` no pueden declararse físicamente u operacionalmente verificadas por la sola existencia de su fila. Este gate puede comprobar que su configuración registral coincide con el contrato del paquete, pero esa comprobación no sustituye la evidencia física, de sesión o de hardware asignada a las tareas y gates propietarios.

##### 13.4. Observaciones físicas sin enrolamiento

Una observación física sin identidad administrada no se promueve a dispositivo configurado. Si el paquete requiere una instancia que aún no existe o no puede correlacionarse, el plano de dispositivo queda `BLOQUEADO` hasta que la tarea propietaria materialice la identidad correspondiente.

##### 13.5. Configuración almacenada en Supabase

Cuando catálogo, matrices o políticas de dispositivo se materialicen en Supabase, toda modificación perteneciente a VENTO deberá provenir de artefactos versionados en `vento-shell`. `READY-GATE-002` confirma que la migración o cambio de datos fue aplicado y reconciliado; `READY-GATE-003` confirma que la semántica final observada coincide con el contrato de autorización y dispositivo.

#### 14. Cobertura de prueba heredada

Este gate consume y operacionaliza requisitos existentes sin crear una conducta empresarial nueva. La cobertura heredada relevante incluye:

- `TREQ-AUTH-001`, `TREQ-AUTH-002`, `TREQ-AUTH-008`, `TREQ-AUTH-010` y `TREQ-AUTH-011` para autorización canónica, matrices, segregación y dispositivo como límite restrictivo;
- `TREQ-AUTH-019` a `TREQ-AUTH-068` para identidad y configuración de dispositivo, sede, área, aplicaciones y techo máximo de permisos;
- los `TREQ-*` adicionales ya vinculados por `DELIV-PKG-016` al `package_id` concreto que se esté evaluando.

La ejecución futura deberá usar el estado vigente del Registro Canónico de Requisitos de Prueba y no inferir que un requisito está `VERIFICADO` por existir este gate documental.

#### Requisitos de prueba derivados

**Resultado:** NO GENERA REQUISITOS DE PRUEBA

**Justificación:** `READY-GATE-003` define el criterio documental de evidencia para obligaciones de autorización, matrices y dispositivos que ya cuentan con requisitos de prueba identificados y vinculables por paquete. No crea un permiso, regla de negocio, transición de estado, restricción de integridad, contrato de integración ni comportamiento ejecutable nuevo; únicamente establece cómo `SHELL-CI-021::<package_id>` deberá demostrar posteriormente que la configuración materializada satisface los contratos existentes.

**Requisitos creados:** 0
**Requisitos modificados:** 0

#### 15. Criterios de aceptación documental

`READY-GATE-003` queda documentalmente completo cuando:

1. separa permisos, matrices y dispositivos en tres planos independientes;
2. define cómo resolver el estado esperado desde versiones canónicas y el expediente del paquete;
3. conserva el baseline vigente de catálogo, matrices y dispositivos sin reinterpretarlo;
4. exige claves exactas, versiones y digests reproducibles para permisos y matrices;
5. impide wildcards, `null` global, claves legacy o retiradas y dispositivos como fuentes de concesión;
6. conserva la segregación entre carriles base y operativo y entre componentes de autorización;
7. exige que la configuración de dispositivo respete identidad, plantilla, sede, área, apps y techo de permisos sin ampliar autoridad;
8. preserva las 19 claves de inventario, 14 plantillas, 43 asociaciones máximas de aplicaciones, 9 paquetes de permisos y 266 asociaciones plantilla–permiso como baseline vigente mientras no exista una versión canónica posterior;
9. diferencia configuración registral de verificación física u operacional;
10. define `PASS`, `FAIL`, `BLOQUEADO` y `NO_APLICA` sin resultados parciales implícitos;
11. diferencia evidencia reproducible de señales insuficientes como una fila existente, una app visible o un screenshot;
12. separa la migración aplicada de `READY-GATE-002` de la semántica configurada que evalúa este gate;
13. mantiene usuarios, roles asignados, sedes/áreas operativas del actor y turnos en `READY-GATE-004`;
14. mantiene la ejecución y captura de evidencia real en `SHELL-CI-021::<package_id>`;
15. no crea ni modifica requisitos `TREQ-*` ni el Registro Canónico de Requisitos de Prueba;
16. no concede permisos, no configura equipos, no ejecuta migraciones, DDL/DML, RLS, RPC ni modificaciones remotas;
17. `READY-GATE-004` permanece reservada y no se desarrolla ni modifica.

#### 16. Continuidad canónica

##### ÚLTIMA TAREA APROBADA
READY-GATE-002 — Definir criterio y evidencia para confirmar migraciones aplicadas y datos validados

##### TAREA ACTUAL APROBADA
READY-GATE-003 — Definir criterio y evidencia para confirmar permisos, matrices y dispositivos configurados

##### SIGUIENTE TAREA RESERVADA
READY-GATE-004 — Definir criterio y evidencia para confirmar usuarios, roles, sedes, áreas y turnos requeridos


### ✅ READY-GATE-004 — Definir criterio y evidencia para confirmar usuarios, roles, sedes, áreas y turnos requeridos

**Estado:** APROBADA
**Tarea anterior:** READY-GATE-003 — Definir criterio y evidencia para confirmar permisos, matrices y dispositivos configurados
**Tarea siguiente:** READY-GATE-005 — Definir criterio y evidencia para confirmar catálogos y datos maestros mínimos
**Tipo de tarea:** Documental — definición normativa del criterio de readiness y del expediente mínimo de evidencia para confirmar que los usuarios y actores humanos requeridos por un paquete existen, están correctamente vinculados con sus roles, sedes, áreas y turnos aplicables, y pueden entrar al piloto sin ambigüedad de identidad o contexto; sin crear usuarios, modificar asignaciones, publicar turnos, realizar check-in ni ejecutar cambios sobre ambientes remotos

#### 1. Propósito

Definir el criterio verificable y el formato mínimo de evidencia que `SHELL-CI-021::<package_id>` deberá ejecutar para confirmar, después de `SHELL-CI-020::<package_id>` y de las tareas de implementación aplicables, que todas las personas necesarias para operar, administrar o supervisar el alcance del paquete durante el piloto tienen una configuración de identidad y contexto coherente con el modelo canónico.

El gate deberá demostrar, para cada actor requerido por el paquete, que:

1. existe una identidad empresarial inequívoca;
2. cuando el actor requiera autenticación interactiva, existe un principal autenticado válido y vinculado con ese actor sin confundir principal con actor;
3. sus roles requeridos corresponden a códigos canónicos exactos y no a nombres libres, cargos, jerarquías o inferencias locales;
4. sus sedes y áreas requeridas existen, están activas cuando corresponda y conservan una relación territorial coherente;
5. todo rol operativo que deba ejercerse durante el piloto está respaldado por un turno publicado, atribuible y compatible con la ventana, sede y área requeridas;
6. ninguna ausencia, multiplicidad o contradicción se transforma silenciosamente en autoridad más amplia.

Esta tarea diseña el gate. No crea cuentas, invitaciones, trabajadores, roles, asignaciones territoriales, turnos, check-ins ni registros de operación y no afirma que ningún actor haya superado readiness.

#### 2. Alcance y frontera del gate

`READY-GATE-004` responde exclusivamente a esta pregunta:

> ¿El conjunto completo de actores humanos que el paquete necesita para entrar al piloto está materializado con identidad, rol y contexto territorial y laboral suficientes para ejecutar su participación prevista, sin privilegios inferidos ni ambigüedades?

El gate se evalúa por `package_id`, ambiente objetivo y actor requerido. Cuando un mismo actor participe en más de una función, sede, área o franja del piloto, cada combinación materialmente distinta deberá quedar representada en el expediente sin duplicar la identidad humana.

Este gate no sustituye ni anticipa:

- `READY-GATE-001`: correlación del código realmente desplegado;
- `READY-GATE-002`: migraciones aplicadas y datos validados;
- `READY-GATE-003`: permisos, matrices y dispositivos configurados;
- `READY-GATE-005`: catálogos y datos maestros mínimos;
- `READY-GATE-006`: integraciones y credenciales del ambiente;
- `READY-GATE-007`: hardware, red, escáneres e impresoras;
- `READY-GATE-008`: procedimientos operativos y contingencias;
- `READY-GATE-009`: capacitación y material de apoyo;
- `READY-GATE-010`: mesa de soporte, responsables y escalamiento;
- `READY-GATE-011`: monitoreo, métricas y alertas;
- `READY-GATE-012`: respaldo y rollback probados;
- `READY-GATE-013`: línea base previa al piloto;
- `READY-GATE-014`: riesgos aceptados y condiciones de suspensión;
- `READY-GATE-015`: autoridad y criterio final de entrada al piloto.

La existencia de una cuenta, una fila de trabajador, un rol visible en interfaz, una sede seleccionable, un área registrada o un turno en borrador no demuestra readiness por sí sola.

#### 3. Fuentes vinculantes para determinar el roster esperado

La ejecución futura deberá derivar el conjunto esperado de actores y configuraciones exclusivamente del expediente aprobado del paquete y de los contratos canónicos vigentes.

Como mínimo deberá reconciliar, cuando apliquen:

- el alcance y los actores del proceso que el paquete implementa;
- los permisos y matrices ya validados por `READY-GATE-003`;
- la decisión final y las dependencias del expediente `DELIV-PKG-001..025::<package_id>`;
- el catálogo canónico de roles base y operativos;
- el contrato de `AccessContext` y la separación entre principal autenticado y actor efectivo;
- las asignaciones territoriales requeridas por los procesos incluidos;
- los turnos publicados que materialicen los roles operativos requeridos para la ventana del piloto;
- las denegaciones y restricciones vigentes que puedan impedir la participación prevista.

La lista observada de usuarios del ambiente no define por sí sola el roster esperado. Primero deberá existir un conjunto requerido derivado del paquete y después deberá reconciliarse contra el estado observado.

Si el paquete no permite determinar de forma exhaustiva quiénes deben participar o qué rol y territorio necesita cada actor, el gate será `BLOQUEADO`; no se completará el roster mediante inferencia.

#### 4. Contrato del roster de readiness

La ejecución futura deberá materializar exactamente una fila principal por actor requerido y las extensiones necesarias para representar participaciones distintas sin duplicar a la persona.

##### 4.1. Campos mínimos por actor

| Campo                       | Regla                                                                                                           |
| --------------------------- | --------------------------------------------------------------------------------------------------------------- |
| `package_id`                | Identidad canónica exacta del expediente evaluado.                                                              |
| `target_environment`        | Ambiente exacto contra el cual se realiza la comprobación.                                                      |
| `actor_id`                  | Identidad empresarial estable del humano requerido.                                                             |
| `principal_id`              | Principal autenticado vinculado cuando la participación exige autenticación interactiva; no sustituye al actor. |
| `principal_requirement`     | Evidencia de si la participación requiere o no principal interactivo según el proceso y el paquete.             |
| `identity_link_result`      | Resultado de comprobar vínculo inequívoco entre principal y actor cuando aplique.                               |
| `base_role_expected`        | Rol base exacto requerido cuando corresponda.                                                                   |
| `base_role_observed`        | Rol base efectivamente configurado y vigente.                                                                   |
| `operational_role_expected` | Rol operativo exacto requerido cuando corresponda.                                                              |
| `operational_role_observed` | Rol operativo resoluble para la participación prevista.                                                         |
| `required_site_ids`         | Sede o conjunto de sedes que el paquete exige para la participación.                                            |
| `observed_site_scope`       | Alcance territorial efectivamente configurado para el actor.                                                    |
| `required_area_ids`         | Área o conjunto explícito de áreas requeridas cuando la operación depende de área.                              |
| `observed_area_scope`       | Áreas efectivamente configuradas y compatibles con sus sedes.                                                   |
| `shift_required`            | Indica si la participación exige turno operativo para la ventana del piloto.                                    |
| `shift_id`                  | Identidad del turno publicado que sustenta la participación cuando aplique.                                     |
| `shift_window`              | Ventana efectiva del turno comparada con la ventana requerida del piloto.                                       |
| `shift_site_id`             | Sede del turno publicado.                                                                                       |
| `shift_area_id`             | Área del turno cuando el contrato la exige.                                                                     |
| `shift_operational_role`    | Rol operativo publicado para el turno.                                                                          |
| `conflict_result`           | Resultado de detectar duplicidad, superposición o asignaciones incompatibles.                                   |
| `evidence_refs`             | Referencias reproducibles a evidencia autorizada sin almacenar secretos ni datos personales innecesarios.       |
| `result`                    | `PASS`, `FAIL`, `BLOQUEADO` o `NO_APLICA`.                                                                      |
| `blocking_reason`           | Motivo concreto cuando la fila no obtiene `PASS`.                                                               |

Los nombres anteriores definen el contenido mínimo del expediente de evidencia; no obligan a una estructura física de base de datos concreta.

##### 4.2. Exhaustividad del roster

El roster será válido únicamente cuando:

1. todos los actores requeridos por los pasos del paquete estén incluidos;
2. cada actor aparezca una sola vez como identidad humana principal;
3. sus participaciones adicionales estén vinculadas a la misma identidad y no creen personas duplicadas;
4. toda ausencia tenga una causa verificable;
5. ningún actor adicional se incluya para suplir silenciosamente un rol o una cobertura no aprobados;
6. los conteos esperado, observado, conciliado, faltante, conflictivo y no aplicable sean reproducibles.

No se declara una cantidad global de usuarios, sedes, áreas o turnos en esta tarea porque esas cantidades pertenecen a cada paquete y ambiente observado durante la ejecución futura.

#### 5. Identidad humana y principal autenticado

La comprobación deberá conservar la separación canónica:

```text
PRINCIPAL AUTENTICADO
≠
ACTOR HUMANO EFECTIVO
≠
ROL
≠
TURNO
≠
CHECK-IN
≠
DISPOSITIVO
```

Para obtener `PASS` en identidad:

1. el `actor_id` esperado deberá existir y corresponder a la persona prevista por el expediente;
2. si la participación exige autenticación interactiva, el principal deberá existir, ser utilizable en el ambiente objetivo y vincularse de forma inequívoca con ese actor;
3. un principal técnico, cuenta de dispositivo, credencial de integración o identidad compartida no podrá utilizarse como actor humano;
4. una invitación pendiente, expirada, consumida por otra identidad o con rol o sede no reconciliados no constituye por sí sola un usuario listo para el piloto;
5. la metadata editable por el usuario no podrá sustituir la asignación empresarial protegida;
6. una identidad desactivada, suspendida o no utilizable para la participación requerida no podrá recibir `PASS`;
7. el vínculo deberá poder auditarse sin exponer contraseñas, tokens, secretos ni atributos personales innecesarios.

Cuando el proceso aprobado demuestre que una participación no requiere principal interactivo, esa dimensión podrá marcarse `NO_APLICA`; el actor empresarial y las demás dimensiones requeridas siguen siendo obligatorios.

#### 6. Catálogos de rol vinculantes

`READY-GATE-004` no redefine roles. Comprueba que las asignaciones observadas correspondan a los catálogos canónicos ya aprobados.

##### 6.1. Roles base vigentes

Los siete códigos base que el gate reconoce en el snapshot vigente son:

- `propietario`;
- `gerente_general`;
- `gerente`;
- `contador`;
- `marketing`;
- `logistica`;
- `auxiliar_administrativa`.

El rol base representa autoridad administrativa o funcional independiente del turno cuando su modalidad lo permite. No se convertirá en rol operativo por coincidencia nominal, cargo, jerarquía o presencia física.

##### 6.2. Roles operativos vigentes

Los doce códigos operativos que el gate reconoce en el snapshot vigente son:

- `cajero_satelite`;
- `barista_satelite`;
- `cocinero_satelite`;
- `servicio_salon`;
- `mostrador_satelite`;
- `operador_integral_satelite`;
- `produccion_cocina`;
- `produccion_panaderia`;
- `produccion_reposteria`;
- `bodeguero`;
- `conductor_logistica`;
- `gerencia_operativa`.

El rol operativo deberá provenir del contexto laboral vigente que corresponda al actor y al momento evaluado. No podrá derivarse de un `BaseRole`, de un nombre de cargo, de una ruta, de una pantalla, del dispositivo o de una asignación histórica.

##### 6.3. Regla de correspondencia

Para cada participación del roster:

- el rol esperado deberá ser exacto y existir en el catálogo aplicable;
- el rol observado deberá coincidir con la participación autorizada por el expediente;
- una asignación adicional que amplíe materialmente la autoridad del actor fuera de lo aprobado deberá producir `FAIL` cuando la evidencia permita demostrarla;
- si no puede determinarse cuál rol es autoritativo, el resultado será `BLOQUEADO`;
- la ausencia de rol no se sustituye por un rol “parecido” ni por el más cercano jerárquicamente.

La matriz de concesiones no se vuelve a diseñar aquí. `READY-GATE-003` ya gobierna su integridad; este gate verifica que los actores del paquete estén vinculados a los roles que esas matrices esperan.

#### 7. Sedes y áreas requeridas

Toda participación territorial deberá reconciliar identificadores canónicos, no etiquetas libres.

##### 7.1. Sede

Para `PASS`:

1. cada `site_id` requerido deberá existir y ser el mismo que utiliza el expediente del paquete;
2. cuando la participación dependa de una sede activa, esa sede deberá estar habilitada para el periodo evaluado;
3. el alcance observado del actor deberá contener exactamente la cobertura necesaria para su participación, sin interpretar `null` como todas las sedes;
4. un nombre, código visible, sede seleccionada en cliente, última sede usada o sede del dispositivo no podrá crear asignación del actor;
5. una asignación conflictiva o no resoluble bloqueará la participación afectada.

##### 7.2. Área

Para `PASS`:

1. cada `area_id` requerido deberá existir y pertenecer a una sede compatible con la participación;
2. el conjunto observado deberá reconciliarse contra el conjunto requerido por el paquete;
3. un área de otra sede produce `FAIL` cuando la relación es verificable;
4. un área ausente o indeterminada no significa toda la sede;
5. una etiqueta, tipo de área, orden visual o selección del cliente no crea membresía territorial.

##### 7.3. Participaciones administrativas

Una participación exclusivamente administrativa no deberá recibir artificialmente turno, check-in o área operativa para obtener readiness. El gate deberá comprobar el alcance administrativo que realmente exija el contrato y mantenerlo separado del contexto operacional.

#### 8. Turnos requeridos para el piloto

El turno es una condición operativa temporal y no una fuente de identidad o permisos.

Para cada participación que requiera carril operativo durante el piloto, el gate deberá demostrar:

1. existencia de un turno atribuible al mismo `actor_id`;
2. estado publicado o equivalente canónico que lo haga laboralmente efectivo;
3. ventana temporal que cubra la participación requerida del piloto;
4. `site_id` compatible con la sede requerida;
5. `area_id` compatible cuando el contrato del turno y de la operación lo exijan;
6. `operational_role` exacto y compatible con la función requerida;
7. ausencia de superposición que produzca dos roles operativos efectivos incompatibles para el mismo actor e instante;
8. ausencia de selección por aproximación, “turno más cercano” o fallback histórico.

Un turno en borrador, cancelado, fuera de ventana, de otra persona, sede, área o rol no satisface el gate.

##### 8.1. Frontera con check-in

`READY-GATE-004` confirma que los turnos necesarios están configurados y publicados para la ventana del piloto. No exige fabricar un check-in previo ni considerar que un actor ya está operando antes de iniciar su jornada.

El check-in activo se evaluará cuando el flujo operativo realmente requiera resolver contexto durante la ejecución. Su ausencia antes del inicio de la jornada no convierte en inválido un turno futuro correctamente publicado ni afecta capacidades base que por contrato no dependan de check-in.

#### 9. Reconciliación con matrices y permisos

El gate deberá demostrar coherencia entre el roster y la configuración ya evaluada en `READY-GATE-003` sin repetir la auditoría completa de matrices.

Controles mínimos:

1. todo rol base observado deberá resolver contra el carril base correspondiente;
2. todo rol operativo observado deberá resolver contra el carril operativo correspondiente;
3. las participaciones operativas deberán usar contexto territorial y temporal compatible con sus filas `CTX-*`;
4. un rol base no podrá heredar automáticamente las 240 concesiones operativas;
5. un rol operativo no podrá heredar automáticamente las 499 concesiones base;
6. una cuenta de dispositivo no podrá aparecer como beneficiario humano de una concesión;
7. `null`, wildcard, nombre de rol o nombre de cargo no podrán ampliar alcance;
8. una denegación vigente deberá seguir prevaleciendo sobre la mera existencia del usuario, rol o turno.

La prueba de una acción concreta continúa perteneciendo a la autorización efectiva y a los requisitos `TREQ-*` aplicables. Este gate solo confirma que la configuración humana necesaria para llegar a esa evaluación existe y es coherente.

#### 10. Reglas de decisión por dimensión

Cada actor deberá obtener un resultado por dimensión antes del resultado agregado.

| Dimensión     | `PASS`                                                                                                     | `FAIL`                                                                                               | `BLOQUEADO`                                                                | `NO_APLICA`                                                                                 |
| ------------- | ---------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------- |
| Identidad     | Actor y vínculo de principal requerido son inequívocos, vigentes y utilizables.                            | La evidencia demuestra identidad incorrecta, inactiva, duplicada o vínculo con otro actor.           | No puede resolverse de forma autoritativa el actor o su principal.         | La participación no requiere principal interactivo; el actor empresarial sigue validándose. |
| Rol base      | Código esperado y asignación observada son coherentes.                                                     | Existe rol distinto o asignación adicional incompatible que cambia autoridad.                        | La fuente autoritativa o el rol esperado no pueden determinarse.           | La participación no requiere carril base.                                                   |
| Rol operativo | Código esperado y rol operativo resoluble son coherentes.                                                  | El rol observado es distinto o incompatible.                                                         | No puede resolverse un rol operativo autoritativo.                         | La participación no requiere carril operativo.                                              |
| Sede          | Cobertura requerida y observada son compatibles mediante IDs canónicos.                                    | Existe sede incorrecta, inactiva o expansión demostrada.                                             | La asignación o el catálogo territorial no pueden reconciliarse.           | El contrato demuestra que la dimensión territorial no aplica.                               |
| Área          | Las áreas requeridas existen, pertenecen a la sede correcta y están cubiertas.                             | Existe área cross-site, no autorizada o incompatible.                                                | La pertenencia o asignación de área no puede resolverse.                   | El contrato demuestra que el área no aplica a esa participación.                            |
| Turno         | Existe turno publicado, atribuible, temporal y territorialmente compatible con el rol operativo requerido. | El turno está ausente cuando es requerido, no publicado, fuera de ventana, duplicado o incompatible. | No puede determinarse de forma autoritativa el calendario o la asignación. | La participación no exige turno operativo.                                                  |

`NO_APLICA` deberá estar sustentado por el proceso y el expediente del paquete. No puede utilizarse para ocultar un dato faltante.

#### 11. Resultado agregado por actor y por paquete

##### 11.1. Resultado por actor

1. Si alguna dimensión obligatoria obtiene `FAIL`, el actor obtiene `FAIL`.
2. Si no existe `FAIL` pero alguna dimensión obligatoria obtiene `BLOQUEADO`, el actor obtiene `BLOQUEADO`.
3. El actor obtiene `PASS` únicamente cuando todas sus dimensiones requeridas obtienen `PASS` y todo `NO_APLICA` está sustentado.
4. La existencia de una cuenta válida no compensa un rol, territorio o turno incorrecto.
5. Un turno correcto no compensa una identidad o asignación inválida.
6. Un actor administrativo puede obtener `PASS` sin turno operativo cuando el contrato demuestra que su participación es exclusivamente base.

##### 11.2. Resultado por paquete

1. Todo actor requerido deberá aparecer exactamente una vez como identidad principal del roster.
2. Si falta un actor cuyo requerimiento está demostrado, el paquete obtiene `FAIL`.
3. Si no puede determinarse el universo esperado de actores, el paquete obtiene `BLOQUEADO`.
4. Si algún actor obtiene `FAIL`, el paquete obtiene `FAIL`.
5. Si no existe `FAIL` pero algún actor obtiene `BLOQUEADO`, el paquete obtiene `BLOQUEADO`.
6. El paquete obtiene `PASS` únicamente cuando todos los actores requeridos obtienen `PASS`.
7. Un paquete que demuestre documentalmente que no requiere participación humana para la capacidad evaluada podrá obtener `NO_APLICA` en este gate; esa decisión no puede inferirse únicamente porque no existan usuarios observados.
8. Un subconjunto de usuarios o una muestra representativa nunca se redondean a `PASS`.

#### 12. Evidencia aceptable

La ejecución futura deberá conservar evidencia suficiente para que otra persona autorizada pueda repetir la reconciliación y obtener el mismo resultado.

Podrán utilizarse, cuando correspondan:

- inventario del roster esperado derivado del paquete;
- identificadores y estado del principal autenticado obtenidos de la fuente de identidad autorizada;
- vínculo protegido entre principal y actor empresarial;
- asignaciones canónicas de rol base;
- asignaciones y elegibilidad de rol operativo;
- catálogos y vínculos de sede y área;
- calendario o fuente autoritativa de turnos publicados;
- consultas read-only versionadas que comprueben unicidad, pertenencia territorial, vigencia y conflictos;
- reportes reproducibles de faltantes, duplicados, superposiciones y asignaciones incompatibles;
- resultados de pruebas vinculadas a los `TREQ-*` existentes;
- referencias de evidencia emitidas por los sistemas propietarios.

Toda evidencia deberá registrar como mínimo paquete, ambiente, fecha de observación, fuente, método, actor o conjunto evaluado, resultado y referencia durable.

La evidencia no deberá conservar contraseñas, tokens, secretos, códigos de recuperación, datos biométricos ni atributos personales completos cuando un identificador o una referencia protegida sean suficientes.

#### 13. Evidencia insuficiente por sí sola

No constituye prueba suficiente de readiness:

- una captura de una pantalla de usuarios;
- que el correo de una persona exista en un proveedor de identidad;
- que una invitación haya sido enviada;
- que una fila de trabajador exista sin vínculo de identidad verificable;
- que el nombre visible de un rol coincida con la función esperada;
- que una persona pueda abrir una aplicación;
- que un selector muestre una sede o un área;
- que una sede o área exista sin demostrar la asignación del actor;
- que un turno esté creado pero permanezca en borrador o fuera de la ventana del piloto;
- un check-in histórico;
- la presencia física del trabajador sin turno y contexto requeridos;
- una asignación local, cacheada o enviada por el cliente;
- una muestra parcial del roster;
- la aprobación documental de un paquete sin evidencia del estado observado en el ambiente objetivo.

#### 14. Casos especiales y manejo de discrepancias

##### 14.1. Actor con múltiples funciones

Una persona puede tener más de una participación aprobada sin duplicar su identidad. El expediente deberá separar cada participación por rol, territorio y ventana y comprobar que la combinación no crea simultaneidad incompatible ni expansión accidental de autoridad.

##### 14.2. Actor multisede

Una cobertura administrativa multisede deberá provenir de la asignación canónica correspondiente. Para operación, cada participación deberá resolver la sede y área efectivas exigidas por el turno y el recurso. La mera pertenencia administrativa a varias sedes no produce un contexto operativo global.

##### 14.3. Actor exclusivamente administrativo

Cuando la participación requiera solamente capacidades base, la ausencia de turno o check-in no será un defecto. Sí deberán verificarse identidad, rol base, cobertura administrativa y demás condiciones que el paquete exija.

##### 14.4. Actor operativo sin turno válido

Cuando el paquete requiera operación y no exista un turno publicado compatible con actor, rol, sede, área y ventana, el resultado será `FAIL` si la ausencia es verificable y `BLOQUEADO` si la fuente autoritativa no puede determinarse. No se utilizará un turno histórico o aproximado.

##### 14.5. Dispositivo compartido

El dispositivo no reemplaza al actor. Si la participación se realiza desde una estación compartida, este gate exigirá igualmente actor humano identificable y las dimensiones laborales que correspondan. La configuración del dispositivo permanece gobernada por `READY-GATE-003` y no concede roles, sedes, áreas ni turnos.

##### 14.6. Identidad técnica o de integración

Un principal de servicio, integración, automatización o dispositivo no se incorporará al roster como usuario humano. Si el paquete depende de una integración técnica, su readiness pertenece al gate correspondiente de integraciones y credenciales, no a una simulación de trabajador.

#### 15. Separación entre planificación y ejecución

`READY-GATE-004` deja definido el contrato que `SHELL-CI-021::<package_id>` deberá ejecutar después de que el paquete haya materializado las identidades, asignaciones y planificación laboral aplicables.

La secuencia permanece:

`E5-GATE-008::<package_id> -> SHELL-CI-020::<package_id> -> implementación aplicable -> SHELL-CI-021::<package_id> -> SHELL-CI-022::<package_id>`

Durante `SHELL-CI-021::<package_id>` se capturará el roster real del ambiente objetivo, se reconciliarán sus dimensiones y se emitirá el resultado operativo de readiness. Esta tarea no crea ni modifica usuarios, roles, sedes, áreas, turnos o check-ins y no presenta evidencia planificada como evidencia ejecutada.

#### Requisitos de prueba derivados

**Resultado:** NO GENERA REQUISITOS DE PRUEBA

**Justificación:** `READY-GATE-004` define el criterio documental de evidencia para comprobar reglas de identidad, rol, territorio, jornada y separación entre carriles que ya están protegidas por requisitos canónicos existentes. No introduce una nueva regla empresarial, modalidad de autorización, asignación, transición de estado o comportamiento ejecutable; operacionaliza esas obligaciones para la comprobación futura por paquete.

**Requisitos existentes consumidos:** `TREQ-AUTH-001`, `TREQ-AUTH-005`, `TREQ-AUTH-007`, `TREQ-AUTH-008`, `TREQ-AUTH-009` y `TREQ-AUTH-010`.

**Requisitos TREQ-* creados:** 0
**Requisitos TREQ-* modificados:** 0
**Fragmentos 04A afectados:** 0

#### 16. Criterios de aceptación documental

`READY-GATE-004` queda documentalmente completo cuando:

1. define cómo derivar un roster exhaustivo de actores requeridos desde el expediente del paquete antes de observar usuarios del ambiente;
2. separa de forma explícita principal autenticado, actor humano, rol, turno, check-in y dispositivo;
3. exige vínculo inequívoco entre principal y actor cuando la participación requiere autenticación interactiva;
4. conserva exactamente los siete roles base y doce roles operativos del snapshot canónico vigente sin inferencias por cargo o jerarquía;
5. exige reconciliación de sede y área mediante identificadores canónicos y prohíbe interpretar `null` como cobertura global;
6. exige turno publicado, atribuible, temporal y territorialmente compatible para toda participación operativa requerida durante el piloto;
7. mantiene las capacidades administrativas independientes de turno y check-in cuando el contrato las define por carril base;
8. no exige un check-in artificial antes del inicio real de la jornada y conserva su evaluación para el contexto operativo correspondiente;
9. define `PASS`, `FAIL`, `BLOQUEADO` y `NO_APLICA` por dimensión, por actor y por paquete;
10. impide aprobar una muestra parcial, un roster incompleto o una identidad técnica presentada como trabajador;
11. diferencia evidencia reproducible de señales insuficientes como capturas, invitaciones enviadas, nombres visibles o turnos en borrador;
12. conserva la separación con `READY-GATE-003` y no vuelve a diseñar permisos, matrices o dispositivos;
13. no crea usuarios, invitaciones, trabajadores, roles, asignaciones, sedes, áreas, turnos, check-ins, DDL, DML, migraciones ni cambios remotos;
14. no crea ni modifica requisitos `TREQ-*` ni fragmentos del registro 04A;
15. `READY-GATE-005` permanece reservada y no se anticipa su criterio sobre catálogos y datos maestros.

#### 17. Continuidad canónica

##### ÚLTIMA TAREA APROBADA
READY-GATE-003 — Definir criterio y evidencia para confirmar permisos, matrices y dispositivos configurados

##### TAREA ACTUAL APROBADA
READY-GATE-004 — Definir criterio y evidencia para confirmar usuarios, roles, sedes, áreas y turnos requeridos

##### SIGUIENTE TAREA RESERVADA
READY-GATE-005 — Definir criterio y evidencia para confirmar catálogos y datos maestros mínimos


### ✅ READY-GATE-005 — Definir criterio y evidencia para confirmar catálogos y datos maestros mínimos

**Estado:** APROBADA  
**Tarea anterior:** READY-GATE-004 — Definir criterio y evidencia para confirmar usuarios, roles, sedes, áreas y turnos requeridos  
**Tarea siguiente:** READY-GATE-006 — Definir criterio y evidencia para confirmar integraciones y credenciales del ambiente  
**Tipo de tarea:** Documental — definición del gate de readiness que permitirá confirmar, por paquete y ambiente objetivo, que los catálogos, maestros, referencias y homologaciones mínimas requeridas para la operación autorizada existen, son identificables, están gobernadas por una fuente de verdad y cumplen integridad suficiente antes del piloto; sin crear datos, ejecutar seeds, migraciones, backfills, cambios Supabase, configuración, despliegues ni validación operativa real.

#### 1. Propósito y resultado canónico

`READY-GATE-005::<package_id>` define el criterio documental que deberá ejecutar posteriormente `SHELL-CI-021::<package_id>` para determinar si el paquete dispone de la línea base mínima de catálogos y datos maestros que necesita en el ambiente objetivo.

El gate responde una pregunta concreta:

> ¿Todas las identidades maestras, catálogos, referencias y homologaciones que el paquete necesita para operar dentro de su alcance aprobado existen en la fuente de verdad correcta, con claves canónicas, cobertura mínima, vigencia e integridad verificables?

La tarea no afirma que esa condición ya se cumpla para ningún paquete. Define qué deberá comprobarse, qué evidencia será suficiente y cómo se resolverá el resultado.

#### 2. Alcance y frontera del gate

El gate cubre exclusivamente datos de referencia o persistencia relativamente estable que condicionan la operación del paquete, por ejemplo cuando apliquen:

- catálogos funcionales;
- entidades maestras;
- valores de referencia;
- diccionarios o taxonomías controladas;
- relaciones de homologación entre identificadores canónicos y fuentes legacy o externas;
- parámetros de negocio persistentes que sean datos gobernados y no secretos ni variables de despliegue;
- registros maestros mínimos exigidos por contratos, procesos, integraciones o `TREQ-*` del paquete.

La aplicabilidad se determina desde el expediente aprobado del paquete. Ninguna categoría se considera obligatoria para todos los paquetes por el solo hecho de existir en Vento OS.

Este gate no sustituye ni reabre:

1. `READY-GATE-002`, que confirma migraciones aplicadas, transformaciones de datos y reconciliación de cambios existentes;
2. `READY-GATE-004`, que confirma usuarios, roles, sedes, áreas y turnos requeridos;
3. `READY-GATE-006`, que confirmará integraciones y credenciales del ambiente;
4. los gates posteriores de dispositivos, conectividad, observabilidad, backup, soporte o aceptación;
5. las pruebas funcionales o de autorización completas del paquete.

Los registros transaccionales que deben nacer durante la operación ordinaria del piloto —por ejemplo ventas, órdenes, check-ins, movimientos, eventos o evidencias generadas por el flujo— no se convierten en maestros solo para satisfacer este gate.

#### 3. Determinación del universo mínimo requerido

Para cada `package_id`, `SHELL-CI-021` deberá construir un conjunto exhaustivo denominado `required_master_set` a partir únicamente de fuentes ya aprobadas y aplicables al paquete.

La derivación seguirá esta precedencia:

1. `TREQ-*` vinculados al paquete y sus precondiciones de datos;
2. contratos canónicos de dominio, datos, integración, autorización y proceso consumidos por el paquete;
3. decisiones aprobadas del expediente `DELIV-PKG` que identifiquen datos, fixtures, entornos, dependencias, cohortes o precondiciones;
4. alcance de datos del piloto aprobado para el paquete;
5. fuente de verdad y reglas de identidad ya materializadas durante implementación, cuando la ejecución futura del gate disponga de ellas.

No se permite derivar el universo desde "lo que ya existe" en una base de datos y tratar esa observación como definición del mínimo esperado. El estado observado se compara contra el conjunto esperado; no lo define.

Cada identidad requerida aparecerá exactamente una vez en el dossier del paquete. Si dos fuentes describen la misma identidad con nombres distintos, deberán reconciliarse mediante su clave canónica o mediante una homologación explícita antes de emitir `PASS`.

#### 4. Clasificación mínima de cada identidad

Cada elemento de `required_master_set` se clasificará en una sola de estas clases semánticas:

| Clase          | Uso                                                                                                                               |
| -------------- | --------------------------------------------------------------------------------------------------------------------------------- |
| `CATALOGO`     | Lista controlada de valores permitidos o categorías consumidas por el paquete.                                                    |
| `MAESTRO`      | Entidad estable o relativamente estable que actúa como referencia operativa de otros datos o procesos.                            |
| `REFERENCIA`   | Valor o conjunto auxiliar que condiciona reglas, relaciones o interpretación sin constituir por sí mismo un maestro principal.    |
| `HOMOLOGACION` | Mapeo explícito entre identificadores canónicos VENTO y claves legacy, externas o de otro sistema cuando el contrato lo requiera. |

La clasificación no modifica el modelo de datos ni crea nuevas entidades. Sirve únicamente para impedir que una evidencia ambigua mezcle maestros, transacciones, configuración o fixtures.

#### 5. Dossier mínimo por identidad

Cada identidad requerida deberá conservar como mínimo:

| Campo                   | Regla                                                                                                            |
| ----------------------- | ---------------------------------------------------------------------------------------------------------------- |
| `package_id`            | Paquete al que pertenece la comprobación.                                                                        |
| `master_requirement_id` | Identificador estable del requerimiento de readiness dentro del dossier del paquete.                             |
| `logical_identity`      | Nombre canónico o referencia inequívoca del catálogo, maestro, referencia u homologación.                        |
| `data_class`            | `CATALOGO`, `MAESTRO`, `REFERENCIA` o `HOMOLOGACION`.                                                            |
| `required_by`           | Referencias canónicas que hacen obligatoria la identidad: `TREQ-*`, contrato, proceso o decisión aprobada.       |
| `source_of_truth`       | Sistema, repositorio lógico o servicio autoritativo que gobierna la identidad.                                   |
| `canonical_key_rule`    | Clave interna, clave canónica o regla de identidad que permite distinguir registros sin depender de texto libre. |
| `owner`                 | Propietario funcional o técnico definido por las fuentes aplicables.                                             |
| `target_environment`    | Ambiente exacto al que corresponde la evidencia.                                                                 |
| `required_scope`        | Cobertura mínima esperada: claves, registros, categorías, relaciones o subconjunto exigido por el paquete.       |
| `observed_scope`        | Cobertura observada durante la ejecución futura del gate.                                                        |
| `vigency_rule`          | Regla aplicable de activo, vigencia, estado o versión cuando exista.                                             |
| `integrity_checks`      | Controles de unicidad, completitud, consistencia, referencia u homologación que apliquen.                        |
| `evidence_refs`         | Referencias reproducibles a consultas, reportes, endpoints, manifiestos o salidas autoritativas.                 |
| `result`                | `PASS`, `FAIL`, `BLOQUEADO` o `NO_APLICA`.                                                                       |
| `blocking_reason`       | Causa concreta cuando el resultado no sea `PASS`.                                                                |

El dossier no debe almacenar secretos, credenciales, tokens, datos personales completos ni volcados productivos innecesarios. La evidencia deberá minimizar valores sensibles y conservar únicamente lo necesario para probar identidad, cobertura e integridad.

#### 6. Criterio de `PASS` por identidad

Una identidad puede recibir `PASS` únicamente cuando existe evidencia reproducible de que:

1. pertenece efectivamente al `required_master_set` del paquete;
2. existe en la fuente de verdad aprobada para el ambiente objetivo;
3. puede identificarse mediante su clave o regla canónica;
4. la cobertura observada satisface completamente el `required_scope`;
5. los registros o valores requeridos están activos, vigentes o en el estado esperado cuando exista esa dimensión;
6. no existen duplicados incompatibles con la regla de identidad;
7. las referencias obligatorias resuelven sin huérfanos dentro del alcance evaluado;
8. la completitud y consistencia exigidas por el paquete se satisfacen;
9. toda homologación requerida entre claves canónicas y legacy/externas está completa para el alcance del paquete;
10. la evidencia identifica de forma inequívoca el ambiente, la fuente autoritativa, el momento de observación y el método utilizado.

La existencia física de una tabla, colección, archivo o endpoint no demuestra por sí sola que el maestro requerido esté listo.

#### 7. Criterio de `FAIL`

Una identidad recibe `FAIL` cuando existe evidencia suficiente de cualquiera de estas condiciones:

- falta un catálogo, maestro, referencia u homologación requerido;
- falta uno o más registros o valores que forman parte del mínimo obligatorio;
- la información está en una fuente distinta de la fuente de verdad aprobada sin contrato de sincronización u homologación que lo justifique;
- existe una colisión, duplicidad o clave ambigua contraria a la identidad canónica;
- hay referencias huérfanas dentro del alcance requerido;
- la cobertura es menor que la exigida por el paquete;
- valores críticos están inactivos, vencidos o en un estado incompatible con la ventana de operación;
- una homologación requerida es parcial, contradictoria o no permite resolver una clave de forma determinista;
- el paquete depende de texto libre o de una clave legacy no homologada cuando la fuente canónica exige identificadores VENTO;
- datos creados únicamente para prueba se presentan como si fueran la línea base maestra productiva de un piloto real;
- la evidencia corresponde a otro ambiente, otra fuente de verdad o un alcance distinto del aprobado.

#### 8. Criterio de `BLOQUEADO`

Una identidad recibe `BLOQUEADO` cuando no existe evidencia suficiente para concluir `PASS` o `FAIL`, incluyendo:

- no está resuelta la fuente de verdad;
- no puede determinarse el conjunto mínimo esperado desde fuentes aprobadas;
- la identidad física, repositorio, runtime o frontera de datos del paquete continúa sin confirmar;
- el ambiente objetivo no es accesible mediante un mecanismo autorizado de comprobación;
- la evidencia disponible no permite diferenciar producción, staging, sandbox u otro ambiente;
- existe dependencia de una fuente externa todavía no activada o no demostrada;
- faltan claves canónicas o reglas de homologación necesarias para comparar esperado contra observado;
- el owner requerido no está definido en las fuentes que gobiernan esa identidad;
- la cobertura observada es parcial y no permite determinar el estado del universo requerido.

Un bloqueo no puede convertirse en `PASS` por ausencia de incidentes, por una muestra favorable ni por inferencia desde otro ambiente.

#### 9. Criterio de `NO_APLICA`

`NO_APLICA` solo es válido cuando el expediente aprobado demuestra expresamente que el paquete no requiere catálogos, maestros, referencias ni homologaciones dentro del alcance evaluado, o que una identidad inicialmente considerada queda fuera de alcance por una decisión canónica ya aprobada.

No son suficientes para declarar `NO_APLICA`:

- que no se hayan encontrado registros;
- que el paquete sea documental o de control sin revisar sus dependencias;
- que un `TREQ-*` no nombre explícitamente una tabla;
- que el ambiente todavía no esté disponible;
- que la implementación aún no haya materializado la fuente de verdad.

La ausencia de evidencia cuando la aplicabilidad es incierta produce `BLOQUEADO`, no `NO_APLICA`.

#### 10. Regla agregada por paquete

El resultado de `READY-GATE-005::<package_id>` se calcula de forma estricta:

1. cada identidad del `required_master_set` aparece exactamente una vez;
2. cualquier `FAIL` produce `FAIL` del paquete;
3. si no existe `FAIL` pero al menos una identidad está `BLOQUEADO`, el paquete queda `BLOQUEADO`;
4. el paquete obtiene `PASS` únicamente cuando todas las identidades aplicables están `PASS` y cualquier `NO_APLICA` está justificado;
5. un paquete sin identidades aplicables obtiene `NO_APLICA` solo con evidencia de alcance suficiente;
6. una muestra parcial, un subconjunto de categorías o un muestreo manual no representativo nunca se redondean a `PASS`;
7. el conteo de identidades evaluadas deberá reconciliarse con el conteo de identidades esperadas del `required_master_set`.

#### 11. Evidencia aceptable

La ejecución futura podrá utilizar evidencia autoritativa y reproducible, entre otros mecanismos:

- consultas read-only versionadas sobre la fuente de verdad;
- reportes de catálogo o maestro emitidos por el sistema autoritativo;
- respuestas de API o servicios internos que expongan identidad canónica y alcance sin revelar secretos;
- manifiestos de seed o carga inicial solo cuando correspondan al ambiente evaluado y exista trazabilidad hasta el estado observado;
- conteos y listados de claves canónicas esperadas frente a observadas;
- comprobaciones de unicidad, completitud, consistencia e integridad referencial;
- comprobaciones de vigencia o estado activo cuando sean parte del contrato;
- reportes de homologación entre claves canónicas y legacy/externas;
- evidencia de pipeline o procedimiento controlado que identifique paquete, ambiente, fuente, candidato y resultado;
- referencias durables a la salida de validadores o pruebas vinculadas a `TREQ-*`.

La evidencia deberá registrar como mínimo ambiente, fuente de verdad, momento de observación, método, universo esperado, universo observado, resultado y referencias durables.

#### 12. Evidencia insuficiente por sí sola

No constituye prueba suficiente:

- una captura de pantalla sin identidad reproducible de ambiente y fuente;
- que una tabla o colección exista;
- que un seed o fixture exista en el repositorio;
- que una migración haya terminado correctamente;
- que un pipeline esté verde sin demostrar contenido y cobertura del maestro;
- una fila de ejemplo;
- un conteo sin definición del universo esperado;
- una exportación sin fecha, fuente o ambiente;
- una consulta manual no conservada ni reproducible;
- una lista de nombres sin claves canónicas cuando estas sean obligatorias;
- asumir que un valor legacy equivale al canónico sin homologación demostrada;
- datos sintéticos, sanitizados o de prueba usados como sustituto de la línea base productiva requerida para el piloto;
- la planificación documental de `DELIV-PKG-016` o `DELIV-PKG-022` sin evidencia del estado materializado.

#### 13. Política por ambiente y datos de prueba

En CI, local, staging o sandbox pueden utilizarse fixtures deterministas, sintéticos o sanitizados cuando el contrato de pruebas del paquete lo autorice. Esos datos pueden demostrar que el software soporta un catálogo o maestro, pero no prueban por sí solos que la línea base del ambiente productivo o del piloto esté preparada.

Para un piloto productivo:

1. los maestros o referencias exigidos deberán corresponder a datos legítimos y aprobados para la operación ordinaria;
2. no se sembrarán datos productivos únicamente para obtener un `PASS` de readiness;
3. los datos transaccionales que el flujo empresarial deba crear durante el piloto nacerán mediante dicho flujo y no se precrearán como evidencia artificial;
4. un backfill, seed productivo o corrección necesaria para disponer de un maestro deberá tener su propia autorización, trazabilidad y gate aplicable; `READY-GATE-005` no autoriza esa ejecución;
5. el gate puede consumir el estado resultante de una operación ya autorizada y ejecutada, pero no sustituye la evidencia de `READY-GATE-002` cuando esa operación haya modificado datos existentes.

#### 14. Casos especiales

##### 14.1. Paquetes AURA con identidad física no resuelta

Si repositorio, runtime, fuente de datos o identidad física continúan `NO_CONFIRMADO`, el gate permanece `BLOQUEADO`. No se inventan catálogos, tablas, seeds, owners ni fuentes de verdad para cerrar el expediente.

##### 14.2. Paquetes TALENTO fuera de la línea actual

Un paquete TALENTO que continúe formalmente fuera de la línea de ejecución actual no obtiene `PASS` por anticipación. Puede recibir `NO_APLICA` para la línea actual únicamente cuando el expediente demuestre que no participa en el piloto vigente; su readiness material se evaluará en la activación autorizada correspondiente.

##### 14.3. Dependencias externas condicionadas

Cuando el maestro dependa de una fuente externa gobernada por una condición de activación, el gate queda `BLOQUEADO` hasta demostrar la activación y la identidad de la fuente. No se sustituye con una copia manual o un dataset local no autorizado.

##### 14.4. Paquetes sin cambio físico directo

Un paquete identificado canónicamente como sin cambio físico directo puede recibir `NO_APLICA` solo si su expediente demuestra además que no introduce ni consume un mínimo maestro adicional para la operación evaluada. Esa condición no se presume por el tipo de paquete.

##### 14.5. Homologaciones legacy o externas

Cuando la operación autorizada dependa de claves legacy o de terceros, el gate no exige reemplazarlas físicamente si el contrato aprobado conserva esa fuente, pero sí exige una relación inequívoca con la identidad canónica cuando `TREQ-DATA-001` lo requiera. Una homologación parcial para el universo del piloto bloquea o falla según la evidencia disponible.

#### 15. Separación entre planificación y ejecución

`READY-GATE-005` deja definido el contrato que `SHELL-CI-021::<package_id>` deberá ejecutar después de que `SHELL-CI-020::<package_id>` y las tareas de implementación aplicables hayan materializado las fuentes, datos y contratos requeridos.

La secuencia permanece:

`E5-GATE-008::<package_id> -> SHELL-CI-020::<package_id> -> BLOQUE R aplicable -> SHELL-CI-021::<package_id> -> SHELL-CI-022::<package_id>`

Durante `SHELL-CI-021::<package_id>` se construirá el `required_master_set`, se recopilará la evidencia real del ambiente objetivo y se emitirá el resultado. Esta tarea no crea, carga, corrige ni valida físicamente ningún catálogo o maestro.

#### Requisitos de prueba derivados

**Resultado:** NO GENERA REQUISITOS DE PRUEBA

**Justificación:** `READY-GATE-005` operacionaliza para readiness obligaciones ya registradas sobre catálogo único de datos maestros, claves canónicas, fuente de verdad, vigencia, integridad, completitud, consistencia y homologación. No introduce una nueva regla empresarial, una entidad adicional ni un comportamiento ejecutable distinto; define qué evidencia deberá demostrar posteriormente el cumplimiento de requisitos existentes por paquete.

**Requisitos existentes consumidos:** `TREQ-DATA-001` y `TREQ-DATA-003`.

**Requisitos TREQ-* creados:** 0  
**Requisitos TREQ-* modificados:** 0  
**Fragmentos 04A afectados:** 0

#### 16. Criterios de aceptación documental

`READY-GATE-005` queda documentalmente completo cuando:

1. define cómo derivar el universo exhaustivo de catálogos y datos maestros mínimos por paquete desde fuentes aprobadas;
2. impide usar el estado observado del ambiente como sustituto de la definición del universo esperado;
3. clasifica de forma inequívoca catálogos, maestros, referencias y homologaciones sin mezclar transacciones, secretos o fixtures;
4. establece un dossier mínimo trazable por identidad con fuente de verdad, clave canónica, owner, ambiente, cobertura, vigencia, integridad, evidencia y resultado;
5. define `PASS`, `FAIL`, `BLOQUEADO` y `NO_APLICA` sin permitir cierre por muestra parcial o inferencia;
6. exige reconciliar el número de identidades esperadas contra las evaluadas;
7. cubre unicidad, completitud, consistencia, referencias, vigencia y homologación cuando apliquen;
8. diferencia evidencia reproducible de señales insuficientes como tabla existente, seed presente, screenshot o pipeline verde;
9. separa expresamente fixtures de prueba de la línea base maestra requerida para un piloto productivo;
10. conserva `READY-GATE-002`, `READY-GATE-004` y `READY-GATE-006` como fronteras independientes;
11. mantiene AURA y dependencias externas bloqueadas cuando su identidad o fuente de verdad no estén confirmadas;
12. genera cero cambios `TREQ-*` y no requiere actualización del registro 04A;
13. no ejecuta cambios de datos, Supabase, configuración, despliegue ni validación operativa;
14. reserva exclusivamente `READY-GATE-006` como siguiente tarea.

#### 17. Continuidad canónica

##### ÚLTIMA TAREA APROBADA

`READY-GATE-004 — Definir criterio y evidencia para confirmar usuarios, roles, sedes, áreas y turnos requeridos`

##### TAREA ACTUAL APROBADA

`READY-GATE-005 — Definir criterio y evidencia para confirmar catálogos y datos maestros mínimos`

##### SIGUIENTE TAREA RESERVADA

`READY-GATE-006 — Definir criterio y evidencia para confirmar integraciones y credenciales del ambiente`


### ✅ READY-GATE-006 — Definir criterio y evidencia para confirmar integraciones y credenciales del ambiente

**Estado:** APROBADA
**Tarea anterior:** READY-GATE-005 — Definir criterio y evidencia para confirmar catálogos y datos maestros mínimos
**Tarea siguiente:** READY-GATE-007 — Definir criterio y evidencia para confirmar hardware, red, escáneres e impresoras
**Tipo de tarea:** Documental — definición normativa del criterio de readiness y del expediente mínimo de evidencia para confirmar que las integraciones requeridas por un paquete están configuradas en el ambiente objetivo con contrato, binding, principal técnico y credenciales coherentes, segregadas y utilizables; sin crear, revelar, rotar o revocar credenciales, modificar proveedores, desplegar integraciones, ejecutar llamadas productivas con efecto, cambiar configuración remota ni modificar Supabase

#### 1. Propósito

Definir el criterio verificable y el expediente mínimo que `SHELL-CI-021::<package_id>` deberá ejecutar para confirmar, después de `SHELL-CI-020::<package_id>` y de las tareas de implementación aplicables, que las integraciones necesarias para operar el alcance del paquete durante el piloto:

1. corresponden al contrato y al ambiente aprobados;
2. usan la identidad técnica, binding, endpoint, canal, versión y estrategia de intercambio esperados;
3. disponen del material de credencial o configuración que realmente corresponda a cada superficie, sin convertir todo `key`, `token`, `dsn` o `id` en un secreto genérico;
4. conservan separación por ambiente, principal, binding, dirección y privilegio cuando aplique;
5. no reutilizan material de credencial entre integraciones independientes;
6. pueden demostrar autenticación, conectividad contractual y resultado técnico mediante evidencia reproducible y segura, sin exponer secretos ni confundir un `200`, ACK o health check con éxito empresarial;
7. permanecen alineadas con los contratos de idempotencia, autenticidad, correlación, retry, conciliación y propiedad que el paquete ya haya declarado aplicables.

`READY-GATE-006` diseña el gate. No crea cuentas, principals, credenciales, secretos, certificados, API keys, OAuth clients, webhooks, endpoints, topics, colas, proveedores ni proyectos. Tampoco rota o revoca material existente, modifica configuración remota, ejecuta DDL/DML, despliega funciones o cambia Supabase.

#### 2. Alcance y frontera del gate

`READY-GATE-006` responde exclusivamente a esta pregunta:

> ¿Cada integración que el paquete necesita para entrar al piloto está materializada en el ambiente objetivo con identidad, contrato, configuración y credenciales verificables, y puede demostrar una interacción técnica controlada sin ampliar autoridad, cruzar ambientes, compartir material sensible ni presentar telemetría como resultado empresarial?

El gate se evalúa por `package_id`, ambiente objetivo e integración requerida. Una misma integración puede tener varias superficies de credencial; cada una deberá evaluarse de forma independiente antes del resultado agregado.

Este gate no sustituye ni anticipa:

- `READY-GATE-001`: correlación del código desplegado;
- `READY-GATE-002`: migraciones aplicadas, drift y validación de datos;
- `READY-GATE-003`: permisos, matrices y configuración lógica de dispositivos;
- `READY-GATE-004`: usuarios, roles, sedes, áreas y turnos;
- `READY-GATE-005`: catálogos y datos maestros mínimos;
- `READY-GATE-007`: hardware, red, escáneres e impresoras;
- `READY-GATE-008`: procedimientos operativos y contingencias;
- `READY-GATE-009`: capacitación y material de apoyo;
- `READY-GATE-010`: mesa de soporte, responsables y escalamiento;
- `READY-GATE-011`: monitoreo, métricas y alertas;
- `READY-GATE-012`: respaldo y rollback probados;
- `READY-GATE-013`: línea base previa al piloto;
- `READY-GATE-014`: riesgos aceptados y condiciones de suspensión;
- `READY-GATE-015`: autoridad y criterio final de entrada al piloto.

La disponibilidad de red física o periféricos se conserva en `READY-GATE-007`. La observabilidad integral y las alertas se conservan en `READY-GATE-011`. La reversión y recuperación probadas se conservan en `READY-GATE-012`.

#### 3. Fuentes vinculantes para determinar el conjunto esperado

La ejecución futura deberá derivar el conjunto esperado de integraciones antes de observar el ambiente. Como mínimo deberá reconciliar, cuando apliquen:

- `DELIV-PKG-010`, que define por paquete eventos, productores, consumidores, entrega, idempotencia, retry, trabajo asíncrono, colas, DLQ, compensación y conciliación;
- `DELIV-PKG-011` cuando notificaciones, documentos o canales dependan de una integración o proveedor;
- `DELIV-PKG-014` y `DELIV-PKG-015` para identidad física, archivos, componentes, dependencias, SDK, toolchain, precondiciones y orden;
- `DELIV-PKG-016` para `TREQ-*`, niveles de prueba, fixtures, comandos, ambientes, responsables y evidencia esperada;
- `DELIV-PKG-018` para configuración y feature flags, sin convertir valores secretos en configuración documental;
- `DELIV-PKG-019` para ambiente, rollout y secuencia de promoción;
- `DELIV-PKG-023` para criterios medibles de aceptación y manifiesto de evidencia;
- `DELIV-PKG-025` para la decisión final del expediente;
- `INT-APP-001..010` para contratos entre aplicaciones, propiedad, consumidoras, idempotencia, retry, compensación, auditoría, recuperación y prohibición de escrituras cruzadas sin contrato;
- `INT-EXT-001..020` para inventario externo, principal técnico, procedencia de credenciales, autenticación, alcance, separación por ambiente, custodia, lifecycle, contratos externos, autenticidad, idempotencia, mapeo, retry, cuarentena, auditoría, contingencia, retiro y segregación de credenciales;
- las tareas de implementación realmente incluidas en el mismo `package_id`.

La lista observada de variables de entorno, secrets, webhooks, endpoints o cuentas no define el universo esperado. Primero se construye `required_integration_set` desde el expediente aprobado y después se reconcilia contra el ambiente.

Si el expediente no permite determinar qué integración es necesaria, qué contrato consume, qué ambiente utiliza, quién es su principal técnico o qué superficie de credencial corresponde, el resultado será `BLOQUEADO`; el gate no completará esos datos por inferencia.

#### 4. Universo canónico externo y regla de incorporación

El baseline documental vigente de integraciones externas contiene **21 identidades `EXT-SYS-001` a `EXT-SYS-021`** dentro de `VENTO-EXTERNAL-SYSTEM-INVENTORY-001`.

Esas 21 identidades son un inventario de sistemas y plataformas reconocidos, no una lista de integraciones obligatorias para todos los paquetes ni evidencia de disponibilidad productiva.

Para una dependencia externa requerida por un paquete:

1. deberá resolverse contra una identidad `EXT-SYS-*` ya aprobada o contra una identidad canónica posterior expresamente versionada;
2. `BINDING_TECNICO_OBSERVADO`, `BINDING_CONDICIONAL_OBSERVADO` o `CONFIGURACION_OBSERVADA` son antecedentes documentales, no resultados de readiness;
3. `DOCUMENTADO_SIN_BINDING_ACREDITADO` y `PROVEEDOR_NO_ACREDITADO` no pueden recibir `PASS` mientras el paquete dependa materialmente de esa integración;
4. una plataforma nueva observada en código o configuración no se incorpora silenciosamente al inventario durante este gate; deberá volver a la tarea propietaria que gobierne su identidad y binding;
5. un proveedor externo nunca adquiere propiedad del hecho empresarial por autenticar, transportar, recibir, enviar o confirmar una interacción técnica.

#### 5. Dos planos obligatorios e independientes

Toda integración requerida se evalúa mediante dos planos:

| Plano                 | Pregunta de readiness                                                                                                                                                               | Regla                                                                                                                                                                                                     |
| --------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `INTEGRATION_BINDING` | ¿El contrato, binding, principal, ambiente, endpoint o canal y estrategia de intercambio observados corresponden exactamente a lo aprobado?                                         | Obligatorio para toda integración requerida.                                                                                                                                                              |
| `CREDENTIAL_SURFACE`  | ¿Cada superficie de credencial, configuración publicable, referencia o identificador técnico está correctamente clasificada, custodiada, segregada, vigente y vinculada al binding? | Obligatorio cuando la integración posee una o más superficies; puede ser `NO_APLICA` únicamente si el canon demuestra `NO_SECRET_APPLICABLE` o ausencia real de material de credencial para esa frontera. |

Un `PASS` en un plano no compensa `FAIL` o `BLOQUEADO` en el otro.

La prueba conductual empresarial completa de la integración continúa en los `TREQ-*` y pruebas definidos por `DELIV-PKG-016`; este gate confirma que la frontera técnica necesaria para ejecutar esas pruebas está preparada y atribuible.

#### 6. Contrato de evidencia de `INTEGRATION_BINDING`

Cada integración requerida deberá conservar como mínimo:

| Campo                              | Regla                                                                                            |
| ---------------------------------- | ------------------------------------------------------------------------------------------------ |
| `package_id`                       | Identidad canónica exacta del paquete.                                                           |
| `integration_requirement_ref`      | Referencia al contrato, evento, dependencia o decisión del expediente que obliga la integración. |
| `external_system_id`               | `EXT-SYS-*` cuando la contraparte sea externa; no se inventa para una integración interna.       |
| `integration_contract_ref`         | Contrato canónico que gobierna entrada, salida o intercambio.                                    |
| `contract_version`                 | Versión esperada por el paquete cuando exista versionado.                                        |
| `producer_or_caller_ref`           | Productor, emisor o iniciador técnico autorizado.                                                |
| `consumer_or_destination_ref`      | Consumidor, receptor o destino aprobado.                                                         |
| `technical_principal_ref`          | Principal técnico independiente que ejecuta el binding cuando aplique.                           |
| `target_environment`               | Ambiente VENTO exacto que se está verificando.                                                   |
| `expected_endpoint_or_channel_ref` | Referencia no sensible al endpoint, canal, webhook, SDK, función, cola o mecanismo esperado.     |
| `observed_endpoint_or_channel_ref` | Fuente autoritativa read-only del binding observado.                                             |
| `exchange_strategy`                | Webhook, polling, híbrida, request/response, evento, job o modalidad canónica aplicable.         |
| `auth_profile_ref`                 | Mecanismo o perfil de autenticación/autenticidad aprobado cuando aplique.                        |
| `idempotency_profile_ref`          | Contrato de idempotencia aplicable cuando exista efecto reintentable.                            |
| `retry_profile_ref`                | Perfil de retry, rate limit o backoff aplicable cuando corresponda.                              |
| `contract_probe_ref`               | Evidencia de una comprobación controlada de conectividad y contrato.                             |
| `observed_at`                      | Momento verificable de la observación.                                                           |
| `evidence_refs`                    | Referencias durables y sanitizadas.                                                              |
| `result`                           | `PASS`, `FAIL`, `BLOQUEADO` o `NO_APLICA`.                                                       |
| `blocking_reason`                  | Motivo concreto cuando no exista `PASS`.                                                         |

Los nombres de campos definen contenido mínimo del expediente; no obligan a una tabla, proveedor o tecnología física concreta.

##### 6.1. Reglas obligatorias del binding

Para `PASS`:

1. la integración deberá estar justificada por el paquete y no aparecer únicamente porque exista configuración residual;
2. el ambiente observado deberá coincidir con `target_environment`;
3. el sistema, proveedor o contraparte deberán coincidir con la identidad aprobada;
4. el contrato y su versión deberán ser compatibles con productor y consumidor;
5. el principal técnico deberá corresponder al binding y no a una identidad humana, dispositivo o cuenta compartida impropia;
6. el endpoint, canal o mecanismo observado deberá corresponder al contrato y al ambiente;
7. una integración externa deberá conservar la frontera entre afirmación externa y hecho interno; el proveedor no se convierte en fuente de verdad VENTO por emitir un callback, receipt o status;
8. cuando el intercambio sea reintentable o asíncrono, deberán existir las referencias a idempotencia, retry, autenticidad, conciliación y tratamiento de errores que el paquete haya declarado aplicables;
9. una configuración manual observada no versionada o sin propietario no se vuelve canónica por funcionar;
10. una integración adicional activa fuera del conjunto autorizado deberá producir `FAIL` cuando la evidencia demuestre que participa en el alcance del paquete.

#### 7. Prueba controlada de preparación de la integración

La ejecución futura de `SHELL-CI-021::<package_id>` deberá usar una prueba de readiness proporcional al contrato.

Una prueba válida deberá:

1. identificar paquete, ambiente, integración, contrato, principal técnico y candidato;
2. comprobar resolución del destino o canal desde la superficie autorizada;
3. comprobar autenticación o autenticidad sin revelar el material sensible;
4. comprobar que la versión o contrato esperado es aceptado;
5. producir un resultado técnico inequívoco y correlacionable;
6. evitar efectos empresariales reales cuando exista una alternativa read-only, dry-run, sandbox o fixture controlado;
7. cuando una prueba con efecto sea indispensable, ejecutarse únicamente en el ambiente, cuenta, dato y procedimiento expresamente autorizados por el paquete;
8. conservar correlación, resultado, timestamp y evidencia sanitizada;
9. no interpretar un health check genérico, DNS resuelto, socket abierto, `200`, ACK, span, log o dashboard verde como demostración del resultado empresarial de la integración.

Esta tarea no ejecuta esa prueba. Solo define lo que la ejecución posterior deberá demostrar.

#### 8. Taxonomía canónica de superficies de credencial

`READY-GATE-006` preserva `VENTO-EXTERNAL-SECRET-CUSTODY-CONTRACT-001`. No se permite reducir todas las superficies a “secreto” ni tratar todo material visible en cliente como credencial universal.

| Clase                             | Tratamiento de readiness                                                                                                                                               |
| --------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `SECRET_STATIC_SERVER_SIDE`       | Debe existir referencia a custodia server-side autorizada, binding, ambiente, principal, lifecycle y alcance; el valor nunca aparece en evidencia.                     |
| `SECRET_DYNAMIC_VERIFIER`         | Se verifica que el mecanismo use un verificador apropiado cuando no sea necesario recuperar el original y que el valor original no se conserve indebidamente.          |
| `SECRET_DYNAMIC_RECOVERABLE`      | Debe existir custodia cifrada separada y referencia no sensible porque el mismo valor necesita recuperarse o presentarse nuevamente.                                   |
| `PUBLIC_CREDENTIAL_RESTRICTED`    | Puede ser visible en cliente, pero debe demostrar restricciones por binding, ambiente, aplicación, dominio, bundle, API, cuota o controles equivalentes del proveedor. |
| `PUBLIC_CONFIGURATION`            | Se trata como configuración versionable o publicable, no como secreto ocultable; debe coincidir con el binding y ambiente esperados.                                   |
| `CREDENTIAL_REFERENCE`            | Es una referencia no sensible; deberá resolver al material correcto sin contenerlo ni cambiar silenciosamente según consumidor.                                        |
| `DESTINATION_TOKEN_OR_IDENTIFIER` | Se trata según sensibilidad y privacidad; no se presenta como secreto que autentica a VENTO frente al proveedor.                                                       |
| `NO_SECRET_APPLICABLE`            | El binding no requiere material secreto externo actual; no se inventa secret store ni credencial para cerrar el gate.                                                  |

Una integración puede tener varias clases simultáneamente. Cada superficie materialmente distinta deberá tener su propia decisión.

#### 9. Contrato de evidencia de `CREDENTIAL_SURFACE`

Para cada superficie aplicable deberá registrarse, sin incluir el valor secreto:

| Campo                           | Regla                                                                                                                                      |
| ------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------ |
| `package_id`                    | Paquete evaluado.                                                                                                                          |
| `binding_ref`                   | Binding exacto al que pertenece la superficie.                                                                                             |
| `external_system_id`            | Identidad externa cuando aplique.                                                                                                          |
| `technical_principal_ref`       | Principal técnico que consume o valida la credencial.                                                                                      |
| `credential_reference`          | `ExternalCredentialId`, referencia de secret manager, identificador de proveedor o referencia equivalente cuando exista; nunca el secreto. |
| `credential_class`              | Una de las clases aprobadas por la taxonomía vigente.                                                                                      |
| `issuer_class`                  | Procedencia aprobada: proveedor, VENTO o condición documental equivalente ya definida; no se infiere.                                      |
| `authentication_mechanism`      | API key, OAuth, HMAC, certificado u otro mecanismo aprobado; no se elige durante el gate.                                                  |
| `target_environment`            | `development`, `staging`, `production` o ambiente VENTO canónico aplicable.                                                                |
| `expected_scope_ref`            | Alcance mínimo aprobado para esa superficie.                                                                                               |
| `custody_ref`                   | Referencia a custodia, configuración pública o mecanismo que corresponda a la clase.                                                       |
| `provider_credential_id`        | Identidad no sensible emitida por el proveedor, key ID, client ID, certificate serial/fingerprint público o equivalente cuando exista.     |
| `issued_or_activated_at`        | Momento conocido de emisión o activación cuando el proveedor lo exponga.                                                                   |
| `expires_at`                    | Expiración cuando exista.                                                                                                                  |
| `rotation_state`                | Estado del lifecycle aplicable y referencia a sucesor/predecesor si existe rotación controlada.                                            |
| `revocation_state`              | Evidencia de que el material requerido no está revocado ni retirado.                                                                       |
| `environment_separation_result` | Resultado de comprobar aislamiento entre ambientes.                                                                                        |
| `scope_result`                  | Resultado de comprobar mínimo privilegio y ausencia de ampliación.                                                                         |
| `binding_isolation_result`      | Resultado de comprobar que el material pertenece al binding esperado.                                                                      |
| `shared_credential_result`      | Resultado de detectar o descartar compartición prohibida con evidencia suficiente.                                                         |
| `secret_exposure_result`        | Resultado de comprobar que evidencia, repositorio, contratos y logs no exponen material secreto.                                           |
| `authentication_probe_ref`      | Prueba controlada que demuestra usabilidad cuando sea necesaria.                                                                           |
| `evidence_refs`                 | Referencias durables y sanitizadas.                                                                                                        |
| `result`                        | `PASS`, `FAIL`, `BLOQUEADO` o `NO_APLICA`.                                                                                                 |
| `blocking_reason`               | Motivo concreto cuando no exista `PASS`.                                                                                                   |

`ExternalCredentialId` es una referencia no sensible y no equivale al valor material. Dos referencias distintas no demuestran por sí solas que existan dos materiales distintos.

#### 10. Segregación obligatoria de credenciales

La ejecución futura deberá demostrar, cuando aplique:

1. **ambiente:** `development`, `staging` y `production` usan material independiente;
2. **binding:** el mismo material aceptado por la autoridad externa no se usa en dos bindings independientes;
3. **principal técnico:** principals independientes no comparten un secreto por conveniencia;
4. **dirección:** inbound, outbound, administración, firma y tokens de recurso permanecen separados cuando el contrato los diferencia;
5. **privilegio:** una credencial read-only no se reutiliza como write y una credencial operativa no se usa para administración cuando existe una alternativa de menor privilegio;
6. **proveedor externo:** `service_role` de Supabase no se entrega a proveedores externos ni clientes;
7. **cuotas:** la separación de credenciales no se usa para evadir rate limits o cuotas del proveedor;
8. **credencial publicable:** `PUBLIC_CREDENTIAL_RESTRICTED` conserva aislamiento de binding aunque el valor pueda ser inspeccionable en cliente;
9. **referencias:** nombres de variables, aliases o dos `ExternalCredentialId` diferentes no son prueba concluyente de que el material esté aislado;
10. **rotación:** predecesor y sucesor pueden coexistir temporalmente dentro del mismo binding si el lifecycle aprobado lo permite; ese solapamiento no constituye compartición entre integraciones;
11. **retiro:** un material revocado no puede mantenerse como fallback silencioso;
12. **compromiso:** una credencial comprometida o razonablemente no confiable no obtiene `PASS` por conservar continuidad operacional.

Existe `SHARED_CREDENTIAL_DETECTED` cuando evidencia suficiente demuestra que el mismo material de credencial aceptado por la autoridad externa está siendo utilizado por más de un binding independiente.

La comprobación de aislamiento deberá usar referencias, identificadores de proveedor, metadata de custodia o mecanismos controlados que permitan verificar igualdad o separación sin registrar valores secretos. No se exige ni se autoriza copiar secretos al expediente para compararlos.

#### 11. Vigencia, rotación, expiración y revocación

Para obtener `PASS`, una superficie que dependa de lifecycle deberá demostrar:

1. material activo y no revocado para el ambiente y binding evaluados;
2. expiración conocida cuando el proveedor la exponga, o evidencia del régimen de vigencia cuando no exista expiración automática;
3. alcance temporal compatible con la ventana de readiness y entrada al piloto;
4. rotación pendiente identificada antes de que convierta el material en inválido;
5. sucesor y predecesor asociados al mismo binding durante un solapamiento autorizado;
6. ausencia de fallback indefinido a material anterior;
7. retiro y revocación coherentes con `INT-EXT-008`, `INT-EXT-019` e `INT-EXT-020`;
8. si una integración se retira, ninguna credencial se revoca ciegamente cuando todavía exista otro consumidor autorizado que dependa de ella; primero deberá resolverse la compartición prohibida.

Una credencial expirada, revocada, perteneciente a otro ambiente, principal o binding produce `FAIL` cuando la evidencia es suficiente. Si el proveedor o custodia no permiten determinar su vigencia de forma autorizada, el resultado será `BLOQUEADO`, no `PASS` por ausencia de error visible.

#### 12. Autenticidad, contratos y datos intercambiados

La disponibilidad de una credencial no certifica la integración completa.

Cuando el contrato lo exija, el gate deberá confirmar que existen las precondiciones para ejecutar y evidenciar:

- firma, MAC, origen, timestamp y protección contra replay;
- `external_event_id`, `receipt_id` o identidad técnica estable;
- payload original protegido o evidencia fuente controlada;
- versión del contrato y transformación;
- mapeo entre identificadores externos y canónicos;
- idempotencia y deduplicación;
- rate limit, retry, backoff y tratamiento de `Retry-After`;
- cuarentena o dead-letter cuando corresponda;
- conciliación y resultado desconocido;
- separación entre ACK técnico y efecto empresarial.

El gate no reimplementa esas políticas. Comprueba que el binding que entrará al piloto referencia las versiones y controles ya aprobados y que la prueba posterior puede ejecutarlos en el ambiente objetivo.

#### 13. Reglas de decisión

##### 13.1. Resultado de `INTEGRATION_BINDING`

| Resultado   | Condición                                                                                                                                                                                                                                                 |
| ----------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `PASS`      | El conjunto esperado es inequívoco; sistema, contrato, versión, principal, ambiente, endpoint/canal y estrategia coinciden con fuentes autoritativas; la prueba controlada aplicable demuestra que la frontera técnica está utilizable y correlacionable. |
| `FAIL`      | Existe evidencia suficiente de ambiente incorrecto, endpoint/canal distinto, contrato incompatible, principal incorrecto, proveedor no autorizado, binding residual activo, autenticidad incumplida o integración distinta de la aprobada.                |
| `BLOQUEADO` | No puede determinarse el binding esperado u observado, falta identidad física, no existe acceso autorizado a la metadata necesaria, el proveedor/binding sigue no acreditado o la prueba requerida no puede realizarse de forma segura y autorizada.      |
| `NO_APLICA` | El expediente aprobado demuestra que el paquete no requiere esa integración para el alcance evaluado.                                                                                                                                                     |

##### 13.2. Resultado de `CREDENTIAL_SURFACE`

| Resultado   | Condición                                                                                                                                                                                                                                                                                                   |
| ----------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `PASS`      | La clase es correcta, la referencia resuelve al binding esperado, ambiente, principal, mecanismo, alcance, custodia y lifecycle son coherentes, no existe compartición prohibida y la usabilidad puede demostrarse sin revelar el material.                                                                 |
| `FAIL`      | Existe evidencia suficiente de credencial ausente cuando es obligatoria, expirada, revocada, de otro ambiente, alcance excesivo o insuficiente, custodia incompatible, clasificación errónea, secreto expuesto, material compartido, `service_role` entregada a tercero o restricción pública insuficiente. |
| `BLOQUEADO` | La superficie esperada, referencia, material, custodia, lifecycle, aislamiento o restricciones del proveedor no pueden determinarse con evidencia autorizada y reproducible.                                                                                                                                |
| `NO_APLICA` | La fuente canónica demuestra `NO_SECRET_APPLICABLE` o que esa frontera no requiere la superficie evaluada.                                                                                                                                                                                                  |

#### 14. Resultado agregado por integración y por paquete

##### 14.1. Por integración

1. Toda integración requerida deberá aparecer exactamente una vez como identidad principal en `required_integration_set`.
2. Todas sus superficies de credencial deberán estar enumeradas sin duplicar el mismo material como si fueran bindings independientes.
3. Si `INTEGRATION_BINDING` obtiene `FAIL`, la integración obtiene `FAIL`.
4. Si alguna superficie obligatoria obtiene `FAIL`, la integración obtiene `FAIL`.
5. Si no existe `FAIL` pero algún plano o superficie obtiene `BLOQUEADO`, la integración obtiene `BLOQUEADO`.
6. La integración obtiene `PASS` únicamente cuando el binding y todas las superficies aplicables obtienen `PASS` y todo `NO_APLICA` está sustentado.
7. Una credencial válida no compensa un binding incorrecto; un binding correcto no compensa una credencial inválida.

##### 14.2. Por paquete

1. El conjunto esperado se deriva del expediente antes de consultar el ambiente.
2. Si falta una integración obligatoria cuyo requerimiento está demostrado, el paquete obtiene `FAIL`.
3. Si no puede determinarse el universo esperado, el paquete obtiene `BLOQUEADO`.
4. Si cualquier integración obtiene `FAIL`, `READY-GATE-006::<package_id>` obtiene `FAIL`.
5. Si no existe `FAIL` pero alguna integración obtiene `BLOQUEADO`, el paquete obtiene `BLOQUEADO`.
6. El paquete obtiene `PASS` solo cuando todas las integraciones requeridas obtienen `PASS`.
7. Un paquete sin integraciones para el alcance evaluado podrá obtener `NO_APLICA` únicamente cuando el expediente lo demuestre explícitamente.
8. Una muestra parcial de integraciones, ambientes o credenciales nunca se redondea a `PASS`.

#### 15. Evidencia aceptable

La ejecución futura podrá utilizar, según la integración y sin revelar secretos:

- manifiestos versionados de integración, contratos, schema versions y bindings;
- metadata autoritativa de endpoint, webhook, client, aplicación, tenant, proyecto o canal;
- identidad de principal técnico y su relación con el binding;
- referencias de secret manager, vault o custodia equivalente sin valor material;
- identificadores no sensibles emitidos por el proveedor, como client ID, key ID, serial o fingerprint de certificado público cuando corresponda;
- metadata de expiración, activación, revocación y rotación;
- configuración de restricciones de una `PUBLIC_CREDENTIAL_RESTRICTED`;
- consultas o exportes read-only de configuración con ambiente y origen identificables;
- pruebas contractuales, de integración o smoke controladas definidas por `DELIV-PKG-016`;
- evidencia de firma/autenticidad, idempotencia, receipt, correlación o reconciliación cuando el contrato lo requiera;
- resultados de validadores canónicos de la taxonomía y de contratos de integración;
- referencias a evidencias del proveedor que permitan repetir la comprobación.

Toda evidencia deberá identificar como mínimo paquete, ambiente, binding o integración, fecha u origen verificable, método, resultado y referencia durable.

No deberá registrar valores de secretos, private keys, passwords, bearer tokens, service-role keys, refresh tokens, firmas completas, códigos de recuperación ni payloads sensibles completos cuando una referencia protegida sea suficiente.

#### 16. Evidencia insuficiente por sí sola

No constituye prueba suficiente de readiness:

- que exista una variable de entorno con el nombre esperado;
- que un secret esté enmascarado en una interfaz;
- que dos variables tengan nombres distintos;
- que exista un endpoint o webhook registrado;
- que DNS resuelva o un puerto abra;
- que un health check devuelva verde;
- que una petición genérica devuelva `200`;
- que un proveedor muestre la cuenta como activa;
- que una credencial no esté expirada sin comprobar binding, ambiente y alcance;
- que un dashboard muestre tráfico;
- que un SDK esté instalado;
- que una API key visible en cliente sea tratada como secreta sin comprobar las restricciones que realmente la protegen;
- que dos `ExternalCredentialId` apunten a referencias distintas sin demostrar aislamiento del material;
- un screenshot sin fuente reproducible;
- un correo o mensaje del proveedor afirmando que “está listo” sin metadata correlacionable;
- un resultado de development o staging para justificar production;
- una prueba local para justificar el ambiente objetivo;
- la aprobación documental de `INT-EXT-*`, `INT-APP-*` o `DELIV-PKG-*` sin evidencia del estado materializado;
- la existencia de un ACK técnico como sustituto del efecto empresarial.

#### 17. Casos especiales

##### 17.1. Integración externa documentada pero sin binding acreditado

Si el paquete depende de una identidad marcada `DOCUMENTADO_SIN_BINDING_ACREDITADO` o `PROVEEDOR_NO_ACREDITADO`, el resultado es `BLOQUEADO` hasta que la tarea propietaria materialice la identidad técnica necesaria. El gate no selecciona proveedor ni endpoint por conveniencia.

##### 17.2. Credenciales publicables

Para Sentry, Google Maps u otra superficie que el canon clasifique como publicable, readiness no depende de ocultar el valor. Depende de que la clase sea correcta y las restricciones de binding, ambiente, aplicación, dominio, bundle, APIs o cuota sean verificables. Una contraparte privada asociada conserva su propio binding y lifecycle.

##### 17.3. OAuth o credenciales dinámicas

El access token efímero no se trata automáticamente como identidad estable del binding. El expediente deberá conservar client/principal, issuer, audience, scopes, mecanismo de renovación y referencia de la credencial raíz o sesión técnica que corresponda, sin registrar tokens reutilizables.

##### 17.4. Certificados y claves asimétricas

Un certificado público, serial, key ID o fingerprint público puede servir como evidencia de identidad. La clave privada asociada permanece material secreto y no forma parte del expediente. Validez, cadena, ambiente y binding deberán ser coherentes con el contrato.

##### 17.5. Webhooks inbound

Un webhook registrado no obtiene `PASS` por existir. Deberá poder demostrar endpoint correcto, ambiente, contrato, autenticidad, replay protection cuando aplique, identidad externa, correlación y tratamiento idempotente previsto.

##### 17.6. Supabase como sistema externo

Cuando el binding use Supabase, `READY-GATE-006` conserva la separación entre `anon`/public configuration, principals, service-role y demás superficies aprobadas. `service_role` nunca se entrega a un proveedor externo ni cliente. Las migraciones y cambios de Supabase pertenecen a `vento-shell` y su aplicación se evalúa en `READY-GATE-002`; este gate solo comprueba que el binding y las credenciales que el paquete requiere están correctamente configurados y segregados.

##### 17.7. AURA y otras dependencias diferidas

Una integración definida pero diferida no se presenta como operativa. Cuando el paquete dependa de una superficie cuyo repositorio, binding o autorización permanezca bloqueado por su línea canónica, el resultado será `BLOQUEADO` hasta que la puerta propietaria se cierre.

##### 17.8. Proveedor temporalmente indisponible

La indisponibilidad temporal durante la ejecución no se convierte automáticamente en `FAIL` de configuración si el estado esperado, credenciales y binding son verificables y el contrato de contingencia lo clasifica de otra forma. Si la prueba necesaria no puede demostrar readiness dentro de la ventana exigida, el resultado permanece `BLOQUEADO`; la contingencia operativa pertenece a `READY-GATE-008` y los riesgos aceptados a `READY-GATE-014`.

#### 18. Separación entre planificación y ejecución

`READY-GATE-006` deja definido el contrato que `SHELL-CI-021::<package_id>` deberá ejecutar después de que `SHELL-CI-020::<package_id>` y las tareas de implementación aplicables hayan materializado bindings, principals, configuración y credenciales.

La secuencia permanece:

`E5-GATE-008::<package_id> -> SHELL-CI-020::<package_id> -> BLOQUE R aplicable -> SHELL-CI-021::<package_id> -> SHELL-CI-022::<package_id>`

Durante `SHELL-CI-021::<package_id>` se observará el ambiente real, se ejecutarán las comprobaciones autorizadas y se emitirá el resultado operativo del gate. Esta tarea no afirma que una integración esté activa, que una credencial sea válida, que un proveedor responda ni que un paquete haya superado readiness.

#### Requisitos de prueba derivados

**Resultado:** NO GENERA REQUISITOS DE PRUEBA

**Justificación:** `READY-GATE-006` define el criterio documental de evidencia para comprobar contratos, ambientes, autenticidad, idempotencia, trazabilidad, manejo seguro de secretos y segregación de credenciales que ya están protegidos por requisitos canónicos existentes. No introduce una nueva integración, credencial, regla empresarial, mecanismo de autenticación, permiso, contrato ejecutable ni comportamiento adicional; operacionaliza obligaciones existentes para su verificación futura por paquete.

**Requisitos existentes consumidos:** `TREQ-INTEGRATION-001`, `TREQ-INTEGRATION-003`, `TREQ-INTEGRATION-004`, `TREQ-INTEGRATION-049`, `TREQ-INTEGRATION-051`, `TREQ-INTEGRATION-213`, `TREQ-INTEGRATION-218` y `TREQ-SHELL-009`, además de los `TREQ-*` específicos que `DELIV-PKG-016` vincule al `package_id` evaluado.

**Requisitos TREQ-* creados:** 0
**Requisitos TREQ-* modificados:** 0
**Fragmentos 04A afectados:** 0

#### 19. Criterios de aceptación documental

`READY-GATE-006` queda documentalmente completo cuando:

1. define cómo derivar `required_integration_set` desde el expediente aprobado antes de observar configuración del ambiente;
2. preserva las 21 identidades `EXT-SYS-001..021` como baseline externo sin tratarlas como integraciones obligatorias para todos los paquetes;
3. separa `INTEGRATION_BINDING` y `CREDENTIAL_SURFACE` como planos independientes;
4. exige contrato, versión, principal técnico, ambiente, endpoint/canal, estrategia y evidencia reproducible para cada integración requerida;
5. define una prueba controlada de preparación sin equiparar health check, `200`, ACK o telemetría con resultado empresarial;
6. conserva las ocho clases de `VENTO-EXTERNAL-SECRET-CUSTODY-CONTRACT-001` y evita reclasificaciones genéricas;
7. establece que `ExternalCredentialId` es referencia y no material secreto;
8. exige separación de credenciales por ambiente, binding, principal, dirección y privilegio cuando aplique;
9. prohíbe compartir el mismo material entre bindings independientes y permite únicamente el solapamiento controlado de rotación dentro del mismo binding;
10. impide entregar `service_role` a proveedores externos o clientes;
11. exige lifecycle verificable de vigencia, expiración, rotación y revocación cuando corresponda;
12. protege credenciales publicables mediante restricciones reales en vez de fingir que son secretos ocultables;
13. conserva autenticidad, idempotencia, mapeo, retry, cuarentena, conciliación y auditoría como contratos heredados que el binding debe poder ejecutar cuando apliquen;
14. define `PASS`, `FAIL`, `BLOQUEADO` y `NO_APLICA` por integración, superficie y paquete sin `PASS` parcial;
15. diferencia evidencia reproducible de señales insuficientes como variables presentes, secretos enmascarados, screenshots o endpoint alcanzable;
16. mantiene hardware/red en `READY-GATE-007`, observabilidad en `READY-GATE-011`, rollback en `READY-GATE-012` y decisión final de piloto en `READY-GATE-015`;
17. no crea, revela, rota, revoca ni mueve credenciales; no modifica proveedores, endpoints, proyectos, configuración remota, código, DDL/DML, migraciones ni Supabase;
18. no crea ni modifica requisitos `TREQ-*` ni fragmentos del registro 04A;
19. la ejecución real y la captura de evidencia permanecen en `SHELL-CI-021::<package_id>`;
20. `READY-GATE-007` permanece reservada y no se desarrolla ni modifica.

#### 20. Continuidad canónica

##### ÚLTIMA TAREA APROBADA
READY-GATE-005 — Definir criterio y evidencia para confirmar catálogos y datos maestros mínimos

##### TAREA ACTUAL APROBADA
READY-GATE-006 — Definir criterio y evidencia para confirmar integraciones y credenciales del ambiente

##### SIGUIENTE TAREA RESERVADA
READY-GATE-007 — Definir criterio y evidencia para confirmar hardware, red, escáneres e impresoras


### ✅ READY-GATE-007 — Definir criterio y evidencia para confirmar hardware, red, escáneres e impresoras

**Estado:** APROBADA
**Tarea anterior:** `READY-GATE-006 — Definir criterio y evidencia para confirmar integraciones y credenciales del ambiente`
**Tarea siguiente:** `READY-GATE-008 — Definir criterio y evidencia para confirmar procedimientos operativos y contingencias`
**Tipo de tarea:** documental — definición del gate de readiness que permitirá confirmar, por paquete y ambiente objetivo, que el hardware, la conectividad de red, las capacidades de escaneo y las impresoras físicas exigidas por la operación existen, están identificadas, vinculadas al sitio y contexto correctos, son compatibles con la implementación aprobada y superan comprobaciones físicas controladas; sin instalar, reparar, mover, configurar, enrolar, cablear, imprimir, escanear ni modificar infraestructura.

#### 1. Propósito y resultado canónico

`READY-GATE-007::<package_id>` define el criterio documental que deberá ejecutar posteriormente `SHELL-CI-021::<package_id>` para determinar si las dependencias físicas del paquete están realmente preparadas en el ambiente y la sede objetivo.

El gate responde una pregunta concreta:

> ¿El paquete dispone de todos los equipos físicos, caminos de red, capacidades de captura y dispositivos de impresión que necesita para operar, con identidad verificable, binding correcto, compatibilidad demostrada y una prueba controlada que confirme el resultado esperado?

La tarea no afirma que esa condición ya se cumpla para ningún paquete, sede, dispositivo o impresora. Define el universo que deberá comprobarse, la evidencia aceptable y la regla de decisión.

#### 2. Alcance y frontera del gate

El gate cubre cuatro clases de dependencia física cuando sean requeridas por el paquete:

1. `HARDWARE_ENDPOINT`: computador, terminal, tableta, móvil, kiosco, host, bridge o dispositivo compartido cuya presencia física y capacidad sean necesarias;
2. `NETWORK_PATH`: enlace, router, switch, punto de acceso, segmento, SSID, reserva o camino de conectividad requerido para que el componente alcance su destino autorizado;
3. `SCANNER_CAPTURE`: cámara, lector tipo teclado, escáner dedicado u otro canal físico de captura requerido por el flujo;
4. `PRINTER_OUTPUT`: impresora, host, canal, bridge, cola, medio y binding físico necesarios para producir una salida impresa requerida.

La aplicabilidad se deriva del expediente aprobado del paquete. Una clase no se vuelve obligatoria para todos los paquetes por existir en Vento OS.

Este gate no sustituye ni reabre:

- `READY-GATE-003`, que confirma configuración lógica de permisos, matrices y dispositivos; una fila registral no demuestra que el equipo físico exista o funcione;
- `READY-GATE-006`, que confirma integraciones externas y credenciales del ambiente;
- `READY-GATE-008`, que confirmará procedimientos operativos y contingencias;
- `READY-GATE-011`, que confirmará monitoreo, logs, alertas y dashboards;
- `READY-GATE-012`, que confirmará backup, restore y rollback;
- las pruebas funcionales completas del paquete ni la aceptación empresarial del piloto.

#### 3. Fuentes vinculantes de aplicabilidad

Para cada `package_id`, el universo esperado se deriva antes de observar el ambiente y se reconcilia, cuando corresponda, con:

- `DELIV-PKG-013` para requisitos no funcionales y compatibilidad medible;
- `DELIV-PKG-014` y `DELIV-PKG-015` para topología, archivos, dependencias, SDK, adaptadores, toolchain y prerequisitos;
- `DELIV-PKG-016` para `TREQ-*`, niveles de prueba, fixtures, ambientes, responsables y evidencia;
- `DELIV-PKG-017` para señales de salud requeridas, sin adelantar el gate de observabilidad;
- `DELIV-PKG-018` para configuración o flags que condicionen el uso de un dispositivo;
- `DELIV-PKG-019` y `DELIV-PKG-020` para rollout y rollback cuando el hardware forme parte del cambio;
- `DELIV-PKG-022` para sede, cohorte, dispositivos y salvaguardas del piloto;
- `DELIV-PKG-023` y `DELIV-PKG-025` para criterios de aceptación, expediente final y bloqueos;
- `READY-GATE-003` para identidad lógica y binding registral de dispositivos;
- `TI-DOM-002`, `TI-DOM-003`, `TI-DOM-004` y `TI-DOM-005` para identidad tecnológica, endpoints, red e impresoras/periféricos;
- `PRINT-ARC-001..020` para inventario, capacidades, routing, health, adapters, job, receipt, contingencia y piloto de impresión;
- `NEXO-UX-020` y sus requisitos de captura cuando el paquete use escaneo;
- las tareas físicas de implementación que materialicen el paquete antes de la ejecución de `SHELL-CI-021`.

Si las fuentes aprobadas no permiten determinar el conjunto físico esperado, el resultado es `BLOQUEADO`; no se consulta el ambiente para inventar el alcance.

#### 4. Conjunto físico requerido

`SHELL-CI-021::<package_id>` deberá construir `required_physical_dependency_set` con una fila por dependencia material exigida.

Cada fila deberá pertenecer exactamente a una de las cuatro clases del gate y conservar una identidad estable dentro del dossier. El conjunto deberá reconciliar:

- cantidad esperada;
- cantidad observada;
- faltantes;
- duplicados;
- dependencias sustitutas expresamente aprobadas;
- dependencias retiradas o fuera de alcance con decisión canónica;
- sede, área, punto de operación y ambiente correctos.

La existencia de hardware adicional no compensa una dependencia obligatoria faltante ni autoriza una sustitución por similitud.

#### 5. Dossier mínimo por dependencia

Cada dependencia deberá conservar como mínimo:

| Campo                     | Regla                                                                                                     |
| ------------------------- | --------------------------------------------------------------------------------------------------------- |
| `package_id`              | paquete evaluado                                                                                          |
| `physical_requirement_id` | identidad estable dentro del dossier                                                                      |
| `dependency_class`        | una de las cuatro clases de este gate                                                                     |
| `required_by`             | `TREQ-*`, contrato, paquete, proceso o decisión que la hace obligatoria                                   |
| `target_environment`      | ambiente exacto                                                                                           |
| `site_id`                 | sede requerida cuando aplique                                                                             |
| `area_id`                 | área requerida cuando aplique                                                                             |
| `physical_point`          | punto o estación material cuando sea relevante                                                            |
| `expected_identity`       | activo, endpoint, impresora, lector, cámara, nodo o relación esperada                                     |
| `observed_identity`       | identidad física observada sin inventarla                                                                 |
| `asset_or_inventory_ref`  | referencia a la autoridad física cuando exista                                                            |
| `model_or_class`          | modelo o clase demostrados cuando sean requisito de compatibilidad                                        |
| `serial_or_hardware_ref`  | identificador físico verificable cuando exista y sea apropiado                                            |
| `binding_ref`             | binding con endpoint, red, host, adapter, canal o tarea aplicable                                         |
| `compatibility_state`     | `SUPPORTED`, `SUPPORTED_WITH_CONDITIONS`, `DEGRADED_SUPPORTED` o bloqueo equivalente heredado del paquete |
| `health_or_condition`     | condición física observada y suficiente para la ventana evaluada                                          |
| `controlled_test_ref`     | prueba controlada correspondiente                                                                         |
| `observed_result`         | resultado real de la prueba futura                                                                        |
| `evidence_refs`           | evidencia reproducible y minimizada                                                                       |
| `result`                  | `PASS`, `FAIL`, `BLOQUEADO` o `NO_APLICA`                                                                 |
| `blocking_reason`         | causa concreta cuando no exista `PASS`                                                                    |

Una fotografía puede complementar la identidad física, pero no sustituye los identificadores, la configuración observable, el binding y la prueba controlada cuando esos elementos sean exigibles.

#### 6. Criterio para `HARDWARE_ENDPOINT`

Un endpoint o equipo físico obtiene `PASS` solo cuando se demuestra que:

1. corresponde a la identidad o clase requerida por el paquete;
2. está presente en la sede y punto previstos;
3. puede reconciliarse con su activo o inventario físico cuando exista esa autoridad;
4. su binding con el dispositivo lógico de `READY-GATE-003` es inequívoco cuando el flujo lo requiere;
5. el estado físico permite operar durante la ventana evaluada;
6. sistema, navegador, firmware, drivers, interfaces o capacidades relevantes cumplen el perfil aprobado;
7. los periféricos obligatorios pueden ser detectados o utilizados desde ese host;
8. una prueba controlada de la capacidad que el paquete necesita completa el resultado esperado sin depender de una simulación.

Un registro de activo, hostname, etiqueta de inventario o fila de dispositivo compartido sin reconciliación física no produce `PASS`.

#### 7. Criterio para `NETWORK_PATH`

La red se evalúa por el camino que el paquete realmente necesita, no por la existencia genérica de Wi-Fi o acceso a Internet.

El dossier deberá poder demostrar, según aplique:

- identidad de enlace o nodo;
- sede y alcance;
- interfaces y terminaciones;
- segmento o finalidad;
- SSID y su mapping a segmento cuando sea Wi-Fi;
- direccionamiento o reserva gobernados cuando sean requeridos;
- camino entre origen y destino autorizados;
- resolución y puertos/protocolos requeridos por la implementación;
- separación y restricciones esperadas;
- ausencia de un camino alterno no autorizado usado para aparentar éxito;
- resultado de una comprobación de conectividad ejecutada desde el punto y ambiente correctos.

`PASS` exige que el camino requerido sea alcanzable y compatible con el contrato del paquete. Ver un SSID, obtener una IP, hacer ping a un nodo distinto o navegar Internet no demuestra por sí solo que el camino requerido esté listo.

La línea base documental vigente de `TI-DOM-004` conserva siete subtipos de red (`NETWORK_LINK`, `ROUTER`, `SWITCH`, `ACCESS_POINT`, `SEGMENT`, `SSID`, `ADDRESS_RESERVATION`) sin instancias físicas `VALIDADO`. Esta tarea no cambia ese estado: obliga a aportar la evidencia correspondiente cuando el paquete dependa de una de esas instancias.

#### 8. Criterio para `SCANNER_CAPTURE`

El gate no presupone que escáner signifique un único dispositivo dedicado. El contrato vigente de NEXO admite como canales de captura, según el flujo, cámara, lector tipo teclado, ingreso manual, deep link, búsqueda asistida o selección táctil; solo las dependencias físicas requeridas entran en esta clase.

Una capacidad física de escaneo obtiene `PASS` solo cuando:

1. el host o dispositivo requerido está identificado y disponible;
2. el canal físico exigido por el paquete está presente y puede ser detectado;
3. el secure context, permiso de cámara, foco, teclado o interfaz necesaria funcionan cuando apliquen;
4. la captura se ejecuta bajo un `scan_context_id` o contexto propietario vigente cuando el contrato del flujo lo exija;
5. la lectura produce el mismo sobre contractual esperado por el canal y conserva el valor crudo, la resolución y el receipt de captura;
6. se demuestran al menos un caso legible y, cuando el paquete lo requiera, los casos de no-match, ambigüedad o duplicado relevantes;
7. la captura no ejecuta por sí sola una mutación empresarial;
8. existe fallback aprobado cuando la capacidad primaria no está disponible y el expediente lo exige.

La presencia de la ruta `/scanner`, un botón de cámara, una librería, un lector conectado o una lectura aislada fuera del flujo no acreditan readiness físico.

#### 9. Criterio para `PRINTER_OUTPUT`

Para cada salida impresa requerida, el gate deberá reconciliar:

```text
NECESIDAD DEL PAQUETE
-> OUTPUT / TEMPLATE / VERSION
-> ROUTE / TARGET
-> IMPRESORA FISICA
-> ACTIVO / SEDE / PUNTO
-> ENDPOINT, RED O BRIDGE
-> DRIVER / ADAPTER / LENGUAJE
-> MEDIO O CONSUMIBLE COMPATIBLE
-> JOB CONTROLADO
-> RECEIPT Y SALIDA FISICA
```

Una impresora obtiene `PASS` para una necesidad concreta solo cuando:

1. la identidad `PRN-*` o su binding aprobado se reconcilia con el activo físico correcto;
2. modelo, variante e interfaz relevantes están demostrados;
3. serial, referencia de hardware u otra identidad suficiente evitan confundir dos unidades similares cuando la operación lo requiere;
4. la conexión real coincide con el canal aprobado: USB, LAN, Wi-Fi, bridge u otro contrato vigente;
5. IP, MAC, puerto, cola, driver, firmware o adapter se acreditan solo cuando aplican al canal usado;
6. el lenguaje o driver requerido es compatible con la salida: por ejemplo ZPL/EPL/XML, ESC/POS o controlador Epson según la unidad;
7. el medio cargado y las dimensiones son compatibles con la salida requerida;
8. el estado administrativo, la condición del activo, el health del target y el estado del job no se confunden entre sí;
9. un job controlado produce receipt y resultado físico verificable;
10. la muestra física satisface los criterios relevantes de legibilidad, dimensiones, corte o contenido definidos por el paquete.

La capacidad nominal de fabricante, una preview, una página de prueba del driver o un `printer online` aislado no sustituyen la prueba del recorrido VENTO requerido.

#### 10. Línea base de impresión que deberá preservarse

La línea canónica vigente contiene nueve unidades documentadas:

- 1 Zebra ZD230;
- 1 Epson EcoTank L5590;
- 1 Epson EcoTank L4260;
- 6 Digital POS DIG-E200I.

Distribución operativa heredada:

- 7 unidades documentadas como operativas;
- 1 Zebra almacenada y no desplegada;
- 1 Epson L5590 que requiere mantenimiento y no puede presentarse como disponible hasta reparación y validación;
- Epson L4260 administrativa con USB y Wi-Fi observados;
- DIG-E200I de Molka, Saudo y caja de Vento Café conectadas por USB;
- DIG-E200I de barra, bar y cocina de Vento Café conectadas por red local, con identidad de cableado, IP, MAC, puerto, modo de direccionamiento, firmware y prueba todavía sujetas a evidencia física.

Estas nueve unidades son inventario documental, no nueve `PASS`. Una unidad almacenada, en mantenimiento, no reconciliada o sin evidencia del recorrido requerido conserva su estado real hasta que la ejecución futura del gate lo demuestre.

#### 11. Reglas de `PASS`, `FAIL`, `BLOQUEADO` y `NO_APLICA`

##### 11.1. `PASS`

Una dependencia obtiene `PASS` solo si identidad, ubicación, binding, condición, compatibilidad y prueba aplicables están acreditados con evidencia reproducible para el ambiente correcto.

##### 11.2. `FAIL`

Obtiene `FAIL` cuando existe evidencia suficiente de cualquiera de estas condiciones:

- falta una unidad obligatoria;
- el equipo observado no corresponde al activo, modelo, sede o punto requerido;
- el hardware está averiado o fuera de servicio y no existe sustitución aprobada;
- el camino de red requerido no es alcanzable o usa una ruta no autorizada;
- una impresora no puede producir la salida requerida con el canal, medio o adapter aprobados;
- el escáner o canal físico requerido no puede capturar de forma compatible;
- la variante, firmware, driver, interfaz o versión es incompatible con el perfil aprobado;
- existe binding con el equipo equivocado;
- una prueba controlada demuestra resultado incorrecto, incompleto o inestable;
- una dependencia física requerida fue reemplazada por otra sin decisión aprobada.

##### 11.3. `BLOQUEADO`

Obtiene `BLOQUEADO` cuando no existe evidencia suficiente para concluir `PASS` o `FAIL`, incluyendo:

- identidad física no resuelta;
- serial, activo, endpoint, impresora, nodo o binding ambiguos cuando son necesarios para distinguir la unidad;
- topología o camino de red no demostrables;
- variante o interfaz de hardware no confirmada;
- ausencia de acceso autorizado para observar el dispositivo o ejecutar la prueba;
- driver, firmware, adapter, puerto o configuración material desconocidos y necesarios para decidir compatibilidad;
- prueba física no ejecutada;
- ambiente, sede o punto de operación no diferenciables en la evidencia;
- inventario grupal que no permite reconciliar unidades individuales cuando el paquete necesita esa distinción.

##### 11.4. `NO_APLICA`

`NO_APLICA` solo procede cuando el expediente aprobado demuestra que la clase o dependencia no es necesaria para el alcance del paquete. Falta de evidencia, equipo ausente, dispositivo roto o red no comprobada no son `NO_APLICA`.

#### 12. Regla agregada por paquete

El resultado de `READY-GATE-007::<package_id>` se calcula de forma estricta:

1. cada dependencia de `required_physical_dependency_set` aparece exactamente una vez;
2. cualquier `FAIL` produce `FAIL` del paquete;
3. si no existe `FAIL` pero al menos una dependencia está `BLOQUEADO`, el paquete queda `BLOQUEADO`;
4. el paquete obtiene `PASS` solo cuando todas las dependencias aplicables están `PASS` y todo `NO_APLICA` está justificado;
5. un paquete sin dependencias físicas aplicables obtiene `NO_APLICA` solo cuando el expediente lo demuestra;
6. el conteo observado debe reconciliar con el esperado por clase y por punto operativo;
7. una muestra parcial, una sede distinta, un dispositivo de laboratorio o una impresora sustituta no se redondean a `PASS`;
8. una dependencia compartida por varios paquetes debe demostrar capacidad y binding para cada uso material, sin multiplicar artificialmente su identidad física.

#### 13. Evidencia aceptable

Son ejemplos de evidencia aceptable cuando correspondan al control evaluado:

- inventario físico o activo con identificador verificable y ubicación;
- lectura controlada del sistema operativo, firmware o administración local que demuestre identidad o interfaz;
- enumeración de dispositivo o periférico desde el host correcto;
- evidencia de binding entre activo, endpoint, dispositivo compartido, impresora o red;
- configuración de red observada mediante mecanismo autorizado, minimizando datos sensibles;
- pruebas de camino o protocolo desde el origen real hacia el destino requerido;
- resultado de escaneo con contexto, canal, receipt y resolución correlacionables;
- job de impresión, target, adapter, receipt y salida física correlacionables;
- evidencia de modelo, variante, driver, firmware o versión cuando condicionen compatibilidad;
- evidencia de medio, etiqueta, papel, ribbon, tinta o consumible requerido para la prueba;
- resultados de `TREQ-*` y matrices de `DELIV-PKG-016` que correspondan exactamente al hardware y ambiente evaluados.

La evidencia deberá conservar fuente, momento, ambiente, sede, identidad de prueba y resultado. No deberá exponer contraseñas Wi-Fi, secretos de administración, tokens, llaves, credenciales completas ni datos personales innecesarios.

#### 14. Evidencia insuficiente por sí sola

No bastan por sí solos:

- una fila de inventario o CMDB;
- una etiqueta pegada al dispositivo;
- una fotografía sin identidad correlacionable;
- un modelo listado en documentación del fabricante;
- una fila de `shared_operational_devices`;
- un SSID visible;
- tener dirección IP;
- acceso genérico a Internet;
- un ping que no recorra el camino material requerido;
- una ruta `/scanner` o un botón de cámara;
- una lectura de código ejecutada fuera del flujo propietario;
- una impresora que responda `online`;
- una preview o PDF correcto;
- la página de prueba del fabricante o del sistema operativo;
- la mera existencia de BrowserPrint, ESC/POS, un driver o una librería;
- ausencia de incidentes reportados;
- una prueba realizada en otro equipo, sede, red o ambiente.

#### 15. Casos especiales

##### 15.1. Equipo compartido

El equipo compartido conserva simultáneamente identidad física, endpoint o dispositivo lógico, sesión humana y contexto operativo. El `PASS` físico no concede permisos al actor y el `PASS` de `READY-GATE-003` no acredita condición física.

##### 15.2. Sustitución temporal

Una sustitución solo puede utilizarse si el expediente aprobado permite equivalencia o fallback y la unidad sustituta supera sus propios controles de identidad, compatibilidad y prueba. El descubrimiento casual de un periférico disponible no crea fallback.

##### 15.3. Equipo en mantenimiento o almacenado

Un equipo `REQUIERE_MANTENIMIENTO`, almacenado, retirado o no desplegado no obtiene `PASS` para una capacidad productiva por conservar capacidad nominal. Su retorno exige estado físico adecuado y la prueba aplicable.

##### 15.4. Red degradada

Un camino degradado puede ser `SUPPORTED_WITH_CONDITIONS` o `DEGRADED_SUPPORTED` solo si esa condición está aprobada para el paquete y se cumplen sus límites. La existencia de una estrategia de contingencia no demuestra que la alternativa esté disponible; la operación del procedimiento corresponde a `READY-GATE-008`.

##### 15.5. Captura por cámara o lector

La cámara y el lector tipo teclado son canales distintos que deben converger al mismo contrato de captura cuando ambos sean soportados. Certificar uno no certifica el otro si el paquete exige ambos.

##### 15.6. Impresión por USB y por red

USB, LAN, Wi-Fi o bridge son bindings materiales distintos. Un job exitoso por USB no demuestra readiness de una ruta LAN, y una impresora visible por red no demuestra el adapter o el flujo VENTO correspondiente.

#### 16. Planificación frente a ejecución

La secuencia de responsabilidad se mantiene:

```text
E5-GATE-008::<package_id>
-> SHELL-CI-020::<package_id>
-> BLOQUE R y tareas fisicas aplicables
-> SHELL-CI-021::<package_id>
-> SHELL-CI-022::<package_id>
```

`READY-GATE-007` define el criterio. La evidencia real de hardware, red, escaneo e impresión se obtiene después de la implementación correspondiente y se evalúa en `SHELL-CI-021`. Esta tarea no instala drivers, no cambia firmware, no configura routers o AP, no cablea, no repara equipos, no enrola endpoints, no mueve impresoras, no ejecuta trabajos de impresión ni pruebas de escaneo sobre operación real.

#### 17. Requisitos de prueba derivados

**Resultado:** NO GENERA REQUISITOS DE PRUEBA

**Justificación:** `READY-GATE-007` no introduce un comportamiento empresarial ni una capacidad técnica nueva; especializa como criterio de readiness controles ya registrados para hardware, dispositivos, red, captura e impresión. La cobertura vigente ya exige validación física, compatibilidad, binding, captura contextual, idempotencia, salida impresa, correlación tecnológica y evidencia reproducible.

Requisitos existentes consumidos, entre otros según aplicabilidad del paquete:

- `TREQ-NEXO-003` y `TREQ-NEXO-005` para salida física, preview, job y trazabilidad de impresión;
- `TREQ-NEXO-060` y `TREQ-NEXO-088` para atribución y uso contextual de escaneo, impresión y dispositivo compartido;
- `TREQ-NEXO-168` y `TREQ-NEXO-172` para identidad física y fallos de dispositivo o red dentro de operación;
- `TREQ-NEXO-231..244` para contexto, canales, capabilities, fallback, seguridad y certificación física del escaneo;
- `TREQ-SHELL-010` para separación y administración verificable de endpoint, dispositivo y sesión;
- `TREQ-INTEGRATION-003` para efectos enviados a periféricos con idempotencia y resultado recuperable;
- `TREQ-INTEGRATION-020` para correlación entre activos, redes, impresoras, endpoints y operación tecnológica.

**Requisitos creados:** 0

**Requisitos modificados:** 0

**Fragmentos 04A afectados:** 0

#### 18. Criterios de aceptación

`READY-GATE-007` queda documentalmente completa cuando:

1. define un `required_physical_dependency_set` exhaustivo por paquete antes de observar el ambiente;
2. separa `HARDWARE_ENDPOINT`, `NETWORK_PATH`, `SCANNER_CAPTURE` y `PRINTER_OUTPUT`;
3. impide usar configuración lógica de `READY-GATE-003` como prueba de existencia o funcionamiento físico;
4. exige identidad, sede, punto, binding, compatibilidad, condición y prueba según aplicabilidad;
5. conserva los siete subtipos de red de `TI-DOM-004` y no inventa instancias validadas;
6. distingue conectividad genérica del camino de red material que el paquete necesita;
7. conserva la semántica de captura de `NEXO-UX-020` y no convierte escaneo en mutación;
8. exige que el canal físico de escaneo requerido sea detectable y probado desde el host correcto;
9. conserva las nueve impresoras documentadas y sus estados sin convertir inventario en readiness;
10. conserva la Zebra almacenada y la Epson L5590 en mantenimiento como no disponibles para una capacidad productiva mientras no exista evidencia posterior suficiente;
11. exige para impresión el recorrido salida -> target -> impresora -> binding -> job -> receipt -> resultado físico;
12. distingue USB, LAN, Wi-Fi y bridge como bindings materiales diferentes;
13. define evidencia suficiente e insuficiente sin exponer secretos o credenciales;
14. define `PASS`, `FAIL`, `BLOQUEADO` y `NO_APLICA` por dependencia;
15. agrega el resultado de forma estricta por paquete sin redondear muestras parciales;
16. conserva sustituciones y modos degradados solo cuando están aprobados y probados;
17. no invade `READY-GATE-008`, `READY-GATE-011` ni `READY-GATE-012`;
18. no ejecuta instalación, reparación, cableado, configuración, impresión, escaneo ni cambios remotos;
19. crea 0 y modifica 0 requisitos `TREQ-*`;
20. mantiene `READY-GATE-008` exclusivamente reservada como siguiente tarea.

#### 19. Continuidad canónica

##### ÚLTIMA TAREA APROBADA
READY-GATE-006 — Definir criterio y evidencia para confirmar integraciones y credenciales del ambiente

##### TAREA ACTUAL APROBADA
READY-GATE-007 — Definir criterio y evidencia para confirmar hardware, red, escáneres e impresoras

##### SIGUIENTE TAREA RESERVADA
READY-GATE-008 — Definir criterio y evidencia para confirmar procedimientos operativos y contingencias


### ✅ READY-GATE-008 — Definir criterio y evidencia para confirmar procedimientos operativos y contingencias

**Estado:** APROBADA
**Tarea anterior:** `READY-GATE-007 — Definir criterio y evidencia para confirmar hardware, red, escáneres e impresoras` — APROBADA
**Tarea siguiente:** `READY-GATE-009 — Definir criterio y evidencia para confirmar capacitación y material de apoyo` — RESERVADA
**Tipo de tarea:** documental; definición del criterio de readiness y de la evidencia exigible para demostrar que los procedimientos operativos y las contingencias aplicables a cada paquete pueden ejecutarse de forma controlada, trazable y reversible hacia la operación normal, sin ejecutar todavía el checklist de `SHELL-CI-021` ni realizar cambios físicos, despliegues, migraciones, configuración remota o modificaciones de Supabase
**Repositorio propietario:** `vento-shell`
**Cambios físicos autorizados:** ninguno
**Requisitos de prueba creados o modificados:** 0

---

#### 1. Propósito

`READY-GATE-008` define cómo `SHELL-CI-021` deberá decidir, después de `SHELL-CI-020` y de las tareas de implementación aplicables, si un paquete dispone de procedimientos operativos y contingencias suficientemente concretos para soportar la entrada a piloto sin depender de conocimiento tácito, improvisación, accesos extraordinarios no gobernados o fuentes paralelas de verdad.

La pregunta de salida es:

> ¿Puede un operador autorizado ejecutar la operación normal y responder a las contingencias aplicables siguiendo un procedimiento vigente, identificable y reproducible, con condiciones explícitas de entrada, límites, escalamiento, evidencia, suspensión, reincorporación y retorno a la operación normal?

Esta tarea diseña el criterio y la evidencia. No afirma que los procedimientos hayan sido ejecutados, ensayados o certificados en el ambiente objetivo durante E5.

---

#### 2. Resultado sustantivo

La comprobación de readiness se divide en cuatro planos independientes:

1. **procedimiento operativo normal:** cómo se inicia, ejecuta, verifica, interrumpe y cierra la operación prevista por el paquete;
2. **activación y ejecución de contingencia:** qué condición habilita un modo alterno, quién puede activarlo, qué acciones están permitidas y cuáles quedan bloqueadas;
3. **reincorporación y reconciliación:** cómo se incorporan después los hechos, borradores, colas, documentos o registros producidos durante la falla sin duplicar, perder ni sobrescribir silenciosamente hechos posteriores;
4. **suspensión y handoff:** cuándo el procedimiento deja de ser seguro, qué se detiene, qué evidencia se conserva y a qué proceso propietario se transfiere la resolución.

Un resultado favorable en un plano no compensa un `FAIL` o `BLOQUEADO` en otro plano aplicable.

---

#### 3. Autoridades y fuentes vinculantes

La evaluación conserva, sin redefinirlas, las siguientes autoridades:

- `VPROC-0058` para solicitudes e incidentes tecnológicos;
- `VPROC-0062` para continuidad empresarial;
- `TI-DOM-004` para contingencias de red y conectividad;
- `TI-DOM-007` para incidente, impacto, urgencia, prioridad, SLA, escalamiento, comunicación y cierre tecnológico;
- `TI-DOM-008` para problema, causa raíz, error conocido y workaround;
- `TI-DOM-009` para cambios tecnológicos, incluida la frontera entre respuesta operativa y cambio controlado;
- `TI-DOM-011` para respaldo, restauración y recuperación;
- el bloque `AC_CONTINUIDAD_OPERATIVA_Y_RECUPERACION` para impacto, activación, modos de contingencia, operación degradada, reincorporación y ejercicios;
- la evidencia y los escenarios de prueba asignados al paquete por `DELIV-PKG-016`;
- los contratos funcionales, de autorización, datos, integración, dispositivos y hardware que el paquete consume.

Una guía local, una nota, una conversación, una captura o una práctica conocida por el equipo no adquieren autoridad por existir. Deben corresponder al procedimiento aprobado y a la versión evaluada.

---

#### 4. Frontera con las demás tareas READY

`READY-GATE-008` verifica la **ejecutabilidad procedimental** de la operación y de las contingencias. No absorbe las comprobaciones propietarias de otras puertas:

- `READY-GATE-007` confirma la disponibilidad física de hardware, red, escáneres e impresoras;
- `READY-GATE-009` confirma capacitación y material de apoyo;
- `READY-GATE-010` confirma la mesa de soporte, responsables y escalamiento como capacidad disponible;
- `READY-GATE-011` confirma monitoreo, métricas y alertas;
- `READY-GATE-012` confirma respaldos y rollback probados;
- `READY-GATE-013` captura la línea base previa al piloto;
- `READY-GATE-014` gobierna riesgos aceptados y condiciones de suspensión;
- `READY-GATE-015` gobierna la autoridad y el criterio final de entrada al piloto.

Por tanto, `READY-GATE-008` puede exigir que un procedimiento referencie una dependencia, un responsable, una señal, un respaldo o un mecanismo de rollback, pero no declara disponible ni probado ese elemento fuera de su puerta propietaria.

---

#### 5. Universo de procedimientos aplicables por paquete

Antes de consultar el ambiente, `SHELL-CI-021` deberá derivar desde el expediente del paquete el conjunto esperado de procedimientos. Cada clase se clasificará expresamente como `APLICA` o `NO_APLICA`:

| Clase                   | Cuándo aplica                                                          | Resultado mínimo exigido                                                    |
| ----------------------- | ---------------------------------------------------------------------- | --------------------------------------------------------------------------- |
| operación normal        | el paquete introduce o modifica una capacidad operativa                | procedimiento ejecutable de inicio a cierre                                 |
| incidente o degradación | una dependencia puede fallar sin exigir abandono inmediato             | contención, límites, escalamiento y criterio de recuperación                |
| operación bloqueada     | continuar podría producir un efecto inválido o inseguro                | condición de detención, protección de estado y reanudación controlada       |
| lectura de snapshot     | existe una proyección histórica o copia de solo lectura admitida       | vigencia, alcance, marca visible de no actualidad y prohibición de mutación |
| borrador local          | se permite capturar intención sin confirmar el hecho empresarial       | identidad local estable, actor, tiempo, contexto y posterior revalidación   |
| cola offline            | la intención puede conservarse hasta recuperar conectividad            | deduplicación, orden, expiración, reintento y reconciliación                |
| procedimiento manual    | el proceso admite continuidad fuera del sistema principal              | formulario o soporte controlado, custodia, identificadores y reconciliación |
| ubicación alternativa   | la operación puede trasladarse a otra instalación o recurso autorizado | condiciones de activación, capacidad mínima, custodia y retorno             |
| proveedor sustituto     | existe sustitución aprobada de una dependencia externa                 | autoridad, alcance, vigencia, datos mínimos y reversión al proveedor normal |
| reincorporación         | cualquier modo alterno puede producir hechos pendientes                | importación o registro controlado, idempotencia, conflictos y cierre        |

La ausencia de un mecanismo, un campo vacío, una dependencia todavía no comprobada o la inexistencia de evidencia no equivalen a `NO_APLICA`.

---

#### 6. Identidad mínima de cada procedimiento

Cada procedimiento aplicable deberá conservar, como mínimo:

- identificador estable o referencia inequívoca;
- nombre y propósito;
- paquete y capacidad protegida;
- proceso o servicio propietario;
- versión vigente y evidencia de vigencia;
- ambiente, sede, área o alcance cuando corresponda;
- actor o función que inicia;
- actor o función que ejecuta;
- autoridad necesaria;
- precondiciones;
- condición de inicio;
- entradas y recursos requeridos;
- pasos y puntos de decisión;
- verificaciones intermedias;
- acciones prohibidas;
- condición de éxito;
- condición de detención segura;
- condición de escalamiento o handoff;
- evidencia que debe producirse;
- condición de cierre;
- referencia al procedimiento de reincorporación cuando aplique.

No se exige exponer secretos, credenciales, tokens o valores sensibles dentro del procedimiento. Cuando sean necesarios, solo se referencia el mecanismo autorizado que los provee.

---

#### 7. Criterio del procedimiento operativo normal

Un procedimiento de operación normal obtiene `PASS` únicamente cuando:

1. corresponde exactamente a la versión y alcance del paquete evaluado;
2. identifica el actor, el contexto y los prerrequisitos que deben existir antes del primer efecto;
3. distingue navegación, captura, validación, confirmación, persistencia y receipt cuando el flujo los tenga;
4. no convierte una interfaz visible, una sesión abierta o una petición enviada en prueba de éxito;
5. identifica checkpoints verificables y resultado final observable;
6. define qué ocurre ante cancelación, revocación, dato parcial, conflicto, timeout o resultado desconocido;
7. impide repetir ciegamente una operación cuyo resultado anterior sea desconocido;
8. conserva la fuente de verdad y el proceso propietario del hecho empresarial;
9. define cómo abandonar la operación sin dejar un estado ambiguo;
10. produce o referencia evidencia suficiente para reconstruir actor, tiempo, recurso, decisión y resultado.

Un procedimiento meramente narrativo que no permita decidir qué hacer frente a los estados reales del flujo no satisface este criterio.

---

#### 8. Criterio de activación de contingencia

Toda contingencia aplicable deberá definir de forma explícita:

- evento o condición que habilita su evaluación;
- condición que obliga a detener la operación normal;
- autoridad para declarar o activar el modo alterno;
- alcance afectado;
- duración o vigencia máxima cuando aplique;
- operaciones permitidas;
- operaciones prohibidas;
- datos mínimos disponibles;
- fuente de verdad que permanece vigente;
- identificadores que preservan causalidad;
- evidencia que debe capturarse durante el modo alterno;
- punto de escalamiento;
- criterio de abandono del modo contingencia;
- condición de retorno a operación normal.

La contingencia no concede permisos adicionales por estar activa. Un dispositivo, una sede, un proveedor, un archivo local o una red alternativa tampoco se convierten en fuente de autoridad.

---

#### 9. Reglas de operación degradada y offline

Cuando el paquete permita trabajo degradado u offline deberán cumplirse simultáneamente estas reglas:

1. la interfaz o soporte utilizado identifica que el resultado sigue pendiente cuando todavía no existe confirmación autoritativa;
2. cada intención conserva un identificador estable antes de cualquier reintento;
3. se conservan actor, dispositivo cuando aplique, tiempo real, contexto, proceso, recurso y referencia causal suficientes;
4. la ausencia de conectividad no amplía territorio, permisos ni vigencia de sesión;
5. un caché, snapshot, archivo temporal o almacenamiento local no se convierte en fuente canónica;
6. una acción que requiera validación actual y no pueda revalidarse se bloquea o permanece como borrador no confirmado;
7. el reintento distingue timeout, rechazo, conflicto, resultado desconocido y confirmación previa;
8. la recuperación de conectividad inicia revalidación y reconciliación antes de volver a presentar la intención como aplicable;
9. ninguna cola o borrador puede publicarse bajo un actor, contexto, versión o recurso ya revocados sin una nueva decisión autoritativa;
10. los conflictos se hacen visibles y se resuelven según el proceso propietario; no se aplica sobrescritura silenciosa por ser el último dato recibido.

---

#### 10. Procedimiento manual controlado

Cuando el paquete permita una contingencia manual, el soporte manual debe declarar:

- finalidad exacta;
- campos obligatorios;
- identificador único o mecanismo de correlación;
- responsable de creación;
- responsable de custodia;
- acceso permitido;
- sensibilidad de la información;
- lugar lógico de conservación autorizado;
- control de versiones o secuencia;
- manejo de correcciones sin borrar historia;
- límite temporal de uso;
- responsable de reincorporación;
- prueba de reconciliación;
- criterio y evidencia de cierre o disposición posterior.

Una hoja de cálculo, formulario impreso, mensaje o archivo compartido sin estas salvaguardas no constituye contingencia aprobable.

---

#### 11. Reincorporación y reconciliación

Todo procedimiento que pueda producir hechos pendientes durante una falla deberá definir cómo se reincorporan posteriormente.

La reincorporación obtiene `PASS` solo cuando puede demostrar que:

- cada hecho conserva origen, actor, hora real, hora de registro, versión y referencia de contingencia;
- se detectan duplicados antes de crear un segundo efecto;
- se detectan recursos modificados después del inicio de la contingencia;
- se distinguen operaciones vigentes, vencidas, rechazadas, parciales y ya confirmadas;
- la secuencia de efectos se preserva o se resuelve explícitamente cuando exista conflicto;
- una corrección no sobrescribe silenciosamente un hecho posterior;
- las proyecciones derivadas pueden reconstruirse o reconciliarse desde la fuente propietaria;
- los pendientes quedan en cero o quedan transferidos con propietario explícito antes de cerrar la contingencia;
- el retorno a operación normal no oculta un saldo, documento, cola, comunicación o transacción todavía pendiente.

La mera recuperación de conectividad o el reinicio de una aplicación no constituye reconciliación.

---

#### 12. Incidente, workaround, cambio y recuperación

El procedimiento deberá preservar las siguientes fronteras:

```text
CONTENER O DEGRADAR
≠
RESOLVER LA CAUSA
≠
AUTORIZAR UN CAMBIO
≠
PROBAR UN ROLLBACK O UNA RESTAURACIÓN
```

Reglas:

1. un workaround puede permitir continuidad sin cerrar el problema ni eliminar su causa;
2. una modificación de configuración, software, red, dispositivo o integración que exceda la acción previamente autorizada se transfiere al gobierno de cambio;
3. una restauración desde respaldo o un rollback consumen el procedimiento propietario de recuperación y su evidencia se confirma en `READY-GATE-012`;
4. la contingencia conserva el expediente original y las correlaciones necesarias para investigación posterior;
5. cerrar un ticket técnico no equivale por sí solo a haber normalizado el proceso empresarial.

---

#### 13. Handoff y suspensión segura

Cada procedimiento aplicable deberá definir un punto en el que el operador deja de ejecutar y transfiere la decisión.

El handoff deberá conservar como mínimo:

- procedimiento y paso alcanzado;
- actor y contexto;
- recurso afectado;
- síntoma o condición observada;
- último hecho confirmado;
- operación pendiente si existe;
- resultado desconocido si existe;
- evidencia disponible;
- acción ya intentada;
- riesgo de repetir;
- proceso o función receptora;
- condición necesaria para reanudar.

`READY-GATE-008` comprueba que el handoff esté definido. La disponibilidad real de la mesa, contactos, guardias, responsables y escalamiento se confirma en `READY-GATE-010`.

---

#### 14. Evidencia aceptable para la ejecución posterior

`SHELL-CI-021` podrá aceptar, según el tipo de procedimiento y riesgo:

- procedimiento o runbook versionado con propietario y vigencia;
- matriz de contingencias con condiciones de entrada, acciones, límites y salida;
- walkthrough controlado con evidencia de pasos y decisiones;
- tabletop con escenario, participantes, decisiones, tiempos y desviaciones;
- simulación técnica u operativa en ambiente autorizado;
- evidencia de modo offline o degradado que preserve estados pendientes y posterior reconciliación;
- formularios o soportes manuales controlados con identidad y custodia;
- receipts, bitácoras, eventos o registros que permitan reconstruir la ejecución;
- evidencia de reconciliación y ausencia de pendientes sin propietario;
- reporte de ejercicio con fallos, acciones correctivas, responsable y estado.

La evidencia debe identificar el paquete, ambiente, versión del procedimiento, escenario, fecha, actor o función ejecutora y resultado.

---

#### 15. Evidencia insuficiente

No bastan por sí solos:

- una wiki o documento sin versión ni propietario;
- una lista de pasos sin precondiciones, límites o salida;
- una captura de pantalla aislada;
- afirmar que el equipo conoce el procedimiento;
- una demo sin escenario de falla;
- un archivo manual sin identidad, custodia o reconciliación;
- un modo offline que solo guarda datos sin demostrar revalidación posterior;
- un job o request enviado sin receipt o reconciliación del resultado;
- un incidente cerrado sin demostrar retorno operativo;
- una contingencia que depende de credenciales compartidas o permisos extraordinarios no gobernados;
- un plan de recuperación no ensayado;
- una estrategia genérica de red o proveedor que no esté materializada para el alcance evaluado;
- la sola existencia de capacitación, monitoreo, soporte o respaldo pertenecientes a otras puertas READY.

---

#### 16. Resultado por procedimiento

Cada procedimiento o contingencia evaluados obtendrá exactamente uno de estos estados:

| Estado      | Criterio                                                                                                                                 |
| ----------- | ---------------------------------------------------------------------------------------------------------------------------------------- |
| `PASS`      | el procedimiento aplicable está vigente, completo, ejecutable y respaldado por la evidencia exigida                                      |
| `FAIL`      | la evidencia demuestra una condición incompatible con el contrato, un paso inseguro, una omisión crítica o una reconciliación incorrecta |
| `BLOQUEADO` | falta un prerrequisito, una autoridad, un ambiente, un insumo o una evidencia sin los cuales no puede emitirse resultado válido          |
| `NO_APLICA` | el expediente demuestra que esa clase de procedimiento no corresponde al alcance del paquete                                             |

`NO_APLICA` requiere justificación explícita. La ausencia de evidencia nunca se convierte en `PASS` ni en `NO_APLICA`.

---

#### 17. Resultado agregado por paquete

La agregación es estricta:

1. se determina primero el universo esperado de procedimientos y contingencias;
2. cada elemento esperado se evalúa exactamente una vez;
3. cualquier `FAIL` produce `READY-GATE-008::<package_id> = FAIL`;
4. si no hay `FAIL` pero existe al menos un `BLOQUEADO`, el paquete obtiene `BLOQUEADO`;
5. el paquete obtiene `PASS` solo cuando todos los elementos aplicables obtienen `PASS` y cada `NO_APLICA` está justificado;
6. un paquete completo obtiene `NO_APLICA` únicamente cuando el expediente demuestra que no introduce ni depende de operación humana, procedimiento técnico, contingencia, reincorporación o handoff relevantes para el piloto;
7. una muestra parcial de procedimientos, sedes, actores, modos degradados o escenarios no se extrapola al resto del paquete.

---

#### 18. Escenarios mínimos a decidir por aplicabilidad

El expediente del paquete deberá decidir si exige evidencia para, al menos, los siguientes escenarios:

- inicio, ejecución y cierre normales;
- cancelación o detención segura;
- actor, sesión o autorización revocados;
- dependencia no disponible;
- red intermitente o pérdida de conectividad;
- dispositivo o periférico no disponible;
- timeout o resultado desconocido;
- reintento de una intención previa;
- dato parcial, obsoleto o conflictivo;
- cola o borrador pendiente;
- proveedor externo no disponible;
- operación manual controlada;
- recuperación de conectividad;
- reincorporación y reconciliación;
- retorno a operación normal.

La decisión de `NO_APLICA` para un escenario debe derivarse del alcance real del paquete y no de que el escenario no haya sido ensayado.

---

#### 19. Cobertura de prueba heredada

Esta tarea consume cobertura ya registrada y no redefine sus comportamientos:

- `TREQ-CONT-001` protege impacto, dependencias y objetivos de continuidad;
- `TREQ-CONT-002` protege declaración, activación, escalamiento, comunicación y cierre del incidente de continuidad;
- `TREQ-CONT-003` protege la selección y prueba de modos de contingencia, incluidos operación bloqueada, snapshot, borrador local, cola offline, procedimiento manual, ubicación alternativa y proveedor sustituto;
- `TREQ-CONT-004` protege respaldo, restauración y recuperación, cuyo readiness específico permanece en `READY-GATE-012`;
- `TREQ-CONT-005` protege la reincorporación idempotente y la reconciliación del trabajo ejecutado durante una falla;
- `TREQ-CONT-006` protege walkthrough, tabletop, simulación, restauración y ejercicio, e impide declarar listo un plan sin prueba vigente;
- las pruebas de paquete ya planificadas por `DELIV-PKG-016` conservan su escenario, fixture, oracle, ambiente y evidencia propietarios.

---

#### Requisitos de prueba derivados

**Resultado:** NO GENERA REQUISITOS DE PRUEBA

**Justificación:** la tarea no introduce un comportamiento ejecutable nuevo. Define el criterio con el que `SHELL-CI-021` deberá aceptar o rechazar la evidencia de procedimientos y contingencias cuyos comportamientos ya están protegidos por el registro canónico de continuidad y por las pruebas específicas de cada paquete.

**Requisitos creados:** 0

**Requisitos modificados:** 0

---

#### 20. Criterios de aceptación

`READY-GATE-008` queda documentalmente satisfecha cuando:

1. define la diferencia entre operación normal, contingencia, reincorporación y suspensión;
2. obliga a derivar el universo esperado antes de evaluar evidencia;
3. exige decisión explícita `APLICA` o `NO_APLICA` por clase de procedimiento;
4. define la identidad mínima de un procedimiento vigente;
5. define qué vuelve ejecutable un procedimiento de operación normal;
6. define autoridad, límites, entrada y salida de una contingencia;
7. conserva autorización y contexto durante operación degradada u offline;
8. prohíbe convertir cachés, snapshots o archivos manuales en fuentes canónicas;
9. exige identificadores estables y control de reintentos;
10. define controles mínimos del procedimiento manual;
11. exige reincorporación idempotente y reconciliación explícita;
12. distingue workaround, problema, cambio, rollback y restauración;
13. define handoff y suspensión segura;
14. separa este gate de capacitación, soporte, monitoreo, respaldo, riesgos y autoridad final de piloto;
15. define evidencia aceptable e insuficiente;
16. define `PASS`, `FAIL`, `BLOQUEADO` y `NO_APLICA`;
17. establece agregación estricta por paquete;
18. obliga a decidir escenarios de falla relevantes sin extrapolar una muestra parcial;
19. crea 0 y modifica 0 requisitos `TREQ-*`;
20. no ejecuta procedimientos, simulaciones, cambios físicos, despliegues, migraciones ni modificaciones de Supabase en E5;
21. mantiene `READY-GATE-009` exclusivamente reservada como siguiente tarea.

---

#### 21. Continuidad canónica

##### ÚLTIMA TAREA APROBADA
READY-GATE-007 — Definir criterio y evidencia para confirmar hardware, red, escáneres e impresoras

##### TAREA ACTUAL APROBADA
READY-GATE-008 — Definir criterio y evidencia para confirmar procedimientos operativos y contingencias

##### SIGUIENTE TAREA RESERVADA
READY-GATE-009 — Definir criterio y evidencia para confirmar capacitación y material de apoyo


### ✅ READY-GATE-009 — Definir criterio y evidencia para confirmar capacitación y material de apoyo

**Estado:** APROBADA

**Tarea anterior:** READY-GATE-008 — Definir criterio y evidencia para confirmar procedimientos operativos y contingencias

**Tarea siguiente:** READY-GATE-010 — Definir criterio y evidencia para confirmar mesa de soporte, responsables y escalamiento

**Tipo de tarea:** Documental de readiness operativo. Define el criterio verificable y la evidencia que `SHELL-CI-021` deberá ejecutar después de `SHELL-CI-020` y de la implementación aplicable. No ejecuta capacitaciones, evaluaciones, certificaciones, simulacros, accesos, cambios de código, migraciones, configuración de Supabase ni modificaciones remotas.

#### 1. Propósito

Definir una puerta reproducible para determinar si las personas que participarán en el piloto o en la operación afectada por un paquete implementado:

1. recibieron la capacitación aplicable en la versión correcta;
2. demostraron la competencia exigida cuando el riesgo o el proceso lo requiere;
3. mantienen vigentes las certificaciones, renovaciones o habilitaciones formativas aplicables;
4. disponen de material de apoyo vigente, aprobado, accesible y utilizable en el contexto real de trabajo;
5. conocen y pueden ejecutar de forma segura los procedimientos normales y de contingencia que les corresponden;
6. fueron preparados contra la misma versión del cambio que será sometida al readiness;
7. pueden ser verificados mediante evidencia controlada sin confundir asistencia, acceso a documentos o antigüedad con competencia demostrada.

La pregunta de control de esta tarea es:

> ¿La población operativa aplicable está preparada para ejecutar el cambio y dispone de ayudas vigentes y utilizables, con evidencia suficiente para que `SHELL-CI-021` pueda aceptar o bloquear el readiness sin inferencias?

#### 2. Frontera de responsabilidad

Esta tarea gobierna exclusivamente **preparación de personas y disponibilidad/usabilidad del material de apoyo**.

No sustituye ni reabre:

- `READY-GATE-008`, que gobierna la corrección y ejecutabilidad de procedimientos operativos y contingencias;
- `READY-GATE-010`, que gobernará mesa de soporte, responsables y escalamiento;
- `READY-GATE-011`, que gobernará monitoreo, métricas y alertas;
- `READY-GATE-012`, que gobernará respaldo y rollback probados;
- `READY-GATE-013`, que gobernará la línea base previa al piloto;
- `READY-GATE-014`, que gobernará riesgos aceptados y condiciones de suspensión;
- `READY-GATE-015`, que gobernará la autoridad final de entrada al piloto;
- la evaluación del período de prueba laboral, que no equivale a capacitación;
- la salud física o técnica del hardware, que ya pertenece a `READY-GATE-007`;
- la existencia o validez de credenciales e integraciones, que ya pertenece a `READY-GATE-006`.

Una capacitación puede usar un procedimiento aprobado como contenido; no convierte por ello esa capacitación en evidencia de que el procedimiento quedó correctamente diseñado. De forma simétrica, un procedimiento aprobado no prueba que las personas aplicables hayan sido capacitadas.

#### 3. Fuentes vinculantes del gate

`SHELL-CI-021` deberá resolver este gate usando únicamente fuentes versionadas y trazables que correspondan al paquete y candidato evaluados. Como mínimo:

- la definición aprobada de la capacidad de capacitación y conocimiento operativo;
- el paquete E5 aplicable y su alcance aprobado;
- los procedimientos normales y de contingencia aprobados que resulten aplicables;
- las implementaciones efectivamente incluidas en el candidato;
- el inventario de roles, procesos, sedes, áreas, aplicaciones, dispositivos o equipos afectados por el paquete;
- los catálogos, asignaciones, sesiones, evaluaciones, certificaciones y vigencias de capacitación que sean fuente autorizada;
- el catálogo o repositorio controlado de material de apoyo;
- la evidencia producida por el ambiente y la población objetivo del readiness.

La mera existencia de una presentación, curso, archivo, enlace, correo, sesión o registro de asistencia no lo convierte en evidencia suficiente.

#### 4. Planos independientes de decisión

Cada paquete deberá clasificar exactamente una vez los siguientes cuatro planos:

| Plano                             | Pregunta obligatoria                                                                                                     | Resultado permitido                      |
| --------------------------------- | ------------------------------------------------------------------------------------------------------------------------ | ---------------------------------------- |
| `CAPACITACION`                    | ¿Todas las capacitaciones aplicables fueron asignadas y completadas sobre la versión correcta por la población objetivo? | `PASS`, `FAIL`, `BLOQUEADO`, `NO_APLICA` |
| `COMPETENCIA_Y_VIGENCIA`          | ¿La competencia, evaluación, certificación o renovación exigida está demostrada y vigente?                               | `PASS`, `FAIL`, `BLOQUEADO`, `NO_APLICA` |
| `MATERIAL_DE_APOYO`               | ¿El material requerido está aprobado, vigente, accesible y utilizable en el contexto operativo?                          | `PASS`, `FAIL`, `BLOQUEADO`, `NO_APLICA` |
| `ALINEACION_CON_CAMBIO_Y_HANDOFF` | ¿Capacitación y ayudas corresponden al candidato, procedimiento y contingencia que realmente serán usados?               | `PASS`, `FAIL`, `BLOQUEADO`, `NO_APLICA` |

Un `PASS` en un plano no compensa `FAIL` o `BLOQUEADO` en otro.

#### 5. Clasificación obligatoria de capacitación

Para cada paquete se deberá evaluar la aplicabilidad de las siete clases canónicas de formación. Ninguna podrá omitirse por silencio:

1. `INDUCCION` — inducción necesaria para incorporarse al contexto o cambio operativo aplicable;
2. `PROCEDIMIENTO_OPERATIVO` — capacitación sobre el procedimiento normal que la persona deberá ejecutar;
3. `MANEJO_DE_EQUIPO` — entrenamiento requerido para operar equipo, periférico o dispositivo involucrado;
4. `SEGURIDAD` — formación de seguridad cuando el proceso, equipo, instalación o riesgo la exija;
5. `INOCUIDAD` — formación de inocuidad cuando el proceso o responsabilidad la exija;
6. `CERTIFICACION` — certificación formal cuando exista un requisito de competencia, vigencia o habilitación;
7. `CAMBIO_DE_PROCESO` — entrenamiento específico cuando el paquete modifica un flujo, regla, interfaz, responsabilidad, dispositivo o modo de contingencia previamente conocido.

Cada clase deberá quedar en `APLICA` o `NO_APLICA`, con razón controlada. La inexistencia de una clase en un paquete no permite inferir automáticamente `NO_APLICA`.

#### 6. Unidad mínima de evidencia de capacitación

Para cada capacitación aplicable, la evidencia de readiness deberá poder reconstruir al menos:

- `package_id`;
- identificador y versión del candidato evaluado;
- `training_id` estable;
- clase de capacitación;
- `training_version` exacta;
- propietario responsable del contenido;
- proceso, actividad o cambio protegido;
- roles y población objetivo;
- sede, área, aplicación, dispositivo o equipo cuando restrinjan aplicabilidad;
- prerrequisitos;
- fecha o ventana de la sesión;
- versión del procedimiento o material utilizado;
- método de impartición cuando afecte la capacidad de demostrar competencia;
- método de evaluación cuando aplique;
- umbral o condición de aprobación cuando aplique;
- cantidad objetivo;
- cantidad completada;
- cantidad aprobada;
- cantidad pendiente;
- cantidad vencida;
- referencia controlada a la evidencia;
- resultado `PASS`, `FAIL`, `BLOQUEADO` o `NO_APLICA`;
- bloqueo concreto y propietario cuando el resultado no sea `PASS`.

La evidencia podrá usar identificadores controlados o agregados verificables para evitar exponer datos personales innecesarios. El gate no exige publicar información personal en el artefacto de readiness.

#### 7. Criterio de cobertura de población

La población objetivo deberá derivarse del alcance real del paquete y no de listas informales.

Como mínimo, la reconciliación deberá demostrar:

```text
POBLACION_OBJETIVO_APLICABLE
= ACTORES_DEL_PROCESO_AFECTADO
∩ ROLES_APLICABLES
∩ CONTEXTO_OPERATIVO_DEL_PILOTO
∩ VIGENCIA_OPERATIVA_REQUERIDA
```

Para cada capacitación aplicable:

```text
PENDIENTES = OBJETIVO - COMPLETADA_VIGENTE
```

Y, cuando exista evaluación o certificación obligatoria:

```text
HABILITADA_POR_FORMACION
= COMPLETADA_VIGENTE
∩ EVALUACION_APROBADA
∩ CERTIFICACION_VIGENTE_SI_APLICA
```

La puerta no podrá usar porcentajes agregados para ocultar una persona obligatoria pendiente. Si el paquete exige cobertura total para una función crítica, una sola identidad objetivo sin evidencia suficiente impide `PASS` para esa función.

#### 8. Competencia, evaluación y vigencia

La terminación de un contenido no equivale automáticamente a competencia.

`COMPETENCIA_Y_VIGENCIA` exigirá, cuando aplique:

1. evaluación ligada a la versión impartida;
2. criterio de aprobación definido antes de ejecutar la evaluación;
3. resultado individual o agregado reconciliable con la población objetivo;
4. vigencia y fecha de expiración cuando exista;
5. regla de renovación o recertificación cuando corresponda;
6. evidencia de aprobación de excepciones, si el contrato canónico permite alguna;
7. bloqueo de la actividad cuando la competencia o certificación requerida esté vencida o no demostrada.

Un período de prueba laboral favorable, antigüedad, experiencia previa declarada o posesión de un rol no sustituye la evidencia formativa exigida por el cambio actual.

#### 9. Material de apoyo requerido

El material de apoyo aplicable deberá estar gobernado como contenido operativo, no como archivo informal.

Cada elemento deberá declarar como mínimo:

- `material_id` estable;
- tipo de material;
- título;
- versión;
- propietario;
- estado de aprobación;
- fecha de vigencia;
- expiración o condición de revisión, cuando aplique;
- audiencia objetivo;
- proceso, paso o situación cubierta;
- aplicación, dispositivo, equipo, sede o área cuando restrinjan su uso;
- aplicabilidad a operación normal o contingencia;
- clasificación o sensibilidad de acceso cuando corresponda;
- punto controlado de publicación o distribución;
- referencia de integridad o versión que permita demostrar que se consultó el contenido correcto;
- alternativa de acceso cuando la contingencia aplicable pueda dejar indisponible el canal primario;
- resultado de disponibilidad y usabilidad;
- bloqueo concreto y propietario cuando no sea utilizable.

El material puede adoptar la forma de guía, manual, ayuda rápida, instrucción visual, contenido formativo o apoyo equivalente, siempre que conserve control de versión, propiedad, audiencia y vigencia.

#### 10. Criterio de disponibilidad y usabilidad

`MATERIAL_DE_APOYO = PASS` requiere demostrar simultáneamente que el contenido:

1. existe en la versión exigida;
2. está aprobado y vigente;
3. es accesible para la audiencia objetivo con sus permisos reales;
4. puede localizarse desde el contexto en el que será necesario;
5. es legible y utilizable en el dispositivo o medio previsto;
6. no exige credenciales, herramientas o conectividad que el escenario de contingencia declarado no tendrá disponibles;
7. coincide con el procedimiento y candidato actuales;
8. no contiene instrucciones obsoletas o contradictorias;
9. identifica con claridad cuándo aplica y cuándo debe abandonarse una contingencia, si esa es su función;
10. puede ser distinguido de versiones retiradas.

Una captura de pantalla, una URL aislada o un archivo presente en almacenamiento no prueban por sí solos accesibilidad, vigencia ni usabilidad.

#### 11. Alineación con el cambio implementado

La capacitación y el material deberán vincularse al mismo cambio sometido al readiness.

Para cada elemento aplicable deberá ser posible reconstruir:

```text
PAQUETE
→ CANDIDATO IMPLEMENTADO
→ PROCESO / PROCEDIMIENTO AFECTADO
→ VERSION DE CAPACITACION
→ VERSION DE MATERIAL
→ POBLACION OBJETIVO
→ EVIDENCIA DE COMPLETITUD / COMPETENCIA / DISPONIBILIDAD
```

Será `FAIL` si la capacitación se impartió sobre una versión que ya no corresponde al candidato o si el material describe una operación distinta a la aprobada.

Cuando el cambio posterior sea únicamente editorial y no altere comportamiento, el propietario deberá demostrar esa equivalencia; no podrá asumirse por similitud de nombre.

#### 12. Simulacros, walkthroughs y práctica controlada

Cuando la competencia no pueda demostrarse de forma suficiente mediante evaluación teórica o cuando exista contingencia, equipo, seguridad o secuencia operativa crítica, el gate podrá exigir práctica controlada, walkthrough o simulacro seguro.

La evidencia deberá registrar:

- escenario;
- objetivo;
- versión del procedimiento;
- población o roles participantes;
- condiciones de inicio;
- pasos críticos observados;
- desviaciones;
- criterio de éxito;
- resultado;
- acciones correctivas y propietario cuando existan;
- referencia a la evidencia.

El readiness documental no autoriza simulaciones destructivas, exposición de datos productivos, activación real de contingencias, fallos deliberados en producción ni acciones físicas inseguras. `SHELL-CI-021` solo podrá usar ejercicios compatibles con el ambiente y las autorizaciones vigentes.

#### 13. Regla de decisión por plano

##### `PASS`

Se utiliza únicamente cuando toda la evidencia aplicable está completa, vigente, reconciliada con el alcance y libre de contradicciones materiales.

##### `FAIL`

Se utiliza cuando existe evidencia suficiente para demostrar incumplimiento, por ejemplo:

- capacitación requerida no completada;
- evaluación obligatoria fallida;
- certificación vencida;
- población objetivo incompleta;
- entrenamiento impartido sobre versión incorrecta;
- material obsoleto o contradictorio;
- material inaccesible para la audiencia objetivo;
- procedimiento de contingencia requerido sin práctica suficiente cuando esta es obligatoria;
- contenido que induce una acción no autorizada o insegura;
- capacitación usada indebidamente como sustituto de autorización, permiso o validación funcional.

##### `BLOQUEADO`

Se utiliza cuando falta un insumo obligatorio para decidir y no existe evidencia suficiente para afirmar cumplimiento o incumplimiento. Debe registrar el insumo faltante, su propietario y la condición de salida.

##### `NO_APLICA`

Solo procede mediante una justificación positiva basada en el alcance del paquete. No se obtiene por ausencia de datos, por falta de una sesión, por inexistencia actual de material o porque el cambio parezca pequeño.

#### 14. Agregación estricta del gate

Los cuatro planos se agregan así:

1. cada plano se clasifica exactamente una vez;
2. cualquier `FAIL` produce `FAIL` agregado;
3. si no existe `FAIL` pero existe al menos un `BLOQUEADO`, el resultado agregado es `BLOQUEADO`;
4. el gate solo puede producir `PASS` cuando todos los planos aplicables están en `PASS` y cada `NO_APLICA` está justificado;
5. el gate completo solo puede ser `NO_APLICA` cuando los cuatro planos están justificadamente fuera del alcance del paquete;
6. no existe aprobación parcial ni promedio ponderado;
7. un porcentaje alto de capacitación no compensa una función crítica sin preparación demostrada.

#### 15. Evidencia aceptable

Según aplicabilidad, `SHELL-CI-021` podrá aceptar combinaciones reproducibles de:

- catálogo versionado de capacitaciones;
- asignaciones controladas por rol, proceso o cambio;
- registros de sesión o terminación ligados a versión;
- evaluaciones con criterio y resultado trazable;
- certificaciones y vigencias;
- reconciliación objetivo/completado/aprobado/pendiente/vencido;
- evidencia de renovación cuando aplique;
- catálogo versionado de material de apoyo;
- contenido aprobado con propietario, audiencia y vigencia;
- referencias de integridad o versión del material;
- comprobaciones de acceso de solo lectura desde el contexto objetivo;
- walkthroughs de localización y uso del material;
- simulacros o práctica controlada autorizada;
- matriz que vincule paquete, candidato, procedimiento, capacitación, material y población objetivo;
- evidencia de corrección de brechas detectadas y nueva verificación.

La evidencia deberá permitir reproducir la decisión sin depender de conocimiento oral del equipo que la produjo.

#### 16. Evidencia insuficiente

No bastan, por sí solos:

- una capacitación programada pero no realizada;
- una invitación enviada;
- una lista de asistencia cuando se exige competencia;
- un curso marcado como completado sin versión;
- una evaluación sin criterio de aprobación;
- una certificación vencida;
- una declaración verbal de experiencia previa;
- antigüedad o período de prueba laboral;
- un archivo cargado sin propietario, aprobación o vigencia;
- una presentación o PDF sin control de versión;
- una captura de pantalla;
- un enlace accesible solo al autor o mantenedor;
- documentación genérica que no corresponde al paquete;
- material que solo describe el estado anterior al cambio;
- la aprobación de `READY-GATE-008` por sí sola;
- la existencia de un rol o permiso;
- el hecho de que una persona haya podido ejecutar una acción una vez;
- una demostración del instructor sin evidencia de que la población objetivo pueda ejecutar lo requerido.

#### 17. Casos especiales

##### 17.1 Cambio sin capacitación nueva

Un paquete puede no requerir una capacitación nueva, pero deberá justificarlo. Si depende de una competencia preexistente, se verificará que la competencia siga vigente y que la versión previa continúe siendo compatible con el cambio.

##### 17.2 Material sin cambio de contenido

Si un material existente continúa aplicando, deberá probarse su vigencia, accesibilidad y correspondencia con el candidato. La ausencia de edición reciente no es evidencia de obsolescencia, pero tampoco de vigencia.

##### 17.3 Población variable o rotativa

Cuando la población cambie por turnos, altas, rotación o sustituciones, el gate deberá usar una fuente controlada con instante o ventana de corte. Toda incorporación posterior que entre al alcance del piloto deberá satisfacer el mismo contrato antes de ejecutar la función protegida.

##### 17.4 Equipos y dispositivos

La capacitación de manejo puede ser requisito de esta puerta. La verificación de que el equipo, periférico, red, escáner o impresora funciona pertenece a `READY-GATE-007` y no se duplica aquí.

##### 17.5 Contingencia

Cuando `READY-GATE-008` determine que un modo de contingencia es aplicable, `READY-GATE-009` deberá verificar que las personas aplicables conocen su activación, límites, operación y salida, y que cuentan con ayudas utilizables bajo las restricciones reales de ese modo.

##### 17.6 Formación y autorización

La capacitación nunca crea autoridad, rol, permiso, asignación laboral ni excepción de seguridad. Si una función exige además autorización, ambos contratos deben cumplirse de manera independiente.

#### 18. Registro mínimo de resultado de `SHELL-CI-021`

La ejecución posterior deberá producir un registro con, al menos:

- `package_id`;
- candidato evaluado;
- ambiente;
- instante de evaluación;
- población objetivo o referencia a su snapshot controlado;
- resultados de los cuatro planos;
- resumen cuantitativo de capacitaciones aplicables;
- resumen cuantitativo de población objetivo, completada, aprobada, pendiente y vencida;
- materiales aplicables y sus versiones;
- simulacros o prácticas exigidos y su resultado;
- brechas detectadas;
- propietario de cada bloqueo;
- evidencia asociada;
- resultado agregado;
- condición de reevaluación cuando no exista `PASS`.

El registro debe excluir secretos y minimizar datos personales.

#### 19. Requisitos de prueba derivados

**Resultado:** NO GENERA REQUISITOS DE PRUEBA

**Justificación:** esta tarea no introduce un comportamiento ejecutable nuevo. Especializa la puerta documental con la que `SHELL-CI-021` deberá demostrar preparación de personas, competencia, vigencia y material de apoyo sobre contratos canónicos ya definidos. La ejecución, las evaluaciones y la evidencia física corresponden a la fase posterior de readiness.

**Requisitos creados:** 0

**Requisitos modificados:** 0

#### 20. Criterios de aceptación

`READY-GATE-009` se considera documentalmente completa únicamente si:

1. separa capacitación, competencia/vigencia, material de apoyo y alineación con el cambio;
2. conserva los cuatro planos como decisiones independientes;
3. clasifica las siete clases canónicas de capacitación por aplicabilidad;
4. exige versión exacta de capacitación y del candidato evaluado;
5. exige población objetivo derivada del alcance real del paquete;
6. reconcilia objetivo, completado, aprobado, pendiente y vencido;
7. impide ocultar una identidad crítica pendiente mediante porcentajes agregados;
8. diferencia asistencia de competencia demostrada;
9. exige evaluación cuando el contrato de riesgo o proceso la requiera;
10. exige vigencia y renovación cuando correspondan;
11. bloquea la función protegida cuando la formación obligatoria esté vencida o no demostrada;
12. gobierna material con identidad, versión, propietario, aprobación, audiencia y vigencia;
13. exige disponibilidad con permisos reales de la audiencia objetivo;
14. exige usabilidad en el dispositivo, medio y contexto previstos;
15. contempla acceso alternativo cuando una contingencia aplicable inutilice el canal primario;
16. exige coherencia entre paquete, candidato, procedimiento, capacitación y material;
17. contempla simulacro, práctica o walkthrough cuando el riesgo lo exija;
18. impide confundir capacitación con autorización o permiso;
19. impide confundir capacitación con período de prueba laboral;
20. impide usar `READY-GATE-008` como evidencia automática de preparación de personas;
21. define evidencia aceptable e insuficiente;
22. define `PASS`, `FAIL`, `BLOQUEADO` y `NO_APLICA` sin aprobación parcial;
23. exige propietario y condición de salida para todo bloqueo;
24. preserva minimización de datos personales y exclusión de secretos;
25. crea cero y modifica cero requisitos de prueba;
26. no ejecuta capacitación, evaluación, certificación, cambios de acceso ni acciones físicas;
27. mantiene `READY-GATE-010` exclusivamente reservada como siguiente tarea.

#### 21. Continuidad canónica

##### ÚLTIMA TAREA APROBADA
READY-GATE-008 — Definir criterio y evidencia para confirmar procedimientos operativos y contingencias

##### TAREA ACTUAL APROBADA
READY-GATE-009 — Definir criterio y evidencia para confirmar capacitación y material de apoyo

##### SIGUIENTE TAREA RESERVADA
READY-GATE-010 — Definir criterio y evidencia para confirmar mesa de soporte, responsables y escalamiento


### ✅ READY-GATE-010 — Definir criterio y evidencia para confirmar mesa de soporte, responsables y escalamiento

**Estado:** APROBADA  
**Tarea anterior:** `READY-GATE-009 — Definir criterio y evidencia para confirmar capacitación y material de apoyo` — APROBADA  
**Tarea siguiente:** `READY-GATE-011 — Definir criterio y evidencia para confirmar monitoreo, métricas y alertas` — RESERVADA  
**Tipo de tarea:** documental; definición normativa y materializada del criterio de readiness y de la evidencia que deberá confirmar, por paquete, ambiente y ventana de piloto, que la mesa de soporte, sus responsables nominales, cobertura, niveles de atención, escalamiento y comunicaciones están realmente preparados antes de habilitar operación controlada  
**Repositorio propietario:** `vento-shell`  
**Archivo propietario:** `docs/plan-canonico/modular/bloques/E5_PLANIFICACION_DE_IMPLEMENTACION/03_PUERTA_DE_READINESS_OPERATIVO.md`  
**Ejecución posterior de la comprobación:** `SHELL-CI-021::<package_id>` después de `SHELL-CI-020::<package_id>` y de la implementación aplicable del paquete  
**Cambios físicos autorizados:** ninguno; esta tarea no asigna personas, no crea turnos ni guardias, no abre casos reales, no ejecuta escalamiento, no modifica SLA, no publica canales, no configura VISO o ANIMA, no cambia código, datos, permisos, migraciones, notificaciones, proveedores ni Supabase  
**Requisitos de prueba creados o modificados:** 0

---

#### 1. Propósito

`READY-GATE-010` define la comprobación que permitirá responder, antes de un piloto de un paquete concreto:

```text
¿EXISTE UNA MESA DE SOPORTE REALMENTE UTILIZABLE PARA EL ALCANCE DEL PAQUETE?
+
¿EXISTE UN RESPONSABLE TECNOLÓGICO TITULAR Y UN SUPLENTE ACTIVOS Y ELEGIBLES?
+
¿CADA SERVICIO AFECTADO TIENE COBERTURA VIGENTE PARA LA VENTANA DEL PILOTO?
+
¿LOS NIVELES L0–L3 PUEDEN RECIBIR Y TRANSFERIR EL MISMO CASO SIN PERDER OWNERSHIP?
+
¿LAS CINCO CLASES DE ESCALAMIENTO TIENEN DESTINO, CANAL Y ACEPTACIÓN VERIFICABLES?
+
¿LOS COMPROMISOS DE SLA Y COMUNICACIÓN PUEDEN SER ATENDIDOS POR PERSONAS REALES?
=
READINESS DE SOPORTE DEMOSTRABLE
```

La finalidad no es demostrar que ya ocurrió un incidente real ni producir evidencia histórica de cumplimiento. La finalidad es impedir que un paquete llegue al piloto con una mesa visible pero inoperable, un responsable solo nominal, una transferencia sin aceptación, un proveedor usado como owner interno, un horario sin cobertura o un escalamiento cuyo destino no pueda ser alcanzado.

---

#### 2. Resultado sustantivo

La tarea materializa un contrato de readiness de soporte compuesto por seis planos coordinados:

1. `MESA_Y_ENTRADA` — el canal permitido conduce al expediente único de soporte y la mesa administrativa puede recibirlo y seguirlo;
2. `RESPONSABLES_NOMINALES` — titular, suplente y autoridades condicionadas son personas activas, trazables y elegibles;
3. `COBERTURA_Y_DISPONIBILIDAD` — cada servicio afectado dispone de una ventana de soporte compatible con el piloto y con sus compromisos;
4. `NIVELES_DE_ATENCION` — L0, L1, L2 y L3 conservan sus fronteras y existe handoff aceptable cuando el caso debe avanzar;
5. `ESCALAMIENTO` — las cinco clases canónicas tienen disparador, destino, canal, contexto y mecanismo de aceptación verificables;
6. `COMUNICACION_Y_CONTINUIDAD_DEL_CASO` — ownership, SLA, comunicaciones, historial y expediente permanecen íntegros durante reasignación, escalamiento, espera de tercero o cambio de turno.

El resultado de cada plano es uno de:

- `PASS`;
- `FAIL`;
- `BLOQUEADO`;
- `NO_APLICA`.

No existe resultado implícito por ausencia de datos.

---

#### 3. Alcance y fronteras

La comprobación se ejecutará por `package_id`, candidato de implementación, ambiente y ventana de piloto.

`READY-GATE-010`:

- consume el alcance aprobado del paquete sin ampliarlo;
- consume los servicios tecnológicos afectados por el paquete;
- consume las personas, roles, sedes, áreas y turnos ya preparados por `READY-GATE-004` sin volver a definirlos;
- consume los procedimientos y contingencias de `READY-GATE-008` sin volver a certificarlos;
- consume capacitación y material de apoyo de `READY-GATE-009` sin convertir conocimiento en cobertura humana;
- no sustituye `READY-GATE-002`, propietaria de migraciones aplicadas y datos validados;
- no sustituye `READY-GATE-011`, propietaria de monitoreo, métricas y alertas;
- no sustituye `READY-GATE-012`, propietaria de respaldo y rollback probados;
- no sustituye `READY-GATE-013`, propietaria de la línea base previa al piloto;
- no sustituye `READY-GATE-014`, propietaria del registro de riesgos aceptados y condiciones de suspensión;
- no sustituye `READY-GATE-015`, propietaria de la autoridad y el criterio para aprobar la entrada al piloto operativo.

La existencia de una cuenta, un grupo de mensajería, una URL, un nombre en un documento, un contrato de proveedor o un runbook no equivale por sí sola a readiness de soporte.

---

#### 4. Autoridades canónicas consumidas

La comprobación conserva sin redefinir:

- `VPROC-0058` como proceso único de solicitudes e incidentes tecnológicos;
- VISO como propietario de la experiencia administrativa del caso tecnológico;
- ANIMA como experiencia personal permitida para reportar, consultar, responder y validar cuando corresponda;
- `TI-DOM-001`, incluido el catálogo `TI-SERVICE-001` a `TI-SERVICE-011`, la responsabilidad `RESPONSABLE_TECNOLOGICO` y los cuatro niveles `TI-ATTN-001` a `TI-ATTN-004`;
- `TI-DOM-007`, incluidos prioridad, perfiles SLA, reloj, pausas, escalamiento, comunicación, restauración, validación y cierre;
- `TI-AUTH-001`, incluida la elegibilidad de titular y suplente y la segregación de decisiones protegidas;
- `TI-UX-001` y `TI-UX-002`, incluida la separación `PORTAL DEL TRABAJADOR ≠ MESA DE SERVICIO ADMINISTRATIVA`;
- el dossier vigente `DELIV-PKG-001..025::<package_id>` como fuente del alcance, ambiente, piloto, evidencia esperada, procedimientos, runbooks y aceptación del paquete;
- el resultado futuro de `SHELL-CI-020::<package_id>` como precondición técnica de pruebas antes de la comprobación operativa de `SHELL-CI-021::<package_id>`.

Ninguna de estas referencias autoriza a esta tarea a crear personas, permisos, turnos, calendarios, canales, casos, contratos o configuraciones físicas.

---

#### 5. Unidad de evaluación y universo esperado

La unidad mínima de evaluación es:

```text
package_id
+
candidate_id o referencia equivalente del candidato
+
ambiente
+
ventana de piloto
+
servicio tecnológico afectado
+
sede o alcance operativo cuando corresponda
```

El universo esperado no se deriva mirando qué personas aparecen disponibles en la mesa. Se obtiene primero del paquete aprobado y de sus servicios, actores, sedes y condiciones de piloto.

Reglas:

1. cada servicio tecnológico afectado deberá aparecer exactamente una vez en la reconciliación principal del gate para el alcance evaluado;
2. un mismo servicio puede requerir varias filas de cobertura por sede, ventana o nivel de atención, pero conserva un único `service_id`;
3. un servicio no afectado se marca `NO_APLICA` únicamente con justificación trazable al paquete;
4. si el paquete no permite determinar de forma exhaustiva qué servicios o sedes participan, el plano queda `BLOQUEADO`;
5. una muestra parcial de servicios, personas o escalaciones nunca produce `PASS` del paquete;
6. no se inventa un número global de técnicos, guardias, turnos o contactos.

---

#### 6. Registro mínimo de evidencia de readiness de soporte

Cada evaluación deberá poder reconstruir, como mínimo:

| Campo                       | Regla                                                                       |
| --------------------------- | --------------------------------------------------------------------------- |
| `package_id`                | identidad canónica del paquete                                              |
| `candidate_ref`             | candidato concreto sometido al gate                                         |
| `environment`               | ambiente realmente evaluado                                                 |
| `pilot_window`              | intervalo aprobado para el piloto                                           |
| `service_id`                | `TI-SERVICE-*` afectado                                                     |
| `site_scope`                | sede o alcance aplicable; no se usa `null` como global implícito            |
| `intake_channel`            | canal permitido por el contrato del servicio/caso                           |
| `case_system`               | autoridad que conserva el expediente tecnológico                            |
| `primary_responsible_actor` | titular nominal vigente cuando aplique                                      |
| `backup_responsible_actor`  | suplente nominal vigente cuando aplique                                     |
| `responsibility_scope`      | servicios, sedes, recursos o responsabilidades cubiertas por la designación |
| `coverage_window`           | ventana efectiva aplicable al servicio y piloto                             |
| `attention_level`           | nivel actual o esperado L0–L3                                               |
| `escalation_class`          | clase aplicable cuando exista condición de escalamiento                     |
| `escalation_target`         | persona, función o tercero autorizado según la clase                        |
| `acceptance_mechanism`      | forma verificable de aceptar transferencia o responsabilidad                |
| `next_commitment`           | próximo compromiso operativo o de comunicación cuando aplique               |
| `evidence_refs`             | referencias reproducibles y sanitizadas                                     |
| `result`                    | `PASS`, `FAIL`, `BLOQUEADO` o `NO_APLICA`                                   |
| `blocking_reason`           | causa concreta cuando no exista `PASS`                                      |
| `blocking_owner`            | función, tarea o fuente responsable de resolver el bloqueo                  |

El registro es evidencia del gate; no crea una tabla física ni una nueva fuente de verdad.

---

#### 7. Criterio para `MESA_Y_ENTRADA`

El plano queda `PASS` únicamente si el alcance del paquete demuestra una trayectoria operativa completa:

```text
ACTOR AUTORIZADO O INICIADOR PERMITIDO
→ CANAL DE ENTRADA PERMITIDO
→ MISMA IDENTIDAD DE CASO
→ RECEPCIÓN EN LA MESA ADMINISTRATIVA
→ TRIAGE / CLASIFICACIÓN
→ PROPIETARIO VIGENTE
→ SIGUIENTE ACCIÓN TRAZABLE
```

Cuando aplique la experiencia personal:

```text
ANIMA
→ reportar / consultar / responder / validar

VISO
→ recibir / clasificar / priorizar / asignar / escalar / diagnosticar / comunicar / restaurar / validar / cerrar
```

Criterios obligatorios:

1. el canal de entrada no se convierte en propietario del caso;
2. la mensajería no crea una identidad paralela;
3. una transición entre ANIMA, VISO, niveles de atención o proveedor conserva el mismo caso maestro;
4. la mesa debe poder distinguir cola, prioridad, riesgo SLA, propietario y siguiente compromiso;
5. la recepción debe poder atribuirse a un actor o sistema autorizado;
6. la prueba futura deberá usar un caso controlado o mecanismo equivalente autorizado y nunca inventar un resultado productivo;
7. acceso visual a la pantalla sin capacidad de recepción, seguimiento y ownership produce `FAIL`.

---

#### 8. Criterio para `RESPONSABLES_NOMINALES`

La función `RESPONSABLE_TECNOLOGICO` no constituye por sí sola una asignación nominal.

Antes del piloto deberá existir evidencia vigente de:

1. persona titular activa;
2. persona suplente activa;
3. designación organizacional vigente;
4. alcance explícito de servicios, sedes, recursos o responsabilidades;
5. permisos efectivos aplicables a cada acción requerida, sin inferencia por cargo;
6. inicio y fin de vigencia o mecanismo de revocación de la designación;
7. separación frente a decisiones que el titular o suplente no pueda autoaprobar;
8. canal de escalamiento cuando titular y suplente no sean elegibles, estén indisponibles o exista una decisión reservada.

Reglas de gate:

- si existe función pero no identidad nominal vigente: `FAIL`;
- si la identidad nominal existe pero no puede demostrarse su vigencia o alcance: `BLOQUEADO`;
- si titular y suplente son la misma persona cuando se exige continuidad de responsabilidad: `FAIL`;
- si ambos existen pero una decisión protegida carece de autoridad separada: `FAIL`;
- si el paquete no requiere intervención humana de una función concreta, esa función puede ser `NO_APLICA`, pero la justificación debe derivar del flujo aprobado y no de ausencia casual de personal.

---

#### 9. Funciones que deben permanecer diferenciadas

La evaluación conserva las funciones canónicas y sus límites:

| Función                                     | Responsabilidad de readiness                                                                                         | No demuestra por sí sola                                       |
| ------------------------------------------- | -------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------- |
| `RESPONSABLE_TECNOLOGICO`                   | coordinación técnica, clasificación, diagnóstico, restauración y trazabilidad dentro de autorización                 | privilegio permanente, autoaprobación o cierre de alto impacto |
| `RESPONSABLE_DEL_PROCESO`                   | contexto empresarial y validación de recuperación del resultado protegido                                            | administración técnica                                         |
| `GERENCIA_O_SUPERVISION_DE_SEDE`            | contexto territorial y coordinación local                                                                            | ownership técnico o alcance global                             |
| `RESPONSABLE_DE_SEGURIDAD_TECNOLOGICA`      | intervención cuando identidad, privilegio, evidencia o seguridad lo exijan                                           | acceso ilimitado                                               |
| `COORDINACION_DE_OPERACIONES`               | control o aceptación condicionada en prioridad crítica, cambio sensible, incidente mayor o riesgo cuando corresponda | diagnóstico técnico                                            |
| `TRABAJADOR`                                | reporte, evidencia y confirmación dentro de su contexto                                                              | ejecución o aprobación privilegiada                            |
| `TECNICO_O_PRESTADOR_EXTERNO` / `PROVEEDOR` | ejecución especializada o contractual delimitada                                                                     | propiedad del caso, autoridad empresarial o cierre final       |

Una persona puede acumular funciones solo donde el modelo de autorización y segregación lo permita. El gate no deduce autoridad por cargo, jerarquía, canal, dispositivo, nivel de atención ni posesión de credenciales.

---

#### 10. Criterio para `COBERTURA_Y_DISPONIBILIDAD`

Para cada servicio afectado deberá existir una ventana de soporte vigente y atribuible que cubra la ventana de piloto o explique formalmente cómo se conserva la obligación aplicable.

La comprobación deberá reconciliar:

```text
SERVICIO AFECTADO
+
SEDE / ALCANCE
+
VENTANA DEL PILOTO
+
TITULAR
+
SUPLENTE
+
NIVEL DE ATENCIÓN INICIAL
+
ESCALAMIENTO REQUERIDO
+
COMPROMISO SLA APLICABLE
=
COBERTURA OPERABLE
```

Reglas:

1. un calendario borrador no cuenta como cobertura;
2. un contrato vigente sin ventana, alcance o contacto operativo verificables no cuenta como cobertura;
3. soporte contratado no sustituye el ownership interno de VENTO;
4. la espera de proveedor no elimina la obligación interna de seguimiento y comunicación;
5. una ventana de soporte no puede reducir silenciosamente los compromisos canónicos del caso;
6. si el piloto atraviesa cambio de turno, la evidencia deberá demostrar handoff y continuidad de owner;
7. si existe una brecha entre ventana del piloto y cobertura humana, el resultado es `FAIL` salvo que el paquete tenga una salvaguarda aprobada que elimine realmente la exposición;
8. la ausencia de evidencia sobre cobertura no se interpreta como disponibilidad.

---

#### 11. Universo de servicios y ruta normal de atención

La evaluación utiliza exclusivamente las once familias vigentes de servicio y su ruta normal aprobada:

| Servicio         | Alcance resumido                                      | Ruta normal                         |
| ---------------- | ----------------------------------------------------- | ----------------------------------- |
| `TI-SERVICE-001` | cuentas, identidad y acceso tecnológico               | L1 → L2 → L3 condicional            |
| `TI-SERVICE-002` | endpoints y dispositivos compartidos                  | L0 → L1 → L2 → L3 condicional       |
| `TI-SERVICE-003` | redes y conectividad                                  | L1 → L2 → L3                        |
| `TI-SERVICE-004` | impresoras y periféricos                              | L0 → L1 → L2 → L3 condicional       |
| `TI-SERVICE-005` | aplicaciones, ambientes y proveedores tecnológicos    | L1 → L2 → L3                        |
| `TI-SERVICE-006` | solicitudes de soporte tecnológico                    | L0 → L1 → L2 → L3 condicional       |
| `TI-SERVICE-007` | incidentes y restauración tecnológica                 | L1 → L2 → L3 condicional            |
| `TI-SERVICE-008` | cambios, configuración y versiones tecnológicas       | L2 → L3 condicional                 |
| `TI-SERVICE-009` | pruebas y aceptación técnica de soluciones            | L2 → L3 condicional                 |
| `TI-SERVICE-010` | licencias, garantías, contratos y costos tecnológicos | L1 → L2 → L3 condicional            |
| `TI-SERVICE-011` | conocimiento, capacitación y adopción tecnológica     | L0 → L1; L2 si existe falla técnica |

El gate no fuerza a un paquete a recorrer niveles que no necesita, pero tampoco permite omitir un nivel o destino exigido por la capacidad necesaria para avanzar.

---

#### 12. Criterio para `NIVELES_DE_ATENCION`

Se conservan exactamente cuatro niveles:

| ID            | Nivel                       | Preparación que debe poder demostrarse                                                               |
| ------------- | --------------------------- | ---------------------------------------------------------------------------------------------------- |
| `TI-ATTN-001` | `L0_AUTOSERVICIO_GUIADO`    | guía o conocimiento aprobado, diagnóstico no privilegiado y salida clara hacia L1 cuando no resuelve |
| `TI-ATTN-002` | `L1_MESA_DE_SERVICIO`       | recepción, clasificación, contexto, evidencia, comunicación, seguimiento y acciones estándar seguras |
| `TI-ATTN-003` | `L2_ESPECIALISTA_TECNICO`   | diagnóstico avanzado, dependencias, restauración y preparación de cambio dentro de autorización      |
| `TI-ATTN-004` | `L3_PROVEEDOR_O_FABRICANTE` | soporte externo delimitado con evidencia devuelta al caso maestro y validación final de VENTO        |

Para `PASS`:

1. el nivel inicial debe ser compatible con la ruta del servicio;
2. el nivel receptor debe ser identificable antes de ejecutar una transferencia;
3. el receptor debe disponer del contexto mínimo para aceptar;
4. la aceptación debe ser trazable;
5. una transferencia no reinicia SLA ni borra breach;
6. un nivel superior no concede autorización adicional por jerarquía técnica;
7. L3 nunca cierra el caso maestro por VENTO.

---

#### 13. Criterio para `ESCALAMIENTO`

Se conservan exactamente cinco clases:

| Clase            | Disparador canónico                                                                      | Destino o resultado que debe estar preparado                                          |
| ---------------- | ---------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------- |
| `ESC_FUNCTIONAL` | ownership ambiguo, aprobación o decisión empresarial necesaria                           | responsable funcional incorporado o receptor válido sin perder owner tecnológico      |
| `ESC_TECHNICAL`  | L1 no puede diagnosticar o restaurar de forma segura                                     | L2 identificable, alcanzable y capaz de aceptar contexto, evidencia y pendientes      |
| `ESC_PROVIDER`   | garantía, ISP, fabricante, plataforma o soporte contratado requerido                     | L3 o subcaso externo correlacionado; VENTO conserva el caso maestro                   |
| `ESC_SECURITY`   | secreto, identidad, privilegio, compromiso, soporte remoto sensible o evidencia de abuso | responsable y controles de seguridad activables con detalle restringido               |
| `ESC_CONTINUITY` | no existe resultado mínimo seguro o la degradación supera el soporte ordinario           | evaluación separada y eventual caso vinculado de continuidad sin fusionar expedientes |

Para cada clase aplicable, el gate deberá poder demostrar:

- condición de disparo reconocible;
- persona, función o tercero receptor;
- canal operativo permitido;
- alcance territorial o de recurso cuando aplique;
- contexto mínimo que acompaña el handoff;
- mecanismo de aceptación;
- propietario que conserva el caso hasta aceptación;
- siguiente compromiso después del escalamiento;
- referencia de evidencia sanitizada.

Escalar no se deduce únicamente por tiempo transcurrido, cargo del solicitante, cantidad de mensajes o existencia de un proveedor.

---

#### 14. Compromisos temporales que el soporte debe poder atender

El gate no redefine SLA. Verifica que la preparación humana y operativa sea compatible con los cuatro perfiles ya aprobados:

| Perfil       | Prioridad     |                        Acuse |            Primera respuesta |                          Restauración / workaround |                                              Solicitud | Comunicación                                      |
| ------------ | ------------- | ---------------------------: | ---------------------------: | -------------------------------------------------: | -----------------------------------------------------: | ------------------------------------------------- |
| `TI-SLA-001` | `P1_CRITICAL` |                      ≤ 5 min |                     ≤ 15 min |                                           ≤ 60 min |         acción preautorizada o plan/autoridad ≤ 60 min | cada ≤ 30 min                                     |
| `TI-SLA-002` | `P2_HIGH`     |                     ≤ 15 min |                     ≤ 30 min |                                              ≤ 4 h |         ≤ 8 h de ventana o fecha comprometida aceptada | cada ≤ 60 min                                     |
| `TI-SLA-003` | `P3_MEDIUM`   | ≤ 4 h de ventana de servicio | ≤ 8 h de ventana de servicio | ≤ 2 días hábiles de servicio o workaround acordado |                  ≤ 2 días hábiles o fecha comprometida | al menos una vez por día hábil con trabajo activo |
| `TI-SLA-004` | `P4_LOW`      |                ≤ 1 día hábil |                ≤ 1 día hábil |            planificada; ordinario ≤ 5 días hábiles | programación o cumplimiento ordinario ≤ 5 días hábiles | por hito o cambio de fecha                        |

La evidencia de readiness deberá mostrar qué persona o función puede asumir el próximo compromiso durante la ventana evaluada. Una tabla de SLA sin capacidad humana atribuible no produce `PASS`.

---

#### 15. Escalamiento preventivo por riesgo de SLA

La preparación deberá contemplar los umbrales ya aprobados:

| Prioridad     | Umbral preventivo                                                     |
| ------------- | --------------------------------------------------------------------- |
| `P1_CRITICAL` | 50 % del objetivo de restauración sin estrategia validada             |
| `P2_HIGH`     | 50 % del objetivo de restauración sin diagnóstico o workaround viable |
| `P3_MEDIUM`   | 75 % del objetivo vigente sin siguiente acción y propietario          |
| `P4_LOW`      | fecha comprometida en riesgo o dependencia material modificada        |

Al alcanzar el objetivo sin resultado, el soporte deberá poder registrar breach, elevar el nivel requerido y comunicar un nuevo compromiso sin borrar prioridad, historial ni ownership.

El gate no exige provocar un incumplimiento real. Exige evidencia de que la ruta, los destinatarios y el mecanismo que responderían al umbral están materializados y alcanzables.

---

#### 16. Asignación, aceptación y continuidad del owner

Se conserva la regla:

```text
PROPONER ASIGNACION
≠
ACEPTAR ASIGNACION
≠
TRANSFERIR RESPONSABILIDAD EFECTIVA
```

Toda transferencia que deba ser considerada preparada deberá conservar:

- propietario anterior;
- destinatario o función propuesta;
- motivo;
- momento;
- pendientes;
- evidencia relevante;
- fecha objetivo;
- aceptación trazable del receptor.

Hasta la aceptación, el propietario anterior no queda liberado.

Una reasignación o escalamiento:

- no crea un caso nuevo;
- no reinicia SLA;
- no borra breach;
- no amplía autorización;
- no elimina el historial;
- no permite que el caso quede temporalmente sin propietario.

---

#### 17. Comunicación durante soporte y escalamiento

La preparación deberá conservar tres planos separados:

```text
MENSAJE AL SOLICITANTE
≠
NOTA INTERNA DE DIAGNOSTICO
≠
COMUNICACION A PROVEEDOR
```

Cuando aplique, la ruta de comunicación deberá poder identificar:

1. qué se sabe;
2. qué está afectado;
3. qué continúa funcionando;
4. qué acción segura debe realizar o evitar la persona;
5. quién responde;
6. cuándo será la siguiente actualización o compromiso;
7. si existe workaround;
8. cuándo se solicitará validación;
9. qué quedó restaurado y qué continúa pendiente.

Esperar información, aprobación o proveedor no elimina automáticamente ownership ni toda obligación de comunicación.

---

#### 18. Incidente mayor, seguridad y continuidad

Cuando el alcance del paquete pueda producir un `MAJOR_INCIDENT`, la preparación deberá identificar antes del piloto:

- coordinador;
- responsables activos;
- canal de coordinación;
- cadencia de comunicación aplicable;
- ruta de escalamiento preventivo;
- dependencias críticas;
- autoridad requerida para decisiones protegidas;
- vínculo de evaluación de continuidad;
- mecanismo de handoff entre turnos o personas.

Reglas:

1. `MAJOR_INCIDENT` no activa automáticamente continuidad;
2. `ESC_CONTINUITY` abre una evaluación separada y conserva identidades correlacionadas;
3. `ESC_SECURITY` restringe detalle y activa autoridad de seguridad, no amplía visibilidad pública del caso;
4. prioridad crítica no concede privilegio;
5. quien ejecuta una acción crítica o sensible no puede ser por sí solo la aprobación final ni el único validador de su propia corrección.

---

#### 19. Evidencia aceptable

Puede sustentar el gate, según aplique:

- roster vigente de titular, suplente y autoridades condicionadas con identificadores de actor y vigencia;
- designación organizacional trazable de `RESPONSABLE_TECNOLOGICO` y alcance cubierto;
- calendario o matriz de cobertura vigente por servicio, sede y ventana;
- configuración o consulta de solo lectura que demuestre owner, nivel de atención, destino de escalamiento y aceptación;
- caso controlado no productivo o prueba operativa autorizada que demuestre entrada, recepción, ownership y continuidad de identidad;
- evidencia de que ANIMA y VISO proyectan el mismo caso cuando ambas superficies apliquen;
- registro de asignación y aceptación con actor, tiempo y pendientes;
- matriz vigente de escalamiento con sus cinco clases y receptores aplicables;
- directorio o fuente autoritativa de contactos operativos, sin secretos embebidos;
- evidencia de disponibilidad del canal de soporte o del mecanismo de contacto para la ventana evaluada;
- configuración de SLA y umbrales consultada desde su autoridad;
- evidencia de handoff entre titular y suplente o entre niveles de atención;
- contrato de proveedor y ventana de soporte únicamente como parte de la evidencia L3, nunca como sustituto del owner interno;
- ejercicio o simulación controlada de escalamiento cuando esté autorizado;
- referencias sanitizadas a runbooks, procedimientos y material de soporte vigentes.

Toda evidencia deberá quedar vinculada con paquete, candidato, ambiente, fecha, fuente, método, resultado y actor que la obtuvo.

---

#### 20. Evidencia insuficiente

No producen `PASS` por sí solos:

- una lista de nombres en un documento sin vigencia o identidad de actor;
- “alguien de TI” como responsable;
- titular sin suplente cuando la ventana requiere continuidad de responsabilidad;
- un grupo de chat, correo o teléfono cuya recepción no fue verificada;
- una URL de VISO accesible sin recepción y ownership de caso;
- un mensaje enviado desde ANIMA que no pueda correlacionarse con recepción administrativa;
- una asignación propuesta no aceptada;
- un proveedor disponible sin owner interno VENTO;
- un contrato o garantía sin ventana y alcance operativo verificables;
- un calendario borrador;
- un horario que deja descubierta parte de la ventana de piloto;
- un runbook disponible sin persona elegible para ejecutarlo;
- una prueba histórica de otro ambiente, paquete, sede o versión;
- una captura aislada sin fuente, fecha o identidad verificable;
- credenciales compartidas como mecanismo de continuidad;
- un caso cerrado usado como prueba de que todas las clases de escalamiento funcionan;
- telemetría verde o ausencia de alertas, que pertenece al gate de monitoreo;
- silencio del receptor interpretado como aceptación de transferencia.

---

#### 21. Decisión por plano

| Plano                                 | `PASS`                                                             | `FAIL`                                                    | `BLOQUEADO`                                           | `NO_APLICA`                                                                                                               |
| ------------------------------------- | ------------------------------------------------------------------ | --------------------------------------------------------- | ----------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------- |
| `MESA_Y_ENTRADA`                      | trayecto autorizado y expediente único demostrables                | canal, recepción, caso u ownership fallan                 | fuente o ambiente impiden determinar el resultado     | no permitido a nivel de paquete; toda implementación debe conservar una ruta de soporte para sus efectos                  |
| `RESPONSABLES_NOMINALES`              | titular, suplente, alcance y segregación vigentes                  | falta persona obligatoria, suplencia o autoridad separada | vigencia/elegibilidad no puede resolverse             | solo para una autoridad condicionada realmente ajena al flujo; titular y suplente tecnológicos siguen siendo obligatorios |
| `COBERTURA_Y_DISPONIBILIDAD`          | toda ventana requerida queda cubierta                              | existe hueco material de cobertura                        | calendario o ventana autoritativa no puede resolverse | permitido únicamente para una fila de servicio/sede fuera del alcance; no para la cobertura global del paquete            |
| `NIVELES_DE_ATENCION`                 | niveles aplicables tienen receptor y handoff aceptable             | falta capacidad o transferencia válida                    | no puede determinarse capacidad requerida             | nivel no requerido por la ruta del servicio                                                                               |
| `ESCALAMIENTO`                        | cada clase aplicable tiene disparador, destino, canal y aceptación | ruta aplicable incompleta o inalcanzable                  | autoridad o destino no puede resolverse               | clase no aplicable al alcance demostrado                                                                                  |
| `COMUNICACION_Y_CONTINUIDAD_DEL_CASO` | owner, historial y compromisos sobreviven handoffs y esperas       | se pierde owner, caso, historial o compromiso             | evidencia no permite reconstruir continuidad          | únicamente si no existe transferencia ni comunicación aplicable, con justificación                                        |

Un `NO_APLICA` nunca se utiliza para ocultar falta de evidencia.

---

#### 22. Regla agregada de decisión

Resultado del gate por paquete:

```text
SI existe cualquier FAIL
→ FAIL

SI no existe FAIL y existe cualquier BLOQUEADO
→ BLOQUEADO

SI todos los planos aplicables están en PASS
   y todo NO_APLICA está justificado
→ PASS
```

Reglas adicionales:

1. un servicio afectado sin responsable o cobertura produce `FAIL` del paquete;
2. una escalación obligatoria sin receptor produce `FAIL`;
3. un responsable esperado cuyo universo no puede determinarse produce `BLOQUEADO`;
4. una muestra parcial nunca produce `PASS`;
5. una sola prueba de escalamiento exitosa no certifica las demás clases aplicables;
6. un proveedor no subsana la ausencia del owner interno;
7. la evidencia debe pertenecer al candidato y ambiente evaluados;
8. ningún resultado se hereda automáticamente de un piloto o release anterior.

---

#### 23. Estados y pendientes de ejecución

Después de esta tarea documental:

| Elemento                                               | Estado                                                                                                |
| ------------------------------------------------------ | ----------------------------------------------------------------------------------------------------- |
| criterio de readiness de mesa de soporte               | `ESPECIFICADO`                                                                                        |
| criterio para titular y suplente                       | `ESPECIFICADO`                                                                                        |
| criterio de cobertura humana por servicio/sede/ventana | `ESPECIFICADO`                                                                                        |
| criterio para cuatro niveles de atención               | `ESPECIFICADO`                                                                                        |
| criterio para cinco clases de escalamiento             | `ESPECIFICADO`                                                                                        |
| criterio de continuidad de owner y aceptación          | `ESPECIFICADO`                                                                                        |
| personas nominales realmente configuradas              | `PENDIENTE_DE_EVIDENCIA` — ejecución en `SHELL-CI-021::<package_id>`                                  |
| cobertura real vigente para el piloto                  | `PENDIENTE_DE_EVIDENCIA` — ejecución en `SHELL-CI-021::<package_id>`                                  |
| prueba real de entrada, asignación y escalamiento      | `PENDIENTE_DE_EVIDENCIA` — ejecución en `SHELL-CI-021::<package_id>`                                  |
| evidencia histórica de cumplimiento SLA                | `FUERA_DE_ALCANCE` de este gate; permanece bajo sus tareas de observabilidad y operación propietarias |
| monitoreo, métricas y alertas                          | `FUERA_DE_ALCANCE` — `READY-GATE-011`                                                                 |

No queda un pendiente narrativo sin destino documental.

---

#### 24. Secuencia de ejecución futura

La definición documental no ejecuta la comprobación.

Para cada paquete, la secuencia aplicable permanece:

```text
E5-GATE-008::<package_id>
→ SHELL-CI-020::<package_id>
→ implementación aplicable del paquete
→ SHELL-CI-021::<package_id>
→ SHELL-CI-022::<package_id>
```

`SHELL-CI-021::<package_id>` deberá consumir este contrato y registrar evidencia real del candidato. Un `PASS` documental de esta tarea no constituye un `PASS` operativo del paquete.

---

#### 25. Cobertura de prueba heredada

La tarea consume cobertura vigente que ya protege, entre otros comportamientos:

- `TREQ-VISO-002`, para el expediente completo de mesa de servicio, asignación, comunicaciones, diagnóstico, restauración, validación, cierre, reapertura e incidente crítico;
- `TREQ-VISO-046`, para prioridad derivada, los cuatro perfiles SLA, reloj reproducible, pausas autorizadas y escalamiento preventivo.

`READY-GATE-010` no cambia esos comportamientos. Define la evidencia de preparación que deberá comprobarse antes del piloto.

---

#### 26. Requisitos de prueba derivados

**Resultado:** NO GENERA REQUISITOS DE PRUEBA

**Justificación:** la tarea no introduce un proceso, estado, SLA, prioridad, nivel de atención, clase de escalamiento, mecanismo de autorización, canal, regla de ownership ni comportamiento ejecutable nuevo. Materializa exclusivamente el criterio de readiness y el manifiesto mínimo de evidencia con el que una etapa posterior deberá confirmar que los contratos de soporte ya aprobados están realmente preparados para el candidato y la ventana de piloto.

**Requisitos creados:** 0  
**Requisitos modificados:** 0  
**Fragmentos 04A afectados:** 0

---

#### 27. Criterios de aceptación

- [x] la continuidad vigente es `READY-GATE-009 → READY-GATE-010 → READY-GATE-011`;
- [x] la tarea permanece exclusivamente documental;
- [x] la comprobación se define por paquete, candidato, ambiente y ventana de piloto;
- [x] se materializan seis planos de decisión independientes;
- [x] el universo esperado se deriva del paquete antes de consultar la mesa;
- [x] una muestra parcial no puede producir `PASS`;
- [x] se conserva VISO como mesa administrativa y ANIMA como experiencia personal cuando corresponda;
- [x] una transición entre superficies o niveles conserva el mismo caso maestro;
- [x] acceso visual a la mesa no equivale a readiness de soporte;
- [x] `RESPONSABLE_TECNOLOGICO` no se trata como rol base ni identidad nominal;
- [x] se exige titular activo y suplente activo antes del piloto cuando corresponda;
- [x] se exige designación, alcance, vigencia y revocación verificables;
- [x] se conserva segregación para decisiones críticas o sensibles;
- [x] el proveedor nunca se convierte en owner interno, aprobador empresarial ni responsable final de cierre;
- [x] se exige cobertura vigente por servicio, sede y ventana aplicables;
- [x] un calendario borrador no cuenta como cobertura;
- [x] se preservan las once familias `TI-SERVICE-001` a `TI-SERVICE-011` sin renombrarlas;
- [x] se preservan exactamente cuatro niveles `TI-ATTN-001` a `TI-ATTN-004`;
- [x] nivel de atención no se confunde con prioridad, SLA o autorización;
- [x] transferencia exige receptor identificable, contexto y aceptación;
- [x] hasta aceptación, el propietario anterior conserva responsabilidad;
- [x] reasignación no reinicia SLA ni borra breach;
- [x] se preservan exactamente cinco clases de escalamiento;
- [x] cada clase aplicable exige disparador, destino, canal, contexto y aceptación verificables;
- [x] se preservan los cuatro perfiles SLA y sus compromisos sin modificarlos;
- [x] se preservan los cuatro umbrales preventivos de escalamiento;
- [x] el gate no exige provocar un breach real para demostrar preparación;
- [x] comunicación a solicitante, nota interna y proveedor permanecen separadas;
- [x] espera de proveedor no elimina ownership ni toda obligación de comunicación;
- [x] incidente mayor y continuidad permanecen como identidades separadas y correlacionables;
- [x] se definen `PASS`, `FAIL`, `BLOQUEADO` y `NO_APLICA` por plano;
- [x] un servicio afectado sin responsable o cobertura produce `FAIL`;
- [x] toda evidencia futura queda vinculada a paquete, candidato, ambiente, fecha, fuente, método, resultado y actor;
- [x] la ejecución real queda asignada a `SHELL-CI-021::<package_id>`;
- [x] se generan cero cambios en requisitos de prueba;
- [x] se generan cero cambios físicos, de código, datos, permisos, notificaciones, migraciones o Supabase;
- [x] `READY-GATE-011` permanece únicamente reservada.

---

#### 28. Continuidad

ÚLTIMA TAREA APROBADA
`READY-GATE-009 — Definir criterio y evidencia para confirmar capacitación y material de apoyo`

TAREA ACTUAL APROBADA
`READY-GATE-010 — Definir criterio y evidencia para confirmar mesa de soporte, responsables y escalamiento`

SIGUIENTE TAREA RESERVADA
`READY-GATE-011 — Definir criterio y evidencia para confirmar monitoreo, métricas y alertas`


### ✅ READY-GATE-011 — Definir criterio y evidencia para confirmar monitoreo, métricas y alertas

**Estado:** APROBADA  
**Tarea anterior:** `READY-GATE-010 — Definir criterio y evidencia para confirmar mesa de soporte, responsables y escalamiento` — APROBADA  
**Tarea siguiente:** `READY-GATE-012 — Definir criterio y evidencia para confirmar respaldo y rollback probados` — RESERVADA  
**Tipo de tarea:** documental; definición normativa y materializada de la puerta de readiness que deberá confirmar, por paquete y ambiente objetivo, que el monitoreo, las métricas, los SLI/SLO aplicables, la salud, las alertas, el routing, los runbooks, la protección de telemetría y el metamonitoreo requeridos se encuentran realmente materializados y producen evidencia accionable antes de cutover o piloto, sin instrumentar físicamente servicios ni configurar proveedores, dashboards, reglas, canales o alertas productivas  
**Repositorio propietario:** `vento-shell`  
**Archivo propietario:** `docs/plan-canonico/modular/bloques/E5_PLANIFICACION_DE_IMPLEMENTACION/03_PUERTA_DE_READINESS_OPERATIVO.md`  
**Cambios físicos autorizados:** ninguno; no crea ni modifica código, agentes, SDK, collectors, exportadores, dashboards, reglas de alerta, canales, secretos, integraciones, infraestructura, configuración remota, tablas, RLS, RPC, funciones, triggers, Edge Functions, migraciones, datos, despliegues ni configuración de Supabase  
**Requisitos de prueba creados o modificados:** 0

**Qué se hace:** fijar el contrato que deberá ejecutar posteriormente `SHELL-CI-021::<package_id>` para demostrar que la porción de observabilidad definida por el expediente aprobado del paquete ya existe en el ambiente objetivo, produce señales frescas y correlacionables, permite consultar las métricas y SLI requeridos, activa alertas accionables con routing y runbook verificables, detecta su propia degradación, protege datos sensibles y distingue salud técnica de resultado empresarial. Esta tarea no afirma que dicha instrumentación esté implementada hoy y no ejecuta pruebas operativas de los paquetes.

---

#### 1. Propósito

Antes de permitir que un paquete avance desde implementación física hacia cutover o piloto, la instancia de readiness deberá poder responder con evidencia real:

```text
¿QUÉ PARTE DEL PAQUETE DEBE SER OBSERVABLE?
¿QUÉ SEÑALES REALES ESTÁ PRODUCIENDO EN EL AMBIENTE OBJETIVO?
¿SON FRESCAS, CORRELACIONABLES Y ATRIBUIBLES A LA VERSIÓN CORRECTA?
¿QUÉ MÉTRICAS Y SLI SE PUEDEN CONSULTAR Y REPRODUCIR?
¿QUÉ SLO U OBJETIVO APROBADO GOBIERNA CADA MEDICIÓN, CUANDO EXISTA?
¿QUÉ ALERTAS SON ACCIONABLES Y QUIÉN LAS RECIBE?
¿EL ROUTING, FALLBACK, ACK Y ESCALAMIENTO FUNCIONAN?
¿EL RUNBOOK CORRESPONDIENTE ESTÁ VIGENTE Y ES EJECUTABLE?
¿SE DETECTA LA CAÍDA DEL PROPIO PIPELINE DE OBSERVABILIDAD?
¿LA TELEMETRÍA EVITA SECRETOS, DATOS SENSIBLES Y CARDINALIDAD INCONTROLADA?
¿LA SALUD TÉCNICA COINCIDE CON EL RESULTADO EMPRESARIAL OBSERVABLE?
```

La puerta no aprueba un paquete porque exista un dashboard, porque no hayan aparecido alertas o porque un health check responda. Aprueba únicamente cuando la cobertura requerida puede demostrarse de extremo a extremo en el ambiente y versión que serán utilizados por el piloto o cutover correspondiente.

---

#### 2. Entradas canónicas y autoridad preservada

La puerta consume y preserva, sin redefinir:

1. el expediente aprobado del `package_id` y su alcance materializado por `DELIV-PKG-001..025`;
2. `DELIV-PKG-013`, que fija los requisitos no funcionales aplicables y sus umbrales medibles sin certificar cumplimiento;
3. `DELIV-PKG-016`, que vincula requisitos de prueba, niveles, fixtures, ambientes, responsables y evidencia esperada sin ejecutar las pruebas;
4. `DELIV-PKG-017`, que define por paquete logs, métricas, trazas, alertas, auditoría, umbrales, propietarios, conservación y datos prohibidos, sin instrumentación física;
5. `DELIV-PKG-019`, para ambiente, release, secuencia y estrategia de rollout que determinan el contexto de observación;
6. `DELIV-PKG-021`, para runbooks, procedimientos y documentación que deba consumir soporte;
7. `DELIV-PKG-023`, para criterios medibles y manifiesto de evidencia del paquete;
8. `NFR-REQ-009`, incluidos sus contratos de observabilidad, perfiles, matriz de procesos, catálogo de alertas, soporte, runbooks y excepciones;
9. `NFR-REQ-012`, que exige correlacionar proceso, comando, servicio, cola, integración, dispositivo y resultado empresarial con alertas accionables y runbook;
10. `TI-DOM-010`, que gobierna monitoreo, señales, salud, métricas, SLI/SLO, alertas, logging y correlación con cambios;
11. `READY-GATE-010`, como autoridad de readiness sobre mesa de soporte, responsables, suplencia, cobertura y escalamiento humano;
12. los requisitos de prueba ya existentes que protegen observabilidad y los requisitos específicos vinculados al paquete;
13. la implementación física producida por `SHELL-CI-020::<package_id>` como objeto que deberá comprobarse, no como evidencia automática de readiness.

Precedencia obligatoria:

```text
CONTRATO DOCUMENTAL DEL PAQUETE
≠ INSTRUMENTACIÓN IMPLEMENTADA
≠ EVIDENCIA DE EJECUCIÓN
≠ READINESS APROBADO
```

La existencia de `DELIV-PKG-017` demuestra planificación documental. El resultado de `READY-GATE-011` solo podrá obtenerse cuando la futura instancia de `SHELL-CI-021::<package_id>` inspeccione y ejercite la implementación autorizada del paquete.

---

#### 3. Conjunto requerido de observabilidad por paquete

Antes de observar el ambiente objetivo deberá derivarse un `required_observability_set` únicamente desde el expediente aprobado del mismo paquete.

El conjunto incluirá, cuando pertenezcan al alcance real:

- procesos `VPROC-*` afectados;
- servicios `TI-SERVICE-*` afectados;
- aplicaciones y ambientes;
- endpoints y dispositivos compartidos;
- recursos de red;
- impresoras y periféricos;
- colas, outbox, inbox y jobs;
- integraciones internas y externas;
- bases de datos y servicios Supabase;
- Storage, Realtime y funciones cuando sean parte del paquete;
- proveedores o dependencias externas;
- operaciones offline y sincronización;
- cambios, releases, migraciones, feature flags o configuración que deban quedar correlacionados;
- respaldos o mecanismos de recuperación únicamente como fuente de señal cuando el paquete los consuma, sin adelantar `READY-GATE-012`.

Reglas:

1. el conjunto se deriva antes de mirar qué telemetría resulta cómoda o ya existe;
2. una fuente no se excluye porque todavía no esté instrumentada;
3. tampoco se incorporan indiscriminadamente los 69 procesos, los once servicios o todas las dependencias de VENTO cuando el paquete no las afecta;
4. toda exclusión material deberá estar respaldada por el alcance canónico del paquete;
5. una dependencia crítica indirecta se incluye cuando su fallo pueda invalidar el resultado del paquete;
6. una señal disponible pero fuera del conjunto requerido puede conservarse como evidencia complementaria, nunca como sustituto de una señal obligatoria ausente;
7. el conjunto conserva identidad canónica; no se crean objetos paralelos por nombre de dashboard, host, URL, IP o proveedor.

Resultado esperado: **100 % del conjunto requerido clasificado**, sin elementos críticos omitidos por muestreo.

---

#### 4. Seis planos independientes de readiness

La evaluación se divide en seis planos. Un resultado favorable en uno no compensa un fallo en otro.

| Plano                                   | Pregunta de readiness                                                                                                    | Evidencia mínima                                                                                           |
| --------------------------------------- | ------------------------------------------------------------------------------------------------------------------------ | ---------------------------------------------------------------------------------------------------------- |
| **Señal y correlación**                 | ¿la operación o elemento produce señales atribuibles al paquete, ambiente, versión y resultado correctos?                | señal real o prueba controlada con tiempo, fuente, identidad, correlación y resultado                      |
| **Salud y frescura**                    | ¿el estado puede distinguir salud, degradación, indisponibilidad, mala configuración e incertidumbre sin fabricar verde? | fuente, regla de salud, ventana de frescura y evidencia actual                                             |
| **Métricas, SLI y SLO**                 | ¿las mediciones requeridas son consultables, reproducibles y tienen semántica estable?                                   | consulta o serie, definición, población, unidad, ventana, exclusiones y objetivo solo cuando esté aprobado |
| **Alerta y routing**                    | ¿la condición relevante genera una alerta accionable y llega al responsable correcto con fallback y escalamiento?        | ejercicio controlado de activación, entrega, deduplicación, ACK cuando aplique, recuperación y cierre      |
| **Runbook y handoff de soporte**        | ¿la persona que recibe la alerta sabe qué comprobar y puede escalar sin improvisar ni exceder autoridad?                 | runbook vigente, propietario, práctica exigible y vínculo con readiness de soporte                         |
| **Pipeline y protección de telemetría** | ¿el propio monitoreo puede demostrar que funciona y que no expone ni mezcla datos o ambientes?                           | metamonitoreo, aislamiento, pérdida/lag observables, configuración segura y evidencia de minimización      |

Para cada plano aplicable se registra un resultado independiente.

---

#### 5. Expediente mínimo de evidencia por elemento observable

Cada elemento del conjunto requerido deberá conservar, según aplique:

```text
package_id
ambiente_objetivo
release_o_version
proceso_o_servicio_canonico
elemento_o_dependencia_observada
fuente_de_senal
forma_de_observacion
clase_de_senal
clave_de_correlacion
regla_de_frescura
estado_de_salud_observable
metricas_requeridas
sli_requeridos
referencia_slo_si_existe
fuente_del_umbral
regla_de_alerta
severidad_de_alerta
propietario
receptor
y_suplencia_o_fallback_cuando_aplique
canal
regla_de_deduplicacion_e_inhibicion
ruta_de_escalamiento
runbook_y_version
prueba_o_estimulo_controlado
evidencia_de_activacion
evidencia_de_entrega_y_ack_cuando_aplique
evidencia_de_recovery_o_clear
metamonitoreo_aplicable
proteccion_y_minimizacion
resultado_por_plano
motivo_de_fallo_o_bloqueo
momento_de_evidencia
```

No se almacenan valores de secretos, credenciales, tokens, cookies o payloads sensibles como evidencia de readiness. Una referencia segura a configuración o custodia es suficiente cuando el valor secreto no debe exponerse.

---

#### 6. Señal, forma de observación y correlación

Se conservan exactamente las seis clases aprobadas por `TI-DOM-010`:

- `INFO`;
- `WARNING`;
- `FAILURE`;
- `RECOVERY`;
- `SATURATION`;
- `SECURITY_SIGNAL`.

Se conservan exactamente las siete formas de observación:

1. métrica;
2. evento o transición;
3. log;
4. heartbeat;
5. prueba sintética;
6. resultado de operación;
7. observación manual controlada.

La prueba de readiness deberá demostrar que una señal material:

1. identifica su fuente real;
2. conserva tiempo observado y tiempo recibido cuando exista diferencia relevante;
3. referencia el ambiente y la versión correctos;
4. puede correlacionarse con el proceso, servicio, operación, cola, integración, dispositivo o dependencia que corresponda;
5. distingue reintentos, resultado desconocido y recuperación cuando sean parte del contrato;
6. no usa coincidencia temporal, nombre, URL, IP o texto libre como única prueba de relación;
7. no convierte una señal en alerta, incidente o causa por inferencia.

Una señal emitida por otra versión, ambiente o recurso no satisface el elemento evaluado.

---

#### 7. Salud y frescura

La puerta preserva exactamente cinco estados de salud:

```text
HEALTHY
DEGRADED
OFFLINE
MISCONFIGURED
UNKNOWN
```

Criterios obligatorios:

- `HEALTHY` exige evidencia suficientemente fresca y atribuible;
- `UNKNOWN` es el resultado correcto cuando la evidencia falta, está obsoleta, es contradictoria o no permite concluir;
- una ausencia de alertas no transforma `UNKNOWN` en `HEALTHY`;
- reachability no prueba configuración correcta;
- liveness no prueba readiness;
- readiness técnica no prueba salud empresarial;
- salud de dependencia, salud de datos y salud de dispositivo/periférico permanecen distinguibles;
- un `RECOVERY` aislado no demuestra estabilidad sostenida;
- una señal verde de un componente no puede ocultar que el camino empresarial requerido está fallando;
- la condición de frescura utilizada deberá corresponder a la fuente y al uso real de la señal.

Para pasar este plano, cada elemento crítico deberá poder explicar **qué evidencia soporta el estado actual y hasta cuándo se considera vigente**.

---

#### 8. Métricas mínimas aplicables

La puerta conserva las doce familias mínimas de `TI-DOM-010`:

1. latencia `p50`, `p95` y `p99` cuando exista población suficiente;
2. razón de éxito empresarial;
3. razón de error por código o clase;
4. throughput;
5. tamaño y edad de backlog;
6. cantidad de reintentos o reprocesos;
7. cumplimiento de SLI/SLO y burn rate cuando exista SLO;
8. salud de dispositivo local;
9. disponibilidad de integración o workflow;
10. razón de captura exitosa de evidencia;
11. frescura de sincronización o lag de replicación cuando aplique;
12. cantidad de excepciones observacionales o manuales cuando no exista métrica automática.

No todo elemento debe producir las doce. Para cada elemento del conjunto requerido se registrará cuáles aplican y por qué una familia no aplica cuando sea materialmente relevante preguntarlo.

Una métrica pasa readiness cuando:

- su nombre y significado corresponden al contrato aprobado;
- unidad y tipo son correctos;
- las dimensiones no mezclan ambientes o versiones;
- la población observada es identificable;
- la ventana es reproducible;
- el dato puede consultarse en el ambiente objetivo;
- la cardinalidad está controlada;
- el resultado puede vincularse con el efecto empresarial cuando la métrica lo exige;
- una ausencia de muestras se distingue de un valor cero;
- la fuente y el retraso de los datos son conocidos.

---

#### 9. SLI y SLO

Se preservan las ocho categorías de SLI:

1. disponibilidad;
2. integridad;
3. rendimiento;
4. capacidad;
5. frescura;
6. confiabilidad;
7. observabilidad;
8. resultado humano.

Para flujos críticos, cuando apliquen, se preservan las cuatro categorías de SLO ya aprobadas:

1. disponibilidad;
2. integridad;
3. rendimiento o capacidad;
4. observabilidad.

Cada SLI requerido deberá tener definición, población, éxito, punto de medición, unidad, ventana, exclusiones, propietario, vista o consulta y relación con alertas.

Cada SLO existente deberá conservar objetivo, ventana, población, exclusiones, muestra mínima, retraso permitido, condición de incumplimiento y consecuencia operativa.

Reglas de gate:

1. esta tarea no crea porcentajes ni objetivos SLO nuevos;
2. un SLI medido sin objetivo aprobado puede demostrar medición, pero no “cumplimiento de SLO”;
3. la ausencia de objetivo aprobado bloquea cualquier afirmación de cumplimiento que dependa de ese objetivo;
4. los umbrales provisionales de `TI-DOM-010` solo pueden utilizarse como referencia provisional cuando el paquete los haya heredado explícitamente y nunca se presentan como SLO definitivo;
5. los SLO técnicos no sustituyen el SLA de atención de `TI-DOM-007`;
6. percentiles sin muestra suficiente no sustentan un PASS;
7. exclusiones posteriores destinadas a mejorar artificialmente el indicador invalidan la evidencia.

---

#### 10. Referencias provisionales de umbral

Cuando el expediente del paquete consuma las referencias provisionales de `TI-DOM-010`, la puerta conserva su naturaleza transitoria:

| Condición                     | Referencia documental existente                                     |
| ----------------------------- | ------------------------------------------------------------------- |
| caída sostenida de throughput | reducción igual o superior al 20 % frente a la referencia aplicable |
| degradación de latencia       | `p95` por encima de la referencia inicial durante cinco minutos     |
| saturación                    | 80 % como advertencia y 90 % como candidato crítico                 |
| captura de evidencia          | razón inferior a `0.99`                                             |
| backlog                       | tamaño o edad por encima del baseline del servicio                  |
| drift                         | diferencia superior a la tolerancia aprobada del objeto             |
| falla de dispositivo local    | repetición dentro de una ventana de diez minutos                    |

La presencia de estos valores no autoriza a aplicarlos universalmente. El PASS exige que la fuente del umbral sea explícita y que la regla tenga propietario, destinatario y acción. Si el paquete requiere un umbral específico que todavía no posee autoridad canónica, la condición queda `BLOQUEADO` en lugar de inventar un valor.

---

#### 11. Alerta accionable

Se conserva el ciclo aprobado:

```text
CANDIDATO
→ SUPRIMIDO O DEDUPLICADO, SI APLICA
→ ACTIVO Y ACCIONABLE
→ ACK
→ CORRELACIONADO CON INCIDENTE, CUANDO CORRESPONDA
→ CLEAR / CIERRE DE LA ALERTA
```

Toda regla requerida deberá demostrar en el ambiente objetivo:

1. identidad única;
2. condición de activación;
3. fuente o SLI;
4. severidad;
5. propietario;
6. destinatario;
7. canal;
8. intervalo de deduplicación;
9. inhibición o silencio;
10. ruta de escalamiento;
11. runbook;
12. relación esperada con incidente;
13. revisión o vigencia;
14. comportamiento ante fallo del canal de notificación.

Una regla no pasa porque exista en configuración. Deberá demostrarse mediante prueba controlada o evidencia operativa equivalente que la cadena relevante funciona hasta su destino y recuperación.

---

#### 12. Severidad de alerta, severidad operativa y prioridad de incidente

La puerta conserva sin fusionarlas tres dimensiones distintas:

**Severidad técnica de alerta de `TI-DOM-010`:**
- `SEV1`;
- `SEV2`;
- `SEV3`;
- `SEV4`.

**Clasificación operativa de observabilidad de `NFR-REQ-009`:**
- `OBS-P0`;
- `OBS-P1`;
- `OBS-P2`;
- `OBS-P3`.

**Prioridad del incidente de `TI-DOM-007`:**
- se deriva mediante su propia matriz de impacto y urgencia y no se infiere del nivel del log, nombre del componente ni severidad de la alerta.

No se define una equivalencia automática entre estas taxonomías.

Para readiness:

- una condición `OBS-P0` o `OBS-P1` sin práctica vigente bloquea;
- una brecha `OBS-GAP-P0` o `OBS-GAP-P1` abierta sin control aprobado bloquea;
- una alerta informativa no utiliza canales de interrupción urgente por conveniencia;
- una prioridad de incidente no se reescribe para coincidir con el nivel de alerta.

---

#### 13. Deduplicación, persistencia, histéresis, inhibición y silencio

El ejercicio de alertamiento deberá cubrir, cuando aplique:

- tolerancia a blips;
- agrupación de síntomas equivalentes;
- deduplicación de réplicas;
- inhibición de cascadas;
- persistencia suficiente para evitar flapping;
- histéresis de activación y recuperación;
- mantenimiento planificado;
- silencio con alcance, motivo, actor autorizado, inicio y vencimiento;
- señal de recuperación durante silencio;
- reactivación cuando la condición excede el efecto esperado del mantenimiento.

Un silencio o ACK no resuelve la condición. La prueba deberá preservar la diferencia entre:

```text
ACK DE ALERTA
≠ RECUPERACIÓN DE LA CONDICIÓN
≠ RESTAURACIÓN DEL SERVICIO
≠ CIERRE DEL INCIDENTE
```

Una señal de seguridad no se silencia por comodidad operativa.

---

#### 14. Routing, destinatarios, fallback y escalamiento

El routing solo puede declararse listo cuando resuelve hacia actores realmente elegibles y cubiertos por `READY-GATE-010`.

Por cada alerta humana requerida se comprobará:

- propietario funcional cuando aplique;
- propietario técnico;
- receptor primario;
- contacto alterno o suplencia;
- ventana real de atención;
- condición fuera de horario cuando corresponda;
- canal primario;
- fallback;
- escalamiento por falta de ACK;
- proveedor relacionado cuando exista dependencia externa;
- autoridad para la acción inicial o mitigación.

Reglas:

1. una dirección, grupo, webhook o canal existente no demuestra que haya una persona elegible detrás;
2. no se impone una guardia permanente cuando el modelo de cobertura no la respalda;
3. una alerta enviada sin evidencia de entrega no pasa el plano de routing;
4. si el contrato exige ACK, la prueba debe demostrar recepción y reconocimiento por un actor válido;
5. el receptor no obtiene privilegios por recibir la alerta;
6. un proveedor no sustituye al owner interno de VENTO;
7. el fallo del canal deberá seguir la estrategia de fallback aprobada sin borrar la alerta original.

---

#### 15. Runbook y práctica operativa

Toda alerta `OBS-P0` o `OBS-P1` deberá tener runbook vigente con:

1. propósito y alcance;
2. señales de entrada y falsos positivos conocidos;
3. verificaciones seguras;
4. acciones iniciales reversibles;
5. criterios de contingencia, rollback o escalamiento;
6. datos que no deben recopilarse;
7. comunicación requerida;
8. prueba de recuperación;
9. conciliación y pendientes;
10. cuándo crear problema o cambio;
11. propietario, versión y última práctica.

Criterio de readiness:

- documento existente sin propietario o versión vigente: `FAIL`;
- runbook correcto pero sin práctica vigente cuando la severidad la exige: `FAIL`;
- práctica imposible porque depende de recurso, permiso, actor o integración aún no disponible: `BLOQUEADO`;
- práctica satisfactoria y evidencia reproducible dentro de su vigencia: `PASS`.

La práctica no deberá ejecutar comandos destructivos, exponer secretos ni producir efectos empresariales no autorizados.

---

#### 16. Metamonitoreo

La ausencia de alertas solo es interpretable si el propio pipeline de observabilidad está verificado.

La puerta deberá demostrar, según la arquitectura materializada del paquete, visibilidad sobre:

```text
fuente o SDK
→ agente / collector cuando exista
→ exportación
→ recepción
→ almacenamiento o consulta
→ atraso y pérdida
→ evaluación de regla
→ dashboard o consulta
→ routing
→ canal
```

Criterios:

1. el pipeline puede detectar o evidenciar pérdida de señal;
2. el atraso de ingestión es observable;
3. la falla de regla o evaluación no queda silenciosa;
4. el canal de notificación puede comprobarse de extremo a extremo;
5. una alerta basada en ausencia de evento verifica primero que el canal de observación está funcionando;
6. una degradación del monitoreo produce `UNKNOWN`, `DEGRADED` o el estado aplicable, nunca salud fabricada;
7. la pérdida de telemetría no elimina eventos empresariales, auditoría o evidencia con retención propia.

Monitoreo sin metamonitoreo requerido no supera el gate.

---

#### 17. Pruebas black-box y sintéticas

Los caminos críticos deberán combinar, cuando el contrato lo exija, señales internas con una comprobación desde consumidor, estación o frontera equivalente.

Toda prueba sintética deberá ser:

- identificable como sintética;
- atribuible al ambiente correcto;
- segura;
- idempotente cuando corresponda;
- incapaz de crear ventas, pagos, inventario, documentos, movimientos, notificaciones o datos reales no deseados;
- separable de tráfico real para evitar contaminar SLI productivos;
- correlacionable con las señales que pretende verificar.

Un health check interno exitoso sin prueba del camino crítico no compensa la ausencia de black-box cuando esta sea obligatoria.

---

#### 18. Aislamiento de ambientes

Local, CI, staging, piloto y producción deberán poder distinguirse en:

- señales;
- reglas;
- dashboards o consultas;
- canales;
- silencios;
- credenciales o referencias técnicas;
- datos;
- tráfico sintético;
- ejercicios;
- release y versión.

No se acepta como evidencia del ambiente objetivo:

- una ejecución de staging para afirmar producción;
- una prueba local para afirmar piloto;
- una regla activa en otro proyecto o cuenta;
- una serie que mezcle ambientes sin separación verificable;
- datos productivos copiados a pruebas sin control autorizado.

El gate evalúa exclusivamente el ambiente declarado por la instancia de paquete.

---

#### 19. Logging, trazas y protección de datos

Los logs relevantes deberán ser estructurados y conservar, cuando aplique:

- timestamp;
- severidad;
- servicio;
- componente;
- ambiente;
- versión;
- código estable;
- plantilla;
- contexto estructurado minimizado;
- correlación;
- resultado;
- sensibilidad.

Las trazas de caminos críticos deberán enlazar dependencias, reintentos, errores y resultados sin perder los casos críticos por una estrategia de muestreo inadecuada.

Queda prohibido utilizar como evidencia ordinaria o dimensiones de telemetría:

- contraseñas;
- tokens completos;
- secretos;
- PIN;
- OTP;
- códigos de recuperación MFA;
- credenciales privilegiadas;
- datos de pago;
- cookies o cabeceras indiscriminadas;
- payloads sensibles;
- variables de ambiente completas;
- identificadores personales o de negocio de cardinalidad ilimitada cuando no sean estrictamente necesarios;
- texto libre como dimensión no controlada.

La consulta o exportación de diagnóstico sensible conserva los controles de autorización de `TI-AUTH-004`. Readiness no autoriza acceso adicional.

---

#### 20. Cardinalidad, muestreo, retención y costo

La puerta comprobará que el perfil aplicable gobierna:

- volumen;
- cardinalidad;
- muestreo;
- agregación;
- retención;
- descarte;
- almacenamiento;
- transferencia;
- costo.

Reglas:

1. usuario, documento, ID de instancia, URL cruda, mensaje libre, token o payload no se aceptan como dimensiones ilimitadas;
2. el muestreo deberá preservar fallos y errores críticos que el contrato exija investigar;
3. la telemetría no adopta retención indefinida por ausencia de decisión;
4. la retención de telemetría no sustituye la retención de auditoría o evidencia;
5. un incremento de cardinalidad o volumen que pueda inutilizar la plataforma constituye falla de readiness cuando el paquete lo introduce;
6. ocultar una señal para reducir costo no satisface una obligación de observabilidad.

---

#### 21. Separación entre salud técnica y resultado empresarial

La puerta exige comprobar explícitamente que:

```text
SERVICIO RESPONDE
≠ PROCESO FUNCIONA

HEALTH CHECK VERDE
≠ RESULTADO EMPRESARIAL CORRECTO

TRABAJO ACEPTADO
≠ EFECTO FÍSICO O EMPRESARIAL CONFIRMADO

STATUS PAGE VERDE
≠ DEPENDENCIA INTERNA RESTAURADA
```

Cuando el paquete protege un camino empresarial, la evidencia deberá incluir la señal o resultado mínimo que permita detectar un escenario donde la infraestructura responde pero el proceso falla.

Una métrica técnica favorable no podrá ocultar:

- errores empresariales;
- backlog envejecido;
- pérdida de mensajes;
- resultado desconocido;
- impresión sin confirmación física cuando corresponda;
- datos obsoletos;
- sincronización pendiente;
- degradación de dependencia crítica.

---

#### 22. Cobertura específica por clase técnica

Cuando la clase pertenezca al conjunto requerido, se evaluará como mínimo:

| Clase                  | Evidencia de readiness relevante                                                                                                                                 |
| ---------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| aplicación/servicio    | disponibilidad observable, latencia, errores, versión, ambiente, dependencia y resultado empresarial                                                             |
| endpoint/dispositivo   | heartbeat o comprobación, postura o baseline aplicable, versión, conectividad, frescura y falla local                                                            |
| red                    | enlace, reachability, latencia, pérdida, saturación, drift y dependencia de servicio, sin confundir `up` con extremo a extremo                                   |
| impresora/periférico   | conectividad, cola, trabajo, error, consumible, receipt y resultado; online no equivale a impresión correcta                                                     |
| integración/proveedor  | solicitud, respuesta, rechazo, timeout, resultado desconocido, retry, deduplicación, contrato y conciliación                                                     |
| base de datos/Supabase | disponibilidad, latencia, errores, conexiones, saturación, bloqueos, consultas lentas, servicios aplicables, versión y frescura sin exponer parámetros sensibles |
| cola/job/batch         | trabajo esperado, pendiente, activo, completado, fallido, retry, dead-letter, edad, capacidad, backpressure, último éxito, corte y resultado parcial             |
| offline/sincronización | intención, pendiente, expiración, sync, aceptación técnica, confirmación empresarial, conflicto, rechazo, backlog y edad                                         |

La tabla define mínimos de comprobación, no crea una obligación para clases que el paquete no consume.

---

#### 23. Ejercicio mínimo de alertamiento

Para cada familia de alerta crítica requerida por el paquete, la evidencia deberá poder reconstruir:

```text
CONDICIÓN CONTROLADA O EVIDENCIA OPERATIVA EQUIVALENTE
→ SEÑAL
→ CANDIDATO
→ DEDUPLICACIÓN / INHIBICIÓN CUANDO APLIQUE
→ ALERTA ACCIONABLE
→ ROUTING
→ ENTREGA
→ ACK CUANDO SEA OBLIGATORIO
→ ESCALAMIENTO SI FALTA ACK CUANDO CORRESPONDA
→ CORRELACIÓN CON CASO CUANDO LA REGLA LO EXIJA
→ RECOVERY / CLEAR
→ EVIDENCIA FINAL
```

El estímulo deberá respetar la seguridad y las restricciones del ambiente. Cuando no sea seguro provocar físicamente la condición, se utilizará una prueba controlada equivalente ya aprobada por el expediente de pruebas; la imposibilidad no se convierte en PASS por inspección documental.

---

#### 24. Evidencia aceptable

Puede sustentar readiness, según el elemento:

- consulta o serie del ambiente objetivo con identidad, versión y ventana verificables;
- resultado de prueba sintética segura;
- prueba de fallo controlado autorizada por el expediente del paquete;
- secuencia de señal, regla, alerta, entrega, ACK y recuperación;
- evidencia de routing primario y fallback;
- consulta de salud con fuente y frescura explícitas;
- definición versionada de métrica o SLI más una ejecución real correspondiente;
- referencia de SLO ya aprobado y su medición, cuando exista;
- evidencia de deduplicación, histéresis, inhibición o silencio temporal;
- runbook vigente y evidencia de la práctica requerida;
- registro de metamonitoreo y verificación del canal;
- correlación con release, cambio, ambiente y paquete;
- configuración leída en modo no sensible junto con evidencia de funcionamiento;
- evidencia de minimización y ausencia de datos prohibidos en una muestra controlada;
- ticket o incidente correlacionado cuando la regla realmente deba producirlo.

La evidencia deberá conservar momento, actor o principal técnico cuando corresponda, ambiente, versión, fuente y resultado.

---

#### 25. Evidencia insuficiente

Por sí solos no demuestran readiness:

- screenshot de un dashboard;
- existencia de un dashboard;
- archivo de configuración o variable de ambiente;
- SDK, agente o collector instalado;
- una línea de log;
- un health check `200`;
- puerto, DNS o endpoint alcanzable;
- servicio “online”;
- ausencia de alertas;
- status page del proveedor;
- una métrica sin definición o población;
- una serie sin ambiente o versión identificables;
- una regla de alerta que nunca fue ejercitada;
- una notificación entregada sin demostrar su regla, owner y contexto;
- ACK manual sin identidad o relación con la alerta;
- runbook existente sin vigencia o práctica cuando esta sea obligatoria;
- SLI sin punto de medición;
- objetivo provisional presentado como SLO definitivo;
- evidencia de staging para aprobar otro ambiente;
- contrato documental de `DELIV-PKG-017` sin implementación;
- aprobación documental de `TI-DOM-010`;
- éxito parcial de una sola señal dentro de un camino crítico más amplio.

---

#### 26. Estados de decisión

Cada elemento, cada plano y el paquete completo utilizarán exactamente:

| Estado      | Significado                                                                                                                               |
| ----------- | ----------------------------------------------------------------------------------------------------------------------------------------- |
| `PASS`      | existe evidencia suficiente, vigente y reproducible para el alcance evaluado                                                              |
| `FAIL`      | la capacidad requerida existe o debía existir, pero su evidencia demuestra incumplimiento o funcionamiento incorrecto                     |
| `BLOQUEADO` | falta una precondición, autoridad, objetivo, actor, dependencia o medio de comprobación que impide obtener un resultado válido sin asumir |
| `NO_APLICA` | el elemento no pertenece al alcance real del paquete y la exclusión está respaldada por la fuente canónica                                |

`PENDIENTE`, `DESCONOCIDO`, “sin datos” o “no se pudo revisar” no se convierten en PASS. Cuando impidan decidir una obligación requerida, el resultado es `BLOQUEADO`.

---

#### 27. Regla de agregación

El resultado del paquete se calcula así:

```text
SI EXISTE AL MENOS UN FAIL REQUERIDO
→ FAIL

SI NO EXISTE FAIL PERO EXISTE AL MENOS UN BLOQUEADO REQUERIDO
→ BLOQUEADO

SI TODO ELEMENTO REQUERIDO ES PASS O NO_APLICA VÁLIDO
→ PASS
```

Reglas adicionales:

1. un PASS de métrica no compensa un FAIL de routing;
2. un PASS de alerta no compensa metamonitoreo bloqueado cuando sea requerido;
3. un dashboard verde no compensa una prueba black-box fallida;
4. una alerta `OBS-P0` o `OBS-P1` sin práctica vigente impide PASS;
5. una brecha `OBS-GAP-P0` o `OBS-GAP-P1` sin control aprobado impide PASS;
6. no se permite aprobar por muestreo una ruta crítica que el conjunto requerido declara obligatoria;
7. un `NO_APLICA` requiere fundamento de alcance, no conveniencia de implementación;
8. no se promedian resultados para ocultar un incumplimiento crítico.

---

#### 28. Relación con la mesa de soporte

`READY-GATE-011` no vuelve a decidir personas, turnos ni cobertura de soporte.

Consume de `READY-GATE-010` únicamente la evidencia de que:

- el owner técnico requerido existe y está vigente;
- la suplencia o alternativa aplicable existe;
- la ventana de atención es real;
- la ruta de escalamiento llega a actores elegibles;
- el proveedor no reemplaza ownership VENTO.

Si una regla de alerta no puede resolver a la estructura aprobada por `READY-GATE-010`, el plano de routing falla o queda bloqueado según la causa. No se inventa un destinatario local para superar esta puerta.

---

#### 29. Relación con respaldo, rollback y continuidad

Esta tarea puede exigir señales que indiquen:

- ejecución o fallo de backup;
- frescura de una copia;
- disparador de rollback;
- señal posterior a rollback;
- estado de una dependencia de recuperación.

No certifica:

- que el respaldo sea restaurable;
- que el restore haya sido probado;
- que el rollback técnico, funcional o de datos funcione;
- RTO, RPO, MTPD o MBCO;
- cierre de recuperación o continuidad.

Esas comprobaciones permanecen en `READY-GATE-012` y autoridades de recuperación aplicables. Una alerta de backup saludable no sustituye una prueba real de restauración.

---

#### 30. Frontera con implementación y ejecución

La secuencia permanece:

```text
E5-GATE-008::<package_id>
→ SHELL-CI-020::<package_id>
→ SHELL-CI-021::<package_id>
→ SHELL-CI-022::<package_id>
→ SHELL-CI-023::<package_id>
→ SHELL-CI-024::<package_id>
```

`READY-GATE-011` define el contrato documental que deberá consumir `SHELL-CI-021::<package_id>`.

No realiza:

- instrumentación;
- instalación de agentes;
- selección o alta de proveedor;
- creación de dashboards;
- creación o activación de reglas;
- cambios de routing;
- envío de alertas productivas;
- pruebas destructivas;
- despliegue;
- cutover;
- piloto;
- modificación remota de configuración;
- cambios de Supabase.

La prueba real del gate ocurre después de la implementación del paquete y antes de `SHELL-CI-022::<package_id>`.

---

#### 31. Casos especiales

##### 31.1. Ausencia de telemetría

Si una obligación requiere señal automática y la señal no existe, el resultado no es salud. Es `FAIL` cuando la instrumentación debía quedar materializada por el paquete o `BLOQUEADO` cuando una dependencia previa impide legítimamente producirla.

##### 31.2. Fuente manual controlada

Una observación manual puede satisfacer únicamente una obligación cuyo contrato admita esa forma. Debe conservar actor, método, momento, fuente y resultado. No se presenta como telemetría automática.

##### 31.3. Proveedor externo

La métrica o status page del proveedor puede aportar evidencia, pero VENTO deberá conservar correlación interna con el efecto que le interesa. Un proveedor verde con el proceso VENTO fallando no produce PASS.

##### 31.4. Señal de seguridad

Una `SECURITY_SIGNAL` conserva protección reforzada. La prueba del routing no exige exponer el detalle sensible al destinatario incorrecto y el silencio por conveniencia no es válido.

##### 31.5. Bajo volumen

Si no existe población suficiente para percentiles o tasas estables, el gate no fabrica estadística. Utiliza la forma de evidencia aprobada por el paquete y conserva la limitación; cuando un objetivo exija una muestra mínima aún no alcanzada, la afirmación de cumplimiento queda bloqueada.

##### 31.6. Ambiente sin tráfico real previo

La ausencia de historia no elimina observabilidad. El paquete deberá demostrar los caminos críticos mediante pruebas sintéticas, fixtures o ejercicios controlados aprobados y mantener explícita la diferencia entre baseline provisional y evidencia productiva.

##### 31.7. Alertas durante mantenimiento

La inhibición autorizada puede evitar ruido esperado, pero no elimina señales, no convierte degradación en éxito y no puede esconder una condición que exceda la ventana o el efecto esperado del cambio.

---

#### 32. Resultado material de la tarea

La tarea deja completamente definido:

- cómo derivar el conjunto requerido de observabilidad por paquete;
- los seis planos independientes que deberán superar readiness;
- el expediente mínimo de evidencia por elemento;
- el tratamiento exacto de clases de señal y formas de observación;
- los cinco estados de salud y su relación con frescura;
- las doce familias de métricas mínimas aplicables;
- las ocho categorías de SLI y cuatro categorías de SLO;
- la prohibición de inventar SLO;
- el tratamiento de referencias provisionales de umbral;
- el ciclo completo de alerta;
- la separación entre severidad de alerta, clasificación operacional e prioridad de incidente;
- deduplicación, histéresis, inhibición, silencio y recuperación;
- routing, fallback, ACK y escalamiento;
- requisitos de runbook y práctica para condiciones críticas;
- metamonitoreo;
- black-box y pruebas sintéticas seguras;
- aislamiento de ambientes;
- logging, trazas, cardinalidad, muestreo, retención y protección;
- separación de salud técnica y resultado empresarial;
- evidencia aceptable e insuficiente;
- estados de decisión y agregación;
- fronteras con soporte, recuperación, implementación y cutover.

No queda una decisión sustantiva de criterio de observabilidad diferida a `READY-GATE-012`.

---

#### 33. Requisitos de prueba derivados

**Resultado:** NO GENERA REQUISITOS DE PRUEBA

**Justificación:** esta puerta operacionaliza criterios de readiness que ya están protegidos por el registro canónico vigente y por los contratos aprobados de observabilidad, pruebas y evidencia. No crea una nueva semántica de señal, métrica, SLI, SLO, alerta, salud, routing, runbook, privacidad o metamonitoreo; únicamente define qué evidencia deberá presentar la futura ejecución por paquete para demostrar esas obligaciones antes del piloto.

**Requisitos creados:** 0  
**Requisitos modificados:** 0  
**Balance:** 0 creados; 0 modificados; 0 diferidos; 0 descartados; 0 obsoletos.

---

#### 34. Criterios de aceptación

- [x] la continuidad vigente es `READY-GATE-010 → READY-GATE-011 → READY-GATE-012`;
- [x] la tarea permanece exclusivamente documental;
- [x] el conjunto requerido se deriva antes de observar el ambiente;
- [x] una fuente requerida no puede excluirse porque todavía no esté instrumentada;
- [x] se materializan seis planos independientes de readiness;
- [x] cada elemento requerido conserva un expediente mínimo de evidencia;
- [x] se preservan exactamente seis clases de señal;
- [x] se preservan exactamente siete formas de observación;
- [x] se preservan exactamente cinco estados de salud;
- [x] `UNKNOWN` no puede convertirse en `HEALTHY` por ausencia de alertas;
- [x] liveness, readiness, salud empresarial, salud de datos y salud de dispositivo permanecen distinguibles;
- [x] se preservan las doce familias mínimas de métricas;
- [x] cada métrica aplicable conserva semántica, unidad, población, ambiente y versión verificables;
- [x] se preservan ocho categorías de SLI y cuatro categorías de SLO;
- [x] la tarea no inventa SLO ni porcentajes de cumplimiento;
- [x] los umbrales provisionales permanecen referencias provisionales y no SLO definitivos;
- [x] se preserva el ciclo completo candidato→alerta→ACK→correlación→clear;
- [x] cada regla de alerta requerida conserva los catorce elementos mínimos aprobados;
- [x] `SEV1..SEV4`, `OBS-P0..OBS-P3` y la prioridad del incidente no se fusionan;
- [x] `OBS-P0` y `OBS-P1` exigen práctica vigente;
- [x] `OBS-GAP-P0` y `OBS-GAP-P1` sin control aprobado bloquean readiness;
- [x] se comprueban deduplicación, persistencia, histéresis, inhibición y silencio cuando apliquen;
- [x] ACK y silencio no equivalen a recuperación;
- [x] routing y escalamiento consumen responsables ya acreditados por `READY-GATE-010`;
- [x] el proveedor no sustituye ownership interno;
- [x] el fallo del canal conserva fallback y no borra la alerta;
- [x] runbooks críticos conservan propietario, versión y última práctica;
- [x] se exige metamonitoreo cuando el pipeline de observabilidad es material para la detección;
- [x] la ausencia de alertas no demuestra salud si el pipeline no está verificado;
- [x] las pruebas sintéticas quedan identificadas y aisladas del tráfico real;
- [x] local, CI, staging, piloto y producción permanecen aislados;
- [x] logs, trazas, métricas y diagnóstico excluyen secretos y datos prohibidos;
- [x] cardinalidad, muestreo, retención y costo quedan gobernados;
- [x] salud técnica no sustituye resultado empresarial;
- [x] existe una lista explícita de evidencia suficiente e insuficiente;
- [x] los estados son `PASS`, `FAIL`, `BLOQUEADO` y `NO_APLICA`;
- [x] cualquier `FAIL` requerido falla el paquete y un `BLOQUEADO` requerido impide PASS;
- [x] no se aprueba por promedio ni por muestreo una obligación crítica;
- [x] `READY-GATE-012` conserva respaldo y rollback probados sin ser adelantada;
- [x] se crean cero requisitos de prueba y se modifican cero requisitos existentes;
- [x] no se modifica código, infraestructura, proveedores, canales, reglas, datos ni Supabase;
- [x] `READY-GATE-012` permanece únicamente reservada.

---

#### 35. Invariantes

1. señal no equivale a alerta;
2. alerta no equivale a incidente;
3. incidente no equivale a causa;
4. SLI no equivale a SLO;
5. SLO no equivale a SLA de soporte;
6. severidad de alerta no equivale a prioridad de incidente;
7. health check verde no equivale a resultado empresarial correcto;
8. liveness no equivale a readiness;
9. ACK no equivale a recuperación;
10. silencio no equivale a resolución;
11. dashboard no equivale a evidencia de extremo a extremo;
12. ausencia de alertas no equivale a salud;
13. ausencia de telemetría no equivale a cero;
14. `UNKNOWN` no equivale a `HEALTHY`;
15. status page de proveedor no equivale a estado VENTO;
16. SDK instalado no equivale a observabilidad operativa;
17. regla configurada no equivale a alerta probada;
18. runbook escrito no equivale a práctica vigente;
19. métrica emitida no equivale a SLI correctamente definido;
20. SLI medido no equivale a SLO cumplido;
21. referencia provisional no equivale a objetivo definitivo;
22. alerta entregada no equivale a condición recuperada;
23. proveedor no equivale a owner interno;
24. routing no concede privilegio;
25. telemetría no reemplaza auditoría ni evidencia canónica;
26. metamonitoreo no puede depender exclusivamente del mismo fallo que debe detectar;
27. evidencia de staging no certifica otro ambiente;
28. una prueba sintética no se presenta como tráfico real;
29. un log sensible no se expone para demostrar readiness;
30. `READY-GATE-011` no instrumenta ni configura físicamente observabilidad;
31. `READY-GATE-012` permanece únicamente reservada.

---

#### 36. Continuidad

ÚLTIMA TAREA APROBADA
`READY-GATE-010 — Definir criterio y evidencia para confirmar mesa de soporte, responsables y escalamiento`

TAREA ACTUAL APROBADA
`READY-GATE-011 — Definir criterio y evidencia para confirmar monitoreo, métricas y alertas`

SIGUIENTE TAREA RESERVADA
`READY-GATE-012 — Definir criterio y evidencia para confirmar respaldo y rollback probados`


### ✅ READY-GATE-012 — Definir criterio y evidencia para confirmar respaldo y rollback probados

**Estado:** APROBADA
**Tarea anterior:** `READY-GATE-011 — Definir criterio y evidencia para confirmar monitoreo, métricas y alertas` — APROBADA
**Tarea siguiente:** `READY-GATE-013 — Definir método y evidencia para capturar la línea base previa al piloto` — RESERVADA
**Tipo de tarea:** documental — definición normativa y materialización del criterio de readiness por paquete para confirmar cobertura de respaldo, restauración verificable, rollback probado, reconciliación de efectos y objetivos de recuperación mediante evidencia real; sin ejecutar respaldos, restauraciones, rollback, migraciones, DDL/DML, despliegues ni cambios remotos

---

#### 1. Resultado sustantivo

`READY-GATE-012` define la evaluación futura `READY-GATE-012::<package_id>` que deberá consumir `SHELL-CI-021::<package_id>` después de la implementación física autorizada y antes del avance del paquete hacia el siguiente gate aplicable.

El resultado queda materializado mediante seis planos independientes de readiness:

1. `BACKUP_COVERAGE` — cobertura, identidad, política y estado verificable de los objetos que deban poder recuperarse;
2. `RESTORE_PROOF` — demostración real de restaurabilidad mediante ejecución controlada, integridad, compatibilidad y validación;
3. `ROLLBACK_PROOF` — demostración real del mecanismo de retorno, compensación o corrección segura que corresponda al cambio;
4. `DATA_EFFECT_RECONCILIATION` — consistencia de datos, colas, trabajo offline, Storage, integraciones y efectos externos después de restaurar o revertir;
5. `RECOVERY_OBJECTIVES` — comparación contra objetivos canónicos aprobados cuando existan y bloqueo explícito cuando un objetivo obligatorio no esté resuelto;
6. `RUNBOOK_AUTHORITY_EVIDENCE` — disponibilidad, vigencia, autoridad, secuencia, observabilidad y evidencia del procedimiento utilizado para probar recuperación o rollback.

La puerta no crea una política nueva de respaldo ni una estrategia nueva de rollback. Comprueba que las decisiones ya aprobadas para el paquete hayan sido materializadas y probadas con evidencia real suficiente.

---

#### 2. Propósito de la puerta

La pregunta que resuelve esta tarea es:

```text
¿EL PAQUETE PUEDE DEMOSTRAR, CON EVIDENCIA DEL MISMO RELEASE Y AMBIENTE,
QUE SUS OBJETOS RECUPERABLES PUEDEN RESTAURARSE Y QUE SUS CAMBIOS
MATERIALES PUEDEN RETORNARSE, COMPENSARSE O RECUPERARSE DE FORMA
CONTROLADA SIN PERDER INTEGRIDAD, AUTORIDAD, TRAZABILIDAD NI EFECTOS
EMPRESARIALES PENDIENTES?
```

No basta con demostrar que:

- existe una tarea de backup;
- existe una réplica;
- existe un snapshot;
- existe una versión anterior del software;
- existe un procedimiento escrito;
- un despliegue puede volver a compilarse;
- una base restaurada abre conexión;
- un servicio responde a health check;
- un proveedor declara una capacidad de recuperación;
- el equipo conoce verbalmente cómo regresar.

La puerta exige correspondencia entre obligación, mecanismo, ejecución, resultado, evidencia y reconciliación.

---

#### 3. Entradas canónicas conservadas

La evaluación consume, sin redefinir su autoridad:

1. el expediente aprobado del paquete y su `package_id`;
2. `DELIV-PKG-009` para migraciones, DDL/DML previstas, backfills, compatibilidad temporal y retiro legacy;
3. `DELIV-PKG-010` para eventos, colas, idempotencia, reintentos, dead-letter y conciliación;
4. `DELIV-PKG-013` para requisitos no funcionales y objetivos ya aprobados;
5. `DELIV-PKG-014` y `DELIV-PKG-015` para identidad física, repositorios, archivos, símbolos, dependencias, versiones y orden de actualización;
6. `DELIV-PKG-016` para pruebas, ambientes, responsables y evidencia esperada;
7. `DELIV-PKG-017` para observabilidad requerida durante respaldo, restauración y rollback;
8. `DELIV-PKG-018` para flags, configuración, valores y kill switch cuando sean parte del mecanismo de contención;
9. `DELIV-PKG-019` para rollout, cohortes, pausas, promoción y evidencia de despliegue;
10. `DELIV-PKG-020` para rollback técnico, funcional y de datos, disparadores, autoridad, objetivo, efectos irreversibles y conciliación;
11. `DELIV-PKG-021` para procedimientos, runbooks y conocimiento aplicables;
12. `DELIV-PKG-022` para alcance de piloto, ambientes, actores, sedes, datos y dispositivos;
13. `DELIV-PKG-023` para criterios medibles de aceptación y manifiesto de evidencia;
14. `DELIV-PKG-025` como decisión documental previa a la implementación física;
15. `NFR-BACKUP-RECOVERY-CONTRACT-001` y sus matrices de objetos, perfiles, objetivos, políticas, runbooks, ejercicios y excepciones;
16. `TI-DOM-009` para gobierno del cambio y separación entre plan, ejecución, validación, rollback y revisión posterior;
17. `TI-DOM-010` para observabilidad, salud, señales y evidencia durante la prueba;
18. `TI-DOM-011` y `TI-BACKUP-RESTORE-GATE-CONTRACT-001` para la puerta técnica de restaurabilidad;
19. QUEUE-ARC para estado asíncrono, reintentos, deduplicación, dead-letter y replay;
20. EVID-ARC para evidencia durable;
21. PRINT-ARC, Storage, Supabase, integraciones, dispositivos y demás autoridades propietarias cuando el paquete las consuma;
22. las decisiones de continuidad empresarial únicamente como fuente de objetivos y validación empresarial cuando correspondan.

Una decisión documental planeada no se transforma en evidencia ejecutada por aparecer en estas entradas.

---

#### 4. Separaciones obligatorias

La puerta conserva las separaciones canónicas:

```text
BACKUP
≠ REPLICA
≠ SNAPSHOT
≠ ARCHIVE
≠ EXPORT
≠ ROLLBACK
≠ COMPENSATION
≠ FORWARD_FIX
≠ FAILOVER
≠ RESTORE
≠ TECHNICAL_RECOVERY
≠ BUSINESS_RECOVERY
≠ BUSINESS_CONTINUITY
```

Y conserva además:

```text
PLAN DE ROLLBACK
≠ ROLLBACK PROBADO
≠ ROLLBACK EJECUTADO EN UNA AFECTACIÓN REAL
```

```text
BACKUP COMPLETADO
≠ BACKUP VERIFICADO
≠ RESTAURACIÓN PROBADA
```

```text
RESTAURACIÓN TÉCNICA
≠ SERVICIO MÍNIMO EMPRESARIAL RECUPERADO
≠ CONCILIACIÓN COMPLETA
≠ NORMALIZACIÓN TOTAL
```

Consecuencias:

1. `COMPLETED_UNVERIFIED` no satisface `RESTORE_PROOF`;
2. una réplica saludable no satisface `BACKUP_COVERAGE` por sí sola;
3. un `git revert`, una imagen anterior o un artefacto desplegable no satisfacen `ROLLBACK_PROOF` sin ejercicio y validación;
4. rollback de aplicación no sustituye restauración de datos;
5. restauración de datos no sustituye rollback de contrato, configuración o routing;
6. un failover no demuestra que el estado empresarial sea correcto;
7. un forward-fix puede ser el mecanismo correcto cuando revertir sea más peligroso, pero deberá haber sido definido, probado y evidenciado como la estrategia aprobada;
8. la validación técnica no autoriza por sí sola a declarar recuperación empresarial.

---

#### 5. Construcción previa del universo requerido

Antes de observar resultados del ambiente se deberá construir `required_recovery_evidence_set` para el paquete.

La lista se deriva exclusivamente del dossier aprobado y deberá incluir toda obligación material de recuperación o retorno identificada por:

- fuentes de verdad y objetos persistentes modificados;
- tablas, esquemas, RLS, funciones, triggers, Storage o configuración material;
- migraciones, backfills, transformaciones o retiros de estructuras;
- eventos, outbox, inbox, colas, jobs, checkpoints y dead-letter;
- estado local u offline pendiente;
- archivos, documentos y evidencia;
- configuración y secretos cuya recuperación sea necesaria sin exponer su valor;
- artefactos, contratos, plantillas y versiones requeridas para reconstruir una versión compatible;
- dependencias externas con efectos o estado que deban conciliarse;
- operaciones físicas o periféricas que puedan dejar resultados desconocidos o repetibles;
- cambios de routing, bindings, feature flags o configuración con mecanismo de retorno;
- efectos empresariales irreversibles, compensables o reconciliables;
- objetos clasificados como reconstruibles que deban demostrar reconstruibilidad real;
- objetivos de recuperación aplicables ya aprobados;
- ejercicios de restauración o rollback exigidos por criticidad, política o aceptación;
- brechas y excepciones de recuperación vigentes.

La evaluación no puede reducir este universo después de ver que una evidencia falta.

---

#### 6. Identidad mínima de cada obligación

Cada elemento de `required_recovery_evidence_set` deberá conservar como mínimo, cuando aplique:

| Campo                    | Regla                                                                          |
| ------------------------ | ------------------------------------------------------------------------------ |
| `package_id`             | paquete evaluado                                                               |
| `implementation_unit_id` | unidad física correspondiente cuando exista                                    |
| `release_or_change_ref`  | release, cambio, migración o configuración que origina la obligación           |
| `environment_id`         | ambiente exacto de la prueba                                                   |
| `site_or_scope_ref`      | sede, ámbito o dominio material cuando cambie la validez                       |
| `recovery_class`         | uno de los seis planos de esta tarea                                           |
| `object_or_effect_ref`   | objeto, grupo consistente, cambio o efecto protegido                           |
| `recovery_profile_ref`   | perfil aprobado cuando exista                                                  |
| `policy_ref`             | política o contrato aplicable                                                  |
| `approved_objective_ref` | objetivo canónico aprobado, si corresponde                                     |
| `mechanism_ref`          | backup, restore, rollback, compensación, forward-fix u otro mecanismo aprobado |
| `runbook_ref`            | procedimiento versionado aplicable                                             |
| `authority_ref`          | actor o autoridad que puede ejecutar o aprobar la acción                       |
| `execution_ref`          | prueba o ejercicio real utilizado como evidencia                               |
| `result_ref`             | resultado técnico y empresarial cuando corresponda                             |
| `evidence_ref`           | soporte durable de la conclusión                                               |
| `blocking_reason`        | motivo exacto cuando no pueda decidirse PASS                                   |

La evidencia de otro paquete, release, ambiente, punto temporal, configuración o conjunto de datos no se reutiliza por semejanza.

---

#### 7. Plano `BACKUP_COVERAGE`

Este plano confirma que todo objeto que deba recuperarse posee protección identificable y verificable.

Un elemento alcanza `PASS` únicamente cuando, según aplique, se demuestra:

1. identidad estable del objeto o grupo consistente;
2. fuente autoritativa y alcance exacto;
3. política vigente y propietaria;
4. punto temporal o mecanismo de captura identificable;
5. estado compatible con la política;
6. integridad comprobable;
7. cadena completa cuando el mecanismo dependa de múltiples piezas;
8. aislamiento suficiente frente al dominio de falla que deba cubrirse;
9. cifrado y procedimiento recuperable de llave cuando aplique;
10. formato y versión reconocibles;
11. retención vigente;
12. disponibilidad del método de restauración;
13. evidencia de que la cobertura incluye metadatos, permisos, relaciones y objetos asociados que sean materialmente necesarios;
14. observabilidad de fallos, antigüedad, expiración o degradación de la protección cuando la política lo requiera.

No alcanza `PASS` por:

- una réplica bajo la misma autoridad;
- un snapshot sin alcance o consistencia demostrados;
- una exportación sin método de restauración;
- un job con estado verde sin integridad ni restauración;
- una fila de inventario;
- la promesa del proveedor;
- la sola existencia de PITR o versionado sin evidencia de que cubra el objeto y periodo requeridos.

---

#### 8. Plano `RESTORE_PROOF`

Este plano confirma restaurabilidad real.

Un elemento alcanza `PASS` únicamente cuando existe una ejecución controlada que permita demostrar, según aplique:

1. selección explícita del punto de recuperación;
2. cadena completa y utilizable;
3. acceso a llaves y material técnico necesario sin exponer secretos;
4. destino autorizado y suficientemente aislado para la prueba;
5. restauración del contenido y metadatos necesarios;
6. compatibilidad entre datos, esquema, aplicación, contratos, configuración y artefactos;
7. integridad del objeto restaurado;
8. consistencia entre objetos que representan el mismo hecho;
9. tratamiento seguro de eventos, outbox, inbox, colas, jobs y dead-letter;
10. contención de notificaciones, pagos, movimientos, impresiones, integraciones u otros efectos reales no deseados;
11. validación técnica definida por el propietario;
12. validación del servicio mínimo empresarial cuando sea parte del criterio aplicable;
13. medición del ejercicio cuando exista un objetivo aprobado;
14. evidencia durable de inicio, final, resultado, defectos, reconciliación y decisión;
15. vigencia suficiente de la prueba frente al objeto, política, release y criticidad evaluados.

Una prueba parcial de un objeto integrante de un grupo consistente no prueba el grupo completo.

---

#### 9. Estado `COMPLETED_UNVERIFIED`

Se fija una regla expresa:

```text
COMPLETED_UNVERIFIED
→ NO PUEDE PRODUCIR PASS
```

Si la única evidencia disponible es que la copia terminó o fue creada, el resultado será:

- `BLOQUEADO` cuando todavía falte ejecutar o reunir la verificación requerida;
- `FAIL` cuando exista evidencia de que la copia, cadena, integridad, llave, formato o restauración no cumple.

No se promoverá un resultado por antigüedad del backup, ausencia de incidentes o reputación del proveedor.

---

#### 10. Plano `ROLLBACK_PROOF`

Este plano confirma que el paquete puede abandonar de manera controlada un cambio material cuando el mecanismo aprobado lo permita.

Cada obligación de rollback deberá identificar:

- estado objetivo;
- mecanismo aprobado;
- autoridad para ejecutarlo;
- disparador;
- punto de no retorno cuando exista;
- dependencias;
- orden;
- efectos sobre datos;
- efectos sobre contratos e integraciones;
- efectos externos;
- compatibilidad temporal;
- efectos irreversibles;
- conciliación requerida;
- observabilidad durante la prueba;
- criterio de validación posterior.

Un elemento alcanza `PASS` únicamente si el mecanismo aplicable fue realmente ejercitado en un entorno y alcance válidos y produjo el estado esperado sin dejar efectos desconocidos no gobernados.

La prueba deberá demostrar, según aplique:

1. que el disparador puede reconocerse;
2. que la autoridad puede actuar dentro del flujo definido;
3. que el mecanismo se ejecuta en el orden previsto;
4. que dependencias y contratos permanecen compatibles;
5. que no se duplican efectos por reintento o repetición;
6. que el estado final coincide con el objetivo de retorno;
7. que datos y efectos residuales son identificables;
8. que la validación posterior distingue recuperación puntual de estabilidad;
9. que la reconciliación requerida puede completarse;
10. que la evidencia permite reconstruir lo ocurrido.

---

#### 11. Estrategias distintas del rollback literal

No todo cambio admite un retorno literal seguro.

Cuando el dossier aprobado determine que el mecanismo correcto es compensación, forward-fix, restauración desde una fuente recuperable, desactivación controlada, cambio de routing o una combinación, `READY-GATE-012` evaluará ese mecanismo y no impondrá un rollback ficticio.

Para alcanzar `PASS` deberá existir evidencia real de que la estrategia aprobada:

- es ejecutable;
- contiene el riesgo que pretende controlar;
- preserva integridad y autoridad;
- trata efectos irreversibles de manera explícita;
- posee validación y reconciliación;
- no deja un estado `FAILED_OR_UNKNOWN` presentado como recuperación.

La imposibilidad de rollback literal no constituye por sí sola un fallo si la alternativa aprobada es materialmente segura y fue probada.

---

#### 12. Cambios de datos, migraciones y backfills

Para cambios que modifiquen datos o estructuras, la prueba no se reduce al artefacto de aplicación.

Deberá determinarse, según el paquete:

- qué datos se transformaron;
- si la transformación es reversible, compensable o solo forward-fix;
- qué versión de esquema requiere cada versión de aplicación;
- qué periodo de compatibilidad existe;
- qué hechos creados después del cambio no pueden perderse al retornar;
- cómo se preserva causalidad e identidad;
- cómo se evita resucitar datos eliminados, permisos retirados o disposiciones posteriores;
- cómo se reconcilian filas, archivos, eventos y proyecciones;
- qué validación prueba que el estado de datos sigue siendo empresarialmente coherente.

Un rollback de código que deja datos incompatibles produce `FAIL`.

Una restauración que descarta hechos posteriores sin una decisión y conciliación aprobadas produce `FAIL`.

Un diseño cuya reversibilidad aún no puede demostrarse produce `BLOQUEADO` hasta que la evidencia requerida exista.

---

#### 13. Colas, jobs, eventos y trabajo offline

Cuando existan efectos asíncronos o locales, la prueba deberá conservar como mínimo:

- intentos pendientes;
- operaciones confirmadas;
- resultados desconocidos;
- reintentos;
- deduplicación;
- orden;
- checkpoints;
- dead-letter;
- expiración;
- autoridad vigente;
- backlog;
- conciliación con la fuente de verdad.

Después de restaurar o revertir no se permite:

- reemitir ciegamente efectos externos;
- duplicar pagos, mensajes, movimientos, impresiones o notificaciones;
- perder trabajo local pendiente;
- sincronizar una acción cuya autoridad expiró sin revalidación;
- cerrar la prueba mientras existan resultados desconocidos materiales sin tratamiento.

La existencia de una cola vacía después del ejercicio no demuestra por sí sola que el trabajo haya sido procesado correctamente.

---

#### 14. Storage, documentos y evidencia

Cuando el paquete dependa de archivos, documentos o evidencia, `RESTORE_PROOF` deberá verificar coherencia entre:

- contenido;
- hash o integridad equivalente;
- metadatos;
- versión;
- clasificación;
- referencia empresarial;
- retención;
- hold cuando aplique;
- permisos;
- relación con registros estructurados.

Archivo sin referencia o referencia sin archivo no se considera recuperación completa.

La prueba no utilizará datos productivos en un entorno no autorizado ni convertirá la restauración en una vía de sobreexposición.

---

#### 15. Dependencias y proveedores externos

Cuando una recuperación dependa de un proveedor externo, deberá existir evidencia suficiente sobre:

- objeto o estado bajo control del proveedor;
- formato o capacidad de exportación;
- retención;
- mecanismo de recuperación;
- dependencia de credenciales o llaves;
- evidencia disponible;
- conciliación interna;
- alternativa o salida aplicable;
- limitaciones conocidas.

Una garantía comercial, SLA del proveedor, página de estado o documentación pública no sustituyen una restauración o reconciliación propia cuando el riesgo del paquete exige prueba.

---

#### 16. Plano `DATA_EFFECT_RECONCILIATION`

Este plano impide cerrar la puerta únicamente porque el componente técnico volvió a responder.

Se deberá demostrar, según aplique:

1. consistencia de fuentes de verdad y proyecciones;
2. ausencia de duplicados materiales no controlados;
3. ausencia de pérdidas no aceptadas;
4. estado de archivos y evidencia;
5. estado de colas, jobs y pendientes;
6. estado de operaciones offline;
7. estado de efectos externos;
8. autorizaciones, consentimientos y disposiciones posteriores al punto restaurado;
9. backlog generado durante la afectación o ejercicio;
10. trabajo manual de contingencia pendiente de incorporar;
11. excepciones y defectos abiertos;
12. confirmación de qué hechos permanecen desconocidos.

`PASS` requiere que cada pendiente material esté conciliado o tenga un handoff aprobado que no oculte un resultado todavía capaz de producir efecto empresarial.

---

#### 17. Plano `RECOVERY_OBJECTIVES`

La puerta consume objetivos ya aprobados; no los crea.

Cuando exista un objetivo canónico aplicable, la evidencia deberá conservar:

- identificador o referencia del objetivo;
- alcance;
- población o conjunto afectado;
- punto inicial y punto final de medición;
- resultado medido;
- exclusiones autorizadas;
- evidencia de integridad de la medición;
- decisión de cumplimiento.

Se mantienen separados:

- MTPD;
- MBCO;
- RTO;
- RPO;
- WRT;
- tiempo de normalización total.

Reglas:

1. una programación nominal de backup no demuestra RPO;
2. una aplicación que responde no demuestra RTO empresarial;
3. el tiempo de reconciliación no desaparece por ocurrir después del restore técnico;
4. un objetivo desconocido que sea obligatorio produce `BLOQUEADO`;
5. una cifra estimada o banda cualitativa no se presenta como medición real;
6. esta tarea no inventa minutos, horas, porcentajes ni tolerancias nuevas;
7. si el objetivo no aplica, `NO_APLICA` exige justificación aprobada de la no aplicabilidad.

---

#### 18. Plano `RUNBOOK_AUTHORITY_EVIDENCE`

Una prueba válida deberá ejecutarse dentro de un procedimiento y una autoridad reconocibles.

Se comprobará, cuando aplique:

- runbook versionado;
- relación con el objeto y mecanismo exactos;
- precondiciones;
- verificaciones previas;
- autoridad para iniciar;
- autoridad para ejecutar;
- segregación entre ejecutar y validar cuando corresponda;
- manejo de credenciales sin incorporar secretos al expediente;
- secuencia y dependencias;
- punto de abortar;
- criterios de éxito y fallo;
- observabilidad requerida;
- comunicación aplicable;
- validación posterior;
- conciliación;
- escalamiento;
- evidencia de la práctica o ejercicio.

Un procedimiento correcto pero nunca practicado no satisface una obligación que requiera prueba real.

---

#### 19. Relación con observabilidad

`READY-GATE-011` y `READY-GATE-012` permanecen separados.

La observabilidad necesaria para probar recuperación deberá demostrar, según aplique:

- inicio del ejercicio;
- versión y ambiente;
- estado de dependencias;
- fallos y resultados desconocidos;
- progreso de restauración o retorno;
- backlog;
- reintentos;
- salud después de la acción;
- evidencia de estabilidad suficiente;
- correlación con el cambio o ejercicio.

Un dashboard verde no prueba restaurabilidad.

Una restauración aparentemente exitosa sin evidencia suficiente para reconstruir lo ocurrido produce `BLOQUEADO` cuando la política exige esa evidencia.

---

#### 20. Evidencia aceptable

Podrán participar como evidencia, cuando correspondan al elemento exacto evaluado:

- manifiesto de backup con identidad, alcance, punto, cadena, integridad, cifrado, retención y estado;
- registro de una restauración controlada;
- evidencia del destino aislado o de los guardrails aplicados;
- prueba de descifrado o disponibilidad de llave conforme a política, sin exponer el secreto;
- evidencia de compatibilidad entre esquema, aplicación, configuración y contratos;
- resultados de validación técnica;
- resultados de servicio mínimo empresarial cuando sean aplicables;
- mediciones reales frente a un objetivo previamente aprobado;
- registro de ejercicio de rollback, compensación o forward-fix;
- comparación antes/después del estado objetivo;
- evidencia de colas, idempotencia, deduplicación y conciliación;
- evidencia de Storage, documentos y metadatos recuperados;
- evidencia de efectos externos contenidos o reconciliados;
- runbook versionado y registro de su práctica;
- telemetría y logs seguros del ejercicio;
- defectos, excepciones y decisiones resultantes;
- firma o aprobación de los actores definidos por el contrato de aceptación.

La evidencia debe permitir resolver identidad, alcance, tiempo, ambiente, versión, resultado y autoridad.

---

#### 21. Evidencia insuficiente por sí sola

No constituyen prueba suficiente de readiness, aisladamente:

- “backup habilitado”;
- “PITR habilitado”;
- snapshot existente;
- réplica saludable;
- job de backup verde;
- estado `COMPLETED_UNVERIFIED`;
- archivo exportado sin restauración;
- documentación del proveedor;
- plan de rollback;
- existencia de un kill switch;
- capacidad teórica de `git revert`;
- disponibilidad de una versión anterior;
- migración inversa no ejercitada;
- base de datos que abre conexión después de restaurar;
- health check verde;
- build, typecheck o CI exitosos;
- test unitario que no ejercita el mecanismo de recuperación;
- captura de pantalla sin identidad suficiente;
- declaración humana sin registro del ejercicio;
- prueba hecha sobre otro release, ambiente, sede, punto temporal o dataset;
- ausencia de incidentes históricos;
- ausencia de alertas cuando el monitoreo no fue verificado.

---

#### 22. Estados de decisión

Cada elemento aplicable deberá terminar exactamente en uno de estos estados:

| Estado      | Regla                                                                                                                         |
| ----------- | ----------------------------------------------------------------------------------------------------------------------------- |
| `PASS`      | toda la evidencia requerida está presente, vigente, correlacionada y demuestra el resultado esperado                          |
| `FAIL`      | existe evidencia suficiente de incumplimiento material del criterio                                                           |
| `BLOQUEADO` | la decisión requiere evidencia, objetivo, autoridad, acceso o ejecución que todavía no está disponible o no puede demostrarse |
| `NO_APLICA` | el dossier aprobado demuestra explícitamente que el criterio no aplica al elemento o paquete                                  |

No se utiliza `NO_APLICA` para:

- una prueba no ejecutada;
- un backup faltante;
- un objetivo desconocido;
- un rollback no demostrado;
- una llave no disponible;
- una evidencia ambigua;
- un proveedor que no permite comprobar la capacidad;
- un objeto reconstruible sin prueba de reconstrucción;
- una brecha pendiente.

---

#### 23. Condiciones de `FAIL`

Producen `FAIL`, entre otras condiciones materiales aplicables:

1. objeto crítico requerido sin protección válida;
2. cadena de backup rota;
3. integridad inválida;
4. llave necesaria irrecuperable;
5. restauración requerida ejecutada y fallida;
6. restauración que produce un grupo inconsistente;
7. datos, documentos o evidencia perdidos fuera de la tolerancia aprobada;
8. aplicación y esquema incompatibles después de restaurar o revertir;
9. rollback requerido ejecutado y fallido;
10. retorno a un estado distinto del objetivo aprobado;
11. duplicación de efectos por replay, retry o rollback;
12. pérdida de trabajo offline o asíncrono no autorizada;
13. reemisión no controlada de pagos, movimientos, mensajes, impresiones o notificaciones;
14. recuperación que resucita autorizaciones, datos o disposiciones posteriores de forma inválida;
15. objetivo aprobado medido y materialmente incumplido;
16. ejercicio que deja backlog o efectos residuales materiales sin tratamiento válido;
17. evidencia que demuestra que el runbook u orden es incorrecto;
18. restauración o rollback que expone datos o secretos fuera de autorización;
19. evidencia perteneciente a otro objeto o ambiente utilizada para afirmar el resultado actual;
20. `REC-GAP-P0` o `REC-GAP-P1` cuya condición material ya demuestra incumplimiento y no posee control aprobado suficiente.

---

#### 24. Condiciones de `BLOQUEADO`

Producen `BLOQUEADO`, entre otras condiciones aplicables:

1. objetivo obligatorio aún no aprobado o `UNKNOWN_BLOCKING`;
2. restauración exigida todavía no ejecutada;
3. rollback o estrategia alternativa exigida todavía no ejercitada;
4. única copia disponible en estado `COMPLETED_UNVERIFIED`;
5. identidad o alcance del backup ambiguos;
6. punto recuperable no demostrable;
7. disponibilidad de llave o procedimiento no comprobables;
8. target aislado o guardrails requeridos no disponibles para ejecutar la prueba;
9. autoridad necesaria no disponible o no demostrada;
10. runbook requerido inexistente, vencido o no aplicable al objeto actual;
11. evidencia incompleta o sin correlación con release/ambiente;
12. ejercicio vencido frente a una política que exige vigencia;
13. dependencia necesaria para probar la recuperación no disponible;
14. grupo consistente sin evidencia de todos sus componentes;
15. resultado técnico disponible pero validación empresarial requerida pendiente;
16. conciliación todavía no ejecutada o resultado residual desconocido;
17. `REC-GAP-P0` o `REC-GAP-P1` abierta sin control vigente y evidencia suficiente para decidir cumplimiento;
18. proveedor crítico cuya capacidad requerida no puede demostrarse todavía.

`BLOQUEADO` no se redondea a `PASS` por presión de calendario o porque el camino feliz funcione.

---

#### 25. Tratamiento de perfiles `RC0..RC4`

Los cinco perfiles cualitativos de recuperación se conservan sin reinterpretación:

- `RC0_SAFETY_INTEGRITY`;
- `RC1_CRITICAL_OPERATION`;
- `RC2_IMPORTANT_OPERATION`;
- `RC3_SUPPORTING`;
- `RC4_RECONSTRUCTIBLE`.

Reglas:

1. el perfil determina criticidad y tipo de obligación, no una duración numérica implícita;
2. `RC4_RECONSTRUCTIBLE` no significa “sin prueba”: exige demostrar fuente, versión de regla, dependencias, capacidad, tiempo, costo e integridad de la reconstrucción según el contrato aplicable;
3. un objeto de soporte puede elevar criticidad cuando habilita una dependencia crítica;
4. un perfil no se reduce para evitar una prueba requerida;
5. el gate consume el perfil vigente del dossier y no lo recalcula por resultado observado.

---

#### 26. Excepciones y brechas de recuperación

Las excepciones no convierten un requisito incumplido en inexistente.

Toda excepción aceptada que pretenda permitir avance deberá identificar:

- obligación afectada;
- riesgo;
- alcance;
- criticidad;
- control compensatorio;
- propietario;
- aprobador autorizado;
- vigencia;
- fecha o condición de revisión;
- evidencia del control;
- criterio de salida.

Una excepción vencida, ambigua o sin evidencia no habilita `PASS`.

La puerta conserva como bloqueantes las brechas críticas o altas de recuperación que no tengan tratamiento válido conforme al contrato de recuperación.

---

#### 27. Cálculo agregado del paquete

La decisión `READY-GATE-012::<package_id>` se calcula de forma estricta:

```text
SI EXISTE AL MENOS UN FAIL
→ PACKAGE_RESULT = FAIL

SI NO EXISTE FAIL Y EXISTE AL MENOS UN BLOQUEADO
→ PACKAGE_RESULT = BLOQUEADO

SI TODOS LOS ELEMENTOS APLICABLES SON PASS
Y TODO NO_APLICA ESTÁ JUSTIFICADO
→ PACKAGE_RESULT = PASS
```

Además:

1. cada elemento esperado aparece exactamente una vez;
2. no se omiten elementos por falta de evidencia;
3. no se promedian resultados;
4. no se compensa un fallo crítico con múltiples pruebas verdes;
5. no se certifica por muestra cuando el universo aprobado exige cobertura completa;
6. una prueba en laboratorio no sustituye automáticamente la prueba del ambiente objetivo cuando las diferencias son materiales;
7. una prueba de un release no se hereda a otro si cambió el mecanismo, objeto, esquema, configuración, contrato o dependencia relevante;
8. una misma evidencia puede respaldar varios elementos solo cuando la relación sea explícita y materialmente válida.

---

#### 28. Manifiesto de evidencia del gate

La salida futura de `SHELL-CI-021::<package_id>` para esta puerta deberá poder producir un manifiesto con:

- `package_id`;
- release/cambio evaluado;
- ambiente;
- fecha del corte;
- lista completa de `required_recovery_evidence_set`;
- estado por elemento;
- referencia a objeto o efecto;
- política/perfil aplicable;
- mecanismo evaluado;
- ejecución utilizada;
- evidencia utilizada;
- resultado medido cuando aplique;
- objetivo aprobado de comparación cuando aplique;
- defectos;
- brechas/excepciones;
- pendientes de conciliación;
- actor ejecutor;
- actor validador cuando corresponda;
- decisión agregada;
- motivo exacto de cada `FAIL`, `BLOQUEADO` o `NO_APLICA`.

El manifiesto referencia evidencia; no copia secretos, payloads sensibles ni dumps completos.

---

#### 29. Frontera con continuidad empresarial

`READY-GATE-012` no redefine continuidad empresarial.

Puede comprobar que:

- un objetivo aprobado existe y fue medido;
- un servicio mínimo empresarial requerido fue validado;
- una reconciliación fue completada;
- una prueba técnica produjo evidencia suficiente para el handoff.

No puede:

- inventar MTPD, MBCO, RTO, RPO o WRT;
- activar continuidad empresarial;
- declarar cierre de una crisis por recuperación técnica;
- cambiar prioridades de procesos;
- sustituir la aprobación del propietario empresarial.

Cuando la validación empresarial sea obligatoria y aún no exista, el resultado permanece `BLOQUEADO`.

---

#### 30. Frontera con cambio y rollback

`TI-DOM-009` conserva autoridad sobre el cambio tecnológico.

`READY-GATE-012` únicamente decide si la evidencia de reversibilidad/recuperación requerida para el paquete está lista.

No ejecuta:

- cambio;
- deployment;
- rollback;
- forward-fix;
- compensación;
- restore;
- failover;
- modificación de configuración;
- migración;
- DDL/DML;
- backfill;
- operación remota.

La prueba real que alimenta este gate pertenece a la fase de implementación y ejercicio autorizados.

---

#### 31. Frontera con Supabase y datos VENTO

Toda migración, configuración o modificación de Supabase perteneciente a VENTO continúa bajo `vento-shell`.

Esta tarea no ejecuta operaciones Supabase ni presume capacidades no demostradas.

Cuando un paquete dependa de Supabase, la evidencia futura deberá distinguir, según aplique:

- historial y versión de migración;
- fuente de verdad;
- esquema y datos;
- RLS, funciones y triggers;
- Storage;
- Realtime;
- Edge Functions;
- cron/jobs;
- colas o estado pendiente;
- secretos y llaves sin exponer sus valores;
- compatibilidad de aplicación;
- punto recuperable;
- restauración y reconciliación.

La existencia de la plataforma o de una configuración activa no prueba recuperación.

---

#### 32. Requisitos de prueba derivados

**Resultado:** NO GENERA REQUISITOS DE PRUEBA

**Justificación:** `READY-GATE-012` especializa en una puerta de readiness condiciones de respaldo, restauración, rollback, objetivos, consistencia y reconciliación que ya están protegidas por el registro canónico. No introduce una conducta ejecutable nueva ni modifica la semántica de las pruebas existentes; define cómo deben reunirse y decidirse sus evidencias reales por paquete después de la implementación aplicable.

**Requisitos creados:** 0

**Requisitos modificados:** 0

**Fragmentos 04A afectados:** 0

Se consumen sin modificación, principalmente:

- `TREQ-PROC-501` a `TREQ-PROC-540`;
- `TREQ-PROC-1527`;
- `TREQ-PROC-1528`;
- `TREQ-PROC-1540`.

---

#### 33. Criterios de aceptación

`READY-GATE-012` queda documentalmente completa cuando:

1. define exactamente seis planos independientes de readiness de recuperación y rollback;
2. obliga a construir `required_recovery_evidence_set` antes de observar resultados;
3. conserva identidad de paquete, release/cambio, ambiente, objeto y mecanismo en cada obligación;
4. separa backup, réplica, snapshot, exportación, rollback, restore, failover, recuperación técnica y recuperación empresarial;
5. impide que `COMPLETED_UNVERIFIED` produzca `PASS`;
6. exige prueba real de restauración cuando la política o criticidad la requiere;
7. exige prueba real del rollback o estrategia alternativa aprobada cuando sea materialmente aplicable;
8. no fuerza rollback literal cuando la alternativa aprobada es más segura, pero exige que esa alternativa esté probada;
9. protege compatibilidad de aplicación, esquema, configuración, contratos y dependencias;
10. protege consistencia de datos, archivos, colas, jobs, eventos y estado offline;
11. protege contra duplicación o reemisión no controlada de efectos externos;
12. exige reconciliar efectos residuales, backlog y trabajo manual aplicable;
13. consume objetivos aprobados sin inventar cifras;
14. trata un objetivo obligatorio no resuelto como `BLOQUEADO`;
15. conserva MTPD, MBCO, RTO, RPO, WRT y normalización total como conceptos distintos;
16. exige runbook, autoridad y evidencia de práctica cuando sean requeridos;
17. reconoce `PASS`, `FAIL`, `BLOQUEADO` y `NO_APLICA` con semántica estricta;
18. impide utilizar `NO_APLICA` para una prueba faltante o no ejecutada;
19. aplica agregación estricta sin promedios ni redondeo de muestras parciales;
20. exige evidencia correspondiente al mismo paquete, release, ambiente y alcance material;
21. conserva el handoff hacia continuidad empresarial sin reemplazar su autoridad;
22. no ejecuta backup, restore, rollback, migraciones, DDL/DML, backfills, despliegues ni cambios remotos;
23. crea cero requisitos de prueba y modifica cero requisitos existentes;
24. mantiene `READY-GATE-013` únicamente reservada.

---

#### 34. Estado del resultado documental

| Resultado                                | Estado                                                                                  |
| ---------------------------------------- | --------------------------------------------------------------------------------------- |
| criterio de `BACKUP_COVERAGE`            | `ESPECIFICADO`                                                                          |
| criterio de `RESTORE_PROOF`              | `ESPECIFICADO`                                                                          |
| criterio de `ROLLBACK_PROOF`             | `ESPECIFICADO`                                                                          |
| criterio de `DATA_EFFECT_RECONCILIATION` | `ESPECIFICADO`                                                                          |
| criterio de `RECOVERY_OBJECTIVES`        | `ESPECIFICADO`                                                                          |
| criterio de `RUNBOOK_AUTHORITY_EVIDENCE` | `ESPECIFICADO`                                                                          |
| `required_recovery_evidence_set`         | `ESPECIFICADO` como contrato; su población real corresponde a cada paquete implementado |
| manifiesto futuro de evidencia           | `ESPECIFICADO`                                                                          |
| respaldos o restores reales              | `FUERA_DE_ALCANCE` de esta tarea documental                                             |
| rollback o compensaciones reales         | `FUERA_DE_ALCANCE` de esta tarea documental                                             |
| evidencia operativa futura               | `PENDIENTE_DE_EVIDENCIA` hasta la ejecución autorizada correspondiente                  |

La especificación documental no se presenta como prueba ejecutada.

---

#### 35. Secuencia preservada

La tarea conserva la secuencia operativa aprobada por paquete:

```text
E5-GATE-008::<package_id>
→ SHELL-CI-020::<package_id>
→ BLOQUE R Y TAREAS FÍSICAS APLICABLES
→ SHELL-CI-021::<package_id>
→ SHELL-CI-022::<package_id>
```

`READY-GATE-012` diseña una de las comprobaciones que consumirá `SHELL-CI-021`. No adelanta cutover, piloto, hypercare ni cierre.

---

#### 36. Continuidad

ÚLTIMA TAREA APROBADA
`READY-GATE-011 — Definir criterio y evidencia para confirmar monitoreo, métricas y alertas`

TAREA ACTUAL APROBADA
`READY-GATE-012 — Definir criterio y evidencia para confirmar respaldo y rollback probados`

SIGUIENTE TAREA RESERVADA
`READY-GATE-013 — Definir método y evidencia para capturar la línea base previa al piloto`


### ✅ READY-GATE-013 — Definir método y evidencia para capturar la línea base previa al piloto

**Estado:** APROBADA  
**Tarea anterior:** `READY-GATE-012 — Definir criterio y evidencia para confirmar respaldo y rollback probados` — APROBADA  
**Tarea siguiente:** `READY-GATE-014 — Definir registro de riesgos aceptados y condiciones de suspensión` — RESERVADA  
**Tipo de tarea:** documental — definición normativa y materialización del contrato de readiness por paquete para construir, capturar, congelar, evidenciar y aceptar la línea base previa al piloto; sin ejecutar pilotos, despliegues, migraciones, DDL/DML, backfills, cambios físicos, configuración productiva ni operaciones sobre Supabase.  
**Repositorio propietario:** `devVentoGroup/vento-shell`

---

#### 1. Resultado sustantivo

`READY-GATE-013` define la evaluación futura `READY-GATE-013::<package_id>` que deberá consumir `SHELL-CI-021::<package_id>` después de la implementación física autorizada y antes de que el paquete pueda presentarse a la decisión final de entrada al piloto.

El resultado documental queda materializado mediante cinco piezas obligatorias y separadas:

1. `required_baseline_set::<package_id>` — universo exhaustivo y versionado de indicadores, estados, poblaciones, dependencias y condiciones preexistentes que requieren referencia previa;
2. contrato de captura por elemento — identidad, definición, fuente, ventana, corte, segmentación, calidad, comparabilidad y evidencia mínima;
3. reglas deterministas de decisión — traducción de la condición de la captura a `PASS`, `FAIL`, `BLOQUEADO` o `NO_APLICA`;
4. reconciliación de completitud — conteos de esperado, materializado, faltantes, duplicados e identificadores no resolubles antes de emitir resultado agregado;
5. `baseline_manifest::<package_id>` — manifiesto futuro de evidencia que deberá producir la ejecución de `SHELL-CI-021`.

La tarea no captura todavía valores reales de línea base ni afirma que un paquete haya superado readiness. Define el contrato consumible que impedirá reconstruir, seleccionar o reinterpretar la referencia previa después de observar el resultado del piloto.

---

#### 2. Propósito

Definir el método canónico mediante el cual cada paquete candidato a piloto deberá demostrar que dispone de una referencia previa identificable, reproducible, íntegra y comparable, suficiente para distinguir el estado existente antes de la exposición de los efectos observados durante o después del piloto.

La línea base deberá permitir responder, sin reconstrucción oportunista posterior, al menos:

- qué paquete, capacidad y candidato se observaron;
- en qué ambiente, sede, población, cohorte y alcance;
- qué indicadores o estados previos eran aplicables;
- cómo se definía cada indicador en ese momento;
- qué fuente autoritativa produjo el dato;
- qué ventana temporal y corte se utilizaron;
- qué valor, distribución o estado previo quedó registrado;
- qué faltantes, anomalías, incidentes o condiciones preexistentes podían afectar la interpretación;
- qué evidencia permite reproducir o auditar la captura;
- qué elementos esperados no pudieron materializarse y por qué;
- y si la referencia sigue siendo comparable con la medición que se realizará durante el piloto.

La captura material de la línea base y la evidencia resultante corresponden a la ejecución posterior del readiness sobre el paquete implementado.

---

#### 3. Invariante de interpretación

Se adopta la siguiente separación obligatoria:

```text
LÍNEA BASE
≠ OBJETIVO
≠ UMBRAL DE ACEPTACIÓN
≠ TELEMETRÍA EN VIVO
≠ RESULTADO DEL PILOTO
≠ EVIDENCIA DE CAUSALIDAD
```

La línea base es una referencia controlada del estado previo a la exposición del piloto.

No constituye por sí misma:

- un objetivo;
- un SLO;
- un umbral de aceptación;
- una garantía de desempeño;
- evidencia de mejora;
- evidencia de deterioro;
- evidencia de causalidad;
- autorización para iniciar el piloto.

Un valor objetivo o contractual no podrá sustituirse por una observación histórica. Una observación histórica favorable no podrá relajar un umbral aprobado en `DELIV-PKG-023`, `NFR-REQ-009` o el contrato aplicable del paquete.

---

#### 4. Entradas canónicas y frontera con contratos adyacentes

`READY-GATE-013` consume, sin redefinir su autoridad:

1. `DELIV-PKG-013` para requisitos no funcionales y compatibilidad aplicables al paquete;
2. `DELIV-PKG-016` para requisitos de prueba, nivel, archivos, fixtures, ambientes, responsables y evidencia esperada;
3. `DELIV-PKG-017` para observabilidad, métricas, logs, eventos, alertas, fuentes y señales aplicables;
4. `DELIV-PKG-019` para estrategia de rollout y segmentación progresiva;
5. `DELIV-PKG-022` para población, actores, sedes, datos, dispositivos, ambiente, duración, cohortes, exclusiones y salvaguardas del piloto;
6. `DELIV-PKG-023` para criterios medibles de aceptación y evidencia;
7. `DELIV-PKG-025` como dossier documental previo a implementación física;
8. `NFR-REQ-009` para obligaciones no funcionales de observabilidad y evidencia;
9. `READY-GATE-011` para disponibilidad y aptitud de monitoreo, métricas y alertas;
10. `READY-GATE-012` para evidencia de respaldo, restauración y rollback cuando esas condiciones puedan afectar la interpretación o recuperación del piloto.

La frontera de las puertas siguientes permanece intacta:

- `READY-GATE-014` gobierna los riesgos aceptados y las condiciones de suspensión;
- `READY-GATE-015` gobierna la autoridad y el criterio final para autorizar la entrada al piloto.

Por tanto, una línea base correctamente capturada no autoriza el piloto, no acepta riesgos, no demuestra rollback y no reemplaza la aprobación final de readiness.

---

#### 5. Construcción obligatoria de `required_baseline_set`

Antes de observar resultados del piloto deberá construirse `required_baseline_set::<package_id>`.

El conjunto se deriva exclusivamente del dossier aprobado del paquete y no de los resultados que posteriormente produzca el piloto.

Deberá incluir, cuando resulten aplicables:

1. indicadores, SLI, métricas, eventos o estados definidos por el contrato de observabilidad;
2. criterios de aceptación que requieran comparación antes/después, tendencia, distribución, tasa, proporción, volumen, duración, error, disponibilidad, calidad o referencia histórica;
3. estados operativos preexistentes necesarios para interpretar correctamente el resultado;
4. sedes, actores, roles, dispositivos, cohortes, poblaciones o segmentos que estarán expuestos;
5. dependencias, integraciones o condiciones de infraestructura cuyo estado preexistente pueda actuar como factor de confusión;
6. colas, pendientes, backlog, incidencias o degradaciones que puedan alterar el resultado observado;
7. referencias previas exigidas expresamente por el contrato de aceptación, rollout o piloto;
8. estados de configuración relevantes para interpretar la comparación, sin copiar secretos;
9. condiciones de calendario, campaña, mantenimiento, cierre, estacionalidad o volumen que puedan afectar la ventana;
10. reconstrucciones históricas permitidas cuando no exista una captura original y sea posible preservar comparabilidad de manera auditable.

Reglas:

1. el conjunto deberá quedar derivado antes de examinar el resultado del piloto;
2. cada elemento esperado aparecerá exactamente una vez;
3. un elemento no se elimina porque falte evidencia;
4. un elemento no se elimina porque su valor sea desfavorable;
5. un elemento no se convierte en `NO_APLICA` por ausencia de datos;
6. una misma medición puede respaldar más de un elemento únicamente cuando la relación sea explícita y materialmente válida;
7. el conjunto deberá conservar versión;
8. cualquier cambio posterior en el universo deberá quedar versionado y justificado;
9. una reducción del universo después de conocer resultados que busque mejorar la conclusión constituye incumplimiento material;
10. la ejecución futura deberá demostrar conteos de completitud antes de emitir el resultado agregado.

---

#### 6. Identidad mínima de cada elemento

Cada elemento de `required_baseline_set::<package_id>` deberá conservar, como mínimo y cuando aplique:

| Campo                        | Regla                                                                                   |
| ---------------------------- | --------------------------------------------------------------------------------------- |
| `package_id`                 | paquete exacto evaluado                                                                 |
| `baseline_set_version`       | versión inmutable del universo utilizado para la decisión                               |
| `baseline_element_id`        | identidad estable y única dentro del paquete                                            |
| `source_contract_ref`        | contrato canónico que origina la necesidad de referencia                                |
| `source_element_ref`         | indicador, criterio, estado, dependencia, cohorte o identidad concreta de origen        |
| `candidate_ref`              | candidato, versión, revisión, artefacto o commit evaluado cuando corresponda            |
| `environment_ref`            | ambiente exacto al que corresponde la referencia                                        |
| `site_or_scope_ref`          | sede, área, ámbito funcional o técnico cuando cambie la validez                         |
| `population_or_cohort_ref`   | población, cohorte o segmento aplicable                                                 |
| `pilot_or_rollout_ref`       | diseño de piloto o rollout con el que deberá compararse                                 |
| `metric_or_state_ref`        | métrica, estado o condición previa que se captura                                       |
| `measurement_definition_ref` | definición y versión de cálculo o interpretación                                        |
| `authoritative_source_ref`   | fuente propietaria del dato o estado                                                    |
| `window_start`               | inicio verificable de la ventana                                                        |
| `window_end`                 | final verificable de la ventana                                                         |
| `cutoff_at`                  | corte previo a la exposición aplicable                                                  |
| `timezone`                   | zona horaria utilizada                                                                  |
| `sample_or_population_rule`  | regla de cobertura o muestreo cuando exista                                             |
| `required_dimensions`        | dimensiones que deben preservarse para comparabilidad                                   |
| `required_evidence`          | evidencia mínima exigida por el contrato aplicable                                      |
| `comparability_rule`         | condiciones que deberán seguir siendo equivalentes durante el piloto                    |
| `quality_condition`          | condición de la captura conforme a esta tarea                                           |
| `result`                     | `PASS`, `FAIL`, `BLOQUEADO` o `NO_APLICA`                                               |
| `evidence_ref`               | referencia durable a la evidencia utilizada                                             |
| `blocking_reason`            | motivo exacto cuando la decisión no sea `PASS`                                          |
| `blocking_owner`             | propietario del desbloqueo cuando exista                                                |
| `blocking_task_ref`          | tarea o contrato responsable cuando el bloqueo deba resolverse fuera de esta evaluación |
| `blocking_exit_condition`    | condición verificable que permite levantar el bloqueo                                   |

No se reutilizará por semejanza una referencia perteneciente a otro paquete, candidato, ambiente, cohorte, definición, fuente, ventana o alcance cuando esas diferencias sean materiales.

---

#### 7. Registro mínimo por indicador o estado

Cada elemento cuantitativo o cualitativo deberá conservar, según aplique:

- identificador estable;
- nombre y significado técnico u operativo;
- unidad de medida;
- fuente autoritativa;
- referencia o versión de la consulta, extracción, cálculo o instrumento;
- numerador y denominador para tasas, porcentajes o proporciones;
- filtros, inclusiones y exclusiones;
- regla de agregación;
- dimensiones o segmentos relevantes;
- regla de muestreo cuando exista;
- ventana temporal;
- cobertura;
- frescura;
- valor, distribución, estado o clasificación obtenidos;
- condición de calidad de la captura;
- anomalías o limitaciones materiales;
- eventos extraordinarios ocurridos durante la ventana;
- factores de confusión materiales;
- referencia a evidencia suficiente para auditar el resultado.

No será suficiente registrar únicamente un número final sin conservar la semántica y el alcance que permiten reproducirlo o compararlo.

---

#### 8. Condiciones de calidad de la captura

La captura deberá distinguir explícitamente, sin equivalencias implícitas:

| Condición           | Semántica                                                                                                      |
| ------------------- | -------------------------------------------------------------------------------------------------------------- |
| `VALIDO`            | satisface identidad, fuente, ventana, cobertura, integridad y comparabilidad requeridas                        |
| `CERO_MEDIDO`       | la fuente autoritativa fue consultada correctamente y el valor observado fue realmente cero                    |
| `SIN_OBSERVACIONES` | el elemento es aplicable, pero la ventana no contiene observaciones suficientes para el uso previsto           |
| `NO_DISPONIBLE`     | la fuente, historia, extracción o acceso no pudo producir un dato confiable                                    |
| `PROVISIONAL`       | existe captura, pero conserva una limitación explícita de cobertura, frescura o completitud                    |
| `RECONSTRUIDA`      | la referencia fue producida posteriormente desde historia autoritativa y está identificada como reconstrucción |
| `NO_APLICA`         | el elemento no corresponde al paquete o al diseño del piloto conforme al contrato aplicable                    |

Reglas:

1. un dato ausente nunca se transforma en cero;
2. `CERO_MEDIDO` exige una consulta válida de la fuente;
3. `SIN_OBSERVACIONES` no equivale a `CERO_MEDIDO`;
4. `NO_DISPONIBLE` no equivale a `NO_APLICA`;
5. `PROVISIONAL` no equivale a definitivo;
6. `RECONSTRUIDA` no se presenta como captura original;
7. `NO_APLICA` exige justificación basada en alcance;
8. la condición de calidad no sustituye el resultado del gate.

---

#### 9. Estados previos no numéricos

Cuando la interpretación del piloto dependa de condiciones que no sean una métrica escalar, la línea base deberá preservar la referencia previa correspondiente.

Podrán incluir, según el paquete:

- backlog, colas o trabajos pendientes;
- operaciones con resultado pendiente o desconocido;
- incidentes, problemas, cambios o degradaciones abiertas;
- configuración o estado funcional relevante, sin copiar secretos;
- membresía efectiva de cohortes o poblaciones;
- versión o referencia de datos utilizados para el piloto;
- estado de integraciones o dependencias externas;
- estado de dispositivos, red o periféricos;
- disponibilidad o salud previa de servicios;
- condiciones operativas excepcionales vigentes antes del piloto.

Estos estados deberán referenciar su sistema propietario y no crear una segunda fuente de verdad.

La evidencia de línea base podrá fijar una referencia, instantánea controlada o identificador de versión, pero no sustituirá al sistema canónico que gobierna el dato.

---

#### 10. Método temporal de captura

La ventana de línea base deberá terminar antes de la primera exposición del piloto capaz de modificar directa o indirectamente el indicador o estado que se pretende comparar.

La duración de la ventana no será un número universal.

Deberá justificarse según:

- comportamiento y frecuencia del indicador;
- ciclo operativo o de negocio;
- volumen mínimo necesario para una comparación útil;
- variabilidad conocida;
- criterio de aceptación que utilizará la referencia;
- estacionalidad, calendario o periodicidad material;
- disponibilidad histórica de la fuente.

La captura deberá registrar cualquier evento material dentro de la ventana, como:

- mantenimientos;
- cierres;
- festivos;
- campañas;
- incidentes;
- cambios de volumen;
- degradaciones;
- cambios de configuración;
- condiciones extraordinarias.

No se permitirá ampliar, reducir o desplazar retrospectivamente la ventana después de observar resultados para obtener una referencia más favorable.

---

#### 11. Corte previo a exposición y contaminación

Se considera contaminada una línea base cuando incorpora observaciones producidas después de que una persona, cohorte, sede, dispositivo, integración o proceso haya sido expuesto al candidato o a una intervención del piloto capaz de alterar el resultado.

La evidencia deberá conservar:

- fecha y hora del corte;
- zona horaria;
- primera exposición aplicable;
- identidad de la cohorte o segmento;
- método para separar expuestos de no expuestos cuando el rollout sea progresivo.

Una cohorte expuesta no podrá seguir alimentando su propia línea base prepiloto.

Si distintas cohortes inician en momentos diferentes, cada referencia deberá permanecer atribuible:

- al corte específico de la cohorte; o
- a una referencia común capturada antes de la primera exposición, únicamente cuando el diseño aprobado lo permita.

Una referencia contaminada conocida no puede producir `PASS`.

---

#### 12. Cambios que obligan a recapturar o versionar

Antes de la exposición, la línea base deberá recapturarse o declararse sustituida cuando ocurra un cambio material que invalide su comparabilidad.

Incluye, cuando aplique:

- cambio del candidato o versión que altera el comportamiento observado;
- cambio de ambiente;
- modificación del alcance funcional o técnico;
- modificación material de sede, población o cohorte;
- cambio de definición, unidad, denominador, filtro, agregación o fuente;
- cambio de configuración que altere el comportamiento de referencia;
- modificación material de una dependencia;
- corrección de datos que cambie de forma relevante el valor previo;
- cambio del diseño de piloto;
- cambio del criterio de aceptación;
- cambio del método de segmentación;
- cambio de la regla de muestreo.

Después de iniciada la exposición, la línea base original deberá quedar congelada.

Una corrección posterior solo podrá incorporarse mediante una versión sucesora o una reconstrucción identificada, preservando:

- referencia original;
- motivo;
- método;
- responsable;
- fecha;
- evidencia;
- impacto sobre comparabilidad.

No se permitirá editar retrospectivamente la línea base original para hacerla coincidir con el resultado observado.

---

#### 13. Reconstrucción y backfill

Cuando no exista captura original suficiente y sea técnicamente posible reconstruir una referencia histórica desde fuentes autoritativas, la evidencia deberá identificarla expresamente como `RECONSTRUIDA`.

Una reconstrucción deberá conservar:

- fuente utilizada;
- período reconstruido;
- fecha de reconstrucción;
- método y versión de cálculo;
- diferencias frente al método que habría sido usado en tiempo real;
- datos faltantes;
- supuestos;
- limitaciones;
- responsable;
- evidencia de reproducibilidad;
- impacto sobre comparabilidad;
- impacto sobre el criterio de aceptación.

Reglas:

1. una línea base reconstruida nunca se presenta como captura original;
2. la reconstrucción no puede utilizar telemetría contaminada por el piloto para fabricar una referencia previa;
3. una estimación informal no sustituye una reconstrucción reproducible;
4. si la reconstrucción preserva de manera demostrable la semántica y comparabilidad exigidas, puede participar en un `PASS`;
5. si existe evidencia suficiente de que la reconstrucción es materialmente no comparable, produce `FAIL`;
6. si todavía no puede demostrarse su validez por falta de fuente, método, historia o evidencia, produce `BLOQUEADO`.

---

#### 14. Comparabilidad obligatoria

Una comparación válida entre línea base y piloto exige preservar, salvo transformación explícitamente documentada y aprobada:

- definición del indicador;
- unidad;
- fuente o semántica equivalente demostrable;
- población y denominador;
- filtros;
- agregación;
- dimensiones relevantes;
- ventana o regla temporal comparable;
- método de cálculo;
- tratamiento de datos faltantes;
- estado de exposición de la cohorte;
- regla de muestreo;
- tratamiento de valores extremos cuando sea material.

Si la definición cambia durante el piloto, deberá existir una regla de mapeo o normalización que permita demostrar equivalencia.

Sin esa demostración:

- la comparación directa queda invalidada;
- deberá utilizarse una nueva referencia válida cuando todavía sea posible; o
- el elemento quedará `BLOQUEADO` o `FAIL` conforme a la evidencia disponible.

Un delta entre dos valores no prueba causalidad.

La evaluación deberá conservar factores de confusión materiales, como:

- incidentes previos;
- diferencias de volumen;
- cambios de configuración;
- dependencia degradada;
- estacionalidad;
- cambios de población;
- campañas;
- cierres;
- cambios de dispositivo o canal.

---

#### 15. Segmentación y cobertura

La línea base deberá cubrir el mismo universo sobre el que se pretende afirmar un resultado del piloto o una segmentación suficientemente equivalente y explícita.

No se permitirá:

- extrapolar una sede a todas las sedes sin regla aprobada;
- extrapolar una cohorte a toda la población cuando existan diferencias materiales;
- mezclar segmentos con comportamientos distintos hasta ocultar un deterioro relevante;
- declarar cobertura completa a partir de una muestra sin justificar el método;
- comparar un agregado prepiloto con un segmento pospiloto como si fueran equivalentes;
- eliminar segmentos después de observar un resultado desfavorable.

Cuando una métrica deba segmentarse por sede, dispositivo, rol, cohorte, canal u otra dimensión prevista por `DELIV-PKG-017` o `DELIV-PKG-022`, la línea base deberá conservar esa dimensión con cardinalidad y tratamiento compatibles con el contrato aprobado.

---

#### 16. Evidencia aceptable

Podrán participar como evidencia, cuando correspondan al elemento exacto evaluado:

- manifiesto versionado de línea base;
- exportación controlada y fechada de una fuente autoritativa;
- instantánea de panel o reporte vinculada a métrica, fuente y ventana;
- definición o referencia versionada de la consulta o extracción;
- referencia a evidencia bruta controlada cuando sea necesaria para reproducibilidad;
- instantánea controlada de alcance, cohorte o población;
- registro previo de backlog, colas o pendientes;
- evidencia prepiloto de SLI, métricas o estados operativos;
- reporte que clasifique faltantes, provisionales y no aplicables;
- referencia a incidentes, cambios o condiciones preexistentes;
- evidencia de responsable, fecha y versión;
- referencia de configuración o versión cuando afecte la interpretación;
- evidencia de corte previo a exposición;
- evidencia de reconstrucción, cuando aplique.

La evidencia deberá permitir resolver identidad, alcance, tiempo, ambiente, definición, fuente, población, condición de calidad y resultado.

Una captura visual podrá formar parte de la evidencia, pero no será suficiente por sí sola si no permite identificar fuente, definición, alcance y ventana.

---

#### 17. Evidencia insuficiente por sí sola

No constituyen prueba suficiente de línea base, aisladamente:

- un número copiado manualmente sin fuente autoritativa;
- una captura sin métrica, definición, alcance o ventana identificables;
- un enlace mutable a un panel sin fijar corte o versión;
- una estimación basada en memoria;
- una reconstrucción posterior presentada como captura original;
- un dato sin asociación con paquete, ambiente, sede, cohorte o población cuando esas dimensiones sean materiales;
- la sustitución de un valor ausente por cero;
- un objetivo, SLO o umbral usado como si fuera observación previa;
- una muestra parcial extrapolada sin método;
- un agregado que oculte segmentos materialmente diferentes;
- un punto aislado cuando el criterio exige ventana, tendencia o distribución;
- un valor calculado con definición distinta sin mapeo explícito;
- telemetría emitida por el propio piloto después del corte presentada como referencia prepiloto;
- una referencia de otro candidato o ambiente;
- una afirmación manual de que “el comportamiento era normal”;
- ausencia de incidentes como sustituto de medición;
- datos cuya fuente o consulta no pueda reproducirse cuando la reproducibilidad sea obligatoria.

---

#### 18. Integridad, trazabilidad y reproducibilidad

La evidencia deberá permitir a un revisor autorizado reconstruir cómo se obtuvo la línea base sin depender de conocimiento tácito.

Como mínimo deberá poder reconstruirse:

```text
package_id
→ baseline_set_version
→ baseline_element_id
→ candidato
→ piloto/rollout
→ definición
→ fuente
→ población/cohorte
→ ventana
→ corte
→ condición de calidad
→ resultado
→ evidencia
```

Cuando la captura provenga de una consulta, script, panel o transformación versionable, deberá conservarse una referencia estable a la versión utilizada.

Cuando la fuente sea externa y no permita versionado, deberá fijarse al menos:

- identificador disponible;
- ventana;
- parámetros;
- fecha de extracción;
- origen;
- evidencia suficiente para reconstruir la operación.

La corrección de una línea base deberá preservar historial.

No se admitirán sobrescrituras silenciosas de evidencias ya utilizadas para una decisión de readiness.

---

#### 19. Seguridad, privacidad y minimización

La captura de línea base no autoriza ampliar acceso ni copiar información sensible fuera de sus repositorios o sistemas propietarios.

Deberán aplicarse, según corresponda:

- minimización de datos personales;
- agregación o desidentificación cuando el detalle individual no sea necesario;
- control de acceso a evidencia sensible;
- exclusión de secretos, tokens, credenciales y claves;
- referencia a datos canónicos en lugar de duplicación cuando la copia no sea necesaria;
- preservación de clasificación;
- preservación de retención;
- preservación de auditoría;
- segregación entre evidencia de medición y valores secretos de configuración.

Una necesidad analítica de comparación no convierte datos restringidos en datos de libre uso.

---

#### 20. Traducción determinista de condición de captura a resultado

La condición de calidad y el resultado del gate se mantienen separados.

La decisión se resolverá con estas reglas:

| Condición observada                                                                                                                     | Resultado permitido                                                              |
| --------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------- |
| `VALIDO` y cumple identidad, corte, cobertura, integridad y comparabilidad exigidas                                                     | `PASS`                                                                           |
| `CERO_MEDIDO` y el cero fue medido correctamente con la misma semántica exigida                                                         | `PASS`                                                                           |
| `SIN_OBSERVACIONES` y la comparación necesita observaciones históricas suficientes                                                      | `BLOQUEADO`, salvo que exista evidencia de incumplimiento material ya demostrada |
| `NO_DISPONIBLE` por fuente, historia, dependencia o acceso todavía no resoluble                                                         | `BLOQUEADO`                                                                      |
| `NO_DISPONIBLE` cuando la obligación exigía conservar la información y existe evidencia suficiente de pérdida o incumplimiento material | `FAIL`                                                                           |
| `PROVISIONAL` expresamente permitido por el contrato y sin impacto material sobre comparabilidad                                        | `PASS`                                                                           |
| `PROVISIONAL` con limitación todavía no resuelta y sin evidencia suficiente para declarar incumplimiento                                | `BLOQUEADO`                                                                      |
| `PROVISIONAL` con limitación conocida que invalida el uso previsto                                                                      | `FAIL`                                                                           |
| `RECONSTRUIDA` reproducible y materialmente comparable conforme al contrato                                                             | `PASS`                                                                           |
| `RECONSTRUIDA` cuya no comparabilidad está demostrada                                                                                   | `FAIL`                                                                           |
| `RECONSTRUIDA` cuya comparabilidad todavía no puede demostrarse                                                                         | `BLOQUEADO`                                                                      |
| `NO_APLICA` sustentado por el alcance aprobado                                                                                          | `NO_APLICA`                                                                      |
| referencia contaminada por exposición                                                                                                   | `FAIL`                                                                           |
| referencia perteneciente a otro candidato, ambiente, población o definición materialmente distinta                                      | `FAIL`                                                                           |
| identidad o pertenencia todavía no demostrable                                                                                          | `BLOQUEADO`                                                                      |

Reglas adicionales:

1. una falta de evidencia nunca produce `PASS`;
2. una falta de evidencia nunca produce `NO_APLICA`;
3. un `FAIL` no se rebaja a `BLOQUEADO` cuando ya existe evidencia suficiente del incumplimiento;
4. un `BLOQUEADO` no se eleva a `PASS` por presión de calendario;
5. una captura provisional no se presenta como definitiva;
6. una reconstrucción válida debe seguir identificada como reconstruida aunque alcance `PASS`;
7. un valor desfavorable puede alcanzar `PASS` si la línea base fue capturada correctamente; el gate evalúa aptitud de la referencia, no si el valor es bueno;
8. la aceptación o rechazo del valor observado corresponde al contrato de piloto y no a esta puerta.

---

#### 21. Condiciones de `FAIL`

Producen `FAIL`, entre otras condiciones materiales aplicables:

1. referencia contaminada por exposición del piloto;
2. uso de datos de otro candidato, release, ambiente, sede, cohorte o población como si fueran la referencia actual;
3. fuente conocida como no autoritativa utilizada para sustituir la fuente exigida;
4. definición, unidad, denominador, filtro o agregación materialmente incompatibles con el uso previsto;
5. ventana manipulada después de observar resultados;
6. población o cohorte materialmente incompatible presentada como equivalente;
7. evidencia suficiente de que la captura perdió datos que el contrato obligaba a preservar;
8. reconstrucción demostrablemente no comparable;
9. sustitución de ausencia por cero;
10. exclusión posterior de un segmento para ocultar un resultado desfavorable;
11. agregado que oculta un deterioro material cuando el contrato exige segmentación;
12. sobrescritura silenciosa de una baseline ya utilizada para readiness;
13. evidencia cuyo corte real ocurre después de la exposición aplicable;
14. muestra presentada como cobertura total sin regla de muestreo o equivalencia válida;
15. referencia cuyo cálculo no puede reproducir el valor declarado y la discrepancia está demostrada;
16. manifiesto que atribuye a `PASS` un elemento con condición conocida que invalida comparabilidad;
17. reducción deliberada de `required_baseline_set` después de observar resultados;
18. evidencia que expone información restringida fuera del alcance autorizado cuando esa exposición forma parte del artefacto evaluado;
19. cualquier otra condición en la que exista evidencia suficiente de incumplimiento material del contrato de baseline.

---

#### 22. Condiciones de `BLOQUEADO`

Producen `BLOQUEADO`, entre otras condiciones aplicables:

1. fuente autoritativa necesaria todavía inaccesible;
2. historia suficiente no disponible y aún no se ha demostrado pérdida definitiva;
3. definición o versión de la métrica todavía no resoluble;
4. identidad del candidato, ambiente, cohorte o población ambigua;
5. denominador obligatorio no disponible;
6. ventana mínima necesaria todavía no completada;
7. volumen u observaciones insuficientes para el uso previsto;
8. dependencia necesaria para capturar o interpretar la referencia no disponible;
9. comparación semántica todavía no demostrable;
10. regla de equivalencia o normalización pendiente;
11. reconstrucción posible pero aún no ejecutada o no validada;
12. referencia provisional cuya limitación necesita resolución;
13. evidencia incompleta o sin correlación suficiente;
14. población o cohorte todavía no materializada con identidad verificable;
15. corte temporal no demostrable;
16. factor de confusión material pendiente de caracterización cuando impida interpretar la referencia;
17. autorización necesaria para acceder a la fuente todavía no disponible;
18. `required_baseline_set` con faltantes, duplicados o referencias irresolubles que impidan asegurar completitud;
19. cualquier situación en la que todavía no exista evidencia suficiente para decidir `PASS` o `FAIL` sin falsear el resultado.

`BLOQUEADO` conserva explícitamente la razón y el camino de resolución; no es una categoría genérica de pendiente.

---

#### 23. Handoff obligatorio de todo bloqueo

Cada elemento `BLOQUEADO` deberá conservar:

- `baseline_element_id`;
- bloqueo concreto;
- insumo faltante;
- fuente o dependencia afectada;
- propietario;
- tarea o contrato responsable;
- condición exacta de salida;
- evidencia necesaria para levantarlo;
- impacto sobre la comparabilidad;
- impacto sobre el resultado agregado;
- fecha o condición de revisión cuando exista una vigencia aplicable.

No se admiten pendientes expresados únicamente como:

- “por definir”;
- “pendiente”;
- “revisar después”;
- “falta información”;
- “TBD”.

Si la causa pertenece a otra tarea o autoridad, el handoff deberá referenciarla sin transferirle el resultado principal de `READY-GATE-013`.

---

#### 24. Reconciliación cuantitativa y resultado agregado

Antes de calcular el resultado del paquete deberá demostrarse:

```text
TOTAL_ESPERADO
= TOTAL_PASS
+ TOTAL_FAIL
+ TOTAL_BLOQUEADO
+ TOTAL_NO_APLICA
```

Y además:

```text
FALTANTES = 0
DUPLICADOS = 0
IDENTIFICADORES_NO_RESOLUBLES = 0
```

Reglas de integridad:

1. `TOTAL_ESPERADO` se deriva de la versión congelada de `required_baseline_set`;
2. ningún elemento se omite por falta de evidencia;
3. ningún elemento aparece más de una vez;
4. un elemento con múltiples evidencias conserva una sola decisión;
5. un `NO_APLICA` exige justificación;
6. una discrepancia de conteos no se ignora;
7. faltantes o duplicados todavía no resueltos producen `BLOQUEADO`;
8. una reducción del universo ya demostrada como manipulación posterior a resultados produce `FAIL`.

La decisión `READY-GATE-013::<package_id>` se calcula de forma estricta:

```text
SI EXISTE AL MENOS UN FAIL
→ PACKAGE_RESULT = FAIL

SI NO EXISTE FAIL Y EXISTE AL MENOS UN BLOQUEADO
→ PACKAGE_RESULT = BLOQUEADO

SI NO EXISTE FAIL NI BLOQUEADO
Y TODOS LOS ELEMENTOS APLICABLES SON PASS
Y TODO NO_APLICA ESTÁ JUSTIFICADO
Y LA RECONCILIACIÓN DE COMPLETITUD ES EXACTA
→ PACKAGE_RESULT = PASS
```

Un `NO_APLICA` a nivel de paquete solo será admisible cuando el diseño aprobado no contenga ningún criterio de aceptación, estado operativo, población, dependencia o indicador que requiera referencia previa.

No se promedian resultados y no se compensa un elemento inválido con múltiples referencias correctas.

---

#### 25. Manifiesto futuro de evidencia

La ejecución de `SHELL-CI-021::<package_id>` deberá poder producir `baseline_manifest::<package_id>` con, como mínimo:

- `package_id`;
- `candidate_ref`;
- `environment_ref`;
- `pilot_or_rollout_ref`;
- `baseline_set_version`;
- fecha de generación;
- fecha y hora de corte;
- zona horaria;
- alcance funcional y técnico;
- sedes;
- poblaciones y cohortes;
- `total_expected`;
- `total_materialized`;
- `total_pass`;
- `total_fail`;
- `total_blocked`;
- `total_not_applicable`;
- `missing_count`;
- `duplicate_count`;
- `unresolved_reference_count`;
- lista completa de `baseline_element_id`;
- fuente contractual de cada elemento;
- definición o estado capturado;
- ventana;
- fuente autoritativa;
- condición de calidad;
- evidencia utilizada;
- condición de reconstrucción cuando aplique;
- supersesión o recaptura cuando aplique;
- factores de confusión materiales;
- resultado de comparabilidad;
- motivo exacto de cada `FAIL`, `BLOQUEADO` o `NO_APLICA`;
- propietario y condición de salida de cada bloqueo;
- actor o proceso que materializó la captura;
- actor o proceso que validó la evidencia cuando corresponda;
- resultado agregado del paquete.

El manifiesto referencia evidencia; no copia secretos, credenciales, dumps completos ni datos personales innecesarios.

La ausencia de un elemento esperado en el manifiesto no se interpreta como no aplicabilidad.

---

#### 26. Consumo por `SHELL-CI-021`

Durante la ejecución futura del checklist de readiness, `SHELL-CI-021` deberá verificar, por cada paquete candidato a piloto:

1. que `required_baseline_set` fue derivado antes de evaluar resultados;
2. que la versión del conjunto está congelada para la decisión;
3. que el corte ocurrió antes de la exposición aplicable;
4. que la identidad de candidato, ambiente, alcance y cohorte es inequívoca;
5. que cada indicador conserva definición, fuente, ventana y evidencia;
6. que cero, ausencia, no disponibilidad, no aplicabilidad, provisionalidad y reconstrucción están diferenciados;
7. que los estados previos no numéricos relevantes fueron preservados;
8. que la comparación prevista con el piloto es semántica y temporalmente válida;
9. que los factores de confusión materiales están identificados;
10. que cualquier reconstrucción o supersesión está declarada y versionada;
11. que cada elemento tiene exactamente un resultado permitido;
12. que cada bloqueo posee propietario y condición de salida;
13. que la reconciliación cuantitativa es exacta;
14. que no existen faltantes, duplicados o referencias irresolubles;
15. que el resultado agregado se calcula sin excepciones implícitas;
16. que `baseline_manifest` conserva la evidencia necesaria;
17. que la evidencia puede ser auditada sin depender de conocimiento tácito.

`SHELL-CI-021` no deberá reinterpretar una falta de baseline como aprobación tácita.

Cuando la referencia necesaria no pueda obtenerse de manera válida, deberá conservar el bloqueo o fallo correspondiente.

---

#### 27. Condiciones que no resuelve esta tarea

`READY-GATE-013` no:

- define nuevos SLI, SLO, métricas o alertas;
- modifica umbrales de aceptación;
- decide qué riesgos pueden aceptarse;
- autoriza una condición de suspensión;
- declara que soporte, monitoreo, respaldo o rollback estén disponibles;
- ejecuta el piloto;
- atribuye causalidad a cambios observados;
- autoriza despliegues;
- autoriza accesos privilegiados;
- cambia configuración;
- ejecuta migraciones;
- ejecuta DDL/DML;
- ejecuta backfills;
- sustituye evidencia de pruebas funcionales o no funcionales;
- convierte una fuente analítica en fuente de verdad operativa;
- crea datos productivos;
- modifica Supabase.

Su alcance termina en definir de forma consumible cuándo una referencia previa puede considerarse apta para una comparación posterior controlada.

---

#### 28. Requisitos de prueba derivados

**Resultado:** NO GENERA REQUISITOS DE PRUEBA

**Justificación:** `READY-GATE-013` especializa en una puerta documental la forma de derivar, capturar, evidenciar, reconciliar y decidir referencias previas para comportamientos, métricas, estados y criterios que ya pertenecen a contratos funcionales, no funcionales, de observabilidad, rollout y piloto. La ampliación materializa el contrato consumible por `SHELL-CI-021`, pero no introduce una nueva conducta ejecutable del producto ni modifica la semántica de los requisitos de prueba existentes.

**Requisitos creados:** 0  
**Requisitos modificados:** 0  
**Fragmentos 04A afectados:** 0

---

#### 29. Criterios de aceptación

`READY-GATE-013` queda documentalmente completa cuando:

1. separa línea base de objetivo, umbral, telemetría, resultado y causalidad;
2. define `required_baseline_set::<package_id>` como universo obligatorio previo a resultados;
3. establece identidad estable y única por elemento;
4. obliga a conservar fuente contractual de cada referencia;
5. define los campos mínimos de identidad, ventana, corte, población, fuente, evidencia y bloqueo;
6. conserva semántica, unidad, cálculo, filtros, agregación y dimensiones;
7. conserva numerador y denominador cuando corresponda;
8. distingue `VALIDO`, `CERO_MEDIDO`, `SIN_OBSERVACIONES`, `NO_DISPONIBLE`, `PROVISIONAL`, `RECONSTRUIDA` y `NO_APLICA`;
9. define la traducción determinista entre condición de captura y resultado del gate;
10. impide convertir ausencia en cero;
11. impide convertir falta de datos en `NO_APLICA`;
12. preserva estados previos no numéricos;
13. exige corte previo a exposición;
14. define contaminación;
15. define cambios que obligan a recapturar o versionar;
16. congela la referencia después de la exposición;
17. obliga a preservar historial de supersesiones;
18. identifica reconstrucciones y sus limitaciones;
19. permite `PASS` de una reconstrucción solo cuando su comparabilidad está demostrada;
20. exige comparabilidad semántica, temporal y poblacional;
21. conserva segmentación material;
22. registra factores de confusión;
23. define evidencia aceptable;
24. define evidencia insuficiente;
25. exige trazabilidad y reproducibilidad;
26. protege seguridad, privacidad y minimización;
27. define condiciones explícitas de `FAIL`;
28. define condiciones explícitas de `BLOQUEADO`;
29. exige propietario, tarea responsable y condición de salida para cada bloqueo;
30. obliga a reconciliar `TOTAL_ESPERADO` contra los cuatro resultados permitidos;
31. exige cero faltantes, cero duplicados y cero identificadores no resolubles para `PASS`;
32. impide promediar o compensar resultados;
33. define `baseline_manifest::<package_id>`;
34. exige que el manifiesto incluya el universo completo y conteos de integridad;
35. identifica `SHELL-CI-021` como consumidor posterior;
36. mantiene separadas `READY-GATE-014` y `READY-GATE-015`;
37. no ejecuta piloto, despliegues, migraciones, DDL/DML, backfills, cambios físicos ni operaciones sobre Supabase;
38. crea cero requisitos de prueba y modifica cero requisitos existentes;
39. mantiene `READY-GATE-014` únicamente reservada.

---

#### 30. Estado del resultado documental

| Resultado                                  | Estado                                                                                  |
| ------------------------------------------ | --------------------------------------------------------------------------------------- |
| definición de línea base                   | `ESPECIFICADO`                                                                          |
| `required_baseline_set::<package_id>`      | `ESPECIFICADO` como contrato; su población real corresponde a cada paquete implementado |
| contrato de identidad por elemento         | `ESPECIFICADO`                                                                          |
| contrato de captura por indicador o estado | `ESPECIFICADO`                                                                          |
| condiciones de calidad                     | `ESPECIFICADO`                                                                          |
| traducción condición → resultado           | `ESPECIFICADO`                                                                          |
| condiciones de `FAIL`                      | `ESPECIFICADO`                                                                          |
| condiciones de `BLOQUEADO`                 | `ESPECIFICADO`                                                                          |
| handoff obligatorio de bloqueos            | `ESPECIFICADO`                                                                          |
| reconciliación cuantitativa                | `ESPECIFICADO`                                                                          |
| cálculo agregado                           | `ESPECIFICADO`                                                                          |
| `baseline_manifest::<package_id>`          | `ESPECIFICADO`                                                                          |
| captura real de línea base                 | `PENDIENTE_DE_EVIDENCIA` hasta la ejecución autorizada de cada paquete                  |
| valores reales de métricas o estados       | `PENDIENTE_DE_EVIDENCIA`                                                                |
| ejecución del piloto                       | `FUERA_DE_ALCANCE`                                                                      |
| resultado del piloto                       | `FUERA_DE_ALCANCE`                                                                      |
| aceptación de riesgos                      | `FUERA_DE_ALCANCE` de esta tarea; corresponde a `READY-GATE-014`                        |
| autorización final de entrada              | `FUERA_DE_ALCANCE` de esta tarea; corresponde a `READY-GATE-015`                        |

La especificación documental no se presenta como captura ejecutada ni como evidencia operativa real.

---

#### 31. Secuencia preservada

La tarea conserva la secuencia operativa aprobada por paquete:

```text
E5-GATE-008::<package_id>
→ SHELL-CI-020::<package_id>
→ BLOQUE R Y TAREAS FÍSICAS APLICABLES
→ SHELL-CI-021::<package_id>
→ SHELL-CI-022::<package_id>
```

`READY-GATE-013` diseña una de las comprobaciones que consumirá `SHELL-CI-021`.

No adelanta cutover, piloto, hypercare, aceptación de riesgos ni cierre.

---

#### 32. Continuidad

ÚLTIMA TAREA APROBADA
`READY-GATE-012 — Definir criterio y evidencia para confirmar respaldo y rollback probados`

TAREA ACTUAL APROBADA
`READY-GATE-013 — Definir método y evidencia para capturar la línea base previa al piloto`

SIGUIENTE TAREA RESERVADA
`READY-GATE-014 — Definir registro de riesgos aceptados y condiciones de suspensión`


### ✅ READY-GATE-014 — Definir registro de riesgos aceptados y condiciones de suspensión

**Estado:** APROBADA  
**Tarea anterior:** `READY-GATE-013 — Definir método y evidencia para capturar la línea base previa al piloto` — APROBADA  
**Tarea siguiente:** `READY-GATE-015 — Definir autoridad y criterio para aprobar la entrada al piloto operativo` — RESERVADA  
**Tipo de tarea:** documental — definición normativa y materialización del contrato de readiness por paquete para identificar, disponer, aceptar de forma acotada y auditable riesgos residuales, y para declarar las condiciones que invalidan su aceptación y obligan a suspender o reevaluar la exposición antes de continuar; sin ejecutar piloto, cutover, reversión, despliegues, migraciones, DDL/DML, backfills, cambios físicos, configuración productiva ni operaciones sobre Supabase.  
**Repositorio propietario:** `devVentoGroup/vento-shell`

---

#### 1. Resultado sustantivo

`READY-GATE-014` define la evaluación futura `READY-GATE-014::<package_id>` que deberá consumir `SHELL-CI-021::<package_id>` después de la implementación física autorizada y antes de que `READY-GATE-015` pueda decidir la entrada al piloto.

El resultado documental queda materializado mediante cuatro piezas obligatorias y separadas:

1. `required_risk_review_set::<package_id>` — universo exhaustivo de riesgos, limitaciones y condiciones que deben recibir una disposición explícita antes del piloto;
2. `accepted_risk_register::<package_id>` — subconjunto de riesgos residuales cuya aceptación está vigente, acotada, autorizada, evidenciada y vinculada con condiciones de pérdida de validez;
3. `suspension_condition_set::<package_id>` — conjunto de condiciones observables o eventos verificables que obligan a suspender la exposición o a impedir su continuación hasta una reevaluación autorizada;
4. `risk_readiness_manifest::<package_id>` — manifiesto futuro que reconcilia universo, disposiciones, aceptaciones, vigencias, condiciones de suspensión, propietarios, referencias y resultado agregado.

La aceptación de riesgo no es un mecanismo de excepción para convertir en aceptable un incumplimiento de una puerta previa. Un `FAIL` o `BLOQUEADO` obligatorio conserva su semántica y no puede transformarse en `PASS` mediante una firma, comentario, aprobación informal o registro de riesgo.

---

#### 2. Propósito

Definir el método canónico mediante el cual cada paquete candidato a piloto deberá demostrar, antes de la decisión final de entrada, que:

- los riesgos conocidos y aplicables fueron identificados desde fuentes canónicas;
- cada riesgo recibió una disposición explícita;
- toda aceptación residual tiene autoridad válida, alcance preciso, justificación, controles, vigencia y evidencia;
- la aceptación no contradice requisitos, puertas, restricciones o criterios obligatorios;
- ninguna limitación material quedó ocultada como supuesto, comentario o pendiente narrativo;
- cada riesgo aceptado conserva una condición verificable que determine cuándo deja de ser aceptable;
- las condiciones de suspensión pueden ser observadas mediante fuentes ya gobernadas;
- la pérdida de una fuente crítica para evaluar una condición no se interpreta como normalidad;
- la aceptación se invalida cuando cambian materialmente candidato, ambiente, alcance, controles o exposición;
- y `READY-GATE-015` recibe un expediente completo sin tener que inferir riesgo residual, autoridad o condiciones de suspensión.

Esta tarea diseña el gate. No acepta riesgos reales de un paquete todavía no ejecutado, no autoriza por sí misma la entrada al piloto y no ejecuta una suspensión.

---

#### 3. Invariantes de gobierno

Se adoptan las siguientes separaciones obligatorias:

```text
RIESGO IDENTIFICADO
≠ RIESGO ACEPTADO

RIESGO ACEPTADO
≠ INCUMPLIMIENTO PERDONADO

ACEPTACIÓN DE RIESGO
≠ PASS DE UNA PUERTA PREVIA

CONDICIÓN DE SUSPENSIÓN
≠ ALERTA

ALERTA
≠ INCIDENTE

SUSPENSIÓN
≠ ROLLBACK

SUSPENSIÓN
≠ CIERRE DEL PILOTO

ACEPTACIÓN DE RIESGO
≠ AUTORIZACIÓN FINAL DE ENTRADA AL PILOTO
```

Reglas:

1. aceptar riesgo no modifica la evidencia de origen;
2. aceptar riesgo no cambia el resultado de `READY-GATE-001..013`;
3. aceptar riesgo no cambia un requisito `TREQ-*`;
4. aceptar riesgo no modifica un criterio de aceptación;
5. aceptar riesgo no reduce el universo del piloto;
6. aceptar riesgo no autoriza acceso, migración, cambio de configuración o despliegue;
7. suspender no implica automáticamente rollback;
8. reanudar después de una suspensión exige reevaluación conforme al contrato aplicable;
9. continuar por ausencia de señal no es válido cuando la fuente necesaria está indisponible;
10. el silencio de un propietario o aprobador nunca equivale a aceptación.

---

#### 4. Entradas canónicas y frontera con contratos adyacentes

`READY-GATE-014` consume, sin redefinir su autoridad:

1. el dossier aprobado del paquete y sus dependencias;
2. el contrato de rollout y segmentación aplicable;
3. el diseño del piloto, población, cohortes, sedes, dispositivos, exclusiones y salvaguardas;
4. los criterios de aceptación y sus fuentes de evidencia;
5. `READY-GATE-001..013` y sus resultados por paquete;
6. `READY-GATE-008` para procedimientos, contingencias, handoff y suspensión segura;
7. `READY-GATE-010` para mesa de soporte, responsables y escalamiento;
8. `READY-GATE-011` para monitoreo, métricas, alertas y fuentes observables;
9. `READY-GATE-012` para respaldo, restauración y rollback probados;
10. `READY-GATE-013` para línea base previa al piloto y sus bloqueos o limitaciones;
11. requisitos `TREQ-*` aplicables cuyo estado o contrato exija justificación de riesgo, tarea responsable y puerta de resolución;
12. hallazgos, limitaciones, incidentes conocidos, dependencias externas y evidencias materializadas durante la implementación del paquete.

La frontera con las tareas posteriores permanece intacta:

- `READY-GATE-015` define la autoridad y el criterio final de entrada al piloto;
- `CUTOVER-OPS-006` definirá la mecánica operativa de pausa, reversión o continuación durante cutover y piloto;
- `CUTOVER-OPS-007` diseñará el registro operativo de incidentes, decisiones y cambios de alcance durante la ejecución;
- `SHELL-CI-022::<package_id>` ejecutará cutover y piloto conforme al plan aprobado.

`READY-GATE-014` prepara las condiciones y el expediente que esas tareas consumen; no ejecuta sus decisiones.

---

#### 5. Fuentes obligatorias del universo de revisión de riesgo

`required_risk_review_set::<package_id>` deberá derivarse, cuando aplique, de:

- limitaciones expresamente documentadas en el dossier del paquete;
- resultados `PASS` de puertas previas que conserven una limitación residual declarada;
- hallazgos conocidos que no constituyan un `FAIL` o `BLOQUEADO` obligatorio;
- dependencias externas o condiciones de terceros que permanezcan dentro del alcance autorizado;
- riesgos propios del rollout o de la segmentación seleccionada;
- riesgos de disponibilidad, rendimiento, datos, integraciones, seguridad, privacidad, autorización, hardware, red, operación, soporte, recuperación, observabilidad y adopción que ya estén documentados por sus contratos propietarios;
- desviaciones temporales expresamente permitidas por un contrato canónico;
- requisitos `TREQ-*` aplicables en estado `DIFERIDO` cuando su propia trazabilidad exija riesgo aceptado, tarea responsable y puerta de resolución;
- factores de confusión o limitaciones de baseline materializados por `READY-GATE-013`;
- condiciones conocidas de soporte, monitoreo, rollback o contingencia que permanezcan como riesgo residual sin invalidar su puerta propietaria;
- cambios de alcance aprobados que introduzcan una nueva exposición antes de la decisión final.

No se inventarán riesgos para completar categorías y no se eliminarán riesgos porque resulten incómodos para la decisión.

---

#### 6. Dimensiones mínimas de revisión

La revisión del universo deberá comprobar si existen riesgos materiales en las dimensiones que resulten aplicables al paquete:

- comportamiento funcional;
- autorización y acceso;
- seguridad y privacidad;
- integridad, consistencia o pérdida de datos;
- migración y compatibilidad;
- disponibilidad y rendimiento;
- integración y dependencia externa;
- observabilidad y capacidad de detección;
- respaldo, restauración y rollback;
- operación normal y contingencia;
- soporte y escalamiento;
- hardware, red y periféricos;
- población, cohorte, sede y alcance;
- adopción, capacitación y material de apoyo;
- línea base y calidad de la comparación;
- continuidad empresarial;
- exposición de terceros;
- cualquier otra dimensión material ya identificada por el expediente del paquete.

Estas dimensiones son un checklist de cobertura, no una taxonomía que sustituya clasificaciones propietarias existentes.

---

#### 7. Construcción obligatoria de `required_risk_review_set`

Antes de emitir el resultado de `READY-GATE-014::<package_id>` deberá construirse el universo de revisión.

Cada elemento deberá conservar, como mínimo y cuando aplique:

| Campo                           | Regla                                                                             |
| ------------------------------- | --------------------------------------------------------------------------------- |
| `package_id`                    | paquete exacto evaluado                                                           |
| `risk_review_set_version`       | versión inmutable del universo                                                    |
| `risk_id`                       | identidad estable del riesgo; se reutiliza la identidad propietaria cuando exista |
| `source_ref`                    | tarea, contrato, hallazgo, requisito o evidencia que origina el riesgo            |
| `candidate_ref`                 | candidato, release, revisión o artefacto al que aplica                            |
| `environment_ref`               | ambiente exacto                                                                   |
| `scope_ref`                     | capacidad, proceso, sede, cohorte, población, dispositivo o integración afectada  |
| `risk_statement`                | condición incierta y consecuencia material claramente separadas                   |
| `cause_or_driver`               | causa, dependencia o factor que produce la exposición                             |
| `affected_objective_or_control` | objetivo, criterio o control que podría verse afectado                            |
| `existing_controls`             | controles ya existentes y realmente disponibles                                   |
| `residual_condition`            | exposición que permanece después de controles                                     |
| `assessment_method_ref`         | método o escala propietaria utilizada, cuando exista                              |
| `assessment_result`             | resultado de valoración sin inventar una escala universal                         |
| `disposition`                   | `ACEPTADO`, `CERRADO`, `BLOQUEADO` o `NO_APLICA`                                  |
| `disposition_evidence_ref`      | evidencia que soporta la disposición                                              |
| `owner_ref`                     | propietario de seguimiento                                                        |
| `blocking_task_ref`             | tarea responsable cuando la disposición sea `BLOQUEADO`                           |
| `blocking_exit_condition`       | condición exacta de salida del bloqueo                                            |

Cada riesgo esperado deberá aparecer exactamente una vez.

---

#### 8. Disposiciones permitidas del universo

Cada elemento de `required_risk_review_set` recibirá exactamente una disposición:

| Disposición | Semántica                                                                                                                                        |
| ----------- | ------------------------------------------------------------------------------------------------------------------------------------------------ |
| `ACEPTADO`  | existe riesgo residual real, permitido por el contrato, y la aceptación cumple íntegramente esta tarea                                           |
| `CERRADO`   | la condición fue eliminada, mitigada o resuelta antes de la entrada y ya no requiere aceptación residual                                         |
| `BLOQUEADO` | no puede aceptarse todavía porque falta resolución, autoridad, evidencia, control o porque la condición no es admisible bajo el contrato vigente |
| `NO_APLICA` | el riesgo candidato no corresponde al paquete o alcance evaluado y existe evidencia trazable                                                     |

Reglas:

1. `CERRADO` exige evidencia de cierre; no basta con declarar mitigación planificada;
2. `ACEPTADO` exige entrada correspondiente en `accepted_risk_register`;
3. `BLOQUEADO` exige propietario, tarea responsable y condición de salida;
4. `NO_APLICA` exige justificación basada en alcance;
5. una aceptación expirada o revocada se trata como `BLOQUEADO` hasta nueva disposición válida;
6. la ausencia de disposición impide `PASS`;
7. una condición cuya materialización ya ocurrió y constituye defecto, incidente o incumplimiento no se transforma retrospectivamente en riesgo incierto.

---

#### 9. Condiciones de admisibilidad de una aceptación

Un riesgo residual solo podrá tener disposición `ACEPTADO` cuando todas las siguientes condiciones sean verdaderas:

1. el riesgo existe en `required_risk_review_set`;
2. el riesgo no representa un `FAIL` o `BLOQUEADO` obligatorio de una puerta previa;
3. su aceptación no contradice un requisito, autorización, restricción, criterio o política canónica obligatoria;
4. el alcance exacto está identificado;
5. el candidato y ambiente están identificados;
6. la exposición residual está descrita sin ocultar su consecuencia;
7. los controles existentes están realmente disponibles;
8. existe propietario;
9. existe autoridad válida para aceptar ese tipo y alcance de riesgo;
10. la decisión de aceptación tiene evidencia;
11. la aceptación tiene inicio de vigencia;
12. tiene fecha límite o condición explícita de expiración/salida;
13. define qué cambio obliga a revalidarla;
14. tiene al menos una condición que invalida la continuación o exige reevaluación;
15. esa condición puede observarse o verificarse con evidencia gobernada;
16. no requiere una excepción silenciosa de seguridad, privacidad, autorización, integridad o cumplimiento;
17. no depende de una promesa sin tarea responsable;
18. no pretende sustituir una corrección obligatoria.

Si cualquiera de estas condiciones falta, la aceptación no es válida.

---

#### 10. Prohibición de usar riesgo como waiver de readiness

Queda prohibido utilizar `accepted_risk_register` para:

- cambiar un `FAIL` previo a `PASS`;
- cambiar un `BLOQUEADO` previo a `PASS`;
- declarar `NO_APLICA` un control obligatorio;
- ignorar evidencia faltante;
- ignorar una identidad no resuelta;
- ignorar una migración no validada;
- ignorar una credencial o integración no lista;
- ignorar una condición de autorización;
- ignorar una prueba obligatoria no ejecutada;
- ignorar un rollback no probado;
- ignorar monitoreo obligatorio no disponible;
- sustituir soporte requerido;
- reducir un criterio de aceptación;
- diferir un requisito sin tarea y puerta de resolución;
- ampliar la cohorte autorizada;
- extender una aceptación de otro paquete, ambiente o candidato.

Una aceptación que intente producir cualquiera de esos efectos es inválida y constituye `FAIL` de esta puerta.

---

#### 11. Contrato de `accepted_risk_register::<package_id>`

Cada riesgo aceptado deberá conservar:

| Campo                            | Regla                                                                    |
| -------------------------------- | ------------------------------------------------------------------------ |
| `package_id`                     | paquete exacto                                                           |
| `risk_id`                        | identidad correlacionada con `required_risk_review_set`                  |
| `risk_statement`                 | exposición residual aceptada                                             |
| `source_ref`                     | origen canónico                                                          |
| `candidate_ref`                  | candidato exacto                                                         |
| `environment_ref`                | ambiente exacto                                                          |
| `scope_ref`                      | alcance máximo de la aceptación                                          |
| `existing_controls`              | controles activos                                                        |
| `residual_condition`             | condición que permanece                                                  |
| `acceptance_rationale`           | justificación concreta de por qué la exposición residual puede tolerarse |
| `acceptance_authority_ref`       | fuente que demuestra la autoridad aplicable                              |
| `accepted_by_ref`                | actor o registro de aprobación autorizado                                |
| `accepted_at`                    | momento de aceptación                                                    |
| `valid_from`                     | inicio de vigencia                                                       |
| `valid_until_or_exit_condition`  | expiración o condición de terminación                                    |
| `owner_ref`                      | propietario de seguimiento                                               |
| `monitoring_refs`                | señales o evidencias que permiten vigilar la condición                   |
| `suspension_condition_refs`      | condiciones que invalidan la continuidad                                 |
| `mitigation_or_containment_refs` | controles o mitigaciones existentes                                      |
| `resolution_task_ref`            | tarea responsable cuando exista reducción o cierre posterior             |
| `revalidation_triggers`          | cambios que obligan a revisar la aceptación                              |
| `evidence_refs`                  | evidencia reproducible sin secretos                                      |
| `acceptance_state`               | `VIGENTE`, `EXPIRADA`, `REVOCADA` o `SUPERSEDIDA`                        |

Solo `VIGENTE` puede soportar `PASS`.

---

#### 12. Vigencia y alcance no transferible

Toda aceptación deberá estar acotada como mínimo por:

- `package_id`;
- candidato o versión;
- ambiente;
- capacidad o proceso;
- sede, población o cohorte cuando aplique;
- ventana temporal o condición de salida;
- controles existentes;
- evidencia utilizada.

Una aceptación no se hereda automáticamente:

- a otro paquete;
- a otro release;
- a otro ambiente;
- a otra sede;
- a una cohorte mayor;
- a una ventana posterior;
- a un nuevo proveedor;
- a un nuevo método de operación;
- a una condición con mayor impacto.

Cuando cualquiera de esas dimensiones cambie de manera material, la aceptación deberá reevaluarse.

---

#### 13. Autoridad de aceptación

`READY-GATE-014` no inventa cargos ni modifica matrices de autorización.

La autoridad válida deberá provenir del contrato canónico que gobierna el riesgo, el proceso, el dominio, el paquete o la decisión correspondiente.

La evidencia deberá permitir resolver:

- quién aceptó;
- con qué autoridad;
- para qué alcance;
- durante qué vigencia;
- respecto de qué riesgo exacto;
- bajo qué controles;
- con qué condición de suspensión;
- y qué tarea o proceso será responsable de reducir o cerrar el riesgo cuando corresponda.

Si la autoridad aplicable no puede demostrarse, el riesgo permanece `BLOQUEADO`.

La autoridad de aceptar un riesgo no equivale a la autoridad final de entrada al piloto definida por `READY-GATE-015`.

---

#### 14. Aceptación y requisitos `TREQ-*`

La aceptación de riesgo no cambia por sí misma el estado ni la semántica de un requisito de prueba.

Cuando un `TREQ-*` aplicable esté en estado `DIFERIDO` y su trazabilidad dependa de riesgo aceptado:

1. deberá conservar su identificador original;
2. deberá conservar la justificación existente;
3. deberá existir riesgo correlacionado en este universo;
4. la aceptación deberá ser válida y acotada;
5. deberá existir tarea responsable de resolución;
6. deberá existir puerta o momento exacto de resolución;
7. la aceptación no podrá presentarse como implementación o verificación de la prueba;
8. una aceptación expirada invalida la continuidad basada en ese diferimiento.

`READY-GATE-014` no difiere requisitos por inferencia ni crea estados nuevos dentro de `04A`.

---

#### 15. Definición de condición de suspensión

Una `suspension_condition` es una condición observable o un evento verificable que demuestra que:

- la hipótesis bajo la cual se aceptó un riesgo dejó de ser cierta;
- un control necesario dejó de estar disponible;
- la exposición excedió el límite autorizado;
- apareció una condición prohibida por un contrato obligatorio;
- o la evidencia necesaria para sostener la continuación ya no es confiable.

Cuando una condición marcada como obligatoria se cumple, la aceptación asociada deja de soportar continuidad.

La ejecución concreta de pausa, reversión o continuación será definida y ejecutada por las tareas de cutover correspondientes. Esta tarea define el contrato previo que deberán consumir.

---

#### 16. Construcción de `suspension_condition_set::<package_id>`

El conjunto deberá derivarse, cuando aplique, de:

- condiciones de pérdida de validez de cada riesgo aceptado;
- criterios de aceptación y salvaguardas del piloto;
- límites de rollout;
- señales y alertas gobernadas por `READY-GATE-011`;
- condiciones de contingencia y handoff de `READY-GATE-008`;
- pérdida de disponibilidad de soporte crítico gobernado por `READY-GATE-010`;
- pérdida de capacidad de recuperación o rollback gobernada por `READY-GATE-012`;
- invalidez de baseline o comparabilidad gobernada por `READY-GATE-013`;
- incidentes o condiciones expresamente declarados como no tolerables por contratos canónicos;
- límites de exposición definidos por el paquete.

No toda alerta es condición de suspensión y no toda condición de suspensión exige una métrica numérica.

Una condición podrá ser:

- basada en umbral medible;
- basada en evento;
- basada en estado;
- basada en pérdida de un control;
- basada en pérdida de evidencia o visibilidad necesaria;
- basada en cambio de alcance o identidad.

---

#### 17. Identidad mínima de cada condición de suspensión

Cada condición deberá conservar, como mínimo y cuando aplique:

| Campo                      | Regla                                                              |
| -------------------------- | ------------------------------------------------------------------ |
| `package_id`               | paquete exacto                                                     |
| `suspension_condition_id`  | identidad estable dentro del paquete                               |
| `source_ref`               | contrato, criterio, riesgo o salvaguarda que origina la condición  |
| `linked_risk_ids`          | riesgos aceptados relacionados, si existen                         |
| `candidate_ref`            | candidato exacto                                                   |
| `environment_ref`          | ambiente exacto                                                    |
| `scope_ref`                | alcance sobre el que se evalúa                                     |
| `signal_or_event_ref`      | señal, evento, estado o evidencia usada                            |
| `authoritative_source_ref` | fuente propietaria                                                 |
| `trigger_rule`             | predicado verificable que determina cumplimiento                   |
| `evaluation_window`        | ventana cuando aplique                                             |
| `required_dimensions`      | dimensiones necesarias para no ocultar el trigger                  |
| `condition_mode`           | `SUSPENSION_OBLIGATORIA` o `REEVALUACION_OBLIGATORIA`              |
| `owner_ref`                | propietario que debe recibir la condición                          |
| `escalation_ref`           | ruta de escalamiento ya gobernada                                  |
| `evidence_ref`             | evidencia de configuración o disponibilidad                        |
| `armed_state`              | `ARMADA`, `NO_EVALUABLE` o `RETIRADA`                              |
| `reentry_requirement_ref`  | condición que deberá demostrarse antes de reanudar, cuando aplique |

Una condición que no pueda evaluarse con la fuente requerida no se considera armada.

---

#### 18. `SUSPENSION_OBLIGATORIA` y `REEVALUACION_OBLIGATORIA`

Las dos modalidades se mantienen separadas:

**`SUSPENSION_OBLIGATORIA`**

Se utiliza cuando el contrato aplicable determina que el cumplimiento del trigger invalida la continuidad de la exposición bajo las condiciones autorizadas.

**`REEVALUACION_OBLIGATORIA`**

Se utiliza cuando el evento no ordena por sí solo suspender, pero obliga a detener cualquier decisión de ampliación o continuidad que dependa de una aceptación vigente hasta que la autoridad correspondiente reevalúe la condición.

Reglas:

1. la modalidad debe provenir del contrato o decisión autorizada;
2. no se podrá degradar `SUSPENSION_OBLIGATORIA` a `REEVALUACION_OBLIGATORIA` durante el piloto sin una nueva decisión válida;
3. una condición crítica no se transforma en simple alerta por ausencia de impacto observado;
4. una alerta informativa no se eleva a suspensión sin regla aprobada;
5. el detalle operacional de pausa, reversión o continuación pertenece a `CUTOVER-OPS-006`.

---

#### 19. Pérdida de observabilidad de una condición

Si una condición de suspensión depende de una señal, consulta, fuente, alerta o mecanismo de observación y este deja de ser confiable:

- no se asumirá que el trigger está en falso;
- no se asumirá normalidad;
- la condición pasará a `NO_EVALUABLE`;
- deberá aplicarse la consecuencia definida por su contrato;
- si esa pérdida impide demostrar que la exposición sigue dentro del límite aceptado, `READY-GATE-014` no puede soportar continuidad mediante esa aceptación.

La indisponibilidad de monitoreo no es evidencia de ausencia de riesgo.

---

#### 20. Condiciones de revalidación de una aceptación

Una aceptación `VIGENTE` deberá reevaluarse cuando ocurra, según aplique:

- cambio de candidato o revisión;
- cambio de ambiente;
- ampliación de sedes, cohortes, población o dispositivos;
- aumento de exposición;
- cambio material de dependencia externa;
- cambio de controles mitigantes;
- pérdida o degradación de monitoreo;
- cambio de criterio de aceptación;
- cambio de baseline o de comparabilidad material;
- incidente relacionado con el riesgo;
- activación de una condición de suspensión;
- cambio material en probabilidad, impacto o consecuencia;
- expiración temporal;
- modificación de autoridad;
- cierre, modificación o supersesión de la tarea de resolución;
- evidencia nueva que contradiga el fundamento de aceptación.

La aceptación anterior deberá conservarse en historial; no se sobrescribe silenciosamente.

---

#### 21. Relación entre riesgo materializado, incidente y aceptación

Cuando una condición incierta se materialice:

1. el hecho observado deberá tratarse mediante el contrato de incidente, defecto o contingencia que corresponda;
2. el riesgo original podrá conservarse como antecedente, pero no sustituye el registro del hecho;
3. deberá evaluarse si la aceptación permanece vigente;
4. deberán evaluarse las condiciones de suspensión relacionadas;
5. no se permitirá justificar la continuidad diciendo únicamente que “el riesgo estaba aceptado”;
6. la evidencia del incidente puede revocar o superseder la aceptación;
7. la resolución del incidente no reactiva automáticamente la aceptación previa.

---

#### 22. Evidencia aceptable para una aceptación

Podrán participar como evidencia, cuando correspondan al riesgo exacto:

- decisión aprobada por actor autorizado;
- registro de riesgo gobernado y versionado;
- referencia a acta o decisión formal con identidad verificable;
- evidencia de controles existentes;
- evidencia de alcance y población;
- evidencia de valoración conforme al método propietario;
- evidencia de vigencia;
- referencia a monitoreo;
- referencia a condición de suspensión;
- referencia a tarea de resolución;
- evidencia de escalamiento;
- evidencia de supersesión, revocación o cierre cuando aplique.

La evidencia deberá permitir a un revisor autorizado llegar a la misma conclusión sin depender de memoria o conversación informal.

---

#### 23. Evidencia insuficiente por sí sola

No constituye aceptación válida:

- un “ok” en chat;
- silencio de un aprobador;
- asistencia a una reunión;
- un comentario sin identidad de autoridad;
- un ticket sin alcance ni decisión;
- una firma sin riesgo exacto;
- una aceptación de otro paquete;
- una aceptación de otro ambiente;
- una aceptación expirada;
- una aceptación sin condición de salida;
- una aceptación sin propietario;
- una aceptación sin condición de suspensión o reevaluación;
- una promesa de corregir después sin tarea responsable;
- un `PASS` de otra puerta interpretado como aceptación;
- una alerta silenciada;
- una excepción técnica aplicada sin gobierno;
- la continuación operativa de hecho;
- la ausencia de incidentes;
- una estimación sin método cuando el método sea requerido;
- una captura sin contexto y sin trazabilidad.

---

#### 24. Evidencia aceptable para una condición de suspensión

La condición deberá demostrar, cuando aplique:

- identidad;
- fuente autoritativa;
- trigger exacto;
- alcance;
- ventana;
- dimensiones;
- modalidad;
- propietario;
- canal o escalamiento;
- estado `ARMADA`;
- relación con riesgo o criterio;
- evidencia de que la fuente puede observar la condición;
- condición requerida para reevaluar o reanudar.

No se exige ejecutar un incidente real para probar la existencia de la condición durante esta tarea documental. La ejecución futura deberá comprobar que el mecanismo necesario está disponible conforme a las puertas propietarias.

---

#### 25. Condiciones de `FAIL`

Producen `FAIL` de `READY-GATE-014`, entre otras condiciones materiales aplicables:

1. un registro declara aceptado un riesgo que corresponde a un `FAIL` obligatorio de una puerta previa;
2. un registro pretende convertir un `BLOQUEADO` previo en `PASS`;
3. la aceptación contradice un requisito o restricción canónica obligatoria;
4. la autoridad que aceptó no estaba autorizada y existe evidencia suficiente de ello;
5. la aceptación está expirada pero se presenta como vigente;
6. la aceptación pertenece a otro paquete, candidato, ambiente o alcance;
7. se ocultó deliberadamente un riesgo material del universo;
8. un riesgo aceptado no tiene límite de vigencia ni condición de salida;
9. un riesgo aceptado no tiene ninguna condición que invalide su continuidad;
10. una condición obligatoria fue degradada sin autorización;
11. una fuente conocida como no autoritativa se usa para afirmar que un trigger no ocurrió;
12. se presenta ausencia de señal como ausencia de riesgo cuando la fuente estaba caída;
13. se amplió el alcance más allá de la aceptación vigente;
14. se sobrescribió silenciosamente una aceptación o condición ya usada para readiness;
15. se presenta un riesgo materializado como riesgo futuro para evitar tratar un incidente o defecto;
16. se utiliza aceptación de riesgo para diferir una obligación sin tarea y puerta de resolución;
17. se reduce un criterio de aceptación mediante el registro;
18. se declara `NO_APLICA` sin fundamento para ocultar una exposición real;
19. el expediente afirma cobertura completa pese a faltantes o duplicados demostrados;
20. cualquier otra evidencia suficiente demuestra incumplimiento material del contrato de esta tarea.

---

#### 26. Condiciones de `BLOQUEADO`

Producen `BLOQUEADO`, entre otras condiciones aplicables:

1. autoridad de aceptación todavía no resoluble;
2. evidencia de aceptación incompleta;
3. propietario no definido;
4. tarea de resolución obligatoria no identificada;
5. condición de salida no definida;
6. vigencia no demostrable;
7. alcance ambiguo;
8. identidad del candidato o ambiente ambigua;
9. riesgo candidato pendiente de disposición;
10. condición de suspensión requerida todavía no definida;
11. trigger no observable con la evidencia disponible;
12. fuente autoritativa inaccesible;
13. condición en estado `NO_EVALUABLE`;
14. valoración requerida por el contrato todavía pendiente;
15. riesgo ligado a una puerta previa que permanece `BLOQUEADO`;
16. referencia `TREQ-*` aplicable no resoluble;
17. discrepancia entre universo esperado y registro materializado;
18. duplicado no resuelto;
19. aceptación pendiente de revalidación por cambio material;
20. cualquier situación en la que todavía no exista evidencia suficiente para declarar `PASS` o `FAIL` sin falsear la decisión.

`BLOQUEADO` exige siempre propietario, tarea responsable cuando corresponda y condición exacta de salida.

---

#### 27. Reconciliación cuantitativa del universo de riesgo

Antes de calcular el resultado deberá demostrarse:

```text
TOTAL_RIESGOS_ESPERADOS
= TOTAL_ACEPTADOS
+ TOTAL_CERRADOS
+ TOTAL_BLOQUEADOS
+ TOTAL_NO_APLICA
```

Y además:

```text
RIESGOS_FALTANTES = 0
RIESGOS_DUPLICADOS = 0
REFERENCIAS_NO_RESOLUBLES = 0
ACEPTACIONES_EXPIRADAS_PRESENTADAS_COMO_VIGENTES = 0
ACEPTACIONES_SIN_CONDICION = 0
ACEPTACIONES_SIN_AUTORIDAD = 0
```

`TOTAL_ACEPTADOS` deberá coincidir exactamente con las entradas `VIGENTE` de `accepted_risk_register`.

Un registro vacío de riesgos aceptados es válido cuando el universo completo fue revisado y todos los elementos resultaron `CERRADO` o `NO_APLICA`, sin bloqueos ni omisiones. “No aceptamos riesgos” no sustituye esa reconciliación.

---

#### 28. Reconciliación cuantitativa de condiciones de suspensión

Para `PASS` deberá demostrarse, cuando el paquete vaya a piloto:

```text
TOTAL_CONDICIONES_REQUERIDAS
= TOTAL_CONDICIONES_ARMADAS
+ TOTAL_CONDICIONES_RETIRADAS_JUSTIFICADAS
```

Y además:

```text
CONDICIONES_FALTANTES = 0
CONDICIONES_DUPLICADAS = 0
CONDICIONES_NO_EVALUABLES = 0
RIESGOS_ACEPTADOS_SIN_CONDICION_VINCULADA = 0
REFERENCIAS_DE_FUENTE_NO_RESOLUBLES = 0
```

Una condición `RETIRADA` solo puede excluirse del conjunto activo cuando el riesgo, criterio o alcance que la originaba dejó de aplicar mediante una decisión trazable.

---

#### 29. Resultado agregado por paquete

La decisión se calcula de forma estricta:

```text
SI EXISTE AL MENOS UN FAIL DE ESTA PUERTA
→ PACKAGE_RESULT = FAIL

SI NO EXISTE FAIL
Y EXISTE AL MENOS UN BLOQUEADO
→ PACKAGE_RESULT = BLOQUEADO

SI NO EXISTE FAIL NI BLOQUEADO
Y EL UNIVERSO DE RIESGO ESTÁ RECONCILIADO
Y TODA ACEPTACIÓN VIGENTE ES VÁLIDA
Y TODAS LAS CONDICIONES REQUERIDAS ESTÁN ARMADAS
Y NO EXISTEN REFERENCIAS IRRESOLUBLES
→ PACKAGE_RESULT = PASS
```

Reglas adicionales:

1. un paquete puede obtener `PASS` con cero riesgos aceptados;
2. cero riesgos aceptados no significa cero riesgos revisados;
3. un paquete que entrará a piloto no obtiene `NO_APLICA` solo porque no tenga riesgos residuales aceptados;
4. `NO_APLICA` a nivel de la puerta solo será posible cuando el expediente demuestre que la instancia no entra a piloto y que este contrato no es aplicable a su cierre;
5. un resultado favorable de `READY-GATE-014` no autoriza el piloto;
6. `READY-GATE-015` deberá consumir este resultado como una entrada independiente.

---

#### 30. `risk_readiness_manifest::<package_id>`

La ejecución futura de `SHELL-CI-021::<package_id>` deberá poder producir un manifiesto con:

- `package_id`;
- candidato;
- ambiente;
- versión del universo;
- alcance del piloto;
- fecha de evaluación;
- `total_risk_candidates`;
- `total_accepted`;
- `total_closed`;
- `total_blocked`;
- `total_not_applicable`;
- `risk_missing_count`;
- `risk_duplicate_count`;
- `unresolved_reference_count`;
- lista completa de `risk_id`;
- lista de riesgos aceptados vigentes;
- autoridad y vigencia de cada aceptación;
- tarea de resolución cuando corresponda;
- total de condiciones requeridas;
- total de condiciones armadas;
- total de condiciones retiradas justificadas;
- condiciones faltantes;
- condiciones no evaluables;
- riesgos aceptados sin condición vinculada;
- referencias de monitoreo;
- referencias de soporte y escalamiento;
- referencias de rollback o recuperación cuando correspondan;
- estado de revalidación;
- evidencia;
- resultado por elemento;
- resultado agregado.

El manifiesto referencia evidencia; no copia secretos, dumps o información personal innecesaria.

---

#### 31. Handoff obligatorio de bloqueos

Todo elemento `BLOQUEADO` deberá conservar:

- identidad;
- causa concreta;
- insumo faltante;
- propietario;
- tarea responsable;
- condición exacta de salida;
- evidencia requerida;
- impacto sobre la aceptación;
- impacto sobre las condiciones de suspensión;
- impacto sobre el resultado agregado.

No se admiten pendientes expresados únicamente como:

- “por definir”;
- “pendiente”;
- “revisar después”;
- “falta información”;
- “TBD”;
- “aceptar temporalmente”.

Si no existe una tarea responsable válida para un pendiente que la requiere, la tarea documental no puede presentar el expediente como completo.

---

#### 32. Consumo por `SHELL-CI-021`, `READY-GATE-015` y cutover

`SHELL-CI-021::<package_id>` deberá verificar:

1. universo completo de riesgos;
2. disposición exacta por riesgo;
3. validez de cada aceptación;
4. autoridad;
5. vigencia;
6. alcance;
7. controles;
8. tarea de resolución cuando aplique;
9. condiciones de suspensión vinculadas;
10. disponibilidad de las fuentes necesarias;
11. reconciliación cuantitativa;
12. resultado agregado.

`READY-GATE-015` consumirá el resultado sin reinterpretarlo y definirá la autoridad final de entrada al piloto.

Durante la ejecución posterior:

- `SHELL-CI-022::<package_id>` operará el piloto;
- `CUTOVER-OPS-006` definirá la mecánica de pausa, reversión o continuación;
- `CUTOVER-OPS-007` gobernará el registro de incidentes, decisiones y cambios de alcance.

La ocurrencia real de una condición de suspensión no se resuelve dentro de este documento.

---

#### 33. Condiciones que no resuelve esta tarea

`READY-GATE-014` no:

- define un apetito de riesgo empresarial universal;
- inventa escalas de probabilidad o impacto;
- crea cargos de aprobación;
- modifica matrices de autoridad;
- reduce criterios de aceptación;
- cambia resultados de puertas previas;
- modifica requisitos `TREQ-*`;
- crea excepciones de seguridad o autorización;
- autoriza entrada al piloto;
- ejecuta cutover;
- ejecuta una suspensión;
- decide rollback;
- ejecuta rollback;
- define comandos de operación;
- ejecuta incident response;
- ejecuta migraciones;
- ejecuta DDL/DML;
- ejecuta backfills;
- modifica Supabase;
- altera población o cohortes;
- ejecuta hypercare;
- certifica cierre del paquete.

---

#### 34. Requisitos de prueba derivados

**Resultado:** NO GENERA REQUISITOS DE PRUEBA

**Justificación:** `READY-GATE-014` materializa el contrato documental de revisión, disposición, aceptación, vigencia, trazabilidad y suspensión de riesgos residuales que ya se originan en requisitos, controles, criterios, puertas, observabilidad, contingencias y decisiones existentes. No introduce comportamiento ejecutable nuevo del producto, no modifica reglas empresariales implementables y no altera la semántica de los requisitos de prueba existentes. Las condiciones reales que protegen comportamientos continúan cubiertas por sus requisitos `TREQ-*` propietarios; esta tarea gobierna si un riesgo residual puede acompañar una decisión de readiness y cuándo esa aceptación deja de ser válida.

**Requisitos creados:** 0  
**Requisitos modificados:** 0  
**Fragmentos 04A afectados:** 0

---

#### 35. Criterios de aceptación

`READY-GATE-014` queda documentalmente completa cuando:

1. define `required_risk_review_set::<package_id>`;
2. define `accepted_risk_register::<package_id>`;
3. define `suspension_condition_set::<package_id>`;
4. define `risk_readiness_manifest::<package_id>`;
5. separa riesgo identificado de riesgo aceptado;
6. impide usar aceptación como waiver de readiness;
7. preserva resultados `FAIL` y `BLOQUEADO` previos;
8. obliga a derivar el universo desde fuentes canónicas;
9. exige una disposición por riesgo;
10. define `ACEPTADO`, `CERRADO`, `BLOQUEADO` y `NO_APLICA`;
11. exige evidencia para `CERRADO`;
12. exige justificación para `NO_APLICA`;
13. exige handoff completo para `BLOQUEADO`;
14. define condiciones de admisibilidad de `ACEPTADO`;
15. exige autoridad verificable;
16. exige alcance exacto;
17. exige vigencia o condición de salida;
18. exige propietario;
19. exige controles existentes;
20. exige condición de pérdida de validez;
21. impide transferir aceptaciones entre paquetes o ambientes;
22. define revalidación por cambios materiales;
23. conserva relación con `TREQ-*` sin modificar su semántica;
24. define condición de suspensión;
25. diferencia `SUSPENSION_OBLIGATORIA` de `REEVALUACION_OBLIGATORIA`;
26. exige fuente autoritativa para evaluar cada condición;
27. impide asumir normalidad por pérdida de observabilidad;
28. define `ARMADA`, `NO_EVALUABLE` y `RETIRADA`;
29. exige cero condiciones `NO_EVALUABLE` para `PASS`;
30. define evidencia aceptable;
31. define evidencia insuficiente;
32. enumera condiciones de `FAIL`;
33. enumera condiciones de `BLOQUEADO`;
34. reconcilia cuantitativamente el universo de riesgos;
35. reconcilia cuantitativamente las condiciones de suspensión;
36. permite `PASS` con cero riesgos aceptados solo después de revisar el universo completo;
37. exige que todo riesgo aceptado tenga condición vinculada;
38. define cálculo agregado estricto;
39. identifica `SHELL-CI-021` como ejecutor futuro del checklist;
40. mantiene `READY-GATE-015` como autoridad final de entrada;
41. mantiene `CUTOVER-OPS-006` como propietario de la mecánica operativa de pausa, reversión o continuación;
42. no ejecuta piloto, cutover, rollback, migraciones, DDL/DML, backfills ni operaciones sobre Supabase;
43. crea cero requisitos de prueba y modifica cero requisitos existentes;
44. mantiene `READY-GATE-015` únicamente reservada.

---

#### 36. Estado del resultado documental

| Resultado                                         | Estado                                                       |
| ------------------------------------------------- | ------------------------------------------------------------ |
| universo `required_risk_review_set::<package_id>` | `ESPECIFICADO` como contrato                                 |
| disposiciones de riesgo                           | `ESPECIFICADO`                                               |
| `accepted_risk_register::<package_id>`            | `ESPECIFICADO` como contrato                                 |
| admisibilidad de aceptación                       | `ESPECIFICADO`                                               |
| vigencia y revalidación                           | `ESPECIFICADO`                                               |
| autoridad de aceptación                           | `ESPECIFICADO` como referencia al gobierno propietario       |
| relación con `TREQ-*` diferidos                   | `ESPECIFICADO` sin modificar 04A                             |
| `suspension_condition_set::<package_id>`          | `ESPECIFICADO` como contrato                                 |
| modalidades de condición                          | `ESPECIFICADO`                                               |
| pérdida de observabilidad                         | `ESPECIFICADO`                                               |
| condiciones de `FAIL`                             | `ESPECIFICADO`                                               |
| condiciones de `BLOQUEADO`                        | `ESPECIFICADO`                                               |
| reconciliación cuantitativa                       | `ESPECIFICADO`                                               |
| cálculo agregado                                  | `ESPECIFICADO`                                               |
| `risk_readiness_manifest::<package_id>`           | `ESPECIFICADO`                                               |
| riesgos reales de un paquete implementado         | `PENDIENTE_DE_EVIDENCIA`                                     |
| aceptaciones reales                               | `PENDIENTE_DE_EVIDENCIA`                                     |
| condiciones reales armadas                        | `PENDIENTE_DE_EVIDENCIA`                                     |
| autoridad final de entrada                        | `FUERA_DE_ALCANCE`; corresponde a `READY-GATE-015`           |
| ejecución de suspensión                           | `FUERA_DE_ALCANCE`; corresponde al ciclo de cutover y piloto |
| mecánica de pausa, reversión o continuación       | `FUERA_DE_ALCANCE`; corresponde a `CUTOVER-OPS-006`          |

La especificación documental no se presenta como aceptación real de ningún riesgo ni como autorización de operación.

---

#### 37. Secuencia preservada

La secuencia por paquete permanece:

```text
E5-GATE-008::<package_id>
→ SHELL-CI-020::<package_id>
→ BLOQUE R Y TAREAS FÍSICAS APLICABLES
→ SHELL-CI-021::<package_id>
→ SHELL-CI-022::<package_id>
→ SHELL-CI-023::<package_id>
→ SHELL-CI-024::<package_id>
```

`READY-GATE-014` diseña una de las comprobaciones consumidas por `SHELL-CI-021`.

No adelanta la decisión final de entrada, cutover, piloto, hypercare ni cierre.

---

#### 38. Continuidad

ÚLTIMA TAREA APROBADA
`READY-GATE-013 — Definir método y evidencia para capturar la línea base previa al piloto`

TAREA ACTUAL APROBADA
`READY-GATE-014 — Definir registro de riesgos aceptados y condiciones de suspensión`

SIGUIENTE TAREA RESERVADA
`READY-GATE-015 — Definir autoridad y criterio para aprobar la entrada al piloto operativo`


### ✅ READY-GATE-015 — Definir autoridad y criterio para aprobar la entrada al piloto operativo

**Estado:** APROBADA  
**Tarea anterior:** `READY-GATE-014 — Definir registro de riesgos aceptados y condiciones de suspensión` — APROBADA  
**Tarea siguiente:** `CUTOVER-OPS-001 — Definir criterio para seleccionar fecha, ventana y responsables del cutover` — RESERVADA  
**Tipo de tarea:** documental — definición normativa y materialización del criterio final de readiness por paquete, de la autoridad responsable de decidir la entrada al piloto y del expediente mínimo que deberá demostrar que las puertas `READY-GATE-001..014` fueron resueltas de forma íntegra, coherente, vigente y atribuible antes de autorizar exposición; sin ejecutar cutover, piloto, despliegues, migraciones, DDL/DML, backfills, cambios físicos, configuración productiva ni operaciones sobre Supabase.  
**Repositorio propietario:** `devVentoGroup/vento-shell`

---

#### 1. Resultado sustantivo

`READY-GATE-015` cierra documentalmente la puerta de readiness operativo mediante cuatro piezas obligatorias:

1. `required_entry_gate_set::<package_id>` — conjunto fijo de las catorce puertas `READY-GATE-001..014` que deben quedar reconciliadas para el mismo paquete, candidato, ambiente y alcance;
2. `pilot_entry_authority::<package_id>` — resolución de la autoridad final de entrada utilizando el `Responsable de decisión` ya asignado al paquete por los contratos E5, sin crear un rol nuevo ni reasignar propiedad;
3. `pilot_entry_decision::<package_id>` — decisión final determinista `APROBAR_ENTRADA`, `DENEGAR_ENTRADA`, `BLOQUEAR_DECISION` o `NO_APLICA`;
4. `pilot_entry_decision_manifest::<package_id>` — expediente futuro que deberá producir `SHELL-CI-021::<package_id>` para demostrar la reconciliación de puertas, autoridad, vigencia, integridad de evidencia y decisión final.

La tarea no afirma que un paquete real esté listo para piloto. Define la regla final que deberá ejecutar `SHELL-CI-021::<package_id>` después de la implementación aplicable.

---

#### 2. Propósito

Definir quién puede autorizar la entrada de un paquete al piloto operativo y bajo qué condiciones exactas esa autorización es válida.

La puerta deberá impedir que la entrada al piloto dependa de:

- una percepción general de readiness;
- una reunión sin decisión trazable;
- una mayoría informal de señales favorables;
- un promedio entre puertas;
- un riesgo aceptado utilizado como excepción a un fallo;
- una evidencia perteneciente a otro candidato, ambiente o alcance;
- una aprobación del ejecutor técnico sin autoridad de decisión;
- una decisión emitida antes de completar las puertas obligatorias;
- una decisión conservada después de que un cambio material haya vuelto obsoleta la evidencia.

La salida deberá ser reproducible: otro revisor autorizado debe poder reconstruir qué puertas se evaluaron, con qué evidencia, quién tenía autoridad, qué decisión se emitió y por qué.

---

#### 3. Invariantes de decisión

Se adoptan las siguientes separaciones obligatorias:

```text
EJECUTAR EL CHECKLIST
≠ TENER AUTORIDAD PARA APROBAR

PASS DE UNA PUERTA
≠ APROBACIÓN FINAL DE ENTRADA

RIESGO ACEPTADO
≠ EXCEPCIÓN A UN FAIL O BLOQUEADO

EVIDENCIA COMPLETA
≠ DECISIÓN EMITIDA

DECISIÓN APROBADA
≠ EJECUCIÓN DEL CUTOVER

APROBAR ENTRADA
≠ AMPLIAR ALCANCE

APROBAR ENTRADA
≠ APROBAR SALIDA DEL PILOTO
```

Reglas:

1. `SHELL-CI-021` ejecuta y consolida el checklist; la ejecución técnica no concede autoridad empresarial por sí sola;
2. la autoridad final proviene del responsable de decisión ya materializado para el paquete;
3. ninguna autoridad final puede sobreescribir un `FAIL` o `BLOQUEADO` de una puerta obligatoria;
4. un riesgo aceptado conforme a `READY-GATE-014` conserva el riesgo, pero no cambia el resultado de otra puerta;
5. la decisión se limita al paquete, candidato, ambiente, alcance y ventana evaluados;
6. una aprobación no se hereda a otro paquete, release, ambiente, sede, cohorte o ampliación;
7. un cambio material posterior invalida la reutilización automática de la decisión;
8. `CUTOVER-OPS-001` y tareas posteriores gobiernan la planificación y ejecución del cutover, no esta puerta.

---

#### 4. Entradas canónicas obligatorias

La evaluación futura de `READY-GATE-015::<package_id>` deberá consumir:

1. identidad exacta de `package_id`;
2. candidato, versión, revisión o artefacto que será expuesto;
3. ambiente objetivo;
4. alcance aprobado del piloto;
5. `Responsable de decisión` del paquete ya definido por los contratos E5;
6. resultados y evidencias de `READY-GATE-001::<package_id>` a `READY-GATE-014::<package_id>`;
7. criterios de aceptación del paquete;
8. alcance, cohortes y salvaguardas del piloto;
9. evidencia de monitoreo, soporte, recuperación y línea base cuando sus puertas sean aplicables;
10. `risk_readiness_manifest::<package_id>` de `READY-GATE-014`;
11. cualquier condición de suspensión armada que deba estar disponible al comenzar la exposición;
12. estado de los requisitos, dependencias y controles que las puertas previas hayan declarado como necesarios para readiness.

La puerta no reabre ni redefine la semántica de las entradas. Las consume y reconcilia.

---

#### 5. Universo fijo `required_entry_gate_set::<package_id>`

El conjunto esperado contiene exactamente catorce identidades:

| Orden | `gate_id`        | Plano de decisión consumido                       |
| ----: | ---------------- | ------------------------------------------------- |
|     1 | `READY-GATE-001` | código desplegado en entorno objetivo             |
|     2 | `READY-GATE-002` | migraciones aplicadas y datos validados           |
|     3 | `READY-GATE-003` | permisos, matrices y dispositivos configurados    |
|     4 | `READY-GATE-004` | usuarios, roles, sedes, áreas y turnos requeridos |
|     5 | `READY-GATE-005` | catálogos y datos maestros mínimos                |
|     6 | `READY-GATE-006` | integraciones y credenciales del ambiente         |
|     7 | `READY-GATE-007` | hardware, red, escáneres e impresoras             |
|     8 | `READY-GATE-008` | procedimientos operativos y contingencias         |
|     9 | `READY-GATE-009` | capacitación y material de apoyo                  |
|    10 | `READY-GATE-010` | mesa de soporte, responsables y escalamiento      |
|    11 | `READY-GATE-011` | monitoreo, métricas y alertas                     |
|    12 | `READY-GATE-012` | respaldo y rollback probados                      |
|    13 | `READY-GATE-013` | línea base previa al piloto                       |
|    14 | `READY-GATE-014` | riesgos aceptados y condiciones de suspensión     |

Reglas:

1. las catorce identidades se materializan exactamente una vez por paquete;
2. una puerta no se elimina porque resulte `FAIL`;
3. una puerta no se elimina porque resulte `BLOQUEADO`;
4. una puerta no se elimina por presión de calendario;
5. `NO_APLICA` solo se conserva cuando la propia puerta lo resolvió de forma válida y trazable;
6. `READY-GATE-015` no reinterpreta `NO_APLICA`;
7. la evidencia deberá corresponder al mismo contexto de decisión o demostrar compatibilidad explícita;
8. una puerta faltante impide aprobar entrada.

---

#### 6. Registro mínimo por puerta

Cada elemento de `required_entry_gate_set::<package_id>` deberá conservar:

| Campo                        | Regla                                                       |
| ---------------------------- | ----------------------------------------------------------- |
| `package_id`                 | paquete exacto                                              |
| `gate_id`                    | una de las catorce identidades permitidas                   |
| `candidate_ref`              | candidato, versión o revisión evaluada                      |
| `environment_ref`            | ambiente exacto                                             |
| `scope_ref`                  | alcance, sede, cohorte o población material cuando aplique  |
| `gate_result`                | `PASS`, `FAIL`, `BLOQUEADO` o `NO_APLICA`                   |
| `gate_evaluated_at`          | momento de la evaluación                                    |
| `gate_evidence_ref`          | evidencia reproducible                                      |
| `gate_manifest_ref`          | manifiesto específico cuando la puerta lo produzca          |
| `applicability_evidence_ref` | evidencia de `NO_APLICA`, cuando corresponda                |
| `freshness_state`            | `VIGENTE` u `OBSOLETO` para esta decisión                   |
| `consistency_state`          | `CONSISTENTE` o `INCONSISTENTE` respecto del contexto final |
| `blocking_reason`            | motivo cuando no pueda consumirse como apta                 |
| `reevaluation_ref`           | puerta o tarea que debe volver a ejecutarse cuando aplique  |

No se sustituirá evidencia de una puerta por una declaración de otra.

---

#### 7. Autoridad canónica de entrada

`pilot_entry_authority::<package_id>` se resuelve a partir del `Responsable de decisión` ya asignado al paquete por los contratos E5 y utilizado por sus criterios de aceptación.

La autoridad deberá conservar su identidad canónica `OWN-*` cuando esa sea la identidad vigente del expediente.

`READY-GATE-015`:

- no crea un nuevo rol;
- no cambia el propietario del paquete;
- no convierte a quien ejecuta CI en aprobador;
- no convierte a soporte, seguridad, datos, producto u operaciones en aprobador universal por inferencia;
- no reemplaza autoridades especializadas que hayan sido necesarias para aceptar riesgos, autorizaciones o controles previos.

La autoridad final decide únicamente si el expediente de readiness permite entrar al piloto dentro del alcance exacto evaluado.

---

#### 8. Evidencia mínima de autoridad

Para que `pilot_entry_authority::<package_id>` sea consumible deberán poder resolverse:

- `package_id`;
- `decision_owner_ref`;
- fuente canónica que asigna ese responsable al paquete;
- alcance de decisión;
- candidato;
- ambiente;
- piloto o cohorte autorizable;
- vigencia de la asignación cuando exista una restricción temporal;
- evidencia que correlacione al actor que emite la decisión con la autoridad del expediente.

Si la identidad `OWN-*` está definida pero no puede correlacionarse con un actor autorizado para emitir la decisión en el momento de ejecución, el resultado será `BLOQUEADO`.

No se fabricará una identidad humana para cerrar esa ausencia.

---

#### 9. Separación entre autoridades

La decisión final no sustituye otras decisiones propietarias:

1. la autoridad de riesgo de `READY-GATE-014` acepta exclusivamente riesgo residual dentro de su ámbito;
2. la autoridad de autorización o seguridad continúa gobernando accesos y permisos;
3. los propietarios de datos continúan gobernando integridad, datos y migraciones;
4. soporte continúa gobernando escalamiento;
5. recuperación continúa gobernando restauración y rollback;
6. el `Responsable de decisión` del paquete integra esos resultados para decidir entrada, pero no puede contradecirlos.

Una firma final no sana una evidencia inválida.

---

#### 10. Resultado permitido por cada puerta

Para `READY-GATE-015`:

| Resultado previo | Efecto sobre la entrada                                                                   |
| ---------------- | ----------------------------------------------------------------------------------------- |
| `PASS`           | apto para ser consumido si sigue vigente y consistente                                    |
| `NO_APLICA`      | apto únicamente si la puerta dejó justificación válida y sigue correspondiendo al alcance |
| `FAIL`           | impide aprobar entrada                                                                    |
| `BLOQUEADO`      | impide aprobar entrada                                                                    |

Una puerta `PASS` que quedó `OBSOLETO` para el candidato, ambiente o alcance final deja de ser apta hasta ser reevaluada.

Una puerta `PASS` con contexto `INCONSISTENTE` no puede contarse como satisfecha.

---

#### 11. Regla de vigencia de evidencia

Una evidencia de readiness solo puede consumirse si continúa representando el estado que será expuesto.

Deberá reevaluarse la puerta afectada cuando, después de su resultado, ocurra un cambio material en:

- código o artefacto desplegado;
- migración o estructura de datos;
- datos cuya validez sea parte del gate;
- permisos, matrices, roles o usuarios;
- sede, área, turno o población;
- catálogos o datos maestros;
- integración, binding o credencial;
- hardware, red o periféricos;
- procedimiento o contingencia;
- capacitación o material requerido;
- mesa de soporte o escalamiento;
- monitoreo, métrica, alerta o fuente;
- respaldo, restauración o rollback;
- baseline, corte o comparabilidad;
- riesgos aceptados, vigencia o condiciones de suspensión;
- candidato, ambiente o alcance del piloto.

La reevaluación se limita a las puertas afectadas cuando pueda demostrarse que las demás conservan vigencia.

---

#### 12. Coherencia de candidato, ambiente y alcance

Para aprobar entrada, todas las puertas aplicables deberán poder correlacionarse con:

```text
MISMO package_id
+ MISMO candidato material
+ MISMO ambiente objetivo
+ MISMO alcance autorizado
+ MISMA instancia de decisión
```

Cuando una puerta sea deliberadamente independiente de una dimensión concreta, esa independencia deberá provenir de su contrato y no de una inferencia de `READY-GATE-015`.

Ejemplos de inconsistencia que impiden usar un resultado como vigente:

- código verificado para una revisión distinta;
- migración validada en otro ambiente;
- usuarios configurados para otra sede;
- integración probada con otra credencial o binding material;
- hardware validado en otra estación cuando la equivalencia no esté demostrada;
- baseline de otra cohorte;
- riesgo aceptado para un alcance menor;
- condiciones de suspensión que no cubren la población que se pretende exponer.

---

#### 13. Reconciliación cuantitativa de las catorce puertas

Antes de emitir decisión deberá cumplirse:

```text
TOTAL_GATES_ESPERADOS = 14
TOTAL_GATES_MATERIALIZADOS = 14
```

Y:

```text
14
= TOTAL_PASS
+ TOTAL_FAIL
+ TOTAL_BLOQUEADO
+ TOTAL_NO_APLICA
```

Además:

```text
GATES_FALTANTES = 0
GATES_DUPLICADOS = 0
GATES_NO_RESOLUBLES = 0
GATES_OBSOLETOS = 0
GATES_INCONSISTENTES = 0
```

Ningún agregado favorable compensa una puerta faltante, obsoleta, inconsistente, `FAIL` o `BLOQUEADO`.

---

#### 14. Condición previa de `READY-GATE-014`

Cuando `READY-GATE-014::<package_id>` resulte `PASS`, `READY-GATE-015` deberá comprobar además:

- que el universo de riesgo continúa reconciliado;
- que las aceptaciones utilizadas siguen `VIGENTE`;
- que no apareció un cambio material que obligue a revalidarlas;
- que las condiciones de suspensión requeridas continúan armadas;
- que ninguna condición crítica requerida está `NO_EVALUABLE`;
- que no existe una aceptación cuyo alcance sea menor al piloto propuesto.

`READY-GATE-015` no vuelve a aceptar riesgos. Solo valida que el resultado consumido siga siendo apto.

---

#### 15. Condición previa de línea base

Cuando el piloto requiera comparación contra línea base, el resultado consumido de `READY-GATE-013` deberá conservar:

- candidato compatible;
- ambiente;
- alcance;
- cohorte;
- corte previo a exposición;
- evidencia;
- comparabilidad vigente.

Si el alcance de entrada se amplía más allá de la línea base válida, la aprobación queda `BLOQUEADO` hasta resolver la cobertura.

---

#### 16. Regla de no exposición previa

La decisión final deberá emitirse antes de la primera exposición que dependa de ella.

Si existe evidencia suficiente de que el candidato ya fue expuesto al alcance que requería autorización sin una decisión válida de entrada:

- la puerta resulta `FAIL`;
- el hecho deberá conservarse como incidente, desviación o hallazgo conforme al contrato propietario;
- una aprobación posterior no podrá retrotraer la autorización.

No se permite reconstruir una aprobación después de la exposición.

---

#### 17. Estados de decisión final

`pilot_entry_decision::<package_id>` utilizará exactamente:

| Decisión            | Semántica                                                                                                                                                                           |
| ------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `APROBAR_ENTRADA`   | las catorce puertas están reconciliadas, no existe `FAIL` ni `BLOQUEADO`, todo `NO_APLICA` es válido, la evidencia está vigente y consistente, y la autoridad final está demostrada |
| `DENEGAR_ENTRADA`   | existe evidencia suficiente de incumplimiento material que impide la entrada                                                                                                        |
| `BLOQUEAR_DECISION` | todavía falta evidencia, autoridad, vigencia, coherencia o resolución suficiente para aprobar o denegar de manera fundada                                                           |
| `NO_APLICA`         | el expediente aprobado demuestra que esa instancia no debe entrar a piloto y que la puerta final de entrada no corresponde a su cierre                                              |

`NO_APLICA` no se usa para un paquete destinado a piloto que todavía no está listo.

---

#### 18. Regla determinista de decisión

La decisión se calcula en este orden:

```text
SI EXISTE CUALQUIER GATE_RESULT = FAIL
→ DENEGAR_ENTRADA

SI NO EXISTE FAIL
Y EXISTE CUALQUIER GATE_RESULT = BLOQUEADO
→ BLOQUEAR_DECISION

SI EXISTE GATE FALTANTE, DUPLICADO, NO RESOLUBLE,
OBSOLETO O INCONSISTENTE
→ BLOQUEAR_DECISION

SI LA AUTORIDAD FINAL NO ES RESOLUBLE
→ BLOQUEAR_DECISION

SI LA AUTORIDAD DEMOSTRADAMENTE NO ESTÁ AUTORIZADA
Y AUN ASÍ SE PRESENTA UNA APROBACIÓN COMO VÁLIDA
→ DENEGAR_ENTRADA

SI TODAS LAS PUERTAS APLICABLES SON PASS,
TODO NO_APLICA ES VÁLIDO,
LA RECONCILIACIÓN ES EXACTA,
LA EVIDENCIA ES VIGENTE Y CONSISTENTE,
READY-GATE-014 SIGUE APTO,
Y LA AUTORIDAD FINAL ES VÁLIDA
→ APROBAR_ENTRADA
```

No existe estado intermedio equivalente a “aprobar con pendientes”.

Los riesgos residuales admitidos ya deben estar formalmente aceptados en `READY-GATE-014`.

---

#### 19. Condiciones obligatorias de `APROBAR_ENTRADA`

La decisión solo puede emitirse si se cumplen simultáneamente:

1. `TOTAL_GATES_ESPERADOS = 14`;
2. `TOTAL_GATES_MATERIALIZADOS = 14`;
3. `TOTAL_FAIL = 0`;
4. `TOTAL_BLOQUEADO = 0`;
5. `GATES_FALTANTES = 0`;
6. `GATES_DUPLICADOS = 0`;
7. `GATES_NO_RESOLUBLES = 0`;
8. `GATES_OBSOLETOS = 0`;
9. `GATES_INCONSISTENTES = 0`;
10. todo `NO_APLICA` está respaldado por la puerta propietaria;
11. candidato, ambiente y alcance son coherentes;
12. el alcance aprobado no excede la cobertura de las evidencias;
13. las aceptaciones de riesgo requeridas están vigentes;
14. las condiciones de suspensión requeridas están armadas;
15. la línea base requerida sigue siendo comparable;
16. la autoridad final está resuelta;
17. quien emite la decisión corresponde a esa autoridad;
18. la decisión ocurre antes de la exposición;
19. existe evidencia durable de la decisión;
20. no ocurrió un cambio material entre la última reevaluación necesaria y la decisión.

---

#### 20. Condiciones de `DENEGAR_ENTRADA`

Producen `DENEGAR_ENTRADA`, entre otras condiciones demostradas:

1. cualquier puerta `READY-GATE-001..014` en `FAIL`;
2. intento documentado de usar aceptación de riesgo para sobreescribir un `FAIL`;
3. intento documentado de aprobar con una puerta obligatoria incumplida;
4. aprobación emitida por un actor demostrablemente no autorizado presentada como válida;
5. exposición previa sin autorización cuando la autorización era obligatoria;
6. evidencia deliberadamente atribuida a otro candidato o ambiente;
7. reducción deliberada del alcance de verificación para ocultar un incumplimiento mientras se mantiene mayor alcance de exposición;
8. `NO_APLICA` falsamente atribuido para excluir una puerta aplicable;
9. decisión manipulada después de observar resultados del piloto;
10. evidencia suficiente de que el expediente de decisión fue alterado para aparentar readiness.

La denegación no equivale a rollback ni define la acción correctiva; conserva el motivo y remite a la puerta o tarea propietaria de la corrección.

---

#### 21. Condiciones de `BLOQUEAR_DECISION`

Producen `BLOQUEAR_DECISION`, entre otras:

1. cualquier puerta en `BLOQUEADO`;
2. puerta faltante;
3. puerta duplicada;
4. referencia irresoluble;
5. evidencia obsoleta;
6. inconsistencia de candidato;
7. inconsistencia de ambiente;
8. inconsistencia de alcance;
9. autoridad final no resoluble;
10. correlación entre `OWN-*` y actor de decisión no demostrable;
11. aceptación de riesgo expirada o pendiente de revalidación;
12. condición de suspensión obligatoria `NO_EVALUABLE`;
13. baseline requerida que ya no cubre el alcance;
14. cambio material pendiente de reevaluación;
15. evidencia de decisión incompleta;
16. hora de decisión no demostrable cuando sea necesaria para probar que ocurrió antes de exposición;
17. dependencia necesaria para determinar readiness temporalmente inaccesible;
18. cualquier situación en la que todavía no exista evidencia suficiente para decidir sin falsear el expediente.

Todo bloqueo deberá conservar propietario, puerta o tarea responsable y condición verificable de salida.

---

#### 22. Handoff de fallos y bloqueos

`READY-GATE-015` no crea una tarea genérica de corrección.

Para cada impedimento deberá conservar:

- `gate_id` o fuente exacta;
- resultado;
- motivo;
- propietario ya definido por la puerta o paquete;
- tarea responsable existente;
- condición de salida;
- evidencia requerida para reevaluación.

Si el impedimento proviene de `READY-GATE-001..014`, la resolución pertenece a la puerta o dependencia propietaria que produjo el resultado.

No se reasignan propietarios para acelerar la entrada.

---

#### 23. Prohibición de aprobación parcial

No se permite:

- aprobar una sede y registrar la decisión como aprobación de todas las sedes;
- aprobar una cohorte y registrar la decisión como aprobación de toda la población;
- aprobar un ambiente y reutilizar la decisión en otro;
- aprobar un candidato y reutilizar la decisión para otro release;
- aprobar solo las puertas técnicas y omitir las operativas;
- aprobar solo las puertas operativas y omitir las técnicas;
- ignorar una puerta porque “no parece relevante” sin `NO_APLICA` válido;
- condicionar la corrección de un `FAIL` a “resolver durante el piloto”.

Cuando el piloto permita exposición parcial, el `scope_ref` de la decisión deberá representar exactamente ese alcance y no uno mayor.

---

#### 24. Alcance autorizado

Una `APROBAR_ENTRADA` deberá fijar expresamente:

- `package_id`;
- candidato;
- ambiente;
- sedes;
- áreas;
- población;
- cohorte;
- actores;
- dispositivos;
- capacidades;
- integraciones;
- ventana o vigencia de la decisión cuando corresponda;
- cualquier limitación heredada del contrato de piloto.

La ausencia de una dimensión que el paquete no utiliza es válida únicamente cuando el expediente lo demuestra.

La decisión no puede ampliar el alcance definido por el diseño aprobado del piloto.

---

#### 25. Evidencia mínima de decisión

Una aprobación válida deberá conservar:

- `decision_id`;
- `package_id`;
- `candidate_ref`;
- `environment_ref`;
- `pilot_scope_ref`;
- `decision_owner_ref`;
- `decision_actor_ref`;
- `authority_evidence_ref`;
- versión de `required_entry_gate_set`;
- conteos de reconciliación;
- resultado de cada una de las catorce puertas;
- evidencia de vigencia;
- referencias de riesgo y suspensión;
- `decision`;
- motivo o síntesis de decisión;
- `decided_at`;
- evidencia durable de la aprobación;
- referencia al handoff de cutover cuando posteriormente exista.

No se exige copiar evidencias completas dentro del manifiesto cuando puedan conservarse mediante referencias íntegras y autorizadas.

---

#### 26. Evidencia aceptable

Podrán participar, cuando correspondan:

- manifiestos emitidos por cada puerta;
- registros versionados de CI;
- decisiones firmadas o registradas por actor autorizado;
- evidencia de correlación de responsable `OWN-*`;
- referencias a criterios de aceptación;
- referencias a baseline;
- referencias a risk readiness;
- evidencia de despliegue, migración, datos, configuración, soporte, observabilidad y recuperación ya aceptada por sus puertas propietarias;
- registros de fecha, candidato, ambiente y alcance;
- evidencia de reevaluación cuando ocurrió un cambio material.

La evidencia debe ser reproducible y atribuible al mismo expediente.

---

#### 27. Evidencia insuficiente por sí sola

No demuestra aprobación válida:

- un mensaje “listo”;
- un “ok” sin autoridad;
- una reunión celebrada;
- un dashboard en verde;
- una ausencia de alertas;
- una captura sin trazabilidad;
- un PR fusionado;
- CI verde sin resultados de readiness;
- una lista parcial de puertas;
- un riesgo aceptado;
- una firma sin alcance;
- una aprobación anterior para otro candidato;
- una decisión sin `decided_at`;
- una decisión posterior a la exposición presentada como previa;
- el hecho de que el piloto haya comenzado;
- una mayoría de puertas favorables;
- una recomendación técnica del ejecutor sin decisión del responsable autorizado.

---

#### 28. `pilot_entry_decision_manifest::<package_id>`

El manifiesto futuro deberá incluir, como mínimo:

- `package_id`;
- candidato;
- ambiente;
- alcance;
- versión del conjunto de puertas;
- `expected_gate_count = 14`;
- `materialized_gate_count`;
- `pass_count`;
- `fail_count`;
- `blocked_count`;
- `not_applicable_count`;
- `missing_gate_count`;
- `duplicate_gate_count`;
- `unresolved_gate_count`;
- `stale_gate_count`;
- `inconsistent_gate_count`;
- lista completa de `gate_id`;
- resultado por puerta;
- evidencia por puerta;
- `baseline_manifest_ref` cuando aplique;
- `risk_readiness_manifest_ref`;
- autoridad final;
- actor que decide;
- evidencia de autoridad;
- fecha de decisión;
- estado de exposición al momento de decidir;
- `pilot_entry_decision`;
- motivo;
- bloqueos y condiciones de salida cuando existan;
- referencia futura de handoff al cutover cuando proceda.

El manifiesto es el expediente mínimo de la decisión; no sustituye las evidencias propietarias de cada puerta.

---

#### 29. Regla de idempotencia documental de la decisión

Para el mismo:

```text
package_id
+ candidato
+ ambiente
+ scope_ref
+ versión del gate set
```

una reevaluación con las mismas evidencias no deberá producir decisiones contradictorias.

Si nueva evidencia cambia la decisión:

- deberá crearse una nueva versión o evento de decisión;
- deberá preservarse la decisión anterior;
- deberá registrarse la causa del cambio;
- no se sobrescribirá silenciosamente el historial.

Una decisión anterior denegada o bloqueada puede ser sucedida por una aprobación únicamente después de que los impedimentos estén resueltos y las puertas afectadas se reevaluen.

---

#### 30. Expiración y revocación práctica de la aprobación

La aprobación deja de ser utilizable para iniciar exposición cuando, antes del cutover:

- cambia materialmente el candidato;
- cambia el ambiente;
- cambia el alcance;
- expira una aceptación de riesgo necesaria;
- una condición de suspensión deja de ser evaluable;
- se detecta un nuevo `FAIL` o `BLOQUEADO`;
- una puerta se vuelve obsoleta;
- una autoridad deja de ser válida;
- aparece evidencia nueva incompatible con el expediente aprobado.

En ese caso no se “mantiene aprobada por historia”; deberá reevaluarse `READY-GATE-015::<package_id>` con las puertas afectadas actualizadas.

---

#### 31. Relación con `CUTOVER-OPS-001`

Una decisión `APROBAR_ENTRADA` produce un handoff documental elegible hacia la planificación de cutover.

`CUTOVER-OPS-001` seguirá siendo responsable de definir:

- fecha;
- ventana;
- responsables del cutover.

`READY-GATE-015` no decide esos valores.

Si la decisión es `DENEGAR_ENTRADA` o `BLOQUEAR_DECISION`, no existe handoff válido de entrada al piloto para esa instancia.

---

#### 32. Relación con `SHELL-CI-021` y `SHELL-CI-022`

`SHELL-CI-021::<package_id>` deberá:

1. ejecutar las comprobaciones de las puertas `READY-GATE-001..015`;
2. conservar evidencia;
3. reconciliar los resultados;
4. resolver la autoridad;
5. materializar el `pilot_entry_decision_manifest`;
6. impedir un `APROBAR_ENTRADA` cuando la regla determinista no se cumpla.

`SHELL-CI-022::<package_id>` solo podrá ejecutar cutover y piloto cuando el expediente de readiness aplicable permita la entrada y el plan de cutover correspondiente esté aprobado.

`READY-GATE-015` no ejecuta ninguna de esas tareas físicas.

---

#### 33. Separación con la salida del piloto

La aprobación de entrada responde únicamente:

> ¿Puede comenzar la exposición controlada definida por el piloto?

No responde:

- si el piloto fue exitoso;
- si debe ampliarse a `FULL`;
- si puede retirarse el proceso anterior;
- si el paquete está estabilizado;
- si puede cerrarse hypercare;
- si el paquete puede transferirse definitivamente a soporte.

Esas decisiones pertenecen a las tareas posteriores del bloque y al ciclo `SHELL-CI-022..024`.

---

#### 34. Seguridad, privacidad y segregación

El expediente final deberá conservar:

- mínimo acceso necesario;
- ausencia de secretos en el manifiesto;
- referencias a evidencia sensible en lugar de duplicarla cuando corresponda;
- segregación entre ejecución del checklist y autoridad de decisión cuando los contratos así lo requieran;
- trazabilidad de actor;
- trazabilidad de tiempo;
- integridad del expediente.

La autoridad final no obtiene privilegios técnicos adicionales por emitir la decisión.

---

#### 35. Requisitos de prueba derivados

**Resultado:** NO GENERA REQUISITOS DE PRUEBA

**Justificación:** `READY-GATE-015` materializa el contrato documental de integración y decisión final sobre resultados de readiness ya gobernados por `READY-GATE-001..014`, criterios de aceptación, evidencias y requisitos existentes. No introduce una nueva conducta empresarial ejecutable, no modifica autorización efectiva, datos, runtime, contratos de integración, reglas de cálculo ni transiciones de estado del producto. La ejecución futura del checklist y del piloto continúa protegida por los requisitos de prueba de los contratos que originan cada puerta.

**Requisitos creados:** 0  
**Requisitos modificados:** 0  
**Fragmentos 04A afectados:** 0

---

#### 36. Criterios de aceptación

`READY-GATE-015` queda documentalmente completa cuando:

1. define un universo fijo de exactamente catorce puertas previas;
2. materializa `READY-GATE-001..014` exactamente una vez en el conjunto esperado;
3. define los campos mínimos por puerta;
4. exige resultado, evidencia, vigencia y consistencia;
5. resuelve la autoridad desde el `Responsable de decisión` ya asignado al paquete;
6. conserva la identidad `OWN-*` cuando sea la identidad canónica vigente;
7. no crea un cargo universal nuevo;
8. separa ejecución del checklist de autoridad final;
9. impide que la autoridad final sobreescriba otra autoridad propietaria;
10. impide transformar `FAIL` o `BLOQUEADO` mediante riesgo aceptado;
11. define el efecto exacto de `PASS`, `FAIL`, `BLOQUEADO` y `NO_APLICA`;
12. exige vigencia de evidencia;
13. enumera cambios materiales que obligan a reevaluar;
14. exige coherencia de candidato;
15. exige coherencia de ambiente;
16. exige coherencia de alcance;
17. reconcilia `TOTAL_GATES_ESPERADOS = 14`;
18. exige cero faltantes;
19. exige cero duplicados;
20. exige cero referencias irresolubles;
21. exige cero puertas obsoletas para aprobación;
22. exige cero puertas inconsistentes para aprobación;
23. conserva `READY-GATE-014` como autoridad del riesgo residual;
24. conserva `READY-GATE-013` como autoridad de baseline;
25. prohíbe exposición previa a la autorización;
26. define `APROBAR_ENTRADA`;
27. define `DENEGAR_ENTRADA`;
28. define `BLOQUEAR_DECISION`;
29. define `NO_APLICA`;
30. establece cálculo determinista;
31. enumera condiciones de denegación;
32. enumera condiciones de bloqueo;
33. exige handoff con propietario, tarea y condición de salida;
34. prohíbe aprobación parcial presentada como total;
35. fija el alcance máximo autorizado;
36. define evidencia mínima de decisión;
37. diferencia evidencia aceptable e insuficiente;
38. materializa `pilot_entry_decision_manifest::<package_id>`;
39. preserva historial de reevaluaciones;
40. invalida reutilización automática ante cambios materiales;
41. separa la decisión de entrada de la planificación de cutover;
42. mantiene `CUTOVER-OPS-001` como siguiente tarea reservada;
43. separa entrada de salida del piloto;
44. no ejecuta cutover, piloto, rollback, migraciones, DDL/DML, backfills ni operaciones sobre Supabase;
45. crea cero requisitos de prueba y modifica cero requisitos existentes.

---

#### 37. Estado del resultado documental

| Resultado                                                                     | Estado                                                                              |
| ----------------------------------------------------------------------------- | ----------------------------------------------------------------------------------- |
| `required_entry_gate_set::<package_id>`                                       | `ESPECIFICADO`                                                                      |
| inventario fijo `READY-GATE-001..014`                                         | `MATERIALIZADO`                                                                     |
| resolución de autoridad final                                                 | `ESPECIFICADO` desde autoridad existente del paquete                                |
| separación ejecutor / decisor                                                 | `ESPECIFICADO`                                                                      |
| reglas de vigencia                                                            | `ESPECIFICADO`                                                                      |
| reconciliación cuantitativa                                                   | `ESPECIFICADO`                                                                      |
| algoritmo final de decisión                                                   | `ESPECIFICADO`                                                                      |
| condiciones de denegación                                                     | `ESPECIFICADO`                                                                      |
| condiciones de bloqueo                                                        | `ESPECIFICADO`                                                                      |
| `pilot_entry_decision_manifest::<package_id>`                                 | `ESPECIFICADO`                                                                      |
| decisión real por paquete implementado                                        | `PENDIENTE_DE_EVIDENCIA`                                                            |
| actor humano o técnico concreto detrás de cada `OWN-*` al momento de ejecutar | `PENDIENTE_DE_EVIDENCIA` de la instancia; debe resolverse desde el gobierno vigente |
| ejecución del checklist                                                       | `FUERA_DE_ALCANCE`; corresponde a `SHELL-CI-021::<package_id>`                      |
| selección de fecha y ventana de cutover                                       | `FUERA_DE_ALCANCE`; corresponde a `CUTOVER-OPS-001`                                 |
| ejecución de cutover y piloto                                                 | `FUERA_DE_ALCANCE`; corresponde a `SHELL-CI-022::<package_id>`                      |

La especificación documental no se presenta como autorización real de entrada para ningún paquete todavía no evaluado.

---

#### 38. Secuencia preservada

La secuencia física por paquete permanece:

```text
E5-GATE-008::<package_id>
→ SHELL-CI-020::<package_id>
→ BLOQUE R Y TAREAS FÍSICAS APLICABLES
→ SHELL-CI-021::<package_id>
→ SHELL-CI-022::<package_id>
→ SHELL-CI-023::<package_id>
→ SHELL-CI-024::<package_id>
```

`READY-GATE-015` diseña la decisión final consumida por `SHELL-CI-021`.

No ejecuta el siguiente paso.

---

#### 39. Continuidad

ÚLTIMA TAREA APROBADA
`READY-GATE-014 — Definir registro de riesgos aceptados y condiciones de suspensión`

TAREA ACTUAL APROBADA
`READY-GATE-015 — Definir autoridad y criterio para aprobar la entrada al piloto operativo`

SIGUIENTE TAREA RESERVADA
`CUTOVER-OPS-001 — Definir criterio para seleccionar fecha, ventana y responsables del cutover`


Salida obligatoria:

```text
READY-CHECKLIST APROBADO EN E5
        ↓
IMPLEMENTACIÓN DEL PAQUETE — SHELL-CI-020 + BLOQUE R APLICABLE
        ↓
EJECUCIÓN DEL CHECKLIST — SHELL-CI-021
        ↓
ENTRADA O SUSPENSIÓN DEL PILOTO
```
