### MINI-BLOQUE — AUTORIZACIÓN DE INVENTARIO LOGISTICA Y ACTIVOS

<!-- PLAN-SECTION-META:START -->
Esta sección organiza **autorización de inventario logistica y activos** dentro de **K NEXO**. Agrupa tareas que producen un resultado funcional común y deben mantenerse juntas para conservar contexto, trazabilidad y orden de ejecución.

**Cobertura canónica:** `NEXO-AUTH-021` a `NEXO-AUTH-032` — 12 tareas.

**Resultado esperado:** al cerrar este mini-bloque, su resultado debe quedar definido, verificable y coherente con las secciones anterior y siguiente antes de avanzar.

**Límites funcionales:** comienza con “Auditar permisos actuales de LPN, activos y contenedores” y concluye con “Separar reporte, solicitud, aprobación, ejecución, verificación, liberación, cierre y reapertura”.
<!-- PLAN-SECTION-META:END -->

<!-- EXECUTION-GATE-RECONCILIATION:B601-800:NEXO-AUTH-021-032 -->
### Reconciliación topológica de NEXO-AUTH-021 a NEXO-AUTH-032

`NEXO-AUTH-021` es auditoría del estado actual y no crea implementación propia. `NEXO-AUTH-022..032` protegen o materializan segregación, restricciones y pruebas del subdominio.

| Tareas | Modalidad | Gate |
| --- | --- | --- |
| `NEXO-AUTH-021` | `DEFINE_ONCE` | `NO_PHYSICAL_INSTANCE` |
| `NEXO-AUTH-022..032` | `PER_IMPLEMENTATION_UNIT` | `POST_E5_PACKAGE` |

### ✅ NEXO-AUTH-021 — Auditar permisos actuales de LPN, activos y contenedores

**Estado:** APROBADA
**Tarea anterior:** NEXO-AUTH-020 — Ejecutar pruebas integrales
**Tarea siguiente:** NEXO-AUTH-022 — Proteger creación, actualización, cierre, anulación y reetiquetado de LPN
**Tipo de tarea:** documental; auditoría canónica del estado actual de autorización de LPN, activos, reutilizables, contenedores, conteos e impresión vinculada, con clasificación de brechas y handoff a tareas propietarias posteriores
**Bloque:** BLOQUE K — NEXO
**Repositorio propietario:** `vento-group-sas/vento-shell`
**Archivo propietario:** `docs/plan-canonico/modular/bloques/K_NEXO/03_AUTORIZACION_DE_INVENTARIO_LOGISTICA_Y_ACTIVOS.md`
**Estado físico resultante:** `ESPECIFICADO_NO_MATERIALIZADO`
**Cambios físicos autorizados:** Ninguno durante esta tarea.
**Requisitos de prueba creados o modificados:** 0

---

#### 1. Propósito

Auditar de forma cerrada y verificable cómo están protegidas actualmente las superficies de LPN, activos, reutilizables, grupos contables, conteos, custodia, mantenimiento, ubicación e impresión vinculada, separando:

- permiso canónico disponible;
- permiso realmente consumido por el código actual;
- autenticación sin autorización suficiente;
- rutas o componentes sin ciclo funcional alcanzable;
- operaciones todavía protegidas por permisos legacy amplios;
- capacidades sin permiso atómico activo;
- responsabilidades reservadas a `NEXO-AUTH-022` a `NEXO-AUTH-030`.

La auditoría no concede permisos, no modifica grants y no materializa protección física.

#### 2. Naturaleza y topología

`NEXO-AUTH-021` es una auditoría documental `DEFINE_ONCE` con `NO_PHYSICAL_INSTANCE`.

Por tanto:

1. produce un diagnóstico canónico único;
2. no crea instancia por paquete ni por unidad;
3. no ejecuta cambios en `vento-nexo`;
4. no modifica Supabase;
5. no crea RLS, RPC, grants ni migraciones;
6. no sustituye las tareas protectoras posteriores;
7. entrega una clasificación suficientemente precisa para que cada brecha tenga propietario y condición de salida.

#### 3. Universo auditado

El universo incluye como mínimo:

- LPN y contenido de LPN;
- activos serializados;
- grupos o reutilizables controlados por cantidad;
- contenedores físicos y su relación con LPN;
- ubicación, traslado y custodia de activos;
- mantenimiento, daño, pérdida y baja;
- sesiones y líneas de conteo de activos;
- cierre y cancelación de conteos;
- QR, impresión y reimpresión vinculadas a activo, grupo, LPN o contenedor;
- permisos legacy utilizados por estas superficies;
- permisos canónicos activos disponibles para sustitución o especialización.

#### 4. Fuentes de autoridad auditadas

La auditoría contrasta:

- catálogo activo de 67 permisos NEXO en `@vento/contracts/authorization`;
- contratos de modalidad, scope, recurso y contexto del catálogo canónico;
- código vigente de `vento-nexo`;
- auditorías previas de infraestructura LPN y consumidores;
- requisitos de prueba NEXO ya existentes;
- topología documental `NEXO-AUTH-021..032`.

La existencia de una clave en catálogo no demuestra que el consumidor la utilice.

#### 5. Regla de clasificación

Cada superficie se clasifica en una de estas condiciones:

| Estado | Significado |
| --- | --- |
| `CANONICAL_MATCH` | la superficie consume una capacidad canónica específica compatible con la acción |
| `LEGACY_BROAD` | la superficie depende de una capacidad amplia legacy que cubre más de una responsabilidad |
| `AUTH_ONLY` | existe autenticación, pero no una autorización de aplicación/capacidad suficiente |
| `UNREACHABLE_OR_PARTIAL` | existen piezas técnicas, pero no un proceso alcanzable completo |
| `ATOMIC_PERMISSION_GAP` | la acción empresarial existe o está prevista, pero no tiene permiso atómico activo suficiente |
| `NOT_IMPLEMENTED` | la capacidad empresarial no está materializada en el consumidor observado |
| `OWNER_LATER_TASK` | la corrección pertenece a una tarea posterior ya reservada |

#### 6. Catálogo canónico relevante observado

Dentro de las 67 identidades activas de NEXO se observaron como directamente relevantes:

| Permiso canónico | Alcance funcional actual |
| --- | --- |
| `nexo.assets.items.view` | consulta de activo individual |
| `nexo.assets.items.create` | creación de activo individual |
| `nexo.assets.groups.view` | consulta de grupos o reutilizables por cantidad |
| `nexo.assets.counts.view` | consulta de conteos de activos |
| `nexo.inventory.lpns.view` | consulta de LPN |
| `nexo.inventory.locations.view` | consulta de ubicaciones |
| `nexo.inventory.location_assignments.assign` | asignación de ubicación |
| `nexo.inventory.stock_counts.view` | consulta de conteos de inventario |
| `nexo.inventory.stock_counts.perform` | ejecución de conteos de inventario |
| `nexo.inventory.stock_count_variances.approve` | aprobación de diferencias |
| `nexo.inventory.stock_count_variances.resolve` | resolución de diferencias |
| `nexo.printing.jobs.view` | consulta de trabajos de impresión |
| `nexo.printing.templates.update` | modificación de plantillas de impresión |

Estas identidades no cubren por implicación mutaciones distintas de su acción nominal.

#### 7. Brecha entre catálogo y consumidor actual

La auditoría confirma que el código actual de activos no consume las identidades `nexo.assets.*` anteriores como guard principal.

Las ocho superficies observadas bajo `src/app/inventory/assets` usan:

```text
appId = nexo
permissionCode = inventory.stock
```

Esto produce una brecha estructural:

```text
CATALOGO ATOMICO DISPONIBLE
!=
GUARD EFECTIVO DEL CONSUMIDOR
```

La existencia de permisos específicos en catálogo no corrige por sí sola el uso efectivo de `inventory.stock`.

#### 8. Inventario actual de superficies de activos

| Superficie observada | Operación principal | Guard observado | Clasificación |
| --- | --- | --- | --- |
| `/inventory/assets` | listar activos y grupos | `inventory.stock` | `LEGACY_BROAD` |
| `/inventory/assets/new` | crear activo o grupo | `inventory.stock` | `LEGACY_BROAD` |
| `/inventory/assets/quick` | creación rápida de grupos | `inventory.stock` | `LEGACY_BROAD` |
| `/inventory/assets/items/[id]` | detalle de activo | `inventory.stock` | `LEGACY_BROAD` |
| acciones de activo individual | mover, editar, registrar mantenimiento | `inventory.stock` | `LEGACY_BROAD` |
| `/inventory/assets/groups/[id]` | consultar y modificar grupo | `inventory.stock` | `LEGACY_BROAD` |
| `/inventory/assets/counts` | crear y consultar sesiones de conteo | `inventory.stock` | `LEGACY_BROAD` |
| `/inventory/assets/counts/[id]` | capturar, cerrar o cancelar conteo | `inventory.stock` | `LEGACY_BROAD` |

No se acepta `inventory.stock` como sustituto semántico permanente de todas esas acciones.

#### 9. Lectura y creación de activos

El catálogo ya diferencia:

```text
nexo.assets.items.view
nexo.assets.items.create
```

El consumidor observado no mantiene esa separación y utiliza `inventory.stock` tanto para lectura como para creación.

Decisión:

- lectura de activo debe converger a capacidad de lectura específica;
- creación debe usar capacidad de creación específica;
- una capacidad de lectura no autoriza creación;
- una capacidad de stock no autoriza implícitamente altas de activos.

Propietario de protección: `NEXO-AUTH-024`.

#### 10. Grupos y reutilizables

El catálogo contiene `nexo.assets.groups.view` para lectura de grupos.

El código observado permite bajo `inventory.stock`:

- consultar grupos;
- cambiar ubicación;
- editar atributos;
- modificar cantidad esperada;
- registrar movimientos derivados.

El permiso de vista no autoriza esas mutaciones y el permiso legacy amplio tampoco constituye el modelo objetivo.

Propietarios posteriores:

- `NEXO-AUTH-024` para consulta y administración;
- `NEXO-AUTH-025` para custodia, préstamo, devolución y transferencia;
- `NEXO-AUTH-029` para retirar dependencia legacy amplia.

#### 11. Custodia, ubicación y transferencia

Las acciones actuales de activos individuales y grupos pueden cambiar:

- sede;
- área;
- LOC;
- posición interna;
- responsable;
- movimiento asociado.

Aunque el catálogo contiene `nexo.inventory.location_assignments.assign`, el código observado de activos continúa protegido por `inventory.stock`.

La autorización objetivo debe resolver como mínimo:

```text
ACTOR
+ CAPACIDAD EXACTA
+ ACTIVO O GRUPO
+ TERRITORIO ACTUAL
+ TERRITORIO DESTINO
+ CUSTODIA
+ ESTADO
= DECISION
```

La ubicación de destino no puede aceptarse únicamente porque exista.

Propietarios posteriores: `NEXO-AUTH-024` y `NEXO-AUTH-025`.

#### 12. Mantenimiento, daño, pérdida y baja

La acción observada `registerAssetMaintenance` y los cambios relacionados sobre `asset_items` se ejecutan bajo `inventory.stock`.

Ese guard no diferencia:

- programar mantenimiento;
- registrar ejecución;
- marcar entrada o salida de mantenimiento;
- registrar daño;
- declarar pérdida;
- ejecutar baja;
- liberar nuevamente el activo.

La auditoría clasifica este conjunto como `ATOMIC_PERMISSION_GAP` más `LEGACY_BROAD`.

Propietario posterior: `NEXO-AUTH-026`.

#### 13. Conteos de activos

El código actual permite bajo `inventory.stock`:

- crear una sesión de conteo;
- poblar líneas esperadas;
- capturar estado y cantidad observada;
- registrar ubicación encontrada;
- cerrar la sesión;
- cancelar la sesión.

El catálogo solo expone directamente `nexo.assets.counts.view` para el subdominio de activos, mientras el catálogo general de inventario sí separa `stock_counts.perform`, aprobación y resolución de diferencias.

La auditoría concluye:

```text
CAPTURAR OBSERVACION
!=
CERRAR CONTEO
!=
APROBAR DIFERENCIA
!=
RESOLVER DIFERENCIA
```

La superficie actual no demuestra esa segregación.

Propietario posterior: `NEXO-AUTH-027`.

#### 14. Estado actual de LPN

Se confirma el mismo AS-IS ya observado por auditorías técnicas:

- `/inventory/lpns` redirige a `/inventory/stock`;
- `LpnCreateForm` existe como componente aislado;
- no se observó consumidor interno del formulario;
- `GET /api/inventory/lpns` consulta `inventory_lpns`;
- el endpoint devuelve identidad básica del LPN;
- no se observó ciclo alcanzable completo de creación, contenido, cierre, anulación, reetiquetado, división, unión o custodia.

Clasificación global: `UNREACHABLE_OR_PARTIAL`.

#### 15. Autorización actual del endpoint LPN

`GET /api/inventory/lpns` comprueba usuario autenticado mediante Supabase Auth y después lee `inventory_lpns`.

No se observó en esa ruta una comprobación explícita de:

```text
nexo.access
nexo.inventory.lpns.view
```

ni una resolución canónica equivalente de permiso, scope y recurso antes de la consulta.

Clasificación: `AUTH_ONLY`.

La existencia de RLS no se presume como sustituto suficiente de la autorización de aplicación sin evidencia del contrato concreto aplicado al objeto.

Propietario posterior: `NEXO-AUTH-022` para el ciclo de identidad y `NEXO-AUTH-029` para retiro de autoridad legacy o incompleta.

#### 16. Mutaciones LPN

El catálogo activo observado contiene `nexo.inventory.lpns.view`, pero no expone identidades atómicas activas específicas para:

- crear;
- actualizar;
- cerrar;
- anular;
- reetiquetar;
- empacar;
- desempacar;
- dividir;
- unir;
- transferir contenido o custodia.

Esto se clasifica como `ATOMIC_PERMISSION_GAP`, no como autorización implícita mediante `lpns.view`.

Propietarios posteriores:

- `NEXO-AUTH-022` para ciclo de vida del LPN;
- `NEXO-AUTH-023` para empaque, desempaque, división, unión y transferencia.

#### 17. Contenedores físicos

No se observó en el catálogo activo NEXO una familia `container.*` o equivalente que autorice por nombre propio el ciclo completo de contenedores físicos.

Tampoco se observó en `vento-nexo` una superficie funcional autónoma de contenedores que permita concluir que el subdominio está ya protegido.

La ausencia no autoriza a inventar una clave nueva en esta tarea.

La decisión es mantener la separación canónica:

```text
IDENTIDAD FISICA DEL CONTENEDOR
!=
IDENTIDAD DEL LPN
!=
STOCK SUELTO
!=
ACTIVO SERIALIZADO
```

La protección material se deriva a `NEXO-AUTH-022`, `NEXO-AUTH-023`, `NEXO-AUTH-024` y `NEXO-AUTH-025` según la operación concreta.

#### 18. QR, impresión y reimpresión

Se observaron acciones cliente de activos y grupos capaces de:

- abrir una ventana de impresión;
- ejecutar `window.print()`;
- obtener una copia local del QR;
- en activos individuales, construir acceso hacia `/printing/jobs`.

El catálogo dispone de:

```text
nexo.printing.jobs.view
nexo.printing.templates.update
```

pero una capacidad de consulta de trabajos o modificación de plantilla no equivale a permiso atómico de imprimir o reimprimir un recurso empresarial.

La auditoría clasifica impresión/reimpresión como `ATOMIC_PERMISSION_GAP` cuando produzca un acto gobernado o una nueva salida física auditable.

Propietario posterior: `NEXO-AUTH-028`.

#### 19. Dependencia de `inventory.stock`

`inventory.stock` aparece como autoridad efectiva amplia en las superficies de activos observadas.

Su uso mezcla responsabilidades que el catálogo objetivo separa entre:

- lectura;
- creación;
- conteo;
- asignación de ubicación;
- custodia;
- mantenimiento;
- impresión;
- otras mutaciones.

Regla de auditoría:

```text
PERMISO LEGACY AMPLIO
NO PUEDE SER
ORACLE FINAL DE AUTORIZACION
```

Propietario de retiro: `NEXO-AUTH-029`.

#### 20. Matriz consolidada de hallazgos

| ID | Hallazgo | Estado | Propietario |
| --- | --- | --- | --- |
| `AUTH021-F-001` | endpoint LPN exige autenticación pero no permiso canónico explícito | `AUTH_ONLY` | `NEXO-AUTH-022` / `NEXO-AUTH-029` |
| `AUTH021-F-002` | ciclo LPN no es alcanzable de extremo a extremo | `UNREACHABLE_OR_PARTIAL` | `NEXO-AUTH-022` / `NEXO-AUTH-023` |
| `AUTH021-F-003` | no existen permisos atómicos activos para mutaciones completas de LPN | `ATOMIC_PERMISSION_GAP` | `NEXO-AUTH-022` / `NEXO-AUTH-023` |
| `AUTH021-F-004` | ocho superficies de activos observadas dependen de `inventory.stock` | `LEGACY_BROAD` | `NEXO-AUTH-024` a `NEXO-AUTH-029` |
| `AUTH021-F-005` | lectura y creación de activos no usan los permisos `nexo.assets.*` disponibles | `LEGACY_BROAD` | `NEXO-AUTH-024` / `NEXO-AUTH-029` |
| `AUTH021-F-006` | mutaciones de ubicación y custodia usan permiso amplio | `LEGACY_BROAD` | `NEXO-AUTH-024` / `NEXO-AUTH-025` / `NEXO-AUTH-029` |
| `AUTH021-F-007` | mantenimiento y estados asociados carecen de separación atómica observada | `ATOMIC_PERMISSION_GAP` | `NEXO-AUTH-026` |
| `AUTH021-F-008` | captura, cierre y cancelación de conteos comparten guard amplio | `LEGACY_BROAD` | `NEXO-AUTH-027` / `NEXO-AUTH-029` |
| `AUTH021-F-009` | impresión/reimpresión de QR no tiene permiso atómico activo observado | `ATOMIC_PERMISSION_GAP` | `NEXO-AUTH-028` |
| `AUTH021-F-010` | no existe familia activa de permisos específica de contenedor físico | `ATOMIC_PERMISSION_GAP` | `NEXO-AUTH-022` a `NEXO-AUTH-025` |

Todos los hallazgos tienen propietario ya existente; no se crea una tarea adicional.

#### 21. Condición de salida por hallazgo

| Hallazgo | Condición de salida |
| --- | --- |
| `AUTH021-F-001` | lectura LPN protegida por capacidad canónica, scope y recurso en servidor |
| `AUTH021-F-002` | ciclo LPN materializado por sus tareas propietarias, sin confundir infraestructura con proceso |
| `AUTH021-F-003` | acciones LPN protegidas por capacidades atómicas aprobadas |
| `AUTH021-F-004` | superficies migradas fuera de `inventory.stock` como autoridad final |
| `AUTH021-F-005` | lectura y creación de activos consumen capacidades específicas compatibles |
| `AUTH021-F-006` | ubicación, custodia y transferencia revalidan capacidad, origen y destino |
| `AUTH021-F-007` | mantenimiento, daño, pérdida y baja quedan separados y autorizados |
| `AUTH021-F-008` | captura de conteo queda separada de aprobación y resolución de diferencias |
| `AUTH021-F-009` | impresión y reimpresión usan permisos atómicos y evidencia auditable |
| `AUTH021-F-010` | operaciones de contenedor usan capacidades aprobadas según identidad y operación, sin alias permisivo |

#### 22. Handoff a `NEXO-AUTH-022`

`NEXO-AUTH-022` recibe como mínimo:

```text
LPN READ AUTHORIZATION INCOMPLETA
+
CICLO LPN NO ALCANZABLE
+
MUTACIONES LPN SIN PERMISOS ATOMICOS ACTIVOS SUFICIENTES
+
SEPARACION CONTENEDOR/LPN OBLIGATORIA
```

Debe proteger creación, actualización, cierre, anulación y reetiquetado sin reutilizar `lpns.view` como permiso de escritura.

#### 23. Handoff a `NEXO-AUTH-023`

Recibe las brechas de:

- empaque;
- desempaque;
- división;
- unión;
- transferencia;
- contenido de LPN;
- relación operativa con contenedor.

Cada acción deberá poder denegarse de forma independiente cuando la semántica o riesgo lo exijan.

#### 24. Handoff a `NEXO-AUTH-024` y `NEXO-AUTH-025`

`NEXO-AUTH-024` recibe lectura, creación y administración de activos/reutilizables actualmente protegidas por `inventory.stock`.

`NEXO-AUTH-025` recibe:

- custodia;
- préstamo;
- devolución;
- transferencia;
- cambio de responsable;
- territorio origen/destino.

La condición de custodio no concede por sí sola permiso de modificación.

#### 25. Handoff a `NEXO-AUTH-026`

Recibe la separación de:

- mantenimiento;
- daño;
- pérdida;
- baja;
- retorno o liberación posterior.

Una sola capacidad de stock no puede autorizar toda la secuencia.

#### 26. Handoff a `NEXO-AUTH-027`

Recibe la separación obligatoria entre:

```text
CREAR SESION
CAPTURAR OBSERVACION
CERRAR CAPTURA
APROBAR DIFERENCIA
RESOLVER DIFERENCIA
```

El mismo actor podrá acumular capacidades solo cuando las matrices canónicas lo permitan expresamente; no se infiere por implementación actual.

#### 27. Handoff a `NEXO-AUTH-028`

Recibe impresión y reimpresión como acciones gobernadas distintas de:

- ver trabajo;
- editar plantilla;
- obtener una copia local de una imagen;
- visualizar QR.

La salida física y la reimpresión deben conservar actor, recurso, dispositivo, motivo cuando aplique y resultado.

#### 28. Handoff a `NEXO-AUTH-029`

`NEXO-AUTH-029` recibe como deuda explícita el uso de `inventory.stock` como permiso amplio en activos y cualquier otro alias o guard legacy que permanezca después de las tareas específicas.

El retiro solo puede ocurrir después de que el reemplazo específico exista y esté validado.

#### 29. Frontera con `NEXO-AUTH-030`

`NEXO-AUTH-030` ejecutará las pruebas integrales del subdominio después de que 022–029 hayan materializado sus protecciones.

Esta auditoría no puede declarar PASS integral sobre superficies cuya protección todavía es futura.

#### 30. Frontera Supabase

La auditoría no autoriza cambios en Supabase.

Cualquier futura modificación de:

- RLS;
- grants;
- tablas;
- vistas;
- funciones;
- RPC;
- triggers;
- tipos generados;
- migraciones;

deberá ser creada, versionada, documentada y ejecutada desde `vento-group-sas/vento-shell` por la tarea e instancia propietarias.

La ausencia de migraciones versionadas observables para objetos legacy no se corrige desde esta tarea.

#### 31. Requisitos de prueba derivados

**Resultado:** NO GENERA REQUISITOS DE PRUEBA.

**Requisitos creados:** 0
**Requisitos modificados:** 0
**Requisitos diferidos:** 0
**Requisitos obsoletos:** 0

Justificación:

- el ciclo completo de LPN ya está cubierto por requisitos vigentes;
- activos, custodia, conteos, mantenimiento e impresión ya disponen de obligaciones de prueba registradas;
- esta tarea inventaría duplicados si creara requisitos solo para volver a expresar esas mismas obligaciones;
- los hallazgos de auditoría se asignan a tareas propietarias existentes sin modificar el registro.

#### 32. Cobertura de prueba vigente reutilizada

Se reutiliza, sin modificar el registro:

- `TREQ-NEXO-004` para ciclo completo y auditable de LPN;
- `TREQ-NEXO-005` para impresión durable y no duplicada;
- `TREQ-NEXO-011` para movimiento, LPN, conteo, atomicidad e idempotencia;
- `TREQ-NEXO-012` para trazabilidad de lote, condición y contenido dentro de LPN;
- `TREQ-NEXO-013` para activos, custodia, conteo, daño, pérdida y QR;
- `TREQ-NEXO-014` para mantenimiento, reparación y baja.

Esta lista es trazabilidad de cobertura existente y no representa actualización de 04A.

#### 33. Evidencia de validación

| Clase | Estado | Evidencia |
| --- | --- | --- |
| BUILD | NOT_APPLICABLE | auditoría documental `DEFINE_ONCE`; no produce build ni modificación de producto |
| LOCAL | NOT_EXECUTED | incorporación, normalización y batería documental corresponden al checkout local al incorporar la tarea |
| REMOTA | PASS | se verificaron `vento-shell` main `93ee08a6e6fca67ce9622e2a254d46dc75c20b0f`, `vento-nexo` main `f0a12557a1a258c84b025933653dc756de4b5a59`, owner, topología, catálogo NEXO de 67 permisos activos, código LPN y ocho superficies de activos |
| OPERATIVA | NOT_APPLICABLE | no se ejecutaron acciones de LPN, activos, contenedores, conteo, mantenimiento ni impresión sobre operación real |
| FÍSICA | NOT_APPLICABLE | `NEXO-AUTH-021` usa `DEFINE_ONCE / NO_PHYSICAL_INSTANCE` y no crea una materialización física |

#### 34. Criterios de aceptación

- [x] se auditó el catálogo canónico relevante sin inventar claves;
- [x] se distinguió permiso disponible de permiso realmente consumido;
- [x] se identificó `inventory.stock` como guard amplio en las ocho superficies de activos observadas;
- [x] se identificó el endpoint LPN como autenticado sin permiso canónico explícito observado;
- [x] se preservó la conclusión de que LPN sigue siendo un proceso parcial/no alcanzable;
- [x] se separaron lectura, creación, custodia, mantenimiento, conteo e impresión;
- [x] se identificaron brechas de permisos atómicos sin asignar nombres nuevos;
- [x] cada hallazgo tiene tarea propietaria y condición de salida;
- [x] no se trasladó implementación física a esta auditoría;
- [x] no se modifican TREQ;
- [x] no se modifica 04A;
- [x] `NEXO-AUTH-022` recibe un handoff cerrado.

#### 35. Límites

Esta tarea no:

- crea permisos nuevos;
- modifica las 67 identidades activas NEXO;
- modifica matrices de grants;
- decide todavía los nombres de permisos atómicos faltantes;
- implementa LPN;
- implementa contenedores;
- modifica activos;
- modifica conteos;
- modifica impresión;
- retira `inventory.stock`;
- cambia RLS o RPC;
- ejecuta migraciones;
- certifica el subdominio;
- desarrolla `NEXO-AUTH-022` a `NEXO-AUTH-032`.

#### 36. Continuidad

**ÚLTIMA TAREA APROBADA**
`NEXO-AUTH-020 — Ejecutar pruebas integrales`

**TAREA ACTUAL APROBADA**
`NEXO-AUTH-021 — Auditar permisos actuales de LPN, activos y contenedores`

**SIGUIENTE TAREA RESERVADA**
`NEXO-AUTH-022 — Proteger creación, actualización, cierre, anulación y reetiquetado de LPN`

### ✅ NEXO-AUTH-022 — Proteger creación, actualización, cierre, anulación y reetiquetado de LPN

**Estado:** APROBADA
**Tarea anterior:** NEXO-AUTH-021 — Auditar permisos actuales de LPN, activos y contenedores
**Tarea siguiente:** NEXO-AUTH-023 — Proteger empaque, desempaque, división, unión y transferencia
**Tipo de tarea:** Contrato global con materialización por unidad (`PER_IMPLEMENTATION_UNIT`) — contrato NEXO para proteger lectura y lifecycle de LPN, exigir autorización server-side por acción, estado, territorio y recurso, aplicar `DEFAULT_DENY` a mutaciones sin `PermissionKey` activa exacta y preservar identidad, idempotencia, concurrencia, auditoría y fronteras con contenido, custodia, contenedores e impresión
**Bloque:** BLOQUE K — NEXO
**Repositorio propietario:** `vento-group-sas/vento-shell`
**Archivo propietario:** `docs/plan-canonico/modular/bloques/K_NEXO/03_AUTORIZACION_DE_INVENTARIO_LOGISTICA_Y_ACTIVOS.md`
**Estado físico resultante:** `ESPECIFICADO_NO_MATERIALIZADO`
**Cambios físicos autorizados:** 0 durante el marcador global; las futuras materializaciones ocurren únicamente mediante `NEXO-AUTH-022::<implementation_unit_id>` después de que la unidad y su package propietario estén asignados, `E5-GATE-008::<package_id>` aplicable haya resultado `PASS` y exista autorización física explícita
**Requisitos de prueba creados o modificados:** 0

---

#### 1. Propósito

Proteger el lifecycle de una identidad LPN para que consultar, crear, actualizar, activar, cerrar, anular y reetiquetar no puedan ejecutarse por autenticación sola, visibilidad de interfaz, nombre de rol, permiso legacy amplio, posesión de un código LPN, conocimiento de una URL o reutilización indebida de una capacidad de lectura.

La regla raíz queda:

```text
ACTOR EFECTIVO
+ ACCESO A NEXO
+ ACCIÓN LPN EXACTA
+ CAPACIDAD CANÓNICA EXACTA CUANDO EXISTA
+ CARRIL AUTORIZANTE COMPLETO
+ SCOPE VIGENTE
+ TERRITORIO DEL LPN
+ ESTADO Y REVISIÓN VIGENTES
+ RECURSO O BORRADOR RESUELTO EN SERVIDOR
+ PRECONDICIONES DE DOMINIO
+ DENEGACIONES AUSENTES
+ IDEMPOTENCIA Y CONCURRENCIA
→ ACCIÓN AUTORIZABLE
```

Y siempre:

```text
MUTACIÓN LPN SIN PermissionKey ACTIVA EXACTA
→ DEFAULT_DENY
```

Esta tarea define el contrato de protección. No materializa todavía rutas, Server Actions, RPC, RLS, migraciones, UI, etiquetas ni cambios de datos.

#### 2. Handoff recibido de `NEXO-AUTH-021`

La auditoría anterior entrega cuatro brechas directamente relevantes:

1. el endpoint LPN observado autentica usuario pero no demuestra autorización explícita mediante `nexo.inventory.lpns.view`;
2. el ciclo LPN continúa parcial y no alcanzable de extremo a extremo;
3. el catálogo activo contiene `nexo.inventory.lpns.view`, pero no contiene capacidades atómicas activas suficientes para las mutaciones de lifecycle;
4. LPN y contenedor físico deben permanecer como identidades distintas y no pueden compartir autoridad por inferencia.

La presente tarea consume esos hallazgos sin reabrir la auditoría de activos, mantenimiento, conteos o impresión reservada a tareas posteriores.

#### 3. Entradas canónicas preservadas

La protección consume sin redefinir:

- `NEXO-DOM-002`, que define LPN como identidad logística estable y distinta de LOC, producto, lote, remisión, movimiento y contenedor físico;
- `NEXO-DOM-003`, que fija los estados `DRAFT`, `ACTIVE`, `CLOSED`, `CANCELLED` y `VOID`;
- la máquina de estados y las precondiciones de creación, activación, cierre, anulación y reetiquetado;
- `nexo.inventory.lpns.view` como única `PermissionKey` activa observada cuyo recurso canónico es `LPN`;
- el catálogo activo de 67 permisos NEXO observado;
- los contratos vigentes de modalidad, scope, territorio, recurso, actor efectivo, dispositivo compartido, simulación, idempotencia, concurrencia y auditoría;
- la regla transversal de autorización server-side antes de toda mutación;
- la topología `PER_IMPLEMENTATION_UNIT / POST_E5_PACKAGE`;
- el principio de que una capacidad inexistente no se fabrica con un alias, helper o permiso más amplio.

#### 4. Topología y materialización futura

El marcador global usa:

```text
mode = PER_IMPLEMENTATION_UNIT
execution_gate = POST_E5_PACKAGE
```

La identidad física futura sigue el patrón:

```text
NEXO-AUTH-022::<implementation_unit_id>
```

Cada materialización física deberá corresponder a una unidad asignada y no podrá iniciarse únicamente porque este contrato documental esté aprobado.

El package propietario aplicable deberá haber superado:

```text
E5-GATE-008::<package_id> = PASS
```

y la instancia conservará autorización física explícita.

#### 5. Resultado contractual

La tarea fija las siguientes decisiones:

1. toda lectura LPN usa la capacidad canónica existente `nexo.inventory.lpns.view`;
2. autenticación sin autorización específica no basta para leer LPN;
3. una capacidad de lectura nunca autoriza una mutación;
4. ninguna mutación LPN se autoriza mediante `inventory.stock`;
5. ninguna mutación LPN se autoriza mediante `nexo.inventory.lpns.view`;
6. ninguna mutación LPN se autoriza mediante `nexo.inventory.location_assignments.assign`;
7. crear, actualizar, activar, cerrar, anular y reetiquetar se evalúan como acciones distintas;
8. la activación se protege explícitamente aunque el título de la tarea la agrupe dentro del lifecycle;
9. si la acción mutadora no dispone de una `PermissionKey` activa exacta, el resultado actual es `DEFAULT_DENY`;
10. no se infieren modalidad, scope ni grants para una capacidad inexistente;
11. el estado del recurso se resuelve de nuevo en servidor antes del efecto;
12. las transiciones se validan contra `NEXO-DOM-003`;
13. las mutaciones validan revisión esperada;
14. los reintentos conservan idempotencia;
15. ninguna transición borra identidad o historia;
16. reetiquetar no crea un LPN nuevo;
17. el contenido se mantiene fuera del alcance de 022 y pasa a 023;
18. custodia, préstamo y devolución no se absorben en esta tarea;
19. imprimir o reimprimir no se confunde con reetiquetar;
20. las futuras capacidades exactas deberán existir primero en el catálogo compartido antes de poder producir `ALLOW`.

#### 6. Capacidad de lectura vigente

La lectura de un LPN utiliza exclusivamente:

```text
nexo.inventory.lpns.view
```

Su semántica canónica permanece:

```text
resource_type = LPN
resource_locator = lpn_id o filtro
territory_resolver = LPN_TERRITORY
authorization_requirement = BASE_OR_OPERATIONAL
```

El custodio o actor relacionado con el LPN no adquiere autoridad automática por esa relación.

#### 7. Scope de lectura

La lectura conserva los scopes ya aprobados para `nexo.inventory.lpns.view`:

```text
G(B)
AS
SS
AST
TST
AA
SA
AAT
ATW
CTX(O)
```

El máximo administrativo es `G(B)` bajo el contrato vigente.

La lectura operativa usa el contexto operativo real y no convierte `CTX(O)` en autoridad global.

Si el LPN cambió de territorio, una lectura histórica usa el territorio histórico aplicable y una lectura vigente usa el territorio real vigente del recurso.

#### 8. Prerrequisitos de lectura

Por ser `BASE_OR_OPERATIONAL`, la lectura admite dos carriles completos e independientes:

```text
CARRIL BASE COMPLETO
→ PUEDE AUTORIZAR
```

```text
CARRIL OPERATIVO COMPLETO
→ PUEDE AUTORIZAR
```

```text
MEZCLA DE COMPONENTES DE AMBOS CARRILES
→ NO AUTORIZA
```

El carril operativo conserva turno y check-in cuando el contrato vigente los exige.

La existencia de una sesión autenticada no sustituye ninguno de estos carriles.

#### 9. Corrección contractual del endpoint LPN observado

El endpoint observado:

```text
GET /api/inventory/lpns
```

debe converger a una evaluación server-side que resuelva como mínimo:

```text
PRINCIPAL
+ ACTOR EFECTIVO
+ nexo.access
+ nexo.inventory.lpns.view
+ CARRIL
+ SCOPE
+ TERRITORIO
+ FILTRO O RECURSO
→ CONJUNTO AUTORIZADO
```

La consulta no puede leer primero un universo amplio y confiar en que la interfaz o el cliente oculte filas después.

Paginación, búsqueda y ordenamiento deben preservar el conjunto autorizado.

#### 10. Autenticación no equivale a autorización

Se fija:

```text
AUTHENTICATED USER
!=
AUTHORIZED LPN READER
```

y también:

```text
AUTHORIZED LPN READER
!=
AUTHORIZED LPN MUTATOR
```

Una sesión válida únicamente establece identidad técnica o humana suficiente para continuar la evaluación.

#### 11. Estado actual de las mutaciones LPN

El catálogo activo observado no contiene `PermissionKey` atómicas exactas para:

- crear LPN;
- actualizar LPN;
- activar LPN;
- cerrar LPN;
- anular LPN;
- reetiquetar LPN.

No se crea un identificador nuevo dentro de este marcador global.

La consecuencia autorizante actual es:

```text
NO EXACT ACTIVE PermissionKey
→ NO VALID MODALITY TO INFER
→ NO VALID SCOPE TO INFER
→ NO VALID GRANT TO INFER
→ DEFAULT_DENY
```

#### 12. Prohibición de reutilizar permisos existentes

No autorizan las mutaciones anteriores:

```text
nexo.access
nexo.inventory.lpns.view
nexo.inventory.stock.view
nexo.inventory.location_assignments.assign
inventory.stock
rol base
rol operativo por nombre
propiedad del LPN
custodia del LPN
sede seleccionada
URL conocida
botón visible
formulario visible
```

Una capacidad solo puede autorizar la acción para la que su contrato la define.

#### 13. Matriz de acción y decisión bajo el catálogo actual

| Estado actual | Acción | Estado o efecto esperado | Capacidad activa exacta observada | Decisión actual |
| --- | --- | --- | --- | --- |
| cualquiera legible | consultar | sin transición | `nexo.inventory.lpns.view` | evaluar capacidad, scope y recurso |
| inexistente | crear | `DRAFT` | ninguna exacta | `DEFAULT_DENY` |
| `DRAFT` | actualizar campos permitidos | `DRAFT` | ninguna exacta | `DEFAULT_DENY` |
| `DRAFT` | activar | `ACTIVE` | ninguna exacta | `DEFAULT_DENY` |
| `ACTIVE` | actualizar campos permitidos | `ACTIVE` | ninguna exacta | `DEFAULT_DENY` |
| `ACTIVE` | cerrar | `CLOSED` | ninguna exacta | `DEFAULT_DENY` |
| `DRAFT` | anular | `CANCELLED` | ninguna exacta | `DEFAULT_DENY` |
| `ACTIVE` | anular | `VOID` | ninguna exacta | `DEFAULT_DENY` |
| `CLOSED` | anular excepcionalmente | `VOID` | ninguna exacta | `DEFAULT_DENY` |
| `DRAFT` | reetiquetar | conserva `DRAFT` | ninguna exacta | `DEFAULT_DENY` |
| `ACTIVE` | reetiquetar | conserva `ACTIVE` | ninguna exacta | `DEFAULT_DENY` |
| `CLOSED` | reetiquetar para evidencia controlada | conserva `CLOSED` | ninguna exacta | `DEFAULT_DENY` |

