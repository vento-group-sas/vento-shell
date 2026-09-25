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
### ✅ ORIGO-UX-006 — Diseñar inicio para receptor

**Estado:** APROBADA
**Tarea anterior:** ORIGO-UX-005 — Diseñar inicio para aprobador
**Tarea siguiente:** ORIGO-UX-007 — Diseñar creación de orden de compra
**Tipo de tarea:** diseño documental integral de la experiencia inicial del receptor sobre `VPROC-0022`, con `VSCREEN-0076` como cola canónica de trabajo y derivación gobernada hacia `VSCREEN-0077`, preservando elegibilidad de compra/entrega, separación entre consulta y registro, contexto operativo, territorio, actor efectivo, modalidad de recepción, diferencias y fronteras ORIGO–NEXO–NUMERA; `DEFINE_ONCE` / `NO_PHYSICAL_INSTANCE`
**Bloque:** BLOQUE M — ORIGO
**Repositorio propietario:** `vento-group-sas/vento-shell`
**Archivo propietario:** `docs/plan-canonico/modular/bloques/M_ORIGO/02_EXPERIENCIA_DE_COMPRAS.md`
**Estado físico resultante:** `NO_PHYSICAL_INSTANCE`
**Cambios físicos autorizados:** ninguno; esta tarea no modifica código, navegación, componentes, procesos, permisos, roles, grants, datos, tablas, RLS, RPC, migraciones, Supabase, Storage, packages, consumidores ni despliegues
**Requisitos de prueba creados o modificados:** 0

---

#### 1. Propósito

Diseñar el contrato de experiencia para una persona que actúa como **RECEPTOR** dentro del ciclo de compras ORIGO, de forma que pueda:

- identificar qué compras o entregas están realmente pendientes de recepción dentro de su alcance;
- distinguir una compra aprobada, una orden emitida y un compromiso formalizado de una recepción ya iniciada;
- reconocer proveedor, orden, sede, líneas, presentaciones, cantidades y condiciones necesarias para verificar lo recibido;
- registrar únicamente hechos observados sin reescribir lo pedido para forzar conformidad;
- diferenciar recepción esperada, llegada, verificación física, verificación documental, diferencia, aceptación y efectos posteriores;
- iniciar una recepción solo cuando exista autoridad operativa, contexto vigente y recurso elegible;
- operar de forma segura en dispositivo compartido conservando actor humano efectivo;
- mantener separadas aceptación comercial/documental, ingreso físico a inventario y efecto económico;
- entregar el trabajo a las experiencias posteriores de recepción total, parcial y diferencias sin inventar estados ni permisos.

La tarea diseña la experiencia objetivo del receptor sobre:

```text
VSCREEN-0076 — Cola de recepciones
VSCREEN-0077 — Recepción total o parcial, como destino de ejecución
VPROC-0022    — Recibir compras, verificar conformidad y resolver diferencias
```

No implementa esas superficies ni modifica autorización física.

---

#### 2. Entrada aprobada de ORIGO-UX-005

`ORIGO-UX-005` entrega una frontera cerrada:

```text
APROBACION != RECEPCION
APPROVED != ORDER_ISSUED
ORDER_ISSUED != PURCHASE_COMMITMENT_FORMALIZED
RECEPTOR NO HEREDA AUTORIDAD DE APROBADOR
RECEPCION COMIENZA SOBRE COMPRA/ENTREGA ELEGIBLE Y CORRELACIONADA
VERSION Y EVIDENCIA DE COMPRA SE CONSERVAN
```

La tarea actual consume ese handoff sin reabrir sourcing, aprobación, rechazo de compra ni emisión de orden.

---

#### 3. Naturaleza y topología

La topología vigente de `ORIGO-UX-001..016` establece:

```text
mode = DEFINE_ONCE
execution_gate = NO_PHYSICAL_INSTANCE
```

Consecuencias:

1. `ORIGO-UX-006` se define una sola vez;
2. no existe una instancia física propia de esta tarea;
3. no se crea una pantalla o componente en `vento-origo`;
4. no se implementa permission check, Server Action, RPC, RLS ni migración;
5. las decisiones de esta tarea serán consumidas por materializaciones posteriores;
6. las brechas AS-IS se documentan con propietario y condición de salida, no se corrigen aquí.

---

#### 4. Fuentes verificadas

El diseño consume y conserva:

- `ORIGO-UX-001 — Inventariar el proceso completo de abastecimiento`;
- `ORIGO-UX-002 — Separar solicitud, compra, aprobación y recepción`;
- `ORIGO-UX-004 — Diseñar inicio para comprador`;
- `ORIGO-UX-005 — Diseñar inicio para aprobador` como base inmediata aprobada;
- `ORIGO-AUTH-004 — Definir permisos de consulta`;
- `ORIGO-AUTH-007 — Definir permisos de recepción`;
- `ORIGO-AUTH-008 — Definir permisos de corrección` para la frontera correctiva;
- `ORIGO-AUTH-009..013` para territorio, sensibilidad, actor, contexto y administración;
- `VPROC-0022` y sus nueve estados canónicos;
- las transiciones canónicas `VPROC-0022.TR-001..009`;
- `VSCREEN-0076`, `VSCREEN-0077` y `VSCREEN-0078`;
- matrices E2 de iniciadores, ejecutores, apoyos, supervisión y experiencia;
- frontera `GAP-OWN-004` entre ORIGO y NEXO;
- contratos de integración del handoff posterior hacia NEXO y NUMERA;
- Registro 04A vigente de ORIGO y AUTH;
- runtime observado de `/receipts` y `/receipts/new` en `vento-origo`;
- scripts y validadores documentales vigentes.

---

#### 5. Identidad funcional del receptor

La función receptora de `VPROC-0022` nace desde:

```text
RECEPCION_EN_SEDE
```

Como ejecución principal también participa:

```text
BODEGA_Y_ABASTECIMIENTO
```

Apoyos funcionales posibles:

```text
RESPONSABLE_DE_COMPRAS
RESPONSABLE_DE_CALIDAD_E_INOCUIDAD
AREA_SOLICITANTE
RESPONSABLE_FINANCIERO
```

Supervisión funcional:

```text
GERENCIA_O_SUPERVISION_DE_SEDE
```

Regla:

```text
FUNCION DE PROCESO
!=
PERMISO TECNICO
!=
ROL OPERATIVO EFECTIVO
```

La UX consume las tres capas sin tratarlas como equivalentes.

---

#### 6. Iniciación de VPROC-0022

El proceso puede ser iniciado por una llegada física o documental asociable a una compra:

```text
RECEPCION_EN_SEDE
+
PROVEEDOR / EVENTO_EXTERNO_DE_ENTREGA
+
COMPRA O EXCEPCION VALIDA
```

La condición empresarial es:

```text
EXISTE ENTREGA IDENTIFICABLE
AND
EXISTE COMPROMISO O CAUSA CONTROLADA
AND
EXISTE PUNTO AUTORIZADO DE RECEPCION
```

El proveedor puede originar la llegada, pero no decide por sí mismo que la recepción quedó aceptada.

---

#### 7. Pantalla canónica de inicio

El inicio del receptor tiene identidad canónica propia:

```text
VSCREEN-0076
Cola de recepciones
VPROC-0022
OWNER_WORKSPACE
```

Propósito aprobado:

```text
PRESENTAR ORDENES Y ENTREGAS PENDIENTES DE RECEPCION
POR SEDE Y RESPONSABILIDAD
```

Por tanto, esta tarea no crea una nueva identidad `VSCREEN-*`.

---

#### 8. Pregunta operativa del inicio

La experiencia del receptor responde primero:

```text
¿QUE COMPRA O ENTREGA PUEDO RECIBIR AHORA,
EN QUE SEDE,
Y QUE DEBO VERIFICAR ANTES DE REGISTRAR LO OBSERVADO?
```

La composición queda:

```text
CONTEXTO DE RECEPCION
+
COLA DE TRABAJO ELEGIBLE
+
ORDEN / COMPROMISO RELACIONADO
+
PROVEEDOR Y DOCUMENTOS
+
LINEAS / PRESENTACIONES / CANTIDADES
+
CONDICIONES A VERIFICAR
+
ESTADO DE RECEPCION
+
AUTORIDAD Y CONTEXTO OPERATIVO
=
INICIO DEL RECEPTOR
```

---

#### 9. Cola de trabajo y no historial genérico

`VSCREEN-0076` organiza trabajo pendiente de recepción.

No debe reducirse a:

```text
HISTORIAL DE ENTRADAS YA CREADAS
```

La cola canónica prioriza compras, entregas o instancias de recepción que requieren una acción receptora y que pertenecen al alcance autorizado.

Regla:

```text
COLA DE RECEPCION PENDIENTE
!=
LISTA DE MOVIMIENTOS HISTORICOS
```

---

#### 10. Entrada mínima conservada

`VPROC-0022` conserva como entradas mínimas:

```text
purchase_commitment_ref
supplier_document_refs
received_lines
received_at
receiving_site_ref
receiver_actor_ref
physical_condition
```

La cola no necesita materializar todos esos valores antes de la llegada, pero debe conducir a una captura en la que puedan resolverse sin perder la referencia del compromiso.

---

#### 11. Identidades que no se fusionan

La experiencia conserva separadas:

```text
purchase_need_ref
sourcing_case_ref
sourcing_decision_ref
purchase_commitment_ref
receipt/process_instance_ref
inventory_effect_ref
financial_effect_ref
```

Invariante:

```text
CORRELACIONAR
!=
FUSIONAR
```

La recepción puede referenciar la compra y sus efectos posteriores sin apropiarse de sus identidades.

---

#### 12. Lifecycle completo de VPROC-0022

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

La UX del receptor debe distinguirlos sin colapsarlos en `received`, `recorded` o equivalentes técnicos.

---

#### 13. Inicio y primera llegada

La cola puede presentar trabajo desde:

```text
RECEIPT_EXPECTED
```

La primera progresión canónica es:

```text
VPROC-0022.TR-001
RECEIPT_EXPECTED
→ ARRIVAL_REGISTERED
```

La existencia de una orden elegible no significa que la mercancía ya llegó.

Regla:

```text
RECEPCION ESPERADA
!=
LLEGADA REGISTRADA
```

---

#### 14. Verificación física y documental

Después de la llegada, el proceso distingue:

```text
ARRIVAL_REGISTERED
→ PHYSICAL_CHECK_IN_PROGRESS
→ DOCUMENT_CHECK_IN_PROGRESS
```

La UX debe permitir comprender que verificar físicamente no demuestra por sí solo conformidad documental y que verificar documentos no implica todavía aceptación final.

---

#### 15. Diferencia y aceptación pendiente

Desde la verificación documental pueden existir dos recorridos gobernados:

```text
DOCUMENT_CHECK_IN_PROGRESS
→ DIFFERENCE_UNDER_REVIEW
→ ACCEPTANCE_PENDING
```

O, cuando el contrato permite omitir justificadamente la rama de diferencia:

```text
DOCUMENT_CHECK_IN_PROGRESS
→ ACCEPTANCE_PENDING
```

La experiencia no inventa un atajo visual que convierta verificación en aceptación.

---

#### 16. Aceptación y efectos posteriores

La transición de aceptación protegida conduce:

```text
ACCEPTANCE_PENDING
→ PUTAWAY_PENDING
```

Luego el proceso conserva:

```text
PUTAWAY_PENDING
→ ECONOMIC_RECONCILIATION_PENDING
→ RECEIPT_RECONCILED
```

El inicio del receptor debe mostrar el estado y el siguiente trabajo autorizado sin atribuir al receptor todas las decisiones posteriores.

---

#### 17. Consulta canónica de la cola

La capacidad de consulta relevante es:

```text
origo.procurement.receipts.view
```

Contrato:

```text
resource = PURCHASE_RECEIPT
scope = RECEIPT_DESTINATION
mode = BASE_OR_OPERATIONAL
```

Puede mostrar, dentro de la proyección autorizada:

- identidad de recepción cuando exista;
- referencia de orden o compromiso cuando corresponda;
- sede y destino receptor autorizados;
- proveedor relacionado;
- cantidades y productos necesarios;
- diferencias visibles;
- estado;
- presentaciones;
- actor receptor como relación;
- historial permitido.

---

#### 18. Contexto de compra dentro de una pantalla compuesta

Una fila o detalle de la cola puede necesitar información de la orden o compromiso previo.

La lectura de ese contexto conserva la autoridad del recurso fuente:

```text
SECCION DE ORDEN
→ origo.procurement.purchase_orders.view

SECCION DE RECEPCION
→ origo.procurement.receipts.view
```

Regla:

```text
PANTALLA COMPUESTA
!=
PERMISO COMPUESTO UNIVERSAL
```

La proyección mínima embebida no concede abrir o mutar recursos fuera del alcance autorizado.

---

#### 19. Autoridad para registrar una recepción

La capacidad mutante exacta es:

```text
origo.procurement.receipts.register
```

Contrato:

```text
authorization_requirement = OPERATIONAL_ONLY
is_read_only = false
resource = PURCHASE_RECEIPT
```

Para un objetivo aún no persistido se resuelve sobre:

```text
RECEIPT_DESTINATION_DRAFT
```

---

#### 20. Ver no equivale a registrar

Regla central:

```text
origo.procurement.receipts.view
!=
origo.procurement.receipts.register
```

Y en experiencia:

```text
TRIAGE / VIEW
!=
EXECUTE / REGISTER
```

`VSCREEN-0076` puede mostrar trabajo susceptible de recepción, pero seleccionar una fila no concede la mutación.

La acción debe volver a autorizarse en servidor antes de registrar.

---

#### 21. Contexto operativo obligatorio para registrar

`receipts.register` es `OPERATIONAL_ONLY`.

Prerrequisito:

```text
T+C
```

Significado:

```text
TURNO PUBLICADO Y VIGENTE
+
CHECK-IN ACTIVO
```

Además deben resolverse:

```text
ACTOR EFECTIVO
ROL OPERATIVO AUTORIZADO
SEDE
AREA CUANDO APLIQUE
RECURSO
ESTADO ELEGIBLE
RELACION CON ORDEN / PROVEEDOR
```

Sin esos elementos, la mutación falla cerrada.

---

#### 22. Consulta base no hereda artificialmente T+C

`receipts.view` es `BASE_OR_OPERATIONAL`.

Por tanto, un actor con carril base completo puede consultar dentro de su cobertura sin que la UX fabrique un requisito de check-in que el contrato base no exige.

En cambio, cuando la consulta se resuelve por carril operativo:

```text
T+C
```

sí aplica.

Regla:

```text
CONSULTA BASE VALIDA
!=
AUTORIDAD PARA REGISTRAR
```

---

#### 23. Roles operativos que pueden registrar

La capacidad objetivo `receipts.register` se asigna operativamente a:

```text
bodeguero
gerencia_operativa
```

Siempre bajo:

```text
T+C
+
TERRITORIO COMPATIBLE
+
RECURSO ELEGIBLE
+
ACTOR EFECTIVO
```

El nombre del oficio por sí solo no concede la capacidad.

---

#### 24. Participar en el proceso no equivale a registrar

Las matrices de proceso permiten que otros roles o funciones participen en evidencia, necesidad, inspección o apoyo.

Eso no les concede `receipts.register`.

Sin asignación exacta permanecen sin mutación por defecto, entre otros:

```text
cajero_satelite
barista_satelite
cocinero_satelite
servicio_salon
mostrador_satelite
operador_integral_satelite
produccion_cocina
produccion_panaderia
produccion_reposteria
conductor_logistica
```

La UX no infiere permiso desde participación funcional.

---

#### 25. Roles base y recepción operativa

Un rol base como:

```text
propietario
gerente_general
gerente
supervisor
auxiliar_administrativa
contador
```

puede tener capacidades de consulta según su contrato, pero no recibe `receipts.register` únicamente por jerarquía.

Para registrar debe existir un carril operativo autorizado completo.

---

#### 26. Territorio de recepción

La recepción queda ligada a una sede exacta y, cuando aplique, a un área compatible.

La decisión debe resolver:

```text
SEDE AUTORIZADA
+
AREA COMPATIBLE
+
RECURSO COMPATIBLE
+
CONTEXTO OPERATIVO COINCIDENTE
```

Un selector visual, query param o `site_id` enviado por cliente puede filtrar o proponer contexto, pero no crea autoridad.

---

#### 27. Contenido mínimo de una fila de la cola

Cada elemento de `VSCREEN-0076` debe poder presentar, según autorización y minimización:

- referencia de compra o compromiso;
- proveedor relacionado;
- sede receptora;
- fecha esperada o señal temporal disponible;
- estado actual de recepción;
- líneas o resumen de líneas esperadas;
- cantidades esperadas y, cuando corresponda, pendientes;
- presentación o unidad necesaria para verificar;
- documentos o referencias requeridas para recepción;
- señales de recepción parcial previa;
- señales de diferencia abierta;
- modalidad o condición operativa relevante cuando ya esté determinada;
- bloqueo o razón que impida registrar;
- responsabilidad o contexto aplicable.

No se muestra por defecto información comercial o financiera que el receptor no necesita para verificar.

---

#### 28. Acción primaria según estado y autoridad

La experiencia no presenta siempre la misma acción.

Ejemplos conceptuales:

```text
RECEIPT_EXPECTED + ENTREGA NO LLEGADA
→ CONSULTAR / ESPERAR

ENTREGA IDENTIFICADA + AUTORIDAD OPERATIVA VALIDA
→ INICIAR / CONTINUAR RECEPCION

DIFERENCIA ABIERTA
→ CONTINUAR HACIA TRATAMIENTO GOBERNADO

SIN AUTORIDAD DE REGISTRO
→ SOLO CONSULTA AUTORIZADA
```

La UI no transforma un botón visible en capacidad efectiva.

---

#### 29. Derivación hacia VSCREEN-0077

`VSCREEN-0077 — Recepción total o parcial` es la superficie canónica de ejecución.

Binding:

```text
VPROC-0022
VPROC-0022::STEP-RECEIVE_PURCHASE
EXECUTE / IN_PROGRESS
```

Desde `VSCREEN-0076` la derivación debe conservar al menos:

- identidad o referencia del compromiso;
- sede receptora;
- proveedor;
- contexto de líneas esperadas;
- estado vigente;
- actor y contexto a reevaluar;
- cualquier diferencia o recepción parcial previa relevante.

Abrir `VSCREEN-0077` no sustituye el recheck de autoridad.

---

#### 30. El receptor registra lo observado

Regla de integridad:

```text
PEDIDO ORIGINAL
!=
HECHO RECIBIDO
```

El receptor registra:

- qué llegó;
- cuánto llegó;
- en qué presentación;
- cuándo llegó;
- dónde llegó;
- en qué condición llegó;
- qué documentos acompañaron la entrega;
- quién efectuó la recepción.

No modifica silenciosamente la orden original para que coincida con la entrega.

---

#### 31. Recepción normal contra orden

Cuando existe orden o compromiso de compra, el inicio debe comprobar que el trabajo se relaciona con una fuente elegible.

Condiciones relevantes para continuar:

- orden/compromiso identificable;
- proveedor coherente;
- sede receptora compatible;
- líneas recibibles;
- estado empresarial compatible;
- actor receptor atribuible;
- ausencia de conflicto evidente de replay o cierre previo.

La experiencia no eleva los estados técnicos AS-IS a criterio contractual suficiente.

---

#### 32. Recepción directa o de emergencia

La ausencia de una orden ordinaria no crea autorización automática.

Una recepción directa o de emergencia exige, cuando el contrato la permite:

```text
receipts.register VALIDO
+
T+C
+
SEDE / AREA AUTORIZADAS
+
ACTOR EFECTIVO
+
PROVEEDOR Y LINEAS VALIDOS
+
CAUSA OBLIGATORIA
+
EVIDENCIA Y AUDITORIA
```

La cola puede identificar el carril como excepcional, pero no inventa umbrales, permisos ni bypass.

---

#### 33. Modalidad `inventory` y `record_only`

El runtime observado distingue:

```text
inventory
record_only
```

La experiencia objetivo conserva la diferencia material:

```text
REGISTRAR HECHO SIN MOVIMIENTO DE INVENTARIO
!=
RECEPCION QUE PRETENDE PRODUCIR EFECTO FISICO
```

Ambas modalidades siguen siendo hechos protegidos de recepción y requieren la autoridad de registro aplicable.

`record_only` no significa operación libre de autorización.

---

#### 34. Dispositivo compartido y actor humano

Regla:

```text
DISPOSITIVO AUTORIZADO
!=
ACTOR AUTORIZADO
```

Antes de una mutación la ejecución futura debe resolver:

```text
principal
actor humano efectivo
rol operativo efectivo
turno
check-in
sede
area
permiso exacto
recurso
```

La firma o PIN puede aportar atribución, pero no sustituye el permiso ni el contexto.

---

#### 35. Estados de experiencia del inicio

La cola debe distinguir al menos estas condiciones de experiencia sin convertirlas en nuevos estados de `VPROC-0022`:

| Estado UX | Significado | Tratamiento |
| --- | --- | --- |
| `LISTO_PARA_RECEPCION` | existe trabajo elegible dentro del alcance | mostrar contexto y permitir continuar si la mutación también autoriza |
| `SIN_PENDIENTES` | no existe trabajo visible dentro del alcance | estado vacío real |
| `SOLO_CONSULTA` | el actor puede ver, pero no registrar | no serializar capacidad mutante como disponible |
| `CONTEXTO_OPERATIVO_REQUERIDO` | falta turno, check-in o rol operativo para registrar | bloquear mutación sin ocultar necesariamente la consulta base válida |
| `FUERA_DE_TERRITORIO` | sede/área/recurso no pertenecen al alcance efectivo | fail-closed |
| `DIFERENCIA_ABIERTA` | existe discrepancia que requiere tratamiento gobernado | dirigir al flujo propietario sin resolverla desde la cola |
| `DESACTUALIZADO` | cambió estado, recepción previa o fuente mientras estaba abierta | recargar y reevaluar |
| `FALLO_TECNICO` | una fuente necesaria falló | no representarlo como cola vacía ni deny empresarial |

---

#### 36. Vacío, denegación y fallo no se confunden

Reglas:

```text
SIN_PENDIENTES
!=
SIN_AUTORIDAD

SIN_AUTORIDAD
!=
CONTEXTO_OPERATIVO_INCOMPLETO

DESACTUALIZADO
!=
FALLO_TECNICO

FALLO_TECNICO
!=
CERO RECEPCIONES
```

La UX debe conservar razón suficiente para orientar al usuario sin revelar datos protegidos.

---

#### 37. Frescura y concurrencia de la cola

La cola es una proyección de trabajo cambiante.

Antes de continuar una recepción, la ejecución futura debe reevaluar:

- estado vigente;
- cantidades pendientes;
- recepción parcial previa;
- cierre o reversión posterior;
- sede y contexto;
- actor;
- permiso;
- elegibilidad del recurso.

Una fila abierta anteriormente no constituye un lock ni una autorización permanente.

---

#### 38. Diferencias no se resuelven desde el inicio

La cola puede señalar que existe una diferencia.

Pero:

```text
DETECTAR DIFERENCIA
!=
RESOLVER DIFERENCIA
```

`VSCREEN-0078` y las tareas posteriores conservan la resolución gobernada.

`ORIGO-UX-011` es propietaria del diseño de diferencias contra orden.

No se crea una capacidad de resolución desde `ORIGO-UX-006`.

---

#### 39. Corrección y reversión quedan fuera del inicio

Registrar una recepción nueva no concede:

```text
CORREGIR RECEPCION
REVERSAR RECEPCION
```

La identidad canónica conocida para reversión es:

```text
origo.procurement.receipts.reverse
```

Las fronteras correctivas pertenecen a `ORIGO-AUTH-008` y a las experiencias posteriores correspondientes.

La cola puede mostrar evidencia o estado de una corrección cuando sea necesario, pero no convierte `receipts.register` en permiso correctivo.

---

#### 40. Minimización de datos

El receptor recibe suficiente información para verificar la entrega.

Puede necesitar:

- proveedor;
- referencia de orden/compromiso;
- producto;
- presentación;
- cantidades;
- fecha esperada;
- documentos requeridos;
- condición o especificación aplicable;
- sede y destino receptor;
- referencia de una recepción parcial previa.

No hereda por defecto:

- cuentas bancarias del proveedor;
- negociación completa;
- contratos no necesarios;
- márgenes;
- precios internos no requeridos para la verificación;
- notas comerciales ajenas a la recepción.

`ORIGO-UX-012` conserva la protección de precios en experiencia.

---

#### 41. Frontera ORIGO ↔ NEXO

Se preserva `GAP-OWN-004`:

```text
VPROC-0022
ORIGO
ACEPTACION COMERCIAL Y DOCUMENTAL
        ↓
VPROC-0024
NEXO
ENTRADA, UBICACION Y CUSTODIA FISICA
```

Regla:

```text
RECEPCION ORIGO
!=
MOVIMIENTO DE INVENTARIO NEXO
```

El estado `VPROC-0022.PUTAWAY_PENDING` habilita un handoff empresarial; no convierte a ORIGO en propietaria del ledger físico.

El hecho normal de integración ya definido para ese handoff es:

```text
VPROC-0022.EVT-004
vento.process.vproc-0022.putaway-pending.v1
```

`ORIGO-UX-013` y `ORIGO-UX-014` conservan la experiencia e integración posteriores.

---

#### 42. Frontera ORIGO ↔ NUMERA

La recepción tampoco se convierte en hecho económico final por aparecer en la cola o por registrar la llegada.

La secuencia conserva:

```text
ORIGO / VPROC-0022
RECEPCION Y ACEPTACION
        ↓
ECONOMIC_RECONCILIATION_PENDING
        ↓
NUMERA
HECHO ECONOMICO CORRELACIONADO
```

El hecho de integración definido para la conciliación económica es:

```text
VPROC-0022.EVT-005
vento.process.vproc-0022.economic-reconciliation-pending.v1
```

`ORIGO-UX-015` conserva la conexión con el evento financiero.

---

#### 43. Cierre normal de recepción

El proceso culmina en:

```text
RECEIPT_RECONCILED
```

Y conserva el evento normal:

```text
VPROC-0022.EVT-006
receipt-reconciled
```

Este cierre no equivale a:

```text
PAGO DEL PROVEEDOR
```

ni elimina devoluciones, reclamaciones o diferencias que deban conservarse como evidencia.

---

#### 44. Contraste AS-IS de `/receipts`

La superficie observada `/receipts` consulta actualmente entradas ya materializadas y filtra, entre otros elementos, por:

```text
source_app = "origo"
site_id = sede seleccionada
```

Presenta historial y acciones sobre entradas con literales como:

```text
received
reversed
corrected
recorded
draft
cancelled
```

Eso demuestra una superficie real de recepción, pero no una cola canónica completa de compras o entregas pendientes.

Clasificación:

```text
VSCREEN-0076 = AS_IS_PARTIAL
```

---

#### 45. Contraste AS-IS de `/receipts/new`

La superficie observada permite registrar, entre otros casos:

- recepción ligada a orden;
- recepción directa o de emergencia;
- `inventory`;
- `record_only`;
- corrección sobre una entrada previa;
- actor firmado en dispositivo compartido cuando aplica;
- proveedor, factura, fecha, sede, productos, cantidades, presentaciones, lotes, vencimientos y costos.

Esto demuestra materialidad real, pero también una mezcla parcial de responsabilidades que el contrato objetivo separa.

La 006 no eleva `/receipts/new` a definición completa del inicio del receptor.

---

#### 46. Estados técnicos AS-IS no son lifecycle objetivo

Se prohíben equivalencias como:

```text
received = RECEIPT_RECONCILED
recorded = PUTAWAY_PENDING
pending_review = DIFFERENCE_UNDER_REVIEW
```

sin contrato explícito que lo demuestre.

Los literales de implementación son evidencia parcial; `VPROC-0022` conserva la semántica empresarial canónica.

---

#### 47. Hallazgos y propietarios

| Hallazgo | Impacto | Propietario | Condición de salida |
| --- | --- | --- | --- |
| `/receipts` se comporta principalmente como historial de entradas ya creadas | el receptor puede no disponer de una cola real de entregas esperadas | materialización UX propietaria consumiendo `ORIGO-UX-006` | `VSCREEN-0076` muestra trabajo pendiente por sede/responsabilidad con estados y bloqueos diferenciados |
| `origo.procurement.receipts` legacy agrupa lectura y mutación en runtime | la experiencia puede confundir ver con registrar | `ORIGO-AUTH-004`, `ORIGO-AUTH-007`, `ORIGO-AUTH-014` | consumidores usan `.view` y `.register` exactos según acción |
| `/receipts/new` mezcla captura, corrección y efectos físicos/económicos | autoridad y ownership pueden colapsarse | `ORIGO-AUTH-008`, `ORIGO-UX-009..015` + materializaciones propietarias | registrar, corregir, aceptar, mover inventario y conciliar usan contratos separados |
| estados técnicos AS-IS no representan los nueve estados de `VPROC-0022` | el receptor puede interpretar una entrada como recepción empresarial cerrada | `ORIGO-UX-006`, `ORIGO-UX-009..011` + implementación propietaria | UI presenta lifecycle canónico o una proyección contractual inequívoca |
| selected site puede confundirse con autoridad | filtro cliente podría aparentar territorio | materialización AUTH/consumer | servidor resuelve actor, permiso, cobertura y recurso antes de consultar o mutar |
| dispositivo compartido puede aparentar actor implícito | recepción atribuida al dispositivo y no al humano | `ORIGO-AUTH-011`, `ORIGO-AUTH-012` + consumidor | cada mutación conserva actor efectivo, T+C, sede, área y permiso exacto |

No queda un hallazgo narrativo sin propietario y condición de salida.

---

#### 48. Handoff inmediato a ORIGO-UX-007

`ORIGO-UX-007 — Diseñar creación de orden de compra` recibe restricciones de salida necesarias para que una orden futura pueda alimentar correctamente la recepción:

```text
ORDEN / COMPROMISO CONSERVA IDENTIDAD ESTABLE
PROVEEDOR QUEDA CORRELACIONABLE
DESTINO / SEDE RECEPTORA QUEDA IDENTIFICABLE
LINEAS, PRESENTACIONES Y CANTIDADES QUEDAN IDENTIFICABLES
VERSION Y CONDICIONES NECESARIAS PARA RECEPCION SE CONSERVAN
CREAR ORDEN != REGISTRAR RECEPCION
```

La 007 no hereda autoridad receptora; únicamente debe producir una fuente suficientemente trazable para el ciclo posterior.

---

#### 49. Handoff al resto de ORIGO-UX

| Tarea | Entrada exacta proveniente de ORIGO-UX-006 |
| --- | --- |
| `ORIGO-UX-007` | creación de orden debe producir compromiso, líneas, destinos y versión correlacionables sin registrar recepción |
| `ORIGO-UX-008` | aprobación/rechazo conserva separación estricta respecto del receptor y no marca mercancía recibida |
| `ORIGO-UX-009` | recepción total parte de una fila elegible de la cola y revalida `receipts.register`, T+C, territorio y recurso |
| `ORIGO-UX-010` | recepción parcial conserva la misma fuente de compra y el saldo pendiente sin cerrar indebidamente la cola |
| `ORIGO-UX-011` | diferencia consume lo observado frente a lo pedido sin reescribir la orden original |
| `ORIGO-UX-012` | proyección del receptor minimiza precios y datos sensibles por finalidad |
| `ORIGO-UX-013` | la recepción ORIGO no se repite manualmente como una segunda recepción NEXO |
| `ORIGO-UX-014` | solo el alcance aceptado y elegible produce handoff físico correlacionado hacia NEXO |
| `ORIGO-UX-015` | la recepción y su conciliación producen referencia económica sin convertir al receptor en actor financiero |
| `ORIGO-UX-016` | prototipo demuestra orden → cola → recepción → diferencia/handoff sin fusionar identidades ni autoridades |

---

#### 50. Requisitos de prueba derivados

**Resultado:** NO GENERA REQUISITOS DE PRUEBA.

**Requisitos creados:** 0
**Requisitos modificados:** 0
**Requisitos diferidos:** 0
**Requisitos obsoletos:** 0

Justificación: separación de funciones, autorización exacta, contexto operativo, recepción con o sin inventario, idempotencia, protección de recurso y evidencia ya cuentan con obligaciones verificables registradas. Esta tarea especializa la experiencia inicial del receptor sin introducir una obligación observable nueva ni modificar el registro.

---

#### 51. Cobertura de prueba vigente reutilizada

Se reutiliza sin modificación:

- `TREQ-ORIGO-001` para declarar y auditar la modalidad de recepción y evitar duplicidad de cantidades, costos, orden o efecto financiero;
- `TREQ-ORIGO-003` para atomicidad, idempotencia, concurrencia y reconciliación de una recepción empresarial;
- `TREQ-ORIGO-004` para conservar identidades separadas de solicitud, sourcing, aprobación, orden y recepción y separar las capacidades de solicitante, comprador, aprobador y receptor;
- `TREQ-AUTH-001` para exigir autorización por permiso, contexto y alcance canónicos;
- `TREQ-AUTH-008` para distinguir capacidades base de operación que exige turno/check-in;
- `TREQ-AUTH-010` para preservar segregación y evitar que compras o recepción absorban capacidades incompatibles;
- `TREQ-AUTH-013` para impedir bypass por interfaz, URL, API o RPC y revalidar cada mutación en servidor;
- `TREQ-AUTH-014` para invalidar decisiones operativas obsoletas ante cambios de turno, check-in, actor, sede, área o asignación;
- `TREQ-AUTH-015` para conservar evidencia correlacionable de actor, permiso, recurso, decisión y timestamp.

Esta enumeración es trazabilidad reutilizada y no constituye modificación del Registro 04A.

---

#### 52. Evidencia de validación

| Clase | Estado | Evidencia |
| --- | --- | --- |
| BUILD | NOT_EXECUTED | `docs:plan:build` corresponde al checkout local después de incorporar el artefacto. |
| LOCAL | NOT_EXECUTED | Formato, quality, delivery, topología, EOL, TREQ y batería global quedan pendientes del checkout local. |
| REMOTA | PASS | Se verificaron las fuentes canónicas vigentes de `vento-shell`, topología `DEFINE_ONCE / NO_PHYSICAL_INSTANCE`, `VPROC-0022`, sus nueve estados y transiciones, `VSCREEN-0076/0077/0078`, actores de proceso, permisos `origo.procurement.receipts.view` y `origo.procurement.receipts.register`, modalidad y contexto operativo, 04A ORIGO/AUTH, fronteras ORIGO–NEXO–NUMERA y runtime AS-IS de recepción. La entrada inmediata `ORIGO-UX-005` se consume desde su artefacto completo aprobado en esta conversación. |
| OPERATIVA | NOT_EXECUTED | No se ejecutaron recepciones, verificaciones físicas/documentales, diferencias, handoffs de inventario, conciliaciones económicas ni pruebas con usuarios. |
| FÍSICA | NOT_APPLICABLE | `ORIGO-UX-006` no crea instancia física propia ni autoriza cambios de producto, datos o infraestructura. |

---

#### 53. Criterios de aceptación

La tarea queda documentalmente completa cuando:

- [ ] `VSCREEN-0076` queda definida como inicio canónico del RECEPTOR;
- [ ] no se crea una nueva identidad `VSCREEN-*`;
- [ ] `VPROC-0022` queda identificado como proceso propietario de recepción ORIGO;
- [ ] `RECEPCION_EN_SEDE` queda identificada como función iniciadora/principal;
- [ ] `BODEGA_Y_ABASTECIMIENTO` queda reconocida como ejecución principal aplicable;
- [ ] apoyo y supervisión funcional no se confunden con grants técnicos;
- [ ] la cola representa trabajo pendiente y no solo historial ya materializado;
- [ ] los nueve estados de `VPROC-0022` quedan diferenciados;
- [ ] `RECEIPT_EXPECTED` no se confunde con llegada registrada;
- [ ] verificación física y documental permanecen separadas;
- [ ] diferencia no equivale a aceptación;
- [ ] `ACCEPTANCE_PENDING` no equivale a `PUTAWAY_PENDING`;
- [ ] `PUTAWAY_PENDING` de ORIGO no se confunde con el lifecycle físico de NEXO;
- [ ] `RECEIPT_RECONCILED` no equivale a pago del proveedor;
- [ ] `origo.procurement.receipts.view` queda como autoridad de consulta correspondiente;
- [ ] la pantalla compuesta conserva permisos por recurso y no crea un permiso universal;
- [ ] `origo.procurement.receipts.register` queda como autoridad exacta para registrar una recepción nueva;
- [ ] `receipts.view` no equivale a `receipts.register`;
- [ ] `receipts.register` permanece `OPERATIONAL_ONLY`;
- [ ] `T+C` queda obligatorio para registrar;
- [ ] consulta por carril base no adquiere check-in artificial;
- [ ] `bodeguero` y `gerencia_operativa` quedan como roles operativos con asignación de registro bajo contexto válido;
- [ ] roles de apoyo no adquieren registro por participación funcional;
- [ ] roles base no registran por jerarquía únicamente;
- [ ] sede, área y recurso se revalidan en servidor;
- [ ] filtros de UI no conceden territorio;
- [ ] una fila seleccionada no conserva autorización indefinida;
- [ ] `VSCREEN-0077` queda como destino de ejecución y no como autoridad implícita;
- [ ] el receptor registra lo observado sin alterar silenciosamente la orden;
- [ ] compra normal y recepción directa/emergencia permanecen gobernadas;
- [ ] `inventory` y `record_only` conservan diferencia material y autorización;
- [ ] dispositivo compartido no se convierte en actor;
- [ ] vacío, solo consulta, contexto faltante, territorio, diferencia, stale y fallo técnico no se confunden;
- [ ] corrección y reversión quedan fuera de `receipts.register`;
- [ ] datos sensibles se minimizan por finalidad;
- [ ] ORIGO conserva aceptación comercial/documental;
- [ ] NEXO conserva entrada, ubicación y custodia física;
- [ ] NUMERA conserva el efecto económico posterior;
- [ ] `/receipts` queda clasificada como `AS_IS_PARTIAL` y no elevada al contrato objetivo;
- [ ] estados técnicos AS-IS no se elevan a estados canónicos;
- [ ] cada hallazgo tiene propietario y condición de salida;
- [ ] `ORIGO-UX-007` recibe un handoff limpio y no hereda autoridad receptora;
- [ ] no se crean ni modifican requisitos de prueba;
- [ ] no se ejecutan cambios físicos desde esta tarea.

---

#### 54. Límites

Esta tarea no:

- implementa `VSCREEN-0076`;
- implementa `VSCREEN-0077`;
- crea una identidad `VSCREEN-*` nueva;
- crea componentes, endpoints o Server Actions;
- crea permission keys nuevas;
- activa `receipts.view` o `receipts.register`;
- modifica grants o matrices;
- registra una recepción real;
- modifica una orden de compra real;
- aprueba o rechaza una compra;
- resuelve diferencias de recepción;
- corrige o reversa recepciones;
- mueve inventario;
- crea LOC, LPN o movimientos NEXO;
- registra hechos económicos NUMERA;
- cambia precios, costos o condiciones comerciales;
- modifica `vento-origo`;
- modifica Supabase, migraciones, RLS, RPC, grants o datos;
- ejecuta E5;
- crea instancia física;
- modifica el Registro 04A;
- desarrolla `ORIGO-UX-007`.

---

#### 55. Continuidad

**ÚLTIMA TAREA APROBADA**
`ORIGO-UX-005 — Diseñar inicio para aprobador`

**TAREA ACTUAL APROBADA**
`ORIGO-UX-006 — Diseñar inicio para receptor`

**SIGUIENTE TAREA RESERVADA**
`ORIGO-UX-007 — Diseñar creación de orden de compra`
### ✅ ORIGO-UX-007 — Diseñar creación de orden de compra

**Estado:** APROBADA
**Tarea anterior:** ORIGO-UX-006 — Diseñar inicio para receptor
**Tarea siguiente:** ORIGO-UX-008 — Diseñar aprobación y rechazo
**Tipo de tarea:** diseño documental integral de la creación y preparación versionada de una orden de compra sobre `VSCREEN-0073` y `VPROC-0021`, consumiendo una necesidad y decisión de sourcing válidas, separando creación, actualización preaprobación, aprobación, preparación postaprobación, emisión, recepción y efectos posteriores, y preservando autorización, territorio, sensibilidad, versión y trazabilidad sin materialización física; `DEFINE_ONCE` / `NO_PHYSICAL_INSTANCE`
**Bloque:** BLOQUE M — ORIGO
**Repositorio propietario:** `vento-group-sas/vento-shell`
**Archivo propietario:** `docs/plan-canonico/modular/bloques/M_ORIGO/02_EXPERIENCIA_DE_COMPRAS.md`
**Estado físico resultante:** `NO_PHYSICAL_INSTANCE`
**Cambios físicos autorizados:** ninguno; esta tarea no modifica código, rutas, navegación, componentes, permisos, roles, grants, procesos, estados, contratos generados, datos, tablas, RLS, RPC, migraciones, Supabase, Storage, packages, consumidores ni despliegues
**Requisitos de prueba creados o modificados:** 0

---

#### 1. Propósito

Diseñar el contrato de experiencia para **crear y preparar una orden de compra** en ORIGO de forma que el actor autorizado pueda transformar una decisión de abastecimiento válida en un objeto de compra trazable sin convertir la creación en aprobación, emisión, recepción, movimiento de inventario ni hecho económico.

La tarea debe garantizar que la experiencia:

- nazca desde una necesidad y sourcing válidos, no desde un formulario huérfano;
- preserve la identidad de origen, proveedor, condiciones y evidencia que justifican la compra;
- cree una orden no aprobada y no emitida;
- permita edición ordinaria únicamente mientras el estado y la autoridad la admitan;
- conserve versión y huella lógica suficiente para que el aprobador decida sobre contenido identificable;
- separe la autorización para crear de la autorización para actualizar, aprobar, emitir, recibir, cancelar o corregir;
- valide territorio, sede, centro de costo y relaciones en servidor;
- minimice precios, condiciones y datos sensibles según finalidad;
- preserve una transición segura hacia aprobación y, después, hacia la preparación de la versión autorizada;
- entregue una orden correlacionable con recepción posterior sin registrar recepción desde el editor.

La superficie canónica principal es:

```text
VSCREEN-0073 — Editor de orden de compra
VPROC-0021    — Aprobar y emitir compras separando flujo ordinario, urgencia y excepción
```

La tarea no implementa esa superficie ni modifica el runtime.

---

#### 2. Entrada aprobada de ORIGO-UX-006

`ORIGO-UX-006` entrega una frontera cerrada para cualquier orden que luego pueda ser recibida:

```text
ORDEN / COMPROMISO CONSERVA IDENTIDAD ESTABLE
PROVEEDOR QUEDA CORRELACIONABLE
DESTINO / SEDE RECEPTORA QUEDA IDENTIFICABLE
LINEAS, PRESENTACIONES Y CANTIDADES QUEDAN IDENTIFICABLES
VERSION Y CONDICIONES NECESARIAS PARA RECEPCION SE CONSERVAN
CREAR ORDEN != REGISTRAR RECEPCION
```

La creación de orden debe producir una fuente suficientemente trazable para `VPROC-0022`, pero no hereda autoridad receptora ni puede afirmar que algo fue recibido.

---

#### 3. Entradas previas del ciclo que siguen vigentes

La tarea consume además decisiones ya cerradas del minibloque:

```text
ORIGO-UX-002
SOLICITUD != COMPRA != APROBACION != RECEPCION

ORIGO-UX-004
SOURCING VALIDO / DECISION ACEPTADA
→ HANDOFF A VPROC-0021
→ VSCREEN-0073

ORIGO-UX-005
CREADOR / COMPRADOR != APROBADOR
APPROVED != ORDER_ISSUED
```

Por tanto:

```text
ABRIR EDITOR
!=
HABER COMPLETADO SOURCING

CREAR ORDEN
!=
APROBAR COMPRA

GENERAR DOCUMENTO
!=
EMITIR ORDEN
```

---

#### 4. Naturaleza y topología

La topología vigente de `ORIGO-UX-001..016` establece:

```text
mode = DEFINE_ONCE
execution_gate = NO_PHYSICAL_INSTANCE
```

Consecuencias:

1. `ORIGO-UX-007` se define una sola vez;
2. no existe una instancia física propia de esta tarea;
3. no se crea ni modifica `/purchase-orders/new`, `/purchase-orders/[id]/edit` ni otra ruta;
4. no se implementan Server Actions, RLS, RPC, migraciones, enums, tablas ni contratos de eventos;
5. las brechas AS-IS se documentan con propietario y condición de salida;
6. la materialización posterior deberá consumir este contrato sin reinterpretar creación como aprobación o emisión.

---

#### 5. Fuentes verificadas

El diseño consume y conserva:

- `ORIGO-UX-001 — Inventariar el proceso completo de abastecimiento`;
- `ORIGO-UX-002 — Separar solicitud, compra, aprobación y recepción`;
- `ORIGO-UX-004 — Diseñar inicio para comprador`;
- `ORIGO-UX-005 — Diseñar inicio para aprobador`;
- `ORIGO-UX-006 — Diseñar inicio para receptor` como base inmediata aprobada;
- `ORIGO-AUTH-004 — Definir permisos de consulta`;
- `ORIGO-AUTH-005 — Definir permisos de creación`;
- `ORIGO-AUTH-006 — Definir permisos de aprobación`;
- `ORIGO-AUTH-008 — Definir permisos de corrección`;
- `ORIGO-AUTH-009 — Limitar órdenes por sede o centro de costo`;
- `ORIGO-AUTH-010 — Proteger precios y datos sensibles`;
- `ORIGO-AUTH-013 — Mantener administración sin check-in`;
- `VPROC-0021` y sus ocho estados canónicos;
- `VPROC-0021.TR-001..007`;
- `VSCREEN-0073`, `VSCREEN-0074`, `VSCREEN-0075` y `VSCREEN-0145`;
- matrices de actores, autorización, territorio y segregación;
- Registro 04A vigente de ORIGO y AUTH;
- runtime AS-IS de creación, edición, detalle y envío de órdenes en `vento-origo`;
- `vento-shell/main@9d0106192de83699af0cddc0dcd1431072ac1876` y owner blob `f1d87caf21d5ea56bcea224c2c7af8c30dd968ae` observados durante esta preparación;
- artefacto aprobado `ORIGO-UX-006_APROBADA_PARA_REEMPLAZAR.md` con SHA-256 `083e1104d5ff0d5951b01cc4b7f75e9e185a4330757c0887d8835a1de2a7f323` y SHA semántico `c81931dc78f88aadc13339515e3e893847cf5f0faf54bd0d050c30d457a1df53`.

La base 006 puede seguir pendiente de publicación durante esta preparación anticipada; eso no autoriza incorporar la 007 antes de su cierre.

---

#### 6. Identidad canónica de la superficie

La creación de orden utiliza la identidad existente:

```text
VSCREEN-0073
Editor de orden de compra
origo
VPROC-0021
OWNER_WORKSPACE
```

Propósito canónico:

```text
PREPARAR Y VERSIONAR UNA ORDEN DE COMPRA
CON LINEAS, PRECIOS, IMPUESTOS, SEDE Y CENTRO DE COSTO
```

La tarea no crea una nueva pantalla `VSCREEN-*`.

---

#### 7. Paso canónico del proceso

La superficie se vincula a:

```text
VPROC-0021::STEP-PREPARE_PURCHASE_ORDER
```

La preparación de la orden pertenece al proceso de compra, no al proceso de sourcing ni al proceso de recepción.

Regla:

```text
VPROC-0020 COMPLETADO
+
ENTRADA VALIDA A VPROC-0021
→
VSCREEN-0073
```

No:

```text
VSCREEN-0073
→
CREA RETROACTIVAMENTE NECESIDAD Y SOURCING
```

---

#### 8. Condición de entrada al editor

Para una creación ordinaria debe existir, como mínimo:

```text
NECESIDAD / SOLICITUD TRAZABLE
+
DECISION DE SOURCING VALIDA O EXCEPCION GOBERNADA
+
PROVEEDOR ADMISIBLE
+
ACTOR CON AUTORIDAD DE CREACION
+
TERRITORIO / COBERTURA VALIDOS
+
DATOS MINIMOS DE LA COMPRA
```

Una compra urgente o excepcional puede seguir un carril expedito, pero no elimina necesidad de causa, autoridad, proveedor, líneas, recepción posterior y regularización aplicable.

---

#### 9. Permiso exacto de creación

La autoridad objetivo es:

```text
origo.procurement.purchase_orders.create
```

Identidad contractual:

```text
APLICACION = origo
MODULO = procurement
RECURSO = PURCHASE_ORDER
ACCION = create
MODALIDAD = BASE_ONLY
```

Significado:

> Permite materializar una orden de compra no aprobada y no emitida con cabecera y líneas válidas dentro del ámbito autorizado, sin conceder aprobación, emisión, recepción, corrección, cancelación ni eliminación.

Estado contractual:

```text
IDENTIDAD OBJETIVO DEFINIDA
!=
CLAVE ACTIVA EN CATALOGO COMPARTIDO
!=
GRANT MATERIALIZADO
!=
ENFORCEMENT FINAL EN RUNTIME
```

Hasta la materialización propietaria de `ORIGO-AUTH-014`, la UX no puede tratar la existencia documental de la clave como evidencia de que el consumidor ya la aplica físicamente.

---

#### 10. Modalidad administrativa

`purchase_orders.create` pertenece al carril administrativo:

```text
BASE_ONLY
```

Por tanto:

```text
TURNO
CHECK-IN
ROL OPERATIVO
GERENCIA_OPERATIVA
BODEGUERO
```

no pueden fabricar autoridad para crear una orden.

La ausencia de turno o check-in tampoco bloquea por sí sola una capacidad base válida.

---

#### 11. Grants base objetivo para creación

La política contractual aprobada para `purchase_orders.create` queda:

| Rol base | Decisión | Límite |
| --- | --- | --- |
| `propietario` | `ASIGNAR` | organización productiva ordinaria; no aprueba automáticamente |
| `gerente_general` | `ASIGNAR` | organización productiva ordinaria; no aprueba automáticamente |
| `gerente` | `ASIGNAR` | cobertura administrativa autorizada |
| `auxiliar_administrativa` | `ASIGNAR` | soporte documental de compras; puede preparar, no aprobar |
| `supervisor` | `NO_ASIGNAR` | seguimiento local no equivale a creación administrativa |
| `contador` | `NO_ASIGNAR` | consulta/conciliación no permiten crear órdenes |
| `marketing` | `NO_ASIGNAR` | fuera del dominio de abastecimiento |
| `trabajador_operativo` | `NO_ASIGNAR` | operación física no crea órdenes |

La matriz no sustituye el chequeo exacto de permiso, recurso, territorio, estado y field mask.

---

#### 12. Consulta no concede creación

La lectura de contexto puede requerir:

```text
origo.procurement.purchase_orders.view
origo.procurement.suppliers.view
```

pero:

```text
purchase_orders.view
!=
purchase_orders.create

suppliers.view
!=
purchase_orders.create

origo.access
!=
purchase_orders.create
```

La UI puede mostrar el editor o datos auxiliares solo dentro del alcance permitido; el primer write exige revalidación de `purchase_orders.create` en servidor.

---

#### 13. Recurso y territorio

El recurso protegido es:

```text
PURCHASE_ORDER
```

La orden puede involucrar:

- negocio;
- proveedor;
- sede o destinos;
- centro de costo;
- líneas y presentaciones;
- condiciones y fechas.

Regla:

```text
site_id EN FORMULARIO
!=
AUTORIDAD SOBRE ESA SEDE
```

La resolución completa de sede, centro de costo, cruces territoriales y relaciones obligatorias pertenece a `ORIGO-AUTH-009` y debe aplicarse antes del write.

---

#### 14. Identidades upstream obligatorias

La orden debe conservar referencias suficientes para reconstruir su origen sin copiar objetos previos como si fueran la misma identidad.

Como mínimo, cuando apliquen:

```text
purchase_need_ref
purchase_request_ref
sourcing_case_ref
sourcing_decision_ref
supplier_ref
```

Regla:

```text
CORRELACIONAR
!=
FUSIONAR
```

Crear la orden no elimina ni reescribe la necesidad, solicitud o decisión de sourcing que la originaron.

---

#### 15. Cabecera mínima de creación

El runtime actual evidencia como mínimo:

```text
supplier_id
site_id
expected_at
notes
```

El contrato objetivo exige tratar esos valores como entradas a validar, no como autoridad.

La cabecera debe poder conservar además las referencias gobernadas necesarias para:

- negocio aplicable;
- centro de costo cuando corresponda;
- decisión de sourcing;
- clasificación ordinaria, urgente o excepcional;
- moneda y condiciones comerciales cuando formen parte del compromiso;
- versión del contenido lógico.

No se inventa en esta tarea una columna física nueva para cada concepto.

---

#### 16. Líneas de la orden

Cada línea debe conservar identidad y semántica suficientes para reconstruir qué se pretende comprar.

El runtime actual evidencia:

```text
product_id
presentation_id
quantity
unit_cost
```

La experiencia debe garantizar, según aplique:

- producto válido y activo;
- presentación válida, activa y perteneciente al producto;
- cantidad positiva y unidad/presentación explícita;
- relación proveedor–producto válida cuando el contrato lo exija;
- costo y total derivados con reglas coherentes;
- separación entre cantidad solicitada, cantidad ordenada y cantidad recibida futura.

Regla:

```text
LINEA DE ORDEN
!=
LINEA DE RECEPCION
```

---

#### 17. Proveedor

La orden consume un proveedor existente y admisible.

`purchase_orders.create` no concede:

```text
origo.procurement.suppliers.create
origo.procurement.suppliers.update
origo.procurement.suppliers.activate
origo.procurement.suppliers.deactivate
```

Si el proveedor no existe o no puede utilizarse, el flujo debe bloquearse o derivar a su propietario; no puede crear o alterar el maestro silenciosamente desde el editor.

---

#### 18. Condiciones y evidencia de sourcing

El editor debe conservar suficiente trazabilidad de las condiciones que justifican la orden, incluyendo cuando apliquen:

- oferta o cotización fuente;
- presentación/unidad;
- precio y moneda;
- impuestos;
- descuentos;
- flete;
- mínimo;
- plazo de entrega;
- condición de pago;
- vigencia;
- contrato o referencia comercial;
- evidencia de la decisión de sourcing.

La orden no debe convertirse en una copia mutable de la cotización sin identidad de fuente y versión.

---

#### 19. Precios, importes y datos sensibles

La creación de una orden puede requerir precios y condiciones, pero la visibilidad y escritura de campos sensibles siguen bajo `ORIGO-AUTH-010` y el contrato de proveedor.

Regla:

```text
PUEDE CREAR ORDEN
!=
PUEDE VER / EDITAR TODO DATO SENSIBLE
```

El field mask debe limitar:

- precios y totales no necesarios para la función;
- condiciones comerciales restringidas;
- contratos;
- datos tributarios;
- cuentas bancarias;
- documentos internos;
- información no requerida para crear la orden.

---

#### 20. Estado empresarial al nacer VPROC-0021

El estado inicial canónico es:

```text
VPROC-0021.PURCHASE_REQUEST_PENDING_APPROVAL
```

Semántica:

```text
COMPRA PENDIENTE DE APROBACION
```

Condición mínima:

```text
EXISTE PROPUESTA DE COMPRA COMPLETA
CON NECESIDAD, PROVEEDOR, CONDICIONES, ALCANCE Y EVIDENCIA SUFICIENTE
```

Invariante de nacimiento:

```text
NO APPROVED
NO ORDER_ISSUED
NO ENVIADA AL PROVEEDOR
```

---

#### 21. `draft` AS-IS no es un estado canónico adicional

El runtime actual crea físicamente:

```text
status = draft
```

La tarea conserva ese literal como evidencia AS-IS.

No se permite afirmar:

```text
draft
=
PURCHASE_REQUEST_PENDING_APPROVAL
```

sin un mapping contractual explícito de materialización.

La UX objetivo debe proyectar la verdad empresarial canónica y evitar que un literal técnico se convierta en una novena etapa de `VPROC-0021`.

---

#### 22. Lifecycle completo que el editor debe respetar

`VPROC-0021` conserva exactamente:

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

La creación de la orden no salta estados.

---

#### 23. Transiciones preservadas

La UX debe respetar las siete transiciones normales:

```text
VPROC-0021.TR-001
PURCHASE_REQUEST_PENDING_APPROVAL -> UNDER_REVIEW

VPROC-0021.TR-002
UNDER_REVIEW -> PENDING_APPROVAL

VPROC-0021.TR-003
PENDING_APPROVAL -> APPROVED

VPROC-0021.TR-004
APPROVED -> ORDER_PREPARING

VPROC-0021.TR-005
ORDER_PREPARING -> ORDER_ISSUED

VPROC-0021.TR-006
ORDER_ISSUED -> SUPPLIER_ACK_PENDING

VPROC-0021.TR-007
SUPPLIER_ACK_PENDING -> PURCHASE_COMMITMENT_FORMALIZED
```

`ORIGO-UX-007` no crea una transición alternativa para “guardar”, “enviar” o “emitir”.

---

#### 24. Creación no equivale a aprobación

Invariantes:

```text
CREATE
→ NO APPROVED
→ NO ORDER_ISSUED
→ NO SUPPLIER_ACK
→ NO RECEIPT
→ NO PAYMENT
```

Y:

```text
CREADOR
!=
APROBADOR
```

La capacidad de aprobación sigue siendo:

```text
origo.procurement.purchase_orders.approve
```

con `ORIGO-UX-008` como tarea UX propietaria del detalle de aprobación y rechazo.

---

#### 25. Edición preaprobación

La edición ordinaria de una orden existente no usa `purchase_orders.create`.

Capacidad separada:

```text
origo.procurement.purchase_orders.update
```

Modalidad:

```text
BASE_ONLY
```

Puede aplicar, conforme a política, durante:

```text
PURCHASE_REQUEST_PENDING_APPROVAL
UNDER_REVIEW
PENDING_APPROVAL
```

sin conceder aprobación, emisión o cancelación.

---

#### 26. Field mask de actualización

La edición preaprobación exige simultáneamente:

```text
PERMISO EXACTO
+
ESTADO EDITABLE
+
VERSION VIGENTE
+
ALCANCE DEL RECURSO
+
FIELD MASK AUTORIZADO
```

No se permite editar como campos ordinarios:

- estado empresarial protegido;
- actor creador o aprobador;
- evidencia de aprobación;
- evidencia de emisión;
- cantidades recibidas;
- timestamps de procesos posteriores;
- datos sensibles fuera del field mask.

---

#### 27. Versionado antes de aprobación

Cada cambio material que llegue a decisión debe producir una versión identificable.

La huella lógica debe poder distinguir cambios en, al menos:

- proveedor;
- líneas;
- cantidades;
- unidad o presentación;
- precios;
- moneda;
- impuestos;
- descuentos o flete cuando alteren el total;
- fecha o condición de entrega material;
- sede o destino;
- centro de costo;
- contrato;
- anticipo;
- urgencia o excepción;
- otras condiciones materiales definidas por política.

El aprobador debe poder saber exactamente qué versión está decidiendo.

---

#### 28. Envío a revisión y aprobación

Cuando la propuesta está completa, el editor puede conducir el trabajo hacia:

```text
UNDER_REVIEW
→
PENDING_APPROVAL
```

pero no aprobar.

La experiencia debe distinguir:

```text
GUARDAR CAMBIOS
!=
ENVIAR A REVISION
!=
ENVIAR A APROBACION
!=
APROBAR
```

La transición autoritativa de aprobación sigue siendo `VPROC-0021.TR-003` y no se ejecuta por guardar o cerrar el editor.

---

#### 29. Postaprobación y `ORDER_PREPARING`

Después de una aprobación válida:

```text
VPROC-0021.TR-004
APPROVED
→
ORDER_PREPARING
```

La preparación postaprobación construye el instrumento exacto que se emitirá.

Regla crítica:

```text
ORDEN APROBADA VERSION A
→
ORDER_PREPARING
→
MISMA VERSION MATERIAL A
```

No se permite usar el editor para alterar silenciosamente la versión aprobada antes de emitirla.

---

#### 30. Cambio material después de aprobación

Una modificación material postaprobación no se representa como simple `update` destructivo.

Debe conservar:

```text
VERSION APROBADA
+
NUEVA VERSION PROPUESTA
+
MOTIVO / DIFERENCIA
+
NUEVA REVISION
+
NUEVA APROBACION CUANDO CORRESPONDA
```

`VPROC-0021.EX-003 — REQUEST_INFO` conserva la posibilidad de solicitar nueva aprobación por cambio material después de la aprobación y antes de emisión.

La 007 preserva esa frontera sin diseñar la decisión final de la 008.

---

#### 31. Emisión no pertenece al botón de crear

La emisión normal ocurre mediante:

```text
VPROC-0021.TR-005
ORDER_PREPARING
→
ORDER_ISSUED
```

Por tanto:

```text
CREAR
!=
EMITIR

GUARDAR
!=
EMITIR

GENERAR PDF
!=
EMITIR

PREPARAR MENSAJE
!=
EMITIR
```

`ORDER_ISSUED` requiere una versión identificable enviada al proveedor con evidencia de emisión.

---

#### 32. Confirmación del proveedor y compromiso

La creación tampoco produce:

```text
SUPPLIER_ACK_PENDING
PURCHASE_COMMITMENT_FORMALIZED
```

La secuencia posterior permanece:

```text
ORDER_ISSUED
→ SUPPLIER_ACK_PENDING
→ PURCHASE_COMMITMENT_FORMALIZED
```

Una respuesta externa no puede sobrescribir líneas, precios o condiciones internas sin validación y nueva autoridad cuando exista cambio material.

---

#### 33. Eventos preservados

La tarea no inventa eventos.

Se preservan las definiciones normales existentes de `VPROC-0021`, incluyendo:

```text
VPROC-0021.EVT-001 — purchase-request-pending-approval
VPROC-0021.EVT-004 — order-preparing
VPROC-0021.EVT-005 — order-issued
VPROC-0021.EVT-006 — purchase-commitment-formalized
```

No existe un evento normal nuevo creado por esta tarea para “draft”, “saved” o “approved”.

---

#### 34. VSCREEN-0075 como continuidad y seguimiento

Después de crear una orden, `VSCREEN-0075 — Detalle y seguimiento de orden` puede presentar, según autorización:

- identidad de orden;
- estado canónico/proyección contractual;
- versión;
- proveedor;
- líneas;
- destinos;
- documentos;
- pendientes;
- emisión y confirmación cuando existan;
- referencias posteriores de recepción permitidas.

La 007 usa `VSCREEN-0075` como continuidad de lectura/seguimiento, no como permiso compuesto de mutación.

---

#### 35. Documento para proveedor

Un PDF, enlace o documento externo puede representar una versión de orden, pero:

```text
DOCUMENTO GENERADO
!=
ORDEN EMITIDA
```

Además, cualquier acceso externo debe respetar alcance, expiración, revocación, secreto sin fallback y minimización según el contrato propietario.

`purchase_orders.create` no concede publicación pública ni acceso externo irrestricto.

---

#### 36. Dispositivo compartido

`purchase_orders.create` y `purchase_orders.update` son capacidades administrativas `BASE_ONLY`.

No deben habilitarse en un dispositivo compartido por inferencia.

Regla fail-closed:

```text
SHARED_DEVICE
+
CAPACIDAD NO INCLUIDA EXPLICITAMENTE EN DEVICE CEILING
→ DENY
```

Si una materialización futura habilita administración en dispositivo compartido deberá exigir actor humano efectivo, permiso base exacto, aplicación permitida, techo de dispositivo y demás controles sin usar check-in como sustituto de autoridad administrativa.

---

#### 37. Simulación

La simulación puede explicar o previsualizar:

- permiso;
- scope;
- territorio;
- proveedor;
- líneas;
- campos bloqueados;
- estado resultante hipotético.

Pero:

```text
SIMULATED_ALLOW
→ ZERO BUSINESS WRITE
```

No crea ni actualiza una orden real.

---

#### 38. Primer efecto y orden de validación

El primer write empresarial solo puede ocurrir después de:

```text
AUTHENTICATE
→ RESOLVE ACTOR
→ RESOLVE EXACT CREATE/UPDATE PERMISSION
→ RESOLVE SCOPE / TERRITORY
→ VALIDATE UPSTREAM REFERENCES
→ VALIDATE SUPPLIER / PRODUCT / PRESENTATION
→ VALIDATE FIELD SET
→ VALIDATE CURRENT VERSION / STATE
→ WRITE
```

Está prohibido:

```text
WRITE
→ LUEGO COMPROBAR PERMISO O ESTADO
```

Si la creación requiere cabecera y múltiples líneas, forman una sola intención empresarial y deben conservar resultado coherente, correlación y recuperación segura.

---

#### 39. Errores y estados UX

La experiencia debe distinguir, como mínimo:

| Estado UX | Significado | Tratamiento |
| --- | --- | --- |
| `LISTO_PARA_CREAR` | upstream, autoridad y datos suficientes | permitir creación |
| `UPSTREAM_INCOMPLETO` | necesidad/sourcing no habilitan compra | volver al owner correspondiente |
| `PERMISO_DENEGADO` | falta create/update exacto | no mostrar mutación como disponible |
| `TERRITORIO_INVALIDO` | sede/centro de costo fuera de alcance | bloquear sin fallback |
| `RELACION_INVALIDA` | proveedor/producto/presentación no admisibles | corregir fuente, no forzar |
| `DATOS_INCOMPLETOS` | faltan campos obligatorios | completar sin crear |
| `VERSION_STALE` | recurso cambió desde la lectura | refrescar/reconciliar antes de mutar |
| `PENDING_APPROVAL` | propuesta esperando decisión | bloquear autoaprobación |
| `POST_APPROVAL_LOCKED` | existe versión aprobada | impedir edición material destructiva |
| `TECHNICAL_FAILURE` | fallo de infraestructura | conservar incertidumbre; no asumir éxito |

No se confunden deny, invalidez, stale, vacío y error técnico.

---

#### 40. Idempotencia y doble envío

Una creación empresarial no debe duplicarse por:

- doble clic;
- retry de red;
- refresh;
- reenvío del mismo formulario;
- timeout con resultado desconocido.

La materialización deberá usar una identidad/referencia estable suficiente para recuperar el mismo resultado cuando corresponda.

La tarea no inventa aquí una columna física ni un RPC; fija la conducta UX y contractual esperada.

---

#### 41. AS-IS de `/purchase-orders/new`

La implementación observada permite:

```text
/purchase-orders/new
→ requireAppAccess(origo)
→ cargar proveedores y sedes
→ createPurchaseOrder
```

`createPurchaseOrder` observa, entre otros:

- usuario autenticado;
- `supplier_id`;
- `site_id`;
- líneas;
- producto/presentación/proveedor;
- `created_by = user.id`;
- `status = draft`;
- inserción de líneas;
- cálculo posterior del total.

Eso demuestra una superficie real de creación, pero no demuestra por sí solo el contrato completo de autoridad y lifecycle objetivo.

---

#### 42. Brecha AS-IS de autorización de creación

No se observa en la acción inspeccionada un check equivalente explícito de:

```text
has_permission("origo.procurement.purchase_orders.create")
```

Clasificación heredada:

```text
AS_IS_GAP_PURCHASE_ORDER_CREATE_BINDING
```

La tarea no concluye que RLS u otra capa sean inexistentes; concluye que la acción observada no constituye evidencia suficiente del permiso exacto objetivo.

Propietario de materialización:

```text
ORIGO-AUTH-014 + package físico propietario
```

Condición de salida:

```text
CREATE CONSUME purchase_orders.create EXACTO EN EL LIMITE DE CONFIANZA
```

---

#### 43. AS-IS de edición

La implementación observada permite editar órdenes mientras están en `draft` y reconstruir líneas físicas.

La técnica AS-IS no se eleva por sí sola a contrato objetivo.

El contrato exige:

```text
EDICION ORDINARIA PREAPROBACION
→ purchase_orders.update
→ estado editable
→ version vigente
→ field mask
```

Y:

```text
CAMBIO MATERIAL POST-APROBACION
→ NUEVA VERSION / REVISION
→ NO SOBRESCRITURA SILENCIOSA
```

---

#### 44. AS-IS `draft -> sent`

La acción física observada `setPurchaseOrderSent` efectúa:

```text
draft
→ sent
```

Ese cambio no equivale al lifecycle canónico:

```text
UNDER_REVIEW
→ PENDING_APPROVAL
→ APPROVED
→ ORDER_PREPARING
→ ORDER_ISSUED
```

Regla:

```text
sent AS-IS
!=
APPROVED
!=
ORDER_PREPARING
!=
ORDER_ISSUED
```

La reconciliación detallada de aprobación/rechazo pertenece a `ORIGO-UX-008`.

---

#### 45. Frontera con recepción

La orden creada debe dejar disponible, cuando corresponda y con finalidad autorizada, una proyección futura suficiente para recepción:

- identidad estable de la orden/compromiso;
- proveedor;
- sede/destino receptor;
- líneas;
- producto/presentación;
- cantidad ordenada;
- versión relevante;
- fecha/condición de entrega;
- documentos y condiciones necesarias para verificar.

Pero:

```text
ORDEN CREADA
!=
RECEIPT_EXPECTED POR INFERENCIA
!=
LLEGADA
!=
RECEPCION REGISTRADA
```

El ciclo receptor permanece propietario de `VPROC-0022`.

---

#### 46. Frontera con NEXO y NUMERA

La creación de orden puede alimentar proyecciones futuras, pero no produce:

```text
STOCK
LOC
LPN
MOVIMIENTO NEXO
OBLIGACION NUMERA
CUENTA POR PAGAR
PAGO
```

NEXO y NUMERA consumen contratos posteriores y no escriben `VPROC-0021` directamente.

---

#### 47. Hallazgos y propietarios

| Hallazgo | Impacto | Propietario | Condición de salida |
| --- | --- | --- | --- |
| `/purchase-orders/new` comienza directamente en proveedor/sede/líneas | puede perder trazabilidad de necesidad y sourcing | materialización UX consumiendo `ORIGO-UX-007` | editor recibe upstream válido y referencias de origen |
| `createPurchaseOrder` no demuestra permiso create exacto | acceso a ORIGO podría confundirse con autoridad mutante | `ORIGO-AUTH-014` + package propietario | acción revalida `purchase_orders.create` server-side |
| `site_id` proviene del formulario | cliente puede aparentar territorio | `ORIGO-AUTH-009` + consumer | sede/centro de costo se resuelven y validan server-side |
| precios/condiciones aparecen en editor | riesgo de exposición o mutación excesiva | `ORIGO-AUTH-010`, `ORIGO-UX-012` | field masks y finalidad limitan lectura/escritura |
| edición AS-IS usa `draft` como frontera | literal técnico puede sustituir lifecycle empresarial | `ORIGO-UX-007`, `ORIGO-UX-008` + materialización | edición se gobierna por estado canónico/versionado |
| `draft -> sent` colapsa aprobación y emisión | una orden podría parecer emitida sin decisión explícita | `ORIGO-UX-008` + materialización | aprobación, preparación y emisión quedan separadas |
| PDF/mensaje pueden parecer emisión | evidencia de emisión ambigua | materialización de `VPROC-0021.TR-005` | `ORDER_ISSUED` exige versión y evidencia de envío |
| reintento de creación puede duplicar orden | compras duplicadas y trazabilidad divergente | implementación propietaria | creación recuperable/idempotente para la misma intención |

No queda un hallazgo narrativo sin propietario y condición de salida.

---

#### 48. Handoff inmediato a ORIGO-UX-008

`ORIGO-UX-008 — Diseñar aprobación y rechazo` recibe una propuesta de compra versionada y suficientemente completa.

Handoff exacto:

```text
PURCHASE_ORDER / VPROC-0021 IDENTIFICABLE
+
VERSION EVALUABLE
+
NECESIDAD Y SOURCING TRAZABLES
+
PROVEEDOR
+
LINEAS / PRESENTACIONES / CANTIDADES
+
PRECIOS / IMPORTES AUTORIZADOS
+
SEDE / CENTRO DE COSTO
+
CONDICIONES / FECHAS
+
EVIDENCIA
+
CLASIFICACION ORDINARIA / URGENTE / EXCEPCIONAL
→
DECISION DE APROBACION / RECHAZO / DEVOLUCION
```

La 008 no deberá reconstruir el contenido desde valores no versionados ni tratar `draft -> sent` como aprobación.

---

#### 49. Handoff al resto de ORIGO-UX

| Tarea | Entrada exacta proveniente de ORIGO-UX-007 |
| --- | --- |
| `ORIGO-UX-008` | decisión sobre versión exacta de compra; crear/editar no concede aprobar ni emitir |
| `ORIGO-UX-009` | recepción total consume orden/compromiso elegible con líneas, versión y destino identificables |
| `ORIGO-UX-010` | recepción parcial conserva cantidades ordenadas y saldo pendiente por línea sin modificar la versión emitida |
| `ORIGO-UX-011` | diferencia compara observado contra orden/version/condiciones sin reescribir el pedido original |
| `ORIGO-UX-012` | precios, importes, contratos y condiciones del editor/seguimiento se proyectan por finalidad y field mask |
| `ORIGO-UX-013` | la orden y recepción conservan identidades separadas antes de cualquier efecto NEXO |
| `ORIGO-UX-014` | la entrada física deriva de recepción aceptada, no de orden creada ni emitida por sí sola |
| `ORIGO-UX-015` | compromiso y recepción entregan referencias económicas sin crear obligación o pago por la sola creación de orden |
| `ORIGO-UX-016` | prototipo reconstruye necesidad → sourcing → orden → aprobación → emisión → recepción mediante identidades/versiones trazables |

---

#### 50. Requisitos de prueba derivados

**Resultado:** NO GENERA REQUISITOS DE PRUEBA.

**Requisitos creados:** 0
**Requisitos modificados:** 0
**Requisitos diferidos:** 0
**Requisitos obsoletos:** 0

Justificación: creación y actualización de órdenes, segregación, territorio, protección de datos, versionado postaprobación y separación entre orden, aprobación y recepción ya están protegidos por obligaciones canónicas vigentes. Esta tarea especializa la experiencia de `VSCREEN-0073` sin introducir una obligación empresarial nueva ni modificar el Registro 04A.

---

#### 51. Cobertura de prueba vigente reutilizada

Se reutiliza sin modificación:

- `TREQ-ORIGO-002` para limitar lectura y mutación de órdenes por permiso, sede/centro de costo, estado y columnas, y proteger documentos externos;
- `TREQ-ORIGO-004` para separar necesidad, sourcing, selección, aprobación, orden y recepción, evitar autoaprobación y preservar revisión/versionado ante cambios materiales;
- `TREQ-ORIGO-005` para proveedor, presentación, precio, moneda, impuestos, descuentos, flete, mínimos, plazo, pago, versión y vigencia de condiciones;
- `TREQ-AUTH-001` para resolver autorización mediante permiso, contexto y alcance canónicos en lugar de listas locales de roles;
- `TREQ-AUTH-002` para impedir consumo físico de una permission key no incorporada al catálogo vigente;
- `TREQ-AUTH-010` para preservar segregación entre quien crea compra y quien aprueba/recibe;
- `TREQ-AUTH-013` para revalidar server-side permiso exacto, actor, territorio, estado y field mask;
- `TREQ-AUTH-015` para conservar evidencia correlacionable de decisión, recurso, actor, resultado y versión.

Esta enumeración es trazabilidad vigente y no constituye una actualización del registro.

---

#### 52. Evidencia de validación

| Clase | Estado | Evidencia |
| --- | --- | --- |
| BUILD | NOT_EXECUTED | `docs:plan:build` corresponde al checkout local después de incorporar el artefacto. |
| LOCAL | NOT_EXECUTED | Formato, quality, delivery, topología, EOL, TREQ, batería global y lifecycle quedan pendientes del checkout local. |
| REMOTA | PASS | Se verificaron `vento-shell/main@9d0106192de83699af0cddc0dcd1431072ac1876`, owner blob `f1d87caf21d5ea56bcea224c2c7af8c30dd968ae`, topología `DEFINE_ONCE / NO_PHYSICAL_INSTANCE`, `VSCREEN-0073/0075`, `VPROC-0021`, sus ocho estados y siete transiciones, permisos `purchase_orders.create/update/approve`, cobertura territorial, protección sensible, 04A ORIGO/AUTH y runtime AS-IS de creación/edición/envío. La entrada inmediata 006 se consume desde el artefacto aprobado SHA-256 `083e1104d5ff0d5951b01cc4b7f75e9e185a4330757c0887d8835a1de2a7f323`. |
| OPERATIVA | NOT_EXECUTED | No se crearon, editaron, aprobaron, emitieron ni recibieron órdenes reales; no se probaron usuarios, sedes, proveedores ni documentos externos. |
| FÍSICA | NOT_APPLICABLE | `ORIGO-UX-007` no crea instancia física propia ni autoriza cambios de producto, datos o infraestructura. |

---

#### 53. Criterios de aceptación

La tarea queda documentalmente completa cuando:

- [ ] `VSCREEN-0073` queda identificada como superficie canónica de editor de orden;
- [ ] `VPROC-0021` queda identificado como proceso propietario;
- [ ] `VPROC-0021::STEP-PREPARE_PURCHASE_ORDER` queda preservado;
- [ ] la creación consume necesidad/sourcing válidos y no nace de un formulario huérfano;
- [ ] `origo.procurement.purchase_orders.create` queda como capacidad exacta de creación;
- [ ] `purchase_orders.create` permanece `BASE_ONLY`;
- [ ] propietario, gerente general, gerente y auxiliar administrativa quedan como grants base objetivo según alcance;
- [ ] supervisor, contador, marketing y trabajador operativo no reciben create por defecto;
- [ ] `.view` y `origo.access` no conceden create;
- [ ] el primer write exige revalidación server-side;
- [ ] `PURCHASE_ORDER` conserva recurso y territorio verificables;
- [ ] `site_id` cliente no se convierte en autoridad territorial;
- [ ] necesidad, solicitud, sourcing, orden y recepción conservan identidades distintas;
- [ ] proveedor, producto y presentación se validan como relaciones existentes/admisibles;
- [ ] la relación producto–proveedor no se crea implícitamente desde la orden;
- [ ] la línea conserva producto, presentación, cantidad y costo aplicables;
- [ ] precio y condiciones conservan fuente/versión cuando corresponda;
- [ ] field masks protegen datos sensibles;
- [ ] el estado inicial empresarial se conserva como `PURCHASE_REQUEST_PENDING_APPROVAL`;
- [ ] `draft` AS-IS no se eleva a estado canónico nuevo;
- [ ] los ocho estados de `VPROC-0021` quedan diferenciados;
- [ ] las siete transiciones normales se preservan;
- [ ] crear no equivale a aprobar;
- [ ] `purchase_orders.update` queda separado de create y limitado a edición preaprobación permitida;
- [ ] el aprobador recibe una versión exacta y evaluable;
- [ ] un cambio material postaprobación no sobrescribe silenciosamente la versión autorizada;
- [ ] `APPROVED -> ORDER_PREPARING` conserva el contenido material aprobado;
- [ ] crear/guardar/generar PDF no equivale a emitir;
- [ ] `ORDER_ISSUED` exige una versión identificable y evidencia de envío;
- [ ] confirmación del proveedor no amplía la orden unilateralmente;
- [ ] `VSCREEN-0075` se usa como seguimiento autorizado y no como wildcard de mutación;
- [ ] dispositivo compartido no habilita creación administrativa por inferencia;
- [ ] simulación produce cero writes;
- [ ] deny, invalidez, stale, pendiente de aprobación y fallo técnico no se confunden;
- [ ] doble envío/retry no debe duplicar la intención empresarial;
- [ ] `/purchase-orders/new` queda reconocido como AS-IS real pero parcial;
- [ ] el gap de permiso exacto de creación queda asignado a su propietario;
- [ ] `draft -> sent` no sustituye aprobación + preparación + emisión;
- [ ] la orden deja referencias suficientes para recepción futura sin registrar recepción;
- [ ] ORIGO no crea stock NEXO ni obligación NUMERA desde la creación;
- [ ] cada hallazgo tiene propietario y condición de salida;
- [ ] `ORIGO-UX-008` recibe un handoff versionado y completo;
- [ ] no se crean ni modifican requisitos de prueba;
- [ ] no se ejecutan cambios físicos desde esta tarea.

---

#### 54. Límites

Esta tarea no:

- implementa `VSCREEN-0073` ni `VSCREEN-0075`;
- crea rutas, layouts, componentes o formularios físicos;
- crea o modifica una orden real;
- crea o modifica un proveedor real;
- selecciona proveedor;
- aprueba, rechaza o devuelve una compra;
- emite una orden real;
- confirma respuesta del proveedor;
- registra recepción;
- corrige o reversa recepción;
- mueve inventario;
- crea obligaciones o pagos;
- crea permission keys nuevas;
- activa `purchase_orders.create` o `purchase_orders.update` en catálogo/grants;
- modifica matrices RBAC;
- modifica estados o transiciones de `VPROC-0021`;
- crea eventos empresariales;
- modifica PDF/token externo;
- modifica `vento-origo`;
- modifica Supabase, migraciones, RLS, RPC, grants, Storage o datos;
- ejecuta E5;
- crea instancia física;
- modifica el Registro 04A;
- desarrolla `ORIGO-UX-008`.

---

#### 55. Continuidad

**ÚLTIMA TAREA APROBADA**
`ORIGO-UX-006 — Diseñar inicio para receptor`

**TAREA ACTUAL APROBADA**
`ORIGO-UX-007 — Diseñar creación de orden de compra`

**SIGUIENTE TAREA RESERVADA**
`ORIGO-UX-008 — Diseñar aprobación y rechazo`
### ✅ ORIGO-UX-008 — Diseñar aprobación y rechazo

**Estado:** APROBADA
**Tarea anterior:** ORIGO-UX-007 — Diseñar creación de orden de compra
**Tarea siguiente:** ORIGO-UX-009 — Diseñar recepción total
**Tipo de tarea:** diseño documental integral de la decisión de aprobación, rechazo y devolución controlada de compras sobre `VSCREEN-0074`, con `VSCREEN-0075` como contexto de detalle y `VPROC-0021` como proceso propietario, preservando versión evaluada, política, segregación, urgencia/excepción, idempotencia, concurrencia, evidencia y separación estricta entre aprobar, preparar, emitir y recibir, sin crear estados, permission keys ni materialización física adicionales; `DEFINE_ONCE` / `NO_PHYSICAL_INSTANCE`
**Bloque:** BLOQUE M — ORIGO
**Repositorio propietario:** `vento-group-sas/vento-shell`
**Archivo propietario:** `docs/plan-canonico/modular/bloques/M_ORIGO/02_EXPERIENCIA_DE_COMPRAS.md`
**Estado físico resultante:** `NO_PHYSICAL_INSTANCE`
**Cambios físicos autorizados:** ninguno; esta tarea no modifica código, rutas, navegación, componentes, permisos, roles, grants, procesos, estados, contratos generados, datos, tablas, RLS, RPC, migraciones, Supabase, Storage, packages, consumidores ni despliegues
**Requisitos de prueba creados o modificados:** 0

---

#### 1. Propósito

Diseñar el contrato de experiencia para **aprobar, rechazar o devolver de forma gobernada una compra** en ORIGO sin fusionar la decisión con edición, emisión al proveedor, recepción, inventario ni efecto financiero.

La experiencia debe garantizar que:

- la decisión actúe únicamente sobre una compra realmente elegible;
- el aprobador evalúe una versión exacta y reproducible;
- la autorización se resuelva mediante la capacidad canónica de aprobación y no por acceso, cargo visual o participación previa;
- aprobar, rechazar y devolver produzcan resultados distinguibles y auditables;
- rechazo y devolución no inventen estados principales ni permission keys inexistentes;
- urgencia y excepción conserven autoridad, límites, evidencia y regularización;
- la segregación se evalúe antes de producir cualquier efecto;
- una versión obsoleta, un resultado desconocido o un conflicto concurrente fallen cerrado;
- la aprobación no emita la orden por sí sola;
- una orden rechazada no genere recepción esperada ni compromiso comercial formalizado;
- un cambio material posterior a la aprobación invalide la equivalencia de la decisión previa;
- el resultado quede trazable hacia preparación/emisión y, cuando corresponda, hacia recepción posterior.

La superficie principal es:

```text
VSCREEN-0074 — Bandeja de aprobaciones de compra
VPROC-0021    — Aprobar y emitir compras separando flujo ordinario, urgencia y excepción
```

`VSCREEN-0075 — Detalle y seguimiento de orden` funciona únicamente como contexto autorizado de consulta y trazabilidad.

---

#### 2. Entrada aprobada de ORIGO-UX-007

`ORIGO-UX-007` entrega una propuesta de compra versionada y suficientemente completa:

```text
PURCHASE_ORDER / VPROC-0021 IDENTIFICABLE
+
VERSION EVALUABLE
+
NECESIDAD Y SOURCING TRAZABLES
+
PROVEEDOR
+
LINEAS / PRESENTACIONES / CANTIDADES
+
PRECIOS / IMPORTES AUTORIZADOS
+
SEDE / CENTRO DE COSTO
+
CONDICIONES / FECHAS
+
EVIDENCIA
+
CLASIFICACION ORDINARIA / URGENTE / EXCEPCIONAL
→
DECISION DE APROBACION / RECHAZO / DEVOLUCION
```

La 008 consume ese handoff sin reconstruir el contenido desde valores no versionados y sin tratar el literal AS-IS `draft -> sent` como decisión de aprobación.

---

#### 3. Contrato heredado del inicio del aprobador

`ORIGO-UX-005` ya fijó la experiencia inicial del aprobador sobre:

```text
VSCREEN-0074
VSCREEN-0075
VPROC-0021
```

Y dejó como fronteras obligatorias:

```text
COMPRADOR != APROBADOR
APROBACION != EMISION
APROBACION != RECEPCION
VERSION_REVISADA = VERSION_DECIDIDA
```

La presente tarea no rediseña el home del aprobador; desarrolla el comportamiento detallado de las decisiones y sus resultados.

---

#### 4. Naturaleza y topología

La topología vigente de `ORIGO-UX-001..016` establece:

```text
mode = DEFINE_ONCE
execution_gate = NO_PHYSICAL_INSTANCE
```

Consecuencias:

1. `ORIGO-UX-008` se define una sola vez;
2. no existe una instancia física propia de esta tarea;
3. no se crea ni modifica una ruta, formulario, Server Action, RPC, RLS o migración;
4. no se crean estados persistidos ni permission keys;
5. las brechas AS-IS se documentan con propietario y condición de salida;
6. la materialización posterior deberá consumir este contrato sin reinterpretar rechazo, devolución o urgencia.

---

#### 5. Fuentes verificadas

El diseño consume y conserva:

- `ORIGO-UX-002 — Separar solicitud, compra, aprobación y recepción`;
- `ORIGO-UX-005 — Diseñar inicio para aprobador`;
- `ORIGO-UX-007 — Diseñar creación de orden de compra` como base inmediata aprobada;
- `ORIGO-AUTH-006 — Definir permisos de aprobación`;
- `ORIGO-AUTH-008 — Definir permisos de corrección`;
- `ORIGO-AUTH-009 — Limitar órdenes por sede o centro de costo`;
- `ORIGO-AUTH-010 — Proteger precios y datos sensibles`;
- `ORIGO-AUTH-012..015` para contexto administrativo, materialización compartida y pruebas integrales;
- `VPROC-0021` y sus ocho estados canónicos;
- `VPROC-0021.TR-001..007`;
- `VPROC-0021.EX-001 — OVERRIDE`;
- `VPROC-0021.EX-002 — HOLD`;
- `VPROC-0021.EX-003 — REQUEST_INFO`;
- `VPROC-0021.EX-004 — REJECT`;
- `VSCREEN-0074` y `VSCREEN-0075`;
- contratos de actores, segregación, territorio, autorización, versionado, idempotencia y auditoría;
- Registro 04A vigente de ORIGO y AUTH;
- runtime AS-IS de detalle y envío de órdenes de `vento-origo`;
- `vento-shell/main@841d0b455e2567fa0b5ef11cb48f07da8904989f` y owner blob `f1d87caf21d5ea56bcea224c2c7af8c30dd968ae` observados durante esta preparación;
- artefacto aprobado `ORIGO-UX-007_APROBADA_PARA_REEMPLAZAR.md` como fuente inmediata de la versión de compra entregada a decisión.

---

#### 6. Identidad canónica de la superficie de decisión

La experiencia utiliza una identidad ya existente:

```text
VSCREEN-0074
Bandeja de aprobaciones de compra
origo
VPROC-0021
OWNER_WORKSPACE
```

Su responsabilidad es presentar compras que requieren decisión dentro del alcance del actor y conducir una acción de decisión gobernada.

No es:

- editor general de orden;
- consola de emisión;
- bandeja de recepción;
- atajo para modificar la orden;
- permiso universal sobre compras.

---

#### 7. Contexto de detalle

`VSCREEN-0075 — Detalle y seguimiento de orden` aporta contexto autorizado para revisar:

- necesidad y origen;
- proveedor;
- líneas, presentaciones y cantidades;
- precios e importes visibles según finalidad;
- sede y centro de costo;
- fechas y condiciones;
- versión;
- evidencia;
- historial de decisiones y cambios permitidos.

Regla:

```text
PODER VER DETALLE
!=
PODER DECIDIR
```

La autoridad de decisión se evalúa por separado.

---

#### 8. Paso canónico de aprobación

La superficie se vincula a:

```text
VPROC-0021::STEP-APPROVE_PURCHASE
— Aprobar o rechazar compra
```

Tipo de interacción:

```text
APPROVE
DECISION
```

La UX puede expresar aprobar, rechazar y devolver, pero no inventa una segunda autoridad paralela para cada resultado.

---

#### 9. Autoridad canónica

La única identity key de autoridad de aprobación definida por las fuentes consumidas es:

```text
origo.procurement.purchase_orders.approve
```

Contrato:

```text
resource = PURCHASE_ORDER
action = approve
mode = BASE_ONLY
```

No se crean:

```text
origo.procurement.purchase_orders.reject
origo.procurement.purchase_orders.return
origo.procurement.purchase_orders.send
```

La autoridad de entrar al punto de decisión se gobierna por `purchase_orders.approve`; el resultado concreto de la decisión se conserva como dato/proceso gobernado.

---

#### 10. Autoridad funcional del aprobador

Para `VPROC-0021`, los aprobadores funcionales son:

```text
GERENCIA_GENERAL
OR
COORDINACION_DE_OPERACIONES
```

El `RESPONSABLE_DE_COMPRAS` permanece como iniciador/ejecutor principal del proceso y no obtiene aprobación automática por haber preparado la compra.

Una función empresarial aprobadora no se transforma en un rol técnico nuevo llamado `aprobador`.

---

#### 11. Modalidad administrativa

La capacidad de aprobación es:

```text
BASE_ONLY
```

Por tanto:

```text
TURNO
CHECK-IN
ROL OPERATIVO
```

no son fuentes de autoridad para aprobar, rechazar o devolver una compra.

La administración puede resolver la decisión sin exigir check-in artificial.

---

#### 12. Estado elegible para aprobación positiva

La transición positiva exacta es:

```text
VPROC-0021.TR-003
PENDING_APPROVAL
→
APPROVED
```

Clase de autoridad:

```text
CONTROL_ACEPTACION
```

Puertas preservadas:

```text
G01,G02,G03,G04,G05
```

La UX no permite representar una aprobación efectiva si el recurso no está exactamente en estado elegible o si la versión ya cambió.

---

#### 13. Revisión previa a la decisión

Antes del punto positivo de aprobación, el proceso conserva:

```text
PURCHASE_REQUEST_PENDING_APPROVAL
→ VPROC-0021.TR-001
UNDER_REVIEW
→ VPROC-0021.TR-002
PENDING_APPROVAL
```

La experiencia debe distinguir:

- propuesta todavía incompleta o bajo revisión;
- propuesta lista para decidir;
- evidencia faltante;
- política no resuelta;
- conflicto de segregación;
- versión obsoleta;
- resultado técnico indeterminado.

Ninguna de estas condiciones equivale a aprobación.

---

#### 14. Contenido mínimo evaluable

Antes de decidir deben existir, según aplique:

- necesidad o justificación trazable;
- sourcing o excepción gobernada;
- proveedor identificado y admisible;
- líneas, presentaciones y cantidades;
- precios/importes suficientes para la decisión;
- moneda, impuestos y condiciones materiales cuando correspondan;
- sede y centro de costo aplicables;
- fecha o condición de entrega material;
- presupuesto o evidencia financiera cuando la política lo exija;
- riesgo, urgencia y excepción clasificados;
- documentos/evidencia exigibles;
- solicitante, preparador/comprador y aprobador identificables;
- versión lógica exacta sometida a decisión.

Una recomendación automática o prefill no sustituye ninguno de estos requisitos.

---

#### 15. Política de aprobación

La política puede depender de:

```text
empresa
sede
centro de costo
categoria
importe
presupuesto
riesgo
contrato
urgencia
excepcion
```

La tarea no inventa umbrales numéricos.

La experiencia debe poder explicar de forma segura:

- por qué el caso llegó a ese aprobador;
- qué dimensión material está siendo evaluada;
- si existe autoridad adicional o doble control;
- si la política bloquea la decisión;
- si se está usando una excepción.

No se exponen internamente reglas sensibles innecesarias.

---

#### 16. Segregación obligatoria

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

Si existe conflicto de segregación no autorizado:

```text
DECISION
→ BLOCKED
→ CERO EFECTOS
```

La interfaz no puede ocultar el conflicto ni ofrecer un bypass manual.

---

#### 17. Regla autoritativa de aprobación

Una aprobación positiva solo puede proceder cuando se satisfaga simultáneamente:

```text
APPROVE_ALLOW
=
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

Ausencia, ambigüedad o fallo de cualquiera de estas dimensiones produce decisión segura distinta de `ALLOW`.

---

#### 18. Compra ordinaria

La compra ordinaria debe alcanzar `PENDING_APPROVAL` con evidencia suficiente y resolver una decisión explícita.

Está prohibido:

```text
create
→ autoapprove
→ send
```

como una sola acción implícita.

El flujo ordinario conserva autoridad, política, versión, segregación y evidencia.

---

#### 19. Compra urgente y `VPROC-0021.EX-001`

La urgencia utiliza un carril expedito, no un carril sin control.

Se preserva:

```text
VPROC-0021.EX-001 — OVERRIDE
```

antes de la aprobación cuando corresponda.

El caso urgente debe conservar, como mínimo cuando aplique:

- causa estructurada;
- necesidad de urgencia;
- autoridad válida o reforzada;
- límite aplicable;
- vigencia;
- proveedor y líneas;
- evidencia;
- responsable y plazo de regularización;
- auditoría.

Regla:

```text
URGENTE
!=
SIN APROBACION
```

---

#### 20. Excepción de autoaprobación

El comprador no puede autoaprobar por:

- cargo;
- propiedad del negocio;
- urgencia;
- falta de otro usuario disponible;
- acceso a ORIGO;
- haber creado la orden.

Una excepción válida debe demostrar:

- causa;
- política habilitante;
- autoridad que la concedió;
- alcance;
- vigencia;
- límites;
- actor;
- tratamiento del conflicto;
- regularización posterior cuando aplique;
- evidencia auditable.

La UX debe mostrar que se trata de una excepción, no de una aprobación ordinaria.

---

#### 21. Acción Aprobar

Cuando la decisión sea positiva y la frontera autoritativa confirme el efecto:

```text
VPROC-0021.PENDING_APPROVAL
→ VPROC-0021.TR-003
→ VPROC-0021.APPROVED
```

La verdad empresarial resultante es exclusivamente:

```text
LA VERSION EVALUADA DE LA COMPRA
FUE AUTORIZADA POR LA AUTORIDAD APLICABLE
```

No significa todavía:

```text
ORDER_ISSUED
SUPPLIER_ACKNOWLEDGED
RECEIPT_ACCEPTED
STOCK_INCREASED
PAYABLE_RECOGNIZED
PAYMENT_EXECUTED
```

---

#### 22. Evidencia mínima de aprobación

Una aprobación confirmada debe conservar, como mínimo cuando aplique:

```text
purchase_order_id
version evaluada
principal
actor efectivo
actor aprobador
permission_key
scope
territorio / centro de costo
politica / regla aplicada
decision
razon o comentario
clasificacion ordinaria / urgente / excepcional
timestamp
resultado
idempotency identity / correlacion
```

La evidencia debe permitir demostrar qué contenido exacto fue aprobado y bajo qué autoridad.

---

#### 23. Acción Rechazar

La experiencia preserva:

```text
VPROC-0021.EX-004 — REJECT
```

`REJECT` cierra excepcionalmente la solicitud antes de emitir la orden y exige motivo y notificación.

La decisión de rechazo debe conservar:

- orden e instancia afectadas;
- versión evaluada;
- actor y autoridad;
- razón estructurada o suficiente;
- evidencia relevante;
- timestamp;
- resultado;
- destinatarios de la notificación o continuidad cuando el contrato lo requiera.

No se crea una permission key `.reject`.

---

#### 24. Rechazo no crea un estado principal nuevo

El lifecycle principal de `VPROC-0021` no expone un estado terminal dedicado llamado `REJECTED`.

Por tanto:

```text
VPROC-0021.EX-004
!=
INVENTAR VPROC-0021.REJECTED
```

La UX puede mostrar el resultado de decisión como **rechazado** para comprensión humana, pero la materialización deberá conservar el contrato excepcional propietario y su evidencia sin fabricar un alias persistente.

---

#### 25. Rechazo no equivale a cancelación, anulación o reversión

Se preservan acciones distintas:

```text
VPROC-0021.EX-004 — REJECT
VPROC-0021.CCR-001 — CANCEL
VPROC-0021.CCR-002 — VOID
VPROC-0021.CCR-003 — REVERSE
VPROC-0021.CCR-004 — RESTATE
```

Regla:

```text
REJECT
!=
CANCEL
!=
VOID
!=
REVERSE
!=
RESTATE
```

El rechazo decide que la propuesta no cruza el punto de aprobación/emisión; las acciones CCR gobiernan otros momentos y efectos.

---

#### 26. Acción Devolver para ajuste

La experiencia puede devolver una propuesta para ajuste sin inventar un estado `RETURNED_FOR_CHANGES`.

Se preserva:

```text
VPROC-0021.EX-002 — HOLD
```

La devolución controlada debe conservar:

- razón;
- versión afectada;
- evidencia faltante o cambio solicitado;
- actor que devuelve;
- owner de reanudación;
- condición de salida del bloqueo;
- timestamp y correlación.

Mientras el caso esté bajo HOLD, no puede avanzar a emisión como si estuviera aprobado.

---

#### 27. Reanudación después de devolución

La devolución no constituye aprobación negativa irreversible por sí sola.

Secuencia conceptual:

```text
PROPUESTA EN DECISION
→ HOLD / DEVOLUCION CONTROLADA
→ AJUSTE POR OWNER AUTORIZADO
→ NUEVA VERSION CUANDO CAMBIE CONTENIDO MATERIAL
→ REVALIDACION
→ NUEVA DECISION CUANDO CORRESPONDA
```

La tarea no inventa una transición principal exacta de retorno que las fuentes no hayan definido.

---

#### 28. Cambio material postaprobación y `VPROC-0021.EX-003`

Después de una aprobación válida y antes de la emisión, un cambio material conserva:

```text
VPROC-0021.EX-003 — REQUEST_INFO
```

Regla:

```text
VERSION A APROBADA
→ CAMBIO MATERIAL
→ VERSION B
→ APROBACION A NO AUTORIZA B
→ NUEVA REVISION / NUEVA DECISION SEGUN POLITICA
```

Queda prohibido:

```text
APPROVED
→ EDITAR PROVEEDOR / IMPORTE / LINEAS
→ CONSERVAR APROBACION ANTERIOR
→ EMITIR
```

---

#### 29. Materialidad de cambios

Esta tarea no inventa una lista cerrada de cambios no materiales.

Como mínimo, una huella lógica de aprobación debe poder distinguir cambios en:

- proveedor;
- líneas;
- cantidades;
- unidades o presentaciones;
- precios;
- moneda;
- impuestos o condiciones que alteren el total;
- fecha o condición de entrega material;
- sede o centro de costo;
- contrato;
- anticipo;
- urgencia o excepción;
- información de transporte cuando sea material;
- otras dimensiones declaradas materiales por la política.

Ante ambigüedad:

```text
FAIL CLOSED
→ REVISION
```

---

#### 30. Versión evaluada

La decisión siempre se liga a una versión exacta:

```text
VERSION_REVISADA
=
VERSION_DECIDIDA
```

Si la orden cambia mientras está abierta en la bandeja:

```text
VERSION_DESACTUALIZADA
→ BLOQUEAR EFECTO
→ RECARGAR / REEVALUAR
```

Nunca:

```text
APROBAR VERSION 7
→ APLICAR SOBRE VERSION 8
```

---

#### 31. Concurrencia

Dos aprobadores, dos pestañas, dos dispositivos o un retry concurrente no pueden producir decisiones incompatibles.

La frontera autoritativa debe comprobar estado y versión esperados antes del efecto.

Ejemplo:

```text
ACTOR A REVISA VERSION 7
ACTOR B PRODUCE VERSION 8
ACTOR A INTENTA DECIDIR VERSION 7
→ STALE_VERSION / CONFLICT
→ CERO EFECTO SOBRE VERSION 8
```

---

#### 32. Idempotencia de la decisión

La solicitud de decisión adopta el contrato transversal de idempotencia.

Resultados lógicos preservados:

```text
APPLIED
DUPLICATE_RESULT_RETURNED
CONFLICTING_REUSE
IN_PROGRESS_RECOVERABLE
STALE_VERSION
OUT_OF_ORDER_DEFERRED
RECONCILIATION_REQUIRED
REJECTED
```

Reglas:

1. la misma identidad con el mismo contenido lógico no produce dos aprobaciones;
2. un replay exitoso devuelve el resultado durable original;
3. reutilización con contenido incompatible produce conflicto;
4. una idempotency key conocida no concede autoridad;
5. cada intento revalida actor, permiso, alcance, estado y versión;
6. una respuesta perdida no justifica una segunda decisión independiente.

---

#### 33. Resultado desconocido y reintento

La frontera puede distinguir resultados técnicos como:

```text
REJECTED_AUTHORIZATION
ACCEPTED_PENDING
EFFECT_CONFIRMED
PRIOR_RESULT_REPLAYED
CONFLICT
RESULT_UNKNOWN
PARTIALLY_APPLIED
RECONCILIATION_REQUIRED
```

Reglas UX:

- `EFFECT_CONFIRMED` puede mostrarse como aprobación confirmada solo si el efecto durable corresponde a `VPROC-0021.TR-003`;
- `PRIOR_RESULT_REPLAYED` muestra el resultado durable previo;
- `CONFLICT` no se presenta como aprobación;
- `RESULT_UNKNOWN` bloquea preparación/emisión hasta reconciliar;
- un HTTP exitoso o ACK técnico no equivale por sí solo a decisión confirmada.

---

#### 34. Aprobación no equivale a emisión

Regla central:

```text
APPROVE
!=
SEND
!=
ORDER_ISSUED
```

Después de `APPROVED`, el proceso continúa mediante:

```text
VPROC-0021.TR-004
APPROVED
→ ORDER_PREPARING

VPROC-0021.TR-005
ORDER_PREPARING
→ ORDER_ISSUED
```

Aprobar no envía al proveedor ni genera por sí solo evidencia de emisión.

---

#### 35. Emisión debe conservar la versión aprobada

La preparación posterior a aprobación debe construir el instrumento que corresponde a la versión autorizada.

Regla:

```text
VERSION APROBADA
→ ORDER_PREPARING
→ VERSION EMITIDA IDENTIFICABLE
```

No:

```text
VERSION A APROBADA
→ EDITAR A B
→ EMITIR B CON APROBACION A
```

La evidencia de emisión pertenece a la transición posterior y no a la decisión de aprobación.

---

#### 36. Confirmación del proveedor y compromiso

Después de emitir se preserva:

```text
VPROC-0021.TR-006
ORDER_ISSUED
→ SUPPLIER_ACK_PENDING

VPROC-0021.TR-007
SUPPLIER_ACK_PENDING
→ PURCHASE_COMMITMENT_FORMALIZED
```

La confirmación del proveedor:

- no sustituye aprobación interna;
- no puede ampliar unilateralmente líneas, precio o condiciones;
- no representa recepción física;
- no crea obligación económica definitiva por sí sola.

---

#### 37. Aprobación no equivale a recepción

Una decisión positiva no produce:

```text
RECEIPT_EXPECTED
ARRIVAL_REGISTERED
RECEIPT_RECONCILED
```

La recepción comienza sobre una compra/entrega elegible y correlacionada conforme a `VPROC-0022`.

Una compra rechazada o retenida antes de emisión no puede aparecer como entrega normalmente esperada por la sola existencia de la propuesta.

---

#### 38. Datos sensibles

La decisión puede necesitar precios, importes, presupuesto, condiciones comerciales, contratos y riesgo.

Pero:

```text
purchase_orders.approve
!=
ACCESO IRRESTRICTO A TODO DATO SENSIBLE
```

La proyección debe ser suficiente para decidir y mínima para la finalidad.

La protección final de precios y datos sensibles permanece en `ORIGO-AUTH-010` y `ORIGO-UX-012`.

---

#### 39. Territorio y centro de costo

La decisión se ejerce sobre una orden concreta y su alcance real.

No bastan como autoridad:

- `site_id` enviado por cliente;
- una sede visible;
- un centro de costo escrito en formulario;
- conocer el `purchase_order_id`;
- estar relacionado con otra sede de la orden.

La resolución exacta de territorio y centro de costo permanece propietaria de `ORIGO-AUTH-009`.

---

#### 40. Dispositivo compartido

Un dispositivo compartido no se convierte en aprobador por sesión, PIN, estación o rol operativo.

La ejecución futura debe resolver, como mínimo:

```text
principal
actor humano efectivo
permiso exacto
autoridad funcional
segregacion
recurso
politica vigente
version
```

Sin actor humano y autoridad administrativa válidos, la decisión falla cerrada.

---

#### 41. Simulación

Una simulación puede explicar:

- política aplicable;
- razones;
- bloqueos;
- resultado hipotético.

Pero conserva:

```text
SIMULATE_APPROVAL
→ ZERO BUSINESS WRITES
→ ZERO ORDER_STATE_MUTATION
→ ZERO SEND
```

Una simulación favorable no es aprobación real, rechazo real ni devolución real.

---

#### 42. Estados de experiencia

La experiencia puede distinguir, como proyección no persistente:

| Estado UX | Significado | Tratamiento |
| --- | --- | --- |
| `LISTO` | compra elegible para decisión | mostrar acciones autorizadas |
| `SIN_PENDIENTES` | no existen decisiones visibles en alcance | estado vacío real |
| `SIN_AUTORIDAD` | recurso visible sin capacidad de decidir | no serializar acción protegida |
| `CONFLICTO_DE_SEGREGACION` | actor incompatible con la decisión | bloquear efecto |
| `EVIDENCIA_INCOMPLETA` | falta soporte exigido | consulta sí; aprobación no |
| `VERSION_DESACTUALIZADA` | cambió el contenido evaluado | recargar y reevaluar |
| `POLITICA_NO_RESUELTA` | no existe decisión de política concluyente | fail-closed |
| `RESULTADO_DESCONOCIDO` | efecto técnico no reconciliado | bloquear continuidad |
| `FALLO_TECNICO` | fuente o servicio falló | no convertir en vacío ni rechazo |

Estas etiquetas UX no son estados nuevos de `VPROC-0021`.

---

#### 43. Errores y bloqueos

La experiencia debe distinguir al menos:

```text
NO_SESSION
NO_APP_ACCESS
MISSING_APPROVE_PERMISSION
APPROVER_AUTHORITY_INVALID
RESOURCE_NOT_ELIGIBLE
STATE_NOT_APPROVABLE
VERSION_MISMATCH
POLICY_NOT_SATISFIED
SEGREGATION_CONFLICT
OUT_OF_SCOPE
TERRITORY_INVALID
EVIDENCE_INCOMPLETE
CONFLICT
RESULT_UNKNOWN
TECHNICAL_FAILURE
```

No deben colapsarse:

```text
DENY
!=
REJECT BUSINESS DECISION
!=
HOLD
!=
STALE VERSION
!=
TECHNICAL FAILURE
```

---

#### 44. Eventos empresariales

`VPROC-0021` conserva los eventos ya aprobados:

```text
VPROC-0021.EVT-001
VPROC-0021.EVT-002
VPROC-0021.EVT-003
VPROC-0021.EVT-004
VPROC-0021.EVT-005
VPROC-0021.EVT-006
```

No existe una definición normal de evento dedicada a `APPROVED` en el catálogo consumido.

Por tanto, esta tarea no inventa eventos como:

```text
purchase-approved
purchase-rejected
purchase-returned
```

La aprobación se demuestra mediante `VPROC-0021.TR-003`, estado resultante y auditoría; los resultados excepcionales conservan sus contratos propietarios.

---

#### 45. Auditoría de decisión

La auditoría de `VPROC-0021` debe permitir reconstruir, cuando aplique:

- solicitud y necesidad;
- sourcing y proveedor;
- líneas e importes;
- versión;
- actor y principal;
- autoridad y alcance;
- política aplicada;
- segregación;
- decisión y razones;
- urgencia o excepción;
- HOLD, REQUEST_INFO o REJECT;
- reintentos, conflictos y resultados desconocidos;
- cambios posteriores;
- emisión y confirmación externa;
- correlación con recepción y conciliación posteriores.

Las denegaciones técnicas o de autorización también conservan evidencia según el contrato transversal.

---

#### 46. Contraste AS-IS de vento-origo

El runtime observado no materializa una superficie dedicada equivalente a `VSCREEN-0074`.

La acción cercana observada es:

```text
setPurchaseOrderSent(id)
```

con transición simplificada:

```text
draft
→ sent
```

En la acción inspeccionada no se demuestra de forma integral:

- `origo.procurement.purchase_orders.approve`;
- actor aprobador;
- política de aprobación;
- segregación;
- transición `PENDING_APPROVAL -> APPROVED`;
- versión exacta aprobada;
- razón/decisión;
- rechazo/devolución gobernados;
- separación entre aprobación y emisión.

---

#### 47. No elevar el AS-IS a contrato objetivo

Quedan prohibidas equivalencias como:

```text
draft = PENDING_APPROVAL
sent = APPROVED
sent = ORDER_ISSUED correctamente
received = proceso completo
```

También:

```text
setPurchaseOrderSent
=
APROBAR + PREPARAR + EMITIR
```

El runtime actual es evidencia parcial y colapsada; no define el lifecycle objetivo.

---

#### 48. Hallazgos y propietarios

| Hallazgo | Impacto | Propietario | Condición de salida |
| --- | --- | --- | --- |
| no existe `VSCREEN-0074` materializada | aprobación puede quedar implícita en detalle/envío | materialización UX consumiendo `ORIGO-UX-005/008` | bandeja dedicada separa consulta, decisión y emisión |
| `setPurchaseOrderSent` colapsa `draft -> sent` | aprobación y emisión pueden confundirse | `ORIGO-AUTH-014` + package propietario + materialización UX | `TR-003`, `TR-004` y `TR-005` quedan materialmente distinguibles |
| no se demuestra permission check exacto de aprobación en acción AS-IS | acceso a ORIGO podría aparentar autoridad | `ORIGO-AUTH-014` + consumer | decisión revalida `purchase_orders.approve` server-side |
| rechazo/devolución no tienen estados principales propios | riesgo de inventar aliases persistentes | materialización de `ORIGO-UX-008` + propietario de `VPROC-0021` | EX-002/EX-004 se representan con evidencia sin nuevos estados |
| versión evaluada no está materializada integralmente en UX AS-IS | stale approval sobre contenido modificado | implementación propietaria | decisión compara versión esperada y falla cerrado |
| no existen umbrales numéricos cerrados en esta tarea | riesgo de hardcode arbitrario | política/configuración propietaria de compras | umbrales versionados y probados antes de enforcement |
| urgencia puede confundirse con bypass | compra expedita sin autoridad suficiente | política propietaria + materialización de `EX-001` | causa, límites, autoridad, regularización y auditoría quedan exigibles |
| datos sensibles e importes requieren minimización | exposición excesiva en bandeja | `ORIGO-AUTH-010`, `ORIGO-UX-012` | field masks y finalidad gobiernan proyección |

No queda un hallazgo narrativo sin propietario y condición de salida.

---

#### 49. Handoff inmediato a ORIGO-UX-009

`ORIGO-UX-009 — Diseñar recepción total` recibe una frontera estricta:

```text
APROBACION CONFIRMADA
!=
EMISION
!=
COMPROMISO FORMALIZADO
!=
RECEPCION
```

Para que una recepción total pueda existir debe haber una compra/entrega elegible y correlacionable conforme al lifecycle posterior, con identidad estable de orden/compromiso, proveedor, destino, líneas, cantidades y versión.

Una propuesta:

```text
REJECT
HOLD
RESULT_UNKNOWN
CONFLICT
VERSION_DESACTUALIZADA
```

no puede generar una recepción total normal por la sola existencia del registro de compra.

---

#### 50. Handoff al resto de ORIGO-UX

| Tarea | Entrada exacta proveniente de ORIGO-UX-008 |
| --- | --- |
| `ORIGO-UX-009` | recepción total consume compra/entrega elegible; aprobación aislada no equivale a recepción |
| `ORIGO-UX-010` | recepción parcial conserva versión emitida y saldo por línea; rechazo o HOLD no generan saldo recibible normal |
| `ORIGO-UX-011` | diferencias comparan contra versión/condiciones efectivamente autorizadas y emitidas, sin reescribir la decisión histórica |
| `ORIGO-UX-012` | proyección de precios/importes/condiciones al aprobador y seguimiento respeta finalidad y field masks |
| `ORIGO-UX-013` | aprobación o recepción ORIGO no producen una segunda recepción manual en NEXO |
| `ORIGO-UX-014` | entrada física NEXO deriva de recepción aceptada, no de aprobación aislada |
| `ORIGO-UX-015` | aprobación o emisión pueden informar compromiso financiero, pero no crean obligación/pago definitivo |
| `ORIGO-UX-016` | prototipo demuestra creación → decisión → preparación/emisión → recepción con versiones, actores y evidencias separadas |

---

#### 51. Requisitos de prueba derivados

**Resultado:** NO GENERA REQUISITOS DE PRUEBA.

**Requisitos creados:** 0
**Requisitos modificados:** 0
**Requisitos diferidos:** 0
**Requisitos obsoletos:** 0

Justificación: autorización exacta, segregación, mutaciones server-side, versionado de órdenes, rechazo/devolución gobernados, idempotencia, concurrencia, auditoría, urgencia/excepción y separación entre aprobación, emisión y recepción ya están cubiertos por obligaciones canónicas vigentes. Esta tarea especializa la experiencia de decisión de `VSCREEN-0074` sin crear una obligación empresarial nueva ni modificar el Registro 04A.

---

#### 52. Cobertura de prueba vigente reutilizada

Se reutiliza sin modificación:

- `TREQ-ORIGO-002` para limitar lectura y mutación de órdenes por permiso, territorio, estado y columnas y proteger documentos externos;
- `TREQ-ORIGO-004` para separar necesidad, sourcing, selección, aprobación, orden y recepción, impedir autoaprobación y exigir revisión/versionado ante cambios materiales;
- `TREQ-ORIGO-005` para preservar proveedor, condiciones, precio, moneda, impuestos, descuentos, flete, mínimos, plazo, pago, fuente, versión y vigencia;
- `TREQ-AUTH-001` para resolver la autorización mediante permiso, contexto y alcance canónicos;
- `TREQ-AUTH-002` para impedir consumo físico de una permission key no incorporada al catálogo vigente;
- `TREQ-AUTH-010` para preservar segregación de funciones;
- `TREQ-AUTH-013` para revalidar server-side permiso exacto, actor, territorio, estado y columnas permitidas;
- `TREQ-AUTH-014` para impedir que contexto o decisiones obsoletas sigan autorizando efectos;
- `TREQ-AUTH-015` para conservar evidencia correlacionable de actor, permiso, recurso, decisión, razones, versión y timestamp.

Estas referencias son cobertura vigente y no constituyen una actualización del registro.

---

#### 53. Evidencia de validación

| Clase | Estado | Evidencia |
| --- | --- | --- |
| BUILD | NOT_EXECUTED | `docs:plan:build` corresponde al checkout local después de incorporar el artefacto. |
| LOCAL | NOT_EXECUTED | Formato, quality, delivery, topología, EOL, TREQ, batería global y lifecycle quedan pendientes del checkout local. |
| REMOTA | PASS | Se verificaron `vento-shell/main@841d0b455e2567fa0b5ef11cb48f07da8904989f`, owner blob `f1d87caf21d5ea56bcea224c2c7af8c30dd968ae`, topología `DEFINE_ONCE / NO_PHYSICAL_INSTANCE`, `VSCREEN-0074/0075`, `VPROC-0021`, `TR-001..007`, `EX-001..004`, permiso `purchase_orders.approve`, actores aprobadores, segregación, cobertura territorial/sensible, 04A ORIGO/AUTH y runtime AS-IS `draft -> sent`. La entrada inmediata 007 se consume desde el artefacto completo aprobado por el usuario. |
| OPERATIVA | NOT_EXECUTED | No se aprobaron, rechazaron, devolvieron, emitieron ni recibieron compras reales; no se probaron usuarios, políticas, sedes, proveedores, concurrencia ni reintentos reales. |
| FÍSICA | NOT_APPLICABLE | `ORIGO-UX-008` no crea instancia física propia ni autoriza cambios de producto, datos o infraestructura. |

---

#### 54. Criterios de aceptación

La tarea queda documentalmente completa cuando:

- [ ] `VSCREEN-0074` queda como superficie canónica de decisión y no como editor general;
- [ ] `VSCREEN-0075` queda como contexto autorizado de detalle y seguimiento;
- [ ] `VPROC-0021::STEP-APPROVE_PURCHASE` queda preservado;
- [ ] `origo.procurement.purchase_orders.approve` queda como única identity key de autoridad definida para el punto de decisión;
- [ ] no se crean `.reject`, `.return` ni `.send`;
- [ ] la capacidad permanece `BASE_ONLY`;
- [ ] `GERENCIA_GENERAL` y `COORDINACION_DE_OPERACIONES` permanecen autoridades funcionales de aprobación;
- [ ] solicitante, comprador, aprobador y receptor permanecen funciones separadas;
- [ ] `PENDING_APPROVAL -> APPROVED` usa exactamente `VPROC-0021.TR-003`;
- [ ] `APPROVED` no equivale a `ORDER_PREPARING` ni `ORDER_ISSUED`;
- [ ] la decisión usa una versión exacta y reproducible;
- [ ] política, territorio, importe, riesgo, urgencia y evidencia se resuelven antes del efecto cuando apliquen;
- [ ] un conflicto de segregación bloquea la decisión;
- [ ] una compra ordinaria no puede usar `create -> autoapprove -> send`;
- [ ] la urgencia conserva `VPROC-0021.EX-001` y no se convierte en bypass;
- [ ] autoaprobación solo existe bajo excepción explícita, acotada y auditada;
- [ ] aprobación conserva actor, política, versión, decisión y timestamp;
- [ ] rechazo consume `VPROC-0021.EX-004` con motivo y notificación;
- [ ] rechazo no inventa `VPROC-0021.REJECTED`;
- [ ] rechazo se diferencia de CANCEL, VOID, REVERSE y RESTATE;
- [ ] devolución para ajuste consume `VPROC-0021.EX-002 — HOLD` sin inventar `RETURNED_FOR_CHANGES`;
- [ ] la reanudación después de devolución exige revalidación y nueva versión cuando corresponda;
- [ ] cambio material postaprobación consume `VPROC-0021.EX-003 — REQUEST_INFO` y no reutiliza ciegamente la aprobación anterior;
- [ ] ante materialidad ambigua se falla cerrado;
- [ ] versión obsoleta bloquea la decisión;
- [ ] concurrencia no permite aplicar una decisión sobre una versión distinta;
- [ ] reintento/idempotencia no duplican aprobación o rechazo;
- [ ] `RESULT_UNKNOWN` bloquea preparación/emisión hasta reconciliar;
- [ ] `TR-004` y `TR-005` permanecen posteriores y separadas de la aprobación;
- [ ] la versión emitida corresponde al contenido autorizado;
- [ ] confirmación de proveedor no sustituye aprobación ni recepción;
- [ ] aprobación no produce recepción, stock ni obligación financiera definitiva;
- [ ] datos sensibles se minimizan por finalidad;
- [ ] `site_id` o centro de costo enviado por cliente no conceden territorio;
- [ ] dispositivo compartido no concede autoridad administrativa por inferencia;
- [ ] simulación produce cero writes;
- [ ] los estados UX no se persisten como estados nuevos de `VPROC-0021`;
- [ ] deny, rechazo empresarial, HOLD, stale y fallo técnico permanecen distinguibles;
- [ ] no se inventan eventos empresariales de aprobación/rechazo/devolución;
- [ ] el AS-IS `draft -> sent` no se eleva a contrato objetivo;
- [ ] cada hallazgo tiene propietario y condición de salida;
- [ ] `ORIGO-UX-009` recibe una frontera limpia hacia recepción total;
- [ ] no se crean ni modifican requisitos de prueba;
- [ ] no se ejecutan cambios físicos desde esta tarea.

---

#### 55. Límites

Esta tarea no:

- implementa `VSCREEN-0074` ni `VSCREEN-0075`;
- crea rutas, componentes o Server Actions;
- crea permission keys nuevas;
- activa `purchase_orders.approve` en catálogo o grants;
- crea `.reject`, `.return` o `.send`;
- crea estados nuevos de `VPROC-0021`;
- define umbrales numéricos de aprobación;
- concede autoaprobación;
- modifica una orden real;
- aprueba o rechaza una compra real;
- devuelve una compra real;
- emite o envía una orden real;
- confirma respuesta de proveedor;
- registra recepción;
- mueve inventario;
- crea obligación, asiento o pago;
- modifica `vento-origo`;
- modifica Supabase, migraciones, RLS, RPC, grants, Storage o datos;
- modifica contratos generados;
- modifica el Registro 04A;
- ejecuta E5;
- crea instancia física;
- desarrolla `ORIGO-UX-009`.

---

#### 56. Continuidad

**ÚLTIMA TAREA APROBADA**
`ORIGO-UX-007 — Diseñar creación de orden de compra`

**TAREA ACTUAL APROBADA**
`ORIGO-UX-008 — Diseñar aprobación y rechazo`

**SIGUIENTE TAREA RESERVADA**
`ORIGO-UX-009 — Diseñar recepción total`
### ✅ ORIGO-UX-009 — Diseñar recepción total

**Estado:** APROBADA
**Tarea anterior:** ORIGO-UX-008 — Diseñar aprobación y rechazo
**Tarea siguiente:** ORIGO-UX-010 — Diseñar recepción parcial
**Tipo de tarea:** diseño documental integral de la experiencia de recepción total sobre `VSCREEN-0077` y `VPROC-0022`, definiendo entrada elegible, captura física y documental por línea/presentación, cierre del saldo recibible, aceptación total mediante `VPROC-0022.TR-007`, idempotencia, concurrencia, modalidad `inventory`/`record_only` y handoffs correlacionados hacia NEXO y NUMERA, sin convertir aceptación en movimiento físico, conciliación económica ni cierre artificial de la compra; `DEFINE_ONCE` / `NO_PHYSICAL_INSTANCE`
**Bloque:** BLOQUE M — ORIGO
**Repositorio propietario:** `vento-group-sas/vento-shell`
**Archivo propietario:** `docs/plan-canonico/modular/bloques/M_ORIGO/02_EXPERIENCIA_DE_COMPRAS.md`
**Estado físico resultante:** `NO_PHYSICAL_INSTANCE`
**Cambios físicos autorizados:** ninguno; esta tarea no modifica código, navegación, componentes, procesos, permisos, roles, grants, datos, tablas, RLS, RPC, migraciones, Supabase, Storage, packages, consumidores ni despliegues
**Requisitos de prueba creados o modificados:** 0

---

#### 1. Propósito

Diseñar el contrato de experiencia para registrar una **recepción total** de compra en ORIGO, de forma que el receptor pueda:

- partir de una compra o entrega elegible y correlacionable;
- preservar la identidad de la orden o compromiso y de cada recepción previa;
- comparar por línea lo esperado contra lo observado sin reescribir el pedido;
- capturar producto, presentación, cantidad, lote, vencimiento, condición y documentos cuando apliquen;
- distinguir llegada, verificación física, verificación documental y aceptación;
- determinar si la recepción cubre todo el saldo recibible pendiente del alcance relacionado;
- bloquear el cierre total ante diferencias, datos maestros pendientes, evidencia insuficiente, versión obsoleta o resultado incierto;
- aceptar el alcance total únicamente mediante la transición canónica correspondiente;
- producir los handoffs posteriores sin apropiarse de la verdad física de NEXO ni de la verdad económica de NUMERA;
- conservar idempotencia, auditoría, concurrencia y recuperación ante reintentos.

La tarea diseña la experiencia objetivo sobre:

```text
VSCREEN-0077 — Recepción total o parcial
VPROC-0022    — Recibir compras, verificar conformidad y resolver diferencias
```

No implementa la superficie ni modifica autorización física.

---

#### 2. Entrada aprobada de ORIGO-UX-008

`ORIGO-UX-008` entrega una frontera estricta:

```text
APROBACION CONFIRMADA
!=
EMISION
!=
COMPROMISO FORMALIZADO
!=
RECEPCION
```

La recepción total consume una compra/entrega elegible y correlacionable con:

- identidad estable de orden o compromiso;
- proveedor;
- destino;
- líneas;
- cantidades;
- versión vigente;
- evidencia suficiente.

Los resultados:

```text
REJECT
HOLD
RESULT_UNKNOWN
CONFLICT
VERSION_DESACTUALIZADA
```

no generan por sí solos una recepción total normal.

---

#### 3. Naturaleza y topología

La topología vigente de `ORIGO-UX-001..016` establece:

```text
mode = DEFINE_ONCE
execution_gate = NO_PHYSICAL_INSTANCE
```

Consecuencias:

1. `ORIGO-UX-009` se define una sola vez;
2. no existe una instancia física propia de esta tarea;
3. no se crea ni modifica una ruta o componente de `vento-origo`;
4. no se implementan Server Actions, RPC, RLS, migraciones, tablas ni contratos de eventos;
5. las brechas AS-IS se documentan con propietario y condición de salida;
6. la materialización posterior debe consumir este contrato sin convertir recepción en inventario, pago o conciliación automática.

---

#### 4. Fuentes verificadas

El diseño consume y conserva:

- `ORIGO-UX-001 — Inventariar el proceso completo de abastecimiento`;
- `ORIGO-UX-002 — Separar solicitud, compra, aprobación y recepción`;
- `ORIGO-UX-005 — Diseñar inicio para aprobador`;
- `ORIGO-UX-006 — Diseñar inicio para receptor`;
- `ORIGO-UX-007 — Diseñar creación de orden de compra`;
- `ORIGO-UX-008 — Diseñar aprobación y rechazo` como base inmediata aprobada;
- `ORIGO-AUTH-004 — Definir permisos de consulta`;
- `ORIGO-AUTH-007 — Definir permisos de recepción`;
- `ORIGO-AUTH-008 — Definir permisos de corrección`;
- `ORIGO-AUTH-009..013` para territorio, sensibilidad, actor, contexto y administración;
- `VPROC-0022` y sus nueve estados canónicos;
- `VPROC-0022.TR-001..009`;
- `VPROC-0022.EX-001..004`;
- `VPROC-0022.CCR-001..004`;
- `VSCREEN-0076`, `VSCREEN-0077` y `VSCREEN-0078`;
- frontera ORIGO–NEXO de `GAP-OWN-004`;
- contratos de integración de recepción, entrada física y conciliación económica;
- Registro 04A vigente de ORIGO y AUTH;
- runtime observado de `src/app/receipts/new/page.tsx` en `vento-origo`;
- `vento-shell/main@d98d8955bf9ab87db3c852885c079790f35abdce` y owner blob `e039a91ed89a7f1e3fc9887feb5073797eba32bc`;
- `vento-origo/main@70860f1ca5f0a4a73e894cbb840956f9f7eda2ad`, con `src/app/receipts/new/page.tsx` blob `0b13c026365cb9eb1be0a9c737f373e6a46635b2`;
- artefacto aprobado `ORIGO-UX-008_APROBADA_PARA_REEMPLAZAR.md` con SHA-256 `148bf2ad96d89430e8d48a7427b42f197f3afd83fb8f5246dda962681ffe4c65` y SHA semántico `54ab6fd828f7bb9abccb6274dc8c48ae6ea7adc8fb957851a598b5c4c9bd642c`.

La base 008 puede permanecer pendiente de publicación durante esta preparación anticipada; esta tarea no altera su lifecycle.

---

#### 5. Identidad canónica de la superficie

La recepción total utiliza la identidad existente:

```text
VSCREEN-0077
Recepción total o parcial
origo
VPROC-0022
OWNER_WORKSPACE
```

Propósito canónico:

```text
REGISTRAR LA RECEPCION FISICA Y DOCUMENTAL
DE UNA COMPRA POR LINEA Y PRESENTACION
```

La tarea no crea una pantalla `VSCREEN-*` adicional.

---

#### 6. Binding de proceso y paso

La superficie se vincula a:

```text
VPROC-0022::STEP-RECEIVE_PURCHASE
```

con interacción:

```text
EXECUTE
IN_PROGRESS
```

La recepción total pertenece a `VPROC-0022`; no reabre `VPROC-0020` ni `VPROC-0021` salvo que una excepción o diferencia exija volver a un owner anterior mediante un flujo gobernado.

---

#### 7. Definición contractual de recepción total

Una recepción es **total** cuando, para el alcance correlacionado que está siendo recibido:

```text
SALDO RECIBIBLE PENDIENTE AL INICIAR
=
ALCANCE OBSERVADO, VERIFICADO Y ACEPTADO
```

Y además:

```text
DIFERENCIAS ABIERTAS = 0
RESIDUAL RECIBIBLE DEL ALCANCE = 0
RESULTADO DE ACEPTACION = CONOCIDO
```

La totalidad se evalúa contra el saldo vigente, no contra una copia histórica desactualizada de la orden.

---

#### 8. Total no significa primera ni única recepción

Una compra puede producir múltiples recepciones legítimas:

```text
1 PURCHASE_COMMITMENT
→ 0..N RECEPCIONES VPROC-0022
```

Por tanto, una recepción puede ser la que **complete el saldo pendiente** después de una o más recepciones parciales anteriores.

Reglas:

- no se borran las recepciones anteriores;
- no se reutiliza la identidad de una recepción anterior;
- no se vuelve a sumar una cantidad ya confirmada;
- completar el saldo no convierte todo el historial en una sola recepción.

`ORIGO-UX-010` desarrolla la experiencia de parcialidad y saldo pendiente.

---

#### 9. Condición de entrada

Para una recepción total ordinaria debe existir, como mínimo:

```text
COMPRA / COMPROMISO ELEGIBLE
+
ENTREGA IDENTIFICABLE
+
PROVEEDOR COHERENTE
+
SEDE RECEPTORA AUTORIZADA
+
LINEAS RECIBIBLES
+
SALDOS VIGENTES
+
ACTOR RECEPTOR ATRIBUIBLE
+
AUTORIDAD OPERATIVA VIGENTE
```

La aprobación aislada no basta. Una orden no emitida, un resultado incierto o una compra rechazada no son entrada normal de recepción total.

---

#### 10. Permiso exacto de registro

La autoridad objetivo es:

```text
origo.procurement.receipts.register
```

Contrato:

```text
RECURSO = PURCHASE_RECEIPT
ACCION = register
MODALIDAD = OPERATIONAL_ONLY
PRERREQUISITO = T+C
```

`receipts.view` no concede registro y `origo.access` no actúa como wildcard.

---

#### 11. Turno, check-in y rol operativo

Para registrar la recepción se exige:

```text
TURNO VIGENTE
+
CHECK-IN ACTIVO
+
ROL OPERATIVO AUTORIZADO
+
SEDE / AREA COMPATIBLES
```

Roles operativos objetivo con concesión:

```text
bodeguero
gerencia_operativa
```

Ningún rol base concede `receipts.register` por sí solo.

---

#### 12. Recurso protegido

La recepción nueva se autoriza sobre:

```text
PURCHASE_RECEIPT
```

Antes de persistirla, el objetivo debe quedar suficientemente determinado como:

```text
RECEIPT_DESTINATION_DRAFT
```

con, según aplique:

- sede;
- área;
- orden/compromiso o causa excepcional;
- proveedor;
- líneas;
- presentación/unidad;
- modalidad;
- actor efectivo.

La recepción persistida conserva `receipt_id` estable.

---

#### 13. Territorio

El territorio no se deriva de un `site_id` enviado por cliente.

La decisión exige:

```text
SEDE AUTORIZADA
+
AREA COMPATIBLE
+
RECURSO COMPATIBLE
+
CONTEXTO OPERATIVO COINCIDENTE
```

Una orden de otra sede, un destino incompatible o un recurso fuera de alcance bloquean la mutación.

---

#### 14. Identidad de la operación

Cada recepción total necesita una identidad de operación estable y distinta de:

- la identidad de la orden;
- la identidad de otras recepciones de la misma compra;
- la identidad de una corrección;
- la identidad de una reversión;
- la identidad del handoff físico posterior.

La misma intención lógica conserva identidad durante retries técnicos; una llegada física distinta crea una nueva identidad correlacionada.

---

#### 15. Snapshot esperado antes de capturar

La experiencia debe presentar un snapshot vigente de:

- orden/compromiso;
- proveedor;
- sede y destino;
- líneas recibibles;
- cantidad ordenada;
- cantidad recibida previamente;
- saldo recibible pendiente;
- presentación/unidad;
- condiciones relevantes;
- documentos esperados;
- versión o referencia estable.

El snapshot es contexto de comparación, no verdad editable por el receptor.

---

#### 16. Lo pedido y lo observado permanecen separados

Regla central:

```text
PEDIDO ORIGINAL
!=
HECHO RECIBIDO
```

Por cada línea se conservan separadamente:

- cantidad ordenada;
- cantidad recibida previamente;
- saldo pendiente;
- cantidad observada en esta recepción;
- presentación esperada;
- presentación observada;
- condición esperada;
- condición observada;
- documentos esperados;
- documentos observados.

No se edita la orden para forzar conformidad.

---

#### 17. Líneas y presentaciones

La recepción total debe operar por línea y presentación identificable.

Como mínimo, cada línea aplicable conserva:

- `purchase_order_item` o referencia equivalente;
- producto;
- presentación/unidad;
- factor de conversión cuando aplique;
- cantidad del saldo pendiente;
- cantidad observada;
- lote y vencimiento cuando aplique;
- condición física;
- evidencia documental asociada.

Una presentación distinta a la pactada no se normaliza silenciosamente como si fuera la misma.

---

#### 18. Criterio cuantitativo de totalidad

Para cada línea del alcance total:

```text
CANTIDAD OBSERVADA Y ACEPTADA EN ESTA RECEPCION
=
SALDO RECIBIBLE VIGENTE DE LA LINEA
```

La comparación debe usar la unidad/presentación gobernada y sus conversiones aprobadas.

Quedan prohibidos:

```text
RECIBIDO > SALDO
→ MARCAR TOTAL SIN DIFERENCIA
```

Y:

```text
RECIBIDO < SALDO
→ MARCAR TOTAL
```

Exceso, faltante o sustitución pertenecen al tratamiento de diferencias o parcialidad según corresponda.

---

#### 19. Llegada y apertura de verificación

El lifecycle conserva:

```text
VPROC-0022.TR-001
RECEIPT_EXPECTED
→ ARRIVAL_REGISTERED

VPROC-0022.TR-002
ARRIVAL_REGISTERED
→ PHYSICAL_CHECK_IN_PROGRESS
```

`ARRIVAL_REGISTERED` solo confirma que la llegada fue identificada; todavía no declara conformidad ni aceptación.

---

#### 20. Verificación física

La verificación física debe preservar, según aplique:

- producto;
- presentación;
- cantidad;
- lote;
- vencimiento;
- condición;
- temperatura;
- integridad de empaque;
- observaciones relevantes.

El hecho observado permanece aunque después exista rechazo, diferencia, cuarentena o corrección.

---

#### 21. Verificación documental

La transición:

```text
VPROC-0022.TR-003
PHYSICAL_CHECK_IN_PROGRESS
→ DOCUMENT_CHECK_IN_PROGRESS
```

permite contrastar, según aplique:

- orden/compromiso;
- factura;
- remisión;
- certificados;
- referencias contractuales;
- cantidades y unidades;
- condiciones comerciales necesarias para decidir recepción.

La verificación documental no sustituye la física.

---

#### 22. Ruta limpia sin diferencias

Para una recepción total sin discrepancias se conserva:

```text
VPROC-0022.TR-005
DOCUMENT_CHECK_IN_PROGRESS
→ ACCEPTANCE_PENDING
```

con:

```text
NORMAL_BYPASS
OMISION_JUSTIFICADA DE DIFFERENCE_UNDER_REVIEW
```

El bypass solo aplica cuando no existe una diferencia que requiera tratamiento.

---

#### 23. Diferencia detectada

Si aparece una diferencia material:

```text
VPROC-0022.TR-004
DOCUMENT_CHECK_IN_PROGRESS
→ DIFFERENCE_UNDER_REVIEW
```

La experiencia de recepción total deja de poder confirmar un cierre limpio mientras la diferencia permanezca abierta.

Si la diferencia queda tratada de forma gobernada y el alcance vuelve a ser elegible para decisión, se conserva:

```text
VPROC-0022.TR-006
DIFFERENCE_UNDER_REVIEW
→ ACCEPTANCE_PENDING
```

La recepción solo puede volver al carril de aceptación total cuando el tratamiento deja cero diferencias abiertas sobre el alcance que se pretende aceptar totalmente.

`ORIGO-UX-011` conserva el diseño de cantidad, calidad, precio, documento o presentación discrepantes.

---

#### 24. Excepciones antes de aceptación

Se preservan exactamente las acciones excepcionales de `VPROC-0022`:

```text
VPROC-0022.EX-001 — QUARANTINE
VPROC-0022.EX-002 — HOLD
VPROC-0022.EX-003 — ESCALATE
VPROC-0022.EX-004 — REJECT
```

Reglas para recepción total:

- `QUARANTINE` impide representar los bienes como aceptados y utilizables mientras la condición permanezca abierta;
- `HOLD` suspende la decisión y mantiene evidencia y mercancía segregadas según corresponda;
- `ESCALATE` aumenta el nivel de decisión sin conceder aceptación por sí mismo;
- `REJECT` conserva llegada, motivo, evidencia y tratamiento de retorno, y no se transforma en total aceptada.

Ninguna excepción se resuelve editando el hecho observado para forzar conformidad.

---

#### 25. `ACCEPTANCE_PENDING`

El estado:

```text
VPROC-0022.ACCEPTANCE_PENDING
```

significa que la recepción fue verificada y espera decisión.

No significa:

- aceptación tácita;
- stock disponible;
- putaway confirmado;
- obligación económica definitiva;
- pago autorizado.

---

#### 26. Decisión de aceptación total

La transición autoritativa es:

```text
VPROC-0022.TR-007
ACCEPTANCE_PENDING
→ PUTAWAY_PENDING
```

Clase:

```text
CONTROL_ACEPTACION
```

Para una recepción total, la decisión debe cubrir exactamente todas las líneas del alcance correlacionado que completan el saldo recibible pendiente.

---

#### 27. Condiciones para confirmar aceptación total

La acción de aceptación total solo puede proceder cuando, como mínimo:

```text
ACTOR Y AUTORIDAD VALIDOS
AND
RECURSO Y TERRITORIO VALIDOS
AND
ESTADO ELEGIBLE
AND
VERSION / SNAPSHOT VIGENTES
AND
TODAS LAS LINEAS DEL ALCANCE VERIFICADAS
AND
SALDO DEL ALCANCE = 0 DESPUES DE ESTA RECEPCION
AND
DIFERENCIAS ABIERTAS = 0
AND
EVIDENCIA REQUERIDA COMPLETA
AND
RESULTADO DE LA OPERACION CONOCIDO
```

Cualquier ambigüedad falla cerrado.

---

#### 28. Total no equivale a cierre final de VPROC-0022

Después de aceptar totalmente:

```text
PUTAWAY_PENDING
```

El proceso todavía puede requerir:

```text
VPROC-0022.TR-008
PUTAWAY_PENDING
→ ECONOMIC_RECONCILIATION_PENDING

VPROC-0022.TR-009
ECONOMIC_RECONCILIATION_PENDING
→ RECEIPT_RECONCILED
```

Por tanto:

```text
RECEPCION TOTAL ACEPTADA
!=
RECEIPT_RECONCILED
```

---

#### 29. Frontera con NEXO

Se conserva:

```text
VPROC-0022 / ORIGO
ACEPTACION COMERCIAL Y DOCUMENTAL
        ↓
VPROC-0022.PUTAWAY_PENDING
        ↓
VPROC-0024 / NEXO
ENTRADA, UBICACION Y CUSTODIA FISICA
```

Regla:

```text
ACEPTACION TOTAL ORIGO
!=
STOCK DISPONIBLE NEXO
```

El hecho normal de handoff es:

```text
VPROC-0022.EVT-004
vento.process.vproc-0022.putaway-pending.v1
```

---

#### 30. Frontera con NUMERA

La recepción total tampoco reconoce por sí sola una obligación económica definitiva.

Se conserva:

```text
VPROC-0022.ECONOMIC_RECONCILIATION_PENDING
```

Y el hecho:

```text
VPROC-0022.EVT-005
vento.process.vproc-0022.economic-reconciliation-pending.v1
```

La recepción aceptada se correlaciona con factura, obligación y diferencias; no ejecuta pago.

---

#### 31. Modalidad `inventory`

La modalidad AS-IS `inventory` representa una recepción que pretende producir efecto físico posterior.

Contrato objetivo:

```text
ORIGO
→ REGISTRA / VERIFICA / ACEPTA

NEXO
→ MATERIALIZA ENTRADA / UBICACION / CUSTODIA
```

La UX no presenta las escrituras físicas actuales de ORIGO como ownership objetivo.

---

#### 32. Modalidad `record_only`

La modalidad `record_only` conserva un hecho empresarial sin movimiento de inventario.

Regla:

```text
SIN MOVIMIENTO DE INVENTARIO
!=
SIN AUTORIZACION
```

También requiere `receipts.register`, actor efectivo, `T+C`, territorio y evidencia.

No puede utilizarse para simular que una recepción inventariable ya produjo el efecto físico requerido.

---

#### 33. Recepción directa o de emergencia

Una recepción total sin orden ordinaria solo puede existir bajo un carril gobernado que conserve:

```text
receipts.register VALIDO
+
T+C
+
SEDE / AREA AUTORIZADAS
+
ACTOR EFECTIVO
+
PROVEEDOR Y LINEAS VALIDOS
+
CAUSA OBLIGATORIA
+
EVIDENCIA
+
REGULARIZACION APLICABLE
```

No se fabrica una aprobación histórica ni un compromiso inexistente.

---

#### 34. Datos maestros pendientes

Si una línea requiere producto o presentación nueva pendiente de revisión, la recepción puede conservar la observación y el handoff de maestro, pero no debe presentarse como cierre total limpio mientras la dependencia impida demostrar conformidad completa.

Regla:

```text
MASTER DATA PENDING
!=
TOTAL ACEPTADA SIN BLOQUEO
```

La aprobación del maestro conserva owner y autoridad propios.

---

#### 35. Lotes, vencimientos y condición

Cuando el producto lo exige, una recepción total debe conservar:

- lote;
- vencimiento;
- condición;
- temperatura u otra medición aplicable;
- evidencia de inspección.

La cantidad completa no compensa una condición no aceptable.

```text
CANTIDAD COMPLETA
!=
CONFORMIDAD COMPLETA
```

---

#### 36. Documentos

La totalidad exige la documentación requerida por el caso.

Una factura, remisión o certificado faltante no se sustituye por una marca visual de “completo”.

La UX debe diferenciar:

```text
DOCUMENTO AUSENTE
DOCUMENTO PRESENTE
DOCUMENTO VERIFICADO
DOCUMENTO CON DIFERENCIA
```

sin crear estados principales nuevos de `VPROC-0022`.

---

#### 37. Precios y costos

La recepción puede necesitar precio/costo aplicable para verificar o correlacionar, pero el receptor recibe únicamente la proyección necesaria.

`receipts.register` no concede acceso irrestricto a:

- contratos completos;
- cuentas bancarias;
- negociación histórica;
- márgenes;
- datos financieros ajenos a la recepción.

`ORIGO-UX-012` conserva la protección de precios en experiencia.

---

#### 38. Idempotencia

La recepción total adopta el contrato transversal:

```text
APPLIED
DUPLICATE_RESULT_RETURNED
CONFLICTING_REUSE
IN_PROGRESS_RECOVERABLE
STALE_VERSION
OUT_OF_ORDER_DEFERRED
RECONCILIATION_REQUIRED
REJECTED
```

La misma identidad con la misma huella lógica no produce una segunda recepción ni vuelve a sumar cantidades.

---

#### 39. Replay y retry

Un retry técnico:

- conserva identidad de operación;
- no cambia el alcance lógico;
- revalida actor, recurso, estado, territorio y versión;
- devuelve el resultado durable si ya fue aplicado;
- no vuelve a incrementar cantidades recibidas;
- no vuelve a producir movimientos o costos;
- no avanza ante `RESULT_UNKNOWN` sin reconciliación.

---

#### 40. Concurrencia

Dos pestañas, dos dispositivos o dos receptores no pueden cerrar el mismo saldo de manera incompatible.

Antes del efecto se reevalúan:

- saldo pendiente;
- recepción previa concurrente;
- versión;
- estado;
- actor;
- territorio;
- idempotencia.

Si el saldo cambió:

```text
STALE_VERSION / CONFLICT
→ RECARGAR Y REEVALUAR
```

---

#### 41. Cierre técnico de cantidades de orden

El runtime AS-IS observado:

1. acumula `quantity_received` por línea de orden;
2. consulta todas las líneas;
3. considera `allReceived` cuando cada `quantity_received >= quantity_ordered`;
4. actualiza la orden técnica a `status = received`.

Este comportamiento demuestra una noción física de saldo completo, pero no sustituye el lifecycle canónico de `VPROC-0022` ni demuestra por sí solo aceptación comercial, handoff NEXO o conciliación económica.

---

#### 42. Estados técnicos AS-IS no son verdad canónica

El runtime usa:

```text
received
recorded
pending_review
reversed
corrected
```

Y la orden usa:

```text
draft
sent
received
```

Quedan prohibidas equivalencias como:

```text
purchase_orders.status = received
=
RECEIPT_RECONCILED
```

O:

```text
inventory_entries.status = received
=
PUTAWAY CONFIRMADO EN NEXO
```

---

#### 43. Corrección y reversión fuera del alcance

Una recepción total nueva utiliza:

```text
origo.procurement.receipts.register
```

No concede:

```text
origo.procurement.receipts.reverse
```

ni autoridad correctiva general.

Una corrección con sustitución debe conservar recepción original, reversión autorizada, reemplazo correlacionado y consistencia de efectos.

---

#### 44. Resolución de diferencias fuera del alcance

Registrar o detectar una diferencia no concede autoridad para resolverla.

```text
CAPTURAR DIFERENCIA
!=
RESOLVER DIFERENCIA
```

`VSCREEN-0078` y `ORIGO-UX-011` conservan esa decisión.

---

#### 45. Recepción total frente a recepción parcial

La separación queda:

```text
TOTAL
→ esta recepción completa el saldo recibible del alcance
→ residual recibible = 0

PARCIAL
→ queda saldo recibible explícito
→ puede existir una recepción posterior legítima
```

Una recepción parcial no se etiqueta como total por conveniencia operativa.

`ORIGO-UX-010` desarrolla el segundo caso.

---

#### 46. Historial de recepciones

La experiencia debe preservar todas las recepciones correlacionadas con la compra.

Como mínimo debe poder distinguir:

- recepción actual;
- recepciones previas válidas;
- cantidades acumuladas;
- saldo previo;
- saldo posterior;
- correcciones/reversiones correlacionadas;
- estado del handoff posterior.

Completar una orden no elimina ese historial.

---

#### 47. Dispositivo compartido y actor humano

Regla:

```text
DISPOSITIVO AUTORIZADO
!=
ACTOR AUTORIZADO
```

Antes de mutar deben resolverse:

```text
principal
actor humano efectivo
rol operativo efectivo
turno
check-in
sede
area
permiso exacto
recurso
```

Firma o PIN aportan atribución, no sustituyen autoridad.

---

#### 48. Estados de experiencia de recepción total

La UX debe distinguir, sin convertirlos en estados persistentes nuevos:

| Estado UX | Significado | Tratamiento |
| --- | --- | --- |
| `TOTAL_LISTA_PARA_VERIFICAR` | el saldo completo está presentado para inspección | permitir captura si autoridad y contexto son válidos |
| `VERIFICACION_EN_CURSO` | existe captura física/documental incompleta | no ofrecer aceptación total final |
| `LISTA_PARA_ACEPTACION_TOTAL` | todas las líneas están verificadas y sin diferencias abiertas | permitir decisión autorizada |
| `SALDO_REMANENTE` | queda cantidad recibible | derivar a tratamiento parcial; no marcar total |
| `DIFERENCIA_ABIERTA` | existe discrepancia material | bloquear aceptación limpia y dirigir al owner de diferencias |
| `MASTER_DATA_PENDIENTE` | una dependencia de maestro impide cierre limpio | conservar observación y bloquear conclusión total |
| `VERSION_DESACTUALIZADA` | cambió el saldo/estado/recurso | recargar y reevaluar |
| `SOLO_CONSULTA` | puede ver pero no registrar | no serializar acción mutante como disponible |
| `CONTEXTO_OPERATIVO_REQUERIDO` | falta T+C o rol operativo | bloquear mutación |
| `FALLO_TECNICO` | una fuente necesaria falló | no convertirlo en total ni en cero pendientes |

---

#### 49. Vacío, deny, stale y fallo técnico

Reglas:

```text
SALDO = 0 POR RECEPCION YA CERRADA
!=
PUEDE CREAR OTRA RECEPCION TOTAL

SIN AUTORIDAD
!=
SIN SALDO

VERSION_DESACTUALIZADA
!=
DIFERENCIA

FALLO_TECNICO
!=
RECEPCION TOTAL COMPLETADA
```

La interfaz conserva razón suficiente sin exponer información protegida.

---

#### 50. Auditoría mínima

Una recepción total debe conservar evidencia correlacionable de:

- `receipt_id` e identidad idempotente;
- orden/compromiso o causa excepcional;
- proveedor;
- sede/área;
- actor real y actor efectivo;
- rol operativo;
- turno/check-in;
- permiso exacto;
- versión/snapshot;
- líneas y presentaciones;
- cantidades esperadas, previas, observadas y aceptadas;
- lote/vencimiento/condición cuando aplique;
- documentos;
- modalidad `inventory` o `record_only`;
- decisión de aceptación;
- diferencias o ausencia de ellas;
- resultado;
- timestamp;
- correlación con handoffs posteriores.

---

#### 51. Contraste AS-IS de `vento-origo`

La implementación observada ya contiene una recepción funcional relevante:

- `createReceipt` exige usuario y sede;
- resuelve sesión operativa;
- verifica un permiso legacy/amplio de recepción;
- distingue `inventory` y `record_only`;
- soporta orden normal y carril de emergencia;
- valida proveedor y orden/sede;
- captura líneas, presentaciones, cantidades, costos, lotes y vencimientos;
- persiste `inventory_entries` e `inventory_entry_items`;
- puede generar solicitudes de revisión de maestro;
- suma `quantity_received` por línea de orden;
- marca técnicamente la orden como `received` cuando todas las líneas alcanzan la cantidad ordenada.

También se observa acoplamiento AS-IS con stock/costos y corrección que el contrato objetivo no eleva a ownership final.

---

#### 52. Brechas AS-IS y propietarios

| Brecha | Impacto | Propietario | Condición de salida |
| --- | --- | --- | --- |
| permiso runtime `origo.procurement.receipts` no coincide con `receipts.register` | autoridad demasiado amplia o ambigua | `ORIGO-AUTH-014` + package consumidor | mutación usa la permission key exacta server-side |
| `createReceipt` acepta estados técnicos `draft/sent` | elegibilidad puede divergir del lifecycle empresarial | materialización UX/proceso de `VPROC-0021/0022` | recepción se habilita desde compromiso/entrega canónicamente elegibles |
| escrituras de inventario/costo ocurren dentro de ORIGO | ownership físico/económico aparece acoplado | `ORIGO-UX-013..015` + integraciones propietarias | ORIGO acepta y handoff NEXO/NUMERA materializa sus verdades |
| `allReceived` marca orden técnica `received` | cierre técnico puede confundirse con recepción conciliada | `ORIGO-UX-009/010/016` + implementación propietaria | saldo técnico y lifecycle `VPROC-0022` se proyectan separadamente |
| corrección está acoplada a `createReceipt` | register puede aparentar autoridad de reverse/replace | `ORIGO-AUTH-008/014` | register y reverse se autorizan por separado |
| master data pending produce estado técnico propio | cierre puede confundirse con aceptación final | owner de maestro + materialización UX | dependencia se resuelve antes de representar conformidad total |
| operación multi-step no demuestra atomicidad integral | fallo intermedio puede dejar efectos divergentes | package DB/integración + `TREQ-ORIGO-003` | efecto atómico o durable/reconciliable e idempotente |

No queda un hallazgo narrativo sin propietario y condición de salida.

---

#### 53. Handoff inmediato a ORIGO-UX-010

`ORIGO-UX-010 — Diseñar recepción parcial` recibe:

```text
1 PURCHASE_COMMITMENT
→ 0..N RECEPCIONES VPROC-0022

TOTAL
→ residual recibible = 0

PARCIAL
→ residual recibible > 0
```

La 010 deberá conservar:

- identidades de recepciones anteriores;
- saldo por línea;
- versión de orden/compromiso;
- cantidades acumuladas;
- nueva identidad para cada llegada legítima;
- prohibición de cerrar la compra por la primera parcial.

---

#### 54. Handoff al resto de ORIGO-UX

| Tarea | Entrada exacta proveniente de ORIGO-UX-009 |
| --- | --- |
| `ORIGO-UX-010` | parcialidad conserva saldo por línea, recepciones previas e identidad nueva por llegada |
| `ORIGO-UX-011` | diferencia conserva pedido, observado, decisión y efectos; total limpia exige cero diferencias abiertas |
| `ORIGO-UX-012` | precios/costos visibles en recepción se minimizan por finalidad y field mask |
| `ORIGO-UX-013` | recepción aceptada ORIGO no se repite manualmente como segunda recepción en NEXO |
| `ORIGO-UX-014` | `PUTAWAY_PENDING` entrega a NEXO el alcance aceptado de forma correlacionada e idempotente |
| `ORIGO-UX-015` | conciliación económica consume recepción aceptada sin convertirla en obligación o pago por sí sola |
| `ORIGO-UX-016` | prototipo demuestra total, parcial, diferencias, handoff físico y conciliación sin fusionar owners |

---

#### 55. Requisitos de prueba derivados

**Resultado:** NO GENERA REQUISITOS DE PRUEBA.

**Requisitos creados:** 0
**Requisitos modificados:** 0
**Requisitos diferidos:** 0
**Requisitos obsoletos:** 0

Justificación: modalidad de recepción, no duplicación, atomicidad, idempotencia, separación de funciones, autorización operacional, verificación server-side, aceptación comercial/documental y fronteras ORIGO–NEXO–NUMERA ya cuentan con obligaciones verificables vigentes. Esta tarea especializa la recepción total de `VSCREEN-0077` sin introducir una obligación nueva ni modificar el Registro 04A.

---

#### 56. Cobertura de prueba vigente reutilizada

Se reutiliza sin modificación:

- `TREQ-ORIGO-001` para declarar modalidad `inventory`/`record_only` y evitar duplicación de cantidades, costos, orden recibida o evento financiero;
- `TREQ-ORIGO-003` para tratar cabecera, líneas, stock, costos, cantidades recibidas, orden, maestro, firma y auditoría como una operación atómica o durable/reconciliable e idempotente;
- `TREQ-ORIGO-004` para mantener recepción separada de solicitud, compra y aprobación, y conservar funciones distintas;
- `TREQ-AUTH-001` para resolver autoridad mediante permiso, contexto y alcance canónicos;
- `TREQ-AUTH-008` para exigir `T+C`, rol operativo y territorio en capacidades operativas;
- `TREQ-AUTH-010` para preservar segregación y evitar que recepción herede aprobación;
- `TREQ-AUTH-013` para revalidar server-side permiso, actor, territorio, contexto, estado y campos;
- `TREQ-AUTH-015` para conservar evidencia correlacionable de actor, contexto, permiso, recurso, decisión, razones y timestamp.

Esta enumeración es trazabilidad vigente y no constituye actualización del registro.

---

#### 57. Evidencia de validación

| Clase | Estado | Evidencia |
| --- | --- | --- |
| BUILD | NOT_EXECUTED | `docs:plan:build` corresponde al checkout local después de incorporar el artefacto. |
| LOCAL | NOT_EXECUTED | Formato, quality, delivery, topología, EOL, TREQ, batería global y lifecycle quedan pendientes del checkout local. |
| REMOTA | PASS | Se verificaron `vento-shell/main@d98d8955bf9ab87db3c852885c079790f35abdce`, owner blob `e039a91ed89a7f1e3fc9887feb5073797eba32bc`, topología `DEFINE_ONCE / NO_PHYSICAL_INSTANCE`, `VPROC-0022`, sus nueve transiciones, excepciones y acciones CCR, `VSCREEN-0076/0077/0078`, `ORIGO-AUTH-007`, 04A ORIGO/AUTH, fronteras NEXO/NUMERA y `vento-origo/main@70860f1ca5f0a4a73e894cbb840956f9f7eda2ad` con el runtime actual de recepción. La entrada inmediata 008 se consume desde el artefacto aprobado SHA-256 `148bf2ad96d89430e8d48a7427b42f197f3afd83fb8f5246dda962681ffe4c65`. |
| OPERATIVA | NOT_EXECUTED | No se registraron recepciones reales, no se ejecutaron aceptaciones, inventario, costos, órdenes, proveedores, documentos, NEXO ni NUMERA. |
| FÍSICA | NOT_APPLICABLE | `ORIGO-UX-009` no crea instancia física propia ni autoriza cambios de producto, datos o infraestructura. |

---

#### 58. Criterios de aceptación

La tarea queda documentalmente completa cuando:

- [ ] `VSCREEN-0077` queda como superficie canónica de recepción total o parcial;
- [ ] `VPROC-0022::STEP-RECEIVE_PURCHASE` queda preservado;
- [ ] recepción total se define contra el saldo recibible vigente y no contra una copia histórica;
- [ ] una recepción que completa el saldo no elimina parciales anteriores;
- [ ] cada llegada legítima conserva identidad de recepción propia;
- [ ] `receipts.register` queda como permiso exacto de nueva recepción;
- [ ] la modalidad permanece `OPERATIONAL_ONLY` con `T+C`;
- [ ] `bodeguero` y `gerencia_operativa` requieren rol operativo vigente y territorio compatible;
- [ ] `receipts.view` y `origo.access` no conceden registro;
- [ ] pedido original y hecho recibido permanecen separados;
- [ ] cantidad ordenada, recibida previa, saldo y cantidad observada son distinguibles;
- [ ] la totalidad exige cubrir todo el saldo del alcance sin residual recibible;
- [ ] un exceso no se oculta como recepción total válida;
- [ ] una cantidad menor al saldo no se marca total;
- [ ] producto/presentación/unidad se validan y no se normalizan silenciosamente;
- [ ] lote, vencimiento, condición y temperatura se preservan cuando aplican;
- [ ] `TR-001`, `TR-002` y `TR-003` mantienen llegada y verificaciones separadas;
- [ ] `TR-005` solo omite revisión de diferencias cuando no existen diferencias;
- [ ] una diferencia abierta bloquea el cierre limpio y pertenece a `ORIGO-UX-011`;
- [ ] `ACCEPTANCE_PENDING` no equivale a aceptación tácita;
- [ ] aceptación total usa `VPROC-0022.TR-007`;
- [ ] `PUTAWAY_PENDING` no equivale a stock disponible;
- [ ] recepción total aceptada no equivale a `RECEIPT_RECONCILED`;
- [ ] `EVT-004` se preserva como handoff físico y no como stock confirmado;
- [ ] `EVT-005` se preserva como conciliación pendiente y no como obligación pagada;
- [ ] `inventory` y `record_only` permanecen modalidades distintas y ambas protegidas;
- [ ] emergencia/directa exige causa, autoridad, actor, territorio y regularización;
- [ ] master data pendiente no se representa como cierre total limpio;
- [ ] idempotencia impide doble recepción y doble suma de cantidades;
- [ ] retries revalidan autorización y no repiten efectos;
- [ ] concurrencia reevalúa saldo, estado y versión;
- [ ] `allReceived` y `status=received` del runtime se tratan como evidencia AS-IS, no lifecycle canónico;
- [ ] corrección/reversión quedan fuera de `receipts.register`;
- [ ] total y parcial quedan explícitamente separados;
- [ ] historial de recepciones se preserva al completar el saldo;
- [ ] actor humano efectivo se conserva en dispositivos compartidos;
- [ ] vacío, deny, stale, diferencia y fallo técnico no se confunden;
- [ ] auditoría conserva recepción, orden, actor, cantidades, modalidad, decisión y correlación;
- [ ] cada brecha AS-IS tiene propietario y condición de salida;
- [ ] `ORIGO-UX-010` recibe un handoff suficiente para diseñar recepción parcial;
- [ ] no se crean ni modifican requisitos de prueba;
- [ ] no se ejecutan cambios físicos desde esta tarea.

---

#### 59. Límites

Esta tarea no:

- implementa `VSCREEN-0077`;
- crea rutas, componentes o Server Actions;
- crea permission keys;
- activa `receipts.register` en el catálogo físico;
- modifica grants o matrices;
- registra una recepción real;
- diseña en detalle la recepción parcial;
- resuelve diferencias;
- crea tolerancias cuantitativas;
- corrige ni reversa recepciones;
- modifica una orden para hacerla coincidir con lo recibido;
- mueve stock propietario de NEXO;
- crea LOC/LPN o ubicación física;
- reconoce obligación económica definitiva;
- ejecuta pagos;
- modifica costos productivos;
- aprueba maestro de productos/presentaciones;
- modifica `vento-origo`;
- modifica Supabase, migraciones, RLS, RPC, grants, Storage o datos;
- modifica contratos generados;
- modifica el Registro 04A;
- ejecuta E5;
- crea instancia física;
- desarrolla `ORIGO-UX-010`.

---

#### 60. Continuidad

**ÚLTIMA TAREA APROBADA**
`ORIGO-UX-008 — Diseñar aprobación y rechazo`

**TAREA ACTUAL APROBADA**
`ORIGO-UX-009 — Diseñar recepción total`

**SIGUIENTE TAREA RESERVADA**
`ORIGO-UX-010 — Diseñar recepción parcial`
### ✅ ORIGO-UX-010 — Diseñar recepción parcial

**Estado:** APROBADA
**Tarea anterior:** ORIGO-UX-009 — Diseñar recepción total
**Tarea siguiente:** ORIGO-UX-011 — Diseñar diferencias contra orden
**Tipo de tarea:** diseño documental integral de la experiencia de recepción parcial sobre `VSCREEN-0077` y `VPROC-0022`, definiendo saldo recibible por línea, múltiples recepciones legítimas contra un mismo compromiso, identidad e idempotencia por llegada, aceptación del alcance parcial mediante `VPROC-0022.TR-007`, persistencia explícita del residual y handoffs correlacionados hacia NEXO y NUMERA, sin convertir parcialidad en diferencia, cierre de compra, movimiento físico ni conciliación económica; `DEFINE_ONCE` / `NO_PHYSICAL_INSTANCE`
**Bloque:** BLOQUE M — ORIGO
**Repositorio propietario:** `vento-group-sas/vento-shell`
**Archivo propietario:** `docs/plan-canonico/modular/bloques/M_ORIGO/02_EXPERIENCIA_DE_COMPRAS.md`
**Estado físico resultante:** `NO_PHYSICAL_INSTANCE`
**Cambios físicos autorizados:** ninguno; esta tarea no modifica código, navegación, componentes, procesos, permisos, roles, grants, datos, tablas, RLS, RPC, migraciones, Supabase, Storage, packages, consumidores ni despliegues
**Requisitos de prueba creados o modificados:** 0

---

#### 1. Propósito

Diseñar el contrato de experiencia para registrar una **recepción parcial** de compra en ORIGO, de forma que el receptor pueda:

- recibir una parte válida de una orden o compromiso sin cerrar falsamente el saldo restante;
- visualizar por línea qué cantidad estaba comprometida, cuánto fue aceptado previamente, cuánto se observa ahora y cuánto seguirá pendiente;
- conservar cada llegada real como una recepción distinta de `VPROC-0022`;
- distinguir una parcialidad legítima de una diferencia material contra lo esperado;
- preservar la versión de orden/compromiso y no reducirla silenciosamente para hacer coincidir lo recibido;
- aceptar únicamente el alcance efectivamente observado y verificado;
- conservar residual recibible explícito para recepciones futuras;
- evitar que retries, concurrencia o correcciones vuelvan a sumar cantidades ya aceptadas;
- producir handoffs físicos y económicos únicamente por el alcance parcial aceptado;
- mantener separadas la recepción comercial de ORIGO, el ingreso físico de NEXO y la conciliación económica de NUMERA.

La tarea diseña la experiencia objetivo sobre:

```text
VSCREEN-0077 — Recepción total o parcial
VPROC-0022    — Recibir compras, verificar conformidad y resolver diferencias
```

No implementa la superficie ni modifica autorización física.

---

#### 2. Entrada aprobada de ORIGO-UX-009

`ORIGO-UX-009` entrega la regla de cardinalidad:

```text
1 PURCHASE_COMMITMENT
→ 0..N RECEPCIONES VPROC-0022
```

Y la frontera:

```text
TOTAL
→ residual recibible = 0

PARCIAL
→ residual recibible > 0
```

La tarea actual consume además:

- identidades de recepciones anteriores;
- saldo por línea;
- versión de orden/compromiso;
- cantidades acumuladas válidas;
- una identidad nueva para cada llegada real distinta;
- prohibición de cerrar la compra por la primera recepción parcial.

---

#### 3. Naturaleza y topología

La topología vigente de `ORIGO-UX-001..016` establece:

```text
mode = DEFINE_ONCE
execution_gate = NO_PHYSICAL_INSTANCE
```

Consecuencias:

1. `ORIGO-UX-010` se define una sola vez;
2. no existe una instancia física propia de esta tarea;
3. no se crea ni modifica una ruta o componente de `vento-origo`;
4. no se implementan Server Actions, RPC, RLS, migraciones, tablas ni contratos de eventos;
5. las brechas AS-IS se documentan con propietario y condición de salida;
6. la materialización posterior deberá consumir este contrato sin introducir un estado empresarial `PARTIAL` ajeno a `VPROC-0022`.

---

#### 4. Fuentes verificadas

El diseño consume y conserva:

- `ORIGO-UX-001 — Inventariar el proceso completo de abastecimiento`;
- `ORIGO-UX-002 — Separar solicitud, compra, aprobación y recepción`;
- `ORIGO-UX-006 — Diseñar inicio para receptor`;
- `ORIGO-UX-007 — Diseñar creación de orden de compra`;
- `ORIGO-UX-008 — Diseñar aprobación y rechazo`;
- `ORIGO-UX-009 — Diseñar recepción total` como base inmediata aprobada;
- `ORIGO-AUTH-004 — Definir permisos de consulta`;
- `ORIGO-AUTH-007 — Definir permisos de recepción`;
- `ORIGO-AUTH-008 — Definir permisos de corrección`;
- `ORIGO-AUTH-009..013` para territorio, sensibilidad, actor, contexto y administración;
- `VPROC-0022` y sus nueve estados canónicos;
- `VPROC-0022.TR-001..009`;
- `VPROC-0022.EX-001..004`;
- `VPROC-0022.CCR-001..004`;
- `VPROC-0022.EVT-001..006`;
- `VSCREEN-0076`, `VSCREEN-0077` y `VSCREEN-0078`;
- contratos de idempotencia y recepción parcial de `INT-PROC-002` e `INT-PROC-005`;
- frontera ORIGO–NEXO de `GAP-OWN-004`;
- Registro 04A vigente de ORIGO y AUTH;
- runtime observado de `src/app/receipts/new/page.tsx` en `vento-origo`;
- `vento-shell/main@8eebf934d80f589339c013d4c7da158863b6b3de` y owner blob `37194a5bb920f82bce3222fb249450331a645ae2` observados durante esta preparación;
- `vento-origo/main@70860f1ca5f0a4a73e894cbb840956f9f7eda2ad`, con `src/app/receipts/new/page.tsx` blob `0b13c026365cb9eb1be0a9c737f373e6a46635b2`;
- artefacto aprobado `ORIGO-UX-009_APROBADA_PARA_REEMPLAZAR.md` con SHA-256 `3a08757263cad827f418fdbc097fb5087f414f69d03a398ffc951b27038ad101` y SHA semántico `a8bd5c18a074a89de3710c66f9f29805bb09f1659cd854d4971f268e9bab47bd`.

La base 009 puede permanecer pendiente de publicación durante esta preparación anticipada; esta tarea no altera su lifecycle.

---

#### 5. Identidad canónica de la superficie

La recepción parcial utiliza la identidad existente:

```text
VSCREEN-0077
Recepción total o parcial
origo
VPROC-0022
OWNER_WORKSPACE
```

Propósito canónico:

```text
REGISTRAR LA RECEPCION FISICA Y DOCUMENTAL
DE UNA COMPRA POR LINEA Y PRESENTACION
```

La tarea no crea una pantalla `VSCREEN-*` adicional.

---

#### 6. Binding de proceso y paso

La superficie se vincula a:

```text
VPROC-0022::STEP-RECEIVE_PURCHASE
```

con interacción:

```text
EXECUTE
IN_PROGRESS
```

La parcialidad es una característica del alcance de una recepción y del saldo del compromiso relacionado; no crea un proceso paralelo ni un paso alternativo.

---

#### 7. Definición contractual de recepción parcial

Una recepción es **parcial** cuando existe una llegada real y aceptable que consume solo una parte del saldo recibible vigente del compromiso relacionado.

Condición general:

```text
CANTIDAD ACEPTADA ACTUAL > 0
AND
RESIDUAL RECIBIBLE POSTERIOR > 0
```

La parcialidad puede ocurrir porque:

- se reciben solo algunas líneas;
- se recibe una cantidad menor al saldo de una o más líneas;
- algunas líneas quedan programadas para una llegada posterior;
- una entrega válida cubre únicamente una fracción del compromiso vigente.

La tarea no inventa tolerancias cuantitativas ni políticas de backorder.

---

#### 8. Parcial no equivale a total

Regla:

```text
PARCIAL
→ residual recibible > 0

TOTAL
→ residual recibible = 0
```

Si después de aplicar el alcance aceptado no queda residual recibible y no existen diferencias abiertas, la experiencia debe tratar el resultado como cierre del saldo recibible conforme a `ORIGO-UX-009`, no etiquetarlo artificialmente como parcial.

---

#### 9. Parcialidad no equivale a diferencia

Regla crítica:

```text
ENTREGA PARCIAL LEGITIMA
!=
DIFERENCIA CONTRA ORDEN
```

Una entrega fraccionada puede ser válida y esperada.

Existe diferencia cuando el hecho observado contradice materialmente el compromiso, condición o expectativa aplicable y requiere una decisión gobernada.

Por tanto:

```text
PARCIALIDAD PLANIFICADA / ADMISIBLE
→ conserva residual
→ no exige por sí sola DIFFERENCE_UNDER_REVIEW

DISCREPANCIA MATERIAL
→ ORIGO-UX-011
→ VSCREEN-0078 cuando corresponda
```

La tarea no decide tolerancias ni resuelve el efecto de una discrepancia.

---

#### 10. Cardinalidad de recepciones

Se conserva exactamente:

```text
1 PURCHASE_COMMITMENT
→ 0..N RECEPCIONES VPROC-0022
```

Cada llegada real distinta que se registra como una recepción separada:

- obtiene una instancia distinta de `VPROC-0022`;
- obtiene identidad propia de recepción;
- obtiene su propia identidad idempotente;
- se correlaciona con el mismo `purchase_commitment_ref` cuando aplique;
- suma únicamente su alcance aceptado;
- conserva efectos posteriores independientes e idempotentes.

---

#### 11. Saldo recibible por línea

La UX debe presentar un saldo actual por línea derivado de información autoritativa vigente.

Modelo conceptual:

```text
COMPROMETIDO_RECIBIBLE_i
-
ACEPTADO_VALIDO_PREVIO_i
=
SALDO_PREVIO_i
```

Después de la recepción actual:

```text
SALDO_POSTERIOR_i
=
SALDO_PREVIO_i
-
ACEPTADO_ACTUAL_i
```

El saldo no se deriva únicamente de una cifra cliente ni de una suma no reconciliada de filas técnicas.

---

#### 12. Cantidad acumulada válida

`ACEPTADO_VALIDO_PREVIO` representa cantidades de recepciones previas que siguen siendo válidas para el compromiso actual.

No deben contarse como saldo consumido de forma ciega:

- recepciones anuladas;
- efectos revertidos;
- registros duplicados;
- intentos fallidos;
- efectos en estado desconocido no reconciliado;
- cantidades reemplazadas mediante corrección gobernada.

La materialización deberá calcular el saldo desde resultados durables y vigentes.

---

#### 13. Condición de entrada

Para una recepción parcial ordinaria debe existir, como mínimo:

```text
COMPROMISO / ORDEN ELEGIBLE
+
PROVEEDOR COHERENTE
+
SEDE RECEPTORA AUTORIZADA
+
AL MENOS UNA LINEA CON SALDO RECIBIBLE > 0
+
ACTOR AUTORIZADO
+
CONTEXTO OPERATIVO VIGENTE
+
VERSION / SNAPSHOT EVALUABLE
```

Una orden cerrada, anulada, completamente recibida o no elegible no vuelve a abrirse por una cantidad capturada desde cliente.

---

#### 14. Permiso exacto de recepción

La autoridad objetivo permanece:

```text
origo.procurement.receipts.register
```

Recurso:

```text
PURCHASE_RECEIPT
```

Objetivo previo a persistencia:

```text
RECEIPT_DESTINATION_DRAFT
```

La parcialidad no crea una permission key adicional como:

```text
receipts.register_partial
receipts.partial
```

---

#### 15. Modalidad de autorización

Se conserva:

```text
authorization_requirement = OPERATIONAL_ONLY
is_read_only = false
PRERREQUISITO = T+C
```

La mutación exige:

```text
TURNO VIGENTE
+
CHECK-IN ACTIVO
+
ROL OPERATIVO EFECTIVO
+
SEDE / AREA COMPATIBLES
+
PERMISO EXACTO
+
RECURSO ELEGIBLE
```

Roles operativos objetivo ya definidos:

```text
bodeguero
gerencia_operativa
```

---

#### 16. Consulta no concede registro parcial

La consulta puede usar:

```text
origo.procurement.receipts.view
```

Pero:

```text
receipts.view
!=
receipts.register
```

Y:

```text
origo.access
!=
receipts.register
```

La visualización de saldos o entregas previas no concede autoridad de mutación.

---

#### 17. Snapshot requerido antes de capturar

Antes de presentar la recepción parcial, la experiencia debe resolver un snapshot coherente que incluya, cuando aplique:

- orden/compromiso y versión;
- proveedor;
- sede receptora;
- líneas comprometidas;
- presentación y unidad canónicas;
- cantidad comprometida recibible;
- cantidades aceptadas válidas previas;
- saldo vigente por línea;
- recepciones relacionadas relevantes;
- documentos requeridos;
- modalidad de recepción;
- diferencias o bloqueos abiertos conocidos.

El snapshot no es autorización permanente.

---

#### 18. Modelo de línea en la experiencia

Cada línea debe poder distinguir como mínimo:

```text
LINEA / PRODUCTO
PRESENTACION / UNIDAD
CANTIDAD COMPROMETIDA
ACEPTADO PREVIO VALIDO
SALDO ANTES DE ESTA RECEPCION
CANTIDAD OBSERVADA AHORA
CANTIDAD ACEPTADA AHORA
SALDO DESPUES DE ESTA RECEPCION
```

Cuando aplique también:

- lote;
- vencimiento;
- condición;
- temperatura;
- documento asociado;
- observación o evidencia.

---

#### 19. Cantidad observada y cantidad aceptada

La UX no debe colapsar:

```text
OBSERVADO
=
ACEPTADO
```

por defecto.

Si todo lo observado es conforme, ambas cantidades pueden coincidir.

Si existe una diferencia, rechazo parcial, cuarentena u otra decisión, la cantidad aceptada puede diferir y el caso debe conservar evidencia y derivación al contrato propietario correspondiente.

---

#### 20. Presentación y conversión de unidades

La parcialidad se calcula sobre cantidades comparables.

Reglas:

1. la línea conserva presentación y unidad de la fuente comprometida;
2. una presentación recibida distinta no se convierte silenciosamente en equivalencia;
3. una conversión válida requiere perfil o contrato de unidad reconocido;
4. la cantidad canónica utilizada para saldo e idempotencia debe ser reproducible;
5. una presentación no reconocida o pendiente de maestro bloquea cualquier cierre engañoso.

---

#### 21. Recepción de subconjunto de líneas

Una recepción parcial puede incluir solo un subconjunto de líneas de la orden.

La experiencia deberá:

- preservar las líneas no recibidas;
- mantener sus saldos;
- no crear líneas recibidas en cero para simular procesamiento;
- no marcar el compromiso completo como recibido;
- permitir que llegadas posteriores consuman únicamente el saldo vigente.

---

#### 22. Recepción parcial sobre líneas ya parcialmente recibidas

Una nueva llegada puede consumir el saldo restante de una línea previamente parcial.

Regla:

```text
SALDO_PREVIO_i > 0
+
NUEVA LLEGADA REAL
→
NUEVA RECEPCION
→
NUEVA CANTIDAD ACEPTADA_i
```

No:

```text
EDITAR RECEPCION ANTERIOR
PARA AUMENTAR SU CANTIDAD
```

salvo un flujo correctivo explícito y gobernado.

---

#### 23. Identidad nueva por cada llegada real

Dos entregas reales distintas contra una misma orden no son duplicados por compartir:

- orden;
- proveedor;
- producto;
- factura;
- fecha;
- sede;
- línea.

Cada llegada real que representa una nueva recepción obtiene identidad propia.

Regla canónica:

```text
MISMA ORDEN + DOS ENTREGAS REALES
!= DUPLICADO
```

---

#### 24. Idempotencia de una misma llegada

Una misma intención de registro conserva la misma identidad idempotente durante retries técnicos.

Regla:

```text
MISMA ENTREGA REAL
+
MISMA IDENTIDAD / HUELLA
+
RETRY
→
MISMO RESULTADO DURABLE
```

No:

```text
RETRY
→
SEGUNDA RECEPCION
→
SEGUNDA SUMA DEL SALDO
```

Una llegada real posterior usa una identidad distinta y correlacionada.

---

#### 25. Documento o factura no son identidad idempotente

`invoice_number` y `supplier_document_refs` aportan evidencia y correlación, pero no constituyen por sí solos la identidad de una recepción.

Por tanto:

- una factura puede abarcar varias entregas;
- una entrega puede traer varios documentos;
- dos recepciones no se fusionan solo por compartir documento;
- una coincidencia documental puede producir revisión, no deduplicación automática.

---

#### 26. Concurrencia sobre saldo

Dos sesiones pueden intentar recibir simultáneamente contra la misma línea.

Antes del commit autoritativo, la ejecución futura debe reevaluar:

```text
VERSION / SNAPSHOT
+
SALDO VIGENTE
+
RECEPCIONES CONFIRMADAS
+
CORRECCIONES / REVERSAS
+
ESTADO DE ORDEN / COMPROMISO
+
AUTORIZACION
```

No se permite confiar únicamente en el saldo mostrado al abrir la pantalla.

---

#### 27. Snapshot desactualizado

Si el saldo cambió desde que el receptor abrió la pantalla:

```text
VERSION_DESACTUALIZADA / STALE_VERSION
→ BLOQUEAR CONFIRMACION CIEGA
→ RECARGAR / RECONCILIAR
→ REEVALUAR
```

La UX debe mostrar el nuevo saldo y preservar lo capturado de forma segura cuando sea posible, sin aplicar automáticamente cantidades incompatibles.

---

#### 28. Exceso sobre saldo

Si:

```text
OBSERVADO_ACTUAL_i > SALDO_PREVIO_i
```

el exceso no se oculta ni se recorta silenciosamente para fabricar una parcialidad válida.

Debe conservarse:

```text
SALDO ESPERADO
+
OBSERVADO
+
EXCESO
+
EVIDENCIA
```

Y derivarse a `ORIGO-UX-011` cuando constituya diferencia material.

---

#### 29. Cantidad menor al saldo

Si:

```text
0 < ACEPTADO_ACTUAL_i < SALDO_PREVIO_i
```

la línea conserva residual.

Esto puede representar:

- entrega parcial planificada;
- entrega fraccionada admisible;
- backorder permitido por política;
- una discrepancia que requiere decisión.

La UX no decide la clasificación únicamente por la desigualdad numérica; utiliza condiciones, documentos y políticas vigentes, y deriva diferencias a `ORIGO-UX-011`.

---

#### 30. Cero no significa recepción

Una línea con cantidad observada o aceptada igual a cero:

- no consume saldo;
- no debe crear un efecto de recepción de esa línea;
- no se utiliza para simular que fue procesada;
- puede permanecer pendiente o formar parte de una diferencia según el contexto.

Una recepción parcial debe contener al menos un alcance positivo válido.

---

#### 31. La orden no se reescribe para coincidir con lo recibido

La parcialidad preserva:

```text
CANTIDAD COMPROMETIDA ORIGINAL / VERSIONADA
+
RECEPCIONES ACEPTADAS
+
SALDO PENDIENTE
```

No:

```text
ORDEN 100
RECIBIDO 60
→ EDITAR ORDEN A 60
→ DECLARAR CIERRE
```

Si el negocio decide modificar o cancelar el saldo restante, esa decisión pertenece al contrato propietario de la compra y debe conservar versión, motivo y autoridad.

---

#### 32. Lifecycle de cada recepción parcial

Cada recepción parcial conserva el mismo lifecycle de `VPROC-0022`:

```text
VPROC-0022.TR-001  RECEIPT_EXPECTED -> ARRIVAL_REGISTERED
VPROC-0022.TR-002  ARRIVAL_REGISTERED -> PHYSICAL_CHECK_IN_PROGRESS
VPROC-0022.TR-003  PHYSICAL_CHECK_IN_PROGRESS -> DOCUMENT_CHECK_IN_PROGRESS
VPROC-0022.TR-004  DOCUMENT_CHECK_IN_PROGRESS -> DIFFERENCE_UNDER_REVIEW
VPROC-0022.TR-005  DOCUMENT_CHECK_IN_PROGRESS -> ACCEPTANCE_PENDING
VPROC-0022.TR-006  DIFFERENCE_UNDER_REVIEW -> ACCEPTANCE_PENDING
VPROC-0022.TR-007  ACCEPTANCE_PENDING -> PUTAWAY_PENDING
VPROC-0022.TR-008  PUTAWAY_PENDING -> ECONOMIC_RECONCILIATION_PENDING
VPROC-0022.TR-009  ECONOMIC_RECONCILIATION_PENDING -> RECEIPT_RECONCILED
```

No se crea un estado:

```text
PARTIAL
PARTIALLY_RECEIVED
PARTIAL_ACCEPTED
```

como noveno o décimo estado canónico del proceso.

---

#### 33. Llegada de una parcial

Se conserva:

```text
VPROC-0022.TR-001
RECEIPT_EXPECTED
→ ARRIVAL_REGISTERED
```

La llegada registra el hecho de una entrega concreta.

No significa:

- aceptación;
- cantidad conciliada;
- saldo consumido definitivamente;
- stock disponible.

---

#### 34. Verificación física y documental

Se preservan:

```text
VPROC-0022.TR-002
ARRIVAL_REGISTERED
→ PHYSICAL_CHECK_IN_PROGRESS

VPROC-0022.TR-003
PHYSICAL_CHECK_IN_PROGRESS
→ DOCUMENT_CHECK_IN_PROGRESS
```

La parcialidad no permite saltar la verificación de:

- producto;
- presentación;
- cantidad;
- condición;
- lote/vencimiento cuando aplique;
- documentos;
- correspondencia con el compromiso.

---

#### 35. Parcial limpia sin diferencia

Cuando la entrega parcial es válida y no existe una diferencia que requiera revisión, se conserva el bypass:

```text
VPROC-0022.TR-005
DOCUMENT_CHECK_IN_PROGRESS
→ ACCEPTANCE_PENDING
```

con su condición de ausencia de diferencias aplicables.

El hecho de que exista saldo futuro no obliga por sí solo a `DIFFERENCE_UNDER_REVIEW`.

---

#### 36. Parcial con diferencia y acciones excepcionales

Cuando existe una discrepancia material:

```text
VPROC-0022.TR-004
DOCUMENT_CHECK_IN_PROGRESS
→ DIFFERENCE_UNDER_REVIEW
```

Y, una vez tratada suficientemente:

```text
VPROC-0022.TR-006
DIFFERENCE_UNDER_REVIEW
→ ACCEPTANCE_PENDING
```

Se preservan además exactamente las acciones excepcionales del proceso:

```text
VPROC-0022.EX-001 — QUARANTINE
VPROC-0022.EX-002 — HOLD
VPROC-0022.EX-003 — ESCALATE
VPROC-0022.EX-004 — REJECT
```

`ORIGO-UX-011` diseña la experiencia de decisión de esa diferencia.

La 010 conserva la observación y el residual; no decide silenciosamente el efecto de la discrepancia.

---

#### 37. Aceptación del alcance parcial

La aceptación canónica permanece:

```text
VPROC-0022.TR-007
ACCEPTANCE_PENDING
→ PUTAWAY_PENDING
```

La transición acepta **el alcance de esa recepción**, no todo el compromiso de compra.

Por tanto:

```text
RECEPCION PARCIAL ACEPTADA
→ PUTAWAY_PENDING PARA SU ALCANCE
+
SALDO DEL COMPROMISO AUN PENDIENTE
```

---

#### 38. Aceptación parcial no cierra la compra

Después de una recepción parcial aceptada:

```text
RESIDUAL RECIBIBLE > 0
```

La experiencia debe mantener visible que existen cantidades futuras pendientes.

No:

```text
TR-007 DE UNA PARCIAL
→ ORDEN COMPLETA RECIBIDA
```

ni:

```text
TR-007 DE UNA PARCIAL
→ PURCHASE_COMMITMENT CERRADO
```

---

#### 39. La instancia parcial sí puede reconciliarse

Una recepción parcial individual puede avanzar posteriormente hasta:

```text
VPROC-0022.RECEIPT_RECONCILED
```

para **su propio alcance**, siempre que sus efectos físicos, documentales y económicos aplicables estén conciliados.

Regla:

```text
RECEIPT_RECONCILED DE UNA RECEPCION PARCIAL
!=
ORDEN COMPLETAMENTE RECIBIDA
```

La orden o compromiso conserva residual hasta que los efectos válidos acumulados y cualquier decisión propietaria posterior lo resuelvan.

---

#### 40. Handoff parcial hacia NEXO

Al alcanzar:

```text
VPROC-0022.PUTAWAY_PENDING
```

se preserva:

```text
VPROC-0022.EVT-004
vento.process.vproc-0022.putaway-pending.v1
```

El handoff contiene únicamente el alcance parcial aceptado.

NEXO:

- no recibe el saldo futuro como si ya hubiera llegado;
- no vuelve a capturar manualmente la misma recepción ORIGO;
- revalida su propia autoridad y contrato;
- aplica el efecto físico una sola vez.

---

#### 41. Handoff parcial hacia NUMERA

Cuando corresponda la conciliación económica se preserva:

```text
VPROC-0022.EVT-005
vento.process.vproc-0022.economic-reconciliation-pending.v1
```

La proyección económica debe limitarse al alcance aceptado y correlacionado.

Una recepción parcial no afirma por sí sola:

```text
FACTURA TOTAL VALIDADA
OBLIGACION TOTAL RECONOCIDA
PAGO TOTAL AUTORIZADO
```

---

#### 42. Modalidad `inventory` y `record_only`

Se conserva la modalidad declarada de recepción:

```text
inventory
record_only
```

Una parcial puede ser registral o pretender efecto físico según el contrato aplicable.

Reglas:

```text
record_only
!=
SIN AUTORIZACION
```

Y:

```text
inventory
!=
ORIGO PROPIETARIA DEL LEDGER NEXO
```

La modalidad permanece visible y auditable.

---

#### 43. Recepción directa o de emergencia

Sin una orden o compromiso que defina un saldo recibible, no puede afirmarse una parcialidad contra orden por inferencia.

Una recepción directa o de emergencia puede registrarse cuando el contrato lo autoriza, pero debe conservar:

- causa;
- actor;
- sede;
- proveedor;
- líneas;
- evidencia;
- autoridad;
- regularización aplicable.

Si posteriormente se crea una orden o compromiso, la regularización debe correlacionarse con la recepción original sin duplicarla.

---

#### 44. Maestro de datos pendiente

Una presentación o producto pendiente de aprobación de maestro no puede utilizarse para cerrar o recalcular silenciosamente el saldo como si la relación fuera definitiva.

La experiencia debe distinguir:

```text
HECHO FISICO CAPTURADO
!=
DATO MAESTRO APROBADO
!=
ALCANCE ACEPTADO DEFINITIVO
```

El owner de maestro conserva su decisión.

---

#### 45. Corrección, reversión y acciones CCR

Registrar una nueva parcial no concede autoridad para:

```text
CORREGIR RECEPCION PREVIA
REVERSAR RECEPCION PREVIA
```

Se preservan exactamente las acciones CCR de `VPROC-0022`:

```text
VPROC-0022.CCR-001 — CANCEL
VPROC-0022.CCR-002 — VOID
VPROC-0022.CCR-003 — REVERSE
VPROC-0022.CCR-004 — RESTATE
```

Las fronteras correctivas pertenecen a `ORIGO-AUTH-008`.

Si una recepción previa válida es posteriormente anulada, revertida o corregida, el saldo debe derivarse nuevamente de efectos vigentes y no de una suma histórica ciega.

---

#### 46. Recepciones futuras

Mientras exista saldo recibible elegible:

```text
SALDO > 0
+
NUEVA ENTREGA REAL
→
NUEVA RECEPCION VPROC-0022
```

La nueva recepción:

- no reutiliza el `receipt_id` previo;
- no reutiliza la idempotency key de otra llegada;
- sí conserva correlación con el mismo compromiso;
- parte del saldo vigente después de todas las recepciones válidas anteriores.

---

#### 47. Disposición del saldo restante

Una recepción parcial no decide por sí sola qué ocurrirá con el residual.

El residual puede permanecer pendiente o ser objeto, según contrato propietario, de:

- nueva entrega;
- cambio material de la compra;
- cancelación autorizada;
- backorder;
- sustitución;
- diferencia o reclamación.

La UX de recepción no debe marcar cantidad pendiente como recibida únicamente para cerrar la orden.

---

#### 48. Composición de la pantalla

Para una parcial, `VSCREEN-0077` debe permitir comprender simultáneamente:

```text
CONTEXTO DE COMPRA
+
RECEPCIONES PREVIAS RELEVANTES
+
SALDO VIGENTE POR LINEA
+
CAPTURA DE ESTA LLEGADA
+
RESULTADO DE VERIFICACION
+
RESIDUAL POSTERIOR
+
ACCION AUTORIZADA
```

La superficie no necesita mostrar datos sensibles ajenos a la finalidad de recepción.

---

#### 49. Estados UX de parcialidad

La experiencia puede distinguir condiciones UX sin crear estados nuevos de `VPROC-0022`:

| Estado UX | Significado | Tratamiento |
| --- | --- | --- |
| `LISTO_PARA_PARCIAL` | existe saldo y una entrega parcial elegible | permitir captura y verificación si existe autoridad |
| `COMPLETA_SALDO` | lo capturado dejaría residual cero | tratar como caso total de `ORIGO-UX-009` |
| `RESIDUAL_PENDIENTE` | después de aceptar seguirá existiendo saldo | mostrar cantidad pendiente explícita |
| `DIFERENCIA_REQUIERE_DECISION` | existe discrepancia material | derivar a `ORIGO-UX-011` |
| `SALDO_CAMBIO` | otra operación alteró cantidades pendientes | recargar y revalidar |
| `SIN_SALDO` | no queda cantidad recibible | bloquear nueva recepción ordinaria contra ese alcance |
| `SOLO_CONSULTA` | actor puede ver pero no registrar | no serializar capacidad mutante |
| `FALLO_TECNICO` | no puede resolverse fuente necesaria | no representarlo como saldo cero |

---

#### 50. Auditoría mínima

Una recepción parcial debe conservar evidencia correlacionable de:

- `receipt_id` e identidad idempotente;
- `purchase_commitment_ref` u orden relacionada;
- versión/snapshot usado;
- proveedor;
- sede/área;
- actor real y actor efectivo;
- rol operativo;
- turno/check-in;
- permiso exacto;
- línea/presentación/unidad;
- cantidad comprometida;
- cantidad aceptada previa válida;
- saldo antes de esta recepción;
- cantidad observada actual;
- cantidad aceptada actual;
- saldo posterior;
- documentos y evidencia;
- modalidad `inventory` o `record_only`;
- diferencia o ausencia de ella;
- decisión y resultado;
- timestamp;
- correlación con NEXO y NUMERA cuando aplique.

---

#### 51. Contraste AS-IS de `vento-origo`

La implementación observada ya soporta parcialmente el escenario:

1. al abrir una orden calcula por línea:

```text
pending = max(quantity_ordered - quantity_received, 0)
```

2. precarga únicamente líneas con saldo positivo;
3. una nueva recepción acumula `quantity_received` por línea;
4. cuando todas las líneas cumplen `received >= ordered`, calcula `allReceived` y puede marcar técnicamente la orden como `received`;
5. la acción de recepción también puede producir efectos de inventario/costo y solicitudes de maestro dentro del mismo flujo.

Esto demuestra capacidad AS-IS de cantidades parciales, pero no el contrato objetivo completo de identidad, idempotencia, aceptación, ownership y reconciliación.

---

#### 52. Brechas AS-IS y propietarios

| Brecha | Impacto | Propietario | Condición de salida |
| --- | --- | --- | --- |
| `quantity_received` acumulada es una proyección técnica sin demostrar deduplicación integral | retry o concurrencia pueden duplicar saldo consumido | `TREQ-ORIGO-003` + package DB/integración | acumulación deriva de operación idempotente durable/reconciliable |
| prefill `ordered - received` depende del estado físico observado | saldo puede divergir ante reversas, correcciones o efectos parciales | materialización `ORIGO-UX-010/016` | saldo se deriva de efectos vigentes y versionados |
| `allReceived` puede marcar PO técnica `received` | cierre técnico puede confundirse con cierre empresarial | `ORIGO-UX-009/010/016` | total/parcial y lifecycle canónico se proyectan separadamente |
| recepción parcial y diferencia no tienen separación UX completa | entrega fraccionada puede confundirse con incumplimiento o viceversa | `ORIGO-UX-010/011` | parcialidad y diferencia tienen criterios y destinos explícitos |
| ORIGO escribe inventario/costo en el mismo flujo | propiedad física/económica aparece acoplada | `ORIGO-UX-013..015` + integraciones propietarias | handoffs correlacionados materializan verdades NEXO/NUMERA |
| permiso runtime amplio/legacy | autoridad mutante puede no corresponder a `receipts.register` | `ORIGO-AUTH-014` + package consumidor | permission key exacta aplicada server-side |
| múltiples escrituras secuenciales | fallo intermedio puede dejar recepción parcialmente aplicada | `TREQ-ORIGO-003` + package DB/integración | operación atómica o estado durable/reconciliable |

No queda un hallazgo narrativo sin propietario y condición de salida.

---

#### 53. Handoff inmediato a ORIGO-UX-011

`ORIGO-UX-011 — Diseñar diferencias contra orden` recibe:

```text
COMPROMETIDO / ESPERADO
+
ACEPTADO PREVIO
+
SALDO VIGENTE
+
OBSERVADO ACTUAL
+
PRESENTACION / UNIDAD / CONDICION / DOCUMENTOS
+
EVIDENCIA
```

La 011 deberá resolver la experiencia cuando exista una diferencia material en:

- cantidad;
- producto;
- presentación;
- calidad o condición;
- lote o vencimiento;
- precio o documento cuando corresponda;
- proveedor;
- referencia o evidencia.

La 010 no borra la diferencia ni la convierte en simple saldo pendiente.

---

#### 54. Handoff al resto de ORIGO-UX

| Tarea | Entrada exacta proveniente de ORIGO-UX-010 |
| --- | --- |
| `ORIGO-UX-011` | diferencia compara compromiso, saldo, observado y evidencia sin reescribir la orden ni la recepción |
| `ORIGO-UX-012` | costos/precios proyectados durante recepción siguen finalidad y field mask |
| `ORIGO-UX-013` | cada parcial aceptada ORIGO conserva identidad para no repetirse manualmente en NEXO |
| `ORIGO-UX-014` | cada `PUTAWAY_PENDING` parcial entrega solo su alcance aceptado a NEXO de forma idempotente |
| `ORIGO-UX-015` | conciliación económica consume alcance parcial aceptado sin reconocer automáticamente el total del compromiso |
| `ORIGO-UX-016` | prototipo demuestra múltiples parciales, saldo, total posterior, diferencias y handoffs sin doble aplicación |

---

#### 55. Requisitos de prueba derivados

**Resultado:** NO GENERA REQUISITOS DE PRUEBA.

**Requisitos creados:** 0
**Requisitos modificados:** 0
**Requisitos diferidos:** 0
**Requisitos obsoletos:** 0

Justificación: modalidad de recepción, no duplicación, atomicidad, idempotencia, separación de funciones, autorización operacional, revalidación server-side y conservación del ciclo de abastecimiento ya cuentan con obligaciones verificables vigentes. Esta tarea especializa la recepción parcial de `VSCREEN-0077` sin introducir una obligación nueva ni modificar el Registro 04A.

---

#### 56. Cobertura de prueba vigente reutilizada

Se reutiliza sin modificación:

- `TREQ-ORIGO-001` para declarar modalidad `inventory`/`record_only` y evitar duplicación de cantidades, costos, orden recibida o evento financiero;
- `TREQ-ORIGO-003` para tratar la recepción como una operación atómica o durable/reconciliable con clave idempotente estable y sin doble suma de cantidades;
- `TREQ-ORIGO-004` para mantener recepción separada de compra/aprobación y evitar reescrituras destructivas del compromiso;
- `TREQ-AUTH-001` para resolver autoridad mediante permiso, contexto y alcance canónicos;
- `TREQ-AUTH-008` para exigir `T+C`, rol operativo y territorio en capacidades operativas;
- `TREQ-AUTH-010` para preservar segregación y evitar que recepción herede aprobación;
- `TREQ-AUTH-013` para revalidar server-side permiso, actor, territorio, contexto, estado y campos;
- `TREQ-AUTH-015` para conservar evidencia correlacionable de actor, contexto, permiso, recurso, decisión, razones y timestamp.

Esta enumeración es trazabilidad vigente y no constituye una actualización del registro.

---

#### 57. Evidencia de validación

| Clase | Estado | Evidencia |
| --- | --- | --- |
| BUILD | NOT_EXECUTED | `docs:plan:build` corresponde al checkout local después de incorporar el artefacto. |
| LOCAL | NOT_EXECUTED | Formato, quality, delivery, topología, EOL, TREQ, batería global y lifecycle quedan pendientes del checkout local. |
| REMOTA | PASS | Se verificaron `vento-shell/main@8eebf934d80f589339c013d4c7da158863b6b3de`, owner blob `37194a5bb920f82bce3222fb249450331a645ae2`, topología `DEFINE_ONCE / NO_PHYSICAL_INSTANCE`, `VPROC-0022`, `VSCREEN-0077`, `ORIGO-AUTH-007`, reglas de recepciones parciales e idempotencia en integración, 04A ORIGO/AUTH y `vento-origo/main@70860f1ca5f0a4a73e894cbb840956f9f7eda2ad` con cálculo AS-IS de `pending`, acumulación de `quantity_received` y `allReceived`. La entrada inmediata 009 se consume desde el artefacto aprobado SHA-256 `3a08757263cad827f418fdbc097fb5087f414f69d03a398ffc951b27038ad101`. |
| OPERATIVA | NOT_EXECUTED | No se registraron recepciones reales ni se ejecutaron cambios sobre órdenes, inventario, proveedores, NEXO o NUMERA. |
| FÍSICA | NOT_APPLICABLE | `ORIGO-UX-010` no crea instancia física propia ni autoriza cambios de producto, datos o infraestructura. |

---

#### 58. Criterios de aceptación

La tarea queda documentalmente completa cuando:

- [ ] `VSCREEN-0077` permanece como superficie canónica de total/parcial;
- [ ] `VPROC-0022::STEP-RECEIVE_PURCHASE` queda preservado;
- [ ] parcial se define por residual recibible posterior mayor que cero;
- [ ] total se mantiene separado y corresponde a residual cero;
- [ ] parcialidad legítima no se confunde automáticamente con diferencia;
- [ ] una diferencia material se deriva a `ORIGO-UX-011`;
- [ ] una orden/compromiso puede tener `0..N` recepciones;
- [ ] cada llegada real distinta crea identidad de recepción propia;
- [ ] un retry de la misma llegada no crea una segunda recepción;
- [ ] factura/documentos no son por sí solos identidad idempotente;
- [ ] el saldo se conserva por línea;
- [ ] cantidades comprometidas, aceptadas previas, observadas actuales, aceptadas actuales y residuales son distinguibles;
- [ ] recepciones anuladas/revertidas/duplicadas no consumen saldo por suma ciega;
- [ ] un subconjunto de líneas puede recibirse sin cerrar las demás;
- [ ] una línea previamente parcial puede recibir una nueva llegada con identidad nueva;
- [ ] cantidad cero no se usa para simular recepción;
- [ ] exceso sobre saldo no se recorta silenciosamente;
- [ ] una cantidad menor al saldo puede ser parcial legítima o diferencia según contrato y evidencia;
- [ ] presentación y unidad conservan conversión canónica verificable;
- [ ] la orden original no se reduce para hacer coincidir lo recibido;
- [ ] `receipts.register` queda como permiso exacto de nueva recepción;
- [ ] `receipts.register` sigue `OPERATIONAL_ONLY` con `T+C`;
- [ ] `receipts.view` y `origo.access` no conceden mutación;
- [ ] concurrencia revalida saldo, versión, estado y autoridad antes del commit;
- [ ] `STALE_VERSION` bloquea aplicación ciega de un saldo viejo;
- [ ] cada parcial conserva el lifecycle completo de `VPROC-0022`;
- [ ] no se crea un estado canónico `PARTIAL`;
- [ ] parcial limpia puede usar `TR-005` sin pasar por diferencias;
- [ ] parcial con diferencia conserva `TR-004` y `TR-006`;
- [ ] aceptación del alcance parcial usa `VPROC-0022.TR-007`;
- [ ] `TR-007` de una parcial no cierra el compromiso completo;
- [ ] una recepción parcial individual puede reconciliarse sin implicar orden completa;
- [ ] `EVT-004` transporta únicamente el alcance parcial aceptado a NEXO;
- [ ] `EVT-005` no afirma obligación o pago total;
- [ ] `inventory` y `record_only` permanecen distinguibles y protegidos;
- [ ] recepción directa/emergencia sin saldo de compromiso no se etiqueta parcial contra orden por inferencia;
- [ ] maestro de datos pendiente no produce cierre engañoso;
- [ ] corrección/reversión permanecen fuera de `receipts.register`;
- [ ] futuras recepciones consumen el saldo vigente con identidad nueva;
- [ ] el residual no se marca recibido para cerrar artificialmente;
- [ ] la pantalla muestra saldo antes y después de la recepción;
- [ ] vacío, sin saldo, stale, diferencia, solo consulta y fallo técnico no se confunden;
- [ ] auditoría conserva cantidades y residual por línea;
- [ ] `pending = ordered - received` y `allReceived` del runtime se tratan como evidencia AS-IS, no contrato canónico suficiente;
- [ ] cada brecha AS-IS conserva propietario y condición de salida;
- [ ] `ORIGO-UX-011` recibe handoff suficiente para diseñar diferencias;
- [ ] no se crean ni modifican requisitos de prueba;
- [ ] no se ejecutan cambios físicos desde esta tarea.

---

#### 59. Límites

Esta tarea no:

- implementa `VSCREEN-0077`;
- crea rutas, componentes o Server Actions;
- crea permission keys;
- activa `receipts.register` en catálogo o grants;
- crea estados nuevos de `VPROC-0022`;
- define tolerancias numéricas de recepción;
- define política empresarial de backorder;
- decide sustituciones de producto;
- resuelve diferencias contra orden;
- corrige ni reversa recepciones;
- modifica la orden para hacerla coincidir con lo recibido;
- cancela el saldo de una orden;
- registra una recepción real;
- mueve stock propietario de NEXO;
- crea LOC/LPN o ubicación física;
- reconoce obligación económica definitiva;
- ejecuta pagos;
- aprueba datos maestros;
- modifica `vento-origo`;
- modifica Supabase, migraciones, RLS, RPC, grants, Storage o datos;
- modifica contratos generados;
- modifica el Registro 04A;
- ejecuta E5;
- crea instancia física;
- desarrolla `ORIGO-UX-011`.

---

#### 60. Continuidad

**ÚLTIMA TAREA APROBADA**
`ORIGO-UX-009 — Diseñar recepción total`

**TAREA ACTUAL APROBADA**
`ORIGO-UX-010 — Diseñar recepción parcial`

**SIGUIENTE TAREA RESERVADA**
`ORIGO-UX-011 — Diseñar diferencias contra orden`
### ✅ ORIGO-UX-011 — Diseñar diferencias contra orden

**Estado:** APROBADA
**Tarea anterior:** ORIGO-UX-010 — Diseñar recepción parcial
**Tarea siguiente:** ORIGO-UX-012 — Ocultar precios cuando no correspondan
**Tipo de tarea:** diseño documental integral de la experiencia de diferencias de recepción contra orden sobre `VSCREEN-0078` y `VPROC-0022`, definiendo detección tipada, conservación de pedido/observado/documentado, tratamiento por línea, decisiones de aceptar, retener, reclamar, corregir o rechazar, transición `DOCUMENT_CHECK_IN_PROGRESS → DIFFERENCE_UNDER_REVIEW → ACCEPTANCE_PENDING`, excepciones `QUARANTINE/HOLD/ESCALATE/REJECT`, relación con corrección y reversión sin inventar `receipts.resolve`, y efectos separados hacia NEXO, NUMERA y expediente de proveedor; `DEFINE_ONCE` / `NO_PHYSICAL_INSTANCE`
**Bloque:** BLOQUE M — ORIGO
**Repositorio propietario:** `vento-group-sas/vento-shell`
**Archivo propietario:** `docs/plan-canonico/modular/bloques/M_ORIGO/02_EXPERIENCIA_DE_COMPRAS.md`
**Estado físico resultante:** `NO_PHYSICAL_INSTANCE`
**Cambios físicos autorizados:** ninguno; esta tarea no modifica código, navegación, componentes, procesos, permisos, roles, grants, datos, tablas, RLS, RPC, migraciones, Supabase, Storage, packages, consumidores ni despliegues
**Requisitos de prueba creados o modificados:** 0

---

#### 1. Propósito

Diseñar el contrato de experiencia para identificar, revisar y decidir diferencias entre una orden o compromiso de compra y una recepción observada, sin borrar la evidencia original ni convertir una discrepancia en edición silenciosa de la orden, inventario o hecho económico.

La experiencia debe permitir:

- comparar lo comprometido contra lo observado y documentado;
- clasificar la diferencia por tipo y alcance;
- conservar una decisión por línea o alcance afectado;
- distinguir parcialidad legítima de diferencia material;
- retener o poner en cuarentena cuando la aceptación no deba continuar;
- escalar una diferencia sin conceder aprobación por el solo escalamiento;
- rechazar antes de la aceptación cuando corresponda;
- aceptar únicamente el alcance autorizado y suficientemente tratado;
- abrir devolución o reclamación como expediente de resolución con proveedor cuando corresponda;
- derivar corrección o reversión solo cuando exista un efecto ya aplicado que deba compensarse;
- mantener separados el efecto comercial de ORIGO, el efecto físico de NEXO y el efecto económico de NUMERA.

La tarea diseña la experiencia objetivo sobre:

```text
VSCREEN-0078 — Resolución de diferencias de recepción
VPROC-0022    — Recibir compras, verificar conformidad y resolver diferencias
```

No implementa la superficie ni crea una nueva permission key.

---

#### 2. Entrada aprobada de ORIGO-UX-010

`ORIGO-UX-010` entrega una frontera obligatoria:

```text
ENTREGA PARCIAL LEGÍTIMA
!=
DIFERENCIA CONTRA ORDEN
```

La parcialidad conserva saldo recibible cuando el alcance observado es válido para esa llegada.

La diferencia aparece cuando existe una desviación material entre una referencia autorizada y el hecho observado, documentado o aceptable.

La tarea actual consume:

- referencia de orden o compromiso y su versión vigente;
- líneas comprometidas y saldo aplicable;
- recepción y observación física/documental;
- proveedor y documentos relacionados;
- cantidades, unidades y presentaciones;
- condición o calidad observada cuando aplique;
- valores o condiciones comerciales cuando el actor tenga autorización para verlos;
- evidencia de recepciones parciales anteriores;
- identidad de actor, sede y contexto operativo;
- diferencia detectada y su alcance.

---

#### 3. Naturaleza y topología

La topología vigente de `ORIGO-UX-001..016` establece:

```text
mode = DEFINE_ONCE
execution_gate = NO_PHYSICAL_INSTANCE
```

Por tanto:

```text
CONTRATO DOCUMENTAL ÚNICO
→ SIN INSTANCIA FÍSICA PROPIA
→ SIN MIGRACIÓN
→ SIN CAMBIO DE RUNTIME
```

Esta tarea diseña la decisión de experiencia y sus fronteras; no materializa componentes, permisos ni persistencia.

---

#### 4. Fuentes contractuales preservadas

La tarea conserva sin redefinir:

- `VPROC-0022` y su lifecycle aprobado;
- `VSCREEN-0077` como captura de recepción total o parcial;
- `VSCREEN-0078` como resolución de diferencias;
- `VSCREEN-0079` como historia y auditoría posterior;
- `ORIGO-AUTH-007` para registrar una recepción nueva;
- `ORIGO-AUTH-008` para reversión y corrección con sustitución;
- la regla de ownership ORIGO → NEXO → NUMERA;
- la definición canónica de diferencia como desviación tipada entre orden, entrega, documento y aceptación;
- la definición de devolución o reclamación como expediente de resolución con proveedor;
- la separación entre observación, decisión y efectos derivados;
- el contrato de idempotencia y reconciliación de recepción.

No se adopta un literal técnico AS-IS como nuevo estado empresarial.

---

#### 5. Pantalla y paso canónicos

Superficie propietaria:

```text
VSCREEN-0078 — Resolución de diferencias de recepción
```

Binding:

```text
VPROC-0022
VPROC-0022::STEP-RESOLVE_RECEIPT_VARIANCE
DECIDE / DECISION
```

La pantalla no sustituye `VSCREEN-0077`.

Regla:

```text
CAPTURAR RECEPCIÓN
!=
RESOLVER DIFERENCIA
```

---

#### 6. Estado empresarial de entrada

La diferencia material se introduce mediante:

```text
VPROC-0022.TR-004
DOCUMENT_CHECK_IN_PROGRESS
→ DIFFERENCE_UNDER_REVIEW
```

`DIFFERENCE_UNDER_REVIEW` significa que existe una discrepancia documentada pendiente de decisión o aceptación autorizada.

No significa automáticamente:

```text
RECHAZADA
REVERSADA
CORREGIDA
ACEPTADA
PAGADA
```

---

#### 7. Bypass cuando no existe diferencia

Cuando la verificación física y documental concluye sin diferencia material se conserva:

```text
VPROC-0022.TR-005
DOCUMENT_CHECK_IN_PROGRESS
→ ACCEPTANCE_PENDING
```

con bypass justificado.

La UX no debe forzar `DIFFERENCE_UNDER_REVIEW` para:

- una recepción parcial legítima prevista;
- una segunda entrega válida contra saldo pendiente;
- una diferencia visual sin impacto empresarial;
- una discrepancia ya descartada por comparación autoritativa.

No se inventan umbrales numéricos en esta tarea.

---

#### 8. Definición operativa de diferencia

Se preserva:

```text
DIFERENCIA
=
DESVIACIÓN TIPADA ENTRE
ORDEN / COMPROMISO
ENTREGA
DOCUMENTO
ACEPTACIÓN
```

Una diferencia debe poder responder:

```text
QUÉ SE ESPERABA
QUÉ SE OBSERVÓ O DOCUMENTÓ
DÓNDE ESTÁ LA DESVIACIÓN
QUÉ ALCANCE AFECTA
QUÉ DECISIÓN SE TOMÓ
QUÉ EFECTO QUEDÓ PENDIENTE O PRODUCIDO
```

---

#### 9. Cinco familias mínimas de diferencia

`VSCREEN-0078` debe representar al menos las familias canónicas:

```text
CANTIDAD
CALIDAD
PRECIO
DOCUMENTO
PRESENTACIÓN
```

Estas familias pueden tener detalle adicional, pero la UX no debe inventar categorías paralelas que oculten su naturaleza empresarial.

---

#### 10. Diferencia de cantidad

Existe diferencia de cantidad cuando lo observado para una línea no coincide con el alcance cuantitativo esperado aplicable a esa llegada o decisión.

La UX debe mostrar por línea, cuando corresponda:

- cantidad comprometida;
- saldo recibible previo;
- cantidad observada;
- cantidad propuesta para aceptación;
- exceso, faltante o cantidad retenida;
- residual posterior esperado.

Regla:

```text
PARCIALIDAD PREVISTA
!=
FALTANTE MATERIAL POR INFERENCIA
```

Un faltante solo se trata como diferencia cuando contradice el compromiso o expectativa aplicable; una recepción parcial legítima conserva saldo sin convertirse automáticamente en incidencia.

---

#### 11. Exceso de cantidad

Una cantidad observada por encima del saldo o alcance permitido no se incorpora automáticamente.

Debe quedar explícito:

```text
ESPERADO
OBSERVADO
EXCESO
DECISIÓN
```

La UX no puede resolver un exceso:

- ampliando silenciosamente la orden;
- sumándolo al inventario como autorizado por defecto;
- convirtiéndolo en nueva línea aprobada;
- suponiendo una obligación económica adicional.

El tratamiento puede requerir retención, rechazo, reclamación o una decisión comercial posterior autorizada.

---

#### 12. Diferencia de calidad o condición

La familia `CALIDAD` incluye la conformidad del bien frente a condición o especificación aplicable.

La evidencia puede considerar, cuando corresponda:

- estado físico;
- integridad;
- lote;
- vencimiento;
- temperatura;
- especificación acordada;
- documentación de calidad;
- evidencia visual o técnica autorizada.

Una diferencia de calidad no se resuelve alterando la descripción original de lo observado.

---

#### 13. Diferencia de precio

La diferencia de precio compara la condición económica aplicable contra el documento o valor presentado para la recepción.

Puede involucrar, según el contrato de compra:

- precio aplicable;
- presentación o unidad económica;
- moneda;
- impuestos o componentes permitidos;
- condiciones vigentes relacionadas.

La UX no concede por esta tarea visibilidad general de precios.

`ORIGO-UX-012` conserva el field mask y la minimización de datos sensibles.

Un actor sin autoridad para ver precio no debe recibir el valor protegido como efecto secundario de participar en una diferencia.

---

#### 14. Diferencia documental

Una diferencia documental puede surgir por ausencia, inconsistencia o contradicción entre los soportes aplicables.

La UX debe poder distinguir al menos:

- documento faltante;
- referencia que no coincide;
- proveedor o identidad documental inconsistente;
- soporte vencido o no aplicable;
- información de factura, remisión, certificado o condición que no coincide con la referencia vigente.

La ausencia documental no se convierte automáticamente en rechazo; debe pasar por la decisión correspondiente.

---

#### 15. Diferencia de presentación

Una diferencia de presentación ocurre cuando lo entregado o documentado no coincide con la presentación/unidad acordada o su conversión gobernada.

La UX debe mantener separados:

```text
PRODUCTO
PRESENTACIÓN
UNIDAD DE ENTRADA
CONVERSIÓN
UNIDAD CANÓNICA
```

No se corrige una presentación:

- reasignando silenciosamente otra unidad;
- creando una conversión no aprobada;
- aprobando maestro de datos desde la recepción;
- haciendo coincidir cantidades mediante una conversión improvisada.

Una presentación nueva o pendiente mantiene su tratamiento de maestro de datos y no equivale a diferencia resuelta.

---

#### 16. Diferencias múltiples en una misma recepción

Una recepción puede contener varias diferencias simultáneas.

Ejemplo conceptual:

```text
LÍNEA A → CANTIDAD
LÍNEA B → PRESENTACIÓN + PRECIO
LÍNEA C → CALIDAD
CABECERA / SOPORTE → DOCUMENTO
```

La UX debe mantener una decisión y evidencia suficientemente granular para cada alcance afectado.

No se obliga a que toda la recepción tenga un único resultado cuando existen líneas con tratamientos distintos.

---

#### 17. Modelo mínimo de comparación

Toda diferencia debe conservar, como mínimo según aplique:

```text
REFERENCIA DE COMPRA / ORDEN
VERSIÓN DE REFERENCIA
RECEPCIÓN
LÍNEA O ALCANCE AFECTADO
TIPO DE DIFERENCIA
VALOR ESPERADO
VALOR OBSERVADO O DOCUMENTADO
EVIDENCIA
ACTOR / FUENTE
DECISIÓN
EFECTOS PENDIENTES O PRODUCIDOS
```

La referencia aprobada no se sobrescribe para eliminar la discrepancia.

---

#### 18. Regla pedido → observado → diferencia → decisión → efecto

La experiencia conserva explícitamente:

```text
LO PEDIDO
+
LO OBSERVADO
+
LA DIFERENCIA
+
LA DECISIÓN
+
EL EFECTO POSTERIOR
```

Ninguno de esos cinco componentes puede ser sustituido por un único `status` genérico.

---

#### 19. La orden no se edita para resolver la diferencia

Regla:

```text
DIFERENCIA DE RECEPCIÓN
!=
PERMISO PARA REESCRIBIR LA ORDEN
```

Una orden aprobada o emitida conserva su versión histórica.

Si una diferencia revela que el compromiso debe cambiar materialmente, ese cambio sigue el contrato de revisión de orden aplicable; no se produce desde `VSCREEN-0078` mediante edición destructiva.

---

#### 20. La observación original tampoco se reescribe

La recepción debe preservar lo efectivamente observado.

No:

```text
OBSERVADO = 8
ORDENADO = 10
→ CAMBIAR OBSERVADO A 10 PARA CERRAR
```

Tampoco:

```text
PRESENTACIÓN RECIBIDA B
→ EDITAR LA OBSERVACIÓN COMO PRESENTACIÓN A
```

La corrección posterior crea un nuevo hecho o relación correctiva; no borra la observación histórica.

---

#### 21. Acciones de decisión de la experiencia

El prototipo administrativo aprobado exige poder decidir entre:

```text
ACEPTAR
RETENER
RECLAMAR
CORREGIR
RECHAZAR
```

Estas son decisiones de experiencia.

No todas equivalen a una permission key ni a una transición directa del proceso.

La UX debe mapear cada decisión al contrato propietario que realmente produzca su efecto.

---

#### 22. Aceptar una diferencia tratada

Aceptar no significa borrar la diferencia.

Cuando existe tratamiento suficiente para someter la recepción a decisión se conserva:

```text
VPROC-0022.TR-006
DIFFERENCE_UNDER_REVIEW
→ ACCEPTANCE_PENDING
```

Después, la aceptación autorizada usa:

```text
VPROC-0022.TR-007
ACCEPTANCE_PENDING
→ PUTAWAY_PENDING
```

La aceptación debe identificar exactamente el alcance aceptado.

---

#### 23. Alcance mixto de aceptación

Una recepción puede tener líneas o cantidades con resultados diferentes.

La decisión debe distinguir, según corresponda:

- aceptado;
- aceptado parcialmente;
- aceptado bajo condición autorizada;
- retenido;
- en cuarentena;
- rechazado;
- pendiente de resolución.

Solo el alcance autorizado como aceptado puede participar en el handoff físico o económico correspondiente.

Un resultado mixto no autoriza representar todo el documento como limpio.

---

#### 24. Retener mediante HOLD

Se preserva:

```text
VPROC-0022.EX-002 — HOLD
```

`HOLD` suspende la aceptación durante revisión física o documental y mantiene mercancía y evidencia bajo tratamiento explícito.

La UX debe mostrar:

- motivo;
- alcance retenido;
- responsable;
- evidencia pendiente;
- condición de salida.

`HOLD` no equivale a rechazo ni aceptación.

---

#### 25. Cuarentena

Se preserva:

```text
VPROC-0022.EX-001 — QUARANTINE
```

La cuarentena puede aplicarse desde la llegada hasta la aceptación cuando la condición requiere segregación controlada.

Mientras esté activa:

```text
NO PUTAWAY UTILIZABLE
NO EFECTO ECONÓMICO DEFINITIVO
NO REPRESENTAR COMO ACEPTADO LIMPIO
```

La evidencia original se conserva.

---

#### 26. Escalamiento

Se preserva:

```text
VPROC-0022.EX-003 — ESCALATE
```

El escalamiento registra, como mínimo:

- nivel o destino competente;
- motivo;
- alcance;
- evidencia;
- plazo o condición de respuesta cuando exista política aplicable.

Escalar no concede aprobación ni resuelve la diferencia por sí mismo.

---

#### 27. Rechazo

Se preserva:

```text
VPROC-0022.EX-004 — REJECT
```

El rechazo aplicable ocurre antes de la aceptación del alcance afectado y conserva:

- motivo estructurado;
- evidencia;
- proveedor y entrega;
- alcance rechazado;
- documentos relacionados;
- custodia o instrucción de retorno aplicable.

Rechazar no elimina el hecho de que la entrega llegó.

---

#### 28. Reclamar al proveedor

Una reclamación se conserva como expediente de resolución con el proveedor.

La UX puede derivar desde una diferencia:

```text
DIFERENCIA DOCUMENTADA
→ EXPEDIENTE DE RECLAMACIÓN / DEVOLUCIÓN
→ RESPUESTA / COMPROMISO / RESOLUCIÓN
```

No se inventa una nueva transición de `VPROC-0022` solo por abrir la reclamación.

La reclamación debe mantener referencia a la diferencia, recepción, proveedor, evidencia y efectos bloqueados o pendientes.

`VSCREEN-0146` conserva la experiencia de desempeño y reclamaciones de proveedor.

---

#### 29. Corregir antes de efectos aplicados

Si la diferencia se detecta durante verificación y aún no existe un efecto propietario aplicado que deba compensarse, la corrección consiste en tratar la discrepancia y conservar el antes/después de la decisión.

No requiere por inferencia:

```text
receipts.reverse
```

La observación original permanece auditable.

---

#### 30. Corregir después de efectos aplicados

Cuando ya existe una recepción aplicada y la resolución exige sustituirla, se conserva el contrato de `ORIGO-AUTH-008`:

```text
origo.procurement.receipts.reverse
+
origo.procurement.receipts.register
```

con correlación:

```text
ORIGINAL
↔ REVERSIÓN
↔ REEMPLAZO
```

`VSCREEN-0078` no amplía `receipts.register` para absorber reversión.

---

#### 31. No se crea `receipts.resolve`

Las fuentes vigentes no definen una identidad exacta:

```text
origo.procurement.receipts.resolve
```

Por tanto esta tarea:

- no inventa esa clave;
- no presenta una séptima capacidad correctiva;
- no trata `STEP-RESOLVE_RECEIPT_VARIANCE` como permiso;
- no convierte una decisión de aceptar, retener, reclamar, corregir o rechazar en autoridad implícita para mutaciones materiales.

Cada efecto consume la capacidad propietaria que corresponda.

---

#### 32. Frontera con `receipts.register`

`origo.procurement.receipts.register` autoriza una recepción nueva dentro del contexto operativo permitido.

No autoriza por sí sola:

```text
RESOLVER DIFERENCIA
REVERSAR RECEPCIÓN
EDITAR ORDEN
APROBAR DATOS MAESTROS
RECONOCER OBLIGACIÓN ECONÓMICA
```

Registrar una diferencia durante la recepción no concede la decisión posterior.

---

#### 33. Frontera con `receipts.reverse`

`origo.procurement.receipts.reverse` protege una compensación material de un efecto ya aplicado.

Contrato aprobado:

```text
authorization_requirement = BASE_AND_OPERATIONAL
operational prerequisite = T+C
resource = PURCHASE_RECEIPT
```

La decisión requiere autoridad base y contexto operativo válido.

El receptor ordinario no adquiere reversión por haber registrado la recepción original.

---

#### 34. Reversión no es rechazo

Regla:

```text
REJECT
!=
REVERSE
```

`REJECT` rehúsa el alcance antes de aceptación aplicable.

`REVERSE` compensa un efecto ya aplicado.

La UX no debe presentar ambos verbos como equivalentes ni usar una reversión para fabricar un rechazo histórico.

---

#### 35. Acciones CCR preservadas

Se preservan exactamente:

```text
VPROC-0022.CCR-001 — CANCEL
VPROC-0022.CCR-002 — VOID
VPROC-0022.CCR-003 — REVERSE
VPROC-0022.CCR-004 — RESTATE
```

Reglas:

- `CANCEL` detiene trabajo futuro permitido y conserva residuales;
- `VOID` marca como nulo un instrumento inválido o duplicado sin borrarlo;
- `REVERSE` crea un efecto inverso autorizado cuando ya existe efecto aplicado;
- `RESTATE` rectifica referencia o clasificación preservando el hecho original.

Ninguna acción CCR borra la evidencia de la diferencia.

---

#### 36. Diferencia y saldo pendiente

Una diferencia puede afectar el saldo recibible, pero no debe modificarlo por inferencia.

Ejemplos:

```text
FALTANTE ACEPTADO COMO PARCIAL LEGÍTIMA
→ SALDO PERMANECE PENDIENTE

EXCESO RECHAZADO
→ NO AUMENTA COMPROMISO

LÍNEA RECHAZADA POR CALIDAD
→ NO SE PRESENTA COMO ACEPTADA

PRESENTACIÓN EN HOLD
→ NO SE CONSUME COMO ACEPTACIÓN LIMPIA
```

La determinación final del saldo usa únicamente resultados válidos y correlacionados.

---

#### 37. Diferencia y recepciones múltiples

Se conserva:

```text
1 PURCHASE_COMMITMENT
→ 0..N RECEPCIONES VPROC-0022
```

Una diferencia en una recepción no autoriza:

- reescribir recepciones anteriores;
- fusionar dos llegadas reales;
- reutilizar la identidad idempotente de otra recepción;
- recalcular historia mediante borrado destructivo.

Cada recepción conserva su identidad y la diferencia queda correlacionada con la recepción donde fue detectada.

---

#### 38. Idempotencia de la decisión

Resolver una diferencia es una decisión empresarial sensible.

La UX y materialización futura deben preservar:

- identidad estable de la intención;
- versión de recepción y referencia evaluadas;
- replay del mismo comando sin duplicar efectos;
- conflicto cuando la misma identidad se reutiliza con contenido incompatible;
- revalidación de autoridad, estado y alcance en retry;
- resultado durable recuperable.

Un doble clic no puede producir doble rechazo, doble reversión, doble reemplazo ni doble reclamación.

---

#### 39. Concurrencia y versión

Antes de confirmar una decisión debe reevaluarse:

- versión de orden/compromiso;
- estado de recepción;
- diferencias ya decididas;
- saldo aplicable;
- correcciones o reversas posteriores;
- contexto y autoridad del actor;
- efectos físicos o económicos ya confirmados.

Si la base cambió:

```text
STALE_VERSION
→ BLOQUEAR COMMIT CIEGO
→ RECARGAR Y REEVALUAR
```

---

#### 40. Resultado desconocido

Un timeout o fallo técnico no autoriza repetir indiscriminadamente la decisión.

Regla:

```text
RESULT_UNKNOWN
→ RECONCILIAR
→ DETERMINAR RESULTADO DURABLE
→ REINTENTAR SOLO SI ES SEGURO
```

No se presenta un fallo técnico como rechazo, hold o diferencia resuelta.

---

#### 41. Frontera ORIGO ↔ NEXO

ORIGO conserva la aceptación comercial y documental.

NEXO conserva el efecto físico de entrada, ubicación y custodia.

Por tanto:

```text
DIFERENCIA RESUELTA EN ORIGO
!=
MOVIMIENTO NEXO YA APLICADO
```

Cuando existe alcance aceptado:

```text
VPROC-0022.TR-007
ACCEPTANCE_PENDING
→ PUTAWAY_PENDING
```

solo el alcance aceptado participa en el handoff físico.

`ORIGO-UX-013` y `ORIGO-UX-014` conservan la continuidad posterior.

---

#### 42. Frontera ORIGO ↔ NUMERA

Una diferencia de cantidad, precio, documento, rechazo, retención o reclamación puede afectar la proyección económica.

Pero:

```text
DECISIÓN ORIGO
!=
OBLIGACIÓN NUMERA YA RECONOCIDA
```

La proyección posterior debe conservar el alcance aceptado, retenido, rechazado o pendiente necesario para la conciliación.

`ORIGO-UX-015` conserva el handoff financiero.

---

#### 43. Diferencia de precio y minimización

La resolución puede requerir un actor autorizado para revisar precio o condición económica.

Regla:

```text
NECESIDAD DE DECIDIR DIFERENCIA
!=
AUTORIZACIÓN GENERAL PARA VER PRECIOS
```

Cuando el receptor no tenga visibilidad suficiente:

- se mantiene la existencia de la diferencia;
- se muestra una razón minimizada;
- se deriva a un actor autorizado;
- no se filtra el valor protegido.

`ORIGO-UX-012` define la experiencia de ocultamiento y field masks.

---

#### 44. Maestro de producto o presentación

Una diferencia puede descubrir que el producto o presentación no existe, está mal definido o requiere aprobación.

La experiencia puede abrir el handoff correspondiente, pero no concede autoridad para aprobar maestro.

Regla:

```text
DIFERENCIA DETECTADA
!=
MAESTRO APROBADO
```

Mientras el maestro permanezca pendiente, la UX no debe presentar la recepción como resuelta limpiamente por haber creado una solicitud de revisión.

---

#### 45. Devolución y reclamación

Las diferencias y devoluciones deben producir efectos correlacionados y compensatorios cuando corresponda.

Una devolución o reclamación debe conservar:

- recepción y diferencia origen;
- proveedor;
- líneas y cantidades;
- motivo;
- evidencia;
- custodia o estado del bien cuando aplique;
- decisión y actor;
- resultado del proveedor;
- compensación o efecto económico pendiente cuando exista.

No se borra la recepción para representar una devolución.

---

#### 46. Estado `RECEIPT_RECONCILED`

El cierre normal continúa siendo:

```text
VPROC-0022.RECEIPT_RECONCILED
```

Una diferencia puede coexistir con cierre únicamente cuando su tratamiento y residuales estén suficientemente resueltos o asignados según el contrato.

No:

```text
DIFERENCIA ABIERTA SIN OWNER
→ RECEIPT_RECONCILED
```

Tampoco:

```text
RECEIPT_RECONCILED
→ PROVEEDOR PAGADO
```

---

#### 47. Historia y auditoría

La evidencia debe permitir reconstruir:

- orden/compromiso y versión;
- recepción;
- línea o alcance;
- esperado;
- observado/documentado;
- tipo de diferencia;
- evidencia;
- actor y fuente;
- decisiones intermedias;
- hold, cuarentena o escalamiento;
- aceptación/rechazo;
- reclamación o devolución;
- corrección/reversa cuando exista;
- handoff físico;
- handoff económico;
- resultado final.

`VSCREEN-0079` conserva la reconstrucción transversal del ciclo.

---

#### 48. Estado de experiencia de VSCREEN-0078

La superficie debe distinguir al menos:

| Estado UX | Significado | Tratamiento |
| --- | --- | --- |
| `DIFERENCIA_PENDIENTE` | existe discrepancia sin decisión suficiente | mostrar comparación y acciones permitidas |
| `EN_RETENCIÓN` | aceptación suspendida | mostrar motivo, owner y condición de salida |
| `EN_CUARENTENA` | alcance segregado por condición | impedir presentación como aceptado utilizable |
| `ESCALADA` | decisión requiere nivel competente | conservar destino y evidencia |
| `RECLAMACIÓN_ABIERTA` | existe expediente con proveedor | mostrar correlación sin fingir cierre |
| `TRATADA_PARA_ACEPTACIÓN` | existe tratamiento suficiente para pasar a aceptación | derivar al contrato de aceptación |
| `RECHAZADA` | alcance fue rechazado antes de aceptación | conservar retorno/custodia y evidencia |
| `DESACTUALIZADA` | cambió la base evaluada | recargar y reevaluar |
| `FALLO_TÉCNICO` | no se conoce el resultado de una dependencia | no presentarlo como decisión empresarial |

Estos son estados de experiencia, no nuevos estados de `VPROC-0022`.

---

#### 49. Vacío, diferencia y fallo no se confunden

Reglas:

```text
SIN DIFERENCIA
!=
DIFERENCIA RESUELTA

DIFERENCIA RESUELTA
!=
DIFERENCIA RECHAZADA

DIFERENCIA RECHAZADA
!=
REVERSIÓN

DESACTUALIZADA
!=
FALLO TÉCNICO

FALLO TÉCNICO
!=
HOLD EMPRESARIAL
```

La razón de bloqueo debe ser suficiente para orientar sin exponer datos protegidos.

---

#### 50. Implementación AS-IS observada

El runtime actual no demuestra una superficie dedicada equivalente a `VSCREEN-0078` con workflow integral de diferencias.

Sí existen capacidades parciales:

- captura de cantidades por línea;
- presentación/unidad de entrada;
- costos e impuestos observados en la recepción;
- lote y vencimiento;
- notas;
- estado técnico `pending_review` cuando existe revisión de maestro;
- reversión de recepción desde historial;
- corrección mediante `correction_entry_id` y reemplazo.

Esto demuestra piezas reales, no el contrato completo de resolución de diferencias.

---

#### 51. Reversión AS-IS observada

La acción `reverseReceipt` observada:

- exige autenticación;
- exige comentario;
- valida existencia y sede;
- exige estado técnico `received`;
- aplica una ventana local de treinta minutos;
- invoca `origo_reverse_inventory_entry`.

La ventana local no se eleva a política empresarial canónica.

La acción observada no sustituye la decisión de diferencia ni demuestra por sí sola la autoridad canónica completa de `receipts.reverse`.

---

#### 52. Corrección AS-IS observada

El flujo de corrección observado usa `correction_entry_id` para:

1. identificar la recepción original;
2. reversar el efecto anterior;
3. crear una nueva recepción;
4. producir efectos derivados;
5. vincular original y reemplazo.

Clasificación preservada:

```text
AS_IS_REGISTER_AND_CORRECTION_COUPLED
```

El contrato objetivo mantiene:

```text
REGISTER AUTHORITY
!=
REVERSE AUTHORITY
```

---

#### 53. Brechas AS-IS y propietarios

| Brecha | Riesgo | Propietario | Condición de salida |
| --- | --- | --- | --- |
| no existe workflow integral de `VSCREEN-0078` | diferencias tratadas como nota/corrección técnica | `ORIGO-UX-011` + materialización propietaria posterior | la experiencia conserva tipo, esperado, observado, decisión y efecto |
| parcialidad puede confundirse con diferencia | cierre o incidencia falsa | `ORIGO-UX-010` / `ORIGO-UX-011` | parcialidad válida y discrepancia quedan separadas |
| corrección y registro comparten permiso AS-IS | receptor ordinario podría absorber corrección sensible | `ORIGO-AUTH-008` + materialización propietaria | `reverse` y `register` se evalúan independientemente |
| reversión técnica puede confundirse con rechazo | historia empresarial falsa | `ORIGO-UX-011` + `ORIGO-AUTH-008` | rechazo preaceptación y reversión posefecto usan contratos distintos |
| ventana local de corrección actúa como política implícita | decisiones bloqueadas por constante no gobernada | implementación propietaria de `VPROC-0022` | política se resuelve desde contrato canónico |
| precio puede exponerse al receptor por diferencia | fuga de información sensible | `ORIGO-UX-012` / `ORIGO-AUTH-010` | field mask y derivación a actor autorizado |
| efectos físicos/económicos pueden mezclarse con la decisión | stock u obligación incorrectos | `ORIGO-UX-014` / `ORIGO-UX-015` | cada dominio confirma su efecto correlacionado |
| reclamación de proveedor no tiene superficie dedicada observada | seguimiento informal o no trazable | `ORIGO-UX-016` + contratos propietarios de proveedor/evidencia | prototipo e historia conservan expediente y resolución |

No se crean pendientes narrativos sin owner.

---

#### 54. Requisitos de prueba derivados

**Resultado:** NO GENERA REQUISITOS DE PRUEBA

**Requisitos creados:** 0
**Requisitos modificados:** 0
**Requisitos diferidos:** 0
**Requisitos obsoletos:** 0
**Fragmentos del Registro 04A afectados:** 0

**Justificación:** la tarea concreta obligaciones ya protegidas por requisitos vigentes sobre recepción, parcialidad, corrección, idempotencia, autorización, segregación, server-side enforcement y auditoría. No introduce una obligación verificable nueva que requiera modificar el registro.

---

#### 55. Cobertura de prueba vigente reutilizada

Sin modificar el Registro 04A, esta tarea reutiliza:

- `TREQ-ORIGO-001` para impedir que corrección, conversión o repetición duplique cantidades, costos, orden o hecho financiero;
- `TREQ-ORIGO-003` para atomicidad, durabilidad, idempotencia y corrección correlacionada de la recepción;
- `TREQ-ORIGO-004` para preservar separación entre compra, aprobación, orden y recepción sin edición destructiva;
- `TREQ-AUTH-001` para resolver capacidades por permiso, contexto y alcance canónicos;
- `TREQ-AUTH-008` para distinguir autoridad administrativa de contexto operativo cuando corresponda;
- `TREQ-AUTH-010` para segregación de funciones;
- `TREQ-AUTH-013` para revalidación server-side de cada mutación;
- `TREQ-AUTH-015` para evidencia correlacionable de actor, contexto, permiso, recurso, decisión y timestamp.

Esta sección es trazabilidad de cobertura existente, no actualización del registro.

---

#### 56. Handoffs documentales posteriores

| Tarea posterior | Handoff recibido desde ORIGO-UX-011 |
| --- | --- |
| `ORIGO-UX-012` | diferencia de precio o condición comercial requiere minimización y field mask sin ocultar la existencia del problema |
| `ORIGO-UX-013` | una diferencia resuelta en ORIGO no debe generar una segunda captura manual equivalente en NEXO |
| `ORIGO-UX-014` | solo el alcance aceptado y correlacionado puede producir entrada física en NEXO |
| `ORIGO-UX-015` | NUMERA consume únicamente la proyección económica autorizada, incluyendo diferencias, retenciones o rechazos relevantes |
| `ORIGO-UX-016` | el prototipo debe reconstruir orden, recepción, diferencia, decisión, reclamación/corrección y efectos sin inventar score ni borrar historia |

La tarea no desarrolla esos contratos posteriores.

---

#### 57. Evidencia de validación

| Clase | Estado | Evidencia |
| --- | --- | --- |
| BUILD | `NOT_EXECUTED` | La compilación documental se ejecutará después de incorporar la tarea en el archivo propietario. |
| LOCAL | `NOT_EXECUTED` | No se ejecutaron validadores del checkout del usuario durante la preparación anticipada. |
| REMOTA | `PASS` | Se verificaron owner, topología, `VPROC-0022`, `VSCREEN-0077..0079`, `ORIGO-AUTH-007/008`, Registro 04A, contratos de experiencia y runtime actual de recepción/corrección/reversión. |
| OPERATIVA | `NOT_EXECUTED` | No se registró, retuvo, rechazó, corrigió ni reversó una recepción real; no se ejecutaron mutaciones de datos o flujos desplegados. |
| FÍSICA | `NOT_APPLICABLE` | `ORIGO-UX-011` es `DEFINE_ONCE / NO_PHYSICAL_INSTANCE`. |

---

#### 58. Criterios de aceptación

- [x] La tarea mantiene exactamente `ORIGO-UX-011 — Diseñar diferencias contra orden`.
- [x] La tarea anterior es `ORIGO-UX-010` y la siguiente `ORIGO-UX-012`.
- [x] Se conserva `DEFINE_ONCE / NO_PHYSICAL_INSTANCE`.
- [x] `VSCREEN-0078` queda vinculada a `VPROC-0022::STEP-RESOLVE_RECEIPT_VARIANCE` como `DECIDE / DECISION`.
- [x] La diferencia se define como desviación tipada entre orden, entrega, documento y aceptación.
- [x] Se preservan las familias cantidad, calidad, precio, documento y presentación.
- [x] Parcialidad legítima no se convierte automáticamente en diferencia.
- [x] `TR-004` abre `DIFFERENCE_UNDER_REVIEW` y `TR-006` permite volver a `ACCEPTANCE_PENDING` tras tratamiento suficiente.
- [x] `TR-005` permanece como bypass cuando no existen diferencias.
- [x] Se preservan `QUARANTINE`, `HOLD`, `ESCALATE` y `REJECT`.
- [x] Se preservan `CANCEL`, `VOID`, `REVERSE` y `RESTATE`.
- [x] Aceptar, retener, reclamar, corregir y rechazar quedan representados como decisiones de experiencia con efecto propietario separado.
- [x] No se inventa `origo.procurement.receipts.resolve`.
- [x] `receipts.register` no absorbe reversión ni resolución material.
- [x] `receipts.reverse` no se confunde con rechazo.
- [x] Corrección con sustitución conserva `reverse + register` y vínculo original/reemplazo.
- [x] La orden aprobada no se edita destructivamente para eliminar la diferencia.
- [x] La observación original no se reescribe.
- [x] Solo el alcance aceptado puede pasar a handoff físico/económico.
- [x] Precio y datos sensibles quedan entregados a `ORIGO-UX-012` sin exposición adicional.
- [x] NEXO y NUMERA conservan ownership de sus efectos.
- [x] Se preserva idempotencia, revalidación, stale y resultado desconocido.
- [x] Se documentan brechas AS-IS con owner y condición de salida.
- [x] No se crea ni modifica requisito de prueba.
- [x] No se modifica el Registro 04A.
- [x] No se ejecuta cambio físico, Supabase, migración ni despliegue.
- [x] `ORIGO-UX-012` queda reservada y no se desarrolla aquí.

---

#### 59. Límites

Esta tarea no:

- implementa `VSCREEN-0078`;
- crea componentes, Server Actions o endpoints;
- crea `receipts.resolve` ni otra permission key;
- activa `receipts.register` o `receipts.reverse` en catálogos/grants;
- define tolerancias numéricas de cantidad, precio o calidad;
- define políticas comerciales nuevas de aceptación;
- modifica una orden aprobada;
- registra una recepción real;
- resuelve una diferencia real;
- reversa una recepción real;
- crea una recepción de reemplazo;
- abre una reclamación real con proveedor;
- mueve stock propietario de NEXO;
- reconoce obligación o pago en NUMERA;
- aprueba producto, presentación o conversión maestra;
- modifica `vento-origo`;
- modifica Supabase, migraciones, RLS, RPC, grants, Storage o datos;
- modifica contratos generados;
- modifica el Registro 04A;
- ejecuta E5;
- crea instancia física;
- desarrolla `ORIGO-UX-012`.

---

#### 60. Continuidad

**ÚLTIMA TAREA APROBADA**
`ORIGO-UX-010 — Diseñar recepción parcial`

**TAREA ACTUAL APROBADA**
`ORIGO-UX-011 — Diseñar diferencias contra orden`

**SIGUIENTE TAREA RESERVADA**
`ORIGO-UX-012 — Ocultar precios cuando no correspondan`
### ✅ ORIGO-UX-012 — Ocultar precios cuando no correspondan

**Estado:** APROBADA
**Tarea anterior:** ORIGO-UX-011 — Diseñar diferencias contra orden
**Tarea siguiente:** ORIGO-UX-013 — Evitar repetir recepción manualmente en NEXO
**Tipo de tarea:** diseño documental integral de la experiencia de minimización y ocultamiento de precios, costos, totales y condiciones comerciales sensibles en ORIGO, consumiendo el field masking aprobado por `ORIGO-AUTH-010` para que cada superficie entregue únicamente la proyección económica necesaria por permiso, recurso, alcance, finalidad y acción, sin ocultar la existencia de una diferencia ni convertir el render de UI en frontera de seguridad; `DEFINE_ONCE` / `NO_PHYSICAL_INSTANCE`
**Bloque:** BLOQUE M — ORIGO
**Repositorio propietario:** `vento-group-sas/vento-shell`
**Archivo propietario:** `docs/plan-canonico/modular/bloques/M_ORIGO/02_EXPERIENCIA_DE_COMPRAS.md`
**Estado físico resultante:** `NO_PHYSICAL_INSTANCE`
**Cambios físicos autorizados:** ninguno; esta tarea no modifica código, navegación, componentes, permisos, roles, grants, datos, tablas, RLS, RPC, migraciones, Supabase, Storage, contratos generados, packages, consumidores ni despliegues
**Requisitos de prueba creados o modificados:** 0

---

#### 1. Propósito

Diseñar la experiencia objetivo para que ORIGO muestre precios, costos, totales y condiciones comerciales únicamente cuando la finalidad, autoridad y recurso autorizados los requieran.

La tarea evita dos errores opuestos:

```text
RECURSO VISIBLE
→ EXPONER TODO SU CONTENIDO ECONÓMICO
```

Y:

```text
OCULTAR EN PANTALLA
→ PERO HABER LEÍDO / SERIALIZADO / EXPORTADO EL DATO SENSIBLE
```

La regla de experiencia queda:

```text
PERMISO EXACTO
+
RECURSO AUTORIZADO
+
ALCANCE / CONTEXTO AUTORIZADO
+
FINALIDAD
+
ACCIÓN
+
FIELD MASK
=
PROYECCIÓN ENTREGABLE
```

---

#### 2. Handoff recibido de ORIGO-UX-011

`ORIGO-UX-011` entrega una frontera obligatoria:

```text
DIFERENCIA DE PRECIO O CONDICIÓN
→ DEBE PODER EXISTIR Y SER TRATADA
→ SIN OBLIGAR A REVELAR IMPORTES A UN ACTOR NO AUTORIZADO
```

Por tanto:

```text
PRECIO OCULTO
!=
DIFERENCIA OCULTA
```

Un actor puede conocer que existe una diferencia económica que bloquea o requiere revisión sin conocer necesariamente:

- precio unitario comprometido;
- precio observado;
- delta monetario;
- porcentaje de variación;
- total de línea;
- total de orden;
- costo interno;
- margen;
- condición comercial sensible.

---

#### 3. Naturaleza y topología

La topología vigente de `ORIGO-UX-001..016` establece:

```text
mode = DEFINE_ONCE
execution_gate = NO_PHYSICAL_INSTANCE
```

Consecuencias:

1. esta tarea define experiencia y contrato documental una sola vez;
2. no crea una instancia física propia;
3. no selecciona package, implementation unit, ambiente ni target path;
4. no activa materialización de `ORIGO-AUTH-010`;
5. no cambia código ni datos;
6. toda materialización posterior debe consumir este contrato y el contrato de autorización sin reinterpretarlos.

---

#### 4. Fuentes y snapshots verificados

La preparación documental se contrastó contra:

```text
vento-shell/main
30b7c8276220c34370438e0867958ed1f18a4b55

vento-origo/main
70860f1ca5f0a4a73e894cbb840956f9f7eda2ad
```

También se verificaron:

- `ORIGO-AUTH-010 — Proteger precios y datos sensibles`;
- `VSCREEN-0073..0079`;
- `VSCREEN-0145`;
- contratos de recurso y autorización aplicables;
- experiencia administrativa de compra y recepción;
- Registro 04A ORIGO y AUTH;
- runtime de listado, detalle, edición y PDF de órdenes;
- runtime de recepción y sus consultas de costo;
- validadores y scripts documentales vigentes.

---

#### 5. Contrato de autorización consumido

La tarea consume sin redefinir `ORIGO-AUTH-010`.

La clasificación sensible vigente incluye:

```text
COMMERCIAL_CONFIDENTIALITY
```

para capacidades como:

```text
origo.procurement.purchase_orders.view
origo.procurement.receipts.view
origo.procurement.suppliers.view
```

La autorización del recurso no concede todas sus columnas.

---

#### 6. La tarea no crea permisos nuevos

No se crean claves como:

```text
purchase_orders.prices.view
receipts.prices.view
suppliers.prices.view
prices.reveal
costs.view
```

ni equivalentes inferidos.

La visibilidad económica se deriva de permisos canónicos existentes, recurso, scope, finalidad, acción y field mask.

---

#### 7. Familias económicas sensibles

La experiencia trata como sensibles, como mínimo:

```text
currency
unit_cost
stock_unit_cost
line_total
total_amount
precio pactado
descuento
impuesto
flete
mínimo económico
subtotal
presupuesto
condición comercial
importe de aprobación
costo normalizado
margen
```

Un equivalente futuro hereda la misma política si revela el mismo hecho económico.

---

#### 8. Valores derivados también son sensibles

Ocultar el precio base pero mostrar un derivado que permita reconstruirlo no satisface el contrato.

Se consideran revelaciones económicas, según contexto:

- delta monetario;
- porcentaje de variación cuando permite inferir el valor;
- total extendido;
- subtotal;
- impuestos calculados;
- costo por unidad normalizada;
- costo de stock;
- promedio o último costo;
- margen;
- acumulados o agregados por proveedor;
- exportaciones que permitan reconstrucción indirecta.

---

#### 9. Regla de minimización end-to-end

La experiencia exige:

```text
FIELD MASK
→ SELECT MÍNIMO
→ SERIALIZACIÓN MÍNIMA
→ RENDER MÍNIMO
```

No:

```text
SELECT SENSIBLE
→ SERIALIZAR SENSIBLE
→ OCULTAR CON CSS
```

El dato no autorizado no debe llegar a la capa cliente, props, payload, HTML, JSON, exportación, tooltip ni error.

---

#### 10. Proyección operativa sin precios

Para recepción y abastecimiento operativo, la proyección ordinaria puede incluir:

- referencia de orden;
- estado relevante;
- proveedor mínimo;
- sede/destino receptor;
- producto;
- presentación;
- cantidad ordenada;
- cantidad recibida;
- saldo recibible;
- fecha esperada;
- documentos operativos necesarios;
- lote, vencimiento o condición cuando aplique.

Por defecto excluye:

```text
unit_cost
stock_unit_cost
line_total
total_amount
contratos
negociación
cuentas bancarias
```

---

#### 11. Matriz de superficies objetivo

| Superficie | Finalidad | Proyección económica por defecto |
| --- | --- | --- |
| `VSCREEN-0073` | crear/editar orden | solo si la acción autorizada necesita valores económicos |
| `VSCREEN-0074` | aprobar/rechazar | mínima suficiente para decidir |
| `VSCREEN-0075` | detalle/seguimiento | según actor, scope y finalidad |
| `VSCREEN-0076` | cola de recepciones | denegada |
| `VSCREEN-0077` | recepción total/parcial | denegada por defecto |
| `VSCREEN-0078` | resolver diferencia | existencia/tipo siempre según acceso al caso; importes solo si field mask lo permite |
| `VSCREEN-0079` | auditoría | únicamente proyección autorizada para investigación |
| `VSCREEN-0145` | contratos/precios/condiciones | económica sensible autorizada explícitamente |

---

#### 12. `VSCREEN-0073` — creación y edición de orden

La pantalla puede mostrar valores económicos cuando el actor ejecuta una acción autorizada que requiere construir o corregir una orden.

Regla:

```text
purchase_orders.create / update
+
estado editable
+
recurso y territorio válidos
+
field mask económico
→ campos económicos necesarios
```

La existencia de la pantalla no habilita por sí sola precios.

---

#### 13. `VSCREEN-0074` — aprobación

Un aprobador autorizado puede necesitar:

- moneda;
- importe total;
- precio/costo de línea;
- condición comercial relevante;
- umbral o presupuesto aplicable cuando exista.

Regla:

```text
APROBAR
→ VER LO NECESARIO PARA DECIDIR
!=
VER TODO EL EXPEDIENTE SENSIBLE
```

---

#### 14. `VSCREEN-0075` — detalle y seguimiento

El detalle de una orden no tiene una única proyección universal.

Debe adaptar la experiencia al actor y finalidad:

- administración autorizada: proyección económica permitida dentro del recurso;
- supervisión: estado, proveedor mínimo, productos, cantidades, fechas y seguimiento, sin costos/totales por defecto;
- contabilidad: proyección económica necesaria para conciliación dentro de su alcance;
- operación: proyección mínima sin costos internos;
- actor sin permiso de vista: sin recurso.

---

#### 15. `VSCREEN-0076` — cola de recepciones

La cola prioriza trabajo operativo.

No necesita por defecto:

```text
unit_cost
stock_unit_cost
line_total
total_amount
```

El costo no se usa como sustituto de prioridad operacional si la política de priorización no lo autoriza.

---

#### 16. `VSCREEN-0077` — recepción total o parcial

Para `bodeguero` y `gerencia_operativa`, la recepción ordinaria necesita cantidades y condición física/documental, no costos internos.

La experiencia objetivo excluye por defecto:

```text
unit_cost
stock_unit_cost
line_total
total_amount
último costo
costo promedio
margen
```

El actor puede registrar cantidades sin conocer el precio.

---

#### 17. `VSCREEN-0078` — diferencia de precio

Cuando existe una diferencia económica, la superficie debe preservar el problema sin filtrar valores no autorizados.

Actor sin proyección económica:

```text
TIPO: DIFERENCIA DE PRECIO
ESTADO: REQUIERE REVISIÓN AUTORIZADA
IMPACTO: BLOQUEANTE / NO BLOQUEANTE SEGÚN DECISIÓN CANÓNICA
VALORES: OCULTOS
```

Actor con proyección económica autorizada puede recibir los valores necesarios para decidir.

---

#### 18. Diferencia visible, importes ocultos

No mostrar importes no autoriza esconder:

- que existe una diferencia;
- qué línea está afectada;
- que el caso está bloqueado;
- que requiere escalamiento;
- que existe una decisión pendiente;
- que un actor distinto debe intervenir.

La experiencia debe evitar el falso mensaje de “sin diferencias”.

---

#### 19. `VSCREEN-0079` — auditoría

La auditoría reconstruye hechos sin convertirse en bypass de visibilidad.

Un actor autorizado a auditar el flujo no recibe automáticamente todos los campos económicos históricos.

La evidencia de acceso sensible conserva trazabilidad cuando corresponda.

---

#### 20. `VSCREEN-0145` — contratos, precios y condiciones

La superficie de contratos/precios requiere:

```text
actor base autorizado
+
suppliers.view
+
SUPPLIER autorizado
+
field mask sensible compatible
+
finalidad administrativa
```

Una relación operativa de entrega no abre esta superficie.

---

#### 21. Propietario y gerente_general

Con `purchase_orders.view`, recurso autorizado y finalidad administrativa válida pueden recibir la proyección económica interna necesaria dentro del recurso.

Esto no abre automáticamente:

- cuentas bancarias;
- documentos tributarios completos;
- contratos ajenos;
- secretos;
- datos de otros proveedores.

---

#### 22. Gerente

`gerente` recibe información económica únicamente dentro del scope y recurso autorizados.

Una relación territorial con una orden no concede descubrimiento de precios de otras órdenes, otros proveedores o contratos globales.

---

#### 23. Supervisor

La proyección ordinaria de `supervisor` excluye por defecto:

```text
unit_cost
stock_unit_cost
line_total
total_amount
```

Puede ver identidad, estado, proveedor mínimo, productos, presentaciones, cantidades, fechas y seguimiento permitido.

---

#### 24. Auxiliar administrativa

La visibilidad económica depende de la acción concreta.

Puede necesitar campos económicos al crear o actualizar una orden con permiso mutante válido y estado editable.

`purchase_orders.view` por sí solo no amplía esos campos.

---

#### 25. Contador

`contador` puede recibir la proyección económica necesaria para conciliación dentro del recurso y alcance autorizados.

No obtiene por ello administración de proveedor, aprobación, cancelación ni contratos no relacionados.

---

#### 26. Bodeguero

`bodeguero` necesita una proyección operacional.

Puede ver:

- orden/referencia;
- proveedor mínimo;
- producto/presentación;
- cantidades;
- saldo;
- fechas;
- condición y documentos operativos.

No recibe precios ni costos internos por defecto.

---

#### 27. Gerencia operativa

`gerencia_operativa` conserva el mismo principio de minimización durante recepción.

Un rol operativo con mayor coordinación no se convierte automáticamente en rol financiero.

---

#### 28. Proveedor externo

El canal externo al proveedor no es equivalente al documento interno.

Por defecto no expone:

- `stock_unit_cost`;
- costo interno;
- margen;
- notas internas;
- auditoría interna;
- datos de aprobación interna;
- información de otros proveedores.

Los valores supplier-facing solo aparecen cuando pertenecen al documento externo autorizado.

---

#### 29. Actor sin permiso del recurso

Un actor sin permiso de vista del recurso no obtiene precios por ninguna ruta indirecta.

No basta conocer:

- ID de orden;
- URL;
- proveedor;
- sede;
- número de documento;
- endpoint;
- token laboral inexistente;
- referencia incluida en otra pantalla.

---

#### 30. Field mask por finalidad

La experiencia distingue, como mínimo:

| Finalidad | Proyección económica |
| --- | --- |
| administrar compra | permitida dentro del recurso y field mask |
| supervisar flujo | denegada por defecto |
| crear/corregir orden | campos necesarios para la acción |
| aprobar | mínima suficiente para decidir |
| conciliar | necesaria dentro del recurso correlacionado |
| recibir | denegada por defecto |
| resolver diferencia económica | solo actor autorizado para los importes |
| proveedor externo | solo supplier-facing autorizado |

---

#### 31. Select mínimo server-side

La proyección económica se resuelve antes de seleccionar columnas cuando sea posible.

El patrón objetivo es:

```text
AUTORIZAR
→ RESOLVER FIELD MASK
→ CONSTRUIR SELECT MÍNIMO
→ CONSULTAR
```

No:

```text
SELECT *
→ DESPUÉS DECIDIR QUÉ ESCONDER
```

---

#### 32. Serialización mínima

Un valor oculto no puede permanecer en:

- props de Server Components hacia Client Components;
- JSON embebido;
- payload de Server Action;
- estado de formulario;
- atributos HTML;
- objetos de hidratación;
- respuestas API;
- archivos temporales entregados al cliente.

---

#### 33. Render mínimo

Cuando el actor no puede ver el precio, la interfaz no debe reservar un valor recuperable mediante inspección del DOM.

La experiencia puede:

- omitir la columna;
- omitir la celda sensible;
- mostrar “Restringido” cuando la existencia del campo sea útil;
- mostrar “Requiere revisión autorizada” para diferencias económicas.

Nunca contiene el valor oculto detrás de estilos.

---

#### 34. Ausencia, restricción y cero no son equivalentes

Se distinguen:

```text
0
NULL / AUSENTE
NO APLICA
NO DISPONIBLE
RESTRINGIDO
ERROR TÉCNICO
```

Un precio restringido nunca se representa como `0`.

---

#### 35. Delta económico protegido

Si el actor no puede ver los valores económicos base, tampoco debe recibir un delta que permita inferirlos.

La superficie puede conservar:

```text
DIFERENCIA ECONÓMICA: SI
```

sin exponer:

```text
VALOR PEDIDO
VALOR OBSERVADO
DELTA
PORCENTAJE
TOTAL AFECTADO
```

---

#### 36. Necesidad técnica interna

Si una capa autoritativa necesita cargar un costo para calcular o validar un efecto, esa necesidad técnica no amplía la proyección de experiencia.

Regla:

```text
USO SERVER-SIDE JUSTIFICADO
!=
ENTREGA AL ACTOR
```

El campo permanece fuera de serialización y render cuando el actor no está autorizado.

---

#### 37. Creación y edición de orden

Los campos económicos de creación/edición son inputs gobernados, no secretos liberados por defecto.

El servidor debe validar:

- actor;
- permiso mutante;
- estado editable;
- recurso/scope;
- field mask;
- valor;
- recálculo de derivados;
- necesidad de nueva aprobación cuando aplique.

---

#### 38. Aprobación

La vista de aprobación puede mostrar economía suficiente para decidir sin revelar datos del proveedor que no formen parte del caso.

La decisión económica se vincula a la versión exacta aprobada.

---

#### 39. PDF interno

El PDF interno respeta la misma proyección que el actor que lo solicita.

```text
PDF INTERNO
!=
BYPASS DE FIELD MASK
```

Un actor operativo no obtiene un PDF con costos por el solo hecho de poder ver la orden.

---

#### 40. PDF externo

El documento externo conserva proyección supplier-facing y el contrato de token correspondiente.

Ocultar un valor en HTML pero incluirlo en PDF, metadata o payload viola la minimización.

---

#### 41. Exportación

La capacidad `.view` no concede por sí sola exportación económica masiva.

Una exportación sensible requiere contrato y finalidad autorizados.

La ausencia de permiso produce denegación, no archivo con columnas vacías después de haber leído todos los valores.

---

#### 42. Búsqueda, filtros, ordenamiento y conteos

Una columna oculta tampoco puede filtrarse, ordenarse o agregarse de forma que revele valores a actores no autorizados.

Se evita:

- ordenar por precio y revelar ranking sensible;
- filtrar por rangos económicos ocultos;
- mostrar totales agregados;
- conteos segmentados que expongan condición comercial.

---

#### 43. Errores, ayudas y tooltips

Errores, validaciones, tooltips y ayudas no pueden revelar el valor oculto.

Ejemplo correcto:

```text
La diferencia económica requiere revisión autorizada.
```

No:

```text
El precio esperado era X y llegó Y
```

para un actor sin field mask económico.

---

#### 44. URL, API y llamada directa

El mismo field mask aplica a:

- navegación normal;
- URL directa;
- Server Action;
- API;
- RPC;
- query manipulada;
- formulario alterado.

No existe una ruta alternativa que entregue el campo porque la UI principal lo oculta.

---

#### 45. Caché, stale y cambio de autoridad

Una proyección económica autorizada en un momento no puede reutilizarse cuando cambian:

- actor;
- rol;
- scope;
- sede;
- recurso;
- estado;
- permiso;
- finalidad;
- versión contractual.

Un dato sensible cacheado no conserva autoridad por antigüedad.

---

#### 46. Precio histórico y precio vigente

La orden histórica muestra, cuando el actor está autorizado, el snapshot económico utilizado por esa orden.

No se recalcula silenciosamente con la condición vigente.

La ocultación tampoco reemplaza la obligación de conservar el snapshot histórico autoritativo.

---

#### 47. Frontera con NEXO

NEXO recibe la proyección necesaria para el efecto físico.

No necesita por defecto los precios internos de ORIGO para:

- identificar producto;
- cantidad;
- presentación;
- recepción correlacionada;
- ubicación/custodia.

Una integración no se usa para ampliar visibilidad económica del operador.

---

#### 48. Frontera con NUMERA

NUMERA consume la proyección económica que su proceso propietario requiera.

La existencia de ese handoff no autoriza a ORIGO a mostrar el mismo conjunto económico a un receptor operativo.

```text
CONSUMIDOR FINANCIERO AUTORIZADO
!=
ACTOR OPERATIVO AUTORIZADO A VER FINANZAS
```

---

#### 49. Datos maestros y presentaciones

Producto y presentación pueden ser visibles sin revelar costo.

Una solicitud de maestro de datos pendiente no puede depender de exponer costo al actor si el contrato no lo autoriza.

---

#### 50. Runtime AS-IS — listado de órdenes

El runtime observado de `/purchase-orders`:

- entra con acceso general a ORIGO;
- selecciona `total_amount` y `currency`;
- renderiza una columna `Total` para las filas consultadas.

Clasificación:

```text
AS_IS_PURCHASE_ORDER_LIST_ECONOMIC_OVERREAD
```

La existencia de ese comportamiento no redefine el contrato objetivo.

---

#### 51. Runtime AS-IS — detalle y PDF de orden

El detalle observado:

- selecciona `total_amount`;
- selecciona `unit_cost` y `line_total` por línea;
- renderiza información económica sin demostrar en esa superficie un field mask por finalidad.

El PDF también consulta valores económicos.

Clasificación:

```text
AS_IS_PURCHASE_ORDER_DETAIL_FIELD_MASK_NOT_DEMONSTRATED
AS_IS_PURCHASE_ORDER_PDF_FIELD_MASK_NOT_DEMONSTRATED
```

---

#### 52. Runtime AS-IS — recepción

La recepción observada puede consultar y procesar:

```text
unit_cost
stock_unit_cost
line_total_cost
último costo
costo promedio
```

junto con cantidades y presentaciones.

La acción puede necesitar parte de esa información internamente, pero la experiencia no demuestra todavía separación completa entre uso server-side y proyección del actor.

Clasificación:

```text
AS_IS_RECEIPT_ECONOMIC_PROJECTION_NEEDS_MASKING
```

---

#### 53. Brechas y propietarios

| Brecha | Riesgo | Propietario | Condición de salida |
| --- | --- | --- | --- |
| listado consulta/renderiza `total_amount` | sobreexposición económica | `ORIGO-AUTH-010` + materialización propietaria | select y render dependen de proyección autorizada |
| detalle consulta costos/totales | actor de seguimiento puede recibir economía no necesaria | `ORIGO-AUTH-010` + materialización propietaria | field mask aplicado antes del select/serialización |
| PDF interno carga economía | documento puede ampliar visibilidad | `ORIGO-AUTH-010` + package propietario | PDF respeta proyección del solicitante |
| recepción consulta costos | operación física puede heredar economía sin finalidad | `ORIGO-AUTH-010` + `ORIGO-UX-012` + package propietario | cálculo interno separado de proyección operativa |
| diferencia de precio requiere tratarse sin revelar importes | ocultar el problema o filtrar valores | `ORIGO-UX-011` + `ORIGO-UX-012` | existencia/tipo visibles; importes sujetos a field mask |
| integración financiera consume economía | posible contaminación de UI operativa | `ORIGO-UX-015` + NUMERA | handoff financiero separado de la proyección del actor ORIGO |

No quedan hallazgos narrativos sin dueño y condición de salida.

---

#### 54. Requisitos de prueba derivados

**Resultado:** NO GENERA REQUISITOS DE PRUEBA

**Requisitos creados:** 0
**Requisitos modificados:** 0
**Requisitos diferidos:** 0
**Requisitos obsoletos:** 0
**Fragmentos del Registro 04A afectados:** 0

**Justificación:** la minimización de columnas, protección server-side, proyección por finalidad, datos sensibles de proveedor, documentos externos, stale authorization y auditoría ya están protegidos por requisitos canónicos vigentes. Esta tarea concreta su experiencia en las superficies ORIGO sin introducir una obligación verificable nueva.

---

#### 55. Cobertura de prueba vigente reutilizada

Sin modificar el Registro 04A, esta tarea reutiliza:

- `TREQ-ORIGO-002` para limitar columnas y proteger documentos externos de orden;
- `TREQ-ORIGO-004` para importes, aprobación, segregación y preservación de la orden;
- `TREQ-ORIGO-005` para contratos, precios, impuestos, descuentos, fletes, mínimos, vigencias, datos sensibles y auditoría;
- `TREQ-AUTH-001` para permiso, contexto, scope y recurso canónicos;
- `TREQ-AUTH-013` para impedir bypass por URL, formulario, API o RPC y validar columnas permitidas server-side;
- `TREQ-AUTH-014` para impedir uso de decisiones o contexto derivados obsoletos;
- `TREQ-AUTH-015` para evidencia correlacionable de decisiones y accesos protegidos.

Esta sección es trazabilidad de cobertura existente, no actualización del registro.

---

#### 56. Handoffs documentales posteriores

| Tarea posterior | Handoff recibido desde ORIGO-UX-012 |
| --- | --- |
| `ORIGO-UX-013` | la automatización ORIGO→NEXO no puede reintroducir precios ocultos ni exigir recaptura manual para obtenerlos |
| `ORIGO-UX-014` | el handoff físico usa identidad, cantidades y presentación sin ampliar la proyección económica del receptor |
| `ORIGO-UX-015` | el handoff financiero contiene economía necesaria para NUMERA sin convertir esa proyección en visibilidad operativa ORIGO |
| `ORIGO-UX-016` | el prototipo valida que cada actor recibe la proyección correcta y que una diferencia de precio puede existir con importes restringidos |

La tarea no desarrolla esos contratos posteriores.

---

#### 57. Evidencia de validación

| Clase | Estado | Evidencia |
| --- | --- | --- |
| BUILD | `NOT_EXECUTED` | La compilación documental se ejecutará después de incorporar la tarea en el archivo propietario. |
| LOCAL | `NOT_EXECUTED` | No se ejecutaron validadores del checkout del usuario durante la preparación anticipada. |
| REMOTA | `PASS` | Se verificaron owner, topología, `ORIGO-AUTH-010`, `VSCREEN-0073..0079`, `VSCREEN-0145`, Registro 04A y runtime actual de órdenes, PDF y recepción. |
| OPERATIVA | `NOT_EXECUTED` | No se probaron actores reales ni se consultaron/modificaron precios, órdenes, recepciones, documentos, tokens o entornos desplegados. |
| FÍSICA | `NOT_APPLICABLE` | `ORIGO-UX-012` es `DEFINE_ONCE / NO_PHYSICAL_INSTANCE`. |

---

#### 58. Criterios de aceptación

- [x] La tarea mantiene exactamente `ORIGO-UX-012 — Ocultar precios cuando no correspondan`.
- [x] La tarea anterior es `ORIGO-UX-011` y la siguiente `ORIGO-UX-013`.
- [x] Se conserva `DEFINE_ONCE / NO_PHYSICAL_INSTANCE`.
- [x] Se consume `ORIGO-AUTH-010` sin redefinir permisos ni field masks.
- [x] No se crean permission keys nuevas de precios/costos.
- [x] Se preserva `COMMERCIAL_CONFIDENTIALITY`.
- [x] Se exige `FIELD MASK → SELECT MÍNIMO → SERIALIZACIÓN MÍNIMA → RENDER MÍNIMO`.
- [x] Precio oculto no se representa como cero.
- [x] Valores derivados no pueden filtrar el precio.
- [x] `VSCREEN-0073` muestra economía solo cuando la acción autorizada la requiere.
- [x] `VSCREEN-0074` limita economía a lo necesario para decidir.
- [x] `VSCREEN-0075` adapta proyección por actor/finalidad.
- [x] `VSCREEN-0076` no necesita precios por defecto.
- [x] `VSCREEN-0077` mantiene proyección operativa sin costos internos por defecto.
- [x] `VSCREEN-0078` puede mostrar existencia/tipo de diferencia económica sin revelar importes.
- [x] `VSCREEN-0079` no se convierte en bypass histórico.
- [x] `VSCREEN-0145` conserva acceso administrativo sensible explícito.
- [x] Supervisor no recibe `unit_cost`, `stock_unit_cost`, `line_total` ni `total_amount` por defecto.
- [x] Bodeguero y gerencia_operativa reciben proyección operativa sin precios por defecto.
- [x] Contador recibe únicamente economía necesaria para conciliación autorizada.
- [x] Auxiliar administrativa recibe economía solo cuando una acción mutante válida la necesita.
- [x] PDF interno respeta la proyección del solicitante.
- [x] PDF externo no expone costo interno ni notas internas por inferencia.
- [x] Exportaciones, filtros, ordenamiento, tooltips y errores no filtran campos ocultos.
- [x] NEXO y NUMERA no amplían la visibilidad del actor ORIGO.
- [x] Se documentan brechas AS-IS con propietario y condición de salida.
- [x] No se crea ni modifica requisito de prueba.
- [x] No se modifica Registro 04A.
- [x] No se ejecuta cambio físico, Supabase, migración ni despliegue.
- [x] `ORIGO-UX-013` queda reservada y no se desarrolla aquí.

---

#### 59. Límites

Esta tarea no:

- implementa field masking;
- modifica `ORIGO-AUTH-010`;
- crea permisos de precios/costos;
- cambia roles o grants;
- cambia scopes;
- implementa `VSCREEN-0073..0079` ni `VSCREEN-0145`;
- modifica consultas SQL/Supabase del runtime;
- modifica Server Components, Client Components, Server Actions, APIs o PDFs;
- crea exportaciones;
- define nuevos umbrales económicos;
- modifica precios, contratos o condiciones de proveedor;
- cambia una orden real;
- registra una recepción real;
- resuelve una diferencia real;
- mueve stock en NEXO;
- reconoce obligación o pago en NUMERA;
- modifica `vento-origo`;
- modifica Supabase, migraciones, RLS, RPC, grants, Storage o datos;
- modifica contratos generados;
- modifica el Registro 04A;
- ejecuta E5;
- crea instancia física;
- desarrolla `ORIGO-UX-013`.

---

#### 60. Continuidad

**ÚLTIMA TAREA APROBADA**
`ORIGO-UX-011 — Diseñar diferencias contra orden`

**TAREA ACTUAL APROBADA**
`ORIGO-UX-012 — Ocultar precios cuando no correspondan`

**SIGUIENTE TAREA RESERVADA**
`ORIGO-UX-013 — Evitar repetir recepción manualmente en NEXO`
### ✅ ORIGO-UX-013 — Evitar repetir recepción manualmente en NEXO

**Estado:** APROBADA
**Tarea anterior:** ORIGO-UX-012 — Ocultar precios cuando no correspondan
**Tarea siguiente:** ORIGO-UX-014 — Conectar recepción con entrada de inventario
**Tipo de tarea:** diseño documental integral de la experiencia ORIGO → NEXO que elimina la doble captura manual de una misma recepción de compra, preserva la recepción comercial/documental propietaria de ORIGO, entrega un handoff correlacionado e idempotente hacia NEXO y reserva a NEXO únicamente la validación y captura de datos físicos que le pertenecen, sin materializar todavía el movimiento de inventario; `DEFINE_ONCE` / `NO_PHYSICAL_INSTANCE`
**Bloque:** BLOQUE M — ORIGO
**Repositorio propietario:** `vento-group-sas/vento-shell`
**Archivo propietario:** `docs/plan-canonico/modular/bloques/M_ORIGO/02_EXPERIENCIA_DE_COMPRAS.md`
**Estado físico resultante:** `NO_PHYSICAL_INSTANCE`
**Cambios físicos autorizados:** ninguno; esta tarea no modifica código, componentes, rutas, eventos físicos, permisos, tablas, RPC, RLS, grants, migraciones, Supabase, datos, contratos generados, ORIGO, NEXO, NUMERA ni despliegues
**Requisitos de prueba creados o modificados:** 0

---

#### 1. Propósito

Diseñar una experiencia en la que una recepción ya registrada y aceptada en ORIGO continúe hacia NEXO sin obligar al trabajador a capturar por segunda vez el mismo hecho empresarial.

La regla raíz queda:

```text
RECEPCION ORIGO IDENTIFICADA Y ACEPTADA
→ HANDOFF CORRELACIONADO
→ NEXO RECIBE CONTEXTO DE ORIGEN
→ NEXO REVALIDA SU PROPIA AUTORIDAD Y DATOS FISICOS
→ CONTINUA EL EFECTO FISICO
```

Nunca:

```text
ORIGO REGISTRA RECEPCION
→ TRABAJADOR ABRE NEXO
→ VUELVE A ESCOGER PROVEEDOR
→ VUELVE A BUSCAR ORDEN
→ VUELVE A CAPTURAR LINEAS
→ VUELVE A DIGITAR CANTIDADES
```

La eliminación de doble captura no transfiere propiedad entre aplicaciones.

---

#### 2. Resultado sustantivo

La experiencia objetivo deja definidos estos resultados:

1. ORIGO conserva la recepción comercial y documental de `VPROC-0022`.
2. NEXO conserva el efecto físico de `VPROC-0024`.
3. El hecho normal que habilita el handoff físico sigue siendo `VPROC-0022.EVT-004`.
4. El estado fuente sigue siendo `VPROC-0022.PUTAWAY_PENDING`.
5. NEXO inicia o recupera su flujo en `VPROC-0024.INBOUND_MOVEMENT_REQUESTED` cuando corresponde efecto físico.
6. La persona no vuelve a crear la recepción en NEXO como si fuera un hecho nuevo.
7. NEXO recibe una referencia durable a la recepción ORIGO mediante `purchase_receipt_ref` o identidad canónica equivalente del contrato materializado.
8. El reintento de la misma continuidad recupera el mismo resultado o estado; no crea una segunda entrada.
9. Una segunda entrega real legítima conserva identidad propia y no se confunde con replay.
10. La recepción `record_only` no crea un ingreso físico ficticio.
11. La contingencia de NEXO permanece excepcional y no compite con un handoff normal ya existente.
12. `ORIGO-UX-014` conserva la responsabilidad de conectar materialmente la recepción con la entrada de inventario.
13. No se crean ni modifican requisitos de prueba.

---

#### 3. Handoff recibido de ORIGO-UX-009 a ORIGO-UX-012

Esta tarea consume sin reinterpretación:

- recepción total diseñada en `ORIGO-UX-009`;
- recepción parcial y saldo restante de `ORIGO-UX-010`;
- diferencias contra orden de `ORIGO-UX-011`;
- proyección económica mínima y field masking de `ORIGO-UX-012`.

Por tanto, la 013 no vuelve a decidir:

- qué significa recepción total;
- qué significa parcialidad;
- cómo se resuelve una diferencia;
- quién puede ver precios o costos.

Su responsabilidad es la continuidad de experiencia entre propietarias.

---

#### 4. Topología y frontera física

La topología vigente para esta familia es:

```text
mode = DEFINE_ONCE
execution_gate = NO_PHYSICAL_INSTANCE
```

Consecuencias:

- la tarea define el contrato de experiencia una sola vez;
- no crea instancia física propia;
- no modifica `vento-origo` ni `vento-nexo`;
- no implementa eventos, colas, RPC, tablas ni listeners;
- no modifica `active-sequence.json` manualmente;
- la materialización posterior pertenece a tareas y paquetes físicos ya existentes.

---

#### 5. Fuentes y snapshot de preparación

La preparación se ancla a:

```text
vento-shell/main
5057ad57fa296e3e6396f57c8d2761162d46542b

owner ORIGO
5a19a4b0e520e1717b4a1a96fa1b990f41b4cc51

integraciones compras/recepcion/inventario
e8d31faf44253fc6e4d31ab59067ec3f23cfe758

vento-origo/main
70860f1ca5f0a4a73e894cbb840956f9f7eda2ad

vento-nexo/main
f0a12557a1a258c84b025933653dc756de4b5a59
```

Se contrastaron además:

- `INT-PROC-002`;
- `INT-PROC-003`;
- `INT-PROC-005`;
- `VPROC-0022`;
- `VPROC-0024`;
- Registro 04A ORIGO y cobertura de integración vigente;
- runtime actual de recepción ORIGO;
- runtime actual de entradas NEXO;
- políticas de autorización y propiedad ya aprobadas.

---

#### 6. Problema empresarial exacto

La experiencia no puede exigir que el mismo hecho sea reconstruido manualmente en dos aplicaciones.

La doble captura produce riesgos de:

- proveedor distinto;
- orden distinta;
- líneas omitidas;
- cantidades distintas;
- presentación distinta;
- recepción duplicada;
- inventario duplicado;
- estado comercial y físico divergentes;
- pérdida de correlación;
- errores por copiar información entre pantallas.

La regla queda:

```text
UN HECHO EMPRESARIAL
→ UNA CAPTURA EN SU PROPIETARIA
→ PROPAGACION POR CONTRATO
```

No:

```text
UN HECHO EMPRESARIAL
→ DOS CAPTURAS MANUALES COMPETIDORAS
```

---

#### 7. Propiedad empresarial preservada

La separación continúa siendo:

```text
ORIGO
VPROC-0022
RECEPCION COMERCIAL Y DOCUMENTAL
        ↓
HANDOFF
        ↓
NEXO
VPROC-0024
INGRESO, UBICACION Y CUSTODIA FISICA
```

ORIGO no se convierte en propietario del ledger físico.

NEXO no se convierte en propietario de la aceptación comercial.

---

#### 8. Hecho canónico que habilita el handoff

El hecho normal preservado es:

```text
VPROC-0022.EVT-004
vento.process.vproc-0022.putaway-pending.v1
HANDOFF_FACT
```

Hecho confirmado:

```text
LOS BIENES ACEPTADOS
ESPERAN INGRESO Y UBICACION FISICA EN NEXO
```

No habilitan ese handoff por sí solos:

- orden aprobada;
- orden emitida;
- llegada registrada;
- factura recibida;
- verificación física en curso;
- estado legacy `received`;
- una cadena `source_app` enviada por cliente.

---

#### 9. Inicio de NEXO

Cuando el efecto físico corresponde, NEXO continúa desde:

```text
VPROC-0024.INBOUND_MOVEMENT_REQUESTED
```

La existencia aún no se considera:

```text
INGRESADA
UBICADA
POSTEADA
RECONCILIADA
```

La continuidad de experiencia no presenta el handoff como inventario ya disponible.

---

#### 10. Principio de no repetición manual

Para una recepción ORIGO que ya tiene identidad y alcance aceptado:

```text
PROVEEDOR
ORDEN
RECEPCION
LINEAS
PRODUCTOS
CANTIDADES ACEPTADAS
UNIDADES / PRESENTACIONES
SEDE FUENTE
EVIDENCIA DE ORIGEN
```

se transfieren como contexto autoritativo o referencias resolubles.

El trabajador no vuelve a digitarlos para crear una segunda verdad.

---

#### 11. Datos que NEXO no vuelve a solicitar como captura de origen

Cuando ya provienen de un handoff válido, la experiencia no vuelve a pedir al usuario como autoridad:

- proveedor de la recepción;
- compra u orden de origen;
- identificador de recepción;
- líneas aceptadas;
- producto de cada línea;
- cantidad aceptada por ORIGO;
- unidad/presentación observada y aceptada;
- evidencia ya vinculada al hecho fuente;
- actor ORIGO del hecho original;
- clasificación normal frente a replay.

NEXO puede mostrarlos como contexto de solo lectura o resolverlos server-side.

---

#### 12. Datos físicos que sí pertenecen a NEXO

NEXO puede requerir, validar o completar únicamente datos físicos bajo su propiedad, según aplique:

- ubicación destino;
- LOC;
- posición;
- LPN;
- lote o serial físico cuando no quede resuelto por el handoff;
- condición física relevante;
- cuarentena;
- confirmación de destino;
- evidencia física adicional;
- actor efectivo de la operación NEXO;
- datos necesarios para posting y custodia.

La necesidad de esos datos no reabre la captura comercial de ORIGO.

---

#### 13. Identidad compartida sin proceso paralelo

Se preserva la decisión canónica:

```text
ORIGO Y NEXO
COMPARTEN REFERENCIA DE RECEPCION
NO CREAN DOS RECEPCIONES EMPRESARIALES PARA EL MISMO HECHO
```

La identidad fuente nace en la recepción ORIGO y se conserva en la correlación del efecto NEXO.

NEXO crea su propia identidad de movimiento físico, no una segunda identidad empresarial competidora de recepción.

---

#### 14. `purchase_receipt_ref`

Para una entrada NEXO originada en compra, `purchase_receipt_ref` o la referencia canónica equivalente debe identificar la recepción aceptada que origina el efecto físico.

La referencia:

- no se deriva de texto libre;
- no se confía a una cadena cliente;
- no cambia en un retry de la misma intención;
- permite recuperar un efecto ya creado;
- permite distinguir una nueva entrega legítima de un replay.

---

#### 15. Idempotencia de continuidad

La experiencia debe operar con esta semántica:

```text
MISMA RECEPCION FUENTE
+ MISMO EFECTO FISICO LOGICO
+ MISMA VERSION
→ RECUPERAR MISMO RESULTADO
→ NO CREAR OTRA ENTRADA
```

Y:

```text
MISMA IDENTIDAD
+ CONTENIDO INCOMPATIBLE
→ CONFLICTO
→ NO ELEGIR SILENCIOSAMENTE
```

---

#### 16. Retry de la misma intención

Doble click, refresh, timeout, pérdida de respuesta o reintento automático no deben cambiar la intención empresarial.

La UX no ofrece como respuesta primaria:

```text
REGISTRAR OTRA VEZ
```

Ofrece semánticamente:

```text
CONSULTAR ESTADO
RECUPERAR RESULTADO
REINTENTAR LA MISMA OPERACION
RESOLVER CONFLICTO SI EXISTE
```

---

#### 17. Segunda entrega legítima

Una orden puede tener más de una recepción legítima.

Por tanto:

```text
MISMA ORDEN
!=
MISMA RECEPCION
```

Una nueva entrega real obtiene una nueva identidad ORIGO y puede producir un nuevo handoff físico correlacionado.

No se deduplica únicamente por:

- proveedor;
- orden;
- factura;
- fecha;
- producto;
- sede.

---

#### 18. Recepción parcial

Una recepción parcial de ORIGO transfiere únicamente el alcance aceptado de esa recepción.

NEXO no debe:

- completar artificialmente el saldo pendiente;
- interpretar líneas no entregadas como recibidas;
- volver a pedir toda la orden como si empezara de cero;
- fusionar una entrega posterior con la parcial anterior sin identidad propia.

---

#### 19. Diferencias

Una diferencia abierta o un alcance no aceptado no se transforma en ingreso físico por el hecho de abrir NEXO.

Solo el alcance habilitado por la decisión ORIGO puede continuar al handoff.

La UX conserva visible que:

```text
DIFERENCIA ORIGO
!=
ERROR DE CAPTURA NEXO
```

---

#### 20. Modalidad `record_only`

Cuando la recepción sea exclusivamente registral y no deba mover inventario:

```text
RECEPCION ORIGO
→ SIN HANDOFF FISICO NEXO
```

La experiencia no muestra una tarea NEXO pendiente inexistente ni obliga a abrir una entrada de inventario ficticia.

---

#### 21. Contingencia de NEXO

El carril de entrada de emergencia NEXO permanece excepcional.

Solo representa una contingencia cuando el flujo normal de ORIGO no puede utilizarse conforme al contrato vigente.

No puede usarse para:

- duplicar una recepción ORIGO ya aceptada;
- crear un segundo efecto porque el usuario no encontró el resultado;
- evitar la correlación del handoff;
- reemplazar silenciosamente una operación con resultado desconocido.

---

#### 22. Reconciliación de una contingencia

Si una contingencia NEXO produce un efecto físico válido antes de que el flujo ORIGO pueda completar su correlación, la recuperación posterior debe reconciliar identidades y evidencia.

Nunca:

```text
EFECTO NEXO YA APLICADO
+ ORIGO SE RECUPERA
→ APLICAR OTRA ENTRADA
```

El contrato técnico de reconciliación permanece fuera de esta tarea.

---

#### 23. Corrección y reversión

Una corrección no se presenta como una nueva recepción ordinaria sin vínculo.

Se preserva:

```text
ORIGINAL
↔ REVERSA / COMPENSACION CUANDO CORRESPONDA
↔ REEMPLAZO
```

La UX debe mantener referencia a la operación original y no ofrecer el formulario normal como mecanismo para borrar la historia.

---

#### 24. Resultado desconocido

Cuando ORIGO no conoce todavía si NEXO aplicó el efecto:

```text
RESULTADO = DESCONOCIDO
```

La experiencia bloquea la creación impulsiva de una segunda entrada.

Debe priorizar:

- consulta del resultado durable;
- conciliación;
- recuperación del mismo intento;
- resolución de conflicto.

---

#### 25. Versión obsoleta

Si el handoff fue preparado sobre una versión stale de la recepción:

- no se aplica sobre la versión nueva silenciosamente;
- se revalida el alcance vigente;
- el usuario recibe un estado claro de conflicto o actualización requerida;
- no se crea una segunda recepción para evitar el conflicto.

---

#### 26. Concurrencia

La experiencia debe resistir:

- dos pestañas;
- dos dispositivos;
- dos trabajadores;
- retry automático concurrente;
- worker y UI simultáneos;
- reentrega del mismo evento.

La UX representa un solo resultado empresarial por identidad de operación.

---

#### 27. Autoridad en NEXO

El handoff no concede autoridad física.

NEXO debe revalidar:

- actor/principal;
- permiso exacto;
- sede;
- ubicación;
- recurso;
- estado;
- versión;
- condición física;
- contrato aplicable.

Un deep link o contexto prellenado nunca sustituye autorización server-side.

---

#### 28. Separación de lectura y mutación

Poder ver que existe una recepción pendiente de continuidad no autoriza crear el movimiento físico.

La experiencia distingue:

```text
VER CONTEXTO
!=
EJECUTAR EFECTO FISICO
```

---

#### 29. Protección de precios y costos

Se consume `ORIGO-UX-012` sin ampliar exposición.

El contexto entregado a NEXO para recepción operativa no requiere por defecto:

```text
unit_cost
stock_unit_cost
line_total
total_amount
```

Si un dato económico es necesario para un proceso autorizado distinto, su proyección sigue la finalidad y field mask correspondiente.

---

#### 30. Estado de continuidad visible en ORIGO

ORIGO debe poder representar el avance del efecto físico sin apropiarse del estado NEXO.

La experiencia puede proyectar estados de presentación derivados como:

```text
SIN_EFECTO_FISICO_REQUERIDO
PENDIENTE_DE_CONTINUIDAD
EN_PROCESO_EN_NEXO
RESULTADO_FISICO_CONFIRMADO
REQUIERE_REVISION
RESULTADO_DESCONOCIDO
```

Estas etiquetas son de experiencia y no crean estados nuevos de `VPROC-0022` o `VPROC-0024`.

---

#### 31. `VSCREEN-0075` — detalle y seguimiento de orden

El detalle de orden puede mostrar:

- recepción ORIGO vinculada;
- alcance recibido;
- si requiere efecto físico;
- referencia de continuidad NEXO;
- estado proyectado del handoff;
- resultado físico conocido cuando corresponda;
- conflictos o pendientes.

No debe ofrecer una segunda captura de recepción como camino normal.

---

#### 32. `VSCREEN-0077` — recepción total o parcial

Después de confirmar una recepción aceptada:

- si no existe efecto físico, el flujo termina esa continuidad sin tarea NEXO;
- si existe efecto físico, se crea o recupera la continuidad hacia NEXO;
- el usuario recibe una siguiente acción inequívoca;
- la siguiente acción nunca es volver a introducir toda la recepción.

---

#### 33. `VSCREEN-0078` — diferencias

Una diferencia resuelta puede habilitar solo el alcance finalmente aceptado.

La continuidad hacia NEXO no incluye:

- líneas rechazadas;
- cantidades retenidas;
- alcance en cuarentena sin habilitación;
- datos que ORIGO aún no ha aceptado.

---

#### 34. `VSCREEN-0079` — historial y auditoría

El historial debe poder reconstruir:

```text
RECEPCION ORIGO
→ HANDOFF
→ INTENTO / RECUPERACION
→ EFECTO NEXO
→ RESULTADO
```

sin que una segunda entrada manual aparezca como si fuera un hecho independiente cuando en realidad era replay.

---

#### 35. Continuidad hacia NEXO

Cuando todavía exista trabajo físico humano, la navegación puede continuar hacia NEXO con contexto ya resuelto.

La transición de aplicación debe preservar como mínimo:

- referencia de recepción;
- compra relacionada;
- sede;
- alcance aceptado;
- correlación;
- versión;
- acción pendiente;
- destino de retorno.

NEXO vuelve a resolver los datos protegidos desde fuentes autoritativas.

---

#### 36. Retorno desde NEXO

Al volver a ORIGO, el usuario no debe depender de recordar manualmente lo que hizo en NEXO.

ORIGO consulta la correlación y muestra el resultado conocido.

Si el efecto sigue pendiente, mantiene el mismo pendiente.

Si está reconciliado, lo refleja como proyección del hecho NEXO.

---

#### 37. Evento físico reconciliado

Cuando aplique, `VPROC-0024.EVT-006` representa:

```text
vento.process.vproc-0024.inbound-movement-reconciled.v1
```

Su significado para ORIGO es evidencia correlacionable de que el ingreso físico quedó contabilizado dentro del proceso propietario de NEXO.

No crea otra recepción ORIGO.

---

#### 38. AS-IS ORIGO

El runtime observado de ORIGO ya contiene recepción propia y persistencia física relacionada sobre estructuras de inventario.

Además, su documentación histórica reconoce que la sinergia con NEXO para recepción contra orden todavía debía cerrarse.

La tarea registra:

```text
AS_IS_ORIGO_RECEIPT_AND_PHYSICAL_EFFECT_COLLAPSED
```

sin convertir esa implementación en contrato objetivo.

---

#### 39. AS-IS NEXO

El runtime observado de NEXO conserva una entrada normal capaz de recibir `purchase_order_id`, precargar líneas y capturar proveedor, fecha, cantidades, ubicación y otros datos mediante formulario.

También acepta desde formulario valores de:

```text
source_app
entry_mode
```

La tarea registra:

```text
AS_IS_NEXO_NORMAL_ENTRY_MANUAL_CONFIRMATION_EXISTS
AS_IS_NEXO_SOURCE_APP_CLIENT_DECLARATION_EXISTS
```

Esto no demuestra todavía un handoff durable `VPROC-0022.EVT-004` con identidad de recepción canónica.

---

#### 40. Brecha de doble captura observada

La existencia de `purchase_order_id` y prefill reduce trabajo, pero no demuestra por sí sola eliminación de doble digitación.

Mientras el usuario pueda volver a construir manualmente el mismo hecho normal en NEXO sin una referencia autoritativa a la recepción ORIGO y sin deduplicación por identidad, persiste la brecha:

```text
AS_IS_ORIGO_NEXO_DURABLE_HANDOFF_NOT_DEMONSTRATED
```

---

#### 41. Frontera con ORIGO-UX-014

`ORIGO-UX-013` define:

- experiencia sin doble captura;
- identidad de continuidad;
- navegación y recuperación;
- datos que no deben volver a pedirse;
- datos físicos que sí pertenecen a NEXO;
- tratamiento UX de retry, conflicto y resultado desconocido.

`ORIGO-UX-014` queda responsable de:

```text
CONECTAR RECEPCION
CON
ENTRADA DE INVENTARIO
```

incluyendo el handoff físico material que haga efectiva esa relación conforme a los contratos propietarios.

---

#### 42. Frontera con ORIGO-UX-015

La eliminación de doble captura NEXO no autoriza crear ni duplicar el evento financiero.

El efecto económico posterior permanece separado y reservado a `ORIGO-UX-015` y a los contratos NUMERA correspondientes.

---

#### 43. Frontera con ORIGO-UX-016

`ORIGO-UX-016` deberá validar el prototipo completo, incluido que:

- una recepción no se capture dos veces;
- una parcial legítima sí permita una entrega posterior distinta;
- un retry no cree otra entrada;
- la contingencia no compita con el flujo normal;
- el usuario entienda qué queda pendiente en ORIGO y qué en NEXO.

Esta tarea no ejecuta esa validación operativa.

---

#### 44. Frontera con INT-PROC-002

Se conserva:

```text
ORIGO
VPROC-0022.PUTAWAY_PENDING
VPROC-0022.EVT-004
```

como origen del handoff físico.

La 013 no redefine estados ni eventos de recepción.

---

#### 45. Frontera con INT-PROC-003

Se conserva:

```text
NEXO
VPROC-0024.INBOUND_MOVEMENT_REQUESTED
```

como inicio del proceso físico cuando corresponde.

NEXO valida el origen y la autoridad antes del efecto.

---

#### 46. Frontera con INT-PROC-005

Se consume el control end-to-end ya aprobado:

```text
UNA RECEPCION REAL
→ UNA IDENTIDAD CANONICA ORIGO
→ EFECTOS FISICOS LEGITIMOS IDENTIFICADOS UNA SOLA VEZ EN NEXO
→ NINGUN REPLAY CREA EFECTO ADICIONAL
```

La tarea no crea un segundo mecanismo de deduplicación paralelo.

---

#### 47. No se crean estados, eventos ni permisos

Esta tarea no crea:

- estados nuevos de `VPROC-0022`;
- estados nuevos de `VPROC-0024`;
- eventos nuevos;
- permission keys nuevas;
- un objeto empresarial paralelo `NEXO_RECEIPT`;
- una segunda orden de compra;
- una segunda recepción por cada entrada física.

---

#### 48. Hallazgos y propietarios

| Hallazgo | Estado | Propietario | Condición de salida |
| --- | --- | --- | --- |
| handoff durable ORIGO → NEXO no demostrado en runtime inspeccionado | `OPEN_NON_BLOCKING_DOCUMENTARY` | `ORIGO-UX-014` + materialización técnica de integración | entrada NEXO nace o se recupera desde identidad autoritativa de recepción ORIGO |
| `source_app` puede provenir del formulario NEXO actual | `OPEN_NON_BLOCKING_DOCUMENTARY` | materialización de `INT-PROC-003` / autorización server-side | procedencia se resuelve desde contrato durable, no desde cliente |
| formulario NEXO normal todavía permite reconstruir contexto de recepción | `OPEN_NON_BLOCKING_DOCUMENTARY` | `ORIGO-UX-014` + UX física correspondiente | flujo normal consume handoff y pide solo datos físicos propietarios |
| control end-to-end completo no demostrado físicamente | `OPEN_NON_BLOCKING_DOCUMENTARY` | `INT-PROC-005` + paquetes ya asignados | replay y concurrencia certificados sin segundo efecto |

No se crea backlog nuevo.

---

#### 49. Requisitos de prueba derivados

**Resultado:** NO GENERA REQUISITOS DE PRUEBA

**Requisitos creados:** 0
**Requisitos modificados:** 0
**Requisitos diferidos:** 0
**Requisitos obsoletos:** 0
**Fragmentos del Registro 04A afectados:** 0

**Justificación:** evitar la doble captura y el doble efecto ya está protegido por requisitos vigentes de ORIGO, NEXO, integración y autorización. La tarea especializa esa cobertura en experiencia y continuidad ORIGO → NEXO sin introducir una obligación verificable nueva fuera del registro existente.

---

#### 50. Cobertura de prueba vigente reutilizada

Sin modificar el Registro 04A, esta tarea reutiliza:

- `TREQ-ORIGO-001` para evitar que repetición o conversión duplique cantidades, costos, orden recibida o evento financiero;
- `TREQ-ORIGO-003` para operación idempotente, durable y reconciliable de recepción;
- `TREQ-NEXO-011` para ledger físico, proyecciones, idempotencia y no doble contabilización;
- `TREQ-INTEGRATION-003` para identidad estable, huella lógica, retry, resultado desconocido y deduplicación;
- `TREQ-INTEGRATION-005` para conservar contexto y revalidar autoridad en el handoff;
- `TREQ-INTEGRATION-006` para una sola fuente empresarial y eliminación de doble digitación competitiva;
- `TREQ-AUTH-013` para enforcement server-side de mutaciones;
- `TREQ-AUTH-015` para evidencia correlacionable de actor, recurso, decisión, versión y resultado.

Esta sección es únicamente trazabilidad de cobertura existente.

---

#### 51. Evidencia de validación

| Clase | Estado | Evidencia |
| --- | --- | --- |
| BUILD | `NOT_EXECUTED` | La compilación documental y regeneración del plan se ejecutarán en el checkout local cuando se incorpore el artefacto. |
| LOCAL | `NOT_EXECUTED` | Formato, quality, delivery, topología, plan, TREQ y `git diff --check` quedan pendientes del checkout local. |
| REMOTA | `PASS` | Se verificaron `vento-shell/main@5057ad57fa296e3e6396f57c8d2761162d46542b`, owner ORIGO `5a19a4b0e520e1717b4a1a96fa1b990f41b4cc51`, integración `e8d31faf44253fc6e4d31ab59067ec3f23cfe758`, `vento-origo/main@70860f1ca5f0a4a73e894cbb840956f9f7eda2ad` y `vento-nexo/main@f0a12557a1a258c84b025933653dc756de4b5a59`, incluidos `INT-PROC-002`, `INT-PROC-003`, `INT-PROC-005` y runtime de entradas/recepciones. |
| OPERATIVA | `NOT_EXECUTED` | No se ejecutaron recepciones reales, handoffs, retries, fallos de red, concurrencia, entradas NEXO ni reconciliaciones sobre ambientes desplegados. |
| FÍSICA | `NOT_APPLICABLE` | `DEFINE_ONCE` / `NO_PHYSICAL_INSTANCE`; esta tarea no materializa código ni infraestructura. |

---

#### 52. Walkthroughs adversariales documentales

La experiencia debe conservar respuesta segura ante:

1. doble click después de aceptar recepción;
2. timeout antes de conocer el resultado NEXO;
3. refresh de ORIGO;
4. apertura simultánea en dos dispositivos;
5. handoff entregado dos veces;
6. misma identidad con distinto contenido;
7. segunda entrega real de la misma orden;
8. parcial anterior más complemento legítimo;
9. recepción `record_only`;
10. NEXO en contingencia mientras ORIGO se recupera;
11. usuario sin permiso NEXO;
12. ubicación inválida;
13. versión stale;
14. diferencia ORIGO todavía abierta;
15. recepción corregida o reversada;
16. efecto NEXO aplicado pero respuesta perdida.

Ningún caso autoriza una segunda captura normal como mecanismo de recuperación.

---

#### 53. Criterios de aceptación

- [ ] ORIGO queda propietaria de `VPROC-0022`.
- [ ] NEXO queda propietario de `VPROC-0024`.
- [ ] Se preserva `VPROC-0022.EVT-004` como handoff normal hacia NEXO.
- [ ] Se preserva `VPROC-0024.INBOUND_MOVEMENT_REQUESTED` como inicio físico cuando aplica.
- [ ] La recepción ORIGO aceptada no se vuelve a crear manualmente como una segunda recepción empresarial en NEXO.
- [ ] Proveedor, orden, recepción, líneas, productos y cantidades aceptadas viajan como contexto/resolución y no como nueva captura autoritativa.
- [ ] NEXO puede exigir únicamente información física propia que todavía deba resolverse.
- [ ] `purchase_receipt_ref` o referencia canónica equivalente vincula el efecto físico con la recepción fuente.
- [ ] El replay recupera el resultado existente y no crea otra entrada.
- [ ] La reutilización conflictiva de identidad produce conflicto.
- [ ] Una segunda entrega real conserva identidad nueva y no se deduplica por compartir orden.
- [ ] Una parcial no marca el saldo pendiente como recibido.
- [ ] `record_only` no genera entrada física ficticia.
- [ ] Contingencia NEXO no compite con un handoff normal ya aplicado.
- [ ] Resultado desconocido bloquea la duplicación y prioriza consulta/conciliación.
- [ ] Corrección y reversión conservan vínculo con original.
- [ ] El handoff no concede permiso físico en NEXO.
- [ ] NEXO revalida actor, sede, ubicación, recurso, estado y versión.
- [ ] Los costos/precios permanecen enmascarados según `ORIGO-UX-012`.
- [ ] ORIGO puede mostrar el estado proyectado del efecto NEXO sin apropiarse de él.
- [ ] `VSCREEN-0075`, `VSCREEN-0077`, `VSCREEN-0078` y `VSCREEN-0079` conservan continuidad sin doble captura.
- [ ] `VPROC-0024.EVT-006` puede proyectarse como evidencia física reconciliada sin crear otra recepción.
- [ ] La implementación AS-IS queda documentada sin declararla contrato objetivo.
- [ ] `source_app` enviado por cliente no se presenta como prueba autoritativa de origen.
- [ ] Los hallazgos tienen propietario y condición de salida.
- [ ] `ORIGO-UX-014` recibe handoff suficiente para conectar recepción con inventario.
- [ ] `ORIGO-UX-015` conserva el efecto financiero posterior.
- [ ] `ORIGO-UX-016` conserva la validación integral del prototipo.
- [ ] No se crean ni modifican requisitos de prueba.
- [ ] No se ejecutan cambios físicos.

---

#### 54. Límites

Esta tarea no:

- implementa el handoff ORIGO → NEXO;
- crea entrada de inventario;
- mueve stock;
- crea LOC, posición o LPN;
- modifica `VPROC-0022` o `VPROC-0024`;
- crea eventos;
- crea permission keys;
- modifica `source_app` físico;
- elimina formularios del runtime;
- cambia `vento-origo`;
- cambia `vento-nexo`;
- modifica Supabase, tablas, RLS, RPC, grants, Storage, Realtime, Edge Functions o datos;
- ejecuta migraciones;
- modifica contratos generados;
- modifica Registro 04A;
- define el evento financiero;
- implementa idempotencia física;
- ejecuta E5;
- crea instancia física;
- desarrolla `ORIGO-UX-014`.

---

#### 55. Continuidad

**ÚLTIMA TAREA APROBADA**
`ORIGO-UX-012 — Ocultar precios cuando no correspondan`

**TAREA ACTUAL APROBADA**
`ORIGO-UX-013 — Evitar repetir recepción manualmente en NEXO`

**SIGUIENTE TAREA RESERVADA**
`ORIGO-UX-014 — Conectar recepción con entrada de inventario`
### ✅ ORIGO-UX-014 — Conectar recepción con entrada de inventario

**Estado:** APROBADA
**Tarea anterior:** ORIGO-UX-013 — Evitar repetir recepción manualmente en NEXO
**Tarea siguiente:** ORIGO-UX-015 — Conectar compra con evento financiero
**Tipo de tarea:** diseño documental integral del contrato de experiencia e integración que conecta una recepción comercial/documental aceptada en ORIGO con el inicio y resultado del ingreso físico propietario de NEXO, preservando identidad, alcance aceptado, parcialidad, modalidad de recepción, autorización, idempotencia, atomicidad lógica, reconciliación y trazabilidad, sin permitir escritura cruzada de la verdad física de inventario ni materialización física propia; `DEFINE_ONCE` / `NO_PHYSICAL_INSTANCE`
**Bloque:** BLOQUE M — ORIGO
**Repositorio propietario:** `vento-group-sas/vento-shell`
**Archivo propietario:** `docs/plan-canonico/modular/bloques/M_ORIGO/02_EXPERIENCIA_DE_COMPRAS.md`
**Estado físico resultante:** `NO_PHYSICAL_INSTANCE`
**Cambios físicos autorizados:** ninguno; esta tarea no modifica código, componentes, rutas, eventos físicos, tablas, RPC, RLS, grants, migraciones, Supabase, datos, contratos generados, ORIGO, NEXO, NUMERA ni despliegues
**Requisitos de prueba creados o modificados:** 0

---

#### 1. Propósito

Definir cómo una recepción ya aceptada por ORIGO se convierte, cuando corresponde, en una solicitud física correlacionada para NEXO sin que ORIGO escriba directamente la verdad propietaria de inventario y sin que NEXO reconstruya manualmente el mismo hecho empresarial.

La regla raíz queda:

```text
ORIGO
VPROC-0022.PUTAWAY_PENDING
+ VPROC-0022.EVT-004
        ↓
HANDOFF EMPRESARIAL DURABLE Y CORRELACIONADO
        ↓
NEXO
VPROC-0024.INBOUND_MOVEMENT_REQUESTED
        ↓
VALIDACION Y EJECUCION PROPIETARIA NEXO
        ↓
VPROC-0024.INBOUND_MOVEMENT_RECONCILED
        ↓
PROYECCION / EVIDENCIA CORRELACIONADA HACIA ORIGO
```

Nunca:

```text
ORIGO ACEPTA RECEPCION
→ ORIGO ESCRIBE DIRECTAMENTE STOCK NEXO
→ NEXO VUELVE A CREAR OTRA ENTRADA
```

Y tampoco:

```text
ORIGO ACEPTA RECEPCION
→ CLIENTE DECLARA source_app = origo
→ NEXO ASUME ORIGEN AUTORITATIVO
```

---

#### 2. Resultado sustantivo

La experiencia objetivo deja definidos estos resultados:

1. ORIGO conserva la propiedad de `VPROC-0022` y de la aceptación comercial/documental.
2. NEXO conserva la propiedad de `VPROC-0024`, del movimiento físico, ubicación, custodia, ledger y proyecciones de existencia.
3. El handoff normal se origina en `VPROC-0022.PUTAWAY_PENDING` mediante `VPROC-0022.EVT-004`.
4. El inicio físico normal en NEXO sigue siendo `VPROC-0024.INBOUND_MOVEMENT_REQUESTED`.
5. El handoff conserva identidad de recepción, alcance aceptado, compra, líneas, cantidades, unidades, sede, modalidad, versión, actor, correlación, idempotencia y evidencia aplicable.
6. NEXO revalida permiso, contexto, sede, recurso, ubicación, unidad, estado y versión antes de producir efecto.
7. NEXO no toma como autoridad final `source_app`, `purchase_order_id`, query params ni valores protegidos enviados por cliente.
8. La misma recepción no puede producir dos veces el mismo efecto físico por replay.
9. Una recepción parcial puede producir efectos físicos parciales diferenciables sin convertir el saldo pendiente en recibido.
10. Una recepción `record_only` no produce una entrada física ficticia.
11. Una recepción con maestro de datos pendiente no produce un efecto físico definitivo hasta resolver la dependencia propietaria aplicable.
12. La corrección conserva vínculo con original y no reescribe destructivamente el efecto previo.
13. El resultado físico reconciliado puede proyectarse hacia ORIGO sin transferir propiedad.
14. ORIGO puede continuar su propia reconciliación solo con evidencia física conocida cuando esa evidencia sea requerida.
15. `ORIGO-UX-015` conserva de forma separada el efecto financiero posterior.
16. No se crean ni modifican requisitos de prueba.

---

#### 3. Handoff recibido de ORIGO-UX-013

Esta tarea consume sin reinterpretación la experiencia definida por `ORIGO-UX-013`:

- una recepción real se captura una sola vez en su propietaria;
- NEXO no vuelve a solicitar como captura de origen proveedor, orden, recepción, líneas y cantidades ya confirmadas en ORIGO;
- NEXO sí puede exigir datos físicos propios que todavía deban resolverse;
- `purchase_receipt_ref` o referencia canónica equivalente vincula continuidad;
- retry, conflicto y resultado desconocido no producen una segunda recepción;
- la contingencia no compite con el flujo normal;
- precios y costos visibles al actor siguen sujetos al contrato de `ORIGO-UX-012`.

La 014 transforma esa continuidad UX en un contrato documental explícito de handoff hacia el proceso físico propietario.

---

#### 4. Topología y frontera física

La topología vigente para esta familia es:

```text
mode = DEFINE_ONCE
execution_gate = NO_PHYSICAL_INSTANCE
```

Consecuencias:

- la tarea define el contrato una sola vez;
- no crea instancia física propia;
- no modifica ORIGO ni NEXO;
- no crea tabla, RPC, trigger, cola, worker, outbox, inbox ni listener;
- no selecciona una tecnología de transporte;
- no modifica `active-sequence.json` manualmente;
- la materialización posterior pertenece a las tareas y paquetes físicos ya existentes.

---

#### 5. Fuentes canónicas consumidas

La definición consume:

- `VPROC-0022` para recepción, aceptación, diferencias y handoff comercial;
- `VPROC-0024` para ingreso, ubicación, custodia y reconciliación física;
- `INT-PROC-002` para el contrato de recepción ORIGO;
- `INT-PROC-003` para el contrato de entrada física NEXO;
- `INT-PROC-005` para control end-to-end de duplicación;
- `ORIGO-UX-009` y `ORIGO-UX-010` para total, parcialidad y saldos;
- `ORIGO-UX-011` para diferencias;
- `ORIGO-UX-012` para protección de precios y datos sensibles;
- `ORIGO-UX-013` para continuidad sin doble captura;
- contratos transversales vigentes de autorización, idempotencia, auditoría y propiedad de datos;
- runtime vigente de recepción ORIGO y entrada NEXO únicamente como evidencia AS-IS, no como autoridad contractual.

---

#### 6. Problema empresarial exacto

La implementación observada contiene capacidad física relacionada con recepción tanto en ORIGO como en NEXO.

Eso crea riesgo de que una misma entrega pueda afectar:

- cabecera de entrada;
- líneas;
- movimientos;
- stock por sede;
- stock por ubicación;
- costos;
- cantidad recibida de orden;
- estado de orden;

desde más de una superficie o secuencia técnica.

El contrato objetivo elimina la competencia de propiedad:

```text
ORIGO
DECIDE Y CONFIRMA RECEPCION COMERCIAL

NEXO
PRODUCE Y CONFIRMA EFECTO FISICO
```

---

#### 7. Propiedad empresarial preservada

La separación obligatoria queda:

| Responsabilidad | Propietaria | Contrato |
| --- | --- | --- |
| recepción comercial y documental | ORIGO | `VPROC-0022` |
| alcance aceptado | ORIGO | `VPROC-0022.TR-007` / `PUTAWAY_PENDING` |
| solicitud de ingreso físico | NEXO | `VPROC-0024.INBOUND_MOVEMENT_REQUESTED` |
| movimiento, ubicación y custodia | NEXO | `VPROC-0024` |
| ledger y proyecciones físicas | NEXO | `VPROC-0024` |
| evidencia de ingreso reconciliado | NEXO | `VPROC-0024.EVT-006` |
| reconciliación comercial posterior | ORIGO | `VPROC-0022` |
| hecho económico posterior | NUMERA | reservado a contrato económico |

La ubicación física de una tabla compartida no cambia esta propiedad empresarial.

---

#### 8. Condición que habilita el handoff

El handoff normal hacia NEXO solo nace cuando la recepción alcanzó:

```text
VPROC-0022.PUTAWAY_PENDING
```

mediante la aceptación correspondiente de ORIGO.

No basta con:

- orden aprobada;
- orden emitida;
- llegada registrada;
- factura recibida;
- verificación física en curso;
- verificación documental en curso;
- diferencia todavía abierta;
- estado legacy `received`;
- un parámetro de URL;
- una cadena `source_app`.

---

#### 9. Evento fuente normal

Se preserva exactamente:

```text
VPROC-0022.EVT-004
vento.process.vproc-0022.putaway-pending.v1
HANDOFF_FACT
```

Hecho confirmado:

```text
LOS BIENES ACEPTADOS
ESPERAN INGRESO Y UBICACION FISICA EN NEXO
```

El evento no afirma que el inventario ya aumentó.

---

#### 10. Inicio propietario en NEXO

Cuando corresponde efecto físico, NEXO inicia o recupera:

```text
VPROC-0024.INBOUND_MOVEMENT_REQUESTED
```

Al nacer sigue siendo verdadero:

```text
NO INGRESADO
NO UBICADO
NO POSTEADO
NO RECONCILIADO
```

El handoff de ORIGO no puede saltar estos significados.

---

#### 11. Modalidad de recepción

La modalidad declarada por ORIGO forma parte del contrato de continuidad.

Regla:

```text
MUEVE INVENTARIO
→ puede producir handoff físico

SOLO REGISTRO
→ no produce entrada física ficticia
```

La conversión posterior entre modalidades no puede ocurrir silenciosamente ni usar el mismo hecho como si nunca hubiera existido.

---

#### 12. Alcance aceptado

Solo el alcance comercialmente aceptado puede habilitar efecto físico ordinario.

El handoff conserva, según aplique:

- referencia de recepción;
- referencia de compra;
- líneas aceptadas;
- producto;
- cantidad aceptada;
- unidad y presentación;
- conversión vigente o snapshot aplicable;
- condición observada relevante;
- lote, serial o vencimiento cuando corresponda;
- sede receptora;
- evidencia necesaria.

Una línea rechazada no se vuelve inventario disponible por compartir cabecera con líneas aceptadas.

---

#### 13. Identidad de recepción

La instancia empresarial de `VPROC-0022` continúa siendo la identidad fuente de la recepción.

El handoff debe preservar una referencia durable equivalente a:

```text
purchase_receipt_ref
```

sin exigir que ese nombre se convierta en una columna física concreta en esta tarea.

Una orden puede tener varias recepciones legítimas; por tanto, `purchase_order_id` aislado no identifica de forma suficiente el hecho fuente.

---

#### 14. Identidad transversal del handoff

El contrato preserva, cuando exista en el sobre canónico:

```text
process_id
process_instance_id
source_event_ref / event_id
correlation_id
causation_id
request_id
idempotency_key
aggregate_id
aggregate_version
schema_version
contract_version
```

La materialización concreta consume el contrato transversal vigente; esta tarea no inventa un segundo namespace de identidad.

---

#### 15. Datos de origen que NEXO recibe

NEXO debe poder resolver desde el handoff, sin pedir una segunda captura empresarial normal:

- recepción fuente;
- compra fuente;
- proveedor aplicable;
- sede fuente y sede destino esperada cuando corresponda;
- líneas aceptadas;
- producto o recurso;
- cantidad aceptada;
- unidad observada y unidad de stock aplicable;
- presentación o perfil de unidad cuando exista;
- factor de conversión versionado cuando aplique;
- lote, serial, vencimiento o condición ya observados cuando deban conservarse;
- documentos o evidencia estrictamente necesarios;
- modalidad de recepción;
- versión y correlación.

El dato recibido es contexto verificable, no autorización final de mutación.

---

#### 16. Datos físicos que NEXO resuelve

NEXO conserva autoridad para resolver o solicitar únicamente datos de su dominio que no puedan venir confirmados por ORIGO, por ejemplo:

- LOC de destino;
- posición interna;
- LPN;
- condición física propietaria;
- cuarentena;
- disponibilidad resultante;
- routing físico;
- reglas de almacenamiento;
- restricciones de ubicación;
- confirmación material exigida por `VPROC-0024`.

No se convierte la reducción de doble captura en una omisión de validación física.

---

#### 17. Validación de origen en NEXO

NEXO no acepta como prueba autoritativa:

```text
source_app = origo
purchase_order_id = X
URL ORIGO
query param
hidden input
texto de formulario
```

La procedencia debe poder vincularse a un hecho o referencia durable y verificable de `VPROC-0022`.

---

#### 18. Revalidación de autoridad

Antes de producir un efecto físico, NEXO revalida en servidor:

- permiso exacto;
- actor efectivo;
- principal;
- sede;
- recurso;
- ubicación;
- estado vigente;
- versión;
- condición requerida;
- columnas o campos mutables aplicables.

El hecho de que ORIGO haya aceptado la recepción no concede por sí solo permiso para mover inventario.

---

#### 19. Revalidación de cantidad

NEXO no puede aplicar más cantidad física que la habilitada por el alcance aceptado sin una causa contractual distinta.

La validación debe distinguir:

```text
cantidad aceptada por ORIGO
cantidad ya aplicada físicamente
cantidad pendiente de efecto físico
cantidad física observada en ejecución
```

No se confunden estos valores en un único `received` genérico.

---

#### 20. Recepción total

Cuando el alcance aceptado cubre totalmente la entrega y corresponde inventario:

```text
ORIGO PUTAWAY_PENDING
→ handoff completo
→ NEXO aplica el efecto físico permitido
→ NEXO reconcilia
```

El cierre físico no se infiere por haber aceptado totalmente en ORIGO.

---

#### 21. Recepción parcial

Una recepción parcial conserva identidad propia y solo habilita el alcance efectivamente aceptado.

Reglas:

1. el saldo pendiente no se envía como recibido;
2. una entrega posterior legítima crea otra recepción o continuación empresarial diferenciable según contrato;
3. un replay de la parcial original no crea otro movimiento;
4. la suma física debe poder reconciliarse con los efectos habilitados sin solapamiento;
5. no se deduplica por compartir orden, producto o proveedor.

---

#### 22. Diferencias todavía abiertas

Mientras una diferencia material mantenga el alcance afectado sin aceptación:

```text
NO HANDOFF FISICO ORDINARIO
DEL ALCANCE NO ACEPTADO
```

El tratamiento de diferencias de `ORIGO-UX-011` se conserva y no se salta para acelerar inventario.

---

#### 23. Aceptación condicional

Cuando el contrato vigente permita aceptación condicionada, el handoff conserva la condición y no la convierte en disponibilidad irrestricta.

NEXO puede, conforme a su proceso:

- retener;
- cuarentenar;
- limitar ubicación;
- exigir evidencia;
- impedir disponibilidad;

sin borrar que ORIGO aceptó comercialmente solo un alcance condicionado.

---

#### 24. Maestro de datos pendiente

Cuando producto, presentación, unidad o relación necesaria requieran revisión de maestro:

```text
RECEPCION ORIGO PUEDE QUEDAR DURABLE
PERO
EFECTO FISICO DEFINITIVO NO SE INVENTA
```

La dependencia debe resolverse por el propietario ya definido y luego reanudarse con la misma correlación o con la relación canónica de continuidad aplicable.

No se crea un producto físico improvisado para cerrar la recepción.

---

#### 25. Lotes, seriales y vencimientos

Cuando la política de inventario lo requiera, NEXO debe conservar y validar los identificadores físicos aplicables.

Si ORIGO ya observó un lote, serial o vencimiento, el dato viaja como evidencia correlacionada; NEXO conserva autoridad sobre su representación física, ubicación, condición y trazabilidad.

Una discrepancia no se resuelve sobreescribiendo silenciosamente el valor fuente.

---

#### 26. LPN, LOC y posición

`VPROC-0022` no concede a ORIGO propiedad sobre:

- LOC;
- posición;
- LPN;
- relación de custodia;
- disponibilidad física.

Esos datos pertenecen al efecto NEXO y pueden ser condición de finalización física aunque no deban ser capturados en ORIGO.

---

#### 27. Unidad y conversión

El handoff conserva la unidad observada y la información de conversión aplicable para evitar reinterpretaciones.

NEXO valida:

- unidad admitida;
- presentación;
- factor vigente o snapshot autorizado;
- unidad de stock;
- cantidad física resultante.

Una conversión posterior no modifica retroactivamente el significado de una recepción ya confirmada.

---

#### 28. Costo dentro del handoff

El movimiento físico puede requerir contexto de costo conforme al contrato de NEXO, pero la visibilidad del actor sigue sujeta a `ORIGO-UX-012` y `ORIGO-AUTH-010`.

Reglas:

- el usuario operativo no obtiene precio o costo por participar en el efecto físico;
- una proyección server-to-server autorizada puede transportar únicamente el dato económico mínimo requerido por el contrato físico;
- el costo físico no constituye por sí mismo obligación, pago ni hecho económico definitivo;
- NEXO no amplía la proyección económica recibida.

---

#### 29. Idempotencia del handoff

La misma identidad de handoff con contenido compatible debe recuperar el mismo estado o resultado.

```text
MISMA IDENTIDAD
+ MISMA HUELLA LOGICA
→ MISMO RESULTADO
→ CERO EFECTO FISICO ADICIONAL
```

Y:

```text
MISMA IDENTIDAD
+ CONTENIDO INCOMPATIBLE
→ CONFLICTO
→ CERO EFECTO PARCIAL NUEVO
```

---

#### 30. Identidad del efecto físico

Una recepción puede producir varios efectos físicos legítimos cuando el contrato lo requiera por líneas, lotes, ubicaciones o particiones controladas.

Por tanto, la garantía es:

```text
UN EFECTO FISICO LEGITIMO
→ UNA IDENTIDAD ESTABLE
→ UNA APLICACION PROPIETARIA
→ UN RESULTADO RECUPERABLE
```

No:

```text
UNA RECEPCION
→ FORZOSAMENTE UN SOLO MOVIMIENTO FISICO
```

---

#### 31. Retry

Un retry técnico no cambia la intención empresarial.

Pueden cambiar:

- conexión;
- request HTTP;
- worker;
- intento de cola;
- pestaña;
- dispositivo;
- timestamp técnico.

No deben cambiar por ese motivo:

- recepción fuente;
- alcance;
- identidad idempotente;
- correlación;
- resultado empresarial ya aplicado.

---

#### 32. Resultado desconocido

Ante timeout, caída o respuesta perdida:

```text
RESULTADO DESCONOCIDO
→ CONSULTAR / RECONCILIAR IDENTIDAD EXISTENTE
→ NO CREAR OTRA ENTRADA POR DEFECTO
```

La UI no presenta error técnico como prueba de que el efecto no ocurrió.

---

#### 33. Concurrencia

El contrato debe resistir, en la futura materialización:

- doble click;
- dos pestañas;
- dos dispositivos;
- dos trabajadores;
- frontend y job concurrentes;
- dos consumidores del mismo mensaje;
- reintento automático mientras el primero sigue en curso.

La resolución debe producir un solo ganador empresarial por identidad del mismo efecto.

---

#### 34. Evento físico reconciliado

Se preserva como evidencia física normal:

```text
VPROC-0024.EVT-006
vento.process.vproc-0024.inbound-movement-reconciled.v1
```

Hecho confirmado:

```text
EL INGRESO FISICO QUEDO CONTABILIZADO
UNA SOLA VEZ
DENTRO DEL ALCANCE PROPIETARIO DE NEXO
```

Su reentrega no crea otro movimiento.

---

#### 35. Proyección de resultado hacia ORIGO

ORIGO puede recibir o consultar una proyección correlacionada del efecto NEXO para mostrar:

- pendiente de ingreso;
- en validación o ejecución según proyección aprobada;
- reconciliado;
- bloqueado o en conflicto cuando corresponda;
- referencia al resultado físico.

La proyección no convierte ORIGO en propietario de los estados internos de NEXO.

---

#### 36. Avance comercial posterior

Cuando el contrato exige confirmación física, ORIGO no debe avanzar desde `PUTAWAY_PENDING` basándose únicamente en que el handoff fue enviado.

Debe existir el resultado correlacionado necesario para continuar su propia transición hacia reconciliación económica.

Un ACK de transporte no equivale a ingreso físico reconciliado.

---

#### 37. Separación entre handoff y movimiento

Queda explícito:

```text
HANDOFF ACEPTADO
!=
MOVIMIENTO CREADO

MOVIMIENTO CREADO
!=
POSTING RECONCILIADO

POSTING RECONCILIADO
!=
OBLIGACION ECONOMICA
```

Cada momento conserva propietario y evidencia distinta.

---

#### 38. Corrección antes del efecto físico

Si ORIGO corrige una recepción antes de que NEXO aplique el efecto físico:

- la intención obsoleta no debe ejecutarse como vigente;
- NEXO debe revalidar versión y estado;
- la nueva intención conserva vínculo con la original cuando corresponda;
- una identidad obsoleta no se reutiliza con contenido incompatible.

---

#### 39. Corrección después del efecto físico

Si el efecto físico ya fue aplicado:

- no se borra el movimiento original;
- la corrección ORIGO no reescribe silenciosamente el ledger NEXO;
- el ajuste, retorno, reversión o compensación física aplicable pertenece al contrato NEXO correspondiente;
- el replacement o corrección conserva relación con la recepción original;
- la historia queda reconstruible.

---

#### 40. Reversión

Una reversión comercial no implica por sí sola que el stock vuelva a su estado anterior.

Si existe efecto físico previo, se requiere el tratamiento compensatorio propietario de NEXO y su resultado correlacionado.

La reversión no puede quedar como una mutación destructiva que elimine evidencia.

---

#### 41. Contingencia manual

La entrada manual o de emergencia en NEXO permanece disponible únicamente bajo la política de contingencia aprobada.

No puede usarse como atajo cuando ya existe un handoff normal conocido para la misma recepción.

La contingencia debe conservar causa y posterior conciliación con la fuente empresarial correspondiente.

---

#### 42. Recuperación de contingencia

Si una contingencia produjo un efecto físico durante una indisponibilidad:

- la recuperación no vuelve a aplicar el handoff normal ciegamente;
- primero se identifica el hecho físico ya producido;
- se correlaciona con la recepción ORIGO;
- se evita una segunda suma;
- la evidencia de contingencia permanece auditable.

---

#### 43. Frontera con `source_app`

El valor físico observado `source_app = origo` puede existir como atributo informativo de transición.

No constituye:

- identidad de recepción;
- autorización;
- prueba de aceptación;
- idempotency key;
- evidencia de que el movimiento todavía no ocurrió;
- contrato suficiente de handoff.

El target exige una referencia empresarial durable.

---

#### 44. Frontera con `purchase_order_id`

`purchase_order_id` conserva trazabilidad útil, pero no identifica por sí solo la recepción ni el efecto físico.

Una misma orden puede producir:

- recepción parcial 1;
- recepción parcial 2;
- corrección;
- devolución;
- distintos lotes o ubicaciones;
- varios efectos físicos legítimos.

La deduplicación no se hace únicamente por orden.

---

#### 45. AS-IS ORIGO

El runtime observado de recepción ORIGO puede actualmente, dentro de su propia acción:

- insertar `inventory_entries`;
- insertar `inventory_entry_items`;
- insertar `inventory_movements` con `receipt_in`;
- actualizar `inventory_stock_by_site`;
- ejecutar `upsert_inventory_stock_by_location`;
- actualizar costos y eventos de costo en ciertos casos;
- incrementar `purchase_order_items.quantity_received`;
- marcar una orden como `received` bajo la condición implementada.

Esta capacidad física observada no define el contrato objetivo de propiedad.

---

#### 46. AS-IS NEXO

El runtime observado de entrada NEXO también puede:

- recibir `purchase_order_id`;
- recibir una cadena `source_app` desde formulario;
- crear `inventory_entries` e items;
- crear movimientos `receipt_in`;
- actualizar stock por sede y ubicación;
- manejar presentación y costo;
- incrementar cantidades recibidas de orden;
- marcar la orden como `received` bajo condiciones físicas implementadas.

La coexistencia demuestra capacidad, no un handoff canónico ya resuelto.

---

#### 47. Brecha AS-IS principal

La brecha queda expresada como:

```text
AS_IS_ORIGO_AND_NEXO_CAN_MATERIALIZE_RECEIPT_EFFECTS
TARGET_SINGLE_PHYSICAL_OWNER_NEXO
TARGET_DURABLE_ORIGO_TO_NEXO_HANDOFF
```

Mientras esa transición física no se materialice, no se declara satisfecha la arquitectura objetivo por la mera existencia de páginas, formularios o escrituras compartidas.

---

#### 48. Atomicidad lógica

La recepción y sus efectos distribuidos deberán confirmarse de forma atómica dentro de cada frontera propietaria o quedar en estados durables, identificables y reconciliables.

Esta tarea no exige una transacción distribuida única entre ORIGO y NEXO.

Sí exige que un fallo intermedio no obligue a adivinar si el efecto ocurrió ni autorice repetirlo sin conciliación.

---

#### 49. Frontera con `INT-PROC-002`

Se conserva `INT-PROC-002` como autoridad del contrato de recepción ORIGO.

La 014 consume:

```text
VPROC-0022.PUTAWAY_PENDING
VPROC-0022.EVT-004
```

sin redefinir estados, transiciones ni eventos de `VPROC-0022`.

---

#### 50. Frontera con `INT-PROC-003`

Se conserva `INT-PROC-003` como autoridad del contrato mediante el cual NEXO crea o determina que no corresponde crear la entrada física.

La 014 aplica a la experiencia ORIGO ese contrato sin redefinir `VPROC-0024`.

---

#### 51. Frontera con `INT-PROC-005`

Se consume el control end-to-end ya aprobado:

```text
UNA RECEPCION REAL
→ UNA IDENTIDAD CANONICA ORIGO
→ EFECTOS FISICOS LEGITIMOS IDENTIFICADOS UNA SOLA VEZ EN NEXO
→ NINGUN REPLAY CREA EFECTO ADICIONAL
```

La 014 no crea un segundo mecanismo de deduplicación.

---

#### 52. Frontera con ORIGO-UX-015

La conexión con inventario no produce por sí sola:

- gasto definitivo;
- obligación a proveedor;
- cuenta por pagar;
- asiento;
- pago.

El evento financiero y la experiencia correspondiente permanecen reservados a `ORIGO-UX-015` y al contrato NUMERA aplicable.

---

#### 53. Frontera con ORIGO-UX-016

`ORIGO-UX-016` conserva la validación integral del prototipo, incluyendo al menos:

- total;
- parcial;
- diferencia;
- `record_only`;
- maestro pendiente;
- retry;
- concurrencia;
- resultado desconocido;
- corrección antes y después del efecto;
- contingencia;
- visibilidad de costos;
- proyección de resultado NEXO;
- no duplicación física.

Esta tarea no ejecuta esa validación operativa.

---

#### 54. Hallazgos y propietarios

| Hallazgo | Bloquea esta definición | Propietario canónico | Condición de salida |
| --- | --- | --- | --- |
| ORIGO observado escribe movimientos y stock directamente | no bloquea definición documental; bloquea materialización objetivo completa | paquetes físicos ORIGO/NEXO/Supabase ya asignados y contratos `INT-PROC-002`/`003`/`005` | una sola propietaria física y handoff durable demostrados en implementación |
| NEXO observado acepta `source_app` desde formulario | no bloquea definición documental | `INT-PROC-003`, autorización server-side e integración física aplicable | procedencia resuelta desde referencia durable, no desde cliente |
| ORIGO y NEXO observados pueden actualizar cantidades de orden | no bloquea definición documental; exige reconciliación de ownership | `TREQ-ORIGO-003`, contratos de integración y paquetes físicos aplicables | una única secuencia autoritativa evita suma duplicada y escritura competidora |
| no se demuestra todavía deduplicación end-to-end física | no bloquea definición documental | `INT-PROC-005` y materialización técnica posterior | replay, concurrencia y resultado desconocido probados sin doble efecto |
| atomización física actual no está demostrada | no bloquea definición documental | `TREQ-ORIGO-003`, tareas Supabase y paquetes asignados | fallos intermedios dejan resultado durable y reconciliable |

No se inventa una tarea administrativa nueva para estos hallazgos.

---

#### 55. Requisitos de prueba derivados

**Resultado:** NO GENERA REQUISITOS DE PRUEBA NUEVOS NI MODIFICA REQUISITOS EXISTENTES.

**Justificación:** la tarea materializa documentalmente, para la experiencia de recepción ORIGO hacia inventario NEXO, obligaciones ya registradas sobre modalidad visible, prevención de doble efecto, atomicidad o estado durable reconciliable, idempotencia, handoff, fuente única, ledger físico, autorización server-side y auditoría. No introduce una conducta verificable materialmente distinta que requiera una nueva fila.

---

#### 56. Cobertura de prueba vigente reutilizada

Se conserva sin modificar la cobertura existente para:

- `TREQ-ORIGO-001`, sobre modalidad de recepción y prevención de duplicación de cantidades, costos, orden recibida o evento financiero;
- `TREQ-ORIGO-003`, sobre una sola operación empresarial, efectos atómicos o durables y reconciliables, idempotencia, replay seguro y corrección vinculada;
- `TREQ-NEXO-010`, sobre unidad, presentación, conversión y semántica equivalente;
- `TREQ-NEXO-011`, sobre fuente canónica de movimientos y proyecciones, atomicidad, idempotencia, concurrencia y no doble contabilización;
- `TREQ-NEXO-012`, sobre lote, serial, ubicación, condición, cuarentena y trazabilidad;
- `TREQ-INTEGRATION-003`, sobre identidad estable, huella, retries, resultado desconocido, deduplicación y recuperación;
- `TREQ-INTEGRATION-005`, sobre preservación de contexto y revalidación de autoridad en handoffs;
- `TREQ-INTEGRATION-006`, sobre fuente empresarial única y prohibición de fuentes competidoras;
- `TREQ-AUTH-013`, sobre validación server-side antes de mutaciones;
- `TREQ-AUTH-015`, sobre evidencia correlacionable de actor, contexto, permiso, decisión, versión y tiempo.

Esta trazabilidad no actualiza el Registro 04A.

---

#### 57. Evidencia de validación

| Clase | Estado | Evidencia documental |
| --- | --- | --- |
| BUILD | NOT_EXECUTED | tarea `DEFINE_ONCE`; no existe build físico autorizado por este artefacto |
| LOCAL | NOT_EXECUTED | la incorporación al archivo propietario y sus validadores pertenecen al lifecycle documental posterior |
| REMOTA | NOT_EXECUTED | la aprobación de este artefacto no ejecuta despliegue ni mutación remota |
| OPERATIVA | NOT_EXECUTED | `ORIGO-UX-016` conserva la validación integral con usuarios y escenarios operativos |
| FÍSICA | NOT_APPLICABLE | `NO_PHYSICAL_INSTANCE`; la tarea no crea instancia física propia |

La evidencia AS-IS usada para diseñar el contrato no se presenta como PASS de implementación.

---

#### 58. Walkthroughs adversariales documentales

**Caso A — replay del mismo handoff**

```text
mismo origen + misma identidad + mismo contenido
→ recuperar efecto / estado existente
→ no sumar inventario otra vez
```

**Caso B — segunda entrega legítima de la misma orden**

```text
misma orden + recepción ORIGO distinta
→ nueva identidad de recepción
→ efecto físico nuevo solo para su alcance
```

**Caso C — `record_only`**

```text
recepción registrada
+ modalidad sin inventario
→ no iniciar VPROC-0024 por inferencia
```

**Caso D — diferencia abierta**

```text
línea no aceptada
→ no habilitar ingreso ordinario de esa línea
```

**Caso E — timeout después de aplicar stock**

```text
respuesta perdida
→ consultar identidad / resultado durable
→ no crear segunda entrada
```

**Caso F — corrección después de efecto físico**

```text
original permanece
→ acción compensatoria / vinculada NEXO cuando corresponda
→ no borrar historia
```

**Caso G — `source_app = origo` falsificado**

```text
cadena cliente
→ no prueba origen
→ NEXO exige referencia durable y autoridad vigente
```

**Caso H — costo protegido**

```text
operador NEXO sin visibilidad económica
→ puede ejecutar efecto físico autorizado
→ no recibe costo/precio por inferencia
```

---

#### 59. Criterios de aceptación

- [ ] ORIGO conserva propiedad de `VPROC-0022`.
- [ ] NEXO conserva propiedad de `VPROC-0024`.
- [ ] Se preserva `VPROC-0022.PUTAWAY_PENDING` como estado fuente normal del handoff físico.
- [ ] Se preserva `VPROC-0022.EVT-004` como `HANDOFF_FACT` normal.
- [ ] Se preserva `VPROC-0024.INBOUND_MOVEMENT_REQUESTED` como inicio propietario NEXO cuando corresponde efecto físico.
- [ ] Se preserva `VPROC-0024.EVT-006` como evidencia de ingreso físico reconciliado.
- [ ] El handoff conserva una referencia durable a la recepción ORIGO.
- [ ] `purchase_order_id` aislado no se usa como identidad suficiente de recepción.
- [ ] `source_app` enviado por cliente no se usa como prueba autoritativa de origen.
- [ ] El contexto enviado a NEXO no sustituye la revalidación server-side.
- [ ] NEXO revalida permiso, actor, sede, recurso, ubicación, estado y versión.
- [ ] Solo el alcance aceptado puede habilitar efecto físico ordinario.
- [ ] Una línea rechazada no se vuelve disponible por compartir cabecera.
- [ ] Una parcial no convierte el saldo pendiente en recibido.
- [ ] Una segunda entrega legítima no se trata como replay.
- [ ] `record_only` no crea entrada física ficticia.
- [ ] Maestro de datos pendiente no se resuelve inventando un efecto definitivo.
- [ ] Unidad, presentación y conversión permanecen reproducibles.
- [ ] LOC, posición y LPN permanecen bajo autoridad NEXO.
- [ ] Lote, serial, vencimiento y condición conservan trazabilidad cuando aplican.
- [ ] Costo visible al actor respeta `ORIGO-UX-012`.
- [ ] Una proyección server-to-server de costo no crea obligación económica.
- [ ] El mismo handoff y huella no producen un segundo efecto.
- [ ] La reutilización conflictiva produce conflicto y cero efecto adicional.
- [ ] Resultado desconocido exige conciliación antes de reintento destructivo.
- [ ] La concurrencia conserva un solo efecto por identidad lógica.
- [ ] ORIGO puede observar el resultado NEXO sin apropiarse del ledger.
- [ ] Un ACK de transporte no se confunde con movimiento reconciliado.
- [ ] Corrección antes del efecto invalida o revalida la intención obsoleta sin reutilización incompatible.
- [ ] Corrección después del efecto conserva original y compensación vinculada.
- [ ] Contingencia manual no compite con un handoff normal conocido.
- [ ] Recuperación de contingencia concilia antes de volver a aplicar.
- [ ] La capacidad física AS-IS de ORIGO no se declara contrato objetivo.
- [ ] La capacidad física AS-IS de NEXO no se declara handoff ya resuelto.
- [ ] La secuencia objetivo elimina fuentes físicas competidoras.
- [ ] La tarea no redefine `INT-PROC-002`, `INT-PROC-003` ni `INT-PROC-005`.
- [ ] `ORIGO-UX-015` conserva el efecto financiero posterior.
- [ ] `ORIGO-UX-016` conserva la validación integral del prototipo.
- [ ] No se crean ni modifican requisitos de prueba.
- [ ] No se ejecutan cambios físicos.

---

#### 60. Límites

Esta tarea no:

- implementa el handoff ORIGO → NEXO;
- modifica `vento-origo`;
- modifica `vento-nexo`;
- elimina escrituras AS-IS;
- crea tablas, columnas, constraints o índices;
- crea RPC, funciones o triggers;
- crea outbox, inbox, colas o workers;
- crea eventos nuevos;
- cambia `VPROC-0022` ni `VPROC-0024`;
- crea permission keys;
- modifica roles, grants o scopes;
- cambia RLS;
- ejecuta migraciones;
- modifica Supabase o datos;
- mueve stock real;
- corrige inventario histórico;
- modifica órdenes reales;
- genera obligaciones económicas;
- ejecuta pagos;
- modifica contratos generados;
- modifica el Registro 04A;
- ejecuta E5;
- crea instancia física;
- desarrolla `ORIGO-UX-015`.

---

#### 61. Continuidad

**ÚLTIMA TAREA APROBADA**
`ORIGO-UX-013 — Evitar repetir recepción manualmente en NEXO`

**TAREA ACTUAL APROBADA**
`ORIGO-UX-014 — Conectar recepción con entrada de inventario`

**SIGUIENTE TAREA RESERVADA**
`ORIGO-UX-015 — Conectar compra con evento financiero`
### [ ] ORIGO-UX-015 — Conectar compra con evento financiero
### [ ] ORIGO-UX-016 — Validar el prototipo con compras y recepción
