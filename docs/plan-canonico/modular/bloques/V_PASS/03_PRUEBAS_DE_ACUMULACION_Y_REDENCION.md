### MINI-BLOQUE — PRUEBAS DE ACUMULACION Y REDENCION

<!-- PLAN-SECTION-META:START -->
Esta sección organiza **pruebas de acumulacion y redencion** dentro de **V PASS**. Agrupa tareas que producen un resultado funcional común y deben mantenerse juntas para conservar contexto, trazabilidad y orden de ejecución.

**Cobertura canónica:** `PASS-QA-001` a `PASS-QA-002` — 2 tareas.

**Resultado esperado:** al cerrar este mini-bloque, su resultado debe quedar definido, verificable y coherente con las secciones anterior y siguiente antes de avanzar.

**Contenido funcional:**

- `PASS-QA-001`: Probar flujo completo de acumulación
- `PASS-QA-002`: Probar flujo completo de redención
<!-- PLAN-SECTION-META:END -->

<!-- EXECUTION-GATE-RECONCILIATION:B801-974:PASS-QA -->
### Reconciliación topológica de PASS-QA-001 a PASS-QA-002

Estas tareas ejecutan pruebas completas sobre capacidades ya materializadas de acumulación y redención.

| modalidad | `PER_IMPLEMENTATION_UNIT` |
| gate temporal | `POST_E5_PACKAGE` |

### ✅ PASS-QA-001 — Probar flujo completo de acumulación

**Estado:** APROBADA
**Tarea anterior:** PASS-INT-005 — Evitar mezclar identidad cliente y trabajador
**Tarea siguiente:** PASS-QA-002 — Probar flujo completo de redención
**Tipo de tarea:** definición técnico-documental del contrato reusable de prueba completa de acumulación PULSO → PASS; fija precondiciones, fixtures, oráculos, matriz de escenarios, evidencia, reglas de PASS/FAIL, manejo de defectos y handoff para cada materialización física posterior, conservando `PER_IMPLEMENTATION_UNIT` con gate `POST_E5_PACKAGE` sin ejecutar todavía ninguna instancia
**Bloque:** BLOQUE V — PASS — PRUEBAS DE ACUMULACIÓN Y REDENCIÓN
**Repositorio propietario:** `vento-group-sas/vento-shell`
**Archivo propietario:** `docs/plan-canonico/modular/bloques/V_PASS/03_PRUEBAS_DE_ACUMULACION_Y_REDENCION.md`
**Estado físico resultante:** contrato completo de prueba E2E de acumulación definido; la ejecución real permanece pendiente por `implementation_unit_id` y solo puede ocurrir después del gate `POST_E5_PACKAGE`
**Cambios físicos autorizados:** ninguno durante esta tarea documental; no se ejecutan ventas, acumulaciones, escrituras de ledger/saldo, mutaciones Supabase, despliegues, datos productivos ni instancias físicas
**Requisitos de prueba creados o modificados:** 0

---

#### 1. Propósito

Definir cómo debe probarse de extremo a extremo una acumulación de puntos materializada para demostrar que un hecho empresarial elegible originado en PULSO produce exactamente un efecto autorizado, territorial, atómico, idempotente, auditable y reconciliable en PASS.

La prueba debe responder con evidencia, no por inferencia:

```text
¿LA OPERACION ORIGEN ES ELEGIBLE Y ESTABLE?
¿EL CLIENTE RESUELTO ES EL CORRECTO?
¿EL ACTOR, SEDE Y DISPOSITIVO ESTAN AUTORIZADOS?
¿LA REGLA APLICADA ES LA VIGENTE?
¿EXISTE EXACTAMENTE UN MOVIMIENTO DE LEDGER?
¿EL SALDO RESULTANTE CONVERGE CON ESE MOVIMIENTO?
¿UN RETRY O CONCURRENCIA DUPLICA PUNTOS?
¿UN RESULTADO DESCONOCIDO SE RECONCILIA SIN REINTENTO CIEGO?
¿PULSO Y PASS PRESENTAN EL MISMO RESULTADO EMPRESARIAL?
¿LA EVIDENCIA PERMITE RECONSTRUIR EL EFECTO SIN EXPONER SECRETOS?
```

