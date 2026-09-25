### MINI-BLOQUE — INTEGRACIONES DE FIDELIZACION

<!-- PLAN-SECTION-META:START -->
Esta sección organiza **integraciones de fidelizacion** dentro de **V PASS**. Agrupa tareas que producen un resultado funcional común y deben mantenerse juntas para conservar contexto, trazabilidad y orden de ejecución.

**Cobertura canónica:** `PASS-INT-001` a `PASS-INT-005` — 5 tareas.

**Resultado esperado:** al cerrar este mini-bloque, su resultado debe quedar definido, verificable y coherente con las secciones anterior y siguiente antes de avanzar.

**Contenido funcional:**

- `PASS-INT-001`: Definir integración PULSO → PASS para acumulación
- `PASS-INT-002`: Definir integración PULSO → PASS para redención
- `PASS-INT-003`: Definir administración laboral de productos de fidelización
- `PASS-INT-004`: Definir administración laboral de clientes cuando corresponda
- `PASS-INT-005`: Evitar mezclar identidad cliente y trabajador
<!-- PLAN-SECTION-META:END -->

<!-- EXECUTION-GATE-RECONCILIATION:B801-974:PASS-INT -->
### Reconciliación topológica de PASS-INT-001 a PASS-INT-005

Estas tareas definen contratos y fronteras de integración de fidelización. La implementación posterior pertenece a los consumidores y paquetes propietarios.

| modalidad | `DEFINE_ONCE` |
| gate temporal | `NO_PHYSICAL_INSTANCE` |

### ✅ PASS-INT-001 — Definir integración PULSO → PASS para acumulación

**Estado:** APROBADA
**Tarea anterior:** PASS-UX-013 — Ejecutar pruebas con clientes reales
**Tarea siguiente:** PASS-INT-002 — Definir integración PULSO → PASS para redención
**Tipo de tarea:** documental; define una sola vez el contrato de integración PULSO → PASS para acumulación de puntos, incluyendo frontera de autoridad, hecho empresarial elegible, identidad de cliente, cálculo y regla vigente, idempotencia, atomicidad, ledger, proyección de saldo, autorización, territorialidad, actor/dispositivo, resultado desconocido, auditoría, recuperación y handoff hacia implementación/pruebas sin crear una instancia física propia; `DEFINE_ONCE` / `NO_PHYSICAL_INSTANCE`
**Bloque:** BLOQUE V — PASS — INTEGRACIONES DE FIDELIZACIÓN
**Repositorio propietario:** `vento-group-sas/vento-shell`
**Archivo propietario:** `docs/plan-canonico/modular/bloques/V_PASS/02_INTEGRACIONES_DE_FIDELIZACION.md`
**Estado físico resultante:** `NO_PHYSICAL_INSTANCE`
**Cambios físicos autorizados:** ninguno; esta tarea no modifica `vento-pulso`, `vento-pass`, Supabase, RPC, tablas, RLS, Edge Functions, reglas de puntos, pantallas, permisos, packages, datos, secretos ni despliegues, y no ejecuta acumulaciones reales
**Requisitos de prueba creados o modificados:** 0

---

#### 1. Propósito

Definir el contrato canónico mediante el cual una operación válida de PULSO solicita a PASS la acumulación de puntos de un cliente sin permitir que la interfaz, el dispositivo, el operador o un reintento puedan fabricar saldo, duplicar movimientos o convertir una respuesta incierta en una acumulación confirmada.

El resultado de esta tarea debe permitir que implementación y pruebas posteriores respondan de forma inequívoca:

```text
¿QUÉ HECHO EMPRESARIAL AUTORIZA ACUMULAR?
¿QUÉ IDENTIDAD DE CLIENTE RECIBE EL EFECTO?
¿QUIÉN AUTORIZA Y EJECUTA LA MUTACIÓN?
¿QUÉ DATOS SON ENTRADA Y CUÁLES SON FUENTE DE VERDAD?
¿CÓMO SE EVITA DUPLICAR PUNTOS?
¿QUÉ SE CONFIRMA ATÓMICAMENTE?
¿QUÉ OCURRE SI LA RESPUESTA SE PIERDE?
¿CÓMO SE RECONSTRUYE Y AUDITA EL RESULTADO?
```

La integración se define como un contrato servidor-a-servidor gobernado desde VENTO; PULSO origina la intención operacional y PASS conserva la semántica de fidelización, el ledger y la proyección de saldo.

---

#### 2. Reconciliación topológica

`PASS-INT-001` pertenece al mini-bloque `PASS-INT-001..005`, cuya topología vigente es:

```text
DEFINE_ONCE
+
NO_PHYSICAL_INSTANCE
```

Por tanto, esta tarea define contrato, responsabilidades, invariantes y handoff. No implementa el RPC, no altera Supabase, no cambia código cliente y no ejecuta acumulaciones.

La materialización posterior pertenece a consumidores y packages propietarios, además de los gates de autorización, base de datos, integración y QA aplicables.

---

#### 3. Base documental consumida

La tarea consume como base inmediata `PASS-UX-013`, que cerró el contrato de experiencia del cliente y dejó `PASS-INT-001` como siguiente handoff documental.

También reutiliza decisiones canónicas vigentes sobre:

- servidor como única autoridad para efectos de puntos;
- ledger de fidelización inmutable y reconciliable;
- saldo como proyección y no como dato fijable por cliente;
- idempotencia y recuperación ante reintentos;
- separación entre identidad de cliente, identidad laboral y principal técnico;
- permisos exactos por acción en PULSO;
- territorialidad por sede efectiva;
- atribución de actor y dispositivo en mutaciones protegidas;
- resultado desconocido sin retry ciego;
- validación posterior mediante integración, concurrencia, seguridad y E2E.

La base inmediata conserva el contenido documental aprobado de `PASS-UX-013` y consume únicamente su handoff hacia `PASS-INT-001`; no reabre ni modifica las decisiones del mini-bloque de experiencia cliente.

---

#### 4. Estado AS-IS que el contrato debe reconciliar

Los inventarios canónicos vigentes registran, como evidencia de arquitectura existente o auditada:

- una acción PULSO identificada como `awardLoyaltyPointsAction`;
- una superficie de servidor inventariada como `award_loyalty_points_external`;
- una ruta operativa PULSO relacionada con PASS que hoy concentra identificación, acumulación y redención bajo una misma superficie;
- una implementación observada donde el formulario calcula puntos antes de invocar la acción de servidor;
- una referencia de acumulación observada basada en timestamp/aleatoriedad de interfaz;
- brechas pendientes de atomicidad, idempotencia integral, permiso exacto por acción y atribución completa del actor.

Esta tarea no declara que esas piezas sean el contrato objetivo ni que estén completas. Solo define el comportamiento que la materialización deberá satisfacer o reconciliar.

La verificación directa del repositorio de producto no sustituye este contrato; el AS-IS anterior proviene de inventarios y auditorías canónicas vigentes en `vento-shell`.

---

#### 5. Frontera de autoridad PULSO → PASS

La acumulación se separa en dos responsabilidades:

| Capa | Responsabilidad |
| --- | --- |
| PULSO | capturar la intención operacional, identificar el contexto de venta y cliente, presentar únicamente datos permitidos, reunir la evidencia necesaria y solicitar la mutación |
| contrato servidor | revalidar sesión, aplicación, sede, permiso, actor, dispositivo, cliente, compra elegible, monto, moneda, referencia e identidad idempotente |
| fidelización PASS | aplicar la regla vigente, registrar el movimiento de ledger, actualizar/proyectar saldo coherente y devolver un resultado durable |
| interfaz PULSO | mostrar únicamente el resultado confirmado por servidor y conservar estado seguro ante rechazo o incertidumbre |
| experiencia PASS | reflejar después el saldo y movimiento confirmados desde la fuente de verdad, sin fabricar el efecto a partir de estado local |

PULSO no es propietario del saldo ni del ledger.

PASS cliente no puede insertar movimientos ni fijar saldo.

Una UI puede previsualizar una cantidad esperada solo si se etiqueta como estimación y no se usa como evidencia de acumulación confirmada.

---

#### 6. Hecho empresarial que habilita acumulación

La acumulación solo puede originarse desde una compra o transacción empresarial identificable y elegible conforme a reglas vigentes.

El contrato deberá poder revalidar, como mínimo:

- identidad estable del cliente;
- identidad estable de la compra/transacción origen;
- sede efectiva asociada al hecho;
- monto relevante para fidelización;
- moneda;
- regla o política vigente aplicable;
- actor humano cuando corresponda;
- principal técnico que ejecuta la llamada;
- dispositivo o estación cuando corresponda;
- referencia externa/idempotente estable;
- relación entre el hecho empresarial y el efecto de puntos solicitado.

La interfaz no puede transformar una venta no confirmada, cancelada, anulada, incompatible o no elegible en una acumulación válida.

La definición exacta de reglas comerciales, multiplicadores, promociones, redondeos y vigencias pertenece a sus propietarios canónicos. `PASS-INT-001` exige que esas reglas sean versionadas y verificables; no inventa valores ni fórmulas.

---

#### 7. Identidad del cliente

La acumulación opera sobre una identidad canónica de cliente resuelta por servidor.

Un QR, código, búsqueda, correo, teléfono o dato presentado en la interfaz puede servir como entrada de resolución cuando esté autorizado, pero no sustituye por sí mismo la identidad empresarial destino.

La integración debe impedir:

- otorgar puntos a una entidad de otro tipo;
- reutilizar un código con semántica distinta;
- aceptar una identidad manipulada por cliente;
- mantener el cliente anterior después de limpiar o cambiar de operación;
- fusionar automáticamente perfiles por coincidencia de nombre, correo o teléfono;
- confundir identidad cliente con identidad laboral.

`PASS-INT-004` conserva ownership de administración laboral de clientes y `PASS-INT-005` conserva ownership de separación cliente/trabajador. Esta tarea consume esas fronteras sin absorberlas.

---

#### 8. Autoridad, permiso y territorialidad

Toda solicitud de acumulación deberá fallar cerrada si no puede demostrar simultáneamente:

```text
SESION VALIDA
+
ACCESO A PULSO
+
SEDE EFECTIVA
+
PERMISO EXACTO DE ACUMULACION
+
ACTOR VALIDO CUANDO APLIQUE
+
DISPOSITIVO/CONTEXTO OPERATIVO VALIDO CUANDO APLIQUE
```

El acceso general a PULSO o un permiso amplio de caja no sustituye el permiso específico para otorgar puntos.

En dispositivos compartidos, la autoridad del principal técnico del dispositivo no se transfiere automáticamente al trabajador que ejecuta la acción. La mutación debe conservar la atribución humana exigida por el contrato de dispositivos compartidos.

`PULSO-AUTH-009` conserva ownership de la protección física/operativa de la acumulación. `PASS-INT-001` define la frontera que esa protección deberá satisfacer.

---

#### 9. Regla de cálculo

La cantidad final de puntos aplicada debe provenir de una regla vigente y verificable en servidor o de un resultado servidor equivalente que pueda demostrar la versión de regla utilizada.

Queda prohibido que el valor final dependa exclusivamente de:

- cálculo realizado en el navegador o dispositivo;
- monto editable sin revalidación;
- saldo anterior entregado por cliente;
- una regla codificada únicamente en PULSO;
- un multiplicador sin versión o vigencia demostrable;
- una decisión del operador sin autoridad explícita.

Si PULSO muestra una previsualización, el servidor puede confirmarla, recalcularla o rechazarla; la respuesta del servidor gobierna el efecto real.

---

#### 10. Idempotencia empresarial

Cada acumulación debe poseer una identidad estable derivada del hecho empresarial o emitida/validada por servidor.

La clave o referencia no puede depender únicamente de:

```text
Date.now
Math.random
un contador local no durable
un identificador truncado
estado temporal de la UI
un valor regenerado en cada retry
```

Para el mismo hecho empresarial:

1. el mismo reintento conserva la misma identidad idempotente;
2. el servidor reconoce si el efecto ya fue aplicado;
3. un replay no crea una segunda entrada de acumulación;
4. la respuesta debe permitir recuperar el resultado durable existente;
5. el mismo identificador con payload materialmente incompatible se trata como conflicto, no como una acumulación nueva.

La idempotencia protege el efecto empresarial, no solo el transporte HTTP.

---

#### 11. Atomicidad y fuente de verdad

La acumulación confirmada debe mantener una única verdad empresarial:

```text
MOVIMIENTO DE LEDGER CONFIRMADO
+
PROYECCION DE SALDO COHERENTE
+
CORRELACION CON EL HECHO ORIGEN
```

No es válido confirmar al operador que los puntos fueron otorgados si:

- existe saldo actualizado sin movimiento de ledger;
- existe movimiento de ledger sin proyección coherente cuando esa proyección sea parte del contrato;
- el hecho origen no puede correlacionarse;
- la transacción quedó parcialmente aplicada;
- el servidor no puede demostrar el resultado final.

La implementación posterior debe usar atomicidad transaccional o una garantía equivalente explícitamente aprobada que preserve la misma invariante observable.

---

#### 12. Ledger y saldo

El ledger de fidelización es la evidencia durable del movimiento.

Cada acumulación deberá ser reconciliable con, al menos, su:

- cliente;
- hecho empresarial origen;
- naturaleza de acumulación;
- cantidad aplicada;
- regla/version aplicable;
- sede;
- actor y dispositivo cuando correspondan;
- referencia idempotente;
- fecha/hora de servidor;
- estado o resultado durable;
- correlación técnica necesaria para auditoría.

El saldo es una proyección derivada y no puede ser la única evidencia del movimiento.

Una discrepancia entre ledger y saldo se considera una condición de integridad que exige reconciliación; no se corrige silenciosamente desde la UI.

---

#### 13. Resultado semántico de la operación

Sin imponer nombres físicos de enum, la integración debe distinguir como mínimo estas clases semánticas:

| Clase | Significado |
| --- | --- |
| aplicado confirmado | el servidor demuestra que la acumulación fue aplicada exactamente una vez |
| ya aplicado / no-op idempotente | el mismo hecho ya produjo el efecto y se devuelve el resultado durable existente |
| rechazado por autorización | falta autoridad, permiso, sede, actor o contexto válido; no existe efecto |
| rechazado por validación empresarial | cliente, compra, monto, moneda, regla o elegibilidad no satisfacen el contrato; no existe efecto |
| conflicto de idempotencia | la identidad del efecto ya existe con datos incompatibles; no se crea otro movimiento |
| resultado desconocido | el cliente no puede demostrar éxito ni fallo después de iniciar la mutación y debe reconciliar antes de repetir |
| fallo técnico sin efecto demostrado | existe error técnico y no se presenta como acumulación confirmada |

Estos son significados contractuales, no nombres obligatorios de campos o códigos de API.