La tabla no crea nuevas `PermissionKey`; registra el comportamiento autorizado por el catálogo vigente.

#### 14. Activación protegida explícitamente

`NEXO-DOM-003` define:

```text
DRAFT -> ACTIVE
```

como una transición real.

Aunque el título de 022 resume el frente como creación, actualización, cierre, anulación y reetiquetado, la activación no puede esconderse dentro de una escritura genérica.

La activación debe recibir una decisión de autorización propia antes del efecto y debe validar las precondiciones de dominio aplicables.

Mientras no exista capacidad exacta activa para autorizarla:

```text
ACTIVATE
→ DEFAULT_DENY
```

#### 15. Protección de creación

Una futura creación autorizable deberá resolver, además de la capacidad exacta que llegue a existir:

- identidad nueva;
- código correlacionable;
- sede o contexto inicial permitido;
- purpose type válido;
- actor efectivo;
- carril completo;
- territorio;
- origen de la intención;
- correlación;
- idempotencia;
- revisión inicial;
- ausencia de denegaciones.

La creación produce:

```text
NEW LPN
→ DRAFT
```

y no produce por sí sola contenido, stock, movimiento, ubicación confirmada, custodia, remisión ni disponibilidad.

#### 16. Idempotencia de creación

Una misma intención reintentada no puede crear dos identidades.

```text
SAME IDEMPOTENCY ID
+ SAME VALID CREATION INTENT
→ SAME LOGICAL LPN CREATION
```

Un timeout de cliente no autoriza una segunda identidad.

Una intención materialmente diferente requiere una nueva identidad de operación y vuelve a pasar autorización completa.

#### 17. Protección de actualización

`actualizar` no significa escritura libre sobre una fila LPN.

Una futura actualización autorizable deberá:

1. resolver el LPN vigente;
2. verificar estado y revisión;
3. identificar exactamente los campos propuestos;
4. rechazar columnas fuera de la allowlist contractual;
5. conservar `lpn_id`;
6. no convertir un cambio de estado en un `UPDATE` genérico;
7. no cambiar contenido;
8. no mover inventario;
9. no transferir custodia;
10. no ejecutar impresión;
11. no modificar contenedor físico por implicación;
12. conservar historia cuando el dato sea versionado.

Mientras no exista capacidad exacta activa para esa mutación:

```text
UPDATE
→ DEFAULT_DENY
```

#### 18. Campos que no pueden escribirse por actualización genérica

Una actualización genérica no puede alterar por escritura directa:

- `lpn_id`;
- lifecycle state;
- lifecycle revision;
- historial de lifecycle;
- identidad del contenido;
- cantidades contenidas;
- ubicación efectiva;
- movimiento;
- custodia;
- identidad de contenedor físico;
- evidencias históricas;
- auditoría;
- estado de remisión;
- estado de viaje.

Cada responsabilidad conserva su contrato propietario.

#### 19. Cambio de purpose type

`NEXO-DOM-003` permite cambios de purpose type únicamente bajo condiciones de dominio y con historia.

Por tanto, un cambio de propósito no puede ejecutarse como una edición silenciosa de texto o enum.

Una futura autorización deberá comprobar:

```text
LPN VIGENTE
+ ESTADO COMPATIBLE
+ PURPOSE ACTUAL
+ PURPOSE PROPUESTO
+ CONDICIONES DE SALIDA DEL PURPOSE ACTUAL
+ CONDICIONES DEL PURPOSE NUEVO
+ REVISION ESPERADA
+ CAPACIDAD EXACTA
+ ACTOR Y TERRITORIO
→ CAMBIO AUTORIZABLE
```

Mientras la capacidad mutadora exacta no exista, el cambio permanece `DEFAULT_DENY`.

#### 20. Protección de cierre

El cierre solo es semánticamente válido como:

```text
ACTIVE -> CLOSED
```

y debe revalidar las precondiciones de `NEXO-DOM-003`, incluyendo que el cierre no oculte trabajo operativo pendiente.

Una capacidad de lectura, stock, ubicación o impresión no concede cierre.

El cierre:

- conserva identidad;
- conserva código;
- conserva historia;
- bloquea mutación operativa ordinaria;
- no borra contenido;
- no ejecuta movimientos compensatorios por sí solo;
- no cierra remisiones por implicación.

Sin capacidad exacta activa:

```text
CLOSE
→ DEFAULT_DENY
```

#### 21. Anulación antes de la primera activación

La anulación preactivación corresponde exclusivamente a:

```text
DRAFT
+ NEVER ACTIVE
→ CANCELLED
```

Debe preservar identidad, actor, razón, instante y correlación.

No puede utilizarse para ocultar un efecto real ya producido.

Sin capacidad exacta activa:

```text
ANNUL DRAFT
→ DEFAULT_DENY
```

#### 22. Anulación posterior a activación

Para un LPN que ya fue activo, la anulación corresponde a:

```text
ACTIVE -> VOID
```

o, excepcionalmente:

```text
CLOSED -> VOID
```

La transición exige preservar historia y reconciliar efectos dependientes sin borrarlos.

La anulación no puede:

- eliminar movimientos;
- poner cantidades a cero silenciosamente;
- revertir remisiones automáticamente;
- borrar custodias;
- fabricar un LPN sustituto;
- reabrir la identidad;
- reutilizar el código.

Sin capacidad exacta activa:

```text
ANNUL ACTIVE OR CLOSED
→ DEFAULT_DENY
```

#### 23. Reetiquetado

Reetiquetar es un evento sobre la representación física de una identidad ya existente.

```text
RELABEL
!=
NEW LPN
```

```text
STATE BEFORE RELABEL
=
STATE AFTER RELABEL
```

La operación debe conservar:

- `lpn_id`;
- lifecycle state;
- revisión coherente;
- relación con emisiones anteriores;
- actor;
- motivo cuando aplique;
- instante;
- correlación;
- evidencia de la nueva emisión cuando exista.

Sin capacidad exacta activa:

```text
RELABEL
→ DEFAULT_DENY
```

#### 24. Reetiquetado no equivale a impresión o reimpresión

022 gobierna la autoridad empresarial para que una identidad LPN pueda ser reetiquetada.

`NEXO-AUTH-028` gobierna la autorización atómica de impresión y reimpresión.

Por tanto:

```text
RELABEL AUTHORIZED
!=
PRINT AUTHORIZED
```

y:

```text
PRINT AUTHORIZED
!=
LPN IDENTITY MAY CHANGE
```

Una futura operación puede requerir ambas decisiones, pero una nunca sustituye a la otra.

#### 25. Máquina de estados preservada

022 no redefine la máquina de estados de `NEXO-DOM-003`.

Se conserva:

```text
CREATE -> DRAFT
DRAFT -> ACTIVE
DRAFT -> CANCELLED
ACTIVE -> CLOSED
ACTIVE -> VOID
CLOSED -> VOID
```

No se autoriza:

```text
CANCELLED -> ACTIVE
VOID -> ACTIVE
CLOSED -> ACTIVE
```

Una operación prohibida por dominio sigue prohibida aunque un actor tenga una capacidad mutadora futura.

#### 26. Orden de evaluación

Toda mutación física futura deberá evaluar en este orden lógico:

1. resolver principal y actor efectivo;
2. resolver disponibilidad del carril aplicable;
3. comprobar existencia de la capacidad exacta activa;
4. resolver grants y denegaciones;
5. resolver recurso o borrador;
6. resolver territorio;
7. leer estado y revisión vigentes;
8. comprobar transición o campo permitido;
9. comprobar precondiciones de dominio;
10. comprobar idempotencia;
11. comprobar concurrencia;
12. autorizar;
13. ejecutar efecto;
14. registrar evidencia;
15. devolver el estado realmente persistido.

Una etapa posterior no puede compensar una denegación anterior.

#### 27. Prohibición de inferir modalidad, scope o grants

Para las mutaciones sin `PermissionKey` activa exacta no existe autoridad para inventar:

- `BASE_ONLY`;
- `OPERATIONAL_ONLY`;
- `BASE_OR_OPERATIONAL`;
- scopes;
- roles;
- grants;
- excepciones;
- política de dispositivo;
- requisitos de reautenticación.

Hasta que esos elementos aparezcan en el catálogo canónico correspondiente:

```text
DEFAULT_DENY
```

022 no rellena el hueco con una decisión local de `vento-nexo`.

#### 28. Alta futura de capacidades exactas

Si una materialización futura necesita una capacidad que el catálogo aún no contiene, esa capacidad deberá existir primero como identidad canónica aprobada en la fuente compartida de autorización.

La incorporación deberá mantener coherencia con:

- catálogo de PermissionKey;
- descripción canónica;
- modalidad;
- scope;
- recurso;
- prerrequisitos;
- grants base;
- grants operativos;
- denegaciones;
- dispositivo compartido;
- simulación;
- contratos compartidos;
- persistencia o migración aplicable;
- pruebas de autorización.

No se permite crear una clave solo dentro de `vento-nexo` para desbloquear la implementación.

#### 29. Decisión server-side

Toda lectura o mutación LPN protegida debe decidirse del lado servidor antes de acceder a datos sensibles o producir un efecto.

No son oráculos de autorización:

- estado de un botón;
- componente oculto;
- validación cliente;
- cookie no verificada;
- query string;
- campo hidden;
- middleware de navegación por sí solo;
- respuesta previa;
- rol visual;
- código LPN escaneado.

Una llamada directa debe recibir la misma decisión que la interfaz ordinaria.

#### 30. Recurso actual, no copia del cliente

Para una acción sobre LPN existente, el servidor vuelve a resolver el recurso autoritativo.

El cliente puede aportar un localizador y una intención, pero no una verdad autorizante.

Se valida como mínimo:

```text
lpn_id
+ current lifecycle state
+ current revision
+ current purpose type
+ current territory
+ proposed action
```

según aplicabilidad.

#### 31. Territorio

La autorización debe evaluar el territorio del LPN, no únicamente la sede seleccionada en la UI.

Para lectura vigente se usa el territorio vigente.

Para evidencia histórica se usa el territorio correspondiente al snapshot histórico cuando el contrato lo requiera.

Para una mutación que pueda cambiar una relación territorial, la decisión debe proteger el recurso actual y la relación propuesta según el owner de movimiento o ubicación.

022 no concede por sí misma traslado de contenido ni custodia.

#### 32. Principal, actor y dispositivo

Se distinguen siempre:

```text
PRINCIPAL TECNICO
ACTOR EFECTIVO
DISPOSITIVO
ROL BASE
ROL OPERATIVO
```

En un dispositivo compartido, el dispositivo restringe la operación pero no crea la capacidad.

El actor humano efectivo debe estar identificado y autorizado.

Una sesión de dispositivo no permite reutilizar la autoridad del usuario anterior.

#### 33. Simulación

Una decisión simulada nunca ejecuta una transición real de LPN.

```text
SIMULATED ALLOW
!=
REAL AUTHORITY
```

La simulación puede evaluar qué ocurriría bajo el contrato autorizado, pero no puede:

- crear LPN;
- activar;
- actualizar;
- cerrar;
- anular;
- reetiquetar;
- imprimir;
- modificar grants;
- cambiar estado físico.

La transición real vuelve a evaluar con autoridad real.

#### 34. Revisión y concurrencia

Toda mutación futura que cambie estado, purpose type o datos protegidos debe comprobar:

```text
EXPECTED_REVISION = CURRENT_REVISION
```

Si la revisión no coincide:

```text
NO EFFECT
+ REFRESH OR RECONCILE
```

No se usa last-write-wins silencioso para resolver dos decisiones concurrentes sobre la misma identidad.

#### 35. Idempotencia de transiciones

El replay de una misma intención aceptada:

- no crea un segundo evento lógico;
- no incrementa dos veces la revisión;
- no duplica una emisión;
- no duplica una compensación;
- no duplica un movimiento derivado;
- no cambia el resultado por haber sido reintentado.

Una nueva intención incompatible con el estado vigente se rechaza.

#### 36. Operación offline

Una intención capturada offline no es una transición canónica.

Al sincronizar se debe:

1. recuperar estado actual;
2. recuperar revisión actual;
3. revalidar actor y capacidad;
4. revalidar territorio;
5. revalidar precondiciones;
6. aplicar idempotencia;
7. aceptar o denegar;
8. conservar evidencia del resultado.

La antigüedad de la captura no obliga al servidor a aceptar una transición ya inválida.

#### 37. Auditoría mínima

Toda acción LPN aceptada o denegada debe poder correlacionar, según aplicabilidad:

- `lpn_id` o borrador de creación;
- acción solicitada;
- estado anterior;
- estado resultante;
- revisión anterior;
- revisión resultante;
- purpose type;
- principal;
- actor efectivo;
- carril;
- rol aplicable;
- sede;
- área cuando aplique;
- dispositivo;
- permiso evaluado;
- scope;
- recurso;
- decisión;
- razones;
- idempotencia;
- correlación;
- instante de servidor;
- resultado del efecto;
- referencias de reconciliación cuando existan.

No se exige que esos sean nombres físicos de columnas.

#### 38. Errores seguros

Una denegación no debe revelar más información de la necesaria sobre un LPN fuera de scope.

Se debe distinguir internamente:

- no autenticado;
- no autorizado;
- recurso inexistente;
- recurso fuera de scope;
- estado incompatible;
- revisión obsoleta;
- precondición incumplida;
- conflicto;
- error técnico.

La respuesta pública puede minimizar detalle conforme al contrato transversal sin convertir fallos técnicos en `ALLOW`.

#### 39. RLS, RPC y autorización de aplicación

RLS, RPC o funciones backend pueden reforzar la protección, pero no sustituyen por sí solas la decisión de aplicación que exige una capacidad exacta.

A la inversa, una decisión de aplicación no puede saltar políticas de datos obligatorias.

La equivalencia objetivo es:

```text
APP AUTHORIZATION
+
BACKEND DATA POLICY
→ MISMA FRONTERA DE AUTORIDAD
```

Cualquier cambio VENTO de Supabase pertenece a `vento-group-sas/vento-shell`.

#### 40. Efecto atómico

Una acción autorizada debe producir:

```text
AUTHORIZED
→ EFFECT COMMITTED COHERENTLY
```

o:

```text
FAILURE
→ NO FALSE SUCCESS
```

No se acepta:

- estado cambiado sin evento;
- evento sin estado;
- nueva etiqueta sin correlación;
- cierre parcial;
- anulación que deje referencias imposibles;
- doble creación por timeout;
- revisión incrementada sin efecto empresarial coherente.

El mecanismo físico final pertenece a la unidad de implementación y contratos de datos aplicables.

#### 41. Frontera con contenido y `NEXO-AUTH-023`

022 no autoriza:

- empacar;
- desempacar;
- dividir;
- unir;
- transferir contenido;
- anidar LPN;
- desanidar LPN;
- mover contenido entre LPN.

Esas acciones pertenecen a `NEXO-AUTH-023`.

Una capacidad futura de lifecycle no podrá reutilizarse para mutar contenido.

#### 42. Frontera con ubicación y custodia

La creación o actualización del lifecycle no concede por sí sola:

- putaway;
- traslado;
- cambio de LOC;
- cambio de posición;
- cambio de custodio;
- préstamo;
- devolución;
- transferencia de custodia.

Las operaciones aplicables permanecen en los contratos de ubicación, movimientos y `NEXO-AUTH-025`.

#### 43. Frontera con contenedor físico

Un LPN y un contenedor físico conservan identidades distintas.

Por tanto una autorización LPN:

- no crea un contenedor;
- no da de baja un contenedor;
- no transfiere su custodia;
- no modifica su condición;
- no cierra su ciclo de retorno;
- no convierte un contenedor en LPN.

Cuando una operación futura vincule ambos objetos, deberá autorizar cada responsabilidad aplicable sin alias permisivo.

#### 44. Frontera con impresión

022 protege la decisión de lifecycle y el evento empresarial de reetiquetado.

`NEXO-AUTH-028` protege impresión y reimpresión.

La visualización u obtención local de un QR no concede reetiquetado.

La autorización de reetiquetado no concede acceso general a plantillas ni trabajos de impresión.

#### 45. Frontera con permisos legacy

`NEXO-AUTH-029` conserva la responsabilidad de retirar:

- `inventory.stock` como autoridad final;
- aliases legacy;
- helpers amplios;
- fallbacks de permiso;
- rutas paralelas de autorización.

022 prohíbe depender de ellos, pero no declara su retiro físico completado.

#### 46. Frontera con certificación integral

`NEXO-AUTH-030` probará integralmente el subdominio después de materializar 022–029.

Un PASS documental de 022 no significa:

```text
LPN AUTHORIZATION PHYSICALLY CERTIFIED
```

La certificación posterior debe demostrar allow, deny, scope, estado, concurrencia, idempotencia, dispositivo, simulación, offline, API directa y ausencia de efectos no autorizados.

#### 47. Condiciones para cerrar los hallazgos recibidos

| Hallazgo de 021 | Resultado contractual de 022 | Cierre físico |
| --- | --- | --- |
| endpoint LPN autenticado sin permiso explícito | lectura exige `nexo.inventory.lpns.view` en servidor | pendiente de unidad física |
| ciclo LPN no alcanzable | lifecycle protegido por acción y estado; no se confunde infraestructura con autorización | sigue dependiendo de materialización funcional |
| mutaciones sin permisos atómicos | `DEFAULT_DENY` hasta capacidad exacta activa | pendiente de catálogo y unidad física |
| contenedor sin familia propia | se prohíbe heredar autoridad LPN hacia contenedor | continúa en tareas propietarias posteriores |

022 cierra el contrato de protección, no las materializaciones pendientes.

#### 48. Gate de una futura capacidad mutadora

Una capacidad LPN mutadora solo podrá utilizarse cuando pueda demostrarse conjuntamente:

```text
IDENTIDAD CANÓNICA ACTIVA
+ DESCRIPCIÓN CANÓNICA
+ MODALIDAD DEFINIDA
+ SCOPE DEFINIDO
+ RECURSO DEFINIDO
+ PRERREQUISITOS DEFINIDOS
+ GRANTS DEFINIDOS
+ DENEGACIONES DEFINIDAS
+ POLÍTICA DE DISPOSITIVO
+ POLÍTICA DE SIMULACIÓN
+ CONSUMIDOR COMPATIBLE
+ BACKEND COMPATIBLE
+ PRUEBAS
```

La ausencia de cualquiera de esas piezas no se rellena desde el consumidor.

#### 49. Rollback de materialización futura

El rollback de una unidad física:

- solo puede volver a una combinación previamente certificada;
- no puede reactivar una autoridad legacy más permisiva;
- no puede convertir `DEFAULT_DENY` en permiso temporal;
- debe conservar historia y evidencia;
- debe mantener compatibles catálogo, consumidor, backend y datos;
- no puede borrar eventos de lifecycle ya confirmados.

Si no existe combinación previa segura, se bloquea la mutación y se corrige hacia adelante.

#### 50. Requisitos de prueba derivados

**Resultado:** NO GENERA REQUISITOS DE PRUEBA.

**Requisitos creados:** 0
**Requisitos modificados:** 0
**Requisitos diferidos:** 0
**Requisitos obsoletos:** 0

Justificación:

- el ciclo auditable completo de LPN ya está cubierto por requisitos vigentes;
- autorización exacta y validación server-side ya cuentan con cobertura transversal;
- idempotencia, concurrencia, no doble contabilización, custodia y trazabilidad ya están protegidas;
- esta tarea especializa el contrato de autorización y no introduce una obligación de prueba independiente;
- crear un requisito nuevo duplicaría obligaciones existentes.

#### 51. Cobertura de prueba vigente reutilizada

Sin modificar el registro se reutiliza:

- `TREQ-NEXO-004` para creación, contenido, ubicación, movimiento, custodia, cierre, anulación y reetiquetado por actor autorizado;
- `TREQ-NEXO-011` para atomicidad, idempotencia, concurrencia, movimientos y no doble contabilización;
- `TREQ-NEXO-016` para separación entre LPN, contenedor, custodia, transporte, entrega y recepción;
- `TREQ-NEXO-046` para separación entre LPN y contenedor físico;
- `TREQ-NEXO-047` para comportamiento explícito de LPN y contenedores sin duplicar representación;
- `TREQ-AUTH-001` para autorización mediante permiso, contexto y scope canónicos;
- `TREQ-AUTH-013` para autorización server-side exacta frente a URL, formulario, API o RPC manipulada.

Estas referencias son trazabilidad reutilizada, no una modificación de 04A.

#### 52. Evidencia de validación

| Clase | Estado | Evidencia |
| --- | --- | --- |
| BUILD | NOT_EXECUTED | el marcador global no materializa código; build y suites pertenecen a la incorporación local y a las futuras unidades físicas |
| LOCAL | NOT_EXECUTED | la inserción, normalización, quality y batería documental quedan para el checkout local al incorporar la tarea |
| REMOTA | PASS | se verificaron `vento-shell` main con `NEXO-AUTH-020` cerrado, `vento-nexo` vigente, owner del minibloque, topología, `NEXO-DOM-002/003`, catálogo activo de 67 permisos NEXO, `nexo.inventory.lpns.view`, contratos de scope/recurso y el artefacto aprobado de `NEXO-AUTH-021` |
| OPERATIVA | NOT_EXECUTED | no se ejecutó creación, actualización, activación, cierre, anulación ni reetiquetado de LPN en un ambiente operativo |
| FÍSICA | NOT_EXECUTED | no existe materialización `NEXO-AUTH-022::<implementation_unit_id>` ejecutada desde este marcador documental |

#### 53. Criterios de aceptación

- [x] la lectura LPN queda vinculada a `nexo.inventory.lpns.view`;
- [x] autenticación sola queda explícitamente insuficiente;
- [x] lectura y mutación quedan separadas;
- [x] se preserva la máquina de estados de `NEXO-DOM-003`;
- [x] la activación queda protegida como transición propia;
- [x] crear, actualizar, cerrar, anular y reetiquetar no reutilizan `lpns.view`;
- [x] no se reutiliza `inventory.stock` como autoridad;
- [x] no se reutiliza `location_assignments.assign` como lifecycle permission;
- [x] las mutaciones sin capacidad exacta activa quedan en `DEFAULT_DENY`;
- [x] no se inventan nombres de PermissionKey faltantes;
- [x] no se inventan modalidad, scope ni grants faltantes;
- [x] se exige autorización server-side;
- [x] se exige estado y revisión vigentes;
- [x] se preservan idempotencia y concurrencia;
- [x] se preserva identidad durante cierre, anulación y reetiquetado;
- [x] reetiquetado e impresión quedan separados;
- [x] contenido queda reservado a `NEXO-AUTH-023`;
- [x] custodia queda reservada a su tarea propietaria;
- [x] retiro legacy queda reservado a `NEXO-AUTH-029`;
- [x] certificación integral queda reservada a `NEXO-AUTH-030`;
- [x] no se modifica Supabase;
- [x] no se modifican TREQ;
- [x] no se modifica 04A;
- [x] la materialización futura conserva `PER_IMPLEMENTATION_UNIT / POST_E5_PACKAGE`.

#### 54. Límites

Esta tarea no:

- inventa nuevas `PermissionKey`;
- modifica las 67 identidades activas NEXO;
- modifica grants base u operativos;
- decide una modalidad inexistente;
- decide un scope inexistente;
- materializa `GET /api/inventory/lpns`;
- crea POST, PATCH o DELETE para LPN;
- implementa `LpnCreateForm`;
- crea Server Actions;
- crea RPC;
- modifica RLS;
- modifica `inventory_lpns`;
- modifica `inventory_lpn_items`;
- crea migraciones;
- modifica datos;
- crea etiquetas;
- imprime;
- modifica contenido LPN;
- empaca o desempaca;
- divide o une;
- transfiere contenido;
- modifica custodia;
- modifica contenedores físicos;
- retira helpers legacy;
- ejecuta pruebas integrales;
- autoriza una instancia física;
- crea ni modifica requisitos de prueba;
- modifica el registro 04A;
- desarrolla `NEXO-AUTH-023`.

#### 55. Continuidad

**ÚLTIMA TAREA APROBADA**
`NEXO-AUTH-021 — Auditar permisos actuales de LPN, activos y contenedores`

**TAREA ACTUAL APROBADA**
`NEXO-AUTH-022 — Proteger creación, actualización, cierre, anulación y reetiquetado de LPN`

**SIGUIENTE TAREA RESERVADA**
`NEXO-AUTH-023 — Proteger empaque, desempaque, división, unión y transferencia`

### ✅ NEXO-AUTH-023 — Proteger empaque, desempaque, división, unión y transferencia

**Estado:** APROBADA
**Tarea anterior:** NEXO-AUTH-022 — Proteger creación, actualización, cierre, anulación y reetiquetado de LPN
**Tarea siguiente:** NEXO-AUTH-024 — Proteger consulta y administración de activos y reutilizables
**Tipo de tarea:** Contrato global con materialización por unidad (`PER_IMPLEMENTATION_UNIT`) y gate físico `POST_E5_PACKAGE` — contrato NEXO para proteger mutaciones de contenido y membresía LPN mediante decisiones independientes de empaque, desempaque, división, unión y transferencia de contenido, con autorización server-side exacta, `DEFAULT_DENY` ante ausencia de `PermissionKey` atómica activa, conservación de cantidad e identidad, lineage, territorio, revisiones, atomicidad, idempotencia, concurrencia y fronteras estrictas con lifecycle, movimientos, ubicación, custodia y contenedores físicos
**Bloque:** BLOQUE K — NEXO
**Repositorio propietario:** `vento-group-sas/vento-shell`
**Archivo propietario:** `docs/plan-canonico/modular/bloques/K_NEXO/03_AUTORIZACION_DE_INVENTARIO_LOGISTICA_Y_ACTIVOS.md`
**Estado físico resultante:** `ESPECIFICADO_NO_MATERIALIZADO`
**Cambios físicos autorizados:** 0 durante el marcador global; las futuras materializaciones ocurren únicamente mediante `NEXO-AUTH-023::<implementation_unit_id>` después de que la unidad y su package propietario estén asignados, `E5-GATE-008::<package_id>` aplicable haya resultado `PASS` y exista autorización física explícita
**Requisitos de prueba creados o modificados:** 0

---

#### 1. Propósito

Proteger toda mutación autoritativa del contenido de un LPN para que empacar, desempacar, dividir, unir o transferir contenido no pueda ejecutarse por autenticación sola, lectura del LPN, acceso a stock, conocimiento de una URL, pertenencia a una sede, posesión física del contenido, rol nominal, permiso legacy amplio ni reutilización de una capacidad de traslado con un recurso distinto.

La regla raíz queda:

```text
ACTOR EFECTIVO
+ ACCIÓN DE CONTENIDO LPN EXACTA
+ CAPACIDAD CANÓNICA EXACTA CUANDO EXISTA
+ CARRIL AUTORIZANTE COMPLETO
+ RECURSO FUENTE AUTORITATIVO
+ LPN ORIGEN O DESTINO SEGÚN APLIQUE
+ TERRITORIO Y CONTEXTO VIGENTES
+ LIFECYCLE COMPATIBLE
+ REVISIONES VIGENTES
+ CONTENIDO ELEGIBLE
+ DIMENSIONES Y TRAZABILIDAD CONSERVADAS
+ CAPACIDAD Y COMPATIBILIDAD CUANDO APLIQUEN
+ DENEGACIONES AUSENTES
+ IDEMPOTENCIA Y CONCURRENCIA
+ EFECTO ATÓMICO RECONCILIABLE
→ ACCIÓN AUTORIZABLE
```

Y mientras no exista una capacidad exacta activa para la mutación:

```text
MUTACIÓN DE MEMBRESÍA LPN SIN PermissionKey ACTIVA EXACTA
→ DEFAULT_DENY
```

#### 2. Handoff recibido de `NEXO-AUTH-022`

`NEXO-AUTH-022` entrega a esta tarea las siguientes decisiones cerradas:

- lifecycle LPN y contenido son responsabilidades distintas;
- `nexo.inventory.lpns.view` es una capacidad de lectura y nunca autoriza mutación;
- `inventory.stock` no puede convertirse en autoridad final;
- `nexo.inventory.location_assignments.assign` no autoriza lifecycle ni contenido;
- crear, actualizar, activar, cerrar, anular y reetiquetar permanecen fuera de 023;
- toda mutación sin `PermissionKey` exacta activa permanece en `DEFAULT_DENY`;
- la decisión real debe producirse en servidor;
- actor, territorio, estado, revisión, idempotencia y concurrencia deben revalidarse antes del efecto;
- custodia y transferencia de custodia permanecen fuera del alcance de contenido.

Esta tarea aplica la misma política fail-closed a las cinco mutaciones de contenido que 022 dejó expresamente reservadas.

#### 3. Entradas canónicas preservadas

La protección consume sin redefinir:

- `NEXO-DOM-004`, propietario de contenido, `PACK` y `UNPACK`;
- `NEXO-DOM-005`, propietario de `SPLIT_CONTENT`, `MERGE_CONTENT` y `TRANSFER_CONTENT`;
- `NEXO-DOM-006`, propietario de LPN anidados;
- `NEXO-DOM-007`, propietario de ubicación efectiva;
- `NEXO-DOM-021`, propietario de no doble contabilización;
- `NEXO-DOM-022`, propietario del movimiento atómico de un LPN completo y su cierre;
- `NEXO-DOM-023`, propietario de lote, serial, vencimiento y condición;
- `NEXO-DOM-024`, propietario de capacidad, peso, volumen y compatibilidad;
- las tres formas canónicas de contenido `QUANTITY_SLICE`, `SERIALIZED_IDENTITY` y `KIT_INSTANCE`;
- la separación entre LPN y `PHYSICAL_CONTAINER`;
- la prohibición de usar un LPN como contenido ordinario de otro;
- la fuente canónica de movimientos y proyecciones reconciliables;
- la regla de una sola representación autoritativa de la existencia.

#### 4. Topología y materialización futura

El marcador global usa:

```text
mode = PER_IMPLEMENTATION_UNIT
execution_gate = POST_E5_PACKAGE
```

La identidad física futura sigue:

```text
NEXO-AUTH-023::<implementation_unit_id>
```

La aprobación documental de este marcador no crea, autoriza ni ejecuta una instancia física.

Toda futura materialización requiere:

- `implementation_unit_id` asignado;
- package propietario aplicable;
- `E5-GATE-008::<package_id> = PASS` cuando corresponda;
- autorización física explícita;
- consumidor, contratos compartidos y backend compatibles;
- evidencia atribuible a la misma combinación material.

#### 5. Cinco decisiones de autorización

023 protege exactamente cinco decisiones empresariales:

```text
PACK
UNPACK
SPLIT_CONTENT
MERGE_CONTENT
TRANSFER_CONTENT
```

Estas cinco acciones son semánticamente distintas.

Una futura interfaz puede encadenarlas, pero ninguna decisión se absorbe silenciosamente dentro de otra.

La autorización debe poder negar una acción aunque otra resulte autorizable.

#### 6. Estado actual del catálogo de permisos

El catálogo activo observado de NEXO contiene 67 `PermissionKey`.

Entre las capacidades relacionadas se encuentran:

```text
nexo.inventory.lpns.view
nexo.inventory.stock.view
nexo.inventory.movements.view
nexo.inventory.location_assignments.assign
nexo.inventory.transfers.view
nexo.inventory.transfers.create
```

No se observó una `PermissionKey` activa exacta que autorice por contrato propio:

```text
PACK
UNPACK
SPLIT_CONTENT
MERGE_CONTENT
TRANSFER_CONTENT
```

La ausencia no autoriza a fabricar identidades locales en `vento-nexo`.

#### 7. Decisión autorizante bajo el catálogo actual

La matriz actual queda:

| Acción | `PermissionKey` activa exacta observada | Decisión autorizante actual |
| --- | --- | --- |
| `PACK` | ninguna | `DEFAULT_DENY` |
| `UNPACK` | ninguna | `DEFAULT_DENY` |
| `SPLIT_CONTENT` | ninguna | `DEFAULT_DENY` |
| `MERGE_CONTENT` | ninguna | `DEFAULT_DENY` |
| `TRANSFER_CONTENT` | ninguna | `DEFAULT_DENY` |

Esta tabla no crea nuevos permisos ni determina todavía nombres, modalidad, scope o grants futuros.

#### 8. `lpns.view` no autoriza contenido

Se fija:

```text
nexo.inventory.lpns.view
=
LECTURA DE LPN Y CONTENIDO AUTORIZADO
```

pero:

```text
nexo.inventory.lpns.view
!=
PACK
!=
UNPACK
!=
SPLIT_CONTENT
!=
MERGE_CONTENT
!=
TRANSFER_CONTENT
```

Poder consultar un LPN, su contenido, posición o custodia no concede autoridad de mutación.

#### 9. `stock.view` no autoriza contenido LPN

`nexo.inventory.stock.view` es una capacidad de lectura de posiciones de stock.

No autoriza:

- retirar existencia suelta hacia un LPN;
- restituir existencia desde LPN;
- dividir membresías;
- consolidar membresías;
- transferir contenido entre LPN.

Una proyección visible de stock no es una capacidad de escritura.

#### 10. `location_assignments.assign` no autoriza membresía

`nexo.inventory.location_assignments.assign` protege la asignación de una existencia, LPN o ítem a una ubicación concreta.

Su recurso es:

```text
LOCATION_ASSIGNMENT
```

No protege:

```text
LPN_CONTENT_MEMBERSHIP
```

Por tanto, una asignación de ubicación válida no concede `PACK`, `UNPACK`, `SPLIT_CONTENT`, `MERGE_CONTENT` ni `TRANSFER_CONTENT`.

#### 11. `transfers.create` no sustituye `TRANSFER_CONTENT`

`nexo.inventory.transfers.create` protege el recurso:

```text
INVENTORY_TRANSFER
```

con origen, destino, ítems y cantidades, y exige autorización sobre ambos extremos.

`TRANSFER_CONTENT` protege otra responsabilidad:

```text
LPN SOURCE MEMBERSHIP
→
LPN TARGET MEMBERSHIP
```

Por tanto:

```text
nexo.inventory.transfers.create
!=
AUTORIZACIÓN DE TRANSFER_CONTENT
```

Si una operación futura de contenido produce además un traslado canónico de inventario entre extremos físicos, el traslado deberá satisfacer su propia capacidad y contrato en adición a la autoridad específica de contenido LPN. Una capacidad no reemplaza a la otra.

#### 12. `movements.view` no autoriza mutación

`nexo.inventory.movements.view` permite consultar movimientos.

No autoriza producir un movimiento ni alterar membresía LPN.

La existencia de un evento consultable después de una operación válida no convierte el permiso de lectura en permiso de escritura.

#### 13. Permisos legacy amplios

No autorizan las cinco mutaciones:

```text
inventory.stock
nexo.access
permiso de lectura de LPN
permiso de lectura de stock
permiso de lectura de movimientos
permiso de lectura de traslados
rol base por nombre
rol operativo por nombre
cobertura administrativa
sede seleccionada
custodia actual
posesión física
código LPN escaneado
```

`NEXO-AUTH-029` conserva la responsabilidad de retirar los aliases, fallbacks y helpers amplios que todavía existan.

#### 14. Modalidad, scope y grants inexistentes no se infieren

Mientras una acción no posea `PermissionKey` activa exacta, 023 no inventa:

- `BASE_ONLY`;
- `OPERATIONAL_ONLY`;
- `BASE_OR_OPERATIONAL`;
- scope administrativo;
- scope operativo;
- grants por rol;
- denegaciones;
- política de dispositivo;
- reautenticación;
- clasificación de simulación.

La ausencia de esas piezas produce:

```text
DEFAULT_DENY
```

No se completa localmente un contrato compartido incompleto.

#### 15. Gate de futura capacidad exacta

Una capacidad de contenido LPN solo podrá producir `ALLOW` cuando pueda demostrarse conjuntamente:

```text
IDENTIDAD CANÓNICA ACTIVA
+ ACCIÓN CONTRACTUAL EXPLÍCITA
+ DESCRIPCIÓN CANÓNICA
+ MODALIDAD DEFINIDA
+ SCOPE DEFINIDO
+ RECURSO DEFINIDO
+ PRERREQUISITOS DEFINIDOS
+ GRANTS Y DENEGACIONES DEFINIDOS
+ POLÍTICA DE DISPOSITIVO
+ POLÍTICA DE SIMULACIÓN
+ CONSUMIDOR COMPATIBLE
+ BACKEND COMPATIBLE
+ PRUEBAS
```

Hasta entonces, la mutación permanece bloqueada.

#### 16. Recurso conceptual de `PACK`

`PACK` protege una intención compuesta por:

```text
SOURCE LOOSE CONTENT OR EXACT IDENTITY
+ TARGET LPN
+ CONTENT SHAPE
+ QUANTITY OR EXACT IDENTITY
+ INVENTORY DIMENSIONS
+ TARGET CONTENT REVISION
```

El cliente propone la intención.

El servidor vuelve a resolver origen, destino, contenido, estado y revisiones.

#### 17. Precondiciones autorizantes de `PACK`

Además de la futura capacidad exacta, un `PACK` real deberá comprobar:

1. LPN destino existente;
2. lifecycle `ACTIVE`;
3. revisión de lifecycle vigente cuando sea material;
4. revisión de contenido esperada vigente;
5. actor efectivo;
6. territorio del contenido y del LPN;
7. contenido elegible;
8. clase primaria conocida;
9. cantidad positiva o identidad exacta;
10. origen autoritativo suficiente;
11. dimensiones completas;
12. ausencia de membresía duplicada;
13. condición y liberación compatibles;
14. capacidad y compatibilidad cuando apliquen;
15. correlación;
16. idempotencia;
17. posibilidad de commit coherente sin doble contabilización.

Una condición de dominio fallida conserva `DENY` aunque el actor disponga de una capacidad futura.

#### 18. Efecto protegido de `PACK`

Una aceptación válida produce conceptualmente:

```text
LOOSE REPRESENTATION DECREASES OR CEASES
+
TARGET LPN MEMBERSHIP INCREASES OR STARTS
+
TOTAL PHYSICAL EXISTENCE IS CONSERVED
```

