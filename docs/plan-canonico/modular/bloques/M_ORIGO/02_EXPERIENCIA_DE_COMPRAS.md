### MINI-BLOQUE — EXPERIENCIA DE COMPRAS

<!-- PLAN-SECTION-META:START -->
Esta sección organiza **experiencia de compras** dentro de **M ORIGO**. Agrupa tareas que producen un resultado funcional común y deben mantenerse juntas para conservar contexto, trazabilidad y orden de ejecución.

**Cobertura canónica:** `ORIGO-UX-001` a `ORIGO-UX-016` — 16 tareas.

**Resultado esperado:** al cerrar este mini-bloque, su resultado debe quedar definido, verificable y coherente con las secciones anterior y siguiente antes de avanzar.

**Límites funcionales:** comienza con “Inventariar el proceso completo de abastecimiento” y concluye con “Validar el prototipo con compras y recepción”.
<!-- PLAN-SECTION-META:END -->

<!-- EXECUTION-GATE-RECONCILIATION:B601-800:ORIGO-UX -->
### Reconciliación topológica de ORIGO-UX-001 a ORIGO-UX-016

La familia define y valida la experiencia de abastecimiento. No genera una implementación física propia; sus decisiones se materializan en paquetes posteriores.

| modalidad | `DEFINE_ONCE` |
| gate temporal | `NO_PHYSICAL_INSTANCE` |

### ✅ ORIGO-UX-001 — Inventariar el proceso completo de abastecimiento

**Estado:** APROBADA
**Tarea anterior:** ORIGO-AUTH-015 — Ejecutar pruebas integrales
**Tarea siguiente:** ORIGO-UX-002 — Separar solicitud, compra, aprobación y recepción
**Tipo de tarea:** documental; inventario integral AS-IS/canónico del ciclo de abastecimiento ORIGO, reconciliando procesos `VPROC-0019..0022`, pantallas `VSCREEN-0068..0079` y `VSCREEN-0145..0146`, rutas, acciones, estados, handoffs, brechas y propietarios posteriores sin diseñar todavía la experiencia objetivo; `DEFINE_ONCE` / `NO_PHYSICAL_INSTANCE`
**Bloque:** BLOQUE M — ORIGO
**Repositorio propietario:** `vento-group-sas/vento-shell`
**Archivo propietario:** `docs/plan-canonico/modular/bloques/M_ORIGO/02_EXPERIENCIA_DE_COMPRAS.md`
**Estado físico resultante:** `NO_PHYSICAL_INSTANCE`
**Cambios físicos autorizados:** ninguno; esta tarea no modifica código, rutas, navegación, procesos, pantallas, permisos, roles, grants, datos, tablas, RLS, RPC, migraciones, Supabase, Storage, packages, consumidores ni despliegues
**Requisitos de prueba creados o modificados:** 0

---

#### 1. Propósito

Inventariar de forma cerrada y verificable cómo se representa hoy el abastecimiento en ORIGO y reconciliarlo contra el ciclo canónico aprobado, sin confundir la existencia de una ruta, formulario, tabla o estado técnico con la existencia de un proceso empresarial completo.

La regla de lectura queda:

```text
RUTA / FORMULARIO EXISTENTE
!=
PROCESO COMPLETO
!=
PANTALLA CANÓNICA
!=
ESTADO EMPRESARIAL
!=
TRANSICIÓN ALCANZABLE
!=
AUTORIZACIÓN
!=
HANDOFF CONFIRMADO
```

La tarea fija el universo que `ORIGO-UX-002..016` deberá diseñar, separar y validar posteriormente. No diseña todavía esos flujos ni materializa cambios físicos.

---

#### 2. Frontera recibida de ORIGO-AUTH-015

El minibloque de autorización entrega una restricción explícita:

```text
ORIGO AUTH UNIT PASS
!=
ORIGO UX COMPLETE
```

La experiencia ORIGO consume las capacidades, carriles, territorio, contexto, actor, seguridad y oracles ya definidos por `ORIGO-AUTH-001..015`, pero no los redefine.

Por tanto:

1. la UX puede inventariar y diseñar procesos sobre autoridad ya definida;
2. una página visible no concede permiso;
3. una acción visible no sustituye la revalidación server-side;
4. la experiencia no crea roles, scopes, permisos ni grants;
5. la experiencia no convierte un estado local en verdad empresarial;
6. la experiencia no fusiona ORIGO, NEXO y NUMERA por compartir una recepción.

---

#### 3. Naturaleza y topología

La reconciliación vigente para `ORIGO-UX-001..016` establece:

```text
mode = DEFINE_ONCE
execution_gate = NO_PHYSICAL_INSTANCE
```

Consecuencias:

- existe un único contrato documental `ORIGO-UX-001`;
- no existe identidad física `ORIGO-UX-001::<implementation_unit_id>`;
- esta tarea no modifica `vento-origo`;
- esta tarea no modifica físicamente `vento-shell`;
- no crea datos, migraciones, RLS, RPC, Server Actions ni despliegues;
- las materializaciones posteriores pertenecen a los paquetes y propietarios físicos correspondientes.

---

#### 4. Snapshot de evidencia utilizado

El inventario se ancla a los estados verificables:

```text
vento-shell/main = 894f89b1aeebf14128f9880b2ec6219d36cd1ca8
vento-origo/main = 70860f1ca5f0a4a73e894cbb840956f9f7eda2ad
```

Además se consume como predecesor documental inmediato el artefacto completo aprobado de `ORIGO-AUTH-015`.