---

#### 14. Resultado desconocido y recuperación

Una desconexión, timeout, cierre de pestaña, pérdida de respuesta o error intermedio después de enviar la solicitud no autoriza a asumir que el efecto falló.

Ante resultado desconocido:

```text
NO MOSTRAR EXITO
NO MOSTRAR SALDO FABRICADO
NO GENERAR NUEVA IDENTIDAD
NO REPETIR CIEGAMENTE
CONSULTAR / RECONCILIAR CON LA MISMA IDENTIDAD
```

La recuperación debe poder determinar si:

- el efecto fue aplicado;
- ya existía y el retry es un no-op;
- fue rechazado sin efecto;
- permanece pendiente de conciliación;
- existe conflicto que requiere intervención autorizada.

La UI debe conservar suficiente contexto para guiar la recuperación sin exponer datos innecesarios.

---

#### 15. Concurrencia y duplicados

Dos solicitudes concurrentes que representen el mismo hecho empresarial deben converger en un único efecto durable.

Dos operaciones diferentes no pueden colisionar por una clave demasiado amplia.

El contrato posterior deberá probar al menos:

- doble clic;
- retry por timeout;
- dos pestañas o clientes concurrentes;
- replay de la misma referencia;
- misma referencia con payload diferente;
- respuesta perdida después de commit;
- intento desde sede distinta;
- actor sin permiso;
- cliente inválido o inexistente;
- compra no elegible;
- monto manipulado.

---

#### 16. Experiencia operacional de PULSO

PULSO puede mostrar la intención y el contexto, pero solo presenta como acumulación confirmada un resultado servidor demostrable.

La interfaz deberá diferenciar:

- calculando o preparando;
- enviando;
- confirmado;
- rechazado;
- resultado desconocido / requiere conciliación;
- ya aplicado idempotentemente.

Un spinner, toast, cambio local de saldo o cierre de modal no constituyen confirmación empresarial.

Después de una confirmación válida, el estado local puede reflejar la respuesta servidor; una lectura posterior de PASS debe converger con el ledger y saldo canónicos.

---

#### 17. Offline y degradación

No se acumulan puntos localmente como efecto definitivo cuando no existe autoridad servidor disponible.

Si una futura arquitectura autoriza cola/outbox para esta operación, deberá conservar la misma identidad idempotente, evidencia del hecho origen, actor, sede y política de expiración/reconciliación. Esta tarea no crea ni selecciona esa arquitectura.

Mientras no exista una cola gobernada y demostrada, la interfaz debe bloquear el efecto o mantenerlo como pendiente no confirmado, según el contrato de implementación aprobado.

---

#### 18. Auditoría mínima

La evidencia de una acumulación deberá permitir reconstruir:

```text
QUIEN
QUE CLIENTE
QUE COMPRA / TRANSACCION
QUE SEDE
QUE DISPOSITIVO
QUE MONTO Y MONEDA
QUE REGLA / VERSION
QUE IDENTIDAD IDEMPOTENTE
QUE RESULTADO
QUE MOVIMIENTO DE LEDGER
QUE SALDO RESULTANTE O PROYECCION
CUANDO
CON QUE CORRELACION
```

No se persisten secretos, PIN en claro, tokens de sesión ni datos personales innecesarios como parte de la evidencia de fidelización.

La trazabilidad debe ser suficiente para investigación de fraude, conciliación, soporte y regresión sin convertir el registro operativo en una copia excesiva del perfil del cliente.

---

#### 19. Separación de responsabilidades dentro del mini-bloque

| Tarea | Responsabilidad |
| --- | --- |
| `PASS-INT-001` | contrato PULSO → PASS para acumulación |
| `PASS-INT-002` | contrato PULSO → PASS para redención |
| `PASS-INT-003` | administración laboral de productos de fidelización |
| `PASS-INT-004` | administración laboral de clientes cuando corresponda |
| `PASS-INT-005` | impedir mezcla de identidad cliente y trabajador |

`PASS-INT-001` no adelanta reglas de canje, administración de catálogo, mantenimiento de clientes ni resolución completa de identidad laboral.

---

#### 20. Handoff hacia implementación y QA

La materialización posterior deberá conservar este contrato en las capas propietarias:

- autorización PULSO;
- acción de servidor;
- Supabase y contratos de datos;
- ledger y proyección de saldo;
- consumidores PULSO y PASS;
- dispositivos compartidos cuando apliquen;
- paquetes E5 propietarios;
- pruebas de integración, seguridad, concurrencia e idempotencia;
- `PASS-QA-001` para la prueba completa de acumulación materializada.

`PASS-INT-001` no certifica que la implementación actual cumpla esas obligaciones.

---

#### 21. Requisitos de prueba derivados

**Resultado:** NO GENERA REQUISITOS DE PRUEBA

**Requisitos creados:** 0
**Requisitos modificados:** 0
**Requisitos diferidos:** 0
**Requisitos obsoletos:** 0
**Fragmentos del Registro 04A afectados:** 0

**Justificación:** el comportamiento verificable de acumulación ya está cubierto por requisitos vigentes de fidelización, autorización e integración para servidor autorizado, ledger, saldo, compra elegible, monto, moneda, regla vigente, actor, dispositivo, territorialidad, idempotencia, concurrencia, resultado recuperable y deduplicación. Esta tarea especializa y organiza esa cobertura en un contrato documental único sin introducir una obligación material nueva.

---

#### 22. Cobertura de prueba vigente reutilizada

Sin modificar el Registro 04A, se reutiliza principalmente:

- `TREQ-PASS-008` para servidor autorizado, atomicidad, idempotencia y prohibición de escritura directa de ledger/saldo por cliente;
- `TREQ-PASS-010` para ledger inmutable y reconciliable, reglas/versiones, proyección de saldo y reintentos sin duplicación;
- `TREQ-PASS-022` para sesión, acceso, sede y permisos exactos en la superficie PULSO relacionada con PASS;
- `TREQ-PASS-023` para resolución segura de identidad de cliente;
- `TREQ-PASS-024` para minimización de la proyección operativa de cliente;
- `TREQ-PASS-025` para compra elegible, monto, moneda, regla vigente, actor, dispositivo, referencia externa, atomicidad y saldo/ledger coherentes;
- `TREQ-PASS-026` para referencia idempotente estable derivada del hecho empresarial;
- `TREQ-PASS-029` para atribución humana en dispositivo compartido;
- `TREQ-INTEGRATION-003` para identidad estable del efecto, retry, deduplicación, resultado durable y tratamiento de resultado desconocido;
- los requisitos PULSO y AUTH ya vinculados por esas filas para autoridad, sede y permisos.

Esta sección documenta trazabilidad de cobertura existente y no actualiza el Registro 04A.

---

#### 23. Evidencia de validación

| Clase | Estado | Evidencia |
| --- | --- | --- |
| BUILD | `NOT_EXECUTED` | La compilación documental real corresponde a la incorporación de `PASS-INT-001` en su rama propia mediante los scripts canónicos. |
| LOCAL | `NOT_EXECUTED` | El artefacto todavía no ha sido insertado en el checkout del usuario ni sometido allí a formateador, quality, delivery check, validadores proporcionales y batería global. |
| REMOTA | `PASS` | Se verificaron en `vento-shell/main` el protocolo, contrato de entrega, manifiesto, continuidad, topología/políticas, propietario de `PASS-INT-001`, scripts documentales y cobertura 04A vigente de PASS/integración; el repositorio remoto de producto no se usa como sustituto de esas fuentes canónicas. |
| OPERATIVA | `NOT_EXECUTED` | No se ejecutaron ventas, acumulaciones, conciliaciones, retries, sesiones de caja ni pruebas E2E reales. |
| FÍSICA | `NOT_APPLICABLE` | `PASS-INT-001` es `DEFINE_ONCE / NO_PHYSICAL_INSTANCE`; la implementación pertenece a consumidores/packages posteriores. |

---

#### 24. Criterios de aceptación

- [x] Se define exactamente la integración PULSO → PASS para acumulación sin adelantar redención.
- [x] PULSO queda como originador de intención operacional y no como fuente de verdad de saldo/ledger.
- [x] La acumulación exige una compra/transacción empresarial identificable y elegible.
- [x] El servidor revalida cliente, sede, monto, moneda, regla vigente, actor, dispositivo y referencia estable cuando apliquen.
- [x] El valor final de puntos no depende exclusivamente del cálculo de UI.
- [x] La identidad idempotente se deriva del hecho empresarial o de un identificador estable emitido/validado por servidor.
- [x] Un retry del mismo hecho no duplica puntos.
- [x] El mismo identificador con contenido incompatible se trata como conflicto.
- [x] Ledger y proyección de saldo conservan una verdad coherente y reconciliable.
- [x] La UI no presenta como éxito un resultado desconocido.
- [x] Un timeout o respuesta perdida se reconcilia antes de repetir el efecto.
- [x] Se cubren concurrencia, duplicados y replay.
- [x] Se exige permiso exacto y territorialidad por sede.
- [x] Se conserva atribución de actor/dispositivo en contextos compartidos cuando aplique.
- [x] No se mezclan identidad de cliente, identidad laboral y principal técnico.
- [x] Se define evidencia auditable sin almacenar secretos o datos personales innecesarios.
- [x] Se preserva ownership de `PASS-INT-002..005`, `PULSO-AUTH-009` y `PASS-QA-001`.
- [x] No se crean ni modifican requisitos de prueba.
- [x] No se modifica Registro 04A.
- [x] No se autoriza implementación física ni cambios de Supabase.

---

#### 25. Límites

Esta tarea no:

- fija una tasa de puntos, regla de redondeo, multiplicador, promoción o vigencia no aprobados por su propietario;
- implementa ni modifica `awardLoyaltyPointsAction`;
- crea, cambia o despliega `award_loyalty_points_external`;
- modifica tablas, funciones, triggers, grants, RLS, Realtime, Edge Functions o migraciones de Supabase;
- crea una cola/offline outbox para puntos;
- procesa ventas ni acumulaciones reales;
- define la redención ni consumo de beneficios;
- administra productos/recompensas;
- administra el perfil completo del cliente;
- resuelve por completo la separación cliente/trabajador;
- redefine permisos de PULSO fuera de la frontera necesaria para este contrato;
- modifica UI de PULSO o PASS;
- declara cumplimiento de la implementación actual;
- cierra `PASS-QA-001`;
- modifica 04A;
- crea requisitos de prueba;
- inicia una instancia física o package.

---

#### 26. Continuidad

**ÚLTIMA TAREA APROBADA**
`PASS-UX-013 — Ejecutar pruebas con clientes reales`

**TAREA ACTUAL APROBADA**
`PASS-INT-001 — Definir integración PULSO → PASS para acumulación`

**SIGUIENTE TAREA RESERVADA**
`PASS-INT-002 — Definir integración PULSO → PASS para redención`
### ✅ PASS-INT-002 — Definir integración PULSO → PASS para redención

**Estado:** APROBADA
**Tarea anterior:** PASS-INT-001 — Definir integración PULSO → PASS para acumulación
**Tarea siguiente:** PASS-INT-003 — Definir administración laboral de productos de fidelización
**Tipo de tarea:** documental; define una sola vez el contrato de integración PULSO → PASS para validar y consumir redenciones creadas desde PASS, separando intención de redención y consumo, y fijando identidad, elegibilidad, territorialidad, autorización, actor/dispositivo, uso único, atomicidad, idempotencia, estados, ledger, resultado desconocido, concurrencia, auditoría, recuperación y handoff hacia implementación/pruebas sin crear una instancia física propia; `DEFINE_ONCE` / `NO_PHYSICAL_INSTANCE`
**Bloque:** BLOQUE V — PASS — INTEGRACIONES DE FIDELIZACIÓN
**Repositorio propietario:** `vento-group-sas/vento-shell`
**Archivo propietario:** `docs/plan-canonico/modular/bloques/V_PASS/02_INTEGRACIONES_DE_FIDELIZACION.md`
**Estado físico resultante:** `NO_PHYSICAL_INSTANCE`
**Cambios físicos autorizados:** ninguno; esta tarea no modifica `vento-pulso`, `vento-pass`, Supabase, RPC, tablas, RLS, Edge Functions, catálogo de recompensas, reglas de puntos, pantallas, permisos, packages, datos, secretos ni despliegues, y no ejecuta redenciones reales
**Requisitos de prueba creados o modificados:** 0

---

#### 1. Propósito

Definir el contrato canónico mediante el cual PULSO valida y consume una intención de redención creada por PASS sin permitir que la interfaz, el operador, un código presentado, una política amplia, un reintento o una condición de carrera puedan fabricar un canje válido, usarlo dos veces o convertir un resultado incierto en consumo confirmado.

El resultado de esta tarea debe permitir que implementación y pruebas posteriores respondan de forma inequívoca:

```text
¿QUÉ REPRESENTA EL TICKET / QR DE REDENCIÓN?
¿CUÁNDO UNA REDENCIÓN PUEDE CONSUMIRSE?
¿QUÉ ESTADO DEBE TENER ANTES DEL CONSUMO?
¿QUÉ SEDE PUEDE VALIDARLA?
¿QUIÉN PUEDE EJECUTAR LA VALIDACIÓN?
¿CÓMO SE IMPIDE EL DOBLE USO?
¿QUÉ OCURRE CON LOS PUNTOS YA DEBITADOS O RESERVADOS?
¿QUÉ SE CONFIRMA ATÓMICAMENTE?
¿QUÉ OCURRE SI LA RESPUESTA SE PIERDE?
¿CÓMO SE RECONSTRUYE Y AUDITA EL RESULTADO?
```

PASS conserva la semántica de fidelización y origina la intención de redención del cliente. PULSO constituye la superficie operacional que solicita validar y consumir esa intención dentro del contexto autorizado de caja/sede. El servidor conserva la autoridad final sobre elegibilidad, estado, ledger y resultado durable.

---

#### 2. Reconciliación topológica

`PASS-INT-002` pertenece al mini-bloque `PASS-INT-001..005`, cuya reconciliación vigente establece:

```text
DEFINE_ONCE
+
NO_PHYSICAL_INSTANCE
```

Por tanto, esta tarea define contrato, responsabilidades, invariantes, estados y handoff. No implementa RPC, no altera Supabase, no cambia código de PULSO o PASS, no crea rutas y no ejecuta canjes.

La materialización posterior pertenece a los consumidores y packages propietarios, además de los gates de autorización, base de datos, integración, dispositivos compartidos y QA aplicables.

---

#### 3. Base documental consumida

La base inmediata es `PASS-INT-001`, que define la frontera PULSO → PASS para acumulación y deja como siguiente responsabilidad la redención.

`PASS-INT-002` conserva las invariantes compartidas ya fijadas por esa base:

- servidor como autoridad de mutaciones de fidelización;
- ledger como evidencia durable;
- saldo como proyección y no como valor fijable por cliente;
- identidad idempotente del efecto;
- tratamiento seguro de resultado desconocido;
- separación entre cliente, trabajador, principal técnico, dispositivo y sede;
- permiso exacto por acción;
- territorialidad efectiva;
- confirmación empresarial antes de mostrar éxito;
- auditoría suficiente para reconciliación y fraude.

La tarea consume además la experiencia PASS ya aprobada donde `VSCREEN-0110` representa **Ticket o QR de redención** y `VPROC-0045::STEP-CREATE_REDEMPTION_INTENT` representa la creación de la intención de redención. Crear esa intención no equivale a consumirla.

---

#### 4. Estado AS-IS que el contrato debe reconciliar

Las auditorías e inventarios canónicos vigentes registran, como estado observado o brecha confirmada:

- una acción PULSO inventariada como `processRedemptionAction`;
- una superficie operativa PULSO `/scanner` donde identificación y redención conviven como modos del mismo contenedor runtime;
- una implementación histórica de redención desde cliente que ejecutaba múltiples pasos separados: lectura de recompensa, lectura de saldo, generación de QR, inserción de redención, inserción de transacción y compensación manual si fallaba la segunda inserción;
- falta de atomicidad confirmada en ese flujo histórico;
- políticas generales `staff_select_all_redemptions` y `staff_validate_redemptions` identificadas como ampliaciones inseguras de lectura/validación;
- cobertura posterior que exige permiso exacto, sede efectiva, actor, estado, uso único y transición idempotente;
- estados UI que no pueden adelantarse al resultado confirmado de servidor.

Esta tarea no congela esas piezas como diseño objetivo. Define el contrato que la materialización posterior debe satisfacer o reconciliar.

---

#### 5. Separación canónica entre crear intención y consumir redención

La redención se divide obligatoriamente en dos momentos empresariales distintos:

| Momento | Propietario lógico | Resultado |
| --- | --- | --- |
| crear intención/ticket | PASS | existe una redención identificable, de un solo uso, con estado, recompensa, cliente, vigencia y reglas aplicables |
| validar y consumir | PULSO → contrato servidor PASS | la intención elegible cambia a estado usado/consumido exactamente una vez dentro del contexto autorizado |

Por tanto:

```text
TICKET CREADO
!=
REDENCIÓN USADA
```

Y también:

```text
QR MOSTRADO
!=
CANJE VALIDADO
```

PULSO no crea una nueva redención para “hacer funcionar” un ticket presentado. Debe resolver y validar la intención existente.

PASS no puede presentar una intención recién creada como consumo realizado por PULSO.

---

#### 6. Contrato mínimo de la intención de redención

Antes del consumo, la redención debe poder resolverse mediante una identidad estable y debe conservar, como mínimo, la información empresarial necesaria para demostrar:

- identidad de redención/ticket;
- identidad canónica del cliente;
- recompensa o beneficio solicitado;
- regla/version aplicable;
- sede o ámbito territorial permitido cuando corresponda;
- estado actual;
- vigencia/expiración;
- costo o efecto en puntos;
- condición del saldo asociada al ticket cuando aplique;
- referencia de ledger o relación reconciliable con el movimiento de fidelización;
- evidencia de si el efecto de puntos quedó debitado, reservado o bajo otro estado canónico explícito;
- identidad idempotente del consumo cuando corresponda;
- fecha/hora autoritativa y correlación necesaria para auditoría.

La posesión del código o QR no sustituye ninguna de esas validaciones.

---

#### 7. Validaciones obligatorias antes del consumo

La solicitud PULSO → PASS debe fallar cerrada salvo que el servidor pueda demostrar simultáneamente, según aplique:

```text
REDENCIÓN EXISTENTE
+
CLIENTE CORRECTO
+
RECOMPENSA CORRECTA
+
SEDE AUTORIZADA
+
ESTADO CONSUMIBLE
+
VIGENCIA ACTIVA
+
SALDO / EFECTO DE PUNTOS COHERENTE
+
ACTOR AUTORIZADO
+
DISPOSITIVO / CONTEXTO VÁLIDO
+
NO UTILIZACIÓN PREVIA
```

Una validación positiva del formato del código no basta para autorizar el consumo.

El servidor debe consultar el estado vigente y no confiar en el estado almacenado en la interfaz.

---

#### 8. Identidad de cliente y recompensa

La redención debe permanecer ligada a la identidad canónica de cliente y a la recompensa/beneficio exactos que originaron la intención.

Queda prohibido:

- cambiar el cliente destino durante el consumo;
- sustituir una recompensa por otra desde PULSO;
- interpretar un código de otra entidad como redención;
- usar una coincidencia de correo, teléfono o nombre como sustituto de identidad;
- consumir una redención cuyo vínculo cliente-recompensa no pueda demostrarse;
- mezclar identidad del cliente con identidad del trabajador que valida el canje.

`PASS-INT-004` conserva ownership de administración laboral de clientes y `PASS-INT-005` conserva ownership de separación cliente/trabajador. Esta tarea consume esas fronteras sin absorberlas.

---

#### 9. Territorialidad por sede

Una redención solo puede consumirse en una sede compatible con su contrato de elegibilidad.

El servidor debe resolver la sede efectiva desde contexto autorizado y no aceptar como autoridad suficiente una sede enviada libremente por cliente.

Cuando una recompensa sea válida en múltiples sedes, esa condición debe provenir de una regla/version aprobada; no se infiere desde el frontend.

Un ticket de otra sede o fuera del ámbito permitido se rechaza sin marcarlo como usado y sin generar un efecto alternativo.

---

#### 10. Autoridad, permiso y actor

Toda validación de redención desde PULSO debe demostrar:

```text
SESION VALIDA
+
ACCESO A PULSO
+
SEDE EFECTIVA
+
PERMISO EXACTO DE REDENCION
+
ACTOR HUMANO VALIDO CUANDO APLIQUE
+
PRINCIPAL TECNICO / DISPOSITIVO VALIDO CUANDO APLIQUE
```

El permiso general `pos.main` no sustituye una capacidad específica de redención cuando el contrato de autorización exija separación de acciones.

En dispositivo compartido, la sesión técnica del equipo no transfiere por sí sola autoridad al trabajador. La acción debe vincular principal técnico, actor humano, dispositivo, sede, permiso y resultado.

`PULSO-AUTH-010` conserva ownership de la protección operacional de redenciones; `PASS-INT-002` define la frontera que esa protección debe satisfacer.

---

#### 11. Secreto efímero del trabajador

Cuando la validación requiera PIN o firma del trabajador real en dispositivo compartido:

- se captura únicamente para autenticar/atribuir esa acción;
- no se persiste como parte del ticket o ledger;
- no se registra en logs, métricas ni mensajes;
- no se reutiliza para una segunda redención;
- se limpia después de éxito, rechazo, error, cambio de modo, cambio de cliente o expiración;
- su manejo conserva límites de intentos, bloqueo y respuesta uniforme según el contrato de autenticación aplicable.

Esta tarea no define el mecanismo físico del PIN; conserva su frontera de seguridad.

---

#### 12. Atomicidad del consumo

La transición empresarial de una redención consumible a usada debe ser atómica o poseer una garantía equivalente explícitamente aprobada.

La operación confirmada debe mantener una única verdad:

```text
REDENCIÓN = USADA
+
LEDGER / EFECTO DE PUNTOS COHERENTE
+
ACTOR / SEDE / RESULTADO AUDITABLES
```

No es válido confirmar el consumo cuando:

- la redención cambió a usada pero el ledger requerido quedó inconsistente;
- el ledger cambió pero la redención continúa consumible;
- la evidencia de sede/actor se perdió;
- el proceso depende de “borrar después” una fila si falla otra escritura;
- el servidor no puede demostrar el estado final.

La compensación manual desde cliente no sustituye atomicidad.

---

#### 13. Relación con puntos debitados o reservados

El consumo en PULSO no debe volver a aplicar el costo de puntos si la creación de intención ya produjo un débito o reserva conforme al contrato vigente.

Antes de usar la redención, el servidor debe verificar el significado real del estado de puntos asociado:

- si el costo ya fue debitado de forma durable, el consumo no genera un segundo débito;
- si existe reserva, el consumo debe resolverla según el contrato propietario sin duplicar el efecto;
- si no puede demostrarse el estado esperado del saldo/ledger, la redención no se consume a ciegas;
- una discrepancia entre ticket, ledger y saldo se deriva a reconciliación en lugar de improvisar un ajuste desde PULSO.

`PASS-INT-002` no inventa una política nueva de reserva versus débito; exige que cualquiera de las dos sea explícita, consistente y verificable.

---

#### 14. Estado consumible y estados no consumibles

El contrato debe distinguir al menos entre una intención actualmente consumible y estados que ya no permiten un nuevo efecto.

Una redención en estado equivalente a **pendiente válida/consumible** puede avanzar únicamente después de todas las validaciones.

Una redención equivalente a cualquiera de estos estados no genera un nuevo consumo:

```text
USADA
CANCELADA
VENCIDA / EXPIRADA
INVALIDA
FUERA DE SEDE / TERRITORIO
NO AUTORIZADA
```

La denominación física exacta de enums pertenece a la implementación propietaria; la semántica anterior es obligatoria.

---

#### 15. Uso único e idempotencia

Una redención de un solo uso debe converger a un solo consumo durable aunque PULSO envíe la solicitud más de una vez.

Para el mismo ticket y el mismo intento empresarial:

1. un retry no crea otro consumo;
2. el servidor detecta que el efecto ya fue aplicado;
3. la respuesta recupera el resultado durable existente;
4. la redención permanece usada una sola vez;
5. no se vuelve a debitar/reservar saldo;
6. no se crea otro movimiento de ledger por conveniencia de transporte.

Si la misma identidad de operación llega con parámetros materialmente incompatibles, se trata como conflicto y no como nuevo canje.

---

#### 16. Concurrencia

Dos cajas, dispositivos, pestañas o requests que intenten consumir simultáneamente la misma redención deben converger en un único ganador empresarial o en el mismo resultado durable idempotente.

La implementación posterior debe impedir el patrón:

```text
A LEE PENDIENTE
B LEE PENDIENTE
A USA
B USA
```

La decisión debe producirse con bloqueo, compare-and-set, constraint, transacción o mecanismo equivalente que garantice uso único.

El chequeo previo en UI no constituye control de concurrencia.

---

#### 17. Resultado semántico de validación

Sin imponer nombres físicos de enum, el contrato debe distinguir como mínimo:

| Clase | Significado |
| --- | --- |
| consumo confirmado | la redención fue validada y usada exactamente una vez |
| ya aplicada/usada | el mismo efecto ya existe; no se vuelve a consumir |
| rechazada por autorización | actor, permiso, dispositivo o contexto no autorizan la acción |
| rechazada por territorio | sede efectiva incompatible con la redención |
| rechazada por estado | redención cancelada, vencida, inválida o no consumible |
| rechazada por elegibilidad/integridad | cliente, recompensa, saldo/ledger o reglas no satisfacen el contrato |
| conflicto | misma identidad con contenido incompatible o estado concurrente incompatible |
| resultado desconocido | el solicitante no puede demostrar éxito ni fallo y debe reconciliar antes de repetir |
| fallo técnico sin efecto demostrado | existe error técnico, pero no se presenta como canje confirmado |

La interfaz puede mapear estos significados a mensajes humanos; no puede colapsarlos todos en “error”.

---

#### 18. Resultado desconocido y recuperación

Una pérdida de respuesta después de enviar el consumo no autoriza a tratar el ticket como disponible ni a repetir con una operación nueva.

Ante resultado desconocido:

```text
NO MOSTRAR CANJE CONFIRMADO SIN EVIDENCIA
NO VOLVER A MARCAR EL TICKET COMO PENDIENTE POR CLIENTE
NO CREAR UN SEGUNDO TICKET
NO APLICAR OTRO DÉBITO
NO REPETIR CON IDENTIDAD NUEVA
CONSULTAR / RECONCILIAR EL RESULTADO DURABLE
```

La reconciliación debe poder determinar si:

- la redención fue usada;
- ya estaba usada antes del retry;
- fue rechazada sin efecto;
- permanece consumible;
- quedó en condición de conciliación;
- existe conflicto o inconsistencia que requiere intervención autorizada.

---

#### 19. Frontera de la superficie `/scanner`

Mientras identificación y redención compartan el mismo contenedor runtime de PULSO, deben seguir registradas como modos subordinados de una sola superficie y no como rutas ficticias independientes.

Cambiar entre modos debe limpiar todo estado incompatible, incluyendo cuando aplique:

- código anterior;
- cliente resuelto;
- monto o referencia de acumulación;
- ticket/redención anterior;
- mensajes de éxito/error;
- credencial efímera del trabajador;
- estado de procesamiento.

Una redención no puede aplicarse accidentalmente al cliente o código de la operación anterior.

---

#### 20. Experiencia operacional de PULSO

PULSO solo presenta `canje validado` cuando existe resultado confirmado de servidor.

La UI debe distinguir, de acuerdo con el contrato de experiencia vigente:

- leyendo/resolviendo ticket;
- verificando elegibilidad;
- esperando autorización;
- procesando;
- confirmado;
- ya aplicado/usado;
- denegado;
- inválido o vencido;
- conflicto;
- resultado desconocido/requiere conciliación;
- fallo técnico recuperable cuando corresponda.

Un cambio local de color, toast, sonido, cierre de modal o lectura correcta del QR no constituye confirmación empresarial.

---

#### 21. Offline y degradación

El consumo de una redención no se confirma desde caché ni se almacena localmente como hecho definitivo cuando el servidor no está disponible.

La capacidad puede conservar datos de referencia necesarios para explicar el estado, pero la mutación requiere autoridad vigente y resultado durable.

Si una arquitectura futura incorpora cola/outbox, deberá demostrar uso único, identidad estable, actor, sede, vigencia, expiración, revalidación y reconciliación antes de considerarse equivalente. Esta tarea no crea ni selecciona esa arquitectura.

---

#### 22. Auditoría mínima

La evidencia de una redención consumida debe permitir reconstruir:

```text
QUE REDENCIÓN / TICKET
QUE CLIENTE
QUE RECOMPENSA
QUE REGLA / VERSION
QUE COSTO O EFECTO DE PUNTOS
QUE ESTADO PREVIO
QUE ESTADO RESULTANTE
QUE SEDE
QUE ACTOR
QUE PRINCIPAL TECNICO / DISPOSITIVO CUANDO APLIQUE
QUE PERMISO / CONTEXTO
QUE IDENTIDAD IDEMPOTENTE
QUE MOVIMIENTO / REFERENCIA DE LEDGER
CUANDO
QUE RESULTADO
CON QUE CORRELACION
```