El cierre documental de esta tarea define el contrato reusable de prueba. No afirma que una implementación concreta ya haya superado la prueba.

---

#### 2. Reconciliación topológica

`PASS-QA-001` pertenece al mini-bloque `PASS-QA-001..002` y conserva:

```text
MODE = PER_IMPLEMENTATION_UNIT
EXECUTION_GATE = POST_E5_PACKAGE
```

Consecuencias:

1. la definición documental del contrato de prueba se realiza una sola vez en este marcador;
2. cada materialización física se identifica por el `implementation_unit_id` canónico que corresponda;
3. una instancia no se ejecuta antes de que su capacidad esté realmente materializada y su gate E5 aplicable haya pasado;
4. cada ejecución física conserva autorización explícita y evidencia propia;
5. varios paquetes pueden consumir una misma unidad materializada mediante lineage sin convertir la prueba en una ejecución global única;
6. esta tarea documental no selecciona package, ambiente ni implementation unit por inferencia.

---

#### 3. Base documental consumida

La base inmediata es `PASS-INT-005`, que cierra el mini-bloque de integración de fidelización y entrega expresamente `PASS-QA-001` como siguiente tarea.

La prueba de acumulación consume sin reabrir:

- `PASS-INT-001`, contrato PULSO → PASS para acumulación;
- `PASS-INT-004`, frontera de identificación y administración de cliente;
- `PASS-INT-005`, separación de principal, identidad de dominio, actor efectivo, cliente e identidad laboral;
- la exigencia de autorización exacta, sede efectiva y actor/dispositivo atribuibles en la superficie PULSO relacionada con PASS;
- el principio de servidor como autoridad del efecto de fidelización;
- ledger inmutable y reconciliable como evidencia durable;
- saldo como proyección y no como única fuente de verdad;
- referencia idempotente estable derivada del hecho empresarial;
- resultado desconocido reconciliable sin retry ciego;
- estados de UI subordinados al resultado confirmado de servidor.

La prueba verifica la materialización de esos contratos. No redefine la política comercial de puntos ni crea otra fuente de fidelización.

---

#### 4. Resultado contractual de esta tarea

Se define:

```text
PASS_ACCUMULATION_E2E_TEST_CONTRACT = PASS_ACCUMULATION_E2E_CONTRACT_V1
```

Este contrato contiene:

- precondiciones de admisión de una instancia;
- fixture mínimo y datos controlados;
- baseline previo;
- oráculos empresariales y técnicos;
- secuencia completa del flujo feliz;
- matriz adversarial y de concurrencia;
- reglas de reconciliación;
- evidencia mínima obligatoria;
- clasificación de defectos;
- criterios de PASS, FAIL y BLOCKED;
- handoff exacto hacia `PASS-QA-002` sin ejecutar redención.

---

#### 5. Precondiciones para una ejecución física

Una instancia física de `PASS-QA-001` solo es ejecutable cuando pueda demostrar simultáneamente:

1. existe un `implementation_unit_id` canónico y trazable;
2. la capacidad de acumulación que se probará está materializada en los repositorios/servicios propietarios;
3. el gate `POST_E5_PACKAGE` aplicable está satisfecho;
4. existe ambiente autorizado para la prueba;
5. la configuración de reglas de fidelización que participará está identificada y versionada;
6. existe un actor de prueba autorizado con sede efectiva conocida;
7. cuando aplique dispositivo compartido, existe principal técnico, actor humano y dispositivo diferenciados;
8. existe cliente de prueba resoluble por el contrato canónico;
9. existe una compra o transacción elegible controlada y correlacionable;
10. puede capturarse baseline de ledger y saldo antes de ejecutar;
11. existe mecanismo de consulta/reconciliación posterior independiente del estado local de la UI;
12. la prueba puede ejecutarse sin utilizar secretos en claro ni datos personales productivos innecesarios;
13. existe procedimiento de limpieza o aislamiento de fixtures que no borre evidencia empresarial ya emitida;
14. ninguna dependencia crítica de autorización, persistencia o integración está en estado desconocido.