`PACK` no:

- crea producto;
- crea existencia;
- activa el LPN;
- cambia purpose type;
- mueve un LPN completo;
- transfiere custodia por inferencia;
- crea un contenedor físico.

#### 19. Contenido ya perteneciente a otro LPN

Si una cantidad o identidad pertenece autoritativamente a otro LPN:

```text
PACK FROM LOOSE STOCK
→ NOT APPLICABLE
```

La operación correcta es `TRANSFER_CONTENT` cuando sus precondiciones se satisfagan.

No se autoriza duplicar membresía empacando el mismo sujeto una segunda vez.

#### 20. Recurso conceptual de `UNPACK`

`UNPACK` protege:

```text
SOURCE LPN
+ AUTHORITATIVE SOURCE MEMBERSHIP
+ QUANTITY OR EXACT IDENTITY
+ DESTINATION LOOSE CONTEXT
+ SOURCE CONTENT REVISION
```

Desempaquetar no equivale a borrar una fila.

#### 21. Precondiciones autorizantes de `UNPACK`

Además de la futura capacidad exacta deberá verificarse:

1. LPN fuente existente;
2. lifecycle `ACTIVE`;
3. membresía autoritativa vigente;
4. cantidad suficiente o identidad exacta;
5. revisión de contenido vigente;
6. destino declarado y permitido;
7. actor efectivo autorizado;
8. territorio aplicable;
9. conservación de dimensiones;
10. compatibilidad de destino cuando aplique;
11. correlación;
12. idempotencia;
13. commit coherente del cambio de control.

#### 22. Efecto protegido de `UNPACK`

Una aceptación válida produce:

```text
SOURCE LPN MEMBERSHIP DECREASES OR CEASES
+
LOOSE REPRESENTATION APPEARS AT VALID DESTINATION
+
TOTAL PHYSICAL EXISTENCE IS CONSERVED
```

No se borra historia.

Un LPN que queda vacío no se cierra automáticamente.

#### 23. `UNPACK` no es transferencia entre LPN

Se fija:

```text
UNPACK TO LOOSE
!=
TRANSFER_CONTENT TO ANOTHER LPN
```

Está prohibido representar una sola intención empresarial de transferencia como:

```text
COMMITTED UNPACK
+
LATER INDEPENDENT PACK
```

porque introduce una ventana de pérdida, duplicación o autoridad divergente.

#### 24. Recurso conceptual de `SPLIT_CONTENT`

`SPLIT_CONTENT` opera dentro del mismo LPN sobre una membresía:

```text
QUANTITY_SLICE
```

y produce dos o más porciones hijas con la misma identidad dimensional.

No cambia por sí sola el LPN propietario.

#### 25. Precondiciones autorizantes de `SPLIT_CONTENT`

Además de una capacidad exacta futura se exige:

- LPN vigente;
- lifecycle compatible;
- membresía fuente autoritativa;
- forma `QUANTITY_SLICE`;
- revisión esperada vigente;
- actor autorizado;
- cantidades hijas válidas;
- suma exacta;
- dimensiones conservadas;
- idempotencia;
- correlación;
- ausencia de bloqueo superior.

#### 26. Operaciones no divisibles

Se preserva:

```text
SPLIT(SERIALIZED_IDENTITY) = DENY
SPLIT(KIT_INSTANCE) = DENY
```

`SPLIT_CONTENT` tampoco puede utilizarse para cambiar:

- lote;
- vencimiento;
- condición;
- producto;
- unidad canónica;
- clase primaria;
- owner económico;
- identidad serializada.

#### 27. División con intención de transferencia

Cuando el negocio quiere transferir solo una parte hacia otro LPN:

```text
PARTIAL TRANSFER
=
ONE TRANSFER_CONTENT INTENT
```

La partición necesaria puede ocurrir internamente dentro de la decisión atómica de transferencia.

No se requiere autorizar primero un split independiente para dejar una porción intermedia sin destino empresarial.

#### 28. Recurso conceptual de `MERGE_CONTENT`

`MERGE_CONTENT` opera dentro del mismo LPN sobre dos o más:

```text
QUANTITY_SLICE
```

compatibles.

El resultado consolida representación sin cambiar la existencia total.

#### 29. Precondiciones autorizantes de `MERGE_CONTENT`

Además de la capacidad exacta futura se exige:

- mismo LPN;
- lifecycle compatible;
- al menos dos membresías vigentes;
- forma `QUANTITY_SLICE`;
- clave de equivalencia completa;
- revisiones vigentes;
- actor autorizado;
- suma representable sin pérdida;
- lineage preservable;
- idempotencia;
- correlación.

#### 30. Unión incompatible

Se deniega la unión cuando difieren materialmente:

- producto;
- clase primaria;
- unidad canónica;
- presentación material;
- lote;
- vencimiento;
- condición;
- liberación;
- propiedad diferenciadora;
- otra dimensión discriminante vigente.

También se preserva:

```text
MERGE(SERIALIZED_IDENTITY) = DENY
MERGE(KIT_INSTANCE) = DENY
```

La agrupación visual en UI nunca autoriza fusionar identidad canónica.

#### 31. Lineage de división y unión

Cada split y merge aceptado debe conservar lineage suficiente para reconstruir:

```text
SOURCE MEMBERSHIP OR MEMBERSHIPS
+ RESULTING MEMBERSHIP OR MEMBERSHIPS
+ QUANTITIES
+ MATERIAL DIMENSIONS
+ REVISION BEFORE
+ REVISION AFTER
+ ACTOR
+ OPERATION
+ CORRELATION
```

Una normalización de filas no puede borrar origen histórico.

#### 32. Recurso conceptual de `TRANSFER_CONTENT`

`TRANSFER_CONTENT` protege una única intención de negocio entre:

```text
SOURCE_LPN_ID
!=
TARGET_LPN_ID
```

con contenido seleccionado y una mutación correlacionada de ambas membresías.

#### 33. Precondiciones autorizantes de `TRANSFER_CONTENT`

Una futura transferencia autorizable debe demostrar:

1. LPN fuente existente;
2. LPN destino existente;
3. identificadores distintos;
4. fuente `ACTIVE`;
5. destino `ACTIVE`;
6. membresía fuente autoritativa vigente;
7. cantidad válida o identidad exacta;
8. revisión de contenido fuente vigente;
9. revisión de contenido destino vigente;
10. actor efectivo;
11. capacidad exacta de contenido;
12. territorio aplicable a ambos extremos;
13. capacidad y compatibilidad del destino;
14. trazabilidad completa;
15. ausencia de membresía duplicada;
16. idempotencia;
17. correlación;
18. posibilidad de commit atómico origen/destino.

#### 34. Transferencia parcial por cantidad

Para una porción transferida:

```text
0 < TRANSFER_QUANTITY <= SOURCE_QUANTITY
```

La operación conserva:

```text
SOURCE_AFTER
=
SOURCE_BEFORE - TRANSFER_QUANTITY
```

```text
TARGET_AFTER
=
TARGET_BEFORE + TRANSFER_QUANTITY
```

bajo las mismas dimensiones de existencia.

La suma entre origen y destino permanece constante.

#### 35. Transferencia total por cantidad

Cuando se transfiere toda la membresía:

- la fuente deja de poseer la cantidad autoritativa;
- el destino recibe la misma existencia dimensional;
- la historia fuente permanece;
- no se crea nueva existencia económica;
- el LPN fuente no se cierra automáticamente.

#### 36. Transferencia de identidad serializada

Para `SERIALIZED_IDENTITY`:

```text
SOURCE HAS IDENTITY = TRUE
TARGET HAS IDENTITY = FALSE
```

después de una aceptación válida:

```text
SOURCE HAS IDENTITY = FALSE
TARGET HAS IDENTITY = TRUE
```

La identidad no se clona, fracciona ni renumera.

#### 37. Transferencia de instancia de kit

`KIT_INSTANCE` se transfiere como instancia completa.

La operación no:

- desarma el kit;
- recrea componentes;
- cambia versión;
- cambia completitud por inferencia;
- duplica valoración.

La composición sigue perteneciendo al contrato de kit.

#### 38. Transferencia multilínea

Una intención que declara varias membresías se trata como:

```text
ALL OR NOTHING
```

No se presenta éxito parcial como transferencia completa.

Si el negocio desea transferencias independientes, cada intención posee correlación e idempotencia propias.

#### 39. Atomicidad fuente/destino

La mutación de origen y destino es indivisible desde la perspectiva empresarial:

```text
SOURCE REMOVAL ACCEPTED
IFF
TARGET ADDITION ACCEPTED
```

Si cualquiera falla:

```text
COMMITTED TRANSFER_CONTENT = FALSE
```

No existe un estado final válido donde la misma intención ya redujo origen pero todavía no incorporó destino.

#### 40. Revisiones de contenido

Para split o merge dentro del mismo LPN:

```text
EXPECTED_CONTENT_REVISION
=
CURRENT_CONTENT_REVISION
```

Para transferencia:

```text
EXPECTED_SOURCE_CONTENT_REVISION
=
CURRENT_SOURCE_CONTENT_REVISION
```

y:

```text
EXPECTED_TARGET_CONTENT_REVISION
=
CURRENT_TARGET_CONTENT_REVISION
```

No se permite last-write-wins silencioso.

#### 41. Lifecycle se revalida antes del commit

La revisión de contenido no sustituye lifecycle.

Antes del efecto final se vuelve a comprobar el estado aplicable.

Ejemplo:

```text
CLIENT SAW TARGET ACTIVE
TARGET IS NOW CLOSED
→ DENY
```

Una observación anterior no revive un LPN terminal.

#### 42. Idempotencia

El replay de la misma intención aceptada:

- no resta dos veces;
- no suma dos veces;
- no genera dos splits;
- no genera dos merges;
- no duplica lineage;
- no incrementa revisiones dos veces;
- no duplica movimientos correlacionados.

Una respuesta perdida se resuelve mediante la misma identidad de idempotencia.

#### 43. Concurrencia

Dos mutaciones concurrentes sobre la misma membresía o revisiones incompatibles no pueden confirmarse como si ambas hubieran operado sobre el mismo estado inicial.

La segunda decisión revalida el estado actualizado y se acepta o deniega desde esa nueva realidad.

#### 44. Una sola contabilización

Toda operación debe conservar:

```text
ONE PHYSICAL EXISTENCE
→
ONE AUTHORITATIVE REPRESENTATION
```

Se prohíbe:

- stock suelto y contenido LPN simultáneos para la misma cantidad;
- una identidad serializada en dos LPN;
- origen reducido sin destino correlacionado;
- destino incrementado sin origen correlacionado;
- filas duplicadas usadas como saldo competidor.

#### 45. Capacidad y compatibilidad

Una autorización de contenido no elimina las precondiciones de `NEXO-DOM-024`.

Cuando una operación introduce contenido en un LPN o destino sujeto a capacidad o compatibilidad:

```text
AUTHORIZATION PASS
+
CAPACITY PASS
+
COMPATIBILITY PASS
→
MAY COMMIT
```

Un permiso válido no convierte un contenido incompatible en admisible.

#### 46. Trazabilidad interna

Al empacar, desempacar, dividir, unir o transferir deben conservarse cuando apliquen:

- producto o sujeto;
- clase primaria;
- cantidad;
- unidad;
- presentación material;
- lote;
- batch;
- serial;
- fecha relevante;
- vencimiento;
- origen;
- estado de liberación;
- condición.

La membresía LPN no absorbe ni reemplaza esas dimensiones.

#### 47. Ubicación

Las mutaciones de contenido no pueden teletransportar existencia.

Una operación que cambie además la colocación física debe satisfacer el contrato propietario de ubicación o movimiento.

Se preserva:

```text
LPN CONTENT CHANGE
!=
LOCATION AUTHORITY
```

`nexo.inventory.location_assignments.assign` puede ser una autorización adicional cuando corresponda a una asignación real de ubicación; nunca sustituye la autoridad de contenido.

#### 48. Movimiento de inventario

La membresía LPN debe ser reconciliable con la fuente canónica de movimientos.

Un movimiento correlacionado:

- no es permiso LPN;
- no puede escribirse para ocultar una membresía inválida;
- no puede omitirse cuando el modelo de inventario lo exige;
- no crea autoridad por existir técnicamente una RPC o tabla.

La autorización y el efecto físico deben converger en la misma intención empresarial.

#### 49. Traslado de inventario

Cuando la operación real implica un traslado de inventario con origen y destino, `nexo.inventory.transfers.create` conserva su propio contrato `INVENTORY_TRANSFER`.

Se fija:

```text
CONTENT MEMBERSHIP AUTHORITY
+
INVENTORY TRANSFER AUTHORITY WHEN APPLICABLE
=
TWO REQUIRED DECISIONS, NOT ONE ALIAS
```

Una denegación en cualquiera de las responsabilidades aplicables bloquea el efecto compuesto.

#### 50. Transferencia de contenido no es movimiento de LPN completo

Se preserva:

```text
TRANSFER_CONTENT
!=
MOVE_ROOT_LPN
```

Mover un LPN raíz completo y todo su cierre pertenece a `NEXO-DOM-022` y al contrato de movimiento aplicable.

023 no usa una transferencia de contenido para simular un movimiento estructural completo.

#### 51. Transferencia de contenido no es custodia

Se preserva:

```text
TRANSFER_CONTENT
!=
CUSTODY_TRANSFER
```

`NEXO-AUTH-025` protege custodia, préstamo, devolución y transferencia de custodia.

Mover membresía de un LPN a otro no cambia custodio por inferencia.

Cambiar custodio no cambia membresía LPN por inferencia.

#### 52. Contenedor físico

`PHYSICAL_CONTAINER` no es una cuarta forma de contenido transferible por 023.

Se preserva:

```text
PHYSICAL_CONTAINER
!=
QUANTITY_SLICE
!=
SERIALIZED_IDENTITY
!=
KIT_INSTANCE
```

Vincular o desvincular LPN y contenedor físico conserva ambas identidades y requiere su contrato propietario.

023 no crea, da de baja, mueve ni transfiere custodia de un contenedor.

#### 53. LPN anidados

Un LPN no se trata como línea ordinaria de contenido de otro LPN.

Se conserva:

```text
LPN CHILD
!=
LPN CONTENT LINE
```

El anidamiento, desanidamiento y reparentado pertenecen al contrato estructural de `NEXO-DOM-006` y no se autorizan mediante `PACK`, `UNPACK` o `TRANSFER_CONTENT`.

#### 54. Dispositivo compartido

Un dispositivo compartido:

- no crea una capacidad inexistente;
- no transforma `DEFAULT_DENY` en `ALLOW`;
- no hereda autoridad del actor anterior;
- debe identificar al actor humano efectivo;
- puede restringir sede, área, acción o recurso;
- exige revalidación server-side antes del efecto.

Una plantilla de dispositivo compatible es límite, no fuente de autoridad.

#### 55. Simulación

Una decisión simulada nunca produce contenido LPN real.

```text
SIMULATED PACK
SIMULATED UNPACK
SIMULATED SPLIT
SIMULATED MERGE
SIMULATED TRANSFER
→ ZERO BUSINESS MUTATIONS
```

La simulación puede calcular `would_allow` o `would_deny` conforme al contrato aplicable, pero una ejecución real vuelve a evaluar autoridad real y estado vigente.

#### 56. Operación offline

Una intención capturada offline no modifica el estado canónico.

Al reconectar se debe recuperar y revalidar:

- actor;
- permiso exacto;
- lifecycle;
- revisiones;
- membresía fuente;
- destino;
- territorio;
- capacidad y compatibilidad;
- idempotencia.

Una intención obsoleta puede ser denegada.

#### 57. Timeout y estado desconocido

Ante timeout o respuesta perdida:

```text
UNKNOWN RESULT
!=
SAFE TO RETRY WITH A NEW OPERATION ID
```

El cliente consulta o reintenta con la misma identidad de idempotencia hasta resolver el resultado o iniciar reconciliación.

No se duplica contenido para resolver incertidumbre.

#### 58. Decisión server-side

Cada una de las cinco mutaciones debe autorizarse en servidor antes del efecto.

No son oráculos:

- botón visible;
- formulario alterado;
- estado local;
- query string;
- cookie no verificada;
- código de barras;
- QR;
- dato oculto;
- respuesta anterior;
- permiso evaluado solo en cliente.

Una llamada directa recibe la misma política que la experiencia ordinaria.

#### 59. Orden de evaluación

Toda mutación futura recorre lógicamente:

1. resolver principal y actor efectivo;
2. comprobar que existe capacidad exacta activa;
3. resolver carril, grants y denegaciones;
4. resolver fuente;
5. resolver LPN origen y/o destino;
6. resolver territorio;
7. leer lifecycle;
8. leer revisiones;
9. resolver contenido exacto;
10. validar acción contra forma de contenido;
11. validar cantidad o identidad;
12. validar trazabilidad;
13. validar capacidad y compatibilidad;
14. validar efectos de ubicación, movimiento o traslado cuando apliquen;
15. aplicar idempotencia;
16. bloquear concurrencia incompatible;
17. autorizar;
18. ejecutar el efecto atómico;
19. registrar auditoría;
20. devolver el estado persistido.

Una etapa posterior no corrige una denegación anterior.

#### 60. Fallos seguros

Si no puede demostrarse capacidad, identidad, estado, revisión, cantidad, origen, destino, territorio, compatibilidad o integridad:

```text
NO MUTATION
```

No se produce éxito parcial.

No se elige automáticamente la interpretación más permisiva.

No se convierten errores de schema, red, permiso o RLS en autorización.

#### 61. Auditoría mínima

Toda decisión aceptada o rechazada debe poder correlacionar, según la acción:

- tipo de operación;
- identidad de operación;
- LPN fuente;
- LPN destino;
- membresías fuente;
- membresías resultantes;
- cantidad o identidad exacta;
- dimensiones materiales;
- revisiones antes y después;
- lifecycle observado;
- principal;
- actor efectivo;
- dispositivo cuando sea material;
- capacidad evaluada;
- scope y territorio;
- decisión y razones;
- correlación;
- idempotencia;
- instante de servidor;
- movimiento o traslado relacionado cuando aplique;
- resultado del efecto.

Los nombres físicos finales pertenecen a implementación.

#### 62. AS-IS remoto observado

El consumidor `vento-nexo` observado mantiene un estado parcial:

- `/inventory/lpns` redirige a `/inventory/stock`;
- existe `LpnCreateForm` como componente aislado;
- `GET /api/inventory/lpns` consulta `inventory_lpns`;
- no se observaron consumidores de `inventory_lpn_items`;
- no se observaron operaciones de runtime denominadas o equivalentes a `PACK`, `UNPACK`, `SPLIT_CONTENT`, `MERGE_CONTENT` o `TRANSFER_CONTENT`;
- no se observó un flujo alcanzable de extremo a extremo para mutar contenido LPN.

La ausencia de implementación no se presenta como protección material ya completada.

#### 63. Condiciones de salida del handoff de 021

| Brecha recibida | Decisión de 023 | Condición de salida física |
| --- | --- | --- |
| ciclo LPN no alcanzable | contenido se protege como cinco decisiones independientes | flujo real materializado y validado por unidad |
| mutaciones LPN sin permisos atómicos | `DEFAULT_DENY` hasta capacidad exacta activa | catálogo, grants, consumidor y backend compatibles |
| contenido LPN sin ciclo funcional completo | contratos `PACK`, `UNPACK`, `SPLIT_CONTENT`, `MERGE_CONTENT`, `TRANSFER_CONTENT` quedan vinculantes | implementación E2E sin doble contabilización |
| relación operativa con contenedor | se mantiene separación LPN/contenedor | owner de contenedor materializado sin alias permisivo |

023 cierra el contrato de autorización de contenido, no la implementación física.

#### 64. Frontera con `NEXO-AUTH-024`

`NEXO-AUTH-024` protege consulta y administración de activos y reutilizables.

023 no autoriza:

- crear activos;
- editar atributos maestros de activo;
- administrar grupos reutilizables;
- modificar cantidades esperadas de grupos por una mutación genérica;
- convertir un activo o reutilizable en contenido sin satisfacer primero sus contratos propietarios.

La forma de contenido no sustituye la autoridad sobre el objeto contenido.

#### 65. Frontera con `NEXO-AUTH-025`

`NEXO-AUTH-025` recibe:

- custodia;
- préstamo;
- devolución;
- transferencia de custodia;
- cambio de responsable.

023 solo cambia membresía LPN cuando una operación válida lo exige.

La custodia continúa como dimensión independiente.

#### 66. Frontera con `NEXO-AUTH-028`

Imprimir una etiqueta o QR no equivale a empacar ni transferir contenido.

La autorización de una mutación LPN no concede por transitividad:

- impresión;
- reimpresión;
- modificación de plantilla;
- acceso general a trabajos de impresión.

`NEXO-AUTH-028` conserva ese owner.

#### 67. Frontera con `NEXO-AUTH-029`

023 prohíbe que `inventory.stock` u otros permisos amplios sean autoridad final.

`NEXO-AUTH-029` ejecutará el retiro gobernado de esos aliases o fallbacks una vez existan reemplazos específicos válidos.

023 no declara físicamente retirado ningún helper.

#### 68. Frontera con `NEXO-AUTH-030`

`NEXO-AUTH-030` deberá probar integralmente 022–029.

Para 023, la certificación posterior debe incluir como mínimo:

- allow paths cuando existan capacidades exactas;
- deny paths por acción;
- acceso directo a API o acción;
- stock insuficiente;
- lifecycle incompatible;
- revisión obsoleta;
- serial ya contenido;
- split de serial;
- merge incompatible;
- target LPN incompatible;
- transferencia parcial y total;
- transferencia multilínea;
- idempotencia;
- concurrencia;
- offline;
- timeout;
- dispositivo compartido;
- simulación;
- cero doble contabilización.

Este marcador no ejecuta esas pruebas.

#### 69. Rollback de una futura materialización

Un rollback físico:

- solo puede volver a una combinación previamente certificada;
- no puede reactivar un permiso legacy más amplio;
- no puede degradar una capacidad exacta a autenticación sola;
- no puede restaurar doble contabilización;
- debe conservar movimientos, lineage y auditoría ya confirmados;
- debe mantener coherencia entre catálogo, consumidor, backend y datos.

Si no existe combinación segura anterior, se bloquea la mutación y se corrige hacia adelante.

#### 70. Requisitos de prueba derivados

**Resultado:** NO GENERA REQUISITOS DE PRUEBA.

**Requisitos creados:** 0

**Requisitos modificados:** 0

**Requisitos diferidos:** 0

**Requisitos obsoletos:** 0

Justificación: el registro canónico vigente ya protege el ciclo completo y auditable de LPN, no doble contabilización, atomicidad, idempotencia, concurrencia, conservación de trazabilidad, separación entre LPN y contenedor, y autorización server-side exacta. Esta tarea especializa la frontera de autorización de cinco mutaciones de contenido sin introducir una obligación de prueba independiente.

#### 71. Cobertura de prueba vigente reutilizada

Sin modificar el registro se reutiliza:

- `TREQ-NEXO-004` para ciclo de LPN ejecutable por actor autorizado, contenido y no doble contabilización;
- `TREQ-NEXO-011` para fuente reconciliable, atomicidad, idempotencia, concurrencia y separación de existencia suelta frente a contenido LPN;
- `TREQ-NEXO-012` para conservar lote, serial, vencimiento, ubicación, cantidad y condición al empacar, mover, dividir, unir o desempacar;
- `TREQ-NEXO-016` para separar LPN, contenedor, custodia, entrega, recepción y transporte;
- `TREQ-NEXO-046` para preservar identidad independiente del contenedor físico frente al LPN y su contenido;
- `TREQ-NEXO-047` para evitar duplicación de saldo, instancia, kit, contenedor y contenido LPN;
- `TREQ-AUTH-001` para autorización mediante permiso, contexto y scope canónicos;
- `TREQ-AUTH-013` para validación server-side de permiso exacto, actor, territorio, contexto, estado y campos permitidos.

Estas referencias son trazabilidad reutilizada y no una modificación de 04A.

#### 72. Evidencia de validación

| Clase | Estado | Evidencia |
| --- | --- | --- |
| BUILD | NOT_EXECUTED | el marcador global no materializa código; build y suites corresponden a la incorporación local y a futuras unidades físicas |
| LOCAL | NOT_EXECUTED | no se ejecutaron scripts sobre el checkout local del usuario durante la elaboración del artefacto |
| REMOTA | PASS | se verificaron `vento-shell` main `7f7e1038a5b7e92e0039752621e7af65dde2b969`, `vento-nexo` main `f0a12557a1a258c84b025933653dc756de4b5a59`, owner y marcador 023, topología `PER_IMPLEMENTATION_UNIT / POST_E5_PACKAGE`, catálogo activo de 67 permisos NEXO, contratos de `lpns.view`, `transfers.create`, `location_assignments.assign`, `NEXO-DOM-004/005`, 04A vigente y superficies LPN remotas observables; el handoff de 022 se consume desde el artefacto completo aprobado por el usuario pendiente de incorporación |
| OPERATIVA | NOT_EXECUTED | no se ejecutó empaque, desempaque, división, unión ni transferencia sobre inventario operativo |
| FÍSICA | NOT_EXECUTED | no existe materialización `NEXO-AUTH-023::<implementation_unit_id>` ejecutada desde este marcador documental |

#### 73. Criterios de aceptación

- [x] se protegen exactamente cinco decisiones de contenido LPN;
- [x] se preservan `PACK`, `UNPACK`, `SPLIT_CONTENT`, `MERGE_CONTENT` y `TRANSFER_CONTENT`;
- [x] ninguna de las cinco mutaciones reutiliza `lpns.view`;
- [x] ninguna reutiliza `stock.view`;
- [x] ninguna reutiliza `movements.view`;
- [x] `location_assignments.assign` queda separado de membresía;
- [x] `transfers.create` queda separado de `TRANSFER_CONTENT`;
- [x] las cinco mutaciones sin capacidad exacta activa quedan en `DEFAULT_DENY`;
- [x] no se inventan nombres de `PermissionKey`;
- [x] no se inventan modalidad, scope ni grants;
- [x] se preserva la regla de una sola contabilización;
- [x] `PACK` exige contenido elegible y LPN destino compatible;
- [x] `UNPACK` conserva existencia y destino reconciliable;
- [x] split solo opera sobre `QUANTITY_SLICE`;
- [x] merge solo une cantidades dimensionalmente equivalentes;
- [x] seriales y kits no se dividen ni fusionan como cantidad;
- [x] transferencia exige LPN fuente y destino distintos y `ACTIVE`;
- [x] transferencia actualiza origen y destino atómicamente;
- [x] transferencia multilínea es all-or-nothing;
- [x] se revalidan revisiones y lifecycle;
- [x] se preservan lineage, lote, serial, vencimiento y condición;
- [x] capacidad y compatibilidad permanecen gates independientes;
- [x] ubicación y movimiento permanecen autoridades independientes;
- [x] traslado de inventario conserva su permiso propio cuando aplique;
- [x] transferencia de contenido queda separada de custodia;
- [x] contenedor físico queda separado del contenido LPN;
- [x] LPN anidado no se convierte en línea de contenido;
- [x] dispositivo compartido no crea autoridad;
- [x] simulación no produce mutaciones reales;
- [x] offline y timeout no producen doble efecto;
- [x] la decisión se ejecuta server-side;
- [x] no se modifica Supabase;
- [x] no se modifican TREQ;
- [x] no se modifica 04A;
- [x] la futura materialización conserva `PER_IMPLEMENTATION_UNIT / POST_E5_PACKAGE`;
- [x] `NEXO-AUTH-024` recibe una frontera explícita.

#### 74. Límites

Esta tarea no:

- inventa nuevas `PermissionKey`;
- modifica las 67 identidades activas NEXO;
- modifica grants base u operativos;
- materializa rutas LPN;
- implementa `PACK`, `UNPACK`, `SPLIT_CONTENT`, `MERGE_CONTENT` ni `TRANSFER_CONTENT`;
- crea Server Actions;
- crea Route Handlers;
- crea RPC;
- modifica RLS;
- modifica `inventory_lpns`;
- modifica `inventory_lpn_items`;
- modifica tablas de movimientos o traslados;
- crea migraciones;
- modifica datos;
- mueve stock;
- cambia ubicación;
- cambia lifecycle;
- cambia purpose type;
- crea LPN anidados;
- mueve un LPN raíz completo;
- transfiere custodia;
- administra activos o reutilizables;
- modifica contenedores físicos;
- imprime o reimprime;
- retira físicamente permisos legacy;
- ejecuta certificación integral;
- autoriza una instancia física;
- crea ni modifica requisitos de prueba;
- modifica el registro 04A;
- desarrolla `NEXO-AUTH-024`.

#### 75. Continuidad

**ÚLTIMA TAREA APROBADA**
`NEXO-AUTH-022 — Proteger creación, actualización, cierre, anulación y reetiquetado de LPN`

**TAREA ACTUAL APROBADA**
`NEXO-AUTH-023 — Proteger empaque, desempaque, división, unión y transferencia`

**SIGUIENTE TAREA RESERVADA**
`NEXO-AUTH-024 — Proteger consulta y administración de activos y reutilizables`

### ✅ NEXO-AUTH-024 — Proteger consulta y administración de activos y reutilizables

**Estado:** APROBADA
**Tarea anterior:** NEXO-AUTH-023 — Proteger empaque, desempaque, división, unión y transferencia
**Tarea siguiente:** NEXO-AUTH-025 — Proteger custodia, préstamo, devolución y transferencia
**Tipo de tarea:** Contrato global con materialización por unidad (`PER_IMPLEMENTATION_UNIT`) y gate físico `POST_E5_PACKAGE` — contrato NEXO para proteger consulta, creación y administración de activos serializados y reutilizables controlados por cantidad mediante capacidades exactas, granularidad de dominio aprobada, autorización server-side, territorio y recurso canónicos, `DEFAULT_DENY` para mutaciones sin `PermissionKey` activa exacta y fronteras estrictas con ubicación, custodia, mantenimiento, conteos, impresión y retiro legacy
**Bloque:** BLOQUE K — NEXO
**Repositorio propietario:** `vento-group-sas/vento-shell`
**Archivo propietario:** `docs/plan-canonico/modular/bloques/K_NEXO/03_AUTORIZACION_DE_INVENTARIO_LOGISTICA_Y_ACTIVOS.md`
**Estado físico resultante:** `ESPECIFICADO_NO_MATERIALIZADO`
**Cambios físicos autorizados:** 0 durante el marcador global; las futuras materializaciones ocurren únicamente mediante `NEXO-AUTH-024::<implementation_unit_id>` después de que la unidad y su package propietario estén asignados, `E5-GATE-008::<package_id>` aplicable haya resultado `PASS` y exista autorización física explícita
**Requisitos de prueba creados o modificados:** 0

---

#### 1. Propósito

Proteger la consulta y administración base de activos serializados y reutilizables controlados por cantidad para que ninguna lectura, creación o edición dependa de `inventory.stock`, de un selector visual, de una relación de custodia, de una sede seleccionada, de una URL conocida ni de una capacidad destinada a otra responsabilidad.

La regla raíz queda:

```text
CLASE PRIMARIA Y GRANULARIDAD APROBADAS
+ ACTOR EFECTIVO
+ ACCIÓN EXACTA
+ PermissionKey ACTIVA EXACTA CUANDO EXISTA
+ CARRIL AUTORIZANTE COMPLETO
+ SCOPE
+ RECURSO
+ TERRITORIO
+ ESTADO Y REVISIÓN VIGENTES
+ COLUMNAS PERMITIDAS
+ DENEGACIONES AUSENTES
+ IDEMPOTENCIA Y CONCURRENCIA
→ ACCIÓN AUTORIZABLE
```

Y siempre:

```text
MUTACIÓN ADMINISTRATIVA SIN PermissionKey ACTIVA EXACTA
→ DEFAULT_DENY
```

#### 2. Continuidad recibida de `NEXO-AUTH-023`

La tarea anterior cerró la protección contractual del contenido LPN y dejó explícito que la forma de contenido no sustituye la autoridad sobre el objeto contenido.

024 recibe esa frontera y mantiene:

```text
LPN CONTENT AUTHORITY
!=
ASSET MASTER AUTHORITY
```

Un activo serializado o reusable puede participar en otros procesos, pero su identidad, granularidad y administración conservan decisiones propias.

#### 3. Handoff sustantivo recibido de `NEXO-AUTH-021`

La auditoría de permisos entrega a 024 estas brechas:

- las superficies de activos observadas usan `inventory.stock` como guard amplio;
- lectura y creación de activos no consumen las capacidades `nexo.assets.*` ya existentes;
- grupos y reutilizables se consultan y modifican bajo el mismo permiso legacy;
- cambios de ubicación y responsable aparecen mezclados con administración general;
- el consumidor actual permite elegir representación `item` o `group` desde la interfaz;
- una misma autoridad broad cubre lectura, creación, edición, movimientos, mantenimiento, conteos e impresión.

024 resuelve la frontera de consulta y administración base. Las responsabilidades especializadas permanecen en 025–029.

#### 4. Entradas canónicas preservadas

Esta tarea consume sin redefinir:

- `NEXO-DOM-001`, con las siete clases primarias;
- `NEXO-DOM-007`, para ubicación efectiva;
- `NEXO-DOM-008`, para custodia y responsable actual;
- `NEXO-DOM-009`, para separar `SERIALIZED_ASSET` de `REUSABLE_QUANTITY`;
- `NEXO-DOM-010`, para condición, daño, pérdida y faltante;
- `NEXO-DOM-011`, para préstamo, devolución, transferencia y cambio de custodia;
- `NEXO-DOM-012`, para mantenimiento, reparación y disponibilidad;
- `NEXO-DOM-015`, para conteos;
- la representación autoritativa única;
- la prohibición de doble representación;
- la transición versionada de granularidad;
- autorización server-side;
- scopes, carriles, territorio, dispositivo, simulación, idempotencia, concurrencia y auditoría vigentes.

#### 5. Topología y materialización futura

El marcador global usa:

```text
mode = PER_IMPLEMENTATION_UNIT
execution_gate = POST_E5_PACKAGE
```

La identidad física futura sigue:

```text
NEXO-AUTH-024::<implementation_unit_id>
```

La aprobación documental no crea ni autoriza una instancia física.

#### 6. Universo activo de permisos de activos

El catálogo activo observado contiene exactamente cuatro capacidades `nexo.assets.*`:

```text
nexo.assets.items.view
nexo.assets.items.create
nexo.assets.groups.view
nexo.assets.counts.view
```

024 consume las tres primeras únicamente para las responsabilidades que su contrato describe.

`nexo.assets.counts.view` permanece fuera de la administración base y se conserva para la superficie de conteos gobernada posteriormente por `NEXO-AUTH-027`.

#### 7. Matriz de autorización base

| Acción | Capacidad exacta activa observada | Decisión actual |
| --- | --- | --- |
| consultar activo individual | `nexo.assets.items.view` | evaluar permiso, carril, scope y recurso |
| crear activo individual | `nexo.assets.items.create` | evaluar permiso, carril base, scope y borrador |
| consultar definición o grupo cubierto por `ASSET_GROUP` | `nexo.assets.groups.view` | evaluar recurso y contrato `ORG` |
| crear grupo físico reutilizable por cantidad | ninguna exacta demostrada | `DEFAULT_DENY` |
| editar identidad de activo existente | ninguna exacta demostrada | `DEFAULT_DENY` |
| editar atributos administrativos de grupo físico | ninguna exacta demostrada | `DEFAULT_DENY` |
| cambiar cantidad esperada de grupo | ninguna exacta demostrada | `DEFAULT_DENY` como administración genérica |
| modificar condición o lifecycle por formulario genérico | ninguna exacta de administración base | `DEFAULT_DENY` y derivar al owner correspondiente |
| cambiar ubicación | no se autoriza por permiso de activos; evaluar contrato de ubicación aplicable | decisión separada |
| cambiar custodio o responsable | fuera de 024 | `NEXO-AUTH-025` |
| mantenimiento | fuera de 024 | `NEXO-AUTH-026` |
| mutar conteo | fuera de 024 | `NEXO-AUTH-027` |
| imprimir o reimprimir | fuera de 024 | `NEXO-AUTH-028` |

La matriz no crea nuevos permisos.

#### 8. Lectura de activo individual

La consulta de una identidad individual utiliza:

```text
nexo.assets.items.view
```

El recurso canónico es:

```text
ASSET_ITEM
```

y el localizador es:

```text
asset_id
OR
normalized filter
```

La lectura no autoriza mutación.

#### 9. Scope de `items.view`

`nexo.assets.items.view` conserva:

```text
BASE_OR_OPERATIONAL
SITE-READ
G(B)
AS
SS
AST
TST
AA
SA
AAT
ATW
CTX(O)
```

El máximo administrativo es `G(B)`.

La lectura operacional usa el contexto realmente autorizado y no convierte `CTX(O)` en visibilidad global.

#### 10. Territorio de lectura de activo

La resolución de recurso conserva:

```text
SITE_AREA_CUSTODY
```

y debe considerar, según el recurso vigente o histórico:

- `asset.site_id`;
- `area_id` cuando exista;
- relación de custodia;
- snapshot histórico cuando aplique.

La custodia es relación contextual y nunca bypass de permiso o territorio.

#### 11. Consulta transversal

Una consulta que abarque más de una sede o área debe producir la unión de recursos realmente autorizados.

No se permite:

```text
READ BROAD DATASET
→ HIDE UNAUTHORIZED ROWS ONLY IN UI
```

Filtrado, búsqueda, ordenamiento y paginación conservan la frontera autorizada.

#### 12. Lectura de información sensible

Serial, placa, responsable, ubicación, condición, garantía, documentos y otras dimensiones del expediente solo se exponen dentro del recurso autorizado.

La autorización para leer un activo no concede automáticamente lectura transversal sobre otros activos relacionados por producto, grupo, sede o custodio.

#### 13. Creación de activo individual

La creación utiliza exclusivamente:

```text
nexo.assets.items.create
```

Su recurso es:

```text
ASSET_ITEM
```

sobre un borrador con clasificación y territorio concretos.

#### 14. Modalidad de `items.create`

La capacidad es:

```text
BASE_ONLY
```

Por tanto:

```text
OPERATIONAL ROLE ONLY
→ NO CREATE AUTHORITY
```

Una sesión operativa o un turno no reemplazan la autoridad base requerida.

