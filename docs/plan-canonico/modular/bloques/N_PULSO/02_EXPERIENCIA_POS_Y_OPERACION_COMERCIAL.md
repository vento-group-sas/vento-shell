### MINI-BLOQUE — EXPERIENCIA POS Y OPERACION COMERCIAL

<!-- PLAN-SECTION-META:START -->
Esta sección organiza **experiencia pos y operacion comercial** dentro de **N PULSO**. Agrupa tareas que producen un resultado funcional común y deben mantenerse juntas para conservar contexto, trazabilidad y orden de ejecución.

**Cobertura canónica:** `PULSO-UX-001` a `PULSO-UX-021` — 21 tareas.

**Resultado esperado:** al cerrar este mini-bloque, su resultado debe quedar definido, verificable y coherente con las secciones anterior y siguiente antes de avanzar.

**Límites funcionales:** comienza con “Inventariar procesos de venta, caja y salón” y concluye con “Diseñar la arquitectura funcional y técnica del POS integral objetivo sin heredar como contrato el prototipo histórico”.
<!-- PLAN-SECTION-META:END -->

<!-- EXECUTION-GATE-RECONCILIATION:B601-800:PULSO-UX -->
### Reconciliación topológica de PULSO-UX-001 a PULSO-UX-021

Estas tareas inventarían, diseñan, auditan y validan la experiencia POS objetivo. Son definición canónica; la implementación se ejecuta posteriormente por package_id.

| modalidad | `DEFINE_ONCE` |
| gate temporal | `NO_PHYSICAL_INSTANCE` |

### ✅ PULSO-UX-001 — Inventariar procesos de venta, caja y salón

**Estado:** APROBADA
**Tarea anterior:** ORIGO-UX-016 — Validar el prototipo con compras y recepción
**Tarea siguiente:** OPS-POS-001 — Definir zonas físicas, mesas y puntos de servicio del POS por sede
**Tipo de tarea:** inventario documental integral del universo funcional PULSO para venta, caja, salón y superficies comerciales relacionadas, reconciliando procesos canónicos, pantallas, rutas y capacidades AS-IS, fronteras con PASS, FOGO, NEXO, NUMERA, AURA y VISO, deuda legacy y gaps de materialización, sin diseñar todavía los inicios por actor ni materializar cambios físicos; `DEFINE_ONCE` / `NO_PHYSICAL_INSTANCE`
**Bloque:** BLOQUE N — PULSO
**Repositorio propietario:** `vento-group-sas/vento-shell`
**Archivo propietario:** `docs/plan-canonico/modular/bloques/N_PULSO/02_EXPERIENCIA_POS_Y_OPERACION_COMERCIAL.md`
**Estado físico resultante:** `NO_PHYSICAL_INSTANCE`
**Cambios físicos autorizados:** ninguno; esta tarea no modifica código, rutas, componentes, permisos, tablas, RPC, RLS, migraciones, Supabase, datos, contratos generados, PULSO, PASS, FOGO, NEXO, NUMERA, AURA, VISO ni despliegues
**Requisitos de prueba creados o modificados:** 0

---

#### 1. Propósito

Inventariar de forma cerrada y verificable el universo funcional que PULSO deberá gobernar para ventas, caja y salón antes de diseñar experiencias específicas por actor o materializar el POS integral objetivo.

La tarea distingue obligatoriamente:

```text
RUTA EXISTENTE
!=
PANTALLA CANÓNICA
!=
PROCESO EMPRESARIAL
!=
ESTADO DE PEDIDO
!=
ESTADO DE PAGO
!=
SESIÓN DE CAJA
!=
SESIÓN DE MESA
!=
INTEGRACIÓN CON OTRA APLICACIÓN
```

El inventario debe permitir que las tareas posteriores consuman un universo único y no reconstruyan PULSO desde componentes parciales, rutas históricas o nombres técnicos del runtime.

---

#### 2. Handoff recibido de ORIGO-UX-016

`ORIGO-UX-016` cierra documentalmente el minibloque de compras y recepción y entrega la continuidad hacia `PHASE-07-PULSO`.

La frontera recibida es:

```text
ORIGO-UX-016
→ cierre documental de compras y recepción
→ cambio de secuencia
→ PHASE-07-PULSO
→ PULSO-UX-001
```

PULSO no hereda propiedad sobre:

- la solicitud de compra;
- sourcing y proveedores;
- aprobación de compra;
- recepción comercial de compra;
- ingreso físico de compra;
- reconocimiento económico de compra.

PULSO inicia un dominio distinto: oferta vendible, pedido, servicio al cliente, venta, pago, caja y resultado comercial.

---

#### 3. Naturaleza y topología

La topología aplicable es:

```text
mode = DEFINE_ONCE
execution_gate = NO_PHYSICAL_INSTANCE
```

Consecuencias:

- el inventario se define una sola vez;
- no crea instancia física;
- no habilita implementación de POS;
- no crea zonas, mesas ni estaciones físicas;
- no crea permisos;
- no modifica estados runtime;
- no migra `orders-board-legacy`;
- no despliega integraciones;
- no modifica `active-sequence.json` manualmente;
- la materialización posterior permanece gobernada por las tareas, paquetes y gates que correspondan.

---

#### 4. Fuentes verificadas para el inventario

El inventario consume como mínimo:

- catálogo canónico de procesos `VPROC-*`;
- propiedad, consumidores y actores de procesos;
- catálogo canónico de pantallas `VSCREEN-*`;
- bindings pantalla → proceso → paso;
- matriz de prototipos y estaciones;
- descubrimiento AS-IS `ASIS-SRC-*`;
- registro 04A de PULSO;
- `task-work-topology.json`;
- ruta ejecutable y continuidad vigentes;
- `vento-pulso` actual;
- baseline contractual `pulso-consumer-baseline-gate.mjs`;
- estado actual documentado de `vento-pulso`.

Ninguna fuente AS-IS sustituye el contrato canónico TO-BE.

---

#### 5. Regla raíz del inventario

El universo se clasifica por identidad estable:

```text
PROCESO CANÓNICO
+
PANTALLA CANÓNICA
+
SUPERFICIE AS-IS
+
PROPIETARIO
+
CONSUMIDORES
+
ESTADO DE MATERIALIZACIÓN
+
GAP / DEUDA
+
TAREA PROPIETARIA DE SALIDA
```

Una coincidencia de nombre no autoriza fusionar identidades.

---

#### 6. Propiedad empresarial de PULSO

PULSO gobierna:

- oferta vendible y vigencia comercial;
- pedido y venta;
- servicio en mesa;
- venta de mostrador o para llevar;
- admisión de pedidos externos;
- catering/B2B comercial;
- modificaciones y decisiones comerciales posteriores;
- pago asociado a la venta;
- caja y conciliación operativa de caja;
- reclamos y compensaciones comerciales;
- reservas y eventos comerciales;
- entrega al cliente mediante tercero;
- satisfacción vinculada al servicio.

PULSO no se convierte por ello en propietario de receta, inventario, ledger de fidelización, contabilidad, campañas o recursos humanos.

---

#### 7. Universo canónico de procesos propietarios PULSO

El universo propietario contiene exactamente doce procesos:

| ID | Propósito canónico | Frontera principal |
| --- | --- | --- |
| `VPROC-0017` | Publicar oferta y disponibilidad desde una definición gobernada hacia todos los canales | consume maestros/recetas/disponibilidad; PULSO decide oferta vendible |
| `VPROC-0038` | Gestionar servicio en mesa de apertura a cierre con pedido, preparación, entrega, pago y conciliación | PULSO conserva pedido, mesa, entrega y liquidación |
| `VPROC-0039` | Gestionar venta de mostrador o para llevar con entrega y cobro correlacionados | PULSO conserva compromiso, cobro y entrega al cliente |
| `VPROC-0040` | Normalizar pedidos de canales externos y transferirlos al proceso interno con reconciliación | tercero origina; PULSO valida, deduplica y gobierna pedido interno |
| `VPROC-0041` | Gestionar cotización, aprobación, capacidad, producción, facturación y entrega de catering o venta B2B | PULSO conserva propuesta, pedido, condiciones y resultado comercial |
| `VPROC-0042` | Gestionar modificación, sustitución, cancelación, anulación y devolución sin confundir sus efectos | PULSO conserva decisión comercial; efectos derivados pertenecen a sus propietarias |
| `VPROC-0043` | Cobrar, confirmar pago y emitir soporte fiscal mediante contrato conciliable | proveedor confirma; NUMERA consume hecho; PULSO conserva pago asociado a venta |
| `VPROC-0044` | Cerrar caja y conciliar ventas, pagos, efectivo, diferencias y responsables | PULSO conserva apertura, movimientos, arqueo, diferencias y cierre |
| `VPROC-0046` | Gestionar reclamo, devolución, compensación y aprendizaje de causa | PULSO conserva caso comercial y resolución |
| `VPROC-0047` | Gestionar reservas, eventos y comunicaciones al cliente con capacidad y consentimiento | PULSO conserva capacidad comprometida y relación comercial |
| `VPROC-0050` | Integrar entrega de tercero con seguimiento, prueba y conciliación interna | tercero ejecuta recorrido; PULSO conserva promesa y resultado comercial |
| `VPROC-0068` | Medir satisfacción separando medición, incentivo, reclamo y compensación | PULSO gobierna medición del servicio sin fabricar reclamos |

Conteo contractual:

```text
PULSO_OWNED_PROCESSES_EXPECTED: 12
PULSO_OWNED_PROCESSES_INVENTORIED: 12
```

---

#### 8. Procesos consumidos que no cambian de propietario

PULSO participa en procesos ajenos sin apropiárselos.

Entre las fronteras materiales están:

| Proceso | Propietaria | Participación PULSO |
| --- | --- | --- |
| `VPROC-0015` | NEXO | consume maestro de producto y equivalencias |
| `VPROC-0016` | FOGO | consume receta/proyección publicada para preparación |
| `VPROC-0024` | NEXO | solicita/consume efecto de inventario cuando corresponda |
| `VPROC-0033` | FOGO | emite demanda/señal comercial; no aprueba plan productivo |
| `VPROC-0034` | FOGO | consume avance productivo sin gobernar lote |
| `VPROC-0035` | FOGO | consume estado de calidad/liberación |
| `VPROC-0045` | PASS | ejecuta acumulación/redención mediante contrato; no mantiene ledger paralelo |
| `VPROC-0051` | NUMERA | origina/consume hecho económico correlacionado; no gobierna contabilidad |
| `VPROC-0052` | NUMERA | consume resultado de pago/compensación cuando aplique |

La pertenencia a una pantalla PULSO no cambia esta propiedad.

---

#### 9. `VPROC-0038` — servicio en mesa

Este proceso cubre un caso comercial completo de salón:

```text
MESA / SERVICIO
→ PEDIDO
→ PREPARACIÓN
→ ENTREGA
→ PAGO
→ CONCILIACIÓN / CIERRE
```

Debe conservar una identidad de caso común sin convertir cada paso en una venta diferente.

No autoriza a PULSO a apropiarse de:

- receta;
- lote productivo;
- existencia física;
- ledger económico;
- identidad de fidelización.

---

#### 10. `VPROC-0039` — mostrador o para llevar

La venta de mostrador mantiene correlacionados:

```text
SELECCIÓN
→ PEDIDO
→ PREPARACIÓN
→ COBRO
→ ENTREGA
```

Reglas mínimas inventariadas:

- pagar no implica entregar;
- entregar no implica pagar;
- preparar no implica confirmar cobro;
- un cambio comercial no puede ocultarse como edición sin versión;
- la sede y modalidad forman parte del contexto del pedido.

---

#### 11. `VPROC-0040` — canales externos

Un canal externo puede originar información, pero no gobierna el estado interno final de PULSO.

```text
RAPPI / SHOPIFY / MANYCHAT / OTRO CANAL
→ NORMALIZACIÓN
→ DEDUPLICACIÓN
→ VALIDACIÓN
→ PEDIDO INTERNO CORRELACIONADO
```

La identidad externa debe preservarse sin permitir doble pedido por replay.

---

#### 12. `VPROC-0041` — catering y B2B

El proceso B2B no se reduce a una orden POS ordinaria.

Conserva, según aplique:

- oportunidad;
- requerimientos;
- cotización;
- capacidad;
- aprobación;
- producción;
- facturación;
- entrega;
- cambios;
- cierre.

Cada etapa conserva su autoridad y no acepta las demás por implicación.

---

#### 13. `VPROC-0042` — cambios, cancelaciones y devoluciones

El inventario separa:

```text
MODIFICACIÓN
!=
SUSTITUCIÓN
!=
CANCELACIÓN
!=
ANULACIÓN
!=
DEVOLUCIÓN
!=
REEMBOLSO
```

Pueden relacionarse, pero no comparten automáticamente causa, autoridad, reversión económica o efecto físico.

---

#### 14. `VPROC-0043` — cobro y confirmación de pago

PULSO registra y gobierna la relación del pago con la venta, pero una respuesta visual o una redirección no es autoridad de confirmación.

La frontera es:

```text
INTENCIÓN DE COBRO
→ PROVEEDOR / CONTRATO DE PAGO
→ RESULTADO CONFIRMADO O RECONCILIABLE
→ VENTA PULSO ACTUALIZADA
→ HECHO ECONÓMICO CORRELACIONADO
```

Nunca:

```text
BOTÓN PRESIONADO
→ PAGO CONFIRMADO
```

---

#### 15. `VPROC-0044` — caja

Caja debe conservar como identidades separadas:

- apertura;
- responsable;
- fondo;
- terminal;
- ventas asociadas;
- pagos;
- efectivo;
- movimientos;
- conteo;
- diferencia;
- revisión/aprobación de diferencia;
- conciliación;
- cierre.

La operación de caja no se deduce de la mera existencia de ventas.

---

#### 16. `VPROC-0046` — reclamos y compensaciones

PULSO conserva el caso comercial y la resolución.

El inventario no permite confundir:

- reclamo;
- devolución;
- compensación;
- reembolso;
- corrección operativa;
- aprendizaje de causa.

NUMERA, PASS, FOGO o NEXO pueden ejecutar efectos propios sin adquirir el caso comercial.

---

#### 17. `VPROC-0047` — reservas y eventos

PULSO conserva:

- solicitud;
- capacidad comprometida;
- confirmación;
- condiciones;
- cambios;
- comunicaciones;
- relación con pedido/venta;
- cierre.

La existencia de una reserva no crea automáticamente pedido, producción ni pago.

---

#### 18. `VPROC-0050` — entrega mediante tercero

Se separa la entrega comercial al cliente de la logística interna NEXO.

```text
ENTREGA DE PEDIDO AL CLIENTE
→ PULSO

TRANSFERENCIA / RUTA INTERNA
→ NEXO
```

Un proveedor logístico externo informa eventos y evidencia; PULSO conserva promesa, seguimiento, excepción y resultado del pedido.

---

#### 19. `VPROC-0068` — satisfacción

La medición de satisfacción no convierte automáticamente una respuesta negativa en reclamo o compensación.

Se mantienen separados:

```text
MEDICIÓN
INCENTIVO
RECLAMO
COMPENSACIÓN
```

---

#### 20. `VPROC-0017` — oferta vendible

PULSO gobierna la oferta comercial publicada, no el maestro físico ni la receta.

La oferta puede consumir:

- producto NEXO;
- receta FOGO;
- disponibilidad;
- condiciones comerciales;
- reglas de canal;
- vigencia.

La publicación no modifica las fuentes propietarias.

---

#### 21. Frontera PASS y `VPROC-0045`

`VPROC-0045` pertenece a PASS.

PULSO puede presentar y ejecutar acciones de fidelización en el contexto de venta, pero no mantiene:

- saldo paralelo;
- ledger paralelo;
- consentimiento paralelo;
- identidad de cliente paralela.

La regla es:

```text
PANTALLA EN PULSO
!=
PROPIEDAD DEL LEDGER PASS
```

---

#### 22. Frontera FOGO

FOGO conserva:

- receta;
- planificación productiva;
- orden/lote de producción;
- preparación propietaria;
- calidad productiva;
- liberación;
- cierre productivo.

PULSO conserva pedido, promesa al cliente y seguimiento comercial.

---

#### 23. Frontera NEXO

NEXO conserva:

- existencia;
- ubicación;
- movimiento físico;
- custodia;
- ajuste de inventario;
- transporte interno.

PULSO no descuenta o aumenta inventario localmente como contrato independiente.

---

#### 24. Frontera NUMERA

NUMERA conserva:

- reconocimiento económico;
- clasificación contable;
- obligaciones;
- tesorería;
- conciliación financiera.

PULSO conserva venta, pago asociado y caja operativa.

```text
VENTA PULSO
!=
ASIENTO NUMERA
```

---

#### 25. Fronteras AURA y VISO

AURA puede originar o consumir campañas, oportunidades y comunicaciones, pero su continuidad sigue gobernada por su propio bloque.

VISO puede consumir resultados administrativos, reporting y excepciones, pero no se convierte en caja o POS.

---

#### 26. Universo canónico de pantallas PULSO

El catálogo vigente contiene exactamente veinte pantallas primarias PULSO:

| ID | Pantalla |
| --- | --- |
| `VSCREEN-0080` | Inicio POS |
| `VSCREEN-0081` | Creación de venta o pedido |
| `VSCREEN-0082` | Mapa de salón y mesas |
| `VSCREEN-0083` | Detalle y modificación de pedido |
| `VSCREEN-0084` | Cobro y medios de pago |
| `VSCREEN-0085` | Identificación de cliente y acumulación |
| `VSCREEN-0086` | Redención de puntos o beneficios |
| `VSCREEN-0087` | Bandeja de pedidos de canales externos |
| `VSCREEN-0088` | Seguimiento de preparación y entrega |
| `VSCREEN-0089` | Apertura de caja |
| `VSCREEN-0090` | Cierre de caja |
| `VSCREEN-0091` | Anulación, devolución y reembolso |
| `VSCREEN-0092` | Oferta, menú, precio comercial y disponibilidad |
| `VSCREEN-0093` | Revisión de ventas, caja y terminales |
| `VSCREEN-0147` | Oportunidades y cotizaciones de catering o B2B |
| `VSCREEN-0148` | Ejecución de catering o venta B2B |
| `VSCREEN-0149` | Operación de reservas y eventos |
| `VSCREEN-0150` | Casos de reclamo y compensación |
| `VSCREEN-0151` | Coordinación de entrega mediante tercero |
| `VSCREEN-0152` | Análisis de satisfacción y servicio |

Conteo contractual:

```text
PULSO_SCREENS_EXPECTED: 20
PULSO_SCREENS_INVENTORIED: 20
```

---

#### 27. Binding principal pantalla → proceso

| Pantalla | Proceso principal |
| --- | --- |
| `VSCREEN-0080` | `VPROC-0039` |
| `VSCREEN-0081` | `VPROC-0039` |
| `VSCREEN-0082` | `VPROC-0038` |
| `VSCREEN-0083` | `VPROC-0038` |
| `VSCREEN-0084` | `VPROC-0043` |
| `VSCREEN-0085` | `VPROC-0045` — PASS |
| `VSCREEN-0086` | `VPROC-0045` — PASS |
| `VSCREEN-0087` | `VPROC-0040` |
| `VSCREEN-0088` | `VPROC-0039` |
| `VSCREEN-0089` | `VPROC-0044` |
| `VSCREEN-0090` | `VPROC-0044` |
| `VSCREEN-0091` | `VPROC-0042` |
| `VSCREEN-0092` | `VPROC-0017` |
| `VSCREEN-0093` | `VPROC-0044` |
| `VSCREEN-0147` | `VPROC-0041` |
| `VSCREEN-0148` | `VPROC-0041` |
| `VSCREEN-0149` | `VPROC-0047` |
| `VSCREEN-0150` | `VPROC-0046` |
| `VSCREEN-0151` | `VPROC-0050` |
| `VSCREEN-0152` | `VPROC-0068` |

Los bindings no implican una ruta física uno a uno.

---

#### 28. Inventario de páginas AS-IS de `vento-pulso`

El baseline vigente identifica exactamente seis archivos de página:

| Archivo | Ruta | Clasificación |
| --- | --- | --- |
| `src/app/page.tsx` | `/` | negocio; entrada actual al scanner |
| `src/app/orders/page.tsx` | `/orders` | negocio; tablero de pedidos |
| `src/app/sales-imports/page.tsx` | `/sales-imports` | negocio; importación de ventas externas |
| `src/app/salon/page.tsx` | `/salon` | negocio; salón, mesas y sesiones |
| `src/app/scanner/page.tsx` | `/scanner` | negocio; scanner POS/loyalty |
| `src/app/no-access/page.tsx` | `/no-access` | deny surface |

Conteos observados por contrato del baseline:

```text
PAGE_FILES_EXPECTED: 6
BUSINESS_ROUTES_EXPECTED: 5
DENY_ROUTES_EXPECTED: 1
DYNAMIC_PAGE_COUNT_EXPECTED: 0
ROUTE_HANDLER_COUNT_EXPECTED: 0
```

---

#### 29. `/` y `/scanner`

La ruta raíz y `/scanner` son rutas distintas que montan la experiencia `ScannerPage`.

Esto demuestra una superficie runtime existente, pero no equivale a tener materializado `VSCREEN-0080` como workspace integral del POS.

El inventario conserva ambos hechos:

```text
RUTAS DISTINTAS
+
MISMO MÓDULO FUNCIONAL PRINCIPAL
```

---

#### 30. `/orders`

La ruta actual de pedidos incluye evidencia de:

- pedidos;
- líneas;
- estados;
- estado de pago;
- fulfillment;
- despacho;
- conversación;
- historial de estado;
- solicitudes de facturación;
- actualización operativa;
- componentes live/realtime.

También conserva dependencia runtime del tablero legacy a través de la capa actual.

---

#### 31. `/salon`

La superficie AS-IS cubre evidencia de:

- zonas;
- mesas;
- sesiones;
- llamados de servicio;
- actualización Realtime;
- cleanup de suscripciones.

La existencia de estas estructuras no define todavía el modelo físico por sede que pertenece a `OPS-POS-001`.

---

#### 32. `/sales-imports`

La ruta AS-IS demuestra una capacidad diferenciada de importación:

- hash de archivo;
- mappings externos;
- lotes;
- filas;
- publicación posterior;
- control de duplicado/reconciliación según contrato vigente.

Una importación no equivale automáticamente a una venta POS nativa ni a un canal externo en tiempo real.

---

#### 33. `/no-access`

`/no-access` es una superficie de denegación, no una pantalla empresarial PULSO.

No incrementa el conteo de pantallas canónicas del dominio.

---

#### 34. Doce superficies técnicas inventariadas por el baseline PULSO

El baseline vigente separa doce superficies técnicas:

| ID | Superficie |
| --- | --- |
| `PULSO-SURFACE-001` | identidad, sesión, SSO y acceso PULSO |
| `PULSO-SURFACE-002` | contexto operativo, sede, actor y dispositivo |
| `PULSO-SURFACE-003` | inventario de rutas y navegación |
| `PULSO-SURFACE-004` | escáner e identificación de cliente |
| `PULSO-SURFACE-005` | loyalty, redención y acreditación |
| `PULSO-SURFACE-006` | pedidos, líneas, estado, pago y fulfillment |
| `PULSO-SURFACE-007` | despacho, chat, facturación e historial |
| `PULSO-SURFACE-008` | salón, mesas, sesiones, llamados y Realtime |
| `PULSO-SURFACE-009` | importación de ventas, mapeos, lotes y publicación |
| `PULSO-SURFACE-010` | atomicidad, idempotencia, concurrencia y recuperación |
| `PULSO-SURFACE-011` | integración y fronteras de dominio |
| `PULSO-SURFACE-012` | UI, SSR, interacción, accesibilidad y Realtime |

Este baseline es evidencia técnica AS-IS; no certifica por sí solo el proceso comercial completo.

---

#### 35. Deuda `orders-board-legacy`

El runtime actual conserva:

```text
orders-board.tsx
→ importa BaseOrdersBoard desde orders-board-legacy.tsx
```

Por tanto:

```text
TABLERO ACTUAL
!=
LEGACY RETIRADO
```

`TREQ-PULSO-002` exige paridad demostrada antes del retiro y cero importación runtime al legado después del cutover.

Esta tarea registra la deuda; no la corrige.

---

#### 36. Estado AS-IS de caja y pagos

El documento de estado actual del repositorio identifica como pendiente el cierre formal de caja, pagos y sesiones POS.

El inventario no declara materializados `VSCREEN-0089`, `VSCREEN-0090` o el contrato completo de `VPROC-0044` por la sola existencia de pedidos con `payment_status`.

```text
CAMPO payment_status
!=
CICLO DE CAJA COMPLETO
```

---

#### 37. Estado AS-IS de loyalty

Existe evidencia runtime de:

- identificación de cliente;
- validación de redención;
- acreditación de puntos;
- scanner QR/cámara;
- firma de actor en dispositivo compartido cuando aplica.