La baseline del consumidor ORIGO reconoce:

- 13 archivos de página;
- 3 patrones dinámicos de página;
- 1 route handler;
- 12 rutas sincronizadas;
- 4 candidatas de menú;
- 12 superficies técnicas de baseline;
- 8 contratos fuente;
- 42 pruebas contractuales CI009.

Estas cifras identifican el snapshot inspeccionado. No demuestran que el proceso canónico de abastecimiento esté completo.

---

#### 5. Universo canónico de procesos ORIGO

El catálogo de procesos asigna exactamente cuatro procesos propietarios al ciclo de compras y proveedores:

| Proceso | Alias AS-IS | Propósito empresarial canónico | Propietaria | Frontera principal |
| --- | --- | --- | --- | --- |
| `VPROC-0019` | `ASIS-SRC-019` | Capturar y priorizar necesidades de compra mediante una entrada única y trazable | `origo` | una necesidad validada no es todavía selección de proveedor ni orden |
| `VPROC-0020` | `ASIS-SRC-020` | Comparar proveedores y condiciones con evidencia suficiente para decidir | `origo` | una recomendación o selección no autoriza todavía el compromiso económico |
| `VPROC-0021` | `ASIS-SRC-021` | Aprobar y emitir compras separando flujo ordinario, urgencia y excepción | `origo` | una compra formalizada no equivale a recepción, inventario ni pago |
| `VPROC-0022` | `ASIS-SRC-022` | Recibir compras, verificar conformidad y resolver diferencias sin separar recepción física, documental y económica | `origo` | ORIGO acepta o rechaza comercialmente; NEXO registra entrada/custodia física y NUMERA gobierna el hecho económico |

No se crea un quinto proceso para explicar una brecha de interfaz.

---

#### 6. Distinción obligatoria entre los cuatro procesos

El canon prohíbe colapsarlos:

```text
VPROC-0019  NECESIDAD / REQUERIMIENTO
      ↓
VPROC-0020  EVALUACIÓN / SOURCING / SELECCIÓN
      ↓
VPROC-0021  APROBACIÓN / ORDEN / COMPROMISO
      ↓
VPROC-0022  RECEPCIÓN / CONFORMIDAD / ACEPTACIÓN
```

Por tanto:

```text
NECESIDAD
!=
COTIZACIÓN / EVALUACIÓN
!=
APROBACIÓN
!=
ORDEN
!=
RECEPCIÓN
!=
ENTRADA DE INVENTARIO
!=
HECHO ECONÓMICO
!=
PAGO
```

`ORIGO-UX-002` recibe específicamente la obligación de conservar estas separaciones en la experiencia objetivo.

---

#### 7. Estados canónicos de VPROC-0019

`VPROC-0019` conserva exactamente siete estados en el contrato generado:

```text
PURCHASE_NEED_SUBMITTED
UNDER_VALIDATION
PRIORITIZED
APPROVED_FOR_SOURCING
SOURCING_REQUESTED
CONSOLIDATION_PENDING
PURCHASE_NEED_HANDOFF_COMPLETED
```

La verdad final de este proceso es la transferencia válida de una necesidad hacia abastecimiento. No selecciona proveedor, no aprueba compra y no crea una orden.

---

#### 8. Estados canónicos de VPROC-0020

`VPROC-0020` conserva exactamente ocho estados:

```text
SOURCING_CASE_OPENED
MARKET_REVIEW_IN_PROGRESS
QUOTES_PENDING
COMPARISON_IN_PROGRESS
RECOMMENDATION_PREPARED
DECISION_PENDING
SUPPLIER_SELECTED
SOURCING_DECISION_COMPLETED
```

La verdad final de este proceso es una decisión de abastecimiento cerrada con criterios, riesgos, condiciones y evidencia. No constituye por sí sola una orden emitida.

---

#### 9. Estados canónicos de VPROC-0021

`VPROC-0021` conserva exactamente ocho estados:

```text
PURCHASE_REQUEST_PENDING_APPROVAL
UNDER_REVIEW
PENDING_APPROVAL
APPROVED
ORDER_PREPARING
ORDER_ISSUED
SUPPLIER_ACK_PENDING
PURCHASE_COMMITMENT_FORMALIZED
```

El runtime observado no puede sustituir este lifecycle por:

```text
draft
sent
received
```

Los tres estados técnicos actuales son evidencia AS-IS, no el contrato objetivo.

---

#### 10. Estados canónicos de VPROC-0022

`VPROC-0022` conserva exactamente nueve estados:

```text
RECEIPT_EXPECTED
ARRIVAL_REGISTERED
PHYSICAL_CHECK_IN_PROGRESS
DOCUMENT_CHECK_IN_PROGRESS
DIFFERENCE_UNDER_REVIEW
ACCEPTANCE_PENDING
PUTAWAY_PENDING
ECONOMIC_RECONCILIATION_PENDING
RECEIPT_RECONCILED
```

La recepción canónica no se reduce a crear un `inventory_entry` ni a marcar una orden como recibida.

---

#### 11. Universo canónico de pantallas ORIGO

El catálogo UX asigna exactamente catorce pantallas canónicas a ORIGO:

| Pantalla | Nombre | Proceso principal |
| --- | --- | --- |
| `VSCREEN-0068` | Bandeja de necesidades de compra | `VPROC-0019` |
| `VSCREEN-0069` | Solicitud de compra | `VPROC-0019` |
| `VSCREEN-0070` | Catálogo de proveedores | `VPROC-0020` |
| `VSCREEN-0071` | Alta y expediente de proveedor | `VPROC-0020` |
| `VSCREEN-0072` | Comparación de cotizaciones | `VPROC-0020` |
| `VSCREEN-0073` | Editor de orden de compra | `VPROC-0021` |
| `VSCREEN-0074` | Bandeja de aprobaciones de compra | `VPROC-0021` |
| `VSCREEN-0075` | Detalle y seguimiento de orden | `VPROC-0021` |
| `VSCREEN-0076` | Cola de recepciones | `VPROC-0022` |
| `VSCREEN-0077` | Recepción total o parcial | `VPROC-0022` |
| `VSCREEN-0078` | Resolución de diferencias de recepción | `VPROC-0022` |
| `VSCREEN-0079` | Historial y auditoría de abastecimiento | `VPROC-0022` |
| `VSCREEN-0145` | Contratos, precios y condiciones de proveedor | `VPROC-0020` |
| `VSCREEN-0146` | Desempeño y reclamaciones de proveedor | `VPROC-0020` |

La existencia canónica de una pantalla no implica que exista hoy una ruta equivalente en `vento-origo`.

---

#### 12. Inventario de rutas AS-IS de vento-origo

La baseline vigente reconoce exactamente trece archivos de página:

| Ruta | Archivo | Clasificación primaria |
| --- | --- | --- |
| `/` | `src/app/page.tsx` | entrada/navegación ORIGO |
| `/login` | `src/app/login/page.tsx` | puente de acceso |
| `/no-access` | `src/app/no-access/page.tsx` | denegación |
| `/product-master-review` | `src/app/product-master-review/page.tsx` | revisión de solicitudes de maestro originadas durante recepción |
| `/purchase-orders` | `src/app/purchase-orders/page.tsx` | listado de órdenes y estados AS-IS |
| `/purchase-orders/new` | `src/app/purchase-orders/new/page.tsx` | creación de orden borrador |
| `/purchase-orders/[id]` | `src/app/purchase-orders/[id]/page.tsx` | detalle, documento, envío y acceso a recepción |
| `/purchase-orders/[id]/edit` | `src/app/purchase-orders/[id]/edit/page.tsx` | edición de borrador |
| `/receipts` | `src/app/receipts/page.tsx` | historial/gestión AS-IS de recepciones materializadas como entradas |
| `/receipts/new` | `src/app/receipts/new/page.tsx` | registro de recepción |
| `/suppliers` | `src/app/suppliers/page.tsx` | catálogo básico de proveedores |
| `/suppliers/new` | `src/app/suppliers/new/page.tsx` | alta básica de proveedor |
| `/suppliers/[id]/edit` | `src/app/suppliers/[id]/edit/page.tsx` | edición básica de proveedor |

Existe además el route handler técnico:

```text
/purchase-orders/[id]/pdf
src/app/purchase-orders/[id]/pdf/route.ts
```

El handler no se contabiliza como pantalla de abastecimiento.

---

#### 13. Vocabulario de clasificación del inventario

Esta tarea usa únicamente estas etiquetas documentales:

| Estado | Significado |
| --- | --- |
| `AS_IS_REAL` | existe una interacción alcanzable que produce o consulta el hecho empresarial observado |
| `AS_IS_PARTIAL` | existe parte de la experiencia, pero faltan etapas, actores, estados, decisiones o handoffs del contrato completo |
| `AS_IS_COLLAPSED` | varias etapas o responsabilidades canónicas están embebidas en una misma acción o representación |
| `NO_DEDICATED_SURFACE_OBSERVED` | el snapshot inspeccionado no contiene una superficie dedicada equivalente |
| `CONTRACT_ONLY` | existe contrato canónico, pero el runtime observado no demuestra una experiencia equivalente |

Estas etiquetas no son estados de negocio persistibles y no sustituyen `VPROC-*`.

---

#### 14. Matriz consolidada de procesos reales

| Proceso | Evidencia AS-IS | Clasificación | Conclusión |
| --- | --- | --- | --- |
| `VPROC-0019` | no existe página dedicada de necesidad o solicitud; el runtime ofrece acceso directo a crear una orden | `CONTRACT_ONLY` | el snapshot no demuestra captura, validación, priorización, consolidación ni handoff de necesidades |
| `VPROC-0020` | existe maestro básico de proveedores y relaciones producto-proveedor; no existe RFQ, captura/comparación de ofertas, recomendación ni selección trazable como workflow | `AS_IS_PARTIAL` + `AS_IS_COLLAPSED` | proveedor y condiciones existen parcialmente, pero sourcing no está representado como proceso completo |
| `VPROC-0021` | `/purchase-orders*` crea, edita, muestra y cambia una orden de `draft` a `sent`; existe PDF y seguimiento básico | `AS_IS_REAL` + `AS_IS_COLLAPSED` | existe compra real, pero aprobación, versión, segregación, preparación, emisión y confirmación del proveedor no están representadas como lifecycle canónico completo |
| `VPROC-0022` | `/receipts*` registra recepciones con OC o directas, modo `record_only` o `inventory`, corrección/reversa y efectos sobre inventario/costos | `AS_IS_REAL` + `AS_IS_COLLAPSED` | existe recepción real, pero aceptación comercial, entrada física NEXO y conciliación económica aparecen parcialmente fusionadas en la implementación observada |

Resultado global:

```text
ORDEN REAL EXISTE
+
RECEPCIÓN REAL EXISTE
+
PROVEEDOR BÁSICO EXISTE

PERO

EL CICLO COMPLETO DE ABASTECIMIENTO NO ESTÁ REPRESENTADO COMO WORKFLOW CANÓNICO END-TO-END
```

---

#### 15. Realidad AS-IS de necesidad y solicitud de compra

El runtime inspeccionado no contiene una ruta dedicada equivalente a:

- `VSCREEN-0068 — Bandeja de necesidades de compra`;
- `VSCREEN-0069 — Solicitud de compra`.

La home ofrece acceso directo a:

```text
/purchase-orders
/purchase-orders/new
/suppliers
```

No se observó una superficie donde una necesidad conserve de forma propia:

- solicitante;
- objeto o resultado esperado;
- cantidad;
- fecha requerida;
- justificación;
- prioridad;
- urgencia;
- validación;
- consolidación;
- handoff formal a sourcing.

Por tanto:

```text
NUEVA ORDEN
!=
SOLICITUD DE COMPRA
```

---

#### 16. Realidad AS-IS de proveedores y sourcing

El runtime sí materializa proveedores mediante:

```text
/suppliers
/suppliers/new
/suppliers/[id]/edit
```

Las acciones observadas permiten crear y editar, entre otros:

- nombre;
- identificación tributaria;
- contacto;
- teléfono;
- email;
- dirección;
- notas;
- activo/inactivo;
- modalidad de pago;
- días de crédito.

También existen relaciones `product_suppliers` y costos de abastecimiento observados en otras superficies.

Sin embargo, no se observó una superficie dedicada equivalente a `VSCREEN-0072` para:

- RFQ;
- múltiples cotizaciones comparables;
- vigencia de oferta;
- comparación de precio total;
- calidad/servicio/riesgo;
- recomendación;
- decisión pendiente;
- selección trazable de proveedor.

Por tanto:

```text
PROVEEDOR CRUD
!=
VPROC-0020 COMPLETO
```

---

#### 17. Realidad AS-IS de contratos, precios y desempeño del proveedor

No se observó una pantalla dedicada equivalente a:

- `VSCREEN-0145 — Contratos, precios y condiciones de proveedor`;
- `VSCREEN-0146 — Desempeño y reclamaciones de proveedor`.

El runtime contiene datos comerciales parciales —incluyendo modalidad de pago, crédito, relaciones producto-proveedor y costos observados—, pero esa presencia no demuestra:

- contratos versionados;
- listas de precio versionadas;
- impuestos, fletes, mínimos y vigencias gobernados como condición contractual;
- evaluación derivada de entregas y calidad;
- reclamaciones, respuesta y resolución con evidencia.

`TREQ-ORIGO-005` conserva la obligación empresarial completa.

---

#### 18. Realidad AS-IS de creación y edición de orden

`/purchase-orders/new` permite seleccionar proveedor, sede, productos, presentaciones, cantidades, costo, fecha esperada y notas.

`createPurchaseOrder` crea físicamente:

```text
purchase_orders.status = "draft"
```

junto con sus líneas y total.

`/purchase-orders/[id]/edit` permite reescribir la orden únicamente mientras el estado observado continúe en `draft`.

Esto demuestra un editor de orden real, pero no demuestra que la orden provenga de:

```text
VPROC-0019 COMPLETADO
+
VPROC-0020 COMPLETADO
+
VPROC-0021.PURCHASE_REQUEST_PENDING_APPROVAL
```

Por tanto `VSCREEN-0073` se clasifica como `AS_IS_REAL` para edición física y `AS_IS_PARTIAL` respecto de su semántica canónica completa.

---

#### 19. Realidad AS-IS de aprobación y emisión

La acción física observada `setPurchaseOrderSent` efectúa:

```text
draft
→ sent
```

sobre `purchase_orders`.

No se observó en esa acción una representación completa y separada de:

```text
UNDER_REVIEW
PENDING_APPROVAL
APPROVED
ORDER_PREPARING
ORDER_ISSUED
SUPPLIER_ACK_PENDING
PURCHASE_COMMITMENT_FORMALIZED
```

Tampoco existe una ruta dedicada equivalente a:

`VSCREEN-0074 — Bandeja de aprobaciones de compra`.

Regla del inventario:

```text
CAMBIAR A sent
!=
APROBAR COMPRA
!=
EMITIR ORDEN CANÓNICA
!=
CONFIRMACIÓN DEL PROVEEDOR
```

---

#### 20. Realidad AS-IS de detalle y seguimiento de orden

`/purchase-orders/[id]` permite consultar:

- proveedor;
- sede;
- líneas;
- cantidades;
- costos;
- fecha esperada;
- estado;
- PDF;
- mensaje preparado para proveedor;
- edición mientras está en borrador;
- cambio a enviada;
- acceso a recepción.

Se clasifica `VSCREEN-0075` como `AS_IS_PARTIAL` porque la superficie existe, pero el seguimiento observado usa principalmente `draft/sent/received` y no demuestra todavía:

- revisión de orden;
- aprobación y reaprobación;
- confirmación del proveedor;
- entregas previstas múltiples;
- historial de cambios materiales;
- compromiso formalizado como estado propio.

---

#### 21. Realidad AS-IS de cola de recepciones

`/receipts` consulta actualmente `inventory_entries` filtradas por:

```text
source_app = "origo"
site_id = sede seleccionada
```