#### 15. Scope de `items.create`

La creación conserva:

```text
BASE-TERR-WRITE
AS
SS
AST
AA
SA
AAT
```

y excluye:

```text
G
TST
ATW
```

La creación exige un destino territorial concreto cuando el activo deba tener clasificación territorial.

#### 16. Dispositivo compartido y creación

`nexo.assets.items.create` está clasificado como:

```text
NOT_ALLOWED
```

para la modalidad de dispositivo compartido.

Por tanto:

```text
LIGHTWEIGHT SHARED DEVICE ACTOR
→ CANNOT CREATE ASSET MASTER
```

La operación requiere la sesión personal y el carril base definidos por el contrato.

#### 17. Recurso de creación

El borrador de creación resuelve como mínimo:

```text
CLASSIFICATION
+ SITE
+ AREA WHEN APPLICABLE
+ CUSTODIAN WHEN APPLICABLE
```

El servidor no confía en que la combinación aportada por el formulario sea válida.

#### 18. Creación no decide granularidad

Se fija:

```text
CREATE ASSET ITEM
REQUIRES
APPROVED SERIALIZED_ASSET / INDIVIDUAL_IDENTITY
```

Una interfaz no puede permitir:

```text
USER SELECTS "item"
→ DOMAIN BECOMES INDIVIDUAL
```

La granularidad precede la representación física.

#### 19. Selector AS-IS `item/group`

El consumidor observado acepta un valor visual:

```text
asset_mode = item | group
```

y selecciona directamente entre `asset_items` y `asset_groups`.

El comportamiento objetivo debe converger a:

```text
APPROVED DOMAIN GRANULARITY
→ ALLOWED REPRESENTATION
```

La selección del operador no es autoridad de dominio.

#### 20. `inventory_kind=asset` no basta

El código observado filtra productos por:

```text
inventory_kind = asset
```

Ese valor legacy no sustituye:

```text
SERIALIZED_ASSET
OR
REUSABLE_QUANTITY
```

según `NEXO-DOM-001` y `NEXO-DOM-009`.

Una fila legacy elegible para la pantalla no queda automáticamente autorizada para crear una representación física.

#### 21. Idempotencia de creación

La creación debe ser idempotente.

Un retry de la misma intención:

- no crea dos identidades;
- no duplica código o serial;
- no duplica movimiento inicial;
- no duplica asignación inicial;
- no duplica auditoría lógica.

La pérdida de respuesta no autoriza emitir otra identidad de operación equivalente.

#### 22. Unicidad de identidad

La creación individual conserva:

```text
CANONICAL ASSET ID
!=
SERIAL
!=
INTERNAL PLATE
!=
QR
```

Código, serial, placa o QR son representaciones o atributos y no sustituyen la identidad canónica.

#### 23. Creación y serial

Un activo individual puede existir sin serial de fabricante cuando la identidad individual está justificada.

No se inventa un serial.

Cuando el serial sea material, su unicidad y atribución deben validarse conforme al contrato aplicable.

#### 24. Creación y custodio inicial

El contrato de `nexo.assets.items.create` admite custodio concreto cuando aplique dentro del territorio autorizado.

Eso no convierte al custodio en fuente de permiso.

Una creación que pretenda además materializar un handoff o aceptación de custodia posterior debe satisfacer el contrato de `NEXO-AUTH-025`.

#### 25. Creación y ubicación inicial

Sede y área del borrador forman parte del recurso de creación.

Cuando la intención incluya LOC, posición u otra asignación física gobernada por el contrato de ubicación, esa parte no se autoriza por transitividad desde `items.create`.

La materialización deberá demostrar la capacidad de ubicación aplicable sobre el recurso exacto o permanecer `DEFAULT_DENY`.

#### 26. `location_assignments.assign` es una decisión separada

La capacidad:

```text
nexo.inventory.location_assignments.assign
```

protege un:

```text
LOCATION_ASSIGNMENT
```

No es un permiso genérico de administrar activos.

Puede ser una capacidad adicional cuando la operación sea realmente una asignación de ubicación cubierta por su recurso y territorio.

No autoriza:

- editar identidad;
- cambiar condición;
- cambiar lifecycle;
- cambiar custodio;
- crear un grupo;
- modificar cantidad esperada.

#### 27. Ubicación versus transferencia

Se mantiene:

```text
LOCATION ASSIGNMENT
!=
PHYSICAL TRANSFER
!=
CUSTODY TRANSFER
```

Un cambio que atraviese una frontera física o de responsabilidad debe satisfacer los contratos propietarios correspondientes.

024 no rebautiza una transferencia como simple edición de ubicación.

#### 28. Lectura de grupos

La capacidad activa disponible es:

```text
nexo.assets.groups.view
```

El recurso declarado por catálogo es:

```text
ASSET_GROUP
```

con localizador `group_id` o filtro.

La capacidad es de lectura y nunca autoriza mutación.

#### 29. Semántica de `groups.view`

El catálogo vigente describe `nexo.assets.groups.view` como lectura de grupos organizacionales con scope:

```text
ORG exacto
```

y especifica que ver grupos no concede acceso a los activos clasificados.

Por tanto, 024 no amplía silenciosamente ese contrato para cubrir toda existencia física agregada de `REUSABLE_QUANTITY`.

#### 30. Brecha entre catálogo y `asset_groups` AS-IS

El consumidor actual utiliza `asset_groups` como una representación física por cantidad que contiene, entre otros:

- producto;
- `expected_qty`;
- unidad;
- sede;
- área;
- LOC;
- posición;
- responsable;
- condición;
- lifecycle.

Ese significado es más amplio que una simple clasificación organizacional.

La conclusión contractual es:

```text
ASSET_GROUP RESOURCE CONTRACT NOT PROVEN FOR ALL PHYSICAL GROUP DATA
→ DO NOT EXPAND AUTHORITY BY ASSUMPTION
```

La lectura sensible de un grupo físico debe demostrar que el contrato compartido cubre el recurso exacto. En caso contrario, falla cerrado hasta reconciliar catálogo y consumidor.

#### 31. Creación de grupo reutilizable

No se observó una `PermissionKey` activa exacta para:

```text
CREATE REUSABLE QUANTITY GROUP
```

Por tanto:

```text
CREATE asset_groups
→ DEFAULT_DENY
```

bajo el catálogo actual.

`nexo.assets.items.create` no se reutiliza para grupos.

#### 32. Carga rápida de grupos

La superficie AS-IS permite crear varios `asset_groups` y movimientos iniciales bajo `inventory.stock`.

024 fija:

```text
BULK GROUP CREATE
!=
VIEW GROUP
!=
CREATE ASSET ITEM
```

La creación masiva permanece `DEFAULT_DENY` hasta disponer de una capacidad exacta aprobada y un contrato de recurso compatible.

#### 33. Edición de identidad de activo

El consumidor observado puede actualizar en `asset_items`:

- `display_name`;
- `asset_code`;
- `internal_plate`;
- `serial_number`;
- `brand`;
- `model`;
- `main_image_url`.

No se observó una `PermissionKey` activa exacta de actualización administrativa para ese conjunto.

Resultado:

```text
UPDATE ASSET IDENTITY
→ DEFAULT_DENY
```

La lectura o creación no se reutilizan como permiso de edición.

#### 34. Columnas permitidas

Una futura capacidad de edición debe declarar explícitamente sus columnas permitidas.

No se admite un permiso genérico para escribir cualquier columna de `asset_items`.

En particular, lifecycle, condición, custodia, ubicación, mantenimiento, baja, pérdida y campos económicos conservan sus owners.

#### 35. Edición de grupo físico

El consumidor observado puede actualizar en `asset_groups`:

- nombre;
- cantidad esperada;
- unidad;
- condición;
- lifecycle;
- imagen;
- notas.

No existe una capacidad atómica activa exacta que autorice ese bloque como administración general.

Resultado actual:

```text
UPDATE asset_groups
→ DEFAULT_DENY
```

#### 36. Cantidad esperada no es edición cosmética

Modificar `expected_qty` cambia significado físico del alcance reutilizable.

El código actual además genera un movimiento de tipo `adjustment`.

Se fija:

```text
EXPECTED QUANTITY CHANGE
!=
METADATA EDIT
```

No puede autorizarse con `groups.view`.

El ajuste debe respetar el contrato de existencia, movimientos y reconciliación aplicable.

#### 37. Condición no pertenece a administración genérica

Cambiar `condition_status` puede afectar disponibilidad, daño o tratamiento del objeto.

Por tanto:

```text
GENERIC GROUP ADMIN
!=
CONDITION TRANSITION AUTHORITY
```

La condición conserva sus contratos de dominio y las tareas posteriores aplicables.

#### 38. Lifecycle no pertenece a administración genérica

Cambiar `lifecycle_status` no es una edición de presentación.

Una futura transición debe poseer autoridad y precondiciones propias.

024 no autoriza escrituras genéricas de lifecycle.

#### 39. Reutilizable por cantidad

`REUSABLE_QUANTITY` se controla por cantidad cuando las unidades son equivalentes y no requieren historia individual material.

Se prohíbe crear una identidad por pieza para obtener acceso a una capacidad destinada a `ASSET_ITEM`.

#### 40. Activo serializado

`SERIALIZED_ASSET` conserva identidad estable por unidad.

Se prohíbe agruparlo como cantidad para evitar controles de lectura, creación, custodia, mantenimiento o baja propios de la identidad individual.

#### 41. Representación autoritativa única

Se conserva:

```text
ONE PHYSICAL EXISTENCE
→
ONE AUTHORITATIVE CONTROL REPRESENTATION
```

La misma existencia no puede quedar simultáneamente en:

```text
asset_items
AND
asset_groups
```

como dos representaciones vigentes.

#### 42. Promoción de grupo a identidad

La transición de `REUSABLE_QUANTITY` hacia `SERIALIZED_ASSET` no es una creación ordinaria aislada.

Debe conservar:

```text
SOURCE QUANTITY REDUCTION
+
NEW INDIVIDUAL IDENTITIES
+
LINEAGE
+
NO DOUBLE REPRESENTATION
```

como una transición versionada y reconciliable.

`items.create` por sí sola no autoriza retirar silenciosamente cantidad desde un grupo.

#### 43. Transición inversa

024 no autoriza convertir identidades individuales históricas en cantidad agregada mediante edición o borrado.

La transición inversa permanece fail-closed hasta que exista una decisión canónica aplicable.

#### 44. Lectura no concede creación

Se fija:

```text
items.view
!=
items.create
```

y:

```text
groups.view
!=
group mutation
```

La visibilidad del recurso no demuestra autoridad para cambiarlo.

#### 45. Creación no concede actualización posterior

Se fija:

```text
items.create
!=
items.update
```

Una capacidad que permite materializar una identidad nueva no concede mantenimiento permanente del maestro.

#### 46. Custodia no concede administración

La relación `responsible_employee_id` o cualquier relación de custodio:

- no concede lectura fuera del scope;
- no concede edición;
- no concede creación;
- no concede traslado;
- no concede impresión.

La custodia es relación de recurso, no permiso.

#### 47. Cambio de responsable

Modificar `responsible_employee_id` pertenece a la frontera de custodia.

Se fija:

```text
CHANGE RESPONSIBLE
→ NEXO-AUTH-025
```

024 no lo autoriza como edición administrativa.

#### 48. Préstamo, devolución y transferencia

024 no autoriza:

```text
LOAN
RETURN
PHYSICAL_TRANSFER
CUSTODY_TRANSFER
```

Esas decisiones pertenecen a `NEXO-AUTH-025`.

#### 49. Mantenimiento y disponibilidad

024 no autoriza:

- programar mantenimiento;
- registrar ejecución;
- marcar reparación;
- declarar fuera de servicio;
- liberar;
- resolver disponibilidad.

Estas decisiones pertenecen a `NEXO-AUTH-026`.

#### 50. Daño, pérdida y baja

Daño, pérdida, hallazgo, baja y retiro no se ejecutan mediante una edición genérica de activo o grupo.

La autorización especializada permanece en `NEXO-AUTH-026`.

#### 51. Conteos

La existencia de:

```text
nexo.assets.counts.view
```

no autoriza:

- crear sesión;
- capturar observación;
- cerrar sesión;
- cancelar;
- aprobar diferencia;
- ajustar existencia.

`NEXO-AUTH-027` conserva la separación de captura y aprobación de diferencias.

#### 52. Impresión

Ver o administrar un activo no concede imprimir o reimprimir su QR.

`NEXO-AUTH-028` conserva esa autoridad.

La emisión de otra representación visual nunca crea una identidad física nueva.

#### 53. Retiro legacy

024 prohíbe tratar:

```text
inventory.stock
```

como autoridad final para las superficies de activos.

`NEXO-AUTH-029` conserva el retiro material de ese guard y otros aliases amplios.

024 define el destino contractual sin declarar la migración física completada.

#### 54. Decisión server-side

Lectura y mutación deben resolverse en servidor.

No son oráculos de autorización:

- enlace visible;
- pestaña activa;
- query string;
- formulario;
- campo hidden;
- selector `asset_mode`;
- QR;
- código;
- nombre de rol;
- filtro de sede;
- componente cliente;
- dato ya cargado en el navegador.

#### 55. Recurso actual, no copia del cliente

El servidor vuelve a resolver:

```text
asset_id OR group_id
+ current classification
+ current control granularity
+ current territory
+ current revision
+ proposed action
```

cuando sean aplicables.

Un `product_id` aportado por cliente no demuestra que pueda materializarse una representación concreta.

#### 56. Concurrencia

Toda mutación futura comprueba revisión vigente o mecanismo equivalente.

Dos actores no pueden:

- crear dos identidades para la misma unidad;
- promover dos veces la misma cantidad;
- editar simultáneamente desde la misma revisión y aceptar ambos estados incompatibles;
- cambiar cantidad esperada y ubicación sobre supuestos obsoletos sin reconciliación.

#### 57. Operación offline

Una captura offline puede representar intención, no autoridad ni estado confirmado.

Al sincronizar se revalidan:

- actor;
- capacidad;
- recurso;
- clasificación;
- granularidad;
- territorio;
- revisión;
- duplicidad;
- dependencias aplicables.

#### 58. Simulación

Las capacidades compatibles con simulación pueden producir únicamente una evaluación hipotética.

```text
SIMULATED ALLOW
!=
REAL MUTATION
```

La simulación no:

- crea `asset_items`;
- crea `asset_groups`;
- modifica identidad;
- cambia cantidad;
- cambia ubicación;
- cambia custodia;
- crea movimientos reales.

#### 59. Dispositivo compartido

Para las capacidades que admiten operación en dispositivo compartido se conserva el contrato `STANDARD`.

Para `nexo.assets.items.create` se conserva `NOT_ALLOWED`.

Ninguna plantilla de dispositivo crea una capacidad inexistente.

#### 60. Errores seguros

Se distinguen internamente:

- no autenticado;
- no autorizado;
- recurso inexistente;
- recurso fuera de scope;
- clasificación incompatible;
- granularidad incompatible;
- revisión obsoleta;
- capacidad inexistente;
- error técnico.

Un error técnico no se traduce en `ALLOW`.

#### 61. Auditoría mínima

Toda decisión aceptada o rechazada debe poder correlacionar, según aplique:

- acción;
- `asset_id` o `group_id`;
- producto o modelo;
- clase primaria;
- granularidad;
- principal;
- actor efectivo;
- carril;
- permiso evaluado;
- scope;
- territorio;
- custodio como relación cuando aplique;
- revisión;
- decisión;
- razón;
- correlación;
- idempotencia;
- instante de servidor;
- columnas modificadas;
- resultado del efecto;
- movimiento o asignación relacionada cuando aplique.

#### 62. AS-IS remoto observado

El consumidor vigente mantiene, entre otras, estas superficies bajo:

```text
permissionCode = inventory.stock
```

- `/inventory/assets`;
- `/inventory/assets/new`;
- `/inventory/assets/quick`;
- `/inventory/assets/items/[id]`;
- `/inventory/assets/groups/[id]`;
- `/inventory/assets/counts`;
- `/inventory/assets/counts/[id]`.

La presencia de estas superficies demuestra funcionalidad parcial, no autorización objetivo.

#### 63. Mutaciones AS-IS observadas

Se observaron bajo el guard amplio:

- creación de `asset_items`;
- creación de `asset_groups`;
- creación masiva de grupos;
- actualización de ubicación de item;
- actualización de identidad de item;
- actualización de ubicación de grupo;
- actualización de detalles y cantidad esperada de grupo;
- movimientos derivados;
- mantenimiento;
- creación y mutación de conteos.

024 solo toma ownership de la consulta y administración base descritas en esta tarea.

#### 64. Clasificación del estado actual

La superficie se clasifica:

```text
FOUNDATION_PARTIAL
+
LEGACY_BROAD_AUTHORITY
+
ATOMIC_PERMISSION_GAPS
```

No se declara implementada ni certificada la protección de 024.

#### 65. Condiciones de salida de hallazgos heredados

| Hallazgo | Resultado contractual de 024 | Condición de salida física |
| --- | --- | --- |
| superficies bajo `inventory.stock` | autoridad final debe migrar a capacidades exactas | consumidores sin guard broad como oracle |
| lectura de activos bajo permiso amplio | usar `nexo.assets.items.view` | consulta filtrada y validada server-side |
| creación de activos bajo permiso amplio | usar `nexo.assets.items.create` | creación compatible con clase y granularidad |
| grupos leídos y mutados bajo permiso amplio | `groups.view` solo lectura; mutaciones faltantes fail-closed | recurso de grupo reconciliado y capacidades exactas para escritura |
| `asset_mode` decide representación | dominio decide granularidad | selector no puede crear representación incompatible |
| ubicación mezclada con administración | decisión separada de ubicación | capacidad y recurso de ubicación demostrados |
| custodio mezclado con edición | derivado a 025 | handoff/custodia protegido |
| conteos mezclados con administración | derivado a 027 | captura/aprobación segregadas |

#### 66. Rollback de futura materialización

Un rollback:

- solo vuelve a una combinación previamente certificada;
- no reactiva `inventory.stock` como autoridad más permisiva;
- no convierte permisos de lectura en escritura;
- no reintroduce selección visual como autoridad de granularidad;
- no duplica representación física;
- conserva identidades e historia;
- mantiene catálogo, consumidor, backend y datos compatibles.

Si no existe combinación segura, se bloquea la mutación y se corrige hacia adelante.

#### 67. Requisitos de prueba derivados

**Resultado:** NO GENERA REQUISITOS DE PRUEBA.

**Requisitos creados:** 0

**Requisitos modificados:** 0

**Requisitos diferidos:** 0

**Requisitos obsoletos:** 0

Justificación:

- el registro vigente ya exige separación entre activo individual y reutilizable por cantidad;
- ya exige identidad, ubicación, custodia, condición e historia de activos;
- ya prohíbe doble representación;
- ya protege autorización canónica y validación server-side;
- ya exige transición versionada e idempotente entre granularidades;
- esta tarea especializa la autorización de consulta y administración base sin introducir una obligación independiente.

#### 68. Cobertura de prueba vigente reutilizada

Sin modificar el registro se reutiliza:

- `TREQ-NEXO-011` para fuente reconciliable, movimientos, atomicidad, idempotencia y concurrencia;
- `TREQ-NEXO-013` para separación de activo individual, reutilizable por cantidad, identidad, ubicación, custodia, condición y eventos auditables;
- `TREQ-NEXO-043` para separar `REUSABLE_QUANTITY` y `SERIALIZED_ASSET` sin doble representación;
- `TREQ-NEXO-047` para comportamiento explícito por clase y ausencia de duplicación;
- `TREQ-NEXO-048` para transición versionada, determinista, idempotente y reversible antes de activación;
- `TREQ-AUTH-001` para autorización mediante permiso, contexto y scope canónicos;
- `TREQ-AUTH-013` para validación server-side de permiso exacto, actor, territorio, estado y columnas permitidas.

Estas referencias son trazabilidad reutilizada y no una modificación de 04A.

#### 69. Evidencia de validación

| Clase | Estado | Evidencia |
| --- | --- | --- |
| BUILD | NOT_EXECUTED | el marcador global no modifica código; build y suites corresponden a la incorporación local y a futuras unidades físicas |
| LOCAL | NOT_EXECUTED | no se ejecutaron format, quality, delivery, topología, plan ni TREQ contra el checkout local del usuario durante la elaboración |
| REMOTA | PASS | se verificaron `vento-shell` main `d141cbe18e36f8dee5730372faac291e606d45ef`, `vento-nexo` main `f0a12557a1a258c84b025933653dc756de4b5a59`, cierre de 023, marcador 024, topología `PER_IMPLEMENTATION_UNIT / POST_E5_PACKAGE`, cuatro permisos `nexo.assets.*`, sus contratos de modalidad/scope/recurso, `NEXO-DOM-001/008/009/011`, 04A vigente y las superficies actuales de activos, grupos y conteos |
| OPERATIVA | NOT_EXECUTED | no se consultó, creó, editó, trasladó ni reasignó ningún activo o reutilizable operativo |
| FÍSICA | NOT_EXECUTED | no existe materialización `NEXO-AUTH-024::<implementation_unit_id>` ejecutada desde este marcador documental |

#### 70. Criterios de aceptación

- [x] `items.view` queda como capacidad exacta de lectura individual;
- [x] `items.create` queda como capacidad exacta de creación individual;
- [x] `groups.view` queda limitada a lectura según su contrato vigente;
- [x] `counts.view` no se usa como administración genérica;
- [x] `inventory.stock` queda prohibido como autoridad final;
- [x] la lectura no concede escritura;
- [x] la creación no concede actualización posterior;
- [x] `asset_mode` no decide granularidad;
- [x] `inventory_kind=asset` no decide representación final;
- [x] solo `SERIALIZED_ASSET / INDIVIDUAL_IDENTITY` puede usar creación individual;
- [x] la creación de grupos reutilizables sin permiso exacto queda `DEFAULT_DENY`;
- [x] la edición de identidad de activo sin permiso exacto queda `DEFAULT_DENY`;
- [x] la edición administrativa de grupo sin permiso exacto queda `DEFAULT_DENY`;
- [x] cambiar `expected_qty` no se trata como metadata cosmética;
- [x] condición y lifecycle quedan fuera de edición genérica;
- [x] ubicación se evalúa como decisión separada;
- [x] custodio/responsable queda reservado a 025;
- [x] mantenimiento, daño, pérdida y baja quedan reservados a 026;
- [x] conteos quedan reservados a 027;
- [x] impresión queda reservada a 028;
- [x] retiro físico de permisos broad queda reservado a 029;
- [x] se exige autorización server-side;
- [x] se preservan idempotencia, concurrencia, simulación y offline;
- [x] no se modifica Supabase;
- [x] no se modifican TREQ;
- [x] no se modifica 04A;
- [x] la materialización futura conserva `PER_IMPLEMENTATION_UNIT / POST_E5_PACKAGE`.

#### 71. Límites

Esta tarea no:

- crea nuevas `PermissionKey`;
- modifica las 67 capacidades activas NEXO;
- modifica grants;
- modifica scopes;
- cambia contratos de modalidad;
- crea activos;
- crea grupos;
- edita activos;
- edita grupos;
- cambia cantidad real;
- cambia ubicación;
- cambia custodio;
- ejecuta préstamo;
- ejecuta devolución;
- ejecuta transferencia;
- ejecuta mantenimiento;
- declara daño o pérdida;
- da de baja;
- crea ni cierra conteos;
- ajusta diferencias;
- imprime;
- modifica `asset_items`;
- modifica `asset_groups`;
- modifica `asset_movements`;
- modifica tablas de conteo;
- crea migraciones;
- modifica RLS;
- modifica datos;
- modifica Supabase;
- modifica `vento-nexo`;
- autoriza una instancia física;
- crea ni modifica requisitos de prueba;
- modifica el registro 04A;
- desarrolla `NEXO-AUTH-025`.

#### 72. Continuidad

**ÚLTIMA TAREA APROBADA**
`NEXO-AUTH-023 — Proteger empaque, desempaque, división, unión y transferencia`

**TAREA ACTUAL APROBADA**
`NEXO-AUTH-024 — Proteger consulta y administración de activos y reutilizables`

**SIGUIENTE TAREA RESERVADA**
`NEXO-AUTH-025 — Proteger custodia, préstamo, devolución y transferencia`

### ✅ NEXO-AUTH-025 — Proteger custodia, préstamo, devolución y transferencia

**Estado:** APROBADA
**Tarea anterior:** NEXO-AUTH-024 — Proteger consulta y administración de activos y reutilizables
**Tarea siguiente:** NEXO-AUTH-026 — Proteger mantenimiento, daño, pérdida y baja
**Tipo de tarea:** Contrato global con materialización por unidad (`PER_IMPLEMENTATION_UNIT`) y gate físico `POST_E5_PACKAGE` — contrato NEXO para proteger custodia, préstamo, devolución, transferencia de custodia y cambio de responsable mediante decisiones server-side exactas, aceptación bilateral cuando corresponda, origen y destino autorizados, segregación de aprobación por riesgo, idempotencia, concurrencia, auditoría y `DEFAULT_DENY` mientras no exista una `PermissionKey` atómica activa aplicable
**Bloque:** BLOQUE K — NEXO
**Repositorio propietario:** `vento-group-sas/vento-shell`
**Archivo propietario:** `docs/plan-canonico/modular/bloques/K_NEXO/03_AUTORIZACION_DE_INVENTARIO_LOGISTICA_Y_ACTIVOS.md`
**Estado físico resultante:** `ESPECIFICADO_NO_MATERIALIZADO`
**Cambios físicos autorizados:** 0 durante el marcador global; las futuras materializaciones ocurren únicamente mediante `NEXO-AUTH-025::<implementation_unit_id>` después de que la unidad y su package propietario estén asignados, `E5-GATE-008::<package_id>` aplicable haya resultado `PASS` y exista autorización física explícita
**Requisitos de prueba creados o modificados:** 0

---

#### 1. Propósito

Proteger las decisiones que alteran quién tiene, usa, recibe, devuelve o asume la custodia de un activo o reutilizable, de forma que ninguna de esas mutaciones pueda ejecutarse por autenticación sola, visibilidad de una pantalla, conocimiento de una URL, posesión física, pertenencia a una sede, rol nominal, permiso de lectura, permiso de stock, permiso de ubicación o un alias legacy amplio.

La regla raíz queda:

```text
ACTOR EFECTIVO
+ SUJETO EXACTO
+ ACCIÓN DE CUSTODIA EXACTA
+ CAPACIDAD CANÓNICA EXACTA CUANDO EXISTA
+ CARRIL AUTORIZANTE COMPLETO
+ RELACIÓN DE CUSTODIA VIGENTE
+ ORIGEN AUTORIZADO
+ DESTINO AUTORIZADO
+ TERRITORIO ORIGEN Y DESTINO
+ ESTADO Y CONDICIÓN COMPATIBLES
+ ACEPTACIÓN CUANDO CORRESPONDA
+ APROBACIÓN INDEPENDIENTE CUANDO EL RIESGO LA EXIJA
+ IDEMPOTENCIA Y CONCURRENCIA
+ AUDITORÍA RECONCILIABLE
→ MUTACIÓN AUTORIZABLE
```

Mientras no exista una capacidad exacta activa aplicable:

```text
MUTACIÓN DE CUSTODIA SIN PermissionKey ACTIVA EXACTA
→ DEFAULT_DENY
```

#### 2. Naturaleza y topología

El marcador global conserva:

```text
mode = PER_IMPLEMENTATION_UNIT
execution_gate = POST_E5_PACKAGE
```

La identidad física futura es:

```text
NEXO-AUTH-025::<implementation_unit_id>
```

La aprobación documental de este marcador no crea, autoriza ni ejecuta una instancia física.

#### 3. Handoff contractual recibido

`NEXO-AUTH-024` entrega expresamente a 025:

- custodia;
- préstamo;
- devolución;
- transferencia;
- cambio de responsable;
- cambio territorial operativo;
- aceptación de handoff.

024 permite únicamente que la creación inicial resuelva destino y custodio conforme al contrato de `nexo.assets.items.create`; no autoriza mutaciones posteriores de custodia.

Además se preservan las fronteras ya cerradas por 023 y 024:

- el contenido de un LPN y la custodia son responsabilidades distintas;
- `TRANSFER_CONTENT` no equivale a `CUSTODY_TRANSFER`;
- mover una membresía LPN no cambia custodio por inferencia;
- cambiar custodio no cambia membresía LPN por inferencia;
- consulta y administración general de activos permanecen en `NEXO-AUTH-024`;
- permisos amplios legacy no constituyen el modelo objetivo;
- la decisión autoritativa debe revalidarse en servidor.

025 protege exclusivamente esas transiciones de custodia y no absorbe la administración maestra de 024.

#### 4. Entradas canónicas preservadas

La tarea consume sin redefinir:

- `VPROC-0029 — Gestionar identidad, ubicación, custodia, préstamo y transferencia de activos`;
- `NEXO-DOM-008 — Definir custodia y responsable actual`;
- `NEXO-DOM-011 — Definir préstamo, devolución, transferencia y cambio de custodia`;
- la separación entre activo individual, reutilizable controlado por cantidad, kit, LPN y contenedor físico;
- la regla de que la custodia requiere entrega y aceptación cuando corresponda;
- los eventos canónicos de activos ya definidos;
- los contratos de territorio, actor efectivo, autorización, auditoría e idempotencia;
- la separación entre ubicación física, custodia, propiedad, estado, condición y existencia.

#### 5. Resultado funcional protegido

025 protege seis transiciones canónicas observables:

```text
asset_custody_offered
asset_custody_accepted
asset_loaned
asset_returned
asset_transfer_started
asset_transfer_completed
```

Estos nombres describen eventos canónicos de resultado.

No son `PermissionKey` y esta tarea no los reutiliza como permisos.

#### 6. Estado actual del catálogo de permisos

El catálogo activo observado contiene capacidades relacionadas como:

```text
nexo.assets.items.view
nexo.assets.items.create
nexo.assets.groups.view
nexo.assets.counts.view
nexo.inventory.locations.view
nexo.inventory.location_assignments.assign
```

No se observó una `PermissionKey` activa exacta específica para:

```text
ofrecer custodia
aceptar custodia
prestar
devolver
iniciar transferencia de custodia
completar transferencia de custodia
```

La ausencia no autoriza a fabricar nombres locales dentro de `vento-nexo`.

#### 7. Decisión autorizante bajo el catálogo actual

| Intención empresarial | `PermissionKey` activa exacta observada | Decisión autorizante actual |
| --- | --- | --- |
| ofrecer custodia | ninguna | `DEFAULT_DENY` |
| aceptar custodia | ninguna | `DEFAULT_DENY` |
| registrar préstamo | ninguna | `DEFAULT_DENY` |
| registrar devolución | ninguna | `DEFAULT_DENY` |
| iniciar transferencia de custodia | ninguna | `DEFAULT_DENY` |
| completar transferencia de custodia | ninguna | `DEFAULT_DENY` |

La tabla no crea nuevas identidades, modalidad, scope, grants ni excepciones.

#### 8. Lectura de activos no autoriza custodia

Se fija:

```text
nexo.assets.items.view
=
LECTURA AUTORIZADA DE ACTIVO
```

pero:

```text
nexo.assets.items.view
!=
MUTACIÓN DE CUSTODIA
```

Consultar activo, custodio, ubicación, historial o responsable no concede autoridad para modificar ninguna de esas relaciones.

#### 9. Creación de activos no autoriza custodia posterior

`nexo.assets.items.create` protege el alta administrativa inicial dentro de su contrato.

No concede por transitividad:

- préstamo;
- devolución;
- transferencia;
- cambio de responsable;
- aceptación de custodia;
- reasignación posterior.

Una custodia inicial incluida en un alta válida no convierte el permiso de creación en una capacidad general de custodia.

#### 10. Ubicación no es custodia

`nexo.inventory.location_assignments.assign` protege una asignación de ubicación.

Se preserva:

```text
LOCATION_ASSIGNMENT
!=
CUSTODY_ASSIGNMENT
```

Por tanto:

- mover físicamente un activo no cambia custodio por inferencia;
- cambiar custodio no mueve físicamente el activo por inferencia;
- una operación que necesite ambos efectos debe satisfacer ambos contratos aplicables.

#### 11. `inventory.stock` no es autoridad de custodia

La auditoría previa observó superficies de activos protegidas por `inventory.stock`.

Se fija:

```text
inventory.stock
!=
AUTORIDAD FINAL DE CUSTODIA
```

El permiso amplio legacy no autoriza por sí solo oferta, aceptación, préstamo, devolución, transferencia ni cambio de responsable.

Su retiro físico permanece bajo `NEXO-AUTH-029`.

#### 12. Recurso conceptual de custodia

Toda decisión de custodia se evalúa sobre un sujeto exacto y una relación explícita:

```text
SUBJECT_ID
+ CURRENT_CUSTODY
+ PROPOSED_CUSTODY
+ SOURCE_TERRITORY
+ TARGET_TERRITORY
+ BUSINESS_REASON
+ CURRENT_REVISION
```

El sujeto puede ser un activo individual o una identidad canónica cuya modalidad de custodia esté definida por su dominio propietario.

No se usa una descripción libre como identidad autoritativa.

#### 13. Custodia no es propiedad

Se preserva:

```text
CUSTODIAN
!=
OWNER
```

La transferencia de custodia no cambia por inferencia:

- propiedad económica;
- centro de costo;
- titular legal;
- depreciación;
- valoración;
- obligación contable.

Los efectos económicos permanecen en sus autoridades propietarias.

#### 14. Custodia no es uso

Se preserva:

```text
CUSTODIAN
!=
CURRENT_USER
```

Un activo puede tener custodio y usuario operativo distintos cuando el contrato de dominio lo permita.

La relación de uso no concede capacidad para transferir custodia.

#### 15. Oferta de custodia

`asset_custody_offered` representa una propuesta de cambio todavía no consumada.

Una oferta válida debe conservar como mínimo:

- sujeto exacto;
- custodio actual;
- destinatario propuesto;
- actor que ofrece;
- territorio origen;
- territorio destino;
- motivo;
- revisión de custodia esperada;
- instante de servidor;
- correlación;
- idempotencia.

La oferta no libera al custodio actual ni convierte al destinatario en custodio.

#### 16. Aceptación de custodia

`asset_custody_accepted` solo puede producir el cambio efectivo cuando la oferta aplicable continúa vigente y el destinatario autorizado acepta.

Se fija:

```text
OFFERED
!=
ACCEPTED
```

y:

```text
ACEPTACIÓN VÁLIDA
→
NUEVA CUSTODIA EFECTIVA
```

La aceptación debe revalidar sujeto, actor, oferta, origen, destino, estado, revisión, territorio y denegaciones inmediatamente antes del commit.

#### 17. Rechazo, expiración o revocación de una oferta

Una oferta no aceptada no cambia custodia.

Si la oferta:

- expira;
- es revocada;
- queda obsoleta por cambio de estado;
- pierde territorio válido;
- cambia de sujeto o destinatario;
- encuentra una revisión distinta;

la mutación final se deniega y debe iniciarse una nueva intención válida.

No se backdatea una aceptación sobre una oferta inválida.

#### 18. Préstamo

`asset_loaned` representa tenencia temporal con obligación de retorno o cierre explícito.

Un préstamo autorizable debe declarar como mínimo:

- sujeto;
- custodio o responsable origen;
- receptor;
- inicio;
- condición de salida;
- fecha o condición esperada de retorno cuando aplique;
- territorio permitido;
- estado y condición;
- revisión vigente;
- evidencia de entrega y aceptación;
- correlación e idempotencia.

Préstamo no equivale a venta, baja, transferencia de propiedad ni traslado de inventario.

#### 19. Devolución

`asset_returned` cierra o modifica una relación temporal de tenencia únicamente cuando:

- existe una relación previa compatible;
- el sujeto coincide;
- el receptor de devolución es válido;
- la condición observada queda registrada;
- las discrepancias no se ocultan;
- la revisión vigente coincide;
- la operación no está ya confirmada por la misma clave idempotente.

La devolución ordinaria no borra el préstamo ni su historia.

#### 20. Transferencia de custodia

La transferencia de custodia se modela como una intención con inicio y final explícitos:

```text
asset_transfer_started
→
asset_transfer_completed
```

La fase iniciada no libera automáticamente al custodio origen.

La fase completada solo puede fijar la nueva custodia si se revalidan origen, destino, aceptación, estado, territorio y revisión.

#### 21. Atomicidad de la transferencia

La transición efectiva debe respetar:

```text
OLD CUSTODY RELEASED
IFF
NEW CUSTODY ACCEPTED
```

No existe un estado final válido donde:

- el origen quedó liberado;
- el destino todavía no aceptó;
- y el sistema presenta la transferencia como completada.

Los estados intermedios deben distinguirse explícitamente del resultado confirmado.

#### 22. Cambio de responsable

Un cambio de responsable que altere custodia se somete al mismo contrato de 025.

No se permite usar un campo editable de `responsible_id`, nombre, área o ubicación como bypass de la transición autorizada.

Si el cambio de responsable no altera custodia según el dominio propietario, debe conservarse esa diferencia y no inventar un evento de transferencia.

#### 23. Territorio origen y destino

Toda mutación debe resolver ambos extremos cuando corresponda:

```text
SOURCE TERRITORY
+
TARGET TERRITORY
```

No basta con que el actor tenga autoridad sobre uno de los dos.

Un destino existente pero fuera de alcance produce `DENY`.

Una sede, área, LOC o posición no se considera válida solo por haber sido enviada por el cliente.

#### 24. Estado y condición del sujeto

Una capacidad de custodia no elimina las precondiciones de estado y condición.

La mutación se deniega cuando el dominio propietario declare al sujeto incompatible con la acción, por ejemplo por un estado terminal, baja, pérdida ya resuelta, bloqueo o condición que exija otro flujo.

025 no redefine esos estados.

#### 25. Activos de terceros

La custodia de un activo de tercero no convierte a VENTO en propietario.

Toda relación con tercero debe conservar:

- identidad del sujeto;
- tercero relacionado cuando sea aplicable;
- custodio operativo;
- territorio;
- vigencia;
- evidencia de entrega y retorno;
- restricciones contractuales conocidas.

La ausencia de propiedad interna no autoriza una custodia sin trazabilidad.

#### 26. Reutilizables controlados por cantidad

025 no convierte una familia reutilizable en activo individual ficticio.