Sin embargo:

```text
CAPACIDAD PULSO DE EJECUTAR ACCIÓN
!=
PROPIEDAD DEL LEDGER PASS
```

---

#### 38. Estado AS-IS de inventario

El estado actual del repositorio documenta que el descuento de inventario no debe implementarse localmente en PULSO sin contrato con NEXO/Shell.

El inventario conserva esa frontera.

La tarea posterior `PULSO-UX-016` es propietaria del diseño de conexión venta → inventario.

---

#### 39. Estados técnicos actuales no sustituyen lifecycles canónicos

En `/orders` aparecen estados como:

```text
pending
confirmed
preparing
ready_for_dispatch
in_transit
on_the_way
delivered
cancelled
```

Su existencia runtime no prueba equivalencia completa con los estados y transiciones de `VPROC-0038`, `VPROC-0039`, `VPROC-0042`, `VPROC-0043` o `VPROC-0050`.

Toda reconciliación posterior debe ser explícita.

---

#### 40. No existe relación uno a uno entre rutas y pantallas canónicas

Cinco rutas de negocio AS-IS no pueden representar por conteo directo las veinte pantallas canónicas.

```text
5 RUTAS AS-IS
!=
20 PANTALLAS CANÓNICAS
```

Una ruta puede agrupar múltiples responsabilidades; una pantalla canónica puede no tener todavía ruta dedicada.

---

#### 41. Matriz de materialización por familia

| Familia | Contrato canónico | Evidencia AS-IS | Estado inventariado |
| --- | --- | --- | --- |
| entrada POS | `VSCREEN-0080` | `/` y `/scanner` montan scanner | `PARCIAL_NO_EQUIVALENTE` |
| creación/operación pedido | `VSCREEN-0081`, `0083`, `0088` | `/orders` y bridges | `PARCIAL` |
| salón | `VSCREEN-0082` | `/salon` | `PARCIAL` |
| cobro/pago | `VSCREEN-0084` | campos/reglas de pago en pedidos | `PARCIAL` |
| loyalty | `VSCREEN-0085`, `0086` | scanner y acciones loyalty | `PARCIAL_CON_OWNER_PASS` |
| canales externos | `VSCREEN-0087` | `/sales-imports` no equivale a integración live completa | `PARCIAL` |
| caja | `VSCREEN-0089`, `0090`, `0093` | sin ciclo formal completo demostrado | `GAP` |
| anulación/devolución | `VSCREEN-0091` | operaciones parciales de pedido | `PARCIAL` |
| oferta | `VSCREEN-0092` | no demostrada como pantalla canónica completa | `GAP/PARCIAL` |
| catering/B2B | `VSCREEN-0147`, `0148` | no demostrada en rutas actuales | `GAP` |
| reservas/eventos | `VSCREEN-0149` | no demostrada en rutas actuales | `GAP` |
| reclamos | `VSCREEN-0150` | no demostrada como flujo canónico completo | `GAP` |
| entrega tercero | `VSCREEN-0151` | bridges de despacho/order delivery parciales | `PARCIAL` |
| satisfacción | `VSCREEN-0152` | no demostrada en rutas actuales | `GAP` |

`PARCIAL` significa evidencia técnica existente sin equivalencia contractual completa demostrada.

---

#### 42. Qué significa proceso completo en esta familia

Un proceso no se considera materializado solo porque exista:

- tabla;
- página;
- formulario;
- botón;
- RPC;
- enum;
- webhook;
- componente Realtime;
- importador;
- bridge.

Proceso completo exige identidad, estados, autoridad, transiciones, errores, idempotencia, evidencia y handoffs coherentes con su contrato.

---

#### 43. Duplicados y flujos paralelos

El inventario trata como riesgo cualquier combinación de:

- tablero nuevo + tablero legacy activo;
- dos estados con mismo significado y diferente semántica;
- pedido importado y pedido nativo sin correlación;
- actualización optimista que se confunda con confirmación final;
- venta/POS duplicada por canal;
- llamada de salón y pedido sin vínculo;
- redención aplicada dos veces;
- operación de entrega repetida por replay.

La tarea no elimina estos riesgos; los registra para diseño y materialización posteriores.

---

#### 44. Identidades que deben permanecer separadas

```text
PEDIDO
VENTA
CUENTA
MESA
SESIÓN DE MESA
SESIÓN DE CAJA
PAGO
INTENTO DE PAGO
FULFILLMENT
ENTREGA
CLIENTE
CUENTA PASS
MOVIMIENTO DE LOYALTY
HECHO ECONÓMICO
MOVIMIENTO DE INVENTARIO
```

No se autoriza colapsarlas por compartir un UUID, una pantalla o un estado técnico.

---

#### 45. Contexto de terminal y actor

PULSO es un dominio con uso intensivo de terminal compartida.

El inventario conserva como dimensiones independientes:

- actor efectivo;
- sede;
- área;
- terminal/dispositivo;
- rol base;
- rol operativo;
- sesión operacional;
- firma de acción compartida cuando corresponda.

El acceso a `pulso` o `pos.main` no concede por sí solo todas las mutaciones sensibles.

---

#### 46. Handoffs interaplicación inventariados

| Origen PULSO | Destino | Naturaleza |
| --- | --- | --- |
| pedido/venta | FOGO | señal de preparación/producción cuando aplique |
| pedido/venta | NEXO | solicitud de efecto físico/inventario cuando aplique |
| pago/venta | NUMERA | hecho económico correlacionado |
| venta | PASS | acumulación/redención autorizada |
| pedido externo | adaptador/canal | normalización y reconciliación |
| entrega tercero | proveedor logístico | seguimiento y prueba con autoridad limitada |
| reporting | VISO | proyección administrativa, no ownership POS |

Cada destino conserva su autoridad propia.

---

#### 47. Idempotencia, concurrencia y resultado desconocido

Toda materialización futura deberá distinguir al menos:

```text
SOLICITUD NUEVA
RETRY DEL MISMO EFECTO
REPLAY
CONFLICTO
RESULTADO DESCONOCIDO
EVENTO TARDÍO
EVENTO FUERA DE ORDEN
```

Regla raíz:

```text
RESULTADO DESCONOCIDO
→ CONSULTAR / RECONCILIAR
→ NO REPETIR CIEGAMENTE
```

---

#### 48. Conectividad y recuperación

Los procesos críticos de PULSO tienen diferentes tolerancias a conectividad.

El inventario no declara offline-capable ningún flujo por la sola existencia de estado cliente o actualización optimista.

La recuperación debe preservar:

- identidad de operación;
- actor;
- sede;
- recurso;
- versión;
- idempotency key;
- evidencia de resultado.

---

#### 49. Auditoría mínima

Los procesos posteriores deben poder reconstruir:

- quién actuó;
- dónde;
- sobre qué pedido/venta/caja/mesa;
- estado previo;
- acción solicitada;
- estado confirmado;
- pago asociado;
- efecto físico/económico/fidelización correlacionado;
- excepciones;
- correcciones;
- reintentos;
- evidencia externa relevante.

---

#### 50. Reporting y observabilidad

La observabilidad no puede transformarse en fuente de verdad del proceso.

```text
LOG / DASHBOARD / METRICA
!=
ESTADO EMPRESARIAL AUTORITATIVO
```

Reporting hacia VISO o analítica futura consume hechos confirmados y conserva frescura.

---

#### 51. Accesibilidad y experiencia táctil

Esta tarea solo inventaría las superficies y riesgos.

El diseño táctil específico pertenece a `PULSO-UX-015` y la validación integral de prototipo a `PULSO-UX-019`.

No se declaran resueltas desde el inventario.

---

#### 52. Handoff obligatorio a OPS-POS-001

La continuidad topológica real después de esta tarea es:

```text
PULSO-UX-001
→ OPS-POS-001
```

`OPS-POS-001` debe definir:

- zonas físicas por sede;
- mesas;
- agrupaciones;
- puntos de caja;
- mostrador;
- entrega de domicilios/Rappi;
- estaciones;
- reglas de configuración física por sede.

Esta tarea entrega el inventario funcional que `OPS-POS-001` necesita, pero no define esas entidades físicas.

---

#### 53. Handoff posterior a PULSO-AUTH

Después de `OPS-POS-001`, la ruta continúa por el bloque de autorización PULSO.

Por tanto, este inventario no define todavía:

- permisos de cajero;
- permisos de supervisor;
- permisos de cierre/anulación;
- autorización de loyalty;
- segregación por acción sensible.

Esos contratos tienen tareas propietarias posteriores.

---

#### 54. Handoff posterior a PULSO-UX-002..021

El inventario queda disponible para las tareas de experiencia posteriores, entre ellas:

- inicios por actor;
- creación de venta;
- cobro;
- anulación/devolución/reembolso;
- caja;
- loyalty;
- confirmaciones sensibles;
- actor real en terminal compartida;
- experiencia táctil;
- inventario;
- NUMERA;
- PASS;
- validación integral;
- auditoría del prototipo histórico;
- arquitectura funcional/técnica objetivo.

Ninguna de estas tareas se absorbe en `PULSO-UX-001`.

---

#### 55. Requisitos de prueba derivados

NO GENERA REQUISITOS DE PRUEBA.

Esta tarea no crea, modifica, difiere ni vuelve obsoleto ningún requisito de prueba.

La función del inventario es aportar trazabilidad y universo cerrado para requisitos ya registrados.

---

#### 56. Cobertura de prueba vigente reutilizada

Cobertura vigente relevante, sin modificación:

- `TREQ-PULSO-001` — POS E2E desde apertura de caja hasta cierre auditable;
- `TREQ-PULSO-002` — migración con paridad de `orders-board-legacy` y retiro sin imports runtime;
- `TREQ-PULSO-005` — separación de solicitud, pedido, revisión, líneas, comanda, preparación, cumplimiento, mesa, cuenta y venta;
- `TREQ-PULSO-007` — cumplimiento de pedidos y entrega al cliente sin duplicaciones ni exposición indebida;
- `TREQ-PULSO-018` — aislamiento de `/salon` por sede, actor, estado y acción.

La mención en esta sección es trazabilidad; no actualiza el Registro 04A.

---

#### 57. Evidencia de validación

| Clase | Estado | Evidencia documental |
| --- | --- | --- |
| BUILD | NOT_EXECUTED | no se ejecutó build de `vento-pulso`; tarea documental sin cambios físicos |
| LOCAL | NOT_EXECUTED | no se modificó checkout local del repositorio canónico |
| REMOTA | PASS | se verificaron `vento-shell` y `vento-pulso` remotos, owner files, topología, catálogo de procesos/pantallas, 04A y baseline vigente |
| OPERATIVA | NOT_EXECUTED | no se ejecutó una venta, caja o sesión de salón real |
| FÍSICA | NOT_APPLICABLE | `DEFINE_ONCE` / `NO_PHYSICAL_INSTANCE`; sin materialización física propia |

La evidencia REMOTA valida el inventario documental, no conformidad E2E del consumidor.

---

#### 58. Criterios de aceptación

- [ ] Se inventarían exactamente doce procesos propietarios PULSO.
- [ ] Se distinguen procesos propietarios de procesos consumidos.
- [ ] `VPROC-0045` permanece propiedad de PASS.
- [ ] Se inventarían exactamente veinte pantallas canónicas PULSO.
- [ ] Cada pantalla conserva su proceso principal.
- [ ] Se registran exactamente seis page files AS-IS del baseline.
- [ ] Se distinguen cinco rutas de negocio y una ruta de denegación.
- [ ] Se registran las doce superficies técnicas del baseline.
- [ ] Se documenta la dependencia runtime actual con `orders-board-legacy`.
- [ ] No se declara resuelto el cierre formal de caja por la sola existencia de `payment_status`.
- [ ] No se declara el scanner como equivalente al workspace integral de POS.
- [ ] Se conserva propiedad NEXO sobre inventario.
- [ ] Se conserva propiedad FOGO sobre receta y producción.
- [ ] Se conserva propiedad NUMERA sobre el registro económico.
- [ ] Se conserva propiedad PASS sobre fidelización.
- [ ] Se distingue entrega comercial PULSO de logística interna NEXO.
- [ ] Se distinguen pedido, venta, mesa, caja, pago, fulfillment y handoffs.
- [ ] Se documenta que cinco rutas AS-IS no equivalen por conteo a veinte pantallas canónicas.
- [ ] Todo gap material tiene tarea propietaria posterior o continuidad explícita.
- [ ] `OPS-POS-001` recibe el handoff físico exacto.
- [ ] No se crean ni modifican TREQ.
- [ ] No se ejecutan cambios físicos.

---

#### 59. Límites

Esta tarea no:

- implementa el POS integral;
- diseña el inicio del cajero;
- diseña el inicio de salón;
- diseña el inicio de mostrador;
- diseña el inicio del operador integral;
- diseña el inicio del supervisor;
- crea zonas físicas, mesas o puntos de servicio;
- crea permisos PULSO;
- migra `orders-board-legacy`;
- elimina imports legacy;
- crea cierre formal de caja;
- crea un proveedor de pago;
- modifica PASS;
- modifica FOGO;
- modifica NEXO;
- modifica NUMERA;
- modifica AURA;
- modifica VISO;
- crea tablas, columnas, constraints o índices;
- crea RPC, funciones, triggers, Edge Functions, colas o workers;
- modifica RLS o grants;
- ejecuta migraciones;
- modifica Supabase o datos;
- modifica contratos generados;
- modifica el Registro 04A;
- ejecuta E5;
- crea instancia física;
- desarrolla `OPS-POS-001`.

---

#### 60. Continuidad

**ÚLTIMA TAREA APROBADA**
`ORIGO-UX-016 — Validar el prototipo con compras y recepción`

**TAREA ACTUAL APROBADA**
`PULSO-UX-001 — Inventariar procesos de venta, caja y salón`

**SIGUIENTE TAREA RESERVADA**
`OPS-POS-001 — Definir zonas físicas, mesas y puntos de servicio del POS por sede`
### ✅ PULSO-UX-002 — Diseñar inicio para cajero

**Estado:** APROBADA
**Tarea anterior:** PULSO-AUTH-016 — Ejecutar pruebas integrales
**Tarea siguiente:** PULSO-UX-003 — Diseñar inicio para servicio de salón
**Tipo de tarea:** diseño documental integral de `VSCREEN-0080 — Inicio POS` para el actor operativo `cajero_satelite`, orientando la entrada por contexto efectivo, estado de caja y trabajo comercial accionable sobre `VPROC-0039`, con acceso condicionado a creación y actualización ordinaria de pedido, cobro, identificación de cliente y loyalty, exclusión explícita de cancelación, refund, cierre, override, configuración e importaciones, sin crear una pantalla canónica nueva ni materializar rutas o componentes; `DEFINE_ONCE` / `NO_PHYSICAL_INSTANCE`
**Bloque:** BLOQUE N — PULSO
**Repositorio propietario:** `vento-group-sas/vento-shell`
**Archivo propietario:** `docs/plan-canonico/modular/bloques/N_PULSO/02_EXPERIENCIA_POS_Y_OPERACION_COMERCIAL.md`
**Estado físico resultante:** `NO_PHYSICAL_INSTANCE`
**Cambios físicos autorizados:** Ninguno durante esta tarea.
**Requisitos de prueba creados o modificados:** 0

---

#### 1. Propósito

Diseñar el contrato de experiencia inicial de PULSO para una persona cuyo rol operativo efectivo sea `cajero_satelite`, de forma que al entrar encuentre primero el contexto que determina si puede operar y, después, el siguiente trabajo comercial válido que puede ejecutar.

La experiencia debe permitir:

- comprender en qué sede, punto o estación está operando;
- distinguir turno vigente, check-in y sesión de caja;
- abrir caja cuando corresponda y exista autoridad;
- iniciar una venta ordinaria;
- continuar pedidos que requieran acción de caja;
- cobrar mediante el flujo propietario;
- identificar al cliente cuando la operación lo necesita;
- ejecutar acumulación o redención de loyalty dentro de sus límites;
- reconocer bloqueos, denegaciones, datos desactualizados o fallos técnicos sin confundirlos con ausencia de trabajo;
- mantener fuera de la experiencia ordinaria las acciones sensibles que el contrato de cajero no concede.

La tarea especializa la pantalla canónica existente:

```text
VSCREEN-0080 — Inicio POS
```

sin crear una nueva identidad de pantalla.

---

#### 2. Entrada recibida de PULSO-AUTH-016

`PULSO-AUTH-016` cierra el minibloque de autorización con un contrato integral que exige demostrar, por unidad física posterior, autorización, actor, territorio, dispositivo, caja, pedidos, payments, loyalty, administración, packages, rollback e integraciones.

Para esta tarea UX se conserva como regla de entrada:

```text
EXPERIENCIA VISIBLE
!=
AUTORIDAD EFECTIVA
```

La experiencia puede presentar únicamente acciones cuya ejecución posterior pueda revalidarse contra los contratos PULSO-AUTH aplicables.

`PULSO-UX-002` no reabre ni redefine los permisos aprobados en el minibloque AUTH.

---

#### 3. Naturaleza y topología

La topología vigente de `PULSO-UX-001..021` establece para esta tarea:

```text
mode = DEFINE_ONCE
execution_gate = NO_PHYSICAL_INSTANCE
```

Consecuencias:

1. `PULSO-UX-002` se define una sola vez;
2. no existe una instancia física propia;
3. no se modifica `vento-pulso`;
4. no se crea ni cambia una ruta;
5. no se materializa `VSCREEN-0080`;
6. no se modifican permisos, RLS, RPC, tablas o migraciones;
7. las brechas AS-IS se asignan a tareas propietarias posteriores;
8. la materialización futura debe consumir este contrato sin convertirlo en bypass de autorización.

---

#### 4. Fuentes y contratos consumidos

El diseño conserva como entradas:

- `PULSO-UX-001 — Inventariar procesos de venta, caja y salón`;
- `OPS-POS-001 — Definir zonas físicas, mesas y puntos de servicio del POS por sede`;
- `PULSO-AUTH-006 — Definir permisos de cajero`;
- `PULSO-AUTH-007 — Definir permisos de supervisor`;
- `PULSO-AUTH-008 — Definir permisos de cierre y anulación`;
- `PULSO-AUTH-009 — Proteger acumulación de puntos`;
- `PULSO-AUTH-010 — Proteger redenciones`;
- `PULSO-AUTH-011 — Limitar operación a sede del turno`;
- `PULSO-AUTH-012 — Integrar dispositivos POS compartidos`;
- `PULSO-AUTH-013 — Registrar trabajador que ejecuta la operación`;
- `PULSO-AUTH-014 — Mantener configuración administrativa separada`;
- `PULSO-AUTH-015 — Migrar a paquetes de vento-shell`;
- `VSCREEN-0080` como identidad canónica de Inicio POS;
- `VPROC-0039` como proceso principal de venta de mostrador o para llevar;
- las pantallas PULSO `VSCREEN-0081` a `VSCREEN-0093` y `VSCREEN-0147` a `VSCREEN-0152` como superficies canónicas relacionadas;
- el runtime vigente de `vento-pulso` como evidencia AS-IS, no como autoridad de diseño.

---

#### 5. Actor contractual

El actor principal es:

```text
operational_role = cajero_satelite
```

La experiencia no se activa correctamente por el nombre del rol aislado. La entrada operativa requiere resolver, según corresponda:

```text
ACTOR HUMANO
+ EMPLEADO ACTIVO
+ TURNO VIGENTE
+ ROL OPERATIVO EFECTIVO
+ SEDE AUTORIZADA
+ ÁREA cashier COMPATIBLE
+ CHECK-IN PARA OPERACIÓN INTERNA
+ DISPOSITIVO / ESTACIÓN CUANDO APLICA
+ PERMISOS EXACTOS
= CONTEXTO OPERATIVO UTILIZABLE
```

---

#### 6. Identidad canónica del inicio

La pantalla ya existe en el catálogo:

```text
VSCREEN-0080 — Inicio POS
```

Su propósito canónico es presentar acciones y pendientes de venta, salón, mostrador o caja compatibles con la estación y el actor.

Para `cajero_satelite`, esta tarea especializa esa identidad sin crear:

- `VSCREEN` adicional;
- dashboard paralelo;
- home técnico alternativo;
- ruta canónica nueva;
- pantalla exclusiva por sede o dispositivo.

---

#### 7. Proceso principal

El binding principal vigente de `VSCREEN-0080` es:

```text
VPROC-0039 — Gestionar venta de mostrador o para llevar con entrega y cobro correlacionados
```

Por tanto, el inicio del cajero prioriza trabajo de venta y caja.

La existencia de accesos secundarios hacia salón, pedidos externos, cliente o loyalty no cambia el proceso principal del inicio.

---

#### 8. Contraste con el AS-IS de la ruta raíz

El runtime observado de `vento-pulso` usa actualmente:

```text
/
→ ScannerPage

/scanner
→ ScannerPage
```

Ambas rutas pasan por el permiso broad legacy `pulso.pos.main`.

Esto demuestra una entrada funcional de scanner, pero no materializa el contrato de `VSCREEN-0080`.

Regla:

```text
SCANNER ACTUAL
!=
INICIO POS DEL CAJERO
```

La identificación del cliente debe convertirse en una acción disponible dentro del inicio cuando corresponda, no en la definición completa del home.

---

#### 9. Pregunta operativa del inicio

La experiencia se organiza alrededor de:

```text
¿QUÉ DEBO HACER AHORA EN ESTA CAJA Y ESTA SEDE?
```

No alrededor de:

```text
¿QUÉ RUTA TÉCNICA QUIERO ABRIR?
```

ni de:

```text
¿QUÉ MÓDULO ADMINISTRATIVO QUIERO CONSULTAR?
```

El inicio debe reducir navegación y carga cognitiva sin ocultar el estado que determina si una acción es válida.

---

#### 10. Contexto visible mínimo

El inicio debe poder representar de forma compacta, cuando exista información válida:

- trabajador efectivo;
- sede efectiva;
- área operativa efectiva;
- punto o estación de servicio aplicable;
- dispositivo compartido cuando corresponda;
- turno vigente;
- check-in activo o requerido;
- sesión de caja abierta o necesidad de apertura;
- estado de conectividad o frescura cuando afecte una acción.

La pantalla no necesita exponer identificadores técnicos salvo para diagnóstico autorizado.

---

#### 11. Contexto visible no es autoridad

La presencia en pantalla de una sede, caja, estación, rol o dispositivo no concede permisos.

Se conserva:

```text
CONTEXTO MOSTRADO
!=
AUTORIDAD
```

```text
ESTACIÓN DE CAJA
!=
PERMISO DE COBRO
```

```text
DISPOSITIVO COMPARTIDO
!=
ACTOR HUMANO
```

Toda mutación sigue revalidándose en su owner server-side.

---

#### 12. Condición nominal de entrada

La experiencia de cajero se considera operativamente utilizable cuando puede resolver:

```text
PULSO ACCESS
+ TURNO VIGENTE
+ SEDE / ÁREA EFECTIVAS
+ ACTOR O DISPOSITIVO VÁLIDOS
= ENTRADA AL INICIO
```

Las acciones internas requieren además los prerrequisitos específicos de `PULSO-AUTH-006`, incluido check-in para las capacidades ordinarias protegidas.

Entrar al inicio no significa poder vender, cobrar o usar loyalty automáticamente.

---

#### 13. Composición lógica del inicio

La pantalla se compone, como mínimo, de estas zonas lógicas:

| Zona | Contenido | Acción principal posible | Límite |
| --- | --- | --- | --- |
| contexto | actor, sede, punto/estación, turno y caja | corregir contexto cuando esté bloqueado | no concede permiso |
| acción primaria | siguiente acción de mayor prioridad permitida | abrir caja, nueva venta, continuar o cobrar | solo una acción dominante por estado |
| trabajo activo | pedidos/ventas que requieren intervención de caja | continuar recurso exacto | no muestra universo administrativo |
| accesos rápidos | cliente, loyalty y superficies operativas autorizadas | abrir acción puntual | no crea permisos implícitos |
| avisos | bloqueo, stale, unknown result, conectividad o dependencia | recuperar/revalidar | error no se presenta como vacío |

---

#### 14. Regla de prioridad de la acción principal

La acción primaria se resuelve por estado, no por preferencia fija del usuario ni por el orden visual de un menú.

Prioridad contractual:

```text
1. CONTEXTO BLOQUEANTE
2. CAJA REQUERIDA NO ABIERTA
3. OPERACIÓN ACTIVA QUE EXIGE CONTINUIDAD
4. COBRO PENDIENTE ACCIONABLE
5. NUEVA VENTA
6. ESTADO SIN TRABAJO URGENTE
```

Una acción solo entra en la prioridad si el actor tiene la capacidad necesaria y el recurso/estado es compatible.

---

#### 15. Turno ausente o inválido

Si no existe turno operativo válido para el cajero:

- no se habilitan mutaciones PULSO;
- no se presenta una lista vacía como si no hubiera ventas;
- se comunica que falta contexto laboral válido;
- la experiencia conserva la navegación segura para salir o resolver por el owner correspondiente.

Nunca:

```text
SIN TURNO
→ USAR ÚLTIMA SEDE
→ CONTINUAR
```

---

#### 16. Check-in requerido

`pulso.access` puede permitir la entrada durante un turno vigente para mostrar el requisito de marcación.

Las capacidades ordinarias internas del cajero requieren `T+C` conforme a `PULSO-AUTH-006`.

Por tanto, si falta check-in:

```text
INICIO VISIBLE
+
OPERACIÓN BLOQUEADA
```

La experiencia no simula check-in ni convierte el acceso a la app en permiso para operar.

---

#### 17. Caja no abierta

Cuando el contexto es válido y no existe sesión de caja utilizable, la acción dominante puede ser:

```text
ABRIR CAJA
→ VSCREEN-0089
```

solo si el actor posee `pulso.cash.sessions.start` y la terminal/punto de caja es compatible.

No se ofrece como acción ordinaria:

```text
CERRAR CAJA
→ VSCREEN-0090
```

porque `cajero_satelite` no recibe `pulso.cash.sessions.close` por `PULSO-AUTH-006`.

---

#### 18. Caja abierta y sin operación bloqueante

Con contexto y sesión de caja válidos, la acción dominante ordinaria es:

```text
NUEVA VENTA
→ VSCREEN-0081
```

La creación consume `pulso.sales.orders.create` y permanece separada de:

- cobro;
- cancelación;
- refund;
- cierre de caja;
- configuración;
- importación.

---

#### 19. Venta o pedido activo

Cuando existe un recurso accionable que requiere continuidad del cajero, el inicio debe priorizar el recurso real sobre crear trabajo nuevo cuando la operación así lo exija.

Puede conducir a:

```text
VSCREEN-0083 — Detalle y modificación de pedido
```

o a la superficie propietaria que represente la siguiente transición válida.

La tarjeta o fila de trabajo conserva identidad de recurso y estado; no permite mutar desde el resumen sin la revalidación correspondiente.

---

#### 20. Cobro pendiente

Cuando un pedido válido está listo para una acción de pago que corresponde al cajero:

```text
COBRAR
→ VSCREEN-0084
```

La experiencia debe distinguir:

```text
PEDIDO LISTO PARA COBRO
!=
PAGO CONFIRMADO
```

El CTA solo representa intención de entrar al flujo de cobro. No registra un pago desde el home.

---

#### 21. Resultado desconocido en pagos

Ante timeout, desconexión o respuesta incierta del proveedor de pago:

```text
UNKNOWN RESULT
!=
FAILED
```

El inicio no ofrece cobrar otra vez como acción automática hasta resolver o reconciliar el resultado aplicable.

El estado debe priorizar recuperación/consulta por encima de una segunda mutación potencialmente duplicada.

---

#### 22. Identificación de cliente

La identificación es una acción secundaria disponible cuando el flujo actual puede asociar cliente y existe:

```text
pulso.loyalty.customers.identify
```

Su destino canónico es:

```text
VSCREEN-0085 — Identificación de cliente y acumulación
```

La experiencia no presenta un buscador general de clientes ni expone el ledger PASS completo.

---

#### 23. Acumulación de puntos

La acumulación puede aparecer únicamente dentro de una venta elegible y con cliente/contexto válidos.

Se conserva:

```text
PULSO SOLICITA
PASS DECIDE Y REGISTRA LEDGER
```

El inicio no muestra “sumar puntos” como acción autónoma desvinculada de una venta o referencia empresarial válida.

---

#### 24. Redención de puntos o beneficios

La redención se dirige a:

```text
VSCREEN-0086 — Redención de puntos o beneficios
```

Debe respetar permiso, cliente, vigencia, venta cuando corresponda, actor efectivo y protección contra doble efecto.

La visibilidad del saldo o de una recompensa no constituye autorización para redimir.

---

#### 25. Pedidos de canales externos

`VSCREEN-0087 — Bandeja de pedidos de canales externos` puede aparecer como acceso secundario cuando exista trabajo accionable para el cajero dentro de su sede/punto y permisos efectivos.

El inicio no convierte todos los canales externos en ventas propias del cajero ni mezcla ingestión administrativa con operación de caja.

---

#### 26. Seguimiento de preparación y entrega

`VSCREEN-0088 — Seguimiento de preparación y entrega` puede aportar continuidad al recurso que el cajero necesita atender.

La experiencia muestra únicamente la proyección necesaria para decidir el siguiente paso de caja.

No transfiere ownership productivo de FOGO, inventario de NEXO ni coordinación logística propietaria.

---

#### 27. Relación con el salón

`VSCREEN-0082 — Mapa de salón y mesas` pertenece al proceso de servicio en mesa y será especializado por `PULSO-UX-003` para servicio de salón.

En el inicio del cajero puede aparecer como acceso secundario únicamente si:

- el actor posee la autoridad necesaria;
- el contexto de la sede/punto lo hace relevante;
- existe trabajo que requiere intervención de caja sobre salón.

Regla:

```text
CAJERO PUEDE PARTICIPAR EN VPROC-0038
!=
HOME DE CAJERO = HOME DE SERVICIO DE SALÓN
```

---

#### 28. Configuración física consumida

El inicio consume `OPS-POS-001` para contextualizar únicamente lo necesario:

- `site_id` válido;
- punto comercial aplicable;
- estación de caja cuando exista;
- relación con zonas o mesas cuando el trabajo lo requiere.

No inventa cantidad de mesas, UUID, layout ni puntos físicos no confirmados.

No usa zona o estación como permiso.

---

#### 29. Caja y mostrador integrados

Cuando una sede tiene un punto físico integrado de caja/mostrador, el inicio puede reflejar una única identidad operativa visible y ofrecer acciones compatibles con las capacidades efectivas del cajero.

No duplica el mismo punto físico en dos homes independientes por nombre funcional.

Esto no absorbe `PULSO-UX-004 — Diseñar inicio para mostrador`, que definirá la composición específica de esa función.

---

#### 30. Dispositivo compartido

En terminal compartida se conserva:

```text
TECHNICAL PRINCIPAL
!=
DEVICE
!=
HUMAN ACTOR
```

El inicio puede mostrar que la terminal es compartida y solicitar identificación del trabajador cuando el contrato lo exige.

No conserva indefinidamente el actor anterior ni utiliza el principal técnico como sustituto del cajero ejecutor.

---

#### 31. Cambio de actor

Un cambio de trabajador A → B obliga a recalcular la experiencia con el actor B.

Debe invalidarse cualquier proyección actor-bound que ya no sea válida, incluidos:

- acciones disponibles;
- trabajo filtrado por capacidad;
- confirmaciones sensibles;
- firma del actor anterior;
- contexto que dependa del turno o check-in.

El cambio de actor no cambia por sí mismo la identidad de la estación o del dispositivo.

---

#### 32. Matriz de acciones ordinarias del cajero

El inicio consume exactamente la decisión de `PULSO-AUTH-006`:

| Capacidad | Inicio del cajero | Tratamiento UX |
| --- | --- | --- |
| `pulso.access` | permitida con contexto aplicable | entrada; nunca wildcard |
| `pulso.sales.orders.view` | permitida | trabajo y pedidos mínimos autorizados |
| `pulso.sales.orders.create` | permitida | habilita Nueva venta cuando el estado lo permite |
| `pulso.sales.orders.update` | permitida | habilita continuidad ordinaria sobre recurso compatible |
| `pulso.payments.transactions.collect` | permitida | habilita entrada a Cobro |
| `pulso.cash.sessions.start` | permitida | habilita Apertura de caja cuando aplica |
| `pulso.loyalty.customers.identify` | permitida | identificación dirigida de cliente |
| `pulso.loyalty.points.accumulate` | permitida | dentro de venta elegible |
| `pulso.loyalty.points.redeem` | permitida | dentro de flujo elegible |
| `pulso.sales.orders.cancel` | no concedida | no aparece como acción ordinaria habilitada |
| `pulso.payments.transactions.refund` | no concedida | no aparece como acción ordinaria habilitada |
| `pulso.cash.sessions.close` | no concedida | no aparece como acción ordinaria habilitada |
| `pulso.delivery.deliveries.override` | no concedida | no aparece como acción ordinaria habilitada |

---

#### 33. Acciones sensibles excluidas

El home ordinario del cajero no habilita por inferencia:

- cancelar pedido;
- refund de pago;
- cerrar caja;
- reabrir o corregir cierre;
- override de entrega;
- override de precio;
- publicación administrativa;
- configuración de zonas/mesas;
- importación de ventas;
- edición de permisos o dispositivo.

Cuando una operación necesita autoridad superior, la experiencia debe conducir a un flujo gobernado o informar el bloqueo; no reutiliza un botón ordinario con más efecto.

---

#### 34. Administración e importaciones fuera del inicio

`/sales-imports` y cualquier configuración administrativa quedan fuera de la composición ordinaria del cajero.

Se conserva:

```text
OPERAR PULSO
!=
CONFIGURAR PULSO
!=
ADMINISTRAR INTEGRACIONES
```

La visibilidad accidental de una ruta no la convierte en acceso rápido del home.

---

#### 35. Jerarquía de información

El inicio evita un dashboard denso de métricas que no ayudan al trabajo inmediato.

Orden visual recomendado por contrato:

1. bloqueo o contexto crítico;
2. acción primaria;
3. trabajo activo accionable;
4. accesos rápidos permitidos;
5. información secundaria mínima.

Métricas históricas, auditoría extensa y configuración no desplazan la acción actual del cajero.

---

#### 36. Trabajo activo y límites de listado

La lista de trabajo del home debe priorizar recursos realmente accionables para el actor y el contexto actuales.

No equivale a una vista administrativa de todas las ventas de la sede.

Cada entrada debe permitir reconocer al menos:

- recurso/pedido;
- estado útil para la decisión;
- importe o señal comercial cuando corresponda;
- canal/modalidad cuando sea relevante;
- siguiente acción permitida;
- bloqueo si existe.

Los datos personales se minimizan.

---

#### 37. Estados de experiencia

El inicio distingue al menos:

| Estado UX | Significado | Tratamiento |
| --- | --- | --- |
| `CONTEXTO_REQUERIDO` | turno, sede, área, actor o check-in insuficientes | bloquear mutaciones y explicar qué falta |
| `CAJA_REQUIERE_APERTURA` | contexto válido sin sesión de caja utilizable | ofrecer apertura solo si está autorizada |
| `TRABAJO_ACCIONABLE` | existe una operación que requiere continuidad | priorizar recurso y siguiente acción |
| `LISTO_PARA_VENDER` | caja/contexto válidos sin prioridad superior | ofrecer Nueva venta |
| `SIN_TRABAJO` | contexto válido y ninguna operación pendiente | estado vacío real con acción válida disponible |
| `SIN_PERMISO` | capacidad requerida denegada | no revelar datos protegidos |
| `DATOS_DESACTUALIZADOS` | frescura insuficiente | revalidar antes de mutar |
| `RESULTADO_DESCONOCIDO` | efecto sensible no conciliado | bloquear reintento ciego |
| `FALLO_TECNICO` | una fuente necesaria falló | conservar estado y recuperación segura |

Estos rótulos son contrato UX y no crean estados persistidos nuevos.

---

#### 38. Vacío, deny, stale y error

La experiencia conserva:

```text
SIN TRABAJO
!=
SIN PERMISO
!=
SIN CONTEXTO
!=
STALE
!=
FALLO TÉCNICO
!=
RESULTADO DESCONOCIDO
```

Un error de consulta no puede mostrarse como “no hay pedidos”.

Una denegación no puede presentarse como botón deshabilitado sin explicación cuando el actor necesita saber por qué no puede continuar.

---

#### 39. Recuperación segura

Cuando el inicio pierde sesión, red, dispositivo, actor o una dependencia requerida:

- conserva la referencia del trabajo en curso cuando sea seguro;
- evita duplicar mutaciones;
- revalida contexto antes de reanudar;
- distingue operación no enviada, enviada y resultado desconocido;
- no inventa éxito por optimismo de UI.

La recuperación detallada de cada flujo pertenece a sus superficies propietarias posteriores.

---

#### 40. Operación degradada

`VPROC-0039` es una operación crítica que admite degradación controlada según los contratos transversales vigentes.

El inicio no convierte “offline” en autorización general para vender sin controles.

Debe mostrar únicamente las acciones expresamente soportadas por el modo degradado aplicable y reservar la reconciliación al owner correspondiente.

---

#### 41. Privacidad y minimización

El home del cajero no carga por defecto:

- ledger completo de loyalty;
- perfil completo del cliente;
- historial global de ventas;
- datos de otras sedes;
- información de empleados ajenos;
- configuración administrativa;
- logs técnicos;
- información financiera NUMERA;
- datos de proveedores o producción no requeridos.

La proyección responde a la acción actual y al territorio efectivo.

---

#### 42. Accesibilidad y operación táctil

El diseño exige que la futura materialización permita identificar claramente:

- acción dominante;
- estado y bloqueo;
- foco de teclado cuando aplique;
- etiquetas comprensibles;
- confirmación de acciones sensibles cuando estén permitidas;
- targets adecuados a operación táctil.

`PULSO-UX-015 — Diseñar comportamiento táctil por estación` conserva la especificación detallada de interacción táctil y no es absorbida por esta tarea.

---

#### 43. Navegación

El inicio no es un menú de rutas.

La navegación se deriva de trabajo y capacidad:

```text
INICIO
→ ACCIÓN / RECURSO
→ SUPERFICIE PROPIETARIA
→ RETORNO AL CONTEXTO DE TRABAJO
```

Los query parameters no conceden autoridad y no crean nuevas pantallas canónicas.

---

#### 44. Relación con VSCREEN-0081

`VSCREEN-0081 — Creación de venta o pedido` recibe desde el inicio:

- contexto efectivo ya resuelto;
- intención explícita de nueva venta;
- punto/canal permitido cuando aplique;
- actor efectivo;
- retorno seguro al home o al recurso creado.

No recibe un permiso fabricado por la navegación.

El diseño detallado de creación queda en `PULSO-UX-007`.

---

#### 45. Relación con VSCREEN-0084

`VSCREEN-0084 — Cobro y medios de pago` recibe:

- pedido exacto;
- estado cobrable;
- importe y moneda vigentes;
- actor, sede y caja efectivos;
- idempotencia/receipt según el contrato propietario.

El home no implementa el payment flow.

`PULSO-UX-008` conserva la simplificación detallada del cobro.

---

#### 46. Relación con VSCREEN-0089 y VSCREEN-0090

`VSCREEN-0089 — Apertura de caja` puede ser acción primaria del cajero.

`VSCREEN-0090 — Cierre de caja` no forma parte de la autoridad ordinaria de `cajero_satelite` aprobada en `PULSO-AUTH-006`.

El diseño de cierre y reapertura pertenece a `PULSO-UX-010` y a la autorización sensible aplicable.

---

#### 47. Relación con VSCREEN-0091

`VSCREEN-0091 — Anulación, devolución y reembolso` no se ofrece como acción ordinaria habilitada del cajero.

Si una venta necesita corrección sensible, el home puede mostrar el estado y el camino de escalamiento permitido, pero no ejecutar la acción con `orders.update` ni con una autoridad broad.

`PULSO-UX-009` conserva el diseño detallado de separación de esas operaciones.

---

#### 48. Relación con supervisor

El supervisor puede consumir señales de `VSCREEN-0080` como superficie secundaria de supervisión, pero esta tarea no diseña su inicio.

Se conserva:

```text
HOME CAJERO
!=
HOME SUPERVISOR
```

`PULSO-UX-006 — Diseñar inicio para supervisor` es el owner de la composición supervisora.

---

#### 49. Brechas AS-IS y propietarios

| Brecha observada | Riesgo | Propietario canónico | Condición de salida |
| --- | --- | --- | --- |
| `/` monta `ScannerPage` en vez de un workspace integral de `VSCREEN-0080` | scanner se confunde con inicio POS | materialización UX que consuma `PULSO-UX-002` | inicio materializado con contexto, acción primaria y trabajo accionable |
| `/` y `/scanner` usan `pulso.pos.main` | autoridad broad gobierna superficies distintas | materialización de `PULSO-AUTH-015` y owners de autorización | permisos atómicos consumidos sin wildcard broad |
| `preferredSiteId` puede prevalecer en el resolver AS-IS | query puede parecer territorio autoritativo | materialización de `PULSO-AUTH-011` / package de contexto | sede efectiva resuelta por contexto canónico y parámetro solo reductivo |
| shared device usa `navigation_role` en decisiones AS-IS | dispositivo puede confundirse con actor | materialización de `PULSO-AUTH-012..013` | principal, dispositivo y trabajador separados en autorización y auditoría |
| caja completa no está materializada por la sola presencia de `payment_status` | home podría asumir caja abierta/cerrada sin contrato | `PULSO-UX-010` + owners físicos aplicables | sesión de caja propietaria y estados demostrados |
| scanner concentra identificación y loyalty | home puede quedar diseñado alrededor del cliente en vez de la venta | `PULSO-UX-002`, `PULSO-UX-011`, `PULSO-UX-012` | identificación/acumulación/redención aparecen como acciones contextuales separadas |
| `orders-board-legacy` conserva consumo runtime | trabajo activo puede depender de contrato legacy | `PULSO-UX-020` / `PULSO-UX-021` y paquete propietario | paridad demostrada y retiro gobernado del legado |

No queda una brecha de esta tarea sin propietario y condición de salida.

---

#### 50. Handoff inmediato a PULSO-UX-003

`PULSO-UX-003 — Diseñar inicio para servicio de salón` recibe:

```text
VSCREEN-0080 ES IDENTIDAD COMPARTIDA DE INICIO POS
CAJERO PRIORIZA VPROC-0039 / CAJA / VENTA
SERVICIO DE SALÓN PRIORIZARÁ VPROC-0038 / MESAS / ATENCIÓN
VSCREEN-0082 ES SUPERFICIE PRINCIPAL DE SALÓN
ZONA FÍSICA != PERMISO
MESA != SESIÓN != PEDIDO != CUENTA
ACTOR / SEDE / ÁREA / DISPOSITIVO DEBEN RESOLVERSE ANTES DE ACCIONES
HOME DE CAJERO PUEDE ENLAZAR SALÓN SOLO COMO ACCIÓN SECUNDARIA AUTORIZADA
HOME DE SALÓN NO HEREDA CAPACIDADES DE CAJA POR PROXIMIDAD FÍSICA
```

La 003 deberá especializar el mismo principio actor+tarea para `servicio_salon` sin duplicar el home del cajero.

---

#### 51. Handoff al resto de PULSO-UX

| Tarea | Entrada exacta proveniente de PULSO-UX-002 |
| --- | --- |
| `PULSO-UX-003` | separar servicio de salón de venta/caja ordinaria |
| `PULSO-UX-004` | especializar mostrador sin duplicar el punto físico integrado |
| `PULSO-UX-005` | componer capacidades múltiples sin crear wildcard operativo |
| `PULSO-UX-006` | diseñar supervisión como experiencia distinta del home de cajero |
| `PULSO-UX-007` | convertir Nueva venta en flujo mínimo y gobernado |
| `PULSO-UX-008` | simplificar cobro sin colapsar pedido, payment y resultado |
| `PULSO-UX-009` | separar anulación, devolución y refund fuera de actualización ordinaria |
| `PULSO-UX-010` | diseñar cierre/reapertura de caja separado de apertura ordinaria |
| `PULSO-UX-011` | integrar identificación y acumulación dentro del flujo correcto |
| `PULSO-UX-012` | integrar redención sin convertir saldo en autorización |
| `PULSO-UX-013` | confirmar acciones sensibles con contexto y efecto explícitos |
| `PULSO-UX-014` | asegurar actor real en terminales compartidas |
| `PULSO-UX-015` | definir comportamiento táctil por estación |
| `PULSO-UX-020` | clasificar prototipo histórico sin elevarlo por existencia |
| `PULSO-UX-021` | cerrar arquitectura objetivo y retirar dependencias legacy cuando proceda |

---

#### 52. Requisitos de prueba derivados

**Resultado:** NO GENERA REQUISITOS DE PRUEBA.

**Requisitos creados:** 0
**Requisitos modificados:** 0
**Requisitos diferidos:** 0
**Requisitos obsoletos:** 0

Justificación: la obligación de orientar la experiencia por actor, tarea, estado, autorización, contexto, recuperación y ciclo comercial PULSO ya cuenta con requisitos vigentes. Esta tarea especializa `VSCREEN-0080` para el cajero sin introducir una conducta verificable nueva ni modificar el Registro 04A.

---

#### 53. Cobertura de prueba vigente reutilizada

Se reutiliza sin modificación:

- `TREQ-PULSO-001` para el ciclo E2E de caja, venta, pago, inventario y loyalty;
- `TREQ-PULSO-005` para separar pedido, línea, preparación, mesa, cuenta y venta y conservar estados independientes;
- `TREQ-PULSO-006` para acciones nombradas, autorizadas y auditables de pago y caja;
- `TREQ-PULSO-014` y `TREQ-PULSO-015` para acceso protegido y territorio que no puede ampliarse desde `site_id`;
- `TREQ-PULSO-026` para impedir que `pulso.pos.main` se trate como permiso exacto suficiente;
- `TREQ-AUTH-001` para autorización basada en permiso, contexto y alcance canónicos;
- `TREQ-AUTH-011` para intersección entre dispositivo compartido y trabajador identificado;
- `TREQ-AUTH-013` para impedir bypass por URL, formulario, API o RPC;
- `TREQ-AUTH-015` para evidencia correlacionable de actor, contexto, recurso y decisión;
- `TREQ-UX-001` para hacer identificables tarea actual, acción principal y estado;
- `TREQ-UX-003` para adecuar información, acciones y densidad al actor y autorización;
- `TREQ-UX-006` para recuperación segura ante pérdida de sesión, red, dispositivo o proveedor;
- `TREQ-UX-008` y `TREQ-UX-009` para organizar por acción/superficie y consumir contexto operativo real sin fabricar autoridad.

Esta enumeración es trazabilidad reutilizada y no constituye modificación del Registro 04A.

---

#### 54. Evidencia de validación

| Clase | Estado | Evidencia |
| --- | --- | --- |
| BUILD | NOT_EXECUTED | El build documental corresponde al checkout después de incorporar el artefacto; esta tarea no materializa producto. |
| LOCAL | NOT_EXECUTED | Formato, quality, delivery, validadores de dominio y batería global quedan pendientes de la incorporación en el checkout local. |
| REMOTA | PASS | Se verificaron el owner PULSO, continuidad, topología `DEFINE_ONCE`, `VSCREEN-0080`, `VPROC-0039`, `OPS-POS-001`, permisos de `cajero_satelite`, Registro 04A aplicable y runtime vigente de `vento-pulso`, incluido que `/` y `/scanner` montan `ScannerPage`. |
| OPERATIVA | NOT_EXECUTED | No se ejecutaron ventas, apertura de caja, cobros, identificación, loyalty ni pruebas con cajeros reales. |
| FÍSICA | NOT_APPLICABLE | `PULSO-UX-002` no crea instancia física propia ni autoriza cambios de producto, datos o infraestructura. |

---

#### 55. Criterios de aceptación

La tarea queda documentalmente completa cuando:

- [ ] `VSCREEN-0080` se conserva como única identidad canónica de Inicio POS;
- [ ] no se inventa una pantalla nueva para el cajero;
- [ ] `VPROC-0039` queda como proceso principal del inicio de cajero;
- [ ] el `/` AS-IS basado en scanner se reconoce como parcial y no equivalente;
- [ ] el home se organiza por siguiente trabajo y no por rutas técnicas;
- [ ] actor, sede, área, estación, turno, check-in, dispositivo y caja pueden representarse sin convertirse en autoridad;
- [ ] turno inválido bloquea operación sin simular ausencia de trabajo;
- [ ] falta de check-in bloquea capacidades internas aunque la app sea visible;
- [ ] apertura de caja puede ser acción primaria únicamente con permiso y contexto válidos;
- [ ] cierre de caja no se concede al cajero ordinario;
- [ ] Nueva venta usa `VSCREEN-0081` cuando la caja/contexto son válidos;
- [ ] trabajo activo puede priorizarse sobre crear un recurso nuevo;
- [ ] cobro conduce a `VSCREEN-0084` sin registrar pago desde el home;
- [ ] resultado desconocido bloquea reintentos ciegos;
- [ ] identificación y acumulación se integran mediante `VSCREEN-0085` sin apropiarse del ledger PASS;
- [ ] redención se separa mediante `VSCREEN-0086`;
- [ ] canales externos y seguimiento aparecen solo cuando son accionables y autorizados;
- [ ] salón permanece secundario para el home del cajero y se entrega a `PULSO-UX-003`;
- [ ] la configuración física de `OPS-POS-001` se consume sin inventar datos;
- [ ] dispositivo compartido y trabajador permanecen identidades distintas;
- [ ] cambio de actor invalida proyecciones actor-bound;
- [ ] las nueve capacidades ordinarias concedidas al cajero y las cuatro no concedidas quedan reflejadas sin wildcard;
- [ ] configuración e importaciones quedan fuera del home ordinario;
- [ ] el inicio evita densidad administrativa y prioriza acción, trabajo y recuperación;
- [ ] vacío, deny, stale, fallo técnico y resultado desconocido permanecen distintos;
- [ ] la recuperación no duplica mutaciones;
- [ ] la proyección de datos queda minimizada al trabajo actual;
- [ ] accesibilidad y operación táctil quedan compatibles con su owner posterior;
- [ ] cada brecha AS-IS tiene propietario y condición de salida;
- [ ] `PULSO-UX-003` recibe un handoff suficiente para diseñar salón sin duplicar caja;
- [ ] no se crean ni modifican requisitos de prueba;
- [ ] no se ejecutan cambios físicos.

