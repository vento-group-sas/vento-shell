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
### ✅ PASS-QA-002 — Probar flujo completo de redención

**Estado:** APROBADA
**Tarea anterior:** PASS-QA-001 — Probar flujo completo de acumulación
**Tarea siguiente:** AURA-AUD-001 — Confirmar repositorio propietario
**Tipo de tarea:** definición técnico-documental del contrato reusable de prueba completa de redención PASS → PULSO → PASS; fija precondiciones, fixtures, oráculos, matriz de escenarios, evidencia, reglas de PASS/FAIL, manejo de defectos y handoff para cada materialización física posterior, conservando `PER_IMPLEMENTATION_UNIT` con gate `POST_E5_PACKAGE` sin ejecutar todavía ninguna instancia
**Bloque:** BLOQUE V — PASS — PRUEBAS DE ACUMULACIÓN Y REDENCIÓN
**Repositorio propietario:** `vento-group-sas/vento-shell`
**Archivo propietario:** `docs/plan-canonico/modular/bloques/V_PASS/03_PRUEBAS_DE_ACUMULACION_Y_REDENCION.md`
**Estado físico resultante:** contrato completo de prueba E2E de redención definido; la ejecución real permanece pendiente por `implementation_unit_id` y solo puede ocurrir después del gate `POST_E5_PACKAGE`
**Cambios físicos autorizados:** ninguno durante esta tarea documental; no se crean tickets reales, no se consumen redenciones, no se mutan ledger/saldo, no se modifica Supabase, no se despliega código ni se inicia una instancia física
**Requisitos de prueba creados o modificados:** 0

---

#### 1. Propósito

Definir cómo debe probarse de extremo a extremo una redención materializada para demostrar que una intención válida creada en PASS puede ser resuelta, autorizada y consumida desde PULSO exactamente una vez, dentro de la sede y vigencia permitidas, con estado, actor, dispositivo, ledger y saldo coherentes y con evidencia suficiente para reconciliar retries, concurrencia y resultados desconocidos.

La prueba debe responder con evidencia, no por inferencia:

```text
¿EL TICKET O INTENCION DE REDENCION EXISTE Y ES EL CORRECTO?
¿EL CLIENTE Y LA RECOMPENSA COINCIDEN CON LA INTENCION?
¿LA REDENCION ESTA VIGENTE Y EN ESTADO CONSUMIBLE?
¿LA SEDE, EL ACTOR Y EL DISPOSITIVO ESTAN AUTORIZADOS?
¿EL CONSUMO OCURRE EXACTAMENTE UNA VEZ?
¿EL LEDGER Y EL SALDO CONSERVAN EL EFECTO CORRECTO SIN DOBLE DEBITO?
¿UN RETRY O DOS CAJAS PUEDEN CONSUMIR DOS VECES EL MISMO TICKET?
¿UN RESULTADO DESCONOCIDO SE RECONCILIA SIN CREAR UN SEGUNDO EFECTO?
¿PULSO Y PASS CONVERGEN SOBRE EL MISMO ESTADO DE REDENCION?
¿LA EVIDENCIA PERMITE AUDITAR EL CANJE SIN EXPONER SECRETOS?
```

El cierre documental de esta tarea define el contrato reusable de prueba. No afirma que una implementación concreta ya haya superado la prueba.

---

#### 2. Reconciliación topológica

`PASS-QA-002` pertenece al mini-bloque `PASS-QA-001..002` y conserva:

```text
MODE = PER_IMPLEMENTATION_UNIT
EXECUTION_GATE = POST_E5_PACKAGE
```

Consecuencias:

1. la definición documental del contrato de prueba se realiza una sola vez en este bloque;
2. cada materialización física se identifica por el `implementation_unit_id` canónico que corresponda;
3. una instancia no se ejecuta antes de que la capacidad de redención esté materializada y su gate E5 aplicable haya pasado;
4. cada ejecución física conserva autorización explícita y evidencia propia;
5. varios paquetes pueden consumir una misma unidad materializada mediante lineage sin convertir la prueba en una certificación global única;
6. esta tarea documental no selecciona package, ambiente ni implementation unit por inferencia.

---

#### 3. Base documental consumida

