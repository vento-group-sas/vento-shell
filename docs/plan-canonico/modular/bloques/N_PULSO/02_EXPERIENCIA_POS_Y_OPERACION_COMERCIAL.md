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
### [ ] PULSO-UX-003 — Diseñar inicio para servicio de salón
### [ ] PULSO-UX-004 — Diseñar inicio para mostrador
### [ ] PULSO-UX-005 — Diseñar inicio para operador integral
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
