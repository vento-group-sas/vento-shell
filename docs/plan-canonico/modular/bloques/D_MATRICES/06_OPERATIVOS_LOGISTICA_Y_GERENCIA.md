### SECCIÓN — OPERATIVOS LOGISTICA Y GERENCIA

<!-- PLAN-SECTION-META:START -->
Esta sección reúne contenido canónico con una responsabilidad documental única dentro del plan. Debe conservarse cohesionada y actualizarse junto con sus referencias y validaciones dependientes.

**Cobertura canónica:** `AUTH-RBAC-017` a `AUTH-RBAC-019` — 3 tareas.
<!-- PLAN-SECTION-META:END -->

### ✅ AUTH-RBAC-017 — Crear matriz de bodeguero

#### 1. Identificación de la tarea

| Campo                     | Valor                                                              |
| ------------------------- | ------------------------------------------------------------------ |
| Bloque                    | BLOQUE D — Matrices canónicas de roles, excepciones y dispositivos |
| Tarea                     | AUTH-RBAC-017 — Crear matriz de bodeguero                          |
| Estado                    | **APROBADA**                                                       |
| Naturaleza                | Definición documental de matriz operativa de bodega                |
| Implementación física     | No incluida                                                        |
| Catálogo evaluado         | 112 permisos canónicos vigentes                                    |
| Tarea anterior vigente    | AUTH-RBAC-016 — APROBADA                                           |
| Tarea posterior reservada | AUTH-RBAC-018 — Crear matriz de conductor_logistica                |

Esta tarea no modifica Supabase, migraciones, tablas, RLS, RPC, aplicaciones, repositorios, dispositivos ni datasets físicos. La aplicación posterior deberá realizarse mediante AUTH-RBAC-025 y las migraciones versionadas del BLOQUE R en `vento-shell`.

#### 2. Objetivo

Definir, permiso por permiso, las capacidades del rol operativo `bodeguero` para custodiar inventario, recibir y ubicar existencias, ejecutar movimientos ordinarios, preparar y recibir remisiones, realizar conteos y aportar evidencia de diferencias, sin convertirlo en administrador de inventario, comprador, conductor, supervisor, aprobador o corrector unilateral de stock.

#### 3. Decisión principal

`bodeguero` representa la función temporal responsable de la custodia física y trazable de la bodega dentro de un turno, una sede y un área de tipo `warehouse`. Su autoridad termina donde comienza la aprobación administrativa, la corrección excepcional, la custodia en tránsito, la compra, la producción o la operación comercial.

```text
ACTOR HUMANO IDENTIFICADO
+ TURNO PUBLICADO Y VIGENTE
+ CHECK-IN ACTIVO CUANDO CORRESPONDA
+ ROL OPERATIVO bodeguero
+ SEDE AUTORIZADA
+ ÁREA ACTIVA DE BODEGA
+ PERMISO EXACTO
+ RECURSO BAJO CUSTODIA O RELACIÓN OPERATIVA VÁLIDA
= AUTORIZACIÓN OPERATIVA DE BODEGA
```

No se admite:

```text
employees.role = bodeguero → acceso permanente
KIOSCO_BODEGA_CP → permisos empresariales sin actor humano
same_site_active_worker → cualquier trabajador de la sede puede operar bodega
nexo.access → autorización total de inventario
conteo → ajuste automático
validación → corrección de stock
entrada ordinaria → creación de stock sin documento fuente
preparar remisión → despachar o iniciar tránsito
consultar compra → aprobar compra o registrar recepción
traslado interno → movimiento entre sedes
bodeguero → administrador de productos, ubicaciones o políticas
```

#### 4. Separación de responsabilidades

| Dominio       | El bodeguero sí puede                                                                  | El bodeguero no puede por esta matriz                                                   | Actor o autoridad esperada                    |
| ------------- | -------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------- | --------------------------------------------- |
| Custodia      | Consultar stock, LPN, movimientos, ubicaciones, zonas y posiciones de la bodega activa | Consultar inventario general de otras sedes o áreas                                     | Contexto de sede y área                       |
| Entradas      | Registrar entradas ordinarias con fuente empresarial válida y ubicar el stock          | Crear stock sin soporte o usar entrada excepcional                                      | Autoridad base para excepciones               |
| Movimientos   | Trasladar dentro de la bodega y registrar retiros trazables                            | Trasladar entre sedes mediante un movimiento local o permitir stock negativo            | Remisiones para movimientos entre sedes       |
| Conteos       | Ejecutar conteos y validaciones asignadas, registrar evidencia                         | Aprobar diferencias o ajustar cantidades                                                | Gerencia/supervisión con autoridad base       |
| Remisiones    | Consultar, preparar y recibir cuando la bodega sea el extremo autorizado               | Solicitar por terceros, editar libremente, cancelar o iniciar tránsito                  | Solicitante, conductor y gerencia según etapa |
| Compras       | Consultar orden, recepción y proveedor necesarios para verificar una entrega           | Crear, aprobar o modificar órdenes; registrar/revertir recepción con el catálogo actual | ORIGO y permiso atómico futuro                |
| Configuración | Consumir catálogos y reglas publicadas                                                 | Crear productos, redefinir ubicaciones, políticas, plantillas o rutas                   | Roles base autorizados                        |
| Finanzas      | Ninguna capacidad financiera                                                           | Ver costos, márgenes, facturas, variaciones o resolver diferencias                      | Contabilidad/gerencia                         |

#### 5. Resultado cuantitativo de la matriz

| Resultado                                    | Cantidad | Efecto                                                                                   |
| -------------------------------------------- | -------: | ---------------------------------------------------------------------------------------- |
| Capacidades operativas asignadas             |       35 | Concesiones explícitas de NEXO y consulta operativa acotada de ORIGO.                    |
| Capacidades `BASE_AND_OPERATIONAL` asignadas |        0 | El rol no recibe por sí solo ajustes, entradas excepcionales, aprobaciones ni overrides. |
| Capacidades no asignadas                     |       77 | Permanecen denegadas por defecto.                                                        |
| Total evaluado                               |      112 | Sin omisiones ni duplicados.                                                             |

La matriz contiene **35 concesiones operativas a nivel de clave** y **77 ausencias de concesión**. La ausencia de concesión produce denegación por defecto; no se crean filas `deny` redundantes.

#### 6. Perfiles de alcance utilizados

- `CTX-WH-NEXO-APP` — Turno publicado y vigente, rol operativo `bodeguero`, sede autorizada y área activa de tipo `warehouse`. Permite entrar a NEXO; no concede ninguna capacidad interna por sí solo.

- `CTX-WH-CATALOG` — Unidades, equivalencias y factores publicados necesarios para validar cantidades, presentaciones y conversiones.

- `CTX-WH-REQUEST-POLICIES` — Políticas publicadas aplicables a solicitudes y abastecimiento de las sedes atendidas por la bodega activa. Solo lectura; no permite modificarlas.

- `CTX-WH-ADJUSTMENTS-READ` — Ajustes finalizados que afecten stock bajo custodia de la bodega activa. Durante conteos ciegos no se mostrarán existencias teóricas, variaciones ni información que sesgue el conteo.

- `CTX-WH-ENTRIES` — Entradas ordinarias y sus líneas vinculadas a la bodega activa, incluida su fuente empresarial, estado, ubicación y trazabilidad visible.

- `CTX-WH-ENTRY-REGISTER` — Registro ordinario de entrada física a la bodega únicamente cuando exista una fuente válida: recepción aprobada, lote productivo liberado, devolución, remisión recibida u otro evento canónico autorizado. No permite crear stock sin soporte.

- `CTX-WH-TOPOLOGY` — Posiciones de almacenamiento pertenecientes a zonas y ubicaciones autorizadas de la bodega activa.

- `CTX-WH-PUTAWAY` — Asignación de stock o LPN recibidos a una ubicación válida dentro de la bodega activa. Exige compatibilidad de producto, capacidad, lote, estado y restricciones de almacenamiento.

- `CTX-WH-LPN` — LPN y contenedores bajo custodia de la bodega activa, con contenido, lote, ubicación y estado necesarios para operar. No permite reasignarlos sin el permiso correspondiente.

- `CTX-WH-MOVEMENTS` — Movimientos que tengan origen, destino o efecto dentro de la bodega activa. La visibilidad de un extremo no habilita actuar sobre territorios no autorizados.

- `CTX-WH-STOCK` — Existencias de la bodega activa por producto, presentación, lote, LPN y ubicación. No concede acceso a otras sedes ni a áreas no cubiertas por el contexto.

- `CTX-WH-PRODUCTION-BATCHES` — Lotes productivos reflejados en inventario cuando ingresen, se encuentren o deban trazarse dentro de la bodega activa. No concede operar FOGO ni modificar lotes productivos.

- `CTX-WH-TRANSFERS` — Traslados donde la bodega activa sea origen o destino autorizado. La consulta de un extremo no amplía la autoridad sobre el otro.

- `CTX-WH-TRANSFER-CREATE` — Traslados ordinarios entre ubicaciones autorizadas de la misma sede y área de bodega. Los movimientos entre sedes se gestionan mediante remisiones; los movimientos hacia consumo productivo se gestionan mediante retiros o el flujo canónico correspondiente.

- `CTX-WH-WITHDRAWALS` — Retiros originados en la bodega activa, incluidos sus productos, cantidades, motivo, destino operativo y actor registrador.

- `CTX-WH-WITHDRAWAL-REGISTER` — Salida física de stock desde ubicación y lote exactos de la bodega activa hacia un destino o motivo válido. Debe impedir stock negativo, duplicidad, retroactividad no autorizada y consumo sin trazabilidad.

- `CTX-WH-OPERATIONS` — Cola y estado de operaciones ordinarias de la bodega activa: recepción física, ubicación, traslado, retiro, conteo, validación y preparación.

- `CTX-WH-STOCK-VALIDATION` — Validaciones físicas o dirigidas sobre un conjunto autorizado de stock y ubicaciones. Registra evidencia y diferencias, pero no corrige cantidades ni crea ajustes automáticamente.

- `CTX-WH-COUNT-READ` — Sesiones de conteo asignadas o ejecutadas en la bodega activa. Antes del envío debe preservar modalidad ciega; las diferencias y el stock teórico solo se muestran según la etapa y autoridad aprobadas.

- `CTX-WH-COUNT-PERFORM` — Captura y envío de cantidades físicas en sesiones válidas de la bodega activa. No concede aprobar diferencias, ajustar stock, reabrir sesiones cerradas ni alterar resultados de otro actor.

- `CTX-WH-INITIAL-COUNT` — Sesiones de conteo inicial asignadas a la bodega activa, con visibilidad limitada por etapa. No concede modificar la base inicial fuera del flujo formal.

- `CTX-WH-REMISSION` — Remisiones donde la bodega activa sea origen, destino receptor o custodio explícito. Excluye visibilidad general de otras sedes y campos no necesarios para la etapa.

- `CTX-WH-REMISSION-PREPARE` — Preparación de remisiones cuyo origen sea la bodega activa: reserva, alistamiento, cantidades preparadas, faltantes, sustituciones permitidas, empaque y estado listo para transporte. No inicia el tránsito.

- `CTX-WH-REMISSION-RECEIVE` — Recepción de remisiones cuyo destino autorizado sea la bodega activa. Exige verificación física, cantidades recibidas, diferencias y transferencia de custodia. El actor no puede recibir una remisión que preparó en el mismo extremo.

- `CTX-WH-SUPPLY-ROUTES` — Rutas y ventanas de abastecimiento publicadas necesarias para priorizar y preparar remisiones desde la bodega activa. No concede modificarlas ni coordinar transporte completo.

- `CTX-WH-PRINT-JOBS` — Trabajos de impresión originados por operaciones de la bodega activa, como etiquetas de LPN, ubicaciones o preparación. No permite editar plantillas.

- `CTX-WH-ORIGO-APP` — Entrada operativa a ORIGO para verificación física de abastecimiento durante el turno. No concede compras ni recepción por sí sola.

- `CTX-WH-PURCHASE-ORDERS` — Órdenes de compra aprobadas o vigentes cuyo destino receptor sea la sede o bodega activa. Mostrar solo productos, cantidades, presentaciones, proveedor, estado y datos necesarios para la recepción.

- `CTX-WH-PURCHASE-RECEIPTS` — Recepciones de compra vinculadas a la sede o bodega activa, incluidas sus cantidades, diferencias y estado. No concede registrar, revertir ni aprobar recepciones.

- `CTX-WH-SUPPLIER-IDENTITY` — Proyección mínima del proveedor necesaria para identificar la entrega y validar documentos. Excluye información bancaria, negociación, costos no requeridos y administración del maestro.


#### 7. Matriz canónica completa — 112 permisos


##### 7.1 SHELL — 1 permisos


| Permiso | Capacidad humana | Modalidad | Decisión para bodeguero | Alcance aprobado | Condición |
| ------- | ---------------- | --------- | ----------------------- | ---------------- | --------- |

| `shell.access` | Entrar a Vento OS | `BASE_ONLY` | **NO ASIGNAR** | — Denegación por defecto; no se crea concesión en la matriz operativa. | Capacidad exclusiva del carril base; no puede concederse desde esta matriz operativa. |


##### 7.2 ANIMA — 10 permisos


| Permiso | Capacidad humana | Modalidad | Decisión para bodeguero | Alcance aprobado | Condición |
| ------- | ---------------- | --------- | ----------------------- | ---------------- | --------- |

| `anima.access` | Entrar a ANIMA | `BASE_ONLY` | **NO ASIGNAR** | — Denegación por defecto; no se crea concesión en la matriz operativa. | Capacidad exclusiva del carril base; no puede concederse desde esta matriz operativa. |

| `anima.workforce.employee_documents.view` | Consultar documentos de trabajadores | `BASE_ONLY` | **NO ASIGNAR** | — Denegación por defecto; no se crea concesión en la matriz operativa. | Capacidad exclusiva del carril base; no puede concederse desde esta matriz operativa. |

| `anima.workforce.employee_documents.upload` | Cargar documentos de trabajadores | `BASE_ONLY` | **NO ASIGNAR** | — Denegación por defecto; no se crea concesión en la matriz operativa. | Capacidad exclusiva del carril base; no puede concederse desde esta matriz operativa. |

| `anima.workforce.employee_documents.delete` | Eliminar documentos de trabajadores | `BASE_ONLY` | **NO ASIGNAR** | — Denegación por defecto; no se crea concesión en la matriz operativa. | Capacidad exclusiva del carril base; no puede concederse desde esta matriz operativa. |

| `anima.workforce.employee_photos.upload` | Cargar fotografías de trabajadores | `BASE_ONLY` | **NO ASIGNAR** | — Denegación por defecto; no se crea concesión en la matriz operativa. | Capacidad exclusiva del carril base; no puede concederse desde esta matriz operativa. |

| `anima.workforce.team_members.view` | Consultar integrantes del equipo | `BASE_ONLY` | **NO ASIGNAR** | — Denegación por defecto; no se crea concesión en la matriz operativa. | Capacidad exclusiva del carril base; no puede concederse desde esta matriz operativa. |

| `anima.workforce.staff_invitations.create` | Invitar trabajadores | `BASE_ONLY` | **NO ASIGNAR** | — Denegación por defecto; no se crea concesión en la matriz operativa. | Capacidad exclusiva del carril base; no puede concederse desde esta matriz operativa. |

| `anima.attendance.shifts.create` | Crear turnos | `BASE_ONLY` | **NO ASIGNAR** | — Denegación por defecto; no se crea concesión en la matriz operativa. | Capacidad exclusiva del carril base; no puede concederse desde esta matriz operativa. |

| `anima.attendance.shifts.update` | Actualizar turnos | `BASE_ONLY` | **NO ASIGNAR** | — Denegación por defecto; no se crea concesión en la matriz operativa. | Capacidad exclusiva del carril base; no puede concederse desde esta matriz operativa. |

| `anima.attendance.shifts.cancel` | Cancelar turnos | `BASE_ONLY` | **NO ASIGNAR** | — Denegación por defecto; no se crea concesión en la matriz operativa. | Capacidad exclusiva del carril base; no puede concederse desde esta matriz operativa. |


##### 7.3 AURA — 1 permisos


| Permiso | Capacidad humana | Modalidad | Decisión para bodeguero | Alcance aprobado | Condición |
| ------- | ---------------- | --------- | ----------------------- | ---------------- | --------- |

| `aura.access` | Entrar a AURA | `BASE_ONLY` | **NO ASIGNAR** | — Denegación por defecto; no se crea concesión en la matriz operativa. | Capacidad exclusiva del carril base; no puede concederse desde esta matriz operativa. |


##### 7.4 FOGO — 6 permisos


| Permiso | Capacidad humana | Modalidad | Decisión para bodeguero | Alcance aprobado | Condición |
| ------- | ---------------- | --------- | ----------------------- | ---------------- | --------- |

| `fogo.access` | Entrar a FOGO | `BASE_OR_OPERATIONAL` | **NO ASIGNAR** | — Denegación por defecto; no se crea concesión en la matriz operativa. | La producción corresponde a roles productivos. El bodeguero solo consulta el reflejo de lotes dentro de NEXO cuando existe inventario bajo su custodia. |

| `fogo.production.batches.view` | Consultar lotes de producción | `BASE_OR_OPERATIONAL` | **NO ASIGNAR** | — Denegación por defecto; no se crea concesión en la matriz operativa. | La producción corresponde a roles productivos. El bodeguero solo consulta el reflejo de lotes dentro de NEXO cuando existe inventario bajo su custodia. |

| `fogo.production.batches.create` | Crear lotes de producción | `OPERATIONAL_ONLY` | **NO ASIGNAR** | — Denegación por defecto; no se crea concesión en la matriz operativa. | La producción corresponde a roles productivos. El bodeguero solo consulta el reflejo de lotes dentro de NEXO cuando existe inventario bajo su custodia. |

| `fogo.production.orders.view` | Consultar órdenes de producción | `BASE_OR_OPERATIONAL` | **NO ASIGNAR** | — Denegación por defecto; no se crea concesión en la matriz operativa. | La producción corresponde a roles productivos. El bodeguero solo consulta el reflejo de lotes dentro de NEXO cuando existe inventario bajo su custodia. |

| `fogo.production.recipe_book.view` | Consultar recetario operativo | `OPERATIONAL_ONLY` | **NO ASIGNAR** | — Denegación por defecto; no se crea concesión en la matriz operativa. | La producción corresponde a roles productivos. El bodeguero solo consulta el reflejo de lotes dentro de NEXO cuando existe inventario bajo su custodia. |

| `fogo.production.recipes.view` | Consultar recetas | `BASE_ONLY` | **NO ASIGNAR** | — Denegación por defecto; no se crea concesión en la matriz operativa. | Capacidad exclusiva del carril base; no puede concederse desde esta matriz operativa. |


##### 7.5 NEXO — 63 permisos


| Permiso | Capacidad humana | Modalidad | Decisión para bodeguero | Alcance aprobado | Condición |
| ------- | ---------------- | --------- | ----------------------- | ---------------- | --------- |

| `nexo.access` | Entrar a NEXO | `BASE_OR_OPERATIONAL` | **ASIGNAR OPERATIVO** | CTX-WH-NEXO-APP — Turno publicado y vigente, rol operativo `bodeguero`, sede autorizada y área activa de tipo `warehouse`. Permite entrar a NEXO; no concede ninguna capacidad interna por sí solo. | Carril operativo con prerrequisito `T`. Actor, turno, sede, área y recurso deben resolverse en servidor; toda mutación es idempotente y auditable. |

| `nexo.catalog.products.view` | Consultar productos | `BASE_OR_OPERATIONAL` | **ASIGNAR OPERATIVO** | CTX-WH-CATALOG — Productos vigentes que pueden almacenarse, recibirse, ubicarse, trasladarse, retirarse o incluirse en remisiones de la bodega activa. Excluye costos, márgenes, proveedores y configuración administrativa. | Carril operativo con prerrequisito `T`. Actor, turno, sede, área y recurso deben resolverse en servidor; toda mutación es idempotente y auditable. |

| `nexo.catalog.products.create` | Crear productos | `BASE_ONLY` | **NO ASIGNAR** | — Denegación por defecto; no se crea concesión en la matriz operativa. | Crear productos es administración del maestro; no corresponde a custodia física. |

| `nexo.catalog.presentations.view` | Consultar presentaciones | `BASE_OR_OPERATIONAL` | **ASIGNAR OPERATIVO** | CTX-WH-CATALOG — Presentaciones, empaques, conversiones y unidades logísticas necesarias para recibir, contar, ubicar, trasladar, retirar y preparar inventario. | Carril operativo con prerrequisito `T`. Actor, turno, sede, área y recurso deben resolverse en servidor; toda mutación es idempotente y auditable. |

| `nexo.catalog.request_policies.view` | Consultar políticas de solicitud | `BASE_OR_OPERATIONAL` | **ASIGNAR OPERATIVO** | CTX-WH-REQUEST-POLICIES — Políticas publicadas aplicables a solicitudes y abastecimiento de las sedes atendidas por la bodega activa. Solo lectura; no permite modificarlas. | Carril operativo con prerrequisito `T`. Actor, turno, sede, área y recurso deben resolverse en servidor; toda mutación es idempotente y auditable. |

| `nexo.catalog.categories.view` | Consultar categorías | `BASE_OR_OPERATIONAL` | **ASIGNAR OPERATIVO** | CTX-WH-CATALOG — Categorías necesarias para búsqueda, clasificación y operación física del inventario autorizado. | Carril operativo con prerrequisito `T`. Actor, turno, sede, área y recurso deben resolverse en servidor; toda mutación es idempotente y auditable. |

| `nexo.catalog.units.view` | Consultar unidades | `BASE_OR_OPERATIONAL` | **ASIGNAR OPERATIVO** | CTX-WH-CATALOG — Unidades, equivalencias y factores publicados necesarios para validar cantidades, presentaciones y conversiones. | Carril operativo con prerrequisito `T`. Actor, turno, sede, área y recurso deben resolverse en servidor; toda mutación es idempotente y auditable. |

| `nexo.assets.items.view` | Consultar activos | `BASE_OR_OPERATIONAL` | **NO ASIGNAR** | — Denegación por defecto; no se crea concesión en la matriz operativa. | Los activos físicos constituyen un subdominio distinto. La matriz ordinaria de bodeguero no presume responsabilidad sobre activos; podrá concederse mediante rol o excepción específica cuando se defina el proceso. |

| `nexo.assets.items.create` | Crear activos | `BASE_ONLY` | **NO ASIGNAR** | — Denegación por defecto; no se crea concesión en la matriz operativa. | Crear activos es administración del maestro y además BASE_ONLY. |

| `nexo.assets.groups.view` | Consultar grupos de activos | `BASE_OR_OPERATIONAL` | **NO ASIGNAR** | — Denegación por defecto; no se crea concesión en la matriz operativa. | Los grupos de activos no son necesarios para la operación ordinaria del inventario de consumibles y mercancías. |

| `nexo.assets.counts.view` | Consultar conteos de activos | `BASE_OR_OPERATIONAL` | **NO ASIGNAR** | — Denegación por defecto; no se crea concesión en la matriz operativa. | Los conteos de activos requieren un proceso y responsabilidad específicos; no se confunden con conteos de inventario. |

| `nexo.inventory.adjustments.view` | Consultar ajustes de inventario | `BASE_OR_OPERATIONAL` | **ASIGNAR OPERATIVO** | CTX-WH-ADJUSTMENTS-READ — Ajustes finalizados que afecten stock bajo custodia de la bodega activa. Durante conteos ciegos no se mostrarán existencias teóricas, variaciones ni información que sesgue el conteo. | Carril operativo con prerrequisito `T+C`. Actor, turno, sede, área y recurso deben resolverse en servidor; toda mutación es idempotente y auditable. |

| `nexo.inventory.adjustments.register` | Registrar ajustes de inventario | `BASE_AND_OPERATIONAL` | **NO ASIGNAR** | — Denegación por defecto; no se crea concesión en la matriz operativa. | El bodeguero puede detectar y documentar diferencias, pero no corregir stock unilateralmente. La capacidad exige BASE_AND_OPERATIONAL y autoridad base adicional. |

| `nexo.inventory.entries.view` | Consultar entradas de inventario | `BASE_OR_OPERATIONAL` | **ASIGNAR OPERATIVO** | CTX-WH-ENTRIES — Entradas ordinarias y sus líneas vinculadas a la bodega activa, incluida su fuente empresarial, estado, ubicación y trazabilidad visible. | Carril operativo con prerrequisito `T+C`. Actor, turno, sede, área y recurso deben resolverse en servidor; toda mutación es idempotente y auditable. |

| `nexo.inventory.entries.register` | Registrar entradas de inventario | `OPERATIONAL_ONLY` | **ASIGNAR OPERATIVO** | CTX-WH-ENTRY-REGISTER — Registro ordinario de entrada física a la bodega únicamente cuando exista una fuente válida: recepción aprobada, lote productivo liberado, devolución, remisión recibida u otro evento canónico autorizado. No permite crear stock sin soporte. | Carril operativo con prerrequisito `T+C`. Actor, turno, sede, área y recurso deben resolverse en servidor; toda mutación es idempotente y auditable. |

| `nexo.inventory.entries.override` | Registrar entradas excepcionales | `BASE_AND_OPERATIONAL` | **NO ASIGNAR** | — Denegación por defecto; no se crea concesión en la matriz operativa. | Las entradas excepcionales no forman parte de la operación ordinaria. Exigen autoridad base adicional, motivo reforzado y auditoría. |