La base inmediata es `PASS-QA-001`, que deja aprobado el patrón reusable de admisión por implementation unit, fixtures, baselines, oráculos independientes, idempotencia, concurrencia, resultado desconocido, evidencia, clasificación `PASS / FAIL / BLOCKED / NOT_APPLICABLE` y manejo de defectos.

La prueba de redención consume además, sin reabrir:

- `PASS-INT-002`, contrato PULSO → PASS para validación y consumo de redenciones;
- `PASS-INT-003`, frontera de administración laboral de productos y recompensas;
- `PASS-INT-004`, frontera de identidad y administración de cliente;
- `PASS-INT-005`, separación de principal, identidad de dominio, actor efectivo, cliente e identidad laboral;
- la separación entre crear una intención de redención en PASS y consumirla desde PULSO;
- la exigencia de permiso exacto, sede efectiva y actor/dispositivo atribuibles;
- el principio de servidor como autoridad del estado de redención y del efecto de fidelización;
- ledger inmutable y reconciliable como evidencia durable;
- saldo como proyección y no como única fuente de verdad;
- uso único e idempotencia de consumo;
- resultado desconocido reconciliable sin retry ciego;
- estados de UI subordinados al resultado confirmado de servidor.

La prueba verifica la materialización de esos contratos. No redefine catálogo, costo, elegibilidad, vigencia ni política comercial de recompensas.

---

#### 4. Resultado contractual de esta tarea

Se define:

```text
PASS_REDEMPTION_E2E_TEST_CONTRACT = PASS_REDEMPTION_E2E_CONTRACT_V1
```

Este contrato contiene:

- precondiciones de admisión de una instancia;
- fixture mínimo y datos controlados;
- baseline previo del ticket, ledger y saldo;
- oráculos empresariales y técnicos;
- secuencia completa del flujo feliz;
- matriz adversarial, de expiración y de concurrencia;
- reglas de reconciliación;
- evidencia mínima obligatoria;
- clasificación de defectos;
- criterios de PASS, FAIL y BLOCKED;
- cierre del mini-bloque PASS-QA y handoff a `AURA-AUD-001`.

---

#### 5. Precondiciones para una ejecución física

Una instancia física de `PASS-QA-002` solo es ejecutable cuando pueda demostrar simultáneamente:

1. existe un `implementation_unit_id` canónico y trazable;
2. la capacidad de creación y consumo de redención que se probará está materializada en sus repositorios/servicios propietarios;
3. el gate `POST_E5_PACKAGE` aplicable está satisfecho;
4. existe ambiente autorizado para la prueba;
5. existe una recompensa o beneficio controlado cuya regla y vigencia sean identificables;
6. existe un cliente de prueba canónico y resoluble;
7. existe una intención o ticket de redención de prueba emitido mediante el contrato materializado;
8. el estado inicial de la redención es conocido y auditable;
9. existe un actor de prueba autorizado con sede efectiva conocida;
10. cuando aplique dispositivo compartido, principal técnico, actor humano y dispositivo están diferenciados;
11. puede capturarse baseline de redención, ledger y saldo antes del consumo;
12. existe mecanismo de consulta/reconciliación posterior independiente del estado local de la UI;
13. la prueba puede ejecutarse sin secretos en claro ni datos personales productivos innecesarios;
14. ninguna dependencia crítica de autorización, persistencia, recompensa, identidad o integración está en estado desconocido.

Si cualquiera de estas condiciones falta, la ejecución queda `BLOCKED` y no se sustituye por una simulación declarada como PASS.

---

#### 6. Fixture mínimo controlado

Cada ejecución deberá identificar, como mínimo:

| Elemento | Condición |
| --- | --- |
| `test_customer` | cliente canónico de prueba y dueño de la intención |
| `test_reward` | recompensa o beneficio exacto asociado a la intención |
| `test_redemption` | ticket/intención estable, trazable y de un solo uso |
| `test_actor` | trabajador/actor humano autorizado cuando aplique |
| `technical_principal` | principal técnico separado del actor humano cuando exista dispositivo compartido |
| `site` | sede efectiva y compatible con la redención |
| `device` | dispositivo o estación identificable cuando el contrato lo exija |
| `redemption_state_baseline` | estado inicial durable antes del consumo |
| `redemption_expiry` | vigencia observable para el caso |
| `consumption_identity` | identidad estable del intento empresarial de consumo cuando aplique |
| `ledger_baseline` | movimientos de fidelización previos a la prueba |
| `balance_baseline` | saldo/proyección previa a la prueba |