La auditoría no almacena PIN, secretos, tokens o datos personales innecesarios.

El registro debe permitir investigar doble uso, fraude, uso fuera de sede, reintentos, conflictos y conciliación.

---

#### 23. Fallo parcial, compensación y rollback

El contrato objetivo evita depender de compensaciones realizadas por la interfaz después de escrituras parciales.

Ante un fallo antes del commit empresarial:

- no se declara consumo;
- la redención conserva un estado coherente;
- no aparece un movimiento huérfano.

Ante un fallo después de commit pero antes de respuesta:

- el efecto durable se conserva;
- el cliente recibe `resultado desconocido` hasta reconciliar;
- el retry recupera el resultado existente sin repetir el consumo.

Una reversión administrativa posterior de un canje confirmado, cuando el negocio la permita, es un nuevo hecho auditable y autorizado; no se implementa eliminando evidencia histórica.

---

#### 24. Separación de responsabilidades dentro del mini-bloque

| Tarea | Responsabilidad |
| --- | --- |
| `PASS-INT-001` | contrato PULSO → PASS para acumulación |
| `PASS-INT-002` | contrato PULSO → PASS para redención |
| `PASS-INT-003` | administración laboral de productos de fidelización |
| `PASS-INT-004` | administración laboral de clientes cuando corresponda |
| `PASS-INT-005` | impedir mezcla de identidad cliente y trabajador |

`PASS-INT-002` no define CRUD laboral de recompensas, no administra clientes y no reemplaza los contratos de identidad laboral.

---

#### 25. Handoff hacia implementación y QA

La materialización posterior debe conservar este contrato en las capas propietarias:

- autorización PULSO y permiso exacto de redención;
- acción servidor para validar/consumir;
- estado y persistencia de la redención;
- ledger y saldo/proyección asociados;
- RLS/grants/funciones de Supabase en `vento-shell` cuando corresponda;
- consumidores PULSO y PASS;
- dispositivos compartidos y firma de actor cuando apliquen;
- paquetes E5 propietarios;
- pruebas de integración, seguridad, concurrencia e idempotencia;
- `PASS-QA-002` para probar el flujo completo de redención materializado.

`PASS-INT-002` no certifica que la implementación actual cumpla esas obligaciones.

---

#### 26. Requisitos de prueba derivados

**Resultado:** NO GENERA REQUISITOS DE PRUEBA

**Requisitos creados:** 0
**Requisitos modificados:** 0
**Requisitos diferidos:** 0
**Requisitos obsoletos:** 0
**Fragmentos del Registro 04A afectados:** 0

**Justificación:** el comportamiento verificable de redención ya está cubierto por requisitos vigentes de PASS, autorización e integración para servidor autorizado, uso único, atomicidad, idempotencia, estado pendiente/consumible, vigencia, sede, actor, dispositivo, saldo/ledger, transición a usada, rechazo de estados no válidos, experiencia confirmada y resultado recuperable. Esta tarea organiza y especializa esa cobertura como contrato documental sin introducir una obligación material nueva.

---

#### 27. Cobertura de prueba vigente reutilizada

Sin modificar el Registro 04A, se reutiliza principalmente:

- `TREQ-PASS-008` para mutaciones de puntos/redención únicamente mediante contratos servidor autorizados, atómicos e idempotentes;
- `TREQ-PASS-010` para ledger inmutable/reconciliable, reglas/versiones y reintentos sin duplicación;
- `TREQ-PASS-022` para sesión válida, acceso PULSO, sede efectiva y permisos exactos por acción;
- `TREQ-PASS-027` para comprobar código, usuario, recompensa, sede, estado pendiente, vigencia, saldo debitado/reservado, actor efectivo y no utilización previa, y para transición atómica/idempotente a usada;
- `TREQ-PASS-028` para conservar identificación y redención como modos subordinados de `/scanner` mientras compartan contenedor;
- `TREQ-PASS-029` para atribución del trabajador real y vínculo de principal técnico, actor, dispositivo, sede, permiso y resultado;
- `TREQ-PASS-030` para tratamiento efímero y seguro del PIN/firma del trabajador;
- `TREQ-PASS-032` para impedir éxito visual antes de confirmación y distinguir error recuperable, duplicado, conflicto, denegación y resultado ya aplicado;
- `TREQ-INTEGRATION-003` para identidad estable del efecto, retry, deduplicación, resultado durable, resultado desconocido y conciliación;
- los requisitos PULSO y AUTH ya relacionados por esas filas para autoridad, territorio, sesión y protección de servidor.

Esta sección es trazabilidad de cobertura existente y no actualiza el Registro 04A.

---

#### 28. Evidencia de validación

| Clase | Estado | Evidencia |
| --- | --- | --- |
| BUILD | `NOT_EXECUTED` | La compilación documental real corresponde a la incorporación de `PASS-INT-002` en su rama propia mediante los scripts canónicos. |
| LOCAL | `NOT_EXECUTED` | El artefacto todavía no ha sido insertado en el checkout del usuario ni sometido allí a formateador, quality, delivery check, validadores proporcionales y batería global. |
| REMOTA | `PASS` | Se verificaron en `vento-shell/main` el protocolo, contrato de entrega, manifiesto, continuidad, topología/políticas, propietario de `PASS-INT-002`, inventario PULSO-PASS, proceso `VPROC-0045`, auditoría de redención no atómica, políticas RLS históricas, scripts documentales y cobertura 04A vigente; la base inmediata `PASS-INT-001` se toma de su artefacto completo aprobado por el usuario mientras su publicación está pendiente. |
| OPERATIVA | `NOT_EXECUTED` | No se ejecutaron redenciones, escaneos, consumos, retries, concurrencia, sesiones de caja ni pruebas E2E reales. |
| FÍSICA | `NOT_APPLICABLE` | `PASS-INT-002` es `DEFINE_ONCE / NO_PHYSICAL_INSTANCE`; la implementación pertenece a consumidores/packages posteriores. |

---

#### 29. Criterios de aceptación

- [x] Se define exactamente la integración PULSO → PASS para redención sin adelantar administración laboral de productos.
- [x] Se separa creación de intención/ticket en PASS de validación/consumo en PULSO.
- [x] Un ticket creado no se interpreta como redención usada.
- [x] Se exige validar redención, cliente, recompensa, sede, estado consumible, vigencia y no utilización previa.
- [x] Se exige coherencia con saldo debitado o reservado y ledger, sin aplicar un segundo débito.
- [x] La transición a usada es atómica o conserva una garantía equivalente aprobada.
- [x] Una redención de un solo uso converge a un solo efecto ante concurrencia y retries.
- [x] Estados usados, cancelados, vencidos, inválidos o fuera de territorio no generan un nuevo efecto.
- [x] Se exige permiso exacto y sede efectiva.
- [x] Se conserva atribución de actor, principal técnico y dispositivo cuando corresponda.
- [x] El PIN/firma laboral permanece efímero y fuera de ledger/logs.
- [x] La posesión del QR/código no constituye autoridad suficiente.
- [x] La UI no presenta éxito antes de confirmación de servidor.
- [x] Se distinguen ya aplicado, denegado, inválido, conflicto, fallo técnico y resultado desconocido.
- [x] Un timeout se reconcilia antes de repetir el consumo.
- [x] Se preserva la única superficie `/scanner` mientras los modos sigan embebidos en ella.
- [x] Se elimina del contrato objetivo la compensación cliente como sustituto de atomicidad.
- [x] Se define evidencia auditable sin secretos ni datos personales innecesarios.
- [x] Se preserva ownership de `PASS-INT-003..005`, `PULSO-AUTH-010` y `PASS-QA-002`.
- [x] No se crean ni modifican requisitos de prueba.
- [x] No se modifica Registro 04A.
- [x] No se autoriza implementación física ni cambios de Supabase.

---

#### 30. Límites

Esta tarea no:

- crea tickets o QR de redención en runtime;
- consume redenciones reales;
- implementa ni modifica `processRedemptionAction`;
- modifica `loyalty_redemptions`, `loyalty_transactions` ni contratos físicos equivalentes;
- modifica funciones, triggers, grants, RLS, Realtime, Edge Functions o migraciones de Supabase;
- reactiva políticas amplias históricas de lectura o validación de redenciones;
- fija catálogo, costo, elegibilidad, promoción, vigencia o disponibilidad de recompensas fuera de sus contratos propietarios;
- define CRUD laboral de productos de fidelización;
- administra el perfil completo del cliente;
- resuelve por completo identidad cliente/trabajador;
- crea una ruta independiente de redención si el runtime sigue usando `/scanner` por modos;
- activa componentes de cámara dormantes;
- crea una cola offline para consumos;
- declara cumplimiento de la implementación actual;
- cierra `PASS-QA-002`;
- modifica 04A;
- crea requisitos de prueba;
- inicia una instancia física o package.

---

#### 31. Continuidad

**ÚLTIMA TAREA APROBADA**
`PASS-INT-001 — Definir integración PULSO → PASS para acumulación`

**TAREA ACTUAL APROBADA**
`PASS-INT-002 — Definir integración PULSO → PASS para redención`

**SIGUIENTE TAREA RESERVADA**
`PASS-INT-003 — Definir administración laboral de productos de fidelización`
### ✅ PASS-INT-003 — Definir administración laboral de productos de fidelización

**Estado:** APROBADA
**Tarea anterior:** PASS-INT-002 — Definir integración PULSO → PASS para redención
**Tarea siguiente:** PASS-INT-004 — Definir administración laboral de clientes cuando corresponda
**Tipo de tarea:** documental; define una sola vez el contrato de administración laboral de productos de fidelización gobernados por PASS, incluyendo identidad y taxonomía del recurso, ownership empresarial, autorización base, alcance administrativo, borrador, versión, revisión, activación/publicación, vigencia, elegibilidad, costo en puntos, límites, aplicabilidad territorial/comercial, referencias a producto maestro, retiro, concurrencia, auditoría, recuperación y handoff hacia implementación sin crear una instancia física propia; `DEFINE_ONCE` / `NO_PHYSICAL_INSTANCE`
**Bloque:** BLOQUE V — PASS — INTEGRACIONES DE FIDELIZACIÓN
**Repositorio propietario:** `vento-group-sas/vento-shell`
**Archivo propietario:** `docs/plan-canonico/modular/bloques/V_PASS/02_INTEGRACIONES_DE_FIDELIZACION.md`
**Estado físico resultante:** `NO_PHYSICAL_INSTANCE`
**Cambios físicos autorizados:** ninguno; esta tarea no modifica `vento-pass`, `vento-viso`, `vento-pulso`, `vento-nexo`, `vento-fogo`, Supabase, tablas, RPC, RLS, contratos, permisos, rutas, pantallas, campañas, catálogo maestro, reglas runtime, packages, datos, secretos ni despliegues
**Requisitos de prueba creados o modificados:** 0

---

#### 1. Propósito

Definir el contrato canónico mediante el cual un trabajador explícitamente autorizado puede consultar y administrar productos de fidelización gobernados por PASS sin convertir la interfaz laboral, una campaña, un producto maestro, una sede o un permiso de lectura en fuente paralela de beneficios, reglas o autoridad de mutación.

El resultado debe permitir que implementación y pruebas posteriores respondan de forma inequívoca:

```text
¿QUÉ ES UN PRODUCTO DE FIDELIZACIÓN?
¿QUIÉN ES SU PROPIETARIO EMPRESARIAL?
¿QUIÉN PUEDE CONSULTARLO Y QUIÉN PUEDE MODIFICARLO?
¿QUÉ ALCANCE ADMINISTRATIVO APLICA?
¿CÓMO SE VERSIONAN REGLAS, VIGENCIAS Y CONDICIONES?
¿CÓMO SE PUBLICA O RETIRA SIN REESCRIBIR HISTORIA?
¿CÓMO SE RELACIONA CON PRODUCTOS, SEDES, CAMPAÑAS Y DISPONIBILIDAD?
¿QUÉ OCURRE ANTE EDICIONES CONCURRENTES O RESULTADOS INCIERTOS?
¿CÓMO SE AUDITA Y SE RECUPERA UNA DECISIÓN ADMINISTRATIVA?
```

PASS conserva la propiedad del beneficio, la recompensa, la regla de fidelización y su versión. La superficie laboral administra esa fuente mediante autorización canónica y no adquiere ownership empresarial por presentarla.

---

#### 2. Reconciliación topológica

`PASS-INT-003` pertenece al mini-bloque `PASS-INT-001..005`, cuya reconciliación vigente establece:

```text
DEFINE_ONCE
+
NO_PHYSICAL_INSTANCE
```

Por tanto, esta tarea define contrato, responsabilidades, invariantes, estados semánticos y handoff. No implementa pantallas, permisos, tablas, RPC, migraciones ni flujos reales de administración.

La materialización posterior pertenece a las aplicaciones, consumidores y packages propietarios, junto con los gates de autorización, datos, integración y UX administrativa aplicables.

---

#### 3. Base documental consumida

La base inmediata es `PASS-INT-002`, que cerró el contrato PULSO → PASS para redención y reservó explícitamente la administración laboral de productos de fidelización para `PASS-INT-003`.

Esta tarea conserva además decisiones canónicas ya vigentes:

- PASS es propietaria de beneficios y reglas de fidelización;
- la proyección visible al cliente no es una fuente distinta del beneficio;
- una recompensa, un cupón, una promoción, una cortesía, una membresía, un nivel, puntos y un beneficio por campaña conservan identidades distintas;
- el producto y sus atributos maestros pertenecen a NEXO;
- disponibilidad y capacidad operacional permanecen en NEXO/FOGO según el hecho;
- PULSO conserva la ejecución comercial y no administra el maestro de fidelización;
- NUMERA conserva costo, margen, presupuesto y resultado económico;
- AURA conserva intención promocional únicamente cuando su continuidad esté autorizada y no adquiere ownership del beneficio;
- cambios de reglas son prospectivos y no reescriben ledger, redenciones ni evidencia histórica;
- la visibilidad de un beneficio no demuestra elegibilidad efectiva ni redención consumida.

---

#### 4. Definición canónica de producto de fidelización

Para esta tarea, `LOYALTY_PRODUCT` es el recurso administrativo que representa una definición gobernada por PASS capaz de producir o describir un beneficio de fidelización bajo reglas explícitas.

El término es una envolvente administrativa y no colapsa la taxonomía del dominio.

Se conserva:

```text
PUNTOS
!=
RECOMPENSA
!=
CUPÓN
!=
NIVEL
!=
MEMBRESÍA
!=
PROMOCIÓN
!=
CORTESÍA
!=
BENEFICIO POR CAMPAÑA
```

