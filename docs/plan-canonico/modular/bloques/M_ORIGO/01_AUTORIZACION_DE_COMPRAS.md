### MINI-BLOQUE — AUTORIZACIÓN DE COMPRAS

<!-- PLAN-SECTION-META:START -->
Esta sección organiza **autorización de compras** dentro de **M ORIGO**. Agrupa tareas que producen un resultado funcional común y deben mantenerse juntas para conservar contexto, trazabilidad y orden de ejecución.

**Cobertura canónica:** `ORIGO-AUTH-001` a `ORIGO-AUTH-015` — 15 tareas.

**Resultado esperado:** al cerrar este mini-bloque, su resultado debe quedar definido, verificable y coherente con las secciones anterior y siguiente antes de avanzar.

**Límites funcionales:** comienza con “Inventariar vistas de compras” y concluye con “Ejecutar pruebas integrales”.
<!-- PLAN-SECTION-META:END -->

<!-- EXECUTION-GATE-RECONCILIATION:B601-800:ORIGO-AUTH -->
### Reconciliación topológica de ORIGO-AUTH-001 a ORIGO-AUTH-015

`ORIGO-AUTH-001..008` inventarían superficies y definen permisos; `ORIGO-AUTH-009..015` materializan límites, protección, contexto, migración y pruebas.

| Tareas | Modalidad | Gate |
| --- | --- | --- |
| `ORIGO-AUTH-001..008` | `DEFINE_ONCE` | `NO_PHYSICAL_INSTANCE` |
| `ORIGO-AUTH-009..015` | `PER_IMPLEMENTATION_UNIT` | `POST_E5_PACKAGE` |

### ✅ ORIGO-AUTH-001 — Inventariar vistas de compras

**Estado:** APROBADA
**Tarea anterior:** FOGO-UX-015 — Validar el prototipo por área productiva
**Tarea siguiente:** ORIGO-AUTH-002 — Inventariar vistas de proveedores
**Tipo de tarea:** documental; inventario AS-IS/canónico de las vistas, rutas, acciones, estados, documentos y fronteras de autorización asociadas a compras y órdenes de compra en ORIGO, con reconciliación de identidades, faltantes, duplicados, brechas y propietarios posteriores; `DEFINE_ONCE` / `NO_PHYSICAL_INSTANCE`
**Bloque:** BLOQUE M — ORIGO
**Repositorio propietario:** `vento-group-sas/vento-shell`
**Archivo propietario:** `docs/plan-canonico/modular/bloques/M_ORIGO/01_AUTORIZACION_DE_COMPRAS.md`
**Estado físico resultante:** `NO_PHYSICAL_INSTANCE`
**Cambios físicos autorizados:** ninguno; esta tarea no modifica código, rutas, navegación, permisos, roles, datos, Supabase, migraciones, RLS, RPC, Storage, documentos, órdenes reales ni despliegues
**Requisitos de prueba creados o modificados:** 0

---

#### 1. Propósito

Inventariar de forma cerrada y verificable las superficies de ORIGO que hoy participan en la consulta, creación, edición, emisión, seguimiento y exportación de órdenes de compra, reconciliándolas contra el catálogo canónico de procesos, pantallas, permisos y recursos sin convertir la existencia de una página o una acción técnica en prueba de autorización suficiente o de proceso completo.

La regla de lectura del inventario queda:

```text
RUTA AS-IS
!=
PANTALLA CANÓNICA
!=
PROCESO COMPLETO
!=
PERMISO SUFICIENTE
!=
TRANSICIÓN EMPRESARIAL AUTORIZADA
```

La tarea fija el universo de compras que `ORIGO-AUTH-004..010` y `ORIGO-UX-001..008` deberán proteger o rediseñar posteriormente. No redefine proveedores, recepción ni las capacidades de sus tareas propietarias.

---

#### 2. Frontera recibida de FOGO-UX-015

`FOGO-UX-015` entrega únicamente continuidad documental hacia el BLOQUE M. No entrega autoridad funcional, identidades de compras, permisos ORIGO ni decisiones de abastecimiento reutilizables.

La transición entre bloques queda:

```text
FOGO-UX-015
→ cierre documental de experiencia FOGO
→ ORIGO-AUTH-001
→ inicio del inventario de autorización ORIGO
```

Por tanto, todo contenido sustantivo de esta tarea se deriva de las fuentes canónicas de ORIGO y del runtime verificable de `vento-origo`, no de contratos productivos FOGO.

---

#### 3. Naturaleza y topología

La reconciliación vigente del mini-bloque establece:

```text
ORIGO-AUTH-001..008
mode = DEFINE_ONCE
execution_gate = NO_PHYSICAL_INSTANCE
```

Consecuencias:

1. `ORIGO-AUTH-001` se define una sola vez como contrato documental;
2. no existe identidad física `ORIGO-AUTH-001::<implementation_unit_id>`;
3. esta tarea no implementa guards, permisos, RLS, RPC, Server Actions ni migraciones;
4. la tarea puede documentar brechas del runtime, pero no corregirlas;
5. toda modificación VENTO de Supabase continúa perteneciendo a `vento-group-sas/vento-shell` y a su tarea física propietaria;
6. las materializaciones posteriores deberán consumir este inventario sin reabrir la existencia de las superficies aquí reconciliadas.

---

#### 4. Fuentes y snapshots verificados

La preparación documental se ancla a los siguientes estados verificables:

```text
vento-shell/main
8e5e60daee3b759034d175c7b574c198997715bc

vento-origo/main
70860f1ca5f0a4a73e894cbb840956f9f7eda2ad
```

Se contrastaron, como mínimo:

- mini-bloque `ORIGO-AUTH-001..015`;
- inventario aprobado `AUTH-UI-003 — Inventariar todas las rutas de ORIGO`;
- catálogo canónico de aplicaciones, permisos, scopes y recursos;
- catálogo canónico de procesos y pantallas;
- requisitos ORIGO vigentes del Registro 04A;
- `scripts/quality/origo-consumer-baseline-gate.mjs` del consumidor;
- páginas y Server Actions de `purchase-orders`;
- handler y token de PDF de orden;
- middleware y guard de ORIGO;
- sincronizador de navegación del consumidor.

El snapshot remoto de `vento-shell` todavía no contiene la incorporación de `FOGO-UX-015`; esa diferencia no altera las identidades ORIGO aquí inventariadas y la continuidad inmediata utiliza el artefacto completo aprobado de la tarea anterior.

---

#### 5. Definición exacta de “vistas de compras” para esta tarea

El inventario de `ORIGO-AUTH-001` incluye exclusivamente superficies cuyo objeto primario observado es la orden de compra o su documento de emisión:

```text
LISTADO DE ÓRDENES
DETALLE DE ORDEN
CREACIÓN DE ORDEN
EDICIÓN DE ORDEN
ACCIONES DE ORDEN
DOCUMENTO PDF DE ORDEN
```

No incorpora como vistas propietarias de esta tarea:

- `/suppliers*`, reservadas a `ORIGO-AUTH-002`;
- `/receipts*`, reservadas a `ORIGO-AUTH-003`;
- `/product-master-review`, que pertenece al catálogo/revisión de maestro y no es una vista primaria de orden de compra;
- `/login` y `/no-access`, que son infraestructura de acceso/denegación;
- la raíz `/`, que es entrada de aplicación y no vista específica de compra.

Las dependencias hacia proveedores, productos, presentaciones, sedes, recepción y NEXO se registran como relaciones, no como ampliación del universo propietario.

---

#### 6. Universo AS-IS de páginas de compra

El snapshot actual conserva exactamente cuatro archivos de página cuyo patrón pertenece a `purchase-orders`:

| Identidad aprobada de ruta | Patrón | Archivo fuente | Tipo | Función AS-IS primaria |
| --- | --- | --- | --- | --- |
| `ORIGO-ROUTE-005` | `/purchase-orders` | `src/app/purchase-orders/page.tsx` | estática | listar y filtrar órdenes de compra |
| `ORIGO-ROUTE-006` | `/purchase-orders/[id]` | `src/app/purchase-orders/[id]/page.tsx` | dinámica | mostrar detalle, documento, estado y acciones de una orden |
| `ORIGO-ROUTE-007` | `/purchase-orders/[id]/edit` | `src/app/purchase-orders/[id]/edit/page.tsx` | dinámica | editar una orden cuando el runtime la considera `draft` |
| `ORIGO-ROUTE-008` | `/purchase-orders/new` | `src/app/purchase-orders/new/page.tsx` | estática | preparar y crear una nueva orden |

Reconciliación:

```text
PÁGINAS DE COMPRA ESPERADAS: 4
PÁGINAS DE COMPRA MATERIALIZADAS: 4
PATRONES ESTÁTICOS: 2
PATRONES DINÁMICOS: 2
DUPLICADOS DE PATRÓN: 0
DUPLICADOS DE ARCHIVO: 0
```

Los query parameters no crean vistas adicionales.

---

#### 7. Superficie técnica de documento de compra

Existe además una superficie técnica separada:

| Identidad | Patrón | Archivo | Método | Naturaleza |
| --- | --- | --- | --- | --- |
| `ORIGO-HANDLER-001` | `/purchase-orders/[id]/pdf` | `src/app/purchase-orders/[id]/pdf/route.ts` | `GET` | generación/entrega de PDF de orden |

Reglas del inventario:

1. el handler no se contabiliza como pantalla;
2. su patrón dinámico no crea una quinta página de compras;
3. la autorización del documento se evalúa separadamente de la visibilidad de las páginas;
4. el uso posterior de un cliente privilegiado no convierte el endpoint en una vista administrativa;
5. su seguridad material se conserva como obligación de `ORIGO-AUTH-010` y contratos transversales aplicables.

Resultado total de superficies de compra de esta tarea:

```text
4 PÁGINAS
+
1 HANDLER TÉCNICO
=
5 SUPERFICIES AS-IS INVENTARIADAS
```

---

#### 8. Vista AS-IS — listado de órdenes

`ORIGO-ROUTE-005 /purchase-orders` observa actualmente:

- acceso de aplicación mediante `requireAppAccess({ appId: "origo" })`;
- lectura de `purchase_orders`;
- relaciones de proveedor y sede;
- orden descendente por creación;
- filtros opcionales por `status` y `site_id`;
- carga de `employee_sites` para construir el selector de sedes del usuario;
- estados visibles `draft`, `sent` y `received`;
- total y moneda;
- acceso al detalle;
- acceso visual a “Nueva orden”.

El inventario no interpreta el selector de sede como frontera de autorización. La suficiencia del filtrado territorial y de RLS permanece pendiente de `ORIGO-AUTH-004`, `ORIGO-AUTH-009` y sus materializaciones posteriores.

---

#### 9. Vista AS-IS — creación de orden

`ORIGO-ROUTE-008 /purchase-orders/new` observa actualmente:

- acceso de aplicación ORIGO;
- proveedores activos;
- sedes activamente relacionadas con el empleado;
- productos activos de tipo `insumo` vinculados al proveedor;
- presentaciones manuales activas de producto;
- conversiones hacia unidad de stock;
- costo de línea;
- fecha esperada y notas;
- soporte de `prefill` codificado para precargar datos;
- envío mediante `createPurchaseOrder`.

La carga de datos necesarios para construir el formulario no concede por sí misma permiso de creación. La autoridad exacta de crear queda reservada a `ORIGO-AUTH-005`.

---

#### 10. Vista AS-IS — detalle de orden

`ORIGO-ROUTE-006 /purchase-orders/[id]` observa actualmente:

- acceso general a ORIGO;
- carga de cabecera y líneas por `id`;
- proveedor, sede, cantidades, costos y estado;
- estado de recepción por línea;
- alias de producto por proveedor;
- documento PDF con token;
- mensaje preparado para proveedor;
- acción de marcar como enviada;
- acceso a recepción cuando el estado observado lo permite;
- borrado visible de borradores únicamente para un subconjunto local de roles;
- navegación a edición mientras el runtime mantiene el estado `draft`.

Conocer el identificador de la orden, abrir el detalle o ver un botón no crea relación autorizada con el recurso ni concede la mutación correspondiente.

---

#### 11. Vista AS-IS — edición de orden

`ORIGO-ROUTE-007 /purchase-orders/[id]/edit` observa actualmente:

- acceso general a ORIGO;
- carga de la orden por identificador;
- bloqueo de la vista cuando `status != draft`;
- carga de líneas actuales;
- proveedores activos;
- sedes activas del empleado;
- relaciones producto-proveedor;
- presentaciones de producto;
- envío mediante `updatePurchaseOrder`.

La restricción visual a `draft` se registra como evidencia de estado observada. No demuestra por sí sola que la mutación esté protegida contra un caller directo, otro actor, otra sede, otra versión o una carrera concurrente.

---

#### 12. Acciones server-side asociadas a compras

El inventario técnico vigente confirma exactamente cuatro acciones en `src/app/purchase-orders/actions.ts`:

| Acción | Intención observada | Efecto principal observado |
| --- | --- | --- |
| `createPurchaseOrder` | crear orden | crea cabecera `draft`, líneas y total |
| `setPurchaseOrderSent` | marcar enviada | cambia `draft → sent` cuando coincide el estado |
| `updatePurchaseOrder` | editar borrador | sustituye cabecera/líneas y recalcula total |
| `deletePurchaseOrder` | eliminar borrador | elimina líneas y cabecera si la orden sigue `draft` |

Estas acciones se registran por nombre y archivo fuente; esta tarea no les asigna una nueva identidad física ni modifica su implementación.

---

#### 13. Fronteras observadas en `createPurchaseOrder`

La acción observa:

- sesión Supabase con usuario autenticado;
- proveedor y sede obligatorios;
- al menos una línea válida;
- producto activo de tipo `insumo`;
- presentación activa perteneciente al producto;
- relación producto-proveedor;
- conversión a unidad de stock;
- creación inicial con `status = draft`;
- cálculo posterior del total.

No se observa dentro de la propia acción una llamada explícita a la capacidad canónica exacta de creación de orden. Esta observación **no concluye** que RLS, políticas de base de datos u otra capa sean insuficientes; únicamente impide considerar demostrada la autorización canónica completa desde esta evidencia.

Owner de la decisión posterior:

```text
ORIGO-AUTH-005 — Definir permisos de creación
ORIGO-AUTH-009 — Limitar órdenes por sede o centro de costo
```

---

#### 14. Fronteras observadas en `setPurchaseOrderSent`

La acción intenta exclusivamente:

```text
draft
→ sent
```

mediante una actualización condicionada por `id` y estado de origen.

No se observa dentro de la función una comprobación explícita del permiso canónico de aprobación/emisión, del territorio, de la versión lógica aprobada ni de una política de segregación.

Esto no autoriza afirmar que la operación sea explotable ni que RLS esté ausente. El resultado documental es:

```text
TRANSICIÓN AS-IS OBSERVADA
+
CAPACIDAD CANÓNICA EXPLÍCITA EN LA FUNCIÓN: NO DEMOSTRADA
→ REQUIERE RECONCILIACIÓN POSTERIOR
```

Owners:

```text
ORIGO-AUTH-006 — Definir permisos de aprobación
ORIGO-AUTH-009 — Limitar órdenes por sede o centro de costo
ORIGO-UX-008 — Diseñar aprobación y rechazo
```

---

#### 15. Fronteras observadas en `updatePurchaseOrder`

La acción:

1. consulta el estado actual;
2. rechaza edición cuando el estado no es `draft`;
3. valida proveedor y sede presentes;
4. reconstruye líneas con controles de producto, presentación y proveedor;
5. actualiza cabecera;
6. elimina las líneas existentes;
7. inserta las líneas nuevas;
8. recalcula el total.

La secuencia demuestra una mutación compuesta. El inventario no declara atomicidad, idempotencia, control de versión o protección territorial suficientes porque esas propiedades no quedan demostradas por la lectura de la función.

Owners posteriores:

```text
ORIGO-AUTH-008 — Definir permisos de corrección
ORIGO-AUTH-009 — Limitar órdenes por sede o centro de costo
ORIGO-AUTH-010 — Proteger precios y datos sensibles
ORIGO-UX-007 — Diseñar creación de orden de compra
```

---

#### 16. Fronteras observadas en `deletePurchaseOrder`

La acción exige:

- usuario autenticado;
- rol leído desde `employees.role`;
- pertenencia del rol a una lista local de eliminación;
- orden existente;
- estado `draft`;
- borrado de líneas antes del borrado de cabecera.

La lista local observada comprende equivalentes textuales de propietario y gerencia. Esa comprobación se registra como comportamiento AS-IS, no como contrato canónico aprobado.

Regla del inventario:

```text
LISTA LOCAL DE ROLES
!=
AUTORIZACIÓN CANÓNICA FINAL
```

La reconciliación de eliminación/corrección queda en `ORIGO-AUTH-008` y en el modelo transversal de autorización.

---

#### 17. Vocabulario AS-IS de estados de orden

Las vistas inspeccionadas utilizan el siguiente vocabulario reducido:

```text
draft
sent
received
```

Semántica observada:

| Estado AS-IS | Uso observado |
| --- | --- |
| `draft` | orden editable y elegible para marcarse enviada; puede mostrarse opción de borrado |
| `sent` | orden enviada; puede conducir a recepción |
| `received` | orden mostrada como recibida; continúa consultable |

Estos literales describen el runtime actual. No sustituyen los estados canónicos de `VPROC-0021`.

---

#### 18. Lifecycle canónico de compra que debe preservarse

El proceso canónico `VPROC-0021 — Aprobar y emitir compras separando flujo ordinario, urgencia y excepción` mantiene la secuencia normal:

```text
VPROC-0021.PURCHASE_REQUEST_PENDING_APPROVAL
→ VPROC-0021.UNDER_REVIEW
→ VPROC-0021.PENDING_APPROVAL
→ VPROC-0021.APPROVED
→ VPROC-0021.ORDER_PREPARING
→ VPROC-0021.ORDER_ISSUED
→ VPROC-0021.SUPPLIER_ACK_PENDING
→ VPROC-0021.PURCHASE_COMMITMENT_FORMALIZED
```

La tarea no colapsa esos estados para hacerlos coincidir con `draft/sent/received`.

---

#### 19. Reconciliación de estados AS-IS versus contrato objetivo

| Hecho | AS-IS observado | Contrato canónico | Resultado del inventario |
| --- | --- | --- | --- |
| preparación de compra | `draft` | estados de solicitud, revisión, aprobación y preparación diferenciados | `AS_IS_COLLAPSED` |
| aprobación | no existe una superficie/estado AS-IS separado demostrado en el conjunto de compras inspeccionado | `PENDING_APPROVAL → APPROVED` | `NO_DEDICATED_SURFACE_OBSERVED` |
| emisión | `draft → sent` | `ORDER_PREPARING → ORDER_ISSUED` después de autorización | `AS_IS_PARTIAL` |
| acuse del proveedor | no existe estado AS-IS separado demostrado | `SUPPLIER_ACK_PENDING` y formalización posterior | `NO_DEDICATED_SURFACE_OBSERVED` |
| recepción | `received` dentro de la orden | proceso de recepción `VPROC-0022` independiente | `AS_IS_COLLAPSED` respecto del resumen de orden |

Las etiquetas anteriores son vocabulario documental de inventario. No son enums persistidos ni estados empresariales nuevos.

---

#### 20. Pantallas canónicas ORIGO relacionadas con compras

El catálogo objetivo de ORIGO contiene catorce pantallas. Para el alcance primario de compras de esta tarea son relevantes:

| Pantalla | Nombre | Proceso | Relación con el inventario actual |
| --- | --- | --- | --- |
| `VSCREEN-0068` | Bandeja de necesidades de compra | `VPROC-0019` | no existe una ruta dedicada equivalente observada |
| `VSCREEN-0069` | Solicitud de compra | `VPROC-0019` | no existe una ruta dedicada equivalente observada |
| `VSCREEN-0072` | Comparación de cotizaciones | `VPROC-0020` | no existe una ruta dedicada equivalente observada |
| `VSCREEN-0073` | Editor de orden de compra | `VPROC-0021` | parcialmente representada por `/purchase-orders/new` y `/purchase-orders/[id]/edit` |
| `VSCREEN-0074` | Bandeja de aprobaciones de compra | `VPROC-0021` | no existe una ruta dedicada equivalente observada |
| `VSCREEN-0075` | Detalle y seguimiento de orden | `VPROC-0021` | parcialmente representada por `/purchase-orders` y `/purchase-orders/[id]` |
| `VSCREEN-0079` | Historial y auditoría de abastecimiento | `VPROC-0022` | no existe una vista dedicada de auditoría completa dentro del conjunto inspeccionado |

Las pantallas de proveedores `VSCREEN-0070`, `VSCREEN-0071`, `VSCREEN-0145`, `VSCREEN-0146` quedan reservadas a `ORIGO-AUTH-002` y tareas posteriores.

Las pantallas de recepción `VSCREEN-0076..0078` quedan reservadas a `ORIGO-AUTH-003` y tareas posteriores.

---

#### 21. Clasificación consolidada de cobertura de vistas de compra

| Contrato objetivo | Cobertura AS-IS | Clasificación | Owner posterior |
| --- | --- | --- | --- |
| necesidades de compra | no dedicada | `NO_DEDICATED_SURFACE_OBSERVED` | `ORIGO-UX-001`, `ORIGO-UX-003` |
| solicitud de compra | no dedicada | `NO_DEDICATED_SURFACE_OBSERVED` | `ORIGO-UX-001`, `ORIGO-UX-002`, `ORIGO-UX-003` |
| comparación de cotizaciones | no dedicada | `NO_DEDICATED_SURFACE_OBSERVED` | `ORIGO-UX-001`, `ORIGO-UX-004` |
| editor de orden | nueva + edición de borrador | `AS_IS_PARTIAL` | `ORIGO-AUTH-005`, `ORIGO-AUTH-008`, `ORIGO-UX-007` |
| aprobación/rechazo | acción simplificada de envío, sin superficie dedicada de aprobación demostrada | `AS_IS_PARTIAL` + `AS_IS_COLLAPSED` | `ORIGO-AUTH-006`, `ORIGO-UX-008` |
| detalle y seguimiento | listado + detalle | `AS_IS_PARTIAL` | `ORIGO-AUTH-004`, `ORIGO-AUTH-009`, `ORIGO-UX-004`, `ORIGO-UX-005` |
| documento al proveedor | handler PDF + mensaje | `AS_IS_REAL` para generación técnica del documento, no para cierre empresarial de emisión | `ORIGO-AUTH-010`, `ORIGO-UX-007`, `ORIGO-UX-008` |
| historial/auditoría integral | no dedicada | `NO_DEDICATED_SURFACE_OBSERVED` | `ORIGO-UX-001`, `ORIGO-UX-016` |

No se crea una pantalla canónica nueva para cubrir brechas AS-IS. Se reutilizan las identidades ya aprobadas.

---

#### 22. Permisos canónicos que intersectan el inventario

El catálogo canónico vigente conserva, entre otros:

```text
origo.access
origo.procurement.purchase_orders.view
```

Reglas relevantes:

1. `origo.access` permite entrar a ORIGO y no concede por sí solo acceso a órdenes o acciones internas;
2. `origo.procurement.purchase_orders.view` gobierna consulta de `PURCHASE_ORDER` bajo alcance y relación autorizados;
3. conocer `purchase_order_id` no concede lectura;
4. el comprador se considera relación con la orden, no propietario con autoridad universal;
5. una orden multidestino puede requerir visibilidad autorizada sobre cada destino expuesto;
6. las mutaciones necesitan capacidades más específicas que la mera lectura.

`ORIGO-AUTH-001` inventaría dónde se necesitan esas decisiones; no define todavía el permiso final de cada acción.

---

#### 23. Normalización de permisos observados

El sincronizador de navegación del consumidor utiliza para `purchase-orders` la sugerencia legacy:

```text
origo.procurement.purchase_orders
```

El catálogo canónico la reconcilia como:

```text
origo.procurement.purchase_orders
→ RENAME
→ origo.procurement.purchase_orders.view
```

Consecuencias:

- el valor escrito por sincronización se conserva como evidencia de runtime;
- no se trata como autoridad canónica final;
- no se crea un alias autorizante nuevo;
- `ORIGO-AUTH-004` deberá resolver consulta usando el permiso canónico vigente;
- las mutaciones no pueden heredar automáticamente la capacidad de lectura.

---

#### 24. Frontera de territorio y sede

Las vistas actuales muestran o reciben `site_id` y consultan `employee_sites` en varios puntos.

La evidencia permite afirmar:

```text
SEDE ESTÁ PRESENTE EN EL FLUJO AS-IS
```

No permite afirmar:

```text
SEDE ESTÁ AUTORIZADA PARA CADA RECURSO Y ACCIÓN
```

El contrato canónico exige que la resolución territorial de una orden considere el recurso `PURCHASE_ORDER`, sus destinos, áreas relacionadas y alcance aplicable.

Owner:

```text
ORIGO-AUTH-009 — Limitar órdenes por sede o centro de costo
```

---

#### 25. Dependencias de proveedor, producto y presentación

La creación/edición AS-IS utiliza:

- `suppliers`;
- `product_suppliers`;
- `products`;
- `product_uom_profiles`;
- producto activo;
- `product_type = insumo`;
- presentación activa y perteneciente al producto;
- relación con proveedor;
- conversión a unidad de stock.

Estas dependencias no transfieren ownership:

```text
ORDEN DE COMPRA
→ ORIGO

IDENTIDAD / CONDICIÓN DE PROVEEDOR
→ CONTRATO DE PROVEEDORES ORIGO

PRODUCTO / PRESENTACIÓN / UNIDAD CANÓNICA
→ FUENTE MAESTRA CORRESPONDIENTE

STOCK / LOC / MOVIMIENTO FÍSICO
→ NEXO
```

`ORIGO-AUTH-001` registra las relaciones necesarias para la compra sin inventar autoridad para modificar los dominios dependientes.

---

#### 26. Datos sensibles observados en la experiencia de compra

Las superficies de compra exponen o procesan, según contexto:

- proveedor;
- sede;
- productos y presentaciones;
- cantidades;
- costo unitario;
- total;
- moneda;
- fecha esperada;
- notas;
- estado;
- cantidades recibidas;
- documento PDF para proveedor.

La presencia de precios, totales y condiciones requiere separación futura entre quien puede ver, preparar, aprobar, emitir y recibir.

Owner principal:

```text
ORIGO-AUTH-010 — Proteger precios y datos sensibles
```

---

#### 27. Inventario del documento PDF y token externo

El handler de PDF admite dos carriles observados:

```text
TOKEN FIRMADO VÁLIDO PARA LA ORDEN
OR
SESIÓN AUTENTICADA + origo.access
```

Cuando el token externo es válido, el handler utiliza un cliente privilegiado para recuperar la proyección necesaria del documento.

El helper de token observado define:

```text
vigencia máxima = 30 días
```

y contiene un fallback literal cuando falta `PURCHASE_ORDER_PDF_SECRET`.

El registro vigente ya exige que el documento externo use un token obligatorio, scoped, de corta duración, revocable y generado con un secreto sin fallback. Por tanto, el fallback observado se registra como deuda conocida y **no** se convierte en comportamiento aprobado.

Owner:

```text
ORIGO-AUTH-010 — Proteger precios y datos sensibles
```

Esta tarea no modifica secretos ni el runtime.

---

#### 28. Matriz de autorización observada por superficie

| Superficie | Guard/punto de control observado | Capacidad canónica exacta demostrada en la superficie | Resultado documental |
| --- | --- | --- | --- |
| `/purchase-orders` | `requireAppAccess(origo)` | no demostrada para lectura de órdenes | reconciliar en `ORIGO-AUTH-004` |
| `/purchase-orders/new` | `requireAppAccess(origo)` | no demostrada para creación | reconciliar en `ORIGO-AUTH-005` |
| `/purchase-orders/[id]` | `requireAppAccess(origo)` | no demostrada para cada lectura/acción del recurso | reconciliar en `ORIGO-AUTH-004..010` |
| `/purchase-orders/[id]/edit` | `requireAppAccess(origo)` + estado `draft` en página | no demostrada para corrección/edición | reconciliar en `ORIGO-AUTH-008..010` |
| `createPurchaseOrder` | usuario autenticado + validaciones de datos | capacidad canónica de creación no demostrada dentro de la acción | reconciliar en `ORIGO-AUTH-005` |
| `setPurchaseOrderSent` | estado origen `draft` | capacidad canónica de aprobación/emisión no demostrada dentro de la acción | reconciliar en `ORIGO-AUTH-006` |
| `updatePurchaseOrder` | estado `draft` | capacidad canónica de actualización no demostrada dentro de la acción | reconciliar en `ORIGO-AUTH-008` |
| `deletePurchaseOrder` | usuario + lista local de roles + `draft` | autorización canónica final no demostrada | reconciliar en `ORIGO-AUTH-008` |
| PDF interno | sesión + `origo.access` | acceso de aplicación observado | revisar minimización en `ORIGO-AUTH-010` |
| PDF externo | token firmado | token validado antes de cliente privilegiado | endurecer contrato en `ORIGO-AUTH-010` |

“no demostrada” significa evidencia insuficiente en la superficie inspeccionada, no afirmación de ausencia de RLS u otros controles posteriores.

---

#### 29. Matriz de brechas y propietarios

| Brecha | Riesgo contractual | Propietario exacto | Condición de salida |
| --- | --- | --- | --- |
| páginas de órdenes protegidas principalmente por acceso general de aplicación | lectura más amplia que la capacidad específica si ninguna otra capa restringe el recurso | `ORIGO-AUTH-004` | permiso de consulta y recurso quedan definidos y verificables |
| creación sin capacidad canónica explícita demostrada dentro de la acción | creación fuera de política si la capa autoritativa no la bloquea | `ORIGO-AUTH-005` | capacidad de creación, alcance, estado y recurso quedan definidos |
| `draft → sent` no representa por sí sola aprobación canónica | emisión sin decisión o versión autorizada | `ORIGO-AUTH-006`; `ORIGO-UX-008` | aprobación/rechazo y emisión quedan separados y protegidos |
| recepción visible desde detalle de orden | confusión entre compromiso comercial y recepción física | `ORIGO-AUTH-007`; `ORIGO-AUTH-003`; `ORIGO-UX-009..014` | recepción queda protegida como proceso independiente |
| edición/borrado con estado y lista local de roles | corrección destructiva o autorización divergente | `ORIGO-AUTH-008` | capacidades de corrección quedan definidas y fail-closed |
| filtros y `site_id` presentes sin demostrar territorio completo del recurso | IDOR o cruce territorial si una capa posterior no lo impide | `ORIGO-AUTH-009` | política por sede/centro de costo/recurso queda definida |
| precios y PDF comparten superficies con otros datos | exposición de información sensible | `ORIGO-AUTH-010` | proyección y acceso sensible quedan protegidos |
| fallback literal del secreto PDF | firma predecible si ese fallback alcanzara un ambiente no permitido | `ORIGO-AUTH-010` | secreto obligatorio sin fallback y política de token quedan materializados |
| lifecycle AS-IS `draft/sent/received` colapsa fases canónicas | aprobación, emisión y recepción ambiguas | `ORIGO-UX-001`, `ORIGO-UX-002`, `ORIGO-UX-007`, `ORIGO-UX-008` | prototipo objetivo representa estados y decisiones separadas |
| faltan superficies dedicadas de necesidad, solicitud, cotización y aprobación | flujo incompleto en experiencia | `ORIGO-UX-001..008` | diseño objetivo materializa o asigna cada responsabilidad |

Ninguna brecha queda sin owner ni condición de salida.

---

#### 30. Cobertura de tareas siguientes del mini-bloque

El inventario entrega las siguientes fronteras sin desarrollarlas:

```text
ORIGO-AUTH-002
→ proveedores

ORIGO-AUTH-003
→ recepción

ORIGO-AUTH-004
→ consulta

ORIGO-AUTH-005
→ creación

ORIGO-AUTH-006
→ aprobación

ORIGO-AUTH-007
→ recepción protegida

ORIGO-AUTH-008
→ corrección

ORIGO-AUTH-009
→ sede / centro de costo

ORIGO-AUTH-010
→ precios / datos sensibles / documento externo
```

`ORIGO-AUTH-001` no absorbe las decisiones reservadas a esas tareas.

---

#### 31. Reconciliación de cardinalidad

El inventario materializa exactamente:

```text
PÁGINAS DE COMPRA AS-IS: 4/4
HANDLERS DE COMPRA AS-IS: 1/1
SERVER ACTIONS DE COMPRA CONFIRMADAS: 4/4
PANTALLAS CANÓNICAS ORIGO TOTALES: 14
PANTALLAS CANÓNICAS DIRECTAMENTE RELACIONADAS CON CICLO DE COMPRA INVENTARIADAS AQUÍ: 7
DUPLICADOS DE PÁGINA: 0
DUPLICADOS DE HANDLER: 0
DUPLICADOS DE ACCIÓN POR NOMBRE+FUENTE: 0
```

Las catorce pantallas ORIGO completas permanecen en el catálogo; esta tarea solo clasifica el subconjunto material para compras y reserva proveedores/recepción a sus owners inmediatos.

---

#### 32. Estado resultante del inventario

El estado AS-IS puede expresarse sin ampliar el contrato:

```text
COMPRAS ORIGO EXISTEN EN RUNTIME
+
CREACIÓN REAL DE ÓRDENES EXISTE
+
EDICIÓN DE BORRADORES EXISTE
+
ENVÍO SIMPLIFICADO EXISTE
+
DOCUMENTO PDF EXISTE

PERO

CICLO CANÓNICO COMPLETO DE NECESIDAD
→ SOLICITUD
→ ABASTECIMIENTO
→ APROBACIÓN
→ EMISIÓN
→ ACUSE
→ RECEPCIÓN
NO ESTÁ REPRESENTADO COMO UN ÚNICO WORKFLOW COMPLETO Y DIFERENCIADO
```

La conclusión no degrada lo que ya funciona ni declara completo lo que solo existe parcialmente.

---

#### 33. Requisitos de prueba derivados

**Resultado:** NO GENERA REQUISITOS DE PRUEBA

**Requisitos creados:** 0
**Requisitos modificados:** 0
**Requisitos diferidos:** 0
**Requisitos obsoletos:** 0
**Fragmentos del Registro 04A afectados:** 0

**Justificación:** esta tarea reconcilia superficies, acciones y brechas ya cubiertas por requisitos vigentes de ORIGO, autorización, UX e integración. No introduce una regla empresarial nueva, un permiso nuevo, una transición nueva, un algoritmo nuevo ni una obligación de seguridad nueva.

---

#### 34. Cobertura de prueba vigente reutilizada

Sin modificar el Registro 04A, esta tarea reutiliza:

- `TREQ-ORIGO-002` para autorización de órdenes y documentos externos;
- `TREQ-ORIGO-004` para separación de necesidad, solicitud, selección, aprobación, orden y revisión;
- `TREQ-ORIGO-006` a `TREQ-ORIGO-025` para exhaustividad del inventario, identidades de rutas, handler, guards, token, drift y acceso directo;
- `TREQ-AUTH-001` para autorización por permisos, contexto y alcance canónicos;
- `TREQ-AUTH-004` para decisiones equivalentes entre evaluadores;
- `TREQ-AUTH-010` para segregación de funciones;
- `TREQ-AUTH-013` para protección server-side de superficies protegidas;
- `TREQ-AUTH-015` para evidencia correlacionable;
- requisitos transversales de integración e idempotencia ya registrados cuando las acciones produzcan efectos distribuibles.

Esta sección es únicamente trazabilidad de cobertura existente.

---

#### 35. Evidencia de validación

| Clase | Estado | Evidencia |
| --- | --- | --- |
| BUILD | `NOT_EXECUTED` | La compilación documental se ejecutará después de incorporar la tarea en su archivo propietario. |
| LOCAL | `NOT_EXECUTED` | No se ejecutaron validadores del checkout del usuario durante la preparación anticipada del artefacto. |
| REMOTA | `PASS` | Se verificaron `vento-shell/main`, `vento-origo/main`, el archivo propietario, topología, inventario de rutas aprobado, catálogo de pantallas/permisos/recursos, Registro 04A y código actual de las superficies de compra. |
| OPERATIVA | `NOT_EXECUTED` | No se creó, editó, envió, eliminó ni recibió una orden real; no se ejecutó login, RLS, RPC ni flujo de compra desplegado. |
| FÍSICA | `NOT_APPLICABLE` | `ORIGO-AUTH-001` es `DEFINE_ONCE / NO_PHYSICAL_INSTANCE`; no existe una unidad física propia que certificar. |

---

#### 36. Criterios de aceptación

- [x] La tarea mantiene exactamente `ORIGO-AUTH-001 — Inventariar vistas de compras`.
- [x] La continuidad recibida de FOGO se limita a la transición documental entre bloques.
- [x] La topología se conserva como `DEFINE_ONCE / NO_PHYSICAL_INSTANCE`.
- [x] Se fijaron snapshots verificables de `vento-shell` y `vento-origo`.
- [x] Se separaron compras, proveedores, recepción, catálogo y acceso.
- [x] Se reconciliaron cuatro páginas de `purchase-orders` sin duplicados.
- [x] Se separó un handler PDF técnico de las páginas.
- [x] Se inventariaron cuatro Server Actions de compra por nombre y fuente.
- [x] Se distinguió guard de aplicación de capacidad específica de recurso.
- [x] No se afirmó ausencia de RLS ni vulnerabilidad únicamente por falta de check explícito en una función.
- [x] Se documentó el vocabulario AS-IS `draft/sent/received` sin sustituir el lifecycle canónico.
- [x] Se preservaron los ocho estados normales de `VPROC-0021`.
- [x] Se reconciliaron las pantallas canónicas de necesidad, solicitud, cotización, edición, aprobación, seguimiento y auditoría.
- [x] Se preservó la separación de pantallas de proveedores para `ORIGO-AUTH-002`.
- [x] Se preservó la separación de pantallas de recepción para `ORIGO-AUTH-003`.
- [x] Se distinguió el permiso legacy sugerido por navegación del permiso canónico de consulta.
- [x] Se registró sede como dato observado sin convertirla en autorización territorial demostrada.
- [x] Se registraron precios y documento PDF como datos sensibles sujetos a tarea propietaria.
- [x] Se registró el fallback observado del secreto PDF como deuda ya cubierta, sin aprobarlo ni modificarlo.
- [x] Todas las brechas tienen propietario y condición de salida.
- [x] No se creó una pantalla, proceso, permiso, estado ni identificador nuevo.
- [x] No se creó ni modificó ningún requisito de prueba.
- [x] No se modifica Registro 04A.
- [x] No se autoriza cambio físico, Supabase, migración ni despliegue.
- [x] `ORIGO-AUTH-002` queda como siguiente tarea exacta y no se desarrolla aquí.

---

#### 37. Límites

Esta tarea no:

- diseña permisos definitivos de consulta;
- diseña permisos de creación;
- diseña permisos de aprobación;
- diseña permisos de recepción;
- diseña permisos de corrección;
- cambia roles o matrices;
- autoriza compras reales;
- aprueba o rechaza compras;
- crea, edita, envía o elimina órdenes reales;
- crea o modifica proveedores;
- registra recepciones;
- mueve inventario;
- cambia precios;
- cambia el handler PDF;
- cambia el secreto del PDF;
- ejecuta `sync-navigation`;
- cambia rutas o menú;
- modifica `vento-origo`;
- modifica Supabase;
- crea migraciones, RLS, RPC, funciones, triggers o datos;
- corrige atomicidad, idempotencia o concurrencia;
- declara una vulnerabilidad explotable no demostrada;
- declara que la existencia de RLS o permisos runtime ya satisface el contrato canónico;
- diseña todavía la UX final de compras;
- desarrolla `ORIGO-AUTH-002`.

---

#### 38. Continuidad

**ÚLTIMA TAREA APROBADA**
`FOGO-UX-015 — Validar el prototipo por área productiva`

**TAREA ACTUAL APROBADA**
`ORIGO-AUTH-001 — Inventariar vistas de compras`

**SIGUIENTE TAREA RESERVADA**
`ORIGO-AUTH-002 — Inventariar vistas de proveedores`

### ✅ ORIGO-AUTH-002 — Inventariar vistas de proveedores

**Estado:** APROBADA
**Tarea anterior:** ORIGO-AUTH-001 — Inventariar vistas de compras
**Tarea siguiente:** ORIGO-AUTH-003 — Inventariar vistas de recepción
**Tipo de tarea:** documental; inventario AS-IS/canónico de las vistas, rutas, acciones, datos, permisos observados, relaciones y brechas asociadas al maestro de proveedores en ORIGO, con reconciliación contra pantallas canónicas, recurso `SUPPLIER`, capacidades normalizadas y propietarios posteriores; `DEFINE_ONCE` / `NO_PHYSICAL_INSTANCE`
**Bloque:** BLOQUE M — ORIGO
**Repositorio propietario:** `vento-group-sas/vento-shell`
**Archivo propietario:** `docs/plan-canonico/modular/bloques/M_ORIGO/01_AUTORIZACION_DE_COMPRAS.md`
**Estado físico resultante:** `NO_PHYSICAL_INSTANCE`
**Cambios físicos autorizados:** ninguno; esta tarea no modifica código, rutas, navegación, proveedores reales, órdenes, permisos, roles, datos, Supabase, migraciones, RLS, RPC, Storage, contratos, precios, documentos ni despliegues
**Requisitos de prueba creados o modificados:** 0

---

#### 1. Propósito

Inventariar de forma cerrada y verificable las superficies de ORIGO que hoy permiten consultar, crear, editar, activar, desactivar o eliminar información de proveedores, y reconciliarlas contra el catálogo canónico de pantallas, procesos, permisos, recursos y requisitos vigentes sin convertir la existencia de una página, un helper o una lista local de roles en autorización suficiente.

La regla de lectura del inventario queda:

```text
PATRÓN URL AS-IS
!=
PANTALLA CANÓNICA
!=
PERMISO CANÓNICO
!=
RECURSO AUTORIZADO
!=
PROCESO COMPLETO
```

La tarea fija el universo de proveedor que `ORIGO-AUTH-004`, `ORIGO-AUTH-005`, `ORIGO-AUTH-008`, `ORIGO-AUTH-010` y la experiencia ORIGO posterior deberán proteger o consumir. No redefine compras, recepción ni la autorización final de mutaciones.

---

#### 2. Frontera recibida de ORIGO-AUTH-001

`ORIGO-AUTH-001` reservó expresamente para esta tarea las superficies de proveedor y excluyó `/suppliers*` de su universo propietario de órdenes.

El handoff conserva:

```text
ORIGO-AUTH-001
→ orden de compra, documento y relaciones de proveedor
→ ORIGO-AUTH-002
→ identidad, consulta y mantenimiento de proveedor
```

La tarea anterior dejó además separados:

- las dependencias de proveedor consumidas por órdenes;
- las pantallas canónicas `VSCREEN-0070`, `VSCREEN-0071`, `VSCREEN-0145` y `VSCREEN-0146`;
- la comparación de cotizaciones `VSCREEN-0072`, que permanece dentro del flujo de abastecimiento/compra y no se duplica aquí;
- las recepciones, reservadas a `ORIGO-AUTH-003`.

Por tanto, esta tarea inventaría la superficie de proveedor sin reabrir el inventario de órdenes ya aprobado.

---

#### 3. Naturaleza y topología

La reconciliación vigente del mini-bloque establece:

```text
ORIGO-AUTH-001..008
mode = DEFINE_ONCE
execution_gate = NO_PHYSICAL_INSTANCE
```

Consecuencias:

1. `ORIGO-AUTH-002` se define una sola vez como contrato documental;
2. no existe identidad física `ORIGO-AUTH-002::<implementation_unit_id>`;
3. esta tarea no implementa permisos, guards, RLS, RPC, Server Actions ni migraciones;
4. puede documentar divergencias del runtime, pero no corregirlas;
5. cualquier modificación de Supabase perteneciente a VENTO continuará versionándose y ejecutándose desde `vento-group-sas/vento-shell` bajo su propietario físico correspondiente;
6. las tareas posteriores consumen este inventario sin recontar las superficies aquí fijadas.

---

#### 4. Fuentes y snapshots verificados

La preparación documental se ancla a:

```text
vento-shell/main
ccd175938961c3957f4163559579e35313421448

vento-origo/main
70860f1ca5f0a4a73e894cbb840956f9f7eda2ad
```

Se contrastaron, como mínimo:

- mini-bloque `ORIGO-AUTH-001..015`;
- artefacto aprobado `ORIGO-AUTH-001` utilizado como predecesor documental;
- `AUTH-UI-003 — Inventariar todas las rutas de ORIGO`;
- catálogo canónico de aplicaciones, permisos, modalidades, scopes y recursos;
- catálogo canónico de procesos y pantallas;
- estados canónicos de `VPROC-0020`;
- Registro 04A, dominio ORIGO;
- páginas `src/app/suppliers/*` del consumidor;
- `src/app/suppliers/actions.ts`;
- `src/lib/suppliers.ts`;
- formulario guiado de proveedores;
- guard de aplicación y sincronizador de navegación de ORIGO.

El snapshot remoto de `vento-shell` aún no contiene la incorporación de `ORIGO-AUTH-001`; la preparación anticipada utiliza su artefacto completo aprobado como base y no simula su publicación.

---

#### 5. Definición exacta de “vistas de proveedores”

El universo propietario de esta tarea comprende superficies cuyo objeto primario es la identidad o ficha del proveedor:

```text
LISTADO / CATÁLOGO DE PROVEEDORES
ALTA DE PROVEEDOR
EDICIÓN DE PROVEEDOR
ESTADO ACTIVO / INACTIVO
CONDICIONES BÁSICAS OBSERVADAS EN LA FICHA
ACCIONES DE MANTENIMIENTO DEL PROVEEDOR
```

No se incorporan como vistas propietarias:

- `/purchase-orders*`, ya inventariadas por `ORIGO-AUTH-001`;
- `/receipts*`, reservadas a `ORIGO-AUTH-003`;
- `/product-master-review`, que pertenece a revisión de catálogo;
- `/login`, `/no-access` y `/`, que son superficies de acceso o entrada general;
- el PDF de orden, que pertenece a compras;
- `VSCREEN-0072 — Comparación de cotizaciones`, que participa en `VPROC-0020` pero fue conservada como superficie de abastecimiento/compra, no como ficha maestra de proveedor.

---

#### 6. Universo AS-IS de páginas de proveedor

El snapshot actual contiene exactamente tres archivos de página cuyo patrón pertenece a `suppliers`:

| Identidad de ruta | Patrón | Archivo fuente | Tipo | Función AS-IS primaria |
| --- | --- | --- | --- | --- |
| `ORIGO-ROUTE-011` | `/suppliers` | `src/app/suppliers/page.tsx` | estática | listar, buscar y filtrar proveedores; exponer mantenimiento cuando el helper lo permite |
| `ORIGO-ROUTE-012` | `/suppliers/[id]/edit` | `src/app/suppliers/[id]/edit/page.tsx` | dinámica | cargar y editar una ficha existente |
| `ORIGO-ROUTE-013` | `/suppliers/new` | `src/app/suppliers/new/page.tsx` | estática | crear una nueva ficha de proveedor |

Reconciliación:

```text
PÁGINAS DE PROVEEDOR ESPERADAS EN EL SNAPSHOT: 3
PÁGINAS DE PROVEEDOR MATERIALIZADAS: 3
PATRONES ESTÁTICOS: 2
PATRONES DINÁMICOS: 1
HANDLERS HTTP ESPECÍFICOS DE PROVEEDOR: 0
DUPLICADOS DE PATRÓN: 0
DUPLICADOS DE ARCHIVO: 0
```

Los filtros y query parameters no crean rutas adicionales.

---

#### 7. Vista AS-IS — catálogo `/suppliers`

`ORIGO-ROUTE-011` observa actualmente:

- acceso de aplicación mediante `requireAppAccess({ appId: "origo" })`;
- lectura de la tabla `suppliers`;
- orden alfabético por nombre;
- búsqueda local por nombre, contacto, email, NIT o condición de pago;
- filtro por estado activo/inactivo;
- filtro por modalidad `cash` o `credit`;
- conteos de total, activos, contado y crédito;
- visualización de nombre y NIT;
- contacto, teléfono y email;
- condición de pago y días de crédito;
- estado activo/inactivo;
- cálculo de `canManageSuppliers` para decidir si se muestran alta, edición y eliminación.

La consulta fuente carga además `address`, `notes`, `created_at` y `updated_at`, aunque no todos esos campos se presentan en la tabla principal.

---

#### 8. Vista AS-IS — alta `/suppliers/new`

`ORIGO-ROUTE-013` observa actualmente:

- acceso general a ORIGO;
- `requireCanManageSuppliers` antes de renderizar el formulario;
- formulario guiado de ficha comercial;
- creación mediante `createSupplier`;
- retorno al listado después de guardar.

La página no demuestra por sí sola la capacidad canónica atómica de creación. Registra el control observado y deja la decisión final a `ORIGO-AUTH-005`.

---

#### 9. Vista AS-IS — edición `/suppliers/[id]/edit`

`ORIGO-ROUTE-012` observa actualmente:

- acceso general a ORIGO;
- `requireCanManageSuppliers` antes de cargar la ficha;
- resolución del proveedor por `id`;
- tratamiento de proveedor inexistente;
- edición mediante el mismo formulario guiado;
- persistencia mediante `updateSupplier`.

Conocer el `supplier_id` o alcanzar la ruta dinámica no concede autoridad por sí mismo. La autorización final deberá resolverse sobre recurso y capacidad canónica.

---

#### 10. Campos AS-IS de la ficha de proveedor

La ficha materializada expone o persiste:

```text
name
tax_id
contact_name
phone
email
address
notes
is_active
payment_type
credit_days
created_at
updated_at
```

El formulario guiado permite editar:

- nombre o razón social;
- identificación tributaria;
- estado activo;
- contacto;
- teléfono;
- email;
- condición de contado o crédito;
- días de crédito;
- dirección;
- notas.

No se interpreta la presencia de esos campos como prueba de que el expediente canónico de proveedor esté completo.

---

#### 11. Server Actions de proveedor confirmadas

`src/app/suppliers/actions.ts` expone exactamente tres acciones invocables:

| Acción | Efecto AS-IS principal | Control observado |
| --- | --- | --- |
| `createSupplier` | insertar una fila en `suppliers` | usuario autenticado + `requireCanManageSuppliers` |
| `updateSupplier` | actualizar la fila por `id` | usuario autenticado + `requireCanManageSuppliers` |
| `deleteSupplier` | eliminar físicamente la fila si no existen órdenes vinculadas | usuario autenticado + `requireCanManageSuppliers` + comprobación de órdenes vinculadas |

Reconciliación:

```text
SERVER ACTIONS DE PROVEEDOR ESPERADAS EN EL SNAPSHOT: 3
SERVER ACTIONS CONFIRMADAS: 3
DUPLICADOS POR NOMBRE+FUENTE: 0
```

Los helpers internos de parseo y condiciones de pago no se contabilizan como Server Actions independientes.

---

#### 12. Helper de gestión observado

`src/lib/suppliers.ts` implementa actualmente:

```text
has_permission("origo.suppliers.manage")
OR
rol local ∈ {
  propietario,
  gerente_general,
  gerente
}
```

El resultado se reutiliza para:

- mostrar u ocultar acciones en el catálogo;
- permitir alta;
- permitir edición;
- permitir eliminación.

Este helper se registra como evidencia AS-IS. Esta tarea no lo aprueba como autorización canónica final.

---

#### 13. Normalización del permiso legacy

El catálogo canónico vigente establece:

```text
origo.suppliers.view
→ RENAME
→ origo.procurement.suppliers.view

origo.suppliers.manage
→ DECOMPOSE_REQUIRED
→ familia origo.procurement.suppliers.*
```

La familia de capacidades aprobada para descomposición contiene:

```text
origo.procurement.suppliers.view
origo.procurement.suppliers.create
origo.procurement.suppliers.update
origo.procurement.suppliers.activate
origo.procurement.suppliers.deactivate
```

Consecuencias documentales:

1. `origo.suppliers.manage` permanece evidencia legacy, no permiso final nuevo;
2. lectura y mutación no deben colapsarse en una capacidad monolítica;
3. crear, actualizar, activar y desactivar requieren capacidades distintas;
4. la lista local de roles no sustituye la matriz canónica;
5. la descomposición se define en las tareas posteriores propietarias, no en este inventario.

---

#### 14. Recurso canónico de proveedor

El catálogo de recursos define para consulta:

```text
permission = origo.procurement.suppliers.view
resource = SUPPLIER
locator = supplier_id o relación desde orden/recepción
territory = SUPPLIER_SCOPE
```

Reglas preservadas:

- un proveedor no es propiedad de `employee_sites`;
- el carril base puede consultar dentro del ámbito organizacional o de negocio autorizado;
- el carril operativo se limita al proveedor relacionado con el recurso activo;
- el territorio funciona como filtro relacional, no como propiedad de sede;
- la proyección operativa debe limitar campos a lo necesario;
- los datos sensibles requieren autorización adicional.

---

#### 15. Modalidad de consulta de proveedor

La capacidad de consulta está clasificada como:

```text
origo.procurement.suppliers.view
BASE_OR_OPERATIONAL
```

Prerrequisito observado en el catálogo:

```text
carril base: no requiere turno por esta capacidad
carril operativo: requiere T
```

Esto no implica que las mutaciones de proveedor hereden la misma modalidad. La tarea solo registra la modalidad aprobada de consulta y reserva creación/edición/estado para sus propietarios de autorización.

---

#### 16. Proyección administrativa versus operativa

La misma identidad de proveedor puede tener dos proyecciones legítimas sin duplicar el recurso:

```text
CARRIL BASE
→ directorio/expediente autorizado dentro del ámbito comercial

CARRIL OPERATIVO
→ proveedor relacionado con orden o recepción activa
→ proyección mínima necesaria
```

Queda prohibido inferir:

```text
TENER UNA SEDE ASIGNADA
→ SER DUEÑO DEL PROVEEDOR
```

También queda prohibido usar la falta de un filtro explícito de `employee_sites` en `/suppliers` como prueba automática de error territorial, porque el recurso canónico de proveedor es organizacional y relacional.

---

#### 17. Pantalla canónica `VSCREEN-0070`

Contrato vigente:

```text
VSCREEN-0070
Catálogo de proveedores
VPROC-0020
VPROC-0020::STEP-CONSULT_SUPPLIER_CATALOG
MONITOR / IN_PROGRESS
```

Propósito canónico:

- consultar proveedores;
- estados;
- categorías;
- condiciones;
- cobertura autorizada;
- presentar opciones aptas para comparación.

Relación AS-IS:

```text
/suppliers
→ representación material principal de VSCREEN-0070
→ cobertura parcial respecto del contrato objetivo completo
```

El runtime cubre identidad básica, contacto, estado y condición de pago, pero no demuestra por sí solo categorías completas, cobertura contractual ni proyección diferenciada por finalidad.

---

#### 18. Pantalla canónica `VSCREEN-0071`

Contrato vigente:

```text
VSCREEN-0071
Alta y expediente de proveedor
VPROC-0020
VPROC-0020::STEP-ONBOARD_SUPPLIER
CONFIGURE / IN_PROGRESS
```

También mantiene relación con `VPROC-0060` para identidad documental/externa aplicable.

Relación AS-IS:

```text
/suppliers/new
+
/suppliers/[id]/edit
→ materializan alta y mantenimiento básico de la ficha
```

Cobertura observada:

- identidad básica;
- identificación tributaria;
- contacto;
- dirección;
- estado;
- condición de pago básica;
- notas.

No se observa en esas páginas una superficie completa de documentos versionados, vigencias, expediente documental, cuentas bancarias gobernadas, contratos o historial de cambios de condiciones.

---

#### 19. Pantalla canónica `VSCREEN-0145`

Contrato vigente:

```text
VSCREEN-0145
Contratos, precios y condiciones de proveedor
VPROC-0020
VPROC-0020::STEP-GOVERN_SUPPLIER_TERMS
CONFIGURE / IN_PROGRESS
```

Debe versionar, según el contrato de pantalla:

- contratos;
- listas de precio;
- impuestos;
- fletes;
- mínimos;
- vigencias;
- condiciones autorizadas por proveedor.

El runtime inspeccionado únicamente conserva en la ficha:

```text
payment_type
credit_days
notes
```

Esto constituye una representación parcial de condiciones comerciales, no una implementación demostrada de `VSCREEN-0145`.

No se observó una ruta dedicada equivalente en el snapshot.

---

#### 20. Pantalla canónica `VSCREEN-0146`

Contrato vigente:

```text
VSCREEN-0146
Desempeño y reclamaciones de proveedor
VPROC-0020
VPROC-0020::STEP-REVIEW_SUPPLIER_PERFORMANCE
REVIEW / DECISION
```

Debe analizar cumplimiento desde hechos y gestionar reclamaciones, respuestas, compromisos y resolución con evidencia.

En las tres rutas `suppliers` inspeccionadas no se observó una superficie dedicada de:

- desempeño;
- cumplimiento histórico;
- reclamaciones;
- respuesta del proveedor;
- compromisos;
- resolución con evidencia.

La ausencia de una ruta dedicada se registra como brecha de experiencia; no se crea una pantalla nueva porque `VSCREEN-0146` ya existe en el catálogo canónico.

---

#### 21. Frontera con `VSCREEN-0072`

`VSCREEN-0072 — Comparación de cotizaciones` también pertenece a `VPROC-0020`, pero no se duplica dentro del universo de ficha de proveedor de esta tarea.

Se conserva la decisión de `ORIGO-AUTH-001`:

```text
VSCREEN-0072
→ abastecimiento / comparación para decidir compra
→ NO es una ruta maestra /suppliers* materializada en el snapshot
```

El catálogo de proveedor entrega información a la comparación, pero la comparación permanece una responsabilidad funcional diferente.

---

#### 22. Estados canónicos de `VPROC-0020`

El proceso de evaluación de abastecimiento asociado a las pantallas de proveedor conserva exactamente:

```text
VPROC-0020.SOURCING_CASE_OPENED
→ VPROC-0020.MARKET_REVIEW_IN_PROGRESS
→ VPROC-0020.QUOTES_PENDING
→ VPROC-0020.COMPARISON_IN_PROGRESS
→ VPROC-0020.RECOMMENDATION_PREPARED
→ VPROC-0020.DECISION_PENDING
→ VPROC-0020.SUPPLIER_SELECTED
→ VPROC-0020.SOURCING_DECISION_COMPLETED
```

La fila `suppliers.is_active` no sustituye este lifecycle.

Distinción obligatoria:

```text
ESTADO DEL MAESTRO DE PROVEEDOR
!=
ESTADO DEL CASO DE ABASTECIMIENTO
```

---

#### 23. Relación con órdenes de compra

El proveedor participa en órdenes mediante:

```text
purchase_orders.supplier_id
```

y la creación de órdenes consume proveedores activos.

Reglas del inventario:

- una orden puede referenciar un proveedor sin transferir ownership del proveedor a la orden;
- la autorización para consultar una orden no concede el directorio completo de proveedores;
- la autorización para consultar proveedor no concede crear o aprobar una orden;
- las condiciones utilizadas por una orden histórica no deben reinterpretarse desde una ficha actual mutable.

La última regla ya está cubierta por el contrato vigente de proveedor y se conserva para tareas posteriores.

---

#### 24. Relación producto–proveedor

El runtime de compras consume la tabla `product_suppliers` para validar qué productos están vinculados al proveedor y para alias comerciales.

Sin embargo, las páginas `/suppliers*` inspeccionadas no materializan un editor completo de esa relación.

Distinción obligatoria:

```text
SUPPLIER
!=
PRODUCT_SUPPLIER_RELATION
!=
OFFER / PRICE CONDITION
!=
PURCHASE_ORDER
```

Esta tarea no reasigna ownership del maestro de producto ni de presentaciones.

---

#### 25. Sensibilidad y minimización

El catálogo clasifica `origo.procurement.suppliers.view` bajo confidencialidad comercial.

La superficie AS-IS procesa o carga, según ruta:

- identificación tributaria;
- contacto;
- teléfono;
- email;
- dirección;
- notas;
- condiciones de pago;
- días de crédito;
- estado;
- timestamps.

El Registro 04A vigente protege además datos contractuales, bancarios y precios sensibles aunque no estén materializados en estas tres páginas.

Owner de la política de protección:

```text
ORIGO-AUTH-010 — Proteger precios y datos sensibles
```

Este inventario no define field masks definitivos ni expone datos adicionales.

---

#### 26. Eliminación física observada y estado canónico

`deleteSupplier` ejecuta actualmente una eliminación física cuando:

1. existe `supplier_id`;
2. el actor pasa `requireCanManageSuppliers`;
3. no existen órdenes vinculadas al proveedor.

El catálogo canónico de capacidades, en cambio, descompone el mantenimiento en:

```text
create
update
activate
deactivate
```

sin declarar aquí una capacidad canónica `delete`.

Conclusión documental:

```text
DELETE AS-IS OBSERVADO
!=
PERMISO CANÓNICO DE BORRADO APROBADO
```

La política de corrección, retiro, desactivación o eventual eliminación se resolverá en `ORIGO-AUTH-008` y en las tareas de datos/implementación propietarias que correspondan. Esta tarea no modifica el comportamiento.

---

#### 27. Estado activo e identidad estable

El runtime conserva `is_active` y permite cambiarlo desde la ficha.

El requisito vigente del maestro de proveedores exige identidad estable y estado explícito. Por tanto:

```text
INACTIVO
!=
INEXISTENTE
```

Una desactivación futura no deberá interpretarse automáticamente como borrado del historial de compras, condiciones, recepciones o evidencia.

La tarea no define todavía el contrato físico de retención ni una migración de datos.

---

#### 28. Matriz de autorización observada

| Superficie / acción | Control observado | Capacidad canónica final demostrada | Tratamiento posterior |
| --- | --- | --- | --- |
| `/suppliers` | `requireAppAccess(origo)` | lectura específica no demostrada en la ruta | `ORIGO-AUTH-004` |
| `/suppliers/new` | `requireAppAccess(origo)` + `requireCanManageSuppliers` | creación atómica no demostrada | `ORIGO-AUTH-005` |
| `/suppliers/[id]/edit` | `requireAppAccess(origo)` + `requireCanManageSuppliers` | update/activate/deactivate atómicos no demostrados | `ORIGO-AUTH-008` |
| `createSupplier` | usuario + `requireCanManageSuppliers` | `origo.procurement.suppliers.create` no demostrado como check exacto | `ORIGO-AUTH-005` |
| `updateSupplier` | usuario + `requireCanManageSuppliers` | `update/activate/deactivate` no separados | `ORIGO-AUTH-008` |
| `deleteSupplier` | usuario + helper + ausencia de órdenes vinculadas | no existe permiso canónico de delete aprobado en la familia documentada | `ORIGO-AUTH-008` |

“no demostrada” significa evidencia insuficiente en la superficie inspeccionada, no afirmación de ausencia de RLS u otros controles en capas diferentes.

---

#### 29. Matriz de brechas y propietarios

| Brecha | Riesgo contractual | Propietario exacto | Condición de salida |
| --- | --- | --- | --- |
| `/suppliers` usa acceso general de aplicación para llegar al directorio | consulta más amplia que la capacidad específica si ninguna capa posterior limita el recurso | `ORIGO-AUTH-004` | consulta de proveedor queda definida sobre `SUPPLIER` y scope autorizado |
| `origo.suppliers.manage` concentra mutaciones | creación, actualización y estado quedan sin separación atómica en el helper observado | `ORIGO-AUTH-005`; `ORIGO-AUTH-008` | capacidades granulares quedan definidas y fail-closed |
| fallback de roles locales en `canManageSuppliers` | divergencia entre rol visual/helper y matriz canónica | `ORIGO-AUTH-005`; `ORIGO-AUTH-008` | la decisión final deja de depender de una lista local no autoritativa |
| alta/edición cubren ficha básica pero no expediente documental completo | expediente incompleto respecto de `VSCREEN-0071` | `ORIGO-UX-001`; `ORIGO-AUTH-010` | experiencia y protección incorporan documentos/condiciones dentro del alcance aprobado |
| condiciones comerciales se reducen a contado/crédito y notas | `VSCREEN-0145` no queda materializada como superficie completa | `ORIGO-UX-001`; `ORIGO-AUTH-010` | contratos, precios, impuestos, fletes, mínimos y vigencias quedan asignados a superficie autorizada |
| no existe superficie dedicada de desempeño/reclamaciones | `VSCREEN-0146` sin materialización observada | `ORIGO-UX-001` | experiencia de abastecimiento asigna la pantalla canónica sin crear identidad nueva |
| `deleteSupplier` elimina físicamente si no hay órdenes | retiro irreversible potencialmente distinto de activar/desactivar | `ORIGO-AUTH-008` | política de corrección/retiro y autoridad quedan definidas |
| consulta fuente carga campos no mostrados en la tabla | sobrelectura potencial si la proyección final no los requiere | `ORIGO-AUTH-010` | field mask/proyección sensible queda definida y verificada |
| relación producto–proveedor no se administra en `/suppliers*` | condición de abastecimiento distribuida entre superficies | `ORIGO-UX-001` | relación y ownership quedan representados sin duplicar maestros |

Ninguna brecha queda sin propietario y condición de salida.

---

#### 30. Requisitos de prueba derivados

**Resultado:** NO GENERA REQUISITOS DE PRUEBA

**Requisitos creados:** 0
**Requisitos modificados:** 0
**Requisitos diferidos:** 0
**Requisitos obsoletos:** 0
**Fragmentos del Registro 04A afectados:** 0

**Justificación:** la tarea inventaría superficies, acciones, campos, capacidades legacy y brechas ya protegidas por requisitos vigentes. No crea un permiso nuevo, una pantalla nueva, una transición empresarial nueva, una política de proveedor nueva ni una obligación de seguridad nueva.

---

#### 31. Cobertura de prueba vigente reutilizada

Sin modificar el Registro 04A, esta tarea reutiliza:

- `TREQ-ORIGO-005` para identidad estable de proveedor, separación de relación/oferta/contrato/condición, versionado de condiciones, protección de datos sensibles y evaluación basada en hechos;
- `TREQ-ORIGO-006` a `TREQ-ORIGO-025` para exhaustividad del inventario ORIGO, identidad de rutas, patrones dinámicos, guards, drift y acceso directo;
- `TREQ-AUTH-001` para autorización canónica por permiso y alcance;
- `TREQ-AUTH-004` para decisiones consistentes entre evaluadores;
- `TREQ-AUTH-010` para segregación de funciones;
- `TREQ-AUTH-013` para protección server-side;
- `TREQ-AUTH-015` para evidencia correlacionable;
- obligaciones vigentes de privacidad, minimización, Storage y auditoría cuando el expediente de proveedor incorpore documentos o datos sensibles.

Esta sección es trazabilidad de cobertura existente, no una actualización del registro.

---

#### 32. Evidencia de validación

| Clase | Estado | Evidencia |
| --- | --- | --- |
| BUILD | `NOT_EXECUTED` | La compilación documental se ejecutará después de incorporar la tarea en su archivo propietario. |
| LOCAL | `NOT_EXECUTED` | No se ejecutaron validadores del checkout del usuario durante la preparación anticipada del artefacto. |
| REMOTA | `PASS` | Se verificaron `vento-shell/main`, `vento-origo/main`, archivo propietario, topología, inventario de rutas aprobado, catálogo de permisos/recursos/pantallas, Registro 04A y código actual de las superficies de proveedor. |
| OPERATIVA | `NOT_EXECUTED` | No se creó, editó, eliminó, activó ni desactivó un proveedor real; no se ejecutaron flujos desplegados, RLS, RPC ni mutaciones productivas. |
| FÍSICA | `NOT_APPLICABLE` | `ORIGO-AUTH-002` es `DEFINE_ONCE / NO_PHYSICAL_INSTANCE`; no existe unidad física propia que certificar. |

---

#### 33. Criterios de aceptación

- [x] La tarea mantiene exactamente `ORIGO-AUTH-002 — Inventariar vistas de proveedores`.
- [x] La tarea anterior es exactamente `ORIGO-AUTH-001` y la siguiente `ORIGO-AUTH-003`.
- [x] La topología se conserva como `DEFINE_ONCE / NO_PHYSICAL_INSTANCE`.
- [x] Se fijaron snapshots verificables de `vento-shell` y `vento-origo`.
- [x] Se separó el universo de proveedor del universo de compras y recepción.
- [x] Se reconciliaron exactamente tres páginas `suppliers` sin duplicados.
- [x] Se confirmó que no existe handler HTTP específico de proveedor en el snapshot.
- [x] Se inventariaron exactamente tres Server Actions de proveedor.
- [x] Se inventariaron los campos AS-IS de ficha comercial.
- [x] Se registró el helper `canManageSuppliers` sin aprobarlo como autoridad final.
- [x] Se preservó `origo.suppliers.manage` únicamente como legacy `DECOMPOSE_REQUIRED`.
- [x] Se preservó la familia canónica `view/create/update/activate/deactivate`.
- [x] Se conservó `SUPPLIER` como recurso organizacional y relacional, no propiedad de sede.
- [x] Se distinguió proyección base de proyección operativa mínima.
- [x] Se reconciliaron `VSCREEN-0070`, `VSCREEN-0071`, `VSCREEN-0145` y `VSCREEN-0146`.
- [x] Se preservó `VSCREEN-0072` fuera del universo propietario para no duplicar `ORIGO-AUTH-001`.
- [x] Se preservaron los ocho estados normales de `VPROC-0020` sin confundirlos con `is_active`.
- [x] Se registró `deleteSupplier` como comportamiento AS-IS sin inventar un permiso canónico de borrado.
- [x] Se distinguió desactivación de inexistencia.
- [x] Se registró sensibilidad comercial y owner de protección posterior.
- [x] Todas las brechas tienen propietario y condición de salida.
- [x] No se creó pantalla, proceso, permiso, estado, ruta ni identificador nuevo.
- [x] No se creó ni modificó requisito de prueba.
- [x] No se modifica Registro 04A.
- [x] No se autoriza cambio físico, Supabase, migración ni despliegue.
- [x] `ORIGO-AUTH-003` queda como siguiente tarea exacta y no se desarrolla aquí.

---

#### 34. Límites

Esta tarea no:

- define permisos finales de consulta;
- define permisos finales de creación;
- define permisos finales de corrección;
- aprueba el fallback por roles locales;
- crea un permiso `delete`;
- elimina, activa o desactiva proveedores reales;
- crea o edita proveedores reales;
- crea contratos de proveedor;
- crea listas de precio;
- define impuestos, fletes, mínimos o vigencias;
- diseña evaluación de desempeño;
- diseña reclamaciones;
- modifica `product_suppliers`;
- cambia el maestro de productos;
- cambia compras o recepciones;
- cambia rutas o navegación;
- ejecuta `sync-navigation`;
- modifica `vento-origo`;
- modifica Supabase;
- crea migraciones, RLS, RPC, funciones, triggers, Storage o datos;
- declara una vulnerabilidad explotable no demostrada;
- desarrolla `ORIGO-AUTH-003`.

---

#### 35. Continuidad

**ÚLTIMA TAREA APROBADA**
`ORIGO-AUTH-001 — Inventariar vistas de compras`

**TAREA ACTUAL APROBADA**
`ORIGO-AUTH-002 — Inventariar vistas de proveedores`

**SIGUIENTE TAREA RESERVADA**
`ORIGO-AUTH-003 — Inventariar vistas de recepción`

### ✅ ORIGO-AUTH-003 — Inventariar vistas de recepción

**Estado:** APROBADA
**Tarea anterior:** ORIGO-AUTH-002 — Inventariar vistas de proveedores
**Tarea siguiente:** ORIGO-AUTH-004 — Definir permisos de consulta
**Tipo de tarea:** documental; inventario AS-IS/canónico de las vistas, rutas, acciones, modos, estados, efectos, recursos y fronteras de autorización asociadas a recepción de compras en ORIGO, con reconciliación contra `VPROC-0022`, pantallas canónicas, recurso `PURCHASE_RECEIPT`, NEXO/NUMERA y propietarios posteriores; `DEFINE_ONCE` / `NO_PHYSICAL_INSTANCE`
**Bloque:** BLOQUE M — ORIGO
**Repositorio propietario:** `vento-group-sas/vento-shell`
**Archivo propietario:** `docs/plan-canonico/modular/bloques/M_ORIGO/01_AUTORIZACION_DE_COMPRAS.md`
**Estado físico resultante:** `NO_PHYSICAL_INSTANCE`
**Cambios físicos autorizados:** ninguno; esta tarea no modifica código, rutas, navegación, permisos, roles, recepciones reales, órdenes, inventario, costos, Supabase, migraciones, RLS, RPC, Storage, NEXO, NUMERA ni despliegues
**Requisitos de prueba creados o modificados:** 0

---

#### 1. Propósito

Inventariar de forma cerrada y verificable las superficies de ORIGO que hoy consultan, registran, corrigen o reversan recepciones de compra, diferenciando la recepción empresarial, el registro informativo, el efecto físico sobre inventario y la reconciliación posterior sin convertir el comportamiento técnico actual en contrato objetivo aprobado.

La regla de lectura queda:

```text
SUPERFICIE AS-IS
!=
PANTALLA CANÓNICA
!=
RECEPCIÓN EMPRESARIAL COMPLETA
!=
PERMISO SUFICIENTE
!=
EFECTO FÍSICO AUTORIZADO
!=
CONCILIACIÓN ECONÓMICA
```

Esta tarea fija el universo de recepción que `ORIGO-AUTH-004`, `ORIGO-AUTH-007`, `ORIGO-AUTH-008`, `ORIGO-AUTH-009`, `ORIGO-AUTH-010`, `ORIGO-AUTH-011`, `ORIGO-AUTH-012`, `ORIGO-AUTH-015` y las tareas de experiencia e integración posteriores deberán proteger o rediseñar. No redefine compras ni proveedores ya inventariados.

---

#### 2. Frontera recibida de ORIGO-AUTH-002

`ORIGO-AUTH-002` reservó expresamente `/receipts*` para esta tarea y mantuvo separado el maestro de proveedores.

El handoff conserva:

```text
ORIGO-AUTH-002
→ identidad y mantenimiento de proveedor
→ ORIGO-AUTH-003
→ recepción, corrección, reversión y relaciones posteriores
```

La tarea anterior dejó fuera de su ownership:

- `/receipts`;
- `/receipts/new`;
- las acciones de recepción y reversión;
- la actualización de cantidades recibidas de órdenes;
- los efectos observados sobre inventario y costo;
- la reconciliación con NEXO y NUMERA.

Por tanto, esta tarea no reabre `/suppliers*` ni inventa una segunda identidad para los recursos de proveedor.

---

#### 3. Naturaleza y topología

La reconciliación vigente del mini-bloque establece:

```text
ORIGO-AUTH-001..008
mode = DEFINE_ONCE
execution_gate = NO_PHYSICAL_INSTANCE
```

Consecuencias:

1. `ORIGO-AUTH-003` se define una sola vez como contrato documental;
2. no existe identidad física `ORIGO-AUTH-003::<implementation_unit_id>`;
3. la tarea no modifica Server Actions, RLS, RPC, tablas, permisos ni integraciones;
4. puede registrar divergencias del runtime frente al contrato objetivo sin corregirlas;
5. toda modificación de Supabase perteneciente a VENTO continúa versionándose y ejecutándose desde `vento-group-sas/vento-shell` bajo su tarea propietaria;
6. las materializaciones posteriores consumen este inventario sin volver a contar las superficies aquí fijadas.

---

#### 4. Fuentes y snapshots verificados

La preparación documental se ancla a:

```text
vento-shell/main
2725b2e8d7d0d1126e398c7fb1f996b75cf5fac0

vento-origo/main
70860f1ca5f0a4a73e894cbb840956f9f7eda2ad
```

Se contrastaron como mínimo:

- mini-bloque `ORIGO-AUTH-001..015`;
- artefacto aprobado de `ORIGO-AUTH-002`;
- inventario aprobado de rutas ORIGO;
- inventario aprobado de Server Actions;
- catálogo canónico de permisos, prerequisitos y recursos;
- catálogo canónico de pantallas y procesos;
- estados de `VPROC-0022`;
- contrato `INT-PROC-002` de recepción y handoff;
- requisitos ORIGO vigentes del Registro 04A;
- `src/app/receipts/page.tsx`;
- `src/app/receipts/new/page.tsx`;
- `src/components/vento/receipts/receipt-form.tsx`;
- guard y helpers de autorización del consumidor;
- sincronizador de navegación de ORIGO.

---

#### 5. Definición exacta de “vistas de recepción”

El universo propietario de `ORIGO-AUTH-003` incluye superficies cuyo objeto primario observado es registrar, consultar, corregir o reversar una recepción de compra:

```text
HISTORIAL DE RECEPCIONES
NUEVA RECEPCIÓN
RECEPCIÓN CONTRA OC
RECEPCIÓN DIRECTA
SOLO REGISTRO
CORRECCIÓN DE RECEPCIÓN
REVERSIÓN DE RECEPCIÓN
```

No incorpora como vistas propietarias:

- `/purchase-orders*`, ya inventariadas por `ORIGO-AUTH-001`;
- `/suppliers*`, ya inventariadas por `ORIGO-AUTH-002`;
- `/product-master-review`, que es una superficie de revisión de maestro de datos aunque pueda recibir handoffs desde recepción;
- rutas NEXO de inventario, LOC o posiciones;
- `/login` y `/no-access`;
- query parameters como identidades de ruta separadas.

---

#### 6. Universo AS-IS de páginas de recepción

El inventario aprobado de rutas conserva exactamente dos páginas de recepción:

| Identidad aprobada | Patrón | Archivo fuente | Tipo | Función AS-IS primaria |
| --- | --- | --- | --- | --- |
| `ORIGO-ROUTE-009` | `/receipts` | `src/app/receipts/page.tsx` | estática | histórico, estado y acciones temporales de corrección/reversión |
| `ORIGO-ROUTE-010` | `/receipts/new` | `src/app/receipts/new/page.tsx` | estática | crear recepción, solo registro o reemplazo correctivo |

Reconciliación:

```text
PÁGINAS DE RECEPCIÓN ESPERADAS: 2
PÁGINAS DE RECEPCIÓN MATERIALIZADAS: 2
PATRONES ESTÁTICOS: 2
PATRONES DINÁMICOS: 0
HANDLERS HTTP ESPECÍFICOS: 0
DUPLICADOS DE PATRÓN: 0
DUPLICADOS DE ARCHIVO: 0
```

Los parámetros `site_id`, `purchase_order_id`, `correction_entry_id`, `draft_id`, `ok`, `error` e `history_error` no crean rutas adicionales.

---

#### 7. Server Actions asociadas a recepción

El inventario técnico vigente confirma exactamente dos acciones de servidor propietarias de estas páginas:

| Acción | Archivo | Estilo observado | Intención AS-IS |
| --- | --- | --- | --- |
| `reverseReceipt` | `src/app/receipts/page.tsx` | función inline con `use server` | reversar una recepción existente dentro de ventana temporal |
| `createReceipt` | `src/app/receipts/new/page.tsx` | función inline con `use server` | crear recepción física, registro informativo o reemplazo correctivo |

No se inventa una acción separada por cada modo de formulario.

---

#### 8. Vista AS-IS — `/receipts`

`ORIGO-ROUTE-009` observa actualmente:

- acceso mediante `requireAppAccess`;
- permiso solicitado mediante `procurement.receipts`;
- resolución de sede desde `site_id`, `employee_settings.selected_site_id` o `employees.site_id`;
- lectura de `inventory_entries` filtrada por sede;
- preferencia por `source_app = origo`, con fallback cuando la columna no está disponible;
- límite de cincuenta filas;
- proveedor, factura, estado, modalidad, razón de emergencia, orden asociada y fechas;
- conteos de recibidas, solo registro, reversadas y corregidas;
- vínculo a nueva recepción;
- corrección y reversión únicamente sobre filas `received` dentro de una ventana observada de treinta minutos.

La página combina historial operativo y acceso a acciones correctivas. Esa combinación no prueba que la misma autoridad deba gobernar lectura, reversión y corrección.

---

#### 9. Estados AS-IS visibles en el historial

El formatter de la página reconoce:

```text
received
reversed
corrected
recorded
draft
cancelled
```

La creación puede producir además:

```text
pending_review
```

Estos valores pertenecen al modelo técnico observado y no se equiparan automáticamente con los estados canónicos de `VPROC-0022`.

---

#### 10. Ventana temporal AS-IS de corrección

El runtime utiliza:

```text
RECEIPT_ACTION_WINDOW_MINUTES = 30
```

La ventana habilita visualmente corrección o reversión de una recepción `received` cuando su `created_at` permanece dentro del límite.

Reglas documentales:

1. treinta minutos se registra como comportamiento AS-IS, no como política empresarial aprobada;
2. `created_at` técnico no se declara equivalente al momento empresarial de recepción;
3. expiración visual no sustituye autorización ni contrato de corrección;
4. la política definitiva de corrección pertenece a `ORIGO-AUTH-008` y al contrato de proceso correspondiente.

---

#### 11. Acción AS-IS — `reverseReceipt`

La acción observada:

1. exige usuario autenticado;
2. recibe `entry_id`, `site_id` y comentario;
3. exige comentario de reversión;
4. lee `inventory_entries` por `id`;
5. comprueba que la fila reporta la misma sede recibida;
6. exige estado `received`;
7. exige ventana de treinta minutos abierta;
8. invoca `origo_reverse_inventory_entry`;
9. redirige al historial.

No se observa dentro de la propia acción una llamada equivalente a `requireAppAccess`, `checkOperationalSessionPermission` o `has_permission` antes del RPC.

Conclusión limitada:

```text
CHECK DE PERMISO DE APLICACIÓN EN LA ACCIÓN
= NO DEMOSTRADO EN LA SUPERFICIE INSPECCIONADA
```

Esto no demuestra ausencia de protección en RLS/RPC; demuestra que la acción por sí sola no aporta esa evidencia. La suficiencia queda reservada a `ORIGO-AUTH-007`, `ORIGO-AUTH-008` y las auditorías de servidor aplicables.

---

#### 12. Vista AS-IS — `/receipts/new`

`ORIGO-ROUTE-010` observa actualmente:

- acceso mediante `requireAppAccess`;
- permiso solicitado mediante `procurement.receipts`;
- sede solicitada por query o sede guardada del empleado;
- proveedores activos;
- catálogo de productos inventariables;
- LOC y posiciones operativas permitidas;
- órdenes en estados `draft` o `sent` para la sede;
- presentaciones/unidades de medida;
- relación producto-proveedor;
- costos históricos por proveedor/producto;
- perfiles de inventario, lote y vencimiento;
- precarga de una orden por `purchase_order_id`;
- precarga de una recepción original por `correction_entry_id`;
- borrador UI por `draft_id`;
- formulario guiado para recepción física o solo registro.

Abrir la página no prueba autoridad suficiente para ejecutar cualquiera de sus mutaciones.

---

#### 13. Modos AS-IS de operación

El formulario distingue dos modos de operación:

```text
inventory
record_only
```

Interpretación observada:

| Modo | Etiqueta funcional | Efecto declarado por UI |
| --- | --- | --- |
| `inventory` | Recepción física | registra compra, crea movimientos y aumenta inventario |
| `record_only` | Solo registro | guarda trazabilidad comercial sin movimientos ni existencias |

Regla crítica:

```text
RECEPCIÓN REGISTRAL
!=
ENTRADA FÍSICA DE INVENTARIO
```

La separación coincide con la obligación vigente de distinguir si una recepción mueve inventario o es solo registro.

---

#### 14. Modos AS-IS según existencia de orden

El runtime deriva:

```text
purchase_order_id presente
→ entry_mode = normal

purchase_order_id ausente
→ entry_mode = emergency
```

Una recepción sin OC exige razón de emergencia.

La etiqueta técnica `emergency` se documenta como comportamiento observado; no se interpreta como aprobación canónica de una compra urgente ni como bypass de segregación, monto, presupuesto o aprobación.

---

#### 15. Corrección AS-IS

Cuando existe `correction_entry_id`, `createReceipt` fuerza el modo con inventario y:

1. carga la recepción original;
2. exige misma sede;
3. exige estado `received`;
4. exige ventana temporal abierta;
5. invoca `origo_reverse_inventory_entry` sobre la original;
6. crea una nueva recepción;
7. al final invoca `origo_mark_inventory_entry_corrected` para vincular original y reemplazo.

La secuencia observada contiene varios pasos persistentes.

No se declara atómica ni segura frente a fallo intermedio únicamente por existir esos pasos. `TREQ-ORIGO-003` y el contrato de integración ya cubren la necesidad de evitar una reversión definitiva sin reemplazo correlacionado.

---

#### 16. Autorización observada en la página

Las dos páginas usan:

```text
RECEIPTS_PERMISSION = procurement.receipts
```

`requireAppAccess` lo normaliza únicamente agregando el prefijo de aplicación cuando falta:

```text
procurement.receipts
→ origo.procurement.receipts
```

El catálogo canónico vigente registra:

```text
origo.procurement.receipts
→ RENAME
→ origo.procurement.receipts.view
```

Por tanto:

```text
PERMISO AS-IS OBSERVADO
!=
IDENTIDAD CANÓNICA FINAL DE CONSULTA
```

La tarea no corrige el código ni inventa los permisos de mutación. `ORIGO-AUTH-004` define consulta y `ORIGO-AUTH-007` define recepción.

---

#### 17. Autorización observada en `createReceipt`

La Server Action revalida autoridad en servidor:

- resuelve sesión operativa con `preferredSiteId = siteId`;
- en dispositivo compartido usa `checkOperationalSessionPermission`;
- en carril no compartido ejecuta `has_permission` con `origo.procurement.receipts` y `p_site_id = siteId`;
- falla cerrado cuando `canReceive` es falso.

La evidencia demuestra revalidación de un permiso AS-IS y de sede en esta acción.

No demuestra que el código de permiso sea la capacidad canónica final ni que una sola capacidad deba autorizar consulta, recepción, corrección y reversión.

---

#### 18. Sede y territorio observados

Las páginas aceptan `site_id` desde query/formulario y también consultan sede guardada del empleado.

`createReceipt` vuelve a resolver la sesión operativa usando esa sede preferida y revalida el permiso con `p_site_id`.

`reverseReceipt` comprueba que la fila pertenece al `site_id` recibido, pero no demuestra dentro de la acción una decisión de permiso equivalente.

Regla:

```text
site_id recibido
!=
sede autorizada
```

El contrato final debe resolver el territorio desde evidencia autoritativa y el recurso, no por confianza en el parámetro.

---

#### 19. Recurso canónico de consulta

El catálogo vigente define:

```text
permission = origo.procurement.receipts.view
resource = PURCHASE_RECEIPT
locator = receipt_id o filtro
territory = RECEIPT_DESTINATION
```

`RECEIPT_DESTINATION` relaciona:

- orden;
- sede;
- área receptora;
- ubicación;
- productos recibidos.

El receptor es relación auditada, no propietario automático del recurso.

La consulta canónica no concede registrar, revertir ni aprobar recepciones.

---

#### 20. Dispositivo compartido y atribución de actor

`createReceipt` integra:

- `resolveOperationalSession`;
- `checkOperationalSessionPermission`;
- `requireSharedDeviceActorSignature`;
- `attachSharedDeviceActionSignatureTarget`.

La firma registra como metadata, entre otros:

```text
site_id
supplier_id
purchase_order_id
correction_entry_id
entry_mode
receipt_operation_mode
item_count
pending_master_data_review
```

Cuando la firma es requerida, el actor firmado se usa como `created_by` de la recepción y de eventos de costo observados.

La suficiencia final de atribución pertenece también a `ORIGO-AUTH-011`.

---

#### 21. Tablas y recursos consumidos por `createReceipt`

El archivo actual consulta o muta, entre otros:

```text
employee_settings
employees
sites
suppliers
products
product_inventory_profiles
product_suppliers
product_uom_profiles
procurement_supplier_product_costs
inventory_locations
inventory_location_positions
inventory_cost_policies
purchase_orders
purchase_order_items
inventory_entries
inventory_entry_items
inventory_movements
inventory_stock_by_site
product_cost_events
product_master_review_requests
```

La existencia de estas dependencias no transfiere ownership de sus dominios a ORIGO.

---

#### 22. RPC observadas en `createReceipt`

El archivo utiliza:

```text
has_permission
origo_reverse_inventory_entry
origo_mark_inventory_entry_corrected
upsert_inventory_stock_by_location
```

La lista registra consumo técnico; no aprueba su implementación, atomicidad, RLS, grants, idempotencia o frontera de dominio.

---

#### 23. Persistencia AS-IS de la cabecera

`createReceipt` inserta una fila en `inventory_entries` con campos observados como:

```text
site_id
supplier_id
supplier_name
invoice_number
received_at
status
notes
created_by
purchase_order_id
source_app = origo
entry_mode
emergency_reason
```

Existe fallback de inserción cuando columnas más recientes no están disponibles.

Ese fallback se registra como compatibilidad observada, no como contrato canónico de esquema.

---

#### 24. Persistencia AS-IS de líneas

La recepción inserta líneas en `inventory_entry_items` y conserva datos de producto, destino, cantidad, unidad, presentación, conversión, costo, impuestos, referencia de línea de OC, lote, vencimiento y notas según aplique.

La presencia de lote o vencimiento depende del perfil de inventario del producto.

La línea observada puede ser base para trazabilidad, pero no sustituye los contratos propietarios de inventario, ubicaciones o catálogo.

---

#### 25. Efectos físicos AS-IS sobre inventario

Cuando `movesInventory = true`, el runtime observado:

- inserta `inventory_movements` con `movement_type = receipt_in`;
- lee y actualiza `inventory_stock_by_site`;
- invoca `upsert_inventory_stock_by_location` para sumar por ubicación;
- consume `inventory_locations` e `inventory_location_positions`;
- calcula cantidades posteriores a la recepción.

Esto demuestra que el runtime actual de ORIGO materializa directamente efectos físicos.

El contrato objetivo aprobado de `INT-PROC-002` establece una frontera distinta:

```text
ORIGO
→ registra, verifica y acepta recepción

NEXO
→ materializa entrada, ubicación y custodia física cuando aplica
```

Por tanto, la escritura física directa se registra como **drift AS-IS a reconciliar**, no como comportamiento objetivo ratificado por esta tarea.

---

#### 26. Efectos AS-IS sobre costos

Cuando mueve inventario, el runtime también:

- consulta `inventory_cost_policies`;
- calcula costo posterior;
- actualiza `products.cost`;
- inserta `product_cost_events` con cantidades y costos antes/después.

La tarea no concluye que esas escrituras sean la frontera económica definitiva.

La conciliación económica canónica de `VPROC-0022` y la integración con NUMERA permanecen separadas.

---

#### 27. Efectos AS-IS sobre la orden de compra

Cuando existe `purchase_order_id`, la acción:

1. carga la orden y comprueba sede/proveedor/estado observado;
2. acepta normalmente órdenes `draft` o `sent`;
3. en corrección admite también `received`;
4. incrementa `purchase_order_items.quantity_received`;
5. reevalúa si todas las líneas alcanzaron la cantidad ordenada;
6. cuando todas están recibidas, actualiza la orden a `status = received` y `received_at`.

La lógica se registra como comportamiento AS-IS.

No se equipara automáticamente con recepción parcial, aceptación comercial, reconciliación o lifecycle completo de `VPROC-0022`.

---

#### 28. Handoff AS-IS hacia maestro de datos

Cuando existen solicitudes de producto o presentación pendientes, la recepción puede:

- crear la cabecera con `status = pending_review`;
- insertar `product_master_review_requests`;
- relacionarlas con `source_entry_id` y `source_entry_item_id`;
- diferir los movimientos físicos hasta completar la revisión.

`/product-master-review` es consumidor de ese handoff, pero no se convierte por ello en una tercera vista de recepción.

---

#### 29. Reconciliación con pantallas canónicas

El catálogo ORIGO asigna cuatro pantallas principales a `VPROC-0022`:

| Pantalla | Nombre | Reconciliación con runtime actual |
| --- | --- | --- |
| `VSCREEN-0076` | Cola de recepciones | materialización parcial dentro de `/receipts/new`, que lista OC `draft/sent`; no existe cola canónica dedicada observada |
| `VSCREEN-0077` | Recepción total o parcial | materialización parcial dentro de `/receipts/new` y `createReceipt` |
| `VSCREEN-0078` | Resolución de diferencias de recepción | cobertura parcial mediante corrección/reversión; no existe superficie dedicada completa observada |
| `VSCREEN-0079` | Historial y auditoría de abastecimiento | cobertura parcial mediante `/receipts`; no reconstruye por sí sola todo el ciclo canónico |

Resultado:

```text
PANTALLAS CANÓNICAS DE RECEPCIÓN: 4
PÁGINAS AS-IS DE RECEPCIÓN: 2
IDENTIDADES NUEVAS CREADAS: 0
```

Dos páginas AS-IS pueden cubrir fragmentos de varias pantallas canónicas sin fusionar sus identidades objetivo.

---

#### 30. Requisitos de prueba derivados

**Resultado:** NO GENERA REQUISITOS DE PRUEBA

**Requisitos creados:** 0
**Requisitos modificados:** 0
**Requisitos diferidos:** 0
**Requisitos obsoletos:** 0
**Fragmentos del Registro 04A afectados:** 0

**Justificación:** la tarea inventaría superficies, acciones, modos, tablas, RPC, estados y brechas ya protegidos por requisitos vigentes. No crea una obligación nueva, una política de recepción nueva, una autorización nueva, una transición nueva ni una integración nueva.

---

#### 31. Cobertura de prueba vigente reutilizada

Sin modificar el Registro 04A, esta tarea reutiliza:

- `TREQ-ORIGO-001` para distinguir recepción inventariable de solo registro y evitar duplicidad de efectos;
- `TREQ-ORIGO-003` para atomicidad, idempotencia, cantidades, costos, orden, auditoría y corrección correlacionada;
- `TREQ-ORIGO-004` para separación del ciclo de compra y recepción;
- `TREQ-ORIGO-006` a `TREQ-ORIGO-020` para exhaustividad del inventario de rutas, parámetros, guards y drift;
- `TREQ-AUTH-001`, `TREQ-AUTH-004`, `TREQ-AUTH-010` y `TREQ-AUTH-013` para autorización, consistencia, segregación y protección server-side;
- requisitos vigentes de integración para el handoff ORIGO → NEXO y la prevención de recepción duplicada.

Esta sección es trazabilidad de cobertura existente, no una actualización del registro.

---

#### 32. Reconciliación con estados canónicos de VPROC-0022

El proceso canónico conserva exactamente nueve estados normales:

```text
VPROC-0022.RECEIPT_EXPECTED
→ VPROC-0022.ARRIVAL_REGISTERED
→ VPROC-0022.PHYSICAL_CHECK_IN_PROGRESS
→ VPROC-0022.DOCUMENT_CHECK_IN_PROGRESS
→ VPROC-0022.DIFFERENCE_UNDER_REVIEW
→ VPROC-0022.ACCEPTANCE_PENDING
→ VPROC-0022.PUTAWAY_PENDING
→ VPROC-0022.ECONOMIC_RECONCILIATION_PENDING
→ VPROC-0022.RECEIPT_RECONCILED
```

Los estados AS-IS de `inventory_entries` no son alias automáticos de esos estados.

Ejemplos:

```text
received
!=
RECEIPT_RECONCILED

recorded
!=
PUTAWAY_PENDING

reversed
!=
CCR completo por inferencia
```

La transición canónica requiere hechos y handoffs que el string técnico por sí solo no demuestra.

---

#### 33. Brechas y propietarios posteriores

| Brecha observada | Riesgo contractual | Propietario exacto | Condición de salida |
| --- | --- | --- | --- |
| páginas y acción usan `origo.procurement.receipts` mientras el catálogo normaliza la consulta a `.view` | identidad de permiso AS-IS distinta de la canónica | `ORIGO-AUTH-004`; `ORIGO-AUTH-007` | lectura y recepción usan capacidades canónicas separadas y fail-closed |
| `reverseReceipt` no demuestra recheck de permiso dentro de la acción | reversión invocable con evidencia de aplicación insuficiente si capas inferiores no bloquean | `ORIGO-AUTH-008`; auditoría server aplicable | acción revalida autoridad exacta o queda demostrada por contrato propietario equivalente |
| `site_id` llega desde query/formulario | parámetro puede divergir del territorio autorizado | `ORIGO-AUTH-009`; `ORIGO-AUTH-012` | territorio se resuelve/revalida desde contexto y recurso |
| un solo permiso AS-IS gobierna consulta y recepción | falta segregación entre ver, recibir y corregir | `ORIGO-AUTH-004`; `ORIGO-AUTH-007`; `ORIGO-AUTH-008` | capacidades atómicas quedan definidas y protegidas |
| ORIGO escribe movimientos, stock y ubicación directamente | runtime invade verdad física que el contrato objetivo entrega a NEXO | `INT-PROC-003`; integración física propietaria | ORIGO emite handoff y NEXO materializa o confirma su verdad física |
| corrección revierte antes de completar reemplazo y cierre de auditoría | fallo intermedio puede dejar resultado no reconciliado | `ORIGO-AUTH-008`; `INT-PROC-005` | operación correctiva queda atómica o durable/reconciliable |
| `received` de OC se fija por cantidades técnicas | estado de orden puede confundirse con recepción empresarial completa | `ORIGO-UX-014`; contratos `VPROC-0021/0022` | estado canónico deriva de proceso y evidencia correlacionada |
| `products.cost` y `product_cost_events` se actualizan desde recepción ORIGO | frontera económica distribuida | integración NUMERA/NEXO aplicable | costo y hecho económico quedan gobernados por owner y contrato explícitos |
| `VSCREEN-0076..0079` están condensadas en dos páginas | responsabilidades UX distintas quedan fusionadas | `ORIGO-UX-001..016` según matriz de experiencia | prototipo/implementación asigna cada responsabilidad sin inventar IDs |
| ventana de treinta minutos es constante local | política correctiva codificada sin contrato empresarial demostrado | `ORIGO-AUTH-008` | regla de corrección queda definida canónicamente |

Ninguna brecha queda sin propietario y condición de salida.

---

#### 34. Evidencia de validación

| Clase | Estado | Evidencia |
| --- | --- | --- |
| BUILD | `NOT_EXECUTED` | La compilación documental se ejecutará después de incorporar la tarea en su archivo propietario. |
| LOCAL | `NOT_EXECUTED` | No se ejecutaron validadores del checkout del usuario durante la preparación anticipada del artefacto. |
| REMOTA | `PASS` | Se verificaron `vento-shell/main`, `vento-origo/main`, archivo propietario, topología, rutas aprobadas, catálogo de procesos/pantallas/permisos/recursos, Registro 04A, contrato de integración y código actual de las dos superficies de recepción. |
| OPERATIVA | `NOT_EXECUTED` | No se creó, corrigió, reversó ni recibió una compra real; no se ejecutaron flujos desplegados, RLS, RPC, datos productivos ni efectos de inventario. |
| FÍSICA | `NOT_APPLICABLE` | `ORIGO-AUTH-003` es `DEFINE_ONCE / NO_PHYSICAL_INSTANCE`; no existe unidad física propia que certificar. |

---

#### 35. Criterios de aceptación

- [x] La tarea mantiene exactamente `ORIGO-AUTH-003 — Inventariar vistas de recepción`.
- [x] La tarea anterior es exactamente `ORIGO-AUTH-002` y la siguiente `ORIGO-AUTH-004`.
- [x] La topología se conserva como `DEFINE_ONCE / NO_PHYSICAL_INSTANCE`.
- [x] Se fijaron snapshots verificables de `vento-shell` y `vento-origo`.
- [x] Se separó recepción de compras y proveedores ya inventariados.
- [x] Se reconciliaron exactamente dos páginas `receipts` sin duplicados.
- [x] Se confirmó que no existe handler HTTP específico adicional de recepción en el inventario aprobado.
- [x] Se inventariaron exactamente dos Server Actions propietarias de recepción.
- [x] Se distinguieron `inventory` y `record_only`.
- [x] Se distinguieron `normal` y `emergency` como modos AS-IS.
- [x] Se registró la ventana AS-IS de treinta minutos sin convertirla en política canónica.
- [x] Se registró el flujo de corrección y reversión sin declararlo atómico por inferencia.
- [x] Se registró el check server-side de `createReceipt`.
- [x] Se registró como no demostrado el recheck de permiso dentro de `reverseReceipt`.
- [x] Se reconciliaron `origo.procurement.receipts` y `origo.procurement.receipts.view` sin fusionarlos silenciosamente.
- [x] Se preservó `PURCHASE_RECEIPT` y `RECEIPT_DESTINATION` como contrato de recurso de consulta.
- [x] Se inventariaron efectos observados sobre inventario, costos y orden.
- [x] Se documentó el drift entre escrituras físicas ORIGO y la frontera objetivo ORIGO → NEXO.
- [x] Se inventariaron `VSCREEN-0076`, `VSCREEN-0077`, `VSCREEN-0078` y `VSCREEN-0079`.
- [x] Se preservaron los nueve estados normales de `VPROC-0022`.
- [x] Se evitó equiparar estados técnicos con estados empresariales.
- [x] Todas las brechas tienen propietario y condición de salida.
- [x] No se creó pantalla, proceso, permiso, estado, ruta, RPC ni identificador nuevo.
- [x] No se creó ni modificó requisito de prueba.
- [x] No se modifica Registro 04A.
- [x] No se autoriza cambio físico, Supabase, migración ni despliegue.
- [x] `ORIGO-AUTH-004` queda como siguiente tarea exacta y no se desarrolla aquí.

---

#### 36. Límites

Esta tarea no:

- define permisos finales de consulta;
- define permisos finales de recepción;
- define permisos finales de corrección;
- aprueba `origo.procurement.receipts` como identidad final;
- crea un permiso nuevo;
- cambia la ventana temporal de corrección;
- corrige `reverseReceipt`;
- corrige `createReceipt`;
- cambia RLS o RPC;
- mueve ownership de inventario a ORIGO;
- mueve ownership económico a ORIGO;
- cambia NEXO o NUMERA;
- crea una recepción real;
- revierte una recepción real;
- modifica stock, LOC, posiciones, costos u órdenes;
- cambia rutas o navegación;
- ejecuta `sync-navigation`;
- modifica `vento-origo`;
- modifica Supabase;
- crea migraciones, funciones, triggers, Storage o datos;
- desarrolla `ORIGO-AUTH-004`.

---

#### 37. Continuidad

**ÚLTIMA TAREA APROBADA**
`ORIGO-AUTH-002 — Inventariar vistas de proveedores`

**TAREA ACTUAL APROBADA**
`ORIGO-AUTH-003 — Inventariar vistas de recepción`

**SIGUIENTE TAREA RESERVADA**
`ORIGO-AUTH-004 — Definir permisos de consulta`

### ✅ ORIGO-AUTH-004 — Definir permisos de consulta

**Estado:** APROBADA
**Tarea anterior:** ORIGO-AUTH-003 — Inventariar vistas de recepción
**Tarea siguiente:** ORIGO-AUTH-005 — Definir permisos de creación
**Tipo de tarea:** documental; definición cerrada de los permisos canónicos de consulta de ORIGO, sus recursos, modalidades, scopes, prerrequisitos, proyecciones, asignaciones, denegaciones, compatibilidad con dispositivos/simulación, binding a rutas y pantallas y brechas AS-IS del consumidor, sin crear permisos mutantes ni materialización física; `DEFINE_ONCE` / `NO_PHYSICAL_INSTANCE`
**Bloque:** BLOQUE M — ORIGO
**Repositorio propietario:** `vento-group-sas/vento-shell`
**Archivo propietario:** `docs/plan-canonico/modular/bloques/M_ORIGO/01_AUTORIZACION_DE_COMPRAS.md`
**Estado físico resultante:** `NO_PHYSICAL_INSTANCE`
**Cambios físicos autorizados:** ninguno; esta tarea no modifica código, catálogo de permisos, roles, rutas, navegación, Server Actions, RLS, RPC, tablas, datos, Supabase, migraciones, Storage, secretos, consumidores ni despliegues
**Requisitos de prueba creados o modificados:** 0

---

#### 1. Propósito

Definir de forma inequívoca qué capacidad de consulta debe proteger cada recurso de ORIGO, cómo se resuelve por carril base u operativo, qué alcance y contexto exige, qué proyección puede entregar y qué acciones quedan expresamente fuera de la lectura.

La regla central queda:

```text
ORIGO.ACCESS
!=
PERMISO DE CONSULTA DEL RECURSO
!=
PERMISO DE MUTACIÓN
!=
ALCANCE TERRITORIAL
!=
PROYECCIÓN DE CAMPOS
```

Esta tarea no crea un permiso genérico de consulta de ORIGO. Congela cuatro capacidades de lectura ya existentes en el catálogo canónico y define su uso obligatorio en las superficies inventariadas por `ORIGO-AUTH-001..003`.

---

#### 2. Frontera recibida de ORIGO-AUTH-003

`ORIGO-AUTH-003` entrega un inventario cerrado de recepción con:

```text
2 páginas AS-IS
2 Server Actions
4 pantallas canónicas de recepción
9 estados VPROC-0022
```

Además deja demostrado que:

- `/purchase-orders*` pertenece al universo de compras inventariado por `ORIGO-AUTH-001`;
- `/suppliers*` pertenece al universo de proveedores inventariado por `ORIGO-AUTH-002`;
- `/receipts*` pertenece al universo de recepción inventariado por `ORIGO-AUTH-003`;
- `/product-master-review` permanece como superficie administrativa de catálogo ya inventariada transversalmente;
- una ruta o pantalla visible no demuestra autorización suficiente;
- los efectos mutantes quedan fuera del permiso de consulta.

El handoff queda:

```text
ORIGO-AUTH-001..003
→ universos de recursos y superficies
→ ORIGO-AUTH-004
→ permiso exacto de consulta por recurso
```

---

#### 3. Naturaleza y topología

La reconciliación vigente establece:

```text
ORIGO-AUTH-001..008
mode = DEFINE_ONCE
execution_gate = NO_PHYSICAL_INSTANCE
```

Consecuencias:

1. `ORIGO-AUTH-004` define una sola vez el contrato documental de consulta;
2. no existe identidad física `ORIGO-AUTH-004::<implementation_unit_id>`;
3. no se crean permisos nuevos en Supabase ni en paquetes compartidos;
4. no se migra ningún alias legacy en esta tarea;
5. no se corrige código consumidor;
6. no se modifica RLS, RPC, grants, navegación ni matrices ya aprobadas;
7. las brechas observadas quedan asignadas a tareas posteriores con condición de salida verificable.

---

#### 4. Fuentes y snapshots verificados

La preparación documental se ancla a:

```text
vento-shell/main
d00dac8757d958d50e9f6ce06e0ccd9a85970d25

vento-origo/main
70860f1ca5f0a4a73e894cbb840956f9f7eda2ad
```

Se contrastaron como mínimo:

- `ORIGO-AUTH-001` y `ORIGO-AUTH-002` materializadas en el owner remoto;
- artefacto completo aprobado de `ORIGO-AUTH-003` todavía pendiente de publicación;
- catálogo canónico de permisos y aliases;
- clasificación `BASE_ONLY` / `BASE_OR_OPERATIONAL`;
- alcance de permisos;
- prerequisitos de turno y check-in;
- compatibilidad con dispositivo compartido;
- comportamiento de simulación;
- contrato de recurso;
- matrices RBAC de propietario, gerencias, roles funcionales, producción, logística y excepciones;
- inventario de rutas ORIGO;
- inventario de Server Actions;
- guard y helper de permisos del consumidor;
- páginas de compras, proveedores, recepción y revisión de productos;
- sincronizador de navegación;
- Registro 04A de ORIGO y AUTH.

El remoto todavía no contiene la incorporación de `ORIGO-AUTH-003`; el artefacto aprobado de esa tarea es la base inmediata autorizada para esta preparación anticipada.

---

#### 5. Universo exacto de permisos de consulta ORIGO

El catálogo canónico vigente contiene exactamente cuatro permisos de consulta internos de ORIGO distintos del acceso general a la aplicación:

| Permiso canónico | Capacidad | Modalidad | Solo lectura |
| --- | --- | --- | --- |
| `origo.procurement.purchase_orders.view` | consultar órdenes de compra | `BASE_OR_OPERATIONAL` | sí |
| `origo.procurement.receipts.view` | consultar recepciones de compra | `BASE_OR_OPERATIONAL` | sí |
| `origo.procurement.suppliers.view` | consultar proveedores | `BASE_OR_OPERATIONAL` | sí |
| `origo.catalog.product_reviews.view` | consultar revisiones de productos | `BASE_ONLY` | sí |

Resultado:

```text
PERMISOS DE CONSULTA ORIGO: 4
BASE_OR_OPERATIONAL: 3
BASE_ONLY: 1
PERMISOS MUTANTES CREADOS: 0
ALIASES LEGACY APROBADOS COMO DESTINO: 0
```

`origo.access` permanece como capacidad de entrada a la aplicación y no sustituye ninguno de los cuatro permisos anteriores.

---

#### 6. Regla de decisión por carriles

Para los tres permisos `BASE_OR_OPERATIONAL`, la autorización final de consulta se resuelve como:

```text
ALLOW_VIEW
=
ALLOW_BASE_COMPLETO
OR
ALLOW_OPERATIVO_COMPLETO
```

Está prohibido fabricar autorización mezclando piezas incompletas de ambos carriles.

Ejemplos prohibidos:

```text
permiso base
+
territorio operativo ajeno
→ NO

rol operativo
+
cobertura administrativa de otro carril
→ NO

visibilidad de menú
+
recurso conocido
→ NO
```

Para `origo.catalog.product_reviews.view`:

```text
ALLOW_VIEW
=
ALLOW_BASE_COMPLETO
```

No existe carril operativo para esa capacidad.

---

#### 7. Prerrequisitos comunes de toda consulta protegida

Toda consulta real de recurso exige, como mínimo:

1. principal autenticado válido;
2. acceso válido a ORIGO cuando la superficie pertenezca a la aplicación;
3. permiso canónico exacto del recurso;
4. modalidad compatible con el actor;
5. alcance del permiso compatible con el recurso;
6. contexto requerido por el carril seleccionado;
7. recurso resuelto en servidor cuando la consulta es por identidad concreta;
8. proyección de campos limitada al permiso y finalidad;
9. decisión fail-closed ante ausencia, ambigüedad o error de autorización;
10. auditoría conforme al contrato transversal cuando aplique.

La interfaz puede ocultar navegación, pero esa ocultación no constituye autorización.

---

#### 8. `origo.procurement.purchase_orders.view`

Definición canónica:

```text
CAPACIDAD
Consultar órdenes de compra registradas y su estado.

MODALIDAD
BASE_OR_OPERATIONAL

RECURSO
PURCHASE_ORDER

CLAVE
purchase_order_id o filtro autorizado

ALCANCE
PO_DESTINATIONS
```

La consulta puede incluir, dentro de la proyección autorizada:

- identidad y referencia de la orden;
- estado;
- proveedor relacionado;
- negocio y sedes/destinos autorizados;
- líneas, cantidades y presentaciones necesarias;
- fechas operativas;
- información económica únicamente cuando el campo no esté restringido por la protección posterior de datos sensibles;
- cantidades recibidas o pendientes cuando formen parte del seguimiento autorizado.

No concede:

- crear orden;
- editar orden;
- eliminar orden;
- aprobar o rechazar compra;
- marcarla como enviada;
- registrar recepción;
- abrir datos sensibles fuera de la proyección autorizada;
- autoridad sobre una sede no autorizada por conocer una orden multidestino.

---

#### 9. Alcance territorial de órdenes

La regla de recurso aprobada exige considerar:

```text
negocio
+
proveedor relacionado
+
todos los destinos o áreas mostrados
```

Para consulta base de propietario o gerente general puede existir alcance amplio `G(B)` dentro de la organización productiva ordinaria.

Para gerente, supervisor u otros roles con cobertura administrativa acotada:

```text
AS-REL
→ la orden debe involucrar un recurso o destino dentro de la cobertura autorizada
```

Para carril operativo:

```text
orden vinculada a sede/área activa
+
turno válido
+
check-in válido
+
recurso resuelto
```

Una orden multidestino no concede automáticamente visibilidad completa de todos sus destinos si alguno queda fuera del alcance permitido. La salida puede requerir proyección parcial.

---

#### 10. Prerrequisito operativo de órdenes

El catálogo fija:

```text
origo.procurement.purchase_orders.view
→ T+C
```

Por tanto, en carril operativo exige:

```text
TURNO PUBLICADO Y VIGENTE
+
CHECK-IN ACTIVO
```

El mismo permiso usado por carril base no hereda esa exigencia cuando su contrato base autoriza la consulta sin turno ni check-in.

---

#### 11. `origo.procurement.receipts.view`

Definición canónica:

```text
CAPACIDAD
Consultar recepciones de compra registradas.

MODALIDAD
BASE_OR_OPERATIONAL

RECURSO
PURCHASE_RECEIPT

CLAVE
receipt_id o filtro autorizado

ALCANCE
RECEIPT_DESTINATION
```

La consulta puede incluir:

- identidad de la recepción;
- referencia de orden cuando exista;
- sede y destino receptor autorizados;
- proveedor relacionado;
- cantidades;
- diferencias visibles dentro del alcance;
- estado;
- productos y presentaciones necesarias;
- actor receptor como relación, no como propietario del recurso;
- historial versionado permitido.

No concede:

- registrar recepción;
- aceptar físicamente mercancía;
- reversar;
- corregir;
- aprobar diferencias;
- alterar inventario;
- modificar costos;
- cambiar cantidades recibidas de la orden.

---

#### 12. Alcance y contexto de recepciones

La recepción se limita por:

```text
orden
+
sede
+
área receptora
+
ubicación
+
productos recibidos
```

El catálogo fija para carril operativo:

```text
origo.procurement.receipts.view
→ T+C
```

Una recepción consultable desde un punto general de recepción de sede no convierte toda la sede ni todas sus áreas en territorio irrestricto. El recurso concreto sigue gobernando el alcance final.

---

#### 13. `origo.procurement.suppliers.view`

Definición canónica:

```text
CAPACIDAD
Consultar proveedores registrados y su información general.

MODALIDAD
BASE_OR_OPERATIONAL

RECURSO
SUPPLIER

CLAVE
supplier_id o relación desde orden/recepción

ALCANCE
SUPPLIER_SCOPE
```

El proveedor es un recurso organizacional o de negocio.

Regla obligatoria:

```text
PROVEEDOR
!=
RECURSO PROPIEDAD DE UNA SEDE
```

La sede puede actuar como filtro relacional, pero `employee_sites` no crea propiedad sobre el proveedor.

---

#### 14. Proyección base y operativa de proveedor

Carril base autorizado:

- puede consultar terceros dentro del ámbito comercial permitido;
- conserva la relación organizacional o de negocio;
- puede acceder a la información general autorizada;
- sigue sujeto a protección de campos sensibles.

Carril operativo autorizado:

- solo obtiene proveedores relacionados con el recurso activo;
- recibe proyección mínima necesaria para abastecimiento o recepción;
- no obtiene el directorio completo por tener una sede activa;
- no obtiene datos bancarios, negociación, contratos o precios sensibles por inferencia.

El catálogo fija:

```text
origo.procurement.suppliers.view
→ T
```

En carril operativo requiere turno publicado y vigente, pero no exige por sí mismo check-in para la proyección mínima de referencia previa al inicio físico.

---

#### 15. Clasificación configurativa de proveedor

`origo.procurement.suppliers.view` es el único permiso ORIGO actual clasificado como:

```text
is_configuration = true
```

Esto significa que el proveedor es dato maestro reutilizado.

No significa:

- capacidad de crear proveedor;
- capacidad de editar proveedor;
- capacidad de activar/desactivar;
- autoridad sobre datos contractuales sensibles;
- autoridad para reescribir relaciones producto-proveedor.

La lectura configurativa sigue siendo solo lectura.

---

#### 16. `origo.catalog.product_reviews.view`

Definición canónica:

```text
CAPACIDAD
Consultar revisiones de productos.

MODALIDAD
BASE_ONLY

RECURSO
PRODUCT_REVIEW_QUEUE

CLAVE
review_id o filtro de cola

ALCANCE
ORG exacto
```

La capacidad permite consultar la cola organizacional de revisión dentro del alcance base autorizado.

No concede:

- aprobar producto;
- rechazar solicitud;
- crear producto;
- crear presentación;
- modificar proveedor;
- mover inventario;
- registrar recepción;
- convertir filtros de sede en autoridad territorial.

---

#### 17. Regla BASE_ONLY de revisión de productos

Para esta capacidad:

```text
turno
check-in
rol operativo
gerencia_operativa
bodeguero
```

no pueden fabricar autoridad.

Un filtro por sede puede reducir una cola mostrada, pero no transforma `PRODUCT_REVIEW_QUEUE` en recurso territorial de sede.

El permiso se resuelve exclusivamente desde el carril base y la cobertura organizacional aprobada.

---

#### 18. Matriz canónica de modalidad y contexto

| Permiso | Modalidad | Carril operativo | Prerrequisito operativo | Recurso principal |
| --- | --- | --- | --- | --- |
| `origo.procurement.purchase_orders.view` | `BASE_OR_OPERATIONAL` | sí | `T+C` | `PURCHASE_ORDER` |
| `origo.procurement.receipts.view` | `BASE_OR_OPERATIONAL` | sí | `T+C` | `PURCHASE_RECEIPT` |
| `origo.procurement.suppliers.view` | `BASE_OR_OPERATIONAL` | sí | `T` | `SUPPLIER` |
| `origo.catalog.product_reviews.view` | `BASE_ONLY` | no | no aplica | `PRODUCT_REVIEW_QUEUE` |

No existe equivalencia entre estas cuatro decisiones.

---

#### 19. Matriz base — asignaciones positivas

Las matrices canónicas existentes conceden las cuatro capacidades según rol base de la siguiente forma:

| Rol base | Órdenes | Recepciones | Proveedores | Revisiones de producto |
| --- | --- | --- | --- | --- |
| `propietario` | ASIGNAR | ASIGNAR | ASIGNAR | ASIGNAR |
| `gerente_general` | ASIGNAR | ASIGNAR | ASIGNAR | ASIGNAR |
| `gerente` | ASIGNAR | ASIGNAR | ASIGNAR | ASIGNAR |
| `supervisor` | ASIGNAR | ASIGNAR | ASIGNAR | NO ASIGNAR |
| `auxiliar_administrativa` | ASIGNAR | ASIGNAR | ASIGNAR | ASIGNAR |
| `contador` | ASIGNAR | ASIGNAR | ASIGNAR | NO ASIGNAR |

La asignación nunca elimina el scope propio del recurso ni la protección de campos.

---

#### 20. Roles base sin consulta ORIGO ordinaria

Las matrices vigentes niegan por defecto las cuatro capacidades a `marketing`.

La ausencia de asignación expresa se interpreta como:

```text
DENY
```

No como “permitir porque tiene acceso a la aplicación”.

---

#### 21. Matriz operativa

| Rol operativo | Órdenes | Recepciones | Proveedores | Revisiones de producto |
| --- | --- | --- | --- | --- |
| `bodeguero` | ASIGNAR OPERATIVO | ASIGNAR OPERATIVO | ASIGNAR OPERATIVO | NO ASIGNAR |
| `gerencia_operativa` | ASIGNAR OPERATIVO | ASIGNAR OPERATIVO | ASIGNAR OPERATIVO | NO ASIGNAR |
| `conductor_logistica` | NO ASIGNAR | NO ASIGNAR | NO ASIGNAR | NO ASIGNAR |
| `cajero_satelite` | NO ASIGNAR | NO ASIGNAR | NO ASIGNAR | NO ASIGNAR |
| `barista_satelite` | NO ASIGNAR | NO ASIGNAR | NO ASIGNAR | NO ASIGNAR |
| `cocinero_satelite` | NO ASIGNAR | NO ASIGNAR | NO ASIGNAR | NO ASIGNAR |
| `servicio_salon` | NO ASIGNAR | NO ASIGNAR | NO ASIGNAR | NO ASIGNAR |
| `mostrador_satelite` | NO ASIGNAR | NO ASIGNAR | NO ASIGNAR | NO ASIGNAR |
| `operador_integral_satelite` | NO ASIGNAR | NO ASIGNAR | NO ASIGNAR | NO ASIGNAR |
| `produccion_cocina` | NO ASIGNAR | NO ASIGNAR | NO ASIGNAR | NO ASIGNAR |
| `produccion_panaderia` | NO ASIGNAR | NO ASIGNAR | NO ASIGNAR | NO ASIGNAR |
| `produccion_reposteria` | NO ASIGNAR | NO ASIGNAR | NO ASIGNAR | NO ASIGNAR |

Estas decisiones no crean nuevas filas RBAC; esta tarea las consume como contrato vigente.

---

#### 22. Proyección operativa del bodeguero

Para `bodeguero`, la consulta queda acotada a:

```text
ORDEN
→ aprobada o vigente
→ destino receptor compatible con sede/bodega activa
→ campos necesarios para recepción

RECEPCIÓN
→ vinculada a sede/bodega activa
→ cantidades, diferencias y estado

PROVEEDOR
→ identidad mínima necesaria para entrega/documentos
```

Quedan excluidos:

- datos bancarios;
- negociación;
- contratos;
- precios no necesarios;
- administración del maestro;
- revisión administrativa de productos.

---

#### 23. Proyección operativa de gerencia_operativa

`gerencia_operativa` puede consultar órdenes, recepciones y proyección mínima de proveedores únicamente cuando estén vinculadas con entregas o abastecimientos de la sede activa.

La consulta operativa exige:

```text
actor activo
+
turno publicado y vigente
+
check-in cuando el permiso sea T+C
+
sede/área compatibles
+
permiso exacto
+
recurso resuelto en servidor
```

Nunca produce alcance global.

---

#### 24. Dispositivo compartido

La compatibilidad aprobada es:

| Permiso | Requisito de dispositivo |
| --- | --- |
| `origo.procurement.purchase_orders.view` | `STANDARD` |
| `origo.procurement.receipts.view` | `STANDARD` |
| `origo.procurement.suppliers.view` | `STANDARD` |
| `origo.catalog.product_reviews.view` | `STRONG` |

El dispositivo no satisface por sí mismo:

- actor efectivo;
- turno;
- check-in;
- permiso;
- territorio;
- scope de recurso.

`STRONG` para revisión de productos exige reautenticación fuerte en terminal autorizada y no convierte esa capacidad en operativa.

---

#### 25. Simulación

La simulación conserva la siguiente exposición:

| Permiso | Exposición simulada |
| --- | --- |
| `origo.procurement.purchase_orders.view` | `DECISION` |
| `origo.procurement.receipts.view` | `DECISION` |
| `origo.procurement.suppliers.view` | `DECISION` |
| `origo.catalog.product_reviews.view` | `FULL` con datos sintéticos, vacíos o enmascarados |

`DECISION` significa que la simulación puede mostrar decisión y razones, pero no documentos reales de compra, recepciones ni información comercial real del proveedor.

`FULL` en revisión de productos no concede datos reales: solo permite previsualizar navegación/componentes con datos sintéticos, vacíos o enmascarados. Los datos reales siguen dependiendo de la autorización real del actor.

---

#### 26. Binding de rutas de consulta

El binding objetivo queda:

| Ruta / superficie | Permiso mínimo de consulta | Nota |
| --- | --- | --- |
| `/purchase-orders` | `origo.procurement.purchase_orders.view` | listado y filtros autorizados |
| `/purchase-orders/[id]` | `origo.procurement.purchase_orders.view` | detalle del recurso autorizado |
| `GET /purchase-orders/[id]/pdf` con sesión interna | `origo.procurement.purchase_orders.view` | además de las reglas específicas del documento |
| `/suppliers` | `origo.procurement.suppliers.view` | directorio/proyección según carril |
| `/receipts` | `origo.procurement.receipts.view` | cola/historial autorizado |
| `/product-master-review` | `origo.catalog.product_reviews.view` | carril base únicamente |

Las rutas mutantes no quedan autorizadas por esta matriz.

---

#### 27. Rutas mutantes que NO quedan autorizadas por `.view`

El permiso de consulta no basta para:

```text
/purchase-orders/new
/purchase-orders/[id]/edit
/suppliers/new
/suppliers/[id]/edit
/receipts/new
```

Estas superficies pueden consultar datos auxiliares necesarios para su formulario, pero el acceso y las acciones mutantes deben quedar gobernados por las capacidades específicas que definan `ORIGO-AUTH-005..008` y por los contratos transversales correspondientes.

La existencia de un permiso `.view` nunca se interpreta como permiso implícito de crear, editar, aprobar, recibir, corregir o eliminar.

---

#### 28. Binding de pantallas canónicas

| Pantalla | Consulta propietaria | Regla |
| --- | --- | --- |
| `VSCREEN-0070 — Catálogo de proveedores` | `origo.procurement.suppliers.view` | consulta del catálogo según scope |
| `VSCREEN-0071 — Alta y expediente de proveedor` | `origo.procurement.suppliers.view` para la parte de lectura | acciones de alta/edición requieren permiso mutante separado |
| `VSCREEN-0073 — Editor de orden de compra` | `origo.procurement.purchase_orders.view` solo para lectura de contexto | editar/crear no queda autorizado |
| `VSCREEN-0075 — Detalle y seguimiento de orden` | `origo.procurement.purchase_orders.view` | consulta del recurso y seguimiento permitido |
| `VSCREEN-0076 — Cola de recepciones` | `origo.procurement.receipts.view` | consulta de recepciones pendientes/relacionadas |
| `VSCREEN-0077 — Recepción total o parcial` | `origo.procurement.receipts.view` solo para leer contexto | registrar recepción requiere capacidad mutante separada |
| `VSCREEN-0078 — Resolución de diferencias de recepción` | `origo.procurement.receipts.view` solo para leer contexto | resolver/corregir requiere capacidad separada |
| `VSCREEN-0079 — Historial y auditoría de abastecimiento` | autorización por recurso mostrado | no existe permiso compuesto que sustituya los permisos de cada recurso |
| `VSCREEN-0145 — Contratos, precios y condiciones de proveedor` | `origo.procurement.suppliers.view` solo para identidad/proyección general | campos sensibles se rigen por `ORIGO-AUTH-010` |
| `VSCREEN-0146 — Desempeño y reclamaciones de proveedor` | `origo.procurement.suppliers.view` para identidad/proyección permitida | gestionar reclamaciones o datos sensibles no nace del `.view` |

---

#### 29. Regla para pantallas compuestas

Una pantalla que combina orden, proveedor y recepción no recibe un permiso “superior” por composición.

Debe evaluar cada recurso:

```text
SECCIÓN DE ORDEN
→ purchase_orders.view

SECCIÓN DE RECEPCIÓN
→ receipts.view

FICHA COMPLETA DE PROVEEDOR
→ suppliers.view

COLA DE REVISIÓN DE PRODUCTO
→ product_reviews.view
```

Una proyección mínima embebida puede formar parte del contrato del recurso principal cuando así esté aprobado.

Ejemplo:

```text
purchase_orders.view
→ puede mostrar identidad mínima del proveedor dentro de la orden
→ NO concede abrir el directorio completo de proveedores
```

---

#### 30. Menú y navegación

La visibilidad de navegación debe derivar del permiso objetivo correspondiente, pero:

```text
MENÚ VISIBLE
!=
AUTORIZACIÓN DEL RECURSO
```

Y:

```text
MENÚ OCULTO
!=
PROTECCIÓN SUFICIENTE DE URL DIRECTA
```

Toda URL directa debe producir la misma decisión server-side que la navegación ordinaria.

---

#### 31. Documento PDF interno de orden

El handler `GET /purchase-orders/[id]/pdf` conserva dos canales conceptualmente distintos:

1. acceso interno autenticado;
2. acceso externo mediante token válido conforme al contrato específico del documento.

Para el canal interno:

```text
origo.access
```

por sí solo no es permiso suficiente de consulta de la orden.

El permiso de recurso aplicable es:

```text
origo.procurement.purchase_orders.view
```

El canal externo por token no se convierte en asignación RBAC y su protección de secreto, scope, vigencia y campos permanece en `ORIGO-AUTH-010` y requisitos existentes.

---

#### 32. Brecha AS-IS — compras

El runtime verificado de:

```text
/purchase-orders
/purchase-orders/[id]
/purchase-orders/new
/purchase-orders/[id]/edit
```

usa actualmente `requireAppAccess({ appId: "origo" })` sin demostrar en esas páginas un `permissionCode` específico de órdenes.

Clasificación:

```text
AS_IS_GAP_PURCHASE_ORDER_VIEW_BINDING
```

Propietario de salida:

- `ORIGO-AUTH-004` congela el permiso objetivo;
- la materialización posterior deberá usar el catálogo/guard compartido sin ampliar alcance;
- `ORIGO-AUTH-009` conserva la limitación territorial;
- `ORIGO-AUTH-010` conserva los campos sensibles.

Condición de salida:

```text
consulta de orden directa y navegación
→ misma decisión con purchase_orders.view
→ scope de recurso aplicado
→ campos autorizados
```

---

#### 33. Brecha AS-IS — recepción

El runtime de recepción usa:

```text
procurement.receipts
```

y lo normaliza como:

```text
origo.procurement.receipts
```

mientras el catálogo canónico vigente define:

```text
origo.procurement.receipts.view
```

Clasificación:

```text
AS_IS_LEGACY_PERMISSION_ALIAS_RECEIPTS
```

Esta tarea no modifica el consumidor ni crea alias nuevo.

Condición de salida:

```text
superficie de consulta de recepción
→ permission key canónico .view
→ compatibilidad legacy solo en frontera de migración aprobada
```

---

#### 34. Brecha AS-IS — proveedores

El runtime observado conserva simultáneamente:

```text
origo.suppliers.view
origo.suppliers.manage
fallback por roles locales
```

mientras el catálogo canónico de consulta define:

```text
origo.procurement.suppliers.view
```

Clasificación:

```text
AS_IS_LEGACY_PERMISSION_ALIAS_SUPPLIERS
AS_IS_ROLE_FALLBACK_SUPPLIERS
```

El permiso de consulta no hereda `manage` y una lista local de roles no puede conceder autoridad final.

Propietarios de salida:

- consulta: contrato fijado por esta tarea;
- creación/edición/activación/desactivación: `ORIGO-AUTH-005..008` según acción;
- campos sensibles: `ORIGO-AUTH-010`;
- enforcement transversal: tareas AUTH/SHELL propietarias.

---

#### 35. Brecha AS-IS — revisión de productos

La superficie `/product-master-review` utiliza actualmente como permiso:

```text
procurement.receipts
/
origo.procurement.receipts
```

El catálogo canónico define:

```text
origo.catalog.product_reviews.view
```

Clasificación:

```text
AS_IS_WRONG_RESOURCE_PERMISSION_PRODUCT_REVIEW
```

La revisión de productos es `BASE_ONLY` y no puede obtener autoridad por reutilizar el permiso operativo de recepción.

Condición de salida:

```text
/product-master-review
→ product_reviews.view
→ carril base
→ ORG exacto
→ sin autoridad operativa fabricada desde sede/recepción
```

---

#### 36. Brecha AS-IS — sincronización de navegación

`scripts/sync-navigation.mjs` conserva claves legacy o pre-canónicas para las superficies ORIGO relevantes:

```text
origo.procurement.purchase_orders
origo.procurement.receipts
origo.suppliers.view
origo.product_master_review.view
```

El binding objetivo de consulta es:

```text
origo.procurement.purchase_orders.view
origo.procurement.receipts.view
origo.procurement.suppliers.view
origo.catalog.product_reviews.view
```

La tarea no modifica el script.

Condición de salida posterior:

```text
required_permission_code
→ clave canónica activa o alias de compatibilidad explícitamente aprobado
→ sin strings huérfanos
```

---

#### 37. Denegaciones obligatorias

La consulta se deniega cuando cualquiera de estas condiciones requeridas falla:

- sesión/principal inválidos;
- `origo.access` inválido cuando aplica;
- permiso de recurso ausente;
- permiso legacy sin reconciliación válida;
- recurso inexistente;
- recurso fuera de scope;
- sede/área incompatibles cuando aplican;
- turno inválido para carril operativo;
- check-in ausente cuando el permiso exige `T+C`;
- rol operativo no autorizado;
- dispositivo incompatible;
- proyección solicitada excede campos permitidos;
- decisión de simulación intenta mostrar datos reales fuera de su modo;
- fallo técnico impide demostrar autorización.

No se transforma un error técnico en `ALLOW`.

---

#### 38. Resultado contractual consolidado

```text
PERMISOS DE CONSULTA: 4

purchase_orders.view
→ PURCHASE_ORDER
→ BASE_OR_OPERATIONAL
→ T+C operativo

receipts.view
→ PURCHASE_RECEIPT
→ BASE_OR_OPERATIONAL
→ T+C operativo

suppliers.view
→ SUPPLIER
→ BASE_OR_OPERATIONAL
→ T operativo

product_reviews.view
→ PRODUCT_REVIEW_QUEUE
→ BASE_ONLY
```

La tarea fija permiso, modalidad, recurso, scope, proyección y binding objetivo sin crear mutaciones.

---

#### 39. Hallazgos diferidos y propietarios

| Hallazgo | Bloquea esta definición | Propietario | Condición de salida |
| --- | --- | --- | --- |
| páginas de compra protegidas solo por acceso general | no | materialización posterior de autorización ORIGO + `ORIGO-AUTH-009/010` | permiso exacto y scope aplicados en servidor |
| recepción usa clave sin `.view` | no | migración/adopción posterior ORIGO | consumidor usa clave canónica o alias aprobado |
| proveedores usan aliases y fallback por rol | no | `ORIGO-AUTH-005..010` + fundación AUTH | operaciones atómicas y consulta usan catálogo canónico |
| revisión de productos reutiliza permiso de recepción | no | adopción posterior ORIGO | usa `origo.catalog.product_reviews.view` BASE_ONLY |
| navegación sincroniza claves legacy | no | paquete de adopción de contratos/navegación | `required_permission_code` reconciliado |
| PDF interno solo demuestra acceso general | no | `ORIGO-AUTH-004`, `ORIGO-AUTH-009`, `ORIGO-AUTH-010` en materialización | consulta interna exige permiso de orden y scope |

Ningún hallazgo autoriza una escritura en esta tarea.

---

#### 40. Requisitos de prueba derivados

**NO GENERA REQUISITOS DE PRUEBA.**

**Requisitos creados:** 0
**Requisitos modificados:** 0
**Requisitos diferidos:** 0
**Requisitos obsoletos:** 0

Justificación: la lectura por permiso exacto, la prohibición de confiar en roles locales, la separación base/operativo, el scope territorial, la protección contra URL directa, el uso de claves canónicas y la limitación de datos sensibles ya poseen cobertura en el registro vigente. Esta tarea especializa esas obligaciones para los cuatro recursos de consulta ORIGO sin introducir una regla verificable nueva.

---

#### 41. Cobertura de prueba vigente reutilizada

Trazabilidad existente, sin actualización del Registro 04A:

- `TREQ-ORIGO-002` — lectura y mutación de órdenes limitadas por permiso, sede/centro de costo, estado y columnas;
- `TREQ-ORIGO-004` — segregación del ciclo de abastecimiento y capacidades separadas;
- `TREQ-ORIGO-005` — identidad y protección del maestro de proveedores y datos sensibles;
- `TREQ-ORIGO-014` — páginas protegidas fallan cerradas ante ausencia de autorización/contexto;
- `TREQ-AUTH-001` — autorización final no puede derivar de listas locales de roles;
- `TREQ-AUTH-002` — todo permission key consumido debe existir en el catálogo vigente;
- `TREQ-AUTH-008` — separación entre carril base y operativo;
- `TREQ-AUTH-009` — resolución territorial determinista y denegación de cruces;
- `TREQ-AUTH-013` — URL/API/RPC no pueden eludir autorización server-side;
- `TREQ-AUTH-014` — cambios de contexto invalidan autoridad derivada;
- `TREQ-AUTH-015` — decisiones protegidas conservan evidencia correlacionable.

---

#### 42. Evidencia de validación

| Clase | Estado | Evidencia |
| --- | --- | --- |
| BUILD | NOT_EXECUTED | No se ejecutó `docs:plan:build` contra un checkout local actualizado durante la preparación del artefacto. |
| LOCAL | NOT_EXECUTED | No se insertó la tarea en un checkout real ni se ejecutaron los validadores locales del repositorio. |
| REMOTA | PASS | Se consultaron `vento-shell/main`, `vento-origo/main`, owner, continuidad, topología, catálogos, matrices, 04A y código consumidor vigente. |
| OPERATIVA | NOT_EXECUTED | No se inició sesión ni se ejecutaron rutas ORIGO con actores reales, simulados o dispositivos compartidos. |
| FÍSICA | NOT_APPLICABLE | `DEFINE_ONCE` / `NO_PHYSICAL_INSTANCE`; esta tarea no tiene materialización física propia. |

---

#### 43. Criterios de aceptación

- [x] Existen exactamente cuatro permisos de consulta ORIGO distintos de `origo.access`.
- [x] Los cuatro IDs coinciden con el catálogo canónico vigente.
- [x] Tres permisos conservan `BASE_OR_OPERATIONAL` y uno `BASE_ONLY`.
- [x] Órdenes y recepciones conservan prerrequisito operativo `T+C`.
- [x] Proveedores conserva prerrequisito operativo `T`.
- [x] Revisión de productos no adquiere carril operativo.
- [x] Cada permiso conserva su recurso canónico.
- [x] El proveedor no se convierte en recurso propiedad de una sede.
- [x] Las pantallas compuestas autorizan cada recurso por separado.
- [x] `.view` no concede crear, editar, aprobar, recibir, corregir, reversar ni eliminar.
- [x] Se preservan asignaciones y denegaciones de matrices RBAC vigentes.
- [x] Se preserva compatibilidad de dispositivo `STANDARD` / `STRONG`.
- [x] Se preserva comportamiento de simulación `DECISION` / `FULL` según permiso.
- [x] Se identifican los permission keys legacy observados sin convertirlos en destino canónico.
- [x] Se identifica la brecha de páginas de compra protegidas solo por acceso general.
- [x] Se identifica la reutilización incorrecta del permiso de recepción en revisión de productos.
- [x] Se identifica la brecha del PDF interno sin crear un nuevo canal de autoridad.
- [x] Toda brecha tiene propietario y condición de salida.
- [x] No se crea ningún permiso mutante.
- [x] No se crea ni modifica requisito de prueba.
- [x] No se modifica Registro 04A.
- [x] No se autoriza código, Supabase, migración, datos ni despliegue.

---

#### 44. Límites

Esta tarea no:

- crea permisos de creación;
- crea permisos de aprobación;
- crea permisos de recepción;
- crea permisos de corrección;
- define autorización final de eliminación;
- modifica matrices RBAC;
- convierte `origo.access` en permiso de recurso;
- aprueba aliases legacy como claves objetivo;
- decide el mecanismo físico de migración de aliases;
- implementa guards;
- modifica `has_permission`;
- modifica RLS;
- modifica RPC;
- cambia el sincronizador de navegación;
- modifica rutas ORIGO;
- modifica `vento-origo`;
- modifica Supabase;
- crea migraciones;
- cambia datos reales;
- ejecuta pruebas operativas;
- desarrolla `ORIGO-AUTH-005`.

---

#### 45. Continuidad

**ÚLTIMA TAREA APROBADA**
`ORIGO-AUTH-003 — Inventariar vistas de recepción`

**TAREA ACTUAL APROBADA**
`ORIGO-AUTH-004 — Definir permisos de consulta`

**SIGUIENTE TAREA RESERVADA**
`ORIGO-AUTH-005 — Definir permisos de creación`

### ✅ ORIGO-AUTH-005 — Definir permisos de creación

**Estado:** APROBADA
**Tarea anterior:** ORIGO-AUTH-004 — Definir permisos de consulta
**Tarea siguiente:** ORIGO-AUTH-006 — Definir permisos de aprobación
**Tipo de tarea:** documental; definición cerrada de las capacidades de creación de ORIGO ya reservadas por las fuentes canónicas, con identidad, recurso, modalidad, alcance, actor objetivo, denegaciones, separación frente a aprobación/recepción/corrección, binding a superficies y reconciliación del runtime AS-IS, sin activar todavía las claves en el catálogo compartido ni realizar materialización física; `DEFINE_ONCE` / `NO_PHYSICAL_INSTANCE`
**Bloque:** BLOQUE M — ORIGO
**Repositorio propietario:** `vento-group-sas/vento-shell`
**Archivo propietario:** `docs/plan-canonico/modular/bloques/M_ORIGO/01_AUTORIZACION_DE_COMPRAS.md`
**Estado físico resultante:** `NO_PHYSICAL_INSTANCE`
**Cambios físicos autorizados:** ninguno; esta tarea no modifica código, catálogo compartido, matrices físicas, navegación, Server Actions, RLS, RPC, tablas, datos, Supabase, migraciones, Storage, secretos, consumidores ni despliegues
**Requisitos de prueba creados o modificados:** 0

---

#### 1. Propósito

Definir de forma cerrada y verificable las capacidades de **creación** que ORIGO necesita para separar la autoridad de crear una orden de compra y la autoridad de crear un proveedor de las capacidades de consulta, aprobación, recepción, corrección, activación y administración sensible.

La decisión contractual queda:

```text
CREAR RECURSO
!=
CONSULTAR RECURSO
!=
APROBAR RECURSO
!=
RECIBIR COMPRA
!=
CORREGIR RECURSO
!=
ACTIVAR PROVEEDOR
```

La tarea consume los inventarios aprobados de órdenes y proveedores y el contrato de consulta definido por `ORIGO-AUTH-004`.

No activa físicamente nuevos permisos en `vento-shell` ni modifica el consumidor ORIGO. La incorporación física y contractual compartida permanece reservada a `ORIGO-AUTH-014`.

---

#### 2. Frontera recibida de ORIGO-AUTH-004

`ORIGO-AUTH-004` dejó cerradas cuatro capacidades de consulta y una regla obligatoria:

```text
VIEW != CREATE
```

Por tanto:

- `origo.procurement.purchase_orders.view` no permite crear una orden;
- `origo.procurement.suppliers.view` no permite crear un proveedor;
- `origo.access` no permite crear ningún recurso interno;
- una página visible no concede autoridad mutante;
- un dato precargado no concede autoridad sobre el recurso;
- la autoridad final debe comprobarse en servidor antes del primer efecto.

La presente tarea desarrolla únicamente la creación y conserva reservadas:

```text
ORIGO-AUTH-006 → aprobación
ORIGO-AUTH-007 → recepción
ORIGO-AUTH-008 → corrección / update / activación / desactivación / retiro
ORIGO-AUTH-009 → sede y centro de costo de órdenes
ORIGO-AUTH-010 → precios, condiciones y datos sensibles
```

---

#### 3. Naturaleza y topología

La topología vigente para `ORIGO-AUTH-001..008` es:

```text
mode = DEFINE_ONCE
execution_gate = NO_PHYSICAL_INSTANCE
```

Resultado:

```text
CONTRATO DOCUMENTAL ÚNICO
→ SIN INSTANCIA FÍSICA PROPIA
→ SIN MIGRACIÓN
→ SIN CAMBIO DE RUNTIME
```

La tarea define qué debe significar una decisión de creación para ORIGO. La materialización posterior deberá consumir este contrato sin reinterpretarlo.

---

#### 4. Fuentes y snapshots verificados

La definición se construye sobre evidencia actual y verificable:

```text
vento-shell/main
20002e284aa472814e7e606829d5ca7216375e53

vento-origo/main
70860f1ca5f0a4a73e894cbb840956f9f7eda2ad

owner remoto:
docs/plan-canonico/modular/bloques/M_ORIGO/01_AUTORIZACION_DE_COMPRAS.md

owner blob:
fe019cc375d804d31b1cba2e74c9df0c40b421bc

base aprobada usada:
ORIGO-AUTH-004_APROBADA_PARA_REEMPLAZAR.md

base SHA-256:
d1d44d462ea06f40457b1613426c2101030a7285bdf7601c2f26e652280d8b74
```

También se verificaron:

- convención canónica de permisos;
- normalización de proveedores;
- modalidades y clasificaciones;
- contratos de alcance, contexto y recurso;
- matrices RBAC vigentes;
- procesos y pantallas de ORIGO;
- requisitos vigentes ORIGO y AUTH;
- código actual de creación de órdenes y proveedores;
- scripts y validadores documentales vigentes.

---

#### 5. Universo exacto de capacidades de creación

La tarea materializa exactamente **dos** identidades de creación:

```text
origo.procurement.purchase_orders.create
origo.procurement.suppliers.create
```

Estado de procedencia:

| Capacidad | Evidencia canónica previa | Situación frente al catálogo activo de 112 |
| --- | --- | --- |
| `origo.procurement.purchase_orders.create` | ejemplo canónico ORIGO y capacidad futura explícita | no forma parte del conjunto activo de cinco permisos ORIGO |
| `origo.procurement.suppliers.create` | descomposición requerida de `origo.suppliers.manage` | no forma parte del conjunto activo de cinco permisos ORIGO |

Estas identidades **no son inventadas por esta tarea**. Ya estaban reservadas por las fuentes canónicas.

La tarea tampoco incorpora:

```text
origo.procurement.receipts.register
origo.procurement.purchase_orders.approve
origo.procurement.suppliers.update
origo.procurement.suppliers.activate
origo.procurement.suppliers.deactivate
```

porque pertenecen a tareas posteriores del mismo minibloque.

---

#### 6. Estado contractual frente al catálogo compartido

El catálogo canónico activo de ORIGO continúa teniendo cinco permisos y todos son de solo lectura.

Por tanto, esta tarea distingue:

```text
IDENTIDAD OBJETIVO DEFINIDA
!=
CLAVE ACTIVA EN CATÁLOGO COMPARTIDO
!=
GRANT MATERIALIZADO
!=
ENFORCEMENT EN RUNTIME
```

`ORIGO-AUTH-005` define el contrato objetivo de las dos capacidades.

`ORIGO-AUTH-014` será responsable de migrar estas decisiones a los paquetes compartidos y al catálogo versionado cuando corresponda.

Hasta esa migración:

- no se debe afirmar que la clave ya exista en el dataset activo;
- no se debe sembrar un grant físico por inferencia;
- no se debe reemplazar una clave legacy sin compatibilidad gobernada;
- no se debe considerar corregido el consumidor ORIGO.

---

#### 7. Regla común de autorización de creación

Una creación solo puede proceder cuando exista simultáneamente:

```text
CREATE_ALLOW
=
APP_ACCESS
AND
EXACT_CREATE_PERMISSION
AND
BASE_LANE_VALID
AND
RESOURCE_INPUT_VALID
AND
TERRITORY_OR_ORG_SCOPE_VALID
AND
UPSTREAM_RELATIONS_VALID
AND
FIELD_WRITE_SET_VALID
AND
CURRENT_POLICY_VALID
```

Ausencia o indeterminación de cualquiera de esas dimensiones produce:

```text
DENY
```

No son fuentes suficientes de autoridad:

- visibilidad del botón;
- acceso a ORIGO;
- conocimiento de un identificador;
- query parameter;
- valor oculto de formulario;
- cookie;
- lista local de roles;
- permiso `.view`;
- permiso legacy amplio;
- pertenencia nominal a una sede;
- prefill recibido desde cliente.

---

#### 8. `origo.procurement.purchase_orders.create`

Identidad:

```text
PERMISSION:
origo.procurement.purchase_orders.create

ACCIÓN:
create

RECURSO:
PURCHASE_ORDER

APLICACIÓN:
origo

MÓDULO:
procurement
```

Significado:

> Permite materializar una orden de compra en estado no aprobado y no emitido, con cabecera y líneas válidas, dentro del ámbito autorizado del actor y sin conceder por ese hecho aprobación, emisión, recepción, corrección o eliminación.

La creación debe ser una operación empresarial separada de la decisión de aprobar.

---

#### 9. Resultado permitido de la creación de orden

La creación puede materializar un objeto de trabajo que todavía no represente compromiso aprobado ni emisión al proveedor.

Invariantes:

```text
CREATE
→ NO APPROVED
→ NO ORDER_ISSUED
→ NO SUPPLIER_ACK
→ NO RECEIPT
→ NO PAYMENT
```

El literal AS-IS:

```text
status = draft
```

se conserva como evidencia del runtime actual y **no se eleva** a estado canónico de `VPROC-0021`.

La relación con los estados canónicos debe respetar:

```text
VPROC-0021.PURCHASE_REQUEST_PENDING_APPROVAL
VPROC-0021.UNDER_REVIEW
VPROC-0021.PENDING_APPROVAL
VPROC-0021.APPROVED
VPROC-0021.ORDER_PREPARING
VPROC-0021.ORDER_ISSUED
VPROC-0021.SUPPLIER_ACK_PENDING
VPROC-0021.PURCHASE_COMMITMENT_FORMALIZED
```

La capacidad `create` nunca permite saltar directamente a `APPROVED`, `ORDER_ISSUED` ni al estado final.

---

#### 10. Entradas mínimas para crear una orden

El runtime actual evidencia, como mínimo:

```text
supplier_id
site_id
expected_at
notes
líneas
product_id
presentation_id
quantity
unit_cost
```

y resuelve además:

- producto activo;
- `product_type = insumo`;
- presentación activa;
- presentación perteneciente al producto;
- relación producto–proveedor;
- conversión hacia unidad de stock;
- costo de línea;
- total derivado.

La tarea no declara que todo valor enviado por cliente sea autoritativo.

Regla:

```text
CLIENT_INPUT
→ VALIDAR
→ RESOLVER RELACIONES EN SERVIDOR
→ AUTORIZAR
→ ESCRIBIR
```

---

#### 11. Relación con proveedor y catálogo

`purchase_orders.create` no concede:

```text
origo.procurement.suppliers.create
origo.procurement.suppliers.update
nexo.catalog.products.create
```

El proveedor, producto y presentación deben existir y ser admisibles antes de consumirse en la orden.

La relación producto–proveedor tampoco se fabrica por crear una orden.

Si una entrada referencia:

- proveedor inexistente;
- proveedor no admisible;
- producto inactivo;
- presentación inválida;
- relación producto–proveedor inexistente;

la creación falla cerrada.

---

#### 12. Territorio de la orden

La orden contiene al menos una sede objetivo en el runtime actual.

Por tanto:

```text
site_id EN FORMULARIO
!=
AUTORIDAD SOBRE LA SEDE
```

`purchase_orders.create` requiere que el territorio objetivo sea compatible con la cobertura administrativa del actor.

La política exacta para:

- sede;
- multisede;
- centro de costo;
- lados obligatorios de una relación;
- cruces territoriales;

permanece propietaria de `ORIGO-AUTH-009`.

Esta tarea no redefine esas reglas.

---

#### 13. Modalidad de `purchase_orders.create`

La creación de una orden pertenece al carril administrativo.

Decisión:

```text
origo.procurement.purchase_orders.create
→ BASE_ONLY
```

Justificación:

- `VPROC-0021` no admite rol operativo directo;
- crear la orden no es una acción física de recepción;
- un turno operativo no crea autoridad de compra;
- `gerencia_operativa` puede consultar contexto de abastecimiento sin adquirir autoridad para crear la obligación;
- la creación administrativa debe poder operar sin check-in cuando el rol base y la cobertura sean válidos.

Por tanto:

```text
OPERATIVE_LANE
→ DENY
```

para esta capacidad.

---

#### 14. Política objetivo de grants base para crear órdenes

La nueva capacidad no puede heredarse automáticamente desde los grants `.view`.

La decisión objetivo es:

| Rol base | Decisión | Alcance objetivo | Condición |
| --- | --- | --- | --- |
| `propietario` | `ASIGNAR` | organización productiva ordinaria | no concede aprobación automática |
| `gerente_general` | `ASIGNAR` | organización productiva ordinaria | no concede aprobación automática |
| `gerente` | `ASIGNAR` | sedes y relaciones dentro de su cobertura administrativa | territorio final se cierra en la 009 |
| `auxiliar_administrativa` | `ASIGNAR` | soporte documental de compras dentro de cobertura administrativa | puede preparar; no aprobar |
| `supervisor` | `NO_ASIGNAR` | — | seguimiento local no equivale a creación administrativa |
| `contador` | `NO_ASIGNAR` | — | consulta y conciliación no permiten crear órdenes |
| `marketing` | `NO_ASIGNAR` | — | fuera del dominio de abastecimiento |
| `trabajador_operativo` | `NO_ASIGNAR` | — | el rol base operativo no crea órdenes |

Esta matriz es el **objetivo contractual** de `ORIGO-AUTH-005`.

No modifica todavía los datasets físicos del BLOQUE D.

---

#### 15. Separación respecto de aprobación

Un actor con:

```text
purchase_orders.create = ALLOW
```

no obtiene por inferencia:

```text
purchase_orders.approve
```

La regla es:

```text
CREADOR
!=
APROBADOR
```

La misma persona podría poseer ambas capacidades por una matriz posterior válida, pero cada acción debe evaluarse por separado.

La política de aprobación, segregación, importe, urgencia y excepción pertenece a:

```text
ORIGO-AUTH-006
```

---

#### 16. Binding de orden de compra

Superficie principal:

```text
VSCREEN-0073 — Editor de orden de compra
```

Representación AS-IS:

```text
/purchase-orders/new
```

Acción observada:

```text
createPurchaseOrder
```

Binding objetivo:

```text
VSCREEN-0073
+
acción create
→ origo.procurement.purchase_orders.create
```

La misma pantalla puede consultar recursos auxiliares mediante permisos de lectura separados.

---

#### 17. Brecha AS-IS — creación de orden

El runtime actual observa:

```text
/purchase-orders/new
→ requireAppAccess(origo)
→ carga proveedores y sedes
→ createPurchaseOrder
```

Dentro de `createPurchaseOrder` se observa:

- usuario autenticado;
- `supplier_id`;
- `site_id`;
- validación de líneas;
- validación de producto/presentación/proveedor;
- `created_by = user.id`;
- creación `status = draft`;
- inserción de líneas;
- cálculo posterior de total.

No se observa en la propia acción:

```text
has_permission("origo.procurement.purchase_orders.create")
```

Resultado:

```text
AS_IS_GAP_PURCHASE_ORDER_CREATE_BINDING
```

Esto significa que el enforcement exacto no queda demostrado por la acción inspeccionada. No constituye por sí solo una afirmación sobre RLS u otras capas no observadas.

---

#### 18. `origo.procurement.suppliers.create`

Identidad:

```text
PERMISSION:
origo.procurement.suppliers.create

ACCIÓN:
create

RECURSO:
SUPPLIER

APLICACIÓN:
origo

MÓDULO:
procurement
```

Significado:

> Permite crear la identidad y el expediente inicial de un proveedor dentro del ámbito organizacional autorizado, sin conceder por sí sola actualización, activación, desactivación, eliminación, contratos, precios sensibles ni autoridad de compra.

La identidad proviene de la descomposición canónica exigida para `origo.suppliers.manage`.

---

#### 19. Proveedor como recurso organizacional

Un proveedor no pertenece a `employee_sites`.

Regla:

```text
SUPPLIER
→ RECURSO ORGANIZACIONAL / RELACIONAL

EMPLOYEE_SITE
→ COBERTURA DEL ACTOR

EMPLOYEE_SITE
!=
PROPIEDAD DEL SUPPLIER
```

La creación debe resolver:

- organización o unidad empresarial aplicable;
- identidad suficiente;
- ausencia de duplicado incompatible;
- actor autorizado;
- finalidad de alta;
- campos permitidos.

Una sede seleccionada no puede fabricar ownership sobre el proveedor.

---

#### 20. `create` no incluye activación

La familia objetivo separa:

```text
suppliers.create
suppliers.update
suppliers.activate
suppliers.deactivate
```

Por tanto:

```text
CREATE
!=
ACTIVATE
```

El runtime actual permite enviar:

```text
is_active
```

durante `createSupplier`.

Ese comportamiento se registra como:

```text
AS_IS_CREATE_AND_ACTIVATE_COUPLED
```

La materialización futura deberá evitar que `suppliers.create` satisfaga silenciosamente `suppliers.activate`.

La política de activación/desactivación permanece reservada a `ORIGO-AUTH-008`.

---

#### 21. Campos observados en alta de proveedor

El runtime actual puede persistir:

```text
name
tax_id
contact_name
phone
email
address
notes
is_active
payment_type
credit_days
```

`suppliers.create` no debe interpretarse como autoridad ilimitada sobre todos esos campos.

La decisión por campo debe respetar:

```text
IDENTIDAD / CONTACTO BÁSICO
→ puede formar parte del alta si está permitido

ESTADO ACTIVO
→ requiere autoridad de activación

CONDICIÓN COMERCIAL
→ queda sujeta a protección y contrato específico

DATO SENSIBLE
→ queda sujeto a minimización y protección
```

La protección de precios, datos tributarios, contratos y demás información sensible se cierra en `ORIGO-AUTH-010`.

---

#### 22. Modalidad de `suppliers.create`

Crear un proveedor modifica un dato maestro organizacional.

Decisión:

```text
origo.procurement.suppliers.create
→ BASE_ONLY
```

No existe carril operativo de creación.

Un bodeguero o `gerencia_operativa` puede recibir una proyección mínima de proveedor para una entrega autorizada, pero esa visibilidad:

```text
SUPPLIER VIEW OPERATIVO
!=
SUPPLIER CREATE
```

Por tanto:

```text
OPERATIVE_LANE
→ DENY
```

para `suppliers.create`.

---

#### 23. Política objetivo de grants base para crear proveedores

Decisión objetivo:

| Rol base | Decisión | Alcance objetivo | Condición |
| --- | --- | --- | --- |
| `propietario` | `ASIGNAR` | organización productiva ordinaria | alta no concede contratos ni activación automática |
| `gerente_general` | `ASIGNAR` | organización productiva ordinaria | alta no concede contratos ni activación automática |
| `gerente` | `ASIGNAR` | unidades de negocio cubiertas por su responsabilidad administrativa | proveedor sigue siendo recurso organizacional |
| `auxiliar_administrativa` | `ASIGNAR` | soporte administrativo de abastecimiento | no activa ni modifica condiciones sensibles por inferencia |
| `supervisor` | `NO_ASIGNAR` | — | seguimiento local no gobierna el maestro |
| `contador` | `NO_ASIGNAR` | — | conciliación no modifica proveedores |
| `marketing` | `NO_ASIGNAR` | — | fuera del dominio de abastecimiento |
| `trabajador_operativo` | `NO_ASIGNAR` | — | un rol operativo no administra maestros |

La futura materialización deberá reproducir esta política con capacidades explícitas y sin fallback por nombre de rol.

---

#### 24. Binding de alta de proveedor

Pantalla:

```text
VSCREEN-0071 — Alta y expediente de proveedor
```

Proceso propietario:

```text
VPROC-0020 — Comparar proveedores y condiciones con evidencia suficiente para decidir
```

Representación AS-IS:

```text
/suppliers/new
```

Acción observada:

```text
createSupplier
```

Binding objetivo:

```text
VSCREEN-0071
+
VPROC-0020
+
acción create
→ origo.procurement.suppliers.create
```

La pantalla puede combinar otras acciones, pero cada una conserva permiso independiente.

---

#### 25. Brecha AS-IS — creación de proveedor

El runtime actual usa:

```text
requireCanManageSuppliers
```

que primero consulta:

```text
origo.suppliers.manage
```

y después conserva fallback por nombres de rol locales.

La creación observada queda:

```text
createSupplier
→ usuario autenticado
→ requireCanManageSuppliers
→ insert suppliers
```

No se demuestra como check exacto:

```text
origo.procurement.suppliers.create
```

Resultado:

```text
AS_IS_LEGACY_SUPPLIER_MANAGE_CREATE
```

La transición futura debe retirar la dependencia autoritativa del permiso agregado y de la lista local de roles para esta acción.

---

#### 26. Matriz consolidada de las dos capacidades

| Capacidad | Recurso | Modalidad | Carril operativo | Efecto máximo |
| --- | --- | --- | --- | --- |
| `origo.procurement.purchase_orders.create` | `PURCHASE_ORDER` | `BASE_ONLY` | `DENY` | crear orden no aprobada/no emitida dentro del alcance |
| `origo.procurement.suppliers.create` | `SUPPLIER` | `BASE_ONLY` | `DENY` | crear identidad/expediente inicial sin activar ni administrar condiciones sensibles |

Total:

```text
CAPACIDADES DE CREACIÓN: 2
BASE_ONLY: 2
BASE_OR_OPERATIONAL: 0
OPERATIONAL_ONLY: 0
BASE_AND_OPERATIONAL: 0
```

---

#### 27. Matriz de separación de acciones

| Acción | Orden | Proveedor | Propietario |
| --- | --- | --- | --- |
| consultar | `purchase_orders.view` | `suppliers.view` | `ORIGO-AUTH-004` |
| crear | `purchase_orders.create` | `suppliers.create` | `ORIGO-AUTH-005` |
| aprobar | `purchase_orders.approve` | no se infiere | `ORIGO-AUTH-006` |
| recibir | `receipts.register` | no se infiere | `ORIGO-AUTH-007` |
| actualizar/corregir | capacidad separada | `suppliers.update` | `ORIGO-AUTH-008` |
| activar/desactivar | no aplica | `suppliers.activate/deactivate` | `ORIGO-AUTH-008` |
| proteger datos sensibles | campos/proyecciones | campos/proyecciones | `ORIGO-AUTH-010` |

Ninguna fila hereda autoridad de otra.

---

#### 28. Dispositivo compartido

Las dos capacidades de creación no aparecen hoy en el catálogo activo de permisos ni en el techo vigente de dispositivos compartidos.

Decisión fail-closed:

```text
SHARED_DEVICE
+
CREATE_PERMISSION_NOT_EXPLICITLY_IN_DEVICE_CEILING
→ DENY
```

La tarea no crea una entrada de dispositivo por inferencia.

Una futura incorporación deberá exigir simultáneamente:

- actor humano efectivo;
- permiso base exacto;
- aplicación permitida;
- dispositivo autorizado;
- techo de capacidad que incluya explícitamente la acción;
- territorio y recurso válidos cuando aplique.

---

#### 29. Simulación

La simulación nunca produce el efecto real de creación.

Para ambas capacidades:

```text
SIMULATED_ALLOW
→ DECISIÓN / PREVISUALIZACIÓN
→ ZERO BUSINESS WRITE
```

Una simulación puede explicar:

- permiso faltante;
- scope;
- rol;
- territorio;
- recurso;
- campos bloqueados;

pero no crea una orden ni un proveedor.

La incorporación de estas nuevas claves al contrato de simulación pertenece a la migración compartida posterior y no se materializa aquí.

---

#### 30. Auditoría mínima de creación

Toda ejecución física futura deberá conservar evidencia correlacionable de:

```text
principal
actor efectivo
permission_key
resource_type
resource_id creado
scope
territorio cuando aplique
decisión
razones
timestamp
versión contractual
resultado
```

Además:

```text
purchase_orders.create
→ created_by / actor trazable

suppliers.create
→ actor de alta trazable
```

La identidad técnica de sesión no deberá ocultar al actor humano efectivo cuando exista un dispositivo compartido.

---

#### 31. Regla de primer efecto

El permiso exacto debe resolverse **antes** del primer write empresarial.

Secuencia objetivo:

```text
AUTHENTICATE
→ RESOLVE ACTOR
→ RESOLVE EXACT CREATE PERMISSION
→ RESOLVE SCOPE / TERRITORY
→ VALIDATE INPUT AND RELATIONS
→ AUTHORIZE FIELD SET
→ WRITE
```

Está prohibido usar como patrón:

```text
WRITE
→ LUEGO COMPROBAR PERMISO
```

Si una operación de creación requiere varios writes técnicos, todos pertenecen a una sola intención autorizada y deben preservar actor, correlación y resultado coherentes.

---

#### 32. Errores y denegaciones

Deben distinguirse como mínimo:

```text
NO_SESSION
NO_APP_ACCESS
MISSING_CREATE_PERMISSION
RESOURCE_INPUT_INVALID
OUT_OF_SCOPE
TERRITORY_INVALID
RELATION_INVALID
FIELD_NOT_ALLOWED
UPSTREAM_STATE_INVALID
TECHNICAL_FAILURE
```

No deben colapsarse:

```text
DENY
!=
NOT_FOUND
!=
INVALID_INPUT
!=
TECHNICAL_ERROR
```

Un error técnico nunca se convierte en autorización por fallback.

---

#### 33. Aliases y controles legacy

Se observaron controles legacy relevantes:

```text
origo.suppliers.manage
lista local de roles de proveedor
origo.access como único guard visible de /purchase-orders/new
```

Tratamiento:

```text
LEGACY
→ COMPATIBILIDAD TRANSITORIA
→ NO FUENTE OBJETIVO DE AUTORIDAD
```

No se crea alias nuevo.

No se permite que:

```text
origo.suppliers.manage
→ equivalga automáticamente a todas las operaciones suppliers.*
```

La equivalencia exacta, si se requiere durante migración, deberá declararse explícitamente y retirarse de forma gobernada.

---

#### 34. Relación con `ORIGO-AUTH-006`

La siguiente tarea define aprobación.

Handoff exacto:

```text
ORIGO-AUTH-005
→ una orden puede ser creada/preparada sin quedar aprobada

ORIGO-AUTH-006
→ define quién y cómo aprueba/rechaza
```

La presente tarea no decide:

- niveles de aprobación;
- montos;
- doble control;
- urgencia;
- excepción;
- autoaprobación;
- emisión al proveedor.

---

#### 35. Relación con `ORIGO-AUTH-007` y `ORIGO-AUTH-008`

`ORIGO-AUTH-007` conserva:

```text
origo.procurement.receipts.register
```

y la autoridad de recepción.

`ORIGO-AUTH-008` conserva:

```text
purchase order update/correction
suppliers.update
suppliers.activate
suppliers.deactivate
retiro o eliminación
```

Por tanto:

```text
CREATE
→ NO ABSORBE RECEIVE
→ NO ABSORBE UPDATE
→ NO ABSORBE ACTIVATE
→ NO ABSORBE DELETE
```

---

#### 36. Hallazgos diferidos y propietarios

| Hallazgo | Bloquea esta definición | Propietario | Condición de salida |
| --- | --- | --- | --- |
| `createPurchaseOrder` no demuestra check exacto de creación | no | `ORIGO-AUTH-014` + package físico | consumer usa la clave materializada y enforcement server-side |
| `createSupplier` usa `origo.suppliers.manage` | no | `ORIGO-AUTH-014` + package físico | acción consume `suppliers.create` exacto |
| fallback local por rol en proveedor | no | `ORIGO-AUTH-014` + package físico | decisión deriva del catálogo/matriz canónicos |
| `createSupplier` mezcla alta con `is_active` | no | `ORIGO-AUTH-008` | activación queda separada y verificable |
| orden recibe `site_id` desde formulario | no | `ORIGO-AUTH-009` | territorio y centro de costo se resuelven server-side |
| orden/proveedor exponen datos comerciales | no | `ORIGO-AUTH-010` | field masks y acceso sensible quedan cerrados |
| permisos nuevos no están en dataset activo de 112 | no | `ORIGO-AUTH-014` | catálogo versionado, tipos, grants y consumidores incorporados |

Ningún hallazgo autoriza un bypass temporal.

---

#### 37. Requisitos de prueba derivados

**Resultado:** NO GENERA REQUISITOS DE PRUEBA

**Requisitos creados:** 0
**Requisitos modificados:** 0
**Requisitos diferidos:** 0
**Requisitos obsoletos:** 0
**Fragmentos del Registro 04A afectados:** 0

**Justificación:** la separación entre creación, consulta, aprobación, recepción y corrección, el uso de permisos exactos, el bloqueo de fallbacks por rol, la protección territorial, la segregación de estados y el gobierno de proveedores ya están cubiertos por requisitos canónicos vigentes. Esta tarea concreta el contrato de dos capacidades ya reservadas por fuentes canónicas y no introduce una obligación verificable sin cobertura.

---

#### 38. Cobertura de prueba vigente reutilizada

La trazabilidad existente se reutiliza sin modificar el Registro 04A:

- `TREQ-ORIGO-002` — lectura y mutación de órdenes limitadas por permiso, territorio, estado y columnas;
- `TREQ-ORIGO-004` — separación de necesidad, selección, aprobación, orden y recepción, con segregación de capacidades;
- `TREQ-ORIGO-005` — identidad estable de proveedor, condiciones separadas y protección de datos sensibles;
- `TREQ-AUTH-001` — la autorización final depende de permiso, contexto y alcance canónicos y no de listas locales de roles;
- `TREQ-AUTH-002` — toda clave consumida por código debe existir en el catálogo vigente;
- `TREQ-AUTH-013` — cada mutación revalida en servidor permiso exacto, actor, territorio, contexto, estado y columnas;
- `TREQ-AUTH-015` — decisiones y acciones protegidas conservan evidencia correlacionable.

Estas referencias son cobertura heredada; no representan cambios al registro.

---

#### 39. Evidencia de validación

| Clase | Estado | Evidencia |
| --- | --- | --- |
| BUILD | NOT_EXECUTED | No se ejecutó `docs:plan:build` contra un checkout local actualizado durante la preparación del artefacto. |
| LOCAL | NOT_EXECUTED | No se insertó la tarea en un checkout real ni se ejecutaron validadores locales del repositorio. |
| REMOTA | PASS | Se consultaron `vento-shell/main`, `vento-origo/main`, owner, continuidad, topología, catálogos, matrices, procesos, 04A y código consumidor vigente. |
| OPERATIVA | NOT_EXECUTED | No se inició sesión ni se ejecutó creación real de orden o proveedor. |
| FÍSICA | NOT_APPLICABLE | `DEFINE_ONCE` / `NO_PHYSICAL_INSTANCE`; esta tarea no tiene materialización física propia. |

---

#### 40. Criterios de aceptación

- [x] El universo de creación contiene exactamente dos capacidades.
- [x] Ambas identidades existían previamente en fuentes canónicas.
- [x] Ninguna se declara activa todavía en el dataset compartido de 112 permisos.
- [x] `purchase_orders.create` protege `PURCHASE_ORDER`.
- [x] `suppliers.create` protege `SUPPLIER`.
- [x] Ambas capacidades quedan `BASE_ONLY`.
- [x] Ningún rol operativo recibe autoridad de creación por turno.
- [x] Crear una orden no aprueba ni emite la compra.
- [x] El literal AS-IS `draft` no se confunde con un estado canónico de proceso.
- [x] Crear una orden requiere proveedor, territorio y relaciones válidas sin convertir inputs cliente en autoridad.
- [x] Crear proveedor no incluye `update`, `activate` ni `deactivate`.
- [x] El proveedor sigue siendo recurso organizacional y no propiedad de una sede.
- [x] `is_active` del runtime se identifica como acoplamiento a separar.
- [x] Se define política objetivo de grants base sin modificar datasets físicos.
- [x] `contador`, `supervisor`, `marketing` y `trabajador_operativo` no reciben las dos capacidades por defecto.
- [x] `bodeguero` y `gerencia_operativa` no obtienen creación por carril operativo.
- [x] Un dispositivo compartido no recibe estas capacidades por inferencia.
- [x] La simulación tiene cero writes empresariales.
- [x] El permiso exacto debe resolverse antes del primer write.
- [x] Se identifican los dos gaps principales del runtime.
- [x] Todos los hallazgos diferidos tienen propietario y condición de salida.
- [x] No se modifica el Registro 04A.
- [x] No se crea ni modifica requisito de prueba.
- [x] No se autoriza modificación física, Supabase, migración, datos ni despliegue.
- [x] `ORIGO-AUTH-006` queda como siguiente tarea exacta y no se desarrolla aquí.

---

#### 41. Límites

Esta tarea no:

- activa permisos nuevos en el catálogo compartido;
- modifica matrices RBAC físicas;
- crea grants;
- modifica `origo.suppliers.manage`;
- modifica `has_permission`;
- cambia RLS;
- cambia RPC;
- modifica Server Actions;
- crea o edita una orden real;
- crea o edita un proveedor real;
- aprueba una compra;
- emite una orden;
- registra una recepción;
- corrige o elimina una orden;
- actualiza, activa, desactiva o elimina un proveedor;
- decide el detalle de sede o centro de costo;
- define field masks finales de precios y datos sensibles;
- cambia navegación;
- modifica `vento-origo`;
- modifica Supabase;
- crea migraciones;
- modifica datos;
- ejecuta pruebas operativas;
- desarrolla `ORIGO-AUTH-006`.

---

#### 42. Continuidad

**ÚLTIMA TAREA APROBADA**
`ORIGO-AUTH-004 — Definir permisos de consulta`

**TAREA ACTUAL APROBADA**
`ORIGO-AUTH-005 — Definir permisos de creación`

**SIGUIENTE TAREA RESERVADA**
`ORIGO-AUTH-006 — Definir permisos de aprobación`

### ✅ ORIGO-AUTH-006 — Definir permisos de aprobación

**Estado:** APROBADA
**Tarea anterior:** ORIGO-AUTH-005 — Definir permisos de creación
**Tarea siguiente:** ORIGO-AUTH-007 — Definir permisos de recepción
**Tipo de tarea:** documental; definición cerrada de la autoridad canónica para aprobar compras en ORIGO, con identidad de permiso, recurso, modalidad, actores autorizantes, política de decisión, segregación de funciones, estados elegibles, urgencia/excepción, evidencia y reconciliación del runtime AS-IS, sin activar todavía la clave en el catálogo compartido ni realizar materialización física; `DEFINE_ONCE` / `NO_PHYSICAL_INSTANCE`
**Bloque:** BLOQUE M — ORIGO
**Repositorio propietario:** `vento-group-sas/vento-shell`
**Archivo propietario:** `docs/plan-canonico/modular/bloques/M_ORIGO/01_AUTORIZACION_DE_COMPRAS.md`
**Estado físico resultante:** `NO_PHYSICAL_INSTANCE`
**Cambios físicos autorizados:** ninguno; esta tarea no modifica código, catálogo compartido, matrices físicas, navegación, Server Actions, estados persistidos, RLS, RPC, tablas, datos, Supabase, migraciones, Storage, secretos, consumidores ni despliegues
**Requisitos de prueba creados o modificados:** 0

---

#### 1. Propósito

Definir de forma cerrada y verificable la autoridad de **aprobación de compras** de ORIGO, separando el permiso de aprobar de las capacidades de crear, consultar, emitir, recibir, corregir y eliminar.

La decisión contractual queda:

```text
CREAR
!=
APROBAR
!=
EMITIR
!=
RECIBIR
!=
CORREGIR
```

La tarea consume la frontera aprobada por `ORIGO-AUTH-005`: una orden puede existir y quedar preparada sin adquirir por ese hecho aprobación ni compromiso comercial.

---

#### 2. Frontera recibida de ORIGO-AUTH-005

`ORIGO-AUTH-005` definió:

```text
origo.procurement.purchase_orders.create
origo.procurement.suppliers.create
```

como capacidades de creación separadas de aprobación.

Handoff obligatorio:

```text
purchase_orders.create
→ puede materializar trabajo no aprobado

purchase_orders.approve
→ decide si la compra cruza el punto de aprobación
```

La presente tarea no reabre creación de órdenes ni alta de proveedores.

---

#### 3. Naturaleza y topología

La topología vigente para `ORIGO-AUTH-001..008` establece:

```text
mode = DEFINE_ONCE
execution_gate = NO_PHYSICAL_INSTANCE
```

Resultado:

```text
CONTRATO DOCUMENTAL ÚNICO
→ SIN INSTANCIA FÍSICA PROPIA
→ SIN MIGRACIÓN
→ SIN CAMBIO DE RUNTIME
```

La materialización futura deberá consumir esta decisión sin reinterpretar la autoridad de aprobación.

---

#### 4. Fuentes y snapshots verificados

La preparación documental se ancla a:

```text
vento-shell/main
20002e284aa472814e7e606829d5ca7216375e53

vento-origo/main
70860f1ca5f0a4a73e894cbb840956f9f7eda2ad

owner remoto
blob fe019cc375d804d31b1cba2e74c9df0c40b421bc
```

La base documental inmediata es el artefacto completo aprobado:

```text
ORIGO-AUTH-005_APROBADA_PARA_REEMPLAZAR.md
SHA-256 ce3cf6abc240b7dca821e645c5a463712c5b2af4e9dfea3c80f9b2edb03b0564
```

El remoto todavía puede conservar `ORIGO-AUTH-005` pendiente mientras se completa su lifecycle; esta preparación anticipada no autoriza incorporación antes del cierre de la tarea anterior.

También se contrastaron:

- convención de acciones y permisos;
- catálogo y clasificación ORIGO;
- roles y responsabilidades de `VPROC-0021`;
- estados canónicos de `VPROC-0021`;
- `VSCREEN-0074` y su binding de proceso;
- evidencia AS-IS de aprobación/emisión;
- Server Action `setPurchaseOrderSent`;
- Registro 04A de ORIGO y AUTH;
- scripts y validadores documentales vigentes.

---

#### 5. Universo exacto de aprobación

La tarea define exactamente una identidad de autoridad de aprobación:

```text
origo.procurement.purchase_orders.approve
```

Procedencia canónica previa:

- aparece como ejemplo válido de permiso funcional ORIGO;
- aparece en el registro canónico de acciones;
- aparece como capacidad futura atómica del dominio ORIGO;
- está reservada por el roadmap para definición antes de su incorporación física.

Resultado:

```text
PERMISOS DE APROBACIÓN DEFINIDOS: 1
PERMISOS DE RECHAZO NUEVOS: 0
PERMISOS DE EMISIÓN NUEVOS: 0
PERMISOS DE RECEPCIÓN NUEVOS: 0
```

No se inventa `origo.procurement.purchase_orders.reject`, `issue`, `send` ni otra identidad no existente en las fuentes canónicas consultadas.

---

#### 6. Estado frente al catálogo compartido

El conjunto activo de permisos ORIGO aún no materializa esta capacidad mutante.

Por tanto:

```text
IDENTIDAD OBJETIVO DEFINIDA
!=
CLAVE ACTIVA EN DATASET COMPARTIDO
!=
GRANT MATERIALIZADO
!=
ENFORCEMENT EN RUNTIME
```

`ORIGO-AUTH-006` define el contrato documental.

`ORIGO-AUTH-014` conserva la incorporación a paquetes compartidos, tipos, grants y consumidores cuando corresponda.

---

#### 7. Identidad y recurso protegido

```text
PERMISSION
origo.procurement.purchase_orders.approve

APLICACIÓN
origo

MÓDULO
procurement

RECURSO
PURCHASE_ORDER

ACCIÓN
approve
```

Significado contractual:

> Permite emitir la decisión de aprobación de una compra elegible dentro de la autoridad y alcance del actor, sin conceder por sí sola creación, edición, emisión al proveedor, recepción, corrección, eliminación o pago.

---

#### 8. Binding de proceso y pantalla

Proceso propietario:

```text
VPROC-0021
Aprobar y emitir compras separando flujo ordinario, urgencia y excepción
```

Pantalla canónica de decisión:

```text
VSCREEN-0074 — Bandeja de aprobaciones de compra
```

Paso canónico:

```text
VPROC-0021::STEP-APPROVE_PURCHASE
— Aprobar o rechazar compra
```

Tipo de interacción:

```text
APPROVE
DECISION
```

La pantalla aplica autoridad y límites sin aceptar físicamente la compra.

---

#### 9. Modalidad de aprobación

`VPROC-0021` no admite rol operativo directo.

La fuente canónica establece expresamente:

```text
rol operativo directo
→ NO_APLICA
```

Por tanto:

```text
origo.procurement.purchase_orders.approve
→ BASE_ONLY
```

Consecuencias:

- un turno no habilita la aprobación;
- un check-in no habilita la aprobación;
- `gerencia_operativa` no recibe la capacidad por carril operativo;
- `bodeguero` no recibe la capacidad por carril operativo;
- un dispositivo de recepción no convierte al receptor en aprobador.

---

#### 10. Autoridad funcional de aprobación

Para `VPROC-0021`, la aprobación es obligatoria y el contrato de actores establece:

```text
APROBADORES FUNCIONALES
GERENCIA_GENERAL
OR
COORDINACION_DE_OPERACIONES
```

Objeto de la decisión:

```text
orden de compra
urgencia
excepción
```

El `RESPONSABLE_DE_COMPRAS` es iniciador/ejecutor principal del proceso, no autoridad automática para aprobar la misma decisión crítica que preparó.

---

#### 11. Segregación obligatoria

Reglas:

```text
SOLICITANTE
!=
COMPRADOR
!=
APROBADOR
!=
RECEPTOR
```

Una misma persona solo puede acumular funciones cuando una política aprobada lo permita de forma expresa.

Para decisiones críticas:

```text
INICIADOR / PREPARADOR / EJECUTOR
→ NO EMITE SU PROPIA APROBACIÓN FINAL
```

Y:

```text
SOLICITANTE
→ NO APRUEBA SU PROPIA COMPRA CRÍTICA

COMPRADOR
→ NO AUTOAPRUEBA FUERA DE EXCEPCIÓN EXPLÍCITA Y AUDITADA

RECEPTOR
→ NO APRUEBA LA COMPRA POR EL HECHO DE RECIBIR
```

---

#### 12. Política objetivo de grants base

La capacidad de aprobación no se hereda de `.view` ni de `.create`.

Política objetivo:

| Rol base | Decisión objetivo | Condición |
| --- | --- | --- |
| `propietario` | `CONDICIONAL` | la propiedad no sustituye el actor aprobador; requiere resolver `GERENCIA_GENERAL`, `COORDINACION_DE_OPERACIONES` o una delegación aprobada |
| `gerente_general` | `ASIGNAR` | corresponde a `GERENCIA_GENERAL`; no elimina segregación |
| `gerente` | `CONDICIONAL` | solo cuando el actor resuelva `COORDINACION_DE_OPERACIONES` o una delegación equivalente aprobada dentro de su cobertura |
| `supervisor` | `NO_ASIGNAR` | seguimiento local no concede aprobación de compra |
| `auxiliar_administrativa` | `NO_ASIGNAR` | puede apoyar/preparar cuando corresponda; no emite decisión final por rol base |
| `contador` | `NO_ASIGNAR` | aporta evidencia financiera; no adquiere aprobación final por rol base |
| `marketing` | `NO_ASIGNAR` | fuera del dominio de compra |
| `trabajador_operativo` | `NO_ASIGNAR` | el rol base no concede aprobación |

La concesión futura no sustituye la resolución del actor funcional ni la segregación del caso concreto.

---

#### 13. Regla de decisión

Una aprobación positiva solo puede proceder cuando:

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

Cualquier dimensión ausente, ambigua o fallida produce:

```text
DENY
```

---

#### 14. Estado elegible para aprobación

El lifecycle canónico de `VPROC-0021` conserva:

```text
PURCHASE_REQUEST_PENDING_APPROVAL
→ UNDER_REVIEW
→ PENDING_APPROVAL
→ APPROVED
→ ORDER_PREPARING
→ ORDER_ISSUED
→ SUPPLIER_ACK_PENDING
→ PURCHASE_COMMITMENT_FORMALIZED
```

La decisión de aprobación actúa sobre el punto:

```text
VPROC-0021.PENDING_APPROVAL
→ VPROC-0021.APPROVED
```

Invariante:

```text
APPROVED
!=
ORDER_ISSUED
```

La compra aprobada todavía no demuestra que exista una orden emitida al proveedor.

---

#### 15. Condiciones mínimas antes de decidir

Antes de aprobar deben existir, según aplique al caso:

- necesidad o justificación trazable;
- proveedor y condiciones identificados;
- líneas y presentaciones coherentes;
- alcance empresarial y territorial resuelto;
- importe y moneda conocidos;
- centro de costo cuando corresponda;
- presupuesto o evidencia financiera cuando la política lo exija;
- riesgo y urgencia clasificados;
- documentos/evidencia exigibles;
- versión de compra identificable;
- solicitante, preparador y actor aprobador resueltos;
- ausencia de conflicto de segregación no autorizado.

Una señal automática, sugerencia o prefill no puede producir aprobación.

---

#### 16. Política de aprobación

La política puede depender de:

```text
empresa
sede
centro de costo
categoría
importe
presupuesto
riesgo
contrato
urgencia
```

Esta tarea **no inventa valores numéricos ni umbrales**.

Los límites concretos deberán existir como configuración versionada y auditable antes de materializar enforcement productivo.

---

#### 17. Resultado positivo

Cuando la decisión autorizada sea positiva:

```text
PENDING_APPROVAL
→ APPROVED
```

Debe conservarse como mínimo:

```text
purchase_order_id
versión evaluada
actor aprobador
principal y actor efectivo
permission_key
alcance
regla/política aplicada
decisión
comentario o razón cuando aplique
timestamp
```

La aprobación queda ligada a la versión evaluada.

Un cambio material posterior invalida la equivalencia con esa aprobación y debe activar revisión o nueva aprobación según política.

---

#### 18. Rechazo y devolución

`VSCREEN-0074` define una superficie capaz de:

```text
aprobar
rechazar
devolver
```

Las fuentes canónicas consultadas reservan explícitamente `purchase_orders.approve`, pero no exponen una identidad ORIGO separada `.reject` o `.return` para este recurso.

Regla de esta tarea:

- no se inventan permission keys adicionales;
- la autoridad de entrar al punto de decisión se gobierna por `purchase_orders.approve`;
- los resultados rechazo/devolución deben conservar decisión, actor, razón y versión;
- la materialización no debe crear silenciosamente una clave nueva sin gobierno de catálogo.

El contrato actual de estados de `VPROC-0021` tampoco expone un estado terminal específico de rechazo o devolución.

La experiencia y transición detalladas permanecen en `ORIGO-UX-008` y en el contrato de proceso correspondiente.

---

#### 19. Aprobación no equivale a emisión

Regla obligatoria:

```text
APPROVE
!=
SEND
!=
ORDER_ISSUED
```

`CAP-05.06 — Aprobar compras` y `CAP-05.07 — Emitir y controlar órdenes` son capacidades empresariales separadas.

Por tanto:

- aprobar no envía al proveedor;
- aprobar no genera por sí solo acuse;
- aprobar no inicia recepción;
- emitir exige que la compra ya esté autorizada y que la versión enviada quede identificada.

Esta tarea no crea un permission key nuevo de emisión que no exista en las fuentes canónicas vigentes.

---

#### 20. Compra ordinaria

La compra ordinaria debe llegar a `PENDING_APPROVAL` con evidencia suficiente y resolver una decisión explícita.

No se permite:

```text
create
→ autoapprove
→ send
```

por una sola acción implícita.

La aprobación ordinaria conserva autoridad, regla aplicada y segregación.

---

#### 21. Compra urgente

La urgencia no elimina aprobación ni auditoría.

Carril objetivo:

```text
URGENT_PURCHASE
→ causa explícita
→ límite aplicable
→ autoridad válida
→ permiso exacto
→ decisión trazable
→ plazo de regularización
→ auditoría
```

Queda prohibido interpretar:

```text
urgencia
→ bypass permanente
```

La compra urgente sigue conservando proveedor, líneas, recepción y conciliación.

---

#### 22. Excepción de autoaprobación

El comprador no puede autoaprobar fuera de una excepción explícita y auditada.

Una excepción válida debe demostrar como mínimo:

- causa;
- política que la habilita;
- autoridad que la concedió;
- alcance;
- vigencia;
- límites;
- actor;
- ausencia o tratamiento del conflicto;
- regularización posterior cuando aplique;
- evidencia auditable.

La excepción no se infiere por cargo, urgencia, disponibilidad de un único usuario ni acceso a ORIGO.

---

#### 23. Relación con importes y datos sensibles

La decisión de aprobación puede depender de importe, presupuesto, precio, condición comercial y riesgo.

Sin embargo:

```text
purchase_orders.approve
!=
permiso irrestricto para consultar cualquier dato sensible
```

La proyección económica necesaria para decidir debe ser suficiente y mínima.

La protección final de precios, condiciones y datos sensibles permanece en:

```text
ORIGO-AUTH-010
```

---

#### 24. Relación con territorio

La aprobación se ejerce sobre una orden concreta y su alcance.

La presencia de `site_id`, una sede asignada o la visibilidad del recurso no bastan para autorizar la decisión.

La resolución exacta de:

- sede;
- centro de costo;
- orden multidestino;
- cobertura administrativa;
- cruces territoriales;

permanece en:

```text
ORIGO-AUTH-009
```

---

#### 25. Contexto operativo y check-in

Como la capacidad es `BASE_ONLY`:

```text
turno
check-in
rol operativo
```

no son fuentes de autoridad de aprobación.

La administración debe poder resolver la decisión sin convertir el check-in en requisito artificial.

La reconciliación transversal de contexto y administración sin check-in permanece en:

```text
ORIGO-AUTH-012
ORIGO-AUTH-013
```

---

#### 26. Dispositivo compartido

Un dispositivo compartido no puede aprobar por sí mismo.

La ejecución futura deberá resolver:

```text
principal
actor humano efectivo
permiso exacto
autoridad funcional
segregación
recurso
política vigente
```

Una sesión de estación, PIN o contexto operativo no puede sustituir la autoridad administrativa del aprobador.

---

#### 27. Simulación

La simulación de aprobación puede mostrar:

```text
decisión esperada
razones
política aplicable
bloqueos
```

pero debe mantener:

```text
SIMULATE_APPROVAL
→ ZERO BUSINESS WRITES
→ ZERO ORDER_STATE_MUTATION
→ ZERO SEND
```

Una simulación favorable no constituye aprobación real.

---

#### 28. Runtime AS-IS observado

El runtime actual no presenta una superficie dedicada equivalente a `VSCREEN-0074`.

La acción más cercana observada es:

```text
setPurchaseOrderSent(id)
```

que intenta:

```text
draft
→ sent
```

mediante una actualización condicionada por `id` y estado de origen.

No se observa dentro de esa función:

- permiso canónico `purchase_orders.approve`;
- resolución explícita de aprobador;
- política de aprobación;
- segregación solicitante/comprador/aprobador;
- transición canónica `PENDING_APPROVAL → APPROVED`;
- versión aprobada;
- comentario/razón;
- separación explícita entre aprobación y emisión.

---

#### 29. Clasificación de la brecha AS-IS

La acción actual se clasifica:

```text
AS_IS_APPROVAL_AND_ISSUANCE_COLLAPSED
```

Y la ausencia de check exacto demostrable:

```text
AS_IS_GAP_PURCHASE_ORDER_APPROVE_BINDING
```

Estas etiquetas describen la evidencia observada y no afirman ausencia de RLS u otros controles no demostrados por la función.

---

#### 30. Binding objetivo del consumidor

La materialización futura debe separar conceptualmente:

```text
PREPARAR COMPRA
→ purchase_orders.create / corrección permitida

DECIDIR APROBACIÓN
→ purchase_orders.approve

EMITIR ORDEN APROBADA
→ transición posterior con versión y evidencia
```

La acción que cambie el estado de aprobación debe revalidar en servidor:

- actor;
- permiso exacto;
- recurso;
- estado actual;
- versión;
- política;
- segregación;
- alcance;
- campos permitidos.

---

#### 31. Protección contra carrera y versión obsoleta

La aprobación no puede aplicarse sobre una versión distinta de la revisada.

Regla:

```text
VERSION_REVISADA
=
VERSION_APROBADA
```

Si la orden cambia materialmente después de iniciar la decisión:

```text
APROBACIÓN PENDIENTE
→ INVALIDAR / REEVALUAR SEGÚN POLÍTICA
```

La tarea no define el mecanismo físico de lock, CAS, versión o RPC; exige únicamente que la decisión no se aplique a una versión obsoleta.

---

#### 32. Evidencia y auditoría

Toda aprobación futura deberá conservar evidencia correlacionable de:

```text
principal
actor efectivo
permission_key
purchase_order_id
versión
scope
territorio/política cuando aplique
solicitante
preparador/comprador
aprobador
decisión
razón/comentario
regla aplicada
urgencia/excepción
timestamp
resultado
```

También deberán auditarse denegaciones y reintentos relevantes conforme al contrato transversal.

---

#### 33. Errores y denegaciones

Deben distinguirse al menos:

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
TECHNICAL_FAILURE
```

Un error técnico no se convierte en `ALLOW`.

---

#### 34. Aliases y permisos legacy

No se observó una clave canónica activa equivalente que pueda reutilizarse silenciosamente como autoridad final de aprobación.

Queda prohibido usar como sustituto:

```text
origo.access
purchase_orders.view
purchase_orders.create
lista local de roles
status = draft
```

Ninguno equivale a:

```text
origo.procurement.purchase_orders.approve
```

---

#### 35. Relación con ORIGO-AUTH-007 y tareas posteriores

`ORIGO-AUTH-007` conserva la autoridad de recepción:

```text
origo.procurement.receipts.register
```

Por tanto:

```text
APPROVE
!=
RECEIVE
```

Además:

- `ORIGO-AUTH-008` conserva corrección y mutaciones posteriores;
- `ORIGO-AUTH-009` conserva territorio y centro de costo;
- `ORIGO-AUTH-010` conserva precios y datos sensibles;
- `ORIGO-AUTH-011` conserva actor de recepción;
- `ORIGO-AUTH-012` y `ORIGO-AUTH-013` conservan contexto operativo y administración sin check-in;
- `ORIGO-AUTH-014` conserva migración a paquetes compartidos;
- `ORIGO-AUTH-015` conserva pruebas integrales.

---

#### 36. Hallazgos diferidos y propietarios

| Hallazgo | Bloquea esta definición | Propietario | Condición de salida |
| --- | --- | --- | --- |
| `setPurchaseOrderSent` colapsa aprobación y emisión | no | `ORIGO-AUTH-014` + package físico + `ORIGO-UX-008` | aprobación y emisión se materializan como etapas distinguibles |
| `setPurchaseOrderSent` no demuestra permission check exacto | no | `ORIGO-AUTH-014` + package físico | mutación consume `purchase_orders.approve` y revalida server-side |
| no existe superficie AS-IS dedicada equivalente a `VSCREEN-0074` | no | `ORIGO-UX-008` | experiencia de aprobación/rechazo queda materializada |
| contrato de estados no expone resultado separado de rechazo/devolución | no | `ORIGO-UX-008` + propietario del contrato `VPROC-0021` | flujo expresa el resultado sin inventar transición implícita |
| no existen umbrales numéricos aprobados | no | política/configuración propietaria de compras | umbrales versionados y probados antes de enforcement productivo |
| territorio detallado aún no está cerrado | no | `ORIGO-AUTH-009` | aprobación resuelve sede/centro de costo/recurso en servidor |
| datos económicos sensibles requieren minimización | no | `ORIGO-AUTH-010` | proyección sensible queda protegida |
| clave de aprobación no está en dataset activo compartido | no | `ORIGO-AUTH-014` | catálogo versionado, tipos, grants y consumidor incorporados |

Ningún hallazgo autoriza autoaprobación temporal.

---

#### 37. Requisitos de prueba derivados

**Resultado:** NO GENERA REQUISITOS DE PRUEBA

**Requisitos creados:** 0
**Requisitos modificados:** 0
**Requisitos diferidos:** 0
**Requisitos obsoletos:** 0
**Fragmentos del Registro 04A afectados:** 0

**Justificación:** permiso exacto, autorización server-side, segregación, aprobación por política, urgencia/excepción, separación entre aprobación/emisión y auditoría ya están protegidos por requisitos canónicos vigentes de ORIGO y AUTH. La tarea concreta la capacidad de aprobación ya reservada por las fuentes y no introduce una obligación verificable sin cobertura.

---

#### 38. Cobertura de prueba vigente reutilizada

Sin modificar el Registro 04A, se reutiliza:

- `TREQ-ORIGO-002` — orden limitada por permiso, territorio, estado y columnas;
- `TREQ-ORIGO-004` — separación de necesidad, selección, aprobación, orden y revisión; políticas por empresa/sede/centro de costo/categoría/importe/riesgo/urgencia; segregación y carril urgente auditado;
- `TREQ-AUTH-001` — autorización por permiso, contexto y alcance canónicos;
- `TREQ-AUTH-002` — permission keys consumidos deben existir en catálogo vigente;
- `TREQ-AUTH-010` — segregación de funciones;
- `TREQ-AUTH-013` — cada mutación valida server-side permiso exacto, actor, territorio, contexto, estado y campos;
- `TREQ-AUTH-015` — decisiones protegidas conservan evidencia correlacionable.

Estas referencias son cobertura heredada y no representan cambios al registro.

---

#### 39. Evidencia de validación

| Clase | Estado | Evidencia |
| --- | --- | --- |
| BUILD | NOT_EXECUTED | No se ejecutó `docs:plan:build` contra un checkout local actualizado durante la preparación anticipada del artefacto. |
| LOCAL | NOT_EXECUTED | No se insertó la tarea en un checkout real ni se ejecutaron validadores locales del repositorio. |
| REMOTA | PASS | Se consultaron `vento-shell/main`, `vento-origo/main`, owner, topología, catálogos, roles de proceso, estados, pantallas, 04A y Server Action actual. |
| OPERATIVA | NOT_EXECUTED | No se ejecutó una aprobación, rechazo, emisión ni compra urgente real. |
| FÍSICA | NOT_APPLICABLE | `DEFINE_ONCE` / `NO_PHYSICAL_INSTANCE`; esta tarea no tiene materialización física propia. |

---

#### 40. Criterios de aceptación

- [x] Se define exactamente una identidad de aprobación.
- [x] La identidad existía previamente en fuentes canónicas.
- [x] No se inventa `.reject`, `.return`, `.issue` ni `.send`.
- [x] El recurso protegido es `PURCHASE_ORDER`.
- [x] El binding de proceso es `VPROC-0021`.
- [x] El binding de pantalla es `VSCREEN-0074`.
- [x] El paso es `VPROC-0021::STEP-APPROVE_PURCHASE`.
- [x] La capacidad queda `BASE_ONLY`.
- [x] Ningún rol operativo recibe aprobación por turno o check-in.
- [x] La autoridad funcional exige `GERENCIA_GENERAL` o `COORDINACION_DE_OPERACIONES`; propiedad o cargo por sí solos no sustituyen esa resolución.
- [x] Solicitante, comprador, aprobador y receptor permanecen segregados.
- [x] El comprador no autoaprueba fuera de excepción explícita y auditada.
- [x] La transición positiva es `PENDING_APPROVAL → APPROVED`.
- [x] `APPROVED` no se confunde con `ORDER_ISSUED`.
- [x] Se preservan política por empresa, sede, centro de costo, categoría, importe, presupuesto, riesgo, contrato y urgencia.
- [x] No se inventan umbrales numéricos.
- [x] Urgencia conserva causa, límite, autorización, regularización y auditoría.
- [x] Rechazo/devolución no generan permission keys ni estados inventados.
- [x] La aprobación queda vinculada a la versión revisada.
- [x] Se identifica el colapso AS-IS `draft → sent`.
- [x] Se identifica la ausencia de check exacto demostrable en `setPurchaseOrderSent`.
- [x] Todos los hallazgos diferidos tienen propietario y condición de salida.
- [x] No se modifica Registro 04A.
- [x] No se crea ni modifica requisito de prueba.
- [x] No se autoriza código, Supabase, migración, datos ni despliegue.
- [x] `ORIGO-AUTH-007` queda como siguiente tarea exacta y no se desarrolla aquí.

---

#### 41. Límites

Esta tarea no:

- activa el permiso en el catálogo compartido;
- modifica matrices RBAC físicas;
- crea grants;
- fija montos o umbrales numéricos;
- crea estados nuevos de rechazo o devolución;
- crea permission keys de rechazo, devolución o emisión;
- modifica `setPurchaseOrderSent`;
- modifica Server Actions;
- modifica navegación;
- implementa `VSCREEN-0074`;
- aprueba una orden real;
- envía una orden al proveedor;
- registra una recepción;
- corrige una compra;
- define el detalle territorial de la orden;
- abre datos sensibles fuera del contrato;
- modifica RLS;
- modifica RPC;
- modifica `vento-origo`;
- modifica Supabase;
- crea migraciones;
- modifica datos;
- ejecuta pruebas operativas;
- desarrolla `ORIGO-AUTH-007`.

---

#### 42. Continuidad

**ÚLTIMA TAREA APROBADA**
`ORIGO-AUTH-005 — Definir permisos de creación`

**TAREA ACTUAL APROBADA**
`ORIGO-AUTH-006 — Definir permisos de aprobación`

**SIGUIENTE TAREA RESERVADA**
`ORIGO-AUTH-007 — Definir permisos de recepción`

### ✅ ORIGO-AUTH-007 — Definir permisos de recepción

**Estado:** APROBADA
**Tarea anterior:** ORIGO-AUTH-006 — Definir permisos de aprobación
**Tarea siguiente:** ORIGO-AUTH-008 — Definir permisos de corrección
**Tipo de tarea:** documental; definición cerrada de la capacidad canónica para registrar recepciones de compra en ORIGO, con identidad de permiso, modalidad operativa, prerrequisitos de turno/check-in, recurso, territorio, actores operativos, modos normal/emergencia y con/sin inventario, segregación respecto de consulta, aprobación, corrección y reversión, y reconciliación del runtime AS-IS, sin activar todavía la clave en el catálogo compartido ni realizar materialización física; `DEFINE_ONCE` / `NO_PHYSICAL_INSTANCE`
**Bloque:** BLOQUE M — ORIGO
**Repositorio propietario:** `vento-group-sas/vento-shell`
**Archivo propietario:** `docs/plan-canonico/modular/bloques/M_ORIGO/01_AUTORIZACION_DE_COMPRAS.md`
**Estado físico resultante:** `NO_PHYSICAL_INSTANCE`
**Cambios físicos autorizados:** ninguno; esta tarea no modifica código, catálogo compartido, matrices físicas, navegación, Server Actions, RLS, RPC, tablas, datos, Supabase, migraciones, Storage, NEXO, NUMERA, consumidores ni despliegues
**Requisitos de prueba creados o modificados:** 0

---

#### 1. Propósito

Definir de forma cerrada y verificable la autoridad para **registrar una recepción de compra nueva** en ORIGO, separándola de consulta, aprobación de compra, corrección, reversión, resolución de diferencias y materialización física de inventario.

La decisión contractual queda:

```text
VER RECEPCIÓN
!=
REGISTRAR RECEPCIÓN
!=
CORREGIR RECEPCIÓN
!=
REVERSAR RECEPCIÓN
!=
RESOLVER DIFERENCIA
```

La tarea consume el inventario aprobado de `ORIGO-AUTH-003` y la separación de autoridad fijada por `ORIGO-AUTH-004..006` sin reabrir esas decisiones.

---

#### 2. Frontera recibida de ORIGO-AUTH-006

`ORIGO-AUTH-006` dejó la aprobación de compras en una capacidad administrativa distinta de la recepción:

```text
origo.procurement.purchase_orders.approve
```

Handoff obligatorio:

```text
COMPRA APROBADA / ORDEN ELEGIBLE
→ puede quedar disponible para recepción

RECEPCIÓN
→ exige autoridad operativa propia
```

Aprobar una compra no concede recibirla y recibir una compra no concede aprobarla.

---

#### 3. Naturaleza y topología

La topología vigente para `ORIGO-AUTH-001..008` establece:

```text
mode = DEFINE_ONCE
execution_gate = NO_PHYSICAL_INSTANCE
```

Resultado:

```text
CONTRATO DOCUMENTAL ÚNICO
→ SIN INSTANCIA FÍSICA PROPIA
→ SIN MIGRACIÓN
→ SIN CAMBIO DE RUNTIME
```

La materialización futura deberá consumir esta decisión sin reinterpretar el permiso de recepción.

---

#### 4. Fuentes y snapshots verificados

La preparación documental se ancla a:

```text
vento-shell/main
53da857dd85d38171090bd3c6e8f189e68a31459

vento-origo/main
70860f1ca5f0a4a73e894cbb840956f9f7eda2ad

owner remoto
blob 3aa2a4571088cf9765bffba764bcb85c8d7e957b
```

La base documental inmediata es el artefacto completo aprobado `ORIGO-AUTH-006 — Definir permisos de aprobación`.

El remoto puede conservar `ORIGO-AUTH-006` como tarea actual mientras termina su lifecycle. Esta preparación anticipada no autoriza incorporación antes del cierre de la tarea anterior.

También se contrastaron:

- convención canónica de permisos y acciones;
- clasificación de modalidades y prerrequisitos de turno/check-in;
- matrices base y operativas vigentes;
- responsabilidades de `VPROC-0022`;
- estados canónicos de `VPROC-0022`;
- `VSCREEN-0076..0079` y sus bindings;
- contrato de recurso de recepción;
- inventario aprobado de `ORIGO-AUTH-003`;
- `src/app/receipts/page.tsx`;
- `src/app/receipts/new/page.tsx`;
- helpers de sesión operativa y firma de actor;
- Registro 04A de ORIGO y AUTH;
- scripts y validadores documentales vigentes.

---

#### 5. Universo exacto de recepción

La tarea define exactamente una identidad de mutación para recepción ordinaria:

```text
origo.procurement.receipts.register
```

Procedencia canónica previa:

- aparece como ejemplo válido de permiso funcional ORIGO;
- aparece en el registro canónico de acciones;
- está declarada como capacidad mutante futura de ORIGO;
- está contemplada por la simulación como acción de vista previa completa;
- las matrices operativas actuales reconocen explícitamente que su ausencia impide considerar completa la recepción de compra.

Resultado:

```text
PERMISOS DE RECEPCIÓN NUEVA DEFINIDOS: 1
PERMISOS DE CORRECCIÓN NUEVOS: 0
PERMISOS DE REVERSIÓN NUEVOS: 0
PERMISOS DE DIFERENCIAS NUEVOS: 0
```

---

#### 6. Estado frente al catálogo compartido

El conjunto activo de permisos ORIGO todavía conserva únicamente capacidades de consulta para este recurso.

Por tanto:

```text
IDENTIDAD OBJETIVO DEFINIDA
!=
CLAVE ACTIVA EN DATASET COMPARTIDO
!=
GRANT MATERIALIZADO
!=
ENFORCEMENT FINAL EN RUNTIME
```

`ORIGO-AUTH-007` fija el contrato documental.

`ORIGO-AUTH-014` conserva la incorporación a paquetes compartidos, tipos, grants y consumidores cuando corresponda.

---

#### 7. Identidad y acción

```text
PERMISSION
origo.procurement.receipts.register

APLICACIÓN
origo

MÓDULO
procurement

RECURSO LÓGICO
receipts

ACCIÓN
register
```

Significado contractual:

> Permite registrar una recepción de compra nueva y atribuida dentro del contexto operativo autorizado, sin conceder por sí sola consulta global, aprobación de compra, corrección, reversión, resolución de diferencias, administración de proveedores ni autoridad financiera.

---

#### 8. Modalidad de autorización

La recepción de compra es una acción operacional presencial que registra un hecho empresarial y puede desencadenar efectos físicos posteriores.

Modalidad aprobada:

```text
authorization_requirement = OPERATIONAL_ONLY
is_read_only = false
```

Consecuencias:

```text
CARRIL BASE
→ NO AUTORIZA

CARRIL OPERATIVO
→ OBLIGATORIO
```

Un cargo administrativo, sede primaria, oficio legacy o jerarquía no sustituye la resolución del carril operativo.

---

#### 9. Prerrequisito de turno y check-in

La mutación corresponde al grupo de acciones que registran movimientos, crean operaciones y reciben recursos.

Prerrequisito:

```text
T+C
```

Significado:

```text
TURNO VIGENTE
+
CHECK-IN ACTIVO
```

Sin ambos:

```text
DENY
```

La existencia de `origo.access` o de `receipts.view` no suple este prerrequisito.

---

#### 10. Recurso protegido

El recurso empresarial protegido es:

```text
PURCHASE_RECEIPT
```

Para una recepción aún no persistida, la autorización se resuelve contra un objetivo de recepción suficientemente determinado por:

- sede receptora;
- área receptora cuando aplique;
- orden de compra o causa controlada de recepción directa;
- proveedor;
- líneas y productos recibidos;
- presentación/unidad;
- modalidad de recepción;
- actor efectivo.

Contrato objetivo del borrador:

```text
RECEIPT_DESTINATION_DRAFT
```

La recepción persistida conserva `receipt_id` como identidad estable.

---

#### 11. Territorio de recepción

La recepción física sigue ligada a una sede exacta.

La decisión exige:

```text
SEDE AUTORIZADA
+
ÁREA COMPATIBLE
+
RECURSO COMPATIBLE
+
CONTEXTO OPERATIVO COINCIDENTE
```

Un `site_id` recibido desde query, formulario o estado cliente no es autoridad.

La tarea `ORIGO-AUTH-009` conserva la definición detallada de sede/centro de costo y las reglas de cruce territorial.

---

#### 12. Binding de proceso y pantalla

Proceso propietario:

```text
VPROC-0022
Recibir compras, verificar conformidad y resolver diferencias sin separar recepción física, documental y económica
```

Pantalla canónica primaria de ejecución:

```text
VSCREEN-0077 — Recepción total o parcial
```

Paso canónico:

```text
VPROC-0022::STEP-RECEIVE_PURCHASE
— Registrar recepción total o parcial
```

Tipo de interacción:

```text
EXECUTE
IN_PROGRESS
```

---

#### 13. Relación con la cola de recepciones

`VSCREEN-0076 — Cola de recepciones` puede presentar trabajo susceptible de recepción, pero verla no concede `receipts.register`.

Regla:

```text
TRIAGE / VIEW
!=
EXECUTE / REGISTER
```

La selección de una orden pendiente debe volver a autorizarse en servidor antes de materializar una recepción.

---

#### 14. Roles operativos que reciben la capacidad

La concesión operativa objetivo queda limitada a:

| Rol operativo | Decisión | Condición |
| --- | --- | --- |
| `bodeguero` | `ASIGNAR_OPERATIVO` | recepción dentro de sede/bodega/área autorizadas, con `T+C`, recurso y actor resueltos |
| `gerencia_operativa` | `ASIGNAR_OPERATIVO` | coordinación/recepción en sede activa, con `T+C`, territorio y recurso coincidentes; sin alcance global |

La concesión no nace del nombre del oficio. Debe existir asignación operativa vigente y permiso exacto.

---

#### 15. Roles operativos sin concesión por defecto

No reciben `origo.procurement.receipts.register` por defecto:

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

La participación de alguno de estos actores en una necesidad, inspección, entrega o evidencia no equivale a autoridad para registrar la recepción empresarial.

---

#### 16. Roles base y autoridad administrativa

Ningún rol base recibe la capacidad por sí solo porque la modalidad es `OPERATIONAL_ONLY`.

Por tanto:

```text
propietario
gerente_general
gerente
supervisor
auxiliar_administrativa
contador
marketing
trabajador_operativo
```

no autorizan `receipts.register` únicamente por su rol base.

Una persona con rol base administrativo solo puede registrar recepción cuando además posea un rol operativo autorizado, contexto `T+C`, territorio y recurso válidos.

---

#### 17. Recepción normal contra orden de compra

Cuando existe orden de compra, el permiso autoriza únicamente una recepción nueva contra una orden elegible y relacionada con la sede receptora.

Condiciones mínimas:

- orden identificada;
- proveedor coherente;
- sede receptora autorizada;
- líneas recibibles;
- cantidades positivas y válidas;
- actor receptor atribuido;
- ausencia de replay ya consumido;
- estado empresarial compatible con recepción.

La tarea no equipara los literales AS-IS `draft`, `sent` o `received` con el lifecycle canónico completo.

---

#### 18. Recepción directa o de emergencia

La ausencia de `purchase_order_id` no concede un bypass.

Una recepción directa o de emergencia exige como mínimo:

```text
receipts.register válido
+
T+C
+
sede/área autorizadas
+
actor efectivo
+
proveedor y líneas válidos
+
causa obligatoria
+
evidencia y auditoría
```

La regularización comercial, presupuestal o de aprobación que corresponda permanece obligatoria según la política propietaria.

No se inventan montos o umbrales.

---

#### 19. Modo inventariable

El modo AS-IS `inventory` representa una recepción que pretende producir efectos físicos.

Contrato objetivo:

```text
ORIGO
→ registra/verifica/acepta la recepción empresarial

NEXO
→ materializa entrada, ubicación y custodia física cuando corresponda
```

Por tanto, `receipts.register` no concede autoridad general para escribir stock, LOC, posiciones o costo fuera del handoff propietario.

Las escrituras físicas directas observadas en ORIGO permanecen drift AS-IS a reconciliar por las integraciones propietarias.

---

#### 20. Modo solo registro

El modo AS-IS `record_only` no mueve inventario, pero sigue afirmando un hecho de recepción/registro de compra.

Regla:

```text
SIN MOVIMIENTO DE INVENTARIO
!=
SIN AUTORIZACIÓN
```

`record_only` continúa requiriendo `receipts.register`, actor efectivo, `T+C`, sede autorizada y evidencia suficiente.

No habilita importaciones históricas, backfills administrativos ni correcciones retrospectivas por inferencia.

---

#### 21. Actor efectivo y dispositivo compartido

La autorización siempre pertenece al actor humano efectivo.

En dispositivo compartido:

```text
DISPOSITIVO AUTORIZADO
!=
ACTOR AUTORIZADO
```

La sesión debe resolver actor, turno, check-in, sede, área, permiso y recurso antes de mutar.

La firma/PIN observada en el runtime se conserva como evidencia AS-IS. La definición completa de atribución y auditoría de actor permanece en `ORIGO-AUTH-011`.

---

#### 22. Reconciliación con createReceipt

La Server Action `createReceipt` ya revalida en servidor:

- usuario autenticado;
- sede solicitada;
- sesión operativa;
- permiso observado `origo.procurement.receipts`;
- permiso operativo en dispositivo compartido;
- `has_permission` en carril no compartido;
- firma de actor cuando aplica.

La evidencia demuestra un enforcement AS-IS real, pero la identidad usada aún es amplia/legacy respecto del contrato objetivo.

Resultado:

```text
AS_IS_PERMISSION = origo.procurement.receipts
TARGET_PERMISSION = origo.procurement.receipts.register
```

Clasificación:

```text
AS_IS_RECEIPT_REGISTER_BINDING_NEEDS_RENAME
```

---

#### 23. Consulta y registro no comparten autoridad

La consulta permanece en:

```text
origo.procurement.receipts.view
```

La mutación definida aquí es:

```text
origo.procurement.receipts.register
```

Por tanto:

```text
receipts.view
!=
receipts.register
```

El runtime actual que reutiliza `origo.procurement.receipts` para página y mutación debe descomponerse durante la materialización correspondiente.

---

#### 24. Corrección fuera del alcance de register

El runtime actual permite que `createReceipt` reciba `correction_entry_id`, reverse la recepción original y cree un reemplazo.

Ese flujo no queda autorizado por `receipts.register`.

Regla:

```text
NUEVA RECEPCIÓN
→ receipts.register

REEMPLAZO CORRECTIVO
→ AUTORIDAD DE CORRECCIÓN SEPARADA
```

Owner:

```text
ORIGO-AUTH-008 — Definir permisos de corrección
```

Clasificación AS-IS:

```text
AS_IS_REGISTER_AND_CORRECTION_COUPLED
```

---

#### 25. Reversión fuera del alcance de register

La convención canónica ya reconoce la identidad:

```text
origo.procurement.receipts.reverse
```

`receipts.register` no puede sustituirla.

`reverseReceipt` y el RPC correctivo permanecen fuera de esta tarea y son responsabilidad de `ORIGO-AUTH-008` y contratos server-side aplicables.

---

#### 26. Resolución de diferencias fuera del alcance de register

`VSCREEN-0078` y:

```text
VPROC-0022::STEP-RESOLVE_RECEIPT_VARIANCE
```

representan una decisión distinta de la captura ordinaria.

Registrar una recepción con diferencia puede abrir o alimentar esa decisión, pero no autoriza resolverla.

Regla:

```text
CAPTURAR DIFERENCIA
!=
RESOLVER DIFERENCIA
```

---

#### 27. Estados canónicos preservados

El proceso `VPROC-0022` conserva:

```text
RECEIPT_EXPECTED
→ ARRIVAL_REGISTERED
→ PHYSICAL_CHECK_IN_PROGRESS
→ DOCUMENT_CHECK_IN_PROGRESS
→ DIFFERENCE_UNDER_REVIEW
→ ACCEPTANCE_PENDING
→ PUTAWAY_PENDING
→ ECONOMIC_RECONCILIATION_PENDING
→ RECEIPT_RECONCILED
```

`receipts.register` no autoriza saltar automáticamente al estado final.

Una captura puede aportar hechos para una o varias transiciones, pero cada verdad canónica debe quedar respaldada por la evidencia requerida.

---

#### 28. Estados técnicos AS-IS

El runtime usa estados como:

```text
received
recorded
pending_review
reversed
corrected
```

Reglas:

```text
received
!=
RECEIPT_RECONCILED

recorded
!=
PUTAWAY_PENDING

pending_review
!=
DIFFERENCE_UNDER_REVIEW por inferencia
```

La autorización se evalúa contra el estado empresarial y el recurso, no únicamente contra un literal técnico.

---

#### 29. Idempotencia y atomicidad

Registrar una recepción es una mutación empresarial crítica.

El contrato exige:

- idempotency key estable;
- replay sin segunda recepción;
- una sola contabilización de cantidades recibidas;
- cero duplicación de movimientos o costos;
- efectos atómicos o estado durable/reconciliable;
- bloqueo o control de concurrencia sobre la orden/recurso afectado;
- auditoría reforzada.

`receipts.register` no autoriza una implementación no idempotente.

---

#### 30. Efectos sobre orden de compra

Actualizar cantidades recibidas o el resumen técnico de una orden es un efecto derivado de la recepción.

No convierte el permiso en autoridad para:

```text
aprobar compra
editar orden aprobada
emitir orden
cancelar orden
pagar obligación
```

La recepción y el compromiso comercial permanecen procesos distintos.

---

#### 31. Maestro de productos y presentaciones

Una recepción puede detectar producto, presentación o dato maestro pendiente.

`receipts.register` puede producir un handoff de revisión, pero no concede autoridad para aprobar o modificar el maestro.

La revisión de producto conserva su permiso y owner propios.

---

#### 32. Datos comerciales y costos

La recepción puede necesitar una proyección mínima de proveedor, orden, cantidades, presentación, factura y costo aplicable.

El permiso no concede acceso general a:

- contratos completos;
- cuentas bancarias;
- negociaciones;
- márgenes;
- condiciones no necesarias;
- información financiera ajena a la recepción.

`ORIGO-AUTH-010` conserva la protección detallada de precios y datos sensibles.

---

#### 33. Regla fail-closed

Se debe denegar cuando falte o sea ambiguo cualquiera de:

```text
actor efectivo
rol operativo autorizado
turno vigente
check-in activo
permiso exacto
sede
área cuando aplique
recurso/objetivo de recepción
estado elegible
relación con proveedor/orden
```

No existe fallback por rol base, nombre de oficio, sede primaria, parámetro cliente ni acceso general a ORIGO.

---

#### 34. Frontera de auditoría

Toda recepción autorizada debe conservar al menos:

- actor real;
- actor efectivo cuando exista dispositivo compartido;
- rol operativo efectivo;
- sede/área;
- permiso evaluado;
- orden o causa de recepción directa;
- proveedor;
- modalidad `inventory` o `record_only`;
- modo normal o emergencia;
- líneas y cantidades;
- resultado;
- timestamp;
- correlación/idempotencia.

La granularidad final de actor y firma pertenece también a `ORIGO-AUTH-011`.

---

#### 35. Matriz de fronteras

| Capacidad | Identidad | Pertenece a esta tarea |
| --- | --- | --- |
| consultar recepción | `origo.procurement.receipts.view` | no; definida por `ORIGO-AUTH-004` |
| registrar recepción nueva | `origo.procurement.receipts.register` | sí |
| aprobar compra | `origo.procurement.purchase_orders.approve` | no; definida por `ORIGO-AUTH-006` |
| reversar recepción | `origo.procurement.receipts.reverse` | no; reservada a `ORIGO-AUTH-008` |
| reemplazar/corregir recepción | autoridad correctiva separada | no; reservada a `ORIGO-AUTH-008` |
| resolver diferencia | decisión de `VPROC-0022` | no; fuera de recepción ordinaria |
| administrar stock/LOC | permisos NEXO propietarios | no |
| aprobar maestro | permiso propietario del catálogo/revisión | no |

---

#### 36. Brechas AS-IS y propietarios

| Brecha | Riesgo contractual | Propietario | Condición de salida |
| --- | --- | --- | --- |
| `origo.procurement.receipts` agrupa lectura y mutación | permiso demasiado amplio respecto del contrato atómico | `ORIGO-AUTH-004`, `ORIGO-AUTH-007`, `ORIGO-AUTH-014` | consumidor usa `.view` y `.register` según acción |
| `createReceipt` usa el alias amplio | enforcement real con identidad no final | `ORIGO-AUTH-007`, `ORIGO-AUTH-014` | action revalida `receipts.register` exacto |
| `createReceipt` también ejecuta corrección cuando existe `correction_entry_id` | register puede absorber autoridad correctiva | `ORIGO-AUTH-008` | corrección exige capacidad propia y no deriva de register |
| `reverseReceipt` no demuestra recheck equivalente dentro de la acción | reversión con evidencia de autorización insuficiente en esa superficie | `ORIGO-AUTH-008` | reversión revalida autoridad exacta o contrato propietario equivalente |
| ORIGO escribe stock/LOC/costo directamente | frontera física/económica distribuida | integraciones propietarias ORIGO→NEXO/NUMERA | handoff y owner materializan su verdad sin doble escritura |
| recepción directa usa modo `emergency` local | posible bypass si se confunde con autorización comercial | `ORIGO-AUTH-007`, `ORIGO-AUTH-009`, flujo de urgencia propietario | causa, autoridad, límites y regularización quedan fail-closed |
| estados técnicos condensan proceso | cierre prematuro o ambigüedad | contratos `VPROC-0022`, tareas UX/integración | estados canónicos derivan de hechos correlacionados |
| actor en dispositivo compartido depende de firma/PIN AS-IS | atribución insuficiente si actor/contexto divergen | `ORIGO-AUTH-011` | actor real/efectivo y firma quedan auditables end-to-end |

Ninguna brecha queda sin owner y condición de salida.

---

#### 37. Requisitos de prueba derivados

**Resultado:** NO GENERA REQUISITOS DE PRUEBA

**Requisitos creados:** 0
**Requisitos modificados:** 0
**Requisitos diferidos:** 0
**Requisitos obsoletos:** 0
**Fragmentos del Registro 04A afectados:** 0

**Justificación:** esta tarea concreta una capacidad ya prevista por el catálogo y por requisitos vigentes de recepción, autorización, segregación, idempotencia e integración. No introduce una obligación empresarial nueva, un algoritmo nuevo, un estado nuevo, una integración nueva ni una política de seguridad adicional que requiera ampliar el registro.

---

#### 38. Cobertura de prueba vigente reutilizada

Sin modificar el Registro 04A, esta tarea reutiliza:

- `TREQ-ORIGO-001` para distinguir recepción inventariable de solo registro y evitar duplicidad de efectos;
- `TREQ-ORIGO-003` para atomicidad, idempotencia, cantidades, costos, orden y corrección correlacionada;
- `TREQ-ORIGO-004` para separar solicitante, comprador, aprobador y receptor y conservar el ciclo de abastecimiento;
- `TREQ-AUTH-001` para permiso, contexto, alcance y recurso;
- `TREQ-AUTH-010` para segregación de funciones;
- `TREQ-AUTH-013` para enforcement server-side;
- `TREQ-AUTH-015` para evidencia correlacionable;
- requisitos vigentes de integración ORIGO→NEXO/NUMERA cuando la recepción produzca handoffs físicos o económicos.

Esta sección es trazabilidad de cobertura existente y no actualiza el registro.

---

#### 39. Evidencia de validación

| Clase | Estado | Evidencia |
| --- | --- | --- |
| BUILD | `NOT_EXECUTED` | La compilación documental se ejecutará después de incorporar la tarea en su archivo propietario. |
| LOCAL | `NOT_EXECUTED` | No se ejecutaron validadores del checkout del usuario durante la preparación anticipada del artefacto. |
| REMOTA | `PASS` | Se verificaron `vento-shell/main`, `vento-origo/main`, archivo propietario, topología, catálogos de autorización, matrices operativas, `VPROC-0022`, pantallas, Registro 04A y código actual de recepción. |
| OPERATIVA | `NOT_EXECUTED` | No se registró, corrigió, reversó ni recibió una compra real; no se ejecutaron RLS, RPC, stock, costos ni flujos desplegados. |
| FÍSICA | `NOT_APPLICABLE` | `ORIGO-AUTH-007` es `DEFINE_ONCE / NO_PHYSICAL_INSTANCE`; no existe unidad física propia que certificar. |

---

#### 40. Criterios de aceptación

- [x] La tarea mantiene exactamente `ORIGO-AUTH-007 — Definir permisos de recepción`.
- [x] La tarea anterior es `ORIGO-AUTH-006` y la siguiente `ORIGO-AUTH-008`.
- [x] La topología se conserva como `DEFINE_ONCE / NO_PHYSICAL_INSTANCE`.
- [x] Se define exactamente una capacidad de recepción nueva.
- [x] La identidad es `origo.procurement.receipts.register`.
- [x] La modalidad es `OPERATIONAL_ONLY`.
- [x] El prerrequisito es `T+C`.
- [x] El recurso es `PURCHASE_RECEIPT` con objetivo previo suficientemente determinado.
- [x] El binding es `VPROC-0022` / `VSCREEN-0077` / `STEP-RECEIVE_PURCHASE`.
- [x] `bodeguero` y `gerencia_operativa` reciben concesión operativa objetivo.
- [x] Los demás roles operativos listados permanecen sin concesión por defecto.
- [x] Ningún rol base autoriza la recepción por sí solo.
- [x] Se preservan recepción normal y directa/emergencia sin crear bypass.
- [x] Se preservan `inventory` y `record_only` con autorización en ambos casos.
- [x] Se separa consulta de registro.
- [x] Se separa registro de corrección y reversión.
- [x] `origo.procurement.receipts.reverse` queda reservado a la 008.
- [x] Se documenta el acoplamiento AS-IS de register/correction sin aprobarlo.
- [x] Se preservan los nueve estados canónicos de `VPROC-0022`.
- [x] Se exige idempotencia, atomicidad o estado durable/reconciliable.
- [x] Se preserva la frontera ORIGO→NEXO para verdad física.
- [x] Se preserva la frontera económica con NUMERA.
- [x] Todas las brechas tienen owner y condición de salida.
- [x] No se crea ni modifica requisito de prueba.
- [x] No se modifica Registro 04A.
- [x] No se autoriza cambio físico, Supabase, migración ni despliegue.

---

#### 41. Límites

Esta tarea no:

- activa el permiso en el catálogo compartido;
- crea grants físicos;
- modifica matrices persistidas;
- modifica `createReceipt`;
- modifica `reverseReceipt`;
- autoriza corrección o reversión;
- define el permiso final de corrección;
- cambia la ventana de treinta minutos;
- crea estados de recepción;
- cambia RLS o RPC;
- modifica stock, LOC, posiciones o costos;
- transfiere ownership de inventario a ORIGO;
- transfiere ownership económico a ORIGO;
- cambia NEXO o NUMERA;
- crea o registra una recepción real;
- cambia navegación o pantallas;
- modifica Supabase;
- crea migraciones, funciones, triggers, Storage o datos;
- desarrolla `ORIGO-AUTH-008`.

---

#### 42. Continuidad

**ÚLTIMA TAREA APROBADA**
`ORIGO-AUTH-006 — Definir permisos de aprobación`

**TAREA ACTUAL APROBADA**
`ORIGO-AUTH-007 — Definir permisos de recepción`

**SIGUIENTE TAREA RESERVADA**
`ORIGO-AUTH-008 — Definir permisos de corrección`

### ✅ ORIGO-AUTH-008 — Definir permisos de corrección

**Estado:** APROBADA
**Tarea anterior:** ORIGO-AUTH-007 — Definir permisos de recepción
**Tarea siguiente:** ORIGO-AUTH-009 — Limitar órdenes por sede o centro de costo
**Tipo de tarea:** documental; definición cerrada de capacidades atómicas de corrección, actualización, cancelación, activación/desactivación y reversión en ORIGO, separando cambios administrativos, cambios de estado y compensaciones operativas por recurso, modalidad, actor, estado, segregación y evidencia, sin activar todavía las claves en el catálogo compartido ni materializar cambios físicos; `DEFINE_ONCE` / `NO_PHYSICAL_INSTANCE`
**Bloque:** BLOQUE M — ORIGO
**Repositorio propietario:** `vento-group-sas/vento-shell`
**Archivo propietario:** `docs/plan-canonico/modular/bloques/M_ORIGO/01_AUTORIZACION_DE_COMPRAS.md`
**Estado físico resultante:** `NO_PHYSICAL_INSTANCE`
**Cambios físicos autorizados:** ninguno; esta tarea no modifica código, permisos persistidos, matrices físicas, navegación, Server Actions, RLS, RPC, tablas, datos, Supabase, migraciones, Storage, secretos, consumidores ni despliegues
**Requisitos de prueba creados o modificados:** 0

---

#### 1. Propósito

Definir de forma cerrada y verificable qué capacidades de ORIGO permiten corregir información o efectos ya existentes sin convertir un permiso genérico de edición en autoridad para aprobar, recibir, borrar historia o alterar recursos fuera de estado y alcance.

La regla contractual queda:

```text
CONSULTAR
!=
CREAR
!=
ACTUALIZAR
!=
CANCELAR
!=
ACTIVAR / DESACTIVAR
!=
REVERSAR
!=
APROBAR
!=
RECIBIR
```

La tarea diferencia tres familias de corrección:

```text
ORDEN DE COMPRA
→ actualización ordinaria previa a aprobación/emisión
→ cancelación explícita con historia preservada

PROVEEDOR
→ actualización ordinaria
→ activación y desactivación separadas

RECEPCIÓN
→ reversión compensatoria de un efecto ya aplicado
→ corrección con sustitución = reversión autorizada + nueva recepción autorizada + correlación durable
```

No se crea una capacidad genérica `manage`, `edit` o `correct` que absorba operaciones con distinta sensibilidad.

---

#### 2. Frontera recibida de ORIGO-AUTH-007

`ORIGO-AUTH-007` definió la recepción nueva mediante:

```text
origo.procurement.receipts.register
```

con modalidad:

```text
OPERATIONAL_ONLY
T+C
```

y dejó fuera de esa capacidad:

```text
reversión
corrección de una recepción existente
resolución autorizante de una diferencia
```

La frontera se conserva:

```text
RECEPCIÓN NUEVA
→ receipts.register

REVERSIÓN
→ receipts.reverse

CORRECCIÓN CON SUSTITUCIÓN
→ receipts.reverse + receipts.register
```

Por tanto, `correction_entry_id` en el runtime actual no amplía el significado canónico de `receipts.register`.

---

#### 3. Naturaleza y topología

La reconciliación vigente del mini-bloque establece:

```text
ORIGO-AUTH-001..008
mode = DEFINE_ONCE
execution_gate = NO_PHYSICAL_INSTANCE
```

Consecuencias:

1. `ORIGO-AUTH-008` define contrato documental una sola vez;
2. no existe una instancia física propia para esta tarea;
3. no se modifican permisos persistidos, guards, Server Actions, RPC, RLS ni datos;
4. las claves definidas aquí no se presentan como activas hasta su materialización propietaria posterior;
5. toda modificación VENTO de Supabase continúa perteneciendo a `vento-shell`;
6. `ORIGO-AUTH-009` inicia la fase `PER_IMPLEMENTATION_UNIT / POST_E5_PACKAGE` y no se materializa desde esta tarea.

---

#### 4. Fuentes y snapshots verificados

La preparación documental se ancla a:

```text
vento-shell/main
3afbd279eae8875896bfdd22a895846e9afbf065

vento-origo/main
70860f1ca5f0a4a73e894cbb840956f9f7eda2ad

owner blob
7f66dd324626e42cccff5d49f113918ab6474548
```

La secuencia remota verificada registra `ORIGO-AUTH-007` como última tarea incorporada y expone `ORIGO-AUTH-008` como actual. El bloque publicado de `ORIGO-AUTH-007` fue contrastado con el artefacto aprobado y coincide en contenido.

Se contrastaron como mínimo:

- mini-bloque `ORIGO-AUTH-001..015`;
- artefacto aprobado de `ORIGO-AUTH-007`;
- catálogo canónico de convención y normalización de permisos;
- modalidad, prerequisitos, alcance y contratos de recurso vigentes;
- matrices base y operativas aprobadas;
- roles y responsabilidades de `VPROC-0020`, `VPROC-0021` y `VPROC-0022`;
- catálogo de pantallas y pasos;
- estados canónicos de `VPROC-0021` y `VPROC-0022`;
- experiencia administrativa de abastecimiento;
- Registro 04A de ORIGO;
- `src/app/purchase-orders/actions.ts`;
- `src/app/suppliers/actions.ts`;
- `src/app/receipts/page.tsx`;
- `src/app/receipts/new/page.tsx`.

---

#### 5. Convención canónica que gobierna la corrección

La convención aprobada distingue:

```text
update
→ modificar información ordinaria de un recurso existente

cancel
→ detener un proceso sin representar borrado físico

activate / deactivate
→ cambiar estado activo/inactivo de un recurso de ciclo administrado

reverse
→ generar una operación compensatoria sobre un efecto ya aplicado

delete
→ eliminación real del registro
```

Reglas obligatorias:

1. `update` no representa aprobación, reversión ni cancelación;
2. `delete` no se utiliza para cancelar, desactivar o reversar;
3. una operación sensible utiliza el verbo empresarial específico;
4. un permiso representa una única capacidad verificable;
5. frontend, Server Action, RPC, RLS y auditoría deben converger en la misma identidad canónica cuando aplique.

---

#### 6. Universo de capacidades definido por ORIGO-AUTH-008

La tarea define exactamente seis capacidades:

```text
origo.procurement.purchase_orders.update
origo.procurement.purchase_orders.cancel
origo.procurement.suppliers.update
origo.procurement.suppliers.activate
origo.procurement.suppliers.deactivate
origo.procurement.receipts.reverse
```

Cardinalidad:

```text
CAPACIDADES DE CORRECCIÓN DEFINIDAS: 6

ORDEN DE COMPRA: 2
PROVEEDOR: 3
RECEPCIÓN: 1
```

No se crean:

```text
origo.procurement.purchase_orders.delete
origo.procurement.receipts.correct
origo.procurement.receipts.update
origo.procurement.suppliers.delete
```

Tampoco se crea una clave `receipts.resolve` sin una identidad canónica previa explícita. `VPROC-0022::STEP-RESOLVE_RECEIPT_VARIANCE` conserva su significado de proceso y decisión; esta tarea protege las mutaciones correctivas materiales que sí tienen verbo canónico soportado.

---

#### 7. Resumen contractual de las seis capacidades

| Permiso | Recurso | Modalidad | Prerrequisito operativo | Naturaleza |
| --- | --- | --- | --- | --- |
| `origo.procurement.purchase_orders.update` | `PURCHASE_ORDER` | `BASE_ONLY` | no aplica | actualización ordinaria preaprobación/preemisión |
| `origo.procurement.purchase_orders.cancel` | `PURCHASE_ORDER` | `BASE_ONLY` | no aplica | cancelación empresarial con historia preservada |
| `origo.procurement.suppliers.update` | `SUPPLIER` | `BASE_ONLY` | no aplica | actualización ordinaria de expediente permitido |
| `origo.procurement.suppliers.activate` | `SUPPLIER` | `BASE_ONLY` | no aplica | activación explícita del proveedor |
| `origo.procurement.suppliers.deactivate` | `SUPPLIER` | `BASE_ONLY` | no aplica | desactivación explícita sin borrar historia |
| `origo.procurement.receipts.reverse` | `PURCHASE_RECEIPT` | `BASE_AND_OPERATIONAL` | `T+C` | compensación sensible de recepción aplicada |

Las seis capacidades son mutadoras:

```text
is_read_only = false
```

---

#### 8. `purchase_orders.update` — intención exacta

`origo.procurement.purchase_orders.update` permite modificar una orden únicamente mientras el proceso conserve un estado editable previo a aprobación o emisión.

Puede cubrir, según política y field mask aplicables:

- proveedor seleccionado;
- sede o destino todavía editable;
- fecha esperada;
- notas;
- líneas;
- cantidades;
- presentación/unidad;
- condiciones ordinarias permitidas antes de aprobación.

No concede:

```text
approve
issue
cancel
receive
delete
reopen
```

---

#### 9. Estados elegibles para actualización ordinaria de orden

La semántica canónica exige que la actualización ordinaria ocurra antes de que la decisión de aprobación quede consumada.

Como mínimo:

```text
PURCHASE_REQUEST_PENDING_APPROVAL
UNDER_REVIEW
PENDING_APPROVAL
```

pueden admitir edición conforme a la política del caso y su versión.

Después de:

```text
APPROVED
ORDER_PREPARING
ORDER_ISSUED
SUPPLIER_ACK_PENDING
PURCHASE_COMMITMENT_FORMALIZED
```

una modificación material no puede representarse como edición destructiva de la versión ya autorizada.

Regla:

```text
CAMBIO MATERIAL POST-APROBACIÓN
→ NUEVA REVISIÓN / VERSIÓN
→ NUEVA APROBACIÓN CUANDO CORRESPONDA
→ EVIDENCIA DE CAMBIO Y ENVÍO
```

---

#### 10. Field mask de `purchase_orders.update`

La autorización de actualización no implica autoridad universal sobre todas las columnas.

La evaluación deberá considerar:

```text
PERMISO EXACTO
+
ESTADO EDITABLE
+
VERSIÓN VIGENTE
+
ALCANCE DEL RECURSO
+
FIELD MASK AUTORIZADO
```

Quedan fuera por defecto de una actualización ordinaria:

- estados empresariales que exigen verbo específico;
- campos de auditoría;
- actor creador/aprobador;
- evidencia de aprobación;
- evidencia de emisión;
- cantidades recibidas;
- timestamps derivados de otros procesos;
- campos sensibles cuya visibilidad o mutación pertenezca a `ORIGO-AUTH-010`.

---

#### 11. Grants base de `purchase_orders.update`

Decisión objetivo:

| Rol base | Decisión |
| --- | --- |
| `propietario` | `ASIGNAR` |
| `gerente_general` | `ASIGNAR` |
| `gerente` | `ASIGNAR` |
| `supervisor` | `NO_ASIGNAR` |
| `auxiliar_administrativa` | `ASIGNAR` |
| `contador` | `NO_ASIGNAR` |
| `marketing` | `NO_ASIGNAR` |
| `trabajador_operativo` | `NO_ASIGNAR` |

Justificación:

- la preparación y mantenimiento administrativo de la orden pertenece a Compras;
- `auxiliar_administrativa` puede ejecutar correcciones administrativas acotadas;
- consulta contable no concede edición;
- supervisión territorial no concede administración de compras por defecto;
- un rol operativo nunca obtiene actualización de orden por turno.

---

#### 12. `purchase_orders.cancel` — intención exacta

`origo.procurement.purchase_orders.cancel` representa cancelar una orden de compra sin convertir la cancelación en borrado físico del recurso.

Regla:

```text
CANCEL
!=
DELETE
```

La cancelación debe conservar:

- identidad de la orden;
- versión;
- actor;
- motivo;
- fecha efectiva;
- estado previo;
- efectos o compromisos ya generados;
- referencias a proveedor y documentos;
- trazabilidad necesaria para conciliación posterior.

---

#### 13. Estados y límites de `purchase_orders.cancel`

La cancelación solo puede ejecutarse cuando el estado contractual admita detener el proceso sin falsear hechos ya ocurridos.

Antes de emisión o formalización puede existir una cancelación directa gobernada.

Después de:

```text
ORDER_ISSUED
SUPPLIER_ACK_PENDING
PURCHASE_COMMITMENT_FORMALIZED
```

la acción debe evaluar compromisos externos y puede requerir una operación de revisión, anulación contractual o compensación distinta.

Después de recepción o efectos económicos, `cancel` no puede borrar esos hechos.

Resultado fail-closed:

```text
ESTADO NO CANCELABLE
→ DENY
→ NO DEGRADAR A DELETE
```

---

#### 14. Grants base de `purchase_orders.cancel`

Decisión objetivo:

| Rol base | Decisión |
| --- | --- |
| `propietario` | `ASIGNAR` |
| `gerente_general` | `ASIGNAR` |
| `gerente` | `ASIGNAR` |
| `supervisor` | `NO_ASIGNAR` |
| `auxiliar_administrativa` | `NO_ASIGNAR` |
| `contador` | `NO_ASIGNAR` |
| `marketing` | `NO_ASIGNAR` |
| `trabajador_operativo` | `NO_ASIGNAR` |

La matriz de apoyo administrativo conserva expresamente fuera de su autoridad las cancelaciones.

---

#### 15. Reconciliación AS-IS de `updatePurchaseOrder`

El runtime actual permite `updatePurchaseOrder` únicamente cuando:

```text
status = draft
```

Después:

1. modifica cabecera;
2. elimina líneas actuales;
3. inserta las nuevas líneas;
4. recalcula total.

La acción no demuestra dentro de su propia evidencia un check explícito de:

```text
origo.procurement.purchase_orders.update
```

Resultado documental:

```text
AS_IS_PURCHASE_ORDER_UPDATE_WITHOUT_CANONICAL_PERMISSION
```

La restricción `draft` observada es útil, pero no sustituye permiso, territorio, versión, field mask ni atomicidad.

---

#### 16. Reconciliación AS-IS de `deletePurchaseOrder`

El runtime actual:

- exige usuario autenticado;
- usa una lista local de roles;
- limita borrado a `draft`;
- elimina líneas;
- elimina la cabecera.

No existe una identidad canónica aprobada `origo.procurement.purchase_orders.delete` para esta familia.

El contrato objetivo de esta tarea adopta:

```text
AS_IS_PURCHASE_ORDER_DELETE_SHOULD_BE_CANCEL
```

Regla:

```text
BORRADO FÍSICO AS-IS
!=
AUTORIZACIÓN CANÓNICA DE CANCELACIÓN
```

La materialización posterior deberá reconciliar la operación sin inventar que la lista local de roles equivale a permiso final.

---

#### 17. `suppliers.update` — intención exacta

`origo.procurement.suppliers.update` permite actualizar información ordinaria del expediente de un proveedor sin cambiar automáticamente su estado activo.

Puede abarcar, dentro del field mask permitido:

- nombre o identidad visible corregible;
- contactos;
- teléfono;
- correo;
- dirección;
- notas;
- documentos ordinarios;
- condiciones administrativas no sensibles cuya edición esté autorizada.

No concede automáticamente:

```text
activate
deactivate
delete
```

Ni concede por sí sola acceso o edición de contratos, cuentas bancarias, precios sensibles u otros campos protegidos por `ORIGO-AUTH-010`.

---

#### 18. Grants base de `suppliers.update`

Decisión objetivo:

| Rol base | Decisión |
| --- | --- |
| `propietario` | `ASIGNAR` |
| `gerente_general` | `ASIGNAR` |
| `gerente` | `ASIGNAR` |
| `supervisor` | `NO_ASIGNAR` |
| `auxiliar_administrativa` | `ASIGNAR` |
| `contador` | `NO_ASIGNAR` |
| `marketing` | `NO_ASIGNAR` |
| `trabajador_operativo` | `NO_ASIGNAR` |

El rol de apoyo administrativo puede mantener expediente dentro de límites explícitos, pero no adquiere autoridad operativa ni de decisión sensible.

---

#### 19. `suppliers.activate` — intención exacta

`origo.procurement.suppliers.activate` habilita un proveedor para nuevas operaciones conforme a su expediente y controles aplicables.

Activar exige como mínimo:

- identidad válida;
- ausencia de contradicción de estado;
- documentación obligatoria aplicable;
- actor autorizado;
- alcance organizacional permitido;
- auditoría de la transición.

Regla:

```text
CREATE
!=
ACTIVATE
```

Crear un proveedor no lo habilita automáticamente para uso operativo.

---

#### 20. `suppliers.deactivate` — intención exacta

`origo.procurement.suppliers.deactivate` impide nuevas operaciones con el proveedor sin borrar su historia.

La desactivación debe preservar:

- órdenes históricas;
- recepciones;
- contratos y condiciones históricas;
- evaluaciones;
- documentos;
- referencias económicas;
- trazabilidad del actor y motivo.

Regla:

```text
DEACTIVATE
!=
DELETE
```

---

#### 21. Grants base de activación y desactivación de proveedor

Decisión objetivo para ambas capacidades:

| Rol base | `activate` | `deactivate` |
| --- | --- | --- |
| `propietario` | `ASIGNAR` | `ASIGNAR` |
| `gerente_general` | `ASIGNAR` | `ASIGNAR` |
| `gerente` | `ASIGNAR` | `ASIGNAR` |
| `supervisor` | `NO_ASIGNAR` | `NO_ASIGNAR` |
| `auxiliar_administrativa` | `NO_ASIGNAR` | `NO_ASIGNAR` |
| `contador` | `NO_ASIGNAR` | `NO_ASIGNAR` |
| `marketing` | `NO_ASIGNAR` | `NO_ASIGNAR` |
| `trabajador_operativo` | `NO_ASIGNAR` | `NO_ASIGNAR` |

La separación permite que el apoyo administrativo mantenga información sin poder habilitar o retirar unilateralmente una contraparte comercial.

---

#### 22. Reconciliación AS-IS de `updateSupplier`

El runtime actual `updateSupplier` utiliza el helper amplio `requireCanManageSuppliers` y actualiza en una misma mutación:

- datos ordinarios;
- condiciones de pago observadas;
- `is_active`.

Resultado:

```text
AS_IS_SUPPLIER_UPDATE_AND_STATUS_COUPLED
```

El contrato objetivo separa:

```text
suppliers.update
suppliers.activate
suppliers.deactivate
```

Un solo helper `manage` no satisface por sí mismo esa separación.

---

#### 23. Reconciliación AS-IS de `deleteSupplier`

El runtime actual permite borrado físico si no existen órdenes vinculadas y el helper `requireCanManageSuppliers` lo autoriza.

La familia canónica documentada no contiene:

```text
origo.procurement.suppliers.delete
```

Resultado:

```text
AS_IS_SUPPLIER_DELETE_WITHOUT_CANONICAL_DELETE
```

Esta tarea no inventa esa capacidad.

La política objetivo privilegia `deactivate` para retiro del uso ordinario y preservación histórica. Cualquier eliminación física excepcional requeriría un contrato explícito distinto y no queda autorizada aquí.

---

#### 24. `receipts.reverse` — intención exacta

`origo.procurement.receipts.reverse` representa una operación compensatoria sobre una recepción cuyos efectos ya fueron aplicados.

No es:

```text
update
cancel
delete
register
```

La reversión debe conservar la recepción original como evidencia histórica y producir una relación compensatoria auditable.

---

#### 25. Modalidad de `receipts.reverse`

La reversión combina decisión administrativa sensible con presencia operativa sobre el recurso afectado.

Contrato:

```text
authorization_requirement = BASE_AND_OPERATIONAL
base prerequisite = N
operational prerequisite = T+C
is_read_only = false
```

Decisión final:

```text
BASE VÁLIDO
AND
OPERATIVO VÁLIDO
→ puede continuar a validación de recurso/estado

FALTA UNO DE LOS DOS
→ DENY
```

---

#### 26. Recurso y territorio de `receipts.reverse`

Contrato de recurso objetivo:

```text
resource = PURCHASE_RECEIPT
locator = receipt_id
target = RECEIPT_DESTINATION_INTERSECTION
```

La autorización debe resolver como mínimo:

- recepción original;
- orden relacionada cuando exista;
- sede receptora;
- área/ubicación afectada;
- productos y cantidades;
- actor receptor;
- movimientos o efectos ya generados;
- contexto operativo actual;
- alcance base del actor.

La intersección debe ser válida tanto para autoridad base como para contexto operativo.

---

#### 27. Prerrequisitos operativos de `receipts.reverse`

El componente operativo exige:

```text
TURNO VIGENTE
+
CHECK-IN ACTIVO
+
ACTOR EFECTIVO
+
SEDE COMPATIBLE
+
ÁREA COMPATIBLE
+
RECURSO RESUELTO
```

Además, por sensibilidad, la materialización deberá exigir motivo y mecanismo de reautenticación reforzada cuando el contrato transversal aplicable lo determine.

El `site_id` recibido desde cliente nunca sustituye la resolución autoritativa del territorio.

---

#### 28. Componente base de `receipts.reverse`

Decisión objetivo:

| Rol base | Componente base |
| --- | --- |
| `propietario` | `ASIGNAR COMPONENTE BASE` |
| `gerente_general` | `ASIGNAR COMPONENTE BASE` |
| `gerente` | `ASIGNAR COMPONENTE BASE` |
| `supervisor` | `NO_ASIGNAR` |
| `auxiliar_administrativa` | `NO_ASIGNAR` |
| `contador` | `NO_ASIGNAR` |
| `marketing` | `NO_ASIGNAR` |
| `trabajador_operativo` | `NO_ASIGNAR` |

La concesión base por sí sola nunca ejecuta la reversión.

---

#### 29. Componente operativo de `receipts.reverse`

Decisión objetivo:

| Rol operativo | Componente operativo |
| --- | --- |
| `cajero_satelite` | `NO_ASIGNAR` |
| `barista_satelite` | `NO_ASIGNAR` |
| `cocinero_satelite` | `NO_ASIGNAR` |
| `servicio_salon` | `NO_ASIGNAR` |
| `mostrador_satelite` | `NO_ASIGNAR` |
| `operador_integral_satelite` | `NO_ASIGNAR` |
| `produccion_cocina` | `NO_ASIGNAR` |
| `produccion_panaderia` | `NO_ASIGNAR` |
| `produccion_reposteria` | `NO_ASIGNAR` |
| `bodeguero` | `NO_ASIGNAR` |
| `conductor_logistica` | `NO_ASIGNAR` |
| `gerencia_operativa` | `ASIGNAR COMPONENTE OPERATIVO` |

La decisión sigue el patrón canónico de las correcciones físicas sensibles: el ejecutor ordinario puede registrar el hecho, pero no revertirlo unilateralmente.

---

#### 30. Estado elegible de una reversión

La reversión no se autoriza solo porque el runtime tenga una fila con estado técnico `received`.

La evaluación deberá comprobar:

```text
RECURSO EXISTENTE
+
ESTADO CORREGIBLE
+
EFECTOS IDENTIFICABLES
+
NO CONTRADICCIÓN DE CONCILIACIÓN
+
MOTIVO
+
AUTORIDAD BASE
+
CONTEXTO OPERATIVO
```

Si los efectos posteriores ya hacen imposible una compensación simple, la acción falla cerrado y escala al flujo de resolución/reconciliación correspondiente.

La constante AS-IS de treinta minutos no se convierte en política empresarial canónica por esta tarea.

---

#### 31. Corrección de recepción con sustitución

Una corrección que reemplaza una recepción errónea requiere dos capacidades distintas:

```text
origo.procurement.receipts.reverse
+
origo.procurement.receipts.register
```

La primera autoriza compensar la recepción original.

La segunda autoriza registrar el reemplazo.

La corrección completa exige además correlación:

```text
ORIGINAL
↔ REVERSIÓN
↔ REEMPLAZO
```

No se crea `receipts.correct` porque el contrato puede expresarse con las dos capacidades atómicas existentes y la obligación de correlación.

---

#### 32. Atomicidad y durabilidad de la corrección de recepción

La operación empresarial no puede dejar definitivamente la recepción original reversada si el reemplazo requerido no queda garantizado.

Contrato:

```text
REVERSIÓN ORIGINAL
+
CREACIÓN DE REEMPLAZO
+
VÍNCULO ORIGINAL/REEMPLAZO
+
EFECTOS DE INVENTARIO/COSTO/ORDEN
+
AUDITORÍA
→ ATÓMICOS
  O DURABLES, IDENTIFICABLES Y RECONCILIABLES
```

Un fallo intermedio debe producir un estado recuperable y visible, nunca éxito parcial silencioso.

---

#### 33. Reconciliación AS-IS de `reverseReceipt`

La Server Action actual:

- exige autenticación;
- exige comentario;
- comprueba `entry_id`;
- compara la sede de la fila con `site_id` recibido;
- exige `status = received`;
- aplica la ventana local de treinta minutos;
- invoca `origo_reverse_inventory_entry`.

No demuestra dentro de la acción un check equivalente de permiso antes del RPC.

Resultado:

```text
AS_IS_RECEIPT_REVERSE_PERMISSION_RECHECK_NOT_DEMONSTRATED
```

La conclusión no afirma ausencia de RLS o protección dentro del RPC; afirma únicamente que la Server Action no constituye por sí sola evidencia suficiente del permiso canónico exacto.

---

#### 34. Reconciliación AS-IS de corrección dentro de `createReceipt`

Cuando existe `correction_entry_id`, el runtime actual:

1. fuerza modo inventariable;
2. verifica la recepción original;
3. invoca reversión;
4. crea un nuevo registro;
5. genera sus efectos;
6. intenta vincular original y reemplazo.

El mismo permiso AS-IS de recepción gobierna ese flujo.

Resultado:

```text
AS_IS_REGISTER_AND_CORRECTION_COUPLED
```

El contrato objetivo exige:

```text
REGISTER AUTHORITY
!=
REVERSE AUTHORITY
```

---

#### 35. VSCREEN-0078 y resolución de diferencias

`VSCREEN-0078 — Resolución de diferencias de recepción` pertenece a:

```text
VPROC-0022
VPROC-0022::STEP-RESOLVE_RECEIPT_VARIANCE
```

La tarea preserva esa decisión de proceso.

Sin embargo, no existe en las fuentes consumidas una identidad previa exacta `origo.procurement.receipts.resolve` que esta tarea pueda asumir sin una decisión adicional del catálogo.

Por ello:

1. no se inventa una séptima clave;
2. `receipts.reverse` protege la compensación material cuando una resolución exige reversión;
3. `receipts.register` protege el nuevo registro cuando existe reemplazo;
4. una decisión de aceptar, rechazar o resolver una diferencia no hereda automáticamente ninguno de esos permisos;
5. la experiencia y materialización posterior deberán preservar `VSCREEN-0078` y sus decisiones sin degradarlas a un botón de reversión.

---

#### 36. Frontera con VSCREEN-0071, VSCREEN-0073 y VSCREEN-0075

La tarea conserva:

```text
VSCREEN-0071
→ expediente de proveedor
→ suppliers.update / activate / deactivate según acción

VSCREEN-0073
→ preparación/versionado de orden
→ purchase_orders.update para edición ordinaria permitida

VSCREEN-0075
→ seguimiento de orden
→ cancel solo cuando estado y autoridad lo permiten
```

Abrir una pantalla o visualizar un botón no concede la mutación.

---

#### 37. Separación de permisos por sensibilidad

Matriz de fronteras:

| Acción | Permiso requerido | No sustituye |
| --- | --- | --- |
| editar orden preaprobación | `purchase_orders.update` | aprobar, emitir, cancelar |
| cancelar orden | `purchase_orders.cancel` | borrar, reversar recepción |
| editar expediente proveedor | `suppliers.update` | activar/desactivar |
| activar proveedor | `suppliers.activate` | crear/editar |
| desactivar proveedor | `suppliers.deactivate` | borrar historia |
| registrar recepción | `receipts.register` | reversar/corregir |
| reversar recepción | `receipts.reverse` | registrar nueva recepción |

No existe herencia implícita entre filas.

---

#### 38. Regla de administración versus operación

Las cinco capacidades de orden/proveedor definidas aquí son administrativas:

```text
BASE_ONLY
```

No dependen de turno ni check-in.

`receipts.reverse` es distinta:

```text
BASE_AND_OPERATIONAL
```

porque modifica una recepción ya aplicada y puede exigir compensar verdad operativa vinculada con inventario, ubicación, cantidades y otros efectos.

Regla:

```text
GERENCIA ADMINISTRATIVA
!=
CONTEXTO OPERATIVO
```

Para `receipts.reverse` se necesitan ambos carriles.

---

#### 39. Segregación de funciones

La tarea preserva separación entre:

```text
CREADOR DE ORDEN
APROBADOR
RECEPTOR
AUTOR DE CORRECCIÓN
```

No se prohíbe que una misma persona tenga múltiples capacidades en abstracto cuando el modelo organizacional lo autorice, pero la decisión concreta debe aplicar las reglas de segregación y autoaprobación correspondientes.

Para reversión sensible, el actor que registró la recepción no adquiere por ese hecho autoridad para revertirla.

---

#### 40. Auditoría mínima de correcciones

Toda corrección autorizada debe conservar como mínimo:

- actor real;
- actor operativo cuando aplique;
- permiso exacto;
- carril que autorizó;
- recurso;
- versión o estado previo;
- cambio solicitado;
- motivo cuando la acción sea cancelación, desactivación o reversión;
- territorio resuelto;
- resultado;
- correlación con reemplazo o efecto compensatorio cuando aplique;
- timestamp autoritativo;
- identificador de auditoría.

No se sobrescribe silenciosamente el hecho anterior.

---

#### 41. Frontera con territorio y centro de costo

Esta tarea define capacidades, pero no materializa la política territorial final de órdenes.

Toda mutación de orden seguirá necesitando:

```text
PERMISO
+
RECURSO
+
ESTADO
+
ALCANCE
```

La resolución completa por sede o centro de costo pertenece a:

```text
ORIGO-AUTH-009 — Limitar órdenes por sede o centro de costo
```

No se presume que `site_id` enviado por cliente sea territorio autorizado.

---

#### 42. Frontera con precios y datos sensibles

`purchase_orders.update` y `suppliers.update` no conceden por sí mismos acceso a todos los campos sensibles.

Protecciones sobre:

- precios;
- totales;
- condiciones comerciales sensibles;
- contratos;
- datos tributarios;
- cuentas bancarias;
- documentos externos;
- exportación;

permanecen bajo `ORIGO-AUTH-010` y contratos de privacidad aplicables.

Un permiso de actualización con field mask limitado no se convierte en permiso de revelar campos ocultos.

---

#### 43. Brechas AS-IS y propietarios posteriores

| Brecha | Riesgo | Propietario posterior | Condición de salida |
| --- | --- | --- | --- |
| `updatePurchaseOrder` sin permiso canónico exacto demostrado | edición fuera de política si capas inferiores no restringen | `ORIGO-AUTH-014` + package propietario | consumidor usa `purchase_orders.update` server-side y por recurso/estado |
| borrado físico de orden `draft` | pérdida de historia o equivalencia falsa con cancelación | `ORIGO-AUTH-014` + package propietario | cancelación canónica preserva historia; delete no se usa como alias |
| `updateSupplier` mezcla datos y `is_active` | update obtiene autoridad de activación/desactivación | `ORIGO-AUTH-014` + package propietario | capacidades quedan separadas y verificadas |
| `deleteSupplier` carece de permiso canónico de delete | eliminación fuera del contrato definido | `ORIGO-AUTH-014` + package propietario | runtime retira/transforma la operación o existe contrato explícito independiente antes de habilitarla |
| `reverseReceipt` no demuestra recheck de permiso en la acción | compensación invocable con evidencia incompleta | `ORIGO-AUTH-014` + package propietario | `receipts.reverse` se revalida en límite de confianza |
| corrección usa el mismo permiso AS-IS que recepción nueva | capacidad operativa ordinaria amplía corrección sensible | `ORIGO-AUTH-014` + package propietario | reverse y register se evalúan independientemente |
| corrección multi-step puede fallar entre reversión y reemplazo | recepción original reversada sin reemplazo | integración/DB propietaria + `ORIGO-AUTH-015` | operación atómica o durable/reconciliable e idempotente |
| constante local de 30 minutos actúa como política implícita | ventana correctiva sin contrato empresarial | implementación propietaria de `VPROC-0022` | estado/ventana se deriva de política canónica y evidencia |

Ninguna brecha queda sin dueño y condición de salida.

---

#### 44. Requisitos de prueba derivados

**Resultado:** NO GENERA REQUISITOS DE PRUEBA

**Requisitos creados:** 0
**Requisitos modificados:** 0
**Requisitos diferidos:** 0
**Requisitos obsoletos:** 0
**Fragmentos del Registro 04A afectados:** 0

**Justificación:** las capacidades definidas concretan fronteras ya protegidas por requisitos vigentes sobre mutación de órdenes, separación de capacidades, historia de proveedores, corrección de recepción, atomicidad, idempotencia, segregación y autorización server-side. No se introduce una obligación verificable adicional que requiera modificar el registro.

---

#### 45. Cobertura de prueba vigente reutilizada

Sin modificar el Registro 04A, esta tarea reutiliza:

- `TREQ-ORIGO-001` para corrección/repetición de recepción sin duplicar cantidades, costos, orden ni evento financiero;
- `TREQ-ORIGO-002` para limitar mutaciones de órdenes por permiso, territorio, estado y columnas;
- `TREQ-ORIGO-003` para corrección de recepción atómica o durable, idempotente y con reemplazo correlacionado;
- `TREQ-ORIGO-004` para impedir edición destructiva postaprobación/postemisión y exigir revisión/aprobación cuando corresponda;
- `TREQ-ORIGO-005` para identidad, estado e historia del proveedor sin sobrescribir condiciones históricas;
- `TREQ-AUTH-001` para permiso, contexto, alcance y recurso;
- `TREQ-AUTH-010` para segregación de funciones;
- `TREQ-AUTH-013` para protección server-side;
- `TREQ-AUTH-015` para evidencia correlacionable.

Esta sección es trazabilidad de cobertura existente, no actualización del registro.

---

#### 46. Evidencia de validación

| Clase | Estado | Evidencia |
| --- | --- | --- |
| BUILD | `NOT_EXECUTED` | La compilación documental se ejecutará después de incorporar la tarea en el archivo propietario. |
| LOCAL | `NOT_EXECUTED` | No se ejecutaron validadores del checkout del usuario durante la preparación anticipada. |
| REMOTA | `PASS` | Se verificaron `vento-shell/main`, `vento-origo/main`, owner, topología, catálogo de permisos, matrices, procesos/pantallas/estados, Registro 04A y runtime actual de órdenes, proveedores y recepciones. |
| OPERATIVA | `NOT_EXECUTED` | No se actualizó/canceló una orden, proveedor o recepción real; no se ejecutaron RPC, RLS, datos productivos ni flujos desplegados. |
| FÍSICA | `NOT_APPLICABLE` | `ORIGO-AUTH-008` es `DEFINE_ONCE / NO_PHYSICAL_INSTANCE`. |

---

#### 47. Criterios de aceptación

- [x] La tarea mantiene exactamente `ORIGO-AUTH-008 — Definir permisos de corrección`.
- [x] La tarea anterior es `ORIGO-AUTH-007` y la siguiente `ORIGO-AUTH-009`.
- [x] La topología se conserva como `DEFINE_ONCE / NO_PHYSICAL_INSTANCE`.
- [x] Se definieron exactamente seis capacidades atómicas.
- [x] `purchase_orders.update` queda separado de `approve`, `cancel` y `delete`.
- [x] `purchase_orders.cancel` preserva historia y no se representa como borrado.
- [x] `suppliers.update`, `activate` y `deactivate` quedan separados.
- [x] No se crea `suppliers.delete`.
- [x] `receipts.reverse` queda separado de `receipts.register`.
- [x] La corrección con sustitución exige `reverse + register` y correlación durable.
- [x] No se crea un permiso genérico `correct`.
- [x] No se inventa `receipts.resolve` sin identidad canónica explícita.
- [x] Se preserva `VSCREEN-0078` como resolución de diferencias de `VPROC-0022`.
- [x] Cinco capacidades administrativas quedan `BASE_ONLY`.
- [x] `receipts.reverse` queda `BASE_AND_OPERATIONAL` con `T+C`.
- [x] Se definieron grants base para actualización/cancelación de orden y mantenimiento de proveedor.
- [x] Se definieron componentes base y operativos para reversión de recepción.
- [x] `bodeguero` puede registrar recepción ordinaria por contrato anterior, pero no recibe reversión por defecto.
- [x] `gerencia_operativa` recibe únicamente el componente operativo de reversión.
- [x] Se registraron los gaps AS-IS sin afirmar ausencia de RLS/RPC cuando no está demostrada.
- [x] Se preservaron los estados de `VPROC-0021` y `VPROC-0022` sin crear aliases.
- [x] No se modifica Registro 04A.
- [x] No se crea ni modifica requisito de prueba.
- [x] No se autoriza cambio físico, Supabase, migración ni despliegue.
- [x] `ORIGO-AUTH-009` queda reservada y no se desarrolla aquí.

---

#### 48. Límites

Esta tarea no:

- implementa las seis capacidades;
- activa permisos en el catálogo compartido;
- migra grants físicos;
- cambia `employees.role`;
- cambia `requireCanManageSuppliers`;
- modifica `updatePurchaseOrder`;
- modifica `deletePurchaseOrder`;
- modifica `updateSupplier`;
- modifica `deleteSupplier`;
- modifica `reverseReceipt`;
- modifica `createReceipt`;
- cambia la ventana de treinta minutos;
- crea `purchase_orders.delete`;
- crea `suppliers.delete`;
- crea `receipts.correct`;
- crea `receipts.resolve`;
- define la política territorial final por sede/centro de costo;
- define field masks sensibles finales;
- ejecuta RLS o RPC;
- modifica Supabase;
- crea migraciones;
- modifica NEXO o NUMERA;
- desarrolla `ORIGO-AUTH-009`.

---

#### 49. Continuidad

**ÚLTIMA TAREA APROBADA**
`ORIGO-AUTH-007 — Definir permisos de recepción`

**TAREA ACTUAL APROBADA**
`ORIGO-AUTH-008 — Definir permisos de corrección`

**SIGUIENTE TAREA RESERVADA**
`ORIGO-AUTH-009 — Limitar órdenes por sede o centro de costo`

### ✅ ORIGO-AUTH-009 — Limitar órdenes por sede o centro de costo

**Estado:** APROBADA
**Tarea anterior:** ORIGO-AUTH-008 — Definir permisos de corrección
**Tarea siguiente:** ORIGO-AUTH-010 — Proteger precios y datos sensibles
**Tipo de tarea:** contrato global con materialización por unidad (`PER_IMPLEMENTATION_UNIT`) — definición de la política territorial canónica para lectura y mutación de órdenes de compra ORIGO por sede, destinos y centro de costo, con recurso `PURCHASE_ORDER`, alcance `PO_DESTINATIONS`, separación base/operativa, tratamiento multidestino, revalidación server-side, denegación cerrada y reconciliación del runtime AS-IS, sin materializar todavía ninguna unidad física
**Bloque:** BLOQUE M — ORIGO
**Repositorio propietario:** `vento-group-sas/vento-shell`
**Archivo propietario:** `docs/plan-canonico/modular/bloques/M_ORIGO/01_AUTORIZACION_DE_COMPRAS.md`
**Estado físico resultante:** `ESPECIFICADO_NO_MATERIALIZADO`
**Cambios físicos autorizados:** 0 durante este marcador global; las materializaciones futuras ocurren únicamente mediante `ORIGO-AUTH-009::<implementation_unit_id>` después de que el paquete propietario aplicable supere `E5-GATE-008::<package_id>` y exista autorización física explícita
**Requisitos de prueba creados o modificados:** 0

---

#### 1. Propósito

Definir de forma cerrada y verificable **dónde** puede consultar o actuar un actor sobre una orden de compra ORIGO sin confundir permiso, sede seleccionada, sede asignada, centro de costo, relación con el proveedor, comprador, contexto operativo o identificador de la orden.

La regla raíz queda:

```text
PERMISO EXACTO
+
PURCHASE_ORDER RESUELTA EN SERVIDOR
+
ALCANCE DEL ACTOR
+
DESTINOS AUTORIZADOS
+
CENTRO DE COSTO AUTORIZADO CUANDO APLIQUE
+
ESTADO / POLÍTICA DE LA ACCIÓN
=
DECISIÓN TERRITORIAL AUTORIZABLE
```

Nunca:

```text
site_id DEL CLIENTE
OR
selected_site_id
OR
employee.site_id
OR
purchase_order_id CONOCIDO
OR
CENTRO DE COSTO INFERIDO
=
AUTORIZACIÓN
```

La tarea especializa para órdenes el modelo transversal de territorio y recurso ya aprobado; no crea un sistema paralelo de scopes.

---

#### 2. Handoff recibido de ORIGO-AUTH-004..008

Esta tarea consume sin reinterpretación las decisiones ya cerradas:

1. `ORIGO-AUTH-004` definió `origo.procurement.purchase_orders.view` como lectura `BASE_OR_OPERATIONAL` sobre `PURCHASE_ORDER`, con alcance `PO_DESTINATIONS`;
2. `ORIGO-AUTH-005` definió `origo.procurement.purchase_orders.create` como `BASE_ONLY` y reservó a esta tarea el cierre territorial de sede y centro de costo;
3. `ORIGO-AUTH-006` definió `origo.procurement.purchase_orders.approve` como `BASE_ONLY`, sujeto además a política de aprobación, segregación y autoridad decisoria;
4. `ORIGO-AUTH-007` confirmó que una recepción debe reautorizar la orden relacionada y que el `site_id` de cliente no es autoridad;
5. `ORIGO-AUTH-008` definió `origo.procurement.purchase_orders.update` y `origo.procurement.purchase_orders.cancel` como capacidades `BASE_ONLY` separadas.

Por tanto, `ORIGO-AUTH-009` no redefine quién posee cada capacidad. Define la intersección territorial que esas capacidades deben respetar cuando operan sobre `PURCHASE_ORDER`.

---

#### 3. Topología y frontera física

La topología vigente es:

```text
mode = PER_IMPLEMENTATION_UNIT
execution_gate = POST_E5_PACKAGE
```

Consecuencias:

1. este marcador define una sola vez el contrato global reutilizable;
2. no se crea una instancia física durante la aprobación documental del marcador;
3. cada materialización futura usa `ORIGO-AUTH-009::<implementation_unit_id>`;
4. una misma unidad puede ser consumida por varios paquetes mediante lineage cuando el lifecycle lo determine;
5. toda unidad física exige previamente el `E5-GATE-008::<package_id>` aplicable en `PASS` y autorización física explícita;
6. esta conversación documental no selecciona `package_id`, `implementation_unit_id`, target paths ni ambiente de despliegue;
7. cualquier modificación VENTO de Supabase continúa perteneciendo a `vento-shell` y a la instancia física propietaria.

---

#### 4. Fuentes y snapshots de preparación

La preparación se ancla a:

```text
vento-shell/main
c4425c5a8ac0e9da078bff8ec2b11b9db7743bef

vento-origo/main
70860f1ca5f0a4a73e894cbb840956f9f7eda2ad
```

El remoto de `vento-shell` ya incorpora `ORIGO-AUTH-008`. El bloque publicado coincide exactamente con el artefacto aprobado utilizado como predecessor de esta tarea, por lo que `ORIGO-AUTH-009` es la tarea documental actual y no una preparación anticipada.

Se contrastaron, como mínimo:

- topología `PER_IMPLEMENTATION_UNIT / POST_E5_PACKAGE`;
- contrato de recurso `PURCHASE_ORDER`;
- alcance `PO_DESTINATIONS`;
- modelo de scopes global, sede, área y contexto;
- matrices base y operativas aplicables a lectura de órdenes;
- contratos de creación, aprobación y recepción ya aprobados;
- Registro 04A ORIGO vigente;
- contrato de integración de compra y evento económico;
- runtime actual de listado, creación, detalle, edición y Server Actions de `purchase-orders`;
- migración de hardening que retira la policy genérica `employees_crud_purchase_orders`;
- dossier de package actualmente existente que referencia esta tarea sin resolver aún unidades físicas.

---

#### 5. Universo exacto de capacidades territorializadas

La tarea aplica a exactamente cinco capacidades de orden:

```text
origo.procurement.purchase_orders.view
origo.procurement.purchase_orders.create
origo.procurement.purchase_orders.approve
origo.procurement.purchase_orders.update
origo.procurement.purchase_orders.cancel
```

Cardinalidad:

```text
CAPACIDADES DE ORDEN TERRITORIALIZADAS: 5
LECTURA BASE_OR_OPERATIONAL: 1
MUTACIONES BASE_ONLY: 4
```

No se crea una capacidad territorial adicional. El territorio restringe una acción existente; no sustituye su permiso.

---

#### 6. Recurso, alcance territorial y dimensión de centro de costo

La identidad de autorización permanece:

```text
RECURSO
PURCHASE_ORDER

LOCALIZADOR
purchase_order_id o filtro autorizado

ALCANCE TERRITORIAL DE RECURSO
PO_DESTINATIONS

DIMENSIÓN ADICIONAL DE POLÍTICA CUANDO APLIQUE
cost_center_ref
```

`PO_DESTINATIONS` conserva exactamente la relación aprobada de la orden con:

- negocio aplicable;
- proveedor como relación comercial, no como propietario de territorio;
- sede o sedes destino;
- áreas receptoras cuando correspondan;
- comprador como relación con el recurso, no como ownership universal.

Esta tarea **no redefine** `PO_DESTINATIONS` para convertir el centro de costo en territorio de recurso. `cost_center_ref` se evalúa como una dimensión adicional de política/atribución cuando la compra la requiera y se intersecta con el alcance territorial de la orden.

El localizador identifica el recurso. Nunca concede autoridad sobre él.

---

#### 7. Sede, área y centro de costo son dimensiones distintas

La tarea fija estas desigualdades:

```text
site_id != cost_center_ref
site_id != area_id
area_id != cost_center_ref
selected_site_id != authorized_site_id
employee.site_id != conjunto autorizado de sedes
```

Una sede describe territorio empresarial. Un área describe una subdivisión empresarial dentro de una sede. Un centro de costo describe una referencia de atribución y control económico/organizacional.

Ninguna dimensión se deriva automáticamente de otra por nombre, UI, rol o conveniencia.

---

#### 8. Fuente territorial de sede

Para scopes administrativos por sedes asignadas, la fuente de verdad permanece:

```text
public.employee_sites
WHERE employee_id = actor
AND is_active = true
```

No:

```text
employees.site_id
selected_site_id
query.site_id
form.site_id
prefill.site_id
```

Reglas:

1. `employees.site_id` puede existir como dato legado o primario, pero no sustituye el conjunto autorizado;
2. `selected_site_id` es contexto de interfaz y no autoridad;
3. un filtro de listado no crea scope;
4. una sede recibida desde formulario es una propuesta de destino que el servidor debe validar;
5. una relación activa con una sede no concede automáticamente todas las capacidades ORIGO sobre ella.

---

#### 9. Centro de costo como referencia autorizable

Cuando una compra deba atribuirse o limitarse por centro de costo, el sistema deberá consumir un `cost_center_ref` canónico o una identidad equivalente aprobada por su fuente propietaria.

El centro de costo utilizado debe:

1. existir;
2. estar vigente para la fecha aplicable;
3. pertenecer al ámbito organizacional compatible;
4. ser compatible con el negocio, sede o estructura de la orden según el contrato vigente;
5. estar dentro de la cobertura autorizada del actor para la acción concreta;
6. quedar vinculado de forma estable a la versión de la orden o decisión que lo utilizó cuando sea material para auditoría.

No se autoriza inferirlo únicamente desde:

- nombre de sede;
- actor;
- rol;
- proveedor;
- texto libre;
- query parameter;
- resultado aislado de un helper técnico.

---

#### 10. `get_site_cost_center` no es autoridad

La auditoría técnica registró una RPC `get_site_cost_center` que puede devolver un identificador interno de centro de costo por sede.

Su existencia no establece:

```text
UNA SEDE = UN ÚNICO CENTRO DE COSTO
```

ni:

```text
RPC RESPONDE UN ID
=
ACTOR AUTORIZADO SOBRE ESE CENTRO
```

Si una materialización futura consume esa función o una sustituta, deberá tratar su resultado como referencia a validar, no como concesión de acceso.

La protección de exposición anónima de helpers y centros de costo permanece en sus owners de Supabase/autorización; esta tarea no modifica la RPC.

---

#### 11. Política territorial de lectura

Para `origo.procurement.purchase_orders.view`, la lectura final requiere:

```text
PERMISO view
+
CARRIL BASE U OPERATIVO VÁLIDO
+
PURCHASE_ORDER RESUELTA
+
RELACIÓN TERRITORIAL AUTORIZADA
+
PROYECCIÓN COMPATIBLE
```

Reglas:

1. conocer `purchase_order_id` no concede lectura;
2. un actor debe tener al menos una relación autorizada con el recurso para recibir una proyección;
3. cada destino mostrado debe estar autorizado individualmente;
4. si la orden contiene destinos fuera del alcance, la lectura solo puede usar la proyección parcial permitida por el contrato de recurso;
5. una proyección parcial no amplía autoridad sobre destinos ocultos;
6. cero destinos autorizados produce `DENY`;
7. el permiso operativo nunca se convierte en directorio global de compras.

---

#### 12. Política territorial de mutación

Las mutaciones no admiten una semántica de “edición parcial invisible” sobre una misma orden.

Para:

```text
purchase_orders.create
purchase_orders.approve
purchase_orders.update
purchase_orders.cancel
```

la regla es:

```text
TODOS LOS DESTINOS AFECTADOS AUTORIZADOS
+
TODOS LOS CENTROS DE COSTO APLICABLES AUTORIZADOS
+
PERMISO EXACTO DE LA ACCIÓN
+
ESTADO Y POLÍTICA DE LA ACCIÓN
=
MUTACIÓN TERRITORIALMENTE AUTORIZABLE
```

Si un solo extremo obligatorio queda fuera de alcance, la mutación completa falla cerrada.

---

#### 13. Órdenes multidestino

El modelo canónico admite que una orden relacione más de un destino aunque el consumidor actual observe principalmente un `site_id`.

Reglas:

| Operación | Regla multidestino |
| --- | --- |
| listado/detalle | solo se muestran destinos autorizados; una proyección parcial no concede autoridad sobre los demás |
| crear | todos los destinos propuestos deben quedar dentro del alcance de creación |
| actualizar | todos los destinos actuales y todos los destinos propuestos afectados deben ser autorizables |
| aprobar | la decisión exige autoridad territorial sobre la totalidad del objeto aprobable |
| cancelar | la cancelación de la orden completa exige autoridad sobre todos los destinos que afecta |

Esta tarea no inventa aprobación o cancelación por línea/destino. Si el negocio necesitara esa granularidad, deberá existir un contrato canónico explícito.

---

#### 14. Regla de movimiento territorial

Cambiar sede, área receptora o centro de costo de una orden es una mutación de territorio.

Por tanto:

```text
AUTORIDAD SOBRE ORIGEN
+
AUTORIDAD SOBRE DESTINO
+
permission = purchase_orders.update
+
estado editable
=
MOVIMIENTO TERRITORIAL AUTORIZABLE
```

No se permite:

```text
ORDEN EN SEDE AUTORIZADA
→ editar site_id / cost_center_ref
→ moverla a territorio no autorizado
```

El servidor debe revalidar simultáneamente el recurso actual y la propuesta de nuevo territorio antes de persistir.

---

#### 15. `purchase_orders.view` — carril base

La matriz vigente conserva:

| Rol base | Decisión | Alcance territorial relevante |
| --- | --- | --- |
| `propietario` | `ASIGNAR` | `G(B)` sobre organización productiva ordinaria, sin atravesar entornos aislados |
| `gerente_general` | `ASIGNAR` | `G(B)` sobre organización productiva ordinaria, sin wildcard de acciones |
| `gerente` | `ASIGNAR` | `AS-REL`; órdenes relacionadas con sedes asignadas y extremos autorizados |
| `supervisor` | `ASIGNAR` | `AS-REL`; lectura local relacionada, sin mutación implícita |
| `auxiliar_administrativa` | `ASIGNAR` | `AS-REL`; soporte documental sobre recursos relacionados |
| `contador` | `ASIGNAR` | `G-SRC`; evidencia comercial para revisión, conciliación y soporte contable |
| `marketing` | `NO_ASIGNAR` | denegación por defecto |

`G(B)` sigue exigiendo el permiso exacto. No equivale a todas las capacidades ORIGO.

---

#### 16. `purchase_orders.view` — carril operativo

El carril operativo conserva:

| Rol operativo | Decisión | Alcance |
| --- | --- | --- |
| `bodeguero` | `ASIGNAR_OPERATIVO` | `CTX-WH-PURCHASE-ORDERS`; órdenes aprobadas o vigentes cuyo destino receptor sea la sede/bodega activa; proyección mínima para recepción |
| `gerencia_operativa` | `ASIGNAR_OPERATIVO` | `CTX-MGR-ORIGO`; órdenes relacionadas con abastecimientos o entregas de la sede activa; solo consulta operativa |
| `conductor_logistica` | `NO_ASIGNAR` | la orden de compra no es su contrato operativo ordinario |

El carril operativo requiere los prerrequisitos de contexto aplicables, incluido `T+C` cuando lo exige la matriz.

Una sesión operativa en una sede no autoriza órdenes de otras sedes ni crea `G(B)`.

---

#### 17. Territorio de `purchase_orders.create`

`origo.procurement.purchase_orders.create` permanece `BASE_ONLY`.

Los grants definidos son:

- `propietario`;
- `gerente_general`;
- `gerente` dentro de su cobertura administrativa;
- `auxiliar_administrativa` dentro de su cobertura de soporte.

Reglas territoriales:

1. todos los destinos propuestos se resuelven en servidor;
2. la sede elegida en el formulario es solo una propuesta;
3. el actor debe poseer cobertura administrativa suficiente sobre cada destino;
4. el centro de costo aplicable debe ser válido y autorizable cuando la política lo exija;
5. crear una orden no amplía después el territorio del creador;
6. `created_by` es trazabilidad, no ownership universal;
7. el proveedor relacionado no convierte su catálogo en territorio de sede.

---

#### 18. Territorio de `purchase_orders.approve`

`origo.procurement.purchase_orders.approve` permanece `BASE_ONLY` y conserva además las reglas de autoridad decisoria de `ORIGO-AUTH-006`.

La evaluación combina:

```text
PERMISO approve
+
ACTOR APROBADOR VÁLIDO
+
SEGREGACIÓN
+
POLÍTICA empresa / sede / centro de costo / categoría / importe / riesgo / urgencia
+
TODOS LOS DESTINOS AUTORIZADOS
+
ESTADO Y VERSIÓN ELEGIBLES
```

Un gerente con autoridad de aprobación sobre una sede no puede aprobar una orden que incluya destinos fuera de su cobertura.

`propietario` tampoco omite la resolución de autoridad aprobadora, aunque su cobertura territorial base pueda ser `G(B)`.

---

#### 19. Territorio de `purchase_orders.update`

`origo.procurement.purchase_orders.update` permanece `BASE_ONLY` y limitado a edición ordinaria permitida antes de aprobación/emisión.

La autorización requiere:

1. permiso `update`;
2. orden actual dentro de alcance;
3. estado editable;
4. todos los destinos actuales relevantes autorizados;
5. todos los destinos nuevos propuestos autorizados;
6. centros de costo actuales y propuestos compatibles cuando apliquen;
7. revalidación de proveedor y relaciones requeridas;
8. nueva aprobación posterior cuando un cambio material la exija por contrato.

No puede utilizarse `update` para escapar del scope territorial vigente.

---

#### 20. Territorio de `purchase_orders.cancel`

`origo.procurement.purchase_orders.cancel` permanece `BASE_ONLY` y separado de eliminación física.

La cancelación exige:

- permiso exacto `cancel`;
- autoridad sobre la orden completa;
- todos los destinos afectados autorizados;
- centros de costo aplicables dentro de alcance;
- estado cancelable;
- causa y auditoría cuando corresponda;
- preservación de historia y efectos ya materializados.

Una orden parcialmente visible no puede cancelarse completa desde esa visibilidad parcial.

---

#### 21. Consulta desde contexto de recepción

Una orden puede ser visible durante una recepción sin que el actor adquiera autoridad administrativa sobre compras.

Para `bodeguero` o `gerencia_operativa`:

```text
ORDEN RELACIONADA CON RECEPCIÓN / ENTREGA ACTIVA
+
SEDE OPERATIVA COINCIDENTE
+
permission purchase_orders.view
+
contexto operativo válido
=
PROYECCIÓN MÍNIMA AUTORIZABLE
```

Eso no concede:

- crear;
- aprobar;
- actualizar;
- cancelar;
- ver otros destinos no autorizados;
- acceder a campos sensibles reservados a `ORIGO-AUTH-010`.

---

#### 22. PDF interno y token externo

El documento de orden conserva dos fronteras diferentes.

Para sesión interna:

```text
purchase_orders.view
+
PURCHASE_ORDER autorizada territorialmente
+
proyección permitida
```

Para token externo de proveedor:

```text
TOKEN RESOURCE-SCOPED VÁLIDO
!=
ASIGNACIÓN DE SEDE
!=
ASIGNACIÓN DE CENTRO DE COSTO
```

El token externo no adquiere un scope laboral. Su secreto, expiración, revocación y minimización de campos permanecen en `ORIGO-AUTH-010` y contratos aplicables.

---

#### 23. Evaluación server-side obligatoria

La decisión territorial final debe ocurrir en el límite de confianza capaz de leer o mutar el recurso.

No basta con:

```text
FILTRAR SELECT EN UI
CARGAR employee_sites PARA UN COMBO
OCULTAR BOTÓN
VALIDAR query.site_id
VALIDAR form.site_id
```

La frontera autoritativa debe resolver nuevamente:

- actor efectivo;
- permiso exacto;
- carril base u operativo;
- recurso real;
- destinos reales;
- centros de costo aplicables;
- contexto operativo cuando aplique;
- estado y versión;
- columnas/efecto autorizado de la acción.

Una llamada directa no puede saltar esa evaluación.

---

#### 24. Precedencia territorial

Para órdenes, la precedencia relevante queda:

```text
ACTOR AUTENTICADO
→ EMPLEADO / ACTOR EFECTIVO VÁLIDO
→ PERMISO EXACTO
→ CARRIL BASE U OPERATIVO
→ PURCHASE_ORDER REAL
→ NEGOCIO / DESTINOS REALES
→ SEDES Y ÁREAS REALES
→ CENTRO DE COSTO REAL CUANDO APLIQUE
→ COBERTURA DEL ACTOR
→ CONTEXTO OPERATIVO CUANDO APLIQUE
→ ESTADO / VERSIÓN / POLÍTICA
→ DENEGACIONES
→ DECISIÓN
```

Los valores enviados por cliente nunca tienen prioridad sobre el recurso persistido y sus relaciones canónicas.

---

#### 25. Denegación y errores

Ante territorio insuficiente:

```text
LECTURA NO AUTORIZADA
→ DENY O PROYECCIÓN PARCIAL EXPLÍCITAMENTE PERMITIDA

MUTACIÓN NO AUTORIZADA
→ DENY
→ WRITES EMPRESARIALES = 0
```

Reglas:

1. no se reintenta con un scope más amplio;
2. no se degrada a `origo.access`;
3. no se usa el nombre del rol como bypass;
4. un fallo técnico no se convierte en `ALLOW`;
5. la respuesta no debe filtrar detalles de destinos o centros fuera de alcance;
6. la auditoría debe poder explicar qué recurso, acción, scope y bloqueo produjeron la decisión.

---

#### 26. Estado AS-IS — listado

En `src/app/purchase-orders/page.tsx` se observa:

- `requireAppAccess({ appId: "origo" })` como entrada;
- lectura de `purchase_orders`;
- filtro opcional `status`;
- filtro opcional `site_id` recibido desde query;
- carga de `employee_sites` para construir el selector de sedes del usuario.

El filtro `site_id` reduce el resultado solicitado, pero no constituye una prueba de autorización territorial porque:

```text
FILTRO DE QUERY
!=
SCOPE DEL ACTOR
```

La materialización deberá evitar que un `site_id` arbitrario enviado en URL amplíe la consulta.

---

#### 27. Estado AS-IS — creación

En `src/app/purchase-orders/new/page.tsx` y `createPurchaseOrder` se observa:

- sedes construidas a partir de `employee_sites` para la UI;
- `prefill` capaz de transportar `site_id`;
- `site_id` leído desde `FormData` en la Server Action;
- persistencia de ese `site_id` en la orden.

No se observa dentro de la acción una reconciliación explícita del `site_id` propuesto contra la cobertura territorial canónica de `purchase_orders.create`.

Esto no demuestra ausencia de controles inferiores desplegados; impide considerar probado el contrato completo desde la acción inspeccionada.

---

#### 28. Estado AS-IS — detalle y edición

En `/purchase-orders/[id]` y `/purchase-orders/[id]/edit` se observa:

- acceso general a ORIGO;
- búsqueda de la orden por `id`;
- `site_id` cargado como parte del recurso;
- edición permitida por UI cuando el estado es `draft`;
- carga de `employee_sites` para opciones de sede en edición.

No se observa en esas páginas una condición territorial explícita equivalente a `PO_DESTINATIONS` al resolver el `id`.

La autorización final debe residir en la frontera autoritativa y no depender de que la navegación haya ofrecido previamente el recurso.

---

#### 29. Estado AS-IS — mutaciones

En `src/app/purchase-orders/actions.ts` se observa:

| Acción AS-IS | Territorio visible en la función inspeccionada |
| --- | --- |
| `createPurchaseOrder` | recibe `site_id` desde formulario y lo persiste |
| `setPurchaseOrderSent` | actualiza por `id` y `status = draft` |
| `updatePurchaseOrder` | consulta estado por `id`, recibe nuevo `site_id` y lo persiste |
| `deletePurchaseOrder` | usa lista local de roles y `status = draft`; elimina por `id` |

Estas funciones no demuestran por sí mismas enforcement final de `PO_DESTINATIONS` o centro de costo.

La semántica canónica de `deletePurchaseOrder` ya fue reconciliada por `ORIGO-AUTH-008` hacia `purchase_orders.cancel`; esta tarea solo añade la frontera territorial correspondiente.

---

#### 30. Estado AS-IS — centro de costo

En las superficies y acciones de compra inspeccionadas de `vento-origo` no se observó un `cost_center_id` o `cost_center_ref` integrado al contrato de la orden.

Resultado documental:

```text
SITE DIMENSION AS-IS: PRESENTE
COST CENTER DIMENSION EN CONSUMIDOR INSPECCIONADO: NO DEMOSTRADA
```

La tarea no inventa una columna nueva.

La materialización deberá:

- incorporar la referencia canónica requerida cuando el modelo físico propietario la defina; o
- demostrar una representación equivalente ya aprobada;
- preservar la relación histórica de la orden con la dimensión utilizada;
- impedir que sede y centro de costo se sustituyan silenciosamente.

---

#### 31. Estado de RLS en el repositorio vigente

El hallazgo histórico `H-CODE-017-011` registró una policy `employees_crud_purchase_orders` demasiado amplia.

El repositorio vigente contiene una migración de hardening `AUTH-DB-002` que elimina explícitamente esa policy:

```text
drop policy employees_crud_purchase_orders
on public.purchase_orders;
```

Por tanto, esta tarea **no** describe la policy genérica histórica como baseline actual del repositorio.

A la vez, en las migraciones inspeccionadas no se identificó una nueva policy específica de `purchase_orders` que por sí sola demuestre el contrato completo de permiso + territorio + estado + acción.

Esto no permite concluir el estado efectivo de un ambiente remoto no observado. La obligación para la materialización es demostrar enforcement autoritativo final en las capas propietarias correspondientes.

---

#### 32. Matriz territorial por capacidad

| Capacidad | Modalidad | Territorio mínimo | Regla de totalidad |
| --- | --- | --- | --- |
| `purchase_orders.view` | `BASE_OR_OPERATIONAL` | `PO_DESTINATIONS` según carril | puede existir proyección parcial; cada destino mostrado debe estar autorizado |
| `purchase_orders.create` | `BASE_ONLY` | todos los destinos propuestos + centro de costo aplicable | todos los extremos requeridos antes de insertar |
| `purchase_orders.approve` | `BASE_ONLY` | todos los destinos + centro de costo/política aplicable | no existe aprobación territorial parcial de la orden completa |
| `purchase_orders.update` | `BASE_ONLY` | territorio actual + territorio propuesto | origen y destino deben ser autorizables |
| `purchase_orders.cancel` | `BASE_ONLY` | todos los destinos y centros afectados | una visibilidad parcial no autoriza cancelación total |

---

#### 33. Invariantes de seguridad territorial

| Caso | Resultado |
| --- | --- |
| `purchase_order_id` válido pero sin relación territorial | `DENY` |
| query `site_id` fuera de alcance | no amplía lectura |
| form `site_id` fuera de alcance | `DENY`, cero writes |
| `selected_site_id` fuera de cobertura | `DENY` |
| `employees.site_id` coincide pero `employee_sites`/scope no | no concede autoridad |
| gerente AS-REL sobre sede A intenta mutar orden de sede B | `DENY` |
| orden A+B y actor solo cubre A | lectura únicamente mediante proyección parcial permitida; mutación total `DENY` |
| cambio de sede A autorizada a B no autorizada | `DENY` |
| centro de costo no vigente | `DENY` para acción que lo requiera |
| centro de costo de ámbito incompatible | `DENY` |
| helper devuelve centro de costo pero actor no tiene scope | `DENY` |
| `bodeguero` consulta orden destinada a bodega activa | proyección operativa mínima autorizable con contexto válido |
| `bodeguero` intenta actualizar/aprobar/cancelar | `DENY` |
| `gerencia_operativa` consulta orden de sede activa | consulta operativa autorizable; nunca global |
| token externo válido | no crea scope laboral ni RBAC |

---

#### 34. Hallazgos y propietarios

| Hallazgo | Impacto contractual | Propietario | Condición de salida |
| --- | --- | --- | --- |
| listado usa `site_id` de query como filtro sin demostrar que el filtro sea scope | un filtro de cliente podría confundirse con autorización | `ORIGO-AUTH-009::<implementation_unit_id>` | el backend resuelve alcance y el query solo reduce dentro del conjunto autorizado |
| creación recibe y persiste `site_id` desde formulario | el cliente propone territorio | `ORIGO-AUTH-009::<implementation_unit_id>` | cada destino se valida server-side contra permiso y cobertura antes del insert |
| detalle/edición resuelven por `id` sin territorio explícito visible en la página | riesgo de acceso directo si ninguna capa autoritativa lo limita | `ORIGO-AUTH-009::<implementation_unit_id>` | el recurso se autoriza por `PO_DESTINATIONS` antes de exponer o mutar |
| `setPurchaseOrderSent` y `updatePurchaseOrder` no muestran chequeo territorial explícito | la mutación podría depender de controles no demostrados | `ORIGO-AUTH-009::<implementation_unit_id>` | el punto de efecto revalida permiso, recurso, territorio, estado y versión |
| `deletePurchaseOrder` usa rol local y no muestra territorio | semántica y scope divergentes del contrato objetivo | `ORIGO-AUTH-008` + `ORIGO-AUTH-009::<implementation_unit_id>` | consumer usa `cancel` y territorio canónicos, sin lista local ampliatoria |
| centro de costo no está demostrado en el consumidor de órdenes inspeccionado | no puede probarse enforcement por esa dimensión | `ORIGO-AUTH-009::<implementation_unit_id>` | unidad materializa o consume la referencia canónica aplicable y prueba su scope |
| la policy genérica histórica fue retirada, pero el contrato territorial final no queda probado por esa retirada | quitar un bypass no equivale a implementar autorización completa | `ORIGO-AUTH-009::<implementation_unit_id>` + owners `AUTH-SRV/AUTH-DB` aplicables | pruebas demuestran enforcement final server-side/RLS/RPC según la arquitectura materializada |
| PDF interno requiere scope del recurso y el token externo usa otra frontera | riesgo de mezclar autorización laboral y canal externo | `ORIGO-AUTH-009::<implementation_unit_id>` + `ORIGO-AUTH-010` | sesión interna usa permiso+territorio; token externo queda resource-scoped y minimizado |

Ningún hallazgo queda sin owner ni condición de salida.

---

#### 35. Frontera con ORIGO-AUTH-010

`ORIGO-AUTH-009` decide **qué recurso territorial puede alcanzar el actor**.

`ORIGO-AUTH-010` decidirá **qué campos sensibles y datos de precio puede ver o extraer dentro de ese recurso autorizado**, además del endurecimiento del documento externo.

Por tanto:

```text
ORDEN TERRITORIALMENTE AUTORIZADA
!=
TODAS LAS COLUMNAS AUTORIZADAS
```

Esta tarea no asigna exposición de precios, contratos, impuestos, márgenes, cuentas bancarias ni otros datos sensibles por el solo hecho de autorizar la orden.

---

#### 36. Frontera con recepción y NEXO

La orden conserva su territorio comercial en ORIGO.

La recepción y el ingreso físico conservan sus contratos propios:

```text
ORIGO PURCHASE_ORDER
→ autorización comercial / territorial de la orden

ORIGO PURCHASE_RECEIPT
→ aceptación y recepción comercial

NEXO
→ entrada, ubicación y custodia física
```

Una sede receptora autorizada para una recepción no reescribe el territorio histórico de la orden ni concede mutaciones administrativas sobre ella.

---

#### 37. Frontera con NUMERA y centros de costo

ORIGO puede consumir una referencia de centro de costo para limitar, atribuir y preservar la compra.

No adquiere por ello autoridad para:

- crear centros de costo;
- modificar su estructura;
- cambiar su vigencia;
- redefinir su clasificación financiera;
- publicar efectos contables.

El evento económico posterior conservará `cost_center_ref` cuando corresponda y deberá validarlo según su propio contrato; una distribución financiera posterior no borra la atribución fuente de la compra.

---

#### 38. Auditoría mínima territorial

Cada decisión sensible sobre una orden debe poder reconstruir, según aplique:

- actor/principal;
- permiso exacto;
- carril base u operativo;
- `purchase_order_id`;
- negocio;
- destinos reales;
- destinos autorizados;
- áreas relevantes;
- centro o centros de costo aplicables;
- scope/grant que hizo match;
- contexto operativo cuando aplique;
- estado y versión;
- acción solicitada;
- decisión `ALLOW` / `DENY`;
- razones de bloqueo;
- timestamp y correlación.

La auditoría no convierte el dato registrado en autoridad retroactiva.

---

#### 39. Materialización física posterior

El contrato global queda listo para materializaciones futuras:

```text
ORIGO-AUTH-009::<implementation_unit_id>
```

Cada unidad deberá resolver por su lifecycle:

1. `implementation_unit_id` exacto;
2. package o packages consumidores;
3. `E5-GATE-008::<package_id>` aplicable;
4. target paths reales;
5. capa autoritativa a modificar;
6. pruebas negativas por rol, sede, destino, centro de costo y estado;
7. compatibilidad con consumidores;
8. rollback;
9. evidencia de enforcement desplegado.

Este marcador no selecciona ni autoriza ninguna de esas unidades.

---

#### 40. Requisitos de prueba derivados

**Resultado:** NO GENERA REQUISITOS DE PRUEBA

**Requisitos creados:** 0
**Requisitos modificados:** 0
**Requisitos diferidos:** 0
**Requisitos obsoletos:** 0
**Fragmentos del Registro 04A afectados:** 0

**Justificación:** la limitación de órdenes por permiso, sede o centro de costo, estado y columnas, la resolución territorial determinista, la protección server-side, la segregación de funciones, la revalidación de decisiones stale y la auditoría de autorización ya están protegidas por requisitos canónicos vigentes. Esta tarea especializa esas obligaciones sobre las cinco capacidades de `PURCHASE_ORDER` sin introducir una obligación verificable nueva fuera del contrato existente.

---

#### 41. Cobertura de prueba vigente reutilizada

Sin modificar el Registro 04A, esta tarea reutiliza:

- `TREQ-ORIGO-002` para lectura y mutación de órdenes por permiso, sede/centro de costo, estado y columnas y para el canal externo de documento;
- `TREQ-ORIGO-004` para políticas de aprobación por empresa, sede, centro de costo, categoría, importe, riesgo y urgencia y separación de funciones;
- `TREQ-AUTH-001` para autorización por permiso, contexto y alcance canónicos;
- `TREQ-AUTH-004` para equivalencia de decisiones entre evaluadores;
- `TREQ-AUTH-009` para resolución territorial determinista y denegación de cruces;
- `TREQ-AUTH-013` para revalidación server-side de actor, permiso, territorio, recurso, estado y efecto;
- `TREQ-AUTH-014` para impedir reutilización de decisiones stale;
- `TREQ-AUTH-015` para evidencia correlacionable de decisiones protegidas.

Esta sección es solo trazabilidad de cobertura existente.

---

#### 42. Evidencia de validación

| Clase | Estado | Evidencia |
| --- | --- | --- |
| BUILD | `NOT_EXECUTED` | La compilación documental se ejecutará en el checkout local después de incorporar el artefacto. |
| LOCAL | `NOT_EXECUTED` | Formato, quality, delivery, topología, EOL, dominio, plan y TREQ quedan pendientes del checkout local de la tarea. |
| REMOTA | `PASS` | Se verificaron `vento-shell/main@c4425c5a8ac0e9da078bff8ec2b11b9db7743bef`, `vento-origo/main@70860f1ca5f0a4a73e894cbb840956f9f7eda2ad`, owner ORIGO, `active-sequence.previous_task_id = ORIGO-AUTH-008`, coincidencia exacta del bloque 008 publicado con el artefacto aprobado, topología `PER_IMPLEMENTATION_UNIT / POST_E5_PACKAGE`, `PURCHASE_ORDER`, `PO_DESTINATIONS`, contratos de scope/recurso, matrices base/operativas, 04A ORIGO, integración de `cost_center_ref`, runtime de `purchase-orders` y la migración que retira `employees_crud_purchase_orders`. |
| OPERATIVA | `NOT_EXECUTED` | No se probaron actores, órdenes, sedes, centros de costo, multidestino, denegaciones, PDF, sesiones operativas ni ambientes desplegados. |
| FÍSICA | `NOT_APPLICABLE` | Este marcador global no crea ni autoriza ninguna instancia `ORIGO-AUTH-009::<implementation_unit_id>`. |

---

#### 43. Criterios de aceptación

- [x] La topología queda `PER_IMPLEMENTATION_UNIT / POST_E5_PACKAGE`.
- [x] El marcador global no crea una instancia física.
- [x] Se territorializan exactamente cinco capacidades de orden.
- [x] El recurso es `PURCHASE_ORDER` y el alcance es `PO_DESTINATIONS`.
- [x] `purchase_order_id` es localizador y no autoridad.
- [x] `site_id`, `area_id` y `cost_center_ref` quedan diferenciados.
- [x] `selected_site_id` y `employees.site_id` no sustituyen el scope canónico.
- [x] `employee_sites` permanece fuente para sedes administrativas asignadas cuando el scope lo requiera.
- [x] un helper de centro de costo no concede autorización.
- [x] lectura permite únicamente destinos autorizados y proyección parcial cuando el contrato lo permita.
- [x] mutación exige todos los destinos y centros de costo afectados.
- [x] una edición territorial exige autoridad sobre origen y destino.
- [x] `G(B)` no es wildcard de acciones.
- [x] `AS-REL`, `G-SRC`, `CTX-WH-PURCHASE-ORDERS` y `CTX-MGR-ORIGO` conservan su semántica.
- [x] crear, aprobar, actualizar y cancelar conservan sus grants ya definidos.
- [x] el carril operativo solo consulta órdenes relacionadas con el contexto activo.
- [x] el PDF interno consume permiso y territorio de orden.
- [x] el token externo no adquiere scope laboral.
- [x] filtros y parámetros cliente no son autoridad.
- [x] se documenta la ausencia no demostrada de centro de costo en el consumidor sin inventar columna.
- [x] se reconoce que la policy genérica histórica fue retirada y no se presenta como baseline actual.
- [x] la retirada de la policy no se confunde con prueba de enforcement territorial final.
- [x] cada hallazgo tiene owner y condición de salida.
- [x] no se crean ni modifican requisitos de prueba.
- [x] no se ejecutan cambios físicos desde este marcador.

---

#### 44. Límites

Esta tarea no:

- modifica código;
- modifica `vento-origo`;
- crea o altera `site_id`, `area_id` o `cost_center_ref` en base de datos;
- inventa una columna de centro de costo;
- crea o modifica centros de costo;
- modifica `get_site_cost_center`;
- crea RLS, RPC, policies, grants o funciones;
- modifica Server Actions;
- crea migraciones;
- modifica datos;
- ejecuta Supabase;
- cambia matrices RBAC ya aprobadas;
- cambia las capacidades definidas por `ORIGO-AUTH-004..008`;
- autoriza recepción;
- autoriza inventario físico;
- define campos sensibles o precios visibles;
- endurece el secreto o vigencia del PDF externo;
- redefine estados de `VPROC-0021` o `VPROC-0022`;
- selecciona package o implementation unit;
- ejecuta E5;
- autoriza una instancia física;
- modifica el Registro 04A;
- desarrolla `ORIGO-AUTH-010`.

---

#### 45. Continuidad

**ÚLTIMA TAREA APROBADA**
`ORIGO-AUTH-008 — Definir permisos de corrección`

**TAREA ACTUAL APROBADA**
`ORIGO-AUTH-009 — Limitar órdenes por sede o centro de costo`

**SIGUIENTE TAREA RESERVADA**
`ORIGO-AUTH-010 — Proteger precios y datos sensibles`

### ✅ ORIGO-AUTH-010 — Proteger precios y datos sensibles

**Estado:** APROBADA
**Tarea anterior:** ORIGO-AUTH-009 — Limitar órdenes por sede o centro de costo
**Tarea siguiente:** ORIGO-AUTH-011 — Registrar actor de recepción
**Tipo de tarea:** contrato global con materialización por unidad (`PER_IMPLEMENTATION_UNIT`) — definición de la política canónica de minimización, proyección y field masking para precios, costos, condiciones comerciales, datos sensibles de proveedor y documentos de órdenes ORIGO, incluido el canal externo por token, sin materializar todavía ninguna unidad física
**Bloque:** BLOQUE M — ORIGO
**Repositorio propietario:** `vento-group-sas/vento-shell`
**Archivo propietario:** `docs/plan-canonico/modular/bloques/M_ORIGO/01_AUTORIZACION_DE_COMPRAS.md`
**Estado físico resultante:** `ESPECIFICADO_NO_MATERIALIZADO`
**Cambios físicos autorizados:** 0 durante este marcador global; las materializaciones futuras ocurren únicamente mediante `ORIGO-AUTH-010::<implementation_unit_id>` después de que el paquete propietario aplicable supere `E5-GATE-008::<package_id>` y exista autorización física explícita
**Requisitos de prueba creados o modificados:** 0

---

#### 1. Propósito

Definir de forma cerrada y verificable **qué datos puede recibir cada actor después de que el recurso ya fue autorizado**, sin confundir autorización de recurso con autorización de columnas, precios, costos, condiciones comerciales, documentos o secretos.

La regla raíz queda:

```text
PERMISO EXACTO
+
RECURSO AUTORIZADO
+
ALCANCE / CONTEXTO AUTORIZADO
+
FINALIDAD DE LA ACCIÓN
+
FIELD MASK AUTORIZADO
=
PROYECCIÓN ENTREGABLE
```

Nunca:

```text
RECURSO AUTORIZADO
=
TODAS LAS COLUMNAS AUTORIZADAS
```

Y nunca:

```text
PUEDE VER / EDITAR EL PROVEEDOR
=
PUEDE VER / EDITAR PRECIOS, CONTRATOS, DATOS TRIBUTARIOS, CUENTAS BANCARIAS O DOCUMENTOS SENSIBLES
```

La tarea protege tanto la **lectura** como la **sobrelectura**, la **mutación de campos**, la **exportación**, los **documentos internos** y el **canal externo al proveedor**.

---

#### 2. Handoff recibido de ORIGO-AUTH-002, 004, 005, 006, 008 y 009

Esta tarea consume sin reinterpretación:

1. `ORIGO-AUTH-002` separó la proyección administrativa de proveedor de la proyección operativa mínima y reservó a esta tarea los field masks sensibles;
2. `ORIGO-AUTH-004` definió `origo.procurement.purchase_orders.view` y `origo.procurement.suppliers.view`, sus modalidades, scopes, grants y proyecciones generales;
3. `ORIGO-AUTH-005` separó creación de orden/proveedor y dejó precios, condiciones y datos sensibles fuera de la autoridad implícita de crear;
4. `ORIGO-AUTH-006` estableció que una aprobación puede necesitar importe, precio y condición comercial, pero no por ello obtiene acceso irrestricto a cualquier dato sensible;
5. `ORIGO-AUTH-008` separó `purchase_orders.update`, `suppliers.update`, `suppliers.activate` y `suppliers.deactivate`, y declaró que un permiso mutante no revela campos ocultos;
6. `ORIGO-AUTH-009` cerró la autorización territorial de órdenes y estableció expresamente que una orden territorialmente autorizada no equivale a todas sus columnas autorizadas.

Por tanto, esta tarea no redefine permisos, territorio, estados ni grants ya aprobados. Define la **proyección sensible resultante**.

---

#### 3. Topología y frontera física

La topología vigente es:

```text
mode = PER_IMPLEMENTATION_UNIT
execution_gate = POST_E5_PACKAGE
```

Consecuencias:

1. este marcador define una sola vez el contrato global reutilizable;
2. no se crea una instancia física durante la aprobación documental;
3. cada materialización futura usa `ORIGO-AUTH-010::<implementation_unit_id>`;
4. una unidad puede ser consumida por varios paquetes mediante lineage cuando el lifecycle lo determine;
5. toda unidad física exige previamente el `E5-GATE-008::<package_id>` aplicable en `PASS` y autorización física explícita;
6. esta conversación no selecciona `package_id`, `implementation_unit_id`, target paths ni ambiente;
7. cualquier modificación VENTO de Supabase continúa perteneciendo a `vento-shell`.

---

#### 4. Fuentes y snapshot de preparación

La preparación se ancla a:

```text
vento-shell/main
c4425c5a8ac0e9da078bff8ec2b11b9db7743bef

vento-origo/main
70860f1ca5f0a4a73e894cbb840956f9f7eda2ad
```

El bloque propietario remoto incorpora `ORIGO-AUTH-008` y mantiene todavía los marcadores de `ORIGO-AUTH-009` y `ORIGO-AUTH-010`.

Para esta preparación anticipada se consume además el artefacto completo aprobado de `ORIGO-AUTH-009`:

```text
SHA-256
cc5f55c963c5973e5c0735a9655308b893801743c2a566a5ac1dc6d77c524112
```

La incorporación posterior de esta tarea exige que la 009 publicada conserve el mismo contrato sustantivo utilizado como base.

Se contrastaron, como mínimo:

- catálogo y clasificación sensible de permisos;
- scopes y proyecciones de órdenes/proveedores;
- matrices base y operativas;
- contratos de creación, aprobación, corrección y territorio;
- Registro 04A ORIGO y AUTH;
- inventario de pantallas `VSCREEN-0071`, `VSCREEN-0073`, `VSCREEN-0075` y `VSCREEN-0145`;
- runtime actual de órdenes, proveedores y PDF;
- helper actual del token de PDF;
- hallazgos `H-CODE-017-011` y `H-CODE-017-012`.

---

#### 5. Clasificación sensible heredada

El catálogo vigente ya clasifica como `COMMERCIAL_CONFIDENTIALITY`:

```text
origo.procurement.purchase_orders.view
origo.procurement.receipts.view
origo.procurement.suppliers.view
```

Esta tarea no cambia esa clasificación.

La consecuencia es:

```text
PERMISO SENSIBLE
+
RECURSO AUTORIZADO
!=
SELECT *
```

La materialización deberá satisfacer también el diagnóstico contractual:

```text
sensitive_field_masking_required
```

cuando la finalidad no autorice el conjunto completo de campos.

---

#### 6. La tarea no crea permisos nuevos

No se crean claves como:

```text
purchase_orders.prices.view
suppliers.bank_accounts.view
suppliers.contracts.view
suppliers.prices.view
```

ni equivalentes inferidos.

La política de campos se acopla a:

- permiso canónico existente;
- recurso;
- scope;
- carril base u operativo;
- acción concreta;
- finalidad;
- field mask;
- estado del recurso;
- denegaciones aplicables.

Si en el futuro el negocio necesita una capacidad independiente que no pueda expresarse de forma segura con este contrato, deberá existir una decisión canónica separada antes de materializarla.

---

#### 7. Familias de datos de orden de compra

Para `PURCHASE_ORDER`, la tarea distingue cuatro familias.

##### 7.1. Identidad y operación

Incluye, cuando corresponda:

- `purchase_order_id` / referencia visible;
- estado;
- proveedor relacionado en proyección mínima;
- sedes/destinos autorizados;
- productos;
- presentación;
- cantidades;
- fechas de creación, expectativa y recepción necesarias;
- cantidades recibidas o pendientes;
- identificadores técnicos estrictamente necesarios para continuar un flujo autorizado.

##### 7.2. Información económica sensible

Incluye, como mínimo:

```text
currency
unit_cost
line_total
total_amount
```

y cualquier equivalente futuro de:

- precio unitario;
- precio pactado;
- descuento;
- impuesto;
- flete;
- mínimo económico;
- total;
- subtotal;
- presupuesto;
- condición comercial;
- importe de aprobación.

##### 7.3. Información de costo interno sensible

Incluye:

```text
stock_unit_cost
```

y cualquier costo normalizado, de inventario, valoración, margen o transformación que no sea parte del documento comercial autorizado para el destinatario.

##### 7.4. Notas y metadatos internos

El campo actual:

```text
notes
```

se trata como **interno por defecto** porque el consumidor lo presenta como `Notas internas`.

Una nota interna no puede cruzar al canal externo por el solo hecho de estar almacenada en la orden.

---

#### 8. Regla de minimización para órdenes

Toda consulta debe seleccionar únicamente las columnas que la proyección final necesita.

Se prohíbe el patrón:

```text
LEER COLUMNAS SENSIBLES
→ OCULTARLAS SOLO EN UI
```

El contrato exige:

```text
FIELD MASK
→ SELECT MÍNIMO
→ SERIALIZACIÓN MÍNIMA
→ RENDER MÍNIMO
```

Cuando una capa inferior deba cargar un campo por una necesidad técnica demostrable, ese campo no podrá propagarse a una capa superior fuera del propósito autorizado.

---

#### 9. Proyección base de órdenes — propietario y gerente_general

Para un actor con:

```text
purchase_orders.view
+
scope base válido
+
recurso autorizado por ORIGO-AUTH-009
```

`propietario` y `gerente_general` pueden recibir la proyección económica interna necesaria para administración de compras dentro de la organización productiva ordinaria.

Eso puede incluir:

- moneda;
- costo unitario de compra;
- total de línea;
- total de orden;
- condición comercial aplicable;
- costo normalizado cuando sea necesario para administrar o reconciliar la compra.

No concede automáticamente:

- cuentas bancarias del proveedor;
- documentos tributarios completos;
- contratos ajenos a la compra;
- secretos;
- credenciales;
- datos fuera del recurso o finalidad consultada.

`G(B)` sigue sin ser wildcard de columnas ni acciones.

---

#### 10. Proyección base de órdenes — gerente

`gerente` conserva la cobertura definida por el contrato territorial y recibe información económica únicamente sobre órdenes dentro de su alcance.

Regla:

```text
purchase_orders.view
+
AS-REL / scope aplicable
+
orden autorizada
+
finalidad administrativa válida
=
proyección económica interna autorizable
```

No puede usar una orden relacionada con una sede para descubrir:

- precios de otras órdenes;
- condiciones de otros proveedores;
- contratos globales;
- cuentas bancarias;
- costos fuera del recurso autorizado.

---

#### 11. Proyección base de órdenes — supervisor

`supervisor` conserva `purchase_orders.view` para lectura relacionada, pero la mera consulta no concede por defecto precios internos completos.

Su proyección ordinaria queda en:

- identidad;
- estado;
- proveedor mínimo;
- destino autorizado;
- productos/presentaciones;
- cantidades;
- fechas;
- seguimiento permitido.

Se excluyen por defecto:

```text
unit_cost
stock_unit_cost
line_total
total_amount
```

salvo que una capacidad o proceso canónico posterior le conceda expresamente una finalidad económica adicional.

---

#### 12. Proyección base de órdenes — auxiliar_administrativa

`auxiliar_administrativa` puede requerir información económica cuando ejecuta preparación o corrección administrativa de una orden con permiso mutante válido.

Por tanto:

- `purchase_orders.view` por sí solo no amplía todas las columnas;
- `purchase_orders.create` puede habilitar los campos económicos necesarios para construir la orden;
- `purchase_orders.update` puede habilitar esos campos únicamente mientras el estado y field mask permitan la corrección;
- no obtiene por inferencia contratos, cuentas bancarias ni condiciones sensibles fuera de la orden.

La autorización económica se vincula a la acción y al recurso concreto.

---

#### 13. Proyección base de órdenes — contador

`contador` conserva la consulta de órdenes aprobada para evidencia comercial, revisión y conciliación.

Dentro de `G-SRC` puede recibir:

- moneda;
- costo unitario;
- total de línea;
- total de orden;
- referencias económicas necesarias para conciliación.

No obtiene por ello:

- administración del proveedor;
- actualización de órdenes;
- aprobación;
- cancelación;
- directorio completo de proveedores;
- contratos o cuentas bancarias no requeridos por el recurso conciliado.

---

#### 14. Roles sin proyección de órdenes

`marketing` continúa sin asignación ordinaria.

Un actor sin `purchase_orders.view` no puede obtener precios, cantidades, totales ni metadatos de una orden por:

- URL directa;
- identificador conocido;
- filtro;
- exportación;
- PDF;
- llamada de servidor;
- token laboral inexistente;
- pertenencia a una sede.

---

#### 15. Proyección operativa de órdenes

Para `bodeguero` y `gerencia_operativa`, el carril operativo conserva la proyección mínima ya aprobada.

Por defecto incluye:

- referencia;
- estado relevante;
- proveedor mínimo;
- destino receptor;
- productos/presentaciones;
- cantidades ordenadas/recibidas necesarias;
- fecha esperada;
- datos necesarios para recepción o abastecimiento activo.

Por defecto excluye:

```text
unit_cost
stock_unit_cost
line_total
total_amount
contratos
negociación
cuentas bancarias
datos tributarios no necesarios
```

Un check-in o turno válido nunca convierte una proyección operativa en una proyección financiera.

---

#### 16. Proyección económica para aprobación

`origo.procurement.purchase_orders.approve` puede requerir una proyección económica mayor que una consulta ordinaria.

Para un aprobador autorizado, la decisión puede consumir:

- moneda;
- importe total;
- costo/precio de línea;
- condición comercial relevante;
- presupuesto o umbral aplicable cuando exista en el contrato propietario;
- evidencia necesaria para política de aprobación.

Regla:

```text
APROBAR
→ VER LO NECESARIO PARA DECIDIR
!=
VER TODO EL EXPEDIENTE SENSIBLE DEL PROVEEDOR
```

La proyección de aprobación no concede:

- cuenta bancaria;
- documentos tributarios completos;
- contratos no relacionados;
- secretos;
- datos de otros proveedores;
- exportación masiva.

---

#### 17. Field mask de creación de orden

`purchase_orders.create` puede escribir únicamente campos permitidos por su contrato de creación.

Para líneas de la orden, los valores económicos propuestos pueden incluir:

```text
unit_cost
line_total derivado
```

y la representación necesaria para preservar el snapshot económico de la compra.

No permite que el cliente:

- escriba un costo normalizado autoritativo sin validación;
- fuerce `total_amount` arbitrario;
- introduzca márgenes o costos internos fuera del contrato;
- convierta un campo oculto en write autorizado por enviarlo en `FormData`.

Los campos derivados deben recalcularse o validarse en la frontera autoritativa.

---

#### 18. Field mask de actualización de orden

`purchase_orders.update` conserva el field mask definido por `ORIGO-AUTH-008` y esta tarea lo restringe respecto de datos sensibles.

Una actualización autorizable puede modificar el precio/costo de una línea solo cuando:

1. el estado permita edición;
2. el actor tenga `purchase_orders.update`;
3. el territorio actual y propuesto sea válido;
4. el campo económico esté permitido para esa acción;
5. el valor se valide en servidor;
6. el total derivado se recalcule;
7. la política determine si el cambio exige nueva aprobación.

No se permite un `UPDATE` amplio sobre la fila completa como sustituto del field mask.

---

#### 19. Documento interno de orden

El PDF interno es una representación de `PURCHASE_ORDER`.

Para generarlo internamente se requiere:

```text
purchase_orders.view
+
orden autorizada territorialmente
+
field mask interno autorizado
```

No basta:

```text
origo.access
```

El PDF interno puede incluir información económica cuando el actor está autorizado a verla.

Si el actor solo posee proyección operativa mínima, el documento interno entregado a ese actor debe respetar esa misma minimización.

---

#### 20. Canal externo al proveedor

El canal externo por token no es una sesión laboral ni una asignación RBAC.

Su proyección se limita a información necesaria para que el proveedor atienda la solicitud/orden autorizada.

La proyección externa actual objetivo puede incluir:

- referencia de orden;
- proveedor destinatario;
- sede/destino comercial necesario;
- fecha esperada;
- producto o alias destinado al proveedor;
- presentación;
- cantidad;
- estado comercial compatible con el documento.

Por defecto no incluye:

```text
stock_unit_cost
cost_center_ref
presupuesto interno
margen
historial de aprobación
actor interno
auditoría interna
datos de otros proveedores
Notas internas
```

Los campos económicos de compra no se exponen externamente por inferencia.

Si un contrato canónico de documento exige en el futuro mostrar un precio pactado al proveedor, deberá ser exactamente el precio comercial destinado a ese proveedor y nunca un costo normalizado, margen o valor interno distinto.

---

#### 21. `notes` no cruza al proveedor por defecto

El runtime actual presenta `purchase_orders.notes` como:

```text
Notas internas
```

Por tanto:

```text
order.notes
→ INTERNAL_ONLY por defecto
```

No puede copiarse automáticamente a:

- PDF público;
- mensaje al proveedor;
- URL;
- exportación externa;
- payload de integración externa.

Si se necesita una nota para proveedor, deberá existir una semántica canónica explícitamente supplier-facing o una representación equivalente aprobada; esta tarea no inventa una columna física nueva.

---

#### 22. Contrato obligatorio del token de PDF externo

El token externo deberá cumplir simultáneamente:

```text
SECRETO DEDICADO OBLIGATORIO
+
SIN FALLBACK
+
SCOPE DE UNA SOLA ORDEN
+
PROPÓSITO EXCLUSIVO DE DOCUMENTO DE PROVEEDOR
+
EXPIRACIÓN CORTA Y EXPLÍCITA
+
REVOCACIÓN COMPROBABLE
+
COMPARACIÓN CRIPTOGRÁFICA SEGURA
+
PROYECCIÓN EXTERNA MÍNIMA
+
AUDITORÍA
```

La ausencia del secreto bloquea emisión y validación.

Si se conserva el helper actual, `PURCHASE_ORDER_PDF_SECRET` deberá ser obligatorio.

Quedan prohibidos como fallback de firma:

```text
NEXTAUTH_SECRET
SESSION_SECRET
secreto hardcoded
```

---

#### 23. Vigencia del token

La vigencia AS-IS de **30 días** no satisface el objetivo de corta duración.

Esta tarea fija:

```text
VIGENCIA MÁXIMA DEL TOKEN EXTERNO: 15 MINUTOS
```

El vencimiento se evalúa server-side.

Un token vencido produce denegación cerrada y no se renueva silenciosamente mediante otro secreto o scope.

La duración podrá reducirse por política de despliegue, pero no ampliarse por encima de este máximo sin cambio canónico explícito.

---

#### 24. Revocación

El token debe poder invalidarse antes de su vencimiento.

La implementación futura deberá disponer de una referencia de emisión/revocación comprobable —por ejemplo un identificador opaco, versión de documento o mecanismo equivalente— sin que esta tarea imponga una columna física concreta.

La validación deberá rechazar:

- emisión revocada;
- versión invalidada;
- documento retirado;
- orden no elegible para el canal externo;
- token de otra orden;
- token de otro propósito.

Rotar el secreto global puede ser mecanismo de emergencia, pero no sustituye por sí solo la revocación selectiva exigida por el contrato.

---

#### 25. Scope criptográfico del token

La firma deberá quedar vinculada, directa o verificablemente, como mínimo a:

- `purchase_order_id`;
- propósito de documento externo;
- instante de emisión;
- expiración;
- referencia revocable.

No debe autorizar:

- otra orden;
- otro handler;
- API general;
- acceso a proveedor;
- acceso laboral;
- mutaciones;
- lectura libre mediante `service_role`.

Conocer una URL firmada no concede ninguna otra capacidad ORIGO.

---

#### 26. Frontera de `service_role`

El uso de `service_role` detrás del token externo es una frontera privilegiada.

Solo es admisible después de validar completamente el token y únicamente para construir la proyección externa autorizada.

Regla:

```text
TOKEN VÁLIDO
→ CONSULTA EXTERNA MÍNIMA
```

Nunca:

```text
TOKEN VÁLIDO
→ SERVICE_ROLE
→ LEER TODA LA ORDEN
→ OCULTAR DESPUÉS
```

La rama externa debe evitar leer campos económicos o internos que no renderizará.

---

#### 27. Familias de datos de proveedor

Para `SUPPLIER`, la tarea distingue:

##### 27.1. Identidad mínima

- identificador necesario;
- nombre;
- estado cuando sea necesario;
- contacto estrictamente necesario para la operación.

##### 27.2. Datos administrativos protegidos

Incluyen:

```text
tax_id
contact_name
phone
email
address
notes
```

La necesidad de uno de estos campos no autoriza los demás.

##### 27.3. Condiciones comerciales sensibles

Incluyen:

```text
payment_type
credit_days
```

y cualquier representación futura de:

- precio o lista de precio;
- moneda;
- impuesto;
- descuento;
- flete;
- mínimo;
- plazo de entrega;
- condición de pago;
- fuente;
- versión;
- vigencia.

##### 27.4. Datos financieros y documentales altamente restringidos

Incluyen:

- cuentas bancarias;
- contratos;
- documentos tributarios;
- certificados;
- anexos;
- credenciales o secretos;
- documentos de soporte sensibles;
- referencias de pago que no sean necesarias para la acción.

---

#### 28. Proyección base general de proveedor

`origo.procurement.suppliers.view` permite consultar información general dentro de `SUPPLIER_SCOPE`, pero no implica un expediente completo.

Para `propietario`, `gerente_general` y `gerente` dentro de su cobertura, la proyección base puede incluir:

- identidad;
- estado;
- contactos;
- identificación tributaria cuando sea necesaria;
- condición comercial aplicable a la relación autorizada.

Los datos bancarios, contratos y documentos completos solo se entregan cuando la finalidad administrativa concreta los requiera y el field mask lo permita.

---

#### 29. Proyección base de supervisor

`supervisor` conserva consulta de proveedor, pero su proyección ordinaria se limita a:

- identidad;
- estado;
- contacto necesario;
- relación con el recurso autorizado.

Por defecto no incluye:

```text
tax_id completo salvo necesidad documental explícita
payment_type
credit_days
precios
contratos
cuentas bancarias
documentos tributarios
notas internas
```

La relación con una sede no convierte al proveedor en propiedad de esa sede.

---

#### 30. Proyección de auxiliar_administrativa

`auxiliar_administrativa` puede mantener información ordinaria cuando posee `suppliers.update`.

Puede recibir los campos necesarios para:

- identidad corregible;
- contactos;
- teléfono;
- correo;
- dirección;
- notas administrativas;
- documentos ordinarios expresamente permitidos.

No obtiene por inferencia:

- cuentas bancarias;
- contratos;
- precios sensibles;
- negociación;
- activación/desactivación;
- exportación masiva.

Los datos tributarios requieren finalidad administrativa explícita y no forman parte de la proyección operativa mínima.

---

#### 31. Contador y proveedor

La matriz vigente no asigna `origo.procurement.suppliers.view` a `contador`.

Por tanto, su capacidad de consultar importes de una orden para conciliación no puede reutilizarse para abrir:

- catálogo completo de proveedores;
- expediente de proveedor;
- cuenta bancaria;
- contrato;
- documentos tributarios;
- listas de precio del proveedor.

Cualquier necesidad financiera posterior deberá consumir su recurso y contrato propietarios, no ampliar `suppliers.view` por inferencia.

---

#### 32. Proyección operativa de proveedor

`bodeguero` y `gerencia_operativa` conservan `CTX-WH-SUPPLIER-IDENTITY`.

La proyección operativa mínima puede incluir:

- nombre;
- referencia necesaria;
- contacto requerido para coordinar la entrega;
- estado necesario para validar el recurso activo.

Excluye:

```text
datos bancarios
negociación
contratos
precios no requeridos
condiciones comerciales completas
administración del maestro
documentos tributarios completos
notas internas
```

El turno o check-in nunca amplía este field mask.

---

#### 33. Field mask de `suppliers.update`

`origo.procurement.suppliers.update` continúa permitiendo mantenimiento ordinario, no administración sensible irrestricta.

El field mask ordinario puede abarcar:

- nombre/identidad visible corregible;
- contacto;
- teléfono;
- correo;
- dirección;
- notas administrativas;
- documentos ordinarios autorizados;
- condiciones administrativas no sensibles.

No puede editar por esa sola capacidad:

```text
cuentas bancarias
contratos
listas de precio sensibles
condiciones comerciales protegidas fuera del mask
is_active como alias de activate/deactivate
```

La materialización deberá desacoplar además `is_active` de la actualización ordinaria conforme a `ORIGO-AUTH-008`.

---

#### 34. Activación y datos sensibles

`suppliers.activate` y `suppliers.deactivate` pueden necesitar saber si la documentación obligatoria existe y está vigente.

Eso no significa que el decisor reciba el contenido completo de cada documento.

La política admite:

```text
DOCUMENTO PRESENTE / VIGENTE / VALIDADO
```

como evidencia mínima cuando el contenido no sea necesario para decidir.

La activación no concede una sesión de lectura permanente sobre contratos o archivos sensibles.

---

#### 35. `VSCREEN-0145` — contratos, precios y condiciones

`VSCREEN-0145 — Contratos, precios y condiciones de proveedor` permanece la superficie canónica para versionar:

- contratos;
- listas de precio;
- impuestos;
- fletes;
- mínimos;
- vigencias;
- condiciones autorizadas.

La pantalla no obtiene acceso por existir.

Requiere:

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

El carril operativo no puede abrir `VSCREEN-0145` mediante una relación de entrega.

---

#### 36. Versionado de precios y condiciones

Un precio o condición aplicable deberá preservar, cuando exista en el modelo propietario:

- proveedor;
- producto/servicio;
- presentación/unidad;
- escala;
- moneda;
- impuesto;
- descuento;
- flete;
- mínimo;
- plazo de entrega;
- condición de pago;
- fuente;
- versión;
- vigencia.

Regla:

```text
NUEVA CONDICIÓN
!=
SOBRESCRIBIR HISTORIA
```

La orden histórica conserva el snapshot económico que utilizó.

---

#### 37. Precio histórico y precio vigente

Consultar una orden histórica debe devolver el valor asociado a esa orden, no recalcularlo silenciosamente con la condición vigente del proveedor.

Consultar una condición vigente no debe reescribir:

- `unit_cost`;
- `line_total`;
- `total_amount`;
- snapshot de presentación;
- evidencia de aprobación;
- evidencia de emisión.

La corrección de una orden sigue las reglas de estado y revisión ya aprobadas.

---

#### 38. Storage y documentos sensibles

Cuando contratos, anexos, datos tributarios o documentos sensibles se materialicen como archivos:

```text
STORAGE PRIVADO
+
AUTORIZACIÓN SERVER-SIDE
+
OBJETO / PROVEEDOR RESUELTO
+
FIELD / DOCUMENT MASK
+
AUDITORÍA
```

Un bucket público, URL permanente o path conocido no satisface este contrato.

La tarea no crea buckets ni define aquí el esquema físico del documento.

---

#### 39. Exportación

La capacidad `.view` no concede por sí sola exportación masiva.

Para datos sensibles:

```text
VIEW
!=
EXPORT
```

Mientras no exista una capacidad canónica que autorice una exportación sensible concreta, la exportación queda `DENY_BY_DEFAULT`.

Una futura exportación autorizada deberá:

- respetar el mismo scope de recursos;
- aplicar field mask;
- excluir campos no requeridos;
- registrar actor, finalidad, volumen y resultado;
- evitar enlaces públicos permanentes;
- preservar retención y clasificación aplicables.

---

#### 40. Búsqueda, filtros y conteos

La minimización también aplica a:

- búsquedas;
- filtros;
- autocompletados;
- selects;
- conteos;
- cards;
- opciones de formulario.

Ejemplo:

```text
SELECCIONAR PROVEEDOR
→ identidad mínima
```

No:

```text
SELECCIONAR PROVEEDOR
→ cargar tax_id + notas + crédito + documentos + banco + contratos
```

La existencia, conteo o metadata de un dato sensible tampoco se expone cuando esa información revele más de lo necesario.

---

#### 41. URL directa, API y Server Actions

El field mask se revalida en la frontera autoritativa.

No se confía en:

- columnas ocultas por React;
- inputs `disabled`;
- campos omitidos visualmente;
- cliente que no envía un campo;
- ruta desde la que llegó el usuario;
- botón oculto;
- filtro previo;
- objeto serializado por una página anterior.

Una llamada directa debe producir la misma decisión de columnas que la navegación ordinaria.

---

#### 42. Dispositivo compartido y simulación

La clasificación sensible ya aprobada continúa vigente.

Un dispositivo compatible no elimina:

- permiso;
- scope;
- field mask;
- finalidad;
- reautenticación cuando corresponda;
- auditoría.

La simulación que no pueda usar datos reales sensibles deberá recibir:

- decisiones;
- datos sintéticos;
- valores vacíos;
- valores enmascarados;

según el contrato transversal vigente.

No se copian precios, contratos, cuentas bancarias o documentos reales a simulación por conveniencia.

---

#### 43. Auditoría mínima de lectura sensible

Una lectura o generación sensible deberá poder correlacionar, según aplique:

- principal;
- actor efectivo;
- permiso;
- recurso;
- scope;
- carril;
- finalidad;
- field mask aplicado;
- campos/familias solicitadas;
- decisión;
- razones;
- documento o exportación involucrado;
- referencia de token externo cuando aplique;
- timestamp;
- versión contractual.

No es obligatorio almacenar el valor sensible completo en el log para demostrar que se consultó.

La auditoría nunca debe convertirse en una segunda fuga de información.

---

#### 44. Auditoría del token externo

La emisión y uso del token deberán registrar, sin registrar el secreto:

- orden;
- propósito;
- referencia de emisión;
- instante de emisión;
- expiración;
- revocación cuando ocurra;
- resultado de validación;
- acceso concedido o denegado;
- versión de proyección externa.

Nunca se registra:

- secreto de firma;
- token completo reutilizable;
- `service_role` key.

---

#### 45. Denegación y errores

Ante campo no autorizado:

```text
RECURSO AUTORIZADO
+
CAMPO NO AUTORIZADO
→ CAMPO NO ENTREGADO
```

Ante acción que exige ese campo y no puede ejecutarse sin él:

```text
DENY
```

Reglas:

1. no ampliar proyección para “hacer funcionar” una pantalla;
2. no degradar a `origo.access`;
3. no reintentar con `service_role` para un actor interno;
4. no filtrar la existencia de datos bancarios/contratos fuera de scope;
5. no serializar primero y borrar después;
6. no incluir valores sensibles en mensajes de error;
7. una falla técnica no se convierte en `ALLOW`.

---

#### 46. Estado AS-IS — listado de órdenes

En `src/app/purchase-orders/page.tsx` se observa:

- `requireAppAccess({ appId: "origo" })`;
- lectura de órdenes;
- exposición de `total_amount`;
- visualización del total en la tabla.

No se observa en esa página un field mask que diferencie:

- supervisor;
- auxiliar administrativa;
- contador;
- carril operativo;
- finalidad.

Resultado:

```text
AS_IS_PURCHASE_ORDER_LIST_TOTAL_VISIBLE
```

La materialización deberá consultar y renderizar el total únicamente para actores/finalidades autorizados.

---

#### 47. Estado AS-IS — detalle de orden

En `src/app/purchase-orders/[id]/page.tsx` se observa:

```text
total_amount
unit_cost
line_total
stock_quantity_ordered
```

y el runtime muestra bloques rotulados:

```text
Total interno
Notas internas
```

La página entra por `requireAppAccess({ appId: "origo" })` y no demuestra por sí sola un field mask sensible por actor/finalidad.

Resultado:

```text
AS_IS_PURCHASE_ORDER_DETAIL_INTERNAL_DATA_BROADLY_LOADED
```

Esto no prueba el estado efectivo de capas inferiores; sí impide considerar demostrado el contrato final de minimización.

---

#### 48. Estado AS-IS — PDF interno

El PDF interno actual incluye:

- total de orden;
- costo operativo;
- costo base normalizado;
- total de línea;
- notas.

El handler interno valida actualmente `origo.access` cuando no existe token externo válido.

Resultado:

```text
AS_IS_INTERNAL_PDF_APP_ACCESS_ONLY
```

El contrato objetivo exige `purchase_orders.view` sobre la orden y el field mask del actor.

---

#### 49. Estado AS-IS — PDF externo

Cuando el token es válido, el handler usa un cliente con `service_role`.

Antes de bifurcar el render externo, la consulta actual lee:

```text
total_amount
currency
notes
unit_cost
line_total
```

aunque el PDF proveedor actual no muestra costos/totales.

Además, el PDF externo y el mensaje preparado consumen `notes`, mientras el detalle interno lo rotula como `Notas internas`.

Resultados:

```text
AS_IS_EXTERNAL_PDF_OVERREADS_INTERNAL_ECONOMIC_FIELDS
AS_IS_EXTERNAL_PDF_EXPOSES_INTERNAL_NOTES
```

La salida futura debe separar consulta externa y consulta interna desde el origen.

---

#### 50. Estado AS-IS — token externo

El helper actual:

```text
TOKEN_MAX_AGE_SECONDS = 30 días
```

y obtiene el secreto mediante una cadena de fallback que termina en un secreto hardcoded de desarrollo.

No se observa revocación selectiva.

Resultado:

```text
AS_IS_PUBLIC_PDF_TOKEN_LONG_LIVED
AS_IS_PUBLIC_PDF_TOKEN_SECRET_FALLBACK
AS_IS_PUBLIC_PDF_TOKEN_NOT_SELECTIVELY_REVOCABLE
```

Esto coincide con `H-CODE-017-012`.

---

#### 51. Estado AS-IS — listado de proveedores

En `src/app/suppliers/page.tsx` la consulta actual selecciona:

```text
id
name
tax_id
contact_name
phone
email
address
notes
is_active
payment_type
credit_days
created_at
updated_at
```

aunque la tabla no presenta todos esos campos.

Resultado:

```text
AS_IS_SUPPLIER_LIST_OVERREAD
```

La selección futura debe adaptarse al field mask de la finalidad y carril.

---

#### 52. Estado AS-IS — edición de proveedor

`src/app/suppliers/[id]/edit/page.tsx` carga:

```text
tax_id
contact_name
phone
email
address
notes
is_active
payment_type
credit_days
```

y `src/app/suppliers/actions.ts` actualiza esos campos bajo el helper actual `requireCanManageSuppliers`.

Esto mezcla:

- datos ordinarios;
- datos tributarios;
- condiciones comerciales;
- estado activo.

`ORIGO-AUTH-008` ya separó activación/desactivación; esta tarea añade la separación sensible de campos.

---

#### 53. Estado AS-IS — contratos, banco y listas de precio

En las superficies de proveedor inspeccionadas no se observa una materialización completa de:

- contratos versionados;
- listas de precio versionadas;
- cuentas bancarias gobernadas;
- documentos tributarios privados;
- historial de condiciones comerciales completo.

Resultado:

```text
SENSITIVE_SUPPLIER_MODEL_AS_IS: PARCIAL
```

Esta tarea no inventa columnas, tablas, buckets ni rutas para completar lo que aún no está materializado.

---

#### 54. Matriz de proyección por finalidad

| Finalidad | Recurso | Proyección económica | Datos proveedor sensibles |
| --- | --- | --- | --- |
| administración de compra por propietario/gerencia autorizada | `PURCHASE_ORDER` | permitida dentro del recurso | solo los relacionados y necesarios |
| supervisión de estado/flujo | `PURCHASE_ORDER` | denegada por defecto | identidad mínima |
| preparación/corrección administrativa con permiso mutante | `PURCHASE_ORDER` | campos económicos necesarios para la acción | sin expediente sensible completo |
| conciliación contable de orden | `PURCHASE_ORDER` | permitida dentro de `G-SRC` | no abre catálogo/expediente de proveedor |
| recepción operativa | `PURCHASE_ORDER` / `SUPPLIER` | denegada por defecto | `CTX-WH-SUPPLIER-IDENTITY` |
| aprobación | `PURCHASE_ORDER` | mínima suficiente para decidir | sin banco/contrato completo por inferencia |
| proveedor externo por token | documento de una orden | no se expone por defecto | solo identidad propia y datos supplier-facing |
| mantenimiento ordinario de proveedor | `SUPPLIER` | no concede listas de precio sensibles | field mask ordinario |
| `VSCREEN-0145` | `SUPPLIER` | condiciones sensibles autorizadas | actor base + field mask sensible |

---

#### 55. Matriz de campos AS-IS de orden

| Campo / familia | Base administrativa autorizada | Supervisión | Contabilidad | Operativo | Externo proveedor |
| --- | --- | --- | --- | --- | --- |
| referencia/estado | sí | sí | sí | sí | sí |
| destino autorizado | sí | sí | sí | sí | solo lo necesario |
| producto/presentación/cantidad | sí | sí | sí | sí | sí |
| `currency` | según finalidad | no por defecto | sí | no por defecto | solo si acompaña precio supplier-facing aprobado |
| `unit_cost` | según finalidad | no | sí | no | no por defecto |
| `stock_unit_cost` | según finalidad interna | no | según conciliación | no | no |
| `line_total` | según finalidad | no | sí | no | no por defecto |
| `total_amount` | según finalidad | no | sí | no | no por defecto |
| `notes` | interna según finalidad | interna según necesidad | interna según necesidad | solo si necesaria y autorizada | no |
| auditoría/aprobación interna | según permiso/finalidad | mínima | según conciliación | no | no |

---

#### 56. Matriz de campos AS-IS de proveedor

| Campo / familia | Administración base | Supervisor | Auxiliar administrativa con `suppliers.update` | Operativo |
| --- | --- | --- | --- | --- |
| `name` | sí | sí | sí | sí |
| `is_active` lectura | sí | sí | sí | solo si necesaria |
| `contact_name` | sí | según necesidad | sí | según entrega |
| `phone` / `email` | sí | según necesidad | sí | según entrega |
| `address` | según finalidad | no por defecto | sí | solo si necesaria |
| `tax_id` | según finalidad tributaria | no por defecto | según finalidad administrativa | no por defecto |
| `notes` | según finalidad | no por defecto | sí, administrativas | no |
| `payment_type` / `credit_days` | según finalidad comercial | no por defecto | no por inferencia | no |
| precios/contratos | solo field mask sensible | no | no por `suppliers.update` ordinario | no |
| cuentas bancarias | solo finalidad explícita y mínima | no | no por defecto | no |
| documentos tributarios | solo finalidad explícita | no | solo si el workflow administrativo lo autoriza | no |

---

#### 57. Invariantes de seguridad

| Caso | Resultado |
| --- | --- |
| actor autorizado a orden pero no a precio | orden sin campos económicos |
| supervisor abre detalle directo | no recibe costos/totales por defecto |
| bodeguero consulta orden de recepción | proyección operativa sin costos internos |
| contador consulta orden dentro de `G-SRC` | proyección económica de conciliación |
| actor con `suppliers.view` operativo | proveedor mínimo, sin banco/contratos/precios |
| `suppliers.update` recibe `is_active` desde formulario | no autoriza activar/desactivar |
| token de PDF sin secreto dedicado | emisión/validación bloqueada |
| token de otra orden | `DENY` |
| token vencido | `DENY` |
| token revocado | `DENY` |
| token válido intenta otro handler | `DENY` |
| token válido de proveedor | solo proyección externa mínima |
| `notes` internas presentes | no salen al proveedor |
| query externa no renderiza precio | tampoco debe leerlo |
| `.view` intenta exportación masiva sensible | `DENY_BY_DEFAULT` |
| URL directa pide campo oculto | mismo field mask server-side |
| error incluye dato bancario oculto | prohibido |

---

#### 58. Hallazgos y propietarios

| Hallazgo | Impacto | Propietario | Condición de salida |
| --- | --- | --- | --- |
| listado de órdenes muestra `total_amount` sin field mask demostrado | exposición económica más amplia que la finalidad | `ORIGO-AUTH-010::<implementation_unit_id>` | query y render aplican proyección sensible |
| detalle carga costos/totales/notas bajo acceso general ORIGO | sobrelectura y exposición interna | `ORIGO-AUTH-010::<implementation_unit_id>` + owner de binding de permisos | `purchase_orders.view` + territorio + field mask antes de seleccionar |
| PDF interno valida `origo.access` y muestra costos | permiso de aplicación sustituye permiso de recurso | unidad propietaria de autorización/PDF | requiere `purchase_orders.view` y proyección del actor |
| token dura 30 días | ventana excesiva | `ORIGO-AUTH-010::<implementation_unit_id>` | TTL máximo 15 minutos |
| token usa fallback de secreto | firma puede quedar predecible ante mala configuración | `ORIGO-AUTH-010::<implementation_unit_id>` + owner de secretos | secreto dedicado obligatorio, sin fallback |
| token no demuestra revocación selectiva | enlace no puede invalidarse antes de expirar | `ORIGO-AUTH-010::<implementation_unit_id>` | revocación verificable |
| rama externa usa `service_role` y sobrelee costos | bypass privilegiado amplifica exposición | `ORIGO-AUTH-010::<implementation_unit_id>` | query externa mínima después de token válido |
| PDF/mensaje externo usan `notes` internas | fuga de contenido interno | `ORIGO-AUTH-010::<implementation_unit_id>` | notas internas excluidas o semántica supplier-facing explícita |
| listado de proveedores selecciona campos no renderizados | sobrelectura de datos comerciales | `ORIGO-AUTH-010::<implementation_unit_id>` | select mínimo por finalidad |
| edición de proveedor mezcla datos ordinarios, condiciones y `is_active` | field mask y estado acoplados | `ORIGO-AUTH-008` + `ORIGO-AUTH-010::<implementation_unit_id>` | update ordinario, sensible y status quedan separados |
| modelo completo de contratos/banco/precios no está demostrado | no puede protegerse físicamente algo no materializado | `ORIGO-AUTH-010::<implementation_unit_id>` + owners de `VSCREEN-0145`/Supabase aplicables | unidad consume modelo físico aprobado sin inventarlo |

Ningún hallazgo queda sin owner ni condición de salida.

---

#### 59. Frontera con ORIGO-AUTH-011

`ORIGO-AUTH-010` decide:

```text
QUÉ CAMPOS / DOCUMENTOS PUEDE VER O RECIBIR EL ACTOR
```

`ORIGO-AUTH-011` decidirá:

```text
CÓMO QUEDA REGISTRADO EL ACTOR DE RECEPCIÓN
```

Esta tarea no redefine:

- actor receptor;
- firma de recepción;
- atribución de quién recibió;
- identidad del receptor en inventario;
- reglas de recepción total/parcial.

---

#### 60. Frontera con ORIGO-AUTH-012 y 013

`ORIGO-AUTH-012` conserva integración de contexto operativo.

`ORIGO-AUTH-013` conserva administración sin check-in cuando corresponda.

Esta tarea solo consume el carril resultante para elegir field mask.

Regla:

```text
CONTEXTO
→ condiciona la proyección
```

pero:

```text
CONTEXTO
!=
AUTORIZACIÓN DE CAMPO SENSIBLE
```

---

#### 61. Frontera con ORIGO-AUTH-014 y 015

`ORIGO-AUTH-014` conserva la migración a paquetes de `vento-shell`.

`ORIGO-AUTH-015` conserva pruebas integrales.

Esta tarea define el contrato que esas materializaciones y pruebas deberán respetar; no ejecuta migración ni certificación final.

---

#### 62. Frontera con NUMERA

ORIGO preserva el precio/costo y condición comercial fuente de la compra.

NUMERA conserva la autoridad sobre:

- contabilidad;
- presupuesto;
- clasificación financiera;
- centros de costo;
- efectos contables;
- reportes financieros.

Mostrar un importe de compra autorizado en ORIGO no concede acceso a reportes o libros de NUMERA.

---

#### 63. Frontera con NEXO

NEXO puede necesitar cantidades, producto, presentación y referencia de compra para recibir inventario.

No necesita por defecto:

- costo de compra;
- precio de proveedor;
- cuenta bancaria;
- contrato;
- notas internas;
- total de orden.

Cualquier costo que NEXO consuma para valoración deberá provenir de su contrato de integración autorizado, no de una ampliación accidental de la proyección operativa ORIGO.

---

#### 64. Frontera con documentos y evidencia

Un documento adjunto puede contener más sensibilidad que su metadata.

Por tanto:

```text
PUEDE VER QUE EXISTE EL DOCUMENTO
!=
PUEDE DESCARGAR SU CONTENIDO
```

y:

```text
PUEDE VALIDAR VIGENCIA
!=
PUEDE EXPORTARLO
```

La materialización deberá separar esas decisiones cuando el modelo físico las soporte.

---

#### 65. Materialización física posterior

El contrato global queda listo para:

```text
ORIGO-AUTH-010::<implementation_unit_id>
```

Cada unidad deberá resolver mediante su lifecycle:

1. `implementation_unit_id` exacto;
2. package o packages consumidores;
3. `E5-GATE-008::<package_id>` aplicable;
4. target paths reales;
5. field masks físicos;
6. queries/selects a minimizar;
7. guards y Server Actions a reconciliar;
8. token externo y secreto;
9. revocación;
10. Storage/exports cuando apliquen;
11. pruebas negativas por rol, carril, recurso, campo y canal;
12. compatibilidad con consumidores;
13. rollback;
14. evidencia desplegada.

Este marcador no selecciona ni autoriza ninguna unidad.

---

#### 66. Requisitos de prueba derivados

**Resultado:** NO GENERA REQUISITOS DE PRUEBA

**Requisitos creados:** 0
**Requisitos modificados:** 0
**Requisitos diferidos:** 0
**Requisitos obsoletos:** 0
**Fragmentos del Registro 04A afectados:** 0

**Justificación:** la limitación de órdenes por columnas y canal externo, el token scoped/corto/revocable/sin fallback, la protección de datos sensibles de proveedor, la minimización de campos, la protección server-side, la auditoría y la denegación segura ya están protegidas por requisitos canónicos vigentes. Esta tarea especializa esas obligaciones en field masks y proyecciones concretas sin introducir una obligación verificable nueva fuera del registro existente.

---

#### 67. Cobertura de prueba vigente reutilizada

Sin modificar el Registro 04A, esta tarea reutiliza:

- `TREQ-ORIGO-002` para columnas de orden y documento externo con token obligatorio, scoped, corto, revocable y sin fallback;
- `TREQ-ORIGO-004` para importes, condiciones de aprobación, segregación y preservación de la orden;
- `TREQ-ORIGO-005` para contratos, precios, impuestos, descuentos, fletes, mínimos, vigencias, datos tributarios, cuentas bancarias, Storage privado, exportación y auditoría;
- `TREQ-AUTH-001` para permiso/contexto/scope canónicos sin listas locales de rol como autoridad final;
- `TREQ-AUTH-013` para impedir bypass por URL, formulario, API o RPC y validar columnas permitidas server-side;
- `TREQ-AUTH-014` para impedir uso de decisiones/tokens derivados obsoletos;
- `TREQ-AUTH-015` para evidencia correlacionable de toda decisión y acción protegida.

Esta sección es solo trazabilidad de cobertura existente.

---

#### 68. Evidencia de validación

| Clase | Estado | Evidencia |
| --- | --- | --- |
| BUILD | `NOT_EXECUTED` | La compilación documental se ejecutará en el checkout local después de incorporar el artefacto. |
| LOCAL | `NOT_EXECUTED` | Formato, quality, delivery, topología, EOL, dominio, plan y TREQ quedan pendientes del checkout local. |
| REMOTA | `PASS` | Se verificaron `vento-shell/main@c4425c5a8ac0e9da078bff8ec2b11b9db7743bef`, `vento-origo/main@70860f1ca5f0a4a73e894cbb840956f9f7eda2ad`, owner ORIGO, catálogo sensible, scopes, matrices, 04A ORIGO/AUTH, pantallas y runtime actual de órdenes, proveedores y PDF, incluido el helper de token. |
| OPERATIVA | `NOT_EXECUTED` | No se probaron actores reales, precios, proveedores, documentos, tokens, revocación, Storage, exportaciones, RLS, RPC ni ambientes desplegados. |
| FÍSICA | `NOT_APPLICABLE` | Este marcador global no crea ni autoriza ninguna instancia `ORIGO-AUTH-010::<implementation_unit_id>`. |

---

#### 69. Criterios de aceptación

- [x] La topología queda `PER_IMPLEMENTATION_UNIT / POST_E5_PACKAGE`.
- [x] El marcador global no crea instancia física.
- [x] Se preservan permisos y grants aprobados; no se inventan claves nuevas.
- [x] `purchase_orders.view`, `receipts.view` y `suppliers.view` conservan clasificación `COMMERCIAL_CONFIDENTIALITY`.
- [x] Se diferencia autorización de recurso de autorización de columnas.
- [x] Se definen familias sensibles de orden y proveedor.
- [x] Se define minimización desde query/select y no solo desde UI.
- [x] `unit_cost`, `stock_unit_cost`, `line_total` y `total_amount` quedan protegidos por finalidad.
- [x] `notes` queda interna por defecto y no cruza al proveedor.
- [x] Supervisor y carril operativo no reciben precios internos por defecto.
- [x] Contabilidad conserva proyección económica de orden dentro de su recurso, sin abrir expediente de proveedor.
- [x] Aprobación recibe información económica mínima suficiente, no expediente sensible irrestricto.
- [x] `suppliers.update` no concede contratos, banco, precios ni `is_active` por inferencia.
- [x] `VSCREEN-0145` queda base-only de hecho por su dependencia de actor base y field mask sensible; el carril operativo no puede abrirla.
- [x] Se protege historial/versionado de precios y condiciones.
- [x] Storage sensible requiere privacidad y autorización.
- [x] `.view` no implica exportación sensible.
- [x] PDF interno requiere permiso de recurso y field mask.
- [x] PDF externo queda scoped a una orden y propósito.
- [x] El secreto del token es obligatorio y sin fallback.
- [x] `PURCHASE_ORDER_PDF_SECRET` queda como secreto dedicado obligatorio si se conserva el helper actual.
- [x] `NEXTAUTH_SECRET`, `SESSION_SECRET` y secreto hardcoded no pueden actuar como fallback.
- [x] La vigencia máxima del token externo queda en 15 minutos.
- [x] Se exige revocación selectiva comprobable.
- [x] `service_role` no autoriza sobrelectura.
- [x] Se documenta la sobrelectura AS-IS del PDF externo.
- [x] Se documenta la exposición AS-IS de notas internas al canal externo.
- [x] Se documenta el sobreselect AS-IS de proveedores.
- [x] No se inventan columnas, tablas, buckets ni rutas ausentes.
- [x] Cada hallazgo tiene owner y condición de salida.
- [x] No se crea ni modifica requisito de prueba.
- [x] No se modifica Registro 04A.
- [x] No se ejecuta cambio físico, Supabase, migración ni despliegue.
- [x] `ORIGO-AUTH-011` queda reservada y no se desarrolla aquí.

---

#### 70. Límites

Esta tarea no:

- modifica código;
- modifica `vento-origo`;
- crea permisos nuevos;
- cambia grants ya aprobados;
- cambia el territorio definido por `ORIGO-AUTH-009`;
- crea columnas de precio, contrato, banco o documento;
- crea tablas;
- crea buckets;
- crea rutas;
- implementa `VSCREEN-0145`;
- modifica `purchase_orders`;
- modifica `purchase_order_items`;
- modifica `suppliers`;
- modifica `product_suppliers`;
- modifica Server Actions;
- modifica el PDF;
- cambia el helper del token;
- crea el mecanismo físico de revocación;
- crea secretos;
- rota secretos;
- ejecuta `service_role`;
- crea RLS;
- crea RPC;
- modifica Storage;
- crea exportaciones;
- modifica datos;
- ejecuta Supabase;
- crea migraciones;
- modifica NEXO o NUMERA;
- define el actor de recepción;
- selecciona package o implementation unit;
- ejecuta E5;
- autoriza una instancia física;
- modifica el Registro 04A;
- desarrolla `ORIGO-AUTH-011`.

---

#### 71. Continuidad

**ÚLTIMA TAREA APROBADA**
`ORIGO-AUTH-009 — Limitar órdenes por sede o centro de costo`

**TAREA ACTUAL APROBADA**
`ORIGO-AUTH-010 — Proteger precios y datos sensibles`

**SIGUIENTE TAREA RESERVADA**
`ORIGO-AUTH-011 — Registrar actor de recepción`

### [ ] ORIGO-AUTH-011 — Registrar actor de recepción
### [ ] ORIGO-AUTH-012 — Integrar contexto operativo donde aplique
### [ ] ORIGO-AUTH-013 — Mantener administración sin check-in
### [ ] ORIGO-AUTH-014 — Migrar a paquetes de vento-shell
### [ ] ORIGO-AUTH-015 — Ejecutar pruebas integrales