Los nombres anteriores son roles conceptuales del fixture, no nombres obligatorios de columnas o tipos físicos.

---

#### 7. Oráculos obligatorios

La ejecución debe contrastar al menos cinco oráculos independientes:

| Oráculo | Qué demuestra |
| --- | --- |
| `ORACLE-REDEMPTION-INTENT` | ticket, cliente, recompensa, estado, vigencia y territorio corresponden a la intención emitida |
| `ORACLE-AUTHORIZATION` | sesión, actor, sede, permiso y dispositivo satisfacen la política aplicable |
| `ORACLE-CONSUMPTION` | la redención cambia al resultado durable correcto exactamente una vez |
| `ORACLE-LEDGER-BALANCE` | ledger y saldo/proyección permanecen coherentes y no existe doble débito o efecto duplicado |
| `ORACLE-CROSS-APP` | PULSO y PASS muestran estados compatibles con la misma verdad empresarial |

Una lectura correcta del QR, un toast o un estado local no puede ser el único oráculo.

---

#### 8. Flujo feliz completo

La prueba base deberá recorrer:

```text
CAPTURAR BASELINE
→ RESOLVER TICKET / INTENCION
→ VERIFICAR CLIENTE Y RECOMPENSA
→ VERIFICAR ESTADO Y VIGENCIA
→ RESOLVER ACTOR / SEDE / DISPOSITIVO
→ SOLICITAR VALIDACION Y CONSUMO
→ RECIBIR RESULTADO DE SERVIDOR
→ VERIFICAR TRANSICION DURABLE DE REDENCION
→ VERIFICAR LEDGER
→ VERIFICAR SALDO / PROYECCION
→ VERIFICAR ATRIBUCION
→ RELEER DESDE PASS
→ REINTENTAR EL MISMO CONSUMO
→ CONFIRMAR NO-OP O RESULTADO IDEMPOTENTE
→ CONSERVAR EVIDENCIA
```

El primer éxito no cierra el caso hasta demostrar que el mismo ticket no puede producir un segundo consumo.

---

#### 9. Matriz mínima de escenarios

| ID | Escenario | Resultado esperado |
| --- | --- | --- |
| `RED_CASE_01` | redención válida, vigente y consumible | un único consumo durable y estado final coherente |
| `RED_CASE_02` | retry secuencial del mismo consumo | mismo resultado durable; cero segundo consumo |
| `RED_CASE_03` | doble clic o envío duplicado | un único efecto empresarial |
| `RED_CASE_04` | dos solicitudes concurrentes sobre el mismo ticket | un único consumo válido |
| `RED_CASE_05` | misma identidad de consumo con payload incompatible | conflicto; ningún segundo efecto |
| `RED_CASE_06` | respuesta perdida después del commit | reconciliación devuelve el resultado existente sin repetir consumo |
| `RED_CASE_07` | timeout antes de determinar resultado | estado desconocido hasta reconciliar; no éxito fabricado |
| `RED_CASE_08` | actor sin permiso exacto | rechazo sin cambiar redención, ledger ni saldo |
| `RED_CASE_09` | sede efectiva incompatible | rechazo sin efecto |
| `RED_CASE_10` | sesión inválida o expirada | rechazo sin efecto |
| `RED_CASE_11` | dispositivo compartido sin firma válida del actor | rechazo sin efecto y sin herencia de privilegios |
| `RED_CASE_12` | código inexistente, manipulado o de otra entidad | fail-closed; sin efecto |
| `RED_CASE_13` | misma persona con identidad cliente y laboral | cliente y actor se mantienen en namespaces separados |
| `RED_CASE_14` | cambio de modo o ticket conserva estado anterior | el estado incompatible se limpia antes de procesar otra operación |
| `RED_CASE_15` | ticket ya usado | no-op/rechazo idempotente; cero segundo consumo |
| `RED_CASE_16` | ticket cancelado | rechazo sin efecto |
| `RED_CASE_17` | ticket vencido o expirado | rechazo sin efecto |
| `RED_CASE_18` | cliente o recompensa no coincide con la intención | rechazo sin mutación |
| `RED_CASE_19` | ledger/saldo previo no es coherente con la intención | no consumir a ciegas; FAIL o BLOCKED según evidencia materializada |
| `RED_CASE_20` | consumo genera segundo débito o segundo movimiento económico | FAIL crítico de integridad |
| `RED_CASE_21` | PULSO muestra éxito antes de confirmación servidor | FAIL de semántica de estado |
| `RED_CASE_22` | PASS no refleja estado usado tras la ventana de consistencia permitida | FAIL o BLOCKED según evidencia; nunca se oculta la divergencia |
| `RED_CASE_23` | auditoría carece de actor, sede, dispositivo o correlación exigida | FAIL de trazabilidad |
| `RED_CASE_24` | evidencia/log expone PIN, token o dato personal innecesario | FAIL de seguridad/privacidad |

