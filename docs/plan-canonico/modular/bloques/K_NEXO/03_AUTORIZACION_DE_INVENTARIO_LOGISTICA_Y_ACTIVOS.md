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

### [ ] NEXO-AUTH-025 — Proteger custodia, préstamo, devolución y transferencia
### [ ] NEXO-AUTH-026 — Proteger mantenimiento, daño, pérdida y baja
### [ ] NEXO-AUTH-027 — Separar captura de conteo y aprobación de diferencias
### [ ] NEXO-AUTH-028 — Proteger impresión y reimpresión mediante permisos atómicos
### [ ] NEXO-AUTH-029 — Eliminar dependencia de permisos amplios legacy
### [ ] NEXO-AUTH-030 — Ejecutar pruebas integrales del subdominio
### [ ] NEXO-AUTH-031 — Proteger instalaciones, mantenimiento, limpieza, inspecciones, calibración, acceso físico y obras
### [ ] NEXO-AUTH-032 — Separar reporte, solicitud, aprobación, ejecución, verificación, liberación, cierre y reapertura