| `nexo.inventory.locations.view` | Consultar ubicaciones de inventario | `BASE_OR_OPERATIONAL` | **ASIGNAR OPERATIVO** | CTX-WH-TOPOLOGY — Ubicaciones activas pertenecientes a la sede y al área de bodega del contexto operativo. No concede administrar el catálogo de ubicaciones. | Carril operativo con prerrequisito `T`. Actor, turno, sede, área y recurso deben resolverse en servidor; toda mutación es idempotente y auditable. |

| `nexo.inventory.location_assignments.assign` | Asignar ubicaciones de inventario | `OPERATIONAL_ONLY` | **ASIGNAR OPERATIVO** | CTX-WH-PUTAWAY — Asignación de stock o LPN recibidos a una ubicación válida dentro de la bodega activa. Exige compatibilidad de producto, capacidad, lote, estado y restricciones de almacenamiento. | Carril operativo con prerrequisito `T+C`. Actor, turno, sede, área y recurso deben resolverse en servidor; toda mutación es idempotente y auditable. |

| `nexo.inventory.location_catalog.update` | Actualizar el catálogo de una ubicación | `BASE_ONLY` | **NO ASIGNAR** | — Denegación por defecto; no se crea concesión en la matriz operativa. | Modificar el catálogo de una ubicación es configuración BASE_ONLY; el bodeguero puede usar y asignar ubicaciones, no redefinirlas. |

| `nexo.inventory.lpns.view` | Consultar LPN | `BASE_OR_OPERATIONAL` | **ASIGNAR OPERATIVO** | CTX-WH-LPN — LPN y contenedores bajo custodia de la bodega activa, con contenido, lote, ubicación y estado necesarios para operar. No permite reasignarlos sin el permiso correspondiente. | Carril operativo con prerrequisito `T+C`. Actor, turno, sede, área y recurso deben resolverse en servidor; toda mutación es idempotente y auditable. |

| `nexo.inventory.movements.view` | Consultar movimientos de inventario | `BASE_OR_OPERATIONAL` | **ASIGNAR OPERATIVO** | CTX-WH-MOVEMENTS — Movimientos que tengan origen, destino o efecto dentro de la bodega activa. La visibilidad de un extremo no habilita actuar sobre territorios no autorizados. | Carril operativo con prerrequisito `T+C`. Actor, turno, sede, área y recurso deben resolverse en servidor; toda mutación es idempotente y auditable. |

| `nexo.inventory.stock.view` | Consultar stock | `BASE_OR_OPERATIONAL` | **ASIGNAR OPERATIVO** | CTX-WH-STOCK — Existencias de la bodega activa por producto, presentación, lote, LPN y ubicación. No concede acceso a otras sedes ni a áreas no cubiertas por el contexto. | Carril operativo con prerrequisito `T+C`. Actor, turno, sede, área y recurso deben resolverse en servidor; toda mutación es idempotente y auditable. |

| `nexo.inventory.production_batches.view` | Consultar lotes vinculados al inventario | `BASE_OR_OPERATIONAL` | **ASIGNAR OPERATIVO** | CTX-WH-PRODUCTION-BATCHES — Lotes productivos reflejados en inventario cuando ingresen, se encuentren o deban trazarse dentro de la bodega activa. No concede operar FOGO ni modificar lotes productivos. | Carril operativo con prerrequisito `T+C`. Actor, turno, sede, área y recurso deben resolverse en servidor; toda mutación es idempotente y auditable. |

| `nexo.inventory.transfers.view` | Consultar traslados de inventario | `BASE_OR_OPERATIONAL` | **ASIGNAR OPERATIVO** | CTX-WH-TRANSFERS — Traslados donde la bodega activa sea origen o destino autorizado. La consulta de un extremo no amplía la autoridad sobre el otro. | Carril operativo con prerrequisito `T+C`. Actor, turno, sede, área y recurso deben resolverse en servidor; toda mutación es idempotente y auditable. |

| `nexo.inventory.transfers.create` | Crear traslados de inventario | `OPERATIONAL_ONLY` | **ASIGNAR OPERATIVO** | CTX-WH-TRANSFER-CREATE — Traslados ordinarios entre ubicaciones autorizadas de la misma sede y área de bodega. Los movimientos entre sedes se gestionan mediante remisiones; los movimientos hacia consumo productivo se gestionan mediante retiros o el flujo canónico correspondiente. | Carril operativo con prerrequisito `T+C`. Actor, turno, sede, área y recurso deben resolverse en servidor; toda mutación es idempotente y auditable. |

| `nexo.inventory.withdrawals.view` | Consultar retiros de inventario | `BASE_OR_OPERATIONAL` | **ASIGNAR OPERATIVO** | CTX-WH-WITHDRAWALS — Retiros originados en la bodega activa, incluidos sus productos, cantidades, motivo, destino operativo y actor registrador. | Carril operativo con prerrequisito `T+C`. Actor, turno, sede, área y recurso deben resolverse en servidor; toda mutación es idempotente y auditable. |

| `nexo.inventory.withdrawals.register` | Registrar retiros de inventario | `OPERATIONAL_ONLY` | **ASIGNAR OPERATIVO** | CTX-WH-WITHDRAWAL-REGISTER — Salida física de stock desde ubicación y lote exactos de la bodega activa hacia un destino o motivo válido. Debe impedir stock negativo, duplicidad, retroactividad no autorizada y consumo sin trazabilidad. | Carril operativo con prerrequisito `T+C`. Actor, turno, sede, área y recurso deben resolverse en servidor; toda mutación es idempotente y auditable. |

| `nexo.inventory.zones.view` | Consultar zonas de almacenamiento | `BASE_OR_OPERATIONAL` | **ASIGNAR OPERATIVO** | CTX-WH-TOPOLOGY — Zonas de almacenamiento pertenecientes a la bodega activa. | Carril operativo con prerrequisito `T`. Actor, turno, sede, área y recurso deben resolverse en servidor; toda mutación es idempotente y auditable. |

| `nexo.inventory.storage_positions.view` | Consultar posiciones de almacenamiento | `BASE_OR_OPERATIONAL` | **ASIGNAR OPERATIVO** | CTX-WH-TOPOLOGY — Posiciones de almacenamiento pertenecientes a zonas y ubicaciones autorizadas de la bodega activa. | Carril operativo con prerrequisito `T`. Actor, turno, sede, área y recurso deben resolverse en servidor; toda mutación es idempotente y auditable. |

| `nexo.inventory.warehouse_operations.view` | Consultar operaciones de bodega | `BASE_OR_OPERATIONAL` | **ASIGNAR OPERATIVO** | CTX-WH-OPERATIONS — Cola y estado de operaciones ordinarias de la bodega activa: recepción física, ubicación, traslado, retiro, conteo, validación y preparación. | Carril operativo con prerrequisito `T+C`. Actor, turno, sede, área y recurso deben resolverse en servidor; toda mutación es idempotente y auditable. |

| `nexo.inventory.stock_validations.perform` | Ejecutar validaciones de inventario | `OPERATIONAL_ONLY` | **ASIGNAR OPERATIVO** | CTX-WH-STOCK-VALIDATION — Validaciones físicas o dirigidas sobre un conjunto autorizado de stock y ubicaciones. Registra evidencia y diferencias, pero no corrige cantidades ni crea ajustes automáticamente. | Carril operativo con prerrequisito `T+C`. Actor, turno, sede, área y recurso deben resolverse en servidor; toda mutación es idempotente y auditable. |

| `nexo.inventory.stock_counts.view` | Consultar conteos de inventario | `BASE_OR_OPERATIONAL` | **ASIGNAR OPERATIVO** | CTX-WH-COUNT-READ — Sesiones de conteo asignadas o ejecutadas en la bodega activa. Antes del envío debe preservar modalidad ciega; las diferencias y el stock teórico solo se muestran según la etapa y autoridad aprobadas. | Carril operativo con prerrequisito `T+C`. Actor, turno, sede, área y recurso deben resolverse en servidor; toda mutación es idempotente y auditable. |

| `nexo.inventory.stock_counts.perform` | Ejecutar conteos de inventario | `OPERATIONAL_ONLY` | **ASIGNAR OPERATIVO** | CTX-WH-COUNT-PERFORM — Captura y envío de cantidades físicas en sesiones válidas de la bodega activa. No concede aprobar diferencias, ajustar stock, reabrir sesiones cerradas ni alterar resultados de otro actor. | Carril operativo con prerrequisito `T+C`. Actor, turno, sede, área y recurso deben resolverse en servidor; toda mutación es idempotente y auditable. |

| `nexo.inventory.initial_counts.view` | Consultar conteos iniciales | `BASE_OR_OPERATIONAL` | **ASIGNAR OPERATIVO** | CTX-WH-INITIAL-COUNT — Sesiones de conteo inicial asignadas a la bodega activa, con visibilidad limitada por etapa. No concede modificar la base inicial fuera del flujo formal. | Carril operativo con prerrequisito `T+C`. Actor, turno, sede, área y recurso deben resolverse en servidor; toda mutación es idempotente y auditable. |

| `nexo.inventory.remissions.view` | Consultar remisiones | `BASE_OR_OPERATIONAL` | **ASIGNAR OPERATIVO** | CTX-WH-REMISSION — Remisiones donde la bodega activa sea origen, destino receptor o custodio explícito. Excluye visibilidad general de otras sedes y campos no necesarios para la etapa. | Carril operativo con prerrequisito `T+C`. Actor, turno, sede, área y recurso deben resolverse en servidor; toda mutación es idempotente y auditable. |

| `nexo.inventory.remissions.update` | Actualizar remisiones | `BASE_OR_OPERATIONAL` | **NO ASIGNAR** | — Denegación por defecto; no se crea concesión en la matriz operativa. | La edición general es más amplia que preparar o recibir. El bodeguero utilizará las acciones atómicas de su etapa y no podrá alterar campos ajenos, origen, destino o estados libremente. |

| `nexo.inventory.remissions.request` | Solicitar remisiones | `OPERATIONAL_ONLY` | **NO ASIGNAR** | — Denegación por defecto; no se crea concesión en la matriz operativa. | Solicitar abastecimiento corresponde al área o sede demandante. La bodega de origen atiende solicitudes válidas, no las crea en nombre de terceros. |

| `nexo.inventory.remissions.prepare` | Preparar remisiones | `OPERATIONAL_ONLY` | **ASIGNAR OPERATIVO** | CTX-WH-REMISSION-PREPARE — Preparación de remisiones cuyo origen sea la bodega activa: reserva, alistamiento, cantidades preparadas, faltantes, sustituciones permitidas, empaque y estado listo para transporte. No inicia el tránsito. | Carril operativo con prerrequisito `T+C`. Actor, turno, sede, área y recurso deben resolverse en servidor; toda mutación es idempotente y auditable. |

| `nexo.inventory.remissions.dispatch` | Despachar remisiones | `OPERATIONAL_ONLY` | **NO ASIGNAR** | — Denegación por defecto; no se crea concesión en la matriz operativa. | Despachar inicia la salida y custodia en tránsito. Corresponde al conductor o actor logístico de despacho autorizado, no al bodeguero por defecto. |

| `nexo.inventory.remissions.receive` | Recibir remisiones | `OPERATIONAL_ONLY` | **ASIGNAR OPERATIVO** | CTX-WH-REMISSION-RECEIVE — Recepción de remisiones cuyo destino autorizado sea la bodega activa. Exige verificación física, cantidades recibidas, diferencias y transferencia de custodia. El actor no puede recibir una remisión que preparó en el mismo extremo. | Carril operativo con prerrequisito `T+C`. Actor, turno, sede, área y recurso deben resolverse en servidor; toda mutación es idempotente y auditable. |

| `nexo.inventory.remissions.cancel` | Cancelar remisiones | `BASE_OR_OPERATIONAL` | **NO ASIGNAR** | — Denegación por defecto; no se crea concesión en la matriz operativa. | Cancelar una remisión es una decisión sensible de control. No pertenece a la operación ordinaria del bodeguero. |

| `nexo.logistics.operations_board.view` | Consultar tablero logístico | `BASE_OR_OPERATIONAL` | **NO ASIGNAR** | — Denegación por defecto; no se crea concesión en la matriz operativa. | El tablero logístico transversal excede la cola local de bodega y puede revelar varias sedes y operaciones. |

| `nexo.logistics.operations.view` | Consultar operaciones logísticas | `BASE_OR_OPERATIONAL` | **NO ASIGNAR** | — Denegación por defecto; no se crea concesión en la matriz operativa. | La operación logística general excede la custodia local de bodega. |

| `nexo.logistics.driver_operations.view` | Consultar operaciones de conductores | `BASE_OR_OPERATIONAL` | **NO ASIGNAR** | — Denegación por defecto; no se crea concesión en la matriz operativa. | Las operaciones de conductores pertenecen al rol conductor o coordinación logística. |

| `nexo.logistics.fulfillment.view` | Consultar cumplimiento logístico | `BASE_OR_OPERATIONAL` | **NO ASIGNAR** | — Denegación por defecto; no se crea concesión en la matriz operativa. | El cumplimiento logístico transversal se reserva a coordinación o supervisión; la bodega consulta sus remisiones y operaciones locales. |

| `nexo.logistics.fulfillment_routes.view` | Consultar rutas de cumplimiento | `BASE_OR_OPERATIONAL` | **NO ASIGNAR** | — Denegación por defecto; no se crea concesión en la matriz operativa. | Las rutas de cumplimiento y transporte corresponden a logística y conductor; la bodega solo consulta rutas de abastecimiento necesarias para preparar. |

| `nexo.logistics.supply_routes.view` | Consultar rutas de abastecimiento | `BASE_OR_OPERATIONAL` | **ASIGNAR OPERATIVO** | CTX-WH-SUPPLY-ROUTES — Rutas y ventanas de abastecimiento publicadas necesarias para priorizar y preparar remisiones desde la bodega activa. No concede modificarlas ni coordinar transporte completo. | Carril operativo con prerrequisito `T`. Actor, turno, sede, área y recurso deben resolverse en servidor; toda mutación es idempotente y auditable. |

| `nexo.finance.internal_invoices.view` | Consultar facturas internas | `BASE_ONLY` | **NO ASIGNAR** | — Denegación por defecto; no se crea concesión en la matriz operativa. | Capacidad exclusiva del carril base; no puede concederse desde esta matriz operativa. |

| `nexo.finance.internal_invoices.generate` | Generar facturas internas | `BASE_ONLY` | **NO ASIGNAR** | — Denegación por defecto; no se crea concesión en la matriz operativa. | Capacidad exclusiva del carril base; no puede concederse desde esta matriz operativa. |

| `nexo.finance.internal_invoices.issue` | Emitir facturas internas | `BASE_ONLY` | **NO ASIGNAR** | — Denegación por defecto; no se crea concesión en la matriz operativa. | Capacidad exclusiva del carril base; no puede concederse desde esta matriz operativa. |

| `nexo.finance.internal_invoices.cancel` | Cancelar facturas internas | `BASE_ONLY` | **NO ASIGNAR** | — Denegación por defecto; no se crea concesión en la matriz operativa. | Capacidad exclusiva del carril base; no puede concederse desde esta matriz operativa. |

| `nexo.finance.internal_invoice_amounts.view` | Consultar valores de facturas internas | `BASE_ONLY` | **NO ASIGNAR** | — Denegación por defecto; no se crea concesión en la matriz operativa. | Capacidad exclusiva del carril base; no puede concederse desde esta matriz operativa. |

| `nexo.finance.internal_prices.view` | Consultar precios internos | `BASE_ONLY` | **NO ASIGNAR** | — Denegación por defecto; no se crea concesión en la matriz operativa. | Capacidad exclusiva del carril base; no puede concederse desde esta matriz operativa. |

| `nexo.finance.internal_variances.view` | Consultar variaciones internas | `BASE_ONLY` | **NO ASIGNAR** | — Denegación por defecto; no se crea concesión en la matriz operativa. | Capacidad exclusiva del carril base; no puede concederse desde esta matriz operativa. |

| `nexo.finance.internal_variances.approve` | Aprobar variaciones internas | `BASE_AND_OPERATIONAL` | **NO ASIGNAR** | — Denegación por defecto; no se crea concesión en la matriz operativa. | Aprobar variaciones requiere autoridad base y operativa; el bodeguero no aprueba sus propias diferencias. |

| `nexo.finance.internal_variances.resolve` | Resolver variaciones internas | `BASE_AND_OPERATIONAL` | **NO ASIGNAR** | — Denegación por defecto; no se crea concesión en la matriz operativa. | Resolver variaciones requiere autoridad base y operativa; el bodeguero aporta evidencia, no decide la regularización. |

| `nexo.finance.cost_centers.view` | Consultar centros de costo en NEXO | `BASE_ONLY` | **NO ASIGNAR** | — Denegación por defecto; no se crea concesión en la matriz operativa. | Capacidad exclusiva del carril base; no puede concederse desde esta matriz operativa. |

| `nexo.analytics.internal_reports.view` | Consultar reportes internos | `BASE_ONLY` | **NO ASIGNAR** | — Denegación por defecto; no se crea concesión en la matriz operativa. | Capacidad exclusiva del carril base; no puede concederse desde esta matriz operativa. |

| `nexo.analytics.margin_reports.view` | Consultar reportes de margen | `BASE_ONLY` | **NO ASIGNAR** | — Denegación por defecto; no se crea concesión en la matriz operativa. | Capacidad exclusiva del carril base; no puede concederse desde esta matriz operativa. |

| `nexo.printing.templates.update` | Editar plantillas de impresión | `BASE_ONLY` | **NO ASIGNAR** | — Denegación por defecto; no se crea concesión en la matriz operativa. | Capacidad exclusiva del carril base; no puede concederse desde esta matriz operativa. |

| `nexo.printing.jobs.view` | Consultar trabajos de impresión | `BASE_OR_OPERATIONAL` | **ASIGNAR OPERATIVO** | CTX-WH-PRINT-JOBS — Trabajos de impresión originados por operaciones de la bodega activa, como etiquetas de LPN, ubicaciones o preparación. No permite editar plantillas. | Carril operativo con prerrequisito `T+C`. Actor, turno, sede, área y recurso deben resolverse en servidor; toda mutación es idempotente y auditable. |

| `nexo.settings.sites.view` | Consultar configuración de sedes | `BASE_ONLY` | **NO ASIGNAR** | — Denegación por defecto; no se crea concesión en la matriz operativa. | Capacidad exclusiva del carril base; no puede concederse desde esta matriz operativa. |

| `nexo.settings.remission_policies.view` | Consultar políticas de remisiones | `BASE_ONLY` | **NO ASIGNAR** | — Denegación por defecto; no se crea concesión en la matriz operativa. | Las políticas generales de remisiones son configuración BASE_ONLY. La operación consume reglas publicadas mediante el flujo, no la administración completa. |


##### 7.6 NUMERA — 6 permisos


| Permiso | Capacidad humana | Modalidad | Decisión para bodeguero | Alcance aprobado | Condición |
| ------- | ---------------- | --------- | ----------------------- | ---------------- | --------- |

| `numera.access` | Entrar a NUMERA | `BASE_ONLY` | **NO ASIGNAR** | — Denegación por defecto; no se crea concesión en la matriz operativa. | Capacidad exclusiva del carril base; no puede concederse desde esta matriz operativa. |

| `numera.finance.cost_centers.view` | Consultar centros de costo | `BASE_ONLY` | **NO ASIGNAR** | — Denegación por defecto; no se crea concesión en la matriz operativa. | Capacidad exclusiva del carril base; no puede concederse desde esta matriz operativa. |

| `numera.finance.expenses.view` | Consultar gastos | `BASE_ONLY` | **NO ASIGNAR** | — Denegación por defecto; no se crea concesión en la matriz operativa. | Capacidad exclusiva del carril base; no puede concederse desde esta matriz operativa. |

| `numera.analytics.break_even.view` | Consultar punto de equilibrio | `BASE_ONLY` | **NO ASIGNAR** | — Denegación por defecto; no se crea concesión en la matriz operativa. | Capacidad exclusiva del carril base; no puede concederse desde esta matriz operativa. |

| `numera.analytics.profitability.view` | Consultar rentabilidad | `BASE_ONLY` | **NO ASIGNAR** | — Denegación por defecto; no se crea concesión en la matriz operativa. | Capacidad exclusiva del carril base; no puede concederse desde esta matriz operativa. |

| `numera.analytics.financial_reports.view` | Consultar reportes financieros | `BASE_ONLY` | **NO ASIGNAR** | — Denegación por defecto; no se crea concesión en la matriz operativa. | Capacidad exclusiva del carril base; no puede concederse desde esta matriz operativa. |


##### 7.7 ORIGO — 5 permisos


| Permiso | Capacidad humana | Modalidad | Decisión para bodeguero | Alcance aprobado | Condición |
| ------- | ---------------- | --------- | ----------------------- | ---------------- | --------- |

| `origo.access` | Entrar a ORIGO | `BASE_OR_OPERATIONAL` | **ASIGNAR OPERATIVO** | CTX-WH-ORIGO-APP — Entrada operativa a ORIGO para verificación física de abastecimiento durante el turno. No concede compras ni recepción por sí sola. | Carril operativo con prerrequisito `T`. Actor, turno, sede, área y recurso deben resolverse en servidor; toda mutación es idempotente y auditable. |

| `origo.procurement.purchase_orders.view` | Consultar órdenes de compra | `BASE_OR_OPERATIONAL` | **ASIGNAR OPERATIVO** | CTX-WH-PURCHASE-ORDERS — Órdenes de compra aprobadas o vigentes cuyo destino receptor sea la sede o bodega activa. Mostrar solo productos, cantidades, presentaciones, proveedor, estado y datos necesarios para la recepción. | Carril operativo con prerrequisito `T+C`. Actor, turno, sede, área y recurso deben resolverse en servidor; toda mutación es idempotente y auditable. |

| `origo.procurement.receipts.view` | Consultar recepciones de compra | `BASE_OR_OPERATIONAL` | **ASIGNAR OPERATIVO** | CTX-WH-PURCHASE-RECEIPTS — Recepciones de compra vinculadas a la sede o bodega activa, incluidas sus cantidades, diferencias y estado. No concede registrar, revertir ni aprobar recepciones. | Carril operativo con prerrequisito `T+C`. Actor, turno, sede, área y recurso deben resolverse en servidor; toda mutación es idempotente y auditable. |

| `origo.procurement.suppliers.view` | Consultar proveedores | `BASE_OR_OPERATIONAL` | **ASIGNAR OPERATIVO** | CTX-WH-SUPPLIER-IDENTITY — Proyección mínima del proveedor necesaria para identificar la entrega y validar documentos. Excluye información bancaria, negociación, costos no requeridos y administración del maestro. | Carril operativo con prerrequisito `T+C`. Actor, turno, sede, área y recurso deben resolverse en servidor; toda mutación es idempotente y auditable. |

| `origo.catalog.product_reviews.view` | Consultar revisiones de productos | `BASE_ONLY` | **NO ASIGNAR** | — Denegación por defecto; no se crea concesión en la matriz operativa. | La revisión del maestro de productos es administrativa y BASE_ONLY. |


##### 7.8 VENTO PASS — 1 permisos


| Permiso | Capacidad humana | Modalidad | Decisión para bodeguero | Alcance aprobado | Condición |
| ------- | ---------------- | --------- | ----------------------- | ---------------- | --------- |

| `pass.access` | Entrar a Vento Pass | `BASE_ONLY` | **NO ASIGNAR** | — Denegación por defecto; no se crea concesión en la matriz operativa. | Capacidad exclusiva del carril base; no puede concederse desde esta matriz operativa. |


##### 7.9 PULSO — 2 permisos


| Permiso | Capacidad humana | Modalidad | Decisión para bodeguero | Alcance aprobado | Condición |
| ------- | ---------------- | --------- | ----------------------- | ---------------- | --------- |

| `pulso.access` | Entrar a PULSO | `OPERATIONAL_ONLY` | **NO ASIGNAR** | — Denegación por defecto; no se crea concesión en la matriz operativa. | Operación comercial del punto de venta ajena a la bodega central. |

| `pulso.delivery.deliveries.override` | Confirmar entregas de forma excepcional | `BASE_AND_OPERATIONAL` | **NO ASIGNAR** | — Denegación por defecto; no se crea concesión en la matriz operativa. | Capacidad combinada o excepcional. Requiere autoridad base adicional y no forma parte del trabajo ordinario del bodeguero. |


##### 7.10 VISO — 17 permisos


| Permiso | Capacidad humana | Modalidad | Decisión para bodeguero | Alcance aprobado | Condición |
| ------- | ---------------- | --------- | ----------------------- | ---------------- | --------- |

| `viso.access` | Entrar a VISO | `BASE_ONLY` | **NO ASIGNAR** | — Denegación por defecto; no se crea concesión en la matriz operativa. | Capacidad exclusiva del carril base; no puede concederse desde esta matriz operativa. |

| `viso.platform.app_updates.view` | Consultar actualizaciones de aplicaciones | `BASE_ONLY` | **NO ASIGNAR** | — Denegación por defecto; no se crea concesión en la matriz operativa. | Capacidad exclusiva del carril base; no puede concederse desde esta matriz operativa. |

| `viso.organization.businesses.view` | Consultar empresas y unidades de negocio | `BASE_ONLY` | **NO ASIGNAR** | — Denegación por defecto; no se crea concesión en la matriz operativa. | Capacidad exclusiva del carril base; no puede concederse desde esta matriz operativa. |