`RED_CASE_01..024` es el mínimo común. Una implementation unit puede añadir casos sin retirar ninguno aplicable.

---

#### 10. Uso único e idempotencia empresarial

La prueba debe demostrar que la protección se aplica al consumo empresarial, no solo a la petición HTTP.

Para el mismo `test_redemption`:

- el retry conserva la identidad de consumo aplicable;
- el servidor reconoce el resultado ya aplicado;
- no aparece una segunda transición a usada;
- no se genera un segundo débito, reserva o movimiento equivalente;
- el resultado recuperado puede correlacionarse con el consumo original;
- un payload materialmente distinto con la misma identidad se rechaza como conflicto.

La mera ocultación del botón después del primer uso no satisface el oráculo.

---

#### 11. Concurrencia

La ejecución deberá incluir una carrera controlada de dos o más solicitudes sobre el mismo ticket.

Criterio:

```text
N SOLICITUDES CONCURRENTES SOBRE LA MISMA REDENCION
→ 1 CONSUMO EMPRESARIAL DURABLE
→ 1 ESTADO FINAL USADO O EQUIVALENTE
→ 0 DOBLE DEBITO
→ 0 SEGUNDO BENEFICIO ENTREGADO POR EL CONTRATO
```

El resultado puede devolver confirmado, ya usado o conflicto según el contrato físico, pero nunca varios consumos válidos del mismo ticket.

---

#### 12. Estado, vigencia y territorialidad

La prueba deberá variar de forma controlada:

- estado consumible;
- estado ya usado;
- cancelación;
- expiración;
- recompensa incompatible;
- cliente incompatible;
- sede compatible;
- sede fuera de alcance;
- regla o versión aplicable cuando gobierne la elegibilidad.

Una redención no consumible debe conservarse sin nuevo efecto y con una razón verificable.

La sede enviada por cliente no se acepta como autoridad suficiente si contradice la sede efectiva resuelta por servidor.

---

#### 13. Autorización y actor efectivo

Los casos negativos deben demostrar que poseer el código de redención no concede autoridad para consumirlo.

La prueba deberá variar, según aplicabilidad:

- sesión;
- acceso a PULSO;
- permiso exacto de redención;
- sede efectiva;
- actor humano;
- principal técnico;
- dispositivo;
- contexto stale;
- cambio de actor durante la operación.

Un rechazo de autorización conserva la redención sin consumo y no altera ledger o saldo.

---

#### 14. Identidad cliente-trabajador

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

- la intención pertenece a la identidad cliente correcta;
- el consumo se atribuye al actor laboral autorizado;
- una identidad no sustituye a la otra;
- correo, teléfono, nombre o coincidencia técnica no fusionan namespaces;
- el operador no puede cambiar el cliente dueño del ticket durante el consumo.

---

#### 15. Dispositivo compartido y secreto efímero

Cuando la superficie use dispositivo compartido, la prueba deberá demostrar:

1. el principal técnico del dispositivo no se convierte en actor humano;
2. el trabajador firma o autentica la acción según el contrato aplicable;
3. la autorización efectiva corresponde al actor humano y su contexto;
4. dispositivo, sede, actor, redención y resultado quedan correlacionados;
5. PIN o firma son efímeros y no aparecen en evidencia, logs o mensajes;
6. limpiar, cambiar modo, cambiar ticket o terminar la operación no conserva el secreto para otra acción.

---

#### 16. Ledger, saldo y efecto económico

La prueba debe capturar baseline y resultado para demostrar que consumir una intención no vuelve a cobrar el costo de puntos cuando ese efecto ya fue debitado o reservado conforme al contrato materializado.

Para el caso feliz se debe poder demostrar:

```text
REDEMPTION_STATE_AFTER = USADA O ESTADO FINAL EQUIVALENTE
LEDGER_AFTER = LEDGER_BEFORE + EFECTO ESPERADO SIN DUPLICADO
BALANCE_AFTER = PROYECCION COHERENTE CON EL LEDGER Y LA POLITICA MATERIALIZADA
```

Si la intención usa reserva en lugar de débito previo, la prueba verifica la resolución correcta de esa reserva sin inventar una política distinta.

Una discrepancia entre ticket, ledger y saldo es defecto; no se corrige manualmente para hacer pasar el caso.

---

#### 17. Resultado desconocido y reconciliación

La prueba debe forzar al menos un caso donde PULSO no pueda saber inmediatamente si el servidor consumió la redención.

Mientras el resultado sea desconocido:

```text
NO PRESENTAR CANJE CONFIRMADO
NO MARCAR EL TICKET COMO DISPONIBLE DESDE CLIENTE
NO CREAR UN SEGUNDO TICKET
NO APLICAR OTRO DEBITO
NO REPETIR CON IDENTIDAD NUEVA
```

La reconciliación termina en uno de estos resultados:

- consumido y recuperado;
- ya consumido / no-op idempotente;
- rechazado sin efecto;
- todavía consumible porque el primer intento no produjo efecto;
- conflicto explícito;
- sigue sin poder demostrarse y permanece bloqueado para intervención autorizada.

---

#### 18. Semántica de estados de interfaz

La prueba deberá observar que la superficie distingue, según aplique:

- resolviendo ticket;
- verificando elegibilidad;
- esperando autorización;
- procesando;
- confirmado;
- ya usado;
- denegado;
- inválido;
- vencido;
- conflicto;
- resultado desconocido;
- error recuperable.

Ningún estado visual puede preceder a su evidencia servidor cuando implique consumo confirmado.

---

#### 19. Frontera de `/scanner` y limpieza de estado

Mientras identificación y redención compartan el mismo contenedor runtime de PULSO, la prueba debe verificar que cambiar de modo limpia estado incompatible y no crea una segunda superficie ficticia.

Al cambiar de modo o sujeto se limpia, según aplique:

- código previo;
- cliente previo;
- monto o referencia de acumulación;
- ticket anterior;
- mensajes previos;
- credencial efímera;
- estado de procesamiento.

Una operación posterior no puede reutilizar accidentalmente el ticket, cliente o actor de la operación anterior.

---

#### 20. Convergencia PULSO ↔ PASS

Después de un consumo confirmado, la prueba deberá releer la redención desde la experiencia o proyección propietaria de PASS disponible para la unidad materializada.

Debe converger:

- identidad de redención;
- identidad del cliente;
- recompensa o beneficio;
- estado final;
- vigencia relevante;
- ledger/efecto de fidelización asociado;
- saldo/proyección resultante cuando aplique;
- evidencia de sede/actor permitida por contrato.

Una divergencia persistente entre PULSO y PASS es defecto, no una diferencia visual aceptable.

---

#### 21. Privacidad y minimización

La evidencia y la UI de prueba no deberán exponer más información que la necesaria.

Se verificará:

- ausencia de tokens y secretos;
- ausencia de PIN en claro;
- minimización de datos del cliente;
- ausencia de datos laborales innecesarios en la experiencia cliente;
- ausencia de ticket o cliente anterior después de limpiar/cambiar contexto;
- logs y screenshots redactados cuando contengan identificadores sensibles;
- correlación mediante identificadores técnicos seguros cuando sea posible.