Si cualquiera de estas condiciones falta, la ejecución queda `BLOCKED` y no se sustituye por una simulación declarada como PASS.

---

#### 6. Fixture mínimo controlado

Cada ejecución deberá identificar, como mínimo:

| Elemento | Condición |
| --- | --- |
| `test_customer` | cliente canónico de prueba, aislado y resoluble por servidor |
| `test_actor` | trabajador/actor humano autorizado cuando aplique |
| `technical_principal` | principal técnico separado del actor humano cuando exista dispositivo compartido |
| `site` | sede efectiva y autorizada |
| `device` | dispositivo o estación identificable cuando el contrato lo exija |
| `business_event` | compra/transacción estable, elegible y correlacionable |
| `currency` | moneda esperada para el hecho empresarial |
| `eligible_amount` | monto validable por servidor, no controlado únicamente por UI |
| `loyalty_rule_version` | regla o versión vigente observable para el caso |
| `idempotency_identity` | identidad estable del efecto, reutilizable ante retry del mismo hecho |
| `ledger_baseline` | conjunto de movimientos previo a la prueba |
| `balance_baseline` | proyección de saldo previa a la prueba |

Los nombres anteriores son roles conceptuales del fixture, no nombres obligatorios de columnas o tipos físicos.

---

#### 7. Oráculos obligatorios

La ejecución debe contrastar al menos cinco oráculos independientes:

| Oráculo | Qué demuestra |
| --- | --- |
| `ORACLE-BUSINESS-EVENT` | el hecho empresarial origen existe, es elegible y coincide con la solicitud |
| `ORACLE-AUTHORIZATION` | actor, sesión, sede, permiso y dispositivo satisfacen la política aplicable |
| `ORACLE-LEDGER` | existe exactamente el movimiento esperado y no existe un duplicado equivalente |
| `ORACLE-BALANCE` | el saldo/proyección converge con los movimientos durables aplicables |
| `ORACLE-CROSS-APP` | PULSO y PASS muestran un resultado compatible con la misma verdad empresarial |

Una respuesta visual de PULSO, un toast o un saldo local no puede ser el único oráculo.

---

#### 8. Flujo feliz completo

La prueba base deberá recorrer:

```text
CAPTURAR BASELINE
→ RESOLVER CLIENTE
→ RESOLVER ACTOR / SEDE / DISPOSITIVO
→ IDENTIFICAR COMPRA ELEGIBLE
→ OBTENER O CONFIRMAR IDENTIDAD IDEMPOTENTE
→ SOLICITAR ACUMULACION
→ RECIBIR RESULTADO DE SERVIDOR
→ VERIFICAR LEDGER
→ VERIFICAR SALDO
→ VERIFICAR ATRIBUCION Y REGLA/VERSION
→ RELEER DESDE PASS
→ REINTENTAR MISMO HECHO
→ CONFIRMAR NO-OP IDEMPOTENTE
→ CONSERVAR EVIDENCIA
```

El primer éxito no cierra el caso hasta demostrar la no duplicación ante retry del mismo hecho.

---

#### 9. Matriz mínima de escenarios