Cada identidad conserva su semántica, regla, versión, aplicabilidad y efectos propios. Una interfaz común de administración no autoriza a tratarlas como el mismo objeto empresarial.

---

#### 5. Ownership empresarial

La propiedad se conserva así:

| Materia | Propietaria o autoridad | Frontera |
| --- | --- | --- |
| beneficio, recompensa y regla de fidelización | `PASS` | fuente canónica del dominio de fidelización |
| proyección visible al cliente | `PASS` | deriva de beneficio/regla/versión; no crea otra fuente |
| producto y atributos maestros | `NEXO` | PASS solo conserva referencias autorizadas |
| disponibilidad o capacidad operacional | `NEXO` / `FOGO` según el hecho | no se edita como dato PASS |
| pedido, venta y efecto comercial | `PULSO` | no administra el maestro de fidelización |
| costo, margen, presupuesto y resultado económico | `NUMERA` | no publica ni redime beneficios |
| intención promocional y campaña | `AURA`, cuando su gate lo permita | puede referenciar; no posee el beneficio |
| autorización laboral | catálogo y evaluadores canónicos de autorización | no cambia el ownership del recurso |

Ninguna superficie administrativa puede duplicar estas fuentes ni escribir cruzadamente sobre dominios ajenos para “completar” un producto de fidelización.

---

#### 6. Administración laboral versus experiencia de cliente

La administración laboral y la experiencia PASS de cliente son contextos separados.

```text
SUPERFICIE LABORAL DE ADMINISTRACIÓN
!=
CATÁLOGO VISIBLE AL CLIENTE
```

Un trabajador autorizado administra definiciones empresariales. Un cliente consulta únicamente la proyección que le corresponde.

Por tanto:

- una cuenta PASS de cliente no concede acceso laboral;
- un trabajador no obtiene identidad de cliente por administrar productos;
- una pantalla de cliente no concede autoridad para crear, modificar, activar o retirar beneficios;
- una vista laboral no permite actuar como cliente ni fabricar redenciones;
- los datos administrativos no se exponen íntegramente en la proyección cliente.

`PASS-INT-004` conserva ownership de administración laboral de clientes y `PASS-INT-005` de separación cliente/trabajador.

---

#### 7. Recurso y alcance administrativo

El recurso canónico de autorización observado para consulta es:

```text
LOYALTY_PRODUCT
```

con identidad lógica:

```text
loyalty_product_id
```

El alcance administrativo vigente es `CLIENT_CONFIG_SCOPE`, donde el recurso puede pertenecer a:

- organización;
- negocio;
- campaña cuando exista correlación autorizada;
- sede o conjunto territorial únicamente como aplicabilidad declarada por el recurso.

La sede de actividad de un trabajador no se convierte automáticamente en ownership territorial del producto de fidelización.

`employee_sites` no constituye por sí mismo el límite obligatorio de este recurso.

---

#### 8. Modalidad de autorización

La administración laboral de productos de fidelización pertenece al carril base.

La capacidad de consulta canónica observada:

```text
viso.loyalty.products.view
```

es:

```text
BASE_ONLY
```

Por tanto:

- no depende de turno;
- no depende de check-in;
- no se transforma en permiso operativo por abrir PULSO o PASS;
- no se concede a roles operativos por inferencia;
- requiere responsabilidad laboral específica y finalidad autorizada;
- conserva el alcance exacto permitido para el recurso.

La autorización base no equivale a globalidad irrestricta.

---

#### 9. Lectura no implica mutación

Se conserva obligatoriamente:

```text
viso.loyalty.products.view
!=
AUTORIDAD PARA CREAR
!=
AUTORIDAD PARA MODIFICAR
!=
AUTORIDAD PARA PUBLICAR
!=
AUTORIDAD PARA RETIRAR
```

La existencia de un permiso de lectura no autoriza ninguna mutación.

Esta tarea no inventa nombres de permisos de escritura, aprobación o publicación. La implementación futura solo podrá habilitar esas acciones cuando exista una capacidad canónica explícita, con modalidad, alcance, actor, evaluación y evidencia definidos.

Mientras esa capacidad no pueda resolverse de forma válida, la acción mutante deberá fallar cerrada.

---

#### 10. Capacidades administrativas semánticas

La administración de un producto de fidelización puede requerir, según el tipo de recurso y siempre bajo autorización explícita:

- crear un borrador;
- consultar detalle y versiones;
- modificar un borrador no publicado;
- preparar una nueva versión de una definición vigente;
- definir nombre y presentación administrativa;
- definir tipo de beneficio o recompensa sin colapsar taxonomías;
- definir costo en puntos cuando aplique;
- configurar condiciones, límites y exclusiones;
- configurar elegibilidad declarativa;
- definir vigencia y expiración;
- definir aplicabilidad por negocio, marca, sede o canal cuando corresponda;
- relacionar referencias autorizadas a producto u oferta;
- configurar cupo o límite lógico cuando el dominio lo contemple;
- revisar impacto y diferencias entre versiones;
- aprobar o publicar cuando exista autoridad separada;
- despublicar, retirar o programar vencimiento;
- consultar historial y auditoría.

La lista define semántica, no nombres físicos de endpoints, tablas, RPC ni permisos.

---

#### 11. Contrato conceptual mínimo

Un producto de fidelización administrable debe poder conservar, según aplicabilidad:

- identidad estable;
- tipo semántico;
- nombre y descripción gobernados;
- regla de fidelización;
- versión de regla;
- estado administrativo;
- vigencia o expiración;
- costo o relación en puntos cuando aplique;
- condiciones de elegibilidad;
- límites y exclusiones;
- alcance organizacional/comercial;
- aplicabilidad por sede/canal cuando exista;
- referencia a producto u oferta, sin copiar su maestro;
- referencia opcional a campaña autorizada;
- cuota, límite o restricción lógica cuando aplique;
- fuente de disponibilidad externa cuando sea necesaria;
- versión/proyección visible vigente;
- actor y decisión administrativa;
- fechas autoritativas y correlación de auditoría.

Este contrato es conceptual y no define columnas físicas.

---

#### 12. Borrador, versión, revisión y publicación

La administración deberá separar como mínimo los siguientes momentos semánticos:

```text
BORRADOR
->
REVISIÓN
->
VERSIÓN APROBADA
->
PUBLICACIÓN / ACTIVACIÓN
```

cuando el tipo de producto requiera todos esos pasos.

No se presupone que esos nombres sean enums físicos.

Invariantes:

- un borrador no visible no se trata como beneficio publicado;
- revisar no equivale a publicar;
- publicar no equivale a ejecutar una redención;
- retirar visibilidad no elimina historia;
- una versión activa conserva su identidad y vigencia;
- una modificación material a una versión activa produce una nueva versión cuando pueda alterar condiciones o interpretación histórica.

---

#### 13. Versionado y no reescritura histórica

Se conserva:

```text
CAMBIO DE REGLA
->
NUEVA VERSIÓN PROSPECTIVA
```

No se admite:

```text
CAMBIO DE REGLA
->
REESCRIBIR MOVIMIENTOS O REDENCIONES HISTÓRICAS
```

Una acumulación, redención, expiración, ajuste, reversión o compensación ya ejecutados deben conservar la regla y versión que explican el efecto aplicado.

Cambios de nombre, costo en puntos, condiciones, vigencia, límites, exclusiones o aplicabilidad no alteran retroactivamente evidencia histórica.

---

#### 14. Alta y deduplicación

Crear un producto de fidelización exige una identidad empresarial nueva solo cuando no exista ya el mismo recurso lógico.

La administración futura deberá impedir, según corresponda:

- crear dos beneficios equivalentes por doble envío;
- duplicar un recurso por refresh o retry;
- reutilizar un identificador con semántica incompatible;
- crear una recompensa nueva únicamente porque cambió su proyección visible;
- crear otro beneficio por cada campaña que lo referencie;
- copiar un producto NEXO dentro de PASS para usarlo como recompensa.

Un retry de la misma operación administrativa debe poder recuperar el resultado ya creado o actualizado sin producir otro recurso empresarial.

---

#### 15. Elegibilidad

La administración puede definir condiciones de elegibilidad, pero la elegibilidad efectiva se evalúa contra hechos vigentes al momento de uso.

Se conserva:

```text
REGLA CONFIGURADA
!=
CLIENTE ELEGIBLE AHORA
```

La elegibilidad puede depender, según contrato, de:

- cliente o relación PASS;
- marca o negocio;
- sede o canal;
- vigencia;
- saldo o estado de fidelización;
- límites de uso;
- producto u oferta referenciada;
- pedido o venta;
- disponibilidad o capacidad;
- condiciones comerciales autorizadas.

La pantalla administrativa no fabrica los hechos externos usados por esas condiciones.

---

#### 16. Costo en puntos y reglas de fidelización

El costo en puntos, cuando exista, pertenece a la regla de fidelización y debe quedar versionado.

La administración puede configurar esa regla dentro del dominio PASS, pero no puede:

- fijar saldo de un cliente;
- insertar directamente movimientos de ledger;
- ejecutar una acumulación;
- ejecutar una redención;
- convertir el costo en puntos en costo económico;
- cambiar el efecto histórico de tickets o movimientos ya emitidos bajo otra versión.

`PASS-INT-001` y `PASS-INT-002` conservan la ejecución runtime de acumulación y redención.

---

#### 17. Aplicabilidad por sede, negocio y canal

Una definición puede declarar aplicabilidad territorial o comercial sin convertir la sede del trabajador administrador en fuente de verdad.

La administración deberá distinguir:

```text
ALCANCE DE AUTORIZACIÓN DEL TRABAJADOR
!=
APLICABILIDAD DEL BENEFICIO
```

Un trabajador puede estar autorizado a administrar un conjunto empresarial que incluye varias sedes, mientras cada beneficio conserva su propia aplicabilidad.

Una sede retirada de la aplicabilidad futura no borra redenciones, movimientos o evidencia originados cuando la versión anterior era válida.

---

#### 18. Frontera con producto maestro, disponibilidad y capacidad

Cuando una recompensa o beneficio se refiera a un producto físico/comercial, PASS conserva una referencia autorizada y no replica el maestro.

Se mantiene:

```text
LOYALTY_PRODUCT
!=
PRODUCTO MAESTRO NEXO
!=
INVENTARIO
!=
CAPACIDAD PRODUCTIVA
```

La administración PASS no puede declarar como verdad propia:

- existencia de producto;
- SKU maestro;
- atributos físicos maestros;
- stock disponible;
- capacidad comprometible;
- receta o composición;
- restricción técnica;
- disponibilidad operacional actual.

Esos hechos se consumen desde su propietaria cuando la regla lo necesite.

---

#### 19. Frontera con AURA y campañas

Un producto de fidelización puede existir sin campaña.

Cuando exista una campaña autorizada:

```text
CAMPAÑA AURA
->
REFERENCIA A BENEFICIO PASS
```

No se admite:

```text
CAMPAÑA AURA
->
ESCRITURA DIRECTA DEL BENEFICIO PASS
```

La administración laboral puede conservar una referencia de correlación, pero no convierte:

- campaña en beneficio;
- beneficio en campaña;
- AURA en propietaria de fidelización;
- PASS en propietaria de intención promocional.

Mientras AURA permanezca diferida, PASS no depende de ella para crear o administrar beneficios propios.

---

#### 20. Frontera con PULSO

PULSO consume reglas y resultados autorizados para ejecutar la operación comercial.

PULSO no puede:

- administrar el maestro de fidelización;
- modificar una regla para hacer pasar una venta;
- activar un beneficio desde caja;
- cambiar vigencia o costo en puntos;
- publicar una recompensa;
- convertir un estado local en versión PASS vigente.

La validación comercial del efecto permanece fuera de esta tarea y debe revalidar la versión aplicable antes de ejecutar un efecto.

---

#### 21. Publicación y proyección visible

Publicar un producto de fidelización significa habilitar una proyección gobernada por PASS para los clientes o consumidores autorizados.

Se conserva:

```text
FUENTE PASS
->
BENEFICIO + REGLA + VERSIÓN
->
PROYECCIÓN PUBLICADA
```

La proyección no puede convertirse en fuente independiente.

Además:

```text
VISIBLE
!=
ELEGIBLE
!=
REDIMIDO
```

La publicación no reserva puntos, no descuenta puntos, no crea una redención, no marca una redención como usada y no modifica ledger.

---

#### 22. Cupos, límites y disponibilidad

Cuando el producto de fidelización incluya cupo o límite lógico, la administración puede versionar su configuración, pero el runtime debe confirmar el estado autoritativo antes de ejecutar efectos.

Cuando la disponibilidad dependa de producto, inventario o capacidad externa:

- PASS no copia la disponibilidad como maestro;
- la configuración puede declarar la dependencia;
- la publicación puede mostrar una proyección con frescura gobernada;
- la elegibilidad efectiva debe revalidar la fuente propietaria cuando corresponda;
- una proyección desactualizada no obliga a PULSO a cumplir un efecto imposible.

---

#### 23. Concurrencia, idempotencia y conflicto administrativo

Las mutaciones futuras deberán impedir que dos actores o dos requests silenciosamente sobrescriban una versión vigente.

Como mínimo:

- la misma operación reintentada conserva una identidad estable cuando sea material;
- un retry no crea una segunda versión equivalente;
- un identificador reutilizado con contenido incompatible produce conflicto;
- una edición basada en una versión obsoleta no reemplaza silenciosamente cambios posteriores;
- publicar dos revisiones concurrentes no puede dejar dos versiones vigentes incompatibles cuando el contrato admita solo una;
- un timeout posterior al commit se trata como resultado desconocido hasta recuperar el resultado durable.

Esta tarea no define el mecanismo físico de locking o compare-and-swap.

---

#### 24. Corrección, retiro, vencimiento y rollback

Se conserva:

```text
CORREGIR
!=
BORRAR HISTORIA
```

```text
RETIRAR VISIBILIDAD
!=
ANULAR MOVIMIENTOS
```

```text
VENCER BENEFICIO
!=
BORRAR REDENCIONES
```

Una corrección material crea la versión prospectiva necesaria.

Retirar o vencer impide efectos futuros según la regla, pero no elimina evidencia histórica ni modifica por sí solo ledger, tickets o ventas existentes.

Un rollback administrativo debe restaurar una versión compatible o publicar una nueva decisión trazable; no debe mutar silenciosamente el contenido histórico de una versión ya aplicada.

---

#### 25. Fallo cerrado y resultados administrativos

La superficie laboral debe distinguir, como mínimo, resultados semánticos de:

- lectura autorizada;
- lectura denegada;
- borrador guardado;
- cambio rechazado por validación;
- conflicto de versión;
- aprobación o publicación confirmada;
- resultado ya aplicado;
- retiro confirmado;
- resultado desconocido;
- fallo técnico.

