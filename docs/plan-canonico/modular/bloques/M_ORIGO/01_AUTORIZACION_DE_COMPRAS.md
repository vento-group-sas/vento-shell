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

### [ ] ORIGO-AUTH-005 — Definir permisos de creación
### [ ] ORIGO-AUTH-006 — Definir permisos de aprobación
### [ ] ORIGO-AUTH-007 — Definir permisos de recepción
### [ ] ORIGO-AUTH-008 — Definir permisos de corrección
### [ ] ORIGO-AUTH-009 — Limitar órdenes por sede o centro de costo
### [ ] ORIGO-AUTH-010 — Proteger precios y datos sensibles
### [ ] ORIGO-AUTH-011 — Registrar actor de recepción
### [ ] ORIGO-AUTH-012 — Integrar contexto operativo donde aplique
### [ ] ORIGO-AUTH-013 — Mantener administración sin check-in
### [ ] ORIGO-AUTH-014 — Migrar a paquetes de vento-shell
### [ ] ORIGO-AUTH-015 — Ejecutar pruebas integrales