Cuando el dominio permita custodia por cantidad, la operación debe conservar:

- familia exacta;
- cantidad;
- unidad;
- origen;
- destino;
- tenedor o responsable;
- obligación de retorno;
- diferencia observada.

Una mutación no puede fabricar seriales inexistentes para obtener trazabilidad aparente.

#### 27. Kits y conjuntos

Una instancia de kit conserva su identidad y completitud propietarias.

Prestar, devolver o transferir un kit:

- no desarma componentes por inferencia;
- no duplica componentes;
- no cambia la definición maestra;
- no sustituye los controles de completitud;
- no convierte componentes en custodias independientes salvo que el dominio lo establezca.

#### 28. LPN y contenedor físico

Se preserva:

```text
ASSET OR REUSABLE CUSTODY
!=
LPN CONTENT MEMBERSHIP
!=
PHYSICAL CONTAINER IDENTITY
```

Una sola interacción de UI puede coordinar varias responsabilidades, pero cada autoridad aplicable debe resolverse por separado.

#### 29. Transporte y remisiones

La custodia de un activo no reutiliza por analogía la custodia de una remisión.

Del mismo modo, aceptar custodia de una remisión no concede autoridad general sobre activos.

Los contratos pueden compartir actor, territorio o evidencia, pero no intercambian `PermissionKey` ni recurso protegido.

#### 30. Separación de aprobación

`VPROC-0029` conserva aprobación condicional para asignación o transferencia según valor y riesgo.

Por tanto:

- el flujo ordinario no agrega una aprobación artificial si el contrato vigente no la exige;
- cuando el riesgo o valor la exige, ejecutor y aprobador deben permanecer separados según la matriz vigente;
- el custodio o receptor no se autoconcede una excepción administrativa;
- una aprobación no sustituye la aceptación del destinatario cuando ésta sea requerida.

#### 31. Decisión server-side

La decisión final se ejecuta en servidor.

No son oráculos de autoridad:

- botón visible;
- menú disponible;
- formulario alterado;
- URL;
- query string;
- estado local;
- código QR;
- cookie no verificada;
- nombre de rol;
- posesión física;
- respuesta previa;
- selección de sede enviada por cliente.

Una llamada directa recibe la misma política que el flujo ordinario.

#### 32. Idempotencia

El replay de una misma intención aceptada:

- no crea dos préstamos;
- no registra dos devoluciones;
- no libera dos veces al custodio origen;
- no asigna dos veces al destinatario;
- no duplica movimientos relacionados;
- no duplica auditoría empresarial;
- no incrementa revisiones dos veces.

La misma identidad de operación debe resolver el resultado ya persistido.

#### 33. Concurrencia

Dos mutaciones incompatibles sobre la misma custodia no pueden confirmarse sobre la misma revisión inicial.

Ejemplo:

```text
TRANSFER A
+
TRANSFER B
ON SAME EXPECTED REVISION
→ AT MOST ONE COMMITS
```

La segunda intención revalida el estado persistido y se acepta o deniega desde esa nueva realidad.

#### 34. Offline

Una intención capturada offline no cambia el estado canónico.

Al reconectar se revalidan:

- actor;
- capacidad exacta;
- sujeto;
- custodia actual;
- revisión;
- origen;
- destino;
- territorio;
- estado;
- condición;
- aprobación cuando aplique;
- idempotencia.

Una intención obsoleta puede terminar en `DENY`.

#### 35. Timeout y resultado desconocido

Ante respuesta perdida:

```text
UNKNOWN RESULT
!=
SAFE TO CREATE NEW OPERATION
```

El cliente consulta o reintenta con la misma identidad idempotente hasta resolver el resultado o iniciar reconciliación.

No se crea una segunda transferencia para compensar incertidumbre.

#### 36. Auditoría mínima

Toda decisión aceptada o rechazada debe poder correlacionar, según aplique:

- sujeto;
- tipo de operación;
- identidad de operación;
- custodio previo;
- custodio propuesto;
- custodio resultante;
- usuario o receptor cuando aplique;
- actor efectivo;
- aprobador cuando aplique;
- permiso evaluado;
- scope;
- territorio origen;
- territorio destino;
- estado y condición;
- revisión antes y después;
- oferta o relación previa;
- decisión y razones;
- correlación;
- idempotencia;
- instante de servidor;
- evidencia de entrega o aceptación;
- efecto relacionado de ubicación o movimiento cuando exista.

Los nombres físicos finales pertenecen a implementación.

#### 37. AS-IS remoto observado

La evidencia disponible mantiene un estado parcial:

- superficies de activos observadas todavía dependen de `inventory.stock` como guard amplio;
- lectura y creación no consumen de forma uniforme las capacidades específicas `nexo.assets.*`;
- mutaciones de ubicación y custodia fueron observadas bajo permiso amplio;
- acciones actuales pueden alterar sede, área, LOC, posición interna, responsable y movimiento;
- préstamo, devolución y transferencia existen de forma parcial, no como expediente cerrado;
- no se observó una familia activa de `PermissionKey` específica para las seis transiciones protegidas por 025.

La ausencia de implementación objetivo no se presenta como protección ya materializada.

#### 38. Cierre de hallazgos heredados

| Hallazgo heredado | Decisión de 025 | Condición de salida física |
| --- | --- | --- |
| `AUTH021-F-004` | `inventory.stock` no es autoridad final de custodia | superficie migrada a capacidades específicas compatibles |
| `AUTH021-F-006` | ubicación, custodia y transferencia deben revalidar capacidad, origen y destino | consumidor y backend protegen la mutación exacta |
| `AUTH021-F-010` | contenedor físico no recibe autoridad por alias de activo, LPN o stock | capacidad y recurso propietarios materializados sin alias permisivo |
| expediente de préstamo/devolución/transferencia parcial | se define ciclo cerrado con aceptación, revisión, idempotencia y auditoría | flujo E2E materializado y validado por unidad |

025 cierra el contrato documental de autorización, no esos cambios físicos.

#### 39. Frontera con `NEXO-AUTH-024`

`NEXO-AUTH-024` conserva consulta y administración de activos y reutilizables.

025 no autoriza por sí sola:

- crear un activo;
- editar atributos maestros;
- administrar grupos;
- modificar cantidades esperadas;
- consultar recursos fuera de alcance.

Una capacidad administrativa no concede custodia por transitividad y una capacidad de custodia no concede administración general.

#### 40. Frontera con `NEXO-AUTH-026`

`NEXO-AUTH-026` protege mantenimiento, daño, pérdida y baja.

025 puede conservar condición observada durante entrega o devolución, pero no autoriza:

- declarar daño como resolución final;
- declarar pérdida;
- iniciar o cerrar mantenimiento;
- ejecutar reparación;
- dar de baja;
- disponer;
- reemplazar.

Si una devolución detecta daño o pérdida, se conserva evidencia y se deriva al owner correspondiente sin falsear un retorno íntegro.

#### 41. Frontera con `NEXO-AUTH-029`

025 fija que ninguna mutación de custodia puede depender como autoridad final de `inventory.stock` u otro permiso amplio.

`NEXO-AUTH-029` conserva el retiro físico gobernado de aliases, fallbacks y helpers legacy después de que existan reemplazos válidos.

025 no declara ningún permiso legacy físicamente eliminado.

#### 42. Materialización futura

Una futura materialización solo puede ejecutarse cuando exista:

- `implementation_unit_id` asignado;
- package propietario aplicable;
- `E5-GATE-008::<package_id> = PASS` cuando corresponda;
- autorización física explícita;
- catálogo de permisos compatible;
- grants y denegaciones definidos;
- consumidor compatible;
- backend compatible;
- contrato de recurso y territorio compatible;
- pruebas atribuibles a la misma unidad.

La instancia física válida seguirá:

```text
NEXO-AUTH-025::<implementation_unit_id>
```

#### 43. Rollback de una futura materialización

Un rollback físico:

- solo vuelve a una combinación previamente certificada;
- no reactiva un permiso legacy más amplio;
- no convierte `DEFAULT_DENY` en autenticación sola;
- no pierde historial de custodia ya confirmado;
- no borra préstamos, devoluciones o transferencias persistidas;
- no reduce evidencia de actor, origen, destino o aceptación;
- conserva coherencia entre catálogo, consumidor, backend y datos.

Si no existe una combinación anterior segura, se bloquea la mutación y se corrige hacia adelante.

#### 44. Requisitos de prueba derivados

**Resultado:** NO GENERA REQUISITOS DE PRUEBA.

**Requisitos creados:** 0

**Requisitos modificados:** 0

**Requisitos diferidos:** 0

**Requisitos obsoletos:** 0

Justificación: la cobertura canónica vigente ya exige trazabilidad de activos, custodia, préstamos, transferencias, reutilizables, autorización server-side, territorio y separación de responsabilidades. 025 especializa el contrato de autorización de esas transiciones sin crear una obligación de prueba nueva.

#### 45. Cobertura de prueba vigente reutilizada

Sin modificar el registro se reutiliza:

- `TREQ-NEXO-013` para identidad, clasificación, ubicación, custodia, préstamos, transferencias, conteos, condición, activos individuales, reutilizables y kits;
- `TREQ-NEXO-016` para separación entre LPN, contenedor, custodia, transporte, entrega y recepción;
- `TREQ-AUTH-001` para autorización mediante permiso, contexto y scope canónicos;
- `TREQ-AUTH-013` para validación server-side de permiso exacto, actor, territorio, contexto, estado y campos permitidos.

Estas referencias son trazabilidad existente y no una modificación del registro.

#### 46. Evidencia de validación

| Clase | Estado | Evidencia |
| --- | --- | --- |
| BUILD | NOT_EXECUTED | el marcador global no materializa código; la batería local ejecutará la compilación documental antes del cierre |
| LOCAL | NOT_EXECUTED | no se ejecutaron scripts sobre el checkout local del usuario durante la elaboración del artefacto |
| REMOTA | PASS | se contrastaron en GitHub el archivo propietario vigente, `package.json`, protocolo, continuidad, topología, políticas, auditoría `NEXO-AUTH-021`, contrato aprobado `NEXO-AUTH-023`, catálogo de permisos y fuentes E1/E2 aplicables; el archivo propietario observado corresponde al blob `1ebfe93bcd17df95745bfcad64f7f8dbd562bb7a` |
| OPERATIVA | NOT_EXECUTED | no se ejecutó oferta, aceptación, préstamo, devolución ni transferencia sobre activos reales |
| FÍSICA | NOT_EXECUTED | no existe materialización `NEXO-AUTH-025::<implementation_unit_id>` ejecutada desde este marcador documental |

#### 47. Criterios de aceptación

- [x] se separa custodia de contenido LPN, ubicación, propiedad y uso;
- [x] se preservan seis eventos canónicos de resultado sin convertirlos en permisos;
- [x] no se inventa ninguna `PermissionKey`;
- [x] las seis transiciones quedan en `DEFAULT_DENY` mientras no exista capacidad exacta activa;
- [x] `assets.items.view` no autoriza mutación;
- [x] `assets.items.create` no se convierte en autoridad general de custodia;
- [x] `location_assignments.assign` queda separado de custodia;
- [x] `inventory.stock` queda rechazado como autoridad final;
- [x] oferta y aceptación permanecen separadas;
- [x] préstamo conserva temporalidad y obligación de retorno;
- [x] devolución conserva historia y discrepancias;
- [x] transferencia distingue inicio y final;
- [x] origen no queda liberado sin aceptación válida del destino;
- [x] se revalidan origen y destino;
- [x] se revalidan territorio, estado, condición y revisión;
- [x] se preserva aprobación condicional según riesgo sin imponer aprobación universal;
- [x] se protege contra replay mediante idempotencia;
- [x] se protege contra carreras mediante revisión y concurrencia;
- [x] offline no muta el estado canónico;
- [x] timeout no autoriza crear una segunda operación;
- [x] la decisión final es server-side;
- [x] activos de terceros conservan propiedad separada;
- [x] reutilizables por cantidad no se serializan ficticiamente;
- [x] kits conservan identidad y completitud;
- [x] contenedor físico conserva identidad propia;
- [x] remisiones no prestan su permiso de custodia a activos;
- [x] mantenimiento, daño, pérdida y baja permanecen en 026;
- [x] retiro de permisos legacy permanece en 029;
- [x] no se modifica Supabase;
- [x] no se modifican TREQ;
- [x] no se modifica 04A;
- [x] la futura materialización conserva `PER_IMPLEMENTATION_UNIT / POST_E5_PACKAGE`;
- [x] `NEXO-AUTH-026` recibe una frontera explícita.

#### 48. Límites

Esta tarea no:

- crea ni modifica `PermissionKey`;
- modifica grants base u operativos;
- crea roles;
- crea Server Actions;
- crea Route Handlers;
- crea RPC;
- modifica RLS;
- crea migraciones;
- modifica Supabase;
- modifica datos;
- cambia custodios reales;
- registra préstamos reales;
- registra devoluciones reales;
- transfiere activos reales;
- mueve stock;
- cambia ubicación física;
- modifica propiedad económica;
- ejecuta mantenimiento;
- declara daño;
- declara pérdida;
- ejecuta baja;
- administra catálogos de activos;
- modifica grupos o cantidades esperadas;
- imprime o reimprime;
- retira físicamente permisos legacy;
- autoriza una instancia física;
- ejecuta certificación integral;
- crea ni modifica requisitos de prueba;
- modifica el registro 04A;
- desarrolla `NEXO-AUTH-026`.

#### 49. Continuidad

**ÚLTIMA TAREA APROBADA**
`NEXO-AUTH-024 — Proteger consulta y administración de activos y reutilizables`

**TAREA ACTUAL APROBADA**
`NEXO-AUTH-025 — Proteger custodia, préstamo, devolución y transferencia`

**SIGUIENTE TAREA RESERVADA**
`NEXO-AUTH-026 — Proteger mantenimiento, daño, pérdida y baja`
### ✅ NEXO-AUTH-026 — Proteger mantenimiento, daño, pérdida y baja

**Estado:** APROBADA
**Tarea anterior:** NEXO-AUTH-025 — Proteger custodia, préstamo, devolución y transferencia
**Tarea siguiente:** NEXO-AUTH-027 — Separar captura de conteo y aprobación de diferencias
**Tipo de tarea:** Contrato global con materialización por unidad (`PER_IMPLEMENTATION_UNIT`) y gate físico `POST_E5_PACKAGE` — contrato NEXO para proteger mantenimiento, daño, pérdida, recuperación, indisponibilidad, reparación, liberación, solicitud de baja, aprobación de baja y disposición mediante decisiones server-side exactas, segregación por riesgo, evidencia no destructiva, idempotencia, concurrencia y `DEFAULT_DENY` mientras no exista una `PermissionKey` atómica activa aplicable
**Bloque:** BLOQUE K — NEXO
**Repositorio propietario:** `vento-group-sas/vento-shell`
**Archivo propietario:** `docs/plan-canonico/modular/bloques/K_NEXO/03_AUTORIZACION_DE_INVENTARIO_LOGISTICA_Y_ACTIVOS.md`
**Estado físico resultante:** `ESPECIFICADO_NO_MATERIALIZADO`
**Cambios físicos autorizados:** 0 durante el marcador global; las futuras materializaciones ocurren únicamente mediante `NEXO-AUTH-026::<implementation_unit_id>` después de que la unidad y su package propietario estén asignados, `E5-GATE-008::<package_id>` aplicable haya resultado `PASS` y exista autorización física explícita
**Requisitos de prueba creados o modificados:** 0

---

#### 1. Propósito

Proteger las decisiones que cambian la condición, disponibilidad o ciclo técnico de un activo para que reportar daño, declarar pérdida, abrir o ejecutar mantenimiento, liberar nuevamente al servicio, solicitar baja, aprobar baja o ejecutar disposición no pueda ocurrir por autenticación sola, visibilidad de una pantalla, rol nominal, posesión física, capacidad de lectura, acceso general a inventario, permiso legacy amplio, estado enviado por cliente ni existencia de una fila técnica.

La regla raíz queda:

```text
ACTOR EFECTIVO
+ SUJETO EXACTO
+ ACCIÓN TÉCNICA EXACTA
+ CAPACIDAD CANÓNICA EXACTA CUANDO EXISTA
+ CARRIL AUTORIZANTE COMPLETO
+ ESTADO Y CONDICIÓN VIGENTES
+ TERRITORIO Y RELACIONES VIGENTES
+ MOTIVO Y EVIDENCIA
+ SEGREGACIÓN CUANDO EL RIESGO LA EXIJA
+ REPUESTOS Y EFECTOS RELACIONADOS CUANDO APLIQUEN
+ PRUEBA Y LIBERACIÓN CUANDO APLIQUEN
+ IDEMPOTENCIA Y CONCURRENCIA
+ AUDITORÍA RECONCILIABLE
→ TRANSICIÓN AUTORIZABLE
```

Mientras no exista una capacidad exacta activa aplicable:

```text
MUTACIÓN TÉCNICA SIN PermissionKey ACTIVA EXACTA
→ DEFAULT_DENY
```

#### 2. Naturaleza y topología

El marcador global conserva:

```text
mode = PER_IMPLEMENTATION_UNIT
execution_gate = POST_E5_PACKAGE
```

La identidad física futura es:

```text
NEXO-AUTH-026::<implementation_unit_id>
```

La aprobación documental de este marcador no crea, autoriza ni ejecuta una instancia física.

#### 3. Handoff contractual recibido de `NEXO-AUTH-025`

025 entrega expresamente a 026:

- mantenimiento;
- daño;
- pérdida;
- baja;
- reparación;
- disposición;
- reemplazo como efecto que debe conservar su autoridad propietaria;
- evidencia de condición detectada durante entrega o devolución cuando el hallazgo no puede cerrarse como retorno íntegro.

025 no autoriza declarar daño como resolución final, declarar pérdida, iniciar o cerrar mantenimiento, ejecutar reparación, dar de baja, disponer ni reemplazar.

Se preserva además que un envío a técnico o tercero puede requerir una decisión adicional de custodia bajo 025; mantenimiento y custodia no se absorben entre sí.

#### 4. Entradas canónicas preservadas

026 consume sin redefinir:

- `VPROC-0030 — Gestionar mantenimiento, reparación, garantía, repuesto y disposición de activos`;
- `NEXO-DOM-010 — Definir estado, condición, daño, pérdida y faltante`;
- `NEXO-DOM-012 — Definir mantenimiento, reparación y disponibilidad`;
- `NEXO-DOM-013 — Definir baja, descarte, venta o reemplazo`;
- `NEXO-DOM-016 — Definir repuestos, compatibilidad y stock mínimo`;
- `NEXO-DOM-017 — Definir auditoría, historial y evidencia`;
- `NEXO-DOM-025 — Vincular repuestos consumidos con mantenimiento y costo del activo`;
- `NEXO-DOM-026 — Definir inspecciones, mantenimiento preventivo, garantía y calibración`;
- `NEXO-DOM-028 — Emitir eventos financieros por adquisición, reparación, pérdida y baja cuando corresponda`;
- la regla de ciclo no destructivo de activos;
- la separación entre condición, disponibilidad, custodia, ubicación, propiedad y efecto económico;
- la obligación de conservar plan, disparador, orden de trabajo, diagnóstico, ejecución, evidencia, prueba, liberación y próxima obligación cuando correspondan.

#### 5. Eventos canónicos de resultado relevantes

026 protege las decisiones que producen o validan, según corresponda, los siguientes eventos ya definidos:

```text
asset_condition_reported
asset_damaged
asset_lost
asset_found
maintenance_due
maintenance_work_order_opened
maintenance_started
spare_part_reserved
spare_part_consumed
maintenance_completed
asset_released_to_service
warranty_claim_opened
insurance_claim_opened
asset_retirement_requested
asset_retirement_approved
asset_disposed
```

Estos nombres son eventos de dominio.

No son `PermissionKey` y no se reutilizan como permisos.

#### 6. Separación de responsabilidades

Se fija como mínimo:

```text
REPORT CONDITION
!=
DECLARE DAMAGE
!=
DECLARE LOSS
!=
OPEN MAINTENANCE
!=
EXECUTE MAINTENANCE
!=
COMPLETE MAINTENANCE
!=
RELEASE TO SERVICE
!=
REQUEST RETIREMENT
!=
APPROVE RETIREMENT
!=
DISPOSE ASSET
```

Una interfaz puede encadenar pasos, pero la autorización debe poder negar uno aunque otro resulte permitido.

#### 7. Estado actual del catálogo de permisos

El catálogo activo observado expone capacidades de activos como:

```text
nexo.assets.items.view
nexo.assets.items.create
nexo.assets.groups.view
nexo.assets.counts.view
```

y capacidades generales de inventario relacionadas con ubicaciones, movimientos o conteos.

No se observó una `PermissionKey` activa exacta específica para:

```text
reportar daño
confirmar daño
reportar pérdida
confirmar pérdida
registrar hallazgo o recuperación
abrir mantenimiento
ejecutar mantenimiento
completar mantenimiento
liberar activo al servicio
solicitar baja
aprobar baja
ejecutar disposición
```

La ausencia no autoriza a fabricar identidades locales dentro de `vento-nexo`.

#### 8. Decisión autorizante bajo el catálogo actual

| Intención empresarial | `PermissionKey` activa exacta observada | Decisión autorizante actual |
| --- | --- | --- |
| reportar condición o daño con efecto técnico | ninguna exacta | `DEFAULT_DENY` |
| confirmar daño | ninguna exacta | `DEFAULT_DENY` |
| declarar pérdida | ninguna exacta | `DEFAULT_DENY` |
| registrar hallazgo con efecto de recuperación | ninguna exacta | `DEFAULT_DENY` |
| abrir mantenimiento | ninguna exacta | `DEFAULT_DENY` |
| iniciar mantenimiento | ninguna exacta | `DEFAULT_DENY` |
| completar mantenimiento | ninguna exacta | `DEFAULT_DENY` |
| liberar al servicio | ninguna exacta | `DEFAULT_DENY` |
| solicitar baja | ninguna exacta | `DEFAULT_DENY` |
| aprobar baja | ninguna exacta | `DEFAULT_DENY` |
| ejecutar disposición | ninguna exacta | `DEFAULT_DENY` |

La tabla no crea modalidad, scope, grants, excepciones ni nombres futuros.

#### 9. Lectura del activo no autoriza transición técnica

Se preserva:

```text
nexo.assets.items.view
=
LECTURA AUTORIZADA DE ACTIVO
```

pero:

```text
nexo.assets.items.view
!=
AUTORIDAD DE MANTENIMIENTO
!=
AUTORIDAD DE DAÑO
!=
AUTORIDAD DE PÉRDIDA
!=
AUTORIDAD DE BAJA
```

La posibilidad de consultar condición, historial o mantenimiento no concede escritura.

#### 10. Creación del activo no autoriza su ciclo técnico posterior

`nexo.assets.items.create` protege el alta inicial bajo su contrato.

No concede por transitividad:

- mantenimiento;
- reparación;
- cambio de disponibilidad;
- declaración de daño;
- declaración de pérdida;
- baja;
- disposición;
- liberación al servicio.

El creador no se convierte en autoridad permanente del activo.

#### 11. `inventory.stock` no es autoridad técnica

La auditoría previa observó `registerAssetMaintenance` y otras superficies de activos bajo:

```text
permissionCode = inventory.stock
```

Se fija:

```text
inventory.stock
!=
AUTORIDAD FINAL DE MANTENIMIENTO O DISPOSICIÓN
```

El retiro físico de ese permiso amplio permanece bajo `NEXO-AUTH-029`.

#### 12. AS-IS de `registerAssetMaintenance`

El consumidor observado posee una Server Action denominada `registerAssetMaintenance` que:

1. exige actualmente `inventory.stock`;
2. recibe `maintenance_status` desde el formulario;
3. recibe `maintenance_type` desde el formulario;
4. inserta una fila en `asset_maintenance_records`;
5. si el estado recibido es `planned`, actualiza el activo a mantenimiento/reparación;
6. si el estado recibido es `done`, actualiza el activo a operativo/activo;
7. ejecuta el registro técnico y el cambio del activo como escrituras separadas.

Este estado se clasifica como:

```text
LEGACY_BROAD
+
ATOMIC_PERMISSION_GAP
+
MULTI_EFFECT_NOT_PROVEN_ATOMIC
+
RELEASE_BY_CLIENT_STATUS_RISK
```

La existencia funcional de la acción no demuestra que el contrato objetivo ya esté protegido.

#### 13. Estados observados no son permisos

El consumidor actual presenta valores como:

```text
equipment_status:
operativo
en_mantenimiento
fuera_servicio
baja

lifecycle_status:
activo
almacenado
prestado
en_reparacion
retirado
perdido

condition_status:
nuevo
bueno
regular
malo
critico
```

026 no convierte esos strings en autoridad.

Un cliente no puede autorizar una transición enviando un valor reconocido por la interfaz.

#### 14. Condición no es disponibilidad

Se preserva:

```text
CONDITION
!=
AVAILABILITY
```

Un activo puede tener condición aceptable y permanecer indisponible por:

- mantenimiento;
- garantía;
- bloqueo de seguridad;
- investigación;
- pérdida no resuelta;
- documento vencido;
- política aplicable.

Asimismo, una condición degradada no equivale automáticamente a baja.

#### 15. Reporte de condición

`asset_condition_reported` conserva una observación atribuible.

Debe incluir como mínimo, cuando aplique:

- activo exacto;
- condición observada;
- actor;
- fecha efectiva;
- origen del reporte;
- evidencia;
- notas o causa;
- contexto territorial;
- correlación.

Reportar condición no aprueba reparación, baja ni efecto económico.

#### 16. Daño reportado frente a daño confirmado

Se separa:

```text
DAMAGE REPORTED
!=
DAMAGE CONFIRMED
```

El reporte puede provenir del custodio, usuario, conteo, inspección o mantenimiento.

La confirmación con efecto técnico exige revalidar recurso, actor, evidencia, estado vigente y política aplicable.

Un hallazgo visual o una selección cliente no cambia por sí solo la disponibilidad final.

#### 17. Daño no implica baja

Se fija:

```text
DAMAGED
!=
RETIRED
!=
DISPOSED
```

Un activo dañado puede:

- permanecer bloqueado;
- entrar a diagnóstico;
- entrar a reparación;
- gestionarse por garantía;
- ser recuperable;
- terminar posteriormente en baja mediante su ciclo independiente.

026 prohíbe saltar directamente desde daño a disposición sin las decisiones intermedias que correspondan.

#### 18. Pérdida reportada frente a pérdida confirmada

Se separa:

```text
LOSS REPORTED
!=
LOSS CONFIRMED
```

Una ausencia en conteo, una devolución faltante o una ubicación no resuelta no constituyen por sí solas una pérdida final.

La confirmación debe conservar investigación, actor, evidencia, última custodia conocida, última ubicación conocida, fecha efectiva y estado previo.

#### 19. Pérdida no borra identidad

La pérdida es un estado o evento no destructivo.

Se preserva:

```text
ASSET LOST
→ IDENTITY PRESERVED
→ HISTORY PRESERVED
→ LAST KNOWN CUSTODY PRESERVED
→ LAST KNOWN LOCATION PRESERVED
```

No se elimina el expediente ni se reutiliza el identificador.

#### 20. Hallazgo y recuperación

`asset_found` no reabre automáticamente disponibilidad.

Una recuperación debe poder demostrar:

- identidad exacta;
- relación con la pérdida vigente;
- actor que reporta;
- ubicación encontrada;
- condición observada;
- evidencia;
- necesidad de inspección o mantenimiento;
- decisión posterior de disponibilidad.

Encontrado no equivale a liberado al servicio.

#### 21. Plan de mantenimiento

El plan define una obligación futura y no una ejecución.

Puede considerar disparadores por:

- fecha;
- uso;
- ciclos;
- kilometraje;
- condición;
- inspección;
- fabricante;
- política interna.

Crear o consultar un plan no autoriza una orden, ejecución ni liberación.

#### 22. Mantenimiento vencido

`maintenance_due` representa una obligación o alerta.

No debe:

- crear automáticamente una ejecución;
- declarar trabajo realizado;
- consumir repuestos;
- liberar el activo;
- cerrar evidencia pendiente.

La política puede bloquear disponibilidad cuando corresponda, pero ese efecto debe ser explícito y auditable.

#### 23. Orden de trabajo

`maintenance_work_order_opened` representa una intención controlada de trabajo sobre un activo.

Debe conservar cuando aplique:

- activo;
- disparador;
- tipo;
- diagnóstico inicial;
- tareas previstas;
- técnico o proveedor;
- fechas;
- indisponibilidad esperada;
- evidencia inicial;
- correlación;
- autorización aplicable.

Una orden abierta no equivale a mantenimiento iniciado ni completado.

#### 24. Inicio de mantenimiento

`maintenance_started` debe revalidar el activo y su estado actual.

No puede iniciar válidamente si la combinación vigente lo impide, por ejemplo cuando:

- el activo ya está retirado;
- existe una pérdida confirmada sin recuperación;
- la orden aplicable fue cancelada;
- el recurso no corresponde al sujeto esperado;
- el actor ya no posee autoridad;
- existe conflicto de revisión.

La evaluación se realiza en servidor.

#### 25. Ejecución de mantenimiento

Durante ejecución deben poder conservarse:

- diagnóstico;
- trabajo realizado;
- técnico o proveedor;
- fechas reales;
- evidencia;
- repuestos;
- costo informado;
- resultado;
- incidencias;
- próxima obligación.

Texto libre puede complementar, pero no sustituye hechos estructurados que tengan owner canónico.

#### 26. Repuestos

Se preserva:

```text
TEXT "PARTS REPLACED"
!=
SPARE PART CONSUMPTION
```

Cuando se consume un repuesto real:

```text
MAINTENANCE AUTHORITY
+
INVENTORY AUTHORITY
+
EXACT SPARE PART
+
QUANTITY
+
REFERENCE TO ASSET AND WORK ORDER
→ EFFECT MAY COMMIT
```

026 no presta su autoridad al inventario ni convierte una descripción en movimiento físico.

#### 27. Garantía y seguro

La existencia de un documento no demuestra cobertura vigente.

`warranty_claim_opened` e `insurance_claim_opened` deben conservar según aplique:

- vigencia;
- proveedor o asegurador;
- cobertura;
- exclusiones;
- documentos;
- activo;
- causa;
- reclamación;
- estado;
- resultado.

Abrir reclamación no aprueba automáticamente reparación, reemplazo, pago ni baja.

#### 28. Mantenimiento completado

`maintenance_completed` demuestra cierre del trabajo técnico correspondiente.

No implica por sí solo:

```text
asset_released_to_service
```

Se preserva:

```text
WORK COMPLETED
!=
SERVICE RELEASED
```

#### 29. Prueba y liberación

Cuando la política del activo exija prueba o verificación, la liberación al servicio requiere evidencia suficiente del resultado.

Se fija:

```text
MAINTENANCE COMPLETED
+ REQUIRED TEST PASS
+ REQUIRED REVIEW PASS
+ CURRENT STATE COMPATIBLE
→ MAY RELEASE
```

Si falta una condición requerida:

```text
RELEASE = DENY
```

#### 30. Prohibición de liberación por estado cliente

La interfaz actual puede enviar `maintenance_status = done`.

026 fija que un valor enviado por cliente no puede ser el único fundamento para:

- declarar mantenimiento completado;
- cambiar el activo a operativo;
- cambiar lifecycle a activo;
- retirar un bloqueo;
- liberar al servicio.

La decisión autoritativa se reconstruye en servidor.

#### 31. Baja como ciclo separado

La baja conserva como mínimo:

```text
REQUEST
→ EVALUATE
→ APPROVE WHEN REQUIRED
→ EXECUTE DISPOSITION
→ RECORD RESULT
→ RECONCILE ECONOMIC EFFECT WHEN APPLICABLE
```

No se autoriza una actualización genérica de estado que colapse el ciclo.

#### 32. Solicitud de baja

`asset_retirement_requested` no es una baja consumada.

Debe conservar:

- sujeto exacto;
- motivo;
- condición;
- estado previo;
- actor solicitante;
- evidencia;
- fecha;
- propuesta de tratamiento;
- correlación.

El solicitante no obtiene por ello autoridad de aprobación o disposición.

#### 33. Aprobación de baja

`asset_retirement_approved` requiere la segregación definida por valor, riesgo, propiedad y política.

Se preserva:

```text
CUSTODIAN
!=
AUTOMATIC RETIREMENT APPROVER
```

Tampoco se presume que técnico, registrador del daño o ejecutor del mantenimiento pueda aprobar la misma baja.

#### 34. Disposición

`asset_disposed` representa la ejecución del destino aprobado.

Puede corresponder, según contrato propietario, a:

- descarte;
- venta;
- devolución a tercero;
- reemplazo con tratamiento explícito del activo anterior;
- otra disposición autorizada.

La disposición no borra historia ni reutiliza identidad.

#### 35. Reemplazo

Se preserva:

```text
RETIRED ASSET
!=
REPLACEMENT ASSET
```

Un reemplazo nuevo posee identidad propia.

026 no crea órdenes de compra, compromisos, pagos ni activos sustitutos por inferencia.

Los owners de ORIGO, NUMERA y alta de activos conservan sus decisiones.

#### 36. Efecto económico

NEXO conserva el hecho operacional de reparación, pérdida o baja.

NUMERA conserva el tratamiento económico cuando corresponda.

Se fija:

```text
NEXO OPERATIONAL EVENT
!=
ACCOUNTING DECISION
```

La ausencia de conciliación económica no autoriza a ocultar o reescribir el hecho físico.

#### 37. Custodia durante mantenimiento

Enviar un activo a un técnico, proveedor o tercero puede exigir:

```text
MAINTENANCE DECISION
+
CUSTODY DECISION WHEN APPLICABLE
```

026 no absorbe `NEXO-AUTH-025`.

El mantenimiento tampoco cambia custodio automáticamente por registrar un proveedor.

#### 38. Ubicación durante mantenimiento

Una salida física o retorno puede requerir la autoridad de ubicación o movimiento aplicable.

Se preserva:

```text
MAINTENANCE STATUS CHANGE
!=
LOCATION ASSIGNMENT
```

026 no teletransporta el activo ni usa mantenimiento para evadir controles de origen y destino.

#### 39. Conteo y diferencia

Una ausencia detectada por conteo puede disparar investigación de pérdida, pero:

```text
COUNT DIFFERENCE
!=
CONFIRMED LOSS
```

`NEXO-AUTH-027` conserva captura, cierre, aprobación y resolución de diferencias de conteo.

026 solo recibe un hallazgo cuando corresponde iniciar el ciclo técnico de daño, pérdida o recuperación.

#### 40. Datos sensibles de mantenimiento

Los registros pueden contener:

- proveedor;
- técnico;
- costo informado;
- garantía;
- seguro;
- documentos;
- diagnóstico;
- fotografías;
- evidencia de incidentes.

La lectura debe respetar finalidad, recurso, scope y proyección permitida.

`nexo.assets.items.view` no debe interpretarse automáticamente como permiso para exponer todos los campos sensibles de todo expediente técnico.

026 no inventa una nueva capacidad de lectura; mantiene `DEFAULT_DENY` para cualquier proyección sensible cuya autoridad exacta no pueda demostrarse.

#### 41. Dispositivo compartido

Un dispositivo compartido:

- no crea una capacidad inexistente;
- no hereda privilegios del actor anterior;
- no permite aprobar baja por permanecer autenticado;
- no convierte un reporte de daño en decisión técnica;
- debe resolver al actor humano efectivo antes de toda mutación.

La plantilla del dispositivo es límite, no fuente de autoridad.

#### 42. Operación offline

Una captura offline puede conservar evidencia o intención pendiente cuando el contrato futuro lo permita.

No modifica por sí sola el estado canónico.

Al reconectar se revalidan como mínimo:

- actor;
- capacidad exacta;
- sujeto;
- estado;
- condición;
- revisión;
- territorio;
- orden de trabajo;
- decisión de baja cuando aplique;
- idempotencia.

Una intención obsoleta puede ser denegada.

#### 43. Timeout y resultado desconocido

Ante timeout:

```text
UNKNOWN RESULT
!=
SAFE TO CREATE A NEW OPERATION
```

El replay conserva la misma identidad idempotente.

No se crea una segunda orden, mantenimiento, liberación, baja o disposición para resolver incertidumbre.

#### 44. Idempotencia

El replay de la misma intención aceptada no puede:

- abrir dos órdenes;
- registrar dos inicios;
- consumir dos veces el mismo repuesto;
- completar dos veces;
- liberar dos veces;
- aprobar dos bajas;
- disponer dos veces;
- emitir dos efectos correlacionados.

La respuesta persistida o reconciliable debe poder recuperarse mediante la misma identidad de operación.

#### 45. Concurrencia

Dos decisiones concurrentes sobre el mismo activo no pueden confirmar efectos incompatibles sobre el mismo estado inicial.

Ejemplos:

```text
RELEASE TO SERVICE
vs
CONFIRMED LOSS
```

```text
RETIREMENT APPROVAL
vs
NEW MAINTENANCE START
```

```text
DISPOSAL
vs
CUSTODY TRANSFER
```

La segunda decisión debe revalidar el estado vigente y aceptar o denegar desde la nueva realidad.

#### 46. Atomicidad y efectos compuestos

Cuando una decisión empresarial requiere más de una escritura autoritativa, el resultado no puede quedar presentado como completo si solo una parte confirmó.

Para el caso observado de mantenimiento:

```text
MAINTENANCE RECORD COMMITTED
+
ASSET STATE CHANGE FAILED
!=
SUCCESSFUL COMPOUND TRANSITION
```

La futura materialización debe usar un mecanismo atómico o un estado durable, identificable y reconciliable que impida reportar éxito falso.

#### 47. Auditoría mínima

Toda decisión aceptada o rechazada debe poder correlacionar, según corresponda:

- operación;
- activo;
- orden de trabajo;
- estado anterior;
- condición anterior;
- decisión solicitada;
- actor;
- dispositivo cuando sea material;
- capacidad evaluada;
- scope y territorio;
- motivo;
- evidencia;
- proveedor o técnico cuando aplique;
- repuestos relacionados;
- aprobación cuando aplique;
- prueba;
- liberación;
- estado posterior;
- correlación;
- idempotencia;
- instante de servidor;
- resultado;
- efecto económico o referencia externa cuando aplique.

Los nombres físicos finales pertenecen a implementación.

