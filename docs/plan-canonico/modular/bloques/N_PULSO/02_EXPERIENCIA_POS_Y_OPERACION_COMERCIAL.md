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
### ✅ PULSO-UX-006 — Diseñar inicio para supervisor

**Estado:** APROBADA
**Tarea anterior:** PULSO-UX-005 — Diseñar inicio para operador integral
**Tarea siguiente:** PULSO-UX-007 — Simplificar creación de venta
**Tipo de tarea:** diseño documental integral del inicio PULSO para supervisión, reconciliando el rol base `supervisor`, el carril operativo `gerencia_operativa`, `VSCREEN-0080 — Inicio POS`, `VSCREEN-0093 — Revisión de ventas, caja y terminales`, `GAP-PULSO-015`, el catálogo de autorización 1.0.0 y el runtime actual, para definir carga, alertas, prioridades, historial, excepciones y escalamiento sin convertir supervisión en ejecución ordinaria, sin asumir permisos no publicados y sin materialización física; `DEFINE_ONCE` / `NO_PHYSICAL_INSTANCE`
**Bloque:** BLOQUE N — PULSO
**Repositorio propietario:** `vento-group-sas/vento-shell`
**Archivo propietario:** `docs/plan-canonico/modular/bloques/N_PULSO/02_EXPERIENCIA_POS_Y_OPERACION_COMERCIAL.md`
**Estado físico resultante:** `NO_PHYSICAL_INSTANCE`
**Cambios físicos autorizados:** ninguno; esta tarea no modifica código, rutas, pantallas, permisos, catálogo, matrices, RLS, RPC, Server Actions, tablas, datos, Supabase, migraciones, packages, dispositivos, secretos ni despliegues
**Requisitos de prueba creados o modificados:** 0

---

#### 1. Propósito

Diseñar de forma cerrada el inicio de PULSO para una persona que supervisa la operación comercial de una sede, de manera que pueda comprender carga, bloqueos, excepciones, envejecimiento, historial y estado de cajas o terminales dentro de autoridad explícita, sin recibir por la interfaz una capacidad que el catálogo de autorización no haya concedido.

La tarea debe resolver simultáneamente:

```text
QUE NECESITA OBSERVAR EL SUPERVISOR
+
QUE PUEDE VER SEGUN AUTORIZACION
+
QUE DEBE ESCALAR
+
QUE NO PUEDE EJECUTAR
+
COMO SE DISTINGUE FALTA DE DATOS DE FALTA DE PERMISO
```

El resultado no es un dashboard genérico. Es una composición gobernada de trabajo supervisor PULSO.

---

#### 2. Handoff recibido de PULSO-UX-005

`PULSO-UX-005` entrega a esta tarea:

```text
VSCREEN-0080 SIGUE SIENDO IDENTIDAD COMPARTIDA DE INICIO POS
OPERADOR INTEGRAL NO ES SUPERUSUARIO
CAPACIDAD ORDINARIA DIRECTA != COMPONENTE SENSIBLE DE DOBLE CARRIL
SUPERVISOR NO RECIBE POR MATRIZ LOS COMPONENTES BASE PULSO DE AUTH-CAT-023
SUPERVISION != EJECUCION ORDINARIA DE CAJA
VISIBILIDAD DE EXCEPCIONES != PERMISO DE MUTAR
REALTIME != AUTORIDAD
PULSO.POS.MAIN NO PUEDE SER FALLBACK
```

La tarea anterior exige que 006 se concentre en carga, excepciones, bloqueos y decisiones gobernadas.

---

#### 3. Naturaleza y topología

La topología aplicable es:

```text
mode = DEFINE_ONCE
execution_gate = NO_PHYSICAL_INSTANCE
```

Consecuencias:

- la experiencia se define una sola vez;
- no crea una instancia física propia;
- no modifica el runtime PULSO;
- no publica nuevas PermissionKeys;
- no asigna grants;
- no cambia `active-sequence.json` manualmente;
- no ejecuta acciones comerciales reales;
- no modifica Supabase;
- no autoriza implementación física.

---

#### 4. Fuentes de autoridad reconciliadas

La decisión consume, como mínimo:

- `PULSO-UX-001` a `PULSO-UX-005`;
- `PULSO-AUTH-006` a `PULSO-AUTH-016`;
- `AUTH-RBAC-004 — Crear matriz de supervisor`;
- `AUTH-RBAC-019 — Crear matriz de gerencia_operativa`;
- `AUTH-CAT-020` a `AUTH-CAT-024`;
- datasets canónicos `base-role-grants@1.0.0` y `operational-role-grants@1.0.0`;
- catálogo y bindings de `VSCREEN-*`;
- catálogo de procesos y estados `VPROC-*`;
- `GAP-PULSO-015`;
- Registro 04A vigente de AUTH, PULSO y UX;
- código actual de `vento-pulso` como evidencia AS-IS.

Las decisiones posteriores de AUTH-CAT prevalecen sobre propuestas históricas no publicadas del catálogo.

---

#### 5. Reconciliación de PULSO-AUTH-007

`PULSO-AUTH-007` definió documentalmente un conjunto objetivo de lecturas y coordinaciones supervisoras, incluyendo nombres propuestos para pedidos, caja, pagos, salón, llamados, conversaciones, facturación visible, delivery e importaciones.

Posteriormente, `AUTH-CAT-021` clasificó:

```text
GAP-PULSO-015
=
NEEDS_FUNCTIONAL_ROADMAP
DESTINO = PULSO-AUTH-007 + PULSO-UX-006
```

Y el catálogo `vento.authorization@1.0.0` no publicó aquellas once claves históricamente propuestas.

Por tanto:

```text
PROPUESTA HISTORICA DE PULSO-AUTH-007
!=
PERMISSIONKEY CANONICA VIGENTE
```

Esta tarea madura el contrato funcional. No reactiva nombres de permisos por inferencia.

---

#### 6. Identidades que deben permanecer separadas

La palabra “supervisor” aparece en planos distintos:

```text
ROL BASE
supervisor

ROL OPERATIVO DE COORDINACION
gerencia_operativa

FUNCION DE PROCESO
SUPERVISOR / REVIEWER

EXPERIENCIA UX
inicio PULSO orientado a supervisión
```

Ninguno de esos conceptos autoriza automáticamente a los demás.

---

#### 7. Estado vigente del rol base supervisor

El dataset canónico `base-role-grants@1.0.0` contiene:

```text
SUPERVISOR_BASE_GRANTS_TOTAL = 58
SUPERVISOR_BASE_PULSO_GRANTS = 0
```

Por tanto:

```text
ROL BASE supervisor
!=
pulso.access
```

Una persona que sea únicamente `supervisor` no obtiene PULSO por su rol base.

---

#### 8. Estado vigente de gerencia_operativa en PULSO

El dataset `operational-role-grants@1.0.0` contiene siete grants PULSO para `gerencia_operativa`:

- `pulso.access` como concesión operativa directa;
- componente operativo de `pulso.delivery.deliveries.override`;
- componente operativo de `pulso.payments.transactions.refund`;
- componente operativo de `pulso.payments.transactions.reverse`;
- componente operativo de `pulso.sales.discounts.apply`;
- componente operativo de `pulso.sales.orders.cancel`;
- componente operativo de `pulso.sales.returns.create`.

No recibe por matriz:

```text
pulso.sales.orders.create
pulso.payments.transactions.collect
pulso.cash.sessions.start
pulso.cash.sessions.close
```

---

#### 9. El supervisor tampoco completa acciones sensibles por defecto

`AUTH-CAT-023` excluye expresamente al rol base `supervisor` de los componentes base de las cinco capacidades PULSO `BASE_AND_OPERATIONAL` creadas en el diff contractual.

Así:

```text
supervisor base
+
gerencia_operativa
!=
autorizacion final para cancel / return / refund / reverse / discount
```

La UI no mostrará esas acciones como disponibles por jerarquía.

---

#### 10. Condición de existencia del inicio supervisor PULSO

La experiencia PULSO de supervisión existe únicamente cuando el actor efectivo tiene una vía válida para entrar a PULSO.

Contrato mínimo:

```text
ACTOR HUMANO IDENTIFICADO
+
CONTEXTO OPERATIVO VALIDO
+
PERMISO pulso.access RESUELTO POR EL CARRIL CORRESPONDIENTE
+
SEDE / AREA EFECTIVAS
+
DISPOSITIVO COMPATIBLE CUANDO APLIQUE
+
AUSENCIA DE DENY
=
PUEDE ABRIR EL INICIO PULSO
```

El rol base `supervisor` por sí solo no satisface esa ecuación.

---

#### 11. Regla ante supervisor base sin acceso operativo PULSO

Si la persona posee rol base `supervisor`, pero no tiene una concesión operativa válida de `pulso.access`:

- SHELL no debe presentar PULSO como aplicación operable por inferencia;
- una URL directa debe fallar cerrado;
- no se renderiza información operacional PULSO;
- no se usa `pulso.pos.main` como fallback;
- la salida correcta es una explicación de acceso/contexto, no un home vacío con datos ocultos.

---

#### 12. Identidad canónica de inicio

Se conserva:

```text
VSCREEN-0080 — Inicio POS
```

No se crea un segundo “Inicio Supervisor PULSO”.

`VSCREEN-0080` adapta su composición al actor y capacidades efectivas.

---

#### 13. Workspace primario de supervisión

La pantalla especializada principal para supervisión es:

```text
VSCREEN-0093 — Revisión de ventas, caja y terminales
```

Binding canónico:

```text
PROCESO PRINCIPAL = VPROC-0044
PROCESOS RELACIONADOS = VPROC-0043, VPROC-0061
PASO = VPROC-0044::STEP-REVIEW_SALES_AND_TERMINALS
INTERACCION = REVIEW
FASE = CROSS_CUTTING
```

Su identidad es revisar. No ejecutar caja ordinaria.

---

#### 14. Relación entre VSCREEN-0080 y VSCREEN-0093

La navegación objetivo es:

```text
VSCREEN-0080
→ resume contexto y trabajo supervisor
→ prioriza anomalías / carga / pendientes
→ abre VSCREEN-0093 para revisión profunda
```

Nunca:

```text
VSCREEN-0093
→ se convierte en una ruta privilegiada que omite autorización
```

---

#### 15. Principio de composición del home

El inicio supervisor responde primero:

1. ¿qué sede y contexto estoy supervisando?;
2. ¿qué requiere atención ahora?;
3. ¿qué está bloqueado o envejeciendo?;
4. ¿qué diferencia necesita revisión?;
5. ¿qué sistema o actor debe continuar?;
6. ¿qué puedo observar?;
7. ¿qué puedo ejecutar realmente?;

La prioridad es **triage y coordinación**, no volumen de widgets.

---

#### 16. Contrato funcional de GAP-PULSO-015

`GAP-PULSO-015` se descompone funcionalmente en cinco proyecciones distintas:

```text
A. CARGA OPERATIVA ACTUAL
B. ALERTAS Y ENVEJECIMIENTO
C. PRIORIDAD / TRIAGE
D. HISTORIAL OPERATIVO
E. REVISION COMERCIAL, CAJA Y TERMINALES
```

Estas proyecciones no se fusionan en un único permiso broad.

---

#### 17. Proyección A — carga operativa actual

Debe permitir entender, dentro del territorio autorizado:

- cantidad de compromisos activos;
- distribución por canal o modalidad cuando corresponda;
- etapa actual de preparación/cumplimiento;
- trabajo pendiente de handoff;
- trabajo pendiente de cobro o conciliación cuando la proyección autorizada lo permita;
- llamados o incidencias abiertas cuando exista contrato de lectura;
- sesiones de caja abiertas o en cierre cuando exista contrato de lectura.

No autoriza mutaciones.

---

#### 18. La carga no puede inventar semántica de estado

Los contadores deben provenir de estados canónicos o de un mapeo aprobado.

Queda prohibido:

```text
NOMBRE AS-IS DEL RUNTIME
→ elevarlo automáticamente a estado canónico
```

La reconciliación detallada de estados continúa en las tareas PULSO propietarias.

---

#### 19. Proyección B — alertas y envejecimiento

El home puede mostrar que un caso requiere atención por:

- espera prolongada;
- falta de responsable;
- conflicto o concurrencia;
- estado de pago ambiguo;
- fallo de canal;
- falta de confirmación;
- sesión/cierre pendiente;
- terminal o dispositivo con estado problemático;
- evento esperado no observado.

La alerta no concede autoridad para resolver.

---

#### 20. Umbrales de alerta

Esta tarea no inventa minutos, porcentajes ni SLA.

Regla:

```text
UMBRAL PUBLICADO Y VIGENTE
→ puede clasificar alerta

SIN UMBRAL CANONICO
→ mostrar edad / estado observado
→ no afirmar incumplimiento
```

---

#### 21. Proyección C — prioridad y triage

La prioridad de atención puede considerar:

- riesgo de pérdida de venta;
- cliente esperando;
- pedido bloqueado;
- pago no reconciliado;
- riesgo de duplicidad;
- pedido listo sin handoff;
- dependencia externa fallida;
- cierre de caja pendiente;
- diferencia que requiere otro responsable.

La prioridad debe explicar su razón y no convertirse en un score opaco.

---

#### 22. Prioridad no equivale a autoridad

Se conserva:

```text
ALTA PRIORIDAD
!=
PERMISO PARA EJECUTAR
```

Un caso crítico puede exigir escalamiento a un actor con otra función o permiso.

---

#### 23. Proyección D — historial operativo

El supervisor necesita reconstruir qué ocurrió sin abrir un log técnico crudo.

La historia funcional debe conservar, según autorización:

- evento o transición;
- actor efectivo;
- timestamp de servidor;
- estado anterior y posterior cuando aplique;
- motivo o referencia;
- correlación con pedido, pago, caja, entrega o llamado;
- resultado confirmado, rechazado, pendiente o desconocido.

---

#### 24. Historial operativo no es auditoría global

```text
TIMELINE DEL RECURSO
!=
AUDIT LOG DE TODA LA PLATAFORMA
```

La vista supervisora debe limitarse al caso y territorio necesarios.

---

#### 25. Proyección E — revisión comercial, caja y terminales

`VSCREEN-0093` concentra la revisión de:

- ventas y pedidos relevantes;
- estado de cobros cuando exista proyección autorizada;
- sesiones de caja y cierres cuando exista proyección autorizada;
- diferencias y bloqueos;
- estado de terminales o estaciones;
- incidencias que afectan continuidad operativa.

No convierte revisión en ejecución.

---

#### 26. Ventas y pedidos en supervisión

La proyección supervisora de pedidos debe permitir responder:

- qué está abierto;
- qué está atrasado o bloqueado;
- qué espera preparación;
- qué espera handoff;
- qué espera pago;
- qué cambió recientemente;
- quién tiene la responsabilidad operativa actual cuando el contrato lo exponga.

No debe mostrar botones de transición por mera visibilidad.

---

#### 27. Caja en supervisión

La revisión de caja distingue:

```text
VER SESION
VER ESTADO DE CIERRE
VER DIFERENCIA
REVISAR EVIDENCIA
```

frente a:

```text
ABRIR
COBRAR
CERRAR
APROBAR DIFERENCIA
CORREGIR
```

La segunda familia requiere capacidades distintas.

---

#### 28. Terminales y estaciones

La supervisión puede necesitar conocer:

- terminal activa/inactiva;
- estación o dispositivo relacionado;
- última señal operativa cuando exista contrato;
- bloqueo o capacidad indisponible;
- contexto de sede/área;
- actor actual únicamente cuando sea necesario y autorizado.

No debe exponer secretos, tokens ni configuración sensible.

---

#### 29. Estado de salud no concede control del dispositivo

```text
VER TERMINAL
!=
ADMINISTRAR TERMINAL
```

Activación, configuración, revocación, paquetes y políticas de dispositivo conservan sus propietarios.

---

#### 30. Excepciones visibles

El home supervisor puede agrupar excepciones por intención:

- “requiere atención del cajero”;
- “requiere atención de salón”;
- “requiere preparación”;
- “requiere coordinación de entrega”;
- “requiere revisión de pago”;
- “requiere revisión de caja”;
- “requiere soporte técnico”;
- “requiere autoridad superior”.

No debe agruparlas bajo un botón genérico “Resolver”.

---

#### 31. Escalamiento como acción UX

Cuando el supervisor no posee la capacidad resolutiva, la UI puede ofrecer una salida de escalamiento si el contrato correspondiente existe.

El escalamiento debe preservar:

- recurso;
- motivo;
- actor que escala;
- destino funcional;
- estado;
- timestamp;
- correlación.

Esta tarea no crea el mecanismo técnico de escalamiento.

---

#### 32. Diferencia entre observar, asignar, escalar y decidir

```text
OBSERVAR
!=
ASIGNAR
!=
ESCALAR
!=
APROBAR
!=
EJECUTAR
```

La interfaz debe usar verbos compatibles con la autoridad real.

---

#### 33. Supervisión de salón

El supervisor puede requerir visibilidad de:

- mesas/sesiones abiertas;
- llamados activos;
- llamados sin responsable;
- acumulación de espera;
- pedidos ligados a servicio.

La administración de mesas y transiciones de llamados sigue el contrato de salón y no nace de esta pantalla.

---

#### 34. Supervisión de mostrador y entrega

Puede requerir visibilidad de:

- pedidos listos;
- handoffs pendientes;
- pedidos externos en espera;
- asignaciones de entrega;
- incidencias de canal;
- pedidos detenidos entre preparación y entrega.

No convierte al supervisor en mostrador, conductor o receptor.

---

#### 35. Supervisión de pagos

La UI debe distinguir:

```text
PAGO PENDIENTE
PAGO EN PROCESO
PAGO CONFIRMADO
PAGO RECHAZADO
PAGO DE RESULTADO DESCONOCIDO
```

cuando esos estados existan en el contrato propietario.

Nunca:

```text
TIMEOUT
→ PAGO FALLIDO
```

---

#### 36. Supervisión de diferencias de caja

Una diferencia puede ser visible para triage sin que el supervisor tenga capacidad de aprobarla o corregirla.

La UI debe mostrar, según autorización:

- existencia de diferencia;
- magnitud o clasificación permitida;
- estado de revisión;
- responsable actual;
- evidencia disponible;
- siguiente función competente.

---

#### 37. Supervisor no es gerente autorizado por inferencia

El nombre del rol no permite completar acciones sensibles.

En particular:

```text
supervisor
!=
gerente
!=
gerente_general
!=
propietario
```

Las matrices permanecen independientes.

---

#### 38. Supervisor + gerencia_operativa tampoco hereda caja

Aunque una persona tenga:

```text
ROL BASE = supervisor
ROL OPERATIVO = gerencia_operativa
```

no recibe por matriz:

- crear venta;
- cobrar;
- abrir caja;
- cerrar caja.

La interfaz no mostrará esas capacidades como ordinarias.

---

#### 39. Supervisor + gerencia_operativa tampoco completa doble carril sensible

El componente operativo de `gerencia_operativa` no basta para:

- cancelar venta;
- registrar devolución;
- reverse de pago;
- refund;
- aplicar descuento;
- override excepcional de entrega.

El rol base `supervisor` no aporta el componente base por defecto.

---

#### 40. Cobertura del territorio

El home se limita al contexto operativo efectivo.

```text
TERRITORIO VISIBLE
=
INTERSECCION(
  permiso,
  carril,
  sede,
  area,
  recurso,
  dispositivo,
  deny
)
```

La cobertura administrativa multisede no crea una vista operacional global automática.

---

#### 41. Cambio de sede

Cambiar sede en la interfaz es una solicitud de contexto.

No es autoridad.

La nueva sede debe resolverse de nuevo contra:

- asignaciones;
- carril operativo;
- turno/check-in cuando aplique;
- permisos;
- recurso;
- dispositivo;
- denegaciones.

---

#### 42. Filtros y query parameters

Filtros por estado, canal, modalidad, severidad o fecha:

- reducen o reorganizan una proyección ya autorizada;
- no crean acceso;
- no cambian territorio;
- no convierten una vista en otra pantalla canónica.

---

#### 43. Realtime

Realtime puede actualizar contadores, tarjetas y timelines, pero:

```text
EVENTO RECIBIDO
!=
PERMISO
```

Antes de renderizar un recurso nuevo o cambiado debe preservarse la misma frontera territorial y contractual de la consulta inicial.

---

#### 44. Frescura

Toda proyección supervisora debe poder distinguir:

- dato vigente;
- dato potencialmente stale;
- sincronización en curso;
- fallo de actualización;
- resultado desconocido.

La UI no debe presentar un snapshot stale como estado actual confirmado.

---

#### 45. Offline y degradación

La supervisión offline o degradada no puede aceptar decisiones sensibles basadas en datos que no puedan reconciliarse.

Puede conservar:

- snapshot marcado;
- edad de datos;
- filtros locales;
- navegación a evidencia ya obtenida.

No debe fabricar confirmaciones ni mutaciones pendientes fuera de un contrato de reincorporación aprobado.

---

#### 46. Privacidad y minimización

La vista supervisora debe mostrar únicamente campos necesarios para coordinación.

No justifica por sí sola acceso completo a:

- datos personales del cliente;
- datos financieros sensibles;
- documentos fiscales completos;
- credenciales;
- tokens;
- datos de otras sedes;
- conversaciones ajenas al caso.

---

#### 47. Orden visual objetivo

El inicio supervisor se organiza en este orden:

```text
1. CONTEXTO EFECTIVO
2. EXCEPCIONES QUE REQUIEREN ATENCION
3. CARGA OPERATIVA
4. CAJA / PAGOS / TERMINALES SEGUN CAPACIDAD
5. HISTORIAL RECIENTE RELEVANTE
6. HANDOFFS Y ESCALAMIENTOS
7. ACCESOS SECUNDARIOS AUTORIZADOS
```

No empieza por un menú de módulos.

---

#### 48. Acción principal

La acción dominante del inicio supervisor es:

```text
REVISAR OPERACION
→ VSCREEN-0093
```

Solo se habilita cuando existen las capacidades de lectura necesarias.

Si aún no existen, el home debe mostrar contexto y bloqueo explícito, no datos protegidos ni un fallback broad.

---

#### 49. Acciones secundarias

Pueden existir enlaces a:

- pedidos;
- salón;
- seguimiento de preparación/entrega;
- caja;
- casos o incidencias;

únicamente si la navegación y la lectura de destino están autorizadas.

El enlace no concede la capacidad interna.

---

#### 50. Estados vacíos

Se distinguen al menos:

```text
SIN TRABAJO
SIN PERMISO
FUERA DE TERRITORIO
CONTEXTO INCOMPLETO
STALE
FALLO TECNICO
RESULTADO DESCONOCIDO
```

No deben colapsar en “No hay datos”.

---

#### 51. AS-IS de vento-pulso

El runtime vigente observado mantiene:

- `/` montando `ScannerPage`;
- `/orders` usando `requireAppAccess` con `permissionCode: ["pos.main"]`;
- acciones distintas de pedidos detrás del mismo permiso broad;
- `site_id` entrando como parámetro de contexto;
- resolución operativa que todavía usa roles/navegación legacy;
- ausencia de una ruta o implementación física de `VSCREEN-0093` como workspace supervisor completo.

Ese estado es evidencia de deuda, no el diseño objetivo.

---

#### 52. Brechas AS-IS y salida

| Brecha | Riesgo | Propietario canónico | Condición de salida |
| --- | --- | --- | --- |
| `VSCREEN-0093` no materializada como workspace supervisor | no existe revisión PULSO objetivo | paquete PULSO correspondiente | pantalla consume contrato funcional y permisos atómicos publicados |
| `/orders` usa `pos.main` | lectura y mutación comparten autoridad broad | `PULSO-AUTH-015/016` + paquete PULSO | cero fallback final a `pos.main` |
| no existen PermissionKeys publicadas para GAP-PULSO-015 | home no puede leer datos internos por `pulso.access` | evolución de catálogo AUTH tras roadmap funcional | claves atómicas versionadas, asignadas y probadas |
| rol base supervisor tiene 0 grants PULSO | jerarquía no debe abrir la aplicación | AUTH/RBAC vigente | se conserva deny por defecto salvo otro carril válido |
| `gerencia_operativa` tiene `pulso.access` pero no lecturas supervisoras | entrada no equivale a supervisión | evolución de catálogo + matrices | permisos de lectura/coordinación publicados |
| Realtime puede mezclar señal y autoridad | datos no autorizados podrían llegar a UI | paquete PULSO + políticas de datos | filtros y RLS demuestran mismo territorio que consulta |
| estados AS-IS no son canon automático | alertas/contadores podrían mentir | `PULSO-UX-020/021` | mapeo contractual aprobado |

No queda hallazgo de esta tarea sin propietario y condición de salida.

---

#### 53. Resultado funcional de GAP-PULSO-015

Después de esta tarea, `GAP-PULSO-015` queda funcionalmente descompuesto en:

1. lectura de carga de pedidos/servicio;
2. lectura de estado de caja;
3. lectura de estado de pagos necesaria para coordinación;
4. lectura de terminales/estaciones;
5. lectura de historial operativo por recurso;
6. alertas derivadas de estados y políticas publicadas;
7. prioridad explicable de triage;
8. navegación a detalle autorizado;
9. escalamiento sin absorción de la acción resolutiva.

La posterior evolución de catálogo deberá decidir PermissionKeys exactas para estas capacidades. Esta tarea no les asigna nombres canónicos.

---

#### 54. Frontera frente a GAP-PULSO-016

Esta tarea puede **mostrar** incidencias y excepciones, pero no define su resolución completa.

`GAP-PULSO-016` conserva:

- pedidos no reclamados;
- entregas parciales;
- incidencias;
- canales fallidos;
- resolución sin override genérico.

Sus owners funcionales siguen en `PULSO-UX-009`, `PULSO-UX-013` y el flujo de entrega.

---

#### 55. Handoff inmediato a PULSO-UX-007

`PULSO-UX-007 — Simplificar creación de venta` recibe:

```text
VSCREEN-0080 CONSERVA IDENTIDAD COMPARTIDA
SUPERVISOR NO CREA VENTAS POR SU ROL
CREAR VENTA REQUIERE pulso.sales.orders.create
GERENCIA_OPERATIVA NO RECIBE orders.create POR MATRIZ
SUPERVISOR BASE NO RECIBE PULSO POR MATRIZ
HOME PUEDE MOSTRAR INTENCION SOLO SI EXISTE AUTORIDAD DE DESTINO
NAVEGACION != PERMISO
PRIORIDAD != AUTORIDAD
```

La 007 deberá simplificar creación sin convertir visibilidad o contexto supervisor en capacidad de venta.

---

#### 56. Handoff al resto de PULSO-UX

| Tarea | Entrada exacta proveniente de PULSO-UX-006 |
| --- | --- |
| `PULSO-UX-007` | creación de venta exige capacidad exacta y no nace de supervisión |
| `PULSO-UX-008` | cobro permanece separado de revisión de pagos |
| `PULSO-UX-009` | excepciones visibles no equivalen a cancelación, devolución o refund |
| `PULSO-UX-010` | revisión de caja no equivale a abrir/cerrar/aprobar diferencias |
| `PULSO-UX-013` | escalamiento y confirmación sensible conservan actor, motivo, recurso y autoridad |
| `PULSO-UX-015` | densidad supervisor prioriza triage, carga y excepciones |
| `PULSO-UX-020` | estados AS-IS no alimentan alertas canónicas sin mapeo aprobado |
| `PULSO-UX-021` | arquitectura objetivo debe separar proyecciones read-only de acciones mutadoras |

---

#### 57. Requisitos de prueba derivados

**Resultado:** NO GENERA REQUISITOS DE PRUEBA.

**Requisitos creados:** 0
**Requisitos modificados:** 0
**Requisitos diferidos:** 0
**Requisitos obsoletos:** 0

Justificación: acceso fail-closed, permisos exactos, territorio, separación de mutaciones, estados diferenciados, frescura, Realtime, trazabilidad y experiencia por actor ya cuentan con obligaciones verificables vigentes. Esta tarea madura el roadmap funcional de supervisión sin introducir una obligación de prueba nueva en 04A.

---

#### 58. Cobertura de prueba vigente reutilizada

Se reutiliza sin modificación:

- `TREQ-PULSO-004` para mutaciones de pedidos mediante acciones nombradas y estado/columnas permitidos;
- `TREQ-PULSO-005` para separar pedido, preparación, cumplimiento, pago, mesa y venta;
- `TREQ-PULSO-006` para separar venta, pago, caja, anulaciones y cierres;
- `TREQ-PULSO-014` para acceso PULSO fail-closed;
- `TREQ-PULSO-015` para impedir que `site_id` amplíe territorio;
- `TREQ-PULSO-016` para impedir que `/orders` conceda mutaciones por mera apertura;
- `TREQ-PULSO-018` para separar lectura y acciones de salón;
- `TREQ-PULSO-019` para mantener filtros/query parameters fuera de la autoridad;
- `TREQ-PULSO-024` para no confundir infraestructura con autorización;
- `TREQ-PULSO-026` para no tratar `pulso.pos.main` como permiso exacto suficiente;
- `TREQ-AUTH-001` para autorización por permiso, contexto y alcance;
- `TREQ-AUTH-011` para separar dispositivo y actor humano;
- `TREQ-AUTH-013` para revalidación server-side;
- `TREQ-AUTH-015` para auditoría correlacionable;
- `TREQ-UX-001` para tarea, acción y estado identificables;
- `TREQ-UX-003` para adaptar densidad y acciones al actor efectivo;
- `TREQ-UX-006` para recuperación segura;
- `TREQ-UX-008` y `TREQ-UX-009` para navegación y contexto coherentes.

Esta enumeración es trazabilidad reutilizada y no modifica el Registro 04A.

---

#### 59. Evidencia de validación

| Clase | Estado | Evidencia |
| --- | --- | --- |
| BUILD | NOT_EXECUTED | El build documental corresponde al checkout después de incorporar el artefacto; esta tarea no materializa producto. |
| LOCAL | NOT_EXECUTED | Formato, quality, delivery, validadores de dominio y batería global quedan pendientes de la incorporación en el checkout local. |
| REMOTA | PASS | Se verificaron main vigente de `vento-shell`, continuidad, topología `DEFINE_ONCE`, `PULSO-AUTH-007`, `AUTH-RBAC-004`, reconciliación `AUTH-CAT-020..024`, datasets 1.0.0, `VSCREEN-0080/0093`, `VPROC-0044`, Registro 04A aplicable y runtime vigente de `vento-pulso`. |
| OPERATIVA | NOT_EXECUTED | No se supervisaron ventas, cajas, terminales, pedidos, pagos, mesas, llamadas ni entregas reales. |
| FÍSICA | NOT_APPLICABLE | `PULSO-UX-006` no crea instancia física propia ni autoriza cambios de producto, datos o infraestructura. |

---

#### 60. Criterios de aceptación

La tarea queda documentalmente completa cuando:

- [ ] `VSCREEN-0080` se conserva como identidad compartida del inicio POS;
- [ ] no se crea un home canónico paralelo para supervisor;
- [ ] `VSCREEN-0093` queda como workspace principal de revisión supervisora;
- [ ] se distingue rol base `supervisor` de rol operativo `gerencia_operativa`;
- [ ] se registra que supervisor posee 58 grants base y 0 grants PULSO en dataset 1.0.0;
- [ ] se registra que `gerencia_operativa` posee siete grants PULSO vigentes;
- [ ] se registra que `gerencia_operativa` no recibe `orders.create`, `collect`, `cash.start` ni `cash.close` por matriz;
- [ ] se registra que supervisor no aporta componentes base de las cinco acciones PULSO sensibles de AUTH-CAT-023;
- [ ] el rol base supervisor no abre PULSO por sí solo;
- [ ] URL directa falla cerrado sin acceso PULSO válido;
- [ ] `pulso.access` no concede lectura interna;
- [ ] `pulso.pos.main` no se usa como fallback;
- [ ] `GAP-PULSO-015` queda descompuesto funcionalmente;
- [ ] carga, alertas, prioridad, historial y revisión se mantienen como proyecciones distintas;
- [ ] no se inventan SLA ni umbrales;
- [ ] prioridad explica razón y no concede autoridad;
- [ ] historial funcional no se convierte en audit log global;
- [ ] revisión de caja no concede abrir/cerrar/aprobar diferencia;
- [ ] revisión de pagos no concede collect/reverse/refund;
- [ ] revisión de pedidos no concede create/update/cancel;
- [ ] revisión de terminal no concede administración de dispositivo;
- [ ] excepciones no usan un botón genérico de resolución;
- [ ] observar, asignar, escalar, aprobar y ejecutar permanecen distintos;
- [ ] supervisor no se convierte en mostrador, cajero, salón, conductor u operador integral;
- [ ] cobertura multisede base no crea vista operacional global;
- [ ] filtros no amplían territorio;
- [ ] Realtime no concede autoridad;
- [ ] stale, fallo y unknown permanecen distintos;
- [ ] privacidad aplica minimización por recurso;
- [ ] el runtime AS-IS se documenta como deuda y no como canon objetivo;
- [ ] cada brecha tiene propietario y condición de salida;
- [ ] 007 recibe handoff suficiente sin heredar autoridad supervisora;
- [ ] no se crean ni modifican requisitos de prueba;
- [ ] no se ejecutan cambios físicos.

---

#### 61. Límites

Esta tarea no:

- implementa `VSCREEN-0080`;
- implementa `VSCREEN-0093`;
- crea rutas nuevas;
- modifica `/orders`, `/salon`, `/scanner` o `/`;
- crea PermissionKeys;
- reactiva automáticamente los nombres propuestos en `PULSO-AUTH-007`;
- modifica el catálogo 1.0.0;
- modifica matrices base u operativas;
- concede `pulso.access` al rol base supervisor;
- concede creación de venta, cobro, apertura o cierre de caja a `gerencia_operativa`;
- concede acciones sensibles por jerarquía;
- crea SLAs;
- crea scores opacos;
- ejecuta cancelaciones, devoluciones, refunds, reversos o descuentos;
- ejecuta override de entrega;
- configura terminales;
- modifica dispositivos compartidos;
- cambia RLS, RPC, Server Actions o Realtime;
- modifica Supabase;
- modifica el Registro 04A;
- crea instancia física;
- desarrolla `PULSO-UX-007`.

---

#### 62. Decisión final de experiencia

El inicio supervisor queda resumido por la siguiente regla:

```text
SIN pulso.access VALIDO
→ NO HAY HOME PULSO

CON pulso.access VALIDO
→ VSCREEN-0080 RESUELVE CONTEXTO
→ NO EXPONE DATOS INTERNOS SIN CAPACIDAD DE LECTURA
→ PRIORIZA EXCEPCIONES, CARGA Y BLOQUEOS AUTORIZADOS
→ VSCREEN-0093 ES WORKSPACE DE REVISION
→ CADA ACCION MUTADORA EXIGE AUTORIDAD PROPIA
```

La supervisión aporta comprensión y coordinación. No absorbe ejecución.

---

#### 63. Continuidad

**ÚLTIMA TAREA APROBADA**
`PULSO-UX-005 — Diseñar inicio para operador integral`

**TAREA ACTUAL APROBADA**
`PULSO-UX-006 — Diseñar inicio para supervisor`

**SIGUIENTE TAREA RESERVADA**
`PULSO-UX-007 — Simplificar creación de venta`
### ✅ PULSO-UX-007 — Simplificar creación de venta

**Estado:** APROBADA
**Tarea anterior:** PULSO-UX-006 — Diseñar inicio para supervisor
**Tarea siguiente:** PULSO-UX-008 — Simplificar cobro y medios de pago
**Tipo de tarea:** diseño documental integral de `VSCREEN-0081 — Creación de venta o pedido` para reducir la creación ordinaria de una venta PULSO a contexto pre-resuelto, selección mínima de oferta y una única creación autoritativa, atómica e idempotente mediante `pulso.sales.orders.create`, separando borrador de interfaz, pedido persistido, cobro, descuentos, cancelación, modificación posterior, fidelización y efectos interaplicación; sin inventar permisos no publicados, sin crear pedidos vacíos y sin materialización física; `DEFINE_ONCE` / `NO_PHYSICAL_INSTANCE`
**Bloque:** BLOQUE N — PULSO
**Repositorio propietario:** `vento-group-sas/vento-shell`
**Archivo propietario:** `docs/plan-canonico/modular/bloques/N_PULSO/02_EXPERIENCIA_POS_Y_OPERACION_COMERCIAL.md`
**Estado físico resultante:** `NO_PHYSICAL_INSTANCE`
**Cambios físicos autorizados:** ninguno; esta tarea no modifica código, rutas, pantallas, contratos generados, permisos, matrices, RLS, RPC, Server Actions, tablas, datos, Supabase, migraciones, packages, dispositivos, secretos ni despliegues
**Requisitos de prueba creados o modificados:** 0

---

#### 1. Propósito

Simplificar la creación ordinaria de una venta o pedido PULSO para que el actor autorizado pueda pasar de intención de compra a compromiso comercial persistido con la menor carga operativa compatible con contexto, oferta, autorización, trazabilidad e integridad.

La experiencia debe resolver:

```text
CONTEXTO YA RESUELTO
+
OFERTA VENDIBLE VIGENTE
+
SELECCION MINIMA DEL CLIENTE
+
UNA CONFIRMACION DE CREACION
=
VENTA / PEDIDO AUTORITATIVO
```

sin convertir esa creación en cobro, cancelación, descuento, actualización genérica, loyalty, inventario o cierre de caja.

---

#### 2. Handoff recibido de PULSO-UX-006

`PULSO-UX-006` entrega:

```text
VSCREEN-0080 CONSERVA IDENTIDAD COMPARTIDA
SUPERVISOR NO CREA VENTAS POR SU ROL
CREAR VENTA REQUIERE pulso.sales.orders.create
GERENCIA_OPERATIVA NO RECIBE orders.create POR MATRIZ
SUPERVISOR BASE NO RECIBE PULSO POR MATRIZ
HOME PUEDE MOSTRAR INTENCION SOLO SI EXISTE AUTORIDAD DE DESTINO
NAVEGACION != PERMISO
PRIORIDAD != AUTORIDAD
```

Por tanto, esta tarea diseña la creación únicamente para actores que posean realmente `pulso.sales.orders.create` en su contexto efectivo.

---

#### 3. Naturaleza y topología

La topología aplicable es:

```text
mode = DEFINE_ONCE
execution_gate = NO_PHYSICAL_INSTANCE
```

Consecuencias:

- la experiencia se define una sola vez;
- no crea instancia física propia;
- no materializa `VSCREEN-0081`;
- no publica rutas ni componentes;
- no crea ni modifica PermissionKeys;
- no modifica datasets de autorización;
- no ejecuta ventas reales;
- no modifica Supabase;
- no autoriza implementación física.

---

#### 4. Fuentes de autoridad reconciliadas

La decisión consume como mínimo:

- `PULSO-UX-001..006`;
- `PULSO-AUTH-006..016`;
- `AUTH-CAT-022..024`;
- dataset `operational-role-grants@1.0.0`;
- `VSCREEN-0080`, `VSCREEN-0081`, `VSCREEN-0083` y `VSCREEN-0084`;
- `VPROC-0038`, `VPROC-0039`, `VPROC-0040`, `VPROC-0041`, `VPROC-0043` y sus bindings aprobados;
- estados canónicos de `VPROC-0039`;
- matriz E2 de prototipos, estaciones y gramática de interacción;
- Registro 04A vigente de PULSO y cobertura UX heredada;
- runtime actual de `vento-pulso` como evidencia AS-IS, no como autoridad del diseño objetivo.

---

#### 5. Identidad canónica de la pantalla

La identidad existente es:

```text
VSCREEN-0081 — Creación de venta o pedido
```

Su declaración canónica es construir una venta o pedido con:

- productos;
- cantidades;
- modificadores;
- canal;
- responsable.

Esta tarea no crea otra pantalla para “venta rápida”, “pedido rápido” o “nueva venta”.

---

#### 6. Binding principal de proceso

`VSCREEN-0081` conserva:

```text
PROCESO PRINCIPAL: VPROC-0039
PASO: VPROC-0039::STEP-CREATE_SALE_OR_ORDER
FUNCION: INITIATE
FASE: INITIAL
```

La creación ordinaria de mostrador o para llevar es el caso base de esta tarea.

---

#### 7. Bindings secundarios

`VSCREEN-0081` también aparece relacionado con:

- `VPROC-0038` — servicio en mesa;
- `VPROC-0040` — pedidos de canales externos;
- `VPROC-0041` — catering/B2B.

La reutilización de la pantalla no fusiona los procesos.

Regla:

```text
MISMA SUPERFICIE
!=
MISMO CONTRATO DE INICIO
```

Esta tarea define la creación ordinaria PULSO y permite reutilizar primitives de selección, pero no sustituye los contratos de mesa, canal externo o B2B.

---

#### 8. PermissionKey exacta

La creación consume:

```text
pulso.sales.orders.create
```

`AUTH-CAT-022/023` define esa capacidad como:

- `OPERATIONAL_ONLY`;
- creación de una venta u orden inicial;
- limitada a sede, canal y reglas comerciales autorizadas;
- separada de cobro, descuento, cancelación, devolución, reembolso y cierre de caja.

---

#### 9. Actores con grant publicado

En `operational-role-grants@1.0.0`, `pulso.sales.orders.create` tiene exactamente dos grants:

```text
cajero_satelite
operador_integral_satelite
```

Ambos son:

```text
authorization_mode = OPERATIONAL_ONLY
grant_type = DIRECT_OPERATIONAL
```

No existe grant publicado de `orders.create` para:

- `servicio_salon`;
- `mostrador_satelite`;
- `gerencia_operativa`.

---

#### 10. Regla de autorización

La UI no decide autoridad por el nombre visible del puesto.

La entrada a creación requiere como mínimo:

```text
ACTOR HUMANO IDENTIFICADO
+
ROL OPERATIVO CON orders.create
+
TURNO PUBLICADO Y VIGENTE
+
CHECK-IN ACTIVO CUANDO APLIQUE
+
SEDE / AREA / PUNTO COMPATIBLES
+
CONTEXTO DE DISPOSITIVO VALIDO
+
AUSENCIA DE DENEGACION SUPERIOR
=
CREACION POSIBLE
```

La navegación desde `VSCREEN-0080` no reemplaza ninguna de estas condiciones.

---

#### 11. `pulso.access` no basta

Se conserva:

```text
pulso.access
!=
pulso.sales.orders.create
```

Entrar a PULSO no permite originar ventas.

La existencia de un botón, enlace o ruta tampoco concede la capacidad.

---

#### 12. `pulso.pos.main` no participa del diseño objetivo

`pulso.pos.main` continúa como permiso broad legacy en descomposición.

Queda prohibido:

```text
pos.main
→ asumir orders.create
```

La implementación futura deberá consumir `pulso.sales.orders.create` de forma exacta.

---

#### 13. Contexto heredado desde Inicio POS

`VSCREEN-0080` debe entregar a `VSCREEN-0081`, cuando ya esté resuelto:

- actor efectivo;
- sede efectiva;
- área o punto aplicable;
- rol operativo efectivo;
- contexto de dispositivo;
- canal o modalidad cuando la intención de origen ya lo determina;
- retorno seguro.

La pantalla de creación no vuelve a preguntar datos ya resueltos salvo que exista una elección empresarial real.

---

#### 14. Sede no se selecciona libremente dentro de la venta

El usuario no recibe un selector general de sedes dentro de `VSCREEN-0081`.

`site_id` es contexto autorizado y nunca una herramienta para ampliar territorio.

Si la sede efectiva no puede resolverse de forma segura:

```text
NO CREAR VENTA
```

---

#### 15. Área, punto y caja

El punto o área aplicable se deriva del contexto operativo y de la configuración física vigente.

La creación no permite inventar una estación o caja por nombre libre.

Cuando la política de la función requiera sesión de caja compatible y no exista una válida, el flujo debe volver al owner correspondiente de apertura; `VSCREEN-0081` no abre caja implícitamente.

---

#### 16. Canal y modalidad

La experiencia evita preguntar canal o modalidad cuando el origen ya los determina de forma inequívoca.

Si existen varias opciones autorizadas, muestra únicamente las aplicables al contexto actual.

Regla:

```text
CONTEXTO FIJA OPCION
→ NO PREGUNTAR OTRA VEZ

CONTEXTO PERMITE VARIAS
→ ELEGIR ENTRE OPCIONES AUTORIZADAS
```

Canal o modalidad no conceden permisos adicionales.

---

#### 17. No se crea pedido al abrir la pantalla

Abrir `VSCREEN-0081` no produce por sí mismo:

- pedido;
- venta;
- línea;
- reserva;
- efecto de inventario;
- efecto productivo;
- pago;
- loyalty;
- hecho económico.

Regla:

```text
OPEN SCREEN
!=
CREATE ORDER
```

Esto evita pedidos vacíos y abandono convertido en deuda empresarial.

---

#### 18. Borrador de interfaz

Antes de la creación autoritativa puede existir un borrador de interfaz con:

- selección de productos;
- cantidades;
- modificadores;
- contexto de canal/modalidad;
- cliente opcional cuando ya esté autorizado y disponible;
- observaciones permitidas por el contrato del pedido.

Ese borrador:

```text
NO ES VPROC STATE
NO ES PEDIDO
NO ES VENTA
NO TIENE EFECTOS EXTERNOS
```

---

#### 19. Borrador no autoritativo

Mientras la creación no haya sido confirmada por el sistema autoritativo:

- puede descartarse sin cancelar una venta inexistente;
- no genera una identidad empresarial definitiva;
- no puede activar preparación;
- no puede cobrar;
- no puede emitir eventos de venta confirmada;
- no puede afectar inventario o loyalty.

---

#### 20. Oferta vendible como fuente

La selección consume únicamente una oferta comercial publicada y aplicable a:

- sede;
- canal/modalidad;
- vigencia;
- disponibilidad contractual aplicable.

`VSCREEN-0081` no modifica:

- producto maestro;
- receta;
- precio maestro;
- catálogo físico;
- reglas de oferta.

---

#### 21. Producto y snapshot comercial

La creación debe conservar el snapshot necesario para reconstruir qué se vendió y bajo qué condiciones.

Como mínimo, la operación deberá poder preservar conceptualmente:

- producto/oferta seleccionada;
- cantidad;
- modificadores elegidos;
- precio y componentes comerciales vigentes;
- impuestos aplicables;
- canal/modalidad;
- sede;
- actor responsable;
- versión o referencia suficiente de la oferta.

Los nombres físicos de columnas pertenecen a la materialización posterior.

---

#### 22. Precio no editable libremente

La experiencia no presenta el precio calculado como un campo de texto libre.

```text
PRECIO PUBLICADO / CALCULADO
!=
PRECIO ESCRITO POR EL OPERADOR
```

Un descuento o excepción de precio requiere su contrato sensible propio y no se disfraza como edición del pedido inicial.

---

#### 23. Descuento fuera de la creación ordinaria

`pulso.sales.discounts.apply` es una capacidad sensible `BASE_AND_OPERATIONAL`.

Por tanto, `VSCREEN-0081` no incluye un mecanismo ordinario de:

- porcentaje libre;
- valor libre;
- precio negociado manual;
- código genérico de descuento sin autoridad.

Cuando exista un descuento válido, debe llegar desde regla aplicable o flujo autorizado separado.

---

#### 24. Cantidad

La cantidad forma parte de la selección de la línea.

La UX debe permitir ajustar únicamente cantidades válidas para la oferta y la unidad vendible.

No se aceptan cantidades inválidas para luego “corregir” el pedido mediante una mutación genérica.

---

#### 25. Modificadores

Los modificadores se presentan únicamente cuando el producto seleccionado los requiere o permite.

La creación debe distinguir:

- modificador obligatorio;
- modificador opcional;
- opción incompatible;
- selección incompleta.

Una selección obligatoria incompleta bloquea la confirmación de esa línea.

---

#### 26. Observaciones

Una observación libre puede aportar contexto permitido del pedido, pero no sustituye estructuras empresariales.

Nunca se codifica en texto libre:

- descuento;
- autorización;
- sustitución material;
- estado de pago;
- ajuste de inventario;
- identidad de actor;
- cancelación;
- excepción sensible.

---

#### 27. Cliente opcional

`TREQ-PULSO-005` establece que el cliente puede ser opcional.

Por tanto, la creación ordinaria no exige identificar un cliente cuando el canal y la política permiten venta anónima.

Regla:

```text
CLIENTE OPCIONAL
!=
LOYALTY OBLIGATORIO
```

---

#### 28. Identificación de cliente como handoff

Cuando el flujo permita o requiera identificar cliente, la experiencia puede invocar la superficie propietaria correspondiente.

La creación no debe:

- cargar el ledger PASS completo;
- obligar a redención;
- acumular puntos automáticamente por abrir la venta;
- crear una identidad de cliente paralela en PULSO.

`PULSO-UX-011/012/018` conservan los efectos posteriores de fidelización.

---

#### 29. Responsable derivado del actor efectivo

El “responsable” de la creación no es un selector libre.

Debe derivarse del actor humano efectivo y su contexto autorizado.

En dispositivo compartido:

```text
PRINCIPAL TECNICO
!=
ACTOR HUMANO
```

`PULSO-AUTH-012/013` y `PULSO-UX-014` conservan la materialización de esa atribución.

---

#### 30. Composición visual mínima

La experiencia objetivo se compone de tres zonas lógicas:

1. contexto de la venta;
2. selección de oferta y configuración de línea;
3. resumen de la venta en preparación con acción principal.

No se convierte en un formulario administrativo largo ni en un menú de rutas.

---

#### 31. Contexto visible, no editable por defecto

El encabezado puede mostrar de forma compacta:

- sede/punto;
- canal/modalidad;
- actor;
- estado de contexto necesario.

Los valores derivados no se presentan como campos editables cuando el actor no tiene una decisión legítima sobre ellos.

---

#### 32. Selección orientada a oferta

La acción primaria del cuerpo es seleccionar lo que el cliente quiere comprar.

La futura materialización puede usar búsqueda, categorías o superficies equivalentes, pero deberá preservar:

```text
OFERTA VIGENTE
→ PRODUCTO
→ CANTIDAD
→ MODIFICADORES SI APLICAN
→ RESUMEN
```

La especificación táctil detallada permanece en `PULSO-UX-015`.

---

#### 33. Resumen de venta

El resumen debe permitir verificar antes de crear:

- líneas seleccionadas;
- cantidades;
- modificadores;
- subtotal y total comercial calculado conforme al contrato disponible;
- contexto relevante;
- cliente cuando exista.

El resumen no presenta pago confirmado ni entrega completada.

---

#### 34. Una acción principal de creación

Cuando el borrador sea válido, la acción principal es conceptualmente:

```text
CREAR VENTA
```

La acción representa exactamente `pulso.sales.orders.create`.

No representa:

- cobrar;
- confirmar pago;
- cerrar caja;
- cancelar;
- devolver;
- aplicar descuento sensible;
- entregar.

---

#### 35. Condición mínima para confirmar

No puede confirmarse una creación sin al menos una intención comercial materializable.

Para `VPROC-0039`, el estado inicial `COUNTER_SALE_OPENED` exige como mínimo:

- sede;
- canal;
- cliente opcional;
- al menos una intención de compra o artículo inicial.

La mera apertura de `VSCREEN-0081` no satisface esa condición.

---

#### 36. Persistencia atómica inicial

La creación autoritativa debe producir un resultado empresarial todo-o-nada para el pedido inicial.

No debe dejar como estado exitoso:

```text
PEDIDO CREADO
+
LINEAS FALLIDAS
```

ni:

```text
LINEAS CREADAS
+
PEDIDO AUSENTE
```

La implementación física definirá el mecanismo transaccional exacto.

---

#### 37. Estado canónico inicial

La creación pertenece a `VPROC-0039` y debe establecer una instancia coherente con:

```text
VPROC-0039.COUNTER_SALE_OPENED
```

La selección de artículos puede alimentar la transición posterior a:

```text
VPROC-0039.ITEMS_SELECTED
```

pero la UI no puede saltar estados ni declarar una transición que la máquina de estados no haya confirmado.

---

#### 38. Estados posteriores no se crean por implicación

Crear la venta no implica alcanzar:

- `PREPARATION_IN_PROGRESS`;
- `READY_FOR_HANDOFF`;
- `PAYMENT_PENDING`;
- `PAYMENT_CONFIRMED`;
- `HANDOFF_PENDING`;
- `SALE_RECONCILIATION_PENDING`;
- `COUNTER_SALE_CLOSED`.

Cada estado requiere su evento, condición y autoridad propios.

---

#### 39. Creación no equivale a modificación posterior

El catálogo publicado contiene `pulso.sales.orders.create`, pero el dataset 1.0.0 no publica una concesión `pulso.sales.orders.update` equivalente para estos actores.

Por tanto, esta tarea no resuelve la creación simplificando después mediante una edición genérica del pedido.

La operación inicial debe contener los datos mínimos necesarios para nacer coherente.

---

#### 40. Corrección antes de confirmar

Mientras la venta continúe como borrador de interfaz sin efecto, el usuario puede corregir selección, cantidad o modificadores sin necesitar una mutación empresarial posterior.

Regla:

```text
CORREGIR BORRADOR LOCAL
!=
MUTAR PEDIDO PERSISTIDO
```

Esto reduce deuda de actualización después de crear.

---

#### 41. Corrección después de confirmar

Una vez existe pedido autoritativo, cualquier modificación debe pasar por el contrato propietario de pedido activo, estado, columnas y permiso exacto.

`VSCREEN-0081` no reutiliza `orders.create` para editar un recurso existente.

---

#### 42. Cancelar borrador

Salir o descartar antes de la creación autoritativa:

- elimina únicamente el borrador de interfaz;
- no ejecuta `orders.cancel`;
- no crea trazabilidad falsa de una venta inexistente.

---

#### 43. Cancelar venta creada

Después de una creación exitosa:

```text
DESCARTAR UI
!=
CANCELAR VENTA
```

La cancelación pertenece a `PULSO-UX-009` y a la autoridad sensible correspondiente.

---

#### 44. Cobro queda separado

La creación no solicita medio de pago ni confirma recaudo como parte de `orders.create`.

Al terminar:

```text
VENTA CREADA
→ SIGUIENTE ACCION SEGUN ESTADO
```

Si el siguiente paso autorizado es cobrar, el handoff se dirige a:

```text
VSCREEN-0084 — Cobro y medios de pago
```

`PULSO-UX-008` conserva su diseño detallado.

---

#### 45. Preparación queda separada

Si la venta contiene artículos que requieren preparación, la creación no marca automáticamente preparación iniciada o terminada.

La señal hacia FOGO o la cola correspondiente pertenece a los contratos propietarios posteriores.

---

#### 46. Inventario queda separado

La creación no descuenta, reserva ni ajusta inventario por una escritura lateral no gobernada.

`PULSO-UX-016` conserva la conexión entre venta y NEXO.

---

#### 47. NUMERA queda separado

Crear una venta no crea por sí solo un hecho económico conciliado ni un asiento.

`PULSO-UX-017` conserva la integración con NUMERA.

---

#### 48. PASS queda separado

Crear una venta no acredita, redime ni altera ledger PASS por implicación.

`PULSO-UX-018` conserva la integración con PASS.

---

#### 49. Idempotencia de la creación

Una misma intención de creación reintentada por doble toque, timeout, navegación o reenvío no puede producir dos ventas.

La materialización debe conservar una identidad estable de intento/correlación suficiente para:

- detectar repetición;
- devolver el resultado original cuando ya exista;
- distinguir reutilización conflictiva;
- impedir doble pedido.

Esta tarea no fija el nombre físico de esa identidad.

---

#### 50. Acción pendiente

Mientras la confirmación autoritativa está en curso:

- la acción principal no debe producir envíos paralelos;
- la UI muestra estado pendiente;
- volver a tocar no crea otra intención independiente;
- el resultado visual espera confirmación real.

---

#### 51. Resultado desconocido

Ante timeout o pérdida de conectividad después de enviar la creación:

```text
UNKNOWN RESULT
!=
FAILED
```

La experiencia debe reconciliar antes de volver a crear.

Nunca:

```text
TIMEOUT
→ CREAR OTRA VENTA AUTOMATICAMENTE
```

---

#### 52. Operación degradada

`VPROC-0039` admite continuidad controlada, pero esta tarea no inventa un protocolo offline nuevo.

Un borrador local puede existir sin efecto empresarial. Una venta solo puede presentarse como creada si:

- el sistema autoritativo la confirmó; o
- una modalidad offline gobernada y explícitamente soportada por contratos posteriores demuestra su admisión.

---

#### 53. Validación server-side obligatoria

La futura acción de creación deberá revalidar, como mínimo:

- `pulso.sales.orders.create`;
- actor efectivo;
- rol operativo;
- turno/check-in;
- sede/área/punto;
- canal/modalidad;
- oferta vigente;
- líneas y cantidades;
- modificadores;
- reglas comerciales aplicables;
- idempotencia/correlación;
- denegaciones.

El payload del cliente no es autoridad.

---

#### 54. Cálculo y datos derivados

Los totales, reglas comerciales y campos derivados se calculan o verifican desde fuentes autoritativas.

El cliente puede mostrar una proyección, pero no decide unilateralmente:

- total final;
- impuesto;
- precio maestro;
- descuento sensible;
- disponibilidad final;
- identidad del actor.

---

#### 55. Errores de negocio distinguibles

La experiencia debe distinguir al menos conceptualmente:

- falta de autorización;
- contexto operativo inválido;
- oferta no vigente;
- artículo no disponible;
- modificadores incompletos o inválidos;
- precio/oferta cambiada;
- conflicto de reintento;
- fallo técnico;
- resultado desconocido.

No todos se presentan como “no se pudo crear”.

---

#### 56. Recuperación frente a cambio de oferta

Si la oferta cambió antes de confirmar:

- no se conserva silenciosamente un precio viejo;
- no se sustituye el producto sin informar;
- se revalida el borrador;
- se destaca la diferencia material;
- el usuario confirma únicamente sobre condiciones vigentes.

---

#### 57. Privacidad

`VSCREEN-0081` carga solo datos necesarios para crear la venta actual.

No carga por defecto:

- historial completo del cliente;
- ledger PASS;
- ventas de otras sedes;
- datos laborales ajenos;
- logs técnicos;
- datos NUMERA;
- configuración administrativa.

---

#### 58. Accesibilidad

La futura materialización debe conservar:

- acción principal identificable;
- foco y navegación comprensibles;
- estado de validación por línea;
- errores asociados al campo o producto correspondiente;
- resumen legible antes de confirmar;
- estados pendiente, éxito y fallo claramente diferenciados.

La especificación táctil detallada permanece en `PULSO-UX-015`.

---

#### 59. Flujo objetivo

El flujo ordinario queda:

```text
VSCREEN-0080
→ resolver contexto y autoridad
→ VSCREEN-0081
→ seleccionar oferta
→ configurar cantidad/modificadores necesarios
→ revisar resumen
→ CREAR VENTA
→ confirmacion autoritativa
→ recurso creado + siguiente accion permitida
```

Sin pasos administrativos obligatorios que ya puedan resolverse por contexto.

---

#### 60. Handoff a pedido activo

Después de crear, el sistema debe conservar la identidad del recurso creado y dirigir la continuidad al owner de la siguiente acción válida.

Puede existir navegación hacia una superficie de pedido activo o hacia cobro cuando corresponda, pero:

```text
CREAR
!=
EDITAR
!=
COBRAR
```

La navegación no concede ninguna capacidad adicional.

---

#### 61. AS-IS de vento-pulso

El baseline actual de `vento-pulso` conserva seis páginas físicas:

```text
/
/no-access
/orders
/sales-imports
/salon
/scanner
```

La raíz y `/scanner` montan `ScannerPage`, orientado actualmente a identificación/loyalty, y `/orders` es un tablero operativo.

No se observa una página dedicada a `VSCREEN-0081` ni un consumidor de `pulso.sales.orders.create` en el runtime actual inspeccionado.

Por tanto:

```text
VSCREEN-0081 CANONICO
!=
VSCREEN-0081 MATERIALIZADO
```

---

#### 62. Brechas AS-IS y salida

| Brecha observada | Riesgo | Propietario | Condición de salida |
| --- | --- | --- | --- |
| no existe superficie física de creación canónica | creación no materializada | paquete PULSO / `PULSO-UX-021` | `VSCREEN-0081` materializada con contrato aprobado |
| runtime usa `pulso.pos.main` en rutas PULSO | creación podría depender de permiso broad | `PULSO-AUTH-015/016` | consumer usa PermissionKey exacta y pruebas allow/deny |
| no se observa consumer de `pulso.sales.orders.create` | grant publicado sin consumidor de creación | paquete PULSO + autorización | acción server-side consume el permiso exacto |
| flujo de pedidos actual se concentra en `/orders` | tablero puede confundirse con creación | `PULSO-UX-020/021` | creación y operación de pedidos quedan separadas |
| update genérico no está publicado como capacidad ordinaria vigente | creación podría depender de edición posterior sin autoridad | evolución de catálogo + arquitectura PULSO | create inicial nace coherente y toda mutación posterior usa contrato exacto |
| efectos inventario/NUMERA/PASS todavía no pertenecen a esta tarea | creación podría producir efectos laterales incompletos | `PULSO-UX-016/017/018` | integraciones propietarias implementadas y certificadas |

No queda brecha de esta tarea sin propietario y condición de salida.

---

#### 63. Resultado funcional de GAP-PULSO-007

La familia histórica “crear y actualizar pedidos” queda parcialmente descompuesta por esta tarea:

```text
CREAR VENTA INICIAL
→ CONTRATO FUNCIONAL CERRADO EN PULSO-UX-007

MODIFICAR PEDIDO PERSISTIDO
→ NO SE ABSORBE EN orders.create
→ REQUIERE CONTRATO / PERMISO / ESTADO PROPIO
```

Así se evita usar una mutación genérica para corregir la falta de diseño de la creación inicial.

---

#### 64. Matriz de decisiones de simplificación

| Decisión | Resultado |
| --- | --- |
| sede | pre-resuelta; no selector libre |
| actor responsable | derivado del actor efectivo |
| canal/modalidad | heredado cuando sea inequívoco; elegir solo si existen opciones autorizadas |
| cliente | opcional salvo contrato específico |
| producto | desde oferta publicada vigente |
| cantidad | editable dentro de reglas de oferta |
| modificadores | solo cuando aplican |
| precio | calculado/verificado; no libre |
| descuento sensible | fuera de creación ordinaria |
| pago | fuera; handoff a `PULSO-UX-008` |
| cancelación | fuera; `PULSO-UX-009` |
| caja | contexto/handoff; no efecto implícito |
| loyalty | fuera de creación; integración posterior |
| inventario | efecto posterior gobernado |
| persistencia | una creación autoritativa e idempotente |
| pedido vacío | prohibido por apertura de pantalla |
| doble toque/reintento | misma intención, no doble venta |

---

#### 65. Handoff inmediato a PULSO-UX-008

`PULSO-UX-008 — Simplificar cobro y medios de pago` recibe:

```text
VENTA CREADA != PAGO CONFIRMADO
VSCREEN-0081 TERMINA CON RECURSO AUTORITATIVO
COBRO USA pulso.payments.transactions.collect
CREACION NO CAPTURA MEDIO DE PAGO COMO EFECTO
TOTAL MOSTRADO DEBE REVALIDARSE EN COBRO
UNKNOWN CREATE RESULT SE RESUELVE ANTES DE COBRAR
ACTOR / SEDE / CAJA / RECURSO DEBEN CORRELACIONARSE
```

La 008 no deberá reinterpretar `orders.create` como autoridad de cobro.

---

#### 66. Handoff al resto de PULSO-UX

| Tarea | Entrada exacta proveniente de PULSO-UX-007 |
| --- | --- |
| `PULSO-UX-008` | venta creada y cobro permanecen efectos separados |
| `PULSO-UX-009` | descartar borrador no equivale a cancelar venta persistida |
| `PULSO-UX-010` | creación no abre/cierra caja implícitamente |
| `PULSO-UX-011` | acumulación de puntos ocurre después de una venta elegible y no al abrir creación |
| `PULSO-UX-012` | redención no se mezcla con creación ordinaria |
| `PULSO-UX-013` | efectos sensibles requieren confirmación proporcional y autoridad propia |
| `PULSO-UX-014` | actor efectivo de creación debe sobrevivir terminal compartida |
| `PULSO-UX-015` | selección de oferta se adapta a interacción táctil sin cambiar contrato |
| `PULSO-UX-016` | venta creada emite/solicita efectos de inventario mediante contrato gobernado |
| `PULSO-UX-017` | venta creada se correlaciona con hecho económico sin duplicarlo |
| `PULSO-UX-018` | cliente/loyalty se integran sin ledger paralelo PULSO |
| `PULSO-UX-020` | prototipo histórico no redefine el contrato de creación por existir |
| `PULSO-UX-021` | arquitectura objetivo materializa create atómico, permisos exactos y separación de efectos |

---

#### 67. Requisitos de prueba derivados

**Resultado:** NO GENERA REQUISITOS DE PRUEBA.

**Requisitos creados:** 0
**Requisitos modificados:** 0
**Requisitos diferidos:** 0
**Requisitos obsoletos:** 0

Justificación: el registro vigente ya cubre creación y mutación gobernada de pedidos, separación de venta/pago/caja, snapshot comercial, autorización exacta, territorio, idempotencia, recuperación y experiencia contextual. La cobertura existente ya identifica expresamente esta tarea dentro del ciclo comercial.

---

#### 68. Cobertura de prueba vigente reutilizada

Se reutiliza sin modificación:

- `TREQ-PULSO-004` para exigir acción nombrada, permiso, sede, estado y columnas permitidas en mutaciones de pedido;
- `TREQ-PULSO-005` para conservar canal, sede, modalidad, cliente opcional, snapshot de oferta/precio, impuestos, descuentos, actores y estados separados;
- `TREQ-PULSO-006` para mantener venta, cobro, pago, caja, documento fiscal, descuento, anulación y cierre como hechos distintos;
- `TREQ-PULSO-014` para acceso PULSO fail-closed;
- `TREQ-PULSO-015` para impedir que `site_id` amplíe territorio;
- `TREQ-PULSO-024` para impedir que una ruta o componente demuestre autorización o completitud;
- `TREQ-PULSO-026` para impedir elevar `pulso.pos.main` a permiso exacto suficiente;
- `TREQ-AUTH-001` para autorización por permiso, contexto y alcance;
- `TREQ-AUTH-013` para revalidación server-side frente a payload o URL manipulados;
- `TREQ-AUTH-015` para evidencia correlacionable de actor, territorio, permiso, recurso y decisión;
- `TREQ-UX-001` para hacer identificables tarea, acción y estado;
- `TREQ-UX-003` para adecuar densidad y acciones al actor efectivo;
- `TREQ-UX-006` para recuperación segura;
- `TREQ-UX-008` y `TREQ-UX-009` para navegación y consumo de contexto coherentes.

Esta enumeración es trazabilidad reutilizada y no modifica el Registro 04A.

---

#### 69. Evidencia de validación

| Clase | Estado | Evidencia |
| --- | --- | --- |
| BUILD | NOT_EXECUTED | El build documental corresponde al checkout después de incorporar el artefacto; esta tarea no materializa producto. |
| LOCAL | NOT_EXECUTED | Formato, quality, delivery, validadores de dominio y batería global quedan pendientes de la incorporación en el checkout local. |
| REMOTA | PASS | Se verificaron `main` vigente de `vento-shell`, continuidad, topología `DEFINE_ONCE`, `PULSO-UX-005`, `PULSO-UX-006` aprobada como base anticipada, `VSCREEN-0081`, binding `VPROC-0039::STEP-CREATE_SALE_OR_ORDER`, estados de `VPROC-0039`, `AUTH-CAT-022/023`, dataset 1.0.0, Registro 04A PULSO aplicable y runtime actual de `vento-pulso`. |
| OPERATIVA | NOT_EXECUTED | No se crearon ventas, pedidos, líneas, pagos, cajas, descuentos, inventario, puntos ni efectos económicos reales. |
| FÍSICA | NOT_APPLICABLE | `PULSO-UX-007` no crea instancia física propia ni autoriza cambios de producto, datos o infraestructura. |

---

#### 70. Criterios de aceptación

La tarea queda documentalmente completa cuando:

- [ ] `VSCREEN-0081` se conserva como identidad canónica única de creación de venta o pedido;
- [ ] `VPROC-0039::STEP-CREATE_SALE_OR_ORDER` permanece como binding principal;
- [ ] `pulso.sales.orders.create` queda como PermissionKey exacta de creación;
- [ ] se registra que solo `cajero_satelite` y `operador_integral_satelite` reciben el grant publicado en dataset 1.0.0;
- [ ] `servicio_salon`, `mostrador_satelite` y `gerencia_operativa` no reciben creación por inferencia;
- [ ] `pulso.access` no concede creación;
- [ ] `pulso.pos.main` no se usa como fallback;
- [ ] contexto ya resuelto no se vuelve a pedir sin necesidad;
- [ ] sede no puede seleccionarse libremente para ampliar territorio;
- [ ] actor responsable se deriva del actor efectivo;
- [ ] canal/modalidad se hereda cuando es inequívoco;
- [ ] cliente permanece opcional cuando el contrato lo permite;
- [ ] abrir la pantalla no crea pedido;
- [ ] el borrador de interfaz no es un estado `VPROC-*`;
- [ ] descartar borrador no cancela una venta;
- [ ] la venta no se confirma sin una intención materializable;
- [ ] producto proviene de oferta publicada vigente;
- [ ] cantidad y modificadores se validan antes de crear;
- [ ] precio no es texto libre;
- [ ] descuento sensible queda fuera de la creación ordinaria;
- [ ] la persistencia inicial es atómica desde la perspectiva empresarial;
- [ ] creación no depende de una edición genérica posterior;
- [ ] `COUNTER_SALE_OPENED` se conserva como estado inicial canónico;
- [ ] estados posteriores no se marcan por implicación;
- [ ] cobro permanece fuera de `orders.create`;
- [ ] caja permanece separada;
- [ ] preparación permanece separada;
- [ ] inventario permanece separado;
- [ ] NUMERA permanece separado;
- [ ] PASS permanece separado;
- [ ] doble toque/reintento no crea ventas duplicadas;
- [ ] timeout queda como resultado desconocido hasta reconciliación;
- [ ] operación degradada no fabrica una confirmación autoritativa;
- [ ] server-side revalida autoridad, contexto, oferta y payload;
- [ ] errores de negocio y fallo técnico permanecen distinguibles;
- [ ] cambio material de oferta obliga revalidación;
- [ ] la UI minimiza datos de cliente y otras sedes;
- [ ] el runtime actual se registra como no materializado para `VSCREEN-0081`;
- [ ] cada brecha AS-IS tiene propietario y condición de salida;
- [ ] `GAP-PULSO-007` queda separado entre creación inicial y modificación posterior;
- [ ] `PULSO-UX-008` recibe handoff suficiente para diseñar cobro sin mezclarlo con creación;
- [ ] no se crean ni modifican requisitos de prueba;
- [ ] no se ejecutan cambios físicos.

---

#### 71. Límites

Esta tarea no:

- implementa `VSCREEN-0081`;
- crea una ruta física nueva;
- modifica `/`, `/orders`, `/scanner`, `/salon` o cualquier página;
- crea componentes, Server Actions, RPC o Edge Functions;
- crea o cambia PermissionKeys;
- modifica grants, matrices o datasets;
- crea `orders.update`;
- usa `pulso.pos.main` como sustituto de `orders.create`;
- procesa ventas reales;
- procesa pagos;
- abre o cierra cajas;
- aplica descuentos;
- cancela pedidos;
- registra devoluciones o refunds;
- inicia preparación;
- descuenta inventario;
- registra hechos económicos;
- acredita o redime loyalty;
- cambia catálogo, producto, receta u oferta comercial;
- define la arquitectura física final del POS;
- modifica Supabase, RLS, tablas, datos, Realtime o migraciones;
- modifica packages compartidos;
- modifica el Registro 04A;
- crea instancia física;
- desarrolla `PULSO-UX-008`.

---

#### 72. Decisión final de experiencia

La creación simplificada queda resumida así:

```text
CONTEXTO AUTORIZADO YA RESUELTO
→ ABRIR VSCREEN-0081 SIN CREAR PEDIDO
→ SELECCIONAR OFERTA + CANTIDAD + MODIFICADORES NECESARIOS
→ REVISAR RESUMEN
→ CREAR VENTA UNA SOLA VEZ
→ CONFIRMACION AUTORITATIVA E IDEMPOTENTE
→ RECURSO CREADO
→ SIGUIENTE ACCION PROPIETARIA
```

La simplificación elimina pasos redundantes; no elimina controles empresariales.

---

#### 73. Continuidad

**ÚLTIMA TAREA APROBADA**
`PULSO-UX-006 — Diseñar inicio para supervisor`

**TAREA ACTUAL APROBADA**
`PULSO-UX-007 — Simplificar creación de venta`

**SIGUIENTE TAREA RESERVADA**
`PULSO-UX-008 — Simplificar cobro y medios de pago`
### ✅ PULSO-UX-008 — Simplificar cobro y medios de pago

**Estado:** APROBADA
**Tarea anterior:** PULSO-UX-007 — Simplificar creación de venta
**Tarea siguiente:** PULSO-UX-009 — Separar anulación, devolución y reembolso
**Tipo de tarea:** diseño documental integral de `VSCREEN-0084 — Cobro y medios de pago` para reducir el cobro ordinario PULSO a una obligación comercial autoritativa, total revalidado, selección explícita de medio permitido y confirmación correlacionada mediante `VPROC-0043::STEP-COLLECT_PAYMENT` y `pulso.payments.transactions.collect`, preservando pagos parciales y combinados, efectivo y cambio, idempotencia, resultado desconocido, proveedor, soporte fiscal, conciliación y separación estricta entre venta, pago, caja, documento fiscal, devolución, reembolso y cierre; sin inventar medios, propinas, secretos o autoridad no publicados y sin materialización física; `DEFINE_ONCE` / `NO_PHYSICAL_INSTANCE`
**Bloque:** BLOQUE N — PULSO
**Repositorio propietario:** `vento-group-sas/vento-shell`
**Archivo propietario:** `docs/plan-canonico/modular/bloques/N_PULSO/02_EXPERIENCIA_POS_Y_OPERACION_COMERCIAL.md`
**Estado físico resultante:** `NO_PHYSICAL_INSTANCE`
**Cambios físicos autorizados:** ninguno; esta tarea no modifica código, rutas, pantallas, contratos generados, PermissionKeys, grants, matrices, RLS, RPC, Server Actions, tablas, datos, Supabase, migraciones, proveedores, secretos, packages, dispositivos, terminales, datáfonos ni despliegues
**Requisitos de prueba creados o modificados:** 0

---

#### 1. Propósito

Simplificar el cobro ordinario en PULSO sin colapsar en una sola acción hechos que el modelo canónico mantiene separados.

La experiencia debe permitir que un actor autorizado parta de una venta u obligación comercial válida y llegue a un resultado de pago verificable con la menor carga operativa compatible con autorización, importe, medio, proveedor, caja, idempotencia, auditoría y reconciliación.

La regla de experiencia es:

```text
OBLIGACION COMERCIAL AUTORITATIVA
+
TOTAL REVALIDADO
+
ACTOR / SEDE / PUNTO / CAJA COMPATIBLES
+
MEDIO PERMITIDO
+
UNA INTENCION DE COBRO CORRELACIONADA
=
RESULTADO DE PAGO AUTORITATIVO
```

sin convertir el cobro en creación de venta, modificación genérica del pedido, cierre de caja, emisión fiscal implícita, anulación, devolución, reembolso, loyalty o conciliación contable final.

---

#### 2. Handoff recibido de PULSO-UX-007

`PULSO-UX-007` entrega como condiciones de entrada:

```text
VENTA CREADA != PAGO CONFIRMADO
VSCREEN-0081 TERMINA CON RECURSO AUTORITATIVO
COBRO USA pulso.payments.transactions.collect
CREACION NO CAPTURA MEDIO DE PAGO COMO EFECTO
TOTAL MOSTRADO DEBE REVALIDARSE EN COBRO
UNKNOWN CREATE RESULT SE RESUELVE ANTES DE COBRAR
ACTOR / SEDE / CAJA / RECURSO DEBEN CORRELACIONARSE
```

Por tanto, `PULSO-UX-008` nunca intenta cobrar una creación cuyo resultado siga siendo desconocido y nunca interpreta `pulso.sales.orders.create` como autoridad de recaudo.

---

#### 3. Naturaleza y topología

La topología aplicable es:

```text
mode = DEFINE_ONCE
execution_gate = NO_PHYSICAL_INSTANCE
```

Consecuencias:

- la experiencia de cobro se define una sola vez;
- no crea instancia física propia;
- no materializa `VSCREEN-0084`;
- no publica rutas ni componentes;
- no crea ni modifica PermissionKeys;
- no modifica el dataset de grants;
- no crea proveedores de pago;
- no modifica Supabase;
- no autoriza procesamiento real de pagos;
- no autoriza implementación física.

---

#### 4. Fuentes de autoridad reconciliadas

La decisión consume como mínimo:

- `PULSO-UX-001..007`;
- `PULSO-AUTH-006..016`;
- `AUTH-CAT-022..024`;
- dataset `vento.authorization.operational-role-grants@1.0.0`;
- `VSCREEN-0084` y sus bindings aprobados;
- `VPROC-0039`, `VPROC-0043`, `VPROC-0044` y `VPROC-0051`;
- `VPROC-0043::STEP-COLLECT_PAYMENT`;
- estados y eventos canónicos de `VPROC-0043`;
- matriz E2 de prototipos, estaciones y gramática de interacción;
- Registro 04A vigente de PULSO;
- brechas `H-CAP-SCOPE-009-016`, `017`, `019`, `020` y `H-CODE-011-010`;
- runtime actual de `vento-pulso` como evidencia AS-IS, no como autoridad del diseño objetivo.

---

#### 5. Identidad canónica de la pantalla

La identidad existente es:

```text
VSCREEN-0084 — Cobro y medios de pago
```

Su propósito canónico es:

- calcular o revalidar el total aplicable;
- aplicar medios de pago autorizados;
- confirmar recaudo;
- emitir o enlazar soporte autorizado según corresponda.

Esta tarea no crea una pantalla paralela llamada “pago rápido”, “caja rápida”, “checkout” o equivalente.

---

#### 6. Binding principal de proceso

`VSCREEN-0084` conserva:

```text
PROCESO PRINCIPAL: VPROC-0043
PASO: VPROC-0043::STEP-COLLECT_PAYMENT
NOMBRE: Cobrar y confirmar pago
FUNCION: EXECUTE
FASE: DECISION
```

La simplificación UX no sustituye ni renombra este binding.

---

#### 7. Propósito de VPROC-0043

`VPROC-0043` existe para:

```text
COBRAR
→ CONFIRMAR PAGO
→ CONSERVAR SOPORTE FISCAL APLICABLE
→ RECONCILIAR MEDIO / VALOR / VENTA / RESULTADO
```

Su verdad de negocio no es un booleano visual `paid = true`.

El proceso conserva el vínculo entre obligación, intento, medio, importe, proveedor o mecanismo, resultado, soporte y reconciliación.

---

#### 8. Relación con VPROC-0039

La venta de mostrador o para llevar puede alcanzar estados de pago dentro de `VPROC-0039`, pero el subproceso que gobierna el cobro es `VPROC-0043`.

Regla:

```text
ESTADO DE VENTA SOBRE PAGO
!=
DETALLE AUTORITATIVO DEL PROCESO DE PAGO
```

`VPROC-0039.PAYMENT_CONFIRMED` solo puede reflejar una confirmación que haya sido demostrada por el contrato propietario del cobro; no puede fabricarla la UI.

---

#### 9. Relación con VPROC-0051

`VSCREEN-0084` conserva relación secundaria con `VPROC-0051` para el hecho económico correlacionado que corresponda a NUMERA.

La relación es un handoff y no una absorción de responsabilidades:

```text
PULSO GOBIERNA COBRO OPERATIVO
NUMERA GOBIERNA HECHO ECONOMICO / CONCILIACION PROPIETARIA
```

La pantalla no escribe contabilidad ni declara conciliación NUMERA por sí sola.

---

#### 10. PermissionKey exacta

El cobro ordinario consume:

```text
pulso.payments.transactions.collect
```

Esta capacidad es distinta de:

- `pulso.sales.orders.create`;
- permisos de descuento;
- permisos de cancelación;
- permisos de refund;
- permisos de reverso;
- apertura de caja;
- cierre de caja.

---

#### 11. Grants operativos publicados

En `vento.authorization.operational-role-grants@1.0.0`, `pulso.payments.transactions.collect` tiene exactamente dos grants publicados:

```text
cajero_satelite
operador_integral_satelite
```

Ambos son:

```text
authorization_mode = OPERATIONAL_ONLY
grant_type = DIRECT_OPERATIONAL
effect = ALLOW
```

No existe un tercer grant de esa PermissionKey en el dataset vigente.

---

#### 12. Contexto de cajero_satelite

El grant de `cajero_satelite` limita el cobro ordinario a:

- sede activa;
- área o punto compatible;
- turno activo;
- check-in cuando aplica;
- actor humano identificado;
- recurso vigente;
- transición idempotente;
- auditoría;
- sesión de caja personal cuando corresponda.

La UI no puede ampliar ese territorio ni reutilizar la identidad de caja de otro actor.

---

#### 13. Contexto de operador_integral_satelite

El grant de `operador_integral_satelite` exige además que la sede integrada y la función de caja estén habilitadas dentro de su contexto efectivo.

Ser operador integral no convierte cualquier dispositivo, sede o sesión en punto válido de cobro.

---

#### 14. Roles sin grant no cobran por inferencia

No se infiere `pulso.payments.transactions.collect` para:

- `servicio_salon`;
- `mostrador_satelite`;
- `gerencia_operativa`;
- cualquier otro rol no publicado en los dos grants vigentes.

Regla:

```text
PROXIMIDAD A CAJA
!=
AUTORIDAD DE COBRO
```

---

#### 15. Acceso a PULSO no basta

Se conserva:

```text
pulso.access
!=
pulso.payments.transactions.collect
```

Poder entrar a PULSO no concede recaudo.

---

#### 16. Permiso broad legacy no basta

Ningún permiso broad o navegación existente puede sustituir la PermissionKey exacta del cobro.

La futura implementación deberá validar `pulso.payments.transactions.collect` de forma explícita y server-side.

---

#### 17. Precondición: obligación comercial identificable

`VPROC-0043.PAYMENT_PENDING` nace únicamente cuando existe como mínimo:

- obligación comercial identificable;
- monto;
- moneda;
- medio permitido o conjunto de opciones permitidas;
- referencia a venta o documento aplicable.

No se abre un pago huérfano sin recurso comercial correlacionado.

---

#### 18. Resultado de creación desconocido bloquea cobro

Si la creación de la venta terminó con resultado desconocido:

```text
UNKNOWN CREATE RESULT
→ RECONCILIAR CREACION
→ IDENTIFICAR RECURSO AUTORITATIVO
→ SOLO DESPUES EVALUAR COBRO
```

Cobrar antes de reconciliar puede producir pago sin venta o cobro duplicado sobre una venta ya creada por el primer intento.

---

#### 19. Total mostrado no es autoridad final

El total presentado por la UI es una proyección útil, pero el cobro debe revalidar el importe contra el recurso y las reglas comerciales vigentes aplicables.

La pantalla no autoriza:

- editar total como texto libre;
- escribir impuestos manualmente;
- fabricar descuentos;
- alterar precio maestro;
- ocultar una diferencia material entre lo mostrado y lo autoritativo.

---

#### 20. Cambio material del total

Si el total autoritativo cambia antes de iniciar o confirmar el cobro:

- se detiene la confirmación automática;
- se muestra el total vigente;
- se identifica la diferencia material;
- se exige una nueva decisión del actor cuando corresponda;
- no se cobra silenciosamente el valor anterior.

---

#### 21. Moneda

La moneda forma parte de la obligación y de cada efecto de pago.

La UI no convierte moneda por inferencia ni reutiliza un importe sin su moneda correspondiente.

---

#### 22. Medio de pago como opción gobernada

La pantalla muestra únicamente medios admitidos por el contexto, la configuración y el contrato vigente.

No existe un campo libre para escribir un medio arbitrario.

Regla:

```text
MEDIO DISPONIBLE
=
MEDIO PUBLICADO / SOPORTADO / APLICABLE
```

---

#### 23. Seleccionar medio no equivale a cobrar

`VPROC-0043.METHOD_SELECTED` significa que se eligieron medio y condiciones.

Todavía no demuestra:

- autorización;
- captura;
- recepción del valor;
- documento fiscal;
- conciliación.

---

#### 24. Autorización en curso

`VPROC-0043.AUTHORIZATION_IN_PROGRESS` representa una solicitud activa al mecanismo correspondiente.

Mientras exista:

- la UI no declara pago confirmado;
- la acción principal evita envíos paralelos de la misma intención;
- un timeout no se transforma automáticamente en rechazo;
- el actor conserva una forma clara de conocer que el resultado aún no es definitivo.

---

#### 25. Autorizado no equivale a capturado

El estado:

```text
VPROC-0043.AUTHORIZED
```

no equivale a:

```text
VPROC-0043.CAPTURED
```

La experiencia no usa “aprobado” como sinónimo universal de dinero recibido cuando el medio exige una fase posterior de captura o confirmación.

---

#### 26. Captura pendiente

`VPROC-0043.CAPTURE_PENDING` conserva la verdad de que existe autorización o intención válida, pero todavía falta captura, confirmación o recepción definitiva del valor.

No se avanza por optimismo a pago conciliado.

---

#### 27. Capturado no equivale a conciliado

`VPROC-0043.CAPTURED` confirma el valor según el medio correspondiente, pero todavía puede faltar:

- correlación fiscal;
- correlación con la venta;
- comisión o liquidación aplicable;
- conciliación financiera.

Por tanto:

```text
CAPTURED
!=
PAYMENT_RECONCILED
```

---

#### 28. Documento fiscal pendiente

`VPROC-0043.FISCAL_DOCUMENT_PENDING` conserva la separación entre pago y soporte fiscal.

El pago no se vuelve “no realizado” porque el documento fiscal esté pendiente, ni el documento se considera emitido por el solo hecho de cobrar.

---

#### 29. Conciliación pendiente

`VPROC-0043.RECONCILIATION_PENDING` compara como mínimo la evidencia disponible de:

- venta u obligación;
- medio;
- valor;
- documento;
- comisión cuando aplique;
- abono o liquidación cuando aplique.

La UI operativa puede mostrar el pendiente, pero no declarar conciliación contable por inferencia.

---

#### 30. Pago reconciliado

`VPROC-0043.PAYMENT_RECONCILED` es el final normal del proceso cuando intento, resultado, valor, medio, venta, soporte y liquidación aplicable coinciden dentro de su alcance.

Aun así:

```text
PAYMENT_RECONCILED
!=
VENTA CERRADA
!=
CAJA CERRADA
!=
ENTREGA COMPLETADA
!=
REFUND IMPOSIBLE
```

---

#### 31. Eventos canónicos de VPROC-0043

La experiencia futura deberá respetar los seis eventos definidos:

```text
VPROC-0043.EVT-001  payment-pending
VPROC-0043.EVT-002  method-selected
VPROC-0043.EVT-003  authorization-in-progress
VPROC-0043.EVT-004  capture-pending
VPROC-0043.EVT-005  reconciliation-pending
VPROC-0043.EVT-006  payment-reconciled
```

Todos pertenecen a información financiera restringida.

La UI no inventa eventos alternos para saltarse la máquina de estados.

---

#### 32. Pago único ordinario

Para un cobro simple con un solo medio, la UX objetivo evita pasos administrativos redundantes:

```text
VENTA / OBLIGACION
→ TOTAL REVALIDADO
→ ELEGIR MEDIO SI HAY MAS DE UNO
→ CONFIRMAR COBRO
→ ESPERAR RESULTADO AUTORITATIVO
→ MOSTRAR RESULTADO
```

Los pasos internos del proveedor o del proceso pueden existir sin convertirse en formularios manuales si no requieren decisión humana.

---

#### 33. Efectivo

El efectivo sigue siendo un medio de pago gobernado y no un atajo fuera del proceso.

Cuando aplique, el cobro en efectivo debe conservar:

- actor real;
- sede y punto;
- sesión de caja compatible cuando sea requerida;
- monto de la obligación;
- monto recibido cuando deba calcularse cambio;
- resultado confirmado;
- correlación con venta y movimiento de caja.

Recibir efectivo no autoriza cerrar la sesión de caja.

---

#### 34. Cambio o vuelto

El cambio es un resultado derivado del efectivo entregado frente a la obligación pendiente; no es:

- un descuento;
- una segunda venta;
- un medio adicional;
- un ajuste destructivo del total.

La experiencia debe mostrarlo de forma explícita cuando aplique y conservar la relación con el cobro que lo originó.

---

#### 35. Pago electrónico o mediado por proveedor

Cuando el medio dependa de datáfono, pasarela u otro proveedor:

- secretos y credenciales permanecen fuera del cliente;
- la UI no decide autorización por su cuenta;
- la referencia del proveedor se conserva cuando el contrato la produzca;
- un callback, webhook o respuesta repetida no genera un segundo cobro;
- el resultado se reconcilia por identidad estable.

El nombre físico del proveedor no se convierte en identidad universal del pago.

---

#### 36. Pagos parciales

El contrato vigente exige soportar pagos parciales sin confundirlos con pago total.

Cada tramo confirmado debe conservar conceptualmente:

- importe;
- moneda;
- medio;
- actor;
- referencia o identidad correlacionable;
- estado.

Mientras exista saldo pendiente:

```text
PAGO PARCIAL CONFIRMADO
!=
OBLIGACION TOTALMENTE PAGADA
```

---

#### 37. Medios combinados

Cuando se permita pagar una misma obligación con más de un medio:

- cada tramo conserva identidad y resultado propios;
- el saldo pendiente se recalcula desde efectos confirmados;
- un tramo fallido no borra los tramos confirmados;
- el total no se declara cubierto hasta que la suma autoritativa de tramos aplicables satisfaga la obligación;
- reintentar un tramo no duplica los anteriores.

La UI presenta un único objetivo comercial con varios efectos de pago correlacionados, no varias ventas.

---

#### 38. Monto por tramo

En pago parcial o combinado, el monto de cada tramo debe validarse contra el saldo pendiente y las reglas del medio.

La UI no permite que un valor digitado convierta por sí solo una obligación en pagada.

---

#### 39. Propina sin fuente inventada

Las fuentes canónicas registran que propina, servicio y reparto no tienen todavía una fuente histórica completamente confirmada.

Por tanto, esta tarea fija una frontera segura:

- no se agrega propina automática;
- no se inventa porcentaje por defecto;
- no se distribuye propina por inferencia;
- no se incorpora una propina al total sin una política aplicable y trazable;
- la ausencia de contrato de propina no bloquea el cobro ordinario del valor comercial debido.

Cualquier materialización futura de propina deberá consumir su fuente gobernada y conservarla como concepto separado.

---

#### 40. Pago, venta, caja y documento son hechos distintos

Se conserva la separación canónica:

```text
VENTA
!=
PAGO
!=
MOVIMIENTO DE CAJA
!=
DOCUMENTO FISCAL
```

Una sola pantalla puede coordinar el handoff entre esos hechos sin colapsarlos en una única fila, estado o permiso.

---

#### 41. Sesión de caja

`VSCREEN-0084` no abre una caja implícitamente.

Si el medio y la política requieren sesión de caja y no existe una compatible:

```text
NO COBRAR
→ HANDOFF AL OWNER DE APERTURA
```

`PULSO-UX-010` conserva apertura, fondo, movimientos, arqueo y cierre.

---

#### 42. Caja personal y actor real

Una sesión de caja no sustituye la identidad del actor humano.

En terminal compartida:

```text
DISPOSITIVO
!=
SESION TECNICA
!=
ACTOR HUMANO
```

`PULSO-UX-014` conserva el diseño detallado de identificación del actor real.

---

#### 43. Acción principal

La acción primaria de la superficie representa conceptualmente:

```text
COBRAR / CONFIRMAR PAGO
```

pero su resultado visual debe reflejar el estado real del medio y de `VPROC-0043`.

No representa:

- crear venta;
- aplicar descuento sensible;
- cancelar venta;
- devolver;
- reembolsar;
- reversar;
- cerrar caja;
- cerrar contabilidad.

---

#### 44. Confirmación proporcional

La UX no agrega confirmaciones redundantes a cada toque, pero sí exige confirmación proporcional antes de un efecto financiero irreversible o material.

`PULSO-UX-013` conserva el patrón transversal de confirmaciones sensibles.

Esta tarea entrega como datos mínimos para esa confirmación:

- recurso;
- importe;
- moneda;
- medio;
- actor;
- contexto de caja cuando aplique.

---

#### 45. Idempotencia de la intención de cobro

Una misma intención no puede cobrar dos veces por:

- doble toque;
- reenvío del formulario;
- timeout;
- navegación;
- reintento de red;
- webhook repetido;
- callback duplicado.

La materialización debe conservar una identidad estable de intento o correlación suficiente para recuperar el resultado original o detectar conflicto.

Esta tarea no fija el nombre físico de esa identidad.

---

#### 46. Acción pendiente

Mientras exista una autorización o captura en curso:

- la acción principal no produce otra intención paralela;
- se muestra estado pendiente;
- se mantiene visible el recurso y el importe;
- volver a tocar no crea un cobro independiente;
- salir y volver no convierte el pendiente en fallo.

---

#### 47. Resultado desconocido

Ante timeout, pérdida de conectividad o respuesta ambigua después de enviar el cobro:

```text
UNKNOWN PAYMENT RESULT
!=
DECLINED
!=
FAILED
```

La experiencia debe consultar o reconciliar por referencia antes de permitir un nuevo intento equivalente.

Nunca:

```text
TIMEOUT
→ COBRAR OTRA VEZ A CIEGAS
```

---

#### 48. Rechazo explícito

Un rechazo confirmado del medio puede permitir elegir otro medio o crear un nuevo intento autorizado.

El intento rechazado no se reescribe como inexistente y tampoco se contabiliza como pago confirmado.

---

#### 49. Fallo técnico

Un fallo técnico local o del proveedor no debe presentarse como rechazo financiero si no existe evidencia de rechazo.

La UI distingue:

- rechazo;
- error de validación;
- indisponibilidad;
- timeout;
- resultado desconocido;
- conflicto de idempotencia.

---

#### 50. Operación degradada

Una captura local o una marca visual offline no prueba que el pago se haya confirmado.

Si existe una modalidad degradada aprobada por contratos posteriores, deberá conservar:

- identidad de intento;
- evidencia local mínima;
- protección contra doble captura;
- reconciliación posterior obligatoria;
- estado explícito no confirmado hasta demostrar el resultado.

Esta tarea no inventa un nuevo modo offline.

---

#### 51. Server-side como autoridad

La futura acción de cobro debe revalidar como mínimo:

- `pulso.payments.transactions.collect`;
- actor efectivo;
- rol operativo;
- turno y check-in;
- sede, área y punto;
- sesión de caja cuando aplique;
- recurso comercial;
- total y moneda;
- saldo pendiente;
- medio permitido;
- estado de proceso;
- identidad de intento;
- denegaciones vigentes.

El payload del cliente no concede autoridad ni fija por sí solo el resultado.

---

#### 52. Datos sensibles y secretos

La superficie carga y conserva solo los datos necesarios para operar el cobro.

No expone por defecto:

- secretos de proveedor;
- credenciales internas;
- tokens reutilizables;
- claves privadas;
- datos financieros ajenos a la transacción;
- ledger contable completo;
- pagos de otras sedes sin autoridad.

Los secretos del proveedor permanecen en su frontera server-side correspondiente.

---

#### 53. Soporte fiscal

El soporte fiscal se mantiene correlacionado pero separado del hecho de pago.

La experiencia debe poder distinguir al menos:

```text
PAGO CONFIRMADO + DOCUMENTO PENDIENTE
PAGO CONFIRMADO + DOCUMENTO EMITIDO / VALIDADO
PAGO EN RECONCILIACION
```

sin cobrar de nuevo para “arreglar” un documento pendiente.

---

#### 54. Reimpresión separada del cobro

Reimprimir o volver a mostrar un soporte existente no crea un nuevo pago.

Regla:

```text
REIMPRIMIR SOPORTE
!=
REPETIR COBRO
```

La impresora es opcional según el medio y la estación; el documento digital puede conservarse cuando el contrato lo permita.

---

#### 55. Resultado visible

La gramática E2 exige para `VPROC-0043`:

```text
PAGO_CONFIRMADO + RESULTADO_VISIBLE
```

Por tanto, después de cada decisión material la UI muestra un estado inequívoco:

- pendiente;
- confirmado dentro del alcance correspondiente;
- rechazado;
- desconocido;
- requiere conciliación;
- requiere soporte fiscal cuando aplique.

---

#### 56. Estación y periféricos

El perfil canónico de operación es `SERVICE_CHECKOUT`.

Periféricos posibles:

- datáfono según medio;
- impresora opcional.

La ausencia de un periférico no autoriza a falsificar el resultado ni a degradar un pago electrónico a efectivo sin decisión explícita y contrato permitido.

---

#### 57. Composición visual mínima

La experiencia objetivo se organiza en cuatro zonas lógicas:

1. identidad de la obligación;
2. total y saldo autoritativos;
3. medio o distribución de medios;
4. acción de cobro y resultado.

La superficie no se convierte en un formulario financiero administrativo general.

---

#### 58. Encabezado de obligación

La cabecera puede mostrar de forma compacta:

- referencia de venta o pedido;
- sede y punto;
- total;
- saldo pendiente;
- actor;
- estado de pago relevante.

Los valores derivados no se editan libremente.

---

#### 59. Selección de medio

Cuando solo existe un medio aplicable y no requiere decisión adicional, la UI puede evitar un selector redundante.

Cuando existen varios medios aplicables:

```text
MOSTRAR SOLO OPCIONES AUTORIZADAS
→ ELEGIR MEDIO
→ MOSTRAR CONDICIONES MATERIALES
```

La disponibilidad de un botón nunca concede autoridad.

---

#### 60. Resumen antes del efecto

Antes de confirmar un cobro material, la experiencia permite verificar:

- venta u obligación;
- monto a cobrar;
- moneda;
- medio o tramos;
- actor/contexto;
- cambio estimado cuando aplique;
- cualquier diferencia material revalidada.

No exige revisar datos irrelevantes para el efecto.

---

#### 61. Recuperación al reabrir

Al volver a `VSCREEN-0084`, la superficie consulta el estado autoritativo antes de ofrecer un nuevo cobro.

Debe poder distinguir:

```text
SIN INTENTO
INTENTO PENDIENTE
INTENTO CON RESULTADO DESCONOCIDO
PAGO PARCIAL
PAGO CONFIRMADO
RECONCILIACION PENDIENTE
PAGO RECONCILIADO
```

No reconstruye verdad desde el último estado visual del navegador.

---

#### 62. Corrección posterior del medio

Una vez un pago fue capturado o confirmado, “cambiar el medio” no se implementa como edición destructiva de la fila original.

La corrección posterior requiere el flujo auditable propietario de compensación, reverso, anulación, devolución o reembolso según el hecho real.

`PULSO-UX-009` conserva esa separación detallada.

---

#### 63. Cancelación, reverso y refund quedan fuera

`pulso.payments.transactions.collect` no concede por implicación:

- cancelación de venta;
- reverso de transacción;
- devolución;
- reembolso;
- corrección destructiva del pago.

Cada efecto conserva PermissionKey, estado, motivo y trazabilidad propios.

---

#### 64. Cierre de caja queda fuera

Confirmar o reconciliar un pago no cierra la sesión de caja.

`PULSO-UX-010` recibe los movimientos resultantes y gobierna:

- fondo;
- ingresos;
- retiros;
- gastos;
- efectivo esperado;
- conteo;
- diferencia;
- aprobación;
- cierre.

---

#### 65. PASS queda separado

El resultado de pago puede ser una condición para efectos posteriores de fidelización, pero `VSCREEN-0084` no:

- mantiene ledger PASS;
- acredita puntos por sí sola;
- redime beneficios;
- convierte el medio de pago en identidad de cliente.

Las tareas de loyalty conservan sus owners.

---

#### 66. NUMERA queda separado

La confirmación del pago produce o alimenta un hecho económico correlacionable, pero PULSO no:

- crea asientos contables libres;
- declara conciliación bancaria final;
- edita libros;
- sustituye el owner financiero.

`PULSO-UX-017` conserva la conexión detallada con NUMERA.

---

#### 67. Handoff a la venta

Cuando `VPROC-0043` demuestra el resultado suficiente, PULSO puede reflejar el estado correspondiente sobre la venta sin perder la identidad del pago.

Regla:

```text
PAGO CONFIRMADO
→ ACTUALIZAR PROYECCION / ESTADO DE VENTA SEGUN CONTRATO

NO
PAGO CONFIRMADO
→ SOBRESCRIBIR HISTORIA DE LA VENTA
```

---

#### 68. Accesibilidad

La futura materialización debe conservar:

- total y saldo legibles;
- medio seleccionado identificable;
- acción principal clara;
- foco y navegación comprensibles;
- resultado no dependiente solo del color;
- errores asociados a la acción o tramo correspondiente;
- estado pendiente distinguible de fallo;
- información de cambio legible cuando aplique.

La especificación táctil detallada permanece en `PULSO-UX-015`.

---

#### 69. Flujo objetivo de pago simple

```text
RECURSO AUTORITATIVO
→ REVALIDAR TOTAL / SALDO
→ VALIDAR ACTOR + CONTEXTO + CAJA CUANDO APLIQUE
→ MOSTRAR MEDIOS PERMITIDOS
→ SELECCIONAR MEDIO
→ CONFIRMAR INTENCION
→ VPROC-0043
→ ESPERAR RESULTADO AUTORITATIVO
→ MOSTRAR RESULTADO
→ HANDOFFS POSTERIORES
```

---

#### 70. Flujo objetivo de pago combinado

```text
OBLIGACION TOTAL
→ DEFINIR TRAMO 1
→ COBRAR / CONFIRMAR TRAMO 1
→ RECALCULAR SALDO
→ DEFINIR TRAMO 2
→ COBRAR / CONFIRMAR TRAMO 2
→ ...
→ SALDO CUBIERTO
→ CONTINUAR RECONCILIACION
```

Un fallo en un tramo no elimina los confirmados ni duplica la obligación.

---

#### 71. Flujo objetivo ante timeout

```text
ENVIAR INTENCION
→ TIMEOUT / RESPUESTA AMBIGUA
→ MARCAR RESULTADO DESCONOCIDO
→ CONSULTAR POR REFERENCIA / IDENTIDAD
→ RECONCILIAR
→ SOLO SI SE DEMUESTRA AUSENCIA DE EFECTO, PERMITIR NUEVO INTENTO
```

---

#### 72. AS-IS de vento-pulso

El runtime actual inspeccionado conserva `/orders` como tablero operativo y expone `payment_status` dentro del recurso de pedido.

También contiene lógica que bloquea ciertas operaciones de domicilio cuando el pago online no aparece confirmado.

No se observa en el runtime actual inspeccionado:

- una superficie dedicada equivalente a `VSCREEN-0084`;
- un consumidor de `pulso.payments.transactions.collect`;
- un binding físico explícito a `VPROC-0043::STEP-COLLECT_PAYMENT`;
- un flujo UI completo de pagos parciales y medios combinados gobernado por `VPROC-0043`.

Por tanto:

```text
payment_status EN /orders
!=
VSCREEN-0084 MATERIALIZADA
```

---

#### 73. Brechas AS-IS y salida

| Brecha observada | Riesgo | Propietario | Condición de salida |
| --- | --- | --- | --- |
| no existe superficie física dedicada de cobro canónico | pago queda disperso en operación de pedidos | paquete PULSO / `PULSO-UX-021` | `VSCREEN-0084` materializada con contrato aprobado |
| no se observa consumidor de `pulso.payments.transactions.collect` | cobro puede depender de autorización broad o lógica indirecta | paquete PULSO + autorización | acción server-side consume PermissionKey exacta y pruebas allow/deny |
| `payment_status` existe como proyección operativa | un campo simple puede confundirse con verdad completa del pago | arquitectura PULSO | estado se deriva de proceso/efectos autoritativos y conserva referencias |
| pagos parciales/combinados no aparecen materializados integralmente | saldo o doble cobro inconsistentes | paquete PULSO | tramos correlacionados, saldo y recuperación certificados |
| secretos/proveedor requieren frontera server-side | exposición o autorización manipulable desde cliente | `AUTH-SRV-*` + paquete PULSO | proveedor y secretos permanecen en servidor con contrato probado |
| soporte fiscal y conciliación no forman una experiencia integral demostrada | cobrar de nuevo o perder correlación documental | integración POS / NUMERA | referencia, estado y reconciliación quedan correlacionados |
| corrección de medio posterior no tiene flujo manual auditable probado | historia financiera destructiva | `PULSO-UX-009` + autorización | compensación/reverso/refund usa flujo propietario auditable |

No queda brecha de esta tarea sin propietario y condición de salida.

---

#### 74. Resultado funcional de la simplificación

La simplificación no elimina estados financieros; elimina decisiones repetidas o técnicas de la superficie principal.

El actor ve:

```text
QUE SE ESTA COBRANDO
CUANTO FALTA
COMO SE PAGARA
QUE RESULTADO TUVO
QUE QUEDA PENDIENTE
```

mientras el sistema conserva por debajo autorización, correlación, estados, idempotencia y conciliación.

---

#### 75. Matriz de decisiones de cobro

| Decisión | Resultado |
| --- | --- |
| recurso | venta/obligación autoritativa; no texto libre |
| total | revalidado; no editable libremente |
| moneda | parte de la obligación y de cada efecto |
| actor | derivado del actor efectivo |
| sede/punto | contexto autorizado |
| caja | requerida solo cuando política/medio lo exijan; nunca abierta implícitamente |
| medio | solo opciones publicadas y aplicables |
| efectivo | soporta recibido/cambio bajo sesión compatible cuando aplique |
| pago parcial | conserva saldo; no marca total pagado |
| medios combinados | tramos independientes correlacionados a la misma obligación |
| pago electrónico | proveedor server-side; autorización/captura diferenciadas |
| timeout | resultado desconocido hasta reconciliación |
| doble toque | misma intención; no doble cobro |
| propina | no automática ni inventada sin política gobernada |
| documento fiscal | correlacionado y separado del pago |
| reimpresión | no repite cobro |
| refund/reverso | fuera; `PULSO-UX-009` |
| cierre de caja | fuera; `PULSO-UX-010` |
| NUMERA | handoff correlacionado; no contabilidad embebida |
| PASS | efecto posterior separado |

---

#### 76. Handoff inmediato a PULSO-UX-009

`PULSO-UX-009 — Separar anulación, devolución y reembolso` recibe:

```text
COBRO != REVERSO
PAGO CONFIRMADO != REFUND
CAMBIAR MEDIO DESPUES DE CAPTURA != EDITAR HISTORIA
INTENTO RECHAZADO != TRANSACCION A REEMBOLSAR
RESULTADO DESCONOCIDO SE RECONCILIA ANTES DE COMPENSAR
CADA EFECTO POSTERIOR REQUIERE AUTORIDAD PROPIA
```

La 009 no deberá corregir pagos confirmados sobrescribiendo el efecto original.

---

#### 77. Handoff al resto de PULSO-UX

| Tarea | Entrada exacta proveniente de PULSO-UX-008 |
| --- | --- |
| `PULSO-UX-009` | reverso, anulación, devolución y refund son efectos posteriores separados |
| `PULSO-UX-010` | cobros producen movimientos/saldos que la caja debe conciliar sin cerrarse implícitamente |
| `PULSO-UX-011` | acumulación solo consume una venta elegible y el resultado que su contrato requiera |
| `PULSO-UX-012` | redención no se mezcla con autoridad de cobro |
| `PULSO-UX-013` | cobro entrega recurso, importe, moneda, medio y actor para confirmación sensible proporcional |
| `PULSO-UX-014` | actor efectivo debe sobrevivir terminal compartida y sesión de caja |
| `PULSO-UX-015` | pantalla de cobro debe adaptar targets y densidad a operación táctil sin cambiar contrato |
| `PULSO-UX-017` | pago confirmado/reconciliable se correlaciona con NUMERA sin crear ledger paralelo |
| `PULSO-UX-018` | cliente/loyalty permanecen separados del medio y del proveedor de pago |
| `PULSO-UX-019` | validación operativa debe incluir simple, parcial, combinado, efectivo, electrónico y recuperación |
| `PULSO-UX-021` | arquitectura objetivo materializa `VSCREEN-0084`, `VPROC-0043`, permiso exacto y proveedor server-side |

---

#### 78. Requisitos de prueba derivados

**Resultado:** NO GENERA REQUISITOS DE PRUEBA.

**Requisitos creados:** 0
**Requisitos modificados:** 0
**Requisitos diferidos:** 0
**Requisitos obsoletos:** 0

Justificación: el Registro 04A vigente ya contiene cobertura explícita para cobro, pago, movimientos de caja, documento fiscal, pagos parciales, medios combinados, monto, moneda, proveedor, referencia, estado, actor, timeout, conciliación, acciones nombradas, autorización, seguridad, idempotencia y validación operativa; además, la fila vigente ya identifica expresamente esta tarea dentro de su cobertura.

---

#### 79. Cobertura de prueba vigente reutilizada

Se reutiliza sin modificación:

- `TREQ-PULSO-004` para acciones nombradas, permiso, sede, estado y columnas permitidas;
- `TREQ-PULSO-006` como cobertura principal de venta, cobro, pago, caja, documento fiscal, parciales, combinados, proveedor, referencia, timeout y conciliación;
- `TREQ-AUTH-001` para autorización por permiso, contexto y alcance;
- `TREQ-AUTH-013` para revalidación server-side frente a payload manipulado;
- `TREQ-AUTH-015` para evidencia correlacionable de actor, territorio, permiso, recurso y decisión;
- `TREQ-UX-001` para acción y estado identificables;
- `TREQ-UX-006` para recuperación segura;
- `TREQ-NUMERA-001` para mantener el hecho financiero bajo su dominio propietario;
- `TREQ-INTEGRATION-006` para captura única y ausencia de fuentes competidoras.

Esta enumeración es trazabilidad reutilizada y no modifica el Registro 04A.

---

#### 80. Evidencia de validación

| Clase | Estado | Evidencia |
| --- | --- | --- |
| BUILD | NOT_EXECUTED | El build documental corresponde al checkout después de incorporar el artefacto; esta tarea no materializa producto. |
| LOCAL | NOT_EXECUTED | Formato, quality, delivery, validadores de dominio y batería global quedan pendientes de la incorporación en el checkout local. |
| REMOTA | PASS | Se verificaron `main` vigente de `vento-shell`, protocolo, contrato de entrega, manifest, continuidad, topología `DEFINE_ONCE`, políticas de formato/desarrollo, archivo propietario, `PULSO-UX-007` aprobada como base anticipada, `VSCREEN-0084`, `VPROC-0043::STEP-COLLECT_PAYMENT`, estados y eventos de `VPROC-0043`, dataset operativo 1.0.0, Registro 04A PULSO aplicable y runtime actual de `vento-pulso`. |
| OPERATIVA | NOT_EXECUTED | No se procesaron ventas, cobros, pagos, efectivo, medios combinados, proveedores, documentos fiscales, caja, refunds ni conciliaciones reales. |
| FÍSICA | NOT_APPLICABLE | `PULSO-UX-008` no crea instancia física propia ni autoriza cambios de producto, datos, proveedores o infraestructura. |

---

#### 81. Criterios de aceptación

La tarea queda documentalmente completa cuando:

- [ ] `VSCREEN-0084` se conserva como identidad canónica única de cobro y medios de pago;
- [ ] `VPROC-0043::STEP-COLLECT_PAYMENT` permanece como binding principal;
- [ ] `pulso.payments.transactions.collect` queda como PermissionKey exacta;
- [ ] se registra que solo `cajero_satelite` y `operador_integral_satelite` tienen el grant publicado;
- [ ] ningún otro rol recibe cobro por inferencia;
- [ ] `pulso.access` no concede cobro;
- [ ] la obligación comercial existe antes de iniciar pago;
- [ ] resultado desconocido de creación se resuelve antes de cobrar;
- [ ] total y moneda se revalidan antes del efecto;
- [ ] el total no es editable libremente;
- [ ] solo se muestran medios permitidos;
- [ ] seleccionar medio no equivale a confirmar pago;
- [ ] autorización, captura y conciliación permanecen estados distintos;
- [ ] `AUTHORIZED` no equivale a `CAPTURED`;
- [ ] `CAPTURED` no equivale a `PAYMENT_RECONCILED`;
- [ ] soporte fiscal permanece separado del pago;
- [ ] pago reconciliado no cierra por sí solo venta, caja o entrega;
- [ ] los eventos `VPROC-0043.EVT-001..006` permanecen como secuencia canónica;
- [ ] efectivo conserva actor y caja compatible cuando aplica;
- [ ] cambio no se confunde con descuento o pago adicional;
- [ ] proveedor electrónico permanece server-side;
- [ ] pagos parciales conservan saldo pendiente;
- [ ] medios combinados conservan tramos independientes;
- [ ] un tramo fallido no borra tramos confirmados;
- [ ] propina no se inventa ni se aplica automáticamente;
- [ ] venta, pago, caja y documento fiscal permanecen hechos distintos;
- [ ] la pantalla no abre caja implícitamente;
- [ ] actor real se conserva en terminal compartida;
- [ ] una intención de cobro es idempotente;
- [ ] doble toque no duplica cobro;
- [ ] timeout no se interpreta como fallo ni rechazo;
- [ ] resultado desconocido se reconcilia antes de reintentar;
- [ ] rechazo explícito no se contabiliza como pago;
- [ ] fallo técnico no se presenta como rechazo financiero sin evidencia;
- [ ] operación degradada no fabrica confirmación;
- [ ] server-side revalida permiso, contexto, recurso, total, medio y estado;
- [ ] secretos de proveedor no se exponen en cliente;
- [ ] reimpresión no repite cobro;
- [ ] resultado del pago queda visible e inequívoco;
- [ ] corrección posterior del medio no sobrescribe historia;
- [ ] refund, reverso y devolución quedan fuera de `collect`;
- [ ] cierre de caja queda en `PULSO-UX-010`;
- [ ] NUMERA y PASS permanecen en sus owners;
- [ ] el runtime AS-IS se registra como no materializado para `VSCREEN-0084`;
- [ ] cada brecha AS-IS tiene propietario y condición de salida;
- [ ] `PULSO-UX-009` recibe handoff suficiente para compensaciones sin reescritura destructiva;
- [ ] no se crean ni modifican requisitos de prueba;
- [ ] no se ejecutan cambios físicos.

---

#### 82. Límites

Esta tarea no:

- implementa `VSCREEN-0084`;
- crea una ruta física nueva;
- modifica `/orders` ni otra página;
- crea componentes, Server Actions, RPC o Edge Functions;
- crea o cambia PermissionKeys;
- modifica grants, matrices o datasets;
- procesa cobros reales;
- configura proveedores de pago;
- almacena secretos;
- configura datáfonos;
- abre o cierra caja;
- modifica sesiones de caja;
- aplica descuentos;
- crea ventas;
- modifica pedidos genéricamente;
- anula ventas;
- procesa devoluciones;
- ejecuta refunds;
- ejecuta reversos;
- inventa reglas de propina;
- emite documentos fiscales por sí sola;
- crea asientos o conciliación contable;
- acredita o redime loyalty;
- cambia catálogo, oferta o precio maestro;
- modifica Supabase, RLS, tablas, datos, Realtime o migraciones;
- modifica packages compartidos;
- modifica el Registro 04A;
- crea instancia física;
- desarrolla `PULSO-UX-009`.

---

#### 83. Decisión final de experiencia

El cobro simplificado queda resumido así:

```text
VENTA / OBLIGACION AUTORITATIVA
→ REVALIDAR TOTAL Y SALDO
→ VALIDAR ACTOR + TERRITORIO + CAJA CUANDO APLIQUE
→ MOSTRAR SOLO MEDIOS PERMITIDOS
→ SELECCIONAR MEDIO O TRAMOS
→ CONFIRMAR UNA INTENCION CORRELACIONADA
→ VPROC-0043
→ ESPERAR RESULTADO AUTORITATIVO
→ NO REINTENTAR A CIEGAS
→ MOSTRAR CONFIRMACION / PENDIENTE / RECHAZO / UNKNOWN
→ CORRELACIONAR SOPORTE Y HANDOFFS SIN COLAPSAR DOMINIOS
```

La simplificación reduce decisiones redundantes para el operador; no reduce controles financieros.

---

#### 84. Continuidad

**ÚLTIMA TAREA APROBADA**
`PULSO-UX-007 — Simplificar creación de venta`

**TAREA ACTUAL APROBADA**
`PULSO-UX-008 — Simplificar cobro y medios de pago`

**SIGUIENTE TAREA RESERVADA**
`PULSO-UX-009 — Separar anulación, devolución y reembolso`
### ✅ PULSO-UX-009 — Separar anulación, devolución y reembolso

**Estado:** APROBADA
**Tarea anterior:** PULSO-UX-008 — Simplificar cobro y medios de pago
**Tarea siguiente:** PULSO-UX-010 — Diseñar apertura y cierre de caja
**Tipo de tarea:** diseño documental integral de `VSCREEN-0091 — Anulación, devolución y reembolso` para separar cancelación del compromiso comercial, devolución, reembolso, reverso de pago y compensaciones mediante `VPROC-0042::STEP-RESOLVE_REVERSAL_OR_REFUND`, consumiendo únicamente las PermissionKey activas `pulso.sales.orders.cancel`, `pulso.sales.returns.create`, `pulso.payments.transactions.refund` y `pulso.payments.transactions.reverse`, preservando historia, autorización `BASE_AND_OPERATIONAL`, segregación de efectos, idempotencia, reconciliación y ownership de inventario, fiscalidad, NUMERA y PASS; sin revivir `pulso.sales.orders.void`, sin editar destructivamente pedidos o pagos y sin materialización física; `DEFINE_ONCE` / `NO_PHYSICAL_INSTANCE`
**Bloque:** BLOQUE N — PULSO
**Repositorio propietario:** `vento-group-sas/vento-shell`
**Archivo propietario:** `docs/plan-canonico/modular/bloques/N_PULSO/02_EXPERIENCIA_POS_Y_OPERACION_COMERCIAL.md`
**Estado físico resultante:** `NO_PHYSICAL_INSTANCE`
**Cambios físicos autorizados:** ninguno; esta tarea no modifica código, rutas, pantallas, PermissionKeys, datasets, roles, grants, RLS, RPC, Server Actions, tablas, datos, Supabase, migraciones, packages, proveedores de pago, inventario, ledger PASS, NUMERA, documentos fiscales, secretos ni despliegues
**Requisitos de prueba creados o modificados:** 0

---

#### 1. Propósito

Separar de forma verificable los efectos que ocurren cuando una venta, pedido, pago o entrega necesitan corregirse después de haber adquirido estado empresarial, evitando que una única acción genérica destruya o sobrescriba la historia original.

La experiencia debe distinguir como mínimo:

```text
CANCELAR COMPROMISO
!=
ANULAR EFECTO CONSOLIDADO
!=
REGISTRAR DEVOLUCION
!=
REEMBOLSAR DINERO
!=
REVERSAR TRANSACCION DE PAGO
!=
COMPENSAR AL CLIENTE
```

La simplificación buscada consiste en guiar al actor hacia el efecto correcto a partir del recurso y su estado, no en fusionar efectos diferentes bajo un botón ambiguo.

---

#### 2. Handoff recibido de PULSO-UX-008

`PULSO-UX-008` entrega explícitamente:

```text
COBRO != REVERSO
PAGO CONFIRMADO != REFUND
CAMBIAR MEDIO DESPUES DE CAPTURA != EDITAR HISTORIA
INTENTO RECHAZADO != TRANSACCION A REEMBOLSAR
RESULTADO DESCONOCIDO SE RECONCILIA ANTES DE COMPENSAR
CADA EFECTO POSTERIOR REQUIERE AUTORIDAD PROPIA
```

Por tanto, esta tarea parte de un cobro que conserva intento, medio, monto, referencia y estado propios, y nunca corrige un pago confirmado sobrescribiendo la transacción original.

---

#### 3. Naturaleza y topología

La topología aplicable es:

```text
mode = DEFINE_ONCE
execution_gate = NO_PHYSICAL_INSTANCE
```

Consecuencias:

- la experiencia se define una sola vez;
- no crea una instancia física propia;
- no materializa `VSCREEN-0091`;
- no publica rutas ni componentes;
- no crea ni modifica PermissionKeys;
- no modifica datasets de autorización;
- no ejecuta cancelaciones, devoluciones, refunds ni reversos;
- no modifica Supabase;
- no autoriza implementación física.

---

#### 4. Fuentes de autoridad reconciliadas

La decisión consume como mínimo:

- `PULSO-UX-001..008`;
- `PULSO-AUTH-006..016`;
- `AUTH-CAT-022..024`;
- `vento.authorization.base-role-grants@1.1.0`;
- `vento.authorization.operational-role-grants@1.0.0`;
- `VSCREEN-0083`, `VSCREEN-0084` y `VSCREEN-0091`;
- `VPROC-0042`, `VPROC-0043`, `VPROC-0046` y `VPROC-0051`;
- estados y eventos canónicos de `VPROC-0042`;
- Registro 04A vigente de PULSO y PASS aplicable;
- contratos de integración que separan devolución, reembolso, inventario, fiscalidad, fidelización y efecto económico;
- runtime actual de `vento-pulso` como evidencia AS-IS, no como autoridad del diseño objetivo.

---

#### 5. Identidad canónica de la pantalla

La identidad existente es:

```text
VSCREEN-0091 — Anulación, devolución y reembolso
```

Su propósito canónico es gestionar anulaciones, devoluciones, compensaciones y reembolsos como acciones diferenciadas y auditables.

Esta tarea no crea pantallas paralelas denominadas “void”, “refund rápido”, “devolver venta” o equivalentes para evitar resolver la separación contractual.

---

#### 6. Binding principal de proceso

`VSCREEN-0091` conserva:

```text
PROCESO PRINCIPAL: VPROC-0042
PASO: VPROC-0042::STEP-RESOLVE_REVERSAL_OR_REFUND
FUNCION: CORRECT
FASE: DECISION
```

El proceso propietario es:

```text
VPROC-0042 — Gestionar modificación, sustitución, cancelación, anulación y devolución sin confundir sus efectos
```

---

#### 7. Procesos secundarios

`VSCREEN-0091` también se relaciona con:

```text
VPROC-0043 — pago
VPROC-0046 — reclamo, devolución y compensación
VPROC-0051 — efecto económico correlacionado
```

La relación secundaria no transfiere ownership.

Regla:

```text
UNA DECISION COMERCIAL
PUEDE REQUERIR VARIOS EFECTOS
PERO CADA EFECTO CONSERVA SU PROCESO Y AUTORIDAD
```

---

#### 8. PermissionKeys activas aplicables

El catálogo vigente expone exactamente estas claves sensibles para el núcleo de esta tarea:

```text
pulso.sales.orders.cancel
pulso.sales.returns.create
pulso.payments.transactions.refund
pulso.payments.transactions.reverse
```

Las cuatro están clasificadas como:

```text
BASE_AND_OPERATIONAL
```

Ninguna se sustituye por `pulso.pos.main`, `pulso.access`, `orders.update`, `payments.collect` o una condición de UI.

---

#### 9. Reconciliación de la identidad histórica `orders.void`

Una definición histórica de `PULSO-AUTH-008` utilizó la identidad propuesta:

```text
pulso.sales.orders.void
```

El catálogo activo y los datasets publicados posteriores no contienen esa PermissionKey. En cambio, publican:

```text
pulso.sales.orders.cancel
pulso.sales.returns.create
pulso.payments.transactions.refund
pulso.payments.transactions.reverse
```

Por tanto, esta tarea:

- no revive `pulso.sales.orders.void`;
- no crea un alias silencioso hacia ella;
- no introduce una quinta capacidad sensible;
- usa las identidades publicadas vigentes y expresa “anulación” como semántica empresarial compuesta por el efecto exacto que corresponda al recurso.

---

#### 10. Regla raíz de autorización dual

Para cualquiera de las cuatro PermissionKeys sensibles:

```text
COMPONENTE BASE
+
COMPONENTE OPERATIVO
+
MISMO ACTOR HUMANO
+
MISMO PERMISO
+
MISMO RECURSO
+
MISMA SOLICITUD
+
CONTEXTO VIGENTE
+
REAUTENTICACION FUERTE
+
MOTIVO
+
EVIDENCIA
+
CONTROL DE VERSION
+
AUDITORIA
=
ACCION SENSIBLE AUTORIZABLE
```

Un solo componente nunca autoriza la acción.

---

#### 11. Componentes base publicados

`vento.authorization.base-role-grants@1.1.0` publica componente base para las cuatro capacidades a exactamente:

```text
propietario
gerente_general
gerente
```

No publica componente base para:

```text
supervisor
auxiliar_administrativa
contador
marketing
trabajador_operativo
```

El rol base `supervisor` no obtiene estas acciones por jerarquía, proximidad ni responsabilidad de revisión.

---

#### 12. Componentes operativos publicados

`vento.authorization.operational-role-grants@1.0.0` publica componente operativo para las cuatro capacidades a exactamente:

```text
cajero_satelite
gerencia_operativa
operador_integral_satelite
```

Cada fila es `OPERATIONAL_COMPONENT`, no una autorización autónoma.

No existe componente operativo publicado para `servicio_salon`, `mostrador_satelite`, `barista_satelite`, `cocinero_satelite` u otros roles operativos.

---

#### 13. Composición por el mismo actor

La autorización no permite “sumar” dos personas.

Está prohibido:

```text
ACTOR A CON COMPONENTE BASE
+
ACTOR B CON COMPONENTE OPERATIVO
=
AUTORIZADO
```

