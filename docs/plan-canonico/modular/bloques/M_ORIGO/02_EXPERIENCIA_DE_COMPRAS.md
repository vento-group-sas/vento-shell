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

### ✅ ORIGO-UX-002 — Separar solicitud, compra, aprobación y recepción

**Estado:** APROBADA
**Tarea anterior:** ORIGO-UX-001 — Inventariar el proceso completo de abastecimiento
**Tarea siguiente:** ORIGO-UX-003 — Diseñar inicio para solicitante
**Tipo de tarea:** documental; contrato UX de separación de funciones, identidades, estados, pantallas y handoffs entre solicitud, compra, aprobación y recepción dentro del ciclo ORIGO, preservando `VPROC-0019..0022`, segregación de funciones y fronteras ORIGO/NEXO/NUMERA sin diseñar todavía las pantallas finales por actor; `DEFINE_ONCE` / `NO_PHYSICAL_INSTANCE`
**Bloque:** BLOQUE M — ORIGO
**Repositorio propietario:** `vento-group-sas/vento-shell`
**Archivo propietario:** `docs/plan-canonico/modular/bloques/M_ORIGO/02_EXPERIENCIA_DE_COMPRAS.md`
**Estado físico resultante:** `NO_PHYSICAL_INSTANCE`
**Cambios físicos autorizados:** ninguno; esta tarea no modifica código, rutas, navegación, componentes, procesos, estados físicos, permisos, roles, grants, datos, tablas, RLS, RPC, migraciones, Supabase, Storage, packages, consumidores ni despliegues
**Requisitos de prueba creados o modificados:** 0

---

#### 1. Propósito

Definir de forma cerrada cómo la experiencia ORIGO separa las cuatro funciones operativas del abastecimiento sin crear procesos empresariales paralelos ni permitir que una misma superficie convierta necesidad, sourcing, aprobación y recepción en una sola acción genérica.

La separación queda:

```text
SOLICITAR
!=
COMPRAR
!=
APROBAR
!=
RECIBIR
```

Y se materializa conceptualmente como:

```text
SOLICITANTE
→ expresa y sigue una necesidad

COMPRADOR
→ evalúa opciones, prepara y formaliza la compra

APROBADOR
→ decide sobre la propuesta protegida

RECEPTOR
→ verifica entrega, conformidad y diferencias
```

La tarea no diseña todavía el inicio visual de cada actor. Su responsabilidad es fijar la frontera que `ORIGO-UX-003..006` deberán consumir sin reinterpretarla.

---

#### 2. Entrada aprobada de ORIGO-UX-001

`ORIGO-UX-001 — Inventariar el proceso completo de abastecimiento` dejó fijados:

- cuatro procesos ORIGO propietarios: `VPROC-0019`, `VPROC-0020`, `VPROC-0021` y `VPROC-0022`;
- catorce pantallas canónicas ORIGO: `VSCREEN-0068..0079` y `VSCREEN-0145..0146`;
- trece archivos de página AS-IS y un route handler en `vento-origo`;
- ausencia de una superficie dedicada de necesidad/solicitud;
- sourcing parcialmente materializado;
- orden de compra real con lifecycle AS-IS simplificado `draft/sent/received`;
- ausencia de bandeja de aprobación dedicada;
- recepción real con efectos hoy parcialmente colapsados entre ORIGO, NEXO y NUMERA;
- necesidad de separar actores y responsabilidades antes de diseñar sus inicios.

Esta tarea consume ese inventario y no lo reabre.

---

#### 3. Naturaleza y topología

La reconciliación vigente de `ORIGO-UX-001..016` establece:

```text
mode = DEFINE_ONCE
execution_gate = NO_PHYSICAL_INSTANCE
```

Consecuencias:

1. `ORIGO-UX-002` se define una sola vez;
2. no existe identidad física propia para esta tarea;
3. no modifica `vento-origo`;
4. no modifica físicamente `vento-shell`;
5. no crea rutas, componentes, guards, Server Actions, RLS, RPC, datos ni despliegues;
6. las materializaciones posteriores pertenecen a paquetes y propietarios físicos posteriores.

---

#### 4. Fuentes verificadas

La separación consume y conserva:

- `ORIGO-UX-001` como inventario inmediato aprobado;
- `ORIGO-AUTH-001..015` como contratos de autoridad, segregación, territorio, protección y evidencia;
- `VPROC-0019..0022` como identidades empresariales del ciclo de abastecimiento externo;
- `VSCREEN-0068..0079` y `VSCREEN-0145..0146` como superficies canónicas ORIGO;
- matrices de propósito, propiedad, actores, entradas, salidas, estados, transiciones, auditoría y métricas de E2;
- contratos `INT-PROC-001..005` para aprobación, recepción, inventario y deduplicación;
- frontera `GAP-OWN-004` entre recepción comercial ORIGO e ingreso físico NEXO;
- runtime `vento-group-sas/vento-origo@70860f1ca5f0a4a73e894cbb840956f9f7eda2ad`;
- `vento-group-sas/vento-shell@4c46d4ff332f0a90d3e6510b052e800c110d9526` como estado remoto verificado de las fuentes canónicas publicadas.

---

#### 5. Decisión principal de separación

La experiencia ORIGO reconoce cuatro funciones UX distintas:

| Función UX | Verbo empresarial | Identidad/proceso principal | Resultado que produce | Resultado que NO produce |
| --- | --- | --- | --- | --- |
| solicitante | solicitar | `VPROC-0019` | necesidad identificada, validada, priorizada y transferida | proveedor seleccionado, orden, aprobación o recepción |
| comprador | comprar/preparar | `VPROC-0020` + etapas de preparación/emisión de `VPROC-0021` | evaluación, recomendación, propuesta y orden preparada/emitida conforme a autoridad previa | autoaprobación ni aceptación de recepción |
| aprobador | aprobar/rechazar/devolver | decisión protegida dentro de `VPROC-0021` | decisión autorizada sobre una versión concreta de la compra | creación automática de inventario, recepción o pago |
| receptor | recibir/verificar | `VPROC-0022` | observación, conformidad, diferencia y aceptación/rechazo de entrega | aprobación original de la compra, ledger físico NEXO o pago |

La división es UX y de responsabilidad. No crea `VPROC-*` nuevos.

---

#### 6. Cuatro funciones no equivalen a cuatro procesos nuevos

La tarea distingue funciones de usuario de identidades de proceso.

En particular:

```text
FUNCION DE APROBADOR
!=
NUEVO PROCESO DE APROBACION
```

La aprobación pertenece al proceso canónico `VPROC-0021`.

Asimismo:

```text
FUNCION DE COMPRADOR
!=
UN SOLO VPROC
```

El comprador participa principalmente en:

- `VPROC-0019` como continuador de necesidades;
- `VPROC-0020` como responsable de sourcing;
- `VPROC-0021` como preparador y emisor de compra después de las decisiones aplicables.

Por tanto, la UX puede separar workspaces por función sin fabricar procesos duplicados.

---

#### 7. Segregación funcional obligatoria

El canon conserva la regla:

```text
SOLICITANTE
!=
COMPRADOR
!=
APROBADOR
!=
RECEPTOR
```

Una misma persona puede acumular más de una función únicamente cuando una política aprobada lo permita para el caso concreto.

Incluso entonces:

1. cada acción declara la capacidad efectiva usada;
2. la autoridad se revalida para esa acción;
3. la auditoría conserva actor, función, recurso, estado, contexto y decisión;
4. una capacidad no se hereda automáticamente de otra;
5. conocer o editar una compra no concede aprobación;
6. aprobar una compra no concede recepción;
7. recibir una entrega no prueba que la compra fue aprobada correctamente;
8. una excepción no convierte la acumulación de funciones en regla general.

---

#### 8. Contrato del solicitante

La función de solicitante se apoya en `VPROC-0019`.

Iniciador primario canónico:

```text
AREA_SOLICITANTE
```

Iniciadores alternos permitidos por el proceso incluyen:

- `BODEGA_Y_ABASTECIMIENTO`;
- `RESPONSABLE_PRODUCTIVO`;
- `GERENCIA_O_SUPERVISION_DE_SEDE`;
- `UMBRAL_O_ALERTA`.

La función solicita porque existe una necesidad de abastecimiento no cubierta, no porque ya haya elegido un proveedor o preparado una orden.

Entradas mínimas conservadas por el proceso:

```text
requesting_unit_ref
need_description
item_or_service_refs
required_quantities
required_by
business_justification
```

La UX posterior del solicitante puede mostrar seguimiento y evidencia relacionada, pero no convierte esos datos en una orden de compra.

---

#### 9. Lifecycle del solicitante

La experiencia de solicitud conserva los estados de `VPROC-0019`:

```text
PURCHASE_NEED_SUBMITTED
UNDER_VALIDATION
PRIORITIZED
APPROVED_FOR_SOURCING
SOURCING_REQUESTED
CONSOLIDATION_PENDING
PURCHASE_NEED_HANDOFF_COMPLETED
```

Reglas UX:

- `PURCHASE_NEED_SUBMITTED` significa necesidad registrada, no compra aprobada;
- `PRIORITIZED` expresa prioridad, no selección de proveedor;
- `APPROVED_FOR_SOURCING` habilita continuar el abastecimiento, no compromiso económico;
- `SOURCING_REQUESTED` es handoff hacia evaluación/compra;
- `PURCHASE_NEED_HANDOFF_COMPLETED` cierra la fase de necesidad, no todo el abastecimiento.

`ORIGO-UX-003` diseñará el inicio del solicitante sobre esta frontera.

---

#### 10. Contrato del comprador

La función de comprador tiene como clase funcional principal:

```text
RESPONSABLE_DE_COMPRAS
```

Su responsabilidad UX se divide en dos partes sin fusionarlas:

```text
A. VPROC-0020
   evaluar mercado, proveedores, ofertas y condiciones

B. VPROC-0021
   preparar y emitir una compra cuya decisión de aprobación corresponda al control autorizado
```

El comprador puede:

- recibir necesidades transferidas;
- abrir un caso de sourcing;
- consultar proveedores aptos;
- solicitar/registrar evidencia de cotización;
- comparar condiciones;
- preparar recomendación;
- preparar propuesta de compra;
- preparar una orden aprobada;
- emitir la versión autorizada al proveedor;
- dar seguimiento al compromiso.

El comprador no obtiene por esta función derecho a emitir su propia aprobación final cuando la segregación exige una autoridad distinta.

---

#### 11. Lifecycle de sourcing del comprador

`VPROC-0020` conserva:

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

La UX debe evitar equivalencias incorrectas:

```text
COTIZACION RECIBIDA
!=
PROVEEDOR SELECCIONADO

PROVEEDOR SELECCIONADO
!=
COMPRA APROBADA

COMPRA APROBADA
!=
ORDEN EMITIDA
```

La decisión de sourcing se conserva como entrada identificable para `VPROC-0021`.

---

#### 12. Contrato del aprobador

La función de aprobador no crea un proceso separado. Opera sobre la decisión protegida de `VPROC-0021`.

Autoridades funcionales canónicas:

```text
GERENCIA_GENERAL
COORDINACION_DE_OPERACIONES
```

La decisión principal de aprobación se conserva dentro de la transición:

```text
PENDING_APPROVAL
→ APPROVED
```

La experiencia del aprobador debe recibir una versión concreta y suficientemente completa de la propuesta, con evidencia y dimensiones aplicables.

Debe poder distinguir como mínimo:

- aprobar;
- rechazar;
- devolver/solicitar información cuando el contrato aplicable lo permita;
- identificar urgencia o excepción;
- identificar cambios materiales que invaliden una decisión previa.

La tarea no diseña todavía la bandeja visual. `ORIGO-UX-005` y `ORIGO-UX-008` reciben esa responsabilidad.

---

#### 13. Lifecycle de compra y aprobación

`VPROC-0021` conserva:

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

La separación UX interna queda:

| Estado/etapa | Función predominante | Regla |
| --- | --- | --- |
| `PURCHASE_REQUEST_PENDING_APPROVAL` | comprador | propuesta lista para iniciar control, no aprobada |
| `UNDER_REVIEW` | comprador + apoyos/control | revisión de integridad, evidencia, condiciones y segregación |
| `PENDING_APPROVAL` | aprobador | espera decisión autorizada |
| `APPROVED` | aprobador produce la decisión; comprador consume el resultado | compra autorizada, todavía no emitida |
| `ORDER_PREPARING` | comprador | prepara instrumento exacto aprobado |
| `ORDER_ISSUED` | comprador/emisor autorizado | versión enviada al proveedor |
| `SUPPLIER_ACK_PENDING` | comprador + participante externo | espera reconocimiento/confirmación |
| `PURCHASE_COMMITMENT_FORMALIZED` | comprador como owner operativo del seguimiento | compromiso comercial formalizado |

La UI no puede reducir esta secuencia a `draft → sent`.

---

#### 14. Contrato del receptor

La función de receptor nace en `VPROC-0022`.

Iniciador y ejecutor principal canónico:

```text
RECEPCION_EN_SEDE
```

Apoyos relevantes pueden incluir:

- `BODEGA_Y_ABASTECIMIENTO`;
- `RESPONSABLE_DE_COMPRAS`;
- `RESPONSABLE_DE_CALIDAD_E_INOCUIDAD`;
- `AREA_SOLICITANTE`;
- `RESPONSABLE_FINANCIERO`.

La función de receptor se activa por una entrega física o documental identificable, asociada con una compra o excepción válida.

Entradas mínimas conservadas:

```text
purchase_commitment_ref
supplier_document_refs
received_lines
received_at
receiving_site_ref
receiver_actor_ref
physical_condition
```

El receptor registra lo observado. No reescribe lo originalmente pedido para hacer coincidir la entrega.

---

#### 15. Lifecycle del receptor

`VPROC-0022` conserva:

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

La función receptora debe distinguir:

- llegada;
- verificación física;
- verificación documental;
- diferencia;
- decisión de aceptación;
- handoff posterior a NEXO;
- conciliación económica posterior.

La recepción conforme ordinaria no necesita inventar una aprobación adicional. Una diferencia, rechazo o aceptación condicionada sí activa el control previsto por el contrato.

---

#### 16. Separación de identidades empresariales

Cada etapa conserva identidad propia.

Como mínimo, la experiencia debe impedir que un único identificador genérico sea presentado como si representara simultáneamente:

```text
purchase_need_ref
sourcing_case_ref
sourcing_decision_ref
purchase_commitment_ref
receipt/process_instance_ref
inventory_effect_ref
financial_effect_ref
```

Regla:

```text
CORRELACIONAR
!=
FUSIONAR
```

Una misma cadena de abastecimiento puede relacionar esas identidades, pero cada objeto conserva owner, lifecycle, evidencia y versión propios.

---

#### 17. Handoffs entre etapas

La secuencia nominal UX queda:

```text
VPROC-0019
NECESIDAD TRANSFERIDA
        ↓
VPROC-0020
CASO DE SOURCING Y DECISION
        ↓
VPROC-0021
PROPUESTA + APROBACION + ORDEN + COMPROMISO
        ↓
VPROC-0022
RECEPCION + CONFORMIDAD + DIFERENCIAS
```

Cada handoff debe conservar referencias suficientes para reconstruir el origen sin copiar la identidad anterior como nueva verdad propietaria.

En particular:

1. `VPROC-0020` consume una necesidad válida; no inventa otra necesidad;
2. `VPROC-0021` consume una decisión de sourcing; no reinterpreta una cotización como aprobación;
3. `VPROC-0022` consume un compromiso o excepción válida; no considera cualquier borrador como compra formalizada;
4. los handoffs posteriores a NEXO y NUMERA conservan la identidad de recepción fuente.

---

#### 18. Regla de visibilidad cruzada

Separar funciones no significa ocultar todo el contexto anterior.

Cada función recibe la proyección mínima necesaria para ejecutar su decisión.

Ejemplos:

- el comprador puede conocer necesidad, cantidad, fecha, justificación y especificación necesarias para abastecer;
- el aprobador puede conocer propuesta, proveedor, condiciones, importes, evidencia y clasificación necesarias para decidir;
- el receptor puede conocer orden, proveedor, líneas, presentación y condiciones necesarias para verificar;
- el solicitante puede conocer estado y resultado permitidos de su necesidad sin recibir datos sensibles innecesarios.

La proyección no concede capacidad de mutación sobre la etapa fuente.

---

#### 19. Mapa de pantallas por función

Las catorce pantallas canónicas se distribuyen sin duplicar identidad:

| Pantalla | Función UX primaria | Funciones secundarias autorizables | Regla de separación |
| --- | --- | --- | --- |
| `VSCREEN-0068` — Bandeja de necesidades de compra | solicitante / comprador para triage | supervisión según política | priorizar no crea orden |
| `VSCREEN-0069` — Solicitud de compra | solicitante | comprador para continuidad | solicitar no selecciona proveedor ni aprueba |
| `VSCREEN-0070` — Catálogo de proveedores | comprador | apoyos autorizados | consultar proveedor no adjudica |
| `VSCREEN-0071` — Alta y expediente de proveedor | comprador/owner de proveedor autorizado | control aplicable | alta de proveedor no aprueba compra |
| `VSCREEN-0072` — Comparación de cotizaciones | comprador | aprobador como lectura de evidencia | comparar no autoriza compromiso |
| `VSCREEN-0073` — Editor de orden de compra | comprador | aprobador como lectura | preparar no equivale a aprobar |
| `VSCREEN-0074` — Bandeja de aprobaciones de compra | aprobador | comprador como seguimiento mínimo | decisión protegida separada del editor |
| `VSCREEN-0075` — Detalle y seguimiento de orden | comprador | solicitante/aprobador/receptor con proyección permitida | seguimiento no concede mutaciones de otra función |
| `VSCREEN-0076` — Cola de recepciones | receptor | comprador/supervisión como seguimiento | cola nace de entrega/compromiso, no de cualquier borrador |
| `VSCREEN-0077` — Recepción total o parcial | receptor | apoyos de calidad/bodega | recibir no aprueba compra ni crea por sí solo ledger NEXO |
| `VSCREEN-0078` — Resolución de diferencias | receptor + control separado cuando corresponda | comprador/calidad/finanzas según diferencia | diferencia exige decisión propia; no se edita el original |
| `VSCREEN-0079` — Historial y auditoría de abastecimiento | transversal de lectura autorizada | todas las funciones según finalidad | reconstruye correlaciones sin fusionar objetos |
| `VSCREEN-0145` — Contratos, precios y condiciones de proveedor | comprador | aprobador con proyección mínima | condición comercial no es orden aprobada |
| `VSCREEN-0146` — Desempeño y reclamaciones de proveedor | comprador | calidad/supervisión según caso | desempeño se deriva de hechos y no autoriza compras |