| ID | Escenario | Resultado esperado |
| --- | --- | --- |
| `ACC_CASE_01` | acumulación feliz sobre compra elegible | un único movimiento durable y saldo coherente |
| `ACC_CASE_02` | retry secuencial del mismo hecho | mismo resultado durable; cero puntos adicionales |
| `ACC_CASE_03` | doble clic o envío duplicado | un único efecto empresarial |
| `ACC_CASE_04` | dos solicitudes concurrentes del mismo hecho | convergencia a un único efecto |
| `ACC_CASE_05` | misma identidad idempotente con payload incompatible | conflicto; ningún segundo movimiento |
| `ACC_CASE_06` | respuesta perdida después de commit | reconciliación devuelve el efecto existente sin duplicarlo |
| `ACC_CASE_07` | timeout antes de poder determinar resultado | estado desconocido hasta reconciliar; no éxito fabricado |
| `ACC_CASE_08` | actor sin permiso exacto | rechazo sin ledger ni cambio de saldo |
| `ACC_CASE_09` | actor válido pero sede fuera de alcance | rechazo sin efecto |
| `ACC_CASE_10` | sesión inválida o expirada | rechazo sin efecto |
| `ACC_CASE_11` | dispositivo compartido sin firma válida del actor | rechazo sin efecto y sin herencia de privilegios |
| `ACC_CASE_12` | cliente inexistente o formato manipulado | fail-closed; sin efecto |
| `ACC_CASE_13` | identidad cliente y laboral coexistentes | se usa identidad cliente correcta sin elevar autoridad laboral |
| `ACC_CASE_14` | cliente anterior permanece en estado local | limpiar/cambiar contexto impide acumular al sujeto anterior |
| `ACC_CASE_15` | compra no elegible | rechazo sin efecto |
| `ACC_CASE_16` | monto manipulado en UI | servidor usa/revalida fuente empresarial; no acepta efecto manipulado |
| `ACC_CASE_17` | moneda incompatible | rechazo o tratamiento contractual explícito; nunca cálculo silencioso |
| `ACC_CASE_18` | regla/version no vigente | no se confirma acumulación con regla inválida |
| `ACC_CASE_19` | ledger escrito pero saldo no converge | FAIL crítico de integridad |
| `ACC_CASE_20` | saldo cambia sin movimiento durable correspondiente | FAIL crítico de integridad |
| `ACC_CASE_21` | PULSO muestra éxito antes de confirmación servidor | FAIL de semántica de estado |
| `ACC_CASE_22` | PASS no refleja un movimiento confirmado tras ventana de consistencia permitida | FAIL o BLOCKED según evidencia del contrato materializado; nunca se oculta la divergencia |
| `ACC_CASE_23` | auditoría carece de actor, sede, dispositivo o correlación exigida | FAIL de trazabilidad |
| `ACC_CASE_24` | evidencia/log expone PIN, token o dato personal innecesario | FAIL de seguridad/privacidad |

`ACC_CASE_01..024` es el mínimo común. Una implementation unit puede añadir casos sin retirar ninguno aplicable.

---

#### 10. Idempotencia empresarial

La prueba debe demostrar que la protección se aplica al efecto empresarial y no solo a la petición HTTP.

Para el mismo `business_event`:

- el retry conserva la misma identidad idempotente;
- el servidor reconoce el resultado ya aplicado;
- no aparece un segundo movimiento de acumulación;
- el saldo no aumenta una segunda vez;
- la respuesta recuperada puede correlacionarse con el movimiento original;
- un payload materialmente distinto con la misma identidad se rechaza como conflicto.

Una clave regenerada por timestamp o aleatoriedad en cada intento no satisface el oráculo.

---

#### 11. Concurrencia

La ejecución deberá incluir una carrera controlada de dos o más solicitudes para el mismo hecho.

Criterio:

```text
N SOLICITUDES CONCURRENTES DEL MISMO HECHO
→ 1 EFECTO EMPRESARIAL DURABLE
→ 1 IDENTIDAD DE ACUMULACION
→ 0 DUPLICADOS
```

El resultado puede devolver éxito, ya aplicado o conflicto según el contrato físico, pero nunca varios efectos válidos para el mismo hecho.

---

#### 12. Autorización y territorialidad

Los casos negativos deben comprobar que una acumulación no se ejecuta únicamente porque la ruta PULSO sea accesible.

La prueba deberá variar, según aplicabilidad:

- sesión;
- acceso a PULSO;
- permiso exacto de acumulación;
- sede efectiva;
- actor humano;
- principal técnico;
- dispositivo;
- cambio de sede;
- contexto stale.

Un rechazo autorizado conserva cero cambios en ledger y saldo.

---

#### 13. Identidad cliente-trabajador

La prueba debe demostrar que:

```text
CUSTOMER_IDENTITY
!=
EMPLOYEE_IDENTITY
!=
AUTH_PRINCIPAL
!=
ACTOR_EFFECTIVE
```