La composición debe ocurrir en el mismo actor humano efectivo y para la misma solicitud/recurso.

Esto conserva segregación sin crear aprobación por credenciales prestadas o mezcla de identidades.

---

#### 14. Actor que originó la venta no se autoautoriza

Haber creado, cobrado, preparado o entregado una venta no concede automáticamente autoridad para revertirla.

Regla:

```text
ORIGINAR O EJECUTAR VENTA
!=
APROBAR SU REVERSO O COMPENSACION
```

`VPROC-0042` admite aprobación condicional según sensibilidad y umbral; esa decisión no se deriva del ownership histórico de la operación.

---

#### 15. Matriz semántica principal

| Efecto | Objeto principal | PermissionKey activa | Resultado mínimo | No implica |
| --- | --- | --- | --- | --- |
| cancelación | pedido/compromiso comercial cancelable | `pulso.sales.orders.cancel` | compromiso deja de continuar conforme a estado válido | refund, retorno físico, borrado de historia |
| devolución | líneas/unidades elegibles | `pulso.sales.returns.create` | expediente/efecto de devolución correlacionado | restock automático, refund automático |
| reembolso | pago original elegible | `pulso.payments.transactions.refund` | devolución monetaria total o parcial correlacionada | devolución física, anulación fiscal automática |
| reverso de pago | transacción elegible para reversión | `pulso.payments.transactions.reverse` | efecto inverso propio del ciclo de pago | refund genérico, cancelación del pedido |
| anulación | decisión empresarial sobre un compromiso o efecto consolidado | se descompone en la PermissionKey exacta del efecto necesario | historia preservada y efectos coordinados | permiso broad `void`, borrado destructivo |
| compensación | resultado de servicio/comercial separado | contrato propietario correspondiente | efecto explícito y trazable | refund por implicación |

---

#### 16. Cancelación de pedido

`pulso.sales.orders.cancel` actúa sobre un pedido o compromiso comercial identificable y todavía cancelable bajo su estado y reglas.

La acción debe conservar:

- pedido original;
- estado previo;
- actor;
- motivo;
- instante autoritativo;
- identidad de solicitud;
- resultado;
- efectos ya emitidos que deban reconciliarse.

Cancelar no significa borrar.

---

#### 17. Cancelación no equivale a reembolso

Un pedido puede cancelarse sin que exista un pago capturado.

También puede existir un pago que, por su estado, requiera refund o reverse después de cancelar el compromiso.

Por tanto:

```text
ORDER_CANCELLED
!=
PAYMENT_REFUNDED
```

La UI no presenta una cancelación exitosa como dinero devuelto si el efecto financiero no fue confirmado.

---

#### 18. Cancelación no equivale a devolución

La cancelación opera sobre continuidad del compromiso comercial.

La devolución opera sobre bienes, líneas o unidades ya entregadas, recibidas o sujetas a retorno según el caso.

```text
CANCELAR PEDIDO
!=
RECIBIR DEVOLUCION
```

Un pedido cancelado antes de entrega puede no requerir retorno físico alguno.

---

#### 19. Anulación como categoría empresarial

“Anulación” describe la decisión de dejar sin continuidad o compensar un efecto ya consolidado según su naturaleza.

No constituye una PermissionKey broad adicional.

La experiencia debe resolver primero qué existe realmente:

```text
PEDIDO
PAGO
DEVOLUCION
DOCUMENTO FISCAL
ENTREGA
LOYALTY
HECHO ECONOMICO
```

Luego solicita únicamente los efectos necesarios y autorizados para ese conjunto.

---

#### 20. Anulación nunca elimina evidencia

La anulación no:

- borra el pedido original;
- borra el pago original;
- reescribe el precio histórico;
- elimina eventos previos;
- transforma un refund en edición de monto;
- elimina el actor que ejecutó la operación;
- oculta preparación, entrega o inventario ya afectados.

Se conserva lineage entre origen, decisión y efectos compensatorios.

---

#### 21. Devolución comercial

`pulso.sales.returns.create` registra una devolución sobre líneas, cantidades o unidades elegibles de una venta/pedido conocido.

Debe permitir reconstruir conceptualmente:

- venta/pedido origen;
- línea o unidad afectada;
- cantidad;
- motivo;
- condición cuando sea aplicable;
- actor solicitante;
- actor ejecutor;
- autorización;
- instante;
- estado de la devolución;
- efectos posteriores requeridos.

Los nombres físicos de tablas y columnas pertenecen a la materialización posterior.

---

#### 22. Devolución parcial

Una devolución puede afectar solo una parte de la venta.

La UI debe impedir que una cantidad devuelta acumulada exceda lo realmente elegible después de considerar devoluciones previas, sustituciones, entregas y estado actual.

```text
CANTIDAD A DEVOLVER
<=
CANTIDAD ELEGIBLE RESTANTE
```

La validación final es server-side.

---

#### 23. Devolución no implica restock

Aceptar o registrar una devolución no demuestra que el bien deba volver a inventario vendible.

El recurso puede estar:

- consumido;
- preparado;
- dañado;
- abierto;
- contaminado;
- incompleto;
- sujeto a descarte;
- sujeto a evaluación.

Por tanto:

```text
RETURN ACCEPTED
!=
STOCK RESTORED
```

El efecto de inventario pertenece al contrato propietario de NEXO/PULSO correspondiente.

---

#### 24. Reembolso

`pulso.payments.transactions.refund` actúa exclusivamente sobre un pago original identificable y elegible.

Debe validar como mínimo:

- transacción origen;
- monto original;
- monto ya reembolsado;
- monto solicitado;
- moneda;
- medio/proveedor cuando aplique;
- referencia original;
- estado actual;
- actor;
- motivo;
- identidad idempotente;
- contexto y territorio;
- autorización dual completa.

---

#### 25. Reembolso parcial y total

La misma PermissionKey cubre refund total o parcial.

No se crean permisos diferentes por monto.

La regla económica mínima es:

```text
REFUND_SOLICITADO
<=
SALDO_REEMBOLSABLE_VIGENTE
```

El saldo reembolsable se calcula desde hechos autoritativos, no desde un valor editable de interfaz.

---

#### 26. Reembolso no equivale a devolución

Puede existir devolución física sin refund inmediato o con otro resultado comercial autorizado.

También puede existir refund sin retorno físico cuando el contrato comercial lo permita.

Por tanto:

```text
RETURN
!=
REFUND
```

La UI puede coordinar ambos efectos, pero nunca fingir que uno demuestra el otro.

---

#### 27. Reembolso no equivale a compensación

Un cupón, crédito futuro, cortesía, sustitución, puntos u otra compensación no se registra como refund monetario.

```text
REFUND
!=
CREDIT
!=
COUPON
!=
POINTS ADJUSTMENT
!=
REPLACEMENT
```

Cada resultado conserva autoridad, owner y evidencia propios.

---

#### 28. Reverso de pago

`pulso.payments.transactions.reverse` representa un efecto de reversión sobre una transacción de pago elegible de acuerdo con su estado y mecanismo.

No se usa como alias universal de refund.

La diferencia se conserva así:

```text
REVERSE
→ REVIERTE UNA TRANSACCION ELEGIBLE SEGUN SU CICLO

REFUND
→ DEVUELVE VALOR DE UN PAGO ORIGINAL ELEGIBLE
```

La materialización deberá determinar elegibilidad desde el estado real del pago/proveedor.

---

#### 29. Pago rechazado no es reembolsable

Un intento rechazado que nunca produjo captura o valor confirmado no se convierte en refund solo porque el cliente esperaba pagar.

```text
REJECTED PAYMENT
!=
CAPTURED VALUE
```

La interfaz debe mostrar el resultado real y evitar crear una operación compensatoria inexistente.

---

#### 30. Resultado desconocido antes de compensar

Si el estado del cobro original es desconocido:

```text
UNKNOWN PAYMENT RESULT
!=
FAILED
!=
CAPTURED
```

Antes de cancelar efectos financieros, refundar o reversar, debe reconciliarse el resultado original.

Nunca:

```text
TIMEOUT DE COBRO
→ REFUND CIEGO
```

---

#### 31. Resultado desconocido de refund o reverse

El mismo principio se aplica al efecto compensatorio.

Si un refund/reverse fue enviado y la respuesta se perdió:

- no se asume fallo;
- no se crea otro intento independiente;
- se consulta/reconcilia con la misma identidad estable;
- se conserva estado pendiente o desconocido hasta evidencia autoritativa.

---

#### 32. Corrección de medio de pago

Cambiar el medio mostrado después de una captura no corrige el hecho original.

La experiencia debe distinguir:

```text
ERROR DE CAPTURA LOCAL ANTES DEL EFECTO
!=
PAGO YA CONFIRMADO CON MEDIO INCORRECTO
```

Cuando el pago ya existe, cualquier corrección debe usar un flujo auditable que preserve transacción original, efecto compensatorio y nuevo pago si corresponde.

No se edita destructivamente `payment_method` para esconder la historia.

---

#### 33. Máquina de estados VPROC-0042

`VPROC-0042` conserva exactamente ocho estados:

```text
ORDER_CHANGE_REQUESTED
UNDER_VALIDATION
IMPACT_ASSESSMENT
AUTHORIZATION_PENDING
APPROVED_FOR_APPLICATION
APPLYING_CHANGES
RECONCILIATION_PENDING
COMMERCIAL_CHANGE_RECONCILED
```

La UI no inventa estados alternos de “anulado” o “refund completo” como sustitución de la máquina propietaria.

---

#### 34. Nacimiento de la solicitud

La instancia nace en:

```text
VPROC-0042.ORDER_CHANGE_REQUESTED
```

con una condición mínima:

- pedido o venta identificable;
- solicitante;
- cambio requerido;
- motivo.

Invariante:

```text
REGISTRAR SOLICITUD
!=
APLICAR CAMBIO
```

La solicitud por sí sola no altera cantidad, estado, inventario, pago ni entrega.

---

#### 35. Validación

`UNDER_VALIDATION` verifica antes de decidir:

- recurso correcto;
- estado actual;
- actor;
- motivo;
- alcance;
- timing;
- autoridad aplicable;
- conflictos con efectos existentes.

Una solicitud inválida no avanza a mutación parcial.

---

#### 36. Evaluación de impacto

`IMPACT_ASSESSMENT` calcula qué dominios pueden verse afectados antes de autorizar.

El análisis debe considerar según aplicabilidad:

- preparación;
- inventario;
- pago;
- caja;
- documento fiscal;
- cliente;
- entrega;
- PASS;
- NUMERA;
- terceros.

La existencia de posibles efectos no significa que todos se ejecuten.

---

#### 37. Autorización pendiente

`AUTHORIZATION_PENDING` expresa que la acción propuesta espera decisión conforme a su sensibilidad.

La aprobación condicional de `VPROC-0042` no reemplaza la PermissionKey exacta.

Se requieren ambas capas cuando apliquen:

```text
DECISION/APROBACION DE PROCESO
+
AUTORIZACION TECNICA/EMPRESARIAL DEL EFECTO
```

---

#### 38. Aprobada para aplicación

`APPROVED_FOR_APPLICATION` no significa que el efecto ya ocurrió.

```text
APPROVED
!=
APPLIED
```

La UI debe distinguir autorización otorgada de ejecución confirmada.

---

#### 39. Aplicación de cambios

`APPLYING_CHANGES` coordina efectos autorizados sin sobrescribir el compromiso original.

Cada efecto debe devolver su resultado propio.

No se declara éxito global mientras un efecto obligatorio permanezca desconocido o pendiente de reconciliación.

---

#### 40. Conciliación

`RECONCILIATION_PENDING` compara, según el caso:

- pedido;
- devolución;
- pago/refund/reverse;
- inventario;
- preparación;
- documento fiscal;
- PASS;
- NUMERA;
- notificaciones;
- entrega.

La conciliación detecta divergencias; no las oculta editando el origen.

---

#### 41. Cierre de cambio comercial

`COMMERCIAL_CHANGE_RECONCILED` se alcanza únicamente cuando los efectos exigidos por la decisión fueron aplicados y comparados o cuando los pendientes residuales tienen destino explícito permitido por el proceso.

El cierre no transforma la solicitud en una reescritura del pedido original.

---

#### 42. Eventos canónicos de VPROC-0042

Se conservan exactamente seis eventos:

```text
VPROC-0042.EVT-001 — order-change-requested
VPROC-0042.EVT-002 — under-validation
VPROC-0042.EVT-003 — authorization-pending
VPROC-0042.EVT-004 — applying-changes
VPROC-0042.EVT-005 — reconciliation-pending
VPROC-0042.EVT-006 — commercial-change-reconciled
```

No se crea un evento paralelo por cada botón de UI cuando el proceso canónico ya representa el hecho.

---

#### 43. Preservación de historia

Todo efecto posterior debe referenciar suficientemente el origen.

Conceptualmente se conserva:

```text
ORIGINAL
+
DECISION
+
EFECTO COMPENSATORIO
+
RESULTADO
```

No:

```text
ORIGINAL MUTADO HASTA PARECER QUE NUNCA OCURRIO
```

---

#### 44. Idempotencia por efecto

Cada acción sensible requiere una identidad estable de solicitud/intento.

Repetir por doble toque, retry, callback, webhook o respuesta perdida debe converger sobre el mismo efecto cuando represente la misma intención empresarial.

La idempotencia de un refund no se reutiliza para una devolución ni para un reverse distinto.

---

#### 45. Concurrencia

Antes de ejecutar, el servidor revalida el estado actual y los efectos ya aplicados.

Ejemplos de conflictos a bloquear o reconciliar:

- dos refunds simultáneos que excederían el saldo reembolsable;
- dos devoluciones de la misma cantidad restante;
- cancelación mientras el pedido avanza a un estado incompatible;
- reverse y refund concurrentes sobre la misma transacción;
- una decisión basada en una versión anterior del recurso.

---

#### 46. Control de versión

Las cuatro capacidades sensibles publicadas exigen control de versión.

La UI puede conservar una versión/etag/referencia equivalente, pero la autoridad final revalida server-side.

Un conflicto stale produce un resultado explícito; no fuerza la mutación con el estado viejo.

---

#### 47. Motivo obligatorio

Toda acción de esta superficie debe conservar un motivo empresarial estructurado o una combinación de categoría y detalle permitidos suficiente para auditoría.

El motivo:

- no concede autoridad;
- no sustituye evidencia;
- no debe codificar secretos;
- no se usa para introducir otra operación por texto libre.

---

#### 48. Reautenticación fuerte

Los datasets vigentes exigen reautenticación fuerte para estas capacidades `BASE_AND_OPERATIONAL`.

La futura UX debe solicitarla en el momento proporcional a la acción sensible y vincularla al actor y solicitud actuales.

Una reautenticación previa no permanece reutilizable después de cambio de actor, recurso, permiso o solicitud materialmente distinta.

---

#### 49. Confirmación proporcional

La confirmación de UI debe explicar el efecto que se ejecutará.

Ejemplos conceptuales:

```text
CANCELAR PEDIDO
DEVOLVER 2 UNIDADES
REEMBOLSAR 38.000 COP
REVERSAR TRANSACCION IDENTIFICADA
```

Se evita el CTA ambiguo “ANULAR TODO” cuando en realidad pueden existir varios efectos independientes.

La especificación transversal de confirmaciones sensibles permanece en `PULSO-UX-013`.

---

#### 50. Composición visual mínima

`VSCREEN-0091` se organiza en cuatro zonas lógicas:

1. recurso y estado origen;
2. efecto solicitado y alcance;
3. impacto/efectos relacionados;
4. autorización, confirmación y resultado.

La superficie no se convierte en editor libre de pedido, pago, inventario o ledger.

---

#### 51. Contexto de origen visible

Antes de confirmar, la pantalla muestra de forma suficiente:

- venta/pedido;
- estado;
- líneas o unidades afectadas cuando aplique;
- pago/transacción original cuando aplique;
- monto y moneda cuando aplique;
- cliente únicamente cuando sea necesario;
- sede/punto;
- actor efectivo.

El contexto visible no es editable para ampliar territorio o cambiar el recurso objetivo.

---

#### 52. Selector de efecto gobernado

La UI solo ofrece efectos compatibles con el estado actual y la autoridad del actor.

No muestra una lista universal de acciones sensibles y luego confía en que el usuario “sepa cuál usar”.

```text
RECURSO + ESTADO + AUTORIDAD + REGLAS
→ EFECTOS ELEGIBLES
```

---

#### 53. Cancelación antes de pago

Cuando el pedido es cancelable y no existe un valor capturado que requiera compensación, la experiencia puede cerrar la decisión sin inventar refund.

La ausencia de efecto financiero debe quedar explícita.

---

#### 54. Cancelación con pago existente

Cuando existe pago confirmado, cancelar el pedido no resuelve automáticamente el dinero.

La pantalla debe mostrar que existe un efecto financiero pendiente y dirigirlo al contrato correspondiente de refund/reverse según elegibilidad.

El pedido no se presenta como “totalmente resuelto” mientras ese efecto obligatorio permanezca abierto.

---

#### 55. Devolución con pago existente

Una devolución puede requerir refund parcial, total u otro resultado comercial aprobado.

La relación se conserva explícitamente:

```text
RETURN_ID / RETURN_EFFECT
↔
ORIGINAL SALE
↔
OPTIONAL REFUND EFFECT
```

No se usa el monto del refund como única prueba de qué mercancía regresó.

---

#### 56. Devolución después de entrega

Si la venta ya fue entregada, la devolución no retrocede ficticiamente el evento de entrega.

Se registra un nuevo hecho posterior.

```text
DELIVERED
→ RETURN REQUEST/RETURN EFFECT
```

no:

```text
DELIVERED
→ PRETENDER QUE NUNCA SE ENTREGO
```

---

#### 57. Preparación y FOGO

Si el pedido ya produjo preparación, una cancelación o devolución no elimina esa historia ni ordena a FOGO retroceder estados por escritura lateral.

Cualquier efecto productivo, merma, reproceso o disposición pertenece a su contrato propietario.

La UI únicamente muestra/coordina el handoff necesario.

---

#### 58. Inventario y NEXO

Esta tarea no descuenta ni reintegra inventario directamente.

Cuando el efecto comercial requiera movimiento físico:

- se emite/solicita el efecto propietario;
- se conserva correlación con la devolución/cancelación;
- se evita doble movimiento;
- se espera confirmación cuando sea necesaria para conciliación.

`PULSO-UX-016` conserva la integración detallada venta–inventario.

---

#### 59. Fiscalidad

Cancelar, devolver, refundar o reversar no modifica directamente un documento fiscal por implicación.

Si el caso requiere anulación fiscal, nota crédito, documento de ajuste u otra acción del proveedor autorizado:

- se conserva el documento original;
- se ejecuta el contrato fiscal propietario;
- se vincula referencia y estado;
- la ausencia de soporte fiscal pendiente no se oculta.

---

#### 60. NUMERA

PULSO no reescribe el hecho económico de NUMERA.

El efecto comercial/financiero se correlaciona para que NUMERA registre o consuma el hecho correspondiente según su contrato.

```text
REFUND EN PULSO
!=
EDITAR ASIENTO HISTORICO EN NUMERA
```

`PULSO-UX-017` conserva la integración detallada.

---

#### 61. PASS y fidelización

Si la venta original produjo acumulación, redención o beneficio, una devolución/refund puede requerir ajuste, reversión o compensación de loyalty.

PULSO no edita el ledger PASS directamente.

```text
PULSO SOLICITA EFECTO CORRELACIONADO
PASS DECIDE Y REGISTRA LEDGER
```

`PULSO-UX-018` conserva la integración detallada.

---

#### 62. Reclamo y VPROC-0046

Una devolución puede originarse en un reclamo, pero `VSCREEN-0091` no absorbe el expediente completo de servicio al cliente.

`VPROC-0046` conserva investigación, compensación y cierre de reclamo cuando apliquen.

La relación con `VSCREEN-0091` es un handoff de decisión/efecto, no una fusión de procesos.

---

#### 63. Entrega y logística

Una devolución relacionada con entrega conserva la identidad de entrega, prueba y novedad originales.

El retorno físico, recolección o transporte pertenece al owner logístico correspondiente cuando exista.

Un refund exitoso no demuestra que la devolución logística se completó.

---

#### 64. Caja

Refund o reverse pueden producir efectos conciliables en caja, pero esta tarea no abre, cierra, reabre ni corrige sesiones de caja.

`PULSO-UX-010` conserva:

- apertura;
- movimientos;
- efectivo esperado;
- conteo;
- diferencia;
- cierre;
- reapertura/corrección conforme a autoridad.

El efecto de 009 debe llegar a 010 como hecho trazable, no como edición silenciosa del saldo.

---

#### 65. Soportes y reimpresión

Generar, mostrar o reimprimir un soporte de cancelación/devolución/refund no repite el efecto empresarial.

```text
PRINT / REPRINT
!=
EXECUTE AGAIN
```

La impresión usa la identidad del resultado ya confirmado.

---

#### 66. Validación server-side obligatoria

La futura ejecución revalida como mínimo:

- actor humano efectivo;
- componente base y operativo del mismo actor;
- PermissionKey exacta;
- turno/check-in/contexto cuando aplique;
- territorio;
- recurso origen;
- estado actual;
- versión;
- motivo;
- reautenticación;
- elegibilidad de líneas/cantidades/montos;
- efectos previos;
- idempotencia;
- denegaciones;
- referencias de proveedor cuando apliquen.

El payload del cliente nunca es autoridad.

---

#### 67. Errores de negocio distinguibles

La experiencia distingue al menos:

- sin autoridad dual completa;
- reautenticación inválida/expirada;
- recurso no encontrado o fuera de territorio;
- estado ya no elegible;
- versión stale;
- cantidad no retornable;
- saldo no reembolsable suficiente;
- transacción no reversible;
- efecto ya aplicado;
- conflicto concurrente;
- resultado desconocido;
- dependencia externa pendiente;
- fallo técnico.

No todos se presentan como “no se pudo anular”.

---

#### 68. Operación degradada

La pérdida de conectividad puede conservar un borrador de solicitud sin efecto empresarial cuando el contrato lo permita.

No se presenta como ejecutada una cancelación, devolución, refund o reverse hasta contar con confirmación autoritativa o con un protocolo offline explícito posterior que demuestre aceptación durable.

Esta tarea no inventa un modo offline financiero.

---

#### 69. Privacidad y minimización

`VSCREEN-0091` carga únicamente los datos necesarios para decidir y ejecutar el efecto actual.

No requiere por defecto:

- historial completo del cliente;
- ledger PASS completo;
- ventas de otras sedes;
- logs técnicos irrelevantes;
- datos laborales ajenos;
- credenciales de proveedor;
- secretos de pago;
- información NUMERA no necesaria.

---

#### 70. Accesibilidad

La futura materialización debe conservar:

- efecto seleccionado claramente identificado;
- motivo asociado a la acción;
- alcance y monto legibles antes de confirmar;
- warnings no dependientes solo de color;
- foco predecible en confirmaciones;
- estado pendiente, confirmado, rechazado y desconocido diferenciados;
- recuperación sin doble ejecución.

---

#### 71. Evidencia y auditoría

Cada solicitud/efecto sensible debe permitir reconstruir según aplicabilidad:

- actor;
- roles/contexto efectivos;
- permiso;
- recurso origen;
- efecto solicitado;
- motivo;
- aprobación/reautenticación;
- estado/versión previa;
- monto/cantidad;
- correlación/idempotencia;
- proveedor/referencia externa;
- resultado;
- efectos relacionados;
- timestamp autoritativo.

La auditoría no se obtiene de texto de UI ni de logs de navegador.

---

#### 72. AS-IS de vento-pulso

El runtime actual observado conserva la cancelación como operación `mark_cancelled` dentro de `/orders` y usa el tablero operativo compartido.

También expone `payment_status` y puede mostrar el label `refunded`.

No se observa en el runtime inspeccionado:

- superficie `VSCREEN-0091`;
- consumer de `pulso.sales.orders.cancel`;
- consumer de `pulso.sales.returns.create`;
- consumer de `pulso.payments.transactions.refund`;
- consumer de `pulso.payments.transactions.reverse`;
- flujo físico de devolución;
- acción de refund;
- acción de reverse.

Por tanto, estado visible o transición legacy no equivalen a materialización del contrato objetivo.

---

#### 73. Brechas AS-IS y salida

| Brecha observada | Riesgo | Propietario | Condición de salida |
| --- | --- | --- | --- |
| `/orders` usa `mark_cancelled` dentro de transición operativa compartida | cancelación puede depender de autoridad broad y semántica genérica | paquete PULSO + autorización | cancelación consume PermissionKey exacta, motivo, dualidad y estado elegible |
| no existe `VSCREEN-0091` físico | acciones sensibles quedan dispersas o ausentes | `PULSO-UX-021` / paquete PULSO | superficie objetivo materializada con binding aprobado |
| no hay consumer exacto de las cuatro PermissionKeys | catálogo publicado no gobierna runtime observado | PULSO + autorización | acciones server-side consumen claves exactas |
| `refunded` existe como label de estado pero no acción observada | proyección puede aparentar capacidad inexistente | paquete PULSO | refund implementado como efecto nombrado, idempotente y auditado |
| no se observa flujo de devolución | mercancía y dinero podrían confundirse | PULSO + NEXO + integración | `returns.create` y efecto físico quedan correlacionados sin restock implícito |
| no se observa reverse de pago | corrección puede caer en edición destructiva o refund incorrecto | PULSO + proveedor de pago | `transactions.reverse` se ejecuta solo cuando el estado original sea elegible |
| efectos fiscal/NUMERA/PASS/inventario son externos a esta tarea | cierre aparente con dominios divergentes | `PULSO-UX-016/017/018` + contratos propietarios | efectos posteriores exactamente-una-vez y reconciliados |

No queda brecha de esta tarea sin propietario y condición de salida.

---

#### 74. Resultado funcional de GAP-PULSO asociado

La familia histórica de reversión deja de tratarse como una mutación genérica.

Queda descompuesta en:

```text
PEDIDO / COMPROMISO
→ orders.cancel

DEVOLUCION
→ returns.create

PAGO REEMBOLSABLE
→ transactions.refund

PAGO REVERSABLE
→ transactions.reverse
```

Los efectos físicos, fiscales, contables y de loyalty permanecen coordinados pero separados.

---

#### 75. Matriz de decisiones de simplificación

| Pregunta | Respuesta objetivo |
| --- | --- |
| ¿qué estoy corrigiendo? | recurso real y estado actual, no un “status” genérico |
| ¿cancelar devuelve dinero? | no por implicación |
| ¿devolver repone inventario? | no por implicación |
| ¿refund demuestra devolución? | no |
| ¿reverse es refund? | no |
| ¿anulación borra historia? | no |
| ¿puedo editar el medio confirmado? | no; se compensa/corrige con hechos nuevos |
| ¿un intento rechazado se refunda? | no |
| ¿timeout significa fallo? | no; reconciliar |
| ¿cajero ordinario basta? | no; las claves requieren composición `BASE_AND_OPERATIONAL` |
| ¿gerencia_operativa basta? | no; aporta solo componente operativo |
| ¿supervisor base basta? | no; no posee componente base publicado para estas claves |
| ¿dos personas pueden sumar componentes? | no; mismo actor, permiso, recurso y solicitud |
| ¿la UI decide autoridad? | no; servidor revalida |

---

#### 76. Handoff inmediato a PULSO-UX-010

`PULSO-UX-010 — Diseñar apertura y cierre de caja` recibe:

```text
REFUND / REVERSE PUEDEN AFECTAR CONCILIACION DE CAJA
PERO NO ABREN NI CIERRAN SESION POR IMPLICACION
MOVIMIENTO DE CAJA != PAYMENT ORIGINAL
CIERRE DE CAJA DEBE CONSUMIR EFECTOS CONFIRMADOS Y PENDIENTES
RESULTADO DESCONOCIDO NO PUEDE OCULTARSE EN EL ARQUEO
REAPERTURA/CORRECCION DE CAJA CONSERVA CONTRATO PROPIO
```

009 no diseña el lifecycle completo de caja.

---

#### 77. Handoff al resto de PULSO-UX

| Tarea | Entrada exacta proveniente de PULSO-UX-009 |
| --- | --- |
| `PULSO-UX-010` | refunds/reversos son hechos conciliables separados del lifecycle de caja |
| `PULSO-UX-011` | acumulación previa puede requerir efecto compensatorio posterior, no edición de saldo |
| `PULSO-UX-012` | redención previa puede requerir reversión/compensación PASS con ledger propietario |
| `PULSO-UX-013` | confirmación sensible debe identificar efecto, alcance, monto/cantidad y actor |
| `PULSO-UX-014` | autorización dual y reautenticación deben sobrevivir terminal compartida sin mezclar actores |
| `PULSO-UX-015` | UX táctil no puede facilitar doble ejecución por toques repetidos |
| `PULSO-UX-016` | devolución/cancelación puede solicitar efecto de inventario sin restock implícito |
| `PULSO-UX-017` | refund/reverse se correlacionan con hecho económico sin editar historia |
| `PULSO-UX-018` | efectos de loyalty se realizan mediante PASS, no ledger lateral PULSO |
| `PULSO-UX-019` | validación operativa debe probar casos de cancelación, devolución, refund y reverse separados |
| `PULSO-UX-020` | prototipo histórico no redefine la semántica por tener un botón o status |
| `PULSO-UX-021` | arquitectura objetivo materializa `VSCREEN-0091`, PermissionKeys exactas y coordinación de efectos |

---

#### 78. Requisitos de prueba derivados

**Resultado:** NO GENERA REQUISITOS DE PRUEBA.

**Requisitos creados:** 0
**Requisitos modificados:** 0
**Requisitos diferidos:** 0
**Requisitos obsoletos:** 0
**Fragmentos del Registro 04A afectados:** 0

Justificación: el registro vigente ya exige acciones nombradas y autorizadas para cancelación, anulación, devolución y reembolso; separación entre pedido, pago, caja, fiscalidad, inventario y fidelización; preservación de historia; efectos exactamente-una-vez; autorización contextual; idempotencia; reconciliación; devoluciones y compensaciones diferenciadas. Esta tarea especializa UX, PermissionKeys activas y handoffs sobre obligaciones ya registradas.

---

#### 79. Cobertura de prueba vigente reutilizada

Se reutiliza sin modificar el Registro 04A:

- `TREQ-PULSO-004` para mutaciones mediante acciones nombradas, estado, permiso y columnas permitidas;
- `TREQ-PULSO-005` para preservar versión original y separar pedido, pago, fiscalidad, inventario y fidelización;
- `TREQ-PULSO-006` para venta, pago, caja, anulación, devolución, reembolso y compensación como hechos separados y auditables;
- `TREQ-PULSO-007` para devolución/entrega sin duplicación de efectos;
- `TREQ-PASS-009` para idempotencia y eventos de pago/webhook sin doble cancelación o reembolso;
- `TREQ-PASS-010` para reversión/compensación de loyalty mediante ledger inmutable;
- `TREQ-PASS-011` para devolución, reembolso, reemplazo, descuento y compensación como resultados distintos;
- `TREQ-AUTH-008` para composición correcta de autoridad base y operativa;
- `TREQ-AUTH-013` para revalidación server-side frente a cliente manipulado;
- `TREQ-AUTH-015` para evidencia correlacionable de actor, territorio, permiso, recurso y decisión;
- `TREQ-INTEGRATION-003` para idempotencia, correlación y retry de efectos;
- `TREQ-INTEGRATION-014` para coordinación de efectos de devolución entre dominios;
- `TREQ-UX-005` y `TREQ-UX-006` para feedback y recuperación segura.

Esta enumeración es trazabilidad reutilizada y no modifica el Registro 04A.

---

#### 80. Evidencia de validación

