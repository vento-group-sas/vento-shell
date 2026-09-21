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

### [ ] NEXO-AUTH-022 — Proteger creación, actualización, cierre, anulación y reetiquetado de LPN
### [ ] NEXO-AUTH-023 — Proteger empaque, desempaque, división, unión y transferencia
### [ ] NEXO-AUTH-024 — Proteger consulta y administración de activos y reutilizables
### [ ] NEXO-AUTH-025 — Proteger custodia, préstamo, devolución y transferencia
### [ ] NEXO-AUTH-026 — Proteger mantenimiento, daño, pérdida y baja
### [ ] NEXO-AUTH-027 — Separar captura de conteo y aprobación de diferencias
### [ ] NEXO-AUTH-028 — Proteger impresión y reimpresión mediante permisos atómicos
### [ ] NEXO-AUTH-029 — Eliminar dependencia de permisos amplios legacy
### [ ] NEXO-AUTH-030 — Ejecutar pruebas integrales del subdominio
### [ ] NEXO-AUTH-031 — Proteger instalaciones, mantenimiento, limpieza, inspecciones, calibración, acceso físico y obras
### [ ] NEXO-AUTH-032 — Separar reporte, solicitud, aprobación, ejecución, verificación, liberación, cierre y reapertura