Una UI optimista no puede presentar publicación o retiro como hecho final antes de confirmación autoritativa.

Falta de permiso, alcance irresoluble, versión incompatible, referencia externa inválida o dependencia crítica no demostrable deben fallar cerrados.

---

#### 26. Auditoría mínima

La administración materializada deberá poder reconstruir, según aplicabilidad:

```text
QUE LOYALTY_PRODUCT
QUE TIPO
QUE REGLA
QUE VERSION ANTERIOR
QUE VERSION RESULTANTE
QUE CAMPOS / CONDICIONES CAMBIARON
QUE VIGENCIA
QUE ALCANCE / APLICABILIDAD
QUE REFERENCIAS EXTERNAS
QUE ACTOR
QUE AUTORIDAD / ALCANCE
QUE ACCION ADMINISTRATIVA
CUANDO
QUE RESULTADO
CON QUE CORRELACION
```

No se almacenan PIN, tokens, secretos ni información de cliente innecesaria en la auditoría administrativa del producto.

---

#### 27. Experiencia administrativa mínima

La implementación futura deberá permitir que el trabajador autorizado comprenda antes de confirmar una mutación:

- qué recurso está editando;
- qué versión sirve de base;
- qué cambió;
- desde cuándo aplica;
- a qué organización, negocio, campaña, sede o canal aplica;
- qué consumidores o efectos pueden verse afectados;
- qué validaciones externas son requeridas;
- si está guardando borrador, aprobando, publicando, retirando o corrigiendo;
- qué resultado autoritativo devolvió el servidor.

Las acciones sensibles deben evitar formularios que mezclen sin separación clara creación, publicación y efectos runtime.

---

#### 28. Separación de responsabilidades dentro del mini-bloque

| Tarea | Responsabilidad |
| --- | --- |
| `PASS-INT-001` | contrato PULSO → PASS para acumulación |
| `PASS-INT-002` | contrato PULSO → PASS para redención |
| `PASS-INT-003` | administración laboral de productos de fidelización |
| `PASS-INT-004` | administración laboral de clientes cuando corresponda |
| `PASS-INT-005` | impedir mezcla de identidad cliente y trabajador |

`PASS-INT-003` no administra clientes individuales y no redefine identidad laboral.

---

#### 29. Handoff hacia implementación

La materialización posterior deberá conservar este contrato en las capas propietarias:

- fuente PASS de productos, beneficios y reglas de fidelización;
- autorización laboral canónica y sus alcances;
- superficie administrativa aprobada;
- contratos de versión, publicación y auditoría;
- referencias a NEXO/FOGO/PULSO/NUMERA/AURA sin escrituras cruzadas;
- persistencia y RLS/grants/funciones de Supabase desde `vento-shell` cuando corresponda;
- contratos y tipos compartidos cuando sean necesarios;
- proyección cliente PASS;
- pruebas de autorización, versión, concurrencia, integración y regresión.

La implementación no podrá usar `viso.loyalty.products.view` como sustituto de autoridad mutante.

---

#### 30. Requisitos de prueba derivados

**Resultado:** NO GENERA REQUISITOS DE PRUEBA

**Requisitos creados:** 0
**Requisitos modificados:** 0
**Requisitos diferidos:** 0
**Requisitos obsoletos:** 0
**Fragmentos del Registro 04A afectados:** 0

**Justificación:** las obligaciones verificables de ownership PASS, reglas/versiones, consistencia de recompensas, fuente empresarial única, autorización explícita, alcance, auditoría, idempotencia, integración y protección del ledger ya están cubiertas por requisitos canónicos vigentes. Esta tarea organiza esas obligaciones para la administración laboral de `LOYALTY_PRODUCT` sin introducir una conducta material nueva que requiera otra fila de prueba.

---

#### 31. Cobertura de prueba vigente reutilizada

Sin modificar el Registro 04A, se reutiliza principalmente:

- `TREQ-PASS-004` para impedir divergencia de metadatos administrables de sede consumidos por PASS;
- `TREQ-PASS-006` para conservar recompensas y experiencia comercial coherentes por sede y ruta;
- `TREQ-PASS-010` para reglas/versiones de fidelización, ledger inmutable y efectos reconciliables;
- `TREQ-PASS-025` para que acumulación runtime use reglas vigentes sin conceder mutación de ledger a la administración;
- `TREQ-PASS-027` para que redención runtime valide recompensa, sede, vigencia y estado vigentes;
- `TREQ-AUTH-001` para autorización mediante permiso, contexto y alcance canónicos;
- `TREQ-AUTH-004` para equivalencia de decisiones entre evaluadores;
- `TREQ-AUTH-015` para evidencia correlacionable de decisiones protegidas;
- `TREQ-INTEGRATION-003` para identidad estable, idempotencia, retry y recuperación de resultados;
- `TREQ-INTEGRATION-006` para preservar una sola fuente empresarial y evitar maestros competidores;
- `TREQ-PROC-021` para preservar ownership y evitar duplicidad de responsabilidades entre dominios.

Esta sección es trazabilidad de cobertura existente y no actualiza el Registro 04A.

---

#### 32. Evidencia de validación

| Clase | Estado | Evidencia |
| --- | --- | --- |
| BUILD | `NOT_EXECUTED` | La compilación documental real corresponde a la incorporación de `PASS-INT-003` mediante los scripts canónicos. |
| LOCAL | `NOT_EXECUTED` | La tarea todavía no ha sido insertada en un checkout para ejecutar formateador, quality, delivery check, validadores proporcionales y batería global. |
| REMOTA | `PASS` | Se verificaron en `vento-shell/main` protocolo, contrato de entrega, manifiesto, continuidad, topología/políticas, archivo propietario, permisos `BASE_ONLY`, contrato `LOYALTY_PRODUCT`, experiencia administrativa, fronteras PASS/AURA/PULSO/NEXO/FOGO/NUMERA, cobertura 04A y scripts documentales vigentes. |
| OPERATIVA | `NOT_EXECUTED` | No se crearon, editaron, publicaron, retiraron ni vencieron productos de fidelización reales y no se probaron actores, concurrencia o flujos runtime. |
| FÍSICA | `NOT_APPLICABLE` | `PASS-INT-003` es `DEFINE_ONCE / NO_PHYSICAL_INSTANCE`; la implementación pertenece a consumidores/packages posteriores. |

---

#### 33. Criterios de aceptación

- [x] Se define `LOYALTY_PRODUCT` sin confundirlo con producto maestro NEXO.
- [x] Se preserva la taxonomía entre puntos, recompensa, cupón, nivel, membresía, promoción, cortesía y beneficio por campaña.
- [x] PASS conserva ownership de beneficio, recompensa y regla de fidelización.
- [x] La administración laboral queda separada de la experiencia de cliente.
- [x] Se conserva `CLIENT_CONFIG_SCOPE` y sede como aplicabilidad cuando corresponda, no como ownership automático por `employee_sites`.
- [x] Se conserva modalidad `BASE_ONLY` para la consulta administrativa vigente.
- [x] Se declara explícitamente que `viso.loyalty.products.view` no concede mutación.
- [x] No se inventan permisos de crear, editar, aprobar, publicar o retirar.
- [x] Se definen capacidades administrativas semánticas sin nombres físicos.
- [x] Se separan borrador, revisión, versión aprobada y publicación/activación.
- [x] Los cambios materiales son prospectivos y no reescriben efectos históricos.
- [x] Se define alta idempotente y conflicto ante identificador reutilizado con contenido incompatible.
- [x] Se separa regla configurada de elegibilidad efectiva.
- [x] El costo en puntos queda en la regla PASS y no se confunde con costo económico.
- [x] Se separa alcance del trabajador de aplicabilidad del beneficio.
- [x] Se preservan ownership de producto, disponibilidad y capacidad en NEXO/FOGO.
- [x] Se preserva frontera con AURA sin dependencia obligatoria de campaña.
- [x] Se preserva PULSO como ejecutora comercial y no administradora del maestro de fidelización.
- [x] Se define publicación como proyección, no como redención ni movimiento de ledger.
- [x] Se definen concurrencia, idempotencia y resultado desconocido para mutaciones administrativas futuras.
- [x] Se preservan corrección, retiro, vencimiento y rollback sin borrado histórico.
- [x] Se define auditoría mínima sin secretos ni datos de cliente innecesarios.
- [x] Se conserva ownership de `PASS-INT-004` y `PASS-INT-005`.
- [x] No se crean ni modifican requisitos de prueba.
- [x] No se modifica Registro 04A.
- [x] No se autoriza implementación física ni cambios de Supabase.

---

#### 34. Límites

Esta tarea no:

- implementa una pantalla administrativa;
- decide una ruta física de VISO o PASS;
- crea nombres de permisos de mutación;
- modifica el catálogo canónico de autorización;
- concede permisos a roles;
- modifica `loyalty_rewards` ni otra estructura física equivalente;
- crea tablas, columnas, RPC, triggers, RLS, grants, Edge Functions o migraciones;
- crea o modifica productos maestros de NEXO;
- edita inventario o capacidad de NEXO/FOGO;
- crea campañas de AURA;
- ejecuta promociones o ventas en PULSO;
- calcula margen, presupuesto o costo económico de NUMERA;
- cambia saldo de clientes;
- inserta, ajusta o revierte ledger;
- ejecuta acumulaciones o redenciones;
- administra datos de cliente individual;
- resuelve identidad cliente/trabajador completa;
- publica productos reales;
- declara que una implementación actual ya cumple este contrato;
- modifica 04A;
- crea requisitos de prueba;
- inicia una instancia física o package.

---

#### 35. Continuidad

**ÚLTIMA TAREA APROBADA**
`PASS-INT-002 — Definir integración PULSO → PASS para redención`

**TAREA ACTUAL APROBADA**
`PASS-INT-003 — Definir administración laboral de productos de fidelización`

**SIGUIENTE TAREA RESERVADA**
`PASS-INT-004 — Definir administración laboral de clientes cuando corresponda`
### ✅ PASS-INT-004 — Definir administración laboral de clientes cuando corresponda

**Estado:** APROBADA
**Tarea anterior:** PASS-INT-003 — Definir administración laboral de productos de fidelización
**Tarea siguiente:** PASS-INT-005 — Evitar mezclar identidad cliente y trabajador
**Tipo de tarea:** documental; define una sola vez el contrato de administración laboral de clientes de fidelización cuando exista finalidad autorizada, incluyendo identidad y dominio del recurso, autorización base sensible, alcance por dominio cliente o negocio, separación de sesión cliente y RBAC laboral, minimización, field masks, búsqueda/listado/detalle, actividad por sede como filtro y no ownership, cliente ocasional, vinculación de cuenta, deduplicación, fusión reversible, consentimientos, privacidad, historial, proyecciones operativas mínimas, exportación separada, auditoría, concurrencia, resultado desconocido y handoff hacia implementación sin crear una instancia física propia; `DEFINE_ONCE` / `NO_PHYSICAL_INSTANCE`
**Bloque:** BLOQUE V — PASS — INTEGRACIONES DE FIDELIZACIÓN
**Repositorio propietario:** `vento-group-sas/vento-shell`
**Archivo propietario:** `docs/plan-canonico/modular/bloques/V_PASS/02_INTEGRACIONES_DE_FIDELIZACION.md`
**Estado físico resultante:** `NO_PHYSICAL_INSTANCE`
**Cambios físicos autorizados:** ninguno; esta tarea no modifica `vento-pass`, `vento-viso`, `vento-pulso`, Supabase, Auth, tablas, vistas, RPC, RLS, Storage, contratos, permisos, rutas, pantallas, datos personales, consentimientos, ledger, puntos, redenciones, campañas, packages, secretos ni despliegues
**Requisitos de prueba creados o modificados:** 0

---

#### 1. Propósito

Definir el contrato canónico mediante el cual un trabajador explícitamente autorizado puede consultar y, únicamente cuando exista una capacidad mutante también explícita, administrar información de clientes de fidelización sin convertir la sesión de cliente, la relación con una sede, una coincidencia de contacto, un rol laboral o una pantalla operativa en autoridad sobre la identidad personal.

El resultado debe permitir que implementación y pruebas posteriores respondan de forma inequívoca:

```text
¿QUÉ REPRESENTA UN LOYALTY_CUSTOMER?
¿QUÉ PARTE DE SU INFORMACIÓN PUEDE VER UN TRABAJADOR?
¿QUÉ FINALIDAD JUSTIFICA ESA CONSULTA?
¿QUÉ ALCANCE EMPRESARIAL LIMITA EL CONJUNTO?
¿CUÁNDO UNA SEDE ES SOLO FILTRO DE ACTIVIDAD?
¿CÓMO SE EVITA CONFUNDIR PERSONA, CUENTA Y CONTACTO?
¿CÓMO SE RESUELVEN DUPLICADOS SIN FUSIÓN AUTOMÁTICA?
¿QUIÉN PUEDE CORREGIR, FUSIONAR, EXPORTAR O TRATAR CONSENTIMIENTOS?
¿QUÉ DATOS SON PROYECCIÓN MÍNIMA PARA PULSO?
¿CÓMO SE PRESERVAN PRIVACIDAD, AUDITORÍA Y REVERSIBILIDAD?
```

PASS conserva el dominio de identidad cliente y fidelización. La superficie laboral obtiene únicamente la proyección y las acciones que la finalidad, el permiso y el alcance autoricen.

---

#### 2. Reconciliación topológica

`PASS-INT-004` pertenece al mini-bloque `PASS-INT-001..005`, cuya reconciliación vigente establece:

```text
DEFINE_ONCE
+
NO_PHYSICAL_INSTANCE
```

Por tanto, esta tarea define contrato, responsabilidades, invariantes, restricciones de datos y handoff. No crea una pantalla, no modifica permisos, no toca datos reales, no ejecuta fusiones y no altera Supabase.

La materialización posterior pertenece a los consumidores y packages propietarios junto con los gates de autorización, privacidad, datos, integración y UX administrativa aplicables.

---

#### 3. Base documental consumida

La base inmediata es `PASS-INT-003`, que definió la administración laboral de productos de fidelización y reservó expresamente los clientes individuales para `PASS-INT-004`.

Esta tarea conserva además decisiones canónicas vigentes:

- `LOYALTY_CUSTOMER` pertenece al dominio cliente aunque su consulta sea laboral;
- la identidad cliente se separa de identidad laboral y de sesión de trabajador;
- persona, cuenta autenticada, contactos, verificaciones, relación de marca, perfil, preferencias y consentimientos no son el mismo objeto;
- puede existir un cliente ocasional sin cuenta autenticada;
- una cuenta puede vincularse posteriormente sin duplicar historia legítima;
- coincidencias de correo, teléfono o nombre no autorizan fusión automática;
- toda fusión debe ser revisada, trazable y reversible;
- consentimientos conservan finalidad, canal, versión, fuente, vigencia y retiro;
- la sede puede filtrar actividad, pero no convierte al cliente en recurso laboral de esa sede;
- las superficies operativas de PULSO reciben una proyección mínima por finalidad;
- marketing no obtiene acceso nominal general a clientes por consultar productos o campañas;
- solicitudes de privacidad utilizan un caso trazable y no una eliminación directa improvisada.

---

#### 4. Definición canónica de `LOYALTY_CUSTOMER`

Para esta tarea, `LOYALTY_CUSTOMER` es el recurso administrativo que representa la relación de un cliente con el dominio PASS y permite resolver una identidad estable y sus proyecciones autorizadas sin colapsar todos los datos de la persona en una sola fila conceptual.

Su identidad lógica de recurso es:

```text
customer_id
```

El recurso no equivale automáticamente a:

```text
PERSONA
=
CUENTA AUTENTICADA
=
CORREO
=
TELÉFONO
=
PERFIL
=
CONSENTIMIENTO
=
SALDO
```

Cada concepto conserva semántica y autoridad propias.

---

#### 5. Modelo de identidad de cliente

La administración debe preservar, cuando corresponda, la separación entre:

- persona;
- cuenta autenticada;
- contactos;
- verificaciones de contacto o identidad;
- relación con marca o negocio;
- perfil de cliente;
- preferencias;
- consentimientos;
- historial de actividad;
- relación de fidelización;
- ledger y saldo proyectado;
- pedidos, ventas, reservas, reclamos u otros procesos relacionados.

Una proyección administrativa puede reunir referencias de varios componentes, pero no adquiere autoridad para fusionarlos ni mutarlos por aparecer juntos en una pantalla.

---

#### 6. Ownership empresarial

Se conserva la siguiente propiedad:

| Materia | Propietaria o autoridad | Frontera |
| --- | --- | --- |
| identidad y relación de cliente | `PASS` | no se deriva de identidad laboral |
| cuenta/sesión del cliente | autenticación y contratos cliente de PASS | no se sustituye por RBAC laboral |
| contactos y verificaciones | dominio cliente correspondiente | minimizados según finalidad |
| preferencias y consentimientos | `PASS` / contratos de privacidad aplicables | marketing consume autorización, no la fabrica |
| ledger y saldo de fidelización | `PASS` | no se editan desde administración general de cliente |
| pedido, venta y operación comercial | `PULSO` | se referencian; no se copian como maestro cliente |
| campañas y audiencias | `AURA` cuando corresponda | no adquieren identidad nominal por inferencia |
| autorización laboral | catálogo/evaluadores canónicos | limita acceso, no cambia ownership de cliente |

Ninguna superficie laboral puede reclamar propiedad de la persona por haberla consultado.

---

#### 7. Administración laboral versus autoservicio del cliente

Se conserva obligatoriamente:

```text
ADMINISTRACIÓN LABORAL DE CLIENTE
!=
AUTOSERVICIO DEL CLIENTE
```

Por tanto:

- la sesión normal de cliente no recibe permisos laborales;
- un trabajador autorizado no actúa como si fuera el cliente;
- el cliente no obtiene `viso.loyalty.customers.view` por iniciar sesión en PASS;
- el trabajador no hereda consentimientos, preferencias ni autoridad personal del cliente;
- un cambio permitido al cliente en autoservicio no se vuelve automáticamente una acción laboral;
- una acción laboral sensible requiere su propia capacidad, finalidad, alcance y evidencia.

`PASS-INT-005` conserva la separación final entre identidad cliente y trabajador cuando una misma persona posea ambas relaciones.

---

#### 8. Recurso y alcance administrativo

La capacidad canónica de consulta observada protege el recurso:

```text
LOYALTY_CUSTOMER
```

mediante:

```text
viso.loyalty.customers.view
```

con alcance:

```text
CLIENT_DOMAIN
```

El conjunto autorizado se resuelve por organización o negocio del cliente.

La sede:

- puede utilizarse como filtro de actividad;
- no representa propiedad territorial del cliente;
- no concede `OWN` laboral;
- no transforma una visita, compra o redención local en pertenencia del cliente a esa sede;
- no autoriza campos adicionales por coincidencia con `employee_sites`.

Un conjunto global de clientes requiere concesión base sensible explícita.

---

#### 9. Modalidad de autorización

`viso.loyalty.customers.view` pertenece a:

```text
BASE_ONLY
```

Por tanto:

- no depende de turno;
- no depende de check-in;
- no pertenece a la sesión cliente;
- no se concede a roles operativos por inferencia;
- no se convierte en autoridad global por ser base;
- requiere responsabilidad específica y finalidad autorizada;
- mantiene el alcance exacto resuelto por servidor.

La ausencia de una concesión válida debe denegar la consulta sin degradarse a filtros locales permisivos.

---

#### 10. Entrada a superficie y permiso de datos son decisiones distintas

Cuando una administración laboral se exponga mediante una superficie PASS, `pass.access` solo podrá representar entrada laboral o administrativa a esa aplicación.

Se conserva:

```text
pass.access
!=
viso.loyalty.customers.view
```

La entrada a la aplicación no expone automáticamente clientes, puntos, recompensas, canjes o actividad.

Del mismo modo, una capacidad de datos no autoriza por sí sola una ruta, una aplicación o una acción mutante distinta de su contrato.

Esta tarea no decide la ruta física definitiva de la administración.

---

#### 11. Lectura no implica mutación, exportación ni suplantación

Se conserva:

```text
viso.loyalty.customers.view
!=
EDITAR CLIENTE
!=
FUSIONAR CLIENTES
!=
EXPORTAR DATOS
!=
CAMBIAR CONSENTIMIENTO
!=
CAMBIAR SALDO
!=
ACTUAR COMO CLIENTE
```

Esta tarea no inventa nombres de permisos de edición, fusión, exportación, supresión o gestión de consentimiento.

La implementación futura solo podrá habilitar una mutación sensible cuando exista una capacidad canónica explícita con actor, finalidad, alcance, condiciones y evidencia definidos. De lo contrario, la acción debe fallar cerrada.

---

#### 12. Significado de «cuando corresponda»

La administración laboral de clientes no es un directorio empresarial abierto.

Solo corresponde consultar o intervenir un cliente cuando exista una finalidad administrativa autorizada, por ejemplo:

- resolver un duplicado o vínculo de identidad;
- atender una solicitud de privacidad;
- revisar una inconsistencia de consentimiento;
- investigar una actividad de fidelización dentro de un caso autorizado;
- resolver un caso de servicio al cliente que requiera la identidad mínima necesaria;
- verificar una correlación con pedido, venta, redención o historial cuando el proceso lo permita.

La existencia de curiosidad operativa, cercanía con una sede, relación personal, campaña o rol genérico no constituye finalidad válida.

---

#### 13. Listado y búsqueda

La colección de clientes debe construirse del lado servidor sobre el conjunto autorizado.

Se conserva:

```text
CONJUNTO AUTORIZADO EN SERVIDOR
->
PAGINACIÓN / FILTRO AUTORIZADO
->
PROYECCIÓN MÍNIMA
```

No se admite:

```text
OBTENER MASIVAMENTE TODOS LOS CLIENTES
->
FILTRAR EN EL CLIENTE
```

Los filtros enviados por interfaz pueden reducir el conjunto, nunca ampliarlo.

Una búsqueda o listado debe:

- respetar `CLIENT_DOMAIN`;
- aplicar minimización y field masks;
- paginar desde servidor;
- evitar enumeración masiva no autorizada;
- no usar sede, correo, teléfono o nombre como bypass de alcance;
- no persistir resultados más allá de la necesidad autorizada.

---

#### 14. Detalle y minimización

La vista detallada debe presentar únicamente los campos necesarios para la finalidad y capacidad autorizadas.

Una proyección administrativa puede diferir de otra operativa o de autoservicio.

Se conserva:

```text
MISMO CUSTOMER_ID
+
FINALIDADES DISTINTAS
->
PROYECCIONES DISTINTAS
```

No se asume que un trabajador que pueda consultar identidad básica pueda ver simultáneamente:

- todos los contactos;
- todas las verificaciones;
- todos los consentimientos;
- todo el historial de compra;
- todos los pedidos;
- todos los reclamos;
- todo el ledger;
- saldo detallado;
- datos de seguridad;
- datos retenidos por obligación legal.

Cada campo sensible permanece sujeto a finalidad, permiso y contrato del recurso.

---

#### 15. Actividad por sede no es propiedad del cliente

Una interacción puede referenciar una sede para explicar actividad histórica o reciente.

Esto permite filtros como:

```text
ACTIVIDAD EN SEDE X
```

pero no autoriza inferir:

```text
CLIENTE PERTENECE A SEDE X
```

Consecuencias:

- el cliente puede tener actividad en múltiples sedes;
- una sede no obtiene propiedad de su identidad;
- un gerente local no recibe acceso general a clientes por actividad local si su matriz no lo concede;
- una sede cerrada no borra ni reasigna identidad histórica;
- el historial debe conservar atribución determinista o declarar explícitamente ausencia de atribución cuando corresponda.

---

#### 16. Cliente ocasional y vinculación posterior

Una persona puede existir como cliente ocasional sin cuenta autenticada.

Se conserva:

```text
PERSONA / CLIENTE OCASIONAL
!=
CUENTA AUTENTICADA OBLIGATORIA
```

Cuando posteriormente exista vinculación válida con una cuenta:

- debe conservarse la identidad empresarial estable;
- la historia legítima no debe duplicarse;
- la vinculación debe ser trazable;
- coincidencias nominales no constituyen prueba suficiente;
- la operación no debe fabricar compras, puntos o consentimientos faltantes;
- una cuenta nueva no borra la procedencia de actividad previa.

---

#### 17. Detección de duplicados

La administración puede detectar candidatos a duplicado, pero no fusionarlos automáticamente por coincidencia débil.

Se conserva:

```text
MISMO NOMBRE
O
MISMO CORREO
O
MISMO TELÉFONO
!=
MISMA PERSONA DEMOSTRADA
```

La detección debe separar:

- señal de posible duplicado;
- evidencia disponible;
- contradicciones;
- relaciones ya verificadas;
- riesgo de mezclar dos personas reales;
- decisión administrativa posterior.

Un algoritmo de matching puede asistir la revisión, pero no sustituye el gate de decisión requerido.

---

#### 18. Fusión y reversibilidad

Cuando exista una capacidad canónica futura para fusionar clientes, la operación deberá ser revisada, trazable y reversible.

La fusión debe poder reconstruir, según aplicabilidad:

- identidad primaria resultante;
- identidades vinculadas;
- evidencia usada;
- actor decisor;
- motivo;
- contactos y verificaciones preservados;
- relaciones de marca;
- preferencias y consentimientos sin ampliación por inferencia;
- historia de pedidos/ventas;
- ledger y redenciones sin duplicación;
- conflictos no resueltos;
- mecanismo de reversa.

No se elimina historia únicamente para “limpiar” duplicados.

---

#### 19. Corrección de datos de cliente

Una corrección laboral futura no equivale a editar libremente cualquier dato personal.

Cada cambio debe distinguir:

- dato corregible por autoservicio del cliente;
- dato que requiere verificación;
- dato que requiere caso o soporte;
- dato derivado de otro dominio;
- dato histórico que no debe reescribirse;
- dato retenido por obligación válida;
- dato que solo puede rectificarse mediante una capacidad sensible específica.

La interfaz no puede utilizar un campo editable para cambiar silenciosamente identidad, verificación, consentimiento o ledger.

---

#### 20. Consentimientos y preferencias

Consentimiento y preferencia no son flags administrativos genéricos.

Todo consentimiento debe conservar, cuando aplique:

- finalidad;
- canal;
- versión;
- fuente;
- evidencia;
- vigencia;
- retiro o revocación.

Un trabajador no puede marcar consentimiento afirmativo porque el cliente compró, acumuló puntos, visitó una sede, respondió una campaña o aparece en una base de datos.

La administración puede resolver inconsistencias únicamente mediante el proceso y autoridad aprobados.

Marketing consume la autorización mínima necesaria y no obtiene acceso nominal general por esta tarea.

---

#### 21. Solicitudes de privacidad

Las solicitudes de acceso, actualización, rectificación, información de uso o supresión deben tratarse como casos trazables.

Se conserva:

```text
SOLICITUD DE SUPRESIÓN
!=
DELETE DIRECTO DE TODO EL CLIENTE
```

La resolución debe considerar categorías y obligaciones aplicables sobre:

- cuenta y acceso;
- contactos;
- preferencias y consentimientos;
- historial comercial;
- facturación;
- fraude y seguridad;
- puntos y fidelización;
- auditoría;
- copias controladas en otros dominios.

La tarea no redefine los contratos del dominio de información y privacidad ni autoriza borrado físico inmediato.

---

#### 22. Historial y actividad

La administración puede necesitar una proyección de actividad autorizada para investigar o resolver un caso.

La proyección debe conservar:

- identidad de cliente correcta;
- origen del hecho;
- negocio o marca cuando corresponda;
- sede atribuida cuando exista evidencia determinista;
- estado sin atribución cuando la fuente no permita resolver sede;
- correlación con pedido, venta, movimiento, redención o caso sin copiar maestros completos.

El historial no se usa como fuente para cambiar identidad ni como prueba de propiedad territorial.

---

#### 23. Ledger, puntos y redenciones permanecen separados

La administración laboral de clientes no autoriza alterar el ledger.

Se conserva:

```text
VER CLIENTE
!=
FIJAR SALDO
!=
OTORGAR PUNTOS
!=
AJUSTAR PUNTOS
!=
REDIMIR
!=
REVERSAR
```

Las acumulaciones y redenciones permanecen gobernadas por `PASS-INT-001` y `PASS-INT-002` y por sus contratos de servidor.

Una eventual proyección de saldo dentro de una vista administrativa continúa siendo una lectura derivada y no un campo editable.

---

#### 24. Proyección operativa hacia PULSO

La identificación operacional de un cliente en PULSO no equivale a abrir la administración laboral completa.

PULSO debe recibir únicamente una proyección mínima para la acción autorizada.

Se conserva:

```text
PROYECCIÓN OPERATIVA MÍNIMA
!=
FICHA ADMINISTRATIVA COMPLETA
```

Por tanto:

- un código debe resolverse en servidor;
- la finalidad operacional limita los campos;
- nombre, contacto o saldo deben aplicar minimización/enmascaramiento cuando corresponda;
- no se habilita búsqueda masiva;
- el estado debe limpiarse al terminar, cambiar cliente o expirar la operación;
- PULSO no adquiere permiso administrativo sobre el cliente.