| Clase | Estado | Evidencia |
| --- | --- | --- |
| BUILD | NOT_EXECUTED | El build documental corresponde al checkout después de incorporar el artefacto; esta tarea no materializa producto. |
| LOCAL | NOT_EXECUTED | Formato, quality, delivery, validadores de dominio y batería global quedan pendientes de la incorporación en el checkout local. |
| REMOTA | PASS | Se verificaron `main` vigente de `vento-shell`, topología, catálogo y datasets de autorización, `VSCREEN-0091`, binding `VPROC-0042::STEP-RESOLVE_REVERSAL_OR_REFUND`, ocho estados y seis eventos de `VPROC-0042`, cobertura 04A y runtime actual de `vento-pulso`; también se reconcilió la identidad histórica `orders.void` contra las PermissionKeys activas publicadas. |
| OPERATIVA | NOT_EXECUTED | No se cancelaron pedidos, no se crearon devoluciones, no se ejecutaron refunds/reversos, no se movió inventario, no se tocaron documentos fiscales, caja, NUMERA ni PASS. |
| FÍSICA | NOT_APPLICABLE | `PULSO-UX-009` no crea instancia física propia ni autoriza cambios de producto, datos o infraestructura. |

---

#### 81. Criterios de aceptación

La tarea queda documentalmente completa cuando:

- [ ] `VSCREEN-0091` permanece como identidad canónica de anulación, devolución y reembolso;
- [ ] `VPROC-0042::STEP-RESOLVE_REVERSAL_OR_REFUND` permanece como binding principal;
- [ ] se conservan los ocho estados canónicos de `VPROC-0042`;
- [ ] se conservan los seis eventos canónicos de `VPROC-0042`;
- [ ] `orders.void` histórico no se revive como PermissionKey activa;
- [ ] cancelación usa `pulso.sales.orders.cancel` cuando el efecto pertenece al pedido;
- [ ] devolución usa `pulso.sales.returns.create`;
- [ ] refund usa `pulso.payments.transactions.refund`;
- [ ] reverse usa `pulso.payments.transactions.reverse`;
- [ ] las cuatro claves permanecen `BASE_AND_OPERATIONAL`;
- [ ] componente base publicado se limita a `propietario`, `gerente_general` y `gerente`;
- [ ] componente operativo publicado se limita a `cajero_satelite`, `gerencia_operativa` y `operador_integral_satelite`;
- [ ] ambos componentes pertenecen al mismo actor, permiso, recurso y solicitud;
- [ ] `supervisor` base no adquiere estas acciones por jerarquía;
- [ ] `servicio_salon` y `mostrador_satelite` no adquieren componente operativo por proximidad;
- [ ] originar/cobrar una venta no autoautoriza reversión o compensación;
- [ ] registrar solicitud no aplica efectos;
- [ ] aprobación no equivale a ejecución;
- [ ] cancelación no implica refund;
- [ ] cancelación no implica devolución;
- [ ] devolución no implica restock;
- [ ] devolución no implica refund;
- [ ] refund no implica devolución;
- [ ] refund no equivale a compensación;
- [ ] reverse no equivale a refund;
- [ ] intento rechazado no se trata como transacción reembolsable;
- [ ] resultado desconocido se reconcilia antes de compensar;
- [ ] timeout de refund/reverse no dispara segundo intento ciego;
- [ ] refund parcial respeta saldo reembolsable vigente;
- [ ] devolución parcial respeta cantidad elegible restante;
- [ ] concurrencia no permite doble efecto;
- [ ] estado stale produce conflicto controlado;
- [ ] motivo es obligatorio pero no concede autoridad;
- [ ] reautenticación fuerte queda vinculada al actor/solicitud;
- [ ] historia original no se edita destructivamente;
- [ ] entrega previa no se borra por devolución;
- [ ] preparación previa no se borra por cancelación;
- [ ] inventario usa contrato propietario;
- [ ] fiscalidad usa contrato propietario;
- [ ] NUMERA conserva hechos propios;
- [ ] PASS conserva ledger propio;
- [ ] caja consume efectos confirmados sin fusionar lifecycle;
- [ ] runtime AS-IS se registra como no materializado para `VSCREEN-0091` y PermissionKeys exactas;
- [ ] cada brecha AS-IS tiene propietario y condición de salida;
- [ ] no se crean ni modifican requisitos de prueba;
- [ ] no se ejecutan cambios físicos.

---

#### 82. Límites

Esta tarea no:

- implementa `VSCREEN-0091`;
- crea una ruta física;
- modifica `/orders`;
- modifica `mark_cancelled`;
- crea componentes, Server Actions, RPC o Edge Functions;
- crea o cambia PermissionKeys;
- revive `pulso.sales.orders.void`;
- modifica grants, matrices o datasets;
- asigna nuevos roles;
- ejecuta cancelaciones reales;
- ejecuta devoluciones reales;
- ejecuta refund real;
- ejecuta reverse real;
- cambia medio de pago histórico;
- borra pedido o pago original;
- modifica inventario;
- ejecuta restock;
- modifica preparación FOGO;
- anula documentos fiscales;
- crea notas crédito;
- modifica hechos NUMERA;
- modifica ledger PASS;
- abre, cierra o reabre cajas;
- define el detalle completo de `PULSO-UX-010`;
- modifica Supabase, RLS, tablas, datos, Realtime o migraciones;
- modifica packages compartidos;
- modifica el Registro 04A;
- crea instancia física.

---

#### 83. Decisión final de experiencia

La separación queda resumida así:

```text
IDENTIFICAR RECURSO + ESTADO + ACTOR
→ REGISTRAR SOLICITUD SIN EFECTO
→ EVALUAR IMPACTO
→ RESOLVER AUTORIDAD DUAL DEL MISMO ACTOR
→ REAUTENTICAR + MOTIVO + VERSION
→ ELEGIR SOLO EFECTOS EXACTOS NECESARIOS
   orders.cancel
   returns.create
   transactions.refund
   transactions.reverse
→ EJECUTAR CADA EFECTO DE FORMA IDEMPOTENTE
→ RECONCILIAR INVENTARIO / FISCAL / NUMERA / PASS CUANDO APLIQUE
→ CERRAR CAMBIO COMERCIAL SIN REESCRIBIR HISTORIA
```

La simplicidad consiste en hacer evidente qué se está corrigiendo y qué efecto ocurrirá; no en colapsar operaciones distintas.

---

#### 84. Continuidad

**ÚLTIMA TAREA APROBADA**
`PULSO-UX-008 — Simplificar cobro y medios de pago`

**TAREA ACTUAL APROBADA**
`PULSO-UX-009 — Separar anulación, devolución y reembolso`

**SIGUIENTE TAREA RESERVADA**
`PULSO-UX-010 — Diseñar apertura y cierre de caja`
### ✅ PULSO-UX-010 — Diseñar apertura y cierre de caja

**Estado:** APROBADA
**Tarea anterior:** PULSO-UX-009 — Separar anulación, devolución y reembolso
**Tarea siguiente:** PULSO-UX-011 — Integrar acumulación de puntos
**Tipo de tarea:** diseño documental integral de `VSCREEN-0089 — Apertura de caja` y `VSCREEN-0090 — Cierre de caja` sobre `VPROC-0044`, separando apertura de sesión, fondo, movimientos, efectivo esperado, conteo, diferencia, conciliación y cierre; reconciliando la autoridad vigente de `pulso.cash.sessions.start` y `pulso.cash.sessions.close` con los datasets posteriores de `AUTH-CAT-023`; preservando sesión personal, idempotencia, actor real, sede, punto de caja, historia y fronteras con pagos, NUMERA y supervisión; sin inventar una PermissionKey de reapertura ni materialización física; `DEFINE_ONCE` / `NO_PHYSICAL_INSTANCE`
**Bloque:** BLOQUE N — PULSO
**Repositorio propietario:** `vento-group-sas/vento-shell`
**Archivo propietario:** `docs/plan-canonico/modular/bloques/N_PULSO/02_EXPERIENCIA_POS_Y_OPERACION_COMERCIAL.md`
**Estado físico resultante:** `NO_PHYSICAL_INSTANCE`
**Cambios físicos autorizados:** ninguno; esta tarea no modifica código, pantallas runtime, PermissionKeys, datasets, roles, grants, RLS, RPC, Server Actions, tablas, datos, Supabase, migraciones, packages, pagos, documentos fiscales, NUMERA, dispositivos, secretos ni despliegues
**Requisitos de prueba creados o modificados:** 0

---

#### 1. Propósito

Diseñar la experiencia canónica de apertura y cierre de caja de PULSO como un lifecycle financiero-operativo explícito, separado de venta, pago, documento fiscal, inventario, fidelización y contabilidad.

La tarea debe dejar cerrado que:

- abrir caja crea una sesión operativa atribuible;
- la sesión pertenece a un actor humano y un contexto de caja compatibles;
- el fondo inicial es un hecho de la sesión y no una venta;
- los movimientos de caja se registran sin editar ventas o pagos;
- el efectivo esperado se deriva de hechos confirmados;
- el efectivo contado es una observación independiente;
- la diferencia se calcula y conserva como hecho;
- el cierre no fuerza coincidencia mediante edición destructiva;
- los resultados desconocidos permanecen visibles y conciliables;
- NUMERA consume hechos confirmados sin convertirse en propietario de la sesión;
- el cierre ordinario de la propia sesión no se confunde con reapertura, cierre forzado o aprobación excepcional.

---

#### 2. Handoff recibido de PULSO-UX-009

`PULSO-UX-009` entrega a esta tarea:

```text
REFUND / REVERSE PUEDEN AFECTAR CONCILIACION DE CAJA
PERO NO ABREN NI CIERRAN SESION POR IMPLICACION
MOVIMIENTO DE CAJA != PAYMENT ORIGINAL
CIERRE DE CAJA DEBE CONSUMIR EFECTOS CONFIRMADOS Y PENDIENTES
RESULTADO DESCONOCIDO NO PUEDE OCULTARSE EN EL ARQUEO
REAPERTURA/CORRECCION DE CAJA CONSERVA CONTRATO PROPIO
```

Por tanto, esta tarea consume refund y reverse únicamente como hechos conciliables del cierre.

No vuelve a definir su autorización ni sus semánticas.

---

#### 3. Naturaleza y topología

La topología vigente para `PULSO-UX-010` es:

```text
mode = DEFINE_ONCE
execution_gate = NO_PHYSICAL_INSTANCE
```

Consecuencias:

- el diseño se define una sola vez;
- no existe instancia física propia;
- no se crea una sesión real;
- no se abre ni cierra una caja real;
- no se crean tablas o RPC;
- no se modifican permisos;
- no se ejecuta conciliación real;
- no se altera `vento-pulso`;
- no se altera Supabase;
- no se emiten hechos contables.

---

#### 4. Fuentes de autoridad reconciliadas

El diseño consume, sin renombrar ni sustituir:

- `VSCREEN-0089 — Apertura de caja`;
- `VSCREEN-0090 — Cierre de caja`;
- `VSCREEN-0093 — Revisión de ventas, caja y terminales` como superficie separada de revisión;
- `VPROC-0044 — Cerrar caja y conciliar ventas, pagos, efectivo, diferencias y responsables`;
- `VPROC-0044::STEP-OPEN_CASH_SESSION — Abrir caja`;
- `VPROC-0044::STEP-CLOSE_CASH_SESSION — Cerrar y conciliar caja`;
- `VPROC-0044::STEP-REVIEW_SALES_AND_TERMINALS — Revisar ventas, caja y terminales`;
- el catálogo vigente de permisos PULSO;
- `operational-role-grants@1.0.0`;
- la reconciliación posterior de `AUTH-CAT-022`, `AUTH-CAT-023` y `AUTH-CAT-024`;
- el proceso económico `VPROC-0051` como consumidor relacionado de NUMERA;
- `TREQ-PULSO-006` como cobertura ya vigente del ciclo de caja;
- los hallazgos `H-CAP-SCOPE-009-018` y `H-CAP-SCOPE-009-023`;
- el runtime vigente de `vento-pulso` únicamente como evidencia AS-IS.

---

#### 5. Identidades canónicas de pantalla

La tarea gobierna exactamente dos superficies:

| Pantalla | Nombre | Propósito |
| --- | --- | --- |
| `VSCREEN-0089` | Apertura de caja | abrir una caja o jornada con responsable, fondo, terminal, sede y controles requeridos |
| `VSCREEN-0090` | Cierre de caja | conciliar ventas, medios, soportes y diferencias antes de cerrar la jornada de caja |

Estas superficies no se fusionan en un único formulario reversible.

---

#### 6. Binding principal de proceso

Los bindings canónicos son:

```text
VSCREEN-0089
→ VPROC-0044
→ VPROC-0044::STEP-OPEN_CASH_SESSION
→ INITIATE / INITIAL

VSCREEN-0090
→ VPROC-0044
→ VPROC-0044::STEP-CLOSE_CASH_SESSION
→ CLOSE / TERMINAL
```

La apertura inicia responsabilidad de caja.

El cierre finaliza una jornada únicamente cuando la conciliación aplicable quedó demostrada.

---

#### 7. Superficie de revisión separada

`VSCREEN-0093 — Revisión de ventas, caja y terminales` permanece separada:

```text
VSCREEN-0093
→ VPROC-0044::STEP-REVIEW_SALES_AND_TERMINALS
→ REVIEW / CROSS_CUTTING
```

Revisar:

- no abre caja;
- no cierra caja;
- no cambia el actor propietario;
- no aprueba automáticamente diferencias;
- no modifica ventas o pagos.

---

#### 8. PermissionKeys activas aplicables

La experiencia ordinaria de esta tarea consume exactamente estas PermissionKeys activas:

```text
pulso.cash.sessions.start
pulso.cash.sessions.close
```

No se crea una tercera identidad para arqueo, diferencia o reapertura desde esta tarea.

---

#### 9. Reconciliación de autoridad histórica

Documentación anterior dejó momentos distintos del diseño de autorización.

La autoridad vigente se resuelve con la reconciliación posterior:

```text
PULSO-AUTH HISTORICO
+
AUTH-CAT-022 / AUTH-CAT-023 / AUTH-CAT-024
+
DATASET OPERACIONAL VIGENTE
=
AUTORIDAD ACTUAL
```

Por tanto, queda superada para este diseño cualquier cláusula histórica que afirme que `cajero_satelite` no posee `pulso.cash.sessions.close`.

El dataset vigente sí publica cierre ordinario como `OPERATIONAL_ONLY` para la propia sesión compatible.

---

#### 10. Autoridad de apertura

`pulso.cash.sessions.start` es:

```text
OPERATIONAL_ONLY
DIRECT_OPERATIONAL
```

Se publica para:

- `cajero_satelite`;
- `operador_integral_satelite`.

No necesita un componente base adicional.

---

#### 11. Autoridad de cierre

`pulso.cash.sessions.close` es:

```text
OPERATIONAL_ONLY
DIRECT_OPERATIONAL
```

Se publica para:

- `cajero_satelite`;
- `operador_integral_satelite`.

La autoridad se limita a una sesión compatible con el contexto efectivo del actor.

---

#### 12. Matriz de autoridad ordinaria

| Actor operativo | `cash.sessions.start` | `cash.sessions.close` | Resultado |
| --- | --- | --- | --- |
| `cajero_satelite` | ALLOW | ALLOW | puede abrir y cursar cierre ordinario de su propia sesión compatible |
| `operador_integral_satelite` | ALLOW | ALLOW | puede abrir y cursar cierre ordinario cuando la función de caja esté activa |
| `gerencia_operativa` | NO GRANT DIRECTO | NO GRANT DIRECTO | revisión o coordinación no equivale a operar una caja propia |
| otros roles operativos | NO INFERIR | NO INFERIR | fail-closed salvo concesión canónica explícita |

---

#### 13. Sesión personal

La sesión de caja es personal.

La condición canónica exige:

```text
ACTOR HUMANO IDENTIFICADO
+
TURNO PUBLICADO Y VIGENTE
+
CHECK-IN ACTIVO
+
ROL OPERATIVO COMPATIBLE
+
SEDE COMPATIBLE
+
AREA O PUNTO DE CAJA COMPATIBLE
+
RECURSO VIGENTE
+
TRANSICION IDEMPOTENTE
+
AUDITORIA
```

No puede reutilizarse la identidad de otro actor.

---

#### 14. Operador y supervisor no son intercambiables

La revisión de caja puede involucrar supervisión, pero:

```text
OPERAR CAJA
!=
REVISAR CAJA
!=
APROBAR UNA DIFERENCIA
```

`gerencia_operativa` no obtiene `cash.start` o `cash.close` por jerarquía.

La ausencia del cajero no convierte automáticamente al supervisor en propietario de su sesión.

---

#### 15. Apertura y cierre son acciones distintas

```text
START
!=
CLOSE
```

Abrir una sesión no concede por implicación cerrar cualquier sesión.

Cerrar una sesión no concede crear otra, reabrir una cerrada o alterar la apertura anterior.

---

#### 16. Propósito de VSCREEN-0089

`VSCREEN-0089` debe permitir confirmar que el actor está entrando a una sesión de caja válida antes de operar ventas y efectivo.

La pantalla muestra únicamente información necesaria para:

- actor efectivo;
- sede;
- punto o terminal;
- turno;
- fondo inicial cuando aplique;
- advertencias incompatibles;
- resultado de la apertura.

---

#### 17. Condiciones mínimas de apertura

La apertura debe fallar cerrado si no puede demostrarse:

- actor humano efectivo;
- turno vigente;
- check-in activo;
- rol con `pulso.cash.sessions.start`;
- sede compatible;
- área o punto de caja compatible;
- terminal o recurso de caja válido cuando aplique;
- inexistencia de una sesión incompatible ya abierta;
- identidad idempotente de la operación;
- auditoría del resultado.

---

#### 18. Fondo inicial

El fondo inicial pertenece a la sesión de caja.

No es:

- venta;
- pago;
- ingreso comercial;
- hecho fiscal;
- hecho NUMERA reconocido por sí solo.

Debe conservarse como parte reconstruible de la apertura y del cálculo posterior de efectivo esperado.

---

#### 19. Apertura no implícita

Crear la primera venta, cobrar el primer pedido o entrar a PULSO no abre una caja de forma implícita.

```text
PULSO ACCESS
!=
CASH SESSION START
```

La sesión debe existir por una acción nombrada y autorizada.

---

#### 20. Sesiones incompatibles

La experiencia debe impedir que una segunda apertura silenciosa o un cambio de contexto cree dos sesiones incompatibles para el mismo actor, punto o periodo operativo.

Si ya existe una sesión aplicable:

- se recupera su contexto;
- o se presenta el conflicto;
- pero no se crea otra por retry o doble toque.

---

#### 21. Idempotencia de apertura

Reintentar la misma intención de apertura debe converger al mismo resultado empresarial.

Una respuesta perdida no autoriza crear una nueva sesión sin consultar la identidad vigente.

La UI no genera autoridad a partir de un estado local optimista.

---

#### 22. Movimientos de caja

Durante una sesión, PULSO conserva el historial de movimientos que explican el efectivo y otros valores bajo responsabilidad de caja.

La experiencia diferencia, según exista autoridad propietaria:

- fondo inicial;
- cobros confirmados;
- cambio entregado cuando aplique;
- refund o reverse confirmados que afecten caja;
- ingresos o retiros explícitos autorizados;
- gastos o salidas autorizadas;
- ajustes derivados de una corrección propietaria.

Ninguno se representa editando el total de la sesión.

---

#### 23. No se inventan PermissionKeys para movimientos

El catálogo activo consultado publica `cash.sessions.start` y `cash.sessions.close`, pero no una familia adicional de PermissionKeys de movimiento de caja desde esta tarea.

Por tanto:

- el diseño puede mostrar y conciliar movimientos existentes;
- no inventa permisos ejecutables para retiros, gastos o ajustes;
- cualquier mutación futura de esas familias debe consumir una identidad canónica publicada por su propietario antes de habilitarse.

---

#### 24. Efectivo esperado

El efectivo esperado se calcula desde hechos autorizados y confirmados.

Conceptualmente:

```text
FONDO DE APERTURA
+
ENTRADAS CONFIRMADAS DE EFECTIVO
-
SALIDAS CONFIRMADAS DE EFECTIVO
=
EFECTIVO ESPERADO
```

La UI no permite editar manualmente ese resultado para hacerlo coincidir con el conteo.

---

#### 25. Efectivo contado

El efectivo contado es una observación del actor durante el cierre.

Debe permanecer separado de:

- efectivo esperado;
- ventas totales;
- pagos electrónicos;
- soportes fiscales;
- liquidación de proveedor;
- saldo económico de NUMERA.

---

#### 26. Diferencia

La diferencia se deriva de valores autoritativos:

```text
DIFERENCIA = EFECTIVO CONTADO - EFECTIVO ESPERADO
```

No se captura como valor libre destinado a reemplazar uno de los componentes.

---

#### 27. Diferencia es un hecho

Una diferencia distinta de cero:

- se conserva;
- exige tratamiento visible;
- mantiene responsable y evidencia;
- no desaparece al cerrar una ventana;
- no se convierte automáticamente en ajuste.

La historia debe permitir reconstruir cómo se obtuvo.

---

#### 28. Diferencia no crea compensación automática

Una diferencia no produce por inferencia:

- movimiento compensatorio;
- asiento contable;
- ingreso extraordinario;
- salida de efectivo;
- descuento laboral;
- corrección de venta;
- corrección de pago.

Cada efecto posterior conserva su propietario y autoridad.

---

#### 29. Propósito de VSCREEN-0090

`VSCREEN-0090` guía el cierre de la sesión propia mediante una secuencia verificable:

```text
REVISAR SESION
→ CONTAR
→ COMPARAR
→ REVISAR PENDIENTES
→ TRATAR DIFERENCIA
→ CONCILIAR
→ CERRAR
```

No presenta un único botón de «cuadrar» que oculte pasos o resultados.

---

#### 30. Condiciones mínimas de cierre

`pulso.cash.sessions.close` debe validar, como mínimo:

- sesión existente;
- sesión abierta o equivalente vigente;
- sede compatible;
- actor efectivo propietario;
- turno y contexto válidos;
- movimientos asociados;
- pagos pendientes de conciliación;
- efectivo esperado calculado por servidor;
- efectivo contado capturado;
- diferencia calculada por servidor;
- idempotencia;
- timestamp autoritativo;
- auditoría.

---

#### 31. Resultado desconocido de pago

Una operación de pago con resultado desconocido no puede convertirse en cero ni en «fallida» para forzar el cierre.

Debe permanecer visible como pendiente de conciliación.

El cierre solo puede avanzar conforme al contrato de excepción aplicable.

---

#### 32. Refund y reverse

Los efectos confirmados de `refund` o `reverse` pueden modificar la conciliación de la caja.

No modifican el pago original.

El cierre consume:

- hecho original;
- efecto compensatorio confirmado;
- estado pendiente cuando exista incertidumbre;
- correlación entre ambos.

---

#### 33. Propinas y otros componentes

El cierre debe poder explicar los componentes que afecten la jornada, incluidos cuando apliquen:

- ventas;
- pagos;
- efectivo;
- cambio;
- propinas;
- documentos;
- refunds;
- reversos;
- pendientes.

La tarea no inventa una fuente histórica para propinas ni modifica su contrato propietario.

---

#### 34. Documento fiscal

Documento fiscal y caja permanecen separados.

```text
CASH CLOSE
!=
FISCAL CLOSE
```

PULSO conserva referencias y estados necesarios para la conciliación, pero no finge emisión o anulación fiscal.

---

#### 35. Frontera con NUMERA

PULSO conserva:

- apertura;
- movimientos;
- arqueo;
- diferencias;
- cierre.

NUMERA consume hechos económicos confirmados.

```text
PULSO CIERRA SESION OPERATIVA
→ EMITE/EXPONE HECHOS CONFIRMADOS
→ NUMERA REGISTRA Y CONCILIA SEGUN SU CONTRATO
```

NUMERA no reescribe la sesión para hacerla cuadrar.

---

#### 36. Máquina de estados VPROC-0044

La máquina publicada de `VPROC-0044` contiene exactamente ocho estados:

| Orden | Estado | Tipo |
| ---: | --- | --- |
| 0 | `CASH_CLOSE_OPENED` | `INITIAL` |
| 1 | `COUNTING` | `INTERMEDIATE` |
| 2 | `SALES_RECONCILIATION_IN_PROGRESS` | `INTERMEDIATE` |
| 3 | `DIFFERENCE_UNDER_REVIEW` | `INTERMEDIATE` |
| 4 | `SUPERVISOR_APPROVAL_PENDING` | `INTERMEDIATE` |
| 5 | `DEPOSIT_PREPARING` | `INTERMEDIATE` |
| 6 | `FINANCIAL_RECONCILIATION_PENDING` | `INTERMEDIATE` |
| 7 | `CASH_SESSION_CLOSED` | `FINAL_NORMAL` |

---

#### 37. `CASH_CLOSE_OPENED`

El estado inicial del workflow de cierre exige una sesión, turno o periodo de caja finalizable con responsable y fecha de corte.

Abrir el caso de cierre:

- no confirma valores;
- no confirma diferencias;
- no confirma depósito;
- no confirma conciliación.

---

#### 38. `COUNTING`

`COUNTING` representa el conteo de efectivo y otros valores bajo responsabilidad del cierre.

El conteo es una observación.

No altera movimientos previos.

---

#### 39. `SALES_RECONCILIATION_IN_PROGRESS`

En este estado se comparan:

- ventas;
- pagos;
- devoluciones;
- anulaciones;
- documentos.

No se reescribe ninguno de esos hechos para obtener coincidencia.

---

#### 40. `DIFFERENCE_UNDER_REVIEW`

Este estado existe cuando hay una diferencia documentada pendiente de explicación y decisión.

La UI debe mostrar:

- esperado;
- contado;
- diferencia;
- hechos relevantes;
- razón o evidencia cuando corresponda.

---

#### 41. `SUPERVISOR_APPROVAL_PENDING`

El estado conserva la necesidad de validación autorizada cuando el cierre o sus diferencias lo requieran.

Esta tarea no inventa una PermissionKey de aprobación.

La presencia del estado tampoco concede al supervisor autoridad por nombre de rol.

---

#### 42. `DEPOSIT_PREPARING`

Este estado representa valores aceptados en preparación para custodia o depósito.

No significa que el depósito bancario o traslado de custodia ya ocurrió.

La evidencia posterior debe conservarse en su contrato propietario.

---

#### 43. `FINANCIAL_RECONCILIATION_PENDING`

Este estado conserva la espera por correlación con:

- banco cuando corresponda;
- caja general;
- registros económicos;
- otros resultados financieros aplicables.

No permite declarar la sesión económicamente conciliada por ausencia de respuesta.

---

#### 44. `CASH_SESSION_CLOSED`

El cierre final normal exige que ventas, pagos, efectivo, movimientos, conteos, diferencias y entrega de custodia aplicables estén conciliados y aprobados.

El estado final:

- conserva evidencia;
- impide alterar ventas o pagos para forzar coincidencia;
- no sustituye el registro contable;
- no autoriza una reapertura implícita.

---

#### 45. Eventos canónicos de VPROC-0044

`VPROC-0044` publica exactamente seis eventos:

| Evento | Tipo |
| --- | --- |
| `VPROC-0044.EVT-001` / `cash-close-opened` | `PROCESS_STARTED` |
| `VPROC-0044.EVT-002` / `counting` | `EXECUTION_FACT` |
| `VPROC-0044.EVT-003` / `difference-under-review` | `ANALYSIS_FACT` |
| `VPROC-0044.EVT-004` / `supervisor-approval-pending` | `DECISION_FACT` |
| `VPROC-0044.EVT-005` / `financial-reconciliation-pending` | `RECONCILIATION_FACT` |
| `VPROC-0044.EVT-006` / `cash-session-closed` | `PROCESS_COMPLETED` |

---

#### 46. Sensibilidad de eventos

Los seis eventos de `VPROC-0044` son:

```text
RESTRICTED_FINANCIAL
```

Por tanto, la experiencia no expone detalle financiero innecesario a actores, dispositivos o logs que no lo requieran.

---

#### 47. Apertura operativa y estados de cierre

Existe una distinción contractual importante:

- `VSCREEN-0089` y `STEP-OPEN_CASH_SESSION` modelan la apertura operativa de la sesión;
- la máquina de estados generada de `VPROC-0044` publicada actualmente comienza en `CASH_CLOSE_OPENED` y describe el lifecycle del cierre.

Esta tarea no inventa un `CASH_SESSION_OPEN` dentro de esa máquina.

La sesión abierta es precondición material del workflow de cierre.

---

#### 48. Aprobación no se deduce de `cash.close`

El permiso `pulso.cash.sessions.close` permite cursar el cierre ordinario de la propia sesión.

No convierte al mismo actor en aprobador de una diferencia sensible cuando el proceso exige revisión separada.

La segregación se mantiene aunque la UI reúna información en la misma superficie.

---

#### 49. Reapertura no es PermissionKey activa

Documentación histórica propuso `pulso.cash.sessions.reopen`, pero el catálogo activo consultado para esta tarea no publica esa PermissionKey.

Por tanto:

```text
REOPEN ACTIVO = NO DEMOSTRADO
```

La UI de 010 no expone una acción ejecutable de reapertura.

---

#### 50. Corrección posterior al cierre

Una corrección posterior al cierre, cuando exista contrato canónico futuro, debe preservar:

- cierre original;
- valores originales;
- diferencia original;
- actor original;
- nueva acción;
- nuevo actor;
- motivo;
- versión;
- correlación.

No se implementa como edición de la sesión cerrada.

---

#### 51. Cierre forzado

El cierre forzado por abandono, indisponibilidad o contingencia no se trata como alias de `cash.sessions.close`.

Mientras no exista autoridad canónica específica:

```text
DEFAULT_DENY
```

No se habilita desde esta tarea.

---

#### 52. Cierre de la propia sesión

El cierre ordinario se limita a la sesión compatible del actor.

No habilita:

- cerrar la caja de otro trabajador;
- tomar ownership de una sesión ajena;
- cambiar actor para superar una restricción;
- cerrar una sesión de otra sede;
- cerrar una sesión de otro punto sin autoridad.

---

#### 53. Sede, punto y terminal

La experiencia siempre muestra y revalida el contexto efectivo de caja.

Un `site_id`, terminal elegida, QR, parámetro UI o selección de usuario puede seleccionar dentro de autoridad ya existente, pero nunca ampliarla.

---

#### 54. Terminal compartida

En terminal compartida:

```text
DEVICE IDENTITY
!=
HUMAN ACTOR
```

`PULSO-UX-014` conserva el diseño completo de identificación del actor real.

010 exige que apertura y cierre queden atribuidos al trabajador efectivo.

---

#### 55. Operación degradada

Ante pérdida de red o autoridad externa no disponible, la experiencia puede conservar captura local pendiente únicamente cuando un contrato propietario lo permita.

No debe:

- fingir cierre confirmado;
- crear totales autoritativos desde cache no confiable;
- descartar pendientes;
- convertir timeout en cero diferencia.

El cierre definitivo requiere reconciliación demostrable.

---

#### 56. Realtime

Realtime puede actualizar:

- ventas;
- pagos;
- movimientos;
- pendientes;
- estado de sesión.

Realtime no concede autoridad y no confirma por sí solo un cierre.

---

#### 57. Concurrencia

Si dos clientes intentan cerrar la misma sesión:

- la transición se revalida contra estado actual;
- el mismo intento idempotente converge;
- un intento incompatible recibe conflicto;
- no se crean dos cierres finales.

---

#### 58. Frescura y control de versión

Antes del efecto final, el servidor revalida:

- sesión;
- actor;
- sede;
- estado;
- movimientos;
- pagos;
- conteo;
- diferencia;
- pendientes;
- autoridad.