La superficie presenta historial y acciones sobre entradas ya creadas, con estados como:

```text
received
reversed
corrected
recorded
draft
cancelled
```

Eso no equivale a una cola canónica de entregas esperadas derivada de `VPROC-0021`.

Por tanto `VSCREEN-0076` se clasifica como `AS_IS_PARTIAL`.

---

#### 22. Realidad AS-IS de recepción total, parcial y directa

`/receipts/new` permite registrar una recepción:

- vinculada a una orden de compra;
- directa/emergencia sin orden;
- con modalidad `inventory`;
- con modalidad `record_only`;
- con corrección de una entrada previa;
- con actor firmado en dispositivo compartido cuando aplica;
- con proveedor, factura, fecha, sede, productos, cantidades, presentaciones, lotes, vencimientos y costos.

El runtime también puede producir o actualizar efectos sobre:

- `inventory_entries`;
- líneas de entrada;
- cantidades recibidas;
- costos de producto;
- eventos de costo;
- estados de entrada;
- solicitudes de revisión de maestro de datos.

Esto demuestra recepción material real.

También demuestra una brecha de ownership:

```text
VPROC-0022 ORIGO
ACEPTACIÓN COMERCIAL / DOCUMENTAL

!=

VPROC-0024 NEXO
INGRESO / UBICACIÓN / CUSTODIA FÍSICA

!=

NUMERA
HECHO ECONÓMICO
```

La implementación observada colapsa parcialmente esas responsabilidades y deberá converger mediante `ORIGO-UX-013..015` y sus propietarios técnicos.

---

#### 23. Modalidad de recepción AS-IS

El runtime distingue explícitamente:

```text
record_only
inventory
```

Y además diferencia entrada:

```text
normal      = asociada con orden
emergency   = directa sin orden
```

Esta distinción es material y no debe perderse en la UX objetivo.

Regla:

```text
REGISTRAR COMPRA SIN MOVIMIENTO
!=
RECIBIR Y MOVER INVENTARIO
```

`TREQ-ORIGO-001` conserva la obligación de hacer visible y auditable esa modalidad sin duplicar cantidades, costos, orden o hecho financiero.

---

#### 24. Realidad AS-IS de diferencias, corrección y reversa

El runtime observado permite:

- iniciar corrección mediante `correction_entry_id`;
- exigir comentario de corrección/reversa;
- reversar determinadas recepciones dentro de una ventana temporal;
- usar el RPC `origo_reverse_inventory_entry`;
- conservar estados `reversed` y `corrected` en la superficie observada.

Eso demuestra mecanismos reales de corrección.

No demuestra por sí solo la pantalla canónica completa `VSCREEN-0078`, que debe resolver de forma explícita diferencias de:

- cantidad;
- calidad;
- precio;
- documento;
- presentación;
- aceptación total, parcial, condicional o rechazo;
- efectos separados posteriores.

Por tanto se clasifica como `AS_IS_PARTIAL` + `AS_IS_COLLAPSED`.

---

#### 25. Realidad AS-IS de maestro de datos durante recepción

`/product-master-review` gestiona solicitudes originadas durante recepción para:

- productos nuevos;
- presentaciones nuevas;
- aprobación;
- rechazo;
- finalización posterior de una recepción pendiente cuando las dependencias quedan resueltas.

La propia superficie declara que no reemplaza el catálogo maestro de NEXO.

Por tanto:

```text
PRODUCT MASTER REVIEW
!=
PROCESO DE ABASTECIMIENTO
```

Es una superficie de soporte de `VPROC-0022`, no una quinta etapa propietaria del ciclo ORIGO.

---

#### 26. Matriz pantalla canónica ↔ AS-IS ↔ propietario posterior

