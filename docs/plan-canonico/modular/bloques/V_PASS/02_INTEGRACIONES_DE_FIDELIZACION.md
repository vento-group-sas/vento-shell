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
### [ ] PASS-INT-002 — Definir integración PULSO → PASS para redención
### [ ] PASS-INT-003 — Definir administración laboral de productos de fidelización
### [ ] PASS-INT-004 — Definir administración laboral de clientes cuando corresponda
### [ ] PASS-INT-005 — Evitar mezclar identidad cliente y trabajador
