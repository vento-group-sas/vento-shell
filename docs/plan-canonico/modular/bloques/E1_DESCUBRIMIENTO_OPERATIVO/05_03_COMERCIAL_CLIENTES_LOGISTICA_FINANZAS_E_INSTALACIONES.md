### MINI-BLOQUE — COMERCIAL CLIENTES LOGISTICA FINANZAS E INSTALACIONES

<!-- PLAN-SECTION-META:START -->
Esta sección organiza **comercial clientes logistica finanzas e instalaciones** dentro de **E1 DESCUBRIMIENTO OPERATIVO**. Agrupa tareas que producen un resultado funcional común y deben mantenerse juntas para conservar contexto, trazabilidad y orden de ejecución.

**Cobertura canónica:** `CAP-SCOPE-009` a `CAP-SCOPE-014` — 6 tareas.

**Resultado esperado:** al cerrar este mini-bloque, su resultado debe quedar definido, verificable y coherente con las secciones anterior y siguiente antes de avanzar.

**Contenido funcional:**

- `CAP-SCOPE-009`: Evaluar ventas, pedidos, mesas, comandas, caja y pagos
- `CAP-SCOPE-010`: Evaluar clientes, fidelización, reclamos y servicio
- `CAP-SCOPE-011`: Evaluar logística, rutas, vehículos, combustible y entregas
- `CAP-SCOPE-012`: Evaluar costos, gastos, presupuestos, tesorería, contabilidad e impuestos
- `CAP-SCOPE-013`: Evaluar instalaciones, mantenimiento, limpieza, inspecciones y calibración
- `CAP-SCOPE-014`: Evaluar marketing, campañas y contenido
<!-- PLAN-SECTION-META:END -->

### ✅ CAP-SCOPE-009 — Evaluar ventas, pedidos, mesas, comandas, caja y pagos

**Estado:** APROBADA  
**Bloque:** E1 — Descubrimiento integral de operación, capacidades y cobertura de implementación  
**Dependencia cumplida:** `CAP-SCOPE-008` aprobada  
**Tarea anterior:** `CAP-SCOPE-008`  
**Siguiente tarea reservada:** `CAP-SCOPE-010`  
**Familia evaluada:** `CAP-09 — Vender, cobrar y atender pedidos`  
**Naturaleza:** decisión de cobertura empresarial y definición conceptual objetivo  
**Implementación técnica:** no autorizada  
**Migraciones o cambios en Supabase:** no autorizados  
**Ventas, pedidos, pagos, cierres, anulaciones, importaciones o efectos reales:** no autorizados  
**Requisitos de prueba generados:** `TREQ-PULSO-005`, `TREQ-PULSO-006`, `TREQ-INTEGRATION-014`  
**Actualización del registro de pruebas:** se entrega el archivo `04A` completo regenerado; quedan prohibidas las filas sueltas

---

#### 1. Propósito

Definir el tratamiento objetivo de las capacidades mediante las cuales Vento Group deberá:

- gobernar la oferta y los precios visibles por sede, canal y modalidad;
- recibir solicitudes desde salón, mostrador, recogida, domicilio, aplicaciones, mensajes y ventas especiales;
- confirmar disponibilidad, tiempo, condiciones, sede y modalidad antes de comprometer el pedido;
- registrar pedidos con identidad estable, líneas, precios, impuestos, descuentos, canal y revisiones;
- modificar, sustituir o cancelar sin destruir la solicitud ni los efectos ya producidos;
- convertir líneas confirmadas en comandas dirigidas a la estación correcta;
- coordinar preparación, empaque, servicio, recogida y entrega sin usar un único estado ambiguo;
- registrar ventas desde PULSO o desde el POS externo temporal mediante el mismo contrato canónico;
- cobrar y confirmar pagos, incluyendo efectivo, pagos parciales y medios combinados;
- mantener referencia verificable al documento fiscal emitido por el proveedor autorizado;
- administrar zonas, mesas, sesiones, meseros, comensales, llamados, cuentas y liberación;
- controlar pedidos para llevar, aplicaciones, mensajes, catering y ventas B2B;
- abrir, operar, arquear, cerrar y revisar la jornada de caja;
- emitir efectos de inventario, fidelización y finanzas exactamente una vez;
- retirar progresivamente la dependencia del POS externo sin romper consumidores internos.

La existencia de pantallas de pedidos, salón, escáner, importación Makos, checkout y estados de pedido no permite declarar resuelta la familia `CAP-09`. La cobertura exige un ciclo comercial completo, conciliable y auditable.

---

#### 2. Pregunta de decisión

`CAP-SCOPE-009` responde:

```text
¿CÓMO DEBE VENTO GROUP RECIBIR, CONFIRMAR, PREPARAR, VENDER,
COBRAR, FACTURAR, ENTREGAR Y CONCILIAR PEDIDOS DE TODOS SUS CANALES,
SIN CONFUNDIR PEDIDO, COMANDA, VENTA, PAGO, CAJA, DOCUMENTO FISCAL,
INVENTARIO, FIDELIZACIÓN, DEVOLUCIÓN NI HECHO ECONÓMICO?
```

Quedan prohibidas equivalencias como:

```text
SOLICITUD = PEDIDO CONFIRMADO = VENTA
```

```text
PEDIDO = COMANDA = CUENTA = PAGO
```

```text
ESTADO DEL PEDIDO = ESTADO DEL PAGO = ESTADO DE PREPARACIÓN
```

```text
MESA = SESIÓN DE MESA = ORDEN
```

```text
PAGO APROBADO = DINERO CONCILIADO
```

```text
VENTA ANULADA = PEDIDO CANCELADO = DEVOLUCIÓN = REEMBOLSO
```

```text
POS EXTERNO = INVENTARIO = CONTABILIDAD = FIDELIZACIÓN
```

---

#### 3. Fuentes consolidadas

- `OPS-AUD-001` a `OPS-AUD-015`;
- `OPS-PLAN-001` a `OPS-PLAN-004`;
- `OPS-CAN-001` y `OPS-B2B-001` cuando se activen;
- `CAP-MAP-001` a `CAP-MAP-015`;
- `CODE-AUD-001` a `CODE-AUD-020`;
- `CAP-SCOPE-001` a `CAP-SCOPE-008`;
- decisiones de autorización ya aprobadas;
- `PULSO-AUTH-001` a `PULSO-AUTH-016`;
- `PULSO-UX-001` a `PULSO-UX-021`;
- `INT-POS-001` a `INT-POS-024`;
- `INT-SALES-001` a `INT-SALES-011`;
- `PASS-INT-001` y `PASS-INT-002`;
- implementación actual de PULSO para salón, pedidos, escáner y loyalty;
- implementación actual de PASS para catálogo, carrito, checkout y consulta de pedidos;
- importación manual de ventas Makos mediante Excel y mapeo de productos;
- registro vivo de preguntas, incluidas `DAT-01` a `DAT-03`, `DAT-22` a `DAT-25`, `OPE-07`, `OPE-10`, `OPE-11`, `COM-04` y `COM-05`;
- decisión `DEC-POS-001`: una venta a consumidor final puede realizarse sin registrar cliente, conservando el soporte fiscal, impuestos y trazabilidad aplicables.

Las respuestas existentes no se vuelven a solicitar.

---

#### 4. Alcance evaluado

- `CAP-09.01` — Definir oferta y precios de venta;
- `CAP-09.02` — Recibir solicitudes y pedidos;
- `CAP-09.03` — Confirmar disponibilidad y condiciones;
- `CAP-09.04` — Registrar pedidos;
- `CAP-09.05` — Modificar, sustituir o cancelar pedidos;
- `CAP-09.06` — Enviar pedidos a preparación;
- `CAP-09.07` — Coordinar preparación y entrega;
- `CAP-09.08` — Registrar ventas;
- `CAP-09.09` — Cobrar y confirmar pagos;
- `CAP-09.10` — Emitir factura o soporte;
- `CAP-09.11` — Gestionar mesas y servicio presencial;
- `CAP-09.12` — Gestionar pedidos para llevar;
- `CAP-09.13` — Gestionar pedidos recibidos por aplicaciones o mensajes;
- `CAP-09.14` — Gestionar pedidos especiales, catering y ventas a empresas;
- `CAP-09.15` — Cerrar y revisar la jornada de venta.

También fija fronteras con cliente, fidelización, inventario, producción, logística, costos, tesorería, impuestos, privacidad, impresión, continuidad y analítica.

---

#### 5. Fuera de alcance

- ejecutar ventas, cobros, cierres, anulaciones o devoluciones reales;
- reemplazar o apagar Makos/POS externo;
- emitir facturas o soportes fiscales desde una implementación no autorizada;
- modificar cuentas bancarias, proveedores de pago, llaves o secretos;
- decidir políticas de reclamos, compensaciones o satisfacción, que continúan en `CAP-SCOPE-010`;
- diseñar rutas y entrega logística completa, que continúa en `CAP-SCOPE-011`;
- definir contabilidad, tesorería e impuestos completos, que continúan en `CAP-SCOPE-012`;
- crear campañas y promociones completas, que continúan en `CAP-SCOPE-014`;
- crear migraciones, RPC, triggers, políticas RLS, jobs o funciones;
- habilitar salidas de inventario, acumulación de puntos o eventos económicos;
- importar historia Makos sin comprobar período, granularidad y calidad;
- declarar PULSO operativo como POS integral antes de E5 y de la certificación transversal.

---

#### 6. Principios canónicos

##### 6.1. PULSO será propietario de la operación comercial interna

PULSO administrará pedido, mesa, comanda, venta, cobro, caja y cierre. PASS no se convertirá en caja; NUMERA no se convertirá en POS; NEXO no administrará pedidos de cliente.

##### 6.2. PASS será un canal y experiencia del cliente

PASS podrá crear pedidos, iniciar checkout, mostrar estados y operar fidelización mediante contratos compartidos. No editará directamente estados operativos, caja, inventario o conciliación.

##### 6.3. El POS externo será fuente temporal, no arquitectura objetivo

Mientras Makos/POS externo siga vigente, sus ventas entrarán por adaptador, staging, mapeo e idempotencia. No escribirá directamente en NEXO, PASS o NUMERA.

##### 6.4. No habrá doble fuente activa para la misma venta

La transición exigirá corte por sede, terminal y fecha efectiva. Una venta solo podrá originarse en PULSO o en el POS externo, nunca en ambos.

##### 6.5. Cliente identificado será opcional cuando la operación lo permita

La venta a consumidor final no requerirá crear un cliente artificial. Cuando exista identificación, se conservarán consentimiento, documento aplicable y vínculo con PASS sin condicionar indebidamente el cobro.

##### 6.6. Los estados serán ortogonales

Pedido, preparación, cumplimiento, pago, fiscal, inventario, fidelización y hecho económico tendrán estados independientes y reglas de conciliación.

##### 6.7. Toda acción sensible será nombrada

Descuento, cambio de precio, anulación, devolución, reembolso, reapertura, corrección de pago y cierre usarán acciones de servidor con permiso, contexto, motivo y evidencia.

##### 6.8. Una venta confirmada emitirá efectos, no escrituras directas

PULSO o el adaptador emitirán un contrato canónico. NEXO, PASS y NUMERA aplicarán sus efectos exactamente una vez.

##### 6.9. El documento fiscal permanecerá en el proveedor autorizado

Vento OS conservará tipo, número, estado, proveedor, fecha, referencia, errores y vínculo con la venta. No simulará numeración ni cumplimiento fiscal.

##### 6.10. Las correcciones no borrarán historia

Toda corrección utilizará revisión, compensación, anulación o reversión vinculada al hecho original.

---

#### 7. Línea base verificable

##### 7.1. PULSO

La implementación actual contiene:

- autenticación y SSO con Vento Shell;
- módulo visual de salón;
- tablero de pedidos y componentes en tiempo real;
- escáner QR/cámara;
- identificación de cliente, acumulación y validación de redenciones;
- importación manual de Excel Makos, métricas, mapeo de ítems y lotes de importación;
- tipos y componentes separados para POS y salón.

Continúan pendientes el cierre formal de caja, pagos, sesiones POS, integración única con PASS, estados compartidos con preparación, integración con inventario y reporting operacional.

##### 7.2. PASS

PASS ya contiene flujo de catálogo, carrito, checkout, confirmación y consulta de pedidos. La experiencia del cliente no reemplaza la operación interna de PULSO.

##### 7.3. Makos/POS externo

La integración comprobada es manual mediante Excel. Se parsean productos, cantidades, subtotal, impuestos, descuentos y devoluciones, y se mapean ítems externos con catálogo interno. No existe conexión automática confirmada.

##### 7.4. Datos compartidos

Existen pedidos, pagos, esquema POS e importaciones externas, pero su existencia no demuestra propiedad funcional única, cierre de caja, integración exactamente una vez ni conciliación fiscal y financiera.

---

#### 8. Clasificación de cobertura

| Capacidad   | Nombre                                                     | Tratamiento          | Propietario objetivo                                                            | Decisión                                                                                                                                              |
| ----------- | ---------------------------------------------------------- | -------------------- | ------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------- |
| `CAP-09.01` | Definir oferta y precios de venta                          | `REUSE_OR_REFACTOR`  | PULSO como propietario operativo; catálogo y oferta desde contratos compartidos | Conservar catálogo, precios y disponibilidad existentes, separando precio base, precio publicado, promoción, descuento y snapshot aplicado.           |
| `CAP-09.02` | Recibir solicitudes y pedidos                              | `REUSE_OR_REFACTOR`  | PULSO + PASS + adaptadores de canal                                             | Normalizar solicitudes de salón, mostrador, recogida, domicilio, aplicaciones, mensajes y canales futuros sin doble digitación ni pedidos duplicados. |
| `CAP-09.03` | Confirmar disponibilidad y condiciones                     | `BUILD`              | PULSO coordinando NEXO, FOGO y reglas comerciales                               | Crear una decisión trazable de disponibilidad, tiempo, modalidad, sede, área productora, sustituciones y restricciones antes de confirmar.            |
| `CAP-09.04` | Registrar pedidos                                          | `REUSE_OR_REFACTOR`  | PULSO                                                                           | Conservar el agregado de pedido compartido, identidad estable, líneas, precios, impuestos, canal, modalidad, cliente opcional y revisiones.           |
| `CAP-09.05` | Modificar, sustituir o cancelar pedidos                    | `REUSE_OR_REFACTOR`  | PULSO                                                                           | Modelar revisiones, motivos, autorizaciones, diferencias económicas, notificaciones y compensaciones sin sobrescribir la solicitud original.          |
| `CAP-09.06` | Enviar pedidos a preparación                               | `BUILD`              | PULSO                                                                           | Crear comandas y enrutamiento por sede, área, estación, impresora o pantalla, con acuse, reintento, prioridad y contingencia.                         |
| `CAP-09.07` | Coordinar preparación y entrega                            | `REUSE_OR_REFACTOR`  | PULSO                                                                           | Conservar tablero operativo y estados en tiempo real, separando preparación, empaque, despacho, recogida y servicio en mesa.                          |
| `CAP-09.08` | Registrar ventas                                           | `REUSE_OR_REFACTOR`  | PULSO objetivo; POS externo temporal                                            | Emitir un contrato canónico de venta y línea, con convivencia controlada y corte explícito entre Makos/POS externo y PULSO.                           |
| `CAP-09.09` | Cobrar y confirmar pagos                                   | `REUSE_OR_REFACTOR`  | PULSO + proveedor de pagos                                                      | Completar intentos, autorizaciones, confirmaciones, pagos parciales, medios combinados, efectivo, referencias, reversión y conciliación.              |
| `CAP-09.10` | Emitir factura o soporte                                   | `INTEGRATE_EXTERNAL` | Proveedor fiscal/POS autorizado + Contabilidad                                  | Mantener la responsabilidad fiscal en el sistema o proveedor autorizado, conservando referencia y estado en Vento OS sin inventar facturación propia. |
| `CAP-09.11` | Gestionar mesas y servicio presencial                      | `REUSE_OR_REFACTOR`  | PULSO                                                                           | Conservar zonas, mesas, sesiones, mesero, comensales y llamados; completar apertura, traslado, unión, división, cuenta y liberación.                  |
| `CAP-09.12` | Gestionar pedidos para llevar                              | `REUSE_OR_REFACTOR`  | PULSO + PASS                                                                    | Formalizar recogida, promesa, identificación, empaque, espera, entrega y no recogido.                                                                 |
| `CAP-09.13` | Gestionar pedidos recibidos por aplicaciones o mensajes    | `REUSE_OR_REFACTOR`  | PULSO + adaptadores externos                                                    | Normalizar Rappi, WhatsApp, ManyChat, Shopify y otros canales con identidad externa, payload, mapeo, estados y conciliación.                          |
| `CAP-09.14` | Gestionar pedidos especiales, catering y ventas a empresas | `BUILD`              | PULSO / Comercial con aprobación de Gerencia                                    | Crear cotización, alcance, capacidad, aprobación, anticipo, condiciones, cambios, producción, entrega, facturación y cierre B2B.                      |
| `CAP-09.15` | Cerrar y revisar la jornada de venta                       | `BUILD`              | PULSO + NUMERA + responsable de sede                                            | Crear apertura y cierre de caja, fondos, movimientos, arqueo, diferencias, ventas, pagos, propinas, documentos, pendientes y aprobación.              |

---

#### 9. Resumen de tratamientos

| Tratamiento          | Cantidad |
| -------------------- | -------: |
| `REUSE_OR_REFACTOR`  |       10 |
| `BUILD`              |        4 |
| `INTEGRATE_EXTERNAL` |        1 |
| **Total**            |   **15** |

La clasificación no declara completadas las capacidades existentes. `REUSE_OR_REFACTOR` significa que existe infraestructura aprovechable, pero debe someterse a los contratos, estados, permisos, integración y pruebas definidos aquí.

---

#### 10. Propiedad funcional

| Sistema o dominio               | Propiedad                                                                                                                                                      |
| ------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| PULSO                           | operación comercial interna: pedido, mesa, comanda, venta, cobro, caja, reversión operativa y cierre                                                           |
| PASS                            | experiencia del cliente, carrito, checkout, consulta de pedidos, identidad y fidelización; no administra caja ni comanda                                       |
| POS externo / Makos             | fuente temporal del hecho de venta y documento fiscal durante la transición; no es propietario de inventario, recetas, costos, lealtad ni autorización laboral |
| NEXO                            | disponibilidad e impacto físico de inventario exactamente una vez                                                                                              |
| FOGO                            | producción por lotes y capacidades productivas; no sustituye comandas de preparación al momento                                                                |
| NUMERA                          | hecho económico, conciliación y resultados financieros; no cambia pedidos, pagos ni caja operativa                                                             |
| Proveedor de pagos              | autorización, captura, reversión y liquidación externa según contrato; secretos fuera del cliente                                                              |
| Proveedor fiscal / Contabilidad | factura o soporte fiscal, numeración, impuestos y obligaciones externas                                                                                        |
| SHELL / Supabase                | contratos compartidos, integridad, autorización, eventos, colas, auditoría y migraciones                                                                       |

---

#### 11. Fuentes de verdad objetivo

| Objeto o hecho                  | Fuente objetivo                                                              | Regla                                                                |
| ------------------------------- | ---------------------------------------------------------------------------- | -------------------------------------------------------------------- |
| Oferta y catálogo               | contrato compartido de catálogo/oferta aprobado en `CAP-SCOPE-004`           | PULSO consume y publica por sede/canal; no crea un catálogo paralelo |
| Pedido                          | agregado canónico compartido con propietario funcional PULSO                 | PASS y canales crean o consultan mediante contratos autorizados      |
| Venta interna futura            | PULSO                                                                        | solo después del corte aprobado por sede, terminal y fecha           |
| Venta actual durante transición | POS externo/Makos mediante adaptador                                         | staging, payload, mapeo, idempotencia y conciliación                 |
| Pago                            | ledger y transacción de pagos compartidos + proveedor externo cuando aplique | PULSO registra la relación operativa; no guarda secretos en cliente  |
| Caja                            | PULSO                                                                        | sesión por sede, terminal, turno y actor                             |
| Documento fiscal                | proveedor fiscal o POS autorizado                                            | Vento OS conserva referencia, estado y vínculo                       |
| Inventario                      | NEXO                                                                         | PULSO emite evento; NEXO aplica movimiento exactamente una vez       |
| Fidelización                    | PASS                                                                         | PULSO solicita acumulación o redención mediante contrato idempotente |
| Hecho económico                 | NUMERA                                                                       | consume evento canónico; no reinterpreta la venta                    |

---

#### 12. Ejes de estado independientes

| Eje                    | Estados ilustrativos                                                                  | Qué representa                                      |
| ---------------------- | ------------------------------------------------------------------------------------- | --------------------------------------------------- |
| Estado del pedido      | `draft`, `submitted`, `confirmed`, `cancelled`, `completed` o contrato equivalente    | existencia y compromiso comercial                   |
| Estado de preparación  | `not_sent`, `queued`, `accepted`, `preparing`, `ready`, `failed`                      | trabajo de cocina, barra, mostrador u otra estación |
| Estado de cumplimiento | `dine_in`, `pickup`, `delivery`, `external`; pendiente, entregado o no entregado      | modalidad y entrega                                 |
| Estado de pago         | `unpaid`, `pending`, `authorized`, `paid`, `partially_refunded`, `refunded`, `failed` | cobro y reversión                                   |
| Estado fiscal          | `not_required`, `pending`, `issued`, `failed`, `cancelled`                            | factura o soporte                                   |
| Estado de inventario   | `pending`, `applied`, `compensated`, `failed`                                         | efecto físico en NEXO                               |
| Estado de fidelización | `not_applicable`, `pending`, `applied`, `reversed`, `failed`                          | efecto en PASS                                      |
| Estado económico       | `pending`, `posted`, `reversed`, `failed`                                             | efecto en NUMERA                                    |

Los nombres finales se aprobarán en E2. La obligación vigente es conservar la separación semántica y prohibir transiciones implícitas entre ejes.

---

#### 13. Oferta, precios, promociones y descuentos

La oferta deberá distinguir:

```text
PRODUCTO / ÍTEM DE MENÚ
→ OFERTA POR SEDE Y CANAL
→ PRECIO BASE
→ PRECIO PUBLICADO
→ PROMOCIÓN O CONVENIO
→ DESCUENTO AUTORIZADO
→ SNAPSHOT APLICADO A LA LÍNEA
```

Reglas:

1. cambiar el precio vigente no modificará pedidos históricos;
2. impuestos, servicio, propina, recargo y descuento serán conceptos separados;
3. el precio manual requerirá permiso y motivo;
4. promociones y beneficios no podrán duplicarse por reintento;
5. una oferta inactiva o no disponible no podrá añadirse mediante URL o payload manipulado;
6. PASS y canales externos consumirán la oferta publicada, no una copia editable;
7. el pedido conservará la versión o snapshot necesario para reconstruir el total.

---

#### 14. Recepción de solicitudes y pedidos

Cada entrada conservará:

- sistema y canal de origen;
- identificador externo cuando exista;
- sede y modalidad solicitadas;
- fecha y hora de creación y recepción;
- cliente identificado o venta a consumidor final;
- líneas, cantidades, observaciones y modificadores;
- dirección o punto de entrega cuando aplique;
- promesa solicitada;
- estado de pago inicial;
- payload o evidencia de origen;
- clave de idempotencia.

Un mensaje, conversación, carrito o intento de checkout no será automáticamente un pedido confirmado.

---

#### 15. Disponibilidad y condiciones

La confirmación comercial deberá evaluar:

- oferta publicada por sede y canal;
- disponibilidad física o capacidad de preparación;
- horario y ventana operativa;
- modalidad permitida;
- tiempo estimado;
- área o estación responsable;
- restricciones y modificadores;
- dirección y cobertura logística cuando aplique;
- precio, impuestos, cargos y forma de pago;
- sustituciones permitidas;
- condición bajo pedido.

El stock mayor que cero no garantiza disponibilidad, y el stock cero no bloquea automáticamente productos preparados al momento o bajo pedido.

---

#### 16. Identidad y revisiones del pedido

El pedido tendrá identificador estable. Cada revisión conservará:

- versión;
- actor;
- motivo;
- fecha;
- líneas añadidas, retiradas o sustituidas;
- diferencias de precio, impuesto, descuento y pago;
- impacto sobre comandas y preparación;
- notificación al cliente;
- aprobación cuando corresponda.

No se sobrescribirá una línea ya enviada a preparación sin crear la acción correctiva aplicable.

---

#### 17. Modificación, sustitución y cancelación

Quedan separados:

```text
EDITAR BORRADOR
≠ MODIFICAR PEDIDO CONFIRMADO
≠ SUSTITUIR LÍNEA
≠ CANCELAR LÍNEA
≠ CANCELAR PEDIDO
≠ ANULAR VENTA
≠ DEVOLVER PRODUCTO
≠ REEMBOLSAR PAGO
```

La autorización dependerá del estado y de los efectos ya producidos. Una cancelación posterior a preparación, pago o documento fiscal exigirá compensaciones coordinadas.

---

#### 18. Comandas y enrutamiento a preparación

Una comanda será una instrucción operativa derivada de líneas confirmadas. Deberá conservar:

- pedido y revisión de origen;
- líneas y modificadores;
- sede, área y estación destino;
- prioridad y tiempo esperado;
- actor emisor;
- impresora, pantalla o dispositivo;
- estado de encolado, entrega, aceptación y resolución;
- reintentos y contingencia;
- cancelación o corrección posterior.

FOGO no será propietario de la comanda de un pedido preparado al momento. FOGO seguirá siendo propietario de producción planificada por lotes.

---

#### 19. Preparación, empaque y entrega operativa

PULSO coordinará estados de preparación y cumplimiento sin modificar directamente inventario. Cada transición deberá identificar actor, estación, tiempo, motivo y evidencia mínima.

La preparación parcial, faltante, sustitución, rechazo, reimpresión y entrega parcial deberán quedar visibles. Marcar `ready` no equivaldrá a entregar, cobrar o cerrar.

---

#### 20. Mesas y servicio presencial

Se distinguirán:

```text
ZONA
≠ MESA
≠ SESIÓN DE MESA
≠ PEDIDO
≠ CUENTA
≠ PAGO
```

La sesión podrá registrar mesero, comensales, hora, pedidos vinculados y llamados. Traslado, unión, división, cambio de responsable y liberación requerirán reglas explícitas.

Una mesa no quedará libre mientras existan pedidos, cuentas, pagos o llamados bloqueantes según la política aprobada.

---

#### 21. Pedidos para llevar

El flujo deberá conservar:

- modalidad `pickup` o equivalente;
- sede de recogida;
- promesa y hora real;
- identificación o código de entrega;
- estado de empaque;
- aviso al cliente;
- actor que entrega;
- tratamiento de espera, cancelación y no recogido.

---

#### 22. Aplicaciones y mensajes externos

Cada adaptador deberá normalizar identidad, líneas, importes, estados y timestamps. Los pedidos externos no se copiarán manualmente a otra fuente sin relación ni control de duplicado.

Una línea sin mapeo quedará en cuarentena y no generará automáticamente inventario, puntos ni resultado financiero.

---

#### 23. Catering, pedidos especiales y ventas B2B

La capacidad deberá incluir:

- solicitud y oportunidad;
- alcance, cantidades, fechas y sedes;
- cotización y revisiones;
- capacidad y disponibilidad;
- aprobación comercial;
- anticipo y condiciones de pago;
- contrato o aceptación;
- producción y logística vinculadas;
- cambios, cancelación y penalidades;
- factura, entrega, aceptación y cierre.

`COM-04` y `COM-05` deberán resolverse antes del diseño final. La existencia de catering como línea comercial no autoriza comprometer capacidad sin aprobación.

---

#### 24. Venta, pago, caja y documento fiscal

##### 24.1. Venta

La venta será el hecho comercial confirmado con líneas, totales, impuestos, descuentos, sede, terminal, actor, canal y referencias. No dependerá de que el cliente esté identificado cuando la normativa y el proceso permitan consumidor final.

##### 24.2. Pago

Se distinguirán:

```text
INTENTO DE PAGO
≠ AUTORIZACIÓN
≠ CAPTURA O CONFIRMACIÓN
≠ MEDIO DE PAGO REGISTRADO
≠ LIQUIDACIÓN DEL PROVEEDOR
≠ MOVIMIENTO DE CAJA
```

El total pagado podrá componerse de varios medios. Cada parte conservará monto, moneda, proveedor, referencia, estado, actor y momento.

##### 24.3. Caja

La sesión de caja conservará:

- sede y terminal;
- actor que abre;
- turno o contexto;
- fondo inicial;
- ingresos, retiros, gastos y movimientos no venta;
- ventas y pagos asociados;
- efectivo esperado y contado;
- diferencia y explicación;
- actor que cierra y quien aprueba;
- reapertura o corrección posterior.

##### 24.4. Documento fiscal

El proveedor autorizado conservará la emisión. PULSO vinculará tipo, número, fecha, estado, total, impuestos, tercero o consumidor final, proveedor y errores.

---

#### 25. Propinas, servicio y cargos

Propina voluntaria, servicio sugerido, recargo, domicilio, empaque, descuento y compensación serán conceptos distintos.

La propina deberá conservar monto, forma de recaudo, relación con venta/pago, reversión y destino posterior. El reparto laboral pertenece a `CAP-SCOPE-002` y el tratamiento económico a `CAP-SCOPE-012`.

---

#### 26. Anulación, devolución, reembolso y compensación

```text
CANCELACIÓN DE PEDIDO
→ evita o detiene compromiso futuro

ANULACIÓN DE VENTA
→ revierte el hecho comercial según estado y autorización

DEVOLUCIÓN
→ registra retorno o no aceptación de producto/servicio

REEMBOLSO
→ devuelve dinero mediante el medio aplicable

COMPENSACIÓN
→ beneficio o reparación comercial bajo política de cliente
```

Cada acción conservará motivo, actor, aprobación, líneas, importes, documento fiscal, inventario, puntos, pago y hecho económico afectados.

La política de reclamos y compensaciones se aprobará en `CAP-SCOPE-010`; PULSO ejecutará el efecto transaccional autorizado.

---

#### 27. Cierre y revisión de jornada

El cierre deberá conciliar como mínimo:

- sesiones de caja y terminal;
- ventas por estado y canal;
- líneas, impuestos, descuentos y cargos;
- pagos por medio y proveedor;
- efectivo esperado y contado;
- propinas y servicio;
- documentos fiscales emitidos o fallidos;
- anulaciones, devoluciones y reembolsos;
- pedidos abiertos y comandas pendientes;
- efectos pendientes en NEXO, PASS y NUMERA;
- importaciones externas pendientes o en cuarentena;
- diferencias y responsable de resolución.

Cerrar la caja no borrará pendientes ni forzará conciliación artificial.

---

#### 28. Inventario, fidelización y hecho económico

##### 28.1. NEXO

Una venta validada emitirá líneas normalizadas. NEXO decidirá el movimiento según producto, receta, presentación, sede y política. La anulación o devolución emitirá compensación, no borrado.

##### 28.2. PASS

Acumulación y redención utilizarán contratos autorizados, atómicos e idempotentes. Un reintento de venta o escaneo no podrá duplicar puntos.

##### 28.3. NUMERA

NUMERA consumirá venta, pago, devolución, comisiones y cierre. No recalculará ni modificará el hecho operativo original.

---

#### 29. Impresión y dispositivos

Ticket, factura, comanda, cuenta, recibo y etiqueta son documentos distintos. La impresión se activará desde eventos y plantillas versionadas.

Una respuesta perdida de impresora no autorizará recrear pedido, venta o pago. La reimpresión conservará documento original, motivo, actor y número de copia.

Terminales compartidas exigirán actor real para acciones sensibles y deberán cerrar o cambiar actor sin mantener autoridad residual.

---

#### 30. Operación offline, reintentos y concurrencia

- crear pedido, enviar comanda, cobrar, cerrar o aplicar efectos utilizará claves de idempotencia;
- un pago pendiente no se asumirá fallido por timeout;
- una reconexión no duplicará líneas, pagos o impresiones;
- conflictos de revisión se detectarán antes de sobrescribir;
- eventos fuera de orden quedarán pendientes de conciliación;
- la autorización se reevaluará al sincronizar;
- ninguna cola offline podrá conservar secretos de pago innecesarios.

---

#### 31. Privacidad y evidencia

Solo se capturarán datos del cliente necesarios para el canal y la modalidad. Dirección, teléfono, documento y referencias de pago tendrán acceso limitado y retención aprobada.

Las capturas, payloads y exportaciones para auditoría deberán anonimizar o restringir datos personales cuando no sean necesarios.

---

#### 32. Transición Makos/POS externo → PULSO

La transición seguirá:

```text
POS EXTERNO
→ ADAPTADOR
→ STAGING Y PAYLOAD ORIGINAL
→ VALIDACIÓN Y MAPEO
→ CONTRATO CANÓNICO DE VENTA
→ NEXO / NUMERA / PASS
```

Posteriormente:

```text
PULSO
→ MISMO CONTRATO CANÓNICO DE VENTA
→ NEXO / NUMERA / PASS
```

Puertas obligatorias:

1. confirmar datos y límites del POS;
2. importar en modo observación;
3. conciliar sin efectos;
4. ejecutar piloto controlado;
5. definir corte por sede y terminal;
6. impedir doble emisión;
7. retirar adaptador sin cambiar consumidores;
8. revocar o reducir credenciales externas.

---

#### 33. Preguntas pendientes reutilizadas