---

#### 22. Paquete de evidencia por ejecución

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
REWARD_FIXTURE_REFERENCE
REDEMPTION_REFERENCE_REDACTADA
REDEMPTION_STATE_BEFORE
REDEMPTION_STATE_AFTER
CONSUMPTION_IDENTITY_REFERENCE
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

#### 23. Clasificación de resultados

Cada escenario termina en una sola clasificación:

| Estado | Significado |
| --- | --- |
| `PASS` | el oráculo se demostró con evidencia suficiente |
| `FAIL` | se observó una violación reproducible del contrato |
| `BLOCKED` | una precondición o dependencia impidió ejecutar o demostrar el caso |
| `NOT_APPLICABLE` | el escenario no pertenece a la implementation unit y existe justificación explícita |

`BLOCKED` no cuenta como PASS.

`NOT_APPLICABLE` no puede usarse para omitir uso único, atomicidad, autorización, territorio, estados inválidos, ledger/saldo o resultado desconocido cuando la unidad realmente implementa redención.

---

#### 24. Manejo de defectos

Todo defecto conserva dueño y condición de salida.

| Familia de defecto | Propietario contractual primario | Condición de salida |
| --- | --- | --- |
| semántica de ticket, estado, uso único o reconciliación | `PASS-INT-002` + unidad física propietaria | implementación corregida y escenario afectado repetido con evidencia |
| producto/recompensa o elegibilidad administrada | `PASS-INT-003` + unidad física propietaria | recompensa/regla reconciliada y caso repetido |
| resolución o proyección de cliente | `PASS-INT-004` + unidad física propietaria | identidad correcta demostrada sin fuga ni ambigüedad |
| mezcla cliente/trabajador/actor | `PASS-INT-005` + unidad física propietaria | namespaces y atribución corregidos y regresión repetida |
| autorización operacional de redención | `PULSO-AUTH-010` + unidad física propietaria | permiso/sede/actor revalidados y caso negativo sin efecto |
| comando de servidor y resultado semántico | `AUTH-SRV-005` + unidad física propietaria | mutación protegida y resultados semánticos demostrados |
| concurrencia, persistencia, ledger o saldo | `PASS-INT-002` + unidad física propietaria | uso único e invariantes económicas pasan bajo éxito, fallo y carrera |
| actor en dispositivo compartido | owners `AUTH-DEV-*` / `AUTH-SRV-*` aplicables + unidad física propietaria | atribución humana y secreto efímero demostrados |

La tarea documental no inventa una corrección técnica. Registra el defecto contra el owner ya existente y bloquea el cierre físico cuando afecte un criterio crítico.

---

#### 25. Regla de salida de una instancia

Una instancia física solo puede declararse `PASS` cuando:

1. todas sus precondiciones fueron verificadas;
2. `RED_CASE_01..024` aplicables tienen resultado explícito;
3. no existe `FAIL` crítico abierto;
4. ningún `BLOCKED` oculta un caso crítico obligatorio;
5. se demostró exactamente un consumo para el ticket feliz;
6. se demostró imposibilidad de segundo consumo por retry y concurrencia;
7. se demostró rechazo de usado, cancelado, vencido e inválido;
8. se demostró autorización y territorialidad fail-closed;
9. se demostró integridad de estado, ledger y saldo;
10. se demostró reconciliación de resultado desconocido;
11. PULSO y PASS convergen sobre el mismo estado empresarial;
12. la evidencia requerida es trazable al mismo candidate/version probado;
13. secretos y datos sensibles no fueron incorporados indebidamente a la evidencia.

Cualquier incumplimiento crítico deja la instancia en `FAIL` o `BLOCKED` según corresponda.

---

#### 26. Cierre del mini-bloque PASS-QA

`PASS-QA-002` cierra documentalmente el mini-bloque `PASS-QA-001..002` con dos contratos complementarios:

```text
PASS-QA-001 = ACUMULACION
PASS-QA-002 = REDENCION
```

Ambos comparten:

- admisión por implementation unit;
- gate `POST_E5_PACKAGE`;
- fixtures controlados;
- baselines;
- oráculos independientes;
- idempotencia y concurrencia;
- resultado desconocido;
- evidencia trazable;
- clasificación `PASS / FAIL / BLOCKED / NOT_APPLICABLE`;
- defectos con owner y condición de salida.

El cierre documental del bloque no equivale a certificación física global de PASS. Cada implementation unit conserva su ejecución y autorización posterior.

---

#### 27. Handoff hacia `AURA-AUD-001`

Después de cerrar `PASS-QA-002`, la ruta normal abandona PHASE-10-PASS y continúa en PHASE-12-AURA con:

`AURA-AUD-001 — Confirmar repositorio propietario`

El handoff conserva únicamente continuidad documental. No transfiere a AURA ownership de acumulación, redención, ledger, saldo, recompensas runtime ni contratos PULSO-PASS.

La entrada a AURA comienza por auditoría de existencia y propiedad del producto; no por implementación, campaña ni integración física.

---

#### 28. Requisitos de prueba derivados

**Resultado:** NO GENERA REQUISITOS DE PRUEBA

**Requisitos creados:** 0
**Requisitos modificados:** 0
**Requisitos diferidos:** 0
**Requisitos obsoletos:** 0
**Fragmentos del Registro 04A afectados:** 0

**Justificación:** el registro vigente ya contiene obligaciones explícitas para redención autorizada, uso único, atomicidad, idempotencia, estado consumible, vigencia, sede, actor, dispositivo, secreto efímero, ledger/saldo, confirmación de servidor, retry, concurrencia y reconciliación. `PASS-QA-002` convierte esa cobertura y los contratos `PASS-INT-*` en un protocolo reusable de ejecución por implementation unit sin introducir una obligación material adicional.

---

#### 29. Cobertura de prueba vigente reutilizada

Sin modificar el Registro 04A, esta tarea reutiliza principalmente:

- `TREQ-PASS-008`, para mutaciones de puntos y redención únicamente mediante contratos de servidor autorizados, atómicos e idempotentes;
- `TREQ-PASS-010`, para ledger inmutable/reconciliable, reglas/versiones y reintentos sin duplicación;
- `TREQ-PASS-022`, para sesión válida, acceso PULSO, sede efectiva y permisos exactos por acción;
- `TREQ-PASS-027`, para código, cliente, recompensa, sede, estado consumible, vigencia, saldo debitado/reservado, actor efectivo, uso único y transición atómica/idempotente;
- `TREQ-PASS-028`, para conservar identificación y redención como modos subordinados de `/scanner` y limpiar estado incompatible al cambiar de modo;
- `TREQ-PASS-029`, para atribución humana en dispositivo compartido;
- `TREQ-PASS-030`, para secreto efímero del actor y limpieza segura;
- `TREQ-PASS-032`, para que procesamiento, éxito y error correspondan al resultado confirmado del servidor;
- `TREQ-INTEGRATION-003`, para identidad estable, retry, deduplicación, resultado durable, resultado desconocido y conciliación.

Esta sección documenta trazabilidad sobre requisitos existentes; no representa actualización del Registro 04A.

---

#### 30. Evidencia de validación

| Clase | Estado | Evidencia |
| --- | --- | --- |
| BUILD | `NOT_EXECUTED` | La compilación documental real se ejecutará únicamente después de incorporar `PASS-QA-002` en el checkout mediante los scripts canónicos. |
| LOCAL | `NOT_EXECUTED` | El artefacto todavía no ha sido insertado en la rama de tarea para ejecutar formateador, quality, delivery check, topología y batería global. |
| REMOTA | `PASS` | Se verificaron en `vento-shell/main` protocolo, contrato de entrega, manifest, continuidad, topología `PER_IMPLEMENTATION_UNIT / POST_E5_PACKAGE`, archivo propietario PASS-QA, contrato `PASS-INT-002`, handoff de `PASS-INT-005`, cobertura 04A PASS y scripts documentales vigentes; además se comparó la versión completa aprobada de `PASS-QA-001` usada como base de continuidad anticipada. |
| OPERATIVA | `NOT_EXECUTED` | No se ejecutaron tickets, redenciones, consumos, retries, concurrencia, conciliaciones ni sesiones reales de caja. |
| FÍSICA | `NOT_EXECUTED` | Ninguna instancia `PASS-QA-002` por implementation unit fue autorizada ni ejecutada durante esta tarea documental. |