| Pantalla | Estado observado | Evidencia / brecha | Propietario posterior principal | Condición de salida |
| --- | --- | --- | --- | --- |
| `VSCREEN-0068` | `NO_DEDICATED_SURFACE_OBSERVED` | no existe bandeja de necesidades | `ORIGO-UX-003` | inicio de solicitante permite priorizar necesidades sin crear orden |
| `VSCREEN-0069` | `NO_DEDICATED_SURFACE_OBSERVED` | no existe solicitud de compra propia | `ORIGO-UX-002` / `ORIGO-UX-003` | solicitud conserva identidad distinta de orden y aprobación |
| `VSCREEN-0070` | `AS_IS_PARTIAL` | `/suppliers` lista maestro básico, no sourcing completo | `ORIGO-UX-004` | comprador consulta proveedores y condiciones sin confundir catálogo con selección |
| `VSCREEN-0071` | `AS_IS_PARTIAL` | alta/edición básica existe; expediente, documentos y vigencias no están completos | `ORIGO-UX-004` / `ORIGO-UX-016` + contratos propietarios de proveedor | prototipo consume un expediente gobernado sin duplicar maestro |
| `VSCREEN-0072` | `NO_DEDICATED_SURFACE_OBSERVED` | no existe comparación de cotizaciones | `ORIGO-UX-004` | comprador compara ofertas y deja decisión trazable |
| `VSCREEN-0073` | `AS_IS_REAL` + `AS_IS_PARTIAL` | editor real crea/edita borrador, pero sin pipeline previo completo | `ORIGO-UX-007` | orden se prepara desde necesidad/sourcing válidos y conserva versión |
| `VSCREEN-0074` | `NO_DEDICATED_SURFACE_OBSERVED` | no existe bandeja de aprobación | `ORIGO-UX-005` / `ORIGO-UX-008` | aprobador revisa, aprueba, rechaza o devuelve sin autoaprobación |
| `VSCREEN-0075` | `AS_IS_PARTIAL` | detalle existe con `draft/sent/received`, PDF y acceso a recepción | `ORIGO-UX-007` / `ORIGO-UX-008` | seguimiento muestra lifecycle canónico, versiones, evidencia y proveedor |
| `VSCREEN-0076` | `AS_IS_PARTIAL` | `/receipts` lista entradas ORIGO ya materializadas, no entregas esperadas | `ORIGO-UX-006` | receptor obtiene cola de recepciones pendientes por sede/responsabilidad |
| `VSCREEN-0077` | `AS_IS_REAL` + `AS_IS_COLLAPSED` | registro total/parcial/directo real con efectos mezclados | `ORIGO-UX-009` / `ORIGO-UX-010` / `ORIGO-UX-014` | total/parcial quedan explícitos y el handoff físico pertenece a NEXO |
| `VSCREEN-0078` | `AS_IS_PARTIAL` + `AS_IS_COLLAPSED` | corrección/reversa existen sin workflow integral de diferencias | `ORIGO-UX-011` | diferencia se decide por tipo y efecto sin borrar ni duplicar recepción |
| `VSCREEN-0079` | `AS_IS_PARTIAL` | datos de órdenes y recepciones existen dispersos | `ORIGO-UX-016` + gobierno de evidencia | prototipo reconstruye solicitud, sourcing, orden, aprobación, recepción y diferencia |
| `VSCREEN-0145` | `AS_IS_PARTIAL` | existen términos/costos parciales, no contrato/precio versionado completo | `ORIGO-UX-004` / `ORIGO-UX-007` / `ORIGO-UX-012` + contratos propietarios | condiciones vigentes y sensibles se consumen desde fuente gobernada |
| `VSCREEN-0146` | `NO_DEDICATED_SURFACE_OBSERVED` | no existe experiencia dedicada de desempeño/reclamación | `ORIGO-UX-016` + contratos propietarios de proveedor/evidencia | prototipo representa desempeño y reclamaciones desde hechos sin inventar score |

No se crea una tarea adicional para ninguna brecha.

---

#### 27. Frontera ORIGO ↔ NEXO

Se preserva `GAP-OWN-004`:

```text
VPROC-0022
ORIGO
ACEPTACIÓN COMERCIAL Y DOCUMENTAL
        ↓
VPROC-0024
NEXO
ENTRADA, UBICACIÓN Y CUSTODIA FÍSICA
```

Reglas:

1. ORIGO no se convierte en ledger físico por capturar recepción;
2. NEXO no decide aceptación comercial;
3. una recepción aceptada puede producir uno o varios efectos físicos correlacionados;
4. una reentrega no crea una segunda entrada física;
5. la UX debe mostrar el estado del handoff sin fusionar sus verdades empresariales.

`ORIGO-UX-013` y `ORIGO-UX-014` reciben esta frontera.

---

#### 28. Frontera ORIGO ↔ NUMERA

La compra y recepción pueden originar información económica, pero ORIGO no se convierte en propietaria del hecho contable, obligación o pago.

La secuencia conceptual queda:

```text
ORIGO / VPROC-0021
COMPROMISO DE COMPRA
        ↓
ORIGO / VPROC-0022
RECEPCIÓN Y ACEPTACIÓN
        ↓
NUMERA
HECHO ECONÓMICO CORRELACIONADO
        ↓
OBLIGACIÓN / PAGO CUANDO CORRESPONDA
```

La UX de ORIGO puede mostrar referencia/estado correlacionado, pero no inventar un estado financiero propio.

`ORIGO-UX-015` recibe esta frontera.

---

#### 29. Handoffs exactos de ORIGO-UX-001

| Tarea | Entrada exacta proveniente de ORIGO-UX-001 |
| --- | --- |
| `ORIGO-UX-002` | cuatro procesos separados y evidencia de que el runtime actual salta o colapsa etapas |
| `ORIGO-UX-003` | ausencia de bandeja/solicitud dedicada para el solicitante y contrato de `VPROC-0019` |
| `ORIGO-UX-004` | sourcing parcial: proveedor básico existe, comparación de cotizaciones no |
| `ORIGO-UX-005` | ausencia de bandeja dedicada de aprobaciones y lifecycle canónico `VPROC-0021` |
| `ORIGO-UX-006` | `/receipts` actual no equivale a cola de recepciones esperadas |
| `ORIGO-UX-007` | editor de orden real sobre `draft`, con pipeline previo y versionado incompletos |
| `ORIGO-UX-008` | `draft → sent` observado no equivale a aprobación + emisión canónica |
| `ORIGO-UX-009` | recepción real existe y debe diseñarse como aceptación total explícita |
| `ORIGO-UX-010` | recepción real admite cantidades por línea y debe representar parcialidad sin cierre falso |
| `ORIGO-UX-011` | corrección/reversa existen parcialmente, pero falta resolución integral de diferencias |
| `ORIGO-UX-012` | precios y costos aparecen en órdenes/recepciones/proveedores y requieren proyección por autorización |
| `ORIGO-UX-013` | runtime mezcla recepción ORIGO con efectos físicos; NEXO debe evitar una segunda recepción manual del mismo hecho |
| `ORIGO-UX-014` | contrato `VPROC-0022 → VPROC-0024` para entrada física correlacionada e idempotente |
| `ORIGO-UX-015` | contrato `VPROC-0022 → NUMERA` para hecho económico correlacionado sin doble fuente |
| `ORIGO-UX-016` | cuatro procesos, catorce pantallas y esta matriz AS-IS como universo mínimo del prototipo |