Una pantalla puede servir a más de una función como lectura o apoyo sin perder su proceso propietario ni conceder acciones por visibilidad.

---

#### 20. Regla para usuarios con múltiples funciones

Si una persona posee válidamente más de una función, la experiencia no debe convertirlas en un modo administrativo omnipotente.

La UX debe conservar, para cada acción sensible:

```text
ACTOR
+
FUNCION ACTIVA
+
PROCESO
+
RECURSO
+
ESTADO
+
TERRITORIO
+
PERMISO
+
DECISION / EFECTO
```

Esto permite que una persona pueda, por ejemplo, comprar y recibir en contextos autorizados sin que la acción de recepción herede capacidad de aprobación.

Cuando exista segregación obligatoria, la misma persona no puede cerrar ambos lados de la decisión crítica aunque tenga acceso visual a ambos contextos.

---

#### 21. Solicitud no equivale a orden

La experiencia objetivo prohíbe el atajo:

```text
NECESIDAD
→ FORMULARIO DE ORDEN
→ ORDEN BORRADOR
```

como representación completa del ciclo ordinario.

Antes de preparar una orden, la UX debe conservar la identidad de necesidad y, cuando aplique, la evaluación de proveedor/condiciones.

`/purchase-orders/new` puede seguir siendo una superficie materializable futura del editor de orden, pero no debe presentarse como sustituto de `VSCREEN-0069` ni de `VPROC-0019`.

---

#### 22. Compra no equivale a aprobación

La experiencia objetivo prohíbe:

```text
COMPRADOR CREA PROPUESTA
→ COMPRADOR ENVIA
→ SISTEMA ASUME APROBACION
```

La decisión de aprobación debe quedar explícita cuando el contrato la requiere.

El comprador puede preparar contenido y aportar evidencia; el aprobador decide con autoridad propia.

La mera capacidad de editar o enviar no demuestra segregación ni aprobación.

---

#### 23. Aprobación no equivale a emisión

`APPROVED` es una verdad distinta de `ORDER_ISSUED`.

Después de aprobar:

1. la versión autorizada debe preservarse;
2. el comprador prepara el instrumento correspondiente;
3. cualquier cambio material debe volver al control aplicable;
4. emitir significa enviar una versión identificable al proveedor;
5. generar PDF, enlace, mensaje o vista previa no demuestra por sí solo emisión formal;
6. la confirmación del proveedor ocurre después y no reescribe la aprobación interna.

---

#### 24. Recepción no equivale a aprobación de compra

El receptor no aprueba retrospectivamente la compra por aceptar mercancía.

La experiencia debe conservar:

```text
COMPRA APROBADA / COMPROMISO FORMALIZADO
        ↓
ENTREGA
        ↓
RECEPCION
```

No:

```text
ENTREGA
→ RECEPCION
→ IMPLICA QUE TODO LO ANTERIOR FUE APROBADO
```

Una recepción bajo carril directo, urgente o excepcional debe seguir identificando la excepción y la autoridad aplicable sin fabricar una aprobación histórica inexistente.

---

#### 25. Recepciones múltiples y parcialidad

Una compra puede producir varias recepciones legítimas.

Por tanto:

```text
1 PURCHASE_COMMITMENT
→ 0..N RECEPCIONES VPROC-0022
```

Cada recepción conserva identidad propia y cantidades propias.

La UX no puede:

- marcar toda la compra como recibida por la primera entrega parcial;
- sumar dos veces una misma entrega por retry;
- reutilizar la identidad de una recepción para una llegada real distinta;
- borrar el historial de recepciones anteriores al completar la orden.

`ORIGO-UX-009` y `ORIGO-UX-010` desarrollarán total y parcialidad respectivamente.

---

#### 26. Diferencias de recepción

Una diferencia puede afectar:

- cantidad;
- presentación;
- calidad/condición;
- lote o vencimiento;
- precio;
- impuesto;
- documento;
- proveedor;
- referencia de orden;
- evidencia.

La experiencia no resuelve esas diferencias editando silenciosamente la orden o la observación recibida.

Debe conservar:

```text
LO PEDIDO
+
LO OBSERVADO
+
LA DIFERENCIA
+
LA DECISION
+
EL EFECTO POSTERIOR
```

`ORIGO-UX-011` recibe esta frontera.

---

#### 27. Urgencia y excepción no fusionan funciones

El carril urgente o excepcional puede acortar tiempos y cambiar rutas de decisión según política, pero no cambia las identidades fundamentales.

Incluso en excepción deben permanecer identificables:

- necesidad o causa;
- proveedor;
- líneas y condiciones;
- autoridad;
- compra/compromiso;
- receptor;
- entrega;
- recepción;
- diferencias;
- regularización y evidencia posteriores cuando correspondan.

Regla:

```text
URGENTE
!=
SIN SEGREGACION
!=
SIN AUDITORIA
!=
RECEPCION = APROBACION
```

---

#### 28. Frontera con NEXO

La separación UX termina la función receptora de ORIGO antes del ownership físico de NEXO.

```text
ORIGO / VPROC-0022
ACEPTACION COMERCIAL Y DOCUMENTAL
        ↓
HANDOFF CORRELACIONADO
        ↓
NEXO / VPROC-0024
ENTRADA, UBICACION Y CUSTODIA FISICA
```

Reglas:

1. el receptor ORIGO puede capturar información física necesaria para decidir conformidad;
2. esa captura no convierte ORIGO en ledger físico propietario;
3. NEXO no vuelve a pedir una recepción manual equivalente del mismo hecho aceptado;
4. NEXO revalida su contrato y aplica su efecto físico idempotente;
5. `ORIGO-UX-013` y `ORIGO-UX-014` desarrollarán esta continuidad.

---

#### 29. Frontera con NUMERA

Aprobar, emitir o recibir no significa pagar.

La secuencia conserva:

```text
ORIGO
COMPRA / RECEPCION
        ↓
HECHO ECONOMICO CORRELACIONADO
        ↓
NUMERA
OBLIGACION / CONCILIACION / PAGO SEGUN CORRESPONDA
```

La UX ORIGO puede presentar referencias o estados mínimos de integración autorizados, pero no crea un estado financiero paralelo ni una segunda fuente del hecho económico.

`ORIGO-UX-015` recibe esta frontera.

---

#### 30. Contraste AS-IS de ORIGO

El runtime observado presenta atajos que esta tarea clasifica como brechas de experiencia, no como contrato objetivo.

##### 30.1. Inicio actual

La home ofrece acceso directo a:

- órdenes de compra;
- nueva orden;
- proveedores.

No existe una entrada equivalente dedicada para necesidad/solicitud ni una separación explícita por solicitante, comprador, aprobador y receptor.

##### 30.2. Creación actual de orden

`/purchase-orders/new` parte directamente de proveedor, sede y líneas.

Esto materializa una orden real, pero no demuestra por sí solo:

- `purchase_need_ref`;
- `sourcing_decision_ref`;
- comparación previa;
- aprobación separada;
- versión exacta sometida a decisión.

##### 30.3. Envío actual

La acción observada `setPurchaseOrderSent` realiza el cambio:

```text
draft
→ sent
```

La acción no demuestra por sí sola el lifecycle completo:

```text
PENDING_APPROVAL
→ APPROVED
→ ORDER_PREPARING
→ ORDER_ISSUED
```

##### 30.4. Recepción actual

La superficie `/receipts/new` admite recepción con orden y carril directo/emergencia; el flujo observado puede aceptar órdenes físicas en estados AS-IS simplificados y materializar efectos adicionales.

Eso demuestra una capacidad real de recepción, pero no autoriza a presentar `draft/sent/received` como sustituto de `VPROC-0021` y `VPROC-0022`.

---

#### 31. Patrones explícitamente rechazados

La experiencia posterior no deberá adoptar como arquitectura objetivo:

```text
UN FORMULARIO UNICO DE COMPRA
QUE CREA NECESIDAD + SELECCIONA PROVEEDOR + APRUEBA + RECIBE
```

ni:

```text
UN STATUS GENERICO
QUE SIGNIFICA SOLICITADO / APROBADO / ENVIADO / RECIBIDO / CONTABILIZADO
```

ni:

```text
UN USUARIO CON ACCESO A ORIGO
= SOLICITANTE + COMPRADOR + APROBADOR + RECEPTOR
```

ni:

```text
VISIBILIDAD DE UNA PANTALLA
= CAPACIDAD DE EJECUTAR TODAS SUS ACCIONES
```

ni:

```text
RECEPCION REGISTRADA EN ORIGO
= ENTRADA NEXO + HECHO NUMERA YA CONFIRMADOS
```

---

#### 32. Handoff inmediato a ORIGO-UX-003

`ORIGO-UX-003 — Diseñar inicio para solicitante` recibe este contrato cerrado:

```text
FUNCION = SOLICITANTE
PROCESO PRINCIPAL = VPROC-0019
INICIADOR PRIMARIO = AREA_SOLICITANTE
PANTALLAS PRINCIPALES = VSCREEN-0068 + VSCREEN-0069
NO CREA ORDEN
NO SELECCIONA PROVEEDOR
NO APRUEBA COMPRA
NO RECIBE MERCANCIA
PUEDE CONSULTAR SOLO LA PROYECCION NECESARIA DEL ESTADO POSTERIOR
```

Su responsabilidad será diseñar el inicio y la navegación del solicitante sin reabrir la separación funcional definida aquí.

---

#### 33. Handoff al resto de ORIGO-UX

| Tarea | Entrada exacta proveniente de ORIGO-UX-002 |
| --- | --- |
| `ORIGO-UX-003` | solicitante sobre `VPROC-0019`, separado de orden, aprobación y recepción |
| `ORIGO-UX-004` | comprador sobre sourcing `VPROC-0020` y preparación/emisión de compra sin autoaprobación |
| `ORIGO-UX-005` | aprobador como función separada dentro de `VPROC-0021`, con decisión protegida y evidencia |
| `ORIGO-UX-006` | receptor sobre `VPROC-0022`, sin heredar autoridad de compra ni ownership NEXO |
| `ORIGO-UX-007` | editor de orden pertenece al comprador y consume necesidad/sourcing válidos |
| `ORIGO-UX-008` | aprobación/rechazo separados de edición y emisión |
| `ORIGO-UX-009` | recepción total como instancia `VPROC-0022`, no cierre implícito de todos los dominios |
| `ORIGO-UX-010` | recepción parcial como instancia distinta sin cierre falso de la compra |
| `ORIGO-UX-011` | diferencia conserva pedido, observado, decisión y efectos separados |
| `ORIGO-UX-012` | datos sensibles se proyectan por función/finalidad y no por mera participación en el ciclo |
| `ORIGO-UX-013` | una recepción ORIGO aceptada no se repite manualmente en NEXO |
| `ORIGO-UX-014` | handoff `VPROC-0022 → VPROC-0024` preserva ownership e idempotencia |
| `ORIGO-UX-015` | handoff económico preserva NUMERA como owner financiero |
| `ORIGO-UX-016` | prototipo debe demostrar las cuatro funciones separadas aun cuando una persona acumule capacidades válidas |

---

#### 34. Hallazgos y propietarios

| Hallazgo | Impacto | Propietario | Condición de salida |
| --- | --- | --- | --- |
| no existe inicio dedicado de solicitante | la necesidad puede nacer fuera de ORIGO o convertirse directamente en orden | `ORIGO-UX-003` | solicitante dispone de entrada y seguimiento de `VPROC-0019` sin crear orden |
| sourcing no está representado como workflow completo | comprador puede seleccionar proveedor sin comparación/evidencia canónica visible | `ORIGO-UX-004` | inicio comprador presenta necesidades admitidas, sourcing, cotizaciones y decisiones pendientes |
| no existe bandeja dedicada de aprobación | envío puede confundirse con aprobación | `ORIGO-UX-005`, `ORIGO-UX-008` | decisión protegida queda separada del editor y de la emisión |
| creación de orden comienza directamente en proveedor/sede/líneas | se pierde trazabilidad previa de necesidad y sourcing | `ORIGO-UX-007` | orden consume referencias previas válidas y conserva versión |
| `draft/sent/received` colapsa estados de dos procesos | UX puede presentar lifecycle empresarial incorrecto | `ORIGO-UX-007..011` | pantallas proyectan estados canónicos o equivalencias explícitamente gobernadas |
| recepción AS-IS admite efectos hoy mezclados con inventario/costo | receptor puede parecer owner de NEXO/NUMERA | `ORIGO-UX-013..015` | handoffs separados e idempotentes conservan owners |
| un usuario puede tener varias capacidades reales | riesgo de recombinar funciones por identidad personal | `ORIGO-UX-003..016` + autorización propietaria | cada acción declara función, permiso, estado y recurso; segregación bloquea combinaciones prohibidas |
| urgencia puede tentar a omitir etapas | excepción podría convertirse en bypass permanente | `ORIGO-UX-007..011` + contratos de autorización | carril urgente conserva causa, autoridad, recepción y regularización |

No queda un hallazgo narrativo sin propietario y condición de salida.

---

#### 35. Requisitos de prueba derivados

**Resultado:** NO GENERA REQUISITOS DE PRUEBA.

**Requisitos creados:** 0
**Requisitos modificados:** 0
**Requisitos diferidos:** 0
**Requisitos obsoletos:** 0

Justificación: separación de identidades y estados de abastecimiento, segregación entre solicitante/comprador/aprobador/receptor, aprobación, recepción, ownership, idempotencia y fronteras de integración ya están protegidos por requisitos canónicos vigentes. Esta tarea especializa la experiencia UX sobre esas obligaciones sin introducir una obligación empresarial nueva.

---

#### 36. Cobertura de prueba vigente reutilizada

Se reutiliza sin modificar el Registro 04A:

- `TREQ-ORIGO-001` para modalidad de recepción y ausencia de duplicidad;
- `TREQ-ORIGO-002` para alcance y protección de órdenes/documentos;
- `TREQ-ORIGO-003` para atomicidad, idempotencia y correlación de recepción;
- `TREQ-ORIGO-004` para identidades y estados separados de necesidad, solicitud, sourcing, selección, aprobación, orden y revisión, además de segregación de solicitante, comprador, aprobador y receptor;
- `TREQ-ORIGO-005` para proveedor, condiciones, contratos, precios y desempeño;
- `TREQ-AUTH-001`, `TREQ-AUTH-010`, `TREQ-AUTH-013`, `TREQ-AUTH-014` y `TREQ-AUTH-015` para autorización, segregación, enforcement, frescura y evidencia;
- `TREQ-INTEGRATION-003` para identidad, idempotencia, retry y recuperación de resultados;
- `TREQ-INTEGRATION-006` para propiedad única de hechos y ausencia de fuentes competidoras;
- `TREQ-UX-005` y `TREQ-UX-007` como cobertura transversal ya relacionada por `TREQ-ORIGO-004`.

Estas referencias son trazabilidad vigente y no constituyen una actualización del registro.

---

#### 37. Evidencia de validación

| Clase | Estado | Evidencia |
| --- | --- | --- |
| BUILD | NOT_EXECUTED | `docs:plan:build` corresponde al checkout local después de incorporar el artefacto. |
| LOCAL | NOT_EXECUTED | Formato, quality, delivery, topología, batería global, TREQ y lifecycle quedan pendientes del checkout local. |
| REMOTA | PASS | Se verificaron `vento-shell/main@4c46d4ff332f0a90d3e6510b052e800c110d9526`, `vento-origo/main@70860f1ca5f0a4a73e894cbb840956f9f7eda2ad`, owner ORIGO-UX, topología `DEFINE_ONCE / NO_PHYSICAL_INSTANCE`, procesos `VPROC-0019..0022`, roles funcionales, catorce pantallas ORIGO, contratos de aprobación/recepción y el AS-IS de órdenes y recepciones. La entrada inmediata `ORIGO-UX-001` se consume desde su artefacto completo aprobado conforme al modo documental adelantado. |
| OPERATIVA | NOT_EXECUTED | No se ejecutaron solicitudes, sourcing, aprobaciones, órdenes, recepciones, diferencias, handoffs NEXO ni efectos NUMERA reales. |
| FÍSICA | NOT_APPLICABLE | `ORIGO-UX-002` es `DEFINE_ONCE / NO_PHYSICAL_INSTANCE`; no genera instancia física propia ni autoriza materialización. |

---

#### 38. Criterios de aceptación

La tarea queda documentalmente completa cuando:

- [ ] solicitante, comprador, aprobador y receptor quedan definidos como cuatro funciones UX distintas;
- [ ] no se crean procesos `VPROC-*` nuevos por función;
- [ ] `VPROC-0019` permanece como proceso principal de necesidad/solicitud;
- [ ] `VPROC-0020` permanece como proceso principal de sourcing/comparación;
- [ ] `VPROC-0021` conserva aprobación y formalización de la compra dentro de una sola identidad de proceso;
- [ ] `VPROC-0022` permanece como proceso principal de recepción/conformidad;
- [ ] el comprador puede participar en `VPROC-0019`, `VPROC-0020` y `VPROC-0021` sin adquirir autoaprobación;
- [ ] el aprobador opera sobre una versión concreta de `VPROC-0021` y no crea un proceso paralelo;
- [ ] el receptor no aprueba retrospectivamente la compra;
- [ ] una misma persona con varias funciones conserva capacidad efectiva y auditoría por acción;
- [ ] la segregación obligatoria bloquea combinaciones prohibidas aunque exista visibilidad de pantalla;
- [ ] `VPROC-0019` conserva sus siete estados;
- [ ] `VPROC-0020` conserva sus ocho estados;
- [ ] `VPROC-0021` conserva sus ocho estados;
- [ ] `VPROC-0022` conserva sus nueve estados;
- [ ] necesidad, sourcing, aprobación, orden y recepción conservan identidades y referencias separadas;
- [ ] correlación entre identidades no se convierte en fusión;
- [ ] `VSCREEN-0068..0079` y `VSCREEN-0145..0146` quedan asignadas a funciones sin duplicación;
- [ ] `VSCREEN-0074` permanece separada conceptualmente del editor `VSCREEN-0073`;
- [ ] `VSCREEN-0077` no concede ownership de inventario NEXO;
- [ ] `VSCREEN-0079` reconstruye correlación sin convertirse en fuente editable universal;
- [ ] solicitud no se sustituye por `/purchase-orders/new`;
- [ ] `draft → sent` no se presenta como aprobación canónica completa;
- [ ] `received` no fusiona recepción, inventario y contabilidad;
- [ ] una compra admite múltiples recepciones reales sin duplicidad;
- [ ] diferencias conservan pedido, observación, decisión y efecto posterior;
- [ ] urgencia y excepción no eliminan segregación, identidad ni auditoría;
- [ ] frontera ORIGO/NEXO permanece explícita;
- [ ] frontera ORIGO/NUMERA permanece explícita;
- [ ] cada hallazgo tiene propietario y condición de salida;
- [ ] `ORIGO-UX-003` recibe una frontera suficiente para diseñar el inicio del solicitante;
- [ ] no se crean ni modifican requisitos de prueba;
- [ ] no se ejecutan cambios físicos desde este marcador.

---

#### 39. Límites

Esta tarea no:

- implementa código;
- modifica `vento-origo`;
- modifica físicamente `vento-shell`;
- crea rutas, páginas, layouts, tabs, componentes o botones;
- diseña el layout final del solicitante, comprador, aprobador o receptor;
- crea procesos `VPROC-*` nuevos;
- crea pantallas `VSCREEN-*` nuevas;
- crea estados físicos nuevos;
- crea roles, permisos, grants o scopes;
- cambia matrices RBAC;
- aprueba compras reales;
- crea órdenes reales;
- registra recepciones reales;
- crea movimientos NEXO;
- crea hechos NUMERA;
- modifica tablas, funciones, RPC, RLS, triggers o migraciones;
- modifica Supabase remoto;
- modifica Storage o secretos;
- modifica packages;
- cambia el Registro 04A;
- desarrolla `ORIGO-UX-003`.

---

#### 40. Continuidad

**ÚLTIMA TAREA APROBADA**
`ORIGO-UX-001 — Inventariar el proceso completo de abastecimiento`

**TAREA ACTUAL APROBADA**
`ORIGO-UX-002 — Separar solicitud, compra, aprobación y recepción`

**SIGUIENTE TAREA RESERVADA**
`ORIGO-UX-003 — Diseñar inicio para solicitante`

### ✅ ORIGO-UX-003 — Diseñar inicio para solicitante

**Estado:** APROBADA
**Tarea anterior:** ORIGO-UX-002 — Separar solicitud, compra, aprobación y recepción
**Tarea siguiente:** ORIGO-UX-004 — Diseñar inicio para comprador
**Tipo de tarea:** diseño documental integral de la experiencia inicial del solicitante sobre `VPROC-0019`, con `VSCREEN-0068` como bandeja contextual y `VSCREEN-0069` como solicitud de compra, preservando separación funcional, estados canónicos, minimización, fail-closed y handoff hacia abastecimiento sin crear orden, selección, aprobación ni recepción; `DEFINE_ONCE` / `NO_PHYSICAL_INSTANCE`
**Bloque:** BLOQUE M — ORIGO
**Repositorio propietario:** `vento-group-sas/vento-shell`
**Archivo propietario:** `docs/plan-canonico/modular/bloques/M_ORIGO/02_EXPERIENCIA_DE_COMPRAS.md`
**Estado físico resultante:** `NO_PHYSICAL_INSTANCE`
**Cambios físicos autorizados:** ninguno; esta tarea no modifica código, rutas, navegación, componentes, procesos, permisos, roles, grants, datos, tablas, RLS, RPC, migraciones, Supabase, Storage, packages, consumidores ni despliegues
**Requisitos de prueba creados o modificados:** 0

---

#### 1. Propósito

Diseñar el contrato de experiencia para la entrada de una persona que actúa como solicitante dentro del ciclo de abastecimiento ORIGO, de forma que pueda:

- reconocer su contexto de solicitud;
- iniciar una necesidad de compra sin saltar directamente a una orden;
- seguir las necesidades y solicitudes que le corresponden;
- distinguir estado, bloqueo, validación, prioridad y handoff sin asumir autoridad ajena;
- aportar información suficiente para que abastecimiento continúe;
- recibir una proyección mínima del progreso posterior cuando exista relación legítima;
- operar con una experiencia simple, enfocada y sin exposición innecesaria de proveedores, precios, aprobación o recepción.

La tarea define la experiencia objetivo del solicitante sobre:

```text
VSCREEN-0068 — Bandeja de necesidades de compra
VSCREEN-0069 — Solicitud de compra
VPROC-0019    — Capturar y priorizar necesidades de compra
```

No implementa esas superficies ni crea capacidades de autorización nuevas.

---

#### 2. Entrada aprobada de ORIGO-UX-002

`ORIGO-UX-002` entrega una separación cerrada:

```text
FUNCION = SOLICITANTE
PROCESO PRINCIPAL = VPROC-0019
INICIADOR PRIMARIO = AREA_SOLICITANTE
PANTALLAS PRINCIPALES = VSCREEN-0068 + VSCREEN-0069
NO CREA ORDEN
NO SELECCIONA PROVEEDOR
NO APRUEBA COMPRA
NO RECIBE MERCANCIA
PUEDE CONSULTAR SOLO LA PROYECCION NECESARIA DEL ESTADO POSTERIOR
```

La tarea actual consume esa frontera sin reabrir la separación entre solicitante, comprador, aprobador y receptor.

---

#### 3. Naturaleza y topología

La topología vigente de `ORIGO-UX-001..016` establece:

```text
mode = DEFINE_ONCE
execution_gate = NO_PHYSICAL_INSTANCE
```

Consecuencias:

1. `ORIGO-UX-003` se define una sola vez;
2. no existe una instancia física propia de esta tarea;
3. no se crea ni modifica una ruta en `vento-origo`;
4. no se implementa formulario, query, Server Action, RPC, RLS o migración;
5. el contrato se materializará posteriormente por los propietarios físicos y packages aplicables;
6. una ausencia AS-IS no autoriza a inventar una implementación local desde este marcador.

---

#### 4. Fuentes verificadas

El diseño consume y conserva:

- `ORIGO-UX-001 — Inventariar el proceso completo de abastecimiento`;
- `ORIGO-UX-002 — Separar solicitud, compra, aprobación y recepción`;
- `ORIGO-AUTH-001..015` como frontera de autorización, territorio, actor, seguridad y auditoría;
- `VPROC-0019` y sus siete estados canónicos;
- `VSCREEN-0068` y `VSCREEN-0069` como identidades canónicas de experiencia;
- matrices E2 de iniciadores, ejecutores, aprobadores, información, eventos, estados y handoffs;
- Registro 04A vigente de ORIGO y cobertura UX/AUTH relacionada;
- catálogo compartido vigente de permisos ORIGO;
- runtime observado `vento-group-sas/vento-origo@70860f1ca5f0a4a73e894cbb840956f9f7eda2ad`;
- `vento-group-sas/vento-shell@7358bb8bb4cce3360655faebe20f3f455b183ea0` como estado remoto publicado de las fuentes canónicas consultadas.

La base inmediata `ORIGO-UX-002` se consume desde el artefacto completo aprobado de esta conversación conforme al modo documental adelantado.

---

#### 5. Identidad canónica de las dos superficies

La experiencia del solicitante conserva dos identidades distintas:

| Pantalla | Nombre | Proceso | Paso canónico | Interacción | Momento |
| --- | --- | --- | --- | --- | --- |
| `VSCREEN-0068` | Bandeja de necesidades de compra | `VPROC-0019` | `VPROC-0019::STEP-TRIAGE_PURCHASE_NEEDS` — Priorizar necesidades de compra | `TRIAGE` | `INITIAL` |
| `VSCREEN-0069` | Solicitud de compra | `VPROC-0019` | `VPROC-0019::STEP-SUBMIT_PURCHASE_REQUEST` — Crear solicitud de compra | `INITIATE` | `INITIAL` |

Regla:

```text
VSCREEN-0068 INICIO / SEGUIMIENTO
!=
VSCREEN-0069 CREACION DE SOLICITUD
```

`VSCREEN-0068` es una superficie compartida del proceso y puede contener acciones que el solicitante no posee. La proyección del solicitante nunca convierte la clasificación `TRIAGE` en autoridad para priorizar.

---

#### 6. Decisión principal del inicio

El inicio del solicitante se diseña alrededor de una pregunta operativa simple:

```text
¿QUE NECESITO SOLICITAR O QUE ESTA PASANDO CON LO QUE YA SOLICITE?
```

La experiencia queda compuesta por:

```text
CONTEXTO DEL SOLICITANTE
+
ACCION PRIMARIA: NUEVA SOLICITUD
+
MIS NECESIDADES / SOLICITUDES
+
ESTADO Y SIGUIENTE RESPONSABLE
+
SEÑALES O SUGERENCIAS NO VINCULANTES CUANDO APLIQUEN
=
INICIO DEL SOLICITANTE
```

No se presenta al solicitante un home de compras completo.

---

#### 7. AREA_SOLICITANTE es una función, no un rol nuevo

El iniciador primario canónico de `VPROC-0019` es:

```text
AREA_SOLICITANTE
```

Esto expresa una función empresarial. No crea un rol técnico llamado `solicitante` ni autoriza por nombre.

El proceso admite iniciadores alternos:

- `BODEGA_Y_ABASTECIMIENTO`;
- `RESPONSABLE_PRODUCTIVO`;
- `GERENCIA_O_SUPERVISION_DE_SEDE`;
- `UMBRAL_O_ALERTA`.

Por tanto, la experiencia debe poder presentar la misma función de solicitud a distintos actores legítimos sin convertir el tipo de iniciador en permiso final.

---

#### 8. Contexto mínimo al entrar

La superficie del solicitante consume contexto ya resuelto y suficiente para limitar lo visible y lo accionable.

Como mínimo deberá poder distinguir:

- actor efectivo;
- unidad o área solicitante aplicable;
- sede o alcance empresarial aplicable cuando corresponda;
- centro de costo o referencia presupuestal cuando el contrato lo requiera;
- capacidades exactas disponibles;
- estado de frescura del contexto;
- restricciones de sensibilidad y territorio.

La UX no fabrica autoridad desde:

- un selector de sede;
- un centro de costo escrito manualmente;
- una query string;
- el último contexto visual usado;
- pertenecer al mismo edificio;
- `origo.access` por sí solo.

---

#### 9. Composición de VSCREEN-0068 para el solicitante

La proyección del solicitante de `VSCREEN-0068` contiene cinco zonas lógicas:

| Zona | Contenido | Acción del solicitante | Regla |
| --- | --- | --- | --- |
| contexto | unidad/área, sede aplicable y actor efectivo | ninguna mutación de autoridad | solo informa contexto ya resuelto |
| acción principal | crear nueva solicitud | abrir `VSCREEN-0069` | no crea orden ni sourcing |
| mis necesidades | necesidades propias o del alcance permitido | consultar detalle/estado | no muestra necesidades ajenas fuera de alcance |
| atención requerida | información faltante o seguimiento requerido cuando exista un contrato que lo soporte | aportar información permitida | no inventa un estado nuevo del proceso |
| progreso posterior | proyección mínima de handoff/sourcing/compra cuando exista relación legítima | consultar referencia | no concede editar, aprobar ni recibir |

La pantalla no se convierte en bandeja global del comprador.

---

#### 10. Acción primaria: nueva solicitud

La acción principal del solicitante es abrir `VSCREEN-0069` para expresar una necesidad.

La secuencia UX es:

```text
VSCREEN-0068
MIS NECESIDADES
        ↓
NUEVA SOLICITUD
        ↓
VSCREEN-0069
CAPTURA DE NECESIDAD
        ↓
VALIDACION SERVER-SIDE
        ↓
VPROC-0019.PURCHASE_NEED_SUBMITTED
```

La navegación hacia el formulario no significa que la mutación esté autorizada. La autoridad se vuelve a comprobar en servidor al intentar registrar la necesidad.

---

#### 11. Datos mínimos de la solicitud

`VPROC-0019` conserva como información mínima:

```text
requesting_unit_ref
need_description
item_or_service_refs
required_quantities
required_by
business_justification
```

`VSCREEN-0069` además exige que la experiencia pueda expresar, cuando corresponda al contrato:

- necesidad;
- sede;
- centro de costo;
- fecha requerida;
- justificación.

La UX debe preferir referencias canónicas de ítem/servicio, unidad y contexto cuando existan, sin obligar al solicitante a conocer identificadores técnicos.

---

#### 12. Datos opcionales y señales complementarias

El proceso admite información complementaria como:

- señal de stock;
- referencia presupuestal;
- preferencia de proveedor;
- motivo de urgencia;
- especificaciones;
- estimación de costo.

Reglas:

1. una preferencia de proveedor es contexto no vinculante y no equivale a selección;
2. una estimación de costo no equivale a precio aprobado;
3. una señal de stock no crea por sí sola una necesidad aprobada;
4. un motivo de urgencia no asigna por sí solo prioridad final;
5. una especificación no permite modificar el catálogo maestro desde esta superficie;
6. datos sensibles se minimizan según autorización y finalidad.

---

#### 13. No se inventa un borrador empresarial persistente

El estado inicial canónico de `VPROC-0019` es:

```text
PURCHASE_NEED_SUBMITTED
```

Por tanto, esta tarea no crea estados empresariales como:

```text
DRAFT_REQUEST
REQUEST_DRAFT
PENDING_FORM
```

La interfaz puede conservar estado local no persistente mientras la persona completa el formulario, pero una persistencia empresarial previa al submit exigiría un contrato propietario adicional y no se inventa aquí.

---

#### 14. Estados visibles de VPROC-0019

El solicitante debe poder comprender los siete estados canónicos sin interpretarlos como compra aprobada:

| Estado canónico | Etiqueta UX recomendada | Lectura para el solicitante |
| --- | --- | --- |
| `PURCHASE_NEED_SUBMITTED` | Solicitud enviada | ORIGO recibió la necesidad; todavía no hay sourcing ni orden |
| `UNDER_VALIDATION` | En validación | se comprueban necesidad, cantidades, fecha, alternativas y contexto |
| `PRIORITIZED` | Priorizada | la prioridad fue establecida por el carril competente |
| `APPROVED_FOR_SOURCING` | Aprobada para abastecimiento | puede avanzar a sourcing; no existe compromiso económico |
| `SOURCING_REQUESTED` | En abastecimiento | la necesidad fue transferida a evaluación/compra autorizada |
| `CONSOLIDATION_PENDING` | En consolidación | puede agruparse sin perder origen, cantidades ni fecha |
| `PURCHASE_NEED_HANDOFF_COMPLETED` | Transferida a compras | la fase de necesidad terminó; no significa proveedor seleccionado ni orden emitida |

No se muestran `draft`, `sent` o `received` como estados equivalentes de `VPROC-0019`.

---

#### 15. El solicitante no controla prioridad final

El solicitante puede expresar:

- fecha requerida;
- impacto de no disponer del ítem/servicio;
- motivo de urgencia;
- justificación empresarial;
- evidencia permitida.

Pero no convierte directamente esa declaración en:

```text
PRIORITIZED
APPROVED_FOR_SOURCING
SOURCING_REQUESTED
```

La prioridad y las decisiones posteriores pertenecen a los actores y políticas competentes.

La interfaz distingue:

```text
URGENCIA DECLARADA POR SOLICITANTE
!=
PRIORIDAD VALIDADA
!=
COMPRA URGENTE AUTORIZADA
```

---

#### 16. Señales automáticas y sugerencias

`UMBRAL_O_ALERTA` puede iniciar el proceso según el contrato canónico, pero una señal automática no debe aparecer como orden ni como aprobación.

La experiencia puede presentar una sugerencia o alerta relacionada cuando el solicitante tenga contexto para verla, manteniendo:

```text
SEÑAL
!=
NECESIDAD REGISTRADA
!=
SOLICITUD VALIDADA
!=
ORDEN
```

Si la política exige intervención humana, el solicitante confirma o completa la necesidad antes de que exista `PURCHASE_NEED_SUBMITTED`.

---

#### 17. Seguimiento de mis necesidades

El inicio prioriza seguimiento comprensible sobre administración.

Cada elemento visible debe poder mostrar, según autorización:

- referencia legible de la necesidad/solicitud;
- resumen del objeto solicitado;
- cantidad o resultado esperado resumido;
- fecha requerida;
- estado canónico traducido a lenguaje operativo;
- antigüedad o fecha relevante;
- bloqueo o atención requerida cuando exista;
- siguiente responsable o etapa en términos comprensibles;
- correlación posterior mínima cuando la necesidad ya fue transferida.