| `viso.workforce.employees.view` | Consultar trabajadores | `BASE_ONLY` | **NO ASIGNAR** | — Denegación por defecto; no se crea concesión en la matriz operativa. | Capacidad exclusiva del carril base; no puede concederse desde esta matriz operativa. |

| `viso.workforce.staff_calendar.view` | Consultar calendario del personal | `BASE_ONLY` | **NO ASIGNAR** | — Denegación por defecto; no se crea concesión en la matriz operativa. | Capacidad exclusiva del carril base; no puede concederse desde esta matriz operativa. |

| `viso.workforce.schedules.view` | Consultar programación de turnos | `BASE_ONLY` | **NO ASIGNAR** | — Denegación por defecto; no se crea concesión en la matriz operativa. | Capacidad exclusiva del carril base; no puede concederse desde esta matriz operativa. |

| `viso.workforce.vacancies.view` | Consultar vacantes | `BASE_ONLY` | **NO ASIGNAR** | — Denegación por defecto; no se crea concesión en la matriz operativa. | Capacidad exclusiva del carril base; no puede concederse desde esta matriz operativa. |

| `viso.authorization.context_simulations.view` | Consultar simulaciones de autorización | `BASE_ONLY` | **NO ASIGNAR** | — Denegación por defecto; no se crea concesión en la matriz operativa. | Capacidad exclusiva del carril base; no puede concederse desde esta matriz operativa. |

| `viso.authorization.audit_logs.view` | Consultar auditoría de autorización | `BASE_ONLY` | **NO ASIGNAR** | — Denegación por defecto; no se crea concesión en la matriz operativa. | Capacidad exclusiva del carril base; no puede concederse desde esta matriz operativa. |

| `viso.catalog.commercial_categories.view` | Consultar categorías comerciales | `BASE_ONLY` | **NO ASIGNAR** | — Denegación por defecto; no se crea concesión en la matriz operativa. | Capacidad exclusiva del carril base; no puede concederse desde esta matriz operativa. |

| `viso.content.content_blocks.view` | Consultar bloques de contenido | `BASE_ONLY` | **NO ASIGNAR** | — Denegación por defecto; no se crea concesión en la matriz operativa. | Capacidad exclusiva del carril base; no puede concederse desde esta matriz operativa. |

| `viso.content.menu.view` | Consultar menú | `BASE_ONLY` | **NO ASIGNAR** | — Denegación por defecto; no se crea concesión en la matriz operativa. | Capacidad exclusiva del carril base; no puede concederse desde esta matriz operativa. |

| `viso.content.website_content.view` | Consultar contenido del sitio web | `BASE_ONLY` | **NO ASIGNAR** | — Denegación por defecto; no se crea concesión en la matriz operativa. | Capacidad exclusiva del carril base; no puede concederse desde esta matriz operativa. |

| `viso.finance.accounting.view` | Consultar información contable | `BASE_ONLY` | **NO ASIGNAR** | — Denegación por defecto; no se crea concesión en la matriz operativa. | Capacidad exclusiva del carril base; no puede concederse desde esta matriz operativa. |

| `viso.delivery.rates.view` | Consultar tarifas de entrega | `BASE_ONLY` | **NO ASIGNAR** | — Denegación por defecto; no se crea concesión en la matriz operativa. | Capacidad exclusiva del carril base; no puede concederse desde esta matriz operativa. |

| `viso.loyalty.products.view` | Consultar productos de fidelización | `BASE_ONLY` | **NO ASIGNAR** | — Denegación por defecto; no se crea concesión en la matriz operativa. | Capacidad exclusiva del carril base; no puede concederse desde esta matriz operativa. |

| `viso.loyalty.customers.view` | Consultar clientes de fidelización | `BASE_ONLY` | **NO ASIGNAR** | — Denegación por defecto; no se crea concesión en la matriz operativa. | Capacidad exclusiva del carril base; no puede concederse desde esta matriz operativa. |


#### 8. Reglas obligatorias de operación

1. Cada concesión utiliza una clave canónica exacta; no existen wildcards, permisos por prefijo ni autorización por nombre del rol.

2. El rol operativo efectivo procede exclusivamente del turno válido. El código coincidente `bodeguero` en el catálogo base no reutiliza ni amplía esta matriz.

3. El área activa de bodega debe resolverse desde el turno y corresponder a la sede operativa. Una ubicación de inventario no sustituye el área empresarial.

4. El permiso operativo global, cuando se materialice, solo será reutilizable dentro de contextos válidos; nunca permitirá operar simultáneamente otras sedes.

5. Las consultas se limitan a recursos relacionados con la sede y área activas, incluso cuando el recurso tenga extremos de origen y destino.

6. Toda entrada ordinaria exige un documento o evento fuente canónico y no puede duplicar el efecto producido por ORIGO, FOGO o una remisión.

7. Asignar ubicación no permite modificar el catálogo de ubicaciones ni omitir restricciones de capacidad, compatibilidad, lote, temperatura o estado.

8. Todo traslado creado por el bodeguero queda limitado a ubicaciones autorizadas de la misma sede y bodega. Entre sedes se utilizará una remisión.

9. Todo retiro exige ubicación, lote o LPN, cantidad, unidad, destino o motivo y actor. Debe impedir stock negativo y mantener trazabilidad append-only.

10. Los conteos y validaciones registran evidencia; no producen ajustes automáticos ni permiten al bodeguero aprobar sus propias diferencias.

11. La interfaz de conteo deberá ser ciega mientras corresponda y no revelar stock teórico, variaciones o ajustes antes de la etapa autorizada.

12. `remissions.prepare` permite alistar, registrar faltantes y dejar listo para transporte; no concede `dispatch` ni transfiere custodia al conductor.

13. `remissions.receive` solo aplica cuando la bodega activa es destino autorizado y debe impedir que el mismo extremo sea preparado y recibido por el mismo actor sin una excepción formal.

14. No se concede `remissions.update`: cada etapa utilizará su permiso atómico para evitar edición transversal del recurso.

15. La consulta de ORIGO es una proyección operativa de verificación. No muestra información comercial, bancaria o negociaciones que no sean necesarias.

16. El catálogo actual carece de `origo.procurement.receipts.register`; por tanto, esta matriz no afirma que la recepción de compra esté completa.

17. El dispositivo compartido restringe y nunca amplía. `KIOSCO_BODEGA_CP` requiere actor humano identificado, sesión vigente y permiso real del actor.

18. La política legacy `same_site_active_worker` es insuficiente para acciones de bodega; deberá sustituirse o complementarse con validación del rol `bodeguero` y del área activa.

19. APP-REVIEW, demo, sedes aisladas y recursos no habilitados permanecen excluidos.

20. No se implementan cambios físicos durante esta tarea.


#### 9. Brechas contractuales identificadas

| Brecha                                                                             | Impacto                                                                                                                             | Decisión en esta matriz                                                                                                                       |
| ---------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------- |
| ORIGO no tiene `procurement.receipts.register`                                     | El bodeguero puede verificar la orden y la recepción, pero no existe capacidad atómica canónica para registrar la recepción física. | No inventar autorización. Crear el permiso en una futura versión contractual antes de implementar el flujo completo.                          |
| No existe permiso específico para cuarentena, rechazo, vencimiento, avería o merma | La entrada ordinaria no debe convertirse en un canal genérico para excepciones de calidad.                                          | Denegar cualquier efecto excepcional no representado; documentarlo como flujo futuro.                                                         |
| No existe permiso atómico de impresión o reimpresión                               | `printing.jobs.view` solo permite consultar trabajos.                                                                               | No inferir impresión desde la consulta; el flujo propietario deberá emitir la acción técnica mediante el permiso empresarial correspondiente. |
| No existe aprobación de conteo separada                                            | `stock_counts.perform` permite capturar cantidades, no aprobar diferencias.                                                         | Mantener separación: bodeguero cuenta; autoridad base revisa y, si corresponde, ajusta.                                                       |
| `warehouse_kiosk` usa `same_site_active_worker`                                    | Puede admitir trabajadores de otras áreas de la sede.                                                                               | La implementación deberá exigir rol y área compatibles antes de cualquier acción empresarial.                                                 |


#### 10. Capacidades expresamente excluidas

- Ajustar inventario o registrar entradas excepcionales sin autoridad base adicional.
- Crear o modificar productos, activos, ubicaciones, políticas, rutas o plantillas.
- Aprobar, resolver o consultar información financiera y variaciones internas.
- Crear solicitudes de remisión en nombre de áreas solicitantes.
- Cancelar remisiones o editar libremente sus datos y estados.
- Iniciar tránsito, asumir custodia del conductor o consultar operaciones de conductores.
- Operar FOGO, PULSO, NUMERA, VISO, AURA o Vento Pass.
- Administrar compras, proveedores o el maestro de productos desde ORIGO.
- Gestionar activos por defecto; esa responsabilidad requiere una definición separada.


#### 11. Validaciones mínimas por tipo de acción

| Acción                  | Validaciones mínimas                                                                                                                                    |
| ----------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Entrada ordinaria       | Fuente válida, documento único, producto/presentación vigente, cantidad y unidad válidas, lote/fecha cuando aplique, sede y área destino, idempotencia. |
| Ubicación               | Ubicación activa, misma sede/área, capacidad, compatibilidad, restricciones físicas, stock o LPN identificados.                                         |
| Traslado                | Ambos extremos autorizados, misma sede y bodega, disponibilidad, bloqueo de origen, movimiento atómico, trazabilidad.                                   |
| Retiro                  | Origen exacto, disponibilidad, motivo/destino, unidad y conversión válidas, sin stock negativo, auditoría reforzada.                                    |
| Conteo                  | Sesión asignada, conjunto cerrado de ubicaciones, modalidad ciega, captura por actor, bloqueo de edición posterior, evidencia.                          |
| Preparación de remisión | Origen autorizado, estado preparable, líneas solicitadas, cantidades preparadas, faltantes, sustituciones permitidas, empaque, versión.                 |
| Recepción de remisión   | Destino autorizado, estado recibible, verificación física, diferencias, transferencia de custodia, efecto de inventario único.                          |
| Verificación de compra  | Orden y recepción relacionadas con la sede, proveedor identificable, proyección mínima, sin mutaciones por esta matriz.                                 |


#### 12. Compatibilidad con dispositivos compartidos

Las concesiones admitidas desde un dispositivo compartido deberán respetar la clasificación canónica de cada permiso. El kiosco no podrá ejecutar ninguna acción mientras no exista una sesión ligera atribuida a un trabajador activo con turno, check-in, rol `bodeguero`, sede y área válidos.

Las acciones sensibles o mutadoras deberán revalidarse en servidor en cada solicitud. El PIN identifica al actor dentro del dispositivo; no reemplaza autenticación fuerte cuando el permiso la exija ni convierte el dispositivo técnico en empleado.


#### 13. Riesgos de transición

1. `bodeguero` existe simultáneamente como rol base y operativo; la implementación deberá registrar siempre el origen de la concesión.
2. Los permisos base legacy del oficio no podrán mantener acciones `OPERATIONAL_ONLY` fuera de turno.
3. RLS, helpers y frontend con hardcode de `bodeguero` pueden conservar accesos aunque se corrija la matriz.
4. La matriz actual de Supabase usa cadenas sin FK y concesiones globales; el dataset canónico deberá corregir integridad y alcance.
5. La identidad heredada “Tablet Bodega” no puede continuar actuando como empleado.
6. Preparar, recibir, entrar, ubicar y retirar pueden duplicar efectos si las RPC no comparten contratos idempotentes.


#### 14. Resultado esperado en la experiencia

```text
BODEGA — CENTRO DE PRODUCCIÓN

Pendientes
[ Recibir mercancía ]
[ Ubicar inventario ]
[ Preparar remisiones ]
[ Recibir remisiones ]

Operación
[ Consultar stock ]
[ Registrar retiro ]
[ Trasladar dentro de bodega ]
[ Conteos asignados ]

Control
[ Ver movimientos ]
[ Ver entradas ]
[ Ver ajustes aplicados ]

No visible
- Ajustar inventario
- Entrada excepcional
- Cancelar remisión
- Despachar transporte
- Aprobar diferencias
- Configurar productos o ubicaciones
```


#### 15. Invariantes

- Bodeguero es rol operativo, no autoridad permanente.

- Bodega, sede, área, ubicación y recurso permanecen conceptos separados.

- El dispositivo técnico no posee permisos empresariales.

- La consulta no implica mutación.

- El conteo no implica ajuste.

- La validación no implica aprobación.

- La entrada ordinaria no implica override.

- La preparación no implica despacho.

- La recepción no implica cancelación.

- La visibilidad de un extremo no autoriza el otro.

- El movimiento entre sedes no se modela como traslado local.

- No existe acceso financiero implícito.

- No existe administración por nombre de rol.

- Toda mutación conserva actor, contexto, recurso, versión e idempotencia.

- La ausencia de permiso produce denegación.


#### 16. Criterios de aprobación

La tarea podrá aprobarse cuando se acepte que:

- el bodeguero recibe 35 concesiones operativas explícitas;
- puede ejecutar la operación ordinaria completa de custodia de la bodega;
- no puede ajustar inventario, registrar excepciones ni aprobar diferencias por sí solo;
- prepara remisiones, pero no inicia el tránsito;
- puede recibir remisiones cuando la bodega sea destino;
- puede verificar compras y recepciones en ORIGO sin administrarlas;
- la recepción física de compra continúa incompleta hasta crear el permiso atómico faltante;
- no hereda permisos del rol base legacy ni del dispositivo;
- los 112 permisos fueron evaluados sin omisiones ni duplicados.


#### 17. Estado final de la propuesta

| Tarea         | Estado      |
| ------------- | ----------- |
| AUTH-RBAC-016 | APROBADA    |
| AUTH-RBAC-017 | APROBADA    |
| AUTH-RBAC-018 | NO INICIADA |

No se implementan código, migraciones, cambios en Supabase, RLS, RPC, datasets, repositorios, guards, dispositivos ni pantallas. La matriz solo será canónica cuando el usuario la apruebe expresamente.


### ✅ AUTH-RBAC-018 — Crear matriz de conductor_logistica

#### 1. Identificación de la tarea

| Campo                     | Valor                                                              |
| ------------------------- | ------------------------------------------------------------------ |
| Bloque                    | BLOQUE D — Matrices canónicas de roles, excepciones y dispositivos |
| Tarea                     | AUTH-RBAC-018 — Crear matriz de conductor_logistica                |
| Estado                    | **APROBADA**                                                       |
| Naturaleza                | Definición documental de matriz operativa de transporte y custodia |
| Implementación física     | No incluida                                                        |
| Catálogo evaluado         | Snapshot aprobado: 112 permisos; conjunto activo vigente: 140 PermissionKey |
| Tarea anterior vigente    | AUTH-RBAC-017 — APROBADA                                           |
| Tarea posterior reservada | AUTH-RBAC-019 — Crear matriz de gerencia_operativa                 |

Esta tarea no modifica Supabase, migraciones, tablas, RLS, RPC, aplicaciones, repositorios, dispositivos ni datasets físicos. La aplicación posterior deberá realizarse mediante AUTH-RBAC-025 y las migraciones versionadas del BLOQUE R en `vento-shell`.

#### 1.1 Reconciliación contractual vinculante

El cuerpo original de AUTH-RBAC-018 conserva trazabilidad como **snapshot histórico aprobado de 112 permisos y 14 concesiones**. Ese snapshot ya no determina autorización runtime. La autoridad vigente se resuelve contra el conjunto activo congelado por AUTH-CAT-024, preservado por AUTH-CAT-025, y contra el dataset operacional materializado.

- conjunto activo vigente: **140 PermissionKey**;
- concesiones vigentes de `conductor_logistica`: **16**;
- `nexo.inventory.remissions.accept_custody`: capacidad activa y concedida para aceptar custodia;
- `nexo.inventory.remissions.start_transit`: capacidad activa y concedida para iniciar tránsito después de aceptar custodia;
- `nexo.inventory.remissions.deliver`: capacidad activa y concedida para registrar el handoff físico al receptor previsto;
- `nexo.inventory.remissions.receive`: permanece separada y pertenece al receptor autorizado del destino;
- `nexo.inventory.remissions.dispatch`, `nexo.inventory.remissions.transit` y `nexo.transit.view`: no pertenecen al conjunto activo y no autorizan runtime;
- no existe alias uno-a-muchos desde `dispatch` hacia `accept_custody` y `start_transit`; cada acción exige su PermissionKey exacta;
- cualquier mutación de progreso, incidencia, retorno o reasignación sin PermissionKey activa exacta permanece `DEFAULT_DENY`.

Ante cualquier conflicto entre el snapshot histórico de las secciones siguientes y esta reconciliación, prevalecen el catálogo congelado, los grants vigentes y las decisiones de AUTH-CAT-022 a AUTH-CAT-025.

#### 2. Objetivo

Definir, permiso por permiso, las capacidades del rol operativo `conductor_logistica` para recoger carga preparada, aceptar custodia, iniciar y ejecutar el tránsito, consultar su ruta y entregar físicamente la carga al actor receptor, sin convertirlo en bodeguero, receptor, administrador logístico, corrector de inventario, comprador ni autoridad para cancelar operaciones.

#### 3. Decisión principal

`conductor_logistica` representa la función temporal responsable del transporte y de la custodia física desde la aceptación documentada de la carga hasta su entrega documentada al destino autorizado. Su autoridad se limita a operaciones, rutas, remisiones y bultos que estén asignados al actor, al vehículo o a la jornada vigente.

```text
ACTOR HUMANO IDENTIFICADO
+ TURNO PUBLICADO Y VIGENTE
+ CHECK-IN ACTIVO EN PUNTO AUTORIZADO
+ ROL OPERATIVO conductor_logistica
+ RUTA, VEHÍCULO U OPERACIÓN ASIGNADA
+ REMISIÓN PREPARADA Y LISTA PARA TRANSPORTE
+ PERMISO EXACTO
+ RECURSO RELACIONADO CON LA CUSTODIA DEL ACTOR
= AUTORIZACIÓN OPERATIVA DE TRANSPORTE
```

No se admite:

```text
employees.role = conductor → acceso permanente
perfil predeterminado → autorización
vehículo asignado → permiso empresarial
nexo.access → acceso logístico total
ver remisión → modificar cantidades
aceptar custodia → preparar carga
iniciar tránsito → recibir en destino
entregar físicamente → auto-confirmar recepción
incidencia → ajustar inventario
conductor_logistica → consultar todas las rutas o conductores
```

#### 4. Separación de responsabilidades

| Etapa                    | Responsable principal                                 | Facultad del conductor                                                            | Límite obligatorio                                                        |
| ------------------------ | ----------------------------------------------------- | --------------------------------------------------------------------------------- | ------------------------------------------------------------------------- |
| Solicitud                | Área solicitante                                      | Consultar solo cuando la remisión quede asignada a su operación                   | No solicita en nombre de terceros                                         |
| Preparación              | Bodeguero u origen autorizado                         | Verificar manifiesto, bultos y estado listo                                       | No reserva, sustituye ni modifica cantidades                              |
| Carga                    | Origen + conductor                                    | Contrastar bultos, sellos, LPN y vehículo antes de aceptar custodia               | No crea stock ni corrige diferencias                                      |
| Despacho                 | Conductor                                             | Aceptar custodia mediante `nexo.inventory.remissions.accept_custody`                              | No inicia tránsito ni modifica cantidades por esa capacidad               |
| Tránsito                 | Conductor                                             | Iniciar tránsito mediante `nexo.inventory.remissions.start_transit` y consultar únicamente trabajo asignado | Requiere custodia previa; no opera remisiones ajenas                       |
| Entrega física           | Conductor                                             | Registrar el handoff mediante `nexo.inventory.remissions.deliver`                                | No ejecuta `nexo.inventory.remissions.receive` por el destino              |
| Recepción                | Actor del destino                                     | Permanecer como custodio hasta la aceptación                                      | El conductor no ejecuta `remissions.receive`                              |
| Diferencias o incidentes | Conductor reporta; autoridad correspondiente resuelve | Aportar evidencia y bloquear continuidad si corresponde                           | No ajusta inventario, cancela ni resuelve unilateralmente                 |

#### 5. Resultado cuantitativo y reconciliación

##### 5.1 Snapshot histórico aprobado

| Resultado                                    | Cantidad | Efecto                                                                              |
| -------------------------------------------- | -------: | ----------------------------------------------------------------------------------- |
| Capacidades operativas asignadas             |       14 | Concesiones explícitas de NEXO para carga asignada, tránsito, rutas y cumplimiento. |
| Capacidades `BASE_AND_OPERATIONAL` asignadas |        0 | El rol no recibe overrides, ajustes, cancelaciones ni aprobaciones.                 |
| Capacidades no asignadas                     |       98 | Permanecen denegadas por defecto.                                                   |
| Total evaluado                               |      112 | Snapshot histórico aprobado sin omisiones ni duplicados.                            |

La matriz original contiene **14 concesiones históricas a nivel de clave** y **98 ausencias históricas de concesión**. Estas cifras se preservan solo como lineage del snapshot de 112 permisos.

##### 5.2 Vigencia contractual materializada

| Resultado vigente                                      | Cantidad | Efecto |
| ------------------------------------------------------ | -------: | ------ |
| PermissionKey activas                                  |      140 | Conjunto autorizante vigente; no se infieren claves legacy. |
| Concesiones vigentes de `conductor_logistica`         |       16 | Grants operacionales materializados y auditables. |
| PermissionKey activas no concedidas al conductor       |      124 | Denegación por ausencia de grant; no se crean deny redundantes. |
| Mutaciones atómicas de remisión concedidas al conductor |        3 | `accept_custody`, `start_transit` y `deliver`. |

La autorización runtime se evalúa exclusivamente sobre esta vigencia contractual y no sobre el conteo histórico de 112.

#### 6. Perfiles de alcance utilizados

- `CTX-DRV-NEXO-APP` — Entrada a NEXO durante un turno de conductor válido. No concede ninguna función interna por sí sola.
- `CTX-DRV-CARGO-CATALOG` — Productos, presentaciones y unidades incluidos en la carga asignada. Excluye información comercial, financiera o de proveedores.
- `CTX-DRV-LPN` — LPN, bultos, contenedores y sellos vinculados a remisiones bajo custodia del actor.
- `CTX-DRV-CUSTODY-MOVEMENTS` — Eventos de custodia e inventario relacionados con la operación asignada, no el historial global.
- `CTX-DRV-REMISSIONS` — Remisiones asignadas al conductor, ruta o vehículo y remisiones listas para recogida en un origen autorizado.
- `CTX-DRV-ACCEPT-CUSTODY` — Aceptar custodia de bultos, LPN y cantidades declaradas únicamente sobre remisiones, ruta, vehículo o segmento logístico asignados.
- `CTX-DRV-START-TRANSIT` — Iniciar tránsito únicamente sobre una remisión con custodia ya aceptada y asignación logística vigente.
- `CTX-DRV-DELIVER` — Registrar entrega física al receptor previsto únicamente sobre la remisión y destino autorizados, sin ejecutar recepción en nombre del destino.
- `CTX-DRV-BOARD` — Tablero limitado a las operaciones propias del turno.
- `CTX-DRV-OPERATIONS` — Operaciones donde el conductor sea actor asignado o custodio vigente.
- `CTX-DRV-SELF` — Historial y estado operativo del propio conductor, nunca de otros conductores.
- `CTX-DRV-FULFILLMENT` — Cumplimiento de paradas y remisiones asignadas.
- `CTX-DRV-FULFILLMENT-ROUTES` — Ruta y secuencia de paradas asignadas, en modo de solo lectura.
- `CTX-DRV-SUPPLY-ROUTES` — Rutas de abastecimiento publicadas aplicables a la jornada.

Los perfiles operativos se materializarán después como contratos de recurso y filtros del lado servidor. No son simples filtros visuales.

#### 7. Matriz histórica aprobada — snapshot de 112 permisos (no autorizante runtime)

Las filas 7.1 a 7.10 preservan el snapshot aprobado original para trazabilidad. Sus decisiones no sustituyen el conjunto activo ni los grants vigentes cuando una clave fue retirada, dividida o incorporada posteriormente.

##### 7.0 Delta contractual vigente sobre remisiones

| PermissionKey vigente | Decisión actual para `conductor_logistica` | Frontera |
| --- | --- | --- |
| `nexo.inventory.remissions.accept_custody` | **ASIGNAR OPERATIVO** | Acepta custodia; no inicia tránsito ni altera cantidades declaradas. |
| `nexo.inventory.remissions.start_transit` | **ASIGNAR OPERATIVO** | Inicia tránsito con custodia previa; no acepta custodia retroactivamente ni entrega. |
| `nexo.inventory.remissions.deliver` | **ASIGNAR OPERATIVO** | Registra handoff físico; no ejecuta `receive` ni crea inventario en destino. |

`nexo.inventory.remissions.view` conserva su grant de lectura acotada. `nexo.inventory.remissions.dispatch`, `nexo.inventory.remissions.transit` y `nexo.transit.view` permanecen fuera del conjunto activo.


##### 7.1 SHELL — 1 permisos