| ID       | Uso en esta tarea                                                  | Puerta                                                                                     |
| -------- | ------------------------------------------------------------------ | ------------------------------------------------------------------------------------------ |
| `DAT-01` | Confirmar si Makos permite exportar ventas.                        | Bloquea diseño definitivo del adaptador y recuperación histórica; no bloquea la cobertura. |
| `DAT-02` | Confirmar fecha más antigua disponible en Makos.                   | Bloquea alcance del backfill y comparación histórica.                                      |
| `DAT-03` | Confirmar si la exportación de Makos contiene líneas por producto. | Bloquea efectos detallados de inventario y costeo histórico.                               |
| `DAT-22` | Confirmar dónde se registra el reparto de propinas.                | Bloquea migración y conciliación histórica de propinas.                                    |
| `DAT-23` | Confirmar dónde se registran ventas anuladas.                      | Bloquea backfill y prueba de reversión histórica.                                          |
| `DAT-24` | Confirmar dónde se registran devoluciones de cliente.              | Bloquea backfill y conciliación histórica de devolución/reembolso.                         |
| `DAT-25` | Confirmar dónde se registran compensaciones entregadas a clientes. | Alimenta `CAP-SCOPE-010`; no autoriza política de compensaciones.                          |
| `OPE-07` | Identificar quién aprueba corregir un medio de pago.               | Bloquea matriz definitiva de autorización de correcciones.                                 |
| `OPE-10` | Identificar quién decide aceptar o negar una devolución.           | Alimenta frontera PULSO/CAP-10 y segregación de funciones.                                 |
| `OPE-11` | Identificar quién aprueba una compensación.                        | Alimenta `CAP-SCOPE-010`; no bloquea el modelo transaccional.                              |
| `COM-04` | Identificar quién aprueba una venta de catering.                   | Bloquea aprobación final de ventas especiales/B2B.                                         |
| `COM-05` | Confirmar si existe contrato o cotización estándar de catering.    | Bloquea plantillas y migración documental B2B.                                             |

No se crean preguntas nuevas. Las preguntas pendientes no bloquean la aprobación de cobertura, pero sí las migraciones, el backfill, la matriz final de aprobaciones y la automatización de cierres o ventas B2B.

---

#### 34. Hallazgos y destinos

| Hallazgo            | Brecha                                                                                                                      | Prioridad | Destino obligatorio                                                                    | Momento  |
| ------------------- | --------------------------------------------------------------------------------------------------------------------------- | --------- | -------------------------------------------------------------------------------------- | -------- |
| H-CAP-SCOPE-009-001 | PULSO implementa salón, pedidos, escáner y loyalty, pero no demuestra un POS integral cerrado con caja, pagos y cierre.     | crítica   | `PULSO-UX-001` a `PULSO-UX-021`; `PULSO-AUTH-001` a `PULSO-AUTH-016`                   | E2/E5    |
| H-CAP-SCOPE-009-002 | Makos/POS externo continúa siendo fuente temporal del hecho de venta y la transición todavía depende de importación manual. | crítica   | `INT-POS-001` a `INT-POS-024`; `INT-SALES-008` a `INT-SALES-011`                       | E2/E3/E5 |
| H-CAP-SCOPE-009-003 | PULSO y PASS comparten estructuras de pedido, pero la propiedad y el contrato único deben congelarse.                       | crítica   | `PULSO-UX-018`; `PASS-INT-001`; `PASS-INT-002`; `INT-SALES-001` a `INT-SALES-011`      | E2/E3    |
| H-CAP-SCOPE-009-004 | pedido, preparación, cumplimiento, pago, estado fiscal, inventario y fidelización pueden confundirse en un único status.    | crítica   | `PROC-CAT-009` a `PROC-CAT-018`; `PULSO-UX-007` a `PULSO-UX-010`                       | E2       |
| H-CAP-SCOPE-009-005 | oferta, precio, promoción, descuento y precio aplicado no tienen todavía un gobierno comercial integral comprobado.         | alta      | `CAP-SCOPE-004`; `PULSO-UX-007`; `PULSO-AUTH-006` a `PULSO-AUTH-008`                   | E2/E3    |
| H-CAP-SCOPE-009-006 | la disponibilidad comercial no está cerrada contra NEXO, FOGO, horario, canal y modalidad.                                  | crítica   | `CAP-SCOPE-004`; `CAP-SCOPE-006`; `CAP-SCOPE-008`; `PULSO-UX-016`                      | E2/E3    |
| H-CAP-SCOPE-009-007 | no está formalizado el instante en que una solicitud se vuelve pedido confirmado y compromiso de preparación.               | alta      | `PULSO-UX-001`; `PROC-CAT-009` a `PROC-CAT-012`                                        | E2       |
| H-CAP-SCOPE-009-008 | modificaciones, sustituciones y cancelaciones requieren revisiones inmutables y diferencias económicas.                     | crítica   | `PULSO-UX-009`; `PULSO-UX-013`; `PROC-CAT-013`; `PROC-CAT-014`                         | E2/E3    |
| H-CAP-SCOPE-009-009 | no existe evidencia de un enrutamiento canónico de comandas por producto, área, estación y dispositivo.                     | crítica   | `PULSO-UX-001`; `UX-STATION-001` a `UX-STATION-012`; `PRINT-ARC-001` a `PRINT-ARC-020` | E2/E4    |
| H-CAP-SCOPE-009-010 | la entrega de una comanda no demuestra aceptación ni ejecución por la estación destinataria.                                | crítica   | `PULSO-UX-019`; `QUEUE-ARC-001` a `QUEUE-ARC-010`; `PROC-CAT-017`; `PROC-CAT-018`      | E2/E4    |
| H-CAP-SCOPE-009-011 | zonas, mesas, sesiones, llamados y órdenes tienen infraestructura parcial pero no un ciclo integral de servicio.            | alta      | `PULSO-UX-003`; `PULSO-UX-019`; `PULSO-AUTH-003`; `PULSO-AUTH-016`                     | E2/E5    |
| H-CAP-SCOPE-009-012 | unir, trasladar, dividir cuenta, dividir pago y liberar mesa no están demostrados de extremo a extremo.                     | alta      | `PULSO-UX-003`; `PULSO-UX-007`; `PULSO-UX-008`; `PULSO-UX-010`                         | E2/E5    |
| H-CAP-SCOPE-009-013 | los pedidos para llevar requieren promesa, identificación, entrega y tratamiento de no recogido.                            | alta      | `PULSO-UX-004`; `PULSO-UX-007`; `PULSO-UX-019`                                         | E2       |
| H-CAP-SCOPE-009-014 | aplicaciones y mensajes externos pueden producir doble digitación, duplicados y estados divergentes.                        | crítica   | `INT-POS-001` a `INT-POS-020`; `OPS-CAN-001`; `PULSO-UX-001`                           | E2/E3    |
| H-CAP-SCOPE-009-015 | catering y ventas B2B no tienen proceso objetivo, aprobación, cotización y condiciones completas.                           | alta      | `COM-04`; `COM-05`; `OPS-CAN-001`; `OPS-B2B-001`                                       | E1/E2    |
| H-CAP-SCOPE-009-016 | el documento fiscal sigue siendo responsabilidad externa, pero falta congelar referencia, estado y conciliación.            | crítica   | `INT-POS-005` a `INT-POS-010`; `CAP-SCOPE-012`; `CAP-SCOPE-016`                        | E2/E3    |
| H-CAP-SCOPE-009-017 | pagos y secretos deben permanecer en servidor/proveedor; la frontera de responsabilidades todavía debe cerrarse.            | crítica   | `PULSO-UX-008`; `PULSO-AUTH-006` a `PULSO-AUTH-008`; `AUTH-SRV-004` a `AUTH-SRV-018`   | E2/E3    |
| H-CAP-SCOPE-009-018 | no existe ciclo integral comprobado de apertura, fondo, ingresos, retiros, gastos, arqueo y cierre de caja.                 | crítica   | `PULSO-UX-010`; `PULSO-AUTH-008`; `PULSO-AUTH-013`; `UX-QA-027`                        | E2/E5    |
| H-CAP-SCOPE-009-019 | pagos parciales, medios combinados, cambio, referencias y diferencias requieren contrato canónico.                          | crítica   | `PULSO-UX-008`; `PULSO-UX-013`; `INT-POS-007`                                          | E2/E3    |
| H-CAP-SCOPE-009-020 | propinas, servicio y reparto no tienen fuente histórica confirmada.                                                         | alta      | `DAT-22`; `PULSO-UX-008`; `CAP-SCOPE-002`; `CAP-SCOPE-012`                             | E1/E2    |
| H-CAP-SCOPE-009-021 | la corrección de medio de pago no tiene flujo manual auditable comprobado.                                                  | crítica   | `OPE-07`; `PULSO-UX-009`; `PULSO-AUTH-008`; `AUTH-QA-021`                              | E1/E2    |
| H-CAP-SCOPE-009-022 | anulación, cancelación, devolución, reembolso y compensación siguen requiriendo semánticas y permisos independientes.       | crítica   | `DAT-23` a `DAT-25`; `OPE-10`; `OPE-11`; `PULSO-UX-009`; `CAP-SCOPE-010`               | E1/E2    |
| H-CAP-SCOPE-009-023 | no existe cierre diario reconciliado entre ventas, pagos, caja, propinas, documentos y pendientes.                          | crítica   | `PULSO-UX-010`; `PULSO-UX-017`; `INT-POS-020`; `CAP-SCOPE-012`                         | E2/E5    |
| H-CAP-SCOPE-009-024 | la salida o compensación de inventario por venta no está habilitada de extremo a extremo exactamente una vez.               | crítica   | `PULSO-UX-016`; `INT-POS-016`; `INT-SALES-003`; `TREQ-INTEGRATION-011`                 | E3/E5    |
| H-CAP-SCOPE-009-025 | acumulación y redención de fidelización deben evitar duplicación entre PASS, PULSO y POS externo.                           | crítica   | `PULSO-UX-011`; `PULSO-UX-012`; `PULSO-UX-018`; `PASS-INT-001`; `PASS-INT-002`         | E2/E5    |
| H-CAP-SCOPE-009-026 | el evento económico de venta, pago, devolución y cierre todavía no está conciliado integralmente con NUMERA.                | crítica   | `PULSO-UX-017`; `INT-POS-017`; `INT-SALES-004`; `CAP-SCOPE-012`                        | E3/E5    |
| H-CAP-SCOPE-009-027 | la importación Makos necesita mapeo, cuarentena, payload original, hash e idempotencia antes de producir efectos.           | crítica   | `INT-POS-006` a `INT-POS-014`; `PULSO-AUTH-005`; `CODE-AUD-018`                        | E3/E5    |
| H-CAP-SCOPE-009-028 | operación offline, reintentos, concurrencia y eventos fuera de orden pueden duplicar pedidos, pagos o comandas.             | crítica   | `CODE-AUD-018`; `QUEUE-ARC-001` a `QUEUE-ARC-010`; `INT-SALES-007`                     | E3/E5    |
| H-CAP-SCOPE-009-029 | terminales compartidas requieren actor real, sesión operativa, cierre y firma de acciones sensibles.                        | crítica   | `PULSO-AUTH-011` a `PULSO-AUTH-014`; `PULSO-UX-014`; `AUTH-DEV-001` a `AUTH-DEV-013`   | E2/E5    |
| H-CAP-SCOPE-009-030 | PULSO importa Excel pero no demuestra exportación, reporte y evidencia suficiente para auditoría de jornada.                | alta      | `PULSO-UX-006`; `PULSO-UX-010`; `CAP-SCOPE-017`; `UX-QA-027`                           | E2/E5    |

---

#### 35. Riesgos y controles mínimos

| Riesgo                                 | Prioridad | Control mínimo                                          |
| -------------------------------------- | --------- | ------------------------------------------------------- |
| pedido duplicado                       | crítica   | identidad de canal, idempotencia y deduplicación        |
| precio incorrecto                      | crítica   | snapshot de precio, impuestos, descuento y autorización |
| producto confirmado sin disponibilidad | crítica   | decisión trazable contra NEXO/FOGO                      |
| comanda perdida o repetida             | crítica   | cola, acuse, reintento e identidad estable              |
| mesa liberada con cuenta abierta       | crítica   | estado derivado y validación de pendientes              |
| pago duplicado                         | crítica   | idempotencia de intento, confirmación y referencia      |
| efectivo no conciliado                 | crítica   | sesión de caja y arqueo                                 |
| corrección destructiva                 | crítica   | evento compensatorio y aprobación                       |
| venta sin documento fiscal             | crítica   | integración, estado y contingencia                      |
| inventario duplicado o ausente         | crítica   | evento canónico exactamente una vez                     |
| puntos duplicados                      | crítica   | contrato PASS idempotente                               |
| doble fuente durante transición        | crítica   | corte por sede, terminal y fecha efectiva               |
| pedido externo sin trazabilidad        | alta      | payload, mapeo y estados normalizados                   |
| cierre incompleto                      | crítica   | conciliación diaria y pendientes visibles               |
| actor desconocido                      | crítica   | firma de terminal compartida y turno                    |

---

#### 36. Decisiones aprobables

1. PULSO será propietario de la operación comercial interna objetivo.
2. PASS será canal del cliente y propietario de fidelización, no caja ni inventario.
3. Makos/POS externo será fuente temporal durante una transición controlada.
4. El mismo contrato canónico de venta será emitido por el adaptador temporal y posteriormente por PULSO.
5. No habrá doble fuente activa para una misma venta.
6. La venta a consumidor final podrá ejecutarse sin crear cliente artificial, conservando soporte fiscal e impuestos aplicables.
7. Pedido, preparación, cumplimiento, pago, fiscal, inventario, fidelización y economía tendrán estados separados.
8. PULSO construirá disponibilidad comercial antes de confirmar el pedido.
9. Comandas serán instrucciones versionadas y encoladas por estación.
10. FOGO no administrará comandas de preparación al momento.
11. Venta, pago, caja y documento fiscal serán hechos distintos.
12. Pagos parciales y medios combinados serán soportados por contrato.
13. Anulación, devolución, reembolso y compensación no serán sinónimos.
14. El documento fiscal permanecerá con el proveedor autorizado.
15. Cerrar caja exigirá conciliación y no ocultará pendientes.
16. NEXO, PASS y NUMERA recibirán efectos exactamente una vez.
17. Catering/B2B se construirá con aprobación, cotización y capacidad verificadas.
18. Toda corrección conservará historia y actor.
19. Terminales compartidas identificarán al actor real.
20. No se autoriza implementación, migración ni operación real desde esta tarea.

---

#### 37. Decisiones diferidas con dueño

| Decisión                                  | Tratamiento provisional                             | Tarea o responsable                                | Puerta máxima                     |
| ----------------------------------------- | --------------------------------------------------- | -------------------------------------------------- | --------------------------------- |
| proveedor fiscal y alcance por sede       | conservar proveedor vigente                         | Contabilidad + `CAP-SCOPE-012`                     | antes del diseño de emisión       |
| datos y período recuperables de Makos     | no asumir cobertura histórica                       | `DAT-01` a `DAT-03`; `INT-POS-001` a `INT-POS-009` | antes del backfill                |
| aprobación de corrección de pago          | solo supervisor autorizado provisional              | `OPE-07`; `PULSO-AUTH-008`                         | antes del prototipo E2            |
| fuente y reparto de propinas              | registrar recaudación sin inventar reparto          | `DAT-22`; `CAP-SCOPE-002`; `CAP-SCOPE-012`         | antes de migración/automatización |
| política de devoluciones y compensaciones | registrar solicitud y bloquear efecto no autorizado | `CAP-SCOPE-010`; `OPE-10`; `OPE-11`                | antes del piloto                  |
| modelo catering/B2B                       | `BUILD`, no habilitado                              | `COM-04`; `COM-05`; `OPS-B2B-001`                  | antes del diseño E2               |
| corte POS externo → PULSO                 | convivencia conciliada sin doble emisión            | `INT-SALES-008` a `INT-SALES-011`                  | antes del piloto con efectos      |

---

#### 38. Requisitos de prueba generados

```text
TREQ-PULSO-005
TREQ-PULSO-006
TREQ-INTEGRATION-014
```

##### 38.1. `TREQ-PULSO-005`

Protege el ciclo solicitud → pedido → revisión → comanda → preparación → cumplimiento, incluyendo disponibilidad, precios, mesas, estaciones y estados independientes.

##### 38.2. `TREQ-PULSO-006`

Protege venta, pagos, caja, documento fiscal, propinas, descuentos, anulaciones, devoluciones, reembolsos y cierre diario.

##### 38.3. `TREQ-INTEGRATION-014`

Protege la convivencia y transición entre PASS, PULSO y POS externo, y los efectos exactamente una vez hacia NEXO, NUMERA, PASS y servicios de impresión.

Los detalles viven exclusivamente en el `04A` completo regenerado.

---

#### 39. Puertas de implementación

##### Puerta 1 — Contratos E2

- estados y transiciones aprobados;
- pedido, comanda, venta, pago, caja y documento fiscal separados;
- actores y permisos definidos;
- preguntas críticas con tratamiento provisional.

##### Puerta 2 — Arquitectura E3/E4

- contrato canónico de pedido y venta;
- integración POS externo;
- colas, printing, idempotencia y conciliación;
- modelo de caja, pagos y reversión;
- seguridad y privacidad.

##### Puerta 3 — Implementación E5

- PULSO, PASS, NEXO y NUMERA implementados contra los contratos;
- POS externo en piloto sin efectos y luego con efectos controlados;
- pruebas automatizadas y evidencia operativa.

##### Puerta 4 — Corte

- conciliación aprobada;
- corte por sede y terminal;
- doble emisión bloqueada;
- contingencia y rollback;
- credenciales externas reducidas o revocadas.

---

#### 40. Criterios de aceptación

`CAP-SCOPE-009` podrá aprobarse cuando:

- las 15 subcapacidades tengan tratamiento explícito;
- PULSO, PASS, POS externo, NEXO, NUMERA y proveedores tengan fronteras claras;
- se distingan pedido, comanda, venta, pago, caja y documento fiscal;
- se definan los ejes de estado independientes;
- oferta, disponibilidad, revisiones y comandas tengan reglas mínimas;
- mesas, recogida, aplicaciones y B2B tengan tratamiento;
- pagos, propinas, reversión y cierre tengan semántica auditable;
- la transición Makos/POS externo → PULSO tenga puertas y prohibición de doble emisión;
- las preguntas existentes tengan uso y puerta;
- los 30 hallazgos tengan propietario y momento;
- los tres requisitos nuevos estén incorporados en un `04A` completo válido;
- no se haya autorizado implementación ni operación real.

---

#### 41. Resultado y continuidad

Al aprobarse esta tarea quedará definida la cobertura objetivo de ventas, pedidos, caja y pagos, sin ejecutar todavía el diseño detallado ni la implementación.

La continuidad será exclusivamente:

```text
CAP-SCOPE-010
— Evaluar clientes, fidelización, reclamos y servicio
```

`CAP-SCOPE-010` consumirá las fronteras de cliente, devolución y compensación aquí aprobadas, pero no reabrirá la propiedad transaccional de PULSO ni el contrato canónico de venta.


### ✅ CAP-SCOPE-010 — Evaluar clientes, fidelización, reclamos y servicio

**Estado:** APROBADA 
**Bloque:** E1 — Descubrimiento integral de operación, capacidades y cobertura de implementación  
**Dependencia cumplida:** `CAP-SCOPE-009` aprobada  
**Tarea anterior:** `CAP-SCOPE-009`  
**Siguiente tarea reservada:** `CAP-SCOPE-011`  
**Familia evaluada:** `CAP-10 — Atender clientes y fortalecer relaciones`  
**Naturaleza:** decisión de cobertura empresarial y definición conceptual objetivo  
**Implementación técnica:** no autorizada  
**Migraciones o cambios en Supabase:** no autorizados  
**Contactos, campañas, compensaciones, puntos, reservas, mensajes o cambios reales sobre clientes:** no autorizados  
**Requisitos de prueba generados:** `TREQ-AUTH-018`, `TREQ-PASS-010`, `TREQ-PASS-011`, `TREQ-INTEGRATION-015`  
**Actualización del registro de pruebas:** se entrega el archivo `04A` completo regenerado; quedan prohibidas las filas sueltas

---

#### 1. Propósito

Definir el tratamiento objetivo de las capacidades mediante las cuales Vento Group deberá:

- reconocer a una persona cliente sin exigir siempre una cuenta digital;
- distinguir persona, cuenta, perfil, contacto, relación comercial, consentimiento y preferencia;
- mantener una identidad estable sin fusionar automáticamente registros por nombre, teléfono o correo;
- permitir atención a clientes ocasionales, identificados y autenticados;
- registrar preguntas, solicitudes, reclamos, felicitaciones y novedades por cualquier canal;
- investigar y resolver reclamos mediante expedientes trazables;
- vincular devoluciones, reembolsos, compensaciones y cortesías con la transacción y decisión correspondientes;
- medir satisfacción sin convertir toda respuesta negativa en reclamo ni incentivar respuestas sesgadas;
- administrar puntos, beneficios, recompensas, redenciones y ajustes mediante reglas versionadas;
- gestionar reservas y eventos con capacidad, condiciones, depósito, cambios, cancelación y no-show;
- comunicar cambios operativos y comerciales por canales autorizados;
- proteger información personal, historial, preferencias, comunicaciones y expedientes;
- atender derechos del titular sin borrar evidencia que deba conservarse;
- coordinar PASS, PULSO, VISO, NUMERA, NEXO y proveedores externos sin duplicar casos ni efectos.

La existencia de perfiles, QR, puntos, redenciones, feedback, chats, pedidos y notificaciones no permite declarar resuelta la familia `CAP-10`. La cobertura exige una relación de cliente coherente, multicanal, protegida y auditable.

---

#### 2. Pregunta de decisión

`CAP-SCOPE-010` responde:

```text
¿CÓMO DEBE VENTO GROUP IDENTIFICAR, ATENDER, ESCUCHAR Y FIDELIZAR
A SUS CLIENTES A TRAVÉS DE TODAS LAS MARCAS, SEDES Y CANALES,
SIN CONFUNDIR PERSONA, CUENTA, PERFIL, CONSENTIMIENTO, PREFERENCIA,
PEDIDO, RECLAMO, FEEDBACK, DEVOLUCIÓN, COMPENSACIÓN, RESERVA NI PUNTOS?
```

Quedan prohibidas equivalencias como:

```text
PERSONA CLIENTE = CUENTA PASS = REGISTRO DE AUTH
```

```text
TELÉFONO COINCIDENTE = MISMA PERSONA
```

```text
PREFERENCIA = CONSENTIMIENTO
```

```text
PREGUNTA = RECLAMO = FEEDBACK
```

```text
DEVOLUCIÓN = REEMBOLSO = COMPENSACIÓN = CORTESÍA
```

```text
SALDO DE PUNTOS = LEDGER DE FIDELIZACIÓN
```

```text
CHAT DE PEDIDO = EXPEDIENTE DE SERVICIO
```

```text
RESERVA = MESA = PEDIDO = EVENTO
```

```text
VISTA CLIENTE 360 = NUEVA FUENTE DE VERDAD
```

---

#### 3. Fuentes consolidadas

- `OPS-AUD-001` a `OPS-AUD-015`;
- `OPS-PLAN-001` a `OPS-PLAN-004`;
- `OPS-CAN-001` y `OPS-B2B-001` cuando se activen;
- `CAP-MAP-001` a `CAP-MAP-015`;
- `CODE-AUD-001` a `CODE-AUD-020`;
- `CAP-SCOPE-001` a `CAP-SCOPE-009`;
- decisiones de identidad, autorización, auditoría e invalidación ya aprobadas;
- `PASS-UX-001` a `PASS-UX-010`;
- `PASS-INT-001` a `PASS-INT-005`;
- `PASS-QA-001` y `PASS-QA-002`;
- `PULSO-AUTH-001` a `PULSO-AUTH-016`;
- `PULSO-UX-001` a `PULSO-UX-021`;
- tareas administrativas y de privacidad de VISO, SHELL y Supabase;
- perfil y consentimiento básico en `public.users`;
- puntos, transacciones, recompensas, redenciones e historial actuales;
- `user_feedback` y flujo actual de calificación;
- pedidos, conversación vinculada al pedido, push notifications y tracking en PASS;
- identificación de cliente y operaciones de fidelización desde PULSO;
- registro vivo de preguntas pendientes;
- decisiones aprobadas de `CAP-SCOPE-009` sobre devolución, reembolso, compensación y cliente opcional.

Las respuestas existentes no se vuelven a solicitar.

---

#### 4. Alcance evaluado

- `CAP-10.01` — Identificar y conocer clientes;
- `CAP-10.02` — Registrar preferencias y autorizaciones;
- `CAP-10.03` — Atender preguntas y solicitudes;
- `CAP-10.04` — Recibir y resolver reclamos;
- `CAP-10.05` — Gestionar devoluciones y compensaciones;
- `CAP-10.06` — Medir satisfacción;
- `CAP-10.07` — Gestionar fidelización y beneficios;
- `CAP-10.08` — Gestionar reservas y eventos;
- `CAP-10.09` — Comunicar cambios que afecten al cliente;
- `CAP-10.10` — Proteger información del cliente.

También fija fronteras con venta, pagos, inventario, logística, Marketing, privacidad, documentos, analítica y continuidad.

---

#### 5. Fuera de alcance

- contactar clientes reales, enviar campañas o modificar preferencias;
- otorgar, descontar, transferir o corregir puntos;
- aprobar devoluciones, reembolsos, compensaciones o cortesías;
- crear reservas, eventos o depósitos reales;
- resolver reclamos reales desde esta tarea;
- fusionar, eliminar o migrar perfiles;
- decidir textos jurídicos definitivos de privacidad o condiciones;
- definir campañas y segmentación de Marketing, reservadas para `CAP-SCOPE-014`;
- ejecutar derechos del titular o políticas de retención, reservados para `CAP-SCOPE-016`;
- crear indicadores definitivos, reservados para `CAP-SCOPE-017`;
- crear tablas, políticas, RPC, Edge Functions, webhooks o jobs;
- autorizar acceso masivo a información de clientes;
- declarar PASS como CRM integral antes del diseño e implementación correspondientes.

---

#### 6. Principios canónicos

##### 6.1. Una persona cliente no depende de tener cuenta

La organización podrá atender una venta o solicitud ocasional sin crear una cuenta ficticia. La cuenta autenticada será un mecanismo de acceso, no la definición de la persona.

##### 6.2. Persona, cuenta, contacto, perfil y relación serán conceptos distintos

Una persona podrá tener contactos verificados, una o más relaciones de marca permitidas, pedidos, casos y consentimientos. Los identificadores técnicos no sustituirán la identidad empresarial.

##### 6.3. PASS será la superficie personal del cliente

PASS administrará autoservicio, perfil visible, QR, puntos, beneficios, redenciones, pedidos, comunicaciones, presentación de casos y reservas cuando se implementen. No será la superficie administrativa de investigación o aprobación.

##### 6.4. VISO será la superficie administrativa de servicio

VISO administrará colas, asignaciones, investigación, decisiones, SLA, compensaciones propuestas, reservas complejas y reportes. La fuente persistente será el dominio canónico compartido en Supabase gobernado desde SHELL.

##### 6.5. PULSO registrará hechos de servicio vinculados a la operación

PULSO identificará al cliente cuando sea necesario, registrará incidencias de la venta, recibirá solicitudes presenciales y ejecutará devoluciones o compensaciones autorizadas. No mantendrá un perfil o saldo alternativo.

##### 6.6. Preferencia y autorización no serán equivalentes

Preferir WhatsApp no implica autorizar Marketing por WhatsApp. Cada consentimiento conservará finalidad, texto o versión, canal, fuente, actor, timestamp, vigencia y retiro.

##### 6.7. Fidelización usará ledger, no solo saldo

El saldo será una proyección reconciliable de movimientos. Acumulación, redención, expiración, ajuste, reversión y compensación conservarán evento origen y regla aplicada.

##### 6.8. Reclamo, feedback y conversación conservarán semánticas diferentes

Una calificación baja puede originar un reclamo, pero no lo será automáticamente. Un chat de pedido puede aportar evidencia a un caso, pero no reemplazará su ciclo.

##### 6.9. Toda compensación tendrá una decisión y efectos explícitos

Producto, descuento, devolución de dinero, puntos, cupón o cortesía se modelarán como resultados distintos. Cada uno requerirá autoridad, motivo, valor, vigencia y correlación.

##### 6.10. La información del cliente se entregará por proyecciones mínimas

Caja, salón, soporte, Marketing, logística y gerencia no recibirán automáticamente los mismos datos. Cada proceso obtendrá únicamente los campos necesarios.

##### 6.11. La vista cliente 360 será una proyección

La vista consolidada no escribirá directamente en todas las fuentes. Mostrará identidad, relaciones, pedidos, casos, puntos, reservas y comunicaciones mediante contratos trazables.

##### 6.12. Las comunicaciones críticas serán auditables

Cambio, cancelación, retiro, retraso, cierre de sede, afectación de reserva o modificación de beneficio conservarán plantilla, versión, destinatario, canal, estado de entrega y fallback.

---

#### 7. Línea base verificable

##### 7.1. PASS

La implementación actual contiene:

- autenticación OTP y sesión persistente;
- perfil de cliente con nombre, documento, teléfono y fecha de nacimiento;
- aceptación de política de privacidad y timestamp;
- QR personal;
- saldo y movimientos de puntos;
- catálogo de recompensas;
- redenciones con estados;
- historial de fidelización;
- pedidos, detalle, chat y seguimiento;
- `user_feedback` y flujo de calificación;
- registro de tokens y recepción de notificaciones push;
- eliminación de cuenta en la experiencia móvil.

##### 7.2. PULSO

La implementación actual permite identificar cliente, acreditar puntos y validar redenciones mediante acciones de servidor y actor real en terminal compartida. También posee pedido, venta y reversión parcial que deberán relacionarse con servicio.

##### 7.3. Limitaciones comprobables

No se ha demostrado un ciclo integral para:

- persona cliente independiente de la cuenta;
- deduplicación, fusión y separación;
- consentimientos por finalidad y versión;
- preguntas y solicitudes omnicanal;
- reclamos con investigación y SLA;
- compensación coordinada;
- reservas y eventos;
- acceso administrativo mínimo;
- comunicaciones multicanal reconciliadas;
- métricas de servicio y satisfacción canónicas.

---

#### 8. Clasificación de cobertura

| Capacidad   | Nombre                                   | Tratamiento         | Justificación                                                                                                                                   |
| ----------- | ---------------------------------------- | ------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------- |
| `CAP-10.01` | Identificar y conocer clientes           | `REUSE_OR_REFACTOR` | PASS conserva identidad, perfil y relación con pedidos; se refactoriza para separar persona, cuenta, contacto, relación y proyecciones.         |
| `CAP-10.02` | Registrar preferencias y autorizaciones  | `REUSE_OR_REFACTOR` | Se conserva el perfil y la aceptación de privacidad; se exige ledger versionado por finalidad, canal, fuente, vigencia y retiro.                |
| `CAP-10.03` | Atender preguntas y solicitudes          | `BUILD`             | No existe un expediente omnicanal verificable de servicio con clasificación, responsable, SLA, mensajes, adjuntos, escalamiento y cierre.       |
| `CAP-10.04` | Recibir y resolver reclamos              | `BUILD`             | Feedback y chat de pedido no equivalen a reclamo; se requiere caso formal, investigación, decisión, comunicación y evidencia.                   |
| `CAP-10.05` | Gestionar devoluciones y compensaciones  | `REUSE_OR_REFACTOR` | Se reutilizan las acciones transaccionales de PULSO y los vínculos con pedido, pago e inventario; se añade gobierno del caso y aprobación.      |
| `CAP-10.06` | Medir satisfacción                       | `REUSE_OR_REFACTOR` | Existe user_feedback y flujo de calificación; se refactoriza para separar medición, incentivo, queja, muestra, canal y sesgo.                   |
| `CAP-10.07` | Gestionar fidelización y beneficios      | `REUSE_OR_REFACTOR` | Se conservan puntos, recompensas, redenciones, QR e historial; se exige ledger, reglas versionadas, ajustes controlados y conciliación.         |
| `CAP-10.08` | Gestionar reservas y eventos             | `BUILD`             | No existe ciclo integral confirmado de disponibilidad, reserva, depósito, cambios, no-show, evento, capacidad y cierre.                         |
| `CAP-10.09` | Comunicar cambios que afecten al cliente | `REUSE_OR_REFACTOR` | Se conservan push, chat y estados de pedido; se exige preferencia de canal, consentimiento aplicable, plantilla versionada, entrega y fallback. |
| `CAP-10.10` | Proteger información del cliente         | `REUSE_OR_REFACTOR` | Se reutilizan RLS, identidad y privacidad existentes; se endurecen proyecciones mínimas, acceso laboral, exportación, retención y derechos.     |

---

#### 9. Resumen de tratamientos

| Tratamiento         | Cantidad |
| ------------------- | -------: |
| `REUSE_OR_REFACTOR` |        7 |
| `BUILD`             |        3 |
| **Total**           |   **10** |

No se clasifica ninguna capacidad como resuelta. `REUSE_OR_REFACTOR` significa conservar componentes, datos o flujos útiles y someterlos al contrato objetivo.

---

#### 10. Propiedad funcional

```text
PASS
→ autoservicio personal
→ perfil y contactos propios
→ visualización y retiro de autorizaciones permitidas
→ QR, puntos, beneficios y redenciones
→ presentación y seguimiento de solicitudes
→ reservas y comunicaciones del cliente

PULSO
→ identificación durante la operación
→ captura presencial de solicitudes
→ vínculo con pedido, venta y mesa
→ ejecución autorizada de devolución o compensación

VISO
→ administración de casos
→ asignación, SLA y escalamiento
→ investigación y aprobación
→ reservas y eventos administrativos
→ supervisión de satisfacción y servicio

NUMERA
→ efecto económico de reembolso, cortesía o compensación

NEXO
→ devolución física y efecto de inventario

MARKETING / CAP-SCOPE-014
→ campañas, segmentación y contenido bajo autorizaciones válidas

SHELL / SUPABASE
→ identidad, contratos, integridad, autorización, auditoría y persistencia
```

Ninguna aplicación podrá mantener un saldo, consentimiento, reclamo o perfil administrativo competidor.

---

#### 11. Fuentes de verdad objetivo

| Concepto                  | Fuente objetivo                      | Consumidores                          |
| ------------------------- | ------------------------------------ | ------------------------------------- |
| persona cliente           | registro canónico de cliente         | PASS, PULSO, VISO, NUMERA             |
| cuenta autenticada        | Supabase Auth y vínculo de identidad | PASS, SHELL                           |
| contacto y verificación   | contacto canónico versionado         | PASS, servicio, comunicaciones        |
| consentimiento            | ledger de autorizaciones             | PASS, Marketing, servicio, privacidad |
| preferencia               | perfil de preferencias               | PASS, PULSO, comunicaciones           |
| fidelización              | ledger de movimientos y reglas       | PASS, PULSO, NUMERA                   |
| caso de servicio          | expediente canónico                  | PASS, PULSO, VISO                     |
| devolución o compensación | decisión y efectos vinculados        | PULSO, VISO, NEXO, NUMERA, PASS       |
| satisfacción              | respuesta y contexto de medición     | VISO, analítica                       |
| reserva o evento          | expediente de reserva                | PASS, PULSO, VISO, NUMERA             |
| comunicación              | evento y entrega por canal           | PASS, VISO, proveedores               |