#### 48. Orden lógico de evaluación

Toda mutación futura recorre lógicamente:

1. resolver principal y actor efectivo;
2. comprobar capacidad exacta activa;
3. resolver grants y denegaciones;
4. resolver activo exacto;
5. resolver recurso y territorio;
6. leer estado y condición vigentes;
7. leer revisión vigente;
8. resolver operación técnica exacta;
9. validar evidencia y motivo;
10. validar segregación aplicable;
11. validar orden de trabajo cuando corresponda;
12. validar efectos de repuestos, custodia, ubicación o economía cuando correspondan;
13. aplicar idempotencia;
14. bloquear concurrencia incompatible;
15. autorizar;
16. ejecutar el efecto coherente;
17. registrar auditoría;
18. devolver estado persistido.

Una etapa posterior no corrige una denegación anterior.

#### 49. AS-IS remoto observado

El consumidor `vento-nexo` observado mantiene un estado parcial:

- la ficha de activo utiliza `permissionCode = inventory.stock`;
- `registerAssetMaintenance` utiliza el mismo permiso amplio;
- existe `asset_maintenance_records` con estado, tipo, fechas, proveedor, trabajo, repuestos descritos, costo, próxima fecha y notas;
- el formulario ofrece tipos preventivo, correctivo, inspección, calibración, limpieza y otro;
- el formulario ofrece estados planeado, realizado, cancelado y vencido;
- el action observado modifica `equipment_status` y `lifecycle_status` según `maintenance_status`;
- los cambios del registro técnico y del estado del activo se realizan mediante escrituras separadas;
- no se observó en esa acción una `PermissionKey` específica de mantenimiento;
- no se observó una acción equivalente completa para confirmar daño, pérdida, recuperación, aprobación de baja o disposición con segregación propia;
- valores de interfaz para baja, pérdida, condición o fuera de servicio existen como representación, pero no demuestran un ciclo autorizado completo.

La existencia de tablas y UI no se presenta como protección material completada.

#### 50. Cierre de hallazgos heredados

| Hallazgo heredado | Decisión de 026 | Condición de salida física |
| --- | --- | --- |
| `AUTH021-F-004` | `inventory.stock` no es autoridad final de ciclo técnico | superficie migrada a capacidades específicas compatibles |
| `AUTH021-F-007` | mantenimiento, daño, pérdida y baja se separan en decisiones autoritativas | consumidor y backend protegen cada mutación aplicable |
| mantenimiento actual incompleto | plan, orden, ejecución, prueba y liberación permanecen distinguibles | flujo E2E materializado y validado por unidad |
| repuestos descritos como texto | texto no sustituye reserva ni consumo de inventario | consumo correlacionado con activo y orden |
| baja y efecto económico mezclables | solicitud, aprobación, disposición y tratamiento económico permanecen separados | decisiones propietarias materializadas y conciliables |

026 cierra el contrato documental de autorización, no esos cambios físicos.

#### 51. Frontera con `NEXO-AUTH-025`

025 conserva:

- custodia;
- préstamo;
- devolución;
- transferencia de custodia;
- cambio de responsable;
- aceptación de handoff.

026 puede exigir una decisión adicional de 025 cuando el activo sale hacia tercero, pero no cambia custodia por inferencia.

#### 52. Frontera con `NEXO-AUTH-027`

027 conserva:

- captura de conteo;
- cierre o cancelación de sesión;
- investigación de diferencia;
- aprobación de diferencia;
- resolución de diferencia.

026 no usa una ausencia de conteo como declaración automática de pérdida y no corrige saldos mediante una decisión técnica.

#### 53. Frontera con `NEXO-AUTH-028`

Imprimir o reimprimir una etiqueta, QR, soporte técnico o evidencia conserva su permiso propietario.

Una autorización de mantenimiento, daño, pérdida o baja no concede impresión por transitividad.

#### 54. Frontera con `NEXO-AUTH-029`

026 fija que `inventory.stock` y otros permisos amplios no son autoridad final del ciclo técnico.

029 conserva el retiro físico gobernado de aliases, fallbacks y helpers legacy cuando existan reemplazos específicos válidos.

026 no declara físicamente retirado ningún permiso.

#### 55. Frontera con `NEXO-AUTH-030`

030 conserva la certificación integral del subdominio.

Para 026 deberá cubrir posteriormente, como mínimo:

- deny por ausencia de capacidad exacta;
- API o acción directa;
- daño reportado frente a confirmado;
- pérdida reportada frente a confirmada;
- hallazgo sin liberación automática;
- mantenimiento vencido;
- orden abierta, iniciada y completada;
- repuesto sin consumo real;
- intento de liberación sin prueba;
- replay idempotente;
- concurrencia incompatible;
- timeout;
- operación offline;
- solicitud y aprobación de baja separadas;
- disposición sin aprobación;
- efecto económico separado;
- custodia y ubicación como decisiones independientes.

Este marcador no ejecuta esas pruebas.

#### 56. Frontera con `NEXO-AUTH-031`

031 protege instalaciones, mantenimiento, limpieza, inspecciones, calibración, acceso físico y obras en el subdominio de instalaciones.

026 protege el ciclo técnico de activos bajo este mini-bloque.

Cuando un objeto sea instalación fija o componente gobernado por 031, no se duplica el expediente bajo 026 por similitud terminológica.

La clase de recurso propietaria decide el owner.

#### 57. Materialización futura

Una futura materialización solo puede ejecutarse cuando exista:

- `implementation_unit_id` asignado;
- package propietario aplicable;
- `E5-GATE-008::<package_id> = PASS` cuando corresponda;
- autorización física explícita;
- catálogo de permisos compatible;
- grants y denegaciones definidos;
- consumidor compatible;
- backend compatible;
- contratos de recurso, estado y evidencia compatibles;
- pruebas atribuibles a la misma unidad.

La instancia física válida seguirá:

```text
NEXO-AUTH-026::<implementation_unit_id>
```

#### 58. Rollback de una futura materialización

Un rollback físico:

- solo vuelve a una combinación previamente certificada;
- no reactiva un permiso legacy más amplio;
- no convierte `DEFAULT_DENY` en autenticación sola;
- no borra daño, pérdida, mantenimiento, baja o disposición ya confirmados;
- no marca operativo un activo sin prueba requerida;
- no restaura disponibilidad de un activo retirado o perdido por simple downgrade de código;
- conserva órdenes, repuestos, evidencia, auditoría y efectos económicos ya emitidos;
- mantiene coherencia entre catálogo, consumidor, backend y datos.

Si no existe combinación segura anterior, se bloquea la mutación y se corrige hacia adelante.

#### 59. Requisitos de prueba derivados

**Resultado:** NO GENERA REQUISITOS DE PRUEBA.

**Requisitos creados:** 0

**Requisitos modificados:** 0

**Requisitos diferidos:** 0

**Requisitos obsoletos:** 0

Justificación: el registro vigente ya exige ciclo no destructivo de activos, daño y pérdida auditables, mantenimiento con plan, orden, ejecución, repuestos, prueba y liberación, baja con segregación y autorización server-side. 026 especializa la frontera de autorización sin introducir una obligación de prueba independiente.

#### 60. Cobertura de prueba vigente reutilizada

Sin modificar el registro se reutiliza:

- `TREQ-NEXO-013` para identidad estable, condición, daño, pérdida, hallazgo y eventos auditables del activo;
- `TREQ-NEXO-014` para mantenimiento, reparación, repuestos, garantía, seguro, prueba, liberación, baja y disposición;
- `TREQ-AUTH-001` para autorización mediante permiso, contexto y scope canónicos;
- `TREQ-AUTH-013` para validación server-side de permiso exacto, actor, territorio, contexto, estado y campos permitidos;
- `TREQ-INTEGRATION-012` para la integración de inventario físico y efectos relacionados cuando corresponda;
- `TREQ-NUMERA-001` para conservar la autoridad económica propietaria cuando exista efecto financiero.

Estas referencias son trazabilidad existente y no una modificación del registro.

#### 61. Evidencia de validación

| Clase | Estado | Evidencia |
| --- | --- | --- |
| BUILD | NOT_EXECUTED | el marcador global no materializa código; la batería local ejecutará la compilación documental antes del cierre |
| LOCAL | NOT_EXECUTED | no se ejecutaron scripts sobre el checkout local del usuario durante la elaboración del artefacto |
| REMOTA | PASS | se contrastaron el protocolo y contratos documentales de `vento-shell`, topología `PER_IMPLEMENTATION_UNIT / POST_E5_PACKAGE`, auditoría `NEXO-AUTH-021`, catálogo activo de permisos, fuentes E1/E2, registro modular NEXO y el consumidor `vento-nexo` observado; `registerAssetMaintenance` continúa protegido por `inventory.stock`, inserta `asset_maintenance_records` y modifica estados del activo mediante escrituras separadas |
| OPERATIVA | NOT_EXECUTED | no se ejecutó mantenimiento, daño, pérdida, recuperación, baja ni disposición sobre activos reales |
| FÍSICA | NOT_EXECUTED | no existe materialización `NEXO-AUTH-026::<implementation_unit_id>` ejecutada desde este marcador documental |

#### 62. Criterios de aceptación

- [x] mantenimiento, daño, pérdida y baja quedan separados en decisiones explícitas;
- [x] se preservan los eventos canónicos relevantes sin convertirlos en permisos;
- [x] no se inventa ninguna `PermissionKey`;
- [x] las mutaciones sin capacidad exacta activa quedan en `DEFAULT_DENY`;
- [x] `assets.items.view` no autoriza transición técnica;
- [x] `assets.items.create` no concede autoridad técnica posterior;
- [x] `inventory.stock` se rechaza como autoridad final;
- [x] condición y disponibilidad permanecen separadas;
- [x] daño reportado y daño confirmado permanecen separados;
- [x] daño no implica baja;
- [x] pérdida reportada y pérdida confirmada permanecen separadas;
- [x] pérdida preserva identidad e historia;
- [x] hallazgo no libera automáticamente al servicio;
- [x] plan, orden, inicio, ejecución, finalización y liberación permanecen distinguibles;
- [x] mantenimiento vencido no crea ejecución ficticia;
- [x] repuestos en texto no sustituyen consumo de inventario;
- [x] garantía y seguro no se infieren por existencia de documento;
- [x] mantenimiento completado no equivale a liberación;
- [x] un estado enviado por cliente no libera el activo;
- [x] baja conserva solicitud, evaluación, aprobación, disposición y resultado;
- [x] custodio o técnico no se convierte en aprobador automático de baja;
- [x] disposición no borra historia ni reutiliza identidad;
- [x] reemplazo conserva identidad nueva y owners externos;
- [x] efecto operacional y tratamiento económico permanecen separados;
- [x] custodia de tercero permanece bajo 025 cuando aplique;
- [x] ubicación permanece una autoridad independiente;
- [x] una diferencia de conteo no se convierte en pérdida automática;
- [x] campos técnicos sensibles no se exponen por inferencia amplia;
- [x] dispositivo compartido no crea autoridad;
- [x] offline no muta estado canónico por sí solo;
- [x] timeout no crea una segunda operación;
- [x] se exige idempotencia;
- [x] se bloquean concurrencias incompatibles;
- [x] los efectos compuestos no se presentan como éxito parcial;
- [x] la decisión final es server-side;
- [x] se preserva frontera con 027, 028, 029, 030 y 031;
- [x] no se modifica Supabase;
- [x] no se modifican TREQ;
- [x] no se modifica 04A;
- [x] la futura materialización conserva `PER_IMPLEMENTATION_UNIT / POST_E5_PACKAGE`;
- [x] `NEXO-AUTH-027` recibe una frontera explícita.

#### 63. Límites

Esta tarea no:

- crea ni modifica `PermissionKey`;
- modifica grants base u operativos;
- crea roles;
- crea Server Actions;
- crea Route Handlers;
- crea RPC;
- modifica RLS;
- crea migraciones;
- modifica Supabase;
- modifica datos;
- ejecuta mantenimiento real;
- declara daño real;
- declara pérdida real;
- recupera activos reales;
- libera activos reales al servicio;
- consume repuestos reales;
- abre reclamaciones reales;
- solicita ni aprueba bajas reales;
- ejecuta disposición real;
- crea reemplazos reales;
- modifica propiedad económica;
- cambia custodios reales;
- cambia ubicaciones reales;
- resuelve diferencias de conteo;
- imprime o reimprime;
- retira físicamente permisos legacy;
- ejecuta certificación integral;
- protege instalaciones bajo 031;
- autoriza una instancia física;
- crea ni modifica requisitos de prueba;
- modifica el registro 04A;
- desarrolla `NEXO-AUTH-027`.

#### 64. Continuidad

**ÚLTIMA TAREA APROBADA**
`NEXO-AUTH-025 — Proteger custodia, préstamo, devolución y transferencia`

**TAREA ACTUAL APROBADA**
`NEXO-AUTH-026 — Proteger mantenimiento, daño, pérdida y baja`

**SIGUIENTE TAREA RESERVADA**
`NEXO-AUTH-027 — Separar captura de conteo y aprobación de diferencias`
### ✅ NEXO-AUTH-027 — Separar captura de conteo y aprobación de diferencias

**Estado:** APROBADA
**Tarea anterior:** NEXO-AUTH-026 — Proteger mantenimiento, daño, pérdida y baja
**Tarea siguiente:** NEXO-AUTH-028 — Proteger impresión y reimpresión mediante permisos atómicos
**Tipo de tarea:** Contrato global con materialización por unidad (`PER_IMPLEMENTATION_UNIT`) y gate físico `POST_E5_PACKAGE` — contrato NEXO para separar apertura de sesión, captura de observaciones, cierre o cancelación, revisión de diferencias, aprobación y resolución de diferencias de activos mediante decisiones server-side exactas, snapshot consistente, scope territorial, idempotencia, concurrencia, segregación autorizante y `DEFAULT_DENY` cuando no exista una `PermissionKey` activa compatible con `ASSET_COUNT`
**Bloque:** BLOQUE K — NEXO
**Repositorio propietario:** `vento-group-sas/vento-shell`
**Archivo propietario:** `docs/plan-canonico/modular/bloques/K_NEXO/03_AUTORIZACION_DE_INVENTARIO_LOGISTICA_Y_ACTIVOS.md`
**Estado físico resultante:** `ESPECIFICADO_NO_MATERIALIZADO`
**Cambios físicos autorizados:** 0 durante este marcador global; cualquier materialización futura ocurre únicamente mediante `NEXO-AUTH-027::<implementation_unit_id>` después de cumplir su gate físico y autorización explícita
**Requisitos de prueba creados o modificados:** 0

---

#### 1. Propósito

Separar de forma autoritativa el ciclo de conteo patrimonial de activos y reutilizables para impedir que capturar una observación física, cerrar una sesión o detectar una diferencia otorgue por sí mismo autoridad para aprobarla, resolverla o modificar la verdad maestra del activo.

La regla raíz queda:

```text
OBSERVAR
!=
CERRAR CAPTURA
!=
APROBAR DIFERENCIA
!=
RESOLVER DIFERENCIA
!=
APLICAR MUTACION DE DOMINIO
```

Toda decisión que altere estado canónico exige su propia autorización server-side y no hereda autoridad de una fase anterior.

#### 2. Naturaleza y topología

El marcador global conserva:

```text
mode = PER_IMPLEMENTATION_UNIT
execution_gate = POST_E5_PACKAGE
```

La identidad física futura es:

```text
NEXO-AUTH-027::<implementation_unit_id>
```

La aprobación documental de este marcador no crea, autoriza ni ejecuta una instancia física.

#### 3. Handoff contractual recibido desde `NEXO-AUTH-021`

La auditoría previa entregó a 027 la separación obligatoria entre:

```text
CREAR SESION
CAPTURAR OBSERVACION
CERRAR CAPTURA
APROBAR DIFERENCIA
RESOLVER DIFERENCIA
```

También registró `AUTH021-F-008`: captura, cierre y cancelación de conteos comparten actualmente un guard amplio y su corrección pertenece a `NEXO-AUTH-027` y al retiro legacy posterior de `NEXO-AUTH-029`.

#### 4. Handoff contractual recibido desde `NEXO-AUTH-026`

026 entrega expresamente a 027:

- captura de conteo;
- cierre o cancelación de sesión;
- investigación de diferencia;
- aprobación de diferencia;
- resolución de diferencia.

Además fija:

```text
COUNT DIFFERENCE
!=
CONFIRMED LOSS
```

Una ausencia observada puede abrir una investigación técnica, pero no declara pérdida ni corrige datos por sí sola.

#### 5. Principio de observación no destructiva

El conteo es una observación sobre un snapshot y no una orden de corrección.

Por tanto:

- cantidad esperada y cantidad observada permanecen distinguibles;
- ubicación esperada y ubicación observada permanecen distinguibles;
- condición observada no sobrescribe automáticamente la condición maestra;
- una ausencia no elimina, retira ni da de baja un activo;
- un hallazgo en otro lugar no mueve automáticamente el activo;
- una cantidad adicional no crea automáticamente identidad ni saldo;
- el cierre de captura no ejecuta ajustes.

#### 6. Universo protegido

027 cubre decisiones de autorización sobre:

- sesiones de conteo de activos individuales;
- sesiones de conteo de reutilizables controlados por cantidad;
- alcance territorial persistido de la sesión;
- conjunto esperado congelado;
- observaciones por línea;
- cantidad observada;
- estado de conteo;
- ubicación encontrada;
- condición observada;
- cierre de captura;
- cancelación de sesión;
- diferencias derivadas;
- revisión de diferencias;
- aprobación de diferencias;
- resolución de diferencias;
- handoff hacia la mutación propietaria que corresponda.

No convierte stock, LPN, custodia, mantenimiento ni baja en sinónimos de conteo patrimonial.

#### 7. Estados observados actualmente en líneas de conteo

El consumidor vigente expone estados de observación equivalentes a:

```text
pending
found
missing
found_elsewhere
damaged
extra
not_applicable
```

Estos estados describen el resultado capturado de una línea. Ninguno constituye por sí solo una aprobación de diferencia ni una mutación del activo maestro.

#### 8. AS-IS de autorización observado

Las superficies vigentes:

```text
/inventory/assets/counts
/inventory/assets/counts/[id]
```

usan actualmente:

```text
appId = nexo
permissionCode = inventory.stock
```

El mismo guard amplio protege hoy:

- creación de sesión;
- captura de líneas;
- cierre;
- cancelación;
- consulta del conteo.

Clasificación:

```text
LEGACY_BROAD
```

`inventory.stock` no es el modelo objetivo para estas decisiones.

#### 9. AS-IS de creación de sesión

La creación observada:

1. exige una sede y resuelve área, LOC o posición cuando aplican;
2. selecciona activos y grupos activos del alcance;
3. crea `asset_count_sessions` con estado `open`;
4. crea `asset_count_lines` con cantidades y ubicaciones esperadas;
5. revierte la sesión si falla la inserción de líneas.

La compensación actual evita una sesión vacía por fallo parcial de inserción, pero no sustituye autorización atómica específica.

#### 10. AS-IS de captura de línea

La captura observada puede registrar:

- estado de conteo;
- cantidad contada;
- ubicación encontrada;
- condición observada;
- notas;
- actor contador;
- fecha de conteo.

La captura no debe convertirse en una actualización automática de `asset_items`, `asset_groups`, ubicación, custodia, condición definitiva, daño confirmado, pérdida o baja.

#### 11. AS-IS de cierre de sesión

El cierre observado exige que no queden líneas `pending` y luego cambia la sesión a `closed` con fecha de cierre.

Ese control demuestra completitud de captura, no aprobación de las diferencias.

Regla:

```text
TODAS LAS LINEAS CAPTURADAS
!=
TODAS LAS DIFERENCIAS APROBADAS
```

#### 12. AS-IS de cancelación

La cancelación observada cambia la sesión a `cancelled` y registra fecha de cierre.

Cancelar:

- no aprueba observaciones;
- no corrige el maestro;
- no convierte faltantes en pérdidas;
- no ejecuta movimientos;
- no libera diferencias como resueltas.

#### 13. Ausencia de ciclo de aprobación de diferencias de activos

No se observó en el consumidor actual una superficie completa y alcanzable que materialice, para `ASSET_COUNT`:

```text
REVISAR DIFERENCIA
APROBAR DIFERENCIA
RESOLVER DIFERENCIA
```

La presencia de estados `missing`, `extra`, `damaged` o `found_elsewhere` no constituye ese ciclo.

#### 14. Capacidad de lectura compatible disponible

El catálogo activo dispone de:

```text
nexo.assets.counts.view
```

Su recurso canónico es:

```text
ASSET_COUNT
```

y su alcance se basa en el conjunto territorial persistido del conteo.

Esta capacidad sirve exclusivamente para consulta autorizada de sesiones y resultados dentro del scope aplicable.

#### 15. Lectura no concede ejecución

Se preserva:

```text
nexo.assets.counts.view
!=
OPEN_COUNT_SESSION
!=
CAPTURE_COUNT_LINE
!=
CLOSE_COUNT_SESSION
!=
CANCEL_COUNT_SESSION
!=
APPROVE_ASSET_VARIANCE
!=
RESOLVE_ASSET_VARIANCE
```

Una capacidad de vista no autoriza ninguna mutación.

#### 16. Conteo de activos no equivale a conteo de stock

El catálogo distingue:

```text
ASSET_COUNT
STOCK_COUNT
```

Además, la matriz canónica declara que los conteos de activos requieren proceso y responsabilidad específicos y no se confunden con conteos de inventario.

Por tanto, semejanza funcional o nominal no autoriza reutilización transversal de capacidades.

#### 17. `stock_counts.perform` no se presta por inferencia

Existe:

```text
nexo.inventory.stock_counts.perform
```

pero su recurso contractual es `STOCK_COUNT`, con conjunto cerrado de stock y captura de líneas de existencias.

No se acepta:

```text
PERMISO DE STOCK_COUNT
+
PANTALLA DE ASSET_COUNT
=>
AUTORIZACION DE ASSET_COUNT
```

Para mutaciones de `ASSET_COUNT`, la ausencia de capacidad exacta compatible mantiene `DEFAULT_DENY`.

#### 18. Aprobación y resolución de variaciones de stock

El catálogo/auditoría también reconoce:

```text
nexo.inventory.stock_count_variances.approve
nexo.inventory.stock_count_variances.resolve
```

Estas identidades pertenecen al dominio de diferencias de conteo de inventario y no existe evidencia canónica suficiente para tratarlas como autoridad de diferencias de activos.

027 prohíbe extenderlas a `ASSET_COUNT` por coincidencia textual.

#### 19. Matriz de decisiones protegidas

| Decisión conceptual | Autoridad activa exacta compatible observada | Resultado documental |
| --- | --- | --- |
| consultar sesión de activos | `nexo.assets.counts.view` | `CANONICAL_MATCH` para lectura |
| crear sesión de activos | ninguna activa exacta compatible observada | `DEFAULT_DENY` |
| capturar observación de línea | ninguna activa exacta compatible observada | `DEFAULT_DENY` |
| cerrar captura | ninguna activa exacta compatible observada | `DEFAULT_DENY` |
| cancelar sesión | ninguna activa exacta compatible observada | `DEFAULT_DENY` |
| aprobar diferencia de activos | ninguna activa exacta compatible observada | `DEFAULT_DENY` |
| resolver diferencia de activos | ninguna activa exacta compatible observada | `DEFAULT_DENY` |

Los nombres de decisiones de esta tabla son acciones contractuales, no nuevas `PermissionKey`.

#### 20. Regla de `DEFAULT_DENY`

Mientras el catálogo activo no exponga una capacidad compatible con la mutación exacta de `ASSET_COUNT`:

```text
MUTACION ASSET_COUNT SIN CAPACIDAD EXACTA COMPATIBLE
=>
DENY
```

No sustituyen esa capacidad:

- autenticación;
- `inventory.stock`;
- `assets.counts.view`;
- `stock_counts.perform`;
- pertenencia a sede;
- ser custodio;
- ser contador de la sesión;
- haber creado la sesión;
- poseer un rol nominal;
- conocer URL o ID;
- operar desde dispositivo de bodega.

#### 21. Fórmula autoritativa de apertura de sesión

Una futura apertura materializada deberá resolver como mínimo:

```text
ACTOR EFECTIVO
+ ACCION EXACTA
+ CAPACIDAD EXACTA COMPATIBLE
+ SEDE
+ AREA/LOC/POSICION CUANDO APLIQUE
+ SCOPE AUTORIZADO
+ CONJUNTO ESPERADO
+ ESTADO DE SESION
+ IDEMPOTENCIA
+ AUDITORIA
=> DECISION
```

027 no crea la capacidad faltante.

#### 22. Snapshot del conjunto esperado

Al abrir una sesión se congela el conjunto esperado aplicable a esa sesión.

La sesión debe conservar como evidencia:

- territorio de corte;
- conjunto esperado;
- cantidades esperadas cuando correspondan;
- ubicación esperada;
- momento del corte;
- actor y contexto de apertura;
- versión o revisión necesaria para detectar conflicto.

Cambios posteriores del maestro no reescriben silenciosamente la observación histórica.

#### 23. Conjunto cerrado de sesión

Una sesión no acepta miembros externos por simple envío de un identificador desde cliente.

Cualquier inclusión posterior requiere un contrato explícito y auditable; mientras no exista, el conjunto persistido gobierna la captura.

#### 24. Captura de observación

Capturar significa registrar lo observado, no declarar la verdad final del maestro.

La autorización se evalúa por:

- sesión;
- línea;
- actor;
- territorio;
- estado `open`;
- pertenencia de la línea al conjunto;
- revisión vigente;
- campos permitidos;
- idempotency key o equivalente contractual;
- ausencia de conflicto incompatible.

#### 25. Cantidad observada

Para reutilizables por cantidad:

```text
EXPECTED_QTY
!=
COUNTED_QTY
```

Una diferencia cuantitativa se conserva como evidencia y no modifica automáticamente `expected_qty` ni crea un ajuste.

#### 26. Activo individual

Un activo individual se observa por identidad estable.

No se autoriza:

- crear un segundo activo para representar un hallazgo;
- borrar el activo por ausencia;
- reutilizar su ID para otra unidad;
- convertir una línea faltante en baja.

#### 27. Observación de ubicación

`found_elsewhere` o una ubicación encontrada distinta se conserva como observación.

Se preserva:

```text
FOUND_LOCATION
!=
CANONICAL_LOCATION_UPDATE
```

Modificar ubicación requiere la autoridad propietaria correspondiente fuera de esta captura.

#### 28. Observación de condición

`damaged` o una condición observada se conserva como evidencia de conteo.

Se preserva:

```text
COUNT_CONDITION_OBSERVED
!=
DAMAGE_CONFIRMED
```

La transición técnica confirmada pertenece al contrato de `NEXO-AUTH-026`.

#### 29. Faltante observado

`missing` significa que el recurso esperado no fue observado en el corte y alcance registrados.

No significa por sí solo:

- pérdida confirmada;
- transferencia;
- préstamo no devuelto;
- baja;
- robo;
- movimiento de ubicación;
- ajuste contable.

La investigación decide el siguiente owner.

#### 30. Extra observado

`extra` describe una discrepancia frente al conjunto o cantidad esperados.

No crea automáticamente:

- identidad de activo;
- propiedad;
- custodia;
- cantidad maestra;
- saldo de inventario;
- alta patrimonial.

#### 31. Cierre de captura

Cerrar captura exige, como mínimo:

- sesión abierta;
- todas las líneas requeridas resueltas como observación;
- revisiones vigentes;
- ninguna escritura concurrente incompatible;
- autorización exacta para cerrar;
- auditoría del cierre.

Cerrar congela la captura y habilita revisión de diferencias; no aprueba diferencias.

#### 32. Cancelación

Cancelar una sesión debe ser una decisión distinta del cierre normal.

La cancelación conserva:

- motivo;
- actor;
- timestamp;
- observaciones existentes;
- estado previo;
- evidencia necesaria para auditoría.

No puede usarse para borrar una diferencia ya observada.

#### 33. Derivación de diferencias

Una diferencia se deriva comparando snapshot esperado y observación preservada.

Como mínimo pueden existir categorías equivalentes a:

- faltante;
- exceso;
- ubicación distinta;
- condición distinta;
- cantidad distinta;
- observación no aplicable que requiera revisión.

La clasificación derivada no altera el maestro.

#### 34. Revisión de diferencia

Revisar una diferencia significa reunir evidencia suficiente para decidir su tratamiento.

La revisión puede consultar información permitida, pero no hereda autoridad para aprobar o ejecutar cambios.

#### 35. Aprobación de diferencia

Aprobar una diferencia significa aceptar formalmente que la discrepancia debe seguir un tratamiento autorizado.

No equivale a ejecutar ese tratamiento.

Regla:

```text
VARIANCE_APPROVED
!=
DOMAIN_MUTATION_APPLIED
```

#### 36. Resolución de diferencia

Resolver una diferencia registra la decisión final de tratamiento y su resultado documental.

Una resolución puede concluir, según evidencia:

- sin cambio al maestro;
- requiere corrección de ubicación;
- requiere investigación o transición de custodia;
- requiere ciclo de daño/pérdida;
- requiere corrección administrativa del activo;
- requiere una acción de otro dominio.

La mutación posterior conserva su propia autorización.

#### 37. Segregación de capacidades

Se preserva:

```text
CAPTURE
!=
CLOSE
!=
APPROVE
!=
RESOLVE
```

El mismo actor solo podrá acumular más de una capacidad cuando la matriz canónica aplicable las conceda de forma independiente.

No se infiere segregación absoluta de personas cuando la matriz no la exige, pero nunca se colapsan las decisiones de autorización.

#### 38. Separación entre sesión y diferencia

La sesión contiene observaciones.

La diferencia representa una discrepancia derivada y su ciclo de decisión.

No se acepta usar simplemente `session.status = closed` como evidencia de que todas las diferencias fueron aprobadas o resueltas.

#### 39. Versionado y concurrencia

Toda mutación futura debe detectar conflictos sobre:

- sesión;
- línea;
- observación;
- estado de cierre;
- decisión de diferencia.

Una escritura basada en revisión obsoleta debe denegarse o reconciliarse explícitamente; nunca sobrescribir silenciosamente una observación ajena.

#### 40. Idempotencia

Reintentos de:

- apertura;
- captura;
- cierre;
- cancelación;
- aprobación;
- resolución;

deben producir como máximo un efecto lógico por intención autorizada.

Un timeout no autoriza a emitir una segunda operación con nueva identidad sin consultar el estado de la primera.

#### 41. Atomicidad de cierre

El cierre no debe quedar parcialmente aplicado entre:

- estado de sesión;
- snapshot final;
- evidencia de líneas;
- derivación de diferencias requerida.

Si no puede demostrarse consistencia, el cierre falla cerrado.

#### 42. Correcciones posteriores

027 no aplica directamente una corrección patrimonial solo porque una diferencia fue aprobada o resuelta.

La corrección se deriva al owner correspondiente:

- administración del activo: `NEXO-AUTH-024`;
- custodia o responsable: `NEXO-AUTH-025`;
- daño, pérdida, recuperación o baja: `NEXO-AUTH-026`;
- retiro de autorización legacy: `NEXO-AUTH-029`.

Cada owner revalida su propia capacidad, recurso, territorio y estado.

#### 43. Ajustes de stock

Un permiso de ajuste de inventario no autoriza por inferencia una corrección de activo o reutilizable patrimonial.

`ASSET_COUNT` y `INVENTORY_ADJUSTMENT` mantienen recursos y autoridades distintas.

#### 44. Custodia y conteo

Ser custodio no concede permiso de captura, cierre, aprobación o resolución.

A la inversa, contar un activo no cambia custodio ni responsable.

#### 45. Ubicación y conteo

Una ubicación observada distinta puede producir una diferencia, pero la actualización del maestro sigue el contrato de ubicación aplicable.

El conteo no teletransporta recursos.

#### 46. Daño, pérdida y conteo

027 conserva el handoff a 026:

```text
DAMAGED_OBSERVED
!=
DAMAGE_CONFIRMED

MISSING_OBSERVED
!=
LOSS_CONFIRMED
```

La observación puede abrir investigación, no cerrarla.

#### 47. LPN y contenido

Un conteo de activo no cambia por inferencia:

- membresía de LPN;
- contenido de LPN;
- estado del LPN;
- identidad de contenedor físico.

Estas responsabilidades conservan sus owners canónicos.

#### 48. Kits

Una diferencia sobre un kit puede señalar incompletitud, pero no desarma automáticamente el kit ni crea/baja componentes.

La identidad y reglas de completitud permanecen separadas de la autorización de conteo.

#### 49. Dispositivo compartido

Una estación, escáner o dispositivo compartido no es el actor autorizado.

Toda decisión sensible conserva:

```text
ACTOR HUMANO EFECTIVO
+ SESION
+ CONTEXTO
+ CAPACIDAD
```

No se acepta una sesión técnica del dispositivo como sustituto del principal humano.

#### 50. Simulación

La simulación de autorización puede mostrar la decisión esperada, pero:

- no abre sesiones;
- no guarda observaciones;
- no cierra;
- no cancela;
- no aprueba;
- no resuelve;
- no modifica activos.

Simular conserva cero mutaciones empresariales.

#### 51. Operación offline

Cuando exista captura offline autorizada, el dispositivo conserva intención y evidencia local, no autoridad permanente.

Al reconectar se revalida como mínimo:

- actor;
- capacidad;
- sesión aún abierta;
- línea aún vigente;
- scope;
- revisión;
- conflicto concurrente.

Una observación offline nunca aprueba una diferencia automáticamente.

#### 52. Auditoría mínima

Cada decisión futura debe conservar, según aplique:

- actor;
- sujeto;
- sesión;
- línea;
- acción;
- capacidad evaluada;
- scope;
- territorio;
- snapshot o revisión;
- antes y después de la decisión;
- motivo;
- evidencia;
- idempotency key o correlación;
- resultado;
- error o denegación;
- timestamps relevantes.

#### 53. Errores y denegación segura

Ante:

- permiso ausente;
- scope insuficiente;
- sesión cerrada o cancelada;
- línea ajena al conjunto;
- revisión obsoleta;
- actor no resoluble;
- conflicto concurrente;
- recurso no compatible;
- timeout de estado desconocido;

la operación no aplica mutación y retorna una decisión segura y auditable.

#### 54. Frontera con `NEXO-AUTH-024`

024 conserva consulta y administración del maestro de activos y reutilizables.

027 puede producir una diferencia que requiera corrección administrativa, pero no usa el conteo para evadir la autoridad de 024.

#### 55. Frontera con `NEXO-AUTH-025`

025 conserva custodia, préstamo, devolución, transferencia y responsable.

Un `missing` o `found_elsewhere` no cambia custodia por inferencia.

#### 56. Frontera con `NEXO-AUTH-026`

026 conserva daño, pérdida, recuperación, mantenimiento y baja.

Un `damaged` o `missing` observado solo genera evidencia para ese ciclo cuando corresponda.

#### 57. Frontera con `NEXO-AUTH-028`

Imprimir o reimprimir hojas, etiquetas, QR o soportes de conteo no hereda autorización desde la sesión.

La impresión permanece gobernada por 028.

#### 58. Frontera con `NEXO-AUTH-029`

027 fija que `inventory.stock` no es autoridad final para conteo de activos.

029 conserva el retiro físico de aliases, guards y fallbacks legacy cuando los reemplazos específicos válidos estén disponibles y verificados.

#### 59. Frontera con `NEXO-AUTH-030`

030 ejecutará pruebas integrales del subdominio sobre las protecciones materializadas.

027 define los oracles de separación, denegación segura, idempotencia y no mutación automática que 030 deberá consumir.

#### 60. Estado AS-IS consolidado

La situación observada queda:

| Superficie | Estado actual | Brecha |
| --- | --- | --- |
| consulta de conteos de activos | existe superficie y `nexo.assets.counts.view` en catálogo, pero consumidor usa `inventory.stock` | guard efectivo no canónico |
| creación de sesión | implementada bajo `inventory.stock` | sin capacidad activa exacta compatible observada |
| captura de línea | implementada bajo `inventory.stock` | sin capacidad activa exacta compatible observada |
| cierre | implementado bajo `inventory.stock` | se confunde ejecución con guard amplio |
| cancelación | implementada bajo `inventory.stock` | se confunde decisión con guard amplio |
| aprobación de diferencia de activos | ciclo completo no observado | capacidad exacta compatible no demostrada |
| resolución de diferencia de activos | ciclo completo no observado | capacidad exacta compatible no demostrada |

027 documenta la protección objetivo; no afirma que esté físicamente materializada.

#### 61. Condición de salida de `AUTH021-F-008`

El hallazgo se considera materialmente resuelto solo cuando:

1. lectura usa la capacidad compatible de `ASSET_COUNT`;
2. cada mutación de sesión usa capacidad exacta compatible o permanece denegada;
3. captura no concede cierre;
4. cierre no concede aprobación;
5. aprobación no concede resolución;
6. resolución no muta otro dominio sin autorización propietaria;
7. `inventory.stock` deja de ser oracle final;
8. tests de allow/deny, scope, revisión, idempotencia y concurrencia resultan PASS.

El marcador documental no satisface por sí solo esa salida física.

#### 62. Política para futura capacidad exacta

Si el catálogo incorpora capacidades atómicas de `ASSET_COUNT`, cada una debe declarar explícitamente:

- identidad estable;
- descripción;
- modalidad base/operativa;
- scope;
- recurso;
- ownership y relaciones;
- prerrequisitos;
- grants y denials;
- simulación;
- consumidor backend;
- campos permitidos;
- auditoría;
- tests.

027 no inventa nombres ni grants futuros.

#### 63. Rollback futuro

Una materialización física debe poder revertir el cambio de guard o consumidor sin borrar:

- sesiones creadas válidamente;
- observaciones ya registradas;
- historial de decisiones;
- evidencia de diferencias;
- auditoría.

Rollback técnico no equivale a borrar hechos empresariales.

#### 64. Requisitos de prueba derivados

**Resultado:** NO GENERA REQUISITOS DE PRUEBA.

**Requisitos creados:** 0

**Requisitos modificados:** 0

**Requisitos diferidos:** 0

**Requisitos obsoletos:** 0

Justificación: el registro vigente ya exige que el conteo sea una observación no destructiva, que la diferencia se investigue, que cualquier ajuste requiera decisión autorizada y que el dominio de activos preserve observaciones y diferencias auditables. 027 especializa la separación de autorización sin crear una obligación de prueba nueva.