---

#### 56. Límites

Esta tarea no:

- implementa `VSCREEN-0080`;
- modifica `/`;
- elimina `/scanner`;
- crea una ruta nueva;
- crea componentes o Server Actions;
- abre o cierra una caja real;
- crea una venta real;
- procesa un pago real;
- identifica o modifica un cliente real;
- acumula o redime puntos reales;
- cancela pedidos;
- ejecuta refunds;
- concede overrides;
- configura zonas, mesas, puntos o estaciones;
- administra importaciones;
- modifica permisos o roles;
- modifica Supabase, RLS, RPC, grants, tablas, datos o migraciones;
- modifica packages compartidos;
- retira código legacy;
- diseña en detalle el home de servicio de salón;
- diseña en detalle mostrador, operador integral o supervisor;
- sustituye `PULSO-UX-007..021`;
- modifica el Registro 04A;
- crea una instancia física propia;
- desarrolla `PULSO-UX-003`.

---

#### 57. Continuidad

**ÚLTIMA TAREA APROBADA**
`PULSO-AUTH-016 — Ejecutar pruebas integrales`

**TAREA ACTUAL APROBADA**
`PULSO-UX-002 — Diseñar inicio para cajero`

**SIGUIENTE TAREA RESERVADA**
`PULSO-UX-003 — Diseñar inicio para servicio de salón`
### ✅ PULSO-UX-003 — Diseñar inicio para servicio de salón

**Estado:** APROBADA
**Tarea anterior:** PULSO-UX-002 — Diseñar inicio para cajero
**Tarea siguiente:** PULSO-UX-004 — Diseñar inicio para mostrador
**Tipo de tarea:** diseño documental integral de `VSCREEN-0080 — Inicio POS` para el actor operativo `servicio_salon`, especializando la entrada por trabajo de `VPROC-0038` y utilizando `VSCREEN-0082 — Mapa de salón y mesas` como superficie principal de operación, con priorización de llamados, mesas y sesiones, handoffs explícitos hacia pedido y cobro, separación estricta frente a caja, mostrador, configuración y supervisión, y bloqueo fail-closed de toda mutación que no disponga de permiso atómico canónico; `DEFINE_ONCE` / `NO_PHYSICAL_INSTANCE`
**Bloque:** BLOQUE N — PULSO
**Repositorio propietario:** `vento-group-sas/vento-shell`
**Archivo propietario:** `docs/plan-canonico/modular/bloques/N_PULSO/02_EXPERIENCIA_POS_Y_OPERACION_COMERCIAL.md`
**Estado físico resultante:** `NO_PHYSICAL_INSTANCE`
**Cambios físicos autorizados:** Ninguno durante esta tarea.
**Requisitos de prueba creados o modificados:** 0

---

#### 1. Propósito

Diseñar el contrato de experiencia inicial de PULSO para una persona cuyo rol operativo efectivo sea `servicio_salon`, de forma que al entrar pueda reconocer el contexto de servicio, identificar qué mesa o llamado requiere atención y continuar únicamente el trabajo de salón compatible con su autoridad efectiva.

La experiencia debe permitir:

- comprender sede, área de servicio, actor y dispositivo vigentes;
- priorizar llamados activos y mesas que requieren atención;
- distinguir mesa, sesión, pedido, cuenta y pago;
- reconocer el estado real del servicio de mesa;
- continuar un pedido existente o conducir el handoff hacia la superficie propietaria correspondiente;
- distinguir una solicitud de cuenta de la autoridad para cobrar;
- conservar actor ejecutor, creador, asignado y responsable como identidades separadas;
- tratar Realtime como acelerador de actualización y no como fuente autónoma de autoridad;
- bloquear operaciones internas cuando no exista un permiso atómico materializado para `servicio_salon`;
- mantener fuera del home ordinario la administración física, caja, supervisión y excepciones sensibles.

La tarea especializa la pantalla canónica existente:

```text
VSCREEN-0080 — Inicio POS
```

sin crear una nueva identidad de pantalla.

---

#### 2. Entrada recibida de PULSO-UX-002

`PULSO-UX-002` entrega una frontera explícita:

```text
VSCREEN-0080 ES IDENTIDAD COMPARTIDA DE INICIO POS
CAJERO PRIORIZA VPROC-0039 / CAJA / VENTA
SERVICIO DE SALÓN PRIORIZA VPROC-0038 / MESAS / ATENCIÓN
VSCREEN-0082 ES SUPERFICIE PRINCIPAL DE SALÓN
ZONA FÍSICA != PERMISO
MESA != SESIÓN != PEDIDO != CUENTA
ACTOR / SEDE / ÁREA / DISPOSITIVO DEBEN RESOLVERSE ANTES DE ACCIONES
HOME DE CAJERO PUEDE ENLAZAR SALÓN SOLO COMO ACCIÓN SECUNDARIA AUTORIZADA
HOME DE SALÓN NO HEREDA CAPACIDADES DE CAJA POR PROXIMIDAD FÍSICA
```

Por tanto, esta tarea no replica el home del cajero y no convierte el mapa de salón en una pantalla de caja.

---

#### 3. Naturaleza y topología

La topología vigente de `PULSO-UX-001..021` establece:

```text
mode = DEFINE_ONCE
execution_gate = NO_PHYSICAL_INSTANCE
```

Consecuencias:

1. `PULSO-UX-003` se define una sola vez;
2. no existe una instancia física propia;
3. no se modifica `vento-pulso`;
4. no se crean rutas, componentes, permisos, tablas, RPC o migraciones;
5. no se mutan zonas, mesas, sesiones ni llamados;
6. las brechas AS-IS quedan asignadas a su propietario canónico;
7. la materialización posterior debe consumir este contrato sin ampliar autoridad.

---

#### 4. Fuentes y contratos consumidos

El diseño conserva como entradas:

- `PULSO-UX-001 — Inventariar procesos de venta, caja y salón`;
- `PULSO-UX-002 — Diseñar inicio para cajero`;
- `OPS-POS-001 — Definir zonas físicas, mesas y puntos de servicio del POS por sede`;
- `AUTH-RBAC-011 — Crear matriz de servicio_salon`;
- `PULSO-AUTH-011 — Limitar operación a sede del turno`;
- `PULSO-AUTH-012 — Integrar dispositivos POS compartidos`;
- `PULSO-AUTH-013 — Registrar trabajador que ejecuta la operación`;
- `PULSO-AUTH-014 — Mantener configuración administrativa separada`;
- `PULSO-AUTH-015 — Migrar a paquetes de vento-shell`;
- `PULSO-AUTH-016 — Ejecutar pruebas integrales`;
- `VSCREEN-0080` como identidad canónica de Inicio POS;
- `VSCREEN-0082` como workspace propietario de mesa y servicio;
- `VSCREEN-0083` como detalle y modificación de pedido activo;
- `VSCREEN-0084` como superficie propietaria de cobro;
- `VPROC-0038` como proceso principal de servicio en mesa;
- el runtime vigente de `vento-pulso` como evidencia AS-IS, no como autoridad de diseño.

---

#### 5. Actor contractual

El actor principal es:

```text
operational_role = servicio_salon
```

Su entrada operativa exige, como mínimo:

```text
ACTOR HUMANO IDENTIFICADO
+ EMPLEADO ACTIVO
+ TURNO PUBLICADO Y VIGENTE
+ ROL OPERATIVO EFECTIVO servicio_salon
+ SEDE AUTORIZADA
+ ÁREA OPERATIVA VÁLIDA DE TIPO service
+ DISPOSITIVO COMPATIBLE CUANDO APLIQUE
+ PERMISO EXACTO PARA LA ACCIÓN INTERNA
+ RECURSO Y ESTADO COMPATIBLES
= ACCIÓN HABILITADA
```

El nombre del rol por sí solo no concede capacidad.

---

#### 6. Frontera de autorización vigente

La matriz canónica vigente de `servicio_salon` contiene once concesiones operativas totales.

Dentro de PULSO, la única concesión actual es:

```text
pulso.access
```

con alcance `CTX-SERVICE-PULSO`.

Ese permiso significa exclusivamente:

```text
ENTRAR A PULSO
+ MOSTRAR CONTEXTO DE SERVICIO
```

No concede por sí solo:

- consultar o gestionar mesas;
- abrir o cerrar sesiones;
- crear, tomar, asignar, resolver o cancelar llamados;
- tomar o modificar pedidos;
- confirmar entrega;
- cobrar;
- operar caja;
- anular, devolver o reembolsar;
- acumular o redimir puntos.

---

#### 7. Regla fail-closed de la experiencia

La tarea define el trabajo objetivo, pero no inventa permisos faltantes.

```text
ACCIÓN UX DEFINIDA
+ PERMISO ATÓMICO AUSENTE
=
ACCIÓN NO MATERIALIZABLE TODAVÍA
```

Nunca:

```text
pulso.access
→ permiso implícito para mesa / sesión / llamado / pedido / cobro
```

Si una materialización futura no puede resolver una PermissionKey exacta, la acción debe permanecer bloqueada o no disponible.

---

#### 8. Identidad de inicio

El inicio continúa siendo:

```text
VSCREEN-0080 — Inicio POS
```

No se crea una pantalla independiente llamada “Inicio de salón”.

`VSCREEN-0080` se especializa por actor, estación y trabajo pendiente.

Para `servicio_salon`, su composición prioriza `VPROC-0038` y conduce a `VSCREEN-0082`.

---

#### 9. Proceso principal

El proceso principal es:

```text
VPROC-0038 — Gestionar servicio en mesa de apertura a cierre con pedido, preparación, entrega, pago y conciliación
```

La responsabilidad del home consiste en identificar el siguiente trabajo de salón permitido dentro de ese proceso, no en ejecutar todo el lifecycle desde una sola pantalla.

---

#### 10. Estados canónicos de VPROC-0038

La experiencia reconoce exactamente:

```text
TABLE_SERVICE_OPENED
ORDERING
PREPARATION_IN_PROGRESS
PARTIALLY_SERVED
SERVED
PAYMENT_PENDING
PAYMENT_CONFIRMED
TABLE_CLOSE_PENDING
TABLE_SERVICE_CLOSED
```

No se colapsan en un único estado de “ocupada”.

---

#### 11. Semántica de los estados

| Estado | Significado para el inicio de salón | Próxima intención UX posible |
| --- | --- | --- |
| `TABLE_SERVICE_OPENED` | existe servicio de mesa sin cierre | iniciar/continuar atención permitida |
| `ORDERING` | se capturan líneas y preferencias | continuar pedido autorizado |
| `PREPARATION_IN_PROGRESS` | cocina/barra trabajan | seguimiento; no duplicar preparación |
| `PARTIALLY_SERVED` | parte del pedido fue entregada | identificar pendientes y continuar servicio |
| `SERVED` | pedido servido, sin implicar pago | esperar solicitud o handoff de cuenta |
| `PAYMENT_PENDING` | consumo listo para cobro | conducir a caja/cobro autorizado |
| `PAYMENT_CONFIRMED` | pago confirmado | preparar verificación final de mesa |
| `TABLE_CLOSE_PENDING` | se verifican efectos antes de liberar mesa | completar controles propietarios |
| `TABLE_SERVICE_CLOSED` | servicio cerrado | no ofrecer mutaciones sobre esa sesión |

---

#### 12. Superficie principal

La superficie principal de trabajo es:

```text
VSCREEN-0082 — Mapa de salón y mesas
VPROC-0038::STEP-MANAGE_TABLE_SERVICE
```

Su propósito es gestionar ocupación, mesa y servicio de apertura a cierre.

El home no recrea esa superficie; la prioriza y le entrega contexto.

---

#### 13. Pregunta operativa del home

La experiencia responde primero:

```text
¿QUÉ MESA O LLAMADO NECESITA MI ATENCIÓN AHORA?
```

No:

```text
¿QUÉ MÓDULO QUIERO ABRIR?
```

ni:

```text
¿QUÉ TABLA DE BASE DE DATOS QUIERO VER?
```

---

#### 14. Orden de prioridad del trabajo

Cuando exista autoridad materializada, la prioridad funcional recomendada es:

1. bloqueo de contexto que impida operar;
2. llamado crítico o urgente pendiente;
3. llamado pendiente de atención;
4. llamado reconocido que requiere resolución;
5. mesa que solicita pedido;
6. mesa que solicita cuenta;
7. mesa con servicio activo que requiere continuidad;
8. mesa disponible susceptible de iniciar servicio, si la acción exacta está autorizada;
9. seguimiento no urgente.

La prioridad de UX no sustituye prioridad empresarial persistida ni autorización.

---

#### 15. Contexto visible mínimo

El inicio debe mostrar únicamente el contexto necesario para operar:

- actor humano efectivo;
- sede efectiva;
- área `service` efectiva;
- turno y check-in cuando apliquen;
- dispositivo/estación cuando exista;
- zona seleccionada únicamente como filtro físico;
- estado de frescura de la proyección.

No muestra configuración administrativa como parte del trabajo ordinario.

---

#### 16. Zona física

La agrupación primaria de mesas procede de `OPS-POS-001`:

```text
SEDE
→ ZONA
→ MESAS
```

La zona sirve para localizar y ordenar visualmente.

Regla obligatoria:

```text
ZONA FÍSICA
!=
ÁREA DE AUTORIZACIÓN
```

Cambiar de pestaña de zona no amplía territorio ni permiso.

---

#### 17. Mesa, sesión, pedido y cuenta

La experiencia conserva:

```text
MESA
!=
SESIÓN DE MESA
!=
PEDIDO
!=
CUENTA
!=
PAGO
```

Una mesa libre no implica ausencia histórica de sesiones.

Una sesión abierta no implica pedido pagado.

Un pedido servido no implica cuenta cobrada.

Un pago confirmado no implica mesa conciliada y cerrada.

---

#### 18. Estado visual de mesa

El estado visual es una proyección derivada de hechos propietarios.

Puede resumir, por ejemplo:

```text
available
occupied
ordering
attention_requested
bill_requested
blocked
```

pero esos rótulos no sustituyen el lifecycle de `VPROC-0038`.

La UI debe poder explicar qué hecho produjo el estado y qué acción sigue disponible.

---

#### 19. Llamados de servicio

Un llamado se correlaciona con:

- sede;
- zona cuando aplique;
- mesa;
- sesión cuando exista;
- dispositivo/origen cuando exista;
- tipo de solicitud;
- prioridad;
- estado;
- creador;
- asignado;
- actor ejecutor de cada transición.

Un llamado no cambia por sí solo el estado empresarial completo de la mesa.

---

#### 20. Tipos de llamado observados

El runtime actual reconoce al menos:

```text
attention
bill
order
urgent
cancel
```

La UX objetivo distingue su intención:

- `attention`: atención general;
- `bill`: solicitud de cuenta;
- `order`: intención de ordenar o continuar pedido;
- `urgent`: prioridad crítica de atención;
- `cancel`: intención de cancelación que requiere semántica y autoridad propias.

No todos los tipos son creables manualmente desde la UI AS-IS.

---

#### 21. Tomar un llamado

La acción conceptual “Tomar” significa reconocer que un trabajador asume atención del llamado.

Debe conservar separadas:

```text
created_by
assigned_to
actor_ejecutor_del_acknowledge
```

Nunca:

```text
acknowledged_at != assigned_to automático por inferencia
```

Si el sistema promete asignación al trabajador al tomarlo, esa asignación debe persistirse explícitamente por su acción propietaria.

---

#### 22. Resolver un llamado

“Resolver” significa cerrar la necesidad específica del llamado, no necesariamente cerrar:

- la sesión;
- el pedido;
- la cuenta;
- el pago;
- el servicio completo de mesa.

La resolución exige estado previo compatible, actor efectivo y permiso exacto.

---

#### 23. Solicitud de cuenta

Un llamado de tipo `bill` expresa:

```text
CLIENTE SOLICITA CUENTA
```

No expresa:

```text
SERVICIO_SALON PUEDE COBRAR
```

El home debe conducir al handoff apropiado hacia `VSCREEN-0084 — Cobro y medios de pago` cuando exista un actor con autoridad para cobrar.

`servicio_salon` no hereda `pulso.payments.transactions.collect` por proximidad física.

---

#### 24. Solicitud de pedido

Un llamado `order` puede priorizar la mesa para continuar el proceso de pedido.

La creación o modificación del pedido debe ocurrir en la superficie propietaria y con permiso exacto.

La UX puede conducir hacia:

- `VSCREEN-0081` cuando corresponda originar una venta/pedido válido;
- `VSCREEN-0083` cuando exista un pedido activo editable.

La selección concreta depende del estado del recurso y de la autoridad materializada.

---

#### 25. Servicio activo

Una mesa con sesión abierta puede requerir continuidad aunque no tenga un llamado pendiente.

El home puede priorizarla por:

- pedido en curso;
- preparación pendiente;
- entrega parcial;
- servicio pendiente;
- cuenta solicitada;
- cierre pendiente.

No inventa una alarma si la fuente propietaria no demuestra una condición accionable.

---

#### 26. Abrir servicio de mesa

El inicio de una nueva sesión pertenece al lifecycle de `VPROC-0038`.

La experiencia puede presentar la intención de iniciar servicio únicamente cuando:

- la mesa esté activa;
- no exista sesión incompatible;
- el contexto sea válido;
- exista un actor responsable;
- el permiso atómico correspondiente haya sido materializado;
- la acción sea server-side y auditable.

En el canon vigente de `servicio_salon` ese permiso atómico no está concedido todavía.

---

#### 27. Cerrar servicio de mesa

El cierre de mesa no es una consecuencia visual de haber cobrado.

Requiere verificar, cuando aplique:

- pedido;
- entrega;
- pago;
- descuentos;
- devoluciones;
- diferencias;
- llamados pendientes;
- liberación de mesa.

El rol `servicio_salon` no recibe autoridad de cierre por esta tarea.

---

#### 28. Handoff hacia pedido activo

`VSCREEN-0083 — Detalle y modificación de pedido` pertenece también a `VPROC-0038`.

La navegación debe conservar:

```text
site_id efectivo
+ table_id
+ session_id
+ order_id
+ actor
+ estado vigente
```

sin confiar en esos identificadores como autorización.

---

#### 29. Handoff hacia cobro

`VSCREEN-0084` es propietaria del cobro.

El servicio de salón puede entregar contexto suficiente:

```text
mesa
sesión
pedido/cuenta
sede
actor solicitante del handoff
motivo = PAYMENT_PENDING / bill_requested
```

pero no registra el pago desde el home.

---

#### 30. Relación con identificación y loyalty

`VSCREEN-0085` y `VSCREEN-0086` pueden participar en `VPROC-0038`, pero no forman parte automática del rol `servicio_salon`.

La atención en mesa no concede:

- acceso al ledger PASS;
- acumulación;
- redención;
- edición de identidad del cliente.

Toda integración se condiciona al permiso exacto y al flujo comercial válido.

---

#### 31. Relación con preparación y entrega

`VSCREEN-0088` puede proyectar el estado necesario para saber si una mesa espera preparación o entrega.

La experiencia de salón no absorbe:

- producción FOGO;
- stock NEXO;
- despacho externo;
- autoridad productiva de cocina o barra.

El actor de salón recibe únicamente la proyección necesaria para coordinar servicio.

---

#### 32. Caja y salón

La proximidad física entre salón y caja no fusiona roles.

```text
SERVICIO_SALON
!=
CAJERO_SATELITE
```

El home de salón no ofrece por defecto:

- apertura de caja;
- cierre de caja;
- refund;
- conciliación;
- override de pago;
- revisión administrativa de terminales.

---

#### 33. Mostrador y salón

Una mesa o zona de salón no convierte al actor en `mostrador_satelite`.

`PULSO-UX-004` recibe la especialización del punto de mostrador.

El home de salón puede transferir un pedido o una necesidad únicamente mediante un handoff explícito y autorizado.

---

#### 34. Operador integral

La existencia futura de un actor con varias capacidades no vuelve universal el home de `servicio_salon`.

`PULSO-UX-005` será propietario de la composición integral.

Esta tarea conserva una experiencia mínima y específica para salón.

---

#### 35. Supervisor

El supervisor puede requerir una vista más amplia de carga, bloqueos y excepciones.

`PULSO-UX-006` es propietario de esa composición.

El home de `servicio_salon` no muestra métricas o controles de supervisión por defecto.

---

#### 36. Configuración administrativa

La operación de salón no administra:

- zonas;
- nombres de zonas;
- numeración de mesas;
- capacidad;
- layout;
- posiciones;
- estaciones;
- reglas de configuración.

`OPS-POS-001` define la configuración física consumida y `PULSO-AUTH-014` conserva la separación administrativa.

---

#### 37. Dispositivo compartido

Cuando el home se use desde un dispositivo compartido:

```text
PRINCIPAL TÉCNICO
!=
DISPOSITIVO
!=
TRABAJADOR HUMANO
```

El dispositivo limita el alcance y el trabajador aporta la identidad humana efectiva.

Un `navigation_role` de dispositivo no sustituye el permiso del trabajador.

---

#### 38. Cambio de trabajador

El cambio de actor A→B obliga a invalidar proyecciones actor-bound y confirmaciones pendientes que dependan del actor anterior.

Un llamado que A reconoció no se considera ejecutado por B únicamente porque B herede la misma terminal.

---

#### 39. Realtime

Realtime puede acelerar:

- aparición de llamados;
- actualización de sesiones;
- cambios visibles de estado.

No puede conceder permiso ni aplicar una mutación automáticamente.

Toda acción sigue exigiendo revalidación contra el contexto y el estado actual.

---

#### 40. Frescura y concurrencia

Antes de ejecutar una transición sensible, la experiencia debe tratar como posible que el estado visible esté desactualizado.

Ejemplos:

- otro trabajador tomó el llamado;
- el llamado fue resuelto;
- la mesa cambió de sesión;
- el pedido cambió;
- se confirmó pago;
- se cerró el servicio.

Una respuesta de conflicto obliga a refrescar y mostrar el estado nuevo; no a repetir ciegamente la mutación.

---

#### 41. Estados UX diferenciados

La experiencia distingue al menos:

| Estado UX | Significado |
| --- | --- |
| `TRABAJO_DISPONIBLE` | existe mesa o llamado accionable dentro de autoridad |
| `SIN_TRABAJO` | contexto válido sin trabajo visible |
| `SIN_PERMISO` | el actor no posee la capacidad exacta |
| `CONTEXTO_INVALIDO` | sede/área/turno/actor no pueden resolverse |
| `DATOS_DESACTUALIZADOS` | la decisión visible requiere revalidación |
| `FALLO_TECNICO` | la fuente requerida falló |
| `CONFLICTO_CONCURRENTE` | otro actor o proceso cambió el recurso |
| `HANDOFF_PENDIENTE` | el siguiente efecto pertenece a otra superficie/actor |

No se introducen estos nombres como estados persistidos de `VPROC-0038`.

---

#### 42. No equivalencias de error y vacío

La UX conserva:

```text
SIN LLAMADOS
!=
SIN MESAS
!=
SIN PERMISO
!=
SIN CONTEXTO
!=
STALE
!=
FALLO TÉCNICO
```

Un error de lectura no se presenta como “no hay mesas”.

---

#### 43. Minimización de datos

El home de salón no necesita cargar por defecto:

- historial completo del cliente;
- ledger PASS;
- información financiera;
- datos de otras sedes;
- todas las órdenes históricas;
- configuración administrativa;
- logs de autorización;
- campos técnicos de dispositivos;
- inventario completo NEXO.

La proyección se limita a la atención actual.

---

#### 44. Accesibilidad y uso táctil

La experiencia debe ser compatible con operación rápida en estación o tablet:

- objetivos táctiles suficientes;
- estado no dependiente solo de color;
- prioridad visible con texto/icono;
- navegación por teclado cuando aplique;
- foco preservado tras actualización;
- confirmaciones proporcionales al riesgo;
- audio opcional como ayuda, nunca como único canal.

El detalle final de interacción táctil pertenece a `PULSO-UX-015`.