---

#### 12. Modelo conceptual de cliente

Se distinguirán como mínimo:

```text
CUSTOMER_PERSON
AUTH_ACCOUNT
CUSTOMER_CONTACT
CONTACT_VERIFICATION
CUSTOMER_RELATIONSHIP
CUSTOMER_PROFILE
CUSTOMER_PREFERENCE
CONSENT_RECORD
LOYALTY_ACCOUNT
LOYALTY_LEDGER_ENTRY
SERVICE_CASE
SERVICE_INTERACTION
COMPLAINT_INVESTIGATION
SATISFACTION_RESPONSE
RESERVATION_CASE
COMPENSATION_DECISION
CUSTOMER_COMMUNICATION
```

Una misma persona podrá relacionarse con más de una marca o sede sin duplicarse, siempre que la base jurídica, finalidad y alcance permitan esa relación.

---

#### 13. Identificación, deduplicación y fusión

- ningún único atributo humano será prueba absoluta de identidad;
- correo, teléfono y documento tendrán estado de verificación y fuente;
- una coincidencia sugerirá revisión, no fusión automática;
- la fusión conservará identificadores anteriores, actor, razón, evidencia y rollback;
- una separación posterior será posible si la fusión fue incorrecta;
- pedidos, puntos, reclamos y consentimientos no se moverán silenciosamente;
- una cuenta cerrada no borrará automáticamente hechos sujetos a conservación;
- un cliente ocasional podrá vincularse posteriormente sin duplicar la venta original.

---

#### 14. Perfil, contactos, preferencias y autorizaciones

##### 14.1. Campos autoadministrables

El cliente podrá corregir datos permitidos mediante validaciones y auditoría. Campos protegidos, saldo, segmentos internos, decisiones de riesgo y notas administrativas no serán autoadministrables.

##### 14.2. Contactos

Cada correo o teléfono conservará:

- tipo;
- valor normalizado;
- estado de verificación;
- fuente;
- vigencia;
- uso permitido;
- fecha de baja.

##### 14.3. Consentimientos

Cada autorización conservará:

- finalidad específica;
- canal;
- texto o versión;
- fuente de captura;
- timestamp;
- estado;
- retiro;
- evidencia;
- restricciones de marca o titular cuando apliquen.

##### 14.4. Preferencias

Se separarán preferencias de producto, servicio, canal, sede, horario, idioma y accesibilidad. No se inferirán datos sensibles a partir de compras o reclamos sin decisión explícita y tratamiento permitido.

---

#### 15. Identificación durante venta y servicio

PULSO podrá:

- escanear QR;
- buscar por contacto autorizado;
- vincular pedido existente;
- continuar como consumidor final no identificado;
- mostrar una proyección mínima;
- solicitar verificación adicional para acciones sensibles.

El personal no verá documento, fecha de nacimiento, historial completo o contactos si la tarea no los necesita.

---

#### 16. Preguntas y solicitudes

Todo contacto que requiera seguimiento podrá crear un `SERVICE_CASE` con:

- identificador estable;
- cliente identificado u ocasional;
- canal y punto de origen;
- categoría y subcategoría;
- marca, sede, pedido o servicio relacionado;
- descripción original inmutable;
- mensajes y adjuntos;
- responsable y cola;
- prioridad y SLA;
- estado y siguiente acción;
- comunicaciones enviadas;
- resolución y confirmación de cierre.

Una respuesta simple podrá cerrarse en el primer contacto, sin omitir evidencia mínima.

---

#### 17. Reclamos

El reclamo tendrá un ciclo distinto:

```text
RECIBIDO
→ CLASIFICADO
→ ASIGNADO
→ EN INVESTIGACIÓN
→ DECISIÓN PROPUESTA
→ APROBADO O RECHAZADO
→ COMUNICADO
→ RESUELTO
→ CERRADO
```

Según criticidad, podrá incluir:

- declaración del cliente;
- pedido, venta, pago o entrega;
- evidencia operativa;
- respuesta de sede o área;
- causa;
- acción correctiva;
- compensación;
- comunicación final;
- apelación o reapertura.

La declaración original no se sobrescribirá.

---

#### 18. Devoluciones, reembolsos y compensaciones

Se conservarán como conceptos separados:

```text
RETURN_REQUEST
PHYSICAL_RETURN
REFUND
DISCOUNT
REPLACEMENT
COURTESY_PRODUCT
LOYALTY_CREDIT
COUPON
SERVICE_RECOVERY
```

La decisión deberá indicar:

- autoridad;
- motivo;
- política o excepción;
- valor;
- beneficiario;
- vigencia;
- efectos de inventario, pago, fiscalidad, puntos y costo;
- evento original;
- evidencia de ejecución.

Una compensación no podrá ejecutarse dos veces desde PASS, PULSO, VISO o un proveedor externo.

---

#### 19. Satisfacción y feedback

La medición distinguirá:

- calificación transaccional;
- satisfacción general;
- feedback abierto;
- reclamo;
- recomendación;
- evaluación de resolución;
- reseña pública externa.

Toda métrica documentará población, canal, momento, tasa de respuesta y sesgos. Un incentivo por responder no dependerá de una calificación positiva.

Una respuesta crítica podrá ofrecer crear un reclamo con autorización del cliente, pero no lo hará silenciosamente.

---

#### 20. Fidelización y beneficios

##### 20.1. Ledger

Cada movimiento conservará:

- tipo;
- cantidad;
- regla y versión;
- pedido o venta origen;
- actor o sistema;
- timestamp;
- vigencia o expiración;
- reversión o compensación;
- idempotency key.

##### 20.2. Beneficios

Se distinguirán:

- puntos;
- recompensa;
- cupón;
- nivel;
- membresía;
- promoción;
- cortesía;
- beneficio por campaña.

##### 20.3. Ajustes

Los ajustes manuales serán acciones nombradas, con permiso, razón, evidencia y límites. Los ajustes de alto impacto requerirán aprobación adicional.

##### 20.4. Redenciones

La redención conservará reserva de puntos, estado, expiración, uso, cancelación, sede, recompensa y relación con venta o entrega. Una respuesta perdida no generará dos redenciones.

---

#### 21. Reservas y eventos

El expediente deberá distinguir:

```text
SOLICITUD
COTIZACIÓN O CONDICIONES
DISPONIBILIDAD
HOLD TEMPORAL
RESERVA CONFIRMADA
DEPÓSITO
CAMBIO
CANCELACIÓN
NO-SHOW
LLEGADA
MESA O SERVICIO ASIGNADO
CIERRE
```

La reserva conservará:

- cliente y contacto;
- sede, zona, fecha y franja;
- número de personas;
- tipo de ocasión o evento;
- requisitos especiales;
- capacidad comprometida;
- depósito y condiciones;
- responsable;
- comunicaciones;
- vínculos con pedido, mesa, contrato o factura cuando apliquen.

Una solicitud no bloqueará capacidad indefinidamente.

---

#### 22. Comunicaciones que afectan al cliente

Se registrarán como eventos separados:

- confirmación;
- cambio de horario o sede;
- retraso;
- sustitución;
- cancelación;
- pedido listo;
- afectación de reserva;
- cambio de beneficio;
- vencimiento;
- resolución de reclamo;
- retiro de producto o alerta aplicable.

Cada comunicación tendrá plantilla y versión, finalidad, canal, destinatario, estado, proveedor, intentos, entrega, lectura cuando exista, error y fallback.

Las comunicaciones operativas necesarias no se confundirán con Marketing.

---

#### 23. Atención omnicanal

PASS, PULSO, teléfono, correo, WhatsApp, redes, formulario y atención presencial deberán converger en el mismo caso cuando correspondan.

El adaptador externo conservará:

- identificador del canal;
- identidad o contacto declarado;
- payload original;
- timestamps;
- adjuntos;
- mensajes entrantes y salientes;
- estado de entrega;
- relación con el caso canónico.

No se copiará una conversación completa a notas sin estructura ni control de privacidad.

---

#### 24. Protección de información

La autorización deberá considerar:

- identidad real del trabajador;
- capacidad exacta;
- marca, sede y caso;
- participación en el expediente;
- sensibilidad del dato;
- estado del caso;
- finalidad de consulta;
- dispositivo compartido;
- exportación o descarga.

Se prohibirá:

- buscar clientes sin motivo operativo;
- consultar masivamente perfiles desde caja;
- mostrar datos completos en notificaciones;
- exponer notas internas al cliente;
- usar simulación para ampliar acceso;
- exportar sin permiso y evidencia;
- copiar información personal a logs, chats internos o archivos no gobernados.

---

#### 25. Derechos, corrección y eliminación

Las solicitudes de consulta, corrección, revocación o eliminación tendrán expediente, verificación de identidad, responsable, plazo, decisión, alcance y evidencia.

La eliminación de cuenta no equivaldrá automáticamente a eliminar:

- ventas;
- facturas;
- pagos;
- auditoría;
- reclamos;
- consentimientos históricos;
- movimientos de fidelización;
- documentos sujetos a conservación.

Cuando corresponda, se aplicará anonimización, desvinculación o restricción documentada.

---

#### 26. Auditoría, exportación y acceso administrativo

Toda consulta sensible o cambio conservará cuando corresponda:

- principal;
- actor efectivo;
- permiso;
- propósito;
- cliente;
- caso;
- campos consultados o modificados;
- exportación;
- dispositivo;
- timestamp;
- resultado.

Las exportaciones tendrán filtros, límite, clasificación, propietario, expiración y trazabilidad de descarga.

---

#### 27. Métricas y niveles de servicio

Se reservarán definiciones canónicas para:

- volumen de contactos;
- resolución en primer contacto;
- tiempo de primera respuesta;
- tiempo de resolución;
- reapertura;
- cumplimiento de SLA;
- reclamos por pedido o venta;
- tasa y valor de compensación;
- satisfacción y recomendación;
- recurrencia;
- acumulación y redención;
- expiración y pasivo de puntos;
- no-show y cancelación de reservas.

Los indicadores no se calcularán mezclando clientes, contactos, pedidos o casos como denominadores equivalentes.

---

#### 28. Operación offline, reintentos y concurrencia

- crear caso, mensaje, reserva, redención o compensación exigirá idempotency key;
- el mismo identificador con contenido diferente producirá conflicto;
- una respuesta perdida se consultará antes de repetir el efecto;
- los mensajes conservarán orden y deduplicación;
- una reserva temporal tendrá expiración atómica;
- dos agentes no aprobarán la misma compensación;
- los movimientos de puntos no se aplicarán dos veces;
- la sincronización offline reautorizará al actor y el estado actual.

---

#### 29. Migración y convivencia

La transición deberá inventariar:

- perfiles actuales;
- contactos y verificaciones;
- consentimientos;
- movimientos y saldos de puntos;
- recompensas y redenciones;
- feedback;
- pedidos y chats;
- tokens de notificación;
- posibles duplicados;
- datos incompletos o no recuperables.

Ningún saldo o consentimiento se dará por correcto únicamente porque exista una columna. La migración tendrá reconciliación, muestra, conflictos, rollback y registro de exclusiones.

---

#### 30. Preguntas pendientes reutilizadas

No se crean preguntas nuevas.

Se reutilizan:

| ID       | Uso en esta tarea                             | Tratamiento provisional                                      | Puerta máxima                      |
| -------- | --------------------------------------------- | ------------------------------------------------------------ | ---------------------------------- |
| `OPE-02` | confirmar sedes que aceptan reservas          | reservas permanecen `BUILD` y deshabilitadas                 | antes de diseño de reservas E2     |
| `OPE-10` | autoridad para aceptar devolución             | solo supervisor autorizado provisional                       | antes del piloto de devoluciones   |
| `OPE-11` | autoridad para compensar                      | ningún efecto sin autorización explícita                     | antes del piloto de compensaciones |
| `DAT-24` | fuente actual de devoluciones                 | no migrar historia no comprobada                             | antes del backfill                 |
| `DAT-25` | fuente actual de compensaciones               | no asumir que descuento, producto y dinero están conciliados | antes de automatización            |
| `COM-03` | responsable de devoluciones de Vaila Vainilla | caso se enruta a responsable manual confirmado               | antes de integrar el canal         |
| `COM-04` | aprobación de catering                        | reserva o evento especial no se confirma sin aprobación      | antes del piloto                   |
| `COM-05` | existencia de contrato o cotización estándar  | mantener control manual                                      | antes de construir evento B2B      |

Las respuestas faltantes no bloquean la clasificación de cobertura. Sí bloquean migración, automatización y piloto con efectos.

---

#### 31. Hallazgos y destinos

| Hallazgo              | Brecha                                                                                                                                  | Tarea propietaria                                                             | Momento de resolución                          |
| --------------------- | --------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------- | ---------------------------------------------- |
| `H-CAP-SCOPE-010-001` | La implementación puede tratar cuenta PASS, persona cliente y registro de public.users como equivalentes.                               | `PASS-INT-005; SUPA-AUD-019; CAP-SCOPE-016`                                   | Antes del diseño lógico E3.                    |
| `H-CAP-SCOPE-010-002` | No existe contrato empresarial completo para clientes ocasionales sin cuenta.                                                           | `PULSO-UX-007; PASS-INT-004; PROC-CAT-009 a PROC-CAT-018`                     | Antes del prototipo de venta y servicio E2.    |
| `H-CAP-SCOPE-010-003` | La deduplicación y fusión de clientes no tiene reglas canónicas reversibles verificadas.                                                | `SUPA-AUD-019; SUPA-AUD-022; CAP-SCOPE-016`                                   | Antes de migrar o consolidar perfiles.         |
| `H-CAP-SCOPE-010-004` | La aceptación de privacidad existente no demuestra versión de texto, finalidad, canal, fuente ni retiro por cada autorización.          | `PASS-UX-008; CAP-SCOPE-016; EVID-ARC-001 a EVID-ARC-010`                     | Antes de ampliar tratamiento o comunicaciones. |
| `H-CAP-SCOPE-010-005` | Preferencia comercial, preferencia operativa y consentimiento pueden quedar mezclados.                                                  | `PASS-UX-008; CAP-SCOPE-014; CAP-SCOPE-016`                                   | Durante diseño E2 de perfil y comunicaciones.  |
| `H-CAP-SCOPE-010-006` | No existe expediente omnicanal único para preguntas y solicitudes.                                                                      | `PROC-CAT-009 a PROC-CAT-018; VISO-UX-013 a VISO-UX-020; PASS-UX-010`         | Antes del paquete E5 de servicio.              |
| `H-CAP-SCOPE-010-007` | No se han definido categorías, severidad, propietario, SLA, escalamiento y cierre de casos de servicio.                                 | `PROC-CAT-009 a PROC-CAT-019; PROC-ACTOR-001 a PROC-ACTOR-010; CAP-SCOPE-017` | Durante diseño de procesos E2.                 |
| `H-CAP-SCOPE-010-008` | Feedback, conversación de pedido, solicitud, reclamo y denuncia podrían confundirse.                                                    | `PASS-UX-006; PULSO-UX-009; PROC-CAT-020`                                     | Antes de definir pantallas y métricas.         |
| `H-CAP-SCOPE-010-009` | Devolución, reembolso, compensación, cortesía y ajuste de puntos no tienen un expediente común de decisión.                             | `PULSO-UX-009; PULSO-AUTH-008; CAP-SCOPE-012; PASS-INT-002`                   | Antes del piloto con efectos reales.           |
| `H-CAP-SCOPE-010-010` | El efecto de una devolución sobre inventario, pago, documento fiscal, puntos y costo todavía requiere coordinación exactamente una vez. | `TREQ-INTEGRATION-014; NEXO-UX-014 a NEXO-UX-022; CAP-SCOPE-012`              | Antes de habilitar devoluciones integradas.    |
| `H-CAP-SCOPE-010-011` | El saldo de puntos puede interpretarse como fuente primaria sin reconciliación contra un ledger inmutable.                              | `PASS-INT-001; PASS-INT-002; PASS-QA-001; PASS-QA-002; SUPA-AUD-022`          | Antes de migrar o ampliar fidelización.        |
| `H-CAP-SCOPE-010-012` | Regla de puntos, beneficio, recompensa, cupón, membresía y promoción no están completamente separados.                                  | `PASS-UX-002 a PASS-UX-009; CAP-SCOPE-014`                                    | Durante diseño E2 de fidelización y campañas.  |
| `H-CAP-SCOPE-010-013` | Los ajustes manuales de puntos y beneficios requieren permisos, motivo, doble control y compensación.                                   | `PASS-INT-004; PULSO-AUTH-009; PULSO-AUTH-010; AUTH-SRV-004 a AUTH-SRV-018`   | Antes de habilitar administración.             |
| `H-CAP-SCOPE-010-014` | La medición de satisfacción puede estar sesgada si se condicionan puntos o si solo se invita a ciertos clientes.                        | `PASS-UX-006; CAP-SCOPE-017; UX-QA-029`                                       | Antes de usar el indicador para decisiones.    |
| `H-CAP-SCOPE-010-015` | Reservas y eventos no tienen ciclo integral confirmado ni propietario único.                                                            | `OPS-CAN-001; OPS-B2B-001; PULSO-UX-001; PROC-CAT-009 a PROC-CAT-018`         | Antes del diseño E2 y cualquier piloto.        |
| `H-CAP-SCOPE-010-016` | No están cerradas las reglas de capacidad, depósito, cancelación, no-show y conversión de reserva a mesa o pedido.                      | `CAP-SCOPE-009; CAP-SCOPE-012; PROC-CAT-009 a PROC-CAT-018`                   | Antes de construir reservas.                   |
| `H-CAP-SCOPE-010-017` | Las comunicaciones pueden usar push, chat, correo o mensajería sin una preferencia y finalidad única.                                   | `CAP-SCOPE-014; CAP-SCOPE-016; INT-EXT-001 a INT-EXT-020`                     | Antes de ampliar comunicaciones.               |
| `H-CAP-SCOPE-010-018` | El ciclo de vida de tokens, dispositivos, rebotes, baja y opt-out de comunicaciones no está certificado.                                | `INT-EXT-001 a INT-EXT-020; CAP-SCOPE-015; AUTH-QA-025`                       | Antes del paquete E5 de notificaciones.        |
| `H-CAP-SCOPE-010-019` | El chat de pedido existente no reemplaza un canal general de servicio ni garantiza continuidad después del cierre del pedido.           | `PASS-UX-010; PULSO-UX-018; PROC-CAT-009 a PROC-CAT-018`                      | Durante diseño E2 de atención.                 |
| `H-CAP-SCOPE-010-020` | La relación del mismo cliente con varias marcas, sedes y titulares jurídicos necesita alcance y finalidad explícitos.                   | `CAP-SCOPE-001; PASS-INT-004; CAP-SCOPE-016`                                  | Antes de crear vista cliente 360.              |
| `H-CAP-SCOPE-010-021` | Documento, teléfono, correo, fecha de nacimiento y comportamiento pueden exponerse más allá de la necesidad operativa.                  | `TREQ-AUTH-006; VISO-AUTH-013 a VISO-AUTH-020; CAP-SCOPE-016`                 | Antes de habilitar consultas administrativas.  |
| `H-CAP-SCOPE-010-022` | Los derechos de consulta, corrección, revocación y eliminación no están conectados a retención, auditoría y obligaciones aplicables.    | `PASS-UX-008; CAP-SCOPE-016; EVID-ARC-001 a EVID-ARC-010`                     | Antes de certificar privacidad.                |
| `H-CAP-SCOPE-010-023` | No se ha certificado que exportaciones, URL directa, dispositivos compartidos y simulación respeten el alcance de cliente.              | `AUTH-QA-018; AUTH-QA-020 a AUTH-QA-024; AUTH-QA-029; AUTH-QA-030`            | Antes de certificación del BLOQUE U.           |
| `H-CAP-SCOPE-010-024` | Reintentos offline o eventos duplicados podrían crear casos, mensajes, puntos, reservas o compensaciones repetidas.                     | `QUEUE-ARC-001 a QUEUE-ARC-010; INT-DB-005 a INT-DB-008; AUTH-QA-026`         | Antes de implementación E5.                    |
| `H-CAP-SCOPE-010-025` | La migración de perfiles, consentimientos, puntos y feedback actuales no tiene aún plan de calidad, conflicto y rollback.               | `SUPA-TRANS-005 a SUPA-TRANS-007; SUPA-AUD-019; SUPA-AUD-022`                 | Antes de migraciones E3/E5.                    |
| `H-CAP-SCOPE-010-026` | Los indicadores de satisfacción, recurrencia, resolución, compensación y fidelización no tienen definición canónica aprobada.           | `CAP-SCOPE-017; PROC-CAT-019; CAP-COVER-001 a CAP-COVER-012`                  | Antes de tableros y decisiones gerenciales.    |

No queda ningún hallazgo narrativo sin propietario documental y puerta de resolución.

---

#### 32. Riesgos y controles mínimos

| Riesgo                          | Control mínimo                                    |
| ------------------------------- | ------------------------------------------------- |
| perfil duplicado                | identidad estable, revisión y fusión reversible   |
| contacto no autorizado          | consentimiento por finalidad y canal              |
| exposición de datos             | proyección mínima y autorización contextual       |
| reclamo perdido                 | caso estable, cola, responsable y SLA             |
| compensación duplicada          | decisión única e idempotencia transversal         |
| puntos incorrectos              | ledger y conciliación contra evento origen        |
| feedback sesgado                | metodología, población e incentivo neutral        |
| reserva sobrevendida            | hold temporal, capacidad y expiración atómica     |
| comunicación no entregada       | estado, reintento y fallback                      |
| eliminación destructiva         | retención, anonimización y auditoría              |
| integración omnicanal duplicada | inbox, deduplicación y correlación                |
| vista 360 competidora           | proyección de solo lectura con fuentes declaradas |

---

#### 33. Decisiones aprobables

1. Persona cliente, cuenta, contacto, perfil, relación y consentimiento serán conceptos distintos.
2. Se podrá atender a un cliente ocasional sin crear cuenta ficticia.
3. PASS será la superficie personal; VISO la administrativa; PULSO la operativa vinculada a venta.
4. La vista cliente 360 será una proyección, no una nueva fuente.
5. Preferencias y autorizaciones conservarán finalidades separadas.
6. Preguntas, solicitudes, reclamos y feedback tendrán semánticas distintas.
7. Reclamos usarán expediente, investigación, decisión, comunicación y cierre.
8. Devolución, reembolso, compensación, cortesía y puntos serán resultados distintos.
9. Fidelización usará ledger versionado y saldo reconciliable.
10. Los ajustes manuales requerirán permiso, motivo y evidencia.
11. Satisfacción documentará muestra, canal y sesgo.
12. Reservas y eventos se construirán como expediente independiente.
13. Comunicaciones operativas y de Marketing se separarán.
14. El acceso laboral utilizará proyecciones mínimas y contexto.
15. Los derechos del titular se coordinarán con retención y auditoría.
16. PASS, PULSO, VISO y proveedores no duplicarán casos ni efectos.
17. Toda operación sensible será idempotente y conciliable.
18. No se autoriza implementación ni actuación real desde esta tarea.

---

#### 34. Decisiones diferidas con dueño

| Decisión                                                 | Tratamiento provisional                              | Tarea o responsable                 | Puerta máxima                   |
| -------------------------------------------------------- | ---------------------------------------------------- | ----------------------------------- | ------------------------------- |
| identidad legal y datos mínimos obligatorios del cliente | conservar campos actuales sin ampliar obligatoriedad | `CAP-SCOPE-016`; asesoría aplicable | antes de rediseñar onboarding   |
| política de fusión de clientes                           | no fusionar automáticamente                          | `SUPA-AUD-019`; `SUPA-AUD-022`      | antes de migración              |
| reglas definitivas de expiración de puntos               | conservar reglas vigentes y versionarlas             | Gerencia; PASS; `CAP-SCOPE-012`     | antes de publicar nueva versión |
| autoridad y límites de compensación                      | sin efecto automático                                | `OPE-11`; PULSO; VISO; NUMERA       | antes del piloto                |
| reservas aceptadas por sede                              | capacidad deshabilitada donde no esté confirmada     | `OPE-02`; responsables de sede      | antes del prototipo             |
| canales y frecuencia de Marketing                        | solo comunicaciones operativas necesarias            | `CAP-SCOPE-014`; `CAP-SCOPE-016`    | antes de campañas               |
| política de retención y eliminación                      | conservar historia con acceso restringido            | `CAP-SCOPE-016`                     | antes de automatizar derechos   |
| definiciones KPI                                         | no usar métricas como canónicas                      | `CAP-SCOPE-017`                     | antes de tableros               |

---

#### 35. Requisitos de prueba generados

```text
TREQ-AUTH-018
TREQ-PASS-010
TREQ-PASS-011
TREQ-INTEGRATION-015
```

##### 35.1. `TREQ-AUTH-018`

Protege datos, consentimientos, preferencias, casos, reclamos, reservas, comunicaciones, fidelización y exportaciones mediante acceso mínimo, finalidad, territorio, relación y auditoría.

##### 35.2. `TREQ-PASS-010`

Protege identidad de cliente, cuenta, contactos, consentimientos, preferencias y ledger de fidelización, incluyendo deduplicación, fusión reversible y cliente ocasional.

##### 35.3. `TREQ-PASS-011`

Protege atención, reclamos, devoluciones, compensaciones, satisfacción, reservas y comunicaciones con ciclos y estados independientes.

##### 35.4. `TREQ-INTEGRATION-015`

Protege la convergencia omnicanal entre PASS, PULSO, VISO y proveedores, y los efectos exactamente una vez hacia venta, pago, inventario, puntos y finanzas.

Los detalles viven exclusivamente en el `04A` completo regenerado.

---

#### 36. Puertas de implementación

##### Puerta 1 — Procesos E2

- conceptos y estados aprobados;
- actores, colas, SLA y aprobaciones definidos;
- reservas y compensaciones con reglas provisionales;
- preguntas críticas con tratamiento.

##### Puerta 2 — Datos y arquitectura E3/E4

- modelo de identidad y consentimiento;
- ledger de fidelización;
- caso e interacción omnicanal;
- autorización y privacidad;
- colas, notificaciones e idempotencia;
- migración y rollback.

##### Puerta 3 — Implementación E5

- PASS, PULSO y VISO contra contratos compartidos;
- adaptadores externos controlados;
- conciliación con NEXO y NUMERA;
- pruebas automatizadas y manuales.

##### Puerta 4 — Piloto y certificación

- datos de prueba anonimizados;
- límites de compensación;
- medición de SLA;
- privacidad y exportación certificadas;
- contingencia y recuperación;
- aprobación del BLOQUE U.

---

#### 37. Criterios de aceptación

`CAP-SCOPE-010` podrá aprobarse cuando:

- las 10 subcapacidades tengan tratamiento explícito;
- persona, cuenta, perfil, contacto, consentimiento y relación estén separados;
- PASS, PULSO, VISO, NEXO, NUMERA y proveedores tengan fronteras claras;
- cliente ocasional y cliente autenticado estén soportados conceptualmente;
- preguntas, reclamos, feedback y chat tengan semánticas distintas;
- devoluciones y compensaciones tengan decisión y efectos separados;
- fidelización se base en ledger reconciliable;
- reservas y eventos tengan tratamiento y límites;
- comunicaciones y privacidad tengan reglas mínimas;
- las preguntas existentes tengan uso y puerta;
- los 26 hallazgos tengan propietario y momento;
- los cuatro requisitos nuevos estén incorporados en un `04A` completo válido;
- no se haya autorizado implementación ni actuación real.

---

#### 38. Resultado y continuidad

Al aprobarse esta tarea quedará definida la cobertura objetivo de clientes, fidelización, reclamos y servicio, sin ejecutar todavía el diseño detallado ni la implementación.

La continuidad será exclusivamente:

```text
CAP-SCOPE-011
— Evaluar logística, rutas, vehículos, combustible y entregas
```

`CAP-SCOPE-011` consumirá los contratos de comunicación, caso de entrega y cliente aquí aprobados, pero no reabrirá la propiedad de PASS, PULSO o VISO ni la semántica de compensación.


### ✅ CAP-SCOPE-011 — Evaluar logística, rutas, vehículos, combustible y entregas

**Estado:** APROBADA 
**Bloque:** E1 — Descubrimiento integral de operación, capacidades y cobertura de implementación  
**Dependencia cumplida:** `CAP-SCOPE-010` aprobada  
**Tarea anterior:** `CAP-SCOPE-010`  
**Siguiente tarea reservada:** `CAP-SCOPE-012`  
**Familia evaluada:** `CAP-11 — Transportar, despachar y entregar`  
**Naturaleza:** decisión de cobertura empresarial y definición conceptual objetivo  
**Implementación técnica:** no autorizada  
**Migraciones o cambios en Supabase:** no autorizados  
**Rutas, asignaciones, despachos, entregas, combustible, tracking o actuaciones reales:** no autorizados  
**Requisitos de prueba generados:** `TREQ-NEXO-016`, `TREQ-PULSO-007`, `TREQ-INTEGRATION-016`  
**Requisitos previos reutilizados:** `TREQ-NEXO-011`, `TREQ-NEXO-012`, `TREQ-NEXO-013`, `TREQ-NEXO-015`, `TREQ-PULSO-005`, `TREQ-PASS-011`, `TREQ-AUTH-018`, `TREQ-INTEGRATION-011`, `TREQ-INTEGRATION-014`, `TREQ-INTEGRATION-015`  
**Actualización del registro de pruebas:** se entrega el archivo `04A` completo regenerado; quedan prohibidas las filas sueltas

---

#### 1. Propósito

Definir el tratamiento objetivo de las capacidades mediante las cuales Vento Group deberá:

- consolidar necesidades de transporte procedentes de abastecimiento, producción, remisiones, ventas, devoluciones y movimientos internos;
- distinguir una configuración de abastecimiento de producto de un recorrido físico ejecutado;
- planear rutas y paradas con ventanas, prioridades, restricciones y capacidad;
- asignar vehículo, conductor y apoyos por vigencia y operación;
- preparar la carga con LOC, LPN, bultos, contenedores, cantidades, compatibilidad y orden de descarga;
- confirmar condición y cantidades antes de la salida;
- transferir custodia de forma explícita;
- ejecutar el recorrido y registrar llegada, servicio, salida, desvío, pausa y contingencia;
- registrar novedades sin alterar silenciosamente el estado del pedido o remisión;
- entregar y confirmar recepción según destinatario, evidencia y política;
- gestionar faltantes, daños, rechazo, devolución y logística inversa;
- cerrar el recorrido conciliando carga, custodias, entregas, retornos, kilometraje, combustible y documentos;
- integrar mensajeros, Rappi u otros terceros mediante credenciales y contratos mínimos;
- proteger datos del cliente, del trabajador y de la operación;
- emitir efectos físicos, comerciales y económicos exactamente una vez.

La existencia de remisiones, preparación, envíos físicos, vista del conductor, tránsito, recepción, tracking de pedidos, portal externo y PIN no permite declarar resuelta la familia `CAP-11`. La cobertura exige un proceso logístico completo, versionado, conciliable y auditable.

---

#### 2. Pregunta de decisión

`CAP-SCOPE-011` responde:

```text
¿CÓMO DEBE VENTO GROUP PLANEAR, ASIGNAR, CARGAR, CUSTODIAR,
TRANSPORTAR, ENTREGAR, RECIBIR Y CERRAR CADA OPERACIÓN LOGÍSTICA,
INCLUIDAS LAS ENTREGAS A CLIENTES Y MEDIANTE TERCEROS,
SIN CONFUNDIR NECESIDAD, RUTA, VIAJE, PARADA, REMISIÓN, CARGA,
LPN, VEHÍCULO, CONDUCTOR, CUSTODIA, ENTREGA NI RECEPCIÓN?
```

Quedan prohibidas equivalencias como:

```text
RUTA DE ABASTECIMIENTO DE PRODUCTO = RECORRIDO FÍSICO DE VEHÍCULO
```

```text
NECESIDAD DE TRANSPORTE = RUTA PUBLICADA = VIAJE EJECUTADO
```

```text
REMISIÓN = CARGA = LPN = CONTENEDOR = VEHÍCULO
```

```text
ASIGNAR CONDUCTOR = TRANSFERIR CUSTODIA
```

```text
DESPACHAR = SALIR = ENTREGAR = RECIBIR = COMPLETAR
```

```text
ENTREGA CONFIRMADA = MOVIMIENTO DE INVENTARIO APLICADO
```

```text
PIN CORRECTO = AUSENCIA DE DIFERENCIAS O DAÑOS
```

```text
COMPRA DE COMBUSTIBLE = CONSUMO DE LA RUTA
```

---

#### 3. Fuentes consolidadas

- `OPS-AUD-001` a `OPS-AUD-015`;
- `OPS-ACT-001`;
- `OPS-PLAN-001` a `OPS-PLAN-004`;
- `OPS-LOG-001` reservado para diseño TO-BE;
- `OPS-CAN-001` y `OPS-B2B-001` cuando apliquen;
- `CAP-MAP-001` a `CAP-MAP-015`;
- `CODE-AUD-001` a `CODE-AUD-020`;
- `CAP-SCOPE-001` a `CAP-SCOPE-010`;
- `NEXO-AUTH-001` a `NEXO-AUTH-030`;
- `NEXO-DOM-001` a `NEXO-DOM-028`;
- `NEXO-UX-001` a `NEXO-UX-042`;
- `PULSO-AUTH-001` a `PULSO-AUTH-016`;
- `PULSO-UX-001` a `PULSO-UX-021`;
- `PASS-UX-001` a `PASS-UX-010`;
- `PASS-INT-001` a `PASS-INT-005`;
- `INT-APP-001` a `INT-APP-010`;
- `INT-EXT-001` a `INT-EXT-020`;
- implementación actual de remisiones, fulfillment, envíos físicos, conductor, tránsito y recepción en NEXO;
- implementación actual de tracking persistente, sesión de entrega, PIN, portal temporal, novedades y override para pedidos de cliente;
- registro vivo de preguntas y respuestas ya capturadas.

Las respuestas ya entregadas por el usuario no se vuelven a solicitar ni obligan a reabrir tareas aprobadas salvo contradicción material comprobada.

---

#### 4. Alcance evaluado