No es necesario cargar por defecto la historia técnica completa.

---

#### 18. Proyección del estado posterior

Cuando `VPROC-0019` complete su handoff, la persona solicitante puede necesitar saber si su necesidad continúa avanzando.

La proyección posterior es de solo lectura y mínima.

Puede expresar, cuando exista evidencia correlacionada y autorización suficiente:

```text
EN ABASTECIMIENTO
EN DECISION
COMPRA APROBADA
ORDEN EMITIDA
ENTREGA PENDIENTE
RECIBIDA / CON DIFERENCIA
```

Estas etiquetas son una proyección de procesos posteriores; no se convierten en nuevos estados de `VPROC-0019`.

La proyección nunca concede al solicitante:

- seleccionar proveedor;
- ver precios sensibles por defecto;
- modificar la orden;
- aprobar compra;
- registrar recepción;
- resolver diferencias.

---

#### 19. Minimización de precios y proveedores

El solicitante no necesita por defecto conocer:

- matriz completa de proveedores;
- cuentas bancarias;
- documentos tributarios sensibles;
- precios históricos completos;
- márgenes;
- evaluación interna del proveedor;
- cotizaciones competidoras;
- reglas internas de aprobación.

Si una preferencia de proveedor o estimación de costo forma parte de la captura permitida, se presenta como dato auxiliar no vinculante.

La proyección del estado posterior conserva field masks y finalidad de uso.

---

#### 20. Separación frente al comprador

El solicitante no recibe las superficies que corresponden a `ORIGO-UX-004` por la sola razón de haber creado una solicitud.

No obtiene implícitamente:

- catálogo completo de proveedores para sourcing;
- comparación de cotizaciones;
- negociación;
- recomendación;
- selección;
- edición de orden;
- emisión de compra.

Regla:

```text
CREAR NECESIDAD
!=
GESTIONAR ABASTECIMIENTO
```

---

#### 21. Separación frente al aprobador

El solicitante puede consultar que una necesidad o compra relacionada espera decisión, pero no se presenta como aprobador salvo que el mismo actor posea una autoridad adicional válida y la acción se resuelva bajo esa función distinta.

Incluso cuando una misma persona acumule capacidades:

```text
FUNCION ACTUAL = SOLICITANTE
```

no hereda automáticamente:

```text
FUNCION = APROBADOR
```

La aprobación permanece en `ORIGO-UX-005` y `ORIGO-UX-008`.

---

#### 22. Separación frente al receptor

El solicitante puede recibir información de que una entrega relacionada fue recibida o presenta diferencia cuando esa proyección sea legítima.

No puede desde su inicio:

- registrar cantidades recibidas;
- confirmar condición física;
- aceptar/rechazar mercancía;
- corregir recepción;
- crear entrada NEXO;
- resolver diferencia de recepción.

`ORIGO-UX-006`, `009`, `010` y `011` conservan esas responsabilidades.

---

#### 23. Estados de experiencia del inicio

La superficie distingue al menos:

| Estado UX | Significado | Tratamiento |
| --- | --- | --- |
| `LISTO` | contexto válido y acciones disponibles | mostrar acción primaria y necesidades autorizadas |
| `SIN_SOLICITUDES` | contexto válido sin necesidades visibles | estado vacío real + acción nueva solicitud si está autorizada |
| `SIN_CAPACIDAD_DE_SOLICITAR` | puede consultar, pero no registrar | ocultar/deshabilitar mutación según patrón y explicar límite sin exponer política sensible |
| `SIN_CONTEXTO` | no puede determinarse unidad/sede/alcance suficiente | bloquear captura hasta resolver contexto propietario |
| `DATOS_DESACTUALIZADOS` | la proyección no puede declararse vigente | revalidar antes de mutaciones y señalar antigüedad |
| `FALLO_TECNICO` | fuente o servicio requerido falló | error recuperable; no equivale a lista vacía |
| `DENEGADO` | autoridad insuficiente | no serializar datos protegidos |

Reglas:

```text
SIN_SOLICITUDES != DENEGADO
DENEGADO != SIN_CONTEXTO
SIN_CONTEXTO != FALLO_TECNICO
FALLO_TECNICO != CERO NECESIDADES
```

---

#### 24. Validación y errores del formulario

`VSCREEN-0069` debe explicar errores en lenguaje operativo y conservar la información no sensible ya introducida cuando sea seguro.

Debe distinguir:

- campo faltante;
- referencia inválida o inactiva;
- cantidad/unidad incompatible;
- fecha requerida inválida;
- contexto vencido;
- falta de autoridad;
- duplicado o necesidad ya existente detectada;
- fallo técnico.

Un error no debe transformarse silenciosamente en una nueva solicitud ni generar reintentos con efectos duplicados.

---

#### 25. Duplicados y consolidación

La experiencia reconoce que `VPROC-0019` puede llegar a:

```text
CONSOLIDATION_PENDING
```

pero el solicitante no fusiona necesidades arbitrariamente.

Si ORIGO detecta posible duplicado o consolidación:

- conserva el origen de cada necesidad;
- conserva cantidades y fechas requeridas;
- explica que existe consolidación en curso;
- evita crear una segunda solicitud por reintento accidental;
- no sustituye la decisión del actor competente.

---

#### 26. Historial y trazabilidad visibles

El solicitante necesita una historia comprensible, no el log técnico completo.

La proyección puede incluir:

- creación/envío;
- validación;
- cambio de prioridad cuando sea publicable;
- solicitud de información;
- transferencia a abastecimiento;
- correlación posterior relevante.

La auditoría completa sigue perteneciendo al contrato de autorización y evidencia; la UI no expone por defecto principals técnicos, scopes, hashes o razones internas sensibles.

---

#### 27. Accesibilidad, densidad y uso cotidiano

El inicio debe favorecer una persona que solicita ocasionalmente y no necesariamente domina compras.

Debe priorizar:

- una acción primaria evidente;
- lenguaje de necesidad y solicitud, no jerga de sourcing;
- estado legible;
- filtros mínimos;
- búsqueda cuando exista volumen suficiente;
- objetivos táctiles adecuados;
- estados distinguibles sin depender solo del color;
- foco y navegación accesibles;
- detalle progresivo;
- ausencia de tablas administrativas densas como primera experiencia.

Esta tarea no fija tokens visuales, colores, tamaños exactos ni breakpoints.

---

#### 28. Frontera de autorización no resuelta por UX

El catálogo compartido observado contiene seis permisos ORIGO:

```text
origo.access
origo.procurement.purchase_orders.view
origo.procurement.receipts.view
origo.procurement.receipts.register
origo.procurement.suppliers.view
origo.catalog.product_reviews.view
```

No se observó una capacidad atómica publicada para crear o gestionar `purchase_need` / `purchase_request`.

Consecuencias:

1. `ORIGO-UX-003` no inventa una permission key;
2. `origo.access` no se trata como wildcard de mutación;
3. la materialización física no puede habilitar el submit protegido únicamente por visibilidad de pantalla;
4. antes de habilitar la mutación, el propietario de autorización debe proporcionar una capacidad exacta o un contrato equivalente gobernado;
5. mientras esa autoridad no sea demostrable, la acción sensible permanece fail-closed.

Esta ausencia no impide definir el diseño UX, pero sí es condición de salida para una materialización segura.

---

#### 29. Contraste AS-IS de vento-origo

En `vento-origo@70860f1ca5f0a4a73e894cbb840956f9f7eda2ad` no se observan superficies dedicadas a necesidades o solicitudes de compra.

No se encontraron rutas o contratos equivalentes a:

```text
purchase_need
purchase request
Bandeja de necesidades de compra
Solicitud de compra
```

El menú canónico AS-IS sincronizado contiene:

```text
/purchase-orders
/receipts
/suppliers
/product-master-review
```

La experiencia actual entra demasiado tarde en el ciclo para satisfacer el inicio del solicitante.

---

#### 30. Contraste con creación AS-IS de orden

La existencia de `/purchase-orders/new` no satisface `VSCREEN-0069`.

La orden actual parte de proveedor, sede y líneas y pertenece a una fase posterior.

Regla:

```text
NUEVA ORDEN DE COMPRA
!=
NUEVA SOLICITUD DE COMPRA
```

La materialización futura no deberá resolver la ausencia del solicitante enlazándolo directamente a crear una orden.

---

#### 31. Hallazgos y propietarios

| Hallazgo | Impacto | Propietario | Condición de salida |
| --- | --- | --- | --- |
| no existe superficie AS-IS dedicada de necesidades/solicitudes | el ciclo puede comenzar fuera de ORIGO o directamente en orden | materialización UX propietaria consumiendo `ORIGO-UX-003` | `VSCREEN-0068/0069` quedan materializadas con identidad distinta de orden |
| no existe permiso atómico publicado para registrar necesidad/solicitud | riesgo de habilitar mutación por `origo.access` o lógica local | contrato/paquete de autorización ORIGO asociado a `TREQ-ORIGO-004`, `GAP-PKG-120` y `GAP-PKG-102` | la mutación posee capacidad exacta gobernada y server-side enforcement antes de habilitarse |
| `VSCREEN-0068` es `TRIAGE`, pero el solicitante no gobierna la prioridad | riesgo de exponer priorización por estar en la misma pantalla | `ORIGO-UX-003` + autorización propietaria | la proyección del solicitante limita acciones; priorizar requiere autoridad distinta |
| la home AS-IS enlaza directo a órdenes/proveedores | incentiva saltar necesidad y sourcing | materialización UX ORIGO | el inicio del solicitante prioriza necesidad/seguimiento y no compra directa |
| el proceso admite señales automáticas | una alerta podría confundirse con orden aprobada | `ORIGO-UX-003` + proceso `VPROC-0019` | señal, necesidad registrada y orden permanecen estados/identidades separadas |
| no existe estado canónico de borrador persistente | riesgo de inventar lifecycle fuera de contrato | propietario de proceso si en el futuro se requiere | no persistir draft empresarial sin contrato explícito; estado local no modifica `VPROC-0019` |

No queda un hallazgo narrativo sin propietario ni condición de salida.

---

#### 32. Handoff inmediato a ORIGO-UX-004

`ORIGO-UX-004 — Diseñar inicio para comprador` recibe una frontera limpia:

```text
SOLICITANTE YA TIENE SU ENTRADA
VPROC-0019 CONSERVA NECESIDAD Y HANDOFF
VSCREEN-0068/0069 NO SON WORKSPACE DE SOURCING DEL COMPRADOR
SOLICITANTE NO SELECCIONA PROVEEDOR
SOLICITANTE NO EDITA ORDEN
SOLICITANTE NO APRUEBA
SOLICITANTE NO RECIBE
HANDOFF COMPLETADO → COMPRADOR CONTINUA EN VPROC-0020 / VPROC-0021
```

La 004 diseñará el inicio del comprador sin absorber la experiencia del solicitante definida aquí.

---

#### 33. Handoff al resto de ORIGO-UX

| Tarea | Entrada exacta proveniente de ORIGO-UX-003 |
| --- | --- |
| `ORIGO-UX-004` | comprador recibe necesidades transferidas; no recrea ni edita la intención del solicitante |
| `ORIGO-UX-005` | aprobador consume una propuesta separada y no la solicitud como decisión ya tomada |
| `ORIGO-UX-006` | receptor recibe contexto de compra/entrega, no autoridad del solicitante |
| `ORIGO-UX-007` | orden consume necesidad/sourcing válidos; no nace directamente del home del solicitante |
| `ORIGO-UX-008` | aprobación/rechazo se mantiene fuera del flujo de solicitud |
| `ORIGO-UX-009` | recepción total no altera retrospectivamente la solicitud |
| `ORIGO-UX-010` | recepción parcial proyecta progreso sin cambiar `VPROC-0019` |
| `ORIGO-UX-011` | diferencias pueden proyectarse al solicitante de forma mínima sin conceder resolución |
| `ORIGO-UX-012` | precios/proveedores se minimizan según función y finalidad |
| `ORIGO-UX-013` | seguimiento no induce una segunda recepción manual NEXO |
| `ORIGO-UX-014` | entrada física NEXO conserva referencia correlacionada sin cambiar ownership |
| `ORIGO-UX-015` | hecho económico NUMERA se proyecta solo cuando corresponda y sin convertirlo en estado ORIGO local |
| `ORIGO-UX-016` | prototipo valida que una persona solicitante pueda iniciar y seguir sin invadir comprador/aprobador/receptor |

---

#### 34. Requisitos de prueba derivados

**Resultado:** NO GENERA REQUISITOS DE PRUEBA.

**Requisitos creados:** 0
**Requisitos modificados:** 0
**Requisitos diferidos:** 0
**Requisitos obsoletos:** 0

Justificación: identidad separada de necesidad/solicitud, segregación solicitante-comprador-aprobador-receptor, autorización server-side, minimización, estados de experiencia y trazabilidad ya cuentan con obligaciones verificables registradas. Esta tarea especializa la composición UX del solicitante sin introducir una obligación observable nueva ni modificar el registro.

---

#### 35. Cobertura de prueba vigente reutilizada

Se reutiliza sin modificación:

- `TREQ-ORIGO-004` para separar necesidad, solicitud, sourcing, aprobación, orden y revisión y mantener capacidades distintas por función;
- `TREQ-AUTH-001` para exigir autorización por permiso, contexto y alcance en lugar de nombres de rol;
- `TREQ-AUTH-013` para impedir bypass por URL, formulario, API o RPC y revalidar mutaciones en servidor;
- `TREQ-AUTH-015` para conservar evidencia correlacionable de actor, permiso, contexto, recurso y decisión;

Esta enumeración es trazabilidad reutilizada y no constituye modificación del Registro 04A.

---

#### 36. Evidencia de validación

| Clase | Estado | Evidencia |
| --- | --- | --- |
| BUILD | NOT_EXECUTED | `docs:plan:build` corresponde al checkout local después de incorporar el artefacto. |
| LOCAL | NOT_EXECUTED | Formato, quality, delivery, topología, EOL, TREQ y batería global quedan pendientes del checkout local de la tarea. |
| REMOTA | PASS | Se verificaron `vento-shell/main@7358bb8bb4cce3360655faebe20f3f455b183ea0`, `vento-origo/main@70860f1ca5f0a4a73e894cbb840956f9f7eda2ad`, topología `DEFINE_ONCE / NO_PHYSICAL_INSTANCE`, `VPROC-0019`, sus siete estados, `VSCREEN-0068/0069`, roles e iniciadores del proceso, 04A ORIGO, catálogo de permisos ORIGO y ausencia AS-IS de superficie dedicada de necesidad/solicitud. La entrada inmediata `ORIGO-UX-002` se consume desde su artefacto aprobado SHA-256 `5ed9a980c537e1f717db58f2bf0b184c94322a05ca9cef66dce3e10049c5a952`. |
| OPERATIVA | NOT_EXECUTED | No se ejecutaron solicitudes reales, validaciones, priorizaciones, handoffs, actores, sedes, centros de costo ni pruebas con usuarios. |
| FÍSICA | NOT_APPLICABLE | `ORIGO-UX-003` no crea instancia física propia ni autoriza cambios de producto, datos o infraestructura. |

---

#### 37. Criterios de aceptación

La tarea queda documentalmente completa cuando:

- [ ] `VSCREEN-0068` queda definida como inicio/seguimiento del solicitante sin conceder triage global;
- [ ] `VSCREEN-0069` queda definida como captura de solicitud y no como orden de compra;
- [ ] ambas superficies conservan `VPROC-0019` como proceso principal;
- [ ] el iniciador primario `AREA_SOLICITANTE` se trata como función empresarial y no como rol inventado;
- [ ] los iniciadores alternos no se convierten en permiso final;
- [ ] la acción primaria del inicio es crear solicitud, no crear orden;
- [ ] la captura conserva necesidad, unidad solicitante, ítems/servicios, cantidades, fecha y justificación;
- [ ] sede y centro de costo se tratan como contexto validado cuando apliquen;
- [ ] una preferencia de proveedor no equivale a selección;
- [ ] una estimación no equivale a precio aprobado;
- [ ] urgencia declarada no equivale a prioridad validada;
- [ ] señal automática no equivale a necesidad registrada ni orden;
- [ ] no se inventa un estado empresarial persistente de borrador;
- [ ] los siete estados de `VPROC-0019` son distinguibles y comprensibles;
- [ ] `PURCHASE_NEED_HANDOFF_COMPLETED` no se presenta como orden emitida;
- [ ] el solicitante recibe seguimiento de sus necesidades dentro del alcance autorizado;
- [ ] la proyección de procesos posteriores es mínima y de solo lectura;
- [ ] precios, cotizaciones y proveedor se minimizan por defecto;
- [ ] crear solicitud no concede funciones de comprador, aprobador o receptor;
- [ ] vacío, deny, falta de contexto, stale y error técnico no se confunden;
- [ ] un reintento no crea duplicado silencioso;
- [ ] consolidación no elimina origen, cantidad ni fecha requerida;
- [ ] no se usa `origo.access` como wildcard para registrar necesidad;
- [ ] la ausencia de permiso atómico queda como condición de materialización y no se resuelve desde UX;
- [ ] la home AS-IS de órdenes/proveedores no se eleva a contrato objetivo;
- [ ] los hallazgos tienen propietario y condición de salida;
- [ ] `ORIGO-UX-004` recibe un handoff suficiente para diseñar comprador sin reabrir solicitante;
- [ ] no se crean ni modifican requisitos de prueba;
- [ ] no se ejecutan cambios físicos desde esta tarea.

---

#### 38. Límites

Esta tarea no:

- implementa un home de solicitante;
- crea `/purchase-needs`, `/purchase-requests` ni otra URL;
- define una URL física definitiva para `VSCREEN-0068/0069`;
- crea componentes, endpoints o Server Actions;
- crea permiso nuevo;
- concede submit por `origo.access`;
- crea un rol técnico `solicitante`;
- crea estados nuevos de `VPROC-0019`;
- persiste un borrador empresarial no gobernado;
- selecciona proveedor;
- compara cotizaciones;
- negocia condiciones;
- muestra precios sensibles por defecto;
- crea o edita orden de compra;
- aprueba o rechaza compra;
- registra recepción;
- modifica inventario NEXO;
- crea hecho económico NUMERA;
- modifica `vento-origo`;
- modifica Supabase, migraciones, RLS, RPC, grants o datos;
- modifica contratos generados;
- ejecuta E5;
- crea instancia física;
- modifica el Registro 04A;
- desarrolla `ORIGO-UX-004`.

---

#### 39. Continuidad

**ÚLTIMA TAREA APROBADA**
`ORIGO-UX-002 — Separar solicitud, compra, aprobación y recepción`

**TAREA ACTUAL APROBADA**
`ORIGO-UX-003 — Diseñar inicio para solicitante`

**SIGUIENTE TAREA RESERVADA**
`ORIGO-UX-004 — Diseñar inicio para comprador`
### ✅ ORIGO-UX-004 — Diseñar inicio para comprador

**Estado:** APROBADA
**Tarea anterior:** ORIGO-UX-003 — Diseñar inicio para solicitante
**Tarea siguiente:** ORIGO-UX-005 — Diseñar inicio para aprobador
**Tipo de tarea:** diseño documental integral de la experiencia inicial del comprador sobre `VPROC-0020` y el handoff controlado hacia `VPROC-0021`, con composición orientada por trabajo sobre proveedores, cotizaciones, recomendación, decisión pendiente y seguimiento autorizado, reutilizando `VSCREEN-0070`, `VSCREEN-0072`, `VSCREEN-0075` y accesos condicionales a `VSCREEN-0071`, `VSCREEN-0145` y `VSCREEN-0146`, sin crear una pantalla canónica nueva ni absorber aprobación, editor de orden o recepción; `DEFINE_ONCE` / `NO_PHYSICAL_INSTANCE`
**Bloque:** BLOQUE M — ORIGO
**Repositorio propietario:** `vento-group-sas/vento-shell`
**Archivo propietario:** `docs/plan-canonico/modular/bloques/M_ORIGO/02_EXPERIENCIA_DE_COMPRAS.md`
**Estado físico resultante:** `NO_PHYSICAL_INSTANCE`
**Cambios físicos autorizados:** ninguno; esta tarea no modifica código, rutas, navegación, componentes, procesos, permisos, roles, grants, datos, tablas, RLS, RPC, migraciones, Supabase, Storage, packages, consumidores ni despliegues
**Requisitos de prueba creados o modificados:** 0

---

#### 1. Propósito

Diseñar el contrato de experiencia para la entrada de una persona que actúa como comprador dentro del ciclo de abastecimiento ORIGO, de forma que pueda:

- recibir necesidades transferidas sin reescribir la intención del solicitante;
- identificar qué casos requieren búsqueda, cotización, comparación, recomendación o seguimiento;
- consultar proveedores y condiciones dentro del alcance autorizado;
- comparar evidencia homogénea sin convertir una cotización en selección automática;
- preparar una recomendación separada de la decisión aprobatoria;
- conducir el handoff hacia `VPROC-0021` cuando la decisión de sourcing ya sea válida;
- seguir compras y proveedores relacionados sin absorber aprobación, recepción, inventario o pago;
- operar con una experiencia enfocada por trabajo y estado, no con un dashboard administrativo irrestricto.

La tarea diseña el inicio del comprador sobre el proceso principal:

```text
VPROC-0020 — Comparar proveedores y condiciones con evidencia suficiente para decidir
```

sin crear una identidad `VSCREEN-*` adicional.

---

#### 2. Entrada aprobada de ORIGO-UX-003

`ORIGO-UX-003` entrega una frontera cerrada:

```text
SOLICITANTE YA TIENE SU ENTRADA
VPROC-0019 CONSERVA NECESIDAD Y HANDOFF
VSCREEN-0068/0069 NO SON WORKSPACE DE SOURCING DEL COMPRADOR
SOLICITANTE NO SELECCIONA PROVEEDOR
SOLICITANTE NO EDITA ORDEN
SOLICITANTE NO APRUEBA
SOLICITANTE NO RECIBE
HANDOFF COMPLETADO -> COMPRADOR CONTINUA EN VPROC-0020 / VPROC-0021
```

Por tanto, el comprador recibe una necesidad ya identificable y trazable. No vuelve a crear la solicitud ni modifica silenciosamente su origen para hacerla coincidir con una opción de compra.

---

#### 3. Naturaleza y topología

La topología vigente de `ORIGO-UX-001..016` establece:

```text
mode = DEFINE_ONCE
execution_gate = NO_PHYSICAL_INSTANCE
```

Consecuencias:

1. `ORIGO-UX-004` se define una sola vez;
2. no existe una instancia física propia de esta tarea;
3. no se crea una ruta, página o componente en `vento-origo`;
4. no se implementa sourcing, cotizaciones, autorización, Server Actions, RLS, RPC o migraciones;
5. la materialización posterior pertenece a los packages y propietarios físicos aplicables;
6. una brecha AS-IS se documenta y se entrega a su owner; no se corrige desde este marcador.

---

#### 4. Fuentes verificadas

El diseño consume y conserva:

- `ORIGO-UX-001 — Inventariar el proceso completo de abastecimiento`;
- `ORIGO-UX-002 — Separar solicitud, compra, aprobación y recepción`;
- `ORIGO-UX-003 — Diseñar inicio para solicitante` como entrada inmediata aprobada y publicada;
- `ORIGO-AUTH-001..015` como frontera de autorización, segregación, territorio, sensibilidad y auditoría;
- `VPROC-0019`, `VPROC-0020` y `VPROC-0021` como continuidad necesidad → sourcing → compra;
- los ocho estados canónicos de `VPROC-0020`;
- `VSCREEN-0070`, `VSCREEN-0071`, `VSCREEN-0072`, `VSCREEN-0073`, `VSCREEN-0075`, `VSCREEN-0145` y `VSCREEN-0146`;
- matrices E2 de propósito, iniciadores, ejecutores, aprobadores, pasos, estados y segregación;
- Registro 04A vigente de ORIGO y AUTH;
- catálogo compartido vigente de permisos ORIGO y su normalización legacy;
- runtime observado `vento-group-sas/vento-origo@70860f1ca5f0a4a73e894cbb840956f9f7eda2ad`;
- `vento-group-sas/vento-shell@e2633c54c62b48088e2c908d187a96d891867275` como estado remoto publicado de las fuentes canónicas consultadas.

La entrada inmediata `ORIGO-UX-003` se consume desde la versión aprobada ya publicada en `main`.

---

#### 5. Identidad funcional del comprador

La función empresarial principal es:

```text
RESPONSABLE_DE_COMPRAS
```

En `VPROC-0020` actúa como:

- iniciador primario;
- ejecutor principal;
- responsable de búsqueda, comparación y recomendación;
- punto operativo de continuidad hacia la compra.

Puede recibir apoyo de:

- `AREA_SOLICITANTE`;
- `RESPONSABLE_FINANCIERO`;
- `RESPONSABLE_DE_CALIDAD_E_INOCUIDAD`.

La decisión crítica de recomendación/selección conserva autoridad separada de:

```text
GERENCIA_GENERAL
COORDINACION_DE_OPERACIONES
```

cuando el contrato exige aprobación por materialidad, riesgo, excepción o conflicto.

---

#### 6. Condición de entrada al inicio del comprador

El inicio del comprador no nace de una pantalla genérica ni de la mera existencia de una orden borrador.

La entrada nominal es:

```text
NECESIDAD VALIDA / TRANSFERIDA
+
ACTOR COMPRADOR AUTORIZADO
+
CONTEXTO Y ALCANCE VIGENTES
+
CASO DE SOURCING O TRABAJO PENDIENTE IDENTIFICABLE
=
TRABAJO DEL COMPRADOR
```

Para abrir `VPROC-0020.SOURCING_CASE_OPENED` debe existir una necesidad válida y mercado o proveedores potenciales por evaluar.

Nunca:

```text
ABRIR ORIGO
=
PODER COMPRAR
```

ni:

```text
CREAR ORDEN DRAFT
=
HABER COMPLETADO SOURCING
```

---

#### 7. No se crea una pantalla canónica nueva de inicio

El catálogo actual no contiene una identidad `VSCREEN-*` dedicada llamada “Inicio comprador”.

Esta tarea no inventa una.

El inicio se define como una composición orientada por trabajo que enlaza identidades canónicas existentes y proyecciones de proceso:

```text
TRABAJO PENDIENTE DE SOURCING
+
VSCREEN-0070 PROVEEDORES
+
VSCREEN-0072 COMPARACION
+
ESTADO / RECOMENDACION / DECISION
+
SEGUIMIENTO AUTORIZADO
=
EXPERIENCIA INICIAL DEL COMPRADOR
```

La ruta física final, el layout concreto y la materialización de esta composición quedan fuera de esta tarea.

---

#### 8. Pregunta operativa del inicio

La experiencia del comprador se organiza alrededor de:

```text
¿QUE NECESIDAD DEBO ABASTECER AHORA Y QUE FALTA PARA TOMAR UNA DECISION TRAZABLE?
```

No alrededor de:

```text
¿QUE TABLA ADMINISTRATIVA QUIERO ABRIR?
```

ni de:

```text
¿QUE ORDEN QUIERO CREAR?
```

El ordenamiento de la experiencia debe reflejar trabajo y estado, no únicamente módulos técnicos.

---

#### 9. Composición lógica del inicio

La experiencia inicial del comprador contiene, como mínimo:

| Zona lógica | Contenido | Acción primaria | Límite |
| --- | --- | --- | --- |
| contexto | actor, alcance, sede/territorio cuando aplique y frescura | revalidar si existe bloqueo | no concede autoridad |
| necesidades recibidas | necesidades transferidas o aceptadas para sourcing | abrir/continuar caso | no reescribe la solicitud |
| sourcing activo | casos en revisión de mercado, cotización o comparación | continuar trabajo | no aprueba selección |
| decisiones pendientes | recomendaciones preparadas o selección esperando autoridad | enviar/consultar decisión | comprador no se autoaprueba |
| proveedores | acceso al catálogo permitido | consultar proveedor | consulta no adjudica |
| seguimiento de compra | referencia mínima de compra posterior cuando exista | consultar estado | no edita ni aprueba por visibilidad |
| bloqueos | evidencia faltante, permiso, stale o fallo técnico | resolver por owner | no convierte incertidumbre en PASS |

---

#### 10. Acción primaria por estado

No existe una única mutación universal para todos los casos. La acción primaria depende del estado canónico:

| Estado | Acción UX principal del comprador | Acción prohibida por inferencia |
| --- | --- | --- |
| necesidad transferida sin caso | abrir caso de sourcing | crear orden directa por defecto |
| `SOURCING_CASE_OPENED` | iniciar revisión de mercado | seleccionar proveedor |
| `MARKET_REVIEW_IN_PROGRESS` | identificar opciones y condiciones | aprobar compra |
| `QUOTES_PENDING` | completar/esperar evidencia comparable | tratar silencio como cotización válida |
| `COMPARISON_IN_PROGRESS` | comparar ofertas y criterios | adjudicar sin decisión autorizada |
| `RECOMMENDATION_PREPARED` | someter recomendación / completar evidencia | autoaprobar recomendación |
| `DECISION_PENDING` | esperar o atender devolución permitida | forzar `SUPPLIER_SELECTED` |
| `SUPPLIER_SELECTED` | preparar handoff a compra | marcar orden emitida |
| `SOURCING_DECISION_COMPLETED` | continuar hacia `VPROC-0021` | saltar controles de compra |

---

#### 11. Lifecycle completo de VPROC-0020

La experiencia debe distinguir exactamente:

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

Semántica mínima:

- `SOURCING_CASE_OPENED`: existe caso válido; no hay proveedor seleccionado;
- `MARKET_REVIEW_IN_PROGRESS`: se identifican opciones, disponibilidad y condiciones;
- `QUOTES_PENDING`: faltan respuestas válidas comparables;
- `COMPARISON_IN_PROGRESS`: se comparan precio, calidad, servicio, riesgo, cumplimiento y costo total;
- `RECOMMENDATION_PREPARED`: existe recomendación sustentada sin selección definitiva;
- `DECISION_PENDING`: la evaluación espera decisión autorizada;
- `SUPPLIER_SELECTED`: existe selección autorizada para preparar compra, sin orden emitida;
- `SOURCING_DECISION_COMPLETED`: la evaluación quedó cerrada y aceptada por el proceso de compra.

---

#### 12. No equivalencias del comprador

La experiencia conserva:

```text
PROVEEDOR CONSULTADO
!=
PROVEEDOR COTIZADO
!=
PROVEEDOR RECOMENDADO
!=
PROVEEDOR SELECCIONADO
```

También:

```text
COTIZACION RECIBIDA
!=
COMPARACION COMPLETA
!=
DECISION AUTORIZADA
!=
COMPRA APROBADA
!=
ORDEN EMITIDA
```

Y:

```text
SOURCING_DECISION_COMPLETED
!=
PURCHASE_COMMITMENT_FORMALIZED
```

---

#### 13. VSCREEN-0070 — Catálogo de proveedores

Contrato canónico:

```text
VSCREEN-0070
Catálogo de proveedores
VPROC-0020::STEP-CONSULT_SUPPLIER_CATALOG
MONITOR / IN_PROGRESS
```

En el inicio del comprador sirve para:

- consultar proveedores autorizados;
- identificar estado y categorías aplicables;
- revisar condiciones y cobertura permitidas;
- localizar opciones potenciales para un caso concreto.

Regla:

```text
CONSULTAR PROVEEDOR
!=
SELECCIONAR PROVEEDOR
```

El catálogo no se presenta como botón de adjudicación.

---

#### 14. VSCREEN-0071 — Alta y expediente de proveedor

Contrato canónico:

```text
VSCREEN-0071
Alta y expediente de proveedor
VPROC-0020::STEP-ONBOARD_SUPPLIER
CONFIGURE / IN_PROGRESS
```

Su acceso desde la experiencia inicial es condicional.

El comprador puede necesitar abrir el expediente cuando:

- un proveedor potencial no existe;
- falta información necesaria;
- el estado o documentación impide continuar;
- una condición gobernada requiere actualización por su owner.

Pero:

```text
SER COMPRADOR
!=
PODER CREAR / EDITAR / ACTIVAR / DESACTIVAR PROVEEDORES
```

La mutación depende de capacidades exactas y puede pertenecer a un carril administrativo distinto.

---

#### 15. VSCREEN-0072 — Comparación de cotizaciones

Contrato canónico:

```text
VSCREEN-0072
Comparación de cotizaciones
VPROC-0020::STEP-COMPARE_QUOTES
REVIEW / DECISION
```

Es la superficie central de decisión preparatoria del comprador.

Debe permitir comparar evidencia homogénea suficiente, incluyendo cuando aplique:

- proveedor;
- alcance de la oferta;
- presentación/unidad;
- cantidad;
- precio y moneda;
- impuestos y descuentos;
- flete;
- mínimos;
- plazo de entrega;
- condición de pago;
- vigencia;
- calidad/especificación;
- riesgo;
- servicio/cumplimiento;
- costo total comparable.

La presencia de una dimensión en la comparación no concede por sí sola acceso irrestricto a datos sensibles del proveedor.

---

#### 16. Evidencia de cotización

Una cotización válida debe conservar suficiente trazabilidad para demostrar:

```text
QUIEN / QUE PROVEEDOR
QUE OFRECIO
PARA QUE NECESIDAD
EN QUE VERSION
BAJO QUE CONDICIONES
CON QUE VIGENCIA
CUANDO SE RECIBIO
QUE EVIDENCIA RESPALDA EL DATO
```

La experiencia no debe convertir valores copiados manualmente sin origen identificable en verdad equivalente a una oferta gobernada.

Esta tarea no crea el modelo físico de `quote`, archivos o Storage; define la necesidad de que la UX consuma evidencia propietaria cuando exista.

---

#### 17. Recomendación del comprador

El comprador puede preparar una recomendación sustentada.

La recomendación debe distinguir como mínimo:

- opción recomendada;
- criterios considerados;
- alternativas comparadas;
- diferencias relevantes;
- riesgos o excepciones;
- vigencia de la evidencia;
- conflicto de interés declarado cuando aplique;
- información faltante que impida una decisión.

Regla:

```text
RECOMMENDATION_PREPARED
!=
SUPPLIER_SELECTED
```

La recomendación no cambia por sí sola la selección final.

---

#### 18. Decisión y segregación

El proceso exige separación para la decisión crítica de recomendación/selección cuando aplique la política.

La experiencia debe conservar:

```text
COMPRADOR
PREPARA / COMPARA / RECOMIENDA
        ↓
AUTORIDAD APLICABLE
DECIDE
        ↓
COMPRADOR
CONTINUA CON RESULTADO AUTORIZADO
```

Nunca:

```text
COMPRADOR PREPARA
+
COMPRADOR CLIC EN "SELECCIONAR"
=
APROBACION FINAL IMPLICITA
```

La recomendación y la selección de `VPROC-0020` conservan aprobación obligatoria por `GERENCIA_GENERAL` o `COORDINACION_DE_OPERACIONES`; esta tarea UX no define ningún bypass ni ruta sin esa autoridad.

---

#### 19. VSCREEN-0145 — Contratos, precios y condiciones

Contrato canónico:

```text
VSCREEN-0145
Contratos, precios y condiciones de proveedor
VPROC-0020::STEP-GOVERN_SUPPLIER_TERMS
CONFIGURE / IN_PROGRESS
```