---

#### 31. Criterios de aceptación

- [x] Se define un contrato reusable de prueba E2E para redención.
- [x] Se conserva `PER_IMPLEMENTATION_UNIT / POST_E5_PACKAGE` sin ejecutar físicamente la tarea documental.
- [x] Se consume el patrón reusable aprobado por `PASS-QA-001` sin mezclar acumulación y redención.
- [x] Se definen catorce precondiciones de admisión de instancia.
- [x] Se define fixture mínimo con cliente, recompensa, ticket, actor, principal, sede, dispositivo, estado, vigencia, ledger y saldo.
- [x] Se definen cinco oráculos independientes.
- [x] Se define el flujo feliz completo desde baseline hasta retry idempotente.
- [x] Se definen veinticuatro escenarios mínimos `RED_CASE_01..024`.
- [x] Se prueba uso único, idempotencia secuencial y concurrencia.
- [x] Se prueba conflicto por misma identidad de consumo con contenido incompatible.
- [x] Se prueba respuesta perdida y resultado desconocido.
- [x] Se prueban ticket usado, cancelado, vencido, inválido y fuera de sede.
- [x] Se prueban autorización, sede, sesión, actor y dispositivo fail-closed.
- [x] Se prueba separación cliente/trabajador/actor.
- [x] Se prueba coherencia entre estado de redención, ledger y saldo sin doble débito.
- [x] Se impide confirmar éxito desde estado puramente visual.
- [x] Se prueba limpieza de estado al cambiar de modo o ticket en `/scanner`.
- [x] Se exige convergencia PULSO ↔ PASS.
- [x] Se cubren privacidad y secreto efímero.
- [x] Se define paquete mínimo de evidencia por ejecución.
- [x] Se distinguen `PASS`, `FAIL`, `BLOCKED` y `NOT_APPLICABLE`.
- [x] Todo defecto tiene propietario contractual y condición de salida.
- [x] Se define una regla de salida fail-closed para cada instancia.
- [x] Se cierra documentalmente el mini-bloque PASS-QA.
- [x] Se entrega handoff a `AURA-AUD-001` sin iniciar AURA.
- [x] No se crean ni modifican requisitos de prueba.
- [x] No se modifica Registro 04A.
- [x] No se autoriza implementación física ni cambios de Supabase desde esta tarea documental.

---

#### 32. Límites

Esta tarea no:

- crea tickets o QR de redención reales;
- consume una redención real;
- crea o selecciona un `implementation_unit_id`;
- selecciona un package;
- aprueba un gate E5;
- autoriza una instancia física;
- modifica PULSO, PASS o SHELL;
- implementa ni modifica `processRedemptionAction` ni un RPC equivalente;
- modifica tablas, funciones, triggers, grants, RLS, Realtime, Auth, Storage, Edge Functions o migraciones de Supabase;
- fija catálogo, costo, elegibilidad, promoción, vigencia o disponibilidad de recompensas;
- modifica ledger o saldo;
- crea clientes, trabajadores, recompensas o redenciones productivas de prueba;
- activa una ruta independiente de redención si el runtime conserva `/scanner` por modos;
- activa componentes de cámara dormantes;
- trata una lectura de QR como evidencia suficiente de consumo;
- declara que el AS-IS ya satisface `PASS-INT-002`;
- sustituye `AUTH-QA-*`, `UX-QA-*` ni otras certificaciones transversales;
- inicia `AURA-AUD-001`;
- modifica 04A;
- crea requisitos de prueba;
- convierte un `BLOCKED` en PASS;
- cruza el gate `POST_E5_PACKAGE` por inferencia documental.

---

#### 33. Continuidad

**ÚLTIMA TAREA APROBADA**
`PASS-QA-001 — Probar flujo completo de acumulación`

**TAREA ACTUAL APROBADA**
`PASS-QA-002 — Probar flujo completo de redención`

**SIGUIENTE TAREA RESERVADA**
`AURA-AUD-001 — Confirmar repositorio propietario`