- `CAP-11.01` — Planear necesidades de transporte;
- `CAP-11.02` — Definir recorridos y prioridades;
- `CAP-11.03` — Asignar vehículo y responsable;
- `CAP-11.04` — Preparar carga;
- `CAP-11.05` — Confirmar cantidades y condición al salir;
- `CAP-11.06` — Transferir custodia para transporte;
- `CAP-11.07` — Ejecutar recorrido;
- `CAP-11.08` — Registrar novedades durante transporte;
- `CAP-11.09` — Entregar y confirmar recepción;
- `CAP-11.10` — Gestionar faltantes, daños y devoluciones;
- `CAP-11.11` — Cerrar y revisar el recorrido;
- `CAP-11.12` — Gestionar entregas mediante terceros.

También fija fronteras con inventario, ventas, clientes, producción, compras, activos, combustible, mantenimiento, privacidad, documentos, analítica y continuidad.

---

#### 5. Fuera de alcance

- crear o publicar rutas reales;
- asignar conductores, vehículos o terceros;
- despachar, recibir o marcar entregas;
- registrar combustible, kilometraje o peajes reales;
- activar geolocalización continua;
- enviar mensajes o PIN a clientes reales;
- contratar transportistas o modificar acuerdos externos;
- definir tarifas, liquidaciones o tratamiento contable definitivo;
- instalar sensores, GPS o dispositivos;
- modificar estados de pedidos, remisiones o inventario;
- crear tablas, RPC, Edge Functions, webhooks, colas o migraciones;
- definir indicadores definitivos, reservados para `CAP-SCOPE-017`;
- autorizar operaciones de contingencia o cambios físicos.

---

#### 6. Principios canónicos

##### 6.1. Configuración de abastecimiento y ruta física son diferentes

Una regla que indica desde qué sede o LOC se abastece un producto orienta preparación. No representa vehículo, conductor, secuencia de paradas ni ejecución real.

##### 6.2. Necesidad, plan y viaje serán entidades diferentes

La necesidad expresa demanda; el plan organiza; el viaje registra la ejecución. Cada revisión conservará origen y versión.

##### 6.3. La ruta será versionada y publicable

Cambiar secuencia o ventana después de publicar generará una revisión autorizada. El conductor verá la versión vigente y la historia permanecerá.

##### 6.4. Vehículo, conductor y custodia no serán equivalentes

Asignar recursos no transfiere automáticamente la responsabilidad física. La custodia comenzará mediante aceptación explícita de la carga.

##### 6.5. La carga tendrá manifiesto

Cada viaje conservará bultos, LPN, contenedores, remisiones, pedidos, cantidades, condición, compatibilidad y orden de descarga.

##### 6.6. NEXO gobernará la logística interna

NEXO será propietario de rutas internas, carga, custodia, remisiones, vehículos referenciados, viajes y recepción entre lugares.

##### 6.7. PULSO gobernará el cumplimiento del pedido de cliente

PULSO conservará promesa, despacho comercial, intento, entrega, novedad y resultado. No administrará mantenimiento ni inventario físico por duplicado.

##### 6.8. PASS será superficie de seguimiento

PASS mostrará estado, comunicación y PIN permitido. No podrá marcar entrega, reasignar tercero ni cambiar custodia fuera del contrato.

##### 6.9. Entrega y recepción serán estados independientes

Una entrega puede ocurrir antes de la inspección o aceptación completa. La recepción preservará cantidades, condición y diferencias.

##### 6.10. El PIN prueba una interacción, no toda la condición

El PIN puede confirmar presencia y entrega al destinatario, pero no elimina la necesidad de registrar faltantes, daño, rechazo o aceptación parcial.

##### 6.11. El combustible pertenece al dominio de flota

La ruta podrá recibir una atribución calculada o validada, pero no convertirá el viaje en fuente de compra, carga o medidor del vehículo.

##### 6.12. Los terceros tendrán acceso temporal y mínimo

Un mensajero externo no necesitará cuenta laboral ni acceso a Supabase. Recibirá únicamente la asignación necesaria mediante token limitado y revocable.

##### 6.13. La ubicación se tratará como dato sensible

No se impondrá tracking continuo por defecto. Se definirá finalidad, precisión, frecuencia, retención, visibilidad y contingencia.

##### 6.14. Toda novedad conservará impacto y resolución

Una incidencia no se resolverá cambiando el estado final. Se registrará causa, severidad, carga afectada, responsable, acción y resultado.

##### 6.15. El recorrido se cerrará por conciliación

No bastará completar todas las paradas visualmente. Deberán reconciliarse carga, entregas, devoluciones, custodias, documentos y pendientes.

---

#### 7. Línea base verificable

##### 7.1. NEXO

La implementación actual contiene, con alcance parcial:

- solicitudes y remisiones entre sedes;
- preparación y cantidades despachables;
- selección de origen, LOC y existencias;
- envíos físicos vinculados con remisiones;
- vista de conductor con cargas pendientes;
- confirmación de salida;
- tablero de tránsito;
- recepción de envíos y remisiones;
- estados de preparado, tránsito, parcialidad y recepción;
- reglas de autorización por sede, área, turno y actor;
- configuraciones llamadas rutas de fulfillment o abastecimiento por producto.

##### 7.2. PULSO y PASS

La implementación actual contiene:

- tracking persistente de pedidos;
- estado visible en tiempo real;
- sesión de entrega;
- PIN de confirmación;
- portal temporal para domiciliarios externos;
- registro de novedades;
- bloqueo de entrega normal cuando aplica PIN;
- override administrativo con permiso;
- tarjeta de pedido activo y deep links.

##### 7.3. Limitaciones comprobables

No se ha demostrado de extremo a extremo:

- consolidación de necesidades de transporte;
- planificación diaria o por ventana;
- optimización o priorización de recorridos;
- asignación integral de vehículo y conductor;
- manifiesto y plan de carga;
- aceptación bilateral de custodia;
- viaje con paradas y revisiones;
- logística inversa;
- cierre y conciliación del recorrido;
- integración económica de transporte;
- gobierno completo de terceros;
- política de ubicación y privacidad;
- operación offline certificada.

---

#### 8. Clasificación de cobertura

| Capacidad   | Nombre                                    | Tratamiento         | Propiedad                                                            | Decisión                                                                                                                                                                                                                   |
| ----------- | ----------------------------------------- | ------------------- | -------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `CAP-11.01` | Planear necesidades de transporte         | `BUILD`             | NEXO con señales de PULSO, FOGO, ORIGO y remisiones                  | Crear una bandeja consolidada de necesidades con origen, destino, ventana, carga, prioridad, restricciones y fuente; una necesidad no será todavía una ruta ni un despacho.                                                |
| `CAP-11.02` | Definir recorridos y prioridades          | `BUILD`             | NEXO                                                                 | Crear planes de ruta versionados con paradas, secuencia, ventanas, prioridades, restricciones, capacidad y criterio de publicación. Las rutas de abastecimiento de producto existentes no equivalen a itinerarios físicos. |
| `CAP-11.03` | Asignar vehículo y responsable            | `BUILD`             | NEXO                                                                 | Crear asignaciones vigentes de vehículo, conductor y apoyos, validando disponibilidad, documentos, capacidad, turno, conflicto de agenda y aceptación.                                                                     |
| `CAP-11.04` | Preparar carga                            | `REUSE_OR_REFACTOR` | NEXO                                                                 | Conservar preparación de remisiones, picks, LOC, LPN y envíos físicos; añadir plan de carga, compatibilidad, capacidad, orden de descarga, sellos y relación con ruta.                                                     |
| `CAP-11.05` | Confirmar cantidades y condición al salir | `REUSE_OR_REFACTOR` | NEXO                                                                 | Conservar contraste de cantidades preparadas y despacho; exigir manifiesto, condición, temperatura cuando aplique, bultos, LPN, evidencia, diferencias y aceptación de salida.                                             |
| `CAP-11.06` | Transferir custodia para transporte       | `REUSE_OR_REFACTOR` | NEXO                                                                 | Formalizar la aceptación explícita por conductor o tercero, con alcance, tiempo, carga, sellos, estado y controversia; despachar no será una asignación implícita de custodia.                                             |
| `CAP-11.07` | Ejecutar recorrido                        | `REUSE_OR_REFACTOR` | NEXO para traslado interno y PULSO para entrega de pedido            | Reutilizar tránsito, vista del conductor y tracking; incorporar viaje, paradas, llegada, inicio de servicio, salida, desvío, pausa, reordenamiento autorizado y contingencia.                                              |
| `CAP-11.08` | Registrar novedades durante transporte    | `REUSE_OR_REFACTOR` | NEXO o PULSO según el objeto transportado                            | Conservar novedades de remisión y entrega; normalizar tipo, severidad, ubicación aproximada, evidencia, carga afectada, acción, escalamiento y efecto sobre promesa.                                                       |
| `CAP-11.09` | Entregar y confirmar recepción            | `REUSE_OR_REFACTOR` | NEXO para sedes y PULSO/PASS para cliente                            | Conservar recepción de remisiones y confirmación por PIN; separar entrega física, prueba, aceptación del destinatario, recepción de inventario y finalización del pedido.                                                  |
| `CAP-11.10` | Gestionar faltantes, daños y devoluciones | `REUSE_OR_REFACTOR` | NEXO coordinando PULSO, PASS y NUMERA                                | Conservar diferencias y novedades; crear decisión de aceptación parcial, rechazo, retorno, reclamación, compensación y efecto físico/económico sin borrar el envío original.                                               |
| `CAP-11.11` | Cerrar y revisar el recorrido             | `BUILD`             | NEXO                                                                 | Crear cierre del viaje con paradas, entregas, devoluciones, bultos, LPN, custodias, kilometraje, combustible atribuible, peajes, incidencias, documentos y pendientes.                                                     |
| `CAP-11.12` | Gestionar entregas mediante terceros      | `REUSE_OR_REFACTOR` | PULSO con portal y adaptadores; NEXO cuando transporte carga interna | Conservar portal temporal, PIN, tracking y referencias; completar proveedor, servicio, asignación, token temporal, aceptación, intento, evidencia, liquidación, incidencia, privacidad y retiro de acceso.                 |

---

#### 9. Resumen de tratamientos

| Tratamiento         | Cantidad |
| ------------------- | -------: |
| `REUSE_OR_REFACTOR` |        8 |
| `BUILD`             |        4 |
| **Total**           |   **12** |

La clasificación conserva la inversión existente sin confundir infraestructura parcial con un proceso empresarial cerrado.

---

#### 10. Propiedad funcional

| Dominio o aplicación          | Responsabilidad                                                                                                                                                         |
| ----------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| NEXO                          | operación logística interna, necesidades, planes de ruta, viajes, paradas, asignaciones, carga, custodia, remisiones, flota referenciada, novedades, recepción y cierre |
| PULSO                         | cumplimiento del pedido de cliente, promesa, modalidad, despacho comercial, entrega, intento, novedad, resultado y coordinación con tercero                             |
| PASS                          | seguimiento visible al cliente, PIN o mecanismo de confirmación, comunicaciones y presentación de novedades; no asigna vehículos ni modifica custodia                   |
| FOGO                          | disponibilidad y fecha de salida del producto producido; no planifica rutas ni confirma entregas                                                                        |
| ORIGO                         | entregas de proveedor, contratación de transportista o servicio externo y condiciones comerciales; no registra recepción física por duplicado                           |
| NUMERA                        | costos, anticipos, liquidaciones, combustible, peajes, devoluciones y efectos económicos; no modifica el recorrido                                                      |
| ANIMA / VISO                  | turno, disponibilidad laboral y asignación administrativa del trabajador; no sustituyen la asignación logística de una operación                                        |
| Proveedor o mensajero externo | ejecuta únicamente la entrega asignada mediante contrato y credencial temporal; no accede directamente a Supabase                                                       |
| SHELL / Supabase              | contratos, autorización, eventos, integridad, auditoría, tokens temporales, colas, idempotencia y migraciones                                                           |

---

#### 11. Fuentes de verdad objetivo

| Objeto                        | Fuente objetivo                                                  | Regla                                                                                                     |
| ----------------------------- | ---------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------- |
| Necesidad de transporte       | registro canónico de necesidad logística                         | se deriva de remisión, pedido, compra, producción, devolución o traslado; no es ruta ni viaje             |
| Plan de ruta                  | NEXO                                                             | versión publicada con paradas, secuencia, ventanas, restricciones y responsable de publicación            |
| Viaje o recorrido ejecutado   | NEXO                                                             | instancia inmutable de ejecución vinculada al plan publicado y a sus revisiones autorizadas               |
| Vehículo y disponibilidad     | NEXO dominio de activos y flota                                  | identidad y condición desde `CAP-SCOPE-007`; la operación logística solo referencia la asignación vigente |
| Turno y aptitud del conductor | VISO/ANIMA + contexto de autorización                            | la asignación logística consume disponibilidad; no crea turno                                             |
| Remisión y envío interno      | NEXO                                                             | conserva origen, destino, líneas y efectos físicos                                                        |
| Pedido de cliente             | PULSO                                                            | conserva modalidad, promesa y resultado comercial                                                         |
| Seguimiento y PIN del cliente | PASS consumiendo contrato compartido                             | no se convierte en fuente alternativa de entrega                                                          |
| Prueba de entrega             | expediente de logística compartido con propietario según destino | firma, PIN, foto autorizada, nombre, sello o confirmación según política                                  |
| Combustible y kilometraje     | NEXO flota; efecto económico en NUMERA                           | compra, carga, lectura y consumo estimado son hechos distintos                                            |
| Entrega de tercero            | PULSO o NEXO según objeto + adaptador externo                    | payload, proveedor, referencia, estados, evidencia y conciliación                                         |
| Documentos y evidencia        | servicios transversales E4                                       | manifiesto, hoja de ruta, etiqueta, comprobante, foto y adjuntos con retención y acceso mínimo            |

---

#### 12. Modelo conceptual logístico

```text
NECESIDAD DE TRANSPORTE
        ↓ planificación
PLAN DE RUTA + VERSIÓN
        ↓ publicación
ASIGNACIÓN DE RECURSOS
        ↓ preparación
PLAN Y MANIFIESTO DE CARGA
        ↓ aceptación
CUSTODIA
        ↓ salida
VIAJE
        ├── PARADA 1
        ├── PARADA 2
        └── PARADA N
                ↓
ENTREGA / RECEPCIÓN / NOVEDAD / RETORNO
        ↓
CIERRE Y CONCILIACIÓN
```

Una operación logística podrá agrupar múltiples remisiones o pedidos, pero cada resultado permanecerá trazable hasta su objeto de origen.

---

#### 13. Necesidades de transporte

Cada necesidad conservará como mínimo:

- tipo de origen: remisión, pedido, compra, producción, devolución, activo o traslado;
- identificador del objeto origen;
- sede, LOC o dirección de origen;
- sede, LOC o destinatario de destino;
- ventana mínima y máxima;
- prioridad y causa;
- carga prevista, peso, volumen y bultos cuando se conozcan;
- requisitos de frío, fragilidad, inocuidad, seguridad o vehículo;
- estado y responsable de validación;
- posibilidad de consolidación;
- restricciones o bloqueo.

No se creará una ruta aprobada directamente desde una señal sin revisión.

---

#### 14. Plan de ruta, viaje y parada

##### 14.1. Plan de ruta

Define la intención publicada: fecha, vehículo requerido, secuencia, ventanas, prioridades, restricciones y tiempos estimados.

##### 14.2. Viaje

Es la ejecución real de una versión publicada. Conserva salida, retorno, actor, vehículo, lecturas, cambios y resultado.

##### 14.3. Parada

Es una unidad independiente de servicio. Conserva destino, orden, ventana, llegada, salida, objetos a entregar o recoger, destinatario, estado, evidencia y novedad.

##### 14.4. Revisión

Un cambio posterior a publicación no sobrescribirá el plan. Deberá indicar motivo, actor, momento, diferencias y comunicación al conductor y destinos afectados.

---

#### 15. Priorización y capacidad

La prioridad no dependerá solo del orden de creación. Podrá considerar:

- ventana comprometida;
- producto crítico o perecedero;
- continuidad de una sede;
- pedido de cliente;
- cadena de frío;
- disponibilidad de producción;
- riesgo de vencimiento;
- volumen, peso y compatibilidad;
- regreso de reutilizables;
- costo y distancia;
- contingencia activa;
- autorización gerencial documentada.

La automatización futura deberá ser explicable y permitirá override con motivo. Esta tarea no selecciona algoritmo ni proveedor de mapas.

---

#### 16. Asignación de vehículo, conductor y apoyos

La asignación verificará:

- vehículo disponible y no bloqueado;
- capacidad y restricciones compatibles;
- documentos y seguros vigentes cuando apliquen;
- mantenimiento, condición y combustible suficiente según política;
- turno y contexto operativo del conductor;
- licencia o habilitación necesaria;
- conflicto con otras asignaciones;
- punto y momento de recogida del vehículo;
- apoyos de carga o descarga;
- aceptación del responsable;
- alternativa y sustitución.

El conductor no obtendrá acceso global a rutas, sedes, inventarios o clientes por estar asignado a un viaje.

---

#### 17. Preparación y plan de carga

La preparación deberá separar:

```text
CONTENIDO SOLICITADO
≠ CONTENIDO PREPARADO
≠ CONTENIDO CARGADO
≠ CONTENIDO DESPACHADO
```

El plan de carga incluirá:

- remisiones, pedidos y recogidas;
- líneas y cantidades;
- LPN, bultos y contenedores;
- peso, volumen y capacidad;
- compatibilidad y segregación;
- frío y temperatura objetivo;
- fragilidad y orientación;
- sellos o cierres;
- orden de descarga por parada;
- elementos retornables;
- diferencias y bloqueos;
- evidencia requerida.

Mover un LPN moverá su contenido según `CAP-SCOPE-006`; no se duplicará como stock suelto.

---

#### 18. Confirmación de salida y manifiesto

Antes de salir deberá existir una confirmación verificable de:

- vehículo y conductor correctos;
- plan o revisión vigente;
- carga real;
- cantidades y unidades;
- bultos, LPN y sellos;
- condición y temperatura cuando aplique;
- documentos y etiquetas;
- diferencias aceptadas o bloqueantes;
- hora y lugar;
- actor de origen;
- actor que acepta custodia.

Una impresión o fotografía será evidencia, no la fuente exclusiva del estado.

---

#### 19. Transferencia de custodia

La cadena mínima será:

```text
CUSTODIO DE ORIGEN
        ↓ entrega documentada
CONDUCTOR O TERCERO
        ↓ entrega documentada
RECEPTOR DE DESTINO
```

Cada transferencia conservará objeto, alcance, cantidad, condición, actor que entrega, actor que acepta, tiempo, ubicación, evidencia y controversia. Si el receptor rechaza o difiere, la custodia no se cerrará silenciosamente.

---

#### 20. Ejes de estado independientes

| Eje                 | Estados de referencia                                                                              | Qué representa                             |
| ------------------- | -------------------------------------------------------------------------------------------------- | ------------------------------------------ |
| Necesidad logística | `draft`, `validated`, `planned`, `cancelled`, `expired`                                            | demanda de transporte todavía no ejecutada |
| Plan de ruta        | `draft`, `published`, `superseded`, `cancelled`                                                    | itinerario versionado y publicable         |
| Asignación          | `proposed`, `confirmed`, `rejected`, `replaced`, `released`                                        | vehículo, conductor y apoyos               |
| Carga               | `planning`, `picking`, `prepared`, `loaded`, `sealed`, `blocked`                                   | contenido físico antes de salida           |
| Custodia            | `pending`, `accepted`, `transferred`, `disputed`, `closed`                                         | responsabilidad física vigente             |
| Viaje               | `planned`, `ready`, `departed`, `in_progress`, `paused`, `completed`, `cancelled`                  | ejecución del recorrido                    |
| Parada              | `planned`, `arrived`, `servicing`, `completed`, `failed`, `skipped`, `rescheduled`                 | resultado por destino                      |
| Entrega             | `pending`, `attempted`, `partially_delivered`, `delivered`, `rejected`, `returned`                 | transferencia al destinatario              |
| Recepción           | `pending`, `confirmed`, `partial`, `disputed`, `rejected`                                          | aceptación y efecto en destino             |
| Tercero             | `requested`, `assigned`, `accepted`, `picked_up`, `in_transit`, `delivered`, `failed`, `cancelled` | ejecución delegada                         |

Los valores exactos se congelarán en E2/E3. La regla aprobable es que estos ejes no se fusionen en un único campo.

---

#### 21. Ejecución del recorrido

El conductor o ejecutor verá únicamente:

- viaje asignado;
- versión vigente;
- vehículo;
- paradas y secuencia;
- ventanas e instrucciones mínimas;
- carga relacionada;
- contactos mínimos autorizados;
- acciones disponibles según estado;
- novedades y contingencias;
- pendientes de custodia.

El sistema permitirá registrar salida, llegada, inicio de atención, finalización, pausa, desvío, reordenamiento autorizado y retorno. No exigirá escribir mientras se conduce ni diseñará interacciones inseguras.

---

#### 22. Novedades y contingencias

La taxonomía mínima contemplará:

- vehículo indisponible o avería;
- conductor indisponible;
- retraso;
- dirección incorrecta;
- acceso bloqueado;
- destinatario ausente;
- rechazo;
- faltante;
- daño;
- temperatura o condición fuera de rango;
- sello roto;
- carga equivocada;
- accidente o incidente de seguridad;
- fallo de red o dispositivo;
- tercero no responde;
- otra causa controlada.

La novedad no marcará automáticamente entrega, cancelación ni ajuste. Producirá acción, escalamiento, comunicación y resultado trazables.

---

#### 23. Entrega y recepción

##### 23.1. Entrega interna entre sedes

NEXO registrará transferencia al receptor, cantidades, condición, diferencias y recepción física. El movimiento de inventario se aplicará mediante contrato idempotente.

##### 23.2. Entrega a cliente

PULSO conservará intento, destinatario, mecanismo de confirmación, evidencia, novedad y resultado. PASS mostrará la información permitida.

##### 23.3. Confirmación por PIN

El PIN:

- pertenecerá al destinatario;
- aparecerá según estado permitido;
- tendrá vigencia e intentos limitados;
- no se expondrá anticipadamente al mensajero;
- no reemplazará el registro de diferencias;
- tendrá contingencia y override con permiso y motivo.

##### 23.4. Recepción parcial o disputada

La observación original se conservará. La resolución posterior podrá generar aceptación, devolución, movimiento compensatorio, reclamo o efecto económico, sin editar la entrega original.

---

#### 24. Faltantes, daños, rechazo y logística inversa

Cada diferencia deberá distinguir:

- cantidad no cargada en origen;
- faltante detectado en tránsito;
- faltante en destino;
- daño previo, durante transporte o al recibir;
- rechazo total o parcial;
- devolución inmediata;
- recogida posterior;
- retorno de reutilizables;
- producto en cuarentena;
- pérdida confirmada;
- compensación al cliente;
- reclamación al tercero.

La devolución generará una operación inversa o parada de retorno cuando exista traslado físico. No se resolverá únicamente con un estado comercial.

---

#### 25. Vehículos, kilometraje y combustible

`CAP-SCOPE-011` consume las decisiones de `CAP-SCOPE-007` y no reabre la identidad de flota.

La relación objetivo será:

```text
VEHÍCULO Y MEDIDORES
→ NEXO DOMINIO DE FLOTA

ASIGNACIÓN Y VIAJE
→ NEXO DOMINIO LOGÍSTICO

COMPRA / CARGA DE COMBUSTIBLE
→ NEXO + SOPORTE DE ORIGO CUANDO APLIQUE

COSTO Y CONCILIACIÓN
→ NUMERA
```

El viaje conservará lectura inicial y final cuando aplique. El consumo podrá calcularse o asignarse posteriormente, pero nunca se inventará como lectura física.

---

#### 26. Entregas mediante terceros

El contrato mínimo de tercero incluirá:

- proveedor o tipo de mensajero;
- servicio solicitado;
- referencia externa;
- pedido, remisión o carga asignados;
- identidad mínima del ejecutor cuando sea conocida;
- token temporal por asignación;
- aceptación o rechazo;
- recogida;
- estados e intentos;
- evidencia;
- novedad;
- liquidación o costo;
- cancelación;
- expiración y revocación de acceso;
- payload original e idempotencia si existe API o webhook.

El tercero no escribirá directamente en tablas internas ni recibirá datos financieros, históricos o personales innecesarios.

---

#### 27. Datos personales y ubicación

Los datos visibles para conductor o tercero se limitarán a la operación asignada. Dirección, teléfono, referencias, nombre, PIN y evidencia tendrán políticas específicas de acceso y retención.

La geolocalización continua no se aprueba en esta tarea. E2 deberá decidir, con necesidad comprobada:

- si se requiere ubicación;
- precisión;
- frecuencia;
- inicio y fin;
- quién puede verla;
- cuánto se conserva;
- qué ocurre sin permiso o sin señal;
- cómo se evita vigilancia fuera del turno o viaje.

---

#### 28. Documentos, etiquetas y evidencia

Podrán existir:

- plan o hoja de ruta;
- manifiesto de carga;
- remisión;
- etiquetas de bulto, LPN o contenedor;
- comprobante de salida;
- prueba de entrega;
- registro de temperatura;
- fotografía autorizada;
- firma o sello;
- documento del tercero;
- comprobante de peaje o combustible;
- acta de diferencia o devolución.

Cada documento tendrá identidad, versión, relación con la operación, actor, fecha, estado y política de retención. Reimprimir no recreará viaje, entrega ni custodia.

---

#### 29. Operación offline, reintentos y orden de eventos

Las acciones críticas usarán identidad de evento y estado previo esperado. El diseño cubrirá:

- salida registrada sin confirmación de respuesta;
- entrega enviada dos veces;
- PIN validado con red inestable;
- recepción posterior a una entrega parcial;
- novedad fuera de orden;
- cambio de ruta mientras el dispositivo está offline;
- tercero que reintenta webhook;
- sincronización posterior al cierre;
- conflicto entre dos receptores;
- pérdida o sustitución del dispositivo.

La interfaz mostrará pendiente de sincronización y no representará como confirmado un resultado que el servidor todavía no aceptó.

---

#### 30. Cierre y conciliación del recorrido

El cierre verificará:

- todas las paradas con resultado;
- remisiones y pedidos correlacionados;
- bultos, LPN y contenedores entregados o retornados;
- custodias cerradas o disputadas;
- diferencias y devoluciones;
- kilometraje o medidor;
- combustible y peajes informados;
- documentos y evidencia;
- tercero y liquidación cuando aplique;
- comunicaciones pendientes;
- efectos de inventario, pedido y finanzas;
- incidencias abiertas;
- vehículo devuelto y disponibilidad posterior.

El cierre podrá quedar `CON_PENDIENTES`, pero esos pendientes tendrán dueño y no desaparecerán del tablero.

---

#### 31. Preguntas existentes reutilizadas

No se crean preguntas nuevas.

| Identificador       | Información                                                                 | Uso                                                                                                                 |
| ------------------- | --------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------- |
| `ACT-01` a `ACT-06` | Vehículos, identificación, titular, custodia, disponibilidad y alternativa. | Alimentan flota y contingencia. El estado vigente se toma del registro consolidado; no se vuelven a preguntar aquí. |
| `ACT-07` y `ACT-08` | Cantidad y ubicación de canastas de transporte.                             | Alimentan capacidad, custodia y retorno de reutilizables.                                                           |
| `DAT-08` a `DAT-10` | Historia de solicitudes, despachos y recepciones de remisiones.             | Alimentan migración y línea base de cumplimiento; no bloquean la decisión de cobertura.                             |
| `DAT-20` y `DAT-21` | Documento que acompaña Vaila y registro de entrega al cliente.              | Alimentan entregas mediante terceros y evidencia histórica.                                                         |
| `COM-01` y `COM-02` | Origen del inventario y lugar de empaque de Vaila Vainilla.                 | Alimentan origen, preparación, carga y operación de entrega.                                                        |
| `OPE-04`            | Autoridad para modificar una solicitud de remisión.                         | Alimenta revisiones antes de planificación y carga.                                                                 |

Las respuestas ya entregadas se consolidarán en lote en el registro vivo. Esta tarea no modifica sus estados ni reabre documentos aprobados automáticamente.

---

#### 32. Hallazgos y destinos

| ID                  | Hallazgo                                                                                                                                                           | Severidad | Tarea propietaria                                                                                 | Momento  |
| ------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------ | --------- | ------------------------------------------------------------------------------------------------- | -------- |
| H-CAP-SCOPE-011-001 | No existe una bandeja canónica consolidada de necesidades de transporte procedentes de remisiones, pedidos, compras, producción y devoluciones.                    | crítica   | `OPS-LOG-001`; `NEXO-UX-001`; `NEXO-UX-007`; `CAP-SCOPE-012`                                      | E2       |
| H-CAP-SCOPE-011-002 | Las rutas de abastecimiento o fulfillment por producto existentes pueden confundirse con un recorrido físico de vehículo.                                          | crítica   | `OPS-LOG-001`; `NEXO-UX-001`; `NEXO-UX-008`; `NEXO-UX-011`                                        | E2/E3    |
| H-CAP-SCOPE-011-003 | No se ha demostrado un plan de ruta versionado con paradas, secuencia, ventanas, publicación y revisiones.                                                         | crítica   | `OPS-LOG-001`; `NEXO-UX-005`; `NEXO-UX-007`; `NEXO-UX-011` a `NEXO-UX-013`                        | E2       |
| H-CAP-SCOPE-011-004 | Capacidad, peso, volumen, frío, compatibilidad y orden de descarga no están reconciliados en un plan de carga integral.                                            | crítica   | `OPS-LOG-001`; `NEXO-DOM-024`; `NEXO-UX-010`; `NEXO-UX-027`; `CAP-SCOPE-013`                      | E2/E3    |
| H-CAP-SCOPE-011-005 | La asignación de vehículo, conductor y apoyos no tiene ciclo integral de propuesta, validación, aceptación, reemplazo y liberación.                                | crítica   | `NEXO-DOM-027`; `NEXO-UX-005`; `NEXO-UX-007`; `OPS-LOG-001`; `CAP-SCOPE-002`                      | E2       |
| H-CAP-SCOPE-011-006 | Disponibilidad del vehículo, mantenimiento, documentos, restricciones y conflictos de agenda todavía no bloquean de forma demostrada una asignación logística.     | crítica   | `NEXO-DOM-026`; `NEXO-DOM-027`; `NEXO-AUTH-024` a `NEXO-AUTH-030`; `CAP-SCOPE-013`                | E2/E3    |
| H-CAP-SCOPE-011-007 | Compra de combustible, carga, lectura y consumo atribuible a viaje siguen requiriendo conciliación sin convertir el recorrido en fuente de flota.                  | alta      | `NEXO-DOM-027`; `NEXO-DOM-028`; `CAP-SCOPE-012`; `CAP-SCOPE-017`                                  | E2/E3    |
| H-CAP-SCOPE-011-008 | La preparación existente de remisiones y envíos físicos necesita consolidarse en manifiesto de carga y relación explícita con ruta, viaje y parada.                | crítica   | `NEXO-UX-010`; `NEXO-UX-011`; `OPS-LOG-001`                                                       | E2/E5    |
| H-CAP-SCOPE-011-009 | Preparado, cargado, validado, despachado y en tránsito pueden colapsarse en estados insuficientemente diferenciados.                                               | crítica   | `NEXO-UX-010` a `NEXO-UX-013`; `NEXO-AUTH-006` a `NEXO-AUTH-010`                                  | E2/E3    |
| H-CAP-SCOPE-011-010 | La confirmación de cantidades, condición, sellos, LPN y temperatura al salir no está probada como aceptación bilateral completa.                                   | crítica   | `NEXO-UX-010` a `NEXO-UX-012`; `NEXO-DOM-017`; `CAP-SCOPE-006`                                    | E2/E5    |
| H-CAP-SCOPE-011-011 | Despachar una remisión no demuestra por sí solo transferencia explícita de custodia al conductor o tercero.                                                        | crítica   | `NEXO-DOM-008`; `NEXO-DOM-017`; `NEXO-AUTH-008`; `NEXO-AUTH-025`; `OPS-LOG-001`                   | E2/E3    |
| H-CAP-SCOPE-011-012 | Carga, LPN, contenedor físico, bulto, remisión y vehículo requieren relaciones sin doble contabilización ni identidad intercambiable.                              | crítica   | `NEXO-DOM-002` a `NEXO-DOM-007`; `NEXO-DOM-019` a `NEXO-DOM-024`; `CAP-SCOPE-006`                 | E2/E3    |
| H-CAP-SCOPE-011-013 | La vista de conductor y tránsito existente no demuestra un itinerario completo con paradas, llegada, servicio, salida, reordenamiento y contingencia.              | alta      | `NEXO-UX-005`; `NEXO-UX-012`; `OPS-LOG-001`                                                       | E2/E5    |
| H-CAP-SCOPE-011-014 | Un viaje puede agrupar varias remisiones o pedidos, pero el contrato de consolidación y separación de resultados no está cerrado.                                  | crítica   | `OPS-LOG-001`; `NEXO-UX-011` a `NEXO-UX-013`; `PULSO-UX-007`; `PULSO-UX-019`                      | E2/E3    |
| H-CAP-SCOPE-011-015 | Las novedades de transporte requieren taxonomía, severidad, carga afectada, escalamiento, resolución y efecto sobre promesa.                                       | crítica   | `NEXO-UX-022`; `PULSO-UX-009`; `PASS-UX-010`; `OPS-LOG-001`                                       | E2       |
| H-CAP-SCOPE-011-016 | No debe asumirse que seguimiento en tiempo real exige geolocalización continua; finalidad, precisión, retención y consentimiento laboral están por definir.        | crítica   | `CAP-SCOPE-002`; `CAP-SCOPE-016`; `AUTH-SRV-004` a `AUTH-SRV-018`; `OPS-LOG-001`                  | E2/E3    |
| H-CAP-SCOPE-011-017 | Entrega física, prueba de entrega, aceptación del destinatario, recepción de inventario y finalización del pedido todavía pueden confundirse.                      | crítica   | `NEXO-UX-013`; `PULSO-UX-007`; `PULSO-UX-018`; `OPS-LOG-001`                                      | E2/E3    |
| H-CAP-SCOPE-011-018 | La recepción parcial, diferencias y rechazo en destino requieren conservar observación original, autoridad y resolución posterior.                                 | crítica   | `NEXO-UX-013`; `NEXO-UX-022`; `NEXO-AUTH-010`; `CAP-SCOPE-006`                                    | E2/E5    |
| H-CAP-SCOPE-011-019 | Faltantes, daño, temperatura, pérdida y devolución necesitan logística inversa y efectos físicos/económicos correlacionados.                                       | crítica   | `NEXO-UX-022`; `CAP-SCOPE-006`; `CAP-SCOPE-010`; `CAP-SCOPE-012`; `CAP-SCOPE-013`                 | E2/E3    |
| H-CAP-SCOPE-011-020 | No existe cierre integral demostrado del recorrido con devoluciones, custodias, kilometraje, combustible, documentos y pendientes.                                 | crítica   | `OPS-LOG-001`; `NEXO-UX-007`; `NEXO-DOM-027`; `CAP-SCOPE-012`; `CAP-SCOPE-017`                    | E2/E5    |
| H-CAP-SCOPE-011-021 | El flujo de entrega por PIN y tracking está implementado parcialmente, pero debe integrarse al contrato canónico de logística y no quedar como subsistema aislado. | crítica   | `PULSO-UX-007`; `PULSO-UX-018`; `PASS-UX-006`; `PASS-UX-010`; `OPS-LOG-001`                       | E2/E3    |
| H-CAP-SCOPE-011-022 | El portal temporal para domiciliarios externos requiere gobierno de proveedor, asignación, token, expiración, revocación y acceso mínimo.                          | crítica   | `INT-EXT-001` a `INT-EXT-020`; `PULSO-AUTH-001` a `PULSO-AUTH-016`; `CAP-SCOPE-016`               | E2/E3    |
| H-CAP-SCOPE-011-023 | PIN, intentos fallidos, expiración y override gerencial requieren prueba de seguridad, no repudio y contingencia.                                                  | crítica   | `PULSO-AUTH-007` a `PULSO-AUTH-016`; `PASS-QA-001`; `PASS-QA-002`; `AUTH-QA-020` a `AUTH-QA-024`  | E3/E5    |
| H-CAP-SCOPE-011-024 | Los datos de dirección, teléfono, instrucciones y evidencia del cliente deben minimizarse para conductor y tercero.                                                | crítica   | `CAP-SCOPE-010`; `CAP-SCOPE-016`; `PASS-INT-004`; `PULSO-AUTH-011` a `PULSO-AUTH-014`             | E2/E3    |
| H-CAP-SCOPE-011-025 | Operación offline, reintentos y eventos fuera de orden pueden duplicar salida, entrega, recepción, devolución o notificación.                                      | crítica   | `INT-APP-004` a `INT-APP-009`; `QUEUE-ARC-001` a `QUEUE-ARC-010`; `CODE-AUD-018`; `CAP-SCOPE-018` | E3/E5    |
| H-CAP-SCOPE-011-026 | Peajes, combustible, servicios de tercero, devoluciones y costos por ruta todavía no tienen conciliación económica cerrada.                                        | alta      | `CAP-SCOPE-012`; `NEXO-DOM-028`; `INT-APP-001` a `INT-APP-010`                                    | E2/E3    |
| H-CAP-SCOPE-011-027 | Cadena de frío y condición durante transporte requieren controles, dispositivos, evidencia y decisión ante excursión.                                              | crítica   | `CAP-SCOPE-006`; `CAP-SCOPE-008`; `CAP-SCOPE-013`; `CAP-SCOPE-015`; `OPS-LOG-001`                 | E2/E4    |
| H-CAP-SCOPE-011-028 | No existen métricas canónicas de puntualidad, primera entrega, utilización, diferencias, devoluciones, incidencias y costo por recorrido.                          | alta      | `CAP-SCOPE-017`; `NEXO-UX-025`; `NEXO-UX-041`; `OPS-LOG-001`                                      | E2/E5    |
| H-CAP-SCOPE-011-029 | La contingencia por vehículo, conductor, red, dispositivo, frío o tercero indisponible debe preservar custodia y continuidad.                                      | crítica   | `CAP-SCOPE-015`; `CAP-SCOPE-018`; `NEXO-DOM-027`; `INT-EXT-018`; `OPS-LOG-001`                    | E2/E4/E5 |
| H-CAP-SCOPE-011-030 | La historia existente de remisiones, entregas y rutas puede ser parcial y no debe migrarse como completa sin calidad y trazabilidad.                               | alta      | `DAT-08` a `DAT-10`; `DAT-20`; `DAT-21`; `SUPA-TRANS-005` a `SUPA-TRANS-007`; `CAP-SCOPE-017`     | E1/E3    |