Una pantalla abierta con datos antiguos no autoriza cerrar sobre un snapshot stale incompatible.

---

#### 59. Validación server-side obligatoria

La UI nunca es autoridad final.

El servidor debe decidir:

```text
ACTOR
+
PERMISSIONKEY
+
TURNO
+
CHECK-IN
+
TERRITORIO
+
SESION
+
ESTADO
+
FRESCURA
+
IDEMPOTENCIA
=
RESULTADO
```

Ocultar un botón solo reduce exposición accidental.

---

#### 60. Resultados de error distinguibles

La experiencia distingue al menos:

- sin permiso;
- actor inválido;
- turno inválido;
- check-in inválido;
- sede o punto incompatibles;
- sesión inexistente;
- sesión ya cerrada;
- sesión incompatible ya abierta;
- estado stale;
- diferencia pendiente;
- conciliación pendiente;
- resultado técnico desconocido;
- conflicto idempotente.

No colapsa todos como «No se pudo cerrar».

---

#### 61. Accesibilidad

Apertura y cierre deben:

- permitir operación táctil y teclado;
- mantener foco visible;
- no depender únicamente de color para diferencia o bloqueo;
- presentar montos con etiquetas explícitas;
- exigir confirmación comprensible para cierre final;
- anunciar errores y pendientes de forma accesible.

---

#### 62. Composición mínima de apertura

`VSCREEN-0089` debe priorizar:

1. contexto actual;
2. actor;
3. sede/punto;
4. fondo inicial aplicable;
5. incompatibilidades;
6. acción «Abrir caja»;
7. resultado visible.

No muestra controles de cierre o conciliación avanzada en la misma decisión inicial.

---

#### 63. Composición mínima de cierre

`VSCREEN-0090` debe priorizar:

1. identidad de la sesión;
2. actor y contexto;
3. resumen de hechos;
4. efectivo esperado;
5. captura de conteo;
6. diferencia;
7. pendientes;
8. tratamiento requerido;
9. confirmación final;
10. soporte/resultados posteriores.

---

#### 64. Diferencia con divulgación progresiva

Cuando no exista diferencia ni pendiente bloqueante, el cierre debe ser corto.

Cuando exista diferencia o incertidumbre, la interfaz amplía únicamente la evidencia relevante.

```text
CASO NORMAL = SIMPLE
CASO EXCEPCIONAL = EXPLICADO Y GOBERNADO
```

---

#### 65. Handoff a PULSO-UX-013

`PULSO-UX-013 — Diseñar confirmaciones para acciones sensibles` recibe:

- cierre final como acción irreversible dentro del flujo ordinario;
- diferencia como condición que aumenta sensibilidad;
- obligación de mostrar actor, sesión, montos y efecto;
- prohibición de confirmar con mensajes ambiguos.

---

#### 66. Handoff a PULSO-UX-014

`PULSO-UX-014 — Identificar actor real en terminal compartida` recibe:

- apertura actor-bound;
- conteo actor-bound;
- cierre actor-bound;
- prohibición de reutilizar la firma o identidad del trabajador anterior.

---

#### 67. Handoff a PULSO-UX-015

`PULSO-UX-015 — Diseñar experiencia táctil para POS` recibe:

- acciones de apertura y cierre resistentes a doble toque;
- captura de montos cómoda sin perder precisión;
- separación visual entre esperado, contado y diferencia;
- confirmación final proporcional.

---

#### 68. Inventario

Caja no es inventario.

Un cierre no:

- ajusta stock;
- confirma consumos;
- revierte inventario;
- corrige faltantes físicos.

Las diferencias de inventario conservan sus procesos propietarios.

---

#### 69. Fidelización

Caja no es ledger de fidelización.

Acumulaciones, redenciones, reversos o compensaciones PASS pueden formar parte de la conciliación comercial, pero la sesión no modifica puntos directamente.

`PULSO-UX-011` y `PULSO-UX-012` conservan ese diseño.

---

#### 70. Revisión de caja y terminales

`VSCREEN-0093` consume resultados de caja para supervisión.

Debe poder observar:

- sesiones;
- estados;
- diferencias;
- bloqueos;
- terminales;
- pendientes.

Pero la vista de revisión no hereda `cash.sessions.start` o `cash.sessions.close` por mera visibilidad.

---

#### 71. AS-IS de vento-pulso

La inspección del runtime vigente de `vento-pulso` no mostró:

- uso de `pulso.cash.sessions.start`;
- uso de `pulso.cash.sessions.close`;
- una superficie runtime identificable como `VSCREEN-0089`;
- una superficie runtime identificable como `VSCREEN-0090`;
- un modelo de `cash_session` materializado en el repositorio de aplicación consultado.

Existe documentación histórica que declara pendiente el cierre formal de caja, pagos y sesiones POS.

---

#### 72. Brechas AS-IS y propietarios de salida

| Hallazgo | Riesgo | Propietario de salida | Condición de salida |
| --- | --- | --- | --- |
| no existe superficie runtime canónica de apertura | ventas podrían operar sin sesión demostrada | package físico PULSO propietario | `VSCREEN-0089` consume contrato de sesión y PermissionKey vigente |
| no existe superficie runtime canónica de cierre | jornada sin arqueo y conciliación | package físico PULSO propietario | `VSCREEN-0090` materializa lifecycle de cierre |
| runtime no consume `cash.sessions.start/close` | UI y autorización pueden divergir | `PULSO-AUTH-015` + package físico | consumidores migrados a PermissionKeys activas |
| no hay PermissionKey activa de reapertura | una UI podría habilitar excepción ficticia | `PULSO-AUTH-008` / catálogo de autorización | solo habilitar si una identidad canónica posterior queda publicada |
| aprobación de diferencia no tiene una nueva PermissionKey definida aquí | aprobación podría confundirse con visibilidad supervisora | `PULSO-AUTH-008` + certificación PULSO | autoridad explícita y prueba fail-closed antes de efecto físico |
| caja y NUMERA no están E2E reconciliados | doble verdad financiera | `PULSO-UX-017` + `INT-POS-020` | hechos confirmados llegan a NUMERA sin reescribir sesión |

No se crea una tarea nueva para ninguno de estos hallazgos.

---

#### 73. Cierre de H-CAP-SCOPE-009-018 a nivel de diseño

El hallazgo exige ciclo integral de:

```text
APERTURA
FONDO
INGRESOS
RETIROS
GASTOS
ARQUEO
CIERRE
```

Esta tarea cierra la semántica UX y de proceso:

- apertura y fondo pertenecen a sesión;
- movimientos se conservan como hechos;
- retiros/gastos no se habilitan sin autoridad canónica;
- arqueo separa esperado y contado;
- diferencia es hecho, no corrección;
- cierre consume conciliación.

La ejecución E2E permanece en su package físico y pruebas propietarias.

---

#### 74. Cierre de H-CAP-SCOPE-009-023 a nivel de diseño

El cierre diario debe reconciliar:

- ventas;
- pagos;
- caja;
- propinas aplicables;
- documentos;
- refunds/reversos;
- pendientes.

La tarea define que ningún componente se elimina o reescribe para lograr coincidencia.

`INT-POS-020` conserva la conciliación diaria de integración y `PULSO-UX-017` la conexión económica con NUMERA.

---

#### 75. Resultado funcional

Al finalizar este diseño, PULSO puede representar de forma canónica:

```text
SIN SESION
→ ABRIR CAJA
→ SESION PERSONAL ACTIVA
→ MOVIMIENTOS TRAZABLES
→ INICIAR CIERRE
→ CONTAR
→ CONCILIAR
→ TRATAR DIFERENCIA/PENDIENTES
→ CERRAR
→ EMITIR RESULTADO TRAZABLE
```

Sin fusionar caja con venta, pago o contabilidad.

---

#### 76. Matriz de decisiones de simplificación

| Pregunta | Decisión |
| --- | --- |
| ¿apertura y cierre son la misma acción? | no |
| ¿cajero puede iniciar caja propia? | sí, con `cash.sessions.start` vigente |
| ¿cajero puede cursar cierre ordinario propio? | sí, con `cash.sessions.close` vigente |
| ¿operador integral puede hacerlo? | sí, cuando su función de caja esté activa |
| ¿gerencia_operativa puede hacerlo por jerarquía? | no |
| ¿crear venta abre caja? | no |
| ¿cobrar abre caja? | no |
| ¿close permite reabrir? | no |
| ¿existe PermissionKey activa `reopen` demostrada? | no |
| ¿diferencia puede editar esperado? | no |
| ¿diferencia crea ajuste automático? | no |
| ¿refund/reverse borran pago original? | no |
| ¿NUMERA es owner de la sesión? | no |
| ¿VSCREEN-0093 abre/cierra? | no |
| ¿la UI decide autoridad? | no |

---

#### 77. Handoff inmediato a PULSO-UX-011

`PULSO-UX-011 — Integrar acumulación de puntos` recibe:

```text
CAJA ABIERTA NO IMPLICA CLIENTE IDENTIFICADO
VENTA/PAGO CONFIRMADOS PUEDEN SER HECHOS ELEGIBLES PARA LOYALTY
CIERRE DE CAJA NO EDITA EL LEDGER PASS
ACUMULACION DE PUNTOS DEBE SER IDEMPOTENTE Y CORRELACIONABLE CON LA VENTA
PENDIENTE DE LOYALTY NO SE CONVIERTE EN AJUSTE DE EFECTIVO
```

010 no diseña acumulación de puntos.

---

#### 78. Requisitos de prueba derivados

NO GENERA REQUISITOS DE PRUEBA.

**Requisitos creados:** 0
**Requisitos modificados:** 0
**Requisitos diferidos:** 0
**Requisitos obsoletos:** 0
**Fragmentos del Registro 04A afectados:** 0

Justificación: apertura, cierre, fondo, movimientos, efectivo esperado, conteo, diferencia, aprobación, conciliación, autorización, idempotencia y cierre diario ya poseen cobertura vigente; esta tarea especializa la experiencia y reconciliación contractual sin introducir una obligación verificable nueva.

---

#### 79. Cobertura de prueba vigente reutilizada

Se reutiliza sin modificar el Registro 04A principalmente:

- `TREQ-PULSO-001` para el ciclo E2E de apertura a cierre;
- `TREQ-PULSO-003` para no adoptar piezas históricas sin validación;
- `TREQ-PULSO-006` para venta, pago, movimientos, fondo, conteo, diferencia, reapertura y cierre auditables;
- `TREQ-PULSO-014` y `TREQ-PULSO-015` para acceso y territorio;
- `TREQ-AUTH-001`, `TREQ-AUTH-004`, `TREQ-AUTH-013` y `TREQ-AUTH-015` para decisión, bypass y trazabilidad;
- `TREQ-NUMERA-001` para frontera económica posterior;
- `TREQ-INTEGRATION-006` para integración y conciliación;
- `TREQ-UX-006` para experiencia de estados, feedback y recuperación.

Esta enumeración es trazabilidad de cobertura existente y no actualiza el Registro 04A.

---

#### 80. Evidencia de validación

| Clase | Estado | Evidencia |
| --- | --- | --- |
| BUILD | NOT_EXECUTED | La compilación documental real corresponde al checkout local después de incorporar el artefacto; no se ejecutó build de producto. |
| LOCAL | NOT_EXECUTED | El marcador no fue incorporado todavía en el checkout del usuario ni sometido allí al ciclo documental completo. |
| REMOTA | PASS | Se verificaron remoto vigente de `vento-shell`, continuidad, topología `DEFINE_ONCE`, catálogo de pantallas y pasos, `VPROC-0044`, sus ocho estados y seis eventos, datasets de autorización vigentes, Registro 04A aplicable, relaciones con NUMERA y runtime vigente de `vento-pulso`. |
| OPERATIVA | NOT_EXECUTED | No se abrió, contó, concilió, cerró, reabrió ni corrigió una caja real. |
| FÍSICA | NOT_APPLICABLE | `DEFINE_ONCE / NO_PHYSICAL_INSTANCE`; esta tarea no crea una instancia física propia. |

---

#### 81. Criterios de aceptación

- [ ] `VSCREEN-0089` conserva identidad de Apertura de caja.
- [ ] `VSCREEN-0090` conserva identidad de Cierre de caja.
- [ ] Ambos consumen `VPROC-0044` sin fusionarse.
- [ ] Apertura usa `VPROC-0044::STEP-OPEN_CASH_SESSION`.
- [ ] Cierre usa `VPROC-0044::STEP-CLOSE_CASH_SESSION`.
- [ ] `VSCREEN-0093` permanece revisión separada.
- [ ] Se consumen únicamente `pulso.cash.sessions.start` y `pulso.cash.sessions.close` como PermissionKeys activas de sesión aplicables.
- [ ] Ambas PermissionKeys se reconocen `OPERATIONAL_ONLY`.
- [ ] `cajero_satelite` puede operar apertura y cierre ordinarios de su sesión compatible.
- [ ] `operador_integral_satelite` puede operar apertura y cierre cuando su función de caja esté activa.
- [ ] `gerencia_operativa` no recibe start/close por jerarquía.
- [ ] La cláusula histórica de no-close del cajero queda reconciliada contra `AUTH-CAT-023` y el dataset vigente.
- [ ] La sesión es personal y actor-bound.
- [ ] Acceso PULSO no abre caja implícitamente.
- [ ] Crear venta no abre caja implícitamente.
- [ ] Cobrar no abre caja implícitamente.
- [ ] El fondo inicial permanece separado de venta y pago.
- [ ] Los movimientos preservan hechos originales.
- [ ] No se inventan PermissionKeys para retiros, gastos o ajustes.
- [ ] Efectivo esperado se deriva de hechos confirmados.
- [ ] Efectivo contado permanece observación independiente.
- [ ] Diferencia se calcula y no se edita para cuadrar.
- [ ] Diferencia no crea compensación automática.
- [ ] Resultado desconocido no se oculta durante cierre.
- [ ] Refund/reverse se concilian sin borrar pago original.
- [ ] Documento fiscal permanece separado.
- [ ] NUMERA consume hechos y no reescribe caja.
- [ ] Se conservan exactamente ocho estados de `VPROC-0044`.
- [ ] Se conservan exactamente seis eventos `VPROC-0044.EVT-001..006`.
- [ ] Todos los eventos conservan sensibilidad `RESTRICTED_FINANCIAL`.
- [ ] No se inventa un estado `CASH_SESSION_OPEN` en la máquina generada.
- [ ] `SUPERVISOR_APPROVAL_PENDING` no concede autoridad por nombre de rol.
- [ ] No se expone una PermissionKey de reapertura no publicada.
- [ ] Cierre forzado permanece fail-closed sin autoridad específica.
- [ ] Concurrencia no produce dos cierres.
- [ ] Estado stale obliga revalidación.
- [ ] Realtime no concede autoridad.
- [ ] Terminal compartida conserva actor humano real.
- [ ] H-CAP-SCOPE-009-018 queda resuelto documentalmente.
- [ ] H-CAP-SCOPE-009-023 queda resuelto documentalmente.
- [ ] 010 entrega a 011 una sesión/cierre que no modifica ledger PASS.
- [ ] No se crean ni modifican requisitos de prueba.
- [ ] No se ejecutan cambios físicos.

---

#### 82. Límites

Esta tarea no:

- modifica `vento-pulso`;
- crea `VSCREEN-0089` o `VSCREEN-0090` físicamente;
- crea componentes React;
- crea rutas runtime;
- crea tablas de caja;
- crea RPC de caja;
- crea Server Actions;
- crea migraciones;
- modifica Supabase;
- modifica RLS;
- modifica grants;
- modifica datasets de autorización;
- crea PermissionKeys;
- publica `pulso.cash.sessions.reopen`;
- habilita cierre forzado;
- crea permisos para retiros, gastos o ajustes;
- abre una caja;
- cierra una caja;
- corrige una diferencia real;
- registra un depósito;
- modifica ventas;
- modifica pagos;
- ejecuta refunds;
- ejecuta reversos;
- emite documentos fiscales;
- modifica inventario;
- modifica ledger PASS;
- registra hechos NUMERA;
- modifica dispositivos;
- modifica turnos o check-in;
- modifica el Registro 04A;
- crea instancia física;
- ejecuta E5.

---

#### 83. Decisión final de experiencia

La experiencia canónica de caja queda definida como una sesión personal y trazable con dos acciones ordinarias activas:

```text
pulso.cash.sessions.start
pulso.cash.sessions.close
```

La apertura crea contexto de responsabilidad y fondo.

El cierre consume hechos, conteo, diferencia, aprobación y conciliación sin editar destructivamente la historia.

```text
VENTA != PAGO != MOVIMIENTO DE CAJA != DOCUMENTO FISCAL != HECHO NUMERA
```

El diseño no revive identidades históricas no publicadas ni convierte revisión supervisora en ejecución.

---

#### 84. Continuidad

**ÚLTIMA TAREA APROBADA**
`PULSO-UX-009 — Separar anulación, devolución y reembolso`

**TAREA ACTUAL APROBADA**
`PULSO-UX-010 — Diseñar apertura y cierre de caja`

**SIGUIENTE TAREA RESERVADA**
`PULSO-UX-011 — Integrar acumulación de puntos`
### ✅ PULSO-UX-011 — Integrar acumulación de puntos

**Estado:** APROBADA
**Tarea anterior:** PULSO-UX-010 — Diseñar apertura y cierre de caja
**Tarea siguiente:** PULSO-UX-012 — Integrar redención de puntos
**Tipo de tarea:** diseño documental integral de `VSCREEN-0085 — Identificación de cliente y acumulación` como superficie operativa PULSO sobre `VPROC-0045::STEP-IDENTIFY_CUSTOMER_AND_ACCRUE`, separando identificación de cliente, elegibilidad comercial, intención de acumulación, autorización, cálculo PASS, movimiento de ledger, resultado durable y conciliación; reconciliando el contrato objetivo de `PULSO-AUTH-009` y `PASS-INT-001` con el catálogo y dataset de autorización vigentes, que actualmente no publican `pulso.loyalty.*`; preservando ownership de PASS, idempotencia empresarial, actor real, territorio, minimización de datos, resultado desconocido y fronteras con venta, caja, refund y redención; sin usar `pulso.pos.main` como sustituto de autoridad ni materialización física; `DEFINE_ONCE` / `NO_PHYSICAL_INSTANCE`
**Bloque:** BLOQUE N — PULSO
**Repositorio propietario:** `vento-group-sas/vento-shell`
**Archivo propietario:** `docs/plan-canonico/modular/bloques/N_PULSO/02_EXPERIENCIA_POS_Y_OPERACION_COMERCIAL.md`
**Estado físico resultante:** `NO_PHYSICAL_INSTANCE`
**Cambios físicos autorizados:** ninguno; esta tarea no modifica código, pantallas runtime, PermissionKeys, catálogos, datasets, roles, grants, RLS, RPC, Server Actions, tablas, ledger, saldo, datos, Supabase, migraciones, packages, reglas de puntos, dispositivos, secretos ni despliegues
**Requisitos de prueba creados o modificados:** 0

---

#### 1. Propósito

Diseñar la experiencia canónica mediante la cual PULSO identifica a un cliente dentro de una operación comercial y solicita una acumulación de puntos gobernada por PASS, sin convertir identificación, visibilidad del saldo, monto digitado, acceso general al POS o una respuesta local en evidencia suficiente de que los puntos fueron otorgados.

La experiencia debe dejar cerrado que:

- identificar al cliente y acumular puntos son hechos distintos;
- PULSO origina la intención operacional, pero PASS conserva ledger, saldo y regla de fidelización;
- la acumulación solo puede relacionarse con un hecho comercial elegible y estable;
- la cantidad definitiva de puntos procede de una regla PASS vigente y verificable;
- el navegador puede mostrar una estimación, pero nunca fabricar el resultado;
- un retry del mismo hecho conserva la misma identidad idempotente;
- un resultado desconocido no se transforma en fallo ni éxito por inferencia;
- caja, efectivo, refund, cancelación y redención mantienen contratos separados;
- la interfaz solo declara éxito con un resultado durable del servidor;
- la ausencia actual de una PermissionKey `pulso.loyalty.*` en el catálogo activo bloquea la ejecución, no autoriza un fallback a `pulso.pos.main`.

---

#### 2. Handoff recibido de PULSO-UX-010

`PULSO-UX-010` entrega a esta tarea:

```text
CAJA ABIERTA NO IMPLICA CLIENTE IDENTIFICADO
VENTA/PAGO CONFIRMADOS PUEDEN SER HECHOS ELEGIBLES PARA LOYALTY
CIERRE DE CAJA NO EDITA EL LEDGER PASS
ACUMULACION DE PUNTOS DEBE SER IDEMPOTENTE Y CORRELACIONABLE CON LA VENTA
PENDIENTE DE LOYALTY NO SE CONVIERTE EN AJUSTE DE EFECTIVO
```

Por tanto, esta tarea consume caja únicamente como contexto operacional cuando corresponda.

No convierte el fondo, el efectivo esperado, el conteo, la diferencia ni el cierre en fuentes del saldo de puntos.

---

#### 3. Naturaleza y topología

La topología vigente para `PULSO-UX-011` es:

```text
mode = DEFINE_ONCE
execution_gate = NO_PHYSICAL_INSTANCE
```

Consecuencias:

- el diseño se define una sola vez;
- no existe instancia física propia;
- no se otorgan puntos reales;
- no se modifica PULSO ni PASS;
- no se modifica Supabase;
- no se crea ni publica una PermissionKey;
- no se cambia el dataset de grants;
- no se crea RPC, Server Action, tabla, índice o constraint;
- no se cambia la regla de acumulación;
- no se ejecuta una venta ni una prueba E2E.

---

#### 4. Identidad canónica de la superficie

La superficie propietaria de esta tarea es:

| Dimensión | Valor |
| --- | --- |
| Pantalla | `VSCREEN-0085` |
| Nombre | Identificación de cliente y acumulación |
| Aplicación de superficie | `pulso` |
| Proceso principal | `VPROC-0045` |
| Paso | `VPROC-0045::STEP-IDENTIFY_CUSTOMER_AND_ACCRUE` |
| Interacción | `EXECUTE` |
| Fase | `IN_PROGRESS` |
| Relación de proceso | `SUPERVISION_SURFACE` |
| Procesos relacionados | `VPROC-0038`, `VPROC-0039` |

Su propósito canónico es identificar al cliente con datos mínimos y registrar acumulación vinculada a una venta válida.

---

#### 5. Ownership del proceso

`VPROC-0045 — Identificar cliente y administrar fidelización mediante ledgers y consentimientos separados` pertenece a PASS.

La frontera queda:

```text
PULSO
→ superficie operacional de venta e intención de acumulación

PASS
→ propietario del resultado principal de VPROC-0045,
  de la semántica de fidelización,
  del ledger y de la proyección de saldo
```

Que `VSCREEN-0085` viva en PULSO no transfiere el ownership del proceso a PULSO.

---

#### 6. Frontera con VSCREEN-0086

`VSCREEN-0086 — Redención de puntos o beneficios` permanece separada y reservada a `PULSO-UX-012`.

Regla:

```text
IDENTIFICAR / ACUMULAR
!=
REDIMIR / CONSUMIR BENEFICIO
```

Esta tarea no diseña tickets, QR de redención, consumo, gasto de puntos ni estados de canje.

---

#### 7. Contrato PASS consumido

La tarea consume `PASS-INT-001 — Definir integración PULSO → PASS para acumulación` sin redefinirlo.

La frontera contractual es:

| Capa | Responsabilidad |
| --- | --- |
| PULSO | capturar intención operacional y contexto permitido de venta/cliente |
| contrato servidor | revalidar sesión, aplicación, territorio, autoridad, actor, dispositivo, cliente, hecho elegible, monto, moneda e identidad idempotente |
| PASS | aplicar regla vigente, registrar ledger, mantener proyección coherente de saldo y emitir resultado durable |
| PULSO UI | mostrar únicamente resultado confirmado y estado seguro ante incertidumbre |
| PASS cliente | reflejar después saldo y movimiento desde la fuente de verdad |

---

#### 8. Contrato de autorización objetivo aprobado

`PULSO-AUTH-009 — Proteger acumulación de puntos` definió como identidad objetivo:

```text
pulso.loyalty.points.accumulate
```

con semántica:

```text
aplicación = pulso
módulo = loyalty
recurso = points
acción = accumulate
modalidad objetivo = OPERATIONAL_ONLY
actor ordinario objetivo = cajero_satelite
```

También fijó que `gerencia_operativa` no recibe acumulación por el solo hecho de supervisar.

---

#### 9. Reconciliación con el catálogo de autorización vigente

El catálogo materializado vigente `permissions.json@1.0.0` contiene 140 PermissionKey activas y no contiene:

```text
pulso.loyalty.customers.identify
pulso.loyalty.points.accumulate
pulso.loyalty.points.redeem
```

Por tanto, la identidad de `PULSO-AUTH-009` se conserva como contrato objetivo aprobado, pero su materialización no se presenta como una PermissionKey activa actualmente publicada.

---

#### 10. Reconciliación con operational-role-grants vigente

`operational-role-grants@1.0.0` tampoco contiene grants `pulso.loyalty.*`.

Para `cajero_satelite` el dataset vigente sí publica capacidades PULSO como acceso, venta, cobro y caja, pero no acumulación de puntos. Tampoco existe un grant activo de acumulación para `operador_integral_satelite` ni para `gerencia_operativa`; cualquier ampliación futura exige una concesión canónica explícita y no se infiere desde el nombre del rol.

Regla vigente:

```text
CONTRATO OBJETIVO DE ACUMULACION EXISTE
+
PERMISSIONKEY ACTIVA AUSENTE
+
GRANT OPERATIVO ACTIVO AUSENTE
=
ACUMULACION NO EJECUTABLE
```

La experiencia debe fallar cerrada hasta que una reconciliación canónica posterior publique autoridad ejecutable compatible.

---

#### 11. Prohibición de fallback a pulso.pos.main

El runtime actual utiliza `pulso.pos.main` en la ruta y acciones relacionadas con scanner/loyalty.

Esta tarea no adopta ese permiso broad como autoridad suficiente.

Regla:

```text
pulso.pos.main
!=
autoridad canónica de acumulación
```

Mientras falte una PermissionKey activa exacta, PULSO puede mostrar estado informativo o indisponibilidad, pero no ejecutar acumulación por inferencia.

---

#### 12. Entrada válida a la experiencia

La acumulación debe presentarse desde un contexto comercial resoluble.

Una entrada válida puede contener:

- venta, pedido o transacción origen identificable;
- sede efectiva;
- actor operativo efectivo;
- cliente aún no identificado o ya identificado;
- estado comercial suficiente para evaluar elegibilidad;
- posibilidad de consultar a PASS sin asumir resultado.

Abrir `/scanner` por sí solo no crea una venta elegible ni autoridad de acumulación.

---

#### 13. Identificación y acumulación son dos decisiones

La secuencia conceptual es:

```text
IDENTIFICAR CLIENTE
→ VALIDAR RELACION CON EL CONTEXTO COMERCIAL
→ EVALUAR ELEGIBILIDAD
→ EVALUAR AUTORIDAD
→ SOLICITAR ACUMULACION
→ RECIBIR RESULTADO PASS
→ PRESENTAR RESULTADO
```

Identificar correctamente al cliente no autoriza automáticamente el siguiente paso.

---

#### 14. Cliente no identificado

Sin cliente resoluble:

- no se solicita acumulación;
- no se inventa una cuenta;
- no se usa el trabajador como cliente;
- no se crea una identidad temporal de fidelización;
- no se fija saldo local;
- no se omite la condición para acelerar la venta.

La venta puede continuar según su propio contrato si el cliente es opcional, pero la acumulación queda no disponible.

---

#### 15. Identidad de cliente server-side

El cliente utilizado para acumulación debe resolverse server-side contra una identidad apta para fidelización.

La UI puede transportar un identificador o credencial de entrada, pero no decide por sí sola:

- que el cliente exista;
- que sea elegible;
- que corresponda al hecho comercial;
- que el saldo visible esté vigente;
- que la operación pueda acumular.

---

#### 16. Identidad de trabajador y cliente separadas

La experiencia debe mantener siempre dos sujetos diferentes cuando correspondan:

```text
ACTOR HUMANO OPERATIVO
!=
CLIENTE DE FIDELIZACION
```

El PIN, la firma o la sesión laboral nunca sustituyen la identidad del cliente.

La credencial del cliente nunca concede autoridad laboral al operador.

---

#### 17. Minimización de la proyección de cliente

PULSO muestra únicamente los datos necesarios para identificar al cliente y completar la operación.

No se requiere por esta tarea exponer de forma permanente:

- correo completo;
- teléfono completo;
- historial completo de ledger;
- preferencias;
- consentimientos;
- datos de otras marcas o sedes;
- información técnica de cuenta.

Un nombre o etiqueta reconocible, identificador seguro y proyecciones PASS necesarias para el flujo pueden mostrarse cuando la fuente autorizada las entregue.

---

#### 18. Saldo visible

El saldo de puntos, cuando se muestre, es una proyección PASS confirmada.

Reglas:

```text
SALDO VISIBLE
!=
LEDGER

SALDO VISIBLE
!=
AUTORIZACION PARA ACUMULAR
```

Una lectura fallida de saldo no se transforma en cero.

La UI no reconstruye el saldo sumando movimientos locales.

---

#### 19. Hecho comercial origen

Toda acumulación debe correlacionarse con una compra, venta o transacción empresarial estable y elegible.

El contexto debe permitir resolver al menos:

- identidad durable del hecho origen;
- cliente asociado cuando aplique;
- sede efectiva;
- monto elegible autoritativo;
- moneda;
- estado empresarial relevante;
- regla PASS aplicable;
- versión de regla;
- identidad de correlación e idempotencia.

---

#### 20. Venta no confirmada o no elegible

Una venta inexistente, no confirmada según su contrato, cancelada, anulada, compensada de forma incompatible o no elegible no produce una acumulación definitiva.

La interfaz debe explicar el estado sin ofrecer un botón para forzar puntos.

---

#### 21. Relación con pago

Pago y acumulación siguen siendo hechos separados.

La regla exacta que determina si una venta pagada, parcialmente pagada o confirmada es elegible pertenece al contrato comercial y a la regla PASS aplicable.

Esta tarea no inventa la condición universal:

```text
PAGO CONFIRMADO
=
PUNTOS AUTOMATICOS
```

---

#### 22. Relación con caja

La acumulación no modifica:

- fondo inicial;
- movimiento de efectivo;
- efectivo esperado;
- conteo;
- diferencia;
- cierre de caja.

Un `UNKNOWN_OUTCOME` de loyalty no se convierte en ajuste de efectivo para cuadrar caja.

---

#### 23. Fuente autoritativa del monto

El monto elegible debe provenir del hecho comercial autoritativo o de una derivación server-side gobernada.

El operador no define la verdad empresarial escribiendo un monto libre.

Si la UI permite visualizar o capturar un valor durante una transición legacy, el servidor debe reconciliarlo con la fuente propietaria antes de cualquier efecto.

---

#### 24. Moneda

La moneda debe ser explícita o inequívocamente derivable del contrato comercial.

La acumulación no asume que todo número recibido representa COP por simple convención de interfaz.

Una incompatibilidad de moneda produce rechazo o imposibilidad de calcular, no conversión silenciosa.

---

#### 25. Regla PASS y versión

Tasa, multiplicador, redondeo, promociones, vigencia y elegibilidad pertenecen a PASS o al contrato propietario que PASS consume.

La acumulación confirmada debe poder relacionarse con la regla y versión realmente aplicadas.

PULSO no mantiene una segunda regla maestra.

---

#### 26. Estimación visible de puntos

La interfaz puede mostrar una previsualización únicamente cuando pueda etiquetarla de forma inequívoca como estimación.

Regla:

```text
ESTIMACION LOCAL O PREVIA
!=
PUNTOS CONFIRMADOS
```

La respuesta server-side puede confirmar, recalcular o rechazar esa estimación.

---

#### 27. Fórmula AS-IS no canónica

El runtime actual calcula:

```text
floor(amountCop / 1000)
```

Esta fórmula describe el AS-IS.

No se adopta como regla universal ni se utiliza para afirmar cuántos puntos otorgará PASS.

---

#### 28. Comando de acumulación como intención

La acción visible de confirmar acumulación significa:

```text
SOLICITAR AL SERVIDOR EVALUAR Y APLICAR EL EFECTO
```

No significa:

```text
INCREMENTAR SALDO LOCAL
```

El control debe quedar bloqueado contra doble envío mientras una misma intención está en curso.

---

#### 29. Autoridad antes del comando

Cuando el catálogo vuelva a publicar una autoridad exacta, la experiencia deberá requerir que el servidor resuelva:

- principal técnico;
- actor humano efectivo;
- estado laboral válido;
- turno y check-in cuando apliquen;
- rol operativo efectivo;
- sede y área efectivas;
- PermissionKey exacta activa;
- dispositivo cuando aplique;
- cliente;
- hecho comercial;
- estado y regla;
- denegaciones prevalentes.

Mientras esa autoridad exacta no exista en el catálogo vigente, el comando permanece no ejecutable.

---

#### 30. Denegación de autoridad

Una denegación no se presenta como fallo técnico.

La interfaz debe comunicar que la acción no está disponible para el contexto actual sin revelar detalles de seguridad innecesarios.

No se ofrece retry repetitivo para una denegación estable.

---

#### 31. Territorialidad

`site_id` visible o enviado por navegador no amplía autoridad.

La sede debe reconciliarse contra:

- contexto operativo;
- hecho comercial;
- actor;
- dispositivo cuando aplique;
- contrato PASS.

Una divergencia territorial bloquea el efecto.

---

#### 32. Dispositivo compartido

Cuando la estación sea compartida, la experiencia consume el contrato transversal de actor real.

La firma o PIN:

- identifica al humano cuando corresponde;
- no concede permiso;
- no amplía sede;
- no valida la venta;
- no sustituye idempotencia;
- no se convierte en identidad del cliente.

`PULSO-UX-014` conserva el diseño específico de visualización del actor real en dispositivos compartidos.

---

#### 33. Idempotencia empresarial

Cada intención de acumulación debe tener una identidad estable derivada del hecho empresarial o emitida/validada por servidor antes del primer efecto.

Regla:

```text
MISMO HECHO EMPRESARIAL
→ MISMA IDENTIDAD IDEMPOTENTE
```

Reabrir la pantalla, perder red o volver a pulsar no crea una nueva intención empresarial.

---

#### 34. Referencia aleatoria no válida como identidad final

No es suficiente construir la identidad usando únicamente:

```text
Date.now
Math.random
IDs truncados
estado temporal del componente
```

Una referencia nueva en cada intento destruye la capacidad de reconocer replay del mismo hecho.

---

#### 35. Replay equivalente

Si el servidor ya aplicó el mismo hecho con la misma identidad y huella:

```text
MISMA IDENTIDAD
+
MISMA HUELLA
=
ALREADY_APPLIED / RESULTADO DURABLE PREVIO
```

La UI no lo presenta como error que invite a generar una nueva referencia.

---

#### 36. Conflicto de idempotencia

Si la misma identidad representa contenido empresarial incompatible:

```text
MISMA IDENTIDAD
+
HUELLA DISTINTA
=
CONFLICTO
```

La experiencia no sobrescribe el hecho anterior ni aplica un segundo movimiento.

---

#### 37. Resultado desconocido

Timeout, desconexión o pérdida de respuesta después de enviar el comando pueden producir:

```text
UNKNOWN_OUTCOME
```

En ese estado:

- no se asume fallo;
- no se asume éxito;
- no se genera otra identidad;
- no se incrementa saldo localmente;
- no se invita a repetir como operación nueva;
- se consulta o reconcilia el resultado durable.

---

#### 38. Estado pendiente de conciliación

Cuando el resultado todavía no puede determinarse con seguridad, la interfaz debe conservar un estado explícito de conciliación pendiente.

Ese estado no bloquea ni altera caja por inferencia, pero evita que el operador crea que la acumulación está confirmada o que debe repetirla.

---

#### 39. Ledger como evidencia durable

El movimiento de ledger PASS es la evidencia durable del cambio de puntos.

PULSO no crea una copia competidora del ledger.

El saldo por sí solo no sustituye el movimiento ni su origen.

---

#### 40. Coherencia entre ledger y saldo

Un resultado confirmado debe permitir que:

```text
HECHO ORIGEN
↔
MOVIMIENTO PASS
↔
PROYECCION DE SALDO
```

sean reconciliables.

Si la relación no puede demostrarse, la experiencia no corrige el saldo manualmente ni inventa un movimiento.

---

#### 41. Resultado semántico mínimo

La experiencia debe poder distinguir, como mínimo:

| Clase semántica | Presentación operacional |
| --- | --- |
| `APPLIED` | puntos confirmados exactamente una vez |
| `ALREADY_APPLIED` | el mismo efecto ya estaba aplicado; se muestra el resultado durable |
| `AUTH_DENIED` | la autoridad o contexto no permiten la acción |
| `BUSINESS_REJECTED` | cliente, venta, monto, moneda, regla o elegibilidad no satisfacen el contrato |
| `IDEMPOTENCY_CONFLICT` | la identidad fue reutilizada con contenido incompatible |
| `UNKNOWN_OUTCOME` | el resultado debe reconciliarse antes de repetir |
| `TECHNICAL_FAILURE_NO_EFFECT_PROVEN` | fallo técnico sin efecto confirmado |

Los nombres físicos pueden variar; las semánticas no deben colapsarse en un único mensaje genérico.

---

#### 42. Estado de procesamiento

Mientras el comando está en curso:

- el botón principal no permite doble envío;
- el contexto de cliente y venta no cambia silenciosamente;
- cambiar de cliente o abandonar el flujo exige resolver o conservar de forma segura la intención en curso;
- un spinner no equivale a confirmación;
- el estado sigue siendo legible sin depender solo de color.

---

#### 43. Presentación de éxito

`APPLIED` permite mostrar únicamente información confirmada por servidor, por ejemplo:

- puntos otorgados;
- saldo resultante cuando PASS lo provea;
- referencia o recibo seguro cuando exista;
- venta o hecho de origen identificable para el operador.

El éxito no se muestra antes de la confirmación durable.

---

#### 44. Presentación de ALREADY_APPLIED

`ALREADY_APPLIED` es un resultado seguro y no un incentivo para repetir.

La interfaz comunica que el hecho ya fue procesado y recupera el mismo resultado durable cuando esté disponible.

No genera una segunda notificación que aparente dos acumulaciones diferentes.

---

#### 45. Presentación de rechazo empresarial

Un rechazo por elegibilidad debe explicar la condición operacional necesaria sin permitir al operador editar la fuente empresarial para fabricar elegibilidad.

Ejemplos de categorías comprensibles:

- venta no elegible;
- cliente incompatible;
- regla no aplicable;
- monto o moneda inconsistentes;
- estado comercial no habilitado.

---

#### 46. Presentación de conflicto

Un conflicto de idempotencia requiere detener la repetición automática y preservar la referencia del hecho para soporte o conciliación.

No se ofrece “intentar con otra referencia” como mecanismo de escape.

---

#### 47. Presentación de fallo técnico

Un fallo técnico sin efecto demostrado debe distinguirse de `UNKNOWN_OUTCOME`.

Solo puede ofrecer retry cuando el contrato de recuperación determine que no existe efecto previo o que el mismo retry reutilizará de forma segura la identidad original.

---

#### 48. Relación con cancelación, devolución y refund

Una acumulación previamente confirmada no se edita destructivamente porque una venta sea después cancelada, devuelta o reembolsada.

Cualquier compensación de puntos posterior debe ser un hecho PASS separado, autorizado, correlacionado e idempotente.

`PULSO-UX-009` conserva las semánticas comerciales de cancelación, devolución y refund.

---

#### 49. Relación con redención

Acumular puntos no crea ni consume una redención.

Regla:

```text
MOVIMIENTO DE ACUMULACION
!=
INTENCION DE REDENCION
!=
CONSUMO DE REDENCION
```

`PULSO-UX-012` recibe el diseño de redención sin reutilizar este comando.

---

#### 50. Relación con consentimientos

`VPROC-0045` también contiene una rama de actualización de consentimiento.

Esta tarea no diseña ni modifica consentimientos.

La existencia del estado `CONSENT_UPDATE_PENDING` en el proceso global no convierte la acumulación en mecanismo para aceptar finalidades, comunicaciones o términos.

---

#### 51. Modelo de estados de VPROC-0045

El proceso propietario de PASS conserva exactamente estas identidades de estado:

```text
LOYALTY_INTERACTION_OPENED
IDENTITY_VALIDATING
ELIGIBILITY_CHECKING
ACTION_AUTHORIZATION_PENDING
MOVEMENT_PENDING
MOVEMENT_RECORDED
CONSENT_UPDATE_PENDING
RECONCILIATION_PENDING
LOYALTY_INTERACTION_RECONCILED
```

La UX de acumulación consume únicamente la semántica compatible con su camino; no inventa estados nuevos.

---

#### 52. Apertura de interacción

`LOYALTY_INTERACTION_OPENED` exige cliente identificado o intento válido de identificación y una acción pretendida.

Su invariante de nacimiento impide modificar saldo, consentimiento, beneficio o movimiento antes de validar identidad y regla.

---

#### 53. Validación de identidad

`IDENTITY_VALIDATING` representa la comprobación de cliente, credencial, cuenta y contexto.

La UI no debe saltar de un código leído directamente a “puntos otorgados”.

---

#### 54. Verificación de elegibilidad

`ELIGIBILITY_CHECKING` representa la evaluación de regla, sede, beneficio, saldo, vigencia y restricciones según el proceso general.

Para acumulación se usa para demostrar que cliente y hecho comercial satisfacen la regla aplicable.

---

#### 55. Autorización de acción pendiente

`ACTION_AUTHORIZATION_PENDING` representa la decisión protegida antes del efecto sensible.

En el estado vigente del catálogo, la ausencia de una PermissionKey activa exacta debe resolver esta etapa de acumulación como no autorizable, no como autorización por permiso broad.

---

#### 56. Movimiento pendiente

`MOVEMENT_PENDING` representa una acción válida lista para afectar el ledger idempotente.

La interfaz todavía no presenta puntos confirmados en este estado.

---

#### 57. Movimiento registrado

`MOVEMENT_RECORDED` significa que PASS registró el movimiento y espera reflejo/conciliación con la venta.

No autoriza a PULSO a editar el ledger.

---

#### 58. Conciliación pendiente

`RECONCILIATION_PENDING` permite representar diferencias o tiempos de propagación entre interacción, venta, movimiento, saldo y beneficio entregado.

La UX mantiene el estado visible hasta disponer de resultado reconciliable.

---

#### 59. Interacción reconciliada

`LOYALTY_INTERACTION_RECONCILED` es final normal del proceso.

Su resultado significa que la interacción quedó aplicada una sola vez y reconciliada; no convierte a PULSO en propietario del saldo ni cierra la relación con el cliente.

---

#### 60. Eventos empresariales reutilizados

`VPROC-0045` publica seis eventos canónicos:

| Evento | Clase |
| --- | --- |
| `VPROC-0045.EVT-001` — loyalty-interaction-opened | `PROCESS_STARTED` |
| `VPROC-0045.EVT-002` — identity-validating | `VALIDATION_FACT` |
| `VPROC-0045.EVT-003` — action-authorization-pending | `DECISION_FACT` |
| `VPROC-0045.EVT-004` — consent-update-pending | `HANDOFF_FACT` |
| `VPROC-0045.EVT-005` — reconciliation-pending | `RECONCILIATION_FACT` |
| `VPROC-0045.EVT-006` — loyalty-interaction-reconciled | `PROCESS_COMPLETED` |

Esta tarea no inventa un evento adicional específico de `MOVEMENT_RECORDED`.

---

#### 61. Sensibilidad

Los seis eventos de `VPROC-0045` tienen sensibilidad `RESTRICTED_PERSONAL`.

La UX no expone en logs, toasts o auditoría visible más datos personales que los necesarios para operar y diagnosticar el flujo.

---

#### 62. Acciones funcionales de VSCREEN-0085

El contrato generado registra exactamente:

```text
VSCREEN-0085::PRIMARY
VSCREEN-0085::SECONDARY:01
VSCREEN-0085::SECONDARY:02
VSCREEN-0085::SECONDARY:03
VSCREEN-0085::SECONDARY:04
```

Como el contrato generado no publica etiquetas funcionales para esas secundarias, esta tarea no inventa nombres canónicos para ellas.

---

#### 63. Composición visible objetivo

La superficie debe permitir comprender, sin mezclar responsabilidades:

1. contexto de venta o hecho comercial;
2. identidad de cliente;
3. estado de elegibilidad;
4. autoridad/disponibilidad de acumulación;
5. estimación cuando exista y esté claramente marcada;
6. acción de solicitar acumulación cuando sea ejecutable;
7. estado de procesamiento;
8. resultado confirmado o estado de conciliación;
9. referencia segura al resultado para soporte.

---

#### 64. Acción principal cuando la autoridad está ausente

Mientras el catálogo activo no publique una autoridad exacta compatible, la acción de acumulación debe permanecer no ejecutable.

La superficie puede:

- presentar identificación únicamente cuando su propia autoridad vigente lo permita; la ausencia de una PermissionKey atómica de identificación no se compensa con una concesión inventada;
- mostrar que acumulación no está habilitada;
- conservar el contexto para una futura materialización;
- impedir que un broad permission active el botón por accidente.

No debe fingir que la capacidad está disponible.

---

#### 65. Current runtime AS-IS de QRScanner

El runtime vigente de `vento-pulso` concentra identificación y acumulación en `QRScanner`.

En modo `identification`:

- identifica un cliente;
- muestra nombre, correo y puntos;
- pide un monto manual de compra;
- calcula `floor(amount/1000)`;
- genera una referencia aleatoria;
- llama `awardLoyaltyPointsAction`;
- actualiza el saldo local visible con la respuesta.

Esto es evidencia AS-IS y no el diseño canónico final.

---

#### 66. Current runtime AS-IS de awardLoyaltyPointsAction

La Server Action vigente usa:

```text
APP_ID = pulso
POS_PERMISSION = pos.main
```

Además solicita firma de actor en dispositivo compartido y llama al adaptador de acumulación.

La asociación de la firma al `transaction_id` ocurre después del award y un fallo de asociación se registra sin demostrar compensación.

Estas condiciones constituyen adopción parcial, no cumplimiento del contrato objetivo.

---

#### 67. Current runtime AS-IS del adaptador

`loyalty-award.api.ts` invoca:

```text
award_loyalty_points_external
```

con:

```text
user_id
site_id
amount_cop
external_ref
description
metadata
```

El input tipado vigente no exige una identidad canónica de venta/pedido/transacción origen.

Por tanto, el runtime actual no demuestra por sí solo correlación suficiente con el hecho comercial.

---

#### 68. Current runtime AS-IS de identificación

`identifyClientAction` utiliza actualmente `pulso.pos.main` y consulta una proyección de:

```text
id
full_name
email
loyalty_points
```

La existencia de esa consulta no convierte esos cuatro campos en el mínimo obligatorio de la experiencia objetivo ni demuestra autoridad atómica para acumular.

---

#### 69. Brechas runtime y propietarios

| Brecha | Impacto | Propietario de salida | Condición de salida |
| --- | --- | --- | --- |
| PermissionKey objetivo de loyalty ausente del catálogo activo | la acción no puede considerarse autorizada por clave atómica vigente | catálogo/autorización canónica posterior + `PULSO-AUTH-015` cuando corresponda | PermissionKey compatible publicada y evaluable sin contradicción con datasets vigentes |
| grants `pulso.loyalty.*` ausentes de `operational-role-grants@1.0.0` | ningún rol operativo recibe hoy autoridad ejecutable de acumulación por ese dataset | AUTH-CAT / matriz propietaria posterior | grant explícito vigente, scope y condiciones publicados |
| `pulso.pos.main` protege identificación/award AS-IS | broad authority puede ocultar intención exacta | `PULSO-AUTH-009` / `PULSO-AUTH-015` en su materialización física gobernada | mutación y lectura sensible usan autoridad exacta o frontera equivalente aprobada |
| monto se digita manualmente | puede divergir del hecho comercial | integración PULSO-PASS / consumer físico | monto elegible se resuelve o reconcilia server-side contra origen |
| referencia usa timestamp y aleatoriedad | retry puede crear identidad nueva | integración/materialización propietaria | misma venta reutiliza identidad estable antes del primer efecto |
| input no exige origin business ID | acumulación puede quedar sin compra trazable | integración/materialización propietaria | comando requiere hecho origen estable y validado |
| fórmula local `floor(amount/1000)` | puede divergir de regla PASS | PASS propietario de regla | preview y resultado consumen regla/version gobernada |
| firma se adjunta después del efecto | puede existir efecto sin vínculo durable completo | `PULSO-AUTH-012`, `PULSO-AUTH-013` y unidad propietaria | actor/dispositivo/resultado quedan correlacionados o reconciliables antes de certificar éxito |
| proyección actual incluye email | puede superar necesidad operacional | UX/privacidad + integración | proyección mínima aprobada por finalidad |

No queda una brecha narrativa sin owner y condición de salida.

---

#### 70. Frontera con PULSO-UX-013

`PULSO-UX-013 — Diseñar confirmaciones para acciones sensibles` conserva el patrón general de confirmación de acciones sensibles.

Esta tarea solo exige evitar doble envío y distinguir intención de resultado.

No diseña el sistema transversal de confirmaciones.

---

#### 71. Frontera con PULSO-UX-014

`PULSO-UX-014 — Mostrar siempre el actor real en dispositivos compartidos` conserva la presentación y persistencia transversal del actor efectivo.

Esta tarea consume esa identidad cuando exista; no diseña PIN, reautenticación ni dispositivo.

---

#### 72. Frontera con PULSO-UX-015

`PULSO-UX-015 — Optimizar flujos para tablet y touch` conserva la optimización transversal de estación y tacto.

Esta tarea exige controles comprensibles, estados legibles y prevención de doble envío sin absorber ese diseño global.

---

#### 73. Accesibilidad y comprensión

La experiencia debe:

- identificar el estado por texto y no solo por color;
- anunciar procesamiento, éxito, rechazo y conciliación pendiente de forma comprensible;
- mantener foco y contexto cuando aparece un error;
- evitar que mensajes transitorios sean la única evidencia del resultado;
- permitir reconocer claramente qué cliente y qué venta están asociados a la intención actual;
- no mostrar datos personales innecesarios en mensajes de error.

---

#### 74. Privacidad en dispositivo compartido

Al finalizar, cancelar o cambiar de cliente, la superficie limpia las proyecciones personales que ya no sean necesarias para la operación actual.

No deja nombre, correo, saldo o referencias personales visibles para el siguiente operador o cliente por simple persistencia de estado UI.

---

#### 75. Realtime y refresco

Una actualización realtime o un nuevo fetch puede refrescar saldo o estado, pero no concede autoridad ni crea el movimiento.

Si dos fuentes visibles divergen, la UI no elige silenciosamente la cifra más conveniente: conserva la fuente autoritativa y expone conciliación cuando corresponda.

---

#### 76. Offline y degradación

Sin servidor autoritativo disponible no existe acumulación definitiva local.

La interfaz puede conservar contexto suficiente para informar al operador, pero no puede:

- incrementar saldo;
- crear ledger;
- marcar éxito;
- regenerar identidad y reenviar como nuevo hecho;
- transformar una cola futura en autoridad local.

Esta tarea no crea una arquitectura offline ni outbox.

---

#### 77. Auditoría mínima visible para soporte

La experiencia debe permitir correlacionar el caso sin exponer secretos mediante referencias a:

- cliente;
- hecho comercial;
- sede;
- actor cuando aplique;
- identidad idempotente o recibo seguro;
- estado semántico;
- resultado PASS;
- momento de operación.

PIN, token, secreto de sesión y datos personales no necesarios quedan fuera.

---

#### 78. Matriz de decisiones UX

| Condición | Acción visible | Resultado permitido |
| --- | --- | --- |
| cliente no identificado | identificar | sin acumulación todavía |
| cliente identificado, hecho comercial ausente | informar falta de contexto elegible | cero efecto |
| hecho comercial no elegible | informar rechazo empresarial | cero efecto |
| autoridad exacta no publicada | mostrar acumulación no habilitada | cero efecto |
| autoridad denegada | informar indisponibilidad autorizativa | cero efecto |
| autoridad válida + elegibilidad válida | solicitar acumulación | espera resultado server-side |
| `APPLIED` | mostrar puntos/resultados confirmados | un efecto |
| `ALREADY_APPLIED` | mostrar resultado previo | cero segundo efecto |
| `IDEMPOTENCY_CONFLICT` | detener y conservar referencia | cero segundo efecto |
| `UNKNOWN_OUTCOME` | mostrar conciliación pendiente | no repetir como nueva intención |
| fallo técnico sin efecto probado | mostrar fallo recuperable según contrato | retry solo seguro y con misma identidad |

---

#### 79. Handoff inmediato a PULSO-UX-012

`PULSO-UX-012 — Integrar redención de puntos` recibe:

```text
IDENTIFICACION DE CLIENTE != REDENCION
ACUMULACION CONFIRMADA != INTENCION DE REDENCION
SALDO VISIBLE NO AUTORIZA GASTO DE PUNTOS
PASS CONSERVA LEDGER, SALDO, REGLA Y SEMANTICA DE FIDELIZACION
PULSO NO REUTILIZA EL COMANDO DE ACUMULACION PARA REDIMIR
RESULTADO DESCONOCIDO DE ACUMULACION NO SE RESUELVE MEDIANTE CANJE
LA AUTORIDAD DE REDENCION DEBE RECONCILIARSE CONTRA EL CATALOGO VIGENTE DE FORMA INDEPENDIENTE
```

Esta tarea no desarrolla el detalle de `VSCREEN-0086`.

---

#### 80. Requisitos de prueba derivados

**Resultado:** NO GENERA REQUISITOS DE PRUEBA.

**Requisitos creados:** 0
**Requisitos modificados:** 0
**Requisitos diferidos:** 0
**Requisitos obsoletos:** 0

Justificación: la experiencia de acumulación ya cuenta con cobertura verificable vigente para servidor autorizado, hecho comercial elegible, ledger/saldo, regla y versión, idempotencia, referencia estable, dispositivo/actor, resultado confirmado, territorialidad y resultado desconocido. Esta tarea organiza esas obligaciones en `VSCREEN-0085` y explicita el bloqueo de autoridad vigente sin introducir una obligación material nueva.

---

#### 81. Cobertura de prueba vigente reutilizada

Se reutiliza sin modificar el Registro 04A la cobertura vigente de:

- `TREQ-PULSO-001` para demostrar loyalty dentro del POS E2E antes de declarar la operación completa;
- `TREQ-PULSO-014` y `TREQ-PULSO-015` para acceso protegido y territorio no ampliable por `site_id`;
- `TREQ-PULSO-026` para impedir atribuir permiso exacto cuando el código o contrato activo no lo demuestran;
- `TREQ-PASS-008` para contratos server-side autorizados, atómicos e idempotentes y prohibición de escritura directa de ledger/saldo;
- `TREQ-PASS-010` para ledger reconciliable, saldo como proyección, evento origen, regla/version y retries sin duplicación;
- `TREQ-PASS-025` para comando de acumulación autorizado, territorial, atómico e idempotente con cliente, compra elegible, monto, moneda, actor, dispositivo y referencia externa;
- `TREQ-PASS-026` para prohibir referencias basadas únicamente en timestamp, aleatoriedad, IDs truncados o estado de UI;
- `TREQ-PASS-029` para actor real en dispositivo compartido y correlación con resultado;
- `TREQ-PASS-032` para que procesamiento, éxito y error correspondan al resultado confirmado de servidor y distingan duplicado, conflicto, denegación y ya aplicado;
- cobertura AUTH vigente para autorización canónica, equivalencia entre capas, territorio y actor efectivo;
- cobertura INTEGRATION vigente para idempotencia, replay, conflicto y recuperación de `UNKNOWN_OUTCOME`.

Esta enumeración es trazabilidad heredada y no actualiza el Registro 04A.

---

#### 82. Evidencia de validación

| Clase | Estado | Evidencia |
| --- | --- | --- |
| BUILD | NOT_EXECUTED | La compilación documental real corresponde al checkout local después de incorporar el artefacto; esta tarea no materializa producto. |
| LOCAL | NOT_EXECUTED | El artefacto todavía no ha sido insertado en el checkout del usuario ni sometido allí a formateador, quality, delivery, validadores proporcionales y batería global. |
| REMOTA | PASS | Se verificaron `vento-shell/main`, fuentes de protocolo/continuidad/topología, owner PULSO, `VSCREEN-0085`, binding `VPROC-0045`, ownership PASS, estados/eventos, `PASS-INT-001`, `PULSO-AUTH-009`, Registro 04A aplicable, catálogo `permissions.json@1.0.0`, `operational-role-grants@1.0.0` y runtime `vento-pulso/main@715b5683db05caa010d725679b5ada4705a6da6e`; se constató que el catálogo/dataset activos no publican `pulso.loyalty.*`. |
| OPERATIVA | NOT_EXECUTED | No se ejecutaron ventas, identificación real, acumulaciones, retries, timeouts, dispositivos compartidos, conciliaciones ni pruebas E2E. |
| FÍSICA | NOT_APPLICABLE | `PULSO-UX-011` es `DEFINE_ONCE / NO_PHYSICAL_INSTANCE`; no crea ni autoriza cambios de producto, datos o infraestructura. |

---

#### 83. Criterios de aceptación

- [ ] La superficie queda anclada exactamente a `VSCREEN-0085`.
- [ ] El binding queda anclado a `VPROC-0045::STEP-IDENTIFY_CUSTOMER_AND_ACCRUE`.
- [ ] PASS permanece owner de `VPROC-0045`, ledger, saldo y regla de fidelización.
- [ ] Identificación de cliente y acumulación son decisiones distintas.
- [ ] `VSCREEN-0086` y redención permanecen reservadas a `PULSO-UX-012`.
- [ ] Se consume `PASS-INT-001` sin redefinir su contrato.
- [ ] `pulso.loyalty.points.accumulate` se documenta como identidad objetivo aprobada de `PULSO-AUTH-009`, no como PermissionKey activa vigente.
- [ ] Se documenta que `permissions.json@1.0.0` no contiene `pulso.loyalty.*`.
- [ ] Se documenta que `operational-role-grants@1.0.0` no contiene grants `pulso.loyalty.*`.
- [ ] La acumulación queda fail-closed mientras no exista autoridad exacta activa compatible.
- [ ] `pulso.pos.main` no sustituye la autoridad exacta.
- [ ] El cliente se resuelve server-side y se mantiene separado del trabajador.
- [ ] La proyección de cliente se minimiza por finalidad.
- [ ] El saldo visible se trata como proyección PASS y no como ledger ni autorización.
- [ ] Toda acumulación se relaciona con un hecho comercial estable y elegible.
- [ ] Monto y moneda se resuelven desde fuente autoritativa.
- [ ] Pago y acumulación permanecen hechos separados.
- [ ] Caja y acumulación permanecen hechos separados.
- [ ] Regla, multiplicador, redondeo, promoción y vigencia permanecen bajo contrato PASS.
- [ ] Una previsualización de puntos se marca como estimación.
- [ ] `floor(amount/1000)` AS-IS no se convierte en regla canónica.
- [ ] El comando visible representa una solicitud al servidor, no un incremento local de saldo.
- [ ] El estado de autoridad vigente se evalúa antes de habilitar la acción.
- [ ] `site_id` del navegador no amplía territorio.
- [ ] Firma/PIN de dispositivo compartido identifica actor pero no concede permiso.
- [ ] La identidad idempotente existe antes del primer efecto.
- [ ] `Date.now`, `Math.random` e IDs truncados no bastan como identidad final.
- [ ] Replay equivalente recupera el resultado sin segundo efecto.
- [ ] Reutilización incompatible produce conflicto.
- [ ] `UNKNOWN_OUTCOME` se reconcilia antes de repetir.
- [ ] El ledger PASS es evidencia durable y el saldo una proyección reconciliable.
- [ ] La UI distingue `APPLIED`, `ALREADY_APPLIED`, denegación, rechazo empresarial, conflicto, resultado desconocido y fallo técnico.
- [ ] Un spinner, toast o saldo local no se usan como evidencia de éxito.
- [ ] Refund/cancelación/devolución no editan destructivamente la acumulación original.
- [ ] No se crea ni consume redención desde esta tarea.
- [ ] Consentimientos permanecen fuera del alcance de acumulación.
- [ ] Se reutilizan únicamente los estados y eventos canónicos existentes de `VPROC-0045`.
- [ ] No se inventan etiquetas para las cuatro acciones secundarias de `VSCREEN-0085`.
- [ ] Las brechas AS-IS de runtime tienen owner y condición de salida.
- [ ] No se crean ni modifican requisitos de prueba.
- [ ] No se modifica el Registro 04A.
- [ ] No se ejecuta ningún cambio físico.

---

#### 84. Límites

Esta tarea no:

- modifica `vento-pulso`;
- modifica `vento-pass`;
- publica PermissionKeys;
- modifica `permissions.json`;
- modifica `operational-role-grants`;
- concede grants a `cajero_satelite`, `operador_integral_satelite` o `gerencia_operativa`;
- convierte `pulso.pos.main` en permiso canónico de loyalty;
- modifica `identifyClientAction`;
- modifica `awardLoyaltyPointsAction`;
- modifica `loyalty-award.api.ts`;
- modifica `QRScanner`;
- cambia la fórmula de puntos;
- define tasa, redondeo, multiplicador o promoción;
- crea un hecho comercial;
- cambia ventas o pagos;
- cambia caja;
- inserta ledger;
- cambia saldo;
- crea o valida una redención;
- modifica consentimientos;
- crea RPC, RLS, ACL, índices o tablas;
- crea migraciones;
- modifica Supabase;
- modifica datos;
- crea arquitectura offline/outbox;
- modifica el Registro 04A;
- crea una instancia física;
- ejecuta pruebas operativas;
- desarrolla `PULSO-UX-012`.

---

#### 85. Decisión final de experiencia

La experiencia objetivo queda resumida así:

```text
VENTA / HECHO COMERCIAL RESOLUBLE
+
CLIENTE IDENTIFICADO
+
ELEGIBILIDAD PASS
+
AUTORIDAD ACTIVA EXACTA
+
IDENTIDAD IDEMPOTENTE ESTABLE
+
COMANDO SERVER-SIDE
+
RESULTADO DURABLE PASS
=
ACUMULACION PRESENTABLE COMO CONFIRMADA
```

En el estado canónico vigente, la ausencia de `pulso.loyalty.*` en el catálogo y grants activos hace que el término `AUTORIDAD ACTIVA EXACTA` no se satisfaga todavía.

Por tanto, el diseño queda completo, pero la ejecución de acumulación permanece bloqueada de forma fail-closed hasta reconciliación canónica posterior.

---

#### 86. Continuidad

**ÚLTIMA TAREA APROBADA**
`PULSO-UX-010 — Diseñar apertura y cierre de caja`

**TAREA ACTUAL APROBADA**
`PULSO-UX-011 — Integrar acumulación de puntos`

**SIGUIENTE TAREA RESERVADA**
`PULSO-UX-012 — Integrar redención de puntos`
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