---

#### 30. Hallazgos y propietarios

| Hallazgo | Impacto | Propietario | Condición de salida |
| --- | --- | --- | --- |
| no existe necesidad/solicitud de compra dedicada | el runtime puede iniciar demasiado tarde en el ciclo | `ORIGO-UX-002..003` | necesidad y solicitud quedan identificadas y separadas de orden |
| no existe comparación de cotizaciones | selección puede ocurrir fuera del sistema o sin evidencia comparable | `ORIGO-UX-004` | sourcing representa ofertas, comparación, recomendación y selección |
| maestro de proveedor es básico frente al contrato canónico | condiciones y documentos pueden quedar sin versión/gobierno suficiente | contratos propietarios de proveedor + `ORIGO-UX-004`, `007`, `012`, `016` | expediente y condiciones se consumen desde fuente gobernada |
| orden usa `draft/sent/received` | lifecycle empresarial queda colapsado | `ORIGO-UX-002`, `007`, `008` | estados y decisiones se proyectan desde `VPROC-0021` sin equiparaciones falsas |
| no existe bandeja de aprobación | aprobación puede quedar implícita en la emisión | `ORIGO-UX-005`, `008` | decisión de aprobación/rechazo/devolución queda explícita y segregada |
| `/receipts` representa entradas ya creadas | no constituye cola de entregas esperadas | `ORIGO-UX-006` | receptor recibe trabajo pendiente derivado de compromiso válido |
| recepción actual puede ejecutar efectos de inventario/costos | ownership ORIGO/NEXO/NUMERA aparece colapsado | `ORIGO-UX-013..015` + contratos técnicos propietarios | cada dominio recibe un handoff idempotente y conserva su verdad |
| corrección/reversa no equivale a resolución integral de diferencias | discrepancias pueden quedar tratadas solo como ajuste posterior | `ORIGO-UX-011` | cantidad, calidad, precio, documento y presentación tienen decisión explícita |
| historial de abastecimiento está distribuido entre varias superficies | auditoría end-to-end no es una experiencia única observada | `ORIGO-UX-016` + gobierno de evidencia | prototipo reconstruye el ciclo mediante identidades y correlación canónicas |
| `/product-master-review` puede parecer parte del proceso principal | riesgo de confundir soporte de maestro con abastecimiento | `ORIGO-UX-009..016` + owner NEXO del maestro | la UX conserva la superficie como dependencia/handoff y no como proceso ORIGO adicional |

No queda un hallazgo narrativo sin propietario y condición de salida.

---

#### 31. Requisitos de prueba derivados

**Resultado:** NO GENERA REQUISITOS DE PRUEBA.

**Requisitos creados:** 0
**Requisitos modificados:** 0
**Requisitos diferidos:** 0
**Requisitos obsoletos:** 0

Justificación: ciclo de abastecimiento, proveedores, recepción, atomicidad, idempotencia, seguridad, autorización, inventario de rutas y fronteras de integración ya están protegidos por requisitos vigentes. Esta tarea reconcilia el AS-IS con procesos y pantallas ya aprobados sin introducir una obligación empresarial nueva.

---

#### 32. Cobertura de prueba vigente reutilizada

Se reutiliza sin modificar el Registro 04A:

- `TREQ-ORIGO-001` para modalidad de recepción y ausencia de duplicidad entre registro e inventario;
- `TREQ-ORIGO-002` para alcance de órdenes y protección del documento externo;
- `TREQ-ORIGO-003` para atomicidad, idempotencia, corrección y correlación de recepción;
- `TREQ-ORIGO-004` para separación de necesidad, solicitud, sourcing, aprobación, orden y revisión;
- `TREQ-ORIGO-005` para maestro de proveedor, condiciones, precios, contratos, sensibilidad y desempeño;
- `TREQ-ORIGO-006` a `TREQ-ORIGO-025` para inventario, identidad, clasificación y protección de las rutas ORIGO del snapshot aprobado;
- `TREQ-AUTH-001`, `TREQ-AUTH-010`, `TREQ-AUTH-013`, `TREQ-AUTH-014` y `TREQ-AUTH-015` para autorización, segregación, enforcement server-side, frescura y evidencia;
- `TREQ-INTEGRATION-003` para identidad, idempotencia, retry y recuperación de resultados distribuidos;
- `TREQ-INTEGRATION-006` para fuente empresarial única y ausencia de fuentes competidoras;
- `TREQ-UX-005` y `TREQ-UX-007` como cobertura transversal ya relacionada por `TREQ-ORIGO-004`.

Estas referencias son trazabilidad existente y no constituyen una actualización del registro.

---

#### 33. Evidencia de validación