No queda ningún hallazgo narrativo sin identificador, tarea propietaria y momento de resolución.

---

#### 33. Riesgos y controles mínimos

| Riesgo                                 | Severidad | Control mínimo                                          |
| -------------------------------------- | --------- | ------------------------------------------------------- |
| ruta publicada con carga inviable      | crítica   | capacidad, compatibilidad, ventanas y validación previa |
| vehículo o conductor no disponible     | crítica   | bloqueos, conflictos, aceptación y reemplazo            |
| carga incompleta o equivocada          | crítica   | manifiesto, escaneo, diferencias y doble confirmación   |
| custodia ambigua                       | crítica   | aceptación explícita y cadena de transferencias         |
| salida o entrega duplicada             | crítica   | identidad estable e idempotencia                        |
| producto dañado o fuera de temperatura | crítica   | condición, sensores, cuarentena y decisión              |
| entrega marcada sin recepción          | crítica   | prueba, destinatario y estado independiente             |
| datos del cliente expuestos            | crítica   | proyección mínima, token temporal y expiración          |
| PIN abusado o compartido               | crítica   | intentos, expiración, rate limit y override auditado    |
| devolución sin retorno físico          | crítica   | logística inversa y conciliación                        |
| tercero sin revocación                 | crítica   | credencial temporal por asignación                      |
| costos de transporte irreconciliables  | alta      | eventos, documentos y conciliación con NUMERA           |
| recorrido cerrado con pendientes       | crítica   | checklist y bloqueos de cierre                          |
| pérdida de operación por falta de red  | crítica   | cola offline, reintentos y contingencia                 |
| tracking intrusivo                     | crítica   | finalidad, minimización y retención                     |

---

#### 34. Decisiones aprobables

1. NEXO será propietario de la logística interna y PULSO del cumplimiento de pedidos de cliente.
2. PASS será una superficie de seguimiento y confirmación permitida, no una fuente competidora.
3. Las rutas de fulfillment de producto no se interpretarán como recorridos físicos.
4. Necesidad, plan de ruta, viaje, parada, remisión, carga y entrega serán entidades distintas.
5. La ruta publicada será versionada y cualquier cambio posterior será auditable.
6. La asignación de vehículo y conductor validará disponibilidad y tendrá aceptación.
7. La custodia comenzará y terminará mediante transferencias explícitas.
8. Preparado, cargado, despachado, en tránsito, entregado y recibido serán estados independientes.
9. Entrega y recepción no producirán efectos duplicados por reintento.
10. El PIN no elimina faltantes, daño, aceptación parcial ni evidencia adicional.
11. La logística inversa conservará relación con el envío original.
12. El combustible permanecerá bajo flota y finanzas; la ruta solo recibirá atribución trazable.
13. Los terceros usarán acceso temporal, mínimo y revocable.
14. No se aprueba geolocalización continua por defecto.
15. El cierre reconciliará carga, custodias, resultados, retornos, documentos y efectos.

---

#### 35. Decisiones diferidas con dueño

| Decisión                                          | Dueño                             | Momento  |
| ------------------------------------------------- | --------------------------------- | -------- |
| algoritmo de planificación u optimización         | `OPS-LOG-001`                     | E2       |
| políticas de prioridad y override                 | `OPS-LOG-001` + Gerencia          | E2       |
| modelo físico de ruta, viaje, parada y asignación | arquitectura Supabase             | E3       |
| proveedor de mapas o geocodificación              | `CAP-SCOPE-015` + BLOQUE X        | E2/E3    |
| política de ubicación de trabajadores             | `CAP-SCOPE-002` + `CAP-SCOPE-016` | E2/E3    |
| sensores y cadena de frío en transporte           | `CAP-SCOPE-013` + `CAP-SCOPE-015` | E2/E4    |
| documentos e impresiones                          | BLOQUE E4                         | E4       |
| tarifas, peajes, combustible y liquidación        | `CAP-SCOPE-012`                   | E2/E3    |
| métricas y metas                                  | `CAP-SCOPE-017`                   | E2/E5    |
| contingencias y recuperación                      | `CAP-SCOPE-018`                   | E2/E4/E5 |
| proveedor externo y credenciales                  | `INT-EXT-001` a `INT-EXT-020`     | BLOQUE X |

---

#### 36. Requisitos de prueba generados

```text
TREQ-NEXO-016
TREQ-PULSO-007
TREQ-INTEGRATION-016
```

##### 36.1. `TREQ-NEXO-016`

Protege planificación logística interna, ruta, viaje, parada, asignación, carga, manifiesto, custodia, salida, tránsito, recepción, diferencias, retorno y cierre.

##### 36.2. `TREQ-PULSO-007`

Protege cumplimiento de pedidos de cliente, tracking, entrega, PIN, intentos, novedades, override, tercero y minimización de datos.

##### 36.3. `TREQ-INTEGRATION-016`

Protege la cadena completa entre demanda, remisión o pedido, NEXO, PULSO, PASS, flota, NUMERA y terceros, con eventos exactamente una vez y conciliación.

---

#### 37. Puertas de implementación

##### Puerta 1 — Procesos E2

- ejecutar `OPS-LOG-001`;
- aprobar actores, estados, excepciones y segregación;
- definir rutas internas y entregas de cliente;
- decidir política de terceros y ubicación.

##### Puerta 2 — Datos y arquitectura E3/E4

- congelar contratos de necesidad, plan, viaje, parada, asignación, carga, custodia, entrega e incidencia;
- definir idempotencia, colas, offline y conciliación;
- definir documentos, evidencia, impresión y notificaciones;
- definir privacidad, retención y acceso.

##### Puerta 3 — Implementación E5

- asignar paquetes NEXO, PULSO, PASS, SHELL y NUMERA;
- migrar sin reinterpretar rutas de fulfillment como viajes;
- validar rollback y convivencia;
- preparar datos y dispositivos de piloto.

##### Puerta 4 — Piloto y certificación

- ejecutar rutas internas controladas;
- ejecutar entrega a cliente con PIN y contingencia;
- probar tercero temporal;
- probar parcialidad, devolución, pérdida de red y reintentos;
- conciliar inventario, pedido, custodia y costos;
- cerrar hallazgos y regresiones.

---

#### 38. Criterios de aceptación

`CAP-SCOPE-011` podrá aprobarse cuando:

- las doce subcapacidades tengan tratamiento explícito;
- NEXO, PULSO, PASS, flota, NUMERA y terceros tengan fronteras claras;
- se distinga ruta de abastecimiento de recorrido físico;
- necesidad, plan, viaje, parada, carga, remisión y entrega no se fusionen;
- asignación y custodia tengan reglas independientes;
- entrega, recepción e inventario tengan estados y efectos separados;
- combustible y kilometraje respeten `CAP-SCOPE-007`;
- datos de cliente y ubicación tengan minimización;
- las preguntas existentes tengan uso sin duplicación;
- los 30 hallazgos tengan propietario y momento;
- los tres requisitos nuevos estén incorporados en un `04A` completo válido;
- no se haya autorizado implementación ni operación real.

---

#### 39. Resultado y continuidad

Al aprobarse esta tarea quedará definida la cobertura objetivo de logística, rutas, transporte y entregas, sin ejecutar todavía el diseño detallado ni la implementación.

La continuidad será exclusivamente:

```text
CAP-SCOPE-012
— Evaluar costos, gastos, presupuestos, tesorería, contabilidad e impuestos
```

`CAP-SCOPE-012` consumirá los eventos de combustible, peajes, terceros, devoluciones y costos de transporte aquí delimitados, sin reabrir la propiedad física de NEXO ni la propiedad comercial de PULSO.


### ✅ CAP-SCOPE-012 — Evaluar costos, gastos, presupuestos, tesorería, contabilidad e impuestos

**Estado:** APROBADA  
**Bloque:** E1 — Descubrimiento integral de operación, capacidades y cobertura de implementación  
**Dependencia cumplida:** `CAP-SCOPE-011` aprobada  
**Tarea anterior:** `CAP-SCOPE-011`  
**Siguiente tarea reservada:** `CAP-SCOPE-013`  
**Familia evaluada:** `CAP-12 — Gestionar dinero, costos y obligaciones`  
**Naturaleza:** decisión de cobertura empresarial y definición conceptual objetivo  
**Implementación técnica:** no autorizada  
**Migraciones o cambios en Supabase:** no autorizados  
**Movimientos financieros, recaudos, pagos, cierres, impuestos o actuaciones reales:** no autorizados  
**Decisión incorporada durante la elaboración:** la cartera y cuentas por cobrar serán capacidad obligatoria de NUMERA  
**Decisión adicional incorporada tras la aprobación:** el visor económico dinámico será una capacidad central de NUMERA, operará principalmente en una sola pantalla y utilizará divulgación progresiva en lugar de explicaciones permanentes  
**Requisitos de prueba generados:** `TREQ-NUMERA-002`, `TREQ-NUMERA-003`, `TREQ-NUMERA-004`, `TREQ-INTEGRATION-017`  
**Tareas nuevas derivadas:** `NUMERA-DOM-016`, `NUMERA-DOM-017`, `NUMERA-DOM-018`, `NUMERA-AUTH-014`, `NUMERA-AUTH-015`, `NUMERA-UX-026`, `NUMERA-UX-027`, `NUMERA-UX-028`  
**Actualización del registro de pruebas:** se entrega el archivo `04A` completo regenerado; quedan prohibidas las filas sueltas  

---

#### 1. Propósito

Definir el tratamiento objetivo de las capacidades mediante las cuales Vento Group deberá registrar, conciliar, analizar y gobernar dinero, costos y obligaciones sin convertir las aplicaciones operativas en sistemas financieros paralelos ni confundir inteligencia económico-operativa con contabilidad oficial.

La tarea debe permitir que NUMERA evolucione desde su base actual de centros de costo, gastos, presupuestos, punto de equilibrio y rentabilidad hacia una plataforma que incluya obligatoriamente cartera, cuentas por cobrar, cuentas por pagar, bancos, tesorería, conciliaciones, costos, cierres y reportes. Al mismo tiempo, deberá conservar un punto de extensión limpio para incorporar en el futuro contabilidad formal dentro de NUMERA o integrarla con un sistema externo.

La cobertura no autoriza movimientos reales. Define qué debe existir, quién será propietario, qué seguirá siendo externo, qué deberá construirse y qué condiciones impedirán doble registro o pérdida de trazabilidad.

---

#### 2. Pregunta de decisión

`CAP-SCOPE-012` responde:

```text
¿CÓMO DEBE VENTO GROUP CONVERTIR VENTAS, PAGOS, COMPRAS,
RECEPCIONES, INVENTARIO, PRODUCCIÓN, GASTOS, NÓMINA, ACTIVOS,
LOGÍSTICA Y OTROS HECHOS OPERATIVOS EN INFORMACIÓN ECONÓMICA,
CARTERA, OBLIGACIONES, TESORERÍA, COSTOS, PRESUPUESTOS,
CIERRES Y RENTABILIDAD, SIN DUPLICAR REGISTROS NI IMPEDIR
UNA FUTURA CONTABILIDAD FORMAL DENTRO DE NUMERA?
```

Quedan prohibidas equivalencias como:

```text
VENTA = PAGO = RECAUDO = DEPÓSITO = INGRESO CONTABLE
```

```text
ORDEN DE COMPRA = RECEPCIÓN = FACTURA = CUENTA POR PAGAR = PAGO
```

```text
CLIENTE = DEUDOR = CUENTA PASS
```

```text
SALDO DE CARTERA = SUMA DE FACTURAS SIN APLICAR PAGOS
```

```text
GASTO OPERATIVO = COSTO DE INVENTARIO = PAGO BANCARIO
```

```text
TRANSFERENCIA INTERNA = VENTA FISCAL ENTRE ENTIDADES
```

```text
NUMERA ACTUAL = CONTABILIDAD FORMAL COMPLETA
```

---

#### 3. Fuentes consolidadas

- `OPS-AUD-001` a `OPS-AUD-015`;
- `CAP-MAP-001` a `CAP-MAP-015`;
- `CODE-AUD-001` a `CODE-AUD-020`;
- `CAP-SCOPE-001` a `CAP-SCOPE-011`;
- `NUMERA-AUD-001` a `NUMERA-AUD-012`;
- `NUMERA-DOM-001` a `NUMERA-DOM-015`;
- `NUMERA-AUTH-001` a `NUMERA-AUTH-013`;
- `NUMERA-UX-001` a `NUMERA-UX-025`;
- `OPS-CST-001`;
- `INT-APP-001` a `INT-APP-010`;
- `INT-DB-001` a `INT-DB-008`;
- `INT-EXT-001` a `INT-EXT-020`;
- `INT-POS-001` a `INT-POS-024`;
- implementación actual de NUMERA y la migración `20260610161420_numera_economic_foundation.sql`;
- implementaciones actuales de PULSO, ORIGO, NEXO, FOGO, PASS y ANIMA;
- respuestas existentes del registro vivo, incluidas las diferencias actuales entre entidad legal, marca, emisor fiscal y titular de recaudo.

Las respuestas ya entregadas no se vuelven a solicitar. Solo una contradicción material comprobada obligará a corregir una decisión aprobada.

---

#### 4. Alcance evaluado

- `CAP-12.01` — Registrar hechos económicos;
- `CAP-12.02` — Gestionar caja;
- `CAP-12.03` — Gestionar bancos y pagos;
- `CAP-12.04` — Gestionar cuentas por cobrar;
- `CAP-12.05` — Gestionar cuentas por pagar;
- `CAP-12.06` — Facturar y controlar documentos;
- `CAP-12.07` — Conciliar ventas, pagos y entregas;
- `CAP-12.08` — Conciliar compras y recepciones;
- `CAP-12.09` — Calcular costos;
- `CAP-12.10` — Distribuir costos compartidos;
- `CAP-12.11` — Gestionar presupuestos;
- `CAP-12.12` — Gestionar tesorería;
- `CAP-12.13` — Gestionar impuestos y obligaciones;
- `CAP-12.14` — Cerrar períodos y emitir reportes;
- `CAP-12.15` — Analizar rentabilidad;

---

#### 5. Fuera de alcance

- registrar o modificar gastos, presupuestos, pagos, recaudos, cartera u obligaciones reales;
- ejecutar transferencias bancarias o pagos a proveedores;
- emitir facturas, notas o documentos fiscales;
- presentar declaraciones o calcular oficialmente impuestos;
- cerrar o reabrir periodos reales;
- migrar saldos históricos sin reconciliación;
- crear plan de cuentas, comprobantes o libros oficiales en esta etapa;
- seleccionar proveedor contable, bancario, fiscal o de pagos;
- definir indicadores definitivos, reservados para `CAP-SCOPE-017`;
- crear tablas, RPC, Edge Functions, webhooks, jobs o migraciones;
- sustituir al contador, asesor fiscal o proveedor autorizado;
- interpretar esta propuesta como recomendación legal, tributaria o contable.

---

#### 6. Principios canónicos

##### 6.1. NUMERA será la capa económico-operativa

Consolidará hechos, cartera, obligaciones, tesorería, costos, presupuestos, conciliaciones y rentabilidad. No sustituirá por defecto los libros oficiales ni la presentación tributaria.

##### 6.2. La cartera será obligatoria

Las cuentas por cobrar no quedarán como capacidad opcional. Tendrán dominio, permisos, experiencia, pruebas y paquetes propios.

##### 6.3. La contabilidad formal seguirá siendo posible

Los hechos económicos conservarán estructura suficiente para mapearse después a plan de cuentas, comprobantes, débitos, créditos y periodos contables.

##### 6.4. Hecho económico y asiento contable serán distintos

Un evento operativo podrá producir un hecho económico y posteriormente un asiento candidato o confirmado. Ninguna aplicación operativa escribirá directamente libros contables.

##### 6.5. Entidad legal, marca y sede no son equivalentes

Cada registro conservará entidad legal, marca o unidad comercial, sede, centro de costo, tercero, canal y emisor fiscal cuando apliquen.

##### 6.6. La fuente operativa conservará el hecho

PULSO conserva venta y caja; ORIGO compra; NEXO inventario y logística; FOGO producción; ANIMA hechos laborales. NUMERA consume sin recrear sus objetos.

##### 6.7. Los registros financieros serán no destructivos

Correcciones, anulaciones, reclasificaciones, reaperturas y castigos conservarán el original y generarán acciones compensatorias.

##### 6.8. Cada saldo deberá explicarse

Cartera, obligación, banco, caja, costo y presupuesto deberán poder navegar hasta documentos, eventos y actores de origen.

##### 6.9. Pago y aplicación serán diferentes

Recibir dinero no determina automáticamente qué cuenta por cobrar se canceló. La aplicación será explícita, parcial y reversible.

##### 6.10. Documento y obligación serán diferentes

Una factura o soporte puede originar una obligación, pero su validez, aceptación, vencimiento, pago y disputa mantendrán estados independientes.

##### 6.11. Caja y bancos serán subdominios separados

El efectivo operativo se origina en PULSO; los movimientos bancarios y la tesorería se gobernarán en NUMERA.

##### 6.12. Los costos tendrán método y vigencia

Costo estándar, promedio, último, real, landed e interno no se mezclarán ni se elegirán implícitamente.

##### 6.13. Las transferencias internas serán gerenciales

Podrán medir desempeño y costo entre centros, pero no se asumirán ventas fiscales salvo base jurídica y contable aprobada.

##### 6.14. Los presupuestos serán versionados

Presupuesto aprobado, forecast y escenario serán objetos distintos con autor, vigencia, comparación y aprobación.

##### 6.15. Los periodos no se cerrarán por ocultamiento

Toda diferencia permanecerá visible. El cierre bloqueará acciones definidas y la reapertura exigirá autoridad y motivo.

##### 6.16. La fiscalidad oficial tendrá frontera explícita

NUMERA conservará referencias, componentes y estados; el proveedor o sistema autorizado conservará emisión, cálculo o presentación oficial hasta decisión expresa.

##### 6.17. La seguridad será por capacidad y territorio

Lectura, registro, aprobación, pago, conciliación, cierre, reapertura, castigo y exportación requerirán permisos separados y alcance mínimo.

##### 6.18. La conciliación será una capacidad de primer nivel

Las diferencias no serán simples alertas visuales: tendrán expediente, responsable, estado, resolución y evidencia.

##### 6.19. La idempotencia será transversal

El mismo evento, extracto, pago o documento no podrá crear dos hechos, dos saldos ni dos efectos económicos.

##### 6.20. El reporte será una proyección

Un dashboard no será fuente de verdad ni podrá corregirse editando el agregado.

---

#### 7. Línea base verificable

##### 7.1. NUMERA actual

La aplicación actual dispone de:

- acceso y permisos básicos;
- periodos mensuales con estados `open`, `closed` y `locked`;
- categorías de gastos;
- captura manual de gastos por centro de costo;
- presupuestos, ingreso esperado y margen objetivo;
- vista mensual por centro de costo;
- punto de equilibrio inicial;
- lectura inicial de rentabilidad;
- panel que consolida presupuesto, gasto y equilibrio.

La migración fundacional declara expresamente que esta capa no es contabilidad formal. La pantalla de rentabilidad actual compara ingreso esperado, gasto y presupuesto, pero todavía no utiliza ingreso realizado ni costo completo.

##### 7.2. Fuentes operativas

- PULSO y POS externo contienen ventas, pagos, caja, anulaciones, devoluciones, propinas e impuestos.
- ORIGO contiene compras, proveedores, órdenes y recepción empresarial parcial.
- NEXO contiene existencias, movimientos, lotes, remisiones, activos, logística y costos físicos parciales.
- FOGO contiene recetas, producción, consumos, rendimiento y merma parcial.
- ANIMA contiene identidad laboral, turnos y hechos que podrán alimentar costos laborales.
- PASS contiene clientes, pedidos, fidelización y pagos asociados a canales.

##### 7.3. Brecha central

La existencia de tablas y pantallas financieras no demuestra cartera, obligaciones, tesorería, conciliación, cierre, contabilidad ni fiscalidad completas.

---

#### 8. Propiedad objetivo

```text
NUMERA
→ hechos económicos y subledger operativo
→ cartera y cuentas por cobrar
→ cuentas por pagar y obligaciones
→ bancos y tesorería
→ conciliaciones
→ costos y variaciones
→ presupuestos y forecast
→ cierres económico-operativos
→ rentabilidad y reportes

PULSO
→ venta, pago, caja y reversión operativa

ORIGO
→ compra, proveedor, orden, recepción empresarial y disputa

NEXO
→ movimiento físico, valoración de inventario, activos y logística

FOGO
→ consumo, producción, rendimiento y merma

ANIMA
→ hechos laborales y fuentes autorizadas para costo laboral

PROVEEDOR FISCAL / SISTEMA CONTABLE EXTERNO
→ factura y nota oficial
→ libros oficiales mientras no se apruebe contabilidad interna
→ declaraciones y presentación tributaria

BANCOS / PROVEEDORES DE PAGO
→ autorización, liquidación, extracto y movimiento externo
```

---

#### 9. Entidades y conceptos obligatorios

```text
entidad legal
≠ marca
≠ sede
≠ centro de costo
≠ canal
≠ emisor fiscal
≠ titular bancario
```

```text
hecho operativo
≠ hecho económico
≠ documento
≠ obligación
≠ pago
≠ aplicación
≠ asiento contable
```

```text
cliente
≠ deudor
≠ cuenta PASS
≠ tercero contable
```

```text
cuenta por cobrar
≠ cuota
≠ vencimiento
≠ saldo
≠ pago recibido
≠ pago aplicado
```

```text
caja
≠ cuenta bancaria
≠ proveedor de pago
≠ tesorería
```

```text
costo
≠ gasto
≠ inversión
≠ pago
≠ merma
```

```text
presupuesto
≠ forecast
≠ compromiso
≠ gasto real
```

```text
periodo operativo
≠ periodo económico
≠ periodo contable
≠ periodo fiscal
```

---

#### 10. Matriz de tratamiento

| Capacidad | Nombre                             | Tratamiento        | Propietario                               | Decisión                                                                                                                                                |
| --------- | ---------------------------------- | ------------------ | ----------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------- |
| CAP-12.01 | Registrar hechos económicos        | REUSE_OR_REFACTOR  | NUMERA                                    | Conservar la base de periodos y gastos, pero convertir cada hecho en un registro trazable, tipado, correlacionado y no destructivo.                     |
| CAP-12.02 | Gestionar caja                     | REUSE_OR_REFACTOR  | PULSO + NUMERA                            | PULSO conserva la operación de caja; NUMERA recibe, concilia y analiza sesiones, movimientos, diferencias y cierres.                                    |
| CAP-12.03 | Gestionar bancos y pagos           | BUILD              | NUMERA                                    | Construir cuentas financieras, extractos, movimientos, transferencias, aplicación, conciliación y control de acceso.                                    |
| CAP-12.04 | Gestionar cuentas por cobrar       | BUILD              | NUMERA                                    | Capacidad obligatoria: cartera, vencimientos, recaudos, acuerdos, seguimiento, aging, exposición y cierre de saldos.                                    |
| CAP-12.05 | Gestionar cuentas por pagar        | BUILD              | NUMERA                                    | Construir obligaciones desde compras, servicios y gastos, con vencimientos, aprobaciones, pagos y conciliación.                                         |
| CAP-12.06 | Facturar y controlar documentos    | INTEGRATE_EXTERNAL | PULSO / ORIGO / proveedor fiscal + NUMERA | La emisión fiscal permanece en proveedor autorizado; NUMERA conserva referencia, estado, impuestos, tercero y conciliación.                             |
| CAP-12.07 | Conciliar ventas, pagos y entregas | BUILD              | NUMERA                                    | Construir conciliación entre venta, medios de pago, caja, factura, entrega, devolución, reembolso y depósito.                                           |
| CAP-12.08 | Conciliar compras y recepciones    | BUILD              | NUMERA                                    | Construir conciliación entre orden, recepción, diferencia, documento, obligación, devolución y pago.                                                    |
| CAP-12.09 | Calcular costos                    | REUSE_OR_REFACTOR  | NUMERA + NEXO + FOGO + ORIGO              | Reutilizar precios, consumos y lotes; definir costo estándar, real, landed, merma, variación y vigencia.                                                |
| CAP-12.10 | Distribuir costos compartidos      | BUILD              | NUMERA                                    | Construir reglas versionadas de drivers, asignación, transferencias internas y reversión.                                                               |
| CAP-12.11 | Gestionar presupuestos             | REUSE_OR_REFACTOR  | NUMERA                                    | Conservar presupuesto por centro, ampliándolo a versiones, escenarios, responsables, aprobación y forecast.                                             |
| CAP-12.12 | Gestionar tesorería                | BUILD              | NUMERA                                    | Construir posición, flujo de caja, programación, autorización, liquidez, compromisos y alertas.                                                         |
| CAP-12.13 | Gestionar impuestos y obligaciones | INTEGRATE_EXTERNAL | Proveedor fiscal / contabilidad + NUMERA  | NUMERA conserva componentes, calendario, soportes, estimaciones y estado; el cálculo y presentación oficial permanecen externos hasta decisión expresa. |
| CAP-12.14 | Cerrar períodos y emitir reportes  | BUILD              | NUMERA                                    | Construir cierre por periodo, checklist, bloqueos, conciliaciones, ajustes, reapertura y paquete de evidencia.                                          |
| CAP-12.15 | Analizar rentabilidad              | REUSE_OR_REFACTOR  | NUMERA                                    | Ampliar la lectura inicial a rentabilidad real por entidad, sede, canal, producto, cliente, pedido y periodo.                                           |

---

#### 11. CAP-12.01 — Registro de hechos económicos

Cada hecho tendrá identidad estable, tipo, entidad legal, sede, centro de costo, tercero, moneda, fecha de ocurrencia, fecha de reconocimiento, fuente, correlación, monto, impuestos, estado y evidencia. La corrección será compensatoria.

---

#### 12. CAP-12.02 — Caja

PULSO ejecutará apertura, movimientos, conteo y cierre. NUMERA consumirá sesiones, efectivo esperado, diferencia, aprobación, depósito y conciliación. Una diferencia no se convertirá automáticamente en gasto o ingreso.

---

#### 13. CAP-12.03 — Bancos y pagos

Se definirán cuentas, titulares, monedas, tipos, vigencias, saldos, movimientos, extractos, transferencias, beneficiarios, referencias, conciliación y datos sensibles. Un extracto importado será inmutable.

---

#### 14. CAP-12.04 — Cartera y cuentas por cobrar

Se construirán deudores, cuentas, documentos, cuotas, vencimientos, saldos, recaudos, aplicaciones, anticipos, notas, disputas, acuerdos, promesas, aging, exposición, límite, gestión de cobro y castigo autorizado.

---

#### 15. CAP-12.05 — Cuentas por pagar

Se construirán obligaciones desde compras, servicios, gastos, activos y otras fuentes. Se separarán aceptación, causación operativa, vencimiento, programación, aprobación, pago, retención, disputa y cierre.

---

#### 16. CAP-12.06 — Facturación y documentos

PULSO u ORIGO originarán el contexto; el proveedor autorizado emitirá. NUMERA conservará número, emisor, receptor, impuestos, moneda, estado, referencias, hash o evidencia y conciliación.

---

#### 17. CAP-12.07 — Conciliación de ventas

Se compararán ventas, pagos, caja, proveedor, factura, entrega, devoluciones, reembolsos, propinas, depósitos y eventos de cartera. Las diferencias tendrán expediente.

---

#### 18. CAP-12.08 — Conciliación de compras

Se compararán solicitud, orden, recepción, factura, notas, obligación, devolución y pago. La parcialidad y tolerancia serán explícitas.

---

#### 19. CAP-12.09 — Costos

Se separarán costo de adquisición, landed, estándar, real, promedio, último, producción, merma, logística e interno. Cada cálculo declarará método, entradas, versión y periodo.

---

#### 20. CAP-12.10 — Costos compartidos

Cada distribución tendrá pool, driver, base, periodo, centros origen y destino, regla, versión, aprobación, resultado y reversión. No se usarán porcentajes ocultos.

---

#### 21. CAP-12.11 — Presupuestos

Se distinguirán borrador, aprobado, revisión, forecast y escenario. Los cambios conservarán motivo, responsable y comparación.

---

#### 22. CAP-12.12 — Tesorería

Se construirá posición de caja, bancos, cuentas por cobrar y pagar, compromisos, vencimientos, flujo proyectado, programación y alertas de liquidez.

---

#### 23. CAP-12.13 — Impuestos y obligaciones

NUMERA podrá conservar componentes tributarios, calendario, soportes, estimaciones y estados; la determinación y presentación oficial seguirán con contabilidad o proveedor autorizado.

---

#### 24. CAP-12.14 — Cierre

El cierre exigirá checklist, conciliaciones, diferencias aceptadas, responsables, evidencia y bloqueo. Los eventos tardíos usarán ajuste o reapertura autorizada.

---

#### 25. CAP-12.15 — Rentabilidad

Se calculará con ingreso realizado y costo trazable, separando entidad, marca, sede, canal, producto, cliente, pedido y periodo. La lectura interna no sustituirá estados financieros oficiales.

---

#### 26. Cartera obligatoria en NUMERA

La decisión del usuario se incorpora como regla canónica:

```text
LA CARTERA Y LAS CUENTAS POR COBRAR SE IMPLEMENTARÁN EN NUMERA.
NO QUEDAN DIFERIDAS A UNA DECISIÓN FUTURA NI DEPENDEN DE
QUE NUMERA SE CONVIERTA EN SISTEMA CONTABLE COMPLETO.
```

El mínimo funcional incluirá:

- deudor persona o empresa, sin exigir cuenta PASS;
- entidad legal acreedora;
- origen comercial y documento relacionado;
- cuenta por cobrar y cuotas;
- fecha de emisión, exigibilidad y vencimiento;
- moneda, capital, impuestos, descuentos y saldo;
- pago recibido y aplicación parcial o total;
- anticipos y saldos a favor;
- notas y compensaciones;
- disputa, retención y bloqueo;
- acuerdo de pago, promesa y seguimiento;
- aging y exposición;
- gestión de cobro y evidencia de contacto;
- castigo o condonación con autoridad independiente;
- conciliación con bancos, caja, pagos y facturación;
- historia completa y no destructiva.