Cuando una misma persona posea identidad cliente y laboral:

- la acumulación afecta a la identidad cliente resuelta por el proceso;
- la autorización de la acción proviene del actor laboral o principal correspondiente;
- una identidad no sustituye a la otra;
- correo, teléfono, nombre o coincidencia técnica no fusionan namespaces;
- cambiar de cliente obliga a resolver de nuevo el sujeto de la operación.

---

#### 14. Dispositivo compartido y atribución humana

Cuando la superficie use dispositivo compartido, la prueba deberá demostrar:

1. el principal técnico del dispositivo no se convierte en actor humano;
2. el trabajador firma o autentica la acción según el contrato aplicable;
3. la autorización efectiva corresponde al actor humano y su contexto;
4. el dispositivo, sede, actor y resultado quedan correlacionados;
5. el secreto de firma es efímero y no aparece en evidencia, logs o mensajes;
6. limpiar, cambiar cliente o terminar la operación no conserva el secreto para otra acción.

---

#### 15. Elegibilidad y regla de acumulación

La prueba no fija una tasa nueva de puntos.

Debe demostrar que la implementación materializada:

- obtiene la regla vigente desde su fuente autorizada;
- conserva evidencia suficiente de la regla o versión aplicada;
- revalida el hecho empresarial y monto elegible;
- rechaza o trata explícitamente una regla ausente, vencida o incompatible;
- no usa exclusivamente un cálculo del navegador como cantidad final;
- no permite que el operador establezca arbitrariamente el saldo final.

---

#### 16. Ledger y saldo

El oráculo de integridad deberá calcular el delta observado entre baseline y resultado.

Para un caso feliz:

```text
LEDGER_AFTER - LEDGER_BEFORE = 1 MOVIMIENTO ESPERADO
BALANCE_AFTER - BALANCE_BEFORE = EFECTO DERIVADO DEL MOVIMIENTO APLICABLE
```

Si la arquitectura materializada calcula el saldo por proyección dinámica, la prueba compara la proyección derivada con el ledger. Si mantiene una proyección persistida, debe demostrar coherencia entre ambas capas.

Queda prohibido corregir manualmente el saldo para hacer pasar la prueba.

---

#### 17. Resultado desconocido y reconciliación

La prueba debe forzar al menos un caso donde el cliente no pueda saber inmediatamente si el servidor aplicó el efecto.

Mientras el resultado sea desconocido:

```text
NO PRESENTAR EXITO DEFINITIVO
NO GENERAR UNA NUEVA IDENTIDAD PARA EL MISMO HECHO
NO AUMENTAR SALDO LOCAL COMO VERDAD
NO REPETIR CIEGAMENTE
```

La reconciliación consulta la misma identidad empresarial y termina en uno de estos resultados:

- aplicado y recuperado;
- ya aplicado / no-op;
- rechazado sin efecto;
- conflicto explícito;
- sigue sin poder demostrarse y permanece bloqueado para intervención.

---

#### 18. Semántica de estados de interfaz

La prueba deberá observar que la superficie distingue, según aplique:

- procesando;
- confirmado;
- ya aplicado;
- rechazado;
- conflicto;
- resultado desconocido;
- error recuperable.

Ningún estado visual puede preceder a su evidencia servidor cuando implique efecto empresarial confirmado.

---

#### 19. Convergencia PULSO ↔ PASS

Después de una acumulación confirmada, la prueba deberá releer la información desde la experiencia o proyección propietaria de PASS disponible para la unidad materializada.

Debe converger:

- identidad del cliente;
- movimiento de fidelización;
- cantidad aplicada;
- saldo/proyección resultante;
- sede o atribución permitida;
- correlación con el hecho origen cuando sea visible por contrato.

Una divergencia persistente entre PULSO y PASS es defecto, no una diferencia visual aceptable.

---

#### 20. Privacidad y minimización

La evidencia y la UI de prueba no deberán exponer más información que la necesaria.

Se verificará:

- ausencia de tokens y secretos;
- ausencia de PIN en claro;
- minimización de datos cliente;
- ausencia de datos laborales innecesarios en la experiencia cliente;
- ausencia de perfiles previos después de limpiar o cambiar sujeto;
- logs y screenshots redactados cuando contengan identificadores sensibles;
- correlación mediante identificadores técnicos seguros cuando sea posible.

---

#### 21. Paquete de evidencia por ejecución

Cada instancia física deberá producir evidencia suficiente para reconstruir la ejecución sin depender de memoria humana.

Campos conceptuales mínimos:

```text
TASK_ID
IMPLEMENTATION_UNIT_ID
PACKAGE_LINEAGE_APLICABLE
ENVIRONMENT
CANDIDATE_COMMIT_O_VERSION
TEST_RUN_ID
STARTED_AT
FINISHED_AT
ACTOR_REFERENCE
SITE_REFERENCE
DEVICE_REFERENCE_SI_APLICA
CUSTOMER_FIXTURE_REFERENCE
BUSINESS_EVENT_REFERENCE
IDEMPOTENCY_REFERENCE_REDACTADA
LOYALTY_RULE_VERSION
LEDGER_BASELINE_REFERENCE
LEDGER_RESULT_REFERENCE
BALANCE_BASELINE
BALANCE_RESULT
SCENARIOS_EXECUTED
FAILURES
DEFECT_REFERENCES
OVERALL_RESULT
EVIDENCE_LOCATIONS
```

La representación física puede variar; la información no puede omitirse si es necesaria para demostrar el resultado.

---

#### 22. Clasificación de resultados

Cada escenario termina en una sola clasificación:

| Estado | Significado |
| --- | --- |
| `PASS` | el oráculo se demostró con evidencia suficiente |
| `FAIL` | se observó una violación reproducible del contrato |
| `BLOCKED` | una precondición o dependencia impidió ejecutar o demostrar el caso |
| `NOT_APPLICABLE` | el escenario no pertenece a la implementation unit y existe justificación explícita |

`BLOCKED` no cuenta como PASS.

`NOT_APPLICABLE` no puede usarse para omitir idempotencia, atomicidad, autorización, ledger/saldo o resultado desconocido cuando la unidad realmente implementa acumulación.

---

#### 23. Manejo de defectos

Todo defecto conserva dueño y condición de salida.

| Familia de defecto | Propietario contractual primario | Condición de salida |
| --- | --- | --- |
| semántica de acumulación, ledger, saldo o retry | `PASS-INT-001` + unidad física propietaria | implementación corregida y escenario afectado repetido con evidencia |
| resolución/administración de cliente | `PASS-INT-004` + unidad física propietaria | identidad correcta demostrada sin fuga ni ambigüedad |
| mezcla cliente/trabajador/actor | `PASS-INT-005` + unidad física propietaria | namespaces y atribución corregidos y regresión repetida |
| autorización de superficie PULSO-PASS | `PULSO-AUTH-016` + unidad física propietaria | permiso/sede/actor revalidados y caso negativo sin efecto |
| comando de servidor | `AUTH-SRV-005` + unidad física propietaria | mutación protegida y resultados semánticos demostrados |
| atomicidad/persistencia | `AUTH-DB-021` + unidad física propietaria | invariantes de ledger/saldo pasan bajo éxito, fallo y concurrencia |
| evidencia de actor en dispositivo compartido | owners `AUTH-DEV-*` / `AUTH-SRV-*` aplicables + unidad física propietaria | atribución humana y secreto efímero demostrados |

La tarea documental no inventa una corrección técnica. Registra el defecto contra el owner ya existente y bloquea el cierre físico cuando afecte un criterio crítico.

---

#### 24. Regla de salida de una instancia

Una instancia física solo puede declararse `PASS` cuando:

1. todas sus precondiciones fueron verificadas;
2. `ACC_CASE_01..024` aplicables tienen resultado explícito;
3. no existe `FAIL` crítico abierto;
4. ningún `BLOCKED` oculta un caso crítico obligatorio;
5. se demostró exactamente un efecto para el hecho feliz;
6. se demostró no duplicación por retry y concurrencia;
7. se demostró autorización y territorialidad fail-closed;
8. se demostró integridad ledger/saldo;
9. se demostró reconciliación de resultado desconocido;
10. PULSO y PASS convergen sobre el mismo efecto empresarial;
11. la evidencia requerida es trazable al mismo candidate/version probado;
12. secretos y datos sensibles no fueron incorporados indebidamente a la evidencia.