| Permiso        | Capacidad humana  | Modalidad   | Decisión para conductor_logistica | Alcance aprobado                                                       | Condición                                                                             |
| -------------- | ----------------- | ----------- | --------------------------------- | ---------------------------------------------------------------------- | ------------------------------------------------------------------------------------- |
| `shell.access` | Entrar a Vento OS | `BASE_ONLY` | **NO ASIGNAR**                    | — Denegación por defecto; no se crea concesión en la matriz operativa. | Capacidad exclusiva del carril base; no puede concederse desde esta matriz operativa. |


##### 7.2 ANIMA — 10 permisos

| Permiso                                     | Capacidad humana                     | Modalidad   | Decisión para conductor_logistica | Alcance aprobado                                                       | Condición                                                                             |
| ------------------------------------------- | ------------------------------------ | ----------- | --------------------------------- | ---------------------------------------------------------------------- | ------------------------------------------------------------------------------------- |
| `anima.access`                              | Entrar a ANIMA                       | `BASE_ONLY` | **NO ASIGNAR**                    | — Denegación por defecto; no se crea concesión en la matriz operativa. | Capacidad exclusiva del carril base; no puede concederse desde esta matriz operativa. |
| `anima.workforce.employee_documents.view`   | Consultar documentos de trabajadores | `BASE_ONLY` | **NO ASIGNAR**                    | — Denegación por defecto; no se crea concesión en la matriz operativa. | Capacidad exclusiva del carril base; no puede concederse desde esta matriz operativa. |
| `anima.workforce.employee_documents.upload` | Cargar documentos de trabajadores    | `BASE_ONLY` | **NO ASIGNAR**                    | — Denegación por defecto; no se crea concesión en la matriz operativa. | Capacidad exclusiva del carril base; no puede concederse desde esta matriz operativa. |
| `anima.workforce.employee_documents.delete` | Eliminar documentos de trabajadores  | `BASE_ONLY` | **NO ASIGNAR**                    | — Denegación por defecto; no se crea concesión en la matriz operativa. | Capacidad exclusiva del carril base; no puede concederse desde esta matriz operativa. |
| `anima.workforce.employee_photos.upload`    | Cargar fotografías de trabajadores   | `BASE_ONLY` | **NO ASIGNAR**                    | — Denegación por defecto; no se crea concesión en la matriz operativa. | Capacidad exclusiva del carril base; no puede concederse desde esta matriz operativa. |
| `anima.workforce.team_members.view`         | Consultar integrantes del equipo     | `BASE_ONLY` | **NO ASIGNAR**                    | — Denegación por defecto; no se crea concesión en la matriz operativa. | Capacidad exclusiva del carril base; no puede concederse desde esta matriz operativa. |
| `anima.workforce.staff_invitations.create`  | Invitar trabajadores                 | `BASE_ONLY` | **NO ASIGNAR**                    | — Denegación por defecto; no se crea concesión en la matriz operativa. | Capacidad exclusiva del carril base; no puede concederse desde esta matriz operativa. |
| `anima.attendance.shifts.create`            | Crear turnos                         | `BASE_ONLY` | **NO ASIGNAR**                    | — Denegación por defecto; no se crea concesión en la matriz operativa. | Capacidad exclusiva del carril base; no puede concederse desde esta matriz operativa. |
| `anima.attendance.shifts.update`            | Actualizar turnos                    | `BASE_ONLY` | **NO ASIGNAR**                    | — Denegación por defecto; no se crea concesión en la matriz operativa. | Capacidad exclusiva del carril base; no puede concederse desde esta matriz operativa. |
| `anima.attendance.shifts.cancel`            | Cancelar turnos                      | `BASE_ONLY` | **NO ASIGNAR**                    | — Denegación por defecto; no se crea concesión en la matriz operativa. | Capacidad exclusiva del carril base; no puede concederse desde esta matriz operativa. |


##### 7.3 AURA — 1 permisos

| Permiso       | Capacidad humana | Modalidad   | Decisión para conductor_logistica | Alcance aprobado                                                       | Condición                                                                             |
| ------------- | ---------------- | ----------- | --------------------------------- | ---------------------------------------------------------------------- | ------------------------------------------------------------------------------------- |
| `aura.access` | Entrar a AURA    | `BASE_ONLY` | **NO ASIGNAR**                    | — Denegación por defecto; no se crea concesión en la matriz operativa. | Capacidad exclusiva del carril base; no puede concederse desde esta matriz operativa. |


##### 7.4 FOGO — 6 permisos

| Permiso                            | Capacidad humana                | Modalidad             | Decisión para conductor_logistica | Alcance aprobado                                                       | Condición                                                                                                  |
| ---------------------------------- | ------------------------------- | --------------------- | --------------------------------- | ---------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------- |
| `fogo.access`                      | Entrar a FOGO                   | `BASE_OR_OPERATIONAL` | **NO ASIGNAR**                    | — Denegación por defecto; no se crea concesión en la matriz operativa. | La producción y sus lotes pertenecen a roles productivos; el conductor transporta resultados ya liberados. |
| `fogo.production.batches.view`     | Consultar lotes de producción   | `BASE_OR_OPERATIONAL` | **NO ASIGNAR**                    | — Denegación por defecto; no se crea concesión en la matriz operativa. | La producción y sus lotes pertenecen a roles productivos; el conductor transporta resultados ya liberados. |
| `fogo.production.batches.create`   | Crear lotes de producción       | `OPERATIONAL_ONLY`    | **NO ASIGNAR**                    | — Denegación por defecto; no se crea concesión en la matriz operativa. | La producción y sus lotes pertenecen a roles productivos; el conductor transporta resultados ya liberados. |
| `fogo.production.orders.view`      | Consultar órdenes de producción | `BASE_OR_OPERATIONAL` | **NO ASIGNAR**                    | — Denegación por defecto; no se crea concesión en la matriz operativa. | La producción y sus lotes pertenecen a roles productivos; el conductor transporta resultados ya liberados. |
| `fogo.production.recipe_book.view` | Consultar recetario operativo   | `OPERATIONAL_ONLY`    | **NO ASIGNAR**                    | — Denegación por defecto; no se crea concesión en la matriz operativa. | La producción y sus lotes pertenecen a roles productivos; el conductor transporta resultados ya liberados. |
| `fogo.production.recipes.view`     | Consultar recetas               | `BASE_ONLY`           | **NO ASIGNAR**                    | — Denegación por defecto; no se crea concesión en la matriz operativa. | Capacidad exclusiva del carril base; no puede concederse desde esta matriz operativa.                      |


##### 7.5 NEXO — 63 permisos

| Permiso                                      | Capacidad humana                         | Modalidad              | Decisión para conductor_logistica | Alcance aprobado                                                                                                                                                                                                                       | Condición                                                                                                                                                                                           |
| -------------------------------------------- | ---------------------------------------- | ---------------------- | --------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `nexo.access`                                | Entrar a NEXO                            | `BASE_OR_OPERATIONAL`  | **ASIGNAR OPERATIVO**             | CTX-DRV-NEXO-APP — Turno publicado y vigente, rol `conductor_logistica`, sede logística autorizada y contexto de ruta o vehículo válido. Permite entrar a NEXO; no concede capacidades internas por sí solo.                           | Carril operativo con prerrequisito `T`. Actor, turno, check-in cuando aplique, asignación, ruta, vehículo y recurso deben resolverse en servidor; toda mutación debe ser idempotente y auditable.   |
| `nexo.catalog.products.view`                 | Consultar productos                      | `BASE_OR_OPERATIONAL`  | **ASIGNAR OPERATIVO**             | CTX-DRV-CARGO-CATALOG — Productos incluidos en remisiones, manifiestos, LPN o incidencias asignadas al conductor. Excluye costos, márgenes, proveedores y catálogo administrativo.                                                     | Carril operativo con prerrequisito `T`. Actor, turno, check-in cuando aplique, asignación, ruta, vehículo y recurso deben resolverse en servidor; toda mutación debe ser idempotente y auditable.   |
| `nexo.catalog.products.create`               | Crear productos                          | `BASE_ONLY`            | **NO ASIGNAR**                    | — Denegación por defecto; no se crea concesión en la matriz operativa.                                                                                                                                                                 | Capacidad exclusiva del carril base; no puede concederse desde esta matriz operativa.                                                                                                               |
| `nexo.catalog.presentations.view`            | Consultar presentaciones                 | `BASE_OR_OPERATIONAL`  | **ASIGNAR OPERATIVO**             | CTX-DRV-CARGO-CATALOG — Presentaciones y empaques necesarios para verificar físicamente la carga asignada, incluyendo unidades logísticas y equivalencias visibles en el manifiesto.                                                   | Carril operativo con prerrequisito `T`. Actor, turno, check-in cuando aplique, asignación, ruta, vehículo y recurso deben resolverse en servidor; toda mutación debe ser idempotente y auditable.   |
| `nexo.catalog.request_policies.view`         | Consultar políticas de solicitud         | `BASE_OR_OPERATIONAL`  | **NO ASIGNAR**                    | — Denegación por defecto; no se crea concesión en la matriz operativa.                                                                                                                                                                 | Las políticas de solicitud pertenecen a las áreas solicitantes y a la administración del abastecimiento, no al conductor.                                                                           |
| `nexo.catalog.categories.view`               | Consultar categorías                     | `BASE_OR_OPERATIONAL`  | **NO ASIGNAR**                    | — Denegación por defecto; no se crea concesión en la matriz operativa.                                                                                                                                                                 | La clasificación por categorías no es necesaria para verificar una carga ya manifestada.                                                                                                            |
| `nexo.catalog.units.view`                    | Consultar unidades                       | `BASE_OR_OPERATIONAL`  | **ASIGNAR OPERATIVO**             | CTX-DRV-CARGO-CATALOG — Unidades y conversiones necesarias para contrastar cantidades preparadas, cargadas y entregadas. No permite modificar equivalencias.                                                                           | Carril operativo con prerrequisito `T`. Actor, turno, check-in cuando aplique, asignación, ruta, vehículo y recurso deben resolverse en servidor; toda mutación debe ser idempotente y auditable.   |
| `nexo.assets.items.view`                     | Consultar activos                        | `BASE_OR_OPERATIONAL`  | **NO ASIGNAR**                    | — Denegación por defecto; no se crea concesión en la matriz operativa.                                                                                                                                                                 | La capacidad excede el transporte y la custodia en tránsito o pertenece a otro actor del proceso.                                                                                                   |
| `nexo.assets.items.create`                   | Crear activos                            | `BASE_ONLY`            | **NO ASIGNAR**                    | — Denegación por defecto; no se crea concesión en la matriz operativa.                                                                                                                                                                 | Capacidad exclusiva del carril base; no puede concederse desde esta matriz operativa.                                                                                                               |
| `nexo.assets.groups.view`                    | Consultar grupos de activos              | `BASE_OR_OPERATIONAL`  | **NO ASIGNAR**                    | — Denegación por defecto; no se crea concesión en la matriz operativa.                                                                                                                                                                 | La capacidad excede el transporte y la custodia en tránsito o pertenece a otro actor del proceso.                                                                                                   |
| `nexo.assets.counts.view`                    | Consultar conteos de activos             | `BASE_OR_OPERATIONAL`  | **NO ASIGNAR**                    | — Denegación por defecto; no se crea concesión en la matriz operativa.                                                                                                                                                                 | La capacidad excede el transporte y la custodia en tránsito o pertenece a otro actor del proceso.                                                                                                   |
| `nexo.inventory.adjustments.view`            | Consultar ajustes de inventario          | `BASE_OR_OPERATIONAL`  | **NO ASIGNAR**                    | — Denegación por defecto; no se crea concesión en la matriz operativa.                                                                                                                                                                 | Las correcciones y diferencias de inventario no son necesarias para ejecutar la ruta ordinaria.                                                                                                     |
| `nexo.inventory.adjustments.register`        | Registrar ajustes de inventario          | `BASE_AND_OPERATIONAL` | **NO ASIGNAR**                    | — Denegación por defecto; no se crea concesión en la matriz operativa.                                                                                                                                                                 | El conductor no puede corregir inventario, regularizar faltantes ni aprobar diferencias.                                                                                                            |
| `nexo.inventory.entries.view`                | Consultar entradas de inventario         | `BASE_OR_OPERATIONAL`  | **NO ASIGNAR**                    | — Denegación por defecto; no se crea concesión en la matriz operativa.                                                                                                                                                                 | Las entradas de inventario pertenecen al origen o destino; el conductor consulta la remisión y su manifiesto.                                                                                       |
| `nexo.inventory.entries.register`            | Registrar entradas de inventario         | `OPERATIONAL_ONLY`     | **NO ASIGNAR**                    | — Denegación por defecto; no se crea concesión en la matriz operativa.                                                                                                                                                                 | El conductor no registra entradas de inventario ni crea stock en el destino.                                                                                                                        |
| `nexo.inventory.entries.override`            | Registrar entradas excepcionales         | `BASE_AND_OPERATIONAL` | **NO ASIGNAR**                    | — Denegación por defecto; no se crea concesión en la matriz operativa.                                                                                                                                                                 | Las entradas excepcionales requieren autoridad base y operativa; nunca corresponden al conductor ordinario.                                                                                         |
| `nexo.inventory.locations.view`              | Consultar ubicaciones de inventario      | `BASE_OR_OPERATIONAL`  | **NO ASIGNAR**                    | — Denegación por defecto; no se crea concesión en la matriz operativa.                                                                                                                                                                 | Las ubicaciones internas de bodega pertenecen al bodeguero. El conductor solo necesita puntos de recogida y entrega incluidos en la operación logística.                                            |
| `nexo.inventory.location_assignments.assign` | Asignar ubicaciones de inventario        | `OPERATIONAL_ONLY`     | **NO ASIGNAR**                    | — Denegación por defecto; no se crea concesión en la matriz operativa.                                                                                                                                                                 | Asignar ubicación es custodia interna de bodega y no corresponde al tránsito.                                                                                                                       |
| `nexo.inventory.location_catalog.update`     | Actualizar el catálogo de una ubicación  | `BASE_ONLY`            | **NO ASIGNAR**                    | — Denegación por defecto; no se crea concesión en la matriz operativa.                                                                                                                                                                 | Capacidad exclusiva del carril base; no puede concederse desde esta matriz operativa.                                                                                                               |
| `nexo.inventory.lpns.view`                   | Consultar LPN                            | `BASE_OR_OPERATIONAL`  | **ASIGNAR OPERATIVO**             | CTX-DRV-LPN — LPN, contenedores, sellos y bultos vinculados exclusivamente con remisiones bajo custodia asignada al conductor. No permite reasignar, abrir o alterar contenido por sí solo.                                            | Carril operativo con prerrequisito `T+C`. Actor, turno, check-in cuando aplique, asignación, ruta, vehículo y recurso deben resolverse en servidor; toda mutación debe ser idempotente y auditable. |
| `nexo.inventory.movements.view`              | Consultar movimientos de inventario      | `BASE_OR_OPERATIONAL`  | **ASIGNAR OPERATIVO**             | CTX-DRV-CUSTODY-MOVEMENTS — Eventos de inventario y custodia relacionados con remisiones asignadas: preparación final, carga, despacho, tránsito, entrega y recepción. No concede acceso al historial general de inventario.           | Carril operativo con prerrequisito `T+C`. Actor, turno, check-in cuando aplique, asignación, ruta, vehículo y recurso deben resolverse en servidor; toda mutación debe ser idempotente y auditable. |
| `nexo.inventory.stock.view`                  | Consultar stock                          | `BASE_OR_OPERATIONAL`  | **NO ASIGNAR**                    | — Denegación por defecto; no se crea concesión en la matriz operativa.                                                                                                                                                                 | El conductor custodia carga asignada, no administra existencias ni necesita consultar stock general de origen o destino.                                                                            |
| `nexo.inventory.production_batches.view`     | Consultar lotes vinculados al inventario | `BASE_OR_OPERATIONAL`  | **NO ASIGNAR**                    | — Denegación por defecto; no se crea concesión en la matriz operativa.                                                                                                                                                                 | La trazabilidad productiva se proyectará en la remisión cuando sea necesaria; el conductor no consulta lotes productivos generales.                                                                 |
| `nexo.inventory.transfers.view`              | Consultar traslados de inventario        | `BASE_OR_OPERATIONAL`  | **NO ASIGNAR**                    | — Denegación por defecto; no se crea concesión en la matriz operativa.                                                                                                                                                                 | Los traslados internos no son remisiones de transporte. La información necesaria debe proyectarse desde la remisión asignada.                                                                       |
| `nexo.inventory.transfers.create`            | Crear traslados de inventario            | `OPERATIONAL_ONLY`     | **NO ASIGNAR**                    | — Denegación por defecto; no se crea concesión en la matriz operativa.                                                                                                                                                                 | El conductor no crea traslados internos ni mueve stock por fuera del flujo de remisiones.                                                                                                           |
| `nexo.inventory.withdrawals.view`            | Consultar retiros de inventario          | `BASE_OR_OPERATIONAL`  | **NO ASIGNAR**                    | — Denegación por defecto; no se crea concesión en la matriz operativa.                                                                                                                                                                 | Los retiros de inventario pertenecen a bodega o consumo productivo; no forman parte de la custodia en tránsito.                                                                                     |
| `nexo.inventory.withdrawals.register`        | Registrar retiros de inventario          | `OPERATIONAL_ONLY`     | **NO ASIGNAR**                    | — Denegación por defecto; no se crea concesión en la matriz operativa.                                                                                                                                                                 | El conductor no descuenta inventario directamente ni registra consumos.                                                                                                                             |
| `nexo.inventory.zones.view`                  | Consultar zonas de almacenamiento        | `BASE_OR_OPERATIONAL`  | **NO ASIGNAR**                    | — Denegación por defecto; no se crea concesión en la matriz operativa.                                                                                                                                                                 | Las zonas internas de almacenamiento pertenecen a bodega, no al tránsito.                                                                                                                           |
| `nexo.inventory.storage_positions.view`      | Consultar posiciones de almacenamiento   | `BASE_OR_OPERATIONAL`  | **NO ASIGNAR**                    | — Denegación por defecto; no se crea concesión en la matriz operativa.                                                                                                                                                                 | Las posiciones internas de almacenamiento pertenecen a bodega, no al tránsito.                                                                                                                      |
| `nexo.inventory.warehouse_operations.view`   | Consultar operaciones de bodega          | `BASE_OR_OPERATIONAL`  | **NO ASIGNAR**                    | — Denegación por defecto; no se crea concesión en la matriz operativa.                                                                                                                                                                 | La cola de bodega corresponde al bodeguero; el conductor utiliza la cola logística asignada.                                                                                                        |
| `nexo.inventory.stock_validations.perform`   | Ejecutar validaciones de inventario      | `OPERATIONAL_ONLY`     | **NO ASIGNAR**                    | — Denegación por defecto; no se crea concesión en la matriz operativa.                                                                                                                                                                 | El conductor puede reportar una incidencia, pero no ejecutar validaciones de stock.                                                                                                                 |
| `nexo.inventory.stock_counts.view`           | Consultar conteos de inventario          | `BASE_OR_OPERATIONAL`  | **NO ASIGNAR**                    | — Denegación por defecto; no se crea concesión en la matriz operativa.                                                                                                                                                                 | Los conteos de inventario pertenecen a la custodia de bodega.                                                                                                                                       |
| `nexo.inventory.stock_counts.perform`        | Ejecutar conteos de inventario           | `OPERATIONAL_ONLY`     | **NO ASIGNAR**                    | — Denegación por defecto; no se crea concesión en la matriz operativa.                                                                                                                                                                 | El conductor no realiza conteos de inventario durante el tránsito.                                                                                                                                  |
| `nexo.inventory.initial_counts.view`         | Consultar conteos iniciales              | `BASE_OR_OPERATIONAL`  | **NO ASIGNAR**                    | — Denegación por defecto; no se crea concesión en la matriz operativa.                                                                                                                                                                 | Los conteos iniciales no forman parte de la operación de transporte.                                                                                                                                |
| `nexo.inventory.remissions.view`             | Consultar remisiones                     | `BASE_OR_OPERATIONAL`  | **ASIGNAR OPERATIVO**             | CTX-DRV-REMISSIONS — Remisiones asignadas al conductor, a su ruta o vehículo, y aquellas listas para recogida en un origen autorizado. Incluye origen, destino, líneas, cantidades preparadas, bultos, estado e instrucciones mínimas. | Carril operativo con prerrequisito `T`. Actor, turno, check-in cuando aplique, asignación, ruta, vehículo y recurso deben resolverse en servidor; toda mutación debe ser idempotente y auditable.   |
| `nexo.inventory.remissions.update`           | Actualizar remisiones                    | `BASE_OR_OPERATIONAL`  | **NO ASIGNAR**                    | — Denegación por defecto; no se crea concesión en la matriz operativa.                                                                                                                                                                 | La actualización amplia mezclaría etapas y permitiría alterar datos fuera de la responsabilidad del conductor. Cada transición debe usar un permiso atómico.                                        |
| `nexo.inventory.remissions.request`          | Solicitar remisiones                     | `OPERATIONAL_ONLY`     | **NO ASIGNAR**                    | — Denegación por defecto; no se crea concesión en la matriz operativa.                                                                                                                                                                 | Solicitar abastecimiento corresponde al área solicitante, no al conductor.                                                                                                                          |
| `nexo.inventory.remissions.prepare`          | Preparar remisiones                      | `OPERATIONAL_ONLY`     | **NO ASIGNAR**                    | — Denegación por defecto; no se crea concesión en la matriz operativa.                                                                                                                                                                 | Preparar, reservar, empacar y definir cantidades corresponde al bodeguero o actor de origen.                                                                                                        |
| `nexo.inventory.remissions.dispatch`         | Despachar remisiones                     | `OPERATIONAL_ONLY`     | **HISTÓRICO — NO AUTORIZANTE**    | CTX-DRV-DISPATCH — fila preservada únicamente como snapshot del contrato anterior al split atómico.                                                                                                                                    | La clave no está activa ni tiene grant runtime; no funciona como alias o fallback de `accept_custody` o `start_transit`.                                                                          |
| `nexo.inventory.remissions.receive`          | Recibir remisiones                       | `OPERATIONAL_ONLY`     | **NO ASIGNAR**                    | — Denegación por defecto; no se crea concesión en la matriz operativa.                                                                                                                                                                 | La recepción y confirmación de cantidades corresponde al actor autorizado en el destino; el conductor entrega la custodia, pero no se auto-recibe.                                                  |
| `nexo.inventory.remissions.cancel`           | Cancelar remisiones                      | `BASE_OR_OPERATIONAL`  | **NO ASIGNAR**                    | — Denegación por defecto; no se crea concesión en la matriz operativa.                                                                                                                                                                 | Cancelar es una decisión sensible de control y no corresponde a quien transporta la carga.                                                                                                          |
| `nexo.logistics.operations_board.view`       | Consultar tablero logístico              | `BASE_OR_OPERATIONAL`  | **ASIGNAR OPERATIVO**             | CTX-DRV-BOARD — Tablero limitado a las operaciones asignadas al actor, ruta o vehículo durante el turno. No muestra el tablero logístico global ni operaciones de otros conductores.                                                   | Carril operativo con prerrequisito `T+C`. Actor, turno, check-in cuando aplique, asignación, ruta, vehículo y recurso deben resolverse en servidor; toda mutación debe ser idempotente y auditable. |
| `nexo.logistics.operations.view`             | Consultar operaciones logísticas         | `BASE_OR_OPERATIONAL`  | **ASIGNAR OPERATIVO**             | CTX-DRV-OPERATIONS — Operaciones logísticas donde el conductor sea actor asignado o custodio vigente. Incluye secuencia, estado, origen, destino, ventanas y bloqueos necesarios para ejecutar la ruta.                                | Carril operativo con prerrequisito `T+C`. Actor, turno, check-in cuando aplique, asignación, ruta, vehículo y recurso deben resolverse en servidor; toda mutación debe ser idempotente y auditable. |
| `nexo.logistics.driver_operations.view`      | Consultar operaciones de conductores     | `BASE_OR_OPERATIONAL`  | **ASIGNAR OPERATIVO**             | CTX-DRV-SELF — Operaciones propias del conductor y su trazabilidad durante el turno. No permite consultar desempeño, ubicación o historial de otros conductores.                                                                       | Carril operativo con prerrequisito `T+C`. Actor, turno, check-in cuando aplique, asignación, ruta, vehículo y recurso deben resolverse en servidor; toda mutación debe ser idempotente y auditable. |
| `nexo.logistics.fulfillment.view`            | Consultar cumplimiento logístico         | `BASE_OR_OPERATIONAL`  | **ASIGNAR OPERATIVO**             | CTX-DRV-FULFILLMENT — Cumplimiento de remisiones y paradas asignadas al conductor: pendiente, recogida, en tránsito, entregada, recibida o con incidencia. No expone cumplimiento organizacional global.                               | Carril operativo con prerrequisito `T+C`. Actor, turno, check-in cuando aplique, asignación, ruta, vehículo y recurso deben resolverse en servidor; toda mutación debe ser idempotente y auditable. |
| `nexo.logistics.fulfillment_routes.view`     | Consultar rutas de cumplimiento          | `BASE_OR_OPERATIONAL`  | **ASIGNAR OPERATIVO**             | CTX-DRV-FULFILLMENT-ROUTES — Ruta, secuencia de paradas, ventanas, restricciones y destinos asignados para el turno. No permite crear, editar o reasignar rutas.                                                                       | Carril operativo con prerrequisito `T`. Actor, turno, check-in cuando aplique, asignación, ruta, vehículo y recurso deben resolverse en servidor; toda mutación debe ser idempotente y auditable.   |
| `nexo.logistics.supply_routes.view`          | Consultar rutas de abastecimiento        | `BASE_OR_OPERATIONAL`  | **ASIGNAR OPERATIVO**             | CTX-DRV-SUPPLY-ROUTES — Rutas de abastecimiento publicadas que correspondan a la jornada y a las remisiones asignadas. Solo lectura; no concede coordinación general ni modificación de frecuencias.                                   | Carril operativo con prerrequisito `T`. Actor, turno, check-in cuando aplique, asignación, ruta, vehículo y recurso deben resolverse en servidor; toda mutación debe ser idempotente y auditable.   |
| `nexo.finance.internal_invoices.view`        | Consultar facturas internas              | `BASE_ONLY`            | **NO ASIGNAR**                    | — Denegación por defecto; no se crea concesión en la matriz operativa.                                                                                                                                                                 | Capacidad exclusiva del carril base; no puede concederse desde esta matriz operativa.                                                                                                               |
| `nexo.finance.internal_invoices.generate`    | Generar facturas internas                | `BASE_ONLY`            | **NO ASIGNAR**                    | — Denegación por defecto; no se crea concesión en la matriz operativa.                                                                                                                                                                 | Capacidad exclusiva del carril base; no puede concederse desde esta matriz operativa.                                                                                                               |
| `nexo.finance.internal_invoices.issue`       | Emitir facturas internas                 | `BASE_ONLY`            | **NO ASIGNAR**                    | — Denegación por defecto; no se crea concesión en la matriz operativa.                                                                                                                                                                 | Capacidad exclusiva del carril base; no puede concederse desde esta matriz operativa.                                                                                                               |
| `nexo.finance.internal_invoices.cancel`      | Cancelar facturas internas               | `BASE_ONLY`            | **NO ASIGNAR**                    | — Denegación por defecto; no se crea concesión en la matriz operativa.                                                                                                                                                                 | Capacidad exclusiva del carril base; no puede concederse desde esta matriz operativa.                                                                                                               |
| `nexo.finance.internal_invoice_amounts.view` | Consultar valores de facturas internas   | `BASE_ONLY`            | **NO ASIGNAR**                    | — Denegación por defecto; no se crea concesión en la matriz operativa.                                                                                                                                                                 | Capacidad exclusiva del carril base; no puede concederse desde esta matriz operativa.                                                                                                               |
| `nexo.finance.internal_prices.view`          | Consultar precios internos               | `BASE_ONLY`            | **NO ASIGNAR**                    | — Denegación por defecto; no se crea concesión en la matriz operativa.                                                                                                                                                                 | Capacidad exclusiva del carril base; no puede concederse desde esta matriz operativa.                                                                                                               |
| `nexo.finance.internal_variances.view`       | Consultar variaciones internas           | `BASE_ONLY`            | **NO ASIGNAR**                    | — Denegación por defecto; no se crea concesión en la matriz operativa.                                                                                                                                                                 | Capacidad exclusiva del carril base; no puede concederse desde esta matriz operativa.                                                                                                               |
| `nexo.finance.internal_variances.approve`    | Aprobar variaciones internas             | `BASE_AND_OPERATIONAL` | **NO ASIGNAR**                    | — Denegación por defecto; no se crea concesión en la matriz operativa.                                                                                                                                                                 | La capacidad excede el transporte y la custodia en tránsito o pertenece a otro actor del proceso.                                                                                                   |
| `nexo.finance.internal_variances.resolve`    | Resolver variaciones internas            | `BASE_AND_OPERATIONAL` | **NO ASIGNAR**                    | — Denegación por defecto; no se crea concesión en la matriz operativa.                                                                                                                                                                 | La capacidad excede el transporte y la custodia en tránsito o pertenece a otro actor del proceso.                                                                                                   |
| `nexo.finance.cost_centers.view`             | Consultar centros de costo en NEXO       | `BASE_ONLY`            | **NO ASIGNAR**                    | — Denegación por defecto; no se crea concesión en la matriz operativa.                                                                                                                                                                 | Capacidad exclusiva del carril base; no puede concederse desde esta matriz operativa.                                                                                                               |
| `nexo.analytics.internal_reports.view`       | Consultar reportes internos              | `BASE_ONLY`            | **NO ASIGNAR**                    | — Denegación por defecto; no se crea concesión en la matriz operativa.                                                                                                                                                                 | Capacidad exclusiva del carril base; no puede concederse desde esta matriz operativa.                                                                                                               |
| `nexo.analytics.margin_reports.view`         | Consultar reportes de margen             | `BASE_ONLY`            | **NO ASIGNAR**                    | — Denegación por defecto; no se crea concesión en la matriz operativa.                                                                                                                                                                 | Capacidad exclusiva del carril base; no puede concederse desde esta matriz operativa.                                                                                                               |
| `nexo.printing.templates.update`             | Editar plantillas de impresión           | `BASE_ONLY`            | **NO ASIGNAR**                    | — Denegación por defecto; no se crea concesión en la matriz operativa.                                                                                                                                                                 | Capacidad exclusiva del carril base; no puede concederse desde esta matriz operativa.                                                                                                               |
| `nexo.printing.jobs.view`                    | Consultar trabajos de impresión          | `BASE_OR_OPERATIONAL`  | **NO ASIGNAR**                    | — Denegación por defecto; no se crea concesión en la matriz operativa.                                                                                                                                                                 | La consulta de trabajos de impresión no es necesaria para conducir. El manifiesto o documento requerido debe proyectarse dentro de la operación asignada.                                           |
| `nexo.settings.sites.view`                   | Consultar configuración de sedes         | `BASE_ONLY`            | **NO ASIGNAR**                    | — Denegación por defecto; no se crea concesión en la matriz operativa.                                                                                                                                                                 | Capacidad exclusiva del carril base; no puede concederse desde esta matriz operativa.                                                                                                               |
| `nexo.settings.remission_policies.view`      | Consultar políticas de remisiones        | `BASE_ONLY`            | **NO ASIGNAR**                    | — Denegación por defecto; no se crea concesión en la matriz operativa.                                                                                                                                                                 | Capacidad exclusiva del carril base; no puede concederse desde esta matriz operativa.                                                                                                               |