---

#### 27. Extensión futura hacia contabilidad formal

La arquitectura deberá permitir dos caminos sin rehacer los dominios operativos:

##### Camino A — Integración externa

NUMERA exporta hechos o asientos candidatos a un sistema contable y recibe identificadores, estados, periodos, comprobantes y diferencias.

##### Camino B — Contabilidad dentro de NUMERA

En una fase posterior podrán incorporarse:

- plan de cuentas versionado por entidad legal;
- terceros contables;
- comprobantes y líneas débito/crédito;
- reglas de contabilización;
- centros de costo y dimensiones;
- periodos contables;
- auxiliares;
- balance de prueba;
- estados financieros;
- cierre y reapertura contables;
- libros y evidencia requerida.

La decisión futura será propiedad de `NUMERA-DOM-017` y `NUMERA-UX-027`. Hasta entonces, ningún reporte económico-operativo se declarará libro o estado financiero oficial.

---

#### 28. Modelo multiempresa y multiemisor

Las respuestas operativas muestran que marca, entidad legal, emisor de factura y titular de recaudo pueden variar. Por tanto, todo hecho financiero deberá identificar explícitamente:

- entidad legal responsable;
- marca o unidad comercial;
- sede y centro de costo;
- emisor fiscal;
- tercero pagador o beneficiario;
- cuenta de recaudo o pago;
- canal y proveedor;
- relación intercompañía o interna cuando exista.

NUMERA no inferirá la entidad legal desde el nombre visible de la marca ni desde la sede.

---

#### 29. Estados mínimos

| Objeto            | Estados mínimos                                                                               |
| ----------------- | --------------------------------------------------------------------------------------------- |
| hecho económico   | pending / recognized / reversed / disputed / reconciled                                       |
| cuenta por cobrar | draft / open / partial / overdue / disputed / settled / written_off / cancelled               |
| cuenta por pagar  | draft / pending_approval / approved / partial / due / overdue / paid / disputed / cancelled   |
| pago o recaudo    | initiated / pending / confirmed / failed / reversed / unapplied / partially_applied / applied |
| conciliación      | unmatched / suggested / matched / exception / approved / reopened                             |
| presupuesto       | draft / submitted / approved / superseded / closed                                            |
| periodo           | open / closing / closed / locked / reopened                                                   |
| documento fiscal  | pending / issued / accepted / rejected / voided / credited                                    |

---

#### 29A. Visor económico dinámico de una sola pantalla

El visor económico será la superficie principal de NUMERA para consultar, comparar y simular precios, costos, márgenes, presupuestos, equilibrio y rentabilidad. No será una página de documentación ni una colección de tarjetas explicativas.

La vista inicial deberá responder, sin navegación previa, cuatro preguntas:

1. ¿cuánto cuesta realmente?;
2. ¿a qué precio se vende o se propone vender?;
3. ¿cuánto margen o contribución deja?;
4. ¿qué cambia cuando se modifica un supuesto?

##### 29A.1. Composición obligatoria

La pantalla principal tendrá, como máximo, estas zonas visibles:

1. **barra compacta de contexto:** entidad, sede, canal, producto o familia, periodo y escenario;
2. **resumen de cuatro a seis indicadores:** precio, costo, margen, variación, equilibrio y resultado proyectado según el contexto;
3. **área central de comparación:** tabla o matriz de precio, costo y margen con comparación entre real, presupuesto, escenario y periodo anterior;
4. **una visualización principal:** tendencia, composición o sensibilidad, seleccionada según la pregunta activa;
5. **simulador plegable:** panel lateral o inferior que se abre solo cuando el usuario desea modificar supuestos;
6. **detalle bajo demanda:** desglose de costo, movimientos, fuentes y fórmula accesible mediante `Ver detalle`, sin ocupar permanentemente la pantalla.

##### 29A.2. Modos separados

```text
REAL
≠ PRESUPUESTADO
≠ SIMULADO
≠ PROPUESTO
≠ PUBLICADO
```

- `REAL` mostrará hechos confirmados y conciliados;
- `PRESUPUESTADO` mostrará la versión aprobada del periodo;
- `SIMULADO` permitirá cambiar supuestos sin alterar datos reales;
- `PROPUESTO` representará un escenario enviado a revisión;
- `PUBLICADO` representará un precio, presupuesto o regla aprobada y vigente.

Cambiar un control del simulador nunca modificará precios, presupuestos, costos maestros ni registros económicos reales. Publicar exigirá una acción separada, permiso, revisión y trazabilidad.

##### 29A.3. Principios de simplicidad obligatorios

- la pantalla principal no contendrá párrafos instructivos permanentes;
- no se usarán tarjetas como `Qué editas`, `Qué calcula NUMERA` o `Cómo llenar esta pantalla` dentro del flujo cotidiano;
- cada texto auxiliar visible tendrá como máximo una línea corta;
- la ayuda extensa se moverá a tooltip, panel `Ayuda`, onboarding descartable o documentación separada;
- términos técnicos de base de datos, eventos, tablas, RPC o contratos no serán visibles para usuarios de negocio;
- los nombres se expresarán en lenguaje empresarial: `Precio`, `Costo`, `Margen`, `Variación`, `Cartera`, `Disponible`, `Vencido`;
- el usuario podrá volver al estado inicial mediante `Restablecer` sin recargar la aplicación;
- los filtros y escenarios activos permanecerán siempre visibles;
- el color no será el único medio para distinguir estado o resultado;
- la densidad se resolverá mediante agrupación, jerarquía y detalle progresivo, no mediante ocultar información esencial.

##### 29A.4. Interacción mínima

- seleccionar un producto o centro actualizará todos los indicadores de forma coordinada;
- cambiar precio, costo, volumen, merma, comisión o descuento recalculará el escenario inmediatamente;
- comparar dos escenarios requerirá como máximo tres acciones desde la pantalla principal;
- cada indicador permitirá navegar hasta el detalle y la fuente que lo produjo;
- las vistas podrán guardarse como presets por rol, sin crear copias de los datos;
- propietario, gerente, contador y responsable de sede verán la misma verdad con diferente profundidad y ámbito autorizado.

##### 29A.5. Criterios de aceptación UX

El visor no se considerará aprobado si:

- necesita leer instrucciones largas para utilizarse;
- obliga a recorrer varias pantallas para comparar precio, costo y margen;
- mezcla datos reales con supuestos sin señalización explícita;
- muestra más de una visualización principal simultánea sin necesidad;
- expone conceptos técnicos internos;
- requiere desplazar la pantalla para encontrar los filtros o el escenario activo;
- no permite explicar el origen de un valor bajo demanda;
- usuarios de negocio no pueden completar una comparación básica sin asistencia.

La validación incluirá pruebas de comprensión con usuarios no técnicos y medición de tiempo, errores y necesidad de ayuda.

---

#### 30. Reglas de autoridad y segregación

- quien crea un gasto no aprobará necesariamente su propio gasto;
- quien programa un pago no deberá ejecutarlo y conciliarlo sin excepción autorizada;
- quien registra un recaudo no podrá castigar la cartera;
- cerrar y reabrir periodo serán permisos distintos;
- exportar información financiera será independiente de verla;
- modificar cuentas bancarias, beneficiarios o titulares será una acción sensible;
- ajustes de costo y distribuciones compartidas tendrán aprobación;
- cualquier excepción a segregación quedará motivada, temporal y auditada.

---

#### 31. Preguntas existentes reutilizadas

| Pregunta        | Uso                                                                      |
| --------------- | ------------------------------------------------------------------------ |
| GOV-13 a GOV-19 | titulares de cuentas de recaudo y cuentas comerciales por unidad o canal |
| ACT-15          | responsable actual de recibir y custodiar efectivo de las sedes          |
| DAT-01 y DAT-03 | capacidad de exportación y detalle de ventas del POS actual              |
| DAT-06          | fuente histórica de compras                                              |
| DAT-14 y DAT-15 | fuente y resultado del pago laboral                                      |
| DAT-22          | fuente del reparto de propinas                                           |
| TEC-09          | inventario técnico de información financiera; ya respondida              |
| DIF-14          | reglas de imputación de costos compartidos                               |

No se crean preguntas nuevas. Las respuestas ya suministradas se consolidarán posteriormente en lote. Las preguntas pendientes bloquean configuración real, migración histórica o piloto, pero no bloquean aprobar la cobertura.

---

#### 32. Tareas nuevas derivadas

| ID              | Tarea                                                                                                   | Bloque propietario                         | Momento                                                                               |
| --------------- | ------------------------------------------------------------------------------------------------------- | ------------------------------------------ | ------------------------------------------------------------------------------------- |
| NUMERA-DOM-016  | Definir cartera, cuentas por cobrar, cobranza y exposición de crédito                                   | BLOQUE O — NUMERA / dominio                | E2, antes de diseñar datos y pantallas de cartera                                     |
| NUMERA-DOM-017  | Definir arquitectura extensible hacia contabilidad formal, plan de cuentas y comprobantes               | BLOQUE O — NUMERA / dominio                | E2-E3, antes de congelar contratos financieros                                        |
| NUMERA-DOM-018  | Definir motor de escenarios, versiones de precios, costos, supuestos y publicación                      | BLOQUE O — NUMERA / dominio                | E2, antes de diseñar el visor económico y los contratos de escenarios                 |
| NUMERA-AUTH-014 | Definir permisos de cartera, acuerdos, castigos, bancos y datos financieros sensibles                   | BLOQUE O — NUMERA / autorización           | E2-E3, antes de implementar cartera o tesorería                                       |
| NUMERA-AUTH-015 | Definir permisos para crear, compartir, aprobar y publicar escenarios, precios y presupuestos           | BLOQUE O — NUMERA / autorización           | E2-E3, antes de permitir escenarios compartidos o publicación                         |
| NUMERA-UX-026   | Diseñar cartera, vencimientos, recaudos, aplicación, acuerdos y gestión de cobro                        | BLOQUE O — NUMERA / procesos y experiencia | E2, después de NUMERA-DOM-016                                                         |
| NUMERA-UX-027   | Diseñar extensión o integración contable y fiscal sin duplicar hechos operativos                        | BLOQUE O — NUMERA / procesos y experiencia | E2-E3, después de NUMERA-DOM-017 y NUMERA-DOM-013                                     |
| NUMERA-UX-028   | Diseñar visor económico dinámico de una sola pantalla, simple, comparativo y con divulgación progresiva | BLOQUE O — NUMERA / procesos y experiencia | E2, después de NUMERA-DOM-018 y antes de completar la implementación visual de NUMERA |

Integración futura en el roadmap:

```text
Después de NUMERA-DOM-015:
NUMERA-DOM-016
NUMERA-DOM-017
NUMERA-DOM-018

Después de NUMERA-AUTH-013:
NUMERA-AUTH-014
NUMERA-AUTH-015

Después de NUMERA-UX-025:
NUMERA-UX-026
NUMERA-UX-027
NUMERA-UX-028
```

Hasta la consolidación documental por lote, esta tarea será el artefacto propietario de esos identificadores.

---

#### 33. Hallazgos trazables

| ID                  | Hallazgo                                                                                                                                                                                              | Riesgo  | Tarea propietaria                                                                 | Momento  |
| ------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------- | --------------------------------------------------------------------------------- | -------- |
| H-CAP-SCOPE-012-001 | La fundación NUMERA actual es económico-operativa y declara que no constituye contabilidad formal.                                                                                                    | crítica | NUMERA-DOM-001; NUMERA-DOM-013; NUMERA-DOM-015; NUMERA-DOM-017                    | E2       |
| H-CAP-SCOPE-012-002 | El panel actual resume presupuesto, gasto y equilibrio, pero no prueba reconciliación integral con ventas, compras, inventario o producción.                                                          | crítica | NUMERA-AUD-006; NUMERA-AUD-012; NUMERA-UX-014; NUMERA-UX-024                      | E1/E2    |
| H-CAP-SCOPE-012-003 | Los gastos pueden capturarse manualmente sin soporte, aprobación, estado, anulación ni detección completa de duplicidad.                                                                              | crítica | NUMERA-DOM-005; NUMERA-UX-009; NUMERA-UX-010; NUMERA-AUTH-004; NUMERA-AUTH-005    | E2/E3    |
| H-CAP-SCOPE-012-004 | No existe un ledger canónico de hechos económicos con identidad estable, correlación, reversión y reconocimiento por periodo.                                                                         | crítica | NUMERA-DOM-002 a NUMERA-DOM-005; NUMERA-DOM-011; NUMERA-DOM-014                   | E2/E3    |
| H-CAP-SCOPE-012-005 | Empresa legal, marca, sede, centro de costo, emisor fiscal, titular de cuenta y canal pueden diferir y no deben colapsarse.                                                                           | crítica | CAP-SCOPE-001; NUMERA-DOM-006; NUMERA-DOM-013; OPS-CST-001                        | E2/E3    |
| H-CAP-SCOPE-012-006 | La cartera y las cuentas por cobrar no tienen tareas específicas suficientes en el roadmap, pese a ser obligatorias para el negocio.                                                                  | crítica | NUMERA-DOM-016; NUMERA-AUTH-014; NUMERA-UX-026                                    | E2/E3/E5 |
| H-CAP-SCOPE-012-007 | No existe modelo canónico de deudor, documento, cuota, vencimiento, saldo, pago aplicado, acuerdo, disputa y castigo.                                                                                 | crítica | NUMERA-DOM-016; NUMERA-UX-026                                                     | E2/E3    |
| H-CAP-SCOPE-012-008 | Un pago recibido puede existir sin aplicación a una cuenta por cobrar y no debe cerrar cartera por simple coincidencia de monto.                                                                      | crítica | NUMERA-DOM-016; NUMERA-UX-017; NUMERA-UX-026                                      | E2/E3    |
| H-CAP-SCOPE-012-009 | No existe aging de cartera, exposición, límite, promesa de pago, gestión de cobro ni trazabilidad de contacto.                                                                                        | alta    | NUMERA-DOM-016; NUMERA-UX-026; CAP-SCOPE-017                                      | E2/E5    |
| H-CAP-SCOPE-012-010 | Las cuentas por pagar y obligaciones están condicionadas en tareas existentes y deben pasar a alcance explícito.                                                                                      | crítica | NUMERA-DOM-010; NUMERA-UX-020; NUMERA-DOM-015                                     | E2       |
| H-CAP-SCOPE-012-011 | Orden, recepción, factura, nota, obligación y pago todavía no forman un expediente financiero conciliado.                                                                                             | crítica | NUMERA-DOM-003; NUMERA-UX-018; CAP-SCOPE-005; TREQ-INTEGRATION-010                | E2/E3    |
| H-CAP-SCOPE-012-012 | Los servicios y gastos no inventariables requieren aceptación y soporte sin crear recepciones físicas ficticias.                                                                                      | alta    | CAP-SCOPE-005; NUMERA-DOM-003; NUMERA-DOM-005                                     | E2/E3    |
| H-CAP-SCOPE-012-013 | Las sesiones y movimientos de caja existen en PULSO, pero NUMERA no demuestra cierre y conciliación de efectivo de extremo a extremo.                                                                 | crítica | NUMERA-DOM-009; NUMERA-UX-017; NUMERA-UX-021; CAP-SCOPE-009                       | E2/E3    |
| H-CAP-SCOPE-012-014 | No existe maestro canónico de cuentas bancarias, titulares, monedas, saldos, permisos y vigencias.                                                                                                    | crítica | NUMERA-DOM-009; NUMERA-AUTH-002; NUMERA-AUTH-008; NUMERA-AUTH-014                 | E2/E3    |
| H-CAP-SCOPE-012-015 | No existe importación o conciliación de extractos bancarios con reglas de matching, excepciones y aprobación.                                                                                         | crítica | NUMERA-UX-021; INT-EXT-001 a INT-EXT-020; INT-DB-008                              | E3/E5    |
| H-CAP-SCOPE-012-016 | Las cuentas receptoras por marca o entidad todavía tienen preguntas operativas pendientes y no deben inferirse.                                                                                       | alta    | GOV-13 a GOV-19; NUMERA-DOM-009                                                   | E1/E2    |
| H-CAP-SCOPE-012-017 | Venta, pago, depósito, factura, entrega, devolución y reembolso pueden divergir sin una conciliación diaria formal.                                                                                   | crítica | NUMERA-DOM-002; NUMERA-UX-017; INT-POS-017; INT-POS-020; CAP-SCOPE-009            | E2/E3/E5 |
| H-CAP-SCOPE-012-018 | Compra, recepción, documento, devolución, obligación y pago pueden divergir sin conciliación formal.                                                                                                  | crítica | NUMERA-DOM-003; NUMERA-UX-018; CAP-SCOPE-005                                      | E2/E3/E5 |
| H-CAP-SCOPE-012-019 | Consumo, producción, merma, stock y costo no tienen todavía una conciliación económica cerrada.                                                                                                       | crítica | NUMERA-DOM-004; NUMERA-DOM-007; NUMERA-UX-019; CAP-SCOPE-006; CAP-SCOPE-008       | E2/E3/E5 |
| H-CAP-SCOPE-012-020 | El costo estándar, último costo, promedio, real, landed e interno requieren definiciones y vigencias separadas.                                                                                       | crítica | NUMERA-DOM-007; NUMERA-AUD-008; NUMERA-UX-022                                     | E2       |
| H-CAP-SCOPE-012-021 | Las remisiones valorizadas pueden servir para gestión interna, pero no deben crear ingreso fiscal o gasto legal sin base jurídica.                                                                    | crítica | OPS-CST-001; NUMERA-DOM-007; NUMERA-DOM-013                                       | E2/E3    |
| H-CAP-SCOPE-012-022 | Los costos compartidos no tienen drivers, versiones, aprobaciones, reversión ni explicación reproducible.                                                                                             | alta    | OPS-CST-001; NUMERA-DOM-007; NUMERA-UX-022                                        | E2/E3    |
| H-CAP-SCOPE-012-023 | Los presupuestos actuales carecen de workflow completo de versión, aprobación, modificación, forecast y escenarios.                                                                                   | alta    | NUMERA-DOM-006; NUMERA-DOM-011; NUMERA-UX-010; NUMERA-UX-023                      | E2/E3    |
| H-CAP-SCOPE-012-024 | No existe una posición de tesorería consolidada con compromisos, vencimientos, liquidez y pagos programados.                                                                                          | crítica | NUMERA-DOM-009; NUMERA-DOM-010; NUMERA-UX-020; NUMERA-UX-021                      | E2/E3    |
| H-CAP-SCOPE-012-025 | No se ha definido segregación entre quien registra, aprueba, paga, concilia, cierra, reabre y exporta.                                                                                                | crítica | NUMERA-AUTH-003 a NUMERA-AUTH-009; NUMERA-AUTH-014                                | E2/E3    |
| H-CAP-SCOPE-012-026 | Los periodos admiten estados open, closed y locked, pero no existe workflow integral de checklist, aprobación y reapertura.                                                                           | crítica | NUMERA-DOM-011; NUMERA-UX-011; NUMERA-UX-023                                      | E2/E3    |
| H-CAP-SCOPE-012-027 | Un periodo cerrado puede recibir eventos tardíos y necesita reglas de periodo operativo, contable y de ajuste.                                                                                        | crítica | NUMERA-DOM-011; NUMERA-DOM-014; NUMERA-DOM-017                                    | E2/E3    |
| H-CAP-SCOPE-012-028 | La rentabilidad actual usa ingreso esperado y gasto, no ingreso realizado ni costo completo trazable.                                                                                                 | alta    | NUMERA-AUD-008; NUMERA-DOM-008; NUMERA-UX-022                                     | E1/E2    |
| H-CAP-SCOPE-012-029 | No existe rentabilidad consolidada por entidad legal, marca, sede, canal, producto, pedido, cliente y periodo.                                                                                        | alta    | NUMERA-DOM-008; CAP-SCOPE-017                                                     | E2/E5    |
| H-CAP-SCOPE-012-030 | La facturación y los impuestos oficiales dependen de proveedores o contabilidad externos y requieren referencias y conciliación, no duplicación.                                                      | crítica | NUMERA-DOM-013; NUMERA-UX-027; INT-EXT-001 a INT-EXT-020                          | E2/E3    |
| H-CAP-SCOPE-012-031 | La arquitectura actual no debe bloquear una futura contabilidad interna con plan de cuentas, comprobantes y partida doble.                                                                            | alta    | NUMERA-DOM-017; NUMERA-UX-027                                                     | E2/E3    |
| H-CAP-SCOPE-012-032 | Los datos financieros, bancarios, de cartera y fiscales requieren clasificación, minimización y exportación independiente.                                                                            | crítica | NUMERA-AUTH-002; NUMERA-AUTH-007; NUMERA-AUTH-008; NUMERA-AUTH-014; CAP-SCOPE-016 | E2/E3    |
| H-CAP-SCOPE-012-033 | Reintentos, importaciones y eventos fuera de orden pueden duplicar gastos, obligaciones, pagos, recaudos, costos o asientos candidatos.                                                               | crítica | INT-APP-001 a INT-APP-010; INT-DB-001 a INT-DB-008; CAP-SCOPE-018                 | E3/E5    |
| H-CAP-SCOPE-012-034 | La migración histórica no debe tratar hojas, saldos o reportes parciales como hechos completos sin reconciliación y evidencia.                                                                        | alta    | DATA-NORM-DB-006; AUTH-DB-011; CUTOVER-OPS-005; HYPERCARE-OPS-005                 | E3/E5    |
| H-CAP-SCOPE-012-035 | La pantalla actual de NUMERA dedica espacio permanente a explicaciones de uso y no existe todavía un visor económico único, dinámico y comprensible para comparar precio, costo, margen y escenarios. | alta    | NUMERA-DOM-018; NUMERA-AUTH-015; NUMERA-UX-028; UX-QA-028                         | E2/E5    |

No queda hallazgo narrativo sin identificador, dueño y momento de resolución.

---

#### 34. Riesgos y controles mínimos

| Riesgo                                               | Severidad | Control mínimo                                                                                  |
| ---------------------------------------------------- | --------- | ----------------------------------------------------------------------------------------------- |
| doble registro de un mismo evento                    | crítica   | identidad estable, idempotencia y conciliación                                                  |
| cartera cerrada por pago no aplicado                 | crítica   | aplicación explícita y reversible                                                               |
| entidad legal incorrecta                             | crítica   | dimensiones obligatorias y validación                                                           |
| pago a beneficiario alterado                         | crítica   | aprobación, MFA y auditoría                                                                     |
| gasto sin soporte o aprobación                       | alta      | workflow y evidencia                                                                            |
| obligación duplicada                                 | crítica   | matching por proveedor, documento, monto y origen                                               |
| saldo bancario no conciliado                         | crítica   | extracto inmutable y excepciones                                                                |
| costo no reproducible                                | crítica   | método, versión, entradas y periodo                                                             |
| transferencia interna tratada como fiscal            | crítica   | clasificación gerencial/legal separada                                                          |
| cierre con diferencias ocultas                       | crítica   | checklist y pendientes visibles                                                                 |
| reapertura destructiva                               | crítica   | permiso, motivo y nueva versión                                                                 |
| exportación financiera excesiva                      | crítica   | permiso independiente y minimización                                                            |
| evento tardío en periodo cerrado                     | alta      | ajuste o reapertura gobernada                                                                   |
| dependencia irreversible de proveedor                | alta      | contrato canónico y adaptador                                                                   |
| migración de saldos incompletos                      | crítica   | reconciliación, evidencia y cuarentena                                                          |
| visor saturado de explicaciones o conceptos técnicos | alta      | una pantalla principal, divulgación progresiva y prueba de comprensión con usuarios no técnicos |

---

#### 35. Decisiones aprobables

1. NUMERA será la capa económico-operativa y de conciliación de Vento Group.
2. La cartera y las cuentas por cobrar serán capacidad obligatoria de NUMERA.
3. Las cuentas por pagar, bancos y tesorería pertenecerán al alcance objetivo de NUMERA.
4. PULSO conservará operación de venta y caja; NUMERA conciliará sin duplicar.
5. ORIGO conservará compras y recepción empresarial; NUMERA administrará obligación y conciliación.
6. NEXO y FOGO conservarán hechos físicos y productivos; NUMERA calculará efectos y variaciones.
7. Entidad legal, marca, sede, centro, emisor y titular bancario serán dimensiones independientes.
8. Todo saldo deberá navegar hasta hechos y documentos de origen.
9. Pago y aplicación serán objetos diferentes.
10. La facturación e impuestos oficiales permanecerán externos mientras no se apruebe otro alcance.
11. La arquitectura permitirá contabilidad formal futura dentro de NUMERA o por integración.
12. Los costos internos no se asumirán ingresos o gastos legales.
13. Presupuestos, forecast y escenarios serán distintos y versionados.
14. Cierres y reaperturas conservarán historia.
15. El visor económico será una capacidad central, dinámica y principalmente de una sola pantalla.
16. Las explicaciones extensas no ocuparán permanentemente el espacio de trabajo; se usarán ayuda contextual y divulgación progresiva.
17. Los escenarios nunca modificarán datos reales hasta una publicación separada, autorizada y auditada.
18. Las ocho tareas derivadas quedarán creadas y vinculadas a esta tarea aprobada.

---

#### 36. Decisiones diferidas con dueño

| Decisión                                                              | Dueño                                                    | Momento                                 |
| --------------------------------------------------------------------- | -------------------------------------------------------- | --------------------------------------- |
| implementar contabilidad formal dentro de NUMERA o integrar proveedor | NUMERA-DOM-017; NUMERA-DOM-013; Dirección y Contabilidad | E2-E3                                   |
| plan de cuentas y reglas de contabilización                           | NUMERA-DOM-017                                           | solo si se aprueba contabilidad interna |
| proveedor contable o fiscal                                           | INT-EXT-001 a INT-EXT-020                                | BLOQUE X                                |
| proveedor bancario o agregador de extractos                           | NUMERA-DOM-009; INT-EXT-001 a INT-EXT-020                | E2-E3                                   |
| política de crédito, límites y castigos                               | NUMERA-DOM-016; Dirección                                | E2                                      |
| reglas de cuentas por pagar y autorización                            | NUMERA-DOM-010; NUMERA-AUTH-005                          | E2                                      |
| drivers de costos compartidos                                         | OPS-CST-001                                              | E2                                      |
| metodologías de costo por familia                                     | NUMERA-DOM-007                                           | E2                                      |
| calendario y responsabilidad tributaria                               | Contabilidad; NUMERA-DOM-013                             | E2-E3                                   |
| métricas y metas financieras                                          | CAP-SCOPE-017                                            | E2-E5                                   |
| contingencia y recuperación                                           | CAP-SCOPE-018                                            | E2-E5                                   |

---

#### 37. Requisitos de prueba generados

```text
TREQ-NUMERA-002
TREQ-NUMERA-003
TREQ-NUMERA-004
TREQ-INTEGRATION-017
```

##### 37.1. `TREQ-NUMERA-002`

Protege el ledger económico-operativo, dimensiones, periodos, correcciones, cierre, reapertura, evidencia y trazabilidad.

##### 37.2. `TREQ-NUMERA-003`

Protege cartera obligatoria, cuentas por pagar, bancos, caja, tesorería, pagos, aplicaciones, vencimientos, acuerdos, castigos y segregación.

##### 37.3. `TREQ-NUMERA-004`

Protege costos, distribuciones, presupuestos, forecast, punto de equilibrio, rentabilidad reproducible y el visor económico dinámico con separación entre datos reales, simulaciones, propuestas y publicaciones.

##### 37.4. `TREQ-INTEGRATION-017`

Protege la cadena de hechos financieros desde aplicaciones operativas, bancos, pagos y proveedores contables o fiscales, con idempotencia y conciliación.

---

#### 38. Puertas de implementación

##### Puerta 1 — Procesos y dominio E2

- ejecutar las tareas `NUMERA-DOM-*`;
- incorporar `NUMERA-DOM-016`, `NUMERA-DOM-017` y `NUMERA-DOM-018`;
- aprobar estados, actores, segregación, excepciones y políticas de cartera;
- aprobar fronteras contables y fiscales;
- aprobar modos `REAL`, `PRESUPUESTADO`, `SIMULADO`, `PROPUESTO` y `PUBLICADO`.

##### Puerta 2 — Datos y arquitectura E3

- congelar contratos de hecho, cartera, obligación, pago, aplicación, cuenta, extracto, costo, presupuesto y periodo;
- definir eventos, idempotencia, conciliación y compensación;
- diseñar integración contable y bancaria;
- definir migración y calidad;
- definir contratos de escenario, supuestos, versiones y publicación.

##### Puerta 3 — Implementación E5

- implementar primero ledger, cartera y conciliaciones prioritarias;
- incorporar tesorería, cuentas por pagar, costos y presupuestos;
- implementar `NUMERA-UX-028` como visor económico principal y retirar de la vista cotidiana los bloques explicativos permanentes;
- conectar fuentes sin escritura cruzada;
- validar permisos y exportaciones.

##### Puerta 4 — Piloto y certificación

- probar cartera real controlada;
- conciliar ventas y pagos;
- conciliar compras y recepciones;
- probar extractos, pagos parciales, anticipos y diferencias;
- cerrar y reabrir un periodo de prueba;
- validar con Dirección y Contabilidad;
- validar comprensión, densidad, tiempo de comparación y ausencia de asistencia con usuarios no técnicos.

---

#### 39. Criterios de aceptación

`CAP-SCOPE-012` podrá aprobarse cuando:

- las quince subcapacidades tengan tratamiento explícito;
- cartera quede clasificada como obligatoria y `BUILD`;
- NUMERA, aplicaciones operativas y sistemas externos tengan fronteras claras;
- entidad legal, marca, sede, centro, emisor y cuenta no se fusionen;
- hecho, documento, obligación, pago, aplicación y asiento sean distintos;
- costos, presupuestos, tesorería y cierres tengan reglas mínimas;
- la contabilidad formal futura siga siendo posible sin rehacer los dominios;
- las ocho tareas derivadas tengan identificador, bloque y momento;
- los 35 hallazgos tengan propietario y momento;
- el visor económico cumpla los principios de una sola pantalla, lenguaje empresarial y divulgación progresiva;
- datos reales, presupuestados, simulados, propuestos y publicados sean inequívocamente distintos;
- los cuatro requisitos nuevos estén incorporados en un `04A` completo válido;
- no se haya autorizado implementación ni actuación financiera real.

---

#### 40. Resultado y continuidad

Esta tarea aprobada define la cobertura objetivo financiera de Vento Group, incluida la implementación obligatoria de cartera, la capacidad de evolucionar hacia contabilidad formal y la creación de un visor económico dinámico, simple y principalmente de una sola pantalla.

La continuidad será exclusivamente:

```text
CAP-SCOPE-013
— Evaluar instalaciones, mantenimiento, limpieza, inspecciones y calibración
```

`CAP-SCOPE-013` consumirá costos de mantenimiento, servicios, repuestos, inspecciones y calibraciones aquí delimitados, sin reabrir la propiedad financiera de NUMERA.

---


### ✅ CAP-SCOPE-013 — Evaluar instalaciones, mantenimiento, limpieza, inspecciones y calibración

**Estado:** APROBADA 
**Bloque:** E1 — Descubrimiento integral de operación, capacidades y cobertura de implementación  
**Dependencia cumplida:** `CAP-SCOPE-012` aprobada, incluido el visor económico  
**Tarea anterior:** `CAP-SCOPE-012`  
**Siguiente tarea reservada:** `CAP-SCOPE-014`  
**Familia evaluada:** `CAP-13 — Mantener instalaciones y condiciones de operación`  
**Implementación técnica:** no autorizada  
**Migraciones o cambios en Supabase:** no autorizados  
**Intervenciones, mantenimientos, limpieza, calibraciones, accesos u obras reales:** no autorizados  
**Requisitos generados:** `TREQ-NEXO-017`, `TREQ-NEXO-018`, `TREQ-INTEGRATION-018`  
**Tareas nuevas derivadas:** `NEXO-DOM-029` a `NEXO-DOM-038`, `NEXO-AUTH-031` y `032`, `NEXO-UX-043` a `048`  
**Actualización del registro de pruebas:** se entrega el archivo `04A` completo regenerado; quedan prohibidas las filas sueltas  

---

#### 1. Propósito

Definir cómo Vento Group deberá identificar, conservar, inspeccionar y mantener sus instalaciones y condiciones habilitantes sin confundir una sede con un espacio, un LOC con una instalación fija, una reparación locativa con el mantenimiento de un activo ni una inspección física con una auditoría de cumplimiento.

La tarea establece el tratamiento objetivo de mantenimiento locativo, reparaciones, limpieza, saneamiento, plagas, servicios, inspecciones, calibración, llaves, seguridad física, obras y novedades. También determina qué deberá gobernar NEXO, qué deberán aportar VISO/SST, ORIGO, NUMERA y proveedores externos, y qué controles impedirán cierres ficticios o evidencia incompleta.

---

#### 2. Pregunta de decisión

`CAP-SCOPE-013` responde:

```text
¿CÓMO DEBE VENTO GROUP MANTENER CADA ESPACIO E INSTALACIÓN
SEGURO, LIMPIO, DISPONIBLE, CALIBRADO Y APTO PARA OPERAR,
CON PLANES, ÓRDENES, EVIDENCIA Y RESPONSABLES TRAZABLES,
SIN DUPLICAR EL MANTENIMIENTO DE ACTIVOS NI CONFUNDIR
EJECUCIÓN EXTERNA CON PROPIEDAD DEL REGISTRO?
```

Quedan prohibidas equivalencias como:

```text
SEDE = ÁREA = ESPACIO = LOC = INSTALACIÓN = ACTIVO
```

```text
SOLICITUD = ORDEN DE TRABAJO = EJECUCIÓN = CIERRE
```

```text
LIMPIADO = VERIFICADO = LIBERADO
```

```text
INSPECCIÓN FÍSICA = INSPECCIÓN SST = AUDITORÍA DE CUMPLIMIENTO
```

```text
CALIBRACIÓN VIGENTE = EQUIPO DISPONIBLE PARA CUALQUIER USO
```