---

#### 45. AS-IS de `/salon`

El runtime actual de `/salon`:

- exige acceso a PULSO y `pos.main` legacy;
- recibe `site_id` desde query y lo entrega al resolver actual;
- lee `pos_zones`, `pos_tables`, sesiones abiertas y llamados activos;
- filtra las consultas iniciales por `site_id`;
- deriva estados visuales de mesa;
- mantiene una cola visible de llamados;
- permite refresco manual;
- escucha cambios Realtime de llamados y sesiones;
- permite crear llamados manuales;
- permite cambiar un llamado de `pending` a `acknowledged` o `resolved` desde el cliente.

Ese runtime es evidencia parcial, no el contrato final.

---

#### 46. Brecha AS-IS de autorización broad

`/salon` utiliza actualmente:

```text
permissionCode: ["pos.main"]
```

pero el canon actual clasifica `pulso.pos.main` como broad/legacy y prohíbe tratarlo como suficiencia para todas las acciones.

La materialización objetivo debe migrar a capacidades atómicas sin convertir `pulso.access` en fallback permisivo.

---

#### 47. Brecha AS-IS de territorio cliente

El resolver actual puede priorizar un `preferredSiteId` recibido desde la ruta.

Por tanto, la UX objetivo conserva:

```text
site_id de URL
<=
autoridad ya resuelta
```

Nunca:

```text
site_id de URL
=
autoridad territorial
```

La corrección material pertenece a la frontera definida por `PULSO-AUTH-011` y sus unidades físicas propietarias.

---

#### 48. Brecha AS-IS de mutaciones directas

El cliente actual ejecuta operaciones directas sobre `pos_table_service_calls` para:

- crear un llamado manual;
- reconocer un llamado;
- resolver un llamado.

La UX objetivo no acepta una mutación porque el botón sea visible o porque RLS permita técnicamente escribir.

Cada transición deberá converger en una acción nombrada y autorizada en servidor con permiso exacto, recurso, estado y actor efectivo.

---

#### 49. Brecha AS-IS de atribución

Al crear un llamado manual, la UI actual no envía explícitamente `created_by`.

Al ejecutar “Tomar”, actualiza estado y `acknowledged_at`, pero no persiste `assigned_to` desde esa acción.

Por tanto:

```text
CREADOR
!=
ASIGNADO
!=
ACTOR QUE RECONOCE
!=
ACTOR QUE RESUELVE
```

La atribución completa debe consumir la frontera aprobada en `PULSO-AUTH-013`.

---

#### 50. Brecha AS-IS de sesión de mesa

El runtime observado lee sesiones abiertas, pero no materializa en esa superficie el lifecycle completo de apertura y cierre de `VPROC-0038`.

La ausencia de controles AS-IS no autoriza a inferir que la sesión se abre o cierra automáticamente mediante llamados.

El diseño conserva esas transiciones como capacidades separadas.

---

#### 51. Brecha AS-IS de Realtime

Las suscripciones observadas escuchan cambios de las tablas de llamados y sesiones y luego vuelven a cargar un snapshot filtrado por sede.

La suscripción misma no declara un filtro `site_id` en el canal observado.

La materialización debe demostrar aislamiento territorial de Realtime conforme al contrato de autorización, aunque el refetch posterior ya reduzca la proyección.

---

#### 52. Brecha de permisos atómicos para servicio_salon

El dataset canónico vigente de concesiones operativas asigna once grants a `servicio_salon`, pero solo uno pertenece a PULSO:

```text
pulso.access
```

No existe en esa matriz vigente una concesión atómica PULSO para leer o mutar mesa, sesión o llamado.

Esta tarea no corrige la matriz desde UX.

**Propietario canónico:** `AUTH-RBAC-011` para la matriz del rol, junto con la frontera PULSO-AUTH aplicable a la acción concreta.

**Condición de salida:** antes de materializar una acción interna del home de salón, debe existir PermissionKey canónica exacta, decisión explícita para `servicio_salon`, scope/prerrequisito definidos y enforcement server-side sin broad fallback.

---

#### 53. Matriz de disponibilidad objetivo

| Intención de trabajo | Superficie | Estado contractual para `servicio_salon` | Regla |
| --- | --- | --- | --- |
| entrar a PULSO | `VSCREEN-0080` | AUTORIZABLE HOY por `pulso.access` | solo entrada/contexto |
| ver mapa/mesas | `VSCREEN-0082` | BLOQUEADO PARA MATERIALIZACIÓN ATÓMICA | requiere permiso exacto de lectura |
| abrir servicio de mesa | `VSCREEN-0082` | BLOQUEADO | requiere permiso exacto de sesión/apertura |
| crear llamado manual | `VSCREEN-0082` | BLOQUEADO | requiere permiso exacto y acción server-side |
| tomar/asignar llamado | `VSCREEN-0082` | BLOQUEADO | reconocer y asignar son efectos explícitos |
| resolver llamado | `VSCREEN-0082` | BLOQUEADO | requiere permiso exacto y estado vigente |
| iniciar pedido | `VSCREEN-0081` | BLOQUEADO PARA ESTE ROL MIENTRAS NO EXISTA GRANT | no heredar permiso de cajero |
| modificar pedido activo | `VSCREEN-0083` | BLOQUEADO PARA ESTE ROL MIENTRAS NO EXISTA GRANT | validar columnas/estado |
| solicitar cobro | handoff | DISPONIBLE COMO INTENCIÓN | no equivale a cobrar |
| cobrar | `VSCREEN-0084` | NO CONCEDIDO AL ROL POR ESTA TAREA | requiere autoridad propia |
| cerrar mesa | `VSCREEN-0082` | BLOQUEADO | requiere permiso exacto y conciliación |
| configurar zonas/mesas | superficie administrativa | FUERA DE ALCANCE | carril administrativo separado |

---

#### 54. Handoff inmediato a PULSO-UX-004

`PULSO-UX-004 — Diseñar inicio para mostrador` recibe:

```text
VSCREEN-0080 SIGUE SIENDO IDENTIDAD COMPARTIDA DE INICIO POS
SERVICIO_SALON PRIORIZA VPROC-0038 / MESAS / LLAMADOS
VSCREEN-0082 ES WORKSPACE PRINCIPAL DE SALÓN
MOSTRADOR NO DEBE HEREDAR MAPA DE MESAS COMO HOME
CAJA / MOSTRADOR PUEDEN COMPARTIR PUNTO FÍSICO SIN COMPARTIR AUTOMÁTICAMENTE PERMISOS
ZONA / PUNTO / ESTACIÓN != AUTORIDAD
HANDOFF DE CUENTA != AUTORIDAD DE COBRO
PERMISOS INTERNOS FALTANTES DEBEN FALLAR CERRADOS
```

La 004 deberá especializar el punto de mostrador sin duplicar salón ni caja.

---

#### 55. Handoff al resto de PULSO-UX

| Tarea | Entrada exacta proveniente de PULSO-UX-003 |
| --- | --- |
| `PULSO-UX-004` | mostrador se separa de mesa/sesión y consume solo handoffs necesarios |
| `PULSO-UX-005` | actor integral compone capacidades sin wildcard operativo |
| `PULSO-UX-006` | supervisor recibe carga y excepciones sin convertirse en ejecutor implícito |
| `PULSO-UX-007` | creación de venta/pedido recibe contexto de mesa cuando corresponda |
| `PULSO-UX-008` | cobro recibe handoff de cuenta sin fusionarse con servicio |
| `PULSO-UX-009` | cancelación/devolución/refund permanecen efectos separados |
| `PULSO-UX-010` | caja conserva lifecycle separado del cierre de mesa |
| `PULSO-UX-013` | acciones sensibles reciben confirmación proporcional al efecto |
| `PULSO-UX-014` | terminal compartida conserva trabajador real en cada transición |
| `PULSO-UX-015` | mapa y cola de llamados se adaptan a interacción táctil |
| `PULSO-UX-020` | prototipo histórico se clasifica sin elevar mutaciones directas a contrato final |
| `PULSO-UX-021` | arquitectura objetivo cierra broad permissions y deuda legacy aplicable |

---

#### 56. Requisitos de prueba derivados

**Resultado:** NO GENERA REQUISITOS DE PRUEBA.

**Requisitos creados:** 0
**Requisitos modificados:** 0
**Requisitos diferidos:** 0
**Requisitos obsoletos:** 0

Justificación: aislamiento territorial del salón, separación de mesa/sesión/pedido/cuenta, autorización de rutas y acciones, actor efectivo, protección contra broad permissions, estados y recuperación ya cuentan con obligaciones verificables vigentes. Esta tarea especializa la composición UX de `servicio_salon` sin introducir una obligación observable nueva en el registro.

---

#### 57. Cobertura de prueba vigente reutilizada

Se reutiliza sin modificación:

- `TREQ-PULSO-005` para separar mesa, sesión, pedido, preparación, cumplimiento, pago y cierre;
- `TREQ-PULSO-014` para exigir acceso protegido y fail-closed en rutas PULSO;
- `TREQ-PULSO-015` para impedir que `site_id` amplíe territorio;
- `TREQ-PULSO-018` para aislar zonas, mesas, sesiones y llamados y separar sus acciones por actor y estado;
- `TREQ-PULSO-026` para impedir atribuir permisos no declarados o elevar `pulso.pos.main` a suficiencia;
- `TREQ-AUTH-001` para resolver autoridad mediante permiso, contexto y alcance canónicos;
- `TREQ-AUTH-011` para separar dispositivo y trabajador humano;
- `TREQ-AUTH-013` para impedir bypass por URL, cliente, API o RPC y revalidar mutaciones;
- `TREQ-AUTH-015` para conservar evidencia correlacionable de actor, contexto, recurso y decisión.

Esta enumeración es trazabilidad reutilizada y no constituye modificación del Registro 04A.

---

#### 58. Evidencia de validación

| Clase | Estado | Evidencia |
| --- | --- | --- |
| BUILD | NOT_EXECUTED | El build documental corresponde al checkout después de incorporar el artefacto; esta tarea no materializa producto. |
| LOCAL | NOT_EXECUTED | Formato, quality, delivery, validadores de dominio y batería global quedan pendientes de la incorporación en el checkout local. |
| REMOTA | PASS | Se verificaron las fuentes canónicas vigentes de continuidad, topología `DEFINE_ONCE`, owner PULSO, `AUTH-RBAC-011`, dataset de once grants de `servicio_salon`, `OPS-POS-001`, `VSCREEN-0080/0082/0083/0084`, estados de `VPROC-0038`, Registro 04A aplicable y runtime vigente de `/salon`, incluidos queries, estados derivados, llamados, mutaciones cliente y Realtime. |
| OPERATIVA | NOT_EXECUTED | No se atendieron mesas, llamados, sesiones, pedidos, cuentas ni cobros reales y no se realizaron pruebas con personal de salón. |
| FÍSICA | NOT_APPLICABLE | `PULSO-UX-003` no crea instancia física propia ni autoriza cambios de producto, datos o infraestructura. |

---

#### 59. Criterios de aceptación

La tarea queda documentalmente completa cuando:

- [ ] `VSCREEN-0080` se conserva como identidad canónica compartida de Inicio POS;
- [ ] no se crea una pantalla paralela de home para salón;
- [ ] `servicio_salon` queda como actor principal;
- [ ] `VPROC-0038` queda como proceso principal;
- [ ] `VSCREEN-0082` queda como workspace principal de salón;
- [ ] se distinguen los nueve estados canónicos de `VPROC-0038`;
- [ ] mesa, sesión, pedido, cuenta y pago permanecen identidades separadas;
- [ ] el home se organiza por trabajo y prioridad, no por rutas técnicas;
- [ ] zona física permanece separada del área de autorización;
- [ ] contexto, actor, turno, sede, área y dispositivo se resuelven antes de acciones;
- [ ] `pulso.access` se limita a entrada/contexto;
- [ ] no se inventan permisos atómicos ausentes para `servicio_salon`;
- [ ] lectura/mutación de mesa, sesión y llamados queda bloqueada para materialización mientras no exista permiso exacto;
- [ ] “Tomar” no confunde reconocimiento, asignación y actor ejecutor;
- [ ] “Resolver” no cierra automáticamente mesa, sesión, pedido o pago;
- [ ] `bill` se trata como solicitud de cuenta y no como autoridad de cobro;
- [ ] pedido nuevo y pedido activo conducen a superficies propietarias;
- [ ] cobro conduce a `VSCREEN-0084` mediante handoff y no desde el home;
- [ ] caja no se hereda por proximidad física;
- [ ] mostrador, operador integral y supervisor conservan homes especializados posteriores;
- [ ] configuración de zonas/mesas permanece administrativa;
- [ ] dispositivo compartido y trabajador real permanecen separados;
- [ ] cambio de trabajador invalida estado actor-bound;
- [ ] Realtime no concede autoridad;
- [ ] conflictos concurrentes obligan a refrescar y no a reintentar ciegamente;
- [ ] vacío, deny, contexto inválido, stale, fallo y conflicto permanecen distintos;
- [ ] la proyección de datos queda minimizada;
- [ ] el AS-IS de `/salon` queda inventariado sin elevarlo a contrato final;
- [ ] `pos.main` legacy queda identificado como broad e insuficiente;
- [ ] `site_id` cliente no se convierte en territorio autoritativo;
- [ ] las mutaciones directas del cliente quedan identificadas como brecha;
- [ ] creador, asignado y actor ejecutor quedan separados;
- [ ] Realtime territorial queda como obligación de materialización;
- [ ] la brecha de permisos atómicos tiene propietario y condición de salida;
- [ ] `PULSO-UX-004` recibe un handoff suficiente para diseñar mostrador sin duplicar salón;
- [ ] no se crean ni modifican requisitos de prueba;
- [ ] no se ejecutan cambios físicos.

---

#### 60. Límites

Esta tarea no:

- implementa `VSCREEN-0080` ni `VSCREEN-0082`;
- modifica `/salon`;
- crea una ruta nueva;
- crea componentes o Server Actions;
- crea permisos o grants;
- modifica `AUTH-RBAC-011`;
- concede acciones internas de salón por `pulso.access`;
- abre o cierra sesiones reales;
- crea, asigna, reconoce, resuelve o cancela llamados reales;
- crea o modifica pedidos reales;
- procesa cobros;
- abre o cierra caja;
- acumula o redime puntos;
- configura zonas, mesas, layout, puntos o estaciones;
- modifica Supabase, RLS, RPC, grants, tablas, datos, Realtime o migraciones;
- modifica packages compartidos;
- retira `pulso.pos.main` del runtime;
- corrige `preferredSiteId` en código;
- corrige mutaciones cliente en código;
- materializa permisos atómicos faltantes;
- diseña en detalle el home de mostrador;
- diseña operador integral o supervisor;
- sustituye `PULSO-UX-004..021`;
- modifica el Registro 04A;
- crea una instancia física propia;
- desarrolla `PULSO-UX-004`.

---

#### 61. Continuidad

**ÚLTIMA TAREA APROBADA**
`PULSO-UX-002 — Diseñar inicio para cajero`

**TAREA ACTUAL APROBADA**
`PULSO-UX-003 — Diseñar inicio para servicio de salón`

**SIGUIENTE TAREA RESERVADA**
`PULSO-UX-004 — Diseñar inicio para mostrador`
### ✅ PULSO-UX-004 — Diseñar inicio para mostrador

**Estado:** APROBADA
**Tarea anterior:** PULSO-UX-003 — Diseñar inicio para servicio de salón
**Tarea siguiente:** PULSO-UX-005 — Diseñar inicio para operador integral
**Tipo de tarea:** diseño documental integral de `VSCREEN-0080 — Inicio POS` para el actor operativo `mostrador_satelite`, especializando la entrada por trabajo de entrega y continuidad de `VPROC-0039`, utilizando `VSCREEN-0088 — Seguimiento de preparación y entrega` como workspace operativo principal y `VSCREEN-0087 — Bandeja de pedidos de canales externos` como superficie secundaria de admisión cuando corresponda, con separación estricta entre preparación, handoff, cobro, despacho, cancelación, salón, caja y configuración, y bloqueo fail-closed de toda acción interna sin PermissionKey atómica y grant explícito; `DEFINE_ONCE` / `NO_PHYSICAL_INSTANCE`
**Bloque:** BLOQUE N — PULSO
**Repositorio propietario:** `vento-group-sas/vento-shell`
**Archivo propietario:** `docs/plan-canonico/modular/bloques/N_PULSO/02_EXPERIENCIA_POS_Y_OPERACION_COMERCIAL.md`
**Estado físico resultante:** `NO_PHYSICAL_INSTANCE`
**Cambios físicos autorizados:** Ninguno durante esta tarea.
**Requisitos de prueba creados o modificados:** 0

---

#### 1. Propósito

Diseñar el contrato de experiencia inicial de PULSO para una persona cuyo rol operativo efectivo sea `mostrador_satelite`, de modo que al entrar identifique primero qué pedido o entrega requiere intervención en su punto de mostrador y pueda continuar únicamente las acciones compatibles con su autoridad efectiva.

La experiencia debe permitir:

- reconocer actor, sede, área de Mostrador, punto o estación y dispositivo vigentes;
- distinguir trabajo de mostrador frente a caja, salón, barra, cocina y logística;
- priorizar pedidos listos o próximos a handoff sobre navegación genérica;
- separar preparación, disponibilidad, pago, handoff, despacho y cierre;
- distinguir `pickup`, `on_premise` y `delivery` sin convertirlos en permisos;
- conducir pedidos externos a su superficie propietaria sin apropiarse de la integración;
- mostrar estados de pago sin convertirlos en permiso de cobro;
- impedir que una terminal física integrada Caja / Mostrador fusione roles o permisos;
- conservar al trabajador real como actor de cada transición;
- tratar Realtime y optimismo de UI como aceleradores, nunca como autoridad;
- fallar cerrado cuando no exista PermissionKey atómica materializada para una acción de mostrador.

La tarea especializa la pantalla canónica existente:

```text
VSCREEN-0080 — Inicio POS
```

sin crear una identidad de pantalla paralela.

---

#### 2. Entrada recibida de PULSO-UX-003

`PULSO-UX-003` entrega la siguiente frontera:

```text
VSCREEN-0080 SIGUE SIENDO IDENTIDAD COMPARTIDA DE INICIO POS
SERVICIO_SALON PRIORIZA VPROC-0038 / MESAS / LLAMADOS
VSCREEN-0082 ES WORKSPACE PRINCIPAL DE SALÓN
MOSTRADOR NO HEREDA MAPA DE MESAS COMO HOME
CAJA / MOSTRADOR PUEDEN COMPARTIR PUNTO FÍSICO SIN COMPARTIR PERMISOS
ZONA / PUNTO / ESTACIÓN != AUTORIDAD
HANDOFF DE CUENTA != AUTORIDAD DE COBRO
PERMISOS INTERNOS FALTANTES DEBEN FALLAR CERRADOS
```

Por tanto, `PULSO-UX-004` no replica el inicio del cajero ni el mapa de salón.

---

#### 3. Naturaleza y topología

La topología vigente de `PULSO-UX-001..021` establece:

```text
mode = DEFINE_ONCE
execution_gate = NO_PHYSICAL_INSTANCE
```

Consecuencias:

1. `PULSO-UX-004` se define una sola vez;
2. no existe una instancia física propia;
3. no se modifica `vento-pulso`;
4. no se crean rutas, componentes, Server Actions, RPC, tablas o migraciones;
5. no se materializan permisos nuevos;
6. no se cambian pedidos ni estados reales;
7. las brechas AS-IS se asignan a owners existentes;
8. la implementación futura deberá consumir este contrato sin ampliar autoridad.

---

#### 4. Fuentes y contratos consumidos

El diseño conserva como entradas:

- `PULSO-UX-001 — Inventariar procesos de venta, caja y salón`;
- `PULSO-UX-002 — Diseñar inicio para cajero`;
- `PULSO-UX-003 — Diseñar inicio para servicio de salón`;
- `OPS-POS-001 — Definir zonas físicas, mesas y puntos de servicio del POS por sede`;
- `AUTH-RBAC-012 — Crear matriz de mostrador_satelite`;
- `PULSO-AUTH-011 — Limitar operación a sede del turno`;
- `PULSO-AUTH-012 — Integrar dispositivos POS compartidos`;
- `PULSO-AUTH-013 — Registrar trabajador que ejecuta la operación`;
- `PULSO-AUTH-014 — Mantener configuración administrativa separada`;
- `PULSO-AUTH-015 — Migrar a paquetes de vento-shell`;
- `PULSO-AUTH-016 — Ejecutar pruebas integrales`;
- `VSCREEN-0080` como identidad canónica de Inicio POS;
- `VSCREEN-0081` como creación de venta o pedido;
- `VSCREEN-0083` como detalle y modificación de pedido;
- `VSCREEN-0084` como cobro y medios de pago;
- `VSCREEN-0087` como bandeja de pedidos de canales externos;
- `VSCREEN-0088` como seguimiento de preparación y entrega;
- `VPROC-0039` como proceso principal de venta de mostrador o para llevar;
- `VPROC-0040` como proceso secundario de normalización de pedidos externos;
- el runtime vigente de `/orders` como evidencia AS-IS y no como autoridad de diseño.

---

#### 5. Actor contractual

El actor principal es:

```text
operational_role = mostrador_satelite
```

Su autoridad operativa requiere, según la acción:

```text
ACTOR HUMANO IDENTIFICADO
+ EMPLEADO ACTIVO
+ TURNO PUBLICADO Y VIGENTE
+ ROL OPERATIVO EFECTIVO mostrador_satelite
+ SEDE AUTORIZADA
+ ÁREA ACTIVA DE MOSTRADOR
+ TIPO DE ÁREA CANÓNICO RESUELTO
+ CHECK-IN CUANDO CORRESPONDE
+ DISPOSITIVO COMPATIBLE CUANDO APLICA
+ PERMISO OPERATIVO EXPLÍCITO
+ RECURSO / CANAL / ESTADO COMPATIBLES
= ACCIÓN AUTORIZABLE
```

El nombre visible del área o del punto físico no concede autoridad.

---

#### 6. Frontera de autorización vigente

La matriz vigente de `mostrador_satelite` contiene once concesiones operativas totales.

Dentro de PULSO existe actualmente una sola concesión:

```text
pulso.access
```

con alcance `CTX-COUNTER-PULSO`.

Ese permiso permite exclusivamente:

```text
ENTRAR A PULSO
+ MOSTRAR CONTEXTO DE MOSTRADOR
```

No autoriza por sí solo:

- consultar colas de entrega;
- reclamar pedidos;
- alistar o empacar;
- cambiar estados;
- confirmar entrega;
- asignar despacho;
- enviar mensajes al cliente;
- cobrar;
- operar caja;
- cancelar;
- devolver o reembolsar;
- acumular o redimir puntos;
- cerrar servicios.

---

#### 7. Regla fail-closed

La tarea define el trabajo objetivo, pero no fabrica permisos.

```text
INTENCIÓN UX DEFINIDA
+ PERMISSIONKEY ATÓMICA AUSENTE
=
ACCIÓN NO MATERIALIZABLE TODAVÍA
```

Nunca:

```text
pulso.access
→ cola / alistamiento / entrega / despacho / cobro / cancelación
```

Tampoco:

```text
pulso.pos.main AS-IS
→ permiso canónico suficiente
```

---

#### 8. Identidad del inicio

El inicio continúa siendo:

```text
VSCREEN-0080 — Inicio POS
```

No se crea una pantalla canónica nueva denominada “Inicio de mostrador”.

La misma identidad se especializa por:

- actor;
- punto o estación;
- contexto efectivo;
- trabajo pendiente;
- permisos exactos;
- estado del recurso.

---

#### 9. Proceso principal y proceso secundario

El proceso principal es:

```text
VPROC-0039 — Gestionar venta de mostrador o para llevar con entrega y cobro correlacionados
```

El proceso secundario relacionado es:

```text
VPROC-0040 — Normalizar pedidos de canales externos y transferirlos al proceso interno con reconciliación
```

La relación es:

```text
MOSTRADOR
→ PRIORIZA VPROC-0039
→ CONSUME VPROC-0040 CUANDO EL PEDIDO EXTERNO YA REQUIERE ACCIÓN DE SU PUNTO
```

No convierte al mostrador en owner de toda integración externa.

---

#### 10. Workspace principal

La superficie principal de continuidad de mostrador es:

```text
VSCREEN-0088 — Seguimiento de preparación y entrega
```

Su función para esta experiencia es proyectar el compromiso comercial desde preparación hasta handoff sin apropiarse de producción, pago o logística.

Regla:

```text
SEGUIMIENTO / HANDOFF
!=
PRODUCCIÓN
!=
COBRO
!=
DESPACHO LOGÍSTICO
```

---

#### 11. Superficie secundaria de pedidos externos

La superficie secundaria es:

```text
VSCREEN-0087 — Bandeja de pedidos de canales externos
```

Su proceso propietario es `VPROC-0040`.