Cualquier incumplimiento crítico deja la instancia en `FAIL` o `BLOCKED` según corresponda.

---

#### 25. Handoff hacia `PASS-QA-002`

`PASS-QA-001` entrega a la siguiente tarea:

- el patrón reusable de admisión por implementation unit;
- la estructura de fixture y baseline;
- el patrón de oráculos independientes;
- la disciplina de idempotencia y concurrencia;
- el tratamiento de resultado desconocido;
- el formato mínimo de evidencia;
- las reglas `PASS / FAIL / BLOCKED / NOT_APPLICABLE`;
- la disciplina de defectos con owner y condición de salida.

`PASS-QA-002` reutiliza esas reglas donde apliquen, pero conserva ownership exclusivo de la prueba completa de redención y sus estados de canje. Esta tarea no ejecuta ni anticipa redenciones.

---

#### 26. Requisitos de prueba derivados

**Resultado:** NO GENERA REQUISITOS DE PRUEBA

**Requisitos creados:** 0
**Requisitos modificados:** 0
**Requisitos diferidos:** 0
**Requisitos obsoletos:** 0
**Fragmentos del Registro 04A afectados:** 0

**Justificación:** el registro vigente ya contiene obligaciones explícitas para acumulación autorizada, atomicidad, ledger/saldo, idempotencia empresarial, identidad de cliente, territorialidad, actor/dispositivo, concurrencia, resultado confirmado de servidor y reconciliación. `PASS-QA-001` convierte esa cobertura y los contratos `PASS-INT-*` en un protocolo reusable de ejecución por implementation unit sin introducir una obligación material adicional.

---

#### 27. Cobertura de prueba vigente reutilizada

Sin modificar el Registro 04A, esta tarea reutiliza principalmente:

- `TREQ-PASS-008`, para que acumulación y demás efectos de puntos usen contratos de servidor autorizados, atómicos e idempotentes;
- `TREQ-PASS-010`, para ledger inmutable/reconciliable, evento origen, regla/version, saldo como proyección y retries sin duplicación;
- `TREQ-PASS-022`, para sesión, PULSO, sede efectiva y permisos exactos por acción;
- `TREQ-PASS-023`, para resolución segura de identidad cliente en servidor;
- `TREQ-PASS-024`, para proyección mínima y limpieza de datos cliente;
- `TREQ-PASS-025`, para acumulación autorizada, territorial, atómica e idempotente con compra, monto, moneda, regla, actor, dispositivo y referencia externa;
- `TREQ-PASS-026`, para identidad idempotente estable derivada del hecho empresarial;
- `TREQ-PASS-029`, para atribución humana en dispositivo compartido;
- `TREQ-PASS-030`, para secreto efímero del actor y limpieza segura;
- `TREQ-PASS-032`, para que procesamiento, éxito y error correspondan al resultado confirmado del servidor;
- `TREQ-INTEGRATION-003`, para retry, deduplicación y reconciliación distribuida.

Esta sección documenta trazabilidad sobre requisitos existentes; no representa actualización del Registro 04A.

---

#### 28. Evidencia de validación

| Clase | Estado | Evidencia |
| --- | --- | --- |
| BUILD | `NOT_EXECUTED` | La compilación documental real se ejecutará únicamente después de incorporar `PASS-QA-001` en el checkout mediante los scripts canónicos. |
| LOCAL | `NOT_EXECUTED` | El artefacto todavía no ha sido insertado en la rama de tarea para ejecutar formateador, quality, delivery check, topología y batería global. |
| REMOTA | `PASS` | Se verificaron en `vento-shell/main` protocolo, contrato de entrega, manifest, continuidad, topología `PER_IMPLEMENTATION_UNIT / POST_E5_PACKAGE`, archivo propietario PASS-QA, base `PASS-INT-001..005`, cobertura 04A PASS y scripts documentales vigentes. |
| OPERATIVA | `NOT_EXECUTED` | No se ejecutaron ventas, acumulaciones, retries, concurrencia, reconciliaciones ni sesiones reales de caja. |
| FÍSICA | `NOT_EXECUTED` | Ninguna instancia `PASS-QA-001` por implementation unit fue autorizada ni ejecutada durante esta tarea documental. |