##### 7.6 NUMERA — 6 permisos

| Permiso                                   | Capacidad humana               | Modalidad   | Decisión para conductor_logistica | Alcance aprobado                                                       | Condición                                                                             |
| ----------------------------------------- | ------------------------------ | ----------- | --------------------------------- | ---------------------------------------------------------------------- | ------------------------------------------------------------------------------------- |
| `numera.access`                           | Entrar a NUMERA                | `BASE_ONLY` | **NO ASIGNAR**                    | — Denegación por defecto; no se crea concesión en la matriz operativa. | Capacidad exclusiva del carril base; no puede concederse desde esta matriz operativa. |
| `numera.finance.cost_centers.view`        | Consultar centros de costo     | `BASE_ONLY` | **NO ASIGNAR**                    | — Denegación por defecto; no se crea concesión en la matriz operativa. | Capacidad exclusiva del carril base; no puede concederse desde esta matriz operativa. |
| `numera.finance.expenses.view`            | Consultar gastos               | `BASE_ONLY` | **NO ASIGNAR**                    | — Denegación por defecto; no se crea concesión en la matriz operativa. | Capacidad exclusiva del carril base; no puede concederse desde esta matriz operativa. |
| `numera.analytics.break_even.view`        | Consultar punto de equilibrio  | `BASE_ONLY` | **NO ASIGNAR**                    | — Denegación por defecto; no se crea concesión en la matriz operativa. | Capacidad exclusiva del carril base; no puede concederse desde esta matriz operativa. |
| `numera.analytics.profitability.view`     | Consultar rentabilidad         | `BASE_ONLY` | **NO ASIGNAR**                    | — Denegación por defecto; no se crea concesión en la matriz operativa. | Capacidad exclusiva del carril base; no puede concederse desde esta matriz operativa. |
| `numera.analytics.financial_reports.view` | Consultar reportes financieros | `BASE_ONLY` | **NO ASIGNAR**                    | — Denegación por defecto; no se crea concesión en la matriz operativa. | Capacidad exclusiva del carril base; no puede concederse desde esta matriz operativa. |


##### 7.7 ORIGO — 5 permisos

| Permiso                                  | Capacidad humana                  | Modalidad             | Decisión para conductor_logistica | Alcance aprobado                                                       | Condición                                                                                                                                       |
| ---------------------------------------- | --------------------------------- | --------------------- | --------------------------------- | ---------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------- |
| `origo.access`                           | Entrar a ORIGO                    | `BASE_OR_OPERATIONAL` | **NO ASIGNAR**                    | — Denegación por defecto; no se crea concesión en la matriz operativa. | El conductor no opera compras ni recepciones de proveedores desde ORIGO.                                                                        |
| `origo.procurement.purchase_orders.view` | Consultar órdenes de compra       | `BASE_OR_OPERATIONAL` | **NO ASIGNAR**                    | — Denegación por defecto; no se crea concesión en la matriz operativa. | La orden de compra no es el contrato operativo del transporte interno. La información necesaria debe estar en la operación o remisión asignada. |
| `origo.procurement.receipts.view`        | Consultar recepciones de compra   | `BASE_OR_OPERATIONAL` | **NO ASIGNAR**                    | — Denegación por defecto; no se crea concesión en la matriz operativa. | La recepción de compra corresponde al receptor autorizado, no al conductor por defecto.                                                         |
| `origo.procurement.suppliers.view`       | Consultar proveedores             | `BASE_OR_OPERATIONAL` | **NO ASIGNAR**                    | — Denegación por defecto; no se crea concesión en la matriz operativa. | No se concede acceso general a proveedores; cuando exista transporte de proveedor, se proyectarán únicamente los datos logísticos mínimos.      |
| `origo.catalog.product_reviews.view`     | Consultar revisiones de productos | `BASE_ONLY`           | **NO ASIGNAR**                    | — Denegación por defecto; no se crea concesión en la matriz operativa. | Capacidad exclusiva del carril base; no puede concederse desde esta matriz operativa.                                                           |
| `pass.access`                            | Entrar a Vento Pass               | `BASE_ONLY`           | **NO ASIGNAR**                    | — Denegación por defecto; no se crea concesión en la matriz operativa. | Capacidad exclusiva del carril base; no puede concederse desde esta matriz operativa.                                                           |


##### 7.8 PULSO — 2 permisos

| Permiso                              | Capacidad humana                        | Modalidad              | Decisión para conductor_logistica | Alcance aprobado                                                       | Condición                                                                                                                                   |
| ------------------------------------ | --------------------------------------- | ---------------------- | --------------------------------- | ---------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------- |
| `pulso.access`                       | Entrar a PULSO                          | `OPERATIONAL_ONLY`     | **NO ASIGNAR**                    | — Denegación por defecto; no se crea concesión en la matriz operativa. | La operación comercial y de entregas excepcionales de PULSO no se concede al conductor por esta matriz.                                     |
| `pulso.delivery.deliveries.override` | Confirmar entregas de forma excepcional | `BASE_AND_OPERATIONAL` | **NO ASIGNAR**                    | — Denegación por defecto; no se crea concesión en la matriz operativa. | Es una confirmación excepcional de entrega y exige autoridad base además de contexto operativo; no es una facultad ordinaria del conductor. |


##### 7.9 VISO — 17 permisos

| Permiso                                       | Capacidad humana                          | Modalidad   | Decisión para conductor_logistica | Alcance aprobado                                                       | Condición                                                                             |
| --------------------------------------------- | ----------------------------------------- | ----------- | --------------------------------- | ---------------------------------------------------------------------- | ------------------------------------------------------------------------------------- |
| `viso.access`                                 | Entrar a VISO                             | `BASE_ONLY` | **NO ASIGNAR**                    | — Denegación por defecto; no se crea concesión en la matriz operativa. | Capacidad exclusiva del carril base; no puede concederse desde esta matriz operativa. |
| `viso.platform.app_updates.view`              | Consultar actualizaciones de aplicaciones | `BASE_ONLY` | **NO ASIGNAR**                    | — Denegación por defecto; no se crea concesión en la matriz operativa. | Capacidad exclusiva del carril base; no puede concederse desde esta matriz operativa. |
| `viso.organization.businesses.view`           | Consultar empresas y unidades de negocio  | `BASE_ONLY` | **NO ASIGNAR**                    | — Denegación por defecto; no se crea concesión en la matriz operativa. | Capacidad exclusiva del carril base; no puede concederse desde esta matriz operativa. |
| `viso.workforce.employees.view`               | Consultar trabajadores                    | `BASE_ONLY` | **NO ASIGNAR**                    | — Denegación por defecto; no se crea concesión en la matriz operativa. | Capacidad exclusiva del carril base; no puede concederse desde esta matriz operativa. |
| `viso.workforce.staff_calendar.view`          | Consultar calendario del personal         | `BASE_ONLY` | **NO ASIGNAR**                    | — Denegación por defecto; no se crea concesión en la matriz operativa. | Capacidad exclusiva del carril base; no puede concederse desde esta matriz operativa. |
| `viso.workforce.schedules.view`               | Consultar programación de turnos          | `BASE_ONLY` | **NO ASIGNAR**                    | — Denegación por defecto; no se crea concesión en la matriz operativa. | Capacidad exclusiva del carril base; no puede concederse desde esta matriz operativa. |
| `viso.workforce.vacancies.view`               | Consultar vacantes                        | `BASE_ONLY` | **NO ASIGNAR**                    | — Denegación por defecto; no se crea concesión en la matriz operativa. | Capacidad exclusiva del carril base; no puede concederse desde esta matriz operativa. |
| `viso.authorization.context_simulations.view` | Consultar simulaciones de autorización    | `BASE_ONLY` | **NO ASIGNAR**                    | — Denegación por defecto; no se crea concesión en la matriz operativa. | Capacidad exclusiva del carril base; no puede concederse desde esta matriz operativa. |
| `viso.authorization.audit_logs.view`          | Consultar auditoría de autorización       | `BASE_ONLY` | **NO ASIGNAR**                    | — Denegación por defecto; no se crea concesión en la matriz operativa. | Capacidad exclusiva del carril base; no puede concederse desde esta matriz operativa. |
| `viso.catalog.commercial_categories.view`     | Consultar categorías comerciales          | `BASE_ONLY` | **NO ASIGNAR**                    | — Denegación por defecto; no se crea concesión en la matriz operativa. | Capacidad exclusiva del carril base; no puede concederse desde esta matriz operativa. |
| `viso.content.content_blocks.view`            | Consultar bloques de contenido            | `BASE_ONLY` | **NO ASIGNAR**                    | — Denegación por defecto; no se crea concesión en la matriz operativa. | Capacidad exclusiva del carril base; no puede concederse desde esta matriz operativa. |
| `viso.content.menu.view`                      | Consultar menú                            | `BASE_ONLY` | **NO ASIGNAR**                    | — Denegación por defecto; no se crea concesión en la matriz operativa. | Capacidad exclusiva del carril base; no puede concederse desde esta matriz operativa. |
| `viso.content.website_content.view`           | Consultar contenido del sitio web         | `BASE_ONLY` | **NO ASIGNAR**                    | — Denegación por defecto; no se crea concesión en la matriz operativa. | Capacidad exclusiva del carril base; no puede concederse desde esta matriz operativa. |
| `viso.finance.accounting.view`                | Consultar información contable            | `BASE_ONLY` | **NO ASIGNAR**                    | — Denegación por defecto; no se crea concesión en la matriz operativa. | Capacidad exclusiva del carril base; no puede concederse desde esta matriz operativa. |
| `viso.delivery.rates.view`                    | Consultar tarifas de entrega              | `BASE_ONLY` | **NO ASIGNAR**                    | — Denegación por defecto; no se crea concesión en la matriz operativa. | Capacidad exclusiva del carril base; no puede concederse desde esta matriz operativa. |
| `viso.loyalty.products.view`                  | Consultar productos de fidelización       | `BASE_ONLY` | **NO ASIGNAR**                    | — Denegación por defecto; no se crea concesión en la matriz operativa. | Capacidad exclusiva del carril base; no puede concederse desde esta matriz operativa. |
| `viso.loyalty.customers.view`                 | Consultar clientes de fidelización        | `BASE_ONLY` | **NO ASIGNAR**                    | — Denegación por defecto; no se crea concesión en la matriz operativa. | Capacidad exclusiva del carril base; no puede concederse desde esta matriz operativa. |


#### 8. Reglas operativas obligatorias

1. El rol solo existe durante un turno publicado, vigente y compatible con `conductor_logistica`.
2. El perfil operativo predeterminado sugiere configuración; no concede permisos ni reemplaza el turno.
3. El check-in externo deberá realizarse en un punto aprobado, como el patio o punto de recogida, y vincularse con el turno correcto.
4. Un punto de check-in oculto no se convierte en sede laboral ni amplía la cobertura territorial del conductor.
5. Las consultas globales de logística se proyectarán exclusivamente sobre operaciones asignadas al actor, ruta o vehículo.
6. Aceptar custodia, iniciar tránsito y registrar entrega física son acciones separadas y exigen respectivamente `nexo.inventory.remissions.accept_custody`, `nexo.inventory.remissions.start_transit` y `nexo.inventory.remissions.deliver`; `dispatch`, `transit` y `transit.view` no autorizan ninguna de ellas.
7. Antes del despacho deberán coincidir remisión, versión, origen, destino, bultos, LPN, sellos, cantidades preparadas, ruta, vehículo y conductor.
8. Cualquier diferencia previa al despacho bloquea la aceptación de custodia hasta que el origen la resuelva o registre formalmente.
9. Tras el despacho, la custodia queda atribuida al conductor hasta la recepción válida o un evento formal de transferencia.
10. El conductor no puede auto-recibir la remisión ni confirmar por el destino las cantidades entregadas.
11. La visibilidad de una remisión no autoriza otra remisión de la misma sede, ruta o fecha.
12. La visibilidad de una ruta no autoriza modificar secuencia, ventanas, destinos, conductor o vehículo.
13. La geolocalización y telemetría, cuando se implementen, deben limitarse a la jornada activa, tener finalidad logística y cumplir retención definida.
14. El conductor no consulta stock general de origen o destino; la carga autorizada se deriva del manifiesto asignado.
15. Los eventos de movimientos visibles deben pertenecer a la cadena de custodia de la carga asignada.
16. `nexo.inventory.remissions.deliver` autoriza el handoff físico, pero firma, fotografía, código u otra evidencia sensible solo podrán incorporarse cuando sus contratos de privacidad, Storage, retención, dispositivo y minimización estén aprobados; ninguna evidencia sustituye `receive` del destino.
17. Un incidente no permite ajustar inventario, cancelar la remisión ni declarar recepción automáticamente.
18. El cierre de jornada deberá bloquearse cuando existan remisiones todavía bajo custodia, salvo transferencia o excepción documentada.
19. APP-REVIEW, demo, sedes aisladas, rutas no asignadas y vehículos ajenos permanecen excluidos.
20. No se implementan cambios físicos durante esta tarea.

#### 9. Brechas contractuales identificadas

| Brecha                                                           | Impacto                                                                                                                         | Decisión en esta matriz                                                                                                                               |
| ---------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------- |
| Entrega física ordinaria                                            | **RESUELTA CONTRACTUALMENTE**: `nexo.inventory.remissions.deliver` representa el handoff físico del conductor al receptor previsto. | Usar exclusivamente `deliver`; no ampliar `receive`, `dispatch` ni `delivery.override`.                                                            |
| Evidencia sensible de entrega                                      | La capacidad de handoff existe, pero firma, fotografía, código u otra evidencia sensible requiere contratos adicionales de privacidad, Storage, retención y dispositivo. | Mantener esos artefactos fuera del flujo hasta que sus contratos específicos estén aprobados; no crear autoridad implícita desde `deliver`. |
| No existe permiso para incidentes de transporte                  | Avería, faltante, rechazo, accidente, demora o imposibilidad de entrega no tienen acción atómica.                               | El conductor no ajusta ni cancela. Crear `logistics.incidents.register` y flujo de resolución.                                                        |
| No existe permiso para progreso de ruta                          | La matriz permite consultar rutas, pero no registrar llegada, salida, omisión o reprogramación de una parada.                   | Crear acciones atómicas de progreso; no inferirlas desde `operations.view`.                                                                           |
| No existe permiso para inspección o asignación de vehículo       | El catálogo no representa checklist, kilometraje, combustible, mantenimiento o aceptación del vehículo.                         | No usar permisos de activos como sustituto. Diseñar el subdominio y sus capacidades.                                                                  |
| Separación de custodia e inicio de tránsito                        | **RESUELTA CONTRACTUALMENTE** mediante `accept_custody` y `start_transit`; `dispatch` quedó fuera del conjunto activo.              | Consumir ambas PermissionKey de forma independiente, con estado previo, versión, actor y evidencia exactos; no crear alias uno-a-muchos.             |
| No existe flujo atómico de entrega fallida o devolución          | El conductor no puede cerrar de forma segura una parada no entregada.                                                           | Mantener la operación abierta o bloqueada hasta contar con permiso y estado canónico.                                                                 |

#### 10. Capacidades expresamente excluidas

- Solicitar, preparar, editar, recibir o cancelar remisiones.
- Modificar productos, presentaciones, unidades, rutas o políticas.
- Consultar stock general, ubicaciones internas, conteos, retiros, traslados o entradas.
- Crear movimientos de inventario por fuera de la transición autorizada de despacho.
- Ajustar diferencias, registrar entradas excepcionales o aprobar variaciones.
- Consultar operaciones, rutas, ubicación o desempeño de otros conductores.
- Operar compras, producción, caja, fidelización, finanzas o administración de personal.
- Confirmar entregas excepcionales mediante `pulso.delivery.deliveries.override`.
- Usar identidad técnica de vehículo o dispositivo como actor empresarial.

#### 11. Validaciones mínimas por tipo de acción

| Acción                 | Validaciones mínimas                                                                                                                       |
| ---------------------- | ------------------------------------------------------------------------------------------------------------------------------------------ |
| Consultar ruta         | Actor asignado, turno vigente, ruta publicada, vehículo compatible, ventana temporal y paradas autorizadas.                                |
| Consultar remisión     | Asignación directa o relación demostrable con ruta/vehículo, estado visible y proyección mínima de datos.                                  |
| Ver LPN o bulto        | Relación con remisión asignada, sello/estado vigente y ocultamiento de contenedores ajenos.                                                |
| Aceptar custodia       | Remisión preparada, manifiesto versionado, bultos y sellos coincidentes, origen autorizado, actor y vehículo asignados, sin bloqueo.       |
| Iniciar tránsito       | Custodia aceptada, estado válido, check-in activo, idempotencia, fecha y hora de servidor, auditoría y geolocalización cuando corresponda. |
| Consultar movimientos  | Solo eventos asociados a la cadena de custodia de operaciones propias.                                                                     |
| Consultar cumplimiento | Solo paradas y remisiones asignadas; no incluir métricas globales ni de otros actores.                                                     |
| Finalizar jornada      | Sin custodia abierta, o con transferencia, devolución o excepción formalmente registrada.                                                  |

#### 12. Compatibilidad con dispositivos y movilidad

La aplicación del conductor podrá ejecutarse en un dispositivo personal o corporativo, pero el dispositivo no será propietario de la operación. Cada acción deberá atribuirse al trabajador autenticado y al turno vigente.

Cuando exista un dispositivo compartido o instalado en el vehículo, deberá crearse una sesión de actor. El PIN, código del vehículo o usuario técnico solo identifica el contexto del dispositivo; no reemplaza la autorización empresarial ni concede el rol.

La operación deberá tolerar conectividad intermitente sin duplicar transiciones. Las acciones offline se registrarán con identificador idempotente, hora del dispositivo y hora de servidor, y se rechazarán si el recurso cambió de versión o fue transferido a otro actor.

#### 13. Riesgos de transición

1. El rol base legacy `conductor` conserva permisos permanentes y puede mantener acceso fuera de turno.
2. Los códigos legacy `nexo.inventory.remissions.transit`, `nexo.inventory.remissions.dispatch` y `nexo.transit.view` no se mapearán ni aliasarán a una capacidad activa; cada consumidor deberá migrar a la PermissionKey exacta que corresponda.
3. El único perfil operativo existente del conductor puede ser interpretado erróneamente como autorización automática.
4. Los puntos externos de check-in comparten la tabla `sites` y pueden aparecer incorrectamente como sedes laborales.
5. La matriz física actual usa cadenas de permiso sin FK y concesiones globales; el dataset canónico deberá corregir integridad y alcance.
6. La aplicación puede depender de rutas técnicas legacy como `conductor.view` o `transit.view`; deberán sustituirse por permisos funcionales.
7. `nexo.inventory.remissions.deliver` ya representa el handoff físico del conductor, pero no concede `receive`; reutilizar `receive` o `pulso.delivery.deliveries.override` para la entrega ordinaria sigue rompiendo la segregación de funciones.
8. La conectividad móvil puede producir doble despacho o eventos fuera de orden si no existe idempotencia y control de versión.

#### 14. Resultado esperado en la experiencia