Solo aparece como trabajo accionable para mostrador cuando exista:

- recurso dentro de la sede efectiva;
- etapa compatible;
- permiso exacto;
- responsabilidad real del punto de mostrador.

La simple llegada de un pedido externo no concede autoridad para aceptarlo, cancelarlo, reasignarlo o conciliarlo.

---

#### 12. Estados canónicos de VPROC-0039

La experiencia reconoce exactamente:

1. `COUNTER_SALE_OPENED` — venta de mostrador abierta;
2. `ITEMS_SELECTED` — artículos seleccionados;
3. `PREPARATION_IN_PROGRESS` — preparación en curso;
4. `READY_FOR_HANDOFF` — listo para entrega;
5. `PAYMENT_PENDING` — pago pendiente;
6. `PAYMENT_CONFIRMED` — pago confirmado;
7. `HANDOFF_PENDING` — entrega pendiente;
8. `SALE_RECONCILIATION_PENDING` — conciliación de venta pendiente;
9. `COUNTER_SALE_CLOSED` — venta de mostrador cerrada.

La UI no colapsa esos estados en un único “pedido activo”.

---

#### 13. Estados canónicos de VPROC-0040

La experiencia reconoce exactamente:

1. `EXTERNAL_ORDER_RECEIVED`;
2. `VALIDATION_IN_PROGRESS`;
3. `MAPPED_TO_INTERNAL_ORDER`;
4. `ACCEPTANCE_PENDING`;
5. `ACCEPTED`;
6. `IN_FULFILLMENT`;
7. `CHANNEL_RECONCILIATION_PENDING`;
8. `EXTERNAL_ORDER_RECONCILED`.

El home de mostrador no confunde “recibido por canal” con “aceptado internamente”.

---

#### 14. Pregunta operativa del inicio

La experiencia se organiza alrededor de:

```text
¿QUÉ PEDIDO DEBO ATENDER O ENTREGAR AHORA EN ESTE MOSTRADOR?
```

No alrededor de:

```text
¿QUÉ RUTA QUIERO ABRIR?
```

ni de:

```text
¿QUÉ ESTADO PUEDO FORZAR?
```

---

#### 15. Composición lógica del inicio

La composición mínima es:

| Zona | Contenido | Resultado esperado | Límite |
| --- | --- | --- | --- |
| contexto | actor, sede, área, punto, turno y dispositivo | saber dónde y como se opera | no concede permiso |
| acción prioritaria | siguiente entrega/handoff autorizado | llevar al recurso exacto | no muta desde el resumen |
| cola de trabajo | pedidos accionables por prioridad | ordenar atención | no muestra universo global |
| canales | pickup, en sitio, domicilio o externo cuando aplique | entender modalidad | canal no concede autoridad |
| avisos | pago pendiente, stale, conflicto, deny, offline | bloquear o recuperar | no degradar error a vacío |
| accesos secundarios | nueva venta, pedido externo, cobro o detalle | handoff a owner | solo con permiso exacto |

---

#### 16. Contexto visible mínimo

El home debe poder representar de forma compacta:

- trabajador efectivo;
- sede efectiva;
- área de Mostrador;
- punto físico integrado cuando exista;
- dispositivo compartido cuando corresponda;
- turno vigente;
- check-in cuando la acción lo exija;
- estado de conectividad/frescura cuando afecte el trabajo;
- volumen de trabajo accionable, no volumen total de la empresa.

---

#### 17. Punto físico integrado no equivale a rol integrado

`OPS-POS-001` conserva puntos físicos integrados en sedes donde Caja / Mostrador, y en algunos casos Barra, comparten ubicación.

La regla es:

```text
PUNTO FÍSICO INTEGRADO
!=
ROL OPERATIVO INTEGRADO
```

```text
MISMO DISPOSITIVO O MUEBLE
!=
MISMOS PERMISOS
```

Por tanto, `mostrador_satelite` no hereda permisos de `cajero_satelite`, `barista_satelite` ni `operador_integral_satelite`.

---

#### 18. Prioridad de trabajo

Cuando existan permisos atómicos materializados, el home debe resolver la acción dominante por prioridad operacional:

```text
1. CONTEXTO BLOQUEANTE
2. HANDOFF LISTO Y ESPERANDO RECEPTOR
3. PEDIDO CON INCIDENCIA QUE BLOQUEA ENTREGA
4. PEDIDO EN PREPARACIÓN QUE REQUIERE INTERVENCIÓN DE MOSTRADOR
5. PEDIDO EXTERNO EN ETAPA ACCIONABLE PARA EL PUNTO
6. NUEVA VENTA / PEDIDO SI EL ROL RECIBE AUTORIDAD PARA CREAR
7. SIN TRABAJO ACCIONABLE
```

La prioridad no concede permisos; solo ordena trabajo que ya es autorizable.

---

#### 19. Contexto laboral inválido

Sin turno o contexto válido:

- no se habilitan acciones internas;
- no se interpreta la cola vacía como ausencia de pedidos;
- no se usa la última sede conocida como autoridad;
- se explica el bloqueo y el owner de recuperación.

Nunca:

```text
SIN CONTEXTO
→ CONSERVAR ÚLTIMO MOSTRADOR
→ OPERAR
```

---

#### 20. Check-in

`pulso.access` puede permitir mostrar entrada y bloqueo con turno válido.

Las acciones internas que el contrato futuro clasifique como `T+C` deberán exigir check-in activo.

Por tanto:

```text
HOME VISIBLE
!=
MUTACIÓN HABILITADA
```

---

#### 21. Cola de trabajo

La cola del home no es un listado administrativo de todas las ventas.

Cada recurso visible debe estar justificado por:

- sede efectiva;
- relación con el punto de mostrador;
- canal/modalidad;
- etapa compatible;
- autoridad de lectura aplicable;
- necesidad operacional real.

La lista prioriza acción y aging, no solo orden cronológico de creación.

---

#### 22. Pedido listo para handoff

`READY_FOR_HANDOFF` significa que el pedido está completo y espera entrega al cliente o transportador.

No significa:

```text
LISTO
=
ENTREGADO
```

La experiencia debe exigir una transición explícita y evidencia suficiente antes de presentar la entrega como completada.

---

#### 23. Entrega pendiente

`HANDOFF_PENDING` representa un pedido pagado o autorizado que espera aceptación del receptor.

El home puede priorizarlo, pero la transición posterior debe conservar:

- pedido exacto;
- actor ejecutor;
- receptor o clase de receptor cuando corresponda;
- timestamp;
- sede/punto;
- estado previo;
- resultado;
- evidencia requerida por el flujo propietario.

---

#### 24. Modalidad pickup

Para `pickup` se conserva:

```text
LISTO PARA RECOGER
!=
ENTREGADO
```

El mostrador puede priorizar la entrega física únicamente si existe permiso exacto para la transición.

Si el pedido tiene pago pendiente al recoger:

```text
PAGO AL RECOGER
→ HANDOFF A COBRO
```

No:

```text
PAGO AL RECOGER
→ MOSTRADOR COBRA POR INFERENCIA
```

---

#### 25. Modalidad on_premise

`on_premise` describe modalidad comercial, no rol.

Puede representar consumo en sede sin implicar automáticamente servicio de mesa.

Si el recurso pertenece a una mesa/sesión de salón, el home debe conducir al owner correspondiente y no duplicar `VSCREEN-0082`.

---

#### 26. Modalidad delivery

Para `delivery` el mostrador puede participar en el handoff hacia despacho, pero no hereda autoridad logística.

Se conserva:

```text
PEDIDO LISTO PARA DESPACHO
!=
DOMICILIARIO ASIGNADO
!=
EN TRÁNSITO
!=
ENTREGADO
```

Cada transición requiere owner, permiso, actor y evidencia propios.

---

#### 27. Pago pendiente

El home puede mostrar un bloqueo de pago cuando ese hecho sea necesario para decidir la entrega.

No puede transformar la lectura de `payment_status` en autoridad de cobro.

```text
PAYMENT_PENDING
→ MOSTRAR BLOQUEO / DERIVAR A VSCREEN-0084 SI ESTÁ AUTORIZADO
```

No:

```text
PAYMENT_PENDING
→ COBRAR DESDE TARJETA DE MOSTRADOR
```

---

#### 28. Pago confirmado

`PAYMENT_CONFIRMED` habilita continuar el proceso únicamente cuando también se cumplan entrega, recurso y autoridad.

No significa que la venta esté cerrada ni conciliada.

---

#### 29. Nueva venta o pedido

`VSCREEN-0081 — Creación de venta o pedido` puede aparecer como acceso secundario si una matriz futura concede a `mostrador_satelite` el permiso exacto de creación.

Mientras ese grant no exista:

```text
NUEVA VENTA PARA MOSTRADOR
=
NO MATERIALIZABLE
```

La cercanía física a caja no altera esta regla.

---

#### 30. Detalle y modificación de pedido

`VSCREEN-0083` puede recibir un pedido concreto cuando el actor necesite consultar o modificar campos autorizados.

La navegación no fabrica `orders.update` ni otro permiso equivalente.

La modificación debe respetar:

- estado actual;
- columnas permitidas;
- versión/concurrencia;
- actor;
- sede;
- canal;
- efectos ya emitidos.

---

#### 31. Seguimiento de preparación

El mostrador necesita saber si un pedido está:

- confirmado;
- en preparación;
- listo;
- bloqueado;
- pendiente de pago;
- pendiente de handoff.

Eso no lo convierte en owner de la preparación productiva.

```text
VER PREPARACIÓN
!=
PRODUCIR
```

---

#### 32. Bandeja de pedidos externos

`VSCREEN-0087` puede aportar recursos de `VPROC-0040` cuando el canal externo ya tenga una etapa relevante para mostrador.

No se admite:

```text
PEDIDO EXTERNO RECIBIDO
→ MOSTRADOR LO ACEPTA AUTOMÁTICAMENTE
```

ni:

```text
PEDIDO EXTERNO
→ IGNORAR VALIDACIÓN / DUPLICIDAD / PRECIO / PAGO
```

---

#### 33. Canales no son zonas

Se conserva la decisión de `OPS-POS-001`:

```text
RAPPI
MANYCHAT
DOMICILIO
WEB
OTRO CANAL
!=
ZONA FÍSICA
```

El home puede agrupar trabajo por canal o modalidad sin crear zonas de mostrador ficticias.

---

#### 34. Cobro

El cobro pertenece a:

```text
VSCREEN-0084 — Cobro y medios de pago
```

`mostrador_satelite` no recibe autoridad de cobro por esta tarea.

Cuando un pedido requiere pago:

- se muestra el estado mínimo necesario;
- se deriva al actor/superficie autorizados;
- se conserva el pedido exacto;
- se retorna al flujo de entrega tras confirmación válida.

---

#### 35. Cancelación

Cancelar un pedido no es una acción ordinaria del home de mostrador.

El runtime AS-IS ofrece `mark_cancelled` dentro del tablero `/orders`, pero esa existencia técnica no constituye grant para `mostrador_satelite`.

La cancelación debe consumir permiso y flujo sensibles propios.

---

#### 36. Asignación de despacho

Asignar aliado o referencia de domicilio es una decisión separada del handoff físico de mostrador.

La existencia AS-IS de `assignDispatchOrderAction` no concede capacidad al rol.

Regla:

```text
PREPARAR / ENTREGAR A TRANSPORTADOR
!=
ASIGNAR DESPACHO
```

---

#### 37. Cambio a “En camino”

El runtime AS-IS permite `mark_in_transit` para `delivery` mediante el permiso broad `pos.main`.

El contrato objetivo exige permiso atómico y actor apropiado.

Mostrador no debe marcar “En camino” por inferencia desde que el pedido salió de su vista.

---

#### 38. Confirmación “Entregado”

`mark_delivered` representa un efecto material.

La futura UX debe distinguir al menos:

- entrega a cliente en mostrador;
- handoff a transportador;
- entrega final de domicilio;
- entrega de servicio en sitio.

No deben colapsarse en un mismo botón si los hechos y responsables son distintos.

---

#### 39. Delivery override

`pulso.delivery.deliveries.override` no está concedido a `mostrador_satelite`.

El home ordinario no lo presenta como acción habilitada.

Cualquier excepción debe conservar autoridad base explícita, contexto, reautenticación, motivo y auditoría reforzada.

---

#### 40. Chat con cliente

El runtime `/orders` puede mostrar conversación y enviar mensajes mediante `sendOrderMessageLiveAction`.

El contrato objetivo exige tratar mensajería como capacidad propia.

```text
VER PEDIDO
!=
PODER CONTACTAR AL CLIENTE
```

La tarea no inventa un PermissionKey ni grant para chat.

---

#### 41. Datos de cliente

La tarjeta de mostrador solo debe proyectar datos personales necesarios para el handoff o la coordinación autorizada.

No carga por defecto:

- perfil completo;
- historial general;
- ledger PASS;
- documentos;
- direcciones ajenas al pedido;
- conversaciones no relacionadas;
- datos de otra sede.

---

#### 42. Realtime

Realtime puede acelerar la aparición de pedidos o cambios de estado.

No concede autoridad y no sustituye una revalidación server-side.

```text
EVENTO REALTIME
!=
AUTORIZACIÓN
```

Las subscripciones deben permanecer acotadas por territorio y recurso cuando el contrato técnico lo permita.

---

#### 43. Optimismo de UI

El runtime AS-IS de `/orders` aplica cambios optimistas antes de confirmar RPC en algunas operaciones.

El contrato objetivo exige:

- identificar estado provisional;
- revertir ante fallo;
- no mostrar éxito definitivo antes de confirmación;
- no permitir doble efecto concurrente;
- revalidar estado actual del recurso.

Un parche optimista nunca se vuelve evidencia de autorización.

---

#### 44. Concurrencia

Si otro actor cambia el pedido mientras el mostrador lo observa:

- se detecta drift de estado;
- se actualiza el recurso;
- se bloquea una transición incompatible;
- se informa el nuevo estado;
- no se reintenta a ciegas.

La autoridad y la validez se evalúan contra el estado vigente, no contra la tarjeta obsoleta.

---

#### 45. Parámetros de ruta

El runtime `/orders` consume:

- `site_id`;
- `view`;
- `fulfillment`;
- `message`;
- `error`.

Se conserva:

```text
QUERY PARAMETER
!=
PERMISO
!=
ESTADO DE NEGOCIO AUTORITATIVO
```

`site_id` no amplía territorio y los filtros no crean pantallas nuevas.

---

#### 46. Acceso directo por URL

Abrir `/orders` no concede autoridad para las acciones internas.

`TREQ-PULSO-016` exige separar visibilidad de ruta de cada mutación.

Por tanto, toda acción posterior debe revalidar:

- actor;
- permiso exacto;
- sede;
- recurso;
- estado;
- columnas/efecto permitido;
- dispositivo cuando aplique.

---

#### 47. Dispositivo compartido

En un dispositivo compartido:

```text
TECHNICAL PRINCIPAL
!=
DEVICE
!=
HUMAN ACTOR
```

El home puede conservar contexto físico del mostrador, pero debe identificar al trabajador real antes de una acción actor-bound.

---

#### 48. Cambio de trabajador

Un cambio de actor A → B obliga a recalcular:

- permisos;
- trabajo visible si depende del actor;
- confirmaciones;
- firmas;
- responsabilidades;
- contexto laboral.

No se hereda el estado actor-bound del usuario anterior.

---

#### 49. Vacío, deny, stale y fallo

La experiencia distingue:

```text
SIN PEDIDOS ACCIONABLES
!=
SIN PERMISO
!=
SIN CONTEXTO
!=
DATOS DESACTUALIZADOS
!=
CONFLICTO
!=
FALLO TÉCNICO
!=
RESULTADO DESCONOCIDO
```

Un fallo de consulta no puede mostrarse como “Sin pedidos”.

---

#### 50. Recuperación segura

Ante pérdida de red, sesión, actor o dependencia:

- conservar referencia del pedido cuando sea seguro;
- no duplicar transición;
- revalidar al reconectar;
- distinguir solicitud no enviada, enviada y resultado desconocido;
- refrescar antes de reintentar una acción que pudo tener efecto.

---

#### 51. Estado AS-IS de `/orders`

El runtime vigente observado incluye:

- guard `requireAppAccess` con `permissionCode: ["pos.main"]`;
- consulta de `orders` filtrada por `site_id` resuelto;
- filtros `active`, `delivered`, `cancelled`, `all`;
- filtros `delivery`, `pickup`, `on_premise`;
- estados `pending`, `confirmed`, `preparing`, `ready_for_dispatch`, `in_transit`, `on_the_way`, `delivered`, `cancelled`;
- lectura de items, opciones, eventos de estado, facturación y conversaciones;
- acciones `mark_preparing`, `mark_ready`, `mark_in_transit`, `mark_delivered`, `mark_cancelled`;
- asignación de despacho;
- mensajería de staff;
- Realtime por pedidos;
- actualizaciones optimistas en el board live;
- bridge de WhatsApp para domicilio;
- RPC `update_order_operational_state`.

Este inventario describe el AS-IS y no convierte sus capacidades en permisos del rol.

---

#### 52. Brechas AS-IS y propietarios

| Brecha observada | Riesgo | Propietario canónico | Condición de salida |
| --- | --- | --- | --- |
| `/orders` usa `pulso.pos.main` para lectura y acciones diversas | autoridad broad sobre intenciones distintas | materialización de `PULSO-AUTH-015` + owners de autorización | PermissionKeys atómicas consumidas por lectura y por cada acción |
| matriz de `mostrador_satelite` solo concede `pulso.access` dentro de PULSO | home objetivo no puede materializar acciones internas todavía | roadmap funcional PULSO + matriz/versionado de autorización | permisos atómicos creados, clasificados, asignados y probados |
| `mark_preparing`, `mark_ready`, `mark_in_transit`, `mark_delivered`, `mark_cancelled` comparten guard broad | transiciones con efectos diferentes pueden compartir autoridad | owners de autorización y `PULSO-UX-021` | cada transición usa permiso exacto y estado compatible |
| board live llama RPC desde cliente para operaciones optimistas | UI puede aparentar éxito antes de confirmación y depender de permiso broad | paquete propietario PULSO / `PULSO-UX-021` | acción gobernada, rollback visual y autorización demostrada |
| asignación de despacho usa misma entrada broad | mostrador puede asumir autoridad logística | owners de delivery/authorization | permiso y rol apropiados separados de handoff |
| chat de staff se habilita desde `/orders` con `pos.main` | visibilidad de pedido puede implicar comunicación | owner de mensajería + autorización | permiso de mensajería y alcance de conversación materializados |
| `site_id` participa en navegación y acciones | parámetro puede confundirse con territorio | `PULSO-AUTH-011` | sede efectiva canónica y parámetro solo reductivo |
| Realtime de eventos de estado no filtra explícitamente `order_status_events` por sede en el bridge local | señal de otro recurso podría alcanzar el cliente si RLS/shape no lo limita | paquete PULSO + políticas de datos | subscripción y RLS demuestran aislamiento territorial |
| bridge de WhatsApp expone coordinación de domicilio | salida externa puede mezclar mostrador y despacho | owner de delivery/comunicación | política, permiso y evidencia explícitos |
| estados AS-IS no son una copia exacta de los estados canónicos `VPROC-*` | UI puede usar nombres técnicos como contrato de negocio | `PULSO-UX-020` / `PULSO-UX-021` | mapeo explícito, versionado y sin pérdida semántica |

No queda una brecha detectada de esta tarea sin owner y condición de salida.

---

#### 53. Matriz de disponibilidad objetivo

| Intención de trabajo | Superficie | Estado contractual para `mostrador_satelite` | Regla |
| --- | --- | --- | --- |
| entrar a PULSO | `VSCREEN-0080` | AUTORIZABLE HOY por `pulso.access` | solo entrada/contexto |
| ver cola de pedidos de mostrador | `VSCREEN-0088` | BLOQUEADO PARA MATERIALIZACIÓN ATÓMICA | requiere permiso exacto de lectura |
| ver pedido listo para entrega | `VSCREEN-0088` | BLOQUEADO PARA MATERIALIZACIÓN ATÓMICA | lectura no se deduce de access |
| marcar preparando | `VSCREEN-0088` | BLOQUEADO | requiere permiso exacto y owner compatible |
| marcar listo | `VSCREEN-0088` | BLOQUEADO | requiere transición atómica |
| confirmar handoff a cliente | `VSCREEN-0088` | BLOQUEADO | requiere permiso y evidencia |
| asignar despacho | flujo delivery | BLOQUEADO | no inferir desde mostrador |
| marcar en tránsito | flujo delivery | BLOQUEADO | corresponde a autoridad propia |
| confirmar entrega final de domicilio | flujo delivery | BLOQUEADO | no confundir con handoff del punto |
| consultar pedidos externos | `VSCREEN-0087` | BLOQUEADO PARA MATERIALIZACIÓN ATÓMICA | requiere permiso exacto |
| aceptar pedido externo | `VSCREEN-0087` | BLOQUEADO | requiere permiso y validación VPROC-0040 |
| iniciar nueva venta | `VSCREEN-0081` | BLOQUEADO PARA ESTE ROL MIENTRAS NO EXISTA GRANT | no heredar permiso de cajero |
| modificar pedido | `VSCREEN-0083` | BLOQUEADO PARA ESTE ROL MIENTRAS NO EXISTA GRANT | validar estado/columnas |
| solicitar cobro | handoff | DISPONIBLE COMO INTENCIÓN | no equivale a cobrar |
| cobrar | `VSCREEN-0084` | NO CONCEDIDO AL ROL POR ESTA TAREA | requiere autoridad propia |
| cancelar pedido | `VSCREEN-0091` o flujo propietario | NO CONCEDIDO | acción sensible separada |
| administrar configuración | superficie administrativa | FUERA DE ALCANCE | carril separado |

---

#### 54. Handoff inmediato a PULSO-UX-005

`PULSO-UX-005 — Diseñar inicio para operador integral` recibe:

```text
VSCREEN-0080 SIGUE SIENDO IDENTIDAD COMPARTIDA DE INICIO POS
CAJERO, SALÓN Y MOSTRADOR TIENEN PRIORIZACIONES DISTINTAS
PUNTO FÍSICO INTEGRADO != WILDCARD OPERATIVO
MOSTRADOR PRIORIZA VPROC-0039 / HANDOFF / ENTREGA
VSCREEN-0088 ES WORKSPACE PRINCIPAL DE MOSTRADOR
VSCREEN-0087 ES SECUNDARIO PARA PEDIDOS EXTERNOS CUANDO APLIQUE
MODALIDAD / CANAL / ESTACIÓN != AUTORIDAD
PAGO PENDIENTE != AUTORIDAD DE COBRO
DELIVERY HANDOFF != AUTORIDAD LOGÍSTICA
PERMISOS FALTANTES DEBEN FALLAR CERRADOS
```

La 005 deberá componer capacidades múltiples sin sumar automáticamente todos los permisos de caja, salón, mostrador, barra o cocina.

---

#### 55. Handoff al resto de PULSO-UX

| Tarea | Entrada exacta proveniente de PULSO-UX-004 |
| --- | --- |
| `PULSO-UX-005` | operador integral compone capacidades sin wildcard ni unión automática de roles |
| `PULSO-UX-006` | supervisor observa carga y excepciones sin apropiarse de ejecución ordinaria |
| `PULSO-UX-007` | nueva venta recibe canal/modalidad y contexto sin inventar permiso de creación |
| `PULSO-UX-008` | pago al recoger o en sede conduce a cobro como handoff separado |
| `PULSO-UX-009` | cancelación/devolución/refund no se tratan como cambio ordinario de estado |
| `PULSO-UX-010` | caja permanece independiente de entrega de mostrador |
| `PULSO-UX-013` | handoffs y efectos sensibles reciben confirmación proporcional |
| `PULSO-UX-014` | terminal integrada conserva trabajador real por acción |
| `PULSO-UX-015` | cola y handoff se adaptan a interacción táctil por estación |
| `PULSO-UX-020` | estados/rutas legacy se clasifican sin elevarlos a canon por existencia |
| `PULSO-UX-021` | arquitectura objetivo separa permisos broad, server actions, Realtime y deuda legacy |

---

#### 56. Requisitos de prueba derivados

**Resultado:** NO GENERA REQUISITOS DE PRUEBA.

**Requisitos creados:** 0
**Requisitos modificados:** 0
**Requisitos diferidos:** 0
**Requisitos obsoletos:** 0

Justificación: separación de pedido, pago, handoff y entrega, seguridad de `/orders`, territorio, permisos atómicos, actor efectivo, concurrencia, Realtime, rutas y recuperación ya cuentan con obligaciones verificables vigentes. Esta tarea especializa la composición UX de `mostrador_satelite` sin introducir una obligación observable nueva en el registro.

---

#### 57. Cobertura de prueba vigente reutilizada

Se reutiliza sin modificación:

- `TREQ-PULSO-005` para separar pedido, preparación, cumplimiento, pago y entrega;
- `TREQ-PULSO-006` para acciones comerciales nombradas, autorizadas y auditables;
- `TREQ-PULSO-014` para exigir sesión, acceso y contexto territorial en rutas PULSO;
- `TREQ-PULSO-015` para impedir que `site_id` amplíe territorio;
- `TREQ-PULSO-016` para separar apertura de `/orders` de transiciones, cancelación, despacho, chat, facturación y mutaciones;
- `TREQ-PULSO-019` para mantener query parameters dentro del contrato de la ruta y fuera de la autoridad;
- `TREQ-PULSO-020` para no contar componentes, bridges o Server Actions como rutas;
- `TREQ-PULSO-021` para ligar evidencia al snapshot inspeccionado;
- `TREQ-PULSO-023` para detectar drift de rutas, guards y handlers;
- `TREQ-PULSO-024` para impedir que existencia técnica se interprete como autorización o completitud;
- `TREQ-PULSO-026` para impedir elevar `pulso.pos.main` a permiso exacto suficiente;
- `TREQ-AUTH-001` para autorización basada en permiso, contexto y alcance;
- `TREQ-AUTH-011` para separar dispositivo y trabajador;
- `TREQ-AUTH-013` para revalidación server-side frente a URL, formulario, API o RPC manipulados;
- `TREQ-AUTH-015` para evidencia correlacionable de actor, territorio, permiso, recurso y decisión;
- `TREQ-UX-001` para hacer identificables tarea actual, acción principal y estado;
- `TREQ-UX-003` para adecuar densidad y acciones al actor efectivo;
- `TREQ-UX-006` para recuperación segura;
- `TREQ-UX-008` y `TREQ-UX-009` para navegación por acción/superficie y consumo correcto de contexto.

Esta enumeración es trazabilidad reutilizada y no modifica el Registro 04A.

---

#### 58. Evidencia de validación

| Clase | Estado | Evidencia |
| --- | --- | --- |
| BUILD | NOT_EXECUTED | El build documental corresponde al checkout después de incorporar el artefacto; esta tarea no materializa producto. |
| LOCAL | NOT_EXECUTED | Formato, quality, delivery, validadores de dominio y batería global quedan pendientes de la incorporación en el checkout local. |
| REMOTA | PASS | Se verificaron continuidad, topología `DEFINE_ONCE`, owner PULSO, `AUTH-RBAC-012`, dataset de once grants de `mostrador_satelite`, `VSCREEN-0080/0081/0083/0084/0087/0088`, estados de `VPROC-0039` y `VPROC-0040`, Registro 04A aplicable y runtime vigente de `/orders`, incluidas acciones, filtros, Realtime, optimismo, despacho y chat. |
| OPERATIVA | NOT_EXECUTED | No se atendieron, entregaron, despacharon, cobraron, cancelaron ni conciliaron pedidos reales y no se realizaron pruebas con personal de mostrador. |
| FÍSICA | NOT_APPLICABLE | `PULSO-UX-004` no crea instancia física propia ni autoriza cambios de producto, datos o infraestructura. |

---

#### 59. Criterios de aceptación

La tarea queda documentalmente completa cuando:

- [ ] `VSCREEN-0080` se conserva como identidad canónica compartida de Inicio POS;
- [ ] no se crea un home canónico paralelo de mostrador;
- [ ] `mostrador_satelite` queda como actor principal;
- [ ] `VPROC-0039` queda como proceso principal;
- [ ] `VPROC-0040` queda como proceso secundario para pedidos externos;
- [ ] `VSCREEN-0088` queda como workspace principal de seguimiento/handoff;
- [ ] `VSCREEN-0087` queda como superficie secundaria de pedidos externos;
- [ ] se conservan los nueve estados canónicos de `VPROC-0039`;
- [ ] se conservan los ocho estados canónicos de `VPROC-0040`;
- [ ] punto físico integrado no se convierte en wildcard operativo;
- [ ] mostrador no hereda caja, salón, barra, cocina o logística;
- [ ] contexto y trabajo se resuelven antes de presentar acciones;
- [ ] `pulso.access` se limita a entrada/contexto;
- [ ] no se inventan permisos atómicos de cola, alistamiento, estados, entrega, despacho, chat o cobro;
- [ ] la cola muestra trabajo accionable y no universo administrativo;
- [ ] `READY_FOR_HANDOFF` no equivale a entregado;
- [ ] `HANDOFF_PENDING` conserva receptor y evidencia cuando corresponda;
- [ ] pickup separa listo, pago al recoger y entrega;
- [ ] on_premise no se confunde automáticamente con salón;
- [ ] delivery separa handoff, asignación, tránsito y entrega final;
- [ ] pago pendiente produce handoff a cobro y no autoridad implícita;
- [ ] pago confirmado no cierra la venta automáticamente;
- [ ] nueva venta permanece bloqueada para el rol mientras no exista grant exacto;
- [ ] modificación de pedido exige permiso, estado y columnas válidas;
- [ ] seguimiento de preparación no transfiere ownership productivo;
- [ ] pedido externo recibido no equivale a aceptado;
- [ ] canales no se convierten en zonas;
- [ ] cancelación queda fuera de la acción ordinaria del mostrador;
- [ ] asignación de despacho se separa del handoff;
- [ ] `En camino` no se deduce de que el pedido salió del mostrador;
- [ ] entrega al cliente, transportador y entrega final de domicilio permanecen hechos distinguibles;
- [ ] delivery override permanece fuera del rol;
- [ ] chat con cliente no se deduce de visibilidad del pedido;
- [ ] datos personales se minimizan al handoff;
- [ ] Realtime no concede autoridad;
- [ ] optimismo de UI no se presenta como confirmación definitiva;
- [ ] concurrencia fuerza refresh/revalidación y no reintento ciego;
- [ ] query parameters no conceden autoridad;
- [ ] URL directa de `/orders` no concede mutaciones;
- [ ] dispositivo y trabajador real permanecen separados;
- [ ] cambio de trabajador invalida estado actor-bound;
- [ ] vacío, deny, stale, conflicto, fallo y unknown permanecen distintos;
- [ ] cada brecha AS-IS tiene owner y condición de salida;
- [ ] `PULSO-UX-005` recibe handoff suficiente para componer operador integral sin wildcard;
- [ ] no se crean ni modifican requisitos de prueba;
- [ ] no se ejecutan cambios físicos.

---

#### 60. Límites

Esta tarea no:

- implementa `VSCREEN-0080`, `VSCREEN-0087` ni `VSCREEN-0088`;
- modifica `/orders`;
- crea rutas nuevas;
- crea componentes, Server Actions o bridges;
- crea permisos o grants;
- modifica `AUTH-RBAC-012`;
- concede acciones internas por `pulso.access`;
- crea, modifica o cancela pedidos reales;
- cambia estados reales de preparación o entrega;
- asigna despachos;
- marca pedidos en tránsito;
- confirma entregas reales;
- envía mensajes reales;
- procesa cobros;
- abre o cierra caja;
- configura zonas, puntos o estaciones;
- modifica Supabase, RLS, RPC, grants, tablas, datos, Realtime o migraciones;
- modifica packages compartidos;
- retira `pulso.pos.main` del runtime;
- corrige el board live o sus operaciones optimistas;
- diseña en detalle operador integral o supervisor;
- sustituye `PULSO-UX-005..021`;
- modifica el Registro 04A;
- crea una instancia física propia;
- desarrolla `PULSO-UX-005`.

---

#### 61. Continuidad

**ÚLTIMA TAREA APROBADA**
`PULSO-UX-003 — Diseñar inicio para servicio de salón`

**TAREA ACTUAL APROBADA**
`PULSO-UX-004 — Diseñar inicio para mostrador`

**SIGUIENTE TAREA RESERVADA**
`PULSO-UX-005 — Diseñar inicio para operador integral`
### ✅ PULSO-UX-005 — Diseñar inicio para operador integral

**Estado:** APROBADA
**Tarea anterior:** PULSO-UX-004 — Diseñar inicio para mostrador
**Tarea siguiente:** PULSO-UX-006 — Diseñar inicio para supervisor
**Tipo de tarea:** diseño documental integral de `VSCREEN-0080 — Inicio POS` para el actor operativo `operador_integral_satelite`, componiendo únicamente capacidades PULSO explícitamente concedidas por el catálogo y matrices vigentes, con separación entre capacidades ordinarias `OPERATIONAL_ONLY`, componentes sensibles `BASE_AND_OPERATIONAL`, trabajo aún bloqueado por permisos atómicos faltantes y funciones de otras aplicaciones; sin convertir el rol integral en superusuario, sin unir automáticamente matrices de caja, salón, mostrador, barra o cocina y sin materialización física; `DEFINE_ONCE` / `NO_PHYSICAL_INSTANCE`
**Bloque:** BLOQUE N — PULSO
**Repositorio propietario:** `vento-group-sas/vento-shell`
**Archivo propietario:** `docs/plan-canonico/modular/bloques/N_PULSO/02_EXPERIENCIA_POS_Y_OPERACION_COMERCIAL.md`
**Estado físico resultante:** `NO_PHYSICAL_INSTANCE`
**Cambios físicos autorizados:** Ninguno durante esta tarea.
**Requisitos de prueba creados o modificados:** 0

---

#### 1. Propósito

Diseñar el contrato de experiencia inicial de PULSO para una persona cuyo rol operativo efectivo sea `operador_integral_satelite`, de forma que una sede pequeña expresamente habilitada para operación integrada pueda concentrar trabajo ordinario sin convertir esa integración operativa en autoridad total.

La experiencia debe permitir:

- reconocer que el actor está trabajando bajo una función integral válida y no bajo una suma automática de roles;
- resolver turno, check-in, sede, área o punto aplicable y dispositivo compartido cuando corresponda;
- abrir y cerrar una sesión de caja propia cuando la capacidad esté disponible;
- iniciar una venta ordinaria;
- conducir un cobro ordinario sobre un recurso compatible;
- presentar acciones sensibles solo cuando exista autorización efectiva de ambos carriles;
- distinguir trabajo PULSO disponible de trabajo todavía bloqueado por catálogo o autorización incompleta;
- conservar separadas venta, pago, caja, cancelación, devolución, reembolso, descuento, preparación, salón, entrega, fidelización y abastecimiento;
- impedir que la interfaz use `pulso.pos.main`, el nombre del rol o un dispositivo como wildcard;
- mantener las funciones NEXO del operador integral fuera del workspace PULSO salvo como handoff explícito a su aplicación propietaria.

La tarea especializa la identidad canónica existente:

```text
VSCREEN-0080 — Inicio POS
```

sin crear un home paralelo.

---

#### 2. Entrada recibida de PULSO-UX-004

`PULSO-UX-004` entrega la siguiente frontera:

```text
VSCREEN-0080 SIGUE SIENDO IDENTIDAD COMPARTIDA DE INICIO POS
CAJERO, SALÓN Y MOSTRADOR TIENEN PRIORIZACIONES DISTINTAS
PUNTO FÍSICO INTEGRADO != WILDCARD OPERATIVO
MOSTRADOR PRIORIZA VPROC-0039 / HANDOFF / ENTREGA
VSCREEN-0088 ES WORKSPACE PRINCIPAL DE MOSTRADOR
VSCREEN-0087 ES SECUNDARIO PARA PEDIDOS EXTERNOS CUANDO APLIQUE
MODALIDAD / CANAL / ESTACIÓN != AUTORIDAD
PAGO PENDIENTE != AUTORIDAD DE COBRO
DELIVERY HANDOFF != AUTORIDAD LOGÍSTICA
PERMISOS FALTANTES DEBEN FALLAR CERRADOS
```

La decisión adicional de esta tarea es que `operador_integral_satelite` puede reunir varias responsabilidades ordinarias solo cuando cada capacidad haya sido concedida explícitamente para ese rol y su contexto.

---

#### 3. Naturaleza y topología

La topología vigente de `PULSO-UX-001..021` establece:

```text
mode = DEFINE_ONCE
execution_gate = NO_PHYSICAL_INSTANCE
```

Consecuencias:

1. `PULSO-UX-005` se define una sola vez;
2. no existe instancia física propia;
3. no se modifica `vento-pulso`;
4. no se crean rutas, componentes, Server Actions, RPC, tablas o migraciones;
5. no se cambian permisos, grants o datasets;
6. no se ejecutan ventas, pagos, caja, devoluciones o cierres reales;
7. las brechas AS-IS se asignan a owners existentes;
8. la implementación futura debe consumir el catálogo y las matrices vigentes sin ampliar autoridad.

---

#### 4. Fuentes y contratos consumidos

El diseño consume como entradas:

- `PULSO-UX-001 — Inventariar procesos de venta, caja y salón`;
- `PULSO-UX-002 — Diseñar inicio para cajero`;
- `PULSO-UX-003 — Diseñar inicio para servicio de salón`;
- `PULSO-UX-004 — Diseñar inicio para mostrador`;
- `OPS-POS-001 — Definir zonas físicas, mesas y puntos de servicio del POS por sede`;
- `AUTH-RBAC-013 — Crear matriz de operador_integral_satelite` como base histórica del rol;
- `AUTH-CAT-022 — Descomponer permisos legacy maduros y definir nuevas claves atómicas`;
- `AUTH-CAT-023 — Actualizar matrices, excepciones, denegaciones y paquetes de dispositivo afectados por el diff contractual`;
- `AUTH-CAT-024 — Validar, publicar y congelar la versión canónica que alimentará los datasets`;
- el dataset canónico vigente `operational-role-grants@1.0.0`;
- `PULSO-AUTH-011` a `PULSO-AUTH-016` para territorio, dispositivo, actor, separación administrativa, packages y certificación;
- `VSCREEN-0080` como Inicio POS;
- `VSCREEN-0081`, `VSCREEN-0084`, `VSCREEN-0089` y `VSCREEN-0090` como superficies propietarias de capacidades PULSO actualmente concedidas al rol;
- `VPROC-0039` como proceso principal de venta directa;
- `VPROC-0043` como proceso propietario del cobro;
- `VPROC-0044` como proceso propietario de caja y cierre;
- el runtime vigente de `vento-pulso` como evidencia AS-IS, no como autoridad contractual.

---

#### 5. Reconciliación contractual posterior a AUTH-RBAC-013

La matriz inicial `AUTH-RBAC-013` evaluó 112 permisos y dejó al operador integral con doce concesiones operativas, de las cuales solo `pulso.access` pertenecía a PULSO.

Posteriormente, `AUTH-CAT-022` creó nueve PermissionKeys atómicas PULSO y `AUTH-CAT-023` revisó explícitamente sus matrices. `AUTH-CAT-024` congeló ese diff en la versión contractual `1.0.0`, y los datasets vigentes incorporan las decisiones resultantes.

Por tanto, para esta tarea rige la reconciliación posterior:

```text
AUTH-RBAC-013 INICIAL
+
AUTH-CAT-022 / 023 / 024
+
DATASET VIGENTE 1.0.0
=
AUTORIDAD DOCUMENTAL ACTUAL
```

No se usa la fotografía inicial de doce grants para negar capacidades que fueron concedidas expresamente después.

---

#### 6. Actor contractual

El actor principal es:

```text
operational_role = operador_integral_satelite
```

Su autoridad requiere, según la acción:

```text
ACTOR HUMANO IDENTIFICADO
+ EMPLEADO ACTIVO
+ TURNO PUBLICADO Y VIGENTE
+ ROL OPERATIVO EFECTIVO operador_integral_satelite
+ SEDE HABILITADA COMO FORMATO INTEGRADO
+ ÁREA EXACTA CUANDO LA CONFIGURACIÓN LA EXIJA
+ CHECK-IN CUANDO CORRESPONDE
+ PUNTO / CAJA / RECURSO COMPATIBLES
+ PERMISO EXACTO
+ CARRIL BASE CUANDO LA MODALIDAD LO EXIJA
+ DENEGACIONES Y FILTROS APLICABLES
= ACCIÓN AUTORIZABLE
```

El término “integral” describe organización del trabajo, no autoridad universal.

---

#### 7. Inventario vigente de grants del rol

El dataset canónico vigente contiene:

```text
21 grants para operador_integral_satelite
```

Distribución:

```text
11 NEXO
10 PULSO
```

Los once grants NEXO corresponden a entrada, referencias de abastecimiento, solicitudes/remisiones propias y recepción ordinaria de remisiones destinadas a la sede integrada.

Los diez grants PULSO se detallan en esta tarea porque gobiernan la composición del inicio POS.

---

#### 8. Grants PULSO vigentes

Los diez grants PULSO del rol son:

```text
pulso.access
pulso.sales.orders.create
pulso.payments.transactions.collect
pulso.cash.sessions.start
pulso.cash.sessions.close
pulso.payments.transactions.reverse
pulso.sales.orders.cancel
pulso.sales.returns.create
pulso.payments.transactions.refund
pulso.sales.discounts.apply
```

No se incorpora `pulso.delivery.deliveries.override` al rol operativo integral.

---

#### 9. Capacidades ordinarias directas

Cinco grants pueden formar autoridad operativa directa cuando se cumplen sus condiciones:

| PermissionKey | Modalidad | Uso en el inicio |
| --- | --- | --- |
| `pulso.access` | `OPERATIONAL_ONLY` | entrar a PULSO y mostrar contexto integrado |
| `pulso.sales.orders.create` | `OPERATIONAL_ONLY` | iniciar venta ordinaria |
| `pulso.payments.transactions.collect` | `OPERATIONAL_ONLY` | cobrar mediante una sesión y recurso válidos |
| `pulso.cash.sessions.start` | `OPERATIONAL_ONLY` | abrir sesión de caja propia |
| `pulso.cash.sessions.close` | `OPERATIONAL_ONLY` | iniciar/cursar cierre de caja propia conforme al contrato |

Estas capacidades siguen exigiendo turno, check-in, sede, contexto y recurso compatibles.

---

#### 10. Componentes operativos sensibles

Cinco grants son únicamente componentes operativos de permisos `BASE_AND_OPERATIONAL`:

| PermissionKey | Componente del rol | Condición adicional obligatoria |
| --- | --- | --- |
| `pulso.payments.transactions.reverse` | operacional | componente base del mismo actor y recurso |
| `pulso.sales.orders.cancel` | operacional | componente base del mismo actor y recurso |
| `pulso.sales.returns.create` | operacional | componente base del mismo actor y recurso |
| `pulso.payments.transactions.refund` | operacional | componente base del mismo actor y recurso |
| `pulso.sales.discounts.apply` | operacional | componente base del mismo actor y recurso |

El rol operativo integral por sí solo no autoriza ninguna de estas cinco acciones.

---

#### 11. Regla de doble carril

Para una acción sensible:

```text
COMPONENTE OPERATIVO operador_integral_satelite
+
COMPONENTE BASE DEL MISMO ACTOR
+
MISMO PERMISO
+
MISMO RECURSO
+
MISMA SOLICITUD
+
TURNO + CHECK-IN + TERRITORIO
+
REAUTENTICACIÓN FUERTE
+
MOTIVO + EVIDENCIA + VERSIONADO
=
DECISIÓN POSIBLE
```

Nunca:

```text
operador_integral_satelite
→ refund automático
```

ni:

```text
actor base A + actor operativo B
→ BASE_AND_OPERATIONAL válido
```

---

#### 12. Identidad canónica del inicio

La identidad continúa siendo:

```text
VSCREEN-0080 — Inicio POS
```

No se crea:

- `VSCREEN` exclusivo para operador integral;
- dashboard paralelo;
- home por sede;
- home por dispositivo;
- home por mezcla de roles.

La misma pantalla se especializa por actor, contexto, permisos efectivos y trabajo real.

---

#### 13. Proceso principal

El proceso principal del inicio permanece:

```text
VPROC-0039 — Gestionar venta de mostrador o para llevar con entrega y cobro correlacionados
```

La condición integral amplía las capacidades que pueden aparecer dentro del mismo workspace, pero no cambia el owner principal de `VSCREEN-0080`.

---

#### 14. Procesos relacionados

El inicio puede relacionarse con:

```text
VPROC-0043 — cobro y confirmación de pago
VPROC-0044 — cierre y conciliación de caja
```

`VPROC-0038` — servicio en mesa — y `VPROC-0040` — pedidos externos — siguen siendo procesos relacionados, pero la existencia del rol integral no crea por sí sola PermissionKeys de lectura, actualización, mesas, preparación, entrega o admisión externa que aún no estén concedidas.

---

#### 15. Pregunta operativa del inicio

El home responde:

```text
¿QUÉ PUEDO HACER AHORA, CON AUTORIDAD EFECTIVA, EN ESTE PUNTO INTEGRADO?
```

No responde:

```text
¿QUÉ HARÍA NORMALMENTE UNA PERSONA QUE HACE DE TODO?
```

La diferencia impide convertir expectativas operativas en permisos inexistentes.

---

#### 16. Condición nominal de entrada

La entrada al home requiere:

```text
pulso.access
+ TURNO VIGENTE
+ ROL operador_integral_satelite
+ SEDE INTEGRADA HABILITADA
+ ÁREA EXACTA CUANDO CORRESPONDA
= ENTRADA AL CONTEXTO PULSO
```

Entrar no implica que exista check-in ni que estén habilitadas las acciones internas.

---

#### 17. Check-in

Las operaciones PULSO concedidas al rol requieren `T+C`.

Por tanto:

```text
HOME VISIBLE
+
SIN CHECK-IN
=
CONTEXTO VISIBLE, MUTACIONES BLOQUEADAS
```

El inicio debe explicar el requisito faltante sin degradar el estado a “sin trabajo”.

---

#### 18. Sede integrada

La operación integral solo aplica en una sede habilitada para ese formato.

La selección de sede del cliente no basta.

```text
site_id DE QUERY
!=
SEDE AUTORIZADA
```

La sede efectiva se deriva del contexto canónico y el parámetro solo puede ser compatible con ese territorio, nunca ampliarlo.

---

#### 19. Área y punto

La configuración de la sede decide si el rol integral exige:

- un área exacta; o
- el contexto general permitido para ese formato.

Cuando exista área concreta, `area_id = null` no puede utilizarse como bypass.

El punto físico puede integrar Caja / Mostrador / Barra, pero esa integración no crea permisos adicionales.

---

#### 20. Composición lógica del home

El inicio se compone de estas zonas lógicas:

| Zona | Contenido | Regla |
| --- | --- | --- |
| contexto | actor, sede integrada, área/punto, turno, check-in, dispositivo | contexto no concede autoridad |
| acción primaria | siguiente acción ordinaria autorizada | una acción dominante por estado |
| caja | estado de sesión propia | nunca reutilizar sesión de otro actor |
| venta | entrada a nueva venta o recurso cobrable autorizado | no inventar lectura de pedidos |
| acciones sensibles | cancelación, reversión, devolución, refund, descuento | visibles solo con autorización efectiva doble |
| bloqueos | permiso faltante, stale, recurso incompatible, deny, fallo | cada causa se distingue |
| handoffs | NEXO u otros owners | cambiar de app no amplía permiso |

---

#### 21. Prioridad de acción ordinaria

La prioridad base es:

```text
1. CONTEXTO BLOQUEANTE
2. CHECK-IN REQUERIDO
3. SESIÓN DE CAJA REQUERIDA Y AUSENTE
4. RECURSO CON COBRO ORDINARIO ACCIONABLE
5. NUEVA VENTA
6. CIERRE DE CAJA CUANDO EL CICLO LO EXIJA
7. SIN ACCIÓN ORDINARIA DISPONIBLE
```

La prioridad solo considera capacidades que hayan pasado autorización efectiva.

---

#### 22. Apertura de caja

Cuando no existe una sesión propia válida y el contexto permite operar caja:

```text
pulso.cash.sessions.start
→ VSCREEN-0089 — Apertura de caja
```

La apertura debe conservar actor, sede, área/punto y reglas de concurrencia.

No se permite reutilizar una sesión ajena por estar en el mismo dispositivo.

---

#### 23. Nueva venta

Con sesión y contexto compatibles:

```text
pulso.sales.orders.create
→ VSCREEN-0081 — Creación de venta o pedido
```

Crear una venta no concede:

- consulta general de pedidos;
- actualización general;
- descuento;
- cancelación;
- pago;
- devolución;
- fidelización.

Cada capacidad conserva su contrato separado.

---

#### 24. Cobro ordinario

Cuando existe un recurso cobrable obtenido por un flujo autorizado:

```text
pulso.payments.transactions.collect
→ VSCREEN-0084 — Cobro y medios de pago
```

El home no debe fabricar un listado de recursos solo porque el actor puede cobrar.

```text
PERMISO DE COBRO
!=
PERMISO DE CONSULTA GLOBAL DE PEDIDOS
```

---

#### 25. Cierre de caja

El operador integral recibe `pulso.cash.sessions.close` como capacidad operacional ordinaria.

Su destino es:

```text
VSCREEN-0090 — Cierre de caja
```

El cierre de la sesión propia no concede:

- aprobación de diferencias;
- corrección de movimientos;
- cierre de sesiones ajenas;
- conciliación financiera NUMERA;
- edición destructiva de ventas o pagos.

---

#### 26. Reversión de pago

`pulso.payments.transactions.reverse` es `BASE_AND_OPERATIONAL`.

El home solo puede presentar la acción como ejecutable cuando la decisión efectiva confirme ambos componentes.

```text
REVERSE
!=
REFUND
```

Una transacción que ya exige reembolso no puede resolverse mediante reversión por conveniencia de interfaz.

---

#### 27. Cancelación de venta

`pulso.sales.orders.cancel` también es `BASE_AND_OPERATIONAL`.

La cancelación:

- exige estado cancelable;
- conserva motivo y evidencia;
- no revierte pagos automáticamente;
- no crea devolución;
- no corrige inventario o producción por implicación.

El home no la presenta como “cambiar estado”.

---

#### 28. Devolución

`pulso.sales.returns.create` es un componente operacional sensible.

```text
CANCELAR
!=
DEVOLVER
!=
REEMBOLSAR
```

La devolución se vincula a líneas y cantidades elegibles y no ejecuta el refund por implicación.

---

#### 29. Reembolso

`pulso.payments.transactions.refund` requiere ambos carriles y un pago/monto elegibles.

El home debe impedir:

- refund sin componente base;
- refund por monto superior al disponible;
- refund sin vínculo con devolución o resolución cuando el contrato lo exige;
- refund repetido por timeout incierto.

---

#### 30. Descuento

`pulso.sales.discounts.apply` también exige doble carril.

La acción debe preservar:

- regla aplicable;
- límite;
- actor;
- motivo;
- cálculo antes/después;
- versión del recurso.

No permite modificar precios maestros ni políticas comerciales.

---

#### 31. Capacidades PULSO que siguen faltando para una operación integral completa

El catálogo vigente todavía no concede al rol, entre otras, PermissionKeys atómicas para:

- consulta general de pedidos;
- actualización ordinaria de pedidos existentes;
- cola y detalle de preparación;
- gestión de mesas y sesiones de salón;
- alistamiento y empaque;
- entrega ordinaria;
- admisión completa de pedidos externos;
- loyalty laboral de identificación, acumulación o redención;
- incidencias de producto;
- supervisión comercial integral.

Estas ausencias no se sustituyen con `pulso.access`, `pulso.pos.main` ni con el nombre del rol.

---

#### 32. Regla para trabajo aún no autorizado

Cuando la UX conoce conceptualmente una función pero no existe PermissionKey/grant suficiente:

```text
FUNCIÓN OPERATIVA ESPERADA
+
CONTRATO DE AUTORIZACIÓN INCOMPLETO
=
NO PRESENTAR COMO EJECUTABLE
```

Puede existir información explicativa o un bloqueo gobernado, pero nunca un CTA que dependa de un wildcard legacy.

---

#### 33. Relación con servicio de salón

El operador integral puede ser un actor potencial de `VPROC-0038`, pero el catálogo actual no materializa permisos atómicos suficientes de mesa, sesión y servicio para deducir su autoridad completa.

Por tanto:

```text
ROL INTEGRAL
!=
HOME DE SALÓN HABILITADO AUTOMÁTICAMENTE
```

`VSCREEN-0082` solo se integra como trabajo real cuando las capacidades propietarias estén materializadas y autorizadas.

---

#### 34. Relación con mostrador

El operador integral puede ejecutar trabajo de venta directa, pero no hereda las brechas del `mostrador_satelite` como permisos.

`VSCREEN-0088` puede convertirse en una superficie relevante cuando exista autoridad de lectura/transición suficiente.

Hasta entonces:

```text
OPERADOR INTEGRAL
+
VSCREEN-0088 EXISTENTE
!=
AUTORIZACIÓN PARA CAMBIAR ESTADOS
```

---

#### 35. Relación con pedidos externos

`VSCREEN-0087` sigue perteneciendo a `VPROC-0040`.

El rol integral no recibe por la sola existencia de su función permisos de:

- consulta global de pedidos externos;
- aceptación;
- rechazo;
- conciliación;
- cambio de canal.

Esas capacidades permanecen sujetas al catálogo y owner correspondientes.

---

#### 36. Relación con NEXO

El operador integral sí posee capacidades NEXO para abastecimiento ordinario de la sede integrada.

El inicio PULSO no debe incrustar esas operaciones como si fueran capacidades POS.

El handoff permitido es:

```text
PULSO
→ INDICA NECESIDAD DE ABASTECIMIENTO CUANDO CORRESPONDA
→ NEXO COMO OWNER
→ NEXO REVALIDA SU PROPIA AUTORIDAD
```

No se comparten permisos entre aplicaciones.

---

#### 37. NEXO no convierte al rol en bodeguero

Aunque el rol pueda solicitar y recibir remisiones destinadas a la sede integrada, no recibe por ello:

- inventario general;
- preparación en origen;
- despacho;
- cancelación de remisiones;
- movimientos generales;
- ubicaciones y LPN;
- conteos y ajustes generales;
- logística central.

El home PULSO no debe sugerir lo contrario.

---

#### 38. Dispositivo compartido

Se conserva:

```text
TECHNICAL PRINCIPAL
!=
DEVICE
!=
HUMAN ACTOR
```

Una terminal integrada puede habilitar varias aplicaciones o capacidades como superficie técnica, pero nunca concede el rol o sus permisos.

Cada acción conserva al trabajador real y debe invalidar actor-bound state al cambiar de persona.

---

#### 39. Cambio de actor

Un cambio A → B obliga a recalcular:

- rol operativo efectivo;
- sede y área aplicables;
- grants directos;
- componentes duales;
- sesión de caja personal;
- recursos visibles;
- reautenticación sensible;
- acciones disponibles.

La sesión de caja de A no se transfiere a B por continuidad del dispositivo.

---

#### 40. Rol integral no es unión de matrices

La composición se rige por:

```text
CAPACIDADES EXPLÍCITAS DEL MISMO ROL
```

no por:

```text
cajero_satelite
+ servicio_salon
+ mostrador_satelite
+ barista_satelite
+ cocinero_satelite
```

El rol integral posee sus propios grants y condiciones.

---

#### 41. Rol integral no es superusuario

La UX no debe ofrecer una navegación administrativa global por el nombre `integral`.

Quedan fuera por defecto:

- seguridad y permisos;
- gestión de empleados;
- configuración de sedes;
- catálogos maestros;
- finanzas NUMERA;
- compras ORIGO;
- inventario general NEXO;
- producción central FOGO;
- override de entrega;
- cualquier permiso futuro no evaluado.

---

#### 42. `pulso.pos.main` permanece bloqueado

El runtime actual todavía usa `pulso.pos.main` en varias superficies.

El contrato canónico establece:

```text
catalog_status = deprecated
assignment_status = blocked
resolution = DECOMPOSE_REQUIRED
```

El home objetivo no puede utilizarlo como fallback para rellenar capacidades faltantes.

---

#### 43. Contraste con el runtime actual

En el snapshot vigente de `vento-pulso`:

- `/` continúa montando `ScannerPage`;
- `/orders` continúa protegido por `pos.main`;
- las nuevas claves `orders.create`, `collect`, `cash.start`, `cash.close`, `cancel`, `return`, `refund`, `reverse` y `discount.apply` no aparecen como permisos consumidos por el código PULSO revisado;
- `/orders` contiene server actions y RPC operativas que usan el guard broad;
- Realtime y optimismo de UI aceleran el board, pero no implementan el nuevo modelo de autorización.

Por tanto:

```text
CATÁLOGO / MATRIZ CANÓNICOS
!=
CONSUMO RUNTIME MATERIALIZADO
```

---

#### 44. Realtime

Realtime puede refrescar trabajo autorizado, pero no concede lectura ni mutación.

```text
EVENTO RECIBIDO
!=
PERMISO DE VER RECURSO
!=
PERMISO DE ACTUAR
```

El cliente debe descartar o no materializar información para la que el actor no tenga una proyección autorizada.

---

#### 45. Optimismo de UI

Una actualización optimista sirve para latencia percibida, no para autoridad.

Toda mutación debe terminar en decisión server-side y reconciliar el resultado real.

Ante rechazo:

- revertir proyección optimista;
- conservar el error;
- no presentar el estado local como hecho definitivo.

---

#### 46. Resultado desconocido

En pagos y otras acciones sensibles:

```text
TIMEOUT / RESPUESTA INCIERTA
!=
FALLO CONFIRMADO
```

El home no ofrece repetir automáticamente la acción hasta consultar receipt, estado o mecanismo de reconciliación propietario.

---

#### 47. Estados de experiencia

El inicio distingue al menos:

| Estado UX | Significado |
| --- | --- |
| `CONTEXTO_REQUERIDO` | falta turno, sede integrada, área o actor válido |
| `CHECKIN_REQUERIDO` | el home es visible, pero las mutaciones internas están bloqueadas |
| `CAJA_REQUIERE_APERTURA` | no existe sesión propia utilizable |
| `LISTO_PARA_VENTA` | nueva venta ordinaria disponible |
| `COBRO_ACCIONABLE` | existe un recurso cobrable obtenido por flujo autorizado |
| `CIERRE_ACCIONABLE` | la sesión propia puede entrar a cierre |
| `DOBLE_CARRIL_REQUERIDO` | existe componente operacional sensible, pero falta autoridad base u otra condición |
| `CAPACIDAD_NO_MATERIALIZADA` | la función esperada carece todavía de PermissionKey/grant consumible |
| `SIN_PERMISO` | deny efectivo para la capacidad solicitada |
| `DATOS_DESACTUALIZADOS` | la frescura no permite decidir o mutar |
| `RESULTADO_DESCONOCIDO` | efecto sensible aún no conciliado |
| `FALLO_TECNICO` | dependencia necesaria falló |

Estos rótulos son contrato UX, no estados persistidos nuevos.

---

#### 48. No confundir vacío, deny y capacidad inexistente

La experiencia conserva:

```text
SIN TRABAJO
!=
SIN PERMISO
!=
CAPACIDAD NO MATERIALIZADA
!=
SIN CONTEXTO
!=
STALE
!=
FALLO TÉCNICO
!=
RESULTADO DESCONOCIDO
```

Un permiso faltante no puede presentarse como “no hay pedidos”.

---

#### 49. Jerarquía visual

El home integral prioriza:

1. bloqueo crítico de contexto;
2. siguiente acción ordinaria autorizada;
3. estado de caja propia;
4. trabajo relacionado obtenido por proyección autorizada;
5. acciones sensibles realmente habilitadas por doble carril;
6. handoffs a otras aplicaciones;
7. información secundaria.

El mayor número de responsabilidades no justifica mayor densidad visual indiscriminada.

---

#### 50. Acciones sensibles no se vuelven accesos rápidos permanentes

Aunque el actor tenga un componente operacional para cancelación, devolución, refund, reversión o descuento, esas acciones no aparecen como botones permanentes del home.

Se muestran únicamente dentro del recurso y estado compatibles cuando la autorización efectiva ya incluye ambos carriles.

---

#### 51. Privacidad y minimización

El home integral no carga por defecto:

- todas las ventas de todas las sedes;
- ledger completo PASS;
- clientes completos;
- inventario general;
- costos y márgenes;
- documentos de personal;
- configuración de autorización;
- auditoría global;
- datos de proveedores;
- producción central.

La proyección se limita al trabajo y territorio actuales.

---

#### 52. Recuperación segura

Ante pérdida de red, sesión, dispositivo o contexto:

- conservar identificadores de trabajo cuando sea seguro;
- no repetir mutaciones por defecto;
- revalidar actor, turno, check-in, sede y sesión de caja;
- consultar estado real antes de repetir pagos o acciones sensibles;
- invalidar reautenticación fuerte del actor anterior;
- distinguir intención local de efecto confirmado.

---

#### 53. Operación degradada

`VPROC-0039` admite degradación controlada según los contratos transversales vigentes.

El rol integral no convierte offline en licencia para ejecutar cualquier función.

Solo se permiten operaciones expresamente soportadas por el modo degradado y deben reconciliarse por su owner.

---

#### 54. Matriz de decisión del home

| Situación | Acción dominante | Resultado |
| --- | --- | --- |
| turno o sede integrada inválidos | resolver contexto | no mutar |
| check-in ausente | completar requisito laboral | no mutar |
| caja requerida y no abierta | `VSCREEN-0089` | abrir sesión propia si autorizado |
| contexto válido y venta nueva | `VSCREEN-0081` | crear venta |
| recurso cobrable autorizado | `VSCREEN-0084` | cobrar |
| fin de ciclo y sesión propia cerrable | `VSCREEN-0090` | entrar a cierre |
| acción sensible sin componente base | explicar doble carril requerido | no ejecutar |
| función esperada sin permiso atómico | informar capacidad no materializada | no usar legacy |
| necesidad de abastecimiento | handoff a NEXO | NEXO revalida autoridad |
| fallo o stale | recuperar/revalidar | no presentar vacío falso |

---

#### 55. Brechas AS-IS y propietarios

| Brecha observada | Riesgo | Propietario canónico | Condición de salida |
| --- | --- | --- | --- |
| `/` continúa siendo `ScannerPage` | Inicio POS integral no materializado | materialización UX del package propietario | `VSCREEN-0080` real consume actor, contexto y capacidades efectivas |
| PULSO runtime no consume las nuevas PermissionKeys | catálogo vigente no se aplica en acciones | materialización `PULSO-AUTH-015` / packages consumidores | guards y acciones usan claves atómicas sin `pos.main` |
| `/orders` usa `pos.main` para lectura y mutaciones | wildcard legacy puede gobernar efectos distintos | owners de autorización y `PULSO-UX-021` | cada acción exige permiso exacto server-side |
| faltan permisos maduros de lectura/update, salón, preparación, entrega y loyalty | rol integral podría aparentar más capacidad que la realmente autorizada | roadmap PULSO/AUTH y tareas UX propietarias | nuevas claves solo tras diseño y revisión contractual |
| operaciones optimistas llaman RPC desde cliente | UI puede parecer exitosa antes de decisión final | package propietario de `/orders` | server enforcement + rollback visual + receipt |
| Realtime proyecta eventos por sede | eventos pueden confundirse con permiso | owner de proyección autorizada | filtrado/lectura protegidos por recurso y actor |
| capacidades NEXO existen en el mismo rol | home PULSO podría absorber otra aplicación | NEXO como owner | handoff explícito con revalidación propia |

No queda un hallazgo de esta tarea sin propietario y condición de salida.

---

#### 56. Handoff inmediato a PULSO-UX-006

`PULSO-UX-006 — Diseñar inicio para supervisor` recibe:

```text
VSCREEN-0080 SIGUE SIENDO IDENTIDAD COMPARTIDA DE INICIO POS
OPERADOR INTEGRAL NO ES SUPERUSUARIO
OPERADOR INTEGRAL NO ES UNIÓN AUTOMÁTICA DE ROLES
CAPACIDADES ORDINARIAS DIRECTAS != COMPONENTES SENSIBLES DE DOBLE CARRIL
SUPERVISOR NO RECIBE POR MATRIZ LOS NUEVOS COMPONENTES BASE PULSO DE AUTH-CAT-023
SUPERVISIÓN != EJECUCIÓN ORDINARIA DE CAJA
VISIBILIDAD DE EXCEPCIONES != PERMISO DE MUTAR
REALTIME != AUTORIDAD
PULSO.POS.MAIN NO PUEDE SER FALLBACK
```

La 006 deberá diseñar una experiencia de supervisión basada en carga, excepciones, bloqueos y decisiones gobernadas, sin convertir `supervisor` en operador integral ni en autoridad sensible por defecto.

---

#### 57. Handoff al resto de PULSO-UX

| Tarea | Entrada exacta proveniente de PULSO-UX-005 |
| --- | --- |
| `PULSO-UX-006` | supervisor observa y decide dentro de permisos propios, sin heredar ejecución integral |
| `PULSO-UX-007` | nueva venta consume `orders.create` y separa creación de consulta/update |
| `PULSO-UX-008` | cobro consume `transactions.collect` y separa reverse/refund |
| `PULSO-UX-009` | cancelación, devolución, reverse y refund conservan doble carril y semánticas distintas |
| `PULSO-UX-010` | apertura y cierre usan sesiones personales y no aprueban diferencias automáticamente |
| `PULSO-UX-011` | loyalty no se deduce del rol integral mientras falten grants/contratos vigentes |
| `PULSO-UX-012` | redención conserva autorización propia y no nace de `pulso.access` |
| `PULSO-UX-013` | acciones sensibles confirman efecto, motivo, actor, recurso y doble carril |
| `PULSO-UX-014` | terminal compartida invalida sesión y reauth actor-bound al cambiar trabajador |
| `PULSO-UX-015` | interacción táctil adapta la composición integral sin crear permisos |
| `PULSO-UX-020` | runtime legacy se clasifica sin elevar `pos.main` a canon |
| `PULSO-UX-021` | arquitectura objetivo elimina dependencia broad y consume grants atómicos |

---

#### 58. Requisitos de prueba derivados

**Resultado:** NO GENERA REQUISITOS DE PRUEBA.

**Requisitos creados:** 0
**Requisitos modificados:** 0
**Requisitos diferidos:** 0
**Requisitos obsoletos:** 0

Justificación: las obligaciones de separación entre capacidades, autorización exacta, territorio, actor, caja, pagos, acciones sensibles, rutas y recovery ya están cubiertas por requisitos vigentes de PULSO, AUTH y UX. Esta tarea especializa `VSCREEN-0080` para `operador_integral_satelite` y reconcilia la experiencia con el catálogo/matrices vigentes sin introducir una nueva obligación verificable en 04A.

---

#### 59. Cobertura de prueba vigente reutilizada

Se reutiliza sin modificación:

- `TREQ-PULSO-005` para separar pedido, preparación, mesa, cuenta, venta, cumplimiento, pago e inventario;
- `TREQ-PULSO-006` para separar venta, cobro, pago, caja, cancelación, devolución, refund y cierre mediante acciones nombradas y auditables;
- `TREQ-PULSO-014` y `TREQ-PULSO-015` para acceso protegido y territorio no ampliable por query;
- `TREQ-PULSO-016` para impedir que abrir `/orders` autorice mutaciones;
- `TREQ-PULSO-019` para tratar filtros/query como navegación y no como autoridad;
- `TREQ-PULSO-024` para impedir que existencia de ruta/guard implique autorización completa;
- `TREQ-PULSO-026` para impedir que `pulso.pos.main` se trate como permiso exacto suficiente;
- `TREQ-AUTH-001` para autorización por permiso, contexto y alcance canónicos;
- `TREQ-AUTH-011` para intersección entre dispositivo y trabajador identificado;
- `TREQ-AUTH-013` para impedir bypass por URL, formulario, API o RPC;
- `TREQ-AUTH-015` para evidencia correlacionable de principal, actor, contexto, permiso, recurso y decisión.

Esta enumeración es trazabilidad reutilizada y no modifica el Registro 04A.

---

#### 60. Evidencia de validación

| Clase | Estado | Evidencia |
| --- | --- | --- |
| BUILD | NOT_EXECUTED | El build documental corresponde al checkout después de incorporar el artefacto; esta tarea no materializa producto. |
| LOCAL | NOT_EXECUTED | Formato, quality, delivery, validadores de dominio y batería global quedan pendientes de la incorporación en el checkout local. |
| REMOTA | PASS | Se verificaron owner PULSO, marcador 005, sucesora 006, topología `DEFINE_ONCE`, catálogo 1.0.0, reconciliación AUTH-CAT-022/023/024, dataset vigente de `operador_integral_satelite`, bindings de `VSCREEN-0080`, procesos `VPROC-0039/0043/0044`, 04A aplicable y runtime vigente de `vento-pulso`. |
| OPERATIVA | NOT_EXECUTED | No se ejecutaron ventas, cobros, apertura/cierre de caja, cancelaciones, devoluciones, refunds, descuentos ni pruebas con operadores reales. |
| FÍSICA | NOT_APPLICABLE | `PULSO-UX-005` no crea instancia física propia ni autoriza cambios de producto, datos o infraestructura. |

---

#### 61. Criterios de aceptación

La tarea queda documentalmente completa cuando:

- [ ] `VSCREEN-0080` se conserva como única identidad de Inicio POS;
- [ ] `operador_integral_satelite` se trata como rol propio y no como unión de matrices;
- [ ] se reconoce la reconciliación posterior de AUTH-CAT-022/023/024 sobre AUTH-RBAC-013;
- [ ] el dataset vigente se toma con 21 grants: 11 NEXO y 10 PULSO;
- [ ] los cinco grants PULSO ordinarios directos quedan separados de los cinco componentes sensibles;
- [ ] las acciones sensibles requieren ambos carriles para el mismo actor/recurso/solicitud;
- [ ] el home no utiliza `pulso.pos.main` como fallback;
- [ ] la entrada exige sede habilitada como formato integrado;
- [ ] check-in faltante bloquea mutaciones sin ocultar el contexto;
- [ ] apertura de caja usa `VSCREEN-0089` y sesión personal;
- [ ] nueva venta usa `VSCREEN-0081` mediante `orders.create`;
- [ ] cobro usa `VSCREEN-0084` mediante `transactions.collect`;
- [ ] cierre usa `VSCREEN-0090` mediante `cash.sessions.close`;
- [ ] reverse, cancel, return, refund y discount no se vuelven acciones ordinarias por el rol;
- [ ] no se inventan permisos de lectura/update, salón, preparación, entrega, pedidos externos o loyalty;
- [ ] NEXO se conserva como owner de abastecimiento y recepción;
- [ ] dispositivo compartido no transfiere sesión de caja ni reauth entre actores;
- [ ] Realtime y optimismo de UI no se tratan como autoridad;
- [ ] resultado desconocido permanece distinto de fallo confirmado;
- [ ] cada brecha AS-IS tiene propietario y condición de salida;
- [ ] `PULSO-UX-006` recibe un handoff suficiente para diseñar supervisor sin heredar ejecución integral;
- [ ] no se crean ni modifican requisitos de prueba;
- [ ] no se ejecutan cambios físicos.

---

#### 62. Límites

Esta tarea no:

- implementa `VSCREEN-0080`;
- modifica `/`, `/orders` ni otra ruta;
- crea componentes, Server Actions o RPC;
- modifica el catálogo de permisos;
- modifica matrices o datasets;
- concede componentes base de acciones sensibles;
- crea permisos de lectura/update de pedidos;
- crea permisos de salón, preparación, entrega, pedidos externos o loyalty;
- procesa ventas o pagos reales;
- abre o cierra caja real;
- cancela ventas reales;
- registra devoluciones o refunds reales;
- aplica descuentos reales;
- aprueba diferencias de caja;
- modifica NEXO, ORIGO, FOGO, PASS o NUMERA;
- modifica Supabase, RLS, grants, tablas, datos, Realtime o migraciones;
- modifica packages compartidos;
- retira físicamente `pulso.pos.main`;
- corrige el runtime `/orders`;
- diseña en detalle el inicio del supervisor;
- sustituye `PULSO-UX-006..021`;
- modifica el Registro 04A;
- crea instancia física propia;
- desarrolla `PULSO-UX-006`.

---

#### 63. Continuidad

**ÚLTIMA TAREA APROBADA**
`PULSO-UX-004 — Diseñar inicio para mostrador`

**TAREA ACTUAL APROBADA**
`PULSO-UX-005 — Diseñar inicio para operador integral`

**SIGUIENTE TAREA RESERVADA**
`PULSO-UX-006 — Diseñar inicio para supervisor`
### [ ] PULSO-UX-006 — Diseñar inicio para supervisor
### [ ] PULSO-UX-007 — Simplificar creación de venta
### [ ] PULSO-UX-008 — Simplificar cobro y medios de pago
### [ ] PULSO-UX-009 — Separar anulación, devolución y reembolso
### [ ] PULSO-UX-010 — Diseñar apertura y cierre de caja
### [ ] PULSO-UX-011 — Integrar acumulación de puntos
### [ ] PULSO-UX-012 — Integrar redención de puntos
### [ ] PULSO-UX-013 — Diseñar confirmaciones para acciones sensibles
### [ ] PULSO-UX-014 — Identificar actor real en terminal compartida
### [ ] PULSO-UX-015 — Diseñar experiencia táctil para POS
### [ ] PULSO-UX-016 — Conectar venta con inventario
### [ ] PULSO-UX-017 — Conectar venta con NUMERA
### [ ] PULSO-UX-018 — Conectar venta con PASS
### [ ] PULSO-UX-019 — Validar el prototipo con caja, salón, barra, cocina y mostrador
### [ ] PULSO-UX-020 — Auditar el prototipo POS histórico de vento-platform y clasificar cada pieza como reutilizable, adaptable o descartable
### [ ] PULSO-UX-021 — Diseñar la arquitectura funcional y técnica del POS integral objetivo sin heredar como contrato el prototipo histórico
