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

### [ ] ORIGO-AUTH-003 — Inventariar vistas de recepción
### [ ] ORIGO-AUTH-004 — Definir permisos de consulta
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