```text
MI RUTA — TURNO ACTIVO

Próxima recogida
[ Centro de Producción ]
Remisiones listas: 3
[ Revisar carga ]

Carga bajo mi custodia
[ REM-2026-00124 ]  En tránsito
Destino: Vento Café
Bultos: 8 de 8

Ruta
1. Centro de Producción   ✓ Recogida
2. Vento Café             ● Siguiente
3. Saudo                  ○ Pendiente

Acciones disponibles
[ Aceptar custodia ]
[ Iniciar tránsito ]
[ Registrar entrega física ]
[ Ver manifiesto ]
[ Ver ruta ]

Pendiente contractual
- Registrar llegada o progreso de parada cuando exista PermissionKey exacta
- Adjuntar evidencia sensible de entrega bajo contratos aprobados
- Reportar incidencia mediante capacidad explícita
- Registrar entrega fallida, retorno o reasignación mediante capacidad explícita
```

No se mostrará:

- Preparar o modificar cantidades.
- Recibir por el destino.
- Cancelar remisiones.
- Consultar stock general.
- Ver rutas de otros conductores.
- Ajustar diferencias.

#### 15. Invariantes

- Conductor es rol operativo, no cargo permanente ni autoridad logística global.
- Perfil, vehículo, ruta y dispositivo no conceden permisos.
- Preparación y custodia en tránsito son etapas diferentes.
- Aceptar custodia no permite alterar el manifiesto.
- Iniciar tránsito no implica entrega.
- Entregar físicamente no equivale a recibir en nombre del destino.
- El conductor no puede aprobar sus propias diferencias.
- Una incidencia no produce automáticamente ajuste, cancelación ni recepción.
- La visibilidad se limita a operaciones asignadas.
- La geolocalización se limita a una finalidad y jornada definidas.
- Toda transición conserva actor, recurso, versión, ubicación, fecha e idempotencia.
- La ausencia de permiso produce denegación.

#### 16. Criterios de aprobación

La tarea podrá aprobarse cuando se acepte que:

- `conductor_logistica` recibe **16 concesiones vigentes** en el dataset operacional;
- puede consultar exclusivamente su carga, operaciones, rutas y cumplimiento asignados;
- acepta custodia exclusivamente mediante `nexo.inventory.remissions.accept_custody`;
- inicia tránsito exclusivamente mediante `nexo.inventory.remissions.start_transit`;
- registra el handoff físico exclusivamente mediante `nexo.inventory.remissions.deliver`;
- no prepara, modifica, recibe, cancela ni ajusta remisiones o inventario por inferencia;
- el destino conserva la responsabilidad exclusiva de `nexo.inventory.remissions.receive`;
- no se utiliza `pulso.delivery.deliveries.override` como permiso ordinario del conductor;
- evidencia sensible, incidentes, progreso, retorno y reasignación permanecen `DEFAULT_DENY` mientras no exista contrato y PermissionKey activa exacta;
- el perfil, punto de check-in, vehículo y dispositivo no sustituyen el permiso;
- el snapshot histórico de 112 permisos se conserva para trazabilidad, mientras la autorización vigente consume **140 PermissionKey activas** y **16 grants** del conductor;
- `dispatch`, `transit` y `transit.view` no forman parte del conjunto activo ni autorizan runtime.

#### 17. Estado final de la propuesta

| Tarea         | Estado      |
| ------------- | ----------- |
| AUTH-RBAC-017 | APROBADA    |
| AUTH-RBAC-018 | APROBADA    |
| AUTH-RBAC-019 | NO INICIADA |

No se implementan código, migraciones, cambios en Supabase, RLS, RPC, datasets, repositorios, guards, dispositivos ni pantallas. La matriz solo será canónica cuando el usuario la apruebe expresamente.


### ✅ AUTH-RBAC-019 — Crear matriz de gerencia_operativa


#### 1. Identificación de la tarea

| Campo                     | Valor                                                              |
| ------------------------- | ------------------------------------------------------------------ |
| Bloque                    | BLOQUE D — Matrices canónicas de roles, excepciones y dispositivos |
| Tarea                     | AUTH-RBAC-019 — Crear matriz de gerencia_operativa                 |
| Estado                    | **APROBADA**                                                       |
| Naturaleza                | Definición documental de matriz operativa de coordinación          |
| Implementación física     | No incluida                                                        |
| Catálogo evaluado         | 112 permisos canónicos vigentes                                    |
| Tarea anterior vigente    | AUTH-RBAC-018 — APROBADA                                           |
| Tarea posterior reservada | AUTH-RBAC-020 — Definir concesiones individuales base              |

Esta tarea no modifica Supabase, migraciones, tablas, RLS, RPC, aplicaciones, repositorios, dispositivos ni datasets físicos. La aplicación posterior deberá realizarse mediante AUTH-RBAC-025, las capas de excepciones aprobadas y las migraciones versionadas del BLOQUE R en `vento-shell`.

#### 2. Objetivo

Definir, permiso por permiso, las capacidades del rol operativo `gerencia_operativa` para coordinar en tiempo real la jornada, supervisar producción, inventario, abastecimiento, logística y operación comercial de la sede activa, y aportar el componente operativo de determinadas acciones excepcionales, sin convertir este rol en un duplicado de `propietario`, `gerente_general`, `gerente` o `supervisor`, sin crear un bypass y sin sustituir a los actores físicos responsables de cada etapa.

#### 3. Decisión principal

`gerencia_operativa` representa coordinación directa y temporal de la operación. Su función es observar el estado completo de la sede activa, priorizar, desbloquear, escalar y ejecutar únicamente las acciones de coordinación expresamente concedidas. No hereda permisos administrativos por el nombre del rol y no recibe alcance organizacional global.

```text
ACTOR HUMANO IDENTIFICADO
+ TURNO PUBLICADO Y VIGENTE
+ CHECK-IN ACTIVO CUANDO APLIQUE
+ ROL OPERATIVO gerencia_operativa
+ SEDE ACTIVA AUTORIZADA
+ ÁREA ACTIVA O ÁREA GENERAL COMPATIBLE
+ PERMISO EXACTO
+ RECURSO RELACIONADO CON LA JORNADA
= AUTORIZACIÓN OPERATIVA DE COORDINACIÓN
```

No se admite:

```text
gerencia_operativa = gerente_general
gerencia_operativa = todos los permisos operativos
gerencia_operativa = bypass de turno o check-in
gerencia_operativa = alcance sobre todas las sedes
gerencia_operativa = reemplazo automático de bodeguero, conductor o producción
ver una operación = modificarla
coordinar una etapa = asumir su custodia física
componente operativo = autorización suficiente para BASE_AND_OPERATIONAL
```

#### 4. Separación entre carril base y coordinación operativa

| Dimensión                                         | Carril base administrativo                                 | Rol `gerencia_operativa`                                                 |
| ------------------------------------------------- | ---------------------------------------------------------- | ------------------------------------------------------------------------ |
| Vigencia                                          | Permanente mientras el rol y permiso base estén activos    | Solo durante turno y contexto operativo válidos                          |
| Territorio                                        | Sedes y áreas asignadas según la matriz base               | Únicamente sede/área activas y recursos relacionados con la jornada      |
| Personal, horarios y configuración                | Puede corresponder al rol base                             | No se duplica en esta matriz                                             |
| Seguimiento de producción, inventario y logística | Puede existir como consulta administrativa                 | Se concede para coordinación en tiempo real                              |
| Ejecución física                                  | No se presume                                              | Solo cuando exista permiso operativo exacto; no se infiere por jerarquía |
| Acciones `BASE_AND_OPERATIONAL`                   | Aporta el componente base cuando la matriz base lo concede | Aporta únicamente el componente operativo expresamente asignado          |
| Fin del turno                                     | No revoca permisos base                                    | Revoca todas las capacidades de esta matriz                              |

Un trabajador con rol base `propietario`, `gerente_general`, `gerente` o `supervisor` podrá asumir `gerencia_operativa`, pero los dos carriles conservarán decisiones, alcances y auditorías independientes. Un trabajador sin componente base no podrá ejecutar una acción `BASE_AND_OPERATIONAL` aunque tenga este rol operativo.

#### 5. Resultado cuantitativo de la matriz

| Resultado                                 | Cantidad | Efecto                                                                                                   |
| ----------------------------------------- | -------: | -------------------------------------------------------------------------------------------------------- |
| Capacidades operativas directas           |       43 | Cuarenta permisos `BASE_OR_OPERATIONAL` y tres `OPERATIONAL_ONLY` concedidos dentro del contexto activo. |
| Componentes operativos de doble condición |        5 | No autorizan por sí solos; requieren una concesión base compatible y controles reforzados.               |
| Capacidades no asignadas                  |       64 | Permanecen denegadas por defecto.                                                                        |
| Total evaluado                            |      112 | Sin omisiones ni duplicados.                                                                             |

La matriz contiene **48 claves con concesión en el carril operativo**: 43 capacidades operativas directas y cinco componentes operativos de permisos `BASE_AND_OPERATIONAL`. No existe wildcard ni concesión global.

#### 6. Perfiles de alcance utilizados

- `CTX-MGR-FOGO-APP` — Entrada operativa a FOGO durante el turno de coordinación.
- `CTX-MGR-PRODUCTION-STATUS` — Órdenes y lotes que afectan la sede o áreas coordinadas.
- `CTX-MGR-PRODUCTION-RECIPE` — Recetario operativo mínimo vinculado con órdenes o incidencias activas.
- `CTX-MGR-NEXO-APP` — Entrada operativa a NEXO sin ampliar territorio.
- `CTX-MGR-CATALOG` — Catálogos necesarios para interpretar solicitudes, inventario y remisiones de la sede activa.
- `CTX-MGR-ASSETS` — Activos y conteos relacionados con la sede activa, en consulta.
- `CTX-MGR-INVENTORY-CONTROL` — Entradas y ajustes que afectan la jornada, con trazabilidad.
- `CTX-MGR-INVENTORY-VIEW` — Inventario, ubicaciones, LPN, movimientos, lotes, traslados, retiros y operaciones de la sede activa.
- `CTX-MGR-COUNTS-READ` — Conteos con visibilidad limitada por etapa y segregación de funciones.
- `CTX-MGR-REMISSIONS` — Remisiones relacionadas con la sede activa o bajo coordinación expresa.
- `CTX-MGR-REMISSION-UPDATE` — Campos operativos editables sin alterar custodia o cantidades protegidas.
- `CTX-MGR-REMISSION-REQUEST` — Solicitudes justificadas para la sede o área activa.
- `CTX-MGR-REMISSION-CANCEL` — Cancelación en estados permitidos, con motivo y auditoría reforzada.
- `CTX-MGR-LOGISTICS` — Operaciones, conductores, cumplimiento y rutas que afectan la sede coordinada.
- `CTX-MGR-ORIGO` — Abastecimiento y recepción vinculados con la sede activa, en consulta.
- `CTX-MGR-PULSO-APP` — Entrada operativa a PULSO sin conceder ventas, caja o pagos por sí sola.
- `CTX-MGR-DOUBLE-*` — Componente operativo de capacidades excepcionales que exigen simultáneamente carril base válido.

Los perfiles deberán convertirse posteriormente en contratos de recurso y filtros del lado servidor. No son filtros visuales ni parámetros confiables del frontend.

#### 7. Matriz canónica completa — 112 permisos


##### 7.1 SHELL — 1 permisos
| Permiso        | Capacidad humana  | Modalidad   | Decisión para gerencia_operativa | Alcance aprobado                                                       | Condición                                                                                                                                                    |
| -------------- | ----------------- | ----------- | -------------------------------- | ---------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `shell.access` | Entrar a Vento OS | `BASE_ONLY` | **NO ASIGNAR**                   | — Denegación por defecto; no se crea concesión en la matriz operativa. | Capacidad exclusiva del carril base. Los permisos administrativos permanentes proceden del rol base del trabajador y no se duplican en `gerencia_operativa`. |


##### 7.2 ANIMA — 10 permisos
| Permiso                                     | Capacidad humana                     | Modalidad   | Decisión para gerencia_operativa | Alcance aprobado                                                       | Condición                                                                                                                                                    |
| ------------------------------------------- | ------------------------------------ | ----------- | -------------------------------- | ---------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `anima.access`                              | Entrar a ANIMA                       | `BASE_ONLY` | **NO ASIGNAR**                   | — Denegación por defecto; no se crea concesión en la matriz operativa. | Capacidad exclusiva del carril base. Los permisos administrativos permanentes proceden del rol base del trabajador y no se duplican en `gerencia_operativa`. |
| `anima.workforce.employee_documents.view`   | Consultar documentos de trabajadores | `BASE_ONLY` | **NO ASIGNAR**                   | — Denegación por defecto; no se crea concesión en la matriz operativa. | Capacidad exclusiva del carril base. Los permisos administrativos permanentes proceden del rol base del trabajador y no se duplican en `gerencia_operativa`. |
| `anima.workforce.employee_documents.upload` | Cargar documentos de trabajadores    | `BASE_ONLY` | **NO ASIGNAR**                   | — Denegación por defecto; no se crea concesión en la matriz operativa. | Capacidad exclusiva del carril base. Los permisos administrativos permanentes proceden del rol base del trabajador y no se duplican en `gerencia_operativa`. |
| `anima.workforce.employee_documents.delete` | Eliminar documentos de trabajadores  | `BASE_ONLY` | **NO ASIGNAR**                   | — Denegación por defecto; no se crea concesión en la matriz operativa. | Capacidad exclusiva del carril base. Los permisos administrativos permanentes proceden del rol base del trabajador y no se duplican en `gerencia_operativa`. |
| `anima.workforce.employee_photos.upload`    | Cargar fotografías de trabajadores   | `BASE_ONLY` | **NO ASIGNAR**                   | — Denegación por defecto; no se crea concesión en la matriz operativa. | Capacidad exclusiva del carril base. Los permisos administrativos permanentes proceden del rol base del trabajador y no se duplican en `gerencia_operativa`. |
| `anima.workforce.team_members.view`         | Consultar integrantes del equipo     | `BASE_ONLY` | **NO ASIGNAR**                   | — Denegación por defecto; no se crea concesión en la matriz operativa. | Capacidad exclusiva del carril base. Los permisos administrativos permanentes proceden del rol base del trabajador y no se duplican en `gerencia_operativa`. |
| `anima.workforce.staff_invitations.create`  | Invitar trabajadores                 | `BASE_ONLY` | **NO ASIGNAR**                   | — Denegación por defecto; no se crea concesión en la matriz operativa. | Capacidad exclusiva del carril base. Los permisos administrativos permanentes proceden del rol base del trabajador y no se duplican en `gerencia_operativa`. |
| `anima.attendance.shifts.create`            | Crear turnos                         | `BASE_ONLY` | **NO ASIGNAR**                   | — Denegación por defecto; no se crea concesión en la matriz operativa. | Capacidad exclusiva del carril base. Los permisos administrativos permanentes proceden del rol base del trabajador y no se duplican en `gerencia_operativa`. |
| `anima.attendance.shifts.update`            | Actualizar turnos                    | `BASE_ONLY` | **NO ASIGNAR**                   | — Denegación por defecto; no se crea concesión en la matriz operativa. | Capacidad exclusiva del carril base. Los permisos administrativos permanentes proceden del rol base del trabajador y no se duplican en `gerencia_operativa`. |
| `anima.attendance.shifts.cancel`            | Cancelar turnos                      | `BASE_ONLY` | **NO ASIGNAR**                   | — Denegación por defecto; no se crea concesión en la matriz operativa. | Capacidad exclusiva del carril base. Los permisos administrativos permanentes proceden del rol base del trabajador y no se duplican en `gerencia_operativa`. |


##### 7.3 AURA — 1 permisos
| Permiso       | Capacidad humana | Modalidad   | Decisión para gerencia_operativa | Alcance aprobado                                                       | Condición                                                                                                                                                    |
| ------------- | ---------------- | ----------- | -------------------------------- | ---------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `aura.access` | Entrar a AURA    | `BASE_ONLY` | **NO ASIGNAR**                   | — Denegación por defecto; no se crea concesión en la matriz operativa. | Capacidad exclusiva del carril base. Los permisos administrativos permanentes proceden del rol base del trabajador y no se duplican en `gerencia_operativa`. |


##### 7.4 FOGO — 6 permisos
| Permiso                            | Capacidad humana                | Modalidad             | Decisión para gerencia_operativa | Alcance aprobado                                                                                                                                                                         | Condición                                                                                                                                                                                        |
| ---------------------------------- | ------------------------------- | --------------------- | -------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `fogo.access`                      | Entrar a FOGO                   | `BASE_OR_OPERATIONAL` | **ASIGNAR OPERATIVO**            | CTX-MGR-FOGO-APP — Entrada a FOGO durante el turno de coordinación. No concede acciones internas por sí sola.                                                                            | Carril operativo. Requiere actor activo, turno publicado y vigente, check-in cuando aplique, sede/área compatibles, permiso exacto y recurso resuelto en servidor. Nunca produce alcance global. |
| `fogo.production.batches.view`     | Consultar lotes de producción   | `BASE_OR_OPERATIONAL` | **ASIGNAR OPERATIVO**            | CTX-MGR-PRODUCTION-STATUS — Órdenes y lotes de producción vinculados con la sede activa, sus áreas operativas o abastecimientos que afecten la jornada. Solo seguimiento y coordinación. | Carril operativo. Requiere actor activo, turno publicado y vigente, check-in cuando aplique, sede/área compatibles, permiso exacto y recurso resuelto en servidor. Nunca produce alcance global. |
| `fogo.production.batches.create`   | Crear lotes de producción       | `OPERATIONAL_ONLY`    | **NO ASIGNAR**                   | — Denegación por defecto; no se crea concesión en la matriz operativa.                                                                                                                   | Crear lotes corresponde al rol productivo responsable. La gerencia coordina y supervisa, pero no sustituye la ejecución productiva ordinaria.                                                    |
| `fogo.production.orders.view`      | Consultar órdenes de producción | `BASE_OR_OPERATIONAL` | **ASIGNAR OPERATIVO**            | CTX-MGR-PRODUCTION-STATUS — Órdenes y lotes de producción vinculados con la sede activa, sus áreas operativas o abastecimientos que afecten la jornada. Solo seguimiento y coordinación. | Carril operativo. Requiere actor activo, turno publicado y vigente, check-in cuando aplique, sede/área compatibles, permiso exacto y recurso resuelto en servidor. Nunca produce alcance global. |
| `fogo.production.recipe_book.view` | Consultar recetario operativo   | `OPERATIONAL_ONLY`    | **ASIGNAR OPERATIVO**            | CTX-MGR-PRODUCTION-RECIPE — Recetario operativo estrictamente necesario para verificar ejecución, rendimientos e incidencias de órdenes activas en la sede o área coordinada.            | Carril operativo. Requiere turno, sede/área compatibles y relación con una orden o incidencia activa. No permite consultar ni administrar el maestro completo de recetas.                        |
| `fogo.production.recipes.view`     | Consultar recetas               | `BASE_ONLY`           | **NO ASIGNAR**                   | — Denegación por defecto; no se crea concesión en la matriz operativa.                                                                                                                   | Capacidad exclusiva del carril base. Los permisos administrativos permanentes proceden del rol base del trabajador y no se duplican en `gerencia_operativa`.                                     |