```text
PROVEEDOR EJECUTA = PROVEEDOR GOBIERNA LA INSTALACIÓN
```

---

#### 3. Fuentes consolidadas

- mapa canónico `CAP-13.01` a `CAP-13.11`;
- `CAP-MAP-004`, `CAP-MAP-013`, `CAP-MAP-014` y `BRECHA-CAP-009`;
- `CAP-SCOPE-001`, `CAP-SCOPE-003`, `CAP-SCOPE-005`, `CAP-SCOPE-006`, `CAP-SCOPE-007`, `CAP-SCOPE-008`, `CAP-SCOPE-011`, `CAP-SCOPE-012`, `CAP-SCOPE-016` y `CAP-SCOPE-018`;
- `NEXO-DOM-012`, `NEXO-DOM-017`, `NEXO-DOM-019`, `NEXO-DOM-025`, `NEXO-DOM-026` y `NEXO-DOM-028`;
- `NEXO-UX-030` a `NEXO-UX-042`;
- validaciones físicas de LOC y estructuras actuales de mantenimiento de activos;
- auditorías operativas, técnicas y preguntas ya registradas.

La evidencia actual confirma infraestructura parcial, no un ciclo integral de instalaciones.

---

#### 4. Alcance evaluado

- `CAP-13.01` — Inventariar espacios e instalaciones;
- `CAP-13.02` — Planear mantenimiento;
- `CAP-13.03` — Solicitar y ejecutar reparaciones;
- `CAP-13.04` — Gestionar limpieza y saneamiento;
- `CAP-13.05` — Controlar plagas;
- `CAP-13.06` — Controlar agua, energía, gas y servicios;
- `CAP-13.07` — Inspeccionar condiciones;
- `CAP-13.08` — Calibrar equipos;
- `CAP-13.09` — Gestionar llaves, acceso físico y seguridad;
- `CAP-13.10` — Gestionar obras y adecuaciones;
- `CAP-13.11` — Registrar y cerrar novedades;

---

#### 5. Clasificación de cobertura

| Subcapacidad | Nombre                                      | Tratamiento        | Propietaria objetivo           | Decisión                                                                                                                                                                                          |
| ------------ | ------------------------------------------- | ------------------ | ------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| CAP-13.01    | Inventariar espacios e instalaciones        | REUSE_OR_REFACTOR  | NEXO                           | Reutilizar empresas, sedes, áreas, LOC, planos y validaciones físicas, separando la instalación fija del activo móvil y completando identidad, jerarquía, condición, criticidad y disponibilidad. |
| CAP-13.02    | Planear mantenimiento                       | BUILD              | NEXO                           | Construir planes preventivos, predictivos y reglamentarios por instalación, componente, criticidad, frecuencia, responsable, ventana y evidencia.                                                 |
| CAP-13.03    | Solicitar y ejecutar reparaciones           | BUILD              | NEXO + ORIGO                   | Construir solicitudes, triage, aprobación, orden de trabajo, ejecución propia o externa, prueba, liberación, costo y cierre.                                                                      |
| CAP-13.04    | Gestionar limpieza y saneamiento            | BUILD              | NEXO + áreas operativas        | Construir planes maestros, procedimientos, frecuencias, responsables, productos, concentraciones, verificación, desviaciones y liberación del área.                                               |
| CAP-13.05    | Controlar plagas                            | INTEGRATE_EXTERNAL | NEXO + proveedor especializado | Gobernar internamente mapa, programa, visitas, dispositivos, hallazgos, acciones y certificados; integrar la ejecución especializada externa.                                                     |
| CAP-13.06    | Controlar agua, energía, gas y servicios    | BUILD              | NEXO + NUMERA                  | Construir contratos, puntos de servicio, medidores, lecturas, consumos, interrupciones, alertas, contingencias y conciliación de costo.                                                           |
| CAP-13.07    | Inspeccionar condiciones                    | REUSE_OR_REFACTOR  | NEXO + VISO/SST                | Reutilizar validaciones físicas y controles SST, separando inspección de condición locativa de inspección de cumplimiento o riesgo laboral.                                                       |
| CAP-13.08    | Calibrar equipos                            | REUSE_OR_REFACTOR  | NEXO + proveedor especializado | Extender mantenimiento de activos a control metrológico, patrones, tolerancias, certificados, vencimiento, fuera de tolerancia y evaluación de impacto.                                           |
| CAP-13.09    | Gestionar llaves, acceso físico y seguridad | BUILD              | NEXO + VISO                    | Construir inventario, custodia, entrega, devolución, vigencia, zonas, incidencias y cierre de accesos físicos sin mezclarlo con autorización digital.                                             |
| CAP-13.10    | Gestionar obras y adecuaciones              | BUILD              | NEXO + ORIGO + NUMERA          | Construir solicitud, alcance, presupuesto, aprobación, contratista, permisos, cronograma, afectación operativa, recepción y cierre.                                                               |
| CAP-13.11    | Registrar y cerrar novedades                | BUILD              | NEXO                           | Construir expediente único de novedad locativa con severidad, contención, responsable, relación con orden de trabajo, verificación y cierre.                                                      |

---

#### 6. Resumen de clasificación

| Tratamiento        | Cantidad |
| ------------------ | -------- |
| REUSE_OR_REFACTOR  | 3        |
| BUILD              | 7        |
| INTEGRATE_EXTERNAL | 1        |
| TOTAL              | 11       |

---

#### 7. Arquitectura propietaria

```text
NEXO
→ maestro de instalaciones, espacios y componentes fijos
→ condición, criticidad y disponibilidad
→ planes y órdenes de mantenimiento
→ reparaciones y novedades
→ limpieza, saneamiento y plagas
→ servicios, medidores e interrupciones
→ inspecciones físicas y calibración
→ llaves, acceso físico y obras
→ evidencia, verificación y cierre

VISO / SST
→ riesgos laborales, cumplimiento, responsables y acciones SST
→ consume hallazgos físicos; no recrea la instalación

ORIGO
→ compra y contratación de repuestos, materiales y servicios externos
→ no libera técnicamente la instalación

NUMERA
→ presupuesto, compromiso, gasto, costo y análisis
→ no aprueba la condición técnica

ÁREAS OPERATIVAS
→ ejecutan o verifican tareas asignadas según responsabilidad
→ no cambian planes ni cierran excepciones sin autorización

PROVEEDORES EXTERNOS
→ ejecutan servicios especializados y entregan evidencia
→ no reciben acceso amplio ni gobiernan el expediente
```

---

#### 8. Frontera entre instalación y activo

La propiedad se resolverá por el objeto principal:

```text
espacio, red, muro, piso, techo, drenaje, circuito, tubería,
puerta fija o componente incorporado al inmueble
→ instalación
```

```text
equipo identificable, trasladable o serializado
→ activo
```

Cuando una intervención afecte ambos objetos, existirá una orden principal y relaciones secundarias. No se crearán dos reparaciones competidoras para el mismo daño.

---

#### 9. Modelo mínimo de instalaciones

Cada instalación o componente fijo deberá conservar, cuando aplique:

- entidad, sede, edificio, piso, zona, espacio y área operativa;
- código estable y nombre humano;
- tipo, propósito y criticidad;
- plano, fotografías y documentación técnica;
- relación con LOC, activos y puntos de servicio;
- condición, disponibilidad y restricciones;
- responsable administrativo y responsable operativo;
- riesgos, requisitos sanitarios y ambientales;
- fecha de alta, modificación, suspensión y retiro;
- historial no destructivo.

Un LOC puede estar dentro de un espacio, pero no representa por sí solo toda la instalación.

---

#### 10. Planificación de mantenimiento

El plan deberá separar:

- mantenimiento preventivo;
- mantenimiento predictivo cuando exista dato suficiente;
- mantenimiento reglamentario;
- reparación correctiva;
- emergencia;
- inspección;
- calibración o verificación;
- obra o adecuación.

Cada plan tendrá versión, vigencia, criticidad, frecuencia, disparador, ventana, recursos, procedimiento, responsable, criterios de aceptación y evidencia requerida.

---

#### 11. Solicitud, orden y cierre

El ciclo objetivo será:

```text
novedad o necesidad
→ clasificación y contención
→ solicitud
→ evaluación y prioridad
→ aprobación
→ orden de trabajo
→ asignación interna o externa
→ ejecución
→ prueba o verificación
→ liberación del espacio
→ cierre técnico
→ cierre económico y documental
```

Solicitud, orden, visita, ejecución, prueba, liberación y cierre serán objetos o estados distintos. Una fotografía o factura no cerrará por sí sola la intervención.

---

#### 12. Limpieza y saneamiento

El programa maestro deberá definir por espacio, superficie o instalación:

- procedimiento vigente;
- frecuencia y disparadores extraordinarios;
- responsable y sustituto;
- producto, lote, concentración y tiempo de contacto;
- herramientas y elementos de protección;
- controles de contaminación cruzada;
- verificación visual, instrumental o microbiológica cuando aplique;
- resultado, desviación, repetición y liberación.

La ejecución debe ser simple para el trabajador: tarea, pasos críticos, confirmación y evidencia. Las explicaciones extensas permanecerán bajo demanda.

---

#### 13. Control de plagas

NEXO conservará:

- programa y mapa;
- puntos o dispositivos identificados;
- proveedor y habilitaciones;
- visitas programadas y ejecutadas;
- productos y fichas aplicables;
- capturas, tendencias y hallazgos;
- acciones correctivas;
- restricciones, tiempos de reingreso y liberación;
- certificados, informes y vencimientos.

La ejecución podrá ser externa, pero el expediente, las acciones y el estado de la instalación seguirán siendo internos.

---

#### 14. Agua, energía, gas y servicios

El dominio deberá representar:

- proveedor, contrato y titular;
- punto de servicio y medidor;
- unidad y método de lectura;
- lectura inicial, final y periodo;
- consumo, costo y anomalía;
- corte, interrupción, fuga o pérdida;
- contingencia y capacidad alternativa;
- relación con producción, frío, seguridad y continuidad;
- factura y conciliación con NUMERA.

Una factura no sustituye la lectura física ni una lectura sustituye la factura.

---

#### 15. Inspecciones físicas

La inspección locativa verificará condición física y aptitud operativa. VISO/SST conservará la evaluación de obligación, peligro laboral o cumplimiento.

Cada inspección tendrá plantilla versionada, alcance, criterios, actor, fecha, resultados, evidencia, hallazgos y acciones. Un hallazgo crítico podrá bloquear disponibilidad, pero requerirá regla y autoridad explícitas.

---

#### 16. Calibración y control metrológico

Para cada instrumento o equipo calibrable se conservarán:

- magnitud, unidad, rango y resolución;
- tolerancia y criterio de aceptación;
- método, patrón y trazabilidad;
- laboratorio o responsable;
- certificado y resultados;
- fecha, vencimiento y estado;
- ajustes, sellos y restricciones;
- evaluación de impacto cuando quede fuera de tolerancia;
- relación con lotes, controles o decisiones afectadas.

`calibrado`, `verificado`, `ajustado`, `fuera de tolerancia` y `no apto` no serán equivalentes.

---

#### 17. Llaves, acceso físico y seguridad

Se administrarán llaves, controles, tarjetas, códigos y otros medios físicos mediante:

- identidad estable;
- zona o puerta habilitada;
- custodia y responsable;
- entrega, aceptación, devolución y pérdida;
- vigencia, suspensión y revocación;
- duplicados autorizados;
- incidentes y cambio de cerradura o código;
- conciliación al retiro o cambio de función.

La autorización digital de SHELL y el acceso físico serán dominios separados y correlacionables.

---

#### 18. Obras y adecuaciones

Cada obra conservará alcance, justificación, presupuesto, aprobación, diseños, permisos, contratista, cronograma, riesgos, cierres temporales, interferencias, cambios, pruebas, recepción, garantía y cierre.

No se tratará una obra como una orden de mantenimiento ordinaria cuando cambie capacidad, distribución, uso, instalaciones o condiciones de operación.

---

#### 19. Novedades y disponibilidad

Toda novedad tendrá:

- instalación o espacio afectado;
- categoría, severidad y criticidad;
- reporte original y evidencia;
- impacto y contención;
- disponibilidad resultante;
- responsable y SLA;
- relación con inspección, orden, incidente o continuidad;
- resolución, verificación y cierre;
- reapertura no destructiva.

Cerrar una novedad no borrará el daño ni liberará automáticamente el área.

---

#### 20. Integración con compras y finanzas

ORIGO originará contratos, órdenes y recepción empresarial del servicio o material. NEXO confirmará la ejecución técnica y la condición física. NUMERA recibirá compromisos, gastos y costos.

```text
servicio solicitado
≠ servicio contratado
≠ visita ejecutada
≠ trabajo aceptado técnicamente
≠ factura aprobada
≠ pago realizado
```

La correlación deberá impedir pago sin soporte, cierre técnico sin ejecución o doble gasto por reintentos.

---

#### 21. Evidencia y conservación

Planos, fotografías, certificados, actas, informes, fichas, permisos y registros deberán vincularse al hecho correspondiente. Se aplicarán clasificación, vigencia, acceso mínimo, retención y sello de tiempo conforme a `CAP-SCOPE-016`.

La evidencia podrá capturarse offline, pero su sincronización será idempotente y conservará actor, dispositivo, hora local, hora de servidor y estado de validación.

---

#### 22. Autorización y segregación

Se separarán como mínimo:

- consultar;
- reportar novedad;
- solicitar intervención;
- priorizar;
- aprobar gasto o contratación;
- asignar;
- ejecutar;
- registrar evidencia;
- verificar;
- liberar;
- cerrar;
- reabrir;
- administrar llaves;
- aprobar obra;
- exportar información sensible.

Un proveedor externo recibirá acceso temporal y mínimo mediante portal o enlace controlado, no un rol interno amplio.

---

#### 23. Experiencia objetivo

La experiencia deberá organizarse por trabajo pendiente, no por tablas técnicas:

- `Qué requiere atención`;
- `Qué vence pronto`;
- `Qué está bloqueando la operación`;
- `Qué debe ejecutarse hoy`;
- `Qué espera verificación`;
- `Qué quedó fuera de servicio`.

Las pantallas operativas mostrarán acciones, estado y evidencia necesaria. Procedimientos completos, fórmulas y documentación técnica estarán disponibles bajo demanda.

---

#### 24. Operación offline e idempotencia

La captura móvil podrá operar con conectividad intermitente. Cada ejecución, lectura, fotografía, firma, cierre o cambio de estado tendrá clave idempotente. La sincronización deberá detectar duplicados, conflictos, orden de eventos y versiones obsoletas sin sobrescribir silenciosamente el expediente.

---

#### 25. Datos históricos y migración

No se migrarán hojas, chats, fotos o certificados masivamente sin:

1. identificar fuente y propietario;
2. deduplicar instalaciones y equipos;
3. mapear sede, espacio, objeto y fecha;
4. distinguir evidencia vigente de archivo histórico;
5. reconciliar trabajos abiertos;
6. conservar origen y nivel de confianza.

La ausencia de datos históricos no autoriza inventarlos.

---

#### 26. Preguntas pendientes

No se crean preguntas nuevas.

Se reutilizan:

- `DAT-16`, para localizar inspecciones de seguridad y salud actuales;
- `OPE-04` a `OPE-11`, para autoridades de aprobación y excepción cuando correspondan;
- auditorías operativas existentes para comprobar ejecución manual, proveedores, formularios y fuentes sombra.

Las respuestas ya entregadas se consolidarán posteriormente en lote. No bloquean la clasificación objetivo de esta tarea.

---

#### 27. Hallazgos

| ID                  | Hallazgo                                                                                                                                      | Severidad | Tarea propietaria                                                      | Puerta   |
| ------------------- | --------------------------------------------------------------------------------------------------------------------------------------------- | --------- | ---------------------------------------------------------------------- | -------- |
| H-CAP-SCOPE-013-001 | CAP-13 no tiene una aplicación ni un ciclo integral comprobado; sedes, LOC y activos solo representan partes del contexto.                    | crítica   | NEXO-DOM-029 a NEXO-DOM-038; NEXO-UX-043 a NEXO-UX-048                 | E2/E3/E5 |
| H-CAP-SCOPE-013-002 | Sede, área, espacio, LOC, instalación fija, componente y activo pueden confundirse y generar identidades duplicadas.                          | crítica   | NEXO-DOM-029; NEXO-DOM-019; CAP-SCOPE-001; CAP-SCOPE-007               | E2/E3    |
| H-CAP-SCOPE-013-003 | No existe una jerarquía locativa canónica que represente pisos, zonas, cuartos, redes, puntos de servicio y componentes fijos.                | alta      | NEXO-DOM-029; NEXO-UX-043                                              | E2/E3    |
| H-CAP-SCOPE-013-004 | La frontera entre mantenimiento de activo móvil y mantenimiento de instalación fija necesita resolución por objeto principal.                 | crítica   | NEXO-DOM-012; NEXO-DOM-026; NEXO-DOM-029; NEXO-DOM-030                 | E2       |
| H-CAP-SCOPE-013-005 | No existe plan locativo versionado con criticidad, frecuencia, ventana, responsable, recursos y evidencia.                                    | crítica   | NEXO-DOM-030; NEXO-UX-044                                              | E2/E3    |
| H-CAP-SCOPE-013-006 | Solicitud, orden de trabajo, ejecución, prueba, liberación y cierre no están modelados como estados independientes.                           | crítica   | NEXO-DOM-030; NEXO-AUTH-032; NEXO-UX-044                               | E2/E3    |
| H-CAP-SCOPE-013-007 | No se separan mantenimiento planificado, reparación correctiva, emergencia y obra de adecuación.                                              | alta      | NEXO-DOM-030; NEXO-DOM-037; NEXO-DOM-038                               | E2       |
| H-CAP-SCOPE-013-008 | No existe programa maestro de limpieza y saneamiento por área, superficie, equipo fijo y riesgo.                                              | crítica   | NEXO-DOM-031; NEXO-UX-045                                              | E2/E3    |
| H-CAP-SCOPE-013-009 | La ejecución de limpieza no conserva de forma canónica actor, hora, producto, concentración, lote, evidencia y verificación.                  | crítica   | NEXO-DOM-031; NEXO-AUTH-031; NEXO-UX-045                               | E2/E3    |
| H-CAP-SCOPE-013-010 | Químicos de limpieza, fichas, incompatibilidades, diluciones y consumos no están integrados con catálogo e inventario.                        | alta      | NEXO-DOM-031; CAP-SCOPE-004; CAP-SCOPE-006; CAP-SCOPE-016              | E2/E3    |
| H-CAP-SCOPE-013-011 | Control de plagas depende de ejecución especializada, pero no existe expediente interno de mapa, dispositivos, visitas, hallazgos y acciones. | crítica   | NEXO-DOM-032; NEXO-UX-045; INT-EXT-001 a INT-EXT-020                   | E2/E3    |
| H-CAP-SCOPE-013-012 | No existe ciclo para servicios públicos, medidores, contratos, lecturas, interrupciones, calidad o contingencias.                             | crítica   | NEXO-DOM-033; NEXO-UX-046; CAP-SCOPE-018                               | E2/E3    |
| H-CAP-SCOPE-013-013 | Consumos anómalos de agua, energía o gas no se correlacionan con sede, producción, falla, factura y costo.                                    | alta      | NEXO-DOM-033; NUMERA-DOM-002; NUMERA-DOM-005; CAP-SCOPE-017            | E2/E3/E5 |
| H-CAP-SCOPE-013-014 | Inspección física de instalación e inspección de cumplimiento o riesgo laboral pueden duplicarse sin frontera.                                | crítica   | NEXO-DOM-034; CAP-SCOPE-003; PROC-CAT-009 a PROC-CAT-018; PROC-ACTOR-003; UX-ADMIN-001 a UX-ADMIN-005 | E2       |
| H-CAP-SCOPE-013-015 | Las validaciones LOC actuales son una base parcial, pero no cubren instalaciones completas ni plantillas versionadas por riesgo.              | alta      | NEXO-DOM-029; NEXO-DOM-034; NEXO-UX-043; NEXO-UX-046                   | E2/E3    |
| H-CAP-SCOPE-013-016 | Hallazgos de inspección no tienen enlace obligatorio con contención, acción, orden de trabajo, responsable y verificación.                    | crítica   | NEXO-DOM-034; NEXO-DOM-038; NEXO-UX-046                                | E2/E3    |
| H-CAP-SCOPE-013-017 | El mantenimiento de activos actual no constituye un sistema completo de control metrológico.                                                  | crítica   | NEXO-DOM-026; NEXO-DOM-035; NEXO-UX-046                                | E2/E3    |
| H-CAP-SCOPE-013-018 | No existe maestro de magnitud, rango, tolerancia, patrón, método, laboratorio, certificado y próxima calibración.                             | crítica   | NEXO-DOM-035; NEXO-UX-046                                              | E2/E3    |
| H-CAP-SCOPE-013-019 | Un resultado fuera de tolerancia no activa evaluación de impacto sobre mediciones, lotes, calidad o decisiones previas.                       | crítica   | NEXO-DOM-035; CAP-SCOPE-008; CAP-SCOPE-016                             | E2/E3/E5 |
| H-CAP-SCOPE-013-020 | Equipo calibrable, instrumento portátil e instalación fija pueden recibir dos mantenimientos o quedar sin propietario.                        | alta      | NEXO-DOM-019; NEXO-DOM-026; NEXO-DOM-029; NEXO-DOM-035                 | E2       |
| H-CAP-SCOPE-013-021 | Llaves, controles, tarjetas y códigos físicos no tienen inventario, custodia, vigencia, devolución y revocación canónicos.                    | crítica   | NEXO-DOM-036; NEXO-AUTH-031; NEXO-UX-047                               | E2/E3    |
| H-CAP-SCOPE-013-022 | Acceso físico y autorización digital pueden confundirse; SHELL no debe gobernar llaves ni cerraduras.                                         | alta      | NEXO-DOM-036; CAP-SCOPE-001; CAP-SCOPE-015                             | E2       |
| H-CAP-SCOPE-013-023 | Obras y adecuaciones carecen de expediente integral de alcance, aprobación, contratista, permisos, afectación y recepción.                    | crítica   | NEXO-DOM-037; NEXO-UX-047; ORIGO-UX-014; NUMERA-DOM-005                | E2/E3    |
| H-CAP-SCOPE-013-024 | No existe control canónico de cierres temporales, áreas fuera de servicio, rutas alternativas y liberación posterior.                         | crítica   | NEXO-DOM-030; NEXO-DOM-037; NEXO-DOM-038; CAP-SCOPE-018                | E2/E3    |
| H-CAP-SCOPE-013-025 | Contratistas externos pueden requerir acceso y evidencia sin convertirse en usuarios internos amplios.                                        | crítica   | NEXO-AUTH-031; NEXO-AUTH-032; INT-EXT-001 a INT-EXT-020; CAP-SCOPE-016 | E2/E3    |
| H-CAP-SCOPE-013-026 | Certificados, actas, fotos, planos y reportes locativos no tienen política de clasificación, vigencia y conservación específica.              | alta      | NEXO-DOM-017; CAP-SCOPE-016; EVID-ARC-001 a EVID-ARC-010               | E2/E4    |
| H-CAP-SCOPE-013-027 | ORIGO debe contratar bienes y servicios, pero no gobernar el estado físico ni cerrar técnicamente la instalación.                             | alta      | CAP-SCOPE-005; NEXO-DOM-030 a NEXO-DOM-037; TREQ-INTEGRATION-010       | E2/E3    |
| H-CAP-SCOPE-013-028 | NUMERA debe recibir costos y compromisos, pero no aprobar técnicamente reparación, calibración o liberación.                                  | alta      | CAP-SCOPE-012; NEXO-DOM-030; NEXO-DOM-035; NEXO-DOM-037                | E2/E3    |
| H-CAP-SCOPE-013-029 | La operación móvil u offline puede duplicar ejecuciones, fotos, lecturas, cierres o firmas sin idempotencia.                                  | crítica   | NEXO-DOM-031 a NEXO-DOM-038; INT-DB-008; QUEUE-ARC-001 a QUEUE-ARC-010 | E3/E5    |
| H-CAP-SCOPE-013-030 | No está certificada la segregación entre reportar, aprobar, ejecutar, verificar, liberar, cerrar y reabrir.                                   | crítica   | NEXO-AUTH-031; NEXO-AUTH-032; AUTH-QA-001 a AUTH-QA-030                | E2/E3/E5 |

---

#### 28. Tareas nuevas derivadas

| ID            | Tarea                                                                                                    | Bloque                         | Momento                                            |
| ------------- | -------------------------------------------------------------------------------------------------------- | ------------------------------ | -------------------------------------------------- |
| NEXO-DOM-029  | Definir jerarquía canónica de instalaciones, espacios, componentes fijos, puntos de servicio y condición | BLOQUE K — NEXO / dominio      | E2, antes del modelo de datos de instalaciones     |
| NEXO-DOM-030  | Definir planes de mantenimiento, solicitudes, órdenes de trabajo, reparación, prueba y liberación        | BLOQUE K — NEXO / dominio      | E2-E3, antes de implementar mantenimiento locativo |
| NEXO-DOM-031  | Definir limpieza, saneamiento, procedimientos, frecuencias, químicos, verificación y liberación          | BLOQUE K — NEXO / dominio      | E2-E3, antes de digitalizar rutinas de limpieza    |
| NEXO-DOM-032  | Definir control de plagas, mapa, dispositivos, visitas, hallazgos, acciones y certificados               | BLOQUE K — NEXO / dominio      | E2-E3, antes de integrar proveedor de plagas       |
| NEXO-DOM-033  | Definir servicios, medidores, lecturas, consumos, interrupciones, alertas y contingencias                | BLOQUE K — NEXO / dominio      | E2-E3, antes de automatizar consumos o alertas     |
| NEXO-DOM-034  | Definir inspecciones físicas, plantillas versionadas, hallazgos y acciones correctivas                   | BLOQUE K — NEXO / dominio      | E2, coordinada con CAP-SCOPE-003                   |
| NEXO-DOM-035  | Definir control metrológico, calibración, verificación, tolerancias, certificados e impacto              | BLOQUE K — NEXO / dominio      | E2-E3, antes de liberar equipos críticos           |
| NEXO-DOM-036  | Definir llaves, credenciales físicas, zonas, custodia, entrega, devolución e incidencias                 | BLOQUE K — NEXO / dominio      | E2-E3, antes del control físico de acceso          |
| NEXO-DOM-037  | Definir obras, adecuaciones, contratistas, permisos, afectación operativa, recepción y garantía          | BLOQUE K — NEXO / dominio      | E2-E3, antes de gestionar proyectos locativos      |
| NEXO-DOM-038  | Definir novedades locativas, severidad, contención, escalamiento, resolución y cierre                    | BLOQUE K — NEXO / dominio      | E2, antes del diseño de bandejas y alertas         |
| NEXO-AUTH-031 | Proteger instalaciones, mantenimiento, limpieza, inspecciones, calibración, acceso físico y obras        | BLOQUE K — NEXO / autorización | E2-E3, antes de implementar acciones               |
| NEXO-AUTH-032 | Separar reporte, solicitud, aprobación, ejecución, verificación, liberación, cierre y reapertura         | BLOQUE K — NEXO / autorización | E2-E3, antes de pruebas integrales                 |
| NEXO-UX-043   | Diseñar registro y mapa simple de instalaciones, espacios, condición y disponibilidad                    | BLOQUE K2 — NEXO / experiencia | E2, después de NEXO-DOM-029                        |
| NEXO-UX-044   | Diseñar solicitudes, órdenes de trabajo, mantenimiento y reparaciones                                    | BLOQUE K2 — NEXO / experiencia | E2, después de NEXO-DOM-030                        |
| NEXO-UX-045   | Diseñar limpieza, saneamiento, plagas y evidencia operativa por área                                     | BLOQUE K2 — NEXO / experiencia | E2, después de NEXO-DOM-031 y 032                  |
| NEXO-UX-046   | Diseñar inspecciones, calibración, servicios, medidores y alertas                                        | BLOQUE K2 — NEXO / experiencia | E2, después de NEXO-DOM-033 a 035                  |
| NEXO-UX-047   | Diseñar llaves, acceso físico, obras, cierres temporales y novedades                                     | BLOQUE K2 — NEXO / experiencia | E2, después de NEXO-DOM-036 a 038                  |
| NEXO-UX-048   | Validar el prototipo con Operaciones, Producción, Limpieza, Mantenimiento, SST y responsables de sede    | BLOQUE K2 — NEXO / experiencia | E2, antes de remitir a E5                          |

---

#### 29. Ubicación exacta de las tareas nuevas

En `docs/plan-canonico/modular/bloques/K_NEXO/01_EXTENSION_DE_DOMINIO_LPN_CONTENEDORES_ACTIVOS_Y_REUTILIZABLES.md` o su archivo modular sucesor:

- agregar `NEXO-DOM-029` a `NEXO-DOM-038` después de `NEXO-DOM-028`;
- agregar `NEXO-AUTH-031` y `NEXO-AUTH-032` después de `NEXO-AUTH-030`;
- agregar `NEXO-UX-043` a `NEXO-UX-048` después de `NEXO-UX-042`.

Si el bloque se divide antes de ejecutar estas tareas, los identificadores se conservarán y el manifiesto deberá registrar la nueva ruta.

---

#### 30. Requisitos de prueba generados

El registro `04A` completo incorpora:

```text
TREQ-NEXO-017
TREQ-NEXO-018
TREQ-INTEGRATION-018
```

- `TREQ-NEXO-017` protege identidad locativa, mantenimiento, reparación, órdenes, disponibilidad y cierre.
- `TREQ-NEXO-018` protege limpieza, plagas, servicios, inspecciones, calibración, acceso físico, obras y novedades.
- `TREQ-INTEGRATION-018` protege la coordinación con ORIGO, NUMERA, VISO/SST, continuidad y proveedores externos.

---

#### 31. Dependencias principales

- `CAP-SCOPE-001`: empresas, sedes, áreas y responsabilidades;
- `CAP-SCOPE-003`: riesgos, inspecciones SST y cumplimiento;
- `CAP-SCOPE-005`: proveedores, contratos y servicios;
- `CAP-SCOPE-006`: insumos y existencias;
- `CAP-SCOPE-007`: activos, mantenimiento, repuestos y calibración parcial;
- `CAP-SCOPE-008`: calidad, inocuidad y liberación productiva;
- `CAP-SCOPE-012`: costos, presupuestos y obligaciones;
- `CAP-SCOPE-016`: documentos, privacidad y evidencia;
- `CAP-SCOPE-018`: continuidad y contingencias.

---

#### 32. Criterios de aceptación

`CAP-SCOPE-013` podrá aprobarse cuando:

- las once subcapacidades estén clasificadas;
- NEXO quede como propietaria del expediente físico y locativo;
- activo móvil e instalación fija estén separados;
- mantenimiento, reparación, limpieza, plagas, servicios, inspección, calibración, acceso, obra y novedad tengan ciclos explícitos;
- ejecución externa no transfiera propiedad del registro;
- ORIGO, NUMERA y VISO/SST tengan fronteras claras;
- se creen tareas específicas para cada brecha;
- los tres `TREQ` queden dentro del `04A` completo;
- no se creen preguntas repetidas;
- no se autorice implementación;
- `CAP-SCOPE-014` permanezca como única continuidad inmediata.

---

#### 33. Lo que esta tarea no autoriza

- crear tablas, RPC, migraciones o permisos;
- iniciar mantenimientos, reparaciones, limpieza, fumigaciones o calibraciones;
- comprar servicios o equipos;
- entregar llaves o modificar accesos;
- cerrar áreas o ejecutar obras;
- subir datos personales o documentos sensibles;
- reemplazar proveedores actuales;
- declarar apta una instalación por la sola existencia de una pantalla;
- iniciar `CAP-SCOPE-014`.

---

#### 34. Resultado y continuidad

Al aprobarse quedará definida la cadena:

```text
instalación y condición
→ plan o novedad
→ solicitud y orden
→ ejecución interna o externa
→ verificación y liberación
→ evidencia, costo y cierre
```

La continuidad será exclusivamente:

```text
CAP-SCOPE-014
— Evaluar marketing, campañas y contenido
```

---

#### 35. Estado de aprobación

```text
PROPUESTA PARA APROBACIÓN — NO APROBADA
```

No deberá marcarse como aprobada hasta que el usuario responda expresamente `APROBADO`.


### ✅ CAP-SCOPE-014 — Evaluar marketing, campañas y contenido

**Estado:** APROBADA  
**Bloque:** E1 — Descubrimiento integral de operación, capacidades y cobertura de implementación  
**Dependencia cumplida:** `CAP-SCOPE-013` aprobada  
**Tarea anterior:** `CAP-SCOPE-013`  
**Siguiente tarea reservada:** `CAP-SCOPE-015`  
**Familia evaluada:** `CAP-14 — Comunicar, promocionar y desarrollar ventas`  
**Aplicación objetivo:** `AURA`, sujeta a la puerta previa `AURA-AUD-001` a `AURA-AUD-012`  
**Implementación técnica:** no autorizada  
**Publicaciones, campañas, promociones, mensajes o respuestas reales:** no autorizadas  
**Requisitos generados:** `TREQ-AURA-001`, `TREQ-AURA-002`, `TREQ-AURA-003`, `TREQ-INTEGRATION-019`  
**Tareas nuevas derivadas:** `AURA-DOM-001` a `010`, `AURA-AUTH-001` a `004`, `AURA-UX-001` a `008`, `AURA-INT-001` y `002`  
**Actualización del registro de pruebas:** se entrega el archivo `04A` completo regenerado; quedan prohibidas las filas sueltas  

---

#### 1. Propósito

Definir qué valor empresarial deberá aportar AURA y cómo se integrará al ecosistema Vento OS sin convertirse en una simple agenda de publicaciones, un generador de textos sin contexto o una nueva fuente competidora de productos, precios, clientes y ventas.

AURA se define como el **sistema operativo de marketing y desarrollo comercial**: organiza marca, planificación, creatividad, campañas, medios, oportunidades, reputación y aprendizaje. También actúa como copiloto creativo y analítico, pero no reemplaza el criterio humano, no publica de forma autónoma por defecto y no inventa hechos empresariales.

---

#### 2. Decisión principal

```text
AURA
= SISTEMA OPERATIVO DE MARKETING
+ MEMORIA DE MARCA
+ CALENDARIO Y CAMPAÑAS
+ ESTUDIO CREATIVO ASISTIDO
+ ORQUESTACIÓN MULTICANAL
+ OPORTUNIDADES COMERCIALES
+ REPUTACIÓN
+ MEDICIÓN Y APRENDIZAJE
```