| Clase | Estado | Evidencia |
| --- | --- | --- |
| BUILD | NOT_EXECUTED | La compilación documental corresponde al checkout local después de incorporar el artefacto. |
| LOCAL | NOT_EXECUTED | Formato, quality, delivery, topología, batería global, TREQ y lifecycle quedan pendientes del checkout local. |
| REMOTA | PASS | Se verificaron `vento-shell/main@894f89b1aeebf14128f9880b2ec6219d36cd1ca8`, `vento-origo/main@70860f1ca5f0a4a73e894cbb840956f9f7eda2ad`, owner ORIGO-UX, topología `DEFINE_ONCE / NO_PHYSICAL_INSTANCE`, cuatro procesos `VPROC-0019..0022`, catorce pantallas ORIGO, 13 páginas + 1 route handler AS-IS, baseline CI009 y contratos E1/E2/X aplicables. El predecesor inmediato `ORIGO-AUTH-015` se consume desde su artefacto completo aprobado. |
| OPERATIVA | NOT_EXECUTED | No se ejecutaron solicitudes, cotizaciones, órdenes, aprobaciones, recepciones, diferencias, inventario ni conciliaciones reales. |
| FÍSICA | NOT_APPLICABLE | `ORIGO-UX-001` es `DEFINE_ONCE / NO_PHYSICAL_INSTANCE`; no genera una instancia física propia. |

---

#### 34. Criterios de aceptación

La tarea queda documentalmente completa cuando:

- [ ] se conservan exactamente cuatro procesos ORIGO propietarios `VPROC-0019..0022`;
- [ ] se conservan exactamente catorce pantallas canónicas ORIGO;
- [ ] se conservan exactamente 13 páginas y 1 route handler del snapshot AS-IS inspeccionado;
- [ ] necesidad, sourcing, aprobación/orden y recepción permanecen como procesos distintos;
- [ ] no se interpreta `/purchase-orders/new` como solicitud de compra;
- [ ] no se interpreta proveedor CRUD como sourcing completo;
- [ ] no se interpreta `draft → sent` como aprobación y emisión canónicas completas;
- [ ] no se interpreta `received` como recepción comercial, inventario y conciliación económica simultáneamente;
- [ ] `VPROC-0019` queda clasificado como `CONTRACT_ONLY` en el runtime observado;
- [ ] `VPROC-0020` queda clasificado como parcialmente materializado;
- [ ] `VPROC-0021` reconoce la orden real y documenta el lifecycle colapsado;
- [ ] `VPROC-0022` reconoce la recepción real y documenta el ownership colapsado;
- [ ] las modalidades `record_only` e `inventory` permanecen distintas;
- [ ] recepción con orden y recepción directa/emergencia permanecen distintas;
- [ ] corrección/reversa observadas no se confunden con resolución integral de diferencias;
- [ ] `/product-master-review` permanece como soporte de maestro y no como proceso ORIGO adicional;
- [ ] ORIGO conserva aceptación comercial/documental y NEXO conserva ingreso/custodia física;
- [ ] NUMERA conserva el hecho económico y obligaciones/pagos posteriores;
- [ ] cada pantalla canónica tiene clasificación AS-IS y propietario posterior;
- [ ] cada tarea `ORIGO-UX-002..016` recibe un handoff explícito;
- [ ] cada hallazgo tiene propietario y condición de salida;
- [ ] la UX no redefine autorización;
- [ ] no se crean ni modifican requisitos de prueba;
- [ ] no se ejecutan cambios físicos desde este marcador.

---

#### 35. Límites

Esta tarea no:

- implementa código;
- modifica `vento-origo`;
- modifica físicamente `vento-shell`;
- crea rutas, páginas, layouts, componentes o Server Actions;
- crea procesos `VPROC-*` nuevos;
- crea pantallas `VSCREEN-*` nuevas;
- crea tablas o estados físicos;
- cambia `draft`, `sent`, `received` ni estados de recepción;
- crea permisos, roles, grants o scopes;
- redefine `ORIGO-AUTH-001..015`;
- crea cotizaciones reales;
- aprueba compras reales;
- crea órdenes reales;
- registra recepciones reales;
- crea entradas de inventario;
- crea hechos financieros;
- crea o modifica RLS, RPC, funciones, triggers o migraciones;
- modifica Supabase remoto;
- modifica Storage o secretos;
- modifica packages;
- cambia el Registro 04A;
- desarrolla `ORIGO-UX-002`.

---

#### 36. Continuidad

**ÚLTIMA TAREA APROBADA**
`ORIGO-AUTH-015 — Ejecutar pruebas integrales`

**TAREA ACTUAL APROBADA**
`ORIGO-UX-001 — Inventariar el proceso completo de abastecimiento`

**SIGUIENTE TAREA RESERVADA**
`ORIGO-UX-002 — Separar solicitud, compra, aprobación y recepción`

### [ ] ORIGO-UX-002 — Separar solicitud, compra, aprobación y recepción
### [ ] ORIGO-UX-003 — Diseñar inicio para solicitante
### [ ] ORIGO-UX-004 — Diseñar inicio para comprador
### [ ] ORIGO-UX-005 — Diseñar inicio para aprobador
### [ ] ORIGO-UX-006 — Diseñar inicio para receptor
### [ ] ORIGO-UX-007 — Diseñar creación de orden de compra
### [ ] ORIGO-UX-008 — Diseñar aprobación y rechazo
### [ ] ORIGO-UX-009 — Diseñar recepción total
### [ ] ORIGO-UX-010 — Diseñar recepción parcial
### [ ] ORIGO-UX-011 — Diseñar diferencias contra orden
### [ ] ORIGO-UX-012 — Ocultar precios cuando no correspondan
### [ ] ORIGO-UX-013 — Evitar repetir recepción manualmente en NEXO
### [ ] ORIGO-UX-014 — Conectar recepción con entrada de inventario
### [ ] ORIGO-UX-015 — Conectar compra con evento financiero
### [ ] ORIGO-UX-016 — Validar el prototipo con compras y recepción