---

#### 29. Criterios de aceptación

- [x] Se define un contrato reusable de prueba E2E para acumulación.
- [x] Se conserva `PER_IMPLEMENTATION_UNIT / POST_E5_PACKAGE` sin ejecutar físicamente la tarea documental.
- [x] Se definen catorce precondiciones de admisión de instancia.
- [x] Se define fixture mínimo con cliente, actor, principal, sede, dispositivo, hecho empresarial, regla, idempotencia, ledger y saldo.
- [x] Se definen cinco oráculos independientes.
- [x] Se define el flujo feliz completo desde baseline hasta retry idempotente.
- [x] Se definen veinticuatro escenarios mínimos `ACC_CASE_01..024`.
- [x] Se prueba idempotencia secuencial y concurrente.
- [x] Se prueba conflicto por misma identidad con payload incompatible.
- [x] Se prueba respuesta perdida y resultado desconocido.
- [x] Se prueban autorización, sede, sesión, actor y dispositivo fail-closed.
- [x] Se prueba separación cliente/trabajador/actor.
- [x] Se prueba elegibilidad del hecho, monto, moneda y regla vigente.
- [x] Se exige exactamente un movimiento esperado y saldo coherente.
- [x] Se impide confirmar éxito desde estado puramente visual.
- [x] Se exige convergencia PULSO ↔ PASS.
- [x] Se cubren privacidad y secreto efímero.
- [x] Se define paquete mínimo de evidencia por ejecución.
- [x] Se distinguen `PASS`, `FAIL`, `BLOCKED` y `NOT_APPLICABLE`.
- [x] Todo defecto tiene propietario contractual y condición de salida.
- [x] Se define una regla de salida fail-closed para cada instancia.
- [x] Se entrega handoff a `PASS-QA-002` sin ejecutar redención.
- [x] No se crean ni modifican requisitos de prueba.
- [x] No se modifica Registro 04A.
- [x] No se autoriza implementación física ni cambios de Supabase desde esta tarea documental.

---

#### 30. Límites

Esta tarea no:

- ejecuta una acumulación real;
- crea o selecciona un `implementation_unit_id`;
- selecciona un package;
- aprueba un gate E5;
- autoriza una instancia física;
- modifica PULSO, PASS o SHELL;
- implementa o modifica `awardLoyaltyPointsAction` ni un RPC de acumulación;
- modifica tablas, funciones, triggers, grants, RLS, Realtime, Auth, Storage, Edge Functions o migraciones de Supabase;
- define una tasa, multiplicador, promoción, redondeo o regla comercial nueva;
- modifica ledger o saldo;
- crea clientes, trabajadores, ventas o movimientos de prueba productivos;
- usa una respuesta de UI como evidencia suficiente del efecto;
- declara que el AS-IS ya satisface `PASS-INT-001`;
- sustituye `AUTH-QA-*`, `UX-QA-*` ni otras certificaciones transversales;
- ejecuta `PASS-QA-002`;
- prueba redención;
- modifica 04A;
- crea requisitos de prueba;
- convierte un `BLOCKED` en PASS;
- cruza el gate `POST_E5_PACKAGE` por inferencia documental.

---

#### 31. Continuidad

**ÚLTIMA TAREA APROBADA**
`PASS-INT-005 — Evitar mezclar identidad cliente y trabajador`

**TAREA ACTUAL APROBADA**
`PASS-QA-001 — Probar flujo completo de acumulación`

**SIGUIENTE TAREA RESERVADA**
`PASS-QA-002 — Probar flujo completo de redención`
### [ ] PASS-QA-002 — Probar flujo completo de redención