El inicio del comprador puede enlazar esta superficie cuando el actor tenga autoridad y la decisión requiera consultar o mantener condiciones gobernadas.

No se muestra por defecto como una tabla abierta de todos los precios o contratos.

Regla:

```text
PARTICIPAR EN SOURCING
!=
VER TODO PRECIO / CONTRATO / DATO SENSIBLE
```

La proyección se limita por finalidad y field mask.

---

#### 20. VSCREEN-0146 — Desempeño y reclamaciones

Contrato canónico:

```text
VSCREEN-0146
Desempeño y reclamaciones de proveedor
VPROC-0020::STEP-REVIEW_SUPPLIER_PERFORMANCE
REVIEW / DECISION
```

Puede aportar evidencia al sourcing cuando exista historial suficiente.

El comprador no fabrica un score manual universal. La experiencia debe distinguir:

- hechos observados;
- métricas derivadas;
- reclamaciones;
- decisiones manuales;
- motivo y evidencia de cualquier valoración subjetiva.

La ausencia AS-IS de esta superficie no autoriza a inventar una puntuación local en `ORIGO-UX-004`.

---

#### 21. Relación con VSCREEN-0073 — Editor de orden

`VSCREEN-0073` pertenece a `VPROC-0021`:

```text
VPROC-0021::STEP-PREPARE_PURCHASE_ORDER
```

El inicio del comprador puede conducir al editor únicamente después de una entrada válida para compra.

Regla:

```text
SOURCING VALIDO / DECISION ACEPTADA
        ↓
HANDOFF A VPROC-0021
        ↓
VSCREEN-0073
```

No:

```text
INICIO COMPRADOR
→ NUEVA ORDEN
→ LUEGO JUSTIFICAR
```

El diseño detallado del editor pertenece a `ORIGO-UX-007`.

---

#### 22. Relación con VSCREEN-0075 — Seguimiento de orden

`VSCREEN-0075 — Detalle y seguimiento de orden` puede aparecer como continuidad de trabajo ya formalizado.

El comprador puede consultar, según autorización:

- estado;
- versión;
- proveedor;
- entregas;
- cambios;
- documentos;
- pendientes.

Pero el seguimiento posterior no sustituye el sourcing ni convierte el inicio del comprador en una bandeja universal de todas las órdenes.

---

#### 23. Frontera con el solicitante

El comprador recibe suficiente contexto de `VPROC-0019` para abastecer, como mínimo cuando sea necesario:

- origen de la necesidad;
- descripción/especificación;
- ítems o servicios;
- cantidades;
- fecha requerida;
- justificación;
- prioridad/urgencia ya resuelta cuando aplique;
- restricciones relevantes.

No puede reescribir silenciosamente:

- la unidad solicitante;
- la cantidad original;
- la fecha requerida;
- la justificación;
- el origen de la necesidad.

Si cambia el alcance de manera material, la experiencia debe conservar la diferencia y el owner de la decisión correspondiente.

---

#### 24. Frontera con el aprobador

`ORIGO-UX-005` recibe la decisión protegida.

El comprador prepara y entrega:

```text
NECESIDAD / ALCANCE
+
PROVEEDOR / OPCIONES
+
COTIZACIONES / CONDICIONES
+
COMPARACION
+
RECOMENDACION
+
RIESGO / EXCEPCION
+
VERSION DE EVIDENCIA
```

El aprobador decide sobre una versión identificable.

La 004 no diseña la bandeja del aprobador ni sus botones de aprobar, rechazar o devolver.

---

#### 25. Frontera con el receptor

El comprador puede conocer el estado de la compra y de la entrega como seguimiento autorizado, pero no recibe por defecto.

Regla:

```text
COMPRADOR
!=
RECEPTOR
```

Una persona que acumule ambas funciones sigue ejecutando cada acción con capacidad, recurso, estado y evidencia propios.

`VPROC-0022` y `ORIGO-UX-006` permanecen fuera del inicio del comprador.

---

#### 26. Contexto y territorio

El inicio debe consumir contexto efectivo y autorización server-side.

Como mínimo, la experiencia no puede ampliar acceso mediante:

- `site_id` enviado por cliente;
- centro de costo escrito manualmente;
- proveedor conocido;
- `purchase_order_id` conocido;
- filtro de UI;
- última sede usada;
- nombre de rol local;
- `origo.access` por sí solo.

Los filtros de interfaz únicamente reducen un conjunto ya autorizado.

---

#### 27. Catálogo de permisos y brecha de materialización

El catálogo compartido publicado contiene actualmente las capacidades ORIGO:

```text
origo.access
origo.procurement.purchase_orders.view
origo.procurement.receipts.view
origo.procurement.receipts.register
origo.procurement.suppliers.view
origo.catalog.product_reviews.view
```

No se observa en ese catálogo publicado una capacidad atómica final para:

- abrir/actualizar un caso de sourcing;
- registrar cotizaciones;
- comparar/recomendar;
- crear/actualizar/aprobar una compra.

Además, el runtime legacy utiliza:

```text
origo.suppliers.manage
```

que el canon clasifica como:

```text
DECOMPOSE_REQUIRED
→ familia origo.procurement.suppliers.*
```

`ORIGO-UX-004` no inventa permisos faltantes y no convierte el legacy en autoridad canónica final.

---

#### 28. Mutaciones de proveedor no heredadas

La familia contractual objetivo separa, cuando corresponda:

```text
origo.procurement.suppliers.view
origo.procurement.suppliers.create
origo.procurement.suppliers.update
origo.procurement.suppliers.activate
origo.procurement.suppliers.deactivate
```

La UX del comprador debe tratar esas mutaciones como capacidades distintas.

Por tanto:

```text
PUEDE CONSULTAR PROVEEDOR
!=
PUEDE CREARLO
!=
PUEDE EDITARLO
!=
PUEDE ACTIVARLO
!=
PUEDE DESACTIVARLO
```

La materialización permanece fail-closed cuando la capacidad exacta no esté disponible.

---

#### 29. Estados de experiencia

La experiencia del comprador debe distinguir al menos:

| Estado UX | Significado | Tratamiento |
| --- | --- | --- |
| `TRABAJO_DISPONIBLE` | existen necesidades/casos autorizados para actuar | mostrar siguiente acción válida |
| `SIN_TRABAJO` | contexto válido sin casos visibles | estado vacío real |
| `COTIZACIONES_PENDIENTES` | faltan respuestas comparables | mostrar qué falta sin inventar decisión |
| `COMPARACION_EN_CURSO` | evidencia suficiente parcial o completa en revisión | continuar análisis |
| `DECISION_PENDIENTE` | comprador terminó su preparación y espera autoridad | bloquear selección final del comprador |
| `DEVUELTO_PARA_AJUSTE` | la decisión requiere corrección o evidencia adicional según contrato | preservar versión y motivo |
| `SIN_PERMISO` | actor/contexto no autoriza la superficie o acción | denegar sin datos protegidos |
| `CONTEXTO_INVALIDO` | no puede resolverse alcance aplicable | bloquear trabajo |
| `DATOS_DESACTUALIZADOS` | la frescura no puede demostrarse | revalidar antes de acción sensible |
| `FALLO_TECNICO` | la fuente requerida falló | no representar como lista vacía |

No se introducen estos rótulos como estados persistidos de `VPROC-0020`.

---

#### 30. Vacío, deny, stale y error no son equivalentes

La experiencia conserva:

```text
SIN CASOS
!=
SIN PERMISO
!=
SIN CONTEXTO
!=
DATOS STALE
!=
FALLO TECNICO
```

Un error de proveedor, comparación o autorización no puede presentarse como “no hay cotizaciones” ni como “no hay trabajo”.

---

#### 31. Minimización de datos

El inicio no necesita cargar por defecto:

- expediente tributario completo de todos los proveedores;
- cuentas bancarias;
- contratos completos;
- todas las listas de precios;
- notas internas irrelevantes;
- órdenes de otras sedes o centros de costo;
- recepciones ajenas;
- historial completo de auditoría;
- datos financieros de NUMERA;
- campos sensibles que no participen en la decisión actual.

La comparación recibe únicamente la proyección necesaria para el caso y la finalidad autorizada.

---

#### 32. Contraste con el AS-IS de proveedores

El runtime actual materializa `/suppliers`, `/suppliers/new` y `/suppliers/[id]/edit`.

La lista permite buscar y filtrar proveedores y presenta información básica de contacto, estado y condiciones de pago.

Sin embargo:

- utiliza acceso general ORIGO para entrar;
- la gestión se apoya en `origo.suppliers.manage` o una lista local de roles;
- el catálogo canónico exige descomposición de esa mutación;
- no existe allí un caso de sourcing;
- no existe comparación de cotizaciones;
- no existe decisión de selección;
- no existe `VSCREEN-0146` dedicada;
- `VSCREEN-0145` está representada solo parcialmente por condiciones básicas.

Por tanto:

```text
/suppliers
!=
INICIO DEL COMPRADOR
```

---

#### 33. Contraste con el AS-IS de órdenes

El runtime actual permite `/purchase-orders/new` y crea una orden `draft` directamente desde proveedor, sede y líneas.

También observa:

```text
setPurchaseOrderSent

draft -> sent
```

Esto demuestra una capacidad física parcial de orden, pero no sustituye:

```text
VPROC-0020
SOURCING / COMPARACION / RECOMENDACION / DECISION
```

ni el lifecycle completo de `VPROC-0021`.

La experiencia objetivo no usa “Nueva orden” como acción inicial universal del comprador.

---

#### 34. Hallazgos y propietarios

| Hallazgo | Impacto | Propietario | Condición de salida |
| --- | --- | --- | --- |
| no existe superficie AS-IS dedicada de comparación de cotizaciones | sourcing puede ocurrir fuera del sistema o sin evidencia homogénea | materialización UX propietaria consumiendo `ORIGO-UX-004` | `VSCREEN-0072` materializada y vinculada a `VPROC-0020` |
| no existe `VSCREEN-*` dedicada de home comprador | riesgo de inventar una identidad paralela o usar una pantalla ajena como home universal | `ORIGO-UX-004` + materialización posterior | composición de inicio usa identidades existentes sin registrar pantalla ficticia |
| `/suppliers` es catálogo parcial, no sourcing | proveedor visible puede confundirse con proveedor elegido | `ORIGO-UX-004` | catálogo y selección permanecen acciones distintas |
| `origo.suppliers.manage` es legacy monolítico | gestión de proveedor puede conceder más mutaciones de las aprobadas | autorización propietaria + materialización | familia `origo.procurement.suppliers.*` consumida por acción exacta |
| no existen capacidades atómicas publicadas para sourcing/cotización | riesgo de habilitar workflow por `origo.access` | contrato/paquete de autorización ORIGO asociado al flujo | acciones de sourcing cuentan con permiso exacto y enforcement server-side antes de habilitarse |
| `/purchase-orders/new` permite crear `draft` directamente | comprador puede saltar necesidad y sourcing | `ORIGO-UX-007` + materialización | editor consume handoff válido de necesidad/sourcing/decisión |
| `draft -> sent` colapsa aprobación y emisión | comprador puede parecer autoaprobador | `ORIGO-UX-005`, `ORIGO-UX-008` + autorización | decisión aprobatoria y emisión quedan separadas |
| `VSCREEN-0145` está solo parcialmente representada | comparación puede usar condiciones sin versión/vigencia gobernadas | `ORIGO-UX-004`, `ORIGO-UX-012` + owners de proveedor | condiciones sensibles provienen de fuente versionada y autorizada |
| `VSCREEN-0146` no tiene superficie observada | desempeño/reclamación puede quedar fuera de la evaluación | `ORIGO-UX-016` + contrato propietario de proveedor/evidencia | prototipo consume hechos y reclamaciones sin inventar score |

No queda un hallazgo narrativo sin propietario y condición de salida.

---

#### 35. Handoff inmediato a ORIGO-UX-005

`ORIGO-UX-005 — Diseñar inicio para aprobador` recibe:

```text
COMPRADOR = RESPONSABLE_DE_COMPRAS
PROCESO PRINCIPAL DE SOURCING = VPROC-0020
NECESIDAD YA TRANSFERIDA DESDE VPROC-0019
COMPARACION Y RECOMENDACION PREPARADAS POR COMPRADOR
DECISION_CRITICA != AUTOAPROBACION
RECOMMENDATION_PREPARED -> DECISION_PENDING
AUTORIDAD APLICABLE DECIDE
SUPPLIER_SELECTED REQUIERE DECISION AUTORIZADA CUANDO APLIQUE
HANDOFF HACIA VPROC-0021 CONSERVA VERSION Y EVIDENCIA
```

La 005 diseñará la entrada del aprobador sin reabrir el sourcing ni permitir que la visibilidad del comprador se convierta en autoridad de decisión.

---

#### 36. Handoff al resto de ORIGO-UX

| Tarea | Entrada exacta proveniente de ORIGO-UX-004 |
| --- | --- |
| `ORIGO-UX-005` | recomendación/evidencia separadas de la decisión final; aprobador recibe una versión identificable |
| `ORIGO-UX-006` | receptor no hereda funciones de sourcing ni catálogo administrativo del comprador |
| `ORIGO-UX-007` | editor de orden consume sourcing/selección válidos; no funciona como home comprador |
| `ORIGO-UX-008` | aprobación/rechazo/devolución permanecen separados de comparación y emisión |
| `ORIGO-UX-009` | recepción total no altera retrospectivamente sourcing ni selección |
| `ORIGO-UX-010` | recepción parcial proyecta seguimiento sin reabrir decisión de proveedor |
| `ORIGO-UX-011` | diferencias de recepción pueden alimentar desempeño/reclamación sin editar sourcing histórico |
| `ORIGO-UX-012` | precios, contratos y condiciones se proyectan por finalidad y autorización |
| `ORIGO-UX-013` | seguimiento comprador no produce una segunda recepción NEXO |
| `ORIGO-UX-014` | handoff físico conserva compra/recepción fuente e idempotencia |
| `ORIGO-UX-015` | estado financiero posterior no se convierte en estado local de sourcing |
| `ORIGO-UX-016` | prototipo demuestra necesidad → sourcing → aprobación → orden → recepción sin fusionar funciones |

---

#### 37. Requisitos de prueba derivados

**Resultado:** NO GENERA REQUISITOS DE PRUEBA.

**Requisitos creados:** 0
**Requisitos modificados:** 0
**Requisitos diferidos:** 0
**Requisitos obsoletos:** 0

Justificación: separación de necesidad, sourcing, selección, aprobación y orden; gobierno de proveedor y condiciones; segregación entre comprador y aprobador; autorización server-side y auditoría ya cuentan con obligaciones verificables vigentes. Esta tarea especializa la composición UX del comprador sin introducir una obligación observable nueva ni modificar el registro.

---

#### 38. Cobertura de prueba vigente reutilizada

Se reutiliza sin modificación:

- `TREQ-ORIGO-004` para conservar identidades y estados separados entre necesidad, solicitud, sourcing, selección, aprobación, orden y revisión, y capacidades separadas por función;
- `TREQ-ORIGO-005` para identidad estable de proveedor, oferta, contrato, condición comercial, precios versionados, sensibilidad y desempeño derivado de hechos;
- `TREQ-AUTH-001` para exigir autorización por permiso, contexto y alcance en lugar de nombres de rol;
- `TREQ-AUTH-013` para impedir bypass por URL, formulario, API o RPC y revalidar mutaciones en servidor;
- `TREQ-AUTH-015` para conservar evidencia correlacionable de actor, permiso, contexto, recurso y decisión.

Esta enumeración es trazabilidad reutilizada y no constituye modificación del Registro 04A.

---

#### 39. Evidencia de validación

| Clase | Estado | Evidencia |
| --- | --- | --- |
| BUILD | NOT_EXECUTED | `docs:plan:build` corresponde al checkout local después de incorporar el artefacto. |
| LOCAL | NOT_EXECUTED | Formato, quality, delivery, topología, EOL, TREQ y batería global quedan pendientes del checkout local de la tarea. |
| REMOTA | PASS | Se verificaron `vento-shell/main@e2633c54c62b48088e2c908d187a96d891867275`, `vento-origo/main@70860f1ca5f0a4a73e894cbb840956f9f7eda2ad`, topología `DEFINE_ONCE / NO_PHYSICAL_INSTANCE`, `VPROC-0020`, sus ocho estados, roles y segregación, `VSCREEN-0070/0071/0072/0073/0075/0145/0146`, 04A ORIGO/AUTH, catálogo de permisos ORIGO y runtime AS-IS de proveedores y órdenes. La entrada inmediata `ORIGO-UX-003` se consume desde la versión aprobada ya publicada en `main`. |
| OPERATIVA | NOT_EXECUTED | No se ejecutaron necesidades reales, sourcing, cotizaciones, comparaciones, recomendaciones, decisiones, órdenes, proveedores ni pruebas con usuarios. |
| FÍSICA | NOT_APPLICABLE | `ORIGO-UX-004` no crea instancia física propia ni autoriza cambios de producto, datos o infraestructura. |

---

#### 40. Criterios de aceptación

La tarea queda documentalmente completa cuando:

- [ ] `RESPONSABLE_DE_COMPRAS` queda definido como función principal del inicio;
- [ ] el inicio consume necesidades transferidas y no recrea la solicitud;
- [ ] no se crea una nueva identidad `VSCREEN-*` de home comprador;
- [ ] la composición del inicio reutiliza identidades canónicas existentes;
- [ ] `VPROC-0020` permanece como proceso principal de sourcing;
- [ ] los ocho estados de `VPROC-0020` quedan distinguibles y comprensibles;
- [ ] la acción primaria cambia según el estado del caso;
- [ ] `VSCREEN-0070` se usa para consulta de proveedores sin adjudicación implícita;
- [ ] `VSCREEN-0071` queda condicionada a capacidad administrativa exacta;
- [ ] `VSCREEN-0072` queda como superficie central de comparación;
- [ ] una cotización conserva origen, versión, vigencia y condiciones comparables;
- [ ] `RECOMMENDATION_PREPARED` no equivale a `SUPPLIER_SELECTED`;
- [ ] `DECISION_PENDING` bloquea autoaprobación del comprador;
- [ ] la selección crítica conserva autoridad separada cuando aplica;
- [ ] `VSCREEN-0145` queda protegido por finalidad y sensibilidad;
- [ ] `VSCREEN-0146` no inventa score manual sin hechos;
- [ ] `VSCREEN-0073` queda como handoff posterior y no como home comprador;
- [ ] `VSCREEN-0075` se consume como seguimiento autorizado y no como permiso universal;
- [ ] el comprador no edita silenciosamente origen, cantidad, fecha o justificación de la necesidad;
- [ ] el aprobador recibe una versión identificable de recomendación/evidencia;
- [ ] comprador y receptor permanecen funciones distintas;
- [ ] filtros de UI no conceden territorio ni acceso;
- [ ] `origo.access` no actúa como wildcard;
- [ ] `origo.suppliers.manage` se trata como legacy y no como permiso final;
- [ ] consulta, creación, actualización, activación y desactivación de proveedor permanecen capacidades distintas;
- [ ] las acciones de sourcing faltantes en el catálogo publicado quedan fail-closed para materialización;
- [ ] vacío, deny, contexto inválido, stale y fallo técnico no se confunden;
- [ ] datos sensibles se minimizan desde la fuente según finalidad;
- [ ] `/suppliers` no se eleva a inicio comprador;
- [ ] `/purchase-orders/new` no se eleva a inicio comprador;
- [ ] `draft -> sent` no sustituye sourcing + aprobación + emisión;
- [ ] cada hallazgo tiene propietario y condición de salida;
- [ ] `ORIGO-UX-005` recibe un handoff suficiente para diseñar aprobador sin reabrir sourcing;
- [ ] no se crean ni modifican requisitos de prueba;
- [ ] no se ejecutan cambios físicos desde esta tarea.

---

#### 41. Límites

Esta tarea no:

- implementa un home de comprador;
- crea una ruta física nueva;
- crea una identidad `VSCREEN-*` nueva;
- crea componentes, endpoints o Server Actions;
- crea permisos nuevos;
- modifica el catálogo de autorización;
- concede sourcing por `origo.access`;
- convierte `origo.suppliers.manage` en permiso canónico;
- crea modelo físico de cotizaciones;
- crea tablas, archivos, buckets o Storage para evidencia;
- crea o modifica proveedor real;
- crea o modifica orden de compra real;
- selecciona proveedor real;
- aprueba compra real;
- registra recepción real;
- modifica `vento-origo`;
- modifica Supabase, migraciones, RLS, RPC, grants o datos;
- modifica NEXO o NUMERA;
- diseña el editor final de orden de `ORIGO-UX-007`;
- diseña la bandeja final del aprobador de `ORIGO-UX-005`;
- diseña recepción de `ORIGO-UX-006`;
- ejecuta E5;
- crea instancia física;
- modifica el Registro 04A;
- desarrolla `ORIGO-UX-005`.

---

#### 42. Continuidad

**ÚLTIMA TAREA APROBADA**
`ORIGO-UX-003 — Diseñar inicio para solicitante`

**TAREA ACTUAL APROBADA**
`ORIGO-UX-004 — Diseñar inicio para comprador`

**SIGUIENTE TAREA RESERVADA**
`ORIGO-UX-005 — Diseñar inicio para aprobador`
### ✅ ORIGO-UX-005 — Diseñar inicio para aprobador

**Estado:** APROBADA
**Tarea anterior:** ORIGO-UX-004 — Diseñar inicio para comprador
**Tarea siguiente:** ORIGO-UX-006 — Diseñar inicio para receptor
**Tipo de tarea:** diseño documental integral de la experiencia inicial del aprobador sobre `VPROC-0021`, con `VSCREEN-0074` como bandeja canónica de decisión y consumo controlado de detalle/evidencia desde `VSCREEN-0075`, preservando segregación entre comprador y aprobador, versión evaluada, política de aprobación, urgencia/excepción, rechazo/devolución gobernados y separación estricta entre aprobación, emisión y recepción; `DEFINE_ONCE` / `NO_PHYSICAL_INSTANCE`
**Bloque:** BLOQUE M — ORIGO
**Repositorio propietario:** `vento-group-sas/vento-shell`
**Archivo propietario:** `docs/plan-canonico/modular/bloques/M_ORIGO/02_EXPERIENCIA_DE_COMPRAS.md`
**Estado físico resultante:** `NO_PHYSICAL_INSTANCE`
**Cambios físicos autorizados:** ninguno; esta tarea no modifica código, rutas, navegación, componentes, procesos, permisos, roles, grants, datos, tablas, RLS, RPC, migraciones, Supabase, Storage, packages, consumidores ni despliegues
**Requisitos de prueba creados o modificados:** 0

---

#### 1. Propósito

Diseñar el contrato de experiencia para una persona que actúa como **APROBADOR** dentro del ciclo de compras ORIGO, de forma que pueda:

- recibir únicamente compras que realmente esperan una decisión bajo su autoridad;
- revisar necesidad, sourcing, proveedor, condiciones, importe, riesgo, urgencia y evidencia sin reconstruir manualmente el expediente;
- distinguir revisión, decisión, aprobación, rechazo, devolución y emisión;
- aprobar únicamente la versión exacta que revisó;
- rechazar o devolver sin borrar la propuesta ni fabricar estados inexistentes;
- detectar conflicto de segregación antes de ejecutar una decisión;
- operar sin depender de turno o check-in como fuente artificial de autoridad;
- dejar una evidencia correlacionable de decisión, actor, política y versión;
- entregar el resultado al flujo de preparación/emisión sin asumir funciones de comprador, emisor o receptor.

La tarea diseña la experiencia objetivo del aprobador sobre:

```text
VSCREEN-0074 — Bandeja de aprobaciones de compra
VSCREEN-0075 — Detalle y seguimiento de orden, como contexto de consulta
VPROC-0021    — Aprobar y emitir compras separando flujo ordinario, urgencia y excepción
```

No implementa esas superficies ni modifica autorización física.

---

#### 2. Entrada aprobada de ORIGO-UX-004

`ORIGO-UX-004` entrega una frontera cerrada:

```text
COMPRADOR = RESPONSABLE_DE_COMPRAS
PROCESO DE SOURCING = VPROC-0020
COMPARACION Y RECOMENDACION PREPARADAS POR COMPRADOR
RECOMMENDATION_PREPARED != DECISION FINAL
DECISION_PENDING REQUIERE AUTORIDAD DISTINTA
SUPPLIER_SELECTED EXIGE DECISION AUTORIZADA
HANDOFF HACIA VPROC-0021 CONSERVA VERSION Y EVIDENCIA
```

La tarea actual consume ese handoff sin reabrir sourcing, catálogo de proveedores ni comparación de cotizaciones.

---

#### 3. Naturaleza y topología

La topología vigente de `ORIGO-UX-001..016` establece:

```text
mode = DEFINE_ONCE
execution_gate = NO_PHYSICAL_INSTANCE
```

Consecuencias:

1. `ORIGO-UX-005` se define una sola vez;
2. no existe una instancia física propia de esta tarea;
3. no se crea una ruta o componente en `vento-origo`;
4. no se implementa permission check, Server Action, RPC, RLS ni migración;
5. las decisiones de esta tarea serán consumidas por materializaciones posteriores;
6. las brechas AS-IS se documentan con propietario y condición de salida, no se corrigen aquí.

---

#### 4. Fuentes verificadas

El diseño consume y conserva:

- `ORIGO-UX-001 — Inventariar el proceso completo de abastecimiento`;
- `ORIGO-UX-002 — Separar solicitud, compra, aprobación y recepción`;
- `ORIGO-UX-003 — Diseñar inicio para solicitante`;
- `ORIGO-UX-004 — Diseñar inicio para comprador` como base inmediata aprobada;
- `ORIGO-AUTH-006 — Definir permisos de aprobación`;
- `ORIGO-AUTH-008 — Definir permisos de corrección` para el límite de cambios pre/post aprobación;
- `ORIGO-AUTH-009..013` para territorio, sensibilidad, actor, contexto y administración;
- `VPROC-0021` y sus ocho estados canónicos;
- `VPROC-0021.TR-003` como transición de aprobación;
- `VPROC-0021.EX-002 — HOLD` y `VPROC-0021.EX-004 — REJECT` como excepciones ya definidas;
- `VSCREEN-0074` y `VSCREEN-0075`;
- matrices E2 de iniciadores, ejecutores, aprobadores, segregación y experiencia;
- Registro 04A vigente de ORIGO y AUTH;
- runtime observado de detalle de orden y `setPurchaseOrderSent` en `vento-origo`;
- scripts y validadores documentales vigentes.

---

#### 5. Identidad funcional del aprobador

Para `VPROC-0021` la función de aprobación obligatoria se resuelve sobre:

```text
GERENCIA_GENERAL
OR
COORDINACION_DE_OPERACIONES
```

El `RESPONSABLE_DE_COMPRAS` permanece como iniciador/ejecutor principal del proceso, no como autoridad automática para aprobar la misma decisión crítica que preparó.

Regla:

```text
FUNCION EMPRESARIAL APROBADOR
!=
ROL TECNICO INVENTADO
```

La UX no crea un rol `aprobador`; consume actor efectivo, autoridad y permiso exacto ya resueltos.

---

#### 6. Identidad canónica de la autoridad

La autoridad documental vigente de aprobación es:

```text
origo.procurement.purchase_orders.approve
```

Contrato:

```text
resource = PURCHASE_ORDER
action = approve
mode = BASE_ONLY
```

Consecuencias:

- `origo.access` no aprueba;
- `purchase_orders.view` no aprueba;
- `purchase_orders.create` no aprueba;
- `purchase_orders.update` no aprueba;
- turno/check-in no conceden aprobación;
- visibilidad de un botón no concede autoridad;
- llegar por URL directa a la bandeja no concede autoridad.

---

#### 7. Pantalla canónica de inicio

El inicio del aprobador **sí tiene una identidad canónica propia**:

```text
VSCREEN-0074
Bandeja de aprobaciones de compra
VPROC-0021
VPROC-0021::STEP-APPROVE_PURCHASE
APPROVE / DECISION
```

Por tanto, esta tarea no crea una nueva pantalla `VSCREEN-*`.

La bandeja organiza trabajo de decisión; no funciona como editor general de órdenes, home del comprador ni consola de recepción.

---

#### 8. Pregunta operativa del inicio

La experiencia del aprobador responde primero:

```text
¿QUE COMPRAS REQUIEREN MI DECISION Y QUE NECESITO SABER PARA DECIDIR SIN RECONSTRUIR EL EXPEDIENTE?
```

La composición queda:

```text
CONTEXTO DE AUTORIDAD
+
BANDEJA DE DECISIONES PENDIENTES
+
IMPACTO / IMPORTE / URGENCIA / EXCEPCION
+
EVIDENCIA RESUMIDA
+
SEGREGACION Y CONFLICTOS
+
VERSION EVALUADA
+
ACCIONES DE DECISION GOBERNADAS
=
INICIO DEL APROBADOR
```

---

#### 9. Condición de entrada a VPROC-0021

La entrada canónica exige una propuesta completa con:

- necesidad o justificación trazable;
- proveedor identificado;
- condiciones identificadas;
- alcance de compra;
- evidencia suficiente;
- versión identificable;
- información necesaria para aplicar política de aprobación.

El estado inicial es:

```text
PURCHASE_REQUEST_PENDING_APPROVAL
```

Invariante:

```text
INICIAR DECISION
!=
APROBAR
```

---

#### 10. Lifecycle completo de VPROC-0021

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

La UX del aprobador debe distinguirlos sin colapsarlos en `draft`, `sent` o `received`.

---

#### 11. Punto exacto de decisión de aprobación

La aprobación positiva canónica se identifica con:

```text
VPROC-0021.TR-003
PENDING_APPROVAL
→ APPROVED
```

Clase de autoridad:

```text
CONTROL_ACEPTACION
```

Regla obligatoria:

```text
APPROVED
!=
ORDER_PREPARING
!=
ORDER_ISSUED
!=
PURCHASE_COMMITMENT_FORMALIZED
```

El aprobador autoriza la compra; no envía por ese hecho la orden al proveedor.

---

#### 12. Revisión previa a la decisión

Antes de llegar a `PENDING_APPROVAL`, la compra puede pasar por:

```text
PURCHASE_REQUEST_PENDING_APPROVAL
→ UNDER_REVIEW
→ PENDING_APPROVAL
```

La bandeja debe mostrar si la propuesta:

- todavía está en revisión;
- ya está lista para decisión;
- tiene evidencia incompleta;
- quedó bloqueada por conflicto;
- cambió de versión;
- requiere un carril urgente o de excepción.

La UI no debe ofrecer una aprobación efectiva cuando el recurso aún no es elegible.

---

#### 13. Resumen mínimo de cada decisión pendiente

Cada elemento de `VSCREEN-0074` debe poder presentar, según autorización y minimización:

- referencia de compra;
- solicitante o unidad de origen;
- comprador/preparador;
- proveedor recomendado/seleccionado;
- sede y centro de costo aplicables;
- categoría o naturaleza de compra;
- importe y moneda necesarios para decidir;
- fecha requerida;
- urgencia/excepción declarada;
- política/regla que exige la decisión;
- estado actual;
- versión evaluable;
- señales de riesgo/conflicto;
- evidencia faltante o completa;
- antigüedad/SLA cuando exista contrato aplicable.

No se carga por defecto todo el expediente sensible del proveedor.

---

#### 14. Drill-down autorizado hacia detalle

`VSCREEN-0075 — Detalle y seguimiento de orden` puede actuar como detalle contextual para el aprobador cuando exista relación y autoridad suficiente.

La bandeja puede derivar hacia detalle para consultar:

- líneas;
- cantidades;
- presentación;
- importe;
- condiciones;
- necesidad vinculada;
- sourcing/recomendación;
- documentos permitidos;
- historia de versión;
- evidencia de cambios.

Pero:

```text
ABRIR DETALLE
!=
APROBAR
```

---

#### 15. Evidencia proveniente del comprador

La 005 consume el handoff de 004 sin permitir que el comprador convierta su recomendación en decisión.

Debe poder consultar, según autorización:

- criterios comparados;
- ofertas/cotizaciones vigentes;
- proveedor recomendado;
- condiciones principales;
- riesgos;
- justificación de recomendación;
- versión de sourcing;
- evidencia documental necesaria.

Regla:

```text
RECOMENDACION PREPARADA
!=
DECISION APROBADA
```

---

#### 16. Política de aprobación visible y comprensible

La política puede depender de:

```text
empresa
sede
centro de costo
categoria
importe
riesgo
urgencia
excepcion
```

La UX no necesita exponer la implementación interna de la política, pero sí debe indicar de forma comprensible:

- por qué la decisión llegó a ese aprobador;
- qué condición material está evaluando;
- si existe doble control o autoridad adicional;
- si la política bloquea la acción;
- si una excepción está siendo aplicada.

No se exponen reglas sensibles innecesarias a actores no autorizados.

---

#### 17. Segregación obligatoria

Se conserva:

```text
SOLICITANTE
!=
COMPRADOR
!=
APROBADOR
!=
RECEPTOR
```

Para la decisión crítica:

```text
INICIADOR / PREPARADOR / EJECUTOR
→ NO EMITE SU PROPIA APROBACION FINAL
```

Una misma persona solo puede acumular funciones cuando una política aprobada lo permite explícitamente.

Si existe conflicto no autorizado, la UX debe bloquear la decisión, no ocultar el conflicto ni permitir un bypass manual.

---

#### 18. Autoaprobación y excepción

La ausencia de otro usuario disponible, la urgencia, el cargo, el acceso a ORIGO o la propiedad del negocio no crean una excepción por sí solos.

Una excepción válida debe conservar al menos:

- causa;
- política que la habilita;
- autoridad que la concedió;
- alcance;
- vigencia;
- límites;
- actor;
- tratamiento del conflicto;
- regularización posterior cuando aplique;
- evidencia auditable.

La interfaz debe hacer visible que se está usando una excepción; no debe representar el caso como aprobación ordinaria.

---

#### 19. Compra ordinaria, urgente y excepcional

La bandeja distingue el carril de decisión:

| Carril | Lectura UX | Regla |
| --- | --- | --- |
| ordinario | compra preparada bajo política normal | no existe autoaprobación implícita |
| urgente | causa y límite explícitos | urgencia no elimina autoridad ni auditoría |
| excepcional | política/override explícito | exige alcance, evidencia y regularización según contrato |

La UX no crea un botón genérico `aprobar urgente` que eluda las comprobaciones del carril.

---

#### 20. Aprobar

La acción de aprobación se habilita únicamente cuando el recurso está en estado elegible y la decisión server-side puede demostrar:

```text
APP_ACCESS
AND
EXACT_APPROVE_PERMISSION
AND
BASE_LANE_VALID
AND
APPROVER_AUTHORITY_VALID
AND
RESOURCE_SCOPE_VALID
AND
CURRENT_STATE_ELIGIBLE
AND
APPROVAL_POLICY_MATCHES
AND
SEGREGATION_VALID
AND
EVIDENCE_COMPLETE
AND
NO_CONFLICT_BLOCKING
```

La UX puede anticipar bloqueos, pero la decisión real se revalida siempre en servidor.

---

#### 21. Rechazar

`VSCREEN-0074` admite la intención de rechazo.

Se preserva:

```text
VPROC-0021.EX-004 — REJECT
```

La experiencia debe exigir razón suficiente y conservar actor, versión y evidencia.

No se crea una permission key `.reject` nueva desde UX.

El detalle de transición y efectos posteriores pertenece a `ORIGO-UX-008` y a los contratos de proceso/autoridad propietarios.

---

#### 22. Devolver para ajuste

La pantalla canónica también contempla devolver una compra para ajuste.

Sin embargo, el lifecycle principal no define un estado canónico nuevo llamado `RETURNED_FOR_CHANGES`.

Se conserva el contrato existente:

```text
VPROC-0021.EX-002 — HOLD
```

La UX puede expresar una devolución controlada al preparador cuando el contrato de proceso lo permita, conservando:

- razón;
- actor;
- versión;
- evidencia faltante o ajuste solicitado;
- owner de reanudación.

No se inventa un estado ni permission key nueva desde esta tarea.

---

#### 23. Versión evaluada

La decisión queda ligada a una versión identificable.

Regla:

```text
VERSION_REVISADA
=
VERSION_APROBADA
```

Si cambia materialmente cualquiera de estos elementos:

- proveedor;
- líneas;
- cantidades;
- precios;
- impuestos;
- condiciones;
- sede;
- centro de costo;
- urgencia;
- justificación;
- documentación crítica;

la aprobación pendiente debe invalidarse o reevaluarse según la política aplicable.

---

#### 24. Protección contra decisiones obsoletas

La UX debe detectar cuando el detalle abierto dejó de ser vigente.

Si la versión cambia mientras el aprobador revisa:

```text
DECISION SOBRE VERSION OBSOLETA
→ DENY / RELOAD / REEVALUAR
```

Nunca:

```text
APROBAR VERSION ANTERIOR
→ APLICAR SOBRE VERSION NUEVA
```

---

#### 25. Datos sensibles y minimización

El aprobador recibe suficiente información para decidir, no acceso irrestricto al expediente comercial.

Puede necesitar:

- importe;
- moneda;
- condiciones comerciales relevantes;
- proveedor;
- riesgo;
- evidencia financiera;
- presupuesto cuando aplique;
- documentos requeridos.

No hereda por defecto:

- cuentas bancarias completas;
- documentos tributarios no necesarios;
- historial de precios irrelevante;
- notas internas ajenas a la decisión;
- datos de otros proveedores no relacionados.

---

#### 26. Contexto, territorio y administración

La aprobación es `BASE_ONLY`.

Por tanto:

```text
TURNO
CHECK-IN
ROL OPERATIVO
```

no son fuentes de autoridad de aprobación.

La decisión sí conserva recurso y alcance empresarial/territorial de la orden.

La UX no usa un selector de sede como sustituto de la autoridad resuelta.

---

#### 27. Dispositivo compartido

Un dispositivo compartido no se convierte en aprobador.

La ejecución futura deberá resolver:

```text
principal
actor humano efectivo
permiso exacto
autoridad funcional
segregacion
recurso
politica vigente
```

Una sesión de estación, PIN o contexto operativo no sustituye la autoridad administrativa.

---

#### 28. Simulación y vista previa

La UX puede mostrar una simulación de decisión con:

- política aplicable;
- autoridad requerida;
- razones;
- bloqueos;
- campos/evidencia faltantes;
- impacto esperado.

Pero:

```text
SIMULACION FAVORABLE
!=
APROBACION REAL
```

La simulación no genera envío ni compromiso comercial.

---

#### 29. Estados de experiencia del inicio

La bandeja distingue al menos:

| Estado UX | Significado | Tratamiento |
| --- | --- | --- |
| `LISTO` | existen decisiones elegibles | mostrar bandeja y acciones autorizadas |
| `SIN_PENDIENTES` | no hay decisiones en el alcance | estado vacío real |
| `SIN_AUTORIDAD` | hay recurso visible pero no capacidad de decidir | no serializar acciones protegidas |
| `CONFLICTO_DE_SEGREGACION` | actor participó de forma incompatible en la preparación | bloquear decisión |
| `EVIDENCIA_INCOMPLETA` | falta soporte exigido por política | permitir consulta, no aprobar |
| `VERSION_DESACTUALIZADA` | cambió la propuesta revisada | revalidar/reabrir antes de decidir |
| `POLITICA_NO_RESUELTA` | no puede determinarse regla aplicable | fail-closed |
| `FALLO_TECNICO` | fuente o servicio falló | no equivale a bandeja vacía |

Reglas:

```text
SIN_PENDIENTES != DENEGADO
DENEGADO != EVIDENCIA_INCOMPLETA
VERSION_DESACTUALIZADA != FALLO_TECNICO
FALLO_TECNICO != CERO DECISIONES
```

---

#### 30. Ordenamiento de la bandeja

La bandeja puede priorizar visualmente por criterios como:

- urgencia válida;
- antigüedad;
- fecha requerida;
- impacto;
- ventana de compra;
- excepción pendiente;
- riesgo.

El orden visual no modifica por sí mismo autoridad, política ni prioridad empresarial.

---

#### 31. Evidencia de la decisión

Toda decisión debe conservar como mínimo, cuando aplique:

```text
purchase_order_id
version evaluada
actor aprobador
principal y actor efectivo
permission_key
alcance
regla/politica aplicada
decision
razon/comentario
timestamp
```

Además, la auditoría debe poder correlacionar la decisión con la necesidad, sourcing/recomendación y orden resultante.

---

#### 32. Aprobación no equivale a emisión

Regla central:

```text
APPROVE
!=
SEND
!=
ORDER_ISSUED
```

Después de `APPROVED`, el proceso continúa:

```text
ORDER_PREPARING
→ ORDER_ISSUED
→ SUPPLIER_ACK_PENDING
→ PURCHASE_COMMITMENT_FORMALIZED
```

La 005 no diseña el mecanismo completo de emisión; `ORIGO-UX-007` y `ORIGO-UX-008` conservan editor, aprobación/rechazo y transición de orden.

---

#### 33. Aprobación no equivale a recepción

La compra aprobada tampoco produce por sí sola:

```text
RECEIPT_EXPECTED
ARRIVAL_REGISTERED
RECEIPT_RECONCILED
```

El receptor comienza sobre un compromiso/entrega válida, no sobre una decisión de aprobación aislada.

`ORIGO-UX-006` conserva el inicio del receptor.

---

#### 34. Contraste AS-IS de vento-origo

En el runtime observado no existe una superficie dedicada equivalente a `VSCREEN-0074`.

El detalle actual de orden expone estados simplificados:

```text
draft
sent
received
```

y la acción más cercana a “avanzar” la compra es `setPurchaseOrderSent`, que actualiza:

```text
draft
→ sent
```

En la superficie inspeccionada no se observa dentro de esa acción:

- `origo.procurement.purchase_orders.approve`;
- actor aprobador explícito;
- política de aprobación;
- transición `PENDING_APPROVAL → APPROVED`;
- versión aprobada;
- razón/decisión;
- segregación comprador/aprobador;
- separación explícita entre aprobación y emisión.

Esto describe la evidencia observada; no afirma ausencia de controles en capas no inspeccionadas.

---

#### 35. No elevar el AS-IS a contrato objetivo

Se prohíben equivalencias como:

```text
draft = pendiente de aprobacion
sent = aprobado
sent = emitido correctamente
received = proceso completo
```

El runtime actual es evidencia parcial, no definición del lifecycle canónico.

---

#### 36. Hallazgos y propietarios

| Hallazgo | Impacto | Propietario | Condición de salida |
| --- | --- | --- | --- |
| no existe `VSCREEN-0074` materializada como bandeja de aprobación | decisiones pueden quedar implícitas dentro del detalle de orden | materialización UX propietaria consumiendo `ORIGO-UX-005` | bandeja canónica muestra solo decisiones elegibles y separa consulta de decisión |
| `setPurchaseOrderSent` colapsa `draft → sent` | aprobación y emisión pueden confundirse | `ORIGO-UX-007`, `ORIGO-UX-008` + materialización AUTH/consumer | aprobación, preparación, emisión y envío usan estados/autoridades separadas |
| permiso `purchase_orders.approve` no se observa aplicado en la acción AS-IS | riesgo de decisión sin binding exacto si capas inferiores no restringen | materialización de `ORIGO-AUTH-006/014` + consumidor | mutación revalida permiso exacto, recurso, estado, política, segregación y versión |
| no existe evidencia UX dedicada de versión evaluada | aprobación puede aplicarse sobre contenido modificado | `ORIGO-UX-005`, `ORIGO-UX-008` + implementación propietaria | decisión usa versión estable y falla cerrado ante stale |
| rechazo/devolución no poseen estados principales dedicados | riesgo de inventar lifecycle o perder razón | `ORIGO-UX-008` + contrato de proceso | HOLD/REJECT y retorno controlado conservan evidencia sin aliases improvisados |
| urgencia puede confundirse con bypass | compra expedita podría omitir autoridad | `ORIGO-UX-005`, `ORIGO-UX-008`, `TREQ-ORIGO-004` | carril urgente conserva causa, límite, autoridad, auditoría y regularización |

No queda un hallazgo narrativo sin propietario y condición de salida.

---

#### 37. Handoff inmediato a ORIGO-UX-006

`ORIGO-UX-006 — Diseñar inicio para receptor` recibe:

```text
APROBACION != RECEPCION
APPROVED != ORDER_ISSUED
ORDER_ISSUED != PURCHASE_COMMITMENT_FORMALIZED
RECEPTOR NO HEREDA AUTORIDAD DE APROBADOR
RECEPCION COMIENZA SOBRE COMPRA/ENTREGA ELEGIBLE Y CORRELACIONADA
VERSION Y EVIDENCIA DE COMPRA SE CONSERVAN
```

La 006 diseñará la cola inicial del receptor sin reabrir decisión de compra.

---

#### 38. Handoff al resto de ORIGO-UX

| Tarea | Entrada exacta proveniente de ORIGO-UX-005 |
| --- | --- |
| `ORIGO-UX-006` | receptor recibe compra/entrega elegible, no la capacidad de aprobación |
| `ORIGO-UX-007` | editor de orden consume aprobación válida y conserva versión; no aprueba por editar |
| `ORIGO-UX-008` | aprobación, rechazo, devolución, urgencia y excepción se materializan con segregación y evidencia |
| `ORIGO-UX-009` | recepción total consume compromiso válido sin reabrir la aprobación |
| `ORIGO-UX-010` | recepción parcial conserva la orden aprobada y el saldo pendiente |
| `ORIGO-UX-011` | diferencias posteriores no alteran retrospectivamente la decisión aprobada sin flujo gobernado |
| `ORIGO-UX-012` | importes/condiciones visibles al aprobador siguen field masks y finalidad |
| `ORIGO-UX-013` | seguimiento de compra no produce una segunda recepción NEXO |
| `ORIGO-UX-014` | handoff físico consume una recepción/orden correlacionadas, no una aprobación aislada |
| `ORIGO-UX-015` | hecho económico posterior conserva referencia a compra aprobada sin convertir aprobación en asiento |
| `ORIGO-UX-016` | prototipo demuestra comprador → aprobador → orden → receptor sin fusionar funciones |

---

#### 39. Requisitos de prueba derivados

**Resultado:** NO GENERA REQUISITOS DE PRUEBA.

**Requisitos creados:** 0
**Requisitos modificados:** 0
**Requisitos diferidos:** 0
**Requisitos obsoletos:** 0

Justificación: aprobación por política, segregación de funciones, autorización server-side, versión evaluada, protección de órdenes y auditoría ya cuentan con obligaciones verificables registradas. Esta tarea especializa la experiencia del aprobador sin introducir una obligación observable nueva ni modificar el registro.

---

#### 40. Cobertura de prueba vigente reutilizada

Se reutiliza sin modificación:

- `TREQ-ORIGO-002` para limitar lectura y mutación de órdenes por permiso, alcance, estado y columnas;
- `TREQ-ORIGO-004` para separar solicitud, sourcing, aprobación, orden y recepción, aplicar políticas por empresa/sede/centro de costo/categoría/importe/riesgo/urgencia y evitar autoaprobación;
- `TREQ-AUTH-001` para exigir autorización por permiso, contexto y alcance canónicos;
- `TREQ-AUTH-010` para preservar segregación de funciones y evitar que compras apruebe su propia decisión crítica por inferencia;
- `TREQ-AUTH-013` para impedir bypass por URL, formulario, API o RPC y revalidar la mutación en servidor;
- `TREQ-AUTH-015` para conservar evidencia correlacionable de actor, permiso, recurso, decisión, razones, versión y timestamp.

Esta enumeración es trazabilidad reutilizada y no constituye modificación del Registro 04A.

---

#### 41. Evidencia de validación

| Clase | Estado | Evidencia |
| --- | --- | --- |
| BUILD | NOT_EXECUTED | `docs:plan:build` corresponde al checkout local después de incorporar el artefacto. |
| LOCAL | NOT_EXECUTED | Formato, quality, delivery, topología, EOL, TREQ y batería global quedan pendientes del checkout local. |
| REMOTA | PASS | Se verificaron las fuentes canónicas vigentes de `vento-shell`, topología `DEFINE_ONCE / NO_PHYSICAL_INSTANCE`, `VPROC-0021`, sus ocho estados, `VPROC-0021.TR-003`, excepciones HOLD/REJECT, `VSCREEN-0074/0075`, actores aprobadores, permiso `origo.procurement.purchase_orders.approve`, 04A ORIGO/AUTH y runtime AS-IS de detalle/emisión de orden. La entrada inmediata `ORIGO-UX-004` se consume desde su artefacto completo aprobado en esta conversación. |
| OPERATIVA | NOT_EXECUTED | No se ejecutaron aprobaciones, rechazos, devoluciones, compras urgentes, excepciones, emisiones, proveedores ni pruebas con usuarios. |
| FÍSICA | NOT_APPLICABLE | `ORIGO-UX-005` no crea instancia física propia ni autoriza cambios de producto, datos o infraestructura. |

---

#### 42. Criterios de aceptación

La tarea queda documentalmente completa cuando:

- [ ] `VSCREEN-0074` queda definida como inicio canónico del APROBADOR;
- [ ] no se crea una nueva identidad `VSCREEN-*`;
- [ ] `GERENCIA_GENERAL` y `COORDINACION_DE_OPERACIONES` quedan como funciones aprobadoras canónicas;
- [ ] `RESPONSABLE_DE_COMPRAS` no se autoaprueba por ser preparador;
- [ ] `origo.procurement.purchase_orders.approve` queda como autoridad exacta de decisión;
- [ ] la modalidad se conserva `BASE_ONLY`;
- [ ] turno/check-in no se convierten en requisito artificial;
- [ ] los ocho estados de `VPROC-0021` quedan diferenciados;
- [ ] `PENDING_APPROVAL → APPROVED` queda identificado como punto de aprobación;
- [ ] `APPROVED` no se confunde con `ORDER_ISSUED`;
- [ ] la bandeja muestra solo decisiones dentro del alcance autorizado;
- [ ] cada decisión consume una versión identificable;
- [ ] un cambio material invalida o fuerza reevaluación de la aprobación pendiente;
- [ ] la evidencia de sourcing/recomendación es visible según autorización pero no decide por sí sola;
- [ ] política ordinaria, urgente y excepcional permanecen distinguibles;
- [ ] urgencia no elimina autoridad ni auditoría;
- [ ] segregación se evalúa antes de habilitar la decisión;
- [ ] autoaprobación solo puede existir bajo excepción explícita y auditada;
- [ ] rechazo conserva razón, actor, versión y evidencia;
- [ ] devolución no inventa un estado principal nuevo;
- [ ] `HOLD` y `REJECT` se consumen sin crear aliases de estado arbitrarios;
- [ ] `VSCREEN-0075` se usa como contexto y no como autoridad implícita;
- [ ] datos sensibles se minimizan por finalidad;
- [ ] dispositivo compartido no se convierte en aprobador;
- [ ] simulación no equivale a decisión real;
- [ ] vacío, deny, conflicto, evidencia incompleta, stale y fallo técnico no se confunden;
- [ ] el AS-IS `draft/sent/received` no se eleva a lifecycle objetivo;
- [ ] `setPurchaseOrderSent` no se interpreta como aprobación canónica;
- [ ] cada hallazgo tiene propietario y condición de salida;
- [ ] `ORIGO-UX-006` recibe un handoff limpio hacia receptor;
- [ ] no se crean ni modifican requisitos de prueba;
- [ ] no se ejecutan cambios físicos desde esta tarea.

---

#### 43. Límites

Esta tarea no:

- implementa la bandeja de aprobaciones;
- crea una ruta física nueva;
- crea una identidad `VSCREEN-*` nueva;
- crea componentes, endpoints o Server Actions;
- crea permission keys nuevas;
- modifica `purchase_orders.approve`;
- crea `.reject`, `.return` o `.send`;
- crea estados nuevos de `VPROC-0021`;
- implementa HOLD o REJECT físicamente;
- cambia políticas de aprobación;
- concede autoaprobación;
- modifica roles/grants;
- implementa el editor final de orden;
- emite órdenes;
- envía al proveedor;
- registra recepción;
- modifica `vento-origo`;
- modifica Supabase, migraciones, RLS, RPC, grants o datos;
- modifica NEXO o NUMERA;
- ejecuta E5;
- crea instancia física;
- modifica el Registro 04A;
- desarrolla `ORIGO-UX-006`.

---

#### 44. Continuidad

**ÚLTIMA TAREA APROBADA**
`ORIGO-UX-004 — Diseñar inicio para comprador`

**TAREA ACTUAL APROBADA**
`ORIGO-UX-005 — Diseñar inicio para aprobador`

**SIGUIENTE TAREA RESERVADA**
`ORIGO-UX-006 — Diseñar inicio para receptor`
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