#### 65. Cobertura de prueba vigente reutilizada

Sin modificar el registro se reutiliza:

- `TREQ-NEXO-011` para conteo como observación, diferencia investigada, ajuste autorizado, atomicidad, idempotencia y concurrencia;
- `TREQ-NEXO-013` para conteo de activos no destructivo, observación original, diferencias auditables y ausencia de baja o ajuste automático;
- `TREQ-AUTH-001` para evaluación mediante permiso, contexto y scope canónicos;
- `TREQ-AUTH-013` para autorización server-side exacta, actor, territorio, estado y campos permitidos.

Estas referencias son trazabilidad existente y no modifican 04A.

#### 66. Evidencia de validación

| Clase | Estado | Evidencia |
| --- | --- | --- |
| BUILD | NOT_EXECUTED | el marcador global no materializa código; la batería local ejecutará la compilación documental antes del cierre |
| LOCAL | NOT_EXECUTED | no se ejecutaron scripts sobre el checkout local del usuario durante la elaboración del artefacto |
| REMOTA | PASS | se contrastaron protocolo, contratos documentales, topología `PER_IMPLEMENTATION_UNIT / POST_E5_PACKAGE`, `NEXO-AUTH-021`, la tarea 026 aprobada usada como base, catálogo y matrices de autorización, registro modular NEXO y el consumidor `vento-nexo`; las superficies de conteo de activos continúan bajo `inventory.stock`, `nexo.assets.counts.view` es lectura de `ASSET_COUNT`, `nexo.inventory.stock_counts.perform` gobierna `STOCK_COUNT` y no se observó un ciclo completo de aprobación/resolución de diferencias de activos |
| OPERATIVA | NOT_EXECUTED | no se abrió, capturó, cerró, canceló, aprobó ni resolvió ningún conteo real durante esta tarea |
| FÍSICA | NOT_EXECUTED | no existe materialización `NEXO-AUTH-027::<implementation_unit_id>` ejecutada desde este marcador documental |

#### 67. Criterios de aceptación

- [x] se separan apertura, captura, cierre, cancelación, aprobación y resolución;
- [x] `assets.counts.view` permanece solo lectura;
- [x] `ASSET_COUNT` y `STOCK_COUNT` permanecen recursos distintos;
- [x] `stock_counts.perform` no se presta a activos por inferencia;
- [x] las capacidades de variación de stock no se prestan a diferencias de activos por nombre;
- [x] las mutaciones de `ASSET_COUNT` sin capacidad exacta compatible quedan en `DEFAULT_DENY`;
- [x] `inventory.stock` se rechaza como autoridad final;
- [x] el conjunto esperado se congela como snapshot de sesión;
- [x] la captura conserva observación original;
- [x] cantidad esperada y observada permanecen separadas;
- [x] ubicación observada no actualiza ubicación maestra automáticamente;
- [x] condición observada no confirma daño automáticamente;
- [x] faltante observado no confirma pérdida;
- [x] extra observado no crea identidad ni saldo automáticamente;
- [x] cerrar captura no aprueba diferencias;
- [x] cancelar no borra evidencia;
- [x] aprobar diferencia no ejecuta mutación de dominio;
- [x] resolver diferencia no evade el permiso del owner downstream;
- [x] el mismo actor requiere cada capacidad de forma independiente;
- [x] se preservan idempotencia y control de concurrencia;
- [x] dispositivo compartido no se convierte en actor;
- [x] offline revalida al reconectar;
- [x] simulación conserva cero mutaciones;
- [x] se preservan fronteras con 024, 025, 026, 028, 029 y 030;
- [x] no se modifica Supabase;
- [x] no se crean ni modifican `PermissionKey`;
- [x] no se modifican TREQ;
- [x] no se modifica 04A;
- [x] la futura materialización conserva `PER_IMPLEMENTATION_UNIT / POST_E5_PACKAGE`.

#### 68. Límites

Esta tarea no:

- crea ni modifica `PermissionKey`;
- modifica grants base u operativos;
- crea roles;
- crea Server Actions;
- crea Route Handlers;
- crea RPC;
- modifica RLS;
- crea migraciones;
- modifica Supabase;
- modifica datos;
- abre sesiones reales;
- captura conteos reales;
- cierra sesiones reales;
- cancela sesiones reales;
- aprueba diferencias reales;
- resuelve diferencias reales;
- modifica `asset_items`;
- modifica `asset_groups`;
- modifica `asset_count_sessions`;
- modifica `asset_count_lines`;
- modifica ubicación real;
- cambia custodia;
- declara daño o pérdida;
- ejecuta baja;
- registra ajustes de stock;
- imprime o reimprime;
- retira físicamente permisos legacy;
- autoriza una instancia física;
- ejecuta certificación integral;
- crea ni modifica requisitos de prueba;
- modifica el registro 04A;
- desarrolla `NEXO-AUTH-028`.

#### 69. Continuidad

**ÚLTIMA TAREA APROBADA**
`NEXO-AUTH-026 — Proteger mantenimiento, daño, pérdida y baja`

**TAREA ACTUAL APROBADA**
`NEXO-AUTH-027 — Separar captura de conteo y aprobación de diferencias`

**SIGUIENTE TAREA RESERVADA**
`NEXO-AUTH-028 — Proteger impresión y reimpresión mediante permisos atómicos`
### ✅ NEXO-AUTH-028 — Proteger impresión y reimpresión mediante permisos atómicos

**Estado:** APROBADA
**Tarea anterior:** NEXO-AUTH-027 — Separar captura de conteo y aprobación de diferencias
**Tarea siguiente:** NEXO-AUTH-029 — Eliminar dependencia de permisos amplios legacy
**Tipo de tarea:** Contrato global con materialización por unidad (`PER_IMPLEMENTATION_UNIT`) y gate físico `POST_E5_PACKAGE` — contrato NEXO para proteger impresión original, retry, conciliación, cancelación y reimpresión mediante autoridad server-side exacta, permisos atómicos compatibles con `VENTO-PRINT-AUTHORIZATION`, segregación cuando corresponda, identidad durable de copia, idempotencia, resultado verificable y `DEFAULT_DENY` mientras la capacidad objetivo no exista como `PermissionKey` activa
**Bloque:** BLOQUE K — NEXO
**Repositorio propietario:** `vento-group-sas/vento-shell`
**Archivo propietario:** `docs/plan-canonico/modular/bloques/K_NEXO/03_AUTORIZACION_DE_INVENTARIO_LOGISTICA_Y_ACTIVOS.md`
**Estado físico resultante:** `ESPECIFICADO_NO_MATERIALIZADO`
**Cambios físicos autorizados:** 0 durante este marcador global; cualquier materialización futura ocurre únicamente mediante `NEXO-AUTH-028::<implementation_unit_id>` después de cumplir el gate físico aplicable y contar con autorización física explícita
**Requisitos de prueba creados o modificados:** 0

---

#### 1. Propósito

Proteger la producción de una copia física y la creación deliberada de copias adicionales para que imprimir, reintentar, conciliar o reimprimir no pueda ejecutarse por autenticación sola, visibilidad de una pantalla, conocimiento de una URL, posesión del QR, capacidad de lectura, permiso de edición de plantilla, permiso legacy amplio, presencia de una impresora local, selección de un dispositivo, parámetro de URL, estado en `localStorage` ni llamada directa desde el navegador.

La regla raíz queda:

```text
AUTORIDAD SOBRE RECURSO FUENTE
+ ACCION DE IMPRESION EXACTA
+ CAPACIDAD ATOMICA ACTIVA CUANDO EXISTA
+ ACTOR EFECTIVO
+ SCOPE AUTORIZADO
+ SNAPSHOT INMUTABLE
+ IDENTIDAD DE COPIA
+ IDEMPOTENCIA
+ ESTADO DE RESULTADO
+ DISPOSITIVO Y RUTA ELEGIBLES
+ SEGREGACION CUANDO APLIQUE
+ AUDITORIA
→ ACCION AUTORIZABLE
```

Cuando la capacidad objetivo todavía no exista como `PermissionKey` activa:

```text
ACCION DE IMPRESION SIN CAPACIDAD ATOMICA ACTIVA COMPATIBLE
→ DEFAULT_DENY
```

#### 2. Naturaleza y topología

El marcador global conserva:

```text
mode = PER_IMPLEMENTATION_UNIT
execution_gate = POST_E5_PACKAGE
```

La identidad física futura es:

```text
NEXO-AUTH-028::<implementation_unit_id>
```

La aprobación documental de este marcador no crea, autoriza ni ejecuta una instancia física.

#### 3. Handoff contractual recibido desde `NEXO-AUTH-021`

La auditoría previa registró `AUTH021-F-009`:

```text
IMPRESION / REIMPRESION DE QR
SIN PERMISO ATOMICO ACTIVO OBSERVADO
→ ATOMIC_PERMISSION_GAP
```

Además entregó a 028 la obligación de separar impresión y reimpresión de:

- consultar un trabajo;
- editar una plantilla;
- descargar una imagen;
- visualizar un QR.

La salida física y la reimpresión deben conservar actor, recurso, dispositivo, motivo cuando corresponda y resultado.

#### 4. Handoff contractual recibido desde `NEXO-AUTH-027`

027 mantiene impresión y reimpresión fuera del ciclo de conteo y las entrega sin absorción a 028.

Por tanto:

- cerrar un conteo no concede impresión;
- aprobar o resolver una diferencia no concede impresión;
- una observación de QR o activo no concede reimpresión;
- 028 no modifica decisiones de captura, diferencia ni ajuste.

#### 5. Contratos transversales consumidos

028 consume, sin redefinir, los contratos aprobados del servicio transversal de impresión:

- `VENTO-PRINT-JOB` `1.0.0`;
- `VENTO-PRINT-IDEMPOTENCY` `1.0.0`;
- `VENTO-PRINT-RETRY-QUEUE` `1.0.0`;
- `VENTO-PRINT-CONFIRMATION` `1.0.0`;
- `VENTO-PRINT-CANCELLATION-EXPIRATION` `1.0.0`;
- `VENTO-PRINT-REPRINT` `1.0.0`;
- `VENTO-PRINT-AUTHORIZATION` `1.0.0`;
- `VENTO-PRINT-OFFLINE-CONTINGENCY` `1.0.0`.

El servicio transversal conserva la semántica de job, copy, retry, receipt, reimpresión, dispositivo, ruta, privacidad, contingencia y auditoría.

#### 6. Entrada de dominio y experiencia

Se conserva la integración ya asignada a:

- `NEXO-DOM-018 — Integrar etiquetas LOC, LPN, activos y documentos con BLOQUE E4`;
- `NEXO-UX-037 — Diseñar impresión de LOC, LPN, activo y documento`;
- `NEXO-UX-038 — Diseñar operación con escáner y etiquetas dañadas`.

028 define autorización y segregación. No reemplaza el diseño de experiencia, el contrato transversal ni la identidad de dominio.

#### 7. Catálogo activo NEXO observado

Dentro del catálogo activo relevante, las claves de impresión actualmente existentes que 028 puede tratar como canónicas son:

| Clave activa | Acción autorizable por esa clave | No autoriza por implicación |
| --- | --- | --- |
| `nexo.printing.jobs.view` | consultar trabajos y estados permitidos | crear trabajo, imprimir, retry, cancelar, conciliar o reimprimir |
| `nexo.printing.templates.update` | actualizar plantillas dentro de su contrato | imprimir, reimprimir, consultar payload protegido, administrar cola o emitir copias |

Ninguna de estas dos claves constituye un permiso de salida física.

#### 8. Catálogo objetivo de E4 relevante para 028

`PRINT-ARC-015` define catorce claves objetivo para el servicio. De ellas, dos ya existen y doce son capacidades objetivo todavía no materializadas.

Las acciones directamente relevantes para esta tarea son:

| Acción | Clave objetivo | Estado documental actual |
| --- | --- | --- |
| consultar trabajo | `nexo.printing.jobs.view` | `EXISTING_CANONICAL` |
| crear primera copia manual | `nexo.printing.jobs.create` | `TARGET_ADDITION` |
| cancelar trabajo | `nexo.printing.jobs.cancel` | `TARGET_ADDITION` |
| retry de la misma copia | `nexo.printing.jobs.retry` | `TARGET_ADDITION` |
| conciliar resultado desconocido | `nexo.printing.jobs.reconcile` | `TARGET_ADDITION` |
| solicitar reimpresión | `nexo.printing.reprints.request` | `TARGET_ADDITION` |
| aprobar reimpresión cuando la política lo exija | `nexo.printing.reprints.approve` | `TARGET_ADDITION` |
| actualizar plantilla | `nexo.printing.templates.update` | `EXISTING_CANONICAL` |

`TARGET_ADDITION` describe una capacidad objetivo aprobada documentalmente. No significa que la clave exista ya en runtime.

#### 9. Regla de materialización de capacidades objetivo

Mientras una clave `TARGET_ADDITION` no haya sido materializada mediante el proceso canónico de catálogo, contratos, tipos, consumidores y migraciones de `vento-shell`, la acción asociada no puede recibir un alias permisivo.

Por tanto:

```text
TARGET_ADDITION
!=
PERMISSION KEY ACTIVA
```

Y:

```text
CLAVE OBJETIVO AUSENTE
→ DEFAULT_DENY
```

028 no inventa una clave sustituta ni reutiliza otra por parecido semántico.

#### 10. Tres planos de autoridad preservados

La protección conserva los tres planos definidos por `VENTO-PRINT-AUTHORIZATION`:

```text
BUSINESS_SOURCE
PRINT_ACTION
SERVICE_ADMINISTRATION
```

Reglas:

- autoridad sobre el recurso fuente no equivale a administrar impresión;
- administrar impresoras o plantillas no equivale a imprimir;
- operar una cola no equivale a aprobar una reimpresión;
- el servicio técnico no puede crear autoridad empresarial;
- una acción que cruza planos exige la intersección de todas las autoridades aplicables.

#### 11. Impresión original automática

Una primera copia automática prevista por un proceso solo puede ejecutarse cuando exista una decisión fuente verificable que congele:

- recurso fuente;
- versión o snapshot;
- output permitido;
- cantidad de copias autorizadas;
- actor o decisión autorizante;
- vigencia;
- correlación.

El principal técnico puede completar la copia admitida dentro de su delegación mínima. No puede ampliar cantidad, cambiar snapshot ni emitir otra copia por iniciativa propia.

#### 12. Impresión original manual

Una primera copia iniciada manualmente exige, como mínimo:

```text
AUTORIDAD SOBRE RECURSO FUENTE
+
nexo.printing.jobs.create ACTIVA
+
SCOPE EXACTO
+
SNAPSHOT INMUTABLE
+
ADMISION IDEMPOTENTE
```

Mientras `nexo.printing.jobs.create` no exista como capacidad activa compatible, la creación manual de una nueva copia queda en `DEFAULT_DENY`.

#### 13. Consulta no equivale a impresión

`nexo.printing.jobs.view` solo permite consulta dentro de su scope.

Regla:

```text
JOB_VIEW
!=
DIRECT_PRINT
!=
RETRY
!=
REPRINT
```

Ver un trabajo, estado, preview o cola nunca constituye autoridad para producir una copia física.

#### 14. Edición de plantilla no equivale a impresión

`nexo.printing.templates.update` permite editar una plantilla conforme a su contrato.

No concede por sí sola:

- creación de trabajo;
- impresión;
- retry;
- reimpresión;
- cancelación;
- conciliación;
- lectura del recurso empresarial fuente.

#### 15. Preview no equivale a salida física

Una vista previa puede demostrar correspondencia de diseño, pero no es una decisión de impresión.

```text
PREVIEW
!=
PRINT AUTHORIZATION
```

Aprobar visualmente una etiqueta tampoco crea una copia, un permiso ni un receipt físico.

#### 16. Descargar QR no equivale a imprimir

Obtener una copia local de una imagen o abrir un QR no constituye una acción de impresión autorizada.

La autorización de lectura o descarga se rige por el recurso fuente y su política de campos. 028 solo establece que esa capacidad no se puede convertir en permiso de impresión o reimpresión.

#### 17. Impresión desde navegador sigue siendo acción gobernada

Usar `window.print()` no crea una excepción al contrato.

Una salida iniciada desde navegador sigue siendo una copia física y requiere la misma autoridad empresarial y de impresión que cualquier otro canal.

La ausencia de cola durable no convierte la acción en inocua ni la libera de autorización.

#### 18. Impresión por BrowserPrint sigue siendo acción gobernada

Seleccionar una Zebra local, detectar BrowserPrint o disponer de `device.send` no concede permiso.

```text
PRINTER DISCOVERED
!=
PRINT AUTHORIZED
```

El dispositivo es destino técnico. No es actor autorizante.

#### 19. Parámetros de URL no conceden autoridad

Valores recibidos mediante `preset`, `queue`, `title`, `append`, `layout` u otros parámetros de navegación son intención de cliente.

Nunca pueden decidir:

- permiso;
- actor;
- scope;
- cantidad autorizada;
- recurso fuente;
- reimpresión;
- resultado de impresión.

Todo dato material se revalida desde fuentes autoritativas antes de crear o despachar una copia.

#### 20. `localStorage` no es fuente de autorización

La cola local vigente puede conservar conveniencia de UI, pero no es autoridad de negocio, deduplicación, vigencia ni resultado.

No puede demostrar:

- que una copia está autorizada;
- que nunca se imprimió;
- que un retry es seguro;
- que una reimpresión fue aprobada;
- que otra estación no ejecutó la misma intención.

#### 21. AS-IS de acciones QR de activo individual

El consumidor vigente de activo individual expone acciones cliente para:

- enviar datos a `/printing/jobs`;
- imprimir etiqueta con `window.print()`;
- imprimir QR con `window.print()`;
- descargar QR.

La superficie se alcanza desde un área de activos cuyo guard histórico amplio pertenece a la deuda legacy ya auditada.

Estas acciones cliente no demuestran por sí mismas una decisión server-side específica de impresión o reimpresión.

#### 22. AS-IS de acciones QR de grupo de activos

El consumidor vigente de grupo expone acciones cliente para:

- imprimir QR con `window.print()`;
- descargar QR.

La acción física no tiene una capacidad atómica activa específica observada que pueda inferirse de la mera disponibilidad del componente.

#### 23. AS-IS de `/printing/jobs`

La superficie vigente:

- es cliente;
- construye cola desde parámetros y `localStorage`;
- genera ZPL;
- detecta dispositivos BrowserPrint;
- selecciona una impresora local;
- llama directamente al envío del dispositivo;
- informa éxito o error mediante callback;
- puede usar impresión del navegador.

No se observó en esa superficie una decisión server-side por acción equivalente al contrato objetivo de impresión y reimpresión.

#### 24. Brecha de retiro prematuro de cola

El consumidor actual contiene caminos en los que la cola local se limpia inmediatamente después de invocar el envío, antes de disponer de una confirmación durable del resultado.

Por tanto:

```text
SEND INVOKED
!=
RESULT DURABLY KNOWN
```

Una copia no puede considerarse resuelta ni retirarse definitivamente de la intención durable antes del resultado correspondiente.

#### 25. Callback de éxito no equivale a impresión física confirmada

El callback exitoso del adaptador puede demostrar aceptación técnica en un nivel determinado.

No demuestra automáticamente:

- papel o etiqueta producidos correctamente;
- legibilidad;
- entrega al destinatario;
- ausencia de doble impresión;
- cierre físico definitivo.

La evidencia conserva el nivel real de confirmación disponible.

#### 26. Identidad durable de la copia

Cada copia legítima conserva, según los contratos E4:

- intención empresarial;
- `job_id`;
- identidad de copia;
- clave de idempotencia;
- huella semántica;
- snapshot;
- plantilla y versión;
- output;
- actor o principal;
- ruta y dispositivo;
- intentos;
- receipts;
- resultado.

Una segunda ejecución técnica no crea una segunda intención.

#### 27. Retry no equivale a reimpresión

Regla obligatoria:

```text
RETRY
!=
REPRINT
```

Retry intenta completar la misma copia y conserva identidad empresarial de la copia.

Reimpresión crea una copia adicional deliberada, enlazada al original y gobernada por una nueva autorización.

#### 28. Resultado desconocido bloquea repetición ciega

Si una operación pudo haber sido aceptada y se pierde el callback, ocurre timeout, desconexión o incertidumbre equivalente:

```text
RESULT_UNKNOWN
→ NO BLIND RETRY
→ NO AUTOMATIC REPRINT
→ RECONCILE FIRST
```

La incertidumbre no se resuelve enviando otra copia.

#### 29. Conciliación es acción separada

La conciliación de resultado desconocido pertenece a `nexo.printing.jobs.reconcile` cuando esa capacidad exista activa.

Conciliar:

- no crea copia;
- no borra intentos previos;
- no inventa receipt;
- no sustituye evidencia;
- no autoriza reimpresión por sí sola.

#### 30. Reimpresión como copia adicional deliberada

Una reimpresión solo existe cuando se pretende producir una copia física adicional del mismo snapshot ya resuelto.

Debe conservar como mínimo:

- original referenciado;
- snapshot original;
- causa;
- cantidad solicitada;
- actor solicitante;
- autoridad sobre el recurso fuente;
- scope;
- destino permitido;
- política de segregación;
- decisión de aprobación cuando aplique;
- nueva identidad de copia;
- vínculo causal con el original.

#### 31. Solicitud de reimpresión

La solicitud usa la capacidad objetivo:

```text
nexo.printing.reprints.request
```

Mientras no exista activa, no se autoriza mediante:

- `jobs.view`;
- `templates.update`;
- `inventory.stock`;
- permiso del recurso fuente aislado;
- posesión del documento;
- selección de impresora;
- botón visible.

#### 32. Aprobación de reimpresión

Cuando el perfil transversal exija segregación, se requiere además:

```text
nexo.printing.reprints.approve
```

La aprobación:

- se evalúa de forma independiente;
- conserva actor aprobador;
- conserva decisión y motivo;
- exige actor distinto cuando la política use segregación dual;
- no puede ser sustituida por el principal técnico.

#### 33. Perfiles de segregación preservados

028 consume los perfiles E4:

```text
NONE
POLICY_CONDITIONAL
DISTINCT_ACTOR_REQUIRED
```

La política del recurso fuente determina cuándo una reimpresión operativa puede resolverse con solicitud válida y cuándo requiere aprobación separada.

#### 34. Reimpresión no modifica el hecho empresarial

Una copia adicional no puede:

- emitir otra venta;
- repetir un pago;
- duplicar una factura;
- duplicar una remisión;
- duplicar un movimiento;
- cambiar lote;
- cambiar inventario;
- alterar el activo;
- modificar custodia;
- crear un nuevo cierre empresarial.

La reimpresión reproduce un snapshot; no repite el hecho fuente.

#### 35. Versión corregida no es reimpresión

Si cambian datos materiales del recurso, documento, cantidad, destinatario, periodo, precio, identidad, estado o versión:

```text
CORRECTED_VERSION
!=
REPRINT
```

Corresponde un nuevo trabajo empresarial conforme al owner del recurso, no una reimpresión del snapshot anterior.

#### 36. Identidad QR permanece estable

Reimprimir o sustituir una etiqueta dañada no crea una identidad nueva del activo, grupo, LPN, LOC, contenedor o documento.

Para activos:

```text
QR REPRINT
!=
NEW ASSET IDENTITY
```

El nuevo soporte físico debe representar la misma identidad canónica cuando la intención sea sustitución o reimpresión del mismo identificador.

#### 37. Etiqueta dañada no autoriza reimpresión automática

Detectar que una etiqueta está dañada, ilegible o ausente constituye una causa posible según política.

No constituye por sí sola:

- autorización;
- aprobación;
- cantidad libre;
- permiso para cambiar el identificador;
- permiso para alterar el recurso fuente.

#### 38. Cambio de impresora no crea reimpresión

Cambiar de dispositivo o canal para completar una copia no resuelta es routing o retry técnico.

No crea una reimpresión mientras se conserve la identidad de copia y la política permita el cambio.

#### 39. Offline no crea autoridad nueva

La pérdida de conectividad no permite crear una nueva impresión o reimpresión no autorizada.

La operación offline solo puede completar una copia ya admitida dentro de un envelope finito y vigente conforme a `VENTO-PRINT-OFFLINE-CONTINGENCY`.

Una nueva reimpresión exige revalidación autoritativa en línea.

#### 40. Dispositivo compartido no es actor

Una estación compartida, impresora, BrowserPrint, puente local, navegador o dispositivo técnico no sustituye al actor efectivo.

Toda acción humana conserva identidad del actor y contexto de autorización aplicable.

#### 41. UI no es barrera de seguridad

Ocultar un botón, deshabilitar un control o no mostrar una ruta mejora experiencia, pero no constituye autorización.

Las decisiones de creación, retry, conciliación y reimpresión deben fallar cerrado en servidor o en el componente autoritativo del servicio antes de cualquier mutación durable o despacho físico.

#### 42. Revalidación antes de despacho

Aunque el trabajo haya sido autorizado previamente, el gate predespacho revalida lo que pueda haber cambiado materialmente:

- vigencia;
- cancelación;
- scope;
- recurso;
- política;
- privacidad;
- elegibilidad de ruta;
- estado de copia;
- restricción de reimpresión.

La impresora no recibe un trabajo que ya no sea despachable conforme a la decisión vigente.

#### 43. Idempotencia de creación

La creación de una primera copia usa identidad estable y deduplicación autoritativa.

Doble toque, refresh, reconexión, otra estación, callback repetido o nueva clave cliente no pueden crear una segunda copia semánticamente equivalente sin autorización adicional.

#### 44. Idempotencia de reimpresión

Una misma solicitud de reimpresión repetida por red o cliente debe resolver a la misma solicitud/copia admitida.

Cambiar arbitrariamente una clave de cliente no puede evadir la huella semántica ni crear otra copia adicional.

#### 45. Concurrencia

Dos actores o estaciones no pueden crear simultáneamente copias equivalentes sin que la capa autoritativa resuelva una única admisión o dos copias expresamente autorizadas.

La autorización de varias copias debe existir antes de despachar y conservar identidades de copia diferenciadas.

#### 46. Cantidad de copias

La cantidad es parte de la autorización.

Una autorización para una copia no habilita dos, diez ni cantidad abierta.

Una reimpresión que solicite más de una copia adicional debe materializar cada copia legítima de forma identificable y conforme a la política de segregación.

#### 47. Auditoría mínima

Toda acción gobernada conserva, como mínimo cuando aplique:

- actor efectivo;
- principal técnico;
- acción exacta;
- permiso evaluado;
- recurso fuente;
- versión o snapshot;
- output;
- job y copy;
- solicitud de reimpresión;
- causa;
- cantidad;
- scope;
- ruta;
- dispositivo;
- decisión;
- timestamps;
- correlación;
- intentos;
- receipts;
- resultado conocido o desconocido.

#### 48. Denegación segura

La denegación de impresión o reimpresión no debe:

- crear job nuevo;
- modificar cola durable;
- despachar ZPL;
- abrir impresión física como fallback;
- consumir idempotency key de una operación permitida distinta;
- alterar el recurso fuente;
- producir una nueva identidad;
- ocultar el motivo de denegación en auditoría.

#### 49. Fallback no puede evadir autorización

Si BrowserPrint falla, la aplicación no puede convertir automáticamente la misma intención en `window.print()` para evadir una denegación de autorización.

El cambio de canal solo es legítimo dentro de una copia ya autorizada y una política de routing/fallback compatible.

#### 50. Frontera con `NEXO-AUTH-024`

024 sigue gobernando lectura y administración de activos y reutilizables.

028 no usa permiso de impresión para editar activos ni usa permiso de edición de activo para crear copias físicas por implicación.

#### 51. Frontera con `NEXO-AUTH-026`

Daño o pérdida de un activo, incluyendo daño de una etiqueta como evidencia asociada, no permite modificar condición, pérdida, baja o mantenimiento desde una acción de impresión.

028 solo gobierna la copia física y su autorización.

#### 52. Frontera con `NEXO-AUTH-027`

Conteo y diferencias no se modifican al imprimir.

Una etiqueta generada durante un conteo no aprueba diferencia, mueve ubicación, confirma pérdida ni cambia cantidad maestra.

#### 53. Frontera con `NEXO-AUTH-029`

029 recibe la eliminación física de `inventory.stock` y otros permisos amplios legacy como autoridad final.

028 define el reemplazo semántico exacto para impresión y reimpresión, pero no retira por sí sola el guard broad existente.

El retiro solo es válido cuando las capacidades exactas necesarias hayan sido materializadas y el consumidor correspondiente esté protegido.

#### 54. Frontera con `NEXO-AUTH-030`

030 ejecutará pruebas integrales del subdominio después de que las protecciones 022–029 estén materializadas.

028 no declara certificación integral ni evidencia física final de hardware.

#### 55. Frontera con el servicio transversal de impresión

E4 continúa siendo autoridad sobre:

- contrato de job;
- identidad de copia;
- routing;
- dispositivo;
- heartbeat;
- idempotencia;
- retry;
- receipts;
- cancelación;
- expiración;
- reimpresión;
- autorización transversal;
- privacidad;
- offline;
- adaptadores;
- monitoreo.

028 aplica esa autoridad al subdominio NEXO sin duplicar contratos.

#### 56. Materialización física futura

Cada `NEXO-AUTH-028::<implementation_unit_id>` deberá resolver su superficie concreta contra:

1. package propietario;
2. gate E5 aplicable;
3. capacidad exacta activa;
4. actor y principal;
5. recurso fuente;
6. job/copy/reprint identity;
7. scope territorial;
8. política transversal;
9. idempotencia;
10. estado de resultado;
11. auditoría;
12. rollback o recuperación aplicable.

Una unidad no puede materializar una clave objetivo ausente mediante alias local.

#### 57. Rollback de materialización

El rollback de una futura unidad deberá restaurar el consumidor anterior sin borrar evidencia ya producida y sin convertir un fallback legacy en autoridad nueva.

Si la capacidad exacta queda indisponible, la acción sensible vuelve a `DEFAULT_DENY` hasta recuperar una ruta autorizante compatible.

#### 58. Requisitos de prueba derivados

**Resultado:** NO GENERA REQUISITOS DE PRUEBA.

**Requisitos creados:** 0
**Requisitos modificados:** 0
**Requisitos diferidos:** 0
**Requisitos obsoletos:** 0

Justificación:

- la correspondencia entre preview y salida física ya está cubierta;
- la durabilidad, idempotencia, retry y prevención de duplicados ya están cubiertas;
- la estabilidad de identidad ante reimpresión de QR ya está cubierta;
- esta tarea especializa autorización y segregación sobre obligaciones vigentes sin crear un comportamiento de prueba empresarial nuevo.

#### 59. Cobertura de prueba vigente reutilizada

Se reutiliza, sin modificar el registro:

- `TREQ-NEXO-003` para correspondencia entre preview, plantilla, ZPL, DPI, dimensiones, códigos y muestra física;
- `TREQ-NEXO-005` para trabajo durable, resultado, error, retry, dispositivo, contenido, prevención de pérdida y duplicación;
- `TREQ-NEXO-013` para estabilidad de identidad de activos y prohibición de crear una identidad nueva al reimprimir o sustituir QR.

Esta trazabilidad no representa una actualización del registro de requisitos.

#### 60. Evidencia de validación

| Clase | Estado | Evidencia |
| --- | --- | --- |
| BUILD | NOT_APPLICABLE | tarea documental de contrato; no modifica producto ni genera build físico |
| LOCAL | NOT_EXECUTED | incorporación, formateo, quality, delivery, topología, plan y TREQ corresponden al checkout local al incorporar la tarea |
| REMOTA | PASS | se verificaron `vento-shell` main `1dd46a17d1f3751fb10b8d4886c50523bfc4d609`, `vento-nexo` main `f0a12557a1a258c84b025933653dc756de4b5a59`, owner de autorización, catálogo activo, contratos `PRINT-ARC-006/010/011/012/014/015/017`, requisitos NEXO y superficies vigentes de QR/BrowserPrint |
| OPERATIVA | NOT_EXECUTED | no se enviaron trabajos reales, no se ejecutaron reimpresiones y no se alteró una cola operativa |
| FÍSICA | NOT_EXECUTED | no se imprimieron etiquetas ni documentos y no se materializó ninguna instancia `NEXO-AUTH-028::<implementation_unit_id>` |

#### 61. Criterios de aceptación

- [x] impresión y reimpresión quedan separadas de lectura y edición de plantilla;
- [x] se distingue catálogo activo de catálogo objetivo;
- [x] `jobs.view` permanece solo lectura;
- [x] `templates.update` no concede salida física;
- [x] `jobs.create` se reconoce como capacidad objetivo, no activa;
- [x] `jobs.retry` se reconoce como capacidad objetivo, no activa;
- [x] `jobs.reconcile` se reconoce como capacidad objetivo, no activa;
- [x] `reprints.request` se reconoce como capacidad objetivo, no activa;
- [x] `reprints.approve` se reconoce como capacidad objetivo, no activa;
- [x] ausencia de capacidad activa produce `DEFAULT_DENY`;
- [x] `inventory.stock` no se acepta como autoridad final de impresión;
- [x] imprimir desde navegador no crea bypass;
- [x] BrowserPrint y dispositivo local no conceden autoridad;
- [x] parámetros de URL y `localStorage` no conceden autoridad;
- [x] preview no equivale a impresión;
- [x] descarga de QR no equivale a impresión;
- [x] se documenta el AS-IS de activo individual, grupos y `/printing/jobs`;
- [x] se conserva trabajo durable hasta conocer resultado suficiente;
- [x] callback técnico no se presenta como evidencia física superior a su nivel real;
- [x] retry y reimpresión permanecen acciones distintas;
- [x] `RESULT_UNKNOWN` bloquea repetición ciega;
- [x] reimpresión conserva causa, actor, original, snapshot, cantidad y decisión;
- [x] la segregación puede exigir aprobador distinto;
- [x] reimpresión no duplica el hecho empresarial;
- [x] versión corregida no se confunde con reimpresión;
- [x] reimpresión de QR no crea nueva identidad;
- [x] etiqueta dañada no autoriza reimpresión automática;
- [x] cambio de impresora no crea una copia nueva por sí mismo;
- [x] offline no crea autoridad nueva;
- [x] dispositivo compartido no es actor;
- [x] UI no se usa como barrera de seguridad;
- [x] existe revalidación predespacho;
- [x] creación y reimpresión conservan idempotencia y concurrencia;
- [x] cantidad de copias forma parte de la autorización;
- [x] auditoría mínima queda definida;
- [x] una denegación no produce efecto físico;
- [x] fallback no evade autorización;
- [x] se preservan fronteras con 024, 026, 027, 029, 030 y E4;
- [x] no se modifica Supabase;
- [x] no se crean ni modifican `PermissionKey` durante este marcador;
- [x] no se modifican TREQ;
- [x] no se modifica 04A;
- [x] la materialización futura conserva `PER_IMPLEMENTATION_UNIT / POST_E5_PACKAGE`.

#### 62. Límites

Esta tarea no:

- crea ni modifica `PermissionKey`;
- materializa las doce capacidades objetivo de `PRINT-ARC-015`;
- modifica grants base u operativos;
- crea roles;
- crea Server Actions;
- crea Route Handlers;
- crea RPC;
- modifica RLS;
- crea migraciones;
- modifica Supabase;
- modifica datos;
- crea trabajos reales de impresión;
- envía ZPL real;
- imprime por navegador;
- imprime por BrowserPrint;
- ejecuta retry real;
- concilia trabajos reales;
- cancela trabajos reales;
- solicita reimpresiones reales;
- aprueba reimpresiones reales;
- cambia impresoras reales;
- cambia routing real;
- modifica plantillas reales;
- descarga QR reales como parte de esta tarea;
- modifica activos, grupos, LPN, LOC o documentos empresariales;
- cambia identidad por reimpresión;
- retira físicamente `inventory.stock` ni otros permisos legacy;
- autoriza una instancia física;
- ejecuta certificación integral;
- crea ni modifica requisitos de prueba;
- modifica el registro 04A;
- desarrolla `NEXO-AUTH-029`.

#### 63. Continuidad

**ÚLTIMA TAREA APROBADA**
`NEXO-AUTH-027 — Separar captura de conteo y aprobación de diferencias`

**TAREA ACTUAL APROBADA**
`NEXO-AUTH-028 — Proteger impresión y reimpresión mediante permisos atómicos`

**SIGUIENTE TAREA RESERVADA**
`NEXO-AUTH-029 — Eliminar dependencia de permisos amplios legacy`
### ✅ NEXO-AUTH-029 — Eliminar dependencia de permisos amplios legacy

**Estado:** APROBADA
**Tarea anterior:** NEXO-AUTH-028 — Proteger impresión y reimpresión mediante permisos atómicos
**Tarea siguiente:** NEXO-AUTH-030 — Ejecutar pruebas integrales del subdominio
**Tipo de tarea:** Contrato global con materialización por unidad (`PER_IMPLEMENTATION_UNIT`) y gate físico `POST_E5_PACKAGE` — retiro gobernado de permisos amplios, aliases, bypasses y fuentes legacy de autorización del subdominio NEXO, conservando scope y recurso, prohibiendo ampliación de privilegios, exigiendo autoridad canónica exacta o `DEFAULT_DENY` y separando la migración del consumidor de la eliminación de compatibilidad
**Bloque:** BLOQUE K — NEXO
**Repositorio propietario:** `vento-group-sas/vento-shell`
**Archivo propietario:** `docs/plan-canonico/modular/bloques/K_NEXO/03_AUTORIZACION_DE_INVENTARIO_LOGISTICA_Y_ACTIVOS.md`
**Estado físico resultante:** `ESPECIFICADO_NO_MATERIALIZADO`
**Cambios físicos autorizados:** 0 durante este marcador global; cualquier materialización futura ocurre únicamente mediante `NEXO-AUTH-029::<implementation_unit_id>` después de cumplir el gate físico aplicable y contar con autorización física explícita
**Requisitos de prueba creados o modificados:** 0

---

#### 1. Propósito

Eliminar la dependencia funcional de permisos amplios, aliases, bypasses y decisiones legacy que todavía puedan actuar como autoridad final dentro del subdominio de inventario, logística y activos de NEXO.