##### 7.5 NEXO — 63 permisos
| Permiso                                      | Capacidad humana                         | Modalidad              | Decisión para gerencia_operativa | Alcance aprobado                                                                                                                                                                                                                    | Condición                                                                                                                                                                                                                                            |
| -------------------------------------------- | ---------------------------------------- | ---------------------- | -------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `nexo.access`                                | Entrar a NEXO                            | `BASE_OR_OPERATIONAL`  | **ASIGNAR OPERATIVO**            | CTX-MGR-NEXO-APP — Entrada a NEXO durante un turno válido de `gerencia_operativa`. No concede funciones internas ni alcance multisede por sí sola.                                                                                  | Carril operativo. Requiere actor activo, turno publicado y vigente, check-in cuando aplique, sede/área compatibles, permiso exacto y recurso resuelto en servidor. Nunca produce alcance global.                                                     |
| `nexo.catalog.products.view`                 | Consultar productos                      | `BASE_OR_OPERATIONAL`  | **ASIGNAR OPERATIVO**            | CTX-MGR-CATALOG — Catálogos operativos vigentes necesarios para coordinar inventario, solicitudes, producción y remisiones de la sede activa. Excluye configuración y costos protegidos.                                            | Carril operativo. Requiere actor activo, turno publicado y vigente, check-in cuando aplique, sede/área compatibles, permiso exacto y recurso resuelto en servidor. Nunca produce alcance global.                                                     |
| `nexo.catalog.products.create`               | Crear productos                          | `BASE_ONLY`            | **NO ASIGNAR**                   | — Denegación por defecto; no se crea concesión en la matriz operativa.                                                                                                                                                              | Capacidad exclusiva del carril base. Los permisos administrativos permanentes proceden del rol base del trabajador y no se duplican en `gerencia_operativa`.                                                                                         |
| `nexo.catalog.presentations.view`            | Consultar presentaciones                 | `BASE_OR_OPERATIONAL`  | **ASIGNAR OPERATIVO**            | CTX-MGR-CATALOG — Catálogos operativos vigentes necesarios para coordinar inventario, solicitudes, producción y remisiones de la sede activa. Excluye configuración y costos protegidos.                                            | Carril operativo. Requiere actor activo, turno publicado y vigente, check-in cuando aplique, sede/área compatibles, permiso exacto y recurso resuelto en servidor. Nunca produce alcance global.                                                     |
| `nexo.catalog.request_policies.view`         | Consultar políticas de solicitud         | `BASE_OR_OPERATIONAL`  | **ASIGNAR OPERATIVO**            | CTX-MGR-CATALOG — Catálogos operativos vigentes necesarios para coordinar inventario, solicitudes, producción y remisiones de la sede activa. Excluye configuración y costos protegidos.                                            | Carril operativo. Requiere actor activo, turno publicado y vigente, check-in cuando aplique, sede/área compatibles, permiso exacto y recurso resuelto en servidor. Nunca produce alcance global.                                                     |
| `nexo.catalog.categories.view`               | Consultar categorías                     | `BASE_OR_OPERATIONAL`  | **ASIGNAR OPERATIVO**            | CTX-MGR-CATALOG — Catálogos operativos vigentes necesarios para coordinar inventario, solicitudes, producción y remisiones de la sede activa. Excluye configuración y costos protegidos.                                            | Carril operativo. Requiere actor activo, turno publicado y vigente, check-in cuando aplique, sede/área compatibles, permiso exacto y recurso resuelto en servidor. Nunca produce alcance global.                                                     |
| `nexo.catalog.units.view`                    | Consultar unidades                       | `BASE_OR_OPERATIONAL`  | **ASIGNAR OPERATIVO**            | CTX-MGR-CATALOG — Catálogos operativos vigentes necesarios para coordinar inventario, solicitudes, producción y remisiones de la sede activa. Excluye configuración y costos protegidos.                                            | Carril operativo. Requiere actor activo, turno publicado y vigente, check-in cuando aplique, sede/área compatibles, permiso exacto y recurso resuelto en servidor. Nunca produce alcance global.                                                     |
| `nexo.assets.items.view`                     | Consultar activos                        | `BASE_OR_OPERATIONAL`  | **ASIGNAR OPERATIVO**            | CTX-MGR-ASSETS — Activos, grupos y conteos relacionados con la sede o área activa. Solo consulta de estado, custodia e incidencias; no creación ni administración del maestro.                                                      | Carril operativo. Requiere actor activo, turno publicado y vigente, check-in cuando aplique, sede/área compatibles, permiso exacto y recurso resuelto en servidor. Nunca produce alcance global.                                                     |
| `nexo.assets.items.create`                   | Crear activos                            | `BASE_ONLY`            | **NO ASIGNAR**                   | — Denegación por defecto; no se crea concesión en la matriz operativa.                                                                                                                                                              | Capacidad exclusiva del carril base. Los permisos administrativos permanentes proceden del rol base del trabajador y no se duplican en `gerencia_operativa`.                                                                                         |
| `nexo.assets.groups.view`                    | Consultar grupos de activos              | `BASE_OR_OPERATIONAL`  | **ASIGNAR OPERATIVO**            | CTX-MGR-ASSETS — Activos, grupos y conteos relacionados con la sede o área activa. Solo consulta de estado, custodia e incidencias; no creación ni administración del maestro.                                                      | Carril operativo. Requiere actor activo, turno publicado y vigente, check-in cuando aplique, sede/área compatibles, permiso exacto y recurso resuelto en servidor. Nunca produce alcance global.                                                     |
| `nexo.assets.counts.view`                    | Consultar conteos de activos             | `BASE_OR_OPERATIONAL`  | **ASIGNAR OPERATIVO**            | CTX-MGR-ASSETS — Activos, grupos y conteos relacionados con la sede o área activa. Solo consulta de estado, custodia e incidencias; no creación ni administración del maestro.                                                      | Carril operativo. Requiere actor activo, turno publicado y vigente, check-in cuando aplique, sede/área compatibles, permiso exacto y recurso resuelto en servidor. Nunca produce alcance global.                                                     |
| `nexo.inventory.adjustments.view`            | Consultar ajustes de inventario          | `BASE_OR_OPERATIONAL`  | **ASIGNAR OPERATIVO**            | CTX-MGR-INVENTORY-CONTROL — Entradas o ajustes que afecten la sede activa, con actor, documento, motivo, estado y trazabilidad. No amplía por sí sola la capacidad de registrar.                                                    | Carril operativo. Requiere actor activo, turno publicado y vigente, check-in cuando aplique, sede/área compatibles, permiso exacto y recurso resuelto en servidor. Nunca produce alcance global.                                                     |
| `nexo.inventory.adjustments.register`        | Registrar ajustes de inventario          | `BASE_AND_OPERATIONAL` | **ASIGNAR COMPONENTE OPERATIVO** | CTX-MGR-DOUBLE-ADJUSTMENT — Componente operativo sobre inventario de la sede/área activa. La ejecución final exige además concesión base compatible, diferencia documentada, motivo, reautenticación y auditoría reforzada.         | Asignar solo el componente operativo. La autorización final exige componente base válido, turno y check-in activos, sede/área compatibles, motivo, reautenticación y auditoría reforzada.                                                            |
| `nexo.inventory.entries.view`                | Consultar entradas de inventario         | `BASE_OR_OPERATIONAL`  | **ASIGNAR OPERATIVO**            | CTX-MGR-INVENTORY-CONTROL — Entradas o ajustes que afecten la sede activa, con actor, documento, motivo, estado y trazabilidad. No amplía por sí sola la capacidad de registrar.                                                    | Carril operativo. Requiere actor activo, turno publicado y vigente, check-in cuando aplique, sede/área compatibles, permiso exacto y recurso resuelto en servidor. Nunca produce alcance global.                                                     |
| `nexo.inventory.entries.register`            | Registrar entradas de inventario         | `OPERATIONAL_ONLY`     | **NO ASIGNAR**                   | — Denegación por defecto; no se crea concesión en la matriz operativa.                                                                                                                                                              | La entrada ordinaria es una captura física del actor receptor o bodeguero. La gerencia puede consultar y, con doble condición, autorizar una excepción, pero no registrar la recepción ordinaria por defecto.                                        |
| `nexo.inventory.entries.override`            | Registrar entradas excepcionales         | `BASE_AND_OPERATIONAL` | **ASIGNAR COMPONENTE OPERATIVO** | CTX-MGR-DOUBLE-ENTRY — Componente operativo para una entrada excepcional en la sede/área activa. Requiere simultáneamente autoridad base, documento o incidente válido, motivo y control de duplicidad.                             | Asignar solo el componente operativo. La autorización final exige componente base válido, turno y check-in activos, sede/área compatibles, motivo, reautenticación y auditoría reforzada.                                                            |
| `nexo.inventory.locations.view`              | Consultar ubicaciones de inventario      | `BASE_OR_OPERATIONAL`  | **ASIGNAR OPERATIVO**            | CTX-MGR-INVENTORY-VIEW — Inventario, ubicaciones, LPN, movimientos, lotes, traslados, retiros, zonas, posiciones y operaciones pertenecientes a la sede o área activa. Sin visibilidad global implícita.                            | Carril operativo. Requiere actor activo, turno publicado y vigente, check-in cuando aplique, sede/área compatibles, permiso exacto y recurso resuelto en servidor. Nunca produce alcance global.                                                     |
| `nexo.inventory.location_assignments.assign` | Asignar ubicaciones de inventario        | `OPERATIONAL_ONLY`     | **NO ASIGNAR**                   | — Denegación por defecto; no se crea concesión en la matriz operativa.                                                                                                                                                              | Asignar ubicaciones es ejecución de bodega. La coordinación puede consultar la distribución, pero no sustituye al custodio físico.                                                                                                                   |
| `nexo.inventory.location_catalog.update`     | Actualizar el catálogo de una ubicación  | `BASE_ONLY`            | **NO ASIGNAR**                   | — Denegación por defecto; no se crea concesión en la matriz operativa.                                                                                                                                                              | Capacidad exclusiva del carril base. Los permisos administrativos permanentes proceden del rol base del trabajador y no se duplican en `gerencia_operativa`.                                                                                         |
| `nexo.inventory.lpns.view`                   | Consultar LPN                            | `BASE_OR_OPERATIONAL`  | **ASIGNAR OPERATIVO**            | CTX-MGR-INVENTORY-VIEW — Inventario, ubicaciones, LPN, movimientos, lotes, traslados, retiros, zonas, posiciones y operaciones pertenecientes a la sede o área activa. Sin visibilidad global implícita.                            | Carril operativo. Requiere actor activo, turno publicado y vigente, check-in cuando aplique, sede/área compatibles, permiso exacto y recurso resuelto en servidor. Nunca produce alcance global.                                                     |
| `nexo.inventory.movements.view`              | Consultar movimientos de inventario      | `BASE_OR_OPERATIONAL`  | **ASIGNAR OPERATIVO**            | CTX-MGR-INVENTORY-VIEW — Inventario, ubicaciones, LPN, movimientos, lotes, traslados, retiros, zonas, posiciones y operaciones pertenecientes a la sede o área activa. Sin visibilidad global implícita.                            | Carril operativo. Requiere actor activo, turno publicado y vigente, check-in cuando aplique, sede/área compatibles, permiso exacto y recurso resuelto en servidor. Nunca produce alcance global.                                                     |
| `nexo.inventory.stock.view`                  | Consultar stock                          | `BASE_OR_OPERATIONAL`  | **ASIGNAR OPERATIVO**            | CTX-MGR-INVENTORY-VIEW — Inventario, ubicaciones, LPN, movimientos, lotes, traslados, retiros, zonas, posiciones y operaciones pertenecientes a la sede o área activa. Sin visibilidad global implícita.                            | Carril operativo. Requiere actor activo, turno publicado y vigente, check-in cuando aplique, sede/área compatibles, permiso exacto y recurso resuelto en servidor. Nunca produce alcance global.                                                     |
| `nexo.inventory.production_batches.view`     | Consultar lotes vinculados al inventario | `BASE_OR_OPERATIONAL`  | **ASIGNAR OPERATIVO**            | CTX-MGR-INVENTORY-VIEW — Inventario, ubicaciones, LPN, movimientos, lotes, traslados, retiros, zonas, posiciones y operaciones pertenecientes a la sede o área activa. Sin visibilidad global implícita.                            | Carril operativo. Requiere actor activo, turno publicado y vigente, check-in cuando aplique, sede/área compatibles, permiso exacto y recurso resuelto en servidor. Nunca produce alcance global.                                                     |
| `nexo.inventory.transfers.view`              | Consultar traslados de inventario        | `BASE_OR_OPERATIONAL`  | **ASIGNAR OPERATIVO**            | CTX-MGR-INVENTORY-VIEW — Inventario, ubicaciones, LPN, movimientos, lotes, traslados, retiros, zonas, posiciones y operaciones pertenecientes a la sede o área activa. Sin visibilidad global implícita.                            | Carril operativo. Requiere actor activo, turno publicado y vigente, check-in cuando aplique, sede/área compatibles, permiso exacto y recurso resuelto en servidor. Nunca produce alcance global.                                                     |
| `nexo.inventory.transfers.create`            | Crear traslados de inventario            | `OPERATIONAL_ONLY`     | **NO ASIGNAR**                   | — Denegación por defecto; no se crea concesión en la matriz operativa.                                                                                                                                                              | Crear traslados es ejecución física y custodia de bodega. La gerencia consulta y coordina; no mueve inventario por inferencia.                                                                                                                       |
| `nexo.inventory.withdrawals.view`            | Consultar retiros de inventario          | `BASE_OR_OPERATIONAL`  | **ASIGNAR OPERATIVO**            | CTX-MGR-INVENTORY-VIEW — Inventario, ubicaciones, LPN, movimientos, lotes, traslados, retiros, zonas, posiciones y operaciones pertenecientes a la sede o área activa. Sin visibilidad global implícita.                            | Carril operativo. Requiere actor activo, turno publicado y vigente, check-in cuando aplique, sede/área compatibles, permiso exacto y recurso resuelto en servidor. Nunca produce alcance global.                                                     |
| `nexo.inventory.withdrawals.register`        | Registrar retiros de inventario          | `OPERATIONAL_ONLY`     | **NO ASIGNAR**                   | — Denegación por defecto; no se crea concesión en la matriz operativa.                                                                                                                                                              | Registrar retiros corresponde al actor que entrega o consume físicamente el inventario. La gerencia no debe crear movimientos ordinarios sin custodia directa.                                                                                       |
| `nexo.inventory.zones.view`                  | Consultar zonas de almacenamiento        | `BASE_OR_OPERATIONAL`  | **ASIGNAR OPERATIVO**            | CTX-MGR-INVENTORY-VIEW — Inventario, ubicaciones, LPN, movimientos, lotes, traslados, retiros, zonas, posiciones y operaciones pertenecientes a la sede o área activa. Sin visibilidad global implícita.                            | Carril operativo. Requiere actor activo, turno publicado y vigente, check-in cuando aplique, sede/área compatibles, permiso exacto y recurso resuelto en servidor. Nunca produce alcance global.                                                     |
| `nexo.inventory.storage_positions.view`      | Consultar posiciones de almacenamiento   | `BASE_OR_OPERATIONAL`  | **ASIGNAR OPERATIVO**            | CTX-MGR-INVENTORY-VIEW — Inventario, ubicaciones, LPN, movimientos, lotes, traslados, retiros, zonas, posiciones y operaciones pertenecientes a la sede o área activa. Sin visibilidad global implícita.                            | Carril operativo. Requiere actor activo, turno publicado y vigente, check-in cuando aplique, sede/área compatibles, permiso exacto y recurso resuelto en servidor. Nunca produce alcance global.                                                     |
| `nexo.inventory.warehouse_operations.view`   | Consultar operaciones de bodega          | `BASE_OR_OPERATIONAL`  | **ASIGNAR OPERATIVO**            | CTX-MGR-INVENTORY-VIEW — Inventario, ubicaciones, LPN, movimientos, lotes, traslados, retiros, zonas, posiciones y operaciones pertenecientes a la sede o área activa. Sin visibilidad global implícita.                            | Carril operativo. Requiere actor activo, turno publicado y vigente, check-in cuando aplique, sede/área compatibles, permiso exacto y recurso resuelto en servidor. Nunca produce alcance global.                                                     |
| `nexo.inventory.stock_validations.perform`   | Ejecutar validaciones de inventario      | `OPERATIONAL_ONLY`     | **NO ASIGNAR**                   | — Denegación por defecto; no se crea concesión en la matriz operativa.                                                                                                                                                              | La validación física debe atribuirse al actor que inspecciona el stock. La gerencia puede revisar resultados, pero no se presume ejecutora del conteo.                                                                                               |
| `nexo.inventory.stock_counts.view`           | Consultar conteos de inventario          | `BASE_OR_OPERATIONAL`  | **ASIGNAR OPERATIVO**            | CTX-MGR-COUNTS-READ — Conteos de la sede o área activa, respetando modalidad ciega, etapa, segregación de funciones y ocultamiento del stock teórico cuando corresponda.                                                            | Carril operativo. Requiere actor activo, turno publicado y vigente, check-in cuando aplique, sede/área compatibles, permiso exacto y recurso resuelto en servidor. Nunca produce alcance global.                                                     |
| `nexo.inventory.stock_counts.perform`        | Ejecutar conteos de inventario           | `OPERATIONAL_ONLY`     | **NO ASIGNAR**                   | — Denegación por defecto; no se crea concesión en la matriz operativa.                                                                                                                                                              | La captura de conteo corresponde al equipo asignado. La gerencia consulta el proceso y resuelve solo mediante permisos separados cuando corresponda.                                                                                                 |
| `nexo.inventory.initial_counts.view`         | Consultar conteos iniciales              | `BASE_OR_OPERATIONAL`  | **ASIGNAR OPERATIVO**            | CTX-MGR-COUNTS-READ — Conteos de la sede o área activa, respetando modalidad ciega, etapa, segregación de funciones y ocultamiento del stock teórico cuando corresponda.                                                            | Carril operativo. Requiere actor activo, turno publicado y vigente, check-in cuando aplique, sede/área compatibles, permiso exacto y recurso resuelto en servidor. Nunca produce alcance global.                                                     |
| `nexo.inventory.remissions.view`             | Consultar remisiones                     | `BASE_OR_OPERATIONAL`  | **ASIGNAR OPERATIVO**            | CTX-MGR-REMISSIONS — Remisiones cuyo origen o destino corresponda a la sede activa, o cuya operación requiera coordinación directa del turno. Los datos de la otra sede se proyectan al mínimo necesario.                           | Carril operativo. Requiere actor activo, turno publicado y vigente, check-in cuando aplique, sede/área compatibles, permiso exacto y recurso resuelto en servidor. Nunca produce alcance global.                                                     |
| `nexo.inventory.remissions.update`           | Actualizar remisiones                    | `BASE_OR_OPERATIONAL`  | **ASIGNAR OPERATIVO**            | CTX-MGR-REMISSION-UPDATE — Actualización de prioridad, programación, observaciones y datos operativos permitidos de remisiones relacionadas con la sede activa. No altera cantidades bajo custodia ni etapas cerradas.              | Carril operativo. Solo campos y estados expresamente editables; cualquier cambio de cantidades, origen, destino, custodia o inventario exige permiso atómico diferente o se deniega.                                                                 |
| `nexo.inventory.remissions.request`          | Solicitar remisiones                     | `OPERATIONAL_ONLY`     | **ASIGNAR OPERATIVO**            | CTX-MGR-REMISSION-REQUEST — Solicitudes justificadas para la sede o área activa, sujetas a políticas, presentaciones mínimas, disponibilidad y trazabilidad del solicitante.                                                        | Carril operativo. Requiere actor activo, turno publicado y vigente, check-in cuando aplique, sede/área compatibles, permiso exacto y recurso resuelto en servidor. Nunca produce alcance global.                                                     |
| `nexo.inventory.remissions.prepare`          | Preparar remisiones                      | `OPERATIONAL_ONLY`     | **NO ASIGNAR**                   | — Denegación por defecto; no se crea concesión en la matriz operativa.                                                                                                                                                              | Preparar y empacar corresponde al origen o bodeguero. La gerencia coordina, pero no modifica cantidades preparadas por defecto.                                                                                                                      |
| `nexo.inventory.remissions.dispatch`         | Despachar remisiones                     | `OPERATIONAL_ONLY`     | **NO ASIGNAR**                   | — Denegación por defecto; no se crea concesión en la matriz operativa.                                                                                                                                                              | Aceptar custodia e iniciar tránsito corresponde al conductor asignado. La gerencia no se convierte en custodio del transporte.                                                                                                                       |
| `nexo.inventory.remissions.receive`          | Recibir remisiones                       | `OPERATIONAL_ONLY`     | **NO ASIGNAR**                   | — Denegación por defecto; no se crea concesión en la matriz operativa.                                                                                                                                                              | Recibir y aceptar cantidades corresponde al actor físico del destino. La gerencia no auto-confirma la recepción salvo flujo excepcional atómico futuro.                                                                                              |
| `nexo.inventory.remissions.cancel`           | Cancelar remisiones                      | `BASE_OR_OPERATIONAL`  | **ASIGNAR OPERATIVO**            | CTX-MGR-REMISSION-CANCEL — Cancelación operativa de remisiones relacionadas con la sede activa, solo en estados cancelables, con motivo obligatorio, reautenticación y auditoría. No revierte custodia o inventario por inferencia. | Carril operativo. Exige turno y check-in activos, recurso relacionado con la sede coordinada, estado cancelable, control de versión, motivo obligatorio y auditoría. La cancelación no ejecuta ajustes ni devoluciones implícitas.                   |
| `nexo.logistics.operations_board.view`       | Consultar tablero logístico              | `BASE_OR_OPERATIONAL`  | **ASIGNAR OPERATIVO**            | CTX-MGR-LOGISTICS — Tablero, operaciones, conductores, cumplimiento y rutas que afecten la sede activa o estén bajo coordinación expresa del turno. Excluye operaciones ajenas y ubicación histórica innecesaria.                   | Carril operativo. Requiere actor activo, turno publicado y vigente, check-in cuando aplique, sede/área compatibles, permiso exacto y recurso resuelto en servidor. Nunca produce alcance global.                                                     |
| `nexo.logistics.operations.view`             | Consultar operaciones logísticas         | `BASE_OR_OPERATIONAL`  | **ASIGNAR OPERATIVO**            | CTX-MGR-LOGISTICS — Tablero, operaciones, conductores, cumplimiento y rutas que afecten la sede activa o estén bajo coordinación expresa del turno. Excluye operaciones ajenas y ubicación histórica innecesaria.                   | Carril operativo. Requiere actor activo, turno publicado y vigente, check-in cuando aplique, sede/área compatibles, permiso exacto y recurso resuelto en servidor. Nunca produce alcance global.                                                     |
| `nexo.logistics.driver_operations.view`      | Consultar operaciones de conductores     | `BASE_OR_OPERATIONAL`  | **ASIGNAR OPERATIVO**            | CTX-MGR-LOGISTICS — Tablero, operaciones, conductores, cumplimiento y rutas que afecten la sede activa o estén bajo coordinación expresa del turno. Excluye operaciones ajenas y ubicación histórica innecesaria.                   | Carril operativo. Requiere actor activo, turno publicado y vigente, check-in cuando aplique, sede/área compatibles, permiso exacto y recurso resuelto en servidor. Nunca produce alcance global.                                                     |
| `nexo.logistics.fulfillment.view`            | Consultar cumplimiento logístico         | `BASE_OR_OPERATIONAL`  | **ASIGNAR OPERATIVO**            | CTX-MGR-LOGISTICS — Tablero, operaciones, conductores, cumplimiento y rutas que afecten la sede activa o estén bajo coordinación expresa del turno. Excluye operaciones ajenas y ubicación histórica innecesaria.                   | Carril operativo. Requiere actor activo, turno publicado y vigente, check-in cuando aplique, sede/área compatibles, permiso exacto y recurso resuelto en servidor. Nunca produce alcance global.                                                     |
| `nexo.logistics.fulfillment_routes.view`     | Consultar rutas de cumplimiento          | `BASE_OR_OPERATIONAL`  | **ASIGNAR OPERATIVO**            | CTX-MGR-LOGISTICS — Tablero, operaciones, conductores, cumplimiento y rutas que afecten la sede activa o estén bajo coordinación expresa del turno. Excluye operaciones ajenas y ubicación histórica innecesaria.                   | Carril operativo. Requiere actor activo, turno publicado y vigente, check-in cuando aplique, sede/área compatibles, permiso exacto y recurso resuelto en servidor. Nunca produce alcance global.                                                     |
| `nexo.logistics.supply_routes.view`          | Consultar rutas de abastecimiento        | `BASE_OR_OPERATIONAL`  | **ASIGNAR OPERATIVO**            | CTX-MGR-LOGISTICS — Tablero, operaciones, conductores, cumplimiento y rutas que afecten la sede activa o estén bajo coordinación expresa del turno. Excluye operaciones ajenas y ubicación histórica innecesaria.                   | Carril operativo. Requiere actor activo, turno publicado y vigente, check-in cuando aplique, sede/área compatibles, permiso exacto y recurso resuelto en servidor. Nunca produce alcance global.                                                     |
| `nexo.finance.internal_invoices.view`        | Consultar facturas internas              | `BASE_ONLY`            | **NO ASIGNAR**                   | — Denegación por defecto; no se crea concesión en la matriz operativa.                                                                                                                                                              | Capacidad exclusiva del carril base. Los permisos administrativos permanentes proceden del rol base del trabajador y no se duplican en `gerencia_operativa`.                                                                                         |
| `nexo.finance.internal_invoices.generate`    | Generar facturas internas                | `BASE_ONLY`            | **NO ASIGNAR**                   | — Denegación por defecto; no se crea concesión en la matriz operativa.                                                                                                                                                              | Capacidad exclusiva del carril base. Los permisos administrativos permanentes proceden del rol base del trabajador y no se duplican en `gerencia_operativa`.                                                                                         |
| `nexo.finance.internal_invoices.issue`       | Emitir facturas internas                 | `BASE_ONLY`            | **NO ASIGNAR**                   | — Denegación por defecto; no se crea concesión en la matriz operativa.                                                                                                                                                              | Capacidad exclusiva del carril base. Los permisos administrativos permanentes proceden del rol base del trabajador y no se duplican en `gerencia_operativa`.                                                                                         |
| `nexo.finance.internal_invoices.cancel`      | Cancelar facturas internas               | `BASE_ONLY`            | **NO ASIGNAR**                   | — Denegación por defecto; no se crea concesión en la matriz operativa.                                                                                                                                                              | Capacidad exclusiva del carril base. Los permisos administrativos permanentes proceden del rol base del trabajador y no se duplican en `gerencia_operativa`.                                                                                         |
| `nexo.finance.internal_invoice_amounts.view` | Consultar valores de facturas internas   | `BASE_ONLY`            | **NO ASIGNAR**                   | — Denegación por defecto; no se crea concesión en la matriz operativa.                                                                                                                                                              | Capacidad exclusiva del carril base. Los permisos administrativos permanentes proceden del rol base del trabajador y no se duplican en `gerencia_operativa`.                                                                                         |
| `nexo.finance.internal_prices.view`          | Consultar precios internos               | `BASE_ONLY`            | **NO ASIGNAR**                   | — Denegación por defecto; no se crea concesión en la matriz operativa.                                                                                                                                                              | Capacidad exclusiva del carril base. Los permisos administrativos permanentes proceden del rol base del trabajador y no se duplican en `gerencia_operativa`.                                                                                         |
| `nexo.finance.internal_variances.view`       | Consultar variaciones internas           | `BASE_ONLY`            | **NO ASIGNAR**                   | — Denegación por defecto; no se crea concesión en la matriz operativa.                                                                                                                                                              | Capacidad exclusiva del carril base. Los permisos administrativos permanentes proceden del rol base del trabajador y no se duplican en `gerencia_operativa`.                                                                                         |
| `nexo.finance.internal_variances.approve`    | Aprobar variaciones internas             | `BASE_AND_OPERATIONAL` | **ASIGNAR COMPONENTE OPERATIVO** | CTX-MGR-DOUBLE-VARIANCE — Componente operativo de una variación vinculada a la sede o jornada activa. Requiere además autoridad base compatible, evidencia, separación de funciones y auditoría reforzada.                          | Asignar solo el componente operativo. La autorización final exige componente base válido, turno y check-in activos, recurso territorialmente compatible y actor distinto de quien originó o capturó la diferencia cuando la segregación lo requiera. |
| `nexo.finance.internal_variances.resolve`    | Resolver variaciones internas            | `BASE_AND_OPERATIONAL` | **ASIGNAR COMPONENTE OPERATIVO** | CTX-MGR-DOUBLE-VARIANCE — Componente operativo de una variación vinculada a la sede o jornada activa. Requiere además autoridad base compatible, evidencia, separación de funciones y auditoría reforzada.                          | Asignar solo el componente operativo. La autorización final exige componente base válido, turno y check-in activos, recurso territorialmente compatible y actor distinto de quien originó o capturó la diferencia cuando la segregación lo requiera. |
| `nexo.finance.cost_centers.view`             | Consultar centros de costo en NEXO       | `BASE_ONLY`            | **NO ASIGNAR**                   | — Denegación por defecto; no se crea concesión en la matriz operativa.                                                                                                                                                              | Capacidad exclusiva del carril base. Los permisos administrativos permanentes proceden del rol base del trabajador y no se duplican en `gerencia_operativa`.                                                                                         |
| `nexo.analytics.internal_reports.view`       | Consultar reportes internos              | `BASE_ONLY`            | **NO ASIGNAR**                   | — Denegación por defecto; no se crea concesión en la matriz operativa.                                                                                                                                                              | Capacidad exclusiva del carril base. Los permisos administrativos permanentes proceden del rol base del trabajador y no se duplican en `gerencia_operativa`.                                                                                         |
| `nexo.analytics.margin_reports.view`         | Consultar reportes de margen             | `BASE_ONLY`            | **NO ASIGNAR**                   | — Denegación por defecto; no se crea concesión en la matriz operativa.                                                                                                                                                              | Capacidad exclusiva del carril base. Los permisos administrativos permanentes proceden del rol base del trabajador y no se duplican en `gerencia_operativa`.                                                                                         |
| `nexo.printing.templates.update`             | Editar plantillas de impresión           | `BASE_ONLY`            | **NO ASIGNAR**                   | — Denegación por defecto; no se crea concesión en la matriz operativa.                                                                                                                                                              | Capacidad exclusiva del carril base. Los permisos administrativos permanentes proceden del rol base del trabajador y no se duplican en `gerencia_operativa`.                                                                                         |
| `nexo.printing.jobs.view`                    | Consultar trabajos de impresión          | `BASE_OR_OPERATIONAL`  | **ASIGNAR OPERATIVO**            | CTX-MGR-PRINT-JOBS — Trabajos de impresión originados por operaciones de la sede activa, únicamente para seguimiento, reintento técnico autorizado o diagnóstico; no edición de plantillas.                                         | Carril operativo. Requiere actor activo, turno publicado y vigente, check-in cuando aplique, sede/área compatibles, permiso exacto y recurso resuelto en servidor. Nunca produce alcance global.                                                     |
| `nexo.settings.sites.view`                   | Consultar configuración de sedes         | `BASE_ONLY`            | **NO ASIGNAR**                   | — Denegación por defecto; no se crea concesión en la matriz operativa.                                                                                                                                                              | Capacidad exclusiva del carril base. Los permisos administrativos permanentes proceden del rol base del trabajador y no se duplican en `gerencia_operativa`.                                                                                         |
| `nexo.settings.remission_policies.view`      | Consultar políticas de remisiones        | `BASE_ONLY`            | **NO ASIGNAR**                   | — Denegación por defecto; no se crea concesión en la matriz operativa.                                                                                                                                                              | Capacidad exclusiva del carril base. Los permisos administrativos permanentes proceden del rol base del trabajador y no se duplican en `gerencia_operativa`.                                                                                         |


