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
### [ ] PASS-INT-003 — Definir administración laboral de productos de fidelización
### [ ] PASS-INT-004 — Definir administración laboral de clientes cuando corresponda
### [ ] PASS-INT-005 — Evitar mezclar identidad cliente y trabajador