La tarea no consiste en renombrar cadenas ni en eliminar todo elemento histórico que contenga terminología antigua. La condición de cierre es que una acción protegida ya no pueda quedar autorizada por un mecanismo más amplio, ambiguo o paralelo que el contrato canónico aplicable.

La regla raíz queda:

```text
ACCION EMPRESARIAL EXACTA
+ ACTOR EFECTIVO
+ CAPACIDAD CANONICA COMPATIBLE
+ SCOPE
+ RECURSO
+ CONTEXTO
+ ESTADO Y REVISION VIGENTES
= DECISION CANONICA
```

Nunca:

```text
PERMISO AMPLIO
OR ALIAS LEGACY
OR NOMBRE DE ROL
OR LISTA HARDCODEADA
OR AUTH SOLA
OR BYPASS LOCAL
OR DECISION PARALELA
= AUTORIDAD FINAL
```

Si una acción no dispone todavía de una capacidad exacta activa compatible:

```text
CAPACIDAD EXACTA AUSENTE
→ DEFAULT_DENY
```

#### 2. Naturaleza y topología

El marcador global conserva:

```text
mode = PER_IMPLEMENTATION_UNIT
execution_gate = POST_E5_PACKAGE
```

La identidad física futura es:

```text
NEXO-AUTH-029::<implementation_unit_id>
```

La aprobación documental de este marcador no crea, autoriza ni ejecuta una instancia física.

#### 3. Deuda recibida desde `NEXO-AUTH-021`

La auditoría 021 entrega a 029 los hallazgos de autorización legacy que requieren retiro gobernado:

| Hallazgo | Deuda recibida por 029 |
| --- | --- |
| `AUTH021-F-001` | impedir que lectura LPN dependa únicamente de autenticación |
| `AUTH021-F-004` | retirar `inventory.stock` como autoridad final de las superficies de activos observadas |
| `AUTH021-F-005` | migrar lectura y creación de activos hacia capacidades específicas compatibles |
| `AUTH021-F-006` | retirar permiso amplio de ubicación, custodia y transferencia |
| `AUTH021-F-008` | retirar guard amplio del ciclo de conteo y preservar segregación de acciones |

Los hallazgos con otros propietarios conservan su owner original. 029 no absorbe el diseño funcional de 022–028.

#### 4. Handoff acumulado desde `NEXO-AUTH-022` a `NEXO-AUTH-028`

Las tareas precedentes fijaron que:

- lectura LPN usa una capacidad de lectura específica;
- mutaciones LPN no pueden heredar autoridad desde lectura o stock amplio;
- contenido LPN exige autoridad propia por acción;
- consulta y administración de activos no pueden usar `inventory.stock` como oráculo final;
- custodia, préstamo, devolución y transferencia no pueden usar un permiso broad como autoridad;
- mantenimiento, daño, pérdida y baja permanecen separados;
- captura de conteo, cierre, aprobación y resolución permanecen separados;
- impresión original, retry, conciliación y reimpresión permanecen separados;
- cuando la capacidad exacta requerida no está activa, la decisión es `DEFAULT_DENY`.

029 materializa el contrato de retiro de las dependencias legacy después de esas definiciones. No redefine sus acciones.

#### 5. Handoff directo desde `NEXO-AUTH-028`

028 entrega expresamente a 029 la eliminación física futura de `inventory.stock` y otros permisos amplios como autoridad final, incluyendo cualquier alias o fallback que intente sustituir una capacidad de impresión exacta.

029 conserva esta regla:

```text
SEMANTICA EXACTA DEFINIDA
!=
DEPENDENCIA LEGACY RETIRADA
```

Una tarea anterior puede haber prohibido el uso de un guard broad sin haberlo eliminado todavía del consumidor.

#### 6. Definición de dependencia legacy de autorización

Para 029 existe dependencia legacy cuando un consumidor puede obtener una decisión autorizante desde cualquiera de estas clases:

1. permiso empresarial demasiado amplio para la acción;
2. alias deprecated tratado como capacidad independiente;
3. autenticación usada como sustituto de autorización;
4. nombre de rol usado como concesión;
5. lista hardcodeada usada para ampliar área, sede o capacidad;
6. fallback que cambia la decisión cuando falla el contrato canónico;
7. bypass local que devuelve allow sin resolver permiso, scope y recurso;
8. helper paralelo cuya semántica difiere del resolutor canónico;
9. condición de UI usada como barrera de seguridad;
10. decisión que combina autoridad legacy y canónica mediante un OR permisivo.

#### 7. Elementos legacy que no pertenecen automáticamente a 029

No todo fallback histórico es una dependencia de autorización.

Quedan fuera de 029, salvo que se conviertan directamente en un oráculo de autorización:

- productos sin perfil canónico;
- compatibilidad de SKU;
- inferencias de clasificación de datos cuya corrección pertenece a tareas de datos;
- aliases de estados cuyo owner pertenece al contrato de proceso;
- wrappers o columnas de Supabase con owner de transición propio;
- extracción de librerías compartidas con owner SHELL;
- limpieza global de código no vinculada a una decisión de autorización NEXO.

029 no invade esos propietarios.

#### 8. Regla de retiro seguro

Una dependencia legacy solo puede retirarse físicamente cuando la unidad de implementación demuestre:

```text
CAPACIDAD CANONICA ACTIVA O DEFAULT_DENY APROBADO
+ CONSUMIDOR MIGRADO
+ SCOPE PRESERVADO
+ RECURSO PRESERVADO
+ CASO ALLOW VERIFICADO CUANDO APLIQUE
+ CASO DENY VERIFICADO
+ LLAMADA DIRECTA PROTEGIDA
+ PARIDAD O REDUCCION CONTROLADA DE AUTORIDAD
+ ROLLBACK SEGURO
→ RETIRO ADMITIDO
```

La ausencia de sustituto no mantiene vivo un permiso broad como solución temporal.

#### 9. Prohibición de sustitución broad por broad

No se considera cierre válido:

```text
PERMISO BROAD A
→
PERMISO BROAD B
```

Tampoco:

```text
PERMISO DE LECTURA
→
AUTORIDAD DE MUTACION
```

La migración debe terminar en la capacidad exacta compatible o en `DEFAULT_DENY`.

#### 10. Semántica de `inventory.stock`

El consumidor NEXO normaliza un código corto usando el `appId`.

Por tanto, bajo `appId = nexo`:

```text
inventory.stock
→
nexo.inventory.stock
```

El catálogo canónico clasifica `nexo.inventory.stock` como identidad legacy de consulta que converge en:

```text
nexo.inventory.stock.view
```

Consecuencia:

```text
nexo.inventory.stock
!=
AUTORIDAD GENERICA DE MUTACION
```

Y:

```text
nexo.inventory.stock.view
!=
SUSTITUTO DE inventory.stock PARA MUTACIONES
```

#### 11. Regla contra sustitución mecánica

029 prohíbe sustituir globalmente cada aparición de `inventory.stock` por `inventory.stock.view`.

El uso observado del permiso amplio cubre superficies con responsabilidades distintas. Cada consumidor debe migrarse según la acción real.

Un cambio mecánico podría convertir una lectura canónica en permiso de escritura por implicación o bloquear una operación sin identificar su autoridad correcta.

#### 12. Universo de activos observado

La auditoría heredada identificó ocho superficies funcionales bajo el guard amplio:

| Superficie | Responsabilidad observada |
| --- | --- |
| `/inventory/assets` | listar activos y grupos |
| `/inventory/assets/new` | crear activo o grupo |
| `/inventory/assets/quick` | creación rápida de grupos |
| `/inventory/assets/items/[id]` | consultar activo individual |
| acciones de activo individual | ubicación, edición y mantenimiento |
| `/inventory/assets/groups/[id]` | consultar y modificar grupo |
| `/inventory/assets/counts` | consultar y crear sesiones de conteo |
| `/inventory/assets/counts/[id]` | observar, cerrar o cancelar conteo |

029 exige retirar el broad guard como autoridad final de este universo sin mezclar sus acciones.

#### 13. Lectura de activos individuales

La autoridad objetivo para la consulta ordinaria de activo individual es:

```text
nexo.assets.items.view
```

La migración debe conservar:

- actor;
- scope;
- territorio;
- recurso individual;
- filtrado server-side;
- denegación directa aunque la URL sea conocida.

`inventory.stock` deja de ser requisito o alternativa autorizante para esta lectura.

#### 14. Creación de activo individual

La creación individual usa la capacidad activa específica:

```text
nexo.assets.items.create
```

No autoriza por implicación:

- editar después de crear;
- cambiar custodio;
- mover ubicación;
- registrar mantenimiento;
- declarar daño o pérdida;
- imprimir;
- ejecutar conteo.

#### 15. Lectura de grupos y reutilizables

La consulta compatible de grupo usa:

```text
nexo.assets.groups.view
```

Esa capacidad no concede edición del grupo, cambio de cantidad esperada, ubicación, custodio ni movimiento.

#### 16. Mutaciones de grupo sin capacidad exacta

Cuando la operación de grupo no dispone de una capacidad exacta activa aprobada, 029 no crea un alias a partir de `inventory.stock`, `groups.view`, `items.create` ni otra identidad existente.

Resultado:

```text
CAPACIDAD EXACTA AUSENTE
→ DEFAULT_DENY
```

#### 17. Creación rápida o masiva de grupos

La superficie de creación rápida no puede conservar `inventory.stock` como autoridad por conveniencia.

Tampoco puede usar `items.create`, porque una identidad individual y un grupo controlado por cantidad no son el mismo recurso.

Hasta que exista autoridad exacta compatible:

```text
BULK GROUP CREATE
→ DEFAULT_DENY
```

#### 18. Ubicación de activos y grupos

`nexo.inventory.location_assignments.assign` puede autorizar la asignación de ubicación únicamente dentro de su contrato.

No concede por implicación:

- custodia;
- préstamo;
- devolución;
- transferencia de responsabilidad;
- mantenimiento;
- baja;
- edición administrativa general.

El retiro de `inventory.stock` no fusiona esas responsabilidades.

#### 19. Custodia, préstamo, devolución y transferencia

Las acciones protegidas por 025 deben consumir las capacidades exactas que resulten materializadas para ese ciclo.

Mientras no exista una capacidad exacta activa compatible para una transición:

```text
TRANSICION DE CUSTODIA
→ DEFAULT_DENY
```

029 no conserva un fallback a `inventory.stock` ni a `location_assignments.assign`.

#### 20. Mantenimiento, daño, pérdida y baja

Las acciones de 026 no pueden quedar detrás de un único permiso broad después de la migración.

Cada mutación debe conservar la autoridad exacta definida por su owner y las transiciones de estado aplicables.

Si una capacidad todavía no está activa, la acción permanece denegada en lugar de reabrir el guard legacy.

#### 21. Conteos de activos

La lectura de conteos puede consumir:

```text
nexo.assets.counts.view
```

Esta capacidad no autoriza:

- crear una sesión;
- capturar observaciones;
- cerrar captura;
- cancelar;
- aprobar diferencias;
- resolver diferencias;
- aplicar una mutación de dominio.

#### 22. Mutaciones de conteo

Las acciones de conteo definidas por 027 deben utilizar autoridades específicas compatibles cuando estén activas.

029 prohíbe conservar:

```text
inventory.stock
```

como fallback común de creación, captura, cierre o cancelación.

Una acción sin capacidad exacta activa queda en `DEFAULT_DENY`.

#### 23. Lectura de LPN

El endpoint o consumidor de lectura LPN debe exigir:

```text
nexo.inventory.lpns.view
```

además de la autenticación y contexto aplicables.

La sesión autenticada por sí sola no constituye autoridad de lectura.

#### 24. Mutaciones LPN

Crear, actualizar, activar, cerrar, anular, reetiquetar, empacar, desempacar, dividir, unir o transferir contenido no heredan autoridad desde:

- `nexo.inventory.lpns.view`;
- `nexo.inventory.stock.view`;
- `nexo.inventory.location_assignments.assign`;
- `inventory.stock`;
- autenticación;
- posesión física;
- lectura de contenido.

Cada acción usa su contrato exacto o queda en `DEFAULT_DENY`.

#### 25. Impresión y reimpresión

029 recibe de 028 la obligación de no mantener un permiso broad como escape cuando las capacidades exactas de impresión no estén disponibles.

Por tanto:

- consultar un trabajo no imprime;
- editar plantilla no imprime;
- poseer QR no imprime;
- BrowserPrint no autoriza;
- dispositivo conectado no autoriza;
- `inventory.stock` no autoriza;
- capacidad objetivo no materializada no puede simularse con alias.

#### 26. Inventario de aliases de remisiones

El catálogo canónico ya normaliza varias identidades legacy del subdominio de remisiones.

| Identidad legacy | Autoridad canónica o tratamiento |
| --- | --- |
| `nexo.inventory.remissions` | `nexo.inventory.remissions.view` con scope preservado |
| `nexo.inventory.remissions.all_sites` | `nexo.inventory.remissions.view` con alcance explícito; el nombre no concede globalidad |
| `nexo.inventory.remissions.view_dispatch` | no crea capacidad separada; la superficie consume capacidades funcionales |
| `nexo.inventory_remissions_id.view` | `nexo.inventory.remissions.view` sobre recurso identificado |
| `nexo.inventory_remissions.view` | `nexo.inventory.remissions.view` |
| `nexo.inventory.remissions.edit_own_pending` | `nexo.inventory.remissions.update` con `OWN` y estado pendiente como restricciones de recurso |
| `nexo.prepare.view` | `nexo.inventory.remissions.prepare` |
| `nexo.receive.view` | `nexo.inventory.remissions.receive` |
| `nexo.inventory.remissions.transit` | converge en `nexo.inventory.remissions.dispatch` |
| `nexo.transit.view` | converge en `nexo.inventory.remissions.dispatch` como acción empresarial |

029 gobierna el retiro de estas dependencias de autorización en consumidores NEXO cuando correspondan al subdominio actual.

#### 27. `all_sites` no es una capacidad empresarial distinta

La identidad legacy:

```text
nexo.inventory.remissions.all_sites
```

no debe sobrevivir como bypass global.

La autoridad objetivo se expresa como:

```text
nexo.inventory.remissions.view
+
SCOPE EXPLICITO COMPATIBLE
```

La migración conserva el alcance real de cada concesión y no convierte una asignación local en global.

#### 28. `edit_own_pending` se convierte en recurso y estado

La identidad legacy:

```text
nexo.inventory.remissions.edit_own_pending
```

mezcla acción, ownership y estado.

El contrato objetivo separa:

```text
ACTION = update
RESOURCE RELATION = OWN
STATE = pending compatible
```

No se crea una capacidad nueva por cada combinación de filtro.

#### 29. `transit` se retira como permiso de acción

La autorización empresarial canónica usa:

```text
nexo.inventory.remissions.dispatch
```

La palabra `transit` puede permanecer como estado de negocio cuando corresponda, pero no como autoridad paralela para despachar.

El cambio de nombre de permiso no modifica por sí mismo la máquina de estados de la remisión.

#### 30. Solicitud y cancelación se conservan

Las capacidades:

```text
nexo.inventory.remissions.request
nexo.inventory.remissions.cancel
```

se conservan conforme al catálogo canónico.

029 no las retira por ser históricas si continúan representando acciones empresariales distintas.

#### 31. Preparación, despacho y recepción permanecen separadas

La migración no fusiona:

```text
request
prepare
dispatch
receive
cancel
update
view
```

Compartir una misma entidad `REMISSION` no convierte estas acciones en una sola autoridad.

#### 32. Fuente legacy basada en nombre de rol

La auditoría E1 identificó reglas que derivan áreas de remisión desde nombres de rol y listas hardcodeadas.

Ejemplos observados incluyen asociaciones históricas entre roles operativos y clases de área.

029 fija:

```text
NOMBRE DE ROL
!=
PERMISO
```

Y:

```text
LISTA HARDCODEADA DE AREAS
!=
SCOPE AUTORIZANTE
```

#### 33. Jerarquía canónica para remisiones

Una decisión de remisión debe converger en una sola jerarquía reutilizable que combine, según aplique:

- capacidad explícita;
- contexto operativo activo;
- sede;
- área;
- scope del permiso;
- relación del recurso;
- estado de la remisión;
- reglas canónicas de sede y área;
- contexto de dispositivo compartido;
- restricciones del producto o proceso cuando sean parte del recurso, no de la concesión.

La UI y el servidor deben producir la misma decisión para la misma entrada autorizante.

#### 34. Falla de catálogo no puede ampliar autoridad

Si una fuente canónica de contexto o catálogo no puede resolverse, el sistema no puede sustituirla por una lista broad de roles o áreas para mantener el flujo abierto.

Regla:

```text
CONTEXTO AUTORIZANTE NO RESUELTO
→ DENY O ERROR CONTROLADO
```

Nunca:

```text
CONTEXTO AUTORIZANTE NO RESUELTO
→ FALLBACK PERMISIVO
```

#### 35. Excepción actual de conductor

El consumidor observado contiene una excepción local equivalente a:

```text
ROL EFECTIVO = conductor
+
PERMISO = nexo.inventory.remissions.transit
→ ALLOW
```

029 clasifica esta rama como bypass legacy de autorización.

El contrato objetivo exige:

```text
CAPACIDAD CANONICA DE DESPACHO
+ CONTEXTO
+ SCOPE
+ RECURSO
→ DECISION
```

El nombre `conductor` no puede devolver allow por sí mismo.

#### 36. Retiro de la excepción de conductor

La excepción local solo puede retirarse físicamente cuando el consumidor de despacho disponga de la capacidad canónica, asignaciones y scope compatibles y existan pruebas allow/deny suficientes.

Si esas condiciones no están disponibles:

```text
DESPACHO
→ DEFAULT_DENY
```

No se conserva el `return true` legacy como sustituto.

#### 37. Role override

La simulación o sustitución temporal de rol debe evaluar el mismo contrato de permiso y scope que el actor simulado.

No puede:

- omitir scope de sede;
- omitir scope de área;
- sustituir scope específico por todas las sedes del trabajador;
- crear excepciones por nombre de rol;
- mezclar permisos reales del usuario con los del rol simulado;
- conceder una capacidad inexistente.

#### 38. Frontera con la fundación compartida de autorización

La extracción, unificación o rediseño transversal de helpers compartidos pertenece a los contratos SHELL propietarios.

029 solo exige que el consumidor NEXO deje de depender de semántica legacy o bypass local para las acciones de su subdominio.

No convierte esta tarea en una refactorización multi-repositorio de toda la fundación compartida.

#### 39. Dispositivo compartido

Un dispositivo compartido aporta contexto y restricciones. No se convierte en actor ni en permiso.

La decisión debe conservar:

```text
ACTOR HUMANO EFECTIVO
+ DISPOSITIVO AUTORIZADO
+ APP PERMITIDA
+ CONTEXTO
+ CAPACIDAD EXACTA
+ SCOPE
+ RECURSO
```

No se acepta un fallback de rol o de dispositivo para ampliar autoridad.

#### 40. UI y navegación

Una pantalla visible, un enlace, una pestaña, una navegación permitida o una query string no autorizan la acción empresarial.

La eliminación de un alias de navegación no debe confundirse con eliminar la superficie funcional.

La protección final ocurre en servidor o en el punto autoritativo equivalente.

#### 41. Llamadas directas

Cada acción migrada debe continuar denegada cuando se intenta invocar directamente sin la capacidad exacta, aunque el usuario conozca:

- identificador del recurso;
- endpoint;
- Server Action;
- payload;
- URL interna;
- código visible.

La ausencia de botón no se cuenta como control suficiente.

#### 42. Migración de concesiones

Antes de retirar una identidad legacy asignable, la unidad física debe inventariar las concesiones efectivas que todavía la consumen.

Cada concesión se clasifica en:

```text
MIGRATE_EXACT
MIGRATE_WITH_NARROWER_SCOPE
NO_EQUIVALENT_DEFAULT_DENY
REVIEW_REQUIRED_BLOCKING
```

No existe migración automática cuando el significado legacy mezcla más de una acción.

#### 43. Preservación de scope

Una migración nunca amplía alcance.

Reglas mínimas:

- local no se vuelve global;
- una sede no se vuelve cualquier sede;
- un área no se vuelve cualquier área;
- `OWN` no se vuelve `ANY`;
- lectura no se vuelve escritura;
- una relación de origen no se vuelve autoridad sobre destino;
- un permiso de consulta multisede no habilita mutaciones multisede.

#### 44. Ambigüedad de concesión

Si no puede demostrarse qué capacidad canónica corresponde a una concesión legacy:

```text
AMBIGUOUS LEGACY GRANT
→ NO AUTO-MIGRATION
→ BLOCK OR DEFAULT_DENY
```

La conveniencia operativa no justifica una ampliación silenciosa.

#### 45. Doble evaluación durante transición

Si una unidad requiere observar temporalmente la decisión legacy y la canónica para demostrar paridad, la decisión legacy no puede dominar.

Patrón permitido:

```text
CANONICAL = DECISION AUTORITATIVA
LEGACY = SHADOW OBSERVATION
MISMATCH = TELEMETRIA / BLOQUEO SEGUN RIESGO
```

Patrón prohibido:

```text
CANONICAL_ALLOW OR LEGACY_ALLOW
→ ALLOW
```

#### 46. `DEFAULT_DENY` durante transición

Cuando la decisión canónica no pueda resolverse de forma suficiente, la transición no recurre al permiso broad para mantener disponibilidad.

La acción sensible se deniega o falla de forma controlada sin producir el efecto empresarial.

#### 47. Idempotencia de la migración

Aplicar dos veces el proceso de retiro sobre la misma unidad no debe:

- duplicar grants;
- duplicar aliases;
- ampliar scope;
- reactivar claves retiradas;
- crear estados de autorización divergentes;
- producir dos efectos empresariales.

#### 48. Concurrencia y cambios de autorización

La autorización relevante se revalida en el punto de efecto.

Una decisión obtenida antes de un cambio de:

- rol;
- turno;
- sede;
- área;
- scope;
- estado del recurso;
- asignación;
- política;

no puede convertirse en un token indefinido de autoridad.

#### 49. Offline

Un cliente offline puede conservar intención o evidencia local cuando su contrato lo permita, pero no puede usar un permiso legacy cacheado para mutar el estado canónico.

Al reconectar se reevalúa la autoridad vigente antes del efecto.

#### 50. Auditoría mínima del retiro

Cada unidad física debe poder demostrar como mínimo:

- dependencia legacy objetivo;
- consumidor afectado;
- capacidad canónica o razón de `DEFAULT_DENY`;
- scope anterior;
- scope final;
- recursos afectados;
- concesiones migradas o bloqueadas;
- decisiones allow/deny probadas;
- mismatches observados durante shadow cuando aplique;
- fecha y versión de cutover;
- responsable técnico;
- rollback permitido.

#### 51. Condición de cierre de `AUTH021-F-001`

`AUTH021-F-001` queda físicamente cerrable solo cuando la lectura LPN exige una capacidad canónica compatible server-side y autenticación sola no produce la respuesta protegida.

El marcador documental 029 define la condición; no afirma que el código ya la cumpla.

#### 52. Condición de cierre de `AUTH021-F-004`

`AUTH021-F-004` queda físicamente cerrable cuando las superficies de activos dejan de usar `inventory.stock` como autoridad final y cada acción consume su capacidad exacta o queda denegada.

No basta con cambiar el nombre de la constante.

#### 53. Condición de cierre de `AUTH021-F-005`

`AUTH021-F-005` queda físicamente cerrable cuando:

- lectura individual consume `nexo.assets.items.view`;
- creación individual consume `nexo.assets.items.create`;
- lectura de grupos consume `nexo.assets.groups.view`;
- las mutaciones sin autoridad exacta no heredan esos permisos de lectura o creación.

#### 54. Condición de cierre de `AUTH021-F-006`

`AUTH021-F-006` queda físicamente cerrable cuando ubicación, custodia y transferencia dejan de compartir un permiso broad y cada mutación revalida sus lados, scope y recurso.

#### 55. Condición de cierre de `AUTH021-F-008`

`AUTH021-F-008` queda físicamente cerrable cuando captura, cierre, cancelación y las decisiones de diferencia dejan de depender del mismo guard broad y la segregación definida por 027 se mantiene en el consumidor.

#### 56. Condición de cierre de `H-CODE-013-006`

La deuda de autorización de `H-CODE-013-006` queda cerrable para 029 cuando nombres de rol y listas hardcodeadas dejan de conceder o ampliar área/capacidad de remisión.

Las responsabilidades de catálogo, proceso y experiencia conservan sus propietarios originales.

#### 57. Frontera con `H-CODE-014-006`

029 solo resuelve la dimensión de autorización de la decisión distribuida de remisiones.

No redefine contratos de datos o configuración pertenecientes a otros owners.

Su condición es que múltiples fuentes legítimas se integren bajo una precedencia canónica y no se transformen en bypasses independientes.

#### 58. Estado AS-IS remoto consolidado

La evidencia remota observada conserva dependencias legacy activas, entre ellas:

- varias superficies de activos con `permissionCode = inventory.stock`;
- normalización del código corto a `nexo.inventory.stock`;
- lectura LPN históricamente identificada con brecha de autorización específica;
- aliases de remisiones todavía consumidos por superficies NEXO;
- `nexo.inventory.remissions.all_sites` todavía presente como identidad legacy consumida;
- `nexo.inventory.remissions.edit_own_pending` todavía presente en consumidor;
- `nexo.inventory.remissions.transit` todavía presente en consumidor;
- una excepción de role override para `conductor` + `nexo.inventory.remissions.transit` que retorna allow.

Por tanto, 029 permanece:

```text
ESPECIFICADO_NO_MATERIALIZADO
```

#### 59. Matriz de destino consolidada

| Familia | Legacy observado | Destino contractual | Si el destino no está activo |
| --- | --- | --- | --- |
| stock read | `nexo.inventory.stock` | `nexo.inventory.stock.view` | deny para lectura no cubierta |
| asset item read | `inventory.stock` | `nexo.assets.items.view` | deny |
| asset item create | `inventory.stock` | `nexo.assets.items.create` | deny |
| asset group read | `inventory.stock` | `nexo.assets.groups.view` | deny |
| asset group mutation | `inventory.stock` | capacidad exacta del owner | `DEFAULT_DENY` |
| custody mutation | `inventory.stock` | capacidad exacta de 025 | `DEFAULT_DENY` |
| maintenance/loss mutation | `inventory.stock` | capacidad exacta de 026 | `DEFAULT_DENY` |
| asset count read | `inventory.stock` | `nexo.assets.counts.view` | deny |
| asset count mutation | `inventory.stock` | capacidad exacta de 027 | `DEFAULT_DENY` |
| print/reprint | permiso broad o capacidad de lectura | capacidades exactas de 028 | `DEFAULT_DENY` |
| LPN read | auth sola / permiso broad | `nexo.inventory.lpns.view` | deny |
| LPN mutation/content | permiso broad o de lectura | capacidades exactas de 022/023 | `DEFAULT_DENY` |
| remission read aliases | aliases históricos | `nexo.inventory.remissions.view` + scope | deny |
| remission `all_sites` | permiso con globalidad embebida | `remissions.view` + scope explícito | deny |
| remission edit own pending | acción + relación + estado embebidos | `remissions.update` + resource predicates | deny |
| remission transit | alias de acción/estado | `nexo.inventory.remissions.dispatch` | deny |
| role-name area fallback | nombre de rol / lista hardcodeada | capacidad + contexto + scope canónicos | deny/error controlado |
| conductor bypass | rol literal + transit | dispatch + contexto + scope + recurso | deny |

#### 60. Condición de materialización por unidad

Una futura `NEXO-AUTH-029::<implementation_unit_id>` solo puede ejecutar cambios físicos cuando exista:

1. `implementation_unit_id` válido;
2. package propietario aplicable;
3. gate E5 del package en PASS cuando corresponda;
4. autorización física explícita;
5. inventario exacto de consumidores de la unidad;
6. capacidad canónica activa o decisión `DEFAULT_DENY` aprobada;
7. scope y recurso reconciliados;
8. grants afectados inventariados;
9. estrategia de transición;
10. pruebas allow/deny y acceso directo;
11. evidencia de no ampliación;
12. rollback seguro.

#### 61. Rollback de materialización

Un rollback solo puede volver a una combinación previamente certificada que conserve el modelo canónico de autorización.

Está prohibido usar el rollback para reactivar:

- `inventory.stock` como autoridad broad;
- aliases legacy como capacidades independientes;
- `all_sites` como bypass global;
- `edit_own_pending` como permiso compuesto;
- `transit` como autoridad paralela de despacho;
- una excepción por nombre de rol;
- un OR permisivo entre decisión legacy y canónica.

Si no existe una combinación segura, la acción se bloquea y se corrige hacia adelante.

#### 62. Frontera con Supabase

Este marcador documental no modifica Supabase.

Si una unidad futura requiere cambios de:

- grants;
- catálogo de permisos;
- scope persistido;
- funciones de autorización;
- RLS;
- migraciones;
- aliases persistidos;
- datos de asignación;

la modificación pertenece a `vento-group-sas/vento-shell` y debe seguir el lifecycle físico gobernado de la unidad correspondiente.

#### 63. Frontera con catálogo canónico

029 consume decisiones de normalización ya aprobadas. No reabre la taxonomía global de permisos ni inventa nuevas claves para cerrar huecos.

Cuando el catálogo declara una clave canónica activa, se usa esa identidad.

Cuando una capacidad exacta todavía no existe, se conserva `DEFAULT_DENY` hasta su materialización por el owner competente.

#### 64. Frontera con limpieza global de código

029 no exige que desaparezca toda cadena legacy de todo `vento-nexo`.

La condición es más estricta y más acotada:

```text
NINGUNA DEPENDENCIA LEGACY DEL ALCANCE 029
PUEDE PRODUCIR AUTORIDAD FINAL
```

Un texto histórico, fixture, prueba de migración o compatibilidad no autorizante no se elimina por inferencia.

#### 65. Handoff a `NEXO-AUTH-030`

030 recibe un subdominio cuyo contrato exige demostrar integralmente, después de materialización:

- allow únicamente por capacidad exacta compatible;
- deny por ausencia de capacidad;
- deny por scope incompatible;
- deny por recurso incompatible;
- acceso directo protegido;
- ausencia de `inventory.stock` como oracle broad en las superficies objetivo;
- lectura LPN sin auth-only;
- conteo segregado;
- custodia segregada;
- mantenimiento segregado;
- impresión/reimpresión segregadas;
- aliases de remisión sin autoridad independiente;
- `all_sites` expresado como scope;
- `edit_own_pending` expresado como update + relación + estado;
- `transit` retirado como permiso paralelo a dispatch;
- ausencia de allow por nombre de rol;
- dispositivo compartido sin autoridad propia;
- simulación de rol con el mismo contrato;
- rollback sin reactivar broad legacy.

029 define los oracles; 030 ejecuta la certificación integral.

#### 66. Requisitos de prueba derivados

**Resultado:** NO GENERA REQUISITOS DE PRUEBA.

**Requisitos creados:** 0
**Requisitos modificados:** 0
**Requisitos diferidos:** 0
**Requisitos obsoletos:** 0

Justificación:

- el retiro de aliases y fallbacks ya está cubierto por obligaciones vigentes de autorización, remisiones, activos y transición legacy;
- la jerarquía única de remisiones ya tiene requisito vigente;
- la prohibición de ampliar scope ya forma parte del modelo de autorización;
- esta tarea especializa el cierre documental de dependencias existentes sin crear una nueva obligación empresarial.

#### 67. Cobertura de prueba vigente reutilizada

Se reutiliza, sin modificar el registro:

- `TREQ-AUTH-001` para decisión explícita de autorización y denegación segura;
- `TREQ-AUTH-004` para coherencia de scopes y role override entre consumidores;
- `TREQ-NEXO-006` para autorización y efectos exactamente-una-vez del ciclo de remisiones;
- `TREQ-NEXO-007` para control y retiro de fallbacks legacy de remisiones;
- `TREQ-NEXO-009` para una jerarquía canónica única de capacidades, contexto, reglas, overrides y fallbacks de remisiones;
- `TREQ-NEXO-011` para integridad y autorización del ciclo de inventario y conteos;
- `TREQ-NEXO-013` para identidad y trazabilidad del ciclo de activos;
- `TREQ-SUPABASE-001` para retiro gobernado de wrappers, aliases y fallbacks legacy cuando exista persistencia o infraestructura involucrada.

Esta trazabilidad no representa una actualización del registro de requisitos.

#### 68. Evidencia de validación

| Clase | Estado | Evidencia |
| --- | --- | --- |
| BUILD | NOT_APPLICABLE | tarea documental de contrato; no modifica producto ni genera build físico |
| LOCAL | NOT_EXECUTED | incorporación, formateo, quality, delivery, topología, plan y TREQ corresponden al checkout local al incorporar la tarea |
| REMOTA | PASS | se verificaron `vento-shell` main con 027 incorporada, `vento-nexo` main vigente, owner del minibloque, topología, catálogo de normalización, registro NEXO, ocho superficies de activos con guard broad y helpers actuales de autorización/remisiones |
| OPERATIVA | NOT_EXECUTED | no se retiraron aliases reales, no se migraron grants y no se ejecutaron remisiones, conteos, custodia, mantenimiento o impresión reales |
| FÍSICA | NOT_EXECUTED | no se materializó ninguna instancia `NEXO-AUTH-029::<implementation_unit_id>` ni se modificaron consumidores, Supabase o despliegues |

#### 69. Criterios de aceptación

- [x] se define con precisión qué constituye dependencia legacy de autorización;
- [x] se evita confundir limpieza global con retiro de autoridad legacy;
- [x] se reciben explícitamente los hallazgos `AUTH021-F-001`, `004`, `005`, `006` y `008`;
- [x] se consumen los handoffs de 022–028 sin redefinir sus acciones;
- [x] `inventory.stock` queda rechazado como autoridad final;
- [x] `nexo.inventory.stock` queda reconocido como alias legacy de lectura, no permiso genérico de mutación;
- [x] se prohíbe sustituir mecánicamente `inventory.stock` por `inventory.stock.view`;
- [x] se define destino por cada una de las ocho superficies de activos auditadas;
- [x] `items.view` solo autoriza lectura compatible;
- [x] `items.create` solo autoriza creación individual compatible;
- [x] `groups.view` solo autoriza lectura compatible;
- [x] mutaciones de grupo sin capacidad exacta quedan `DEFAULT_DENY`;
- [x] creación rápida de grupos no hereda `items.create`;
- [x] ubicación y custodia permanecen separadas;
- [x] mantenimiento, daño, pérdida y baja permanecen separados;
- [x] lectura y mutación de conteo permanecen separadas;
- [x] lectura LPN exige permiso específico y no auth sola;
- [x] mutaciones LPN no heredan autoridad de lectura;
- [x] impresión/reimpresión no reciben fallback broad;
- [x] se documentan aliases de remisiones y su destino canónico;
- [x] `all_sites` se convierte en scope, no en bypass;
- [x] `edit_own_pending` se separa en acción, relación y estado;
- [x] `transit` converge en `dispatch` como autoridad de acción;
- [x] request y cancel se conservan como acciones distintas;
- [x] se prohíbe autorización derivada únicamente del nombre de rol;
- [x] listas hardcodeadas no pueden ampliar scope;
- [x] falla de catálogo no abre un fallback permisivo;
- [x] la excepción literal de conductor queda clasificada como bypass legacy a retirar;
- [x] role override debe respetar el mismo contrato de scope;
- [x] dispositivo compartido no se convierte en permiso;
- [x] UI o navegación no se usan como control final;
- [x] acceso directo debe permanecer protegido;
- [x] grants legacy ambiguos no se migran automáticamente;
- [x] ninguna migración amplía scope;
- [x] shadow legacy no puede dominar la decisión canónica;
- [x] ausencia de decisión canónica produce deny o error controlado;
- [x] idempotencia y concurrencia del retiro quedan definidas;
- [x] offline exige revalidación al reconectar;
- [x] auditoría mínima del retiro queda definida;
- [x] rollback no reactiva broad legacy;
- [x] la frontera con Supabase conserva `vento-shell` como propietario;
- [x] no se reabre el catálogo global;
- [x] no se inventan nuevas `PermissionKey`;
- [x] se entrega a 030 una batería integral de oracles de certificación;
- [x] no se modifica Supabase durante este marcador;
- [x] no se modifican TREQ;
- [x] no se modifica 04A;
- [x] la materialización futura conserva `PER_IMPLEMENTATION_UNIT / POST_E5_PACKAGE`.

#### 70. Límites

Esta tarea no:

- modifica código de producto;
- elimina físicamente `inventory.stock`;
- elimina físicamente aliases de remisiones;
- cambia helpers de autorización;
- modifica role override;
- modifica grants;
- crea permisos;
- modifica el catálogo de permisos;
- crea roles;
- modifica scope persistido;
- modifica RLS;
- crea RPC;
- crea migraciones;
- modifica Supabase;
- modifica datos;
- ejecuta backfills;
- cambia estados de remisión;
- cambia el proceso de remisiones;
- cambia el modelo de activos;
- cambia la máquina de estados de LPN;
- ejecuta conteos;
- ejecuta custodia o transferencias;
- registra mantenimiento, daño, pérdida o baja;
- imprime ni reimprime;
- ejecuta cambios en dispositivos compartidos;
- unifica físicamente helpers entre repositorios;
- elimina fallbacks de datos con otros propietarios;
- limpia código global no autorizante;
- autoriza una instancia física;
- ejecuta certificación integral;
- crea ni modifica requisitos de prueba;
- modifica el registro 04A;
- desarrolla `NEXO-AUTH-030`.

#### 71. Continuidad

**ÚLTIMA TAREA APROBADA**
`NEXO-AUTH-028 — Proteger impresión y reimpresión mediante permisos atómicos`

**TAREA ACTUAL APROBADA**
`NEXO-AUTH-029 — Eliminar dependencia de permisos amplios legacy`

**SIGUIENTE TAREA RESERVADA**
`NEXO-AUTH-030 — Ejecutar pruebas integrales del subdominio`
### [ ] NEXO-AUTH-030 — Ejecutar pruebas integrales del subdominio
### [ ] NEXO-AUTH-031 — Proteger instalaciones, mantenimiento, limpieza, inspecciones, calibración, acceso físico y obras
### [ ] NEXO-AUTH-032 — Separar reporte, solicitud, aprobación, ejecución, verificación, liberación, cierre y reapertura