##### 7.6 NUMERA — 6 permisos
| Permiso                                   | Capacidad humana               | Modalidad   | Decisión para gerencia_operativa | Alcance aprobado                                                       | Condición                                                                                                                                                    |
| ----------------------------------------- | ------------------------------ | ----------- | -------------------------------- | ---------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `numera.access`                           | Entrar a NUMERA                | `BASE_ONLY` | **NO ASIGNAR**                   | — Denegación por defecto; no se crea concesión en la matriz operativa. | Capacidad exclusiva del carril base. Los permisos administrativos permanentes proceden del rol base del trabajador y no se duplican en `gerencia_operativa`. |
| `numera.finance.cost_centers.view`        | Consultar centros de costo     | `BASE_ONLY` | **NO ASIGNAR**                   | — Denegación por defecto; no se crea concesión en la matriz operativa. | Capacidad exclusiva del carril base. Los permisos administrativos permanentes proceden del rol base del trabajador y no se duplican en `gerencia_operativa`. |
| `numera.finance.expenses.view`            | Consultar gastos               | `BASE_ONLY` | **NO ASIGNAR**                   | — Denegación por defecto; no se crea concesión en la matriz operativa. | Capacidad exclusiva del carril base. Los permisos administrativos permanentes proceden del rol base del trabajador y no se duplican en `gerencia_operativa`. |
| `numera.analytics.break_even.view`        | Consultar punto de equilibrio  | `BASE_ONLY` | **NO ASIGNAR**                   | — Denegación por defecto; no se crea concesión en la matriz operativa. | Capacidad exclusiva del carril base. Los permisos administrativos permanentes proceden del rol base del trabajador y no se duplican en `gerencia_operativa`. |
| `numera.analytics.profitability.view`     | Consultar rentabilidad         | `BASE_ONLY` | **NO ASIGNAR**                   | — Denegación por defecto; no se crea concesión en la matriz operativa. | Capacidad exclusiva del carril base. Los permisos administrativos permanentes proceden del rol base del trabajador y no se duplican en `gerencia_operativa`. |
| `numera.analytics.financial_reports.view` | Consultar reportes financieros | `BASE_ONLY` | **NO ASIGNAR**                   | — Denegación por defecto; no se crea concesión en la matriz operativa. | Capacidad exclusiva del carril base. Los permisos administrativos permanentes proceden del rol base del trabajador y no se duplican en `gerencia_operativa`. |


##### 7.7 ORIGO — 5 permisos
| Permiso                                  | Capacidad humana                  | Modalidad             | Decisión para gerencia_operativa | Alcance aprobado                                                                                                                                                | Condición                                                                                                                                                                                        |
| ---------------------------------------- | --------------------------------- | --------------------- | -------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `origo.access`                           | Entrar a ORIGO                    | `BASE_OR_OPERATIONAL` | **ASIGNAR OPERATIVO**            | CTX-MGR-ORIGO-APP — Entrada operativa a ORIGO para coordinar abastecimiento y recepción de la sede activa. No concede compras ni administración de proveedores. | Carril operativo. Requiere actor activo, turno publicado y vigente, check-in cuando aplique, sede/área compatibles, permiso exacto y recurso resuelto en servidor. Nunca produce alcance global. |
| `origo.procurement.purchase_orders.view` | Consultar órdenes de compra       | `BASE_OR_OPERATIONAL` | **ASIGNAR OPERATIVO**            | CTX-MGR-ORIGO — Órdenes, recepciones y proyección mínima de proveedores vinculadas con entregas o abastecimientos de la sede activa. Solo consulta operativa.   | Carril operativo. Requiere actor activo, turno publicado y vigente, check-in cuando aplique, sede/área compatibles, permiso exacto y recurso resuelto en servidor. Nunca produce alcance global. |
| `origo.procurement.receipts.view`        | Consultar recepciones de compra   | `BASE_OR_OPERATIONAL` | **ASIGNAR OPERATIVO**            | CTX-MGR-ORIGO — Órdenes, recepciones y proyección mínima de proveedores vinculadas con entregas o abastecimientos de la sede activa. Solo consulta operativa.   | Carril operativo. Requiere actor activo, turno publicado y vigente, check-in cuando aplique, sede/área compatibles, permiso exacto y recurso resuelto en servidor. Nunca produce alcance global. |
| `origo.procurement.suppliers.view`       | Consultar proveedores             | `BASE_OR_OPERATIONAL` | **ASIGNAR OPERATIVO**            | CTX-MGR-ORIGO — Órdenes, recepciones y proyección mínima de proveedores vinculadas con entregas o abastecimientos de la sede activa. Solo consulta operativa.   | Carril operativo. Requiere actor activo, turno publicado y vigente, check-in cuando aplique, sede/área compatibles, permiso exacto y recurso resuelto en servidor. Nunca produce alcance global. |
| `origo.catalog.product_reviews.view`     | Consultar revisiones de productos | `BASE_ONLY`           | **NO ASIGNAR**                   | — Denegación por defecto; no se crea concesión en la matriz operativa.                                                                                          | Capacidad exclusiva del carril base. Los permisos administrativos permanentes proceden del rol base del trabajador y no se duplican en `gerencia_operativa`.                                     |


##### 7.8 VENTO PASS — 1 permisos
| Permiso       | Capacidad humana    | Modalidad   | Decisión para gerencia_operativa | Alcance aprobado                                                       | Condición                                                                                                                                                    |
| ------------- | ------------------- | ----------- | -------------------------------- | ---------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `pass.access` | Entrar a Vento Pass | `BASE_ONLY` | **NO ASIGNAR**                   | — Denegación por defecto; no se crea concesión en la matriz operativa. | Capacidad exclusiva del carril base. Los permisos administrativos permanentes proceden del rol base del trabajador y no se duplican en `gerencia_operativa`. |


##### 7.9 PULSO — 2 permisos
| Permiso                              | Capacidad humana                        | Modalidad              | Decisión para gerencia_operativa | Alcance aprobado                                                                                                                                                                                        | Condición                                                                                                                                                                                        |
| ------------------------------------ | --------------------------------------- | ---------------------- | -------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `pulso.access`                       | Entrar a PULSO                          | `OPERATIONAL_ONLY`     | **ASIGNAR OPERATIVO**            | CTX-MGR-PULSO-APP — Entrada a PULSO durante el turno para coordinación comercial de la sede activa. No concede ventas, caja, pagos, pedidos ni cierres por sí sola.                                     | Carril operativo. Requiere actor activo, turno publicado y vigente, check-in cuando aplique, sede/área compatibles, permiso exacto y recurso resuelto en servidor. Nunca produce alcance global. |
| `pulso.delivery.deliveries.override` | Confirmar entregas de forma excepcional | `BASE_AND_OPERATIONAL` | **ASIGNAR COMPONENTE OPERATIVO** | CTX-MGR-DOUBLE-DELIVERY — Componente operativo de una confirmación excepcional de entrega en la sede activa. Exige autoridad base compatible, evidencia, reautenticación, motivo y auditoría reforzada. | Asignar solo el componente operativo. La autorización final exige componente base válido, turno y check-in activos, sede/área compatibles, motivo, reautenticación y auditoría reforzada.        |


##### 7.10 VISO — 17 permisos
| Permiso                                       | Capacidad humana                          | Modalidad   | Decisión para gerencia_operativa | Alcance aprobado                                                       | Condición                                                                                                                                                    |
| --------------------------------------------- | ----------------------------------------- | ----------- | -------------------------------- | ---------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `viso.access`                                 | Entrar a VISO                             | `BASE_ONLY` | **NO ASIGNAR**                   | — Denegación por defecto; no se crea concesión en la matriz operativa. | Capacidad exclusiva del carril base. Los permisos administrativos permanentes proceden del rol base del trabajador y no se duplican en `gerencia_operativa`. |
| `viso.platform.app_updates.view`              | Consultar actualizaciones de aplicaciones | `BASE_ONLY` | **NO ASIGNAR**                   | — Denegación por defecto; no se crea concesión en la matriz operativa. | Capacidad exclusiva del carril base. Los permisos administrativos permanentes proceden del rol base del trabajador y no se duplican en `gerencia_operativa`. |
| `viso.organization.businesses.view`           | Consultar empresas y unidades de negocio  | `BASE_ONLY` | **NO ASIGNAR**                   | — Denegación por defecto; no se crea concesión en la matriz operativa. | Capacidad exclusiva del carril base. Los permisos administrativos permanentes proceden del rol base del trabajador y no se duplican en `gerencia_operativa`. |
| `viso.workforce.employees.view`               | Consultar trabajadores                    | `BASE_ONLY` | **NO ASIGNAR**                   | — Denegación por defecto; no se crea concesión en la matriz operativa. | Capacidad exclusiva del carril base. Los permisos administrativos permanentes proceden del rol base del trabajador y no se duplican en `gerencia_operativa`. |
| `viso.workforce.staff_calendar.view`          | Consultar calendario del personal         | `BASE_ONLY` | **NO ASIGNAR**                   | — Denegación por defecto; no se crea concesión en la matriz operativa. | Capacidad exclusiva del carril base. Los permisos administrativos permanentes proceden del rol base del trabajador y no se duplican en `gerencia_operativa`. |
| `viso.workforce.schedules.view`               | Consultar programación de turnos          | `BASE_ONLY` | **NO ASIGNAR**                   | — Denegación por defecto; no se crea concesión en la matriz operativa. | Capacidad exclusiva del carril base. Los permisos administrativos permanentes proceden del rol base del trabajador y no se duplican en `gerencia_operativa`. |
| `viso.workforce.vacancies.view`               | Consultar vacantes                        | `BASE_ONLY` | **NO ASIGNAR**                   | — Denegación por defecto; no se crea concesión en la matriz operativa. | Capacidad exclusiva del carril base. Los permisos administrativos permanentes proceden del rol base del trabajador y no se duplican en `gerencia_operativa`. |
| `viso.authorization.context_simulations.view` | Consultar simulaciones de autorización    | `BASE_ONLY` | **NO ASIGNAR**                   | — Denegación por defecto; no se crea concesión en la matriz operativa. | Capacidad exclusiva del carril base. Los permisos administrativos permanentes proceden del rol base del trabajador y no se duplican en `gerencia_operativa`. |
| `viso.authorization.audit_logs.view`          | Consultar auditoría de autorización       | `BASE_ONLY` | **NO ASIGNAR**                   | — Denegación por defecto; no se crea concesión en la matriz operativa. | Capacidad exclusiva del carril base. Los permisos administrativos permanentes proceden del rol base del trabajador y no se duplican en `gerencia_operativa`. |
| `viso.catalog.commercial_categories.view`     | Consultar categorías comerciales          | `BASE_ONLY` | **NO ASIGNAR**                   | — Denegación por defecto; no se crea concesión en la matriz operativa. | Capacidad exclusiva del carril base. Los permisos administrativos permanentes proceden del rol base del trabajador y no se duplican en `gerencia_operativa`. |
| `viso.content.content_blocks.view`            | Consultar bloques de contenido            | `BASE_ONLY` | **NO ASIGNAR**                   | — Denegación por defecto; no se crea concesión en la matriz operativa. | Capacidad exclusiva del carril base. Los permisos administrativos permanentes proceden del rol base del trabajador y no se duplican en `gerencia_operativa`. |
| `viso.content.menu.view`                      | Consultar menú                            | `BASE_ONLY` | **NO ASIGNAR**                   | — Denegación por defecto; no se crea concesión en la matriz operativa. | Capacidad exclusiva del carril base. Los permisos administrativos permanentes proceden del rol base del trabajador y no se duplican en `gerencia_operativa`. |
| `viso.content.website_content.view`           | Consultar contenido del sitio web         | `BASE_ONLY` | **NO ASIGNAR**                   | — Denegación por defecto; no se crea concesión en la matriz operativa. | Capacidad exclusiva del carril base. Los permisos administrativos permanentes proceden del rol base del trabajador y no se duplican en `gerencia_operativa`. |
| `viso.finance.accounting.view`                | Consultar información contable            | `BASE_ONLY` | **NO ASIGNAR**                   | — Denegación por defecto; no se crea concesión en la matriz operativa. | Capacidad exclusiva del carril base. Los permisos administrativos permanentes proceden del rol base del trabajador y no se duplican en `gerencia_operativa`. |
| `viso.delivery.rates.view`                    | Consultar tarifas de entrega              | `BASE_ONLY` | **NO ASIGNAR**                   | — Denegación por defecto; no se crea concesión en la matriz operativa. | Capacidad exclusiva del carril base. Los permisos administrativos permanentes proceden del rol base del trabajador y no se duplican en `gerencia_operativa`. |
| `viso.loyalty.products.view`                  | Consultar productos de fidelización       | `BASE_ONLY` | **NO ASIGNAR**                   | — Denegación por defecto; no se crea concesión en la matriz operativa. | Capacidad exclusiva del carril base. Los permisos administrativos permanentes proceden del rol base del trabajador y no se duplican en `gerencia_operativa`. |
| `viso.loyalty.customers.view`                 | Consultar clientes de fidelización        | `BASE_ONLY` | **NO ASIGNAR**                   | — Denegación por defecto; no se crea concesión en la matriz operativa. | Capacidad exclusiva del carril base. Los permisos administrativos permanentes proceden del rol base del trabajador y no se duplican en `gerencia_operativa`. |


#### 8. Reglas operativas obligatorias

1. `gerencia_operativa` solo existe durante un turno publicado, vigente y territorialmente compatible.
2. El rol no se deriva del rol base, cargo, perfil, sede seleccionada, dispositivo o jerarquía informal.
3. La sede activa procede del turno y el recurso; no se sustituye por la sede primaria o una selección del frontend.
4. Cuando la sede utilice un área general, esta deberá estar aprobada para el rol. En sedes con áreas específicas, cada recurso conservará su área real.
5. Los 40 permisos `BASE_OR_OPERATIONAL` asignados se evalúan exclusivamente por el carril operativo y nunca toman prestado alcance del carril base.
6. Los cinco permisos `BASE_AND_OPERATIONAL` reciben solo el componente operativo. Sin componente base compatible, la respuesta es `DENY`.
7. Un rol base global no convierte el contexto operativo en global ni permite intervenir recursos de otra sede.
8. La coordinación puede consultar el estado transversal de la sede, pero cada mutación debe corresponder a una capacidad exacta.
9. `fogo.production.batches.create` permanece fuera de la matriz. Crear lotes corresponde al rol productivo responsable.
10. La gerencia no registra entradas ordinarias, ubicaciones, traslados, retiros, validaciones o conteos físicos por inferencia.
11. La gerencia no prepara, despacha ni recibe remisiones como sustituto automático de bodega, conductor o destino.
12. `remissions.update` solo permite campos y estados explícitamente editables; no altera cantidades bajo custodia ni reconstruye inventario.
13. `remissions.cancel` exige estado cancelable, motivo, reautenticación, control de versión y auditoría. No revierte automáticamente movimientos o custodia.
14. Una acción sensible no puede ser aprobada por el mismo actor que originó, capturó o se beneficia de la operación cuando la segregación de funciones lo prohíba.
15. Los datos de otras sedes en recursos relacionales se proyectarán al mínimo necesario; no conceden navegación general sobre esas sedes.
16. `pulso.access` solo habilita la entrada. El catálogo actual no representa supervisión de ventas, pedidos, caja, pagos o cierres.
17. APP-REVIEW, demo, entornos aislados y recursos sin territorio resuelto permanecen denegados.
18. Toda mutación requiere idempotencia, fecha de servidor, actor efectivo, motivo cuando aplique y auditoría.
19. Finalizado el turno o check-in requerido, todas las concesiones de esta matriz dejan de estar disponibles.
20. No se implementan cambios físicos durante esta tarea.

#### 9. Acciones de doble condición

| Permiso                                   | Componente de `gerencia_operativa`                | Componente adicional obligatorio | Controles mínimos                                                                    |
| ----------------------------------------- | ------------------------------------------------- | -------------------------------- | ------------------------------------------------------------------------------------ |
| `nexo.inventory.adjustments.register`     | Presencia operativa en la sede/área afectada      | Permiso base compatible          | Evidencia de diferencia, motivo, reautenticación, segregación y auditoría            |
| `nexo.inventory.entries.override`         | Contexto operativo de la recepción afectada       | Permiso base compatible          | Documento o incidente válido, prevención de duplicados, motivo y auditoría           |
| `nexo.finance.internal_variances.approve` | Participación operativa en la jornada afectada    | Permiso base compatible          | Evidencia, actor distinto del capturador cuando aplique y decisión versionada        |
| `nexo.finance.internal_variances.resolve` | Contexto operativo del recurso                    | Permiso base compatible          | Resolución documentada, efecto contable/inventario explícito y auditoría             |
| `pulso.delivery.deliveries.override`      | Presencia operativa en la sede y entrega afectada | Permiso base compatible          | Prueba de entrega, reautenticación, motivo, prevención de autoaprobación y auditoría |

La asignación operativa no garantiza que todos los roles base puedan completar estas acciones. La intersección se resolverá por trabajador, permiso, territorio y recurso.

#### 10. Capacidades físicas expresamente excluidas

- Crear lotes de producción como responsable ejecutor.
- Registrar entradas ordinarias de inventario.
- Asignar ubicaciones físicas.
- Crear traslados o registrar retiros.
- Ejecutar validaciones o capturar conteos físicos.
- Preparar, empacar o modificar cantidades preparadas de remisiones.
- Aceptar custodia e iniciar tránsito como conductor.
- Recibir físicamente y confirmar cantidades por el destino.
- Crear productos, activos, configuraciones, rutas o políticas.
- Ejecutar ventas, cobros, cierres de caja, pedidos o producción por inferencia.

Cuando una persona de gerencia deba cubrir materialmente una función, deberá asignársele el rol operativo especialista correspondiente para ese turno o una excepción individual operativa explícita, temporal y auditada. No se ampliará `gerencia_operativa` para resolver suplencias informales.

#### 11. Brechas contractuales identificadas

| Brecha                                                    | Impacto                                                                                                                                     | Decisión en esta matriz                                                                           |
| --------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------- |
| PULSO solo posee `access` y un override excepcional       | La gerencia puede entrar, pero no existe permiso atómico para consultar ventas, pedidos, caja, pagos, mesas o cierres.                      | No inferir supervisión desde `pulso.access`. Crear permisos de consulta y coordinación comercial. |
| FOGO no separa supervisión, reprogramación e incidencias  | La gerencia puede consultar órdenes y lotes, pero no existe capacidad atómica para pausar, escalar, reprogramar o gestionar una incidencia. | No usar `batches.create` ni permisos de recetas como sustituto.                                   |
| `remissions.update` es amplio                             | Puede mezclar notas ordinarias con cambios sensibles de líneas, cantidades, origen, destino o estado.                                       | Aplicar contrato de campos y estados; si no puede garantizarse, descomponer antes de implementar. |
| `remissions.cancel` no diferencia etapa                   | La cancelación previa a preparación no tiene el mismo impacto que una cancelación con custodia o movimientos.                               | Limitar por estado y crear capacidades atómicas de reversión cuando corresponda.                  |
| No existe permiso de incidentes operativos transversales  | Las incidencias de producción, inventario, transporte, venta o recepción pueden terminar registrándose como notas o ajustes.                | Crear un flujo y permisos de incidentes; no ampliar ajustes o cancelaciones.                      |
| No existe permiso de reasignación operativa de emergencia | La gerencia puede coordinar, pero no reasignar formalmente actor, ruta o responsable mediante una capacidad atómica.                        | Mantener la reasignación fuera de esta matriz hasta definir autoridad, vigencia y auditoría.      |

#### 12. Validaciones mínimas por dominio

| Dominio             | Validaciones mínimas                                                                                                      |
| ------------------- | ------------------------------------------------------------------------------------------------------------------------- |
| Producción          | Sede/área vinculadas, orden o lote real, etapa visible, proyección mínima de receta y ausencia de mutación implícita.     |
| Inventario          | Sede y ubicación reales, LPN o producto válido, actor, movimiento causal, estado, control de versión y campos protegidos. |
| Conteos             | Sesión válida, modalidad ciega, etapa, asignación, ocultamiento del teórico y segregación entre captura y aprobación.     |
| Remisiones          | Origen/destino, estado, versión, custodia, líneas, cantidades y extremo territorial autorizado.                           |
| Logística           | Operación que afecta la sede activa, ruta publicada, conductor/vehículo asignados y privacidad de telemetría.             |
| Compras y recepción | Orden o recepción vinculada con la sede activa, proveedor mínimo, estado y exclusión de datos comerciales innecesarios.   |
| Doble condición     | Concesión base y operativa completas, intersección territorial, reautenticación, motivo, evidencia y auditoría.           |

#### 13. Riesgos de transición

1. La matriz legacy de `gerencia_operativa` contiene siete permisos NEXO globales y puede interpretarse como autorización transversal sin territorio.
2. El código actual puede conservar bypass para `propietario` y `gerente_general`, contradiciendo la exigencia de un rol operativo válido.
3. `gerencia_operativa` está actualmente habilitado en Vento Group, pero esa asignación no lo convierte en rol organizacional global.
4. Las aplicaciones pueden seguir usando permisos técnicos de rutas o nombres legacy como `remissions`, `prepare`, `transit`, `receive` y `cancel`.
5. La asignación de todos los permisos `BASE_OR_OPERATIONAL` exige que cada contrato de recurso limite estrictamente sede, área y jornada; una concesión textual global sería crítica.
6. Las acciones `BASE_AND_OPERATIONAL` podrían autorizarse erróneamente mediante un `OR` entre carriles. Deben evaluarse mediante intersección obligatoria.
7. La falta de permisos atómicos en PULSO y FOGO puede llevar a interfaces que oculten controles solo en frontend sin protección de servidor.
8. Una gerencia con permisos base amplios puede parecer autorizada aunque el turno haya terminado; la interfaz deberá mostrar claramente el origen de cada capacidad.

#### 14. Resultado esperado en la experiencia

```text
COORDINACIÓN OPERATIVA — TURNO ACTIVO

Sede
[ Vento Café ]

Estado de la jornada
Producción       3 órdenes activas      1 incidencia
Inventario       2 diferencias          1 conteo abierto
Remisiones       4 en preparación       2 en tránsito
Abastecimiento   1 entrega pendiente

Acciones disponibles
[ Ver operación completa de la sede ]
[ Solicitar abastecimiento ]
[ Actualizar prioridad de remisión ]
[ Cancelar remisión permitida ]

Acciones de doble condición
[ Autorizar ajuste ]             Requiere autoridad base
[ Aprobar variación ]            Requiere autoridad base
[ Confirmar entrega excepcional ] Requiere autoridad base
```

No se mostrará como capacidad ordinaria:

- Preparar o despachar físicamente una remisión.
- Recibir por el destino.
- Crear lotes de producción.
- Registrar entradas, traslados, retiros o conteos.
- Ejecutar ventas, cobros o cierres de caja.
- Ver otras sedes sin relación con la jornada.

#### 15. Invariantes

- `gerencia_operativa` es coordinación temporal, no autoridad administrativa permanente.
- El rol no es un wildcard ni un bypass.
- Toda concesión tiene permiso exacto, territorio, recurso y contexto.
- Los 40 permisos `BASE_OR_OPERATIONAL` se satisfacen por un carril operativo completo e independiente.
- Los cinco permisos `BASE_AND_OPERATIONAL` requieren simultáneamente ambos carriles.
- El componente base no amplía la sede activa del carril operativo.
- El componente operativo no amplía la cobertura del rol base.
- Coordinar no equivale a ejecutar físicamente todas las etapas.
- Una persona que cubra una función especialista debe asumir el rol especialista o una excepción explícita.
- La consulta transversal se limita a la sede y jornada activas.
- La cancelación no produce reversión implícita.
- Ninguna acción sensible permite autoaprobación cuando la segregación lo prohíbe.
- La ausencia de una clave o contrato atómico produce denegación.
- El fin del turno revoca esta matriz y no afecta los permisos base válidos.

#### 16. Criterios de aprobación

La tarea podrá aprobarse cuando se acepte que:

- `gerencia_operativa` recibe 48 claves en el carril operativo y no un wildcard;
- 43 capacidades son operativas directas y cinco aportan únicamente el componente operativo de doble condición;
- se conceden los 40 permisos `BASE_OR_OPERATIONAL` con alcance limitado a sede, área, jornada y recurso;
- solo tres de los 13 permisos `OPERATIONAL_ONLY` se conceden: recetario operativo, solicitud de remisión y entrada a PULSO;
- crear lotes, entradas ordinarias, ubicaciones, traslados, retiros, conteos, preparación, despacho y recepción permanecen fuera del rol;
- las acciones sensibles requieren componente base compatible, reautenticación, evidencia, motivo y auditoría;
- `gerencia_operativa` no duplica matrices base ni sustituye a roles especialistas;
- la asignación actual en Vento Group no crea alcance global;
- los 112 permisos fueron evaluados sin omisiones ni duplicados;
- no se implementa todavía ningún cambio físico.

#### 17. Estado final de la propuesta

| Tarea         | Estado      |
| ------------- | ----------- |
| AUTH-RBAC-018 | APROBADA    |
| AUTH-RBAC-019 | APROBADA    |
| AUTH-RBAC-020 | NO INICIADA |

No se implementan código, migraciones, cambios en Supabase, RLS, RPC, datasets, repositorios, guards, dispositivos ni pantallas. La matriz solo será canónica cuando el usuario la apruebe expresamente.