---

#### 25. Marketing, audiencias y campañas

La administración nominal de clientes no se concede a Marketing por implicación.

La planeación comercial debe preferir:

- métricas agregadas;
- segmentos gobernados;
- audiencias minimizadas;
- identificadores o proyecciones específicas cuando exista contrato aprobado.

Consultar productos de fidelización no concede clientes.

Crear una campaña no concede identidades.

Una correlación de campaña no amplía consentimiento ni convierte actividad de fidelización en autorización de contacto.

---

#### 26. Casos de servicio y administración de cliente

El patrón administrativo vigente incluye la necesidad de resolver duplicados, consentimientos y solicitudes de privacidad mediante un administrador autorizado de clientes.

La administración debe conservar separado el expediente o caso que justifica una acción de la identidad del cliente sobre la que se actúa.

Un caso puede referenciar cliente, pedido, venta, sede, recompensa o comunicación sin convertir todos esos dominios en una sola entidad editable.

Cerrar el caso no debe mutar automáticamente ledger, consentimiento, pago, devolución o identidad salvo que el contrato propietario haya ejecutado el efecto correspondiente.

---

#### 27. Exportación y uso secundario

La capacidad de consulta no concede exportación masiva.

Se conserva:

```text
VIEW
!=
EXPORT
```

Cualquier exportación futura de datos personales deberá exigir una capacidad sensible específica y definir, como mínimo:

- finalidad;
- actor;
- alcance;
- campos;
- población;
- enmascaramiento;
- formato;
- destino;
- retención;
- evidencia de generación y acceso.

Copiar lateralmente datos hacia hojas, archivos, campañas o sistemas externos sin contrato aprobado no constituye administración canónica.

---

#### 28. Concurrencia, idempotencia y resultado desconocido

Las mutaciones sensibles que existan en una implementación futura deberán tratar reintentos, concurrencia y resultado desconocido de forma explícita.

Como mínimo:

- un retry de la misma corrección no crea otra identidad;
- una fusión repetida no duplica relaciones ni ledger;
- dos decisiones concurrentes sobre el mismo vínculo no pueden sobrescribirse silenciosamente;
- una decisión basada en versión obsoleta debe producir conflicto o revalidación;
- un timeout posterior al commit debe recuperar el resultado durable antes de repetir la mutación;
- una solicitud de privacidad no se marca como resuelta dos veces por reintento;
- un identificador reutilizado con contenido incompatible produce conflicto.

Esta tarea no define el mecanismo físico de locking o idempotency key.

---

#### 29. Fallo cerrado y resultados administrativos

La superficie laboral deberá distinguir, según aplicabilidad:

- lectura autorizada;
- sin resultados dentro del conjunto autorizado;
- identidad no encontrada;
- lectura denegada;
- alcance irresoluble;
- campo restringido;
- acción mutante no autorizada;
- conflicto de identidad;
- candidato a duplicado pendiente de revisión;
- cambio confirmado;
- resultado ya aplicado;
- resultado desconocido;
- fallo técnico.

Una ausencia de datos no puede convertirse en permiso, identidad nueva o confirmación de una mutación.

Un error de módulos laborales tampoco puede impedir el acceso normal de un cliente válido ni degradarse a privilegios por defecto.

---

#### 30. Auditoría mínima

La administración materializada deberá poder reconstruir, según aplicabilidad:

```text
QUE CUSTOMER_ID
QUE FINALIDAD
QUE ACTOR LABORAL
QUE PERMISO / ALCANCE
QUE PROYECCION FUE CONSULTADA
QUE FILTROS SE USARON
QUE CAMPOS SENSIBLES FUERON EXPUESTOS
QUE CASO O PROCESO JUSTIFICO LA ACCION
QUE CAMBIO SE SOLICITO
QUE VERSION / ESTADO BASE EXISTIA
QUE RESULTADO QUEDO
CUANDO
CON QUE CORRELACION
```

Para fusiones, correcciones sensibles, privacidad o exportaciones deberá conservarse la evidencia adicional necesaria para reconstruir la decisión y revertirla cuando el contrato lo permita.

La auditoría no debe almacenar secretos ni copias innecesarias de datos personales.

---

#### 31. Retención, caché y limpieza

Las proyecciones laborales de clientes deben minimizar persistencia local.

La implementación futura deberá:

- limitar caché a lo estrictamente necesario;
- limpiar datos al cambiar de cliente, finalidad o sesión cuando corresponda;
- no conservar fichas completas en almacenamiento local por conveniencia;
- no reutilizar datos stale como autoridad;
- respetar retención y supresión por categoría;
- impedir que una simulación laboral conserve datos reales innecesarios;
- impedir que un dispositivo compartido mantenga datos de un cliente anterior.

Un dato retenido por obligación válida no queda disponible para cualquier finalidad posterior.

---

#### 32. Experiencia administrativa mínima

La implementación futura debe permitir que el trabajador autorizado comprenda antes de actuar:

- qué cliente está consultando;
- qué identidad está confirmada y qué coincidencias son solo candidatos;
- qué negocio o dominio cliente limita la consulta;
- qué finalidad habilita la operación;
- qué campos están ocultos o enmascarados;
- si la sede mostrada es actividad y no ownership;
- qué cambio requiere verificación o aprobación adicional;
- qué operación afectaría consentimiento, identidad o privacidad;
- si existe conflicto, resultado desconocido o información stale;
- qué resultado autoritativo devolvió el servidor.

La interfaz no debe presentar una acción sensible como un CRUD ordinario sin contexto ni evidencia.

---

#### 33. Separación de responsabilidades dentro del mini-bloque

| Tarea | Responsabilidad |
| --- | --- |
| `PASS-INT-001` | contrato PULSO → PASS para acumulación |
| `PASS-INT-002` | contrato PULSO → PASS para redención |
| `PASS-INT-003` | administración laboral de productos de fidelización |
| `PASS-INT-004` | administración laboral de clientes cuando corresponda |
| `PASS-INT-005` | impedir mezcla de identidad cliente y trabajador |

`PASS-INT-004` no redefine la administración de productos y no cierra por sí sola la identidad dual cliente/trabajador reservada a `PASS-INT-005`.

---

#### 34. Handoff hacia implementación

La materialización posterior deberá conservar este contrato en las capas propietarias:

- fuente PASS de identidad y relación de cliente;
- autorización laboral canónica y `CLIENT_DOMAIN`;
- separación de `pass.access` y capacidad de datos;
- proyecciones minimizadas y field masks;
- paginación y filtros de servidor;
- casos de deduplicación, privacidad y soporte;
- contratos de fusión reversible cuando exista capacidad autorizada;
- contratos de consentimiento y derechos del titular;
- integración PULSO con proyección operativa mínima;
- contratos compartidos cuando sean necesarios;
- persistencia, RLS, grants, funciones y migraciones de Supabase exclusivamente desde `vento-shell` cuando corresponda;
- pruebas de autorización, privacidad, minimización, concurrencia, integración y regresión.

La implementación no podrá usar `viso.loyalty.customers.view` como sustituto de autoridad mutante o exportación.

---

#### 35. Requisitos de prueba derivados

**Resultado:** NO GENERA REQUISITOS DE PRUEBA

**Requisitos creados:** 0
**Requisitos modificados:** 0
**Requisitos diferidos:** 0
**Requisitos obsoletos:** 0
**Fragmentos del Registro 04A afectados:** 0

**Justificación:** las obligaciones verificables de identidad cliente separada, deduplicación y fusión reversible, privacidad, consentimientos, administración laboral sensible, minimización, proyección operativa, aislamiento cliente-trabajador, autorización y alcance ya están cubiertas por requisitos canónicos vigentes. Esta tarea organiza esas obligaciones para `LOYALTY_CUSTOMER` sin introducir una conducta material nueva que requiera otra fila de prueba.

---

#### 36. Cobertura de prueba vigente reutilizada

Sin modificar el Registro 04A, se reutiliza principalmente:

- `TREQ-PASS-003` para atribución determinista de actividad histórica por sede o estado explícito sin atribución;
- `TREQ-PASS-010` para separar persona, cuenta, contactos, verificaciones, relación de marca, perfil, preferencias, consentimientos y fidelización, además de deduplicación y fusión reversible;
- `TREQ-PASS-012` para finalidad, preferencias, revocaciones, derechos del titular, supresión por categoría y reconciliación de copias;
- `TREQ-PASS-016` para mostrar controles laborales únicamente con perfil laboral vigente y capacidad aprobada;
- `TREQ-PASS-017` para minimizar la proyección laboral y evitar que datos cliente eleven autoridad;
- `TREQ-PASS-023` para identificación de cliente resuelta en servidor y proyección mínima operacional;
- `TREQ-PASS-024` para minimización, enmascaramiento, finalidad, retención y prohibición de búsqueda masiva o persistencia indebida en PULSO;
- `TREQ-PASS-033` para que módulos laborales fallen cerrados sin afectar la experiencia válida del cliente;
- `TREQ-PASS-034` para preservar propiedad y fronteras entre PASS y PULSO;
- `TREQ-AUTH-001` para autorización por permiso, contexto y alcance canónicos;
- `TREQ-AUTH-006` para separación y minimización de identidad cliente frente a datos privilegiados;
- `TREQ-AUTH-007` para exigir capacidad administrativa explícita y alcance;
- `TREQ-AUTH-014` para invalidar autoridad derivada cuando cambie el contexto y evitar decisiones stale;
- `TREQ-INTEGRATION-003` para idempotencia, retry y recuperación de resultados distribuidos;
- `TREQ-INTEGRATION-014` para preservar identidad, consentimiento y contratos de cliente entre dominios relacionados.

Esta sección es trazabilidad de cobertura existente y no actualiza el Registro 04A.

---

#### 37. Evidencia de validación

| Clase | Estado | Evidencia |
| --- | --- | --- |
| BUILD | `NOT_EXECUTED` | La compilación documental real corresponde a la incorporación de `PASS-INT-004` mediante los scripts canónicos. |
| LOCAL | `NOT_EXECUTED` | La tarea todavía no ha sido insertada en un checkout para ejecutar formateador, quality, delivery check, validadores proporcionales y batería global. |
| REMOTA | `PASS` | Se verificaron en `vento-shell/main` protocolo, contrato de entrega, manifiesto, continuidad, topología/políticas, archivo propietario, recurso `LOYALTY_CUSTOMER`, permiso `viso.loyalty.customers.view`, modalidad `BASE_ONLY`, `CLIENT_DOMAIN`, minimización/field masks, matrices laborales, experiencia administrativa, cobertura 04A y scripts documentales vigentes. |
| OPERATIVA | `NOT_EXECUTED` | No se consultaron, editaron, fusionaron, exportaron ni suprimieron clientes reales y no se ejecutaron flujos runtime, campañas, casos de privacidad o acciones PULSO. |
| FÍSICA | `NOT_APPLICABLE` | `PASS-INT-004` es `DEFINE_ONCE / NO_PHYSICAL_INSTANCE`; la implementación pertenece a consumidores/packages posteriores. |

---

#### 38. Criterios de aceptación

- [x] Se define `LOYALTY_CUSTOMER` como recurso del dominio cliente con identidad lógica estable.
- [x] Se separan persona, cuenta, contactos, verificaciones, relación de marca, perfil, preferencias, consentimientos y fidelización.
- [x] Se conserva cliente ocasional sin exigir cuenta autenticada.
- [x] Se conserva vinculación posterior sin duplicar historia legítima.
- [x] Se impide fusión automática por nombre, correo o teléfono coincidente.
- [x] Se exige que toda fusión futura sea revisada, trazable y reversible.
- [x] Se conserva `CLIENT_DOMAIN` por organización/negocio y sede únicamente como filtro de actividad.
- [x] Se declara que no existe `OWN` laboral sobre clientes.
- [x] Se conserva `viso.loyalty.customers.view` como `BASE_ONLY`.
- [x] Se separa `pass.access` de la capacidad de consultar clientes.
- [x] Se declara que `view` no concede edición, fusión, exportación, consentimiento, saldo ni suplantación.
- [x] No se inventan permisos mutantes.
- [x] Se define «cuando corresponda» mediante finalidad administrativa autorizada.
- [x] Se exige listado/búsqueda construidos y paginados desde servidor.
- [x] Se definen minimización y field masks por finalidad.
- [x] Se impide usar actividad por sede como propiedad territorial del cliente.
- [x] Se preservan consentimientos con finalidad, canal, versión, fuente, vigencia y retiro.
- [x] Se preservan solicitudes de privacidad como casos trazables y no deletes directos.
- [x] Se separa administración de cliente de mutaciones de ledger, puntos y redenciones.
- [x] Se separa ficha administrativa de proyección operativa mínima PULSO.
- [x] Se impide otorgar acceso nominal general a Marketing por inferencia.
- [x] Se separa consulta de exportación y uso secundario.
- [x] Se definen concurrencia, idempotencia, conflictos y resultado desconocido para mutaciones futuras.
- [x] Se define auditoría mínima y retención/caché controladas.
- [x] Se conserva ownership posterior de `PASS-INT-005` para identidad cliente/trabajador.
- [x] No se crean ni modifican requisitos de prueba.
- [x] No se modifica Registro 04A.
- [x] No se autoriza implementación física ni cambios de Supabase.

---

#### 39. Límites

Esta tarea no:

- implementa una pantalla laboral de clientes;
- decide la ruta física definitiva de VISO o PASS;
- crea nombres de permisos de edición, fusión, exportación o privacidad;
- modifica el catálogo canónico de autorización;
- concede permisos a roles;
- consulta o modifica datos reales de clientes;
- crea, fusiona o elimina clientes;
- vincula cuentas reales;
- verifica contactos reales;
- modifica consentimientos o preferencias reales;
- exporta datos personales;
- cambia saldo o ledger;
- otorga, ajusta, revierte o redime puntos;
- ejecuta pedidos, ventas, pagos o devoluciones;
- crea campañas o audiencias nominales;
- modifica Auth, tablas, vistas, RPC, RLS, Storage, grants, Edge Functions o migraciones;
- resuelve por completo identidad dual cliente/trabajador;
- declara que una implementación actual ya cumple este contrato;
- modifica 04A;
- crea requisitos de prueba;
- inicia una instancia física o package.

---

#### 40. Continuidad

**ÚLTIMA TAREA APROBADA**
`PASS-INT-003 — Definir administración laboral de productos de fidelización`

**TAREA ACTUAL APROBADA**
`PASS-INT-004 — Definir administración laboral de clientes cuando corresponda`

**SIGUIENTE TAREA RESERVADA**
`PASS-INT-005 — Evitar mezclar identidad cliente y trabajador`
### [ ] PASS-INT-005 — Evitar mezclar identidad cliente y trabajador