AURA no será:

```text
solo calendario de posts
solo generador de captions
solo tablero de likes
solo CRM
solo administrador de cupones
solo bandeja de redes
```

La IA propondrá, adaptará, resumirá, comparará y alertará. Las decisiones sensibles seguirán siendo humanas y auditables.

---

#### 3. Puerta obligatoria de continuidad

El bloque canónico vigente mantiene AURA diferida y exige confirmar repositorio, estado real, usuarios, rutas, procesos, datos, permisos y relaciones antes de decidir continuidad, reemplazo o retiro.

Por tanto:

```text
CAP-SCOPE-014
→ define el producto objetivo y sus fronteras

AURA-AUD-001 a AURA-AUD-012
→ comprueban qué existe realmente

AURA-AUD-010
→ autoriza continuar, reemplazar o retirar

AURA-DOM / AUTH / UX / INT
→ permanecen bloqueadas hasta esa decisión
```

La presente tarea no presupone que el producto actual de AURA sea reutilizable.

---

#### 4. Alcance evaluado

- `CAP-14.01` — Definir identidad y mensajes;
- `CAP-14.02` — Planear comunicación y promociones;
- `CAP-14.03` — Crear y aprobar contenido;
- `CAP-14.04` — Publicar y administrar medios;
- `CAP-14.05` — Gestionar campañas;
- `CAP-14.06` — Gestionar promociones y cupones;
- `CAP-14.07` — Captar oportunidades de venta;
- `CAP-14.08` — Gestionar ventas a empresas;
- `CAP-14.09` — Gestionar catering y eventos comerciales;
- `CAP-14.10` — Medir resultados de comunicación y promoción;
- `CAP-14.11` — Gestionar reputación y comentarios públicos;

---

#### 5. Clasificación de cobertura

| Subcapacidad | Nombre                                       | Tratamiento        | Propietaria objetivo         | Decisión                                                                                                                                                              |
| ------------ | -------------------------------------------- | ------------------ | ---------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| CAP-14.01    | Definir identidad y mensajes                 | REUSE_OR_REFACTOR  | AURA                         | Consolidar guías, identidades, tono, mensajes, claims, restricciones y memoria de marca existentes en un sistema versionado por marca, sede, canal y audiencia.       |
| CAP-14.02    | Planear comunicación y promociones           | BUILD              | AURA + NUMERA                | Construir objetivos, audiencias, calendario, brief, presupuesto, capacidad, dependencias, responsables y aprobación para cada iniciativa.                             |
| CAP-14.03    | Crear y aprobar contenido                    | BUILD              | AURA                         | Construir estudio creativo asistido, biblioteca de activos, derechos, variantes, revisión, aprobación, versionado y trazabilidad desde el brief hasta la pieza final. |
| CAP-14.04    | Publicar y administrar medios                | INTEGRATE_EXTERNAL | AURA + canales externos      | Integrar cuentas y APIs de Meta, Instagram, TikTok, Google, WhatsApp, correo y otros medios; AURA orquesta, pero cada canal conserva su autoridad externa.            |
| CAP-14.05    | Gestionar campañas                           | BUILD              | AURA                         | Construir campañas con objetivo, hipótesis, audiencia, oferta, piezas, canales, presupuesto, calendario, experimento, resultados y cierre aprendido.                  |
| CAP-14.06    | Gestionar promociones y cupones              | REUSE_OR_REFACTOR  | AURA + PULSO + PASS + NUMERA | AURA gobierna intención y comunicación; PULSO/PASS ejecutan elegibilidad y redención; NUMERA valida guardas económicas y resultado.                                   |
| CAP-14.07    | Captar oportunidades de venta                | INTEGRATE_EXTERNAL | AURA + canales + PASS/VISO   | Unificar formularios, mensajes, WhatsApp, Instagram, ManyChat y referidos en una bandeja de oportunidades con consentimiento, origen y seguimiento.                   |
| CAP-14.08    | Gestionar ventas a empresas                  | BUILD              | AURA + PULSO + NUMERA        | Construir prospección, calificación, propuesta, seguimiento y pipeline B2B; el pedido aceptado pasa a PULSO y la cartera a NUMERA.                                    |
| CAP-14.09    | Gestionar catering y eventos comerciales     | BUILD              | AURA + PULSO + FOGO + NEXO   | Construir oportunidad, brief, propuesta, disponibilidad, capacidad, aprobación y seguimiento; la ejecución operacional permanece fuera de AURA.                       |
| CAP-14.10    | Medir resultados de comunicación y promoción | BUILD              | AURA + NUMERA                | Construir atribución con confianza, conversiones, redenciones, venta incremental, margen, aprendizaje, experimentos y comparación contra objetivo.                    |
| CAP-14.11    | Gestionar reputación y comentarios públicos  | INTEGRATE_EXTERNAL | AURA + VISO/PASS             | Integrar reseñas, comentarios y menciones; AURA clasifica y propone respuesta, pero reclamos formales se escalan al expediente de servicio.                           |

---

#### 6. Resumen de clasificación

| Tratamiento        | Cantidad |
| ------------------ | -------- |
| REUSE_OR_REFACTOR  | 2        |
| BUILD              | 6        |
| INTEGRATE_EXTERNAL | 3        |
| TOTAL              | 11       |

---

#### 7. Arquitectura propietaria

```text
AURA
→ marca, mensajes y memoria creativa
→ briefs, calendario, campañas y piezas
→ aprobación y publicación
→ oportunidades y pipeline comercial
→ reputación pública
→ atribución y aprendizaje de marketing

NEXO
→ productos, presentaciones y atributos maestros aprobados
→ no entrega costos, stock o datos técnicos salvo contrato autorizado

PULSO
→ pedido, venta, cobro y ejecución transaccional de promociones

PASS
→ identidad del cliente, consentimiento, comunicación personal,
  fidelización y superficie de beneficios

NUMERA
→ margen, presupuesto, costo, rentabilidad y efecto económico

VISO / SERVICIO
→ casos, reclamos, escalamiento y resolución administrativa

FOGO / NEXO
→ capacidad productiva y disponibilidad operacional

CANALES EXTERNOS
→ publicación, mensajería, reseñas y métricas nativas
→ nunca son la única fuente del expediente de AURA
```

---

#### 8. Fronteras conceptuales obligatorias

```text
marca ≠ empresa ≠ sede ≠ canal
```

```text
objetivo ≠ campaña ≠ contenido ≠ publicación ≠ promoción
```

```text
borrador de IA ≠ pieza aprobada ≠ publicación efectiva
```

```text
intención promocional ≠ regla transaccional ≠ redención
```

```text
lead ≠ cliente ≠ oportunidad ≠ propuesta ≠ pedido
```

```text
comentario público ≠ reclamo formal ≠ caso resuelto
```

```text
interacción ≠ conversión ≠ venta incremental ≠ rentabilidad
```

---

#### 9. AURA como memoria de marca

AURA mantendrá perfiles versionados por marca con:

- propósito, personalidad, tono y palabras permitidas o prohibidas;
- audiencias, necesidades, objeciones y contextos de uso;
- claims aprobados y evidencia que los respalda;
- identidad visual, plantillas, tipografía y reglas de composición;
- productos, categorías y mensajes autorizados desde sus fuentes;
- campañas, piezas y aprendizajes históricos;
- restricciones legales, reputacionales y de canal;
- vigencia y responsable de cada regla.

La memoria de marca no será un prompt libre ni una carpeta sin versionado.

---

#### 10. Inicio diario simple

La pantalla principal de AURA deberá responder sin entrenamiento técnico:

```text
¿QUÉ DEBEMOS HACER HOY?
¿QUÉ ESTÁ PENDIENTE DE APROBACIÓN?
¿QUÉ SE PUBLICA PRÓXIMAMENTE?
¿QUÉ OPORTUNIDAD MERECE ATENCIÓN?
¿QUÉ CAMPAÑA NECESITA CORRECCIÓN?
```

La vista diaria tendrá, como máximo:

- prioridades;
- calendario inmediato;
- aprobaciones;
- alertas de canal;
- oportunidades comerciales;
- resultados que requieren acción.

Configuraciones, fórmulas, prompts, metadatos y explicaciones extensas estarán bajo demanda, no ocupando la pantalla cotidiana.

---

#### 11. Planificador de comunicación y campañas

Cada iniciativa partirá de un brief guiado con pocas preguntas:

1. qué resultado empresarial busca;
2. a quién se dirige;
3. qué oferta o mensaje propone;
4. qué restricciones existen;
5. dónde y cuándo se comunicará.

AURA completará el borrador con datos autorizados, sugerirá dependencias y advertirá si falta precio, disponibilidad, margen, capacidad, consentimiento, aprobación o material. Ninguna campaña quedará definida solo por un título y fechas.

---

#### 12. Estudio creativo asistido

AURA podrá:

- proponer conceptos, nombres, hooks, copies, guiones y llamadas a la acción;
- crear variantes por canal, formato, audiencia y longitud;
- transformar una sesión de fotos o video en un kit de lanzamiento;
- reutilizar material aprobado sin duplicar archivos;
- generar shot lists, briefs para diseño y planes de grabación;
- comparar variantes contra las reglas de marca;
- detectar datos no comprobados o promesas riesgosas;
- preparar versiones para post, historia, reel, WhatsApp, correo y PASS.

Cada salida conservará fuentes utilizadas, modelo o proveedor, prompt o instrucción relevante, versión, autor, revisores y aprobación.

---

#### 13. Grounding y límites de inteligencia artificial

La IA no podrá inventar:

- ingredientes, propiedades o beneficios;
- precios, descuentos o fechas;
- disponibilidad o capacidad;
- resultados de campaña;
- testimonios, reseñas o cifras;
- condiciones legales o promociones.

Toda afirmación empresarial deberá derivarse de una fuente autorizada o marcarse como propuesta pendiente. Los datos enviados a proveedores externos se minimizarán y se regirán por contrato, finalidad, retención y consentimiento.

---

#### 14. Biblioteca de activos y fábrica de contenido

Fotografías, videos, diseños, audios, logos, plantillas y documentos conservarán:

- propietario y marca;
- derechos, licencia, autorización de personas y vigencia;
- campaña, producto y sede relacionados;
- original y derivados;
- estado de revisión;
- canales y usos permitidos;
- historial de edición;
- fecha de retiro o reemplazo.

AURA podrá redimensionar, subtitular, recortar y adaptar automáticamente una pieza aprobada. Estas transformaciones no podrán alterar una oferta ni una afirmación material sin nueva revisión.

---

#### 15. Publicación multicanal

AURA administrará una cola visible por canal:

```text
borrador
→ revisión
→ aprobado
→ programado
→ enviado al canal
→ publicado
→ fallido o rechazado
→ retirado o archivado
```

La aprobación no equivaldrá a publicación. Cada canal tendrá identificador externo, cuenta, payload, respuesta, fecha, versión y enlace. Reintentos serán idempotentes. Un fallo parcial no recreará publicaciones ya confirmadas.

---

#### 16. Campañas y experimentos

Una campaña conservará:

- objetivo e hipótesis;
- audiencia y exclusiones;
- oferta, piezas y canales;
- presupuesto y responsable;
- periodo y calendario;
- guardas de margen, stock y capacidad;
- códigos y parámetros de atribución;
- variantes y grupo de control cuando aplique;
- criterios de inicio, pausa y cierre;
- resultado y aprendizaje.

Las pruebas podrán detenerse por daño económico, operacional o reputacional.

---

#### 17. Promociones y cupones

La arquitectura será:

```text
AURA
→ propone y gobierna la intención promocional

NUMERA
→ valida margen, presupuesto y resultado económico

PULSO / PASS
→ materializan reglas, elegibilidad, redención y reversión
```

AURA no descontará una venta ni cambiará un precio por escribir una campaña. La promoción deberá tener versión, público, condiciones, vigencia, límites, exclusiones, autoridad y código correlacionable.

---

#### 18. Radar de oportunidades

AURA podrá sugerir acciones como:

- producto rentable con baja visibilidad;
- inventario o capacidad disponible que requiere demanda;
- fecha comercial próxima sin campaña;
- clientes con consentimiento que llevan tiempo inactivos;
- contenido exitoso reutilizable;
- campaña con gasto y baja conversión;
- reputación negativa concentrada en un tema;
- oportunidad B2B sin siguiente acción.

Cada recomendación mostrará **por qué aparece**, fuentes, frescura, nivel de confianza, restricciones y acción propuesta. Nunca optimizará solo interacción si deteriora margen, servicio o consentimiento.

---

#### 19. Oportunidades, ventas B2B y catering

AURA unificará oportunidades con:

- origen y campaña;
- persona o empresa y consentimiento;
- necesidad, fecha y valor estimado;
- etapa, probabilidad, responsable y siguiente acción;
- comunicaciones y documentos;
- propuesta y versiones;
- motivo de ganancia o pérdida.

Al aceptar una propuesta:

```text
AURA conserva oportunidad y atribución
PULSO crea el pedido operativo
FOGO/NEXO reciben necesidades de capacidad y abastecimiento
NUMERA gestiona anticipo, pago o cartera
PASS/VISO conservan relación y servicio cuando corresponda
```

---

#### 20. Reputación y comentarios públicos

AURA reunirá reseñas, comentarios y menciones con:

- canal, publicación y autor externo;
- sentimiento y tema sugeridos;
- severidad y riesgo;
- respuesta propuesta;
- aprobación y respuesta publicada;
- vínculo con sede, producto, pedido o campaña cuando exista;
- escalamiento a caso de servicio.

Una respuesta pública no cerrará un reclamo. La resolución pertenece al expediente de servicio y solo su resultado podrá informar una respuesta posterior.

---

#### 21. Medición y aprendizaje

El tablero priorizará impacto empresarial:

- conversiones y ventas relacionadas;
- redenciones;
- clientes nuevos y recurrentes;
- costo de adquisición cuando sea medible;
- ingreso y margen atribuible o asociado;
- respuesta por segmento, canal y pieza;
- avance B2B y catering;
- reputación y resolución;
- aprendizaje confirmado, probable o no concluyente.

Alcance, impresiones y likes serán señales, no resultados finales. La atribución mostrará método y nivel de confianza; no presentará correlación como causalidad exacta.

---

#### 22. Privacidad, consentimiento y comunicación

AURA consumirá únicamente audiencias autorizadas y atributos mínimos. Cada contacto conservará finalidad, canal permitido, consentimiento, exclusión y fecha de actualización.

Queda prohibido:

- exportar bases completas por comodidad;
- contactar personas sin finalidad o consentimiento;
- usar datos sensibles para segmentación no aprobada;
- subir listas de clientes a plataformas externas sin control;
- conservar audiencias externas sin reconciliación;
- usar conversaciones operativas como marketing sin base autorizada.

---

#### 23. Autonomía permitida y prohibida

AURA podrá automatizar después de una aprobación válida:

- adaptación de formatos;
- subtítulos y redimensionamiento;
- programación;
- etiquetado UTM;
- recolección de métricas;
- recordatorios y alertas;
- clasificación preliminar.

Requerirá intervención humana para:

- aprobar identidad, claims y oferta;
- publicar por primera vez o en cuentas sensibles;
- crear descuentos o promociones;
- enviar campañas a clientes;
- responder crisis, acusaciones o reclamos;
- usar datos nuevos o un proveedor de IA nuevo;
- aceptar propuestas B2B o catering.

---

#### 24. Experiencia no técnica

AURA usará lenguaje de marketing y negocio, no términos de API, payload, embeddings o modelos.

La información técnica estará disponible para auditoría, pero la experiencia principal utilizará:

```text
Hoy
Calendario
Crear
Campañas
Oportunidades
Reputación
Resultados
```

No se llenarán las pantallas con explicaciones permanentes. Ayuda, fuentes, fórmulas y trazabilidad se mostrarán mediante divulgación progresiva.

---

#### 25. Operación externa, reintentos e idempotencia

Cada publicación, mensaje, audiencia, lead, comentario, métrica y conversión tendrá identificador interno, identificador externo, correlación, versión y clave idempotente. AURA distinguirá:

- solicitud enviada;
- aceptación del proveedor;
- publicación o entrega real;
- error recuperable;
- rechazo definitivo;
- estado desconocido pendiente de reconciliación.

No se asumirán éxitos por una respuesta incompleta del canal.

---

#### 26. Preguntas pendientes

No se crean preguntas nuevas.

Las incertidumbres sobre repositorio, producto, usuarios, rutas, procesos, datos, permisos y continuidad ya tienen dueño explícito en `AURA-AUD-001` a `AURA-AUD-012`.

Las respuestas operativas ya recopiladas en el registro vivo se consolidarán en lote y solo modificarán esta propuesta si contradicen una decisión material.

---

#### 27. Hallazgos

| ID                  | Hallazgo                                                                                                                              | Severidad | Tarea propietaria                                                       | Puerta   |
| ------------------- | ------------------------------------------------------------------------------------------------------------------------------------- | --------- | ----------------------------------------------------------------------- | -------- |
| H-CAP-SCOPE-014-001 | AURA permanece diferida y su roadmap exige confirmar repositorio, estado, usuarios, rutas y continuidad antes de implementarla.       | crítica   | AURA-AUD-001 a AURA-AUD-012                                             | E1       |
| H-CAP-SCOPE-014-002 | El único permiso canónico actual de AURA es acceso reservado; no existe catálogo funcional suficiente para campañas o publicación.    | crítica   | AURA-AUD-006; AURA-AUTH-001 a AURA-AUTH-004                             | E1/E2    |
| H-CAP-SCOPE-014-003 | La identidad de marca, tono, claims y restricciones pueden estar dispersos entre archivos, personas y canales.                        | alta      | AURA-DOM-001; AURA-UX-002                                               | E2       |
| H-CAP-SCOPE-014-004 | No existe memoria versionada que distinga marca, empresa, sede, campaña, canal y audiencia.                                           | alta      | AURA-DOM-001; CAP-SCOPE-001                                             | E2/E3    |
| H-CAP-SCOPE-014-005 | Marketing puede copiar nombres, precios o atributos de producto y divergir del catálogo aprobado.                                     | crítica   | AURA-INT-002; CAP-SCOPE-004; NEXO-DOM-001 a NEXO-DOM-011                | E2/E3    |
| H-CAP-SCOPE-014-006 | No existe un ciclo canónico de objetivo, audiencia, brief, presupuesto, capacidad, aprobación y calendario.                           | crítica   | AURA-DOM-002; AURA-UX-001; AURA-UX-002                                  | E2       |
| H-CAP-SCOPE-014-007 | Una idea, campaña, pieza, publicación y promoción pueden confundirse y perder trazabilidad.                                           | crítica   | AURA-DOM-002; AURA-DOM-003; AURA-DOM-006                                | E2/E3    |
| H-CAP-SCOPE-014-008 | No existe biblioteca empresarial de fotografías, videos, diseños, plantillas, licencias y derechos de uso.                            | alta      | AURA-DOM-003; CAP-SCOPE-016                                             | E2/E4    |
| H-CAP-SCOPE-014-009 | Contenido generado o adaptado puede publicarse con una versión de marca, producto u oferta vencida.                                   | crítica   | AURA-DOM-001; AURA-DOM-003; AURA-DOM-005                                | E2/E3    |
| H-CAP-SCOPE-014-010 | La IA puede inventar ingredientes, beneficios, precios, disponibilidad, fechas o resultados si no usa fuentes controladas.            | crítica   | AURA-DOM-004; AURA-INT-002; TREQ-SUPABASE-012                           | E2/E3    |
| H-CAP-SCOPE-014-011 | Prompts, archivos o datos de clientes enviados a proveedores de IA pueden exceder finalidad, consentimiento o contrato.               | crítica   | AURA-AUTH-003; AURA-AUTH-004; CAP-SCOPE-010; CAP-SCOPE-016              | E2/E4    |
| H-CAP-SCOPE-014-012 | No existe separación certificada entre borrador asistido, contenido aprobado y publicación efectiva.                                  | crítica   | AURA-AUTH-002; AURA-UX-003; AURA-UX-004                                 | E2/E3    |
| H-CAP-SCOPE-014-013 | Las cuentas de redes, propietarios, tokens, roles y recuperación pueden depender de credenciales personales.                          | crítica   | AURA-DOM-005; AURA-AUTH-004; AURA-INT-001                               | E1/E3    |
| H-CAP-SCOPE-014-014 | APIs externas, límites, permisos, revisiones y cambios de plataforma pueden dejar publicaciones en estado ambiguo.                    | alta      | AURA-DOM-005; AURA-INT-001; CAP-SCOPE-015                               | E3/E5    |
| H-CAP-SCOPE-014-015 | Reintentos o webhooks duplicados pueden publicar, retirar, responder o registrar métricas más de una vez.                             | crítica   | AURA-DOM-005; AURA-INT-001; QUEUE-ARC-001 a QUEUE-ARC-010               | E3/E5    |
| H-CAP-SCOPE-014-016 | AURA podría intentar ejecutar descuentos directamente y competir con PULSO o PASS.                                                    | crítica   | AURA-DOM-006; CAP-SCOPE-009; CAP-SCOPE-010                              | E2       |
| H-CAP-SCOPE-014-017 | Una promoción puede ser atractiva comercialmente pero inviable por margen, stock, capacidad o condiciones operativas.                 | crítica   | AURA-DOM-006; AURA-INT-002; CAP-SCOPE-006; CAP-SCOPE-008; CAP-SCOPE-012 | E2/E3    |
| H-CAP-SCOPE-014-018 | No existe una bandeja unificada de oportunidades provenientes de formularios, mensajes, redes, WhatsApp y referidos.                  | alta      | AURA-DOM-007; AURA-UX-006; AURA-INT-001                                 | E2/E3    |
| H-CAP-SCOPE-014-019 | Un contacto comercial puede convertirse indebidamente en cliente, campaña o mensaje sin consentimiento y finalidad.                   | crítica   | AURA-DOM-007; AURA-AUTH-003; CAP-SCOPE-010                              | E2/E4    |
| H-CAP-SCOPE-014-020 | B2B y catering se superponen con el pedido operativo si no existe una transferencia explícita a PULSO.                                | crítica   | AURA-DOM-007; AURA-INT-002; CAP-SCOPE-009                               | E2/E3    |
| H-CAP-SCOPE-014-021 | No existe pipeline con etapa, valor, probabilidad, siguiente acción, responsable, vencimiento y pérdida explicada.                    | alta      | AURA-DOM-007; AURA-UX-006                                               | E2       |
| H-CAP-SCOPE-014-022 | Likes, alcance e impresiones pueden presentarse como éxito sin vincularse a venta, margen, redención o aprendizaje.                   | crítica   | AURA-DOM-008; AURA-UX-008; NUMERA-DOM-008                               | E2/E3    |
| H-CAP-SCOPE-014-023 | La atribución multicanal es incierta y no puede representarse como causalidad exacta sin nivel de confianza.                          | alta      | AURA-DOM-008; AURA-INT-001; AURA-INT-002                                | E2/E3    |
| H-CAP-SCOPE-014-024 | No existe contrato común para UTM, códigos, cupones, campañas, conversiones y eventos de venta.                                       | crítica   | AURA-DOM-008; AURA-INT-002; INT-APP-001 a INT-APP-010                   | E2/E3    |
| H-CAP-SCOPE-014-025 | No existe inbox canónico para reseñas, comentarios, menciones y respuestas públicas.                                                  | alta      | AURA-DOM-009; AURA-UX-007; AURA-INT-001                                 | E2/E3    |
| H-CAP-SCOPE-014-026 | Una respuesta pública puede cerrar visualmente un reclamo sin resolver el caso de servicio.                                           | crítica   | AURA-DOM-009; CAP-SCOPE-010; TREQ-PASS-011                              | E2/E3    |
| H-CAP-SCOPE-014-027 | No se gobiernan pruebas A/B, grupos de control, periodos comparables ni detención por daño.                                           | alta      | AURA-DOM-006; AURA-DOM-008                                              | E2/E3    |
| H-CAP-SCOPE-014-028 | Las recomendaciones automáticas pueden optimizar volumen o interacción sacrificando margen, capacidad, reputación o consentimiento.   | crítica   | AURA-DOM-010; AURA-DOM-004; AURA-AUTH-003                               | E2/E3    |
| H-CAP-SCOPE-014-029 | No existe evidencia de calidad, frescura y cobertura de las fuentes que alimentarían recomendaciones de AURA.                         | crítica   | AURA-INT-002; CAP-SCOPE-017; TREQ-DATA-003                          | E2/E3/E5 |
| H-CAP-SCOPE-014-030 | Una aplicación saturada de explicaciones, tablas y configuración técnica impediría que Marketing adopte AURA como herramienta diaria. | alta      | AURA-UX-001 a AURA-UX-008; UX-QA-001 a UX-QA-029                        | E2/E5    |

---

#### 28. Tareas nuevas derivadas

| ID            | Tarea                                                                                                | Bloque                         | Momento                                                              |
| ------------- | ---------------------------------------------------------------------------------------------------- | ------------------------------ | -------------------------------------------------------------------- |
| AURA-DOM-001  | Definir arquitectura de marcas, identidad, tono, mensajes, claims, restricciones y vigencia          | BLOQUE W — AURA / dominio      | Después de AURA-AUD-010, antes de cualquier diseño o migración       |
| AURA-DOM-002  | Definir objetivos, audiencias, briefs, calendario, presupuestos, dependencias y ciclo de campaña     | BLOQUE W — AURA / dominio      | Después de AURA-AUD-005 y AURA-AUD-010                               |
| AURA-DOM-003  | Definir biblioteca de activos, derechos, versiones, reutilización y ciclo de aprobación de contenido | BLOQUE W — AURA / dominio      | Antes de conectar canales o generación asistida                      |
| AURA-DOM-004  | Definir copiloto creativo, grounding, memoria, restricciones, proveedores de IA y revisión humana    | BLOQUE W — AURA / dominio      | Antes de usar IA con datos o marcas reales                           |
| AURA-DOM-005  | Definir cuentas, medios, publicación, programación, reintentos, retiro y reconciliación por canal    | BLOQUE W — AURA / dominio      | Antes de cualquier integración externa productiva                    |
| AURA-DOM-006  | Definir campañas, experimentos, promociones, cupones y guardas económicas y operativas               | BLOQUE W — AURA / dominio      | Coordinada con PULSO, PASS y NUMERA                                  |
| AURA-DOM-007  | Definir oportunidades, leads, pipeline B2B, catering, eventos y transferencia a operación            | BLOQUE W — AURA / dominio      | Antes de captar contactos reales                                     |
| AURA-DOM-008  | Definir métricas, atribución, confianza, incrementalidad, aprendizaje y cierre de campaña            | BLOQUE W — AURA / dominio      | Antes del tablero de resultados                                      |
| AURA-DOM-009  | Definir reputación, comentarios públicos, clasificación, respuesta y escalamiento a servicio         | BLOQUE W — AURA / dominio      | Antes de responder desde cuentas reales                              |
| AURA-DOM-010  | Definir radar de oportunidades y recomendaciones comerciales explicables                             | BLOQUE W — AURA / dominio      | Después de contratos de datos y métricas                             |
| AURA-AUTH-001 | Proteger marcas, campañas, activos, audiencias, canales y resultados por empresa, marca y función    | BLOQUE W — AURA / autorización | Antes de implementar cualquier módulo                                |
| AURA-AUTH-002 | Separar creación, revisión, aprobación, programación, publicación, retiro y respuesta pública        | BLOQUE W — AURA / autorización | Antes de conectar medios externos                                    |
| AURA-AUTH-003 | Proteger promociones, segmentos, leads, datos de clientes, exportaciones y acciones masivas          | BLOQUE W — AURA / autorización | Antes de campañas segmentadas o promociones                          |
| AURA-AUTH-004 | Proteger credenciales, tokens, proveedores de IA, prompts, archivos y datos enviados a terceros      | BLOQUE W — AURA / autorización | Antes de integrar IA o canales externos                              |
| AURA-UX-001   | Diseñar inicio diario simple con prioridades, calendario, pendientes y oportunidades                 | BLOQUE W — AURA / experiencia  | Después de AURA-DOM-001 y 002                                        |
| AURA-UX-002   | Diseñar sistema de marca, brief guiado y calendario visual                                           | BLOQUE W — AURA / experiencia  | Después de AURA-DOM-001 a 003                                        |
| AURA-UX-003   | Diseñar estudio creativo asistido y fábrica de variantes reutilizables                               | BLOQUE W — AURA / experiencia  | Después de AURA-DOM-003 y 004                                        |
| AURA-UX-004   | Diseñar aprobación y publicación multicanal con estado y recuperación claros                         | BLOQUE W — AURA / experiencia  | Después de AURA-DOM-005 y AURA-AUTH-002                              |
| AURA-UX-005   | Diseñar campañas, promociones, cupones, experimentos y guardas                                       | BLOQUE W — AURA / experiencia  | Después de AURA-DOM-006                                              |
| AURA-UX-006   | Diseñar bandeja de oportunidades, B2B, catering y eventos                                            | BLOQUE W — AURA / experiencia  | Después de AURA-DOM-007                                              |
| AURA-UX-007   | Diseñar reputación, comentarios, respuestas y escalamiento                                           | BLOQUE W — AURA / experiencia  | Después de AURA-DOM-009                                              |
| AURA-UX-008   | Diseñar tablero de resultados, atribución y copiloto de recomendaciones                              | BLOQUE W — AURA / experiencia  | Después de AURA-DOM-008 y 010                                        |
| AURA-INT-001  | Definir adaptadores de canales, webhooks, límites, credenciales y reconciliación externa             | BLOQUE W — AURA / integración  | Antes de conectar Meta, Google, TikTok, WhatsApp, correo o similares |
| AURA-INT-002  | Definir contratos de lectura y eventos con NEXO, PULSO, PASS, NUMERA, VISO y FOGO                    | BLOQUE W — AURA / integración  | Antes de consumir datos empresariales reales                         |

---

#### 29. Ubicación exacta de tareas nuevas

En:

```text
docs/plan-canonico/modular/bloques/W_AURA/00_BLOQUE_W.md
```

Después de `AURA-AUD-012`, agregar en este orden:

1. `AURA-DOM-001` a `AURA-DOM-010`;
2. `AURA-AUTH-001` a `AURA-AUTH-004`;
3. `AURA-UX-001` a `AURA-UX-008`;
4. `AURA-INT-001` y `AURA-INT-002`.

Antes del primer bloque nuevo agregar la regla:

```text
Todas las tareas AURA-DOM, AURA-AUTH, AURA-UX y AURA-INT
permanecen BLOQUEADAS hasta que AURA-AUD-010 apruebe
continuidad o reemplazo y AURA-AUD-011 registre la decisión.
```

Si AURA se retira, las capacidades se reasignarán mediante ADR sin perder estos identificadores ni los hallazgos.

---

#### 30. Requisitos de prueba generados

El registro `04A` completo incorpora:

```text
TREQ-AURA-001
TREQ-AURA-002
TREQ-AURA-003
TREQ-INTEGRATION-019
```

- `TREQ-AURA-001` protege marca, planificación, campañas, contenido, activos, versiones y aprobación.
- `TREQ-AURA-002` protege el copiloto creativo, grounding, privacidad, simplicidad y límites de autonomía.
- `TREQ-AURA-003` protege promociones, oportunidades, B2B, catering, reputación, medición y atribución.
- `TREQ-INTEGRATION-019` protege canales externos y contratos con el resto de Vento OS.

---

#### 31. Dependencias principales

- `AURA-AUD-001` a `AURA-AUD-012`: puerta de continuidad;
- `CAP-SCOPE-001`: empresas, marcas, sedes y canales;
- `CAP-SCOPE-004`: productos, atributos y conocimiento;
- `CAP-SCOPE-006`: inventario y disponibilidad;
- `CAP-SCOPE-008`: capacidad productiva;
- `CAP-SCOPE-009`: pedido, venta, promoción y ejecución comercial;
- `CAP-SCOPE-010`: clientes, consentimientos, servicio y fidelización;
- `CAP-SCOPE-012`: margen, presupuesto, cartera y rentabilidad;
- `CAP-SCOPE-016`: documentos, privacidad y evidencia;
- `CAP-SCOPE-017`: calidad de datos, métricas y aprendizaje.

---

#### 32. Criterios de aceptación

`CAP-SCOPE-014` podrá aprobarse cuando:

- las once subcapacidades estén clasificadas;
- AURA quede definida como sistema operativo de marketing y copiloto, no como generador aislado;
- la puerta `AURA-AUD` permanezca obligatoria;
- marca, campaña, contenido, publicación, promoción y resultado estén separados;
- PULSO, PASS, NUMERA, NEXO, VISO y FOGO conserven sus fuentes de verdad;
- la IA tenga grounding, privacidad, trazabilidad y aprobación humana;
- promociones, leads, B2B, catering, reputación y medición tengan fronteras explícitas;
- la experiencia diaria sea simple y no técnica;
- cada brecha tenga tarea propietaria;
- los cuatro `TREQ` queden dentro del `04A` completo;
- no se autorice implementación ni conexión de canales reales;
- `CAP-SCOPE-015` permanezca como continuidad inmediata.

---

#### 33. Lo que esta tarea no autoriza

- crear o continuar un repositorio AURA;
- conectar cuentas de Meta, TikTok, Google, WhatsApp, correo o IA;
- publicar, programar, responder o retirar contenido real;
- crear promociones o contactar clientes;
- importar audiencias, leads, reseñas o métricas;
- generar campañas con datos reales fuera de entornos controlados;
- aprobar gastos publicitarios;
- modificar producto, precio, stock, pedido, puntos, cartera o contabilidad;
- iniciar `CAP-SCOPE-015`.

---

#### 34. Resultado y continuidad

Al aprobarse quedará definida la cadena:

```text
señales y objetivos
→ brief y campaña
→ contenido y aprobación
→ publicación o activación
→ oportunidad, conversión o reputación
→ medición, aprendizaje y siguiente acción
```

La continuidad será exclusivamente:

```text
CAP-SCOPE-015
— Evaluar TI, dispositivos, redes, impresión, soporte y seguridad
```

---

#### 35. Estado de aprobación

```text
PROPUESTA PARA APROBACIÓN — NO APROBADA
```

No deberá marcarse como aprobada hasta que el usuario responda expresamente `APROBADO`.
